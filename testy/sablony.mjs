// Hledá skript simulace prvek, který v šabloně vůbec není?
//
// Zavedeno 2. 8. 2026 po nálezu nezávislého kontrolora. Testy simulací čtou z komponenty
// jen `<script>` a pouštějí ho nad NÁHRADNÍM DOM, jehož atrapa chybějící prvek tiše
// vyrobí (`prvky.get(id) || novy(id)`). Komponenta se smazanou scénou i všemi tlačítky
// proto testem prošla jako zdravá. Měření ukázalo, že tutéž díru mělo 11 z 12 testů —
// není to překlep v jednom souboru, je to vzorec.
//
// Opravovat každý test zvlášť by nic neřešilo: u příští simulace by se na to zapomnělo.
// Tahle kontrola proto běží nad VŠEMI komponentami simulací naráz, včetně budoucích,
// a nikdo pro ni nemusí nic dopisovat.
//
// Co se hlídá:
//  (a) `getElementById('x')` ve skriptu × `id="x"` v šabloně — jinak je prvek navždy
//      prázdný a v prohlížeči simulace mlčky nefunguje (v testu se vada neprojeví vůbec),
//  (b) `querySelectorAll('.trida')` × existence takové třídy v šabloně — takhle se
//      obsluhují přepínače; prázdný seznam znamená ovládání, které nejde kliknout.
//
// Spuštění: node testy/sablony.mjs [část názvu komponenty]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const slozka = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'skola2');

/** Rozdělí komponentu na šablonu (HTML) a kód (obsah všech <script>). */
export function rozdel(zdroj) {
	const casti = String(zdroj).split(/<script>|<\/script>/);
	return {
		html: casti.filter((_, i) => i % 2 === 0).join('\n'),
		kod: casti.filter((_, i) => i % 2 === 1).join('\n'),
	};
}

/**
 * Nálezy v jedné komponentě. `zdroj` se dá podstrčit kvůli obousměrnému ověření.
 */
export function zkontrolujSablonu(jmeno, zdroj) {
	const { html, kod } = rozdel(zdroj);
	const nalezy = [];

	// Komentáře v kódu mluví o vadách schválně — ty se nesmí počítat jako volání.
	const cistyKod = kod.replace(/^\s*\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

	// POZOR NA FALEŠNÝ POPLACH: část prvků v šabloně vůbec není, protože si je kód vyrábí
	// sám za běhu (`b.className = 'bin-zarovka'`, `obsah += '<circle class="tez-bod" …'`).
	// První verze téhle kontroly kvůli tomu nahlásila tři zdravé simulace. Za „existující"
	// se proto považuje i prvek, který někde vzniká v kódu — hlídá se tak stále to
	// podstatné: selektor, kterému neodpovídá NIC, tedy ovládání, co nejde kliknout.
	const idVSablone = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
	const idVKodu = new Set([
		...[...cistyKod.matchAll(/\bid\s*=\s*['"]([^'"]+)['"]/g)].map((m) => m[1]),
		...[...cistyKod.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]),
	]);
	for (const m of cistyKod.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)) {
		if (!idVSablone.has(m[1]) && !idVKodu.has(m[1])) {
			nalezy.push({ jmeno, druh: 'chybí prvek', co: m[1], proc: `skript hledá id="${m[1]}", ale takový prvek nikde nevzniká` });
		}
	}

	for (const m of cistyKod.matchAll(/querySelectorAll\(\s*['"]\.([a-z0-9_-]+)['"]\s*\)/gi)) {
		const trida = m[1];
		const vTride = new RegExp(`class\\s*=\\s*["'\`][^"'\`]*\\b${trida}\\b`);
		const vPrirazeni = new RegExp(`(className|classList\\.add)[^\\n]*\\b${trida}\\b`);
		if (!vTride.test(html) && !vTride.test(cistyKod) && !vPrirazeni.test(cistyKod)) {
			nalezy.push({ jmeno, druh: 'prázdný výběr', co: '.' + trida, proc: `skript obsluhuje prvky .${trida}, ale žádný takový nikde nevzniká` });
		}
	}

	return nalezy;
}

/** Projde všechny komponenty simulací. Vrací i počet vstupů — „0 nálezů" z nula souborů je falešná nula. */
export function zkontrolujSablony(filtr = '') {
	const soubory = readdirSync(slozka).filter((f) => f.endsWith('Simulace.astro') && f.includes(filtr));
	const nalezy = [];
	for (const f of soubory) {
		nalezy.push(...zkontrolujSablonu(f.replace('.astro', ''), readFileSync(join(slozka, f), 'utf8')));
	}
	return { nalezy, souboru: soubory.length };
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const { nalezy, souboru } = zkontrolujSablony(process.argv[2] ?? '');
	for (const n of nalezy) console.log(`❌ ${n.jmeno}: ${n.druh} „${n.co}" — ${n.proc}`);
	console.log(nalezy.length
		? `\nNálezů: ${nalezy.length} (prošlo ${souboru} komponent)`
		: `Šablony simulací: 0 nálezů (prošlo ${souboru} komponent).`);
	process.exit(nalezy.length ? 1 : 0);
}

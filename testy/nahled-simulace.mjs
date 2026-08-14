#!/usr/bin/env node
// NÁHLED SIMULACE: udělá z komponenty obrázek, na který se dá podívat OKEM.
//
// Proč existuje: zelený test je slepý k tomu, jak scéna vypadá. U Oersteda
// i u koloběhu vody našel pohled na vyrenderovaný obrázek vady, které žádné
// měřidlo nevidělo — useknutou kružnici, šipky nakupené v řadě, počitadlo
// ležící přes oblak, popisek přeškrtnutý vlastní čárou. Dokud se skládalo
// ručně přes prohlížeč, dělalo se to pokaždé jinak (a screenshot v session
// vracel prázdno). Tohle je jediný domov toho postupu.
//
// Jak to funguje: skript komponenty se spustí v sandboxu (jako v testech),
// zapsané innerHTML a atributy se vloží zpátky do SVG ze zdroje a výsledek
// se uloží jako .svg. PNG z něj udělá `qlmanage -t` (viz hlášku na konci).
//
// Spuštění:
//   node testy/nahled-simulace.mjs <komponenta.astro> <výstup.svg> [svg=id|pořadí] [id=hodnota ...]
// Příklad:
//   node testy/nahled-simulace.mjs src/components/skola2/VnitrniEnergieSimulace.astro \
//        /tmp/nahled.svg vne-teplota=60 vne-castic=20 vne-rychlost-slider=2
//
// Když má komponenta VÍC samostatných scén (víc značek <svg>), vykreslí se bez
// další volby ta PRVNÍ — jako vždycky. Druhou a další scénu vybere vyhrazený
// argument `svg=` (jediný, který se nechápe jako nastavení ovládacího prvku):
//   svg=gc-b-svg  … podle id značky <svg id="…">
//   svg=2         … podle pořadí ve zdroji (1 = první scéna)
// Bez toho by druhá scéna zůstala neviděná — přesně to se stalo galvanickému
// článku, micro:bit rádiu a senzorům robota. Příklad (scéna B, šest článků):
//   node testy/nahled-simulace.mjs src/components/skola2/GalvanickyClanekSimulace.astro \
//        /tmp/b.svg svg=gc-b-svg gc-b-pocet=6 gc-b-velikost=1
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const [komponenta, vystup, ...argumenty] = process.argv.slice(2);
if (!komponenta || !vystup) {
	console.log('Použití: node testy/nahled-simulace.mjs <komponenta.astro> <výstup.svg> [svg=id|pořadí] [id=hodnota ...]');
	process.exit(1);
}

// `svg=` je jediné vyhrazené klíčové slovo — vybírá scénu, nenastavuje prvek.
// Všechno ostatní jde do nastavení ovládacích prvků přesně jako dosud.
// `klik=<id>` (14. 8. 2026) klikne na tlačítko — bez toho šlo prohlédnout jen
// výchozí stav u simulací ovládaných TLAČÍTKY, ne posuvníky, takže se u nich
// nedala udělat povinná vizuální kontrola jiného než výchozího stavu. Klikat lze
// i opakovaně (`klik=a klik=b`), pořadí se zachovává.
let volbaScény = null;
const nastaveni = [];
const kliky = [];
for (const dvojice of argumenty) {
	if (dvojice.startsWith('svg=')) volbaScény = dvojice.slice(4);
	else if (dvojice.startsWith('klik=')) kliky.push(dvojice.slice(5));
	else nastaveni.push(dvojice);
}

const zdroj = readFileSync(komponenta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const prazdnyPrvek = (id) => ({
	id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
	value: hodnotaZHtml(id) ?? '',
	classList: { add() {}, remove() {}, toggle() {} },
	setAttribute(k, v) { this.atributy[k] = String(v); },
	getAttribute(k) { return this.atributy[k]; },
	appendChild() {},
	addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
});
const novy = (id) => {
	const p = prazdnyPrvek(id);
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
	// Prvek vyrobený za běhu nemá id, takže se do náhledu nevkládá zpátky —
	// stačí, aby se o něj skript nezabil (dřív tu createElement chyběl úplně
	// a celá komponenta spadla ještě před vykreslením, viz micro:bit rádio).
	createElement: () => prazdnyPrvek(undefined),
	// Totéž pro SVG prvky (14. 8. 2026): komponenta, která si tečky/značky skládá
	// přes createElementNS, tu jinak spadne uprostřed kreslení — a protože se to
	// stane až v posluchači, náhled se ZASEKNE místo aby zhavaroval (hledalo se
	// to půl hodiny u simulace účinků proudu). Chová se stejně jako createElement.
	createElementNS: () => prazdnyPrvek(undefined),
};
// cancelAnimationFrame patří k requestAnimationFrame — komponenta, která umí
// animaci zastavit (a to má umět každá), by bez něj spadla při prvním zastavení.
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, cancelAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

// nastavení posuvníků a překreslení (spustí se posluchači „input" všech prvků)
for (const dvojice of nastaveni) {
	const [id, hodnota] = dvojice.split('=');
	const p = prvky.get(id) ?? novy(id);
	p.value = hodnota;
}
let prekresleno = 0;
for (const p of [...prvky.values()]) for (const f of p.posluchaci.input ?? []) { f(); prekresleno++; break; }
if (!prekresleno && !kliky.length) console.log('⚠️  žádný posuvník neměl posluchač „input" — kreslí se výchozí stav');

// klikání (po nastavení posuvníků, aby šlo obojí kombinovat)
for (const id of kliky) {
	const p = prvky.get(id);
	if (!p) { console.error(`❌ klik=${id}: prvek s tímhle id ve scéně není`); process.exit(1); }
	const posluchaci = p.posluchaci.click ?? [];
	if (!posluchaci.length) { console.error(`❌ klik=${id}: prvek nemá posluchač „click" — nedá se na něj kliknout`); process.exit(1); }
	for (const f of posluchaci) f({ currentTarget: p, target: p, preventDefault() {} });
	console.log(`   klik: ${id}`);
}

// SVG ze zdroje + to, co do něj skript zapsal
const sceny = zdroj.match(/<svg[\s\S]*?<\/svg>/g) ?? [];
if (!sceny.length) {
	console.error(`❌ V souboru ${komponenta} není žádná značka <svg> — není co vykreslit.`);
	process.exit(1);
}
const idScény = (s) => (s.match(/<svg[^>]*\bid="([^"]*)"/) || [])[1] ?? '(bez id)';
const seznamScén = () => sceny.map((s, i) => `   svg=${i + 1}   id: ${idScény(s)}`).join('\n');

let index = 0; // bez volby vždy PRVNÍ scéna — jako dosud
if (volbaScény !== null) {
	if (/^\d+$/.test(volbaScény)) {
		index = Number(volbaScény) - 1;
		if (index < 0 || index >= sceny.length) {
			console.error(`❌ Scéna číslo ${volbaScény} v komponentě není — má jich ${sceny.length}. Dostupné scény:\n${seznamScén()}`);
			process.exit(1);
		}
	} else {
		index = sceny.findIndex((s) => idScény(s) === volbaScény);
		if (index === -1) {
			console.error(`❌ V komponentě není <svg id="${volbaScény}">. Dostupné scény:\n${seznamScén()}`);
			process.exit(1);
		}
	}
}
if (sceny.length > 1) console.log(`ℹ️  scén v komponentě: ${sceny.length} — kreslí se ${index + 1}. (id: ${idScény(sceny[index])})`);
let svg = sceny[index];
for (const [id, p] of prvky) {
	// atributy zapsané přes setAttribute (points, fill, …)
	if (Object.keys(p.atributy).length) {
		svg = svg.replace(new RegExp(`<(\\w+)([^>]*\\bid="${id}"[^>]*)>`), (cely, tag, atributy) => {
			let a = atributy;
			for (const [k, v] of Object.entries(p.atributy)) {
				a = new RegExp(`\\s${k}="[^"]*"`).test(a) ? a.replace(new RegExp(`\\s${k}="[^"]*"`), ` ${k}="${v}"`) : `${a} ${k}="${v}"`;
			}
			return `<${tag}${a}>`;
		});
	}
	// obsah zapsaný přes innerHTML
	if (p.innerHTML) {
		svg = svg.replace(new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`), `$1${p.innerHTML}$3`);
	}
	// …a totéž pro textContent (14. 8. 2026). Bez tohohle zůstávaly v náhledu
	// PRÁZDNÉ všechny <text> popisky plněné přes textContent — na webu přitom
	// text mají. Vizuální kontrola pak ukazovala prázdné bílé rámečky a nedalo
	// se rozeznat, jestli je vada ve scéně, nebo jen v náhledu (stálo to hledání
	// u simulace účinků proudu). innerHTML má přednost, když je zapsané obojí.
	else if (p.textContent) {
		const text = String(p.textContent).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		svg = svg.replace(new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`), `$1${text}$3`);
	}
}
svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
writeFileSync(vystup, svg);

console.log(`✅ ${vystup} — ${svg.length} znaků`);
console.log(`   PNG:  qlmanage -t -s 900 -o "$(dirname ${vystup})" "${vystup}"`);

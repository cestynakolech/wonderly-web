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
let volbaScény = null;
const nastaveni = [];
for (const dvojice of argumenty) {
	if (dvojice.startsWith('svg=')) volbaScény = dvojice.slice(4);
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
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

// nastavení posuvníků a překreslení (spustí se posluchači „input" všech prvků)
for (const dvojice of nastaveni) {
	const [id, hodnota] = dvojice.split('=');
	const p = prvky.get(id) ?? novy(id);
	p.value = hodnota;
}
let prekresleno = 0;
for (const p of prvky.values()) for (const f of p.posluchaci.input ?? []) { f(); prekresleno++; break; }
if (!prekresleno) console.log('⚠️  žádný posuvník neměl posluchač „input" — kreslí se výchozí stav');

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
}
svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
writeFileSync(vystup, svg);

console.log(`✅ ${vystup} — ${svg.length} znaků`);
console.log(`   PNG:  qlmanage -t -s 900 -o "$(dirname ${vystup})" "${vystup}"`);

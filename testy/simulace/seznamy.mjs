#!/usr/bin/env node
// Ověření SeznamySimulace.astro — seznam jako řada očíslovaných políček
// (scéna A) a seznam × 5 samostatných proměnných (scéna B).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
function novy(id) {
	const p = {
		id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(d) { this.deti.push(d); d.rodic = this; return d; },
		removeChild(d) { this.deti = this.deti.filter((x) => x !== d); return d; },
		get firstChild() { return this.deti[0] ?? null; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
}
let pocitadlo = 0;
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
	createElementNS: () => novy('e' + (pocitadlo++)),
	createElement: () => novy('e' + (pocitadlo++)),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Array, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svgA = prvky.get('sez-a-svg');
const svgB = prvky.get('sez-b-svg');
const delkaAEl = prvky.get('sez-a-delka-hodnota');
const stavAEl = prvky.get('sez-a-stav');
const stavBEl = prvky.get('sez-b-stav');
const gA = prvky.get('sez-a-krabicky');
const gProm = prvky.get('sez-b-promenne');
const gList = prvky.get('sez-b-seznam');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => el.posluchaci.click.forEach((f) => f());

// ——— čisté funkce, nezávisle na DOM ———
console.log('— čisté operace nad polem —');
{
	const p1 = svgA.__pridejNaKonec(['a', 'b'], 'c');
	ok(JSON.stringify(p1) === JSON.stringify(['a', 'b', 'c']), `přidej na konec: [a,b] + c → ${JSON.stringify(p1)}`);
	const p2 = svgA.__vlozNaZacatek(['a', 'b'], 'c');
	ok(JSON.stringify(p2) === JSON.stringify(['c', 'a', 'b']), `vlož na začátek: [a,b] + c → ${JSON.stringify(p2)}`);
	const p3 = svgA.__smazIndex(['a', 'b', 'c'], 2);
	ok(JSON.stringify(p3) === JSON.stringify(['a', 'c']), `smaž index 2 z [a,b,c] → ${JSON.stringify(p3)}`);
	ok(svgA.__smazIndex(['a'], 5).length === 1, 'smazání neexistujícího indexu pole nerozbije');
}

console.log('\n— scéna A: výchozí stav (4 políčka) —');
{
	ok(svgA.__seznam().length === 4, `délka pole = ${svgA.__seznam().length}`);
	ok(delkaAEl.textContent === '4', `SVG text délky = „${delkaAEl.textContent}"`);
	ok(gA.deti.length === 4 * 3, `v <svg> je 4×3 elementů (rect + 2×text) = ${gA.deti.length}`);
	const indexyText = gA.deti.filter((d) => d.textContent.startsWith('index')).map((d) => d.textContent);
	ok(JSON.stringify(indexyText) === JSON.stringify(['index 1', 'index 2', 'index 3', 'index 4']), `indexy: ${indexyText.join(', ')}`);
}

console.log('\n— klik „přidej do konce“ mění SVG SYNCHRONNĚ —');
{
	const pred = JSON.parse(JSON.stringify(gA.deti.map((d) => ({ ...d.atributy, t: d.textContent }))));
	klik(prvky.get('sez-a-pridej'));
	const po = gA.deti.map((d) => ({ ...d.atributy, t: d.textContent }));
	ok(svgA.__seznam().length === 5 && svgA.__seznam()[4] === 'jahody', `pole má 5 prvků, poslední „jahody": ${JSON.stringify(svgA.__seznam())}`);
	ok(delkaAEl.textContent === '5', `SVG délka se hned přepsala na „${delkaAEl.textContent}"`);
	ok(JSON.stringify(pred) !== JSON.stringify(po), 'obsah <svg> se po kliku opravdu liší (ne jen JS proměnná)');
	ok(/index 5/.test(po.map((x) => x.t).join(' ')), 'nové políčko má index 5 zapsaný v <svg>');
}

console.log('\n— klik „smaž z pozice 2“ přečísluje indexy (POINTA výkladu) —');
{
	// teď je seznam [jablka, chleba, mléko, vejce, jahody], smažeme index 2 (chleba)
	klik(prvky.get('sez-a-smaz2'));
	const seznam = svgA.__seznam();
	ok(JSON.stringify(seznam) === JSON.stringify(['jablka', 'mléko', 'vejce', 'jahody']), `„chleba" zmizel, ostatní se posunuli: ${JSON.stringify(seznam)}`);
	const hodnoty = gA.deti.filter((d) => !d.textContent.startsWith('index') && d.textContent).map((d) => d.textContent);
	ok(JSON.stringify(hodnoty) === JSON.stringify(seznam), `hodnoty v <svg> po posunu: ${hodnoty.join(', ')}`);
	const indexyText = gA.deti.filter((d) => d.textContent.startsWith('index')).map((d) => d.textContent);
	ok(JSON.stringify(indexyText) === JSON.stringify(['index 1', 'index 2', 'index 3', 'index 4']), `„mléko" má teď index 2, ne 3: ${indexyText.join(', ')}`);
	ok(/posunuly/.test(stavAEl.textContent), `stav vysvětluje posun indexů: „${stavAEl.textContent}"`);
}

console.log('\n— klik „vlož na začátek“ posune VŠECHNY indexy nahoru —');
{
	klik(prvky.get('sez-a-vloz'));
	const seznam = svgA.__seznam();
	ok(seznam[0] === 'mrkev', `nový první prvek: „${seznam[0]}"`);
	ok(seznam.length === 5, `délka = ${seznam.length}`);
}

console.log('\n— reset scény A vrátí původní seznam —');
{
	klik(prvky.get('sez-a-reset'));
	ok(JSON.stringify(svgA.__seznam()) === JSON.stringify(['jablka', 'chleba', 'mléko', 'vejce']), 'seznam obnoven');
	ok(delkaAEl.textContent === '4', 'délka obnovena na 4');
}

console.log('\n— scéna B: výchozí stav (5 proměnných = 5 prvků seznamu) —');
{
	ok(gProm.deti.length === 5 * 2, `vlevo přesně 5 boxů (rect+text): ${gProm.deti.length / 2}`);
	ok(gList.deti.length === 5 * 2, `vpravo přesně 5 boxů: ${gList.deti.length / 2}`);
	ok(svgB.__pokusyNavic() === 0, 'zatím žádný pokus navíc');
}

console.log('\n— klik „přidej dalšího hráče“: seznam roste, proměnné NE —');
{
	const predProm = gProm.deti.length;
	klik(prvky.get('sez-b-pridej'));
	ok(svgB.__seznam().length === 6, `seznam má teď ${svgB.__seznam().length} prvků`);
	ok(gList.deti.length === 6 * 2, `vpravo přibyl box: ${gList.deti.length / 2} boxů`);
	ok(gProm.deti.filter((d) => d.atributy.stroke === '#2b2a26').length === 5, 'skutečných proměnných je pořád jen 5 (žádná skore6 nevznikla)');
	ok(gProm.deti.length === predProm + 2, 'místo toho přibyl 1 přízračný box (dashed, červený)');
	const strasidlo = gProm.deti.find((d) => d.atributy['stroke-dasharray']);
	ok(!!strasidlo && strasidlo.atributy.stroke === '#e03131', `přízračný box je červený a čárkovaný: stroke=${strasidlo?.atributy.stroke}, dasharray=${strasidlo?.atributy['stroke-dasharray']}`);
	ok(/skore6/.test(gProm.deti.map((d) => d.textContent).join(' ')), 'text zmiňuje chybějící proměnnou skore6');
	ok(/CELÝ program/.test(stavBEl.textContent), `stav vysvětluje cenu ruční proměnné: „${stavBEl.textContent}"`);
}

console.log('\n— druhý klik: problém vlevo přibývá, vpravo jen roste seznam —');
{
	klik(prvky.get('sez-b-pridej'));
	ok(svgB.__pokusyNavic() === 2, `dva pokusy navíc: ${svgB.__pokusyNavic()}`);
	ok(gList.deti.length === 7 * 2, `vpravo 7 boxů: ${gList.deti.length / 2}`);
	const strasidla = gProm.deti.filter((d) => d.atributy['stroke-dasharray']);
	ok(strasidla.length === 2, `vlevo teď 2 přízračné boxy: ${strasidla.length}`);
}

console.log('\n— reset scény B —');
{
	klik(prvky.get('sez-b-reset'));
	ok(svgB.__seznam().length === 5 && svgB.__pokusyNavic() === 0, 'scéna B obnovena na 5 hráčů, 0 pokusů navíc');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

#!/usr/bin/env node
// Ověření VexGyroskopSimulace.astro — proč gyroskop (scéna A) a proč čidlo
// vzdálenosti (scéna B), informatika 9. ročník / robotika VEX IQ.
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlídané pointy výkladu:
//  ★ scéna A: bez gyra se robot otočí na rohu jen o 87° místo 90° (kola
//    prokluzují) a po 4 rozích se chyba 4×3° = 12° NEVYRUŠÍ — robot nedojede
//    zpátky na start. S gyrem je to přesně 90°/roh a 360° celkem → start = cíl.
//  ★ scéna B: bez čidla vzdálenosti auto ujede o prokluz (3 cm) víc, než mělo,
//    a zastaví jinde, než byl cíl. S čidlem zastaví přesně na cíl bez ohledu
//    na prokluz kol.
//  ★ klik na přepínač mění vykreslený stav SYNCHRONNĚ (bez animačního zpoždění).
//
// Očekávané hodnoty jsou psané RUČNĚ (87, 348, 12, prokluz 3), ne odvozené
// z komponenty — jinak by prohození významu (gyro/bez gyra, čidlo/bez čidla)
// prošlo a test by jen opakoval vlastní chybu komponenty.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] ?? new URL('../../src/components/skola2/VexGyroskopSimulace.astro', import.meta.url).pathname;
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, _text: '', innerHTML: '', dataset: {}, posluchaci: {}, value: undefined,
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
// hodnoty ze zdroje (value="…" v <input>) — potřebné pro slider vg-b-cil
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const document = {
	getElementById: (id) => {
		const p = prvky.get(id) ?? novy(id);
		if (p.value === undefined) p.value = hodnotaZHtml(id) ?? '';
		return p;
	},
};
const sandbox = { document, console, Math, Number, String };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const el = (id) => prvky.get(id);
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const zmen = (id, v) => { el(id).value = v; (el(id).posluchaci.input || []).forEach((f) => f()); };

let chyby = 0, kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ─────────────────────────────── Scéna A: čtverec, gyro vs. otáčky kol ──────
{
	const cesta1 = el('vg-a-cesta').atributy.points;
	const robot1 = el('vg-a-robot').atributy.transform;
	const mezera1 = el('vg-a-mezera');
	ok(el('vg-a-rezim').textContent === 'Bez gyra (podle kol)', '★ výchozí stav ukazuje NEJDŘÍV problém (bez gyra)');
	ok(el('vg-a-text2a').textContent.includes('348') && el('vg-a-text2a').textContent.includes('87'),
		'★ hlásí přesně 4×87°=348° (ne 360°) — chyba se NEVYRUŠÍ');
	ok(el('vg-a-text2b').textContent.includes('12'), '★ chyba na výsledném úhlu je 12° (4×3°)');
	ok(mezera1.atributy.opacity === '1', 'bez gyra je vidět červená úsečka mezery (start≠cíl)');
	ok(!cesta1.startsWith('100,280 100,190 190,190 190,280'), 'dráha BEZ gyra se neshoduje s ideálním čtvercem');
	ok(!robot1.includes('translate(100.0 280.0)'), 'bez gyra robot NEKONČÍ přesně na startu (100,280)');

	klik('vg-a-gyro'); // přepnout na gyroskop — musí se to projevit HNED, bez animace
	const cesta2 = el('vg-a-cesta').atributy.points;
	const robot2 = el('vg-a-robot').atributy.transform;
	ok(el('vg-a-rezim').textContent === 'S gyroskopem', 'klik přepnul režim SYNCHRONNĚ');
	ok(cesta2 === '100,280 100,190 190,190 190,280 100,280', '★ s gyrem je dráha přesný čtverec (4×90°)');
	ok(robot2.includes('translate(100.0 280.0)') && robot2.includes('rotate(0.0)'),
		'★ s gyrem robot skončí PŘESNĚ na startu a natočený jako na začátku');
	ok(el('vg-a-mezera').atributy.opacity === '0', 's gyrem mezera zmizí (opacity 0)');
	ok(el('vg-a-text2a').textContent.includes('360'), 'hlásí přesně 360° (žádná chyba)');
	ok(cesta1 !== cesta2 && robot1 !== robot2, '★ klik změnil vykreslenou dráhu i polohu robota (diff je nenulový)');
}

// ───────────────────── Scéna B: parkování, kola vs. čidlo vzdálenosti ───────
{
	ok(el('vg-b-cil').value === '10', 'výchozí cíl je 10 cm (kulaté číslo)');
	ok(el('vg-b-rezim').textContent === 'Bez čidla (podle kol)', '★ výchozí stav ukazuje NEJDŘÍV problém (bez čidla)');
	ok(el('vg-b-info').textContent.includes('7 cm') && el('vg-b-info').textContent.includes('10 cm'),
		'★ bez čidla auto skončí na 10−3=7 cm místo požadovaných 10 cm (prokluz 3 cm)');
	const transformKol = el('vg-b-robot').atributy.transform;
	const mereniKol = { ...el('vg-b-mereni').atributy };

	klik('vg-b-mod'); // přepnout na čidlo vzdálenosti — synchronně
	ok(el('vg-b-rezim').textContent === 'S čidlem vzdálenosti', 'klik přepnul režim SYNCHRONNĚ');
	ok(el('vg-b-info').textContent.includes('přesně 10 cm'), '★ s čidlem auto zastaví PŘESNĚ na cíli (10 cm)');
	const transformCidlo = el('vg-b-robot').atributy.transform;
	const mereniCidlo = el('vg-b-mereni').atributy;
	ok(transformKol !== transformCidlo, '★ klik posunul robota na jinou pozici (diff je nenulový)');
	ok(mereniKol.stroke === '#e03131' && mereniCidlo.stroke === '#2f9e44',
		'barva měřicí úsečky se mění podle spolehlivosti metody (červená chyba × zelená přesnost)');

	// jiný cíl (15 cm) — s čidlem musí sedět přesně, bez čidla musí být pořád o 3 cm blíž
	klik('vg-b-mod'); // zpět na "bez čidla"
	zmen('vg-b-cil', '15');
	ok(el('vg-b-info').textContent.includes('12 cm') && el('vg-b-info').textContent.includes('15 cm'),
		'★ posuvník: bez čidla i pro cíl 15 cm platí týž prokluz (15−3=12 cm)');
	klik('vg-b-mod'); // "s čidlem"
	ok(el('vg-b-info').textContent.includes('přesně 15 cm'), '★ s čidlem sedí přesně i pro jiný cíl (15 cm)');
}

console.log(`\n${kontrol - chyby}/${kontrol} kontrol prošlo.`);
if (chyby) { console.log(`❌ ${chyby} kontrol selhalo.`); process.exit(1); }
console.log('✅ Vše v pořádku.');

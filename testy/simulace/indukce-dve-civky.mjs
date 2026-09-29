#!/usr/bin/env node
// Ověření IndukceDveCivkySimulace.astro — dvě cívky (2 a 4 závity), každá
// s ampérmetrem, dva stejné magnety pohybující se naráz.
//
// Co by lhalo nejtišeji: ručička vychýlená, i když magnet STOJÍ (jádro
// výkladu: bez změny pole se nic neindukuje), a cívka se 4 závity, která
// neukazuje dvojnásobek proti 2 závitům při jinak stejných podmínkách.
//
// Očekávaná čísla jsou v testu NAPEVNO (tabulka výchylek, polohy magnetu
// v px, úhly ručiček) — kdyby se braly z komponenty, test by odkýval
// cokoli, co si komponenta vymyslí.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const scena = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];
const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', style: {}, posluchaci: {},
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
// Prvek, který ve zdroji NEEXISTUJE, test odhalí (překlep v id = nic se nekreslí).
const neznama = new Set();
const document = {
	getElementById: (id) => {
		if (!new RegExp(`id="${id}"`).test(zdroj)) neznama.add(id);
		return prvky.get(id) || novy(id);
	},
	querySelectorAll: () => [],
};
let ted = 0;
let fronta = [];
const sandbox = {
	document, console, Math,
	performance: { now: () => ted },
	requestAnimationFrame: (cb) => { fronta.push(cb); return fronta.length; },
	cancelAnimationFrame: (id) => { fronta[id - 1] = null; },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const el = (id) => prvky.get(id);
const at = (id, k) => el(id)?.atributy[k];
const txt = (id) => el(id)?.textContent ?? '';
const klik = (id) => { for (const f of el(id).posluchaci.click ?? []) f({ target: el(id) }); };
// nechá běžet animaci ms milisekund po krocích 16 ms (s pevným stropem kroků)
const bez = (ms) => {
	const konec = ted + ms;
	let kroky = 0;
	while (ted < konec && kroky < 2000) {
		ted = Math.min(konec, ted + 16);
		kroky++;
		const aktualni = fronta;
		fronta = [];
		for (const cb of aktualni) if (cb) cb(ted);
	}
};
const uhelRucicky = (z) => {
	const m = (at(`idc-r${z}`, 'transform') ?? '').match(/^rotate\((-?\d+) (\d+) 235\)$/);
	return m ? { uhel: Number(m[1]), stred: Number(m[2]) } : null;
};
const svg = el('idc-svg');
const { __vychylka: vychylka, __yMagnetu: yMagnetu, __dilky: dilky, __stav: stav, __RYCHLOSTI: RYCHLOSTI } = svg;

console.log('— scéna —');
{
	ok(!/classList/.test(skript.replace(/getElementById\(`idc-(rychlost|sila)\$\{q\}`\)\.classList/g, '')),
		'classList se používá jen na tlačítkách mimo SVG — stav scény nese SVG atribut');
	const civka = (id) => ((zdroj.match(new RegExp(`<g id="${id}"[\\s\\S]*?</g>`)) || [''])[0].match(/<path /g) || []).length;
	ok(civka('idc-predni2') === 2 && civka('idc-zadni2') === 2, `cívka „2 závity" má 2 závity (${civka('idc-predni2')})`);
	ok(civka('idc-predni4') === 4 && civka('idc-zadni4') === 4, `cívka „4 závity" má 4 závity (${civka('idc-predni4')})`);
	ok(scena.includes('cívka se 2 závity') && scena.includes('cívka se 4 závity'), 'popisky cívek jsou ve scéně');
	for (const id of ['idc-zasun', 'idc-vysun', 'idc-stop', 'idc-rychlost1', 'idc-rychlost2', 'idc-rychlost3', 'idc-sila1', 'idc-sila2', 'idc-otoc']) {
		ok((el(id)?.posluchaci.click ?? []).length === 1, `tlačítko ${id} má posluchač kliknutí`);
	}
	const idsSvg = [...scena.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
	const idsVse = [...zdroj.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
	ok(new Set(idsVse).size === idsVse.length, 'žádné id se ve zdroji neopakuje');
	for (const id of ['idc-r2', 'idc-r4', 'idc-o2', 'idc-o4', 'idc-zaver1', 'idc-zaver2', 'idc-nastaveni', 'idc-m2-h', 'idc-m4-d', 'idc-s2', 'idc-s4']) {
		ok(idsSvg.includes(id), `${id} leží uvnitř <svg> (je vidět v náhledu)`);
	}
}

{
	// popisky stupnice leží mimo ciferník (r 52) — ručička (délka 44) je nezakryje
	let mimo = true;
	for (const A of [260, 580]) for (const m of scena.matchAll(new RegExp(`<text x="(\\d+)" y="(\\d+)"[^>]*>(0|12)</text>`, 'g'))) {
		const x = Number(m[1]), y = Number(m[2]);
		if (Math.abs(x - A) < 80 && Math.hypot(x - A, y - 4 - 235) < 56) mimo = false;
	}
	ok(mimo, 'popisky 0 a 12 leží vně ciferníku, mimo dráhu ručičky');
	ok(/N<\/tspan> = severní pól/.test(scena) && /S<\/tspan> = jižní pól/.test(scena), 'legenda: N = severní pól, S = jižní pól');
}
{
	ok(!/dvakrát|dvojnásob|2×|2 ×/i.test(scena + skript), 'scéna ani texty netvrdí násobek (dvakrát / 2×)');
	// jedna ryska = 1 dílek = 5°: u každého ampérmetru 25 rysek od −60° do +60° po 5°
	for (const A of [260, 580]) {
		const uhly = [...scena.matchAll(new RegExp(`<line x1="${A}" y1="187"[^>]*>`, 'g'))]
			.map((m) => Number((m[0].match(/rotate\((-?\d+) /) || [0, 0])[1])).sort((a, b) => a - b);
		const cekam = Array.from({ length: 25 }, (_, i) => (i - 12) * 5);
		ok(JSON.stringify(uhly) === JSON.stringify(cekam), `ampérmetr ${A}: 25 rysek po 5° = po 1 dílku (${uhly.length})`);
	}
}
console.log('\n— výchozí stav: magnety stojí, ručičky na nule —');
{
	ok(neznama.size === 0, `skript sahá jen na existující prvky${neznama.size ? ` (chybí: ${[...neznama]})` : ''}`);
	const s = stav();
	ok(s.smer === 0 && s.poloha === 0 && s.rychlost === 2 && s.sila === 1 && s.dole === 'N',
		`výchozí: stojí, venku, středně, slabý, dolů pól N (${JSON.stringify(s)})`);
	const r2 = uhelRucicky(2), r4 = uhelRucicky(4);
	ok(r2?.uhel === 0 && r2?.stred === 260, `ručička 2 závity na nule, otočná kolem středu ampérmetru 260 (${at('idc-r2', 'transform')})`);
	ok(r4?.uhel === 0 && r4?.stred === 580, `ručička 4 závity na nule, střed 580 (${at('idc-r4', 'transform')})`);
	ok(txt('idc-o2') === 'ampérmetr: 0 — ručička na nule' && txt('idc-o4') === 'ampérmetr: 0 — ručička na nule', 'oba odečty: 0');
	ok(txt('idc-s2') === '' && txt('idc-s4') === '', 'bez pohybu žádná šipka');
	ok(/stojí/.test(txt('idc-zaver1')) && /nemění/.test(txt('idc-zaver1')) && /0/.test(txt('idc-zaver1')), `závěr: ${txt('idc-zaver1')}`);
	ok(txt('idc-zaver2') === 'Zasuň magnety do cívek a porovnej oba ampérmetry.', `nápověda: ${txt('idc-zaver2')}`);
	ok(el('idc-vysun').disabled === true && el('idc-zasun').disabled === false, 'magnet venku: „vysunout“ je zakázané, „zasunout“ povolené');
	ok(txt('idc-nastaveni') === 'rychlost: středně · magnet: slabý · dolů: severní pól (N) · magnety stojí venku', `hlavička: ${txt('idc-nastaveni')}`);
	// magnet venku: horní půlka 80, dolní 135, šířka 30, středěný na cívce
	ok(at('idc-m2-h', 'y') === '80' && at('idc-m2-d', 'y') === '135' && at('idc-m4-h', 'y') === '80' && at('idc-m4-d', 'y') === '135',
		'magnety jsou venku nad cívkou (y 80 a 135)');
	ok(at('idc-m2-h', 'x') === '95' && at('idc-m4-h', 'x') === '415' && at('idc-m2-d', 'width') === '30',
		'slabý magnet: šířka 30, na ose cívky (x 95 a 415)');
	ok(at('idc-m2-ht', 'y') === '114' && at('idc-m2-dt', 'y') === '169', 'písmena pólů uprostřed půlek');
	ok(txt('idc-m2-dt') === 'N' && txt('idc-m2-ht') === 'S' && at('idc-m2-d', 'fill') === '#e03131' && at('idc-m2-h', 'fill') === '#1971c2',
		'dolní půlka N červená, horní S modrá');
}

console.log('\n— fyzika: tabulka výchylek (dílky) —');
{
	// směr · rychlost · síla · (závity : 2) · natočení — napevno spočteno ručně
	const TAB = [
		[1, 1, 1, 2, 'N', 1], [1, 2, 1, 2, 'N', 2], [1, 3, 1, 2, 'N', 3],
		[1, 1, 2, 2, 'N', 2], [1, 3, 2, 2, 'N', 6], [1, 3, 2, 4, 'N', 12],
		[1, 2, 1, 4, 'N', 4], [-1, 2, 1, 4, 'N', -4], [1, 2, 1, 4, 'S', -4],
		[-1, 2, 1, 4, 'S', 4], [-1, 3, 2, 2, 'S', 6], [0, 3, 2, 4, 'N', 0],
		[1, 1, 2, 4, 'S', -4], [-1, 1, 1, 2, 'N', -1],
	];
	let sedi = true;
	for (const [sm, r, s, z, p, cekam] of TAB) if (vychylka(sm, r, s, z, p) !== cekam) { sedi = false; console.log(`   ${[sm, r, s, z, p]} → ${vychylka(sm, r, s, z, p)}, čekám ${cekam}`); }
	ok(sedi, `${TAB.length} kombinací sedí na tabulku`);
	let cela = true, max = 0, dvojnasobek = true, stoji = true;
	for (const sm of [-1, 0, 1]) for (const r of [1, 2, 3]) for (const s of [1, 2]) for (const p of ['N', 'S']) {
		const d2 = vychylka(sm, r, s, 2, p), d4 = vychylka(sm, r, s, 4, p);
		if (!Number.isInteger(d2) || !Number.isInteger(d4)) cela = false;
		max = Math.max(max, Math.abs(d2), Math.abs(d4));
		if (d4 !== 2 * d2) dvojnasobek = false;
		if (sm === 0 && (d2 !== 0 || d4 !== 0)) stoji = false;
	}
	ok(cela, 'všechny výchylky jsou celá čísla');
	ok(max === 12, `největší výchylka 12 dílků = konec stupnice (${max})`);
	ok(dvojnasobek, '4 závity dávají vždy přesně dvojnásobek 2 závitů');
	ok(stoji, 'magnet v klidu → 0 u všech kombinací');
	ok(dilky(1) === '1 dílek' && dilky(-2) === '2 dílky' && dilky(3) === '3 dílky' && dilky(4) === '4 dílky'
		&& dilky(6) === '6 dílků' && dilky(8) === '8 dílků' && dilky(12) === '12 dílků' && dilky(0) === '0 dílků', 'skloňování dílek/dílky/dílků');
	ok(yMagnetu(0) === 80 && yMagnetu(1) === 190 && yMagnetu(0.5) === 135, `dráha magnetu 80 → 190 px (${yMagnetu(0)}, ${yMagnetu(0.5)}, ${yMagnetu(1)})`);
	ok(RYCHLOSTI[1].doba === 3000 && RYCHLOSTI[2].doba === 1500 && RYCHLOSTI[3].doba === 1000
		&& RYCHLOSTI[1].nazev === 'pomalu' && RYCHLOSTI[2].nazev === 'středně' && RYCHLOSTI[3].nazev === 'rychle',
		'doby přejezdu 3 / 1,5 / 1 s → rychlosti 1 : 2 : 3');
}

console.log('\n— zasouvání (klik mění SVG hned) —');
{
	klik('idc-zasun');
	ok(stav().smer === 1 && uhelRucicky(2)?.uhel === 10 && uhelRucicky(4)?.uhel === 20,
		`hned po kliknutí: 2 závity 10° (2 dílky), 4 závity 20° (4 dílky) — ${at('idc-r2', 'transform')} / ${at('idc-r4', 'transform')}`);
	ok(txt('idc-o2') === 'ampérmetr: 2 dílky doprava' && txt('idc-o4') === 'ampérmetr: 4 dílky doprava', `odečty: ${txt('idc-o2')} | ${txt('idc-o4')}`);
	ok(txt('idc-s2') === '↓' && txt('idc-s4') === '↓', 'šipky dolů (zasouvání)');
	ok(/^Zasouváš/.test(txt('idc-zaver1')) && /indukovaný proud/.test(txt('idc-zaver1')), `závěr: ${txt('idc-zaver1')}`);
	ok(txt('idc-zaver2') === '2 závity: 2 dílky doprava · 4 závity: 4 dílky doprava', `závěr 2: ${txt('idc-zaver2')}`);
	ok(/zasouvají se$/.test(txt('idc-nastaveni')), `hlavička: ${txt('idc-nastaveni')}`);
	// spojitost a rychlost: středně = 1500 ms na 110 px
	let pred = Number(at('idc-m2-h', 'y')), skok = 0;
	for (let i = 0; i < 40; i++) { bez(16); const y = Number(at('idc-m2-h', 'y')); skok = Math.max(skok, Math.abs(y - pred)); pred = y; }
	ok(skok < 20 && skok > 0, `pohyb je plynulý (největší skok ${skok.toFixed(2)} px)`);
	ok(Math.abs(stav().poloha - 640 / 1500) < 1e-9, `po 640 ms je magnet v poloze 640/1500 (${stav().poloha.toFixed(4)})`);
	ok(at('idc-m2-d', 'y') === String(Number(at('idc-m2-h', 'y')) + 55) && at('idc-m4-h', 'y') === at('idc-m2-h', 'y'),
		'oba magnety jsou ve stejné výšce, dolní půlka pod horní');
	ok(at('idc-m2-dt', 'y') === String(Number(at('idc-m2-h', 'y')) + 89) && at('idc-m2-ht', 'y') === String(Number(at('idc-m2-h', 'y')) + 34), 'písmena pólů jedou s magnetem');
	ok(uhelRucicky(4)?.uhel === 20, 'během pohybu ručička drží výchylku');
	bez(1000);
	ok(stav().smer === 0 && stav().poloha === 1, `po 1,5 s magnet dojel dovnitř a zastavil se (${JSON.stringify(stav())})`);
	ok(at('idc-m2-h', 'y') === '190' && at('idc-m4-d', 'y') === '245', 'magnety jsou uvnitř cívek (y 190)');
	ok(uhelRucicky(2)?.uhel === 0 && uhelRucicky(4)?.uhel === 0, 'magnet stojí uvnitř → obě ručičky na 0');
	ok(/zastavily/.test(txt('idc-zaver1')) && txt('idc-zaver2') === 'Při pohybu bylo: 2 závity 2 dílky doprava · 4 závity 4 dílky doprava',
		`závěr po zastavení: ${txt('idc-zaver1')} | ${txt('idc-zaver2')}`);
	ok(fronta.every((c) => c === null), 'po zastavení už animace neběží');
	ok(el('idc-zasun').disabled === true && el('idc-vysun').disabled === false, 'magnet uvnitř: „zasunout“ zakázané, „vysunout“ povolené');
	ok(/stojí uvnitř$/.test(txt('idc-nastaveni')), `hlavička: ${txt('idc-nastaveni')}`);
	const zaverPred = txt('idc-zaver1');
	klik('idc-zasun');
	ok(stav().smer === 0 && stav().poloha === 1 && uhelRucicky(4)?.uhel === 0 && at('idc-m2-h', 'y') === '190' && txt('idc-zaver1') === zaverPred,
		'zasunout, když je magnet uvnitř: nic se nestane (žádný skok polohy)');
}

console.log('\n— vysouvání = opačný směr —');
{
	klik('idc-vysun');
	ok(stav().smer === -1 && stav().poloha === 1 && uhelRucicky(2)?.uhel === -10 && uhelRucicky(4)?.uhel === -20,
		`vysouvání: −10° / −20° (${at('idc-r2', 'transform')})`);
	ok(txt('idc-o4') === 'ampérmetr: 4 dílky doleva' && txt('idc-s4') === '↑' && /^Vysouváš/.test(txt('idc-zaver1')), `${txt('idc-o4')} ${txt('idc-s4')}`);
	ok(/vysouvají se$/.test(txt('idc-nastaveni')), 'hlavička: vysouvají se');
	bez(700);
	ok(stav().smer === -1 && stav().poloha > 0.5 && stav().poloha < 0.55, `po 0,7 s je magnet v půli cesty ven (${stav().poloha.toFixed(3)})`);
	klik('idc-stop');
	const p = stav().poloha;
	ok(stav().smer === 0 && uhelRucicky(4)?.uhel === 0 && txt('idc-s2') === '', 'zastavit → ručičky na 0, šipka zmizí');
	bez(500);
	ok(stav().poloha === p, 'po zastavení se magnet už nehne');
	ok(/4 závity 4 dílky doleva/.test(txt('idc-zaver2')), `závěr pamatuje poslední pohyb: ${txt('idc-zaver2')}`);
	klik('idc-vysun');
	bez(1000);
	ok(stav().poloha === 0 && stav().smer === 0, 'vysunutý magnet je venku a stojí');
	ok(el('idc-vysun').disabled === true && /stojí venku$/.test(txt('idc-nastaveni')), 'venku: „vysunout“ zakázané');
	klik('idc-vysun');
	ok(stav().smer === 0 && stav().poloha === 0 && at('idc-m2-h', 'y') === '80' && uhelRucicky(2)?.uhel === 0, 'vysunout, když je magnet venku: nic se nestane');
	klik('idc-zasun');
	ok(stav().smer === 1 && stav().poloha === 0 && el('idc-vysun').disabled === false && el('idc-zasun').disabled === false, 'za pohybu jsou obě tlačítka povolená');
	bez(100);
	klik('idc-vysun');
	ok(stav().smer === -1 && stav().poloha > 0.06 && stav().poloha < 0.08, `obrat uprostřed: vysouvá se z místa, kde byl (${stav().poloha.toFixed(3)})`);
	klik('idc-stop');
}

console.log('\n— dvojklik ve stejném okamžiku —');
{
	klik('idc-stop'); klik('idc-vysun'); bez(3500);
	ok(stav().poloha === 0 && stav().smer === 0, 'výchozí: magnet venku, stojí');
	klik('idc-zasun'); klik('idc-vysun');
	ok(stav().smer === 0 && stav().poloha === 0 && uhelRucicky(2)?.uhel === 0 && uhelRucicky(4)?.uhel === 0,
		`zasunout+vysunout naráz: magnet stojí venku, ručičky 0 (${JSON.stringify(stav())}, ${at('idc-r2', 'transform')})`);
	ok(/stojí venku$/.test(txt('idc-nastaveni')) && txt('idc-s2') === '' && txt('idc-o4') === 'ampérmetr: 0 — ručička na nule',
		`nápis souhlasí se stavem: ${txt('idc-nastaveni')}`);
	ok(fronta.every((c) => c === null), 'animace po dvojkliku neběží');
	bez(500);
	ok(stav().poloha === 0 && uhelRucicky(4)?.uhel === 0, 'ani po chvíli se nic nepohne');
	klik('idc-zasun'); bez(1600); klik('idc-vysun'); klik('idc-zasun');
	ok(stav().smer === 0 && stav().poloha === 1 && uhelRucicky(2)?.uhel === 0 && /stojí uvnitř$/.test(txt('idc-nastaveni')),
		'vysunout+zasunout naráz uvnitř: stojí uvnitř, ručičky 0');
	klik('idc-vysun'); bez(1400); klik('idc-stop');
}

console.log('\n— rychlost, síla, otočení —');
{
	klik('idc-rychlost3');
	ok(stav().rychlost === 3 && uhelRucicky(4)?.uhel === 0 && /^Změna: rychlost rychle — magnety stojí/.test(txt('idc-zaver1')),
		`změna v klidu: ručičky zůstanou na 0 (${txt('idc-zaver1')})`);
	ok(/^rychlost: rychle ·/.test(txt('idc-nastaveni')), 'hlavička ukazuje rychle');
	const start = stav().poloha;
	klik('idc-zasun');
	ok(stav().poloha === start && start > 0, `zasouvání pokračuje z místa, kde magnet stál (${start.toFixed(3)})`);
	ok(uhelRucicky(2)?.uhel === 15 && uhelRucicky(4)?.uhel === 30, `rychle: 3 a 6 dílků (${uhelRucicky(2)?.uhel}°, ${uhelRucicky(4)?.uhel}°)`);
	bez(496);
	ok(Math.abs(stav().poloha - (start + 0.496)) < 1e-9, `rychle = 1 s na dráhu (${stav().poloha})`);
	klik('idc-rychlost1');
	ok(uhelRucicky(4)?.uhel === 10 && txt('idc-zaver1') === 'Změna: rychlost pomalu — výchylka u 4 závitů klesla z 6 na 2.', `zpomalení: ${txt('idc-zaver1')}`);
	const p = stav().poloha;
	bez(304);
	ok(Math.abs(stav().poloha - (p + 0.304 / 3)) < 1e-9, `po zpomalení jede plynule dál třikrát pomaleji (${stav().poloha.toFixed(4)})`);
	klik('idc-sila2');
	ok(stav().sila === 2 && uhelRucicky(2)?.uhel === 10 && uhelRucicky(4)?.uhel === 20, 'silný magnet: dvojnásobná výchylka');
	ok(txt('idc-zaver1') === 'Změna: silný magnet — výchylka u 4 závitů vzrostla z 2 na 4.', `závěr: ${txt('idc-zaver1')}`);
	ok(at('idc-m2-h', 'width') === '44' && at('idc-m4-d', 'width') === '44' && at('idc-m2-h', 'x') === '88' && at('idc-m4-d', 'x') === '408',
		'silný magnet je širší a zůstává na ose cívky');
	klik('idc-sila2');
	ok(txt('idc-zaver1') === 'Změna: silný magnet — výchylka se nezměnila.', 'stejná volba = nezměnilo se');
	klik('idc-otoc');
	ok(stav().dole === 'S' && uhelRucicky(2)?.uhel === -10 && uhelRucicky(4)?.uhel === -20, 'otočený magnet: ručičky na opačnou stranu');
	ok(txt('idc-zaver1') === 'Změna: magnet otočen, dolů je jižní pól (S) — ručičky ukazují na opačnou stranu.', `závěr: ${txt('idc-zaver1')}`);
	ok(txt('idc-m2-dt') === 'S' && txt('idc-m4-ht') === 'N' && at('idc-m2-d', 'fill') === '#1971c2' && at('idc-m4-h', 'fill') === '#e03131',
		'otočení: dole S (modrá), nahoře N (červená)');
	ok(/dolů: jižní pól \(S\)/.test(txt('idc-nastaveni')), 'hlavička: jižní pól (S)');
	klik('idc-rychlost1');
	ok(txt('idc-zaver1') === 'Změna: rychlost pomalu — výchylka se nezměnila.', 'stejná rychlost znovu = nezměnilo se');
	klik('idc-otoc');
	ok(stav().dole === 'N' && uhelRucicky(4)?.uhel === 20, 'druhé otočení vrátí N dolů');
	klik('idc-sila1');
	ok(stav().sila === 1 && /klesla z 4 na 2/.test(txt('idc-zaver1')), `slabý magnet: ${txt('idc-zaver1')}`);
	klik('idc-stop');
	klik('idc-otoc');
	ok(txt('idc-zaver1') === 'Změna: magnet otočen, dolů je jižní pól (S) — magnety stojí, ručičky zůstávají na 0.', `otočení v klidu: ${txt('idc-zaver1')}`);
	klik('idc-vysun');
	ok(uhelRucicky(2)?.uhel === 5 && uhelRucicky(4)?.uhel === 10 && txt('idc-o2') === 'ampérmetr: 1 dílek doprava',
		'vysouvání otočeného magnetu = zase doprava (dvě otočení směru se vyruší)');
	ok(!/^Změna/.test(txt('idc-zaver1')), 'nový pohyb smaže starou zprávu o změně');
}

console.log('\n— všechny kombinace: celé hodnoty a vysvětlení —');
{
	let vse = true;
	klik('idc-stop'); klik('idc-zasun'); bez(200); klik('idc-stop');
	ok(stav().poloha > 0 && stav().poloha < 1, 'kombinace se zkoušejí z polohy uprostřed dráhy');
	for (const r of [1, 2, 3]) for (const s of [1, 2]) for (const otoc of [false, true]) for (const pohyb of ['idc-zasun', 'idc-vysun']) {
		klik('idc-stop');
		klik(`idc-rychlost${r}`); klik(`idc-sila${s}`);
		if ((stav().dole === 'S') !== otoc) klik('idc-otoc');
		klik(pohyb);
		const sm = pohyb === 'idc-zasun' ? 1 : -1;
		const cekam = sm * r * s * (otoc ? -1 : 1);
		const u2 = uhelRucicky(2)?.uhel, u4 = uhelRucicky(4)?.uhel;
		const o = `${txt('idc-o2')}|${txt('idc-o4')}|${txt('idc-zaver2')}`;
		if (u2 !== cekam * 5 || u4 !== cekam * 10 || /\d[.,]\d/.test(o) || !txt('idc-zaver1')) {
			vse = false; console.log(`   r${r} s${s} ${otoc ? 'S' : 'N'} ${pohyb}: ${u2}/${u4}, čekám ${cekam * 5}/${cekam * 10}; ${o}`);
		}
	}
	ok(vse, '24 kombinací: úhly sedí, žádná desetinná čísla, vždy vysvětlení');
}

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše v pořádku');
process.exit(chyby ? 1 : 0);

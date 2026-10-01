#!/usr/bin/env node
// Ověření UcinkyProuduABezpecnostSimulace.astro — Ohmův zákon na lidském těle.
//
// PŘEPSÁNO 1. 10. 2026 spolu s komponentou podle nového výkladu (Codex,
// rozhodnutí učitele 1. 10. 2026; nález N7 kontroly bodu 13): orientační
// stupnice 1 / 10 / 30 mA, odpor kůže 150 000 Ω (suchá) / 2 000 Ω (vlhká),
// výpočty 230 V : 2 000 Ω = 115 mA a 3 V : 150 000 Ω = 20 µA. Staré hodnoty
// (práh 50 V, 1 750 Ω, 100 000 / 1 500 / 1 000 Ω, pásma 5/15/25/60/80 mA,
// volba „izolace = 0 mA") se NESMÍ vrátit — hlídá to kontrola „nic navíc":
// každé číslo, které dítě vidí, musí být v nezávisle napsaném seznamu z výkladu.
//
// Zásady převzaté z dřívějších nálezů kontrolorů (14.–15. 8.):
//  • texty se porovnávají s NATVRDO napsanými očekáváními v testu, ne samy se sebou;
//  • zakázané fráze se hledají i ve statickém HTML, ne jen ve vykreslených textech;
//  • rAF se při načtení nesmí zavolat (dřív nekonečná smyčka zamrazila náhled);
//  • dráha proudu se v SVG kreslí AŽ PO trupu (jinak ji tělo překryje).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2] ?? new URL('../../src/components/skola2/UcinkyProuduABezpecnostSimulace.astro', import.meta.url), 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');
// Co dítě skutečně čte ze statické části: bez frontmatteru, stylů a značek.
const viditelnyStaticky = html
	.replace(/^---[\s\S]*?\n---/, '')
	.replace(/<style>[\s\S]*?<\/style>/, '')
	.replace(/<[^>]+>/g, ' ');

const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {},
		posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(dite) { (this.deti ||= []).push(dite); },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
let vytvorenychNS = 0;
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	createElementNS: () => { vytvorenychNS++; return novy(`ns-${vytvorenychNS}`); },
};
let pocetRAF = 0, pocetCAF = 0;
const sandbox = {
	document, performance: { now: () => 0 }, console, Math,
	requestAnimationFrame: () => { pocetRAF++; return pocetRAF; },
	cancelAnimationFrame: () => { pocetCAF++; },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);
const pocetRAFPriNacteni = pocetRAF;

const svgA = prvky.get('upb-a-svg');
const svgB = prvky.get('upb-b-svg');
const { __proudMA: proudMA, __pasmo: pasmo, __mAtoText: mAtoText, __PASMA: PASMA, __SITUACE: SITUACE,
	__ODPOR_KUZE: ODPOR_KUZE, __geometrieZonySegmentu: geometrieZonySegmentu, __PASMO_BAR: PASMO_BAR } = svgA;
const { __CESTY: CESTY, __NAPETI_B: NAPETI_B, __ODPOR_B: ODPOR_B, __boduNaCeste: boduNaCeste,
	__krokB: krokB, __jedeB: jedeB } = svgB;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const el = (id) => prvky.get(id);
const nastavA = (i) => { el('upb-a-situace').value = String(i); for (const f of el('upb-a-situace').posluchaci.input) f(); };
const nastavB = (i) => { el('upb-b-cesta').value = String(i); for (const f of el('upb-b-cesta').posluchaci.input) f(); };
const kliknoutPlay = () => { for (const f of el('upb-b-play').posluchaci.click) f(); };
const tecky = () => [1, 2, 3, 4, 5].map((n) => el(`ns-${n}`));
const polohyTecek = () => tecky().map((t) => `${t.getAttribute('cx')},${t.getAttribute('cy')}`).join(' | ');

// ── NEZÁVISLE natvrdo napsaná očekávání (opis výkladu, ne živých konstant) ──
const BARVA = { pod1: '#adb5bd', brneni: '#ffd43b', krec: '#ff922b', fibrilace: '#e03131' };
// Barva PÍSMA pásma (nález kontroly 1. 10.: #adb5bd na bílé = 2,07 : 1) — musí mít kontrast ≥ 4,5 : 1.
const TEXT = { pod1: '#495057', brneni: '#7a5c00', krec: '#a64b00', fibrilace: '#c92a2a' };
const AKTIVNI = '#f03e3e'; // kontakt, kudy proud vstupuje/vystupuje (scéna B) — jiná barva než „vlhká kůže" ve scéně A
const kontrast = (hex) => {
	const l = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 1.05 / (0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2] + 0.05);
};
const OCEKAVANA_PASMA = [
	{ klic: 'pod-1', limit: 1, nazev: 'pod 1 mA', barva: BARVA.pod1, text: TEXT.pod1,
		popis: 'Je to méně než 1 mA, kolem kterého člověk proud teprve ucítí jako brnění.' },
	{ klic: 'brneni', limit: 10, nazev: 'kolem 1 mA – brnění', barva: BARVA.brneni, text: TEXT.brneni,
		popis: 'Kolem 1 mA člověk proud ucítí jako brnění.' },
	{ klic: 'krec', limit: 30, nazev: 'kolem 10 mA – křeč', barva: BARVA.krec, text: TEXT.krec,
		popis: 'Kolem 10 mA může křeč zabránit tomu, aby se člověk pustil vodiče.' },
	{ klic: 'fibrilace', limit: Infinity, nazev: 'od 30 mA – riziko fibrilace', barva: BARVA.fibrilace, text: TEXT.fibrilace,
		popis: 'Od přibližně 30 mA při delším průchodu roste riziko fibrilace: srdce se chvěje a nedokáže účinně pumpovat krev.' },
];
const INFO = (U, R, I, barva, nazev) =>
	`<text x="530" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#2b2a26">U = ${U} V, R = ${R} Ω</text>`
	+ `<text x="530" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="${barva}">I = ${I}</text>`
	+ `<text x="530" y="128" text-anchor="middle" font-size="12" fill="#2b2a26">${nazev}</text>`;
const VAROVANI = (r1, r2) =>
	`<rect x="430" y="234" width="200" height="46" rx="8" fill="#ffffff" stroke="#e03131" stroke-width="3" />`
	+ `<text x="530" y="252" text-anchor="middle" font-size="12" font-weight="bold" fill="#e03131">${r1}</text>`
	+ `<text x="530" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#e03131">${r2}</text>`;
const OCEKAVANE_A = [
	{ out: 'malá baterie 3 V, suchá kůže', zdrojText: 'malá baterie — 3 V', kuzeText: 'suchá kůže — 150 000 Ω',
		x1: '95', y1: '72', navrat: 'M270,281 L270,335 L4,335 L4,160 L95,160 L95,150',
		ruka: '#ffd8a8', srdce: BARVA.pod1, pismo: TEXT.pod1, pasmoText: 'pod 1 mA', marker: '447,140 463,140 455,148',
		vypocet: 'I = U : R = 3 V : 150 000 Ω = <strong>20 µA</strong>',
		stav: 'malá baterie (3 V), suchá kůže: proud 20 µA. Je to méně než 1 mA, kolem kterého člověk proud teprve ucítí jako brnění. Výpočet ukazuje rozdíl proti zásuvce, není návodem zkoušet baterii na těle.',
		info: INFO('3', '150 000', '20 µA', TEXT.pod1, 'pod 1 mA'),
		varovani: VAROVANI('Jen výpočet — baterii', 'na těle nezkoušej!'), ikonaObsahuje: '#fab005' },
	{ out: 'zásuvka 230 V, vlhká kůže', zdrojText: 'zásuvka — 230 V', kuzeText: 'vlhká kůže — 2 000 Ω',
		x1: '105', y1: '110', navrat: 'M270,281 L270,335 L4,335 L4,160 L85,160 L85,120',
		ruka: '#4dabf7', srdce: BARVA.fibrilace, pismo: TEXT.fibrilace, pasmoText: 'od 30 mA – riziko fibrilace', marker: '597,140 613,140 605,148',
		vypocet: 'I = U : R = 230 V : 2 000 Ω = <strong>115 mA</strong>',
		stav: 'zásuvka (230 V), vlhká kůže: proud 115 mA. Od přibližně 30 mA při delším průchodu roste riziko fibrilace: srdce se chvěje a nedokáže účinně pumpovat krev. Zásuvka 230 V je životu nebezpečná — nikdy se to nezkouší.',
		info: INFO('230', '2 000', '115 mA', TEXT.fibrilace, 'od 30 mA – riziko fibrilace'),
		varovani: VAROVANI('⚠️ Zásuvka 230 V je životu', 'nebezpečná — nikdy nezkoušet!'), ikonaObsahuje: '#e9ecef' },
];
// malý článek na výšku x 79–111, y 80–150 (nález kontroly: dřív vypadal jako autobaterie)
const IKONA_BATERIE = '<rect x="79" y="80" width="32" height="70" rx="6" fill="#fab005" stroke="#2b2a26" stroke-width="3" />'
	+ '<rect x="89" y="72" width="12" height="8" fill="#adb5bd" stroke="#2b2a26" stroke-width="2" />';
const IKONA_ZASUVKA_B = '<rect x="40" y="50" width="60" height="70" rx="8" fill="#e9ecef" stroke="#2b2a26" stroke-width="3" />'
	+ '<line x1="60" y1="70" x2="60" y2="90" stroke="#2b2a26" stroke-width="4" />'
	+ '<line x1="80" y1="70" x2="80" y2="90" stroke="#2b2a26" stroke-width="4" />';
const POZADI_PASMA = [['430', BARVA.pod1], ['480', BARVA.brneni], ['530', BARVA.krec], ['580', BARVA.fibrilace]]
	.map(([x, b]) => `<rect x="${x}" y="150" width="50" height="26" fill="${b}" stroke="#2b2a26" stroke-width="1.5" />`).join('')
	+ [['480', '1'], ['530', '10'], ['580', '30']]
		.map(([x, h]) => `<text x="${x}" y="189" text-anchor="middle" font-size="11" font-weight="bold" fill="#495057">${h} mA</text>`).join('');
const OCEKAVANE_B = [
	{ klic: 'ruka-ruka', out: 'ruka → ruka', rukaP: AKTIVNI, nohaP: '#ced4da', kov: '1',
		// zpáteční cesta končí na levé hraně zásuvky (x 40–100, y 50–120) — nález kontroly 1. 10.
		d: 'M140,85 L250,145 L360,85', navrat: 'M373,135 L373,320 L4,320 L4,110 L60,110 L60,90',
		tecky: '140.0,85.0 | 184.0,109.0 | 228.0,133.0 | 272.0,133.0 | 316.0,109.0',
		teckyPo: '148.8,89.8 | 192.8,113.8 | 236.8,137.8 | 280.8,128.2 | 324.8,104.2',
		stav: 'ruka → ruka: Proud jde z levé ruky napříč hrudníkem přes srdce do pravé ruky, kterou se člověk zároveň dotýká kovového předmětu. Proud 115 mA. Od přibližně 30 mA při delším průchodu roste riziko fibrilace: srdce se chvěje a nedokáže účinně pumpovat krev.' },
	{ klic: 'ruka-noha', out: 'ruka → noha', rukaP: '#ced4da', nohaP: AKTIVNI, kov: '0',
		d: 'M140,85 L250,145 L283,283', navrat: 'M283,291 L283,320 L4,320 L4,110 L60,110 L60,90',
		tecky: '140.0,85.0 | 186.9,110.6 | 233.8,136.2 | 258.1,179.1 | 270.6,231.0',
		teckyPo: '149.4,90.1 | 196.3,115.7 | 243.2,141.3 | 260.6,189.4 | 273.1,241.4',
		stav: 'ruka → noha: Stačí dotyk JEDINOU rukou: proud jde z levé ruky přes hrudník a srdce do nohy a zemí zpět ke zdroji. Proud 115 mA. Od přibližně 30 mA při delším průchodu roste riziko fibrilace: srdce se chvěje a nedokáže účinně pumpovat krev.' },
];
// Čísla, která smí dítě v simulaci vidět — všechna jsou ve výkladu (1/10/30 mA,
// 150 000 / 2 000 Ω, 3 V, 230 V, 20 µA, 115 mA).
const POVOLENA_CISLA = new Set(['1', '3', '10', '20', '30', '115', '230', '2000', '150000']);
const ZAKAZANE_FRAZE = [/holou rukou/i, /klidn[ěe].{0,25}dotk/i, /nic\s*(ti\s*)?nehroz[íi]/i, /skoro nikdy/i,
	/neubl[íi]ž/i, /odtrhni/i, /bezpečně?\s+dotkn/i, /ochrán\w*.{0,15}u\s+zásuvky/i, /spolehliv[ěe].{0,15}ochrán/i,
	/bezpečn[éá] napětí/i, /izolac/i];
const cislaVTextu = (t) => [...String(t).replace(/<[^>]+>/g, ' ').replace(/(\d)[  ](?=\d)/g, '$1').matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0]);

console.log('— načtení: animace se sama nerozběhne —');
ok(pocetRAFPriNacteni === 0, `requestAnimationFrame se při načtení nezavolal (${pocetRAFPriNacteni}×)`);
ok(jedeB() === false, 'hned po načtení animace neběží');
ok(vytvorenychNS === 5 && el('upb-b-elektrony').deti?.length === 5, `vzniklo právě 5 teček proudu (${vytvorenychNS})`);

console.log('\n— konstanty z výkladu —');
ok(ODPOR_KUZE.sucha === 150000 && ODPOR_KUZE.vlhka === 2000, `odpor kůže 150 000 / 2 000 Ω (${ODPOR_KUZE.sucha}, ${ODPOR_KUZE.vlhka})`);
ok(Object.keys(ODPOR_KUZE).length === 2, 'žádný další stav kůže (mokrá 1 000 Ω ani odhady se nevrátily)');
ok(SITUACE.length === 2 && SITUACE[0].U === 3 && SITUACE[0].kuze === 'sucha' && SITUACE[1].U === 230 && SITUACE[1].kuze === 'vlhka',
	'dvě situace = dva výpočty z výkladu: 3 V se suchou kůží, 230 V s vlhkou');
ok(NAPETI_B === 230 && ODPOR_B === 2000, `část B: 230 V a 2 000 Ω (${NAPETI_B}, ${ODPOR_B})`);
ok(proudMA(230, 2000) === 115, `I = 230 V : 2 000 Ω = 115 mA (${proudMA(230, 2000)})`);
ok(proudMA(3, 150000) === 0.02, `I = 3 V : 150 000 Ω = 0,02 mA (${proudMA(3, 150000)})`);
ok(mAtoText(0.02) === '20 µA' && mAtoText(115) === '115 mA' && mAtoText(1500) === '1 500 mA',
	`zobrazení proudu: ${mAtoText(0.02)}, ${mAtoText(115)}, ${mAtoText(1500)}`);

console.log('\n— pásma: přesně orientační stupnice z výkladu (1 / 10 / 30 mA) —');
{
	let spatne = PASMA.length === OCEKAVANA_PASMA.length ? null : `počet pásem ${PASMA.length}, čekal jsem ${OCEKAVANA_PASMA.length}`;
	OCEKAVANA_PASMA.forEach((o, i) => {
		const z = PASMA[i] ?? {};
		for (const k of ['klic', 'limit', 'nazev', 'barva', 'text', 'popis']) if (z[k] !== o[k]) spatne = `pásmo ${i}: ${k} „${z[k]}“, čekal jsem „${o[k]}“`;
	});
	ok(spatne === null, spatne ?? 'všechna 4 pásma (klíč, práh, název, barva, popis) sedí s nezávislou tabulkou');
	for (const prah of [1, 10, 30]) {
		ok(pasmo(prah - 0.001).limit === prah && pasmo(prah).limit !== prah, `hranice ${prah} mA je ostrá`);
	}
	ok(pasmo(1e6).klic === 'fibrilace', 'velký proud padne do posledního pásma');
	ok(el('upb-a-pasmo-pozadi').innerHTML === POZADI_PASMA && el('upb-b-pasmo-pozadi').innerHTML === POZADI_PASMA,
		'pásmová stupnice v obou scénách: 4 dlaždice po 50 px přesně podle očekávání');
	ok(PASMO_BAR.sirkaCelkem === 200 && geometrieZonySegmentu(3).x === 580, 'stupnice dlaždicuje šířku 200 px');
}

console.log('\n— scéna A: obě polohy posuvníku, vše proti natvrdo napsaným textům —');
ok(/id="upb-a-situace" min="0" max="1" step="1" value="0"/.test(html), 'posuvník situace 0–1, výchozí 0 (baterie)');
OCEKAVANE_A.forEach((o, i) => {
	nastavA(i);
	const pary = [
		['výstup posuvníku', el('upb-a-out-situace').textContent, o.out],
		['popisek zdroje', el('upb-a-zdroj-text').textContent, o.zdrojText],
		['popisek kůže', el('upb-a-kuze-text').textContent, o.kuzeText],
		['drát x1', el('upb-a-drat-zdroj').getAttribute('x1'), o.x1],
		['drát y1', el('upb-a-drat-zdroj').getAttribute('y1'), o.y1],
		['zpáteční cesta', el('upb-a-navrat').getAttribute('d'), o.navrat],
		['barva ruky', el('upb-a-ruka').getAttribute('fill'), o.ruka],
		['barva srdce', el('upb-a-srdce').getAttribute('fill'), o.srdce],
		['text pásma', el('upb-a-pasmo-text').textContent, o.pasmoText],
		['barva textu pásma', el('upb-a-pasmo-text').getAttribute('fill'), o.pismo],
		['ukazatel', el('upb-a-marker').getAttribute('points'), o.marker],
		['barva ukazatele', el('upb-a-marker').getAttribute('fill'), o.pismo],
		['vzorec', el('upb-a-vypocet').innerHTML, o.vypocet],
		['stav', el('upb-a-stav').textContent, o.stav],
		['info panel', el('upb-a-info').innerHTML, o.info],
		['varování', el('upb-a-varovani').innerHTML, o.varovani],
	];
	for (const [co, mam, cekam] of pary) ok(mam === cekam, `A${i} ${co}: ${mam === cekam ? `„${String(cekam).slice(0, 70)}“` : `mám „${mam}“, čekal jsem „${cekam}“`}`);
	ok(el('upb-a-zdroj').innerHTML.includes(o.ikonaObsahuje), `A${i}: ikona zdroje odpovídá situaci`);
	ok(/nikdy|nezkoušej/.test(el('upb-a-varovani').innerHTML), `A${i}: varování ve scéně vždy zakazuje pokus`);
});
nastavA(0);
ok(el('upb-a-zdroj').innerHTML === IKONA_BATERIE, 'ikona baterie má přesně očekávaný tvar');

console.log('\n— scéna B: obě cesty —');
ok(/id="upb-b-cesta" min="0" max="1" step="1" value="0"/.test(html), 'posuvník cesty 0–1, výchozí 0 (ruka → ruka)');
ok(CESTY.length === 2 && CESTY.every((c, i) => c.klic === OCEKAVANE_B[i].klic), 'právě dvě cesty, obě přes srdce; volba „izolace" se nevrátila');
ok(el('upb-b-zdroj').innerHTML === IKONA_ZASUVKA_B, 've scéně B je nakreslená zásuvka');
OCEKAVANE_B.forEach((o, i) => {
	nastavB(i);
	const pary = [
		['výstup posuvníku', el('upb-b-out-cesta').textContent, o.out],
		['pravá ruka', el('upb-b-ruka-p').getAttribute('fill'), o.rukaP],
		['pravá noha', el('upb-b-noha-p').getAttribute('fill'), o.nohaP],
		['obrys pravé ruky', el('upb-b-ruka-p').getAttribute('stroke'), o.rukaP === AKTIVNI ? '#2b2a26' : '#868e96'],
		['obrys pravé nohy', el('upb-b-noha-p').getAttribute('stroke'), o.nohaP === AKTIVNI ? '#2b2a26' : '#868e96'],
		['kovový předmět v pravé ruce', el('upb-b-kov').getAttribute('opacity'), o.kov],
		['dráha', el('upb-b-cesta-linka').getAttribute('d'), o.d],
		['zpáteční cesta', el('upb-b-navrat').getAttribute('d'), o.navrat],
		['tečky v klidu', polohyTecek(), o.tecky],
		['srdce', el('upb-b-srdce').getAttribute('fill'), BARVA.fibrilace],
		['ukazatel', el('upb-b-marker').getAttribute('points'), '597,140 613,140 605,148'],
		['barva ukazatele', el('upb-b-marker').getAttribute('fill'), TEXT.fibrilace],
		['text pásma', el('upb-b-pasmo-text').textContent, 'od 30 mA – riziko fibrilace'],
		['barva textu pásma', el('upb-b-pasmo-text').getAttribute('fill'), TEXT.fibrilace],
		['vzorec', el('upb-b-vypocet').innerHTML, 'I = U : R = 230 V : 2 000 Ω = <strong>115 mA</strong>'],
		['stav', el('upb-b-stav').textContent, o.stav],
		['info panel', el('upb-b-info').innerHTML, INFO('230', '2 000', '115 mA', TEXT.fibrilace, 'od 30 mA – riziko fibrilace')],
	];
	for (const [co, mam, cekam] of pary) ok(mam === cekam, `B ${o.klic} ${co}: ${mam === cekam ? 'sedí' : `mám „${mam}“, čekal jsem „${cekam}“`}`);

	// animace: start, dva snímky 100 ms od sebe → posun o 0,1 s × 0,4 = 0,04 délky cesty
	const rafPred = pocetRAF;
	kliknoutPlay();
	ok(pocetRAF === rafPred + 1 && jedeB() === true && el('upb-b-play').textContent === '⏸ zastav proud', `B ${o.klic}: klik spustí animaci (1× rAF)`);
	krokB(1000);
	krokB(1100);
	ok(polohyTecek() === o.teckyPo, `B ${o.klic}: po 0,1 s se tečky posunou o 0,04 cesty: ${polohyTecek()}`);
	krokB(5100); // výpadek snímků 4 s se ořízne na 0,1 s (žádný skok)
	const ocekPoSkoku = OCEKAVANE_B[i].teckyPo;
	ok(polohyTecek() !== ocekPoSkoku && polohyTecek() !== o.tecky, `B ${o.klic}: dlouhý výpadek snímku posune tečky jen o krok`);
	const cafPred = pocetCAF;
	kliknoutPlay();
	ok(pocetCAF === cafPred + 1 && jedeB() === false && el('upb-b-play').textContent === '▶ pusť proud', `B ${o.klic}: druhý klik animaci zastaví`);
	const stoji = polohyTecek();
	krokB(9000);
	ok(polohyTecek() === stoji, `B ${o.klic}: zastavená animace už tečkami nehýbe`);
});
{
	// výpadek snímku: 2 snímky (1000 → 1100 → 5100) = 0,2 s × 0,4 = 0,08 cesty
	nastavB(0);
	kliknoutPlay(); krokB(1000); krokB(1100); krokB(5100);
	const p = boduNaCeste(0.08, [{ x: 140, y: 85 }, { x: 250, y: 145 }, { x: 360, y: 85 }]);
	ok(el('ns-1').getAttribute('cx') === '157.6' && p.x.toFixed(1) === '157.6', `výpadek snímku se ořízne na 0,1 s (první tečka x=${el('ns-1').getAttribute('cx')}, čekal jsem 157.6)`);
	kliknoutPlay();
	nastavB(0);
	ok(polohyTecek() === OCEKAVANE_B[0].tecky, 'přepnutí cesty vrátí tečky do klidového rozmístění');
}

console.log('\n— nic navíc: každé číslo, které dítě vidí, je ve výkladu —');
{
	const texty = [viditelnyStaticky];
	for (let i = 0; i < 2; i++) {
		nastavA(i); nastavB(i);
		for (const id of ['upb-a-out-situace', 'upb-a-zdroj-text', 'upb-a-kuze-text', 'upb-a-pasmo-text', 'upb-a-stav', 'upb-b-out-cesta', 'upb-b-pasmo-text', 'upb-b-stav']) texty.push(el(id).textContent);
		for (const id of ['upb-a-vypocet', 'upb-a-info', 'upb-a-varovani', 'upb-b-vypocet', 'upb-b-info']) texty.push(el(id).innerHTML);
	}
	const navic = new Set();
	for (const t of texty) for (const c of cislaVTextu(t)) if (!POVOLENA_CISLA.has(c)) navic.add(c);
	ok(navic.size === 0, navic.size ? `čísla bez opory ve výkladu: ${[...navic].join(', ')}` : `všechna čísla v ${texty.length} textech jsou z výkladu`);
	let fraze = null;
	for (const t of texty) for (const f of ZAKAZANE_FRAZE) if (!fraze && f.test(t)) fraze = `${f} v „${t.replace(/\s+/g, ' ').slice(0, 80)}…“`;
	ok(fraze === null, fraze ? `zakázaná fráze: ${fraze}` : 'žádný text neobsahuje zakázanou frázi ani starou „izolaci" či „bezpečné napětí"');
	ok(!/50\s*V|1\s?750|100\s?000|1\s?500\s*Ω/.test(zdroj.replace(/^---[\s\S]*?\n---/, '')), 'staré hodnoty (50 V, 1 750 Ω, 100 000 Ω, 1 500 Ω) nejsou nikde mimo poznámku autora');
	nastavA(0); nastavB(0);
}

console.log('\n— statická scéna —');
{
	const blokB = html.match(/<svg id="upb-b-svg"[\s\S]*?<\/svg>/)?.[0] ?? '';
	const iTrup = blokB.indexOf('<rect x="220" y="95"'), iCesta = blokB.indexOf('id="upb-b-cesta-linka"'), iTecky = blokB.indexOf('id="upb-b-elektrony"');
	ok(iTrup >= 0 && iCesta > iTrup && iTecky > iTrup, 'dráha i tečky se kreslí AŽ PO trupu (nad tělem)');
	ok(blokB.includes('230 V je životu nebezpečné') && blokB.includes('nikdy nezkoušet!'), 'scéna B má trvalé varování přímo v obrázku');
	ok(blokB.includes('zásuvka — 230 V'), 'scéna B má popisek zdroje');
	ok(/id="upb-b-ruka-l"[^>]*fill="#f03e3e"/.test(blokB) && !/#4dabf7/.test(blokB), 'scéna B: kontakty proudu červené, modrá (= vlhká kůže ve scéně A) se tu nepoužívá');
	const iZdrojA = html.indexOf('<g id="upb-a-zdroj">'), iDratA = html.indexOf('id="upb-a-drat-zdroj"'), iNavratA = html.indexOf('id="upb-a-navrat"');
	ok(iZdrojA >= 0 && iDratA > iZdrojA && iNavratA > iZdrojA, 'scéna A: zdroj se kreslí PŘED vodiči (konce vodičů na pólech jsou vidět)');
	const iZdrojB = html.indexOf('<g id="upb-b-zdroj">'), iDratB = html.indexOf('id="upb-b-drat-zdroj"'), iNavratB = html.indexOf('id="upb-b-navrat"');
	ok(iZdrojB >= 0 && iDratB > iZdrojB && iNavratB > iZdrojB, 'scéna B: zásuvka se kreslí PŘED vodiči');
	for (const p of PASMA) ok(kontrast(p.text) >= 4.5, `písmo pásma „${p.nazev}“ ${p.text} má na bílé kontrast ${kontrast(p.text).toFixed(2)} : 1 (≥ 4,5)`);
	ok(html.includes('pro střídavý proud'), 'scéna upozorňuje, že stupnice je ve výkladu pro střídavý proud');
	for (const s of ['Ohmův zákon', '150 000 Ω', '2 000 Ω', 'nikdy se to nezkouší', 'orientační', 'přes srdce']) ok(html.includes(s), `ve viditelném HTML je „${s}“`);
	ok(!zdroj.includes('import '), 'skript neobsahuje import');
}

console.log('\n— OBECNĚ: každý vodič a každá zpáteční cesta končí na pólu / kolíku / těle (nález kontroly 2: drát z boku článku, cesta z ruky místo z kovu) —');
{
	const L = (hex) => {
		const l = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
		return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
	};
	globalThis.kontrastMezi = (a, b) => (Math.max(L(a), L(b)) + 0.05) / (Math.min(L(a), L(b)) + 0.05);
	const naUsecce = (p, a, b) => {
		const dx = b.x - a.x, dy = b.y - a.y, t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
		return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y) <= 1;
	};
	const naObvodu = (p, r) => [[r.x, r.y, r.x + r.w, r.y], [r.x, r.y + r.h, r.x + r.w, r.y + r.h], [r.x, r.y, r.x, r.y + r.h], [r.x + r.w, r.y, r.x + r.w, r.y + r.h]]
		.some(([x1, y1, x2, y2]) => naUsecce(p, { x: x1, y: y1 }, { x: x2, y: y2 }));
	const naKruznici = (p, c) => Math.abs(Math.hypot(p.x - c.x, p.y - c.y) - c.r) <= 1;
	const tvary = (s) => ({
		rect: [...s.matchAll(/<rect x="([\d.-]+)" y="([\d.-]+)" width="([\d.]+)" height="([\d.]+)"[^>]*fill="([^"]+)"/g)].map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4], fill: m[5] })),
		line: [...s.matchAll(/<line x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map((m) => ({ a: { x: +m[1], y: +m[2] }, b: { x: +m[3], y: +m[4] } })),
	});
	const body = (d) => [...d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)].map((m) => ({ x: +m[1], y: +m[2] }));
	// Póly: článek = malá čepička (+) a dno těla (−); zásuvka = dva kolíky. Oba konce obvodu na RŮZNÝCH pólech.
	const polyZdroje = (ikona) => {
		const t = tvary(ikona);
		if (t.line.length === 2) return t.line.map((l) => (p) => naUsecce(p, l.a, l.b));
		const [telo, cepicka] = t.rect;
		return [(p) => naObvodu(p, cepicka) && Math.abs(p.y - cepicka.y) <= 1, (p) => Math.abs(p.y - (telo.y + telo.h)) <= 1 && p.x > telo.x && p.x < telo.x + telo.w];
	};
	const chodidloA = { x: 270, y: 273, r: 8 }, rukaA = { x: 225, y: 95 };
	for (let i = 0; i < 2; i++) {
		nastavA(i);
		const poly = polyZdroje(el('upb-a-zdroj').innerHTML);
		const drat = el('upb-a-drat-zdroj');
		const zac = { x: +drat.getAttribute('x1'), y: +drat.getAttribute('y1') };
		const kon = { x: +(drat.getAttribute('x2') ?? html.match(/id="upb-a-drat-zdroj"[^>]*x2="(\d+)"/)[1]), y: +(drat.getAttribute('y2') ?? html.match(/id="upb-a-drat-zdroj"[^>]*y2="(\d+)"/)[1]) };
		const cesta = body(el('upb-a-navrat').getAttribute('d'));
		const iPlus = poly.findIndex((f) => f(zac)), iMinus = poly.findIndex((f) => f(cesta.at(-1)));
		ok(poly.length === 2 && iPlus >= 0 && iMinus >= 0 && iPlus !== iMinus, `A${i}: drát začíná na jednom pólu (${zac.x},${zac.y}) a zpáteční cesta končí na DRUHÉM (${cesta.at(-1).x},${cesta.at(-1).y})`);
		ok(kon.x === rukaA.x && kon.y === rukaA.y, `A${i}: drát končí ve středu ruky (${kon.x},${kon.y})`);
		ok(naKruznici(cesta[0], chodidloA), `A${i}: zpáteční cesta začíná na okraji chodidla (${cesta[0].x},${cesta[0].y})`);
	}
	const polyB = polyZdroje(el('upb-b-zdroj').innerHTML);
	const dratB = html.match(/id="upb-b-drat-zdroj" x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="(\d+)"/).slice(1).map(Number);
	const iDrat = polyB.findIndex((f) => f({ x: dratB[0], y: dratB[1] }));
	ok(iDrat >= 0 && dratB[2] === 140 && dratB[3] === 85, `B: drát vede z kolíku zásuvky (${dratB[0]},${dratB[1]}) do středu levé ruky (${dratB[2]},${dratB[3]})`);
	const kov = html.match(/<rect id="upb-b-kov" x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/).slice(1).map(Number);
	const kovR = { x: kov[0], y: kov[1], w: kov[2], h: kov[3] };
	ok(Math.hypot(Math.max(kovR.x - 360, 0), 0) <= 9, 'B: kovová tyč se dotýká pravé ruky (okraj ruky x=369 ≥ levá hrana tyče)');
	for (let i = 0; i < 2; i++) {
		nastavB(i);
		const cesta = body(el('upb-b-navrat').getAttribute('d'));
		const iKonec = polyB.findIndex((f) => f(cesta.at(-1)));
		ok(iKonec >= 0 && iKonec !== iDrat, `B ${CESTY[i].klic}: zpáteční cesta končí na DRUHÉM kolíku zásuvky (${cesta.at(-1).x},${cesta.at(-1).y})`);
		const startOk = i === 0 ? naObvodu(cesta[0], kovR) : naKruznici(cesta[0], { x: 283, y: 283, r: 8 });
		ok(startOk, `B ${CESTY[i].klic}: zpáteční cesta začíná ${i === 0 ? 'na kovovém předmětu' : 'na okraji chodidla'} (${cesta[0].x},${cesta[0].y})`);
	}
	nastavA(0); nastavB(0);
}

console.log('\n— OBECNĚ: kontrast všech textů ve scénách a ukazatelů pásma —');
{
	const texty = [];
	const sber = (s) => { for (const m of s.matchAll(/<text\b([^>]*)>/g)) texty.push({ fill: m[1].match(/fill="([^"]+)"/)?.[1], y: +(m[1].match(/\by="([\d.]+)"/)?.[1] ?? 0), id: m[1].match(/id="([^"]+)"/)?.[1] }); };
	for (let i = 0; i < 2; i++) {
		nastavA(i); nastavB(i);
		for (const id of ['upb-a-info', 'upb-a-varovani', 'upb-a-pasmo-pozadi', 'upb-b-info']) sber(el(id).innerHTML);
		for (const id of ['upb-a-pasmo-text', 'upb-b-pasmo-text']) texty.push({ fill: el(id).getAttribute('fill'), id });
		for (const id of ['upb-a-marker', 'upb-b-marker']) {
			const f = el(id).getAttribute('fill');
			ok(kontrastMezi(f, '#f8f9fa') >= 3, `${id} (poloha ${i}): ukazatel ${f} na pozadí ${kontrastMezi(f, '#f8f9fa').toFixed(2)} : 1 (≥ 3)`);
		}
	}
	for (const blok of html.match(/<svg[\s\S]*?<\/svg>/g)) sber(blok);
	let spatne = null;
	for (const t of texty) {
		if (!t.fill) continue; // statické texty bez fill v plaketách dostanou fill dynamicky (sbírá se zvlášť)
		// popisky hranic stupnice (y=189) leží přímo na pozadí scény, ostatní texty na bílých plaketách
		const pozadi = t.y === 189 ? '#f8f9fa' : '#ffffff';
		const k = kontrastMezi(t.fill, pozadi);
		if (k < 4.5) spatne = `text ${t.id ?? ''} ${t.fill} na ${pozadi}: ${k.toFixed(2)} : 1`;
	}
	ok(spatne === null && texty.length > 20, spatne ?? `všech ${texty.length} textů ve scénách má kontrast ≥ 4,5 : 1`);
	nastavA(0); nastavB(0);
}

console.log('\n— odolnost: neplatné hodnoty posuvníků —');
{
	let spadlo = null;
	try { nastavA('abc'); nastavB('99'); } catch (e) { spadlo = e.message; }
	ok(spadlo === null, spadlo ?? 'neplatné hodnoty skript nezhroutí');
	ok(el('upb-a-stav').textContent === OCEKAVANE_A[0].stav && el('upb-b-stav').textContent === OCEKAVANE_B[0].stav, 'neplatná hodnota → výchozí stav');
}

console.log(chyby === 0 ? '\n✅ Účinky proudu na člověka, bezpečnost: vše sedí.' : `\n❌ Účinky proudu na člověka, bezpečnost: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

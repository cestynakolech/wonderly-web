// Test animace „Jak značíme směr proudu — šíp a vodič" (9. ročník, Magnetické pole vodiče a cívky).
// Spuštění: node testy/simulace/znaceni-proudu.mjs src/components/skola2/ZnaceniProuduSimulace.astro
//
// Co se hlídá (očekávané hodnoty natvrdo / nezávislým výpočtem zde, ne týmž kódem):
//  - časování fází (φ, proměna šipka→šíp, popisky) v přesných sekundách — k nim se nahrává hlas,
//  - 3D natočení a perspektivní promítnutí (D = 800) v konkrétních bodech,
//  - že značky vznikají z geometrie: z čela je ostří hrotu ve středu a kreslí se navrch,
//    zezadu se navrch kreslí pera opeření; čelo vodiče ukazuje tečku / křížek jen ve správné fázi,
//  - statický obraz při prefers-reduced-motion (obě značky), ovládání tlačítky a posuvníkem,
//  - smyčka podle performance.now() (ne podle počtu snímků).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2] || 'src/components/skola2/ZnaceniProuduSimulace.astro', 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const svgText = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];

function spust({ omezit = false } = {}) {
	const prvky = new Map();
	const novyPrvek = (id) => {
		const p = {
			id, atributy: {}, textContent: '', innerHTML: '', value: '', style: {}, dataset: {}, posluchaci: {},
			classList: { add() {}, remove() {}, toggle() {} },
			setAttribute(k, v) { this.atributy[k] = String(v); },
			getAttribute(k) { return this.atributy[k]; },
			addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
		};
		prvky.set(id, p);
		return p;
	};
	const fronta = [];
	let ted = 0;
	const sandbox = {
		document: { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] },
		performance: { now: () => ted },
		requestAnimationFrame: (f) => { fronta.push(f); },
		console, Math, parseInt, String, Number, Array,
	};
	if (omezit) sandbox.matchMedia = (q) => ({ matches: q === '(prefers-reduced-motion: reduce)' });
	vm.createContext(sandbox);
	vm.runInContext(skript, sandbox);
	const el = (id) => prvky.get(id);
	return {
		el,
		svg: el('zp-svg'),
		fronta,
		nastavCas(ms) { ted = ms; },
		krok() { const f = fronta.shift(); if (f) f(ted); },
		klik: (id) => el(id).posluchaci.click.forEach((f) => f()),
		posun: (v) => { el('zp-cas').value = String(v); el('zp-cas').posluchaci.input.forEach((f) => f()); },
	};
}

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const blizko = (a, b, tol = 0.051) => Math.abs(a - b) <= tol;

// ---------- šablona ----------
console.log('— šablona —');
ok(/<section class="ramecek simulace">/.test(zdroj), 'obal <section class="ramecek simulace">');
ok(!/\bimport\s/.test(skript) && !/https?:\/\//.test(skript), 'skript bez importů a externích knihoven');
for (const id of ['zp-sip', 'zp-drat', 'zp-popisky']) ok(new RegExp(`id="${id}"`).test(svgText), `skupina ${id} je uvnitř <svg>`);
ok(/aria-label="[^"]*tečka v kolečku[^"]*křížek v kolečku/.test(svgText), 'aria-label popisuje tečku i křížek v kolečku');
ok(/prefers-reduced-motion: reduce/.test(skript), 'skript respektuje prefers-reduced-motion');
ok(!/classList/.test(skript), 'stav se nekreslí přes classList (v náhledu no-op)');

// ---------- časování fází (natvrdo) ----------
console.log('— časování —');
const A = spust();
const stav = A.svg.__stav;
const PHI = [[0, 0], [1, 0], [2.5, 0], [3, 0], [3.5, 14.0625], [4, 45], [4.5, 75.9375], [5, 90], [6, 90], [7.4, 90],
	[7.5, 90], [8, 71.28], [8.75, 0], [9.5, -71.28], [10, -90], [11, -90], [12.4, -90], [12.75, -75.9375], [13, -45], [13.5, 0], [13.75, 0], [14, 0], [-1, -45], [27, -45]];
for (const [t, phi] of PHI) ok(blizko(stav(t).phi, phi, 0.01), `t = ${t} s: natočení φ = ${phi}° (${stav(t).phi})`);
const M = [[0, 0], [1.9, 0], [2, 0], [2.5, 0.5], [2.75, 0.84375], [3, 1], [6, 1], [11, 1], [13.4, 1], [13.75, 0.5], [13.875, 0.15625]];
for (const [t, m] of M) ok(blizko(stav(t).m, m, 0.001), `t = ${t} s: proměna šipka→šíp m = ${m} (${stav(t).m})`);
const POPISKY = [
	[0, 'Šipka ukazuje', 'směr proudu ve vodiči.', false], [1.99, 'Šipka ukazuje', 'směr proudu ve vodiči.', false],
	[2, 'Šipka se mění v šíp:', 'hrot vpředu, opeření vzadu.', false],
	[3, 'Šíp i vodič se otáčejí…', 'hrot se stáčí k nám.', false], [4.99, 'Šíp i vodič se otáčejí…', 'hrot se stáčí k nám.', false],
	[5, 'proud teče k nám', 'hrot = tečka v kolečku', true], [7.49, 'proud teče k nám', 'hrot = tečka v kolečku', true],
	[7.5, 'Šíp i vodič se otáčejí…', 'hrot se stáčí od nás.', false],
	[10, 'proud teče od nás', 'opeření = křížek v kolečku', true], [12.49, 'proud teče od nás', 'opeření = křížek v kolečku', true],
	[12.5, 'Návrat na začátek…', 'šíp se vrací zpět.', false], [13.99, 'Návrat na začátek…', 'šíp se vrací zpět.', false],
];
for (const [t, r1, r2, v] of POPISKY) {
	const f = stav(t).faze;
	ok(f.r1 === r1 && f.r2 === r2 && Boolean(f.vysledek) === v, `t = ${t} s: popisek „${r1} / ${r2}"`);
}

// ---------- 3D: natočení a promítnutí (nezávislý výpočet) ----------
console.log('— 3D promítnutí —');
const natoc = A.svg.__natoc, promitni = A.svg.__promitni;
const q90 = natoc([150, 0, 0], 90);
ok(blizko(q90[0], 0, 1e-9) && q90[1] === 0 && blizko(q90[2], 150, 1e-9), 'φ = 90°: hrot na ose míří přímo k divákovi (z = 150)');
const qm90 = natoc([-150, 0, 0], -90);
ok(blizko(qm90[0], 0, 1e-9) && blizko(qm90[2], 150, 1e-9), 'φ = −90°: opeření míří k divákovi (z = 150)');
const a30 = Math.PI / 6;
const q30 = natoc([1, 2, 3], 30);
ok(blizko(q30[0], Math.cos(a30) - 3 * Math.sin(a30), 1e-9) && q30[1] === 2 && blizko(q30[2], Math.sin(a30) + 3 * Math.cos(a30), 1e-9), 'natočení [1,2,3] o 30° kolem svislé osy');
const p1 = promitni([0, 0, 150], [240, 95]);
ok(p1[0] === 240 && p1[1] === 95 && p1[2] === 150 && blizko(p1[3], 800 / 650, 1e-9), 'bod 150 před středem: zvětšení 800/650');
const p2 = promitni([100, 50, 0], [240, 95]);
ok(p2[0] === 340 && p2[1] === 45 && p2[3] === 1, 'bod v rovině středu: bez zvětšení, osa y míří nahoru');
const p3 = promitni([100, 50, -200], [240, 235]);
ok(p3[0] === 320 && p3[1] === 195 && blizko(p3[3], 0.8, 1e-9), 'bod 200 za středem: zmenšení 800/1000');

// ---------- kresba ----------
console.log('— kresba —');
const cisla = (s, attr) => [...s.matchAll(new RegExp(`${attr}="([-\\d.]+)"`, 'g'))].map((m) => +m[1]);
const body = (poly) => (poly.match(/points="([^"]+)"/)?.[1].split(' ') ?? []).map((b) => b.split(',').map(Number));
const prvni = (html, dil) => html.match(new RegExp(`<[^>]*data-dil="${dil}"[^>]*>`))?.[0] ?? '';
const vsechny = (html, dil) => html.match(new RegExp(`<[^>]*data-dil="${dil}"[^>]*>`, 'g')) ?? [];
const rozsah = (poly, i) => { const v = body(poly).map((b) => b[i]); return [Math.min(...v), Math.max(...v)]; };
const v = A.svg.__vykresli;
const sip = () => A.el('zp-sip').innerHTML, drat = () => A.el('zp-drat').innerHTML, pop = () => A.el('zp-popisky').innerHTML;

// t = 0: šipka z boku
v(0);
ok(vsechny(sip(), 'pero').length === 0 && !/kolecko/.test(sip()), 't = 0: šipka nemá opeření');
let ostri = prvni(sip(), 'ostri');
ok(cisla(ostri, 'cx')[0] === 390 && cisla(ostri, 'cy')[0] === 95 && cisla(ostri, 'r')[0] === 3, 't = 0: ostří šipky vpravo (390, 95), r = 3');
ok(!/celo-/.test(drat()), 't = 0: čela vodiče jsou z boku neviditelná');
const obrysHrotu0 = prvni(sip(), 'obrys-hrotu');
ok(rozsah(obrysHrotu0, 0)[0] === 362.5 && rozsah(obrysHrotu0, 0)[1] === 365.6, 't = 0: podstava hrotu šipky 26 px před ostřím (x 124 · 800/810 … 124 · 800/790)');
ok(rozsah(obrysHrotu0, 1)[0] === 85 && rozsah(obrysHrotu0, 1)[1] === 105,'t = 0: hrot šipky má poloměr 10 (y 85–105)');
ok(vsechny(drat(), 'plast').length === 12, 't = 0: z boku je vidět přesně polovina (12 z 24) ploch pláště');
ok(vsechny(sip(), 'drik').length === 4, 't = 0: z boku jsou vidět 4 z 8 ploch dříku');
const obrysy0 = drat().match(/<line [^>]*stroke-width="3" \/>/g) || [];
ok(obrysy0.length === 2 && cisla(obrysy0[0], 'x1')[0] === 50 && cisla(obrysy0[0], 'x2')[0] === 430 && cisla(obrysy0[0], 'y1')[0] === 213, 't = 0: horní obrys vodiče 50–430 px ve výšce 213');
ok(/font-size="32" font-weight="bold"[^>]*>Šipka ukazuje</.test(pop()) && /font-size="31"[^>]*>směr proudu ve vodiči.</.test(pop()),'t = 0: popisek „Šipka ukazuje / směr proudu ve vodiči."');
const barvy = [...drat().matchAll(/data-dil="plast"/g)].length && [...drat().matchAll(/<polygon [^>]*fill="(#[0-9a-f]{6})"[^>]*data-dil="plast"/g)].map((m) => m[1]);
const rgb = barvy.map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
ok(rgb.length === 12 && rgb.every(([r, g, b]) => r > g && g > b && r >= 158), 'stínování pláště: žluté odstíny (R > G > B), jas nejméně 0,62');
ok(new Set(barvy).size >= 3 && rgb.some(([r]) => r >= 230), 'stínování pláště: světlo dává aspoň 3 odstíny a světlou stranu');

// t = 2,5: šipka se mění v šíp
v(2.5);
ok(vsechny(sip(), 'pero').length === 4, 't = 2,5: opeření má 4 pera (2 zkřížené plochy)');
const kol25 = prvni(sip(), 'kolecko');
ok(rozsah(kol25, 0)[0] === 139.5 && rozsah(kol25, 0)[1] === 144.4 && rozsah(kol25, 1)[0] === 75 && rozsah(kol25, 1)[1] === 115, 't = 2,5: kolečko opeření z boku je úzká elipsa kolem x = 142 (perspektiva ±2,5), y 75–115 (poloměr 20)');
ostri = prvni(sip(), 'ostri');
ok(cisla(ostri, 'cx')[0] === 390, 't = 2,5: ostří zůstává na konci šípu');

// t = 4: natočeno o 45°
v(4);
ostri = prvni(sip(), 'ostri');
ok(blizko(cisla(ostri, 'cx')[0], 362.3) && cisla(ostri, 'cy')[0] === 95, 't = 4: ostří v perspektivě 45° na x = 362,3');
const obrysy4 = drat().match(/<line [^>]*stroke-width="3" \/>/g) || [];
ok(blizko(cisla(obrysy4[0], 'x1')[0], 125) && blizko(cisla(obrysy4[0], 'y1')[0], 216.2) && blizko(cisla(obrysy4[0], 'x2')[0], 401.5) && blizko(cisla(obrysy4[0], 'y2')[0], 208.6),
	't = 4: obrys vodiče se zkrátil a blízký konec je větší (perspektiva)');
ok(/celo-tecka/.test(drat()) && !/celo-krizek/.test(drat()), 't = 4: při otáčení k nám je vidět pravé čelo vodiče (tečka)');

// t = 6: z čela — tečka v kolečku
v(6);
let s = sip();
ostri = prvni(s, 'ostri');
ok(cisla(ostri, 'cx')[0] === 240 && cisla(ostri, 'cy')[0] === 95 && cisla(ostri, 'r')[0] === 3.7, 't = 6: ostří hrotu je přesně ve středu (240, 95), r = 3,7');
ok(s.trim().endsWith(ostri) && s.indexOf('data-dil="kolecko"') < s.indexOf('data-dil="hrot"'), 't = 6: hrot se kreslí navrch, kolečko opeření za ním (tečka v kolečku)');
const kol6 = prvni(s, 'kolecko');
ok(blizko(rozsah(kol6, 0)[0], 209.7, 0.11) && blizko(rozsah(kol6, 0)[1], 270.3, 0.11), 't = 6: kolečko opeření z čela má poloměr 30,3 (34 × 800/898)');
const hrotX = vsechny(s, 'hrot').flatMap((p) => body(p).map((b) => b[0]));
ok(hrotX.length > 0 && Math.max(...hrotX) - Math.min(...hrotX) < 22, 't = 6: štíhlý hrot je z čela jen malá tečka (průměr < 22 px)');
ok(/stroke-width="1.8" data-dil="obrys-hrotu"/.test(s), 't = 6: obrys hrotu se zvětšuje s perspektivou (1,8)');
ok(vsechny(s, 'hrot').length === 16, 't = 6: z čela je vidět všech 16 trojúhelníků kužele, podstava ne');
ok(blizko(rozsah(prvni(s, 'obrys-hrotu'), 1)[1], 105.4, 0.11), 't = 6: štíhlý šíp — podstava hrotu má poloměr 9 × 800/690 = 10,4');
let d = drat();
ok(/celo-tecka/.test(d) && /data-dil="tecka"/.test(d) && !/krizek/.test(d), 't = 6: čelo vodiče ukazuje tečku, ne křížek');
const celo6 = prvni(d, 'celo-tecka');
ok(blizko(rozsah(celo6, 0)[1], 268.9, 0.11) && blizko(rozsah(celo6, 1)[0], 206.1, 0.11), 't = 6: čelo vodiče má poloměr 28,9 (22 × 800/610)');
ok(blizko(rozsah(prvni(d, 'tecka'), 0)[1], 247.9, 0.11), 't = 6: tečka na čele má poloměr 7,9');
ok(d.indexOf('celo-tecka') > d.lastIndexOf('data-dil="plast"'), 't = 6: čelo se kreslí před pláštěm (blíž k divákovi)');
ok(/font-size="34" font-weight="bold"[^>]*>proud teče k nám</.test(pop()) && />hrot = tečka v kolečku</.test(pop()), 't = 6: popisek „proud teče k nám"');

// t = 11: zezadu — křížek v kolečku
v(11);
s = sip();
const posledniPero = s.lastIndexOf('data-dil="pero"');
ok(s.indexOf('data-dil="ostri"') < s.indexOf('data-dil="kolecko"') && s.indexOf('data-dil="kolecko"') < posledniPero, 't = 11: pera se kreslí navrch, kolečko za nimi, hrot nejdál');
const pera = vsechny(s, 'pero');
const strPera = pera.map((p) => { const b = body(p); return [b.reduce((a, x) => a + x[0], 0) / b.length, b.reduce((a, x) => a + x[1], 0) / b.length]; });
ok(pera.length === 4 && strPera.every(([x, y]) => blizko(Math.abs(x - 240), Math.abs(y - 95), 0.3) && Math.abs(x - 240) > 8), 't = 11: 4 pera leží na úhlopříčkách — křížek ×');
ok(vsechny(s, 'hrot').length === 1, 't = 11: zezadu je z hrotu vidět jen podstava kužele');
const peraX = pera.flatMap((p) => body(p).map((b) => Math.abs(b[0] - 240)));
ok(blizko(Math.max(...peraX), 24.8, 0.15), 't = 11: pera sahají do 34 × 0,85 × 800/660 · cos 45° = 24,8 px od středu (uvnitř kolečka)');
ok(pera.every((p) => /stroke-width="5"/.test(p)),'t = 11: pera mají silný obrys (z hrany vytvoří čáry křížku)');
d = drat();
ok(/celo-krizek/.test(d) && !/tecka/.test(d), 't = 11: čelo vodiče ukazuje křížek, ne tečku');
const kriz = d.match(/<line [^>]*data-dil="krizek" \/>/g) || [];
ok(kriz.length === 2 && kriz.every((l) => blizko(cisla(l, 'x1')[0] + cisla(l, 'x2')[0], 480, 0.11) && blizko(cisla(l, 'y1')[0] + cisla(l, 'y2')[0], 470, 0.11)), 't = 11: dvě čáry křížku procházejí středem čela (240, 235)');
ok(blizko(Math.abs(cisla(kriz[0], 'x1')[0] - cisla(kriz[0], 'x2')[0]), 28.9, 0.11) && /stroke-width="4.6"/.test(kriz[0]), 't = 11: rameno křížku 11 × 1,31, tloušťka 4,6');
ok(/>proud teče od nás</.test(pop()) && />opeření = křížek v kolečku</.test(pop()), 't = 11: popisek „proud teče od nás"');

// t = 8,75: zpět z boku — žádná čela, šíp celý
v(8.75);
ok(!/celo-/.test(drat()) && cisla(prvni(sip(), 'ostri'), 'cx')[0] === 390, 't = 8,75: šíp i vodič jsou znovu z boku');

// celá smyčka: žádné NaN / nekonečno v kresbě
let cista = true;
for (let t = 0; t < 14; t += 0.25) { v(t); if (/NaN|Infinity/.test(sip() + drat() + pop())) cista = false; }
ok(cista, 'celá smyčka po 0,25 s: žádné NaN ani nekonečno v kresbě');

// ---------- ovládání ----------
console.log('— ovládání —');
ok(A.fronta.length === 1, 'po načtení se spustí smyčka (1 požadavek na snímek)');
A.nastavCas(0); A.krok();
A.nastavCas(6000); A.krok();
ok(/proud teče k nám/.test(pop()) && A.el('zp-out-cas').textContent === '6 s', 'smyčka podle hodin: po 6 000 ms „proud teče k nám", čas 6 s');
A.nastavCas(11000); A.krok();
ok(/proud teče od nás/.test(pop()) && A.el('zp-cas').value === '11', 'po 11 000 ms „proud teče od nás", posuvník na 11');
A.nastavCas(15000); A.krok();
ok(/Šipka ukazuje/.test(pop()) && A.el('zp-cas').value === '1', 'po 15 000 ms se smyčka vrátí na začátek (1 s)');
A.klik('zp-hraj');
ok(A.el('zp-hraj').textContent === '▶ Přehrát', 'tlačítko Zastavit animaci zastaví');
const pred = A.fronta.length; A.nastavCas(20000); A.krok();
ok(A.fronta.length === pred - 1 && /Šipka ukazuje/.test(pop()), 'zastavená animace nežádá další snímky a obraz stojí');
A.klik('zp-hraj');
ok(A.el('zp-hraj').textContent === '⏸ Zastavit' && A.fronta.length === 1, 'Přehrát animaci znovu rozběhne');
A.nastavCas(20000); A.krok(); A.nastavCas(24000); A.krok();
ok(/proud teče k nám/.test(pop()), 'po rozběhnutí pokračuje od místa zastavení (1 s + 4 s = 5 s)');
A.klik('zp-k-nam');
ok(/proud teče k nám/.test(pop()) && A.el('zp-cas').value === '6' && A.el('zp-hraj').textContent === '▶ Přehrát', 'tlačítko ⊙ zastaví na 6 s (proud k nám)');
A.klik('zp-od-nas');
ok(/proud teče od nás/.test(pop()) && A.el('zp-cas').value === '11', 'tlačítko ⊗ zastaví na 11 s (proud od nás)');
const OCEK = ['Šipka ukazuje', 'Šipka ukazuje', 'Šipka se mění v šíp:', 'Šíp i vodič se otáčejí…', 'Šíp i vodič se otáčejí…', 'proud teče k nám', 'proud teče k nám', 'proud teče k nám',
	'Šíp i vodič se otáčejí…', 'Šíp i vodič se otáčejí…', 'proud teče od nás', 'proud teče od nás', 'proud teče od nás', 'Návrat na začátek…', 'Šipka ukazuje'];
for (let k = 0; k <= 14; k++) {
	A.posun(k);
	ok(pop().includes('>' + OCEK[k] + '<') && A.el('zp-out-cas').textContent === (k % 14) + ' s', `posuvník ${k} s: „${OCEK[k]}"`);
}

// ---------- namluvené vysvětlení: tlačítko, zvuk řídí čas animace ----------
console.log('— zvuk —');
{
	const Z = spust();
	const au = Z.el('zp-audio');
	let hrano = 0, pauz = 0;
	au.play = () => { hrano++; return Promise.resolve(); };
	au.pause = () => { pauz++; };
	const popZ = () => Z.el('zp-popisky').innerHTML;
	ok(hrano === 0, 'bez kliknutí se zvuk sám nepřehrává');
	ok(/id="zp-zvuk" aria-pressed="false">🔊 Poslechni si vysvětlení<\/button>/.test(zdroj), 'tlačítko „🔊 Poslechni si vysvětlení", aria-pressed = false');
	ok(/id="zp-zvuk"[^>]*aria-pressed/.test(zdroj) && /role="status"/.test(zdroj) && /<summary>Text namluveného vysvětlení/.test(zdroj), 'přístupnost: aria-pressed, role=status, text vysvětlení pro neslyšící');
	ok(/preload="none"/.test(zdroj) && !/autoplay/.test(zdroj), 'audio bez preload a bez autoplay');
	Z.nastavCas(9000); Z.krok(); // animace běží po hodinách někde uprostřed
	au.currentTime = 7;
	Z.klik('zp-zvuk');
	ok(hrano === 1 && au.currentTime === 0, 'klik spustí zvuk od začátku (play 1×, currentTime 0)');
	ok(/Šipka ukazuje</.test(popZ()) && Z.el('zp-cas').value === '0', 'klik vrátí animaci na začátek (0 s)');
	ok(!/Zastavit|⏹|▶/.test(Z.el('zp-zvuk').textContent || '') && Z.el('zp-zvuk').atributy['aria-pressed'] === 'true', 'za hraní: text se nemění, jen aria-pressed = true');
	au.currentTime = 6.2; Z.nastavCas(9500); Z.krok();
	ok(/proud teče k nám/.test(popZ()) && Z.el('zp-cas').value === '6', 'čas animace určuje zvuk (6,2 s → „proud teče k nám")');
	au.currentTime = 10.4; Z.nastavCas(9600); Z.krok();
	ok(/proud teče od nás/.test(popZ()) && Z.el('zp-cas').value === '10', 'čas animace určuje zvuk (10,4 s → „proud teče od nás")');
	Z.klik('zp-zvuk');
	ok(pauz === 1 && !/Zastavit|⏹|▶/.test(Z.el('zp-zvuk').textContent || ''), 'druhý klik zvuk zastaví');
	Z.klik('zp-zvuk');
	Z.klik('zp-k-nam');
	ok(pauz === 2 && !/Zastavit|⏹|▶/.test(Z.el('zp-zvuk').textContent || ''), 'ruční ovládání animace zvuk zastaví');
	Z.klik('zp-zvuk');
	Z.el('zp-audio').posluchaci.ended.forEach((f) => f());
	ok(!/Zastavit|⏹|▶/.test(Z.el('zp-zvuk').textContent || '') && Z.el('zp-zvuk').atributy['aria-pressed'] === 'false' && hrano === 3, 'po dohrání se tlačítko vrátí');
	Z.klik('zp-zvuk');
	au.play = () => Promise.reject(new Error('blokováno'));
	Z.klik('zp-zvuk'); Z.klik('zp-zvuk');
	await new Promise((r) => setTimeout(r, 0));
	ok(Z.el('zp-stav').textContent === 'Zvuk se nepodařilo přehrát.', 'selhání přehrání: hláška, tlačítko se vrátí');
}

// ---------- prefers-reduced-motion ----------
console.log('— bez pohybu —');
const B = spust({ omezit: true });
ok(B.fronta.length === 0 && B.el('zp-hraj').textContent === '▶ Přehrát', 'při omezení pohybu se animace sama nespustí');
const sS = B.el('zp-sip').innerHTML, dS = B.el('zp-drat').innerHTML, pS = B.el('zp-popisky').innerHTML;
const ostriS = vsechny(sS, 'ostri');
ok(ostriS.some((o) => cisla(o, 'cx')[0] === 120 && cisla(o, 'cy')[0] === 95), 'statický obraz: vlevo šíp z čela (ostří ve středu 120, 95)');
ok(vsechny(sS, 'pero').length === 8 && vsechny(sS, 'kolecko').length === 2, 'statický obraz: dva šípy (oba s opeřením)');
ok(/celo-tecka/.test(dS) && /celo-krizek/.test(dS), 'statický obraz: vodič s tečkou i s křížkem');
const tS = prvni(dS, 'tecka'), kS = dS.match(/<line [^>]*data-dil="krizek" \/>/)[0];
ok(rozsah(tS, 0)[1] < 240 && cisla(kS, 'x1')[0] > 240, 'statický obraz: tečka vlevo, křížek vpravo');
ok(B.el('zp-out-cas').textContent === 'pohyb vypnut — obě značky vedle sebe', 'statický obraz: u posuvníku je vysvětlení, proč se nic nehýbe');
ok(/>k nám</.test(pS) && />od nás</.test(pS),'statický obraz: popisky „k nám" a „od nás"');

// reduced-motion: klik na zvuk a dohrání vrátí statický obraz se značkami
{
	const R = spust({ omezit: true });
	const au = R.el('zp-audio');
	au.play = () => Promise.resolve(); au.pause = () => {};
	R.klik('zp-zvuk');
	R.el('zp-audio').posluchaci.ended.forEach((f) => f());
	const d = R.el('zp-drat').innerHTML, p = R.el('zp-popisky').innerHTML;
	ok(/celo-tecka/.test(d) && /celo-krizek/.test(d) && />k nám</.test(p) && />od nás</.test(p), 'omezený pohyb: po dohrání zvuku se vrátí statický obraz se značkami ⊙/⊗');
	ok(R.el('zp-out-cas').textContent === 'pohyb vypnut — obě značky vedle sebe', 'omezený pohyb: po dohrání zpět text o vypnutém pohybu');
}

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše v pořádku');
process.exit(chyby ? 1 : 0);

#!/usr/bin/env node
// Ověření SilaVektorSimulace.astro (F7 „Síla“: velikost, směr, působiště).
// Spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM.
//
// Proč vznikl (oprava 3. 10. 2026, odložený nález téma 2): text „tíhová síla Fg = 30 N“
// pod nadpisem se na displeji 400 px lámal mezi číslem a jednotkou („30 | N“). Oprava
// dala do textů MIMO SVG pevné mezery (NBSP). Test proto hlídá:
//  1) v HTML textu mimo SVG není „značka = číslo N“ s obyčejnou mezerou — jen s &nbsp;;
//  2) texty výsledku, které skript vypíše ve VŠECH stavech (11 velikostí × 5 směrů),
//     mají „Fg = 30 N“ i „F = … N“ s NBSP a nikde „číslo N“ s obyčejnou mezerou;
//  3) skript doběhne, ovladače jsou připojené;
//  4) fyzika scény: šipka F vychází z působiště (200, 240), délka 3 px na 1 N, směr
//     podle tlačítka; tíha Fg je 30 N dolů (90 px); text výsledku odpovídá
//     složkám síly (bedna stojí / sune se / zvedá se / rozjíždí se);
//  5) po „Rozjeď bednu!“ animace doběhne do posunu podle poloha(3 s), během jízdy
//     se nedá přepnout směr; „Zpět“ vrátí bednu na místo.
//
// Spuštění: node testy/simulace/sila-vektor.mjs [cesta]
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/SilaVektorSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const konec = () => { console.log(`\n${chyby ? chyby + ' chyb' : 'vše v pořádku'}`); process.exit(chyby ? 1 : 0); };

// ---------- 1) HTML text mimo SVG ----------
const mimoSvg = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
const lamaveHtml = mimoSvg.match(/\b(Fg?|N|\d+)(?: |\n)+(?:=|N\b)[^<]{0,12}/g) || [];
ok(mimoSvg.includes('Fg&nbsp;=&nbsp;30&nbsp;N'), 'text pod nadpisem má „Fg&nbsp;=&nbsp;30&nbsp;N“ (nezlomí se na 400 px)');
ok(!/Fg = 30 N/.test(mimoSvg), 'v HTML mimo SVG už není „Fg = 30 N“ s obyčejnými mezerami');
ok(/<\/output>&nbsp;N/.test(mimoSvg), 'jednotka N u posuvníku je od čísla oddělená &nbsp;');
ok(lamaveHtml.length === 0, `žádné „číslo/značka + mezera + = / N“ s obyčejnou mezerou mimo SVG${lamaveHtml.length ? ' — ' + lamaveHtml.join(' | ') : ''}`);

// ---------- náhradní DOM ----------
const prvky = new Map();
for (const m of html.matchAll(/<(\w+)\s([^>]*?)\/?>/g)) {
	const atr = {};
	for (const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) atr[a[1]] = a[2];
	if (!atr.id) continue;
	const tridy = new Set((atr.class || '').split(' ').filter(Boolean));
	prvky.set(atr.id, {
		id: atr.id, tag: m[1], atributy: { ...atr }, textContent: '', innerHTML: '', style: {}, posluchaci: {}, tridy,
		value: atr.value ?? '',
		classList: { add: (t) => tridy.add(t), remove: (t) => tridy.delete(t), toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
		querySelectorAll(sel) { return sel === '.sv-smer-btn' ? [...prvky.values()].filter((p) => p.tridy.has('sv-smer-btn')) : []; },
	});
}
const fronta = [];
const document = { getElementById: (id) => prvky.get(id) || null, querySelectorAll: () => [] };
let vyjimka = null;
try { vm.runInContext(skript, vm.createContext({ document, console, requestAnimationFrame: (f) => fronta.push(f) })); } catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) konec();

const el = (id) => prvky.get(id);
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
const dobehni = () => { let n = 0; while (fronta.length && n < 10000) { fronta.shift()(); n++; } return n; };
const obsah = () => el('sv-obsah').innerHTML;
const posunBedny = () => { const m = obsah().match(/translate\(([-\d.e]+) ([-\d.e]+)\)/); return m ? [+m[1], +m[2]] : [NaN, NaN]; };
const SMERY = { 180: 'sv-smer-180', 135: 'sv-smer-135', 90: 'sv-smer-90', 45: 'sv-smer-45', 0: 'sv-smer-0' };

// Geometrie scény přepočtená nezávisle: popisek (plaketa 8 px na znak + 8, výška 18) leží
// u bodu a celý uvnitř scény 500 × 400 s okrajem 4; hrot šipky = dvě ramena 12 px pod ±0,4 rad.
const W = 500, H = 400, OKR = 4;
const blizko = (a, b) => Math.abs(a - b) < 1e-6;
const popisekU = (x, y, text) => {
	const s = text.length * 8 + 8;
	const rx = Math.max(OKR, Math.min(W - OKR - s, x - 4)), ry = Math.max(OKR, Math.min(H - OKR - 18, y - 14));
	return { rx, ry, s, x: rx + 4, y: ry + 14, text };
};
function scenaSedi(F, deg, ox, oy) {
	const s = el('sv-obsah').innerHTML;
	const plakety = [...s.matchAll(/<rect x="([-\d.e]+)" y="([-\d.e]+)" width="(\d+)" height="18" rx="4" fill="#ffffff" stroke="([^"]+)" stroke-width="1\.5" \/>\s*<text x="([-\d.e]+)" y="([-\d.e]+)" font-size="13" font-weight="bold" fill="\4">([^<]+)<\/text>/g)]
		.map((m) => ({ rx: +m[1], ry: +m[2], s: +m[3], barva: m[4], x: +m[5], y: +m[6], text: m[7] }));
	const cek = [{ ...popisekU(200 + 10 + ox, 300 + 90 + 4 + oy, 'Fg = 30 N'), barva: '#495057' }];
	const rad = (deg * Math.PI) / 180, c = Math.cos(rad), si = Math.sin(rad);
	const x2 = 200 + c * F * 3, y2 = 240 - si * F * 3;
	if (F > 0) cek.push({ ...popisekU(x2 + c * 14 + ox, y2 - si * 14 - 4 + oy, `F = ${F} N`), barva: '#e03131' });
	const popOk = plakety.length === cek.length && cek.every((p, i) => ['rx', 'ry', 's', 'x', 'y'].every((k) => blizko(plakety[i][k], p[k])) && plakety[i].text === p.text && plakety[i].barva === p.barva)
		&& plakety.every((p) => p.rx >= OKR && p.ry >= OKR && p.rx + p.s <= W - OKR && p.ry + 18 <= H - OKR);
	const fgHrot = s.includes('<polygon points="200,390 194,380 206,380" fill="#495057" />');
	let hrotOk = F === 0;
	const poly = s.match(/<polygon points="([^"]+)" fill="#e03131"/);
	if (F > 0 && poly) {
		const u = Math.atan2(y2 - 240, x2 - 200);
		const ocek = [x2, y2, x2 - 12 * Math.cos(u - 0.4), y2 - 12 * Math.sin(u - 0.4), x2 - 12 * Math.cos(u + 0.4), y2 - 12 * Math.sin(u + 0.4)];
		const b = poly[1].split(/[ ,]/).map(Number);
		hrotOk = b.length === 6 && b.every((v, i) => blizko(v, ocek[i]));
	}
	const posun = s.match(/translate\(([-\d.e]+) ([-\d.e]+)\)/);
	return popOk && fgHrot && hrotOk && !!posun && blizko(+posun[1], ox) && blizko(+posun[2], oy);
}

ok((el('sv-f').posluchaci.input || []).length === 1, 'posuvník velikosti síly je připojený');
for (const id of Object.values(SMERY)) ok((el(id).posluchaci.click || []).length === 1, `tlačítko směru ${id} je připojené`);
ok((el('sv-jed').posluchaci.click || []).length === 1 && (el('sv-reset').posluchaci.click || []).length === 1, 'tlačítka Rozjeď a Zpět jsou připojená');

// ---------- výchozí stav ----------
ok(el('sv-f-t').textContent === '10' && el('sv-vysledek').textContent === 'Bedna se rozjíždí směrem doprava — síla F = 10 N.', `výchozí stav: ${el('sv-vysledek').textContent}`);
ok(el('sv-smer-0').tridy.has('sv-smer-aktivni'), 'výchozí směr doprava je zvýrazněný');
ok(scenaSedi(10, 0, 0, 0), 'výchozí scéna: bedna na místě, šipka 10 N doprava s hrotem, popisky Fg a F uvnitř scény');
// kontrast nápisu „bedna“ proti výplni bedny ≥ 4,5 : 1 (oprava 3. 10. 2026, kolo 4: bílá na #e8590c měla 3,6 — na telefonu nečitelné)
{
	const s = obsah();
	const rect = s.match(/<rect x="170" y="240" width="60" height="60"[^>]*fill="(#[0-9a-fA-F]{6})"/);
	const txt = s.match(/<text x="200" y="\d+"[^>]*fill="(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)">bedna<\/text>/);
	// velikost nápisu na telefonu (kolo 5): scéna 500 jednotek má na 375 px šířku 262,9 CSS px (změřeno v Chrome,
	// /private/tmp/opravy-kolo5/mer.mjs) — to je ale getBoundingClientRect VČETNĚ rámečku #sv-svg (border 3 px).
	// Kresba se škáluje jen do obsahu: 262,9 − 2 × rámeček = 256,9 px (kolo 6, kontrola-a2f8361 N1: s 262,9 test
	// pustil písmo 23 = skutečně 11,82 px). Rámeček se čte ze <style> komponenty → písmo × 256,9 / 500 ≥ 12 px;
	// „bedna“ tučně je široká ~2,0 × písmo
	// (změřeno 12,6 px při 6,31 px) a musí se vejít do bedny (60 − obrys 3) mezi kříž působiště (y ≤ 247) a dno (y 300)
	const ramecek = +((zdroj.match(/#sv-svg\s*\{[^}]*border:\s*([\d.]+)px/) || [])[1] ?? NaN);
	const kresba375 = 262.9 - 2 * ramecek;
	const pismo = +(s.match(/<text x="200" y="\d+"[^>]*font-size="(\d+)"[^>]*>bedna<\/text>/)?.[1] || 0);
	const yB = +(s.match(/<text x="200" y="(\d+)"[^>]*>bedna<\/text>/)?.[1] || 0);
	ok(ramecek > 0 && pismo * kresba375 / 500 >= 12 && 2.0 * pismo <= 57 && yB - 0.75 * pismo > 240 + 7 + 1.5 && yB < 300 - 1.5, `nápis „bedna“ má na 375 px ≥ 12 px (${(pismo * kresba375 / 500).toFixed(2)} px, kresba ${kresba375} px bez rámečku ${ramecek} px) a vejde se do bedny pod kříž (y ${yB}, písmo ${pismo})`);
	const hex6 = (h) => (h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h);
	const lum = (h) => [1, 3, 5].map((i) => parseInt(hex6(h).slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
	const kon = rect && txt ? (Math.max(lum(rect[1]), lum(txt[1])) + 0.05) / (Math.min(lum(rect[1]), lum(txt[1])) + 0.05) : 0;
	ok(kon >= 4.5, `nápis „bedna“ má proti výplni bedny kontrast ≥ 4,5 : 1 (${txt && txt[1]} na ${rect && rect[1]}: ${kon.toFixed(2)})`);
}

// ---------- 2) + 4) všechny stavy ----------
const nb = ' ';
const vel = (z, n) => `${z}${nb}=${nb}${n}${nb}N`;
const POPIS = { 0: 'doprava', 45: 'šikmo nahoru doprava', 90: 'přímo nahoru', 135: 'šikmo nahoru doleva', 180: 'doleva' };
let stavu = 0, textyOk = true, nbspOk = true, sipkaOk = true, tihaOk = true, aktivniOk = true, svislaOk = true;
const chyba = {};
for (const deg of [180, 135, 90, 45, 0]) {
	klik(SMERY[deg]);
	if (Object.entries(SMERY).some(([d, id]) => el(id).tridy.has('sv-smer-aktivni') !== (+d === deg))) aktivniOk = false;
	for (let F = 0; F <= 50; F += 5) {
		posun('sv-f', F);
		stavu++;
		const rad = (deg * Math.PI) / 180;
		const vod = F * Math.cos(rad), nah = F * Math.sin(rad);
		const nula = Math.abs(vod) < 1e-6;
		const zdvih = Math.max(0, nah - 30);
		let cek;
		if (F === 0) cek = `Na bednu nepůsobí žádná tažná síla — jen tíhová síla ${vel('Fg', 30)}, která ji tlačí k podlaze. Bedna se proto nikam nerozjíždí.`;
		// sin 180° v JS není přesně 0 (1,2·10⁻¹⁶) — „míří nahoru“ jen při skutečně nenulové svislé části
		// (původní kód tu měl `nahoru > 0` a u směru doleva psal „Síla míří šikmo nahoru…“)
		else if (nah > 1e-6 && zdvih === 0 && nula) cek = `Síla míří nahoru, ale není větší než tíha bedny (${vel('Fg', 30)}) — bedna zůstává na podlaze.`;
		else if (nah > 1e-6 && zdvih === 0) cek = `Síla míří šikmo nahoru, ale její svislá část nestačí zvednout bednu (tíha ${vel('Fg', 30)}) — bedna se proto jen sune po podlaze ${vod > 0 ? 'doprava' : 'doleva'}.`;
		// u šikmé síly rozhoduje svislá část, ne celá F (oprava 3. 10. 2026, kolo 2 — dřív „Síla F je větší než tíha“ i šikmo)
		else if (zdvih > 0) cek = nula ? `Síla (${vel('F', F)}) je větší než tíha ${vel('Fg', 30)} — bedna se zvedá ze země!` : `Síla ${vel('F', F)} míří šikmo nahoru a její svislá část je větší než tíha ${vel('Fg', 30)} — bedna se zvedá a zároveň sune do strany!`;
		else cek = `Bedna se rozjíždí směrem ${POPIS[deg]} — síla ${vel('F', F)}.`;
		const t = el('sv-vysledek').textContent;
		if (t !== cek) { textyOk = false; chyba.text ||= `${deg}°, ${F} N: „${t}“ ≠ „${cek}“`; }
		if (/\d N\b|[A-Za-z] = \d/.test(t)) { nbspOk = false; chyba.nbsp ||= `${deg}°, ${F} N: „${t}“`; }
		// kolo 3 (nález K2): číslo hned za „svislá část (síly)“ se čte jako její velikost — smí tam být jen
		// skutečná svislá část zaokrouhlená na celé newtony, jinak žádné číslo
		const sv = t.match(/svislá část(?: síly)?[^—]{0,12}?(\d+) N/i);
		if (sv && +sv[1] !== Math.round(nah)) { svislaOk = false; chyba.svisla ||= `${deg}°, ${F} N: „${t}“ (svislá část je ${Math.round(nah)} N)`; }
		const s = obsah();
		const car = [...s.matchAll(/<line x1="([-\d.e]+)" y1="([-\d.e]+)" x2="([-\d.e]+)" y2="([-\d.e]+)" stroke="#e03131"/g)];
		const sedi = F === 0 ? car.length === 0 && !s.includes('F = ') : car.length === 1 && +car[0][1] === 200 && +car[0][2] === 240
			&& Math.abs(+car[0][3] - (200 + Math.cos(rad) * F * 3)) < 1e-6 && Math.abs(+car[0][4] - (240 - Math.sin(rad) * F * 3)) < 1e-6
			&& s.includes(`>F = ${F} N</text>`);
		if (!sedi || !scenaSedi(F, deg, 0, 0)) { sipkaOk = false; chyba.sipka ||= `${deg}°, ${F} N`; }
		if (!/<line x1="200" y1="300" x2="200" y2="390" stroke="#495057"/.test(s) || !s.includes('>Fg = 30 N</text>')) tihaOk = false;
		if (el('sv-f-t').textContent !== String(F)) textyOk = false;
	}
}
ok(textyOk, `text výsledku odpovídá složkám síly ve všech ${stavu} stavech${chyba.text ? ' — ' + chyba.text : ''}`);
ok(svislaOk, `text výsledku nepřipisuje svislé části síly jinou velikost, než skutečně má${chyba.svisla ? ' — ' + chyba.svisla : ''}`);
ok(nbspOk, `texty výsledku nemají ve všech ${stavu} stavech obyčejnou mezeru mezi číslem a N ani kolem „=“${chyba.nbsp ? ' — ' + chyba.nbsp : ''}`);
ok(sipkaOk, `šipka F vychází z působiště (200, 240), má 3 px na 1 N, správný směr a popisek ve všech stavech${chyba.sipka ? ' — ' + chyba.sipka : ''}`);
ok(tihaOk, 'tíha Fg = 30 N míří dolů ze spodní hrany bedny (90 px) ve všech stavech');
ok(aktivniOk, 'zvýrazněné je vždy jen tlačítko zvoleného směru');

// ---------- 5) animace ----------
let poJizde = true;
const jed = (deg, F) => {
	klik('sv-reset'); klik(SMERY[deg]); posun('sv-f', F); klik('sv-jed');
	const n = dobehni();
	const [x, y] = posunBedny();
	if (!scenaSedi(F, deg, x, y)) poJizde = false;
	return n;
};
let n = jed(0, 10);
let [dx, dy] = posunBedny();
// 1 snímek synchronně + 60 z fronty (součet 0,05 v plovoucí čárce těsně podlézá 3,00)
ok(n === 60 && Math.abs(dx - 60) < 1e-6 && dy === 0, `doprava 10 N: po 3 s (snímky po 0,05 s) bedna ujela 10 · 2 · 3 = 60 px (${dx}, ${dy}; ${n + 1} snímků)`);
klik('sv-reset');
ok(posunBedny().join() === '0,0', '„Zpět“ vrátí bednu na místo');
jed(90, 50);
[dx, dy] = posunBedny();
ok(Math.abs(dx) < 1e-6 && dy === -90, `nahoru 50 N: zvedá se (50 − 30) · 2 · 3 = 120 px, strop scény 90 px (${dy})`);
jed(90, 30);
ok(posunBedny()[1] === 0 && Math.abs(posunBedny()[0]) < 1e-6, 'nahoru 30 N: síla není větší než tíha, bedna zůstane na místě');
jed(180, 50);
[dx] = posunBedny();
// hrot šipky 50 N doleva je na x = 200 − 150 = 50 → bedna smí jet jen o 4 − 50 = −46 px (−300 se ořízne)
ok(Math.abs(dx - (4 - 50)) < 1e-6, `doleva 50 N: posun −300 px se ořízne, aby hrot šipky zůstal ve scéně (${dx})`);
jed(0, 50);
ok(Math.abs(posunBedny()[0] - 140) < 1e-6, `doprava 50 N: 300 px omezí dráha na 140 px (hrot na 350 by dovolil 146) (${posunBedny()[0]})`);
jed(180, 10);
ok(Math.abs(posunBedny()[0] + 60) < 1e-6, `doleva 10 N: bedna ujede 10 · 2 · 3 = 60 px doleva (${posunBedny()[0]})`);
jed(45, 20);
[dx, dy] = posunBedny();
jed(135, 50);
ok(posunBedny()[1] < 0 && posunBedny()[0] < 0, `šikmo doleva 50 N: svislá část 35 N > 30 N, bedna se zvedá a sune doleva (${posunBedny().map((v) => v.toFixed(1)).join(', ')})`);
ok(poJizde, 'po každé jízdě sedí šipka, hrot i popisky (posunuté s bednou a oříznuté do scény)');
jed(45, 20);
[dx, dy] = posunBedny();
ok(Math.abs(dx - 20 * Math.SQRT1_2 * 6) < 1e-6 && dy === 0, `šikmo 20 N: svislá část 14 N < 30 N, bedna se jen sune o ${(20 * Math.SQRT1_2 * 6).toFixed(1)} px (${dx.toFixed(1)}, ${dy})`);
// během jízdy se směr nemění
klik('sv-reset'); klik(SMERY[0]); posun('sv-f', 20); klik('sv-jed');
klik(SMERY[180]);
ok(el('sv-smer-0').tridy.has('sv-smer-aktivni') && !el('sv-smer-180').tridy.has('sv-smer-aktivni'), 'během jízdy nejde přepnout směr');
klik('sv-reset');
ok(posunBedny()[0] > 0, 'během jízdy nejde ani „Zpět“');
dobehni();
klik(SMERY[180]);
ok(el('sv-smer-180').tridy.has('sv-smer-aktivni') && posunBedny().join() === '0,0', 'po dojetí jde směr zase přepnout a bedna je zpět na místě');
klik(SMERY[0]); klik('sv-jed'); klik('sv-jed');
ok(fronta.length === 1, 'druhé kliknutí na „Rozjeď“ během jízdy nespustí druhou animaci');
dobehni();

konec();

#!/usr/bin/env node
// Ověření StridavyProudSimulace.astro (F9 „Vlastnosti střídavého proudu“).
// Spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM.
//
// Proč vznikl (oprava 3. 10. 2026, odložený nález téma 2): pod scénou B stál vzorec
// „u = Um · sin(úhel)“ — goniometrické funkce jsou nad rámec 9. ročníku a výklad je
// nemá. Test proto hlídá:
//  1) v ničem, co žák vidí (text stránky, popisky SVG, aria-label, texty ze skriptu
//     ve všech stavech), není „sin“ ani „úhel“;
//  2) skript doběhne, tlačítka i posuvník jsou připojené;
//  3) scéna A: T = 1 : f pro 25/50/100 Hz (40 / 20 / 10 ms), svorka T v px = T · 14,
//     počet period v okně 40 ms, sinusoida přepočtená bod po bodu, čára stejnosměrného
//     napětí se přepíná;
//  4) scéna B: všech 5 poloh posuvníku dá celé okamžité napětí 0 / 325 / 0 / −325 / 0 V,
//     bod sedí na křivce, popisek i texty souhlasí;
//  5) čísla a zápisy ze scén (230 V, 325 V, 50/25/100 Hz, „T = 1 : 50 s = 20 ms“, 40 ms,
//     10 ms) mají oporu ve výkladu (temata.ts); „0,02 s“ výklad nemá, simulace ho nesmí ukázat.
//
// Spuštění: node testy/simulace/stridavy-proud.mjs [cesta]
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/StridavyProudSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
const temata = readFileSync(new URL('../../src/data/temata.ts', import.meta.url), 'utf8');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const konec = () => { console.log(`\n${chyby ? chyby + ' chyb' : 'vše v pořádku'}`); process.exit(chyby ? 1 : 0); };

// ---------- 1a) statický text, který žák vidí ----------
const viditelne = html.replace(/<!--[\s\S]*?-->/g, '');
const textStranky = viditelne.replace(/<[^>]+>/g, ' ');
const ariaLabely = [...viditelne.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]).join(' ');
const nadRamec = /\bsin\b|sin\s*\(|sinus(?!oid)|úhel|úhlu|cos\s*\(/i;
ok(!nadRamec.test(textStranky), `text simulace neobsahuje sin/úhel (nad rámec 9. ročníku)${nadRamec.test(textStranky) ? ' — „' + textStranky.match(new RegExp('.{0,40}(' + nadRamec.source + ').{0,20}', 'i'))[0].replace(/\s+/g, ' ') + '“' : ''}`);
ok(!nadRamec.test(ariaLabely), 'popisky pro čtečku (aria-label) neobsahují sin/úhel');
const vzorecB = (viditelne.match(/<p class="sp-vzorec">([\s\S]*?)<\/p>/) || [])[1] || '';
ok(/Okamžité napětí u se v čase pořád mění/.test(vzorecB) && /EFEKTIVNÍ hodnotu 230 V/.test(vzorecB), `řádek pod scénou B popisuje změnu okamžitého napětí slovy a efektivní hodnotu 230 V`);

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
		replaceChildren(...deti) { this.textContent = deti.map((d) => (typeof d === 'string' ? d : d.textContent)).join(''); },
	});
}
const document = {
	getElementById: (id) => prvky.get(id) || null,
	querySelectorAll: () => [],
	createElement: () => ({ textContent: '', dataset: {} }),
};
let vyjimka = null;
try { vm.runInContext(skript, vm.createContext({ document, console })); } catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) konec();

const el = (id) => prvky.get(id);
const at = (id, k) => el(id)?.getAttribute(k);
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
const nbsp = (s) => s.replace(/ /g, ' ');
const texty = [];
const zaznamenej = () => { for (const p of prvky.values()) for (const t of [p.textContent, p.innerHTML]) if (t) texty.push(nbsp(t)); };
const body = (id) => at(id, 'points').split(' ').map((b) => b.split(',').map(Number));

for (const id of ['sp-a-f50', 'sp-a-f25', 'sp-a-f100', 'sp-a-dc-tl']) ok((el(id).posluchaci.click || []).length === 1, `tlačítko ${id} je připojené`);
ok((el('sp-b-cas').posluchaci.input || []).length === 1, 'posuvník okamžiku (B) je připojený');
ok(at('sp-b-cas', 'min') === '0' && at('sp-b-cas', 'max') === '20' && at('sp-b-cas', 'step') === '5', 'posuvník B: 0–20 ms po 5 ms');

// ---------- 3) scéna A ----------
ok(nbsp(el('sp-a-vzorec').innerHTML) === 'T = 1 : f = 1 : 50 s = <strong>20 ms</strong>', `A, výchozí stav: ${el('sp-a-vzorec').innerHTML}`);
zaznamenej();
for (const [id, f, T, n] of [['sp-a-f25', 25, 40, 1], ['sp-a-f100', 100, 10, 4], ['sp-a-f50', 50, 20, 2]]) {
	klik(id);
	ok(nbsp(el('sp-a-vzorec').innerHTML) === `T = 1 : f = 1 : ${f} s = <strong>${T} ms</strong>`, `A, ${f} Hz: ${nbsp(el('sp-a-vzorec').innerHTML).replace(/<[^>]+>/g, '')}`);
	ok(+at('sp-a-t-konec', 'x1') === 70 + T * 14 && +at('sp-a-t-konec', 'x2') === 70 + T * 14 && +at('sp-a-t-cara', 'x2') === 70 + T * 14, `A, ${f} Hz: svorka T končí na x = 70 + ${T} · 14 = ${70 + T * 14}`);
	ok(+at('sp-a-t-popisek', 'x') === 70 + (T * 14) / 2, `A, ${f} Hz: popisek T uprostřed svorky (${at('sp-a-t-popisek', 'x')})`);
	const b = body('sp-a-sinus');
	const sedi = b.length === 201 && b.every(([x, y], i) => Math.abs(x - (70 + i * 0.2 * 14)) < 0.06 && Math.abs(y - (195 - 100 * Math.sin((2 * Math.PI * i * 0.2) / T))) < 0.06);
	ok(sedi, `A, ${f} Hz: sinusoida má 201 bodů po 0,2 ms a sedí s přepočtem y = 195 − 100 · (výška vlny pro T = ${T} ms)`);
	const vrcholy = b.filter(([, y], i) => i > 0 && i < b.length - 1 && y < b[i - 1][1] && y <= b[i + 1][1]).length;
	ok(vrcholy === n, `A, ${f} Hz: v okně 40 ms je ${vrcholy} vrcholů (čekáno ${n})`);
	ok(el('sp-a-stav').textContent.includes(`Při ${f} Hz ${n === 1 ? 'je' : 'jsou'} v tomhle 40ms okně vidět ${n} ${n === 1 ? 'perioda' : 'periody'} — každá trvá T = ${T} ms`), `A, ${f} Hz: text stavu (${n} ${n === 1 ? 'perioda' : 'periody'})`);
	ok(nbsp(el('sp-a-mobil').textContent) === `f = ${f} Hz · T = ${T} ms (oranžová svorka) · v okně 40 ms: ${n} ${n === 1 ? 'perioda' : 'periody'}`, `A, ${f} Hz: řádek pro telefon`);
	ok(el(id).tridy.has('sp-aktivni') && ['sp-a-f50', 'sp-a-f25', 'sp-a-f100'].filter((x) => el(x).tridy.has('sp-aktivni')).length === 1, `A, ${f} Hz: zvýrazněné je jen tohle tlačítko`);
	zaznamenej();
}
ok(at('sp-a-dc', 'visibility') === 'hidden' && at('sp-a-dc-label', 'visibility') === 'hidden', 'A: čára stejnosměrného napětí je na začátku skrytá');
klik('sp-a-dc-tl');
ok(at('sp-a-dc', 'visibility') === 'visible' && at('sp-a-dc-label', 'visibility') === 'visible' && el('sp-a-dc-tl').textContent.startsWith('➖'), 'A: tlačítko čáru stejnosměrného napětí ukáže');
ok(el('sp-a-stav').textContent.includes('Stejnosměrná čára se v čase vůbec nemění') && el('sp-a-mobil').textContent.includes('rovná čára'), 'A: s čárou se změní i vysvětlení');
zaznamenej();
klik('sp-a-dc-tl');
ok(at('sp-a-dc', 'visibility') === 'hidden' && el('sp-a-dc-tl').textContent.startsWith('➕') && el('sp-a-stav').textContent.includes('Čím vyšší frekvence'), 'A: druhé kliknutí čáru zase skryje');

// ---------- 4) scéna B ----------
const bB = body('sp-b-sinus');
ok(bB.length === 101 && bB.every(([x, y], i) => Math.abs(x - (60 + i * 0.2 * 16)) < 0.06 && Math.abs(y - (210 - 130 * Math.sin((2 * Math.PI * i * 0.2) / 20))) < 0.06), 'B: křivka sítě (T = 20 ms, vrchol 325 V = 130 px) sedí s přepočtem bod po bodu');
ok(el('sp-b-out-t').textContent === 't = 5 ms' && el('sp-b-u-okamzite').textContent === 'u = 325 V', `B, výchozí stav: ${el('sp-b-out-t').textContent}, ${el('sp-b-u-okamzite').textContent}`);
const ocekavane = { 0: 0, 5: 325, 10: 0, 15: -325, 20: 0 };
for (const [t, u] of Object.entries(ocekavane).map(([a, b]) => [+a, b])) {
	posun('sp-b-cas', t);
	// záporné napětí se skutečným minus (U+2212), ne spojovníkem — oprava 3. 10. 2026, kolo 2
	const uT = u < 0 ? '\u2212' + Math.abs(u) : String(u);
	const x = 60 + t * 16, y = 210 - u * 0.4;
	ok(el('sp-b-out-t').textContent === `t = ${t} ms` && el('sp-b-u-okamzite').textContent === `u = ${uT} V`, `B, t = ${t} ms: okamžité napětí u = ${uT} V (celé číslo)`);
	ok(Math.abs(+at('sp-b-bod', 'cx') - x) < 1e-9 && Math.abs(+at('sp-b-bod', 'cy') - y) < 1e-9, `B, t = ${t} ms: bod leží na křivce (${x}, ${y})`);
	ok(+at('sp-b-u-okamzite', 'x') === Math.min(x + 10, 330) && +at('sp-b-u-okamzite', 'y') === y - 14 && y - 14 > 14, `B, t = ${t} ms: popisek nad bodem a uvnitř scény (y ${at('sp-b-u-okamzite', 'y')})`);
	const st = el('sp-b-stav').textContent;
	const cek = u === 0 ? `Při t = ${t} ms prochází okamžité napětí NULOU (u = 0 V)` : `Při t = ${t} ms je okamžité napětí na svém ${u > 0 ? 'MAXIMU' : 'MINIMU (opačná polarita)'}: u = ${uT} V`;
	const spicka = u === 0 || st.includes(`. ${u > 0 ? 'Maximum' : 'Minimum'} nastává jednou za periodu — špička jedné nebo druhé polarity tedy dvakrát.`);
	ok(spicka && !/dvakrát za periodu/.test(st), `B, t = ${t} ms: ${u === 0 ? 'nula' : (u > 0 ? 'maximum' : 'minimum') + ' je jednou za periodu, ne dvakrát'}`);
	ok(st.startsWith(cek) && st.endsWith('určuje to efektivní hodnota 230 V, ne tahle okamžitá.'), `B, t = ${t} ms: vysvětlení „${st.slice(0, 60)}…“`);
	ok(nbsp(el('sp-b-mobil').textContent) === `t = ${t} ms: okamžité u = ${uT} V (maximum 325 V) · obě žárovky svítí stejně: ~ 230 V efektivní = 230 V stejnosměrné`, `B, t = ${t} ms: řádek pro telefon`);
	zaznamenej();
}

// ---------- 1b) texty ze skriptu ve všech stavech ----------
const vse = texty.join(' ').replace(/<[^>]+>/g, ' ');
ok(!/(^|[\s=(])-\d/.test(vse) && vse.includes('−325 V'), `záporná čísla ve všech textech mají skutečné minus „−“, ne spojovník „-“`);
ok(!nadRamec.test(vse),`žádný text, který skript v kterémkoli stavu vypíše, neobsahuje sin/úhel (${texty.length} textů)`);

// ---------- 5) opora čísel ve výkladu ----------
const radky = temata.split('\n');
const i = radky.findIndex((r) => /interakce: 'stridavy-proud',/.test(r));
const vyklad = i >= 0 ? radky.slice(Math.max(0, i - 6), i + 8).join('\n').replace(/ /g, ' ') : '';
for (const c of ['230 V', '325 V', '50 Hz', '25 Hz', '100 Hz', 'T = 1 : 50 s = <strong>20 ms', '40 ms', '10 ms']) ok(vyklad.includes(c), `„${c.replace(/<[^>]+>/g, '')}“ má oporu ve výkladu podtématu`);
ok(!/\d,\d/.test(vse), 'žádný text simulace neukazuje desetinné číslo (výklad pracuje v celých ms)');
ok(!nadRamec.test(vyklad.replace(/sinusoid\w*/gi, '')), 'ani výklad podtématu sin/úhel nepoužívá (simulace nesmí jít nad něj)');

konec();

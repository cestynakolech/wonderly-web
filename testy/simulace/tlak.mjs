#!/usr/bin/env node
// Ověření TlakSimulace.astro (F7 „Tlak", tři scény A–C, přepis 1. 10. 2026):
// spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM a proměří, co scény
// žákovi ukazují.
//
// Kontroly (podle návrhu Omega/predavka/2026-10-01/prace/tema4/f7-tlak-b.json):
//  1) skript doběhne bez výjimky (poučení z 26. 8. 2026: proměnná bez deklarace
//     zastavila celý skript a žádný test to nechytil) a ovladače jsou připojené;
//  2) všech 8 poloh ovladačů (A: 3, B: 2, C: 3) dá přesně dané texty a kresbu;
//  3) p, F, S v SVG textech souhlasí s p = F : S přepočtem tady v testu;
//  4) všechny výsledky jsou celá čísla — jediné desetinné je 0,01 (m²);
//  5) každé číslo, které scény ukazují, stojí v hlavním výkladu podtématu
//     (čte se z src/data/temata.ts, ne z návrhu);
//  2b) (opravy po kontrole 1. 10. 2026) A: čokoláda rozsypaná rovnoměrně po celém
//      čtverci, ne hromádky; B: deska 10× širší než závaží (1 m : 10 cm), mělký
//      důlek nad deskou viditelný, „5 kg" nad závažím; C: třetí řádek nikdy prázdný;
//  6) žádná scéna neukazuje hloubku, atmosféru, molekuly ani píst (patří jiným
//     podtématům — stará verze komponenty je měla).
//
// Spuštění: node testy/simulace/tlak.mjs [cesta] (bez argumentu: src/components/skola2/TlakSimulace.astro)
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/TlakSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/, '');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ---------- náhradní DOM: jen id, která ve zdroji opravdu jsou ----------
const prvky = new Map();
for (const m of html.matchAll(/<(\w+)\s([^>]*?)\/?>/g)) {
	const atr = {};
	for (const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) atr[a[1]] = a[2];
	if (!atr.id) continue;
	prvky.set(atr.id, {
		id: atr.id, tag: m[1], atributy: { ...atr }, textContent: '', style: {}, posluchaci: {},
		value: atr.value ?? '',
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	});
}
const document = { getElementById: (id) => prvky.get(id) || null, querySelectorAll: () => [] };
const sandbox = { document, console };
vm.createContext(sandbox);

let vyjimka = null;
try { vm.runInContext(skript, sandbox); } catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) { console.log(`\n${chyby} chyb`); process.exit(1); }

const el = (id) => prvky.get(id);
const at = (id, k) => el(id).getAttribute(k);
const txt = (id) => el(id).textContent.replace(/ /g, ' ');
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const cislo = (s) => Number(s.replace(/[  ]/g, '').replace(',', '.'));

// Všechno, co scény v kterémkoli stavu ukázaly (pro kontroly 4–6).
const videno = [];
const zaznamenej = () => { for (const p of prvky.values()) if (['text', 'p', 'span'].includes(p.tag) && p.textContent) videno.push(txt(p.id)); };

for (const id of ['tl-a-svg', 'tl-b-svg', 'tl-c-svg']) ok(prvky.has(id) && el(id).tag === 'svg', `scéna ${id} je ve zdroji jako <svg>`);
ok((el('tl-a-davky').posluchaci.input || []).length === 1, 'posuvník dávek (A) je připojený');
ok((el('tl-b-primo').posluchaci.click || []).length === 1 && (el('tl-b-na-desce').posluchaci.click || []).length === 1, 'přepínač podložky (B) má posluchače');
ok((el('tl-c-hledana').posluchaci.input || []).length === 1, 'posuvník hledané veličiny (C) je připojený');

// ---------- A) čokoláda na čtverci 1 m² ----------
ok(txt('tl-a-p') === 'p = F : S = 1 : 1 = 1 Pa', `A, výchozí stav po načtení: ${txt('tl-a-p')}`);
// Čokoláda musí být ROZSYPANÁ po celém čtverci (síla rozložená na 1 m²), ne v hromádkách —
// hromádka by sílu soustředila a pod ní by byl tlak větší než 1 Pa (nález kontroly 1. 10. 2026).
const ctverec = html.match(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="#fff9db"/);
ok(!!ctverec && ctverec[3] === ctverec[4], 'A: čtverec 1 m × 1 m je ve zdroji jako čtverec');
const [cx0, cy0, cs] = ctverec ? [+ctverec[1], +ctverec[2], +ctverec[3]] : [0, 0, 0];
const davkaBody = (i) => {
	const m = html.match(new RegExp(`<g id="tl-a-h${i}"[^>]*>\\s*<path[^>]*\\sd="([^"]+)"`));
	return m ? [...m[1].matchAll(/M(\d+) (\d+)/g)].map((b) => [+b[1], +b[2]]) : [];
};
const vsechnyBody = new Set();
for (const i of [1, 2, 3]) {
	const body = davkaBody(i);
	const uvnitr = body.every(([x, y]) => x > cx0 && x < cx0 + cs && y > cy0 && y < cy0 + cs);
	const bunky = Array(9).fill(0);
	for (const [x, y] of body) bunky[Math.floor(((y - cy0) / cs) * 3) * 3 + Math.floor(((x - cx0) / cs) * 3)]++;
	const min = Math.min(...bunky), max = Math.max(...bunky);
	ok(body.length >= 60 && uvnitr, `A, dávka ${i}: ${body.length} drobků čokolády, všechny uvnitř čtverce`);
	ok(min >= 1 && max <= 2 * min, `A, dávka ${i}: drobky pokrývají celý čtverec rovnoměrně (v každé z 9 třetin ${min}–${max})`);
	for (const [x, y] of body) vsechnyBody.add(`${x},${y}`);
}
ok(vsechnyBody.size === [1, 2, 3].reduce((s, i) => s + davkaBody(i).length, 0), `A: každá další dávka sype do mezer, posyp houstne (${vsechnyBody.size} různých míst)`);
zaznamenej();
for (const n of [1, 2, 3]) {
	posun('tl-a-davky', n);
	const viditelne = [1, 2, 3].map((i) => at(`tl-a-h${i}`, 'opacity'));
	ok(viditelne.join() === [1, 2, 3].map((i) => (i <= n ? '1' : '0')).join(), `A, ${n} dávky: vidět je ${n} dávek posypu (opacity ${viditelne.join(', ')})`);
	ok(txt('tl-a-davky-svg') === `dávky: ${n} × 100 g` && txt('tl-a-davky-t') === String(n), `A, ${n}: počet dávek v SVG i u posuvníku`);
	ok(txt('tl-a-f') === `F = ${n} N`, `A, ${n}: ${txt('tl-a-f')}`);
	ok(txt('tl-a-s') === 'S = 1 m²', `A, ${n}: ${txt('tl-a-s')}`);
	ok(txt('tl-a-p') === `p = F : S = ${n} : 1 = ${n} Pa`, `A, ${n}: ${txt('tl-a-p')}`);
	const F = cislo(txt('tl-a-f').match(/= (\S+) N/)[1]);
	const S = cislo(txt('tl-a-s').match(/= (\S+) m²/)[1]);
	const p = cislo(txt('tl-a-p').match(/= (\S+) Pa$/)[1]);
	ok(p === F / S, `A, ${n}: přepočet p = F : S = ${F} : ${S} = ${F / S} souhlasí s SVG (${p})`);
	ok(txt('tl-a-vysl').includes(`silou ${n} N, tlak je ${n} Pa`), `A, ${n}: text pod scénou souhlasí s SVG`);
	zaznamenej();
}

// ---------- B) stejná síla, jiná plocha ----------
const POVRCH = 240; // povrch písku ve zdroji (rect y="240")
ok(/<rect x="0" y="240" width="440" height="80"/.test(html), 'B: písek leží na y = 240');
const silaZeZdroje = html.match(/F = (\d+) · (\d+) = (\d+) N/);
ok(silaZeZdroje && +silaZeZdroje[1] * +silaZeZdroje[2] === +silaZeZdroje[3] && +silaZeZdroje[3] === 50, `B: síla F = m · g = 5 · 10 = 50 N (${silaZeZdroje && silaZeZdroje[0]})`);
const overB = (stav) => {
	const m = txt('tl-b-r2').match(/^p = (\S+) : (\S+) = (\S+(?: \d{3})?) Pa$/);
	ok(!!m, `B, ${stav}: řádek výpočtu má tvar p = F : S = … Pa (${txt('tl-b-r2')})`);
	if (!m) return null;
	const [F, S, p] = [cislo(m[1]), cislo(m[2]), cislo(m[3])];
	ok(F === 50 && p === F / S, `B, ${stav}: přepočet ${F} : ${S} = ${F / S} souhlasí s SVG (${p})`);
	const k = txt('tl-b-r3').match(/^tedy (\S+(?: \d{3})?) Pa = (\S+) kPa$/);
	if (k) ok(cislo(k[1]) === p && cislo(k[2]) === p / 1000, `B, ${stav}: ${p} Pa = ${p / 1000} kPa (SVG ${txt('tl-b-r3')})`);
	return p;
};
const primo = () => {
	ok(txt('tl-b-r2') === 'p = 50 : 0,01 = 5 000 Pa', `B, přímo: ${txt('tl-b-r2')}`);
	ok(txt('tl-b-r3') === 'tedy 5 000 Pa = 5 kPa', `B, přímo: ${txt('tl-b-r3')}`);
	ok(at('tl-b-deska', 'opacity') === '0' && at('tl-b-deska-t', 'opacity') === '0' && txt('tl-b-deska-t') === '', 'B, přímo: deska ani její popisek nejsou vidět');
	const dx = +at('tl-b-dulek', 'x'), dw = +at('tl-b-dulek', 'width'), zx = +at('tl-b-zavazi', 'x'), zw = +at('tl-b-zavazi', 'width');
	ok(at('tl-b-dulek', 'height') === '36' && dx === zx - 8 && dw === zw + 16, `B, přímo: hluboký důlek jen kolem závaží (výška ${at('tl-b-dulek', 'height')}, šířka ${dw} u závaží ${zw})`);
	ok(+at('tl-b-zavazi', 'y') + +at('tl-b-zavazi', 'height') === POVRCH + +at('tl-b-dulek', 'height'), 'B, přímo: závaží sedí na dně důlku');
	ok(at('tl-b-primo', 'aria-pressed') === 'true' && at('tl-b-na-desce', 'aria-pressed') === 'false', 'B, přímo: stisknuté je tlačítko „přímo na písku"');
	ok(txt('tl-b-vysl').includes('tlak na písek je 5 000 Pa = 5 kPa'), 'B, přímo: text pod scénou souhlasí s SVG');
	return overB('přímo');
};
const naDesce = () => {
	ok(txt('tl-b-r2') === 'p = 50 : 1 = 50 Pa', `B, deska: ${txt('tl-b-r2')}`);
	ok(txt('tl-b-r3') === 'tlak na desku: pořád 5 000 Pa', `B, deska: ${txt('tl-b-r3')}`);
	ok(at('tl-b-deska', 'opacity') === '1' && at('tl-b-deska-t', 'opacity') === '1' && txt('tl-b-deska-t') === 'plocha desky 1 m²', 'B, deska: deska i popisek „plocha desky 1 m²" jsou vidět');
	ok(at('tl-b-dulek', 'height') === '10' && +at('tl-b-dulek', 'width') === +at('tl-b-deska', 'width') + 16 && +at('tl-b-dulek', 'x') === +at('tl-b-deska', 'x') - 8, `B, deska: mělký důlek pod celou deskou (výška ${at('tl-b-dulek', 'height')}, šířka ${at('tl-b-dulek', 'width')} u desky ${at('tl-b-deska', 'width')})`);
	ok(+at('tl-b-deska', 'y') + +at('tl-b-deska', 'height') === POVRCH + +at('tl-b-dulek', 'height'), 'B, deska: deska leží na dně mělkého důlku');
	ok(+at('tl-b-deska', 'y') > POVRCH, `B, deska: deska je pod povrchem písku, mělký důlek nad ní je vidět (horní hrana ${at('tl-b-deska', 'y')} > ${POVRCH})`);
	ok(+at('tl-b-zavazi', 'y') + +at('tl-b-zavazi', 'height') === +at('tl-b-deska', 'y'), 'B, deska: závaží stojí na desce');
	ok(at('tl-b-primo', 'aria-pressed') === 'false' && at('tl-b-na-desce', 'aria-pressed') === 'true', 'B, deska: stisknuté je tlačítko „na desce"');
	ok(txt('tl-b-vysl').includes('Přímo na písku je tlak 5 000 Pa, přes desku o ploše 1 m² jen 50 Pa'), 'B, deska: text pod scénou souhlasí s SVG');
	return overB('deska');
};
const zavaziText = () => {
	const y = +at('tl-b-zavazi-t', 'y'), y0 = +at('tl-b-zavazi', 'y');
	const stred = +at('tl-b-zavazi', 'x') + +at('tl-b-zavazi', 'width') / 2;
	ok(y < y0 && y > y0 - 30 && +at('tl-b-zavazi-t', 'x') === stred && at('tl-b-zavazi-t', 'fill') === '#2b2a26', `B: nápis „5 kg" leží těsně nad závažím, tmavě (y ${y}, závaží od ${y0})`);
};
// Měřítko: závaží 10 cm × 10 cm = 100 cm², deska 1 m = 100 cm → šířky v poměru 1 : 10.
ok(+at('tl-b-deska', 'width') === 10 * +at('tl-b-zavazi', 'width') && +at('tl-b-zavazi', 'width') === +at('tl-b-zavazi', 'height'), `B: deska ${at('tl-b-deska', 'width')} j. je 10× širší než závaží ${at('tl-b-zavazi', 'width')} j. (1 m : 10 cm)`);
const pPrimo = primo(); zavaziText(); zaznamenej();
klik('tl-b-na-desce');
const hlDeska = +at('tl-b-dulek', 'height');
const pDeska = naDesce(); zavaziText(); zaznamenej();
ok(hlDeska < 36, `B: pod deskou je důlek mělčí (${hlDeska} < 36)`);
ok(pPrimo === 5000 && pDeska === 50, `B: stejná síla, plocha 100× větší → tlak 100× menší (${pPrimo} Pa → ${pDeska} Pa)`);
klik('tl-b-primo');
primo();

// ---------- C) jedna trojice, tři vzorce ----------
const KARTY = { F: '50 N', S: '0,01 m²', p: '5 000 Pa' };
const C = [
	{ co: 'p', nazev: 'tlak', vzorec: 'p = F : S', vypocet: 'p = 50 : 0,01 = 5 000 Pa', r3: 'tedy 5 000 Pa = 5 kPa' },
	{ co: 'F', nazev: 'síla', vzorec: 'F = p · S', vypocet: 'F = 5 000 · 0,01 = 50 N', r3: 'zkouška: 50 : 0,01 = 5 000 Pa' },
	{ co: 'S', nazev: 'plocha', vzorec: 'S = F : p', vypocet: 'S = 50 : 5 000 = 0,01 m²', r3: 'tedy 0,01 m² = 100 cm²' },
];
ok(txt('tl-c-vypocet') === C[0].vypocet, `C, výchozí stav po načtení: ${txt('tl-c-vypocet')}`);
for (const [i, c] of C.entries()) {
	posun('tl-c-hledana', i);
	for (const k of ['F', 'S', 'p']) {
		const hledam = k === c.co;
		ok(txt(`tl-c-v-${k}`) === (hledam ? '?' : KARTY[k]), `C, hledám ${c.nazev}: karta ${k} ukazuje „${txt(`tl-c-v-${k}`)}"`);
		ok(at(`tl-c-k-${k}`, 'fill') === (hledam ? '#ffd43b' : '#ffffff'), `C, hledám ${c.nazev}: karta ${k} ${hledam ? 'zvýrazněná' : 'bílá'}`);
	}
	ok(txt('tl-c-hledana-t') === c.nazev && txt('tl-c-vzorec') === c.vzorec, `C, ${c.nazev}: vzorec ${txt('tl-c-vzorec')}`);
	ok(txt('tl-c-vypocet') === c.vypocet, `C, ${c.nazev}: ${txt('tl-c-vypocet')}`);
	const cisla = txt('tl-c-vypocet').match(/\d+(?: \d{3})*(?:,\d+)?/g).map(cislo);
	const [a, b, v] = cisla;
	const prepocet = c.co === 'F' ? a * b : a / b;
	ok(prepocet === v, `C, ${c.nazev}: přepočet v testu ${prepocet} = výsledek v SVG ${v}`);
	// třetí řádek rámečku: nikdy prázdný, a jeho čísla sedí s výpočtem
	ok(txt('tl-c-r3') === c.r3, `C, ${c.nazev}: třetí řádek „${txt('tl-c-r3')}"`);
	if (c.co === 'S') {
		const cm = txt('tl-c-r3').match(/^tedy (\S+) m² = (\d+) cm²$/);
		ok(!!cm && cislo(cm[1]) === v && +cm[2] === v * 10000 && +cm[2] === 100, `C, plocha: ${v} m² = ${v * 10000} cm² (SVG „${txt('tl-c-r3')}")`);
	} else if (c.co === 'p') {
		const k = txt('tl-c-r3').match(/^tedy (\S+ \d{3}) Pa = (\d+) kPa$/);
		ok(!!k && cislo(k[1]) === v && +k[2] === v / 1000, `C, tlak: ${v} Pa = ${v / 1000} kPa (SVG „${txt('tl-c-r3')}")`);
	} else {
		const z = txt('tl-c-r3').match(/^zkouška: (\d+) : (\S+) = (\S+ \d{3}) Pa$/);
		ok(!!z && +z[1] === v && cislo(z[1]) / cislo(z[2]) === cislo(z[3]) && cislo(z[3]) === cislo(KARTY.p.replace(' Pa', '')), `C, síla: zkouška ${v} : 0,01 vrátí tlak z karty (SVG „${txt('tl-c-r3')}")`);
	}
	ok(txt('tl-c-vysl').startsWith(`Hledám ${c.nazev}: ${c.vzorec}.`), `C, ${c.nazev}: text pod scénou souhlasí s SVG`);
	zaznamenej();
}

// ---------- 4) celá čísla ----------
const statickeTexty = [...html.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]);
const vsechnyTexty = [...statickeTexty, ...videno];
const vsechnaCisla = vsechnyTexty.flatMap((t) => t.replace(/ /g, ' ').match(/\d+(?: \d{3})*(?:,\d+)?/g) || []);
const necela = [...new Set(vsechnaCisla.filter((c) => c.includes(',') && c !== '0,01'))];
ok(vsechnaCisla.length > 30 && necela.length === 0, `všech ${vsechnaCisla.length} čísel ve scénách je celých (kromě 0,01 m²)${necela.length ? ': ' + necela.join(', ') : ''}`);

// ---------- 5) opora ve výkladu ----------
const temata = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'data', 'temata.ts'), 'utf8');
const odTlaku = temata.slice(temata.indexOf("slug: 'tlak-v-kapalinach'"));
const podtema = odTlaku.slice(odTlaku.indexOf("slug: 'tlak',"));
const obsahM = podtema.match(/obsah:\s*("(?:[^"\\]|\\.)*")/);
ok(!!obsahM, 'výklad podtématu Tlak nalezen v temata.ts');
const vyklad = obsahM ? JSON.parse(obsahM[1]).replace(/<[^>]+>/g, ' ').replace(/ /g, ' ') : '';
const cislaVykladu = new Set((vyklad.match(/\d+(?: \d{3})*(?:,\d+)?/g) || []).map((c) => c.replace(/ /g, '')));
const bezOpory = [...new Set(vsechnaCisla.map((c) => c.replace(/ /g, '')).filter((c) => !cislaVykladu.has(c)))];
ok(bezOpory.length === 0, `každé číslo scén stojí ve výkladu${bezOpory.length ? ' — chybí: ' + bezOpory.join(', ') : ''}`);
for (const v of ['p = F : S', 'F = p · S', 'S = F : p', '100 cm² = 1 dm² = 0,01 m²', '5 000 Pa = 5 kPa', 'p = 50 : 1 = 50 Pa', 'S = F : p = 50 : 5 000 = 0,01 m²']) {
	ok(vyklad.includes(v), `výklad obsahuje „${v}"`);
}

// ---------- 6) nic z jiných podtémat ----------
const zobrazeno = (html.replace(/<!--[\s\S]*?-->/g, '') + ' ' + videno.join(' ')).toLowerCase();
const cizi = ['atmosf', 'hloubk', 'molekul', 'píst', 'teplot', 'mmhg', 'tun'].filter((s) => zobrazeno.includes(s));
ok(cizi.length === 0, `scény neukazují hloubku, atmosféru, molekuly ani píst${cizi.length ? ' — nalezeno: ' + cizi.join(', ') : ''}`);

console.log(`\n${chyby} chyb`);
process.exit(chyby ? 1 : 0);

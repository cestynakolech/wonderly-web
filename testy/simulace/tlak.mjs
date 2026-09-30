#!/usr/bin/env node
// Ověření TlakSimulace.astro (F7 „Tlak", čtyři scény): spustí SKUTEČNÝ skript
// komponenty v Node s náhradním DOM a proměří, co scéna žákovi ukazuje.
//
// Proč vznikl (30. 9. 2026): skript od commitu 05f78bf (26. 8. 2026) volal
// `s2Tyc.setAttribute(…)` bez deklarace proměnné. V prohlížeči padal hned při
// načtení na „ReferenceError: s2Tyc is not defined" — tím se zastavil celý
// skript: posuvník hloubky (scéna 3) ani přepínání scén se nepřipojily,
// scéna 4 zůstala bez molekul a tyč pístu nejezdila s pístem. Žádný test to
// nechytil, protože komponenta žádný test neměla. Proto první kontrola:
// SKRIPT SE MUSÍ DÁT SPUSTIT BEZ VÝJIMKY až do konce.
//
// Záměrně se tu NEzakonzervují čísla scény 1 a 3 (teplota→tlak, hloubka→tlak)
// — nemají oporu ve výkladu a fyzikálně nesedí (nález 30. 9. 2026, viz
// /tmp/wonderly-workery/2026-09-30-tema3/simulace-tlak.md). Kontroluje se jen,
// že scény žijí a že text souhlasí s tím, co ukazuje SVG.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ---------- náhradní DOM ----------
const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '',
		posluchaci: {},
		classList: { _t: new Set(), add(...t) { t.forEach((x) => this._t.add(x)); }, remove(...t) { t.forEach((x) => this._t.delete(x)); } },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
// jen id, která ve zdroji opravdu jsou — neexistující id vrátí null jako prohlížeč
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');
for (const m of html.matchAll(/\sid="([^"]+)"/g)) novyPrvek(m[1]);
// výchozí hodnoty posuvníků ze zdroje (value="…")
for (const m of zdroj.matchAll(/<input[^>]*id="([^"]+)"[^>]*value="([^"]+)"/g)) novyPrvek(m[1]).value = m[2];
// atributy SVG prvků s id ze zdroje (výchozí stav kresby)
for (const m of zdroj.matchAll(/<(rect|text|g|circle)\s+id="([^"]+)"([^>]*)>/g)) {
	const p = prvky.get(m[2]) || novyPrvek(m[2]);
	for (const a of m[3].matchAll(/([\w-]+)="([^"]*)"/g)) p.atributy[a[1]] = a[2];
}
const tlacitkaScen = [...zdroj.matchAll(/class="scene-btn[^"]*" data-scene="(\d)"/g)].map((m) => {
	const b = novyPrvek('tl-sceny-' + m[1]);
	b.atributy['data-scene'] = m[1];
	return b;
});
const document = {
	getElementById: (id) => prvky.get(id) || null,
	querySelectorAll: (sel) => (sel === '.scene-btn' ? tlacitkaScen : []),
};
const okno = { posluchaci: {}, addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); } };
const intervaly = [];
// deterministická „náhoda" — kresba se dá porovnat natvrdo
let n = 0;
const RAND = [0.1, 0.5, 0.9, 0.3, 0.7];
const MathMock = Object.create(Math);
MathMock.random = () => RAND[n++ % RAND.length];
const sandbox = { document, window: okno, setInterval: (f, ms) => intervaly.push({ f, ms }), console, Math: MathMock };
vm.createContext(sandbox);

// ---------- 1) skript doběhne bez výjimky ----------
let vyjimka = null;
try { vm.runInContext(skript, sandbox); } catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) { console.log(`\n${chyby} chyb`); process.exit(1); }

const el = (id) => prvky.get(id);
const at = (id, k) => el(id).getAttribute(k);
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
const kruhy = (html) => [...html.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)].map((m) => ({ x: +m[1], y: +m[2], r: +m[3] }));

// konec skriptu opravdu proběhl: všechny posluchače a časovač jsou připojené
ok((el('s1-teplot').posluchaci.input || []).length === 1, 'posuvník teploty (scéna 1) je připojený');
ok((el('s2-pist-slider').posluchaci.input || []).length === 1, 'posuvník pístu (scéna 2) je připojený');
ok((el('s3-hlubka').posluchaci.input || []).length === 1, 'posuvník hloubky (scéna 3) je připojený');
ok(tlacitkaScen.length === 4 && tlacitkaScen.every((b) => (b.posluchaci.click || []).length === 1), 'všechna 4 tlačítka scén mají posluchač kliknutí');
ok((okno.posluchaci.load || []).length === 1, 'inicializace scén po načtení je připojená');
ok(intervaly.length === 1 && kruhy(el('s4-molekuly').innerHTML).length === 80, 'scéna 4 nakreslí molekuly atmosféry a obnovuje je časovačem');
ok(el('s3-text').textContent.length > 0, 'scéna 3 vypíše popis hned po načtení');

// ---------- 2) scéna 1: molekuly uvnitř nádoby ----------
for (const i of [0, 1, 2]) {
	posun('s1-teplot', i);
	const k = kruhy(el('s1-molekuly').innerHTML);
	ok(k.length === 20, `scéna 1, poloha ${i}: v nádobě je 20 molekul (${k.length})`);
	ok(k.every((c) => c.x - c.r >= 50 && c.x + c.r <= 350 && c.y - c.r >= 50 && c.y + c.r <= 200), `scéna 1, poloha ${i}: všechny molekuly leží uvnitř nádoby`);
}

// ---------- 3) scéna 2: píst, tyč, molekuly, Boyle-Mariotte ----------
const VALEC_L = 50, VALEC_P = 340, VALEC_H = 60, VALEC_D = 240; // vnitřek válce po levou hranu pístu v klidu
const pisty = [];
for (const i of [0, 1, 2, 3]) {
	posun('s2-pist-slider', i);
	const px = +at('s2-pist', 'x');
	const tx = +at('s2-tyc', 'x');
	pisty.push(px);
	ok(tx === px + 20, `scéna 2, poloha ${i}: tyč jede s pístem (tyč x = ${tx}, píst x + šířka 20 = ${px + 20})`);
	ok(px > VALEC_L && px <= VALEC_P, `scéna 2, poloha ${i}: píst je uvnitř válce (x = ${px})`);
	const v = parseInt(el('s2-objem').textContent, 10);
	const p = parseInt(el('s2-tlak').textContent, 10);
	ok(el('s2-objem').textContent === `${v} %` && el('s2-tlak').textContent === `${p} kPa`, `scéna 2, poloha ${i}: údaje jsou celá čísla (${v} %, ${p} kPa)`);
	ok(Math.abs(p * v - 10000) <= 100, `scéna 2, poloha ${i}: p · V je stálé (Boyle-Mariotte): ${p} · ${v} = ${p * v}`);
	ok(el('s2-text').textContent.startsWith(`Objem = ${v} %, tlak = ${p} kPa.`), `scéna 2, poloha ${i}: popis souhlasí s údaji v SVG`);
	const k = kruhy(el('s2-molekuly').innerHTML);
	ok(k.length > 0 && k.every((c) => c.x - c.r >= VALEC_L && c.x + c.r <= px && c.y - c.r >= VALEC_H && c.y + c.r <= VALEC_D), `scéna 2, poloha ${i}: ${k.length} molekul, všechny uvnitř válce před pístem`);
}
ok(pisty[0] === VALEC_P, `scéna 2: ve výchozí poloze je píst úplně venku (x = ${pisty[0]})`);
ok(pisty.every((x, i) => i === 0 || x < pisty[i - 1]), `scéna 2: s každým krokem píst zajede hlouběji (${pisty.join(', ')})`);
ok(Math.abs((pisty[3] - VALEC_L) / (VALEC_P - VALEC_L) - 0.25) < 0.01, `scéna 2: nejvíc stlačený píst nechá čtvrtinu válce (25 %)`);
posun('s2-pist-slider', 0);
const k0 = kruhy(el('s2-molekuly').innerHTML);
const xs = [...new Set(k0.map((c) => c.x))].sort((a, b) => a - b);
const ys = [...new Set(k0.map((c) => c.y))].sort((a, b) => a - b);
ok(k0.length === 12, `scéna 2, výchozí stav: 12 molekul (${k0.length})`);
ok(JSON.stringify(xs) === '[120,160,200,240]', `scéna 2, výchozí stav: sloupce molekul na x = 120, 160, 200, 240 (${xs})`);
ok(JSON.stringify(ys) === '[135,180,225]', `scéna 2, výchozí stav: řady molekul na y = 135, 180, 225 (${ys})`);

// ---------- 4) přepínání scén ----------
okno.posluchaci.load[0]();
const sceny = ['scena1', 'scena2', 'scena3', 'scena4'].map((id) => el(id));
ok(sceny.every((s, i) => s.style.display === (i === 0 ? 'block' : 'none')), 'po načtení je vidět jen scéna 1');
tlacitkaScen[2].posluchaci.click[0]();
ok(sceny.every((s, i) => s.style.display === (i === 2 ? 'block' : 'none')), 'klik na „Scéna 3" ukáže jen scénu 3');

console.log(`\n${chyby} chyb`);
process.exit(chyby ? 1 : 0);

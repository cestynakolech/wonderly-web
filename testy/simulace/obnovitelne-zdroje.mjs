#!/usr/bin/env node
// Ověření ObnovitelneZdrojeSimulace.astro
// Scéna A: třídění zdrojů (vodík je chyták — nosič, ne zdroj).
// Scéna B: přečerpávací elektrárna — hladina se musí změnit SYNCHRONNĚ s klikem,
// ne až po doběhnutí animace (proto se čte hned po kliku, bez volání requestAnimationFrame).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const karty = [];
for (const id of ['slunce', 'vitr', 'voda', 'biomasa', 'uhli', 'ropa', 'plyn', 'jaderne', 'vodik']) {
	const b = novyPrvek('karta-' + id);
	b.dataset.id = id;
	karty.push(b);
}
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: (sel) => (sel === '.oz-karta' ? karty : []),
	createElementNS: () => novyPrvek('k' + Math.random()),
};
const rafQueue = [];
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: (f) => rafQueue.push(f), cancelAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);
const krokAnimace = () => { const f = rafQueue.shift(); if (f) f(); };

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (btn) => (btn.posluchaci.click || []).forEach((f) => f());

console.log('— scéna B: výchozí rozvržení (přesná čísla, hlídá konstanty nádrží) —');
const horniInit = document.getElementById('oz-b-horni-hladina');
const dolniInit = document.getElementById('oz-b-dolni-hladina');
// horniProcent = 50 na startu (schválně NE 80/20 — to jsou cíle obou režimů, viz komentář
// v komponentě), HORNI_VYSKA = 110, HORNI_Y0 = 20 → HORNI_DNO = 130
// height = 50/100 * 110 = 55; y = 130 - 55 = 75
ok(Number(horniInit.atributy.height) === 55, `výchozí výška horní hladiny = 55 (čekáno 50 % z 110), je ${horniInit.atributy.height}`);
ok(Number(horniInit.atributy.y) === 75, `výchozí y horní hladiny = 75 (130 − 55), je ${horniInit.atributy.y}`);
// dolní: 50 % z 110 = 55; DOLNI_DNO = 300; y = 300 - 55 = 245
ok(Number(dolniInit.atributy.height) === 55, `výchozí výška dolní hladiny = 55 (čekáno 50 % z 110), je ${dolniInit.atributy.height}`);
ok(Number(dolniInit.atributy.y) === 245, `výchozí y dolní hladiny = 245 (300 − 55), je ${dolniInit.atributy.y}`);

console.log('\n— PŘESNĚ scénář nahled-simulace.mjs: čerstvý sandbox, ŽÁDNÝ klik, pak jediný klik=oz-b-cerpat —');
{
	const zdroj2 = readFileSync(process.argv[2], 'utf8');
	const skript2 = zdroj2.match(/<script>([\s\S]*?)<\/script>/)[1];
	const prvky2 = new Map();
	const novy2 = (id) => {
		const p = { id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, classList: { add() {}, remove() {}, toggle() {} },
			setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; },
			appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } };
		prvky2.set(id, p); return p;
	};
	const document2 = { getElementById: (id) => prvky2.get(id) || novy2(id), querySelectorAll: () => [], createElementNS: () => novy2('k' + Math.random()) };
	// requestAnimationFrame se — stejně jako v nahled-simulace.mjs — NIKDY nespustí
	const sandbox2 = { document: document2, performance: { now: () => 0 }, requestAnimationFrame: () => {}, cancelAnimationFrame: () => {}, console, Math };
	vm.createContext(sandbox2);
	vm.runInContext(skript2, sandbox2);

	const horniPred = { ...document2.getElementById('oz-b-horni-hladina').atributy };
	// klik přesně jako nahled-simulace.mjs: zavolá VŠECHNY posluchače „click"
	(document2.getElementById('oz-b-cerpat').posluchaci.click || []).forEach((f) => f({ currentTarget: {}, target: {}, preventDefault() {} }));
	const horniPo = document2.getElementById('oz-b-horni-hladina').atributy;

	ok(horniPred.height !== undefined, `default (bez kliku) má vykreslenou height: ${horniPred.height}`);
	ok(horniPo.height !== horniPred.height, `PO klik=oz-b-cerpat (bez RAF) se height SYNCHRONNĚ změnila: ${horniPred.height} → ${horniPo.height}`);
	ok(Number(horniPo.height) > Number(horniPred.height), `po čerpání height horní hladiny VZROSTLA (voda stoupá): ${horniPred.height} → ${horniPo.height}`);
}

console.log('\n— výchozí CÍL animace (bez jakéhokoli kliku) musí být 20 % — hlídá počáteční hodnotu cilHorniProcent —');
{
	const zdroj3 = readFileSync(process.argv[2], 'utf8');
	const skript3 = zdroj3.match(/<script>([\s\S]*?)<\/script>/)[1];
	const prvky3 = new Map();
	const novy3 = (id) => {
		const p = { id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, classList: { add() {}, remove() {}, toggle() {} },
			setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; },
			appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } };
		prvky3.set(id, p); return p;
	};
	const document3 = { getElementById: (id) => prvky3.get(id) || novy3(id), querySelectorAll: () => [], createElementNS: () => novy3('k' + Math.random()) };
	const raf3 = [];
	const sandbox3 = { document: document3, performance: { now: () => 0 }, requestAnimationFrame: (f) => raf3.push(f), cancelAnimationFrame: () => {}, console, Math };
	vm.createContext(sandbox3);
	vm.runInContext(skript3, sandbox3);
	// žádný klik — jen mnoho snímků animace od úplného startu (default aktivní režim VYRÁBĚT)
	for (let i = 0; i < 400 && raf3.length; i++) { const f = raf3.shift(); f(); }
	const horniKonecBezKliku = Number(document3.getElementById('oz-b-horni-hladina').atributy.height);
	// 20 % z 110 = 22
	ok(Math.abs(horniKonecBezKliku - 22) <= 0.5, `bez jediného kliku se výchozí animace ustálí u 20 % (height≈22), skutečně ${horniKonecBezKliku}`);
}

console.log('\n— scéna A: barvy podle typu zdroje (hlídá barvaProTyp) —');
const kartaSlunce = karty.find((k) => k.dataset.id === 'slunce');
const kartaUhli = karty.find((k) => k.dataset.id === 'uhli');
const kartaVodik = karty.find((k) => k.dataset.id === 'vodik');
klik(kartaSlunce);
ok(kartaSlunce.style.background === '#d3f9d8', `slunce dostane ZELENÉ pozadí (#d3f9d8), má ${kartaSlunce.style.background}`);
klik(kartaUhli);
ok(kartaUhli.style.background === '#e9ecef', `uhlí dostane ŠEDÉ pozadí (#e9ecef), má ${kartaUhli.style.background}`);
klik(kartaVodik);
ok(kartaVodik.style.background === '#fff3bf', `vodík dostane ŽLUTÉ pozadí (#fff3bf, ani obn. ani neobn.), má ${kartaVodik.style.background}`);

console.log('\n— scéna A: třídění zdrojů —');
const OCEKAVANO = {
	slunce: 'obnovitelny', vitr: 'obnovitelny', voda: 'obnovitelny', biomasa: 'obnovitelny',
	uhli: 'neobnovitelny', ropa: 'neobnovitelny', plyn: 'neobnovitelny', jaderne: 'neobnovitelny',
};
for (const btn of karty) {
	const id = btn.dataset.id;
	klik(btn);
	const stavEl = prvky.get('oz-stav');
	if (id === 'vodik') {
		ok(/nosič|Chyták/i.test(stavEl.textContent), `vodík: text upozorňuje na to, že je to NOSIČ (chyták) — "${stavEl.textContent}"`);
	} else {
		const cekana = OCEKAVANO[id];
		const shoda = cekana === 'obnovitelny' ? /[Oo]bnovitelný(?!\s*—\s*neb)/.test(stavEl.textContent) && !/Neobnovitelný/.test(stavEl.textContent) : /Neobnovitelný/.test(stavEl.textContent);
		ok(shoda, `${id}: zařazen jako ${cekana} — "${stavEl.textContent}"`);
	}
}

console.log('\n— scéna B: přečerpávací elektrárna — hladina se mění OKAMŽITĚ s klikem —');
const svgB = document.getElementById('oz-b-svg');
const horni = document.getElementById('oz-b-horni-hladina');

const btnCerpat = document.getElementById('oz-b-cerpat');
const btnVyrabet = document.getElementById('oz-b-vyrabet');

// start: vyrábět, horní hladina vysoká
klik(btnVyrabet);
const vyskaPredKlikem = Number(horni.atributy.height);

klik(btnCerpat);
const vyskaPoKlikuCerpat = Number(horni.atributy.height);
ok(vyskaPoKlikuCerpat !== vyskaPredKlikem, `klik na ČERPAT hned mění vykreslenou výšku hladiny (height): ${vyskaPredKlikem} → ${vyskaPoKlikuCerpat} (bez volání requestAnimationFrame)`);
ok(vyskaPoKlikuCerpat > vyskaPredKlikem, `při čerpání horní hladina STOUPÁ (height roste): ${vyskaPredKlikem} → ${vyskaPoKlikuCerpat}`);

const stavPoCerpani = svgB.__stavHladin();
ok(stavPoCerpani.rezim === 'cerpat', 'interní stav odpovídá režimu "cerpat"');

klik(btnVyrabet);
const vyskaPoKlikuVyrabet = Number(horni.atributy.height);
ok(vyskaPoKlikuVyrabet !== vyskaPoKlikuCerpat, `klik na VYRÁBĚT hned mění výšku hladiny zpátky: ${vyskaPoKlikuCerpat} → ${vyskaPoKlikuVyrabet}`);
ok(vyskaPoKlikuVyrabet < vyskaPoKlikuCerpat, `při výrobě horní hladina KLESÁ (height klesá): ${vyskaPoKlikuCerpat} → ${vyskaPoKlikuVyrabet}`);

console.log('\n— scéna B: doladění animace po kliku (krok, směr, zastavení blízko cíle) —');
klik(btnCerpat); // ustálit ve známém stavu bez ohledu na pořadí předchozích kliků
// klik na ČERPAT: okamžitý skok už proběhl výše (0.4 podílu), cíl = 80.
// Jeden krok animace (0.08 podílu rozdílu) se musí posunout SMĚREM K CÍLI a nesmí přestřelit.
const stavPred = svgB.__stavHladin();
krokAnimace();
const stavPo1 = svgB.__stavHladin();
const rozdilPred = Math.abs(80 - stavPred.horniProcent);
const rozdilPo = Math.abs(80 - stavPo1.horniProcent);
ok(stavPo1.horniProcent > stavPred.horniProcent, `krok animace při čerpání posune horniProcent SMĚREM NAHORU (k cíli 80): ${stavPred.horniProcent.toFixed(2)} → ${stavPo1.horniProcent.toFixed(2)}`);
ok(rozdilPo < rozdilPred, `krok animace se PŘIBLÍŽIL k cíli (rozdíl klesl): ${rozdilPred.toFixed(2)} → ${rozdilPo.toFixed(2)}`);
ok(rozdilPo > rozdilPred * 0.5, `krok animace nedělá obří skok (přiblížení je jen zlomek rozdílu, ne skok přes cíl): rozdíl po kroku ${rozdilPo.toFixed(2)} z původních ${rozdilPred.toFixed(2)}`);

// mnoho kroků: hodnota se musí ustálit TĚSNĚ POD cílem 80, ne přesně na 0 rozdílu (kvůli prahu 0.3)
for (let i = 0; i < 200; i++) krokAnimace();
const stavKonec = svgB.__stavHladin();
ok(Math.abs(80 - stavKonec.horniProcent) <= 0.3, `po mnoha krocích je horniProcent do 0,3 od cíle 80: je ${stavKonec.horniProcent.toFixed(3)}`);

klik(btnVyrabet);
for (let i = 0; i < 200; i++) krokAnimace();
const stavKonecVyrabet = svgB.__stavHladin();
ok(Math.abs(20 - stavKonecVyrabet.horniProcent) <= 0.3, `po přepnutí na VYRÁBĚT se po mnoha krocích horniProcent ustálí do 0,3 od cíle 20: je ${stavKonecVyrabet.horniProcent.toFixed(3)}`);

console.log(`\n${chyby === 0 ? '✅ VŠE OK' : `❌ CHYB: ${chyby}`}`);
process.exit(chyby === 0 ? 0 : 1);

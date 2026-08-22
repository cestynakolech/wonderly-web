#!/usr/bin/env node
// Ověření UcinnostMotoruSimulace.astro — kam se ztratí teplo tepelného motoru.
//
// Měří se VÝSLEDEK přes vlastní funkci komponenty `__rozpad(stroj, vstup)`.
// Hlídá se to, co má žák pochopit i to, co by mu tiše lhalo: energie nesmí
// zmizet ani přibýt, čísla musí být celá (žák si je má umět přepočítat),
// pořadí účinností musí odpovídat výkladu a šířky pruhů musí sedět s procenty.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('ucm-svg');
const slider = prvky.get('ucm-slider');
const rozpad = svg.__rozpad;
const STROJE = svg.__stroje;
const KLICE = Object.keys(STROJE);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (kJ) => { slider.value = String(kJ); for (const f of slider.posluchaci.input) f(); };

console.log('— výchozí stav scény —');
ok(slider.value === '100', `scéna se otevírá se 100 kJ (${slider.value}) — nejjednodušší číslo, procenta se rovnou čtou jako kJ`);
ok(prvky.get('ucm-nazev').textContent.includes('Watt'),
	`a začíná u parního stroje, o kterém je podtéma: „${prvky.get('ucm-nazev').textContent}"`);

console.log('\n— energie nikam nezmizí ani nepřibude —');
for (const klic of KLICE) {
	let sedi = true, cela = true;
	for (let vstup = 100; vstup <= 1000; vstup += 100) {
		const d = rozpad(klic, vstup);
		const soucet = d.pohyb + d.ztraty;
		if (soucet !== vstup) sedi = false;
		if (![d.pohyb, d.ztraty].every(Number.isInteger)) cela = false;
	}
	ok(sedi, `${klic}: součet pohybu a ztrát se rovná vstupu při všech deseti nastaveních posuvníku`);
	ok(cela, `${klic}: oba díly vycházejí v celých kJ — žák si je umí přepočítat`);
}

console.log('\n— žádný stroj neumí přeměnit všechno teplo na pohyb —');
for (const klic of KLICE) {
	const d = rozpad(klic, 100);
	ok(d.pohyb < d.ztraty && d.pohyb > 0,
		`${klic}: na pohyb ${d.pohyb} kJ, pryč ${d.ztraty} kJ — ztráty jsou vždy větší než užitek`);
}

console.log('\n— pořadí účinností odpovídá výkladu —');
{
	const p = STROJE['parni-stroj'].pohyb, t = STROJE['turbina'].pohyb, s = STROJE['spalovaci'].pohyb;
	ok(p === 15, `parní stroj ~15 % (${p} %) — číslo z výkladu`);
	ok(t === 35, `parní turbína ~35 % (${t} %) — výklad říká „vyšší než u parního stroje"`);
	ok(t > s && s > p, `a celé pořadí sedí: turbína ${t} % > spalovací ${s} % > parní stroj ${p} %`);
}

console.log('\n— poměry se posuvníkem nemění, mění se jen čísla —');
{
	const maly = rozpad('turbina', 100), velky = rozpad('turbina', 1000);
	ok(velky.pohyb === maly.pohyb * 10, `desetkrát víc paliva = desetkrát víc pohybu (${maly.pohyb} → ${velky.pohyb} kJ)`);
	ok(velky.pohyb / (velky.pohyb + velky.ztraty) === 0.35,
		'ale účinnost zůstává táž — víc paliva stroj nezlepší');
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
// Pruh je to jediné, co žák doopravdy čte. Kdyby jeho šířky neodpovídaly
// procentům, obrázek by lhal i při správném výpočtu.
const pruh = prvky.get('ucm-pruh');
const popisky = prvky.get('ucm-popisky');
const stroje = prvky.get('ucm-stroje');
const prepni = (klic) => {
	const tl = { dataset: { stroj: klic }, closest: () => tl, classList: { toggle() {} } };
	for (const f of stroje.posluchaci.click) f({ target: { closest: () => tl } });
};

console.log('\n— pruh: šířky odpovídají procentům —');
for (const klic of KLICE) {
	prepni(klic);
	nastav(100);
	// Mezera před `width` je nutná: bez ní regex chytal i `stroke-width="3"`
	// a měřil tloušťku obrysu jako šířku dílu.
	const sirky = [...pruh.innerHTML.matchAll(/ width="([\d.]+)"/g)].map((m) => +m[1]);
	const s = STROJE[klic];
	const ocekavane = [s.pohyb, 100 - s.pohyb].map((p) => (560 * p) / 100);
	ok(sirky.length === 2, `${klic}: pruh má jen dva díly — pohyb a celkové ztráty (výklad je dál nedělí)`);
	ok(sirky.every((w, i) => Math.abs(w - ocekavane[i]) < 0.01),
		`${klic}: a jejich šířky sedí s procenty (${sirky.map((w) => Math.round(w)).join(' + ')} = ${Math.round(sirky.reduce((a, b) => a + b, 0))} z 560 px)`);
	ok(Math.abs(sirky.reduce((a, b) => a + b, 0) - 560) < 0.01,
		`${klic}: dohromady vyplní celou šířku — nikde nechybí ani nepřebývá kousek`);
}

console.log('\n— pruh: první díl je pohyb a je zelený —');
{
	prepni('parni-stroj');
	nastav(100);
	const prvni = /<rect[^>]*fill="([^"]+)"/.exec(pruh.innerHTML)[1];
	ok(prvni === '#2f9e44', `užitečná část je vlevo a zelená (${prvni}) — pořád na stejném místě, ať je stroj jakýkoli`);
	ok(popisky.innerHTML.includes('15 %') && popisky.innerHTML.includes('15 kJ'),
		'a je popsaná procenty i kilojouly');
}

console.log('\n— legenda vysvětluje barvy pruhu —');
{
	// Legenda popisuje jen dva díly: POHYB a ZTRÁTY. Cesty ztrát (komín/výfuk,
	// chlazení, tření) se JMENUJÍ slovně bez procent — výklad je čísly nedělí.
	prepni('parni-stroj');
	nastav(100);
	const barvyPruhu = [...pruh.innerHTML.matchAll(/fill="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
	const barvyLegendy = [...popisky.innerHTML.matchAll(/<rect[^>]*fill="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
	ok(barvyLegendy.length === 2, `legenda má dvě políčka (${barvyLegendy.length})`);
	ok(barvyLegendy.join() === barvyPruhu.join(),
		'a jejich barvy sedí s pruhem ve stejném pořadí — jinak by legenda ukazovala na špatný díl');
	for (const slovo of ['POHYB', 'komínem', 'unikající párou', 'třením']) {
		ok(popisky.innerHTML.includes(slovo), `legenda pojmenovává „${slovo}"`);
	}
}

console.log('\n— věta pod scénou počítá totéž, co ukazuje pruh —');
{
	// Doplněno po mutačním testu: tahle věta tvrdí „energie nikam nezmizí, jen se
	// rozdělí". Kdyby se v ní ztráty sčítaly špatně, učila by stránka zákon
	// zachování energie na příkladu, který ho porušuje — a pruh by přitom byl
	// v pořádku, takže by si toho nikdo nevšiml.
	for (const klic of KLICE) {
		prepni(klic);
		nastav(200);
		const t = prvky.get('ucm-vypocet').innerHTML.replace(/<[^>]+>/g, '');
		const d = rozpad(klic, 200);
		const cisla = [...t.matchAll(/(\d+) kJ/g)].map((m) => +m[1]);
		ok(cisla[0] === 200 && cisla[1] === d.pohyb && cisla[2] === d.ztraty && cisla[3] === 200,
			`${klic}: „z ${cisla[0]} kJ se na pohyb promění ${cisla[1]} kJ, zbylých ${cisla[2]} kJ odejde, dohromady zase ${cisla[3]} kJ"`);
		ok(cisla[1] + cisla[2] === cisla[3],
			`${klic}: a ta čísla si opravdu sedí (${cisla[1]} + ${cisla[2]} = ${cisla[3]}) — jinak by věta o zachování energie lhala`);
	}
}

console.log('\n— přepnutí stroje opravdu překreslí scénu —');
{
	prepni('parni-stroj');
	const parni = pruh.innerHTML;
	prepni('turbina');
	const turbina = pruh.innerHTML;
	ok(parni !== turbina, 'pruh parního stroje a turbíny se liší');
	ok(prvky.get('ucm-schema').innerHTML.includes('lopatky'),
		'u turbíny se ve schématu objeví lopatky — každý stroj má vlastní obrázek');
	ok(prvky.get('ucm-stav').textContent.includes('35 %'),
		`a hláška mluví o té správné účinnosti: „${prvky.get('ucm-stav').textContent.slice(0, 60)}…"`);
}

console.log(chyby === 0 ? '\n✅ Účinnost motoru: vše sedí.' : `\n❌ Účinnost motoru: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

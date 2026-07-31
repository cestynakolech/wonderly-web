#!/usr/bin/env node
// Ověření OdporVodiceSimulace.astro: spustí SKUTEČNÝ skript komponenty v Node
// s náhradním DOM a proměří vzorec, spojitost pohybu a udržení elektronů v drátu.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {},
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const tlacitka = [];
function tlacitko(data) {
	const t = novyPrvek('tl-' + JSON.stringify(data));
	Object.assign(t.dataset, data);
	tlacitka.push(t);
	return t;
}
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: (sel) => {
		if (sel === '.odp-s-tl') return [tlacitko({ s: '0.5' }), tlacitko({ s: '1' })];
		if (sel === '.odp-m-tl') return [tlacitko({ ro: '0.5', nazev: 'konstantan' }), tlacitko({ ro: '0.028', nazev: 'hliník' }), tlacitko({ ro: '0.018', nazev: 'měď' })];
		if (sel === '.odp-t-tl') return [tlacitko({ teplo: '0' }), tlacitko({ teplo: '1' })];
		return [];
	},
	createElementNS: () => novyPrvek('e' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);

// posuvník délky musí mít hodnotu
const lSlider = novyPrvek('odp-l');
lSlider.value = '4';
vm.runInContext(skript, sandbox);

const svg = prvky.get('odp-svg');
const stav = prvky.get('odp-stav');
const vysledek = prvky.get('odp-vysledek');

let chyby = 0;
const ok = (p, popis) => { console.log(`${p ? '✅' : '❌'} ${popis}`); if (!p) chyby++; };
const klik = (klic, hodnota) => {
	const t = tlacitka.find((x) => x.dataset[klic] === hodnota);
	(t.posluchaci.click || []).forEach((fn) => fn());
};

console.log('— vzorec R = ρ · l / S —');
const R = svg.__odpor;
ok(R(4, 1, 0.5, 0) === 2, `konstantan 4 m, 1 mm² → ${R(4, 1, 0.5, 0)} Ω (čekáno 2)`);
ok(R(8, 1, 0.5, 0) === 4, `dvojnásobná délka → dvojnásobný odpor: ${R(8, 1, 0.5, 0)} Ω (čekáno 4)`);
ok(R(4, 0.5, 0.5, 0) === 4, `poloviční průřez → dvojnásobný odpor: ${R(4, 0.5, 0.5, 0)} Ω (čekáno 4)`);
ok(R(10, 0.5, 0.5, 0) === 10, `nejdelší tenký konstantan → ${R(10, 0.5, 0.5, 0)} Ω (celé číslo)`);
// všechny kombinace konstantanu musí dát CELÉ ohmy (pravidlo „celá čísla pro děti")
let neceleKonst = 0;
for (const l of [2, 4, 6, 8, 10]) for (const s of [0.5, 1]) {
	if (Math.abs(R(l, s, 0.5, 0) - Math.round(R(l, s, 0.5, 0))) > 1e-9) neceleKonst++;
}
ok(neceleKonst === 0, `konstantan dává ve všech 10 kombinacích celé ohmy (necelé: ${neceleKonst})`);
ok(R(4, 1, 0.018, 0) < R(4, 1, 0.5, 0), 'měď má menší odpor než konstantan');
ok(R(4, 1, 0.018, 1) > R(4, 1, 0.018, 0), 'rozžhavená měď má větší odpor než studená');
const zmenaKonst = R(4, 1, 0.5, 1) / R(4, 1, 0.5, 0);
ok(zmenaKonst < 1.05, `odpor konstantanu se rozžhavením skoro nemění (${((zmenaKonst - 1) * 100).toFixed(0)} %)`);

console.log('\n— pohyb elektronů (vzorkování po 16 ms) —');
for (const [popis, nastav] of [
	['konstantan 4 m / 1 mm²', () => { klik('ro', '0.5'); klik('s', '1'); }],
	['měď 4 m / 1 mm² (nejrychlejší)', () => { klik('ro', '0.018'); klik('s', '1'); }],
	['konstantan 10 m / 0,5 mm² (nejpomalejší)', () => { klik('ro', '0.5'); klik('s', '0.5'); lSlider.value = '10'; (lSlider.posluchaci.input || []).forEach((f) => f()); }],
]) {
	nastav();
	const r = svg.__rozmery();
	let maxSkok = 0, mimo = 0;
	for (let k = 0; k < 12; k++) {
		let minule = svg.__polohaElektronu(0, k);
		for (let t = 0.016; t < 6; t += 0.016) {
			const ted = svg.__polohaElektronu(t, k);
			// skok přes konec drátu (návrat na začátek) se nepočítá jako trhnutí
			const skok = Math.hypot(ted[0] - minule[0], ted[1] - minule[1]);
			if (skok < r.sirka / 2 && skok > maxSkok) maxSkok = skok;
			if (ted[0] < r.x - 0.01 || ted[0] > r.x + r.sirka + 0.01 || ted[1] < r.y - 0.01 || ted[1] > r.y + r.vyska + 0.01) mimo++;
			minule = ted;
		}
	}
	ok(maxSkok < 20 && mimo === 0, `${popis}: max skok ${maxSkok.toFixed(2)} px, mimo drát ${mimo}× `);
}

console.log('\n— texty pro žáka —');
klik('ro', '0.018');
ok(stav.textContent.includes('měď') || stav.textContent.includes('Měď'), 'u mědi se vysvětlí, proč se z ní dělá vedení');
klik('ro', '0.5');
ok(stav.textContent.length > 50, 'u konstantanu je vysvětlení k čemu se používá');
klik('teplo', '1');
ok(stav.textContent.includes('rezistor') || stav.textContent.includes('kmit'), 'teplota má vlastní vysvětlení');
ok(vysledek.textContent.startsWith('R = '), `výsledek se zobrazuje: „${vysledek.textContent}"`);

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

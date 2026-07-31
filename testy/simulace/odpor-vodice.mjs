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
	// plná verze simulace (základní verze pro dřívější podtéma se testuje zvlášť)
	querySelector: () => ({ dataset: { zaklad: '0' } }),
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
ok(R(8, 1, 0.5, 0) === 4, `dvojnásobná délka → dvojnásobný odpor`);
ok(R(4, 0.5, 0.5, 0) === 4, `poloviční průřez → dvojnásobný odpor`);
ok(R(4, 1, 0.018, 0) < R(4, 1, 0.5, 0), 'měď má menší odpor než konstantan');

console.log('\n— celá čísla u konstantanu i PO ZAHŘÁTÍ (nález kontrolora) —');
let necele = 0;
for (const horky of [0, 1]) for (const l of [2, 4, 6, 8, 10]) for (const s of [0.5, 1]) {
	const v = R(l, s, 0.5, horky);
	if (Math.abs(v - Math.round(v)) > 1e-9) necele++;
}
ok(necele === 0, `konstantan dává celé ohmy ve všech 20 kombinacích včetně zahřátí (necelých: ${necele})`);
ok(R(4, 1, 0.5, 1) === R(4, 1, 0.5, 0), 'odpor konstantanu se zahřátím NEZMĚNÍ (proto se z něj dělají rezistory)');
ok(R(4, 1, 0.018, 1) > R(4, 1, 0.018, 0), 'zahřátá měď má odpor větší než studená');

console.log('\n— zobrazený vzorec musí souhlasit s výsledkem (nález kontrolora) —');
klik('ro', '0.018'); klik('s', '1'); klik('teplo', '1');
const vz = prvky.get('odp-vzorec').textContent;
const dosazeni = vz.match(/=\s*([\d,]+)\s*·\s*(\d+)\s*\/\s*([\d,]+)\s*=\s*([\d,]+)/);
const cislo = (t) => parseFloat(t.replace(',', '.'));
ok(!!dosazeni, `vzorec je vypsaný celý včetně výsledku: „${vz}"`);
if (dosazeni) {
	const spocteno = cislo(dosazeni[1]) * cislo(dosazeni[2]) / cislo(dosazeni[3]);
	ok(Math.abs(spocteno - cislo(dosazeni[4])) < 0.001,
		`dosazení ve vzorci opravdu dá vypsaný výsledek: ${dosazeni[1]}·${dosazeni[2]}/${dosazeni[3]} = ${dosazeni[4]}`);
}
ok(/po zahřátí/.test(prvky.get('odp-vysledek').textContent),
	`vliv zahřátí je uveden zvlášť: „${prvky.get('odp-vysledek').textContent}"`);

console.log('\n— rychlost elektronů musí být znát v celém rozsahu (nález kontrolora) —');
const rychlosti = [2, 4, 6, 8, 10].map((r) => svg.__rychlost(r));
ok(new Set(rychlosti).size === 5, `pět různých odporů dá pět různých rychlostí: ${rychlosti.map((x) => x.toFixed(1)).join(', ')}`);
ok(rychlosti[0] > rychlosti[4] * 2, 'rozdíl mezi 2 Ω a 10 Ω je výrazný, ne oříznutý na mez');

console.log('\n— pohyb elektronů (vzorkování po 16 ms) —');
for (const [popis, nastav] of [
	['konstantan 4 m / 1 mm²', () => { klik('teplo', '0'); klik('ro', '0.5'); klik('s', '1'); }],
	['měď 4 m / 1 mm² (nejrychlejší)', () => { klik('ro', '0.018'); klik('s', '1'); }],
	['konstantan 10 m / 0,5 mm²', () => { klik('ro', '0.5'); klik('s', '0.5'); lSlider.value = '10'; (lSlider.posluchaci.input || []).forEach((f) => f()); }],
]) {
	nastav();
	const r = svg.__rozmery();
	let maxSkok = 0, mimo = 0;
	for (let k = 0; k < 12; k++) {
		let minule = svg.__polohaElektronu(0, k);
		for (let t = 0.016; t < 6; t += 0.016) {
			const ted = svg.__polohaElektronu(t, k);
			const skok = Math.hypot(ted[0] - minule[0], ted[1] - minule[1]);
			if (skok < r.sirka / 2 && skok > maxSkok) maxSkok = skok;
			if (ted[0] < r.x - 0.01 || ted[0] > r.x + r.sirka + 0.01 || ted[1] < r.y - 0.01 || ted[1] > r.y + r.vyska + 0.01) mimo++;
			minule = ted;
		}
	}
	ok(maxSkok < 20 && mimo === 0, `${popis}: max skok ${maxSkok.toFixed(2)} px, mimo drát ${mimo}×`);
}

console.log('\n— porovnávací pruh nesmí přetéct rámeček —');
klik('teplo', '1'); klik('ro', '0.5'); klik('s', '0.5');
lSlider.value = '10'; (lSlider.posluchaci.input || []).forEach((f) => f());
const sirkaPruhu = parseFloat(prvky.get('odp-pruh').getAttribute('width'));
ok(sirkaPruhu <= 296, `nejširší možný pruh je ${sirkaPruhu} px (rámeček má 296 px vnitřku)`);

console.log('\n— texty —');
klik('teplo', '0');
klik('ro', '0.028');
ok(/[Hh]liník/.test(stav.textContent) && !/mědi dělaj/.test(stav.textContent),
	'u hliníku se nemluví o použití mědi');
klik('ro', '0.018');
ok(/[Mm]ěď/.test(stav.textContent), 'u mědi se vysvětlí, proč se z ní dělá vedení');
klik('ro', '0.5');
ok(/měrný odpor/.test(stav.textContent), 'u konstantanu je správný pojem „měrný odpor", ne „odpor"');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

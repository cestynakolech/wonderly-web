#!/usr/bin/env node
// Ověření ZapojeniSimulace.astro — hlavně KULIČEK PROUDU (přání učitele 31. 7. 2026):
// kuličky se v uzlu jen ROZDĚLÍ (žádná nevzniká ani nemizí), při stejných odporech
// jdou „ob kuličku", při různých v poměru odpovídajícím proudům.
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
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: () => [],
	createElementNS: () => novyPrvek('k' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
const r1 = novyPrvek('zap-r1'); r1.value = '20';
const r2 = novyPrvek('zap-r2'); r2.value = '60';
vm.runInContext(skript, sandbox);

const svg = prvky.get('zap-svg');
const stav = prvky.get('zap-stav');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (a, b) => {
	r1.value = String(a); r2.value = String(b);
	(r1.posluchaci.input || []).forEach((f) => f());
};
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());

const N = svg.__pocetKulicek;

console.log('— kuličky se DĚLÍ, ne vznikají (jádro přání učitele) —');
for (const [R1, R2] of [[20, 20], [20, 60], [10, 30], [30, 60], [40, 40]]) {
	const i1 = 12 / R1, i2 = 12 / R2;
	const podil = svg.__podilVetve1(i1, i2);
	let v1 = 0, v2 = 0;
	for (let k = 0; k < N; k++) (svg.__vetevKulicky(k, podil) === 1 ? v1++ : v2++);
	ok(v1 + v2 === N, `R₁ ${R1} Ω / R₂ ${R2} Ω → ${v1} + ${v2} = ${v1 + v2} kuliček (celkem musí být ${N})`);
}

console.log('\n— při stejných odporech „ob kuličku" —');
{
	const podil = svg.__podilVetve1(12 / 20, 12 / 20);
	const vzor = Array.from({ length: 8 }, (_, k) => svg.__vetevKulicky(k, podil));
	const strida = vzor.every((v, i) => i === 0 || v !== vzor[i - 1]);
	ok(strida, `stejné odpory → větve se střídají: ${vzor.join('')}`);
}

console.log('\n— při různých odporech poměr odpovídá PROUDŮM (obráceně než odpory) —');
for (const [R1, R2, ocekN1, ocekN2] of [[20, 60, 3, 1], [10, 30, 3, 1], [20, 40, 2, 1], [30, 60, 2, 1]]) {
	const [n1, n2] = svg.__pomerKulicek(R1, R2);
	ok(n1 === ocekN1 && n2 === ocekN2, `R₁ ${R1} Ω / R₂ ${R2} Ω → poměr kuliček ${n1} : ${n2} (čekáno ${ocekN1} : ${ocekN2})`);
	// a skutečné rozdělení musí ten poměr dodržet
	const podil = svg.__podilVetve1(12 / R1, 12 / R2);
	let v1 = 0;
	for (let k = 0; k < N; k++) if (svg.__vetevKulicky(k, podil) === 1) v1++;
	ok(Math.abs(v1 / N - n1 / (n1 + n2)) < 0.02, `   skutečně jich do větve 1 jde ${v1} z ${N} (${(v1 / N * 100).toFixed(0)} %, čekáno ${(n1 / (n1 + n2) * 100).toFixed(0)} %)`);
}

console.log('\n— menší odpor musí dostat VÍC kuliček —');
{
	const podil = svg.__podilVetve1(12 / 20, 12 / 60);
	let v1 = 0;
	for (let k = 0; k < N; k++) if (svg.__vetevKulicky(k, podil) === 1) v1++;
	ok(v1 > N - v1, `menším odporem (20 Ω) jde ${v1} kuliček, větším (60 Ω) jen ${N - v1}`);
}

console.log('\n— rozprostření musí být rovnoměrné, ne po blocích —');
{
	const podil = svg.__podilVetve1(12 / 20, 12 / 60); // 3 : 1
	let nejdelsiSerie = 0, ted = 0, minuly = null;
	for (let k = 0; k < N; k++) {
		const v = svg.__vetevKulicky(k, podil);
		ted = v === minuly ? ted + 1 : 1;
		minuly = v;
		if (ted > nejdelsiSerie) nejdelsiSerie = ted;
	}
	ok(nejdelsiSerie <= 3, `nejdelší řada kuliček do téže větve je ${nejdelsiSerie} (u poměru 3 : 1 nejvýš 3)`);
}

console.log('\n— pohyb: spojitost a setrvání na drátě —');
for (const [rz, popis] of [['serie', 'sériově'], ['paralel', 'paralelně']]) {
	const podil = rz === 'serie' ? 1 : svg.__podilVetve1(12 / 20, 12 / 60);
	let maxSkok = 0;
	for (let k = 0; k < N; k++) {
		let minule = svg.__polohaKulicky(0, k, rz, podil);
		// jeden celý oběh po krocích odpovídajících 16 ms při nejvyšší rychlosti 0,18/s
		for (let f = 0.0029; f <= 1.003; f += 0.0029) {
			const ted = svg.__polohaKulicky(f, k, rz, podil);
			const skok = Math.hypot(ted[0] - minule[0], ted[1] - minule[1]);
			if (skok > maxSkok) maxSkok = skok;
			minule = ted;
		}
	}
	ok(maxSkok < 20, `${popis}: největší skok mezi snímky ${maxSkok.toFixed(2)} px (limit 20)`);
}

console.log('\n— přepálená žárovka: proud jde jen druhou větví —');
nastav(20, 60);
klik('zap-rezim-paralel');
klik('zap-prepal');
{
	const s = svg.__stavKulicek();
	ok(s.podilV1 === 0, 'po přepálení Ž1 nejde do větve 1 ani jedna kulička');
	ok(s.rychlost > 0, 'druhou větví proud teče dál (kuličky se pohybují)');
}
klik('zap-rezim-serie');
{
	const s = svg.__stavKulicek();
	ok(s.rychlost === 0, 'sériově s přepálenou žárovkou se kuličky zastaví (obvod je přerušený)');
}
klik('zap-prepal'); // vrátit zpět

console.log('\n— text vysvětlí, co se s kuličkami děje —');
klik('zap-rezim-paralel');
nastav(20, 60);
ok(/nevzniká ani nemizí/.test(stav.textContent), 'text říká, že žádná kulička nevzniká ani nemizí');
ok(/3 : 1|poměr/.test(stav.textContent), `text uvádí poměr: „${stav.textContent.slice(-120)}"`);
nastav(20, 20);
ok(/ob jednu/.test(stav.textContent), 'při stejných odporech text zmiňuje střídání ob jednu');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

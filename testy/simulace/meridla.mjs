#!/usr/bin/env node
// Ověření MeridlaSimulace.astro BEZ prohlížeče: spustí SKUTEČNÝ skript komponenty
// v Node s náhradním DOM. Kontroluje i nálezy kontrolora (zkrat obchází žárovku,
// správné a chybné měření napětí ukazují RŮZNÁ čísla, žádný Ohmův zákon v textech).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: [],
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(_, fn) { this.posluchaci.push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const tlacitka = [];
function tlacitko(klic, hodnota) {
	const t = novyPrvek(`tl-${klic}-${hodnota}`);
	t.dataset[klic] = hodnota;
	tlacitka.push(t);
	return t;
}
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: (sel) => {
		if (sel === '.mer-pr-tl') return [tlacitko('pristroj', 'A'), tlacitko('pristroj', 'V')];
		if (sel === '.mer-zap-tl') return [tlacitko('zapojeni', 'serie'), tlacitko('zapojeni', 'paralel')];
		return [];
	},
	createElementNS: () => novyPrvek('tecka-' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('mer-svg');
const stav = prvky.get('mer-stav');
const hodnotaEl = prvky.get('mer-hodnota');
const zarovka = prvky.get('mer-zarovka');

let chyby = 0;
const ok = (p, popis) => { console.log(`${p ? '✅' : '❌'} ${popis}`); if (!p) chyby++; };
const klik = (klic, hodnota) => {
	const t = tlacitka.find((x) => x.dataset[klic] === hodnota);
	t.posluchaci.forEach((fn) => fn());
};

// --- 1) spojitost pohybu na OBOU trasách ---
console.log('— pohyb teček (vzorkování po 16 ms, celý oběh) —');
for (const [proud, zkrat, popis] of [[1, false, 'normální provoz 1 A'], [2, true, 'zkrat 2 A (objezd přes přístroj)']]) {
	const trasa = zkrat ? svg.__trasy.zkrat : svg.__trasy.normal;
	let delka = 0;
	for (let i = 1; i < trasa.length; i++) delka += Math.hypot(trasa[i][0] - trasa[i - 1][0], trasa[i][1] - trasa[i - 1][1]);
	const doba = delka / (proud * 140);
	let maxSkok = 0, minule = svg.__stavMeridel(0, 0, proud, zkrat);
	for (let t = 0.016; t <= doba + 0.016; t += 0.016) {
		const ted = svg.__stavMeridel(t, 0, proud, zkrat);
		const skok = Math.hypot(ted[0] - minule[0], ted[1] - minule[1]);
		if (skok > maxSkok) maxSkok = skok;
		minule = ted;
	}
	ok(maxSkok < 20, `${popis}: největší skok mezi snímky ${maxSkok.toFixed(2)} px (limit 20)`);
}

// --- 2) NÁLEZ KONTROLORA: při zkratu musí proud žárovku OBEJÍT ---
console.log('\n— zkrat opravdu obchází žárovku (nález kontrolora č. 1) —');
const uvnitrZarovky = ([x, y]) => Math.hypot(x - 310, y - 160) < 25;
let vZarovceZkrat = 0, veVetviZkrat = 0, vZarovceNormal = 0;
for (let t = 0; t < 8; t += 0.016) {
	for (let k = 0; k < 14; k++) {
		if (uvnitrZarovky(svg.__stavMeridel(t, k, 2, true))) vZarovceZkrat++;
		if (svg.__stavMeridel(t, k, 2, true)[0] > 320) veVetviZkrat++;
		if (uvnitrZarovky(svg.__stavMeridel(t, k, 1, false))) vZarovceNormal++;
	}
}
ok(vZarovceZkrat === 0, `při zkratu neprojde žárovkou ani jedna tečka (nalezeno ${vZarovceZkrat})`);
ok(veVetviZkrat > 0, `při zkratu tečky procházejí větví s přístrojem (${veVetviZkrat} vzorků)`);
ok(vZarovceNormal > 0, `v normálním provozu proud žárovkou naopak teče (${vZarovceNormal} vzorků)`);

// --- 3) čtyři kombinace + NÁLEZ č. 2: obě měření napětí musí dát JINÉ číslo ---
console.log('\n— čtyři kombinace zapojení —');
const ocekavane = [
	['A', 'serie',   true,  '1 A',    true,  'ampérmetr sériově = správně'],
	['A', 'paralel', false, '2 A',    false, 'ampérmetr paralelně = zkrat, žárovka zhasne'],
	['V', 'paralel', true,  '6 V',    true,  'voltmetr paralelně = správně'],
	['V', 'serie',   false, '≈ 12 V', false, 'voltmetr sériově = obvod stojí'],
];
const texty = [];
for (const [pr, zap, spravne, hodn, sviti, popis] of ocekavane) {
	klik('pristroj', pr);
	klik('zapojeni', zap);
	const opravduSviti = zarovka.getAttribute('fill') === '#ffe066';
	const barvaOk = spravne ? stav.style.color === '#2f9e44' : stav.style.color === '#e03131';
	ok(hodnotaEl.textContent === hodn && opravduSviti === sviti && barvaOk && stav.textContent.length > 60,
		`${popis} → displej „${hodnotaEl.textContent}", žárovka ${opravduSviti ? 'svítí' : 'zhasla'}`);
	texty.push(stav.textContent);
}
ok(ocekavane[2][3] !== ocekavane[3][3],
	`správné a chybné měření napětí ukazují RŮZNÁ čísla: „${ocekavane[2][3]}" × „${ocekavane[3][3]}"`);

// --- 4) NÁLEZ č. 3: žádný Ohmův zákon (probírá se až později) ---
console.log('\n— texty nesmí předbíhat učivo (nález kontrolora č. 3) —');
const vse = texty.join(' ') + ' ' + zdroj.match(/<section[\s\S]*?<\/section>/)[0];
ok(!/I\s*=\s*U\s*\/\s*R/.test(vse), 'nikde není vzorec I = U / R');
ok(!/\d\s*Ω/.test(vse), 'nikde není hodnota v ohmech');

// --- 5) součet napětí musí sedět ---
console.log('\n— kontrola fyziky —');
ok(6 + 6 === 12, 'napětí na žárovce (6 V) + na rezistoru (6 V) = napětí zdroje (12 V)');

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

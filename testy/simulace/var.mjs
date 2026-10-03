#!/usr/bin/env node
// Ověření VarSimulace.astro — graf teploty vody při ohřevu s vodorovným úsekem
// při varu, bubliny páry v celém objemu a tři tlaky z výkladu.
//
// Nejtišeji by tu lhalo plató: kdyby teplota během varu byť trochu rostla,
// scéna by učila opak výkladu („při varu čisté látky za stálého tlaku se
// teplota nemění") — a graf by vypadal skoro stejně. Proto se vodorovnost
// měří i na SOUŘADNICÍCH bodů křivky. Teploty varu se porovnávají s čísly
// opsanými z výkladu (80 / 100 / 130), ne s konstantami komponenty.
//
// Druhá tichá lež (kontrola 3. 10. 2026): výklad ani PDF nemají rychlost
// ohřevu ani čísla na časové ose. Test proto hlídá, že žák nikde neuvidí
// minuty ani „°C za …", a že pokles hladiny při varu sedí s vnitřním modelem
// energeticky (c · ΔT / l_v), ne libovolně.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
// Dvě scény (oprava rozvržení 3. 10. 2026): graf a hrnec s počitadlem.
const sceny = [...zdroj.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0]);
const svgZdroj = sceny.join('\n');
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

const svg = prvky.get('var-svg');
const stav = svg.__stav;
const bubliny = svg.__bubliny;
const xCasu = svg.__xCasu;
const yTeploty = svg.__yTeploty;
const casSlider = prvky.get('var-cas');
const tlakSlider = prvky.get('var-tlak');
const krivka = () => prvky.get('var-krivka').innerHTML;
const hrnec = () => prvky.get('var-hrnec').innerHTML;
const pocty = () => prvky.get('var-pocty').innerHTML;
const hlaska = () => prvky.get('var-stav').textContent;
const vypocet = () => prvky.get('var-vypocet').innerHTML;
const mobil = () => prvky.get('var-mobil').textContent;
const outCas = () => prvky.get('var-out-cas').textContent;
const outTlak = () => prvky.get('var-out-tlak').textContent;

// Výchozí stav se čte HNED po načtení — dřív, než ho test přepne.
const vychozi = { pocty: pocty(), hrnec: hrnec(), hlaska: hlaska() };

// Rozsahy posuvníků se čtou ZE ZDROJE.
const MAX_CAS = +/id="var-cas"[^>]*max="(\d+)"/.exec(zdroj)[1];
const MAX_TLAK = +/id="var-tlak"[^>]*max="(\d+)"/.exec(zdroj)[1];
const CASY = [];
for (let c = 0; c <= MAX_CAS; c++) CASY.push(c);
const TLAKY = [];
for (let t = 0; t <= MAX_TLAK; t++) TLAKY.push(t);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (cas, tlak) => {
	casSlider.value = String(cas); tlakSlider.value = String(tlak);
	for (const f of casSlider.posluchaci.input) f();
};

// Opora ve výkladu (temata.ts, blok var): hory „kolem 80 °C", běžný tlak
// „přibližně 100 °C", tlakový hrnec „při 300 kPa … přes 130 °C"; graf od 20 °C.
const VYKLAD_TV = [80, 100, 130];
const VYKLAD_SLOVY = ['kolem 80 °C', 'přibližně 100 °C', 'přes 130 °C'];
const VYKLAD_START = 20;
const VYKLAD_LV = 2260000; // J/kg, výklad: „přibližně 2 260 000 J/kg"
const C_VODY = 4180;       // J/(kg·°C) — jen pro kontrolu modelu, žákovi se neukazuje

console.log('— úseky děje leží tam, kde se dají změřit —');
{
	let rozumne = true, kde = '';
	for (const tl of TLAKY) {
		const z = stav(0, tl).zacatekVaru;
		if (!(Number.isInteger(z) && z > 0 && z <= MAX_CAS - 4)) { rozumne = false; kde ||= `tlak ${tl}: začátek varu ${z}`; }
	}
	ok(rozumne, `var začíná v celém kroku a do konce pokusu vře aspoň 4 kroky${kde ? ` (${kde})` : ''}`);
	if (!rozumne) { console.log('\n❌ Var: nesmyslné hranice úseků.'); process.exit(1); }
	ok(MAX_TLAK === 2 && TLAKY.length === VYKLAD_TV.length, `posuvník tlaku má právě ${VYKLAD_TV.length} polohy jako výklad (hory, běžný tlak, tlakový hrnec)`);
	ok(+hodnotaZHtml('var-tlak') === 1, 'výchozí poloha je běžný atmosférický tlak');
	ok(+hodnotaZHtml('var-cas') === 0, 'a pokus začíná na začátku časové osy');
}

console.log('\n— čísla mají oporu ve výkladu —');
{
	for (const tl of TLAKY) {
		ok(stav(MAX_CAS, tl).teplota === VYKLAD_TV[tl], `poloha ${tl}: voda vře při ${stav(MAX_CAS, tl).teplota} °C (výklad ${VYKLAD_TV[tl]} °C)`);
		ok(stav(0, tl).teplota === VYKLAD_START, `a začíná při ${stav(0, tl).teplota} °C jako graf ve výkladu`);
	}
}

console.log('\n— čas bez čísel: výklad nemá rychlost ohřevu ani časovou stupnici —');
{
	const osaCas = /<text id="var-osa-cas"[^>]*>([^<]*)</.exec(svgZdroj);
	ok(osaCas && osaCas[1].includes('čas zahřívání') && !/\d/.test(osaCas[1]), `časová osa je popsaná slovy bez čísel („${osaCas?.[1]}")`);
	const textySvg = [...svgZdroj.matchAll(/<text[^>]*>([^<]*)</g)].map((m) => m[1]);
	ok(textySvg.every((t) => !/minut/.test(t)), 'v pevné části scény není žádná minuta');
	let bezCasu = true, kde = '';
	const zakazane = /minut|°C za|za minutu|\btrvá\b|zbývá|sekund|hodin/;
	for (const tl of TLAKY) for (const c of CASY) {
		nastav(c, tl);
		for (const [jmeno, txt] of [['počitadlo', pocty()], ['graf', krivka()], ['hrnec', hrnec()], ['výpočet', vypocet()], ['hláška', hlaska()], ['mobil', mobil()], ['posuvník', outCas()]]) {
			if (zakazane.test(txt)) { bezCasu = false; kde ||= `${jmeno} (tlak ${tl}, krok ${c}): ${txt.match(zakazane)[0]}`; }
		}
	}
	ok(bezCasu, `žák nikde neuvidí dobu ani rychlost ohřevu${kde ? ` (${kde})` : ''}`);
	nastav(0, 1);
	ok(outCas() === 'začátek pokusu', `popisek posuvníku času na začátku: „${outCas()}"`);
	nastav(3, 1);
	ok(outCas() === 'voda se ohřívá', `během ohřevu: „${outCas()}"`);
	nastav(stav(0, 1).zacatekVaru, 1);
	ok(outCas() === 'voda právě začíná vřít', `v kroku začátku varu: „${outCas()}"`);
	nastav(MAX_CAS, 1);
	ok(outCas() === 'voda vře', `při varu: „${outCas()}"`);
}

console.log('\n— JÁDRO: při varu teplota stojí —');
{
	for (const tl of TLAKY) {
		const z = stav(0, tl).zacatekVaru;
		const behem = [];
		for (let c = z; c <= MAX_CAS; c++) behem.push(stav(c, tl).teplota);
		ok(new Set(behem).size === 1 && behem[0] === VYKLAD_TV[tl],
			`tlak ${tl}: od ${z}. kroku stojí teplota na ${behem[0]} °C (${behem.length} hodnot)`);
		let roste = true;
		for (let c = 1; c <= z; c++) if (stav(c, tl).teplota <= stav(c - 1, tl).teplota) roste = false;
		ok(roste, `tlak ${tl}: před varem teplota roste každý krok`);
		let faze = true;
		for (const c of CASY) if (stav(c, tl).faze !== (c < z ? 'ohriva' : 'vre')) faze = false;
		ok(faze, `tlak ${tl}: do ${z}. kroku se voda ohřívá, od něj vře`);
	}
	// plotýnka hřeje ve všech polohách stejně → stejná teplota ve stejném kroku
	let stejne = true;
	for (const c of CASY) {
		const t = TLAKY.filter((tl) => c < stav(0, tl).zacatekVaru).map((tl) => stav(c, tl).teplota);
		if (new Set(t).size > 1) stejne = false;
	}
	ok(stejne, 'dokud voda nevře, ohřívá se ve všech polohách stejně rychle (stejná plotýnka)');
	let rovnomerne = true;
	const krok = stav(1, 1).teplota - stav(0, 1).teplota;
	for (let c = 1; c < stav(0, 1).zacatekVaru; c++) if (stav(c, 1).teplota - stav(c - 1, 1).teplota !== krok) rovnomerne = false;
	ok(rovnomerne && krok === 10, `stálý příkon: teplota roste rovnoměrně (o ${krok} °C za krok, model se žákovi neukazuje)`);
	const zacatky = TLAKY.map((tl) => stav(0, tl).zacatekVaru);
	ok(zacatky[0] < zacatky[1] && zacatky[1] < zacatky[2], `čím vyšší tlak, tím později voda začne vřít (${zacatky.join(' → ')}. krok)`);
	let cela = true;
	for (const tl of TLAKY) for (const c of CASY) {
		const s = stav(c, tl);
		if (![s.teplota, s.vyska, s.kroku].every(Number.isInteger)) cela = false;
	}
	ok(cela, 'všechna čísla (teplota, hladina, kroky varu) jsou celá');
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const bodyKrivky = () => (/<polyline points="([^"]*)"/.exec(krivka())?.[1] ?? '')
	.split(' ').filter(Boolean).map((b) => b.split(',').map(Number));

console.log('\n— graf ukazuje totéž co model —');
{
	nastav(MAX_CAS, 1);
	const b = bodyKrivky();
	ok(b.length === MAX_CAS + 1, `křivka má bod za každý krok (${b.length})`);
	let sedi = true;
	for (let c = 0; c <= MAX_CAS; c++) if (b[c][0] !== xCasu(c) || b[c][1] !== yTeploty(stav(c, 1).teplota)) sedi = false;
	ok(sedi, 'každý bod leží tam, kam patří podle teploty');
	const yPlato = [];
	for (const tl of TLAKY) {
		nastav(MAX_CAS, tl);
		const bs = bodyKrivky();
		const z = stav(0, tl).zacatekVaru;
		const y = bs.slice(z).map((p) => p[1]);
		ok(new Set(y).size === 1, `tlak ${tl}: úsek varu je v grafu vodorovný (y = ${y[0]})`);
		yPlato.push(y[0]);
		ok(krivka().includes('var — teplota stojí'), 'a je popsaný „var — teplota stojí"');
		const zvyr = new RegExp(`<line x1="${xCasu(z)}" y1="${y[0]}" x2="${xCasu(MAX_CAS)}" y2="${y[0]}" stroke="#ffc078" stroke-width="14"`).exec(krivka());
		ok(zvyr && krivka().indexOf(zvyr[0]) < krivka().indexOf('<polyline'), 'zvýrazněný pás úseku varu leží přesně pod ním a POD modrou čarou (barvy se nemíchají)');
		const cara = /<line x1="62" y1="(\d+)" x2="392" y2="(\d+)" stroke="#c2410c"[^>]*stroke-dasharray/.exec(krivka());
		ok(cara && +cara[1] === y[0] && +cara[2] === y[0], `přerušovaná čára teploty varu leží ve výšce úseku varu (y=${cara?.[1]})`);
		const popisek = /<text x="(\d+)" y="(\d+)" text-anchor="end"[^>]*>var — teplota stojí</.exec(krivka());
		ok(popisek && +popisek[2] < y[0] && +popisek[2] > y[0] - 20 && +popisek[1] <= 392, `popisek „var — teplota stojí" leží těsně nad úsekem a nevyčnívá z grafu (y=${popisek?.[2]})`);
	}
	ok(yPlato[0] > yPlato[1] && yPlato[1] > yPlato[2], `vyšší tlak → úsek varu výš v grafu (y = ${yPlato.join(' → ')})`);
	ok(!/stroke="#868e96"[^>]*stroke-dasharray|stroke-dasharray="5 4"/.test(krivka()), 'čára teploty varu nevypadá jako šipka páry (jiná barva i čárkování)');
	nastav(2, 1);
	ok(bodyKrivky().length === 3, 've 2. kroku jsou nakreslené tři body — graf roste postupně');
	ok(krivka().includes('<circle') && !krivka().includes('teplota stojí') && !krivka().includes('#ffc078'), 'poslední bod je zvýrazněný a úsek varu ještě popsaný ani zvýrazněný není');
	ok(krivka().includes('ohřívání vody'), 'stoupající úsek je popsaný „ohřívání vody"');
	nastav(1, 1);
	ok(!krivka().includes('ohřívání vody'), 'v 1. kroku by popisek ležel přes křivku — ještě se nekreslí');
	nastav(stav(0, 1).zacatekVaru, 1);
	ok(!krivka().includes('teplota stojí') && !krivka().includes('#ffc078'), 'v kroku, kdy var teprve začíná, ještě žádný vodorovný úsek (ani jeho zvýraznění) není');
}

console.log('\n— měřítko grafu sedí s popsanými osami —');
{
	const osaT = /<g id="var-osa-teplota"[\s\S]*?<\/g>/.exec(zdroj)[0];
	const popisky = [...osaT.matchAll(/<text x="\d+" y="(\d+)">(\d+)<\/text>/g)];
	let sedi = true, kde = '';
	for (const m of popisky) if (yTeploty(+m[2]) + 7 !== +m[1]) { sedi = false; kde ||= `${m[2]} °C: y=${m[1]}`; }
	ok(popisky.length === 7 && sedi, `${popisky.length} popisků teploty sedí s měřítkem${kde ? ` (${kde})` : ''}`);
	ok(svgZdroj.includes('teplota (°C)'), 'osa teploty nese jednotku °C');
	ok(popisky.some((m) => +m[2] >= 130), 'stupnice sahá i nad 130 °C — tlakový hrnec se do grafu vejde');
	ok(xCasu(0) > 62 && xCasu(MAX_CAS) <= 392, `graf leží mezi osami (x ${xCasu(0)}–${xCasu(MAX_CAS)})`);
	ok(yTeploty(0) === 316 && yTeploty(VYKLAD_TV[2]) >= 30, `0 °C leží na ose času a 130 °C pod horním okrajem (y=${yTeploty(130)})`);
}

const kruhy = () => [...hrnec().matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="#e7f5ff"/g)]
	.map((m) => ({ x: +m[1], y: +m[2], r: +m[3] }));
const voda = () => {
	const m = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="#74c0fc"/.exec(hrnec());
	return m ? { x: +m[1], y: +m[2], w: +m[3], h: +m[4] } : null;
};

console.log('\n— bubliny páry: jen při varu a v celém objemu —');
{
	for (const tl of TLAKY) {
		const z = stav(0, tl).zacatekVaru;
		let pred = true;
		for (let c = 0; c < z; c++) { nastav(c, tl); if (kruhy().length !== 0) pred = false; }
		ok(pred, `tlak ${tl}: dokud voda nevře, žádné bubliny páry`);
		let vsude = true, uvnitr = true, kde = '';
		for (let c = z; c <= MAX_CAS; c++) {
			nastav(c, tl);
			const k = kruhy(), v = voda();
			if (k.length < 12) { vsude = false; kde ||= `${c}. krok: jen ${k.length}`; }
			const tretina = v.h / 3;
			const dole = k.filter((b) => b.y > v.y + 2 * tretina).length;
			const stred = k.filter((b) => b.y > v.y + tretina && b.y <= v.y + 2 * tretina).length;
			const nahore = k.filter((b) => b.y <= v.y + tretina).length;
			if (!(dole && stred && nahore)) { vsude = false; kde ||= `${c}. krok: ${dole}/${stred}/${nahore}`; }
			for (const b of k) {
				if (b.y - b.r <= v.y || b.y + b.r >= v.y + v.h || b.x - b.r <= v.x || b.x + b.r >= v.x + v.w) { uvnitr = false; kde ||= `${c}. krok: bublina ${b.x},${b.y}`; }
			}
		}
		ok(vsude, `tlak ${tl}: při varu jsou bubliny dole, uprostřed i nahoře — v celém objemu${kde ? ` (${kde})` : ''}`);
		ok(uvnitr, `tlak ${tl}: každá bublina leží celá pod hladinou uvnitř hrnce`);
	}
	nastav(12, 1);
	const k = kruhy(), v = voda();
	const sloupce = [...new Set(k.map((b) => b.x))].sort((a, b) => a - b);
	ok(k.length === 18 && sloupce.length === 6 && sloupce[0] < v.x + 20 && sloupce[5] > v.x + v.w - 20,
		`18 bublin v 6 sloupcích po celé šířce vody (x ${sloupce[0]}–${sloupce[5]}, voda ${v.x}–${v.x + v.w})`);
	const prumer = (a) => a.reduce((s, b) => s + b.r, 0) / a.length;
	const horni = k.filter((b) => b.y < v.y + v.h / 2), dolni = k.filter((b) => b.y >= v.y + v.h / 2);
	ok(prumer(horni) > prumer(dolni), `u hladiny jsou bubliny větší než u dna (${prumer(horni).toFixed(1)} > ${prumer(dolni).toFixed(1)})`);
	const pozice = (c) => { nastav(c, 1); return kruhy().map((b) => `${b.x},${b.y}`).join(' '); };
	ok(pozice(10) !== pozice(11), 'bubliny se krok od kroku posouvají — stoupají');
	let prekryv = false;
	for (const tl of TLAKY) for (let c = stav(0, tl).zacatekVaru; c <= MAX_CAS; c++) {
		const bs = bubliny(stav(c, tl).vyska, stav(c, tl).kroku);
		for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
			if (Math.hypot(bs[i].x - bs[j].x, bs[i].y - bs[j].y) < bs[i].r + bs[j].r) prekryv = true;
		}
	}
	ok(!prekryv, 'bubliny se navzájem nepřekrývají');
	let celaB = true;
	for (const b of bubliny(108, 3)) if (![b.x, b.y, b.r].every(Number.isInteger)) celaB = false;
	ok(celaB, 'souřadnice bublin jsou celá čísla');
	// velikost bubliny podle výšky nad dnem: u dna nejmenší (r = 3), u hladiny nejvýš r = 8
	let velikost = true, kdeR = '';
	for (const m of [0, 3, 7]) for (const b of bubliny(108, m)) {
		const nad = svg.__DNO - 6 - b.y;
		if (b.r !== 3 + Math.round((5 * nad) / 108)) { velikost = false; kdeR ||= `y=${b.y} r=${b.r}`; }
	}
	ok(velikost && Math.min(...bubliny(108, 0).map((b) => b.r)) === 3, `bubliny rostou od r = 3 u dna k r ≤ 8 u hladiny${kdeR ? ` (${kdeR})` : ''}`);
}

console.log('\n— voda se varem mění v páru: hladina klesá v souladu s modelem —');
{
	for (const tl of TLAKY) {
		const z = stav(0, tl).zacatekVaru;
		const vysky = CASY.map((c) => { nastav(c, tl); return voda(); });
		ok(vysky.every((v) => v.y + v.h === svg.__DNO), `tlak ${tl}: voda vždy sahá až na dno hrnce`);
		ok(vysky.slice(0, z + 1).every((v) => v.h === vysky[0].h), `tlak ${tl}: dokud voda nevře, hladina stojí (${vysky[0].h} px)`);
		let klesa = true;
		for (let c = z + 1; c <= MAX_CAS; c++) if (vysky[c].h >= vysky[c - 1].h) klesa = false;
		ok(klesa, `tlak ${tl}: při varu hladina každý krok klesne (${vysky[z].h} → ${vysky[MAX_CAS].h} px)`);
		ok(vysky[MAX_CAS].h >= 60, `tlak ${tl}: voda se nevyvaří celá (zbývá ${vysky[MAX_CAS].h} px)`);
	}
	// Energie: za jeden krok dodá plotýnka teplo m·c·ΔT (ΔT = ohřev za krok).
	// Stejné teplo při varu vyvaří podíl c·ΔT/l_v vody → tolik má ubýt hladiny.
	const dT = stav(1, 1).teplota - stav(0, 1).teplota;
	const z1 = stav(0, 1).zacatekVaru;
	const pokles = stav(z1, 1).vyska - stav(z1 + 1, 1).vyska;
	const podil = pokles / stav(0, 1).vyska;
	const ocekavany = (C_VODY * dT) / VYKLAD_LV;
	ok(Math.abs(podil - ocekavany) / ocekavany < 0.05,
		`úbytek ${pokles} px z ${stav(0, 1).vyska} px za krok (${(podil * 100).toFixed(2)} %) sedí s c·ΔT/l_v = ${(ocekavany * 100).toFixed(2)} % (±5 %)`);
	let stejnyPokles = true;
	for (const tl of TLAKY) {
		const z = stav(0, tl).zacatekVaru;
		for (let c = z + 1; c <= MAX_CAS; c++) if (stav(c - 1, tl).vyska - stav(c, tl).vyska !== pokles) stejnyPokles = false;
	}
	ok(stejnyPokles, 'každý krok varu ubude stejně vody (plotýnka hřeje stejně)');
	nastav(0, 1);
	ok(voda().h === 108 && voda().y === 550, `na začátku stojí hladina ve výšce y=${voda().y} (108 px vody)`);
}

console.log('\n— pára, poklice a hory jen tam, kam patří —');
{
	nastav(0, 1);
	ok(!hrnec().includes('pára uniká'), 'dokud voda nevře, o páře se nepíše');
	nastav(MAX_CAS, 1);
	ok(hrnec().includes('pára uniká (není vidět)'), 'při varu: „pára uniká (není vidět)"');
	ok((hrnec().match(/stroke-dasharray="5 4"/g) || []).length === 3, 'z otevřeného hrnce stoupají tři čárkované šipky páry');
	const poklice = () => /<rect x="(\d+)" y="478" width="(\d+)" height="14"[^>]*fill="([^"]+)" stroke="#343a40"/.exec(hrnec());
	ok(!poklice(), 'běžný hrnec nemá poklici');
	const startyPary = () => [...hrnec().matchAll(/<path d="M(\d+) (\d+) C[^"]*" fill="none" stroke="#868e96"/g)].map((m) => +m[2]);
	ok(startyPary().length === 3 && startyPary().every((y) => y === voda().y - 8), `pára z otevřeného hrnce vychází těsně nad hladinou (y=${startyPary()[0]}, hladina ${voda().y})`);
	nastav(MAX_CAS, 0);
	ok(startyPary().every((y) => y === voda().y - 8), 'i v horách, kde hladina klesla níž');
	nastav(MAX_CAS, 2);
	ok(startyPary().length === 1 && startyPary()[0] === 458, `v tlakovém hrnci vychází pára až nad poklicí (y=${startyPary()[0]}, knoflík poklice začíná na 462)`);
	ok(poklice(), 'tlakový hrnec má zavřenou poklici');
	const barvaPary = /stroke="(#[0-9a-f]{6})" stroke-width="3" stroke-dasharray="5 4"/.exec(hrnec())?.[1];
	ok(poklice() && barvaPary && poklice()[3] !== barvaPary && poklice()[3] === 'url(#var-kov)',
		`poklice je kovová (${poklice()?.[3]}), ne šedá jako pára (${barvaPary}) — jeden tvar/barva, jeden význam`);
	ok(poklice() && +poklice()[1] <= 108 && +poklice()[1] + +poklice()[2] >= 292, 'poklice přikrývá celé tělo hrnce (x 108–292)');
	ok((hrnec().match(/stroke-dasharray="5 4"/g) || []).length === 1, 'a pára uniká jen jednou cestou z poklice');
	nastav(0, 2);
	ok(poklice(), 'poklice je zavřená i před varem');
	nastav(0, 0);
	ok(hrnec().includes('fill="#adb5bd" stroke="#495057"'), 'poloha hory: u nadpisu je značka hor');
	nastav(0, 1);
	ok(!hrnec().includes('fill="#adb5bd" stroke="#495057"'), 'běžný tlak: značka hor tam není');
	for (const tl of TLAKY) {
		nastav(0, tl);
		ok(hrnec().includes('plotýnka hřeje pořád stejně') && hrnec().includes('fill="#e03131"'), `tlak ${tl}: hrnec stojí na rozpálené plotýnce`);
	}
	ok((hrnec().match(/C \d+ \d+, \d+ \d+, \d+ \d+" fill="none" stroke="#495057"/g) || []).length === 2, 'hrnec má dvě oblá uška (podle předlohy PDF s. 4)');
	// lesklý nerez (předloha PDF s. 4, kontrola 2 N4): tělo vyplněné přechodem světla
	const kov = /<linearGradient id="var-kov"[\s\S]*?<\/linearGradient>/.exec(svgZdroj)?.[0] ?? '';
	const barvyKovu = [...kov.matchAll(/stop-color="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
	const jas = (h) => parseInt(h.slice(1, 3), 16) + parseInt(h.slice(3, 5), 16) + parseInt(h.slice(5, 7), 16);
	ok(barvyKovu.length >= 3 && Math.max(...barvyKovu.map(jas)) - Math.min(...barvyKovu.map(jas)) >= 300,
		`kov má přechod světla od lesku po stín (${barvyKovu.length} zastávek)`);
	const telo = /<path d="M(\d+) 496 V\d+ Q[^"]*Z" fill="url\(#var-kov\)"/.exec(hrnec());
	ok(telo && +telo[1] < 121, 'tělo hrnce je vyplněné kovem a jeho stěna je vidět vedle vody');
	ok(telo && hrnec().indexOf(telo[0]) < hrnec().indexOf('fill="#74c0fc"'), 'tělo hrnce leží POD vodou (voda v řezu zůstane vidět)');
	const odraz = /<ellipse [^>]*cy="674"[^>]*opacity="([\d.]+)"/.exec(hrnec());
	ok(/<line [^>]*y1="495"[^>]*stroke="#f8f9fa"/.test(hrnec()) && odraz && +odraz[1] >= 0.2 && +odraz[1] <= 0.7,
		`lem má odlesk a deska pod hrncem slabý lesklý odraz (průhlednost ${odraz?.[1]})`);
	const titul = TLAKY.map((tl) => { nastav(0, tl); return /<text x="200" y="380"[^>]*>([^<]*)</.exec(hrnec())[1]; });
	ok(titul[0].includes('hor') && titul[1] === 'doma' && titul[2].includes('tlakový'), `nadpisy scény odpovídají na „kde vaříme": ${titul.join(' / ')}`);
}

console.log('\n— počitadlo, hlášky a výpočet říkají totéž co model —');
{
	ok(vychozi.pocty.includes('teplota: 20 °C') && vychozi.pocty.includes('voda se ohřívá'), 'výchozí počitadlo: 20 °C, voda se ohřívá');
	ok(vychozi.pocty.includes('přibližně 100 °C'), 'výchozí: teplota varu přibližně 100 °C');
	ok(vychozi.hlaska.includes('ještě nevře'), 'výchozí hláška: voda ještě nevře');
	for (const tl of TLAKY) for (const c of [0, 3, stav(0, tl).zacatekVaru, MAX_CAS]) {
		nastav(c, tl);
		const s = stav(c, tl);
		const t = /teplota: (\d+) °C/.exec(pocty());
		ok(t && +t[1] === s.teplota, `tlak ${tl}, krok ${c} → počitadlo ${t?.[1]} °C (model ${s.teplota})`);
		const ocek = s.faze === 'ohriva' ? 'stav: voda se ohřívá' : s.kroku === 0 ? 'stav: voda právě začíná vřít' : 'stav: voda vře — teplota stojí';
		ok(pocty().includes(ocek), `  a správný stav („${ocek}")`);
		ok(pocty().includes(`teplota varu: ${VYKLAD_SLOVY[tl]}`), `  a teplota varu slovy z výkladu: „${VYKLAD_SLOVY[tl]}"`);
		ok(mobil().includes(`Teplota: ${s.teplota} °C`) && mobil().includes(VYKLAD_SLOVY[tl]), '  a mobilní řádek pod scénou říká totéž');
		ok(vypocet().includes(`teploty varu (${VYKLAD_SLOVY[tl]})`) && vypocet().includes('roste') && vypocet().includes('stojí') && vypocet().includes('ubývá'),
			'  a vysvětlení pod scénou (roste → stojí, vody ubývá)');
	}
	nastav(MAX_CAS, 2);
	ok(pocty().includes('teplota varu: přes 130 °C') && pocty().includes('(graf ji zaokrouhluje na 130 °C)'), 'tlakový hrnec: počitadlo vysvětluje, proč graf ukazuje 130 °C');
	const ramecek = (tl) => { nastav(MAX_CAS, tl); return +/<rect x="10" y="(\d+)" width="380" height="(\d+)"/.exec(pocty())[2] + +/<rect x="10" y="(\d+)"/.exec(pocty())[1]; };
	const posledni = () => Math.max(...[...pocty().matchAll(/<text x="22" y="(\d+)"/g)].map((m) => +m[1]));
	ok(ramecek(2) > posledni() + 4 && ramecek(2) <= 840, `rámeček počitadla obejme i čtvrtý řádek (dno ${ramecek(2)}, poslední řádek ${posledni()})`);
	ok(ramecek(1) > posledni() + 4, `i u běžného tlaku (dno ${ramecek(1)}, poslední řádek ${posledni()})`);
	nastav(MAX_CAS, 2);
	const barvaVaru = /stroke="(#[0-9a-f]{6})" stroke-width="2" stroke-dasharray="3 6"/.exec(krivka())?.[1];
	const barvyPocitadla = [...pocty().matchAll(/fill="(#[0-9a-f]{6})">(?:teplota varu|\(graf)/g)].map((m) => m[1]);
	ok(barvaVaru && barvyPocitadla.length === 2 && barvyPocitadla.every((b) => b === barvaVaru),
		`teplota varu má v grafu i v počitadle stejnou barvu (${barvaVaru} / ${barvyPocitadla.join(', ')})`);
	nastav(MAX_CAS, 1);
	ok(!pocty().includes('zaokrouhluje'), 'u běžného tlaku poznámka o zaokrouhlení není');
	nastav(5, 1);
	ok(hlaska().includes('ještě nevře') && !hlaska().includes('bubliny'), 'před varem hláška o bublinách mlčí');
	nastav(8, 1);
	ok(hlaska().includes('začíná vřít') && !pocty().includes('vře 0'), 'v kroku začátku varu: „začíná vřít" (ne „vře 0 …")');
	nastav(10, 1);
	ok(hlaska().includes('v celém objemu') && hlaska().includes('nemění (100 °C)') && hlaska().includes('přeměnu vody v páru'),
		'při varu: bubliny v celém objemu, teplota se nemění, teplo jde na přeměnu v páru');
	nastav(MAX_CAS, 0);
	ok(hlaska().includes('kolem 80 °C') && hlaska().includes('pomaleji') && hlaska().includes('nemění (80 °C)'), 'hory: kolem 80 °C, jídlo pomaleji');
	nastav(MAX_CAS, 2);
	ok(hlaska().includes('300 kPa') && hlaska().includes('přes 130 °C') && hlaska().includes('zaokrouhleno na 130 °C') && hlaska().includes('rychleji'),
		'tlakový hrnec: 300 kPa, přes 130 °C (v grafu zaokrouhleno), rychleji');
	nastav(0, 1);
	ok(hlaska().includes('přibližně při 100 °C'), 'běžný tlak: přibližně při 100 °C');
	ok(outTlak() === 'doma (běžný atmosférický tlak)', `popisek posuvníku „Kde vaříme": ${outTlak()}`);
}

console.log('\n— nadpis je věcně správný —');
{
	const nadpis = /<h2>[\s\S]*?<\/h2>/.exec(zdroj)[0];
	ok(!/přestane hřát/.test(nadpis) && /teplota/.test(nadpis), 'nadpis se ptá na teplotu vody, ne na to, kdy „voda přestane hřát"');
}

console.log('\n— rozvržení: graf s posuvníkem času vidět najednou, hrnec vedle/pod ním —');
{
	// Kontrola 2 (N1): posuvník ležel pod scénou 400×840, dítě při posouvání
	// času nevidělo graf. Teď: scéna grafu nízká, posuvníky HNED pod ní,
	// hrnec je druhá scéna; na širokém okně stojí vedle grafu.
	ok(sceny.length === 2, `dvě scény: graf a hrnec (${sceny.length})`);
	const vbG = /viewBox="0 0 (\d+) (\d+)"/.exec(sceny[0]);
	const vbH = /id="var-hrnec-svg" viewBox="0 (\d+) (\d+) (\d+)"/.exec(sceny[1]);
	ok(/id="var-svg"/.test(sceny[0]) && vbG && vbH, 'první scéna je graf (var-svg), druhá hrnec (var-hrnec-svg)');
	const W = Math.max(+vbG[1], +vbH[2]), H0 = +vbH[1], H = +vbH[1] + +vbH[3];
	ok(+vbG[2] / +vbG[1] <= 0.9, `scéna grafu je nízká (${vbG[1]} × ${vbG[2]}) — na 375 px ~320 px, posuvník se vejde pod ni do okna`);
	ok(H0 >= 350 - 6 && H0 <= 350, `scéna hrnce začíná tam, kde končí graf (y ${H0})`);
	ok(W <= 420, `scény jsou úzké (šířka ${W}) — na telefonu 375 px se nezmenší víc než na ~0,8`);
	const iGraf = zdroj.indexOf('id="var-svg"'), iCas = zdroj.indexOf('id="var-cas"'), iTlak = zdroj.indexOf('id="var-tlak"'), iHrnec = zdroj.indexOf('id="var-hrnec-svg"');
	ok(iGraf < iCas && iCas < iTlak && iTlak < iHrnec, 'posuvníky leží hned pod grafem, před scénou hrnce');
	const levy = /<div class="var-levy">([\s\S]*?)<\/div>/.exec(zdroj)?.[1] ?? '';
	ok(levy.includes('id="var-svg"') && levy.includes('id="var-cas"') && !levy.includes('var-hrnec-svg'), 'graf a posuvník času jsou v jednom sloupci, hrnec mimo něj');
	const media = /@media \(min-width: (\d+)px\) \{\s*\.var-rozlozeni \{[^}]*grid-template-columns: 1fr 1fr/.exec(zdroj);
	ok(media && +media[1] >= 600 && +media[1] <= 900, `na širokém okně (od ${media?.[1]} px) stojí graf a hrnec vedle sebe`);
	const pisma = [...svgZdroj.matchAll(/font-size="(\d+)"/g), ...skript.matchAll(/font-size="(\d+)"/g)].map((m) => +m[1]);
	ok(pisma.length > 0 && Math.min(...pisma) >= 20, `všechna písma ve scéně mají aspoň 20 jednotek (nejmenší ${Math.min(...pisma)}) → na 375 px (měřítko ~0,64) ≥ 12 px`);
	let dobre = true, kde = '';
	for (const tl of TLAKY) for (const c of CASY) {
		nastav(c, tl);
		for (const m of pocty().matchAll(/<(?:text|rect)[^>]*y="(\d+)"/g)) if (+m[1] < 712 || +m[1] > H) { dobre = false; kde ||= `počitadlo y=${m[1]}`; }
		for (const m of pocty().matchAll(/<rect x="(\d+)" y="\d+" width="(\d+)"/g)) if (+m[1] + +m[2] > W) { dobre = false; kde ||= 'počitadlo přesahuje vpravo'; }
		for (const [x, y] of bodyKrivky()) if (x < 62 || x > 392 || y < 30 || y > 316) { dobre = false; kde ||= `bod ${x},${y}`; }
		for (const m of krivka().matchAll(/<text x="(\d+)" y="(\d+)"/g)) if (+m[1] < 62 || +m[1] > 392 || +m[2] < 30 || +m[2] > 316) { dobre = false; kde ||= `popisek ${m[1]},${m[2]}`; }
		for (const m of hrnec().matchAll(/<(?:text|rect|circle|ellipse)[^>]*?(?:\by|cy)="(\d+)"/g)) if (+m[1] < H0 || +m[1] > 712) { dobre = false; kde ||= `hrnec y=${m[1]}`; }
		for (const m of hrnec().matchAll(/points="([^"]*)"/g)) for (const p of m[1].split(' ')) { const [x, y] = p.split(',').map(Number); if (y < H0 || x > W) { dobre = false; kde ||= `hrnec bod ${p}`; } }
	}
	ok(dobre, `počitadlo dole, graf v osách, hrnec mezi grafem a počitadlem${kde ? ` (${kde})` : ''}`);
}

console.log(chyby === 0 ? '\n✅ Var: vše sedí.' : `\n❌ Var: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

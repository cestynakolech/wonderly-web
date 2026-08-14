#!/usr/bin/env node
// Ověření VnitrniEnergieSimulace.astro — vnitřní energie tělesa.
//
// Nejtišeji by tu lhalo právě to, co má scéna naučit: že vnitřní energii
// NEMĚNÍ pohyb tělesa jako celku. Kdyby se sloupec vnitřní energie při
// rozjetí kostky pohnul, učila by stránka pravý opak výkladu — a nikdo
// by si toho nevšiml, protože obě čísla přece „nějak" rostou.
//
// Druhá kotva je přeměna při tření: pohybová energie celku se musí ve
// vnitřní objevit BEZE ZBYTKU (n částic × 10 °C na jednotku).
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

const svg = prvky.get('vne-svg');
const stav = svg.__stav;
const energieCastice = svg.__energieCastice;
const ohratiTrenim = svg.__ohratiTrenim;
const RYCHLOSTI = svg.__RYCHLOSTI;
const MAX_T = svg.__MAX_T;
const teplota = prvky.get('vne-teplota');
const pocet = prvky.get('vne-castic');
const rychlost = prvky.get('vne-rychlost-slider');
const brzda = prvky.get('vne-brzda');

// Rozsahy VŠECH posuvníků se čtou ZE ZDROJE (min/max/step) — dokud tu byly
// opsané napevno, podvrh max="3" u rychlosti prošel (scéna hlásila NaN)
// a podvrh step="1" u částic taky. Test musí zkoušet stavy, které jsou
// v HTML skutečně dosažitelné, ne ty, které si zapamatoval.
const posuvnik = (id) => {
	const m = new RegExp(`id="${id}"[^>]*min="(-?\\d+)"[^>]*max="(-?\\d+)"[^>]*step="(\\d+)"`).exec(zdroj);
	return { min: +m[1], max: +m[2], step: +m[3] };
};
const rozsah = ({ min, max, step }) => {
	const r = [];
	for (let v = min; v <= max; v += step) r.push(v);
	return r;
};
const TEPLOTY = rozsah(posuvnik('vne-teplota'));
const POCTY = rozsah(posuvnik('vne-castic'));
const VIND = rozsah(posuvnik('vne-rychlost-slider'));   // dílky posuvníku rychlosti
const TMAX = TEPLOTY[TEPLOTY.length - 1];
const NMIN = POCTY[0], NMAX = POCTY[POCTY.length - 1];
const VMAX = VIND[VIND.length - 1];

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (t, n, vIndex) => {
	teplota.value = String(t); pocet.value = String(n); rychlost.value = String(vIndex);
	for (const f of teplota.posluchaci.input) f();
};
const klikni = () => { for (const f of brzda.posluchaci.click) f(); };

// NEZÁVISLÁ KOTVA celého testu: číslo −270 °C je napsané v textu pro žáka
// a jednotka modelu je 10 °C na 1 jednotku energie. Energii kostky si test
// počítá SÁM — E(t, n) = n · (t − (−270)) / 10 — a s tou komponentu srovnává.
const nulaText = /od (−|-)(\d+) °C/.exec(prvky.get('vne-vypocet').innerHTML);
const NULA = nulaText ? -nulaText[2] : NaN;
const E = (t, n) => (n * (t - NULA)) / 10;

console.log('— na čem vnitřní energie stojí —');
{
	ok(TEPLOTY.length > 1 && POCTY.length > 1, `scéna nabízí ${TEPLOTY.length} teplot a ${POCTY.length} velikostí kostky`);
	let rosteT = true;
	for (const n of POCTY) {
		for (let i = 1; i < TEPLOTY.length; i++) {
			if (stav(TEPLOTY[i], n, 0).vnitrni <= stav(TEPLOTY[i - 1], n, 0).vnitrni) rosteT = false;
		}
	}
	ok(rosteT, 'teplejší kostka má vždy větší vnitřní energii — částice se pohybují rychleji');
	let rosteN = true;
	for (const t of TEPLOTY) {
		for (let i = 1; i < POCTY.length; i++) {
			if (stav(t, POCTY[i], 0).vnitrni <= stav(t, POCTY[i - 1], 0).vnitrni) rosteN = false;
		}
	}
	ok(rosteN, 'a větší kostka taky — vnitřní energie je SOUČET energií všech částic');
	// KOTVA místo tautologie: dřív se tu porovnávalo stav().vnitrni s
	// n × energieCastice(t) — obě strany z komponenty, takže se NEMOHLY rozejít.
	// Teď se obojí srovnává s nezávislým přepočtem testu (E, kotva −270 °C).
	ok(NULA === -270, `text pro žáka počítá energii částic od ${NULA} °C`);
	let odNuly = true;
	for (const t of TEPLOTY) if (energieCastice(t) !== (t - NULA) / 10) odNuly = false;
	ok(odNuly, `energie částice = (teplota − (${NULA})) / 10 — nezávislý přepočet testu sedí (při 0 °C je to 27)`);
	let soucet = true;
	for (const t of TEPLOTY) for (const n of POCTY) {
		if (stav(t, n, 0).vnitrni !== E(t, n)) soucet = false;
	}
	ok(soucet, 'a vnitřní energie = počet částic × energie jedné částice (obojí přepočteno testem)');
	ok(energieCastice(0) > 0,
		`při 0 °C má částice ${energieCastice(0)} jednotek, ne nulu — částice se nikdy nezastaví`);
	let cela = true;
	for (const t of TEPLOTY) for (const n of POCTY) for (let i = 0; i < RYCHLOSTI.length; i++) {
		const s = stav(t, n, RYCHLOSTI[i]);
		if (![s.naCastici, s.vnitrni, s.pohybova].every(Number.isInteger)) cela = false;
	}
	ok(cela, 'a při každém nastavení vyjdou samá celá čísla');
}

console.log('\n— JÁDRO: pohyb celku vnitřní energií nehne —');
{
	let stejna = true, rozdil = null;
	for (const t of TEPLOTY) for (const n of POCTY) {
		const klid = stav(t, n, 0).vnitrni;
		for (const v of RYCHLOSTI) {
			if (stav(t, n, v).vnitrni !== klid) { stejna = false; rozdil ??= `${t} °C, ${n} částic, rychlost ${v}`; }
		}
	}
	ok(stejna, `vnitřní energie je stejná, ať kostka stojí nebo se veze${rozdil ? ` (rozešlo se u ${rozdil})` : ''}`);
	ok(stav(20, 10, 0).pohybova === 0, 'stojící kostka nemá žádnou pohybovou energii');
	const rada = RYCHLOSTI.map((v) => stav(20, 10, v).pohybova);
	let roste = true;
	for (let i = 1; i < rada.length; i++) if (rada[i] <= rada[i - 1]) roste = false;
	ok(roste, `pohybová energie celku s rychlostí roste: ${rada.join(' → ')} jednotek`);
	ok(stav(20, 20, 5).pohybova > stav(20, 5, 5).pohybova,
		`a při téže rychlosti ji má těžší kostka větší (${stav(20, 5, 5).pohybova} → ${stav(20, 20, 5).pohybova} jednotek)`);
}

console.log('\n— tření: energie se nikam neztratí —');
{
	// přírůstek vnitřní energie počítá test SÁM (E z kotvy −270): pohybová
	// energie komponenty musí sednout na nezávislý přepočet, ne sama na sebe
	let sedi = true, ukazka = '';
	for (const n of POCTY) for (const v of RYCHLOSTI) {
		const pred = stav(20, n, v);
		if (E(20 + ohratiTrenim(v), n) - E(20, n) !== pred.pohybova) sedi = false;
		if (v === 10 && n === 10) ukazka = `${pred.pohybova} jednotek → ohřátí o ${ohratiTrenim(v)} °C`;
	}
	ok(sedi, `pohybová energie se ve vnitřní objeví beze zbytku (${ukazka})`);
	ok(ohratiTrenim(0) === 0, 'stojící kostku tření neohřeje');
	ok(ohratiTrenim(10) > ohratiTrenim(5),
		`rychlejší kostka se zabrzděním ohřeje víc (${ohratiTrenim(5)} °C → ${ohratiTrenim(10)} °C)`);
	ok(TEPLOTY.every((t) => Number.isInteger(t + ohratiTrenim(10))), 'a teplota po zabrzdění zůstane celé číslo');
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const teleso = prvky.get('vne-teleso');
const sipkaV = prvky.get('vne-rychlost');
const sloupce = prvky.get('vne-sloupce');
const pocty = prvky.get('vne-pocty');
const cisla = (re, kde) => [...kde.innerHTML.matchAll(re)].map((m) => +m[1]);

console.log('\n— kostka ve scéně —');
{
	for (const n of POCTY) {
		nastav(60, n, 0);
		const kolecek = (teleso.innerHTML.match(/<circle/g) ?? []).length;
		ok(kolecek === n, `${n} částic v nastavení → ${kolecek} koleček ve scéně`);
	}
	nastav(60, NMAX, 0);
	const velka = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	nastav(60, NMIN, 0);
	const mala = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	ok(velka[4] > mala[4], `kostka s víc částicemi je vyšší (${mala[4]} → ${velka[4]} px)`);
	ok(velka[2] + velka[4] === 350 && mala[2] + mala[4] === 350,
		'obě stojí spodkem na podložce (y=350) — nevznášejí se ani nepadají do stolu');
	// kostka musí vypadat jako KOSTKA i při nejmenším počtu částic — dřív byla
	// při 5 částicích placka 290×72 px, tenká destička místo tělesa
	let hranata = true, kdeplacka = '';
	for (const n of POCTY) {
		nastav(60, n, 0);
		const r = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
		if (r[4] < 100 || r[3] / r[4] > 2) { hranata = false; kdeplacka ||= `${n} částic: ${r[3]}×${r[4]} px`; }
	}
	ok(hranata, `kostka není placka při žádné velikosti (výška ≥ 100 px, poměr stran ≤ 2)${kdeplacka ? ` — ${kdeplacka}` : ''}`);
	// řady částic jsou vodorovně vystředěné — i neúplná poslední řada sedí
	// uprostřed, jinak kostka vypadá nakousnutě
	let vystredene = true, kdeStred = '';
	for (const n of POCTY) {
		nastav(60, n, 0);
		const radky = new Map();
		for (const m of teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)) {
			if (!radky.has(+m[2])) radky.set(+m[2], []);
			radky.get(+m[2]).push(+m[1]);
		}
		const stredyRad = [...radky.values()].map((xs) => (Math.min(...xs) + Math.max(...xs)) / 2);
		if (new Set(stredyRad).size !== 1) { vystredene = false; kdeStred ||= `${n} částic: středy řad ${stredyRad.join(', ')}`; }
	}
	ok(vystredene, `řady částic jsou vystředěné, i ta poslední neúplná${kdeStred ? ` (${kdeStred})` : ''}`);
	// částice musí být UVNITŘ kostky, jinak scéna ukazuje nesmysl
	nastav(60, NMAX, 0);
	const ram = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	const stredy = [...teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)].map((m) => [+m[1], +m[2]]);
	ok(stredy.length === NMAX && stredy.every(([cx, cy]) =>
		cx > ram[1] + 8 && cx < ram[1] + ram[3] - 8 && cy > ram[2] + 8 && cy < ram[2] + ram[4] - 8),
		`a všech ${NMAX} částic leží uvnitř kostky, ne za jejím okrajem`);
}

console.log('\n— teplota je na kostce vidět —');
{
	nastav(0, 10, 0);
	const studena = /fill="(#[0-9a-f]{6})"/.exec(teleso.innerHTML)[1];
	const kratke = cisla(/<line[^>]*x2="(\d+)"/g, teleso);
	nastav(TMAX, 10, 0);
	const horka = /fill="(#[0-9a-f]{6})"/.exec(teleso.innerHTML)[1];
	const dlouhe = cisla(/<line[^>]*x2="(\d+)"/g, teleso);
	ok(studena !== horka, `studená kostka má jinou barvu než rozpálená (${studena} → ${horka})`);
	// šipky = rychlost pohybu částic; měří se jejich délka, ne poloha
	const delka = (kde) => {
		const pary = [...kde.innerHTML.matchAll(/<line x1="(\d+)" y1="(\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)];
		return pary.map((m) => Math.hypot(+m[3] - +m[1], +m[4] - +m[2]));
	};
	nastav(0, 10, 0);
	const dS = delka(teleso);
	nastav(TMAX, 10, 0);
	const dH = delka(teleso);
	ok(dS.length === 10 && dH.length === 10, 'každá částice má šipku svého pohybu');
	ok(Math.max(...dS) < Math.min(...dH),
		`v horké kostce jsou šipky delší než ve studené (${Math.round(Math.max(...dS))} < ${Math.round(Math.min(...dH))} px)`);
	ok(Math.min(...dS) > 0, 'ale ani ve studené nemá žádná částice nulovou šipku — pohyb nikdy neustane');
	// Nález z vyrenderovaného obrázku: šipka kreslená OD STŘEDU vypadala jako
	// ručička hodin uvnitř ciferníku, ne jako částice, která někam letí.
	// Musí proto začínat až za okrajem kolečka (r=7) a mít hrot.
	{
		nastav(60, NMAX, 0);
		const stredy = [...teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)].map((m) => [+m[1], +m[2]]);
		const zacatky = [...teleso.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)"/g)].map((m) => [+m[1], +m[2]]);
		let venku = true;
		for (let i = 0; i < zacatky.length; i++) {
			if (Math.hypot(zacatky[i][0] - stredy[i][0], zacatky[i][1] - stredy[i][1]) < 8) venku = false;
		}
		ok(venku && zacatky.length === NMAX, 'každá šipka začíná až za okrajem svého kolečka, nekreslí se přes ně');
		ok((teleso.innerHTML.match(/<polygon/g) ?? []).length === NMAX, 'a každá má hrot — je vidět, kam částice letí');
		// hrot musí sedět přesně na konci dříku — kdyby dřík mířil jinam,
		// šipka by se rozpadla na čárku a trojúhelník každý jinde
		const konceL = [...teleso.innerHTML.matchAll(/<line[^>]*x2="(-?\d+)" y2="(-?\d+)"/g)].map((m) => `${m[1]},${m[2]}`);
		const spickyHrotu = [...teleso.innerHTML.matchAll(/<polygon points="(-?\d+),(-?\d+) /g)].map((m) => `${m[1]},${m[2]}`);
		ok(konceL.length === NMAX && konceL.every((k, idx) => k === spickyHrotu[idx]),
			'a hrot každé šipky sedí přesně na konci jejího dříku');
		// hrot je kompaktní trojúhelníček: křidélka drží u špičky. Kdyby se
		// dřík s hrotem přepočítaly každý jinak, křidélka by ulétla jinam.
		let kompaktni = true;
		for (const m of teleso.innerHTML.matchAll(/<polygon points="([^"]+)"/g)) {
			const [spicka, ...kridelka] = m[1].split(' ').map((b) => b.split(',').map(Number));
			for (const [wx, wy] of kridelka) {
				if (Math.hypot(wx - spicka[0], wy - spicka[1]) > 12) kompaktni = false;
			}
		}
		ok(kompaktni, 'a křidélka hrotu drží u špičky — hrot se nerozpadá po kostce');
		// Druhý nález z obrázku: u ledové kostky byla šipka tak krátká, že
		// z ní byl vidět jen hrot a částice vypadala jako kapka. Hrot měří
		// 5 px, dřík musí být aspoň stejně dlouhý — tedy čára aspoň 10 px.
		nastav(0, NMAX, 0);
		const nejkratsi = Math.min(...[...teleso.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)]
			.map((m) => Math.hypot(+m[3] - +m[1], +m[4] - +m[2])));
		ok(nejkratsi >= 10, `i nejkratší šipka má vidět dřík, nejen hrot (${Math.round(nejkratsi)} px)`);
		// a nesmí píchat do sousední částice
		nastav(TMAX, NMAX, 0);
		const s2 = [...teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)].map((m) => [+m[1], +m[2]]);
		const konce = [...teleso.innerHTML.matchAll(/<line[^>]*x2="(-?\d+)" y2="(-?\d+)"/g)].map((m) => [+m[1], +m[2]]);
		let ciziKolecko = false;
		for (let i = 0; i < konce.length; i++) {
			for (let j = 0; j < s2.length; j++) {
				if (i !== j && Math.hypot(konce[i][0] - s2[j][0], konce[i][1] - s2[j][1]) < 8) ciziKolecko = true;
			}
		}
		ok(!ciziKolecko, 'a ani ta nejdelší nepíchá do sousední částice');
		// a nic z toho nesmí trčet z kostky ven
		const r = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
		const body = [...teleso.innerHTML.matchAll(/<line[^>]*x2="(-?\d+)" y2="(-?\d+)"/g)].map((m) => [+m[1], +m[2]])
			.concat([...teleso.innerHTML.matchAll(/<polygon points="([^"]+)"/g)]
				.flatMap((m) => m[1].split(' ').map((b) => b.split(',').map(Number))));
		ok(body.every(([bx, by]) => bx > r[1] && bx < r[1] + r[3] && by > r[2] && by < r[2] + r[4]),
			`a ani nejdelší šipka netrčí z kostky ven (${body.length} bodů uvnitř rámu)`);
	}
	// neuspořádanost: kdyby šipky mířily všechny stejně, byl by to pohyb celku
	const smery = new Set([...teleso.innerHTML.matchAll(/<line x1="(\d+)" y1="(\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)]
		.map((m) => `${Math.sign(+m[3] - +m[1])},${Math.sign(+m[4] - +m[2])}`));
	ok(smery.size >= 4, `částice míhají do ${smery.size} různých směrů — pohyb je neuspořádaný`);
}

console.log('\n— rozjetá kostka: mění se jen pohybová energie —');
{
	const vyskaSloupcu = () => cisla(/<rect x="\d+" y="\d+" width="60" height="(\d+)"/g, sloupce);
	nastav(60, 10, 0);
	const klid = vyskaSloupcu();
	const sipkyKlid = [...teleso.innerHTML.matchAll(/<line/g)].length;
	nastav(60, 10, VMAX);
	const jede = vyskaSloupcu();
	ok(klid[0] === jede[0], `sloupec vnitřní energie se rozjetím ani nehne (${klid[0]} px → ${jede[0]} px)`);
	ok(jede[1] > klid[1], `sloupec pohybové energie vyroste (${klid[1]} px → ${jede[1]} px)`);
	ok([...teleso.innerHTML.matchAll(/<line/g)].length === sipkyKlid,
		'a částice uvnitř se míhají pořád stejně — pohyb celku s nimi nemá co dělat');
	ok(sipkaV.innerHTML.includes('celá kostka jede'), 'nad rozjetou kostkou je šipka s rychlostí');
	nastav(60, 10, 0);
	ok(sipkaV.innerHTML === '', 'a u stojící kostky žádná není');
	// kostka se veze po podložce, ne mimo ni ani přes sloupce
	let vejde = true;
	for (const i of VIND) {
		nastav(60, NMAX, i);
		const r = /<rect x="(\d+)"[^>]*width="(\d+)"/.exec(teleso.innerHTML);
		if (+r[1] + +r[2] > 410) vejde = false;
	}
	ok(vejde, 'i nejrychlejší kostka zůstane na podložce a nevjede do sloupců');
}

console.log('\n— směr jízdy: kostka jede tam, kam ukazuje šipka —');
{
	// Doměřeno podle mutačního testu: obrácené znaménko u posunu kostky
	// prvním testem prošlo. Kostka by couvala doleva, zatímco šipka nad ní
	// ukazuje doprava — a nikdo by nepoznal, že se scéna hádá sama se sebou.
	const xKostky = [];
	for (const i of VIND) {
		nastav(60, 10, i);
		xKostky.push(+/<rect x="(\d+)"/.exec(teleso.innerHTML)[1]);
	}
	let jedeVpred = true;
	for (let i = 1; i < xKostky.length; i++) if (xKostky[i] <= xKostky[i - 1]) jedeVpred = false;
	ok(jedeVpred, `s rostoucí rychlostí se kostka posouvá vpřed (x = ${xKostky.join(' → ')})`);
	// a šipka rychlosti musí patřit k NÍ: ležet nad kostkou a v jejím rozsahu
	nastav(60, 10, VMAX);
	const r = /<rect x="(\d+)" y="(\d+)" width="(\d+)"/.exec(teleso.innerHTML).map(Number);
	const xSipky = [...sipkaV.innerHTML.matchAll(/(?:x1|x2|x)="(-?\d+)"/g)].map((m) => +m[1])
		.concat([...sipkaV.innerHTML.matchAll(/points="([^"]+)"/g)]
			.flatMap((m) => m[1].split(' ').map((b) => +b.split(',')[0])));
	const ySipky = [...sipkaV.innerHTML.matchAll(/(?:y1|y2|y)="(-?\d+)"/g)].map((m) => +m[1])
		.concat([...sipkaV.innerHTML.matchAll(/points="([^"]+)"/g)]
			.flatMap((m) => m[1].split(' ').map((b) => +b.split(',')[1])));
	ok(xSipky.length > 0 && xSipky.every((x) => x >= r[1] && x <= r[1] + r[3]),
		`šipka rychlosti leží nad kostkou (x ${Math.min(...xSipky)}–${Math.max(...xSipky)} v pásu ${r[1]}–${r[1] + r[3]})`);
	ok(ySipky.length > 0 && ySipky.every((y) => y > 0 && y < r[2]),
		`a nad jejím vrchem, uvnitř obrázku (y ${Math.min(...ySipky)}–${Math.max(...ySipky)}, vrch kostky ${r[2]})`);
}

console.log('\n— popisky nesmí tvrdit něco jiného než scéna —');
{
	// Taky z mutačního testu: obrácená podmínka u výpisu rychlosti i u hlášky
	// prošla bez povšimnutí — stojící kostka by hlásila jízdu a naopak.
	nastav(60, 10, 0);
	ok(prvky.get('vne-out-v').textContent === 'stojí', `u rychlosti 0 stojí „${prvky.get('vne-out-v').textContent}"`);
	ok(prvky.get('vne-stav').textContent.includes('stojí') && !prvky.get('vne-stav').textContent.includes('veze'),
		'a hláška mluví o stojící kostce');
	for (const i of VIND.slice(1)) {
		nastav(60, 10, i);
		ok(prvky.get('vne-out-v').textContent.includes(`${RYCHLOSTI[i]} dílk`),
			`u rychlosti ${RYCHLOSTI[i]} dílků stojí „${prvky.get('vne-out-v').textContent}"`);
		// slovní popis musí sedět s číslem: nejvyšší rychlost je „rychle",
		// menší „pomalu" — obráceně by popisek lhal
		const slovo = RYCHLOSTI[i] === Math.max(...VIND.map((j) => RYCHLOSTI[j])) ? 'rychle' : 'pomalu';
		ok(prvky.get('vne-out-v').textContent.includes(slovo),
			`a slovy „${slovo}" — popis sedí s velikostí rychlosti`);
		ok(prvky.get('vne-stav').textContent.includes(`rychlost ${RYCHLOSTI[i]} dílků`),
			'a hláška mluví o jedoucí kostce se správnou rychlostí — v dílcích modelu, ne v m/s');
	}
	// Strop přehřátí musí sedět s posuvníkem: kdyby se rozešly, ochrana by
	// buď zbytečně bránila, nebo pustila teplotu za rozsah scény.
	const maxPosuvniku = +/id="vne-teplota"[^>]*max="(\d+)"/.exec(zdroj)[1];
	ok(MAX_T === maxPosuvniku, `strop scény (${MAX_T} °C) je týž jako maximum posuvníku (${maxPosuvniku} °C)`);
}

console.log('\n— počitadlo říká totéž co scéna —');
{
	for (const [t, n, i] of [[0, NMIN, 0], [60, 10, VIND[1] ?? 0], [TMAX, NMAX, VMAX]]) {
		nastav(t, n, i);
		const s = stav(t, n, RYCHLOSTI[i]);
		const c = cisla(/(\d+) jednotek/g, pocty);
		ok(c[0] === s.vnitrni && c[1] === s.pohybova,
			`${t} °C, ${n} částic, rychlost ${RYCHLOSTI[i]} → vnitřní ${c[0]}, pohybová ${c[1]} jednotek`);
		const soucin = /(\d+) × (\d+) = (\d+)/.exec(pocty.innerHTML).slice(1).map(Number);
		ok(soucin[0] * soucin[1] === soucin[2] && soucin[2] === s.vnitrni,
			`a rozepsaný součin sedí: ${soucin[0]} × ${soucin[1]} = ${soucin[2]}`);
	}
}

console.log('\n— nic se ve scéně nepřekrývá —');
{
	// Počitadlo má vlastní pruh dole (podložka a popisky končí na y=370).
	nastav(TMAX, NMAX, VMAX);
	const ram = /<rect x="\d+" y="(\d+)"/.exec(pocty.innerHTML);
	ok(+ram[1] >= 370, `počitadlo má vlastní pruh pod scénou (y=${ram[1]})`);
	const yTextu = cisla(/<text[^>]*y="(\d+)"/g, pocty);
	ok(yTextu.every((y) => y > 370), `a všechny jeho řádky taky (y = ${yTextu.join(', ')})`);
	// sloupce nesmí přetéct nahoru ani utéct z pruhu vedle kostky
	let vejdou = true, popisky = true;
	for (const [t, n, i] of [[0, NMIN, 0], [TMAX, NMAX, VMAX]]) {
		nastav(t, n, i);
		for (const m of sloupce.innerHTML.matchAll(/<rect x="(\d+)" y="(-?\d+)" width="60" height="(\d+)"/g)) {
			if (+m[2] < 20 || +m[1] < 420 || +m[1] + 60 > 650) vejdou = false;
			if (+m[2] + +m[3] !== 350) vejdou = false;
		}
		for (const m of sloupce.innerHTML.matchAll(/<text[^>]*y="(-?\d+)"/g)) if (+m[1] < 20) popisky = false;
	}
	ok(vejdou, 'oba sloupce stojí na základně y=350, vejdou se do svého pruhu a nepřetečou nahoru');
	ok(popisky, 'a jejich čísla zůstanou uvnitř obrázku i u nejvyššího sloupce');
	// Nález z obrázku: popisek kostky ležel NA podložce a četl se jako nápis
	// na stole. Patří nad kostku — a nesmí zajet ani do šipky rychlosti,
	// ani mimo obrázek u nejvyšší kostky.
	let nadKostkou = true, vObrazku = true;
	for (const [t, n, i] of [[0, NMIN, 0], [TMAX, NMAX, VMAX], [60, NMAX, VMAX]]) {
		nastav(t, n, i);
		const r = /<rect x="(\d+)" y="(\d+)"/.exec(teleso.innerHTML).map(Number);
		const p = /<text x="(\d+)" y="(\d+)"[^>]*>kostka:/.exec(teleso.innerHTML);
		if (!p) { nadKostkou = false; continue; }
		if (+p[2] >= r[2] || +p[2] < r[2] - 20 || +p[1] < r[1]) nadKostkou = false;
		if (+p[2] < 14) vObrazku = false;
		// šipka rychlosti sedí výš, ať se popisky nepřekrývají
		const ySipky = [...sipkaV.innerHTML.matchAll(/<text[^>]*y="(-?\d+)"/g)].map((m) => +m[1]);
		if (ySipky.some((y) => Math.abs(y - +p[2]) < 14)) nadKostkou = false;
	}
	ok(nadKostkou, 'popisek kostky sedí těsně nad ní, ne na podložce, a nesráží se se šipkou rychlosti');
	ok(vObrazku, 'a ani u nejvyšší kostky nevyjede z obrázku');
}

console.log('\n— tlačítko tření —');
{
	nastav(20, 10, 0);
	const predT = teplota.value;
	klikni();
	ok(teplota.value === predT, 'stojící kostka se kliknutím neohřeje');
	ok(prvky.get('vne-stav').textContent.includes('nemá co brzdit'),
		`a hláška to vysvětlí: „${prvky.get('vne-stav').textContent.slice(0, 46)}…"`);

	// Obě strany rovnice se berou z ČÍSEL VYPSANÝCH v počitadle pro žáka
	// a z nezávislého přepočtu testu (E) — ne dvakrát z týchž funkcí komponenty.
	const n = 10;
	nastav(20, n, VMAX);
	const vnitrniZPocitadla = () => +/vnitřní energie: \d+ × \d+ = (\d+) jednotek/.exec(pocty.innerHTML)[1];
	const JvPred = vnitrniZPocitadla();
	const JpPred = +/pohybová energie celku: (\d+) jednotek/.exec(pocty.innerHTML)[1];
	klikni();
	const tPo = +teplota.value;
	ok(tPo === 20 + (10 * JpPred) / n,
		`zabrzděním teplota stoupne na ${tPo} °C — přesně o 10 °C za každou jednotku na částici (${JpPred} jednotek na ${n} částic)`);
	ok(rychlost.value === '0', 'kostka se zastaví');
	const JvPo = vnitrniZPocitadla();
	ok(JvPo - JvPred === JpPred,
		`a vnitřní energie v počitadle vzroste přesně o zaniklou pohybovou (${JvPred} → ${JvPo}, tedy o ${JpPred})`);
	ok(JvPo === E(tPo, n), 'což sedí i s nezávislým přepočtem testu E(t, n)');
	const poBrzde = prvky.get('vne-stav').textContent;
	ok(poBrzde.includes('změnila na vnitřní'), 'hláška pojmenuje, co se stalo');
	// poctivost modelu: smyšlené dílky nejsou m/s a hláška přizná, kde se
	// takhle třením hřeje doopravdy (brzdy, vrták — příklady z výkladu)
	ok(poBrzde.includes('brzdy') && poBrzde.includes('vrták') && !poBrzde.includes('m/s'),
		'a poctivě dodá, že doopravdy se takhle ohřívají třeba brzdy nebo vrták');

	// Přehřátí: scéna raději nebrzdí, než aby energie zmizela beze stopy.
	nastav(MAX_T, 10, VMAX);
	const horka = teplota.value;
	klikni();
	ok(teplota.value === horka && rychlost.value === String(VMAX),
		`nad ${MAX_T} °C se nebrzdí (teplota zůstala ${teplota.value} °C) — energie by se musela ztratit`);
	ok(prvky.get('vne-stav').textContent.includes('ochlaď'), 'a hláška poradí, co udělat');
	// pojistka nesmí vypnout brzdění tam, kde se ještě vejde
	nastav(MAX_T - ohratiTrenim(RYCHLOSTI[VMAX]), 10, VMAX);
	klikni();
	ok(+teplota.value === MAX_T, `přesně na hranici se zabrzdit ještě dá (výsledek ${teplota.value} °C)`);
}

console.log('\n— žádný dosažitelný stav nedává nesmysl —');
{
	// Podvrh max="3" u posuvníku rychlosti dřív prošel: RYCHLOSTI[3] neexistuje,
	// scéna hlásila NaN a test si toho nevšiml, protože zkoušel jen indexy
	// opsané napevno. Projdou se proto VŠECHNY dosažitelné stavy posuvníků.
	ok(VIND.every((i) => Number.isFinite(RYCHLOSTI[i])),
		`každý dílek posuvníku rychlosti (${VIND.join(', ')}) má v modelu svou rychlost`);
	let cisto = true, bezJednotek = true, bezLedu = true, kde = '';
	for (const t of TEPLOTY) for (const n of POCTY) for (const i of VIND) {
		nastav(t, n, i);
		const texty = [pocty.innerHTML, prvky.get('vne-vypocet').innerHTML,
			prvky.get('vne-stav').textContent, prvky.get('vne-out-t').textContent,
			prvky.get('vne-out-n').textContent, prvky.get('vne-out-v').textContent,
			teleso.innerHTML, sipkaV.innerHTML, sloupce.innerHTML].join(' ');
		if (/NaN|undefined|Infinity/.test(texty)) { cisto = false; kde ||= `${t} °C, ${n} částic, dílek ${i}`; }
		if (/m\/s/.test(texty)) bezJednotek = false;
		if (/ledov/.test(texty)) bezLedu = false;
	}
	ok(cisto, `všech ${TEPLOTY.length * POCTY.length * VIND.length} dosažitelných stavů má v textech jen čísla, žádné NaN/undefined${kde ? ` (selhalo u ${kde})` : ''}`);
	// smyšlené dílky modelu se nesmí vydávat za skutečné m/s — z 10 m/s by
	// reálné tření ohřálo o desetiny stupně, ne o 40 °C
	ok(bezJednotek, 'rychlost je všude bez fyzikálních jednotek — žádné „m/s" u smyšlených dílků');
	ok(bezLedu, 'a kostka je kovová: říká se jí „studená", nikde „ledová"');
}

console.log('\n— oba sloupce měří stejným metrem —');
{
	// Vzor kondenzace.mjs: metr (px na jednotku) se měří na SKUTEČNĚ vykreslených
	// obdélnících a číslech vypsaných v počitadle pro žáka. Kdyby si test vzal
	// MERITKO z komponenty, porovnával by ji s ní samou — a neměřil by nic.
	const mereni = [];
	for (const t of [TEPLOTY[0], TMAX]) for (const n of [NMIN, NMAX]) for (const i of VIND) {
		nastav(t, n, i);
		const vnitrniJ = +/vnitřní energie: \d+ × \d+ = (\d+) jednotek/.exec(pocty.innerHTML)[1];
		const pohybJ = +/pohybová energie celku: (\d+) jednotek/.exec(pocty.innerHTML)[1];
		const obdelniky = [...sloupce.innerHTML.matchAll(/<rect x="(\d+)" y="-?\d+" width="60" height="(\d+)"/g)]
			.map((m) => ({ x: +m[1], h: +m[2] }));
		const popisX = (jmeno) => {
			const m = [...sloupce.innerHTML.matchAll(/<text x="(\d+)" y="366"[^>]*>([^<]+)</g)]
				.find((t2) => t2[2].startsWith(jmeno));
			return m ? +m[1] - 30 : null;   // popisek sedí uprostřed pod 60px širokým sloupcem
		};
		mereni.push({ kde: `${t} °C, ${n} částic, dílek ${i}, vnitřní`, J: vnitrniJ,
			h: obdelniky.find((r) => r.x === popisX('vnitřní'))?.h });
		mereni.push({ kde: `${t} °C, ${n} částic, dílek ${i}, pohybová`, J: pohybJ,
			h: obdelniky.find((r) => r.x === popisX('pohybová'))?.h });
	}
	ok(mereni.every((m) => m.h !== undefined), 'oba sloupce jdou ve scéně najít podle popisků pod nimi');
	// metr se odvodí z největšího sloupce (zaokrouhlení je tam nejmíň znát)
	const nej = mereni.reduce((a, b) => (b.J > a.J ? b : a));
	const metr = nej.h / nej.J;
	let stejnyMetr = true, kdeM = '';
	for (const m of mereni) {
		const cekane = m.J * metr;
		const sedne = m.J === 0 ? m.h === 0
			: cekane < 3 ? m.h === 3
			: Math.abs(m.h - cekane) <= 1;
		if (!sedne) { stejnyMetr = false; kdeM ||= `${m.kde}: ${m.h} px místo ${cekane.toFixed(1)}`; }
	}
	ok(stejnyMetr, `měřítko je pro oba sloupce i všechna nastavení stejné (${metr.toFixed(5)} px na jednotku)${kdeM ? ` — rozchází se ${kdeM}` : ''}`);
	// nenulová energie musí být VIDĚT — dřív měl nejmenší sloupec pohybové 2 px
	ok(mereni.every((m) => m.J === 0 || m.h >= 3),
		'a každá nenulová energie má sloupec aspoň 3 px, jako u kondenzace');
}

console.log('\n— rada v hlášce je vždy splnitelná —');
{
	// „Zvyš teplotu" svítilo i na maximu posuvníku, kde už zvýšit nejde.
	nastav(TMAX, 10, 0);
	const naMaximu = prvky.get('vne-stav').textContent;
	ok(!naMaximu.includes('Zvyš teplotu'), 'na maximu teploty hláška neradí „Zvyš teplotu"');
	ok(naMaximu.includes('Rozjeď'), `a poradí něco splnitelného: „${naMaximu.slice(0, 58)}…"`);
	nastav(TEPLOTY[0], 10, 0);
	ok(prvky.get('vne-stav').textContent.includes('Zvyš teplotu'), 'pod maximem rada „Zvyš teplotu" platí dál');
	// a u ROZJETÉ kostky: když by brzdění přeteklo strop scény, tlačítko by
	// radu odmítlo — nad hranicí se proto radí napřed ochlazení. Projde se
	// každý stav s v > 0, rada musí být splnitelná ve VŠECH.
	let splnitelna = true, kdeR = '';
	for (const t of TEPLOTY) for (const i of VIND.slice(1)) {
		nastav(t, 10, i);
		const h = prvky.get('vne-stav').textContent;
		const pretece = t + ohratiTrenim(RYCHLOSTI[i]) > MAX_T;
		const sedi = pretece
			? !h.includes('Zkus ji zabrzdit') && h.includes('ochlaď') && h.includes('pak zabrzdi')
			: h.includes('Zkus ji zabrzdit třením');
		if (!sedi) { splnitelna = false; kdeR ||= `${t} °C, dílek ${i}: „…${h.slice(-70)}"`; }
	}
	ok(splnitelna, `u rozjeté kostky rada sedí se stropem: pod ním „zabrzdi třením", nad ním „nejdřív ochlaď, pak zabrzdi"${kdeR ? ` (${kdeR})` : ''}`);
}

console.log('\n— čeština: částice, částice, částic —');
{
	const castic = svg.__castic;
	const ocekavane = { 0: '0 částic', 1: '1 částice', 2: '2 částice', 4: '4 částice', 5: '5 částic', 10: '10 částic', 20: '20 částic' };
	for (const [n, tvar] of Object.entries(ocekavane)) ok(castic(+n) === tvar, `${n} → „${castic(+n)}"`);
	let vsude = true;
	for (const n of POCTY) {
		nastav(60, n, 0);
		if (/(?:^|[^\d])[234] částic[^e]/.test(teleso.innerHTML) || /(?:^|[^\d])1 částic[^e]/.test(teleso.innerHTML)) vsude = false;
	}
	ok(vsude, 'a v popisku kostky nevyjde špatný tvar při žádné velikosti');
}

console.log(chyby === 0 ? '\n✅ Vnitřní energie: vše sedí.' : `\n❌ Vnitřní energie: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

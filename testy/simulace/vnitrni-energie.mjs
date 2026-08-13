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

const TEPLOTY = [];
for (let t = 0; t <= MAX_T; t += 10) TEPLOTY.push(t);
const POCTY = [5, 10, 15, 20];

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (t, n, vIndex) => {
	teplota.value = String(t); pocet.value = String(n); rychlost.value = String(vIndex);
	for (const f of teplota.posluchaci.input) f();
};
const klikni = () => { for (const f of brzda.posluchaci.click) f(); };

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
	let soucet = true;
	for (const t of TEPLOTY) for (const n of POCTY) {
		if (stav(t, n, 0).vnitrni !== n * energieCastice(t)) soucet = false;
	}
	ok(soucet, 'a to doslova: vnitřní energie = počet částic × energie jedné částice');
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
			if (stav(t, n, v).vnitrni !== klid) { stejna = false; rozdil ??= `${t} °C, ${n} částic, ${v} m/s`; }
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
	let sedi = true, ukazka = '';
	for (const n of POCTY) for (const v of RYCHLOSTI) {
		const pred = stav(20, n, v);
		const po = stav(20 + ohratiTrenim(v), n, 0);
		if (po.vnitrni - pred.vnitrni !== pred.pohybova) sedi = false;
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
	nastav(60, 20, 0);
	const velka = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	nastav(60, 5, 0);
	const mala = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	ok(velka[4] > mala[4], `kostka s víc částicemi je vyšší (${mala[4]} → ${velka[4]} px)`);
	ok(velka[2] + velka[4] === 350 && mala[2] + mala[4] === 350,
		'obě stojí spodkem na podložce (y=350) — nevznášejí se ani nepadají do stolu');
	// částice musí být UVNITŘ kostky, jinak scéna ukazuje nesmysl
	nastav(60, 20, 0);
	const ram = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(teleso.innerHTML).map(Number);
	const stredy = [...teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)].map((m) => [+m[1], +m[2]]);
	ok(stredy.length === 20 && stredy.every(([cx, cy]) =>
		cx > ram[1] + 8 && cx < ram[1] + ram[3] - 8 && cy > ram[2] + 8 && cy < ram[2] + ram[4] - 8),
		'a všech 20 částic leží uvnitř kostky, ne za jejím okrajem');
}

console.log('\n— teplota je na kostce vidět —');
{
	nastav(0, 10, 0);
	const studena = /fill="(#[0-9a-f]{6})"/.exec(teleso.innerHTML)[1];
	const kratke = cisla(/<line[^>]*x2="(\d+)"/g, teleso);
	nastav(150, 10, 0);
	const horka = /fill="(#[0-9a-f]{6})"/.exec(teleso.innerHTML)[1];
	const dlouhe = cisla(/<line[^>]*x2="(\d+)"/g, teleso);
	ok(studena !== horka, `ledová kostka má jinou barvu než rozpálená (${studena} → ${horka})`);
	// šipky = rychlost pohybu částic; měří se jejich délka, ne poloha
	const delka = (kde) => {
		const pary = [...kde.innerHTML.matchAll(/<line x1="(\d+)" y1="(\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)];
		return pary.map((m) => Math.hypot(+m[3] - +m[1], +m[4] - +m[2]));
	};
	nastav(0, 10, 0);
	const dS = delka(teleso);
	nastav(150, 10, 0);
	const dH = delka(teleso);
	ok(dS.length === 10 && dH.length === 10, 'každá částice má šipku svého pohybu');
	ok(Math.max(...dS) < Math.min(...dH),
		`v horké kostce jsou šipky delší než ve studené (${Math.round(Math.max(...dS))} < ${Math.round(Math.min(...dH))} px)`);
	ok(Math.min(...dS) > 0, 'ale ani ve studené nemá žádná částice nulovou šipku — pohyb nikdy neustane');
	// Nález z vyrenderovaného obrázku: šipka kreslená OD STŘEDU vypadala jako
	// ručička hodin uvnitř ciferníku, ne jako částice, která někam letí.
	// Musí proto začínat až za okrajem kolečka (r=7) a mít hrot.
	{
		nastav(60, 20, 0);
		const stredy = [...teleso.innerHTML.matchAll(/<circle cx="(\d+)" cy="(\d+)"/g)].map((m) => [+m[1], +m[2]]);
		const zacatky = [...teleso.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)"/g)].map((m) => [+m[1], +m[2]]);
		let venku = true;
		for (let i = 0; i < zacatky.length; i++) {
			if (Math.hypot(zacatky[i][0] - stredy[i][0], zacatky[i][1] - stredy[i][1]) < 8) venku = false;
		}
		ok(venku && zacatky.length === 20, 'každá šipka začíná až za okrajem svého kolečka, nekreslí se přes ně');
		ok((teleso.innerHTML.match(/<polygon/g) ?? []).length === 20, 'a každá má hrot — je vidět, kam částice letí');
		// Druhý nález z obrázku: u ledové kostky byla šipka tak krátká, že
		// z ní byl vidět jen hrot a částice vypadala jako kapka. Hrot měří
		// 5 px, dřík musí být aspoň stejně dlouhý — tedy čára aspoň 10 px.
		nastav(0, 20, 0);
		const nejkratsi = Math.min(...[...teleso.innerHTML.matchAll(/<line x1="(-?\d+)" y1="(-?\d+)" x2="(-?\d+)" y2="(-?\d+)"/g)]
			.map((m) => Math.hypot(+m[3] - +m[1], +m[4] - +m[2])));
		ok(nejkratsi >= 10, `i nejkratší šipka má vidět dřík, nejen hrot (${Math.round(nejkratsi)} px)`);
		// a nesmí píchat do sousední částice
		nastav(150, 20, 0);
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
	nastav(60, 10, 2);
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
	for (let i = 0; i < RYCHLOSTI.length; i++) {
		nastav(60, 20, i);
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
	for (let i = 0; i < RYCHLOSTI.length; i++) {
		nastav(60, 10, i);
		xKostky.push(+/<rect x="(\d+)"/.exec(teleso.innerHTML)[1]);
	}
	let jedeVpred = true;
	for (let i = 1; i < xKostky.length; i++) if (xKostky[i] <= xKostky[i - 1]) jedeVpred = false;
	ok(jedeVpred, `s rostoucí rychlostí se kostka posouvá vpřed (x = ${xKostky.join(' → ')})`);
	// a šipka rychlosti musí patřit k NÍ: ležet nad kostkou a v jejím rozsahu
	nastav(60, 10, 2);
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
	for (const i of [1, 2]) {
		nastav(60, 10, i);
		ok(prvky.get('vne-out-v').textContent === `${RYCHLOSTI[i]} m/s`,
			`u rychlosti ${RYCHLOSTI[i]} m/s stojí „${prvky.get('vne-out-v').textContent}"`);
		ok(prvky.get('vne-stav').textContent.includes(`veze ${RYCHLOSTI[i]} m/s`),
			'a hláška mluví o jedoucí kostce se správnou rychlostí');
	}
	// Strop přehřátí musí sedět s posuvníkem: kdyby se rozešly, ochrana by
	// buď zbytečně bránila, nebo pustila teplotu za rozsah scény.
	const maxPosuvniku = +/id="vne-teplota"[^>]*max="(\d+)"/.exec(zdroj)[1];
	ok(MAX_T === maxPosuvniku, `strop scény (${MAX_T} °C) je týž jako maximum posuvníku (${maxPosuvniku} °C)`);
}

console.log('\n— počitadlo říká totéž co scéna —');
{
	for (const [t, n, i] of [[0, 5, 0], [60, 10, 1], [150, 20, 2]]) {
		nastav(t, n, i);
		const s = stav(t, n, RYCHLOSTI[i]);
		const c = cisla(/(\d+) jednotek/g, pocty);
		ok(c[0] === s.vnitrni && c[1] === s.pohybova,
			`${t} °C, ${n} částic, ${RYCHLOSTI[i]} m/s → vnitřní ${c[0]}, pohybová ${c[1]} jednotek`);
		const soucin = /(\d+) × (\d+) = (\d+)/.exec(pocty.innerHTML).slice(1).map(Number);
		ok(soucin[0] * soucin[1] === soucin[2] && soucin[2] === s.vnitrni,
			`a rozepsaný součin sedí: ${soucin[0]} × ${soucin[1]} = ${soucin[2]}`);
	}
}

console.log('\n— nic se ve scéně nepřekrývá —');
{
	// Počitadlo má vlastní pruh dole (podložka a popisky končí na y=370).
	nastav(150, 20, 2);
	const ram = /<rect x="\d+" y="(\d+)"/.exec(pocty.innerHTML);
	ok(+ram[1] >= 370, `počitadlo má vlastní pruh pod scénou (y=${ram[1]})`);
	const yTextu = cisla(/<text[^>]*y="(\d+)"/g, pocty);
	ok(yTextu.every((y) => y > 370), `a všechny jeho řádky taky (y = ${yTextu.join(', ')})`);
	// sloupce nesmí přetéct nahoru ani utéct z pruhu vedle kostky
	let vejdou = true, popisky = true;
	for (const [t, n, i] of [[0, 5, 0], [150, 20, 2]]) {
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
	for (const [t, n, i] of [[0, 5, 0], [150, 20, 2], [60, 20, 2]]) {
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

	nastav(20, 10, 2);
	const pred = stav(20, 10, 10);
	klikni();
	const po = stav(+teplota.value, 10, RYCHLOSTI[+rychlost.value]);
	ok(+teplota.value === 20 + ohratiTrenim(10), `zabrzděním z 10 m/s teplota stoupne na ${teplota.value} °C`);
	ok(rychlost.value === '0', 'kostka se zastaví');
	ok(po.vnitrni - pred.vnitrni === pred.pohybova,
		`a vnitřní energie vzroste přesně o zaniklou pohybovou (${pred.vnitrni} → ${po.vnitrni}, tedy o ${pred.pohybova})`);
	ok(prvky.get('vne-stav').textContent.includes('změnila na vnitřní'), 'hláška pojmenuje, co se stalo');

	// Přehřátí: scéna raději nebrzdí, než aby energie zmizela beze stopy.
	nastav(MAX_T, 10, 2);
	const horka = teplota.value;
	klikni();
	ok(teplota.value === horka && rychlost.value === '2',
		`nad ${MAX_T} °C se nebrzdí (teplota zůstala ${teplota.value} °C) — energie by se musela ztratit`);
	ok(prvky.get('vne-stav').textContent.includes('ochlaď'), 'a hláška poradí, co udělat');
	// pojistka nesmí vypnout brzdění tam, kde se ještě vejde
	nastav(MAX_T - ohratiTrenim(10), 10, 2);
	klikni();
	ok(+teplota.value === MAX_T, `přesně na hranici se zabrzdit ještě dá (výsledek ${teplota.value} °C)`);
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

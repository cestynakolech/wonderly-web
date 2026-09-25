#!/usr/bin/env node
// Ověření SketchupSimulace.astro (Pracovní činnosti 6, 3D modelování — SketchUp):
// spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM a proměří, co scéna
// žákovi tvrdí a co kreslí.
//
// SMYSL scény (podle výkladu podtématu „sketchup": „nakreslíš půdorys a vytáhneš
// ho do výšky", „Push/Pull — chytneš plochu a vytáhneš ji do 3D", „Orbit —
// otáčení pohledu", „barevné osy červená/zelená/modrá", úkol „Obdélník 6 × 4 m →
// Push/Pull do výšky 3 m"):
//   · výchozí stav je PLOCHA 6 × 4 m — modrý obdélník bez výšky, bez objemu,
//   · po vytažení je z ní TĚLESO (kvádr) a teprve to má objem a šest stěn,
//   · rozměry jsou celé metry, takže obsah i objem vyjdou v celých číslech,
//   · orbit otáčí pohledem a barevné osy v rohu se otáčejí s ním.
// Nic dalšího scéna netvrdit nesmí (žádný povrch, žádné měřítko v jiných
// jednotkách, žádný údaj, který ve výkladu nestojí).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2];
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id,
		atributy: {},
		textContent: '',
		innerHTML: '',
		// výchozí hodnota posuvníku se bere ze ZDROJE komponenty, ne z testu
		value: (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1] ?? '',
		posluchaci: {},
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, console, Math, String, Number, Object, JSON, performance: { now: () => 0 }, requestAnimationFrame: () => {} };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const el = (id) => prvky.get(id) || novyPrvek(id);
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const posun = (id, hodnota) => { el(id).value = String(hodnota); (el(id).posluchaci.input || []).forEach((f) => f()); };

const svg = el('sku-svg');
const promitni = svg.__promitni;
const otoc = svg.__otoc;
const vypocty = svg.__vypocty;
const viditelneSteny = svg.__viditelneSteny;
const popisky = svg.__popisky;
const osy = svg.__osy;
const nejblizsiRoh = svg.__nejblizsiRoh;
const plaketa = svg.__plaketa;
const vrstvy = svg.__vrstvy;
const stitek = svg.__stitek;

// ČEKANÉ hodnoty jsou v testu natvrdo (ne odvozené z komponenty), aby test
// nemohl být tautologický. Rozsahy posuvníků se čtou ze zdroje — když se
// rozšíří, projedou se rovnou i nové polohy.
const SIRKA_SCENY = 680, VYSKA_SCENY = 500;
const STRED = { x: 340, y: 330 };
const UHLY = [];
for (let u = 0; u < 360; u += 15) UHLY.push(u);
const rozsah = (id) => {
	const znacka = zdroj.match(new RegExp(`<input[^>]*id="${id}"[^>]*>`))[0];
	const cislo = (jmeno) => Number(znacka.match(new RegExp(`${jmeno}="([^"]*)"`))[1]);
	return { min: cislo('min'), max: cislo('max'), krok: cislo('step'), value: cislo('value') };
};
const RA = rozsah('sku-a'), RB = rozsah('sku-b'), RC = rozsah('sku-c'), RO = rozsah('sku-o');
const kombinace = [];
for (let a = RA.min; a <= RA.max; a += RA.krok)
	for (let b = RB.min; b <= RB.max; b += RB.krok)
		for (let c = RC.min; c <= RC.max; c += RC.krok) kombinace.push([a, b, c]);

console.log('— posuvníky: samá celá čísla, výchozí stav je plocha 6 × 4 m —');
ok(RA.krok === 1 && RB.krok === 1 && RC.krok === 1, `šířka, hloubka i výška se mění po 1 m (kroky ${RA.krok}, ${RB.krok}, ${RC.krok})`);
ok(RO.krok === 15 && RO.min === 0 && RO.max === 345, `orbit jde po 15° kolem dokola (${RO.min}–${RO.max} po ${RO.krok})`);
ok(360 % RO.krok === 0, `krok orbitu dělí plný kruh beze zbytku (360 : ${RO.krok})`);
ok(RA.value === 6 && RB.value === 4 && RC.value === 0, `scéna začíná obdélníkem 6 × 4 m bez výšky (je ${RA.value} × ${RB.value}, výška ${RC.value})`);
ok(RC.min === 0, `výška jde stáhnout na nulu, tedy zpátky na plochu (min je ${RC.min})`);
ok([RA, RB, RC, RO].every((r) => Number.isInteger(r.min) && Number.isInteger(r.max) && Number.isInteger(r.value)), 'všechny meze posuvníků jsou celá čísla');

console.log('— výpočty: obsah, objem a počty prvků tělesa —');
ok(vypocty(6, 4, 0).obsah === 24, `plocha 6 × 4 m má obsah 24 m² (je ${vypocty(6, 4, 0).obsah})`);
ok(vypocty(6, 4, 3).objem === 72, `kvádr 6 × 4 × 3 m má objem 72 m³ (je ${vypocty(6, 4, 3).objem})`);
ok(vypocty(8, 6, 5).objem === 240 && vypocty(8, 6, 5).obsah === 48, `největší kvádr 8 × 6 × 5 m: obsah 48 m², objem 240 m³ (je ${vypocty(8, 6, 5).obsah} a ${vypocty(8, 6, 5).objem})`);
ok(vypocty(2, 2, 1).objem === 4 && vypocty(2, 2, 1).obsah === 4, `nejmenší kvádr 2 × 2 × 1 m: obsah 4 m², objem 4 m³ (je ${vypocty(2, 2, 1).obsah} a ${vypocty(2, 2, 1).objem})`);
ok(vypocty(6, 4, 0).objem === 0, `plocha nemá žádný objem (je ${vypocty(6, 4, 0).objem})`);
ok(vypocty(6, 4, 0).teleso === false && vypocty(6, 4, 1).teleso === true, 'tělesem se to stane až od výšky 1 m');
ok(vypocty(6, 4, 0).vrcholu === 4 && vypocty(6, 4, 0).hran === 4 && vypocty(6, 4, 0).sten === 1,
	`obdélník má 4 vrcholy, 4 hrany a 1 plochu (je ${vypocty(6, 4, 0).vrcholu}, ${vypocty(6, 4, 0).hran}, ${vypocty(6, 4, 0).sten})`);
ok(vypocty(6, 4, 3).vrcholu === 8 && vypocty(6, 4, 3).hran === 12 && vypocty(6, 4, 3).sten === 6,
	`kvádr má 8 vrcholů, 12 hran a 6 stěn (je ${vypocty(6, 4, 3).vrcholu}, ${vypocty(6, 4, 3).hran}, ${vypocty(6, 4, 3).sten})`);
{
	const spatne = kombinace.filter(([a, b, c]) => {
		const v = vypocty(a, b, c);
		return !Number.isInteger(v.obsah) || !Number.isInteger(v.objem) || v.obsah !== a * b || v.objem !== a * b * c;
	});
	ok(spatne.length === 0, `všech ${kombinace.length} poloh posuvníků dává celé výsledky (nesedí ${spatne.length})`);
	const vrstveni = kombinace.filter(([a, b, c]) => c > 0 && vypocty(a, b, c).objem !== vypocty(a, b, c).obsah * c);
	ok(vrstveni.length === 0, `objem je vždy obsah krát výška — tolik vrstev, kolik je metrů (nesedí ${vrstveni.length})`);
	const nula = kombinace.filter(([a, b, c]) => c === 0 && vypocty(a, b, c).objem !== 0);
	ok(nula.length === 0, `při výšce 0 nevychází žádný objem (výjimek ${nula.length})`);
}

console.log('— promítání do prostoru: osa otáčení, měřítko, sklon —');
ok(promitni(0, 0, 0, 30).x === STRED.x && promitni(0, 0, 0, 30).y === STRED.y, `počátek leží uprostřed scény (je ${promitni(0, 0, 0, 30).x}, ${promitni(0, 0, 0, 30).y})`);
ok(UHLY.every((u) => promitni(0, 0, 0, u).x === STRED.x && promitni(0, 0, 0, u).y === STRED.y), 'počátek se otáčením nehýbe — orbit točí kolem středu scény');
ok(promitni(1, 0, 0, 0).x === 370 && promitni(1, 0, 0, 0).y === 330, `1 m doprava = 30 px doprava (je ${promitni(1, 0, 0, 0).x}, ${promitni(1, 0, 0, 0).y})`);
ok(promitni(0, 1, 0, 0).x === 340 && promitni(0, 1, 0, 0).y === 315, `1 m dozadu se při sklonu pohledu promítne 15 px vzhůru (je ${promitni(0, 1, 0, 0).x}, ${promitni(0, 1, 0, 0).y})`);
ok(promitni(0, 0, 1, 0).x === 340 && promitni(0, 0, 1, 0).y === 304, `1 m nahoru = 26 px nahoru (je ${promitni(0, 0, 1, 0).x}, ${promitni(0, 0, 1, 0).y})`);
ok(UHLY.every((u) => promitni(0, 0, 1, u).y === 304 && promitni(0, 0, 1, u).x === 340), 'svislá výška vypadá stejně ze všech stran — orbit točí jen vodorovně');
ok(promitni(3, 2, 0, 30).x === 388 && promitni(3, 2, 0, 30).y === 282, `roh (3, 2) při orbitu 30° padne na (388, 282) (je ${promitni(3, 2, 0, 30).x}, ${promitni(3, 2, 0, 30).y})`);
ok(promitni(-3, -2, 0, 30).x === 292 && promitni(-3, -2, 0, 30).y === 378, `protější roh padne na (292, 378) (je ${promitni(-3, -2, 0, 30).x}, ${promitni(-3, -2, 0, 30).y})`);
{
	const body = [[3, 2, 0], [-3, 2, 4], [1, -2, 5], [-4, -3, 2]];
	const stejne = (p, q) => p.x === q.x && p.y === q.y;
	ok(body.every((b) => UHLY.every((u) => stejne(promitni(b[0], b[1], b[2], u), promitni(b[0], b[1], b[2], u + 360)))),
		'otočení o celý kruh (360°) vrátí pohled na stejné místo');
	ok(body.every((b) => UHLY.every((u) => stejne(promitni(b[0], b[1], b[2], u + 90), promitni(-b[1], b[0], b[2], u)))),
		'otočení o 90° zamění osy přesně tak, jak má (x → dozadu, y → doleva)');
	const cela = kombinace.every(([a, b, c]) => UHLY.every((u) => {
		const p = promitni(a / 2, -b / 2, c, u);
		return Number.isInteger(p.x) && Number.isInteger(p.y);
	}));
	ok(cela, 'promítnuté body jsou celé pixely — v SVG žádné nekonečné desetinné rozvoje');
	ok(promitni(0, 3, 0, 0).hloubka > promitni(0, -3, 0, 0).hloubka, 'bod vzadu má větší hloubku než bod vpředu');
	ok(promitni(0, 0, 3, 0).hloubka < promitni(0, 0, 0, 0).hloubka, 'bod výš je blíž ke kameře (menší hloubka)');
	// hloubka natvrdo: 1 m dozadu při sklonu 30° = cos 30° = 0,866; 1 m nahoru = −sin 30° = −0,5
	const zaokr = (x) => Math.round(x * 1000) / 1000;
	ok(zaokr(promitni(0, 1, 0, 0).hloubka) === 0.866, `1 m dozadu přidá na hloubce 0,866 (je ${zaokr(promitni(0, 1, 0, 0).hloubka)})`);
	ok(zaokr(promitni(0, 0, 1, 0).hloubka) === -0.5, `1 m nahoru ubere z hloubky 0,5 (je ${zaokr(promitni(0, 0, 1, 0).hloubka)})`);
	ok(zaokr(promitni(2, 0, 0, 90).hloubka) === 1.732, `bod 2 m vpravo se po otočení o 90° dostane do hloubky 1,732 (je ${zaokr(promitni(2, 0, 0, 90).hloubka)})`);
	ok(zaokr(promitni(0, 2, 3, 0).hloubka) === 0.232, `hloubka počítá s výškou i s posunem dozadu naráz (je ${zaokr(promitni(0, 2, 3, 0).hloubka)})`);
	ok(Math.abs(otoc(1, 0, 90).X) < 0.001 && Math.abs(otoc(1, 0, 90).Y - 1) < 0.001, `otočení o 90° pošle osu x do osy y (je ${otoc(1, 0, 90).X.toFixed(3)}, ${otoc(1, 0, 90).Y.toFixed(3)})`);
	ok(Math.abs(otoc(2, 0, 0).X - 2) < 0.001 && Math.abs(otoc(2, 0, 0).Y) < 0.001, 'bez otočení zůstává bod, kde byl');
}

console.log('— které stěny kamera vidí (kvádr je neprůhledný) —');
const jmenaSten = (a, b, c, u) => viditelneSteny(a, b, c, u).map((s) => s.jmeno).join(',');
ok(jmenaSten(6, 4, 3, 0) === 'předek,horní', `zepředu jsou vidět dvě stěny: předek a horní (je ${jmenaSten(6, 4, 3, 0)})`);
ok(jmenaSten(6, 4, 3, 30) === 'předek,levá,horní', `při orbitu 30° tři stěny (je ${jmenaSten(6, 4, 3, 30)})`);
ok(jmenaSten(6, 4, 3, 180) === 'zadek,horní', `zezadu je vidět zadní stěna (je ${jmenaSten(6, 4, 3, 180)})`);
ok(jmenaSten(6, 4, 3, 270) === 'pravá,horní', `z boku je vidět pravá stěna (je ${jmenaSten(6, 4, 3, 270)})`);
ok(jmenaSten(6, 4, 3, 315) === 'předek,pravá,horní', `při orbitu 315° předek a pravá (je ${jmenaSten(6, 4, 3, 315)})`);
{
	let minPocet = 9, maxPocet = 0, bezHorni = 0, sPodstavou = 0, spatneBody = 0;
	for (const [a, b, c] of kombinace) {
		if (c === 0) continue;
		for (const u of UHLY) {
			const v = viditelneSteny(a, b, c, u);
			minPocet = Math.min(minPocet, v.length);
			maxPocet = Math.max(maxPocet, v.length);
			if (!v.some((s) => s.jmeno === 'horní')) bezHorni++;
			if (v.some((s) => s.jmeno === 'podstava')) sPodstavou++;
			for (const s of v) if (s.body.length !== 4 || s.body.some((p) => !Number.isInteger(p.x) || !Number.isInteger(p.y))) spatneBody++;
		}
	}
	ok(minPocet === 2 && maxPocet === 3, `z kvádru jsou vidět vždy 2 nebo 3 stěny (je ${minPocet}–${maxPocet})`);
	ok(bezHorni === 0, `horní plocha je vidět vždy — díváme se shora (výjimek ${bezHorni})`);
	ok(sPodstavou === 0, `podstava (spodek) není vidět nikdy (výjimek ${sPodstavou})`);
	ok(spatneBody === 0, `každá stěna má 4 rohy v celých pixelech (vadných ${spatneBody})`);
	const barvy = new Set(viditelneSteny(6, 4, 3, 30).map((s) => s.barva));
	ok(barvy.size === 3, `tři viditelné stěny mají tři různé odstíny, aby byl kvádr plastický (je ${barvy.size})`);
}

console.log('— nejbližší svislá hrana (na ní se kreslí rysky po metru) —');
ok([0, 45, 90, 135, 180, 225, 270, 315].map((u) => nejblizsiRoh(6, 4, u)).join(',') === '0,0,0,3,3,2,2,1',
	`při otáčení se rysky stěhují na roh blíž ke kameře (je ${[0, 45, 90, 135, 180, 225, 270, 315].map((u) => nejblizsiRoh(6, 4, u)).join(',')})`);
{
	let mimo = 0, nenejblizsi = 0;
	for (const [a, b] of kombinace) for (const u of UHLY) {
		const r = nejblizsiRoh(a, b, u);
		if (![0, 1, 2, 3].includes(r)) mimo++;
		const rohy = [[-a / 2, -b / 2], [a / 2, -b / 2], [a / 2, b / 2], [-a / 2, b / 2]];
		const hloubky = rohy.map(([x, y]) => promitni(x, y, 0, u).hloubka);
		if (hloubky[r] > Math.min(...hloubky) + 0.0001) nenejblizsi++;
	}
	ok(mimo === 0, `vrací se vždy roh podstavy 0–3 (mimo ${mimo}×)`);
	ok(nenejblizsi === 0, `a je to vždy ten s nejmenší hloubkou, tedy nejblíž ke kameře (chyb ${nenejblizsi})`);
}

console.log('— barevné osy v rohu se otáčejí s pohledem —');
ok(JSON.stringify(osy(30)) === JSON.stringify({ cervena: { x: 124, y: 95 }, zelena: { x: 42, y: 84 }, modra: { x: 72, y: 58 } }),
	`osy při orbitu 30°: ${JSON.stringify(osy(30))}`);
ok(osy(0).cervena.x === 132 && osy(0).cervena.y === 110, `zepředu míří červená osa (šířka) vodorovně doprava (je ${JSON.stringify(osy(0).cervena)})`);
ok(osy(180).cervena.x === 12 && osy(180).cervena.y === 110, `po otočení o 180° míří červená doleva (je ${JSON.stringify(osy(180).cervena)})`);
ok(UHLY.every((u) => osy(u).modra.x === 72 && osy(u).modra.y === 58), 'modrá osa (výška) míří vždy vzhůru, ať se pohled otočí jakkoli');
ok(osy(0).zelena.x === 72 && osy(0).zelena.y === 80, `zepředu míří zelená osa (hloubka) dozadu, tedy vzhůru po obrazovce (je ${JSON.stringify(osy(0).zelena)})`);
ok(osy(90).zelena.x === 12 && osy(90).zelena.y === 110, `po otočení o 90° míří zelená doleva (je ${JSON.stringify(osy(90).zelena)})`);
{
	const ruzne = new Set(UHLY.map((u) => JSON.stringify(osy(u).cervena)));
	ok(ruzne.size === UHLY.length, `každé natočení má svou polohu červené osy (různých ${ruzne.size} z ${UHLY.length})`);
	const vsude = UHLY.every((u) => ['cervena', 'zelena', 'modra'].every((o) => {
		const p = osy(u)[o];
		return p.x >= 0 && p.x <= SIRKA_SCENY && p.y >= 0 && p.y <= VYSKA_SCENY && Number.isInteger(p.x) && Number.isInteger(p.y);
	}));
	ok(vsude, 'kompas os se vejde do scény a kreslí se v celých pixelech');
}

console.log('— štítky s rozměry: barva osy, vlastní podklad, bez překryvu —');
ok(JSON.stringify(popisky(6, 4, 0, 30).map((p) => [p.text, p.x, p.y, p.barva])) === JSON.stringify([['6 m', 403, 384, '#e03131'], ['4 m', 459, 296, '#2f9e44']]),
	`plocha 6 × 4 m má dva štítky: ${JSON.stringify(popisky(6, 4, 0, 30).map((p) => [p.text, p.x, p.y, p.barva]))}`);
ok(JSON.stringify(popisky(6, 4, 3, 30).map((p) => [p.text, p.x, p.y, p.barva])) === JSON.stringify([['6 m', 387, 392, '#e03131'], ['4 m', 460, 317, '#2f9e44'], ['3 m', 507, 297, '#1971c2']]),
	`kvádr 6 × 4 × 3 m má tři štítky: ${JSON.stringify(popisky(6, 4, 3, 30).map((p) => [p.text, p.x, p.y, p.barva]))}`);
ok(JSON.stringify(popisky(2, 2, 1, 0).map((p) => [p.text, p.x, p.y])) === JSON.stringify([['2 m', 340, 377], ['2 m', 410, 347], ['1 m', 462, 379]]),
	`u nejmenšího tělesa se štítky rozestoupí: ${JSON.stringify(popisky(2, 2, 1, 0).map((p) => [p.text, p.x, p.y]))}`);
ok(popisky(6, 4, 0, 30).length === 2, 'plocha má štítky jen dva — výšku nemá');
ok(popisky(6, 4, 3, 30).map((p) => p.osa).join(',') === 'šířka,hloubka,výška', `štítky popisují šířku, hloubku a výšku (je ${popisky(6, 4, 3, 30).map((p) => p.osa).join(',')})`);
{
	// šířka podkladu štítku podle jeho textu — stejný vzorec jako uvnitř scény,
	// zapsaný tu NEZÁVISLE, aby šlo změřit, že se štítky nepřekrývají
	const ram = (p) => { const w = p.text.length * 9 + 14; return { x1: p.x - Math.round(w / 2), x2: p.x + Math.round(w / 2), y1: p.y - 14, y2: p.y + 10 }; };
	const kriz = (A, B) => A.x1 < B.x2 && B.x1 < A.x2 && A.y1 < B.y2 && B.y1 < A.y2;
	const KOMPAS = { x1: 4, x2: 144, y1: 48, y2: 146 };
	const PLAKETA = { x1: 150, x2: 530, y1: 12, y2: 68 };
	let prekryv = 0, venku = 0, naKompasu = 0, naPlakete = 0, necelé = 0;
	for (const [a, b, c] of kombinace) for (const u of UHLY) {
		const p = popisky(a, b, c, u);
		const r = p.map(ram);
		for (let i = 0; i < r.length; i++) {
			if (r[i].x1 < 0 || r[i].x2 > SIRKA_SCENY || r[i].y1 < 0 || r[i].y2 > VYSKA_SCENY) venku++;
			if (kriz(r[i], KOMPAS)) naKompasu++;
			if (kriz(r[i], PLAKETA)) naPlakete++;
			if (!Number.isInteger(p[i].x) || !Number.isInteger(p[i].y)) necelé++;
			for (let j = i + 1; j < r.length; j++) if (kriz(r[i], r[j])) prekryv++;
		}
	}
	ok(prekryv === 0, `přes všech ${kombinace.length * UHLY.length} pohledů se žádné dva štítky nepřekrývají (překryvů ${prekryv})`);
	ok(venku === 0, `žádný štítek nevyleze ze scény ${SIRKA_SCENY} × ${VYSKA_SCENY} (venku ${venku})`);
	ok(naKompasu === 0, `žádný štítek neleží na kompasu os (kolizí ${naKompasu})`);
	ok(naPlakete === 0, `žádný štítek neleží na plaketě s výsledkem (kolizí ${naPlakete})`);
	ok(necelé === 0, `štítky se kreslí v celých pixelech (necelých ${necelé})`);
}
ok(stitek('6 m', 100, 200, '#e03131') === '<rect x="79" y="186" width="41" height="24" rx="6" fill="#ffffff" stroke="#e03131" stroke-width="2" />'
	+ '<text x="100" y="203" text-anchor="middle" font-size="14" font-weight="bold" fill="#e03131">6 m</text>',
	`štítek má vlastní bílý podklad a text v barvě osy: ${stitek('6 m', 100, 200, '#e03131')}`);
{
	const kratky = stitek('6 m', 100, 200, '#e03131'), dlouhy = stitek('12 m', 100, 200, '#e03131');
	const sirka = (s) => Number(s.match(/width="(\d+)"/)[1]);
	ok(sirka(dlouhy) > sirka(kratky), `delší text dostane širší podklad (${sirka(kratky)} → ${sirka(dlouhy)})`);
	ok(sirka(kratky) >= '6 m'.length * 8, `podklad je širší než samotný text (${sirka(kratky)} px na 3 znaky)`);
	ok(/fill="#ffffff"/.test(kratky), 'podklad štítku je plně bílý (text nad kresbou zůstane čitelný)');
}

console.log('— plaketa uvnitř scény říká, jestli je to plocha, nebo těleso —');
ok(JSON.stringify(plaketa(6, 4, 0)) === JSON.stringify(['PLOCHA (2D) — obdélník 6 × 4 m', 'obsah S = 6 · 4 = 24 m², objem žádný']),
	`plocha: ${JSON.stringify(plaketa(6, 4, 0))}`);
ok(JSON.stringify(plaketa(6, 4, 3)) === JSON.stringify(['TĚLESO (3D) — kvádr 6 × 4 × 3 m', 'objem V = 6 · 4 · 3 = 72 m³']),
	`těleso: ${JSON.stringify(plaketa(6, 4, 3))}`);
ok(plaketa(8, 6, 5)[1] === 'objem V = 8 · 6 · 5 = 240 m³', `největší kvádr: ${plaketa(8, 6, 5)[1]}`);
ok(plaketa(2, 5, 0)[1] === 'obsah S = 2 · 5 = 10 m², objem žádný', `obdélník 2 × 5 m: ${plaketa(2, 5, 0)[1]}`);
{
	const vsechny = kombinace.flatMap(([a, b, c]) => plaketa(a, b, c));
	ok(vsechny.every((r) => /^(PLOCHA \(2D\)|TĚLESO \(3D\)|obsah S =|objem V =)/.test(r)), 'plaketa mluví jen o ploše a tělese, obsahu a objemu — nic navíc');
	ok(!vsechny.some((r) => /povrch|hmotnost|cm|mm|kg/.test(r)), 'na plaketě není povrch ani jiné jednotky, o kterých výklad nemluví');
	ok(kombinace.every(([a, b, c]) => (c === 0) === plaketa(a, b, c)[0].startsWith('PLOCHA')), 'plochou je scéna právě tehdy, když je výška nula');
	// Nejdelší řádek se musí do bílého rámečku VEJÍT. Rámeček je ve zdroji pevný;
	// 9 px na znak je horní odhad pro tučné písmo 15 px, na které SVG spadne.
	const nejdelsi = vsechny.reduce((n, r) => (r.length > n.length ? r : n), '');
	const r = zdroj.match(/<rect x="(\d+)" y="12" width="(\d+)" height="56"/);
	ok(!!r, 'plaketa je ve zdroji obdélník s pevnými rozměry');
	const vnitrek = Number(r[2]) - 4;
	ok(vnitrek >= nejdelsi.length * 9, `nejdelší řádek „${nejdelsi}" (${nejdelsi.length} znaků) se do plakety vejde: ${nejdelsi.length * 9} px ≤ ${vnitrek} px`);
	ok(Number(r[1]) + Number(r[2]) / 2 === 340, `plaketa je souměrná kolem osy textu x = 340 (střed je ${Number(r[1]) + Number(r[2]) / 2})`);
	ok(/<text id="sku-plaketa-1" x="340"/.test(zdroj) && /<text id="sku-plaketa-2" x="340"/.test(zdroj), 'oba řádky plakety jsou vystředěné na x = 340');
}

console.log('— skloňování vrstev —');
ok(vrstvy(1) === '1 vrstva' && vrstvy(2) === '2 vrstvy' && vrstvy(4) === '4 vrstvy' && vrstvy(5) === '5 vrstev',
	`1/2/4/5: ${[1, 2, 4, 5].map(vrstvy).join(' · ')}`);
ok(vrstvy(3) === '3 vrstvy', `3: ${vrstvy(3)}`);

console.log('— výchozí stav scény: modrá plocha bez výšky —');
const teleso = el('sku-teleso'), popiskyEl = el('sku-popisky'), osyEl = el('sku-osy');
const plaketa1 = el('sku-plaketa-1'), plaketa2 = el('sku-plaketa-2');
const vysledekEl = el('sku-vysledek'), radaEl = el('sku-rada');
const pocet = (html, vzor) => (html.match(new RegExp(vzor, 'g')) || []).length;
ok(el('sku-out-a').textContent === '6 m' && el('sku-out-b').textContent === '4 m' && el('sku-out-c').textContent === '0 m' && el('sku-out-o').textContent === '30°',
	`popisky posuvníků: ${[el('sku-out-a'), el('sku-out-b'), el('sku-out-c'), el('sku-out-o')].map((e) => e.textContent).join(' · ')}`);
ok(plaketa1.textContent === 'PLOCHA (2D) — obdélník 6 × 4 m', `plaketa: ${JSON.stringify(plaketa1.textContent)}`);
ok(plaketa2.textContent === 'obsah S = 6 · 4 = 24 m², objem žádný', `plaketa 2. řádek: ${JSON.stringify(plaketa2.textContent)}`);
ok(pocet(teleso.innerHTML, '<polygon') === 1, `plocha je jediný obdélník (polygonů ${pocet(teleso.innerHTML, '<polygon')})`);
ok(/fill="#74c0fc"/.test(teleso.innerHTML), 'vybraná plocha je modrá, jako když ji v SketchUpu vybereš');
ok(teleso.innerHTML.startsWith('<polygon points="292,378 448,333 388,282 232,327" fill="#74c0fc" stroke="#1971c2" stroke-width="4"'),
	`obdélník 6 × 4 m leží na zemi: ${teleso.innerHTML.slice(0, 70)}`);
ok(pocet(teleso.innerHTML, '<line') === 8, `mřížka 1 × 1 m má (6−1) + (4−1) = 8 čar (je ${pocet(teleso.innerHTML, '<line')})`);
ok(pocet(teleso.innerHTML, '<circle') === 0, `na ploše nejsou žádné rysky výšky (je ${pocet(teleso.innerHTML, '<circle')})`);
ok(teleso.innerHTML.includes('<line x1="318" y1="371" x2="258" y2="319"'), `první čára mřížky vede po metru: ${teleso.innerHTML.slice(120, 220)}`);
ok(pocet(popiskyEl.innerHTML, '<rect') === 2, `u plochy jsou dva štítky rozměrů (je ${pocet(popiskyEl.innerHTML, '<rect')})`);
ok(popiskyEl.innerHTML.includes('>6 m</text>') && popiskyEl.innerHTML.includes('>4 m</text>'), 'štítky hlásí 6 m a 4 m');
ok(!popiskyEl.innerHTML.includes('>0 m</text>'), 'nulová výška se jako štítek nekreslí');
ok(osyEl.innerHTML === '<line x1="72" y1="110" x2="124" y2="95" stroke="#e03131" stroke-width="4" stroke-linecap="round" />'
	+ '<line x1="72" y1="110" x2="42" y2="84" stroke="#2f9e44" stroke-width="4" stroke-linecap="round" />'
	+ '<line x1="72" y1="110" x2="72" y2="58" stroke="#1971c2" stroke-width="4" stroke-linecap="round" />'
	+ '<circle cx="72" cy="110" r="5" fill="#2b2a26" />',
	`kompas os: ${osyEl.innerHTML.slice(0, 110)}`);
ok(vysledekEl.innerHTML === '<strong>Teď je to PLOCHA (2D):</strong> obdélník 6 × 4 m<br>obsah S = 6 · 4 = <strong>24 m²</strong> — na ploše napočítáš 24 čtverečků 1 × 1 m<br>4 vrcholy · 4 hrany · 1 plocha · výška 0 → žádný objem',
	`výsledek pod scénou: ${JSON.stringify(vysledekEl.innerHTML)}`);
ok(/Push\/Pull/.test(radaEl.textContent), `rada mluví o nástroji Táhni: ${JSON.stringify(radaEl.textContent)}`);
const plochaKresba = teleso.innerHTML;

console.log('— klik na „Táhni do výšky 3 m": z plochy je těleso —');
klik('sku-tl-tahni');
ok(el('sku-c').value === '3' && el('sku-out-c').textContent === '3 m', `posuvník výšky skočil na 3 m (je ${el('sku-c').value})`);
ok(plaketa1.textContent === 'TĚLESO (3D) — kvádr 6 × 4 × 3 m', `plaketa: ${JSON.stringify(plaketa1.textContent)}`);
ok(plaketa2.textContent === 'objem V = 6 · 4 · 3 = 72 m³', `plaketa 2. řádek: ${JSON.stringify(plaketa2.textContent)}`);
ok(teleso.innerHTML !== plochaKresba, 'scéna se po kliknutí opravdu překreslila');
ok(pocet(teleso.innerHTML, '<polygon') === 3, `z kvádru jsou vidět tři stěny (polygonů ${pocet(teleso.innerHTML, '<polygon')})`);
ok(!/fill="#74c0fc"/.test(teleso.innerHTML), 'modrá vybraná plocha už ve scéně není — je z ní těleso');
ok(teleso.innerHTML.includes('<polygon points="292,378 448,333 448,256 292,301" fill="#dee2e6"'), `přední stěna stojí 78 px vysoko (3 m): ${teleso.innerHTML.slice(0, 90)}`);
ok(teleso.innerHTML.includes('<polygon points="292,301 448,256 388,204 232,249" fill="#f1f3f5"'), 'horní plocha se zvedla o 3 m nad podstavu');
ok(teleso.innerHTML.includes('<line x1="318" y1="293" x2="258" y2="241" stroke="#495057" stroke-width="1" />'),
	`mřížka 1 × 1 m se zvedla nahoru s horní plochou: ${teleso.innerHTML.match(/<line[^>]*>/)[0]}`);
ok(!teleso.innerHTML.includes('y1="371"'), 'mřížka už neleží na zemi — je na vytažené horní ploše');
ok(pocet(teleso.innerHTML, '<line') === 8, `mřížka má pořád (6−1) + (4−1) = 8 čar (je ${pocet(teleso.innerHTML, '<line')})`);
ok(pocet(teleso.innerHTML, '<circle') === 2, `na nejbližší svislé hraně jsou 2 rysky (po 1 m, bez rohů) (je ${pocet(teleso.innerHTML, '<circle')})`);
ok(teleso.innerHTML.includes('<circle cx="292" cy="353" r="4" fill="#f59f00" stroke="#2b2a26" stroke-width="1.5" />')
	&& teleso.innerHTML.includes('<circle cx="292" cy="327" r="4" fill="#f59f00" stroke="#2b2a26" stroke-width="1.5" />'),
	`rysky sedí na hraně po 26 px, tedy po metru, a mají tenký obrys: ${teleso.innerHTML.slice(-120)}`);
ok(pocet(popiskyEl.innerHTML, '<rect') === 3, `u tělesa jsou tři štítky rozměrů (je ${pocet(popiskyEl.innerHTML, '<rect')})`);
ok(popiskyEl.innerHTML.includes('>3 m</text>') && popiskyEl.innerHTML.includes('stroke="#1971c2"'), 'přibyl modrý štítek výšky 3 m');
ok(vysledekEl.innerHTML === '<strong>Teď je to TĚLESO (3D):</strong> kvádr 6 × 4 × 3 m<br>objem V = 6 · 4 · 3 = <strong>72 m³</strong> — 3 vrstvy po 24 krychlích 1 × 1 × 1 m<br>8 vrcholů · 12 hran · 6 stěn',
	`výsledek pod scénou: ${JSON.stringify(vysledekEl.innerHTML)}`);
ok(/šest stěn|6 stěn/.test(radaEl.textContent + vysledekEl.innerHTML), 'scéna říká, že těleso má šest stěn');
const kvadrKresba = teleso.innerHTML;

console.log('— klik na „Orbit o 45°": otočí se pohled, ne rozměry —');
klik('sku-tl-orbit');
ok(el('sku-o').value === '75' && el('sku-out-o').textContent === '75°', `orbit 30° + 45° = 75° (je ${el('sku-o').value})`);
ok(teleso.innerHTML !== kvadrKresba, 'po otočení scéna vypadá jinak');
ok(plaketa2.textContent === 'objem V = 6 · 4 · 3 = 72 m³', 'otáčením se objem nemění — mění se jen pohled');
ok(osyEl.innerHTML !== '<line x1="72" y1="110" x2="124" y2="95" stroke="#e03131" stroke-width="4" stroke-linecap="round" />'
	+ '<line x1="72" y1="110" x2="42" y2="84" stroke="#2f9e44" stroke-width="4" stroke-linecap="round" />'
	+ '<line x1="72" y1="110" x2="72" y2="58" stroke="#1971c2" stroke-width="4" stroke-linecap="round" />'
	+ '<circle cx="72" cy="110" r="5" fill="#2b2a26" />', 'kompas os se otočil spolu s pohledem');
{
	for (let i = 0; i < 7; i++) klik('sku-tl-orbit');
	ok(el('sku-o').value === '30', `osm kliknutí po 45° udělá dvě celá otočení a vrátí pohled na 30° (je ${el('sku-o').value})`);
	ok(Number(el('sku-o').value) >= 0 && Number(el('sku-o').value) < 360, 'orbit se drží v rozsahu 0–359°');
}

console.log('— klik na „Zatlač zpátky na plochu" —');
klik('sku-tl-zpet');
ok(el('sku-c').value === '0', `výška je zpátky na nule (je ${el('sku-c').value})`);
ok(plaketa1.textContent === 'PLOCHA (2D) — obdélník 6 × 4 m', `plaketa je zase u plochy: ${JSON.stringify(plaketa1.textContent)}`);
ok(teleso.innerHTML === plochaKresba, 'scéna vypadá přesně jako na začátku');
ok(pocet(popiskyEl.innerHTML, '<rect') === 2, 'štítek výšky zmizel');

console.log('— posuvníky: největší kvádr 8 × 6 × 5 m —');
posun('sku-a', 8); posun('sku-b', 6); posun('sku-c', 5);
ok(plaketa2.textContent === 'objem V = 8 · 6 · 5 = 240 m³', `plaketa: ${JSON.stringify(plaketa2.textContent)}`);
ok(vysledekEl.innerHTML.includes('5 vrstev po 48 krychlích 1 × 1 × 1 m'), `vrstvy: ${JSON.stringify(vysledekEl.innerHTML)}`);
ok(pocet(teleso.innerHTML, '<line') === 12, `mřížka má (8−1) + (6−1) = 12 čar (je ${pocet(teleso.innerHTML, '<line')})`);
ok(pocet(teleso.innerHTML, '<circle') === 4, `na svislé hraně jsou 4 rysky (5 m bez horního rohu) (je ${pocet(teleso.innerHTML, '<circle')})`);
posun('sku-c', 1);
ok(vysledekEl.innerHTML.includes('1 vrstva po 48 krychlích'), `jedna vrstva se skloňuje správně: ${JSON.stringify(vysledekEl.innerHTML.slice(0, 130))}`);
ok(pocet(teleso.innerHTML, '<circle') === 0, `u výšky 1 m už není co dělit (rysek ${pocet(teleso.innerHTML, '<circle')})`);
posun('sku-a', 2); posun('sku-b', 2); posun('sku-c', 0); posun('sku-o', 30);
ok(plaketa2.textContent === 'obsah S = 2 · 2 = 4 m², objem žádný', `nejmenší plocha: ${JSON.stringify(plaketa2.textContent)}`);
ok(pocet(teleso.innerHTML, '<line') === 2, `mřížka 2 × 2 m má 2 čáry (je ${pocet(teleso.innerHTML, '<line')})`);

console.log('— scéna netvrdí nic, co ve výkladu nestojí —');
const vsechnyTexty = [plaketa1.textContent, plaketa2.textContent, vysledekEl.innerHTML, radaEl.textContent].join(' ');
ok(!/povrch|hmotnost|cena|hustot|kg|litr/i.test(vsechnyTexty), `žádný povrch, hmotnost ani jiná veličina navíc: ${JSON.stringify(vsechnyTexty.slice(0, 60))}`);
ok(!/cm|mm|km/.test(vsechnyTexty), 'scéna počítá jen v metrech, jak je zadaný úkol ve výkladu');
ok(/Push\/Pull|Táhni/.test(zdroj) && /Orbit/.test(zdroj), 'scéna jmenuje nástroje Push/Pull a Orbit z výkladu');
ok(/viewBox="0 0 680 500"/.test(zdroj), 'scéna má pevný viewBox 680 × 500 (počítané rozestupy sedí jen s ním)');
ok(/width: 100%/.test(zdroj) && /max-width: 680px/.test(zdroj), 'SVG se na úzké obrazovce zmenší (mobil)');
ok(/role="img"/.test(zdroj) && /aria-label="/.test(zdroj), 'scéna má popis pro čtečku');
ok(!/classList/.test(skript), 'stav scény se nedrží přes classList — všechno viditelné je atribut v SVG');
ok((skript.match(/type="range"/g) || []).length === 0 && (zdroj.match(/type="range"/g) || []).length === 4, 'scéna má čtyři posuvníky, všechny v HTML části');
ok(/color: #2b2a26/.test(zdroj), 'výsledkový rámeček má vlastní barvu textu, takže je čitelný i v tmavém režimu');

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);

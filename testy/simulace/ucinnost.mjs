#!/usr/bin/env node
// Ověření UcinnostSimulace.astro — účinnost navijáku (F8, mechanická práce a výkon).
//
// Měří se VÝSLEDEK: přes vlastní funkci komponenty `__spocitej(příkon, tření)`
// a přes skutečně nakreslenou scénu (atributy z innerHTML), ne přes text zdroje.
// Očekávané hodnoty jsou v testu napsané NATVRDO — kdyby si je test bral
// z konstant komponenty, mutace konstanty by projela nepovšimnutě.
//
// Co se hlídá:
//  1. energie nikam nezmizí (W = W₀ − Wz) a všechna čísla jsou celá,
//  2. účinnost je opravdu spočítaná z ukázaného P a P₀, nikdy není > 100 %,
//  3. obrázek nelže: větší tření = pytel níž, kratší zelený díl, delší červený,
//     víc vln tepla a větší žár u kladky,
//  3b. žár je OPRAVDU VIDĚT. Samotné „r roste s třením" nestačí: dřív se žár
//     kreslil PŘED kladkou (r = 14 a obrys 3 px, vnější okraj 15,5 px), takže ho
//     bílá výplň kladky ve všech šesti polohách posuvníku celý překryla — test to
//     odkýval, protože měřil atribut, ne viditelnost. Proto se teď hlídá POŘADÍ
//     kresby, poloměr přesahující okraj kladky i to, že přes žár nic nepřekreslí,
//  3c. NIC V KRESBĚ SE NEPŘEKRÝVÁ tak, aby dítě půlku jevu nevidělo: vlny tepla
//     se dřív kreslily PŘED bílým rámečkem popisku „teplo z tření" a ten první
//     vlnu (jedinou při tření 10 W) zpola zakryl; popisek „0" na měřítku výšky
//     protínal 2px obrys země, takže nula vypadala přeškrtnutá. Obojí se teď
//     měří geometricky — pásem, který prvek na obrázku opravdu zabírá,
//  3d. pytel je poznat jako PYTEL (užší zavázané hrdlo, zaoblené dno, přehyb
//     a štítek, který ho pojmenuje) a pořád drží měřítko scény,
//  4. nulové tření (100 %) je ošetřené — červené číslo a hláška o ideálním stroji,
//  5. zaokrouhlení je přiznané (≐) a jen tam, kde se opravdu zaokrouhluje.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2];
if (!cesta) {
	console.log('Použití: node testy/simulace/ucinnost.mjs <komponenta.astro>');
	console.log('Příklad: node testy/simulace/ucinnost.mjs src/components/skola2/UcinnostSimulace.astro');
	process.exit(1);
}
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		// toggle si pamatuje stav: jen tak je vidět, že se rozsvítí stisknuté
		// tlačítko navijáku a druhé zhasne (`p.aktivni`).
		classList: { add() {}, remove() {}, toggle(_trida, stav) { p.aktivni = stav; } },
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

const svg = prvky.get('uci-svg');
const posuvnik = prvky.get('uci-treni');
const spocitej = svg.__spocitej;
const K = svg.__konstanty;
const scena = prvky.get('uci-scena');
const pruh = prvky.get('uci-pruh');
const plaketa = prvky.get('uci-plaketa');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const nastavTreni = (w) => { posuvnik.value = String(w); for (const f of posuvnik.posluchaci.input) f(); };
const prepniMotor = (prikon) => {
	const tl = prvky.get('uci-motor-' + prikon);
	for (const f of tl.posluchaci.click) f({ target: tl });
};
const nastav = (prikon, treni) => { prepniMotor(prikon); nastavTreni(treni); };

/** Vytáhne z nakresleného innerHTML všechny značky daného typu s atributy. */
const prvkyZ = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map((m) => {
	const a = {};
	for (const x of m[1].matchAll(/([\w:-]+)="([^"]*)"/g)) a[x[1]] = x[2];
	return a;
});
const textyZ = (html) => [...html.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => ({
	x: +(/x="([^"]*)"/.exec(m[1]) || [])[1],
	y: +(/y="([^"]*)"/.exec(m[1]) || [])[1],
	text: m[2],
}));
const cistyText = (html) => html.replace(/<[^>]+>/g, '');

/** Pytel se kreslí jako <path> (hrdlo + tělo + zaoblené dno) — tohle z něj
 * vytáhne skutečné rozměry: všechna čísla v `d` jsou souřadnice bodů. */
const pytelZ = (html) => {
	const p = prvkyZ(html, 'path').find((x) => x.fill === '#b08968');
	if (!p) return null;
	const body = [...p.d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
	const xs = body.map((b) => b[0]), ys = body.map((b) => b[1]);
	const x = Math.min(...xs), x2 = Math.max(...xs);
	const y = Math.min(...ys), dno = Math.max(...ys);
	const hrdlo = body.filter((b) => b[1] === y).map((b) => b[0]);
	return {
		x, x2, y, dno, width: x2 - x, height: dno - y,
		sirkaHrdla: Math.max(...hrdlo) - Math.min(...hrdlo),
		stredHrdla: (Math.max(...hrdlo) + Math.min(...hrdlo)) / 2,
		stred: (x + x2) / 2,
		obrys: +p['stroke-width'],
		zaobleni: (p.d.match(/Q/g) ?? []).length,
	};
};

/** Pás, který vlna tepla na obrázku opravdu zabírá. `M x y` je absolutní,
 * každé `q dx1 dy1 dx dy` je relativní oblouk — jeho vrchol leží v t = 0,5,
 * tedy y + 0,5·dy1 + 0,25·dy. Přidává se i polovina obrysu, protože právě
 * ta se schová pod bílým rámečkem. */
const vlnaPas = (p) => {
	const c = [...p.d.matchAll(/-?[\d.]+/g)].map((m) => +m[0]);
	let x = c[0], y = c[1];
	const xs = [x], ys = [y];
	for (let i = 2; i + 4 <= c.length; i += 4) {
		const [dx1, dy1, dx, dy] = c.slice(i, i + 4);
		xs.push(x + 0.5 * dx1 + 0.25 * dx);
		ys.push(y + 0.5 * dy1 + 0.25 * dy);
		x += dx; y += dy;
		xs.push(x); ys.push(y);
	}
	const w = +p['stroke-width'] / 2;
	return { x1: Math.min(...xs) - w, x2: Math.max(...xs) + w, y1: Math.min(...ys) - w, y2: Math.max(...ys) + w };
};

/** Pás vyplněné plochy (obdélník i kružnice) včetně poloviny obrysu. */
const plochaPas = (o) => {
	const w = +(o['stroke-width'] ?? 0) / 2;
	if (o.width !== undefined) return { x1: +o.x - w, x2: +o.x + +o.width + w, y1: +o.y - w, y2: +o.y + +o.height + w };
	const r = +o.r + w;
	return { x1: +o.cx - r, x2: +o.cx + r, y1: +o.cy - r, y2: +o.cy + r };
};

/** Pás textu: odhad glyfu (šířka ≈ 0,58 velikosti písma, výška od základny). */
const textPas = (t, velikost, znaku) => ({
	x1: t.x - znaku * velikost * 0.58, x2: t.x,
	y1: t.y - velikost * 0.75, y2: t.y + velikost * 0.08,
});

const kryji = (a, b) => a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;

// ── ČÍSLA Z VÝKLADU ─────────────────────────────────────────────────────────
console.log('— konstanty odpovídají výkladu —');
ok(K.G === 10, `g = ${K.G} N/kg — hodnota z výkladu`);
ok(K.HMOTNOST === 10, `pytel malty má ${K.HMOTNOST} kg`);
ok(K.TIHA === 100, `tíha pytle F_g = m · g = ${K.TIHA} N (10 kg · 10 N/kg)`);
ok(K.DOBA === 10, `naviják běží ${K.DOBA} s — z toho se počítá práce W = P · t`);

// ── VÝCHOZÍ STAV ────────────────────────────────────────────────────────────
console.log('\n— výchozí stav scény —');
ok(posuvnik.value === '20', `scéna se otevírá s běžným třením 20 W (${posuvnik.value})`);
{
	const v = spocitej(120, 20);
	ok(v.vykon === 100 && v.ucinnost === 83,
		`výchozí nastavení dává 100 W ze 120 W, tedy ${v.ucinnost} % — týž poměr jako kladkostroj z výkladu (0,4 : 0,48)`);
	ok(prvky.get('uci-out').textContent.startsWith('20 W'),
		`popis posuvníku ukazuje wattové tření: „${prvky.get('uci-out').textContent}"`);
	// Scéna se kreslí JEŠTĚ PŘED prvním kliknutím — musí tedy sama od sebe
	// ukazovat týž naviják, který má v HTML zvýrazněné tlačítko (120 W).
	ok(textyZ(scena.innerHTML).some((x) => x.text === 'P₀ = 120 W'),
		'hned po otevření kreslí scéna silnější naviják 120 W, bez jediného kliknutí');
	ok(/id="uci-motor-120"[^>]*uci-aktivni/.test(zdroj) && !/id="uci-motor-100"[^>]*uci-aktivni/.test(zdroj),
		'a zvýrazněné je v HTML právě tlačítko 120 W, ne to druhé');
	ok(cistyText(prvky.get('uci-vypocet').innerHTML).includes('P₀ = 120 W, dodaná práce je tedy W₀ = P₀ · t = 120 · 10 = 1200 J'),
		'věta pod scénou počítá od začátku s týmž příkonem 120 W');
}

// ── TABULKA VŠECH POLOH: celá čísla, zachování energie, účinnost ────────────
// [příkon, tření, výkon, užitečná J, ztráta J, výška m, účinnost %, zaokrouhleno]
const TABULKA = [
	[100, 0, 100, 1000, 0, 10, 100, false],
	[100, 10, 90, 900, 100, 9, 90, false],
	[100, 20, 80, 800, 200, 8, 80, false],
	[100, 30, 70, 700, 300, 7, 70, false],
	[100, 40, 60, 600, 400, 6, 60, false],
	[100, 50, 50, 500, 500, 5, 50, false],
	[120, 0, 120, 1200, 0, 12, 100, false],
	[120, 10, 110, 1100, 100, 11, 92, true],
	[120, 20, 100, 1000, 200, 10, 83, true],
	[120, 30, 90, 900, 300, 9, 75, false],
	[120, 40, 80, 800, 400, 8, 67, true],
	[120, 50, 70, 700, 500, 7, 58, true],
];

console.log('\n— všech dvanáct nastavení: celá čísla a zachování energie —');
for (const [prikon, treni, vykon, uzitecna, ztracena, vyska, ucinnost, zaokr] of TABULKA) {
	const v = spocitej(prikon, treni);
	ok(v.vykon === vykon && v.dodana === prikon * 10 && v.uzitecna === uzitecna && v.ztracena === ztracena,
		`${prikon} W / tření ${treni} W → P = ${v.vykon} W, W₀ = ${v.dodana} J, W = ${v.uzitecna} J, ztráta ${v.ztracena} J`);
	ok(v.uzitecna + v.ztracena === v.dodana,
		`${prikon} W / ${treni} W: ${v.uzitecna} + ${v.ztracena} = ${v.dodana} J — energie nikam nezmizí ani nepřibude`);
	ok([v.vykon, v.dodana, v.uzitecna, v.ztracena, v.vyska].every(Number.isInteger) && v.vyska === vyska,
		`${prikon} W / ${treni} W: výška ${v.vyska} m i všechna čísla jsou celá`);
	ok(v.vyska * K.TIHA === v.uzitecna,
		`${prikon} W / ${treni} W: výška sedí s prací, W = F_g · h = ${K.TIHA} · ${v.vyska} = ${v.uzitecna} J`);
	ok(v.ucinnost === ucinnost && v.ucinnost === Math.round((v.vykon * 100) / prikon),
		`${prikon} W / ${treni} W: účinnost ${v.ucinnost} % je spočítaná z P : P₀, ne napsaná natvrdo`);
	ok(v.zaokrouhleno === zaokr,
		`${prikon} W / ${treni} W: ${zaokr ? 'zaokrouhlení se přiznává' : 'procenta vycházejí přesně'}`);
	ok(v.ucinnost <= 100 && v.vykon <= prikon,
		`${prikon} W / ${treni} W: účinnost nepřekročí 100 % (${v.ucinnost} %) — výkon nemůže být větší než příkon`);
	ok(v.idealni === (treni === 0),
		`${prikon} W / ${treni} W: ${treni === 0 ? 'nulové tření je označené jako ideální stroj' : 'se třením už o ideální stroj nejde'}`);
	if (treni > 0) ok(v.ucinnost < 100, `${prikon} W / ${treni} W: se třením je účinnost ${v.ucinnost} %, tedy menší než 100 %`);
}

console.log('\n— větší tření = menší účinnost i menší výška (nikde to neskočí obráceně) —');
for (const prikon of [100, 120]) {
	let klesa = true;
	for (let treni = 10; treni <= 50; treni += 10) {
		const drive = spocitej(prikon, treni - 10), nyni = spocitej(prikon, treni);
		if (!(nyni.ucinnost < drive.ucinnost && nyni.vyska < drive.vyska && nyni.ztracena > drive.ztracena)) klesa = false;
	}
	ok(klesa, `${prikon} W: s každým krokem posuvníku klesá účinnost i výška a roste ztráta`);
}

// ── SCÉNA: obrázek nesmí lhát ───────────────────────────────────────────────
console.log('\n— pytel visí v té výšce, kterou počítá vzorec —');
for (const [prikon, treni, , , , vyska] of TABULKA) {
	nastav(prikon, treni);
	const pytel = pytelZ(scena.innerHTML);
	const ocekY = 360 - vyska * 18 - 11; // zem 360 px, 18 px na metr, pytel 11 px vysoký
	ok(pytel && pytel.height === 11 && pytel.y === ocekY,
		`${prikon} W / tření ${treni} W → h = ${vyska} m, pytel nakreslen na y = ${pytel?.y} (má být ${ocekY})`);
}

console.log('\n— pytel je velký jako pytel, ne jako dům (rozměry sedí s měřítkem) —');
{
	nastav(120, 20);
	const pytel = pytelZ(scena.innerHTML);
	const vysM = pytel.height / 18, sirM = pytel.width / 18; // 18 px = 1 m
	ok(pytel.height === 11 && vysM.toFixed(2) === '0.61',
		`pytel malty je ${pytel.height} px vysoký, v měřítku scény tedy ${vysM.toFixed(2)} m`);
	ok(pytel.width === 10 && sirM.toFixed(2) === '0.56',
		`a ${pytel.width} px široký, tedy ${sirM.toFixed(2)} m — pytel, ne kontejner`);
	ok(vysM <= 0.65 && sirM <= 0.65, `oba rozměry drží pod 0,65 m (${vysM.toFixed(2)} m × ${sirM.toFixed(2)} m), jak pytel malty vypadá`);
	ok(pytel.stred === 166 && pytel.stredHrdla === 166, `pytel visí hrdlem přesně na laně (x = ${pytel.stredHrdla})`);
	ok(pytel.obrys === 1.5,
		`obrys pytle je ${pytel.obrys} px — tenký, aby se u 11px pytle nesežral celou hnědou výplň`);
}

// Nález nezávislé kontroly: obdélníček 9 × 8 px byl sice věrný měřítku, ale na
// konci lana vypadal jako uzlík nebo karabina — že jde o náklad, prozradil jen
// štítek „10 kg". Proto se teď měří TVAR: zavázané hrdlo musí být užší než tělo,
// dno zaoblené dvěma křivkami a přehyb vykreslený jinou barvou než výplň.
console.log('\n— pytel je na obrázku POZNAT jako pytel (hrdlo, přehyb, zaoblené dno) —');
for (const [prikon, treni] of [[120, 20], [100, 50], [120, 0]]) {
	nastav(prikon, treni);
	const pytel = pytelZ(scena.innerHTML);
	ok(pytel, `${prikon} W / ${treni} W: pytel se kreslí jako obrys pytle (path), ne jako obdélníček`);
	ok(pytel.sirkaHrdla === 6 && pytel.sirkaHrdla < pytel.width - 2,
		`${prikon} W / ${treni} W: zavázané hrdlo je ${pytel.sirkaHrdla} px, tedy zřetelně užší než tělo (${pytel.width} px)`);
	ok(pytel.sirkaHrdla / 18 <= 0.4, `${prikon} W / ${treni} W: hrdlo má v měřítku ${(pytel.sirkaHrdla / 18).toFixed(2)} m — dá se vzít do ruky`);
	ok(pytel.zaobleni === 2, `${prikon} W / ${treni} W: dno pytle je zaoblené dvěma křivkami (Q ${pytel.zaobleni}×), pytel nestojí na hranách`);
	const prehyb = prvkyZ(scena.innerHTML, 'line').find((l) => l.stroke === '#7f5539');
	ok(prehyb && +prehyb.y1 === pytel.y + 4 && +prehyb.y1 === +prehyb.y2,
		`${prikon} W / ${treni} W: přehyb pod hrdlem je vodorovný a v horní čtvrtině pytle (y = ${prehyb?.y1}, pytel začíná na ${pytel.y})`);
	ok(prehyb && +prehyb.x1 === pytel.x && +prehyb.x2 === pytel.x2,
		`${prikon} W / ${treni} W: přehyb jde přes celou šířku pytle (${prehyb?.x1} → ${prehyb?.x2})`);
	ok(prehyb && prehyb.stroke !== '#b08968',
		`${prikon} W / ${treni} W: přehyb má tmavší barvu než výplň (${prehyb?.stroke}), jinak by na pytli nebyl vidět`);
	const nazev = textyZ(scena.innerHTML).find((x) => x.text === 'pytel malty');
	ok(nazev, `${prikon} W / ${treni} W: štítek náklad i POJMENUJE („pytel malty"), ne že visí jen hmotnost`);
	const lano = prvkyZ(scena.innerHTML, 'line').find((l) => +l.x1 === 166 && +l.x2 === 166 && +l.y1 === 52);
	ok(lano && +lano.y2 === pytel.y, `${prikon} W / ${treni} W: lano končí přesně na hrdle pytle (y = ${lano?.y2})`);
}

console.log('\n— modrý ukazatel výšky sahá od země k pytli —');
{
	nastav(120, 20);
	const modry = prvkyZ(scena.innerHTML, 'line').find((l) => l.stroke === '#1971c2' && +l['stroke-width'] === 6);
	ok(modry && +modry.y1 === 360 && +modry.y2 === 180,
		`při 10 m vede modrý pruh od y = ${modry?.y1} (zem) k y = ${modry?.y2} (spodek pytle)`);
	nastav(100, 50);
	const nizky = prvkyZ(scena.innerHTML, 'line').find((l) => l.stroke === '#1971c2' && +l['stroke-width'] === 6);
	ok(nizky && +nizky.y2 === 270, `při 5 m je kratší — končí na y = ${nizky?.y2} (${360 - 270} px = 5 m)`);
	const carkovana = prvkyZ(scena.innerHTML, 'line').find((l) => l['stroke-dasharray']);
	ok(carkovana && +carkovana.y1 === 270 && +carkovana.y2 === 270 && +carkovana.x1 === 110 && +carkovana.x2 === 162,
		`čárkovaná spojnice vede vodorovně od měřítka k pytli přesně v jeho spodku (y = ${carkovana?.y2})`);
}

console.log('\n— měřítko výšky je popsané po dvou metrech —');
{
	nastav(120, 20);
	const t = textyZ(scena.innerHTML);
	const cisla = t.filter((x) => /^\d+$/.test(x.text)).map((x) => +x.text);
	ok(cisla.join() === '0,2,4,6,8,10,12', `měřítko má značky ${cisla.join(', ')} m — po dvou metrech až k dosažitelnému maximu`);
	const nula = t.find((x) => x.text === '0'), dvanact = t.find((x) => x.text === '12');
	ok(nula.y === 355 && dvanact.y === 149, `nula je u země (y = ${nula.y}) a 12 m nahoře (y = ${dvanact.y})`);
	const osa = prvkyZ(scena.innerHTML, 'line').find((l) => l.stroke === '#868e96' && +l.x1 === 110 && +l.y1 === 360);
	ok(osa && +osa.y2 === 144, `osa měřítka končí na y = ${osa?.y2}, tedy přesně u dvanácti metrů`);
}

console.log('\n— štítek s výškou má vlastní podklad a správné číslo —');
{
	nastav(120, 40);
	const stitek = textyZ(scena.innerHTML).find((x) => x.text.startsWith('h ='));
	ok(stitek && stitek.text === 'h = 8 m', `štítek říká „${stitek?.text}" (120 W, tření 40 W → 800 J : 100 N = 8 m)`);
	const podklad = prvkyZ(scena.innerHTML, 'rect').find((r) => +r.x === 126 && +r.y === 300);
	ok(podklad && podklad.fill === '#ffffff', 'a sedí na vlastním bílém podkladu — přes kresbu zůstane čitelný');
	const kg = textyZ(scena.innerHTML).find((x) => x.text === '10 kg');
	const pytel = pytelZ(scena.innerHTML);
	const stitekKg = prvkyZ(scena.innerHTML, 'rect').find((r) => +r.width === 86 && +r.height === 34);
	ok(kg && kg.y === pytel.y + 19, `hmotnost „${kg?.text}" visí v jedné výšce s pytlem (y = ${kg?.y}, pytel začíná na ${pytel.y})`);
	ok(stitekKg && stitekKg.fill === '#ffffff' && +stitekKg.x > pytel.x2 && +stitekKg.y === pytel.y - 9,
		`a má vlastní bílý štítek VEDLE pytle (x = ${stitekKg?.x} za pytlem, který končí na ${pytel.x2}) — do 11px pytle by se nevešla`);
	ok(kg && kg.x > +stitekKg.x && kg.x < +stitekKg.x + +stitekKg.width, `nápis leží uvnitř svého štítku (x = ${kg?.x})`);
	const nazev = textyZ(scena.innerHTML).find((x) => x.text === 'pytel malty');
	ok(nazev && nazev.y === pytel.y + 3 && nazev.y < kg.y,
		`nad hmotností stojí na tomtéž štítku i název nákladu (y = ${nazev?.y}, hmotnost ${kg?.y})`);
	const pasNazvu = textPas(nazev, 12, 'pytel malty'.length);
	ok(pasNazvu.y1 > +stitekKg.y && kg.y < +stitekKg.y + +stitekKg.height,
		`oba řádky se vejdou dovnitř štítku (název od ${pasNazvu.y1}, hmotnost po ${kg.y}, štítek ${stitekKg.y}–${+stitekKg.y + +stitekKg.height})`);
}

console.log('\n— teplo z tření je vidět a roste s třením —');
{
	nastav(120, 0);
	ok(!scena.innerHTML.includes('#ff922b') && !scena.innerHTML.includes('teplo z tření'),
		'bez tření se žádné teplo nekreslí — nebylo by z čeho');
	const zary = [];
	for (const treni of [10, 20, 30, 40, 50]) {
		nastav(120, treni);
		const zar = prvkyZ(scena.innerHTML, 'circle').find((c) => c.fill === '#ff922b');
		const vlny = prvkyZ(scena.innerHTML, 'path').filter((p) => p.stroke === '#e8590c');
		zary.push(zar ? +zar.r : null);
		ok(vlny.length === treni / 10, `tření ${treni} W → ${vlny.length} vln tepla (jedna na každých 10 W)`);
		ok(scena.innerHTML.includes('teplo z tření'), `tření ${treni} W: u kladky je popiska „teplo z tření"`);
	}
	ok(zary.join() === '16,18,20,22,24', `žár u kladky roste s třením (r = ${zary.join(', ')} px)`);
	const zar = prvkyZ(scena.innerHTML, 'circle').find((c) => c.fill === '#ff922b');
	ok(zar.opacity === '0.55', `žár je průhledný (opacity ${zar.opacity}), takže kladka pod ním zůstane vidět`);
	nastav(120, 50);
	const vlnyY = prvkyZ(scena.innerHTML, 'path').filter((p) => p.stroke === '#e8590c').map((p) => +/M 204 (\d+)/.exec(p.d)[1]);
	ok(vlnyY.join() === '124,140,156,172,188', `vlny leží pod sebou v řadě (y = ${vlnyY.join(', ')}), nekupí se na jednom místě`);
}

// Tahle kontrola vznikla z vady, kterou test dřív ODKÝVAL: žár se kreslil PŘED
// kladkou a bílá kladka (r = 14, obrys 3 px → vnější okraj 15,5 px) ho ve všech
// polohách posuvníku celý zakryla. Atribut `r` přitom rostl, takže „žár roste
// s třením" vycházelo zeleně, i když na obrázku nebyl vidět ani pixel. Proto se
// měří VIDITELNOST: pořadí kresby, přesah přes okraj kladky a to, že přes žár
// už nic neprůhledného nepřekreslí.
console.log('\n— žár je na obrázku OPRAVDU VIDĚT, ne schovaný pod kladkou —');
{
	const OKRAJ_KLADKY = 14 + 3 / 2; // r kladky + polovina obrysu = 15,5 px
	for (const treni of [10, 20, 30, 40, 50]) {
		nastav(120, treni);
		const html = scena.innerHTML;
		const iZar = html.indexOf('fill="#ff922b"');
		const iKladka = html.indexOf('r="14" fill="#ffffff"');
		const iOsa = html.indexOf('r="4" fill="#2b2a26"');
		ok(iKladka !== -1 && iOsa !== -1 && iZar > iKladka && iZar > iOsa,
			`tření ${treni} W: žár se kreslí AŽ PO kladce (znak ${iZar} proti ${iKladka}), takže ho bílá kladka nepřekryje`);
		const zar = prvkyZ(html, 'circle').find((c) => c.fill === '#ff922b');
		ok(zar && +zar.r > OKRAJ_KLADKY,
			`tření ${treni} W: žár má r = ${zar?.r} px, tedy přesahuje vnější okraj kladky (${OKRAJ_KLADKY} px) — kolem kladky svítí prstenec`);
		// nic vyplněného, co by se přes žár nakreslilo později, ho nesmí zakrýt
		const pozdeji = html.slice(iZar);
		const r = +zar.r;
		const prekryvy = [...prvkyZ(pozdeji, 'rect'), ...prvkyZ(pozdeji, 'circle')].filter((o) => {
			if (!o.fill || o.fill === 'none') return false;
			const x1 = o.width !== undefined ? +o.x : +o.cx - +o.r;
			const x2 = o.width !== undefined ? +o.x + +o.width : +o.cx + +o.r;
			const y1 = o.height !== undefined ? +o.y : +o.cy - +o.r;
			const y2 = o.height !== undefined ? +o.y + +o.height : +o.cy + +o.r;
			return x1 < 180 + r && x2 > 180 - r && y1 < 52 + r && y2 > 52 - r;
		});
		ok(prekryvy.length === 0,
			`tření ${treni} W: po žáru se přes kladku nekreslí žádná plocha (${prekryvy.length} překryvů) — zůstane vidět`);
	}
}

// Nález nezávislé kontroly: vlny tepla se kreslily PŘED bílým rámečkem popisku
// „teplo z tření" (y 86–108), takže první vlna (y = 110, oblouky sahaly k 104)
// byla zpola zakrytá — a při tření 10 W je to JEDINÁ vlna, dítě tedy vidělo jen
// její půlku. Kontrola „počet vln" i „vlny leží pod sebou" to odkývaly, protože
// měřily atribut, ne obrázek. Proto se měří PÁS, který vlna na obrázku zabírá
// (oblouky ±4,5 px i polovina obrysu), proti pásům všech vyplněných ploch.
console.log('\n— vlny tepla jsou CELÉ vidět: žádná plocha je nezakrývá —');
for (const prikon of [100, 120]) {
	for (const treni of [10, 20, 30, 40, 50]) {
		nastav(prikon, treni);
		const html = scena.innerHTML;
		const vlny = prvkyZ(html, 'path').filter((p) => p.stroke === '#e8590c').map(vlnaPas);
		const pytel = pytelZ(html);
		const plochy = [...prvkyZ(html, 'rect'), ...prvkyZ(html, 'circle')]
			.filter((o) => o.fill && o.fill !== 'none')
			.map(plochaPas)
			.concat([{ x1: pytel.x, x2: pytel.x2, y1: pytel.y, y2: pytel.dno }]);
		const zakryte = vlny.filter((vl) => plochy.some((pl) => kryji(vl, pl)));
		ok(vlny.length === treni / 10 && zakryte.length === 0,
			`${prikon} W / tření ${treni} W: všech ${vlny.length} vln leží mimo každou vyplněnou plochu (zakrytých ${zakryte.length})`);
		// zvlášť ten rámeček, o který šlo: musí být NAD vlnami s mezerou
		const ramecek = prvkyZ(html, 'rect').find((r) => r.stroke === '#e8590c');
		const prvni = vlny[0];
		const pas = plochaPas(ramecek);
		ok(ramecek && pas.y2 <= prvni.y1,
			`${prikon} W / tření ${treni} W: rámeček „teplo z tření" končí na y = ${pas.y2} a první vlna začíná až na ${prvni.y1} — nezakrývá ji`);
		ok(prvni.y1 - pas.y2 >= 2 && prvni.y1 - pas.y2 <= 30,
			`${prikon} W / tření ${treni} W: mezera mezi rámečkem a první vlnou je ${prvni.y1 - pas.y2} px — vidět, ale drží u sebe`);
	}
}

console.log('\n— popisky měřítka nejsou přeškrtnuté žádnou čárou —');
for (const [prikon, treni] of [[120, 20], [100, 50]]) {
	nastav(prikon, treni);
	const html = scena.innerHTML;
	const zem = prvkyZ(html, 'rect').find((r) => r.fill === '#ced4da');
	const w = +zem['stroke-width'] / 2;
	// horní hrana země je čára o tloušťce stroke-width — právě ta vedla přes nulu
	const hrana = { x1: +zem.x - w, x2: +zem.x + +zem.width + w, y1: +zem.y - w, y2: +zem.y + w };
	const cisla = textyZ(html).filter((x) => /^\d+$/.test(x.text));
	const protnute = cisla.filter((x) => kryji(textPas(x, 12, x.text.length), hrana));
	ok(cisla.length === 7 && protnute.length === 0,
		`${prikon} W / ${treni} W: ani jeden z ${cisla.length} popisků měřítka neprotíná hranu země (protnutých ${protnute.length}${protnute.length ? ': ' + protnute.map((x) => x.text).join(',') : ''})`);
	const nula = cisla.find((x) => x.text === '0');
	const pasNuly = textPas(nula, 12, 1);
	ok(pasNuly.y2 < hrana.y1, `${prikon} W / ${treni} W: nula sedí celá nad zemí (glyf končí na ${pasNuly.y2}, hrana začíná na ${hrana.y1})`);
	ok(+zem.y - nula.y === 5, `${prikon} W / ${treni} W: a přitom zůstane u své značky — základna je ${+zem.y - nula.y} px nad úrovní země`);
}

// ── ENERGETICKÝ PRUH ────────────────────────────────────────────────────────
console.log('\n— pruh: zelený díl je užitek, červený ztráta, dohromady dodaná práce —');
for (const [prikon, treni, , uzitecna, ztracena] of TABULKA) {
	nastav(prikon, treni);
	const r = prvkyZ(pruh.innerHTML, 'rect').filter((x) => +x.height === 40);
	const zeleny = r.find((x) => x.fill === '#2f9e44'), cerveny = r.find((x) => x.fill === '#e03131');
	ok(zeleny && +zeleny.x === 356 && +zeleny.y === 78 && +zeleny.width === uzitecna * 0.2,
		`${prikon} W / ${treni} W: zelený díl má ${zeleny?.width} px = ${uzitecna} J · 0,2 px/J`);
	ok(cerveny && +cerveny.width === ztracena * 0.2 && +cerveny.x === 356 + uzitecna * 0.2,
		`${prikon} W / ${treni} W: červená ztráta (${cerveny?.width} px) navazuje přesně na zelenou (x = ${cerveny?.x})`);
	ok(+zeleny.width + +cerveny.width === prikon * 10 * 0.2,
		`${prikon} W / ${treni} W: dohromady ${+zeleny.width + +cerveny.width} px = celá dodaná práce ${prikon * 10} J`);
	ok(+cerveny.x + +cerveny.width <= 640, `${prikon} W / ${treni} W: pruh se vejde do scény (končí na ${+cerveny.x + +cerveny.width} px z 660)`);
}

console.log('\n— popisky pruhu mluví o týchž číslech, jaká pruh kreslí —');
{
	nastav(100, 30);
	const t = textyZ(pruh.innerHTML).map((x) => x.text);
	ok(t.some((x) => x === 'W₀ = P₀ · t = 100 · 10 = 1000 J'), `dodaná práce je rozepsaná vzorcem: „${t[1]}"`);
	ok(t.some((x) => x === 'užitečná práce W = 700 J'), 'zelený díl je popsaný 700 J');
	ok(t.some((x) => x === 'ztráta 300 J → teplo z tření'), 'červený díl je popsaný 300 J a pojmenovaným teplem');
	ok(t.some((x) => x === 'W = Fg · h = 100 · 7 = 700 J'), 'a je vidět i kontrola z tíhy a výšky: 100 · 7 = 700 J');
	ok(!pruh.innerHTML.includes('F_g'), 'a značka tíhy je psaná Fg, ne programátorským podtržítkem F_g');
	const legenda = prvkyZ(pruh.innerHTML, 'rect').filter((x) => +x.width === 14);
	ok(legenda.length === 2 && legenda[0].fill === '#2f9e44' && legenda[1].fill === '#e03131',
		'legenda má dvě políčka v témže pořadí a barvách jako pruh');
	ok(legenda.map((x) => +x.x).join() === '356,356', `a stojí pod pruhem v jednom sloupci (x = ${legenda.map((x) => x.x).join(', ')})`);
	const popisky = textyZ(pruh.innerHTML).filter((x) => x.y === 148 || x.y === 170);
	ok(popisky.length === 2 && popisky.every((x) => x.x === 378),
		`oba popisky legendy začínají vedle svého políčka (x = ${popisky.map((x) => x.x).join(', ')}), ne na něm`);
}

// ── PLAKETA S ÚČINNOSTÍ ─────────────────────────────────────────────────────
console.log('\n— plaketa počítá účinnost z ukázaných hodnot —');
for (const [prikon, treni, vykon, , , , ucinnost, zaokr] of TABULKA) {
	nastav(prikon, treni);
	const t = textyZ(plaketa.innerHTML).map((x) => x.text);
	ok(t.includes('účinnost η = P : P₀'), `${prikon} W / ${treni} W: plaketa uvádí vzorec η = P : P₀`);
	const dosazeni = textyZ(plaketa.innerHTML).find((x) => x.text === `= ${vykon} W : ${prikon} W`);
	ok(dosazeni, `${prikon} W / ${treni} W: dosazení „= ${vykon} W : ${prikon} W"`);
	ok(dosazeni && dosazeni.x === 492, `${prikon} W / ${treni} W: a stojí na střed plakety (x = ${dosazeni?.x}) pod svým nadpisem`);
	const vysledekPrvek = textyZ(plaketa.innerHTML).find((x) => x.text.endsWith('%'));
	ok(vysledekPrvek.x === 492, `${prikon} W / ${treni} W: výsledek stojí na střed plakety (x = ${vysledekPrvek.x})`);
	const vysledek = t.find((x) => x.endsWith('%'));
	ok(vysledek === `${zaokr ? '≐' : '='} ${ucinnost} %`,
		`${prikon} W / ${treni} W: výsledek „${vysledek}" — ${zaokr ? 'se znakem ≐ pro zaokrouhlení' : 'přesně s rovnítkem'}`);
	ok(+/(\d+) %/.exec(vysledek)[1] === Math.round((vykon * 100) / prikon),
		`${prikon} W / ${treni} W: a to číslo je opravdu P : P₀, ne nic jiného`);
	ok(t.some((x) => x.includes(zaokr ? 'zaokrouhleno na celá procenta' : 'vycházejí přesně')),
		`${prikon} W / ${treni} W: pod číslem je napsáno, ${zaokr ? 'že jde o zaokrouhlení' : 'že se nezaokrouhluje'}`);
}

console.log('\n— nulové tření (100 %) je ošetřené jako ideální stroj —');
{
	nastav(120, 0);
	const velke = textyZ(plaketa.innerHTML).find((x) => x.text.endsWith('%'));
	ok(velke.text === '= 100 %', `při nulovém tření vyjde „${velke.text}"`);
	ok(/font-size="30"[^>]*fill="#c92a2a"/.test(plaketa.innerHTML) || /fill="#c92a2a"[^>]*font-size="30"/.test(plaketa.innerHTML),
		'číslo je červené, ne modré jako běžný výsledek');
	const varovani = textyZ(plaketa.innerHTML).map((x) => x.text).join(' ');
	ok(varovani.includes('IDEÁLNÍ stroj') && varovani.includes('neexistuje'),
		'a scéna hlásí, že 100 % umí jen ideální stroj, který neexistuje');
	const ramec = prvkyZ(plaketa.innerHTML, 'rect').find((r) => r.fill === '#fff3bf');
	ok(ramec && ramec.stroke === '#c92a2a', 'hláška má vlastní žlutý podklad s červeným rámem');
	nastav(120, 10);
	ok(!plaketa.innerHTML.includes('#fff3bf') && !plaketa.innerHTML.includes('IDEÁLNÍ'),
		'jakmile se tření objeví, varování zmizí — už nejde o ideální stroj');
	ok(/font-size="30"[^>]*fill="#1971c2"/.test(plaketa.innerHTML) || /fill="#1971c2"[^>]*font-size="30"/.test(plaketa.innerHTML),
		'a číslo se vrátí do modré');
}

// ── VĚTA POD SCÉNOU ─────────────────────────────────────────────────────────
console.log('\n— věta pod scénou dopočítá totéž, co scéna kreslí —');
for (const [prikon, treni, vykon, uzitecna, ztracena, vyska, ucinnost, zaokr] of [TABULKA[3], TABULKA[7], TABULKA[11]]) {
	nastav(prikon, treni);
	const t = cistyText(prvky.get('uci-vypocet').innerHTML);
	ok(t.includes(`W₀ = P₀ · t = ${prikon} · 10 = ${prikon * 10} J`), `${prikon} W / ${treni} W: dodaná práce ${prikon * 10} J`);
	ok(t.includes(`P = ${prikon} − ${treni} = ${vykon} W`), `${prikon} W / ${treni} W: užitečný výkon ${vykon} W`);
	ok(t.includes(`W = P · t = ${uzitecna} J`) && t.includes(`${ztracena} J odejde jako teplo`),
		`${prikon} W / ${treni} W: užitečná práce ${uzitecna} J a ztráta ${ztracena} J`);
	ok(t.includes(`Fg = m · g = 10 · 10 = 100 N`) && t.includes(`h = W : Fg = ${uzitecna} : 100 = ${vyska} m`),
		`${prikon} W / ${treni} W: tíha 100 N a výška ${vyska} m`);
	ok(t.includes(`η = P : P₀ = ${vykon} : ${prikon} ${zaokr ? '≐' : '='} ${ucinnost} %`),
		`${prikon} W / ${treni} W: účinnost ${ucinnost} % ${zaokr ? 'se znakem ≐' : 'přesně'}`);
	ok(t.includes(`W : W₀ = ${uzitecna} : ${prikon * 10}`),
		`${prikon} W / ${treni} W: a je ukázané, že z prací vyjde stejný poměr`);
	ok(zaokr === t.includes('(zaokrouhleno na celá procenta)'),
		`${prikon} W / ${treni} W: slovo o zaokrouhlení je jen tam, kde se opravdu zaokrouhluje`);
}

console.log('\n— značka tíhy je psaná jako ve výkladu: F<sub>g</sub> —');
{
	nastav(120, 20);
	const html = prvky.get('uci-vypocet').innerHTML;
	ok((html.match(/F<sub>g<\/sub>/g) || []).length === 2,
		`tíha je v textu dvakrát zapsaná dolním indexem F<sub>g</sub> (${(html.match(/F<sub>g<\/sub>/g) || []).length}×), jako píše výklad`);
	ok(!html.includes('F_g'), 'a nikde v textu nezůstalo programátorské podtržítko F_g');
}

console.log('\n— hláška u výsledku 83 % odkazuje na kladkostroj z výkladu —');
{
	nastav(120, 20);
	ok(prvky.get('uci-stav').textContent.includes('0,4 kW : 0,48 kW'),
		'při 83 % se připomene příklad kladkostroje z výkladu');
	nastav(120, 30);
	ok(!prvky.get('uci-stav').textContent.includes('0,4 kW'),
		'u jiné účinnosti (75 %) se ten příklad neplete do hry');
	ok(prvky.get('uci-stav').textContent.includes('900 J') && prvky.get('uci-stav').textContent.includes('300 J'),
		`hláška jmenuje užitek i ztrátu: „${prvky.get('uci-stav').textContent.slice(0, 92)}…"`);
	nastav(100, 0);
	ok(prvky.get('uci-stav').textContent.includes('neexistuje'),
		'a při nulovém tření varuje, že takový stroj neexistuje');
}

console.log('\n— přepnutí navijáku opravdu překreslí scénu —');
{
	nastav(100, 20);
	const slabsi = scena.innerHTML + pruh.innerHTML;
	nastav(120, 20);
	const silnejsi = scena.innerHTML + pruh.innerHTML;
	ok(slabsi !== silnejsi, 'scéna slabšího a silnějšího navijáku se liší');
	ok(textyZ(scena.innerHTML).some((x) => x.text === 'P₀ = 120 W'), 'u navijáku je napsaný jeho příkon 120 W');
	nastav(100, 20);
	ok(textyZ(scena.innerHTML).some((x) => x.text === 'P₀ = 100 W'), 'a po přepnutí zpátky 100 W');
	ok(prvky.get('uci-motor-100').aktivni === true && prvky.get('uci-motor-120').aktivni === false,
		'zvýrazněné je stisknuté tlačítko (100 W), druhé zhasne');
	prepniMotor(120);
	ok(prvky.get('uci-motor-120').aktivni === true && prvky.get('uci-motor-100').aktivni === false,
		'a po přepnutí se zvýraznění přesune na 120 W');
	ok(spocitej(120, 20).uzitecna > spocitej(100, 20).uzitecna && spocitej(120, 20).ucinnost === spocitej(100, 20).ucinnost + 3,
		'silnější naviják udělá víc práce (1000 J proti 800 J), účinnost má ale svou vlastní (83 % proti 80 %)');
}

console.log(chyby === 0 ? '\n✅ Účinnost navijáku: vše sedí.' : `\n❌ Účinnost navijáku: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

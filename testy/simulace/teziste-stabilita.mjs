#!/usr/bin/env node
// Ověření TezisteStabilitaSimulace.astro: spustí SKUTEČNÝ skript komponenty v Node
// s náhradním DOM a proměří, co scéna tvrdí:
//  - mezní úhly (náklaďák kola 180 cm / T 150 cm → 30,96°, převrátí se při 31°;
//    formule kola 200 cm / T 30 cm → 73,30°, převrátí se při 74°),
//  - že se vozidlo převrátí PRÁVĚ TEHDY, když svislice z T míří za hranu vnějšího kola
//    (ve všech 91 polohách posuvníku),
//  - že olovnice visí VŽDY svisle z T až na zem,
//  - že kresba nelže: T, hrana, kóty a poloha vozidla odpovídají nezávisle spočítané
//    geometrii (měřítko 0,5 px na cm, kloub 230;290, střed vozidla 160 cm od kloubu),
//  - pád: spojitý (700 ms) — vozidlo se otáčí a zároveň padá, vodorovně rovnoměrně,
//    svisle rovnoměrně zrychleně; ležící vozidlo se s deskou dál nenaklání; dráha neprojde deskou
//    ani stojanem; nic nekončí na okraji scény,
//  - aria-valuetext posuvníku, čitelnost písma na mobilu, celá čísla v textech.
//
// Spuštění: node testy/simulace/teziste-stabilita.mjs src/components/skola2/TezisteStabilitaSimulace.astro
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

// ───────────────────────────── náhradní DOM ─────────────────────────────
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };

let nyni = 0;
let fronta = [];
const sandbox = {
	document,
	performance: { now: () => nyni },
	requestAnimationFrame: (cb) => { fronta.push(cb); return fronta.length; },
	cancelAnimationFrame: () => { fronta = []; },
	console,
	Math,
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, popis) => { console.log(`${p ? '✅' : '❌'} ${popis}`); if (!p) chyby++; };
const blizko = (a, b, tol = 0.02) => Math.abs(a - b) <= tol;
const atr = (id, a) => prvky.get(id).getAttribute(a);
const cis = (id, a) => parseFloat(atr(id, a));
const stavScény = () => prvky.get('tzs-a-svg').__stav();
const posun = (u) => { prvky.get('tzs-uhel').value = String(u); (prvky.get('tzs-uhel').posluchaci.input || []).forEach((f) => f()); };
const znovu = () => (prvky.get('tzs-znovu').posluchaci.click || []).forEach((f) => f());
/** Nechá běžet animaci po 10 ms; vrací se přesně po `ms` milisekundách. */
const snimky = (ms) => {
	for (let i = 0; i < 2000 && fronta.length && ms > 0; i++) {
		const cb = fronta.shift(); nyni += 10; ms -= 10; cb(nyni);
	}
};

// ───────────────────── nezávislá geometrie scény ─────────────────────
// Zapsaná komplexními čísly (jiný zápis než komponenta): otočení po směru hodin
// o φ na obrazovce (osa y dolů) = násobení e^{iφ}.
const S = 0.5, OX = 230, OY = 290, STRED = 160, ZEM = 338, DOPAD_X = 260;
const VOZY = { a: { kola: 180, t: 150, vyska: 320 }, f: { kola: 200, t: 30, vyska: 94 } };
const rad = (d) => (d * Math.PI) / 180;
const nasob = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const eI = (deg) => [Math.cos(rad(deg)), Math.sin(rad(deg))];
/** Hrana převrácení na desce nakloněné o `uhel`. */
const hrana = (k, uhel) => {
	const [dx, dy] = nasob([-(STRED - VOZY[k].kola / 2) * S, 0], eI(uhel));
	return [OX + dx, OY + dy];
};
/** Bod vozidla (cm) → obrazovka, když hrana vozidla leží v P a vozidlo je natočené o φ. */
const bodVozu = (k, x, y, [px, py], fi) => {
	const [vx, vy] = nasob([(x - VOZY[k].kola / 2) * S, -y * S], eI(fi));
	return [px + vx, py + vy];
};
/** Horní plocha desky nad x (jen x ≤ kloub). */
const deskaY = (x, uhel) => OY - (OX - x) * Math.tan(rad(uhel));
/** Je bod v trojúhelníku stojanu (vrchol 230;294, základna 218–242 na 340)? */
const veStojanu = (x, y) => y > 294 && y <= 340 && Math.abs(x - OX) < (12 * (y - 294)) / 46;

// ─────────────────────── 1. výchozí stav ───────────────────────
console.log('— výchozí stav po otevření —');
{
	const s = stavScény();
	ok(s.uhel === 0 && prvky.get('tzs-uhel-t').textContent === 0, 'náklon na startu 0° (posuvník i popisek)');
	ok(atr('tzs-uhel', 'aria-valuetext') === '0 stupňů', `posuvník hlásí čtečce „${atr('tzs-uhel', 'aria-valuetext')}"`);
	ok(!s.a.prevraceno && !s.f.prevraceno, 'obě vozidla na startu stojí');
	ok(prvky.get('tzs-a-stav').textContent === 'náklon 0° – stojí' && prvky.get('tzs-f-stav').textContent === 'náklon 0° – stojí',
		`stav ve scénách: „${prvky.get('tzs-a-stav').textContent}"`);
	ok(/Obě vozidla stojí/.test(prvky.get('tzs-vysledek').innerHTML), 'text pod scénou: obě vozidla stojí');
	ok(atr('tzs-a-deska', 'transform') === 'rotate(0 230 290)', `deska vodorovně: ${atr('tzs-a-deska', 'transform')}`);
	ok(atr('tzs-a-vuz', 'transform') === 'translate(195 290) rotate(0) translate(-45 0)', `náklaďák stojí na desce: ${atr('tzs-a-vuz', 'transform')}`);
	ok(atr('tzs-f-vuz', 'transform') === 'translate(200 290) rotate(0) translate(-50 0)', `formule stojí na desce: ${atr('tzs-f-vuz', 'transform')}`);
	ok(cis('tzs-a-t', 'cx') === 150 && cis('tzs-a-t', 'cy') === 215, `T náklaďáku 150 cm nad deskou uprostřed mezi koly (${atr('tzs-a-t', 'cx')};${atr('tzs-a-t', 'cy')})`);
	ok(cis('tzs-f-t', 'cx') === 150 && cis('tzs-f-t', 'cy') === 275, `T formule 30 cm nad deskou (${atr('tzs-f-t', 'cx')};${atr('tzs-f-t', 'cy')})`);
	ok(cis('tzs-a-hrana', 'cx') === 195 && cis('tzs-a-hrana', 'cy') === 290, `hrana náklaďáku = vnější okraj pravého kola (${atr('tzs-a-hrana', 'cx')};${atr('tzs-a-hrana', 'cy')})`);
	ok(cis('tzs-f-hrana', 'cx') === 200 && cis('tzs-f-hrana', 'cy') === 290, `hrana formule o 100 cm vpravo od středu (${atr('tzs-f-hrana', 'cx')})`);
	// olovnice formule musí být vidět i při 0°: z T (275) až na zem, ne 5 px schovaných pod kroužkem
	ok(cis('tzs-f-olovnice', 'y2') - cis('tzs-f-olovnice', 'y1') === 53, `olovnice formule je při 0° dlouhá ${cis('tzs-f-olovnice', 'y2') - cis('tzs-f-olovnice', 'y1')} px (kroužek T má poloměr 5)`);
}

// ─────────────────── 2. šablona: čísla, přístupnost, čitelnost ───────────────────
console.log('\n— šablona: čísla v kótách, přístupnost, čitelnost na mobilu —');
{
	ok(/kola od sebe 180 cm · těžiště 150 cm/.test(zdroj) && /kola od sebe 200 cm · těžiště 30 cm/.test(zdroj), 'popisky nad scénami uvádějí rozměry, se kterými se počítá');
	ok(/id="tzs-a-vyska"[^>]*>150 cm</.test(zdroj) && /id="tzs-f-vyska"[^>]*>30 cm</.test(zdroj), 'kóty výšky těžiště: 150 cm a 30 cm');
	ok(/>180 cm<\/text>/.test(zdroj) && />200 cm<\/text>/.test(zdroj), 'kóty vzdálenosti kol: 180 cm a 200 cm');
	ok(/x1="-45" y1="-172" x2="45" y2="-172"/.test(zdroj) && /x1="-50" y1="-58" x2="50" y2="-58"/.test(zdroj), 'kóty šířky nad vozidly v měřítku (±45 px a ±50 px) — mimo dráhu olovnice');
	ok(/x1="-57" y1="0" x2="-57" y2="-75"/.test(zdroj) && /x1="-62" y1="0" x2="-62" y2="-15"/.test(zdroj), 'kóty výšky vedou od desky přesně k výšce T (75 px a 15 px)');
	ok(/<label for="tzs-uhel">/.test(zdroj) && /id="tzs-uhel" type="range" min="0" max="90" step="1" value="0" aria-valuetext="0 stupňů"/.test(zdroj),
		'posuvník 0–90° po celých stupních má popisek (label) a aria-valuetext');
	ok(/nesklouzne/.test(zdroj), 'scéna uvádí předpoklad, že vozidlo nesklouzne');
	const sceny = zdroj.match(/<svg[\s\S]*?<\/svg>/g);
	const pisma = sceny.flatMap((s) => [...s.matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1])));
	const sirka = Number(zdroj.match(/viewBox="0 40 (\d+) 336"/)[1]);
	// Skutečná šířka SVG na telefonu 360 px se počítá z CSS webu (SkolaLayout.astro), ne odhadem:
	// na úzkém displeji html 1,15rem; main padding 1,5rem; .ramecek padding 1,6rem + rámeček 2,5 px;
	// okraj SVG 3 px; komponenta scény roztáhne o 1rem na každou stranu. (Změřeno i v Chrome:
	// 360 px → SVG 284,7 px; tenhle výpočet je dolní odhad.)
	const layout = readFileSync(new URL('../../src/layouts/SkolaLayout.astro', import.meta.url), 'utf8');
	const rem = 16 * Number(layout.match(/@media \(max-width: 640px\) \{\s*html,\s*body \{\s*font-size: ([\d.]+)rem/)[1]);
	const mainPad = Number(layout.match(/main \{[^}]*padding: [\d.]+rem ([\d.]+)rem/)[1]) * rem;
	const ramPad = Number(layout.match(/\.ramecek \{[^}]*padding: [\d.]+rem ([\d.]+)rem/)[1]) * rem;
	const ramOkraj = Number(layout.match(/\.ramecek \{[^}]*border: ([\d.]+)px/)[1]);
	const svgOkraj = Number(zdroj.match(/\.tzs-scena svg \{[^}]*border: (\d+)px/)[1]);
	const roztazeni = Number((zdroj.match(/@media \(max-width: 640px\) \{\s*\.tzs-sceny \{ margin-inline: -([\d.]+)rem/) || [0, 0])[1]) * rem;
	ok(/minmax\(min\(260px, 100%\), 1fr\)/.test(zdroj), 'mřížka scén nepřeteče úzký displej (minmax(min(260px, 100%), 1fr))');
	const svgNaMobilu = 360 - 2 * (mainPad + ramPad + ramOkraj + svgOkraj) + 2 * roztazeni;
	const naMobilu = (Math.min(...pisma) * svgNaMobilu) / sirka;
	ok(sceny.length === 2 && pisma.length === 8 && naMobilu >= 12,
		`nejmenší z ${pisma.length} písem ve scénách (${Math.min(...pisma)} ve viewBoxu ${sirka}) má na telefonu 360 px `
		+ `(SVG ${svgNaMobilu.toFixed(1)} px) ${naMobilu.toFixed(1)} px ≥ 12 px`);
}

// ─────────────────── 3. mezní úhly ───────────────────
console.log('\n— mezní úhly —');
{
	const s = stavScény();
	const ta = Math.atan(90 / 150) * 180 / Math.PI, tf = Math.atan(100 / 30) * 180 / Math.PI;
	ok(s.a.mezni === 31 && Math.floor(ta) + 1 === 31, `náklaďák: θ = ${ta.toFixed(2)}°, převrátí se při ${s.a.mezni}°`);
	ok(s.f.mezni === 74 && Math.floor(tf) + 1 === 74, `formule: θ = ${tf.toFixed(2)}°, převrátí se při ${s.f.mezni}°`);
}

console.log('\n— první převrácení hned po otevření stránky (bez Znovu) —');
{
	posun(35);
	ok(fronta.length === 1 && stavScény().a.bezi, 'první převrácení po otevření stránky spustí animaci');
	snimky(700);
	ok(stavScény().a.pad === 1 && !stavScény().a.bezi, 'a náklaďák opravdu dopadne na zem');
	znovu();
}

// ─────────── 4. všech 91 poloh posuvníku (každá z výchozího stavu) ───────────
console.log('\n— 91 poloh posuvníku: převrácení právě když olovnice ukáže za kolo —');
{
	let spatnePrevraceni = 0, nesvisle = 0, mimoZem = 0, spatneT = 0, spatnaHrana = 0, necele = 0, spatnyText = 0, spatnaDeska = 0, spatnaAria = 0, mimoScenu = 0;
	for (let u = 0; u <= 90; u++) {
		znovu();
		posun(u);
		const s = stavScény();
		const tvar = u === 1 ? 'stupeň' : u >= 2 && u <= 4 ? 'stupně' : 'stupňů';
		if (atr('tzs-uhel', 'aria-valuetext') !== `${u} ${tvar}`) spatnaAria++;
		for (const k of ['a', 'f']) {
			const v = VOZY[k];
			const e = hrana(k, u);
			const [tx, ty] = bodVozu(k, 0, v.t, e, u);
			const zaKolem = tx > e[0] + 1e-9;
			if (s[k].prevraceno !== zaKolem) spatnePrevraceni++;
			if (s[k].prevraceno !== (u >= s[k].mezni)) spatnePrevraceni++;
			if (!blizko(cis(`tzs-${k}-t`, 'cx'), tx) || !blizko(cis(`tzs-${k}-t`, 'cy'), ty)) spatneT++;
			if (!blizko(cis(`tzs-${k}-hrana`, 'cx'), e[0]) || !blizko(cis(`tzs-${k}-hrana`, 'cy'), e[1])) spatnaHrana++;
			if (atr(`tzs-${k}-olovnice`, 'x1') !== atr(`tzs-${k}-olovnice`, 'x2') || atr(`tzs-${k}-olovnice`, 'x1') !== atr(`tzs-${k}-t`, 'cx')
				|| atr(`tzs-${k}-olovnice`, 'y1') !== atr(`tzs-${k}-t`, 'cy')) nesvisle++;
			const hrot = atr(`tzs-${k}-zavazi`, 'points').split(' ').map((b) => b.split(',').map(Number));
			if (hrot[2][1] !== ZEM || !blizko(hrot[2][0], tx) || cis(`tzs-${k}-olovnice`, 'y2') !== ZEM - 10) mimoZem++;
			if (!/^(náklon \d+° – stojí|převrátilo se · vydrží nejvýš \d+°)$/.test(prvky.get(`tzs-${k}-stav`).textContent)) necele++;
			const cekany = zaKolem ? `převrátilo se · vydrží nejvýš ${s[k].mezni - 1}°` : `náklon ${u}° – stojí`;
			if (prvky.get(`tzs-${k}-stav`).textContent !== cekany) spatnyText++;
			if (atr(`tzs-${k}-deska`, 'transform') !== `rotate(${u} 230 290)`) spatnaDeska++;
			// stojící vozidlo i jeho kóty a popisky musí být celé uvnitř scény
			if (!zaKolem) {
				const body = [[-v.kola / 2, 0], [v.kola / 2, 0], [-v.kola / 2, v.vyska], [v.kola / 2, v.vyska], [0, v.vyska + 60]]
					.map(([x, y]) => bodVozu(k, x, y, e, u));
				for (const [x, y] of body) if (x < 5 || x > 425 || y < 45 || y > 340) mimoScenu++;
				if (cis(`tzs-${k}-vyska`, 'x') - 60 < 3 || cis(`tzs-${k}-vyska`, 'y') < 50) mimoScenu++;
			}
		}
	}
	ok(spatnePrevraceni === 0, `převrácení nastane právě tehdy, když svislice z T míří za hranu vnějšího kola (chyb: ${spatnePrevraceni})`);
	ok(spatneT === 0, `poloha T souhlasí s nezávislou geometrií ve všech polohách (chyb: ${spatneT})`);
	ok(spatnaHrana === 0, `oranžová hrana je vždy na vnějším okraji spodního kola na desce (chyb: ${spatnaHrana})`);
	ok(nesvisle === 0, `olovnice je VŽDY svislá a začíná v T (chyb: ${nesvisle})`);
	ok(mimoZem === 0, `olovnice vede až na zem, závaží se jí dotýká (chyb: ${mimoZem})`);
	ok(necele === 0, `všechny stavové texty obsahují jen celá čísla (chyb: ${necele})`);
	ok(spatnyText === 0, `text ve scéně odpovídá stavu (chyb: ${spatnyText})`);
	ok(spatnaDeska === 0, `obě desky jsou nakloněné o úhel posuvníku (chyb: ${spatnaDeska})`);
	ok(spatnaAria === 0, `aria-valuetext ve všech polohách česky („1 stupeň", „3 stupně", „31 stupňů"; chyb: ${spatnaAria})`);
	ok(mimoScenu === 0, `stojící vozidla, kóty i popisky výšky zůstávají uvnitř scény (nálezů: ${mimoScenu})`);
	znovu();
}

console.log('\n— hraniční polohy —');
{
	posun(30);
	let s = stavScény();
	ok(!s.a.prevraceno && s.a.presah < 0, `při 30° náklaďák stojí, svislice je ${(-s.a.presah).toFixed(1)} cm před hranou`);
	ok(cis('tzs-a-t', 'cx') < cis('tzs-a-hrana', 'cx'), 'při 30° olovnice míří před oranžovou hranu (na podstavu)');
	posun(31);
	s = stavScény();
	ok(s.a.prevraceno && s.a.presah > 0 && !s.f.prevraceno, 'při 31° se náklaďák převrací, formule stojí');
	ok(prvky.get('tzs-a-stav').textContent === 'převrátilo se · vydrží nejvýš 30°' && atr('tzs-a-stav', 'fill') === '#c92a2a',
		`hláška je červeně a pravdivá: „${prvky.get('tzs-a-stav').textContent}"`);
	ok(atr('tzs-f-stav', 'fill') === '#2b2a26', 'stojící formule má tmavý text');
	ok(/vydrží náklon nejvýš <strong>30°<\/strong>, při 31° už olovnice/.test(prvky.get('tzs-vysledek').innerHTML) && /Formule stojí dál/.test(prvky.get('tzs-vysledek').innerHTML),
		'text pod scénou: náklaďák vydrží nejvýš 30°, při 31° se převrátí; formule stojí');
	snimky(1000);
	posun(73);
	ok(!stavScény().f.prevraceno, 'formule při 73° stojí');
	posun(74);
	ok(stavScény().f.prevraceno, 'formule při 74° se převrací');
	const vys = prvky.get('tzs-vysledek').innerHTML;
	ok(/nejvýš <strong>30°<\/strong> \(při 31° se převrátí\)/.test(vys) && /až <strong>73°<\/strong> \(převrátí se při 74°\)/.test(vys)
		&& /těžiště nízko/.test(vys) && /kola daleko od sebe/.test(vys),
		'závěr: náklaďák vydrží 30° (31° převrátí), formule 73° (74° převrátí), nízké těžiště a kola daleko od sebe');
	posun(20);
	ok(stavScény().a.prevraceno && stavScény().f.prevraceno, 'převrácené vozidlo se po zmenšení náklonu samo nepostaví');
	snimky(1000);
	znovu();
	ok(stavScény().uhel === 0 && prvky.get('tzs-uhel').value === '0' && !stavScény().a.prevraceno && !stavScény().f.prevraceno
		&& stavScény().a.pad === 0, 'Znovu vrátí náklon na 0° a postaví obě vozidla');
	ok(prvky.get('tzs-a-stav').textContent === 'náklon 0° – stojí' && prvky.get('tzs-uhel-t').textContent === 0, 'po Znovu scéna i popisek ukazují 0°');
	posun(90);
	ok(prvky.get('tzs-a-stav').textContent === 'převrátilo se · vydrží nejvýš 30°' && prvky.get('tzs-f-stav').textContent === 'převrátilo se · vydrží nejvýš 73°',
		'skok rovnou na 90°: hláška netvrdí, že se převrátilo při 90° ani při jiném úhlu, jen pravdivou mez');
	ok(!/při 90°/.test(prvky.get('tzs-vysledek').innerHTML), 'ani text pod scénou netvrdí převrácení při 90°');
	znovu();
}

// ─────────────────── 5. pád: spojitě se otáčí a padá, pak leží na zemi ───────────────────
console.log('\n— pád: otáčení a pád současně, gravitačně zrychlený, ležení na zemi —');
{
	nyni = 0;
	posun(40);
	ok(fronta.length === 1, 'převrácení spustí animaci');
	ok(stavScény().a.pad === 0 && stavScény().a.bezi, 'na začátku pádu je vozidlo ještě na kolech');
	ok(atr('tzs-a-koty', 'opacity') === '0' && atr('tzs-a-podstava', 'opacity') === '0' && atr('tzs-a-vyska', 'opacity') === '0',
		'kóty a podstava převráceného vozidla zmizí');
	ok(atr('tzs-f-koty', 'opacity') === '1' && atr('tzs-f-podstava', 'opacity') === '1' && atr('tzs-f-vyska', 'opacity') === '1',
		'stojící formule kóty a podstavu ukazuje');
	const e = hrana('a', 40);
	// průběh po 10 ms: úhel i výška se mění v KAŽDÉM snímku (žádné visení ve vzduchu),
	// vodorovná rychlost stálá, svislé zrychlení stálé (druhé diference y shodné)
	const pr = [stavScény().a.poloha];
	for (let i = 0; i < 70; i++) { snimky(10); pr.push(stavScény().a.poloha); }
	let bezOtoceni = 0, bezPadu = 0, nerovnomerneX = 0, nestaleZrychleni = 0;
	for (let i = 1; i < pr.length; i++) {
		if (!(pr[i].fi > pr[i - 1].fi)) bezOtoceni++;
		if (!(pr[i].py > pr[i - 1].py)) bezPadu++;
		if (!blizko(pr[i].px - pr[i - 1].px, pr[1].px - pr[0].px, 1e-9)) nerovnomerneX++;
		if (i > 1 && !blizko(pr[i].py - 2 * pr[i - 1].py + pr[i - 2].py, pr[2].py - 2 * pr[1].py + pr[0].py, 1e-9)) nestaleZrychleni++;
	}
	ok(bezOtoceni === 0 && bezPadu === 0, `ve všech 70 snímcích se vozidlo zároveň otáčí i klesá (bez otočení ${bezOtoceni}, bez pádu ${bezPadu})`);
	ok(nerovnomerneX === 0 && nestaleZrychleni === 0 && pr[2].py - 2 * pr[1].py + pr[0].py > 0,
		`pohyb jako vrh: vodorovně rovnoměrně, svisle se stálým zrychlením dolů (odchylek ${nerovnomerneX}/${nestaleZrychleni})`);
	const pul = pr[35];
	ok(blizko(pul.px, e[0] + 0.5 * (DOPAD_X - e[0]), 1e-9) && blizko(pul.py, e[1] + 0.25 * (ZEM - e[1]), 1e-9) && blizko(pul.fi, 65, 1e-9),
		`v polovině pádu (350 ms) je vozidlo v půli cesty vpravo, ve čtvrtině výšky a natočené o ${pul.fi}° (40° + 25°)`);
	ok(stavScény().a.pad === 1 && !stavScény().a.bezi && fronta.length === 0, 'po 700 ms náklaďák leží na zemi a animace skončila');
	ok(atr('tzs-a-vuz', 'transform') === 'translate(260 338) rotate(90) translate(-45 0)', `leží na boku na zemi vpravo za stojanem: ${atr('tzs-a-vuz', 'transform')}`);
	ok(cis('tzs-a-t', 'cx') === 335 && cis('tzs-a-t', 'cy') === 293, 'T ležícího náklaďáku (335;293) je 45 px nad zemí = polovina šířky');
	ok(blizko(cis('tzs-a-t-text', 'x'), cis('tzs-a-t', 'cx') - 9) && blizko(cis('tzs-a-t-text', 'y'), cis('tzs-a-t', 'cy') - 7), 'písmeno T sedí vlevo nad bodem T');
	ok(prvky.get('tzs-a-stav').textContent === 'převrátilo se · vydrží nejvýš 30°', 'hláška po dopadu zůstává');
	posun(10);
	ok(atr('tzs-a-vuz', 'transform') === 'translate(260 338) rotate(90) translate(-45 0)' && cis('tzs-a-t', 'cx') === 335,
		'ležící náklaďák se s deskou dál nenaklání');
	posun(90);
	snimky(1000);
	ok(atr('tzs-f-vuz', 'transform') === 'translate(260 338) rotate(90) translate(-50 0)', `formule leží na boku na zemi: ${atr('tzs-f-vuz', 'transform')}`);
	ok(cis('tzs-f-t', 'cx') === 275 && cis('tzs-f-t', 'cy') === 288, 'T ležící formule je 50 px nad zemí = polovina šířky');
	ok(cis('tzs-f-olovnice', 'y2') === 328, 'olovnice ležící formule visí z T na zem');
	znovu();
	ok(atr('tzs-a-vuz', 'transform') === 'translate(195 290) rotate(0) translate(-45 0)', 'Znovu postaví auto zpět na desku');
	posun(50);
	ok(fronta.length === 1, 'po Znovu jde převrácení spustit znovu');
	snimky(300);
	ok(stavScény().a.pad > 0 && stavScény().a.bezi, 'po 300 ms náklaďák padá');
	znovu();
	ok(fronta.length === 0 && stavScény().a.pad === 0, 'Znovu během pádu animaci zastaví');
	ok(atr('tzs-a-vuz', 'transform') === 'translate(195 290) rotate(0) translate(-45 0)', 'a vozidlo stojí zpět na desce');
}

console.log('\n— dráha pádu neprojde deskou ani stojanem a nekončí na okraji scény —');
{
	let pruniku = 0, mimo = 0, stavu = 0;
	for (const k of ['a', 'f']) {
		const v = VOZY[k];
		for (let u = VOZY[k] === VOZY.a ? 31 : 74; u <= 90; u++) {
			znovu();
			nyni = 0;
			posun(u);
			for (let t = 0; t <= 700; t += 10) {
				stavu++;
				const p = stavScény()[k].poloha;
				// body po obvodu vozidla (obdélník kola × výška)
				for (let i = 0; i <= 10; i++) {
					for (const [x, y] of [[-v.kola / 2 + (i * v.kola) / 10, 0], [-v.kola / 2 + (i * v.kola) / 10, v.vyska],
						[-v.kola / 2, (i * v.vyska) / 10], [v.kola / 2, (i * v.vyska) / 10]]) {
						const [sx, sy] = bodVozu(k, x, y, [p.px, p.py], p.fi);
						if (sx <= OX && sy > deskaY(sx, u) + 0.05) pruniku++;
						if (veStojanu(sx, sy - 0.05)) pruniku++;
						if (sy > ZEM + 0.05) pruniku++;
						if (sx < 5 || sx > 425 || sy < 45) mimo++;
					}
				}
				snimky(10);
			}
		}
	}
	znovu();
	ok(stavu > 1000, `proměřeno ${stavu} okamžiků pádu (náklaďák 31–90°, formule 74–90°)`);
	ok(pruniku === 0, `vozidlo při pádu nikdy neprojde deskou, stojanem ani zemí (průniků: ${pruniku})`);
	ok(mimo === 0, `vozidlo při pádu ani vleže nevyjede ke kraji scény (nálezů: ${mimo})`);
}

console.log('\n— posuvník se hýbe během pádu (zpět, dopředu, skoky): žádný průnik, žádný skok vozidla —');
{
	// Nález recheck 3: pád se počítal z AKTUÁLNÍHO úhlu desky, vrácení posuvníku 31° → 0°
	// během pádu vozidlo přeneslo skrz desku a stojan. Teď se pád počítá z úhlu převrácení
	// a deska té scény v něm během pádu zůstane.
	const vzory = {
		zpet: (i) => Math.max(0, 31 - i),          // plynule zpátky na 0°
		skokNula: () => 0,                          // hned skokem na 0°
		dopredu: (i) => Math.min(90, 31 + 2 * i),   // plynule až na 90°
		cik: (i) => [0, 90, 10, 80, 20, 60][i % 6], // skoky tam a zpět
	};
	let pruniku = 0, skoku = 0, deskaNeceka = 0, deskaNedorovna = 0, stavu = 0, nelezi = 0;
	const uhelDesky = (k) => Number(atr(`tzs-${k}-deska`, 'transform').match(/rotate\(([\d.]+) /)[1]);
	for (const [k, u0] of [['a', 31], ['a', 45], ['a', 60], ['f', 74], ['f', 80]]) {
		const v = VOZY[k];
		for (const [nazev, vzor] of Object.entries(vzory)) {
			znovu();
			nyni = 0;
			posun(u0);
			let minule = stavScény()[k].poloha;
			let i = 0;
			while (stavScény()[k].bezi && i < 200) {
				posun(vzor(i++));
				snimky(10);
				stavu++;
				const p = stavScény()[k].poloha;
				const ud = uhelDesky(k);
				if (stavScény()[k].bezi && ud !== u0) deskaNeceka++;
				// skok = posun o víc, než dovolí vrh za 10 ms (nejvýš ~20 px)
				if (Math.hypot(p.px - minule.px, p.py - minule.py) > 20 || Math.abs(p.fi - minule.fi) > 10) skoku++;
				minule = p;
				for (let j = 0; j <= 10; j++) {
					for (const [x, y] of [[-v.kola / 2 + (j * v.kola) / 10, 0], [-v.kola / 2 + (j * v.kola) / 10, v.vyska],
						[-v.kola / 2, (j * v.vyska) / 10], [v.kola / 2, (j * v.vyska) / 10]]) {
						const [sx, sy] = bodVozu(k, x, y, [p.px, p.py], p.fi);
						if (sx <= OX && ud < 90 && sy > deskaY(sx, ud) + 0.05) pruniku++;
						if (veStojanu(sx, sy - 0.05) || sy > ZEM + 0.05) pruniku++;
					}
				}
			}
			const posledni = Number(prvky.get('tzs-uhel').value);
			posun(posledni);
			if (uhelDesky(k) !== posledni) deskaNedorovna++;
			if (atr(`tzs-${k}-vuz`, 'transform') !== `translate(260 338) rotate(90) translate(-${v.kola / 4} 0)`) nelezi++;
		}
	}
	znovu();
	ok(stavu > 300, `proměřeno ${stavu} snímků pádu s hýbajícím se posuvníkem (5 úhlů převrácení × 4 způsoby tahu)`);
	ok(pruniku === 0, `vozidlo při žádném tahu posuvníkem neprojde deskou, stojanem ani zemí (průniků: ${pruniku})`);
	ok(skoku === 0, `padající vozidlo nikdy neposkočí s deskou (skoků: ${skoku})`);
	ok(deskaNeceka === 0, `deska převracejícího se vozidla během pádu zůstává v úhlu převrácení (odchylek: ${deskaNeceka})`);
	ok(deskaNedorovna === 0 && nelezi === 0, `po dopadu deska dorovná posuvník a vozidlo leží na zemi nezávisle na ní (chyb: ${deskaNedorovna}/${nelezi})`);
}

console.log('\n— popisek výšky těžiště a závaží —');
{
	for (const u of [0, 25]) {
		posun(u);
		for (const k of ['a', 'f']) {
			const v = VOZY[k];
			const [vx, vy] = bodVozu(k, -v.kola / 2 - 50, v.t / 2, hrana(k, u), u);
			ok(blizko(cis(`tzs-${k}-vyska`, 'x'), vx) && blizko(cis(`tzs-${k}-vyska`, 'y'), vy),
				`${k} při ${u}°: popisek výšky T leží 25 px vlevo od kola, mimo kótu (${atr(`tzs-${k}-vyska`, 'x')};${atr(`tzs-${k}-vyska`, 'y')})`);
			const tx = cis(`tzs-${k}-t`, 'cx');
			const hrot = atr(`tzs-${k}-zavazi`, 'points').split(' ').map((b) => b.split(',').map(Number));
			ok(blizko(hrot[0][0], tx - 5) && blizko(hrot[1][0], tx + 5) && hrot[0][1] === 328 && hrot[1][1] === 328,
				`${k} při ${u}°: závaží je trojúhelník 10 × 10 px na konci šňůry`);
		}
	}
	znovu();
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

#!/usr/bin/env node
// Ověření MagnetyOpakovaniSimulace.astro — opakování magnetů pro 9. ročník.
//
// Měří se VÝSLEDEK: skript komponenty se spustí ve VM sandboxu a testuje se
// to, co skript sám zapsal do DOMu (innerHTML, textContent) i jeho vlastní
// čisté funkce (__polohaVzorkuCy, __obloukNS, __rozlomeniGeom…), ne vzory nad
// zdrojovým textem. Zvláštní pozornost scéně (souřadnice, barvy, směr šipek)
// — právě tam bývají nejhorší vady, které čistě fyzikální test nevidí.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
// POZOR: `html` musí být JEN to, co dítě uvidí — tedy bez <script> a BEZ
// frontmatteru mezi ---. Bez odečtení frontmatteru měřidlo hlásilo dvě chyby
// kvůli komentáři autora „mimo scénu schválně: … kompas, ztráta magnetismu",
// tedy kvůli poznámce, která ta slova ZAKAZUJE (falešný poplach 14. 8. 2026).
const html = zdroj
	.replace(/^---[\s\S]*?\n---/, '')
	.replace(/<script>[\s\S]*?<\/script>/, '');
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		disabled: false,
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

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const klik = (id) => { for (const f of prvky.get(id).posluchaci.click) f(); };
const nastavSlider = (id, hodnota) => { prvky.get(id).value = String(hodnota); for (const f of prvky.get(id).posluchaci.input) f(); };

// ══════════════════════════ SCÉNA A: třídění vzorků ══════════════════════════
const svgA = prvky.get('mopak-a-svg');
const { __MATERIALY: MATERIALY, __polohaVzorkuCy: polohaVzorkuCy, __polohaMagnetuTop: polohaMagnetuTop } = svgA;

console.log('— tabulka látek (natvrdo, ať test nic neodkývá) —');
{
	ok(MATERIALY.length === 9, `devět vzorků v nabídce (${MATERIALY.length})`);
	const ocekavane = [
		['železo', true], ['ocel', true], ['nikl', true], ['kobalt', true],
		['hliník', false], ['měď', false], ['dřevo', false], ['sklo', false], ['plast', false],
	];
	let spatne = null;
	ocekavane.forEach(([nazev, fero], i) => {
		const m = MATERIALY[i];
		if (m.nazev !== nazev || m.fero !== fero) spatne = `pozice ${i}: čekal jsem ${nazev}=${fero}, mám ${m.nazev}=${m.fero}`;
	});
	ok(spatne === null, spatne ?? `všech 9 vzorků sedí: ${ocekavane.map(([n, f]) => `${n}=${f ? 'fero' : 'ne'}`).join(', ')}`);
}

console.log('\n— čistá funkce: feromagnetický vzorek se při přiblížení zvedne, nemagnetický ne —');
{
	let spatne = null;
	for (let i = 0; i < MATERIALY.length; i++) {
		const klid = polohaVzorkuCy(i, false);
		const pribl = polohaVzorkuCy(i, true);
		if (klid !== 246) spatne = `vzorek ${i}: klidová poloha ${klid}, čekal jsem 246`;
		if (MATERIALY[i].fero) {
			if (pribl !== 194) spatne = `vzorek ${i} (feromagnetický): po přiblížení ${pribl}, čekal jsem 194 (nahoře, u magnetu)`;
		} else {
			if (pribl !== 246) spatne = `vzorek ${i} (nemagnetický): po přiblížení ${pribl}, čekal jsem beze změny 246`;
		}
	}
	ok(spatne === null, spatne ?? 'u všech 9 vzorků: feromagnetický vyletí k magnetu (194), nemagnetický zůstane na stole (246)');
	ok(polohaMagnetuTop(false) === 30 && polohaMagnetuTop(true) === 120, `magnet: daleko y=${polohaMagnetuTop(false)}, blízko y=${polohaMagnetuTop(true)}`);
}

console.log('\n— výchozí stav scény A —');
{
	ok(prvky.get('mopak-a-slider').value === '0', 'posuvník vzorku začíná na 0 (železo)');
	ok(prvky.get('mopak-a-out').textContent === 'železo', `popisek vzorku: „${prvky.get('mopak-a-out').textContent}"`);
	ok(prvky.get('mopak-a-tlacitko').textContent.includes('Přiblížit'), `tlačítko nabízí přiblížení: „${prvky.get('mopak-a-tlacitko').textContent}"`);
	ok(prvky.get('mopak-a-stav').textContent.includes('železo'), `hláška jmenuje vzorek: „${prvky.get('mopak-a-stav').textContent}"`);
}

console.log('\n— scéna: přiblížení magnetu ke KAŽDÉMU vzorku dá SPRÁVNÝ výsledek —');
{
	const vzorekG = prvky.get('mopak-a-vzorek');
	const magnetG = prvky.get('mopak-a-magnet');
	let spatne = null;
	for (let i = 0; i < MATERIALY.length; i++) {
		nastavSlider('mopak-a-slider', i);
		ok(prvky.get('mopak-a-tlacitko').textContent.includes('Přiblížit'), `vzorek ${i}: nová volba vrátí magnet do klidu (tlačítko „${prvky.get('mopak-a-tlacitko').textContent}")`);
		const cyPred = +/<circle cx="330" cy="(\d+)"/.exec(vzorekG.innerHTML)[1];
		if (cyPred !== 246) spatne = `vzorek ${i}: před testem má být na stole (cy=246), je na ${cyPred}`;

		klik('mopak-a-tlacitko'); // přiblížit magnet
		const magnetTop = +/<rect x="250" y="(\d+)"/.exec(magnetG.innerHTML)[1];
		if (magnetTop !== 120) spatne = `vzorek ${i}: magnet po přiblížení má být na y=120, je na ${magnetTop}`;
		const cyPo = +/<circle cx="330" cy="(\d+)"/.exec(vzorekG.innerHTML)[1];
		const stav = prvky.get('mopak-a-stav').textContent;
		if (MATERIALY[i].fero) {
			if (cyPo !== 194) spatne = `vzorek ${i} (${MATERIALY[i].nazev}, feromagnetický): po testu cy=${cyPo}, čekal jsem 194 (přichycen k magnetu)`;
			if (!/přitáhl a přichytil/.test(stav)) spatne = `vzorek ${i}: hláška nehlásí přichycení — „${stav}"`;
		} else {
			if (cyPo !== 246) spatne = `vzorek ${i} (${MATERIALY[i].nazev}, nemagnetický): po testu cy=${cyPo}, čekal jsem beze změny 246`;
			if (!/nepůsobí, zůstala na místě/.test(stav)) spatne = `vzorek ${i}: hláška nehlásí klid — „${stav}"`;
		}

		klik('mopak-a-tlacitko'); // oddálit — vrátit do klidu
		const cyZpet = +/<circle cx="330" cy="(\d+)"/.exec(vzorekG.innerHTML)[1];
		if (cyZpet !== 246) spatne = `vzorek ${i}: po oddálení má být zpátky na 246, je na ${cyZpet}`;
	}
	ok(spatne === null, spatne ?? 'u všech 9 vzorků: magnet se přiblíží (y=120), feromagnetický vzorek vyletí nahoru a přichytí se, nemagnetický zůstane na místě — a oddálení vrátí obojí zpátky');
}

console.log('\n— legenda pod scénou vyjmenovává obě skupiny přesně —');
{
	const legenda = prvky.get('mopak-a-legenda').innerHTML;
	ok(legenda.includes('železo, ocel, nikl, kobalt'), 'feromagnetická skupina je vypsaná celá a ve správném pořadí');
	ok(legenda.includes('hliník, měď, dřevo, sklo, plast'), 'nemagnetická skupina je vypsaná celá a ve správném pořadí');
	ok(legenda.includes('feromagnetické'), 'legenda pojmenovává skupinu „feromagnetické"');
	ok(legenda.includes('nemagnetické'), 'legenda pojmenovává skupinu „nemagnetické"');
}

console.log('\n— nic v scéně A nevyleze z obrázku (viewBox 660×450) —');
{
	nastavSlider('mopak-a-slider', 0);
	let mimo = null;
	for (let i = 0; i < 9; i++) {
		nastavSlider('mopak-a-slider', i);
		for (const priblni of [false, true]) {
			if (priblni) klik('mopak-a-tlacitko');
			for (const g of [prvky.get('mopak-a-magnet'), prvky.get('mopak-a-vzorek'), prvky.get('mopak-a-legenda')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 450) mimo = `${g.id}: x=${t[1]} y=${t[2]} (vzorek ${i}, přiblíženo=${priblni})`;
				}
			}
			if (priblni) klik('mopak-a-tlacitko'); // vrátit do klidu pro další kolo
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'všechny texty zůstávají uvnitř viewBoxu 660×450 pro všech 9 vzorků, v klidu i po přiblížení');
	nastavSlider('mopak-a-slider', 0);
}

console.log('\n— popisek vzorku sedí na bílé plaketě, ne přímo na kresbě —');
{
	nastavSlider('mopak-a-slider', 4); // hliník
	const html = prvky.get('mopak-a-vzorek').innerHTML;
	const plaketa = /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="24" rx="6" fill="#ffffff"/.exec(html);
	ok(!!plaketa, 'plaketa popisku existuje a je bílá');
	const popisek = /<text x="([\d.]+)" y="([\d.]+)"[^>]*>hliník<\/text>/.exec(html);
	ok(!!popisek, `text „hliník" je ve scéně: ${html.includes('hliník')}`);
	if (plaketa && popisek) {
		const px = +plaketa[1], pw = +plaketa[3], tx = +popisek[1];
		ok(tx >= px && tx <= px + pw, `text (x=${tx}) leží uvnitř plakety (${px}–${(px + pw).toFixed(1)})`);
	}
	nastavSlider('mopak-a-slider', 0);
}

// ══════════════════════════ SCÉNA B: póly a pole ══════════════════════════
const svgB = prvky.get('mopak-b-svg');
const {
	__mezeraPx: mezeraPx, __poziceMagnetu2: poziceMagnetu2, __pritahujiSe: pritahujiSe,
	__silaPopis: silaPopis, __obloukNS: obloukNS, __rozlomeniGeom: rozlomeniGeom,
} = svgB;

console.log('\n— čisté funkce: vzdálenost, přitažlivost, síla —');
{
	ok(mezeraPx(1) === 40 && mezeraPx(3) === 80 && mezeraPx(5) === 120, `mezeraPx: 1cm=${mezeraPx(1)}, 3cm=${mezeraPx(3)}, 5cm=${mezeraPx(5)}`);
	let rosteVpravo = true;
	for (let cm = 2; cm <= 5; cm++) if (poziceMagnetu2(cm).left <= poziceMagnetu2(cm - 1).left) rosteVpravo = false;
	ok(rosteVpravo, 'druhý magnet se s rostoucí vzdáleností posouvá dál doprava');
	ok(pritahujiSe(false) === true && pritahujiSe(true) === false, 'nesouhlasné póly (nepřetočeno) se přitahují, souhlasné (přetočeno) se odpuzují');

	const poradi = { 'silně': 3, 'středně silně': 2, 'slabě': 1 };
	let klesa = true;
	for (let cm = 2; cm <= 5; cm++) if (poradi[silaPopis(cm)] > poradi[silaPopis(cm - 1)]) klesa = false;
	ok(klesa, `síla neroste se vzdáleností: ${[1, 2, 3, 4, 5].map((c) => `${c}cm→${silaPopis(c)}`).join(', ')}`);
}

console.log('\n— čistá funkce: indukční čára jde od N (vlevo) k S (vpravo), nikdy obráceně —');
{
	const o1 = obloukNS(100, 180, 175, 50);
	ok(o1.p0.x === 100 && o1.p1.x === 180, `začátek u N (x=${o1.p0.x}), konec u S (x=${o1.p1.x}) — S je napravo od N`);
	ok(o1.pc.y < o1.p0.y, `vrchol oblouku (y=${o1.pc.y}) je NAD magnetem (y=${o1.p0.y}), ne pod ním`);
	ok(o1.stred.x === 140, `střed oblouku leží mezi póly (x=${o1.stred.x})`);
}

console.log('\n— čistá funkce: rozlomený magnet — obě půlky mají N vlevo, S vpravo, bez mezery navíc —');
{
	const g = rozlomeniGeom();
	ok(g.levy.nX0 < g.levy.nX1 && g.levy.nX1 <= g.levy.sX0 && g.levy.sX0 < g.levy.sX1, 'levá půlka: N je vlevo od S, bez překryvu');
	ok(g.pravy.nX0 < g.pravy.nX1 && g.pravy.nX1 <= g.pravy.sX0 && g.pravy.sX0 < g.pravy.sX1, 'pravá půlka: N je vlevo od S, bez překryvu');
	ok(g.levy.sX1 < g.pravy.nX0, `mezi půlkami je vidět mezera (levá končí na ${g.levy.sX1}, pravá začíná na ${g.pravy.nX0})`);
}

console.log('\n— výchozí stav scény B: 3 cm, nepřetočeno, celý magnet —');
{
	ok(prvky.get('mopak-b-vzdalenost').value === '3', 'posuvník vzdálenosti začíná na 3 cm');
	ok(prvky.get('mopak-b-out').textContent === '3 cm', `popisek vzdálenosti: „${prvky.get('mopak-b-out').textContent}"`);
	ok(prvky.get('mopak-b-rozlomit').textContent.includes('Rozlomit'), 'tlačítko nabízí rozlomení (magnet je zatím celý)');
	const stav = prvky.get('mopak-b-stav').textContent;
	ok(stav.includes('PŘITAHUJÍ') && stav.includes('3 cm'), `výchozí hláška: přitahování na 3 cm — „${stav}"`);
}

console.log('\n— scéna: magnet 1 má N vlevo (červeně), S vpravo (modře) —');
{
	const m1 = prvky.get('mopak-b-magnet1').innerHTML;
	const N = /<rect x="60"[^>]*fill="(#[0-9a-f]+)"/.exec(m1);
	const S = /<rect x="140"[^>]*fill="(#[0-9a-f]+)"/.exec(m1);
	ok(!!N && N[1] === '#e03131', `N (x=60) je červené: ${N && N[1]}`);
	ok(!!S && S[1] === '#1971c2', `S (x=140) je modré: ${S && S[1]}`);
	ok(m1.includes('nejsilnější') && m1.includes('uprostřed'), 'popisek zmiňuje sílu u pólů a slabé místo uprostřed (netečné pásmo)');
}

console.log('\n— scéna: 3 indukční čáry vedou od N k S a šipky míří správným směrem (doprava) —');
{
	const pole = prvky.get('mopak-b-pole').innerHTML;
	const cesty = [...pole.matchAll(/<path d="M ([\d.]+),([\d.]+) Q [\d.]+,[\d.]+ ([\d.]+),([\d.]+)"/g)];
	ok(cesty.length === 3, `tři indukční čáry (${cesty.length})`);
	ok(cesty.every((m) => +m[1] === 100 && +m[3] === 180), 'všechny začínají u N (x=100) a končí u S (x=180)');
	const sipky = [...pole.matchAll(/<polygon points="([\d.]+),([\d.]+) ([\d.]+),([\d.]+) [\d.]+,[\d.]+"/g)];
	ok(sipky.length === 3, `tři šipky směru (${sipky.length})`);
	ok(sipky.every((m) => +m[1] > +m[3]), 'hrot každé šipky (první bod) leží NAPRAVO od základny — tok jde k S, ne zpátky k N');
}

console.log('\n— tlačítko „otočit“ prohodí barvy druhého magnetu i směr sil, hláška se změní na odpuzování —');
{
	const magnet2Pred = prvky.get('mopak-b-magnet2').innerHTML;
	const levaPred = /<rect x="300"[^>]*fill="(#[0-9a-f]+)"/.exec(magnet2Pred);
	ok(!!levaPred && levaPred[1] === '#e03131', `před otočením: levá (vnitřní) tvář druhého magnetu je N/červená (${levaPred && levaPred[1]})`);

	klik('mopak-b-otocit');
	const magnet2Po = prvky.get('mopak-b-magnet2').innerHTML;
	const levaPo = /<rect x="300"[^>]*fill="(#[0-9a-f]+)"/.exec(magnet2Po);
	ok(!!levaPo && levaPo[1] === '#1971c2', `po otočení: levá tvář je teď S/modrá (${levaPo && levaPo[1]})`);

	const stav = prvky.get('mopak-b-stav').textContent;
	ok(stav.includes('ODPUZUJÍ'), `hláška hlásí odpuzování: „${stav}"`);

	// šipky mezi magnety musí teď mířit OD SEBE — levá šipka (u magnetu 1)
	// doleva (tip < báze), pravá šipka (u magnetu 2) doprava (tip > báze).
	// Porovnávat se musí KAŽDÁ šipka se svou VLASTNÍ základnou, ne hrot proti
	// hrotu druhé šipky — to by nerozeznalo směr od pouhého posunu polohy.
	const sily = prvky.get('mopak-b-sily').innerHTML;
	const sipky = [...sily.matchAll(/<polygon points="([\d.]+),[\d.]+ ([\d.]+),[\d.]+ [\d.]+,[\d.]+"/g)].map((m) => ({ tip: +m[1], baze: +m[2] }));
	ok(sipky.length === 2, `dvě šipky síly (${sipky.length})`);
	ok(sipky[0].tip < sipky[0].baze && sipky[1].tip > sipky[1].baze,
		`levá šipka míří doleva (tip=${sipky[0].tip}<báze=${sipky[0].baze}) a pravá doprava (tip=${sipky[1].tip}>báze=${sipky[1].baze}) — magnety se rozestrkují`);

	klik('mopak-b-otocit'); // vrátit do výchozího stavu
	ok(prvky.get('mopak-b-stav').textContent.includes('PŘITAHUJÍ'), 'a po druhém kliknutí je scéna zpátky u přitahování');
}

console.log('\n— šipky síly při přitahování míří K SOBĚ (kontrola opačným směrem) —');
{
	const sily = prvky.get('mopak-b-sily').innerHTML; // scéna je teď zpátky nepřetočená (přitahování)
	const sipky = [...sily.matchAll(/<polygon points="([\d.]+),[\d.]+ ([\d.]+),[\d.]+ [\d.]+,[\d.]+"/g)].map((m) => ({ tip: +m[1], baze: +m[2] }));
	ok(sipky.length === 2, `dvě šipky síly (${sipky.length})`);
	ok(sipky[0].tip > sipky[0].baze && sipky[1].tip < sipky[1].baze,
		`levá šipka míří doprava (tip=${sipky[0].tip}>báze=${sipky[0].baze}) a pravá doleva (tip=${sipky[1].tip}<báze=${sipky[1].baze}) — magnety se táhnou k sobě`);
}

console.log('\n— tlačítko „rozlomit“: KAŽDÁ půlka má svůj vlastní N i S, druhý magnet zmizí —');
{
	klik('mopak-b-rozlomit');
	const m1 = prvky.get('mopak-b-magnet1').innerHTML;
	const pocetN = (m1.match(/>N</g) || []).length;
	const pocetS = (m1.match(/>S</g) || []).length;
	ok(pocetN === 2 && pocetS === 2, `po rozlomení jsou ve scéně DVA popisky N a DVA popisky S (mám N=${pocetN}, S=${pocetS})`);
	ok(prvky.get('mopak-b-magnet2').innerHTML === '', 'druhý magnet při rozlomení zmizí (nedává smysl ho zkoušet zrovna teď)');
	ok(prvky.get('mopak-b-pole').innerHTML === '', 'staré indukční čáry celého magnetu se smažou');
	ok(prvky.get('mopak-b-rozlomit').textContent.includes('Slepit'), `tlačítko teď nabízí slepení zpět: „${prvky.get('mopak-b-rozlomit').textContent}"`);
	const stav = prvky.get('mopak-b-stav').textContent;
	ok(stav.includes('KAŽDÁ') && stav.includes('severní') && stav.includes('jižní'), `hláška vysvětluje pointu: „${stav}"`);
	ok(prvky.get('mopak-b-vzdalenost').disabled === true, 'posuvník vzdálenosti je při rozlomení vypnutý (nemá na co působit)');

	klik('mopak-b-rozlomit'); // slepit zpět
	ok(prvky.get('mopak-b-magnet2').innerHTML !== '', 'po slepení se druhý magnet vrátí do scény');
	ok(prvky.get('mopak-b-pole').innerHTML !== '', 'a indukční čáry se nakreslí znovu');
	ok(prvky.get('mopak-b-vzdalenost').disabled === false, 'posuvník vzdálenosti je zase aktivní');
}

console.log('\n— rozlomené půlky: každá má N vlevo od svého S (nekříží se) —');
{
	klik('mopak-b-rozlomit');
	const g = rozlomeniGeom();
	const m1 = prvky.get('mopak-b-magnet1').innerHTML;
	const nLevy = new RegExp(`<rect x="${g.levy.nX0}"[^>]*fill="(#[0-9a-f]+)"`).exec(m1);
	const sLevy = new RegExp(`<rect x="${g.levy.sX0}"[^>]*fill="(#[0-9a-f]+)"`).exec(m1);
	const nPravy = new RegExp(`<rect x="${g.pravy.nX0}"[^>]*fill="(#[0-9a-f]+)"`).exec(m1);
	const sPravy = new RegExp(`<rect x="${g.pravy.sX0}"[^>]*fill="(#[0-9a-f]+)"`).exec(m1);
	ok(!!nLevy && nLevy[1] === '#e03131', 'levá půlka: N je červené');
	ok(!!sLevy && sLevy[1] === '#1971c2', 'levá půlka: S je modré');
	ok(!!nPravy && nPravy[1] === '#e03131', 'pravá půlka: taky má červené N (ne jen S!)');
	ok(!!sPravy && sPravy[1] === '#1971c2', 'pravá půlka: taky má modré S');
	klik('mopak-b-rozlomit'); // vrátit zpět
}

console.log('\n— nic v scéně B nevyleze z obrázku (viewBox 660×300) —');
{
	let mimo = null;
	for (const cm of [1, 3, 5]) {
		nastavSlider('mopak-b-vzdalenost', cm);
		for (const oto of [false, true]) {
			if (oto) klik('mopak-b-otocit');
			for (const g of [prvky.get('mopak-b-magnet1'), prvky.get('mopak-b-magnet2'), prvky.get('mopak-b-sily'), prvky.get('mopak-b-pole')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 300) mimo = `${g.id}: text x=${t[1]} y=${t[2]} (cm=${cm}, otočeno=${oto})`;
				}
				for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
					const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
					if (x < 0 || x + w > 660 || y < 0 || y + h > 300) mimo = `${g.id}: obdélník ${x},${y} ${w}×${h} (cm=${cm}, otočeno=${oto})`;
				}
			}
			if (oto) klik('mopak-b-otocit');
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'texty i obdélníky zůstávají uvnitř viewBoxu 660×300 pro krajní i střední vzdálenosti a obě natočení');
	nastavSlider('mopak-b-vzdalenost', 3);

	// a totéž pro rozlomený stav
	klik('mopak-b-rozlomit');
	let mimoRozlom = null;
	for (const t of prvky.get('mopak-b-magnet1').innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
		if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 300) mimoRozlom = `text x=${t[1]} y=${t[2]}`;
	}
	ok(mimoRozlom === null, mimoRozlom ? `rozlomený magnet leze z obrázku — ${mimoRozlom}` : 'i rozlomený magnet zůstává celý uvnitř viewBoxu');
	klik('mopak-b-rozlomit');
}

console.log('\n— odolnost: neplatná hodnota na posuvníku nezhroutí překreslení —');
{
	let spadloA = null, spadloB = null;
	try {
		prvky.get('mopak-a-slider').value = 'abc';
		for (const f of prvky.get('mopak-a-slider').posluchaci.input) f();
	} catch (e) { spadloA = e.message; }
	ok(spadloA === null, spadloA ? `scéna A spadla na neplatném posuvníku: ${spadloA}` : 'scéna A přežije neplatnou hodnotu posuvníku (spadne na vzorek 0)');
	ok(prvky.get('mopak-a-out').textContent === 'železo', 'a ukáže rozumný výchozí vzorek, ne „undefined"');
	nastavSlider('mopak-a-slider', 0);

	try {
		prvky.get('mopak-b-vzdalenost').value = '';
		for (const f of prvky.get('mopak-b-vzdalenost').posluchaci.input) f();
	} catch (e) { spadloB = e.message; }
	ok(spadloB === null, spadloB ? `scéna B spadla na prázdném posuvníku: ${spadloB}` : 'scéna B přežije prázdnou hodnotu posuvníku (spadne na 3 cm)');
	ok(prvky.get('mopak-b-out').textContent === '3 cm', `a ukáže rozumnou výchozí vzdálenost: „${prvky.get('mopak-b-out').textContent}"`);
	nastavSlider('mopak-b-vzdalenost', 3);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Roztřiď vzorky', 'Póly a magnetické pole', 'feromagnetické', 'severní pól', 'jižní pól']) {
		ok(html.includes(slovo), `v HTML je natvrdo „${slovo}"`);
	}
	ok(/id="mopak-a-slider"[^>]*min="0"[^>]*max="8"[^>]*value="0"/.test(html), 'posuvník vzorku jde 0 až 8, výchozí 0 (devět vzorků)');
	ok(/id="mopak-b-vzdalenost"[^>]*min="1"[^>]*max="5"[^>]*value="3"/.test(html), 'posuvník vzdálenosti jde 1 až 5 cm, výchozí 3');
	ok(!html.includes('kompas') && !html.includes('magnetka'), 'scéna neplete opakování s kompasem/magnetkou (to je látka 6. ročníku)');
	ok(!/zahřát|úder/i.test(html), 'a nemluví o ztrátě magnetismu teplem/úderem (taky mimo devítkový výklad)');
}

console.log(chyby === 0 ? '\n✅ Magnety — opakování: vše sedí.' : `\n❌ Magnety — opakování: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

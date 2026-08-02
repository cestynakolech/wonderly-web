#!/usr/bin/env node
// Ověření VlastniBlokySimulace.astro — vlastní bloky s parametry (informatika 7).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlavní hlídaná pointa: tři kopie kódu potřebují TŘI opravy, vlastní blok JEDNU.
// Kdyby někdo „opravil" chování tak, že jedna oprava spraví všechny kopie, celý smysl
// stránky padne a spadne to tady.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		_text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); if (v === '') this.deti = []; },
		classList: { tridy: new Set(), add(t) { this.tridy.add(t); }, remove(t) { this.tridy.delete(t); }, contains(t) { return this.tridy.has(t); } },
		// V prohlížeči jsou `className` a `classList` dva pohledy na totéž.
		get className() { return [...this.classList.tridy].join(' '); },
		set className(v) { this.classList.tridy = new Set(String(v).split(/\s+/).filter(Boolean)); },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(d) { this.deti.push(d); },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const tl = (d, id) => { const x = novy(id); Object.assign(x.dataset, d); return x; };
const skupiny = { '.vlb-rezim': [tl({ rezim: 'kopie' }, 'r-kopie'), tl({ rezim: 'blok' }, 'r-blok')] };
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: (s) => skupiny[s] || [],
	createElement: () => novy('e' + Math.random()),
	createElementNS: () => novy('e' + Math.random()),
};
const sandbox = { document, console, Array, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('vlb-svg');
const stavEl = prvky.get('vlb-stav');
const pocetEl = prvky.get('vlb-oprav-pocet');
const utvaryEl = prvky.get('vlb-utvary');
const programEl = prvky.get('vlb-program');
const btnOprav = prvky.get('vlb-oprav');
const btnReset = prvky.get('vlb-reset');

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

const { VELIKOSTI, UHEL_CHYBNY, UHEL_SPRAVNY, STRAN, STREDY } = svg.__meze;
const KOPIE = { rezim: 'kopie' };
const BLOK = { rezim: 'blok' };

// ———————————————————————— 1) GEOMETRIE: proč je chyba VIDĚT
{
	ok(svg.__jeUzavreny(50, UHEL_SPRAVNY) === true, 'při 90° se čtverec uzavře (konec padne na začátek)');
	ok(svg.__jeUzavreny(50, UHEL_CHYBNY) === false, 'při 80° se čára neuzavře — chyba je vidět, ne jen napsaná');
	// Součet vnějších úhlů uzavřeného mnohoúhelníku musí dát celý kruh.
	ok(STRAN * UHEL_SPRAVNY === 360, `${STRAN} × ${UHEL_SPRAVNY}° dá plných 360°`);
	ok(STRAN * UHEL_CHYBNY !== 360, 'chybný úhel plných 360° nedá');

	const b = svg.__body(50, UHEL_SPRAVNY, { x: 0, y: 0 });
	ok(b.length === STRAN + 1, 'čára má tolik bodů, kolik má čtverec stran (plus návrat)');
	// Strany musí být stejně dlouhé — jinak by to nebyl čtverec.
	const delky = [];
	for (let i = 1; i < b.length; i++) delky.push(Math.hypot(b[i].x - b[i - 1].x, b[i].y - b[i - 1].y));
	ok(delky.every((d) => Math.abs(d - 50) < 0.001), 'všechny strany mají délku podle parametru');

	// PARAMETR: větší číslo v okénku = větší čtverec, tentýž kód.
	const maly = svg.__body(50, UHEL_SPRAVNY, { x: 0, y: 0 });
	const velky = svg.__body(120, UHEL_SPRAVNY, { x: 0, y: 0 });
	const sirka = (body) => Math.max(...body.map((p) => p.x)) - Math.min(...body.map((p) => p.x));
	ok(sirka(velky) > sirka(maly), 'větší parametr nakreslí větší čtverec (tentýž blok)');
	ok(Math.abs(sirka(maly) - 50) < 0.001 && Math.abs(sirka(velky) - 120) < 0.001, 'a šířka odpovídá přesně zadanému číslu');

	// Všechno se musí vejít do plátna (viewBox 560 × 300; pod útvary ještě popisek na y = 285).
	let vsudeUvnitr = true;
	for (const uhel of [UHEL_SPRAVNY, UHEL_CHYBNY]) {
		VELIKOSTI.forEach((v, i) => {
			for (const p of svg.__body(v, uhel, STREDY[i])) {
				if (p.x < 6 || p.x > 554 || p.y < 40 || p.y > 262) vsudeUvnitr = false;
			}
		});
	}
	ok(vsudeUvnitr, 'žádný útvar nevyleze z plátna ani mimo popisky (obě varianty úhlu)');

	// Útvary se nesmí navzájem překrývat — jinak by nebylo poznat, který je který.
	const rozsah = (i, v, uhel) => {
		const b2 = svg.__body(v, uhel, STREDY[i]);
		return [Math.min(...b2.map((p) => p.x)), Math.max(...b2.map((p) => p.x))];
	};
	let odděleny = true;
	for (const uhel of [UHEL_SPRAVNY, UHEL_CHYBNY]) {
		for (let i = 1; i < VELIKOSTI.length; i++) {
			if (rozsah(i - 1, VELIKOSTI[i - 1], uhel)[1] >= rozsah(i, VELIKOSTI[i], uhel)[0]) odděleny = false;
		}
	}
	ok(odděleny, 'tři útvary stojí vedle sebe a nepřekrývají se');
}

// ———————————————————————— 2) ★ HLAVNÍ POINTA: kolik oprav je potřeba
{
	const zac = svg.__cistyStav();
	ok(svg.__zbyvaOprav(zac, KOPIE) === VELIKOSTI.length, `tři kopie kódu potřebují ${VELIKOSTI.length} opravy`);
	ok(svg.__zbyvaOprav(zac, BLOK) === 1, '★ vlastní blok potřebuje opravu jedinou');

	// U kopií spraví jedno kliknutí opravdu jen JEDEN útvar.
	const poJedne = svg.__oprav(zac, KOPIE);
	ok(svg.__uhelUtvaru(0, poJedne, KOPIE) === UHEL_SPRAVNY, 'první kopie je po opravě v pořádku');
	ok(svg.__uhelUtvaru(1, poJedne, KOPIE) === UHEL_CHYBNY && svg.__uhelUtvaru(2, poJedne, KOPIE) === UHEL_CHYBNY,
		'★ zbylé dvě kopie zůstaly křivé — každá má svůj vlastní úhel');
	ok(svg.__zbyvaOprav(poJedne, KOPIE) === 2, 'a zbývají ještě dvě opravy');

	// U bloku spraví totéž kliknutí všechny tři naráz.
	const blokPoJedne = svg.__oprav(zac, BLOK);
	ok([0, 1, 2].every((i) => svg.__uhelUtvaru(i, blokPoJedne, BLOK) === UHEL_SPRAVNY),
		'★ jedna oprava vlastního bloku spraví všechny tři čtverce');
	ok(svg.__zbyvaOprav(blokPoJedne, BLOK) === 0, 'a dál není co opravovat');

	// Počet kliknutí je celé srovnání stránky: 3 × 1.
	let s = svg.__cistyStav();
	for (let i = 0; i < 5; i++) s = svg.__oprav(s, KOPIE);
	ok(s.kliknuti === VELIKOSTI.length, `kopie si vyžádaly ${VELIKOSTI.length} kliknutí (další už nic nedělají)`);
	let sb = svg.__cistyStav();
	for (let i = 0; i < 5; i++) sb = svg.__oprav(sb, BLOK);
	ok(sb.kliknuti === 1, '★ vlastní blok si vyžádal jediné kliknutí');

	// Čistá funkce: původní stav se nepřepisuje.
	const puvodni = svg.__cistyStav();
	const kopie = JSON.stringify(puvodni);
	svg.__oprav(puvodni, KOPIE);
	ok(JSON.stringify(puvodni) === kopie, 'oprava původní stav nepřepisuje (čistá funkce)');
}

// ———————————————————————— 3) PROGRAM, KTERÝ ŽÁK ČTE
{
	klik(prvky.get('r-kopie'));
	const kopieRadky = svg.__programRadky().map((r) => r.text);
	const pocetOpakuj = kopieRadky.filter((t) => t.startsWith('opakuj')).length;
	ok(pocetOpakuj === VELIKOSTI.length, 've verzi s kopiemi je tentýž kód opravdu třikrát');
	ok(kopieRadky.filter((t) => t.includes('otoč se')).length === VELIKOSTI.length, 'a chybný úhel je na třech místech');
	ok(!kopieRadky.some((t) => t.includes('scénář pro')), 'verze s kopiemi žádný vlastní blok nemá');

	klik(prvky.get('r-blok'));
	const blokRadky = svg.__programRadky().map((r) => r.text);
	ok(blokRadky.filter((t) => t.startsWith('opakuj')).length === 1, 've verzi s blokem je kód jen jednou');
	ok(blokRadky.filter((t) => t.includes('otoč se')).length === 1, '★ a chybný úhel je na jediném místě');
	ok(blokRadky.some((t) => t.includes('scénář pro nakresli čtverec (velikost)')), 'je vidět hlavička vlastního bloku s parametrem');
	ok(VELIKOSTI.every((v) => blokRadky.some((t) => t === `nakresli čtverec (${v})`)), 'a tři volání, která se liší jen číslem v okénku');
	ok(blokRadky.some((t) => t.includes('(velikost)') && t.includes('dopředu')), 'uvnitř bloku se jede podle parametru, ne podle pevného čísla');
}

// ———————————————————————— 4) CO ŽÁK VIDÍ (DOM)
{
	klik(prvky.get('r-kopie'));
	klik(btnReset);
	ok(pocetEl.textContent === '0', 'počítadlo oprav začíná na nule');
	ok(utvaryEl.deti.length === VELIKOSTI.length * 3, 'na plátně jsou tři útvary, každý s popiskem a značkou');

	klik(btnOprav);
	ok(pocetEl.textContent === '1', 'po opravě se počítadlo zvedne');
	ok(/zůstaly křivé|zbývající/i.test(stavEl.innerHTML), 'a hláška řekne, že ostatní kopie zůstaly');
	klik(btnOprav); klik(btnOprav);
	ok(pocetEl.textContent === '3', 'u kopií to dá dohromady tři kliknutí');
	ok(/3 opravy|trvalo/i.test(stavEl.innerHTML), 'a shrnutí to pojmenuje');

	klik(prvky.get('r-blok'));
	ok(pocetEl.textContent === '0', 'přepnutí programu začíná načisto (jinak by srovnání 1 × 3 nedávalo smysl)');
	klik(btnOprav);
	ok(pocetEl.textContent === '1' && svg.__zbyvaOprav(svg.__stav(), svg.__volby()) === 0,
		'★ u vlastního bloku stačilo jediné kliknutí');
	ok(/jedin/i.test(stavEl.innerHTML), 'a hláška to zdůrazní');
	ok(programEl.deti.length > 0, 'program je vypsaný pod scénou');
	ok(programEl.deti.some((d) => d.classList.contains('vlb-opraveno')), 'opravený řádek je zvýrazněný');

	klik(btnReset);
	ok(svg.__stav().kliknuti === 0 && svg.__zbyvaOprav(svg.__stav(), svg.__volby()) === 1, 'tlačítko ↺ vrátí chybu zpět');
}

// ———————————————————————— 5) CO JE OPRAVDU NAKRESLENO NA PLÁTNĚ
//
// Doplněno po nálezu kontrolora: test do téhle chvíle četl jen pomocné funkce, takže
// obrázek směl lhát. Podvrh (`const uhel = UHEL_SPRAVNY` v překreslování) ukázal na plátně
// tři hotové zelené čtverce, zatímco hláška tvrdila „zbývající 2 zůstaly křivé" — a test
// přesto prošel. Teď se čte skutečné `points` a `stroke` nakreslených čar.
{
	/** Čáry ze scény: každý útvar má polyline + popisek + značku, takže každý třetí prvek. */
	const cary = () => utvaryEl.deti.filter((_, i) => i % 3 === 0);
	const mezera = (polyline) => {
		const b = polyline.atributy.points.split(' ').map((p) => p.split(',').map(Number));
		const [px, py] = b[0];
		const [kx, ky] = b[b.length - 1];
		return Math.hypot(kx - px, ky - py);
	};
	const znacky = () => utvaryEl.deti.filter((_, i) => i % 3 === 2);

	klik(prvky.get('r-kopie'));
	klik(btnReset);
	ok(cary().length === VELIKOSTI.length, 'na plátně jsou tři nakreslené čáry');
	ok(cary().every((c) => mezera(c) > 5), 'na začátku se ANI JEDNA čára neuzavře — chyba je vidět');
	ok(cary().every((c) => c.atributy.stroke === '#c92a2a'), 'a všechny tři jsou červené');
	ok(znacky().every((z) => z.textContent.includes('✗')), 'značky u všech tří hlásí neuzavřený útvar');

	klik(btnOprav);
	ok(mezera(cary()[0]) < 0.5, '★ po první opravě se PRVNÍ čára na plátně opravdu uzavře');
	ok(mezera(cary()[1]) > 5 && mezera(cary()[2]) > 5, '★ a zbylé dvě jsou na plátně pořád otevřené');
	ok(cary()[0].atributy.stroke === '#2b8a3e' && cary()[1].atributy.stroke === '#c92a2a', 'barva čáry odpovídá jejímu stavu');
	ok(znacky()[0].textContent.includes('✓') && znacky()[1].textContent.includes('✗'),
		'značky u útvarů nejsou jen barva — mají i ✓/✗ (čitelné i pro barvoslepého)');

	klik(prvky.get('r-blok'));
	klik(btnOprav);
	ok(cary().every((c) => mezera(c) < 0.5), '★ jedna oprava vlastního bloku uzavře na plátně VŠECHNY tři');
	ok(cary().every((c) => c.atributy.stroke === '#2b8a3e'), 'a všechny tři čáry zezelenají');

	// Hláška nesmí tvrdit něco jiného, než co ukazuje počítadlo (podvrh kontrolora prošel,
	// protože stačilo, aby se v textu vyskytlo slovo „trvalo").
	klik(prvky.get('r-kopie'));
	klik(btnReset);
	klik(btnOprav); klik(btnOprav); klik(btnOprav);
	ok(stavEl.innerHTML.includes(pocetEl.textContent), 'závěrečná hláška u kopií uvádí skutečný počet oprav');
	ok(!/jedin/i.test(stavEl.innerHTML), 'a netvrdí, že to šlo jedinou opravou');
	ok(!/zbývající 1 zůstaly/i.test(stavEl.innerHTML), 'hlášky mají správnou českou shodu');

	// Srovnání 3 × 1 musí zůstat vidět i po přepnutí režimu.
	klik(prvky.get('r-blok'));
	klik(btnOprav);
	const v = svg.__vysledky();
	ok(v.kopie === VELIKOSTI.length && v.blok === 1, '★ obě čísla srovnání zůstanou zapamatovaná (3 × 1)');
	ok(prvky.get('vlb-srovnani').textContent.includes('3') && prvky.get('vlb-srovnani').textContent.includes('1'),
		'a žák je vidí naráz, nemusí je držet v hlavě');
}

// ———————————————————————— 6) NÁZVY BLOKŮ PODLE ČESKÉ PALETY
{
	// Oba režimy: chybný název bloku v kopiích dřív nikdo nekontroloval (nález kontrolora).
	klik(prvky.get('r-blok'));
	const zBloku = svg.__programRadky().map((r) => r.text);
	klik(prvky.get('r-kopie'));
	const zKopii = svg.__programRadky().map((r) => r.text);
	const texty = [...zBloku, ...zKopii].join(' \n ').toLowerCase();
	ok(texty.includes('opakuj (4) krát'), 'blok opakování má název z české palety');
	ok(texty.includes('scénář pro'), 'hlavička vlastního bloku má název z české palety');
	ok(zKopii.some((t) => t.includes('dopředu o')), 'a správný název má i verze s kopiemi');
	ok(/otoč se .* o \(\d+\) stupňů/.test(texty), 'blok otáčení má tvar z české palety');
	ok(texty.includes('dopředu o'), 'blok pohybu má název z české palety (ne „jdi … kroků")');

	// Názvy se neporovnávají s vlastními literály, ale proti tabulce zakázaných tvarů,
	// kterou plní zdroj pravdy scratch-l10n.
	const { ZAKAZANE } = await import('../nazvy-bloku.mjs');
	const sedi = (v, t) => (v instanceof RegExp ? v.test(t) : t.includes(v));
	const spatne = ZAKAZANE.filter((z) => sedi(z.vzor, texty));
	ok(spatne.length === 0, `žádný název bloku neodporuje české paletě${spatne.length ? ': ' + spatne.map((z) => z.spravne).join(', ') : ''}`);
}

console.log(chyby === 0 ? `\n✅ Vlastní bloky: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);

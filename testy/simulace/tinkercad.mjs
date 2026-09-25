#!/usr/bin/env node
// Ověření TinkercadSimulace.astro — „kouzlo DÍRY" v Tinkercadu.
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), takže se
// kontroluje kód, který opravdu kreslí scénu, ne jeho opis.
//
// Na co se hlídá:
//  • všechny polohy všech tří posuvníků dávají CELÁ čísla (mm),
//  • díra se vykousne TEPRVE po seskupení (do té doby je placka celá),
//  • dvě PLNÁ tělesa po seskupení splynou v jedno (jedna barva, žádný otvor),
//  • zvednutá díra vykousne jen mělký důlek — a zvednutá o celou tloušťku nic,
//  • dírka blíž ke kraji než její poloměr přeteče přes okraj (záporný zbytek
//    materiálu se píše se znaménkem −, ne s pomlčkou),
//  • co panel v obrázku TVRDÍ, to musí být na kresbě také VIDĚT — a od 25. 9. 2026
//    se neměří jen ATRIBUT `fill`, ale i to, co je z kresby OPRAVDU vidět:
//    kam až sahá stěna otvoru (px² mimo ústí) a jak velká modrá plocha dokládá
//    „projde skrz" (px² v řezu, které nepřekrývá placka).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/TinkercadSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1] ?? '';
const novy = (id) => {
	const p = {
		id, atributy: {}, _text: '', innerHTML: '', dataset: {}, posluchaci: {}, tridy: new Set(),
		value: hodnotaZHtml(id),
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); },
		classList: {
			add(t) { p.tridy.add(t); }, remove(t) { p.tridy.delete(t); },
			contains(t) { return p.tridy.has(t); },
		},
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
};
const sandbox = { document, console, Math, Number, String };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const el = (id) => prvky.get(id) || novy(id);
const svg = el('tc-svg');
const M = svg.__meze;
const valecPlast = el('tc-valec-plast');
const valecVrch = el('tc-valec-vrch');
const otvorStena = el('tc-otvor-stena');
const otvorVnitrek = el('tc-otvor-vnitrek');
const otvorOkraj = el('tc-otvor-okraj');
const rezPlacka = el('tc-rez-placka');
const rezOtvor = el('tc-rez-otvor');
const rezValec = el('tc-rez-valec');
const tRezim = el('tc-t-rezim');
const tVypocet = el('tc-t-vypocet');
const tVysledek = el('tc-t-vysledek');
const stavEl = el('tc-stav');
const btnSeskup = el('tc-seskup');
const btnPlne = el('tc-plne');
const btnDira = el('tc-dira');
const btnReset = el('tc-reset');
const kotaText = el('tc-kota-x-text');
const kotaSvisla = el('tc-kota-svisla');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (e) => e.posluchaci.click.forEach((f) => f());
const posun = (id, hodnota) => {
	const p = el(id);
	p.value = String(hodnota);
	p.posluchaci.input.forEach((f) => f());
};
const cislo = (prvek, atribut) => Number(prvek.getAttribute(atribut));
/** Stejné zaokrouhlení, jaké komponenta používá při zápisu do SVG (1 desetinné místo). */
const zaokr = (n) => Math.round(n * 10) / 10;
/** Vrátí simulaci do výchozího stavu (⌀ 6 mm, 6 mm od kraje, na ploše, díra, neseskupeno). */
const odZacatku = () => klik(btnReset);

// ─────────── měřidla VIDITELNOSTI (co je z kresby opravdu vidět) ───────────
// Atribut `fill` sám o sobě nic nedokazuje: modré dno může být celé odříznuté
// ořezem a hnědá stěna může ležet mimo ústí přes neporušenou plochu placky.
// Obojí se 25. 9. 2026 stalo a testem to prošlo — proto tahle měřidla.

/** Rozebere cestu (jen příkazy M/L/A/Z, které scéna používá) na body, poloměry
 *  oblouků a počet podcest. */
function rozborCesty(d) {
	const body = [];
	const oblouky = [];
	for (const usek of d.match(/[MLAZ][^MLAZ]*/g) ?? []) {
		const c = (usek.slice(1).match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
		if (usek[0] === 'M' || usek[0] === 'L') for (let i = 0; i + 1 < c.length; i += 2) body.push([c[i], c[i + 1]]);
		if (usek[0] === 'A') { oblouky.push([c[0], c[1]]); body.push([c[5], c[6]]); }
	}
	return { body, oblouky, podcest: (d.match(/M/g) ?? []).length };
}

/** Cesta → seznam mnohoúhelníků (oblouk se navzorkuje). Oblouky ve scéně vedou
 *  vždy mezi krajními body elipsy (vodorovně), takže se dají navzorkovat přesně;
 *  jiný tvar funkce NAHLÁSÍ, ať se nemlčí o tom, co změřit neumí. */
function cestaNaPolygony(d) {
	const polygony = [];
	let cesta = null;
	let kde = [0, 0];
	for (const usek of d.match(/[MLAZ][^MLAZ]*/g) ?? []) {
		const c = (usek.slice(1).match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
		if (usek[0] === 'M') { cesta = [[c[0], c[1]]]; polygony.push(cesta); kde = [c[0], c[1]]; }
		else if (usek[0] === 'L') { for (let i = 0; i + 1 < c.length; i += 2) { cesta.push([c[i], c[i + 1]]); kde = [c[i], c[i + 1]]; } }
		else if (usek[0] === 'A') {
			const [orx, ory, , , sweep, x2, y2] = c;
			if (Math.abs(y2 - kde[1]) > 0.2 || Math.abs(Math.abs(x2 - kde[0]) - 2 * orx) > 0.3) {
				throw new Error(`oblouk „${usek.trim()}" nevede mezi krajními body elipsy — tohle měřidlo ho neumí změřit`);
			}
			const nahoru = (sweep === 1) === (x2 > kde[0]);
			for (let i = 1; i <= 48; i++) {
				const t = (Math.PI * i) / 48;
				cesta.push([kde[0] + ((x2 - kde[0]) * (1 - Math.cos(t))) / 2, kde[1] + (nahoru ? -1 : 1) * ory * Math.sin(t)]);
			}
			kde = [x2, y2];
		}
	}
	return polygony;
}

const vPolygonech = (x, y, polygony) => {
	let uvnitr = false;
	for (const b of polygony) {
		for (let i = 0, j = b.length - 1; i < b.length; j = i++) {
			const [xi, yi] = b[i];
			const [xj, yj] = b[j];
			if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) uvnitr = !uvnitr;
		}
	}
	return uvnitr;
};
const vElipse = (x, y, e, rezerva = 0) =>
	((x - e.cx) / (e.rx + rezerva)) ** 2 + ((y - e.cy) / (e.ry + rezerva)) ** 2 <= 1;

/** Obsah útvaru v px² a kolik z něj leží MIMO zadanou elipsu (mřížka 0,5 px). */
function obsahAMimoElipsu(polygony, elipsa) {
	const vsechny = polygony.flat();
	const minX = Math.min(...vsechny.map((b) => b[0]));
	const maxX = Math.max(...vsechny.map((b) => b[0]));
	const minY = Math.min(...vsechny.map((b) => b[1]));
	const maxY = Math.max(...vsechny.map((b) => b[1]));
	let obsah = 0;
	let mimo = 0;
	for (let x = minX; x <= maxX; x += 0.5) for (let y = minY; y <= maxY; y += 0.5) {
		if (!vPolygonech(x, y, polygony)) continue;
		obsah += 0.25;
		if (!vElipse(x, y, elipsa, 0.3)) mimo += 0.25;
	}
	return { obsah, mimo };
}

/** Jaká část elipsy je vidět po ořezu mnohoúhelníkem (mřížka 0,25 px). */
function viditelnyPodilElipsy(e, orez) {
	let uvnitr = 0;
	let videt = 0;
	for (let x = e.cx - e.rx; x <= e.cx + e.rx; x += 0.25) for (let y = e.cy - e.ry; y <= e.cy + e.ry; y += 0.25) {
		if (!vElipse(x, y, e)) continue;
		uvnitr++;
		if (vPolygonech(x, y, [orez])) videt++;
	}
	return videt / uvnitr;
}

/** Obsah obdélníku v px², který NEPŘEKRÝVÁ zadaná cesta (mřížka 0,5 px). */
function nezakrytyObsah(obdelnik, polygony) {
	let volno = 0;
	for (let x = obdelnik.x; x <= obdelnik.x + obdelnik.sirka; x += 0.5) {
		for (let y = obdelnik.y; y <= obdelnik.y + obdelnik.vyska; y += 0.5) {
			if (!vPolygonech(x, y, polygony)) volno += 0.25;
		}
	}
	return volno;
}

// rozsahy posuvníků se čtou ZE ŠABLONY, ne z hlavy — jinak by test kontroloval jiný přístroj
const rozsah = (id) => {
	const znacka = zdroj.match(new RegExp(`<input[^>]*id="${id}"[^>]*>`))[0];
	const cti = (a) => Number(znacka.match(new RegExp(`${a}="([^"]*)"`))[1]);
	const hodnoty = [];
	for (let v = cti('min'); v <= cti('max'); v += cti('step')) hodnoty.push(v);
	return hodnoty;
};
const PRUMERY = rozsah('tc-d');
const POLOHY = rozsah('tc-x');
const ZVEDNUTI = rozsah('tc-h');

console.log('— rozměry placky odpovídají tomu, co je napsané ve výkladu i v obrázku —');
{
	ok(M.DELKA === 40 && M.SIRKA === 20 && M.TLOUSTKA === 4, `placka ${M.DELKA} × ${M.SIRKA} × ${M.TLOUSTKA} mm`);
	ok(M.VYSKA_VALCE > M.TLOUSTKA, `válec je vyšší (${M.VYSKA_VALCE} mm) než placka (${M.TLOUSTKA} mm) — jinak by dírka nikdy neprošla skrz`);
	ok(/placka je 4 mm silná/.test(zdroj), 'tloušťka placky je napsaná přímo v obrázku');
	ok(/>40 mm</.test(zdroj), 'a délka 40 mm je okótovaná taky');
}

console.log('— text kolem obrázku slibuje přesně to, co simulace dělá —');
{
	const uvod = zdroj.slice(zdroj.indexOf('<section'), zdroj.indexOf('</svg>'));
	ok(/vznikne DÍRA/.test(uvod), 'nadpis mluví o vzniku díry — to je jádro výkladu k Tinkercadu');
	ok(/Seskupit \(Ctrl\+G\)/.test(uvod), 'zadání pod nadpisem jmenuje příkaz Seskupit i zkratku Ctrl+G');
	ok(/40 × 20 × 4 mm/.test(uvod), 'a rovnou říká rozměry placky, se kterými se počítá');
	ok(/Ctrl\+G/.test(el('tc-seskup').textContent), `zkratka je i na tlačítku: „${el('tc-seskup').textContent}"`);
}

console.log('\n— stav hned po načtení stránky (ještě nikdo nic nepřepnul) —');
{
	const s = svg.__stav();
	ok(s.d === 6 && s.xStred === 6 && s.zvednuti === 0,
		`scéna začíná na ⌀ ${s.d} mm, ${s.xStred} mm od kraje, zvednutí ${s.zvednuti} mm`);
	ok(String(s.d) === el('tc-d').value && String(s.xStred) === el('tc-x').value
		&& String(s.zvednuti) === el('tc-h').value,
		'a táhla posuvníků stojí přesně na těch hodnotách (kresba a ovládání si neodporují)');
	ok(s.rezim === 'dira' && !s.seskupeno, 'začíná se dírou, neseskupenou — tak, jak zní zadání pod nadpisem');
	ok(M.VYSKA_VALCE === 6 && M.S === 6.5 && M.KY_Y === 2.1,
		`ukotvené konstanty kresby: válec ${M.VYSKA_VALCE} mm, ${M.S} px/mm do šířky, ${M.KY_Y} px/mm do hloubky`);
	// Zploštění NENÍ volitelná ozdoba: musí být přesně poměr „px na mm hloubky / px na mm šířky",
	// jinak nakreslená kružnice tvrdí větší hloubku, než jakou v té scéně 1 mm má.
	ok(M.ZPLOSTENI === 2.1 / 6.5, `zploštění elipsy = ${M.KY_Y} / ${M.S} = ${zaokr(M.ZPLOSTENI * 100) / 100} (ne hodnota od oka)`);
}

console.log('\n— kresba tělesa odpovídá jeho rozměrům v mm (projekce) —');
{
	const proj = (x, y, z) => `${zaokr(svg.__px(x, y))},${zaokr(svg.__py(y, z))}`;
	const polygon = (id) => zdroj.match(new RegExp(`id="${id}"[^>]*points="([^"]*)"`))[1];
	const steny = {
		'tc-placka-horni': [[0, 0, 4], [40, 0, 4], [40, 20, 4], [0, 20, 4]],
		'tc-placka-predni': [[0, 0, 4], [40, 0, 4], [40, 0, 0], [0, 0, 0]],
		'tc-placka-bok': [[40, 0, 4], [40, 20, 4], [40, 20, 0], [40, 0, 0]],
	};
	for (const [id, rohy] of Object.entries(steny)) {
		const ocekavano = rohy.map(([x, y, z]) => proj(x, y, z)).join(' ');
		ok(polygon(id) === ocekavano, `${id}: ${polygon(id)} = rohy kvádru 40 × 20 × 4 mm`);
	}
	const clip = zdroj.match(/<clipPath[\s\S]*?points="([^"]*)"/)[1];
	ok(clip === polygon('tc-placka-horni'),
		'otvor se ořezává PŘESNĚ horní plochou placky — co je mimo ni, se nevykousne');
	const kotaZacatek = Number(zdroj.match(/id="tc-kota-x"[^>]*x1="([^"]*)"/)[1]);
	ok(kotaZacatek === zaokr(svg.__px(0, M.SIRKA / 2)),
		`kóta začíná u levého kraje placky v rovině dírky (${kotaZacatek} px)`);
	ok(zaokr(svg.__py(0, 0)) === 252 && zaokr(svg.__py(0, M.TLOUSTKA)) === 226,
		'placka stojí na pracovní ploše a je vysoká 4 mm (252 → 226 px)');
}

console.log('\n— VŠECHNY polohy posuvníků dávají celá čísla (pravidlo pro děti) —');
{
	const zbytky = [];
	for (const d of PRUMERY) for (const x of POLOHY) zbytky.push(svg.__okrajMaterialu(x, d));
	ok(PRUMERY.length === 5 && POLOHY.length === 7 && ZVEDNUTI.length === 5,
		`posuvníky: ${PRUMERY.join('/')} mm · ${POLOHY.join('/')} mm · ${ZVEDNUTI.join('/')} mm`);
	ok(PRUMERY.every((d) => d % 2 === 0), 'každý průměr je sudý, takže poloměr vychází v celých mm');
	ok(zbytky.every(Number.isInteger), `všech ${zbytky.length} kombinací dává celý zbytek materiálu`);
	ok(ZVEDNUTI.every((h) => Number.isInteger(svg.__hloubkaVykusu(h))), 'i hloubka výkusu je vždy celé číslo');
	ok(svg.__okrajMaterialu(6, 6) === 3 && svg.__okrajMaterialu(14, 4) === 12,
		'zbytek u kraje = vzdálenost středu − poloměr (6 − 3 = 3; 14 − 2 = 12)');
	ok(svg.__okrajMaterialu(2, 12) === -4, 'a u příliš velké dírky vyjde záporně: 2 − 6 = −4');
}

console.log('\n— hloubka výkusu = překryv válce s plackou —');
{
	const hloubky = ZVEDNUTI.map((h) => svg.__hloubkaVykusu(h));
	ok(hloubky.join(' ') === '4 3 2 1 0', `zvednutí 0–4 mm → hloubka ${hloubky.join(' ')} mm (o co se válec zvedne, o to mělčí důlek)`);
	ok(svg.__projdeSkrz(0) === true, 'na ploše (zvednutí 0 mm) díra projde skrz');
	ok(ZVEDNUTI.filter((h) => h > 0).every((h) => svg.__projdeSkrz(h) === false),
		'jakmile je díra zvednutá, otvor skrz už neprojde');
	ok(svg.__hloubkaVykusu(4) === 0, 'zvednutí o celou tloušťku placky = žádný překryv, žádný výkus');
}

console.log('\n— nakreslená dírka se VEJDE do placky (všechny kombinace posuvníků) —');
{
	// Nález nezávislé kontroly 25. 9. 2026: zploštění 0,55 kreslilo kružnici do hloubky
	// 1,7× větší, než jakou má v téhle scéně, takže dírka ⌀ 12 mm byla vysoká 42,9 px,
	// zatímco celá 20mm hloubka placky měří 42 px — dírka vylézala přes hranu placky.
	// Proto se měří VŠECH 175 kombinací, ne jedna.
	const HLOUBKA_PLACKY_PX = 42;   // 20 mm × 2,1 px/mm (přední hrana 226 px, zadní 184 px)
	let nejvyssi = 0;
	let nejvyssiPopis = '';
	let vejdeSe = 0;
	let poctive = 0;
	let vevnitr = 0;
	let kombinaci = 0;
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of ZVEDNUTI) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		kombinaci++;
		const r = svg.__polomer(d);
		// poctivost: elipsa smí být do hloubky vysoká právě tolik px, kolik jich má r mm hloubky
		const projekceR = zaokr(svg.__py(0, 0) - svg.__py(r, 0));
		for (const prvek of [valecVrch, otvorOkraj, otvorVnitrek]) {
			const ry = cislo(prvek, 'ry');
			if (ry === projekceR) poctive++;
			if (2 * ry <= HLOUBKA_PLACKY_PX) vejdeSe++;
			if (2 * ry > nejvyssi) { nejvyssi = 2 * ry; nejvyssiPopis = `⌀ ${d} mm`; }
		}
		// okraj dírky leží v horní ploše placky: nesmí přetéct ani za zadní (184), ani za přední (226) hranu
		const cy = cislo(otvorOkraj, 'cy');
		const ry = cislo(otvorOkraj, 'ry');
		if (cy - ry >= 184 && cy + ry <= 226) vevnitr++;
	}
	ok(kombinaci === 175, `proměřeno ${kombinaci} kombinací průměru × polohy × zvednutí`);
	ok(poctive === 3 * kombinaci,
		`elipsa je ve všech ${poctive} případech zploštělá právě podle projekce hloubky (r mm hloubky = r × 2,1 px)`);
	ok(vejdeSe === 3 * kombinaci,
		`nejvyšší nakreslená dírka (${nejvyssiPopis}) zabere ${nejvyssi} px z ${HLOUBKA_PLACKY_PX} px hloubky placky — vejde se`);
	ok(vevnitr === kombinaci, `okraj dírky leží ve všech ${vevnitr} kombinacích uvnitř horní plochy placky (184–226 px)`);
	ok(nejvyssi < HLOUBKA_PLACKY_PX, `a ani v nejhorším případě dírka přes hranu placky nepřeteče (${nejvyssi} < ${HLOUBKA_PLACKY_PX} px)`);
}

console.log('\n— pro 6. ročník: nikde ani jedno záporné číslo —');
{
	// Záporná čísla se probírají až v 7. ročníku. Místo „2 − 6 = −4 mm" scéna píše,
	// o kolik mm dírka kraj přesahuje. Hlídá se to na VŠECH stavech, ne na jednom.
	const zaporne = [];
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of ZVEDNUTI) for (const seskup of [false, true]) {
		odZacatku();
		if (seskup) klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		const texty = [tVypocet.textContent, tVysledek.textContent, tRezim.textContent, stavEl.innerHTML, kotaText.textContent];
		// číslo se znaménkem nalepeným na cifru = záporné číslo (u operace minus je mezera)
		for (const t of texty) if (/[-−]\d/.test(t)) zaporne.push(`${d}/${x}/${h}: ${t}`);
	}
	ok(zaporne.length === 0, `ve všech 350 stavech scény není ani jedno záporné číslo${zaporne.length ? ` — např. „${zaporne[0]}"` : ''}`);
	ok(svg.__presahKraje(2, 12) === 4 && svg.__presahKraje(2, 4) === 0,
		'přesah kraje = poloměr − vzdálenost od kraje (6 − 2 = 4; 2 − 2 = 0)');
}

console.log('\n— výchozí stav: díra vedle placky, placka zatím CELÁ —');
{
	odZacatku();
	const s = svg.__stav();
	ok(s.d === 6 && s.xStred === 6 && s.zvednuti === 0 && s.rezim === 'dira' && !s.seskupeno,
		`⌀ ${s.d} mm, ${s.xStred} mm od kraje, na ploše, díra, neseskupeno`);
	ok(valecPlast.getAttribute('fill') === M.SRAFA && valecVrch.getAttribute('fill') === M.SRAFA,
		'válec je šrafovaný — tak Tinkercad kreslí díru');
	ok(valecPlast.getAttribute('opacity') === '1', 'a je vidět');
	ok(valecPlast.getAttribute('fill-opacity') === '0.7' && valecVrch.getAttribute('fill-opacity') === '0.7',
		'díra je průsvitná (fill-opacity 0,7), takže je pod ní vidět placka — jako v Tinkercadu');
	ok(otvorStena.getAttribute('opacity') === '0' && otvorVnitrek.getAttribute('opacity') === '0'
		&& otvorOkraj.getAttribute('opacity') === '0', 'v placce ale zatím ŽÁDNÝ otvor není');
	ok(rezOtvor.getAttribute('opacity') === '0'
		&& rezPlacka.getAttribute('d') === 'M 284,132 L 544,132 L 544,158 L 284,158 Z',
		`a v řezu zboku je placka celá: „${rezPlacka.getAttribute('d')}"`);
	ok(/neseskupeno/.test(tRezim.textContent), `panel to říká: „${tRezim.textContent}"`);
	ok(tVypocet.textContent.includes('6 − 3 = 3 mm'), `a počítá zbytek materiálu: „${tVypocet.textContent}"`);
	ok(/Seskupit/.test(btnSeskup.textContent), `tlačítko nabízí seskupení: „${btnSeskup.textContent}"`);
}

console.log('\n— Ctrl+G: teprve seskupení vykousne otvor —');
{
	odZacatku();
	klik(btnSeskup);
	ok(otvorStena.getAttribute('opacity') === '1' && otvorVnitrek.getAttribute('opacity') === '1',
		'po seskupení je otvor vidět');
	ok(valecPlast.getAttribute('opacity') === '0' && valecVrch.getAttribute('opacity') === '0',
		'a samotná díra zmizela — zůstalo jedno těleso s otvorem');
	ok(otvorVnitrek.getAttribute('fill') === M.PLOCHA, 'v ústí otvoru je vidět pracovní plocha — otvor prochází skrz');
	ok(/projde skrz/.test(tVysledek.textContent), `panel: „${tVysledek.textContent}"`);
	ok(/Zrušit seskupení/.test(btnSeskup.textContent), `tlačítko teď nabízí opak: „${btnSeskup.textContent}"`);
	klik(btnSeskup);
	ok(otvorStena.getAttribute('opacity') === '0' && valecPlast.getAttribute('opacity') === '1',
		'zrušení seskupení otvor zase odstraní a díru vrátí (cesta tam i zpět)');
}

console.log('\n— dvě PLNÁ tělesa: žádný otvor, ale jedno těleso —');
{
	odZacatku();
	klik(btnPlne);
	ok(valecPlast.getAttribute('fill') === M.VALEC_PLAST, 'nesloučený plný válec má vlastní barvu');
	ok(valecPlast.getAttribute('fill-opacity') === '1' && valecVrch.getAttribute('fill-opacity') === '1',
		'a je neprůhledný — plné těleso není přes co vidět');
	ok(btnPlne.classList.contains('tc-aktivni') && !btnDira.classList.contains('tc-aktivni'),
		'přepínač ukazuje, které těleso je zvolené');
	ok(btnPlne.getAttribute('aria-pressed') === 'true' && btnDira.getAttribute('aria-pressed') === 'false',
		'a odečítač se to dozví z aria-pressed');
	klik(btnSeskup);
	ok(valecPlast.getAttribute('fill') === M.PLACKA_PLAST && valecVrch.getAttribute('fill') === M.PLACKA_VRCH,
		'po seskupení má válec barvu placky — z dvou těles je jedno');
	ok(valecPlast.getAttribute('opacity') === '1', 'a zůstal na placce jako výstupek');
	ok(otvorStena.getAttribute('opacity') === '0' && otvorVnitrek.getAttribute('opacity') === '0'
		&& rezOtvor.getAttribute('opacity') === '0',
		'ŽÁDNÝ otvor nevznikl — plné těleso nic nevykousne (ani v řezu)');
	ok(rezValec.getAttribute('opacity') === '1' && rezValec.getAttribute('fill') === M.PLACKA_PLAST,
		'a v řezu zboku zůstal výstupek v barvě placky');
	ok(/splynula v jedno/.test(tVysledek.textContent), `panel: „${tVysledek.textContent}"`);
	klik(btnDira);
	ok(valecPlast.getAttribute('fill') === M.SRAFA && otvorStena.getAttribute('opacity') === '1',
		'přepnutí zpět na díru otvor v seskupeném tělese vykousne');
}

console.log('\n— zvednutá díra (černá šipka) vykousne jen důlek —');
{
	odZacatku();
	klik(btnSeskup);
	const skrzVRezu = cislo(rezOtvor, 'height');
	posun('tc-h', 2);
	ok(/2 mm/.test(tVysledek.textContent) && /důlek|neprojde/.test(tVysledek.textContent),
		`zvednutí 2 mm: „${tVysledek.textContent}"`);
	ok(otvorVnitrek.getAttribute('fill') === M.DNO_DULKU, 'na dně důlku je materiál placky, ne pracovní plocha');
	const dulekVRezu = cislo(rezOtvor, 'height');
	ok(skrzVRezu === 26 && dulekVRezu === 13,
		`a v řezu je důlek mělčí než průchozí otvor (${dulekVRezu} px = 2 mm, ${skrzVRezu} px = 4 mm)`);
	posun('tc-h', 4);
	ok(otvorStena.getAttribute('opacity') === '0' && valecPlast.getAttribute('opacity') === '0',
		'zvednutí o 4 mm: překryv s plackou je 0 mm, po seskupení díra prostě zmizela');
	ok(/přesně na povrchu placky/.test(tVysledek.textContent), `panel: „${tVysledek.textContent}"`);
	ok(/placka zůstala celá/.test(stavEl.innerHTML), 'a vysvětlení pod obrázkem říká proč');
	posun('tc-h', 0);
	ok(otvorVnitrek.getAttribute('fill') === M.PLOCHA && /projde skrz/.test(tVysledek.textContent),
		'spuštění zpět na plochu otvor zase protáhne skrz');
}

console.log('\n— dírka u kraje: kdy je zářez a kdy ještě otvor —');
{
	odZacatku();
	klik(btnSeskup);
	posun('tc-d', 12);
	posun('tc-x', 2);
	ok(svg.__stav().d === 12 && svg.__stav().xStred === 2, 'nastaveno ⌀ 12 mm, 2 mm od kraje');
	ok(tVypocet.textContent.includes('přesahuje kraj o 6 − 2 = 4 mm'), `panel počítá přesah: „${tVypocet.textContent}"`);
	ok(!/[-−]\d/.test(tVypocet.textContent), 'a nepíše záporné číslo — to se probírá až v 7. ročníku');
	ok(/přetekla přes kraj/.test(tVysledek.textContent), `hlásí následek: „${tVysledek.textContent}"`);
	ok(/zářez/.test(stavEl.innerHTML), 'vysvětlení pod obrázkem mluví o zářezu místo otvoru');
	posun('tc-x', 8);
	ok(tVypocet.textContent.includes('8 − 6 = 2 mm') && /projde skrz/.test(tVysledek.textContent),
		`posun dál od kraje otvor spraví: „${tVysledek.textContent}"`);
	// MEZ (nález nezávislé kontroly 25. 9. 2026): při zbytku 0 mm je na obrázku CELÁ dírka,
	// která se kraje jen dotýká — text proto nesmí tvrdit zářez. Ten vzniká teprve od záporného zbytku.
	posun('tc-d', 4);
	posun('tc-x', 2);
	ok(svg.__okrajMaterialu(2, 4) === 0 && /projde skrz/.test(tVysledek.textContent),
		`zbytek 0 mm = dírka se kraje dotýká, otvor to pořád je: „${tVysledek.textContent}"`);
	ok(!/přetekla/.test(tVysledek.textContent) && !/zářez/.test(stavEl.innerHTML),
		'o zářezu ani o přetečení se u dotyku nemluví — na obrázku je celá dírka');
	ok(/dotýká/.test(stavEl.innerHTML), `a vysvětlení to pojmenuje: „${stavEl.innerHTML.replace(/<[^>]*>/g, '').slice(-60)}"`);
	posun('tc-d', 6);
	ok(svg.__okrajMaterialu(2, 6) === -1 && /přetekla přes kraj/.test(tVysledek.textContent)
		&& /zářez/.test(stavEl.innerHTML),
		`o 1 mm víc a dírka už kraj přesahuje → zářez: „${tVysledek.textContent}"`);
	ok(tVypocet.textContent.includes('přesahuje kraj o 3 − 2 = 1 mm'), `panel: „${tVypocet.textContent}"`);
	posun('tc-x', 4);
	ok(svg.__okrajMaterialu(4, 6) === 1 && /projde skrz/.test(tVysledek.textContent),
		`zbytek 1 mm je otvor s materiálem u kraje: „${tVysledek.textContent}"`);
	ok(!/zářez/.test(stavEl.innerHTML) && !/dotýká/.test(stavEl.innerHTML) && /prochází skrz/.test(stavEl.innerHTML),
		'a vysvětlení nemluví ani o zářezu, ani o dotyku kraje');
}

console.log('\n— kresba se řídí čísly z posuvníků (ne naopak) —');
{
	odZacatku();
	const rx6 = cislo(valecVrch, 'rx');
	posun('tc-d', 12);
	const rx12 = cislo(valecVrch, 'rx');
	ok(rx6 === 6.5 * 3 && rx12 === 6.5 * 6, `poloměr na obrazovce = ${M.S} px na mm (${rx6} px pro ⌀ 6 mm, ${rx12} px pro ⌀ 12 mm)`);
	ok(rx12 === 2 * rx6, 'dvojnásobný průměr = dvojnásobná dírka v obrázku');
	ok(cislo(valecVrch, 'ry') === 12.6, `dírka ⌀ 12 mm je do hloubky vysoká ${cislo(valecVrch, 'ry')} px = 6 mm × 2,1 px (ne 21,5 px jako při zploštění od oka)`);
	posun('tc-d', 6);
	const cx6 = cislo(valecVrch, 'cx');
	posun('tc-x', 14);
	const cx14 = cislo(valecVrch, 'cx');
	ok(cx14 - cx6 === 6.5 * 8, `posun o 8 mm posune dírku o ${cx14 - cx6} px (8 × ${M.S})`);
	ok(cislo(kotaSvisla, 'x1') === zaokr(cx14) && kotaText.textContent === '14 mm od kraje',
		`kóta pod plackou ukazuje na střed dírky a říká „${kotaText.textContent}"`);
	const vrch0 = cislo(valecVrch, 'cy');
	posun('tc-h', 3);
	const vrch3 = cislo(valecVrch, 'cy');
	ok(vrch0 - vrch3 === 6.5 * 3, `zvednutí o 3 mm posune válec v obrázku o ${vrch0 - vrch3} px nahoru`);
	const levy = zaokr(cx14 - M.S * 3);
	const pravy = zaokr(cx14 + M.S * 3);
	const dno = zaokr(vrch3 + 6.5 * 6);   // 6 mm vysoký válec, 6,5 px na mm
	ok(valecPlast.getAttribute('d') === `M ${levy},${vrch3} L ${levy},${dno}`
		+ ` A ${zaokr(6.5 * 3)},${zaokr(2.1 * 3)} 0 0 0 ${pravy},${dno}`
		+ ` L ${pravy},${vrch3} Z`,
		'a plášť válce je opravdu vysoký 6 mm a široký jako dírka');
}

console.log('\n— co panel tvrdí, to je na kresbě vidět —');
{
	for (const h of ZVEDNUTI) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-h', h);
		const hloubka = svg.__hloubkaVykusu(h);
		const videt = otvorStena.getAttribute('opacity') === '1';
		const tvrdi = tVysledek.textContent;
		ok(videt === (hloubka > 0), `zvednutí ${h} mm → hloubka ${hloubka} mm, otvor ${videt ? 'je' : 'není'} nakreslený`);
		ok(!/projde skrz/.test(tvrdi) || otvorVnitrek.getAttribute('fill') === M.PLOCHA,
			`„${tvrdi}" — a vnitřek ústí má tomu odpovídající barvu`);
		ok(!/projde skrz/.test(tvrdi) || cislo(rezOtvor, 'y') + cislo(rezOtvor, 'height') === 158,
			'a mezera v řezu vede až dolů na pracovní plochu (158 px), ne jen kousek');
		ok(tvrdi.includes(String(hloubka)) || hloubka === 0, 'věta v panelu uvádí právě spočítanou hloubku');
	}
}

console.log('\n— dírka je DÍRA, ne trubka: kresba otvoru nevyleze z ústí —');
{
	// NÁLEZ nezávislé kontroly 25. 9. 2026: stěna otvoru se kreslila jako těleso POD
	// ústím (cesta „M 106,205 L 106,231 A 39,12.6…", zatímco ústí má ry = 6,3), takže
	// 626 z 819 px² leželo MIMO ústí a přemalovávalo neporušenou horní plochu placky —
	// dírka vypadala jako vystouplá trubka. Atribut `fill` o tom mlčel, proto se teď
	// měří, KAM AŽ kresba sahá.
	const USTI_Y = 205;          // rovina horní plochy placky (4 mm nad pracovní plochou)
	let mimoUsti = 0;
	let prvniVada = '';
	let kombinaci = 0;
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of ZVEDNUTI) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		kombinaci++;
		const usti = {
			cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'),
			rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry'),
		};
		const cesta = rozborCesty(otvorStena.getAttribute('d'));
		const vada = [];
		if (usti.cy !== USTI_Y) vada.push(`ústí neleží v horní ploše placky (cy ${usti.cy} px místo ${USTI_Y})`);
		const venku = cesta.body.filter(([bx, by]) => !vElipse(bx, by, usti, 0.05));
		if (venku.length) vada.push(`${venku.length} bodů stěny mimo ústí (např. ${venku[0]})`);
		for (const [orx, ory] of cesta.oblouky) {
			if (orx > usti.rx + 0.05 || ory > usti.ry + 0.05) vada.push(`oblouk stěny ${orx},${ory} je větší než ústí ${usti.rx},${usti.ry}`);
		}
		if (!cesta.oblouky.length) vada.push('stěna otvoru se nekreslí oblouky ústí');
		for (const a of ['cx', 'cy', 'rx', 'ry']) {
			if (cislo(otvorVnitrek, a) !== usti[a]) vada.push(`vnitřek otvoru nesedí na ústí (${a})`);
		}
		if (vada.length) { mimoUsti++; if (!prvniVada) prvniVada = `⌀ ${d} mm / ${x} mm / ${h} mm: ${vada[0]}`; }
	}
	ok(mimoUsti === 0, `ve všech ${kombinaci} kombinacích leží kresba otvoru celá uvnitř ústí${prvniVada ? ` — ${prvniVada}` : ''}`);

	// a teď totéž změřené v px²: kolik plochy stěna zabírá a kolik jí leží mimo ústí
	const MERENE = [[6, 6, 0], [12, 2, 0], [12, 14, 0], [4, 14, 0], [6, 6, 2]];
	let ciste = 0;
	let posledni = '';
	for (const [d, x, h] of MERENE) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		const usti = {
			cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'),
			rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry'),
		};
		const { obsah, mimo } = obsahAMimoElipsu(cestaNaPolygony(otvorStena.getAttribute('d')), usti);
		const plochaUsti = Math.PI * usti.rx * usti.ry;
		// stěna musí být vidět (aby dírka měla hloubku), ale nesmí ústí ucpat celé
		if (mimo === 0 && obsah > 0.15 * plochaUsti && obsah < 0.6 * plochaUsti) ciste++;
		posledni = `⌀ ${d} mm: stěna ${Math.round(obsah)} px² z ${Math.round(plochaUsti)} px² ústí, mimo ústí ${mimo} px²`;
	}
	ok(ciste === MERENE.length, `změřeno ${MERENE.length} stavů — ${posledni} (dřív leželo mimo ústí 626 z 819 px²)`);

	// ořez horní plochou nesmí ústí sežrat: při zbytku materiálu ≥ 0 mm je vidět
	// skoro celé (nejmíň 98,06 %), při přetečení přes kraj naopak VŽDY míň (nejvýš 91,4 %)
	const clipBody = zdroj.match(/<clipPath[\s\S]*?points="([^"]*)"/)[1].split(' ').map((b) => b.split(',').map(Number));
	let nejmensiUvnitr = 1;
	let nejvetsiZarez = 0;
	for (const d of PRUMERY) for (const x of POLOHY) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		const usti = {
			cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'),
			rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry'),
		};
		const podil = viditelnyPodilElipsy(usti, clipBody);
		if (svg.__okrajMaterialu(x, d) >= 0) nejmensiUvnitr = Math.min(nejmensiUvnitr, podil);
		else nejvetsiZarez = Math.max(nejvetsiZarez, podil);
	}
	ok(nejmensiUvnitr > 0.97, `dírka uvnitř placky je po ořezu vidět celá (nejhůř ${Math.round(nejmensiUvnitr * 1000) / 10} %)`);
	ok(nejvetsiZarez < 0.95, `dírka přes kraj je naopak vždy ukousnutá (nejvíc zbude ${Math.round(nejvetsiZarez * 1000) / 10} %) — zářez je vidět`);
}

console.log('\n— řez zboku: „projde skrz" musí být SKUTEČNĚ vidět —');
{
	// NÁLEZ nezávislé kontroly 25. 9. 2026: modré dno, které mělo doložit „projde skrz",
	// bylo ořezem horní plochy odříznuté z 94,6 % — vidět bylo 5,45 % jeho plochy, tedy
	// nic. Do 4 mm hluboké dírky se z pohledu shora na dno nevidí, proto je ve scéně
	// druhý pohled (řez zboku) a měří se, kolik modré plochy je v něm OPRAVDU vidět.
	// Čísla jsou psaná natvrdo, ne dopočítaná z komponenty — jinak by se měřidlo
	// posunulo spolu s chybou a nic by nezměřilo.
	const REZ_X0 = 284;    // obraz levého kraje placky (0 mm)
	const REZ_Y0 = 158;    // obraz pracovní plochy (0 mm výšky)
	const rx = (mm) => REZ_X0 + 6.5 * mm;
	const ry = (z) => REZ_Y0 - 6.5 * z;
	ok(M.REZ_X0 === REZ_X0 && M.REZ_Y0 === REZ_Y0,
		`řez má 0 mm na x = ${M.REZ_X0} px a pracovní plochu na y = ${M.REZ_Y0} px`);
	ok(rx(M.DELKA) === 544 && ry(M.TLOUSTKA) === 132,
		`v měřítku ${M.S} px/mm zabere placka 40 × 4 mm obdélník 284…544 × 132…158 px`);
	const plochaZeZdroje = zdroj.match(/id="tc-rez-plocha"[^>]*>/)[0];
	ok(/y="158"/.test(plochaZeZdroje) && /fill="#cfe3ee"/.test(plochaZeZdroje),
		'pod plackou je v řezu pracovní plocha v barvě plochy z prvního pohledu');

	odZacatku();
	klik(btnSeskup);
	const dira = { x: cislo(rezOtvor, 'x'), y: cislo(rezOtvor, 'y'), s: cislo(rezOtvor, 'width'), v: cislo(rezOtvor, 'height') };
	ok(dira.x === rx(3) && dira.s === 6.5 * 6 && dira.y === ry(4) && dira.v === 6.5 * 4,
		`mezera po dírce ⌀ 6 mm je ${dira.s} × ${dira.v} px (6 × 4 mm) a začíná na x = ${dira.x} px`);
	const mezeraZeZdroje = zdroj.match(/id="tc-rez-otvor"[^>]*>/)[0];
	ok(new RegExp(`fill="${M.PLOCHA}"`).test(mezeraZeZdroje) && rezOtvor.getAttribute('opacity') === '1',
		`je modrá jako pracovní plocha (${M.PLOCHA}) — dírkou je vidět až na ni`);
	ok(dira.y + dira.v === REZ_Y0, `a končí přesně na pracovní ploše (${dira.y} + ${dira.v} = ${REZ_Y0} px), tedy PROCHÁZÍ`);
	ok(rezValec.getAttribute('opacity') === '0', 'seskupená díra už v řezu nestojí přes mezeru, takže ji nic nezakrývá');
	const obrysSkrz = rezPlacka.getAttribute('d');
	ok(obrysSkrz === 'M 284,132 L 303.5,132 L 303.5,158 L 284,158 Z M 342.5,132 L 544,132 L 544,158 L 342.5,158 Z',
		`průchozí otvor rozdělí placku v řezu na DVA kusy: „${obrysSkrz}"`);
	ok(rozborCesty(obrysSkrz).podcest === 2, 'dvě podcesty = mezi kusy materiál opravdu není');
	// a teď to hlavní: kolik modré je z mezery doopravdy vidět (co placka nepřekrývá)
	const vidno = nezakrytyObsah({ x: dira.x + 0.5, y: dira.y + 0.5, sirka: dira.s - 1, vyska: dira.v - 1 }, cestaNaPolygony(obrysSkrz));
	const celek = dira.s * dira.v;
	ok(vidno > 0.95 * celek && vidno > 800,
		`z mezery ${dira.s} × ${dira.v} px = ${celek} px² nepřekrývá placka ${vidno} px² (dřív bylo z modrého dna vidět 5,45 %)`);

	posun('tc-h', 2);
	const dulek = { x: cislo(rezOtvor, 'x'), y: cislo(rezOtvor, 'y'), s: cislo(rezOtvor, 'width'), v: cislo(rezOtvor, 'height') };
	ok(dulek.v === 6.5 * 2 && dulek.y + dulek.v === ry(2),
		`důlek 2 mm sahá v řezu jen ${dulek.v} px hluboko, ke hraně ${dulek.y + dulek.v} px`);
	const obrysDulku = rezPlacka.getAttribute('d');
	ok(obrysDulku === 'M 284,132 L 303.5,132 L 303.5,145 L 342.5,145 L 342.5,132 L 544,132 L 544,158 L 284,158 Z',
		`důlek je v obrysu placky vroubek, ne průchod: „${obrysDulku}"`);
	ok(rozborCesty(obrysDulku).podcest === 1, 'jedna podcesta = placka zůstala vcelku');
	const podDulkem = cestaNaPolygony(obrysDulku);
	const podStredem = [dulek.x + dulek.s / 2, dulek.y + dulek.v + 3];
	ok(vPolygonech(podStredem[0], podStredem[1], podDulkem),
		`a pod důlkem je v řezu materiál placky (bod ${podStredem} leží v obrysu) — proto neprojde`);
	ok(!vPolygonech(podStredem[0], podStredem[1], cestaNaPolygony(obrysSkrz)),
		'kdežto u průchozího otvoru na tomtéž místě materiál není');

	posun('tc-h', 0);
	posun('tc-d', 12);
	posun('tc-x', 2);
	ok(cislo(rezOtvor, 'x') === REZ_X0 && cislo(rezOtvor, 'width') === rx(8) - REZ_X0,
		`zářez v řezu nepřeteče přes levý kraj placky: začíná na ${cislo(rezOtvor, 'x')} px a měří ${cislo(rezOtvor, 'width')} px`);
	ok(rezPlacka.getAttribute('d') === 'M 336,132 L 544,132 L 544,158 L 336,158 Z',
		`a z placky zbyde v řezu jediný kus od 336 px dál: „${rezPlacka.getAttribute('d')}"`);

	odZacatku();
	posun('tc-h', 3);
	ok(cislo(rezValec, 'x') === rx(3) && cislo(rezValec, 'width') === 6.5 * 6
		&& cislo(rezValec, 'y') === ry(3 + M.VYSKA_VALCE) && cislo(rezValec, 'height') === 6.5 * M.VYSKA_VALCE,
		`neseskupený válec stojí v řezu 3 mm nad plochou: ${cislo(rezValec, 'width')} × ${cislo(rezValec, 'height')} px na y = ${cislo(rezValec, 'y')} px`);
	ok(cislo(rezValec, 'y') + cislo(rezValec, 'height') === ry(3),
		'jeho dno je právě tam, kam ho černá šipka zvedla — překryv s plackou je vidět na první pohled');
	ok(rezValec.getAttribute('fill') === valecPlast.getAttribute('fill')
		&& rezValec.getAttribute('fill-opacity') === valecPlast.getAttribute('fill-opacity'),
		'a vypadá v obou pohledech stejně (šrafovaná díra je šrafovaná i v řezu)');
}

console.log('\n— panel se musí VEJÍT do rámečku (jinak věta vyteče z obrázku) —');
{
	// Delší vysvětlení jsou k ničemu, když je v obrázku vidět jen půlka. Rámeček panelu
	// je x = 12…548 px a text začíná na x = 26 px → na řádek zbývá 522 px. Šířka se
	// odhaduje TOUTÉŽ tabulkou písmen jako v testy/rozvrzeni-sceny.mjs (odhad bývá
	// o ~10 % vyšší než skutečná kresba, takže měřidlo spíš varuje, než přehlíží).
	const sirkaTextu = (text, fs) => {
		let s = 0;
		for (const z of Array.from(text)) {
			if (z === ' ') s += 0.28;
			else if ('iljItf.,:;!\'|()[]{}-–·'.includes(z)) s += 0.33;
			else if (z === 'r') s += 0.38;
			else if ('mw'.includes(z)) s += 0.85;
			else if ('MW@'.includes(z)) s += 0.95;
			else if (z >= 'A' && z <= 'Z') s += 0.68;
			else if (z.codePointAt(0) > 0x2000) s += 1.05;
			else s += 0.55;
		}
		return s * fs;
	};
	const ramecek = zdroj.match(/<rect x="12" y="10" width="(\d+)"/);
	const zacatekTextu = Number(zdroj.match(/id="tc-t-vypocet" x="(\d+)"/)[1]);
	const misto = 12 + Number(ramecek[1]) - zacatekTextu;
	ok(misto === 522, `na řádek panelu je v rámečku místo ${misto} px (od x = ${zacatekTextu} px k pravému okraji)`);
	let nejdelsi = 0;
	let veta = '';
	let stavu = 0;
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of ZVEDNUTI) for (const plne of [false, true]) for (const sk of [false, true]) {
		odZacatku();
		if (plne) klik(btnPlne);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		if (sk) klik(btnSeskup);
		stavu++;
		for (const prvek of [tRezim, tVypocet, tVysledek]) {
			const sirka = sirkaTextu(prvek.textContent, 15);
			if (sirka > nejdelsi) { nejdelsi = sirka; veta = prvek.textContent; }
		}
	}
	ok(nejdelsi <= misto, `nejdelší z ${3 * stavu} vět panelu měří ${Math.round(nejdelsi)} px z ${misto} px: „${veta}"`);
}

console.log('\n— MEZ: zvednutí o 4 mm je DOTYK, ne „mimo placku" —');
{
	// NÁLEZ nezávislé kontroly 25. 9. 2026 (třetí kolo): při h = 4 mm text tvrdil
	// „placky se ani nedotkla" / „začínala až nad plackou", ale v řezu zboku leží spodek
	// válce PŘESNĚ na horní ploše placky (obě hrany na y = 132 px). Kresba dotyk ukazuje,
	// text ho popíral — týž druh vady jako `okraj <= 0` z prvního kola, jen v ose z.
	odZacatku();
	posun('tc-h', 4);
	const spodek = cislo(rezValec, 'y') + cislo(rezValec, 'height');
	ok(spodek === 132 && cislo(rezValec, 'y') === 132 - 6.5 * M.VYSKA_VALCE,
		`spodek zvednuté díry je v řezu na y = ${spodek} px — přesně na vrchu placky (132 px), hrany leží na sobě`);
	ok(svg.__hloubkaVykusu(4) === 0 && M.TLOUSTKA === 4,
		'zvednutí 4 mm = tloušťka placky, takže překryv je 0 mm — dotyk, ne mezera');
	klik(btnSeskup);
	const dotyk = `${tVysledek.textContent} ${stavEl.innerHTML}`;
	ok(/přesně na povrchu placky/.test(tVysledek.textContent) && /překryv 0 mm/.test(tVysledek.textContent),
		`panel dotyk pojmenuje: „${tVysledek.textContent}"`);
	ok(/přesně dotýkala/.test(stavEl.innerHTML) && /0 mm/.test(stavEl.innerHTML),
		'a vysvětlení pod obrázkem taky (překryv 0 mm)');
	ok(!/nedotkla|nad plackou|mimo placku/.test(dotyk),
		'nikde netvrdí, že je díra mimo placku nebo nad ní — v řezu se hrany přesně kryjí');
	ok(/placka zůstala celá/.test(stavEl.innerHTML) && otvorStena.getAttribute('opacity') === '0'
		&& rezOtvor.getAttribute('opacity') === '0',
		'a to, že se nic nevykouslo, je vidět v obou pohledech');
	// NÁLEZ nezávislé kontroly 25. 9. 2026 (čtvrté kolo): text ukazoval na dvě hrany ležící
	// v řezu na sobě, jenže po seskupení má válec opacity 0 — žádné hrany tam nakreslené
	// nejsou. O hranách se proto smí mluvit jen v minulém čase, svázaně s „před seskupením".
	const hranyVidet = rezValec.getAttribute('opacity') !== '0';
	const mluviOHranach = /hran/.test(stavEl.innerHTML);
	ok(!hranyVidet && (!mluviOHranach || /před seskupením[^.]*ležel[ya]/.test(stavEl.innerHTML)),
		'po seskupení válec v řezu zmizel, a tak text o obou hranách mluví jen v minulém čase');
	ok(!/hrany (leží|jsou)|hrany se kryjí|obě hrany leží na sobě/.test(stavEl.innerHTML),
		'vysvětlení netvrdí v přítomném čase nic o hranách, které v řezu už vidět nejsou');
}

console.log('\n— pohled shora a řez zboku si NESMÍ odporovat (silueta placky) —');
{
	// NÁLEZ nezávislé kontroly 25. 9. 2026 (třetí kolo): obrys horní plochy se kreslil
	// pořád jako celý čtyřúhelník, takže při zářezu přes kraj (⌀ 12 mm, 2 mm od kraje)
	// vedlo 43 px ze 77 px levé hrany přes místo, kde materiál NENÍ — shora to vypadalo
	// jako uzavřená kapsa uvnitř celé 40mm placky, kdežto řez zboku kreslil placku o 8 mm
	// kratší. Silueta se proto u průchozího zářezu přerušuje a obchází ústí dírky.
	// Projekce se tady počítá NEZÁVISLE na komponentě — ze čísel, která jsou v obrázku.
	const PX = (x, y) => 100 + 6.5 * x + 3.2 * y;
	const PY = (y, z) => 252 - 6.5 * z - 2.1 * y;
	const VYKUS_BODU = 24;        // na kolik úseček se oblouk výkusu rozkreslí
	const ROHY = [[0, 0], [40, 0], [40, 20], [0, 20]].map(([x, y]) => `${zaokr(PX(x, y))},${zaokr(PY(y, 4))}`);
	/** Jak má silueta horní plochy vypadat: čtyřúhelník, a u průchozího zářezu s výkusem
	 *  po okraji ústí. Průsečíky levého kraje s ústím = dosazení úsečky do elipsy. */
	const ocekavanaSilueta = (d, x, vykrojit) => {
		const cx = PX(x, 10);
		const cy = PY(10, 4);
		const rx = 6.5 * (d / 2);
		const ry = rx * (2.1 / 6.5);
		if (!vykrojit) return ROHY.join(' ');
		const a1 = PX(0, 0) - cx;
		const a2 = PY(0, 4) - cy;
		const A = (3.2 / rx) ** 2 + (2.1 / ry) ** 2;
		const B = 2 * ((a1 * 3.2) / rx ** 2 - (a2 * 2.1) / ry ** 2);
		const C = (a1 / rx) ** 2 + (a2 / ry) ** 2 - 1;
		const D = Math.sqrt(B * B - 4 * A * C);
		const uhel = (t) => Math.atan2((a2 - 2.1 * t) / ry, (a1 + 3.2 * t) / rx);
		const od = uhel((-B + D) / (2 * A));       // hlubší průsečík (větší hloubka)
		const doKam = uhel((-B - D) / (2 * A));
		const vykus = [];
		for (let i = 0; i <= VYKUS_BODU; i++) {
			const fi = od + ((doKam - od) * i) / VYKUS_BODU;
			vykus.push(`${zaokr(cx + rx * Math.cos(fi))},${zaokr(cy + ry * Math.sin(fi))}`);
		}
		return ROHY.concat(vykus).join(' ');
	};
	const siluetaBody = () => [el('tc-placka-horni').getAttribute('points').split(' ').map((b) => b.split(',').map(Number))];

	odZacatku();
	ok(el('tc-placka-horni').getAttribute('points') === zdroj.match(/id="tc-placka-horni"[^>]*points="([^"]*)"/)[1],
		'bez zářezu je silueta tentýž čtyřúhelník, jaký je v šabloně (kresba se nerozjede)');

	odZacatku();
	klik(btnSeskup);
	posun('tc-d', 12);
	posun('tc-x', 2);
	const silueta = el('tc-placka-horni').getAttribute('points');
	ok(silueta === ocekavanaSilueta(12, 2, true),
		`zářez ⌀ 12 mm 2 mm od kraje siluetu přeruší a obejde ústí (${silueta.split(' ').length} bodů)`);
	const body = silueta.split(' ').map((b) => b.split(',').map(Number));
	const vykus = body.slice(4);
	const naKraji = (b) => Math.abs((b[0] - 100) / 3.2 - (226 - b[1]) / 2.1) < 0.1;
	// pozor na krátký spoj: bez výkusu je pole prázdné a kontrola musí SPADNOUT, ne shořet
	ok(vykus.length === VYKUS_BODU + 1 && naKraji(vykus[0]) && naKraji(vykus[vykus.length - 1]),
		`výkus začíná i končí PŘESNĚ na levé hraně placky (${vykus[0]} a ${vykus[vykus.length - 1]})`);
	const usti = { cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'), rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry') };
	const naUsti = vykus.filter((b) => Math.abs(Math.hypot((b[0] - usti.cx) / usti.rx, (b[1] - usti.cy) / usti.ry) - 1) < 0.01);
	ok(naUsti.length === VYKUS_BODU + 1 && naUsti.length === vykus.length,
		`všech ${vykus.length} bodů výkusu leží na okraji ústí dírky (${usti.rx} × ${usti.ry} px) — obrys a dírka splývají`);
	const uvnitrPlacky = vykus.filter((b) => (b[0] - 100) / 3.2 > (226 - b[1]) / 2.1 + 0.1);
	ok(uvnitrPlacky.length > 0 && vykus.every((b) => b[0] >= 99.9),
		`výkus vede dovnitř placky (${uvnitrPlacky.length} bodů) a nikam do vzduchu za jejím krajem`);

	// hlavní měřidlo: obrys placky nesmí vést tam, kde průchozí zářez materiál odnesl
	let presUsti = 0;
	let prvniPres = '';
	for (const d of PRUMERY) for (const x of POLOHY) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		if (svg.__okrajMaterialu(x, d) >= 0) continue;
		const e = { cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'), rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry') };
		const b = siluetaBody()[0];
		let vzorku = 0;
		for (let i = 0; i < b.length; i++) {
			const [ax, ay] = b[i];
			const [bx, by] = b[(i + 1) % b.length];
			for (let t = 0; t <= 1; t += 0.02) {
				const qx = ax + (bx - ax) * t;
				const qy = ay + (by - ay) * t;
				// 0,85 = tolerance k tomu, že ústí je nakreslené jako osově souměrná elipsa
				if (Math.hypot((qx - e.cx) / e.rx, (qy - e.cy) / e.ry) <= 0.85) vzorku++;
			}
		}
		if (vzorku > 0) { presUsti++; if (!prvniPres) prvniPres = `⌀ ${d} mm / ${x} mm: ${vzorku} vzorků obrysu v ústí`; }
	}
	ok(presUsti === 0, `u žádného ze 6 průchozích zářezů nevede obrys placky skrz ústí dírky${prvniPres ? ` — ${prvniPres}` : ''}`);

	// a druhé měřidlo: co je materiál na HORNÍ PLOŠE v rovině středu dírky (hloubka 10 mm),
	// musí být materiál i v řezu zboku hned pod horní plochou (y = 133 px) — a naopak
	let shoda = 0;
	let rozpor = '';
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of [0, 2]) {
		odZacatku();
		klik(btnSeskup);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		const e = { cx: cislo(otvorOkraj, 'cx'), cy: cislo(otvorOkraj, 'cy'), rx: cislo(otvorOkraj, 'rx'), ry: cislo(otvorOkraj, 'ry') };
		const shora = siluetaBody();
		const rez = cestaNaPolygony(rezPlacka.getAttribute('d'));
		let rozporu = 0;
		let kde = '';
		for (let mm = 0.25; mm < 40; mm += 0.25) {
			const bx = PX(mm, 10);
			const by = PY(10, 4);
			const vUsti = Math.hypot((bx - e.cx) / e.rx, (by - e.cy) / e.ry) <= 1;
			const materialShora = vPolygonech(bx, by, shora) && !vUsti;
			const materialVRezu = vPolygonech(284 + 6.5 * mm, 133, rez);
			if (materialShora !== materialVRezu) { rozporu++; if (!kde) kde = `${mm} mm`; }
		}
		if (rozporu <= 2) shoda++;
		else if (!rozpor) rozpor = `⌀ ${d} mm / ${x} mm / ${h} mm: ${rozporu} rozporů, první u ${kde}`;
	}
	ok(shoda === 70, `oba pohledy se shodnou na tom, kde je materiál, ve všech ${shoda} ze 70 stavů${rozpor ? ` — ${rozpor}` : ''}`);
}

console.log('\n— prostřední řádek panelu nepočítá dírku tam, kde žádná není —');
{
	// NÁLEZ (třetí kolo): řádek počítal „u kraje zbyde 6 − 3 = 3 mm materiálu" i u PLNÉHO
	// tělesa a u díry zvednuté o 4 mm — tedy ve stavech, kde ve scéně žádná dírka není.
	odZacatku();
	ok(/Těleso: DÍRA/.test(tRezim.textContent) && !/PLNÉ/.test(tRezim.textContent),
		`horní řádek panelu jmenuje zvolené těleso: „${tRezim.textContent}"`);
	klik(btnPlne);
	ok(/Těleso: PLNÉ/.test(tRezim.textContent) && !/DÍRA/.test(tRezim.textContent),
		`a po přepnutí na plné těleso taky: „${tRezim.textContent}"`);
	ok(/je PLNÝ/.test(tVypocet.textContent) && !/zbyde|přesahuje kraj/.test(tVypocet.textContent),
		`u PLNÉHO tělesa řádek popisuje těleso: „${tVypocet.textContent}"`);
	klik(btnDira);
	posun('tc-h', 4);
	ok(/překryv 0 mm/.test(tVypocet.textContent) && !/zbyde|přesahuje kraj/.test(tVypocet.textContent),
		`u díry zvednuté o 4 mm taky: „${tVypocet.textContent}"`);
	posun('tc-h', 0);
	ok(tVypocet.textContent.includes('6 − 3 = 3 mm'), 'a jinak počítá zbytek materiálu u kraje jako dřív');
	let mluviNaprazdno = 0;
	let prvni = '';
	for (const d of PRUMERY) for (const x of POLOHY) for (const h of ZVEDNUTI) for (const plne of [false, true]) {
		odZacatku();
		if (plne) klik(btnPlne);
		posun('tc-d', d);
		posun('tc-x', x);
		posun('tc-h', h);
		klik(btnSeskup);
		if (/zbyde|přesahuje kraj/.test(tVypocet.textContent) && (plne || svg.__hloubkaVykusu(h) === 0)) {
			mluviNaprazdno++;
			if (!prvni) prvni = `${d}/${x}/${h}${plne ? ' plné' : ''}: ${tVypocet.textContent}`;
		}
	}
	ok(mluviNaprazdno === 0, `ve všech 350 stavech mluví panel o dírce jen tam, kde se opravdu kreslí${prvni ? ` — ${prvni}` : ''}`);
}

console.log('\n— přetečení PLUS zvednutí: panel přizná MĚLKÝ zářez —');
{
	// NÁLEZ (třetí kolo): kombinace ⌀ 12 mm / 2 mm od kraje / zvednutí 2 mm hlásila jen
	// „dírka přetekla přes kraj", ale řez zboku kreslil jen 2mm schod. Text musí uvést hloubku.
	odZacatku();
	klik(btnSeskup);
	posun('tc-d', 12);
	posun('tc-x', 2);
	posun('tc-h', 2);
	ok(/přetekla přes kraj/.test(tVysledek.textContent) && /mělký zářez hluboký 2 mm ze 4 mm/.test(tVysledek.textContent),
		`panel: „${tVysledek.textContent}"`);
	ok(/zářez/.test(stavEl.innerHTML) && /2 mm/.test(stavEl.innerHTML) && /schod/.test(stavEl.innerHTML),
		'a vysvětlení pod obrázkem mluví o mělkém schodu v hraně');
	ok(cislo(rezOtvor, 'height') === 13
		&& rezPlacka.getAttribute('d') === 'M 284,145 L 336,145 L 336,132 L 544,132 L 544,158 L 284,158 Z',
		`řez zboku kreslí právě ten 2mm schod: „${rezPlacka.getAttribute('d')}"`);
	ok(el('tc-placka-horni').getAttribute('points').split(' ').length === 4,
		'siluetu shora mělký zářez NEpřerušuje — pod schodem zůstává materiál až ke kraji (řez ho kreslí taky)');
	posun('tc-h', 0);
	ok(/zářez přes celou tloušťku 4 mm/.test(tVysledek.textContent)
		&& el('tc-placka-horni').getAttribute('points').split(' ').length > 4,
		`spuštění na plochu udělá zářez skrz — a teprve ten siluetu přeruší: „${tVysledek.textContent}"`);
}

console.log('\n— ↺ vrátí úplně všechno —');
{
	posun('tc-d', 12);
	posun('tc-x', 2);
	posun('tc-h', 3);
	klik(btnPlne);
	klik(btnSeskup);
	odZacatku();
	const s = svg.__stav();
	ok(s.d === 6 && s.xStred === 6 && s.zvednuti === 0, 'posuvníky jsou zpátky na 6 / 6 / 0 mm');
	ok(s.rezim === 'dira' && !s.seskupeno, 'těleso je zase díra a nic není seskupené');
	ok(el('tc-d').value === '6' && el('tc-x').value === '6' && el('tc-h').value === '0',
		'a táhla posuvníků se posunula taky (jinak by ukazovala něco jiného než scéna)');
	ok(el('tc-d-out').textContent === '6 mm' && el('tc-h-out').textContent === '0 mm',
		'popisky u posuvníků sedí');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

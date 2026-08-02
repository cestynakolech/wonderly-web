// Sahá skript simulace na prvek, který v šabloně není?
//
// ——— PROČ SE TO CELÉ PŘEPSALO (2. 8. 2026) ———
// První verze hledala volání regulárními výrazy (`getElementById('x')`). Nezávislý kontrolor
// na ní ukázal, že takhle to nikdy fungovat nebude: 19 komponent si dělá zkratku
// `const $ = (id) => document.getElementById(id)` a volá `$('paka-ml')`, jedna používá
// `<script is:inline>` (rozdělovač ho neuměl, takže se místo kódu měřil obsah <style>).
// Výsledek: 270 z 945 vyhledání prvků nebylo měřeno vůbec a u čtyř komponent šlo smazat
// CELOU scénu, aniž brána cekla. Záplatovat vzor po vzoru je nekonečná práce — na každý
// další způsob zápisu (`querySelector('#x')`, backticky, složený selektor) by musel přibýt
// nový vzor a ten chybějící by byl zase tichá díra.
//
// Proto se nehádá, ale MĚŘÍ: skript komponenty se SPUSTÍ nad DOMem postaveným ze skutečné
// šablony. Každý dotaz na prvek se zaznamená a na konci se porovná se šablonou. Je pak
// jedno, jakou cestou si skript prvek hledá — měří se výsledek, ne zápis. Je to tentýž
// posun jako u kontrol kvízů: číst DATA, ne text souboru.
//
// Co je nález:
//  (a) skript hledá prvek, který v šabloně není a ani nikde za běhu nevzniká
//      → v prohlížeči je navždy prázdný a simulace mlčky nefunguje,
//  (b) skript vůbec nedoběhl → nezměřilo se nic, a to se NESMÍ tvářit jako nula nálezů.
//
// Spuštění: node testy/sablony.mjs [část názvu komponenty]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const slozka = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'skola2');

/** Rozdělí komponentu na šablonu a kód. Zná i `<script is:inline>` a víc bloků skriptu. */
export function rozdel(zdroj) {
	const casti = String(zdroj).split(/<script\b[^>]*>|<\/script>/);
	return {
		html: casti.filter((_, i) => i % 2 === 0).join('\n'),
		kod: casti.filter((_, i) => i % 2 === 1).join('\n;\n'),
	};
}

/**
 * Cokoli, co atrapa nezná, vrací tuhle „černou díru": jde ji číst, volat i porovnávat.
 * Bez ní by každé chybějící prohlížečové API (performance, canvas, …) vypadalo jako vada
 * komponenty — a dopisovat je jedno po druhém je ta samá nekonečná práce jako vzory.
 */
function dira() {
	return new Proxy(function () {}, {
		get(_t, p) {
			if (p === Symbol.toPrimitive) return () => 0;
			if (p === Symbol.iterator) return function* () {};
			if (typeof p === 'symbol' || p === 'then' || p === 'nodeType') return undefined;
			if (p === 'length') return 0;
			return dira();
		},
		apply() { return dira(); },
		set() { return true; },
		has() { return true; },
	});
}

/** Jména tříd a id v kusu HTML, který si kód vyrábí sám za běhu. */
function zTextu(text, tridy, idy) {
	for (const m of String(text).matchAll(/\bclass\s*=\s*["'`]([^"'`]*)["'`]/g)) {
		for (const t of m[1].split(/\s+/)) if (t) tridy.add(t);
	}
	for (const m of String(text).matchAll(/\bid\s*=\s*["'`]([^"'`{}]+)["'`]/g)) idy.add(m[1]);
}

/** Co v šabloně skutečně je. */
function zeSablony(html) {
	const idy = new Set();
	const tridy = new Set();
	for (const m of html.matchAll(/\bid\s*=\s*["']([^"'{}]+)["']/g)) idy.add(m[1]);
	for (const m of html.matchAll(/\bclass\s*=\s*["']([^"'{}]*)["']/g)) {
		for (const t of m[1].split(/\s+/)) if (t) tridy.add(t);
	}
	// Dynamické id/class z Astro výrazu (`id={neco}`) se staticky rozhodnout nedá.
	const dynamicke = /\b(id|class)\s*=\s*\{/.test(html);
	return { idy, tridy, dynamicke };
}

/**
 * Spustí skript komponenty nad atrapou DOMu a zaznamená, na co sahal.
 * Atrapa schválně nikdy nevrací null — skript tak doběhne celý a změří se i to,
 * co je až za prvním chybějícím prvkem.
 */
function spust(kod) {
	const dotazy = [];            // { druh: 'id' | 'trida', co }
	const vyrobene = { idy: new Set(), tridy: new Set() };

	const novy = () => {
		const p = {
			style: {},
			// Prázdný dataset by dal undefined → Number(undefined) je NaN → pád na indexaci,
			// tedy chyba, která s hledáním prvků vůbec nesouvisí.
			dataset: new Proxy({}, { get: (t, k) => (k in t ? t[k] : '0'), set: (t, k, v) => { t[k] = String(v); return true; } }),
			children: [], attributes: {},
			_class: new Set(), _text: '', _html: '',
			get textContent() { return this._text; },
			set textContent(v) { this._text = String(v); },
			get innerHTML() { return this._html; },
			// Prvky vykreslené do innerHTML za běhu v šabloně nejsou, a přesto existují.
			set innerHTML(v) { this._html = String(v); zTextu(v, vyrobene.tridy, vyrobene.idy); },
			get className() { return [...this._class].join(' '); },
			set className(v) { for (const t of String(v).split(/\s+/)) if (t) { this._class.add(t); vyrobene.tridy.add(t); } },
			get id() { return this.attributes.id ?? ''; },
			set id(v) { this.attributes.id = String(v); vyrobene.idy.add(String(v)); },
			classList: {
				add(...t) { for (const x of t) { p._class.add(x); vyrobene.tridy.add(x); } },
				remove(...t) { for (const x of t) p._class.delete(x); },
				toggle(x, s) { if (s === false) p._class.delete(x); else { p._class.add(x); vyrobene.tridy.add(x); } return true; },
				contains(x) { return p._class.has(x); },
			},
			setAttribute(k, v) {
				this.attributes[k] = String(v);
				if (k === 'id') vyrobene.idy.add(String(v));
				if (k === 'class') for (const t of String(v).split(/\s+/)) if (t) vyrobene.tridy.add(t);
			},
			getAttribute(k) { return this.attributes[k] ?? null; },
			removeAttribute(k) { delete this.attributes[k]; },
			hasAttribute(k) { return k in this.attributes; },
			appendChild(d) { this.children.push(d); return d; },
			removeChild(d) { this.children = this.children.filter((x) => x !== d); return d; },
			append(...d) { this.children.push(...d); },
			insertBefore(d) { this.children.push(d); return d; },
			addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
			focus() {}, blur() {}, click() {}, remove() {}, closest() { return novy(); },
			getBoundingClientRect: () => ({ x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 100, width: 100, height: 100 }),
			getBBox: () => ({ x: 0, y: 0, width: 100, height: 100 }),
			getTotalLength: () => 100,
			getPointAtLength: () => ({ x: 0, y: 0 }),
			getContext: () => dira(),
			querySelector(s) { return dom.querySelector(s); },
			querySelectorAll(s) { return dom.querySelectorAll(s); },
			get parentNode() { return novy(); },
			// POZOR: tyhle MUSÍ vracet null. Kdyby je obsloužila černá díra, byly by pravdivé
			// a běžný úklidový cyklus `while (el.firstChild) el.removeChild(el.firstChild)`
			// by se točil donekonečna — projeví se to jako timeout, tedy jako „vada“
			// komponenty, která žádná není. (Stalo se u pěti simulací.)
			get firstChild() { return null; },
			get lastChild() { return null; },
			get nextSibling() { return null; },
			get previousSibling() { return null; },
			get firstElementChild() { return null; },
			get offsetWidth() { return 100; },
			get clientWidth() { return 100; },
			get value() { return this.attributes.value ?? ''; },
			set value(v) { this.attributes.value = String(v); },
			get checked() { return false; },
			set checked(v) { this.attributes.checked = v; },
		};
		// Co atrapa nezná, obslouží černá díra — jinak by chybějící API vypadalo jako vada.
		return new Proxy(p, {
			get: (t, k) => (k in t ? t[k] : dira()),
			set: (t, k, v) => { t[k] = v; return true; },
		});
	};

	/** Rozebere selektor na jednotlivá jména (#id, .trida) — i selektor složený. */
	function zaznamenej(selektor) {
		for (const m of String(selektor).matchAll(/#([A-Za-z0-9_-]+)/g)) dotazy.push({ druh: 'id', co: m[1] });
		for (const m of String(selektor).matchAll(/\.([A-Za-z0-9_-]+)/g)) dotazy.push({ druh: 'trida', co: m[1] });
	}

	const dom = {
		getElementById(id) { dotazy.push({ druh: 'id', co: String(id) }); return novy(); },
		querySelector(s) { zaznamenej(s); return novy(); },
		querySelectorAll(s) {
			zaznamenej(s);
			// Pole se tváří jako jednoprvkové (aby cykly `i < length` doběhly), ale index
			// napevno (`els[2]`) vrátí prvek místo undefined — jinak by skript spadl na něčem,
			// co s hledáním prvků vůbec nesouvisí.
			return new Proxy([novy()], { get: (t, k) => (k in t ? t[k] : (/^\d+$/.test(String(k)) ? novy() : undefined)) });
		},
		createElement: novy, createElementNS: novy, createTextNode: novy,
		addEventListener() {}, removeEventListener() {},
		get body() { return novy(); },
		get documentElement() { return novy(); },
		get readyState() { return 'complete'; },
	};

	const okno = {
		document: dom, console,
		requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
		setInterval: () => 1, clearInterval: () => {}, setTimeout: () => 1, clearTimeout: () => {},
		matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
		getComputedStyle: () => ({ getPropertyValue: () => '' }),
		performance: { now: () => 0 },
		addEventListener() {}, removeEventListener() {},
		devicePixelRatio: 1, innerWidth: 1024, innerHeight: 768,
		navigator: { userAgent: 'test' }, location: { href: '' },
		Math, JSON, Date, Number, String, Object, Array, Boolean, Set, Map, RegExp, Error, Promise,
		parseInt, parseFloat, isNaN, isFinite, structuredClone,
	};
	okno.window = okno;
	okno.globalThis = okno;
	okno.self = okno;
	// Neznámé globální API nesmí skript shodit — viz `dira()` výše.
	const oknoProxy = new Proxy(okno, {
		get: (t, k) => (k in t ? t[k] : dira()),
		set: (t, k, v) => { t[k] = v; return true; },
		has: () => true,
	});

	let chyba = null;
	try {
		vm.createContext(oknoProxy);
		vm.runInContext(kod, oknoProxy, { timeout: 5000 });
	} catch (e) {
		chyba = e && e.message ? e.message : String(e);
	}
	return { dotazy, vyrobene, chyba };
}

/** Nálezy v jedné komponentě. `zdroj` se dá podstrčit kvůli obousměrnému ověření. */
export function zkontrolujSablonu(jmeno, zdroj) {
	const { html, kod } = rozdel(zdroj);
	const sablona = zeSablony(html);
	const nalezy = [];
	if (!kod.trim()) return { nalezy, dotazu: 0 };

	const { dotazy, vyrobene, chyba } = spust(kod);

	// Nedoběhlý skript se NESMÍ tvářit jako zdravý stav — to je přesně ta falešná nula,
	// kvůli které tahle kontrola vznikla.
	if (chyba) {
		nalezy.push({ jmeno, druh: 'skript nedoběhl', co: chyba.slice(0, 120), proc: 'nezměřilo se nic, takže nula nálezů by tu byla falešná' });
		return { nalezy, dotazu: dotazy.length };
	}

	const videno = new Set();
	for (const d of dotazy) {
		const klic = d.druh + ':' + d.co;
		if (videno.has(klic)) continue;      // tutéž vadu hlásit třikrát nemá smysl
		videno.add(klic);
		if (sablona.dynamicke) continue;     // id skládané Astro výrazem se staticky rozhodnout nedá
		if (d.druh === 'id') {
			if (sablona.idy.has(d.co) || vyrobene.idy.has(d.co)) continue;
			nalezy.push({ jmeno, druh: 'chybí prvek', co: d.co, proc: `skript sahá na id="${d.co}", ale takový prvek nikde nevzniká` });
		} else {
			if (sablona.tridy.has(d.co) || vyrobene.tridy.has(d.co)) continue;
			nalezy.push({ jmeno, druh: 'prázdný výběr', co: '.' + d.co, proc: `skript obsluhuje prvky .${d.co}, ale žádný takový nikde nevzniká` });
		}
	}
	return { nalezy, dotazu: dotazy.length };
}

/** Projde všechny komponenty simulací. Vrací i počty vstupů — nula nálezů z nula měření je falešná nula. */
export function zkontrolujSablony(filtr = '') {
	const soubory = readdirSync(slozka).filter((f) => f.endsWith('Simulace.astro') && f.includes(filtr));
	const nalezy = [];
	let dotazu = 0;
	const bezDotazu = [];
	for (const f of soubory) {
		const v = zkontrolujSablonu(f.replace('.astro', ''), readFileSync(join(slozka, f), 'utf8'));
		nalezy.push(...v.nalezy);
		dotazu += v.dotazu;
		if (v.dotazu === 0) bezDotazu.push(f.replace('.astro', ''));
	}
	return { nalezy, souboru: soubory.length, dotazu, bezDotazu };
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const { nalezy, souboru, dotazu, bezDotazu } = zkontrolujSablony(process.argv[2] ?? '');
	for (const n of nalezy) console.log(`❌ ${n.jmeno}: ${n.druh} „${n.co}“ — ${n.proc}`);
	console.log(`\nProšlo ${souboru} komponent, změřeno ${dotazu} vyhledání prvku.`);
	if (bezDotazu.length) console.log(`⚠️  bez jediného měřeného vyhledání: ${bezDotazu.join(', ')}`);
	console.log(nalezy.length ? `Nálezů: ${nalezy.length}` : 'Šablony simulací: 0 nálezů.');
	process.exit(nalezy.length ? 1 : 0);
}

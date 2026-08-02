// Sahá skript simulace na prvek, který v šabloně není?
//
// ——— PROČ SE NEHÁDÁ, ALE MĚŘÍ (2. 8. 2026) ———
// První verze hledala volání regulárními výrazy (`getElementById('x')`). Nezávislý kontrolor
// na ní ukázal, že takhle to nikdy fungovat nebude: 19 komponent si dělá zkratku
// `const $ = (id) => document.getElementById(id)` a volá `$('paka-ml')`, jedna používá
// `<script is:inline>`. Výsledek: 270 z 945 vyhledání nebylo měřeno vůbec a u čtyř komponent
// šlo smazat CELOU scénu, aniž brána cekla. Záplatovat vzor po vzoru je nekonečná práce.
//
// Proto se skript komponenty SPUSTÍ nad DOMem postaveným ze skutečné šablony. Každý dotaz
// na prvek se zaznamená a na konci se porovná se šablonou. Je pak jedno, jakou cestou si
// skript prvek hledá — měří se výsledek, ne zápis.
//
// ——— DRUHÉ KOLO KONTROLY (2. 8. 2026) ———
// Kontrolor našel, že se měřil jen kód, který doběhne při NAČTENÍ: obsluha tlačítek,
// `setTimeout` ani `requestAnimationFrame` se nikdy nezavolaly, takže 32 vyhledání v devíti
// komponentách zůstalo neměřeno (mj. celá tyč rotoru v ElektromotorSimulace). Nově se proto
// po doběhnutí JEDNOU spustí i všichni zaregistrovaní posluchači a odložené funkce.
//
// MEZ, KTEROU TAHLE KONTROLA MÁ: změřit jde jen kód, který se opravdu provede. Vyhledání
// schované ve větvi, kam běh nedojde, zůstane neviditelné — to není vada měřidla, ale
// hranice metody. Změřeno je dnes 977 z 983 vyhledání, která míří na prvek ze šablony
// (99,4 %); zbylých šest je uvnitř podmínek, jež při načtení neplatí (šipka síly u motoru
// se kreslí až při nenulové síle, brýle až u vady oka). Proto se hlásí i komponenta,
// ve které se nezměřilo NIC — tam je „0 nálezů" vždycky falešná.
//
// Co tahle kontrola NEHLÍDÁ: překlep v názvu prohlížečové metody (`addEventListner`).
// Atrapa neznámé API tiše obslouží, jinak by každé chybějící API vypadalo jako vada.
//
// Co je nález:
//  (a) skript hledá prvek, který v šabloně není a ani za běhu nevzniká
//      → v prohlížeči je navždy prázdný a simulace mlčky nefunguje,
//  (b) skript nedoběhl → nezměřilo se nic, a to se NESMÍ tvářit jako nula nálezů.
//
// Spuštění: node testy/sablony.mjs [část názvu komponenty]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const slozka = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'skola2');

/**
 * Rozdělí komponentu na šablonu a JEDNOTLIVÉ bloky skriptu. Bloky se vracejí zvlášť,
 * protože v prohlížeči je každý `<script>` samostatný modul — slepené do jednoho rozsahu
 * by spadly na „Identifier already declared", což by vypadalo jako vada komponenty.
 */
export function rozdel(zdroj) {
	const casti = String(zdroj).split(/<script\b[^>]*>|<\/script>/);
	return {
		html: casti.filter((_, i) => i % 2 === 0).join('\n'),
		bloky: casti.filter((_, i) => i % 2 === 1).filter((b) => b.trim()),
		get kod() { return this.bloky.join('\n;\n'); },
	};
}

/** Prohlížečová API, která atrapa nezná, ale existují — překlep v názvu tak zůstane vidět. */
const ZNAME_API = new Set([
	'AudioContext', 'webkitAudioContext', 'Image', 'Audio', 'ResizeObserver', 'IntersectionObserver',
	'MutationObserver', 'DOMParser', 'XMLSerializer', 'CustomEvent', 'Event', 'KeyboardEvent',
	'MouseEvent', 'PointerEvent', 'TouchEvent', 'WheelEvent', 'SVGElement', 'HTMLElement', 'Element',
	'Node', 'NodeList', 'localStorage', 'sessionStorage', 'fetch', 'URL', 'URLSearchParams', 'Blob',
	'FileReader', 'requestIdleCallback', 'screen', 'history', 'CSS', 'getSelection', 'speechSynthesis',
	'alert', 'confirm', 'prompt', 'crypto', 'TextEncoder', 'TextDecoder', 'WebSocket', 'Worker',
]);

/**
 * Cokoli, co atrapa nezná, vrací tuhle „černou díru": jde ji číst, volat i porovnávat.
 * Bez ní by každé chybějící prohlížečové API vypadalo jako vada komponenty — a dopisovat
 * je jedno po druhém je ta samá nekonečná práce jako vzory.
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
		construct() { return dira(); },
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
	// Zakomentovaná scéna v šabloně NENÍ scéna — jinak by šlo kontrolu obejít komentářem.
	const cisty = html.replace(/<!--[\s\S]*?-->/g, ' ');
	const idy = new Set();
	const tridy = new Set();
	for (const m of cisty.matchAll(/\bid\s*=\s*["']([^"'{}]+)["']/g)) idy.add(m[1]);
	for (const m of cisty.matchAll(/\bclass\s*=\s*["']([^"'{}]*)["']/g)) {
		for (const t of m[1].split(/\s+/)) if (t) tridy.add(t);
	}
	// Dynamické `id={…}` / `class={…}` z Astro výrazu se staticky rozhodnout nedá. Vypíná se
	// proto JEN ten druh, který je dynamický — dřív jediné `class={…}` umlčelo celou komponentu.
	return {
		idy, tridy,
		idDynamicke: /\bid\s*=\s*\{/.test(cisty),
		tridyDynamicke: /\bclass\s*=\s*\{/.test(cisty),
	};
}

/**
 * Spustí bloky skriptu nad atrapou DOMu a zaznamená, na co sahaly.
 * Atrapa schválně nikdy nevrací null — skript tak doběhne celý a změří se i to,
 * co je až za prvním chybějícím prvkem.
 */
function spust(bloky) {
	const dotazy = [];            // { druh: 'id' | 'trida', co }
	const vyrobene = { idy: new Set(), tridy: new Set() };
	const odlozene = [];          // posluchači a časovače — spustí se až po načtení

	const novy = (veStromu = true) => {
		const p = {
			// `style` musí umět setProperty — bez toho padal skript na zdravé komponentě.
			style: new Proxy({ setProperty() {}, removeProperty() {}, getPropertyValue: () => '' }, {
				get: (t, k) => (k in t ? t[k] : ''),
				set: (t, k, v) => { t[k] = v; return true; },
			}),
			// Prázdný dataset by dal undefined → Number(undefined) je NaN → pád na indexaci,
			// tedy chyba, která s hledáním prvků vůbec nesouvisí.
			dataset: new Proxy({}, { get: (t, k) => (k in t ? t[k] : '0'), set: (t, k, v) => { t[k] = String(v); return true; } }),
			attributes: {},
			_deti: [], _class: new Set(), _text: '', _html: '', _veStromu: veStromu, _ceka: [],
			get textContent() { return this._text; },
			set textContent(v) { this._text = String(v); },
			get innerHTML() { return this._html; },
			// Prvky vykreslené za běhu v šabloně nejsou, a přesto existují. Evidují se ale
			// až u prvku, který je ve stromu — jinak by „vyrobený" prvek, který se do stránky
			// nikdy nevloží, umlčel skutečnou vadu (nález kontrolora).
			set innerHTML(v) { this._html = String(v); this._eviduj(v); },
			_eviduj(v) {
				if (this._veStromu) zTextu(v, vyrobene.tridy, vyrobene.idy);
				else this._ceka.push(String(v));
			},
			_doStromu() {
				if (this._veStromu) return;
				this._veStromu = true;
				for (const t of this._ceka) zTextu(t, vyrobene.tridy, vyrobene.idy);
				this._ceka = [];
				if (this.attributes.id) vyrobene.idy.add(this.attributes.id);
				for (const t of this._class) vyrobene.tridy.add(t);
				for (const d of this._deti) if (d && typeof d._doStromu === 'function') d._doStromu();
			},
			get children() {
				// Index napevno (`children[0]`) nesmí dát undefined — pád by vypadal jako vada.
				return new Proxy(this._deti, { get: (t, k) => (k in t ? t[k] : (/^\d+$/.test(String(k)) ? novy() : undefined)) });
			},
			get childNodes() { return this.children; },
			get className() { return [...this._class].join(' '); },
			set className(v) { for (const t of String(v).split(/\s+/)) if (t) { this._class.add(t); if (this._veStromu) vyrobene.tridy.add(t); } },
			get id() { return this.attributes.id ?? ''; },
			set id(v) { this.attributes.id = String(v); if (this._veStromu) vyrobene.idy.add(String(v)); },
			classList: {
				add(...t) { for (const x of t) { p._class.add(x); if (p._veStromu) vyrobene.tridy.add(x); } },
				remove(...t) { for (const x of t) p._class.delete(x); },
				toggle(x, s) { if (s === false) p._class.delete(x); else { p._class.add(x); if (p._veStromu) vyrobene.tridy.add(x); } return true; },
				contains(x) { return p._class.has(x); },
			},
			setAttribute(k, v) {
				this.attributes[k] = String(v);
				if (k === 'id' && this._veStromu) vyrobene.idy.add(String(v));
				if (k === 'class') for (const t of String(v).split(/\s+/)) if (t) { this._class.add(t); if (this._veStromu) vyrobene.tridy.add(t); }
			},
			// Prázdný řetězec místo null: `getAttribute('points').split(' ')` je běžný zápis
			// a na null by spadl — což by vypadalo jako vada komponenty.
			getAttribute(k) { return this.attributes[k] ?? ''; },
			removeAttribute(k) { delete this.attributes[k]; },
			hasAttribute(k) { return k in this.attributes; },
			appendChild(d) { this._deti.push(d); if (this._veStromu && d && d._doStromu) d._doStromu(); return d; },
			removeChild(d) { this._deti = this._deti.filter((x) => x !== d); return d; },
			append(...d) { for (const x of d) this.appendChild(x); },
			insertBefore(d) { return this.appendChild(d); },
			replaceChildren(...d) { this._deti = []; for (const x of d) this.appendChild(x); },
			insertAdjacentHTML(_kam, v) { this._eviduj(v); },
			get outerHTML() { return this._html; },
			set outerHTML(v) { this._eviduj(v); },
			addEventListener(_typ, f) { if (typeof f === 'function') odlozene.push(f); },
			removeEventListener() {}, dispatchEvent() { return true; },
			focus() {}, blur() {}, click() {}, remove() {}, closest() { return novy(); },
			getBoundingClientRect: () => ({ x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 100, width: 100, height: 100 }),
			getBBox: () => ({ x: 0, y: 0, width: 100, height: 100 }),
			getTotalLength: () => 100,
			getPointAtLength: () => ({ x: 0, y: 0 }),
			getContext: () => dira(),
			querySelector(s) { return dom.querySelector(s); },
			querySelectorAll(s) { return dom.querySelectorAll(s); },
			getElementById(id) { return dom.getElementById(id); },
			getElementsByClassName(t) { return dom.querySelectorAll('.' + t); },
			getElementsByTagName() { return dom.querySelectorAll('*'); },
			get ownerDocument() { return dom; },
			get parentNode() { return novy(); },
			get parentElement() { return novy(); },
			// POZOR: tyhle MUSÍ vracet null. Kdyby je obsloužila černá díra, byly by pravdivé
			// a úklidový cyklus `while (el.firstChild) el.removeChild(el.firstChild)` by se
			// točil donekonečna — projeví se to jako timeout, tedy jako vada, která žádná není.
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
		getElementsByClassName(t) { return dom.querySelectorAll('.' + t); },
		getElementsByTagName() { return dom.querySelectorAll('*'); },
		// Prvky vytvořené za běhu jsou zatím MIMO strom (viz `_doStromu`).
		createElement: () => novy(false), createElementNS: () => novy(false), createTextNode: () => novy(false),
		createDocumentFragment: () => novy(false),
		addEventListener(_typ, f) { if (typeof f === 'function') odlozene.push(f); },
		removeEventListener() {},
		get body() { return novy(); },
		get documentElement() { return novy(); },
		get readyState() { return 'complete'; },
	};

	/** Náhradní událost pro posluchače — na cokoli dalšího dosáhne černá díra. */
	const udalost = () => new Proxy({
		preventDefault() {}, stopPropagation() {}, target: novy(), currentTarget: novy(),
		key: 'a', code: 'KeyA', clientX: 10, clientY: 10, offsetX: 10, offsetY: 10,
		deltaY: 1, touches: [{ clientX: 10, clientY: 10 }], type: 'click', detail: 1,
	}, { get: (t, k) => (k in t ? t[k] : dira()) });

	function vytvorOkno() {
		const okno = {
			document: dom, console,
			requestAnimationFrame: (f) => { if (typeof f === 'function') odlozene.push(f); return 1; },
			cancelAnimationFrame: () => {},
			setTimeout: (f) => { if (typeof f === 'function') odlozene.push(f); return 1; },
			clearTimeout: () => {},
			setInterval: (f) => { if (typeof f === 'function') odlozene.push(f); return 1; },
			clearInterval: () => {},
			matchMedia: () => ({ matches: false, addEventListener(_t, f) { if (typeof f === 'function') odlozene.push(f); }, removeEventListener() {} }),
			getComputedStyle: () => ({ getPropertyValue: () => '' }),
			performance: { now: () => 0 },
			addEventListener(_typ, f) { if (typeof f === 'function') odlozene.push(f); },
			removeEventListener() {},
			devicePixelRatio: 1, innerWidth: 1024, innerHeight: 768,
			navigator: { userAgent: 'test' }, location: { href: '' },
			Math, JSON, Date, Number, String, Object, Array, Boolean, Set, Map, WeakMap, RegExp, Error, Promise,
			parseInt, parseFloat, isNaN, isFinite, structuredClone, Symbol,
		};
		okno.self = okno;
		okno.globalThis = okno;
		const proxy = new Proxy(okno, {
			get: (t, k) => (k in t ? t[k] : dira()),
			set: (t, k, v) => { t[k] = v; return true; },
			// Neznámý identifikátor se NESMÍ tiše polykat — jinak by překlep v názvu funkce
			// vypadal jako zdravý stav. Projdou jen skutečná prohlížečová API.
			has: (t, k) => k in t || ZNAME_API.has(String(k)),
		});
		okno.window = proxy;   // `window.AudioContext` musí projít stejnou cestou jako holé
		return proxy;
	}

	/** Astro `<script>` je modul; `import` řádky nemá vm jak vyhodnotit a nic neměří. */
	const ocisti = (blok) => String(blok).replace(/^\s*import\s.*$/gm, '');

	let chyba = null;
	for (const blok of bloky) {
		const okno = vytvorOkno();
		try {
			vm.createContext(okno);
			vm.runInContext(ocisti(blok), okno, { timeout: 5000 });
		} catch (e) {
			chyba = e && e.message ? e.message : String(e);
			break;
		}
	}

	// Teprve teď obsluha tlačítek a odložené funkce. Bez tohohle kroku zůstalo 32 vyhledání
	// v devíti komponentách neměřeno — mj. celá tyč rotoru v ElektromotorSimulace.
	// Chyba UVNITŘ posluchače není vada komponenty (chybí jí skutečná událost), proto se mlčí;
	// jde jen o to, aby se stihly zaznamenat dotazy na prvky.
	// Teprve teď obsluha tlačítek a odložené funkce. Bez tohohle kroku zůstalo 32 vyhledání
	// v devíti komponentách neměřeno — mj. celá tyč rotoru v ElektromotorSimulace. Chyba
	// UVNITŘ posluchače není vada komponenty (chybí jí skutečná událost), proto se mlčí;
	// jde jen o to, aby se stihly zaznamenat dotazy na prvky.
	// (Zkoušeny i tři vlny volání, aby se stav komponenty přepnul a otevřel další větve —
	// pokrytí to nezlepšilo ani o jedno vyhledání, jen to trvalo déle. Proto jedna.)
	for (let i = 0; i < odlozene.length && i < 400; i++) {
		try { odlozene[i](udalost()); } catch { /* posluchač bez skutečné události — nevadí */ }
	}

	return { dotazy, vyrobene, chyba };
}

/** Nálezy v jedné komponentě. `zdroj` se dá podstrčit kvůli obousměrnému ověření. */
export function zkontrolujSablonu(jmeno, zdroj) {
	const { html, bloky } = rozdel(zdroj);
	const sablona = zeSablony(html);
	const nalezy = [];
	if (!bloky.length) return { nalezy, dotazu: 0, omezeno: null };

	const { dotazy, vyrobene, chyba } = spust(bloky);

	// Nedoběhlý skript se NESMÍ tvářit jako zdravý stav — to je přesně ta falešná nula,
	// kvůli které tahle kontrola vznikla.
	if (chyba) {
		nalezy.push({ jmeno, druh: 'skript nedoběhl', co: chyba.slice(0, 120), proc: 'nezměřilo se nic, takže nula nálezů by tu byla falešná' });
		return { nalezy, dotazu: dotazy.length, omezeno: null };
	}

	const videno = new Set();
	for (const d of dotazy) {
		const klic = d.druh + ':' + d.co;
		if (videno.has(klic)) continue;      // tutéž vadu hlásit třikrát nemá smysl
		videno.add(klic);
		if (d.druh === 'id') {
			if (sablona.idDynamicke) continue;
			if (sablona.idy.has(d.co) || vyrobene.idy.has(d.co)) continue;
			nalezy.push({ jmeno, druh: 'chybí prvek', co: d.co, proc: `skript sahá na id="${d.co}", ale takový prvek nikde nevzniká` });
		} else {
			if (sablona.tridyDynamicke) continue;
			if (sablona.tridy.has(d.co) || vyrobene.tridy.has(d.co)) continue;
			nalezy.push({ jmeno, druh: 'prázdný výběr', co: '.' + d.co, proc: `skript obsluhuje prvky .${d.co}, ale žádný takový nikde nevzniká` });
		}
	}
	const omezeno = sablona.idDynamicke || sablona.tridyDynamicke
		? `${jmeno}: ${[sablona.idDynamicke ? 'id' : '', sablona.tridyDynamicke ? 'class' : ''].filter(Boolean).join(' a ')} se skládá výrazem, tahle část se neměří`
		: null;
	return { nalezy, dotazu: dotazy.length, omezeno };
}

/** Projde všechny komponenty simulací. Vrací i počty vstupů — nula nálezů z nula měření je falešná nula. */
export function zkontrolujSablony(filtr = '') {
	const soubory = readdirSync(slozka).filter((f) => f.endsWith('Simulace.astro') && f.includes(filtr));
	const nalezy = [];
	let dotazu = 0;
	const bezDotazu = [];
	const omezene = [];
	for (const f of soubory) {
		const v = zkontrolujSablonu(f.replace('.astro', ''), readFileSync(join(slozka, f), 'utf8'));
		nalezy.push(...v.nalezy);
		dotazu += v.dotazu;
		if (v.dotazu === 0) bezDotazu.push(f.replace('.astro', ''));
		if (v.omezeno) omezene.push(v.omezeno);
	}
	return { nalezy, souboru: soubory.length, dotazu, bezDotazu, omezene };
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const { nalezy, souboru, dotazu, bezDotazu, omezene } = zkontrolujSablony(process.argv[2] ?? '');
	for (const n of nalezy) console.log(`❌ ${n.jmeno}: ${n.druh} „${n.co}“ — ${n.proc}`);
	console.log(`\nProšlo ${souboru} komponent, změřeno ${dotazu} vyhledání prvku.`);
	if (bezDotazu.length) console.log(`⚠️  bez jediného měřeného vyhledání: ${bezDotazu.join(', ')}`);
	for (const o of omezene) console.log(`⚠️  ${o}`);
	console.log(nalezy.length ? `Nálezů: ${nalezy.length}` : 'Šablony simulací: 0 nálezů.');
	process.exit(nalezy.length ? 1 : 0);
}

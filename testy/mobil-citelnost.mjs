#!/usr/bin/env node
// MĚŘIDLO ČITELNOSTI SIMULACÍ NA MOBILU (zatím JEN HLÁŠENÍ — není v prebuildu ani v npm scripts).
//
// Proč existuje: autoři simulací měřili písmo na telefonu každý po svém. Tohle je jediný domov
// toho postupu: pro každou komponentu změří SKUTEČNĚ VYKRESLENOU velikost písma všech
// <text>/<tspan> v jejích SVG, kontrast textu proti podkladu a HTML obraz pod scénou —
// a to ve VÝCHOZÍM stavu i v krajních a středních polohách všech ovládacích prvků.
//
// Jak měří (vše ve skutečném headless Chrome, bez npm závislostí — ovládá se přes CDP):
//  1) vezme sestavenou stránku webu (dist/…/teziste/index.html — styly SkolaLayout i stránky),
//     nahradí obsah <main> zdrojem komponenty (frontmatter pryč, <script> přeložen esbuildem),
//     servíruje ji z lokálního serveru;
//  2) okno emulované na šířku 375 px (mobile, DPR 1; přepínač --sirka=390);
//  3) STAVY (varianta A v2, 1. 10. 2026): výchozí stav + každý ovládací prvek v <main> mimo SVG
//     zvlášť (jeden po druhém od výchozího stavu, pak vrácen):
//       posuvník / číselné pole: min, střed (zaokrouhlený na step), max — a má-li nejvýš
//       12 kroků, pak KAŽDÁ jeho poloha;
//       <select>: první, prostřední, poslední volba;  zaškrtávátko: přepnuté;
//       tlačítko / přepínač (radio): klik z čerstvě načtené stránky a v tom režimu ještě
//       min a max každého posuvníku/selectu (kombinace omezené na režim × krajní polohy).
//     Strop --stavy=200 na komponentu (překročení se vypíše v poznámce). --jen-vychozi = jen výchozí stav;
//  4) písmo v px = computed font-size × měřítko SVG→obrazovka (getScreenCTM);
//  5) kontrast: pod střed textu se najdou všechny dřívější tvary s výplní, které bod skutečně
//     zasahují (isPointInFill), a složí se s průhledností; WCAG 2.x, práh 4,5:1 pro všechny velikosti;
//  6) HTML OBRAZ pod scénou = prvek mimo SVG s třídou …-mobil / …-legenda nebo atributem
//     data-mobil-obraz. Měří se písmo (≥ 14 px) a kontrast (≥ 4,5:1) kontejneru I KAŽDÉHO
//     jeho potomka s vlastním textem (<small>, <span>…).
//
// Kritérium (v každém stavu zvlášť):
//  - kontrast každého viditelného textu scény ≥ 4,5:1;
//  - drobné doplňkové popisky < 12 px se tolerují, pokud pod scénou je viditelný HTML obraz;
//  - NUTNÝ popisek (<text id=…> = dynamický výstup, nebo uvnitř [data-nutne]) musí mít ≥ 12 px,
//    NEBO být POKRYTÝ HTML obrazem TÉHOŽ stavu: jeho celý text se v textu obrazu vyskytuje jako
//    samostatný úsek (ne uvnitř delšího slova/čísla: „4 h“ nepokryje „4 hodiny“, „4“ nepokryje „14“).
//    Krátké popisky (≤ 2 znaky, např. „F“, „?“, „T“) pokrývá JEN prvek [data-popisek] uvnitř
//    obrazu, jehož hodnota atributu (lze víc oddělených „|“) nebo text se s popiskem přesně shoduje;
//  - nutný popisek, který nebyl viditelný v ŽÁDNÉM navštíveném stavu (skrytý režim), se měří
//    přes měřítko SVG a musí být ≥ 12 px nebo pokrytý obrazem některého stavu;
//  - stránka nepřetéká do strany.
//
// Meze (upřímně): stavy dosažitelné jen kombinací dvou tlačítek, tažením myší nebo klikem do
// scény se nezkoušejí; animace se měří v jednom okamžiku (~0,5 s po akci); výplň gradientem se
// při skládání kontrastu přeskočí; komponenty s kódem ve frontmatteru se měří bez něj (hlásí se).
//
// Použití:
//   node testy/mobil-citelnost.mjs                     všechny *Simulace.astro + jiné s SVG i <script>
//   node testy/mobil-citelnost.mjs Jiskra Elektrolyza   jen komponenty, jejichž název obsahuje řetězec
//   node testy/mobil-citelnost.mjs --soubor=/tmp/x.astro   libovolný soubor (kalibrace na kopii)
//   --sirka=390   jiná šířka okna    --md=<cesta.md>   uloží tabulku (od nejhorších)
//   --detail      vypíše jednotlivé vady i se stavem    --stavy=N  strop stavů    --jen-vychozi
// Exit kód 1, pokud v kterémkoli stavu cokoli nevyhovuje (nutný popisek < 12 px bez pokrytí,
// kontrast < 4,5:1, HTML obraz < 14 px nebo < 4,5:1, chybějící obraz u drobné scény, přetečení,
// nebo komponenta nešla změřit).
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { transformSync } from 'esbuild';

const WEB = join(dirname(fileURLToPath(import.meta.url)), '..');
const KOMP = process.env.MOBIL_KOMP || join(WEB, 'src/components/skola2'); // MOBIL_KOMP = jiná složka komponent (kontrola na HEAD v git worktree)
const DIST = join(WEB, 'dist');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MIN_PX = 12;
const MIN_KONTRAST = 4.5;
const MIN_HTML_PX = 14; // HTML obraz pod scénou (legenda, hodnoty) — běžný text na telefonu
const PAUZA_AKCE = 500; // ms po změně ovladače, než se měří

const args = process.argv.slice(2);
const volba = (k, vychozi) => (args.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3) || vychozi;
const SIRKA = +volba('sirka', '375');
const MD = volba('md', '');
const SOUBOR = volba('soubor', '');
const MAX_STAVU = +volba('stavy', '200');
const JEN_VYCHOZI = args.includes('--jen-vychozi');
const DETAIL = args.includes('--detail');
const LADIT = volba('ladit', ''); // --ladit=<řetězec>: vypíše měření textů scény, které ho obsahují, v každém stavu
const filtry = args.filter((a) => !a.startsWith('--'));

// ---------- seznam komponent ----------
function najdiKomponenty() {
	if (SOUBOR) return [SOUBOR];
	const vse = readdirSync(KOMP).filter((f) => f.endsWith('.astro')).sort();
	const vyber = vse.filter((f) => {
		if (f.endsWith('Simulace.astro')) return true;
		const z = readFileSync(join(KOMP, f), 'utf8');
		return z.includes('<svg') && z.includes('<script'); // jiná interaktivní komponenta se SVG scénou
	});
	const cesty = vyber.map((f) => join(KOMP, f));
	return filtry.length ? cesty.filter((c) => filtry.some((x) => basename(c).includes(x))) : cesty;
}

// ---------- stránka: styly webu + komponenta ----------
function najdiZakladniStranku() {
	const kandidat = join(DIST, 'skola2/fyzika/7-rocnik/sily-kolem-nas/teziste/index.html');
	if (existsSync(kandidat)) return readFileSync(kandidat, 'utf8');
	throw new Error('Chybí dist/ (spusť `npm run build`) — měřidlo potřebuje skutečné styly webu.');
}
const ZAKLAD = najdiZakladniStranku();

function sestavStranku(cesta) {
	const zdroj = readFileSync(cesta, 'utf8');
	const m = zdroj.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	const front = m ? m[1] : '';
	const fmKod = front.split('\n').filter((r) => r.trim() && !r.trim().startsWith('//')).length;
	let telo = m ? zdroj.slice(m[0].length) : zdroj;
	let chybaSkriptu = null;
	telo = telo.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g, (cel, atr, kod) => {
		try {
			const js = transformSync(kod, { loader: 'ts', target: 'es2022' }).code;
			return `<script type="module">${js}</script>`;
		} catch (e) {
			chybaSkriptu = String(e.message).split('\n')[0];
			return '';
		}
	});
	// dialogy (alert/confirm) by zablokovaly měření po kliknutí → potlačit dřív, než poběží skript komponenty
	const tlumic = '<script>window.alert=()=>{};window.confirm=()=>true;window.prompt=()=>"";document.addEventListener("submit",(e)=>e.preventDefault(),true);</script>';
	const html = ZAKLAD.replace(/<main([^>]*)>[\s\S]*<\/main>/, (_, atr) => `<main${atr}>${tlumic}${telo}</main>`);
	return { html, fmKod, chybaSkriptu, maSvg: /<svg/.test(zdroj) };
}

// ---------- ovládací prvky ----------
const SEL_OVL = 'input[type=range], input[type=number], select, input[type=checkbox], input[type=radio], button';
const OVLADACE = `(() => {
	const vid = (el) => { const s = getComputedStyle(el); return el.getClientRects().length > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
	return [...document.querySelector('main').querySelectorAll(${JSON.stringify(SEL_OVL)})].map((el, i) => {
		const druh = el.tagName === 'SELECT' ? 'select' : el.tagName === 'BUTTON' ? 'button' : el.type;
		const jmeno = el.id || el.getAttribute('aria-label') || (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 24) || el.name || ('#' + i);
		return { i, druh, jmeno, pouzit: !el.closest('svg') && !el.disabled && vid(el),
			min: el.min, max: el.max, step: el.step, value: el.value, checked: !!el.checked,
			volby: druh === 'select' ? [...el.options].map((o) => o.value) : [] };
	});
})()`;
const akce = (i, hodnota) => `(() => {
	const el = [...document.querySelector('main').querySelectorAll(${JSON.stringify(SEL_OVL)})][${i}];
	if (!el) return 'chybí';
	const h = ${JSON.stringify(hodnota)};
	if (h === '__klik') el.click();
	else { el.value = h; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }
	return 'ok';
})()`;
const VSECHNY_KROKY = 12; // posuvník s ≤ 12 kroky se ve výchozím režimu projde celý
function hodnotyRozsahu(o, vsechny) {
	const min = o.min === '' ? (o.druh === 'range' ? 0 : null) : +o.min;
	const max = o.max === '' ? (o.druh === 'range' ? 100 : null) : +o.max;
	if (min === null || max === null || !(max > min)) return [];
	const krok = o.step && o.step !== 'any' && +o.step > 0 ? +o.step : o.druh === 'range' ? 1 : 0;
	let stred = (min + max) / 2;
	if (krok) stred = min + Math.round((stred - min) / krok) * krok;
	const oprav = (x) => String(+x.toFixed(6));
	if (vsechny && krok && (max - min) / krok <= VSECHNY_KROKY) { // málo kroků → projdi každou polohu
		const hs = []; for (let x = min; x <= max + 1e-9; x += krok) hs.push(oprav(x));
		return hs;
	}
	return [...new Set([oprav(min), oprav(stred), oprav(max)])];
}
// plán stavů: skupina = jedno čerstvé načtení; kroky v rámci skupiny se po změření vrací
function planStavu(ovl) {
	const pouz = ovl.filter((o) => o.pouzit);
	const hodnotove = pouz.filter((o) => ['range', 'number', 'select', 'checkbox'].includes(o.druh));
	const klikaci = pouz.filter((o) => ['button', 'radio'].includes(o.druh));
	const zmeny = (o, jenKraje) => {
		if (o.druh === 'checkbox') return [{ popis: `${o.jmeno} přepnuto`, h: '__klik', zpet: '__klik' }];
		let hs = o.druh === 'select' ? [...new Set([o.volby[0], o.volby[Math.floor((o.volby.length - 1) / 2)], o.volby[o.volby.length - 1]])] : hodnotyRozsahu(o, !jenKraje);
		if (jenKraje && hs.length === 3) hs = [hs[0], hs[2]];
		return hs.filter((h) => h !== undefined).map((h) => ({ popis: `${o.jmeno}=${h}`, h, zpet: o.value }));
	};
	const skupiny = [{ uvod: null, popis: 'výchozí', kroky: hodnotove.flatMap((o) => zmeny(o, false).map((z) => ({ ...z, i: o.i }))) }];
	for (const k of klikaci) skupiny.push({ uvod: k.i, popis: `klik ${k.jmeno}`, kroky: hodnotove.flatMap((o) => zmeny(o, true).map((z) => ({ ...z, i: o.i }))) });
	return { skupiny, preskoceno: ovl.length - pouz.length };
}

// ---------- měření uvnitř stránky (jeden stav) ----------
const MERENI = `(() => {
	const cv = document.createElement('canvas'); cv.width = cv.height = 1;
	const cx = cv.getContext('2d', { willReadFrequently: true });
	function barva(s) { // -> [r,g,b,a] nebo null (none, gradient)
		if (!s || s === 'none' || s.startsWith('url(')) return null;
		const m = s.match(/^rgba?\\(([^)]*)\\)$/);
		if (m) { const c = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return c[3] === 0 ? null : [c[0], c[1], c[2], c.length > 3 ? c[3] : 1]; }
		cx.clearRect(0, 0, 1, 1); cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const p = cx.getImageData(0, 0, 1, 1).data;
		return p[3] ? [p[0], p[1], p[2], p[3] / 255] : null;
	}
	const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
	const pomer = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
	const nad = (dolni, horni, al) => dolni.map((c, i) => c * (1 - al) + horni[i] * al);
	function opacita(el, svg) { let o = 1; for (let e = el; e && e !== svg.parentNode; e = e.parentElement) { const v = +getComputedStyle(e).opacity; if (!isNaN(v)) o *= v; } return o; }
	function podkladStranky(el) {
		let zaklad = [255, 255, 255]; const vrstvy = [];
		for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const b = barva(getComputedStyle(e).backgroundColor); if (b) { vrstvy.push(b); if (b[3] >= 1) break; } }
		for (const b of vrstvy.reverse()) zaklad = nad(zaklad, b, b[3]);
		return zaklad;
	}
	const viditelny = (el) => { const s = getComputedStyle(el); return el.getClientRects().length > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
	const TVARY = 'rect,circle,ellipse,path,polygon,polyline';
	const vysl = [];
	document.querySelectorAll('main svg').forEach((svg, si) => {
		const sr = svg.getBoundingClientRect(); const vb = svg.viewBox && svg.viewBox.baseVal;
		const meritkoSvg = vb && vb.width ? Math.min(sr.width / vb.width, sr.height / vb.height || Infinity) : 1;
		const vsechny = [...svg.querySelectorAll('*')];
		const texty = [...svg.querySelectorAll('text, tspan')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
		texty.forEach((t, ti) => {
			const cs = getComputedStyle(t);
			const fs = parseFloat(cs.fontSize);
			const videt = viditelny(t);
			let meritko = meritkoSvg;
			if (videt) { const m = t.getScreenCTM(); if (m) meritko = Math.hypot(m.a, m.b); }
			const px = meritko > 0 ? fs * meritko : null; // SVG bez rozměru = nevykresleno
			let kontrast = null, popis = '';
			const fill = barva(cs.fill);
			if (videt && fill) {
				const r = t.getBoundingClientRect();
				const x = r.left + r.width / 2, y = r.top + r.height / 2;
				let pozadi = podkladStranky(svg);
				const poradi = vsechny.indexOf(t);
				for (let i = 0; i < poradi; i++) {
					const e = vsechny[i];
					if (!e.matches(TVARY) || e.closest('defs,clipPath,mask,marker,pattern,symbol')) continue;
					if (!viditelny(e)) continue;
					const c = barva(getComputedStyle(e).fill); if (!c) continue;
					const al = c[3] * (+getComputedStyle(e).fillOpacity) * opacita(e, svg); if (al <= 0.02) continue;
					const m = e.getScreenCTM(); if (!m || !e.isPointInFill) continue;
					const b = new DOMPoint(x, y).matrixTransform(m.inverse());
					if (e.isPointInFill(b)) pozadi = nad(pozadi, c, Math.min(1, al));
				}
				const alT = fill[3] * (+cs.fillOpacity) * opacita(t, svg);
				const popr = nad(pozadi, fill, Math.min(1, alT));
				kontrast = pomer(popr, pozadi);
				popis = 'text ' + cs.fill + ' / podklad rgb(' + pozadi.map(Math.round).join(',') + ')';
			}
			const tx = t.textContent.trim().replace(/\\s+/g, ' ');
			const host = t.closest('text');
			const nutne = !!(t.closest('[data-nutne]') || (host && host.id)); // NUTNÝ popisek = data-nutne, nebo dynamický výstup (<text id=…>)
			const klic = (svg.id || si) + '|' + (host && host.id ? '#' + host.id : ti) + '|' + tx;
			vysl.push({ svg: svg.id || '#' + (si + 1), text: tx.slice(0, 40), full: tx, klic, nutne, px, kontrast, viditelny: videt, popis });
		});
	});
	// HTML OBRAZ pod scénou: kontejner + každý jeho potomek s vlastním textem
	const obraz = [];
	document.querySelectorAll('main *').forEach((el) => {
		if (el.closest('svg')) return;
		const tridy = [...el.classList];
		if (!(el.hasAttribute('data-mobil-obraz') || tridy.some((c) => /-(mobil|legenda)$/.test(c)))) return;
		const tx = el.textContent.trim().replace(/\\s+/g, ' ');
		const videt = viditelny(el);
		let minPx = Infinity, minK = Infinity, nejhorsi = '';
		for (const d of [el, ...el.querySelectorAll('*')]) {
			if (!viditelny(d)) continue;
			const vlastni = [...d.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
			if (!vlastni && d !== el) continue;
			const cs = getComputedStyle(d);
			const c = barva(cs.color) || [0, 0, 0, 1];
			const poz = podkladStranky(d);
			const px = parseFloat(cs.fontSize), k = pomer(nad(poz, c, c[3] * (+cs.opacity || 1)), poz);
			if (px < minPx) minPx = px;
			if (k < minK) { minK = k; nejhorsi = d.tagName.toLowerCase() + ' „' + (vlastni || tx).slice(0, 30) + '“'; }
		}
		const popisky = [...el.querySelectorAll('[data-popisek]')].filter(viditelny).flatMap((p) => [...(p.getAttribute('data-popisek') || '').split('|'), p.textContent]).map((s) => s.trim().replace(/\\s+/g, ' ')).filter(Boolean);
		obraz.push({ id: el.id || tridy.join('.'), text: tx, px: minPx, kontrast: minK, nejhorsi, popisky, viditelny: videt });
	});
	return { obraz, texty: vysl, preteceni: document.documentElement.scrollWidth - innerWidth };
})()`;

// ---------- Chrome přes CDP (bez závislostí) ----------
async function spustChrome() {
	const dir = mkdtempSync(join(tmpdir(), 'citelnost-'));
	const proc = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${dir}`, '--no-first-run', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
	let ws = '';
	for (let i = 0; i < 100 && !ws; i++) {
		await new Promise((r) => setTimeout(r, 100));
		try { const z = readFileSync(join(dir, 'DevToolsActivePort'), 'utf8').split('\n'); ws = `ws://127.0.0.1:${z[0]}${z[1]}`; } catch {}
	}
	if (!ws) { proc.kill(); throw new Error('Chrome se nespustil (cesta: ' + CHROME + ')'); }
	const sock = new WebSocket(ws);
	await new Promise((res, rej) => { sock.onopen = res; sock.onerror = () => rej(new Error('CDP spojení selhalo')); });
	let id = 0; const cekani = new Map(); const udalosti = [];
	sock.onmessage = (ev) => {
		const m = JSON.parse(ev.data);
		if (m.id && cekani.has(m.id)) { const { res, rej } = cekani.get(m.id); cekani.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
		else if (m.method) udalosti.push(m);
	};
	const posli = (method, params = {}, sessionId) => new Promise((res, rej) => { const i = ++id; cekani.set(i, { res, rej }); sock.send(JSON.stringify({ id: i, method, params, sessionId })); });
	const konec = () => { try { sock.close(); } catch {} proc.kill(); try { rmSync(dir, { recursive: true, force: true }); } catch {} };
	return { posli, udalosti, konec };
}

// ---------- server ----------
const STRANKY = new Map();
const typy = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.html': 'text/html' };
const server = http.createServer((req, res) => {
	const url = decodeURIComponent(req.url.split('?')[0]);
	if (url.startsWith('/__k/')) { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(STRANKY.get(url.slice(5)) || ''); }
	const cesta = join(DIST, url);
	if (!cesta.startsWith(DIST) || !existsSync(cesta)) { res.writeHead(404); return res.end(); }
	const ext = cesta.slice(cesta.lastIndexOf('.'));
	try { res.writeHead(200, { 'content-type': typy[ext] || 'application/octet-stream' }); res.end(readFileSync(cesta)); } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const PORT = server.address().port;
const spi = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- hlavní smyčka ----------
const komponenty = najdiKomponenty();
if (!komponenty.length) { console.log('Žádná komponenta nevyhovuje filtru.'); process.exit(1); }
const chrome = await spustChrome();
const vysledky = [];
for (const cesta of komponenty) {
	const nazev = basename(cesta, '.astro');
	const st = sestavStranku(cesta);
	STRANKY.set(nazev, st.html);
	const r = { nazev, maSvg: st.maSvg, poznamky: [], stavy: [], chyba: null };
	if (st.fmKod) r.poznamky.push(`frontmatter s kódem (${st.fmKod} ř.) — změřeno bez něj`);
	if (st.chybaSkriptu) r.poznamky.push('skript nešel přeložit: ' + st.chybaSkriptu);
	if (!st.maSvg) { r.bezSvg = true; vysledky.push(r); continue; }
	try {
		const { targetId } = await chrome.posli('Target.createTarget', { url: 'about:blank' });
		const { sessionId } = await chrome.posli('Target.attachToTarget', { targetId, flatten: true });
		const S = (m, p) => chrome.posli(m, p, sessionId);
		const E = async (expr, awaitPromise = false) => {
			const o = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise });
			if (o.exceptionDetails) throw new Error((o.exceptionDetails.exception?.description || o.exceptionDetails.text).split('\n')[0]);
			return o.result.value;
		};
		await S('Runtime.enable'); await S('Page.enable');
		await S('Emulation.setDeviceMetricsOverride', { width: SIRKA, height: 900, deviceScaleFactor: 1, mobile: true });
		const odZ = chrome.udalosti.length;
		const nacti = async () => {
			await S('Page.navigate', { url: `http://127.0.0.1:${PORT}/__k/${nazev}` });
			for (let i = 0; i < 50; i++) { await spi(100); try { if ((await E('document.readyState')) === 'complete') break; } catch {} }
			await E('document.fonts.ready.then(()=>1)', true);
			await spi(400);
		};
		const zmer = async (popis) => {
			const d = await E(MERENI); r.stavy.push({ popis, ...d });
			if (LADIT) for (const t of d.texty.filter((x) => x.full.includes(LADIT))) console.log(`  [ladit] ${nazev} {${popis}} „${t.text}“ px=${f1(t.px)} kontrast=${f1(t.kontrast)} viditelný=${t.viditelny} nutný=${t.nutne} ${t.popis}`);
		};
		await nacti();
		const ovl = JEN_VYCHOZI ? [] : await E(OVLADACE);
		const { skupiny, preskoceno } = planStavu(ovl);
		if (preskoceno) r.poznamky.push(`${preskoceno} ovladačů přeskočeno (ve scéně, zakázané nebo skryté po načtení)`);
		let pocet = 0, useknuto = 0;
		for (const [gi, g] of skupiny.entries()) {
			if (pocet >= MAX_STAVU) { useknuto += 1 + g.kroky.length; continue; }
			if (gi > 0) { await nacti(); await E(akce(g.uvod, '__klik')); await spi(PAUZA_AKCE); }
			await zmer(g.popis); pocet++;
			for (const k of g.kroky) {
				if (pocet >= MAX_STAVU) { useknuto++; continue; }
				await E(akce(k.i, k.h)); await spi(PAUZA_AKCE);
				await zmer(g.uvod === null ? k.popis : `${g.popis} + ${k.popis}`); pocet++;
				await E(akce(k.i, k.zpet)); await spi(80);
			}
		}
		if (useknuto) r.poznamky.push(`strop ${MAX_STAVU} stavů — ${useknuto} stavů nezměřeno`);
		const chyby = chrome.udalosti.slice(odZ).filter((e) => e.sessionId === sessionId && e.method === 'Runtime.exceptionThrown');
		if (chyby.length) r.poznamky.push('výjimka ve stránce: ' + (chyby[0].params.exceptionDetails.exception?.description || chyby[0].params.exceptionDetails.text).split('\n')[0]);
		await chrome.posli('Target.closeTarget', { targetId });
	} catch (e) { r.chyba = String(e.message).split('\n')[0]; }
	vysledky.push(r);
}
chrome.konec(); server.close();

// ---------- pokrytí nutného popisku HTML obrazem ----------
const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function pokryto(text, obrazText, popisky) {
	const t = norm(text);
	if (!t) return true;
	if ([...t].length <= 2) return popisky.some((p) => norm(p) === t); // krátký token jen přes [data-popisek]
	return new RegExp(`(?<![\\p{L}\\p{N}])${escRe(t)}(?![\\p{L}\\p{N}])`, 'u').test(norm(obrazText));
}

// ---------- vyhodnocení ----------
const radky = vysledky.filter((r) => !r.bezSvg).map((r) => {
	const vady = []; // { stav, druh, text }
	const pis = [], kon = [];
	let drobnychMax = 0, obrazuMax = 0, nText = 0, nutneKlice = new Map(), videtKlice = new Set(), vsechnyObrazy = '', vsechnyPopisky = [];
	for (const s of r.stavy) {
		const obrazy = s.obraz.filter((o) => o.viditelny && o.text);
		const obrazText = obrazy.map((o) => o.text).join(' ');
		const popisky = obrazy.flatMap((o) => o.popisky);
		vsechnyObrazy += ' ' + obrazText; vsechnyPopisky.push(...popisky);
		const vid = s.texty.filter((t) => t.viditelny);
		nText = Math.max(nText, vid.length);
		vid.forEach((t) => { if (t.px !== null) pis.push(t.px); if (t.kontrast !== null) kon.push(t.kontrast); videtKlice.add(t.klic); });
		s.texty.filter((t) => t.nutne && !t.viditelny).forEach((t) => nutneKlice.set(t.klic, t));
		const drobne = vid.filter((t) => t.px !== null && t.px < MIN_PX - 0.05);
		drobnychMax = Math.max(drobnychMax, drobne.length); obrazuMax = Math.max(obrazuMax, obrazy.length);
		for (const t of drobne) if (t.nutne && !pokryto(t.full, obrazText, popisky)) vady.push({ stav: s.popis, druh: 'nutny', text: `NUTNÝ popisek ${f1(t.px)} px bez pokrytí v HTML obrazu — [${t.svg}] „${t.text}“` });
		for (const t of vid) if (t.kontrast !== null && t.kontrast < MIN_KONTRAST) vady.push({ stav: s.popis, druh: 'kontrast', text: `kontrast ${f1(t.kontrast)} — [${t.svg}] „${t.text}“ ${t.popis}` });
		for (const t of s.texty) if (t.px === null) vady.push({ stav: s.popis, druh: 'nezmereno', text: `text bez rozměru — [${t.svg}] „${t.text}“` });
		if (drobne.length && !obrazy.length) vady.push({ stav: s.popis, druh: 'obraz', text: `scéna má ${drobne.length} textů < ${MIN_PX} px a pod ní není žádný viditelný neprázdný HTML obraz (třída …-mobil / …-legenda / data-mobil-obraz)` });
		for (const o of obrazy) {
			if (o.px < MIN_HTML_PX - 0.05) vady.push({ stav: s.popis, druh: 'obraz', text: `HTML obraz [${o.id}] má písmo ${o.px.toFixed(1)} px < ${MIN_HTML_PX}` });
			if (o.kontrast < MIN_KONTRAST) vady.push({ stav: s.popis, druh: 'obraz', text: `HTML obraz [${o.id}] má kontrast ${o.kontrast.toFixed(1)} < ${MIN_KONTRAST} (${o.nejhorsi})` });
		}
		if (s.preteceni > 0) vady.push({ stav: s.popis, druh: 'preteceni', text: `stránka přetéká o ${s.preteceni} px` });
	}
	// nutné popisky skryté ve VŠECH navštívených stavech: měřítko SVG, pokrytí obrazem kteréhokoli stavu
	for (const [k, t] of nutneKlice) if (!videtKlice.has(k) && t.px !== null && t.px < MIN_PX - 0.05 && !pokryto(t.full, vsechnyObrazy, vsechnyPopisky))
		vady.push({ stav: 'skrytý ve všech stavech', druh: 'nutny', text: `NUTNÝ popisek ${f1(t.px)} px (skrytý režim) — [${t.svg}] „${t.text}“` });
	// stejná vada ve více stavech = jeden řádek se seznamem stavů
	const sloucene = new Map();
	for (const v of vady) { const x = sloucene.get(v.text) || { ...v, stavy: [] }; x.stavy.push(v.stav); sloucene.set(v.text, x); }
	const vadyS = [...sloucene.values()];
	const nezmereno = !!r.chyba || !r.stavy.length || vady.some((v) => v.druh === 'nezmereno');
	const pocet = (d) => vadyS.filter((v) => v.druh === d).length;
	return { ...r, nStavu: r.stavy.length, minPx: pis.length ? Math.min(...pis) : null, nText, drobnych: drobnychMax, nNutnych: pocet('nutny'), minK: kon.length ? Math.min(...kon) : null, nSlabych: pocet('kontrast'), obrazuMax, nObrazVad: pocet('obraz') + pocet('preteceni'), vady: vadyS, nezmereno, vyhovuje: !nezmereno && !vadyS.length };
});
function f1(x) { return x === null || x === undefined ? '–' : x.toFixed(1).replace('.', ','); }
radky.sort((a, b) => (a.nezmereno === b.nezmereno ? 0 : a.nezmereno ? -1 : 1) || (a.minPx ?? 99) - (b.minPx ?? 99) || (a.minK ?? 99) - (b.minK ?? 99));
const tab = ['| komponenta | stavů | min. písmo px | drobných < 12 px (tolerováno) | NUTNÝCH bez pokrytí | min. kontrast | < 4,5:1 | HTML obrazů | vad obrazu | textů | stav |', '|---|---|---|---|---|---|---|---|---|---|---|'];
for (const r of radky) tab.push(`| ${r.nazev} | ${r.nStavu} | ${f1(r.minPx)} | ${r.drobnych} | ${r.nNutnych} | ${f1(r.minK)} | ${r.nSlabych} | ${r.obrazuMax} | ${r.nObrazVad} | ${r.nText} | ${r.nezmereno ? 'NEZMĚŘENO' + (r.chyba ? ' (' + r.chyba + ')' : '') : r.vyhovuje ? 'vyhovuje' : 'NEVYHOVUJE'} |`);
const nevyh = radky.filter((r) => !r.vyhovuje);
const bezSvg = vysledky.filter((r) => r.bezSvg);
const stavTxt = (v) => (v.stavy.length > 3 ? `${v.stavy.slice(0, 3).join('; ')} … (+${v.stavy.length - 3})` : v.stavy.join('; '));
console.log(`Čitelnost na mobilu — okno ${SIRKA} px, práh písma ${MIN_PX} px (HTML obraz ${MIN_HTML_PX} px), kontrast ${MIN_KONTRAST}:1, ${JEN_VYCHOZI ? 'jen výchozí stav' : `stavy: výchozí + min/střed/max ovladačů (strop ${MAX_STAVU})`}\n`);
console.log(tab.join('\n'));
console.log(`\nKomponent se SVG změřeno: ${radky.length}, nevyhovuje: ${nevyh.length}; bez SVG (přeskočeno): ${bezSvg.length}`);
for (const r of radky) for (const p of r.poznamky) console.log(`  pozn. ${r.nazev}: ${p}`);
if (DETAIL) for (const r of nevyh) {
	console.log(`\n${r.nazev}:`);
	for (const v of r.vady) console.log(`  ${v.text}  {stav: ${stavTxt(v)}}`);
}
if (MD) {
	const md = [`# Čitelnost simulací na mobilu — okno ${SIRKA} px`, '', `Měřidlo \`testy/mobil-citelnost.mjs\`. Práh písma ${MIN_PX} px, HTML obraz ${MIN_HTML_PX} px, kontrast ${MIN_KONTRAST}:1 (WCAG, pro všechny velikosti). Stavy: ${JEN_VYCHOZI ? 'jen výchozí' : 'výchozí + min/střed/max ovladačů'}. Seřazeno od nejhorších.`, `Změřeno komponent se SVG: ${radky.length}, nevyhovuje: ${nevyh.length}; bez SVG (přeskočeno): ${bezSvg.length}.`, '', ...tab, ''];
	const pozn = radky.flatMap((r) => r.poznamky.map((p) => `- ${r.nazev}: ${p}`));
	if (pozn.length) md.push('## Poznámky', '', ...pozn, '');
	if (bezSvg.length) md.push('## Bez SVG (nezměřeno)', '', bezSvg.map((r) => r.nazev).join(', '), '');
	md.push('## Vady (prvních 8 na komponentu)', '');
	for (const r of nevyh) {
		md.push(`### ${r.nazev}`);
		for (const v of r.vady.slice(0, 8)) md.push(`- ${v.text} {stav: ${stavTxt(v)}}`);
		md.push('');
	}
	writeFileSync(MD, md.join('\n'));
	console.log(`Uloženo: ${MD}`);
}
process.exit(nevyh.length ? 1 : 0);

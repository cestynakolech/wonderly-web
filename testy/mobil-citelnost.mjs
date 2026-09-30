#!/usr/bin/env node
// MĚŘIDLO ČITELNOSTI SIMULACÍ NA MOBILU (zatím JEN HLÁŠENÍ — není v prebuildu ani v npm scripts).
//
// Proč existuje: autoři simulací měřili písmo na telefonu každý po svém (Těžiště: iframe 360 px
// v headless Chrome + ruční výpočet, viz /tmp/wonderly-workery/2026-09-30-30d8ea48/mobil/server.mjs).
// Tohle je jediný domov toho postupu: pro každou komponentu změří SKUTEČNĚ VYKRESLENOU velikost
// písma všech <text>/<tspan> ve všech jejích SVG a kontrast textu proti podkladu.
//
// Jak měří (vše ve skutečném headless Chrome, bez npm závislostí — ovládá se přes CDP):
//  1) vezme sestavenou stránku webu (dist/…/teziste/index.html — styly SkolaLayout i stránky),
//     nahradí obsah <main> zdrojem komponenty (frontmatter pryč, <script> přeložen esbuildem),
//     servíruje ji z lokálního serveru;
//  2) okno emulované na šířku 360 px (mobile, DPR 1; přepínač --sirka=390);
//  3) písmo v px = computed font-size (uživatelské jednotky) × měřítko SVG→obrazovka
//     (getScreenCTM, zahrnuje viewBox i transform skupin). Texty ve skrytých režimech
//     (display:none) se měří přes měřítko samotného SVG;
//  4) kontrast: pod střed textu se najdou všechny dřívější tvary (rect/circle/ellipse/path/
//     polygon) s výplní, které bod skutečně zasahují (isPointInFill), a složí se jejich
//     barvy s průhledností od podkladu stránky nahoru; text se složí přes výsledek.
//     Počítá WCAG 2.x poměr (práh 4,5:1 pro všechny velikosti — přísněji než norma u velkého písma).
//
// Meze (upřímně): měří se VÝCHOZÍ stav po načtení (po kliknutí vzniklé popisky ne); texty
// ve skrytých režimech mají jen velikost, ne kontrast; výplň gradientem/vzorkem se při
// skládání přeskočí; komponenty s kódem ve frontmatteru se měří bez něj (hlásí se).
//
// Použití:
//   node testy/mobil-citelnost.mjs                     všechny *Simulace.astro + jiné s SVG i <script>
//   node testy/mobil-citelnost.mjs Jiskra Elektrolyza   jen komponenty, jejichž název obsahuje řetězec
//   node testy/mobil-citelnost.mjs --soubor=/tmp/x.astro   libovolný soubor (kalibrace na kopii)
//   --sirka=390   jiná šířka okna    --md=<cesta.md>   uloží tabulku (od nejhorších)
//   --detail      vypíše jednotlivé vadné texty
// Exit kód 1, pokud cokoli nevyhovuje (písmo < 12 px, kontrast < 4,5:1, nebo komponenta nešla změřit).
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { transformSync } from 'esbuild';

const WEB = join(dirname(fileURLToPath(import.meta.url)), '..');
const KOMP = join(WEB, 'src/components/skola2');
const DIST = join(WEB, 'dist');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MIN_PX = 12;
const MIN_KONTRAST = 4.5;

const args = process.argv.slice(2);
const volba = (k, vychozi) => (args.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3) || vychozi;
const SIRKA = +volba('sirka', '360');
const MD = volba('md', '');
const SOUBOR = volba('soubor', '');
const DETAIL = args.includes('--detail');
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
	const html = ZAKLAD.replace(/<main([^>]*)>[\s\S]*<\/main>/, (_, atr) => `<main${atr}>${telo}</main>`);
	return { html, fmKod, chybaSkriptu, maSvg: /<svg/.test(zdroj) };
}

// ---------- měření uvnitř stránky ----------
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
		for (const t of texty) {
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
			vysl.push({ svg: svg.id || '#' + (si + 1), text: t.textContent.trim().replace(/\\s+/g, ' ').slice(0, 40), px, kontrast, viditelny: videt, popis });
		}
	});
	return { texty: vysl, sirkaOkna: innerWidth, preteceni: document.documentElement.scrollWidth - innerWidth };
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

// ---------- hlavní smyčka ----------
const komponenty = najdiKomponenty();
if (!komponenty.length) { console.log('Žádná komponenta nevyhovuje filtru.'); process.exit(1); }
const chrome = await spustChrome();
const vysledky = [];
for (const cesta of komponenty) {
	const nazev = basename(cesta, '.astro');
	const st = sestavStranku(cesta);
	STRANKY.set(nazev, st.html);
	const r = { nazev, maSvg: st.maSvg, poznamky: [], texty: [], chyba: null };
	if (st.fmKod) r.poznamky.push(`frontmatter s kódem (${st.fmKod} ř.) — změřeno bez něj`);
	if (st.chybaSkriptu) r.poznamky.push('skript nešel přeložit: ' + st.chybaSkriptu);
	if (!st.maSvg) { r.bezSvg = true; vysledky.push(r); continue; }
	try {
		const { targetId } = await chrome.posli('Target.createTarget', { url: 'about:blank' });
		const { sessionId } = await chrome.posli('Target.attachToTarget', { targetId, flatten: true });
		const S = (m, p) => chrome.posli(m, p, sessionId);
		await S('Runtime.enable'); await S('Page.enable');
		await S('Emulation.setDeviceMetricsOverride', { width: SIRKA, height: 900, deviceScaleFactor: 1, mobile: true });
		const odZ = chrome.udalosti.length;
		await S('Page.navigate', { url: `http://127.0.0.1:${PORT}/__k/${nazev}` });
		await new Promise((res) => setTimeout(res, 1200));
		await S('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true });
		const out = await S('Runtime.evaluate', { expression: MERENI, returnByValue: true });
		if (out.exceptionDetails) throw new Error('měření: ' + (out.exceptionDetails.exception?.description || out.exceptionDetails.text).split('\n')[0]);
		const d = out.result.value;
		r.texty = d.texty; r.preteceni = d.preteceni;
		const chyby = chrome.udalosti.slice(odZ).filter((e) => e.sessionId === sessionId && e.method === 'Runtime.exceptionThrown');
		if (chyby.length) r.poznamky.push('výjimka ve stránce: ' + (chyby[0].params.exceptionDetails.exception?.description || chyby[0].params.exceptionDetails.text).split('\n')[0]);
		await chrome.posli('Target.closeTarget', { targetId });
	} catch (e) { r.chyba = String(e.message).split('\n')[0]; }
	vysledky.push(r);
}
chrome.konec(); server.close();

// ---------- vyhodnocení ----------
const radky = vysledky.filter((r) => !r.bezSvg).map((r) => {
	const pis = r.texty.filter((t) => t.px !== null).map((t) => t.px);
	const kon = r.texty.filter((t) => t.kontrast !== null).map((t) => t.kontrast);
	const malych = r.texty.filter((t) => t.px !== null && t.px < MIN_PX - 0.05);
	const slabych = r.texty.filter((t) => t.kontrast !== null && t.kontrast < MIN_KONTRAST);
	const nezmereno = !!r.chyba || r.texty.some((t) => t.px === null) || (r.poznamky.some((p) => p.startsWith('výjimka') || p.startsWith('skript nešel')) && r.texty.length === 0);
	return { ...r, minPx: pis.length ? Math.min(...pis) : null, nText: r.texty.length, malych, minK: kon.length ? Math.min(...kon) : null, slabych, nezmereno, vyhovuje: !nezmereno && !malych.length && !slabych.length && !r.preteceni };
});
radky.sort((a, b) => (a.nezmereno === b.nezmereno ? 0 : a.nezmereno ? -1 : 1) || (a.minPx ?? 99) - (b.minPx ?? 99) || (a.minK ?? 99) - (b.minK ?? 99));
const f1 = (x) => (x === null ? '–' : x.toFixed(1).replace('.', ','));
const tab = ['| komponenta | min. písmo px | textů < 12 px | min. kontrast | < 4,5:1 | textů | stav |', '|---|---|---|---|---|---|---|'];
for (const r of radky) tab.push(`| ${r.nazev} | ${f1(r.minPx)} | ${r.malych.length} | ${r.minK === null ? '–' : f1(r.minK)} | ${r.slabych.length} | ${r.nText} | ${r.nezmereno ? 'NEZMĚŘENO' + (r.chyba ? ' (' + r.chyba + ')' : '') : r.vyhovuje ? 'vyhovuje' : 'NEVYHOVUJE' + (r.preteceni ? ` (přetéká o ${r.preteceni} px)` : '')} |`);
const nevyh = radky.filter((r) => !r.vyhovuje);
const bezSvg = vysledky.filter((r) => r.bezSvg);
console.log(`Čitelnost na mobilu — okno ${SIRKA} px, práh písma ${MIN_PX} px, kontrast ${MIN_KONTRAST}:1\n`);
console.log(tab.join('\n'));
console.log(`\nKomponent se SVG změřeno: ${radky.length}, nevyhovuje: ${nevyh.length}; bez SVG (přeskočeno): ${bezSvg.length}`);
for (const r of radky) for (const p of r.poznamky) console.log(`  pozn. ${r.nazev}: ${p}`);
if (DETAIL) for (const r of nevyh) {
	console.log(`\n${r.nazev}:`);
	for (const t of r.malych) console.log(`  písmo ${f1(t.px)} px — [${t.svg}] „${t.text}“${t.viditelny ? '' : ' (skrytý režim)'}`);
	for (const t of r.slabych) console.log(`  kontrast ${f1(t.kontrast)} — [${t.svg}] „${t.text}“ ${t.popis}`);
}
if (MD) {
	const md = [`# Čitelnost simulací na mobilu — okno ${SIRKA} px`, '', `Měřidlo \`testy/mobil-citelnost.mjs\` (30. 9. 2026). Práh písma ${MIN_PX} px, kontrast ${MIN_KONTRAST}:1 (WCAG, pro všechny velikosti). Seřazeno od nejhorších.`, `Změřeno komponent se SVG: ${radky.length}, nevyhovuje: ${nevyh.length}; bez SVG (přeskočeno): ${bezSvg.length}.`, '', ...tab, ''];
	const pozn = radky.flatMap((r) => r.poznamky.map((p) => `- ${r.nazev}: ${p}`));
	if (pozn.length) md.push('## Poznámky', '', ...pozn, '');
	if (bezSvg.length) md.push('## Bez SVG (nezměřeno)', '', bezSvg.map((r) => r.nazev).join(', '), '');
	md.push('## Vadné texty (prvních 6 na komponentu)', '');
	for (const r of nevyh) {
		md.push(`### ${r.nazev}`);
		for (const t of r.malych.slice(0, 6)) md.push(`- písmo ${f1(t.px)} px — [${t.svg}] „${t.text}“${t.viditelny ? '' : ' (skrytý režim)'}`);
		for (const t of r.slabych.slice(0, 6)) md.push(`- kontrast ${f1(t.kontrast)} — [${t.svg}] „${t.text}“ (${t.popis})`);
		md.push('');
	}
	writeFileSync(MD, md.join('\n'));
	console.log(`Uloženo: ${MD}`);
}
process.exit(nevyh.length ? 1 : 0);

#!/usr/bin/env node
// Ověření TreniSimulace.astro (F7 „Třecí síla“, bedna tažená po podložce).
// Spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM.
//
// Proč vznikl (oprava 3. 10. 2026, odložený nález téma 2): simulace měla dřevo
// f = 0,4 / v klidu 0,5 a k tomu led a beton — výklad přitom uvádí tabulku
// dřevo na dřevě 0,65 / 0,30, ocel na dřevě 0,55 / 0,35, ocel na oceli 0,15 / 0,10
// a řešený příklad 50 kg ocel na dřevě → Ft = 175 N. Test proto:
//  1) skript doběhne a ovladače jsou připojené;
//  2) každá dvojice materiálů ze simulace má součinitele PŘESNĚ podle tabulky
//     ve výkladu (čte se ze src/data/temata.ts, ne z komponenty);
//  3) ve výkladu není materiál, který by simulace ukazovala navíc (led, beton…);
//  4) řešený příklad výkladu (ocel na dřevě, 50 kg → 175 N) dá simulace stejně;
//  5) všechny polohy posuvníků (3 povrchy × 5 hmotností × 81 sil, tam i zpět)
//     dávají celé newtony, správnou hysterezi (utrhne se NAD mezí klidu, zastaví
//     POD smykovým třením), správné šipky a stav — včetně rovnováhy F = Ft;
//  6) stav viditelný v náhledu jsou SVG atributy (barva bedny/podlahy, šipky, čárky);
//  7) (kolo 4) šipky začínají vně obrysu bedny;
//  8) (kolo 5) legenda pro telefon je PRAVDIVÁ vůči kresbě: kroužek kolem krátké šipky byl zrušen
//     (šipku neobkroužil, kontrola-3b4830c N1); legenda říká „Malé síly mají krátkou šipku – velikost
//     síly je napsaná u šipky.“ a test ověřuje, že to platí: číslo síly stojí u začátku šipky, je vidět
//     a na telefonu 375 px má písmo ≥ 12 px. Legenda nesmí slibovat kroužek ani jiný neexistující tvar.
//
// Spuštění: node testy/simulace/treni.mjs [cesta] (bez argumentu: src/components/skola2/TreniSimulace.astro)
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/TreniSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/g, '');
const temata = readFileSync(new URL('../../src/data/temata.ts', import.meta.url), 'utf8');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const konec = () => { console.log(`\n${chyby ? chyby + ' chyb' : 'vše v pořádku'}`); process.exit(chyby ? 1 : 0); };

// ---------- výklad: blok podtématu s interakcí 'treni' ----------
const radky = temata.split('\n');
const iInt = radky.findIndex((r) => /interakce: 'treni',/.test(r));
const vyklad = iInt >= 0 ? radky.slice(iInt, iInt + 8).join('\n').replace(/ /g, ' ') : '';
ok(vyklad.length > 1000, 'výklad podtématu s interakcí „treni“ je v temata.ts nalezen');
const tabulka = {};
for (const m of vyklad.matchAll(/<li>([^<.]+?) \.\.\. (\d,\d+) \/ (\d,\d+)<\/li>/g)) tabulka[m[1].replace(/\s*\(.*\)/, '').trim()] = [m[2], m[3]];
ok(tabulka['dřevo na dřevě'] && tabulka['ocel na dřevě'] && tabulka['ocel na oceli'], `tabulka součinitelů ve výkladu: ${JSON.stringify(tabulka)}`);

// ---------- náhradní DOM ----------
const prvky = new Map();
for (const m of html.matchAll(/<(\w+)\s([^>]*?)\/?>/g)) {
	const atr = {};
	for (const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) atr[a[1]] = a[2];
	if (!atr.id) continue;
	prvky.set(atr.id, {
		id: atr.id, tag: m[1], atributy: { ...atr }, textContent: '', innerHTML: '', style: {}, posluchaci: {},
		value: atr.value ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
		querySelectorAll: () => [],
	});
}
const document = { getElementById: (id) => prvky.get(id) || null, querySelectorAll: () => [] };
vm.createContext({ document, console });
let vyjimka = null;
try { vm.runInContext(skript, vm.createContext({ document, console })); } catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) konec();

const el = (id) => prvky.get(id);
const at = (id, k) => el(id)?.getAttribute(k); // chybějící prvek = nesouhlas, ne pád testu
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
// tlačítka povrchů nemají id → náhradní tlačítka podle data-povrch ve zdroji; třída „aktivní“ se zaznamenává
const tlacitkaDom = [...html.matchAll(/<button [^>]*class="([^"]*)" data-povrch="([\w-]+)"/g)].map((m) => {
	const tridy = new Set(m[1].split(' '));
	return { dataset: { povrch: m[2] }, tridy, classList: { toggle: (t, ano) => (ano ? tridy.add(t) : tridy.delete(t)) } };
});
if (el('treni-povrchy')) el('treni-povrchy').querySelectorAll = (sel) => (sel === '.treni-tl' ? tlacitkaDom : []);
const aktivni = () => tlacitkaDom.filter((b) => b.tridy.has('treni-aktivni')).map((b) => b.dataset.povrch).join();
const zvolPovrch = (klic) => (el('treni-povrchy').posluchaci.click || []).forEach((f) => f({ target: { closest: (sel) => (sel === '.treni-tl' ? tlacitkaDom.find((b) => b.dataset.povrch === klic) || { dataset: { povrch: klic } } : null) } }));

ok((el('treni-slider-m').posluchaci.input || []).length === 1 && (el('treni-slider-f').posluchaci.input || []).length === 1, 'oba posuvníky jsou připojené');
ok((el('treni-povrchy').posluchaci.click || []).length === 1, 'výběr povrchu je připojený');
ok(at('treni-slider-m', 'min') === '10' && at('treni-slider-m', 'max') === '50' && at('treni-slider-m', 'step') === '10', 'hmotnost 10–50 kg po 10');
ok(at('treni-slider-f', 'min') === '0' && at('treni-slider-f', 'max') === '400' && at('treni-slider-f', 'step') === '5', 'tažná síla 0–400 N po 5 (rovnováha F = Ft musí jít trefit)');

// ---------- výchozí stav ----------
ok(el('treni-out-m').textContent === '20 kg' && el('treni-out-f').textContent === '0 N', `výchozí stav: ${el('treni-out-m').textContent}, ${el('treni-out-f').textContent}`);
ok(el('treni-podlaha-text').textContent === 'DŘEVO NA DŘEVĚ (f = 0,30 · v klidu 0,65)', `výchozí povrch: ${el('treni-podlaha-text').textContent}`);
ok(at('treni-sipka-f', 'visibility') === 'hidden' && at('treni-sipka-t', 'visibility') === 'hidden', 'bez tahu nejsou vidět šipky');
ok(el('treni-stav').textContent.includes('Zatáhni'), 'bez tahu výzva „Zatáhni“');

// ---------- povrchy ze zdroje vs. tabulka výkladu ----------
const tlacitka = [...html.matchAll(/data-povrch="([\w-]+)">[^<]*?([a-zěščřžýáíéůú][^<]*)<\/button>/g)].map((m) => ({ klic: m[1], text: m[2].trim() }));
ok(tlacitka.map((t) => t.klic).join() === 'drevo,ocel-drevo,ocel', `tlačítka povrchů: ${tlacitka.map((t) => t.klic + '=' + t.text).join(', ')}`);
const cislo = (s) => Number(s.replace(',', '.'));
const POVRCHY = {};
for (const t of tlacitka) {
	zvolPovrch(t.klic);
	const pop = el('treni-podlaha-text').textContent;
	const m = pop.match(/^(.+) \(f = (\d,\d\d) · v klidu (\d,\d\d)\)$/);
	const radek = tabulka[t.text];
	ok(!!m && pop.startsWith(t.text.toUpperCase()), `${t.text}: popisek podlahy „${pop}“`);
	ok(!!radek && m && radek[0] === m[3] && radek[1] === m[2], `${t.text}: součinitele v klidu ${m && m[3]} / při pohybu ${m && m[2]} = tabulka výkladu ${radek ? radek.join(' / ') : 'CHYBÍ'}`);
	if (m) POVRCHY[t.klic] = { klid: cislo(m[3]), smyk: cislo(m[2]), text: t.text };
	ok(aktivni() === t.klic, `${t.text}: zvýrazněné je právě tohle tlačítko (${aktivni()})`);
	ok(at('treni-podlaha', 'fill') === (t.klic === 'ocel' ? '#adb5bd' : '#deb887'), `${t.text}: podlaha má barvu ${t.klic === 'ocel' ? 'oceli' : 'dřeva'} (${at('treni-podlaha', 'fill')})`);
	ok(at('treni-bedna-rect', 'fill') === (t.klic === 'drevo' ? '#ffd8a8' : '#ced4da'), `${t.text}: bedna má barvu ${t.klic === 'drevo' ? 'dřeva' : 'oceli'} (${at('treni-bedna-rect', 'fill')})`);
}
ok(!/\b(led|beton)\b/i.test(html.replace(/<!--[\s\S]*?-->/g, '')) && !/led:|beton:/.test(skript), 'simulace už neukazuje led ani beton (bez opory ve výkladu)');

// ---------- řešený příklad výkladu ----------
const priklad = vyklad.match(/m = (\d+) kg, f = (\d,\d+) \(ocel na dřevě při pohybu\)/);
const vysledekPrikladu = vyklad.match(/= <strong>(\d+) N<\/strong><\/p>/);
ok(!!priklad && !!vysledekPrikladu, `výklad má řešený příklad ocel na dřevě (${priklad && priklad[0]} → ${vysledekPrikladu && vysledekPrikladu[1]} N)`);
zvolPovrch('ocel-drevo');
posun('treni-slider-m', 50);
ok(el('treni-vypocet').innerHTML.includes(`smykové Ft = ${priklad && priklad[2]} × 500 = <strong>${vysledekPrikladu && vysledekPrikladu[1]} N</strong>`), `simulace dá pro příklad totéž: ${el('treni-vypocet').innerHTML.replace(/<[^>]+>|&nbsp;/g, '')}`);

// ---------- všechny polohy posuvníků ----------
// šipky (oprava 3. 10. 2026, kolo 3): délka od hrany bedny po ŠPIČKU musí být PŘÍMO úměrná síle
// se stejným měřítkem pro F i Ft — výklad Síla učí „délka šipky = síla v měřítku“. Kolo 2 mělo
// délku 16 + 0,55·F (+2 px přesah hrotu): 80 N / 50 N = 1,36 místo 1,60 → tenhle test na tom padá.
// Měření je nezávislé na tvaru: <path d> (špička = nejvzdálenější bod) i <line> + marker
// (špička = x2 + přesah hrotu za refX), takže test měří skutečnou délku i u staré verze.
const k = 0.65; // px na newton: F 400 N → 260 px, Ft 325 N → 211 px (vejde se do scény)
const markerPresah = (() => { const m = html.match(/refX="([\d.]+)"[^>]*><path d="M0,0 L([\d.]+),/); return m ? +m[2] - +m[1] : 0; })();
const zmerSipku = (id, smer) => {
	const d = at(id, 'd');
	if (d) {
		const body = [...d.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
		if (!body.length) return { x0: NaN, delka: NaN, vyska: 0 };
		const ys = body.map((b) => b[1]);
		return { x0: body[0][0], delka: Math.max(...body.map((b) => (b[0] - body[0][0]) * smer)), vyska: Math.max(...ys) - Math.min(...ys) };
	}
	const x1 = +at(id, 'x1'), x2 = +at(id, 'x2');
	return { x0: x1, delka: (x2 - x1) * smer + markerPresah, vyska: 18 };
};

// ---------- rozvržení scény: šipky a popisky mimo obrys bedny, nepřekrývají se ----------
const atrHtml = (id) => {
	const m = html.match(new RegExp(`<\\w+ id="${id}"([^>]*)>`));
	return m ? Object.fromEntries([...m[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])) : {};
};
const bedna = atrHtml('treni-bedna-rect');
const bL = +bedna.x, bP = +bedna.x + +bedna.width, bH = +bedna.y, bD = +bedna.y + +bedna.height;
const sF = atrHtml('treni-sipka-f'), sT = atrHtml('treni-sipka-t'), pF = atrHtml('treni-pop-f'), pT = atrHtml('treni-pop-t');
const vbT = html.match(/id="treni-svg" viewBox="0 0 (\d+) (\d+)"/);
// osa šipek: y 170 (střed tvaru), uvnitř výšky bedny
const OSA = 170;
sF.y1 = sT.y1 = OSA;
ok(OSA > bH && OSA < bD && [sF.fill, sT.fill].join() === '#1971c2,#c92a2a', `šipky leží ve výšce bedny (y ${OSA}) a mají barvy F modrá, Ft červená (${sF.fill}, ${sT.fill})`);
// popisek F začíná vpravo od bedny, popisek Ft končí vlevo od ní; oba nad šipkou (hrot ±9 px, písmo 15)
const PISMO = +pF['font-size'];
const sirkaPop = (t) => t.length * 0.6 * PISMO;
ok(pF['text-anchor'] === 'start' && +pF.x >= bP + 4 && pT['text-anchor'] === 'end' && +pT.x <= bL - 4, `popisky sil leží vodorovně mimo obrys bedny (F od x ${pF.x}, Ft do x ${pT.x})`);
ok(+pF.y + 4 < +sF.y1 - 9 && +pT.y + 4 < +sT.y1 - 9 && +pF.y - PISMO > 50 && pF['font-size'] === pT['font-size'], `popisky stojí nad šipkami a pod legendou (y ${pF.y}, šipky y ${sF.y1})`);
ok(+pF.x + sirkaPop('F = 400 N') <= +vbT[1] && +pT.x - sirkaPop('Ft = 325 N') >= 0, 'nejdelší popisky („F = 400 N“, „Ft = 325 N“) se vejdou do scény');
// pohybové čárky nesmí ležet přes šipku třecí síly (pás y1 ± 9 px)
const carky = [...(html.match(/<g id="treni-pohyb"[\s\S]*?<\/g>/) || [''])[0].matchAll(/y1="(\d+)"/g)].map((m) => +m[1]);
ok(carky.length === 3 && carky.every((y) => Math.abs(y - +sT.y1) > 9 + 1.5 && y < bD), `pohybové čárky neleží přes šipku Ft (y ${carky.join(', ')})`);
// barvy textu sil mají kontrast ≥ 4,5 : 1 proti pozadí scény #f8f9fa
const lum = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
const kontrast = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
ok([pF.fill, pT.fill].every((c) => kontrast(c, '#f8f9fa') >= 4.5), `popisky sil mají kontrast ≥ 4,5 : 1 (${[pF.fill, pT.fill].map((c) => kontrast(c, '#f8f9fa').toFixed(2)).join(', ')})`);
ok(bP + 400 * k <= +vbT[1] - 4 && bL - 325 * k >= 4, 'nejdelší šipky (F 400 N, Ft 325 N) se vejdou do scény');
// šipka začíná VNĚ obrysu bedny (oprava 3. 10. 2026, kolo 4): obrys je čára tloušťky stroke-width
// se středem na hraně, takže jeho vnější okraj je hrana ± polovina tloušťky. Kolo 3 začínalo na hraně
// a víc než polovina 5N klínku ležela přes černý obrys (kontrola-6e46c77 D1).
const obrys = +bedna['stroke-width'] / 2;
const x0F = bP + obrys, x0T = bL - obrys;
ok(obrys > 0 && atrHtml('treni-sipka-f').d.startsWith(`M${x0F},`) && atrHtml('treni-sipka-t').d.startsWith(`M${x0T},`), `šipky začínají vně obrysu bedny (F od x ${x0F}, Ft od x ${x0T})`);
// ---------- pravdivost legendy proti kresbě (kolo 5) ----------
// Kroužek kolem krátké šipky zrušen (šipku neobkroužil, legenda „šipka v kroužku“ lhala — kontrola-3b4830c N1).
// Legenda teď říká „velikost síly je napsaná u šipky“ → test ověřuje, že to v kresbě platí:
// Šířka scény na telefonu 375 px je 262,9 CSS px při viewBoxu 660 (změřeno v Chrome, /private/tmp/opravy-kolo5/mer.mjs;
// stejná šířka i u SilaVektorSimulace) → písmo popisku × 262,9 / 660 musí být ≥ 12 px.
const HROT = 16;
const SIRKA_375 = 262.9;
const VYSVETLENI = 'Malé síly mají krátkou šipku – velikost síly je napsaná u šipky.';
const naTelefonu = (PISMO * SIRKA_375) / +vbT[1];
ok(naTelefonu >= 12, `popisky sil mají na telefonu 375 px písmo ≥ 12 px (${naTelefonu.toFixed(1)} px při font-size ${PISMO})`);
// „u šipky“: popisek začíná nejvýš 8 px od začátku šipky (vodorovně) a jeho účaří je nejvýš 16 px nad šipkou (hrot od y 161)
ok(+pF.x - x0F >= 0 && +pF.x - x0F <= 8 && x0T - +pT.x >= 0 && x0T - +pT.x <= 8 && 161 - +pF.y > 0 && 161 - +pF.y <= 16 && +pF.y === +pT.y, `popisky stojí přímo u začátku šipek (F x ${pF.x} vs. ${x0F}, Ft x ${pT.x} vs. ${x0T}, účaří y ${pF.y})`);
// popisek nic neskrývá: žádné visibility/opacity/display na popiscích
ok(![pF, pT].some((a) => a.visibility || a.opacity || a.display), 'popisky sil nejsou skryté atributem');
// kroužky jsou pryč a nic je neslibuje
ok(!/<circle/.test(html.replace(/<!--[\s\S]*?-->/g, '')) && !/kroužk/.test(skript.replace(/\/\/.*$/gm, '')), 'scéna nemá kroužky a texty skriptu (mimo komentáře) o kroužku nemluví');
let pravdiva = true;
let meritko = null; // px/N změřené na první nenulové šipce; všechny další (F i Ft) musí mít totéž
const delkaSedi = (s, x0, sila) => {
	if (!(s.x0 === x0 && s.vyska >= 18)) return false;
	if (meritko === null) meritko = s.delka / sila;
	return Math.abs(s.delka - sila * meritko) <= 0.01 && Math.abs(s.delka - sila * k) <= 0.01;
};
let celaCisla = true, hystereze = true, sipky = true, stavy = true, vzorec = true, obrazek = true, mobil = true;
const doslo = {};
for (const [klic, p] of Object.entries(POVRCHY)) {
	zvolPovrch(klic);
	for (let m = 10; m <= 50; m += 10) {
		posun('treni-slider-f', 0);
		posun('treni-slider-m', m);
		const Fn = m * 10, mez = Math.round(p.klid * Fn), smyk = Math.round(p.smyk * Fn);
		if (Math.abs(p.klid * Fn - mez) > 1e-9 || Math.abs(p.smyk * Fn - smyk) > 1e-9) celaCisla = false;
		let jede = false;
		const sily = [];
		for (let F = 0; F <= 400; F += 5) sily.push(F);
		for (let F = 395; F >= 0; F -= 5) sily.push(F);
		for (const F of sily) {
			posun('treni-slider-f', F);
			if (!jede && F > mez) jede = true;
			if (jede && F < smyk) jede = false;
			const Ft = jede ? smyk : Math.min(F, mez);
			const popT = el('treni-pop-t').textContent;
			if (popT !== (Ft > 0 ? `Ft = ${Ft} N` : '')) { hystereze = false; if (hystereze === false && !doslo.chyba) doslo.chyba = `${klic} ${m} kg F=${F}: čekáno Ft=${Ft}, je „${popT}“`; }
			// legenda tvrdí „velikost síly je napsaná u šipky“ → u každé viditelné šipky nese popisek právě její hodnotu
			// (a nic, když šipka není); věta se ukáže právě tehdy, když je ve scéně krátká šipka (kratší než hrot, do 20 N)
			const kratkaVidet = (F > 0 && F * k < HROT && at('treni-sipka-f', 'visibility') === 'visible') || (Ft > 0 && Ft * k < HROT && at('treni-sipka-t', 'visibility') === 'visible');
			const leg = el('treni-mobil').textContent;
			const cisloUSipky = (idS, idP, nazev, sila) => (at(idS, 'visibility') === 'visible') === (sila > 0) && el(idP).textContent === (sila > 0 ? `${nazev} = ${sila} N` : '') && !at(idP, 'visibility') && !at(idP, 'opacity');
			if (leg.includes(VYSVETLENI) !== kratkaVidet || !cisloUSipky('treni-sipka-f', 'treni-pop-f', 'F', F) || !cisloUSipky('treni-sipka-t', 'treni-pop-t', 'Ft', Ft) || /kroužk/.test(leg)) { pravdiva = false; doslo.pravda ||= `${klic} ${m} kg F=${F}: „${leg}“`; }
			if ((Ft > 0 && !delkaSedi(zmerSipku('treni-sipka-t', -1), x0T, Ft)) || (F > 0 && !delkaSedi(zmerSipku('treni-sipka-f', 1), x0F, F))
				|| at('treni-pop-t', 'x') !== pT.x || at('treni-pop-f', 'x') !== pF.x
				|| at('treni-sipka-f', 'visibility') !== (F > 0 ? 'visible' : 'hidden') || at('treni-sipka-t', 'visibility') !== (Ft > 0 ? 'visible' : 'hidden')
				|| el('treni-pop-f').textContent !== (F > 0 ? `F = ${F} N` : '')) sipky = false;
			if (at('treni-pohyb', 'opacity') !== (jede ? '0.9' : '0')) obrazek = false;
			// legenda pro telefon opakuje popisky scény (síly, hmotnost, povrch) čitelným písmem
			const c2 = (x) => x.toFixed(2).replace('.', ',');
			// hodnota síly s pevnými mezerami (U+00A0): na 375 px se legenda jinak lámala „Ft = 5 | N“
			const cekMobil = `${F > 0 ? `F = ${F} N (modrá šipka, tažná) · ` : ''}${Ft > 0 ? `Ft = ${Ft} N (červená šipka, třecí) · ` : ''}bedna ${m} kg · ${p.text.toUpperCase()} (f = ${c2(p.smyk)} · v klidu ${c2(p.klid)})${(F > 0 && F * k < HROT) || (Ft > 0 && Ft * k < HROT) ? ' · ' + VYSVETLENI : ''}`;
			if (el('treni-mobil').textContent !== cekMobil) { mobil = false; doslo.mobil ||= `${klic} ${m} kg F=${F}: „${el('treni-mobil').textContent}“`; }
			if (el('treni-out-f').textContent !== `${F} N` || el('treni-out-m').textContent !== `${m} kg` || el('treni-bedna-text').textContent !== `${m} kg`) obrazek = false;
			const st = el('treni-stav').textContent;
			let cek;
			if (!jede) cek = F === 0 ? 'Zatáhni' : `STOJÍ — klidové tření tvou sílu přesně dorovnává (Ft = ${Ft} N). Utrhne se, až zatáhneš víc než ${mez} N.`;
			else if (F > smyk) cek = `ZRYCHLUJE — F (${F} N) je větší než smykové tření (${smyk} N)`;
			else cek = `ROVNOMĚRNĚ — síly jsou v rovnováze (F = Ft = ${smyk} N). Klesneš-li pod ${smyk} N`;
			if (!st.includes(cek)) { stavy = false; if (!doslo.stav) doslo.stav = `${klic} ${m} kg F=${F}: „${st}“`; }
			if (jede && F === smyk) doslo[`${klic}-${m}`] = true;
			const vz = el('treni-vypocet').innerHTML;
			const kc = (x) => x.toFixed(2).replace('.', ',');
			if (vz !== `Fn = Fg = ${m} · 10 = <strong>${Fn} N</strong> &nbsp;·&nbsp; mez klidového tření = ${kc(p.klid)} × ${Fn} = <strong>${mez} N</strong> &nbsp;·&nbsp; smykové Ft = ${kc(p.smyk)} × ${Fn} = <strong>${smyk} N</strong>`) vzorec = false;
		}
	}
}
ok(celaCisla, 'všechny meze tření (3 povrchy × 5 hmotností) vychází v celých newtonech');
ok(hystereze, `třecí síla sedí s hysterezí ve všech ${3 * 5 * 161} polohách${doslo.chyba ? ' — ' + doslo.chyba : ''}`);
ok(sipky, `šipky F a Ft: délka PŘÍMO úměrná síle (${k} px/N, stejné měřítko), poloha popisku i viditelnost ve všech polohách (změřeno ${meritko} px/N)`);
// kotva z výkladu: dvojnásobná síla = dvojnásobná šipka; ocel na oceli 50 kg, F = 80 N → jede, Ft = 50 N
zvolPovrch('ocel'); posun('treni-slider-f', 0); posun('treni-slider-m', 50); posun('treni-slider-f', 80);
const s80 = zmerSipku('treni-sipka-f', 1), s50 = zmerSipku('treni-sipka-t', -1);
ok(el('treni-pop-t').textContent === 'Ft = 50 N' && Math.abs(s80.delka / s50.delka - 1.6) < 1e-6, `šipka 80 N : šipka 50 N = ${(s80.delka / s50.delka).toFixed(3)} (má být 1,6 jako 80 : 50)`);
// přesný tvar: dlouhá šipka = dřík 7 px + hrot 16 × 18 px; krátká (pod 16 px) = jen klínek 18 px vysoký
ok(at('treni-sipka-f', 'd') === 'M391.75,166.5 L427.75,166.5 L427.75,161 L443.75,170 L427.75,179 L427.75,173.5 L391.75,173.5 Z' && at('treni-sipka-t', 'd') === 'M268.25,166.5 L251.75,166.5 L251.75,161 L235.75,170 L251.75,179 L251.75,173.5 L268.25,173.5 Z', `tvar šipek 80 N a 50 N (${at('treni-sipka-f', 'd')} | ${at('treni-sipka-t', 'd')})`);
ok(!el('treni-mobil').textContent.includes(VYSVETLENI), 'u šipek 80 N a 50 N (obě delší než hrot) legenda větu o krátkých šipkách nemá');
posun('treni-slider-f', 5);
const nbT = (t) => t.replaceAll(' ', String.fromCharCode(160));
ok(at('treni-sipka-f', 'd') === 'M391.75,161 L395,170 L391.75,179 Z' && at('treni-sipka-f', 'visibility') === 'visible' && el('treni-pop-f').textContent === 'F = 5 N' && el('treni-pop-t').textContent === 'Ft = 5 N' && el('treni-mobil').textContent === `${nbT('F = 5 N')} (modrá šipka, tažná) · ${nbT('Ft = 5 N')} (červená šipka, třecí) · bedna 50 kg · OCEL NA OCELI (f = 0,10 · v klidu 0,15) · ${VYSVETLENI}`, `síla 5 N: klínek 3,25 px vně obrysu, u šipky číslo, legenda to říká (${el('treni-mobil').textContent})`);
posun('treni-slider-f', 25);
ok(el('treni-mobil').textContent.startsWith(`${nbT('F = 25 N')} (modrá šipka, tažná)`) && !el('treni-mobil').textContent.includes(VYSVETLENI), 'síla 25 N (šipka 16,25 px, delší než hrot; Ft 25 N také): legenda bez věty o krátkých šipkách');
ok(pravdiva, `legenda je pravdivá vůči kresbě: věta „velikost síly je napsaná u šipky“ právě u krátkých šipek a u každé viditelné šipky stojí její hodnota, ve všech polohách${doslo.pravda ? ' — ' + doslo.pravda : ''}`);
ok(obrazek, 'pohybové čárky (opacity), výstupy posuvníků a nápis na bedně sedí ve všech polohách');
ok(mobil, `legenda pro telefon (síly, hmotnost, povrch) sedí ve všech polohách${doslo.mobil ? ' — ' + doslo.mobil : ''}`);
const stylT = zdroj.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] || '';
ok(/<p class="treni-mobil" id="treni-mobil" data-mobil-obraz><\/p>/.test(html) && /\.treni-mobil \{ display: none; \}/.test(stylT) && /@media \(max-width: 600px\) \{\s*\.treni-mobil \{ display: block; font-size: 1rem;[^}]*color: #2b2a26;[^}]*background: #fff;/.test(stylT), 'legenda pro telefon je pod scénou (data-mobil-obraz, 16 px, tmavé na bílé), na počítači skrytá');
ok(stavy, `text stavu (stojí / zrychluje / rovnoměrně) sedí ve všech polohách${doslo.stav ? ' — ' + doslo.stav : ''}`);
ok(vzorec, 'řádek výpočtu Fn, mez klidu a smykové Ft sedí ve všech polohách');
ok(Object.keys(POVRCHY).every((kl) => [10, 20, 30, 40, 50].every((m) => doslo[`${kl}-${m}`])), 'rovnováha F = Ft (rovnoměrný pohyb) jde trefit u každého povrchu i hmotnosti');

// konkrétní kotva (spočítaná ručně): dřevo na dřevě, 20 kg → mez 130 N, smykové 60 N
zvolPovrch('drevo'); posun('treni-slider-m', 20);
posun('treni-slider-f', 130);
ok(el('treni-pop-t').textContent === 'Ft = 130 N' && at('treni-pohyb', 'opacity') === '0', 'dřevo 20 kg, F = 130 N: bedna ještě stojí, Ft = 130 N');
posun('treni-slider-f', 135);
ok(el('treni-pop-t').textContent === 'Ft = 60 N' && at('treni-pohyb', 'opacity') === '0.9', 'dřevo 20 kg, F = 135 N: utrhne se, Ft klesne na 60 N');
posun('treni-slider-m', 30);
ok(at('treni-pohyb', 'opacity') === '0' && el('treni-pop-t').textContent === 'Ft = 135 N', 'změna hmotnosti bednu zastaví (klidové tření znovu)');
posun('treni-slider-m', 20); posun('treni-slider-f', 135);
zvolPovrch('ocel');
ok(at('treni-pohyb', 'opacity') === '0.9' && el('treni-pop-t').textContent === 'Ft = 20 N', 'ocel na oceli 20 kg, F = 135 N: mez 30 N překročena hned, Ft = 20 N');
zvolPovrch('drevo');
ok(at('treni-pohyb', 'opacity') === '0.9' && el('treni-pop-t').textContent === 'Ft = 60 N', 'zpět na dřevo 20 kg při 135 N: nad mezí 130 N se bedna znovu utrhne, Ft = 60 N');
posun('treni-slider-f', 100); zvolPovrch('ocel'); zvolPovrch('drevo');
ok(at('treni-pohyb', 'opacity') === '0' && el('treni-pop-t').textContent === 'Ft = 100 N', 'přepnutí povrchu nuluje pohyb: dřevo 20 kg při 100 N stojí, Ft = 100 N');

konec();

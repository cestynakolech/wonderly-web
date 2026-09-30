#!/usr/bin/env node
// Ověření DiodaSimulace.astro (přechod PN, F9): spustí SKUTEČNÝ skript
// komponenty v Node s náhradním DOM a proměří, co scéna žákovi tvrdí.
//
// SMYSL scény (výklad podtématu „Polovodiče typu N a P, dioda" + obr-05/06):
//   · propustný směr: typ N na −, typ P na +, hradlová vrstva se ZUŽUJE,
//     proud prochází, LED svítí; elektrony ze zdroje do typu N a přes typ P
//     ke kladné svorce, díry opačně,
//   · závěrný směr: typ N na +, typ P na −, nositelé náboje na okrajích,
//     hradlová vrstva se ROZŠIŘUJE, proud neprochází, LED nesvítí,
//   · šipky v celé smyčce souhlasné: dohodnutý směr proudu (výklad F8: od +
//     k −) jde od + přes P do N k −; elektrony se pohybují opačně, díry s ním,
//   · žádné číslo napětí ani proudu, žádný práh, rezistor ani „zmizela"
//     (výklad je nemá — nález kontrolora T3e, 30. 9. 2026),
//   · legenda a barvy jako obrázky stránky, popisek scény mimo vodiče a částice,
//   · mobil: písmo ≥ 12 px při šířce scény 235 px (telefon 360 px), texty
//     s kontrastem ≥ 4,5 : 1, tlačítka s aria-pressed, aria-label podle stavu
//     (kontrola simulací 30. 9. 2026, nálezy 1–5).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '',
		posluchaci: {},
		classList: {
			_t: new Set(),
			add(...t) { t.forEach((x) => this._t.add(x)); },
			remove(...t) { t.forEach((x) => this._t.delete(x)); },
			contains(t) { return this._t.has(t); },
		},
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());
const el = (id) => prvky.get(id);
const at = (id, k) => el(id).getAttribute(k);
const stav = el('dioda-svg').__stavDiody;
const TL_P = 'dioda-tl-propustny', TL_Z = 'dioda-tl-zaverny';
const aktivni = (id) => el(id).classList.contains('dioda-aktivni') && at(id, 'aria-pressed') === 'true';
const neaktivni = (id) => !el(id).classList.contains('dioda-aktivni') && at(id, 'aria-pressed') === 'false';

// ČEKANÉ hodnoty natvrdo (ne odvozené z komponenty)
const STYK = 180; // styk typu N a P
const N_OD = 34, P_DO = 326, HORNI = 136, DOLNI = 244;
const R = 13, ODSAZENI = 16, DELKA = 26; // kroužek nositele, začátek a délka šipky
const LEVY_VODIC = 14, PRAVY_VODIC = 346, HORNI_VODIC = 62;
const SVORKA_N = 168, SVORKA_P = 192; // svorky zdroje, ke kterým vedou vodiče od N a od P
const ZNACKA_E = 'fill="#1971c2" stroke="#0b4f8a" stroke-width="2"';
const ZNACKA_D = 'fill="#ffffff" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2"';
const scena = zdroj.match(/<svg id="dioda-svg"[\s\S]*?<\/svg>/)[0];

// rozebere nakreslené nositele: kroužek, jeho znak a (volitelně) šipku pohybu hned za ním
function nosice() {
	const html = el('dioda-castice').innerHTML;
	const vzor = /<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="(\d+)" ([^/]*?) \/><text x="(-?[\d.]+)" y="(-?[\d.]+)" text-anchor="middle" font-size="(\d+)" font-weight="bold" fill="(#\w+)">([^<]*)<\/text>(<line x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)" stroke="#e03131" stroke-width="3" marker-end="url\(#dioda-m-cer\)" \/>)?/g;
	return [...html.matchAll(vzor)].map((m) => ({
		x: +m[1], y: +m[2], r: +m[3], druh: m[4] === ZNACKA_E ? 'e' : m[4] === ZNACKA_D ? 'd' : '?',
		tx: +m[5], ty: +m[6], font: +m[7], barva: m[8], znak: m[9],
		sipka: m[10] ? { x1: +m[11], y1: +m[12], x2: +m[13], y2: +m[14] } : null,
	}));
}
const vBloku = (c) => c.x > N_OD && c.x < P_DO && c.y > HORNI && c.y < DOLNI;
const hrot = (id) => { // polygon šipky: x hrotu, průměrné x základny
	const p = scena.match(new RegExp(`id="${id}" points="([^"]+)"`))[1].split(' ').map((q) => q.split(',').map(Number));
	return { hrot: p[0][0], zaklad: (p[1][0] + p[2][0]) / 2, y: p[0][1] };
};

console.log('— čistá funkce stavu —');
const SP = stav('propustny'), SZ = stav('zaverny');
ok(SP.vede === true && SP.ledSviti === true, 'propustný směr: proud prochází a LED svítí');
ok(SZ.vede === false && SZ.ledSviti === false, 'závěrný směr: proud neprochází a LED nesvítí');
ok(SP.zona.sirka === 16 && SZ.zona.sirka === 140, `hradlová vrstva: propustný úzká 16, závěrný široká 140 (je ${SP.zona.sirka} a ${SZ.zona.sirka})`);
ok(SP.zona.x === 172 && SZ.zona.x === 110, `hradlová vrstva je souměrná kolem styku ${STYK} (x ${SP.zona.x} a ${SZ.zona.x})`);
ok(SP.zona.sirka > 0, 'v propustném směru se hradlová vrstva jen zužuje, nezmizí');
ok(SP.plusUP === true && SZ.plusUP === false, 'kladná svorka je u typu P jen v propustném směru');

console.log('— výchozí stav: propustný směr —');
ok(aktivni(TL_P) && neaktivni(TL_Z), 'zvolené je tlačítko propustného směru (třída i aria-pressed)');
ok(at('dioda-zona', 'width') === '16' && at('dioda-zona', 'x') === '172', `nakreslená hradlová vrstva je úzká (x ${at('dioda-zona', 'x')}, šířka ${at('dioda-zona', 'width')})`);
ok(at('dioda-paprsky', 'opacity') === '1', 'LED svítí (paprsky viditelné)');
ok(at('dioda-proud-vodice', 'opacity') === '1' && at('dioda-proud-prechod', 'opacity') === '1', 'šipky proudu jsou vidět');
ok(/propustném směru/.test(at('dioda-svg', 'aria-label')) && /proud prochází/.test(at('dioda-svg', 'aria-label')), `aria-label scény popisuje propustný směr: ${JSON.stringify(at('dioda-svg', 'aria-label'))}`);
ok(scena.includes(`<path d="M${SVORKA_N} ${HORNI_VODIC} L${LEVY_VODIC} ${HORNI_VODIC} L${LEVY_VODIC} 190 L${N_OD} 190"`) && scena.includes(`<path d="M${SVORKA_P} ${HORNI_VODIC} L${PRAVY_VODIC} ${HORNI_VODIC} L${PRAVY_VODIC} 190 L${P_DO} 190"`),
	'levý vodič spojuje svorku x 168 s typem N, pravý svorku x 192 s typem P');
ok(at('dioda-bat-dlouha', 'x1') === '192' && at('dioda-bat-dlouha', 'x2') === '192', 'dlouhá čárka (+) je u vodiče k typu P');
ok(at('dioda-bat-kratka', 'x1') === '168' && at('dioda-bat-kratka', 'x2') === '168', 'krátká čárka (−) je u vodiče k typu N');
ok(at('dioda-bat-plus', 'x') === '212' && at('dioda-bat-minus', 'x') === '148', 'znak + stojí u dlouhé čárky, − u krátké');

console.log('— šipky proudu souhlasné v celé smyčce (od + přes P do N k −) —');
{
	const l = hrot('dioda-proud-l'), p = hrot('dioda-proud-p');
	ok(p.hrot > p.zaklad && p.y === HORNI_VODIC, `horní pravý vodič: proud teče od + doprava k typu P (hrot ${p.hrot} > ${p.zaklad})`);
	ok(l.hrot > l.zaklad && l.y === HORNI_VODIC, `horní levý vodič: proud teče od typu N doprava k − (hrot ${l.hrot} > ${l.zaklad})`);
	ok(l.hrot < SVORKA_N && l.zaklad > LEVY_VODIC && p.zaklad > SVORKA_P && p.hrot < PRAVY_VODIC, 'každá šipka leží na svém vodiči, ne přes zdroj');
	const s = scena.match(/<line id="dioda-proud-sipka" x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="(\d+)"/).slice(1).map(Number);
	ok(s[0] > STYK && s[2] < STYK && s[1] === s[3], `přechodem teče proud z typu P do typu N (x ${s[0]} → ${s[2]})`);
	ok(s[1] > DOLNI + 40, `šipka proudu přechodem leží pod přechodem i pod popiskem vrstvy (y ${s[1]})`);
	ok(/marker-end="url\(#dioda-m-ora\)"/.test(scena) && />směr proudu: P → N<\/text>/.test(scena), 'šipka pod přechodem je popsaná „směr proudu: P → N"');
}

console.log('— nositelé náboje v propustném směru —');
{
	const n = nosice();
	const e = n.filter((c) => c.druh === 'e'), d = n.filter((c) => c.druh === 'd');
	ok(n.length === 14 && !n.some((c) => c.druh === '?'), `nakresleno 14 nositelů, všichni se známou značkou (${n.length})`);
	ok(e.length === 8 && d.length === 6, `8 elektronů (6 v přechodu, 2 na vodičích) a 6 děr (je ${e.length} a ${d.length})`);
	const eN = e.filter((c) => vBloku(c) && c.x < STYK).length, eP = e.filter((c) => vBloku(c) && c.x > STYK).length;
	const dN = d.filter((c) => vBloku(c) && c.x < STYK).length, dP = d.filter((c) => vBloku(c) && c.x > STYK).length;
	ok(eN === 4 && eP === 2, `elektrony jsou v typu N i v typu P, v N převládají (${eN} : ${eP})`);
	ok(dN === 2 && dP === 4, `díry jsou v obou typech, v P převládají (${dN} : ${dP})`);
	ok(n.every((c) => c.sipka), 'každý nositel má šipku pohybu');
	ok(e.filter(vBloku).every((c) => c.sipka.x2 > c.sipka.x1 && c.sipka.y1 === c.y && c.sipka.y2 === c.y),
		'elektrony v přechodu jdou doprava — od typu N k typu P a ke kladné svorce (proti proudu)');
	ok(d.every((c) => c.sipka.x2 < c.sipka.x1 && c.sipka.y1 === c.y && c.sipka.y2 === c.y), 'díry jdou doleva — ve směru proudu, od P k N');
	const lev = e.find((c) => c.x === LEVY_VODIC), prav = e.find((c) => c.x === PRAVY_VODIC);
	ok(!!lev && lev.y > HORNI_VODIC && lev.y < 190 && lev.sipka.y2 > lev.sipka.y1 && lev.sipka.x1 === LEVY_VODIC && lev.sipka.x2 === LEVY_VODIC,
		'elektron na levém vodiči jde dolů: ze záporné svorky do typu N');
	ok(!!prav && prav.y > HORNI_VODIC && prav.y < 190 && prav.sipka.y2 < prav.sipka.y1 && prav.sipka.x1 === PRAVY_VODIC && prav.sipka.x2 === PRAVY_VODIC,
		'elektron na pravém vodiči jde nahoru: z typu P ke kladné svorce');
	ok(n.filter(vBloku).length === 12, `v přechodu je 12 nositelů, 2 zbylí leží na vodičích (${n.filter(vBloku).length})`);
	ok(n.every((c) => Math.abs(c.sipka.x2 - c.sipka.x1) + Math.abs(c.sipka.y2 - c.sipka.y1) === DELKA), `všechny šipky pohybu jsou stejně dlouhé (${DELKA} px)`);
	ok(n.every((c) => Math.abs(c.sipka.x1 - c.x) + Math.abs(c.sipka.y1 - c.y) === ODSAZENI), `šipka začíná těsně za kroužkem (${ODSAZENI} px od středu)`);
	ok(n.every((c) => (c.sipka.x1 - c.x) * (c.sipka.x2 - c.sipka.x1) + (c.sipka.y1 - c.y) * (c.sipka.y2 - c.sipka.y1) === ODSAZENI * DELKA),
		'šipka vychází z kroužku ve směru pohybu, ne za jeho zády');
	ok(n.filter(vBloku).every((c) => Math.min(c.sipka.x1, c.sipka.x2) > N_OD && Math.max(c.sipka.x1, c.sipka.x2) + 2 < P_DO), 'šipky v přechodu z něj nevyčnívají');
	ok(n.filter(vBloku).every((c) => c.x + R < 172 || c.x - R > 188), 'žádný nositel neleží v úzké hradlové vrstvě');
	ok(n.filter(vBloku).every((c) => c.x - R > N_OD + 2 && c.x + R < P_DO - 2 && c.y - R > HORNI + 2 && c.y + R < DOLNI - 2), 'kroužky v přechodu nesahají na jeho obrys');
	// hrot šipky (+2 px za koncem čáry) nesmí narazit do dalšího kroužku
	const srazka = [];
	for (const c of n) for (const o of n) if (o !== c) {
		const hx = c.sipka.x2 + Math.sign(c.sipka.x2 - c.sipka.x1) * 2, hy = c.sipka.y2 + Math.sign(c.sipka.y2 - c.sipka.y1) * 2;
		if (Math.hypot(hx - o.x, hy - o.y) < R + 1) srazka.push(`${c.x},${c.y}→${o.x},${o.y}`);
	}
	ok(!srazka.length, `žádná šipka nenaráží do jiného nositele (${srazka.join('; ') || 'ok'})`);
	ok(n.every((c) => c.r === R && c.tx === c.x && c.ty === c.y + 7), `kroužky mají poloměr ${R} a znak sedí uprostřed`);
	ok(e.every((c) => c.znak === '−' && c.barva === '#ffffff') && d.every((c) => c.znak === '+' && c.barva === '#1b6b2d'), 'elektron nese bílé „−", díra zelené „+" jako na obrázcích');
	const vse = n.map((c) => [c.x, c.y]);
	ok(vse.every(([x, y], i) => vse.every(([a, b], j) => i === j || Math.abs(a - x) >= 2 * R + 4 || Math.abs(b - y) >= 2 * R + 4)), 'nositelé se nepřekrývají');
}

console.log('— texty a čísla —');
ok(el('dioda-plaketa').textContent === 'Propustný směr: proud prochází,' && el('dioda-plaketa2').textContent === 'hradlová vrstva se zužuje.',
	`plaketa: ${JSON.stringify(el('dioda-plaketa').textContent + ' ' + el('dioda-plaketa2').textContent)}`);
ok(/Elektrony ze zdroje proudí do typu N a přes typ P dále až ke kladné svorce/.test(el('dioda-stav').textContent) && /díry se posunují opačným směrem/.test(el('dioda-stav').textContent),
	'popis propustného směru cituje výklad (elektrony do N a přes P ke +, díry opačně)');
ok(/LED svítí/.test(el('dioda-stav').textContent), 'popis říká, že LED svítí');
ok(el('dioda-stav').textContent.includes('Proud prochází (od + přes typ P a typ N k −, jako šipka ve značce diody)'),
	'popis uvádí dohodnutý směr proudu od + přes P a N k − (jako šipka ve značce diody)');
const bezKomentaru = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/\/\/[^\n]*/g, '');
const texty = [SP.plaketa, SP.plaketa2, SP.popis, SP.popisSceny, SZ.plaketa, SZ.plaketa2, SZ.popis, SZ.popisSceny, ...[...scena.matchAll(/>([^<>]+)</g)].map((m) => m[1])].join(' ');
ok(!/\d/.test(texty), `ve scéně ani v popisech není žádné číslo: ${JSON.stringify((texty.match(/.{0,20}\d.{0,20}/) || [''])[0])}`);
ok(!/\bmA\b|Ω|[Pp]ráh|PRAH|[Rr]ezistor|[Cc]harakteristik|zmizel|type="range"/.test(bezKomentaru), 'žádný práh, rezistor, mA, charakteristika, posuvník ani „zmizela"');
ok(!/[Nn]osič/.test(bezKomentaru) && /nositele náboje/.test(scena), 'terminologie jako výklad: „nositelé náboje", ne „nosiče"');
{
	const uvod = zdroj.match(/<h2>[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/)[1];
	ok(/propustném směru[\s\S]*zužuje[\s\S]*prochází[\s\S]*závěrném směru[\s\S]*rozšiřuje[\s\S]*neprochází/.test(uvod),
		'úvodní text souhlasí s chováním (propustný: zužuje, prochází; závěrný: rozšiřuje, neprochází)');
	ok(/typ N na −, typ P na \+/.test(uvod) && /typ N na \+, typ P na −/.test(uvod), 'úvod říká, kam se který typ zapojí');
	const tlacitka = [...zdroj.matchAll(/<button[^>]*>([^<]*)<\/button>/g)].map((m) => m[1]).join(' ');
	ok(!/\d/.test(uvod + tlacitka), `ani úvod, ani tlačítka neuvádějí číslo (práh, napětí): ${JSON.stringify(((uvod + tlacitka).match(/.{0,20}\d.{0,20}/) || [''])[0])}`);
}

console.log('— legenda a barvy jako obrázky stránky —');
ok(scena.includes(`<rect x="${N_OD}" y="${HORNI}" width="146" height="108" fill="#ffe3e3" stroke="#c2255c"`), 'typ N je růžový jako v obr-02/05/06');
ok(scena.includes(`<rect x="${STYK}" y="${HORNI}" width="146" height="108" fill="#f3e6c8" stroke="#8a6d3b"`), 'typ P je béžový jako v obr-04/05/06');
ok(/id="dioda-zona"[^>]*fill="#e9ecef" stroke="#868e96"/.test(scena), 'hradlová vrstva je šedá jako na obrázcích');
ok(scena.includes(`r="${R}" ${ZNACKA_E} />`) && />elektron<\/text>/.test(scena), 'legenda: elektron = modrý kroužek');
ok(scena.includes(`r="${R}" ${ZNACKA_D} />`) && />díra<\/text>/.test(scena), 'legenda: díra = zelený čárkovaný kroužek');
ok(/>pohyb nositele náboje<\/text>/.test(scena) && /směr proudu \(od \+ k −\)/.test(scena), 'legenda rozlišuje pohyb nositele a dohodnutý směr proudu');
{
	// popisek „zvětšená LED dioda": leží nad horním vodičem a vlevo od zdroje
	const m = scena.match(/<text x="(\d+)" y="(\d+)" font-size="(\d+)"[^>]*>zvětšená LED dioda<\/text>/);
	ok(!!m, 'scéna má popisek „zvětšená LED dioda"');
	const [x, y, f] = m.slice(1).map(Number);
	const dole = y + 5, sirka = 18 * f * 0.5; // 18 znaků, průměrná šířka znaku ~0,5 em
	ok(dole < 40, `popisek je nad zdrojem i nad horním vodičem (spodek ${dole} < 40)`);
	ok(x >= 0 && x + sirka <= 360, `popisek se vejde do šířky scény (x ${x}…${Math.round(x + sirka)})`);
	ok(nosice().every((c) => c.y - R > dole), 'popisek neleží přes žádného nositele');
}

console.log('— mobil (telefon 360 px → scéna ~235 px) a kontrast —');
{
	const sirka = Number(scena.match(/viewBox="0 0 (\d+) \d+"/)[1]);
	const vse = scena + el('dioda-castice').innerHTML;
	const velikosti = [...vse.matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1]));
	const nejmensi = Math.min(...velikosti);
	ok(velikosti.length >= 15 && nejmensi * 235 / sirka >= 12,
		`nejmenší písmo ${nejmensi} ve scéně široké ${sirka} → na telefonu ${(nejmensi * 235 / sirka).toFixed(1)} px ≥ 12 px (${velikosti.length} textů)`);
	ok(/#dioda-svg \{[^}]*max-width: 460px/.test(zdroj), 'na počítači je úzká scéna omezená na 460 px, ať písmo nepřeroste');
	const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
	const L = (hex) => { const h = hex.slice(1); const [r, g2, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g2 + 0.0722 * b; };
	const kontrast = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
	// texty mimo kroužky stojí na pozadí scény nebo na bílé plaketě
	const spatne = [];
	for (const m of scena.matchAll(/<text [^>]*fill="(#\w+)"[^>]*>([^<]*)</g)) {
		if (m[2] === '−' && m[1] === '#ffffff') continue; // znak v kroužku legendy — měří se níž proti kroužku
		for (const p of ['#f8f9fa', '#ffffff']) if (kontrast(m[1], p) < 4.5) spatne.push(`„${m[2]}" ${m[1]} na ${p} ${kontrast(m[1], p).toFixed(2)}`);
	}
	ok(!spatne.length, `popisky mají kontrast ≥ 4,5 : 1 (${spatne.join('; ') || 'vše v pořádku'})`);
	const kruhy = [];
	let zmereno = 0;
	for (const m of vse.matchAll(/<circle[^>]*fill="(#\w+)"[^>]*\/>\s*<text[^>]*fill="(#\w+)"/g)) { zmereno++; if (kontrast(m[1], m[2]) < 4.5) kruhy.push(`${m[2]} na ${m[1]} ${kontrast(m[1], m[2]).toFixed(2)}`); }
	ok(zmereno === 2 + 14 && !kruhy.length, `znaky v kroužcích (${zmereno} změřeno: legenda + nositelé) mají kontrast ≥ 4,5 : 1 (${kruhy.join('; ') || 'vše v pořádku'})`);
}

console.log('— přepnutí na závěrný směr —');
klik(TL_Z);
ok(aktivni(TL_Z) && neaktivni(TL_P), 'zvolené je tlačítko závěrného směru (třída i aria-pressed)');
ok(at('dioda-zona', 'width') === '140' && at('dioda-zona', 'x') === '110', `hradlová vrstva se rozšířila (x ${at('dioda-zona', 'x')}, šířka ${at('dioda-zona', 'width')})`);
ok(at('dioda-paprsky', 'opacity') === '0', 'LED nesvítí');
ok(at('dioda-proud-vodice', 'opacity') === '0' && at('dioda-proud-prechod', 'opacity') === '0', 'šipky proudu zmizely — proud neprochází');
ok(/závěrném směru/.test(at('dioda-svg', 'aria-label')) && /proud neprochází/.test(at('dioda-svg', 'aria-label')) && !/šipk/.test(at('dioda-svg', 'aria-label')),
	`aria-label scény popisuje závěrný směr a netvrdí šipky: ${JSON.stringify(at('dioda-svg', 'aria-label'))}`);
ok(at('dioda-bat-dlouha', 'x1') === '168' && at('dioda-bat-kratka', 'x1') === '192', 'zdroj se otočil: + je u typu N, − u typu P');
ok(at('dioda-bat-dlouha', 'x2') === '168' && at('dioda-bat-kratka', 'x2') === '192', 'obě čárky zdroje jsou svislé i po otočení');
ok(at('dioda-bat-plus', 'x') === '148' && at('dioda-bat-minus', 'x') === '212', 'znaky + a − se přesunuly se zdrojem');
{
	const n = nosice();
	const e = n.filter((c) => c.druh === 'e'), d = n.filter((c) => c.druh === 'd');
	ok(e.length === 6 && d.length === 6, `6 elektronů a 6 děr (je ${e.length} a ${d.length})`);
	ok(n.every((c) => !c.sipka), 'nositelé stojí — žádná šipka pohybu');
	ok(e.every((c) => c.x <= 84 && vBloku(c)), `elektrony jsou u okraje typu N (x ${e.map((c) => c.x).join(', ')})`);
	ok(d.every((c) => c.x >= 276 && vBloku(c)), `díry jsou u okraje typu P (x ${d.map((c) => c.x).join(', ')})`);
	ok(n.every((c) => c.x + R < 110 || c.x - R > 250), 'v široké hradlové vrstvě žádný nositel není');
	ok(n.every((c) => c.x - R > N_OD + 2 && c.x + R < P_DO - 2), 'kroužky nesahají na obrys přechodu');
	ok(n.every((c) => c.ty === c.y + 7), 'znaky sedí v kroužcích');
}
ok(el('dioda-plaketa').textContent === 'Závěrný směr: proud neprochází,' && el('dioda-plaketa2').textContent === 'hradlová vrstva se rozšiřuje.',
	`plaketa: ${JSON.stringify(el('dioda-plaketa').textContent + ' ' + el('dioda-plaketa2').textContent)}`);
ok(/okraje polovodiče/.test(el('dioda-stav').textContent) && /neprochází/.test(el('dioda-stav').textContent) && /vypnutý spínač/.test(el('dioda-stav').textContent),
	'popis závěrného směru: nositelé na okrajích, proud neprochází, vypnutý spínač');

console.log('— návrat do propustného směru —');
klik(TL_P);
ok(aktivni(TL_P) && neaktivni(TL_Z), 'zvolené je zase tlačítko propustného směru');
ok(at('dioda-zona', 'width') === '16' && at('dioda-paprsky', 'opacity') === '1' && nosice().length === 14, 'scéna se vrátila do propustného směru');
ok(at('dioda-bat-dlouha', 'x1') === '192', 'zdroj je zase + u typu P');
ok(/propustném směru/.test(at('dioda-svg', 'aria-label')), 'aria-label je zase propustný');
ok(/id="dioda-stav" aria-live="polite"/.test(zdroj), 'popis stavu pod scénou má aria-live');

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);

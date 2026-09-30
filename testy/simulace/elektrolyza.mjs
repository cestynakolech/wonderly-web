#!/usr/bin/env node
// Ověření ElektrolyzaSimulace.astro (F9, vedení proudu v kapalinách): spustí
// SKUTEČNÝ skript komponenty v Node s náhradním DOM a proměří všechny
// kombinace režim × kapalina × vypínač.
//
// SMYSL scény podle výkladu (slug vedeni-proudu-v-kapalinach) a obr-02/05:
//   · obvod: baterie 4,5 V, elektrody, ampérmetr, vypínač, žárovka — 4,5 je jediné číslo,
//   · destilovaná (čistá) voda „není vodič“, ale „obsahuje nepatrné množství iontů
//     (H⁺, OH⁻)“, „ampérmetr by ukázal jen velmi malý proud“, žárovka nesvítí →
//     nikdy „nejsou v ní ionty“ ani nula; výchylka zřetelně nad nulou, ale menší než u soli,
//   · roztok soli (NaCl → Na⁺ + Cl⁻): Na⁺ ke katodě (−, vlevo), Cl⁻ k anodě (+), žárovka svítí,
//   · pomědění ve STEJNÉ orientaci jako obr-05: anoda Cu vlevo (+), železná lžička
//     (katoda) vpravo (−); Cu²⁺ doprava, SO₄²⁻ doleva; měď na celé ponořené části lžičky,
//     měděná anoda se rozpouští; šipka Cu²⁺ nesmí narazit do vrstvy mědi,
//   · proud se nevyčísluje: žádné A, Ω, I = U / R, zlato/Au.
// Barvy: kation #e03131, anion #7048e8 (legenda tématu), modrá nikdy pro anion.
// Mobil: skutečná šířka scény na telefonu 360 px je ~235 px → písmo ≥ 12 px;
// kontrast všech textů ≥ 4,5 : 1 (WCAG) proti pozadí, na kterém leží.
// Historie: T3d nálezy 1, 2; obrácené šipky; pokyn koordinátora (2 Ω, 0–12 V, Au⁺);
// kontrola simulací E1–E3 a J6 (mobil, kontrast).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const svgZdroj = zdroj.match(/<svg[\s\S]*?<\/svg>/)[0];

const prvky = new Map();
const novyPrvek = (id) => {
	const tridy = new Set();
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '', posluchaci: {},
		classList: {
			add: (t) => tridy.add(t), remove: (t) => tridy.delete(t), contains: (t) => tridy.has(t),
			toggle: (t, ano) => { const chci = ano === undefined ? !tridy.has(t) : ano; if (chci) tridy.add(t); else tridy.delete(t); return chci; },
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
const P = (id) => prvky.get(id);
const klik = (id) => (P(id)?.posluchaci.click || []).forEach((f) => f({ target: P(id), currentTarget: P(id) }));
const vid = (id) => P(id).atributy.visibility;
const svg = P('ely-svg');
const stav = svg.__stavElektrolyzy;
const ROTACE = (u) => `rotate(${u} 60 80)`;

// ionty tak, jak je skript skutečně nakreslil do #ely-ionty
const nakreslene = () => {
	const html = P('ely-ionty').innerHTML;
	const kruhy = [...html.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="(#\w+)"[^>]*\/><text[^>]*>([^<]+)<\/text>/g)]
		.map((m) => ({ x: +m[1], y: +m[2], r: +m[3], fill: m[4], text: m[5] }));
	const sipky = [...html.matchAll(/<polygon points="([^"]+)"/g)].map((m) => m[1].split(' ').map((b) => b.split(',').map(Number)));
	const molekuly = (html.match(/>H₂O</g) || []).length;
	return { html, kruhy, sipky, molekuly };
};
// ke každé šipce najdi nejbližší iont a vrať směr (hrot vlevo = −1, vpravo = +1)
const smerySipek = () => {
	const { kruhy, sipky } = nakreslene();
	return sipky.map((s) => {
		const hrot = s[0], zaklad = s[1];
		const iont = kruhy.reduce((a, k) => (Math.hypot(k.x - zaklad[0], k.y - zaklad[1]) < Math.hypot(a.x - zaklad[0], a.y - zaklad[1]) ? k : a));
		return { iont, smer: Math.sign(hrot[0] - zaklad[0]), hrot };
	});
};
// tvar a poloha každé šipky: základna těsně za okrajem kroužku (r + 4), hrot o 16 dál (r + 20),
// souměrná ±7 kolem středu iontu, na straně pohybu — nesmí ležet přes kroužek ani mimo něj
const geometrieSipek = (popis) => {
	const vady = [];
	for (const { iont, smer, hrot } of smerySipek()) {
		const s = nakreslene().sipky.find((p) => p[0][0] === hrot[0] && p[0][1] === hrot[1]);
		const [, b1, b2] = s;
		const dobre = hrot[1] === iont.y && b1[0] === b2[0] && b1[1] === iont.y - 7 && b2[1] === iont.y + 7
			&& b1[0] - iont.x === smer * (iont.r + 4) && hrot[0] - iont.x === smer * (iont.r + 20);
		if (!dobre) vady.push(`${iont.text}@${iont.x}: ${s.map((b) => b.join(',')).join(' ')}`);
	}
	ok(!vady.length, `${popis}: každá šipka leží těsně za svým iontem ve směru pohybu (${vady.join('; ') || 'vše v pořádku'})`);
};
const texty = [];
const zapamatuj = () => texty.push(P('ely-proud').textContent, P('ely-vzorec').innerHTML, P('ely-stav').textContent, P('ely-spinac').textContent,
	P('ely-ionty').innerHTML, ...['ely-pop-l', 'ely-pop-p', 'ely-pop-l2', 'ely-pop-p2', 'ely-znak-l', 'ely-znak-p'].map((id) => P(id).textContent));
const generovane = []; // všechny varianty innerHTML iontů (kvůli písmu a kontrastu)
const zapamatujHtml = () => generovane.push({ html: P('ely-ionty').innerHTML, voda: P('ely-voda').atributy.fill });

console.log('— výchozí stav (klid): čistá voda, obvod rozpojený —');
ok(P('ely-proud').textContent === 'proud neprochází', `rozpojeno: „proud neprochází“ (je „${P('ely-proud').textContent}“)`);
ok(P('ely-rucicka').atributy.transform === ROTACE(-60), `ručička na nule −60° (${P('ely-rucicka').atributy.transform})`);
ok(P('ely-packa').atributy.x2 === '218' && P('ely-packa').atributy.y2 === '18', 'páčka vypínače zvednutá (rozpojeno)');
ok(P('ely-spinac').textContent === '🔌 sepni obvod', 'tlačítko nabízí sepnout');
{
	const n = nakreslene();
	ok(n.molekuly >= 4 && n.kruhy.length === 2 && n.kruhy.map((k) => k.text).join() === 'H⁺,OH⁻', `čistá voda: ${n.molekuly} molekul H₂O a jen H⁺ a OH⁻`);
	ok(n.sipky.length === 0, 'rozpojeno: ionty neputují (žádné šipky)');
}
ok(vid('ely-paprsky') === 'hidden' && P('ely-vzorec').innerHTML === 'Obvod je rozpojený — proud <strong>neprochází</strong>.', 'rozpojeno: žárovka nesvítí, vysvětlení');
ok(P('ely-pop-l').textContent === 'KATODA (−)' && P('ely-pop-p').textContent === 'ANODA (+)', 'v pokusu katoda vlevo, anoda vpravo');
ok(P('ely-znak-l').textContent === '−' && P('ely-deska-l').atributy['stroke-width'] === '8', 'záporný pól baterie (tlustá deska) je u katody vlevo');
zapamatuj(); zapamatujHtml();

console.log('— destilovaná voda sepnutá: velmi malý proud, zřetelně nad nulou —');
klik('ely-spinac');
{
	const s = stav('pokus', 'destilovana', true);
	const sul = stav('pokus', 'roztok', true), nic = stav('pokus', 'destilovana', false);
	ok(s.proud === 'velmiMaly' && s.sviti === false, `čistá funkce: proud velmi malý, nesvítí (${s.proud})`);
	ok(s.rucicka - nic.rucicka >= 25 && sul.rucicka - s.rucicka >= 25, `výchylka zřetelně nad nulou a zřetelně pod solí (${nic.rucicka} → ${s.rucicka} → ${sul.rucicka})`);
	ok(P('ely-proud').textContent === 'proud velmi malý' && P('ely-rucicka').atributy.transform === ROTACE(s.rucicka), 'štítek „proud velmi malý“ a ručička podle stavu');
	ok(P('ely-packa').atributy.x2 === '222' && P('ely-packa').atributy.y2 === '36', 'páčka na kontaktu (sepnuto)');
	ok(vid('ely-paprsky') === 'hidden' && P('ely-vlakno').atributy.opacity === '0.06', 'žárovka nesvítí');
	const sm = smerySipek();
	ok(sm.length === 2 && sm.every(({ iont, smer }) => (iont.text === 'H⁺' ? smer === -1 : smer === 1)), 'H⁺ míří ke katodě (vlevo), OH⁻ k anodě');
	const st = P('ely-stav').textContent;
	ok(/nepatrné množství iontů \(H⁺ a OH⁻\)/.test(st) && /velmi malý proud/.test(st) && /žárovka nesvítí/.test(st) && /není vodič/.test(st), 'hláška podle výkladu');
	ok(/velmi malý proud/.test(P('ely-vzorec').innerHTML), 'vysvětlení: ampérmetr ukáže velmi malý proud');
	geometrieSipek('čistá voda');
	zapamatuj(); zapamatujHtml();
}

console.log('— roztok soli: proud prochází, Na⁺ ke katodě vlevo, Cl⁻ k anodě —');
klik('ely-k-roztok');
{
	ok(P('ely-proud').textContent === 'proud prochází' && P('ely-rucicka').atributy.transform === ROTACE(stav('pokus', 'roztok', true).rucicka), 'štítek „proud prochází“, ručička podle stavu');
	ok(vid('ely-paprsky') === 'visible' && P('ely-vlakno').atributy.opacity === '1', 'žárovka svítí');
	const n = nakreslene();
	ok(n.molekuly === 0 && n.kruhy.filter((k) => k.text === 'Na⁺').length === 3 && n.kruhy.filter((k) => k.text === 'Cl⁻').length === 3, 'v roztoku 3 Na⁺ a 3 Cl⁻');
	const sm = smerySipek();
	ok(sm.length === 6 && sm.every(({ iont, smer }) => (iont.text === 'Na⁺' ? smer === -1 : smer === 1)), 'šipky: Na⁺ doleva ke katodě, Cl⁻ doprava k anodě');
	ok(P('ely-voda').atributy.fill === '#d0ebff' && P('ely-el-l').atributy.fill === '#868e96' && vid('ely-lzicka') === 'hidden' && vid('ely-el-p') === 'visible', 'roztok namodralý, obyčejné elektrody, bez lžičky');
	ok(/NaCl → Na⁺ \+ Cl⁻/.test(P('ely-vzorec').innerHTML) && /žárovka svítí/.test(P('ely-stav').textContent), 'vysvětlení disociace a svitu');
	ok(P('ely-k-roztok').classList.contains('ely-aktivni') && !P('ely-k-destilovana').classList.contains('ely-aktivni'), 'aktivní tlačítko roztoku');
	geometrieSipek('roztok soli');
	zapamatuj(); zapamatujHtml();
	klik('ely-spinac');
	ok(P('ely-proud').textContent === 'proud neprochází' && vid('ely-paprsky') === 'hidden' && nakreslene().sipky.length === 0 && nakreslene().kruhy.length === 6,
		'roztok rozpojený: ionty jsou, ale neputují, proud neprochází');
	ok(/Sepni obvod/.test(P('ely-stav').textContent), 'rozpojený roztok vyzývá sepnout');
	zapamatuj();
}
klik('ely-k-destilovana');
ok(P('ely-voda').atributy.fill === '#f1f8ff' && P('ely-k-destilovana').classList.contains('ely-aktivni'), 'zpět na destilovanou: čirá voda, aktivní tlačítko');

console.log('— pomědění jako obr-05: anoda Cu vlevo, železná lžička (katoda) vpravo —');
klik('ely-r-pomedeni');
ok(P('ely-kapaliny').style.display === 'none' && vid('ely-lzicka') === 'visible' && vid('ely-el-p') === 'hidden', 'pomědění: bez volby kapaliny, vpravo lžička místo elektrody');
ok(P('ely-pop-l').textContent === 'ANODA (+)' && P('ely-pop-p').textContent === 'KATODA (−)' && P('ely-pop-l2').textContent === 'měď (Cu)', 'popisky: anoda (měď) vlevo, katoda vpravo');
ok(P('ely-znak-l').textContent === '+' && P('ely-znak-p').textContent === '−' && P('ely-deska-p').atributy['stroke-width'] === '8' && P('ely-deska-l').atributy['stroke-width'] === '4',
	'baterie otočená: kladný pól k anodě vlevo, záporná tlustá deska ke katodě vpravo');
ok(vid('ely-vrstva') === 'hidden' && P('ely-el-l').atributy.width === '16' && P('ely-el-l').atributy.fill === '#c2703d' && P('ely-pop-p2').textContent === 'lžička (Fe)', 'rozpojeno: bez vrstvy mědi, měděná anoda celá');
zapamatuj(); zapamatujHtml();
klik('ely-spinac');
{
	const s = stav('pomedeni', 'destilovana', true);
	ok(s.proud === 'prochazi' && s.vrstva && s.anodaUbyva && !s.katodaVlevo, 'čistá funkce: roztok CuSO₄ vede, vrstva roste, anoda ubývá, katoda vpravo');
	ok(vid('ely-vrstva') === 'visible' && P('ely-pop-p2').textContent === 'lžička + měď', 'sepnuto: vrstva mědi na lžičce');
	ok(P('ely-el-l').atributy.width === '10' && P('ely-el-l').atributy.x === '55', 'měděná anoda se ztenčila (rozpouští se), zůstává vystředěná');
	const n = nakreslene();
	ok(n.kruhy.filter((k) => k.text === 'Cu²⁺').length === 3 && n.kruhy.filter((k) => k.text === 'SO₄²⁻').length === 3, '3 Cu²⁺ a 3 SO₄²⁻');
	const sm = smerySipek();
	ok(sm.length === 6 && sm.every(({ iont, smer }) => (iont.text === 'Cu²⁺' ? smer === 1 : smer === -1)), 'šipky: Cu²⁺ doprava ke lžičce, SO₄²⁻ doleva k anodě');
	// měď na celé ponořené části lžičky: od hladiny (y 150) až pod misku
	const vrstva = svgZdroj.match(/<g id="ely-vrstva"[^>]*>([\s\S]*?)<\/g>/)[1];
	const obd = (vrstva.match(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/) || [0, 999, 999, 0, 0]).slice(1).map(Number);
	ok(obd[2] > 0, 'vrstva mědi má i část kolem ponořené rukojeti (obdélník)');
	const el = vrstva.match(/<ellipse cx="(\d+)" cy="(\d+)" rx="(\d+)" ry="(\d+)"/).slice(1).map(Number);
	const hladina = Number(svgZdroj.match(/<rect id="ely-voda" x="\d+" y="(\d+)"/)[1]);
	const rukojet = svgZdroj.match(/<rect x="(\d+)" y="118" width="(\d+)" height="(\d+)" rx="4" fill="#ced4da"/).slice(1).map(Number);
	ok(obd[1] <= hladina && obd[0] < rukojet[0] && obd[0] + obd[2] > rukojet[0] + rukojet[1] && obd[1] + obd[3] >= el[1] - el[3],
		`měď pokrývá ponořenou rukojeť od hladiny ${hladina} až k misce (vrstva ${obd[1]}–${obd[1] + obd[3]}, rukojeť šíře ${rukojet[1]})`);
	// žádná šipka Cu²⁺ nesmí narazit do vrstvy mědi (levý okraj = min(obdélník, elipsa))
	const levyOkraj = Math.min(obd[0], el[0] - el[2]);
	const hroty = sm.filter(({ iont }) => iont.text === 'Cu²⁺').map(({ hrot }) => hrot[0]);
	ok(hroty.every((x) => x <= levyOkraj - 8), `hroty šipek Cu²⁺ (${hroty.join(', ')}) končí aspoň 8 před vrstvou mědi (${levyOkraj})`);
	ok(/vylučuje na katodě/.test(P('ely-vzorec').innerHTML) && /POMĚDĚNÍ/.test(P('ely-stav').textContent) && /rozpouští/.test(P('ely-stav').textContent), 'vysvětlení pomědění podle výkladu');
	ok(P('ely-r-pomedeni').classList.contains('ely-aktivni') && !P('ely-r-pokus').classList.contains('ely-aktivni'), 'aktivní tlačítko pomědění');
	geometrieSipek('pomědění');
	zapamatuj(); zapamatujHtml();
}
klik('ely-r-pokus');
ok(P('ely-kapaliny').style.display === '' && vid('ely-lzicka') === 'hidden' && P('ely-el-l').atributy.fill === '#868e96' && P('ely-pop-l').textContent === 'KATODA (−)', 'zpět v pokusu: katoda vlevo, bez lžičky');

console.log('— simulace netvrdí nic navíc (čísla a látky jen z výkladu) —');
{
	const bezKomentaru = zdroj.replace(/^---[\s\S]*?---/, '').replace(/\/\/[^\n]*/g, '').replace(/<!--[\s\S]*?-->/g, '');
	ok(!/nejsou v ní ionty|nejsou ionty|žádné ionty|proud NEVEDE/i.test(bezKomentaru), 'nikde netvrdí, že v čisté vodě nejsou ionty');
	ok(!/Ω|\bI = |U \/ R|Au⁺|zlat|type="range"/.test(bezKomentaru), 'žádný odpor v Ω, I = U / R, zlato ani posuvník napětí');
	const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style>[\s\S]*?<\/style>/, '').replace(/^---[\s\S]*?---/, '').replace(/<!--[\s\S]*?-->/g, '');
	const viditelne = html.replace(/<[^>]+>/g, ' ') + ' ' + texty.join(' ').replace(/<[^>]+>/g, ' ');
	const cisla = [...new Set(viditelne.match(/\d+(,\d+)?/g) || [])].sort();
	ok(cisla.length === 1 && cisla[0] === '4,5', `jediné viditelné číslo je baterie 4,5 V z výkladu (${cisla.join(', ')})`);
	const ionty = [...new Set(viditelne.match(/(?:[A-Z][a-z]?[₀-₉]*)+[²]?[⁺⁻]/g) || [])].sort();
	const POVOLENE = ['Cl⁻', 'Cu²⁺', 'H⁺', 'Na⁺', 'OH⁻', 'SO₄²⁻'];
	ok(ionty.every((i) => POVOLENE.includes(i)) && ionty.length === 6, `ionty jen z výkladu (${ionty.join(', ')})`);
}

console.log('— barvy iontů podle legendy, ionty se nepřekrývají —');
for (const { html } of generovane) {
	const kruhy = [...html.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" fill="(#\w+)"[^>]*\/><text[^>]*>([^<]+)</g)].map((m) => ({ x: +m[1], y: +m[2], r: +m[3], fill: m[4], text: m[5] }));
	const KAT = ['Na⁺', 'Cu²⁺', 'H⁺'];
	ok(kruhy.every((k) => (KAT.includes(k.text) ? k.fill === '#e03131' : k.fill === '#7048e8')) && kruhy.every((k) => k.r >= 24),
		`${kruhy.map((k) => k.text).join(' ')}: kationty #e03131, anionty #7048e8, kroužky r ≥ 24`);
	let nejmensi = Infinity;
	for (let i = 0; i < kruhy.length; i++) for (let j = i + 1; j < kruhy.length; j++) nejmensi = Math.min(nejmensi, Math.hypot(kruhy[i].x - kruhy[j].x, kruhy[i].y - kruhy[j].y) - kruhy[i].r - kruhy[j].r);
	ok(kruhy.length < 2 || nejmensi >= 4, `ionty se nepřekrývají (nejmenší mezera ${nejmensi === Infinity ? '—' : nejmensi.toFixed(1)})`);
	ok(kruhy.every((k) => k.x - k.r > 68 && k.x + k.r < 289 && k.y - k.r >= 150 && k.y + k.r <= 328), 'ionty leží v kapalině mezi elektrodami');
}
ok(!/#74c0fc/.test(zdroj), 'světle modrá #74c0fc (stará barva aniontu) v komponentě není');

console.log('— mobil: písmo ≥ 12 px při šířce scény 235 px, kontrast ≥ 4,5 : 1 —');
{
	const sirka = Number(svgZdroj.match(/viewBox="0 0 (\d+) \d+"/)[1]);
	const vse = svgZdroj + generovane.map((x) => x.html).join('');
	const velikosti = [...vse.matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1]));
	const nejmensi = Math.min(...velikosti);
	ok(nejmensi * 235 / sirka >= 12, `nejmenší písmo ${nejmensi} ve scéně široké ${sirka} → na telefonu ${(nejmensi * 235 / sirka).toFixed(1)} px ≥ 12 px`);
	const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
	const L = (hex) => { let h = hex.slice(1); if (h.length === 3) h = [...h].map((x) => x + x).join(''); const [r, g2, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g2 + 0.0722 * b; };
	const kontrast = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
	const pozadi = '#f8f9fa';
	// texty nad kapalinou (y 150–328) musí obstát i proti nejtmavší kapalině
	const kapaliny = ['#f1f8ff', '#d0ebff', '#a5d8ff'];
	const statickeTexty = [...svgZdroj.matchAll(/<text [^>]*y="(\d+)"[^>]*fill="(#\w+)"/g)].map((m) => ({ y: +m[1], fill: m[2] }));
	const dynamicke = ['ely-znak-l', 'ely-znak-p', 'ely-pop-l', 'ely-pop-p'].map((id) => P(id).atributy.fill).filter(Boolean).map((fill) => ({ y: 356, fill }));
	const spatne = [];
	for (const t of [...statickeTexty, ...dynamicke]) {
		const proti = t.y > 150 && t.y < 328 ? [pozadi, ...kapaliny] : [pozadi];
		for (const p of proti) if (kontrast(t.fill, p) < 4.5) spatne.push(`${t.fill} na ${p} ${kontrast(t.fill, p).toFixed(2)}`);
	}
	ok(!spatne.length, `statické popisky mají kontrast ≥ 4,5 (${spatne.join('; ') || 'vše v pořádku'})`);
	const spatneIonty = [];
	for (const { html, voda } of generovane) {
		for (const m of html.matchAll(/<circle[^>]*fill="(#\w+)"[^>]*\/><text[^>]*fill="(#\w+)"/g)) if (kontrast(m[1], m[2]) < 4.5) spatneIonty.push(`${m[2]} na ${m[1]} ${kontrast(m[1], m[2]).toFixed(2)}`);
		for (const m of html.matchAll(/<text[^>]*fill="(#\w+)">H₂O/g)) if (kontrast(m[1], voda) < 4.5) spatneIonty.push(`H₂O ${m[1]} na ${voda}`);
	}
	ok(!spatneIonty.length && generovane.length >= 4, `popisky iontů a molekul mají kontrast ≥ 4,5 (${[...new Set(spatneIonty)].join('; ') || 'vše v pořádku'})`);
}

console.log('— obvod: ampérmetr a vypínač přerušují drát —');
ok(/<circle cx="60" cy="72" r="18"/.test(svgZdroj) && /M60 118 L60 90 M60 54 L60 36/.test(svgZdroj), 'ampérmetr (72 ± 18) je zapojený v levém drátu mezi katodou a baterií');
ok(/M152 36 L190 36 M222 36 L246 36/.test(svgZdroj), 'vypínač (190–222) a žárovka (od 246) přerušují horní drát');

console.log('— přístupnost —');
ok(/id="ely-stav" aria-live="polite"/.test(zdroj), 'věta o stavu má aria-live="polite"');

console.log(chyby ? `\n❌ ${chyby} kontrol neprošlo` : '\n✅ vše v pořádku');
process.exit(chyby ? 1 : 0);

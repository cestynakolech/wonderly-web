#!/usr/bin/env node
// Ověření PolovodicSimulace.astro (dopování polovodiče, F9): spustí SKUTEČNÝ
// skript komponenty v Node s náhradním DOM a proměří, co scéna žákovi tvrdí.
//
// SMYSL scény (podle PDF učitele „14. Polovodiče typu N a P, dioda", str. 1:
// „Lepší vodivost polovodičů získáme přidáním příměsi… Stačí velmi malé
// množství."):
//   · čistý křemík nevede — žádný volný nositel náboje, žárovka zhasnutá,
//   · typ N kreslí JEN elektrony, typ P JEN díry,
//   · oba dopované vedou, tedy žárovka u obou svítí stejně (o síle vedení
//     zdroj nic neříká). O POČTU nositelů scéna netvrdí nic — počet závisí na
//     dávce příměsi a výklad ani PDF ho nemají, proto to nehlídá ani test.
//   · žádné odstupňování podle množství příměsi (to zdroj netvrdí) a žádné
//     číslo proudu ani koncentrace (výklad je nemá).
// Dřívější verze scény měla posuvník 1–5 atomů příměsi a učila „čím víc
// příměsi, tím líp vede" — v podkladech to nikde nestojí. Test proto hlídá,
// že se gradace nevrátí (žádný text o „čím víc… tím líp", žádná číslice
// v popiscích scény).
// 30. 9. 2026 (kontroly T3e a simulací): legenda a barvy jako obrázky stránky,
// „nositelé náboje" jako výklad, zdroj zapojený tak, že elektrony jdou k +,
// mobil (písmo ≥ 12 px při šířce scény 235 px), kontrast ≥ 4,5 : 1, aria.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '',
		posluchaci: {},
		// classList je tu SKUTEČNÝ (ne no-op): podle něj se pozná, které tlačítko
		// scény je zvýrazněné jako zvolené — to žák na stránce vidí.
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
const document = {
	getElementById: (id) => prvky.get(id) || novyPrvek(id),
	querySelectorAll: () => [],
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('pold-svg');
const vzorek = prvky.get('pold-vzorek');
const vzorekText = prvky.get('pold-vzorek-text');
const paprsky = prvky.get('pold-paprsky');
const zarovka = prvky.get('pold-zarovka');
const zare = prvky.get('pold-zare');
const stavText = prvky.get('pold-stav-text');
const nosiceText = prvky.get('pold-nosice-text');
const vodivostText = prvky.get('pold-vodivost-text');
const castice = prvky.get('pold-castice');
const popis = prvky.get('pold-popis');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());
// Legenda nositelů = obrázky téže stránky (obr-02/04/05/06): elektron modrý
// kroužek „−", díra bílý kroužek se zeleným čárkovaným obrysem a zeleným „+".
const ZNACKA_ELEKTRONU = 'fill="#1864ab" stroke="#0b4f8a" stroke-width="2"';
const ZNACKA_DIRY = 'fill="#ffffff" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2"';
const pocet = (html, co) => html.split(co).length - 1;
// barvy typů jako na obrázcích stránky: typ N růžový, typ P béžový
const BARVA_N = '#ffe3e3', OBRYS_N = '#c2255c', BARVA_P = '#f3e6c8', OBRYS_P = '#8a6d3b';
const TL = { 1: 'pold-tl-cisty', 2: 'pold-tl-n', 3: 'pold-tl-p' };
const jeAktivni = (id) => prvky.get(id).classList.contains('pold-aktivni') && prvky.get(id).getAttribute('aria-pressed') === 'true';
const jeNeaktivni = (id) => !prvky.get(id).classList.contains('pold-aktivni') && prvky.get(id).getAttribute('aria-pressed') === 'false';
const sviti = () => Number(paprsky.getAttribute('opacity')) > 0 && Number(zare.getAttribute('opacity')) > 0;

const stav = svg.__stavDopovani;
const poz = svg.__pozicePartice;
const svit = svg.__svitZarovky;
const plaketa = svg.__plaketaNosicu;
const scenaSvg = zdroj.match(/<svg id="pold-svg"[\s\S]*?<\/svg>/)[0];

// ČEKANÉ hodnoty jsou v testu zapsané natvrdo (ne odvozené z komponenty),
// aby test nemohl být tautologický.
const NOSICU = 3;
const R = 13;
const X_START = 64, X_KONEC = 296, STRED = 180;
const VYSKY = [178, 210, 242];
// vnitřek vzorku (rect 44…316 × 150…270, obrys 4) zmenšený o poloměr kroužku
const VNITREK = { x1: 46 + R, x2: 314 - R, y1: 152 + R, y2: 268 - R };
const CISTY = 1, TYP_N = 2, TYP_P = 3;
const nosicuVe = (scena) => stav(scena).elektrony + stav(scena).diry;

console.log('— SMYSL scény: čistý nevede, typ N nese elektrony, typ P díry —');
ok(nosicuVe(CISTY) === 0, `čistý křemík nemá ve scéně žádného volného nositele (je ${nosicuVe(CISTY)})`);
ok(stav(TYP_N).elektrony === NOSICU && stav(TYP_N).diry === 0,
	`typ N má jen elektrony (${stav(TYP_N).elektrony} elektronů, ${stav(TYP_N).diry} děr)`);
ok(stav(TYP_P).diry === NOSICU && stav(TYP_P).elektrony === 0,
	`typ P má jen díry (${stav(TYP_P).diry} děr, ${stav(TYP_P).elektrony} elektronů)`);
ok(nosicuVe(TYP_N) <= 5, `scéna kreslí jen pár nositelů, aby byli vidět — není to údaj o počtu (je jich ${nosicuVe(TYP_N)})`);

console.log('— žárovka: dva stavy, žádné odstupňování —');
ok(svit(0).paprsky === 0 && svit(0).zare === 0, `bez volných nositelů žárovka nesvítí (paprsky ${svit(0).paprsky}, záře ${svit(0).zare})`);
ok(svit(NOSICU).paprsky > 0 && svit(NOSICU).zare > 0, `s volnými nositeli žárovka svítí (paprsky ${svit(NOSICU).paprsky}, záře ${svit(NOSICU).zare})`);
ok(svit(NOSICU).banka !== svit(0).banka, `rozsvícená baňka má jinou barvu než zhasnutá (${svit(NOSICU).banka} vs. ${svit(0).banka})`);
ok(svit(NOSICU).paprsky <= 1 && svit(NOSICU).zare <= 1,
	`průhlednosti jsou platné (0–1): paprsky ${svit(NOSICU).paprsky}, záře ${svit(NOSICU).zare}`);
ok(svit(1).paprsky === svit(5).paprsky && svit(1).zare === svit(5).zare && svit(1).banka === svit(5).banka,
	`jas NEZÁVISÍ na počtu nositelů — jeden svítí stejně jako pět (${svit(1).paprsky}/${svit(5).paprsky})`);
ok(svit(0).banka !== svit(1).banka, `hranice je mezi „nic" a „něco": nula a jeden nositel vypadají různě (${svit(0).banka} vs. ${svit(1).banka})`);

console.log('— popisky: žádná čísla, žádná gradace, terminologie výkladu —');
const vsechnyTexty = [CISTY, TYP_N, TYP_P].map((s) => `${stav(s).nazev} ${stav(s).vzorek} ${stav(s).popis} ${stav(s).vodivost} ${plaketa(stav(s))}`).join(' ');
ok(!/\d/.test(vsechnyTexty), `ve scéně není žádné číslo (proudu, koncentrace ani počtu): ${JSON.stringify((vsechnyTexty.match(/.{0,25}\d.{0,25}/) || [''])[0])}`);
ok(!/čím víc|tím líp|tím lépe|víc atomů|počet atomů|více příměsi/i.test(vsechnyTexty), 'scéna netvrdí, že víc příměsi = lepší vedení — zdroj to neříká');
ok(!/[Nn]osič/.test(vsechnyTexty + scenaSvg.replace(/<!--[\s\S]*?-->/g, '')) && /Nositelé náboje/.test(plaketa(stav(TYP_N))),
	'terminologie jako výklad: „nositelé náboje", ne „nosiče"');
ok(/malé množství/.test(stav(TYP_N).popis) && /malé množství/.test(stav(TYP_P).popis), 'oba dopované stavy říkají, že příměsi stačí malé množství');
ok(/[Aa]rsen/.test(stav(TYP_N).popis) && /[Bb]or/.test(stav(TYP_P).popis), 'typ N zmiňuje arsen, typ P bor');
ok(/Proud nesou hlavně volné elektrony/.test(stav(TYP_N).popis) && /Proud nesou hlavně díry/.test(stav(TYP_P).popis), 'proud nesou „hlavně" elektrony / díry — jako výklad');
ok(/pólu \+/.test(stav(TYP_N).popis), `popis typu N říká, že elektron putuje k pólu + : ${JSON.stringify(stav(TYP_N).popis.slice(0, 80))}`);
ok(/pólu −/.test(stav(TYP_P).popis), `popis typu P říká, že díra se posouvá k pólu − : ${JSON.stringify(stav(TYP_P).popis.slice(0, 90))}`);
ok(/žárovka nesvítí/.test(stav(CISTY).popis) && /skoro neprochází/.test(stav(CISTY).popis) && /nositelů náboje/.test(stav(CISTY).popis),
	`čistý křemík je popsaný jako srovnání bez proudu: ${JSON.stringify(stav(CISTY).popis.slice(0, 70))}`);
ok(!/vlastní vodivost|teplem|pár elektron/.test(vsechnyTexty), 'scéna nemluví o vlastní vodivosti ani o páru z tepla — to je jiné podtéma');
ok(stav(TYP_N).vodivost === 'elektronová vodivost' && stav(TYP_P).vodivost === 'děrová vodivost' && stav(CISTY).vodivost === 'skoro nevede proud',
	'typ N = elektronová, typ P = děrová vodivost, čistý skoro nevede');
ok(stav(CISTY).nazev === 'Čistý křemík — bez příměsi' && stav(TYP_N).nazev === 'Typ N — příměs arsen' && stav(TYP_P).nazev === 'Typ P — příměs bor',
	`názvy stavů: ${[CISTY, TYP_N, TYP_P].map((s) => stav(s).nazev).join(' | ')}`);
ok(stav(CISTY).vzorek === 'čistý křemík (bez příměsi)' && stav(TYP_N).vzorek === 'křemík + arsen (typ N)' && stav(TYP_P).vzorek === 'křemík + bor (typ P)',
	`popisky vzorku: ${[CISTY, TYP_N, TYP_P].map((s) => stav(s).vzorek).join(' | ')}`);

console.log('— plaketa —');
ok(plaketa(stav(CISTY)) === 'Nositelé náboje: téměř žádní', `čistý: ${JSON.stringify(plaketa(stav(CISTY)))}`);
ok(plaketa(stav(TYP_N)) === 'Nositelé náboje: volné elektrony', `typ N: ${JSON.stringify(plaketa(stav(TYP_N)))}`);
ok(plaketa(stav(TYP_P)) === 'Nositelé náboje: díry', `typ P: ${JSON.stringify(plaketa(stav(TYP_P)))}`);
{
	// Text se musí do bílého rámečku VEJÍT. Comic Sans MS Bold (písmo, na které
	// prohlížeč u SVG spadne) má průměrně 0,496 em na znak (změřeno dřív na
	// „Volné nosiče náboje: volné elektrony → elektronová vodivost" = 403 px při
	// 14 px). Počítá se s rezervou 0,55 em na znak.
	const r = scenaSvg.match(/<rect x="(\d+)" y="8" width="(\d+)" height="(\d+)" rx="10"/);
	ok(!!r, 'plaketa je obdélník s pevnými rozměry ve zdroji');
	const [x, w, h] = r.slice(1).map(Number);
	const radky = [CISTY, TYP_N, TYP_P].flatMap((s) => [stav(s).nazev, plaketa(stav(s)), stav(s).vodivost]);
	const nejdelsi = Math.max(...radky.map((t) => t.length));
	ok(nejdelsi * 19 * 0.55 <= w - 4, `nejdelší řádek plakety (${nejdelsi} znaků ≈ ${Math.round(nejdelsi * 19 * 0.55)} px) se vejde do vnitřku ${w - 4} px`);
	ok(x + w / 2 === STRED && x >= 0 && x + w <= 360, `plaketa je souměrná kolem x = ${STRED} a vejde se do scény (${x}…${x + w})`);
	const ys = ['pold-stav-text', 'pold-nosice-text', 'pold-vodivost-text'].map((id) => Number(scenaSvg.match(new RegExp(`<text id="${id}" x="${STRED}" y="(\\d+)"`))?.[1]));
	ok(ys.every((y) => y > 8 + 19 && y < 8 + h) && ys[1] - ys[0] >= 24 && ys[2] - ys[1] >= 24, `tři řádky plakety leží uvnitř rámečku a nepřekrývají se (y ${ys.join(', ')})`);
}

console.log('— barvy vzorku odlišují tři stavy —');
ok(new Set([CISTY, TYP_N, TYP_P].map((s) => stav(s).barva)).size === 3,
	`tři stavy = tři různé barvy vzorku (${[CISTY, TYP_N, TYP_P].map((s) => stav(s).barva).join(', ')})`);

console.log('— zapojení zdroje: levá elektroda −, pravá + —');
{
	const cara = (id) => scenaSvg.match(new RegExp(`<line id="${id}" x1="(\\d+)" y1="(\\d+)" x2="(\\d+)" y2="(\\d+)"`)).slice(1).map(Number);
	const kr = cara('pold-bat-kratka'), dl = cara('pold-bat-dlouha');
	ok(dl[3] - dl[1] > kr[3] - kr[1], `dlouhá čárka (+) je delší než krátká (−) (${dl[3] - dl[1]} > ${kr[3] - kr[1]})`);
	ok(dl[0] > kr[0], `dlouhá čárka (+) je na pravé straně zdroje, krátká (−) na levé (x ${dl[0]} > ${kr[0]})`);
	ok(/M240 330 L344 330 L344 270/.test(scenaSvg) && dl[0] === 240, 'dlouhá čárka (+) je vodičem spojená s pravou elektrodou');
	ok(/M130 330 L226 330/.test(scenaSvg) && kr[0] === 226 && /M16 270 L16 330 L90 330/.test(scenaSvg), 'krátká čárka (−) vede přes žárovku k levé elektrodě');
	ok(/<text x="16" y="\d+" [^>]*>−<\/text>/.test(scenaSvg) && /<text x="344" y="\d+" [^>]*>\+<\/text>/.test(scenaSvg), 'nad levou elektrodou je −, nad pravou +');
}

console.log('— pohyb nositelů: elektron k +, díra k − —');
ok(poz(0, 0).xElektron === X_START && poz(0, 0).xDira === X_KONEC,
	`nositel startuje u svého okraje vzorku: elektron ${X_START}, díra ${X_KONEC} (je ${poz(0, 0).xElektron} a ${poz(0, 0).xDira})`);
ok(poz(1500, 0).xElektron === STRED && poz(1500, 0).xDira === STRED, `v polovině cesty jsou nositelé uprostřed vzorku (je ${poz(1500, 0).xElektron} a ${poz(1500, 0).xDira})`);
ok(poz(1500, 0).xElektron > poz(0, 0).xElektron, `elektron se posouvá doprava, k pólu + (${poz(0, 0).xElektron} → ${poz(1500, 0).xElektron})`);
ok(poz(1500, 0).xDira < poz(0, 0).xDira, `díra se posouvá doleva, k pólu − (${poz(0, 0).xDira} → ${poz(1500, 0).xDira})`);
ok(poz(3000, 0).xElektron === X_START, `po 3000 ms se nositel vrací na začátek dráhy (je ${poz(3000, 0).xElektron})`);
ok(poz(-1500, 0).xElektron === STRED, `záporný čas nerozbije fázi (je ${poz(-1500, 0).xElektron})`);
ok(poz(2999.9, 0).xElektron === X_KONEC && poz(2999.9, 0).xDira === X_START, `na konci dráhy dojedou nositelé až k protějšímu okraji (je ${poz(2999.9, 0).xElektron} a ${poz(2999.9, 0).xDira})`);
ok(poz(0, 1).xElektron === 219 && poz(0, 2).xElektron === 141,
	`nositelé jsou rozfázovaní po třetinách periody → x = 219 a 141 (je ${poz(0, 1).xElektron} a ${poz(0, 2).xElektron})`);
ok(poz(0, 1).xDira === 141 && poz(0, 2).xDira === 219, `díry jsou rozfázované zrcadlově (je ${poz(0, 1).xDira} a ${poz(0, 2).xDira})`);
{
	const casy = [0, 300, 700, 1234, 1500, 2100, 2999.9];
	const vsechnyX = [];
	for (const t of casy) for (let i = 0; i < NOSICU; i++) vsechnyX.push(poz(t, i).xElektron, poz(t, i).xDira);
	ok(vsechnyX.every((x) => x >= VNITREK.x1 && x <= VNITREK.x2), `nositelé nikdy nevyjedou ze vzorku (x ${Math.min(...vsechnyX)}…${Math.max(...vsechnyX)}, dovoleno ${VNITREK.x1}–${VNITREK.x2})`);
	ok(Math.min(...vsechnyX) < 90 && Math.max(...vsechnyX) > 270, 'nositelé projedou celou šířku vzorku, ne jen jeho polovinu');
	ok(vsechnyX.every((x) => Number.isInteger(x)), 'vodorovné polohy jsou celá čísla');
}
{
	const vsechnyY = [0, 1, 2].map((i) => poz(0, i).y);
	ok(JSON.stringify(vsechnyY) === JSON.stringify(VYSKY), `tři nositelé jsou rozložení po výšce vzorku: ${JSON.stringify(vsechnyY)} (čekáno ${JSON.stringify(VYSKY)})`);
	ok(vsechnyY.every((y) => y >= VNITREK.y1 && y <= VNITREK.y2), `žádný nositel nesahá na obrys vzorku (y ${Math.min(...vsechnyY)}…${Math.max(...vsechnyY)})`);
	ok(vsechnyY.every((y, i) => i === 0 || y - vsechnyY[i - 1] >= 2 * R + 4), 'kroužky nad sebou se nepřekrývají');
}

console.log('— výchozí stav: čistý křemík —');
ok(stavText.textContent === 'Čistý křemík — bez příměsi', `plaketa hlásí ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Nositelé náboje: téměř žádní' && vodivostText.textContent === 'skoro nevede proud', `plaketa: ${JSON.stringify(nosiceText.textContent + ' / ' + vodivostText.textContent)}`);
ok(castice.innerHTML === '', `v čistém křemíku se nekreslí žádný volný nositel: ${JSON.stringify(castice.innerHTML.slice(0, 60))}`);
ok(!sviti(), `čistý křemík: žárovka nesvítí (paprsky ${paprsky.getAttribute('opacity')}, záře ${zare.getAttribute('opacity')})`);
ok(zarovka.getAttribute('fill') === svit(0).banka, `čistý křemík: baňka je zhasnutá (je ${zarovka.getAttribute('fill')})`);
ok(vzorekText.textContent === 'čistý křemík (bez příměsi)', 'popiska vzorku hlásí čistý křemík bez příměsi');
ok(vzorek.getAttribute('fill') === '#e9ecef' && vzorek.getAttribute('stroke') === '#2b2a26', `čistý křemík je šedý s neutrálním obrysem (${vzorek.getAttribute('fill')} / ${vzorek.getAttribute('stroke')})`);
ok(jeAktivni(TL[CISTY]) && jeNeaktivni(TL[TYP_N]) && jeNeaktivni(TL[TYP_P]), 'zvolené je tlačítko čistého křemíku (třída i aria-pressed)');

console.log('— přepnutí na typ N —');
klik(TL[TYP_N]);
ok(stavText.textContent === 'Typ N — příměs arsen', `plaketa: ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Nositelé náboje: volné elektrony' && vodivostText.textContent === 'elektronová vodivost', `plaketa: ${JSON.stringify(nosiceText.textContent + ' / ' + vodivostText.textContent)}`);
ok(pocet(castice.innerHTML, ZNACKA_ELEKTRONU) === NOSICU && pocet(castice.innerHTML, ZNACKA_DIRY) === 0,
	`v typu N se kreslí jen elektrony (${pocet(castice.innerHTML, ZNACKA_ELEKTRONU)} elektronů, ${pocet(castice.innerHTML, ZNACKA_DIRY)} děr)`);
ok(pocet(castice.innerHTML, 'fill="#ffffff">−</text>') === NOSICU && !/e⁻|>d</.test(castice.innerHTML), 'každý elektron nese bílé „−" jako na obrázcích, žádné „e⁻" ani „d"');
ok(vzorek.getAttribute('fill') === BARVA_N && vzorek.getAttribute('stroke') === OBRYS_N,
	`typ N má barvu jako obrázky stránky (${vzorek.getAttribute('fill')} / ${vzorek.getAttribute('stroke')})`);
ok(sviti(), 'typ N vede proud → žárovka svítí');
ok(zarovka.getAttribute('fill') === svit(NOSICU).banka, `baňka svítí (je ${zarovka.getAttribute('fill')})`);
ok(vzorekText.textContent === 'křemík + arsen (typ N)', `popiska vzorku: ${JSON.stringify(vzorekText.textContent)}`);
ok(popis.textContent === stav(TYP_N).popis, 'popis pod scénou je popis typu N');
ok(castice.innerHTML.includes(`<circle cx="${X_START}" cy="${VYSKY[0]}" r="${R}" ${ZNACKA_ELEKTRONU} />`),
	`první elektron je modrý kroužek r = ${R} na startu (${X_START}, ${VYSKY[0]}): ${castice.innerHTML.slice(0, 90)}`);
ok(castice.innerHTML.includes(`<text x="${X_START}" y="${VYSKY[0] + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">−</text>`), 'bílé „−" sedí uvnitř kroužku elektronu (y o 7 níž než střed)');
ok(VYSKY.every((y) => castice.innerHTML.includes(`cy="${y}"`)), `elektrony jsou ve třech výškách ${VYSKY.join(', ')}`);
ok(jeAktivni(TL[TYP_N]) && jeNeaktivni(TL[CISTY]) && jeNeaktivni(TL[TYP_P]), 'zvolené je tlačítko typu N (třída i aria-pressed)');
const jasN = paprsky.getAttribute('opacity');

console.log('— přepnutí na typ P —');
klik(TL[TYP_P]);
ok(stavText.textContent === 'Typ P — příměs bor', `plaketa: ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Nositelé náboje: díry' && vodivostText.textContent === 'děrová vodivost', `plaketa: ${JSON.stringify(nosiceText.textContent + ' / ' + vodivostText.textContent)}`);
ok(pocet(castice.innerHTML, ZNACKA_DIRY) === NOSICU && pocet(castice.innerHTML, ZNACKA_ELEKTRONU) === 0,
	`v typu P se kreslí jen díry (${pocet(castice.innerHTML, ZNACKA_DIRY)} děr, ${pocet(castice.innerHTML, ZNACKA_ELEKTRONU)} elektronů)`);
ok(pocet(castice.innerHTML, 'fill="#1b6b2d">+</text>') === NOSICU && !/#e03131|>d</.test(castice.innerHTML), 'každá díra nese zelené „+" jako na obrázcích, žádné červené „d"');
ok(vzorek.getAttribute('fill') === BARVA_P && vzorek.getAttribute('stroke') === OBRYS_P,
	`typ P má barvu jako obrázky stránky (${vzorek.getAttribute('fill')} / ${vzorek.getAttribute('stroke')})`);
ok(sviti(), 'typ P vede proud → žárovka svítí');
ok(paprsky.getAttribute('opacity') === jasN, `typ P svítí STEJNĚ jako typ N (${paprsky.getAttribute('opacity')} vs. ${jasN})`);
ok(vzorekText.textContent === 'křemík + bor (typ P)', `popiska vzorku: ${JSON.stringify(vzorekText.textContent)}`);
ok(popis.textContent === stav(TYP_P).popis, 'popis pod scénou je popis typu P');
ok(castice.innerHTML.includes(`<circle cx="${X_KONEC}" cy="${VYSKY[0]}" r="${R}" ${ZNACKA_DIRY} />`),
	`první díra startuje u pólu + (${X_KONEC}, ${VYSKY[0]}): ${castice.innerHTML.slice(0, 90)}`);
ok(castice.innerHTML.includes(`<text x="${X_KONEC}" y="${VYSKY[0] + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#1b6b2d">+</text>`), 'zelené „+" sedí uvnitř kroužku díry');
ok(VYSKY.every((y) => castice.innerHTML.includes(`cy="${y}"`)), `díry jsou ve třech výškách ${VYSKY.join(', ')}`);
ok(jeAktivni(TL[TYP_P]) && jeNeaktivni(TL[CISTY]) && jeNeaktivni(TL[TYP_N]), 'zvolené je tlačítko typu P (třída i aria-pressed)');
{
	const sx = [...castice.innerHTML.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => [Number(m[1]), Number(m[2])]);
	ok(sx.length === NOSICU, `ve scéně jsou právě ${NOSICU} kroužky (je ${sx.length})`);
	ok(sx.every(([x, y]) => x >= VNITREK.x1 && x <= VNITREK.x2 && y >= VNITREK.y1 && y <= VNITREK.y2), `všechny kroužky leží uvnitř vzorku: ${JSON.stringify(sx)}`);
}

console.log('— návrat na čistý křemík —');
klik(TL[CISTY]);
ok(castice.innerHTML === '', 'zpátky v čistém křemíku se nekreslí žádný nositel');
ok(nosiceText.textContent === 'Nositelé náboje: téměř žádní', 'plaketa je zase u čistého křemíku');
ok(!sviti() && zarovka.getAttribute('fill') === svit(0).banka, 'žárovka po návratu zase zhasne');
ok(vzorek.getAttribute('fill') === '#e9ecef', 'vzorek má zase barvu čistého křemíku');
ok(jeAktivni(TL[CISTY]) && jeNeaktivni(TL[TYP_N]), 'zvolené je zase tlačítko čistého křemíku');

console.log('— legenda: jako obrázky stránky a MIMO obvod —');
{
	const leg = [...scenaSvg.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)" (fill="[^/]*?) \/>/g)].map((m) => ({ x: +m[1], y: +m[2], r: +m[3], znacka: m[4] }));
	const e = leg.find((c) => c.znacka === ZNACKA_ELEKTRONU), d = leg.find((c) => c.znacka === ZNACKA_DIRY);
	ok(!!e && />elektron<\/text>/.test(scenaSvg), 'v SVG je legenda „elektron" s modrým kroužkem');
	ok(!!d && />díra<\/text>/.test(scenaSvg), 'v SVG je legenda „díra" se zeleným čárkovaným kroužkem');
	// spodní vodič obvodu leží na y 330, zdroj sahá do y 352 — legenda musí být celá pod tím
	ok(!!e && !!d && e.y - e.r > 352 + 10 && d.y - d.r > 352 + 10, `legenda leží pod obvodem i zdrojem (y ${e?.y}, ${d?.y})`);
	const ram = scenaSvg.match(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" rx="8"/)?.slice(1).map(Number);
	ok(!!ram && ram[1] > 352 && [e, d].every((c) => c.y - c.r > ram[1] && c.y + c.r < ram[1] + ram[3] && c.x - c.r > ram[0] && c.x + c.r < ram[0] + ram[2]),
		'legenda je v samostatném rámečku pod obvodem');
	ok(!/🔵|🔴/.test(zdroj), 'tlačítka nemají modrý/červený puntík, který by odporoval barvám typů');
}

console.log('— mobil (telefon 360 px → scéna ~235 px), kontrast, přístupnost —');
klik(TL[TYP_P]);
{
	const sirka = Number(scenaSvg.match(/viewBox="0 0 (\d+) \d+"/)[1]);
	const vse = scenaSvg + castice.innerHTML;
	const velikosti = [...vse.matchAll(/font-size="(\d+)"/g)].map((m) => Number(m[1]));
	const nejmensi = Math.min(...velikosti);
	ok(velikosti.length >= 12 && nejmensi * 235 / sirka >= 12,
		`nejmenší písmo ${nejmensi} ve scéně široké ${sirka} → na telefonu ${(nejmensi * 235 / sirka).toFixed(1)} px ≥ 12 px (${velikosti.length} textů)`);
	ok(/#pold-svg \{[^}]*max-width: 460px/.test(zdroj), 'na počítači je úzká scéna omezená na 460 px');
	const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
	const L = (hex) => { const h = hex.slice(1); const [r, g2, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g2 + 0.0722 * b; };
	const kontrast = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
	const spatne = [];
	for (const m of scenaSvg.matchAll(/<text [^>]*fill="(#\w+)"[^>]*>([^<]*)</g)) {
		if (m[2] === '−' && m[1] === '#ffffff') continue; // znak v kroužku legendy — měří se níž proti kroužku
		for (const p of ['#f8f9fa', '#ffffff']) if (kontrast(m[1], p) < 4.5) spatne.push(`„${m[2] || m[0].match(/id="([^"]+)"/)?.[1]}" ${m[1]} na ${p} ${kontrast(m[1], p).toFixed(2)}`);
	}
	ok(!spatne.length, `popisky mají kontrast ≥ 4,5 : 1 (${spatne.join('; ') || 'vše v pořádku'})`);
	const kruhy = [];
	let zmereno = 0;
	for (const m of vse.matchAll(/<circle[^>]*fill="(#\w+)"[^>]*\/>\s*<text[^>]*fill="(#\w+)"/g)) { zmereno++; if (kontrast(m[1], m[2]) < 4.5) kruhy.push(`${m[2]} na ${m[1]} ${kontrast(m[1], m[2]).toFixed(2)}`); }
	ok(zmereno === 2 + NOSICU && !kruhy.length, `znaky v kroužcích (${zmereno} změřeno: legenda + díry) mají kontrast ≥ 4,5 : 1 (${kruhy.join('; ') || 'vše v pořádku'})`);
	ok(/id="pold-popis" aria-live="polite"/.test(zdroj), 'popis stavu pod scénou má aria-live');
	ok([1, 2, 3].every((s) => new RegExp(`id="${TL[s]}"[^>]*aria-pressed="(true|false)"`).test(zdroj)), 'tlačítka mají aria-pressed už ve výchozím HTML');
}

console.log('— scéna nemá posuvník množství příměsi —');
ok(!/id="pold-slider"|type="range"/.test(zdroj), 'v komponentě není posuvník počtu atomů příměsi (zdroj takovou gradaci netvrdí)');
ok(!/čím víc|tím líp|tím lépe|počet atomů příměsi/i.test(zdroj.replace(/<script>[\s\S]*?<\/script>/, (s) => s.replace(/\/\/[^\n]*/g, ''))),
	'ani text stránky netvrdí, že víc příměsi = lepší vedení');

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);

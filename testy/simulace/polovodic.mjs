#!/usr/bin/env node
// Ověření PolovodicSimulace.astro (dopování polovodiče, F9): spustí SKUTEČNÝ
// skript komponenty v Node s náhradním DOM a proměří, co scéna žákovi tvrdí.
//
// SMYSL scény (podle PDF učitele „14. Polovodiče typu N a P, dioda", str. 1:
// „Lepší vodivost polovodičů získáme přidáním příměsi… Stačí velmi malé
// množství."):
//   · čistý křemík nevede — žádný volný nosič, žárovka zhasnutá,
//   · typ N kreslí JEN elektrony, typ P JEN díry,
//   · oba dopované vedou, tedy žárovka u obou svítí stejně (o síle vedení
//     zdroj nic neříká). O POČTU nosičů scéna netvrdí nic — počet závisí na
//     dávce příměsi a výklad ani PDF ho nemají, proto to nehlídá ani test.
//   · žádné odstupňování podle množství příměsi (to zdroj netvrdí) a žádné
//     číslo proudu ani koncentrace (výklad je nemá).
// Dřívější verze scény měla posuvník 1–5 atomů příměsi a učila „čím víc
// příměsi, tím líp vede" — v podkladech to nikde nestojí. Test proto hlídá,
// že se gradace nevrátí (žádný text o „čím víc… tím líp", žádná číslice
// v popiscích scény).
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
	p.classList._t = new Set();
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
const castice = prvky.get('pold-castice');
const popis = prvky.get('pold-popis');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());
const pocetZnacek = (html, barva) => (html.match(new RegExp(`fill="${barva}"`, 'g')) || []).length;
const MODRA = '#1971c2', CERVENA = '#e03131';
const TL = { 1: 'pold-tl-cisty', 2: 'pold-tl-n', 3: 'pold-tl-p' };
const jeAktivni = (id) => prvky.get(id).classList.contains('pold-aktivni');
// jak scéna vypadá teď — jedno místo, odkud se čtou všechny viditelné znaky stavu
const sviti = () => Number(paprsky.getAttribute('opacity')) > 0 && Number(zare.getAttribute('opacity')) > 0;

const stav = svg.__stavDopovani;
const poz = svg.__pozicePartice;
const svit = svg.__svitZarovky;
const plaketa = svg.__plaketaNosicu;

// ČEKANÉ hodnoty jsou v testu zapsané natvrdo (ne odvozené z komponenty),
// aby test nemohl být tautologický: NOSICU je pevný malý počet nosičů,
// X_* okraje dráhy uvnitř vzorku, Y_* výšky tří nosičů.
const NOSICU = 3;
const X_START = 170, X_KONEC = 430;
const VYSKY = [123, 150, 177];
const CISTY = 1, TYP_N = 2, TYP_P = 3;
const nosicuVe = (scena) => stav(scena).elektrony + stav(scena).diry;

console.log('— SMYSL scény: čistý nevede, typ N nese elektrony, typ P díry —');
ok(nosicuVe(CISTY) === 0, `čistý křemík nemá ve scéně žádný volný nosič (je ${nosicuVe(CISTY)})`);
ok(stav(TYP_N).elektrony === NOSICU && stav(TYP_N).diry === 0,
	`typ N má jen elektrony (${stav(TYP_N).elektrony} elektronů, ${stav(TYP_N).diry} děr)`);
ok(stav(TYP_P).diry === NOSICU && stav(TYP_P).elektrony === 0,
	`typ P má jen díry (${stav(TYP_P).diry} děr, ${stav(TYP_P).elektrony} elektronů)`);
ok(nosicuVe(TYP_N) > nosicuVe(CISTY), `v dopovaném se kreslí volné nosiče, v čistém žádný (${nosicuVe(TYP_N)} > ${nosicuVe(CISTY)})`);
ok(nosicuVe(TYP_N) <= 5, `scéna kreslí jen pár nosičů, aby byly vidět — není to údaj o počtu (je jich ${nosicuVe(TYP_N)})`);

console.log('— žárovka: dva stavy, žádné odstupňování —');
ok(svit(0).paprsky === 0 && svit(0).zare === 0, `bez volných nosičů žárovka nesvítí (paprsky ${svit(0).paprsky}, záře ${svit(0).zare})`);
ok(svit(NOSICU).paprsky > 0 && svit(NOSICU).zare > 0, `s volnými nosiči žárovka svítí (paprsky ${svit(NOSICU).paprsky}, záře ${svit(NOSICU).zare})`);
ok(svit(NOSICU).banka !== svit(0).banka, `rozsvícená baňka má jinou barvu než zhasnutá (${svit(NOSICU).banka} vs. ${svit(0).banka})`);
ok(svit(NOSICU).paprsky <= 1 && svit(NOSICU).zare <= 1,
	`průhlednosti jsou platné (0–1): paprsky ${svit(NOSICU).paprsky}, záře ${svit(NOSICU).zare}`);
ok(svit(1).paprsky === svit(5).paprsky && svit(1).zare === svit(5).zare && svit(1).banka === svit(5).banka,
	`jas NEZÁVISÍ na počtu nosičů — jeden svítí stejně jako pět (${svit(1).paprsky}/${svit(5).paprsky})`);
ok(svit(0).banka !== svit(1).banka, `hranice je mezi „nic" a „něco": nula a jeden nosič vypadají různě (${svit(0).banka} vs. ${svit(1).banka})`);

console.log('— popisky: žádná čísla, žádná gradace podle množství příměsi —');
const vsechnyTexty = [CISTY, TYP_N, TYP_P].map((s) => `${stav(s).nazev} ${stav(s).vzorek} ${stav(s).popis} ${stav(s).vodivost} ${plaketa(stav(s))}`).join(' ');
ok(!/\d/.test(vsechnyTexty), `ve scéně není žádné číslo (proudu, koncentrace ani počtu nosičů): ${JSON.stringify((vsechnyTexty.match(/.{0,25}\d.{0,25}/) || [''])[0])}`);
ok(!/čím víc|tím líp|tím lépe|víc atomů|počet atomů|více příměsi/i.test(vsechnyTexty), 'scéna netvrdí, že víc příměsi = lepší vedení — zdroj to neříká');
ok(/malé množství/.test(stav(TYP_N).popis) && /malé množství/.test(stav(TYP_P).popis), 'oba dopované stavy říkají, že příměsi stačí malé množství');
ok(/[Aa]rsen/.test(stav(TYP_N).popis) && /[Bb]or/.test(stav(TYP_P).popis), 'typ N zmiňuje arsen, typ P bor');
ok(/elektron/.test(stav(TYP_N).popis) && /díra|díry|děr/.test(stav(TYP_P).popis), 'popis typu N mluví o elektronech, typu P o dírách');
ok(/pólu \+/.test(stav(TYP_N).popis), `popis typu N říká, že elektron putuje k pólu + : ${JSON.stringify(stav(TYP_N).popis.slice(0, 80))}`);
ok(/pólu −/.test(stav(TYP_P).popis), `popis typu P říká, že díra se posouvá k pólu − : ${JSON.stringify(stav(TYP_P).popis.slice(0, 90))}`);
ok(/žárovka nesvítí/.test(stav(CISTY).popis) && /skoro neprochází/.test(stav(CISTY).popis),
	`čistý křemík je popsaný jako srovnání bez proudu: ${JSON.stringify(stav(CISTY).popis.slice(0, 70))}`);
ok(!/vlastní vodivost|teplem|pár elektron/.test(vsechnyTexty), 'scéna nemluví o vlastní vodivosti ani o páru z tepla — to je jiné podtéma');
ok(stav(TYP_N).vodivost === 'elektronová vodivost' && stav(TYP_P).vodivost === 'děrová vodivost', 'typ N = elektronová, typ P = děrová vodivost');
ok(stav(CISTY).nazev === 'Čistý křemík — bez příměsi' && stav(TYP_N).nazev === 'Typ N — příměs arsen' && stav(TYP_P).nazev === 'Typ P — příměs bor',
	`názvy stavů: ${[CISTY, TYP_N, TYP_P].map((s) => stav(s).nazev).join(' | ')}`);
ok(stav(CISTY).vzorek === 'čistý křemík (bez příměsi)' && stav(TYP_N).vzorek === 'křemík + arsen (typ N)' && stav(TYP_P).vzorek === 'křemík + bor (typ P)',
	`popisky vzorku: ${[CISTY, TYP_N, TYP_P].map((s) => stav(s).vzorek).join(' | ')}`);

console.log('— plaketa nosičů —');
ok(plaketa(stav(CISTY)) === 'Volné nosiče náboje: téměř žádné → skoro nevede proud', `čistý: ${JSON.stringify(plaketa(stav(CISTY)))}`);
ok(plaketa(stav(TYP_N)) === 'Volné nosiče náboje: volné elektrony → elektronová vodivost', `typ N: ${JSON.stringify(plaketa(stav(TYP_N)))}`);
ok(plaketa(stav(TYP_P)) === 'Volné nosiče náboje: díry → děrová vodivost', `typ P: ${JSON.stringify(plaketa(stav(TYP_P)))}`);
ok(new Set([CISTY, TYP_N, TYP_P].map((s) => plaketa(stav(s)))).size === 3, 'každý ze tří stavů má svou plaketu');
// Text se musí do bílého rámečku VEJÍT. Nejdelší řádek plakety
// („Volné nosiče náboje: volné elektrony → elektronová vodivost“) měří
// v písmu, na které prohlížeč u SVG spadne (Comic Sans MS Bold 14 px), 403 px
// — a 410 px i s nejširší náhradní šipkou (Comic Sans glyf → nemá). Změřeno
// výpočtem z metrik fontu, ne pohledem na náhled: ten kreslí patkovým písmem
// a přetečení by zamaskoval.
const NEJSIRSI_TEXT = 410;
{
	const r = zdroj.match(/<rect x="(\d+)" y="18" width="(\d+)" height="52"/);
	ok(!!r, 'plaketa je obdélník s pevnými rozměry ve zdroji');
	const x = Number(r[1]), w = Number(r[2]);
	const vnitrek = w - 4; // obrys stroke-width 2 ubere 1 px z každé strany, plus 1 px odsazení
	ok(vnitrek >= NEJSIRSI_TEXT, `nejdelší text se do plakety vejde (vnitřek ${vnitrek} px ≥ ${NEJSIRSI_TEXT} px)`);
	ok(vnitrek - NEJSIRSI_TEXT >= 40, `a vejde se s rezervou (zbývá ${vnitrek - NEJSIRSI_TEXT} px)`);
	ok(x + w / 2 === 330, `plaketa je souměrná kolem osy textu x = 330 (střed rámečku je ${x + w / 2})`);
	ok(x >= 0 && x + w <= 660, `plaketa se vejde do scény 0…660 (je ${x}…${x + w})`);
	ok(/<text id="pold-stav-text" x="330"/.test(zdroj) && /<text id="pold-nosice-text" x="330"/.test(zdroj),
		'oba řádky plakety jsou vystředěné na x = 330');
}

console.log('— barvy krystalu odlišují tři stavy —');
ok(new Set([CISTY, TYP_N, TYP_P].map((s) => stav(s).barva)).size === 3,
	`tři stavy = tři různé barvy vzorku (${[CISTY, TYP_N, TYP_P].map((s) => stav(s).barva).join(', ')})`);

console.log('— pohyb nosičů: elektron k +, díra k − —');
ok(poz(0, 0).xElektron === X_START && poz(0, 0).xDira === X_KONEC,
	`nosič startuje u svého okraje vzorku: elektron ${X_START}, díra ${X_KONEC} (je ${poz(0, 0).xElektron} a ${poz(0, 0).xDira})`);
ok(poz(1500, 0).xElektron === 300 && poz(1500, 0).xDira === 300, `v polovině cesty jsou nosiče uprostřed vzorku (je ${poz(1500, 0).xElektron} a ${poz(1500, 0).xDira})`);
ok(poz(1500, 0).xElektron > poz(0, 0).xElektron, `elektron se posouvá doprava, k pólu + (${poz(0, 0).xElektron} → ${poz(1500, 0).xElektron})`);
ok(poz(1500, 0).xDira < poz(0, 0).xDira, `díra se posouvá doleva, k pólu − (${poz(0, 0).xDira} → ${poz(1500, 0).xDira})`);
ok(poz(3000, 0).xElektron === X_START, `po 3000 ms se nosič vrací na začátek dráhy (je ${poz(3000, 0).xElektron})`);
ok(poz(-1500, 0).xElektron === 300, `záporný čas nerozbije fázi (je ${poz(-1500, 0).xElektron})`);
ok(poz(2999.9, 0).xElektron === X_KONEC && poz(2999.9, 0).xDira === X_START, `na konci dráhy dojedou nosiče až k protějšímu okraji (je ${poz(2999.9, 0).xElektron} a ${poz(2999.9, 0).xDira})`);
ok(poz(0, 1).xElektron === 343 && poz(0, 2).xElektron === 257,
	`nosiče jsou rozfázované po třetinách periody → x = 343 a 257 (je ${poz(0, 1).xElektron} a ${poz(0, 2).xElektron})`);
ok(poz(0, 1).xDira === 257 && poz(0, 2).xDira === 343, `díry jsou rozfázované zrcadlově (je ${poz(0, 1).xDira} a ${poz(0, 2).xDira})`);
ok(new Set([0, 1, 2].map((i) => poz(0, i).xElektron)).size === NOSICU, 'nosiče nejedou v zákrytu, každý je jinde');
{
	const casy = [0, 300, 700, 1234, 1500, 2100, 2999.9];
	const vsechnyX = [];
	for (const t of casy) for (let i = 0; i < NOSICU; i++) vsechnyX.push(poz(t, i).xElektron, poz(t, i).xDira);
	ok(vsechnyX.every((x) => x >= 162 && x <= 438), `nosiče nikdy nevyjedou z krystalu (x ${Math.min(...vsechnyX)}…${Math.max(...vsechnyX)}, vnitřek vzorku je 162–438)`);
	ok(Math.min(...vsechnyX) < 200 && Math.max(...vsechnyX) > 400, 'nosiče projedou celou šířku vzorku, ne jen jeho polovinu');
	ok(vsechnyX.every((x) => Number.isInteger(x)), 'vodorovné polohy nosičů jsou celá čísla (v SVG žádné nekonečné desetinné rozvoje)');
}

console.log('— svislé rozložení uvnitř obrysu krystalu —');
ok(JSON.stringify([0, 1, 2].map((i) => poz(0, i).y)) === JSON.stringify(VYSKY),
	`tři nosiče jsou rozložené po výšce vzorku: ${JSON.stringify([0, 1, 2].map((i) => poz(0, i).y))} (čekáno ${JSON.stringify(VYSKY)})`);
{
	// vzorek je rect y = 90…210 s obrysem 4 → vnitřek 92…208; kolečko má poloměr 10,
	// takže střed musí ležet mezi 102 a 198, jinak nosič leze na obrys
	const vsechnyY = [0, 1, 2].map((i) => poz(0, i).y);
	ok(vsechnyY.every((y) => y >= 102 && y <= 198), `žádný nosič nesahá na obrys vzorku (y ${Math.min(...vsechnyY)}…${Math.max(...vsechnyY)}, dovoleno 102–198)`);
	ok(vsechnyY.every((y) => Number.isInteger(y)), 'výšky nosičů jsou celá čísla');
	ok(new Set(vsechnyY).size === NOSICU, 'nosiče se svisle nepřekrývají');
	ok(Math.max(...vsechnyY) - Math.min(...vsechnyY) >= 40, `nosiče se rozprostřou po většině výšky vzorku (rozpětí ${Math.max(...vsechnyY) - Math.min(...vsechnyY)} px)`);
	ok(vsechnyY.every((y, i) => i === 0 || y > vsechnyY[i - 1]), 'nosiče jsou seřazené shora dolů, každý ve svém pásu');
}

console.log('— výchozí stav: čistý křemík —');
ok(stavText.textContent.includes('Čistý křemík'), `plaketa hlásí ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Volné nosiče náboje: téměř žádné → skoro nevede proud', `nosiče: ${JSON.stringify(nosiceText.textContent)}`);
ok(!/\d/.test(nosiceText.textContent), `na plaketě čistého křemíku není žádné číslo: ${JSON.stringify(nosiceText.textContent)}`);
ok(castice.innerHTML === '', `v čistém křemíku se nekreslí žádný volný nosič: ${JSON.stringify(castice.innerHTML.slice(0, 60))}`);
ok(!sviti(), `čistý křemík: žárovka nesvítí (paprsky ${paprsky.getAttribute('opacity')}, záře ${zare.getAttribute('opacity')})`);
ok(zarovka.getAttribute('fill') === svit(0).banka, `čistý křemík: baňka je zhasnutá (je ${zarovka.getAttribute('fill')})`);
ok(vzorekText.textContent === 'čistý křemík (bez příměsi)', 'popiska vzorku hlásí čistý křemík bez příměsi');
ok(jeAktivni(TL[CISTY]) && !jeAktivni(TL[TYP_N]) && !jeAktivni(TL[TYP_P]), 'zvýrazněné je tlačítko čistého křemíku');
const barvaCisteho = vzorek.getAttribute('fill');

console.log('— přepnutí na typ N —');
klik(TL[TYP_N]);
ok(stavText.textContent.includes('Typ N'), `plaketa: ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Volné nosiče náboje: volné elektrony → elektronová vodivost', `nosiče: ${JSON.stringify(nosiceText.textContent)}`);
ok(pocetZnacek(castice.innerHTML, MODRA) === NOSICU && pocetZnacek(castice.innerHTML, CERVENA) === 0,
	`v typu N se kreslí jen elektrony (${pocetZnacek(castice.innerHTML, MODRA)} modrých, ${pocetZnacek(castice.innerHTML, CERVENA)} červených)`);
ok(sviti(), `typ N vede proud → žárovka svítí (paprsky ${paprsky.getAttribute('opacity')}, záře ${zare.getAttribute('opacity')})`);
ok(zarovka.getAttribute('fill') !== svit(0).banka, `baňka už není zhasnutá (je ${zarovka.getAttribute('fill')})`);
ok(vzorek.getAttribute('fill') !== barvaCisteho, `vzorek změnil barvu proti čistému křemíku (${barvaCisteho} → ${vzorek.getAttribute('fill')})`);
ok(vzorekText.textContent === 'křemík + arsen (typ N)', `popiska vzorku: ${JSON.stringify(vzorekText.textContent)}`);
ok(/elektron/.test(popis.textContent), 'popis pod scénou mluví o elektronech');
ok(/<circle cx="170" cy="123" r="10" fill="#1971c2" stroke="#2b2a26" stroke-width="1.5" \/>/.test(castice.innerHTML),
	`první elektron je kolečko r = 10 s obrysem 1.5 na startu (170, 123): ${castice.innerHTML.slice(0, 90)}`);
ok(/<text x="170" y="127" [^>]*>e⁻<\/text>/.test(castice.innerHTML), 'popisek e⁻ sedí uvnitř kolečka (y o 4 níž než střed)');
ok(VYSKY.every((y) => castice.innerHTML.includes(`cy="${y}"`)), `elektrony jsou ve třech výškách ${VYSKY.join(', ')}: ${castice.innerHTML.slice(0, 120)}`);
ok(jeAktivni(TL[TYP_N]) && !jeAktivni(TL[CISTY]) && !jeAktivni(TL[TYP_P]), 'zvýrazněné je tlačítko typu N');
const barvaN = vzorek.getAttribute('fill');
const jasN = paprsky.getAttribute('opacity');

console.log('— přepnutí na typ P —');
klik(TL[TYP_P]);
ok(stavText.textContent.includes('Typ P'), `plaketa: ${JSON.stringify(stavText.textContent)}`);
ok(nosiceText.textContent === 'Volné nosiče náboje: díry → děrová vodivost', `nosiče: ${JSON.stringify(nosiceText.textContent)}`);
ok(pocetZnacek(castice.innerHTML, CERVENA) === NOSICU && pocetZnacek(castice.innerHTML, MODRA) === 0,
	`v typu P se kreslí jen díry (${pocetZnacek(castice.innerHTML, CERVENA)} červených, ${pocetZnacek(castice.innerHTML, MODRA)} modrých)`);
ok(sviti(), `typ P vede proud → žárovka svítí (paprsky ${paprsky.getAttribute('opacity')}, záře ${zare.getAttribute('opacity')})`);
ok(paprsky.getAttribute('opacity') === jasN, `typ P svítí STEJNĚ jako typ N — rozdíl je v druhu nosiče, ne v síle vedení (${paprsky.getAttribute('opacity')} vs. ${jasN})`);
ok(vzorek.getAttribute('fill') !== barvaN && vzorek.getAttribute('fill') !== barvaCisteho,
	`typ P má svou barvu vzorku (${vzorek.getAttribute('fill')}, N má ${barvaN}, čistý ${barvaCisteho})`);
ok(vzorekText.textContent === 'křemík + bor (typ P)', `popiska vzorku: ${JSON.stringify(vzorekText.textContent)}`);
ok(/díra|díry|děr/.test(popis.textContent), 'popis pod scénou mluví o dírách');
ok(/<circle cx="430" cy="123" r="10" fill="#e03131" stroke="#2b2a26" stroke-width="1.5" \/>/.test(castice.innerHTML),
	`první díra startuje u pólu + (430, 123): ${castice.innerHTML.slice(0, 90)}`);
ok(/<text x="430" y="127" [^>]*>d<\/text>/.test(castice.innerHTML), 'popisek d sedí uvnitř kolečka díry');
ok(VYSKY.every((y) => castice.innerHTML.includes(`cy="${y}"`)), `díry jsou ve třech výškách ${VYSKY.join(', ')}: ${castice.innerHTML.slice(0, 120)}`);
ok(jeAktivni(TL[TYP_P]) && !jeAktivni(TL[CISTY]) && !jeAktivni(TL[TYP_N]), 'zvýrazněné je tlačítko typu P');
{
	// nakreslená kolečka musí ležet uvnitř obrysu vzorku (vnitřek 162…438 × 102…198)
	const sx = [...castice.innerHTML.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => [Number(m[1]), Number(m[2])]);
	ok(sx.length === NOSICU, `ve scéně jsou právě ${NOSICU} kolečka (je ${sx.length})`);
	ok(sx.every(([x, y]) => x >= 162 && x <= 438 && y >= 102 && y <= 198), `všechna kolečka leží uvnitř krystalu: ${JSON.stringify(sx)}`);
}

console.log('— návrat na čistý křemík —');
klik(TL[CISTY]);
ok(castice.innerHTML === '', 'zpátky v čistém křemíku se nekreslí žádný nosič');
ok(nosiceText.textContent === 'Volné nosiče náboje: téměř žádné → skoro nevede proud', `plaketa je zase u čistého křemíku: ${JSON.stringify(nosiceText.textContent)}`);
ok(!sviti() && zarovka.getAttribute('fill') === svit(0).banka, 'žárovka po návratu zase zhasne');
ok(vzorek.getAttribute('fill') === barvaCisteho, 'vzorek má zase barvu čistého křemíku');
ok(jeAktivni(TL[CISTY]) && !jeAktivni(TL[TYP_N]), 'zvýrazněné je zase tlačítko čistého křemíku');

console.log('— scéna nemá posuvník množství příměsi —');
ok(!/id="pold-slider"|type="range"/.test(zdroj), 'v komponentě není posuvník počtu atomů příměsi (zdroj takovou gradaci netvrdí)');
ok(!/čím víc|tím líp|tím lépe|počet atomů příměsi/i.test(zdroj.replace(/<script>[\s\S]*?<\/script>/, (s) => s.replace(/\/\/[^\n]*/g, ''))),
	'ani text stránky netvrdí, že víc příměsi = lepší vedení');

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);

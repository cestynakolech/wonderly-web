#!/usr/bin/env node
// Ověření PremenyEnergieSimulace.astro — přeměny elektrické energie a zákon
// zachování (F9, elektricka-energie-a-premeny). Skript komponenty se spustí ve
// VM sandboxu a testuje se VÝSLEDEK (zapsané innerHTML, vystavené čisté funkce),
// ne vzory nad zdrojovým textem.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		disabled: false,
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
let posledniRafId = 0;
const rafCallbacky = new Map();
const sandbox = {
	document, performance: { now: () => 0 },
	// requestAnimationFrame se v testu NESPOUŠTÍ automaticky — sleduje se ručně
	// spouštěný callback s vlastními časovými razítky (viz „animace v čase" níž).
	requestAnimationFrame: (f) => { posledniRafId += 1; rafCallbacky.set(posledniRafId, f); return posledniRafId; },
	cancelAnimationFrame: (id) => { rafCallbacky.delete(id); },
	console, Math,
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const klik = (id) => { for (const f of prvky.get(id).posluchaci.click) f(); };
const nastavSlider = (id, hodnota) => { prvky.get(id).value = String(hodnota); for (const f of prvky.get(id).posluchaci.input) f(); };

// ══════════════════════════ SCÉNA A: vyber zařízení ══════════════════════════
const svgA = prvky.get('pe-a-svg');
const { __ZARIZENI: ZARIZENI, __FORMY: FORMY, __textSmeru: textSmeru, __platnyIndexZarizeni: platnyIndexZarizeni } = svgA;

console.log('— obranné čtení indexu zařízení, VČETNĚ krajních hodnot 0 a poslední —');
{
	ok(platnyIndexZarizeni(0) === 0, `index 0 (vařič) zůstává 0 (mám ${platnyIndexZarizeni(0)})`);
	ok(platnyIndexZarizeni(5) === 5, `index 5 (poslední, solární panel) zůstává 5 (mám ${platnyIndexZarizeni(5)})`);
	ok(platnyIndexZarizeni(6) === 0, `index 6 (mimo rozsah) se nahradí 0 (mám ${platnyIndexZarizeni(6)})`);
	ok(platnyIndexZarizeni(-1) === 0, `záporný index se nahradí 0 (mám ${platnyIndexZarizeni(-1)})`);
}

console.log('— tabulka zařízení (natvrdo, doslova podle výkladu stránky) —');
{
	ok(ZARIZENI.length === 6, `šest zařízení v nabídce (mám ${ZARIZENI.length})`);
	const najdi = (nazev) => ZARIZENI.find((z) => z.nazev === nazev);
	ok(najdi('Vařič')?.z === 'elektricka' && najdi('Vařič')?.c === 'tepelna', 'vařič: elektrická → tepelná');
	ok(najdi('Vařič')?.ztrata === null, 'vařič NEMÁ ztrátovou šipku (teplo je cíl, ne ztráta)');
	ok(najdi('LED žárovka')?.z === 'elektricka' && najdi('LED žárovka')?.c === 'svetelna', 'LED: elektrická → světelná');
	ok(najdi('LED žárovka')?.ztrata === null, 'LED nemá ztrátovou šipku');
	ok(najdi('Elektromotor')?.z === 'elektricka' && najdi('Elektromotor')?.c === 'pohybova', 'elektromotor: elektrická → pohybová');
	ok(najdi('Elektromotor')?.ztrata?.forma === 'tepelna', 'elektromotor MÁ ztrátovou šipku k teplu');
	ok(najdi('Elektromotor')?.ztrata?.podil < 0.5, `ztráta motoru je menšina, ne většina (mám podíl ${najdi('Elektromotor')?.ztrata?.podil})`);
	ok(najdi('Alternátor')?.z === 'pohybova' && najdi('Alternátor')?.c === 'elektricka', 'alternátor: pohybová → elektrická (opačný směr)');
	ok(najdi('Transformátor')?.z === 'magneticka' && najdi('Transformátor')?.c === 'elektricka', 'transformátor: magnetická → elektrická (dle výkladu stránky)');
	ok(najdi('Solární panel')?.z === 'svetelna' && najdi('Solární panel')?.c === 'elektricka', 'solární panel: světelná → elektrická (opačný směr)');
}

console.log('\n— pouze elektromotor a vařič/LED/transformátor/alternátor/panel se liší ztrátou —');
{
	const sZtratou = ZARIZENI.filter((z) => z.ztrata !== null);
	ok(sZtratou.length === 1 && sZtratou[0].nazev === 'Elektromotor', `jen elektromotor má ztrátovou šipku (mám: ${sZtratou.map((z) => z.nazev).join(', ')})`);
}

console.log('\n— čistá funkce textSmeru vypisuje SPRÁVNÝ směr (zdroj → cíl) —');
{
	const varic = ZARIZENI.find((z) => z.nazev === 'Vařič');
	ok(textSmeru(varic).includes('elektrická') && textSmeru(varic).includes('tepelná'), `text šipky vařiče zmiňuje obě formy (mám „${textSmeru(varic)}“)`);
	const smerVarice = textSmeru(varic);
	ok(smerVarice.indexOf('elektrická') < smerVarice.indexOf('tepelná'), 'u vařiče je elektrická PŘED tepelnou (směr elektrická→tepelná)');
	const alternator = ZARIZENI.find((z) => z.nazev === 'Alternátor');
	const smerAlt = textSmeru(alternator);
	ok(smerAlt.indexOf('pohybová') < smerAlt.indexOf('elektrická'), `u alternátoru je pohybová PŘED elektrickou — opačný směr (mám „${smerAlt}“)`);
}

console.log('\n— klikací výběr zařízení a zapnutí vykreslí šipku ve scéně —');
{
	klik('pe-a-dev-0'); // vařič
	klik('pe-a-tlacitko'); // zapnout
	const html0 = prvky.get('pe-a-scena').innerHTML;
	ok(html0.includes('elektrická energie'), `po zapnutí vařiče je v scéně vidět „elektrická energie“ (délka html ${html0.length})`);
	ok(html0.includes('tepelná energie'), 'po zapnutí vařiče je v scéně vidět „tepelná energie“');
	ok(!html0.includes('ztráta'), 'u vařiče se ztrátová šipka NEkreslí');

	klik('pe-a-dev-2'); // elektromotor — nový výběr má zapnutoA resetnuté na false
	const htmlPredZapnutim = prvky.get('pe-a-scena').innerHTML;
	ok(!htmlPredZapnutim.includes('pohybová energie →') && !htmlPredZapnutim.includes('→ pohybová energie'), 'po přepnutí na nové zařízení se šipka schová (vyžaduje nové zapnutí)');
	klik('pe-a-tlacitko');
	const htmlMotor = prvky.get('pe-a-scena').innerHTML;
	ok(htmlMotor.includes('malá ztráta jako teplo'), 'u zapnutého elektromotoru JE vidět ztrátová šipka k teplu');
	ok(htmlMotor.includes('pohybová'), 'u elektromotoru je vidět pohybová energie');
}

// ══════════════════════════ SCÉNA B: zákon zachování ══════════════════════════
const svgB = prvky.get('pe-b-svg');
const {
	__CELKEM_JEDNOTEK: CELKEM_JEDNOTEK, __PX_NA_JEDNOTKU: PX_NA_JEDNOTKU, __VYSKA_CELKEM_PX: VYSKA_CELKEM_PX,
	__platnyCil: platnyCil, __stavPremenyPx: stavPremenyPx,
} = svgB;

console.log('\n— konstanty scény B (natvrdo) —');
{
	ok(CELKEM_JEDNOTEK === 10, `celkem 10 dílků energie (mám ${CELKEM_JEDNOTEK})`);
	ok(PX_NA_JEDNOTKU === 20, `20 px na dílek (mám ${PX_NA_JEDNOTKU})`);
	ok(VYSKA_CELKEM_PX === 200, `celková výška rámečku 200 px (mám ${VYSKA_CELKEM_PX})`);
}

console.log('\n— INVARIANTA zachování energie: součet tepelné a elektrické výšky je VŽDY roven celku —');
{
	// Mřížka cílů (%) i časů (t) — invarianta musí platit VŽDY, ne jen na jednom
	// snímku. Přesně tenhle druh testu (víc časů, ne jeden) chyběl u dřívějších
	// simulací a chyba se objevila až po nasazení.
	let vsechnyProsly = true;
	const cile = [0, 20, 50, 60, 100];
	const casy = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
	for (const cil of cile) {
		for (const t of casy) {
			const s = stavPremenyPx(cil, t);
			if (s.tepelnaPx + s.elektrickaPx !== VYSKA_CELKEM_PX) vsechnyProsly = false;
		}
	}
	ok(vsechnyProsly, `pro ${cile.length}×${casy.length} kombinací (cíl, t) platí tepelnaPx + elektrickaPx === ${VYSKA_CELKEM_PX} PŘESNĚ`);
}

console.log('\n— INVARIANTA nad VYKRESLENÝM stavem (skutečné SVG rect výšky), ne jen nad čistou funkcí —');
{
	// Renderovací funkce nejsou přímo vystavené jako __ (nakresliPasB je
	// interní), proto se čte PŘÍMO obsah #pe-b-pas po zavolání přes klik +
	// ruční „tik“ animace (requestAnimationFrame je v sandboxu jen zachycený,
	// spouští se ručně s vlastními časovými razítky).
	nastavSlider('pe-b-cil', 60);
	klik('pe-b-tlacitko'); // spustí animaci, naplánuje 1. rAF callback
	let vsechnyProsly = true;
	let zaznamenanaVysky = [];
	// Nasimulujeme běh animace v několika reálných časových krocích (0 ms,
	// 500 ms, 1000 ms, 1500 ms, 2000 ms = konec, PERIODA_MS=2000).
	for (const ts of [0, 500, 1000, 1500, 2000]) {
		const cb = rafCallbacky.get([...rafCallbacky.keys()].pop());
		if (!cb) break;
		cb(ts);
		const html = prvky.get('pe-b-pas').innerHTML;
		const vyskaRectu = (cast) => {
			const rectTag = (html.match(new RegExp(`<rect[^>]*data-cast="${cast}"[^>]*>`)) || [])[0] || '';
			return Number((rectTag.match(/height="(\d+(?:\.\d+)?)"/) || [])[1]);
		};
		const vyskaTepelna = vyskaRectu('tepelna');
		const vyskaElektricka = vyskaRectu('elektricka');
		zaznamenanaVysky.push({ ts, vyskaTepelna, vyskaElektricka });
		if (Number.isFinite(vyskaTepelna) && Number.isFinite(vyskaElektricka)) {
			if (Math.round(vyskaTepelna + vyskaElektricka) !== VYSKA_CELKEM_PX) vsechnyProsly = false;
		}
	}
	ok(vsechnyProsly, `nad vykresleným #pe-b-pas ve ${zaznamenanaVysky.length} časech animace platí součet výšek === ${VYSKA_CELKEM_PX} px`);
	ok(zaznamenanaVysky.length >= 4, `animace proběhla ve víc než jednom kroku (mám ${zaznamenanaVysky.length} kroků)`);
	const posledni = zaznamenanaVysky[zaznamenanaVysky.length - 1];
	ok(posledni.vyskaTepelna === 120, `na konci animace (60 % cíl) je tepelná výška přesně 120 px (mám ${posledni.vyskaTepelna})`);
	ok(posledni.vyskaElektricka === 80, `na konci animace je elektrická výška přesně 80 px (mám ${posledni.vyskaElektricka})`);
	const prvni = zaznamenanaVysky[0];
	ok(prvni.vyskaTepelna === 0, `na začátku animace (t=0) je tepelná výška 0 px (mám ${prvni.vyskaTepelna})`);
	ok(prvni.vyskaElektricka === 200, `na začátku animace je elektrická výška celých 200 px (mám ${prvni.vyskaElektricka})`);
}

console.log('\n— tlačítko „Ukázat výsledek ihned“ mění SVG SYNCHRONNĚ, bez čekání na animaci —');
{
	// Přesně tenhle scénář (klik nezmění nic viditelného, dokud nedoběhne
	// requestAnimationFrame) unikl nezávislé vizuální kontrole u první verze:
	// premeny-b.svg i premeny-b-klik.svg vygenerované nástrojem nahled-simulace
	// měly IDENTICKÝ obsah #pe-b-pas, protože klik na animující tlačítko
	// nastaví jen t=0 synchronně. Tlačítko „ihned“ musí SVG změnit ihned podle
	// aktuálního posuvníku, bez jakéhokoli tiku.
	const vyskaRectu = (html, cast) => {
		const rectTag = (html.match(new RegExp(`<rect[^>]*data-cast="${cast}"[^>]*>`)) || [])[0] || '';
		return Number((rectTag.match(/height="(\d+(?:\.\d+)?)"/) || [])[1]);
	};
	nastavSlider('pe-b-cil', 60);
	// scéna je zrovna v klidu (t=0) po předchozích testech — ověříme to
	const htmlPred = prvky.get('pe-b-pas').innerHTML;
	klik('pe-b-ihned'); // ŽÁDNÝ ruční tik — jen samotný klik
	const htmlPo = prvky.get('pe-b-pas').innerHTML;
	ok(vyskaRectu(htmlPo, 'tepelna') === 120, `po kliknutí na „ihned“ (60 % cíl) je tepelná výška SYNCHRONNĚ 120 px (mám ${vyskaRectu(htmlPo, 'tepelna')})`);
	ok(vyskaRectu(htmlPo, 'elektricka') === 80, `po kliknutí na „ihned“ je elektrická výška SYNCHRONNĚ 80 px (mám ${vyskaRectu(htmlPo, 'elektricka')})`);
	ok(htmlPred !== htmlPo, 'obsah #pe-b-pas se kliknutím na „ihned“ SKUTEČNĚ změnil (ne identický snímek před/po)');
}

console.log('\n— výchozí stav (60 %) dává CELÁ ČÍSLA dílků na konci přeměny —');
{
	const s = stavPremenyPx(platnyCil(60), 1);
	const tepelnaJednotek = s.tepelnaPx / PX_NA_JEDNOTKU;
	const elektrickaJednotek = s.elektrickaPx / PX_NA_JEDNOTKU;
	ok(Number.isInteger(tepelnaJednotek) && tepelnaJednotek === 6, `60 % z 10 dílků = 6 dílků tepelné, celé číslo (mám ${tepelnaJednotek})`);
	ok(Number.isInteger(elektrickaJednotek) && elektrickaJednotek === 4, `zbývá 4 díly elektrické, celé číslo (mám ${elektrickaJednotek})`);
}

console.log('\n— obranné čtení neplatných hodnot (scéna B), VČETNĚ krajních hodnot 0 a 100 —');
{
	ok(platnyCil(0) === 0, `cíl 0 % (žádná přeměna) zůstává 0 (mám ${platnyCil(0)})`);
	ok(platnyCil(100) === 100, `cíl 100 % (vše na teplo) zůstává 100 (mám ${platnyCil(100)})`);
	ok(platnyCil('bramborač') === 60, `neplatný cíl se nahradí výchozím 60 % (mám ${platnyCil('bramborač')})`);
	ok(platnyCil(-40) === 60 || platnyCil(-40) === 0, `záporný cíl se ošetří rozumně (mám ${platnyCil(-40)})`);
	ok(platnyCil(37) === 40, `cíl se zaokrouhlí na nejbližší násobek 10 (37 → mám ${platnyCil(37)})`);
	ok(platnyCil(110) === 60, `cíl nad 100 % se nahradí výchozím 60 % (mám ${platnyCil(110)})`);
}

console.log('\n— časování animace je RELATIVNÍ ke startu, ne k absolutnímu časovému razítku —');
{
	// Druhý běh animace, který začíná na NENULOVÉM časovém razítku (přesně
	// takhle vypadá skutečný `requestAnimationFrame` v prohlížeči — nikdy
	// nezačíná na 0). Pokud by se startovní čas bral špatně (např. porovnáním
	// `!casStart` místo `casStart === null`, které bere 0 jako „ještě
	// nenastaveno“), první snímek by NEZAČÍNAL na t=0, ale rovnou na
	// t = ts / PERIODA_MS — tenhle test by takovou chybu odhalil.
	nastavSlider('pe-b-cil', 100);
	klik('pe-b-tlacitko');
	const cb1 = rafCallbacky.get([...rafCallbacky.keys()].pop());
	cb1(9000); // start ve zcela libovolném nenulovém čase
	const htmlPrvni = prvky.get('pe-b-pas').innerHTML;
	const vyska = (html, cast) => {
		const rectTag = (html.match(new RegExp(`<rect[^>]*data-cast="${cast}"[^>]*>`)) || [])[0] || '';
		return Number((rectTag.match(/height="(\d+(?:\.\d+)?)"/) || [])[1]);
	};
	ok(vyska(htmlPrvni, 'tepelna') === 0, `první snímek animace (start v ts=9000) má tepelnou výšku 0, ne podle absolutního času (mám ${vyska(htmlPrvni, 'tepelna')})`);
	const cb2 = rafCallbacky.get([...rafCallbacky.keys()].pop());
	cb2(10000); // o 1000 ms později → čtvrtina periody 2000 ms u cíle 100 %
	const htmlDruhy = prvky.get('pe-b-pas').innerHTML;
	ok(vyska(htmlDruhy, 'tepelna') === 100, `1000 ms po startu (cíl 100 %) je tepelná výška přesně 100 px (mám ${vyska(htmlDruhy, 'tepelna')})`);
}

console.log(`\n${chyby === 0 ? '✅ VŠECHNY TESTY PROŠLY' : `❌ CHYB: ${chyby}`}`);
process.exit(chyby === 0 ? 0 : 1);

#!/usr/bin/env node
// Ověření ElektrickaPraceAVykonSimulace.astro — elektrická práce W = P·t a příkon P = U·I.
//
// Nejtišeji lžou tyhle věci a test je proto měří natvrdo, ne odhadem:
// (1) že by nějaká kombinace spotřebič×čas dala ošklivé desetinné číslo
//     místo pěkného kWh/Kč — prochází se VŠECH 96 kombinací (4 příkony ×
//     24 celých hodin) a navíc všech 96 čtvrthodinových poloh konvice;
// (2) že by obrázek žárovky v části B naznačoval „víc wattů = víc světla" —
//     porovnávají se SKUTEČNĚ VYKRESLENÉ souřadnice paprsků obou žárovek;
// (3) že by graf v části B poměrem výšek sloupců LHAL o tom, o kolik je
//     LED levnější — měří se SKUTEČNĚ VYKRESLENÝ <rect>, ve VŠECH 24
//     polohách posuvníku, bez jediného „continue“ nebo výjimky (nález
//     nezávislé kontroly 14. 8. odpoledne: dřívější verze měla při t = 1 h
//     poměr výšek 1,08 místo 10, a test to neviděl, protože si rizikové
//     polohy sám přeskakoval).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
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
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svgA = prvky.get('epv-a-svg');
const svgB = prvky.get('epv-b-svg');
const {
	__whZaDen: whZaDen, __kwhZaMesic: kwhZaMesic, __cenaZaMesic: cenaZaMesic, __proudA: proudA,
	__SPOTREBICE: SPOTREBICE, __kwhText: kwhText, __kcText: kcText, __uhlovaRychlost: uhlovaRychlost,
	__CENA_KWH: CENA_KWH, __NAPETI: NAPETI, __platnaDoba: platnaDoba, __dobaText: dobaText,
	__tHodinyText: tHodinyText, __KROK_KONVICE: KROK_KONVICE,
} = svgA;
const {
	__scenaB: scenaB, __vyskaSloupceB: vyskaSloupceB, __geometrieSloupceB: geometrieSloupceB,
	__CHART_BASELINE: CHART_BASELINE, __CHART_MAX_PX: CHART_MAX_PX,
	__CHART_MIN_PX: CHART_MIN_PX, __PANEL_B: PANEL_B, __IKONA_CX: IKONA_CX,
} = svgB;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const spotrebiceEl = prvky.get('epv-a-spotrebice');
const prepniA = (klic) => {
	const tl = { dataset: { klic }, closest: () => tl, classList: { toggle() {} } };
	for (const f of spotrebiceEl.posluchaci.click) f({ target: { closest: () => tl } });
};
const nastavA = (klic, t) => { prepniA(klic); prvky.get('epv-a-t').value = String(t); for (const f of prvky.get('epv-a-t').posluchaci.input) f(); };
const nastavB = (t) => { prvky.get('epv-b-t').value = String(t); for (const f of prvky.get('epv-b-t').posluchaci.input) f(); };

console.log('— konstanty: cena a napětí odpovídají zadání/výkladu —');
{
	ok(CENA_KWH === 5, `cena elektřiny je 5 Kč/kWh, stejně jako ve výkladu na stránce (${CENA_KWH})`);
	ok(NAPETI === 230, `napětí v zásuvce je 230 V (${NAPETI})`);
}

console.log('\n— tabulka spotřebičů (natvrdo, ať test nic neodkývá) —');
{
	const ocek = {
		klasicka: { p: 100, ikona: 'zarovka' },
		led: { p: 10, ikona: 'zarovka' },
		lednicka: { p: 20, ikona: 'lednicka' },
		konvice: { p: 2000, ikona: 'konvice' },
	};
	let spatne = null;
	for (const [klic, o] of Object.entries(ocek)) {
		const s = SPOTREBICE[klic];
		if (!s) { spatne = `chybí spotřebič „${klic}"`; break; }
		if (s.p !== o.p) spatne = `${klic}: čekal jsem příkon ${o.p} W, mám ${s.p} W`;
		if (s.ikona !== o.ikona) spatne = `${klic}: čekal jsem ikonu „${o.ikona}", mám „${s.ikona}"`;
	}
	ok(spatne === null, spatne ?? 'čtyři spotřebiče se správnými příkony: LED 10 W, lednička 20 W, klasická žárovka 100 W, konvice 2000 W');
	ok(Object.keys(SPOTREBICE).length === 4, `žádný spotřebič navíc (${Object.keys(SPOTREBICE).length})`);
}

console.log('\n— lednička: pravdivý údaj (20 W = průměr, NE 100 W běžícího kompresoru — nález nezávislé kontroly) —');
{
	ok(SPOTREBICE.lednicka.p === 20, `příkon ledničky v datech je 20 W, ne 100 W (${SPOTREBICE.lednicka.p})`);
	const tlacitkoHtml = html.match(/data-klic="lednicka">[^<]*<\/button>/)?.[0] ?? '';
	ok(tlacitkoHtml.includes('20 W'), `tlačítko ledničky v HTML uvádí 20 W: „${tlacitkoHtml}"`);
	ok(!tlacitkoHtml.includes('100 W'), 'a NEuvádí 100 W (to je příkon běžícího kompresoru, ne průměr)');
	const popis = SPOTREBICE.lednicka.popis;
	ok(/průměrný|průměr/i.test(popis), `popis vysvětluje, že jde o PRŮMĚRNÝ odběr: „${popis}"`);
	ok(!/100\s*W/.test(popis), 'a popis netvrdí 100 W');
	// realistický roční odhad: 20 W průměru celý rok = 175,2 kWh/rok — v pásmu
	// běžné ledničky (150–250 kWh/rok podle štítku), na rozdíl od 100 W, což by
	// dalo 876 kWh/rok — víc než trojnásobek reálného horního konce pásma.
	const kwhRokoveOdhad = (20 * 8760) / 1000;
	ok(kwhRokoveOdhad >= 150 && kwhRokoveOdhad <= 250,
		`20 W průměrného odběru odpovídá ${kwhRokoveOdhad.toFixed(1)} kWh/rok — v reálném pásmu běžné ledničky (150–250 kWh/rok)`);
}

console.log('\n— pure funkce: W = P·t, kWh za měsíc, cena, I = P/U —');
{
	ok(whZaDen(100, 5) === 500, `whZaDen(100,5) = 500 Wh (${whZaDen(100, 5)})`);
	ok(kwhZaMesic(100, 5) === 15, `kwhZaMesic(100,5) = 15 kWh — přesně příklad z výkladu (${kwhZaMesic(100, 5)})`);
	ok(cenaZaMesic(15) === 75, `cenaZaMesic(15) = 75 Kč — přesně příklad z výkladu (${cenaZaMesic(15)})`);
	ok(Math.abs(proudA(2000) - 2000 / 230) < 1e-9, 'proudA počítá I = P ÷ U');
	ok(kwhZaMesic(10, 5) === 1.5, `kwhZaMesic(10,5) = 1,5 kWh — desetina oproti klasické žárovce (${kwhZaMesic(10, 5)})`);
	ok(kwhZaMesic(20, 5) === 3, `kwhZaMesic(20,5) = 3 kWh — lednička (${kwhZaMesic(20, 5)})`);
	ok(kwhZaMesic(2000, 0.25) === 15, `kwhZaMesic(2000, 0,25) = 15 kWh — přesně vzorový příklad z výkladu (${kwhZaMesic(2000, 0.25)})`);
}

console.log('\n— VŠECH 96 kombinací (4 příkony × 24 celých hodin) dává čísla na nejvýš 1/2 desetinná místa —');
{
	let spatne = null, zkontrolovano = 0;
	for (const p of [10, 20, 100, 2000]) {
		for (let t = 1; t <= 24; t++) {
			zkontrolovano++;
			const kwh = kwhZaMesic(p, t);
			const kc = cenaZaMesic(kwh);
			const kwhNaDesetiny = Math.round(kwh * 10) / 10;
			const kcNaSetiny = Math.round(kc * 100) / 100;
			if (Math.abs(kwh - kwhNaDesetiny) > 1e-9) spatne = `P=${p} W, t=${t} h: kWh ${kwh} má víc než 1 desetinné místo`;
			if (Math.abs(kc - kcNaSetiny) > 1e-9) spatne = `P=${p} W, t=${t} h: cena ${kc} má víc než 2 desetinná místa`;
			// obchodní zaokrouhlení na padesátník: desetinná část ceny smí být jen 0 nebo 0,50
			const desetinaKc = Math.round((kc - Math.trunc(kc)) * 100);
			if (desetinaKc !== 0 && desetinaKc !== 50) spatne = `P=${p} W, t=${t} h: cena ${kc} Kč není celá ani na padesátník`;
		}
	}
	ok(zkontrolovano === 96, `zkontrolováno všech 96 kombinací (${zkontrolovano})`);
	ok(spatne === null, spatne ?? 've všech 96 kombinacích vychází kWh na nejvýš 1 des. místo a cena celá nebo na padesátník');
}

console.log('\n— konvice: VŠECH 96 čtvrthodinových poloh (0,25–24 h po 0,25 h) dává celé kWh a cenu na 75 Kč —');
{
	// 2000 W · (n/4) h · 30 dní / 1000 = 15·n kWh — vychází CELÉ pro každé n,
	// protože 60/4 = 15 je celé číslo (0,25 h = 1/4 h je v binární plovoucí
	// čárce přesná mocnina dvou, žádné zaokrouhlovací šumy).
	let spatne = null, zkontrolovano = 0;
	for (let n = 1; n <= 96; n++) {
		const t = n * 0.25;
		zkontrolovano++;
		const kwh = kwhZaMesic(2000, t);
		const kc = cenaZaMesic(kwh);
		if (Math.abs(kwh - Math.round(kwh)) > 1e-9) spatne = `t=${t} h: kWh ${kwh} není celé číslo`;
		if (Math.abs(kc - 75 * n) > 1e-6) spatne = `t=${t} h: cena ${kc} Kč neodpovídá 75 × ${n} = ${75 * n} Kč`;
	}
	ok(zkontrolovano === 96, `zkontrolováno všech 96 čtvrthodinových poloh (${zkontrolovano})`);
	ok(spatne === null, spatne ?? 'konvice: pro všech 96 poloh (0,25–24 h po 0,25 h) vychází kWh celé a cena přesný násobek 75 Kč');
}

console.log('\n— výchozí stav části A: klasická žárovka, 5 h → přesně příklad z výkladu —');
{
	ok(prvky.get('epv-a-t').value === '5', `posuvník doby provozu startuje na 5 h (${prvky.get('epv-a-t').value})`);
	nastavA('klasicka', 5);
	const info = prvky.get('epv-a-info').innerHTML;
	ok(info.includes('500 Wh'), `info panel ukazuje 500 Wh za den: „${info.match(/za den:[^<]*/)?.[0]}"`);
	ok(info.includes('15 kWh'), 'a 15 kWh za měsíc');
	ok(info.includes('75 Kč'), 'a cenu 75 Kč');
}

console.log('\n— konvice: přepnutí posuvník přepne na krok 0,25 h a rovnou ukáže příklad z výkladu —');
{
	// Přímý test na nález nezávislé kontroly: dřív šlo nastavit jen celé
	// hodiny (min="1"), takže se vzorový příklad výkladu (15 min) ve scéně
	// vůbec nedal předvést.
	nastavA('klasicka', 5);
	prepniA('konvice');
	const slider = prvky.get('epv-a-t');
	ok(slider.min === String(KROK_KONVICE), `po přepnutí na konvici je min posuvníku ${KROK_KONVICE} h (${slider.min})`);
	ok(slider.max === '24', `max zůstává 24 h (${slider.max})`);
	ok(slider.step === String(KROK_KONVICE), `krok posuvníku je ${KROK_KONVICE} h (${slider.step})`);
	ok(slider.value === String(KROK_KONVICE), `hodnota rovnou naskočí na ${KROK_KONVICE} h — vzorový příklad z výkladu (${slider.value})`);

	const info = prvky.get('epv-a-info').innerHTML;
	ok(info.includes('500 Wh'), `při 15 min konvice: 500 Wh za den, přesně jako ve výkladu: „${info.match(/za den:[^<]*/)?.[0]}"`);
	ok(info.includes('15 kWh'), 'a 15 kWh za měsíc — přesně jako ve výkladu');
	ok(info.includes('75 Kč'), 'a cena 75 Kč — přesně jako ve výkladu');
	ok(prvky.get('epv-a-out-t').textContent === '15 min',
		`popisek posuvníku ukazuje „15 min", ne desetinné „0,25 h" (${prvky.get('epv-a-out-t').textContent})`);

	// přepnutí PRYČ z konvice vrátí posuvník na celé hodiny 1–24
	prepniA('klasicka');
	ok(slider.min === '1' && slider.max === '24' && slider.step === '1',
		`po přepnutí zpět na klasickou žárovku se posuvník vrátí na celé hodiny (min=${slider.min}, max=${slider.max}, krok=${slider.step})`);
	ok(Number.isInteger(+slider.value) && +slider.value >= 1 && +slider.value <= 24,
		`a hodnota je platné celé číslo v rozsahu 1–24 (${slider.value})`);
	nastavA('klasicka', 5);
}

console.log('\n— přepnutí spotřebiče a posuvníku opravdu překreslí scénu A —');
{
	nastavA('klasicka', 5);
	const pred = prvky.get('epv-a-info').innerHTML;
	nastavA('konvice', 5);
	const po = prvky.get('epv-a-info').innerHTML;
	ok(pred !== po, 'info panel se po přepnutí spotřebiče změní');
	ok(po.includes('2000 W'), `a ukazuje příkon konvice: „${po.match(/příkon P = [^(]*/)?.[0]}"`);
	nastavA('klasicka', 5);
}

console.log('\n— ikona žárovky má STEJNOU velikost/paprsky bez ohledu na příkon (10 W i 100 W) —');
{
	// Kdyby se paprsky nebo poloměr skla měnily s příkonem, obrázek by dětem
	// tvrdil, že vyšší příkon = víc světla — přesně opačně, než učí Část B.
	nastavA('klasicka', 5);
	const ikonaKlasicka = prvky.get('epv-a-ikona').innerHTML;
	nastavA('led', 5);
	const ikonaLed = prvky.get('epv-a-ikona').innerHTML;
	const paprskyKlasicka = [...ikonaKlasicka.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)].map((m) => m.slice(1, 5).join(','));
	const paprskyLed = [...ikonaLed.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)].map((m) => m.slice(1, 5).join(','));
	ok(paprskyKlasicka.length === 8 && paprskyLed.length === 8, `obě žárovky mají 8 paprsků (${paprskyKlasicka.length}, ${paprskyLed.length})`);
	ok(paprskyKlasicka.join('|') === paprskyLed.join('|'), 'a paprsky mají u obou PŘESNĚ stejné souřadnice (stejná velikost/jas)');
	const sklo = (html) => /<circle[^>]*r="(\d+)"/.exec(html)?.[1];
	ok(sklo(ikonaKlasicka) === sklo(ikonaLed), `sklo žárovky má u obou stejný poloměr (${sklo(ikonaKlasicka)} px)`);
	nastavA('klasicka', 5);
}

console.log('\n— plaketa se jménem spotřebiče je bílá a text se do ní vejde (nesplývá s pozadím) —');
{
	const SIRKA_ZNAKU = 7.2; // font-size 13 bold, odhad šířky znaku
	let spatne = null;
	for (const klic of Object.keys(SPOTREBICE)) {
		nastavA(klic, 5);
		const s = SPOTREBICE[klic];
		const plaketaHtml = prvky.get('epv-a-plaketa').innerHTML;
		const rect = /<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="6" fill="#ffffff"/.exec(plaketaHtml);
		if (!rect) { spatne = `${klic}: chybí bílá plaketa`; break; }
		const sirkaPlakety = +rect[3];
		const text = `${s.nazev} — ${s.p} W`;
		const potrebnaSirka = text.length * SIRKA_ZNAKU;
		if (sirkaPlakety < potrebnaSirka) spatne = `${klic}: plaketa (${sirkaPlakety} px) je užší než text „${text}" (~${potrebnaSirka.toFixed(0)} px)`;
	}
	ok(spatne === null, spatne ?? 'u všech 4 spotřebičů je plaketa dost široká na celý text jména i wattáže');
	nastavA('klasicka', 5);
}

console.log('\n— rychlost ručičky elektroměru roste s příkonem —');
{
	ok(uhlovaRychlost(10) < uhlovaRychlost(20), 'LED (10 W) otáčí ručičkou pomaleji než lednička (20 W)');
	ok(uhlovaRychlost(20) < uhlovaRychlost(100), 'a lednička pomaleji než klasická žárovka (100 W)');
	ok(uhlovaRychlost(100) < uhlovaRychlost(2000), 'a klasická žárovka pomaleji než konvice (2000 W)');
	ok(uhlovaRychlost(2000) === 50, `konvice: 2000/40 = 50 °/s (${uhlovaRychlost(2000)})`);
	ok(uhlovaRychlost(10) === 0.25, `LED: 10/40 = 0,25 °/s (${uhlovaRychlost(10)})`);
	ok(uhlovaRychlost(20) === 0.5, `lednička: 20/40 = 0,5 °/s (${uhlovaRychlost(20)})`);
}

console.log('\n— formátování kWh a Kč (čárka, mezera po tisících, jen potřebné desetiny) —');
{
	ok(kwhText(15) === '15 kWh', `15 → „${kwhText(15)}"`);
	ok(kwhText(1.5) === '1,5 kWh', `1,5 → „${kwhText(1.5)}"`);
	ok(kwhText(1440) === '1 440 kWh', `1440 → „${kwhText(1440)}" (mezera po tisících)`);
	ok(kcText(75) === '75 Kč', `75 → „${kcText(75)}"`);
	ok(kcText(7.5) === '7,50 Kč', `7,5 → „${kcText(7.5)}"`);
	ok(kcText(7200) === '7 200 Kč', `7200 → „${kcText(7200)}"`);
	ok(kcText(810) === '810 Kč', `810 → „${kcText(810)}"`);
}

console.log('\n— dobaText/tHodinyText: čas pro dítě (min/h) i pro vzorec (desetinné h) —');
{
	ok(dobaText(0.25) === '15 min', `dobaText(0,25) → „${dobaText(0.25)}"`);
	ok(dobaText(0.5) === '30 min', `dobaText(0,5) → „${dobaText(0.5)}"`);
	ok(dobaText(1) === '1 h', `dobaText(1) → „${dobaText(1)}"`);
	ok(dobaText(1.25) === '1 h 15 min', `dobaText(1,25) → „${dobaText(1.25)}"`);
	ok(dobaText(5) === '5 h', `dobaText(5) → „${dobaText(5)}"`);
	ok(tHodinyText(0.25) === '0,25 h', `tHodinyText(0,25) → „${tHodinyText(0.25)}"`);
	ok(tHodinyText(5) === '5 h', `tHodinyText(5) → „${tHodinyText(5)}"`);
}

console.log('\n— odolnost: neplatné hodnoty posuvníku/spotřebiče nesmí shodit skript —');
{
	let spadlo = null;
	try {
		prepniA('neexistujici-klic');
		prvky.get('epv-a-t').value = '';
		for (const f of prvky.get('epv-a-t').posluchaci.input) f();
		prvky.get('epv-a-t').value = 'abc';
		for (const f of prvky.get('epv-a-t').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `skript spadl na neplatné hodnotě: ${spadlo}` : 'neplatný klíč spotřebiče i neplatná hodnota posuvníku skript nezhroutí');
	ok(!prvky.get('epv-a-info').innerHTML.includes('NaN'), 'a info panel neobsahuje „NaN"');
	nastavA('klasicka', 5);
}

console.log('\n— odolnost: platnaDoba nepadá na neplatných vstupech a vrací hodnotu v rozsahu —');
{
	const neplatneHodnoty = [NaN, undefined, null, '', 'abc', -1, 1000];
	let spatne = null;
	for (const hodnota of neplatneHodnoty) {
		try {
			const t = platnaDoba(hodnota, 0.25, 24, 0.25, 0.25);
			if (!(t >= 0.25 && t <= 24)) spatne = `platnaDoba(${hodnota}) vrátila ${t}, mimo rozsah 0,25–24`;
		} catch (e) {
			spatne = `platnaDoba(${hodnota}) SPADLA: ${e.message}`;
		}
	}
	ok(spatne === null, spatne ?? `platnaDoba nespadne na žádné z ${neplatneHodnoty.length} neplatných hodnot a vrátí smysluplné číslo`);
}

console.log('\n— nic neleze z obrázku A (viewBox 660×350) —');
{
	let mimo = null;
	for (const klic of Object.keys(SPOTREBICE)) {
		nastavA(klic, 24);
		for (const g of [prvky.get('epv-a-ikona'), prvky.get('epv-a-plaketa'), prvky.get('epv-a-info')]) {
			for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
				if (+t[1] < 5 || +t[1] > 655 || +t[2] < 10 || +t[2] > 345) mimo = `${g.id}: x=${t[1]} y=${t[2]} (${klic})`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku A — ${mimo}` : 'texty zůstávají uvnitř viewBoxu 660×350 pro všechny spotřebiče i krajní čas 24 h');
	nastavA('klasicka', 5);
}

// ── ČÁST B ───────────────────────────────────────────────────────────────
console.log('\n— scenaB: výchozích 5 h dává přesně příklad z výkladu (1,5 kWh místo 15 kWh) —');
{
	const v = scenaB(5);
	ok(v.whStara === 500 && v.whLed === 50, `denní spotřeba: stará 500 Wh, LED 50 Wh (${v.whStara}, ${v.whLed})`);
	ok(v.kwhStara === 15 && v.kwhLed === 1.5, `měsíční: stará 15 kWh, LED 1,5 kWh — „desetina“ (${v.kwhStara}, ${v.kwhLed})`);
	ok(v.kcStara === 75 && v.kcLed === 7.5, `cena: stará 75 Kč, LED 7,50 Kč (${v.kcStara}, ${v.kcLed})`);
	ok(v.rozdilKwh === 13.5, `úspora 13,5 kWh za měsíc (${v.rozdilKwh})`);
	ok(v.rozdilKcMesic === 67.5, `úspora 67,50 Kč za měsíc (${v.rozdilKcMesic})`);
	ok(v.rozdilKcRok === 810, `úspora 810 Kč za rok (${v.rozdilKcRok})`);
}

console.log('\n— scenaB: pro všech 24 hodin vychází roční úspora jako celé číslo (162 × t) —');
{
	let spatne = null;
	for (let t = 1; t <= 24; t++) {
		const v = scenaB(t);
		if (v.rozdilKcRok !== 162 * t) spatne = `t=${t} h: čekal jsem roční úsporu ${162 * t} Kč, vyšlo ${v.rozdilKcRok}`;
		if (!Number.isInteger(v.rozdilKcRok)) spatne = `t=${t} h: roční úspora ${v.rozdilKcRok} není celé číslo`;
	}
	ok(spatne === null, spatne ?? 'pro všech 24 poloh posuvníku je roční úspora přesně 162 × t Kč, vždy celé číslo');
}

console.log('\n— pure funkce vyskaSloupceB/geometrieSloupceB: měřítko z AKTUÁLNÍ dvojice cen, ne z pevného stropu —');
{
	// Nález nezávislé kontroly 14. 8. odpoledne: dřív se měřítko počítalo vůči
	// pevnému stropu 360 Kč (cena při 24 h), takže při nízkém t minimální
	// výška LED sloupec skoro srovnala se starou žárovkou. Teď se referenční
	// maximum posílá jako explicitní argument (VŽDY vyšší ze dvou cen —
	// u téhle dvojice vždy stará žárovka), takže poměr 10 : 1 platí PŘESNĚ
	// ve všech polohách, ne jen tam, kde je sloupec nad prahem CHART_MIN_PX.
	ok(vyskaSloupceB(75, 75) === CHART_MAX_PX, `cena rovná referenčnímu maximu vyplní celou výšku ${CHART_MAX_PX} px (${vyskaSloupceB(75, 75)})`);
	ok(vyskaSloupceB(0, 0) === CHART_MIN_PX, `degenerovaný vstup (referenční maximum 0) vrátí bezpečně minimum ${CHART_MIN_PX} px, ne NaN/Infinity z dělení nulou (${vyskaSloupceB(0, 0)})`);

	let spatne = null;
	for (let t = 1; t <= 24; t++) {
		const v = scenaB(t);
		const referencniMax = Math.max(v.kcStara, v.kcLed);
		const gStara = geometrieSloupceB(IKONA_CX.stara, v.kcStara, referencniMax);
		const gLed = geometrieSloupceB(IKONA_CX.led, v.kcLed, referencniMax);
		if (Math.abs(gStara.vyska - CHART_MAX_PX) > 1e-6) spatne = `t=${t} h: stará žárovka (pure funkce) nevyplňuje celou výšku ${CHART_MAX_PX} px (${gStara.vyska})`;
		if (Math.abs(gStara.vyska / gLed.vyska - 10) > 1e-6) spatne = `t=${t} h: pure funkce dává poměr ${(gStara.vyska / gLed.vyska).toFixed(6)}, čekal jsem přesně 10`;
		if (!(gLed.vyska > CHART_MIN_PX)) spatne = `t=${t} h: LED sloupec (${gLed.vyska}) je na hraně minima nebo pod ním — ořez by porušil poměr`;
	}
	ok(spatne === null, spatne ?? 'pure funkce dávají pro VŠECH 24 poloh identický výsledek: stará žárovka vždy plná výška, LED vždy přesně její desetina, žádný ořez');
}

console.log('\n— PŘESNÝ poměr výšek sloupců 10 : 1 ve VŠECH 24 polohách — měřeno ze SKUTEČNĚ VYKRESLENÉHO <rect> —');
{
	// Tohle je test, který musí spadnout nad vadnou verzí a projít nad opravenou
	// — měří se PŘÍMO vykreslený obsah #epv-b-sloupce (ne pure funkce výš,
	// která by mohla být v pořádku, i kdyby ji volající kód volal špatně —
	// přesně to se stalo: geometrieSloupceB dostal chybějící 3. argument a
	// pořád počítal se starým pevným stropem). ŽÁDNÝ „continue" — měří se
	// KAŽDÁ z 24 poloh, bez výjimky.
	let spatne = null;
	for (let t = 1; t <= 24; t++) {
		nastavB(t);
		const sloupceHtml = prvky.get('epv-b-sloupce').innerHTML;
		const vysky = [...sloupceHtml.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
			.map((m) => ({ x: +m[1], h: +m[4] }));
		if (vysky.length !== 2) { spatne = `t=${t} h: čekal jsem 2 sloupce, mám ${vysky.length}`; break; }
		// levý sloupec (nižší x) = stará žárovka, pravý = LED — dané rozvržením IKONA_CX
		const [staraR, ledR] = vysky[0].x < vysky[1].x ? vysky : [vysky[1], vysky[0]];
		const pomer = staraR.h / ledR.h;
		if (Math.abs(pomer - 10) > 0.2) spatne = `t=${t} h: vykreslená výška stará=${staraR.h.toFixed(2)} px, LED=${ledR.h.toFixed(2)} px → poměr ${pomer.toFixed(2)}, čekal jsem 10 ± 0,2`;
		if (Math.abs(staraR.h - CHART_MAX_PX) > 0.5) spatne = `t=${t} h: vykreslený sloupec staré žárovky (${staraR.h.toFixed(2)} px) nevyplňuje dostupnou výšku ${CHART_MAX_PX} px`;
	}
	ok(spatne === null, spatne ?? `ve všech 24 polohách posuvníku je vykreslený poměr výšek sloupců 10 : 1 (stará vyplní ${CHART_MAX_PX} px, LED přesně její desetinu) — přímo z <rect>, ne z pure funkce`);
	nastavB(5);
}

console.log('\n— scéna B opravdu překresluje sloupce a texty při pohybu posuvníkem —');
{
	nastavB(1);
	const sloupce1 = prvky.get('epv-b-sloupce').innerHTML;
	const shrnuti1 = prvky.get('epv-b-shrnuti').innerHTML;
	nastavB(20);
	const sloupce20 = prvky.get('epv-b-sloupce').innerHTML;
	const shrnuti20 = prvky.get('epv-b-shrnuti').innerHTML;
	ok(sloupce1 !== sloupce20, 'sloupce se při změně doby svícení překreslí');
	ok(shrnuti1 !== shrnuti20, 'a shrnutí (úspora) taky');
	const v20 = scenaB(20);
	ok(shrnuti20.includes(kcText(v20.rozdilKcRok)), `shrnutí při 20 h ukazuje roční úsporu ${kcText(v20.rozdilKcRok)}`);
	nastavB(5);
}

console.log('\n— ikony v části B mají STEJNOU velikost jako sebe navzájem (stará vs. LED) —');
{
	nastavB(5);
	const ikony = prvky.get('epv-b-ikony').innerHTML;
	const kola = [...ikony.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="(\d+)"/g)];
	ok(kola.length === 2, `dvě skleněné baňky ve scéně (${kola.length})`);
	ok(kola[0][3] === kola[1][3], `obě mají stejný poloměr skla (${kola[0][3]} px) — stejně velké, i když jiný příkon`);
	const paprsky = [...ikony.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)"/g)];
	ok(paprsky.length === 16, `dohromady 16 paprsků, 8 na žárovku (${paprsky.length})`);
}

console.log('\n— bílé plakety s jmény a wattážemi v části B se nepřekrývají a text se vejde —');
{
	nastavB(5);
	const SIRKA_ZNAKU = 7.2;
	const popisky = prvky.get('epv-b-popisky').innerHTML;
	const plakety = [...popisky.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="6" fill="#ffffff"/g)]
		.map((m) => ({ x: +m[1], w: +m[3] }));
	ok(plakety.length === 2, `dvě plakety se jmény (${plakety.length})`);
	const texty = ['klasická žárovka — 100 W', 'LED žárovka — 10 W'];
	plakety.forEach((pl, i) => {
		const potrebna = texty[i].length * SIRKA_ZNAKU;
		ok(pl.w >= potrebna, `plaketa ${i}: šířka ${pl.w} px stačí na text „${texty[i]}" (~${potrebna.toFixed(0)} px)`);
	});
	const [l, r] = plakety[0].x < plakety[1].x ? plakety : [plakety[1], plakety[0]];
	ok(l.x + l.w < r.x, `plakety se nepřekrývají (levá končí na ${(l.x + l.w).toFixed(1)}, pravá začíná na ${r.x})`);
}

console.log('\n— nic neleze z obrázku B (viewBox 660×460) —');
{
	let mimo = null;
	for (const t of [1, 5, 12, 24]) {
		nastavB(t);
		for (const g of [prvky.get('epv-b-ikony'), prvky.get('epv-b-popisky'), prvky.get('epv-b-sloupce'), prvky.get('epv-b-shrnuti')]) {
			for (const el of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
				if (+el[1] < 5 || +el[1] > 655 || +el[2] < 10 || +el[2] > 455) mimo = `${g.id}: text x=${el[1]} y=${el[2]} (t=${t})`;
			}
			for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
				const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
				if (x < 0 || x + w > 660 || y < 0 || y + h > 460) mimo = `${g.id}: obdélník ${x},${y} ${w}×${h} (t=${t})`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku B — ${mimo}` : 'texty i obdélníky zůstávají uvnitř viewBoxu 660×460 pro krajní i střední časy');
	nastavB(5);
}

console.log('\n— SKUTEČNÉ souřadnice sloupců proti panelu a proti ose žárovek (nález 14. 8. dopoledne) —');
{
	// Panel se čte NEZÁVISLE na skriptu — je to statická značka v HTML šabloně,
	// ne hodnota odvozená ze stejných konstant, které kreslí sloupce.
	//
	// Hledá se VÝHRADNĚ uvnitř bloku <svg id="epv-b-svg">…</svg> — komponenta
	// má DVĚ scény a KAŽDÁ má svůj bílý souhrnný <rect> se stejným vzorem
	// (x="14" width="632" rx="8" fill="#fff"). Hledání nad celým souborem by
	// tiše našlo panel SCÉNY A (nález kontroly: y=230) a test by pak měřil
	// úplně jinou dvojici čísel, než sám tvrdí — proto se nejdřív vyřízne blok
	// scény B a teprve v NĚM se panel hledá.
	const blokB = /<svg id="epv-b-svg"[\s\S]*?<\/svg>/.exec(zdroj)?.[0];
	ok(!!blokB, 'v souboru je nalezitelný celý blok <svg id="epv-b-svg">…</svg>');

	const panelVzor = /<rect x="14" y="(\d+)" width="632" height="(\d+)" rx="8" fill="#fff"/g;
	const panelKandidati = blokB ? [...blokB.matchAll(panelVzor)] : [];
	// Pojistka proti tichému výběru „prvního nalezeného": kdyby uvnitř scény B
	// kdykoli v budoucnu přibyl další <rect> se stejným vzorem, test se MUSÍ
	// ozvat jako nejednoznačný, ne si mlčky vybrat jeden z nich. Zpráva má TŘI
	// samostatné větve (0 / 1 / víc), aby ✅ na úspěchu nikdy netvrdila text
	// napsaný pro selhání (nález nezávislé kontroly: dřív ternária pro délku
	// 1 spadla do „NEJEDNOZNAČNO" větve, protože byla psaná jen pro 0 a >1).
	const panelZprava = panelKandidati.length === 1
		? 'uvnitř scény B nalezen právě jeden souhrnný panel, jak má být'
		: panelKandidati.length === 0
			? 'uvnitř scény B chybí souhrnný panel odpovídající očekávanému vzoru'
			: `uvnitř scény B je NEJEDNOZNAČNO — nalezeno ${panelKandidati.length} bílých panelů se stejným vzorem, test neví, který je ten pravý`;
	ok(panelKandidati.length === 1, panelZprava);
	// Sebekontrola zprávy: při úspěchu nesmí znít jako selhání, a naopak.
	ok(!(panelKandidati.length === 1 && /NEJEDNOZNAČNO|chybí souhrnný panel/.test(panelZprava)),
		'zpráva při úspěchu (právě 1 nalezený panel) netvrdí, že je nejednoznačno nebo že panel chybí');
	ok(!(panelKandidati.length !== 1 && !/NEJEDNOZNAČNO|chybí souhrnný panel/.test(panelZprava)),
		'zpráva při selhání (0 nebo víc než 1 panel) skutečně popisuje selhání, ne úspěch');

	const panelY = panelKandidati.length === 1 ? +panelKandidati[0][1] : NaN;
	ok(panelY === PANEL_B.y, `panel nalezený uvnitř scény B (y=${panelY}) sedí s konstantou PANEL_B.y (${PANEL_B.y}) používanou skriptem`);
	ok(panelY === 365, `panel scény B má opravdu y = 365, natvrdo ověřeno nezávisle na konstantě (${panelY})`);

	const POZADOVANA_MEZERA = 15; // px čistého prostoru mezi patou sloupce a horním okrajem panelu
	let spatne = null;
	if (Number.isNaN(panelY)) {
		spatne = 'panel scény B se nepodařilo jednoznačně určit — geometrie sloupců se dál neověřuje';
	} else {
		for (let t = 1; t <= 24 && spatne === null; t++) {
			nastavB(t);
			const sloupceHtml = prvky.get('epv-b-sloupce').innerHTML;
			const ikonyHtml = prvky.get('epv-b-ikony').innerHTML;
			const rekty = [...sloupceHtml.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
				.map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
			const kola = [...ikonyHtml.matchAll(/<circle cx="([-\d.]+)" cy="([-\d.]+)" r="(\d+)"/g)].map((m) => +m[1]);
			if (rekty.length !== 2) { spatne = `t=${t} h: čekal jsem 2 sloupce, mám ${rekty.length}`; break; }
			if (kola.length !== 2) { spatne = `t=${t} h: čekal jsem 2 žárovky, mám ${kola.length}`; break; }

			for (const r of rekty) {
				const dole = r.y + r.h;
				// (1) sloupec musí ležet CELÝ nad panelem, s rezervou — žádný překryv
				if (dole > panelY - POZADOVANA_MEZERA) spatne = `t=${t} h: sloupec končí na y=${dole.toFixed(1)}, panel začíná na y=${panelY} — mezera ${(panelY - dole).toFixed(1)} px je menší než požadovaných ${POZADOVANA_MEZERA} px`;
				// sloupec nesmí zasahovat POD paty (CHART_BASELINE) ani vzniknout nad ní obráceně
				if (Math.abs(dole - CHART_BASELINE) > 0.5) spatne = `t=${t} h: pata sloupce (y=${dole.toFixed(1)}) neleží na CHART_BASELINE (${CHART_BASELINE})`;
				// (3) i nejnižší sloupec musí být vidět jako sloupec, ne jako čárka
				if (r.h < CHART_MIN_PX - 0.5) spatne = `t=${t} h: sloupec vysoký jen ${r.h.toFixed(1)} px, méně než minimum ${CHART_MIN_PX} px`;
			}

			// (2) vodorovný střed KAŽDÉHO sloupce musí sedět přesně na ose SVÉ žárovky
			const stredy = rekty.map((r) => r.x + r.w / 2).sort((a, b) => a - b);
			const osy = [...kola].sort((a, b) => a - b);
			for (let i = 0; i < 2; i++) {
				if (Math.abs(stredy[i] - osy[i]) > 0.5) spatne = `t=${t} h: střed sloupce (x=${stredy[i].toFixed(1)}) není na ose žárovky (cx=${osy[i]})`;
			}
		}
	}
	ok(spatne === null, spatne ?? `pro všech 24 poloh posuvníku: sloupce leží celé nad panelem (≥ ${POZADOVANA_MEZERA} px mezera), paty na CHART_BASELINE, výška ≥ ${CHART_MIN_PX} px a vodorovný střed přesně na ose žárovky`);
	nastavB(5);
}

console.log('\n— odolnost B: neplatná hodnota posuvníku nezhroutí překreslení —');
{
	let spadlo = null;
	try {
		prvky.get('epv-b-t').value = '';
		for (const f of prvky.get('epv-b-t').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `překreslení B spadlo: ${spadlo}` : 'prázdná hodnota posuvníku nezhroutí prekresliB()');
	ok(!prvky.get('epv-b-shrnuti').innerHTML.includes('NaN'), 'shrnutí neobsahuje „NaN"');
	nastavB(5);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Elektrická práce a výkon', 'Spotřebič a jeho příkon', 'Stará vs. LED žárovka', 'klasická žárovka', 'lednička (20 W)', 'rychlovarná konvice']) {
		ok(html.includes(slovo), `v HTML je natvrdo „${slovo}"`);
	}
	ok(!html.includes('lednička (100 W)'), 'v HTML NENÍ natvrdo špatný údaj „lednička (100 W)"');
	ok(/id="epv-a-t"[^>]*min="1"[^>]*max="24"[^>]*value="5"/.test(html), 'posuvník doby provozu (A) má výchozí statické rozmezí 1–24 h, výchozí 5 h (JS ho po výběru konvice dočasně přepne)');
	ok(/id="epv-b-t"[^>]*min="1"[^>]*max="24"[^>]*value="5"/.test(html), 'posuvník doby svícení (B) jde 1–24 h, výchozí 5 h');
	ok(html.includes('5 Kč/kWh') || html.includes('5 Kč'), 'cena elektřiny je vidět i v popisném textu, ne jen ve výpočtu');
	ok(html.includes('desetina'), 've scéně je natvrdo vidět, že LED je vždy desetina ceny staré žárovky');
}

console.log(chyby === 0 ? '\n✅ Elektrická práce a výkon: vše sedí.' : `\n❌ Elektrická práce a výkon: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

#!/usr/bin/env node
// Ověření ElektrickaPraceVykonSimulace.astro — elektrická práce W = P·t a příkon P = U·I.
//
// Nejtišeji by lhaly dvě věci: (1) že by nějaká kombinace spotřebič×hodiny
// dala ošklivé desetinné číslo místo pěkného kWh/Kč — proto se prochází
// VŠECH 72 kombinací (3 příkony × 24 hodin) natvrdo; (2) že by obrázek žárovky
// v části B naznačoval „víc wattů = víc světla" — proto se porovnávají
// SKUTEČNĚ VYKRESLENÉ souřadnice paprsků obou žárovek, ne jen text.
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
	__CENA_KWH: CENA_KWH, __NAPETI: NAPETI,
} = svgA;
const { __scenaB: scenaB, __vyskaSloupceB: vyskaSloupceB, __MAX_CENA_B: MAX_CENA_B } = svgB;

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
		lednicka: { p: 100, ikona: 'lednicka' },
		konvice: { p: 2000, ikona: 'konvice' },
	};
	let spatne = null;
	for (const [klic, o] of Object.entries(ocek)) {
		const s = SPOTREBICE[klic];
		if (!s) { spatne = `chybí spotřebič „${klic}"`; break; }
		if (s.p !== o.p) spatne = `${klic}: čekal jsem příkon ${o.p} W, mám ${s.p} W`;
		if (s.ikona !== o.ikona) spatne = `${klic}: čekal jsem ikonu „${o.ikona}", mám „${s.ikona}"`;
	}
	ok(spatne === null, spatne ?? 'čtyři spotřebiče se správnými příkony: LED 10 W, klasická/lednička 100 W, konvice 2000 W');
	ok(Object.keys(SPOTREBICE).length === 4, `žádný spotřebič navíc (${Object.keys(SPOTREBICE).length})`);
}

console.log('\n— pure funkce: W = P·t, kWh za měsíc, cena, I = P/U —');
{
	ok(whZaDen(100, 5) === 500, `whZaDen(100,5) = 500 Wh (${whZaDen(100, 5)})`);
	ok(kwhZaMesic(100, 5) === 15, `kwhZaMesic(100,5) = 15 kWh — přesně příklad z výkladu (${kwhZaMesic(100, 5)})`);
	ok(cenaZaMesic(15) === 75, `cenaZaMesic(15) = 75 Kč — přesně příklad z výkladu (${cenaZaMesic(15)})`);
	ok(Math.abs(proudA(2000) - 2000 / 230) < 1e-9, 'proudA počítá I = P ÷ U');
	ok(kwhZaMesic(10, 5) === 1.5, `kwhZaMesic(10,5) = 1,5 kWh — desetina oproti klasické žárovce (${kwhZaMesic(10, 5)})`);
}

console.log('\n— VŠECH 72 kombinací (3 příkony × 24 hodin) dává čísla na nejvýš 1/2 desetinná místa —');
{
	let spatne = null, zkontrolovano = 0;
	for (const p of [10, 100, 2000]) {
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
	ok(zkontrolovano === 72, `zkontrolováno všech 72 kombinací (${zkontrolovano})`);
	ok(spatne === null, spatne ?? 've všech 72 kombinacích vychází kWh na nejvýš 1 des. místo a cena celá nebo na padesátník');
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
	ok(uhlovaRychlost(10) < uhlovaRychlost(100), 'LED (10 W) otáčí ručičkou pomaleji než klasická žárovka (100 W)');
	ok(uhlovaRychlost(100) < uhlovaRychlost(2000), 'a klasická žárovka pomaleji než konvice (2000 W)');
	ok(uhlovaRychlost(2000) === 50, `konvice: 2000/40 = 50 °/s (${uhlovaRychlost(2000)})`);
	ok(uhlovaRychlost(10) === 0.25, `LED: 10/40 = 0,25 °/s (${uhlovaRychlost(10)})`);
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

console.log('\n— sloupce ceny: výška odpovídá poměru k maximu (100 W, 24 h), LED je vždy nižší —');
{
	ok(MAX_CENA_B === 360, `maximální cena (100 W, 24 h) je 360 Kč (${MAX_CENA_B})`);
	ok(vyskaSloupceB(360) === 130, `sloupec na maximu vyplní celou výšku 130 px (${vyskaSloupceB(360)})`);
	ok(vyskaSloupceB(0) === 2, `i nulová cena má viditelný minimální sloupec 2 px, ne 0 (${vyskaSloupceB(0)})`);
	let spatne = null;
	for (let t = 1; t <= 24; t++) {
		const v = scenaB(t);
		if (!(vyskaSloupceB(v.kcLed) < vyskaSloupceB(v.kcStara))) spatne = `t=${t} h: sloupec LED (${vyskaSloupceB(v.kcLed)}) není nižší než sloupec staré žárovky (${vyskaSloupceB(v.kcStara)})`;
	}
	ok(spatne === null, spatne ?? 've všech 24 polohách je sloupec LED viditelně nižší než sloupec staré žárovky');
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

console.log('\n— nic neleze z obrázku B (viewBox 660×420) —');
{
	let mimo = null;
	for (const t of [1, 5, 12, 24]) {
		nastavB(t);
		for (const g of [prvky.get('epv-b-ikony'), prvky.get('epv-b-popisky'), prvky.get('epv-b-sloupce'), prvky.get('epv-b-shrnuti')]) {
			for (const el of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
				if (+el[1] < 5 || +el[1] > 655 || +el[2] < 10 || +el[2] > 415) mimo = `${g.id}: text x=${el[1]} y=${el[2]} (t=${t})`;
			}
			for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
				const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
				if (x < 0 || x + w > 660 || y < 0 || y + h > 420) mimo = `${g.id}: obdélník ${x},${y} ${w}×${h} (t=${t})`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku B — ${mimo}` : 'texty i obdélníky zůstávají uvnitř viewBoxu 660×420 pro krajní i střední časy');
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
	for (const slovo of ['Elektrická práce a výkon', 'Spotřebič a jeho příkon', 'Stará vs. LED žárovka', 'klasická žárovka', 'rychlovarná konvice']) {
		ok(html.includes(slovo), `v HTML je natvrdo „${slovo}"`);
	}
	ok(/id="epv-a-t"[^>]*min="1"[^>]*max="24"[^>]*value="5"/.test(html), 'posuvník doby provozu (A) jde 1–24 h, výchozí 5 h');
	ok(/id="epv-b-t"[^>]*min="1"[^>]*max="24"[^>]*value="5"/.test(html), 'posuvník doby svícení (B) jde 1–24 h, výchozí 5 h');
	ok(html.includes('5 Kč/kWh') || html.includes('5 Kč'), 'cena elektřiny je vidět i v popisném textu, ne jen ve výpočtu');
}

console.log(chyby === 0 ? '\n✅ Elektrická práce a výkon: vše sedí.' : `\n❌ Elektrická práce a výkon: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

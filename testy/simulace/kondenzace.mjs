#!/usr/bin/env node
// Ověření KondenzaceSimulace.astro — proč pára popálí hůř než vařící voda.
//
// Nejtišeji by tu lhalo MĚŘÍTKO: kdyby každý sloupec počítal výšku po svém,
// obrázek by mohl ukazovat srovnatelné sloupce a čísla pod ním by přitom
// tvrdila poměr skoro deset ku jedné. Celá scéna přitom stojí právě na tom
// srovnání — proto se měřítko měří jako první.
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

const svg = prvky.get('kon-svg');
const tepla = svg.__tepla;
const KONDENZACE = svg.__KONDENZACE;
const CHLADNUTI = svg.__CHLADNUTI;
const mnozstvi = prvky.get('kon-mnozstvi');
const krokP = prvky.get('kon-krok');

const MAX_M = +/id="kon-mnozstvi"[^>]*max="(\d+)"/.exec(zdroj)[1];
const MNOZSTVI = [];
for (let m = 1; m <= MAX_M; m++) MNOZSTVI.push(m);
const KROKY = [1, 2];

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (m, krok) => {
	mnozstvi.value = String(m); krokP.value = String(krok);
	for (const f of mnozstvi.posluchaci.input) f();
};

console.log('— JÁDRO: pára předá dvě porce, voda jednu —');
{
	for (const m of MNOZSTVI) {
		const t = tepla(m, 2);
		ok(t.voda.kondenzace === 0 && t.para.kondenzace > 0,
			`${m} g: voda nemá co kondenzovat (${t.voda.kondenzace} J), pára uvolní ${t.para.kondenzace} J`);
	}
	let vic = true, nejmensi = Infinity;
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		const t = tepla(m, krok);
		if (t.para.celkem <= t.voda.celkem) vic = false;
		nejmensi = Math.min(nejmensi, t.para.celkem / Math.max(t.voda.celkem, 1));
	}
	ok(vic, 'pára předá vždycky víc než voda — při každém množství i v obou krocích');
	ok(nejmensi >= 9, `a nikdy ne méně než 9× tolik (nejmenší naměřený poměr ${nejmensi.toFixed(2)}×)`);
	const t1 = tepla(1, 2);
	ok(Math.floor(t1.para.celkem / t1.voda.celkem) >= 9,
		`a to mnohem víc: 1 g vody ${t1.voda.celkem} J proti ${t1.para.celkem} J páry (${Math.floor(t1.para.celkem / t1.voda.celkem)}× tolik)`);
	// poměr nesmí záviset na množství — jinak by scéna tvrdila, že u velké
	// dávky je pára „relativně bezpečnější"
	const pomery = MNOZSTVI.map((m) => tepla(m, 2).para.celkem / tepla(m, 2).voda.celkem);
	ok(new Set(pomery.map((p) => p.toFixed(4))).size === 1,
		`a poměr je pro všechna množství stejný (${pomery[0].toFixed(2)}×) — nezáleží, kolik toho dopadne`);
}

console.log('\n— čísla sedí s výkladem —');
{
	ok(KONDENZACE === 2260, `skupenské teplo kondenzace ${KONDENZACE} J na gram = 2 260 kJ/kg, jako ve výkladu`);
	ok(CHLADNUTI === 273, `chladnutí ze 100 °C na 35 °C: 4,2 · 65 = ${CHLADNUTI} J na gram`);
	let cela = true, rostou = true;
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		const t = tepla(m, krok);
		for (const v of [t.voda.celkem, t.para.celkem, t.para.kondenzace, t.voda.chladnuti]) {
			if (!Number.isInteger(v)) cela = false;
		}
	}
	for (let i = 1; i < MNOZSTVI.length; i++) {
		if (tepla(MNOZSTVI[i], 2).para.celkem <= tepla(MNOZSTVI[i - 1], 2).para.celkem) rostou = false;
	}
	ok(cela, 'všechna tepla vycházejí v celých joulech');
	ok(rostou, `a s množstvím rostou (${MNOZSTVI.map((m) => tepla(m, 2).para.celkem).join(' → ')} J)`);
	ok(tepla(1, 2).para.celkem === KONDENZACE + CHLADNUTI,
		`celek páry je opravdu součet obou porcí (${KONDENZACE} + ${CHLADNUTI} = ${tepla(1, 2).para.celkem} J)`);
}

console.log('\n— krok děje: nejdřív kondenzace, pak chladnutí —');
{
	for (const m of MNOZSTVI) {
		const prvni = tepla(m, 1), druhy = tepla(m, 2);
		ok(prvni.voda.celkem === 0 && prvni.para.celkem === KONDENZACE * m,
			`${m} g hned po dopadu: voda ${prvni.voda.celkem} J, pára už ${prvni.para.celkem} J`);
		ok(druhy.voda.celkem > prvni.voda.celkem && druhy.para.celkem > prvni.para.celkem,
			'a po vychladnutí přibude oběma stejná druhá porce');
		ok(druhy.para.celkem - prvni.para.celkem === druhy.voda.celkem - prvni.voda.celkem,
			`ta druhá porce je u obou opravdu stejná (${druhy.voda.celkem} J) — liší se jen ta první`);
	}
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const sloupce = prvky.get('kon-sloupce');
const pocty = prvky.get('kon-pocty');
const obdelniky = () => [...sloupce.innerHTML.matchAll(/<rect x="(\d+)" y="(\d+)" width="80" height="(\d+)"/g)]
	.map((m) => ({ x: +m[1], y: +m[2], h: +m[3] }));
// Rozměry plátna a nadpis se čtou z HTML komponenty — to je pevná kotva,
// se kterou má smysl kreslené věci porovnávat (na rozdíl od čísel, která by
// si test vzal ze skriptu a pak je porovnal s ním samým).
const [SIRKA, VYSKA] = /viewBox="0 0 (\d+) (\d+)"/.exec(zdroj).slice(1).map(Number);
const NADPIS = (() => {
	const m = /<text x="\d+" y="(\d+)"[^>]*font-size="(\d+)"[^>]*>Kolik tepla[^<]*<\/text>/.exec(zdroj);
	return m ? { y: +m[1], f: +m[2] } : null;
})();
// odhad obrysu textu: šířka písmene ≈ 0,55 velikosti, patka pod účařím ≈ 0,25
const obrys = (t) => ({
	vlevo: t.x - (t.text.length * 0.55 * t.f) / 2,
	vpravo: t.x + (t.text.length * 0.55 * t.f) / 2,
	nahore: t.y - t.f,
	dole: t.y + 0.25 * t.f,
});
const textySloupcu = () => [...sloupce.innerHTML.matchAll(/<text x="([\d.]+)" y="(\d+)"[^>]*font-size="(\d+)"[^>]*>([^<]*)</g)]
	.map((m) => ({ x: +m[1], y: +m[2], f: +m[3], text: m[4] }));
// popisek pod sloupcem drží, která strana je která; sloupec je pod ním (x + 40)
const strana = (jmeno) => {
	const t = textySloupcu().find((x) => x.text.startsWith(jmeno) && x.y > 370);
	return t ? { ...t, sloupecX: t.x - 40 } : null;
};

console.log('\n— sloupce měří obě strany stejným metrem —');
{
	nastav(3, 2);
	const r = obdelniky();
	ok(r.length === 3, `ve scéně jsou tři porce: voda má jednu, pára dvě (${r.length} obdélníků)`);
	// který sloupec je která strana, řekne POPISEK pod ním — ne číslo natvrdo v testu
	const X_VODA = strana('voda').sloupecX;
	ok(r.filter((x) => x.x === X_VODA).length === 1 && r.filter((x) => x.x === strana('pára').sloupecX).length === 2,
		`pod sloupcem s jednou porcí je popisek „${strana('voda').text}", pod dvoudílným „${strana('pára').text}"`);
	// KLÍČOVÁ KOTVA: px na joule musí být týž metr pro obě strany. Měří se na
	// SKUTEČNĚ vykreslených obdélnících — kdyby se měřítko bralo z funkce
	// komponenty a porovnávalo se s ní samou, neměřilo by to nic.
	// Ke každé porci se joule dopočítá z čísel ověřených výše (2260 a 273 na gram).
	const porce = [];
	for (const m of MNOZSTVI) {
		nastav(m, 2);
		const rr = obdelniky();
		const voda = rr.find((x) => x.x === X_VODA);
		const paraSpodni = rr.filter((x) => x.x !== X_VODA).find((x) => x.y + x.h === 340);
		const paraHorni = rr.filter((x) => x.x !== X_VODA).find((x) => x.y + x.h !== 340);
		porce.push({ jmeno: `voda ${m} g chladnutí`, h: voda.h, J: CHLADNUTI * m });
		porce.push({ jmeno: `pára ${m} g chladnutí`, h: paraSpodni.h, J: CHLADNUTI * m });
		porce.push({ jmeno: `pára ${m} g kondenzace`, h: paraHorni.h, J: KONDENZACE * m });
	}
	// metr se odvodí z NEJVĚTŠÍ porce (tam je zaokrouhlení nejmíň znát)
	const nej = porce.reduce((a, b) => (b.J > a.J ? b : a));
	const metr = nej.h / nej.J;
	const nejhorsi = porce.reduce((a, b) =>
		(Math.abs(b.h - b.J * metr) > Math.abs(a.h - a.J * metr) ? b : a));
	ok(Math.abs(nejhorsi.h - nejhorsi.J * metr) <= 1,
		`měřítko je pro obě strany i všechna množství stejné (${metr.toFixed(5)} px na joule; `
		+ `nejvíc se liší „${nejhorsi.jmeno}": ${nejhorsi.h} px místo ${(nejhorsi.J * metr).toFixed(1)} px)`);
	// stejné teplo → stejně vysoká porce: chladnutí je u obou stran totéž
	let stejne = true;
	for (const m of MNOZSTVI) {
		const a = porce.find((p) => p.jmeno === `voda ${m} g chladnutí`);
		const b = porce.find((p) => p.jmeno === `pára ${m} g chladnutí`);
		if (a.h !== b.h) stejne = false;
	}
	ok(stejne, 'a stejná porce tepla (chladnutí) je u vody i u páry stejně vysoká');
	nastav(3, 2);
	ok(r.find((x) => x.x === X_VODA).h >= 3, `a i drobná porce vody je vidět (${r.find((x) => x.x === X_VODA).h} px, nejmíň 3 px)`);
	const vodaH = r.find((x) => x.x === X_VODA).h;
	const paraH = r.filter((x) => x.x !== X_VODA).reduce((a, x) => a + x.h, 0);
	ok(paraH > vodaH * 5, `sloupec páry je v obrázku mnohonásobně vyšší (${vodaH} px proti ${paraH} px)`);
	// měřítko je STÁLÉ: při větší dávce sloupce rostou, poměr zůstává
	nastav(1, 2);
	const maly = obdelniky().filter((x) => x.x !== X_VODA).reduce((a, x) => a + x.h, 0);
	nastav(5, 2);
	const velky = obdelniky().filter((x) => x.x !== X_VODA).reduce((a, x) => a + x.h, 0);
	ok(velky > maly, `s množstvím sloupce rostou (${maly} px → ${velky} px) — měřítko se pod nimi nepřenastavuje`);
}

console.log('\n— sloupce stojí na kůži a vejdou se do obrázku —');
{
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		nastav(m, krok);
		const r = obdelniky();
		const naKuzi = r.filter((x) => x.y + x.h === 340).length;
		const skladane = r.filter((x) => x.y + x.h !== 340).length;
		ok(naKuzi >= 1 && naKuzi + skladane === r.length,
			`${m} g, krok ${krok}: porce stojí na kůži (y=340) a další na sobě (${naKuzi} + ${skladane})`);
		if (r.some((x) => x.y < 40)) ok(false, `sloupec přetekl horní okraj (y=${Math.min(...r.map((x) => x.y))})`);
	}
	nastav(5, 2);
	const r = obdelniky();
	ok(r.every((x) => x.y >= 40), `ani největší sloupec nepřeteče nahoru (nejvýš y=${Math.min(...r.map((x) => x.y))})`);
	const yCisel = [...sloupce.innerHTML.matchAll(/<text[^>]*y="(\d+)"/g)].map((m) => +m[1]);
	ok(yCisel.every((y) => y >= 20 && y <= VYSKA), `a všechna čísla u sloupců zůstanou v obrázku (y = ${Math.min(...yCisel)}–${Math.max(...yCisel)})`);
}

// ── Tenhle oddíl vznikl z POHLEDU na vyrenderovaný obrázek (13. 8. 2026).
// Měřidlo do té doby svítilo zeleně, a přitom popisky „voda (…)" a „pára (…)"
// v obrázku vůbec nebyly vidět: ležely na y = 392 a bílý neprůhledný panel
// počitadla (y = 380 až 432) je celé přikryl. Žák tak nepoznal, který sloupec
// je která strana — tedy přesně to, o čem celá scéna je.
console.log('\n— nic není zakryté a všechno se vejde do obrázku —');
{
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		nastav(m, krok);
		const p = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)"/.exec(pocty.innerHTML);
		const panel = { x: +p[1], y: +p[2], w: +p[3], h: +p[4] };
		const texty = textySloupcu();
		// panel je bílý a neprůhledný: co se do jeho pruhu trefí, to žák neuvidí
		const zakryte = texty.filter((t) => {
			const o = obrys(t);
			return o.dole > panel.y && o.nahore < panel.y + panel.h
				&& o.vpravo > panel.x && o.vlevo < panel.x + panel.w;
		});
		ok(zakryte.length === 0,
			`${m} g, krok ${krok}: panel počitadla nic nepřikrývá${zakryte.length ? ` — mizí pod ním ${zakryte.map((t) => `„${t.text}"`).join(', ')}` : ''}`);
		if (m === 5 && krok === 2) {
			const venku = texty.filter((t) => {
				const o = obrys(t);
				return o.vlevo < 0 || o.vpravo > SIRKA || o.nahore < 0 || o.dole > VYSKA;
			});
			ok(venku.length === 0, `a žádný popisek nevyleze z obrázku ${SIRKA}×${VYSKA}${venku.length ? ` (${venku.map((t) => `„${t.text}"`).join(', ')})` : ''}`);
			ok(panel.y + panel.h <= VYSKA, `i panel počitadla se vejde (končí na y=${panel.y + panel.h} z ${VYSKA})`);
			// nadpis je pevná kotva psaná v HTML — čísla nad sloupci na něj nesmí
			ok(NADPIS !== null, 'obrázek má nadpis napsaný v HTML');
			ok(texty.every((t) => obrys(t).nahore > NADPIS.y + 0.25 * NADPIS.f),
				`a ani nejvyšší sloupec svým číslem nevleze do nadpisu (nadpis končí na y=${NADPIS.y})`);
		}
	}
	// popisky obou stran vedle sebe: nesmí se o sebe otřít
	nastav(5, 2);
	ok(obrys(strana('voda')).vpravo < obrys(strana('pára')).vlevo,
		`popisky „${strana('voda').text}" a „${strana('pára').text}" se nepřekrývají`);
}

console.log('\n— na kůži leží stejná dávka na obou stranách —');
{
	const KAPKA = 18;   // šířka kapky v px (musí se vejít vedle sebe, ne přes sebe)
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		nastav(m, krok);
		const dopad = /<g id="kon-dopad">([\s\S]*?)<\/g>/.exec(sloupce.innerHTML)[1];
		const kapky = [...dopad.matchAll(/<path d="M([\d.]+) (\d+)/g)].map((k) => ({ cx: +k[1], y: +k[2] }));
		const vlevo = kapky.filter((k) => k.cx < SIRKA / 2).length;
		const vpravo = kapky.filter((k) => k.cx > SIRKA / 2).length;
		ok(vlevo === m && vpravo === m,
			`${m} g, krok ${krok}: na kůži leží ${vlevo} kapek u vody a ${vpravo} u páry — na obou stranách stejně`);
		ok(!dopad.includes('<ellipse'), `${m} g, krok ${krok}: pára je po kondenzaci nakreslená jako voda, ne jako obláček`);
		// kapky stojí v jedné řadě na kůži, vejdou se do obrázku a nelezou po sobě
		ok(new Set(kapky.map((k) => k.y)).size === 1, 'všechny kapky leží na kůži v jedné řadě');
		const kraj = kapky.filter((k) => k.cx - KAPKA / 2 < 0 || k.cx + KAPKA / 2 > SIRKA);
		ok(kraj.length === 0, `a žádná nevyčnívá z obrázku (nejkrajnější cx = ${Math.min(...kapky.map((k) => k.cx))} a ${Math.max(...kapky.map((k) => k.cx))})`);
		const serazene = kapky.map((k) => k.cx).sort((a, b) => a - b);
		let nejblize = Infinity;
		for (let i = 1; i < serazene.length; i++) nejblize = Math.min(nejblize, serazene[i] - serazene[i - 1]);
		ok(m === 1 || nejblize >= KAPKA, `a nepřekrývají se navzájem (nejmenší rozestup ${nejblize} px)`);
	}
	// kapky patří ke své straně: nesmí zasahovat do sloupce ani přes dělicí čáru
	nastav(5, 2);
	const dopad = /<g id="kon-dopad">([\s\S]*?)<\/g>/.exec(sloupce.innerHTML)[1];
	const kapky = [...dopad.matchAll(/<path d="M([\d.]+) /g)].map((k) => +k[1]);
	const sloupceX = obdelniky().map((o) => o.x);
	const doSloupce = kapky.filter((cx) => sloupceX.some((x) => cx + KAPKA / 2 > x && cx - KAPKA / 2 < x + 80));
	ok(doSloupce.length === 0, `a žádná kapka neleze do sloupce tepla (${doSloupce.length} kolizí)`);
}

console.log('\n— popisek porce sedí ve své porci —');
{
	// Pozn.: svislé doladění účaří o pár pixelů (y + h/2 + 5 místo − 5) je
	// kosmetika — popisek zůstane uvnitř obdélníku a nic se tím nerozbije,
	// proto se to schválně neměří. Měří se, že popisek ze své porce NEVYLEZE.
	for (const m of MNOZSTVI) {
		nastav(m, 2);
		const r = obdelniky();
		const uvnitr = textySloupcu().filter((t) => t.text === 'chladnutí' || t.text === 'kondenzace');
		// v nízké porci se popisek vynechá (nevešel by se) — musí ho mít každá,
		// do které se vejde, a nesmí přitom vylézt ven ze svého obdélníku
		const dost = r.filter((x) => x.h >= 18);
		ok(uvnitr.length === dost.length,
			`${m} g: popsané jsou právě porce, do kterých se popisek vejde (${uvnitr.map((t) => t.text).join(', ') || 'žádná'} k ${dost.length} dost vysokým)`);
		for (const t of uvnitr) {
			const domov = r.find((x) => t.x > x.x && t.x < x.x + 80 && t.y > x.y && t.y < x.y + x.h);
			ok(domov !== undefined,
				`a „${t.text}" leží uvnitř svého obdélníku${domov ? '' : ` — je na (${t.x}, ${t.y}) mimo něj`}`);
		}
	}
}

console.log('\n— 0 J se nekreslí jako sloupec —');
{
	// Hned po dopadu voda nepředala nic. Kdyby se i nula nakreslila (byť jako
	// třípixelový proužek), obrázek by tvrdil, že už nějaké teplo předala.
	for (const m of MNOZSTVI) {
		nastav(m, 1);
		const X_VODA = strana('voda').sloupecX;
		const vodaR = obdelniky().filter((x) => x.x === X_VODA);
		ok(vodaR.length === 0, `${m} g, krok 1: voda nemá žádný sloupec (${vodaR.length}) — předala 0 J`);
		ok(textySloupcu().some((t) => t.text === '0 J' && t.x === X_VODA + 40),
			'a nad jejím prázdným místem stojí 0 J');
	}
}

console.log('\n— výpočet pod obrázkem počítá totéž —');
{
	const vypocet = prvky.get('kon-vypocet');
	for (const m of MNOZSTVI) {
		nastav(m, 2);
		const t = tepla(m, 2);
		const cisla = [...vypocet.innerHTML.matchAll(/= ([-\d.,]+) J/g)].map((x) => x[1]);
		ok(cisla.length === 2, `${m} g: výpočet uvádí obě porce (${cisla.join(' a ')} J)`);
		ok(cisla[0] === String(t.para.kondenzace) && cisla[1] === String(t.voda.chladnuti),
			`a čísla sedí se sloupci: kondenzace ${cisla[0]} J, chladnutí ${cisla[1]} J`);
		ok(cisla.every((c) => /^\d+$/.test(c)), 'a jsou to celá čísla — žádné zlomky ani zápory');
		ok(vypocet.innerHTML.includes(`${KONDENZACE} × ${m} =`) && vypocet.innerHTML.includes(`65 × ${m} =`),
			`a násobí se opravdu ${m} (tolik, kolik je nastaveno na posuvníku)`);
	}
}

console.log('\n— slova odpovídají číslům —');
{
	// Kdyby se obě věty prohodily, čísla by seděla dál a test by nic nepoznal.
	// Proto se měří ROZPOR: co text tvrdí, proti tomu, kolik už kůže dostala.
	const stav = prvky.get('kon-stav');
	const outKrok = prvky.get('kon-out-krok');
	for (const m of MNOZSTVI) for (const krok of KROKY) {
		nastav(m, krok);
		const t = tepla(m, krok);
		const slova = `${stav.textContent} ${outKrok.textContent}`.toLowerCase();
		if (t.voda.celkem === 0) {
			ok(!/vychladl/.test(slova) && /zkondenzoval/.test(slova),
				`${m} g, krok ${krok}: voda předala 0 J — text mluví o kondenzaci a netvrdí, že už vychladlo`);
		} else {
			ok(/vychladl/.test(slova) && !/nepředala nic/.test(slova),
				`${m} g, krok ${krok}: voda předala ${t.voda.celkem} J — text říká, že vychladlo, a netvrdí „nepředala nic"`);
		}
	}
}

console.log('\n— počitadlo říká totéž co sloupce —');
{
	for (const [m, krok] of [[1, 1], [3, 2], [5, 2]]) {
		nastav(m, krok);
		const t = tepla(m, krok);
		const c = [...pocty.innerHTML.matchAll(/(\d+) J/g)].map((x) => +x[1]);
		ok(c[0] === t.voda.celkem && c[1] === t.para.celkem,
			`${m} g, krok ${krok} → voda ${c[0]} J, pára ${c[1]} J`);
	}
	nastav(1, 1);
	ok(pocty.innerHTML.includes('stejnou teplotu 100 °C'),
		'a připomíná to podstatné: obojí má stejnou teplotu');
	nastav(1, 2);
	const kolikrat = +/víc než (\d+)×/.exec(pocty.innerHTML)[1];
	const t = tepla(1, 2);
	ok(kolikrat === Math.floor(t.para.celkem / t.voda.celkem),
		`poměr v počitadle („víc než ${kolikrat}×") je přesně dolní celá část skutečného ${(t.para.celkem / t.voda.celkem).toFixed(2)}×`);
}

console.log('\n— čeština ve výpočtu pod obrázkem —');
{
	// Nález kontrolora: stálo tam „Kondenzace 1 gram páry uvolní…" — 1. pád po
	// slově, které chce 2. pád. Věta je přeformulovaná; tady se hlídá, že se
	// vadný tvar nevrátí a že čísla ve větě sedí s modelem.
	const vypocet = prvky.get('kon-vypocet');
	let bezPadu = true, cislaSedi = true;
	for (const m2 of MNOZSTVI) {
		nastav(m2, 2);
		if (/Kondenzace \d+ gram/.test(vypocet.innerHTML)) bezPadu = false;
		const v = /(\d+) × (\d+) = (\d+) J/.exec(vypocet.innerHTML);
		if (!v || +v[1] * +v[2] !== +v[3] || +v[3] !== KONDENZACE * m2) cislaSedi = false;
	}
	ok(bezPadu, 'věta už nezačíná „Kondenzace 1 gram…" — pád je opravený v každém množství');
	ok(cislaSedi, 'a rozepsaný součin kondenzace ve větě sedí s modelem');
}

console.log('\n— čeština: gram, gramy, gramů —');
{
	const gramu = svg.__gramu;
	const ocekavane = { 1: '1 gram', 2: '2 gramy', 4: '4 gramy', 5: '5 gramů' };
	for (const [n, tvar] of Object.entries(ocekavane)) ok(gramu(+n) === tvar, `${n} → „${gramu(+n)}"`);
	let vsude = true;
	for (const m of MNOZSTVI) {
		nastav(m, 2);
		if (/(?:^|[^\d])[234] gramů/.test(sloupce.innerHTML) || /(?:^|[^\d])1 gram[yů]/.test(sloupce.innerHTML)) vsude = false;
	}
	ok(vsude, 'a u sloupců nevyjde špatný tvar při žádném množství');
}

console.log(chyby === 0 ? '\n✅ Kondenzace: vše sedí.' : `\n❌ Kondenzace: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

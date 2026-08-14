#!/usr/bin/env node
// Ověření TuhnutiSimulace.astro — křivka chladnutí s plató.
//
// Nejtišeji by tu lhalo plató: kdyby teplota během tuhnutí byť trochu
// klesala, scéna by učila pravý opak výkladu („během tuhnutí se teplota
// nemění, uvolňuje se skupenské teplo") — a graf by přitom vypadal skoro
// stejně. Proto se vodorovnost měří i na SOUŘADNICÍCH bodů křivky, ne jen
// na čísle teploty.
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

const svg = prvky.get('tuh-svg');
const stav = svg.__stav;
const teplotaTuhnuti = svg.__teplotaTuhnuti;
const DELKA_TUHNUTI = svg.__DELKA_TUHNUTI;
const xCasu = svg.__xCasu;
const yTeploty = svg.__yTeploty;
const casSlider = prvky.get('tuh-cas');
const sulSlider = prvky.get('tuh-sul');

// Rozsahy posuvníků se čtou ZE ZDROJE — kdyby se v HTML změnily, test musí
// projít nové stavy, ne dál zkoušet ty staré opsané napevno.
const MAX_CAS = +/id="tuh-cas"[^>]*max="(\d+)"/.exec(zdroj)[1];
const CASY = [];
for (let c = 0; c <= MAX_CAS; c++) CASY.push(c);
const MAX_SUL = +/id="tuh-sul"[^>]*max="(\d+)"/.exec(zdroj)[1];
const SOLI = [];
for (let s = 0; s <= MAX_SUL; s++) SOLI.push(s);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (cas, sul) => {
	casSlider.value = String(cas); sulSlider.value = String(sul);
	for (const f of casSlider.posluchaci.input) f();
};

console.log('— úseky děje leží tam, kde se dají změřit —');
{
	// Bez téhle kotvy se test uměl ZASEKNOUT: mutace `-5 * sul` → `-5 / sul`
	// dala při nule −Infinity, z toho `zacatekTuhnuti = Infinity` a smyčka
	// „dokud nezačne tuhnout" už neskončila. Měřidlo se musí ubránit
	// i nesmyslné hodnotě — jinak místo nálezu jen visí.
	let rozumne = true, kde = '';
	for (const sul of SOLI) {
		const s = stav(0, sul);
		if (![s.zacatekTuhnuti, s.konecTuhnuti].every((c) => Number.isInteger(c) && c >= 0 && c <= MAX_CAS)) {
			rozumne = false;
			kde ||= `sůl ${sul}: začátek ${s.zacatekTuhnuti}, konec ${s.konecTuhnuti}`;
		}
	}
	ok(rozumne, `tuhnutí začíná i končí v celé minutě uvnitř pokusu${kde ? ` (${kde})` : ''}`);
	if (!rozumne) {
		console.log('\n❌ Tuhnutí: nesmyslné hranice úseků — další kontroly by se na nich zacyklily.');
		process.exit(1);
	}
}

console.log('\n— JÁDRO: během tuhnutí teplota stojí —');
{
	for (const sul of SOLI) {
		const s0 = stav(0, sul);
		const behem = [];
		for (let c = s0.zacatekTuhnuti; c < s0.konecTuhnuti; c++) behem.push(stav(c, sul).teplota);
		ok(behem.length === DELKA_TUHNUTI && new Set(behem).size === 1,
			`sůl ${sul}: po ${DELKA_TUHNUTI} minuty stojí teplota na ${behem[0]} °C (${behem.join(', ')})`);
		// KOTVA: porovnává se s číslem VYPSANÝM v počitadle pro žáka, ne s toutéž
		// funkcí komponenty (behem[0] === teplotaTuhnuti(sul) neměřilo nic).
		nastav(0, sul);
		const napsano = /teplota tuhnutí této vody: (-?\d+) °C/.exec(
			prvky.get('tuh-pocty').innerHTML.replace(/−/g, '-'));
		ok(napsano !== null && behem[0] === +napsano[1],
			`a je to přesně teplota tuhnutí napsaná v počitadle (${napsano?.[1]} °C)`);
	}
	// před plató i po něm teplota klesat MUSÍ — jinak by scéna neukazovala nic
	for (const sul of SOLI) {
		const s0 = stav(0, sul);
		let predKlesa = true, poKlesa = true;
		for (let c = 1; c <= s0.zacatekTuhnuti; c++) if (stav(c, sul).teplota >= stav(c - 1, sul).teplota) predKlesa = false;
		for (let c = s0.konecTuhnuti + 1; c <= MAX_CAS; c++) if (stav(c, sul).teplota >= stav(c - 1, sul).teplota) poKlesa = false;
		ok(predKlesa && poKlesa, `sůl ${sul}: před tuhnutím i po něm teplota klesá — stojí jen během něj`);
	}
	let cela = true;
	for (const sul of SOLI) for (const c of CASY) {
		const s = stav(c, sul);
		if (![s.teplota, s.led].every(Number.isInteger)) cela = false;
	}
	ok(cela, 'a všechna čísla (teplota i podíl ledu) jsou celá');
}

console.log('\n— sůl posune teplotu tuhnutí, ale tuhnutí nezkrátí —');
{
	const teploty = SOLI.map((s) => teplotaTuhnuti(s));
	let klesa = true;
	for (let i = 1; i < teploty.length; i++) if (teploty[i] >= teploty[i - 1]) klesa = false;
	ok(klesa, `víc soli = nižší teplota tuhnutí: ${teploty.join(' → ')} °C`);
	ok(teplotaTuhnuti(0) === 0, 'čistá voda mrzne přesně při 0 °C');
	const delky = SOLI.map((s) => {
		const st = stav(0, s);
		return st.konecTuhnuti - st.zacatekTuhnuti;
	});
	ok(new Set(delky).size === 1, `samo tuhnutí trvá pořád stejně dlouho (${delky.join(', ')} min) — sůl ho neurychlí`);
	const zacatky = SOLI.map((s) => stav(0, s).zacatekTuhnuti);
	let pozdeji = true;
	for (let i = 1; i < zacatky.length; i++) if (zacatky[i] <= zacatky[i - 1]) pozdeji = false;
	ok(pozdeji, `slaná voda začne tuhnout později: ${zacatky.join(' → ')}. minuta`);
	ok(SOLI.every((s) => stav(MAX_CAS, s).teplota === stav(MAX_CAS, 0).teplota),
		`a na konci pokusu jsou všechny na téže teplotě (${stav(MAX_CAS, 0).teplota} °C) — chladíme pořád stejně`);
}

console.log('\n— ledu přibývá jen během tuhnutí —');
{
	for (const sul of SOLI) {
		const s0 = stav(0, sul);
		let pred = true, roste = true, po = true;
		for (let c = 0; c < s0.zacatekTuhnuti; c++) if (stav(c, sul).led !== 0) pred = false;
		for (let c = s0.zacatekTuhnuti + 1; c < s0.konecTuhnuti; c++) {
			if (stav(c, sul).led <= stav(c - 1, sul).led) roste = false;
		}
		for (let c = s0.konecTuhnuti; c <= MAX_CAS; c++) if (stav(c, sul).led !== 100) po = false;
		ok(pred && roste && po, `sůl ${sul}: dokud voda jen chladne, led žádný; během tuhnutí přibývá; potom je ho 100 %`);
	}
	ok(stav(stav(0, 0).konecTuhnuti, 0).led === 100, 'v okamžiku, kdy tuhnutí skončí, je ztuhlé úplně všechno');
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const krivka = prvky.get('tuh-krivka');
const sklenice = prvky.get('tuh-sklenice');
const pocty = prvky.get('tuh-pocty');
const bodyKrivky = () => (/<polyline points="([^"]*)"/.exec(krivka.innerHTML)?.[1] ?? '')
	.split(' ').filter(Boolean).map((b) => b.split(',').map(Number));

console.log('\n— graf ukazuje totéž co model —');
{
	nastav(MAX_CAS, 0);
	const b = bodyKrivky();
	ok(b.length === MAX_CAS + 1, `křivka má bod za každou minutu (${b.length} bodů za ${MAX_CAS} minut)`);
	let sedi = true;
	for (let c = 0; c <= MAX_CAS; c++) {
		if (b[c][0] !== xCasu(c) || b[c][1] !== yTeploty(stav(c, 0).teplota)) sedi = false;
	}
	ok(sedi, 'a každý bod leží tam, kam patří podle teploty — graf a čísla se nemůžou rozejít');
	// plató musí být VODOROVNÉ i v souřadnicích, ne jen v čísle teploty
	for (const sul of SOLI) {
		nastav(MAX_CAS, sul);
		const bs = bodyKrivky();
		const s0 = stav(0, sul);
		const y = [];
		for (let c = s0.zacatekTuhnuti; c <= s0.konecTuhnuti; c++) y.push(bs[c][1]);
		ok(new Set(y).size === 1, `sůl ${sul}: úsek tuhnutí je v grafu vodorovný (y = ${y.join(', ')})`);
	}
	// a se solí musí ležet NÍŽ (v SVG níž = větší y)
	const yPlato = SOLI.map((sul) => {
		nastav(MAX_CAS, sul);
		return bodyKrivky()[stav(0, sul).zacatekTuhnuti][1];
	});
	let nize = true;
	for (let i = 1; i < yPlato.length; i++) if (yPlato[i] <= yPlato[i - 1]) nize = false;
	ok(nize, `se solí se vodorovný úsek posouvá dolů pod nulu (y = ${yPlato.join(' → ')})`);
	// křivka roste s časem, ne že by se kreslila celá dopředu
	nastav(2, 0);
	ok(bodyKrivky().length === 3, 've 2. minutě jsou nakreslené tři body — žák vidí děj postupně, ne hotový graf');
	ok(krivka.innerHTML.includes('<circle'), 'a poslední bod je zvýrazněný kolečkem');
}

console.log('\n— měřítko grafu sedí s popsanými osami —');
{
	// Doměřeno podle mutačního testu: kontroly výše si braly xCasu i yTeploty
	// z komponenty, takže se s ní NEMOHLY rozejít. Osa je přitom v HTML
	// napsaná napevno (20 °C u y=75, 0 °C u y=195, −20 °C u y=315) — a právě
	// s těmi popisky musí měřítko souhlasit, jinak graf ukazuje jiná čísla,
	// než jaká má u sebe napsaná.
	// Popisky os jsou v HTML napevno — čtou se ODTUD, ne z komponenty, aby se
	// měřítko a napsaná čísla nemohla rozejít.
	let osaSedi = true, kdeOsa = '';
	for (const m of zdroj.matchAll(/<text[^>]*y="(\d+)"[^>]*>(−?-?\d+) °C<\/text>/g)) {
		const t = +m[2].replace('−', '-');
		if (yTeploty(t) + 5 !== +m[1]) { osaSedi = false; kdeOsa ||= `${t} °C: popisek y=${m[1]}, měřítko ${yTeploty(t) + 5}`; }
	}
	ok(osaSedi, `měřítko sedí s popisky teplot napsanými na ose${kdeOsa ? ` (${kdeOsa})` : ''}`);
	const popisky = [...zdroj.matchAll(/<text[^>]*y="(\d+)"[^>]*>(−?-?\d+) °C<\/text>/g)].length;
	ok(popisky >= 5, `a popisků je na ose ${popisky} — stupnice je opravdu popsaná`);
	// časová osa musí mít dělení s čísly, jinak z grafu nepoznáš, kolik minut uplynulo
	let casSedi = true, kdeCas = '';
	const osaCas = /<g id="tuh-osa-cas"[\s\S]*?<\/g>/.exec(zdroj)[0];
	const znacky = [...osaCas.matchAll(/<text x="(\d+)"[^>]*>(\d+)<\/text>/g)];
	for (const m of znacky) {
		if (xCasu(+m[2]) !== +m[1]) { casSedi = false; kdeCas ||= `${m[2]}. minuta: značka x=${m[1]}, měřítko ${xCasu(+m[2])}`; }
	}
	ok(znacky.length >= 5 && casSedi,
		`časová osa má ${znacky.length} popsaných dílků a sedí s měřítkem${kdeCas ? ` (${kdeCas})` : ''}`);
	ok(yTeploty(-20) < 340, `spodek stupnice (y=${yTeploty(-20)}) leží nad osou času (y=340) — poslední bod do ní nezapadne`);
	ok(xCasu(0) === 60, `nultá minuta začíná na svislé ose (x=${xCasu(0)})`);
	ok(xCasu(MAX_CAS) <= 410, `a poslední minuta se vejde nad vodorovnou osu (x=${xCasu(MAX_CAS)})`);
	const rozestupy = [];
	for (let c = 1; c <= MAX_CAS; c++) rozestupy.push(xCasu(c) - xCasu(c - 1));
	ok(new Set(rozestupy).size === 1 && rozestupy[0] > 0,
		`minuty jsou na ose rovnoměrně a zleva doprava (po ${rozestupy[0]} px)`);
	// a celý pokus musí doběhnout přesně na spodní hranu osy — jinak by se
	// změnila délka tuhnutí a nikdo by si toho nevšiml
	ok(SOLI.every((s) => stav(MAX_CAS, s).teplota === -20),
		'pokus končí u všech tří vzorků přesně na −20 °C, tedy na spodku popsané stupnice');
	const platoDelky = SOLI.map((s) => {
		const st = stav(0, s);
		let n = 0;
		for (const c of CASY) if (stav(c, s).teplota === st.tuhne) n++;
		return n;
	});
	ok(platoDelky.every((d) => d >= 4), `a vodorovný úsek je v grafu pořádně vidět (${platoDelky.join(', ')} bodů)`);
}

console.log('\n— popisky nesmí tvrdit něco jiného než scéna —');
{
	// Taky z mutačního testu: obrácené podmínky u popisku sklenice i u hlášek
	// prošly bez povšimnutí — voda by se hlásila jako led a naopak.
	const s0 = stav(0, 0);
	nastav(0, 0);
	ok(sklenice.innerHTML.includes('>voda<'), 'dokud led není, stojí u sklenice „voda"');
	ok(!sklenice.innerHTML.includes('led 0 %'), 'a rozhodně ne „led 0 %"');
	ok(prvky.get('tuh-stav').textContent.includes('kapalná'), 'a hláška mluví o kapalině');
	nastav(s0.zacatekTuhnuti + 1, 0);
	ok(sklenice.innerHTML.includes(`led ${stav(s0.zacatekTuhnuti + 1, 0).led} %`),
		`během tuhnutí je u sklenice podíl ledu (${stav(s0.zacatekTuhnuti + 1, 0).led} %)`);
	ok(prvky.get('tuh-stav').textContent.includes('ANI NEHNE'), 'a hláška říká, že teplota stojí');
	nastav(MAX_CAS, 0);
	ok(sklenice.innerHTML.includes('celá sklenice: led'), 'na konci je u sklenice „celá sklenice: led"');
	ok(!/led \d+ %/.test(sklenice.innerHTML), 'a už ne procenta — je hotovo');
	ok(prvky.get('tuh-stav').textContent.includes('Všechno už je led'), 'a hláška mluví o ledu');
}

console.log('\n— sklenice: led začíná u stěn (pevné jádro) a drží se u hladiny —');
{
	// Scéna musí učit totéž co výklad a kvíz: tuhnutí začíná od PEVNÉHO JÁDRA
	// (stěny sklenice) a led se drží u hladiny, protože plave. A protože voda
	// tuhnutím ZVĚTŠUJE objem, musí ztuhlý obsah vystoupat NAD původní hladinu
	// (= okraj sklenice). Měří se skutečně vykreslené obdélníky, okraj sklenice
	// se bere z obrysu (fill="none") — ne z konstant komponenty.
	const obrysSkla = () => {
		const m = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="(\d+)" fill="none"/.exec(sklenice.innerHTML);
		return m ? { x: +m[1], y: +m[2], w: +m[3], h: +m[4] } : null;
	};
	const ledy = () => [...sklenice.innerHTML.matchAll(/<rect x="(\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)"[^>]*fill="#e7f5ff"/g)]
		.map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
	const voda = () => {
		const m = /<rect x="(\d+)" y="(-?\d+)" width="(\d+)" height="(\d+)" fill="#4dabf7"/.exec(sklenice.innerHTML);
		return m ? { x: +m[1], y: +m[2], w: +m[3], h: +m[4] } : null;
	};

	nastav(0, 0);
	const sklo = obrysSkla();
	ok(sklo !== null, `sklenice má obrys (okraj = původní hladina, y=${sklo?.y})`);
	ok(ledy().length === 0, 'na začátku je ve sklenici jen voda, žádný led');
	ok(voda().y === sklo.y, `a voda sahá přesně po okraj (hladina na y=${voda().y})`);

	const s0 = stav(0, 0);
	nastav(s0.zacatekTuhnuti + 1, 0);
	const trocha = ledy();
	const uLeveSteny = trocha.find((r) => r.x === sklo.x && r.w < sklo.w);
	const uPraveSteny = trocha.find((r) => r.x + r.w === sklo.x + sklo.w && r.w < sklo.w);
	const uHladiny = trocha.find((r) => r.w === sklo.w);
	ok(uLeveSteny !== undefined && uPraveSteny !== undefined,
		`led začíná od OBOU stěn sklenice — pevného jádra (pásy ${uLeveSteny?.w} px u každé stěny)`);
	ok(uHladiny !== undefined, 'a zároveň drží vrstvu u hladiny — led plave');
	ok(uHladiny.y + uHladiny.h > sklo.y,
		`vrstva u hladiny sahá i POD okraj (do y=${uHladiny.y + uHladiny.h}), ne jen nad něj`);
	ok([uLeveSteny, uPraveSteny].every((r) => r.y + r.h === sklo.y + sklo.h),
		'oba pásy u stěn vedou po celé výšce až na dno — pevným jádrem je celá stěna');
	ok(Math.min(...trocha.map((r) => r.y)) < sklo.y,
		`ztuhlý obsah už přesahuje původní hladinu (vršek ledu y=${Math.min(...trocha.map((r) => r.y))} nad okrajem y=${sklo.y})`);
	// obsah sklenice nesmí mít dole díru: modrá voda sahá v každé minutě až na dno
	let vodaAzKeDnu = true, kdeVoda = '';
	for (const c of CASY) {
		nastav(c, 0);
		const v = voda();
		if (v.y + v.h !== sklo.y + sklo.h) { vodaAzKeDnu = false; kdeVoda ||= `${c}. minuta: končí na y=${v.y + v.h}`; }
	}
	ok(vodaAzKeDnu, `obsah sklenice sahá v každé minutě až na dno${kdeVoda ? ` (${kdeVoda})` : ''}`);
	nastav(s0.zacatekTuhnuti + 1, 0);

	nastav(s0.zacatekTuhnuti + 3, 0);
	const vic = ledy();
	const uSteny75 = vic.find((r) => r.x === sklo.x && r.w < sklo.w);
	ok(uSteny75 !== undefined && uSteny75.w > uLeveSteny.w,
		`ledu od stěn přibývá (${uLeveSteny.w} → ${uSteny75.w} px)`);

	nastav(s0.konecTuhnuti, 0);
	const vsechno = ledy();
	const steny = vsechno.filter((r) => r.w < sklo.w);
	ok(steny.length === 2 && steny.reduce((a, r) => a + r.w, 0) === sklo.w,
		'na konci se pásy ledu od obou stěn potkají — celá sklenice je led');
	const vrchol = Math.min(...vsechno.map((r) => r.y));
	ok(vrchol < sklo.y && vrchol < Math.min(...trocha.map((r) => r.y)),
		`a led vystoupal nejvýš nad okraj (y=${vrchol} proti okraji ${sklo.y}) — ledu je víc, než byla voda`);
	ok(steny.every((r) => r.y + r.h === sklo.y + sklo.h), 'led sahá až na dno sklenice — oba pásy, ne jen jeden');
}

console.log('\n— texty u sklenice říkají obě pravdy, a jen když led existuje —');
{
	// Nápis o plavání dřív svítil i nad čistou vodou; a „led se drží nahoře"
	// bez zmínky o pevném jádru vedl žáka ke špatné kvízové odpovědi.
	nastav(0, 0);
	ok(!sklenice.innerHTML.includes('plave') && !sklenice.innerHTML.includes('pevné jádro'),
		'dokud led není, nepíše se o něm nic');
	ok(!sklenice.innerHTML.includes('praská'), 'ani o praskajícím potrubí');
	const s0 = stav(0, 0);
	nastav(s0.zacatekTuhnuti + 1, 0);
	ok(sklenice.innerHTML.includes('pevné jádro') && sklenice.innerHTML.includes('stěn'),
		'u ledu stojí, že začal u stěn (pevné jádro)');
	ok(sklenice.innerHTML.includes('plave'), 'i že se drží u hladiny, protože plave');
	ok(sklenice.innerHTML.includes('led zabírá víc místa'),
		'a že led zabírá víc místa — proto praská potrubí');
	ok(!sklenice.innerHTML.includes('drží nahoře'),
		'formulace „drží se nahoře" (bez pevného jádra) už ve scéně není');
	// hláška při tuhnutí: teplo uvolňuje voda, která PRÁVĚ tuhne, ne hotový led
	const hlaska = prvky.get('tuh-stav').textContent;
	ok(/práv[eě] tuhne/.test(hlaska) && hlaska.includes('skupenské teplo') && !hlaska.includes('ztuhlá voda'),
		'skupenské teplo uvolňuje „voda, která právě tuhne" — ne ztuhlá voda');
	ok(hlaska.includes('pevného jádra') || hlaska.includes('od stěn'),
		'a hláška jmenuje pevné jádro, od kterého tuhnutí začíná');
	// Vokalizace předložky: „z 25 %" a „z 50 %", ale „ze 75 %" (čte se „ze
	// sedmdesáti pěti") — a časový údaj „za 12 minut", ne „ve 12 minut"
	let spravnaPredlozka = true, kdeP = '';
	for (const sul of SOLI) for (const c of CASY) {
		nastav(c, sul);
		const h = prvky.get('tuh-stav').textContent;
		const mZ = /Hotovo je (ze?) (\d+) %/.exec(h);
		if (mZ && (mZ[2] === '75' ? mZ[1] !== 'ze' : mZ[1] !== 'z')) {
			spravnaPredlozka = false; kdeP ||= `${c}. minuta, sůl ${sul}: „${mZ[0]}"`;
		}
		if (/\bve \d+ minut/.test(prvky.get('tuh-vypocet').innerHTML)) { spravnaPredlozka = false; kdeP ||= `výpočet, ${c}. minuta`; }
	}
	ok(spravnaPredlozka, `předložka je všude vokalizovaná správně: „z 25/50 %", „ze 75 %"${kdeP ? ` (špatně: ${kdeP})` : ''}`);
	nastav(6, 0);
	ok(/Hotovo je z 50 %/.test(prvky.get('tuh-stav').textContent), 'hláška při 50 % hlásí „Hotovo je z 50 %"');
	nastav(7, 0);
	ok(/Hotovo je ze 75 %/.test(prvky.get('tuh-stav').textContent), 'a při 75 % vokalizované „Hotovo je ze 75 %"');
	// délka pokusu ve větě výpočtu je rozhodnutá na JEDNOM místě — musí sedět
	// s maximem posuvníku času přečteným z HTML
	ok(prvky.get('tuh-vypocet').innerHTML.includes(`za ${MAX_CAS} minut`),
		`výpočet říká přesně „za ${MAX_CAS} minut" — délka pokusu sedí s posuvníkem času`);
	// hraniční minuta začátku tuhnutí: hotového ledu je 0 % a sklenice ukazuje
	// jen vodu — hláška popisuje začátek a nesmí hlásit procenta
	for (const sul of SOLI) {
		nastav(stav(0, sul).zacatekTuhnuti, sul);
		const h = prvky.get('tuh-stav').textContent;
		ok(h.includes('začíná tuhnout') && h.includes('stěn'),
			`sůl ${sul}: v hraniční minutě hláška popisuje začátek — první led se chytá stěn`);
		ok(!h.includes('%') && !h.includes('Hotovo'),
			'a nehlásí žádná procenta — ve sklenici ještě žádný led není');
	}
}

console.log('\n— počitadlo říká totéž co model —');
{
	for (const [cas, sul] of [[0, 0], [5, 0], [6, 1], [12, 2]]) {
		nastav(cas, sul);
		const s = stav(cas, sul);
		const t = /teplota: (-?−?\d+) °C/.exec(pocty.innerHTML.replace(/−/g, '-'));
		ok(t && +t[1] === s.teplota, `${cas}. minuta, sůl ${sul} → počitadlo hlásí ${t?.[1]} °C (model ${s.teplota} °C)`);
		const nazev = { kapalina: 'kapalina', tuhne: 'právě tuhne', led: 'pevná látka' }[s.faze];
		ok(pocty.innerHTML.includes(nazev), `a stav „${nazev}"`);
	}
}

console.log('\n— nic se ve scéně nepřekrývá —');
{
	// Počitadlo má vlastní pruh dole; graf a sklenice končí nad ním (y=370).
	nastav(MAX_CAS, 2);
	const ram = /<rect x="\d+" y="(\d+)"/.exec(pocty.innerHTML);
	ok(+ram[1] >= 370, `počitadlo má vlastní pruh pod scénou (y=${ram[1]})`);
	const yTextu = [...pocty.innerHTML.matchAll(/<text[^>]*y="(\d+)"/g)].map((m) => +m[1]);
	ok(yTextu.every((y) => y > 370), `a všechny jeho řádky taky (y = ${yTextu.join(', ')})`);
	// křivka i její popisek musí zůstat v ploše grafu (osy: x 60–410, y 60–340)
	let vGrafu = true;
	for (const sul of SOLI) {
		nastav(MAX_CAS, sul);
		for (const [x, y] of bodyKrivky()) if (x < 60 || x > 410 || y < 60 || y > 340) vGrafu = false;
		for (const m of krivka.innerHTML.matchAll(/<text x="(\d+)" y="(\d+)"/g)) {
			if (+m[1] < 60 || +m[1] > 410 || +m[2] < 40 || +m[2] > 340) vGrafu = false;
		}
	}
	ok(vGrafu, 'celá křivka i popisek „tady teplota stojí" zůstávají uvnitř grafu');
	// a graf nesmí zajet do sklenice (ta začíná na x=440)
	nastav(MAX_CAS, 0);
	ok(Math.max(...bodyKrivky().map(([x]) => x)) < 440, 'graf nezajíždí do sklenice');
}

console.log('\n— záporné teploty se píšou všude stejně —');
{
	// Na ose stálo „−10 °C" (typografické mínus), v počitadle „-10 °C" (pomlčka).
	// Vypadá to jako chyba a žák to čte dřív než učivo.
	let jednotne = true, kde = '';
	for (const sul of SOLI) for (const c of CASY) {
		nastav(c, sul);
		for (const [odkud, text] of [['počitadlo', pocty.innerHTML], ['hláška', prvky.get('tuh-stav').textContent],
			['výpočet', prvky.get('tuh-vypocet').innerHTML]]) {
			if (/-\d+ °C/.test(text)) { jednotne = false; kde ||= `${odkud} v ${c}. minutě, sůl ${sul}`; }
		}
	}
	ok(jednotne, `všude typografické mínus, jako na ose${kde ? ` (pomlčka v: ${kde})` : ''}`);
	ok(svg.__stupne(-10) === '−10 °C' && svg.__stupne(0) === '0 °C', `a kladná čísla zůstávají beze změny (${svg.__stupne(0)})`);
}

console.log('\n— čeština: minuta, minuty, minut —');
{
	const minut = svg.__minut;
	const ocekavane = { 0: '0 minut', 1: '1 minuta', 2: '2 minuty', 4: '4 minuty', 5: '5 minut', 12: '12 minut' };
	for (const [n, tvar] of Object.entries(ocekavane)) ok(minut(+n) === tvar, `${n} → „${minut(+n)}"`);
	let vsude = true;
	for (const c of CASY) {
		nastav(c, 0);
		if (/(?:^|[^\d])[234] minut[^ya]/.test(pocty.innerHTML) || /(?:^|[^\d])1 minut[^a]/.test(pocty.innerHTML)) vsude = false;
	}
	ok(vsude, 'a v počitadle nevyjde špatný tvar v žádné minutě');
}

console.log(chyby === 0 ? '\n✅ Tuhnutí: vše sedí.' : `\n❌ Tuhnutí: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

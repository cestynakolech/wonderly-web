#!/usr/bin/env node
// Ověření KlinSimulace.astro: spustí SKUTEČNÝ skript komponenty v Node s náhradním
// DOM a proměří, co scéna tvrdí — poměr l : b, rozrážecí sílu, zlaté pravidlo
// mechaniky, celá čísla ve VŠECH polohách posuvníků a hlavně to, že KRESBA NELŽE
// (délka šipek je úměrná vypočtené síle, klín má rozměry v měřítku, rozevření
// špalku se rovná šířce klínu v rovině povrchu).
//
// Spuštění: node testy/simulace/klin.mjs src/components/skola2/KlinSimulace.astro
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

// ───────────────────────────── náhradní DOM ─────────────────────────────
// Výchozí hodnota posuvníku se bere ZE ZDROJE (value="…"), ne z testu — jinak by
// se nedal ověřit stav, který žák vidí hned po otevření stránky (poučení z mutačního
// testu u odpor-vodice: mutace výchozí hodnoty testem beztrestně prošla).
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id,
		atributy: {},
		textContent: '',
		innerHTML: '',
		style: {},
		dataset: {},
		posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };

// Fake hodiny + fronta requestAnimationFrame: krok 15 ms, takže po 20 snímcích
// je čas přesně 300 ms — polovina animace. Na tom se dá měřit i délka animace.
let nyni = 0;
const fronta = [];
const sandbox = {
	document,
	performance: { now: () => nyni },
	requestAnimationFrame: (cb) => { fronta.push(cb); return fronta.length; },
	cancelAnimationFrame: () => {},
	console,
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('kl-svg');
let chyby = 0;
const ok = (p, popis) => { console.log(`${p ? '✅' : '❌'} ${popis}`); if (!p) chyby++; };

const cislo = (id, attr) => parseFloat(prvky.get(id).getAttribute(attr));
const body = (id) => prvky.get(id).getAttribute('points').split(' ').map((b) => b.split(',').map(Number));
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((fn) => fn());
const nastavPosuvniky = (l, b) => {
	prvky.get('kl-l').value = String(l);
	prvky.get('kl-b').value = String(b);
	(prvky.get('kl-l').posluchaci.input || []).forEach((fn) => fn());
};
/** Nechá doběhnout animaci: každý snímek posune fake hodiny o 15 ms. */
const snimky = (kolik) => {
	for (let i = 0; i < kolik && fronta.length; i++) {
		const cb = fronta.shift();
		nyni += 15;
		cb(nyni);
	}
};

// ─────────────────────── 1. výchozí stav scény ───────────────────────
console.log('— výchozí stav, který žák uvidí hned po otevření —');
{
	const s = svg.__stav();
	ok(s.l === 12 && s.b === 4, `klín je na startu dlouhý ${s.l} cm a u hřbetu tlustý ${s.b} cm (sekera A z výkladu)`);
	ok(s.pomer === 3, `poměr l : b = ${s.pomer} (výklad: 12 : 4 = 3)`);
	ok(s.rozrazeci === 300, `rozrážecí síla na startu ${s.rozrazeci} N = 100 N úderu krát poměr 3`);
	ok(svg.__cas() === 0, 'klín je na startu ještě nad špalkem (nezaražený)');
	ok(prvky.get('kl-pomer-text').textContent === 'l : b = 12 : 4 = 3',
		`popisek poměru ve scéně: „${prvky.get('kl-pomer-text').textContent}"`);
	ok(prvky.get('kl-uder-text').textContent === 'zvolený úder 100 N',
		`popisek úderu říká, že 100 N je ZVOLENÝ vstup (výklad žádnou sílu úderu neudává): „${prvky.get('kl-uder-text').textContent}"`);
	const mezera = cislo('kl-spalek-p', 'x') - (cislo('kl-spalek-l', 'x') + 250);
	ok(mezera === 0, `špalek je na startu celý — půlky se nedotýkají mezerou (${mezera} px)`);
		// absolutní kotva: scéna musí stát v ose plátna 620 px, ne někde vedle
		ok(cislo('kl-spalek-l', 'x') === 60 && cislo('kl-spalek-p', 'x') === 310,
			'špalek leží vodorovně na 60–560 px, tedy v ose plátna 620 px');
		ok(body('kl-klin')[2][0] === 310, `ostří klínu míří přesně do osy plátna (x = ${body('kl-klin')[2][0]})`);
		ok(body('kl-klin')[2][1] === 200, `ostří se na startu právě dotýká povrchu špalku (y = ${body('kl-klin')[2][1]})`);
}

// ─────────────────── 2. čísla z výkladu a celé výsledky ───────────────────
console.log('\n— poměr a rozrážecí síla ve všech polohách posuvníků —');
{
	const meze = (id) => {
		const znacka = zdroj.match(new RegExp(`id="${id}"[^>]*>`))[0];
		const cti = (a) => Number(znacka.match(new RegExp(`${a}="([^"]*)"`))[1]);
		return { min: cti('min'), max: cti('max'), step: cti('step') };
	};
	const ml = meze('kl-l');
	const mb = meze('kl-b');
	let kombinaci = 0, necele = 0, spatneZlate = 0;
	const sily = [];
	for (let l = ml.min; l <= ml.max; l += ml.step) {
		for (let b = mb.min; b <= mb.max; b += mb.step) {
			nastavPosuvniky(l, b);
			const s = svg.__stav();
			kombinaci++;
			if (!Number.isInteger(s.pomer) || !Number.isInteger(s.rozrazeci)) necele++;
			// zlaté pravidlo mechaniky: úder krát délka = rozrážecí síla krát rozevření
			if (s.rozrazeci * b !== 100 * l) spatneZlate++;
			sily.push(`${l}:${b}=${s.pomer}`);
		}
	}
	ok(kombinaci === 9, `posuvníky dávají ${kombinaci} kombinací (3 délky × 3 tloušťky)`);
	ok(necele === 0, `ve všech ${kombinaci} kombinacích vyjde poměr i síla CELÁ (necelých: ${necele}) — ${sily.join(', ')}`);
	ok(spatneZlate === 0, `zlaté pravidlo platí ve všech kombinacích: 100 N · l = F · b (chyb: ${spatneZlate})`);

	nastavPosuvniky(12, 2);
	ok(svg.__stav().pomer === 6, 'sekera B z výkladu: 12 : 2 = 6');
	ok(svg.__stav().rozrazeci === 600, 'a rozráží silou 600 N, tedy dvojnásobkem sekery A (poměr je dvojnásobný)');
	nastavPosuvniky(24, 2);
	ok(svg.__stav().pomer === 12, 'dvakrát delší klín z výkladu: 24 : 2 = 12');
}

console.log('\n— na čem síla závisí (to, co scéna učí) —');
{
	nastavPosuvniky(12, 6);
	const tupy = svg.__stav().rozrazeci;
	nastavPosuvniky(36, 6);
	const dlouhy = svg.__stav().rozrazeci;
	nastavPosuvniky(12, 2);
	const tenky = svg.__stav().rozrazeci;
	ok(dlouhy > tupy, `delší klín (36 cm) rozráží větší silou než krátký (${dlouhy} N > ${tupy} N)`);
	ok(tenky > tupy, `tenčí klín (2 cm) rozráží větší silou než tlustý (${tenky} N > ${tupy} N)`);
	ok(tupy === 200, `nejtupější klín (12 : 6 = 2) rozráží silou ${tupy} N, tedy dvojnásobkem úderu`);
}

// ─────────────────── 3. kresba nesmí lhát ───────────────────
console.log('\n— kresba: rozměry klínu v měřítku 4 px na 1 cm —');
{
	for (const [l, b] of [[12, 4], [36, 2], [24, 6]]) {
		nastavPosuvniky(l, b);
		const [hl, hp, ostri] = body('kl-klin');
		const sirka = hp[0] - hl[0];
		const delka = ostri[1] - hl[1];
		ok(sirka === b * 4 && delka === l * 4,
			`klín ${l}×${b} cm je nakreslený ${delka}×${sirka} px (čekáno ${l * 4}×${b * 4})`);
	}
}

console.log('\n— kresba: šipky sil jsou dlouhé ÚMĚRNĚ vypočtené síle —');
{
	const delkaSipky = () => {
		const hrot = body('kl-sila-p-hrot')[2][0];
		return hrot - cislo('kl-sila-p-cara', 'x1');
	};
	const pomery = [];
	for (const [l, b] of [[12, 6], [12, 4], [24, 4], [36, 2]]) {
		nastavPosuvniky(l, b);
		pomery.push(delkaSipky() / svg.__stav().rozrazeci);
	}
	const rozptyl = Math.max(...pomery) - Math.min(...pomery);
	ok(rozptyl < 0.001, `na 1 N vychází vždy stejný počet pixelů (rozptyl ${rozptyl.toFixed(6)}; hodnoty ${pomery.map((p) => p.toFixed(3)).join(', ')})`);
	nastavPosuvniky(12, 6);
	const kratka = delkaSipky();
	nastavPosuvniky(36, 2);
	const dlouha = delkaSipky();
	ok(dlouha > kratka * 8, `nejštíhlejší klín (1800 N) má šipku ${dlouha} px, nejtupější (200 N) jen ${kratka} px — devítinásobek síly je vidět`);
	ok(kratka >= 20, `i nejkratší šipka je vidět (${kratka} px)`);
	// levá a pravá šipka musí být stejně dlouhé — síly do stran jsou stejné
	const leva = cislo('kl-sila-l-cara', 'x1') - body('kl-sila-l-hrot')[2][0];
	ok(Math.abs(leva - dlouha) < 0.001, `obě šipky jsou stejně dlouhé (levá ${leva} px, pravá ${dlouha} px)`);
	ok(prvky.get('kl-sila-text').textContent === 'po úderu 1800 N do každé strany',
		`popisek u šipek před úderem: „${prvky.get('kl-sila-text').textContent}"`);
}

// ─────────────────── 4. úder: animace a rozevření ───────────────────
console.log('\n— úder kladivem: klín zajíždí a špalek se rozevírá —');
{
	nastavPosuvniky(24, 6);
	const predOstri = body('kl-klin')[2][1];
	klik('kl-uder');
	snimky(20); // 20 × 15 ms = 300 ms = polovina animace
	ok(svg.__cas() === 0.5, `po 300 ms je klín přesně v polovině zaražení (t = ${svg.__cas()}) — animace trvá 600 ms`);
	const s = svg.__stav();
	ok(s.hloubka === 12 && s.rozevreni === 3, `v polovině je zaražený ${s.hloubka} cm a dřevo je rozevřené ${s.rozevreni} cm`);
	const ostriTed = body('kl-klin')[2][1];
	ok(ostriTed === predOstri + 48, `ostří se posunulo dolů o ${ostriTed - predOstri} px (12 cm × 4 px)`);
	ok(prvky.get('kl-rozev-text').textContent === 'klín zajíždí do dřeva',
		`uprostřed úderu popisek dole nelže o tom, že klín zatím nezajel: „${prvky.get('kl-rozev-text').textContent}"`);
	ok(/rozráží/.test(prvky.get('kl-vysledek').innerHTML),
		'a text pod scénou už mluví přítomným časem — síla v té chvíli opravdu působí');
	ok(prvky.get('kl-sila-p-cara').getAttribute('stroke-dasharray') === 'none',
		'šipky jsou během úderu plné (už nejde o předpověď)');
	snimky(40);
	ok(svg.__cas() === 1 && fronta.length === 0, `animace sama skončila na t = ${svg.__cas()}`);

	const s2 = svg.__stav();
	ok(s2.hloubka === 24 && s2.rozevreni === 6, `zaražený klín 24 cm hluboko rozevřel dřevo o ${s2.rozevreni} cm (= tloušťka hřbetu)`);
	const mezera = cislo('kl-spalek-p', 'x') - (cislo('kl-spalek-l', 'x') + 250);
	ok(mezera === 24, `mezera mezi půlkami špalku je ${mezera} px = 6 cm — přesně šířka hřbetu klínu`);
	const [hl, hp] = body('kl-klin');
	ok(hp[0] - hl[0] === mezera, 'rozevření dřeva se rovná šířce klínu v rovině povrchu (kresba je sama se sebou v souladu)');
	ok(body('kl-klin')[0][1] === 200, 'hřbet zaraženého klínu je právě v rovině povrchu špalku');
	ok(prvky.get('kl-rozev-text').textContent === 'zajel 24 cm hluboko → rozevřel 6 cm',
		`popisek dole: „${prvky.get('kl-rozev-text').textContent}"`);
	ok(/24 cm<\/strong> hluboko/.test(prvky.get('kl-vysledek').innerHTML)
		&& /400 N<\/strong>/.test(prvky.get('kl-vysledek').innerHTML)
		&& /100 N · 24 cm = 400 N · 6 cm/.test(prvky.get('kl-vysledek').innerHTML),
		'shrnutí pod scénou dosazuje do zlatého pravidla skutečná čísla (100 · 24 = 400 · 6)');
}

console.log('\n— přestavení posuvníku vytáhne klín zpátky —');
{
	nastavPosuvniky(12, 4);
	ok(svg.__cas() === 0, 'po změně délky klínu je klín znovu nad špalkem');
	ok(body('kl-klin')[2][1] === 200, 'ostří se opět dotýká povrchu špalku');
	klik('kl-reset');
	ok(svg.__cas() === 0, 'tlačítko „Vytáhni klín" nechá klín nahoře');
	klik('kl-uder');
	snimky(80);
	ok(svg.__cas() === 1, 'a další úder jde znovu zarazit');
	klik('kl-reset');
	ok(svg.__cas() === 0 && body('kl-klin')[0][1] === 152,
		'po vytažení je hřbet 48 px nad povrchem (klín 12 cm v měřítku 4 px/cm)');
}

console.log('\n— šipky sil vycházejí z klínu a míří do dřeva —');
{
	for (const [l, b] of [[12, 6], [36, 2]]) {
		nastavPosuvniky(l, b);
		const hrbetY = 200 - l * 4;
		const y = cislo('kl-sila-p-cara', 'y1');
		const x1 = cislo('kl-sila-p-cara', 'x1');
		const x2 = cislo('kl-sila-p-cara', 'x2');
		const hrot = body('kl-sila-p-hrot');
		ok(y > hrbetY && y < 200 && cislo('kl-sila-l-cara', 'y1') === y,
			`klín ${l}×${b}: šipky jsou v polovině výšky klínu (y = ${y}, klín ${hrbetY}–200)`);
		ok(x1 - 310 > b && x1 - 310 < b + 8,
			`pravá šipka začíná těsně u šikmé plochy klínu (x1 = ${x1}, plocha na ${310 + b})`);
		ok(x2 > x1 && hrot[0][0] === x2 && hrot[2][0] === x2 + 12,
			`pravá šipka míří DOPRAVA od klínu a hrot na ni sedí (x1 ${x1} → x2 ${x2}, hrot ${hrot[2][0]})`);
		const lx1 = cislo('kl-sila-l-cara', 'x1');
		const lx2 = cislo('kl-sila-l-cara', 'x2');
		const lhrot = body('kl-sila-l-hrot');
		ok(lx2 < lx1 && lhrot[0][0] === lx2 && lhrot[2][0] === lx2 - 12,
			`levá šipka míří DOLEVA od klínu a hrot na ni sedí (x1 ${lx1} → x2 ${lx2}, hrot ${lhrot[2][0]})`);
		// hroty musí být souměrné kolem osy šipky — jinak z trojúhelníku vyjde čárka
		for (const [nazev, h] of [['pravý', hrot], ['levý', lhrot]]) {
			ok(h[0][1] === y - 7 && h[1][1] === y + 7 && h[2][1] === y,
				`${nazev} hrot je souměrný trojúhelník kolem osy šipky (y ${h[0][1]}, ${h[1][1]}, špička ${h[2][1]} při ose ${y})`);
		}
	}
}

console.log('\n— vlákna dřeva se hýbou s tou svou půlkou špalku —');
{
	nastavPosuvniky(36, 6);
	for (const faze of [0, 1]) {
		if (faze === 1) { klik('kl-uder'); snimky(80); }
		const xl = cislo('kl-spalek-l', 'x');
		const xp = cislo('kl-spalek-p', 'x');
		let mimo = 0;
		for (const id of ['kl-vlakno-l1', 'kl-vlakno-l2']) {
			if (cislo(id, 'x1') !== xl + 20 || cislo(id, 'x2') !== xl + 230) mimo++;
		}
		for (const id of ['kl-vlakno-p1', 'kl-vlakno-p2']) {
			if (cislo(id, 'x1') !== xp + 20 || cislo(id, 'x2') !== xp + 230) mimo++;
		}
		ok(mimo === 0, `${faze === 0 ? 'před úderem' : 'po úderu'} leží všechna 4 vlákna uvnitř své půlky špalku (mimo: ${mimo})`);
	}
	klik('kl-reset');
}

console.log('\n— podklady popisků musí text opravdu zakrýt —');
{
	nastavPosuvniky(36, 2);
	klik('kl-uder');
	snimky(80);
	const popisky = [
		['kl-uder-podklad', 'kl-uder-text', true],
		['kl-sila-podklad', 'kl-sila-text', true],
		['kl-pomer-podklad', 'kl-pomer-text', true],
		['kl-rozev-podklad', 'kl-rozev-text', true],
	];
	let uzke = 0, siroke = 0, minulo = 0;
	for (const [rect, text, doprava] of popisky) {
		const znaku = prvky.get(text).textContent.length;
		const w = cislo(rect, 'width');
		const x = cislo(rect, 'x');
		const tx = cislo(text, 'x');
		const ty = cislo(text, 'y');
		if (w < znaku * 7.2 + 10) uzke++;
		if (w > znaku * 8 + 20) siroke++;
		// podklad musí text vodorovně obejmout (text je široký aspoň 6 px na znak)
		const zleva = doprava ? tx : tx - znaku * 6;
		const zprava = doprava ? tx + znaku * 6 : tx;
		if (x > zleva || x + w < zprava) minulo++;
		if (ty - cislo(rect, 'y') < 10 || ty - cislo(rect, 'y') > 20) minulo++;
	}
	ok(uzke === 0, `žádný podklad není užší než jeho text (úzkých: ${uzke})`);
	ok(siroke === 0, `žádný podklad není nesmyslně široký (širokých: ${siroke})`);
	ok(minulo === 0, `všechny 4 podklady sedí přesně pod svým popiskem (mimo: ${minulo})`);
	klik('kl-reset');
}

console.log('\n— zaražený klín už dál nejde (druhý úder nic nerozbije) —');
{
	nastavPosuvniky(24, 4);
	klik('kl-uder');
	snimky(80);
	ok(svg.__cas() === 1 && fronta.length === 0, 'první úder klín zarazil celý');
	const pred = prvky.get('kl-klin').getAttribute('points');
	klik('kl-uder');
	ok(fronta.length === 0, 'druhý úder do zaraženého klínu nespustí další animaci');
	snimky(20);
	ok(svg.__cas() === 1 && prvky.get('kl-klin').getAttribute('points') === pred,
		'klín zůstal zaražený, nevyskočil zpátky nad špalek');
	klik('kl-reset');
}

console.log('\n— PŘED ÚDEREM nesmí scéna kreslit ani tvrdit působící sílu —');
{
	nastavPosuvniky(36, 2);
	const carky = (id) => prvky.get(id).getAttribute('stroke-dasharray');
	const pruhl = (id) => prvky.get(id).getAttribute('opacity');
	ok(svg.__cas() === 0, 'výchozí stav: kladivo ještě neudeřilo, klín visí nad špalkem');
	ok(carky('kl-sila-p-cara') === '9 7' && carky('kl-sila-l-cara') === '9 7',
		`obě šipky sil jsou čárkované, tedy zřetelně jen předpověď (dasharray „${carky('kl-sila-p-cara')}")`);
	ok(pruhl('kl-sila-p-cara') === '0.5' && pruhl('kl-sila-l-cara') === '0.5',
		`a poloprůhledné (opacity ${pruhl('kl-sila-p-cara')}) — nepletou se s působící silou`);
	ok(prvky.get('kl-sila-p-hrot').getAttribute('fill') === 'none'
		&& prvky.get('kl-sila-l-hrot').getAttribute('fill') === 'none',
		'hroty šipek jsou před úderem prázdné (nevybarvené)');
	ok(carky('kl-sila-podklad') === '9 7', 'čárkovaný je i rámeček popisku sil');
	ok(/^po úderu /.test(prvky.get('kl-sila-text').textContent),
		`popisek u šipek mluví budoucím časem: „${prvky.get('kl-sila-text').textContent}"`);
	const pred = prvky.get('kl-vysledek').innerHTML;
	ok(/po úderu klín rozrazí/.test(pred), 'text pod scénou slibuje sílu až PO úderu');
	ok(!/rozráží/.test(pred), 'a netvrdí přítomným časem, že klín rozráží dřevo');
	ok(prvky.get('kl-rozev-text').textContent === 'klín zatím nezajel do dřeva',
		'dole scéna přiznává, že klín zatím nezajel — kresba i text si odpovídají');

	klik('kl-uder');
	snimky(80);
	ok(svg.__cas() === 1, 'po úderu je klín zaražený');
	ok(carky('kl-sila-p-cara') === 'none' && carky('kl-sila-l-cara') === 'none',
		'teprve teď jsou šipky plné (nečárkované)');
	ok(pruhl('kl-sila-p-cara') === '1' && pruhl('kl-sila-l-cara') === '1', 'a plně sytě viditelné');
	ok(prvky.get('kl-sila-p-hrot').getAttribute('fill') === '#e03131'
		&& prvky.get('kl-sila-l-hrot').getAttribute('fill') === '#e03131', 'hroty jsou vybarvené');
	ok(carky('kl-sila-podklad') === 'none', 'rámeček popisku sil už čárkovaný není');
	ok(prvky.get('kl-sila-text').textContent === '1800 N do každé strany',
		`popisek u šipek po úderu: „${prvky.get('kl-sila-text').textContent}"`);

	klik('kl-reset');
	ok(carky('kl-sila-p-cara') === '9 7' && /^po úderu /.test(prvky.get('kl-sila-text').textContent),
		'po vytažení klínu je ze šipek zase jen předpověď');
}

console.log('\n— rámečky popisků se nesmí dotýkat (9 kombinací × 3 fáze úderu) —');
{
	const RAMECKY = ['kl-uder-podklad', 'kl-sila-podklad', 'kl-pomer-podklad', 'kl-rozev-podklad'];
	const ram = (id) => ({
		id,
		x1: cislo(id, 'x'), y1: cislo(id, 'y'),
		x2: cislo(id, 'x') + cislo(id, 'width'), y2: cislo(id, 'y') + cislo(id, 'height'),
	});
	// kladná hodnota = mezi obdélníky je mezera, záporná = překrývají se
	const mezera = (a, b) => Math.max(a.x1 - b.x2, b.x1 - a.x2, a.y1 - b.y2, b.y1 - a.y2);
	let nej = Infinity, kde = '', stavu = 0, mimoPlatno = 0;
	for (const l of [12, 24, 36]) {
		for (const b of [2, 4, 6]) {
			for (const faze of [0, 0.5, 1]) {
				nastavPosuvniky(l, b);
				if (faze > 0) { klik('kl-uder'); snimky(20); }
				stavu++;
				const boxy = RAMECKY.map(ram);
				for (const bx of boxy) {
					if (bx.x1 < 4 || bx.x2 > 616 || bx.y1 < 4 || bx.y2 > 396) mimoPlatno++;
				}
				for (let i = 0; i < boxy.length; i++) {
					for (let j = i + 1; j < boxy.length; j++) {
						const m = Math.round(mezera(boxy[i], boxy[j]) * 100) / 100;
						if (m < nej) { nej = m; kde = `l=${l} b=${b} t=${faze} ${boxy[i].id} × ${boxy[j].id}`; }
					}
				}
				if (faze > 0) snimky(80); // dokončit animaci, jinak zůstane bezi === true
				klik('kl-reset');
			}
		}
	}
	ok(stavu === 27, `proměřeno ${stavu} stavů scény (9 kombinací posuvníků × 3 fáze úderu)`);
	ok(nej >= 8, `nejmenší mezera mezi rámečky popisků je ${nej} px (${kde}) — rámečky se nikde nedotýkají`);
	ok(mimoPlatno === 0, `žádný rámeček popisku nevyčnívá z plátna ani nesedí na jeho okraji (nálezů: ${mimoPlatno})`);
}

console.log('\n— popisky nesmí zakrývat klín a šipky nesmí přečnívat špalek (9 kombinací × 5 fází) —');
{
	// Obě vady našla až vizuální kontrola nasazené scény (25. 9. 2026): bílý rámeček
	// popisku sil překrýval pravý bok klínu při b = 6 cm a šipky sil při 1800 N
	// vyčnívaly 8 px za hranu špalku. Opakovaná třída chyby → měřidlo v kódu.
	const ram = (id) => ({
		x1: cislo(id, 'x'), y1: cislo(id, 'y'),
		x2: cislo(id, 'x') + cislo(id, 'width'), y2: cislo(id, 'y') + cislo(id, 'height'),
	});
	/**
	 * Odstup obdélníku od trojúhelníku klínu. Klín je trojúhelník (hřbet vodorovně
	 * nahoře, ostří dole), takže jeho polovina šířky s hloubkou ubývá — nejtlustší je
	 * v nejvyšším bodě pásu, kde se s obdélníkem potkávají. Kladná hodnota = mezera,
	 * záporná = rámeček leze na klín.
	 */
	const odstupOdKlinu = (r) => {
		const [hl, hp, ostri] = body('kl-klin');
		const hy = hl[1], L = ostri[1] - hy, cx = ostri[0], polB = (hp[0] - hl[0]) / 2;
		if (r.y2 < hy || r.y1 > hy + L) return Math.max(hy - r.y2, r.y1 - (hy + L));
		const w = polB * (1 - (Math.max(r.y1, hy) - hy) / L);
		return Math.max(cx - w - r.x2, r.x1 - (cx + w));
	};
	const RAMECKY = ['kl-sila-podklad', 'kl-uder-podklad', 'kl-pomer-podklad', 'kl-rozev-podklad'];
	let nejOdstup = Infinity, kdeOdstup = '', nejSipka = Infinity, kdeSipka = '', stavu = 0;
	for (const l of [12, 24, 36]) {
		for (const b of [2, 4, 6]) {
			for (const snim of [0, 5, 10, 20, 40]) {
				nastavPosuvniky(l, b);
				if (snim > 0) { klik('kl-uder'); snimky(snim); }
				stavu++;
				const t = svg.__cas();
				for (const id of RAMECKY) {
					const o = Math.round(odstupOdKlinu(ram(id)) * 100) / 100;
					if (o < nejOdstup) { nejOdstup = o; kdeOdstup = `l=${l} b=${b} t=${t} ${id}`; }
				}
				// konce šipek proti hranám špalku (špalek se úderem rozevírá, nejtěsněji je v klidu)
				const spL = cislo('kl-spalek-l', 'x');
				const spP = cislo('kl-spalek-p', 'x') + 250;
				const hrotP = body('kl-sila-p-hrot')[2][0];
				const hrotL = body('kl-sila-l-hrot')[2][0];
				const rezerva = Math.round(Math.min(spP - hrotP, hrotL - spL) * 100) / 100;
				if (rezerva < nejSipka) {
					nejSipka = rezerva;
					kdeSipka = `l=${l} b=${b} t=${t}: hroty ${hrotL} a ${hrotP}, špalek ${spL}–${spP}`;
				}
				if (snim > 0) snimky(80);
				klik('kl-reset');
			}
		}
	}
	ok(stavu === 45, `proměřeno ${stavu} stavů scény (9 kombinací × 5 fází úderu)`);
	ok(nejOdstup > 0, `nejmenší odstup rámečku popisku od klínu je ${nejOdstup} px (${kdeOdstup}) — žádný popisek klín nezakrývá`);
	ok(nejSipka > 0, `konce šipek sil zůstávají uvnitř špalku, nejmenší rezerva ${nejSipka} px (${kdeSipka})`);
}

console.log('\n— texty netvrdí nic navíc —');
{
	nastavPosuvniky(36, 2);
	const html = prvky.get('kl-vysledek').innerHTML;
	ok(/18× větší/.test(html), `poměr je v textu uvedený i jako „kolikrát": „${html.slice(0, 60)}…"`);
	ok(/1800 N/.test(html), 'a rozrážecí síla souhlasí s výpočtem 100 × 18');
	ok(!/ušet[řr]/.test(html) && !/zdarma/.test(html), 'text netvrdí, že klín ušetří práci (před úderem)');
	klik('kl-uder');
	snimky(80);
	const poUderu = prvky.get('kl-vysledek').innerHTML;
	ok(!/ušet[řr]/.test(poUderu) && !/zdarma/.test(poUderu),
		'ani shrnutí po úderu netvrdí, že klín ušetří práci — jen ji rozloží (zlaté pravidlo mechaniky)');
	ok(/[Zz]laté pravidlo mechaniky/.test(poUderu), 'shrnutí po úderu se o zlaté pravidlo mechaniky opírá jménem');
	ok(/zvolený úder 100 N/.test(poUderu) && !/úder F = /.test(poUderu),
		'a 100 N i ve shrnutí zůstává ZVOLENÝM vstupem, ne danou hodnotou z výkladu');
	klik('kl-reset');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);

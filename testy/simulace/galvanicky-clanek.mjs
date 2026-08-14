#!/usr/bin/env node
// Ověření GalvanickyClanekSimulace.astro — chemické zdroje elektrického napětí.
//
// Nejtišeji by lhalo právě jádro učiva: že napětí dělá DVOJICE RŮZNÝCH KOVŮ,
// ne velikost kádinky, a že stejné kovy dají 0 V. Proto test kontroluje
// všech 6 dvojic PROTI NAPEVNO ZAPSANÉ tabulce (1,5 / 0 / 1,1 / 0 / 2 / 0 V)
// — kdyby se čísla brala z komponenty, test by odkýval cokoli.
//
// Mutační riziko: kdyby scéna spletla polaritu (zinek jako +), počitadlo by
// to neřeklo — proto se čte přímo barva/znaménko badge u KAŽDÉ elektrody,
// ne jen textový popis. A geometrie řady článků (část B) se měří přes
// pure funkci geometriePack, aby mutace v posunu souřadnic nezůstala skrytá
// za tím, že by render dopadl náhodou podobně.
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

const svgA = prvky.get('gc-a-svg');
const svgB = prvky.get('gc-b-svg');
const { __PARY: PARY, __znamenka: znamenka, __napetiText: napetiText } = svgA;
const { __VELIKOSTI: VELIKOSTI, __PROUDY: PROUDY, __stavB: stavB, __geometriePack: geometriePack,
	__clanku: clanku, __hodin: hodin } = svgB;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const nastavA = (idx) => {
	prvky.get('gc-a-par').value = String(idx);
	for (const f of prvky.get('gc-a-par').posluchaci.input) f();
};
const nastavB = (pocet, velikost = 0, proud = 1) => {
	prvky.get('gc-b-pocet').value = String(pocet);
	prvky.get('gc-b-velikost').value = String(velikost);
	prvky.get('gc-b-proud').value = String(proud);
	for (const f of prvky.get('gc-b-pocet').posluchaci.input) f();
};

console.log('— tabulka napětí (natvrdo, ať test nic neodkývá) —');
{
	ok(PARY.length === 6, `šest dvojic v nabídce (${PARY.length})`);
	const ocekavane = [
		['zinek', 'uhlík', 1.5, 'zinek'],
		['zinek', 'zinek', 0, null],
		['zinek', 'měď', 1.1, 'zinek'],
		['měď', 'měď', 0, null],
		['olovo', 'oxid olovičitý', 2, 'olovo'],
		['uhlík', 'uhlík', 0, null],
	];
	let spatne = null;
	ocekavane.forEach(([e1, e2, u, minus], i) => {
		const p = PARY[i];
		if (p.e1.nazev !== e1 || p.e2.nazev !== e2 || p.napeti !== u) {
			spatne = `pozice ${i}: čekal jsem ${e1}+${e2}=${u} V, mám ${p.e1.nazev}+${p.e2.nazev}=${p.napeti} V`;
		}
		const minusNazev = p.minus === null ? null : p.minus === 'e1' ? p.e1.nazev : p.e2.nazev;
		if (minusNazev !== minus) spatne = `pozice ${i}: záporná elektroda má být ${minus}, je ${minusNazev}`;
	});
	ok(spatne === null, spatne ?? `všech 6 dvojic sedí s tabulkou: ${ocekavane.map(([a, b, u]) => `${a}+${b}=${u}V`).join(', ')}`);
}

console.log('\n— stejné elektrody vždy 0 V, jiné vždy nenulové —');
{
	let sedi = true;
	for (const p of PARY) {
		const stejne = p.e1.nazev === p.e2.nazev;
		if (stejne && p.napeti !== 0) sedi = false;
		if (!stejne && p.napeti === 0) sedi = false;
	}
	ok(sedi, 'stejné kovy → 0 V, různé kovy → nenulové napětí, bez výjimky');
	let znamenkaOk = true;
	for (const p of PARY) {
		const zn = znamenka(p);
		if (p.minus === null && (zn.e1 !== null || zn.e2 !== null)) znamenkaOk = false;
		if (p.minus !== null && !((zn.e1 === '−' && zn.e2 === '+') || (zn.e1 === '+' && zn.e2 === '−'))) znamenkaOk = false;
	}
	ok(znamenkaOk, 'stejné elektrody nemají žádné znaménko, různé mají přesně jedno − a jedno +');
}

console.log('\n— formátování napětí (čárka jen u desetinných) —');
{
	ok(napetiText(0) === '0 V', `0 → „${napetiText(0)}"`);
	ok(napetiText(1.5) === '1,5 V', `1,5 → „${napetiText(1.5)}"`);
	ok(napetiText(1.1) === '1,1 V', `1,1 → „${napetiText(1.1)}"`);
	ok(napetiText(2) === '2 V', `2 → „${napetiText(2)}" (celé číslo bez zbytečné nuly)`);
	ok(napetiText(4.5) === '4,5 V', `4,5 → „${napetiText(4.5)}" (3 × 1,5 V ze zadání)`);
	ok(napetiText(9) === '9 V', `9 → „${napetiText(9)}" (6 × 1,5 V ze zadání)`);
}

// ── SCÉNA A ──────────────────────────────────────────────────────────────
const elektrodyA = prvky.get('gc-a-elektrody');
const infoA = prvky.get('gc-a-info');
const uA = prvky.get('gc-a-u');

console.log('\n— posuvník části A opravdu překresluje scénu —');
{
	ok((prvky.get('gc-a-par').posluchaci.input ?? []).length >= 1, 'posuvník dvojice elektrod má posluchač „input"');
	nastavA(0);
	const pred = elektrodyA.innerHTML;
	prvky.get('gc-a-par').value = '4';
	for (const f of prvky.get('gc-a-par').posluchaci.input) f();
	ok(elektrodyA.innerHTML !== pred, 'po spuštění posluchače se elektrody překreslí');
}

console.log('\n— barvy a znaménka badge sedí s modelem (ne jen text) —');
{
	// čte se přímo z vykreslených badge koleček, aby mutace prohozené polarity
	// nezůstala skrytá za textovým popiskem
	const badge = (barva) => barva === '#ff8787' ? '+' : barva === '#74c0fc' ? '−' : null;
	let spatne = null;
	for (let i = 0; i < PARY.length; i++) {
		nastavA(i);
		const kola = [...elektrodyA.innerHTML.matchAll(/<circle cx="(\d+)"[^>]*fill="(#[0-9a-f]+)"/g)];
		if (kola.length !== 2) { spatne = `dvojice ${i}: čekal jsem 2 badge kolečka, mám ${kola.length}`; continue; }
		const [b1, b2] = kola.map((m) => ({ cx: +m[1], sign: badge(m[2]) }));
		const zn = znamenka(PARY[i]);
		const ocek1 = b1.cx === 270 ? zn.e1 : zn.e2;
		const ocek2 = b2.cx === 390 ? zn.e2 : zn.e1;
		if (b1.sign !== ocek1 || b2.sign !== ocek2) spatne = `dvojice ${i}: badge ${b1.sign}/${b2.sign}, model čeká ${zn.e1}/${zn.e2}`;
	}
	ok(spatne === null, spatne ?? 'u všech 6 dvojic sedí barva/znaménko badge se skutečnou polaritou modelu');
}

console.log('\n— voltmetr a info panel ukazují totéž číslo —');
{
	for (let i = 0; i < PARY.length; i++) {
		nastavA(i);
		const p = PARY[i];
		ok(uA.innerHTML.includes(napetiText(p.napeti)), `dvojice ${i}: voltmetr ukazuje „${napetiText(p.napeti)}"`);
		ok(infoA.innerHTML.includes(napetiText(p.napeti)), `a info panel taky (${napetiText(p.napeti)})`);
		ok(infoA.innerHTML.includes(p.clanek), `info panel jmenuje typ článku: „${p.clanek}"`);
		ok(infoA.innerHTML.includes(p.elektrolyt), `a elektrolyt: „${p.elektrolyt}"`);
	}
}

console.log('\n— hláška u stejných elektrod nemluví o kladné/záporné —');
{
	nastavA(1); // zinek + zinek
	const stav = prvky.get('gc-a-stav').textContent;
	ok(stav.includes('0 V'), `hláška zmiňuje 0 V: „${stav}"`);
	ok(!stav.includes('záporná elektroda'), 'a nemluví o záporné elektrodě, když žádná není');
	nastavA(0); // zinek + uhlík
	const stav2 = prvky.get('gc-a-stav').textContent;
	ok(stav2.includes('Záporná elektroda je zinek'), `u jiné dvojice naopak ano: „${stav2}"`);
}

console.log('\n— TEXT hlášky jmenuje SPRÁVNOU kladnou i zápornou elektrodu (všech 6 dvojic) —');
{
	// Mutační test ukázal díru: kdyby se `par.minus === 'e1' ? par.e2.nazev
	// : par.e1.nazev` obrátilo (=== na !==), hláška by dětem tvrdila
	// OPAČNOU polaritu — a nic by si toho nevšimlo, protože se dřív
	// kontrolovala jen barva odznaku (ta touhle mutací zůstává správná),
	// ne samotný text. Tabulka je napsaná nezávisle na komponentě, přímo
	// ze zadané tabulky napětí.
	const ocekavaneJmena = [
		['zinek', 'uhlík'],
		['zinek', 'měď'],
		['olovo', 'oxid olovičitý'],
	];
	const indexyRuznych = [0, 2, 4]; // pozice s různými kovy v PARY (viz tabulka výš)
	let spatne = null;
	indexyRuznych.forEach((idx, k) => {
		nastavA(idx);
		const [minus, plus] = ocekavaneJmena[k]; // záporná je vždy ta první jmenovaná (méně ušlechtilá)
		const stav = prvky.get('gc-a-stav').textContent;
		if (!stav.includes(`Záporná elektroda je ${minus}`)) spatne = `dvojice ${idx}: hláška nejmenuje zápornou „${minus}" — „${stav}"`;
		if (!stav.includes(`kladná je ${plus}`)) spatne = `dvojice ${idx}: hláška nejmenuje kladnou „${plus}" — „${stav}"`;
	});
	ok(spatne === null, spatne ?? 'u všech 3 dvojic s různými kovy hláška jmenuje jak zápornou, tak SPRÁVNOU kladnou elektrodu');
}

console.log('\n— elektrody v kádince: voda dole, elektrody trčí do vzduchu i do roztoku —');
{
	// kádinka: stěny x=180..480, dno y=370; roztok y=260..366 (dole); vzduch nad ním
	nastavA(0);
	const tyce = [...elektrodyA.innerHTML.matchAll(/<rect x="(-?\d+)" y="(-?\d+)" width="24" height="235"/g)]
		.map((m) => ({ x: +m[1], y: +m[2] }));
	ok(tyce.length === 2, `dvě elektrody (tyče) ve scéně (${tyce.length})`);
	ok(tyce.every((t) => t.y < 260), 'tyče začínají NAD hladinou roztoku (ve vzduchu)');
	ok(tyce.every((t) => t.y + 235 > 260 && t.y + 235 < 370), 'a končí ponořené v roztoku, ne až na dně kádinky');
	ok(tyce.every((t) => t.x > 180 && t.x + 24 < 480), 'tyče jsou uvnitř stěn kádinky');
}

console.log('\n— nic nevyleze z obrázku A —');
{
	let mimo = null;
	for (let i = 0; i < PARY.length; i++) {
		nastavA(i);
		for (const g of [elektrodyA, infoA, uA]) {
			for (const t of g.innerHTML.matchAll(/<text x="(-?\d+)" y="(-?\d+)"/g)) {
				if (+t[1] < 10 || +t[1] > 650 || +t[2] < 10 || +t[2] > 470) mimo = `${g.id}: x=${t[1]} y=${t[2]} u dvojice ${i}`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'všechny texty zůstávají uvnitř viewBoxu 660×480');
}

// ── ČÁST B: fyzika ──────────────────────────────────────────────────────
console.log('\n— napětí se sčítá zapojením za sebou —');
{
	const ocekavane = { 1: 1.5, 2: 3, 3: 4.5, 4: 6, 5: 7.5, 6: 9 };
	let sedi = true;
	for (const [n, u] of Object.entries(ocekavane)) if (stavB(+n, 0, 1).napeti !== u) sedi = false;
	ok(sedi, `napětí roste po 1,5 V: ${Object.entries(ocekavane).map(([n, u]) => `${n}×→${u}V`).join(', ')}`);
	ok(stavB(3, 0, 1).napeti === 4.5, 'zadání: 3 články = 4,5 V');
	ok(stavB(6, 0, 1).napeti === 9, 'zadání: 6 článků = 9 V');
}

console.log('\n— velikost mění kapacitu a výdrž, NE napětí —');
{
	ok(VELIKOSTI[0].kapacita === 2000 && VELIKOSTI[1].kapacita === 12000,
		`AA 2000 mAh, D 12000 mAh (${VELIKOSTI[0].kapacita}, ${VELIKOSTI[1].kapacita})`);
	for (const n of [1, 3, 6]) {
		ok(stavB(n, 0, 1).napeti === stavB(n, 1, 1).napeti,
			`při ${n} článcích je napětí stejné pro AA i D (${stavB(n, 0, 1).napeti} V)`);
	}
	ok(stavB(1, 1, 1).vydrzH > stavB(1, 0, 1).vydrzH, 'D vydrží déle než AA při stejném proudu');
}

console.log('\n— výdrž vychází v celých hodinách (kalibrace ze zadání) —');
{
	const tabulka = [
		[0, 0, 10], [0, 1, 4], [0, 2, 2],     // AA: 200→10h, 500→4h, 1000→2h
		[1, 0, 60], [1, 1, 24], [1, 2, 12],   // D: 200→60h, 500→24h, 1000→12h
	];
	let spatne = null;
	for (const [vel, proud, h] of tabulka) {
		const v = stavB(3, vel, proud).vydrzH;
		if (v !== h) spatne = `velikost ${vel}, proud ${PROUDY[proud]} mA: čekal jsem ${h} h, vyšlo ${v}`;
		if (!Number.isInteger(v)) spatne = `velikost ${vel}, proud ${PROUDY[proud]} mA: výdrž není celé číslo (${v})`;
	}
	ok(spatne === null, spatne ?? 'všech 6 kombinací velikost×proud dává celé hodiny přesně podle zadání');
}

console.log('\n— výchozí hodnoty posuvníků dávají hezký příklad —');
{
	ok(prvky.get('gc-b-pocet').value === '3', 'výchozí počet článků je 3 (→ 4,5 V, příklad ze zadání)');
	ok(prvky.get('gc-b-proud').value === '1', 'výchozí proud je index 1 = 500 mA');
	ok(prvky.get('gc-b-velikost').value === '0', 'výchozí velikost je AA');
	ok(stavB(3, 0, 1).vydrzH === 4, 'výchozí kombinace: AA při 500 mA vydrží celé 4 h');
}

// ── ČÁST B: geometrie scény ──────────────────────────────────────────────
console.log('\n— geometrie řady článků: baseline pevná, výška roste jen nahoru —');
{
	let spatne = null;
	for (const vel of [0, 1]) {
		for (const n of [1, 3, 6]) {
			const g = geometriePack(n, vel);
			if (g.yBottom !== 150) spatne = `velikost ${vel}, ${n} článků: spodní hrana není 150 (${g.yBottom})`;
			if (g.cells.length !== n) spatne = `velikost ${vel}, ${n} článků: geometrie má ${g.cells.length} článků místo ${n}`;
		}
	}
	ok(spatne === null, spatne ?? 'spodní hrana pack je pro AA i D vždy na y=150 (jen výška roste nahoru)');
	ok(geometriePack(1, 1).cellHeight > geometriePack(1, 0).cellHeight, 'D článek je vyšší než AA');
	ok(geometriePack(1, 1).cellWidth > geometriePack(1, 0).cellWidth, 'D článek je i širší než AA');
}

console.log('\n— geometrie: konec výstupku (xNubEnd) je SOUČET x + šířka + nub, ne rozdíl —');
{
	// Mutační díra: kdyby se v `cells.push({ x, xNubEnd: x + cellWidth + NUB })`
	// změnilo sčítání na odčítání, články by se v řadě překrývaly nebo by se
	// celá řada posunula — a render hlavních obdélníků článků by to sám
	// neprozradil (ty stojí na `x`, ne na `xNubEnd`). Proto se očekávaná
	// hodnota počítá NEZÁVISLE, přímo v testu, ne přes tutéž mutovanou funkci.
	const SIRKA = { 0: 56, 1: 88 };
	const NUB = 6;
	let spatne = null;
	for (const vel of [0, 1]) {
		for (const n of [1, 3, 6]) {
			const g = geometriePack(n, vel);
			g.cells.forEach((c, i) => {
				const ocekavanyKonec = c.x + SIRKA[vel] + NUB;
				if (c.xNubEnd !== ocekavanyKonec) spatne = `velikost ${vel}, ${n} článků, článek ${i}: xNubEnd=${c.xNubEnd}, čekal jsem ${ocekavanyKonec}`;
				if (i > 0) {
					const predchozi = g.cells[i - 1];
					if (c.x !== predchozi.x + SIRKA[vel] + NUB) spatne = `velikost ${vel}, ${n} článků: článek ${i} nenavazuje na konec článku ${i - 1} (x=${c.x}, čekal jsem ${predchozi.x + SIRKA[vel] + NUB})`;
					if (c.x < predchozi.x + SIRKA[vel]) spatne = `velikost ${vel}, ${n} článků: článek ${i} se překrývá s článkem ${i - 1}`;
				}
			});
			const posledni = g.cells[g.cells.length - 1];
			if (g.xLastRight !== posledni.x + SIRKA[vel] + NUB) spatne = `velikost ${vel}, ${n} článků: xLastRight (${g.xLastRight}) nesedí s koncem posledního článku`;
		}
	}
	ok(spatne === null, spatne ?? 'články jdou zleva doprava bez překryvu a xNubEnd/xLastRight jsou vždy x + šířka + nub');
}

console.log('\n— počet vykreslených článků odpovídá posuvníku —');
{
	for (const n of [1, 3, 6]) {
		nastavB(n);
		const pack = prvky.get('gc-b-pack');
		const obdelniky = [...pack.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="(\d+)" height="(\d+)"/g)]
			.filter((m) => +m[3] === geometriePack(n, 0).cellWidth); // jen hlavní tělo článků, ne čepičky
		ok(obdelniky.length === n, `${n} článků na posuvníku → ${obdelniky.length} obdélníků ve scéně`);
	}
}

console.log('\n— polarita pack: vlevo − vpravo + a napětí roste s délkou drátu badge—');
{
	nastavB(3);
	const pack = prvky.get('gc-b-pack');
	const minusIdx = pack.innerHTML.indexOf('−');
	const plusIdx = pack.innerHTML.indexOf('+');
	ok(minusIdx !== -1 && plusIdx !== -1 && minusIdx < plusIdx, 'v HTML je − dřív než + (vlevo minus, vpravo plus)');
	const kolecka = [...pack.innerHTML.matchAll(/<circle cx="(-?[\d.]+)"/g)].map((m) => +m[1]);
	ok(kolecka.length === 2 && kolecka[0] < kolecka[1], `badge − je vlevo od badge + (${kolecka.join(', ')})`);
}

console.log('\n— pravý (+) odznak leží AŽ ZA posledním článkem, uvnitř plátna —');
{
	// Mutační díra: kdyby se `g.xLastRight + 10` (kroužek i text) změnilo na
	// odečítání, popisek + by skočil DOLEVA — klidně přes poslední článek.
	// Kontroluje se skutečná VYKRESLENÁ souřadnice (ne pořadí v HTML) proti
	// skutečně vykreslenému pravému okraji posledního článku.
	let spatne = null;
	for (const vel of [0, 1]) {
		for (const n of [1, 3, 6]) {
			nastavB(n, vel, 1);
			const pack = prvky.get('gc-b-pack');
			const obdelniky = [...pack.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="(\d+)" height="(\d+)"/g)]
				.filter((m) => +m[3] === geometriePack(n, vel).cellWidth);
			if (obdelniky.length === 0) { spatne = `velikost ${vel}, ${n} článků: nenašel jsem žádný článek`; continue; }
			const pravyOkraj = Math.max(...obdelniky.map((m) => +m[1] + +m[3]));
			const kolecka2 = [...pack.innerHTML.matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)"[^>]*fill="(#[0-9a-f]+)"/g)]
				.map((m) => ({ cx: +m[1], cy: +m[2], barva: m[3] }));
			const plusOdznak = kolecka2.find((k) => k.barva === '#ff8787');
			if (!plusOdznak) { spatne = `velikost ${vel}, ${n} článků: chybí + odznak`; continue; }
			if (plusOdznak.cx <= pravyOkraj) spatne = `velikost ${vel}, ${n} článků: + odznak (x=${plusOdznak.cx}) NENÍ napravo od posledního článku (pravý okraj x=${pravyOkraj})`;
			if (plusOdznak.cx > 655) spatne = `velikost ${vel}, ${n} článků: + odznak leží mimo plátno (x=${plusOdznak.cx})`;
			const plusText = [...pack.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"[^>]*>\+<\/text>/g)].map((m) => ({ x: +m[1], y: +m[2] }));
			if (plusText.length === 0 || plusText[0].x !== plusOdznak.cx) spatne = `velikost ${vel}, ${n} článků: text „+" (x=${plusText[0]?.x}) nesedí vodorovně s kroužkem (x=${plusOdznak.cx})`;
			// Svislá souřadnice: text má sedět přesně 5 px POD středem kroužku
			// (posun kvůli účaří textu) — hodnota 5 je napsaná napevno, ne
			// odvozená z komponenty, aby mutace g.yMid + 5 → g.yMid − 5 test
			// spolehlivě rozbila (jinak by text vylezl 10 px nad kroužek).
			const OCEKAVANY_SVISLY_POSUN = 5;
			if (plusText.length && plusText[0].y !== plusOdznak.cy + OCEKAVANY_SVISLY_POSUN) {
				spatne = `velikost ${vel}, ${n} článků: text „+" (y=${plusText[0].y}) NENÍ ${OCEKAVANY_SVISLY_POSUN} px pod středem kroužku (cy=${plusOdznak.cy}, čekal jsem y=${plusOdznak.cy + OCEKAVANY_SVISLY_POSUN})`;
			}
		}
	}
	ok(spatne === null, spatne ?? 've všech kombinacích leží + odznak i s popiskem napravo od posledního článku a uvnitř plátna');
}

console.log('\n— nic se nepřekrývá a nic neleze z obrázku B —');
{
	let mimo = null;
	for (const n of [1, 3, 6]) {
		for (const vel of [0, 1]) {
			nastavB(n, vel, 1);
			for (const g of [prvky.get('gc-b-pack'), prvky.get('gc-b-obvod'), prvky.get('gc-b-info'), prvky.get('gc-b-celkem')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 5 || +t[1] > 655 || +t[2] < 10 || +t[2] > 410) mimo = `${g.id}: x=${t[1]} y=${t[2]} (n=${n}, velikost=${vel})`;
				}
				for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="(-?[\d.]+)" height="(-?[\d.]+)"/g)) {
					const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
					if (x < 0 || x + w > 660 || y < 0 || y + h > 420) mimo = `${g.id}: obdélník ${x},${y} ${w}×${h} (n=${n}, velikost=${vel})`;
				}
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'texty i obdélníky zůstávají uvnitř viewBoxu 660×420 pro krajní i střední hodnoty');
}

console.log('\n— počitadlo B ukazuje totéž co model —');
{
	for (const [n, vel, proud] of [[1, 0, 0], [3, 0, 1], [6, 1, 2], [4, 1, 0]]) {
		nastavB(n, vel, proud);
		const s = stavB(n, vel, proud);
		const info = prvky.get('gc-b-info').innerHTML;
		ok(info.includes(napetiText(s.napeti)), `${n} článků, velikost ${vel}: panel ukazuje ${napetiText(s.napeti)}`);
		ok(info.includes(`${s.kapacita} mAh`), `a kapacitu ${s.kapacita} mAh`);
		ok(info.includes(hodin(s.vydrzH)), `a výdrž „${hodin(s.vydrzH)}"`);
	}
}

console.log('\n— čeština: skloňování článků a hodin —');
{
	const tvaryClanku = { 1: '1 článek', 2: '2 články', 3: '3 články', 4: '4 články', 5: '5 článků', 6: '6 článků' };
	for (const [n, t] of Object.entries(tvaryClanku)) ok(clanku(+n) === t, `${n} → „${clanku(+n)}"`);
	const tvaryHodin = { 1: '1 hodina', 2: '2 hodiny', 4: '4 hodiny', 10: '10 hodin', 12: '12 hodin', 24: '24 hodin', 60: '60 hodin' };
	for (const [n, t] of Object.entries(tvaryHodin)) ok(hodin(+n) === t, `${n} → „${hodin(+n)}"`);
}

console.log('\n— žádné desetinné číslo tam, kde nemá být (kromě samotného napětí) —');
{
	// napětí smí mít desetinnou čárku (1,5 V / 4,5 V / 7,5 V je učivo), ale
	// kapacita, proud a výdrž musí zůstat celá — to kontroluje zvlášť
	for (const n of [1, 2, 3, 4, 5, 6]) {
		for (const vel of [0, 1]) {
			for (const proud of [0, 1, 2]) {
				const s = stavB(n, vel, proud);
				if (!Number.isInteger(s.vydrzH)) { ok(false, `${n} článků, velikost ${vel}, proud ${PROUDY[proud]} mA: výdrž ${s.vydrzH} není celé číslo`); chyby++; }
			}
		}
	}
	ok(true, 've všech 36 kombinacích B vychází výdrž jako celé číslo');
}

console.log('\n— odolnost: neplatný počet článků NESMÍ shodit skript (nález zkontroluj.mjs) —');
{
	// Dřív `geometriePack` na neplatný počet (prázdné pole `cells`) spadlo na
	// „Cannot read properties of undefined (reading 'xNubEnd')" a shodilo
	// CELÝ skript — tedy i část A. Zkouší se přímo pure funkce se sadou
	// hodnot, které šablonový test i prohlížeč reálně můžou poslat.
	const neplatneHodnoty = [NaN, undefined, null, '', 'abc', 0, -1, 7, 3.7];
	let spatne = null;
	for (const hodnota of neplatneHodnoty) {
		try {
			const g = geometriePack(hodnota, 0);
			if (g.cells.length < 1 || g.cells.length > 6) spatne = `geometriePack(${hodnota}): ${g.cells.length} článků mimo rozsah 1–6`;
			if (!Number.isFinite(g.xLastRight)) spatne = `geometriePack(${hodnota}): xLastRight není konečné číslo (${g.xLastRight})`;
		} catch (e) {
			spatne = `geometriePack(${hodnota}) SPADLO: ${e.message}`;
		}
		try {
			const s = stavB(hodnota, 0, 1);
			if (!(s.pocet >= 1 && s.pocet <= 6)) spatne = `stavB(${hodnota}): pocet ${s.pocet} mimo rozsah 1–6`;
			if (!Number.isFinite(s.napeti) || !Number.isFinite(s.vydrzH)) spatne = `stavB(${hodnota}): napeti/vydrzH není konečné číslo`;
		} catch (e) {
			spatne = `stavB(${hodnota}) SPADLO: ${e.message}`;
		}
	}
	ok(spatne === null, spatne ?? `pure funkce nespadnou na žádné z ${neplatneHodnoty.length} neplatných hodnot a vrátí smysluplný počet 1–6`);
}

console.log('\n— odolnost: neplatná hodnota přímo na posuvníku nezhroutí překreslení B —');
{
	// Test má měřit JEDNU pokaženou proměnnou (počet), ne náhodou zděděný
	// stav ze sekcí výš — velikost a proud se proto nejdřív nastaví na
	// ZNÁMOU platnou hodnotu (AA, 500 mA), teprve pak se pokazí počet.
	// (Dřív tu zůstávala velikost „D" z předchozí sekce, filtr níž ale čekal
	// šířku AA — reálně se vykreslily 3 platné D-články, jenže se šířkou 88,
	// takže filtr na šířku 56 napočítal 0 a hlásil falešný poplach.)
	prvky.get('gc-b-velikost').value = '0';
	prvky.get('gc-b-proud').value = '1';
	let spadlo = null;
	try {
		prvky.get('gc-b-pocet').value = '';
		for (const f of prvky.get('gc-b-pocet').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `překreslení B spadlo na prázdné hodnotě posuvníku: ${spadlo}` : 'prázdná hodnota posuvníku nezhroutí prekresliB()');
	// a scéna po tom musí dávat SMYSL (rozumný počet článků), ne prázdno/pád
	const pack = prvky.get('gc-b-pack');
	const clankyVeScene = [...pack.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="(\d+)" height="(\d+)"/g)]
		.filter((m) => +m[3] === geometriePack(3, 0).cellWidth).length;
	ok(clankyVeScene >= 1 && clankyVeScene <= 6, `scéna po neplatné hodnotě ukazuje smysluplný počet článků (${clankyVeScene})`);
	ok(!prvky.get('gc-b-out-pocet').textContent.includes('NaN'), `popisek počtu neobsahuje „NaN": „${prvky.get('gc-b-out-pocet').textContent}"`);
	ok(!prvky.get('gc-b-vypocet').innerHTML.includes('NaN'), 'ani vzorec pod scénou neobsahuje „NaN"');
	nastavB(3); // vrátit posuvník do platného stavu, ať neovlivní nic dalšího
}

console.log('\n— odolnost: neplatný počet PLUS náhodně zděděná velikost z jiné sekce —');
{
	// Doplňkový test bez resetu velikosti — schválně simuluje pořadí, které
	// dřív dalo falešný poplach: velikost zůstane rozhozená (D) z předchozí
	// sekce, pokazí se jen počet. Scéna musí mít rozumný počet ČLÁNKŮ bez
	// ohledu na to, jakou mají zrovna šířku (AA, nebo D).
	nastavB(6, 1, 1); // úmyslně necháme velikost = D (1), ať zůstane „zděděná"
	let spadlo = null;
	try {
		prvky.get('gc-b-pocet').value = 'abc';
		for (const f of prvky.get('gc-b-pocet').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `překreslení B spadlo: ${spadlo}` : 'neplatná hodnota nezhroutí prekresliB() ani se „zděděnou" velikostí D');
	// velikost jsme v tomhle bloku sami nastavili na 1 (D) a nic ji dál
	// neměnilo, takže šířku článku pro filtr známe napevno — bez závislosti
	// na neexportované interní funkci komponenty.
	const pack2 = prvky.get('gc-b-pack');
	const clankyVeScene2 = [...pack2.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="(\d+)" height="(\d+)"/g)]
		.filter((m) => +m[3] === geometriePack(3, 1).cellWidth).length;
	ok(clankyVeScene2 >= 1 && clankyVeScene2 <= 6, `scéna má rozumný počet článků i se zděděnou velikostí D (${clankyVeScene2})`);
	nastavB(3);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Galvanický článek', 'Sestav článek', 'Zapoj za sebou', 'spotřebič']) {
		ok(html.includes(slovo), `v HTML je natvrdo „${slovo}"`);
	}
	ok(/id="gc-a-par"[^>]*min="0"[^>]*max="5"/.test(html), 'posuvník dvojice elektrod jde 0 až 5 (šest dvojic)');
	ok(/id="gc-b-pocet"[^>]*min="1"[^>]*max="6"[^>]*value="3"/.test(html), 'posuvník počtu článků jde 1 až 6, výchozí 3');
	ok(/id="gc-b-proud"[^>]*min="0"[^>]*max="2"[^>]*value="1"/.test(html), 'posuvník proudu má 3 volby, výchozí index 1 (500 mA)');
}

console.log(chyby === 0 ? '\n✅ Galvanický článek: vše sedí.' : `\n❌ Galvanický článek: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

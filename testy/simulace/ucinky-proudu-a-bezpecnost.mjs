#!/usr/bin/env node
// Ověření UcinkyProuduABezpecnostSimulace.astro — Ohmův zákon na lidském těle.
//
// Tohle je bezpečnostní téma, takže test cílí přímo na nálezy nezávislé
// kontroly 14.–15. 8. (3 závažné, několik drobných):
// (1) Scéna B, volba „jedna ruka" učila nebezpečnou nepravdu — postava
//     stojící bosky na zemi dostala u dotyku 230 V jednou rukou I = 0 mA /
//     „bezpečno", ačkoli by nohy obvod uzavřely stejně jako u ruka→noha.
//     PŘEPRACOVÁNO na 'izolace' (bezpečné JEN s viditelnou gumovou
//     podložkou); 'ruka-noha' teď textem výslovně říká, že i jedna ruka
//     stačí, když nohy stojí na zemi. Test níž ověřuje OBOJÍ.
// (2) Test dřív měřil jen čísla v konstantách, žádný z textů pod scénami.
//     Kontrolor doložil 7 podvrhů, které tichým testem PROŠLY (viditelný
//     vzorec počítal 10× proud, varování ztratilo varovný obsah, pásmo
//     „zástava" přejmenované na „nepříjemné brnění" — protože se text
//     porovnával sám se sebou — popis „křeč" nahrazený radou „odtrhni
//     holou rukou" atd.). Test níž POROVNÁVÁ vykreslený text buď s NEZÁVISLE
//     natvrdo napsanou tabulkou (OCEKAVANA_PASMA/OCEKAVANE_CESTY — NE s tím,
//     co si live PASMA/CESTY samo o sobě myslí), nebo přesnou rekonstrukcí
//     očekávaného řetězce ze stejných čistých funkcí, jaké volá komponenta
//     (ocekavaneA/ocekavaneB) — a navíc plošně hlídá zakázané fráze.
// (3) Ve scéně B se dráha proudu a tečky kreslily PŘED tělem, takže je trup
//     překryl. Test ověřuje POŘADÍ uzlů v syrovém SVG (torso musí být PŘED
//     cesta-linka/elektrony).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');

const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {},
		posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(dite) { (this.deti ||= []).push(dite); },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
let vytvorenychNS = 0;
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	createElementNS: () => { vytvorenychNS++; return novy(`ns-${vytvorenychNS}`); },
};
// requestAnimationFrame/cancelAnimationFrame se POČÍTAJÍ, ne jen tiše
// odbaví — jinak by nekonečná smyčka spuštěná při načtení (nález nezávislé
// kontroly 14. 8. večer: 5 minut běhu, exit 143 po zabití) prošla testem
// beze stopy, protože stub `() => {}` volání přijme a nic neřekne.
let pocetRAF = 0, pocetCAF = 0;
const sandbox = {
	document, performance: { now: () => 0 }, console, Math,
	requestAnimationFrame: (fn) => { pocetRAF++; return pocetRAF; },
	cancelAnimationFrame: () => { pocetCAF++; },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);
const pocetRAFPriNacteni = pocetRAF; // kolikrát se rAF zavolal BĚHEM startu skriptu, bez jediné interakce žáka

const svgA = prvky.get('upb-a-svg');
const svgB = prvky.get('upb-b-svg');
const {
	__odporTela: odporTela, __jePresnyOdpor: jePresnyOdpor, __proudMA: proudMA, __pasmo: pasmo,
	__mAtoText: mAtoText, __cz: cz, __tisice: tisice,
	__PASMA: PASMA, __ODPORY: ODPORY, __NAPETI: NAPETI,
	__NAPETI_KLICE: NAPETI_KLICE, __NAPETI_NAZEV: NAPETI_NAZEV, __ICON_PRAVY_OKRAJ: ICON_PRAVY_OKRAJ,
	__KUZE_KLICE: KUZE_KLICE, __KUZE_NAZEV: KUZE_NAZEV, __KUZE_BARVA: KUZE_BARVA,
	__PRAH_PRURAZU_V: PRAH_PRURAZU_V, __geometrieZonySegmentu: geometrieZonySegmentu,
	__PASMO_BAR: PASMO_BAR,
} = svgA;
const {
	__proudCestou: proudCestou, __CESTY: CESTY, __CESTA_KLICE: CESTA_KLICE,
	__BODY: BODY, __NAPETI_B: NAPETI_B, __boduNaCeste: boduNaCeste, __jedeB: jedeB,
} = svgB;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const nastavA = (iN, iK) => {
	prvky.get('upb-a-napeti').value = String(iN);
	prvky.get('upb-a-kuze').value = String(iK);
	for (const f of prvky.get('upb-a-napeti').posluchaci.input) f();
	for (const f of prvky.get('upb-a-kuze').posluchaci.input) f();
};
const nastavB = (iC) => {
	prvky.get('upb-b-cesta').value = String(iC);
	for (const f of prvky.get('upb-b-cesta').posluchaci.input) f();
};
const kliknoutPlay = () => { for (const f of prvky.get('upb-b-play').posluchaci.click) f(); };

// ── Přesná rekonstrukce očekávaného textu ze stejných čistých funkcí, jaké
// volá komponenta (cz/tisice/mAtoText/odporTela/jePresnyOdpor/proudMA/pasmo
// jsou hooky na SKUTEČNÝ kód, ne opis) — chytí mutaci v ŠABLONĚ textu
// (např. „vzorec počítá 10× proud"), i když by pure funkce samy byly OK.
function ocekavaneA(napetiKlic, kuzeKlic) {
	const U = NAPETI[napetiKlic];
	const R = odporTela(kuzeKlic, U);
	const Rtext = `${jePresnyOdpor(kuzeKlic, U) ? '' : '≈ '}${tisice(R)} Ω`;
	const mA = proudMA(U, R);
	const p = pasmo(mA);
	const vypocet = `I = U ÷ R = ${cz(U, 2)} V ÷ ${Rtext} = <strong>${mAtoText(mA)}</strong>`;
	const stav = `${NAPETI_NAZEV[napetiKlic]} (${cz(U, 2)} V) na ${KUZE_NAZEV[kuzeKlic]}: proud ${mAtoText(mA)} spadá do pásma „${p.nazev}“ – ${p.popis}`
		+ (napetiKlic === 'zasuvka' ? ' ⚠️ Zásuvka je nebezpečná VŽDY, i pro úplně suchého člověka — nikdy se to nezkouší.' : '');
	const info = `<text x="530" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#2b2a26">U = ${cz(U, 2)} V, R = ${Rtext}</text>`
		+ `<text x="530" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="${p.barva}">I = ${mAtoText(mA)}</text>`
		+ `<text x="530" y="128" text-anchor="middle" font-size="12" fill="#2b2a26">pásmo: ${p.nazev}</text>`;
	const varovani = napetiKlic === 'zasuvka'
		? `<rect x="430" y="234" width="200" height="46" rx="8" fill="#ffffff" stroke="#e03131" stroke-width="3" />`
			+ `<text x="530" y="252" text-anchor="middle" font-size="12" font-weight="bold" fill="#e03131">⚠️ Zásuvka je nebezpečná</text>`
			+ `<text x="530" y="268" text-anchor="middle" font-size="12" font-weight="bold" fill="#e03131">VŽDY — nikdy nezkoušet!</text>`
		: '';
	return { U, R, mA, p, vypocet, stav, info, varovani };
}
function ocekavaneB(cestaKlic) {
	const c = CESTY[cestaKlic];
	const mA = c.uzavrena ? proudMA(NAPETI_B, c.r) : 0;
	const p = pasmo(mA);
	const Rtext = c.uzavrena ? `${c.presny ? '' : '≈ '}${tisice(c.r)} Ω` : '∞ (obvod otevřen)';
	const vypocet = c.uzavrena
		? `I = U ÷ R = ${cz(NAPETI_B, 0)} V ÷ ${Rtext} = <strong>${mAtoText(mA)}</strong>`
		: `Obvod se neuzavře → <strong>I = 0 mA</strong>`;
	const stav = c.uzavrena
		? `${c.nazev}: ${c.popis} Proud ${mAtoText(mA)} spadá do pásma „${p.nazev}“.`
		: `${c.nazev}: ${c.popis}`;
	const info = `<text x="530" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#2b2a26">U = ${cz(NAPETI_B, 0)} V, R = ${Rtext}</text>`
		+ `<text x="530" y="110" text-anchor="middle" font-size="15" font-weight="bold" fill="${p.barva}">I = ${mAtoText(mA)}</text>`
		+ `<text x="530" y="128" text-anchor="middle" font-size="12" fill="#2b2a26">pásmo: ${p.nazev}</text>`;
	return { mA, p, vypocet, stav, info };
}

// ── NEZÁVISLE natvrdo napsaná tabulka (NE odvozená z live PASMA/CESTY!) —
// pokud někdo přejmenuje pásmo nebo přepíše popis na nebezpečnou radu, live
// pole se sice bude „shodovat samo se sebou", ale s TOUHLE tabulkou už ne.
const OCEKAVANA_PASMA = [
	{ klic: 'nevnimas', limit: 1, nazev: 'pod prahem vnímání', popis: 'Proud je tak malý, že ho vůbec neucítíš.' },
	{ klic: 'brneni', limit: 6, nazev: 'brnění', popis: 'Ucítíš mravenčení, ale svaly tě poslouchají.' },
	{ klic: 'krec-sval', limit: 15, nazev: 'křeč svalů – nemůžeš se pustit', popis: 'Svaly se křečovitě stáhnou a sám se nepustíš — proud musí bezpečně přerušit někdo jiný (vypnutím, ne rukou).' },
	{ klic: 'krec-silici', limit: 25, nazev: 'křeč sílí – blíží se ohrožení dýchání', popis: 'Křeč dál sílí a blíží se hranici, kdy začnou selhávat i dýchací svaly — pořád platí totéž: proud musí přerušit někdo jiný, ne ty sám.' },
	{ klic: 'krec-dychani', limit: 60, nazev: 'křeč dýchacích svalů', popis: 'Křeč zasáhne i svaly, kterými dýcháš — hrozí udušení.' },
	{ klic: 'fibrilace', limit: 80, nazev: 'fibrilace srdce', popis: 'Srdce ztrácí pravidelný rytmus — bez rychlé pomoci hrozí zástava.' },
	{ klic: 'zastava', limit: Infinity, nazev: 'zástava srdce', popis: 'Proud zastaví srdce úplně — jde o život, je potřeba okamžitá první pomoc a rychlá záchranka.' },
];
// Nález nezávislé kontroly 14. 8. večer: výklad na stránce má PRÁH 15 mA
// („6–15 mA — křeč, nemůže se pustit"), simulace dřív měla jen 6–25 mA pod
// jménem „6–15" a test tvrdil „přesně na prazích z výkladu", což bylo o
// jeden práh nepravda. Tabulka výš má teď VŠECH ŠEST prahů (1/6/15/25/60/80).
const OCEKAVANE_CESTY = {
	// Nález nezávislé kontroly 14. 8. večer: dřívější odpory scény B (1000 Ω
	// „z výkladu" bez zmínky o vlhkosti, 2000 Ω vlastní odhad) daly pro
	// „ruka→noha" jiné číslo (115 mA) než STEJNÁ situace v části A (153,3 mA)
	// — teď se OBĚ hodnoty odvozují ze stejné dvojice z výkladu jako část A
	// (1500 Ω suchá / 1000 Ω mokrá), nic navíc.
	'ruka-ruka': { r: 1000, presny: true, uzavrena: true, nazev: 'ruka → ruka',
		popis: 'Proud jde napříč hrudníkem přímo přes srdce — ze všech cest nejnebezpečnější. Při skutečné nehodě bývají ruce zpocené strachem, takže odpor kůže klesne stejně nízko jako u mokré kůže z části A (1 000 Ω).' },
	'ruka-noha': { r: 1500, presny: true, uzavrena: true, nazev: 'ruka → noha',
		popis: 'Přesně tohle se stane, když se JEDNOU rukou dotkneš vodiče a bosou nohou stojíš na obyčejné suché podlaze — nohy uzavřou obvod do země, takže stačí i jediná ruka. Odpor je stejný jako u suché kůže v části A (1 500 Ω), a proto vyjde úplně stejný proud jako tam.' },
	izolace: { r: null, presny: true, uzavrena: false, nazev: 'ruka + izolace nohou',
		popis: 'Gumová podložka pod nohama přeruší cestu do země, takže se obvod NEUZAVŘE. Takhle bezpečně pracují jen vyškolení elektrikáři s ochrannými pomůckami — není to rada pro tebe: bez izolace by i jedna ruka byla stejně nebezpečná jako cesta ruka → noha.' },
};
// Zakázané fráze, které se NESMÍ objevit v ŽÁDNÉM textu žádné scény — ověřeno
// plošně přes všechny stavy níž, VČETNĚ statického HTML mimo <script>
// (nález nezávislé kontroly 14. 8. odpoledne: podvrh věty ve výkladu scény
// „…tě spolehlivě ochrání i u zásuvky — suchou rukou se dá klidně dotknout
// drátu." dřív prošel beze stopy, protože se ZAKAZANE_FRAZE pouštěly jen na
// dynamicky vykreslené texty, nikdy na `html`). Je to DOPLNĚK k přesné shodě
// s tabulkou výš (chytí i to, kdyby se sama „správná" tabulka nešťastně upravila).
const ZAKAZANE_FRAZE = [/holou rukou/i, /klidn[ěe].{0,25}dotk/i, /nic\s*(ti\s*)?nehroz[íi]/i, /skoro nikdy/i, /neubl[íi]ž/i, /odtrhni/i, /bezpečně?\s+dotkn/i, /ochrán\w*.{0,15}u\s+zásuvky/i, /spolehliv[ěe].{0,15}ochrán/i];

console.log('— scéna B se PŘI NAČTENÍ nikdy sama nerozběhne (nezávislá kontrola 14. 8.) —');
{
	// Doklad, ne odhad: skutečně SPOČÍTANÝ počet volání requestAnimationFrame
	// od začátku vm.runInContext (celý běh <script> včetně počátečního
	// prekresliA()/prekresliB()) až do teď — bez jediného kliknutí žáka.
	ok(pocetRAFPriNacteni === 0,
		`requestAnimationFrame se PŘI NAČTENÍ nezavolal ani jednou — animace čeká na klik (zavoláno ${pocetRAFPriNacteni}×)`);
	ok(jedeB() === false, `hned po načtení animace neběží (jedeB() = ${jedeB()})`);

	const tecky0 = [1, 2, 3, 4, 5].map((n) => prvky.get(`ns-${n}`));
	const polohy = tecky0.map((t) => `${t.getAttribute('cx')},${t.getAttribute('cy')}`);
	ok(tecky0.every((t) => t.getAttribute('opacity') === '1'), 'tečky jsou hned po načtení viditelné (výchozí cesta je uzavřená)');
	ok(new Set(polohy).size === 5, `všech 5 teček má hned po načtení RŮZNOU polohu na cestě, bez animace: ${polohy.join(' | ')}`);
}

console.log('\n— NEZÁVISLÁ KONTROLA TEXTŮ 1/4: pásma odpovídají natvrdo napsané tabulce (ne sama sobě) —');
{
	// Nález nezávislé kontroly: podvrh „zástava" → „nepříjemné brnění" prošel,
	// protože se dřív porovnávalo `pasmoText !== p.nazev` — vykreslený text
	// se STEJNÝM (přejmenovaným) polem, ne s nezávislou tabulkou. Teď se
	// PASMA porovnává s OCEKAVANA_PASMA definovanou natvrdo přímo v testu.
	ok(PASMA.length === OCEKAVANA_PASMA.length, `živé PASMA má stejný počet pásem jako tabulka (${PASMA.length} / ${OCEKAVANA_PASMA.length})`);
	let spatne = null;
	for (let i = 0; i < OCEKAVANA_PASMA.length && !spatne; i++) {
		const zive = PASMA[i], ocek = OCEKAVANA_PASMA[i];
		if (!zive) { spatne = `chybí pásmo na indexu ${i} (${ocek.klic})`; break; }
		if (zive.klic !== ocek.klic) spatne = `index ${i}: klíč „${zive.klic}“, čekal jsem „${ocek.klic}“`;
		if (zive.limit !== ocek.limit) spatne = `${ocek.klic}: limit ${zive.limit} mA, čekal jsem ${ocek.limit} mA`;
		if (zive.nazev !== ocek.nazev) spatne = `${ocek.klic}: název „${zive.nazev}“, čekal jsem přesně „${ocek.nazev}“`;
		if (zive.popis !== ocek.popis) spatne = `${ocek.klic}: popis „${zive.popis}“, čekal jsem přesně „${ocek.popis}“`;
	}
	ok(spatne === null, spatne ?? `všech ${OCEKAVANA_PASMA.length} pásem (klíč, práh, název, popis) sedí PŘESNĚ s nezávisle napsanou tabulkou`);
}

console.log('\n— NEZÁVISLÁ KONTROLA TEXTŮ 2/4: cesty tělem (scéna B) odpovídají natvrdo napsané tabulce —');
{
	for (const [klic, ocek] of Object.entries(OCEKAVANE_CESTY)) {
		const zive = CESTY[klic];
		ok(!!zive, `živé CESTY obsahuje klíč „${klic}“`);
		if (!zive) continue;
		ok(zive.r === ocek.r, `${klic}: R=${zive.r} Ω, čekal jsem ${ocek.r}`);
		ok(zive.presny === ocek.presny, `${klic}: presny=${zive.presny}, čekal jsem ${ocek.presny}`);
		ok(zive.uzavrena === ocek.uzavrena, `${klic}: uzavrena=${zive.uzavrena}, čekal jsem ${ocek.uzavrena}`);
		ok(zive.nazev === ocek.nazev, `${klic}: název „${zive.nazev}“, čekal jsem přesně „${ocek.nazev}“`);
		ok(zive.popis === ocek.popis, `${klic}: popis se PŘESNĚ shoduje s očekávaným (délka ${zive.popis.length} vs ${ocek.popis.length})`);
	}
	ok(Object.keys(CESTY).length === 3, `právě 3 cesty, žádná navíc (${Object.keys(CESTY).length})`);

	console.log('  — bezpečnostní obsah (oprava nálezu #1: „jedna ruka" už netvrdí bezpečno na obyčejné zemi) —');
	ok(!CESTA_KLICE.includes('jedna-ruka'), 'stará volba „jedna-ruka" (otevřený obvod = automaticky bezpečno na zemi) byla ODSTRANĚNA');
	ok(CESTA_KLICE.includes('izolace'), 'nahrazena volbou „izolace", kde je bezpečnost VIDĚT (podložka), ne jen tvrzena');
	ok(/JEDNOU rukou|jedin[áý] ruka|i jedna ruka/i.test(CESTY['ruka-noha'].popis),
		`„ruka → noha" výslovně říká, že i JEDNA ruka stačí ke smrtelnému nebezpečí: „${CESTY['ruka-noha'].popis}"`);
	ok(CESTY['ruka-noha'].uzavrena === true && proudCestou('ruka-noha') > 0,
		'„ruka → noha" (fyzicky = dotyk jednou rukou při stání na zemi) NENÍ nikdy vykreslena jako bezpečná (I > 0)');
	ok(/izolac|podložk/i.test(CESTY.izolace.popis), `jediná bezpečná volba podmiňuje bezpečnost viditelnou izolací: „${CESTY.izolace.popis}"`);
	ok(/bez izolace/i.test(CESTY.izolace.popis), 'popis bezpečné volby výslovně podmiňuje bezpečnost („bez izolace by...")');
}

console.log('\n— NEZÁVISLÁ KONTROLA TEXTŮ 3/4: varování ve scéně A je SKUTEČNĚ varovné (ne jen slovo „nikdy" kdekoli) —');
{
	// Nález nezávislé kontroly: podvrh „Zásuvka skoro nikdy neublíží" obsahuje
	// slovo „nikdy", takže starý test /nikdy/i prošel. Teď se vyžaduje PŘESNÁ
	// shoda s očekávaným varovným zněním, ne jen přítomnost jednoho slova.
	nastavA(0, 0);
	ok(prvky.get('upb-a-varovani').innerHTML === ocekavaneA('baterie', 'sucha').varovani, 'u baterie se varovací box nevykresluje (přesná shoda s očekávaným „")');
	nastavA(1, 0);
	ok(prvky.get('upb-a-varovani').innerHTML === ocekavaneA('autobaterie', 'sucha').varovani, 'u autobaterie se varovací box nevykresluje');
	for (const kuzeKlic of KUZE_KLICE) {
		nastavA(2, KUZE_KLICE.indexOf(kuzeKlic));
		const html2 = prvky.get('upb-a-varovani').innerHTML;
		const ocek = ocekavaneA('zasuvka', kuzeKlic).varovani;
		ok(html2 === ocek, `zásuvka + ${kuzeKlic}: varovací box PŘESNĚ odpovídá očekávanému znění (obsahuje „nikdy nezkoušet!“ a „nebezpečná“)`);
		ok(html2.includes('Zásuvka je nebezpečná') && html2.includes('nikdy nezkoušet'), `a doslovně obsahuje varovné fráze: „${html2}"`);
		for (const fraze of ZAKAZANE_FRAZE) ok(!fraze.test(html2), `varování neobsahuje zakázanou frázi ${fraze}`);
	}
	nastavA(0, 0);
}

console.log('\n— NEZÁVISLÁ KONTROLA TEXTŮ 4/4: VŠECH 9 kombinací A + VŠECH 3 cesty B — vykreslený stav/vzorec/info PŘESNĚ odpovídá rekonstrukci z čistých funkcí, žádná zakázaná fráze —');
{
	// Chytá přesně nález kontrolora: „upb-a-stav hlásí u všech kombinací
	// proud 0 mA" a „viditelný vzorec počítá 10× větší proud" — obojí by
	// se muselo rozejít s ocekavaneA(), která žádnou takovou chybu neudělá
	// (volá STEJNÉ pure funkce, jaké volá i komponenta, jen ve vlastním
	// řetězci šablony psaném přímo v tomhle testu).
	let spatne = null;
	const vsechnyTexty = [];
	for (const napetiKlic of NAPETI_KLICE) {
		for (const kuzeKlic of KUZE_KLICE) {
			nastavA(NAPETI_KLICE.indexOf(napetiKlic), KUZE_KLICE.indexOf(kuzeKlic));
			const ocek = ocekavaneA(napetiKlic, kuzeKlic);
			const vypocet = prvky.get('upb-a-vypocet').innerHTML;
			const stav = prvky.get('upb-a-stav').textContent;
			const info = prvky.get('upb-a-info').innerHTML;
			vsechnyTexty.push(vypocet, stav, info);
			if (vypocet !== ocek.vypocet) spatne = `${napetiKlic}+${kuzeKlic}: vzorec „${vypocet}“ ≠ očekávané „${ocek.vypocet}“`;
			if (stav !== ocek.stav) spatne = `${napetiKlic}+${kuzeKlic}: stav „${stav}“ ≠ očekávané „${ocek.stav}“`;
			if (info !== ocek.info) spatne = `${napetiKlic}+${kuzeKlic}: info panel ≠ očekávaný`;
		}
	}
	for (const cestaKlic of CESTA_KLICE) {
		nastavB(CESTA_KLICE.indexOf(cestaKlic));
		const ocek = ocekavaneB(cestaKlic);
		const vypocet = prvky.get('upb-b-vypocet').innerHTML;
		const stav = prvky.get('upb-b-stav').textContent;
		const info = prvky.get('upb-b-info').innerHTML;
		vsechnyTexty.push(vypocet, stav, info);
		if (vypocet !== ocek.vypocet) spatne = `cesta ${cestaKlic}: vzorec „${vypocet}“ ≠ očekávané „${ocek.vypocet}“`;
		if (stav !== ocek.stav) spatne = `cesta ${cestaKlic}: stav „${stav}“ ≠ očekávané „${ocek.stav}“`;
		if (info !== ocek.info) spatne = `cesta ${cestaKlic}: info panel ≠ očekávaný`;
	}
	ok(spatne === null, spatne ?? 'všech 9 kombinací A i všechny 3 cesty B: vykreslený vzorec/stav/info přesně odpovídá rekonstrukci ze stejných čistých funkcí');

	let spatnaFraze = null;
	for (const text of vsechnyTexty) {
		for (const fraze of ZAKAZANE_FRAZE) {
			if (fraze.test(text)) { spatnaFraze = `text obsahuje zakázanou frázi ${fraze}: „${text}"`; break; }
		}
		if (spatnaFraze) break;
	}
	ok(spatnaFraze === null, spatnaFraze ?? `žádný z ${vsechnyTexty.length} vykreslených textů (obě scény, všechny stavy) neobsahuje zakázanou frázi typu „holou rukou“/„klidně“/„neublíží“`);
	nastavA(0, 0);
	nastavB(0);
}

console.log('\n— NEZÁVISLÁ KONTROLA TEXTŮ: zakázané fráze i ve STATICKÉM HTML scén, ne jen v dynamicky vykreslených textech (nález 14. 8. odpoledne) —');
{
	// Doklad nálezu: ZAKAZANE_FRAZE se dřív pouštěly JEN na `vsechnyTexty`
	// (texty vykreslené JS), nikdy na `html` (statický výklad scén mimo
	// <script>). Podvrh věty ve výkladu scény A prošel beze stopy (exit=0).
	// Teď se STEJNÝ seznam frází pouští i na `html`.
	let spatnaFraze = null;
	for (const fraze of ZAKAZANE_FRAZE) {
		const m = html.match(fraze);
		if (m) {
			const zacatek = Math.max(0, m.index - 40);
			spatnaFraze = `statické HTML (mimo <script>) obsahuje zakázanou frázi ${fraze}: „…${html.slice(zacatek, m.index + 60).replace(/\s+/g, ' ')}…“`;
			break;
		}
	}
	ok(spatnaFraze === null, spatnaFraze ?? 'statické HTML (nadpisy, popisy scén, odstavce) neobsahuje žádnou zakázanou frázi');
}

console.log('\n— izolační podložka MUSÍ být vizuálně odlišená od pozadí, ne jen mít opacity=1 (nález #4, podvrh fill→barva pozadí) —');
{
	// Doklad nálezu: podvrh fill="#ffd43b" → fill="#f8f9fa" (přesně barva
	// pozadí SVG) prošel beze stopy, protože se dřív hlídala jen viditelnost
	// (opacity), nikdy skutečná barva. Teď se ověřuje, že výplň podložky NENÍ
	// shodná s pozadím SVG (#f8f9fa) a že má kontrastní obrys.
	const POZADI_SVG = '#f8f9fa';
	const padMatch = html.match(/<rect x="195" y="291" width="115" height="12"[^>]*fill="([^"]+)"[^>]*stroke="([^"]+)"[^>]*stroke-width="([^"]+)"/);
	ok(!!padMatch, 'izolační podložka (rect 195,291,115×12) je v HTML nalezitelná');
	if (padMatch) {
		const [, fill, stroke, sw] = padMatch;
		ok(fill.toLowerCase() !== POZADI_SVG, `podložka má výplň „${fill}“, která se NESHODUJE s pozadím scény (${POZADI_SVG}) — jinak by byla neviditelná i s opacity="1"`);
		ok(stroke.toLowerCase() !== fill.toLowerCase() && stroke.toLowerCase() !== POZADI_SVG, `podložka má kontrastní obrys „${stroke}“ (liší se od vlastní výplně i od pozadí)`);
		ok(Number(sw) >= 2, `obrys podložky má tloušťku aspoň 2 px (${sw})`);
	}
}

console.log('\n— scéna B: zdroj (zásuvka) a vodič jsou nakreslené, postava „nedostává proud odnikud“ (nález #3) —');
{
	nastavB(0);
	ok((prvky.get('upb-b-zdroj').innerHTML || '').length > 0, 'ikona zdroje (zásuvky) je ve scéně B skutečně vykreslená (upb-b-zdroj má obsah)');
	ok(html.includes('id="upb-b-drat-zdroj"'), 'vodič od zdroje k levé ruce je v HTML scény B');
	ok(html.includes('zásuvka — 230 V'), 'popisek zdroje (zásuvka — 230 V) je vidět přímo ve scéně B');

	ok(prvky.get('upb-b-navrat').getAttribute('d') !== '', 'ruka-ruka (uzavřený obvod): čárkovaná zpáteční cesta ke zdroji je nakreslená');
	nastavB(1);
	ok(prvky.get('upb-b-navrat').getAttribute('d') !== '', 'ruka-noha (uzavřený obvod): čárkovaná zpáteční cesta ke zdroji je nakreslená');
	nastavB(2);
	ok(prvky.get('upb-b-navrat').getAttribute('d') === '', 'izolace (otevřený obvod): zpáteční cesta zmizí úplně — není co „vracet“');
	ok(/stroke="#e03131"[^>]*stroke-dasharray/.test(html) && html.includes('✕'),
		'izolace: přerušení cesty do země je graficky naznačené (červená přerušovaná čárka + „✕“ u podložky), ne jen tvrzeno textem');
	nastavB(0);
}

console.log('\n— konstanty odpovídají výkladu na stránce —');
{
	ok(PRAH_PRURAZU_V === 50, `práh průrazu kůže je 50 V, stejně jako výklad („Od zhruba 50 V se kůže prorazí“) (${PRAH_PRURAZU_V})`);
	ok(NAPETI.baterie === 4.5 && NAPETI.autobaterie === 12 && NAPETI.zasuvka === 230,
		`napětí: baterie 4,5 V, autobaterie 12 V, zásuvka 230 V (${NAPETI.baterie}, ${NAPETI.autobaterie}, ${NAPETI.zasuvka})`);
	ok(NAPETI_B === 230 && NAPETI_B === NAPETI.zasuvka, `napětí v části B (${NAPETI_B} V) je STEJNÉ jako zásuvka v části A`);
	ok(ODPORY.sucha.vysoky === 100000 && ODPORY.sucha.nizky === 1500,
		`suchá kůže: 100 000 Ω / 1 500 Ω — obě hodnoty přímo z výkladu (${ODPORY.sucha.vysoky}, ${ODPORY.sucha.nizky})`);
	ok(ODPORY.mokra.vysoky === 7500 && ODPORY.mokra.nizky === 1000,
		`mokrá kůže: 7 500 Ω / 1 000 Ω — 1 000 Ω přímo z výkladu (${ODPORY.mokra.vysoky}, ${ODPORY.mokra.nizky})`);
	ok(ODPORY.vlhka.vysoky === 20000 && ODPORY.vlhka.nizky === 1250,
		`vlhká kůže (mezistupeň): 20 000 Ω / 1 250 Ω (${ODPORY.vlhka.vysoky}, ${ODPORY.vlhka.nizky})`);
	ok(ODPORY.sucha.vysoky > ODPORY.vlhka.vysoky && ODPORY.vlhka.vysoky > ODPORY.mokra.vysoky,
		'seřazení odporů dává smysl: suchá > vlhká > mokrá (před průrazem)');
	ok(ODPORY.sucha.nizky > ODPORY.vlhka.nizky && ODPORY.vlhka.nizky > ODPORY.mokra.nizky,
		'a stejně tak i po průrazu: suchá > vlhká > mokrá');
}

console.log('\n— jePresnyOdpor: jen skutečné citace z výkladu jsou „přesné“, odhady mají „≈“ (nález #8) —');
{
	ok(jePresnyOdpor('sucha', 4.5) === true && jePresnyOdpor('sucha', 230) === true, 'suchá kůže: obě hodnoty (100000 i 1500 Ω) jsou přímo z výkladu, žádné „≈“');
	ok(jePresnyOdpor('mokra', 4.5) === false, 'mokrá kůže PŘED průrazem (7500 Ω) je vlastní odhad → „≈“');
	ok(jePresnyOdpor('mokra', 230) === true, 'mokrá kůže PO průrazu (1000 Ω) je přímo z výkladu → bez „≈“');
	ok(jePresnyOdpor('vlhka', 4.5) === false && jePresnyOdpor('vlhka', 230) === false, 'vlhká kůže (mezistupeň) je celá vlastní odhad → „≈“ v obou stavech');

	nastavA(0, 1); // baterie + vlhká → odhad, musí mít ≈
	ok(prvky.get('upb-a-vypocet').innerHTML.includes('≈ 20 000 Ω'), `vzorec u odhadnutého odporu ukazuje „≈ 20 000 Ω“: „${prvky.get('upb-a-vypocet').innerHTML}"`);
	nastavA(0, 0); // baterie + suchá → citace z výkladu, BEZ ≈
	ok(prvky.get('upb-a-vypocet').innerHTML.includes('100 000 Ω') && !prvky.get('upb-a-vypocet').innerHTML.includes('≈ 100 000'),
		`vzorec u přesné hodnoty z výkladu NEMÁ „≈“: „${prvky.get('upb-a-vypocet').innerHTML}"`);
	nastavA(0, 0);

	// Nález nezávislé kontroly 14. 8. večer: scéna B teď odvozuje OBĚ cesty
	// přímo z dvojice hodnot výkladu (1500 Ω suchá / 1000 Ω mokrá), takže
	// obě jsou „presny: true“, ŽÁDNÁ vlastní odhadová „≈“ hodnota v části B.
	ok(CESTY['ruka-noha'].presny === true, '„ruka → noha“ používá STEJNOU hodnotu jako suchá kůže v části A (1 500 Ω, přímo z výkladu) → bez „≈“');
	nastavB(1);
	ok(prvky.get('upb-b-vypocet').innerHTML.includes('1 500 Ω') && !prvky.get('upb-b-vypocet').innerHTML.includes('≈ 1 500'),
		`„ruka → noha“ ukazuje „1 500 Ω“ BEZ „≈“ (stejná citace z výkladu jako v části A): „${prvky.get('upb-b-vypocet').innerHTML}"`);
	nastavB(0);
	ok(prvky.get('upb-b-vypocet').innerHTML.includes('1 000 Ω') && !prvky.get('upb-b-vypocet').innerHTML.includes('≈ 1 000'),
		`„ruka → ruka“ (hodnota z výkladu) NEMÁ „≈“: „${prvky.get('upb-b-vypocet').innerHTML}"`);
	nastavB(0);
}

console.log('\n— odporTela: práh 50 V platí STEJNĚ pro všechny tři stavy kůže —');
{
	for (const kuze of KUZE_KLICE) {
		ok(odporTela(kuze, 50) === ODPORY[kuze].vysoky, `${kuze}: na hranici 50 V (včetně) je kůže ještě NEporušená (${odporTela(kuze, 50)})`);
		ok(odporTela(kuze, 50.001) === ODPORY[kuze].nizky, `${kuze}: těsně nad 50 V se kůže prorazí (${odporTela(kuze, 50.001)})`);
	}
}

console.log('\n— proudMA: čistý Ohmův zákon I = U ÷ R —');
{
	ok(Math.abs(proudMA(230, 1000) - 230) < 1e-9, `proudMA(230,1000) = 230 mA (${proudMA(230, 1000)})`);
	ok(Math.abs(proudMA(4.5, 100000) - 0.045) < 1e-9, `proudMA(4.5,100000) = 0,045 mA (${proudMA(4.5, 100000)})`);
}

console.log('\n— pásma: hranice PŘESNĚ na prazích z výkladu (1 / 6 / 15 / 25 / 60 / 80 mA) —');
{
	// Nález nezávislé kontroly 14. 8. večer: výklad má DOSLOVA „6–15 mA —
	// křeč, nemůže se pustit“, ale simulace dřív práh 15 vůbec neměla (jen
	// 6–25 mA pod tímhle jménem) a test to přesto tvrdil jako „přesně podle
	// výkladu“ — bylo to o jeden práh nepravda. Teď je prahů šest.
	const prahy = [1, 6, 15, 25, 60, 80];
	let spatne = null;
	for (const prah of prahy) {
		if (pasmo(prah - 0.001).limit !== prah) spatne = `těsně pod ${prah} mA je pásmo s limitem ${pasmo(prah - 0.001).limit}, čekal jsem ${prah}`;
		if (pasmo(prah).limit === prah) spatne = `přesně na ${prah} mA už je pásmo s limitem ${prah} — hranice má být OSTRÁ (< ne ≤)`;
	}
	ok(spatne === null, spatne ?? 'všech 6 prahů (1,6,15,25,60,80 mA) je ostrých a odpovídá výkladu');
}

console.log('\n— mAtoText: celé µA pod 1 mA, nejvýš 1 desetinné místo nad 1 mA —');
{
	ok(mAtoText(0.045) === '45 µA', `0,045 mA → „${mAtoText(0.045)}“`);
	ok(mAtoText(0.12) === '120 µA', `0,12 mA → „${mAtoText(0.12)}“`);
	ok(mAtoText(0.225) === '225 µA', `0,225 mA → „${mAtoText(0.225)}“`);
	ok(mAtoText(0.6) === '600 µA', `0,6 mA → „${mAtoText(0.6)}“`);
	ok(mAtoText(1.6) === '1,6 mA', `1,6 mA → „${mAtoText(1.6)}“`);
	ok(mAtoText(184) === '184 mA', `184 mA → „${mAtoText(184)}“`);
	ok(mAtoText(230) === '230 mA', `230 mA → „${mAtoText(230)}“`);
	ok(mAtoText(0) === '0 mA', `0 mA → „${mAtoText(0)}“`);
	const priblizne = mAtoText(230000 / 1500);
	ok(priblizne === '≈ 153,3 mA', `230V/1500Ω (periodická desetina) se zobrazí zaokrouhleně se znaménkem ≈, stejně jako výklad: „${priblizne}“`);
}

console.log('\n— VŠECH 9 kombinací (3 napětí × 3 stavy kůže) natvrdo proti tabulce (číslo, pásmo, presny) —');
{
	const ocekavano = [
		['baterie', 'sucha', 0.045, 'nevnimas', true],
		['baterie', 'vlhka', 0.225, 'nevnimas', false],
		['baterie', 'mokra', 0.6, 'nevnimas', false],
		['autobaterie', 'sucha', 0.12, 'nevnimas', true],
		['autobaterie', 'vlhka', 0.6, 'nevnimas', false],
		['autobaterie', 'mokra', 1.6, 'brneni', false],
		['zasuvka', 'sucha', 230000 / 1500, 'zastava', true],
		['zasuvka', 'vlhka', 184, 'zastava', false],
		['zasuvka', 'mokra', 230, 'zastava', true],
	];
	ok(ocekavano.length === 9, `zkontrolováno všech 9 kombinací (${ocekavano.length})`);
	let spatne = null;
	for (const [nap, kuze, mAOcek, zonaOcek, presnyOcek] of ocekavano) {
		const R = odporTela(kuze, NAPETI[nap]);
		const mA = proudMA(NAPETI[nap], R);
		if (Math.abs(mA - mAOcek) > 1e-6) spatne = `${nap}+${kuze}: čekal jsem ${mAOcek} mA, vyšlo ${mA} mA`;
		if (pasmo(mA).klic !== zonaOcek) spatne = `${nap}+${kuze}: čekal jsem pásmo „${zonaOcek}“, vyšlo „${pasmo(mA).klic}“`;
		if (jePresnyOdpor(kuze, NAPETI[nap]) !== presnyOcek) spatne = `${nap}+${kuze}: presny=${jePresnyOdpor(kuze, NAPETI[nap])}, čekal jsem ${presnyOcek}`;
		const zobrazeno = mAtoText(mA);
		const jeMikro = / µA$/.test(zobrazeno);
		const jeMili = /^(≈ )?-?\d+(,\d)? mA$/.test(zobrazeno);
		if (!jeMikro && !jeMili) spatne = `${nap}+${kuze}: zobrazená hodnota „${zobrazeno}“ nemá tvar celé µA ani mA na nejvýš 1 des. místo`;
	}
	ok(spatne === null, spatne ?? 'všech 9 kombinací dává přesně očekávaný proud, pásmo i presny-příznak');
}

console.log('\n— výchozí stav (baterie + suchá kůže) je přesně opening příklad z výkladu (0,045 mA) —');
{
	ok(prvky.get('upb-a-napeti').value === '0' && prvky.get('upb-a-kuze').value === '0',
		`oba posuvníky startují na indexu 0 (${prvky.get('upb-a-napeti').value}, ${prvky.get('upb-a-kuze').value})`);
	nastavA(0, 0);
	const info = prvky.get('upb-a-info').innerHTML;
	ok(info.includes('45 µA'), `info panel na startu ukazuje 45 µA (= 0,045 mA, přesně výkladový příklad): „${info.match(/I = [^<]*/)?.[0]}"`);
	ok(prvky.get('upb-a-srdce').getAttribute('fill') === PASMA[0].barva, 'srdce má na startu barvu nejnižšího pásma (nevnímáš)');
}

console.log('\n— scéna A: vykreslená barva ruky sedí s VYBRANÝM stavem kůže (pro všech 9 kombinací) —');
{
	let spatne = null;
	for (let iN = 0; iN < 3 && !spatne; iN++) {
		for (let iK = 0; iK < 3 && !spatne; iK++) {
			nastavA(iN, iK);
			const kuzeKlic = KUZE_KLICE[iK];
			const napetiKlic = NAPETI_KLICE[iN];
			const R = odporTela(kuzeKlic, NAPETI[napetiKlic]);
			const mA = proudMA(NAPETI[napetiKlic], R);
			const p = pasmo(mA);
			const rukaFill = prvky.get('upb-a-ruka').getAttribute('fill');
			const srdceFill = prvky.get('upb-a-srdce').getAttribute('fill');
			if (rukaFill !== KUZE_BARVA[kuzeKlic]) spatne = `${napetiKlic}+${kuzeKlic}: barva ruky „${rukaFill}“ neodpovídá KUZE_BARVA.${kuzeKlic} („${KUZE_BARVA[kuzeKlic]}“)`;
			if (srdceFill !== p.barva) spatne = `${napetiKlic}+${kuzeKlic}: barva srdce „${srdceFill}“ neodpovídá barvě pásma „${p.klic}“ („${p.barva}“)`;
		}
	}
	ok(spatne === null, spatne ?? 've všech 9 kombinacích sedí vykreslená barva ruky i srdce s výpočtem');
	nastavA(0, 0);
}

console.log('\n— scéna A: obvod se DOTÝKÁ ikony zdroje (nález #4 — dřív mezera 7–25 px) —');
{
	for (const napetiKlic of NAPETI_KLICE) {
		nastavA(NAPETI_KLICE.indexOf(napetiKlic), 0);
		const x1 = prvky.get('upb-a-drat-zdroj').getAttribute('x1');
		ok(x1 === String(ICON_PRAVY_OKRAJ[napetiKlic]), `${napetiKlic}: drát začíná na x1=${x1}, přesně na pravém okraji ikony (${ICON_PRAVY_OKRAJ[napetiKlic]})`);
	}
	nastavA(0, 0);
}

console.log('\n— scéna A: statická zpáteční cesta existuje a nekříží plaketu se jménem zdroje —');
{
	// Nález nezávislé kontroly: dřív procházela plaketou (x=8–208, y=172–198)
	// a smazání celé cesty by test neodhalil vůbec. Teď: (1) přesná shoda
	// s očekávaným tvarem, (2) žádný bod cesty neleží uvnitř plakety.
	const cestaMatch = html.match(/<path d="(M270,273[^"]*)" fill="none" stroke="#868e96"/);
	ok(!!cestaMatch, 'statická zpáteční cesta (šedá čárkovaná) je v HTML nalezitelná');
	const OCEK_D = 'M270,273 L270,335 L4,335 L4,146 L60,146';
	ok(cestaMatch?.[1] === OCEK_D, `cesta má přesně očekávaný tvar: „${cestaMatch?.[1]}“ (čekáno „${OCEK_D}“)`);
	if (cestaMatch) {
		const body = [...cestaMatch[1].matchAll(/(-?[\d.]+),(-?[\d.]+)/g)].map((m) => ({ x: +m[1], y: +m[2] }));
		const PLAKETA = { x: 8, y: 172, w: 200, h: 26 };
		const vPlaketE = body.filter((b) => b.x >= PLAKETA.x && b.x <= PLAKETA.x + PLAKETA.w && b.y >= PLAKETA.y && b.y <= PLAKETA.y + PLAKETA.h);
		ok(vPlaketE.length === 0, `žádný bod zpáteční cesty neleží uvnitř bílé plakety x=8–208,y=172–198 (nalezeno uvnitř: ${vPlaketE.length})`);
	}
}

console.log('\n— scéna A: ikona zdroje se skutečně mění s vybraným napětím —');
{
	nastavA(0, 0);
	const baterie = prvky.get('upb-a-zdroj').innerHTML;
	nastavA(1, 0);
	const autobaterie = prvky.get('upb-a-zdroj').innerHTML;
	nastavA(2, 0);
	const zasuvka = prvky.get('upb-a-zdroj').innerHTML;
	ok(baterie !== autobaterie && autobaterie !== zasuvka && baterie !== zasuvka, 'tři různá napětí dávají tři různé ikony');
	ok(baterie.includes('#e8590c'), `ikona baterie má oranžové kontakty: „${baterie.slice(0, 60)}…"`);
	ok(zasuvka.includes('#e9ecef'), `ikona zásuvky má šedý kryt: „${zasuvka.slice(0, 60)}…"`);
	nastavA(0, 0);
}

console.log(`\n— pásmový ampérmetr: ${PASMA.length} segmentů dlaždicuje CELOU šířku, marker míří na správný segment —`);
{
	let spatne = null, soucetSirek = 0;
	for (let i = 0; i < PASMA.length; i++) {
		const s = geometrieZonySegmentu(i);
		soucetSirek += s.sirka;
		if (i > 0) {
			const predchozi = geometrieZonySegmentu(i - 1);
			if (Math.abs(predchozi.x + predchozi.sirka - s.x) > 1e-6) spatne = `segment ${i}: nenavazuje na předchozí (mezera nebo překryv)`;
		}
	}
	if (Math.abs(soucetSirek - PASMO_BAR.sirkaCelkem) > 1e-6) spatne = `součet šířek segmentů (${soucetSirek}) neodpovídá PASMO_BAR.sirkaCelkem (${PASMO_BAR.sirkaCelkem})`;
	ok(spatne === null, spatne ?? `${PASMA.length} segmentů přesně dlaždicuje celou šířku pásmového ampérmetru bez mezer a překryvů`);

	nastavA(2, 2); // zásuvka + mokrá → 230 mA → pásmo „zastava“ (poslední pásmo)
	const idxOcek = PASMA.findIndex((p) => p.klic === 'zastava');
	const seg = geometrieZonySegmentu(idxOcek);
	const cxOcek = seg.x + seg.sirka / 2;
	const body = prvky.get('upb-a-marker').getAttribute('points').split(' ').map((b) => b.split(',').map(Number));
	const apex = body[2];
	ok(Math.abs(apex[0] - cxOcek) < 1, `marker (hrot na x=${apex[0]}) ukazuje na střed segmentu „zastava“ (x=${cxOcek.toFixed(1)})`);
	ok(prvky.get('upb-a-marker').getAttribute('fill') === PASMA[idxOcek].barva, 'marker má barvu odpovídajícího pásma');
	nastavA(0, 0);
}

console.log('\n— pásmové pozadí je ve scéně A a B TOTOŽNÉ (stejný tvar = stejný význam) —');
{
	ok(prvky.get('upb-a-pasmo-pozadi').innerHTML === prvky.get('upb-b-pasmo-pozadi').innerHTML,
		'obě scény kreslí pásmový ampérmetr stejnou funkcí se stejným výsledkem');
	ok((prvky.get('upb-a-pasmo-pozadi').innerHTML.match(/<rect/g) || []).length === 7, 'pásmové pozadí má přesně 7 obdélníků (šest prahů → sedm pásem)');
}

// ── ČÁST B ───────────────────────────────────────────────────────────────
console.log('\n— cesta proudu tělem: proudCestou natvrdo —');
{
	// Nález nezávislé kontroly 14. 8. večer: „ruka-noha“ teď používá STEJNÝ
	// odpor jako suchá kůže v části A (1 500 Ω) → STEJNÉ číslo (≈153,3 mA),
	// ne vlastní odhad 2000 Ω dávající jiné číslo (115 mA) pro stejnou situaci.
	const OCEKAVANE_RUKA_NOHA_MA = 230000 / 1500; // = 153,333… mA
	ok(proudCestou('ruka-ruka') === 230, `proudCestou(ruka-ruka) = 230 mA (${proudCestou('ruka-ruka')})`);
	ok(Math.abs(proudCestou('ruka-noha') - OCEKAVANE_RUKA_NOHA_MA) < 1e-9,
		`proudCestou(ruka-noha) = ${OCEKAVANE_RUKA_NOHA_MA.toFixed(3)}… mA — STEJNÉ jako suchá kůže + zásuvka v části A, protože R je STEJNÝCH 1 500 Ω (vyšlo: ${proudCestou('ruka-noha')})`);
	ok(proudCestou('izolace') === 0, `proudCestou(izolace) = 0 mA — obvod se neuzavře (${proudCestou('izolace')})`);
	ok(pasmo(proudCestou('ruka-ruka')).klic === 'zastava', 'ruka→ruka spadá do pásma zástavy srdce');
	ok(pasmo(proudCestou('ruka-noha')).klic === 'zastava', 'ruka→noha ZŮSTÁVÁ v pásmu zástavy srdce, i když je proud menší — pořád smrtelně nebezpečné');
	ok(proudCestou('ruka-ruka') > proudCestou('ruka-noha'), 'ruka→ruka je i číselně nebezpečnější (větší proud) než ruka→noha');
	ok(pasmo(proudCestou('izolace')).klic === 'nevnimas', 'izolace (0 mA) je v nejnižším pásmu — ale JEN díky viditelné podložce, ne díky počtu rukou');
}

console.log('\n— scéna B: vykreslení sedí s výběrem cesty (natvrdo pro všechny 3), izolační podložka jen u „izolace“ —');
{
	let spatne = null;
	for (let i = 0; i < 3 && !spatne; i++) {
		nastavB(i);
		const klic = CESTA_KLICE[i];
		const c = CESTY[klic];
		const mA = c.uzavrena ? proudMA(NAPETI_B, c.r) : 0;
		const p = pasmo(mA);

		const srdceFill = prvky.get('upb-b-srdce').getAttribute('fill');
		if (srdceFill !== p.barva) spatne = `${klic}: barva srdce „${srdceFill}“ neodpovídá pásmu „${p.klic}“`;

		const d = prvky.get('upb-b-cesta-linka').getAttribute('d');
		if (c.uzavrena && !d) spatne = `${klic}: obvod je uzavřený, ale cesta (d atribut) je prázdná`;
		if (!c.uzavrena && d) spatne = `${klic}: obvod je OTEVŘENÝ, ale cesta se přesto kreslí („${d}“)`;
		if (c.uzavrena) {
			const ocekD = `M${BODY[c.waypoints[0]].x},${BODY[c.waypoints[0]].y} L${BODY[c.waypoints[1]].x},${BODY[c.waypoints[1]].y} L${BODY[c.waypoints[2]].x},${BODY[c.waypoints[2]].y}`;
			if (d !== ocekD) spatne = `${klic}: cesta „${d}“ neodpovídá souřadnicím waypointů „${ocekD}“`;
		}

		const izolaceOpacity = prvky.get('upb-b-izolace').getAttribute('opacity');
		const cekanaIzolace = klic === 'izolace' ? '1' : '0';
		if (izolaceOpacity !== cekanaIzolace) spatne = `${klic}: izolační podložka má opacity=${izolaceOpacity}, čekal jsem ${cekanaIzolace}`;

		const rukaP = prvky.get('upb-b-ruka-p').getAttribute('fill');
		const nohaP = prvky.get('upb-b-noha-p').getAttribute('fill');
		const cekanaRukaP = c.kontakty.includes('ruka-p') ? '#4dabf7' : '#ced4da';
		const cekanaNohaP = c.kontakty.includes('noha-p') ? '#4dabf7' : '#ced4da';
		if (rukaP !== cekanaRukaP) spatne = `${klic}: pravá ruka má barvu „${rukaP}“, čekal jsem „${cekanaRukaP}“ (aktivní kontakt: ${c.kontakty.includes('ruka-p')})`;
		if (nohaP !== cekanaNohaP) spatne = `${klic}: pravá noha má barvu „${nohaP}“, čekal jsem „${cekanaNohaP}“ (aktivní kontakt: ${c.kontakty.includes('noha-p')})`;
	}
	ok(spatne === null, spatne ?? 'pro všechny 3 cesty sedí barva srdce, nakreslená cesta, viditelnost izolační podložky i barvy aktivních kontaktů');
	nastavB(0);
}

console.log('\n— scéna B: SVG kreslí TĚLO před cestou proudu (nález #3 — dřív dráha mizela pod trupem) —');
{
	const blokB = html.match(/<svg id="upb-b-svg"[\s\S]*?<\/svg>/)?.[0];
	ok(!!blokB, 'blok <svg id="upb-b-svg">…</svg> je nalezitelný');
	const idxTrup = blokB?.indexOf('<rect x="220" y="95"') ?? -1;
	const idxCesta = blokB?.indexOf('<path id="upb-b-cesta-linka"') ?? -1;
	const idxTecky = blokB?.indexOf('<g id="upb-b-elektrony">') ?? -1;
	ok(idxTrup >= 0 && idxCesta >= 0 && idxTecky >= 0, `trup (${idxTrup}), cesta (${idxCesta}) a tečky (${idxTecky}) jsou v SVG nalezitelné`);
	ok(idxCesta > idxTrup, `dráha proudu (index ${idxCesta}) je v dokumentu AŽ PO trupu (index ${idxTrup}) → kreslí se NAD tělem`);
	ok(idxTecky > idxTrup, `skupina teček (index ${idxTecky}) je v dokumentu AŽ PO trupu (index ${idxTrup}) → kreslí se NAD tělem`);
}

console.log('\n— scéna B má TRVALÉ varování „nikdy nezkoušet“ přímo v obrázku (nález #11) —');
{
	const blokB = html.match(/<svg id="upb-b-svg"[\s\S]*?<\/svg>/)?.[0] ?? '';
	ok(blokB.includes('230 V je nebezpečné VŽDY') && blokB.includes('nikdy nezkoušet!'),
		'varovné texty jsou natvrdo v HTML uvnitř SVG scény B (ne jen v odstavci nad ní), takže je vidět i při pohledu jen na obrázek');
	ok(/stroke="#e03131"/.test(blokB), 'varovací box má výrazné červené orámování');
}

console.log('\n— scéna B: „tečky proudu“ jsou vidět jen když je obvod uzavřený —');
{
	nastavB(0); // ruka-ruka, uzavřeno
	const opacityUzavreno = (prvky.get('ns-1') || {}).atributy?.opacity;
	nastavB(2); // izolace, otevřeno
	const opacityOtevreno = (prvky.get('ns-1') || {}).atributy?.opacity;
	ok(opacityUzavreno === '1', `při uzavřeném obvodu jsou tečky viditelné (opacity=${opacityUzavreno})`);
	ok(opacityOtevreno === '0', `při otevřeném obvodu (izolace) jsou tečky skryté (opacity=${opacityOtevreno})`);
	ok(vytvorenychNS >= 5, `vytvořeno aspoň 5 „teček proudu“ přes createElementNS (${vytvorenychNS})`);
	nastavB(0);
}

console.log('\n— scéna B: tlačítko play/pauza SKUTEČNĚ volá requestAnimationFrame/cancelAnimationFrame —');
{
	nastavB(0); // ruka-ruka, uzavřeno — tlačítko musí jít spustit
	const pocetRAFPredKlikem = pocetRAF;
	kliknoutPlay(); // 1. klik: start
	ok(pocetRAF === pocetRAFPredKlikem + 1, `klik na „pusť proud“ zavolá requestAnimationFrame přesně jednou (${pocetRAF - pocetRAFPredKlikem}×)`);
	ok(jedeB() === true, `po kliknutí animace běží (jedeB() = ${jedeB()})`);
	ok(prvky.get('upb-b-play').textContent.includes('zastav'), `text tlačítka se změní na „zastav“: „${prvky.get('upb-b-play').textContent}"`);

	const pocetCAFPredPauzou = pocetCAF;
	kliknoutPlay(); // 2. klik: pauza
	ok(pocetCAF === pocetCAFPredPauzou + 1, `klik na „zastav proud“ zavolá cancelAnimationFrame přesně jednou (${pocetCAF - pocetCAFPredPauzou}×)`);
	ok(jedeB() === false, `po druhém kliknutí animace stojí (jedeB() = ${jedeB()})`);
	ok(prvky.get('upb-b-play').textContent.includes('pusť'), `text tlačítka se vrátí na „pusť“: „${prvky.get('upb-b-play').textContent}"`);

	// otevřený obvod (izolace): kliknutí nesmí nic spustit, animovat se nedá
	nastavB(2);
	ok(prvky.get('upb-b-play').disabled === true, 'u otevřeného obvodu (izolace) je tlačítko vyřazené (disabled)');
	const pocetRAFPredKlikemOtevreno = pocetRAF;
	kliknoutPlay();
	ok(pocetRAF === pocetRAFPredKlikemOtevreno, `klik na vyřazené tlačítko (izolace) nezavolá requestAnimationFrame (${pocetRAF - pocetRAFPredKlikemOtevreno}×)`);
	ok(jedeB() === false, 'a animace se nerozběhne');
	nastavB(0);
}

console.log('\n— boduNaCeste: čistá funkce zůstává uvnitř úsečky waypointů —');
{
	const body = CESTY['ruka-ruka'].waypoints.map((id) => BODY[id]);
	const p0 = boduNaCeste(0, body);
	ok(Math.abs(p0.x - body[0].x) < 1e-6 && Math.abs(p0.y - body[0].y) < 1e-6, `t=0 vrací přesně první waypoint (${p0.x},${p0.y})`);
	let mimo = 0;
	const minX = Math.min(...body.map((b) => b.x)), maxX = Math.max(...body.map((b) => b.x));
	const minY = Math.min(...body.map((b) => b.y)), maxY = Math.max(...body.map((b) => b.y));
	for (let t = 0; t < 1; t += 0.02) {
		const bod = boduNaCeste(t, body);
		if (bod.x < minX - 0.01 || bod.x > maxX + 0.01 || bod.y < minY - 0.01 || bod.y > maxY + 0.01) mimo++;
	}
	ok(mimo === 0, `bod na cestě zůstává v obálce waypointů pro 50 vzorků t (mimo: ${mimo})`);
}

console.log('\n— nic neleze z obrázku A (viewBox 660×350) pro žádnou z 9 kombinací —');
{
	let mimo = null;
	for (let iN = 0; iN < 3 && !mimo; iN++) {
		for (let iK = 0; iK < 3 && !mimo; iK++) {
			nastavA(iN, iK);
			for (const g of [prvky.get('upb-a-info'), prvky.get('upb-a-zdroj'), prvky.get('upb-a-varovani'), prvky.get('upb-a-pasmo-pozadi')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 350) mimo = `${g.id}: text x=${t[1]} y=${t[2]}`;
				}
				for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
					const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
					if (x < 0 || x + w > 660 || y < 0 || y + h > 350) mimo = `${g.id}: rect ${x},${y} ${w}×${h}`;
				}
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku A — ${mimo}` : 'texty a obdélníky zůstávají uvnitř viewBoxu 660×350 pro všech 9 kombinací');
	nastavA(0, 0);
}

console.log('\n— nic neleze z obrázku B (viewBox 660×330) pro žádnou ze 3 cest —');
{
	let mimo = null;
	for (let i = 0; i < 3 && !mimo; i++) {
		nastavB(i);
		for (const g of [prvky.get('upb-b-info'), prvky.get('upb-b-pasmo-pozadi')]) {
			for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
				if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 330) mimo = `${g.id}: text x=${t[1]} y=${t[2]}`;
			}
		}
		const d = prvky.get('upb-b-cesta-linka').getAttribute('d');
		if (d) {
			for (const bod of d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) {
				if (+bod[1] < 0 || +bod[1] > 660 || +bod[2] < 0 || +bod[2] > 330) mimo = `cesta-linka: bod ${bod[1]},${bod[2]}`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku B — ${mimo}` : 'texty a nakreslená cesta zůstávají uvnitř viewBoxu 660×330 pro všechny 3 cesty');
	nastavB(0);
}

console.log('\n— odolnost: neplatné hodnoty posuvníků nesmí shodit skript ani vypsat NaN —');
{
	let spadlo = null;
	try {
		prvky.get('upb-a-napeti').value = 'abc';
		for (const f of prvky.get('upb-a-napeti').posluchaci.input) f();
		prvky.get('upb-a-kuze').value = '';
		for (const f of prvky.get('upb-a-kuze').posluchaci.input) f();
		prvky.get('upb-b-cesta').value = '99';
		for (const f of prvky.get('upb-b-cesta').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `skript spadl na neplatné hodnotě: ${spadlo}` : 'neplatné hodnoty posuvníků skript nezhroutí');
	ok(!prvky.get('upb-a-stav').textContent.includes('NaN'), 'stav A neobsahuje „NaN“');
	ok(!prvky.get('upb-b-stav').textContent.includes('NaN'), 'stav B neobsahuje „NaN“');
	nastavA(0, 0);
	nastavB(0);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Účinky proudu na tělo', 'Napětí, vlhkost kůže', 'Kudy proud teče', 'Ohmův zákon', 'nikdy se to nezkouší']) {
		ok(html.includes(slovo), `ve viditelném HTML je „${slovo}“`);
	}
	ok(/id="upb-a-napeti"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník napětí (A) jde 0–2, výchozí 0 (baterie)');
	ok(/id="upb-a-kuze"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník kůže (A) jde 0–2, výchozí 0 (suchá)');
	ok(/id="upb-b-cesta"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník cesty (B) jde 0–2, výchozí 0 (ruka→ruka)');
	ok(html.includes('230 V'), 'napětí zásuvky (230 V) je vidět i v textu, ne jen ve výpočtu');
	ok(!zdroj.includes('import '), 'skript neobsahuje žádný import (hard rule)');
}

console.log(chyby === 0 ? '\n✅ Účinky proudu na člověka, bezpečnost: vše sedí.' : `\n❌ Účinky proudu na člověka, bezpečnost: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

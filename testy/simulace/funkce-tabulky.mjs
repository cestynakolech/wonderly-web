#!/usr/bin/env node
// Ověření FunkceTabulkySimulace.astro — funkce v tabulkách (informatika 8).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlídané pointy (výklad je má v sekci „Snadno se popletou"):
//  ★ POČET počítá jen ČÍSLA — text ani prázdná buňka se nezapočítají,
//  ★ PRŮMĚR dělí POČTEM ČÍSEL, ne počtem řádků (proto „Excelu vychází jiný průměr"),
//  ★ MIN je u známek ta nejlepší, MAX nejhorší,
//  ★ RANK bez třetího údaje řadí od největší → nejhorší známka by byla první,
//  ★ prázdná buňka se v porovnání bere jako NULA, takže =KDYŽ napíše „prospěl"
//    i tomu, komu známku nikdo nezapsal; text je naopak větší než každé číslo.
//
// Očekávané hodnoty se počítají RUČNĚ v testu, ne testovaným kódem — jinak by se
// tvrzení přizpůsobila jakékoli implementaci (nález z mutačního testu minulého kola).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.split('<script>')[0];

const prvky = new Map();
const vyrobene = new Set();
const novy = (id, vTemplatu = false) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		_text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); if (v === '') this.deti = []; },
		classList: { tridy: new Set(), add(t) { this.tridy.add(t); }, remove(t) { this.tridy.delete(t); }, contains(t) { return this.tridy.has(t); } },
		get className() { return [...this.classList.tridy].join(' '); },
		set className(v) { this.classList.tridy = new Set(String(v).split(/\s+/).filter(Boolean)); },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(d) { this.deti.push(d); },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	if (!vTemplatu) vyrobene.add(id);
	prvky.set(id, p);
	return p;
};
const tl = (d, id) => { const x = novy(id, true); Object.assign(x.dataset, d); return x; };

const bunkyEl = [0, 1, 2, 3, 4, 5].map((i) => tl({ radek: String(i) }, 'fn-bunka-' + i));
const volbyEl = [tl({ poradi: '1' }, 'v-poradi-1'), tl({ poradi: '0' }, 'v-poradi-0')];
function querySelectorAll(s) {
	if (s === '.fn-bunka') return bunkyEl;
	if (s === '.fn-volba') return volbyEl;
	return [];
}
const ID_SABLONY = ['fn-telo', 'fn-stav', 'fn-reset', 'fn-suma', 'fn-pocet', 'fn-prumer',
	'fn-podil', 'fn-min', 'fn-max', 'fn-rank', 'fn-rank-vzorec',
	...[0, 1, 2, 3, 4, 5].map((i) => 'fn-kdyz-' + i)];
for (const id of ID_SABLONY) novy(id, true);

const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll,
	createElement: () => novy('e' + Math.random(), true), createElementNS: () => novy('e' + Math.random(), true) };
const sandbox = { document, console, Array, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const telo = prvky.get('fn-telo');
const stavEl = prvky.get('fn-stav');
const btnReset = prvky.get('fn-reset');
const el = (id) => prvky.get(id);

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (e) => (e.posluchaci.click || []).forEach((f) => f());

const { JMENA, VYCHOZI, TEXT, PRAZDNO, KOLECKO, MEZ_KDYZ } = telo.__meze;

// ———————————————————————— 1) FUNKCE POČÍTAJÍ SPRÁVNĚ (očekávání spočítaná ručně)
{
	ok(JSON.stringify(VYCHOZI) === JSON.stringify([1, 3, 2, 5, 2, 5]), 'výchozí známky jsou 1, 3, 2, 5, 2, 5');
	ok(telo.__SUMA(VYCHOZI) === 18, 'SUMA dá 18');
	ok(telo.__POCET(VYCHOZI) === 6, 'POČET dá 6');
	ok(telo.__PRUMER(VYCHOZI) === 3, '★ průměr vyjde jako CELÉ číslo 3 (18 ÷ 6) — na startu žádné desetiny');
	ok(telo.__MIN(VYCHOZI) === 1, 'MIN dá 1 — u známek ta nejlepší');
	ok(telo.__MAX(VYCHOZI) === 5, 'MAX dá 5 — u známek ta nejhorší');
	ok(telo.__MIN(VYCHOZI) < telo.__MAX(VYCHOZI), 'a MIN je opravdu menší než MAX (funkce nejsou prohozené)');

	// Nezávislý přepočet: součet i počet spočítané v testu vlastní smyčkou.
	let s = 0, p = 0;
	for (const h of VYCHOZI) if (typeof h === 'number') { s += h; p++; }
	ok(telo.__SUMA(VYCHOZI) === s && telo.__POCET(VYCHOZI) === p, 'součet i počet sedí s ručním přepočtem v testu');
}

// ———————————————————————— 2) ★ POČET A PRŮMĚR NEBEROU TEXT ANI PRÁZDNO
{
	const sText = [1, 3, 2, TEXT, 2, 5];        // z Dany (5) je „nehodnocen"
	ok(telo.__POCET(sText) === 5, '★ text se do POČTU nezapočítá (6 → 5)');
	ok(telo.__SUMA(sText) === 13, 'a SUMA ho přeskočí (18 − 5 = 13)');
	ok(telo.__PRUMER(sText) === 13 / 5, '★ PRŮMĚR dělí POČTEM ČÍSEL (13 ÷ 5), ne šesti řádky');
	ok(telo.__PRUMER(sText) !== 13 / 6, 'kdyby dělil šesti, vyšlo by něco jiného — a to je ta klasická chyba');

	const sPrazdno = [1, 3, 2, PRAZDNO, 2, 5];
	ok(telo.__POCET(sPrazdno) === 5, '★ prázdná buňka se do POČTU taky nezapočítá');
	ok(telo.__SUMA(sPrazdno) === 13, 'a do součtu nepřidá nic');
	ok(telo.__PRUMER(sPrazdno) === telo.__PRUMER(sText), 'text i prázdno působí na průměr stejně');

	// Hodnota rovná průměru průměrem nehne — hezká kotva, že se dělí opravdu počtem.
	const sTri = [1, TEXT, 2, 5, 2, 5];         // pryč je trojka, tedy právě průměr
	ok(telo.__PRUMER(sTri) === 3, 'vyřazení známky rovné průměru průměrem nepohne (15 ÷ 5 = 3)');

	// Bez jediného čísla hlásí tabulka #DIV/0!.
	const zadne = [TEXT, TEXT, PRAZDNO, PRAZDNO, TEXT, PRAZDNO];
	ok(telo.__POCET(zadne) === 0, 'bez čísel je POČET nula');
	ok(telo.__PRUMER(zadne) === null, '★ a PRŮMĚR se nepočítá — dělení nulou (#DIV/0!)');
	ok(telo.__MIN(zadne) === 0 && telo.__MAX(zadne) === 0, 'MIN a MAX přitom vrátí nulu, i když žádná známka není');
}

// ———————————————————————— 3) ★ KDYŽ: prázdno je nula, text je větší než číslo
{
	ok(telo.__KDYZ(1) === 'prospěl' && telo.__KDYZ(3) === 'prospěl', `známka do ${MEZ_KDYZ} včetně je „prospěl"`);
	ok(telo.__KDYZ(4) === 'neprospěl' && telo.__KDYZ(5) === 'neprospěl', 'horší známka je „neprospěl"');
	ok(telo.__KDYZ(MEZ_KDYZ) === 'prospěl' && telo.__KDYZ(MEZ_KDYZ + 1) === 'neprospěl',
		'mez je přesně tam, kde ji má vzorec (≤ znamená včetně)');
	ok(telo.__KDYZ(TEXT) === 'neprospěl', '★ text se porovnává jako VĚTŠÍ než každé číslo → „neprospěl"');
	ok(telo.__KDYZ(PRAZDNO) === 'prospěl', '★ prázdná buňka se bere jako NULA → „prospěl", i když známka chybí');
}

// ———————————————————————— 4) ★ RANK: třetí údaj rozhoduje, kdo je první
{
	const b = VYCHOZI;
	ok(telo.__RANK(1, b, 1) === 1, '★ s ;1 je jednička na 1. místě — u známek správně');
	ok(telo.__RANK(1, b, 0) === 6, '★ bez třetího údaje vyjde tatáž jednička jako 6. — nejhorší by byla první');
	ok(telo.__RANK(5, b, 1) === 5, 'pětka je s ;1 až pátá');
	ok(telo.__RANK(5, b, 0) === 1, 'a bez údaje první — přesně ta past');
	ok(telo.__RANK(TEXT, b, 1) === null, 'RANK textu nedá pořadí (#HODNOTA!)');
	// Shodné hodnoty musí dostat shodné pořadí, jinak by to nebyl žebříček.
	ok(telo.__RANK(2, b, 1) === telo.__RANK(2, b, 1), 'stejná hodnota dostane vždy stejné pořadí');
	ok(telo.__RANK(2, [1, 2, 2, 3], 1) === 2, 'dvě stejné hodnoty sdílejí místo (1, 2, 2, 4)');
}

// ———————————————————————— 5) ČESKÝ ZÁPIS ČÍSEL
{
	ok(telo.__cz(3) === '3', 'celé číslo se píše bez desetin');
	ok(telo.__cz(2.6) === '2,6', '★ desetinná ČÁRKA, ne tečka');
	ok(telo.__cz(13 / 5) === '2,6', 'a průměr 13 ÷ 5 se vypíše jako 2,6');
	ok(!telo.__cz(2.5).includes('.') && !telo.__cz(2.5).includes('0'), 'nuly navíc se nevypisují („2,50" → „2,5")');
	ok(telo.__cz(17 / 6) === '2,83', 'nekonečný rozvoj se zaokrouhlí na dvě místa');
}

// ———————————————————————— 6) SCÉNA: čtou se SKUTEČNĚ vypsané hodnoty
{
	klik(btnReset);
	ok(el('fn-suma').textContent === '18' && el('fn-pocet').textContent === '6',
		'panel výsledků opravdu vypisuje SUMU a POČET');
	ok(el('fn-prumer').textContent === '3', 'a průměr 3');
	ok(el('fn-min').textContent === '1' && el('fn-max').textContent === '5', 'i MIN a MAX');
	ok(el('fn-bunka-0').textContent === '1' && el('fn-bunka-3').textContent === '5',
		'v buňkách jsou vypsané skutečné známky');
	ok(el('fn-kdyz-0').textContent === 'prospěl' && el('fn-kdyz-3').textContent === 'neprospěl',
		'sloupec s KDYŽ se počítá pro každý řádek zvlášť');
	ok(/POČTEM ČÍSEL/.test(el('fn-podil').textContent), 'u průměru je vidět, čím se dělí');
	ok(el('fn-podil').textContent.includes('18') && el('fn-podil').textContent.includes('6'),
		'a to konkrétními čísly, ne obecnou větou');

	// Klik na buňku Dany (5) → 1, ...; projdeme kolečko a musíme se vrátit na začátek.
	const bunka = prvky.get('fn-bunka-3');
	const pred = telo.__bunky()[3];
	klik(bunka);
	ok(telo.__bunky()[3] !== pred, 'klik na buňku ji opravdu změní');
	for (let i = 1; i < KOLECKO.length; i++) klik(bunka);
	ok(telo.__bunky()[3] === pred, `kolečko o ${KOLECKO.length} krocích se vrátí na původní hodnotu (cesta tam i zpět)`);

	// Dojet na „nehodnocen" a přečíst, co se opravdu vypsalo.
	let poj = 0;
	while (telo.__bunky()[3] !== TEXT && poj++ < 20) klik(bunka);
	ok(telo.__bunky()[3] === TEXT, 'do buňky jde zapsat text');
	ok(el('fn-pocet').textContent === '5', '★ POČET na stránce klesl na 5');
	ok(el('fn-suma').textContent === '13', 'a SUMA na 13');
	ok(el('fn-prumer').textContent === '2,6', '★ průměr se změnil na 2,6 — dělí se pěti, ne šesti');
	ok(el('fn-kdyz-3').textContent === 'neprospěl', 'a KDYŽ u textu napsalo „neprospěl"');
	ok(/POČET klesl|dělí/.test(stavEl.innerHTML), 'hláška žákovi vysvětlí, co se stalo');
	ok(stavEl.innerHTML.includes('5'), 'a uvede skutečný počet, ne obecnou frázi');

	// Prázdná buňka: pointa je opačná — KDYŽ napíše „prospěl".
	klik(bunka);
	ok(telo.__bunky()[3] === PRAZDNO, 'další klik buňku vyprázdní');
	ok(el('fn-bunka-3').textContent === '', 'prázdná buňka je opravdu prázdná');
	ok(el('fn-kdyz-3').textContent === 'prospěl', '★ u prázdné buňky napsalo KDYŽ „prospěl" — bere ji jako nulu');
	ok(el('fn-pocet').textContent === '5', 'do POČTU se přitom pořád nepočítá');
	ok(/nula|nul/.test(stavEl.innerHTML), 'a hláška na to upozorní');

	klik(btnReset);
	ok(el('fn-prumer').textContent === '3' && el('fn-pocet').textContent === '6', 'tlačítko ↺ vrátí původní známky');
}

// ———————————————————————— 7) PŘEPÍNAČ POŘADÍ V RANK
{
	klik(btnReset);
	klik(prvky.get('v-poradi-1'));
	ok(el('fn-rank').textContent === '1.', 'Adam s jedničkou je při pořadí od nejmenší první');
	ok(el('fn-rank-vzorec').textContent.includes(';1'), 'a ve vzorci je vidět třetí údaj ;1');
	klik(prvky.get('v-poradi-0'));
	ok(el('fn-rank').textContent === '6.', '★ bez třetího údaje je tentýž Adam šestý — past je vidět');
	ok(!el('fn-rank-vzorec').textContent.includes(';1'), 'a vzorec se změní taky');
	ok(/od největší/.test(stavEl.innerHTML), 'hláška vysvětlí, co přepínač udělal');
	ok(!/POČET klesl/.test(stavEl.innerHTML), 'a netvrdí změnu buňky, ke které nedošlo');
	klik(prvky.get('v-poradi-1'));
	ok(el('fn-rank').textContent === '1.', 'přepínač má cestu tam i zpět');
}

// ———————————————————————— 8) ŠABLONA A PŘÍSTUPNOST
{
	for (const id of ID_SABLONY) ok(html.includes(`id="${id}"`), `šablona opravdu obsahuje prvek #${id}`);
	ok(vyrobene.size === 0, `skript nesáhl na žádný prvek mimo šablonu${vyrobene.size ? ': ' + [...vyrobene].join(', ') : ''}`);
	ok((html.match(/class="fn-bunka"/g) ?? []).length === JMENA.length, `šablona má ${JMENA.length} klikacích buněk`);
	ok(JMENA.every((j) => html.includes(`<td>${j}</td>`)), 'a jména žáků jsou v tabulce');
	ok((html.match(/aria-pressed="(true|false)"/g) ?? []).length === 2, 'oba přepínače hlásí odečítači svůj stav');
	ok((html.match(/aria-pressed="true"/g) ?? []).length === 1, 'a zvolený je právě jeden');
	ok(/aria-live="polite"/.test(html), 'stavová hláška je označená jako živá');
	ok(/<thead>[\s\S]*<th>/.test(html), 'tabulka má záhlaví, aby ji odečítač uměl přečíst');
	ok(/overflow-x: auto/.test(zdroj), 'široká tabulka se na mobilu roluje sama, nerozbije stránku');
	// Klikací buňka musí říct odečítači, čí známka to je — samotné číslo mu nestačí.
	klik(btnReset);
	ok(/Adam/.test(el('fn-bunka-0').atributy['aria-label'] ?? ''), 'buňka řekne odečítači, čí známku obsahuje');
	ok(/prázdn/.test((() => { const b = prvky.get('fn-bunka-0'); let i = 0; while (telo.__bunky()[0] !== PRAZDNO && i++ < 20) klik(b); return el('fn-bunka-0').atributy['aria-label'] ?? ''; })()),
		'a u prázdné buňky to řekne slovem, ne mlčením');
	klik(btnReset);
}

console.log(chyby === 0 ? `\n✅ Funkce v tabulkách: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);

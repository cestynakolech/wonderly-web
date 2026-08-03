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

const { JMENA, GENITIV, VYCHOZI, TEXT, PRAZDNO, KOLECKO, MEZ_KDYZ, KODY } = telo.__meze;

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

	// Bez jediného čísla hlásí tabulka #DĚLENÍ_NULOU! (český Excel).
	const zadne = [TEXT, TEXT, PRAZDNO, PRAZDNO, TEXT, PRAZDNO];
	ok(telo.__POCET(zadne) === 0, 'bez čísel je POČET nula');
	ok(telo.__PRUMER(zadne) === null, '★ a PRŮMĚR se nepočítá — dělení nulou (#DĚLENÍ_NULOU!)');
	ok(telo.__MIN(zadne) === 0 && telo.__MAX(zadne) === 0, 'MIN a MAX přitom vrátí nulu, i když žádná známka není');
}

// ———————————————————————— 3) ★ KDYŽ: prázdno je nula, text je větší než číslo
{
	ok(telo.__KDYZ(1) === 'prospěl' && telo.__KDYZ(3) === 'prospěl', `známka do ${MEZ_KDYZ} včetně je „prospěl"`);
	ok(telo.__KDYZ(4) === 'prospěl', '★ známka 4 je dostatečná — ve škole PROSPĚL (nález kontrolora)');
	ok(telo.__KDYZ(5) === 'neprospěl', 'neprospěl je až pětka');
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
	// Chybové kódy jsou v Excelu DVA různé a nesmí se plést: text porovnat nejde,
	// kdežto prázdná buňka se bere jako nula — a nula mezi známkami prostě není.
	ok(telo.__RANK(TEXT, b, 1) === KODY.hodnota, `★ RANK textu hlásí ${KODY.hodnota} — porovnat text nejde`);
	ok(telo.__RANK(PRAZDNO, b, 1) === KODY.neniK, `★ ale u PRÁZDNÉ buňky je to ${KODY.neniK} — hledá se nula, kterou sloupec nemá`);
	ok(telo.__RANK(TEXT, b, 1) !== telo.__RANK(PRAZDNO, b, 1), 'a jsou to opravdu dva různé kódy, ne jeden na všechno');
	ok(telo.__RANK(4, [1, 2, 3], 1) === KODY.neniK, `hodnota, která v rozsahu není, dá taky ${KODY.neniK}`);
	ok(telo.__RANK(4, [1, 2, 3, 4], 1) === 4, 'a jakmile v rozsahu je, pořadí se spočítá');
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
	ok(el('fn-rank').textContent === '1', 'Adam s jedničkou je při pořadí od nejmenší první');
	ok(el('fn-rank-vzorec').textContent.includes(';1'), 'a ve vzorci je vidět třetí údaj ;1');
	klik(prvky.get('v-poradi-0'));
	ok(el('fn-rank').textContent === '6', '★ bez třetího údaje je tentýž Adam šestý — past je vidět');
	ok(!el('fn-rank-vzorec').textContent.includes(';1'), 'a vzorec se změní taky');
	ok(/od největší/.test(stavEl.innerHTML), 'hláška vysvětlí, co přepínač udělal');
	ok(!/POČET klesl/.test(stavEl.innerHTML), 'a netvrdí změnu buňky, ke které nedošlo');
	klik(prvky.get('v-poradi-1'));
	ok(el('fn-rank').textContent === '1', 'přepínač má cestu tam i zpět');
	ok(telo.__poradi() === 1, 'a stav přepínače v kódu tomu odpovídá');
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
	ok(/<thead>[\s\S]*<th[ >]/.test(html), 'tabulka má záhlaví, aby ji odečítač uměl přečíst');
	ok(/overflow-x: auto/.test(zdroj), 'široká tabulka se na mobilu roluje sama, nerozbije stránku');
	// Klikací buňka musí říct odečítači, čí známka to je — samotné číslo mu nestačí.
	klik(btnReset);
	ok(/Adam/.test(el('fn-bunka-0').atributy['aria-label'] ?? ''), 'buňka řekne odečítači, čí známku obsahuje');
	ok(/prázdn/.test((() => { const b = prvky.get('fn-bunka-0'); let i = 0; while (telo.__bunky()[0] !== PRAZDNO && i++ < 20) klik(b); return el('fn-bunka-0').atributy['aria-label'] ?? ''; })()),
		'a u prázdné buňky to řekne slovem, ne mlčením');
	klik(btnReset);
}

// ———————————————————————— 9) ★ TEXTY VZORCŮ V ŠABLONĚ (tady test doteď neviděl nic)
//
// Nález kontrolora 2. 8. 2026: osm podvrhů v HTML prošlo všemi kontrolami — změněná mez
// v hlavičce, prohozený popisek MIN, rozsah B2:B8, anglická čárka místo středníku,
// =PRUMER bez háčků, smyšlený chybový kód, prohozené popisky přepínače. Vzorec na
// obrazovce přitom dítě čte jako pravdu — a je to jediné, co si z hodiny odnese.
// Proto se každý text porovnává s tím, co kód OPRAVDU dělá, ne s napevno psaným řetězcem.
{
	const sablona = html.slice(html.indexOf('<section'));   // bez komentářů ve frontmatteru
	const POSL_RADEK = JMENA.length + 1;                    // 6 žáků začínajících na řádku 2 → B7

	// a) Mez ve vzorci v hlavičce sloupce C musí být tatáž, jakou počítá KDYŽ.
	const hlavickaC = sablona.match(/<th scope="col">C — (=KDYŽ\([^<]*?\))/)?.[1] ?? '';
	ok(hlavickaC !== '', 'hlavička sloupce C ukazuje celý vzorec =KDYŽ(…)');
	const mezVHlavicce = Number(hlavickaC.match(/&lt;=(\d+)/)?.[1]);
	ok(mezVHlavicce === MEZ_KDYZ,
		`★ mez ve vzorci v hlavičce (${mezVHlavicce}) je tatáž, jakou počítá KDYŽ (${MEZ_KDYZ}) — jinak stránka tvrdí něco jiného, než počítá`);
	ok(telo.__KDYZ(mezVHlavicce) === 'prospěl' && telo.__KDYZ(mezVHlavicce + 1) === 'neprospěl',
		'a napsaná mez sedí i na chování: do ní „prospěl", o jedna výš „neprospěl"');
	ok(hlavickaC.includes('"prospěl"') && hlavickaC.includes('"neprospěl"'),
		'obě větve vzorce jsou přesně ta slova, která se do sloupce C vypisují');

	// b) Rozsahy míří na tolik řádků, kolik jich v tabulce doopravdy je.
	const cislaRadku = [...sablona.matchAll(/<tr><th scope="row">(\d+)<\/th><td>/g)].map((m) => Number(m[1]));
	ok(JSON.stringify(cislaRadku) === JSON.stringify(JMENA.map((_, i) => i + 2)),
		`čísla řádků v tabulce jdou 2…${POSL_RADEK}, jak je v tabulkovém procesoru zvykem`);
	const rozsahy = [...sablona.matchAll(/B(\d+):B(\d+)/g)];
	ok(rozsahy.length >= 5, `v šabloně je vidět ${rozsahy.length} rozsahů ve vzorcích`);
	const spatne = rozsahy.filter((r) => Number(r[1]) !== 2 || Number(r[2]) !== POSL_RADEK);
	ok(spatne.length === 0,
		`★ každý rozsah je B2:B${POSL_RADEK} — přesně přes ${JMENA.length} známek${spatne.length ? ', vadné: ' + spatne.map((r) => r[0]).join(', ') : ''}`);
	klik(btnReset);
	ok(el('fn-rank-vzorec').textContent.includes(`$B$2:$B$${POSL_RADEK}`),
		`a rozsah ve vzorci RANK taky ($B$2:$B$${POSL_RADEK})`);

	// c) Oddělovač argumentů je v českém prostředí STŘEDNÍK. S čárkou by vzorec nešel opsat.
	const vzorce = [...sablona.matchAll(/=[A-ZĚŠČŘŽÝÁÍÉŮÚ]+\([^<]*?\)/g)].map((m) => m[0])
		.concat(el('fn-rank-vzorec').textContent);
	ok(vzorce.length >= 6, `ke kontrole je ${vzorce.length} vzorců (šablona + vypsaný RANK)`);
	const sCarkou = vzorce.filter((v) => v.includes(','));
	ok(sCarkou.length === 0,
		`★ argumenty odděluje STŘEDNÍK, ne anglická čárka${sCarkou.length ? ': ' + sCarkou.join(' · ') : ''}`);
	ok(vzorce.filter((v) => v.includes(';')).length >= 2, 'a středník je aspoň ve dvou vzorcích opravdu vidět');

	// d) Názvy funkcí česky i s háčky — =PRUMER žádný český Excel nezná.
	for (const n of ['SUMA', 'POČET', 'PRŮMĚR', 'MIN', 'MAX', 'KDYŽ'])
		ok(sablona.includes(`=${n}(`), `šablona ukazuje funkci =${n}(`);
	for (const n of ['POCET', 'PRUMER', 'KDYZ'])
		ok(!sablona.includes(`=${n}(`), `★ a nikde není =${n}( bez háčků — takovou funkci by tabulka odmítla`);

	// e) Popisky MIN a MAX nejsou prohozené — a souhlasí s tím, co funkce vrací.
	const radekFunkce = (fn) => sablona.match(new RegExp(`<th scope="row">=${fn}\\(B2:B\\d+\\)</th>[\\s\\S]*?</tr>`))?.[0] ?? '';
	ok(/nejlepší/.test(radekFunkce('MIN')) && !/nejhorší/.test(radekFunkce('MIN')),
		'★ u MIN stojí „nejlepší" — a opravdu: MIN(1,3,2,5,2,5) = ' + telo.__MIN(VYCHOZI));
	ok(/nejhorší/.test(radekFunkce('MAX')) && !/nejlepší/.test(radekFunkce('MAX')),
		'★ u MAX „nejhorší" — MAX dá ' + telo.__MAX(VYCHOZI) + ', popisky nejsou prohozené');
	ok(telo.__MIN(VYCHOZI) < telo.__MAX(VYCHOZI), 'a menší známka je opravdu ta lepší, takže popisky dávají smysl');

	// f) Popisek přepínače souhlasí s tím, co tlačítko udělá (ne jen s tím, co je napsané).
	const tlacitka = [...sablona.matchAll(/<button[^>]*data-poradi="(\d)"[^>]*>([^<]*)<\/button>/g)]
		.map((m) => ({ poradi: m[1], text: m[2].trim() }));
	ok(tlacitka.length === 2, 'přepínač pořadí má dvě tlačítka');
	for (const t of tlacitka) {
		klik(prvky.get('v-poradi-' + t.poradi));
		// Adam má jedničku, tedy nejmenší známku: „od nejmenší" ⇔ je první.
		const adamPrvni = el('fn-rank').textContent === '1';
		ok(adamPrvni === /nejmenší/.test(t.text),
			`★ popisek „${t.text}" souhlasí s tím, co tlačítko opravdu udělá (Adam s jedničkou vyjde ${el('fn-rank').textContent})`);
		ok(/;1/.test(t.text) === (t.poradi === '1'),
			`a třetí údaj ;1 je zmíněný jen tam, kde se opravdu použije („${t.text}")`);
	}
	klik(prvky.get('v-poradi-1'));

	// g) Chybové kódy jen ze skutečné české sady — smyšlený kód se dítě naučí špatně.
	const KODY_EXCELU = ['#DĚLENÍ_NULOU!', '#HODNOTA!', '#N/A', '#NÁZEV?', '#ODKAZ!', '#ČÍSLO!', '#NULL!'];
	// Hledá se jen v tom, co se může dostat na obrazovku — komentáře pryč
	// (v komentáři smí být napsané i to, co se schválně NEpoužívá).
	const bezKomentaru = zdroj.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
	const kody = [...new Set(bezKomentaru.match(/#(?:N\/A|[A-ZĚŠČŘŽÝÁÍÉŮÚ_0-9/]+[!?])/g) ?? [])];
	ok(kody.length >= 2, `v simulaci se objevují chybové kódy tabulky (${kody.join(', ')})`);
	const cizi = kody.filter((k) => !KODY_EXCELU.includes(k));
	ok(cizi.length === 0,
		`★ všechny chybové kódy jsou skutečné kódy českého Excelu${cizi.length ? ' — neznámý: ' + cizi.join(', ') : ''}`);

	// A kód, který se opravdu vypíše, je z téhož seznamu — ne jen ten napsaný v komentáři.
	for (let i = 0; i < JMENA.length; i++) {
		const b = prvky.get('fn-bunka-' + i);
		let poj = 0;
		while (telo.__bunky()[i] !== PRAZDNO && poj++ < 20) klik(b);
	}
	ok(telo.__POCET(telo.__bunky()) === 0, 'po vyprázdnění všech buněk nezůstalo jediné číslo');
	ok(KODY_EXCELU.includes(el('fn-prumer').textContent),
		`★ a PRŮMĚR vypsal skutečný chybový kód: ${el('fn-prumer').textContent}`);
	ok(KODY_EXCELU.includes(el('fn-rank').textContent),
		`★ i RANK vypsal skutečný kód: ${el('fn-rank').textContent} (prázdná buňka = nula, ta ve sloupci není)`);
	klik(btnReset);

	// h) Odečítač: každé záhlaví musí říct, kterým směrem platí, a popisek buňky 2. pádem.
	const zahlaviBezScope = (sablona.match(/<th(?=[\s>])(?![^>]*scope=)[^>]*>/g) ?? []);
	ok(zahlaviBezScope.length === 0,
		`★ každé záhlaví <th> má scope (sloupec × řádek)${zahlaviBezScope.length ? ' — chybí u ' + zahlaviBezScope.join(' ') : ''}`);
	ok((sablona.match(/scope="col"/g) ?? []).length === 4, 'čtyři sloupcová záhlaví hlavní tabulky');
	ok((sablona.match(/scope="row"/g) ?? []).length === JMENA.length + 6,
		`a řádková záhlaví u všech ${JMENA.length} řádků známek i u šesti vzorců`);
	ok(/kopírováno dolů/.test(sablona),
		'★ u vzorce v hlavičce je řečeno, že platí pro celý sloupec — jinak vypadá, že jen pro řádek 2');
	klik(btnReset);
	// Očekávané tvary jsou v testu vypsané RUČNĚ — kontrola „začíná stejně jako jméno"
	// propustila i „známka Danou" (nález kontrolora 3. 8. 2026).
	const DRUHY_PAD = ['Adama', 'Báry', 'Cyrila', 'Dany', 'Emila', 'Filipa'];
	ok(JSON.stringify(GENITIV) === JSON.stringify(DRUHY_PAD),
		'★ 2. pády jsou přesně ty správné tvary, ne libovolný jiný pád');
	for (let i = 0; i < JMENA.length; i++)
		ok((el('fn-bunka-' + i).atributy['aria-label'] ?? '').includes(`známka ${GENITIV[i]}`),
			`★ odečítač uslyší „známka ${GENITIV[i]}" — 2. pád, ne „známka ${JMENA[i]}"`);

	// i) Šrafa prázdné buňky musí být vidět i na promítačce: kontrast aspoň 3 : 1 proti bílé.
	const sytost = (h) => {
		const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
			.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
		return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	};
	const kontrastNaBile = (b) => 1.05 / (sytost(b) + 0.05);
	const barvaSrafy = zdroj.match(/\.fn-prazdna\s*\{[^}]*?(#[0-9a-f]{6})\s*5px/i)?.[1] ?? '';
	ok(barvaSrafy !== '', 'šrafa prázdné buňky má v CSS svou barvu');
	ok(kontrastNaBile(barvaSrafy) >= 3,
		`★ šrafa (${barvaSrafy}) má proti bílé kontrast ${kontrastNaBile(barvaSrafy).toFixed(2)} : 1 — aspoň 3 : 1, jinak na plátně zmizí`);
	// Totéž platí pro každou čáru, kterou je tabulka nakreslená — mřížka „excelu" je taky
	// grafika nesoucí informaci a na promítačce mizí jako první (nález kontrolora).
	const cary = [...new Set([...zdroj.matchAll(/border[^;:]*:\s*\d+px\s+solid\s+(#[0-9a-f]{3,6})/gi)].map((m) => m[1]))];
	ok(cary.length >= 2, `v CSS jsou ${cary.length} barvy čar ke kontrole`);
	const bledeCary = cary.filter((b) => b.length === 7 && kontrastNaBile(b) < 3);
	ok(bledeCary.length === 0,
		`★ každá čára má proti bílé aspoň 3 : 1${bledeCary.length ? ' — bledé: ' + bledeCary.map((b) => `${b} (${kontrastNaBile(b).toFixed(2)} : 1)`).join(', ') : ''}`);
}

// ———————————————————————— 10) ★ NAUČNÁ TVRZENÍ (věta smí říkat jen to, co kód dělá)
//
// Druhý nález kontrolora 3. 8. 2026: sekce 9 hlídá VZORCE, ale výukové věty ne — a z 15
// podvržených nepravd jich 11 prošlo zeleně, mezi nimi „text je menší než každé číslo"
// (opak Excelu) a pevně vepsané „18 ÷ 6 = 3" v hlášce, která se ukazuje i po změně známky.
// Věta o učivu je pro dítě stejné tvrzení jako číslo v panelu, jen v jiném písmu.
{
	const sablona = html.slice(html.indexOf('<section'));
	const cistyText = (h) => h.replace(/<[^>]*>/g, '');
	const stav = () => cistyText(stavEl.innerHTML);
	const pozn = (fn) => cistyText(sablona.match(new RegExp(`<th scope="row">=${fn}\\([^<]*</th>[\\s\\S]*?class="fn-pozn"[^>]*>([\\s\\S]*?)</td>`))?.[1] ?? '');

	// a) Když hláška ukazuje výpočet „a ÷ b = c", musí to být DNEŠNÍ a, b, c.
	let sVypoctem = 0;
	const vypocetSedi = () => {
		const m = stav().match(/([\d,]+)\s*÷\s*([\d,]+)\s*=\s*([\d,]+)/);
		if (!m) return true;
		sVypoctem++;
		const b = telo.__bunky();
		return m[1] === telo.__cz(telo.__SUMA(b)) && m[2] === telo.__cz(telo.__POCET(b))
			&& m[3] === telo.__cz(telo.__PRUMER(b));
	};
	klik(btnReset);
	ok(vypocetSedi(), '★ výpočet ve výchozí hlášce sedí se známkami v tabulce');
	const bunkaA = prvky.get('fn-bunka-0');
	let selhalo = 0;
	for (let i = 0; i < KOLECKO.length * 2; i++) { klik(bunkaA); if (!vypocetSedi()) selhalo++; }
	ok(selhalo === 0, `★ a sedí i po každé z ${KOLECKO.length * 2} změn známky — čísla se počítají, nejsou vepsaná natvrdo`);
	ok(sVypoctem >= 2, `kontrola měla co měřit: výpočet se v hlášce objevil ${sVypoctem}×`);
	klik(btnReset);

	// b) Žádné číslo v hlášce nesmí být „odjinud" — každé musí být některá z platných hodnot.
	const platnaCisla = () => {
		const b = telo.__bunky();
		return new Set([telo.__SUMA(b), telo.__POCET(b), telo.__MIN(b), telo.__MAX(b), b.length, MEZ_KDYZ,
			...b.filter((h) => typeof h === 'number'), ...(telo.__PRUMER(b) === null ? [] : [telo.__PRUMER(b)])]
			.map((x) => telo.__cz(x)));
	};
	let cizich = 0, overenychStavu = 0;
	for (let i = 0; i < KOLECKO.length; i++) {
		klik(bunkaA);
		overenychStavu++;
		for (const c of stav().match(/\d+(?:,\d+)?/g) ?? []) if (!platnaCisla().has(c)) cizich++;
	}
	ok(cizich === 0, `★ každé číslo v hlášce je hodnota, která na obrazovce opravdu je (prošlo ${overenychStavu} stavů)`);
	klik(btnReset);

	// c) Poznámky u vzorců nesmí slibovat něco jiného, než funkce dělá.
	ok(/čísl/.test(pozn('SUMA')) && !/všechny buňky|každou buňku/.test(pozn('SUMA')),
		`★ poznámka u SUMA mluví o číslech („${pozn('SUMA')}") — a SUMA opravdu text přeskočí`);
	ok(telo.__SUMA([1, TEXT, 2]) === 3, 'což je i doloženo výpočtem: text se do součtu nedostane');
	ok(/čísl/.test(pozn('POČET')) && !/vyplněn/.test(pozn('POČET')),
		`★ poznámka u POČET mluví o ČÍSLECH, ne o vyplněných buňkách („${pozn('POČET')}")`);
	ok(telo.__POCET([1, TEXT, 2]) === 2, 'a vyplněná buňka s textem se opravdu nepočítá');
	// RANK počítá pořadí prvního žáka — poznámka musí jmenovat právě jeho.
	const poznRank = cistyText(sablona.match(/id="fn-rank"><\/td><td class="fn-pozn"[^>]*>([\s\S]*?)<\/td>/)?.[1] ?? '');
	ok(poznRank.includes(JMENA[0]), `★ poznámka u RANK jmenuje ${JMENA[0]}, jehož pořadí se počítá („${poznRank}")`);
	ok(JMENA.slice(1).every((j) => !poznRank.includes(j)), 'a nikoho jiného — RANK počítá pořadí jen prvního žáka');

	// d) Nápověda ke klikání musí sedět s KOLEČKEM, jinak vede dítě špatně.
	const napoveda = cistyText(sablona.match(/class="fn-napoveda">([\s\S]*?)<\/span>/)?.[1] ?? '');
	const kroky = napoveda.split('=')[1]?.split('→').map((s) => s.trim()) ?? [];
	const ocekavane = [...KOLECKO.map((h) => (h === PRAZDNO ? 'prázdná' : String(h))), '1'];
	ok(JSON.stringify(kroky) === JSON.stringify(ocekavane),
		`★ nápověda vypisuje kolečko přesně tak, jak se opravdu přepíná („${napoveda}")`);

	// e) Nadpis i úvod musí mluvit o funkci, kterou panel zvýrazňuje (fn-duraz).
	const zvyraznena = sablona.match(/class="fn-duraz"><th scope="row">=([A-ZĚŠČŘŽÝÁÍÉŮÚ]+)\(/)?.[1] ?? '';
	ok(zvyraznena !== '', `panel jednu funkci zvýrazňuje (${zvyraznena})`);
	const nadpis = cistyText(sablona.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? '').toLowerCase();
	const uvod = cistyText(sablona.match(/<\/h2>\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? '');
	ok(nadpis.includes(zvyraznena.toLowerCase()),
		`★ nadpis slibuje právě ${zvyraznena} — to, co je v panelu zvýrazněné („${nadpis}")`);
	ok(uvod.includes(zvyraznena) && uvod.includes('POČET'),
		`★ úvod posílá dítě sledovat POČET a ${zvyraznena}, tedy dvojici, na které stojí celá pointa`);

	// f) Hláška u textu: text je VĚTŠÍ než číslo — proto „neprospěl". Opak by byl blud.
	klik(btnReset);
	let poj = 0;
	while (telo.__bunky()[0] !== TEXT && poj++ < 20) klik(bunkaA);
	ok(telo.__bunky()[0] === TEXT, 'buňka je přepnutá na text');
	ok(telo.__KDYZ(TEXT) === 'neprospěl' && /větší/.test(stav()) && !/menší/.test(stav()),
		'★ hláška u textu říká „větší" — a KDYŽ to potvrzuje výsledkem „neprospěl"');

	// g) Bez jediného čísla MIN a MAX chybu NEhlásí, vracejí nulu — hláška to musí říct správně.
	for (let i = 0; i < JMENA.length; i++) {
		const b = prvky.get('fn-bunka-' + i);
		let p2 = 0;
		while (telo.__bunky()[i] !== PRAZDNO && p2++ < 20) klik(b);
	}
	ok(telo.__MIN(telo.__bunky()) === 0 && telo.__MAX(telo.__bunky()) === 0, 'bez čísel vrací MIN i MAX nulu');
	ok(/nulu|nula/.test(stav()) && !/MIN a MAX[^.]*chyb/.test(stav()),
		'★ a hláška mluví o nule, netvrdí u MIN/MAX chybu');
	ok(stav().includes(KODY.deleniNulou), `zato u PRŮMĚRU chybový kód ${KODY.deleniNulou} uvádí`);
	klik(btnReset);

	// h) Hlavička nesmí tvrdit opak toho, co říká poznámka o kopírování dolů.
	ok(!/jen pro řádek|pouze pro řádek/.test(sablona),
		'★ nikde není napsané, že vzorec platí jen pro řádek 2 — sloupec C se počítá pro všechny');
	ok((sablona.match(/id="fn-kdyz-\d"/g) ?? []).length === JMENA.length,
		`a sloupec C má opravdu ${JMENA.length} buněk, do kterých je vzorec „kopírovaný"`);
}

console.log(chyby === 0 ? `\n✅ Funkce v tabulkách: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);

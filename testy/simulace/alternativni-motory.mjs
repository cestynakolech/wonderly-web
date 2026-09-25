#!/usr/bin/env node
// Ověření AlternativniMotorySimulace.astro — zkušebna reaktivních motorů
// (F8, tepelne-motory/alternativni-motory).
//
// Měří se VÝSLEDEK: čistá funkce komponenty `__jede(typ, prostředí, rychlost)`
// a hlavně SKUTEČNĚ NAKRESLENÁ SCÉNA (atributy a texty z innerHTML), ne text zdroje.
// Očekávané hodnoty jsou napsané NATVRDO — kdyby si je test bral z konstant
// komponenty, mutace konstanty by projela nepovšimnutě.
//
// Co se hlídá:
//  1. pravdivostní tabulka všech 3 × 2 × 2 = 12 poloh ovládání (kdo kdy jede),
//  2. TEXT A KRESBA SI NESMÍ ODPOROVAT V ŽÁDNÉ Z NICH: plamen, šipka tahu,
//     popisky akce/reakce, barva komory i štítek „teplo/nehoří", plaketa,
//     věta pod scénou i tabulka musí ve všech dvanácti stavech říkat totéž,
//  3. číslo „jedou 2 ze 3 motorů" musí sedět s počtem zelených políček
//     v tabulce — jinak by scéna tvrdila něco, co si žák z obrázku nepřečte,
//  4. KRESBA NELŽE O DÍLECH: sání má jen motor, který nasává; kompresor
//     a turbína jsou plné jen u proudového a u náporového jsou čárkované,
//     přeškrtnuté a označené „nemá"; nádrž paliva a kyslíku má jen raketa,
//  5. CO MÁ BÝT VIDĚT, JE VIDĚT: žádný bílý podklad popisku nepřekrývá trup,
//     sání, trysku, plamen ani jiný popisek, štítek „teplo" se kreslí až po
//     komoře (jinak by ho oranžová výplň zakryla) a plamen začíná až za ústím
//     trysky. Kontrola atributu sama o sobě nic o viditelnosti nedokazuje,
//  6. nic nepřetéká scénu 660 × 510 (včetně odhadu šířky textů),
//  7. neměnnost: u proudového a raketového nesmí rychlost letu se scénou hnout
//     (rozhoduje jen kyslík), u náporového ve vzduchu naopak MUSÍ.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2];
if (!cesta) {
	console.log('Použití: node testy/simulace/alternativni-motory.mjs <komponenta.astro>');
	console.log('Příklad: node testy/simulace/alternativni-motory.mjs src/components/skola2/AlternativniMotorySimulace.astro');
	process.exit(1);
}
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {}, value: '',
		// toggle si pamatuje stav — jen tak je vidět, že svítí stisknuté tlačítko
		classList: { add() {}, remove() {}, toggle(_t, stav) { p.aktivni = stav; } },
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

const svg = prvky.get('am-svg');
const jede = svg.__jede;
const pocet = svg.__pocet;
const duvod = svg.__duvod;
const veta = svg.__veta;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ── rozbor nakreslené scény ──────────────────────────────────────────────────
/** Rozebere innerHTML skupiny na prvky s atributy a textem (v pořadí kreslení). */
function rozeber(html) {
	const out = [];
	const re = /<(\w+)([^>]*?)\/?>(?:([^<]*)<\/\1>)?/g;
	let m;
	while ((m = re.exec(html))) {
		const a = {};
		for (const am of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) a[am[1]] = am[2];
		out.push({ tag: m[1], a, text: m[3] ?? '', poradi: out.length });
	}
	return out;
}
/** Hrubý, schválně ŠTĚDRÝ odhad šířky textu — u přetečení raději planí, než mlčí. */
const sirkaTextu = (t, fs) => Array.from(t).length * 0.6 * fs;
/** Obdélník, který prvek na obrázku opravdu zabírá (včetně poloviny obrysu). */
function ramec(p) {
	const a = p.a;
	const s = (a['stroke-width'] ? Number(a['stroke-width']) : 0) / 2;
	if (p.tag === 'rect') return [Number(a.x) - s, Number(a.y) - s, Number(a.x) + Number(a.width) + s, Number(a.y) + Number(a.height) + s];
	if (p.tag === 'circle') return [Number(a.cx) - Number(a.r) - s, Number(a.cy) - Number(a.r) - s, Number(a.cx) + Number(a.r) + s, Number(a.cy) + Number(a.r) + s];
	if (p.tag === 'line') return [Math.min(Number(a.x1), Number(a.x2)) - s, Math.min(Number(a.y1), Number(a.y2)) - s, Math.max(Number(a.x1), Number(a.x2)) + s, Math.max(Number(a.y1), Number(a.y2)) + s];
	if (p.tag === 'polygon') {
		const b = a.points.trim().split(/\s+/).map((d) => d.split(',').map(Number));
		return [Math.min(...b.map((d) => d[0])) - s, Math.min(...b.map((d) => d[1])) - s, Math.max(...b.map((d) => d[0])) + s, Math.max(...b.map((d) => d[1])) + s];
	}
	if (p.tag === 'text') {
		const fs = Number(a['font-size']);
		const w = sirkaTextu(p.text, fs);
		const x = a['text-anchor'] === 'middle' ? Number(a.x) - w / 2 : Number(a.x);
		return [x, Number(a.y) - fs, x + w, Number(a.y) + fs / 4];
	}
	return null;
}
const prekryv = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

/** Nastaví ovládání kliknutím na tlačítka (jako to udělá dítě) a vrátí scénu. */
function stav(typ, prostredi, rychlost) {
	for (const [id] of [[`am-typ-${typ}`], [`am-prostredi-${prostredi}`], [`am-rychlost-${rychlost}`]]) {
		for (const f of prvky.get(id).posluchaci.click) f({ target: prvky.get(id) });
	}
	const g = (id) => prvky.get(id).innerHTML;
	return {
		motor: g('am-motor'), tok: g('am-tok'), verdikt: g('am-verdikt'), tabulka: g('am-tabulka'),
		castice: g('am-castice'), prostrediPopis: g('am-prostredi-popis'),
		obloha: prvky.get('am-obloha').atributy.fill,
		nazev: prvky.get('am-nazev').textContent,
		pocetText: prvky.get('am-pocet').textContent,
		stavText: prvky.get('am-stav').textContent,
		tokText: prvky.get('am-tok-popis').innerHTML,
		vse: [...rozeber(g('am-castice')), ...rozeber(g('am-prostredi-popis')), ...rozeber(g('am-motor')),
			...rozeber(g('am-tok')), ...rozeber(g('am-verdikt')), ...rozeber(g('am-tabulka'))],
	};
}

const TYPY = ['proudovy', 'raketovy', 'naporovy'];
const PROSTREDI = ['vzduch', 'vakuum'];
const RYCHLOSTI = ['bezna', 'vysoka'];
// Pravdivostní tabulka NATVRDO — přímo z výkladu:
// proudový nasává vzduch (ve vakuu tedy ne), raketový si veze okysličovadlo
// (jede vždy), náporový nemá kompresor a vzduch mu nacpe až vysoká rychlost.
const OCEKAVANO = {
	'proudovy|vzduch|bezna': true, 'proudovy|vzduch|vysoka': true,
	'proudovy|vakuum|bezna': false, 'proudovy|vakuum|vysoka': false,
	'raketovy|vzduch|bezna': true, 'raketovy|vzduch|vysoka': true,
	'raketovy|vakuum|bezna': true, 'raketovy|vakuum|vysoka': true,
	'naporovy|vzduch|bezna': false, 'naporovy|vzduch|vysoka': true,
	'naporovy|vakuum|bezna': false, 'naporovy|vakuum|vysoka': false,
};
const VSECHNY = [];
for (const t of TYPY) for (const p of PROSTREDI) for (const r of RYCHLOSTI) VSECHNY.push([t, p, r]);

console.log('— 1. kdo kdy jede (12 poloh ovládání) —');
for (const [t, p, r] of VSECHNY) {
	const cekano = OCEKAVANO[`${t}|${p}|${r}`];
	ok(jede(t, p, r) === cekano, `${t} · ${p} · ${r} → ${jede(t, p, r) ? 'jede' : 'nejede'} (čekáno ${cekano ? 'jede' : 'nejede'})`);
}
ok(TYPY.every((t) => jede(t, 'vakuum', 'vysoka') === (t === 'raketovy')),
	've vakuu jede z celé trojice JEN raketový motor — to je to, co má žák pochopit');

console.log('\n— 2. počet jedoucích motorů se dá přepočítat z tabulky —');
{
	const cekano = { 'vzduch|bezna': 2, 'vzduch|vysoka': 3, 'vakuum|bezna': 1, 'vakuum|vysoka': 1 };
	for (const p of PROSTREDI) for (const r of RYCHLOSTI) {
		const rucne = TYPY.filter((t) => OCEKAVANO[`${t}|${p}|${r}`]).length;
		ok(pocet(p, r) === cekano[`${p}|${r}`] && pocet(p, r) === rucne,
			`${p} · ${r}: jedou ${pocet(p, r)} ze 3 motorů (ručně spočítáno ${rucne})`);
	}
}

console.log('\n— 3. scéna a text říkají v každé z 12 poloh totéž —');
for (const [t, p, r] of VSECHNY) {
	const s = stav(t, p, r);
	const bezi = OCEKAVANO[`${t}|${p}|${r}`];
	const popis = `${t}/${p}/${r}`;
	const prvkyTok = rozeber(s.tok);
	const prvkyMotor = rozeber(s.motor);

	// plamen, šipka tahu a oba popisky akce/reakce patří k JEDNOMU jevu
	const plamen = prvkyTok.find((q) => q.tag === 'polygon' && q.a.fill === '#ffa94d');
	const sipkaTahu = prvkyTok.find((q) => q.tag === 'line' && q.a.stroke === '#2f9e44');
	const maAkci = s.tok.includes('akce — plyny dozadu');
	const maReakci = s.tok.includes('reakce — tah dopředu');
	ok(Boolean(plamen) === bezi && Boolean(sipkaTahu) === bezi && maAkci === bezi && maReakci === bezi,
		`${popis}: plamen, šipka tahu i popisky akce/reakce jsou ve scéně právě tehdy, když motor ${bezi ? 'jede' : 'nejede'}`);

	// komora: hoří = oranžová a štítek „teplo", nehoří = šedá a „nehoří"
	const komora = prvkyMotor.find((q) => q.tag === 'rect' && q.a.width === '90' && q.a.height === '62');
	const stitekKomory = prvkyMotor.find((q) => q.tag === 'text' && (q.text === 'teplo' || q.text === 'nehoří'));
	ok(komora.a.fill === (bezi ? '#ff922b' : '#dee2e6'),
		`${popis}: spalovací komora je ${bezi ? 'oranžová (hoří)' : 'šedá (nehoří)'} — ${komora.a.fill}`);
	ok(stitekKomory.text === (bezi ? 'teplo' : 'nehoří'),
		`${popis}: a štítek v ní říká „${stitekKomory.text}"`);
	ok(s.motor.includes('horké plyny') === bezi,
		`${popis}: popisek „horké plyny" uvnitř trupu je jen tehdy, když opravdu nějaké vznikají`);

	// plaketa: slovo i barva rámečku
	const plaketa = rozeber(s.verdikt);
	const ramecek = plaketa.find((q) => q.tag === 'rect');
	ok(s.verdikt.includes(bezi ? '>MOTOR JEDE<' : '>MOTOR NEJEDE<'),
		`${popis}: plaketa hlásí ${bezi ? 'MOTOR JEDE' : 'MOTOR NEJEDE'}`);
	ok(ramecek.a.stroke === (bezi ? '#2f9e44' : '#c92a2a'),
		`${popis}: a má k tomu ${bezi ? 'zelený' : 'červený'} rámeček (${ramecek.a.stroke})`);
	ok(s.verdikt.includes(veta(t, p, r)), `${popis}: plaketa vysvětluje proč — „${veta(t, p, r).slice(0, 48)}…"`);

	// věta pod scénou nesmí slibovat energii, která nikam nejde
	ok(s.tokText.includes(bezi ? 'teplo' : 'nehoří') && s.tokText.includes('žádný tah') === !bezi,
		`${popis}: věta o cestě energie mluví o ${bezi ? 'teple a tahu' : 'tom, že palivo nehoří a tah nevznikne'}`);
	ok(s.stavText.includes(bezi ? ': JEDE.' : ': NEJEDE.') && s.stavText.includes(veta(t, p, r)),
		`${popis}: hláška pod scénou sedí s plaketou`);

	// tabulka: tři řádky, zelených políček přesně tolik, kolik hlásí nadpis
	const zelene = (s.tabulka.match(/>jede<\/text>/g) ?? []).length;
	const cervene = (s.tabulka.match(/>nejede<\/text>/g) ?? []).length;
	const n = pocet(p, r);
	ok(zelene === n && cervene === 3 - n, `${popis}: v tabulce ${zelene}× „jede" a ${cervene}× „nejede"`);
	ok(s.pocetText === `Kyslík se do spalovací komory dostane u ${n} ze 3 motorů:`,
		`${popis}: nadpis tabulky „${s.pocetText}" sedí s počtem zelených políček`);
	ok(s.stavText.includes(`Kyslík se do spalovací komory dostane u ${n} ze 3 motorů.`),
		`${popis}: a totéž číslo je i v hlášce pod scénou`);
	for (const jiny of TYPY) {
		ok(s.tabulka.includes(duvod(jiny, p, r)), `${popis}: řádek „${jiny}" nese svůj důvod „${duvod(jiny, p, r)}"`);
	}
	// barva políčka musí sedět s jeho nápisem — zelené „nejede" by dítě zmátlo
	{
		const tb = rozeber(s.tabulka);
		const policka = tb.filter((q) => q.tag === 'rect' && q.a.width === '104');
		let sedi = policka.length === 3;
		for (const pol of policka) {
			const napis = tb.find((q) => q.tag === 'text' && q.poradi > pol.poradi);
			const maJet = napis.text === 'jede';
			if (pol.a.fill !== (maJet ? '#d3f9d8' : '#ffe3e3') || pol.a.stroke !== (maJet ? '#2f9e44' : '#c92a2a')) sedi = false;
		}
		ok(sedi, `${popis}: všechna tři políčka mají barvu podle svého nápisu (zelené jen u „jede")`);
	}
	// zvýrazněný je právě jeden řádek — ten vybraný
	const zvyraznene = rozeber(s.tabulka).filter((q) => q.a.fill === '#fff3bf');
	const ocekavanaY = { proudovy: 389, raketovy: 427, naporovy: 465 }[t];
	ok(zvyraznene.length === 1 && zvyraznene[0].a.y === String(ocekavanaY),
		`${popis}: v tabulce svítí právě jeden řádek a je to ten vybraný (y=${zvyraznene[0]?.a.y})`);
}

console.log('\n— 4. kresba nelže o tom, které díly motor má —');
for (const [t, p, r] of VSECHNY) {
	const s = stav(t, p, r);
	const m = rozeber(s.motor);
	const sani = m.find((q) => q.tag === 'polygon' && q.a.points === '108,160 148,148 148,248 108,236');
	ok(Boolean(sani) === (t !== 'raketovy'), `${t}: sání ${t === 'raketovy' ? 'NENÍ nakreslené (raketa vzduch nenasává)' : 'je nakreslené'}`);
	// díly kompresoru a turbíny (široké 46 a 44 px) — komora (90 px) mezi ně nepatří
	const plneDily = m.filter((q) => q.tag === 'rect' && q.a.height === '62' && q.a.width !== '90' && !q.a['stroke-dasharray']);
	const chybejici = m.filter((q) => q.tag === 'rect' && q.a['stroke-dasharray']);
	const nemaPopisky = m.filter((q) => q.tag === 'text' && q.text === 'nemá').length;
	if (t === 'proudovy') {
		ok(plneDily.length === 2 && chybejici.length === 0, 'proudový: kompresor i turbína jsou plné díly, nic nechybí');
		ok(m.filter((q) => q.tag === 'line' && q.a.stroke === '#868e96').length === 6, 'proudový: oba díly mají lopatky (6 čar)');
		ok(s.motor.includes('>kompresor<') && s.motor.includes('>turbína<'), 'proudový: díly jsou pojmenované');
	} else if (t === 'naporovy') {
		ok(plneDily.length === 0 && chybejici.length === 2, 'náporový: kompresor i turbína jsou čárkované rámečky — motor je nemá');
		ok(nemaPopisky === 2 && m.filter((q) => q.tag === 'line' && q.a.stroke === '#c92a2a').length === 4,
			'náporový: oba prázdné rámečky jsou přeškrtnuté červeným křížkem a popsané „nemá"');
		ok(s.motor.includes('>kompresor<') && s.motor.includes('>turbína<'), 'náporový: a je napsané, co přesně chybí');
	} else {
		ok(chybejici.length === 0 && s.motor.includes('>palivo<') && s.motor.includes('>kyslík<') && s.motor.includes('>vlastní nádrže<'),
			'raketový: místo kompresoru a turbíny jsou nádrže na palivo a kyslík');
		ok(!s.motor.includes('>kompresor<') && !s.motor.includes('>turbína<'), 'raketový: žádný kompresor ani turbína ve scéně není');
	}
	// komora je pokaždé tam, kde má být (u rakety až za nádržemi)
	const komora = m.find((q) => q.tag === 'rect' && q.a.width === '90' && q.a.height === '62');
	ok(komora.a.x === (t === 'raketovy' ? '266' : '214'), `${t}: spalovací komora stojí na x=${komora.a.x}`);
	// štítek s teplem leží UVNITŘ komory a kreslí se až po ní — jinak by ho výplň zakryla
	const chip = m.find((q) => q.tag === 'rect' && q.a.width === '50' && q.a.height === '20');
	const rK = ramec(komora), rCh = ramec(chip);
	ok(rCh[0] > rK[0] && rCh[2] < rK[2] && rCh[1] > rK[1] && rCh[3] < rK[3] && chip.poradi > komora.poradi,
		`${t}: štítek „teplo/nehoří" je celý uvnitř komory a kreslí se AŽ PO ní (je tedy vidět)`);
	// tryska je vždy, plamen jí nesmí zasahovat do trupu
	ok(s.motor.includes('458,170 512,150 512,246 458,226'), `${t}: tryska je nakreslená na ústí trupu`);
	const plamen = rozeber(s.tok).find((q) => q.tag === 'polygon' && q.a.fill === '#ffa94d');
	if (plamen) ok(ramec(plamen)[0] >= 512, `${t}/${p}/${r}: plamen začíná až za ústím trysky (x=${ramec(plamen)[0]}), nepřekrývá motor`);
}

console.log('\n— 5. odkud se bere vzduch: šipka, křížek a popisek sedí se stavem —');
for (const [t, p, r] of VSECHNY) {
	const s = stav(t, p, r);
	const q = rozeber(s.tok);
	const bezi = OCEKAVANO[`${t}|${p}|${r}`];
	const maSani = t !== 'raketovy';
	const modraSipka = q.find((e) => e.tag === 'line' && e.a.stroke === '#1971c2');
	const krizek = q.filter((e) => e.tag === 'line' && e.a.stroke === '#c92a2a').length;
	ok(Boolean(modraSipka) === (maSani && bezi),
		`${t}/${p}/${r}: modrá šipka vzduchu do motoru ${maSani && bezi ? 'je' : 'není'}`);
	ok(krizek === (maSani && !bezi ? 2 : 0),
		`${t}/${p}/${r}: červený křížek před sáním ${maSani && !bezi ? 'je' : 'není'}`);
	const cekanyPopis = !maSani ? 'nepotřebuje okolní vzduch'
		: bezi ? (t === 'naporovy' ? 'vzduch nacpe rychlost letu' : 'vzduch nasaje a stlačí')
		: (p === 'vzduch' ? 'vzduch se dovnitř nenacpe' : 'vakuum — není co nasát');
	ok(s.tok.includes(`>${cekanyPopis}<`), `${t}/${p}/${r}: popisek u sání říká „${cekanyPopis}"`);
	// palivo přitéká zvenčí jen do motoru se sáním; u rakety je v nádrži
	ok(s.tok.includes('>palivo<') === maSani, `${t}: šipka paliva zvenčí ${maSani ? 'je' : 'není (raketa ho veze v nádrži)'}`);
	// poznámka pod motorem pojmenuje, čím se tenhle motor liší
	const poznamka = { proudovy: 'turbína pohání kompresor', raketovy: 'okysličovadlo z vlastní nádrže', naporovy: 'žádné pohyblivé části' }[t];
	ok(s.tok.includes(`>${poznamka}<`), `${t}: pod motorem je napsané „${poznamka}"`);
}

console.log('\n— 6. prostředí: pozadí, částice a popisek —');
for (const p of PROSTREDI) {
	const s = stav('proudovy', p, 'bezna');
	const c = rozeber(s.castice);
	if (p === 'vzduch') {
		ok(s.obloha === '#d0ebff' && c.filter((e) => e.tag === 'circle').length === 7,
			'v atmosféře je modré pozadí a 7 modrých částic vzduchu');
		ok(s.prostrediPopis.includes('prostředí: hustý vzduch') && s.prostrediPopis.includes('modré tečky = částice vzduchu'),
			'a popisek vysvětluje, co ty tečky jsou');
	} else {
		ok(s.obloha === '#212529' && c.filter((e) => e.tag === 'circle').length === 0 && c.filter((e) => e.tag === 'line').length === 14,
			've vakuu je tmavé pozadí, ani jedna částice vzduchu — jen hvězdičky');
		ok(s.prostrediPopis.includes('prostředí: vakuum (vesmír)') && s.prostrediPopis.includes('bílé křížky = hvězdy, ne vzduch'),
			'a popisek pojmenuje přesně to, co je nakreslené: bílé křížky = hvězdy, ne částice vzduchu');
	}
}

console.log('\n— 7. co má být vidět, to nic nepřekrývá —');
{
	// Bílé podklady popisků (rámečky z `stitek`) se nesmí potkat ani mezi sebou,
	// ani s trupem, sáním, tryskou, plamenem a stálými rámečky scény.
	const STALE = {
		'nadpis scény': [11, 5, 649, 37],
		'popisek prostředí': [11, 43, 227, 85],
		'plaketa verdiktu': [10, 310, 650, 358],
	};
	let stretu = 0, prvni = '';
	for (const [t, p, r] of VSECHNY) {
		const s = stav(t, p, r);
		const tok = rozeber(s.tok);
		const motor = rozeber(s.motor);
		const stitky = tok.filter((q) => q.tag === 'rect' && q.a.height === '24' && q.a.rx === '6').map((q) => ({ r: ramec(q), n: tok[q.poradi + 1]?.text ?? '?' }));
		const kresba = [
			['trup motoru', motor.find((q) => q.tag === 'rect' && q.a.width === '310')],
			['tryska', motor.find((q) => q.tag === 'polygon' && q.a.points.startsWith('458,170'))],
			['sání', motor.find((q) => q.tag === 'polygon' && q.a.points.startsWith('108,160'))],
			['plamen', tok.find((q) => q.tag === 'polygon' && q.a.fill === '#ffa94d')],
			['šipka tahu', tok.find((q) => q.tag === 'line' && q.a.stroke === '#2f9e44')],
		].filter(([, q]) => q).map(([n, q]) => ({ n, r: ramec(q) }));
		for (let i = 0; i < stitky.length; i++) {
			for (let j = i + 1; j < stitky.length; j++) {
				if (prekryv(stitky[i].r, stitky[j].r)) { stretu++; prvni ||= `${t}/${p}/${r}: popisek „${stitky[i].n}" leží na „${stitky[j].n}"`; }
			}
			for (const k of kresba) {
				if (prekryv(stitky[i].r, k.r)) { stretu++; prvni ||= `${t}/${p}/${r}: popisek „${stitky[i].n}" zakrývá ${k.n}`; }
			}
			for (const c of rozeber(s.castice)) {
				if (prekryv(stitky[i].r, ramec(c))) { stretu++; prvni ||= `${t}/${p}/${r}: popisek „${stitky[i].n}" zakrývá částici prostředí`; }
			}
		}
	}
	ok(stretu === 0, `ve všech 12 polohách se popisky nepřekrývají s kresbou ani mezi sebou (${stretu} střetů${prvni ? ' — ' + prvni : ''})`);

	// Stálé rámečky scény se nesmí potkat se štítky ani se šipkou tahu.
	let stretuS = 0, prvniS = '';
	for (const [t, p, r] of VSECHNY) {
		const s = stav(t, p, r);
		const tok = rozeber(s.tok);
		const pohyblive = tok.filter((q) => (q.tag === 'rect' && q.a.height === '24') || (q.tag === 'line' && q.a.stroke === '#2f9e44'));
		for (const q of pohyblive) for (const [jmeno, ram] of Object.entries(STALE)) {
			if (prekryv(ramec(q), ram)) { stretuS++; prvniS ||= `${t}/${p}/${r}: ${q.tag} zasahuje do „${jmeno}"`; }
		}
	}
	ok(stretuS === 0, `a nezasahují ani do nadpisu, popisku prostředí a plakety (${stretuS} střetů${prvniS ? ' — ' + prvniS : ''})`);
}

console.log('\n— 8. nic nepřetéká scénu 660 × 510 —');
{
	ok(zdroj.includes('viewBox="0 0 660 510"'), 'scéna má plátno 660 × 510');
	let mimo = 0, kde = '';
	for (const [t, p, r] of VSECHNY) {
		for (const q of stav(t, p, r).vse) {
			const ram = ramec(q);
			if (!ram) continue;
			if (ram[0] < 4 || ram[1] < 4 || ram[2] > 656 || ram[3] > 506) {
				mimo++;
				kde ||= `${t}/${p}/${r}: <${q.tag}> „${q.text}" na [${ram.map((v) => Math.round(v)).join(', ')}]`;
			}
		}
	}
	ok(mimo === 0, `žádný prvek (ani odhadem šířky textu) nevybočí z plátna ani se nedotkne okraje (${mimo}${kde ? ' — ' + kde : ''})`);
	// texty plakety se musí vejít do svého rámečku, jinak by přetekly přes obrys
	let siroke = 0, kterY = '';
	for (const [t, p, r] of VSECHNY) {
		for (const q of rozeber(stav(t, p, r).verdikt).filter((e) => e.tag === 'text')) {
			const w = sirkaTextu(q.text, Number(q.a['font-size']));
			if (Number(q.a.x) + w > 640) { siroke++; kterY ||= `${t}/${p}/${r}: „${q.text.slice(0, 40)}…" (${Math.round(w)} px)`; }
		}
	}
	ok(siroke === 0, `věty v plaketě se vejdou do jejího rámečku (${siroke}${kterY ? ' — ' + kterY : ''})`);
	// důvod v tabulce nesmí naběhnout na políčko jede/nejede ani přetéct
	let tesne = 0;
	for (const [t, p, r] of VSECHNY) {
		for (const q of rozeber(stav(t, p, r).tabulka).filter((e) => e.tag === 'text' && e.a.x === '372')) {
			if (Number(q.a.x) + sirkaTextu(q.text, 11) > 654) tesne++;
		}
	}
	ok(tesne === 0, `a důvody v tabulce se vejdou mezi políčko a pravý okraj (${tesne} přetečení)`);
}

console.log('\n— 9. neměnnost: co se scénou hýbat NEMÁ, tím nehýbe —');
{
	for (const t of ['proudovy', 'raketovy']) {
		for (const p of PROSTREDI) {
			const a = stav(t, p, 'bezna'), b = stav(t, p, 'vysoka');
			ok(a.motor === b.motor && a.tok === b.tok && a.verdikt === b.verdikt,
				`${t} v prostředí „${p}": rychlost letu s jeho scénou vůbec nehne — rozhoduje jen kyslík`);
		}
	}
	{
		// v tabulce se ale řádek náporového motoru změnit MUSÍ i tehdy, když je
		// vybraný jiný motor — jinak by tabulka tvrdila něco jiného než scéna
		const a = stav('proudovy', 'vzduch', 'bezna'), b = stav('proudovy', 'vzduch', 'vysoka');
		ok(a.tabulka !== b.tabulka && a.pocetText !== b.pocetText,
			'zato tabulka pod scénou na rychlost letu reaguje vždy — mění se řádek náporového motoru i počet');
	}
	const pomalu = stav('naporovy', 'vzduch', 'bezna'), rychle = stav('naporovy', 'vzduch', 'vysoka');
	ok(pomalu.motor !== rychle.motor && pomalu.verdikt !== rychle.verdikt,
		'náporový ve vzduchu naopak MUSÍ vypadat jinak pomalu a jinak při vysoké rychlosti');
	const ve = stav('raketovy', 'vzduch', 'bezna'), va = stav('raketovy', 'vakuum', 'bezna');
	ok(ve.motor === va.motor && ve.tok === va.tok,
		'raketový motor kreslí ve vzduchu i ve vakuu úplně stejně — vakuum mu nevadí');
	ok(ve.verdikt.includes('>MOTOR JEDE<') && va.verdikt.includes('>MOTOR JEDE<') && ve.verdikt !== va.verdikt,
		'obakrát hlásí MOTOR JEDE, ale vysvětluje to k tomu prostředí, které je zrovna vybrané');
	ok(ve.obloha !== va.obloha && ve.castice !== va.castice, 'mění se u něj jen pozadí a částice prostředí');
	const prV = stav('proudovy', 'vzduch', 'bezna'), prVak = stav('proudovy', 'vakuum', 'bezna');
	ok(prV.tok !== prVak.tok && prV.verdikt !== prVak.verdikt, 'proudovému motoru vakuum naopak scénu změní');
}

console.log('\n— 10. název scény a svítící tlačítka —');
for (const [t, p, r] of VSECHNY) {
	const s = stav(t, p, r);
	const cekany = { proudovy: 'Proudový (reaktivní) motor', raketovy: 'Raketový motor', naporovy: 'Náporový motor (ramjet)' }[t];
	ok(s.nazev === cekany, `${t}: scéna je nadepsaná „${s.nazev}"`);
	const svitiTyp = TYPY.filter((x) => prvky.get(`am-typ-${x}`).aktivni);
	const svitiProstredi = PROSTREDI.filter((x) => prvky.get(`am-prostredi-${x}`).aktivni);
	const svitiRychlost = RYCHLOSTI.filter((x) => prvky.get(`am-rychlost-${x}`).aktivni);
	ok(svitiTyp.length === 1 && svitiTyp[0] === t && svitiProstredi.length === 1 && svitiProstredi[0] === p
		&& svitiRychlost.length === 1 && svitiRychlost[0] === r,
		`${t}/${p}/${r}: v každé řadě svítí právě jedno tlačítko a je to to stisknuté`);
}

console.log('\n— 11. výchozí stav, se kterým se stránka otevře —');
{
	// Po všech klikáních výš se vrátíme na výchozí kombinaci a ověříme ji.
	const s = stav('proudovy', 'vzduch', 'bezna');
	ok(s.nazev === 'Proudový (reaktivní) motor' && s.verdikt.includes('>MOTOR JEDE<'),
		'scéna se otevírá u proudového motoru v atmosféře — a ten jede');
	ok(s.pocetText === 'Kyslík se do spalovací komory dostane u 2 ze 3 motorů:', `a tabulka hlásí „${s.pocetText}"`);
	ok(veta('proudovy', 'vzduch', 'bezna').includes('kompresor ho stlačí') && duvod('naporovy', 'vzduch', 'bezna').includes('nenacpe'),
		'vysvětlení drží slovník výkladu (kompresor stlačí × vzduch se nenacpe)');
}

console.log('\n— 12. popisky jsou vystředěné a čitelné —');
{
	let mimoStred = 0, kdo = '';
	const stredem = (box, txt, popis, uvnitr) => {
		if (!box || !txt) { mimoStred++; kdo ||= `${popis}: chybí rámeček nebo jeho popisek`; return; }
		const rb = ramec(box), rt = ramec(txt);
		const sb = (rb[0] + rb[2]) / 2, st = (rt[0] + rt[2]) / 2;
		if (Math.abs(sb - st) > 2) { mimoStred++; kdo ||= `${popis}: střed rámečku ${Math.round(sb)} ≠ střed textu „${txt.text}" ${Math.round(st)}`; }
		if (uvnitr && (rt[0] < rb[0] || rt[2] > rb[2])) { mimoStred++; kdo ||= `${popis}: text „${txt.text}" nevleze do svého rámečku`; }
	};
	for (const [t, p, r] of VSECHNY) {
		const s = stav(t, p, r);
		const m = rozeber(s.motor);
		stredem(m.find((q) => q.tag === 'rect' && q.a.width === '90' && q.a.height === '62'),
			m.find((q) => q.tag === 'text' && q.text === 'spalovací komora'), `${t}/${p}/${r} komora`, false);
		stredem(m.find((q) => q.tag === 'rect' && q.a.width === '50' && q.a.height === '20'),
			m.find((q) => q.tag === 'text' && (q.text === 'teplo' || q.text === 'nehoří')), `${t}/${p}/${r} štítek v komoře`, true);
		for (const [sirka, jmeno, poradi] of [['46', 'kompresor', 0], ['44', 'turbína', 1]]) {
			const box = m.find((q) => q.tag === 'rect' && q.a.width === sirka && q.a.height === '62');
			if (!box) continue;
			stredem(box, m.find((q) => q.tag === 'text' && q.text === jmeno), `${t} ${jmeno}`, false);
			const nema = m.filter((q) => q.tag === 'text' && q.text === 'nemá')[poradi];
			if (nema) stredem(box, nema, `${t} „nemá" u dílu ${jmeno}`, true);
		}
		const tb = rozeber(s.tabulka);
		for (const pol of tb.filter((q) => q.tag === 'rect' && q.a.width === '104')) {
			stredem(pol, tb.find((q) => q.tag === 'text' && q.poradi > pol.poradi), `${t}/${p}/${r} políčko stavu`, true);
			if (pol.a.x !== '250') { mimoStred++; kdo ||= `${t}: políčko stavu uteklo ze svého sloupce (x=${pol.a.x})`; }
		}
	}
	ok(mimoStred === 0, `popisky sedí vystředěné ve svých rámečcích a políčka stojí ve sloupci (${mimoStred} odchylek${kdo ? ' — ' + kdo : ''})`);

	// Nejmenší písmo: pod 10 px je na šířce telefonu (360 px) asi 5 px — nečitelné.
	let drobne = 0, nejmensi = 99;
	for (const [t, p, r] of VSECHNY) {
		for (const q of stav(t, p, r).vse.filter((e) => e.tag === 'text')) {
			const fs = Number(q.a['font-size']);
			nejmensi = Math.min(nejmensi, fs);
			if (fs < 10) drobne++;
		}
	}
	ok(drobne === 0 && nejmensi >= 10, `žádný text ve scéně není menší než 10 px (nejmenší je ${nejmensi} px)`);

	// Lopatky: tři svislé čárky uvnitř svého dílu, rozestoupené po celé šířce.
	{
		const m = rozeber(stav('proudovy', 'vzduch', 'bezna').motor);
		const l = m.filter((q) => q.tag === 'line' && q.a.stroke === '#868e96');
		let sedi = l.length === 6, proc = l.length === 6 ? '' : `lopatek je ${l.length}, ne 6`;
		for (const [x, w] of [[158, 46], [314, 44]]) {
			const uvnitr = l.filter((q) => Number(q.a.x1) > x && Number(q.a.x1) < x + w);
			if (uvnitr.length !== 3) { sedi = false; proc ||= `v dílu na x=${x} je ${uvnitr.length} lopatek místo 3`; }
			for (const q of uvnitr) if (q.a.x1 !== q.a.x2) { sedi = false; proc ||= `lopatka na x=${q.a.x1} není svislá`; }
			const xs = uvnitr.map((q) => Number(q.a.x1)).sort((a, b) => a - b);
			for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 10) { sedi = false; proc ||= `lopatky v dílu na x=${x} jsou namačkané na sebe (${xs.join(', ')})`; }
		}
		ok(sedi, `lopatky jsou tři svislé čárky uvnitř každého dílu, rozestoupené aspoň o 10 px${proc ? ' — ' + proc : ''}`);
	}
}

console.log('\n— 13. výtrysk, šipky a cesta paliva —');
{
	// Výtrysk začíná na ústí trysky a zužuje se do hrotu až u okraje scény
	// (dřív byl svisle odstřižený 20 px před krajem a vypadal jako omyl).
	let spatne = 0, kde = '';
	for (const [t, p, r] of VSECHNY) {
		const plamen = rozeber(stav(t, p, r).tok).find((q) => q.tag === 'polygon' && q.a.fill === '#ffa94d');
		if (!plamen) continue;
		const ram = ramec(plamen);
		const xs = plamen.a.points.trim().split(/\s+/).map((d) => Number(d.split(',')[0]));
		const nejdal = Math.max(...xs);
		if (ram[0] !== 512) { spatne++; kde ||= `${t}/${p}/${r}: výtrysk nezačíná na ústí trysky (x=${ram[0]})`; }
		if (ram[2] < 640 || ram[2] > 656) { spatne++; kde ||= `${t}/${p}/${r}: výtrysk nesahá k okraji scény (končí na x=${ram[2]})`; }
		if (xs.filter((x) => x === nejdal).length !== 1) { spatne++; kde ||= `${t}/${p}/${r}: výtrysk není zakončený hrotem, ale kolmým řezem`; }
	}
	ok(spatne === 0, `výtrysk jde od ústí trysky až k okraji scény a končí hrotem (${spatne}${kde ? ' — ' + kde : ''})`);

	// Akce a reakce musí mířit PROTI SOBĚ: plyny dozadu (doprava, až za trysku),
	// tah dopředu (doleva, před motor). Otočená šipka by byla jiná fyzika.
	let sipky = 0, kdeS = '';
	for (const [t, p, r] of VSECHNY) {
		const q = rozeber(stav(t, p, r).tok);
		const reakce = q.find((e) => e.tag === 'line' && e.a.stroke === '#2f9e44');
		if (!reakce) continue;
		const reakceHrot = q.find((e) => e.tag === 'polygon' && e.a.fill === '#2f9e44');
		const akce = q.filter((e) => e.tag === 'line' && e.a.stroke === '#d9480f').pop();
		const akceHrot = q.filter((e) => e.tag === 'polygon' && e.a.fill === '#d9480f').pop();
		if (!reakceHrot || !akce || !akceHrot) { sipky++; kdeS ||= `${t}/${p}/${r}: chybí šipka akce nebo reakce`; continue; }
		if (Number(reakce.a.x2) >= Number(reakce.a.x1)) { sipky++; kdeS ||= `${t}/${p}/${r}: šipka reakce nemíří dopředu`; }
		if (ramec(reakceHrot)[0] >= Number(reakce.a.x2)) { sipky++; kdeS ||= `${t}/${p}/${r}: hrot reakce není na předním konci šipky`; }
		if (Number(akce.a.x2) <= Number(akce.a.x1)) { sipky++; kdeS ||= `${t}/${p}/${r}: šipka akce nemíří dozadu`; }
		if (ramec(akceHrot)[2] <= Number(akce.a.x2)) { sipky++; kdeS ||= `${t}/${p}/${r}: hrot akce není na zadním konci šipky`; }
		if (Number(akce.a.x1) < 512) { sipky++; kdeS ||= `${t}/${p}/${r}: šipka akce začíná ještě uvnitř motoru`; }
	}
	ok(sipky === 0, `akce míří dozadu a reakce dopředu, hroty jsou na správných koncích (${sipky}${kdeS ? ' — ' + kdeS : ''})`);

	// Raketa si palivo i okysličovadlo veze — ale MUSÍ být vidět, kudy jdou
	// z nádrží do spalovací komory (dřív tam byla jen desetipixelová šipka).
	let cesty = 0, kdeC = '';
	for (const [p, r] of [['vzduch', 'bezna'], ['vakuum', 'vysoka']]) {
		const m = rozeber(stav('raketovy', p, r).motor);
		for (const [barva, jmeno] of [['#e8590c', 'paliva'], ['#1971c2', 'okysličovadla']]) {
			const cesta = m.find((q) => q.tag === 'line' && q.a.stroke === barva);
			const hrot = m.find((q) => q.tag === 'polygon' && q.a.fill === barva);
			if (!cesta || !hrot) { cesty++; kdeC ||= `raketa/${p}: chybí cesta ${jmeno} z nádrže do komory`; continue; }
			const delka = Math.abs(Number(cesta.a.x2) - Number(cesta.a.x1)) + (ramec(hrot)[2] - ramec(hrot)[0]);
			if (delka < 30) { cesty++; kdeC ||= `raketa/${p}: cesta ${jmeno} je dlouhá jen ${delka} px, není ji vidět`; }
			if (ramec(hrot)[2] !== 266) { cesty++; kdeC ||= `raketa/${p}: cesta ${jmeno} nekončí na stěně komory (x=${ramec(hrot)[2]})`; }
			if (Number(cesta.a.x1) >= Number(cesta.a.x2)) { cesty++; kdeC ||= `raketa/${p}: cesta ${jmeno} vede od komory, ne do ní`; }
		}
	}
	ok(cesty === 0, `raketa má nakreslenou cestu paliva i okysličovadla z nádrží do komory (${cesty}${kdeC ? ' — ' + kdeC : ''})`);
}

console.log('\n— 14. scéna netvrdí nic, co ve výkladu není —');
{
	// Verdikt mluví o PRÁVĚ VYBRANÉM prostředí. Dřív raketa i v atmosféře
	// hlásila „proto jede i ve vakuu", takže popisovala jiný stav než obrázek.
	let spatne = 0, kde = '';
	for (const [t, p, r] of VSECHNY) {
		const v = veta(t, p, r);
		if (/vakuu/.test(v) !== (p === 'vakuum')) { spatne++; kde ||= `${t}/${p}/${r}: „${v}"`; }
		if (p === 'vzduch' && !/vzduch|atmosf/.test(v)) { spatne++; kde ||= `${t}/${p}/${r}: v atmosféře nemluví o vzduchu — „${v}"`; }
	}
	ok(spatne === 0, `verdikt v každé z 12 poloh vysvětluje právě vybrané prostředí, ne to druhé (${spatne}${kde ? ' — ' + kde : ''})`);

	// O rychlostní hranici proudového motoru výklad nic neříká — a tak o ní
	// nesmí nic tvrdit ani scéna. O rychlosti se mluví výhradně u náporového.
	let rychle = 0, kdeR = '';
	for (const [t, p, r] of VSECHNY) {
		if (t === 'naporovy') continue;
		const s = stav(t, p, r);
		for (const text of [s.stavText, s.pocetText, s.verdikt]) {
			if (/rychlost/.test(text)) { rychle++; kdeR ||= `${t}/${p}/${r}: „${text.slice(0, 60)}…"`; }
		}
	}
	ok(rychle === 0, `u proudového ani raketového motoru scéna o rychlosti letu nic netvrdí (${rychle}${kdeR ? ' — ' + kdeR : ''})`);
	ok(zdroj.includes('nápor rozhoduje jen u náporového motoru'),
		'a u přepínače rychlosti stojí, že nápor rozhoduje jen u náporového motoru');
	ok(zdroj.includes('Kyslík se do spalovací komory dostane u ${n} ze 3 motorů'),
		'nadpis tabulky počítá motory, kterým se do komory dostane kyslík — ne motory, o jejichž rychlostním stropu výklad mlčí');
}

console.log(chyby === 0 ? '\n✅ Alternativní motory: vše sedí.' : `\n❌ Alternativní motory: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);

#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/alternativni-motory.mjs
// (zkušebna reaktivních motorů — proudový, raketový, náporový).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy nepravda, kterou by dítě z obrázku nebo z tabulky
//         vyčetlo — musí test SHODIT.
// Spuštění:  node testy/podvrhy/alternativni-motory-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/AlternativniMotorySimulace.astro');
const TEST = join(REPO, 'testy/simulace/alternativni-motory.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'altmotory-podvrh-'));
const KOPIE = join(WORKDIR, 'AlternativniMotorySimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// ── (a) fyzika: kdo kdy jede ───────────────────────────────────────────
	['raketa prý taky potřebuje vzduch z okolí (a ve vakuu by nejela)',
		(s) => s.replace("raketovy: { nazev: 'Raketový motor', kratky: 'raketový', sani: false, kyslikZOkoli: false",
			"raketovy: { nazev: 'Raketový motor', kratky: 'raketový', sani: false, kyslikZOkoli: true")],
	['náporový motor prý jede i při běžné rychlosti (nepotřebuje nápor)',
		(s) => s.replace("naporovy: { nazev: 'Náporový motor (ramjet)', kratky: 'náporový', sani: true, kyslikZOkoli: true, potrebujeRychlost: true",
			"naporovy: { nazev: 'Náporový motor (ramjet)', kratky: 'náporový', sani: true, kyslikZOkoli: true, potrebujeRychlost: false")],
	['ve vakuu jedou všechny motory — vakuum nikomu nevadí',
		(s) => s.replace("if (kde === 'vakuum') return false; // ve vakuu žádný vzduch není",
			"if (kde === 'vakuum') return true;")],
	['motor se sáním jede i bez vzduchu, když má vysokou rychlost',
		(s) => s.replace("if (s.potrebujeRychlost === true && jakRychle === 'bezna') return false;",
			"if (s.potrebujeRychlost === true && jakRychle === 'vysoka') return false;")],
	['počet jedoucích motorů začíná na jedničce, takže je vždy o jeden vyšší',
		(s) => s.replace('let n = 0;\n\t\tfor (const t of PORADI)', 'let n = 1;\n\t\tfor (const t of PORADI)')],
	['počet jedoucích motorů je napsaný natvrdo (vždy 3)',
		(s) => s.replace('for (const t of PORADI) { if (jede(t, kde, jakRychle)) n++; }\n\t\treturn n;',
			'for (const t of PORADI) { if (jede(t, kde, jakRychle)) n++; }\n\t\treturn 3;')],

	// ── (b) obrázek lže: motor „jede", i když nejede ───────────────────────
	['plamen a šipka tahu zůstanou ve scéně, i když motor nejede',
		(s) => s.replace('\t\tif (bezi) {\n\t\t\t// výtrysk', '\t\tif (true) {\n\t\t\t// výtrysk')],
	['horké plyny proudí k trysce, i když v komoře nic nehoří',
		(s) => s.replace("\t\tif (bezi) {\n\t\t\tmo += '<line x1=\"366\" y1=\"187\"", "\t\tif (true) {\n\t\t\tmo += '<line x1=\"366\" y1=\"187\"")],
	['spalovací komora je oranžová (hoří) ve všech stavech',
		(s) => s.replace("const komoraBarva = bezi ? '#ff922b' : '#dee2e6';", "const komoraBarva = '#ff922b';")],
	['štítek v komoře hlásí „teplo", i když palivo nehoří',
		(s) => s.replace("${bezi ? 'teplo' : 'nehoří'}</text>", "teplo</text>")],
	['plaketa hlásí MOTOR JEDE pokaždé',
		(s) => s.replace("${bezi ? 'MOTOR JEDE' : 'MOTOR NEJEDE'}", "MOTOR JEDE")],
	['plaketa má zelený rámeček i u stojícího motoru',
		(s) => s.replace("const barva = bezi ? '#2f9e44' : '#c92a2a';", "const barva = '#2f9e44';")],
	['plaketa vysvětluje situaci v atmosféře, i když se letí ve vakuu',
		(s) => s.replace('${veta(typ, prostredi, rychlost)}</text>`;', "${veta(typ, 'vzduch', rychlost)}</text>`;")],
	['věta pod scénou slibuje tah a teplo i tehdy, když nic nehoří',
		(s) => s.replace("document.getElementById('am-tok-popis').innerHTML = bezi\n\t\t\t?", "document.getElementById('am-tok-popis').innerHTML = true\n\t\t\t?")],
	['hláška pod scénou tvrdí JEDE vždycky',
		(s) => s.replace("${bezi ? 'JEDE' : 'NEJEDE'}. ", "JEDE. ")],

	// ── (c) tabulka pod scénou lže ─────────────────────────────────────────
	['v tabulce jsou všechna políčka zelená',
		(s) => s.replace('fill="${b ? \'#d3f9d8\' : \'#ffe3e3\'}" stroke="${b ? \'#2f9e44\' : \'#c92a2a\'}"',
			'fill="#d3f9d8" stroke="#2f9e44"')],
	['v tabulce je u každého motoru napsáno „jede"',
		(s) => s.replace(">${b ? 'jede' : 'nejede'}</text>", '>jede</text>')],
	['nadpis tabulky hlásí o jeden motor víc, než tabulka ukazuje',
		(s) => s.replace('dostane u ${n} ze 3 motorů:`;', 'dostane u ${n + 1} ze 3 motorů:`;')],
	['nadpis tabulky počítá motory jiného prostředí, než jaké je vybrané',
		(s) => s.replace('const n = pocetJedoucich(prostredi, rychlost);', "const n = pocetJedoucich('vzduch', 'vysoka');")],
	['scéna zase tvrdí, že při velmi vysoké rychlosti „jedou 3 ze 3 motorů"',
		(s) => s.replace('`Kyslík se do spalovací komory dostane u ${n} ze 3 motorů:`',
			'`Při téhle rychlosti letu jedou ${n} ze 3 motorů:`')],
	['v tabulce svítí všechny řádky kromě vybraného',
		(s) => s.replace('if (t === typ) tb +=', 'if (t !== typ) tb +=')],
	['řádky tabulky se kreslí přes sebe, takže se navzájem překrývají',
		(s) => s.replace('const KROK = 38;', 'const KROK = 10;')],
	['políčko „jede/nejede" uteče ze svého sloupce doprava na důvody',
		(s) => s.replace('const POLICKO_X = 250;', 'const POLICKO_X = 330;')],
	['každý řádek tabulky nese důvod vybraného motoru, ne svůj vlastní',
		(s) => s.replace('${kratkyDuvod(t, prostredi, rychlost)}</text>', '${kratkyDuvod(typ, prostredi, rychlost)}</text>')],

	// ── (d) kresba lže o dílech motoru ─────────────────────────────────────
	['sání se kreslí i raketě, která vzduch nenasává',
		(s) => s.replace("\t\tif (s.sani === true) {\n\t\t\tmo += '<polygon points=\"108,160", "\t\tif (true) {\n\t\t\tmo += '<polygon points=\"108,160")],
	['náporový motor má nakreslený plný kompresor i turbínu',
		(s) => s.replace("mo += chybi(158, 46, 'kompresor');", "mo += dil(158, 46, '#dee2e6', 'kompresor');")],
	['chybějící turbína náporového motoru není přeškrtnutá',
		(s) => s.replace("mo += chybi(314, 44, 'turbína');", "mo += dil(314, 44, '#dee2e6', 'turbína');")],
	['u proudového motoru se nekreslí lopatky kompresoru ani turbíny',
		(s) => s.replace('if (dx < w) l +=', 'if (dx > w) l +=')],
	['lopatky se namačkají na sebe hned na začátek dílu',
		(s) => s.replace('const ROZESTUP = 14;', 'const ROZESTUP = 1;')],
	['jméno dílu není vystředěné pod ním, ale odsazené od levého okraje',
		(s) => s.replace('\t\tconst sx = x + 0.5 * w;\n\t\treturn `<rect x="${x}" y="156" width="${w}" height="62" rx="4" fill="${barva}"',
			'\t\tconst sx = x + 4;\n\t\treturn `<rect x="${x}" y="156" width="${w}" height="62" rx="4" fill="${barva}"')],
	['slovo „nemá" je zase v 9px písmu, na telefonu nečitelné',
		(s) => s.replace('font-size="11" font-weight="bold" fill="#c92a2a">nemá</text>', 'font-size="9" font-weight="bold" fill="#c92a2a">nemá</text>')],
	['spalovací komora rakety stojí na místě kompresoru, přes nádrže',
		(s) => s.replace("const komoraX = typ === 'raketovy' ? 266 : 214;", 'const komoraX = 214;')],
	['raketa nemá nádrž na kyslík — jen na palivo',
		(s) => s.replace("+ '<text x=\"194\" y=\"209\" text-anchor=\"middle\" font-size=\"11\" fill=\"#2b2a26\">kyslík</text>'", "+ ''")],
	['raketě se vůbec nekreslí cesta paliva a okysličovadla do komory',
		(s) => s.replace("\t\t\tmo += '<line x1=\"232\" y1=\"170\"", "\t\t\tconst nic = '<line x1=\"232\" y1=\"170\"")],
	['cesta paliva se scvrkne zpátky na desetipixelovou šipku u stěny komory',
		(s) => s.replace('<line x1="232" y1="170" x2="252" y2="170" stroke="#e8590c" stroke-width="4" />',
			'<line x1="250" y1="170" x2="252" y2="170" stroke="#e8590c" stroke-width="4" />')
			.replace('<polygon points="266,170 252,163 252,177" fill="#e8590c" />',
				'<polygon points="260,170 254,163 254,177" fill="#e8590c" />')],

	// ── (e) odkud se bere vzduch ───────────────────────────────────────────
	['modrá šipka vede vzduch do motoru i ve vakuu',
		(s) => s.replace('\t\t\tif (vzduchDovnitr) {', '\t\t\tif (true) {')],
	['popisek u sání tvrdí, že náporový motor vzduch nasaje a stlačí',
		(s) => s.replace("(s.potrebujeRychlost === true ? 'vzduch nacpe rychlost letu' : 'vzduch nasaje a stlačí')",
			"'vzduch nasaje a stlačí'")],
	['popisek u sání nerozliší vakuum od pomalého letu',
		(s) => s.replace("(jeVzduch ? 'vzduch se dovnitř nenacpe' : 'vakuum — není co nasát')", "'vzduch se dovnitř nenacpe'")],
	['raketě se kreslí šipka paliva zvenčí, i když ho veze v nádrži',
		(s) => s.replace("\t\t\ttk += stitek(216, 106, 84, 'palivo', '#2b2a26')", "\t\t}\n\t\t{\n\t\t\ttk += stitek(216, 106, 84, 'palivo', '#2b2a26')")],

	// ── (f) prostředí ──────────────────────────────────────────────────────
	['ve vakuu zůstane modrá obloha',
		(s) => s.replace("jeVzduch ? '#d0ebff' : '#212529'", "'#d0ebff'")],
	['i ve vakuu se kolem motoru vznášejí částice vzduchu',
		(s) => s.replace('if (jeVzduch) c +=', 'if (true) c +=')],
	['popisek prostředí tvrdí „hustý vzduch" i ve vesmíru',
		(s) => s.replace("${jeVzduch ? 'prostředí: hustý vzduch' : 'prostředí: vakuum (vesmír)'}", 'prostředí: hustý vzduch')],
	['popisek ve vakuu slibuje „jen hvězdy", ačkoli nakreslené jsou bílé křížky',
		(s) => s.replace("'bílé křížky = hvězdy, ne vzduch'", "'žádné částice — jen hvězdy'")],
	['raketa vysvětluje stav ve vakuu i tehdy, když letí v atmosféře',
		(s) => s.replace("return kde === 'vakuum'", 'return false')],

	// ── (g) co má být vidět, není vidět ────────────────────────────────────
	['štítek „teplo" se kreslí PŘED komorou, takže ho oranžová výplň zakryje',
		(s) => s.replace('mo += `<rect x="${chipX}" y="177"', 'mo = `<rect x="${chipX}" y="177"')
			.replace("fill=\"${bezi ? '#d9480f' : '#868e96'}\">${bezi ? 'teplo' : 'nehoří'}</text>`;",
				"fill=\"${bezi ? '#d9480f' : '#868e96'}\">${bezi ? 'teplo' : 'nehoří'}</text>` + mo;")],
	['štítek „teplo" je širší než komora a vyčnívá z ní ven',
		(s) => s.replace('const CHIP_SIRKA = 50;', 'const CHIP_SIRKA = 150;')],
	['nápis v komoře je posunutý mimo svůj štítek',
		(s) => s.replace('const chipStred = chipX + 0.5 * CHIP_SIRKA;', 'const chipStred = chipX + 0.5 * KOMORA_SIRKA;')],
	['popisek o vzduchu leží přes sání a trup motoru',
		(s) => s.replace("tk += stitek(16, 258, 182, popisVzduchu, '#2b2a26');", "tk += stitek(16, 196, 182, popisVzduchu, '#2b2a26');")],
	['popisek „akce — plyny dozadu" přetéká z pravého okraje scény',
		(s) => s.replace("stitek(468, 256, 184, 'akce — plyny dozadu', '#d9480f')", "stitek(560, 256, 184, 'akce — plyny dozadu', '#d9480f')")],
	['popisek trysky leží na popisku tahu',
		(s) => s.replace("tk += stitek(452, 118, 64, 'tryska', '#2b2a26');", "tk += stitek(452, 92, 64, 'tryska', '#2b2a26');")],
	['plamen začíná uvnitř trupu motoru, ne až za ústím trysky',
		(s) => s.replace('points="512,166 600,150 652,198 600,246 512,230"', 'points="400,166 600,150 652,198 600,246 400,230"')],
	['výtrysk je zase svisle useknutý kus před okrajem scény',
		(s) => s.replace('points="512,166 600,150 652,198 600,246 512,230"', 'points="512,166 640,148 640,246 512,230"')],
	['šipka akce míří dopředu, ne dozadu — akce i reakce by ukazovaly stejně',
		(s) => s.replace('<line x1="530" y1="198" x2="612" y2="198" stroke="#d9480f" stroke-width="5" />', '<line x1="612" y1="198" x2="530" y2="198" stroke="#d9480f" stroke-width="5" />')],
	['hrot šipky reakce je na opačném konci, takže tah míří dozadu',
		(s) => s.replace('<polygon points="176,100 194,91 194,109" fill="#2f9e44" />', '<polygon points="346,100 328,91 328,109" fill="#2f9e44" />')],
	['věta v plaketě je tak dlouhá, že přeteče přes její rámeček',
		(s) => s.replace("return 'Kompresor nemá — vzduch mu dovnitř nacpe teprve velmi vysoká rychlost letu.';",
			"return 'Kompresor nemá — vzduch mu dovnitř nacpe teprve velmi vysoká rychlost letu, a to je pro tenhle motor to nejdůležitější ze všeho.';")],
	['název motoru ve scéně zůstane u proudového, i když je vybraný jiný',
		(s) => s.replace("document.getElementById('am-nazev').textContent = s.nazev;",
			"document.getElementById('am-nazev').textContent = TYPY.proudovy.nazev;")],
	['zvýrazní se nestisknutá tlačítka motoru',
		(s) => s.replace("classList.toggle('am-aktivni', t === typ)", "classList.toggle('am-aktivni', t !== typ)")],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const kontrol = (zdravy.stdout.match(/✅/g) ?? []).length;
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${kontrol} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) {
	console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n'));
	process.exit(1);
}

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const padle = (v.stdout.match(/^❌ .*/gm) ?? []);
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${padle.length} kontrol spadlo): ${nazev}\n     ↳ ${padle[0]?.slice(0, 110) ?? v.stderr.split('\n')[0]}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);

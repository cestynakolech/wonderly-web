// OBOUSMĚRNÉ OVĚŘENÍ zbylých měřidel — podvrh se musí najít, zdravý stav musí mlčet.
//
// Doplněno 2. 8. 2026 na základě dlouhodobého auditu. Do té doby mělo obousměrný důkaz
// jediné měřidlo, ačkoli pravidlo „falešný poplach je horší než žádná kontrola" platí
// v projektu od 30. 7. Vada, kterou to způsobilo, se opakovala pětkrát za jednu noc —
// naposledy u kontroly, která vznikla právě proto, aby tuhle třídu chyb hlídala.
//
// Ke každému měřidlu jsou tři druhy případů:
//   • PODVRH — vada, kterou měřidlo MUSÍ najít (jinak nehlídá nic),
//   • ZDRAVÝ STAV — data bez vady, u kterých MUSÍ mlčet (jinak zaplaví práci šumem),
//   • REGRESE — konkrétní falešný poplach nebo falešná nula z historie projektu.
//
// Spuštění: node testy/meridla-obousmerne.mjs
import { zkontrolujCislaVeVykladu } from './cisla-ve-vykladu.mjs';
import { zkontrolujNazvyBloku } from './nazvy-bloku.mjs';
import { nazornost, neznameDruhy, DRUHY_MATERIALU } from './data.mjs';
import { cistyText, jeHlucha } from './kratke-vyklady.mjs';
import { ramecek, plocha } from './mapa-popisky.mjs';
import { zkontrolujSablonu, zkontrolujSablony } from './sablony.mjs';

let chyb = 0;
let kontrol = 0;
function tvrdi(popis, podminka) {
	kontrol++;
	if (!podminka) {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
}

/** Kostra dat webu v témž tvaru, jaký vrací nactiData(). */
function data({ obsah = '', materialy = [], interakce, otazky = [] }) {
	return {
		temata: {
			'fyzika/6-rocnik': [{ slug: 'celek', nazev: 'Celek', podtemata: [{ slug: 'pod', nazev: 'Podtéma', obsah, materialy, interakce }] }],
		},
		kvizy: { 'fyzika/6-rocnik/celek/pod': otazky },
	};
}

// ==================================================== 1) cisla-ve-vykladu.mjs
{
	// PODVRH: správná odpověď obsahuje číslo, které ve výkladu není.
	const podvrh = data({
		obsah: '<p>Atmosférický tlak se mění s počasím.</p>',
		otazky: [{ text: 'Jaký je normální tlak vzduchu?', odpovedi: ['1013 hPa', 'málo', 'hodně'], vysvetleni: '' }],
	});
	const n = await zkontrolujCislaVeVykladu(podvrh);
	tvrdi('čísla: chybějící údaj ve výkladu se najde', n.length === 1 && n[0].cislo === '1013');

	// ZDRAVÝ STAV: totéž číslo ve výkladu je.
	const zdravy = data({
		obsah: '<p>Normální tlak vzduchu je 1013 hPa.</p>',
		otazky: [{ text: 'Jaký je normální tlak vzduchu?', odpovedi: ['1013 hPa', 'málo', 'hodně'], vysvetleni: '' }],
	});
	tvrdi('čísla: údaj přítomný ve výkladu se nehlásí', (await zkontrolujCislaVeVykladu(zdravy)).length === 0);

	// REGRESE (20 falešných poplachů z 34 nálezů, 1. 8.): u POČETNÍ úlohy je odpověď
	// výsledek, který si žák spočítá — ve výkladu být nemá a hlásit se nesmí.
	const pocetni = data({
		obsah: '<p>Dráhu spočítáš jako součin rychlosti a času.</p>',
		otazky: [{ text: 'Auto jede 90 km/h dvě hodiny. Jakou ujede dráhu?', odpovedi: ['180 km', '45 km', '90 km'], vysvetleni: '' }],
	});
	tvrdi('čísla: výsledek početní úlohy NENÍ nález', (await zkontrolujCislaVeVykladu(pocetni)).length === 0);

	// REGRESE: malá čísla („tři druhy čípků") by se hlásila pořád.
	const male = data({
		obsah: '<p>Oko má čípky.</p>',
		otazky: [{ text: 'Kolik druhů čípků má oko?', odpovedi: ['3', '7', '9'], vysvetleni: '' }],
	});
	tvrdi('čísla: malá čísla se nehlásí', (await zkontrolujCislaVeVykladu(male)).length === 0);
}

// ==================================================== 2) nazvy-bloku.mjs
{
	const scratch = (obsah, otazky = []) => ({
		temata: {
			'informatika/7-rocnik': [
				{ slug: 'programovani-vetveni-promenne', nazev: 'Programování', podtemata: [{ slug: 'pod', nazev: 'P', obsah, materialy: [] }] },
			],
		},
		kvizy: { 'informatika/7-rocnik/programovani-vetveni-promenne/pod': otazky },
	});

	// PODVRH: doslovný překlad anglického názvu bloku, který v české paletě není.
	const n = await zkontrolujNazvyBloku(scratch('<p>Použij blok <em>pero dolů</em> a kresli.</p>'));
	tvrdi('názvy bloků: neexistující český název se najde ve výkladu', n.length >= 1);

	// PODVRH v kvízu (ne jen ve výkladu — vada se objevila v obojím).
	const nk = await zkontrolujNazvyBloku(
		scratch('<p>Kreslíme perem.</p>', [{ text: 'Kterým blokem začneš kreslit?', odpovedi: ['pero dolů', 'smaž', 'bublina'], vysvetleni: '' }]),
	);
	tvrdi('názvy bloků: nález i v kvízu', nk.length >= 1);

	// ZDRAVÝ STAV: správné české názvy (scratch-l10n je zdroj pravdy).
	const z = await zkontrolujNazvyBloku(scratch('<p>Použij blok <em>pero zapni</em> a potom <em>smaž</em>.</p>'));
	tvrdi('názvy bloků: správné české názvy se nehlásí', z.length === 0);

	// REGRESE: mimo celky, kde se programuje ve Scratchi, se nehlídá nic
	// (jinak by „pero dolů" v hodině výtvarky bylo nálezem).
	const mimo = {
		temata: { 'fyzika/6-rocnik': [{ slug: 'celek', nazev: 'C', podtemata: [{ slug: 'p', nazev: 'P', obsah: 'Dej pero dolů na stůl.', materialy: [] }] }] },
		kvizy: {},
	};
	tvrdi('názvy bloků: mimo Scratch se nehlásí nic', (await zkontrolujNazvyBloku(mimo)).length === 0);
}

// ==================================================== 3) nazornost() — jádro nazornost.mjs
{
	// REGRESE FALEŠNÉ NULY: `nazornost.mjs` hledal `druh: 'obrazek'`, který v datech
	// není ani jednou (správně je 'infografika'), takže infografiky nikdy nepočítal
	// a hlásil mezery, které neexistovaly. Tohle je ta chyba převedená na kontrolu.
	tvrdi("názornost: 'infografika' se počítá jako obrázek", nazornost({ materialy: [{ druh: 'infografika' }] }).obrazek === true);
	tvrdi("názornost: 'obrazek' není platný druh (chyba, ne ticho)", !('obrazek' in DRUHY_MATERIALU));
	tvrdi('názornost: video se počítá', nazornost({ materialy: [{ druh: 'youtube' }] }).video === true);
	tvrdi('názornost: simulace se počítá', nazornost({ interakce: 'paka', materialy: [] }).simulace === true);
	tvrdi('názornost: pdf NEDĚLÁ stránku názornou', nazornost({ materialy: [{ druh: 'pdf' }] }).obrazek === false);
	tvrdi('názornost: prázdné podtéma nemá nic', Object.values(nazornost({ materialy: [] })).every((v) => !v));

	// PODVRH: neznámý druh materiálu musí být nález, ne ticho.
	const s = { 'fyzika/6-rocnik': [{ slug: 'c', podtemata: [{ slug: 'p', materialy: [{ druh: 'gif' }] }] }] };
	tvrdi('názornost: neznámý druh se najde', neznameDruhy(s).length === 1);
	const zdravy = { 'fyzika/6-rocnik': [{ slug: 'c', podtemata: [{ slug: 'p', materialy: [{ druh: 'infografika' }] }] }] };
	tvrdi('názornost: známý druh se nehlásí', neznameDruhy(zdravy).length === 0);
}

// ==================================================== 4) kratke-vyklady.mjs
{
	// REGRESE: HTML značky nesmí nafukovat délku — jinak by krátká stránka vypadala dlouhá.
	const znacky = `<p><strong>${'x'.repeat(50)}</strong></p>`;
	tvrdi('krátké výklady: značky se do délky nepočítají', cistyText(znacky).length === 50);

	// PODVRH: krátký výklad bez jakékoli názornosti = hluchá stránka.
	tvrdi('krátké výklady: hluchá stránka se najde', jeHlucha({ obsah: '<p>Krátce.</p>', materialy: [] }, 1200) === true);

	// ZDRAVÝ STAV (dvakrát, protože stránka může být v pořádku ze dvou různých důvodů):
	tvrdi('krátké výklady: dlouhý výklad není hluchý', jeHlucha({ obsah: `<p>${'a'.repeat(1300)}</p>`, materialy: [] }, 1200) === false);
	tvrdi('krátké výklady: krátký výklad se simulací není hluchý', jeHlucha({ obsah: '<p>Krátce.</p>', materialy: [], interakce: 'paka' }, 1200) === false);
	tvrdi('krátké výklady: krátký výklad s infografikou není hluchý', jeHlucha({ obsah: '<p>Krátce.</p>', materialy: [{ druh: 'infografika' }] }, 1200) === false);
}

// ==================================================== 5) mapa-popisky.mjs
{
	// Geometrie překryvu je jádro měřidla map. Podvrh: dva popisky na sobě.
	// Popisek má kromě polohy i velikost písma `fs` a kotvu — bez nich se šířka
	// rámečku nespočítá vůbec (a měřidlo by pak „nenašlo" ani popisky přes sebe).
	const a = { x: 100, y: 100, text: 'Praha', fs: 10, kotva: 'start' };
	const b = { x: 104, y: 101, text: 'Brno', fs: 10, kotva: 'start' };
	const daleko = { x: 400, y: 300, text: 'Cheb', fs: 10, kotva: 'start' };
	tvrdi('mapy: dva popisky na sobě se překrývají', plocha(ramecek(a), ramecek(b)) > 0);
	tvrdi('mapy: vzdálené popisky se nepřekrývají', plocha(ramecek(a), ramecek(daleko)) === 0);
	// REGRESE: rámeček musí růst s délkou textu, jinak by dlouhé jméno „nikdy nepřeteklo".
	const kratky = ramecek({ x: 0, y: 0, text: 'Rye', fs: 10, kotva: 'start' });
	const dlouhy = ramecek({ x: 0, y: 0, text: 'Vaulnaveys-le-Haut', fs: 10, kotva: 'start' });
	tvrdi('mapy: delší jméno má širší rámeček', dlouhy[2] - dlouhy[0] > kratky[2] - kratky[0]);
}

// ——————————————————————— sablony.mjs: sahá skript na prvek, který v šabloně není?
{
	const kus = (html, kod) => `---\n---\n${html}\n<script>\n${kod}\n</script>\n`;
	const najde = (html, kod) => zkontrolujSablonu('T', kus(html, kod)).nalezy;

	// PODVRH: prvek, na který skript sahá, v šabloně chybí → v prohlížeči simulace mlčky nefunguje.
	tvrdi('šablony: chybějící prvek se najde', najde('<div id="a"></div>', "document.getElementById('b');").length > 0);
	// ZDRAVÝ STAV
	tvrdi('šablony: existující prvek nehlásí nic', najde('<div id="b"></div>', "document.getElementById('b');").length === 0);
	// PODVRH 2: ovládání, kterému neodpovídá ani jeden prvek
	tvrdi('šablony: prázdný výběr se najde', najde('<p>nic</p>', "document.querySelectorAll('.tl');").length > 0);

	// REGRESE — ČTYŘI ZPŮSOBY ZÁPISU, KTERÉ BYLY PRO PŮVODNÍ (REGEXOVOU) VERZI NEVIDITELNÉ.
	// Kontrolor na nich doložil, že 270 z 945 vyhledání nebylo měřeno vůbec a u čtyř
	// komponent šlo smazat CELOU scénu, aniž brána cekla. Proto se dnes skript SPOUŠTÍ.
	tvrdi('šablony: zkratka $(id) je vidět', najde('<div id="a"></div>', "const $ = (i) => document.getElementById(i); $('chybi');").length > 0);
	tvrdi('šablony: querySelector(#id) je vidět', najde('<div id="a"></div>', "document.querySelector('#chybi');").length > 0);
	tvrdi('šablony: backticky jsou vidět', najde('<div id="a"></div>', 'document.getElementById(`chybi`);').length > 0);
	tvrdi('šablony: složený selektor je vidět', najde('<div id="a"></div>', "document.querySelectorAll('#chybi .tl');").length > 0);
	// `<script is:inline>` původní rozdělovač neuměl, takže se místo kódu měřil obsah <style>.
	{
		const sInline = `---\n---\n<div id="a"></div>\n<script is:inline>\ndocument.getElementById('chybi');\n</script>\n`;
		tvrdi('šablony: <script is:inline> se opravdu měří', zkontrolujSablonu('T', sInline).nalezy.length > 0);
	}

	// REGRESE — TŘI SKUTEČNÉ FALEŠNÉ POPLACHY z historie: prvky, které si kód vyrábí sám
	// za běhu, v šabloně nejsou a přesto jsou v pořádku (Binarni, Prace, Teziste).
	tvrdi('šablony: prvek vyrobený přes className NENÍ nález',
		najde('<div id="x"></div>', "const b = document.createElement('div'); b.className = 'bin-zarovka'; document.querySelectorAll('.bin-zarovka');").length === 0);
	tvrdi('šablony: prvek z innerHTML NENÍ nález',
		najde('<div id="x"></div>', "document.getElementById('x').innerHTML = `<circle class=\"tez-bod\"/>`; document.querySelectorAll('.tez-bod');").length === 0);
	tvrdi('šablony: classList.add NENÍ nález',
		najde('<div id="x"></div>', "const t = document.createElement('b'); t.classList.add('prc-vyber'); document.querySelectorAll('.prc-vyber');").length === 0);
	tvrdi('šablony: id v jednoduchých uvozovkách NENÍ nález', najde("<div id='b'></div>", "document.getElementById('b');").length === 0);

	// FALEŠNÁ NULA: skript, který nedoběhne, nesmí vypadat jako zdravý stav.
	tvrdi('šablony: nedoběhlý skript je nález', najde('<div id="a"></div>', "throw new Error('bum');").some((n) => n.druh === 'skript nedoběhl'));
	// …a naopak chybějící prohlížečové API skript shodit NESMÍ (jinak by to hlásilo vadu,
	// která žádnou vadou není — canvas, performance a spol.).
	tvrdi('šablony: canvas a performance skript neshodí',
		najde('<canvas id="p"></canvas>', "const c = document.getElementById('p').getContext('2d'); c.fillRect(0,0,1,1); performance.now();").length === 0);

	// POČÍTADLO VSTUPŮ: 0 nálezů z nula měření je falešná nula.
	tvrdi('šablony: měří se všechny komponenty webu', zkontrolujSablony().souboru >= 70);
	tvrdi('šablony: a opravdu se v nich něco hledá', zkontrolujSablony().dotazu > 900);
}

console.log(chyb === 0 ? `✅ Měřidla obousměrně ověřena, ${kontrol} kontrol.` : `❌ ${chyb} z ${kontrol} kontrol selhalo.`);
process.exit(chyb === 0 ? 0 : 1);

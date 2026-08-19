// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
//
// Proč zvlášť: audit 2. 8. 2026 doložil, že za dvě noci pětkrát nasazené měřidlo tiše
// ukazovalo číslo, které nic neměřilo („falešná nula popáté"). Pravidlo „ověř obousměrně"
// existovalo, ale bylo jen text — tenhle soubor z něj dělá spustitelný důkaz.
//
// Součástí jsou i REGRESNÍ případy: konkrétní falešné poplachy, které první verze
// měřidla opravdu vyrobila. Kdyby se práh někdy povolil zpátky, spadne to tady.
//
// Spuštění: node testy/uniky-obousmerne.mjs
import { zkontrolujBlok } from './uniky.mjs';

let chyb = 0;
let kontrol = 0;

function tvrdi(popis, podminka) {
	kontrol++;
	if (!podminka) {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
}

const ot = (text, odpovedi, vysvetleni = '') => ({ text, odpovedi, vysvetleni });

// ---------------------------------------------------------------- ZDRAVÝ STAV
// Tři poctivé otázky na jedno téma. Sdílejí odborné pojmy (jinak by to nebyl jeden
// blok), ale žádná neprozrazuje odpověď jiné a žádné dvě nemají stejnou správnou.
const zdravy = [
	ot('Jaká je jednotka tlaku?', ['pascal', 'newton', 'joule'], 'Značí se Pa.'),
	ot('Jak se změní tlak, když zvětšíme plochu?', ['zmenší se', 'zvětší se', 'nezmění se'], 'Plocha je ve jmenovateli.'),
	ot('Čím se měří atmosférický tlak?', ['barometrem', 'teploměrem', 'siloměrem'], 'Přístroj má prázdnou krabičku.'),
];
{
	const v = zkontrolujBlok('test/zdravy', zdravy);
	tvrdi('zdravý blok nehlásí duplicitu', v.duplicity.length === 0);
	tvrdi('zdravý blok nehlásí únik', v.uniky.length === 0);
}

// ---------------------------------------------------------------- PODVRH: DUPLICITA
{
	const podvrh = [
		...zdravy,
		ot('Kterou jednotkou se udává tlak?', ['pascal', 'newton', 'joule'], 'Stejná otázka jinými slovy.'),
	];
	const v = zkontrolujBlok('test/duplicita', podvrh);
	tvrdi('duplicitní pár se najde', v.duplicity.length >= 1);
	tvrdi(
		'duplicita ukazuje na správnou dvojici',
		v.duplicity.some((d) => /jednotka tlaku|jednotkou se udává/.test(d.a) && /jednotka tlaku|jednotkou se udává/.test(d.b)),
	);
}

// ---------------------------------------------------------------- PODVRH: ÚNIK ODPOVĚDI
// Přesně ta vada, kterou 31. 7. našel až kontrolor: vysvětlení u jedné otázky
// doslova odpovídá na otázku jinou (vlhkoměr × anemometr).
{
	const podvrh = [
		ot('Čím se měří vlhkost vzduchu?', ['vlhkoměrem', 'barometrem', 'teploměrem'],
			'Rychlost větru se naproti tomu měří anemometrem se třemi miskami.'),
		ot('Čím se měří rychlost větru?', ['anemometrem se třemi miskami', 'barometrem', 'vlhkoměrem'],
			'Misky se točí tím rychleji, čím silnější je vítr.'),
	];
	const v = zkontrolujBlok('test/unik', podvrh);
	tvrdi('únik odpovědi se najde', v.uniky.length >= 1);
	tvrdi(
		'únik ukazuje na otázku o větru',
		v.uniky.some((u) => /rychlost větru/.test(u.otazka)),
	);
}

// ------------------------------------------------- PODVRH: ČÍSELNÝ ÚNIK (nález 19. 8. 2026)
// Měřidlo bylo vůči číslům slepé: `rozlisujiciSlova()` používalo `slova()`, které zahazuje
// tokeny kratší než 4 znaky VČETNĚ ČÍSEL. U odpovědi „kolem 80 °C" tak zbylo jediné
// rozlišující slovo a podmínka `prozrazena.length >= 2` se nemohla splnit. Tenhle skutečný
// únik z bloku 8. ročníku (teplo a změny skupenství / var) proto proklouzl na web.
{
	const podvrh = [
		ot('Jak závisí teplota varu na tlaku?', ['nižší tlak → nižší teplota varu', 'nižší tlak → vyšší teplota varu', 'nezávisí'],
			'V horách vře voda dřív (~80 °C).'),
		ot('Kolik přibližně stupňů má vroucí voda vysoko v horách?', ['kolem 80 °C', 'přesně 100 °C', 'přes 120 °C'],
			'Nízký tlak vysoko nad mořem posune bod varu dolů.'),
	];
	const v = zkontrolujBlok('test/unik-cislo', podvrh);
	tvrdi('číselný únik („80 °C") se najde', v.uniky.length >= 1);
	tvrdi('číselný únik ukazuje na otázku o horách', v.uniky.some((u) => /vysoko v horách/.test(u.otazka)));
}

// REGRESE k tomu: čísla si početní úlohy půjčují pořád. Kdyby stačila samotná shoda čísla,
// hlásilo měřidlo nad daty webu 59 nálezů místo 4 — samé příklady se stejnou hodnotou.
{
	const pujcenaCisla = [
		ot('Břemeno 100 N visí na volné kladce. Jak se jeho tíha rozdělí mezi dvě části lana?', ['každá nese 50 N', 'každá nese 100 N', 'jedna nese vše'], ''),
		ot('Břemeno váží 200 N. Jakou silou ho zvednu na jedné volné kladce?', ['100 N', '200 N', '400 N'], 'Volná kladka sílu půlí.'),
	];
	const v = zkontrolujBlok('test/regrese-pujcene-cislo', pujcenaCisla);
	tvrdi('stejné číslo ve dvou početních úlohách NENÍ únik', v.uniky.length === 0);
}

// PODVRH: ČÍSLO V ZADÁNÍ CÍLE NEDĚLÁ Z OTÁZKY POČETNÍ ÚLOHU (nález kontroly 19. 8. 2026)
// Výjimka „početní úloha jako cíl" byla děravá: vypnula se, jakmile znění cílové otázky
// obsahovalo JAKÉKOLI číslo — i takové, které s unikající hodnotou vůbec nesouvisí.
// Tady je „5 minut ohřevu" pouhá kulisa, unikající hodnota 80 v zadání není a zdroj ji
// vyzradí ve vysvětlení. To je skutečný únik a měřidlo ho musí najít.
{
	const podvrh = [
		ot('Jak závisí teplota varu na tlaku vzduchu v horách?', ['nižší tlak → nižší teplota varu', 'nižší tlak → vyšší teplota varu', 'nezávisí'],
			'V horách vře voda dřív, kolem 80 °C.'),
		ot('Na kolik stupňů vře voda v horách po 5 minutách ohřevu?', ['80 °C', '100 °C', '60 °C'], ''),
	];
	const v = zkontrolujBlok('test/unik-cislo-kulisa', podvrh);
	tvrdi('číslo jako kulisa v zadání cíle nevypne kontrolu úniku', v.uniky.length >= 1);
	tvrdi('nález ukazuje na otázku o varu v horách', v.uniky.some((u) => /po 5 minutách/.test(u.otazka)));
}

// REGRESE k témuž: dvě početní úlohy si legitimně půjčují TÝŽ VSTUP (tíha 100 N).
// Unikající hodnota je tu ve ZNĚNÍ zdrojové otázky jako vstup příkladu — to není
// prozrazení, ale běžné sdílení hodnoty mezi příklady. Tohle byl původní důvod
// výjimky a nesmí se sem vrátit 20+ falešných poplachů.
{
	const pujcenyVstup = [
		ot('Kolik váží těleso o tíze 100 N zavěšené na pevné kladce, tahá-li lano silou stejné velikosti?', ['100 N', '250 N', '400 N'], 'Pevná kladka velikost síly nemění.'),
		ot('Jakou silou zvednu na volné kladce břemeno o tíze 200 N?', ['100 N', '200 N', '400 N'], 'Volná kladka sílu půlí.'),
	];
	const v = zkontrolujBlok('test/regrese-pujceny-vstup', pujcenyVstup);
	tvrdi('týž vstup (100 N) ve dvou početních úlohách NENÍ únik', v.uniky.length === 0);
}

// REGRESE ze SKUTEČNÝCH DAT (7. ročník, gravitační síla): číslo musí zdroj vyslovit
// U TÉHOŽ SLOVA jako odpověď cíle. „0,6 kg × 10 = 6 N" mluví o převodu hmotnosti,
// ne o odpovědi „přibližně 10 N" — konstantu g dosazuje každý příklad v bloku.
{
	const gVeVypoctu = [
		ot('Žehlička má hmotnost 0,6 kg. Jakou silou ji Země přitahuje?', ['6 N', '60 N', '0,6 N'], '0,6 kg × 10 = 6 N.'),
		ot('Jakou silou působí Země na těleso o hmotnosti 1 kg?', ['přibližně 10 N', 'přibližně 1 N', 'přibližně 100 N'], 'Gravitační síla na 1 kg je asi 10 N.'),
	];
	const v = zkontrolujBlok('test/regrese-g-ve-vypoctu', gVeVypoctu);
	tvrdi('konstanta g použitá ve výpočtu („× 10") NENÍ únik odpovědi „10 N"', v.uniky.length === 0);
}

// REGRESE ze SKUTEČNÝCH DAT (7. ročník, jednoduché stroje): hodnotu, kterou má žák
// rovnou ve VLASTNÍM zadání („Zvedáme 2 kg (20 N)…" s odpovědí „20 N"), nemůže nikdo
// prozradit — otázka si ji říká sama. Jediné, co tuhle dvojici drží mimo nálezy, je
// pravidlo „číslo už v zadání cíle"; bez něj tenhle případ spadne.
{
	const uzVZadani = [
		ot('Zvedáme 2 kg (20 N) přes pevnou kladku. Jakou silou táhneme?', ['20 N', '10 N', '40 N'], 'Pevná kladka jen mění směr — síla zůstává 20 N.'),
		ot('Jakou silou zvedneme 20 N přes volnou kladku?', ['10 N', '20 N', '5 N'], 'Volná kladka sílu půlí — lano nese břemeno nadvakrát.'),
	];
	const v = zkontrolujBlok('test/regrese-cislo-uz-v-zadani', uzVZadani);
	tvrdi('číslo stojící ve vlastním zadání cíle NENÍ únik', v.uniky.length === 0);
}

// REGRESE: prozrazená POLOVINA číselné odpovědi ještě odpověď nedává.
{
	const pulka = [
		ot('Kolikrát za sekundu projde napětí v síti nulou (frekvence 50 Hz)?', ['stokrát', 'padesátkrát', 'jednou'], ''),
		ot('Jaké napětí a frekvence jsou v české rozvodné síti?', ['230 V a 50 Hz', '110 V a 60 Hz', '400 V a 50 Hz'], ''),
	];
	const v = zkontrolujBlok('test/regrese-pulka-cisla', pulka);
	tvrdi('prozrazené jen jedno ze dvou čísel odpovědi NENÍ únik', v.uniky.length === 0);
}

// ---------------------------------------------------------------- REGRESE FALEŠNÝCH POPLACHŮ
// Tyhle čtyři dvojice první verze měřidla hlásila jako duplicity. Nejsou to duplicity:
// liší se číslem nebo písmenem, tedy přesně tím, na co se ptají. Filtr slov ≥ 4 znaky
// ta rozlišení zahazoval a vycházela „shoda znění 100 %".
{
	const paryKtereNejsouDuplicita = [
		[ot('Co platí při 0 °C?', ['voda mrzne', 'voda vře', 'nic'], ''), ot('Co platí při 100 °C?', ['voda vře', 'voda mrzne', 'nic'], '')],
		[ot('Kolik hodin je 120 minut?', ['2 h', '1 h', '3 h'], ''), ot('Kolik hodin je 36 minut?', ['0,6 h', '2 h', '1 h'], '')],
		[ot('Jak nazýváme vlnění pod 16 Hz?', ['infrazvuk', 'ultrazvuk', 'zvuk'], ''), ot('Jak nazýváme vlnění nad 16 kHz?', ['ultrazvuk', 'infrazvuk', 'zvuk'], '')],
		[ot('Co přináší příměs do polovodiče typu N?', ['volné elektrony', 'díry', 'nic'], ''), ot('Co přináší příměs do polovodiče typu P?', ['díry', 'volné elektrony', 'nic'], '')],
	];
	for (const [a, b] of paryKtereNejsouDuplicita) {
		const v = zkontrolujBlok('test/regrese', [a, b]);
		tvrdi(`není duplicita: „${a.text}" × „${b.text}"`, v.duplicity.length === 0);
	}
}

// Dvojice se STEJNOU správnou odpovědí, která se liší JEN číslem. Kdyby se porovnávala
// znění bez čísel (jak to dělala první verze), vyjde shoda 100 % a je z toho falešná
// duplicita — přitom jsou to dvě různé úlohy na převod.
{
	const a = ot('Kolik hodin je 120 minut?', ['2 h', '1 h', '3 h'], '');
	const b = ot('Kolik hodin je 7200 sekund?', ['2 h', '1 h', '3 h'], '');
	const v = zkontrolujBlok('test/regrese-cisla', [a, b]);
	tvrdi('dvě úlohy lišící se jen číslem nejsou duplicita', v.duplicity.length === 0);
}

// Falešný poplach úniku: dvě otázky sdílejí jeden běžný odborný pojem tématu.
// To není prozrazení — a první verze měřidla z toho udělala 264 nálezů.
{
	const podvrh = [
		ot('Jak velká gravitační síla působí u povrchu Země na 1 kg hmotnosti?', ['asi 10 N', 'asi 1 N', 'asi 100 N'], 'Počítá se F = m · g.'),
		ot('Mezi kterými tělesy působí gravitační síla?', ['mezi všemi tělesy s hmotností', 'jen mezi planetami', 'jen mezi magnety'], ''),
	];
	const v = zkontrolujBlok('test/regrese-unik', podvrh);
	tvrdi('sdílený odborný pojem („hmotnost") NENÍ únik', v.uniky.length === 0);
}

// Druhý regresní případ úniku, tentokrát se DVĚMA sdílenými slovy, ale nízkým pokrytím:
// dlouhá odpověď má sedm rozlišujících slov a shodují se jen dvě. To ještě není
// prozrazení — žák si z toho odpověď složit nemůže. Kdyby se práh pokrytí povolil,
// spadne to tady (bez tohohle případu mutace „pokryti >= 0" projde nepovšimnuta).
{
	const podvrh = [
		ot('Proč se v horké vodě vyluhuje čaj rychleji?', ['částice se pohybují rychleji', 'voda je hustší', 'čaj je sladší'], ''),
		ot('Co je difuze?', ['samovolné promíchání dvou látek způsobené tím, že se částice neustále neuspořádaně pohybují', 'zahřátí kapaliny', 'změna skupenství'], ''),
	];
	const v = zkontrolujBlok('test/regrese-pokryti', podvrh);
	tvrdi('dvě sdílená slova z dlouhé odpovědi NEJSOU únik (nízké pokrytí)', v.uniky.length === 0);
}

// ---------------------------------------------------------------- POČÍTADLO VSTUPŮ
// Kontrola, která nic neprojde, musí být poznat — nález auditu „opatření platí jen
// na část případů a na tu druhou se tiše zapomene".
{
	const v = zkontrolujBlok('test/prazdny', []);
	tvrdi('prázdný blok nespadne', Array.isArray(v.duplicity) && Array.isArray(v.uniky));
	const vNic = zkontrolujBlok('test/neplatny', null);
	tvrdi('neplatný vstup nespadne', vNic.duplicity.length === 0);
}

console.log(chyb === 0 ? `✅ uniky.mjs — obousměrně ověřeno, ${kontrol} kontrol.` : `❌ ${chyb} z ${kontrol} kontrol selhalo.`);
process.exit(chyb === 0 ? 0 : 1);

/**
 * Jednoduché laboratorní práce — tisknutelné pracovní listy k podtématům.
 * Klíč je stejný jako u kvízů: predmet/rocnik/tema/podtema.
 * Pomůcky jen běžně dostupné ve škole nebo doma; výpočty vychází v celých číslech.
 */
export type Laborka = {
	nazev: string;
	cil: string;
	pomucky: string[];
	postup: string[];
	/** tabulka měření: hlavičky sloupců + počet prázdných řádků na vyplnění */
	tabulka: { sloupce: string[]; radky: number };
	otazky: string[];
	/** bezpečnostní nebo praktická poznámka pod postupem */
	pozor?: string;
	/** zajímavost na závěr */
	tip?: string;
};

export const laborky: Record<string, Laborka> = {
	'fyzika/6-rocnik/cas/cas-a-jeho-mereni': {
		nazev: 'Kyvadlo — měříme čas stopkami',
		cil: 'Změřit dobu kyvu kyvadla a zjistit, na čem závisí.',
		pomucky: ['provázek (asi 1 metr)', 'matice nebo svazek klíčů', 'stopky (stačí mobil)', 'pravítko nebo metr'],
		postup: [
			'Přivaž matici na provázek a zavěs ho z dostatečné výšky — na horní hranu tabule, rám dveří nebo ho drž v natažené ruce. Délka od závěsu k matici ať je 100 cm (kyvadlo se nesmí dotýkat země).',
			'Vychyl kyvadlo kousek do strany a pusť je — nech je volně kývat.',
			'Změř stopkami dobu 10 celých kmitů (jeden kmit = tam a zpět) a zapiš do tabulky.',
			'Měření opakuj celkem 3× a spočítej průměr.',
			'Průměrný čas vyděl deseti — máš dobu jednoho kmitu.',
			'Zkrať provázek na 50 cm a celé měření zopakuj.',
		],
		tabulka: {
			sloupce: ['délka (cm)', '1. měření (s)', '2. měření (s)', '3. měření (s)', 'průměr (s)', 'doba 1 kmitu (s)'],
			radky: 2,
		},
		otazky: [
			'Proč měříme dobu 10 kmitů, a ne jen jednoho?',
			'Kývá kratší kyvadlo rychleji, nebo pomaleji než dlouhé?',
			'Zkus: změní se doba kyvu, když kyvadlo vychýlíš víc? A když pověsíš dvě matice místo jedné?',
		],
		tip: 'Přesně takhle odměřovaly čas kyvadlové hodiny — délka kyvadla určuje, jak rychle tikají.',
	},
	'fyzika/6-rocnik/fyzikalni-veliciny/hustota': {
		nazev: 'Hustota kamene',
		cil: 'Určit hustotu tělesa nepravidelného tvaru pomocí váhy a odměrného válce.',
		pomucky: ['kuchyňská váha', 'odměrný válec nebo odměrka s ryskami (ml)', 'voda', '2–3 menší kameny (musí se vejít do odměrky)', 'případně provázek na spouštění'],
		postup: [
			'Zvaž kámen na váze a hmotnost m zapiš v gramech.',
			'Nalij do odměrky vodu a zapiš objem V₁ (ml).',
			'Opatrně ponoř kámen (klidně na provázku), aby byl celý pod vodou, a zapiš nový objem V₂.',
			'Objem kamene je V = V₂ − V₁. Pamatuj: 1 ml = 1 cm³.',
			'Hustotu spočítej: ρ = m : V (g/cm³).',
			'Zopakuj s dalšími kameny (nebo třeba s gumou či šroubem).',
		],
		tabulka: {
			sloupce: ['předmět', 'm (g)', 'V₁ (ml)', 'V₂ (ml)', 'V (cm³)', 'ρ (g/cm³)'],
			radky: 3,
		},
		otazky: [
			'Proč kámen ve vodě klesá ke dnu? Porovnej jeho hustotu s hustotou vody (1 g/cm³).',
			'Co by dělalo těleso s hustotou menší než 1 g/cm³?',
			'Proč objem kamene měříme ponořením do vody, a ne pravítkem?',
		],
		pozor: 'Kámen do odměrky spouštěj pomalu — ať nerozbiješ dno a nevystříkne voda.',
		tip: 'Stejným trikem (ponořením) prý Archimédés odhalil, že královská koruna není z čistého zlata.',
	},
	'fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky': {
		nazev: 'Rovnováha na páce — mince na pravítku',
		cil: 'Ověřit, že páka je v rovnováze, když se rovnají momenty sil (síla × rameno).',
		pomucky: ['pravítko 30 cm', 'tužka s hranami (ne kulatá)', '6 stejných mincí (např. pětikoruny)'],
		postup: [
			'Polož tužku na lavici a na ni pravítko tak, aby se vyvážilo — podpěra je osa otáčení (u značky 15 cm).',
			'Polož 1 minci 8 cm vlevo od osy. Najdi, kam položit 1 minci vpravo, aby se pravítko vyvážilo.',
			'Polož 2 mince na sebe 6 cm vlevo. Najdi, kam dát 1 minci vpravo, aby byla rovnováha.',
			'Vyzkoušej další kombinace (3 mince vlevo 4 cm…) a vše zapisuj do tabulky.',
			'Do posledních dvou sloupců spočítej součin počet mincí × vzdálenost pro obě strany.',
		],
		tabulka: {
			sloupce: ['mince vlevo', 'rameno vlevo (cm)', 'mince vpravo', 'rameno vpravo (cm)', 'součin vlevo', 'součin vpravo'],
			radky: 4,
		},
		otazky: [
			'Co platí pro součiny vlevo a vpravo, když je pravítko v rovnováze?',
			'Kam si má sednout těžší kamarád na houpačce, aby se lehčím vyvážili?',
			'Proč je klika na dveřích daleko od pantů?',
		],
		tip: 'Právě jsi ověřil(a) rovnost momentů F₁·a₁ = F₂·a₂ — stejný zákon používá jeřáb i louskáček na ořechy.',
	},
	'fyzika/6-rocnik/fyzikalni-veliciny/delka': {
		nazev: 'Jak tlustý je jeden list papíru?',
		cil: 'Změřit tloušťku jednoho listu papíru, i když je menší než dílek pravítka.',
		pomucky: ['pravítko s milimetry', 'balík kancelářského papíru (nebo tlustá kniha)', 'kalkulačka'],
		postup: [
			'Zkus pravítkem změřit jeden list papíru. Jde to? Zapiš, na čem to ztroskotá.',
			'Odpočítej přesně 100 listů (nebo použij 100 stránek knihy = 50 listů papíru).',
			'Stlač sloupek prsty a změř jeho výšku v milimetrech.',
			'Tloušťku jednoho listu spočítej: výška sloupku : počet listů.',
			'Měření zopakuj s 200 listy a výsledky porovnej.',
		],
		tabulka: {
			sloupce: ['počet listů', 'výška sloupku (mm)', 'tloušťka 1 listu (mm)'],
			radky: 3,
		},
		otazky: [
			'Proč nejde tloušťka jednoho listu změřit pravítkem přímo?',
			'Vyšla ti tloušťka při 100 a 200 listech stejně? Proč se měření s více listy dá víc věřit?',
			'Jak bys stejným trikem změřil(a) tloušťku jedné mince nebo hmotnost jedné kancelářské sponky?',
		],
		tip: 'Měření mnoha kusů najednou a dělení počtem je běžný vědecký trik — říká se mu měření násobku.',
	},
	'fyzika/6-rocnik/teplota/teplota-a-jeji-mereni': {
		nazev: 'Jak chladne horká voda',
		cil: 'Změřit, jak se mění teplota chladnoucí vody, a nakreslit graf chladnutí.',
		pomucky: ['lihový nebo kuchyňský teploměr (NE lékařský!)', 'hrnek nebo sklenice', 'teplá voda z kohoutku', 'stopky či hodiny', 'papír na graf'],
		postup: [
			'Napusť do hrnku teplou vodu z kohoutku (stačí kolem 50 °C — vařící vodu nepoužívej).',
			'Ponoř teploměr, počkej, až se ustálí, a zapiš počáteční teplotu v čase 0 minut.',
			'Každé 2 minuty zapiš teplotu do tabulky — měř celkem 20 minut (0, 2, 4 … 20).',
			'Z tabulky nakresli graf: na vodorovnou osu čas (min), na svislou teplotu (°C), body spoj čarou.',
			'Podívej se, kdy teplota klesala nejrychleji a kdy už klesala jen pomalu.',
		],
		tabulka: {
			sloupce: ['čas (min)', 'teplota (°C)'],
			radky: 11,
		},
		otazky: [
			'Klesala teplota pořád stejně rychle? Kdy klesala nejvíc?',
			'K jaké teplotě se voda pomalu blíží? Proč se ochlazování nakonec skoro zastaví?',
			'Proč se nesmí do horké vody strkat lékařský teploměr?',
		],
		pozor: 'Nepoužívej vařící vodu a lékařský teploměr — ten měří jen do 42 °C a horkem by praskl.',
		tip: 'Stejnou křivku chladnutí používají kriminalisté v detektivkách k odhadu času události.',
	},
	'fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas': {
		nazev: 'Moje rychlost — chůze a běh',
		cil: 'Změřit průměrnou rychlost chůze a běhu a převést ji na km/h.',
		pomucky: ['pásmo nebo metr', 'stopky (mobil)', 'křída na značky', 'rovný úsek chodby nebo hřiště'],
		postup: [
			'Vyměř a křídou vyznač dráhu s = 20 m (klidně delší, když je místo).',
			'Projdi dráhu běžnou chůzí, kamarád ti změří čas t. Zapiš do tabulky.',
			'Stejnou dráhu proběhni a čas opět zapiš.',
			'Rychlost spočítej: v = s : t (m/s). Každé měření udělej 2× a ber průměr.',
			'Převeď na km/h: rychlost v m/s vynásob 3,6.',
		],
		tabulka: {
			sloupce: ['způsob', 's (m)', 't (s)', 'v (m/s)', 'v (km/h)'],
			radky: 4,
		},
		otazky: [
			'Kolikrát je tvůj běh rychlejší než chůze?',
			'Proč mluvíme o PRŮMĚRNÉ rychlosti? Byla tvá rychlost po celou dobu stejná?',
			'Porovnej svou rychlost s chodcem (asi 5 km/h) a s nejrychlejším sprinterem světa (asi 37 km/h).',
		],
		tip: 'Usain Bolt uběhl 100 m za 9,58 s — zkus spočítat jeho průměrnou rychlost.',
	},
	'fyzika/7-rocnik/sily-kolem-nas/teziste': {
		nazev: 'Hledáme těžiště vystřiženého tvaru',
		cil: 'Najít těžiště nepravidelné desky zavěšováním a ověřit ho balancováním.',
		pomucky: ['tvrdší karton', 'nůžky', 'špendlík nebo hřebík', 'nit', 'matice (jako závaží olovnice)', 'tužka', 'pravítko'],
		postup: [
			'Vystřihni z kartonu nepravidelný tvar (třeba obrys kytary nebo mraku).',
			'Propíchni u okraje dírku a tvar volně zavěs na špendlík — musí se moci otáčet.',
			'Na stejný špendlík zavěs olovnici (nit s maticí) a podél napnuté nitě narýsuj svislou čáru.',
			'Zavěs tvar za jinou dírku u okraje a narýsuj druhou čáru. Průsečík čar je těžiště — označ ho.',
			'Ověření: polož tvar těžištěm na napřímený prst — měl by se udržet vodorovně.',
			'Zkus třetí dírku: prochází i třetí čára těžištěm?',
		],
		tabulka: {
			sloupce: ['zavěšení č.', 'prochází čára průsečíkem? (ano/ne)', 'poznámka'],
			radky: 3,
		},
		otazky: [
			'Proč se zavěšený tvar vždycky natočí tak, že těžiště je přesně pod závěsem?',
			'Kde má těžiště prstýnek nebo hrnek? Může být těžiště i mimo materiál tělesa?',
			'Proč se provazochodec drží dlouhé tyče?',
		],
		tip: 'Stejně hledají těžiště i konstruktéři letadel — jen místo špendlíku používají počítač.',
	},
	'fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/archimeduv-zakon': {
		nazev: 'Gumička jako siloměr — měříme vztlak',
		cil: 'Ukázat, že voda nadlehčuje ponořené těleso vztlakovou silou.',
		pomucky: ['tenká měkká gumička', 'pravítko', 'svazek několika matic nebo jiné těžší závaží (nesmí plavat) — čím těžší, tím lépe se měří', 'nit', 'sklenice s vodou tak velká, aby se závaží vešlo celé pod hladinu'],
		postup: [
			'Přivaž závaží nití ke gumičce. Gumičku drž za horní konec, nebo zavěs na tužku.',
			'Změř pravítkem délku natažené gumičky, když závaží visí ve vzduchu. Zapiš.',
			'Pomalu ponoř závaží celé pod hladinu (nesmí se dotýkat dna ani stěn) a změř délku gumičky znovu.',
			'Porovnej obě délky — o kolik milimetrů se gumička zkrátila?',
			'Zopakuj s větším (těžším) závažím a porovnej zkrácení.',
		],
		tabulka: {
			sloupce: ['závaží', 'délka gumičky ve vzduchu (mm)', 'délka ve vodě (mm)', 'zkrácení (mm)'],
			radky: 3,
		},
		otazky: [
			'Proč se gumička ve vodě zkrátila? Jaká síla závaží nadlehčuje a kam míří?',
			'Přestalo závaží ve vodě vážit? Co se změnilo doopravdy?',
			'Mělo by být zkrácení ve slané vodě větší, nebo menší než ve sladké? Proč se v moři plave snáz než v rybníce? (Rozdíl je malý — pravítkem ho nezměříš, ale úvahou ano.)',
		],
		tip: 'Přesně tohle popisuje Archimédův zákon — vztlaková síla se rovná tíze vytlačené vody.',
	},
	'fyzika/8-rocnik/energie/tepelna-vymena-a-teplo': {
		nazev: 'Míchání teplé a studené vody',
		cil: 'Předpovědět výslednou teplotu smíchané vody a ověřit ji měřením.',
		pomucky: ['teploměr (lihový/kuchyňský)', 'odměrka', 'dva hrnky', 'studená a teplá voda z kohoutku'],
		postup: [
			'Odměř 100 ml studené vody, změř její teplotu t₁ a zapiš.',
			'Odměř 100 ml teplé vody (kolem 50 °C) a změř teplotu t₂.',
			'PŘEDPOVĚZ: jaká teplota vyjde po smíchání? U stejných množství je to průměr: (t₁ + t₂) : 2.',
			'Vodu rychle slij do jednoho hrnku, zamíchej, změř výslednou teplotu a porovnej s předpovědí.',
			'Zopakuj s jiným poměrem: 200 ml studené + 100 ml teplé. Bude výsledek blíž studené, nebo teplé?',
		],
		tabulka: {
			sloupce: ['pokus', 'studená: ml / °C', 'teplá: ml / °C', 'předpověď (°C)', 'naměřeno (°C)'],
			radky: 3,
		},
		otazky: [
			'Odkud kam přechází teplo při míchání? Kdy tepelná výměna skončí?',
			'Proč u poměru 2 : 1 vyjde výsledek blíž teplotě studené vody?',
			'Naměřená teplota bývá o kousek nižší než předpověď. Kam se trocha tepla ztratila?',
		],
		pozor: 'Používej teplou vodu z kohoutku, ne vařící — opařila by tě a poškodila teploměr.',
		tip: 'Stejný výpočet používá termostat vodovodní baterie, když míchá vodu na příjemnou teplotu.',
	},
	'fyzika/9-rocnik/magneticke-pole/elektromagnet': {
		nazev: 'Elektromagnet z hřebíku',
		cil: 'Vyrobit elektromagnet a zjistit, jak jeho síla závisí na počtu závitů.',
		pomucky: ['velký železný hřebík', 'izolovaný měděný drát (asi 2 m)', 'plochá baterie 4,5 V', 'kancelářské sponky', 'případně izolepa'],
		postup: [
			'Namotej na hřebík 10 závitů drátu těsně vedle sebe. Konce drátu odizoluj.',
			'Připoj konce k pólům baterie a zkus hřebíkem zvednout sponky. Počet zvednutých sponek zapiš.',
			'Odpoj baterii, přimotej dalších 10 závitů (celkem 20) a pokus zopakuj.',
			'Zopakuj se 40 závity.',
			'Odpoj baterii a vyzkoušej, jestli hřebík sponky udrží i bez proudu.',
		],
		tabulka: {
			sloupce: ['počet závitů', 'počet zvednutých sponek'],
			radky: 3,
		},
		otazky: [
			'Jak závisí síla elektromagnetu na počtu závitů cívky?',
			'Co se stane se sponkami, když obvod rozpojíš? Čím se elektromagnet liší od trvalého magnetu?',
			'Kde se výhoda „magnet na vypínač" používá? (jeřáb na šrot, zvonek, elektrický zámek…)',
		],
		pozor: 'Cívka a baterie se zahřívají — připojuj obvod vždy jen na pár sekund a mezi pokusy nech vychladnout.',
		tip: 'Obří elektromagnety na vrakovištích zvedají celá auta — a pustí je prostým vypnutím proudu.',
	},
	'fyzika/9-rocnik/energie-a-vesmir/slunecni-soustava': {
		nazev: 'Sluneční soustava na hřišti',
		cil: 'Postavit model vzdáleností planet ve zmenšeném měřítku a zažít, jak je soustava prázdná.',
		pomucky: ['pásmo nebo metr', 'křída', 'papírové štítky se jmény planet', 'hřiště nebo dlouhá chodba'],
		postup: [
			'Zvol měřítko: 1 astronomická jednotka (au = vzdálenost Země–Slunce) = 10 metrů.',
			'Slunce nakresli křídou k jednomu konci hřiště.',
			'Vyměř a označ vnitřní planety: Merkur 4 m, Venuše 7 m, Země 10 m, Mars 15 m od Slunce.',
			'Spočítej, kam by patřily vnější planety: Jupiter 5,2 au, Saturn 9,5 au, Uran 19 au, Neptun 30 au — vzdálenosti v metrech doplň do tabulky.',
			'Odhadni (nebo odkrokuj), kam až by planety sahaly — vejde se Neptun na hřiště, nebo už je za plotem školy?',
		],
		tabulka: {
			sloupce: ['planeta', 'vzdálenost od Slunce (au)', 'v modelu (m)', 'kam by dosáhla?'],
			radky: 8,
		},
		otazky: [
			'Proč se do modelu vejdou jen vnitřní planety? Kolikrát dál je Neptun než Země?',
			'Většina modelu je prázdná. Co to říká o cestování mezi planetami?',
			'Nejbližší hvězda (Proxima Centauri) je asi 270 000 au daleko. Kolik kilometrů by to bylo v našem modelu?',
		],
		tip: 'V měřítku 1 au = 10 m by Proxima Centauri byla 2 700 km od hřiště — asi jako ze školy do Španělska.',
	},
	'fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon': {
		nazev: 'Můj výkon na schodech',
		cil: 'Spočítat vlastní výkon při chůzi a běhu do schodů: P = W : t.',
		pomucky: ['schodiště (aspoň jedno patro)', 'metr nebo pravítko', 'stopky (mobil)', 'osobní váha', 'kalkulačka'],
		postup: [
			'Zvaž se a hmotnost m (kg) zapiš do tabulky.',
			'Změř výšku jednoho schodu v metrech a spočítej počet schodů — celková výška h = počet × výška schodu.',
			'Vyjdi schody běžnou chůzí, kamarád ti změří čas t.',
			'Potom schody vyběhni (opatrně!) a opět si nech změřit čas.',
			'Spočítej práci W = m · g · h (počítej g = 10 N/kg) — je pro chůzi i běh stejná.',
			'Výkon spočítej P = W : t pro chůzi i běh a porovnej.',
		],
		tabulka: {
			sloupce: ['způsob', 'm (kg)', 'h (m)', 't (s)', 'W (J)', 'P (W)'],
			radky: 2,
		},
		otazky: [
			'Při běhu vyšla práce stejná jako při chůzi. Proč je tedy výkon větší?',
			'Porovnej svůj výkon s žárovkou 60 W nebo s rychlovarnou konvicí 2000 W.',
			'Kolik wattů by měl tvůj výkon, kdybys stejné schody zvládl(a) za polovinu času?',
		],
		pozor: 'Běhej jen po suchých schodech, drž se dál od hrany a nikoho nepředbíhej.',
		tip: 'Jeden kůň dá trvale asi 750 W — proto se výkonu motorů dodnes říká „koně".',
	},
};

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
	/** soubory ke stažení (např. PDF s podklady k vytištění) */
	ke_stazeni?: { nazev: string; href: string }[];
};

export const laborky: Record<string, Laborka> = {
	"fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky": {
  "nazev": "Proud v cívce a směr magnetky",
  "cil": "Pomocí kompasu pozorovat magnetické účinky cívky s proudem a porovnat je po obrácení směru proudu.",
  "pomucky": [
    "školní vzduchová cívka bez železného jádra s označenými vývody",
    "kompas nebo volně otočná magnetka",
    "školní stejnosměrný zdroj bezpečného malého napětí s proudovým omezením",
    "spínač a propojovací vodiče s izolovanými koncovkami",
    "nekovová podložka, papír a tužka"
  ],
  "postup": [
    "Pracuj pod dohledem učitele. Učitel podle údajů cívky nastaví napětí a proudové omezení zdroje a ověří vhodnost celé soupravy. Zdroj zatím nech vypnutý a spínač rozepnutý. Nepoužívej síťovou zásuvku jako přímý zdroj pokusu.",
    "Na nekovovou podložku polož papír a kompas dál od magnetů a ocelových předmětů. Počkej, až se střelka ustálí, a na papíru vyznač směr jejího severního konce. Poznáš jej podle označení přístroje, nikoli jen podle barvy.",
    "Polož cívku vodorovně tak, aby její osa byla přibližně kolmá na vyznačený směr střelky. Kompas umísti na prodloužení osy u jednoho konce cívky. Obkresli polohu cívky i kompasu; po celý pokus je už neposouvej. Do prvního řádku tabulky zapiš „rozepnuto před pokusem“ a směr severního konce střelky zakresli jako šipku vůči původní značce.",
    "Při vypnutém zdroji zapoj jeden obvod: kladný vývod zdroje → spínač → první vývod cívky → druhý vývod cívky → záporný vývod zdroje. Učitel zapojení zkontroluje. Poznamenej si, který vývod cívky je připojen ke kladnému vývodu zdroje.",
    "Zapni zdroj a krátce sepni spínač jen na dobu potřebnou k pozorování střelky. Do druhého řádku zapiš „sepnuto, první zapojení“, připojení vývodů a pozorovaný směr střelky. Spínač opět rozepni. Do třetího řádku zapiš „rozepnuto po pokusu“ a směr střelky po ustálení.",
    "Vypni zdroj. Prohoď mezi sebou pouze připojení obou vývodů cívky, její polohu ani kompas neměň. Po kontrole učitelem znovu zapni zdroj a krátce sepni spínač. Do čtvrtého řádku zapiš „sepnuto, obrácené zapojení“, nové připojení vývodů a pozorovaný směr střelky. Potom rozepni spínač, vypni zdroj a obvod odpoj.",
    "Porovnej směry střelky ve všech čtyřech situacích. Zapisuj pouze skutečná pozorování. Pokud vychýlení nebylo patrné, uveď to; s učitelem ověř funkčnost obvodu a vhodnou vzájemnou polohu součástí. Nezvyšuj svévolně napětí ani proud a nevymýšlej očekávaný výsledek."
  ],
  "tabulka": {
    "sloupce": [
      "stav obvodu",
      "vývod cívky připojený k +",
      "směr severního konce střelky – náčrtek"
    ],
    "radky": 4
  },
  "otazky": [
    "Jak se ve tvém pokusu změnil směr střelky po sepnutí a po rozepnutí obvodu?",
    "Co jsi pozoroval po prohození vývodů cívky? Jak změna směru proudu souvisí s magnetickými póly cívky?",
    "Proč jsme při porovnávání obou zapojení zachovali polohu cívky i kompasu?",
    "Proč se střelka orientuje i při rozepnutém obvodu? Znamená malé nebo nepozorované vychýlení samo o sobě, že magnetické pole neexistuje?"
  ],
  "pozor": "Jen školní zdroj bezpečného malého napětí s proudovým omezením nastaveným učitelem pro danou cívku. Vývody přepojuj výhradně při vypnutém zdroji a rozepnutém spínači. Cívku nenechávej zbytečně zapnutou. Při zahřívání, zápachu nebo poškození ihned vypni zdroj a přivolej učitele. Magnetické pomůcky nepřibližuj ke zdravotním implantátům; při implantátu se před pokusem domluv s učitelem.",
  "tip": "Kompas ukazuje výsledný směr pole cívky, Země a dalších okolních zdrojů. Po obrácení proudu se proto střelka nemusí otočit přesně o půl otáčky."
},
	"fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani": {
  "nazev": "Póly magnetů a kompas jako detektor pole",
  "cil": "Pozorovat přitahování a odpuzování magnetických pólů a pomocí kompasu zkoumat, jak tyčový magnet mění směr magnetky ve svém okolí.",
  "pomucky": [
    "dva školní tyčové magnety s označenými póly N a S",
    "kompas nebo volně otočná magnetka",
    "dva listy papíru",
    "tužka",
    "nekovová podložka"
  ],
  "postup": [
    "Použij tabulku tohoto pracovního listu. Připrav čtyři dvojice přibližovaných pólů: N–N, N–S, S–N a S–S. Výsledek zatím nevyplňuj. Pracuj na vodorovném místě, dál od ocelových částí lavice a jiných magnetických předmětů.",
    "Polož jeden magnet na papír a přidrž jej. Druhý magnet drž v ruce. Magnety udržuj v jedné ose, severními konci proti sobě, a pomalu je přibližuj. Nedovol druhému magnetu pootočit se. Sleduj, zda cítíš přitahování, nebo odpuzování. Nenech magnety narazit do sebe. Pozorování zapiš do tabulky.",
    "Podobně vyzkoušej zbývající tři dvojice pólů. Pro každou dvojici začni znovu s magnety od sebe; do tabulky zapiš pouze skutečně pozorovaný účinek.",
    "Druhý magnet odnes tak daleko, aby jeho další oddalování už neměnilo směr střelky kompasu. Na druhý list papíru polož první magnet a obkresli jeho polohu. Označ na obrysu póly N a S.",
    "Kompas postupně pokládej na různá místa kolem magnetu. V každém místě počkej, až se střelka ustálí. Označ střed kompasu a od něj nakresli šipku ve směru, kam ukazuje severní konec střelky. Magnet při tom neposouvej.",
    "Odnes oba magnety dostatečně daleko, aby další zvětšení vzdálenosti už neměnilo směr střelky. Vrať kompas postupně na několik označených míst a porovnej jeho směr s dřívějším náčrtkem. Výsledky popiš písemně vedle svého náčrtku. I bez školních magnetů působí na kompas magnetické pole Země; shodný směr v jednom místě neznamená nepřítomnost pole."
  ],
  "tabulka": {
    "sloupce": [
      "pól přidržovaného magnetu",
      "přibližovaný pól",
      "pozorovaný účinek"
    ],
    "radky": 4
  },
  "otazky": [
    "Které dvojice pólů se v tvém pokusu přitahovaly a které odpuzovaly?",
    "Měnil se směr střelky, když jsi kompas přenášel kolem magnetu? Dolož odpověď svým náčrtkem.",
    "Co nám změna směru magnetky říká o okolí magnetu?"
  ],
  "pozor": "Použij běžné školní magnety, ne silné neodymové. Magnety nerozbíjej a nenech je prudce srazit; chraň prsty. Nedávej je k elektronice ani k zdravotním implantátům. Při implantátu práci s magnety přenech spolužákovi a domluv se s učitelem.",
  "tip": "Severní konec střelky urči podle označení kompasu; samotná barva nemusí u všech přístrojů znamenat totéž."
},
	"fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace": {
  "nazev": "Držení a zvedání: kdy konáme mechanickou práci?",
  "cil": "Rozlišit držení předmětu od jeho zvedání a určit práci z naměřené síly a dráhy ve směru síly.",
  "pomucky": [
    "siloměr vhodného rozsahu",
    "lehké nerozbitné závaží bezpečně zavěšené na siloměru",
    "pravítko nebo metr",
    "pracovní list a tužka"
  ],
  "postup": [
    "S učitelem vyber lehké závaží a siloměr, jehož rozsah nebude překročen. Zkontroluj upevnění a nulovou polohu siloměru. Pracuj nízko nad volnou lavicí.",
    "Zvedni závaží nad podložku a potom je nehybně drž. Odečti sílu F. Do prvního řádku zapiš držení, naměřenou sílu a nulovou dráhu s. Zapiš práci W = F · s.",
    "Na měřítku označ počáteční a koncovou výšku. Závaží pomalu a rovnoměrně zvedej mezi značkami. Jeden ze dvojice sleduje siloměr, druhý dráhu. Síla má směřovat svisle vzhůru stejně jako posunutí.",
    "Do druhého řádku zapiš zvedání, sílu F v newtonech a svislou dráhu s v metrech. Použij hodnotu síly při rovnoměrném zvedání, nikoli při rozbíhání nebo zastavování. Pokud ručička výrazně kolísala, měření zopakuj.",
    "Polož závaží zpět na podložku. Se stejným závažím zopakuj rovnoměrné zvedání po delší dráze a zapiš třetí řádek. Každá dráha musí zůstat bezpečně v dosahu nad lavicí.",
    "Pro obě zvedání vypočítej W = F · s. Sílu dosazuj v newtonech, dráhu v metrech, výsledek zapiš v joulech. Naměřené údaje nevymýšlej ani nezaokrouhluj jen proto, aby vyšlo celé číslo.",
    "Porovnej držení a zvedání. Potom porovnej obě zvedání: změnila se výrazně síla? Jak se při přibližně stejné síle změnila práce s dráhou?"
  ],
  "tabulka": {
    "sloupce": [
      "situace",
      "F (N)",
      "s (m)",
      "W (J)"
    ],
    "radky": 3
  },
  "otazky": [
    "Proč je při nehybném držení práce síly působící na závaží nulová, přestože siloměr ukazuje nenulovou sílu?",
    "Jaké dvě podmínky musí být splněny, abychom v této úloze konali mechanickou práci?",
    "Při kterém z obou zvedání vyšla větší práce? Zdůvodni odpověď pomocí naměřené síly a dráhy.",
    "Co musíš převést, jestliže jsi dráhu odečetl v centimetrech, ale práci chceš určit v joulech?"
  ],
  "pozor": "Pracuj pod dohledem učitele. Použij jen lehký nerozbitný předmět a nepoškozený siloměr. Nepřekračuj rozsah siloměru, netrhej jím a závaží nepouštěj. Nestrkej ruce pod zavěšené závaží. Nezvedej nic nad hlavu, nestoupej na židli a po měření vše polož na lavici."
},
	'fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa': {
		nazev: 'Autíčko ve vagonu — klid a pohyb závisí na pozorovateli',
		cil: 'Ověřit, že stejné těleso může být současně v klidu vzhledem k jednomu tělesu a v pohybu vzhledem k jinému.',
		pomucky: ['malé autíčko', 'pruh pevného kartonu dlouhý alespoň 50 cm', 'pravítko nebo metr', 'lepicí páska', 'tužka'],
		postup: [
			'Polož karton na lavici — představuje vagon. Na karton nakresli značku pro cestujícího a vedle ní postav autíčko.',
			'Autíčko připevni malým kouskem pásky, aby se po kartonu neposouvalo. Tužkou označ na lavici počáteční polohu přední hrany kartonu i autíčka.',
			'Posuň celý karton po lavici přesně o 40 cm. Autíčko musí zůstat u své značky na kartonu.',
			'Zapiš, o kolik centimetrů změnilo autíčko polohu vzhledem ke kartonu a o kolik vzhledem k lavici.',
			'Vrať karton na začátek, pásku odlep a karton drž na místě. Posuň autíčko po kartonu přesně o 30 cm a znovu zapiš obě změny polohy.',
			'U každého pokusu rozhodni, zda bylo autíčko vzhledem ke kartonu a vzhledem k lavici v klidu, nebo v pohybu.',
		],
		tabulka: {
			sloupce: ['pokus', 'změna vůči kartonu (cm)', 'klid/pohyb vůči kartonu', 'změna vůči lavici (cm)', 'klid/pohyb vůči lavici'],
			radky: 2,
		},
		otazky: [
			'V prvním pokusu bylo autíčko v klidu vzhledem ke kartonu. Proč přesto bylo v pohybu vzhledem k lavici?',
			'Ke kterému tělesu je cestující sedící v jedoucím vlaku v klidu a ke kterému je v pohybu?',
			'Lze o tělese říct jen „je v klidu“, aniž uvedeme, vzhledem k čemu? Vysvětli.',
		],
		pozor: 'Karton posouvej pomalu po volné lavici, aby autíčko nespadlo na zem.',
		tip: 'Klid a pohyb jsou relativní: vždy musíme uvést těleso, vzhledem ke kterému polohu sledujeme.',
	},
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
	'fyzika/7-rocnik/sily-kolem-nas/sila': {
		nazev: 'Síla a siloměr — visící závaží',
		cil: 'Ověřit, že síla roste úměrně hmotnosti zavěšeného předmětu a jak se síla znázorňuje šipkou.',
		pomucky: ['pružinový siloměr', '3 závaží: 100 g, 200 g, 300 g (nebo stejné sáčky s mincemi)', 'provázek', 'tužka'],
		postup: [
			'Nejprve zkontroluj nulování siloměru. Zavěs na něj jeden 100 g předmět a nech ho jen volně viset.',
			'Připevni provázek k lavici a na něj přivaž přes háček siloměru zátěž 100 g.',
			'Přečti, kolik newtonů (N) ukazuje siloměr, a zapiš do tabulky jako F₁.',
			'Proveďte tři samostatné pokusy: jen s 100 g, pak jen se 200 g, pak jen se 300 g, a vždy odečti sílu F₁, F₂, F₃.',
			'Spočítej podle školního vztahu F = m · g s g = 10 N/kg a porovnej, jak se změnila síla.',
			'Nakresli pro každý pokus vektor síly směřující dolů a zapiš délku šipky podle hodnoty F.',
		],
		tabulka: {
			sloupce: ['hmotnost (g)', 'hmotnost (kg)', 'F (N) změřená', 'F (N) teoretická', 'odchylka (N)'],
			radky: 3,
		},
		otazky: [
			'Proč je orientace šipky síly vždy ve směru působení? Kde je působiště, když visí předmět?',
			'Byla změřená síla pro 300 g přibližně třikrát vyšší než pro 100 g? Proč ne vždy přesně?',
			'Jaká chyba při měření vzniká, když se závaží houpe a siloměrem se kýve?',
		],
		pozor: 'Drž siloměr i závaží klidně a nechej ho přestat kmitat; přetížení přístroje zvyšuje nepřesnost.',
		tip: 'Pro 300 g vyjde školní síla F = 3 N; když je postup konzistentní, měla by být síla téměř trojnásobná proti 100 g.',
	},
	'fyzika/7-rocnik/svetlo-a-jeho-sireni/odraz-svetla': {
		nazev: 'Odraz světla — změříme úhel dopadu a odrazu',
		cil: 'Změřit úhel dopadu a úhel odrazu světelného paprsku a ověřit zákon odrazu.',
		pomucky: ['malé rovinné zrcátko s rovnou hranou', 'stojánek na zrcátko nebo plastelína pro jeho svislé upevnění', 'bílý papír A4', 'tužka', 'pravítko', 'úhloměr', 'lepicí páska', 'školní paprskový zdroj nebo svítilna', 'dva kousky neprůsvitného kartonu pro vytvoření úzké štěrbiny'],
		postup: [
			'Polož papír na lavici. Uprostřed narýsuj přímku a označ na ní bod O. Zrcátko postav svisle hranou přesně na přímku a připevni je páskou, aby se nepohnulo.',
			'V bodě O narýsuj kolmici k zrcátku — normálu. Úhly budeme vždy měřit mezi paprskem a normálou, ne mezi paprskem a zrcátkem.',
			'Pokud nemáš školní paprskový zdroj, zakryj čelo svítilny dvěma kousky kartonu tak, aby mezi nimi zůstala úzká svislá štěrbina. Kartony upevni páskou.',
			'Úhloměrem narýsuj k bodu O první čáru svírající s normálou úhel dopadu 20°. Po této čáře namiř úzký světelný paprsek přesně do bodu O.',
			'Na papíře tužkou označ dva body ve středu odraženého paprsku. Zhasni zdroj, spoj oba body s bodem O a úhloměrem změř úhel odrazu mezi odraženým paprskem a normálou.',
			'Měření zopakuj pro úhly dopadu 40° a 60°. Pro každý pokus zapiš úhel dopadu, úhel odrazu a jejich rozdíl.',
			'Porovnej oba úhly ve všech třech pokusech a napiš vlastní závěr o odrazu světla.',
		],
		tabulka: {
			sloupce: ['pokus', 'úhel dopadu (°)', 'úhel odrazu (°)', 'rozdíl úhlů (°)'],
			radky: 3,
		},
		otazky: [
			'Jsou úhel dopadu a úhel odrazu v mezích přesnosti měření stejné?',
			'Proč měříme oba úhly od normály, a ne od plochy zrcátka?',
			'Jak se změní směr odraženého paprsku vzhledem k normále, když zvětšíš úhel dopadu?',
		],
		pozor: 'Nikdy nesviť spolužákům ani sobě do očí. Použij běžnou svítilnu nebo školní paprskový zdroj, ne laserové ukazovátko.',
		tip: 'Při úhlu dopadu 40° má podle zákona odrazu vyjít také úhel odrazu 40°. Malý rozdíl způsobí šířka paprsku, posunutí zrcátka nebo nepřesné odečtení úhloměru.',
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
	'fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti': {
		nazev: 'Průměrná rychlost Ozobota',
		cil: 'Změřit délku dráhy a čas jízdy robota Ozobota, vypočítat jeho průměrnou rychlost a porovnat sedm drah.',
		pomucky: ['robot Ozobot (kalibrovaný na černé ploše)', 'arch s natištěnou dráhou (7 drah, každá zvlášť)', 'stopky (mobil)', 'provázek nebo měřicí kolečko a pásmo', 'kalkulačka'],
		postup: [
			'Všech sedm drah je přibližně 289 cm dlouhých. Liší se jen tím, kde robot jede rychle (modré kódy) a kde pomalu (červené kódy). Délku dráhy 1 změř provázkem a pásmem a zapiš ji do tabulky v cm.',
			'Postav Ozobota na START dráhy 1. Kamarád spustí stopky ve chvíli, kdy se robot rozjede, a zastaví je v cíli. Čas zapiš na celé sekundy do sloupců t₁, t₂, t₃ (tři jízdy).',
			'Každou dráhu jeď 3× a z časů spočítej průměr do sloupce t (součet tří časů děl třemi, zaokrouhli na desetiny sekundy).',
			'Rychlost spočítej: v = s : t (cm/s). Vyjde-li desetinné číslo, zaokrouhli na desetiny cm/s (například 2,3 cm/s), jinak by dráhy vyšly stejně a nešly by seřadit.',
			'Stejně postupuj na drahách 2 až 7 a v posledním sloupci seřaď dráhy podle rychlosti (1 = nejrychlejší).',
		],
		tabulka: {
			sloupce: ['dráha', 's (cm)', 't₁', 't₂', 't₃', 't (s)', 'v (cm/s)', 'poř.'],
			radky: 7,
		},
		otazky: [
			'Na které dráze byla průměrná rychlost největší? Proč?',
			'Najdi dvě dráhy, které mají stejný počet rychlých úseků. Vyšla ti u nich stejná průměrná rychlost? Zkus vysvětlit proč.',
			'Záleží na tom, v jakém pořadí jsou rychlé a pomalé úseky za sebou?',
			'Robot jel polovinu dráhy rychlostí 6 cm/s a druhou polovinu rychlostí 3 cm/s. Je průměrná rychlost (6 + 3) : 2 = 4,5 cm/s? Zkus dráhu 60 cm + 60 cm: spočítej čas první poloviny, čas druhé poloviny, oba časy sečti a celou dráhu vyděl celkovým časem.',
			'Z drah 1 (celá pomalu) a 5 (celá rychle) urči rychlost robota pomalu a rychle. Předpověz čas jízdy na dráze 3 a pak ho změř. Jak moc se předpověď liší od měření?',
		],
		pozor: 'Ozobota před měřením zkalibruj na černé ploše a dráhu měř provázkem nebo kolečkem, ne pravítkem po kouscích. První barevný kód je až kousek za startem, proto tam robot jede chvíli výchozí rychlostí — drobné odchylky jsou v pořádku. Délka 289 cm je přibližná, tvoje změřená hodnota může být o pár cm jiná.',
		tip: 'Nápověda k otázce 4: spočítej, jak dlouho robot jede každou polovinu dráhy, a pamatuj, že průměrnou rychlost vždy počítáme z celé dráhy a celého času. Na pomalém úseku robot stráví víc času, proto pomalá rychlost „váží“ víc.',
	ke_stazeni: [{ nazev: 'Dráhy pro Ozobota (PDF k vytištění)', href: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/ozobot-drahy.pdf' }],
	},
	'fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor': {
		nazev: 'Pozorujeme školní elektromotor',
		cil: 'Na modelu stejnosměrného elektromotoru najít jeho části (stator, rotor, komutátor, kartáčky) a vlastními slovy vysvětlit, proč se cívka otáčí a proč v otáčení pokračuje.',
		pomucky: ['školní demonstrační model stejnosměrného elektromotoru', 'zdroj malého napětí ovládaný učitelem', 'tužka'],
		postup: [
			'Učitel ukáže model odpojený od zdroje. Nic nezapojuj a nedotýkej se ho. Do prvního řádku tabulky napiš „před ukázkou“ a co na modelu vidíš.',
			'Najdi na modelu stator, rotor (kotvu), komutátor a kartáčky. Co nenajdeš, napiš „není vidět“.',
			'Učitel zapne zdroj a motor se rozběhne. Sleduj z bezpečné vzdálenosti, co se otáčí a co stojí na místě. Do druhého řádku napiš „během ukázky“ a jen to, co opravdu vidíš.',
			'Učitel zdroj vypne. Počkej, až se vše zastaví. Do třetího řádku napiš „po ukázce“ a co vidíš.',
			'Vysvětlení: elektromotor mění elektrickou energii na pohybovou.',
		],
		tabulka: {
			sloupce: ['stav modelu (před / během / po ukázce)', 'co vidím'],
			radky: 3,
		},
		otazky: [
			'Čím se liší stator od rotoru? Která z těchto částí se na modelu otáčela?',
			'Vlastními slovy vysvětli, proč se cívka s proudem v magnetickém poli otáčí.',
			'Co by se stalo, kdyby motor neměl komutátor? Proč by se cívka neotáčela pořád dokola?',
		],
		pozor: 'Pracuj jen s modelem, který připravil učitel, a jen pod jeho dohledem. Zdroj zapíná a vypíná učitel. Nepoužívej síťovou zásuvku, nic nezapojuj a nesahej na pohyblivé části. Když se model zahřívá nebo se chová divně, hned upozorni učitele, ten ukázku zastaví.',
		tip: 'Elektromotory najdeš ve vysavači, v hračkách na baterky i v elektromobilech. Velké motory mají v rotoru víc cívek.',
	},
	'fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb': {
		nazev: 'Posuvný a otáčivý pohyb: kam se dostane který bod',
		cil: 'Na dvou jednoduchých pokusech porovnat, o kolik se přesunou dva různé body tělesa při posuvném a při otáčivém pohybu.',
		pomucky: ['pravítko 30 cm', 'penál nebo sešit', 'list papíru A4', 'tužka', 'lepicí páska'],
		postup: [
			'Posuvný pohyb: papír přilep páskou na lavici. Penál polož na papír a tužkou označ tečkami jeho dva protilehlé rohy A a B.',
			'Penál posuň rovně o asi 20 cm a neotáčej jím. Označ nové polohy rohů A a B. Změř, o kolik cm se posunul každý roh, zaokrouhli na celé cm a zapiš.',
			'Otáčivý pohyb: pravítko polož na druhý papír a jeden konec pevně přitiskni prstem. To je osa otáčení. Na papír vedle pravítka udělej tečky u 5 cm (bod A) a u 15 cm (bod B) od osy.',
			'Pravítko otoč kolem osy zhruba o čtvrt otáčky a znovu označ polohy bodů A a B. Změř vzdálenost mezi starou a novou značkou u každého bodu, zaokrouhli na celé cm a zapiš.',
			'Vysvětlení: posuvný a otáčivý pohyb jsou dva základní jednoduché pohyby. Složitější pohyby se z nich skládají.',
		],
		tabulka: {
			sloupce: ['pohyb (posuvný / otáčivý)', 'bod', 'vzdálenost od osy (cm), u posuvného pohybu napiš „–“', 'o kolik cm se bod přesunul'],
			radky: 4,
		},
		otazky: [
			'Porovnej přesuny rohů A a B při posuvném pohybu penálu. Co z toho vyplývá o bodech tělesa?',
			'U kterého bodu pravítka byl přesun větší, u A nebo u B? Čím to je?',
			'Uveď po jednom příkladu posuvného a otáčivého pohybu z běžného života.',
			'Šroub se zašroubovává do dřeva. Z jakých dvou jednoduchých pohybů se jeho pohyb skládá?',
		],
		pozor: 'Pracuj jen s lehkými předměty na lavici. Při otáčení pravítka dávej pozor na prsty a na oči spolužáka. Tužku drž špičkou od sebe a nesahej s ní blízko k obličeji.',
		tip: 'Pohyb Země je složený ze dvou otáčivých pohybů: Země se otáčí kolem vlastní osy a zároveň obíhá kolem Slunce.',
	},
	'fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila': {
		nazev: 'Gravitační síla: jakou silou Země přitahuje závaží',
		cil: 'Siloměrem změřit gravitační (tíhovou) sílu několika závaží a porovnat ji s pravidlem, že na každých 100 g působí asi 1 N.',
		pomucky: ['siloměr do 5 N', 'tři závaží po 100 g (nebo tři předměty po 100 g)', 'tužka'],
		postup: [
			'Siloměr drž svisle za očko a zkontroluj, že ukazuje 0 N. Když ne, požádej učitele o nastavení.',
			'Na háček siloměru opatrně zavěs jedno závaží 100 g. Počkej, až se zklidní, odečti sílu v N a zaokrouhli na celé číslo. Zapiš do tabulky.',
			'Stejně změř dvě závaží (200 g) a tři závaží (300 g).',
			'Doplň očekávanou sílu podle pravidla: na každých 100 g působí asi 1 N. Porovnej ji s naměřenou.',
			'Vysvětlení: siloměr měří gravitační sílu, kterou Země závaží přitahuje. Váhy měří stejnou sílu a ukazují kilogramy.',
		],
		tabulka: {
			sloupce: ['počet závaží', 'hmotnost (g)', 'naměřená síla (N)', 'očekávaná síla (N)'],
			radky: 3,
		},
		otazky: [
			'Jak se změnila naměřená síla, když se počet závaží zdvojnásobil a ztrojnásobil?',
			'Souhlasí naměřené hodnoty s očekávanými? Čím může vzniknout rozdíl?',
			'Jakou gravitační silou přitahuje Země těleso o hmotnosti 5 kg? Použij Fg = m · g a g = 10 N/kg.',
			'Na Měsíci je gravitační síla na 1 kg zhruba 6krát menší než na Zemi. Změnila by se tam hmotnost závaží? Změnila by se naměřená síla?',
		],
		pozor: 'Nepřetěžuj siloměr, nepřekračuj jeho rozsah 5 N. Závaží nepouštěj a nehoupej s nimi, ať nespadnou na nohy ani na přístroj. Pracuj nad lavicí, ne nad hlavou.',
		tip: 'Gravitační síla Země působí i na padající tělesa. Míč nebo jablko, které pustíš, proto padá svisle dolů, ke středu Země.',
	},
	'fyzika/7-rocnik/sily-kolem-nas/treci-sila': {
		nazev: 'Třecí síla: kdy se těžko táhne a kdy lehce',
		cil: 'Siloměrem změřit sílu potřebnou k tažení tělesa po dvou površích a s různým přítlakem a porovnat výsledky.',
		pomucky: ['siloměr do 5 N', 'školní dřevěný hranol do 200 g', 'dvě závaží po 100 g', 'lavice a gumová podložka', 'tužka'],
		postup: [
			'Hranol polož na lavici a připoj k němu siloměr. Drž ho vodorovně.',
			'Táhni hranol pomalu a stále stejně rychle. Odečti sílu v N na nejbližší dílek. Měření třikrát zopakuj a zapiš střední hodnotu.',
			'Stejně změř tažení hranolu po gumové podložce.',
			'Na hranol polož obě závaží a změř tažení po lavici znovu.',
			'Vysvětlení: třecí síla vzniká mezi povrchy, které po sobě kloužou, a působí proti směru pohybu.',
		],
		tabulka: {
			sloupce: ['povrch', 'přítlak (hranol / hranol + závaží)', 'síla při tažení (N)'],
			radky: 3,
		},
		otazky: [
			'Na kterém povrchu byla potřebná síla větší? Čím to je?',
			'Jak se změnila síla, když jsi hranol zatížil závažím? Proč?',
			'Napiš dva příklady, kdy je tření užitečné, a dva, kdy nám překáží.',
			'Uveď dva způsoby, jak se tření zmenšuje.',
		],
		pozor: 'Pracuj na pevné lavici. Dbej, aby hranol nespadl na nohy. Siloměr netrhej a nepřekračuj jeho rozsah 5 N. Povrchy nenamáčej vodou ani olejem, aby nikdo neuklouzl.',
		tip: 'Klidové tření bývá zhruba dvakrát větší než smykové. Poznáš to při tlačení těžké skříně: nejtěžší je ji rozhýbat.',
	},
	'fyzika/7-rocnik/jednoduche-stroje/pusobeni-teles-a-deformace': {
		nazev: 'Deformace: co se vrátí a co ne',
		cil: 'Na několika běžných předmětech pozorovat, jak se mění jejich tvar po působení síly, a roztřídit je podle toho, zda se tvar po uvolnění vrátí.',
		pomucky: ['kuchyňská houbička', 'kousek modelíny', 'pryžová gumička', 'plastové pravítko', 'tužka'],
		postup: [
			'Houbičku stlač prsty a pak ji pusť. Do tabulky napiš, co se stalo s jejím tvarem.',
			'Stejně zmáčkni kousek modelíny a pusť ho. Zapiš, jaký má tvar po uvolnění.',
			'Gumičku opatrně natáhni mezi prsty (nestřílej s ní) a pusť. Zapiš výsledek.',
			'Pravítko lehce prohni a pusť. Neohýbej ho tolik, aby prasklo. Zapiš výsledek.',
			'Vysvětlení: síla může těleso nejen posunout nebo otočit, ale také změnit jeho tvar. Tomu říkáme deformace.',
		],
		tabulka: {
			sloupce: ['předmět', 'co jsem s ním udělal', 'tvar po uvolnění', 'pružná nebo trvalá deformace'],
			radky: 4,
		},
		otazky: [
			'Které předměty se po uvolnění vrátily do původního tvaru a které ne?',
			'Uveď po jednom dalším příkladu z domova, který se po zmáčknutí vrátí do původního tvaru, a který ne.',
			'Auto po nárazu zůstane pomačkané. O jakou deformaci jde?',
		],
		pozor: 'Pravítko neohýbej do prasknutí, mohou odletět střepy. Gumičku nestřílej na spolužáky a nenatahuj ji k obličeji. Po pokusu si umyj ruce od modelíny.',
		tip: 'Tenisový míček se při odpalu silně stlačí a pak se vrátí do kulatého tvaru.',
	},
	'fyzika/7-rocnik/tlak-v-kapalinach/tlak': {
		nazev: 'Tlak: stejná síla, různá plocha',
		cil: 'Zjistit, jak se mění účinek stejné tlakové síly, když těleso působí na větší nebo na menší plochu.',
		pomucky: ['školní dřevěný hranol', 'modelína rozválená do tloušťky 2 cm', 'pravítko', 'tužka'],
		postup: [
			'Pravítkem změř tři hrany hranolu v celých cm. Spočítej plochu největší a nejmenší stěny v cm² a zapiš do tabulky.',
			'Hranol polož největší stěnou na modelínu. Zatlač na něj dlaní shora středně silně po dobu 5 s a opatrně ho sundej. Do tabulky slovy napiš, jak hluboký je otisk (žádný, mělký, hluboký).',
			'Hranol polož nejmenší stěnou na jiné místo modelíny a zatlač dlaní stejně silně jako v kroku 2. Zapiš, jak hluboký je otisk.',
			'Vysvětlení: tlak vyjadřuje, jak moc je tlaková síla soustředěná na ploše. Počítá se podle vzorce p = F : S, kde S je plocha v m². Z naměřených hodnot tlak nepočítáme.',
		],
		tabulka: {
			sloupce: ['stěna hranolu', 'plocha S (cm²)', 'otisk v modelíně (žádný / mělký / hluboký)'],
			radky: 2,
		},
		otazky: [
			'Byla tlaková síla u obou stěn stejná? Co se při přeložení změnilo?',
			'Ve kterém případě byl otisk hlubší? Čím to je?',
			'Jedna stěna má plochu 40 cm², druhá 10 cm². Kolikrát je druhá plocha menší? Kolikrát větší bude tlak při stejné síle?',
			'Vypočítej tlak: síla 20 N působí kolmo na plochu 2 m². Použij p = F : S.',
			'Proč mají lyže a sněžnice široký tvar a hřebík špičku?',
		],
		pozor: 'Hranol nepouštěj z výšky, ať nespadne na nohy. Tlač jen dlaní, ne špičatým předmětem. Pracuj jen s tupými předměty, nepoužívej hřebíky ani špendlíky. Po pokusu si umyj ruce od modelíny.',
		tip: 'Když se člověk propadne na tenkém ledu, doporučuje se přesunovat se po čtyřech nebo vleže.',
	},
	'fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/atmosfericky-tlak': {
		nazev: 'Atmosférický tlak: sklenice, která nevylije vodu',
		cil: 'Dvěma jednoduchými pokusy pozorovat, že vzduch kolem nás působí tlakem, a použít pravidlo o poklesu tlaku s výškou.',
		pomucky: ['plastová sklenice nebo kelímek', 'kus tvrdého papíru větší než ústí sklenice', 'voda', 'dřez nebo mísa', 'přísavka (například z koupelny)', 'hladká dlaždice nebo hladký stůl'],
		postup: [
			'Nad dřezem naplň sklenici vodou až po okraj. Na ústí polož papír tak, aby těsně přiléhal bez bublin.',
			'Papír podrž dlaní a sklenici rychle otoč dnem vzhůru. Opatrně dlaň oddal a pozoruj. Zapiš, co se stalo.',
			'Přísavku navlhči a přitiskni na hladkou plochu. Zkus ji za držátko odtrhnout. Zapiš, jak se to dařilo.',
			'Okraj přísavky zvedni nehtem, aby pod ni vnikl vzduch. Zapiš, co se stalo.',
			'Vysvětlení: atmosféra je vzduchový obal Země. Tlak vzduchu v ní se nazývá atmosférický tlak.',
		],
		tabulka: {
			sloupce: ['pokus', 'co jsem pozoroval(a)'],
			radky: 3,
		},
		otazky: [
			'Co drželo papír na sklenici? Odkud na něj ta síla působila?',
			'Proč se přísavka těžko odtrhávala a co se stalo po vpuštění vzduchu pod okraj?',
			'Tlak vzduchu klesá přibližně o 1 hPa na každých 8 m výšky. O kolik hPa bude menší tlak na rozhledně o 80 m vyšší než u její paty?',
			'Normální tlak je asi 1 013 hPa. Kolik je to Pa? Použij 1 hPa = 100 Pa.',
		],
		pozor: 'Pokus dělej nad dřezem nebo mísou, aby se voda nevylila na lavici ani na elektroniku. Používej plastovou sklenici, ne skleněnou. Při odtrhávání přísavky nesmí nikdo stát v cestě.',
		tip: 'Tlak vzduchu se měří barometrem. Vysoký tlak obvykle ohlašuje pěkné počasí a nízký tlak srážky a vítr.',
	},
	'fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/meteorologie-a-mereni-tlaku': {
		nazev: 'Naše malá meteorologická stanice',
		cil: 'Několik dní sledovat počasí jako meteorologové a zapisovat údaje do tabulky.',
		pomucky: ['venkovní teploměr', 'průhledná válcová nádoba s rovným dnem (například plastová láhev s odříznutým hrdlem)', 'pravítko', 'kompas nebo mobil s kompasem', 'proužek lehké látky na tyčce', 'tužka'],
		postup: [
			'Vyber s učitelem volné místo venku, kde nestojí překážky a není přímé slunce. Teploměr umísti do stínu.',
			'Nádobu postav na rovný podklad, aby zachytila déšť. Je to tvůj srážkoměr.',
			'Každý den ve stejnou dobu odečti teplotu na celé stupně a zapiš ji do tabulky.',
			'Do srážkoměru změř pravítkem výšku vody v mm, zaokrouhli na celé mm a pak vodu vylij. Oblačnost zapiš slovy: jasno, polojasno nebo zataženo.',
			'Podle proužku látky a kompasu urči, odkud vítr fouká. Vysvětlení: meteorologové měří teplotu, tlak vzduchu, vítr, vlhkost, oblačnost i srážky, aby mohli předpovídat počasí.',
		],
		tabulka: {
			sloupce: ['den', 'teplota (°C)', 'srážky (mm)', 'oblačnost', 'odkud fouká vítr'],
			radky: 5,
		},
		otazky: [
			'Které veličiny jsi měřil(a) a které jsi jen pozoroval(a)?',
			'Spadlo 5 mm srážek a druhý den 3 mm. Kolik mm srážek spadlo za oba dny dohromady?',
			'Proč se teploměr umisťuje do stínu a na volné místo bez překážek?',
			'Teplý vzduch stoupá vzhůru. Jaký tlak vznikne u země a kam pak proudí vzduch z okolí?',
		],
		pozor: 'Měření dělej jen na bezpečných místech u školy nebo doma, nikdy na střeše ani u silnice. Použij plastovou nádobu, ne skleněnou. Při bouřce nechoď ven.',
		tip: 'Tlak vzduchu se měří barometrem. Když tlak klesá, počasí se často mění k horšímu, srážkám a větru.',
	},
	'fyzika/8-rocnik/tepelne-motory/tepelny-motor-parni-stroj': {
		nazev: 'Teplo, které točí: papírová spirála',
		cil: 'Pozorovat papírovou spirálu nad zdrojem tepla a porovnat dvě vzdálenosti od plamene.',
		pomucky: ['papírový kruh o průměru 10 cm', 'nůžky', 'nit 50 cm', 'tužka na zavěšení', 'svíčka v nehořlavém svícnu', 'sirky pro učitele', 'hodinky nebo stopky'],
		postup: [
			'Z papírového kruhu vystřihni od okraje spirálu s pruhem širokým asi 1 cm. Do středu uvaž nit.',
			'Nit s tužkou připevni tak, aby spirála visela 40 cm nad místem, kde bude stát svíčka. Svíčku zatím nezapaluj.',
			'Učitel svíčku zapálí. Pozoruj spirálu 10 s a spočítej počet otáček. Zapiš do tabulky.',
			'Učitel spirálu spustí na 25 cm nad plamenem. Znovu počítej otáčky 10 s a zapiš.',
			'Vysvětlení: stroj, který mění teplo na pohyb, se nazývá tepelný motor.',
		],
		tabulka: {
			sloupce: ['vzdálenost nad plamenem (cm)', 'počet otáček za 10 s', 'poznámka'],
			radky: 2,
		},
		otazky: [
			'Co se otáčelo a co to roztáčelo?',
			'Při které vzdálenosti se spirála točila rychleji? Čím to je?',
			'James Watt (1784) přeměnil pohyb pístu tam a zpět na otáčení kola. Jakou součástku k tomu použil?',
			'Účinnost parního stroje je asi 15 %. Kolik ze 100 J energie paliva se přemění na pohyb?',
		],
		pozor: 'Svíčku zapaluje jen učitel. Dej dlouhé vlasy za uši, nenoš volné rukávy. Spirála nesmí do plamene a papír nesmí hořet. Svíčku postav na nehořlavou podložku a nechej ji pod dohledem. Po pokusu ji učitel uhasí.',
		tip: 'Hérón z Alexandrie vymyslel první parní stroj už v 1. století. Používal ho jen jako hračku pro diváky.',
	},
	'fyzika/8-rocnik/tepelne-motory/spalovaci-motory': {
		nazev: 'Stlačování vzduchu jako ve válci motoru',
		cil: 'Pomocí stříkačky bez jehly vyzkoušet stlačování vzduchu a spočítat změnu objemu.',
		pomucky: ['plastová stříkačka 20 ml bez jehly', 'pravítko nebo stupnice na stříkačce', 'tužka'],
		postup: [
			'Píst stříkačky vytáhni na 20 ml. Zapiš objem do prvního řádku tabulky.',
			'Prstem pevně ucpi otvor stříkačky a tlač na píst, jak to půjde. Odečti objem v celých ml a zapiš.',
			'Zapiš, jak velkou sílu cítíš na pístu. Pak píst pusť, otvor stále ucpávej a sleduj, co píst udělá.',
			'Totéž zopakuj z 10 ml na druhém řádku tabulky.',
			'Vysvětlení: spalovací motor spaluje palivo uvnitř válce a mění chemickou energii na pohybovou.',
		],
		tabulka: {
			sloupce: ['pokus', 'objem před (ml)', 'objem po stlačení (ml)', 'síla na pístu (malá / větší / velká)', 'co se stalo po puštění pístu'],
			radky: 2,
		},
		otazky: [
			'Vzduch ve stříkačce se stlačil z 20 ml na 5 ml. Kolikrát se zmenšil jeho objem?',
			'Co by se stalo s teplotou vzduchu při prudkém stlačení? Který motor to využívá k zapálení paliva?',
			'Napiš v pořadí čtyři takty zážehového čtyřtaktního motoru.',
			'Který takt čtyřtaktního motoru je pracovní a proč?',
		],
		pozor: 'Používej jen stříkačku bez jehly. Nestříkej vzduch ani vodu spolužákům do obličeje a neucpávej si otvor stříkačky ústy ani nosem. Píst netlač prudce, ať stříkačka nepraskne.',
		tip: 'Motory musí být chlazené a mazané. U dvoutaktů se olej přidává přímo do benzínu.',
	},
	'fyzika/8-rocnik/teplo-a-zmeny-skupenstvi/teplo-a-premeny-skupenstvi': {
		nazev: 'Led a čokoláda v teplé vodě',
		cil: 'Pozorovat změnu skupenství dvou látek při dodávání tepla a porovnat, jak se jejich tvar mění v čase.',
		pomucky: ['kostka ledu', 'kousek čokolády', 'dvě mističky s teplou vodou připravenou učitelem (asi 40 °C)', 'teploměr', 'stopky nebo hodinky', 'tužka'],
		postup: [
			'Učitel připraví do obou mističek teplou vodu z kohoutku, ne horkou. Teploměrem změř její teplotu v celých °C a zapiš.',
			'Do jedné mističky polož kostku ledu a do druhé kousek čokolády. Spusť stopky.',
			'Po 3 minutách a po 6 minutách popiš do tabulky tvar obou vzorků: pevný, měkký, kapalný.',
			'Po 6 minutách znovu změř teplotu vody v obou mističkách a zapiš do příslušných sloupců.',
			'Vysvětlení: při dodávání tepla se částice látky pohybují rychleji a pevná látka se mění na kapalnou.',
		],
		tabulka: {
			sloupce: ['čas (min)', 'led: tvar', 'čokoláda: tvar', 'teplota vody s ledem (°C)', 'teplota vody s čokoládou (°C)'],
			radky: 3,
		},
		otazky: [
			'Která skupenství měl led na začátku a na konci pokusu?',
			'Který ze vzorků měkl postupně a který měl jasné rozhraní mezi pevnou a kapalnou látkou? Jak se takové látky nazývají?',
			'Co se děje s rychlostí částic, když látce dodáváme teplo?',
			'Jak se jmenuje změna pevné látky přímo na plyn? Uveď příklad.',
		],
		pozor: 'Používej jen teplou vodu z kohoutku, nikdy horkou z konvice. Čokoládu nejez, pokus se dělá v laboratoři. Rozlitou vodu hned utři, aby nikdo neuklouzl.',
		tip: 'Led, voda a vodní pára jsou tři skupenství téže látky. Mají stejné částice, liší se jen jejich pohybem a silami mezi nimi.',
	},
	'fyzika/8-rocnik/elektrina/elektricky-naboj': {
		nazev: 'Elektrování balonků: přitahování a odpuzování',
		cil: 'Zelektrovat balonky třením a pozorovat, jak se nabitá tělesa přitahují a odpuzují.',
		pomucky: ['dva nafouknuté balonky', 'vlněná látka nebo svetr', 'dvě nitě po 50 cm', 'papír nastříhaný na kousky 1 cm', 'pravítko', 'tužka'],
		postup: [
			'Balonek třicetkrát otři o vlněnou látku. Přibliž ho na 2 cm k hromádce papírků. Spočítej, kolik papírků se zvedlo, a zapiš.',
			'Dva neotřené balonky zavěs na nitě. Nitě drž v ruce 5 cm od sebe tak, aby balonky visely vedle sebe a nedotýkaly se. Změř vzdálenost mezi balonky v celých cm a zapiš.',
			'Oba balonky stejně otři o vlněnou látku a zase je zavěs vedle sebe. Změř vzdálenost mezi balonky v celých cm a zapiš. Pozoruj, jestli se balonky přitahují, odpuzují, nebo se nic neděje.',
			'Vysvětlení: při tření se elektrony přesunou z jednoho tělesa na druhé. Těleso se tak zelektrizuje.',
		],
		tabulka: {
			sloupce: ['pokus', 'počet papírků nebo vzdálenost balonků (cm)', 'pozorování'],
			radky: 3,
		},
		otazky: [
			'Měly papírky před přiblížením balonku elektrický náboj? Co se s nimi stalo po přiblížení balonku?',
			'Co se stalo s dvěma stejně zelektrizovanými balonky? Jak se chovají stejné náboje?',
			'Jaké dva druhy elektrického náboje existují? Které částice atomu je nesou?',
			'Jak se dá nabité těleso vybít a k čemu to slouží u bleskosvodu?',
		],
		pozor: 'Pokus dělej v suché místnosti. Balonky nenafukuj spolužákům s alergií na latex a zbytky prasklého balonku neber do úst. Nabité balonky nepřibližuj k počítači ani k jiné elektronice.',
		tip: 'Při česání přejdou elektrony z vlasů na plastový hřeben. Hřeben se nabije záporně a vlasy kladně.',
	},
	'fyzika/8-rocnik/elektrina/ohmuv-zakon': {
		nazev: 'Ohmův zákon: proud a napětí na rezistoru',
		cil: 'Změřit proud rezistorem při třech různých napětích a ověřit, jak spolu proud a napětí souvisí.',
		pomucky: ['šest tužkových baterií AA s držáky (jeden držák na každou baterii)', 'rezistor 300 Ω na zatížení aspoň 0,5 W', 'ampérmetr s rozsahem aspoň 100 mA', 'voltmetr', 'vodiče', 'tužka'],
		postup: [
			'Obvod zapoj podle schématu učitele nejdřív se dvěma bateriemi za sebou. Ampérmetr patří do série s rezistorem, voltmetr paralelně k němu. Zapojení nech zkontrolovat učitelem a teprve potom obvod uzavři.',
			'Odečti napětí na voltmetru a proud v mA. Zapiš je do tabulky.',
			'Odpoj obvod a zapoj čtyři baterie za sebou, potom šest baterií za sebou. Vždy nech zapojení zkontrolovat učitelem, odečti napětí i proud a zapiš.',
			'Obvod odpoj. Do posledních dvou sloupců napiš, kolikrát je napětí a proud větší než v prvním řádku, zaokrouhleno na celé číslo.',
			'Vysvětlení: napětí a proud ve vodiči spolu souvisí. Tuto závislost prokázal roku 1826 německý fyzik Georg Simon Ohm.',
		],
		tabulka: {
			sloupce: ['počet baterií', 'napětí U (V)', 'proud I (mA)', 'kolikrát větší U než v 1. řádku', 'kolikrát větší I než v 1. řádku'],
			radky: 3,
		},
		otazky: [
			'Co zjistíš, když porovnáš poslední dva sloupce tabulky?',
			'Co by se stalo s proudem při stejném napětí, kdyby rezistor měl větší odpor?',
			'Rezistorem teče proud 2 A při napětí 10 V. Jaký má odpor? Použij R = U : I.',
			'Proč Ohmův zákon neplatí pro žárovku těsně po zapnutí?',
		],
		pozor: 'Používej jen tužkové baterie, nikdy síťovou zásuvku ani jiný zdroj. Zapojení přepojuj jen při odpojeném obvodu a zapni ho až po kontrole učitelem. Baterie nezkratuj vodičem. Při zahřívání rezistoru nebo zápachu obvod hned odpoj a zavolej učitele.',
		tip: 'Rezistory se vyrábějí ze slitiny konstantan, jejíž odpor se s teplotou téměř nemění. Ohmův zákon v nich proto platí velmi dobře.',
	},
	'fyzika/8-rocnik/zvuk/zvuk-vznik-a-sireni': {
		nazev: 'Pravítko, které zpívá: vznik a šíření zvuku',
		cil: 'Pozorovat chvění tělesa jako zdroj zvuku, zjistit, jak výška tónu závisí na délce kmitající části, a porovnat šíření zvuku vzduchem a lavicí.',
		pomucky: ['plastové nebo dřevěné pravítko 30 cm', 'lavice s pevným okrajem', 'pravítko na měření', 'tužka'],
		postup: [
			'Pravítko přitiskni dlaní k okraji lavice tak, aby z lavice přečnívalo 20 cm. Volný konec ohni dolů a pusť. Sleduj pravítko a poslouchej.',
			'Přečnívající část zkrať na 15 cm a pak na 10 cm. Pokaždé konec ohni a pusť. Do tabulky napiš vlastními slovy, co vidíš a jaký je tón.',
			'Ucho přitiskni na lavici. Spolužák škrábne prstem na lavici asi 1 m od tebe. Pak ucho zvedni a poslouchej totéž přes vzduch. Zapiš rozdíl.',
			'Vysvětlení: zvuk vzniká chvěním těles.',
		],
		tabulka: {
			sloupce: ['pokus', 'přečnívající délka (cm)', 'co vidím a slyším'],
			radky: 4,
		},
		otazky: [
			'Jak se měnil tón, když se přečnívající část zkracovala?',
			'Kde jsi zvuk slyšel lépe, přes lavici, nebo přes vzduch? Čím to je?',
			'Zvuk se ve vzduchu šíří rychlostí 340 m/s. Jak daleko dolétne za 2 s?',
			'Může se zvuk šířit ve vakuu? Proč?',
		],
		pozor: 'Pravítko neohýbej do prasknutí. Do lavice neklepej silně a zvukem nepřetěžuj sluch spolužáka. Ucho ke zdroji zvuku jen přikládej, nic do něj nestrkej.',
		tip: 'Lidské ucho slyší zvuk přibližně od 16 Hz do 16 000 Hz. Pomalejší chvění je infrazvuk a rychlejší ultrazvuk.',
	},
	'fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce': {
		nazev: 'Magnet a cívka: kdy vzniká napětí',
		cil: 'Pozorovat, co se děje na cívce při různých pohybech magnetu, a porovnat výchylky.',
		pomucky: ['školní cívka', 'galvanometr nebo voltmetr s nulou uprostřed stupnice a rozsahem v mV', 'tyčový magnet', 'dva vodiče', 'tužka'],
		postup: [
			'Cívku připoj vodiči k galvanometru s nulou uprostřed stupnice. Magnet drž v klidu těsně u cívky a zapiš, kam ukazuje ručička.',
			'Magnet rychle zasuň do cívky. Zapiš největší výchylku v dílcích a směr výchylky (doprava, doleva).',
			'Magnet nech v cívce a pozoruj ručičku. Potom ho rychle vytáhni a zapiš výchylku a směr.',
			'Magnet zasuň do cívky pomalu a znovu zapiš výchylku. Pak totéž zopakuj opačným pólem magnetu napřed.',
			'Zajímavost: jev, který pozoruješ, objevil anglický fyzik Michael Faraday.',
		],
		tabulka: {
			sloupce: ['pohyb magnetu', 'rychlost (rychle / pomalu / v klidu)', 'výchylka (dílky)', 'směr výchylky'],
			radky: 6,
		},
		otazky: [
			'Kdy se ručička vychýlila a kdy ne?',
			'Jak souvisí výchylka s rychlostí pohybu magnetu?',
			'Co se stalo se směrem výchylky při zasouvání a při vytahování magnetu?',
			'Na jakou energii se přeměnila pohybová energie magnetu?',
		],
		pozor: 'Použij běžný školní magnet, ne silný neodymový. Magnety nenech prudce srazit a chraň prsty. Magnet nedávej k elektronice ani ke zdravotnímu implantátu. Když máš implantát, nech pokus dělat spolužáka.',
		tip: 'Indukční princip využívají třeba dynamo, indukční vařiče nebo bezdrátové nabíječky.',
	},
	'fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator': {
		nazev: 'Ruční alternátor: střídavé napětí z otáčení',
		cil: 'Pomocí školního ručního alternátoru pozorovat napětí a svit LED diod při otáčení kliky.',
		pomucky: ['školní ruční alternátor s klikou', 'dvě LED diody zapojené proti sobě, každá s ochranným rezistorem 330 Ω (nebo hotový LED modul)', 'voltmetr pro střídavé napětí na rozsahu 10 V', 'vodiče', 'hodinky nebo stopky'],
		postup: [
			'Učitel zapojí alternátor, dvě LED diody s ochrannými rezistory proti sobě a voltmetr. Žák sleduje obvod, nic nepřepojuje.',
			'Klikou otáčej pomalu, asi jednu otáčku za sekundu. Po dobu 10 s spočítej otáčky a zapiš největší napětí, které voltmetr ukáže. Zapiš, které LED svítí.',
			'Klikou otáčej rychleji. Opět počítej otáčky za 10 s, zapiš největší napětí a které LED svítí. Při rychlém otáčení mohou svítit obě LED zároveň.',
			'Klikou přestaň otáčet a zapiš napětí a které LED svítí.',
			'Vysvětlení: v alternátoru se při otáčení využívá elektromagnetická indukce.',
		],
		tabulka: {
			sloupce: ['otáčení', 'počet otáček za 10 s', 'největší napětí (V)', 'které LED svítí'],
			radky: 3,
		},
		otazky: [
			'Co se stalo s napětím, když jsi otáčel rychleji, a co, když jsi přestal otáčet?',
			'Co dělaly obě LED diody při pomalém otáčení? Co se v obvodu pravidelně měnilo?',
			'Na jakou energii se v alternátoru mění pohybová energie otáčení?',
			'Která část alternátoru se otáčí a která stojí na místě?',
		],
		pozor: 'Zapojení připravuje učitel, nikdy nepoužívej síťovou zásuvku. Klikou netoč prudce a neotáčej s ní, když ji někdo drží. Při zahřívání nebo zápachu hned přestaň a zavolej učitele.',
		tip: 'Alternátory jsou v elektrárnách, v autech i v elektrocentrálách. V autě nabíjí akumulátor při jízdě.',
	},
	'fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu': {
		nazev: 'Perioda a frekvence: otáčíme alternátorem',
		cil: 'Z počtu otáček ručního alternátoru za změřený čas určit frekvenci a periodu a procvičit vztah mezi nimi.',
		pomucky: ['školní ruční alternátor s klikou', 'stopky nebo hodinky', 'pomocník na počítání otáček', 'tužka'],
		postup: [
			'Alternátor je zapojený učitelem a žák s ním nic nepřepojuje. Pomocník sleduje čas, ty otáčej klikou rovnoměrně.',
			'Otoč klikou přesně 20 otáček a pomocník změří čas v celých sekundách. Zapiš ho do tabulky.',
			'Frekvenci spočítej jako počet otáček dělený časem (20 : čas) a zaokrouhli na celé Hz. Periodu (čas jedné otáčky) spočítej jako čas : 20 a také zaokrouhli.',
			'Pokus zopakuj s rychlejším otáčením a znovu vyplň tabulku.',
			'Vysvětlení: perioda je nejkratší doba, za kterou se střídavý proud opakuje, a frekvence je počet opakování za 1 sekundu.',
		],
		tabulka: {
			sloupce: ['otáčení', 'počet otáček', 'čas (s)', 'frekvence f (Hz)', 'perioda T (s)'],
			radky: 2,
		},
		otazky: [
			'Jak se změnila frekvence, když jsi točil rychleji? Jak se změnila perioda?',
			'Cívka alternátoru udělá 2 otáčky za 1 s. Jaká je frekvence a kolik period proběhne za 10 s?',
			'Jaké napětí a jakou frekvenci má střídavý proud v rozvodné síti?',
			'Žárovka při střídavém proudu nezhasne, i když je proud v některém okamžiku nulový. Proč?',
		],
		pozor: 'Zapojení připravuje učitel, nikdy nepoužívej síťovou zásuvku. Klikou netoč prudce a neotáčej s ní, když ji někdo drží. Při zahřívání nebo zápachu hned přestaň a zavolej učitele.',
		tip: 'V rozvodné síti se střídavý proud mění padesátkrát za sekundu. Voltmetry proto ukazují efektivní hodnotu.',
	},
	'fyzika/9-rocnik/indukce-a-stridavy-proud/transformator': {
		nazev: 'Transformátor: kolikrát se změní napětí',
		cil: 'Změřit napětí na primární a sekundární cívce školního transformátoru a porovnat poměr napětí s poměrem počtu závitů.',
		pomucky: ['školní demonstrační transformátor se vyměnitelnými cívkami 300 a 600 závitů', 'školní zdroj střídavého napětí do 8 V', 'voltmetr pro střídavé napětí', 'vodiče', 'tužka'],
		postup: [
			'Zapojení připravuje učitel. Na primární cívku s 300 závity připojí zdroj střídavého napětí 4 V. Na sekundární cívku s 600 závity připojí voltmetr.',
			'Zapni zdroj, odečti napětí U1 na primární a U2 na sekundární cívce a zapiš. Zdroj vypni.',
			'Učitel vymění cívky tak, aby obě měly po 300 závitech. Znovu odečti U1 a U2 a zapiš.',
			'Učitel zapojí primární cívku s 600 závity na 8 V a sekundární s 300 závity. Odečti U1 a U2 a zapiš.',
			'Vysvětlení: transformátor slouží k přenosu elektrické energie a ke změně velikosti napětí.',
		],
		tabulka: {
			sloupce: ['závity primární N1', 'závity sekundární N2', 'napětí U1 (V)', 'napětí U2 (V)'],
			radky: 3,
		},
		otazky: [
			'Porovnej poměr N2 : N1 a poměr U2 : U1 v prvním řádku. Co zjistíš?',
			'Ve kterém řádku napětí vzrostlo a ve kterém kleslo? Jak se tomu říká?',
			'Proč transformátor nepracuje na stejnosměrné napětí?',
			'Primární cívka má 100 závitů, sekundární 300 závitů a napětí na primární je 10 V. Jaké bude napětí na sekundární?',
		],
		pozor: 'Pracuj jen se zdrojem, který nastavil učitel, na nejvýš 8 V. Nikdy nepřipojuj transformátor k síťové zásuvce. Přepojuj jen při vypnutém zdroji. Při zahřívání nebo zápachu hned vypni zdroj a zavolej učitele.',
		tip: 'Nabíječky mobilů obsahují transformátor, který snižuje napětí ze zásuvky 230 V.',
	},
	'fyzika/9-rocnik/elektricky-proud-v-latkach/prenos-elektricke-energie': {
		nazev: 'Od elektrárny do zásuvky: štítky spotřebičů',
		cil: 'Z údajů na štítcích spotřebičů zjistit napětí a příkon a spočítat proud, který spotřebiče odebírají, a porovnat to s přenosem energie vysokým napětím.',
		pomucky: ['tři vypnuté a od sítě odpojené spotřebiče se štítkem (například konvice, žehlička, nabíječka)', 'kalkulačka', 'tužka'],
		postup: [
			'Spotřebiče nezapínej a ujisti se, že nejsou zapojené do zásuvky. Najdi na každém štítek s údaji.',
			'Do tabulky opiš název spotřebiče, napětí v V a příkon ve W.',
			'Proud spočítej jako příkon dělený napětím (P : U). Výsledek zaokrouhli na celé A a zapiš.',
			'Vysvětlení: elektrická energie se z elektrárny přenáší vedením a transformátory do domácností a firem.',
		],
		tabulka: {
			sloupce: ['spotřebič', 'napětí U (V)', 'příkon P (W)', 'proud I = P : U (A)'],
			radky: 3,
		},
		otazky: [
			'Který spotřebič odebíral největší proud? Čím to je?',
			'Přenáší se výkon 2 300 000 W. Jaký proud teče vedením při napětí 230 000 V a jaký při 23 000 V? Použij I = P : U.',
			'Které z obou vedení z otázky 2 má menší ztráty energie? Proč se tedy přenáší vysokým napětím?',
			'Kolik fázových vodičů má vedení z elektrárny a jaké je napětí mezi fázovým vodičem a zemí?',
		],
		pozor: 'Spotřebiče měj po celou dobu odpojené od zásuvky. Nerozebírej je a nesahej do zásuvek. Pracuj jen s tím, co ti schválil učitel.',
		tip: 'Velké stroje, třeba míchačka nebo cirkulárka, využívají všechny tři fáze.',
	},
};

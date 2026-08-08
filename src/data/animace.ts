// VYROBENO SKRIPTEM Omega/skripty/animace_na_web.py — needitovat ručně.
// Popisky se píšou do Omega/skripty/data/animace-popisy.json.

export type Animace = {
	klic: string;
	nazev: string;
	rocnik: number;
	delka: number;
	cesta: string;
	ukazuje: string;
	zeptat: string;
	kotva: string;
	/** klíč podtématu, pod jehož výkladem se animace ukáže */
	podtema?: string;
};

export const animace: Animace[] = [
	{
		klic: 'brownuv_pohyb',
		nazev: 'Brownův pohyb',
		rocnik: 6,
		delka: 9.0,
		cesta: '/media/fyzika/animace/brownuv_pohyb.mp4',
		ukazuje: 'Pylové zrnko ve vodě poskakuje sem a tam, aniž do něj kdokoli fouká. Za zrnkem se kreslí jeho dráha.',
		zeptat: 'Proč se zrnko hýbe, když se s vodou nic nedělá? A urazilo víc cesty, nebo se víc posunulo?',
		kotva: 'Zrnko se nehýbe náhodně — počítají se skutečné nárazy molekul. Dráha vyšla 1091 px proti posunu 156 px, tedy sedmkrát delší.',
		podtema: 'casticove-slozeni-latek',
	},
	{
		klic: 'castice_teplota',
		nazev: 'Zahřátí zrychlí pohyb částic',
		rocnik: 6,
		delka: 10.0,
		cesta: '/media/fyzika/animace/castice_teplota.mp4',
		ukazuje: 'Dvě stejné nádoby: levá zůstává studená, pravá se zahřívá z 0 na 100 °C a její částice zrychlují. Pruh dole měří průměrnou rychlost.',
		zeptat: 'O kolik se pohyb zrychlí, když se voda ohřeje z nuly na sto stupňů? Je to dvojnásobek?',
		kotva: 'Rychlost roste s odmocninou absolutní teploty, tedy jen o 17 %. Naměřený poměr 1,171 proti spočtenému 1,169 — animace to schválně nezveličuje.',
		podtema: 'casticove-slozeni-latek',
	},
	{
		klic: 'difuze',
		nazev: 'Difuze v plynu',
		rocnik: 6,
		delka: 12.5,
		cesta: '/media/fyzika/animace/difuze.mp4',
		ukazuje: 'Nádoba s přepážkou, vlevo jedna látka, vpravo druhá. Přepážka zmizí a látky se samy promíchají. Nikdo nemíchá.',
		zeptat: 'Proč se promíchají samy? A proč se potom zpátky nerozdělí?',
		kotva: 'Podíl modrých částic vlevo klesne ze 100 % k 50 % a už tam zůstane — promíchaných uspořádání je nesrovnatelně víc než rozdělených.',
		podtema: 'casticove-slozeni-latek',
	},
	{
		klic: 'hmotnost_vahy',
		nazev: 'Rovnoramenné váhy',
		rocnik: 6,
		delka: 10.6,
		cesta: '/media/fyzika/animace/hmotnost_vahy.mp4',
		ukazuje: 'Na jedné misce těleso, na druhou se přidávají závaží, až se vahadlo srovná.',
		zeptat: 'Kdy přesně je vahadlo vodorovné? Co to o tělese říká?',
		kotva: 'Náklon plyne z rovnováhy momentů, takže je vodorovné právě tehdy, když se hmotnosti rovnají — jinak to nakreslit nejde.',
		podtema: 'hmotnost',
	},
	{
		klic: 'newtonovo_delo',
		nazev: 'Newtonovo dělo',
		rocnik: 6,
		delka: 7.8,
		cesta: '/media/fyzika/animace/newtonovo_delo.mp4',
		ukazuje: 'Tři výstřely z vysoké hory: dva náboje dopadnou, třetí je tak rychlý, že Zemi obletí.',
		zeptat: 'Působí na obíhající družici gravitace? Proč tedy nespadne?',
		kotva: 'Dráhy vycházejí z numerické integrace pohybu v gravitačním poli — že třetí obíhá, není nakresleno, ale spočteno.',
		podtema: 'gravitacni-sila',
	},
	{
		klic: 'objem_ponorenim',
		nazev: 'Objem kamene ponořením',
		rocnik: 6,
		delka: 7.2,
		cesta: '/media/fyzika/animace/objem_ponorenim.mp4',
		ukazuje: 'Kámen se ponoří do odměrného válce a hladina stoupne. Rozdíl obou údajů je objem kamene.',
		zeptat: 'Proč musí být kámen celý pod hladinou? Co kdyby voda přetekla?',
		kotva: 'Vzestup hladiny se počítá z objemu kamene a průřezu válce — nakreslený vzestup a spočtený rozdíl se rovnají.',
		podtema: 'objem',
	},
	{
		klic: 'pad_mesic',
		nazev: 'Kladivo a pero na Měsíci',
		rocnik: 6,
		delka: 3.2,
		cesta: '/media/fyzika/animace/pad_mesic.mp4',
		ukazuje: 'Pokus Apolla 15: na Měsíci bez vzduchu dopadne kladivo i pero ve stejný okamžik.',
		zeptat: 'Proč to na Zemi nevyjde, když je gravitace silnější?',
		kotva: 'Časy dopadu se počítají z volného pádu při tíhovém zrychlení Měsíce a vyjdou shodné — stopky se zastaví ve stejnou chvíli.',
		podtema: 'uvod-do-fyziky',
	},
	{
		klic: 'pad_zeme_papir',
		nazev: 'Kámen a papír padají na Zemi',
		rocnik: 6,
		delka: 4.0,
		cesta: '/media/fyzika/animace/pad_zeme_papir.mp4',
		ukazuje: 'Kámen a list papíru padají ze stejné výšky. Papír zůstává pozadu — brzdí ho vzduch.',
		zeptat: 'Je to tím, že je papír lehčí? Co by se stalo bez vzduchu?',
		kotva: 'Kámen padá volným pádem, papír s odporem vzduchu — obojí ze skutečných vzorců, ne odhadem.',
		podtema: 'uvod-do-fyziky',
	},
	{
		klic: 'plave_klesa',
		nazev: 'Plave, vznáší se, klesá',
		rocnik: 6,
		delka: 8.8,
		cesta: '/media/fyzika/animace/plave_klesa.mp4',
		ukazuje: 'Tři tělesa různé hustoty ve vodě: jedno plave, druhé se vznáší, třetí klesá ke dnu.',
		zeptat: 'Rozhoduje o tom hmotnost tělesa, nebo něco jiného?',
		kotva: 'Chování se řídí porovnáním hustoty tělesa s hustotou kapaliny; ponor plovoucího tělesa je spočtený z jejich poměru.',
		podtema: 'hustota',
	},
	{
		klic: 'ponorka',
		nazev: 'Jak se ponorka potopí',
		rocnik: 6,
		delka: 13.0,
		cesta: '/media/fyzika/animace/ponorka.mp4',
		ukazuje: 'Ponorka napouští a vypouští vodu do nádrží, čímž mění svou průměrnou hustotu, a podle toho klesá nebo stoupá.',
		zeptat: 'Ponorka je z oceli. Proč tedy nepadne rovnou ke dnu?',
		kotva: 'Průměrná hustota se počítá z hmotnosti nabrané vody a objemu ponorky; směr pohybu z ní vyjde sám.',
		podtema: 'hustota',
	},
	{
		klic: 'pruzina_umernost',
		nazev: 'Dvakrát větší síla, dvakrát větší protažení',
		rocnik: 6,
		delka: 10.6,
		cesta: '/media/fyzika/animace/pruzina_umernost.mp4',
		ukazuje: 'Na pružinu se zavěšují závaží a její protažení roste přímo úměrně tíhové síle.',
		zeptat: 'Platí to pořád? Co se stane, když závaží pověsíme příliš mnoho?',
		kotva: 'Protažení je počítáno přímou úměrou, takže dvojnásobné závaží dá přesně dvojnásobek — délky se dají na obrázku změřit.',
		podtema: 'vzajemne-pusobeni-teles-sila',
	},
	{
		klic: 'skupenstvi',
		nazev: 'Tři skupenství',
		rocnik: 6,
		delka: 12.8,
		cesta: '/media/fyzika/animace/skupenstvi.mp4',
		ukazuje: 'Táž látka jako pevná, kapalná a plynná — v pevné částice kmitají na místě, v kapalině se přemísťují, v plynu zaplní celou nádobu.',
		zeptat: 'Ubylo částic, když se led změnil na páru? Co se vlastně změnilo?',
		kotva: 'V každém skupenství je částic přesně stejně; sloupec kapaliny i zaplnění nádoby plynem jsou spočtené, ne nakreslené od oka.',
		podtema: 'skupenstvi-latek',
	},
];

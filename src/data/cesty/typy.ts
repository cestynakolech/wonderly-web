export type Jazyk = 'cs' | 'en' | 'de' | 'fr';

/** Popis ve více jazycích; en/de/fr jsou nepovinné, web spadne zpět na češtinu */
export type PrelozenyPopis = {
	cs: string;
	en?: string;
	de?: string;
	fr?: string;
};

export type Stellplatz = {
	nazev: string;
	souradnice?: string;
	poznamka?: string;
	odkaz?: string;
	/** strukturované ceny — vyplňuje učitel nebo automat stellplatz_ceny.py */
	cenaNoc?: string;
	elektrina?: string;
	voda?: string;
	/** GPS "lat,lon" pro odkaz do mapy (řidičsky nejdůležitější údaj) */
	gps?: string;
	/** ze kdy ceny jsou, např. "léto 2025" nebo "05/2026" */
	rokCen?: string;
	/** cenu jsme zaplatili na místě (ne dohledaná v aplikaci) — pak se u ní
	 *  neukazuje upozornění „jen orientační, veřejně dohledané" */
	overenoNaMiste?: boolean;
};

/** Jeden výjezd z domova. Starší roky mají v roce víc cest — hodně prodloužených
 *  víkendů (domov → místo → domov) a jednu dlouhou prázdninovou cestu. Trasa se
 *  pak kreslí zvlášť pro každý výjezd, ne jako jedna linka přes celý rok. */
export type Vyjezd = {
	cislo: number;
	druh: 'vikend' | 'prazdniny';
	od: string;
	do: string;
};

export type Mesto = {
	slug: string;
	nazev: string;
	zeme: string;
	datum: string;
	/** Ke kterému výjezdu roku místo patří (viz Rok.vyjezdy) */
	vyjezd?: number;
	/** Pozice pinu v souřadnicích mapy (viewBox 0 0 680 520) */
	x: number;
	y: number;
	/** Ruční posun popisku pinu (v jednotkách mapy) pro těsné shluky měst;
	 *  kotva = zarovnání textu vůči bodu (start = text vpravo od bodu, end = vlevo) */
	popisekPosun?: { dx: number; dy: number; kotva?: 'start' | 'middle' | 'end' };
	/** Přibližný počet obyvatel — slouží JEN k tomu, aby shluk blízkých míst dostal
	 *  na mapě jméno toho největšího z nich. Když se neuvede (nebo jsou místa stejně
	 *  velká), použije se první navštívené, tj. dřívější v poli `mesta`. */
	obyvatele?: number;
	/** U starších dovolených, sestavených automaticky z GPS ve fotkách, se popis
	 *  doplňuje postupně — místo bez popisu se ukáže na mapě, jen bez textu. */
	popis?: PrelozenyPopis;
	/** Předpona fotogalerie v úložišti R2, např. "cesty/2026/landshut" */
	galerie?: string;
	videoId?: string;
	stellplatze?: Stellplatz[];
	/** Bertíkův report — delší zápisek psího reportéra; odstavce oddělené prázdným řádkem (jen česky) */
	report?: string;
};

export type Video = {
	id: string;
	nazev: string;
	odkaz: string;
};

export type Rok = {
	rok: number;
	zeme: string;
	/** Volitelný ruční výřez mapy; když chybí, spočítá se automaticky z poloh měst */
	vyrez?: { x: number; y: number; sirka: number; vyska: number };
	/** Odkud se vyjelo — domov. Kreslí se na celkové mapě jako začátek trasy
	 *  (vlastní značka + popisek) a započítá se do výřezu, aby mapa začínala doma.
	 *  Nemá vlastní kartu ani přiblížený pohled; kvůli soukromí se popisuje jen
	 *  obecně („jižní Čechy“), stejně jako v úvodních mapách videí (trasa_uvod.py). */
	domov?: { nazev: string; x: number; y: number };
	/** Pozice pinu roku na celoevropské mapě rozcestníku */
	pinEvropa: { x: number; y: number };
	/** Jednotlivé výjezdy z domova. Když chybí, je celý rok jedna cesta
	 *  (tak to mají roky 2025 a 2026 psané ručně). */
	vyjezdy?: Vyjezd[];
	mesta: Mesto[];
	videa: Video[];
};

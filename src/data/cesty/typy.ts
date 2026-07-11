export type Jazyk = 'cs' | 'en' | 'de';

/** Popis ve více jazycích; en/de jsou nepovinné, web spadne zpět na češtinu */
export type PrelozenyPopis = {
	cs: string;
	en?: string;
	de?: string;
};

export type Stellplatz = {
	nazev: string;
	souradnice?: string;
	poznamka?: string;
	odkaz?: string;
};

export type Mesto = {
	slug: string;
	nazev: string;
	zeme: string;
	datum: string;
	/** Pozice pinu v souřadnicích mapy (viewBox 0 0 680 520) */
	x: number;
	y: number;
	popis: PrelozenyPopis;
	/** Předpona fotogalerie v úložišti R2, např. "cesty/2026/landshut" */
	galerie?: string;
	videoId?: string;
	stellplatze?: Stellplatz[];
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
	/** Pozice pinu roku na celoevropské mapě rozcestníku */
	pinEvropa: { x: number; y: number };
	mesta: Mesto[];
	videa: Video[];
};

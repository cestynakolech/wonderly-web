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
	popis: string;
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

/**
 * Hra pro skupinu „Vůči čemu?“ — podtéma Klid a pohyb tělesa (fyzika 7).
 *
 * Pilot složky č. 9 „hra pro skupinu“ (OBSAH-PRAVIDLA.md kap. 12): samostatná hra
 * vázaná na jedno podtéma, ne výběr podtématu v Fyzikální lize.
 *
 * Každá karta nese `opora` = DOSLOVNÝ úryvek výkladu podtématu (temata.ts,
 * slug klid-a-pohyb-telesa). Test testy/hra-klid-a-pohyb.mjs ověřuje, že každý
 * úryvek ve výkladu opravdu stojí — hra tak nesmí tvrdit nic, co výklad neříká.
 */

export type Odpoved = 'A' | 'B';

export type Karta = {
	/** jednoznačné id karty (používá se i jako id SVG scény) */
	id: string;
	/** kreslená scéna, viz src/components/hry/ScenaKlidPohyb.astro */
	scena: string;
	/** co se zvýrazní jako posuzované těleso (klíč prvku ve scéně) */
	teleso?: string;
	/** kdo je pozorovatel (klíč prvku ve scéně) — jen v kole 1 */
	pozorovatel?: string;
	otazka: string;
	spravne: Odpoved;
	/** krátké zdůvodnění po odhalení (parafráze opory) */
	proc: string;
	/** doslovný úryvek výkladu, o který se karta opírá */
	opora: string;
	/** bonus „Vůči čemu by to bylo naopak?“ — jen když to výklad výslovně uvádí */
	naopak?: { odpoved: string; opora: string };
};

export type Kolo = {
	cislo: number;
	nazev: string;
	pravidlo: string;
	/** opora pravidla ve výkladu (doslovný úryvek) */
	opora: string;
	moznosti: Record<Odpoved, { popis: string; doplnek: string }>;
	body: number;
	karty: Karta[];
};

export const KOLA: Kolo[] = [
	{
		cislo: 1,
		nazev: 'Klid, nebo pohyb? Vůči čemu?',
		pravidlo: 'Těleso je v pohybu, když mění polohu vůči jinému tělesu. V klidu je, když ji vůči němu nemění.',
		opora: 'Těleso je v pohybu, když mění svou polohu vůči jinému tělesu.',
		moznosti: {
			A: { popis: 'KLID', doplnek: 'polohu nemění' },
			B: { popis: 'POHYB', doplnek: 'polohu mění' },
		},
		body: 1,
		karty: [
			{
				id: 'k1-vytah-vytah', scena: 'vytah', teleso: 'zena', pozorovatel: 'kabina',
				otazka: 'Žena jede výtahem nahoru. Je VŮČI VÝTAHU v klidu, nebo v pohybu?',
				spravne: 'A',
				proc: 'Vůči výtahu svou polohu nemění — jede spolu s ním.',
				opora: 'Žena ve výtahu je vůči výtahu v klidu',
				naopak: { odpoved: 'vůči muži v přízemí', opora: 'vůči muži v přízemí v pohybu' },
			},
			{
				id: 'k1-vlak-dite', scena: 'vlak', teleso: 'cestujici', pozorovatel: 'dite',
				otazka: 'Cestující sedí ve vlaku. Je VŮČI DÍTĚTI U PŘEJEZDU v klidu, nebo v pohybu?',
				spravne: 'B',
				proc: 'Vůči dítěti u přejezdu cestující mění polohu — projíždí kolem.',
				opora: 'Vůči dítěti, které stojí u přejezdu a mává projíždějícímu vlaku, je ale v pohybu.',
				naopak: { odpoved: 'vůči spolucestujícímu na vedlejším sedadle', opora: 'je v klidu vůči spolucestujícímu na vedlejším sedadle' },
			},
			{
				id: 'k1-strom-ridic', scena: 'silnice', teleso: 'strom', pozorovatel: 'ridic',
				otazka: 'Strom roste u silnice. Je VŮČI ŘIDIČI jedoucího auta v klidu, nebo v pohybu?',
				spravne: 'B',
				proc: 'Vůči řidiči jedoucího auta strom mění polohu, a proto se pohybuje.',
				opora: 'Vůči řidiči jedoucího auta strom mění polohu, a proto se pohybuje.',
			},
			{
				id: 'k1-vlak-soused', scena: 'vlak', teleso: 'cestujici', pozorovatel: 'soused',
				otazka: 'Cestující sedí ve vlaku. Je VŮČI SPOLUCESTUJÍCÍMU vedle sebe v klidu, nebo v pohybu?',
				spravne: 'A',
				proc: 'Spolucestující jede s ním — vzájemně polohu nemění.',
				opora: 'Sedící cestující ve vlaku je v klidu vůči spolucestujícímu na vedlejším sedadle.',
				naopak: { odpoved: 'vůči dítěti u přejezdu', opora: 'Vůči dítěti, které stojí u přejezdu a mává projíždějícímu vlaku, je ale v pohybu.' },
			},
			{
				id: 'k1-vytah-muz', scena: 'vytah', teleso: 'zena', pozorovatel: 'muz',
				otazka: 'Žena jede výtahem nahoru. Je VŮČI MUŽI V PŘÍZEMÍ v klidu, nebo v pohybu?',
				spravne: 'B',
				proc: 'Vůči muži v přízemí žena mění polohu — vyjíždí nahoru.',
				opora: 'vůči muži v přízemí v pohybu',
				naopak: { odpoved: 'vůči výtahu', opora: 'Žena ve výtahu je vůči výtahu v klidu' },
			},
			{
				id: 'k1-strom-slunce', scena: 'slunce', teleso: 'strom', pozorovatel: 'slunce',
				otazka: 'Strom pevně stojí v zemi. Je VŮČI SLUNCI v klidu, nebo v pohybu?',
				spravne: 'B',
				proc: 'Spolu se Zemí se strom pohybuje i vůči Slunci.',
				opora: 'Spolu se Zemí se navíc pohybuje i vůči Slunci.',
			},
		],
	},
	{
		cislo: 2,
		nazev: 'Přímka, nebo křivka?',
		pravidlo: 'Přímočarý pohyb: trasou je přímka nebo úsečka. Křivočarý pohyb: trasou je křivka.',
		opora: 'Podle tvaru trasy rozlišujeme dva druhy pohybu.',
		moznosti: {
			A: { popis: 'PŘÍMOČARÝ', doplnek: 'trasa je přímka' },
			B: { popis: 'KŘIVOČARÝ', doplnek: 'trasa je křivka' },
		},
		body: 1,
		karty: [
			{
				id: 'k2-siska', scena: 'siska', teleso: 'siska',
				otazka: 'Šiška padá ze stromu. Jaký je to pohyb?',
				spravne: 'A',
				proc: 'Padající šiška jde po úsečce dolů.',
				opora: 'padá šiška ze stromu',
			},
			{
				id: 'k2-slalom', scena: 'slalom', teleso: 'lyzar',
				otazka: 'Lyžař jede slalom mezi brankami. Jaký je to pohyb?',
				spravne: 'B',
				proc: 'Slalom je klikatá čára — křivka.',
				opora: 'Příkladem je slalom lyžaře',
			},
			{
				id: 'k2-kolotoc', scena: 'kolotoc', teleso: 'dite',
				otazka: 'Dítě se veze na kolotoči. Jaký je to pohyb?',
				spravne: 'B',
				proc: 'Dítě na kolotoči obíhá dokola — trasa je křivka.',
				opora: 'pohyb dítěte na kolotoči',
			},
			{
				id: 'k2-pas', scena: 'pas', teleso: 'zbozi',
				otazka: 'Zboží jede po pásu u pokladny. Jaký je to pohyb?',
				spravne: 'A',
				proc: 'Pás veze zboží rovně — po úsečce.',
				opora: 'zboží na pásu u pokladny',
			},
			{
				id: 'k2-volejbal', scena: 'volejbal', teleso: 'mic',
				otazka: 'Míč letí přes síť při volejbalu. Jaký je to pohyb?',
				spravne: 'B',
				proc: 'Míč letí obloukem — trasa je křivka.',
				opora: 'míč při volejbalu',
			},
			{
				id: 'k2-vytah', scena: 'vytah-sachta', teleso: 'kabina',
				otazka: 'Výtah jede z přízemí do patra. Jaký je to pohyb?',
				spravne: 'A',
				proc: 'Výtah jede rovně nahoru — po úsečce.',
				opora: 'Takhle jede výtah',
			},
		],
	},
	{
		cislo: 3,
		nazev: 'FINÁLE: Trasa, nebo dráha?',
		pravidlo: 'Trasa (trajektorie) je čára, kudy těleso prošlo. Dráha s je její DÉLKA v metrech.',
		opora: 'Trasa a dráha nejsou totéž: trasa je čára, dráha je její délka.',
		moznosti: {
			A: { popis: 'TRASA', doplnek: 'čára, kudy těleso šlo' },
			B: { popis: 'DRÁHA', doplnek: 'délka té čáry' },
		},
		body: 2,
		karty: [
			{
				id: 'k3-stopa', scena: 'stopa', teleso: 'stopa',
				otazka: 'Stopa lyžaře ve sněhu. Je to trasa, nebo dráha?',
				spravne: 'A',
				proc: 'Stopa je čára, kudy lyžař jel — trasa, kterou vidíme.',
				opora: 'třeba stopa lyžaře ve sněhu',
			},
			{
				id: 'k3-371', scena: 'mapa', teleso: 'cislo',
				otazka: 'Auto ujelo z Prahy do Ostravy asi 371 km. Je to trasa, nebo dráha?',
				spravne: 'B',
				proc: 'Asi 371 km je délka cesty — to je dráha.',
				opora: 'Dráha je délka této křivky, asi 371 km.',
			},
			{
				id: 'k3-oval', scena: 'oval', teleso: 'oval',
				otazka: 'Oválná závodní dráha na stadionu. Myslíme tím trasu, nebo dráhu (délku)?',
				spravne: 'A',
				proc: 'Chyták! Oválná závodní dráha je tvar čáry, tedy trasa — ne délka.',
				opora: 'Ve všech těchto případech myslíme tvar čáry, tedy trasu (trajektorii) — ne její délku.',
			},
			{
				id: 'k3-metry', scena: 'metr', teleso: 's',
				otazka: 'Značí se s a měří se v metrech. Je to trasa, nebo dráha?',
				spravne: 'B',
				proc: 'Dráha se značí s a měříme ji v metrech (m).',
				opora: 'Značíme ji s a měříme v metrech (m)',
			},
			{
				id: 'k3-krivka', scena: 'mapa', teleso: 'krivka',
				otazka: 'Modrá křivka na mapě z Prahy do Ostravy. Je to trasa, nebo dráha?',
				spravne: 'A',
				proc: 'Modrá křivka je čára — trasa (trajektorie) auta.',
				opora: 'Trajektorie je modrá křivka na mapě.',
			},
			{
				id: 'k3-delka-stopy', scena: 'stopa', teleso: 'delka',
				otazka: 'Délka stopy lyžaře — kolik metrů lyžař ujel. Je to trasa, nebo dráha?',
				spravne: 'B',
				proc: 'Délka trasy, kterou těleso urazilo, je dráha.',
				opora: 'je délka trasy, kterou těleso urazilo.',
			},
		],
	},
];

/** Body za správnou odpověď v daném kole (finále za dvojnásobek). */
export function bodyZaKartu(kolo: Kolo): number {
	return kolo.body;
}

/** Bonus za správné „vůči čemu by to bylo naopak?“ (jen karty s `naopak`). */
export const BONUS_NAOPAK = 1;

/** Nejvyšší možný počet bodů jednoho týmu (bez bonusů). */
export function maximumBodu(kola: Kolo[] = KOLA): number {
	return kola.reduce((s, k) => s + k.karty.length * k.body, 0);
}

export type Tym = { jmeno: string; body: number };

/**
 * Pořadí týmů: sestupně podle bodů; týmy se stejným počtem bodů sdílí místo
 * (1., 1., 3. …). Původní pořadí týmů se při shodě zachová.
 */
export function poradi(tymy: Tym[]): { jmeno: string; body: number; misto: number }[] {
	const serazene = tymy
		.map((t, i) => ({ ...t, i }))
		.sort((a, b) => b.body - a.body || a.i - b.i);
	return serazene.map((t, k) => ({
		jmeno: t.jmeno,
		body: t.body,
		misto: serazene.findIndex((u) => u.body === t.body) + 1,
	}));
}

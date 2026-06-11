export type Podtema = { slug: string; nazev: string };
export type Tema = { slug: string; nazev: string; podtemata?: Podtema[] };

export const temata: Record<string, Tema[]> = {
	'fyzika/7-rocnik': [
		{ slug: 'pohyb-a-rychlost', nazev: 'Pohyb a rychlost' },
		{
			slug: 'sily-kolem-nas',
			nazev: 'Síly kolem nás',
			podtemata: [
				{ slug: 'sila', nazev: 'Síla' },
				{ slug: 'gravitacni-sila', nazev: 'Gravitační síla' },
				{ slug: 'treci-sila', nazev: 'Třecí síla' },
				{ slug: 'skladani-sil', nazev: 'Skládání sil' },
				{ slug: 'teziste', nazev: 'Těžiště' },
			],
		},
		{
			slug: 'jednoduche-stroje',
			nazev: 'Jednoduché stroje',
			podtemata: [
				{ slug: 'pusobeni-teles-a-deformace', nazev: 'Působení těles a deformace' },
				{ slug: 'jednoduche-stroje-paky', nazev: 'Jednoduché stroje a páky' },
			],
		},
		{
			slug: 'tlak-v-kapalinach',
			nazev: 'Tlak v kapalinách',
			podtemata: [
				{ slug: 'tlak', nazev: 'Tlak' },
				{ slug: 'pascaluv-zakon', nazev: 'Pascalův zákon' },
				{ slug: 'hydrostaticky-tlak', nazev: 'Hydrostatický tlak' },
			],
		},
		{
			slug: 'vztlakova-sila-a-plovani-teles',
			nazev: 'Vztlaková síla a plování těles',
			podtemata: [
				{ slug: 'archimeduv-zakon', nazev: 'Archimédův zákon' },
				{ slug: 'telesa-stejnoroda-a-nestejnoroda', nazev: 'Tělesa stejnorodá a nestejnorodá' },
			],
		},
		{
			slug: 'atmosfera-a-tlak-vzduchu',
			nazev: 'Atmosféra a tlak vzduchu',
			podtemata: [
				{ slug: 'atmosfericky-tlak', nazev: 'Atmosférický tlak' },
				{ slug: 'pretlak-podtlak-vakuum', nazev: 'Přetlak, podtlak, vakuum' },
				{ slug: 'meteorologie-a-mereni-tlaku', nazev: 'Meteorologie a měření tlaku' },
			],
		},
		{
			slug: 'svetlo-a-jeho-sireni',
			nazev: 'Světlo a jeho šíření',
			podtemata: [
				{ slug: 'svetlo-jeho-zdroje', nazev: 'Světlo a jeho zdroje' },
				{ slug: 'lom-svetla', nazev: 'Lom světla' },
				{ slug: 'stin-faze-mesice', nazev: 'Stín a fáze Měsíce' },
			],
		},
		{
			slug: 'zrcadla-a-cocky',
			nazev: 'Zrcadla a čočky',
			podtemata: [
				{ slug: 'opticka-cocka', nazev: 'Optická čočka' },
				{ slug: 'optika-rovinneho-zrcadla', nazev: 'Optika rovinného zrcadla' },
				{ slug: 'kulova-zrcadla-dute-zrcadlo', nazev: 'Kulová zrcadla a duté zrcadlo' },
			],
		},
	],
};

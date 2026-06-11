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
	'fyzika/8-rocnik': [
		{
			slug: 'prace-a-energie',
			nazev: 'Práce a energie',
			podtemata: [
				{ slug: 'mechanicka-prace', nazev: 'Mechanická práce' },
				{ slug: 'energie-a-zakon-zachovani-energie', nazev: 'Energie a zákon zachování energie' },
			],
		},
		{
			slug: 'teplo-a-vnitrni-energie',
			nazev: 'Teplo a vnitřní energie',
			podtemata: [
				{ slug: 'vnitrni-energie', nazev: 'Vnitřní energie' },
				{ slug: 'teplo-a-teplota', nazev: 'Teplo a teplota' },
			],
		},
		{
			slug: 'sireni-tepla',
			nazev: 'Šíření tepla',
			podtemata: [
				{ slug: 'zpusoby-sireni-tepla', nazev: 'Šíření tepla' },
				{ slug: 'teplo-a-premeny-skupenstvi', nazev: 'Teplo a přeměny skupenství' },
				{ slug: 'lavinove-nebezpeci', nazev: 'Lavinové nebezpečí' },
			],
		},
		{
			slug: 'tepelne-motory',
			nazev: 'Tepelné motory',
			podtemata: [
				{ slug: 'tepelny-motor', nazev: 'Tepelný motor' },
				{ slug: 'spalovaci-motory', nazev: 'Spalovací motory' },
				{ slug: 'raketovy-motor-proudovy-motor', nazev: 'Raketový motor, proudový motor' },
			],
		},
		{
			slug: 'motory-a-pohony-budoucnosti',
			nazev: 'Motory a pohony budoucnosti',
			podtemata: [
				{ slug: 'wankeluv-motor', nazev: 'Wankelův motor' },
				{ slug: 'alternativni-pohony-pro-automobily', nazev: 'Alternativní pohony pro automobily' },
				{ slug: 'souhrn-motory', nazev: 'Souhrn: motory' },
			],
		},
		{
			slug: 'elektricky-naboj-a-pole',
			nazev: 'Elektrický náboj a pole',
			podtemata: [
				{ slug: 'elektricky-naboj', nazev: 'Elektrický náboj' },
				{ slug: 'elektricke-pole', nazev: 'Elektrické pole' },
			],
		},
		{
			slug: 'elektricky-proud-a-obvody',
			nazev: 'Elektrický proud a obvody',
			podtemata: [
				{ slug: 'elektricky-proud-a-napeti', nazev: 'Elektrický proud a napětí' },
				{ slug: 'zaklady-a-zapojeni-elektrickych-obvodu', nazev: 'Základy a zapojení elektrických obvodů' },
			],
		},
		{
			slug: 'elektricka-prace-a-spotrebice',
			nazev: 'Elektrická práce a spotřebiče',
			podtemata: [
				{ slug: 'elektricka-prace-a-vykon', nazev: 'Elektrická práce a výkon' },
				{ slug: 'zapojeni-spotrebicu-v-domacnosti', nazev: 'Zapojení spotřebičů v domácnosti' },
			],
		},
		{
			slug: 'zvuk-a-kmitani',
			nazev: 'Zvuk a kmitání',
			podtemata: [
				{ slug: 'kmitani-a-vlneni', nazev: 'Kmitání a vlnění' },
				{ slug: 'vznik-a-sireni-zvuku', nazev: 'Vznik a šíření zvuku' },
				{ slug: 'cesta-zvuku', nazev: 'Cesta zvuku' },
			],
		},
	],
};

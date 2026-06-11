export type Podtema = { slug: string; nazev: string; obsah?: string };
export type Tema = { slug: string; nazev: string; podtemata?: Podtema[] };

export const temata: Record<string, Tema[]> = {
	'fyzika/7-rocnik': [
		{
			slug: 'pohyb-a-rychlost',
			nazev: 'Pohyb a rychlost',
			podtemata: [
				{
					slug: 'klid-a-pohyb-telesa',
					nazev: 'Klid a pohyb tělesa',
					obsah: `
						<h2>Klid a pohyb tělesa</h2>
						<p><strong>Pohyb tělesa</strong> je změna polohy tělesa vzhledem k jinému tělesu.</p>
						<p>Těleso je vzhledem k jinému tělesu <strong>v klidu</strong>, pokud se vzhledem k němu nepohybuje.</p>

						<h3>Posuvný pohyb</h3>
						<p>Každý bod tělesa se pohybuje stejným směrem a stejnou rychlostí po stejné trajektorii.</p>
						<img src="/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-pohyb.jpg" alt="Posuvný pohyb trojúhelníkového pravítka" />

						<h3>Trajektorie pohybu</h3>
						<ul>
							<li>Pohyb posuvný přímočarý</li>
							<li>Pohyb posuvný křivočarý</li>
						</ul>

						<h3>Otáčivý pohyb</h3>
						<p>Při otáčivém pohybu se jednotlivé body tělesa pohybují po kružnicích se středem na ose otáčení.</p>
						<img src="/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/otacivy-pohyb.jpg" alt="Otáčivý pohyb trojúhelníkového pravítka" />
					`,
				},
				{
					slug: 'rychlost-draha-cas',
					nazev: 'Rychlost, dráha, čas',
					obsah: `
						<h2>Rychlost, dráha, čas</h2>
						<p>Pro rovnoměrný pohyb platí mezi rychlostí (v), dráhou (s) a časem (t) tyto vztahy:</p>
						<ul>
							<li><strong>v = s : t</strong> (rychlost = dráha děleno čas)</li>
							<li><strong>s = v · t</strong> (dráha = rychlost krát čas)</li>
							<li><strong>t = s : v</strong> (čas = dráha děleno rychlost)</li>
						</ul>

						<h3>Převod jednotek rychlosti</h3>
						<p>Rychlost se nejčastěji udává v kilometrech za hodinu (km/h) nebo metrech za sekundu (m/s).</p>
						<ul>
							<li>Z km/h na m/s: děl 3,6</li>
							<li>Z m/s na km/h: násob 3,6</li>
						</ul>

						<h3>Grafy pohybu</h3>
						<p>V grafu závislosti dráhy na čase rozlišujeme:</p>
						<ul>
							<li><strong>rovnoměrný pohyb</strong> – graf je přímka (rychlost se nemění)</li>
							<li><strong>nerovnoměrný pohyb</strong> – graf není přímka (rychlost se mění)</li>
						</ul>
						<p>Jestliže těleso urazí za stejné doby vždy stejné dráhy, koná rovnoměrný pohyb:</p>
						<img src="/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rovnomerny-pohyb.jpg" alt="Nerovnoměrný a rovnoměrný pohyb automobilu" />
					`,
				},
				{
					slug: 'priklady-na-vypocet-rychlosti',
					nazev: 'Příklady na výpočet rychlosti',
					obsah: `
						<h2>Příklady na výpočet rychlosti</h2>

						<p><strong>Příklad 1: Cesta autem</strong><br>
						Auto ujelo vzdálenost 200 km za 4 hodiny. Jaká byla průměrná rychlost auta?</p>
						<p>v = s : t = 200 : 4 = <strong>50 km/h</strong></p>

						<p><strong>Příklad 2: Běh na lyžích</strong><br>
						Běžec na lyžích urazil 30 km za 2 hodiny. Jakou průměrnou rychlostí se pohyboval?</p>
						<p>v = s : t = 30 : 2 = <strong>15 km/h</strong></p>

						<p><strong>Příklad 3: Cyklistický výlet</strong><br>
						Skupina cyklistů ujela 45 km za 3 hodiny. Jaká byla jejich průměrná rychlost jízdy?</p>
						<p>v = s : t = 45 : 3 = <strong>15 km/h</strong></p>

						<p><strong>Příklad 4: Vlaková souprava</strong><br>
						Vlak ujel vzdálenost 360 km mezi dvěma městy za 4 hodiny. Jaká je průměrná rychlost vlaku?</p>
						<p>v = s : t = 360 : 4 = <strong>90 km/h</strong></p>

						<p><strong>Příklad 5: Pěší túra (převod minut na hodiny)</strong><br>
						Turista ušel vzdálenost 6 km za 120 minut. Jaká byla jeho průměrná rychlost v km/h?</p>
						<p>120 min = 2 h<br>v = s : t = 6 : 2 = <strong>3 km/h</strong></p>

						<p><strong>Příklad 6: Krátký běh (výsledek v m/s)</strong><br>
						Žák uběhl 100 m za 20 sekund. Jaká byla jeho průměrná rychlost v m/s?</p>
						<p>v = s : t = 100 : 20 = <strong>5 m/s</strong> (= 18 km/h)</p>

						<p><strong>Příklad 7: Cyklistický závod</strong><br>
						Cyklista urazí v závodu etapu dlouhou 231 km za 5 hodin a 30 minut. Jakou jel rychlostí?</p>
						<p>5 h 30 min = 5,5 h<br>v = s : t = 231 : 5,5 = <strong>42 km/h</strong></p>

						<p><strong>Příklad 8: Turistický výlet</strong><br>
						Turisté ušli v rovinatém terénu vzdálenost 3 km za 36 minut. Vypočítej jejich rychlost.</p>
						<p>36 min = 0,6 h<br>v = s : t = 3 : 0,6 = <strong>5 km/h</strong></p>

						<p><strong>Příklad 9: Dopravní letadlo</strong><br>
						Dopravní letadlo uletělo vzdálenost 585 km za 1 hodinu 18 minut. Vypočti jeho průměrnou rychlost.</p>
						<p>18 min = 0,3 h, takže celkový čas je 1 h + 0,3 h = 1,3 h<br>v = s : t = 585 : 1,3 = <strong>450 km/h</strong></p>
					`,
				},
			],
		},
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
	'fyzika/9-rocnik': [
		{
			slug: 'stavba-atomu',
			nazev: 'Stavba atomu',
			podtemata: [
				{ slug: 'fyzika-atomy-a-modely', nazev: 'Fyzika – Atomy a modely' },
				{ slug: 'atom-iont-izotop', nazev: 'Atom, iont, izotop' },
				{ slug: 'atomove-jadro', nazev: 'Atomové jádro' },
			],
		},
		{
			slug: 'jaderna-fyzika',
			nazev: 'Jaderná fyzika',
			podtemata: [
				{ slug: 'radioaktivita', nazev: 'Radioaktivita' },
				{ slug: 'stepeni-jader', nazev: 'Štěpení jader' },
				{ slug: 'jaderny-reaktor', nazev: 'Jaderný reaktor' },
			],
		},
		{
			slug: 'elektromagneticka-indukce',
			nazev: 'Elektromagnetická indukce',
			podtemata: [
				{ slug: 'elektromagneticka-indukce-zaklady', nazev: 'Elektromagnetická indukce' },
				{ slug: 'generator', nazev: 'Generátor' },
			],
		},
		{
			slug: 'elektricke-stroje',
			nazev: 'Elektrické stroje',
			podtemata: [
				{ slug: 'elektromotor', nazev: 'Elektromotor' },
				{ slug: 'transformator', nazev: 'Transformátor' },
			],
		},
		{
			slug: 'elektrina-v-domacnosti',
			nazev: 'Elektřina v domácnosti',
			podtemata: [
				{ slug: 'prenos-elektricke-energie-energeticka-rozvodna-sit', nazev: 'Přenos elektrické energie, energetická rozvodná síť' },
				{ slug: 'schema-domovni-elektroinstalace', nazev: 'Schéma domovní elektroinstalace' },
				{ slug: 'ucinky-elektrickeho-proudu', nazev: 'Účinky elektrického proudu' },
			],
		},
		{
			slug: 'vedeni-proudu-v-latkach',
			nazev: 'Vedení proudu v látkách',
			podtemata: [
				{ slug: 'chemicke-zdroje-elektrickeho-napeti', nazev: 'Chemické zdroje elektrického napětí' },
				{ slug: 'vedeni-elektrickeho-proudu-v-kapalinach', nazev: 'Vedení elektrického proudu v kapalinách' },
				{ slug: 'vedeni-elektrickeho-proudu-v-plynech', nazev: 'Vedení elektrického proudu v plynech' },
			],
		},
		{
			slug: 'polovodice',
			nazev: 'Polovodiče',
			podtemata: [
				{ slug: 'polovodice-a-jejich-vlastnosti', nazev: 'Polovodiče a jejich vlastnosti' },
				{ slug: 'polovodice-typu-n-a-p', nazev: 'Polovodiče typu N a P' },
			],
		},
		{
			slug: 'vesmir-a-zareni',
			nazev: 'Vesmír a záření',
			podtemata: [
				{ slug: 'elektromagneticke-vlny', nazev: 'Elektromagnetické vlny' },
				{ slug: 'slunecni-soustava', nazev: 'Sluneční soustava' },
				{ slug: 'galaxie', nazev: 'Galaxie' },
			],
		},
	],
};

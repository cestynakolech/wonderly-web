export type Otazka = {
	text: string;
	/** Správná odpověď je VŽDY první — na stránce se pořadí zamíchá */
	odpovedi: [string, string, string];
};

/**
 * Kvízy k podtématům. Klíč = predmet/rocnik/tema/podtema.
 * Otázky vychází výhradně z ověřených podkladů daného tématu
 * (kontrolní protokol: Omega/dokumenty/kontrola-podkladu-tlak.md).
 */
export const kvizy: Record<string, Otazka[]> = {
	'fyzika/7-rocnik/tlak-v-kapalinach/tlak': [
		{
			text: 'Jak působí tlaková síla na plochu tělesa?',
			odpovedi: ['kolmo na plochu', 'rovnoběžně s plochou', 'vždy svisle dolů'],
		},
		{
			text: 'Čím se mohou projevit účinky tlakové síly na těleso?',
			odpovedi: ['deformací (změnou tvaru) tělesa', 'změnou barvy tělesa', 'zvětšením hmotnosti tělesa'],
		},
		{
			text: 'Jakou značkou označujeme tlak?',
			odpovedi: ['p', 'T', 'F'],
		},
		{
			text: 'Jaká je základní jednotka tlaku?',
			odpovedi: ['pascal (Pa)', 'newton (N)', 'kilogram (kg)'],
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlak?',
			odpovedi: ['p = F : S', 'p = F · S', 'p = S : F'],
		},
		{
			text: 'Tlak 1 Pa vyvolá síla 1 N působící kolmo na plochu…',
			odpovedi: ['1 m²', '1 cm²', '1 km²'],
		},
		{
			text: 'Kolik pascalů je 1 kilopascal (kPa)?',
			odpovedi: ['1 000 Pa', '100 Pa', '10 000 Pa'],
		},
		{
			text: 'Kolik pascalů je 1 megapascal (MPa)?',
			odpovedi: ['1 000 000 Pa', '1 000 Pa', '100 000 Pa'],
		},
		{
			text: 'Kolik pascalů je 1 hektopascal (hPa), který se používá v meteorologii?',
			odpovedi: ['100 Pa', '1 000 Pa', '10 Pa'],
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti tlakové síly?',
			odpovedi: [
				'přímo úměrně — čím větší síla, tím větší tlak',
				'nepřímo úměrně — čím větší síla, tím menší tlak',
				'velikost tlaku na síle nezávisí',
			],
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti plochy, na kterou síla působí?',
			odpovedi: [
				'nepřímo úměrně — čím větší plocha, tím menší tlak',
				'přímo úměrně — čím větší plocha, tím větší tlak',
				'velikost tlaku na ploše nezávisí',
			],
		},
		{
			text: 'Proč bolí šlápnutí jehlovým podpatkem víc než teniskou?',
			odpovedi: [
				'stejná síla působí na menší plochu, takže vzniká větší tlak',
				'jehlový podpatek je vždy těžší než teniska',
				'guma tenisky tlak zvětšuje',
			],
		},
		{
			text: 'Jak můžeme tlak zvětšit?',
			odpovedi: [
				'zmenšením plochy nebo zvětšením síly',
				'zvětšením plochy, na kterou síla působí',
				'zmenšením působící síly',
			],
		},
		{
			text: 'Jak můžeme tlak zmenšit?',
			odpovedi: [
				'zvětšením plochy, na kterou se síla rozloží',
				'zmenšením plochy, na kterou síla působí',
				'zvětšením působící síly',
			],
		},
		{
			text: 'Proč se ostří nože nebo sekery brousí?',
			odpovedi: [
				'zmenší se plocha ostří, a tím vznikne větší tlak',
				'nůž je po nabroušení lehčí',
				'zvětší se plocha ostří, a tím vznikne menší tlak',
			],
		},
		{
			text: 'K čemu slouží sněžnice?',
			odpovedi: [
				'rozloží sílu na větší plochu, takže se do sněhu nezaboříme',
				'zvětšují tlak na sníh, abychom se zabořili',
				'zmenšují plochu, na kterou působí naše váha',
			],
		},
		{
			text: 'Proč mají bagry a tanky pásy a traktory široké pneumatiky?',
			odpovedi: [
				'aby se rozložila síla na větší plochu a stroj se nebořil do měkké půdy',
				'aby byl tlak na půdu co největší',
				'jen kvůli vyšší rychlosti jízdy',
			],
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlakovou sílu, když známe tlak a plochu?',
			odpovedi: ['F = p · S', 'F = p : S', 'F = S : p'],
		},
		{
			text: 'V jakých jednotkách musíme do vzorce pro tlak dosazovat obsah plochy S?',
			odpovedi: ['v metrech čtverečních (m²)', 'v centimetrech čtverečních (cm²)', 'v jakýchkoli jednotkách plochy'],
		},
		{
			text: 'Kolik dm² je 1 m²?',
			odpovedi: ['100 dm²', '10 dm²', '1 000 dm²'],
		},
		{
			text: 'Krabice působí na stůl silou 50 N a její dno má obsah 0,5 m². Jaký je tlak na stůl?',
			odpovedi: ['100 Pa', '25 Pa', '250 Pa'],
		},
	],
	'fyzika/7-rocnik/tlak-v-kapalinach/pascaluv-zakon': [
		{
			text: 'Co říká Pascalův zákon o tlaku vyvolaném vnější silou v uzavřené nádobě s kapalinou?',
			odpovedi: [
				'přenáší se rovnoměrně do všech směrů',
				'působí jen ve směru působící síly',
				'působí jen směrem dolů ke dnu',
			],
		},
		{
			text: 'Proč kapaliny dobře přenášejí tlak?',
			odpovedi: [
				'jsou téměř dokonale nestlačitelné',
				'jsou snadno stlačitelné',
				'mají vlastní stálý tvar',
			],
		},
		{
			text: 'Zatlačíme na píst baňky s otvory naplněné vodou. Jak voda vystřikuje?',
			odpovedi: [
				'všemi směry kolmo ke stěnám nádoby',
				'jen ve směru pohybu pístu',
				'jen otvorem naproti pístu',
			],
		},
		{
			text: 'Co je základem hydraulického zařízení?',
			odpovedi: [
				'dvě propojené nádoby s písty o různých plochách',
				'dvě oddělené nádoby bez propojení',
				'pružina spojená s pákou',
			],
		},
		{
			text: 'Jaká kapalina se v hydraulických zařízeních obvykle používá?',
			odpovedi: ['olej', 'rtuť', 'slaná voda'],
		},
		{
			text: 'Jaký je tlak kapaliny v hydraulickém systému?',
			odpovedi: [
				'v celém systému stejný',
				'u velkého pístu vždy větší',
				'u malého pístu vždy menší',
			],
		},
		{
			text: 'Který vztah platí v hydraulickém zařízení?',
			odpovedi: ['F₁ : S₁ = F₂ : S₂', 'F₁ · S₁ = F₂ : S₂', 'F₁ + S₁ = F₂ + S₂'],
		},
		{
			text: 'Podle jakého vzorce vypočítáme sílu na velkém pístu?',
			odpovedi: ['F₂ = F₁ · (S₂ : S₁)', 'F₂ = F₁ · (S₁ : S₂)', 'F₂ = F₁ + S₂'],
		},
		{
			text: 'Plocha druhého pístu je 10× větší než plocha prvního. Jaká síla na něj působí?',
			odpovedi: ['10× větší', '10× menší', 'stejná'],
		},
		{
			text: 'Na malý píst o obsahu 3 m² působí síla 24 N. Jaký tlak vznikne v kapalině?',
			odpovedi: ['8 Pa', '72 Pa', '27 Pa'],
		},
		{
			text: 'Tlak v kapalině je 8 Pa a velký píst má obsah 12 m². Jak velká síla na něj působí?',
			odpovedi: ['96 N', '20 N', '1,5 N'],
		},
		{
			text: 'Zubař tlačí na malý píst o ploše 5 cm² (0,0005 m²) silou 20 N. Jaký tlak vznikne?',
			odpovedi: ['40 000 Pa', '100 Pa', '4 Pa'],
		},
		{
			text: 'Velký píst zubařského křesla je 80× větší než malý. Síla zubaře je 20 N. Jaká síla zvedá křeslo?',
			odpovedi: ['1 600 N', '80 N', '160 N'],
		},
		{
			text: 'Proč se hydraulice říká „páka na sílu"?',
			odpovedi: [
				'malou silou na malém pístu vyvoláme velkou sílu na velkém pístu',
				'protože obsahuje páku a závaží',
				'protože zmenšuje tlak v kapalině',
			],
		},
		{
			text: 'Co se stane po sešlápnutí brzdového pedálu v autě?',
			odpovedi: [
				'tlak brzdové kapaliny se přenese na písty u kol, které přitlačí destičky',
				'ocelové lanko zatáhne přímo za kola',
				'stlačený vzduch nafoukne pneumatiky',
			],
		},
		{
			text: 'Jak funguje hydraulický výtah?',
			odpovedi: [
				'kabina je tlačena nahoru hydraulickým pístem',
				'kabina visí jen na ocelových lanech',
				'kabinu nadnáší stlačený vzduch',
			],
		},
		{
			text: 'Kde všude se hydraulika využívá?',
			odpovedi: [
				'zvedáky, lisy, brzdy aut, bagry, zubařská křesla',
				'žárovky, vařiče a ledničky',
				'sluneční hodiny a kompasy',
			],
		},
		{
			text: 'Jak vypočítáme obsah kruhového pístu o poloměru r?',
			odpovedi: ['S = π · r²', 'S = π · r', 'S = 2 · π · r'],
		},
		{
			text: 'Jakou hodnotu má Ludolfovo číslo π (zaokrouhleně)?',
			odpovedi: ['3,14', '31,4', '1,34'],
		},
		{
			text: 'Převod jednotek: 400 cm² = ?',
			odpovedi: ['0,04 m²', '4 m²', '0,4 m²'],
		},
		{
			text: 'Pokud je plocha druhého pístu 100× větší než prvního, výsledná síla se…',
			odpovedi: ['znásobí 100×', 'zmenší 100×', 'nezmění'],
		},
	],
	'fyzika/7-rocnik/tlak-v-kapalinach/hydrostaticky-tlak': [
		{
			text: 'Čím vzniká hydrostatický tlak?',
			odpovedi: [
				'působením gravitační síly Země na kapalinu',
				'působením větru na hladinu',
				'zahříváním kapaliny',
			],
		},
		{
			text: 'Na co působí hydrostatický tlak?',
			odpovedi: [
				'na dno, stěny nádoby i tělesa ponořená v kapalině',
				'jen na dno nádoby',
				'jen na hladinu kapaliny',
			],
		},
		{
			text: 'Na čem závisí velikost hydrostatického tlaku?',
			odpovedi: [
				'na hloubce pod hladinou a hustotě kapaliny',
				'na tvaru nádoby a množství vody',
				'na barvě a teplotě nádoby',
			],
		},
		{
			text: 'Podle jakého vzorce vypočítáme hydrostatický tlak?',
			odpovedi: ['pₕ = h · ρ · g', 'pₕ = h : ρ : g', 'pₕ = F · S'],
		},
		{
			text: 'V jakých jednotkách dosazujeme hloubku h do vzorce?',
			odpovedi: ['v metrech', 'v centimetrech', 'v litrech'],
		},
		{
			text: 'Jaká je hustota vody?',
			odpovedi: ['1000 kg/m³', '100 kg/m³', '10 000 kg/m³'],
		},
		{
			text: 'Jakou hodnotu gravitační konstanty g používáme při výpočtech?',
			odpovedi: ['10 N/kg', '100 N/kg', '1 N/kg'],
		},
		{
			text: 'Jak se mění hydrostatický tlak s rostoucí hloubkou?',
			odpovedi: ['roste', 'klesá', 'nemění se'],
		},
		{
			text: 'Jak se změní hydrostatický tlak, když je kapalina hustší?',
			odpovedi: ['je větší', 'je menší', 'hustota tlak neovlivňuje'],
		},
		{
			text: 'Co říká hydrostatický paradox o nádobách se stejným dnem a stejnou výškou hladiny?',
			odpovedi: [
				'síla na dno je stejná bez ohledu na tvar nádoby',
				'v širší nádobě je síla na dno větší',
				'v užší nádobě je síla na dno větší',
			],
		},
		{
			text: 'Jak jsou vysoko hladiny kapaliny ve spojených nádobách?',
			odpovedi: [
				've všech částech ve stejné výšce',
				'v širší nádobě výš',
				'v užší nádobě výš',
			],
		},
		{
			text: 'Na jakém principu funguje hadicová vodováha?',
			odpovedi: ['spojených nádob', 'páky', 'magnetické síly'],
		},
		{
			text: 'Proč je hráz přehrady u dna mnohem širší než nahoře?',
			odpovedi: [
				'protože tlak vody s hloubkou roste a hráz mu musí odolat',
				'jen kvůli hezčímu vzhledu',
				'aby se na ni lépe šplhalo',
			],
		},
		{
			text: 'Proč se vodojem staví výš než okolní budovy?',
			odpovedi: [
				'výška hladiny vytváří tlak, díky kterému teče voda z kohoutků',
				'aby byl vidět z dálky',
				'aby do něj nepršelo',
			],
		},
		{
			text: 'K čemu slouží sifon u umyvadla a WC?',
			odpovedi: [
				'vodní zátka brání pronikání zápachu z odpadu',
				'šetří vodu při splachování',
				'ohřívá vodu v potrubí',
			],
		},
		{
			text: 'K čemu slouží plavební komora (zdymadlo)?',
			odpovedi: [
				'pomáhá lodím překonat výškové rozdíly hladin',
				'suší lodě po plavbě',
				'měří rychlost proudu řeky',
			],
		},
		{
			text: 'Jaký je přibližně hydrostatický tlak v hloubce 10 m pod vodou?',
			odpovedi: ['100 000 Pa', '1 000 Pa', '10 Pa'],
		},
		{
			text: 'Vypočítej hydrostatický tlak vody v hloubce 3 m (ρ = 1000 kg/m³, g = 10 N/kg):',
			odpovedi: ['30 000 Pa', '3 000 Pa', '300 000 Pa'],
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlakovou sílu vody na plochu S v hloubce h?',
			odpovedi: ['F = S · h · ρ · g', 'F = S : h : ρ : g', 'F = h · ρ · g : S'],
		},
		{
			text: 'Starý most (6 × 8 m, tedy S = 48 m²) je v hloubce 5 m. Jakou silou na něj působí voda?',
			odpovedi: ['2 400 000 N', '240 N', '24 000 N'],
		},
		{
			text: 'Krychle o hraně 2 m leží na dně. Voda sahá 5 m nade dno. Jaká hloubka h platí pro horní stěnu krychle?',
			odpovedi: ['3 m', '5 m', '2 m'],
		},
	],
};

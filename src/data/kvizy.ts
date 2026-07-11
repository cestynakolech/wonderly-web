export type Otazka = {
	text: string;
	/** Správná odpověď je VŽDY první — na stránce se pořadí zamíchá */
	odpovedi: [string, string, string];
	/** Krátké vysvětlení správné odpovědi (ukáže se při špatné odpovědi) */
	vysvetleni?: string;
};

/**
 * Kvízy k podtématům. Klíč = predmet/rocnik/tema/podtema.
 * Otázky vychází výhradně z ověřených podkladů daného tématu
 * (kontrolní protokoly: Omega/dokumenty/kontrola-podkladu-*.md).
 */
export const kvizy: Record<string, Otazka[]> = {
	'fyzika/7-rocnik/tlak-v-kapalinach/tlak': [
		{
			text: 'Jak působí tlaková síla na plochu tělesa?',
			odpovedi: ['kolmo na plochu', 'rovnoběžně s plochou', 'vždy svisle dolů'],
			vysvetleni: 'Tlaková síla působí při dotyku těles vždy kolmo na plochu — proto se ve vzorci počítá s plochou, na kterou síla „tlačí".',
		},
		{
			text: 'Čím se mohou projevit účinky tlakové síly na těleso?',
			odpovedi: ['deformací (změnou tvaru) tělesa', 'změnou barvy tělesa', 'zvětšením hmotnosti tělesa'],
			vysvetleni: 'Tlaková síla těleso deformuje — mění jeho tvar (promáčklý míč, otisk ve sněhu). Barvu ani hmotnost síla nemění.',
		},
		{
			text: 'Jakou značkou označujeme tlak?',
			odpovedi: ['p', 'T', 'F'],
			vysvetleni: 'Tlak značíme malým p (z latinského pressio). F je síla a T teplota.',
		},
		{
			text: 'Jaká je základní jednotka tlaku?',
			odpovedi: ['pascal (Pa)', 'newton (N)', 'kilogram (kg)'],
			vysvetleni: 'Jednotkou tlaku je pascal (Pa), pojmenovaný po Blaise Pascalovi. Newton je jednotka síly, kilogram hmotnosti.',
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlak?',
			odpovedi: ['p = F : S', 'p = F · S', 'p = S : F'],
			vysvetleni: 'Tlak = síla děleno plocha (p = F : S). Čím větší síla a menší plocha, tím větší tlak.',
		},
		{
			text: 'Tlak 1 Pa vyvolá síla 1 N působící kolmo na plochu…',
			odpovedi: ['1 m²', '1 cm²', '1 km²'],
			vysvetleni: '1 Pa = 1 N na 1 m². Představ si 100 g čokolády rozsypané na ploše 1 × 1 metr.',
		},
		{
			text: 'Kolik pascalů je 1 kilopascal (kPa)?',
			odpovedi: ['1 000 Pa', '100 Pa', '10 000 Pa'],
			vysvetleni: 'Předpona kilo- znamená tisíc: 1 kPa = 1 000 Pa (jako 1 km = 1 000 m).',
		},
		{
			text: 'Kolik pascalů je 1 megapascal (MPa)?',
			odpovedi: ['1 000 000 Pa', '1 000 Pa', '100 000 Pa'],
			vysvetleni: 'Předpona mega- znamená milion: 1 MPa = 1 000 000 Pa.',
		},
		{
			text: 'Kolik pascalů je 1 hektopascal (hPa), který se používá v meteorologii?',
			odpovedi: ['100 Pa', '1 000 Pa', '10 Pa'],
			vysvetleni: 'Předpona hekto- znamená sto: 1 hPa = 100 Pa. Normální atmosférický tlak je asi 1 013 hPa.',
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti tlakové síly?',
			odpovedi: [
				'přímo úměrně — čím větší síla, tím větší tlak',
				'nepřímo úměrně — čím větší síla, tím menší tlak',
				'velikost tlaku na síle nezávisí',
			],
			vysvetleni: 'Síla je ve vzorci p = F : S nahoře — když se zdvojnásobí síla, zdvojnásobí se i tlak.',
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti plochy, na kterou síla působí?',
			odpovedi: [
				'nepřímo úměrně — čím větší plocha, tím menší tlak',
				'přímo úměrně — čím větší plocha, tím větší tlak',
				'velikost tlaku na ploše nezávisí',
			],
			vysvetleni: 'Plochou se ve vzorci dělí — stejná síla rozložená na větší plochu dává menší tlak (proto se sněžnice nezaboří).',
		},
		{
			text: 'Proč bolí šlápnutí jehlovým podpatkem víc než teniskou?',
			odpovedi: [
				'stejná síla působí na menší plochu, takže vzniká větší tlak',
				'jehlový podpatek je vždy těžší než teniska',
				'guma tenisky tlak zvětšuje',
			],
			vysvetleni: 'Váha člověka je stejná, ale podpatek ji soustředí na maličkou plochu — tlak je proto obrovský.',
		},
		{
			text: 'Jak můžeme tlak zvětšit?',
			odpovedi: [
				'zmenšením plochy nebo zvětšením síly',
				'zvětšením plochy, na kterou síla působí',
				'zmenšením působící síly',
			],
			vysvetleni: 'Větší tlak = víc síly, nebo menší plocha (broušení nože zmenšuje plochu ostří).',
		},
		{
			text: 'Jak můžeme tlak zmenšit?',
			odpovedi: [
				'zvětšením plochy, na kterou se síla rozloží',
				'zmenšením plochy, na kterou síla působí',
				'zvětšením působící síly',
			],
			vysvetleni: 'Menší tlak = síla rozložená na větší plochu (pásy bagru, sněžnice, široké pneumatiky).',
		},
		{
			text: 'Proč se ostří nože nebo sekery brousí?',
			odpovedi: [
				'zmenší se plocha ostří, a tím vznikne větší tlak',
				'nůž je po nabroušení lehčí',
				'zvětší se plocha ostří, a tím vznikne menší tlak',
			],
			vysvetleni: 'Broušením se ostří zúží — stejná síla pak působí na menší plochu a tlak je větší, nůž líp řeže.',
		},
		{
			text: 'K čemu slouží sněžnice?',
			odpovedi: [
				'rozloží sílu na větší plochu, takže se do sněhu nezaboříme',
				'zvětšují tlak na sníh, abychom se zabořili',
				'zmenšují plochu, na kterou působí naše váha',
			],
			vysvetleni: 'Sněžnice zvětší plochu pod nohou — váha se rozloží, tlak klesne a sníh nás unese.',
		},
		{
			text: 'Proč mají bagry a tanky pásy a traktory široké pneumatiky?',
			odpovedi: [
				'aby se rozložila síla na větší plochu a stroj se nebořil do měkké půdy',
				'aby byl tlak na půdu co největší',
				'jen kvůli vyšší rychlosti jízdy',
			],
			vysvetleni: 'Těžký stroj na velké ploše pásů působí menším tlakem než auto na úzkých kolech — proto se neboří.',
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlakovou sílu, když známe tlak a plochu?',
			odpovedi: ['F = p · S', 'F = p : S', 'F = S : p'],
			vysvetleni: 'Ze vzorce p = F : S plyne F = p · S (tlak krát plocha).',
		},
		{
			text: 'V jakých jednotkách musíme do vzorce pro tlak dosazovat obsah plochy S?',
			odpovedi: ['v metrech čtverečních (m²)', 'v centimetrech čtverečních (cm²)', 'v jakýchkoli jednotkách plochy'],
			vysvetleni: 'Do vzorce patří základní jednotky: plocha v m². Kdo dosadí cm², vyjde mu úplně jiný výsledek.',
		},
		{
			text: 'Kolik dm² je 1 m²?',
			odpovedi: ['100 dm²', '10 dm²', '1 000 dm²'],
			vysvetleni: 'U ploch je každý krok ×100: 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm².',
		},
		{
			text: 'Krabice působí na stůl silou 50 N a její dno má obsah 0,5 m². Jaký je tlak na stůl?',
			odpovedi: ['100 Pa', '25 Pa', '250 Pa'],
			vysvetleni: 'p = F : S = 50 : 0,5 = 100 Pa. Dělení číslem 0,5 je totéž jako násobení dvěma.',
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
			vysvetleni: 'Kapalina roznese tlak všemi směry stejně — proto voda z propíchané baňky stříká na všechny strany.',
		},
		{
			text: 'Proč kapaliny dobře přenášejí tlak?',
			odpovedi: [
				'jsou téměř dokonale nestlačitelné',
				'jsou snadno stlačitelné',
				'mají vlastní stálý tvar',
			],
			vysvetleni: 'Částice kapaliny jsou těsně u sebe a nejdou stlačit — tlak se tak přenese dál beze ztrát.',
		},
		{
			text: 'Zatlačíme na píst baňky s otvory naplněné vodou. Jak voda vystřikuje?',
			odpovedi: [
				'všemi směry kolmo ke stěnám nádoby',
				'jen ve směru pohybu pístu',
				'jen otvorem naproti pístu',
			],
			vysvetleni: 'Tlak se podle Pascalova zákona šíří všemi směry — voda stříká z každého otvoru kolmo ke stěně.',
		},
		{
			text: 'Co je základem hydraulického zařízení?',
			odpovedi: [
				'dvě propojené nádoby s písty o různých plochách',
				'dvě oddělené nádoby bez propojení',
				'pružina spojená s pákou',
			],
			vysvetleni: 'Malý a velký píst spojené kapalinou: tlak od malého pístu se přenese na velký a síla se znásobí.',
		},
		{
			text: 'Jaká kapalina se v hydraulických zařízeních obvykle používá?',
			odpovedi: ['olej', 'rtuť', 'slaná voda'],
			vysvetleni: 'Používá se olej — nestlačitelný, maže součástky a nerezaví.',
		},
		{
			text: 'Jaký je tlak kapaliny v hydraulickém systému?',
			odpovedi: [
				'v celém systému stejný',
				'u velkého pístu vždy větší',
				'u malého pístu vždy menší',
			],
			vysvetleni: 'Podle Pascalova zákona je tlak všude stejný — proto platí p = F₁ : S₁ = F₂ : S₂.',
		},
		{
			text: 'Který vztah platí v hydraulickém zařízení?',
			odpovedi: ['F₁ : S₁ = F₂ : S₂', 'F₁ · S₁ = F₂ : S₂', 'F₁ + S₁ = F₂ + S₂'],
			vysvetleni: 'Tlak u obou pístů je stejný, a tlak je síla dělená plochou — proto F₁ : S₁ = F₂ : S₂.',
		},
		{
			text: 'Podle jakého vzorce vypočítáme sílu na velkém pístu?',
			odpovedi: ['F₂ = F₁ · (S₂ : S₁)', 'F₂ = F₁ · (S₁ : S₂)', 'F₂ = F₁ + S₂'],
			vysvetleni: 'Síla se znásobí tolikrát, kolikrát je velký píst větší: F₂ = F₁ · (S₂ : S₁).',
		},
		{
			text: 'Plocha druhého pístu je 10× větší než plocha prvního. Jaká síla na něj působí?',
			odpovedi: ['10× větší', '10× menší', 'stejná'],
			vysvetleni: 'Zlaté pravidlo hydrauliky: kolikrát větší plocha, tolikrát větší síla.',
		},
		{
			text: 'Na malý píst o obsahu 3 m² působí síla 24 N. Jaký tlak vznikne v kapalině?',
			odpovedi: ['8 Pa', '72 Pa', '27 Pa'],
			vysvetleni: 'p = F : S = 24 : 3 = 8 Pa.',
		},
		{
			text: 'Tlak v kapalině je 8 Pa a velký píst má obsah 12 m². Jak velká síla na něj působí?',
			odpovedi: ['96 N', '20 N', '1,5 N'],
			vysvetleni: 'F = p · S = 8 · 12 = 96 N.',
		},
		{
			text: 'Zubař tlačí na malý píst o ploše 5 cm² (0,0005 m²) silou 20 N. Jaký tlak vznikne?',
			odpovedi: ['40 000 Pa', '100 Pa', '4 Pa'],
			vysvetleni: 'p = F : S = 20 : 0,0005 = 40 000 Pa. Plochu je nutné převést na m²!',
		},
		{
			text: 'Velký píst zubařského křesla je 80× větší než malý. Síla zubaře je 20 N. Jaká síla zvedá křeslo?',
			odpovedi: ['1 600 N', '80 N', '160 N'],
			vysvetleni: '80× větší píst = 80× větší síla: 80 · 20 = 1 600 N — to uzvedne 160 kg.',
		},
		{
			text: 'Proč se hydraulice říká „páka na sílu"?',
			odpovedi: [
				'malou silou na malém pístu vyvoláme velkou sílu na velkém pístu',
				'protože obsahuje páku a závaží',
				'protože zmenšuje tlak v kapalině',
			],
			vysvetleni: 'Hydraulika násobí sílu jako páka: malá síla na malém pístu → velká síla na velkém.',
		},
		{
			text: 'Co se stane po sešlápnutí brzdového pedálu v autě?',
			odpovedi: [
				'tlak brzdové kapaliny se přenese na písty u kol, které přitlačí destičky',
				'ocelové lanko zatáhne přímo za kola',
				'stlačený vzduch nafoukne pneumatiky',
			],
			vysvetleni: 'Brzdy jsou hydraulické: pedál stlačí kapalinu a ta přenese tlak na písty u všech kol najednou.',
		},
		{
			text: 'Jak funguje hydraulický výtah?',
			odpovedi: [
				'kabina je tlačena nahoru hydraulickým pístem',
				'kabina visí jen na ocelových lanech',
				'kabinu nadnáší stlačený vzduch',
			],
			vysvetleni: 'Hydraulický výtah nevisí na lanech — kabinu tlačí zespodu píst poháněný kapalinou.',
		},
		{
			text: 'Kde všude se hydraulika využívá?',
			odpovedi: [
				'zvedáky, lisy, brzdy aut, bagry, zubařská křesla',
				'žárovky, vařiče a ledničky',
				'sluneční hodiny a kompasy',
			],
			vysvetleni: 'Hydraulika je všude, kde je potřeba znásobit sílu: zvedáky, lisy, brzdy, ramena bagrů, křesla.',
		},
		{
			text: 'Jak vypočítáme obsah kruhového pístu o poloměru r?',
			odpovedi: ['S = π · r²', 'S = π · r', 'S = 2 · π · r'],
			vysvetleni: 'Obsah kruhu je S = π · r² (2πr je obvod kruhu).',
		},
		{
			text: 'Jakou hodnotu má Ludolfovo číslo π (zaokrouhleně)?',
			odpovedi: ['3,14', '31,4', '1,34'],
			vysvetleni: 'π ≈ 3,14 — poměr obvodu kruhu k jeho průměru.',
		},
		{
			text: 'Převod jednotek: 400 cm² = ?',
			odpovedi: ['0,04 m²', '4 m²', '0,4 m²'],
			vysvetleni: '1 m² = 10 000 cm², takže 400 cm² = 400 : 10 000 = 0,04 m².',
		},
		{
			text: 'Pokud je plocha druhého pístu 100× větší než prvního, výsledná síla se…',
			odpovedi: ['znásobí 100×', 'zmenší 100×', 'nezmění'],
			vysvetleni: 'Kolikrát větší plocha, tolikrát větší síla — 100× větší píst dá 100× větší sílu.',
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
			vysvetleni: 'Gravitace táhne kapalinu dolů — horní vrstvy tlačí na spodní, a tak vzniká hydrostatický tlak.',
		},
		{
			text: 'Na co působí hydrostatický tlak?',
			odpovedi: [
				'na dno, stěny nádoby i tělesa ponořená v kapalině',
				'jen na dno nádoby',
				'jen na hladinu kapaliny',
			],
			vysvetleni: 'Tlak v kapalině působí všemi směry — na dno, stěny i na potápěče, ryby a ponorky.',
		},
		{
			text: 'Na čem závisí velikost hydrostatického tlaku?',
			odpovedi: [
				'na hloubce pod hladinou a hustotě kapaliny',
				'na tvaru nádoby a množství vody',
				'na barvě a teplotě nádoby',
			],
			vysvetleni: 'Rozhoduje jen hloubka h a hustota ρ (a g). Tvar nádoby nehraje roli — to je hydrostatický paradox.',
		},
		{
			text: 'Podle jakého vzorce vypočítáme hydrostatický tlak?',
			odpovedi: ['pₕ = h · ρ · g', 'pₕ = h : ρ : g', 'pₕ = F · S'],
			vysvetleni: 'pₕ = h · ρ · g — hloubka krát hustota krát gravitační konstanta.',
		},
		{
			text: 'V jakých jednotkách dosazujeme hloubku h do vzorce?',
			odpovedi: ['v metrech', 'v centimetrech', 'v litrech'],
			vysvetleni: 'Do vzorce patří základní jednotky: hloubka v metrech, hustota v kg/m³.',
		},
		{
			text: 'Jaká je hustota vody?',
			odpovedi: ['1000 kg/m³', '100 kg/m³', '10 000 kg/m³'],
			vysvetleni: 'Voda má 1000 kg/m³ — jeden litr vody váží přesně 1 kg.',
		},
		{
			text: 'Jakou hodnotu gravitační konstanty g používáme při výpočtech?',
			odpovedi: ['10 N/kg', '100 N/kg', '1 N/kg'],
			vysvetleni: 'Na každý kilogram působí Země silou asi 10 N — g = 10 N/kg (přesněji 9,81).',
		},
		{
			text: 'Jak se mění hydrostatický tlak s rostoucí hloubkou?',
			odpovedi: ['roste', 'klesá', 'nemění se'],
			vysvetleni: 'Čím hlouběji, tím víc vody je nad tebou a tím větší tlak — potápěči to znají.',
		},
		{
			text: 'Jak se změní hydrostatický tlak, když je kapalina hustší?',
			odpovedi: ['je větší', 'je menší', 'hustota tlak neovlivňuje'],
			vysvetleni: 'Hustší kapalina je „těžší" — ve stejné hloubce tlačí víc (mořská voda víc než sladká).',
		},
		{
			text: 'Co říká hydrostatický paradox o nádobách se stejným dnem a stejnou výškou hladiny?',
			odpovedi: [
				'síla na dno je stejná bez ohledu na tvar nádoby',
				'v širší nádobě je síla na dno větší',
				'v užší nádobě je síla na dno větší',
			],
			vysvetleni: 'Tlak u dna určuje jen hloubka a hustota — tvar nádoby ani množství vody nerozhodují.',
		},
		{
			text: 'Jak jsou vysoko hladiny kapaliny ve spojených nádobách?',
			odpovedi: [
				've všech částech ve stejné výšce',
				'v širší nádobě výš',
				'v užší nádobě výš',
			],
			vysvetleni: 'Kapalina se ve spojených nádobách ustálí ve stejné výšce — jinak by ji rozdíl tlaků přelil.',
		},
		{
			text: 'Na jakém principu funguje hadicová vodováha?',
			odpovedi: ['spojených nádob', 'páky', 'magnetické síly'],
			vysvetleni: 'Průhledná hadice s vodou = spojené nádoby: obě hladiny jsou vždy stejně vysoko.',
		},
		{
			text: 'Proč je hráz přehrady u dna mnohem širší než nahoře?',
			odpovedi: [
				'protože tlak vody s hloubkou roste a hráz mu musí odolat',
				'jen kvůli hezčímu vzhledu',
				'aby se na ni lépe šplhalo',
			],
			vysvetleni: 'U dna je hydrostatický tlak největší — hráz tam proto musí být nejsilnější.',
		},
		{
			text: 'Proč se vodojem staví výš než okolní budovy?',
			odpovedi: [
				'výška hladiny vytváří tlak, díky kterému teče voda z kohoutků',
				'aby byl vidět z dálky',
				'aby do něj nepršelo',
			],
			vysvetleni: 'Voda teče z kohoutku díky tlaku daném výškou hladiny ve vodojemu — proto musí být nad domy.',
		},
		{
			text: 'K čemu slouží sifon u umyvadla a WC?',
			odpovedi: [
				'vodní zátka brání pronikání zápachu z odpadu',
				'šetří vodu při splachování',
				'ohřívá vodu v potrubí',
			],
			vysvetleni: 'V ohnutém potrubí zůstává voda — tvoří zátku, přes kterou zápach z kanalizace neprojde.',
		},
		{
			text: 'K čemu slouží plavební komora (zdymadlo)?',
			odpovedi: [
				'pomáhá lodím překonat výškové rozdíly hladin',
				'suší lodě po plavbě',
				'měří rychlost proudu řeky',
			],
			vysvetleni: 'Loď vpluje do komory, voda se napustí či vypustí (princip spojených nádob) a loď „vyjede" na jinou hladinu.',
		},
		{
			text: 'Jaký je přibližně hydrostatický tlak v hloubce 10 m pod vodou?',
			odpovedi: ['100 000 Pa', '1 000 Pa', '10 Pa'],
			vysvetleni: 'pₕ = 10 · 1000 · 10 = 100 000 Pa — v deseti metrech přibude tlak celé jedné atmosféry.',
		},
		{
			text: 'Vypočítej hydrostatický tlak vody v hloubce 3 m (ρ = 1000 kg/m³, g = 10 N/kg):',
			odpovedi: ['30 000 Pa', '3 000 Pa', '300 000 Pa'],
			vysvetleni: 'pₕ = h · ρ · g = 3 · 1000 · 10 = 30 000 Pa.',
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlakovou sílu vody na plochu S v hloubce h?',
			odpovedi: ['F = S · h · ρ · g', 'F = S : h : ρ : g', 'F = h · ρ · g : S'],
			vysvetleni: 'Síla = tlak krát plocha: F = (h · ρ · g) · S.',
		},
		{
			text: 'Starý most (6 × 8 m, tedy S = 48 m²) je v hloubce 5 m. Jakou silou na něj působí voda?',
			odpovedi: ['2 400 000 N', '240 N', '24 000 N'],
			vysvetleni: 'F = S · h · ρ · g = 48 · 5 · 1000 · 10 = 2 400 000 N = 2 400 kN.',
		},
		{
			text: 'Krychle o hraně 2 m leží na dně. Voda sahá 5 m nade dno. Jaká hloubka h platí pro horní stěnu krychle?',
			odpovedi: ['3 m', '5 m', '2 m'],
			vysvetleni: 'Horní stěna je 2 m nade dnem, hladina 5 m — hloubka nad stěnou je 5 − 2 = 3 m.',
		},
	],
	'fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa': [
		{ text: 'Co je pohyb tělesa?', odpovedi: ['změna polohy tělesa vzhledem k jinému tělesu', 'jakékoli chvění tělesa', 'změna teploty tělesa'], vysvetleni: 'Pohyb = změna polohy vzhledem k jinému tělesu. Bez porovnání s jiným tělesem o pohybu mluvit nejde.' },
		{ text: 'Kdy je těleso v klidu?', odpovedi: ['když vzhledem k jinému tělesu nemění svou polohu', 'když se nehýbe vzhledem k čemukoli ve vesmíru', 'když na něj nepůsobí žádná síla'], vysvetleni: 'Klid posuzujeme vždy vzhledem ke zvolenému tělesu — proto je klid relativní.' },
		{ text: 'Cestující sedí v jedoucím vlaku. Vzhledem k sedadlu je…', odpovedi: ['v klidu', 'v pohybu', 'ani jedno'], vysvetleni: 'Vůči sedadlu polohu nemění — je v klidu; vůči nádraží se ale pohybuje.' },
		{ text: 'Tentýž cestující je vzhledem k lidem na nástupišti…', odpovedi: ['v pohybu', 'v klidu', 'nelze rozhodnout'], vysvetleni: 'Vzhledem k nástupišti svou polohu mění — je v pohybu. Záleží na pozorovateli.' },
		{ text: 'Říkáme, že klid a pohyb jsou…', odpovedi: ['relativní — záleží, k čemu je vztahujeme', 'absolutní — platí vždy stejně', 'náhodné'], vysvetleni: 'Stejné těleso může být současně v klidu (k sedadlu) i v pohybu (k nádraží).' },
		{ text: 'Co je trajektorie?', odpovedi: ['čára, po které se těleso pohybuje', 'délka uražené cesty', 'čas pohybu tělesa'], vysvetleni: 'Trajektorie je čára pohybu — např. stopa lyžaře ve sněhu.' },
		{ text: 'Trajektorie může být…', odpovedi: ['viditelná (stopa lyžaře) i myšlená (let letadla)', 'jen viditelná', 'jen myšlená'], vysvetleni: 'Někdy trajektorii vidíme (stopa), jindy si ji jen představujeme (dráha letu).' },
		{ text: 'Co je dráha?', odpovedi: ['délka trajektorie', 'tvar trajektorie', 'rychlost pohybu'], vysvetleni: 'Dráha s = délka čáry, kterou těleso opsalo; měříme ji v metrech.' },
		{ text: 'Jakou značku má dráha?', odpovedi: ['s', 'd', 't'], vysvetleni: 'Dráha se značí s, čas t, rychlost v.' },
		{ text: 'Jaká je základní jednotka dráhy?', odpovedi: ['metr (m)', 'kilometr (km)', 'sekunda (s)'], vysvetleni: 'Základní jednotkou dráhy je metr; kilometry a centimetry jsou odvozené.' },
		{ text: 'Pohyb, jehož trajektorií je přímka, se nazývá…', odpovedi: ['přímočarý', 'křivočarý', 'otáčivý'], vysvetleni: 'Přímá trajektorie = přímočarý pohyb, např. jedoucí výtah.' },
		{ text: 'Pohyb, jehož trajektorií je křivka, se nazývá…', odpovedi: ['křivočarý', 'přímočarý', 'rovnoměrný'], vysvetleni: 'Křivá trajektorie = křivočarý pohyb, např. slalom lyžaře nebo hod míčem.' },
		{ text: 'Jedoucí výtah koná pohyb…', odpovedi: ['přímočarý', 'křivočarý', 'otáčivý'], vysvetleni: 'Výtah jede rovně nahoru/dolů — trajektorie je přímka.' },
		{ text: 'Lyžař ve slalomu koná pohyb…', odpovedi: ['křivočarý', 'přímočarý', 'žádný'], vysvetleni: 'Kličkuje mezi brankami — trajektorie je křivka.' },
		{ text: 'Strom u silnice je vzhledem k jedoucímu autu…', odpovedi: ['v pohybu', 'v klidu', 'nelze určit'], vysvetleni: 'Vzhledem k autu strom svou polohu mění — z pohledu řidiče se „pohybuje" dozadu.' },
		{ text: 'Dráhu měříme…', odpovedi: ['metrem (pásmem) podél trajektorie', 'teploměrem', 'siloměrem'], vysvetleni: 'Dráha je délka — měříme ji délkovými měřidly (metr, pásmo).' },
		{ text: 'Ujel jsi na kole 2 km. Číslo 2 km je…', odpovedi: ['dráha', 'trajektorie', 'rychlost'], vysvetleni: '2 km je DÉLKA cesty = dráha. Trajektorie je samotná čára cesty.' },
		{ text: 'Který z těchto údajů popisuje trajektorii?', odpovedi: ['tvar čáry pohybu (přímka, kružnice…)', 'počet kilometrů', 'počet minut'], vysvetleni: 'Trajektorie = tvar čáry; kilometry jsou dráha, minuty čas.' },
		{ text: 'Spolujezdec v autě je v klidu vzhledem k…', odpovedi: ['řidiči', 'domům u silnice', 'chodcům na chodníku'], vysvetleni: 'Vzhledem k řidiči polohu nemění; vůči domům a chodcům se pohybuje.' },
		{ text: 'Může být těleso zároveň v klidu i v pohybu?', odpovedi: ['ano — vzhledem k různým tělesům', 'ne, nikdy', 'jen ve vesmíru'], vysvetleni: 'Ano! Cestující: v klidu k vlaku, v pohybu k nádraží. Proto je pohyb relativní.' },
		{ text: 'Dráha 1 km je kolik metrů?', odpovedi: ['1 000 m', '100 m', '10 000 m'], vysvetleni: '1 km = 1 000 m (kilo- znamená tisíc).' },
	],
	'fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb': [
		{ text: 'Kolik existuje základních jednoduchých pohybů těles?', odpovedi: ['dva — posuvný a otáčivý', 'tři — posuvný, otáčivý a šikmý', 'jeden — posuvný'], vysvetleni: 'Základní pohyby jsou dva: posuvný a otáčivý. Vše složitější je jejich kombinace.' },
		{ text: 'Jak se pohybují body tělesa při posuvném pohybu?', odpovedi: ['všechny stejným směrem a stejnou rychlostí', 'každý jinou rychlostí', 'po kružnicích kolem osy'], vysvetleni: 'Při posuvném pohybu se každý bod pohybuje úplně stejně — po stejné trajektorii.' },
		{ text: 'Jaké trajektorie mají body tělesa při posuvném pohybu?', odpovedi: ['stejný tvar i stejnou délku', 'různé tvary', 'vždy kružnice'], vysvetleni: 'Trajektorie všech bodů jsou shodné — každý bod urazí stejnou dráhu.' },
		{ text: 'Který pohyb je posuvný?', odpovedi: ['vlak jedoucí po rovné trati', 'hodinová ručička', 'krasobruslařka při piruetě'], vysvetleni: 'Vlak na rovné trati: všechny body jedou stejně. Ručička i pirueta jsou otáčivé pohyby.' },
		{ text: 'Zboží na pokladním pásu koná pohyb…', odpovedi: ['posuvný', 'otáčivý', 'složený'], vysvetleni: 'Pás nese zboží rovně stejnou rychlostí — posuvný pohyb.' },
		{ text: 'Může být posuvný pohyb i křivočarý?', odpovedi: ['ano — body opisují shodné křivky', 'ne, jen přímočarý', 'jen u vlaků'], vysvetleni: 'Ano — důležité je, že všechny body opíší stejnou čáru; ta může být i křivka.' },
		{ text: 'Jak se pohybují body tělesa při otáčivém pohybu?', odpovedi: ['po kružnicích kolem osy otáčení', 'všechny stejně rychle', 'po přímkách'], vysvetleni: 'Body krouží po kružnicích se středy na ose otáčení.' },
		{ text: 'Co je osa otáčení?', odpovedi: ['pevná přímka, kolem které se těleso otáčí', 'nejrychlejší bod tělesa', 'délka kružnice'], vysvetleni: 'Osa otáčení je pevná část, kolem níž se vše točí — třeba hřídel kola.' },
		{ text: 'Který bod tělesa se při otáčení pohybuje nejrychleji?', odpovedi: ['bod nejdál od osy otáčení', 'bod nejblíž ose', 'všechny stejně'], vysvetleni: 'Čím dál od osy, tím větší kružnici bod opisuje za stejný čas — je rychlejší.' },
		{ text: 'Konec hodinové ručičky se oproti jejímu středu pohybuje…', odpovedi: ['rychleji', 'pomaleji', 'stejně'], vysvetleni: 'Konec je dál od osy → větší kružnice za stejný čas → větší rychlost.' },
		{ text: 'Kde leží osa otáčení u krasobruslařky při piruetě?', odpovedi: ['uvnitř tělesa — je to osa jejího těla', 'mimo těleso', 'v bruslích diváka'], vysvetleni: 'Točí se kolem osy vlastního těla — osa je uvnitř tělesa.' },
		{ text: 'Kde leží osa otáčení u auta na kruhovém objezdu?', odpovedi: ['mimo těleso — ve středu objezdu', 'uvnitř auta', 'v kolech auta'], vysvetleni: 'Auto krouží kolem středu objezdu — osa otáčení je mimo něj.' },
		{ text: 'Houpačka na hřišti koná pohyb…', odpovedi: ['otáčivý (část kružnice)', 'posuvný', 'žádný'], vysvetleni: 'Houpačka opisuje část kružnice kolem závěsu — otáčivý pohyb.' },
		{ text: 'Co je složený pohyb?', odpovedi: ['pohyb složený z více jednoduchých pohybů', 'velmi rychlý pohyb', 'pohyb do kopce'], vysvetleni: 'Složený pohyb = kombinace posuvného a otáčivého (nebo více otáčivých).' },
		{ text: 'Z čeho je složen pohyb planety Země?', odpovedi: ['ze dvou otáčivých pohybů — kolem osy a kolem Slunce', 'jen z posuvného', 'z posuvného a kmitavého'], vysvetleni: 'Země se točí kolem vlastní osy a zároveň obíhá kolem Slunce — dva otáčivé pohyby.' },
		{ text: 'Jaký pohyb koná šroub při šroubování do dřeva?', odpovedi: ['složený — otáčí se a zároveň se posouvá', 'jen otáčivý', 'jen posuvný'], vysvetleni: 'Šroub se točí a přitom leze dopředu — kombinace obou pohybů.' },
		{ text: 'Jaký tvar má trajektorie šroubu při šroubování?', odpovedi: ['šroubovice', 'kružnice', 'přímka'], vysvetleni: 'Otáčení + posun dá dohromady šroubovici (jako tobogán).' },
		{ text: 'Horská dráha je příkladem pohybu…', odpovedi: ['složeného', 'jen posuvného', 'jen otáčivého'], vysvetleni: 'Vozík jede vpřed, kroutí se v zatáčkách a loopinzích — složený pohyb.' },
		{ text: 'Letadlo při dálkovém letu koná pohyb…', odpovedi: ['posuvný', 'otáčivý', 'kmitavý'], vysvetleni: 'Letí rovně stálým směrem — všechny body stejně = posuvný pohyb.' },
		{ text: 'Kolotoč na pouti koná pohyb…', odpovedi: ['otáčivý', 'posuvný', 'složený z posuvných'], vysvetleni: 'Kolotoč se točí kolem svislé osy uprostřed — otáčivý pohyb.' },
		{ text: 'Body na obvodu kola jedoucího bagru se vzhledem k ose kola pohybují…', odpovedi: ['po kružnicích', 'po přímkách', 'vůbec'], vysvetleni: 'Vzhledem k ose opisují body obvodu kola kružnice — otáčivá složka pohybu.' },
	],
	'fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas': [
		{ text: 'Co vyjadřuje rychlost?', odpovedi: ['vzdálenost, kterou těleso urazí za jednotku času', 'délku celé cesty', 'hmotnost tělesa v pohybu'], vysvetleni: 'Rychlost říká, kolik metrů (km) těleso urazí za sekundu (hodinu).' },
		{ text: 'Jaká je značka rychlosti?', odpovedi: ['v', 's', 'r'], vysvetleni: 'Rychlost je v (velocitas), dráha s, čas t.' },
		{ text: 'Jaká je základní jednotka rychlosti?', odpovedi: ['metr za sekundu (m/s)', 'kilometr za hodinu (km/h)', 'metr (m)'], vysvetleni: 'Základní jednotka je m/s; km/h je běžná v dopravě, ale odvozená.' },
		{ text: 'Podle jakého vzorce vypočítáme rychlost?', odpovedi: ['v = s : t', 'v = s · t', 'v = t : s'], vysvetleni: 'Rychlost = dráha děleno čas. Nahoře kilometry/metry, dole hodiny/sekundy.' },
		{ text: 'Auto jede stálou rychlostí 20 m/s. Co to znamená?', odpovedi: ['každou sekundu urazí 20 metrů', 'každou minutu urazí 20 metrů', 'ujede nejvýše 20 km'], vysvetleni: '20 m/s = dvacet metrů každou sekundu.' },
		{ text: 'Kolik km/h je 1 m/s?', odpovedi: ['3,6 km/h', '36 km/h', '0,36 km/h'], vysvetleni: '1 m/s = 3,6 km/h (hodina má 3600 s, kilometr 1000 m; 3600:1000 = 3,6).' },
		{ text: 'Kolik km/h je 10 m/s?', odpovedi: ['36 km/h', '3,6 km/h', '360 km/h'], vysvetleni: '10 · 3,6 = 36 km/h.' },
		{ text: 'Proč se při převodu m/s ↔ km/h nesmí jen posunout desetinná čárka?', odpovedi: ['čas se nepřevádí v desítkové soustavě — hodina má 3600 s', 'protože je to zakázané', 'smí se to'], vysvetleni: 'Kilometr má 1000 m, ale hodina 3600 s — proto násobíme/dělíme číslem 3,6.' },
		{ text: 'Kolik m/s je 1 km/s?', odpovedi: ['1000 m/s', '100 m/s', '3,6 m/s'], vysvetleni: 'Mění se jen jednotka délky (čas stejný) → 1 km/s = 1000 m/s.' },
		{ text: 'Rychlost 2 m/s je kolik metrů za minutu?', odpovedi: ['120 m/min', '20 m/min', '2 m/min'], vysvetleni: 'Minuta má 60 sekund → 2 · 60 = 120 m za minutu.' },
		{ text: 'Co je okamžitá rychlost?', odpovedi: ['rychlost tělesa v daném okamžiku', 'průměr za celou cestu', 'nejvyšší povolená rychlost'], vysvetleni: 'Okamžitá rychlost = jak rychle jedeš právě teď; ukazuje ji tachometr.' },
		{ text: 'Čím se měří okamžitá rychlost auta?', odpovedi: ['tachometrem', 'teploměrem', 'siloměrem'], vysvetleni: 'Tachometr v autě (a policejní radar) měří okamžitou rychlost.' },
		{ text: 'Čím se měří rychlost větru?', odpovedi: ['anemometrem (vrtulka s kalíšky)', 'barometrem', 'manometrem'], vysvetleni: 'Anemometr je vrtulka s kalíšky; přibližně poslouží i větrný rukáv na letišti.' },
		{ text: 'Jaký pohyb koná těleso, jehož rychlost se nemění?', odpovedi: ['rovnoměrný', 'nerovnoměrný', 'zrychlený'], vysvetleni: 'Stálá rychlost = rovnoměrný pohyb (eskalátor, hodinová ručička).' },
		{ text: 'Který pohyb je rovnoměrný?', odpovedi: ['eskalátor (jezdící schody)', 'rozjíždějící se autobus', 'brzdící vlak'], vysvetleni: 'Eskalátor jede pořád stejně; rozjíždění je zrychlený a brždění zpomalený pohyb.' },
		{ text: 'Start rakety je pohyb…', odpovedi: ['zrychlený', 'zpomalený', 'rovnoměrný'], vysvetleni: 'Rychlost rakety se zvětšuje — zrychlený (nerovnoměrný) pohyb.' },
		{ text: 'Brzdící vlak koná pohyb…', odpovedi: ['zpomalený', 'zrychlený', 'rovnoměrný'], vysvetleni: 'Rychlost se zmenšuje — zpomalený pohyb.' },
		{ text: 'Jak vypadá graf rychlosti rovnoměrného pohybu (rychlost na čase)?', odpovedi: ['vodorovná přímka', 'stoupající přímka', 'klesající křivka'], vysvetleni: 'Rychlost se nemění → čára je pořád ve stejné výšce = vodorovná přímka.' },
		{ text: 'Z čeho se počítá průměrná rychlost?', odpovedi: ['z celkové dráhy a celkového času', 'z nejvyšší naměřené rychlosti', 'jen z času'], vysvetleni: 'Průměrná rychlost = celková dráha : celkový čas celého pohybu.' },
		{ text: 'Těleso urazí 30 m za 3 s. Jaká je jeho rychlost?', odpovedi: ['10 m/s', '90 m/s', '3 m/s'], vysvetleni: 'v = s : t = 30 : 3 = 10 m/s (to je 36 km/h).' },
		{ text: 'Jaké zařízení zaznamenává průběh rychlosti profesionálních řidičů?', odpovedi: ['tachograf', 'termostat', 'seismograf'], vysvetleni: 'Tachograf zapisuje rychlost v čase — kontroluje se rychlost i přestávky.' },
	],
	'fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti': [
		{ text: 'Jak vypočítáme dráhu rovnoměrného pohybu?', odpovedi: ['s = v · t', 's = v : t', 's = t : v'], vysvetleni: 'Dráha = rychlost krát čas.' },
		{ text: 'Jak vypočítáme čas rovnoměrného pohybu?', odpovedi: ['t = s : v', 't = s · v', 't = v : s'], vysvetleni: 'Čas = dráha děleno rychlost.' },
		{ text: 'Rychlost je v km/h. V čem musí být dráha a čas?', odpovedi: ['dráha v km, čas v hodinách', 'dráha v metrech, čas v sekundách', 'na jednotkách nezáleží'], vysvetleni: 'Jednotky k sobě musí patřit: km + h + km/h, nebo m + s + m/s.' },
		{ text: 'Auto ujelo 200 km za 4 hodiny. Průměrná rychlost?', odpovedi: ['50 km/h', '80 km/h', '800 km/h'], vysvetleni: 'v = 200 : 4 = 50 km/h.' },
		{ text: 'Vlak ujel 360 km za 4 hodiny. Průměrná rychlost?', odpovedi: ['90 km/h', '72 km/h', '1440 km/h'], vysvetleni: 'v = 360 : 4 = 90 km/h.' },
		{ text: 'Běžec na lyžích urazil 30 km za 2 hodiny. Rychlost?', odpovedi: ['15 km/h', '60 km/h', '28 km/h'], vysvetleni: 'v = 30 : 2 = 15 km/h.' },
		{ text: 'Žák uběhl 100 m za 20 s. Rychlost v m/s?', odpovedi: ['5 m/s', '20 m/s', '2 m/s'], vysvetleni: 'v = 100 : 20 = 5 m/s.' },
		{ text: 'Kolik hodin je 120 minut?', odpovedi: ['2 h', '1,2 h', '12 h'], vysvetleni: '120 : 60 = 2 hodiny. Minuty na hodiny = děleno 60.' },
		{ text: 'Turista ušel 6 km za 120 minut. Rychlost v km/h?', odpovedi: ['3 km/h', '6 km/h', '20 km/h'], vysvetleni: '120 min = 2 h; v = 6 : 2 = 3 km/h.' },
		{ text: 'Kolik hodin je 36 minut?', odpovedi: ['0,6 h', '3,6 h', '0,36 h'], vysvetleni: '36 : 60 = 0,6 h.' },
		{ text: 'Turisté ušli 3 km za 36 minut (0,6 h). Rychlost?', odpovedi: ['5 km/h', '3 km/h', '10,8 km/h'], vysvetleni: 'v = 3 : 0,6 = 5 km/h.' },
		{ text: 'Cyklista urazil etapu 231 km za 5 h 30 min. Rychlost?', odpovedi: ['42 km/h', '46 km/h', '35 km/h'], vysvetleni: '5 h 30 min = 5,5 h; v = 231 : 5,5 = 42 km/h.' },
		{ text: 'Kolik hodin je 1 hodina 18 minut?', odpovedi: ['1,3 h', '1,18 h', '1,8 h'], vysvetleni: '18 min = 18:60 = 0,3 h → celkem 1,3 h. (1,18 h by bylo 1 h 10,8 min!)' },
		{ text: 'Letadlo uletělo 585 km za 1 h 18 min (1,3 h). Průměrná rychlost?', odpovedi: ['450 km/h', '1950 km/h', '585 km/h'], vysvetleni: 'v = 585 : 1,3 = 450 km/h. Kdo dělí jen 0,3 h, vyjde mu nesmyslných 1950 km/h!' },
		{ text: 'Cyklista jede rychlostí 20 km/h po dobu 3 hodin. Jakou dráhu ujede?', odpovedi: ['60 km', '23 km', '6,7 km'], vysvetleni: 's = v · t = 20 · 3 = 60 km.' },
		{ text: 'Jak dlouho pojede auto 150 km rychlostí 50 km/h?', odpovedi: ['3 hodiny', '2 hodiny', '7 500 hodin'], vysvetleni: 't = s : v = 150 : 50 = 3 h.' },
		{ text: 'Časová osa grafu je vždy…', odpovedi: ['vodorovná', 'svislá', 'šikmá'], vysvetleni: 'Čas patří na vodorovnou osu; dráha nebo rychlost na svislou.' },
		{ text: 'Jak vypadá graf dráhy rovnoměrného pohybu?', odpovedi: ['přímka stoupající vzhůru', 'vodorovná přímka', 'klesající přímka'], vysvetleni: 'Dráha s časem rovnoměrně roste — graf je stoupající přímka.' },
		{ text: 'Co uděláme s body vynesenými do grafu z tabulky?', odpovedi: ['spojíme je čarou', 'vygumujeme je', 'necháme je nespojené'], vysvetleni: 'Body z tabulky vyneseme a spojíme — vznikne graf pohybu.' },
		{ text: 'Tomáš urazí za 2 minuty 600 m. Kolik urazí za 6 minut (rovnoměrný pohyb)?', odpovedi: ['1 800 m', '1 200 m', '3 600 m'], vysvetleni: 'Dráha je přímo úměrná času: 3× delší čas = 3× delší dráha = 1800 m.' },
		{ text: 'Co musí mít popsané osy grafu?', odpovedi: ['značky veličin a jednotky', 'jen barvy', 'jméno autora'], vysvetleni: 'Bez značek veličin (s, t, v) a jednotek (m, s, km/h) graf nedává smysl.' },
	],
};

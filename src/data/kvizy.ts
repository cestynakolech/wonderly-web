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
};

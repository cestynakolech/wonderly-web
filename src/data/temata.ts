export type Material = {
	druh: 'infografika' | 'pdf' | 'video' | 'audio' | 'youtube';
	nazev: string;
	/** U druhu 'youtube' je zde ID videa (např. 'oP6IJtosIp0'), jinak cesta k souboru. */
	cesta: string;
	/**
	 * Čím na materiálu pomohla umělá inteligence — text se návštěvníkovi ukáže
	 * pod přehrávačem. Od 2. 8. 2026 platí evropská pravidla transparentnosti
	 * (článek 50 nařízení 2024/1689): obsah vytvořený nebo upravený AI se má
	 * přiznat. Píše se sem, ČÍM přesně pomohla — u polemik jsou to hlasy
	 * a úvodní ilustrace, kdežto schémata a animace kreslí program ze vzorců,
	 * takže by bylo zavádějící tvrdit, že video „vytvořila AI".
	 * Brána `zkontroluj.mjs` hlídá, že žádná polemika tenhle údaj nepostrádá.
	 */
	ai?: string;
};
export type Podtema = {
	slug: string;
	nazev: string;
	obsah?: string;
	materialy?: Material[];
	/** Externí odkazy k tématu — na stránce se ukážou s QR kódem pro naskenování */
	odkazy?: { nazev: string; url: string }[];
	/** Interaktivní prvek na stránce (komponenta se vybírá podle názvu) */
	interakce?: 'alternator' | 'archimedes' | 'atom-molekuly' | 'barometr' | 'barva' | 'barvy' | 'bezpecna-vzdalenost-vedeni' | 'bezpecnost-pocitace' | 'binarni' | 'bludiste' | 'cara' | 'cas' | 'cocka' | 'decibely' | 'diagram' | 'difuze' | 'dioda' | 'draha' | 'duha' | 'el-polje' | 'elektricka-prace-a-vykon' | 'elektricke-pole' | 'elektrolyza' | 'elektromagnet' | 'elektromotor' | 'elektron' | 'elektrovani' | 'energia' | 'fotovoltaika' | 'funkce-tabulky' | 'galvanicky-clanek' | 'graf-cesta' | 'gravitacni-sila' | 'honicka' | 'hustota' | 'hydraulika' | 'hydrostatika' | 'indukce' | 'izotopy' | 'jaderna-energia' | 'jastina' | 'jiskra' | 'kadinky' | 'kalorimetr' | 'kladka' | 'klonovani' | 'kolobeh-vody' | 'kondenzace' | 'led-displej' | 'lom' | 'magnet' | 'magneticke-pole' | 'magnety-opakovani' | 'material' | 'mechanicka' | 'meridla' | 'mereni' | 'mesic' | 'microbit-radio' | 'microbit-vstupy' | 'motor' | 'motory-displej-zvuk' | 'naboj' | 'naklonena-rovina' | 'napeti' | 'nestejnoroda-lod' | 'obnovitelne-zdroje' | 'obvod' | 'odpor' | 'odpor-vodice' | 'odpor-vodice-zaklad' | 'odraz' | 'oersted' | 'ohm' | 'ohrev' | 'oko' | 'opakovani' | 'opakovani-velicin' | 'odskok' | 'ozobot' | 'ozvena' | 'paka' | 'pakety' | 'palivo' | 'ping-pong' | 'planety-vaha' | 'pohyb' | 'pokusy' | 'polares' | 'polovodic' | 'posuvny-otacivy' | 'povetrnostni-mapa' | 'prace' | 'premeny-energie' | 'prenos' | 'pretlak' | 'prevody' | 'projekt-robot' | 'promenne' | 'proton' | 'proud' | 'razeni-clanku' | 'razeni-filtrovani' | 'reaktor' | 'refleks' | 'relativita-pohybu' | 'rezonance' | 'reostat' | 'retezova-reakce' | 'rovinne-zrcadlo' | 'rozpad' | 'rozpinani-vesmiru' | 'rychlost' | 'rychlost-svetla' | 'senzory-robota' | 'sestaveni-robota' | 'seznamy' | 'sila-mag' | 'sila-vektor' | 'skakacka' | 'skatepark' | 'skladani-sil' | 'skupenstvi' | 'souradnice' | 'soustava' | 'spektrum' | 'stridavy-proud' | 'strilecka' | 'stupnice' | 'sublimace' | 'svacina' | 'tabulka-vzorce' | 'tani' | 'teleso-latka' | 'teplomer' | 'teziste' | 'tlak' | 'tlak-plocha' | 'tlmeni' | 'transformator' | 'treni' | 'tuhnuti' | 'ucinky-proudu-a-bezpecnost' | 'ucinky-sily' | 'ucinnost-motoru' | 'udalosti' | 'uzitky' | 'valec' | 'var' | 'vedeni' | 'vetveni' | 'vesmiruni' | 'vex-gyroskop' | 'vexcode' | 'vlastni-bloky' | 'vlneni' | 'vnitrni-energie' | 'vodic' | 'vrh' | 'vykon' | 'vyparovani' | 'vypocet-rychlosti' | 'vzajemne-pusobeni' | 'vznik-elektrickeho-proudu' | 'viny' | 'zachovani' | 'zakon' | 'zapojeni' | 'zrcadlo' | 'zrychleni' | 'zvuk';
	/** Druhá interaktivní simulace na téže stránce (zobrazí se pod první) */
	interakce2?: 'kolejnice' | 'prumer';
	/**
	 * Zápis do sešitu — to nejdůležitější ze stránky k opsání. Jen body, které
	 * si žák opravdu má odnést; u veličin vždy značka i jednotka, ať je pozná
	 * ve vzorci. Zákon a vzorec se uvádějí, jen když k tématu patří.
	 */
	zapis?: {
		body: string[];
		zakon?: string;
		vzorec?: string;
		/** Vzoreček slovy, např. „mechanická energie = polohová energie + pohybová energie". */
		vzorecSlovy?: string;
		jednotky?: string[];
	};
};
export type Tema = { slug: string; nazev: string; podtemata?: Podtema[] };

export const temata: Record<string, Tema[]> = {
	'fyzika/6-rocnik': [
		{
			slug: 'latka-a-teleso',
			nazev: 'Látka a těleso',
			podtemata: [
				{
					slug: 'uvod-do-fyziky',
					nazev: 'Úvod do fyziky — co je fyzika?',
					obsah: `
						<h2>Co je fyzika?</h2>
						<p><strong>Fyzika je přírodní věda.</strong> Název vznikl z řeckého slova <strong>physis</strong> = příroda.</p>
						<p>👉 Fyzika zkoumá, popisuje a vysvětluje zákonitosti přírodních jevů — vlastnosti a chování hmoty, přírodních sil, světla i neviditelného záření, tepla, zvuku…</p>
						<h3>Jak pracuje fyzik?</h3>
						<ul>
							<li><strong>Pozorování</strong> — zkoumá, jak se příroda chová</li>
							<li><strong>Pokus (experiment)</strong> — vytváří různé podmínky a sleduje výsledky, aby své myšlenky o fungování přírody (<strong>hypotézy</strong>) potvrdil, nebo vyvrátil</li>
							<li><strong>Měření</strong> — popisuje vlastnosti čísly</li>
						</ul>
						<p>Z ověřených poznatků pak fyzici vysloví <strong>fyzikální zákony</strong>.</p>
						<h3>Jak to vypadá doopravdy — jeden slavný příklad</h3>
						<p>Skoro dva tisíce let se učilo, že <strong>těžší tělesa padají rychleji</strong> než lehká.
						Znělo to rozumně a každý si to mohl potvrdit: kámen dopadne dřív než list papíru.
						Nikdo o tom nepochyboval.</p>
						<p>Až <strong>Galileo Galilei</strong> to vzal jinak — místo přemýšlení pouštěl kuličky po
						nakloněné rovině a <strong>měřil</strong>. A vyšlo mu něco, co odporovalo tomu, co všichni
						považovali za jisté: <strong>když tělesům nepřekáží vzduch, padají všechna stejně rychle</strong> —
						ať jsou lehká, nebo těžká. List papíru je pomalejší jen proto, že se opírá o vzduch,
						ne proto, že je lehký.</p>
						<p>Dnes to jde ukázat naprosto nesporně — bez vzduchu. Astronaut mise <strong>Apollo 15</strong>
						pustil na Měsíci současně <strong>kladivo a ptačí pero</strong>. Dopadly ve stejný okamžik,
						protože na Měsíci žádný vzduch není.</p>
						<p>Zkus to i ty: pusť list papíru a knihu (dopadne kniha), pak <strong>polož list navrch
						na knihu</strong> a pusť je znovu — kniha mu odhrne vzduch z cesty a dopadnou spolu.
						Musí to být <strong>list menší než kniha</strong> a nikde nesmí přesahovat přes okraj,
						jinak se ho vzduch chytí a strhne ho pryč.</p>
						<p>👉 A tohle je na fyzice to nejdůležitější: <strong>rozhoduje pokus, ne to, co si kdo myslí</strong> —
						ani kdyby si to myslel kdokoli jak dlouho. Když měření nesouhlasí s hypotézou, mění se hypotéza.</p>
						<h3>Jak se fyzik vyjadřuje?</h3>
						<ul>
							<li><strong>odborné pojmy a značky</strong> — např. hmotnost, objem, hustota, tlak…</li>
							<li><strong>grafy a vzorce</strong> — matematické vyjádření vztahů pomocí písmen a čísel</li>
						</ul>
						<h3>Proč je dobré znát fyziku?</h3>
						<ul>
							<li>umíme <strong>vysvětlit</strong>, proč a jak se něco děje</li>
							<li>umíme <strong>předvídat</strong>, co se stane, když… (např. když auto vjede v dešti rychle do zatáčky)</li>
							<li>umíme přírodu <strong>využít v náš prospěch</strong> — jak žít v suchu a teple, jak si ulehčit práci, jak dělat věci bezpečně, jak se dostat do vesmíru…</li>
							<li>můžeme vymýšlet <strong>nové vynálezy</strong></li>
						</ul>
					`,
					materialy: [
						// Hlasy z OpenAI TTS — obsah je náš, atribuci uvádět nemusíme
						// (na rozdíl od dílů o gravitaci z bezplatného tarifu ElevenLabs,
						// které „elevenlabs.io" v názvu mít musí).
						{
							druh: 'video',
							nazev: 'Polemika: Je fyzika jen sbírka vzorců? 🎬',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky/polemika-uvod-do-fyziky.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Zkušební verze s hlasy z lokálního modelu OmniVoice (zdarma, běží
						// na tomto počítači) — stejný scénář, jiné hlasy, k porovnání.
						{
							druh: 'video',
							nazev: 'Polemika: Je fyzika jen sbírka vzorců? 🎬 (zkušební hlasy)',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky/polemika-uvod-do-fyziky-omnivoice.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Tatáž polemika, ale dvě scény jsou POHYBLIVÉ: pád kamene a papíru
						// na Zemi a pokus s kladivem a perem na Měsíci. Polohy počítá vzorec
						// pádu, takže časy dopadu na obrazovce odpovídají skutečnosti.
						{
							druh: 'video',
							nazev: 'Polemika: Je fyzika jen sbírka vzorců? 🎬 (s animacemi pokusů)',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky/polemika-uvod-do-fyziky-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'telesa-a-latky',
					nazev: 'Tělesa a látky',
					interakce: 'teleso-latka',
					obsah: `
						<h2>Tělesa a látky</h2>
						<h3>Látka</h3>
						<p><strong>Látka</strong> je fyzikální pojem pro <strong>materiál</strong>. Z určitého množství látky můžeme vytvořit konkrétní věc určitého tvaru.</p>
						<p>Příklady látek: dřevo, papír, mléko, voda, sůl, kyslík, oxid uhličitý, vzduch, sklo, železo, ocel.</p>
						<h3>Těleso</h3>
						<p><strong>Těleso</strong> je fyzikální pojem pro <strong>živý či neživý předmět</strong>.</p>
						<ul>
							<li>těleso má určitý <strong>tvar</strong> (je ohraničené), velikost, hmotnost, polohu…</li>
							<li>těleso může být tvořeno <strong>z jedné nebo více látek</strong></li>
						</ul>
						<p>Příklady těles: stůl (ze dřeva), kniha (z papíru), mléko v lahvi (z mléka), vzduch v balónku (ze vzduchu), hřebík (ze železa), oblak (z vody), okno (část ze skla, část ze dřeva a část ze železa).</p>
						<h3>🔎 Jak je od sebe bezpečně rozeznat</h3>
						<p>Když si nejsi jistý(á), pomůžou dvě otázky:</p>
						<ul>
							<li><strong>Dá se to spočítat?</strong> Tělesa ano — dvě sklenice, tři hřebíky.
							U látky to nedává smysl: „dej mi dvě skla" nebo „přines tři dřeva" nikdo neřekne.</li>
							<li><strong>Jde se toho zeptat „z čeho je to?"</strong> U tělesa ano (sklenice je ze skla).
							U látky ne — sklo je prostě sklo.</li>
						</ul>
						<p>⚠️ <strong>Pozor na past:</strong> stejné slovo umí být obojí, podle toho, jak ho použiješ.
						<em>Voda</em> obecně je látka, ale <em>voda ve sklenici</em> je už těleso — má tvar, objem
						i hmotnost. Stejně tak <em>vzduch</em> je látka, ale <em>vzduch v balonku</em> těleso.
						Nerozhoduje slovo, ale jestli mluvíš o materiálu, nebo o <strong>konkrétním kusu</strong>
						s hranicemi.</p>
						<p>👉 A ještě jedno nedorozumění: těleso <strong>nemusí být tvrdé</strong> — oblak i kapka
						deště jsou tělesa úplně stejně jako cihla. A <strong>nemusí být ani vidět</strong>:
						vzduch v pneumatice nebo v balonku je taky těleso, i když se na něj díváš skrz.</p>
						<h3>Vlastnosti látek</h3>
						<p>Různé látky se od sebe odlišují svými vlastnostmi — např. barva, chuť, vůně, tvrdost, pružnost, rozpustnost, křehkost, sypkost, tvárnost, tekutost…</p>
						<h3>Vlastnosti těles</h3>
						<ul>
							<li>tělesa mají vlastnosti látek, ze kterých jsou vyrobena</li>
							<li>mají ale i vlastnosti navíc — <strong>tvar, velikost, hmotnost…</strong></li>
						</ul>
						<p>👉 Vlastnosti těles, které můžeme <strong>změřit</strong>, se nazývají <strong>fyzikální veličiny</strong> (délka, výška, hmotnost, objem, hustota…).</p>
					`,
					materialy: [
						// Hlasy z OpenAI TTS — atribuci uvádět nemusíme.
						{
							druh: 'video',
							nazev: 'Polemika: Je látka a těleso totéž? 🎬',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/telesa-a-latky/polemika-telesa-a-latky.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika: Je látka a těleso totéž? 🎬 (druhé hlasy)',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/telesa-a-latky/polemika-telesa-a-latky-omnivoice.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Píseň: Z čeho je svět 🎵',
							cesta: '/materialy/fyzika/6-rocnik/latka-a-teleso/telesa-a-latky/pisen-z-ceho-je-svet.m4a',
						},
					],
				},
				{
					slug: 'casticove-slozeni-latek',
					nazev: 'Částicové složení látek, Brownův pohyb, difuze',
					interakce: 'difuze',
					obsah: `
						<h2>Částicové složení látek</h2>
						<h3>První myšlenka</h3>
						<p>Už v 5. století př. n. l. napadlo řecké učence (Démokritos), že látku nepůjde dělit na menší části donekonečna — jednou narazíme na nejmenší, již nedělitelné částice. Nazvali je <strong>atomy</strong> (řecky <em>atomos</em> = nedělitelný). Myšlenka tehdy nešla dokázat, a tak upadla v zapomnění.</p>
						<h3>Brownův pohyb</h3>
						<p>V 19. století pozoroval Robert Brown pod mikroskopem <strong>chaotický pohyb pylových zrnek rozptýlených ve vodě</strong>. Proč se neživá zrníčka pohybují?</p>
						<p>👉 Vysvětlení: <strong>částice vody se neustále chaoticky pohybují a vrážejí do zrníček</strong>. Brownovým pohybem dnes nazýváme <strong>neustálý neuspořádaný pohyb velmi malých částeček rozptýlených v kapalině nebo v plynu, který způsobují nárazy částic okolní látky</strong> (ve vzduchu ho je vidět třeba na částečkách kouře nebo prachu).</p>
						<p>👉 Závěr: <strong>Všechny látky jsou složeny z částic.</strong> Speciálními mikroskopy dnes umíme atomy dokonce vidět i posunovat.</p>
						<h3>Vlastnosti částic</h3>
						<ul>
							<li><strong>Pohyb částic</strong> — je <strong>neustálý</strong> (nikdy se nezastaví!) a <strong>neuspořádaný</strong> (chaotický). Říká se mu také <strong>tepelný pohyb</strong> — s rostoucí teplotou se zrychluje (molekuly vzduchu: při 0 °C asi 1 700 km/h, při 100 °C asi 2 000 km/h).</li>
							<li><strong>Částice na sebe působí silami</strong> — <strong>přitažlivé síly</strong> přitáhnou částice k sobě, pokud se vzdálí (cítíme je při natažení pružiny); <strong>odpudivé síly</strong> je oddálí, pokud se moc přiblíží (cítíme je při stlačení pružiny nebo zmáčknutí gumy). Tyto síly dělají materiál pružným.</li>
						</ul>
						<h3>Jevy způsobené pohybem částic</h3>
						<p><strong>Difuze</strong> — samovolné pronikání částic jedné látky mezi částice druhé látky, až se rovnoměrně promíchají. Probíhá <strong>v kapalinách i v plynech</strong> — všude tam, kde se částice mohou volně pohybovat. (V pevných látkách probíhá také, ale tak pomalu, že si jí nevšimneme.)</p>
						<ul>
							<li><strong>difuze v kapalině</strong> — vyluhování čaje bez míchání (barvivo z čajového sáčku se samo rozptýlí po celém hrnku); i kapka inkoustu se ve sklenici sama rozptýlí, i když vůbec nemícháme</li>
							<li><strong>difuze v plynu</strong> — šíření vůně jídla nebo parfému vzduchem; po otevření lahvičky s octem ucítíme zápach i kus dál. 👉 Pozor: že vůni z kuchyně ucítíme <em>za chvilku</em>, difuze sama nezvládne — přes celý pokoj by potřebovala mnoho dní. Kus cesty jí pomůže <strong>proudění vzduchu</strong>, který se v místnosti pořád mírně promíchává</li>
							<li>👉 pozor: difuze je <strong>nesmírně pomalá na velké vzdálenosti</strong>. Rčení, že žralok ucítí kapku krve na kilometry daleko, je přehnané — měření mluví spíš o stovkách metrů. A i na jediný kilometr by samotná difuze ve vodě potřebovala <strong>miliony let</strong>; krev k žralokovi donesou <strong>mořské proudy</strong></li>
							<li>👉 v plynech probíhá difuze <strong>rychleji</strong> než v kapalinách. Pozor na častý omyl: při stejné teplotě se částice téže látky pohybují v plynu i v kapalině <strong>stejně rychle</strong> (teplota je vlastně měřítkem té rychlosti). Rozdíl je v tom, že částice plynu má kolem sebe hodně místa, a tak uletí <strong>dlouhý kus dráhy</strong>, než do něčeho narazí — v kapalině se odrazí skoro hned</li>
							<li>👉 čím vyšší teplota, tím rychleji difuze probíhá, protože se částice pohybují rychleji — čaj se vyluhuje rychleji v horké vodě než ve studené</li>
						</ul>
						<p><strong>Tlak plynu</strong> — nárazy částic do stěn nádoby. Čím je plyn teplejší, tím rychleji se částice pohybují a tím větší silou narážejí (člun vyhřátý na slunci je natlakovaný, ve studené vodě se jakoby sfoukne).</p>
						<h3>Jevy způsobené silovým působením částic</h3>
						<ul>
							<li><strong>kapaliny tvoří kapky</strong> — silné přitažlivé síly drží molekuly u sebe</li>
							<li><strong>přilnavost</strong> — přitažlivé síly působí i mezi částicemi různých látek: tuha drží na papíře, křída na tabuli, dvě hladká zrcátka k sobě přilnou</li>
							<li><strong>nesmáčivost (nepřilnavost)</strong> — přitažlivé síly mezi částicemi vody navzájem jsou <strong>silnější</strong> než mezi vodou a mastnotou, proto se voda radši stáhne do kapky a povrch nesmáčí; využití: impregnace bot, nepřilnavé nádobí</li>
						</ul>
					`,
					materialy: [
						// PRVNÍ díl částicové série (pořadí podle učiva: nejdřív že látky
						// z částic vůbec jsou, pak jak se chovají, teprve pak difuze).
						// Scéna s pylovým zrnkem je POHYBLIVÁ — zrnko se nehýbe náhodně,
						// ale podle sečtených nárazů molekul, takže vyjde samo, že uražená
						// dráha je mnohem delší než výsledné posunutí.
						{
							druh: 'video',
							nazev: 'Polemika: Z čeho je všechno složené? 🎬 (s animací Brownova pohybu)',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/polemika-casticove-slozeni-latek-atomy.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// DRUHÝ díl. Animovaná scéna zahřívání schválně NEZVELIČUJE rozdíl:
						// rychlost roste s odmocninou teploty, takže mezi nulou a stem
						// stupňů je to jen 17 % — proto ho měří pruh s číslem v km/h.
						{
							druh: 'video',
							nazev: 'Polemika: Jak se částice chovají? 🎬 (s animací zahřívání)',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/polemika-casticove-slozeni-latek-pohyb.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Třetí díl částicové série. Scéna s promícháním dvou látek je
						// POHYBLIVÁ — částice se hýbou samy a počítadlo pod nádobou ukazuje,
						// jak podíl modrých vlevo klesá ze 100 % k polovině a už tam zůstane.
						{
							druh: 'video',
							nazev: 'Polemika: Proč je vůně oběda cítit až v pokoji? 🎬 (s animací difuze)',
							// „-v2": po opravě odborného textu (žralok, rychlost v plynu,
							// šíření vůně) vzniklo video znovu. NOVÁ cesta schválně —
							// médium se posílá s roční mezipamětí, takže kdo si stihl
							// stáhnout první verzi, dostával by ji dál. Nová adresa =
							// nová položka v mezipaměti, opravu tedy dostane každý.
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/polemika-casticove-slozeni-latek-difuze-v2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'atomy-a-molekuly',
					nazev: 'Atomy a molekuly, prvek, sloučenina, směs',
					interakce: 'atom-molekuly',
					obsah: `
						<h2>Atomy a molekuly</h2>
						<h3>Atom</h3>
						<ul>
							<li><strong>základní stavební částice látek</strong></li>
							<li>dlouho byl považován za nejmenší nedělitelnou částici — dnes víme, že se skládá z ještě menších částeček</li>
							<li>atomy jsou velice malé, nelze je vidět lupou ani běžným mikroskopem</li>
							<li>💡 Kdybychom natlačili atomy těsně za sebou do řady dlouhé 1 mm, vešlo by se jich tam 10 milionů</li>
						</ul>
						<h3>Prvek (chemický prvek)</h3>
						<ul>
							<li><strong>látka tvořená stejnými atomy</strong></li>
							<li>dnešní věda zná 118 různých prvků, v přírodě se jich vyskytuje 92</li>
							<li>každý prvek má svůj <strong>název</strong> a <strong>chemickou značku</strong>: železo Fe, vodík H, kyslík O, zlato Au, uhlík C, chlor Cl, sodík Na, dusík N…</li>
							<li>všechny známé prvky jsou zapsány v <strong>periodické soustavě prvků</strong></li>
						</ul>
						<h3>Molekuly</h3>
						<p><strong>Molekuly vznikají spojením dvou a více atomů.</strong> Atomy se téměř vždy spojují do molekul.</p>
						<ul>
							<li><strong>molekuly ze stejných atomů</strong> — např. molekula kyslíku O₂ (2 atomy kyslíku), vodíku H₂, dusíku N₂</li>
							<li><strong>molekuly z různých atomů</strong> — např. molekula vody H₂O (2 atomy vodíku + 1 atom kyslíku), oxid uhličitý CO₂ (1 atom uhlíku + 2 atomy kyslíku)</li>
						</ul>
						<h3>Sloučenina</h3>
						<p><strong>Látka složená ze stejných molekul, které vznikly z různých atomů</strong> — např. voda (H₂O), sůl (chlorid sodný NaCl), oxid uhličitý (CO₂).</p>
						<h3>Směs</h3>
						<p><strong>Látka, která vznikne smícháním více látek</strong> — je složena z různých druhů molekul a atomů. Např. vzduch (molekuly dusíku N₂ + kyslíku O₂ + oxidu uhličitého CO₂ + vody H₂O + …).</p>
						<h3>👉 Shrnutí</h3>
						<ul>
							<li>Všechny látky jsou tvořeny z atomů.</li>
							<li>Molekuly vznikají spojením dvou a více atomů — stejných, nebo různých.</li>
							<li><strong>Prvek</strong> = látka tvořená stejnými atomy.</li>
							<li><strong>Sloučenina</strong> = látka tvořená stejnými molekulami z více druhů atomů.</li>
							<li><strong>Směs</strong> = smíchání různých látek.</li>
						</ul>
					`,
					materialy: [
						// „-v2": zvuk přetočen 8. 8. 2026 na stálý hlas ročníku (Marek byl
						// v první verzi 172 Hz proti 146–152 Hz ve zbytku F6, zněl jako
						// jiný člověk). NOVÁ adresa schválně — média jdou s roční
						// mezipamětí, takže kdo si stáhl první verzi, dostával by ji dál.
						// Trojice polemik k tématu. Pořadí je pořadí učiva: nejdřív atom
						// a prvky, pak spojování do molekul, nakonec sloučenina a směs.
						// Každý díl je krátký a stojí na JEDNOM vysvětlení.
						{
							druh: 'video',
							nazev: 'Polemika: Z čeho jsou věci kolem nás? 🎬 (s animací velikosti atomu)',
							// Animovaná scéna nezvětšuje „od oka": počet atomů v záběru
							// se dopočítává z průměru atomu 0,1 nm, takže na milimetr
							// jich vyjde deset milionů úplně sám.
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/polemika-atomy-a-molekuly-atom-v2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika: Jak vzniká molekula? 🎬 (s animací spojování atomů)',
							// Marek v dílu vyvrací Evinu domněnku, že molekula vznikne
							// rozpadem atomu. Animace to ukazuje měřením: atomů je po
							// celou dobu stejně, mění se jen to, kolik jich je spojených.
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/polemika-atomy-a-molekuly-molekuly-v2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika: Jaký je rozdíl mezi sloučeninou a směsí? 🎬',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/polemika-atomy-a-molekuly-smesi-v2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'infografika',
							nazev: 'Model atomu: jádro a obíhající elektrony',
							cesta: '/materialy/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/atom-3d-model.jpg',
						},
						{
							druh: 'infografika',
							nazev: 'Molekuly vody H₂O: 1 kyslík + 2 vodíky',
							cesta: '/materialy/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/molekuly-vody.jpg',
						},
					],
				},
				{
					slug: 'skupenstvi-latek',
					interakce: 'skupenstvi',
					nazev: 'Skupenství látek a jejich vlastnosti',
					obsah: `
						<h2>Skupenství látek</h2>
						<p>Voda může mít tři podoby — led, tekutou vodu a vodní páru. Pro jednotlivé podoby látek používáme pojem <strong>skupenství</strong>. Látky se mohou vyskytovat ve <strong>třech základních skupenstvích</strong>:</p>
						<h3>Pevné skupenství</h3>
						<ul>
							<li>zachovává si svou velikost (objem) i tvar</li>
							<li>nejde snadno dělit (s výjimkou sypkých látek)</li>
							<li>můžeme určovat tvrdost, křehkost, pružnost, tvárnost, barvu…</li>
						</ul>
						<h3>Kapalné skupenství</h3>
						<ul>
							<li>nemění svůj objem, ale <strong>mění tvar</strong> podle dna a stěn nádoby</li>
							<li>lze přelévat ➪ je <strong>tekuté</strong>; lze snadno dělit</li>
							<li>tvoří <strong>vodorovnou hladinu</strong></li>
							<li>je <strong>nestlačitelné</strong></li>
						</ul>
						<h3>Plynné skupenství</h3>
						<ul>
							<li>nemá vlastní tvar ani objem — mění obojí podle nádoby</li>
							<li>lze přelévat ➪ je <strong>tekuté</strong>; lze snadno dělit</li>
							<li>je <strong>rozpínavé</strong> ➪ vyplní celý volný prostor</li>
							<li>je <strong>lehce stlačitelné</strong></li>
						</ul>
						<p>👉 Plyny i kapaliny lze přelévat — jsou tekuté, proto pro ně používáme společný název <strong>TEKUTINY</strong>.</p>
						<p>💡 Existuje i čtvrté skupenství — <strong>plazma</strong>. Existuje za velmi vysokých teplot: plamen, Slunce, hvězdy. Příklad svíčky: vosk je pevný, při zahřátí kapalný, při hoření se mění na plyn a plamen je plazma.</p>
						<h2>Uspořádání částic v látkách</h2>
						<p>👉 Látka má v různých skupenstvích <strong>stejné složení</strong> (stejné atomy či molekuly) — liší se <strong>pohybem a silovým působením částic</strong>.</p>
						<h3>Částice pevných těles</h3>
						<ul>
							<li>jsou blízko u sebe, působí na sebe velkými silami ⇨ <strong>pevnost</strong></li>
							<li>nemohou se volně pohybovat — jen <strong>kmitají kolem pevných poloh</strong> ⇨ stálý tvar</li>
							<li><strong>krystalické látky</strong> — pravidelné uspořádání částic, velice tvrdé, tvoří krystaly (led, sůl, cukr, křemen, diamant)</li>
							<li><strong>amorfní (beztvaré) látky</strong> — nepravidelné uspořádání, méně tvrdé, při zahřátí postupně měknou (parafín, plasty, čokoláda, sklo, asfalt)</li>
							<li>💡 cukr roztátý na pánvičce zchladne jako amorfní karamel — složení je stejné, změnilo se jen uspořádání částic</li>
						</ul>
						<h3>Částice kapalných těles</h3>
						<ul>
							<li>jsou blízko u sebe ⇨ <strong>nestlačitelné</strong></li>
							<li>působí na sebe velkými silami ⇨ soudržnost (tvoří kapky)</li>
							<li>mění často své polohy, kloužou po sobě ⇨ <strong>tekuté</strong>, bez stálého tvaru, v klidu vodorovná hladina</li>
						</ul>
						<h3>Částice plynných těles</h3>
						<ul>
							<li>jsou velice daleko od sebe ⇨ <strong>lehce stlačitelné</strong></li>
							<li>nejsou vázány silami ⇨ nemají svůj tvar</li>
							<li>pohybují se zcela volně, neuspořádaně a velice rychle ⇨ <strong>rozpínavé</strong></li>
						</ul>
						<h2>Využití vlastností látek v běžném životě</h2>
						<ul>
							<li><strong>tvrdost nerostů</strong> — Mohsova stupnice tvrdosti (tvrdší nerost zanechá v měkčím vryp); diamant je nejtvrdší látka na Zemi, používá se k broušení a řezání</li>
							<li><strong>tekutost</strong> — čerpání pohonných hmot (benzín, nafta, LPG)</li>
							<li><strong>vodorovná hladina</strong> — vodováha: kapalina udržuje hladinu ve stejné rovině i ve spojených nádobách (stavebnictví)</li>
							<li><strong>nestlačitelnost kapalin</strong> — hydraulická zařízení přenášejí sílu z jednoho pístu na druhý: zvedáky v autodílnách, lisy, brzdy automobilů, bagry, vyklápěcí korby</li>
						</ul>
					`,
					materialy: [
						// Polemika Evy a Marka; scéna „Tři základní skupenství" je POHYBLIVÁ —
						// částice kreslí program (mřížka pevné látky, sloupec kapaliny, rozlet
						// plynu do celé nádoby jsou spočtené, kotvy změřené při renderu).
						{
							druh: 'video',
							nazev: 'Polemika: Led, voda, pára — kolik látek? 🎬',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/skupenstvi-latek/polemika-skupenstvi-latek.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animaci částic kreslí program podle fyzikálních pravidel.',
						},
					],
				},
			],
		},
		{
			slug: 'sila',
			nazev: 'Síla',
			podtemata: [
				{
					slug: 'vzajemne-pusobeni-teles-sila',
					nazev: 'Vzájemné působení těles, síla',
					interakce: 'vzajemne-pusobeni',
					obsah: `
						<h2>Vzájemné působení těles</h2>
						<p>Všude kolem sebe vidíme, jak na sebe tělesa působí: rukou natáhnu pružinu, stlačím pěnový míček, brankář chytí letící míč, vystřelím lukem šíp, při česání se vlasy přitahují k hřebenu, Měsíc obíhá okolo Země…</p>
						<p>👉 <strong>Působení těles je vždy vzájemné.</strong> Působí-li jedno těleso na druhé, působí i to druhé těleso na to první!</p>
						<ul>
							<li>brankář zastaví míč — a míč při tom tlačí brankáři do rukou</li>
							<li>kopnu do míče — a míč zatlačí do mé nohy</li>
							<li>Země přitahuje Měsíc — a Měsíc přitahuje vodu v mořích (příliv a odliv)</li>
						</ul>
						<h3>Účinky vzájemného působení</h3>
						<ul>
							<li><strong>Pohybové</strong> — uvedení do pohybu (vykopnutí míče), změna směru (přihrávka), změna rychlosti (cyklista šlape/brzdí), zastavení pohybu (brankář chytne míč)</li>
							<li><strong>Deformační</strong> — změna tvaru tělesa: <strong>dočasná</strong> (matrace se vrátí do původního tvaru) nebo <strong>trvalá</strong> (plastelína zůstane zmáčknutá)</li>
						</ul>
						<h3>Síla</h3>
						<p>Pro vyjádření vzájemného působení těles používáme pojem <strong>síla</strong>.</p>
						<p>👉 Pozor: síla neexistuje sama o sobě — <strong>vždy existuje těleso, které je příčinou silového působení</strong> na jiné těleso. „Síla zvyku" nebo „silné emoce" nejsou síly ve fyzikálním smyslu.</p>
						<h3>Způsoby vzájemného působení</h3>
						<ul>
							<li><strong>při vzájemném dotyku</strong> těles (tlak, tah)</li>
							<li><strong>na dálku</strong> — vlivem silového pole:
								<ul>
									<li><strong>gravitační síla</strong> — mezi tělesy s velkou hmotností</li>
									<li><strong>magnetická síla</strong> — mezi magnety</li>
									<li><strong>elektrická síla</strong> — mezi elektricky nabitými tělesy</li>
									<li><strong>jaderná síla</strong> — drží jádro atomu pohromadě</li>
								</ul>
							</li>
						</ul>
						<h3>Síla jako fyzikální veličina</h3>
						<ul>
							<li>popisuje vzájemné působení těles — určuje <strong>velikost i směr</strong></li>
							<li>značka: <strong>F</strong>, jednotka: <strong>newton (N)</strong> /čte se ňůtn/ — na počest Isaaca Newtona</li>
							<li>další jednotky: <strong>1 kN = 1 000 N</strong>, <strong>1 MN = 1 000 000 N</strong></li>
							<li>velikost síly zapisujeme číslem s jednotkou (F = 35 N)</li>
							<li>směr síly znázorňujeme <strong>úsečkou se šipkou</strong> — začátek v <strong>působišti síly</strong>, délka šipky odpovídá velikosti síly</li>
						</ul>
						<h3>Měření síly — siloměr</h3>
						<p>Klasický <strong>pružinový siloměr</strong> tvoří pružina s háčkem a stupnice. Princip: <strong>protažení pružiny je přímo úměrné působící síle</strong> — kolikrát větší síla, tolikrát větší prodloužení. Při překročení rozsahu se pružina trvale poškodí a měřit už nelze.</p>
						<p>Pravidla měření: zkontrolovat nulu, zjistit jednotky stupnice, hodnotu nejmenšího dílku a rozsah; odchylka měření = polovina nejmenšího dílku.</p>
						<p>💡 Síla 1 N odpovídá přibližně síle, kterou Země přitahuje těleso o hmotnosti 100 g. Na tomto principu fungují pružinové váhy.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Síla', cesta: 'Y340hJrbpU8' },
						{
							druh: 'video',
							nazev: 'Polemika: Působí míč na moji nohu? 🎬',
							cesta: '/media/fyzika/6-rocnik/sila/vzajemne-pusobeni-teles-sila/polemika-vzajemne-pusobeni.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Tatáž polemika, ale scéna o siloměru je POHYBLIVÁ: na pružinu se
						// postupně věší 10, 20 a 30 N a protažení roste 2, 4 a 6 cm. Délky
						// počítá Hookův zákon (x = F/k), takže poměr 1 : 2 : 3 na obrazovce
						// opravdu sedí — změřeno na hotových snímcích (testy/test_animace_pruziny.py
						// v Omeze), ne odhadnuto od oka.
						{
							druh: 'video',
							nazev: 'Polemika: Působí míč na moji nohu? 🎬 (s animací pružiny)',
							cesta: '/media/fyzika/6-rocnik/sila/vzajemne-pusobeni-teles-sila/polemika-vzajemne-pusobeni-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{ druh: 'video', nazev: 'Píseň: Síla má směr 🎵', cesta: '/materialy/fyzika/6-rocnik/sila/vzajemne-pusobeni-teles-sila/pisen-sila-ma-smer.m4a' },
					],
				},
				{
					slug: 'gravitacni-sila',
					nazev: 'Gravitační síla a gravitační pole',
					interakce: 'planety-vaha',
					obsah: `
						<h2>Gravitační síla</h2>
						<p>Kapky deště, šiška ze stromu i upuštěný hrneček padají k zemi. 👉 <strong>Země přitahuje všechna tělesa ve svém okolí.</strong></p>
						<ul>
							<li>gravitační silou na sebe působí <strong>všechna tělesa s hmotností</strong></li>
							<li>je <strong>vždy přitažlivá</strong> a působení je vždy vzájemné</li>
							<li>zákony gravitace popsal anglický fyzik <strong>Isaac Newton</strong></li>
						</ul>
						<h3>Na čem závisí velikost gravitační síly?</h3>
						<ul>
							<li><strong>Na hmotnostech těles</strong> — čím větší hmotnosti, tím větší síla. Mezi planetami jsou obrovské gravitační síly; mezi malými tělesy (dvě knihy na stole) je síla zanedbatelná, proto ji běžně pozorujeme jen ve vztahu k Zemi.</li>
							<li><strong>Na vzdálenosti těles</strong> — čím jsou tělesa dál od sebe, tím je gravitační síla menší.</li>
						</ul>
						<p>🔎 Země a míč se přitahují navzájem stejně velkou silou — proč vidíme padat míč, a ne Zemi? Lehký míč se uvede do pohybu snadno, zatímco obrovskou Zemi stejná síla pohne jen neznatelně.</p>
						<p>🔎 A proč se astronauti na vesmírné stanici vznášejí? Ve výšce 400 km je gravitace stále téměř tak silná jako na povrchu — stanice i astronauti ale kolem Země <strong>neustále volně padají po oběžné dráze</strong>, a proto se vůči sobě vznášejí.</p>
							<p>👉 Přesně tomu se říká <strong>stav beztíže</strong>: je to <strong>volný pád</strong>, ne nepřítomnost gravitace. Netlačíš na podložku, protože padáš i s ní. Krátce ho zažiješ i při seskoku z můstku nebo v rozjetém výtahu, kterému by praskly lanko. Pozor na častý omyl — beztíže <em>není</em> rovnováha sil: kniha na stole má síly v rovnováze a beztíže tam rozhodně není.</p>
						<h3>Výpočet u povrchu Země</h3>
						<p>Na každý <strong>1 kg</strong> hmotnosti tělesa působí u povrchu Země gravitační síla přibližně <strong>10 N</strong>.</p>
						<ul>
							<li>spolužák o hmotnosti 58 kg → gravitační síla 580 N</li>
							<li>auto o hmotnosti 15 t (15 000 kg) → gravitační síla 150 kN</li>
						</ul>
						<h3>Směr gravitační síly</h3>
						<ul>
							<li>gravitační síla směřuje vždy <strong>do středu Země</strong> — tomu říkáme <strong>svislý směr</strong></li>
							<li>svislý směr prakticky určíme <strong>olovnicí</strong> (závažíčko na provázku) — důležité pro stabilitu staveb</li>
							<li>svislý a vodorovný směr jsou na sebe <strong>kolmé</strong> — svírají úhel <strong>90°</strong></li>
						</ul>
						<h2>Gravitační pole</h2>
						<ul>
							<li>vzniká v okolí <strong>každého</strong> hmotného tělesa; význam má u těles s obrovskou hmotností (hvězdy, planety, měsíce)</li>
							<li>projevuje se působením gravitační síly na tělesa v okolí</li>
							<li>čím větší hmotnost, tím „silnější" pole — Slunce má silnější pole než Země, proto planety obíhají kolem Slunce</li>
							<li>Měsíc je menší a lehčí než Země — na astronauta na Měsíci působí <strong>6× menší</strong> gravitační síla, proto se při chůzi jakoby vznáší</li>
						</ul>
						<p>🔎 Proč měsíce obíhají kolem planet, a ne kolem Slunce? Jsou planetám <strong>mnohem blíž</strong>, takže je planety přitahují větší silou než vzdálené Slunce.</p>
						<h3>Důsledky gravitační síly</h3>
						<ul>
							<li><strong>pád těles</strong> — neupevněná tělesa padají svisle dolů, ke středu Země</li>
							<li><strong>vodorovná hladina kapalin</strong> — molekuly jsou přitahovány dolů a kloužou po sobě, proto se srovnají do stejné výšky</li>
							<li><strong>pohyb vesmírných těles</strong> — gravitace Slunce drží planety na oběžných drahách, gravitace Země drží Měsíc a družice</li>
							<li><strong>příliv a odliv</strong> — gravitační síla Měsíce působí na vodu v oceánech</li>
						</ul>
					`,
					materialy: [
						// Hlasy jsou z bezplatného tarifu ElevenLabs, který povoluje jen
						// nekomerční užití a žádá uvedení „elevenlabs.io" v názvu.
						// Školní web zdarma nekomerční je, atribuce proto musí zůstat,
						// dokud videa nepřejdou na jiný hlas nebo na placený tarif.
						{
							druh: 'video',
							nazev: 'Polemika 1: Gravitační síla 🎬 (hlasy elevenlabs.io)',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/polemika-gravitace-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: co se dá spočítat a ověřit 🎬 (hlasy elevenlabs.io)',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/polemika-gravitace-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Tytéž dva díly s druhými hlasy (lokální OmniVoice, zdarma a bez
						// atribuce). Učitel chce obě verze vedle sebe, ať si děti vyberou.
						{
							druh: 'video',
							nazev: 'Polemika 1: Gravitační síla 🎬 (druhé hlasy)',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/polemika-gravitace-1-omnivoice.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: co se dá spočítat a ověřit 🎬 (druhé hlasy)',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/polemika-gravitace-2-omnivoice.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Verze s pohyblivou scénou: Newtonovo dělo — tři výstřely z hory,
						// dva dopadnou a třetí obíhá. Dráhy se počítají skutečným pohybem
						// v gravitačním poli, takže „obíhá" z výpočtu opravdu vyjde.
						{
							druh: 'video',
							nazev: 'Polemika 1: Gravitační síla 🎬 (s animací: proč družice nespadne)',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/polemika-gravitace-1-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
			],
		},
		{
			slug: 'fyzikalni-veliciny',
			nazev: 'Fyzikální veličiny',
			podtemata: [
				{
					slug: 'delka',
					nazev: 'Délka',
					interakce: 'stupnice',
					obsah: `
						<h2>Délka jako fyzikální veličina</h2>
						<ul>
							<li>popisuje <strong>rozměry těles nebo vzdálenosti</strong> (i šířka či tloušťka jsou délky)</li>
							<li>značky: <strong>d, l</strong>, h (hloubka nebo výška), s (dráha pohybu), o (obvod), r (poloměr kruhu)</li>
							<li>základní jednotka: <strong>metr (m)</strong></li>
						</ul>
						<h3>Násobky a díly metru</h3>
						<ul>
							<li>1 cm = 10 mm</li>
							<li>1 dm = 10 cm</li>
							<li>1 m = 10 dm</li>
							<li>1 km = 1 000 m</li>
						</ul>
						<p>👉 Při převodu na <strong>menší</strong> jednotky přidáváme nuly (čárka doprava), při převodu na <strong>větší</strong> jednotky nuly škrtáme (čárka doleva).</p>
						<h3>Starší a jiné jednotky</h3>
						<p>Dříve se měřilo podle lidského těla — lokty, stopy, pídě, palce. Nevýhoda: v každém městě byly jinak velké. V anglicky mluvících zemích se dodnes používá palec (inch), stopa (ft), yard (yd) a míle (mi).</p>
						<p>💡 Ve vesmíru se používá <strong>astronomická jednotka</strong> (AU) = vzdálenost Země–Slunce = 150 milionů km (Jupiter je od Slunce asi 5 AU). A <strong>světelný rok</strong> = vzdálenost, kterou světlo urazí za 1 rok (Polárka je od nás 433 světelných let).</p>
						<h3>Měřidla délky</h3>
						<ul>
							<li><strong>pravítko</strong> — na milimetry, do 50 cm</li>
							<li><strong>svinovací nebo skládací metr</strong> — na milimetry, rovné vzdálenosti, až několik metrů</li>
							<li><strong>krejčovský metr</strong> — na centimetry, nerovná tělesa (obvod hlavy, pasu)</li>
							<li><strong>pásmo</strong> — až do 100 m, atletika</li>
							<li><strong>posuvné měřítko</strong> (lidově „šuplera") — na desetiny milimetru, dutiny a průměry</li>
							<li><strong>mikrometr</strong> — na setiny milimetru, tloušťka vlákna či vlasu</li>
							<li><strong>laserový měřič vzdáleností</strong> — nejpřesnější, princip odrazu světelného paprsku</li>
						</ul>
						<h3>Pravidla pro měření délky</h3>
						<ol>
							<li>zvolíme vhodné měřidlo (jednotky stupnice)</li>
							<li>určíme délku nejmenšího dílku</li>
							<li>určíme měřicí rozsah stupnice</li>
							<li>nula stupnice přesně na začátek tělesa</li>
							<li>měřidlo těsně přiléhá k tělesu</li>
							<li>na stupnici se díváme <strong>kolmo</strong></li>
							<li>délku odečteme na nejbližším dílku</li>
							<li>zapíšeme číslem <strong>s jednotkou</strong>, např. l = 72 mm</li>
						</ol>
						<p>💡 Zápis lze kombinovat: 532 cm = 5,32 m = 5 m 32 cm.</p>
						<h3>Odchylka měření</h3>
						<p>Naměřená hodnota je „zaokrouhlená" na nejbližší dílek. <strong>Odchylka = polovina nejmenšího dílku stupnice.</strong> Čím menší dílek, tím přesnější měření.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1/3: Proč se všude měří v metrech? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/polemika-delka-metr.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2/3: Čím změřit vlas a čím vzdálenost ke hvězdě? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/polemika-delka-meridla.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							// Dílky se počítají podle MEZER, ne podle čárek — mezi popsanými
							// čárkami je deset mezer, ale jen devět menších čárek. Schéma to
							// proto počítá z počtu mezer, aby kresba nemohla učit opak zvuku.
							nazev: 'Polemika 3/3: Počítají se dílky podle čárek, nebo mezer? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/polemika-delka-mereni.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{ druh: 'video', nazev: 'Píseň: Fyzikální veličiny 🎵', cesta: '/materialy/fyzika/6-rocnik/fyzikalni-veliciny/delka/pisen-fyzikalni-veliciny.m4a' },
					],
				},
				{
					slug: 'hmotnost',
					nazev: 'Hmotnost',
					interakce: 'prevody',
					obsah: `
						<h2>Hmotnost jako fyzikální veličina</h2>
						<ul>
							<li>popisuje <strong>množství látky v tělese</strong></li>
							<li>značka: <strong>m</strong>, základní jednotka: <strong>kilogram (kg)</strong>, měřidla: <strong>váhy</strong></li>
						</ul>
						<p>👉 POZOR: Ve fyzice nepoužíváme pojem „váha tělesa"! <strong>Těleso má hmotnost — váha slouží k jejímu měření.</strong></p>
						<p>💡 1 kilogram byl stanoven podle litru vody: 1 litr vody váží 1 kg (pro jiné kapaliny to neplatí!). Kilogram je jediná základní jednotka s předponou kilo- (gram byl příliš malý).</p>
						<h3>Další jednotky hmotnosti</h3>
						<ul>
							<li>1 kg = 1 000 g</li>
							<li>1 g = 1 000 mg</li>
							<li>1 t = 1 000 kg</li>
						</ul>
						<p>Z historických důvodů se používají i jednotky, které fyzika nepoužívá:</p>
						<ul>
							<li><strong>dekagram</strong> (lidově „deka", značka dag) — 1 dag = 10 g; 10 deka salámu = 100 g</li>
							<li><strong>metrický cent</strong> (lidově „metrák", značka q) — 1 q = 100 kg; stavebnictví, zemědělství</li>
						</ul>
						<h3>Druhy vah</h3>
						<ul>
							<li><strong>rovnoramenné váhy</strong> — porovnávají hmotnost tělesa a závaží na dvou miskách; rovnováha = hmotnosti se rovnají; měření zdlouhavé, dnes se nepoužívá</li>
							<li><strong>nerovnoramenná váha</strong> — poměr určený délkami ramen: decimálka (těleso váží 10× víc než závaží), přezmen (závaží se posouvá po rameni; vážili se tak pacienti u lékaře)</li>
							<li><strong>pružinová váha</strong> — těleso natahuje pružinu s ručičkou: osobní váha, mincíř, rybářská váha</li>
							<li><strong>kyvadlová váha</strong> — jazýček na stupnici; dopisy a drobné cennosti</li>
							<li><strong>digitální váha</strong> — elektronická s displejem, nejjednodušší měření</li>
						</ul>
						<h3>Pravidla pro měření hmotnosti</h3>
						<ol>
							<li>zvolíme vhodné měřidlo (jednotky, nejmenší dílek, rozsah)</li>
							<li>váhy musí stát na <strong>vodorovném povrchu</strong></li>
							<li>předmět dáváme <strong>doprostřed misky</strong></li>
							<li>počkáme na ustálení hodnoty</li>
							<li>zapíšeme číslem s jednotkou, např. m = 72 g</li>
						</ol>
						<p>👉 Pozor na rozsah stupnice — těžší předmět může váhu zničit.</p>
						<h3>Vážení kapalin a plynů</h3>
						<p>Nejdřív zvážíme prázdnou nádobu (m₁), pak nádobu s kapalinou či plynem (m₂). <strong>Hmotnost tekutiny m = m₂ − m₁.</strong></p>
						<h3>Vážení velmi malých těles</h3>
						<p>Zvážíme větší počet kusů (např. 100 kapek) a hmotnost jednoho kusu určíme výpočtem — dělením.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika: Je váha totéž co hmotnost? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hmotnost/polemika-hmotnost.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Verze s POHYBLIVOU scénou rovnoramenných vah: na jednu misku
						// přijde těleso s otazníkem, na druhou se přidávají závaží, až se
						// vahadlo srovná — a tehdy se odhalí, že těleso má 700 g. Náklon
						// se počítá z rovnováhy momentů, takže vodorovné vahadlo znamená
						// opravdu shodu hmotností, ne jen hezky dojetou animaci.
						{
							druh: 'video',
							nazev: 'Polemika: Je váha totéž co hmotnost? 🎬 (s animací vah)',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hmotnost/polemika-hmotnost-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'objem',
					nazev: 'Objem',
					interakce: 'valec',
					obsah: `
						<h2>Objem jako fyzikální veličina</h2>
						<ul>
							<li>vyjadřuje, <strong>jak velký prostor těleso zaplňuje</strong></li>
							<li>značka: <strong>V</strong> (velké tiskací! — malým v budeme značit rychlost)</li>
							<li>základní jednotka: <strong>metr krychlový (m³)</strong></li>
						</ul>
						<h3>1. Krychlové jednotky</h3>
						<p>Metr krychlový = objem krychle s hranou 1 m (V = 1 m × 1 m × 1 m).</p>
						<ul>
							<li>1 m³ = 1 000 dm³</li>
							<li>1 dm³ = 1 000 cm³</li>
							<li>1 cm³ = 1 000 mm³</li>
						</ul>
						<h3>2. Dutá míra</h3>
						<p>Objem kapalin (voda, olej, benzín…) měříme v litrech a jejich násobcích a dílech:</p>
						<ul>
							<li>1 l = 10 dl = 100 cl = 1 000 ml</li>
							<li>1 hl = 100 l</li>
						</ul>
						<p>👉 Důležitý „most" mezi krychlovými a dutými jednotkami: <strong>1 litr = 1 decimetr krychlový (1 l = 1 dm³)</strong>.</p>
						<h3>Měření objemu kapalin — odměrný válec</h3>
						<ol>
							<li>zvolíme vhodný válec (rozsah stupnice, nejmenší dílek — určuje přesnost)</li>
							<li>válec postavíme na <strong>vodorovnou podložku</strong> a opatrně vlijeme kapalinu</li>
							<li>odečítáme <strong>po ustálení hladiny</strong>, v <strong>nejnižší poloze hladiny</strong> (u stěn je zaoblená vzhůru) a <strong>kolmo</strong> — oči v úrovni hladiny</li>
							<li>zapíšeme s jednotkou: V = 50 ml nebo V = 50 cm³</li>
						</ol>
						<h3>Měření objemu pevného tělesa</h3>
						<p>Menší pevné těleso změříme pomocí vody a odměrného válce:</p>
						<ol>
							<li>do válce nalijeme vodu a přečteme objem V₁</li>
							<li>těleso na provázku <strong>celé ponoříme</strong> pod hladinu a přečteme objem V₂</li>
							<li><strong>objem tělesa V = V₂ − V₁</strong></li>
						</ol>
						<h3>Výpočet objemu pravidelných těles</h3>
						<p>Z matematiky: objem krychle V = a · a · a, objem kvádru V = a · b · c.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika: Jak změřit objem kamene? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/objem/polemika-objem.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Tatáž polemika s POHYBLIVOU scénou měření: kámen na provázku se
						// spouští do válce a hladina stoupá o skutečně vytlačenou vodu
						// (objem kulové úseče). Proto je z animace vidět, PROČ musí být
						// kámen celý pod hladinou — v polovině ponoru je odečet teprve 65 ml.
						{
							druh: 'video',
							nazev: 'Polemika: Jak změřit objem kamene? 🎬 (s animací měření)',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/objem/polemika-objem-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'hustota',
					interakce: 'hustota',
					nazev: 'Hustota',
					obsah: `
						<h2>Hustota jako fyzikální veličina</h2>
						<ul>
							<li>vlastnost látky: určuje, <strong>jakou hmotnost má jednotka objemu dané látky</strong></li>
							<li>značka: řecké písmeno <strong>ρ (ró)</strong></li>
							<li>základní jednotka: <strong>kilogram na metr krychlový (kg/m³)</strong></li>
							<li>hodnota 1 300 kg/m³ říká: 1 m³ dané látky váží 1 300 kg</li>
							<li>hustoty látek najdeme ve <strong>fyzikálních a chemických tabulkách</strong></li>
							<li>📌 k zapamatování: <strong>hustota vody = 1 000 kg/m³</strong></li>
						</ul>
						<h3>Výpočet hustoty</h3>
						<p><strong>ρ = m : V</strong> (hmotnost děleno objem). Ze známé hustoty pak umíme vypočítat hmotnost (m = ρ · V) nebo objem (V = m : ρ).</p>
						<p>Postup: vypíšeme zadané hodnoty → hustotu látky případně najdeme v tabulkách → převedeme na základní jednotky (kg, m³, kg/m³) → zapíšeme vztah, dosadíme, vypočítáme → k výsledku jednotky a odpověď.</p>
						<h3>Další jednotka: g/cm³</h3>
						<p>V chemii a farmacii se používá <strong>gram na centimetr krychlový</strong>: 1 g/cm³ = 1 000 kg/m³. Pozor — dosazujeme vždy jednotky, které spolu souvisí: kg a m³, nebo g a cm³.</p>
						<h3>Porovnávání těles</h3>
						<ul>
							<li>tělesa <strong>stejné velikosti</strong> — nejtěžší je to s největší hustotou</li>
							<li>tělesa <strong>stejné hmotnosti</strong> — nejmenší je to s největší hustotou (kilogram peří zabere víc místa než kilogram železa)</li>
						</ul>
						<h3>Chování těles v tekutinách</h3>
						<ul>
							<li><strong>větší hustota než okolí ⇨ klesá</strong> — cihla ve vodě, sirup na dně sklenice, studený vzduch u podlahy</li>
							<li><strong>stejná hustota ⇨ vznáší se</strong> — medúza v moři</li>
							<li><strong>menší hustota ⇨ stoupá/plave</strong> — dřevo na hladině, teplý vzduch nese balony vzhůru</li>
						</ul>
						<p>Využití: <strong>ponorka</strong> při ponoru napustí do nádrží vodu (zvýší svou hustotu), při vynoření ji odčerpá. <strong>Ryby</strong> mění objem vzduchového měchýře — nemění hmotnost, ale objem.</p>
						<h3>Určování hustoty</h3>
						<ul>
							<li><strong>výpočtem</strong> — ρ = m : V ze změřené hmotnosti a objemu</li>
							<li><strong>měřením</strong> — hustotu kapalin měří <strong>hustoměr</strong>: čím hustší kapalina, tím méně se ponoří (jako plavec v moři vs. v bazénu)</li>
						</ul>
						<h3>Proč se hustoty látek liší?</h3>
						<ul>
							<li><strong>hmotnost částic</strong> — atom železa je 56× těžší než atom vodíku a 3,5× těžší než atom kyslíku</li>
							<li><strong>skupenství</strong> — pevné látky a kapaliny mají částice blízko u sebe ⇨ velká hustota (rtuť 13 500 kg/m³, benzín 700 kg/m³, osmium 22 660 kg/m³, lithium 534 kg/m³); plyny mají částice daleko od sebe ⇨ malá hustota (vzduch jen 1,3 kg/m³)</li>
						</ul>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika: Co je těžší — kilo peří, nebo kilo železa? 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hustota/polemika-hustota.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
						// Tatáž polemika, ale DVĚ scény jsou pohyblivé: tělesa se rozjedou
						// podle vlastní hustoty (dřevo se zastaví se 60 % pod hladinou, což
						// je přesně poměr 600 : 1000) a ponorka napouštěním vody mění hustotu
						// z 900 na 1100 kg/m³. Rychlost je úměrná rozdílu hustot, takže při
						// 1000 = 1000 se ponorka sama zastaví a vznáší se.
						{
							druh: 'video',
							nazev: 'Polemika: Co je těžší — kilo peří, nebo kilo železa? 🎬 (s animacemi)',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hustota/polemika-hustota-animace.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata a animace kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'souhrnne-opakovani-velicin',
					nazev: 'Souhrnné opakování fyzikálních veličin',
					interakce: 'opakovani-velicin',
					obsah: `
						<h2>Přehled fyzikálních veličin 6. ročníku</h2>
						<table>
							<thead>
								<tr><th>Veličina</th><th>Značka</th><th>Základní jednotka</th><th>Měřidlo</th></tr>
							</thead>
							<tbody>
								<tr><td><strong>Délka</strong></td><td>d, l (h, s, o, r)</td><td>metr (m)</td><td>pravítko, metr, pásmo, posuvné měřítko, mikrometr</td></tr>
								<tr><td><strong>Hmotnost</strong></td><td>m</td><td>kilogram (kg)</td><td>váhy</td></tr>
								<tr><td><strong>Objem</strong></td><td>V</td><td>metr krychlový (m³)</td><td>odměrný válec</td></tr>
								<tr><td><strong>Hustota</strong></td><td>ρ (ró)</td><td>kg/m³</td><td>hustoměr / výpočet</td></tr>
								<tr><td><strong>Teplota</strong></td><td>t</td><td>stupeň Celsia (°C) *</td><td>teploměr</td></tr>
								<tr><td><strong>Čas</strong></td><td>t</td><td>sekunda (s)</td><td>hodiny, stopky</td></tr>
								<tr><td><strong>Síla</strong></td><td>F</td><td>newton (N)</td><td>siloměr</td></tr>
							</tbody>
						</table>
						<p>* U teploty pozor na jednu jemnost: my měříme ve <strong>stupních Celsia</strong>, ale
						mezinárodní soustava SI má jako základní jednotku teploty <strong>kelvin (K)</strong>.
						Dílek je u obou stejně velký, jen kelvinová stupnice začíná od nejnižší možné teploty
						(0 K = −273,15 °C).</p>
						<h3>Důležité vztahy</h3>
						<ul>
							<li>objem krychle V = a · a · a, objem kvádru V = a · b · c</li>
							<li>hustota ρ = m : V, objem z hustoty V = m : ρ, hmotnost m = ρ · V</li>
							<li>1 l = 1 dm³ (most mezi dutými a krychlovými jednotkami)</li>
						</ul>
						<h3>Převody jednotek</h3>
						<ul>
							<li>na menší jednotky: přidáváme nuly (čárka doprava)</li>
							<li>na větší jednotky: škrtáme nuly (čárka doleva)</li>
							<li>👉 <strong>POZOR u času nikdy neposouváme desetinnou čárku</strong> — hodina má 60 minut, minuta 60 sekund!</li>
						</ul>
						<h3>⚠️ Značka <em>t</em> znamená dvě různé věci</h3>
						<p>Všiml sis toho v tabulce? <strong>t</strong> je značka pro <strong>čas</strong>
						i pro <strong>teplotu</strong>. Není to chyba — fyzika obojí opravdu píše stejně
						a rozlišuje je až podle <strong>jednotky</strong>: <strong>t = 20 °C</strong> je teplota,
						<strong>t = 20 s</strong> je čas. Proto se jednotka nikdy nevynechává.</p>
						<p>Podobných dvojic je víc, například <strong>m</strong> jako hmotnost a <strong>m</strong>
						jako metr. Zase pomůže místo v zápisu: <em>m</em> = 5 kg je veličina, 5 <em>m</em> je jednotka.</p>
						<h3>🧮 Jak počítat příklad, aby vyšel</h3>
						<p>Pořadí, které tě zachrání skoro pokaždé:</p>
						<ol>
							<li><strong>Vypiš, co víš</strong> (a značkami): <em>a</em> = 2 cm, <em>b</em> = 3 cm, <em>c</em> = 5 cm, <em>m</em> = 240 g</li>
							<li><strong>Napiš, co hledáš:</strong> ρ = ?</li>
							<li><strong>Sjednoť jednotky</strong> — všechny délky ve stejné, hmotnost ke správnému objemu</li>
							<li><strong>Vzorec, dosazení, výsledek s jednotkou</strong></li>
						</ol>
						<p>Ten příklad celý: <em>V</em> = 2 · 3 · 5 = <strong>30 cm³</strong>, pak
						ρ = <em>m</em> : <em>V</em> = 240 : 30 = <strong>8 g/cm³</strong>, tedy
						<strong>8 000 kg/m³</strong> — přibližně ocel.</p>
						<p>👉 <strong>Nejčastější chyba není v počítání, ale v jednotkách</strong>: délky v centimetrech
						a hmotnost v kilogramech dohromady dají nesmysl. A výsledek bez jednotky není odpověď —
						„8" samo o sobě neříká vůbec nic.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Délka, hmotnost, objem a hustota 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/souhrnne-opakovani-velicin/polemika-souhrn-velicin-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: Teplota, čas a síla 🎬',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/souhrnne-opakovani-velicin/polemika-souhrn-velicin-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
					],
					odkazy: [
						{ nazev: 'Fyzika na Vltavě — Přehled fyzikálních veličin ZŠ', url: 'https://www.zsvltava.cz/fyzika/?p=3432' },
						{ nazev: 'Převody jednotek délky (Wordwall)', url: 'https://wordwall.net/cs/resource/26529328/p%C5%99evody-jednotek-d%C3%A9lky' },
						{ nazev: 'Měření hmotnosti a objemu - měřidla (Wordwall)', url: 'https://wordwall.net/cs/resource/13392084/m%C4%9B%C5%99en%C3%AD-hmotnosti-a-objemu-m%C4%9B%C5%99idla' },
					],
				},
			],
		},
		{
			slug: 'cas',
			nazev: 'Čas',
			podtemata: [
				{
					slug: 'cas-a-jeho-mereni',
					nazev: 'Čas a jeho měření',
					interakce: 'ozobot',
					obsah: `
						<h2>Čas jako fyzikální veličina</h2>
						<ul>
							<li>značka: <strong>t</strong></li>
							<li>základní jednotka: <strong>sekunda (s)</strong></li>
							<li>další jednotky: minuta (min), hodina (h), den (d), rok</li>
							<li>měřidla: <strong>hodiny, stopky</strong></li>
						</ul>
						<p>👉 V běžné mluvě se říká „vteřina" — fyzika ale tento pojem nezná, používá mezinárodní název <strong>sekunda</strong>. Pozor na značky: sekunda se neznačí „sec" a minuta se neznačí „m" (to je metr).</p>
						<p>💡 Pro velmi krátké děje se používá <strong>milisekunda (ms)</strong> = tisícina sekundy.</p>
						<h3>Historické metody měření času</h3>
						<ul>
							<li><strong>sluneční hodiny</strong> — tyč vrhá stín na stupnici (nevýhoda: Slunce nesvítí každý den v roce na stejném místě)</li>
							<li><strong>svíčkové hodiny</strong> — svíčka s vyrytou stupnicí uhořívá stále stejně rychle</li>
							<li><strong>vodní hodiny</strong> — voda odkapává stejně rychle, hmotnost odkapané vody udává čas</li>
							<li><strong>přesýpací hodiny</strong> — písek se přesýpá stejnou rychlostí (musí se pravidelně otáčet)</li>
						</ul>
						<h3>Moderní hodiny</h3>
						<ul>
							<li><strong>mechanický hodinový stroj</strong> s ciferníkem — Pražský orloj (1410)</li>
							<li><strong>kyvadlové hodiny</strong> (17. století) — první spolehlivé hodiny, u nás „pendlovky"</li>
							<li><strong>mechanické hodinky</strong> — strojek pohání natažená pružina; krok zajišťuje pravidelný posun ručiček a působí tikot</li>
							<li><strong>atomové hodiny</strong> — nejpřesnější měření času</li>
						</ul>
						<h3>🕰️ Cesta dějinami hodin</h3>
						<ul>
							<li><strong>~13. století př. n. l.</strong> — nejstarší nalezené <strong>sluneční hodiny</strong> (Egypt, Údolí králů); čas ukazoval pohybující se stín</li>
							<li><strong>5. století př. n. l.</strong> — řecké <strong>vodní hodiny</strong> (klepsydra): čas odměřovala odkapávající voda, třeba řečníkům u soudu</li>
							<li><strong>14. století</strong> — první doložená zobrazení <strong>přesýpacích hodin</strong> v Evropě; hodily se i na lodě, kde kyvadlo ani stín nefungují</li>
							<li><strong>1410</strong> — poprvé doložen <strong>Pražský orloj</strong>, jeden z nejstarších dosud fungujících mechanických strojů světa</li>
							<li><strong>1656</strong> — holandský fyzik <strong>Christiaan Huygens</strong> sestrojil první <strong>kyvadlové hodiny</strong> — skoro ideálním oscilátorem je kyvadlo</li>
							<li><strong>1949</strong> — první <strong>atomové hodiny</strong> (USA); dnešní atomové hodiny se nezpozdí ani o sekundu za miliony let. Bez nich by nefungovala <strong>GPS navigace</strong> ani světový čas <strong>UTC</strong></li>
						</ul>
						<p>💡 Časová pásma světa se počítají od <strong>nultého poledníku</strong>, který prochází observatoří v Greenwichi ve Velké Británii.</p>
						<h3>Princip fungování hodin</h3>
						<p>Moderní hodiny využívají <strong>pravidelně se opakující děje</strong>:</p>
						<ul>
							<li>kyvadlové hodiny — kmitání kyvadla (natahují se, aby klesající závaží kyvadlo nezastavilo)</li>
							<li>hodinový strojek — kmitání součástky zvané <strong>nepokoj</strong> (pohání ji natažená pružina)</li>
							<li>atomové hodiny — vnitřní kmitání atomů; není ovlivněno vnějšími vlivy</li>
						</ul>
						<h3>Jednotky času a převody</h3>
						<ul>
							<li><strong>1 min = 60 s</strong></li>
							<li><strong>1 h = 60 min = 3 600 s</strong></li>
							<li><strong>1 d = 24 h</strong></li>
						</ul>
						<p>👉 POZOR — častá chyba: u času <strong>neposouváme desetinnou čárku</strong>! 0,75 h není 75 minut, ale 45 minut (0,75 × 60).</p>
						<h3>Výpočet doby trvání</h3>
						<p>Známe-li čas začátku t₁ a konce t₂ události, doba trvání <strong>t = t₂ − t₁</strong> (např. jak dlouho trvala cesta vlakem).</p>
						<h3>🕹️ Praktická úloha: dráha pro robota Ozobota</h3>
						<p>Ozobota se dá naučit jezdit po dráze poskládané ze stavebnicových dílků do tvaru <strong>obdélníku</strong>. Na dráhu se navíc dají umístit dílky s příkazy — <strong>start</strong>, <strong>zrychlit</strong>, <strong>zatáčka</strong>, <strong>zpomalit</strong> a <strong>cíl</strong>. Než robot vyjede, změříme délku jednoho dílku a spočítáme, kolik dílků je na šířku (a) a kolik na výšku (b) dráhy.</p>
						<p>Robot jede <strong>po obvodu</strong> obdélníku — obvod je tedy dráha (s), kterou robot skutečně ujede:</p>
						<ul>
							<li><strong>o = 2 · (a + b)</strong></li>
						</ul>
						<p>Plocha, kterou dráha uvnitř ohraničuje, se nazývá <strong>obsah</strong> — po ní robot NEjede:</p>
						<ul>
							<li><strong>S = a · b</strong></li>
						</ul>
						<p>👉 Časté chybné myšlení: čím větší obsah, tím delší dráha. Není to tak — obvod a obsah jsou dvě různé věci a počítají se jinak.</p>
						<p>💡 Příklad: dráha má na šířku 6 dílků, na výšku 4 dílky, jeden dílek měří 4 cm. Obvod (v dílcích): o = 2 · (6 + 4) = 20 dílků, což je 20 · 4 cm = <strong>80 cm</strong> dráhy. Obsah: S = 6 · 4 = <strong>24 dílků²</strong>. Když robot projede celou dráhu za 20 sekund (naměříme stopkami), jeho rychlost je <strong>v = s / t = 80 cm : 20 s = 4 cm/s</strong>.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Jak se měřil čas dřív a dnes? 🎬',
							cesta: '/media/fyzika/6-rocnik/cas/cas-a-jeho-mereni/polemika-cas-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: co se dá spočítat a ověřit 🎬',
							cesta: '/media/fyzika/6-rocnik/cas/cas-a-jeho-mereni/polemika-cas-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{ druh: 'video', nazev: 'Píseň: Sekunda po sekundě 🎵', cesta: '/materialy/fyzika/6-rocnik/cas/cas-a-jeho-mereni/pisen-sekunda-po-sekunde.m4a' },
					],
				},
			],
		},
		{
			slug: 'teplota',
			nazev: 'Teplota',
			podtemata: [
				{
					slug: 'teplota-a-jeji-mereni',
					interakce: 'kadinky',
					interakce2: 'prumer',
					nazev: 'Teplota a její měření',
					obsah: `
						<h2>Teplota jako fyzikální veličina</h2>
						<ul>
							<li>popisuje <strong>tepelný stav tělesa</strong> — vnímáme ho jako studené, teplé či horké</li>
							<li>značka: <strong>t</strong>, jednotka: <strong>stupeň Celsia (°C)</strong>, měřidlo: <strong>teploměr</strong></li>
						</ul>
						<p>💡 Vědci používají také <strong>termodynamickou teplotu</strong> (značka T, jednotka kelvin K) — její stupnice začíná <strong>absolutní nulou</strong>, teoreticky nejnižší teplotou hmoty. Potkáte ji na střední škole.</p>
						<h3>🧪 Pokus: dá se teplota změřit rukou?</h3>
						<p>Připrav si tři kádinky: se <strong>studenou</strong> (asi 5 °C), <strong>vlažnou</strong> (asi 25 °C) a <strong>horkou</strong> vodou (asi 45 °C — pozor, ne vroucí!). Levou ruku ponoř do studené, pravou do horké a chvíli počkej. Pak dej <strong>obě ruce do vlažné</strong>: levá ji cítí jako teplou, pravá jako studenou — <strong>a přitom je to tatáž voda</strong>. Tělesný pocit srovnává jen s tím, nač je ruka zvyklá, proto se na něj fyzika nespoléhá a teplotu <strong>měří teploměrem</strong>. Vyzkoušej si pokus v simulaci níže.</p>
						<h3>Historie měření teploty</h3>
						<ul>
							<li>dlouho se teplota určovala podle tělesných pocitů či barvy rozžhavených předmětů</li>
							<li><strong>Galileo Galilei</strong> (17. století) sestrojil vzduchový přístroj ukazující změny teploty a teploměr s plovoucími baňkami</li>
							<li><strong>Daniel Gabriel Fahrenheit</strong> — velice přesný rtuťový teploměr a vlastní stupnice (teplota lidského těla ≈ 98 °F); dodnes se používá hlavně v USA</li>
							<li><strong>Anders Celsius</strong> (18. století) — stupnice podle tuhnutí a varu vody, dnes nejpoužívanější (původně byla obrácená!)</li>
							<li>lékařský teploměr — až 19. století; ve 20. století elektrické a zářením snímající teploměry</li>
						</ul>
						<h3>Celsiova stupnice</h3>
						<ul>
							<li><strong>0 °C — teplota, při které taje led</strong></li>
							<li><strong>100 °C — teplota, při které voda vře</strong></li>
						</ul>
						<p>👉 Při zápisu teploty vždy uvádíme jednotky — „30 stupňů" může znamenat horko (°C) i mráz (°F ≈ −1 °C).</p>
						<h3>Jak fungují teploměry?</h3>
						<ol>
							<li><strong>teplotní roztažnost látek</strong> — při zahřátí se objem zvětší, při ochlazení zmenší; v kapalinových teploměrech rtuť (dnes zakázaná) nebo obarvený líh; bimetalový pásek ze dvou kovů s různou roztažností</li>
							<li><strong>elektrické vlastnosti látek</strong></li>
							<li><strong>záření vzdálených těles</strong></li>
						</ol>
						<h3>Druhy teploměrů</h3>
						<ul>
							<li><strong>kapalinový laboratorní</strong> — rtuťový či lihový, odečítání na stupnici</li>
							<li><strong>lékařský</strong> — rozsah 35–42 °C, hodnotu ukazuje i po sundání (rtuť se musí „střepat"); dnes se kvůli riziku otravy moc nepoužívá</li>
							<li><strong>bimetalový</strong> — pásek se při změně teploty stáčí a pohybuje ručičkou</li>
							<li><strong>digitální s elektronickým čidlem</strong> — přesný, bezpečný, dnes nejčastější</li>
							<li><strong>bezkontaktní</strong> — snímá tepelné záření (čelo, uši)</li>
							<li><strong>termokamera</strong> — tepelné záření převádí na obraz (úniky tepla z budov, prokrvení těla)</li>
						</ul>
						<p>📌 Každý teploměr má svůj <strong>měřicí rozsah</strong> — pro měření si musíme vybrat správný teploměr!</p>
						<h3>Měření teploty vzduchu v čase</h3>
						<p>Změny teplot zaznamenáváme do tabulek a grafů. V pražském <strong>Klementinu</strong> se teplota měří nepřetržitě od roku 1775 — nejdéle v Evropě (rekordy: +37,8 °C v červenci 1983, −27,6 °C v březnu 1785). <strong>Termograf</strong> v meteostanici zapisuje teplotu ručkou na otáčející se kotouč papíru.</p>
						<h3>Průměrná teplota</h3>
						<p>Jedno měření o počasí moc neřekne — meteorologové proto počítají <strong>průměrnou teplotu</strong>:</p>
						<ol>
							<li>všechny naměřené teploty <strong>sečti</strong>,</li>
							<li>součet <strong>vyděl počtem měření</strong>.</li>
						</ol>
						<p><strong>Příklad 1 — letní týden.</strong> Sedm dní jsme naměřili: 18, 21, 24, 19, 22, 20 a 16 °C.</p>
						<p>součet = 18 + 21 + 24 + 19 + 22 + 20 + 16 = <strong>140 °C</strong><br>
						průměr = 140 : 7 = <strong>20 °C</strong></p>
						<p><strong>Příklad 2 — zimní týden (i pod nulou).</strong> Naměřili jsme: −5, −2, 0, 3, −1, 2 a 3 °C.</p>
						<p>Záporné teploty se <strong>odečítají</strong>: součet = (−5) + (−2) + 0 + 3 + (−1) + 2 + 3 = <strong>0 °C</strong><br>
						průměr = 0 : 7 = <strong>0 °C</strong></p>
						<p>💡 Kontrola „zdravým rozumem": průměr musí vždy ležet <strong>mezi nejmenší a největší naměřenou hodnotou</strong>. Kdyby vyšlo 25 °C u týdne, kde nejtepleji bylo 24 °C, je ve výpočtu chyba.</p>
						<p>👉 Pozor: nezapomeň dělit <strong>počtem měření</strong> (kolik čísel jsme sčítali), ne počtem dnů v týdnu nebo jiným číslem.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Jak se měří teplota? 🎬',
							cesta: '/media/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/polemika-teplota-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: co se dá spočítat a ověřit 🎬',
							cesta: '/media/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/polemika-teplota-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{ druh: 'video', nazev: 'Píseň: Teploměr nelže 🎵', cesta: '/materialy/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/pisen-teplomer-nelze.m4a' },
					],
				},
				{
					slug: 'teplotni-roztaznost',
					interakce: 'teplomer',
					interakce2: 'kolejnice',
					nazev: 'Teplotní roztažnost',
					obsah: `
						<h2>Teplotní roztažnost látek</h2>
						<p>Látky <strong>všech skupenství</strong> při změně teploty mění svůj objem a rozměry:</p>
						<ul>
							<li>👉 <strong>ZAHŘÁTÍ ⇨ zvětšení</strong> rozměrů a objemu</li>
							<li>👉 <strong>OCHLAZENÍ ⇨ zmenšení</strong> rozměrů a objemu</li>
						</ul>
						<h3>Využití v praxi</h3>
						<ul>
							<li><strong>kapalinové teploměry</strong> — rtuťový, lihový</li>
							<li><strong>bimetalový pásek</strong> — dva pevně spojené pásy z různých kovů; každý se roztahuje jinak, pásek se proto kroutí a může spínat obvody nebo hýbat ručičkou</li>
							<li><strong>bimetalový teploměr</strong> — stočený pásek se při zahřátí odmotává</li>
							<li><strong>elektrický jistič</strong> — ochrana vedení před požárem: pásek se při silném proudu zahřeje a vypne obvod</li>
							<li><strong>bimetalový termostat</strong> — udržuje nastavenou teplotu (žehlička, trouba, topení): při dosažení teploty rozpojí obvod, při poklesu ho zase sepne</li>
							<li><strong>termostatický ventil u topení</strong> — kapalinový: při dosažení teploty v místnosti se zvětší objem kapaliny a zaškrtí přívod horké vody do radiátoru</li>
						</ul>
						<h3>Negativní dopady a jejich řešení</h3>
						<ul>
							<li><strong>kolejnice a mosty</strong> — v horku se protahují (kroucení kolejnic), v mrazu zkracují (praskání); řešení: <strong>dilatační spáry</strong>, konce mostů na válcích</li>
							<li><strong>dráty vedení a troleje</strong> — napínají se závažím, staví se prověšené</li>
							<li><strong>kotle a teplovodní potrubí</strong> — kotle volně v prostoru, do potrubí se vkládají ohebná kolena nebo <strong>kompenzátor</strong> (smyčka potrubí ve tvaru U, která se při roztažení jen mírně prohne)</li>
							<li><strong>sklo</strong> — běžné sklo při kontaktu s horkou tekutinou praskne; řešení: <strong>varné sklo</strong> s jiným složením</li>
							<li><strong>zubní plomby</strong> musí mít stejnou roztažnost jako zuby; ocelové pruty v železobetonu stejnou jako beton</li>
						</ul>
						<h3>Vliv teploty na hustotu</h3>
						<p>🧪 Pokus: balónek s horkou vodou vystoupá v nádobě s vodou výš než balónek s vodou pokojovou; se studenou vodou klesne níž.</p>
						<p>👉 Při vyšší teplotě se částice pohybují rychleji ⇨ mají mezi sebou větší mezery ⇨ <strong>hustota látky se zmenšuje</strong>.</p>
						<p>📌 Shrnutí: s rostoucí teplotou se objem tělesa <strong>zvětšuje</strong> a hustota <strong>zmenšuje</strong>; s klesající teplotou naopak.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Zahřátí a ochlazení mění rozměry 🎬',
							cesta: '/media/fyzika/6-rocnik/teplota/teplotni-roztaznost/polemika-roztaznost-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: roztažnost v praxi a jejích potížích 🎬',
							cesta: '/media/fyzika/6-rocnik/teplota/teplotni-roztaznost/polemika-roztaznost-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
					],
				},
			],
		},
		{
			slug: 'elektrina-a-magnetismus',
			nazev: 'Elektřina a magnetismus',
			podtemata: [
				{
					slug: 'magneticke-vlastnosti-latek',
					interakce: 'magnet',
					nazev: 'Magnetické vlastnosti látek, magnetické pole',
					obsah: `
						<h2>Magnetické vlastnosti látek</h2>
						<p>Magnet působí silou na některé předměty — kolem magnetu vzniká <strong>magnetické pole</strong>. Čím jsou tělesa od magnetu dál, tím je magnetická síla slabší.</p>
						<h3>Rozdělení látek podle reakce na magnetické pole</h3>
						<ul>
							<li><strong>feromagnetické</strong> — silně reagují, jsou přitahovány k magnetu a lze je <strong>zmagnetovat</strong>: železo a jeho sloučeniny (ocel), kobalt, nikl</li>
							<li><strong>nemagnetické</strong> — téměř nereagují: dřevo, papír, korek, plast; z kovů hliník, nerezová ocel, měď, zinek, stříbro</li>
						</ul>
						<p>💡 Existují i látky, které magnet nepatrně odpuzuje — <strong>diamagnetické</strong> (uhlík, měď, zlato). Tuha z tužky umí levitovat nad silnými magnety.</p>
						<h3>Magnety</h3>
						<ul>
							<li><strong>přírodní</strong> — nerost magnetit (magnetovec)</li>
							<li><strong>umělé</strong> — silnou magnetizací feromagnetického tělesa: feritový, neodymový</li>
							<li>tvary: tyčový, podkova, magnetka (střelka kompasu)…</li>
						</ul>
						<h3>Popis magnetu</h3>
						<ul>
							<li>každý magnet má <strong>dva magnetické póly</strong>: severní (N — north, značí se červeně) a jižní (S — south)</li>
							<li>i po rozdělení magnetu má každá část zase dva póly</li>
							<li><strong>na pólech je magnetická síla nejsilnější</strong>, mezi póly je <strong>netečné pásmo</strong> (síla nejslabší)</li>
						</ul>
						<h3>Chování těles v magnetickém poli</h3>
						<ul>
							<li>nemagnetické látky — síla na ně nepůsobí</li>
							<li>magnety — <strong>stejné póly se odpuzují, opačné se přitahují</strong></li>
							<li>feromagnetické látky — jsou vždy přitahovány; mohou se <strong>zmagnetovat</strong>:
								<ul>
									<li><strong>dočasný magnet</strong> — po oddálení magnetu magnetismus zaniká (magneticky měkká ocel)</li>
									<li><strong>trvalý magnet</strong> — magnetismus zůstává (magneticky tvrdá ocel)</li>
								</ul>
							</li>
							<li>odmagnetování: třením opačným pólem, cívkou se střídavým proudem nebo <strong>zahřátím</strong></li>
						</ul>
						<h3>Magnetické pole a indukční čáry</h3>
						<ul>
							<li>existenci pole zjišťujeme <strong>magnetkou</strong>; zviditelníme ho <strong>železnými pilinami</strong> — vznikne pilinový obrazec</li>
							<li>graficky pole znázorňují <strong>magnetické indukční čáry</strong> — uzavřené křivky od severního pólu (N) k jižnímu (S)</li>
							<li>ukazují směr magnetické síly (směr udává severní pól magnetky); nejhustší jsou u pólů</li>
							<li>magnety opačnými póly k sobě: nejsilnější pole mezi nimi — přitahují se; stejnými póly: pole mezi nimi nejslabší — odpuzují se</li>
						</ul>
						<h3>Využití magnetismu</h3>
						<p>Nástěnka, držáky a těsnění dveří ledničky, kompas a buzola, reproduktory, magnetické stavebnice, pevný disk počítače, malé elektromotory (stěrače), sběrač kovových štěpin. 👉 POZOR: magnet může poškodit hodinky, elektroniku i data na disku!</p>
						<h3>Magnetické pole Země</h3>
						<ul>
							<li>Země se chová jako velký tyčový magnet — vzniká díky rotaci tekutého železného jádra</li>
							<li>střelka kompasu ukazuje severním pólem na sever ⇨ <strong>na severním zeměpisném pólu je jižní magnetický pól</strong> (póly neleží přesně na zeměpisných a pomalu se pohybují)</li>
							<li>👉 magnetické pole Země nás <strong>chrání před slunečním větrem a kosmickým zářením</strong> — nebezpečné nabité částice odkloní; částice, které proniknou, vytvářejí u pólů <strong>polární záři</strong></li>
							<li>💡 mořeplavci se orientovali lodním kompasem; stěhovaví ptáci i lišky mají magnetoreceptory</li>
						</ul>
						<p>🌟 Vyzkoušej: <a href="https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_all.html?locale=cs" target="_blank" rel="noopener">simulace Magnet a kompas</a> — pohybuj kompasem kolem magnetu, pak si zvol Zemi.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika: Magnetické vlastnosti látek a magnetické pole 🎬',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/magneticke-vlastnosti-latek/polemika-magnetismus-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{ druh: 'video', nazev: 'Píseň: Plus a minus, sever s jihem 🎵', cesta: '/materialy/fyzika/6-rocnik/elektrina-a-magnetismus/magneticke-vlastnosti-latek/pisen-plus-a-minus-sever-s-jihem.m4a' },
					],
				},
				{
					slug: 'elektricke-vlastnosti-latek',
					nazev: 'Elektrické vlastnosti látek, stavba atomu, elektrické pole',
					interakce: 'elektrovani',
					obsah: `
						<h2>Elektrické vlastnosti látek</h2>
						<p>Když se češeš plastovým hřebenem nebo skáčeš na trampolíně, vlasy začnou vstávat — <strong>zelektrizovaly se</strong>. Příčinou silového působení je <strong>elektrický náboj</strong>. Známe dva druhy: kladný a záporný.</p>
						<h3>Stavba atomu</h3>
						<p>Každý atom se skládá z <strong>jádra a obalu</strong>:</p>
						<ul>
							<li><strong>jádro</strong>: <strong>protony</strong> — kladně nabité částice (+), a <strong>neutrony</strong> — bez náboje; jádro je vzhledem k atomu velice maličké</li>
							<li><strong>obal</strong>: <strong>elektrony</strong> — záporně nabité částice (−)</li>
						</ul>
						<ul>
							<li><strong>počet protonů určuje chemický prvek</strong> (protonové číslo, najdeme v periodické tabulce)</li>
							<li>počet protonů a neutronů v jádře běžným zacházením změnit nelze; <strong>počet elektronů lze měnit jednoduše — třeba třením</strong></li>
							<li>za normálních podmínek je protonů a elektronů stejně; jejich náboje jsou stejně velké, ale opačné</li>
						</ul>
						<h3>Neutrální a nabité těleso</h3>
						<ul>
							<li><strong>elektricky neutrální těleso</strong> — počty protonů a elektronů jsou stejné, působení nábojů se navenek vyruší</li>
							<li><strong>elektricky nabité těleso</strong> — obsahuje atomy s převažujícím nábojem = <strong>ionty</strong>:
								<ul>
									<li><strong>kladný iont</strong> — atom, ze kterého se při tření odtrhl jeden nebo více elektronů (protonů je pak víc než elektronů)</li>
									<li><strong>záporný iont</strong> — atom, který přijal do obalu jeden nebo více elektronů</li>
								</ul>
							</li>
						</ul>
						<p>👉 Pozor: záporný iont nevznikne odtržením protonů — měnit lze jen elektrony v obalu!</p>
						<h3>Elektrování těles</h3>
						<ul>
							<li>nabití těles při vzájemném <strong>tření</strong> (vlasy a hřeben, dítě a skluzavka)</li>
							<li>vždy se nabijí <strong>obě tělesa</strong> — jedno kladně, druhé záporně (plast vždy záporně, sklo kladně)</li>
							<li>zelektrovaná tělesa na sebe působí <strong>elektrickou silou</strong></li>
						</ul>
						<h3>Vodiče a izolanty</h3>
						<ul>
							<li><strong>elektrické vodiče</strong> — snadno přijímají či odevzdávají elektrony, přenášejí náboj: všechny kovy; využití k vedení proudu</li>
							<li><strong>izolanty (nevodiče)</strong> — brání přenosu náboje: suché dřevo, plast, guma; ochrana před úrazem</li>
						</ul>
						<p><strong>Uzemnění</strong> = vodivé spojení nabitého tělesa se Zemí — Země přijme volné elektrony a těleso se vybije (bezpečnost zařízení, ochrana před bleskem). 👉 Při přeskoku elektronů vznikají jiskry — statická elektřina (svetr, karoserie auta); proto se při tankování vypíná motor.</p>
						<h3>Elektrické pole</h3>
						<ul>
							<li>vzniká <strong>kolem každého nabitého tělesa</strong>, působí elektrickou silou i bez dotyku</li>
							<li><strong>nesouhlasně nabitá tělesa se přitahují</strong> (hřeben − a vlasy +), <strong>souhlasně nabitá se odpuzují</strong> (vlasy mezi sebou)</li>
							<li><strong>elektrostatická indukce</strong> — v nenabitém kovovém tělese se volné elektrony přesunou na jednu stranu ⇨ jedna část záporná, druhá kladná</li>
							<li><strong>polarizace izolantu</strong> — elektrony se posunou jen uvnitř atomů</li>
						</ul>
						<p>Pole znázorňujeme <strong>elektrickými siločarami</strong> — ukazují směr síly na kladný náboj, směřují od + k −; čím silnější pole, tím hustší siločáry.</p>
						<h3>Určování elektrického stavu tělesa</h3>
						<ul>
							<li><strong>elektroskop</strong> — je-li těleso nabité, vnitřní tyčinka a ručička se nabijí souhlasně, odpuzují se a <strong>ručička se vychýlí</strong>; před dalším měřením elektroskop vybijeme uzemněním</li>
							<li><strong>elektrometr</strong> — elektroskop se stupnicí; velikosti nábojů jen <strong>porovnává</strong> (čím větší výchylka, tím větší náboj)</li>
							<li><strong>znaménko náboje</strong> — podle reakce na nabité těleso z plastu (−): přitahuje se ⇨ opačný náboj (+), odpuzuje se ⇨ stejný (−)</li>
						</ul>
						<p>🌟 Vyzkoušej: <a href="https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_all.html?locale=cs" target="_blank" rel="noopener">simulace John Travoltage</a> (nabíjení a vybíjení) a <a href="https://phet.colorado.edu/cs/simulations/balloons-and-static-electricity" target="_blank" rel="noopener">Balónek a statická elektřina</a>.</p>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Stavba atomu, náboj a elektrizování 🎬',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/elektricke-vlastnosti-latek/polemika-elektrina-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: Elektrické pole a jeho zjišťování 🎬',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/elektricke-vlastnosti-latek/polemika-elektrina-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
					],
				},
				{
					slug: 'jednoduche-elektricke-obvody',
					interakce: 'obvod',
					nazev: 'Jednoduché elektrické obvody',
					obsah: `
						<h2>Elektrický proud ve vodiči</h2>
						<ul>
							<li>vzniká při <strong>uspořádaném pohybu volných nabitých částic</strong>: volné elektrony v kovech, ionty v roztocích solí či kyselin, výjimečně i ve vzduchu (blesk, jiskření)</li>
							<li>příčinou pohybu částic je elektrické pole, které vzniká díky <strong>elektrickému napětí</strong> mezi konci vodiče</li>
							<li>proud prochází jen <strong>vodiči</strong> (kovy, roztoky); <strong>izolanty</strong> (dřevo, plast, guma) neprochází</li>
							<li>účinky proudu: <strong>zahřívání vodiče</strong> (topení, varná deska, žhavé vlákno žárovky svítí) a <strong>magnetické účinky</strong> (elektromagnet)</li>
							<li>jednotka: <strong>ampér (A)</strong>, měřidlo: <strong>ampérmetr</strong></li>
						</ul>
						<h2>Elektrické napětí</h2>
						<ul>
							<li>vzniká rozdílem nábojů na koncích vodiče — je <strong>příčinou elektrického proudu</strong></li>
							<li>jednotka: <strong>volt (V)</strong>, měřidlo: <strong>voltmetr</strong></li>
						</ul>
						<h3>Zdroje elektrického napětí</h3>
						<ul>
							<li><strong>elektrárna</strong> ➪ zásuvky ve zdi (230 V — při špatném zacházení velmi nebezpečné!)</li>
							<li><strong>elektrocentrála</strong> — náhradní zdroj (práce na silnicích, záloha v nemocnici)</li>
							<li><strong>přenosné zdroje</strong> — baterie a akumulátory: tužkový článek 1,5 V, plochá baterie 4,5 V, autobaterie asi 12 V</li>
						</ul>
						<h2>Elektrický obvod</h2>
						<ul>
							<li>musí obsahovat: <strong>zdroj napětí, vodiče a spotřebič</strong> (žárovka, motor, fén…); dále může mít spínač, měřidla, pojistku</li>
							<li><strong>proud prochází, jen když je obvod uzavřen</strong> — všechny části vodivě spojeny</li>
							<li><strong>schéma obvodu</strong> — přehledný obrázek zapojení; každý prvek má dohodnutou <strong>schematickou značku</strong>; místo spojení vodičů je <strong>uzel</strong></li>
						</ul>
						<h3>Směr proudu a baterie</h3>
						<ul>
							<li>baterie má <strong>kladnou a zápornou svorku</strong>; na záporné je přebytek elektronů</li>
							<li>volné elektrony jsou odpuzovány od záporné svorky a přitahovány ke kladné</li>
							<li>u žárovky na směru proudu nezáleží; u LED diody a elektroniky <strong>záleží na orientaci baterie</strong></li>
							<li>více baterií za sebou ➪ vyšší napětí (3 × 1,5 V = 4,5 V); dodržet orientaci (+ k −)</li>
						</ul>
						<h3>Zkrat a ochranné prvky</h3>
						<p>👉 <strong>Zkrat</strong> = vodivé propojení svorek zdroje bez spotřebiče — protéká velký proud, vodiče se zahřívají a hrozí požár! Ochranu zajišťuje <strong>tavná pojistka</strong> — tenký drátek se při silném proudu roztaví a přeruší obvod (elektronika, auta, domácnost).</p>
						<h3>Bezpečnost práce s obvody</h3>
						<ol>
							<li>obvod zapojíme nejprve <strong>bez zdroje</strong></li>
							<li>zkontrolujeme neporušenou izolaci vodičů a zašroubovanou žárovku</li>
							<li>spínač zapojíme ve vypnuté poloze</li>
							<li>teprve po kontrole připojíme zdroj a nakonec sepneme spínač</li>
						</ol>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Proud, napětí a zdroje napětí 🎬',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/jednoduche-elektricke-obvody/polemika-obvody-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: Elektrický obvod, zkrat a bezpečnost 🎬',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/jednoduche-elektricke-obvody/polemika-obvody-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co máš umět za 1. pololetí</h2>
						<p>Přehled učiva prvního pololetí 6. ročníku. Dole na stránce si můžeš dát <strong>souhrnný kvíz</strong> složený z otázek všech probraných témat.</p>
						<h3>1. <a href="../../latka-a-teleso/">Látka a těleso</a></h3>
						<ul>
							<li>co je fyzika a jak pracuje fyzik (pozorování, pokus, měření)</li>
							<li>látka × těleso, vlastnosti látek a těles, fyzikální veličiny</li>
							<li>částicové složení látek, Brownův pohyb, difuze</li>
							<li>atomy a molekuly, prvek, sloučenina, směs</li>
							<li>skupenství látek a jejich vlastnosti</li>
						</ul>
						<h3>2. <a href="../../sila/">Síla</a></h3>
						<ul>
							<li>vzájemné působení těles, účinky síly (pohybové, deformační), síla F, newton, siloměr</li>
							<li>gravitační síla a gravitační pole, 1 kg ≈ 10 N, svislý směr a olovnice</li>
						</ul>
						<h3>3. <a href="../../fyzikalni-veliciny/">Fyzikální veličiny</a></h3>
						<ul>
							<li>délka (m), hmotnost (kg), objem (m³, litry), hustota (kg/m³)</li>
							<li>měřidla, pravidla měření, odchylka měření, převody jednotek</li>
							<li>vztahy: ρ = m : V, V = m : ρ, m = ρ · V, 1 l = 1 dm³</li>
						</ul>
						<h3>4. Základy elektřiny a magnetismu (<a href="../../elektrina-a-magnetismus/">celek Elektřina a magnetismus</a>)</h3>
						<ul>
							<li>stavba atomu (jádro: protony a neutrony; obal: elektrony), vznik iontů</li>
							<li>souhlasné náboje se odpuzují, opačné se přitahují; elektrická síla</li>
							<li>magnetické póly: souhlasné se odpuzují, opačné se přitahují</li>
						</ul>
						<h3>📋 Klíčové hodnoty</h3>
						<ul>
							<li>hustota vody 1 000 kg/m³, 1 litr vody = 1 kg</li>
							<li>gravitační síla na 1 kg ≈ 10 N</li>
							<li>1 kN = 1 000 N, 1 t = 1 000 kg, 1 q = 100 kg, 1 dag = 10 g</li>
						</ul>
						<h3>🎮 Další procvičování (Wordwall)</h3>
						<p>Interaktivní cvičení od tvého učitele:</p>
						<ul>
							<li><a href="https://wordwall.net/cs/resource/63448418" target="_blank" rel="noopener">Gravitační síla Země — kvíz</a></li>
							<li><a href="https://wordwall.net/cs/resource/61873638" target="_blank" rel="noopener">Skupenství látek — kvíz</a></li>
							<li><a href="https://wordwall.net/cs/resource/60691133" target="_blank" rel="noopener">Atom, molekula, sloučenina — spojovačka</a></li>
							<li><a href="https://wordwall.net/cs/resource/60691009" target="_blank" rel="noopener">Atom — pravda, nebo lež</a></li>
							<li><a href="https://wordwall.net/cs/resource/60690669" target="_blank" rel="noopener">Atom — práskni krtka</a></li>
						</ul>
					`,
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co máš umět za celý 6. ročník</h2>
						<p>Přehled učiva celého ročníku. Dole na stránce najdeš <strong>souhrnný kvíz</strong> z otázek všech témat roku.</p>
						<h3>1. <a href="../../latka-a-teleso/">Látka a těleso</a></h3>
						<ul><li>fyzika jako věda; látka × těleso; částice, atomy a molekuly; prvek, sloučenina, směs; skupenství látek</li></ul>
						<h3>2. <a href="../../sila/">Síla</a></h3>
						<ul><li>vzájemné působení těles; síla F (newton), siloměr; gravitační síla a pole (1 kg ≈ 10 N)</li></ul>
						<h3>3. <a href="../../fyzikalni-veliciny/">Fyzikální veličiny</a></h3>
						<ul><li>délka, hmotnost, objem, hustota — značky, jednotky, měřidla, převody; ρ = m : V</li></ul>
						<h3>4. <a href="../../cas/">Čas</a></h3>
						<ul><li>sekunda, minuta, hodina; historické i moderní hodiny; u času se čárka neposouvá (1 h = 60 min)!</li></ul>
						<h3>5. <a href="../../teplota/">Teplota</a></h3>
						<ul><li>°C, Celsiova stupnice (0 °C tání ledu, 100 °C var vody), druhy teploměrů; teplotní roztažnost a její využití i potíže (dilatační spáry)</li></ul>
						<h3>6. <a href="../../elektrina-a-magnetismus/">Elektřina a magnetismus</a></h3>
						<ul><li>magnety, póly, indukční čáry, magnetické pole Země; stavba atomu, náboj, vodiče a izolanty, elektrické pole; jednoduchý obvod, proud (A), napětí (V), zkrat a bezpečnost</li></ul>
						<h3>📋 Přehled veličin roku</h3>
						<table>
							<thead><tr><th>Veličina</th><th>Značka</th><th>Jednotka</th><th>Měřidlo</th></tr></thead>
							<tbody>
								<tr><td>délka</td><td>l, d</td><td>m</td><td>metr, pásmo…</td></tr>
								<tr><td>hmotnost</td><td>m</td><td>kg</td><td>váhy</td></tr>
								<tr><td>objem</td><td>V</td><td>m³ (l)</td><td>odměrný válec</td></tr>
								<tr><td>hustota</td><td>ρ</td><td>kg/m³</td><td>hustoměr</td></tr>
								<tr><td>čas</td><td>t</td><td>s</td><td>hodiny, stopky</td></tr>
								<tr><td>teplota</td><td>t</td><td>°C</td><td>teploměr</td></tr>
								<tr><td>síla</td><td>F</td><td>N</td><td>siloměr</td></tr>
								<tr><td>el. proud</td><td>—</td><td>A</td><td>ampérmetr</td></tr>
								<tr><td>el. napětí</td><td>—</td><td>V</td><td>voltmetr</td></tr>
							</tbody>
						</table>
					`,
				},
				{
					slug: 'pokusy',
					nazev: '20 jednoduchých pokusů',
					interakce: 'pokusy',
					obsah: `
						<h2>20 jednoduchých fyzikálních pokusů</h2>
						<p>Krátké, levné pokusy na doma i do třídy. 👉 Vždy s dohledem dospělého a bezpečně (horká voda → opatrně, rukavice)!</p>
						<h3>Stavba látek, elektřina a magnetismus</h3>
						<ol>
							<li><strong>Model atomu</strong> — z plastelíny 3 barev a párátek postav „planetární" model: protony a neutrony do středu, elektrony na oběžné dráhy. Uvidíš, že atom má jádro a obal — základ pro pochopení iontů.</li>
							<li><strong>Balónek a papírky</strong> — balónek tři o vlasy a přibliž k papírovým konfetám. Papírky „skáčou" k balónku — opačné náboje se přitahují.</li>
							<li><strong>Balónek proti balónku</strong> — dva nafouknuté balónky třené o vlasy zavěs vedle sebe. Stejné náboje se odpuzují.</li>
							<li><strong>Magnetický řetěz</strong> — k magnetu přilož sponku, k ní další… Magnet do sponek „indukuje" póly a řetěz ukáže dosah magnetické síly.</li>
							<li><strong>Kompas vs. magnet</strong> — pomalu přibližuj magnet ke střelce kompasu. Střelka se vychýlí — blízký magnet převáží nad zemským polem.</li>
						</ol>
						<h3>Síly a čas</h3>
						<ol start="6">
							<li><strong>Padající tělesa</strong> — pusť z výšky hlavy list papíru a stejný papír zmuchlaný. Zmuchlaný padá rychleji — má menší odpor vzduchu, gravitace působí na oba stejně.</li>
							<li><strong>Kyvadlo a čas</strong> — na provázku měř stopkami periody krátkého a dlouhého kyvadla. Delší kyvadlo kmitá pomaleji — perioda závisí hlavně na délce, ne na hmotnosti.</li>
							<li><strong>Gumička jako siloměr</strong> — zavěšuj na silnou gumičku závaží a měř pravítkem prodloužení. Větší síla → větší prodloužení (princip siloměru).</li>
						</ol>
						<h3>Objem a hustota</h3>
						<ol start="9">
							<li><strong>Archimédův pohár</strong> — do odměrného válce s vodou vlož kámen a odečti nový objem. Rozdíl hladin = objem kamene.</li>
							<li><strong>Plovoucí vejce</strong> — do sklenice s vodou postupně přisypávej sůl. Až hustota roztoku vzroste, vejce vyplave.</li>
							<li><strong>Slámkový hustoměr</strong> — brčko dole utěsni modelínou se závažím a označ rysky ve vodě a slané vodě. V hustší kapalině se ponoří méně — jako opravdový hustoměr.</li>
							<li><strong>Vrstvené kapaliny</strong> — opatrně nalij do sklenice med, jar, obarvenou vodu a olej. Kapaliny vytvoří vrstvy podle hustoty.</li>
							<li><strong>Led v oleji a ve vodě</strong> — kostku ledu vhoď do vody a do oleje. Ve vodě plave (má menší hustotu), v oleji klesá (olej je ještě lehčí).</li>
						</ol>
						<h3>Teplota, teplo a skupenství</h3>
						<ol start="14">
							<li><strong>Chladicí líh</strong> — kápni na ruku vodu a vedle líh. Líh chladí víc — rychlejší odpařování odebírá teplo.</li>
							<li><strong>Pára a kondenzace</strong> — nad párou z konvice přidrž (bezpečně!) kovové víčko. Na víčku vznikají kapky — pára kondenzuje.</li>
							<li><strong>Balónek na lahvi</strong> — PET láhev s navlečeným balónkem střídavě vkládej do horké a studené vody. Teplý vzduch se roztáhne a balónek nafoukne, studený se stáhne.</li>
							<li><strong>Barevný teploměr</strong> — brčko s obarvenou vodou utěsni plastelínou ve skleničce a sleduj hladinu v teple a chladu — tepelná roztažnost kapaliny.</li>
							<li><strong>Zaseknuté víčko</strong> — šroubovací víčko sklenice nahřej v teplé vodě. Kov se roztáhne a víčko jde snáz otevřít.</li>
							<li><strong>Slunce vs. stín</strong> — jeden teploměr zabal do černého papíru na slunci, druhý nech ve stínu. Černý povrch pohlcuje více záření — vyšší teplota.</li>
							<li><strong>Vodivost tepla</strong> — kovovou a plastovou lžíci ponoř do horké vody a po minutě sáhni na horní konce. Kov vede teplo mnohem lépe než plast.</li>
						</ol>
					`,
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika 1: Elektřina, magnetismus, síly a čas 🎬',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pokusy/polemika-pokusy-1.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
						{
							druh: 'video',
							nazev: 'Polemika 2: Objem, hustota, teplota a teplo 🎬',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pokusy/polemika-pokusy-2.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence a úvodní obrázek je také vygenerovaný. Schémata kreslí program podle zadaných hodnot.',
						},
					],
					odkazy: [
						{ nazev: 'Pokus: Teplotní roztažnost plynů (balónek na lahvi) (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/6168-pokus-teplotni-roztaznost-plynu' },
						{ nazev: 'Pokus: Pokusy s magnetismem (kompas, plovoucí jehla) (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/3414-pokusy-s-magnetismem' },
						{ nazev: 'Pevnost poznání — Zkuste s námi fyzikální pokusy s vajíčky', url: 'https://www.pevnostpoznani.cz/zkuste-s-nami-fyzikalni-pokusy-s-vajicky/' },
					],
				},
			],
		},
	],
	'fyzika/7-rocnik': [
		{
			slug: 'pohyb-a-rychlost',
			nazev: 'Pohyb a rychlost',
			podtemata: [
				{
					slug: 'klid-a-pohyb-telesa',
					nazev: 'Klid a pohyb tělesa',
					interakce: 'relativita-pohybu',
					obsah: "<h2>Klid a pohyb tělesa</h2>\n\n<p>Těleso je <strong>v pohybu</strong>, když mění svou polohu vůči jinému tělesu. Je <strong>v klidu</strong>, když svou polohu vůči němu nemění. Vždy proto musíme uvést, vzhledem k jakému tělesu klid nebo pohyb posuzujeme — říkáme také, kdo je pozorovatel.</p>\n<p>Sedící cestující ve vlaku je v klidu vůči svému sedadlu i vůči spolucestujícímu vedle sebe. Vůči dítěti stojícímu u přejezdu je ale v pohybu. Stejné těleso může být v klidu vůči jednomu tělesu a zároveň v pohybu vůči jinému.</p>\n<p>Podobně je to i se stromem. Vůči řidiči jedoucího auta strom mění polohu, a proto se pohybuje. Spolu se Zemí se navíc pohybuje i vůči Slunci. Klid a pohyb tělesa proto vždy závisí na tom, s čím je srovnáváme (odborně: jsou relativní).</p>\n<h3>Trasa pohybu (trajektorie): kudy těleso prochází</h3>\n<p>Čára, kterou těleso opíše při pohybu, se nazývá trasa neboli trajektorie. Může být vidět, třeba stopa lyžaře ve sněhu nebo čára tužky na papíře. Trasu letícího ptáka si musíme jen představit.</p>\n<h3>Přímočarý a křivočarý pohyb</h3>\n<p>Podle tvaru trasy rozlišujeme dva druhy pohybu.</p>\n<ul>\n<li><strong>Přímočarý pohyb:</strong> trasou je přímka nebo úsečka. Takhle jede výtah nebo zboží po rovném pásu u pokladny.</li>\n<li><strong>Křivočarý pohyb:</strong> trasou je křivka. Příkladem je slalom lyžaře, kličkování zajíce, pohyb dítěte na kolotoči nebo míč při volejbalu.</li>\n</ul>\n<h3>Dráha: jakou délku těleso urazilo</h3>\n<p><strong>Dráha</strong> je délka trasy, kterou těleso urazilo. Značíme ji <strong>s</strong> a měříme v metrech (m); použít můžeme i jiné jednotky délky.</p>\n<p>Trasa a dráha nejsou totéž: trasa je čára, dráha je její délka. Když řekneme „oválná závodní dráha\", myslíme tím tvar čáry, tedy trasu (trajektorii) — ne její délku.</p>",
					zapis: {"jednotky":["dráha — značíme s, jednotka m (metr)"],"body":["Pohyb tělesa je změna jeho polohy vzhledem k jinému tělesu.","klid a pohyb tělesa jsou relativní","vždy uvádíme, vzhledem k jakému tělesu (kdo je pozorovatel)","trasa (trajektorie) — čára, po které se těleso pohybuje","pohyb je přímočarý, nebo křivočarý","dráha — délka trasy, s, m"]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Základy pohybu tělesa: Jak se věci hýbou?',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/infografika-zaklady-pohybu.jpg',
						},
					],
				},
				{
					slug: 'posuvny-otacivy-pohyb',
					nazev: 'Posuvný a otáčivý pohyb',
					interakce: 'posuvny-otacivy',
					obsah: "<h2>Posuvný a otáčivý pohyb</h2>\n\n<p>Rozhlédni se kolem sebe — vlak jede po kolejích, houpačka se houpe, šroub se zatáčí do dřeva. Každý takový pohyb patří k jednomu ze dvou <strong>základních druhů pohybu</strong>: posuvnému nebo otáčivému. Všechny složitější pohyby jsou z nich poskládané.</p>\n\n<h3>Posuvný pohyb</h3>\n<p>Při posuvném pohybu se <strong>každý bod tělesa pohybuje stejným směrem a stejnou rychlostí</strong>. Dráhy všech bodů mají stejný tvar a stejnou délku, jen jsou vedle sebe posunuté.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-pohyb.jpg\" alt=\"Posuvný pohyb trojúhelníkového pravítka\" />\n<p>Podle tvaru dráhy rozlišujeme dva druhy. Je-li dráha rovná, jde o pohyb <strong>přímočarý</strong>. Je-li dráha zakřivená, jde o pohyb <strong>křivočarý</strong>.</p>\n<p>Příklady: vlak jedoucí po rovné trati, zboží klouzající po pokladním pásu, letadlo při dálkovém letu.</p>\n\n<h3>Otáčivý pohyb</h3>\n<p>Při otáčivém pohybu se <strong>všechny body tělesa pohybují po kružnicích</strong>. Jejich středy leží na jedné přímce, které říkáme <strong>osa otáčení</strong>.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/otacivy-pohyb.jpg\" alt=\"Otáčivý pohyb trojúhelníkového pravítka\" />\n<p>Osa otáčení může být uvnitř tělesa, třeba u krasobruslařky při piruetě. Nebo může být mimo těleso, třeba u auta na kruhovém objezdu.</p>\n<p>👉 <strong>Čím dál je bod od osy otáčení, tím větší kružnici opisuje a tím rychleji se pohybuje.</strong> Proto je konec hodinové ručičky rychlejší než její střed.</p>\n<p>Příklady: houpačka, hodinové ručičky, krasobruslařka při piruetě, auto na kruhovém objezdu.</p>\n\n<h3>Složený pohyb</h3>\n<p>Složený pohyb vznikne, když se posuvný a otáčivý pohyb spojí dohromady.</p>\n<ul>\n<li><strong>Země</strong> — otáčí se kolem vlastní osy a zároveň obíhá kolem Slunce.</li>\n<li><strong>Šroub</strong> — otáčí se a přitom se posouvá do dřeva; jeho dráha má tvar šroubovice.</li>\n<li>Podobně se pohybuje horská dráha, akrobatický let letadla nebo gymnasta na hrazdě.</li>\n</ul>",
					zapis: {"body":["posuvný pohyb: stejný směr, stejná rychlost","dráhy bodů: stejný tvar a délka, rovnoběžné","posuvný přímočarý: dráha je přímka","posuvný křivočarý: dráha je křivka","otáčivý pohyb: body po kružnicích kolem osy","dál od osy = větší kružnice = větší rychlost","složený pohyb = posuvný + otáčivý"]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Jak se tělesa pohybují: posuvný, otáčivý a složený pohyb',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb/infografika-jak-se-telesa-pohybuji.jpg',
						},
						{
							druh: 'infografika',
							nazev: 'Druhy pohybu: přehled s příklady',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb/infografika-druhy-pohybu.jpg',
						},
						{
							druh: 'infografika',
							nazev: 'Tahák: posuvný a otáčivý pohyb',
						},
						{
							druh: 'video',
							nazev: 'Píseň: Posuvný a otáčivý 🎵',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb/pisen-posuvny-otacivy.m4a',
						},
					],
				},
				{
					slug: 'rychlost-draha-cas',
					nazev: 'Rychlost, dráha, čas',
					interakce: 'rychlost',
					obsah: "<h2>Rychlost, dráha, čas</h2>\n<p>Rychlost říká, jak rychle se něco pohybuje. Ukazuje, jakou dráhu těleso urazí za určitý čas. Čím delší dráhu urazí za stejnou dobu, tím je rychlejší.</p>\n<p>Rychlost značíme <strong>v</strong>, dráhu <strong>s</strong> a čas <strong>t</strong>. Platí mezi nimi vzorec:</p>\n<p style=\"font-size:1.3rem\"><strong>v = s : t</strong></p>\n<p>Rychlost je dráha dělená časem. Když ze vzorce vyjádříme dráhu nebo čas, dostaneme dva další vzorce: <strong>s = v · t</strong> a <strong>t = s : v</strong>.</p>\n\n<h3>Jednotky rychlosti</h3>\n<p>Rychlost se nejčastěji udává ve <strong>metrech za sekundu (m/s)</strong> nebo v <strong>kilometrech za hodinu (km/h)</strong>. Metry za sekundu se hodí třeba u běžce. Kilometry za hodinu známe z rychloměru v autě.</p>\n\n<h3>Převod mezi m/s a km/h</h3>\n<p>Mezi jednotkami se <strong>násobí nebo dělí číslem 3,6</strong> — desetinná čárka se nikam neposouvá. Hodina má 3 600 sekund a kilometr má 1 000 metrů, z toho číslo 3,6 vychází.</p>\n<ul>\n<li>Z m/s na km/h: <strong>násob 3,6</strong> (10 m/s = 36 km/h)</li>\n<li>Z km/h na m/s: <strong>děl 3,6</strong> (36 km/h = 10 m/s)</li>\n</ul>\n\n<h3>Rovnoměrný a nerovnoměrný pohyb</h3>\n<p>Když těleso urazí za stejné doby vždy stejné dráhy, koná <strong>rovnoměrný pohyb</strong> — jeho rychlost se nemění. Tak jede třeba auto na dálnici, jezdí eskalátor nebo se otáčí ručička hodin.</p>\n<p>Když se dráhy za stejné doby liší, jde o <strong>nerovnoměrný pohyb</strong> — rychlost se mění. Může být <strong>zrychlený</strong>, třeba start rakety nebo rozjíždění autobusu, anebo <strong>zpomalený</strong>, třeba brzdění vlaku.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rovnomerny-pohyb.jpg\" alt=\"Nerovnoměrný a rovnoměrný pohyb automobilu\" />\n\n<h3>Graf dráhy a času</h3>\n<p>Pohyb zakreslíme do grafu, kde je na jedné ose čas a na druhé dráha. U rovnoměrného pohybu je graf <strong>přímka</strong>, protože rychlost se nemění. U nerovnoměrného pohybu přímka není.</p>\n\n<h3>Okamžitá a průměrná rychlost</h3>\n<p><strong>Okamžitá rychlost</strong> ukazuje, jak rychle se těleso pohybuje právě teď. Vidíme ji na tachometru v autě nebo na policejním radaru.</p>\n<p><strong>Průměrná rychlost</strong> je jiná věc — je to celá dráha dělená celým časem cesty, i když se rychlost po cestě měnila. Počítáme ji stejným vzorcem v = s : t.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Rychlost 72 km/h běžně vídáme na značkách v obci. Kolik je to metrů za sekundu?</p>\n<p>v = 72 : 3,6 = <strong>20 m/s</strong></p>\n<p>A naopak: cyklista jede rychlostí 20 m/s. Kolik to je v km/h?</p>\n<p>v = 20 &middot; 3,6 = <strong>72 km/h</strong></p>\n<p>Autobus ujel 60 km za 90 minut. Jaká byla jeho průměrná rychlost v km/h?</p>\n<p>90 min = 1,5 h<br>v = s : t = 60 : 1,5 = <strong>40 km/h</strong></p>\n<p>💡 Zkouška po hlavě: 1,5 &middot; 40 = 60 km — souhlasí.</p>",
					zapis: {"vzorec":"v = s : t      (odvozeně: s = v · t,  t = s : v)","jednotky":["rychlost — značíme v, jednotka m/s (metr za sekundu) nebo km/h (kilometr za hodinu)","dráha — značíme s, jednotka m (metr) nebo km (kilometr)","čas — značíme t, jednotka s (sekunda) nebo h (hodina)","Převod: z km/h na m/s děl 3,6, z m/s na km/h násob 3,6 (desetinná čárka se neposouvá).","Do vzorce dosazuj jednotky ve stejné soustavě — buď m a s, nebo km a h."],"vzorecSlovy":"rychlost = dráha děleno čas","body":["v = s : t","m/s ↔ km/h: násob/děl 3,6","rovnoměrný pohyb — rychlost se nemění","nerovnoměrný pohyb — rychlost se mění","průměrná rychlost = celá dráha : celý čas"]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Rychlost: základy fyziky v pohybu',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/infografika-zaklady-rychlosti.jpg',
						},
						{
							druh: 'infografika',
							nazev: 'Tahák: rychlost pohybu',
						},
						{
							druh: 'video',
							nazev: 'Píseň: Rychlost na plný! 🎵',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/pisen-rychlost.m4a',
						},
					],
				},
				{
					slug: 'priklady-na-vypocet-rychlosti',
					nazev: 'Příklady na výpočet rychlosti',
					interakce: 'vypocet-rychlosti',
					obsah: "<h2>Příklady na výpočet rychlosti</h2>\n\n<p>Vzorec <strong>v = s : t</strong> teď použijeme na skutečné úlohy. U každého příkladu nejdřív zjistíme, co známe, pak dosadíme do vzorce a spočítáme výsledek i s jednotkou.</p>\n\n<h3>Čtení a kreslení grafů rychlosti</h3>\n<p>Pohyb tělesa můžeme zakreslit do grafu. Na vodorovnou osu píšeme čas, na svislou osu dráhu nebo rychlost.</p>\n<p>Když se těleso pohybuje pořád stejně rychle, jde o rovnoměrný pohyb. Graf dráhy je rostoucí přímka a graf rychlosti je vodorovná přímka.</p>\n<p>Když těleso zrychluje nebo zpomaluje, jde o nerovnoměrný pohyb. Graf dráhy pak přímka není.</p>\n<ol>\n<li>nakresli dvě kolmé osy se šipkami — čas je vždy vodorovně</li>\n<li>ke každé ose napiš značku veličiny a jednotku</li>\n<li>na obě osy vyznač stejně velké dílky</li>\n<li>vynes body z tabulky a spoj je čarou</li>\n</ol>\n\n<h3>Vypočítej rychlost: příklady</h3>\n<p>Podívej se na první příklad krok za krokem.</p>\n<p><strong>Příklad 1: Cesta autem</strong><br>Auto ujelo 200 km za 4 hodiny. Jaká byla jeho průměrná rychlost?</p>\n<ul>\n<li>zapíšeme, co známe: s = 200 km, t = 4 h</li>\n<li>vzorec: v = s : t</li>\n<li>dosadíme: v = 200 : 4</li>\n<li>výsledek: v = <strong>50 km/h</strong></li>\n</ul>\n\n<p><strong>Příklad 2: Běh na lyžích</strong><br>Lyžař urazil 30 km za 2 hodiny. Jakou průměrnou rychlostí se pohyboval?</p>\n<p>v = s : t = 30 : 2 = <strong>15 km/h</strong></p>\n\n<p><strong>Příklad 3: Cyklistický výlet</strong><br>Skupina cyklistů ujela 45 km za 3 hodiny. Jaká byla jejich průměrná rychlost?</p>\n<p>v = s : t = 45 : 3 = <strong>15 km/h</strong></p>\n\n<p><strong>Příklad 4: Vlaková souprava</strong><br>Vlak ujel 360 km mezi dvěma městy za 4 hodiny. Jaká je jeho průměrná rychlost?</p>\n<p>v = s : t = 360 : 4 = <strong>90 km/h</strong></p>\n\n<p><strong>Příklad 5: Krátký běh</strong><br>Žák uběhl 100 m za 20 sekund. Jaká byla jeho průměrná rychlost?</p>\n<p>v = s : t = 100 : 20 = <strong>5 m/s</strong> (to je 18 km/h)</p>\n\n<h3>✏️ Procvič si: základní příklady</h3>\n<p>Nejdřív počítej sám, pak si rozklikni řešení.</p>\n<ol>\n<li>Auto ujelo 200 km za 4 hodiny. Jaká byla jeho rychlost? <details><summary>řešení</summary>v = 200 : 4 = <strong>50 km/h</strong></details></li>\n<li>Lyžař urazil 30 km za 2 hodiny. <details><summary>řešení</summary>v = 30 : 2 = <strong>15 km/h</strong></details></li>\n<li>Cyklisté ujeli 45 km za 3 hodiny. <details><summary>řešení</summary>v = 45 : 3 = <strong>15 km/h</strong></details></li>\n<li>Vlak ujel 360 km za 4 hodiny. <details><summary>řešení</summary>v = 360 : 4 = <strong>90 km/h</strong></details></li>\n<li>Žák uběhl 100 m za 20 s. <details><summary>řešení</summary>v = 100 : 20 = <strong>5 m/s</strong></details></li>\n</ol>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Tady jsou úlohy, kde musíš nejdřív minuty převést na hodiny. Teprve pak dosadíš do vzorce.</p>\n\n<p><strong>Příklad 6: Pěší túra</strong><br>Turista ušel 6 km za 120 minut. Jaká byla jeho průměrná rychlost v km/h?</p>\n<p>Nejdřív převedeme čas: 120 min = 2 h.<br>v = s : t = 6 : 2 = <strong>3 km/h</strong></p>\n\n<p><strong>Příklad 7: Turistický výlet</strong><br>Turisté ušli 3 km za 36 minut. Vypočítej jejich rychlost v km/h.</p>\n<p>36 min = 0,6 h.<br>v = s : t = 3 : 0,6 = <strong>5 km/h</strong></p>\n\n<p><strong>Příklad 8: Cyklistický závod</strong><br>Cyklista jel v závodu etapu dlouhou 231 km za 5 hodin 30 minut. Jakou jel rychlostí?</p>\n<p>5 h 30 min = 5,5 h.<br>v = s : t = 231 : 5,5 = <strong>42 km/h</strong></p>\n<p>💡 Zkouška: 5,5 &middot; 42 = 231 km — souhlasí.</p>\n\n<p><strong>Příklad 9: Dopravní letadlo</strong><br>Letadlo uletělo 585 km za 1 hodinu 18 minut. Vypočítej jeho průměrnou rychlost.</p>\n<p>18 min = 0,3 h, celý čas je 1 h + 0,3 h = 1,3 h.<br>v = s : t = 585 : 1,3 = <strong>450 km/h</strong></p>\n<p>💡 Zkouška: 1,3 &middot; 450 = 585 km — souhlasí.</p>\n<p>⚠️ <strong>Pozor na častou chybu:</strong> kdo zapomene na celou hodinu a dělí jen 0,3 h, vyjde mu 585 : 0,3 = 1 950 km/h. Tak rychle letadla nelétají! Minuty vždy převeď a přičti k celým hodinám.</p>\n\n<p>Zkus si teď spočítat sám:</p>\n<ol>\n<li>Turista ušel 6 km za 120 minut. Rychlost v km/h? <details><summary>řešení</summary>120 min = 2 h; v = 6 : 2 = <strong>3 km/h</strong></details></li>\n<li>Turisté ušli 3 km za 36 minut. <details><summary>řešení</summary>36 min = 0,6 h; v = 3 : 0,6 = <strong>5 km/h</strong></details></li>\n<li>Cyklista jel etapu 231 km za 5 h 30 min. <details><summary>řešení</summary>5 h 30 min = 5,5 h; v = 231 : 5,5 = <strong>42 km/h</strong></details></li>\n<li>Letadlo uletělo 585 km za 1 h 18 min. <details><summary>řešení</summary>18 min = 0,3 h, celkem 1,3 h; v = 585 : 1,3 = <strong>450 km/h</strong>. Pozor: dělit jen 0,3 h je chyba!</details></li>\n</ol>",
					zapis: {"vzorec":"v = s : t      (odvozeně: s = v · t,  t = s : v)","jednotky":["rychlost — značíme v, jednotka km/h nebo m/s (kilometr za hodinu / metr za sekundu)","dráha — značíme s, jednotka km nebo m (kilometr / metr)","čas — značíme t, jednotka h nebo s (hodina / sekunda)","Převody: 1 km = 1 000 m, 1 h = 60 min = 3 600 s; z km/h na m/s děl 3,6, z m/s na km/h násob 3,6.","Do vzorce dosazuj jednotky ve stejné soustavě: km a h dají km/h, m a s dají m/s."],"vzorecSlovy":"rychlost = dráha děleno čas","body":["v = s : t","zapiš, co znáš — s a t","sjednoť jednotky (min → h: děl 60)","km/h ↔ m/s: krát nebo děl 3,6","graf rychlosti: vodorovná přímka, graf dráhy: rostoucí přímka"]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Tahák: rovnoměrný pohyb — vzorce a grafy',
						},
					],
				},
			],
		},
		{
			slug: 'sily-kolem-nas',
			nazev: 'Síly kolem nás',
			podtemata: [
				{
					slug: 'sila',
					nazev: 'Síla',
					interakce: 'sila-vektor',
					obsah: "<h2>Síla</h2>\n\n<p>Kolem sebe pořád vidíme, jak na sebe tělesa nějak působí: ruka napíná tětivu luku, brankář chytá letící míč, magnet přitahuje hřebík. Tomuto vzájemnému působení těles říkáme <strong>síla</strong>. <strong>Síla</strong> je fyzikální veličina, která popisuje, jak na sebe tělesa navzájem působí.</p>\n\n<p>Síla může s tělesem pohnout, nebo jím otočit. Podle toho, kde na tělese síla působí, má <strong>posuvný</strong>, nebo <strong>otáčivý účinek</strong>.</p>\n\n<h3>Síla jako šipka</h3>\n<p>Síla má tři vlastnosti: <strong>velikost</strong>, <strong>směr</strong> a <strong>působiště</strong> (místo, kde síla na těleso působí). Veličině, která má velikost i směr, se říká <strong>vektor</strong>. Proto sílu kreslíme jako šipku.</p>\n\n<h3>Jednotka a měření síly</h3>\n<p>Sílu značíme <strong>F</strong> a měříme ji v <strong>newtonech (N)</strong>. K měření síly slouží <strong>siloměr</strong> — má uvnitř pružinu, a čím větší síla na siloměr působí, tím víc se pružina natáhne.</p>\n\n<h3>Znázornění síly</h3>\n<p>Sílu kreslíme jako šipku. Začátek šipky je v <strong>působišti</strong>, směr šipky ukazuje <strong>směr síly</strong> a délka šipky ukazuje <strong>velikost síly</strong>.</p>\n<p>Aby šipka nebyla ani moc velká, ani moc malá, zvolíme si <strong>měřítko</strong> — třeba že 1 cm šipky odpovídá síle 1 N. Když kreslíme víc sil najednou, musí mít všechny stejné měřítko.</p>\n\n<h3>Druhy sil</h3>\n<ul>\n<li><strong>Elektrická síla</strong> – například zelektrizované pravítko přitahuje papírky</li>\n<li><strong>Magnetická síla</strong> – například magnet přitahuje železné předměty</li>\n<li><strong>Gravitační (tíhová) síla</strong> – tělesa se navzájem přitahují, čím větší těleso, tím větší síla</li>\n<li><strong>Třecí síla</strong> – působí na těleso tažené po podložce</li>\n</ul>\n<p>Mezi další síly patří <strong>tahová</strong>, <strong>tlaková</strong> a <strong>vztlaková</strong> síla.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/tahova-sila.png\" alt=\"Jeřáb – příklad tahové síly\" />\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Síla F<sub>1</sub> má velikost 1 kN, což je 1 000 N. Na obrázku ji zakreslíme šipkou dlouhou 5 cm.</p>\n<p>Jaké je to měřítko? 1 cm šipky odpovídá 1 000 : 5 = 200 N.</p>\n<p>Síla F<sub>2</sub> je na stejném obrázku zakreslená šipkou dlouhou 4 cm. Podle stejného měřítka platí:</p>\n<p>F<sub>2</sub> = 4 · 200 = 800 N</p>",
					zapis: {"jednotky":["síla — značíme F, jednotka N (newton)","Převody: 1 kN = 1 000 N.","Siloměr: měří sílu; čím větší síla na něj působí, tím víc se natáhne jeho pružina."],"body":["síla = vzájemné působení těles","značka F, jednotka N (newton)","posuvný nebo otáčivý účinek","velikost + směr + působiště = vektor","měří siloměr (pružina)","kreslí se šipkou podle měřítka","druhy: elektrická, magnetická, gravitační, třecí, tahová, tlaková, vztlaková"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Síly kolem nás 🎵', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/sila/pisen-sily-kolem-nas.m4a' },
					],
				},
				{
					slug: 'gravitacni-sila',
					interakce: 'vrh',
					nazev: 'Gravitační síla',
					obsah: "<h2>Gravitační síla</h2>\n<p>Všechna tělesa, která mají hmotnost, se navzájem přitahují. Této síle říkáme <strong>gravitační síla</strong>. Zákony gravitace popsal anglický fyzik Isaac Newton.</p>\n<p>Gravitační síla je vždy přitažlivá, nikdy neodpuzuje. Čím větší mají tělesa hmotnost, tím větší je síla mezi nimi. Mezi planetami a hvězdami jsou proto obrovské gravitační síly. Mezi dvěma tužkami na stole je síla tak malá, že ji vůbec nepoznáme.</p>\n<p>Gravitační síla záleží i na vzdálenosti těles. Čím dál jsou tělesa od sebe, tím je síla menší. Kosmonaut daleko ve vesmíru proto cítí přitažlivost Země jen velmi slabě.</p>\n\n<h3>Gravitační pole Země</h3>\n<p>V okolí Země je <strong>gravitační pole</strong> — prostor, kde Země přitahuje všechna tělesa ke svému středu. Nejsilněji působí u povrchu Země. Čím výš se dostaneme, tím víc slábne.</p>\n<p>Blízko povrchu je Země tak veliká, že směr přitažlivosti vypadá pořád stejně. Gravitační síla proto míří <strong>svisle dolů</strong>. Jablko padá ze stromu rovně dolů a padák s nákladem letí svisle k zemi.</p>\n\n<h3>Vzorec pro gravitační sílu</h3>\n<p>Každé těleso o hmotnosti 1 kg je k Zemi přitahováno silou přibližně 10 N. Tomuto poměru mezi gravitační silou a hmotností říkáme <strong>gravitační zrychlení</strong> (často se mu říká i gravitační konstanta) a značíme ho <strong>g</strong>.</p>\n<p>Na Zemi platí: <strong>g = 10 N/kg</strong></p>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila-vzorec.jpg\" alt=\"Vzorec Fg = m . g\" />\n<p><strong>Fg = m · g</strong></p>\n<ul>\n<li>m ... hmotnost [kg]</li>\n<li>Fg ... gravitační síla [N]</li>\n<li>g ... gravitační zrychlení (gravitační konstanta) = 10 N/kg</li>\n</ul>\n\n<h3>Tíha a hmotnost — není to stejné</h3>\n<p>Hmotnost tělesa říká, kolik látky v něm je. Hmotnost zůstává stejná všude — na Zemi, na Měsíci i ve vesmíru.</p>\n<p><strong>Tíha</strong> je vlastně gravitační síla, kterou je těleso přitahováno k planetě. Tíha se podle místa mění, protože gravitační pole je jinde silnější a jinde slabší.</p>\n<p>Na Měsíci je gravitační pole přibližně 6× slabší než na Zemi. Kdyby mělo těleso na Zemi tíhu 60 N, na Měsíci by ho gravitace táhla dolů jen silou 10 N. Proto kosmonauti na Měsíci nadskakují jako v pomalém filmu.</p>\n<p>Když se postavíš na váhu, měří vlastně sílu, kterou tě Země přitahuje. Rovnou ti ale ukáže tvoji hmotnost v kilogramech.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila-priklad.jpg\" alt=\"Těleso o hmotnosti 100 g je přitahováno k Zemi silou 1 N\" />\n<p>Fyzikové rozlišují gravitační sílu a tíhovou sílu ještě přesněji. Do tíhové síly se totiž počítá i drobný vliv otáčení Země. Pro naše výpočty na základní škole je rozdíl tak malý, že obě síly počítáme stejně, podle vzorce Fg = m · g.</p>\n<p>My na základní škole počítáme s hodnotou g = 10 N/kg. Přesnější hodnota je g = 9,81 N/kg. Tu se naučíš používat až na střední škole.</p>\n\n<p>Vypočítej sílu, kterou jsou tělesa přitahována k Zemi:</p>\n<p><strong>Žehlička</strong> (m = 0,6 kg)<br>\nFg = m · g = 0,6 · 10 = <strong>6 N</strong></p>\n<p><strong>Auto</strong> (m = 1 200 kg)<br>\nFg = m · g = 1 200 · 10 = 12 000 N = <strong>12 kN</strong></p>\n<p><strong>Ocelový nosník</strong> (m = 1,4 t = 1 400 kg)<br>\nFg = m · g = 1 400 · 10 = 14 000 N = <strong>14 kN</strong></p>\n\n<p>Procvič si:</p>\n<p>1) Těleso o hmotnosti 40 kg<br>\nFg = 40 · 10 = <strong>400 N</strong></p>\n<p>2) Těleso je k Zemi přitahováno silou 12 kN. Jaká je jeho hmotnost?<br>\nm = Fg : g = 12 000 : 10 = <strong>1 200 kg</strong></p>\n<p>3) Těleso je k Zemi přitahováno silou 7 kN. Jaká je jeho hmotnost?<br>\nm = Fg : g = 7 000 : 10 = <strong>700 kg</strong></p>\n<p>4) Auto o hmotnosti 1 600 kg<br>\nFg = 1 600 · 10 = 16 000 N = <strong>16 kN</strong></p>\n<p>5) Těleso o hmotnosti 12 t (12 000 kg)<br>\nFg = 12 000 · 10 = 120 000 N = <strong>120 kN</strong></p>",
					zapis: {"vzorec":"Fg = m · g      (odvozeně: m = Fg : g,  g = Fg : m)","jednotky":["gravitační síla — značíme Fg, jednotka N (newton)","hmotnost — značíme m, jednotka kg (kilogram)","g — gravitační zrychlení (často se říká gravitační konstanta), jednotka N/kg (newton na kilogram), na Zemi g = 10 N/kg","Převody: 1 kN = 1 000 N, 1 t = 1 000 kg. Do vzorce dosazuj sílu v N, hmotnost v kg a g v N/kg."],"vzorecSlovy":"gravitační síla = hmotnost krát gravitační zrychlení","body":["Fg = m · g","g = 10 N/kg (na Zemi)","gravitační síla míří svisle dolů","u povrchu nejsilnější, s výškou slábne","hmotnost je všude stejná, tíha se mění","na Měsíci je tíha asi 6× menší"]},
					materialy: [
					],
				},
				{
					slug: 'treci-sila',
					interakce: 'treni',
					nazev: 'Třecí síla',
					obsah: "<h2>Třecí síla</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila-piktogram.png\" alt=\"Třecí síla – lyžař\" />\n<p>Když se dva povrchy o sebe třou, vzniká mezi nimi <strong>tření</strong>. Tření vytváří <strong>třecí sílu</strong>, která brání pohybu tělesa. Třecí síla vždycky míří proti směru, kterým se těleso pohybuje nebo kterým se ho snažíme posunout.</p>\n<p>Pokud je třecí síla větší než síla, kterou na těleso tlačíme, těleso zůstává v klidu. Když je naopak působící síla větší než třecí síla, těleso se dá do pohybu. Tření vzniká proto, že žádný povrch není úplně hladký — má drobné nerovnosti.</p>\n\n<h3>Na čem tření závisí</h3>\n<p>Třecí síla závisí hlavně na drsnosti povrchu a na tom, jak moc těleso tlačí na podložku. Čím drsnější povrchy jsou, tím větší tření vzniká — proto hokejový puk klouže po ledu snadno, ale po betonu skoro vůbec.</p>\n<p>Tření také roste s <strong>přítlačnou silou</strong>: naložený kamion vytváří na vozovce větší tření než prázdný, protože tlačí větší silou dolů.</p>\n\n<h3>Smykové, klidové a valivé tření</h3>\n<p><strong>Smykové tření</strong> vzniká, když se jedno těleso posouvá (smýká) po povrchu druhého — třeba když auto brzdí a kola se přestanou otáčet.</p>\n<p><strong>Klidové tření</strong> působí, když se těleso teprve snažíme rozpohybovat, ale ještě stojí. Je o něco větší než smykové tření a je nejsilnější těsně předtím, než se těleso pohne. Proto je nejtěžší rozjet stojící auto nebo posunout těžkou skříň.</p>\n<p><strong>Valivé tření</strong> vzniká, když se těleso valí po podložce, třeba kolo. Je ze všech tří druhů nejmenší, a proto ho všude, kde to jde, používáme místo smykového — pomocí kol nebo ložisek. Platí, že čím větší kolo, tím menší valivé tření.</p>\n\n<h3>Kdy nám tření pomáhá a kdy naopak vadí</h3>\n<p>Tření je často užitečné. Díky němu chodíme, jedeme na kole, píšeme tužkou po papíře a auta dokážou brzdit. Bez tření by hřebík nedržel ve dřevě a boty by klouzaly po chodníku.</p>\n<p>Jindy nám tření naopak škodí — zvyšuje spotřebu paliva u aut, opotřebovává součástky strojů a zahřívá je. Proto se motory musí promazávat olejem, jinak by se mohly zadřít.</p>\n\n<h3>Jak tření zvětšíme a zmenšíme</h3>\n<p>Tření zvětšíme tak, že povrch uděláme drsnějším — třeba smirkovým papírem, nebo použijeme jiné materiály. V zimě se silnice sypou pískem nebo solí a na kola aut se dávají řetězy, aby auta na ledu lépe brzdila.</p>\n<p>Tření naopak zmenšíme vyhlazením a leštěním povrchu, mazáním olejem nebo vazelínou, nebo použitím kuličkových či válečkových ložisek — mají je třeba kola u jízdního kola nebo in-line brusle. Zajímavost: úplně dokonale vyleštěné plochy k sobě přilnou. Tření se pak paradoxně znovu o kousek zvětší, i když se to v běžném životě skoro nestává.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Třecí sílu spočítáme podle vzorce, kde F<sub>n</sub> je přítlačná síla kolmo na podložku a f je součinitel tření — číslo z tabulky, které záleží na materiálu povrchů:</p>\n<p style=\"font-size:1.3rem\"><strong>F<sub>t</sub> = F<sub>n</sub> · f</strong></p>\n<p>Vypočti třecí sílu, která vzniká při tlačení ocelového tělesa o hmotnosti 50 kg po dřevěné vodorovné podložce. Těleso je už v pohybu, součinitel tření f = 0,35.</p>\n<p>Nejdřív spočítáme tíhovou sílu: F<sub>g</sub> = m · g = 50 · 10 = 500 N. Na vodorovné podložce je přítlačná síla stejně velká jako tíhová, takže F<sub>n</sub> = 500 N.</p>\n<p>Třecí síla je F<sub>t</sub> = F<sub>n</sub> · f = 500 · 0,35 = <strong>175 N</strong>.</p>",
					zapis: {"vzorec":"Fₜ = Fₙ · f      (odvozeně: Fₙ = Fₜ : f,  f = Fₜ : Fₙ)","jednotky":["třecí síla — značíme Fₜ, jednotka N (newton)","přítlačná (normálová) síla — značíme Fₙ, jednotka N (newton)","součinitel tření — značíme f, bez jednotky (číslo z tabulky)","1 kN = 1 000 N","Do vzorce dosazuj síly v N; součinitel tření je bez jednotky."],"vzorecSlovy":"třecí síla = přítlačná síla krát součinitel tření","body":["Fₜ = Fₙ · f","tření míří proti pohybu tělesa","závisí na drsnosti povrchu a přítlačné síle","větší tření = těleso stojí, větší síla = pohyb","tři druhy: smykové, klidové, valivé","klidové tření je největší, valivé nejmenší","pomáhá: chůze, brzdění, psaní, posyp silnic","vadí: opotřebení, zahřívání, ztráty energie","zvětšíme drsností povrchu","zmenšíme leštěním, mazáním, ložisky"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Třecí síla', cesta: '7JG_JbKRw70' },
					],
				},
				{
					slug: 'skladani-sil',
					interakce: 'skladani-sil',
					nazev: 'Skládání sil',
					obsah: "<h2>Skládání sil</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil.png\" alt=\"Skládání sil – přetahování o krabici\" />\n<p>Na těleso může působit víc sil najednou. Všechny tyto síly můžeme nahradit jednou jedinou silou, která má na těleso stejný účinek. Říkáme jí <strong>výslednice sil</strong>. Hledání výslednice se nazývá <strong>skládání sil</strong>.</p>\n<p>Nejdřív se podíváme na síly, které působí ve stejném místě tělesa.</p>\n\n<h3>Síly stejného směru</h3>\n<p>Když síly F<sub>1</sub> a F<sub>2</sub> míří <strong>stejným směrem</strong>, jejich výslednici sčítáme:</p>\n<p><strong>F = F<sub>1</sub> + F<sub>2</sub></strong></p>\n<p>Třeba dva psi táhnou saně stejným směrem. První silou 30 N, druhý silou 50 N. Výsledná síla je 30 + 50 = 80 N.</p>\n\n<h3>Síly opačného směru</h3>\n<p>Když síly F<sub>1</sub> a F<sub>2</sub> míří <strong>proti sobě</strong>, jejich výslednici odečítáme:</p>\n<p><strong>F = F<sub>1</sub> − F<sub>2</sub></strong></p>\n<p>Výsledná síla má vždycky směr té větší síly. Třeba dva psi se tahají o kost. Jeden táhne silou 30 N doleva, druhý silou 50 N doprava. Výsledná síla je 50 − 30 = 20 N a míří doprava.</p>\n\n<h3>Rovnováha sil</h3>\n<p>Když jsou dvě opačné síly stejně velké, jejich výslednice je nulová. Říkáme, že síly jsou v <strong>rovnováze</strong>.</p>\n<p>Tak je to třeba při přetahování lanem: obě družstva táhnou silou 4 500 N, ale opačným směrem. Lano se nikam nehýbe, protože výsledná síla je 0 N.</p>\n<p>Síly v rovnováze těleso nerozpohybují, ale mohou ho přesto <strong>deformovat</strong> – třeba natáhnout pružinu, přetrhnout lano nebo rozbít hrnek.</p>\n\n<h3>Různoběžné síly</h3>\n<p>Síly někdy nemíří ani stejným, ani přesně opačným směrem – říkáme jim <strong>různoběžné</strong>. Takové síly nemůžeme jednoduše sečíst ani odečíst. Jejich výslednici na základní škole určujeme jen graficky, pomocí kreslení.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Různoběžné síly umíme složit nakreslením <strong>rovnoběžníku</strong>. Z konců obou šipek F<sub>1</sub> a F<sub>2</sub> vedeme pomocné čáry rovnoběžné s tou druhou silou. Výslednice F vede ze společného počátku do místa, kde se čáry protnou.</p>\n<p>Dva psi táhnou saně. První táhne pořád rovně silou F<sub>1</sub> = 40 N, druhý uhne stranou a táhne silou F<sub>2</sub> = 30 N. Síly nakreslíme v měřítku 1 cm = 10 N. F<sub>1</sub> jako úsečku 4 cm, F<sub>2</sub> jako úsečku 3 cm.</p>\n<p>Když sestrojíme rovnoběžník a změříme úhlopříčku, vyjde F = 65 N.</p>",
					zapis: {"vzorec":"stejný směr: F = F₁ + F₂      opačný směr: F = F₁ − F₂","jednotky":["výsledná síla — značíme F, jednotka N (newton)","jednotlivé síly — značíme F₁ a F₂, jednotka N (newton)","Převod: 1 kN = 1 000 N. Do vztahů dosazuj všechny síly v N."],"vzorecSlovy":"stejný směr: výsledná síla je součet obou sil; opačný směr: výsledná síla je rozdíl obou sil","body":["Víc sil nahradíme jednou výslednicí se stejným účinkem.","Stejný směr: síly sčítáme.","Opačný směr: síly odčítáme, výslednice míří jako větší síla.","Stejně velké opačné síly = rovnováha, F = 0.","I v rovnováze se těleso může deformovat.","Různoběžné síly neskládáme sčítáním ani odčítáním, ale kreslením."]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Skládání sil', cesta: 'GWJnn_4_zHc' },
						{ druh: 'audio', nazev: 'Poslech: jak složit síly do jedné výslednice 🎧', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/audio-pravidlo-rovnobezniku.mp3' },
					],
				},
				{
					slug: 'teziste',
					interakce: 'teziste',
					nazev: 'Těžiště',
					obsah: "<h2>Těžiště</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste.png\" alt=\"Těžiště nákladního auta\" />\n<p><strong>Těžiště</strong> je bod tělesa, ve kterém si můžeme představit soustředěnou celou jeho hmotnost. V těžišti také působí celková tíhová síla tělesa. Značíme ho písmenem T. Každé těleso má vždy jen jedno těžiště.</p>\n\n<h3>Kde leží těžiště u pravidelných těles</h3>\n<p>U pravidelných těles, jako je koule, krychle nebo kvádr, leží těžiště přesně uprostřed — ve středu souměrnosti.</p>\n<p>Podobně je to u těles souměrných podle osy, třeba váza, kuželka nebo hruška. Jejich těžiště leží přímo na této ose.</p>\n<p>Těžiště nemusí ležet uvnitř tělesa. U obruče nebo podkovy leží těžiště v prázdném prostoru uprostřed.</p>\n\n<h3>Jak těžiště najdeme (zavěšení, těžnice)</h3>\n<p>U nepravidelných těles zjistíme těžiště pokusem. Zavěsíme těleso na niť a počkáme, až se ustálí.</p>\n<p>Těžiště leží přesně pod bodem závěsu, na svislé čáře. Tato čára se nazývá <strong>těžnice</strong>.</p>\n<p>Když těleso zavěsíme za jiný bod, dostaneme druhou těžnici. Těžiště leží tam, kde se těžnice protnou.</p>\n<p>Stejné slovo těžnice se používá i u trojúhelníku. Těžnice spojuje vrchol se středem protější strany. Těžiště trojúhelníku leží v průsečíku všech tří těžnic.</p>\n<p>U nepravidelných těles záleží poloha těžiště na tom, kde je nejvíc hmoty. Těžiště je blíž té části, která je těžší.</p>\n\n<h3>Rovnovážné polohy: stálá, vratká, volná</h3>\n<p>Když těleso vychýlíme z klidu, může se chovat třemi různými způsoby. Podle toho rozlišujeme tři druhy rovnovážné polohy.</p>\n<ul>\n<li><strong>Stálá</strong> (také stabilní) – po vychýlení se těžiště zvedne. Těleso se samo vrátí zpátky.</li>\n<li><strong>Vratká</strong> (také labilní) – po vychýlení těžiště klesne. Těleso se převrátí do jiné polohy.</li>\n<li><strong>Volná</strong> (také indiferentní) – těžiště zůstává pořád stejně vysoko. Těleso zůstane v každé nové poloze, třeba valící se koule.</li>\n</ul>\n\n<h3>Stabilita: nízké těžiště, široká podstava</h3>\n<p><strong>Stabilita</strong> znamená, jak dobře těleso odolává převrácení. Čím níž a čím blíž ke středu podstavy těžiště leží, tím je těleso stabilnější.</p>\n<p>Stabilitu zvýší i širší podstava. Proto se vysoké stožáry kotví lany co nejdál od paty.</p>\n<p>Záleží i na tvaru tělesa. Širší základna dole a nízké těžiště dělají těleso stabilnější — třeba komíny jsou dole široké a nahoře úzké.</p>\n<p>Proto mají nákladní auta, jeřáby nebo soutěžní vozy těžiště co nejníže. Sníží se tím riziko převrácení.</p>\n\n<h3>Těžiště kolem nás</h3>\n<p>Stabilita je důležitá ve stavebnictví. Vysoké budovy i věže potřebují mít těžiště nízko a uprostřed podstavy.</p>\n<p>Těžiště lidského těla se mění podle polohy. S rovnováhou musí umět pracovat gymnasté, artisté nebo skokani na lyžích.</p>\n<p>I brankář při chytání míče rozkročí nohy a přikrčí se. Sníží si tím těžiště a lépe udrží rovnováhu.</p>",
					zapis: {"body":["těžiště T = bod, kde je soustředěná celá hmotnost tělesa","v těžišti působí tíhová síla tělesa","pravidelná tělesa (koule, krychle, kvádr): těžiště ve středu souměrnosti","osově souměrná tělesa: těžiště na ose souměrnosti","nepravidelná tělesa: najdeme zavěšením na niti, těžiště = průsečík těžnic","stabilita: nižší těžiště a širší podstava = stabilnější těleso","stálá poloha: těžiště se zvedá, těleso se vrátí zpět","vratká poloha: těžiště klesá, těleso se převrátí","volná poloha: těžiště zůstává stejně vysoko (např. valící se koule)"]},
					materialy: [
					],
				},
			],
		},
		{
			slug: 'jednoduche-stroje',
			nazev: 'Jednoduché stroje',
			podtemata: [
				{
					slug: 'pusobeni-teles-a-deformace',
					interakce: 'ucinky-sily',
					nazev: 'Působení těles a deformace',
					obsah: "<h2>Působení těles a deformace</h2>\n<p>Každé těleso na něco působí. A zároveň to samo něco působí zpátky na něj — nikdy to nejde jen jedním směrem. Tomuto vzájemnému ovlivňování říkáme <strong>vzájemné působení</strong>, odborně <strong>interakce</strong>. Může probíhat dotykem, nebo na dálku (například gravitací, magnetem nebo elektrickým polem).</p>\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/vzajemne-pusobeni.jpg\" alt=\"Vzájemné působení dvou těles\" />\n\n<h3>Jak síla těleso ovlivní</h3>\n<p>Síla na těleso může působit dvěma způsoby. Buď mu <strong>změní pohyb</strong>, nebo mu <strong>změní tvar</strong>.</p>\n<ul>\n<li><strong>Pohybové účinky</strong> – síla těleso posune (<strong>posuvný účinek</strong>), nebo jím otočí kolem osy (<strong>otáčivý účinek</strong>).</li>\n<li><strong>Deformační účinek</strong> – síla změní tvar tělesa.</li>\n</ul>\n<p>Záleží na tom, kam síla míří. Když míří do <strong>těžiště</strong> tělesa (bod, kolem kterého je těleso v rovnováze), těleso se posune. Když míří mimo těžiště, těleso se místo toho otočí.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/posuv-otaceni.jpg\" alt=\"Posuvný a otáčivý účinek síly\" />\n\n<h3>Statické a dynamické působení</h3>\n<p>Podle výsledku rozlišujeme dva druhy působení síly na těleso.</p>\n<ul>\n<li><strong>Statické působení</strong> – těleso zůstává v klidu, protože se síly navzájem ruší. Například kniha leží na stole.</li>\n<li><strong>Dynamické působení</strong> – mění rychlost nebo směr pohybu tělesa. Například auto se rozjíždí.</li>\n</ul>\n\n<h3>Pružná a trvalá deformace</h3>\n<p>Síla může těleso nejen posunout nebo otočit, ale i změnit jeho tvar. Této změně tvaru říkáme <strong>deformace</strong>. Rozlišujeme dva druhy.</p>\n<ul>\n<li><strong>Pružná (elastická) deformace</strong> – dočasná. Jakmile síla přestane působit, těleso se vrátí do původního tvaru. Příkladem je míč nebo pružina.</li>\n<li><strong>Trvalá (plastická) deformace</strong> – tvar tělesa zůstane změněný i po skončení působení síly. Příkladem je pomačkaný plech nebo modelína.</li>\n</ul>\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/pruzna-deformace.jpg\" alt=\"Pružná deformace – tenisový míček a raketa\" />\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/trvala-deformace.jpg\" alt=\"Trvalá deformace – havarované auto\" />",
					zapis: {"body":["vzájemné působení = dotyk nebo na dálku","síla mění pohyb (posun, otočení), nebo mění tvar","posun: síla míří do těžiště; otočení: mimo těžiště","statické působení: klid, síly se ruší","dynamické působení: mění rychlost nebo směr","pružná deformace: tvar se vrátí","trvalá deformace: tvar zůstane"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Porozumění síle a deformaci', cesta: '0vmDKVXisgE' },
						{ druh: 'youtube', nazev: 'Video: Síla a interakce', cesta: 'RRSRb_6VXt0' },
					],
				},
				{
					slug: 'jednoduche-stroje-paky',
					interakce: 'paka',
					nazev: 'Jednoduché stroje a páky',
					obsah: "<h2>Jednoduché stroje a páky</h2>\n<p><strong>Jednoduché stroje</strong> nám usnadňují práci. Umožňují zvednout nebo přemístit těžké těleso menší silou. Patří mezi ně páka, kladka, nakloněná rovina nebo kolo na hřídeli.</p>\n\n<h3>Páka: osa a ramena</h3>\n<p><strong>Páka</strong> je tuhá tyč, která se může otáčet kolem pevného bodu. Tomuto bodu říkáme <strong>osa otáčení (O)</strong>.</p>\n<p>Vzdálenost mezi osou otáčení a místem, kde na páku působí síla, se nazývá <strong>rameno síly (a)</strong>.</p>\n\n<h3>Rovnováha na páce</h3>\n<p>Čím delší je rameno síly, tím menší síla stačí k vyvážení stejného účinku. Proto se páka hodí na práci s těžkými břemeny.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/paka-priklad1.jpg\" alt=\"Páka v rovnováze – stejně dlouhá ramena\" />\n<img src=\"/obrazky/fyzika/7-rocnik/jednoduche-stroje/paka-priklad2.jpg\" alt=\"Páka v rovnováze – kratší rameno u břemene\" />\n<p>Na obrázcích je vidět, že stejně velkou silou nadzvedneme větší břemeno, pokud je <strong>rameno u břemene kratší</strong> než rameno, na které působíme silou.</p>\n<p>Páka je v rovnováze, když platí: <strong>F<sub>1</sub> &middot; a<sub>1</sub> = F<sub>2</sub> &middot; a<sub>2</sub></strong>. F₁ a F₂ jsou síly, a₁ a a₂ jejich ramena. Součinu síly a jejího ramene se říká <strong>moment síly</strong>.</p>\n<p>Zjednodušeně: menší síla působí dál od osy, větší síla blíž k ose.</p>\n\n<h3>Dvojzvratná a jednozvratná páka</h3>\n<p>Podle toho, kde je osa otáčení, dělíme páky na dva druhy.</p>\n<p><strong>Dvojzvratná páka</strong> má osu uprostřed tyče. Síly působí na obou stranách od osy a každá ji otáčí na jinou stranu — proto dvojzvratná. Příkladem je houpačka nebo rovnoramenné váhy.</p>\n<p><strong>Jednozvratná páka</strong> má osu na kraji tyče. Obě síly působí na stejné straně od osy a otáčí pákou stejným směrem — proto jednozvratná. Příkladem je otvírák na lahve nebo stavební kolečko.</p>\n<p>Když si na houpačku sednou dvě různě těžké děti, těžší dítě zůstane dole a lehčí nahoře. Houpačka není v rovnováze, dokud si těžší dítě nesedne blíž k ose.</p>\n\n<h3>Páka kolem nás</h3>\n<p>Páku využívá spousta běžných věcí. U každé poznáš osu otáčení i obě ramena sil.</p>\n<ul>\n<li>nůžky a kleště</li>\n<li>lis na česnek a louskáček na ořechy</li>\n<li>otvírák na lahve</li>\n<li>zahradní nebo stavební kolečko</li>\n<li>maticový klíč a páčidlo</li>\n<li>rovnoramenné váhy</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Páka funguje i v našem těle. Sval na paži má velmi krátké rameno síly blízko loketního kloubu. Proto musí táhnout mnohem větší silou, než jakou zvedáme v ruce.</p>\n<p>Na páce jsou zavěšena dvě závaží: m<sub>1</sub> = 200 g = 0,2 kg na rameni a<sub>1</sub> = 9 cm a m<sub>2</sub> = 100 g = 0,1 kg na rameni a<sub>2</sub> = 18 cm. Je páka v rovnováze?</p>\n<p>F<sub>g1</sub> = m<sub>1</sub> &middot; g = 0,2 &middot; 10 = 2 N</p>\n<p>F<sub>g2</sub> = m<sub>2</sub> &middot; g = 0,1 &middot; 10 = 1 N</p>\n<p>F<sub>g1</sub> &middot; a<sub>1</sub> = 2 &middot; 9 = 18</p>\n<p>F<sub>g2</sub> &middot; a<sub>2</sub> = 1 &middot; 18 = 18</p>\n<p>Obě strany se rovnají (18 = 18), páka je v rovnováze. Dvojnásobná síla si vystačí s polovičním ramenem.</p>\n<p>Na rameni a<sub>1</sub> = 2 m působí síla F<sub>1</sub> = 20 N. Jak velká síla F<sub>2</sub> je potřeba na rameni a<sub>2</sub> = 4 m, aby byla páka v rovnováze?</p>\n<p>F<sub>1</sub> &middot; a<sub>1</sub> = F<sub>2</sub> &middot; a<sub>2</sub></p>\n<p>F<sub>2</sub> = (F<sub>1</sub> &middot; a<sub>1</sub>) : a<sub>2</sub> = (20 &middot; 2) : 4 = 10 N</p>\n<p>Na delší rameno tedy stačí poloviční síla.</p>",
					zapis: {"vzorec":"F₁ · a₁ = F₂ · a₂      (odvozeně: F₁ = F₂ · a₂ : a₁,  F₂ = F₁ · a₁ : a₂,  a₁ = F₂ · a₂ : F₁,  a₂ = F₁ · a₁ : F₂)","jednotky":["síla — značíme F₁ a F₂ (síly na obou stranách páky), jednotka N (newton)","rameno síly — značíme a₁ a a₂ (vzdálenost od osy otáčení), jednotka m (metr)","1 kN = 1 000 N,  1 m = 100 cm","Do vzorce dosazuj síly v N a obě ramena ve stejné jednotce délky, nejlépe v m."],"vzorecSlovy":"síla na jedné straně páky krát její rameno se rovná síle na druhé straně krát jejímu rameni","body":["jednoduchý stroj = menší síla na těžké těleso","páka: osa O, rameno a = vzdálenost síly od osy","čím delší rameno, tím menší síla stačí","dvojzvratná páka: síly na opačných stranách osy (houpačka, váhy)","jednozvratná páka: síly na stejné straně osy (otvírák, kolečko)","rovnováha: F₁ · a₁ = F₂ · a₂"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Páky — nadlidská síla', cesta: 'aXsCK4BXLe4' },
						{ druh: 'youtube', nazev: 'Video: Páka — opakování', cesta: 'qLAoiYEeaSA' },
						{ druh: 'infografika', nazev: 'Tahák: moment síly', cesta: '/materialy/fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky/infografika-moment-sily.jpg' },
						{ druh: 'video', nazev: 'Píseň: Něco za něco 🎵', cesta: '/materialy/fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky/pisen-neco-za-neco.m4a' },
					],
				},
				{
					slug: 'kladka',
					interakce: 'kladka',
					nazev: 'Kladka — pevná a volná',
					obsah: "<h2>Kladka — pevná a volná</h2>\n<p><strong>Kladka</strong> je kolo s drážkou, přes které vedeme lano. Patří mezi <strong>jednoduché stroje</strong> — usnadňuje nám zvedání břemen. Rozlišujeme dva druhy: <strong>pevnou</strong> a <strong>volnou</strong> kladku.</p>\n\n<h3>Pevná kladka</h3>\n<p><strong>Pevná kladka</strong> je připevněná, třeba ke stropu, a sama se neposouvá. <strong>Nemění velikost síly</strong> — táhneme stejnou silou, jako je tíha břemene. Zato <strong>mění směr</strong> tahu.</p>\n<p>Místo zvedání nahoru můžeme lano táhnout dolů. To je pohodlnější — do lana se navíc můžeme opřít vlastní vahou.</p>\n<ul>\n<li>síla na lano = tíha břemene (F = F<sub>G</sub>)</li>\n<li>dráha lana = výška zdvihu</li>\n<li>výhoda: pohodlný <strong>směr</strong> tahu (vlajka na stožáru, studna s okovem)</li>\n</ul>\n\n<h3>Volná kladka</h3>\n<p><strong>Volná kladka</strong> se pohybuje spolu s břemenem — břemeno visí přímo na její ose.</p>\n<p>Břemeno drží <strong>dvě části lana</strong> zároveň, takže se jeho tíha rozdělí <strong>na polovinu</strong> mezi obě části.</p>\n<p>Proto zvedneme břemeno poloviční silou. Zato lano musíme vytáhnout <strong>dvakrát delší</strong> — co ušetříme na síle, doplatíme na dráze.</p>\n<ul>\n<li>síla na lano = polovina tíhy břemene (F = F<sub>G</sub> : 2)</li>\n<li>dráha lana = dvojnásobek výšky zdvihu</li>\n<li>výhoda: menší <strong>síla</strong> (co ušetříme na síle, doplatíme na dráze — to platí u všech strojů)</li>\n</ul>\n<p>🎒 <strong>Jako pytlíky do schodů:</strong> deset kilo vyneseš buď najednou v jednom balíku (velká síla, jedna cesta), nebo desetkrát po jednom kile (malá síla, ale mnohem delší chození). Práce je v obou případech stejná — vždycky je něco za něco.</p>\n\n<h3>Kladkostroj</h3>\n<p>Spojením několika pevných a volných kladek vznikne <strong>kladkostroj</strong>. Používá se u jeřábů, na lodích nebo v dílnách.</p>\n<p>S kladkostrojem zvedneme i velmi těžká břemena malou silou. Platí: kolik částí lana nese břemeno, tolikrát menší silou ho zvedneme.</p>\n\n<h3>Zlaté pravidlo mechaniky</h3>\n<p>U každého jednoduchého stroje platí stejné pravidlo: <strong>kolikrát si usnadníme sílu, tolikrát delší dráhu musíme překonat.</strong> Práci si nikdy neušetříme — jen ji rozložíme pohodlněji.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Břemeno má tíhu 100 N, tedy hmotnost 10 kg. Visí na volné kladce, kterou drží dvě části lana.</p>\n<p>Jednu část lana drží strop silou 50 N. Za druhou taháš ty, také silou 50 N.</p>\n<p>Obě síly se sečtou: 50 N + 50 N = 100 N. Dohromady udrží celé břemeno.</p>\n<p>Zvedneš tak břemeno o tíze 100 N pouhými 50 N — ale lano musíš vytáhnout dvakrát delší, než je výška zdvihu.</p>",
					zapis: {"vzorec":"pevná kladka: F = F_G      volná kladka: F = F_G : 2      (odvozeně: F_G = 2 · F)","jednotky":["síla tahu — značíme F, jednotka N (newton)","tíhová síla — značíme F_G, jednotka N (newton)","Převody: 1 kN = 1 000 N.","Do vztahů dosazuj obě síly v newtonech (N)."],"vzorecSlovy":"síla tahu u pevné kladky = tíhová síla břemene; síla tahu u volné kladky = tíhová síla břemene děleno dvěma","zakon":"Kolikrát si usnadníme sílu, tolikrát delší dráhu musíme překonat (zlaté pravidlo mechaniky).","body":["kladka = kolo s drážkou pro lano","pevná kladka: mění směr, síla stejná","volná kladka: poloviční síla, dvojnásobná dráha","kladkostroj: víc lan nese břemeno → menší síla","zlaté pravidlo: menší síla = delší dráha"]},
					materialy: [
						{
							druh: 'video',
							nazev: 'Polemika: Pevná kladka (1/3)',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/polemika-kladka-pevna.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence. Všechna schémata kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika: Volná kladka (2/3)',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/polemika-kladka-volna.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence. Všechna schémata kreslí program podle fyzikálních vzorců.',
						},
						{
							druh: 'video',
							nazev: 'Polemika: Kladkostroj a zlaté pravidlo (3/3)',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/polemika-kladka-kladkostroj.mp4',
							ai: 'Hlasy Evy a Marka namluvila umělá inteligence. Všechna schémata kreslí program podle fyzikálních vzorců.',
						},
					],
				},
				{
					slug: 'naklonena-rovina',
					interakce: 'naklonena-rovina',
					nazev: 'Nakloněná rovina',
					obsah: "<h2>Nakloněná rovina</h2>\n<p>Nakloněná rovina patří mezi <strong>jednoduché stroje</strong>, stejně jako páka nebo kladka. Je to šikmá plocha — třeba rampa, prkno nebo skluz — po které vytahujeme nebo spouštíme těžké břemeno.</p>\n<p>Místo svislého zvedání táhneme břemeno šikmo nahoru. Stačí nám na to <strong>menší síla</strong>. Musíme ale těleso posunout po <strong>delší dráze</strong>.</p>\n\n<h3>Jak nakloněná rovina šetří sílu</h3>\n<p>Bez tření platí pro potřebnou sílu <strong>F</strong> tento vztah:</p>\n<p><strong>F = G &middot; h : l</strong></p>\n<p><strong>G</strong> je tíha břemene, <strong>h</strong> je výška, do které břemeno zvedáme, a <strong>l</strong> je délka nakloněné roviny. Čím je rovina delší, tím je mírnější a tím menší síla stačí.</p>\n<p>Ve skutečnosti sílu trochu zvětšuje i <strong>tření</strong> mezi břemenem a rovinou. Pro jednoduchost počítáme v ideálním případě bez tření.</p>\n\n<h3>Cena za menší sílu: delší dráha</h3>\n<p>Nakloněná rovina nám práci neušetří, jen ji rozloží pohodlněji. Platí <strong>zlaté pravidlo mechaniky</strong>: kolikrát si usnadníme sílu, tolikrát delší dráhu musíme urazit.</p>\n<p>Vytažení břemene po šikmé rampě trvá déle a je to dál. Zvládne to ale i slabší síla.</p>\n\n<h3>Nakloněná rovina kolem nás</h3>\n<p>S nakloněnou rovinou se setkáváme na každém kroku. Patří sem <strong>nájezdová rampa</strong> pro vozíčkáře nebo na nakládání beden do auta a <strong>silniční serpentiny</strong> v horách — klikaté zatáčky prodlužují dráhu, aby auto nemuselo do prudkého kopce.</p>\n<p>Dalším příkladem je dětská <strong>skluzavka</strong>. Zajímavý je i <strong>šroub</strong> — jeho závit je vlastně nakloněná rovina navinutá kolem válce.</p>\n<p>Proto se šroub zašroubuje malou silou na šroubováku, i když jím musíme mnohokrát otočit. Zatlouct hřebík rovnou by vyžadovalo mnohem větší sílu.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Břemeno o tíze G = 600 N táhneme po nakloněné rovině dlouhé l = 3 m na výšku h = 1 m. Jak velká síla F je potřeba, bez tření?</p>\n<p>F = G &middot; h : l = 600 &middot; 1 : 3 = 200 N</p>\n<p>Stačí nám síla 200 N — třikrát menší, než kdybychom břemeno zvedali svisle (600 N). Dráha je totiž třikrát delší než výška.</p>\n<p>Břemeno o tíze G = 800 N chceme vytáhnout do výšky h = 2 m silou F = 200 N. Jak dlouhá musí být nakloněná rovina?</p>\n<p>F = G &middot; h : l &nbsp;&rArr;&nbsp; l = G &middot; h : F</p>\n<p>l = 800 &middot; 2 : 200 = 8 m</p>\n<p>Nakloněná rovina musí být dlouhá 8 metrů — čtyřikrát delší než výška. Sílu jsme totiž zmenšili čtyřikrát, z 800 N na 200 N.</p>",
					zapis: {"vzorec":"F = G · h : l      (odvozeně: l = G · h : F,  h = F · l : G,  G = F · l : h)","jednotky":["síla — značíme F, jednotka N (newton)","tíha břemene — značíme G, jednotka N (newton)","výška — značíme h, jednotka m (metr)","délka nakloněné roviny — značíme l, jednotka m (metr)","1 kN = 1 000 N,  1 m = 100 cm","Do vzorce dosazuj síly v N a délky v m."],"vzorecSlovy":"síla = tíha krát výška děleno délka","zakon":"Zlaté pravidlo mechaniky: kolikrát si usnadníme sílu, tolikrát delší dráhu musíme urazit.","body":["nakloněná rovina — jednoduchý stroj, zvedá nebo spouští břemeno","delší a mírnější rovina → menší síla, delší dráha","práci neušetří, jen ji rozloží na menší sílu a delší dráhu","tření sílu zvětšuje, počítáme bez tření"]},
				},
			],
		},
		{
			slug: 'tlak-v-kapalinach',
			nazev: 'Tlak v kapalinách',
			podtemata: [
				{
					slug: 'tlak',
					nazev: 'Tlak',
					interakce: 'tlak',
					obsah: "<h2>Tlak</h2>\n<p>Když se dvě tělesa dotknou, tlačí na sebe. Síla, která přitom působí kolmo na plochu, se nazývá <strong>tlaková síla</strong>. Značíme ji F, stejně jako každou jinou sílu.</p>\n<p>Tlaková síla umí těleso <strong>deformovat</strong> — tedy změnit jeho tvar. Kvádr položený naplocho udělá v měkké podložce jen mělký důlek. Postavený na užší hranu se zaboří mnohem hlouběji, i když má stejnou váhu.</p>\n<p><strong>Tlak</strong> je fyzikální veličina, která říká, jak moc je tlaková síla soustředěná (zkoncentrovaná) na malém místě. Značíme ho p a počítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>p = F : S</strong></p>\n<p>Tlak spočítáme tak, že tlakovou sílu F vydělíme obsahem plochy S, na kterou síla působí.</p>\n\n<h3>Jednotka tlaku</h3>\n<p>Tlak měříme v <strong>pascalech</strong>, značka Pa. Tlak 1 Pa vyvolá síla 1 N, která působí kolmo na plochu 1 m². Představ si 100 gramů nastrouhané čokolády rozsypané rovnoměrně na ploše 1 × 1 metr — to je tlak právě 1 pascal.</p>\n<p>Pascal je docela malá jednotka, proto se často používají jeho násobky:</p>\n<ul>\n<li>1 kilopascal (kPa) = 1 000 Pa</li>\n<li>1 megapascal (MPa) = 1 000 000 Pa</li>\n<li>1 hektopascal (hPa) = 100 Pa — používá se v meteorologii (nauce o počasí)</li>\n</ul>\n\n<h3>Na čem tlak závisí</h3>\n<p>Tlak je tím větší, čím větší síla na plochu působí. Naopak je tím menší, čím větší je plocha, na kterou síla působí.</p>\n<p>Proto bolí došlápnutí jehlovým podpatkem víc než teniskou. Obě boty mohou nést stejnou váhu, ale podpatek má mnohem menší plochu.</p>\n\n<h3>Jak tlak zvětšit</h3>\n<p>Tlak zvětšíme tak, že soustředíme sílu na co nejmenší plochu. Proto se nože a sekery brousí do ostří a jehly se přiostřují do špičky.</p>\n<p>Stejně fungují šicí a injekční jehla nebo vosí žihadlo — mají velmi malou plochu, aby snadno propíchly to, na co zatlačí.</p>\n\n<h3>Jak tlak zmenšit</h3>\n<p>Tlak zmenšíme opačně — rozložíme sílu na co největší plochu. Proto mají sněžnice a lyže široké plochy, aby se člověk nebořil do sněhu. Ze stejného důvodu se na tenkém ledu radši plazíme, nestojíme na něm.</p>\n<p>Stejně fungují pásy bagrů a tanků, široké pneumatiky traktorů i více kol u nákladních aut — rozkládají váhu stroje na velkou plochu. I základy velkých budov se stavějí co nejširší, aby stavba nezatlačila do země.</p>\n\n<h3>Tlak je všude kolem nás</h3>\n<p>S tlakem se setkáváme v přírodě i v technice. Velbloud má široká chodidla, aby se nebořil do písku pouště. Ptáci mají naopak úzké a ostré zobáky a drápy, kterými snadno uchopí kořist.</p>\n<p>V technice tlak využívají hydraulické brzdy, lisy i ostré nářadí. Tlak provází úplně všechno — od krájení chleba nožem až po stavbu mrakodrapů.</p>\n\n<h3>Další vzorce</h3>\n<p>Ze vzorce pro tlak umíme odvodit i sílu a plochu:</p>\n<ul>\n<li>tlaková síla: <strong>F = p · S</strong></li>\n<li>plocha: <strong>S = F : p</strong></li>\n</ul>\n<p>Plochu S musíme do vzorců vždy dosazovat v základních jednotkách, tedy v metrech čtverečních (m²). Převody: 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm².</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Píst stroje má obsah S = 100 cm². Převedeme na základní jednotku: S = 100 cm² = 0,01 m². Na pístu má vzniknout tlak p = 200 Pa. Jak velká síla je potřeba?</p>\n<p>F = p · S = 200 · 0,01 = 2 N</p>\n<p>Na desku působí síla F = 300 N a vzniká tlak p = 30 000 Pa. Jak velký je obsah plochy S, na kterou síla působí?</p>\n<p>S = F : p = 300 : 30 000 = 0,01 m²</p>\n<p>Převedeme výsledek na cm²: 0,01 m² = 100 cm².</p>",
					zapis: {"vzorec":"p = F : S      (odvozeně: F = p · S,  S = F : p)","jednotky":["tlak — značíme p, jednotka Pa (pascal)","tlaková síla — značíme F, jednotka N (newton)","plocha — značíme S, jednotka m² (metr čtvereční)","Převody: 1 hPa = 100 Pa,  1 kPa = 1 000 Pa,  1 MPa = 1 000 000 Pa.","Převody plochy: 1 m² = 100 dm²,  1 dm² = 100 cm²,  1 cm² = 100 mm².","Do vzorce dosazuj sílu v N a plochu v m² — tlak pak vyjde v Pa."],"vzorecSlovy":"tlak = síla děleno plocha","body":["tlaková síla F — kolmo na plochu, může deformovat těleso","p = F : S, jednotka Pa (pascal)","větší síla → větší tlak; větší plocha → menší tlak","zvětšit tlak: menší plocha (nůž, jehla, žihadlo)","zmenšit tlak: větší plocha (lyže, sněžnice, pásy, pneumatiky)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Porozumění tlaku', cesta: 'Pzxvvf0fbTg' },
						{
							druh: 'infografika',
							nazev: 'Co je to tlak a jak funguje?',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/tlak/infografika-co-je-to-tlak.jpg',
						},
						{
							druh: 'pdf',
							nazev: 'Tlak: skrytá síla (infografiky v PDF)',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/tlak/tlak-skryta-sila.pdf',
						},
						{
							druh: 'video',
							nazev: 'Píseň: Dneska jedeme tlak 🎵',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/tlak/pisen-dneska-jedeme-tlak.mp4',
						},
					],
				},
				{
					slug: 'pascaluv-zakon',
					nazev: 'Pascalův zákon',
					interakce: 'hydraulika',
					obsah: "<h2>Pascalův zákon</h2>\n\n<p><strong>Když na kapalinu v uzavřené nádobě zatlačíme, tlak se rozšíří do všech směrů stejně.</strong> Ukážeme si to na uzavřené baňce plné vody s malými otvory po celém povrchu. Do baňky vede píst — pohyblivá deska, kterou tlačíme přímo do kapaliny.</p>\n<p>Když píst zatlačíme, voda nevystřikuje jen dopředu, ale ze všech otvorů najednou a stejně silně. Tlak se totiž v kapalině přenesl rovnoměrně na všechna místa.</p>\n<p>Funguje to proto, že kapaliny jsou téměř nestlačitelné. Jejich částice jsou u sebe tak blízko, že se do menšího prostoru už nevejdou.</p>\n\n<h3>Pascalův zákon (přesné znění)</h3>\n<p><strong>Tlak vyvolaný vnější silou působící na kapalinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů.</strong> Tlak se tedy zvětší ve všech místech kapaliny stejně.</p>\n\n<h3>Hydraulické zařízení: dva písty</h3>\n<p>Tento zákon využívají <strong>hydraulická zařízení</strong> — pomocí kapaliny (obvykle oleje) v nich znásobíme sílu. Mají dvě propojené nádoby s písty: malý píst má obsah S<sub>1</sub>, velký píst má obsah S<sub>2</sub>.</p>\n<p>Na malý píst zatlačíme silou F<sub>1</sub>. Tlak p se v kapalině přenese beze změny na velký píst, kde vyvolá mnohem větší sílu F<sub>2</sub>.</p>\n<ul>\n<li><strong>p = F<sub>1</sub> : S<sub>1</sub> = F<sub>2</sub> : S<sub>2</sub></strong></li>\n<li>výsledná síla: <strong>F<sub>2</sub> = F<sub>1</sub> · (S<sub>2</sub> : S<sub>1</sub>)</strong></li>\n</ul>\n<p>👉 <strong>Zlaté pravidlo hydrauliky:</strong> Kolikrát je druhý píst větší než první, přesně tolikrát větší síla na něj působí. Plocha 100× větší = síla 100× větší.</p>\n\n<h3>Kde hydrauliku využijeme</h3>\n<p>Hydraulika pracuje v autodílnách jako <strong>zvedák</strong>, který malou silou nadzvedne celé auto. V autě pomáhá i <strong>brzdám</strong> — přenáší sílu z pedálu na kola.</p>\n<p>V průmyslu se používá jako <strong>lis</strong>, který velkou silou stlačuje materiál, a v <strong>bagrech a jeřábech</strong>, které zvedají těžká břemena.</p>\n<p>Najdeme ji i v zubařském a lékařském křesle, kde nastavuje pohodlnou výšku, nebo ve výtahu, který nevisí na laně.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Vzorec pro hydraulické zařízení je p = F<sub>1</sub> : S<sub>1</sub> = F<sub>2</sub> : S<sub>2</sub>, odvozeně F<sub>2</sub> = F<sub>1</sub> · (S<sub>2</sub> : S<sub>1</sub>). Do vzorce dosazuj obě plochy ve stejné jednotce.</p>\n<p><strong>Příklad z hodiny:</strong> Na malý píst o obsahu S<sub>1</sub> = 3 m² působí síla F<sub>1</sub> = 24 N. Tlak v kapalině je p = F<sub>1</sub> : S<sub>1</sub> = 24 : 3 = 8 Pa.</p>\n<p>Velký píst má obsah S<sub>2</sub> = 12 m². Tlak je v celé kapalině stejný, takže síla na něj je F<sub>2</sub> = p · S<sub>2</sub> = 8 · 12 = 96 N.</p>\n<p><strong>Příklad: zubařské křeslo.</strong> Zubař tlačí na malý píst (S<sub>1</sub> = 5 cm²) silou F<sub>1</sub> = 20 N. Velký píst má S<sub>2</sub> = 400 cm².</p>\n<p>Velký píst je S<sub>2</sub> : S<sub>1</sub> = 400 : 5 = 80krát větší než malý. Síla na něj je proto F<sub>2</sub> = 80 · 20 = 1 600 N.</p>\n<p>Ta síla uzvedne hmotnost m = F<sub>2</sub> : g = 1 600 : 10 = 160 kg. Křeslo váží 30 kg, takže pacient může vážit až 160 − 30 = 130 kg.</p>\n<p><strong>Hodí se vědět:</strong> Obsah kruhového pístu o poloměru r spočítáme jako S = π · r² (π ≈ 3,14).</p>",
					zapis: {"vzorec":"p = F₁ : S₁ = F₂ : S₂      (odvozeně: F₂ = F₁ · (S₂ : S₁))","jednotky":["tlak — značíme p, jednotka Pa (pascal)","síla na píst — značíme F₁, F₂, jednotka N (newton)","obsah pístu — značíme S₁, S₂, jednotka m² (metr čtvereční)","Převody: 1 kPa = 1 000 Pa, 1 MPa = 1 000 000 Pa.","Do vzorce dosazuj síly v N a obsahy obou pístů ve stejné jednotce plochy."],"vzorecSlovy":"síla na píst dělená obsahem pístu (tlak) je v celém hydraulickém zařízení stejná","zakon":"Tlak vyvolaný vnější silou působící na kapalinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů.","body":["tlak v uzavřené kapalině: všude stejný","kapaliny nestlačitelné → tlak dobře přenášejí","hydraulika: dva písty, stejný tlak","větší plocha pístu → větší síla","využití: zvedák, brzdy, lis, křesla, výtah"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Pascalův zákon — síla kapalin', cesta: 'pTdNlwI_0aY' },
						{ druh: 'youtube', nazev: 'Video: Pascalův zákon 2', cesta: '1WUlh2HBpwA' },
						{
							druh: 'infografika',
							nazev: 'Síla kapaliny: Pascalův zákon a hydraulická zařízení',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/pascaluv-zakon/infografika-pascaluv-zakon.jpg',
						},
						{
							druh: 'pdf',
							nazev: 'Síla kapalin: Pascalův zákon a hydraulika (infografiky v PDF)',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/pascaluv-zakon/sila-kapalin-pascaluv-zakon.pdf',
						},
						{
							druh: 'video',
							nazev: 'Píseň: Pascalův zákon 🎵',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/pascaluv-zakon/pisen-pascaluv-zakon.mp4',
						},
					],
				},
				{
					slug: 'hydrostaticky-tlak',
					nazev: 'Hydrostatický tlak',
					interakce: 'hydrostatika',
					obsah: "<h2>Hydrostatický tlak</h2>\n<p>Slovo <strong>hydrostatický</strong> znamená „vztahující se ke kapalině v klidu\". Kapalina má svou hmotnost, a proto na ni působí gravitační síla Země. Tato síla tlačí kapalinu dolů, a kapalina tím tlačí na dno i na stěny nádoby.</p>\n<p>Stejně tlačí i na všechno, co je v ní ponořené — na potápěče, na rybu i na ponorku. Tomuto tlaku kapaliny říkáme <strong>hydrostatický tlak</strong>.</p>\n\n<h3>Čím hlouběji, tím větší tlak</h3>\n<p>Čím hlouběji pod hladinou jsme, tím víc vody je nad námi. Víc vody znamená víc tíhy, a tím i větší tlak. Proto potápěč cítí v hloubce mnohem větší tlak než těsně pod hladinou.</p>\n\n<h3>Záleží i na hustotě kapaliny</h3>\n<p>Hustota říká, kolik hmoty se vejde do stejného objemu — jak moc je látka „namačkaná\". Čím hustší kapalina, tím větší tlak ve stejné hloubce. Proto je ve slané mořské vodě tlak o něco větší než ve sladké vodě.</p>\n\n<h3>Tvar nádoby nehraje roli</h3>\n<p>Hydrostatický tlak u dna nezávisí na tvaru nádoby ani na tom, kolik vody je uvnitř. Rozhoduje jen hloubka a hustota kapaliny. Mají-li dvě nádoby stejně velké dno a stejně vysokou hladinu, tlačí voda na dno stejnou silou. Platí to, i když je jedna nádoba úzká a druhá široká.</p>\n\n<h3>Vzorec</h3>\n<p>Hydrostatický tlak spočítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>p<sub>h</sub> = h · ρ · g</strong></p>\n<p>h je hloubka pod hladinou v metrech, ρ (čti „ró\") je hustota kapaliny v kilogramech na metr krychlový a g je gravitační konstanta s hodnotou 10 N/kg. Voda má hustotu 1 000 kg/m³.</p>\n\n<h3>Spojené nádoby</h3>\n<p>Hladina kapaliny je ve všech částech spojených nádob vodorovná a ve stejné výšce, ať mají jakýkoli tvar.</p>\n\n<h3>Kde se hydrostatický tlak využívá</h3>\n<ul>\n<li><strong>hráz přehrady</strong> — u dna je mnohem širší, protože tam tlak vody roste s hloubkou</li>\n<li><strong>vodojem</strong> — stojí výš než okolní domy, aby tlak vody dohnal vodu až do kohoutku</li>\n<li><strong>hadicová vodováha</strong> — spojené nádoby ukazují stejnou výšku na obou koncích</li>\n<li><strong>sifon u umyvadla a WC</strong> — vodní zátka brání, aby z odpadu unikal zápach</li>\n<li><strong>plavební komora (zdymadlo)</strong> — pomáhá lodím překonat výškový rozdíl mezi dvěma úseky řeky</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>V hloubce 10 m pod vodou je hydrostatický tlak: p<sub>h</sub> = h · ρ · g = 10 · 1 000 · 10 = <strong>100 000 Pa</strong>.</p>\n<p>Sílu, kterou kapalina tlačí na plochu S (obsah plochy v m²), spočítáme jako F = S · h · ρ · g. Starý most o rozměrech 6 × 8 m ležel v hloubce 5 m pod hladinou přehrady. Voda na něj tlačila silou F = 48 · 5 · 1 000 · 10 = <strong>2 400 000 N</strong> (2 400 kN).</p>\n<p>Vzorec jde použít i obráceně. Na hráz přehrady působí u dna tlak 600 kPa = 600 000 Pa. Jak je přehrada hluboká? h = p<sub>h</sub> : (ρ · g) = 600 000 : (1 000 · 10) = <strong>60 m</strong>.</p>",
					zapis: {"vzorec":"pₕ = h · ρ · g      (odvozeně: h = pₕ : (ρ · g),  ρ = pₕ : (h · g))","jednotky":["hloubka — značíme h, jednotka m (metr)","hustota kapaliny — značíme ρ, jednotka kg/m³ (kilogram na metr krychlový)","gravitační konstanta — značíme g, jednotka N/kg (newton na kilogram)","hydrostatický tlak — značíme pₕ, jednotka Pa (pascal)","Do vzorce dosazuj hloubku v metrech, hustotu v kg/m³ a gravitační konstantu v N/kg. Hustota vody je 1 000 kg/m³.","Převody: 1 kPa = 1 000 Pa, 1 MPa = 1 000 000 Pa."],"vzorecSlovy":"hydrostatický tlak = hloubka krát hustota kapaliny krát gravitační konstanta","body":["pₕ = h · ρ · g","vzniká tíhou kapaliny (gravitace)","hlouběji → větší tlak","hustší kapalina → větší tlak","tvar nádoby na tlak nemá vliv","spojené nádoby: hladina stejně vysoko všude","hráz u dna širší, vodojem výš než domy"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Skrytá síla vody', cesta: 'xJMpwGyOibQ' },
						{ druh: 'youtube', nazev: 'Video: Hydrostatický tlak', cesta: 'Tx5X_3g1sHE' },
						{
							druh: 'pdf',
							nazev: 'Hydrostatický tlak: od rovnic k přehradám (infografiky v PDF)',
							cesta: '/materialy/fyzika/7-rocnik/tlak-v-kapalinach/hydrostaticky-tlak/hydrostaticky-tlak-od-rovnic-k-prehradam.pdf',
						},
					],
				},
			],
		},
		{
			slug: 'vztlakova-sila-a-plovani-teles',
			nazev: 'Vztlaková síla a plování těles',
			podtemata: [
				{
					slug: 'archimeduv-zakon',
					interakce: 'archimedes',
					nazev: 'Archimédův zákon',
					obsah: "<h2>Vztlaková síla a Archimédův zákon</h2>\n<p>Ponoř ruku do umyvadla plného vody. Ucítíš, že ji voda jakoby nadlehčuje. Na každé těleso ponořené v kapalině totiž působí svisle vzhůru <strong>vztlaková síla F<sub>vz</sub></strong>. Proto se nám věci pod vodou zdají lehčí.</p>\n\n<h3>Proč vztlaková síla vzniká</h3>\n<p>Kapalina tlačí na ponořené těleso ze všech stran. Tlaky ze stran, zleva i zprava, jsou v téže hloubce stejně velké, a proto se navzájem vyruší.</p>\n<p>Spodní stěna tělesa je ale hlouběji pod hladinou než horní stěna, a čím hlouběji, tím větší je hydrostatický tlak kapaliny. Kapalina proto tlačí na spodek tělesa víc než na jeho vršek. Rozdíl těchto dvou sil tvoří výslednou sílu mířící nahoru — to je vztlaková síla.</p>\n\n<h3>Archimédův zákon</h3>\n<p>Vztlaková síla je tím větší, čím větší je objem ponořené části tělesa a čím větší je hustota kapaliny. Přesně to popsal už ve starověkém Řecku učenec <strong>Archimédés</strong> (287–212 př. n. l.):</p>\n<p><strong>Těleso ponořené do kapaliny je nadlehčováno vztlakovou silou, jejíž velikost se rovná tíze kapaliny stejného objemu, jako je objem ponořené části tělesa.</strong></p>\n<ul>\n<li>vzorec: <strong>F<sub>vz</sub> = V · ρ · g</strong></li>\n<li>V … objem ponořené části tělesa (m³)</li>\n<li>ρ … hustota kapaliny (kg/m³)</li>\n<li>g … gravitační konstanta (10 N/kg)</li>\n</ul>\n\n<h3>Příklad z hodiny (měřeno pěti způsoby)</h3>\n<p>Těleso „vážilo\" na závěsné váze na vzduchu <strong>500 g</strong>, ve vodě jen <strong>400 g</strong>. Rozdíl m = 100 g = 0,1 kg → vztlaková síla F<sub>vz</sub> = 0,1 · 10 = <strong>1 N</strong>.</p>\n<p>Dalšími metodami vyšlo 1,1 N, 0,9 N, 1,1 N a 0,9 N. Jejich průměr je zase <strong>1 N</strong> (součet 5 N děleno 5 měřeními). Měření není nikdy úplně přesné (bublinky, vlnky, zaokrouhlování), ale průměr se pravdě přiblíží.</p>\n\n<h3>Potápění, vznášení, plování</h3>\n<p>Porovnáváme vztlakovou sílu s tíhovou silou tělesa (nebo hustotu tělesa s hustotou kapaliny):</p>\n<ul>\n<li><strong>potápí se</strong> — F<sub>g</sub> &gt; F<sub>vz</sub> (hustota tělesa větší než kapaliny; kámen)</li>\n<li><strong>vznáší se</strong> — F<sub>g</sub> = F<sub>vz</sub> (stejné hustoty; ryba v akváriu)</li>\n<li><strong>plove</strong> — F<sub>g</sub> &lt; F<sub>vz</sub> (menší hustota; korek, led, loď)</li>\n</ul>\n<p>U plovoucího tělesa platí zajímavá věc: poměr, jak velká část je pod hladinou, odpovídá poměru hustot. Led má hustotu asi 916 kg/m³, voda 1 000 kg/m³. Proto je pod hladinou asi 9/10 objemu ledovce a nad hladinou vidíme jen necelou 1/10.</p>\n<p>Právě proto byl pro lodě tak nebezpečný ledovec, který potopil Titanic — nad hladinou byla vidět jen malá špička. Korek má hustotu jen asi 200 kg/m³, tedy pětinu hustoty vody. Nad hladinou proto vyčnívá zbylá část korkové zátky, asi 4/5 jejího objemu.</p>\n\n<h3>Kde to potkáš</h3>\n<ul>\n<li><strong>ocelová loď</strong> — ocel je hustší než voda, ale trup je dutý. Průměrná hustota lodi (ocel + vzduch uvnitř) je menší než hustota vody, a tak plove</li>\n<li><strong>ponorka</strong> — napouštěním a vypouštěním vody do nádrží mění svou průměrnou hustotu, a proto se potopí nebo vynoří</li>\n<li><strong>ryba</strong> — mění objem svého těla plynovým měchýřem, který svaly nafukují nebo stahují, a tím mění svou průměrnou hustotu</li>\n<li><strong>potápěč</strong> — používá vestu s vyrovnávacím vzduchem; při stoupání do ní přidá vzduch z lahve, při klesání ho zase vypustí</li>\n<li><strong>slaná voda</strong> — má větší hustotu než sladká, takže nadlehčuje víc (v Mrtvém moři se člověk neponoří)</li>\n<li><strong>vzduch nadnáší také</strong> — horkovzdušný balon i balonek s heliem stoupají, protože jsou řidší než okolní vzduch</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Kvádr má pod hladinou vody ponořený objem 2 m³, hustota vody je 1 000 kg/m³. Vztlaková síla na něj je:</p>\n<p>F<sub>vz</sub> = V · ρ · g = 2 · 1 000 · 10 = <strong>20 000 N</strong>.</p>\n<p>Vzorec jde použít i obráceně. Na jiné těleso ponořené ve vodě působí vztlaková síla 30 000 N. Jak velký je objem jeho ponořené části?</p>\n<p>V = F<sub>vz</sub> : (ρ · g) = 30 000 : (1 000 · 10) = <strong>3 m³</strong>.</p>\n<p>Třetí těleso má ponořenou část o objemu 3 m³ a působí na něj vztlaková síla 45 000 N. Jakou hustotu má kapalina, ve které je ponořené?</p>\n<p>ρ = F<sub>vz</sub> : (V · g) = 45 000 : (3 · 10) = <strong>1 500 kg/m³</strong>.</p>",
					zapis: {"vzorec":"Fvz = V · ρ · g      (odvozeně: V = Fvz : (ρ · g),  ρ = Fvz : (V · g))","jednotky":["vztlaková síla — značíme Fvz, jednotka N (newton)","objem ponořené části tělesa — značíme V, jednotka m³ (metr krychlový)","hustota kapaliny — značíme ρ, jednotka kg/m³ (kilogram na metr krychlový)","gravitační konstanta — značíme g, jednotka N/kg (newton na kilogram), pro výpočty g = 10 N/kg","Do vzorce dosazuj objem v m³, hustotu v kg/m³ a gravitační konstantu v N/kg; výsledek vyjde v N."],"vzorecSlovy":"vztlaková síla = objem ponořené části tělesa krát hustota kapaliny krát gravitační konstanta","zakon":"Těleso ponořené do kapaliny je nadlehčováno vztlakovou silou, jejíž velikost se rovná tíze kapaliny stejného objemu, jako je objem ponořené části tělesa.","body":["vztlaková síla působí svisle vzhůru","Fvz = V · ρ · g","vzniká: tlak zdola > tlak shora","roste s objemem ponoru a hustotou kapaliny","potápí se: Fg > Fvz","vznáší se: Fg = Fvz","plove: Fg < Fvz","slaná voda hustší → větší vztlak"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Archimédes 🎵', cesta: '/materialy/fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/archimeduv-zakon/pisen-archimedes.mp4' },
					],
				},
				{
					slug: 'telesa-stejnoroda-a-nestejnoroda',
					nazev: 'Tělesa stejnorodá a nestejnorodá',
					interakce: 'nestejnoroda-lod',
					obsah: "<h2>Tělesa stejnorodá a nestejnorodá</h2>\n<h3>Stejnorodá tělesa</h3>\n<p>Stejnorodé těleso je vyrobené z <strong>jedné jediné látky</strong>. V celém svém objemu má stejné vlastnosti — stejnou hustotu, barvu i tvrdost. Příkladem je ocelový hřebík nebo skleněná kulička.</p>\n<h3>Nestejnorodá tělesa</h3>\n<p>Nestejnorodé těleso se skládá ze <strong>dvou nebo více různých látek</strong>. V různých částech má odlišné vlastnosti. Příkladem je tužka (dřevo a tuha), žula (křemen, živec a slída) nebo železobetonový panel (beton a ocelová výztuž).</p>\n<p>U nestejnorodého tělesa nemá smysl mluvit o jedné hustotě látky. Místo toho počítáme jeho <strong>průměrnou hustotu ρ<sub>p</sub></strong> — z hmotnosti a objemu CELÉHO tělesa, i s dutinami a různými částmi.</p>\n<h3>Pokus s plastelínou</h3>\n<p>Když uděláš z kousku plastelíny kuličku a hodíš ji do vody, klesne ke dnu — plastelína je hustší než voda.</p>\n<p>Ze stejného kousku plastelíny teď vytvaruj malou lodičku s dutinou uvnitř. Hmotnost plastelíny se nezměnila, ale objem lodičky je mnohem větší, protože obsahuje i vzduch. Průměrná hustota lodičky klesla pod hustotu vody, a proto plove.</p>\n<h3>Proč plove ocelová loď</h3>\n<p>Voda má hustotu 1 000 kg/m³, ocel asi 8 000 kg/m³. Kus plné oceli je tedy osmkrát hustší než voda, a proto se ve vodě potopí. Trup lodi je ale dutý a uvnitř je vzduch, jehož hustota je jen asi 1 kg/m³.</p>\n<p>Průměrnou hustotu lodi počítáme z hmotnosti a objemu oceli i vzduchu dohromady. I malá dutina s lehkým vzduchem průměrnou hustotu hodně sníží. Když klesne průměrná hustota lodi pod 1 000 kg/m³, loď na vodě plove — přestože je celá z těžké oceli.</p>\n<h3>Proč se ponorka potápí, vynořuje a vznáší</h3>\n<p>Ponorka má ve svém trupu <strong>vyrovnávací (balastní) nádrže</strong>. Když do nich napustí vodu, její hmotnost se zvětší a průměrná hustota vzroste nad hustotu vody — ponorka klesá ke dnu.</p>\n<p>Když vodu z nádrží vypustí a nahradí ji vzduchem, hmotnost klesne a ponorka zase stoupá k hladině. Objem ponorky se přitom nemění, mění se jen její hmotnost.</p>\n<p>Když nádrže naplní vodou i vzduchem ve správném poměru, hmotnost ponorky se vyrovná hmotnosti vody, kterou vytlačí. Vztlaková síla a tíhová síla jsou pak stejně velké — ponorka se vznáší uprostřed vodního sloupce a neklesá ani nestoupá.</p>\n<h3>Proč potápěče nadnáší vesta</h3>\n<p>Potápěč má na sobě vestu, které se říká <strong>kompenzátor vztlaku</strong>. Když chce stoupat, napustí do vesty vzduch z lahve. Objem vesty se zvětší, ale hmotnost potápěče skoro ne — jeho průměrná hustota klesne pod hustotu vody.</p>\n<p>Když chce klesat, vzduch z vesty zase vypustí. Průměrná hustota lidského těla je přibližně stejná jako hustota vody, proto potápěč navíc potřebuje závaží, aby se mohl potopit do hloubky.</p>\n<h3>Pro zvídavé: počítáme</h3>\n<p>Průměrnou hustotu počítáme stejně jako hustotu jedné látky — z hmotnosti a objemu CELÉHO tělesa:</p>\n<p>ρ<sub>p</sub> = m : V</p>\n<p>Duté ocelové těleso má hmotnost 4 000 kg a objem 5 m³ (ocel i vzduch uvnitř dohromady). Jeho průměrná hustota je ρ<sub>p</sub> = m : V = 4 000 : 5 = 800 kg/m³. Protože 800 kg/m³ je méně než hustota vody 1 000 kg/m³, těleso na vodě plove.</p>\n<p>Jiné duté ocelové těleso má hmotnost 6 000 kg a stejný objem 5 m³. Jeho průměrná hustota je ρ<sub>p</sub> = 6 000 : 5 = 1 200 kg/m³. To je víc než hustota vody, takže toto těleso se potápí.</p>",
					zapis: {"vzorec":"ρp = m : V      (odvozeně: m = ρp · V,  V = m : ρp)","jednotky":["průměrná hustota — značíme ρp, jednotka kg/m³ (kilogram na metr krychlový)","hmotnost celého tělesa — značíme m, jednotka kg (kilogram)","objem celého tělesa — značíme V, jednotka m³ (metr krychlový)","Do vzorce dosazuj hmotnost a objem CELÉHO tělesa (i s dutinami a všemi látkami dohromady)."],"vzorecSlovy":"průměrná hustota = hmotnost celého tělesa děleno objem celého tělesa","body":["stejnorodé: jedna látka, stejné vlastnosti","příklady: hřebík, skleněná kulička","nestejnorodé: víc látek, různé vlastnosti","příklady: tužka, žula, železobeton","nestejnorodé → počítáme průměrnou hustotu","ρp = m : V (z celého tělesa)","plastelína: kulička klesne, lodička plove","ocelová loď: vzduch v dutině sníží hustotu","ponorka klesá: nádrže naplněné vodou","ponorka stoupá: nádrže naplněné vzduchem","ponorka se vznáší: voda a vzduch v poměru","vesta potápěče: vzduch z lahve mění hustotu"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Ocelový paradox — tajemství vztlaku', cesta: 'XvJnyVH_WMk' },
					],
				},
			],
		},
		{
			slug: 'atmosfera-a-tlak-vzduchu',
			nazev: 'Atmosféra a tlak vzduchu',
			podtemata: [
				{
					slug: 'atmosfericky-tlak',
					nazev: 'Atmosférický tlak',
					interakce: 'barometr',
					obsah: "\n\t\t\t\t\t\t<h2>Atmosférický tlak</h2>\n\t\t\t\t\t\t<p><strong>Atmosféra</strong> je plynný obal Země tvořený vzduchem: přibližně <strong>78 % dusíku, 21 % kyslíku</strong> a 1 % dalších plynů.</p>\n\t\t\t\t\t\t<p>Na částice vzduchu působí gravitační síla Země — horní vrstvy tlačí na spodní, a tak vzniká <strong>atmosférický tlak</strong>. Na jeho velikost má vliv i teplota vzduchu, množství vodní páry v ovzduší, nadmořská výška a zeměpisná šířka místa.</p>\n\n\t\t\t\t\t\t<h3>Vlastnosti</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>značka <strong>pa</strong>, jednotka pascal (Pa); v meteorologii <strong>hPa</strong> (1 hPa = 100 Pa)</li>\n\t\t\t\t\t\t<li>největší je u povrchu Země, <strong>s výškou klesá</strong> (ve velehorách je „řídký vzduch\")</li>\n\t\t\t\t\t\t<li>hustota vzduchu u povrchu je přibližně 1,23 kg/m³ a s výškou také klesá</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Normální tlak</h3>\n\t\t\t\t\t\t<p>Dohodnutá hodnota <strong>101 325 Pa ≈ 1 013 hPa</strong> — průměrný tlak u hladiny moře; odpovídá 760 mm rtuťového sloupce (mmHg).</p>\n\n\t\t\t\t\t\t<h3>Torricelliho pokus (1643)</h3>\n\t\t\t\t\t\t<p>Evangelista Torricelli naplnil trubici rtutí a obrátil ji do misky — rtuť klesla na výšku asi 760 mm. Sloupec drží právě atmosférický tlak. Kdyby použil vodu místo rtuti, musela by být trubice vysoká skoro 10 metrů.</p>\n\t\t\t\t\t\t<p>Na tomto principu funguje <strong>rtuťový barometr</strong>; kovový barometr se jmenuje <strong>aneroid</strong> a zapisovací <strong>barograf</strong>.</p>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Velikost tlaku šla z Torricelliho pokusu spočítat vzorcem pro hydrostatický tlak: p<sub>h</sub> = h · ρ · g.</p>\n\t\t\t\t\t\t<p>Rtuť má hustotu ρ = 13 500 kg/m³ a sloupec byl vysoký h = 0,76 m. Gravitační konstanta je g = 10 N/kg.</p>\n\t\t\t\t\t\t<p>p<sub>h</sub> = h · ρ · g = 0,76 · 13 500 · 10 = <strong>102 600 Pa</strong></p>\n\t\t\t\t\t\t<p>To je skoro stejná hodnota jako normální atmosférický tlak 101 325 Pa. Pokus tak potvrdil, jak velký tlak vzduch doopravdy má.</p>\n\n\t\t\t\t\t\t<h3>Využití v praxi</h3>\n\t\t\t\t\t\t<p>Přísavky drží na hladkém povrchu díky tlaku atmosféry (pod přísavkou vzduch není). Tlak vzduchu souvisí i s počasím — viz Meteorologie.</p>\n\t\t\t\t\t",
					zapis: {"jednotky":["atmosférický tlak — značíme pa, jednotka Pa (pascal); v meteorologii hPa, 1 hPa = 100 Pa"],"body":["atmosféra: plynný obal Země","vzduch: 78 % dusík, 21 % kyslík, 1 % ostatní","tlak vzniká: gravitace tlačí vzduch dolů","tlak: u povrchu největší, s výškou klesá","hustota vzduchu: ~1,23 kg/m³, s výškou klesá","na tlak působí: teplota, vlhkost, výška, šířka","normální tlak = 101 325 Pa ≈ 1 013 hPa","normální tlak = 760 mm rtuti (mmHg)","Torricelliho pokus 1643: rtuť v trubici","barometry: rtuťový, aneroid (kovový), barograf (zapisuje)","výpočet: 0,76 · 13 500 · 10 = 102 600 Pa","přísavky: drží díky tlaku atmosféry"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Kolem Země vzduch se točí 🎵', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/atmosfericky-tlak/pisen-atmosfericky-tlak.mp4' },
					],
				},
				{
					slug: 'pretlak-podtlak-vakuum',
					nazev: 'Přetlak, podtlak, vakuum',
					interakce: 'pretlak',
					obsah: "\n\t\t\t\t\t\t<h2>Přetlak, podtlak, vakuum</h2>\n\t\t\t\t\t\t<p>V uzavřené nádobě může být stejný tlak jako venku, v okolní atmosféře. Pak se nic zajímavého neděje — tlaky jsou v rovnováze. Zajímavé jevy nastanou, až když je tlak uvnitř nádoby jiný než venku. Podle toho rozlišujeme tři stavy: <strong>přetlak</strong>, <strong>podtlak</strong> a <strong>vakuum</strong>.</p>\n\n\t\t\t\t\t\t<h3>Přetlak — uvnitř víc než venku</h3>\n\t\t\t\t\t\t<p>Přetlak je stav, kdy je v uzavřené nádobě <strong>větší tlak než v okolí</strong> (větší než atmosférický). Vzniká tak, že do nádoby vtlačíme víc vzduchu, než by tam bylo samo od sebe. Používá se k tomu <strong>hustilka</strong> (lidově „pumpička\") nebo <strong>kompresor</strong>.</p>\n\t\t\t\t\t\t<p>S přetlakem se setkáváme často: nafouknutý míč, pneumatika auta, nafukovací hala, nádobka se sprejem nebo tlaková lahev potápěče. Vzniká i v kabině letadla za letu, ve skafandru astronauta ve vesmíru nebo v plicích, když po nádechu vydechujeme.</p>\n\n\t\t\t\t\t\t<h3>Manometr měří přetlak</h3>\n\t\t\t\t\t\t<p>Velikost přetlaku měříme přístrojem <strong>manometr</strong>. Uvnitř má kovovou trubičku ohnutou do oblouku a částečně naplněnou kapalinou. Jeden konec je připojený k nádobě, druhý uzavřený konec je spojený s ručičkou.</p>\n\t\t\t\t\t\t<p>Když tlak v nádobě vzroste, trubička se mírně narovná a posune ručičku. Je to podobné, jako když se narovná papírová frkačka, do které foukneme.</p>\n\t\t\t\t\t\t<p>Manometry mívají stupnici v jednotce <strong>bar</strong>: <strong>1 bar = 100 000 Pa</strong>, což je přibližně tlak jedné atmosféry. Staré jednotce tlaku se říkalo právě <strong>atmosféra</strong>, značka atm. Manometr ale ukazuje jen <strong>rozdíl</strong> tlaku uvnitř nádoby oproti okolí — tedy samotný přetlak, ne celkový tlak v nádobě.</p>\n\n\t\t\t\t\t\t<h3>Podtlak — uvnitř míň než venku</h3>\n\t\t\t\t\t\t<p>Podtlak je opačný stav: tlak v nádobě je <strong>menší než v okolí</strong>. Vytváří se odsátím vzduchu z prostoru — sací pumpou nebo vývěvou. Nebo vzniká zvětšením objemu prostoru, aniž bychom dovnitř pustili další vzduch.</p>\n\t\t\t\t\t\t<p>Tlak se snaží vyrovnat, a proto se do místa s podtlakem <strong>nasává</strong> okolní vzduch nebo tekutina. Proto funguje pití brčkem, sání mateřského mléka nebo vysavač. Stejně tak fungují přísavky, masážní baňky, gumový zvon na čištění odpadu i pumpa na vodu ze studny. Podtlak vzniká i v plicích, než se nadechneme, nebo když mlaskáme.</p>\n\n\t\t\t\t\t\t<h3>Vakuum — téměř nic</h3>\n\t\t\t\t\t\t<p>Vakuum vznikne, když z prostoru odčerpáme <strong>téměř všechen vzduch</strong> — používá se k tomu <strong>vývěva</strong>. Tlak je pak podstatně nižší než atmosférický, blíží se nule. Úplně dokonalé vakuum bez jediné částice ale ve skutečnosti neexistuje.</p>\n\t\t\t\t\t\t<p>S vakuem se setkáme třeba v baňce klasické žárovky s vláknem nebo ve vakuových vacích na oblečení. Najdeme ho i ve vakuově balených potravinách nebo ve vesmírném prostoru.</p>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Manometr ukazuje jen rozdíl tlaku vůči okolí, tedy přetlak. Skutečný (celkový) tlak v nádobě je součet tlaku atmosféry a přetlaku naměřeného na manometru.</p>\n\t\t\t\t\t\t<p>Manometr ukazuje přetlak 1 bar, tedy asi 1 atmosféru. K tomu připočítáme tlak okolní atmosféry, který je také asi 1 atmosféra.</p>\n\t\t\t\t\t\t<p>p(celkový) = 1 atm + 1 atm = <strong>2 atmosféry</strong> (asi 200 000 Pa)</p>\n\t\t\t\t\t\t<p>Pneumatiku auta huštíme na manometru asi na 2,5 baru přetlaku. Protože 1 bar ≈ 1 atmosféra, dosadíme přímo 2,5 atm.</p>\n\t\t\t\t\t\t<p>p(celkový) = 1 atm + 2,5 atm = <strong>3,5 atmosféry</strong></p>\n\t\t\t\t\t\t<p>Tlak v pneumatice je tak 3,5krát větší než tlak okolního vzduchu.</p>\n\t\t\t\t\t",
					zapis: {"vzorec":"p(celkový) = p(atmosférický) + p(přetlak)","jednotky":["tlak — značíme p, jednotka Pa (pascal)","jednotka bar — 1 bar = 100 000 Pa (100 kPa)","starší jednotka atmosféra (atm) — přibližně stejná jako běžný atmosférický tlak, asi 100 000 Pa","Do vzorce dosazuj tlak ve stejné jednotce (Pa, nebo bar/atm, které jsou si přibližně rovné)."],"vzorecSlovy":"celkový tlak v nádobě = tlak atmosféry plus přetlak naměřený manometrem","body":["přetlak: tlak uvnitř VĚTŠÍ než venku","přetlak vzniká: hustilka, kompresor","manometr měří jen rozdíl — přetlak","1 bar = 100 000 Pa","celkový tlak = atmosférický + přetlak","podtlak: tlak uvnitř MENŠÍ než venku","podtlak vzniká: odsátí, zvětšení objemu","vakuum: tlak téměř nulový, vývěva"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Neviditelná síla tlaku', cesta: 'vWIJeVNdiyM' },
						{ druh: 'video', nazev: 'Píseň: Podtlak & mrak 🎵', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/pretlak-podtlak-vakuum/pisen-podtlak-a-mrak.mp4' },
					],
				},
				{
					slug: 'meteorologie-a-mereni-tlaku',
					nazev: 'Meteorologie a měření tlaku',
					interakce: 'povetrnostni-mapa',
					obsah: "\n\t\t\t\t\t\t<h2>Meteorologie a měření tlaku</h2>\n\t\t\t\t\t\t<p>Hodnoty atmosférického tlaku jsou důležité pro <strong>předpověď počasí</strong>. Porovnáváme je s normálem 1 013 hPa:</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>tlaková výše</strong> (odborně anticyklóna) — tlak vyšší než normál a než v okolí → obvykle jasné, slunečné počasí</li>\n\t\t\t\t\t\t\t<li><strong>tlaková níže</strong> (odborně cyklóna) — tlak nižší než normál a než v okolí, přináší oblačnost a srážky. Hluboká níže (pod 1 000 hPa) přináší bouřky a vichřice.</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Proč vzniká vítr</h3>\n\t\t\t\t\t\t<p>Na počasí má největší vliv <strong>proudění vzduchu</strong>. Způsobuje ho sluneční záření a otáčení Země kolem osy.</p>\n\t\t\t\t\t\t<p>Slunce ohřívá povrch Země i vzduch nad ním. Teplý vzduch stoupá vzhůru a na jeho místě vzniká <strong>tlaková níže</strong>, tedy podtlak. Na místo s nižším tlakem pak proudí vzduch z okolí — to je <strong>vítr</strong>. Nese s sebou oblačnost i srážky.</p>\n\t\t\t\t\t\t<p>👉 Rozdíly tlaku uvádí vzduch do pohybu: vítr proudí z místa s <strong>vyšším tlakem</strong> do místa s <strong>nižším tlakem</strong>. Otáčení Země navíc stáčí proudící vzduch do vírů — velkých i malých.</p>\n\n\t\t\t\t\t\t<h3>Čím se tlak měří</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>rtuťový barometr</strong> — sloupec rtuti jako u Torricelliho</li>\n\t\t\t\t\t\t\t<li><strong>aneroid</strong> — kovový tlakoměr s pružnou krabičkou; krabička se při změně tlaku prohýbá a posouvá ručičku po stupnici</li>\n\t\t\t\t\t\t\t<li><strong>barograf</strong> — barometr se zapisovačem, kreslí průběh tlaku v čase</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>👉 Pro předpověď je důležitější než samotné číslo to, jak se tlak <strong>mění</strong>. Když <strong>klesá</strong>, počasí se obvykle kazí — blíží se níže s deštěm a větrem. Když <strong>stoupá</strong>, obloha se vyjasňuje. Rychlý pokles o víc než 10 hPa za pár hodin varuje před vichřicí.</p>\n\t\t\t\t\t\t<p>Přibližně platí, že v blízkosti hladiny moře klesne tlak o <strong>1 hPa na každých 8 metrů</strong> výšky. Právě proto se naměřené hodnoty <strong>přepočítávají na hladinu moře</strong>. Bez toho by horská stanice hlásila nízký tlak pořád a na mapě by v horách vycházela věčná níže. Teprve po přepočtu jde poctivě porovnat stanice v různých nadmořských výškách.</p>\n\t\t\t\t\t\t<p>Pozor: pravidlo „1 hPa na 8 metrů\" platí jen u hladiny moře. Vysoko v horách už tlak klesá pomaleji a meteorologové počítají přesněji.</p>\n\n\t\t\t\t\t\t<h3>Povětrnostní mapa</h3>\n\t\t\t\t\t\t<p>Na mapě počasí spojují <strong>izobary</strong> místa se stejným tlakem — podobně jako vrstevnice spojují místa ve stejné nadmořské výšce. Tlaková výše se značí písmenem <strong>V</strong>, tlaková níže písmenem <strong>N</strong>.</p>\n\t\t\t\t\t\t<p>👉 Čím <strong>hustěji</strong> jsou izobary u sebe, tím prudčeji se tlak na krátkou vzdálenost mění. V takové oblasti pak fouká <strong>silnější vítr</strong>.</p>\n\n\t\t\t\t\t\t<h3>Meteorologická pozorování</h3>\n\t\t\t\t\t\t<p>Údaje o počasí shromažďuje <strong>Český hydrometeorologický ústav</strong> (ČHMÚ) v Praze — z meteorologických stanic v Česku i v zahraničí. Stanice jsou na souši, na moři i ve velkých výškách atmosféry, kam přístroje vynášejí meteorologické balony.</p>\n\t\t\t\t\t\t<p>Informace posílají také <strong>meteorologické družice</strong>, které obíhají kolem Země. Snímkují oblačnost shora z vesmíru, takže je na nich vidět i bouřkový systém nad celou Evropou.</p>\n\t\t\t\t\t\t<p>Meteorologové takto sledují atmosférické děje a předpovídají počasí. Měří osm veličin: teplotu vzduchu, atmosférický tlak a směr i rychlost větru. Dál vlhkost vzduchu, oblačnost a srážky, čistotu ovzduší, sluneční záření a vlhkost i teplotu půdy.</p>\n\t\t\t\t\t\t<p>Měří se v <strong>pravidelných termínech</strong> — u nás hlavně v 7, 14 a 21 hodin. Tak jde hodnoty z různých míst a různých dnů poctivě porovnat. Předpověď počasí pomáhá dopravě, zemědělství i záchranářům. Pomáhá i energetikům, kteří podle ní plánují výrobu z větrných a solárních elektráren a spotřebu tepla na topení.</p>\n\n\t\t\t\t\t\t<h3>Meteorologické přístroje</h3>\n\t\t\t\t\t\t<p>Teploměr a vlhkoměr bývají v <strong>meteorologické budce</strong> — bílé skříňce, jejíž stěny propouštějí vzduch. Bílá barva odráží sluneční záření, aby se budka nezahřívala a neovlivnila naměřenou teplotu. Budka stojí na volném prostranství, daleko od budov a stromů, aby ji neovlivňovaly překážky.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>teploměr</strong> — teplota vzduchu; v budce ve stínu, 2 m nad zemí</li>\n\t\t\t\t\t\t\t<li><strong>vlhkoměr</strong> — vlhkost vzduchu</li>\n\t\t\t\t\t\t\t<li><strong>anemometr</strong> — měří rychlost větru. Roztáčí ho miskový kříž (obvykle tři misky), rychlost se určuje podle počtu otáček za časový úsek. Směr větru ukazuje otáčivá korouhev, se zapisovacím zařízením se nazývá anemograf.</li>\n\t\t\t\t\t\t\t<li><strong>srážkoměr</strong> — nádoba zachytává dešťovou vodu a nálevkou ji odvádí do odměrné nádoby se stupnicí (mm vodního sloupce). Sníh se v něm nechá roztát a změří se jako voda.</li>\n\t\t\t\t\t\t\t<li><strong>heliograf</strong> — skleněná koule, která zaznamenává, jak dlouho svítilo slunce během dne</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Turistická chata stojí 400 m nad hladinou moře. Dole u moře ukazuje barometr tlak 1 020 hPa. Jaký tlak bude nahoře v chatě?</p>\n\t\t\t\t\t\t<p>Nejdřív spočítáme, o kolik tlak s výškou klesne: 400 : 8 = <strong>50 hPa</strong>.</p>\n\t\t\t\t\t\t<p>Pak ho odečteme od tlaku u moře: 1 020 − 50 = <strong>970 hPa</strong>.</p>\n\t\t\t\t\t\t<p>V chatě bude tlak přibližně 970 hPa.</p>\n\t\t\t\t\t",
					zapis: {"body":["tlaková výše: vyšší tlak → jasno","tlaková níže: nižší tlak → oblačno, srážky","slunce hřeje vzduch → stoupá → tlaková níže","vítr: proudí z vyššího tlaku do nižšího","rotace Země: proudící vzduch tvoří víry","barometr/aneroid/barograf — měří a zapisují tlak","aneroid: krabička se prohýbá, hýbe ručičkou","tlak klesá → počasí se kazí; stoupá → vyjasní se","pokles přes 10 hPa za pár hodin → vichřice","u moře: pokles 1 hPa na 8 m → přepočet na hladinu moře","izobary: spojují místa se stejným tlakem","izobary blízko sebe → silnější vítr; V = výše, N = níže","ČHMÚ v Praze: data ze stanic, balonů, družic","měří 8 veličin: teplota, tlak, vítr, vlhkost, oblačnost a srážky, ovzduší, záření, půda","měří v termínech 7, 14 a 21 hodin","meteorologická budka: bílá, větraná, volné prostranství","anemometr — rychlost a směr větru, anemograf zapisuje","srážkoměr — srážky v mm; heliograf — doba slunečního svitu"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Meteorologická pozorování', cesta: 'fKLqHBIS1Xk' },
						{ druh: 'video', nazev: 'Píseň: Šumí satelit 🎵', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/meteorologie-a-mereni-tlaku/pisen-sumi-satelit.mp4' },
					],
				},
			],
		},
		{
			slug: 'svetlo-a-jeho-sireni',
			nazev: 'Světlo a jeho šíření',
			podtemata: [
				{
					slug: 'svetlo-jeho-zdroje',
					nazev: 'Světlo a jeho zdroje',
					interakce: 'rychlost-svetla',
					obsah: `
						<h2>Světlo, zdroje světla, šíření světla</h2>
						<h3>Zdroje světla</h3>
						<p>Předměty světlo buď <strong>vyrábějí</strong> (zdroje světla), nebo jen <strong>odrážejí</strong> (vidíme je díky cizímu světlu — Měsíc, zrcadlo, tento papír).</p>
						<ul>
							<li><strong>přirozené zdroje</strong>: Slunce, oheň, blesk, světluška</li>
							<li><strong>umělé zdroje</strong>: žárovka, zářivka, LED, svíčka, displej</li>
							<li>podle velikosti: <strong>bodové</strong> a <strong>plošné</strong> zdroje</li>
						</ul>
						<h3>Šíření světla</h3>
						<p>Světlo se šíří prostorem všemi směry jako vlnění. Vlny si rozkládáme na <strong>paprsky</strong>, které se ve stejnorodém prostředí šíří <strong>přímočaře</strong> — po dokonalých přímkách.</p>
						<h3>Rychlost světla</h3>
						<ul>
							<li>ve vakuu: <strong>300 000 km/s</strong> — největší rychlost ve vesmíru</li>
							<li>ve vzduchu: téměř stejná; ve vodě ~225 000 km/s; ve skle ~200 000 km/s; v diamantu ~125 000 km/s</li>
						</ul>
						<h3>Optické prostředí</h3>
						<ul>
							<li><strong>průhledné</strong> — světlo prochází bez rozptylu (čiré sklo)</li>
							<li><strong>průsvitné</strong> — prochází, ale zčásti se rozptyluje (matné sklo)</li>
							<li><strong>neprůhledné</strong> — světlo se pohlcuje nebo odráží (zeď, zrcadlo)</li>
						</ul>
					`,
					zapis: {
						body: [
							'Zdroje světla světlo vyrábějí, zatímco ostatní předměty jen odrážejí cizí světlo.',
							'Zdroje světla mohou být přirozené nebo umělé a podle velikosti bodové nebo plošné.',
							'Světlo se šíří všemi směry a ve stejnorodém prostředí se jeho paprsky šíří přímočaře.',
							'Optické prostředí může být průhledné, průsvitné nebo neprůhledné podle toho, jak jím světlo prochází.',
							'Ve vakuu se světlo šíří rychlostí 300 000 km/s, v jiných prostředích pomaleji.',
						],
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Světlo — od plamene ke hvězdám', cesta: 'v4EdVxeZ9J0' },
						{ druh: 'youtube', nazev: 'Video: Odhalený svět světla', cesta: 'JkgrUOUgZ7Q' },
						{ druh: 'video', nazev: 'Píseň: Světelný proud 🎵', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/svetlo-jeho-zdroje/pisen-svetelny-proud.mp4' },
					],
				},
				{
					slug: 'odraz-svetla',
					nazev: 'Odraz světla, zákon odrazu',
					interakce: 'odraz',
					obsah: `
						<h2>Odraz světla, zákon odrazu</h2>
						<p>Dopadne-li paprsek na rozhraní dvou prostředí, může nastat <strong>odraz</strong>, <strong>lom</strong>, nebo <strong>pohlcení</strong> světla.</p>
						<h3>Odraz na různých površích</h3>
						<ul>
							<li><strong>nerovná plocha</strong> → rozptyl světla (díky němu vidíme i do stínu)</li>
							<li><strong>rovná lesklá plocha</strong> → svazek zůstane rovnoběžný (zrcadlo, klidná hladina)</li>
							<li><strong>dvě rovnoběžná zrcadla naproti sobě</strong> → obraz se odráží mezi nimi sem a tam a vzniká zdánlivě nekonečná řada zmenšujících se obrazů</li>
						</ul>
						<h3>Odrazka na kole</h3>
						<p>Odrazka je poskládaná z drobných <strong>koutů</strong> — tří na sebe kolmých plošek jako roh krabice.
							Paprsek se v koutu odrazí třikrát a vyjde <strong>zpátky přesně tím směrem, odkud přišel</strong>.
							Proto odrazka „svítí" právě řidiči, jehož světla na ni dopadla. Stejně fungují i patníky u silnice.</p>
						<h3>Zákon odrazu</h3>
						<p><strong>„Úhel odrazu je roven úhlu dopadu."</strong> — zapisujeme α' = α</p>
						<ul>
							<li>oba úhly měříme <strong>od kolmice dopadu</strong> (kolmice k ploše v bodě dopadu)</li>
							<li>dopadající i odražený paprsek leží <strong>v jedné rovině</strong></li>
							<li>kolmici umíme sestrojit i pro zakřivené plochy — u koule je to spojnice středu s bodem dopadu</li>
						</ul>
						<h3>Zrcadla</h3>
						<p>Tělesa s hladkým lesklým povrchem (vyleštěný kov chráněný sklem). Podle tvaru: <strong>rovinná, kulová, válcová</strong>.</p>
					`,
					zapis: {
						body: [
							'Při dopadu světla na rozhraní může nastat odraz, lom nebo pohlcení světla.',
							'Na nerovném povrchu se světlo rozptyluje, zatímco na rovném lesklém povrchu zůstává odražený svazek rovnoběžný.',
							'Úhel dopadu i úhel odrazu měříme od kolmice k ploše v bodě dopadu.',
							'Dopadající paprsek, odražený paprsek a kolmice dopadu leží v jedné rovině.',
						],
						zakon: 'Úhel odrazu je roven úhlu dopadu.',
						vzorec: 'α′ = α',
						jednotky: [
							'úhel dopadu α — stupeň (°)',
							'úhel odrazu α′ — stupeň (°)',
							'Oba úhly dosazuj ve stupních (°) a měř je od kolmice dopadu.',
						],
					},
					materialy: [
					],
				},
				{
					slug: 'lom-svetla',
					nazev: 'Lom světla',
					interakce: 'lom',
					obsah: `
						<h2>Lom světla</h2>
						<p>Při přechodu do jiného optického prostředí světlo <strong>mění rychlost</strong> — a proto se <strong>láme</strong> (mění směr).</p>
						<p>Ve vakuu a ve vzduchu letí světlo asi <strong>300 000 km/s</strong>, ve vodě už jen asi
							<strong>225 000 km/s</strong> a ve skle kolem <strong>200 000 km/s</strong>. Čím je prostředí
							opticky hustší, tím je světlo pomalejší — a tím víc se láme.</p>
						<h3>Dva případy lomu</h3>
						<ul>
							<li><strong>lom KE kolmici</strong> — z prostředí opticky řidšího do hustšího (vzduch → voda/sklo); úhel lomu β je <strong>menší</strong> než úhel dopadu α</li>
							<li><strong>lom OD kolmice</strong> — z hustšího do řidšího (voda → vzduch); úhel lomu je <strong>větší</strong> než úhel dopadu</li>
						</ul>
						<h3>Úplný odraz</h3>
						<p>Při přechodu z hustšího do řidšího prostředí se s rostoucím úhlem dopadu zvětšuje úhel lomu. Při <strong>mezním úhlu</strong> se paprsek už nezlomí ven — nastává <strong>úplný (totální) odraz</strong>. Využívají ho optická vlákna a odrazky.</p>
						<h3>Proč brčko ve sklenici vypadá zlomené?</h3>
						<p>Paprsky od ponořené části se na hladině lámou — oko je prodlouží rovně a brčko se zdá zalomené. Ze stejného důvodu vypadá bazén mělčí, než je.</p>
					`,
					zapis: {
						body: [
							'Při přechodu do jiného optického prostředí světlo mění rychlost, a proto se láme.',
							'Z opticky řidšího prostředí do hustšího se paprsek láme ke kolmici.',
							'Z opticky hustšího prostředí do řidšího se paprsek láme od kolmice.',
							'Při přechodu z hustšího do řidšího prostředí může při mezním úhlu nastat úplný odraz.',
						],
					},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Index lomu 🎵', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/lom-svetla/pisen-index-lomu.mp4' },
					],
				},
				{
					slug: 'stin-faze-mesice',
					nazev: 'Stín a fáze Měsíce',
					interakce: 'mesic',
					obsah: `
						<h2>Stín, fáze Měsíce, zatmění</h2>
						<h3>Stín a polostín</h3>
						<p>Za neprůhledným tělesem vzniká <strong>stín</strong> — prostor, kam světlo nedopadá (světlo se šíří přímočaře). U plošných zdrojů vzniká kolem plného stínu ještě <strong>polostín</strong>, kam dopadá světlo jen z části zdroje.</p>
						<h3>Fáze Měsíce</h3>
						<p>Měsíc sám nesvítí — vidíme jeho osvětlenou polovinu z různých úhlů:</p>
						<ul>
							<li><strong>nov</strong> → <strong>první čtvrť</strong> (dorůstá, tvar D) → <strong>úplněk</strong> → <strong>poslední čtvrť</strong> (couvá, tvar C) → nov</li>
							<li>celý cyklus fází trvá přibližně <strong>29,5 dne</strong></li>
						</ul>
						<h3>Zatmění Měsíce</h3>
						<p>Nastane, když se <strong>Země dostane mezi Slunce a Měsíc</strong> — Země vrhá stín na Měsíc, který ztmavne nebo zčervená. Lze bezpečně pozorovat pouhým okem.</p>
						<h3>Zatmění Slunce</h3>
						<p>Nastane, když se <strong>Měsíc dostane mezi Zemi a Slunce</strong> a zakryje ho. Pozorovat jen se <strong>speciálními ochrannými brýlemi</strong> — nikdy přímo!</p>
					`,
					zapis: {
						body: [
							'Za neprůhledným tělesem vzniká stín, kam světlo nedopadá; u plošného zdroje vzniká také polostín.',
							'Měsíc sám nesvítí a ze Země vidíme jeho osvětlenou polovinu z různých úhlů.',
							'Fáze Měsíce se střídají v pořadí nov, první čtvrť, úplněk a poslední čtvrť.',
							'Při zatmění Měsíce leží Země mezi Sluncem a Měsícem, při zatmění Slunce leží Měsíc mezi Zemí a Sluncem.',
						],
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Stíny, fáze a zatmění', cesta: '2_f7R5E_rrY' },
					],
				},
			],
		},
		{
			slug: 'zrcadla-a-cocky',
			nazev: 'Zrcadla a čočky',
			podtemata: [
				{
					slug: 'optika-rovinneho-zrcadla',
					interakce: 'rovinne-zrcadlo',
					nazev: 'Optika rovinného zrcadla',
					obsah: `
						<h2>Optika rovinného zrcadla</h2>
						<p>Naše oko vytvoří obraz těles, která buď <strong>sama svítí</strong> (Slunce, hvězdy, žárovka), nebo jsou <strong>osvětlená a odrážejí světlo</strong> do našich očí (kniha, stůl, hory, Měsíc). Když se světlo odrazí od zrcadla, vzniká <strong>obraz tělesa</strong>. Pro odražené paprsky přitom platí <strong>zákon odrazu</strong> (úhel odrazu = úhel dopadu).</p>
						<h3>Jaký obraz vidí naše oko</h3>
						<p>Obraz předmětu je určen paprsky, které do oka přicházejí — <strong>obraz vidíme vždy ve směru přicházejících paprsků</strong>. Zda jde o skutečný předmět, nebo jen jeho obraz v zrcadle, vyhodnotí teprve náš mozek podle zkušeností.</p>
						<h3>Vlastnosti obrazu v rovinném zrcadle</h3>
						<ul>
							<li><strong>zdánlivý</strong> — nevzniká skutečnými paprsky, je „za zrcadlem", nejde zachytit na stínítko (vytvoří ho jen náš zrak)</li>
							<li><strong>stejně velký</strong> jako předmět</li>
							<li><strong>stejně vzdálený</strong> od zrcadla jako předmět</li>
							<li><strong>stranově převrácený</strong> — pravá strana se jeví jako levá a naopak</li>
							<li><strong>vzpřímený</strong> — není obrácený vzhůru nohama</li>
						</ul>
						<p>Obraz sestrojíme pomocí <strong>osové souměrnosti</strong> podle roviny zrcadla.</p>
						<h3>Využití</h3>
						<p>Kosmetická a estetická zrcadla (opticky zvětšují místnost), <strong>periskop</strong> ponorky, zrcadlové nápisy. Proto se na sanitkách píše nápis <strong>AMBULANCE zrcadlově</strong> — ve zpětném zrcátku ho pak řidič vpředu přečte správně.</p>
					`,
					zapis: {
						body: [
							'Rovinné zrcadlo vytváří obraz odrazem světla.',
							'Obraz je zdánlivý, vzpřímený, stejně velký jako předmět a stejně vzdálený od zrcadla.',
							'V zrcadle se pravá strana jeví jako levá a naopak.',
							'Obraz sestrojíme pomocí osové souměrnosti podle roviny zrcadla.',
						],
						zakon: 'Zákon odrazu: úhel odrazu se rovná úhlu dopadu.',
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Iluze reality — rovinná zrcadla', cesta: 'JsleRYDXXwM' },
					],
				},
				{
					slug: 'kulova-zrcadla-dute-zrcadlo',
					nazev: 'Kulová zrcadla a duté zrcadlo',
					interakce: 'zrcadlo',
					obsah: `
						<h2>Kulová zrcadla, duté a vypuklé zrcadlo</h2>
						<p>Lesklá koule odráží světlo a může fungovat jako zrcadlo. U vyráběných <strong>kulových zrcadel</strong> tvoří odraznou plochu jen malá část povrchu koule.</p>
						<h3>Popis kulového zrcadla</h3>
						<ul>
							<li><strong>střed křivosti S</strong> — střed kulové plochy, z níž je zrcadlo vyrobeno</li>
							<li><strong>poloměr křivosti r</strong> — poloměr této kulové plochy (r = |SV|)</li>
							<li><strong>vrchol V</strong> — nejvyšší bod zrcadla (na optické ose)</li>
							<li><strong>optická osa o</strong> — spojnice středu křivosti a vrcholu</li>
							<li><strong>ohnisko F</strong> — leží přesně uprostřed mezi středem křivosti a vrcholem</li>
							<li><strong>ohnisková vzdálenost f</strong> — vzdálenost ohniska od vrcholu (základní parametr zrcadla)</li>
						</ul>
						<h3>Duté zrcadlo</h3>
						<p>Odraznou plochou je <strong>vnitřní</strong> (vydutá) strana kulové plochy. Střed i ohnisko leží <strong>před zrcadlem</strong> a jsou <strong>skutečné</strong> — paprsky jimi opravdu procházejí.</p>
						<ul>
							<li>paprsky rovnoběžné s osou se po odrazu setkají <strong>v ohnisku</strong> (lze zapálit oheň, soustředit sluneční energii v solární elektrárně)</li>
							<li>naopak paprsky vycházející z ohniska se po odrazu šíří jako <strong>rovnoběžný svazek</strong> → reflektory světel aut a svítilen</li>
						</ul>
						<p>Obraz v dutém zrcadle závisí na vzdálenosti předmětu:</p>
						<ul>
							<li>předmět <strong>dál než poloměr r</strong> → obraz skutečný, převrácený, <strong>zmenšený</strong></li>
							<li>předmět <strong>mezi r a ohniskem f</strong> → obraz skutečný, převrácený, <strong>zvětšený</strong></li>
							<li>předmět <strong>blíž než ohnisko f</strong> → obraz zdánlivý, vzpřímený, <strong>zvětšený</strong> (kosmetické a zubní zrcátko)</li>
						</ul>
						<h3>Vypuklé zrcadlo</h3>
						<p>Odraznou plochou je <strong>vnější</strong> (vypouklá) strana. Ohnisko leží <strong>za zrcadlem</strong> a je <strong>zdánlivé</strong> — paprsky jím nikdy neprocházejí. Vypuklé zrcadlo vytváří <strong>vždy</strong> obraz <strong>zdánlivý, vzpřímený a zmenšený</strong>, zato zachytí velkou část prostoru.</p>
						<p>Využití: <strong>dopravní zrcadla</strong> u nepřehledných křižovatek, zpětná zrcátka, bezpečnostní zrcadla v obchodech.</p>
						<p>💡 Kulová zrcadla se snadno vyrábějí, ale ostře zobrazují jen předměty u osy. Přesnější jsou <strong>parabolická zrcadla</strong> — používají je dalekohledy, radioteleskopy i Hubbleův a Webbův teleskop.</p>
					`,
					zapis: {
						body: [
							'Kulové zrcadlo tvoří část lesklého povrchu koule a popisujeme u něj vrchol, optickou osu, střed křivosti a ohnisko.',
							'Duté zrcadlo odráží světlo vnitřní stranou a rovnoběžné paprsky soustředí do skutečného ohniska před zrcadlem.',
							'Obraz v dutém zrcadle může být podle vzdálenosti předmětu skutečný nebo zdánlivý, zmenšený nebo zvětšený.',
							'Vypuklé zrcadlo odráží světlo vnější stranou a vždy vytváří zdánlivý, vzpřímený a zmenšený obraz.',
						],
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Fyzika kulových zrcadel', cesta: 'xkCEjfT11L8' },
					],
				},
				{
					slug: 'opticka-cocka',
					nazev: 'Optická čočka (spojky a rozptylky)',
					interakce: 'cocka',
					obsah: `
						<h2>Optická čočka — spojky a rozptylky</h2>
						<p><strong>Čočky</strong> jsou tělesa z průhledné látky (sklo, plast) ohraničená jednou nebo dvěma kulovými plochami. Využívají <strong>lomu světla</strong> při průchodu čočkou. Podle tvaru je dělíme na dvě skupiny:</p>
						<h3>Spojné čočky (spojky)</h3>
						<ul>
							<li>uprostřed <strong>nejširší</strong>, na okrajích nejtenčí</li>
							<li>rovnoběžný svazek paprsků <strong>spojují</strong> do jednoho bodu — do <strong>ohniska</strong></li>
							<li>mají <strong>skutečná</strong> ohniska (paprsky jimi procházejí), <strong>kladnou</strong> ohniskovou vzdálenost i kladný počet dioptrií</li>
							<li>značka: dvě šipky směřující ven</li>
						</ul>
						<h3>Rozptylné čočky (rozptylky)</h3>
						<ul>
							<li>uprostřed <strong>nejtenčí</strong>, na okrajích nejširší</li>
							<li>rovnoběžný svazek paprsků <strong>rozptylují</strong> — jako by vycházely z jednoho bodu</li>
							<li>mají <strong>zdánlivá</strong> ohniska, <strong>zápornou</strong> ohniskovou vzdálenost i záporný počet dioptrií</li>
						</ul>
						<p><strong>Optická mohutnost</strong> udává počet dioptrií: čím víc dioptrií, tím je čočka zakřivenější a víc láme paprsky.</p>
						<h3>Význačné paprsky a obraz</h3>
						<p>Obraz sestrojíme pomocí tří paprsků: <strong>rovnoběžný</strong> s osou se láme do ohniska, <strong>ohniskový</strong> (jde ohniskem) se láme rovnoběžně s osou a <strong>středový</strong> (prochází středem čočky) se neláme.</p>
						<p>Spojka vytvoří tři druhy obrazů podle vzdálenosti předmětu:</p>
						<ul>
							<li>předmět <strong>dál než 2f</strong> → skutečný, převrácený, <strong>zmenšený</strong> (oko, objektiv fotoaparátu)</li>
							<li>předmět <strong>mezi f a 2f</strong> → skutečný, převrácený, <strong>zvětšený</strong> (dataprojektor)</li>
							<li>předmět <strong>blíž než f</strong> → zdánlivý, vzpřímený, <strong>zvětšený</strong> (lupa)</li>
						</ul>
						<p>Rozptylka vytváří <strong>vždy</strong> obraz zdánlivý, vzpřímený a zmenšený (např. dveřní kukátko).</p>
						<h3>Využití</h3>
						<p>Spojka: lupa, mikroskop, dalekohled, objektiv, brýle. Rozptylka: kukátko, brýle, složitější optické soustavy.</p>
					`,
					zapis: {
						body: [
							'Čočka je průhledné těleso, které využívá lom světla.',
							'Spojka je uprostřed nejširší a rovnoběžné paprsky spojuje do skutečného ohniska. Má kladnou ohniskovou vzdálenost i kladný počet dioptrií.',
							'Rozptylka je uprostřed nejtenčí a rovnoběžné paprsky rozptyluje, jako by vycházely ze zdánlivého ohniska. Má zápornou ohniskovou vzdálenost i záporný počet dioptrií.',
							'Spojka vytváří obraz podle vzdálenosti předmětu, zatímco rozptylka vytváří vždy obraz zdánlivý, vzpřímený a zmenšený.',
						],
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Svět skrz čočku', cesta: 'cERyrQE-PBQ' },
						{ druh: 'video', nazev: 'Píseň: Optická jízda 🎵', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/opticka-cocka/pisen-opticka-jizda.mp4' },
					],
				},
				{
					slug: 'oko-vady-oka',
					nazev: 'Oko a vady oka',
					interakce: 'oko',
					obsah: `
						<h2>Oko a vady oka</h2>
						<p><strong>Oko</strong> je optická soustava — zachytí svazek paprsků od okolních předmětů a vytvoří jejich obraz na citlivé vrstvě (sítnici).</p>
						<h3>Čím světlo v oku prochází</h3>
						<p>rohovka → komorová voda → <strong>zornice</strong> (otvor v duhovce, funguje jako clona fotoaparátu) → <strong>čočka</strong> (pružná dvojvypuklá spojka) → sklivec → <strong>sítnice</strong></p>
						<p>Na sítnici jsou dva druhy světločivých buněk: <strong>tyčinky</strong> (vidění v šeru) a <strong>čípky</strong> (barvy — tři druhy: červená, zelená, modrá). V místě nejostřejšího vidění (žluté skvrně) jsou nahuštěné <strong>čípky</strong>.</p>
						<h3>Vznik obrazu</h3>
						<p>Nejdůležitější jsou čočka a sítnice. Obraz na sítnici je vždy <strong>skutečný, zmenšený a převrácený</strong>. Podráždění se zrakovým nervem přenese do mozku, který vjem zpracuje (a obraz „otočí").</p>
						<h3>Akomodace — zaostřování</h3>
						<p>Oko zaostřuje na různé vzdálenosti <strong>změnou zakřivení pružné čočky</strong> (mění tak její ohniskovou vzdálenost). Zdravé oko zaostří na blízko asi na 10–15 cm; „na dálku" až do nekonečna. Nejvhodnější vzdálenost pro čtení je <strong>25–30 cm</strong>. S věkem čočka tuhne a schopnost akomodace klesá.</p>
						<h3>Zrakové vady a jejich korekce</h3>
						<ul>
							<li><strong>Dalekozrakost</strong> — ostře vidí do dálky, blízké rozmazaně; obraz vzniká <strong>za sítnicí</strong> (oko láme málo). Korekce: brýle se <strong>spojkami</strong> (kladné dioptrie, +).</li>
							<li><strong>Krátkozrakost</strong> — ostře vidí zblízka, dálku rozmazaně; obraz vzniká <strong>před sítnicí</strong> (oko láme příliš). Korekce: brýle s <strong>rozptylkami</strong> (záporné dioptrie, −).</li>
						</ul>
						<p>Dvě oči umožňují <strong>prostorové vidění</strong> — mozek spojí dva obrazy do jednoho vjemu.</p>
					`,
					zapis: {
						body: [
							'Oko je optická soustava, která vytváří obraz okolních předmětů na sítnici.',
							'Obraz na sítnici je skutečný, zmenšený a převrácený. Mozek tento vjem zpracuje.',
							'Oko zaostřuje změnou zakřivení pružné čočky. Tento děj se nazývá akomodace.',
							'Dalekozrakost se koriguje spojkami, krátkozrakost rozptylkami.',
						],
					},
					materialy: [
						{ druh: 'infografika', nazev: 'Oko jako optická soustava', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka/infografika-oko.jpg' },
						{ druh: 'infografika', nazev: 'Historie brýlí (nad rámec RVP)', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka/infografika-historie-bryli.jpg' },
					],
				},
				{
					slug: 'rozklad-svetla-duha',
					nazev: 'Rozklad světla a duha',
					interakce: 'duha',
					obsah: `
						<h2>Rozklad bílého světla, duha</h2>
						<p>Sluneční světlo vnímáme jako <strong>bílé</strong>. Při průchodu <strong>optickým hranolem</strong> se rozkládá na barevné paprsky. Jev poprvé popsal roku <strong>1671 Isaac Newton</strong> a pruh barev nazval <strong>spektrum</strong>; spojkou barvy zase složil zpět do bílé — důkaz, že bílé světlo je složené.</p>
						<h3>Barevné spektrum</h3>
						<ul>
							<li>příčinou rozkladu je, že <strong>každá barva se láme jinak</strong> — <strong>červená nejméně, fialová nejvíce</strong></li>
							<li>vzniká spojitý pás <strong>sedmi</strong> barev v pořadí: <strong>červená, oranžová, žlutá, zelená, modrá, indigová, fialová</strong></li>
							<li>barvy spektra se liší <strong>vlnovou délkou světla</strong> — červená má vlnovou délku nejdelší, fialová nejkratší</li>
						</ul>
						<h3>Duha — přirozený rozklad světla</h3>
						<ul>
							<li>vzniká rozkladem slunečního světla na <strong>dešťových kapkách</strong></li>
							<li>vidíme ji, když máme <strong>Slunce za zády</strong> a déšť před sebou; <strong>červená je nahoře</strong>, fialová dole</li>
							<li>bílé světlo vstoupí do kapky (láme se a rozkládá), uvnitř se <strong>jednou odrazí</strong> a při výstupu se spektrum ještě rozšíří</li>
							<li><strong>dvojitá duha</strong>: slabší vedlejší duha vzniká <strong>dvěma</strong> odrazy v kapce a má <strong>opačné pořadí barev</strong></li>
							<li>duha je <strong>optický jev</strong>, ne hmotný předmět — každý pozorovatel ji vidí z jiných kapek podle své polohy vůči Slunci, proto se k ní nikdy nedá přiblížit</li>
						</ul>
						<p>💡 Podstatu duhy správně vysvětlil lomem paprsků český fyzik a lékař <strong>Jan Marcus Marci</strong> (17. století).</p>
					`,
					zapis: {
						body: [
							'Bílé světlo je složené z barev a optický hranol je rozkládá na barevné spektrum.',
							'Červené světlo se láme nejméně a fialové nejvíce. Červená má nejdelší vlnovou délku a fialová nejkratší.',
							'Duha vzniká lomem, rozkladem a odrazem slunečního světla v dešťových kapkách.',
							'Duhu vidíme, když máme Slunce za zády a déšť před sebou. Červená barva je nahoře a fialová dole.',
						],
					},
					materialy: [
					],
				},
				{
					slug: 'vnimani-barev',
					nazev: 'Vnímání barev (RGB a CMYK)',
					interakce: 'barvy',
					obsah: `
						<h2>Vnímání barev, skládání světel a míchání barviv</h2>
						<p>Na sítnici jsou <strong>tři druhy čípků</strong> — každý citlivý na jednu barvu: červenou, zelenou nebo modrou. Výsledná barva vzniká až <strong>v mozku</strong> složením vjemů. Na barvu tělesa má vliv <strong>odraz a pohlcení (absorpce)</strong> světla.</p>
						<h3>Skládání barevných světel — RGB</h3>
						<p>Používají ho obrazovky, displeje a reflektory.</p>
						<ul>
							<li><strong>RGB</strong> = red, green, blue (červená, zelená, modrá) — základní barvy <strong>světla</strong></li>
							<li><strong>bílé</strong> světlo vznikne složením všech tří základních barev se stejnou intenzitou</li>
							<li>doplňkové barvy (dvě základní dohromady): žlutá, purpurová (magenta), azurová</li>
							<li><strong>černé světlo neexistuje</strong> — černá je nepřítomnost světla (tma)</li>
						</ul>
						<h3>Barva těles</h3>
						<p>Oko vnímá barvu tělesa podle toho, které barvy těleso <strong>odráží</strong>. Bílé těleso odráží všechny barvy, černé všechno pohltí. Barva tělesa proto závisí i na <strong>barvě dopadajícího světla</strong>.</p>
						<h3>Míchání barviv — CMYK</h3>
						<p>Míchání temper nebo inkoustů je opačné než skládání světel: mícháme látky, které barvy <strong>pohlcují</strong>, takže čím víc barviv, tím <strong>tmavší</strong> výsledek.</p>
						<ul>
							<li><strong>CMYK</strong> = cyan (azurová), magenta (purpurová), yellow (žlutá) + <strong>K</strong> = black (černá)</li>
							<li>černá se do tiskáren přidává navíc — kvůli sytosti a úspoře barevných inkoustů</li>
						</ul>
					`,
					zapis: {
						body: [
							'Na sítnici jsou tři druhy čípků citlivé na červené, zelené a modré světlo. Výslednou barvu vytváří mozek složením jejich vjemů.',
							'Obrazovky skládají barevná světla systémem RGB. Stejně silné červené, zelené a modré světlo vytvoří bílé světlo.',
							'Barvu tělesa vnímáme podle světla, které těleso odráží. Bílé těleso odráží všechny barvy, černé je pohlcuje.',
							'Tiskárny míchají barviva systémem CMYK. Čím více barviv smícháme, tím tmavší je výsledek.',
						],
					},
					materialy: [
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co máš umět za 1. pololetí</h2>
						<p>Přehled učiva prvního pololetí 7. ročníku. Dole na stránce si dej <strong>souhrnný kvíz</strong> složený z otázek všech probraných témat.</p>
						<h3>1. <a href="../../pohyb-a-rychlost/">Pohyb a rychlost</a></h3>
						<ul><li>klid a pohyb tělesa, trajektorie a dráha; posuvný a otáčivý pohyb; rychlost v = s : t a výpočty dráhy a času</li></ul>
						<h3>2. <a href="../../sily-kolem-nas/">Síly kolem nás</a></h3>
						<ul><li>síla a její měření; gravitační síla; třecí síla; skládání sil; těžiště tělesa</li></ul>
						<h3>3. <a href="../../jednoduche-stroje/">Jednoduché stroje</a></h3>
						<ul><li>působení těles a deformace; páka a moment síly</li></ul>
						<h3>4. <a href="../../tlak-v-kapalinach/">Tlak v kapalinách</a></h3>
						<ul><li>tlak p = F : S (pascal); Pascalův zákon a hydraulika; hydrostatický tlak</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>rychlost v = s : t (m/s, km/h; 1 m/s = 3,6 km/h)</li>
							<li>tlak p = F : S (Pa)</li>
							<li>gravitační síla na 1 kg ≈ 10 N</li>
						</ul>
						<h3>🎮 Další procvičování (Wordwall)</h3>
						<ul>
							<li><a href="https://wordwall.net/cs/resource/80876088" target="_blank" rel="noopener">Skládání sil — kvíz</a></li>
						</ul>
					`,
					zapis: {
						body: [
							'V prvním pololetí opakujeme pohyb těles, trajektorii, dráhu a rychlost.',
							'Sílu měříme siloměrem. Probíráme gravitační a třecí sílu, skládání sil a těžiště tělesa.',
							'Sledujeme působení těles a deformaci, páku a moment síly.',
							'U kapalin počítáme tlak a poznáváme Pascalův zákon, hydrauliku a hydrostatický tlak.',
						],
						vzorec: 'v = s : t      (odvozeně: s = v · t,  t = s : v)      p = F : S      (odvozeně: F = p · S,  S = F : p)',
						jednotky: [
							'rychlost v — metr za sekundu (m/s)',
							'dráha s — metr (m), čas t — sekunda (s)',
							'tlak p — pascal (Pa)',
							'síla F — newton (N), obsah plochy S — metr čtvereční (m²)',
							'1 m/s = 3,6 km/h; gravitační síla na 1 kg je přibližně 10 N.',
							'Do vzorců dosazuj dráhu v m, čas v s, sílu v N a obsah plochy v m².',
						],
					},
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co máš umět za celý 7. ročník</h2>
						<p>Přehled učiva celého ročníku. Dole na stránce najdeš <strong>souhrnný kvíz</strong> z otázek všech témat roku.</p>
						<h3>1. <a href="../../pohyb-a-rychlost/">Pohyb a rychlost</a></h3>
						<ul><li>klid a pohyb, trajektorie, dráha; druhy pohybu; rychlost a výpočty (v = s : t)</li></ul>
						<h3>2. <a href="../../sily-kolem-nas/">Síly kolem nás</a></h3>
						<ul><li>síla, gravitační a třecí síla, skládání sil, těžiště</li></ul>
						<h3>3. <a href="../../jednoduche-stroje/">Jednoduché stroje</a></h3>
						<ul><li>deformace; páka, moment síly, rovnováha na páce</li></ul>
						<h3>4. <a href="../../tlak-v-kapalinach/">Tlak v kapalinách</a></h3>
						<ul><li>tlak, Pascalův zákon, hydraulické zařízení, hydrostatický tlak</li></ul>
						<h3>5. <a href="../../vztlakova-sila-a-plovani-teles/">Vztlaková síla a plování těles</a></h3>
						<ul><li>Archimédův zákon; kdy těleso plave, vznáší se, nebo klesá</li></ul>
						<h3>6. <a href="../../atmosfera-a-tlak-vzduchu/">Atmosféra a tlak vzduchu</a></h3>
						<ul><li>atmosférický tlak; přetlak, podtlak, vakuum; meteorologie a měření tlaku</li></ul>
						<h3>7. <a href="../../svetlo-a-jeho-sireni/">Světlo a jeho šíření</a></h3>
						<ul><li>zdroje světla; odraz a lom světla; stín a fáze Měsíce</li></ul>
						<h3>8. <a href="../../zrcadla-a-cocky/">Zrcadla a čočky</a></h3>
						<ul><li>rovinné a kulová zrcadla; čočky (spojka, rozptylka); oko a jeho vady; rozklad světla, duha a vnímání barev</li></ul>
					`,
					zapis: {
						body: [
							'Pohyb popisujeme pomocí trajektorie, dráhy a rychlosti; klid i pohyb vždy posuzujeme vzhledem k jinému tělesu.',
							'U sil sledujeme jejich velikost, směr a působiště; síly můžeme skládat a těžiště určuje působiště gravitační síly.',
							'Jednoduché stroje usnadňují práci a rovnováha páky závisí na síle a jejím rameni.',
							'V kapalinách a plynech pracujeme s tlakem, vztlakovou silou a zákony, které vysvětlují hydraulická zařízení i plování těles.',
							'Světlo se odráží a láme; zrcadla a čočky vytvářejí obrazy a oko nám umožňuje vnímat světlo a barvy.',
						],
					},
				},
			],
		},
	],
	'fyzika/8-rocnik': [
		{
			slug: 'mechanicka-prace-a-vykon',
			nazev: 'Mechanická práce a výkon',
			podtemata: [
				{
					slug: 'mechanicka-prace',
					nazev: 'Mechanická práce',
					interakce: 'prace',
					obsah: "<h2>Mechanická práce</h2>\n\n<p>Ve fyzice <strong>těleso koná práci</strong>, právě když působí na jiné těleso silou a tím ho <strong>posune ve směru síly</strong>. Musí platit obě podmínky zároveň — síla i posunutí.</p>\n<ul>\n<li>práci konáš, když tlačíš auto, které nechce nastartovat</li>\n<li>práci koná jeřáb, když zvedá náklad, nebo ty, když hodíš míč</li>\n<li>práci koná i <strong>silové pole</strong> — gravitační síla, když jablko spadne ze stromu, nebo magnetické pole, když přitáhne ocelovou kuličku</li>\n</ul>\n<p>Když paní ve frontě jen <strong>drží</strong> těžký nákup, práci nekoná. Působí na nákup silou, ale nákup se neposouvá.</p>\n\n<h3>Na čem práce závisí</h3>\n<p>Práce je tím větší, čím větší silou působíme a čím delší dráhu těleso ve směru síly urazí. Malou silou po krátké dráze vykonáme málo práce, velkou silou po dlouhé dráze mnoho práce.</p>\n\n<h3>Práce jako fyzikální veličina</h3>\n<p>Práci značíme <strong>W</strong> a měříme v <strong>joulech (J)</strong> (čti „džaul\"). Vypočítáme ji jako součin síly a dráhy, kterou těleso ve směru síly urazí:</p>\n<p style=\"font-size:1.3rem\"><strong>W = F · s</strong></p>\n<p>Těleso vykoná práci 1 J, když ho síla 1 N posune po dráze 1 m. Sílu dosazujeme v newtonech, dráhu v metrech.</p>\n<p>Pro velké hodnoty práce používáme násobky: <strong>1 kJ = 1 000 J</strong> a <strong>1 MJ = 1 000 000 J</strong>.</p>\n\n<h3>Kdy se práce nekoná</h3>\n<p>Práce se nekoná ve třech případech. Za prvé, když se těleso vůbec nepohybuje. Za druhé, když se těleso pohybuje pořád stejnou rychlostí po přímce — pak už na něj žádná síla nemusí působit. Za třetí, když síla míří kolmo na směr pohybu, třeba když neseš tašku vodorovně a tvá síla míří nahoru.</p>\n<p>Jinak řečeno: práce se koná jen tehdy, když nenulová síla působí na nenulové dráze a nesvírá s ní pravý úhel.</p>\n<ul>\n<li>Michal tlačí na tyč, ale tyč se nehne: F = 20 N, s = 0 m → práci nekoná (W = 0 J)</li>\n<li>Michal stejnou silou postrčí vozík a ten se rozjede: F = 20 N, s = 10 m → W = 200 J, práci koná</li>\n<li>Michal stojí na skateboardu, který už jede, ale sám se neodráží: F = 0 N, přesto ujede 250 m → práci nekoná</li>\n</ul>\n\n<h3>Práce při zvedání tělesa</h3>\n<p>Abychom těleso zvedli, musíme na něj působit silou stejně velkou jako jeho <strong>tíhová síla</strong>, jen míří opačným směrem — nahoru. Tíhovou sílu počítáme jako F = m · g, kde g = 10 N/kg.</p>\n<p><strong>Příklad:</strong> Chlapec zvedá závaží o hmotnosti 5 kg do výšky 1 m. Jakou práci vykoná?<br>\nF = m · g = 5 · 10 = <strong>50 N</strong><br>\nW = F · s = 50 · 1 = <strong>50 J</strong></p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Ze vzorce W = F · s odvodíme vztahy pro výpočet síly nebo dráhy, když známe práci:</p>\n<p><strong>s = W : F</strong>   a   <strong>F = W : s</strong></p>\n<p><strong>Příklad:</strong> Jakou silou táhne lokomotiva vlak, když na trati dlouhé 4 km vykoná práci 800 MJ?<br>\ns = 4 000 m, W = 800 000 000 J<br>\nF = W : s = 800 000 000 : 4 000 = <strong>200 000 N = 200 kN</strong></p>\n<p><strong>Příklad:</strong> Máma zvedá hračku o hmotnosti 600 g do výšky 150 cm. Jakou práci vykoná?<br>\nm = 600 g = 0,6 kg; s = 150 cm = 1,5 m<br>\nF = m · g = 0,6 · 10 = <strong>6 N</strong><br>\nW = F · s = 6 · 1,5 = <strong>9 J</strong></p>",
					zapis: {"vzorec":"W = F · s      (odvozeně: s = W : F,  F = W : s)","jednotky":["práce — značíme W, jednotka J (joule)","síla — značíme F, jednotka N (newton)","dráha — značíme s, jednotka m (metr)","Převody: 1 kJ = 1 000 J, 1 MJ = 1 000 000 J."],"vzorecSlovy":"práce = síla krát dráha","body":["W = F · s","síla + posunutí ve směru síly = práce","větší síla nebo delší dráha → větší práce","bez pohybu → práce nekoná","síla kolmo na dráhu → práce nekoná","i silové pole koná práci (gravitace)","zvedání: F = m · g"]},
					odkazy: [{"nazev":"Wordwall — Práce, výkon, energie (veličiny a značky)","url":"https://wordwall.net/resource/79662704/fyzika/fyzika-pr%C3%A1ce-v%C3%BDkon-energie-veli%C4%8Diny-a-zna%C4%8Dky"},{"nazev":"Hra pro třídu: Mechanická práce a výkon (Fyzikální liga)","url":"/hry/liga-karty?rocnik=8&celek=mechanicka-prace-a-vykon"}],
					materialy: [{"druh":"video","nazev":"Píseň: Mechanická práce a výkon 🎵","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/pisen-mechanicka-prace-a-vykon.m4a"},{"druh":"video","nazev":"Mechanická práce — 1. díl: síla a posunutí","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Mechanická práce — 2. díl: násobit, nebo dělit?","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog2.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Mechanická práce — 3. díl: práce při zvedání","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog3.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
				},
				{
					materialy: [{"druh":"video","nazev":"Píseň: Mechanická práce a výkon 🎵","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/pisen-mechanicka-prace-a-vykon.m4a"},{"druh":"infografika","nazev":"Infografika: Výkon — základní přehled","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/infografika-prehled.jpg"},{"druh":"video","nazev":"Výkon — 1. díl: práce, čas a watt","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog1-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 2. díl: vztahy práce, výkonu a času","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog2-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 3. díl: kilowatt a mechanická práce motoru","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog3-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 4. díl: výkon síly při pohybu","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog4-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
					slug: 'vykon',
					nazev: 'Výkon',
					interakce: 'vykon',
					obsah: "<h2>Výkon</h2>\n\n<p>Bagr a dělník s krompáčem mohou vykopat úplně stejnou jámu. Odvedou tedy stejně velkou <strong>práci</strong>. Bagr to ale zvládne mnohem rychleji. Právě rychlost konání práce popisuje nová veličina — <strong>výkon</strong>.</p>\n<p>Výkon nám pomáhá porovnávat stroje i lidi. Kdo nebo co zvládne stejnou práci za kratší čas, má větší výkon.</p>\n\n<h3>Výkon jako veličina</h3>\n<p>Výkon značíme velkým písmenem <strong>P</strong>. Pozor, malé <strong>p</strong> znamená ve fyzice něco úplně jiného — tlak.</p>\n<p>Jednotka výkonu se jmenuje <strong>watt</strong> a značí se <strong>W</strong>. Těleso má výkon 1 W, když za 1 sekundu vykoná práci 1 J.</p>\n\n<h3>Výpočet výkonu</h3>\n<p style=\"font-size:1.3rem\"><strong>P = W : t</strong></p>\n<p>Výkon spočítáme, když vykonanou práci <strong>W</strong> vydělíme časem <strong>t</strong>. Práci dosazujeme v joulech, čas v sekundách.</p>\n<p>Ze vzorce jde vyjádřit i práce a čas: <strong>W = P · t</strong> a <strong>t = W : P</strong>.</p>\n\n<h3>Jednotky výkonu</h3>\n<ul>\n<li><strong>1 kW</strong> (kilowatt) = <strong>1 000 W</strong></li>\n<li><strong>1 MW</strong> (megawatt) = <strong>1 000 000 W</strong></li>\n</ul>\n<p>Kilowatty vídáme třeba u vařiče nebo žehličky. Megawatty se používají u velkých strojů, třeba v elektrárnách.</p>\n<p><strong>Příklad:</strong> Elektrický vařič má výkon 1 000 W, tedy 1 kW. Za kolik sekund vykoná práci 5 000 J?<br>\nt = W : P = 5 000 : 1 000 = <strong>5 s</strong></p>\n\n<h3>Kilowatthodina (kWh)</h3>\n<p>Práci elektrických spotřebičů udáváme často v <strong>kilowatthodinách</strong> — pro velká čísla je to přehlednější než jouly.</p>\n<p>1 kWh je práce, kterou vykoná stroj o výkonu 1 kW za 1 hodinu. Platí <strong>1 kWh = 3 600 000 J</strong>.</p>\n<p>V kilowatthodinách se také účtuje elektřina. Kolik zaplatíme, záleží na tom, kolik kWh doma spotřebujeme.</p>\n\n<h3>Výkon a rychlost</h3>\n<p>Výkon souvisí i s rychlostí pohybu. Platí <strong>P = F · v</strong> — čím větší silou a rychlostí se těleso pohybuje, tím větší je jeho výkon.</p>\n<p>Proto auto zrychlí, když sešlápneš plyn: motoru se zvýší výkon, a tím i rychlost.</p>\n<p>💡 Starší jednotka výkonu motorů je <strong>koňská síla</strong> (značka hp). Platí <strong>1 hp = 0,735 kW</strong>. Dnes se stále používá hlavně u aut a motorek.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Motor jeřábu vynese betonový panel o hmotnosti 6 t do výšky 80 m za 1 minutu. Jaký má motor výkon?</p>\n<p>m = 6 000 kg → F<sub>g</sub> = m · g = 6 000 · 10 = 60 000 N; W = F · s = 60 000 · 80 = 4 800 000 J; t = 1 min = 60 s</p>\n<p>P = W : t = 4 800 000 : 60 = <strong>80 000 W = 80 kW</strong></p>\n<p>Auto jede tažnou silou motoru 1 200 N (1,2 kN) rychlostí 90 km/h. Jaký je výkon motoru?</p>\n<p>Nejdřív převedeme rychlost na m/s: 1 m/s = 3,6 km/h, takže 90 : 3,6 = 25 m/s.</p>\n<p>P = F · v = 1 200 · 25 = <strong>30 000 W = 30 kW</strong></p>\n<p>Elektromotor má výkon 9 kW a běží 16 hodin. Jakou práci (spotřebovanou energii) vykoná?</p>\n<p>W = P · t = 9 · 16 = <strong>144 kWh</strong></p>\n<p>Odkud se vzorec P = F · v bere? Práce je W = F · s a rychlost v = s : t. Když do P = W : t dosadíme W = F · s, dostaneme P = F · s : t = F · (s : t) = F · v.</p>",
					zapis: {"vzorec":"P = W : t      (odvozeně: W = P · t,  t = W : P)      P = F · v","jednotky":["výkon — značíme P, jednotka W (watt)","práce — značíme W, jednotka J (joule); pozor, písmeno W je zároveň značka práce i jednotka watt — pozná se podle polohy (W = 60 J, ale P = 60 W)","čas — značíme t, jednotka s (sekunda)","síla — značíme F, jednotka N (newton)","rychlost — značíme v, jednotka m/s (metr za sekundu)","Převody: 1 kW = 1 000 W, 1 MW = 1 000 000 W.","Převody: 1 kWh = 3 600 000 J.","1 hp (koňská síla) = 0,735 kW.","Do vzorce dosazuj v základních jednotkách: práci v J a čas v s; výkon vyjde ve W."],"vzorecSlovy":"výkon = vykonaná práce děleno časem","body":["výkon = jak rychle se koná práce","stejná práce, větší výkon → kratší čas","značka P (velké), pozor: malé p je tlak","P = W : t; práci v J, čas v s","1 W: za 1 s vykoná práci 1 J","1 kW = 1 000 W, 1 MW = 1 000 000 W","elektřina: kWh, 1 kWh = 3 600 000 J","P = F · v — výkon a rychlost"]},
					odkazy: [{"nazev":"Umíme fakta — Výkon (cvičení)","url":"https://www.umimefakta.cz/fyzika/cviceni-vykon"},{"nazev":"Wordwall — Výkon","url":"https://wordwall.net/resource/64369600"},{"nazev":"Hra pro třídu: Mechanická práce a výkon (Fyzikální liga)","url":"/hry/liga-karty?rocnik=8&celek=mechanicka-prace-a-vykon"}],
				},
			],
		},
		{
			slug: 'energie',
			nazev: 'Energie',
			podtemata: [
				{
					slug: 'energie-a-jeji-premeny',
					nazev: 'Energie a její přeměny',
					interakce: 'skatepark',
					obsah: "<h2>Energie a její přeměny</h2>\n\n<p>Aby člověk, zvíře nebo stroj mohl konat práci, musí mít v sobě něco, co se dá do práce proměnit. Tomu se říká <strong>energie</strong>. Energie se může proměnit v práci a práce se zase může uložit jako energie.</p>\n<p>Když napneš tětivu luku, luk získá energii. Při výstřelu tuto energii vykoná jako práci a vystřelí šíp. Podobně když zvedneš kladivo výš, získá větší energii — a při úderu do hřebíku vykoná větší práci.</p>\n\n<h3>Druhy energie</h3>\n<p>Energie má víc podob:</p>\n<ul>\n<li><strong>mechanická</strong> energie — souvisí s pohybem a polohou těles</li>\n<li><strong>chemická</strong> energie — uložená třeba v palivech nebo v jídle, které trávíme</li>\n<li><strong>elektrická</strong> energie</li>\n<li><strong>magnetická</strong> energie</li>\n<li><strong>světelná</strong> energie</li>\n<li><strong>jaderná</strong> energie</li>\n<li><strong>tepelná</strong> energie</li>\n</ul>\n<p>Každý z těchto druhů se dá přeměnit na jiný druh. Právě o tom mluví další odstavec.</p>\n\n<h3>Zákon zachování energie</h3>\n<p>Pro energii platí jedno důležité pravidlo: energii nejde vyrobit ani zničit. Dá se jen přeměnit z jednoho druhu na jiný.</p>\n<p>Podívej se, jak energie putuje na dlouhé cestě od Slunce až po žárovku u tebe doma. V jádru Slunce vzniká jaderná energie a mění se na světlo. Rostliny světlo zachytí a uloží jako chemickou energii. Za dlouhý čas se rostliny promění v uhlí — chemická energie v nich zůstane uložená.</p>\n<p>Když uhlí spálíme v elektrárně, chemická energie se změní na tepelnou energii páry. Pára roztočí turbínu, a tak vznikne pohybová energie.</p>\n<p>Turbína pohání generátor, který vyrábí elektrickou energii. Ta doputuje dráty až do žárovky, kde se promění na světlo a teplo.</p>\n<p>Energie tedy na své cestě mění podobu, ale nikdy nezmizí a ani nová energie z ničeho nevznikne.</p>\n\n<h3>Energie jako veličina</h3>\n<p>Energie je fyzikální veličina. Vyjadřuje, kolik práce může těleso vykonat — dá se říct, že energie je „uložená práce\".</p>\n<p>Značíme ji E a měříme v joulech (J), stejně jako práci. U elektrické energie se používají i jednotky watthodina (Wh) a kilowatthodina (kWh) — třeba na účtu za elektřinu.</p>",
					zapis: {"jednotky":["energie — značíme E, jednotka J (joule)","Převody: elektrická energie se udává i ve watthodinách (Wh) a kilowatthodinách (kWh)."],"zakon":"Energii není možné vytvořit ani zničit. Může se pouze přeměňovat z jednoho druhu energie v jiný!","body":["energie = uložená práce","práce → energie, energie → práce","druhy: mechanická, chemická, elektrická, magnetická, světelná, jaderná, tepelná","energie nevzniká ani nezaniká","jen se mění na jiný druh","E, jednotka J (joule)","elektřina: i Wh, kWh"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Zákon zachování energie', cesta: 'vDavukfb5qU' },
						{ druh: 'video', nazev: 'Píseň: Nedá se zničit 🎵', cesta: '/materialy/fyzika/8-rocnik/energie/energie-a-jeji-premeny/pisen-neda-se-znicit.m4a' },
					],
					odkazy: [
						{ nazev: 'ČT edu — Přeměna energie (pořad PORT)', url: 'https://edu.ceskatelevize.cz/video/5421-premena-energie' },
						{ nazev: 'Umíme fakta — Zákon zachování mechanické energie', url: 'https://www.umimefakta.cz/fyzika/cviceni-mechanicka-energie-zakon-zachovani-8-trida' },
					],
				},
				{
					slug: 'pohybova-a-polohova-energie',
					interakce: 'skatepark',
					nazev: 'Pohybová a polohová energie tělesa',
					obsah: "<h2>Pohybová a polohová energie tělesa</h2>\n\n<p>Když s tělesem konáme <strong>práci</strong> — třeba ho zvedneme nebo rozpohybujeme — těleso touto prací získá <strong>mechanickou energii</strong>. Mechanickou energii dělíme na dva druhy: <strong>pohybovou</strong> a <strong>polohovou</strong>.</p>\n\n<h3>Pohybová energie</h3>\n<p>Pohybovou energii (odborně <strong>kinetickou</strong>) má <strong>každé pohybující se těleso</strong>. Značíme ji E<sub>k</sub> a měříme v joulech (J), stejně jako všechny ostatní druhy energie.</p>\n<p>Čím větší je hmotnost tělesa, tím větší má pohybovou energii. Ještě víc záleží na rychlosti: když se rychlost zvětší 2×, pohybová energie vzroste 4× (2 · 2). Když se rychlost zvětší 3×, energie vzroste 9× (3 · 3).</p>\n<p>Pohybová energie souvisí se <strong>setrvačností</strong>. Naložený kamion se brzdí mnohem hůř než osobní auto a rychlé auto má delší brzdnou dráhu než pomalé. Proto jsou srážky při vysoké rychlosti nebezpečnější — těleso musí prudce snížit svou pohybovou energii na nulu.</p>\n<p>Pohybovou energii využíváme třeba u bowlingové koule, demoliční koule nebo vrtačky — vždy něco rozbíjí, drtí nebo posouvá.</p>\n\n<h3>Polohová energie v gravitačním poli</h3>\n<p>Polohovou energii (odborně <strong>potenciální</strong>) může mít i těleso, které <strong>se nehýbe</strong>. Má v sobě „ukrytý\" potenciál vykonat práci — třeba když spadne z výšky.</p>\n<p>Má ji každé těleso, které je ve výšce nad Zemí. Značíme ji E<sub>p</sub> a počítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>E<sub>p</sub> = m · g · h</strong></p>\n<p>Tady m je hmotnost tělesa v kilogramech, h je výška v metrech a g je stále stejné číslo, které na Zemi platí pro každé těleso: g = 10 N/kg.</p>\n<p>Výšku h měříme vždy k tomu, co je pro daný děj důležité. U parašutisty je to výška nad zemí, u kladiva výška nad hřebíkem, u nářadí padajícího ze stolu výška stolu nad podlahou.</p>\n<p>Polohovou energii v gravitačním poli využíváme třeba při skoku na lyžích nebo u kladiva a sekery, kde těžká hlava dopadá z výšky. Pád z velké výšky je naopak nebezpečný — těleso při dopadu odevzdá celou svou polohovou energii najednou.</p>\n\n<h3>Polohová energie pružnosti</h3>\n<p>Druhou podobou polohové energie je <strong>polohová energie pružnosti</strong>. Má ji každé natažené, stlačené nebo zkroucené pružné těleso — třeba stlačená pružina, natažená guma nebo ohnutý luk.</p>\n<p>Využíváme ji třeba při střelbě z luku, u natahovacích hraček nebo v pinballu, kde odražená pružina vystřelí kuličku.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Odkud se vzorec E<sub>p</sub> = m · g · h bere? Když těleso o hmotnosti m zvedáme do výšky h, působíme na něj silou F<sub>G</sub> = m · g (tíhová síla) po dráze s = h. Vykonáme tak práci W = F · s = m · g · h. Tahle práce se v tělese uloží jako polohová energie — proto E<sub>p</sub> = m · g · h.</p>\n<p>Ze vzorce si můžeme vyjádřit i hmotnost nebo výšku: m = E<sub>p</sub> : (g · h),  h = E<sub>p</sub> : (m · g).</p>\n<p>Příklad: cihla o hmotnosti 2 kg leží na lešení ve výšce 5 m, g = 10 N/kg. Její polohová energie je E<sub>p</sub> = m · g · h = 2 · 10 · 5 = 100 J.</p>\n<p>Kolik by musela cihla vážit, aby ve stejné výšce 5 m měla polohovou energii 200 J? m = E<sub>p</sub> : (g · h) = 200 : (10 · 5) = 4 kg.</p>",
					zapis: {"vzorec":"Eₚ = m · g · h      (odvozeně: m = Eₚ : (g · h),  h = Eₚ : (m · g))","jednotky":["pohybová energie — značíme Eₖ, jednotka J (joule)","polohová energie — značíme Eₚ, jednotka J (joule)","hmotnost — značíme m, jednotka kg (kilogram)","tíhová konstanta — značíme g, jednotka N/kg (newton na kilogram), na Zemi g = 10 N/kg","výška — značíme h, jednotka m (metr)","Převody: 1 kJ = 1 000 J, 1 MJ = 1 000 000 J."],"vzorecSlovy":"polohová energie = hmotnost krát tíhová konstanta krát výška","body":["pohybová Eₖ: má ji každé pohybující se těleso","Eₖ roste s hmotností a s druhou mocninou rychlosti","2× rychlost → 4× Eₖ,  3× rychlost → 9× Eₖ","polohová Eₚ: má ji i těleso v klidu, ve výšce","Eₚ = m · g · h","polohová pružnosti: natažené/stlačené/zkroucené pružné těleso"]},
					odkazy: [
						{ nazev: 'Wordwall — kvíz Energie (pohybová, polohová, zachování)', url: 'https://wordwall.net/resource/37856406/energie' },
					],
				},
				{
					slug: 'zakon-zachovani-mechanicke-energie',
					interakce: 'skatepark',
					nazev: 'Zákon zachování mechanické energie',
					obsah: "<h2>Zákon zachování mechanické energie</h2>\n\n<p>Když se díváme na pohybující se nebo zvednuté těleso, zajímá nás jeho <strong>mechanická energie</strong>. Je to součet dvou částí: <strong>pohybové energie</strong> (odborně kinetické) a <strong>polohové energie</strong> (odborně potenciální). Značíme ji E a měříme v joulech (J), stejně jako obě její části.</p>\n<p style=\"font-size:1.3rem\"><strong>E = E<sub>p</sub> + E<sub>k</sub></strong></p>\n<p>Například letící letadlo má obojí najednou: je vysoko nad zemí, takže má polohovou energii, a zároveň letí rychle, takže má i pohybovou energii. Jeho celková mechanická energie je součet obou.</p>\n<p>Mechanická energie úzce souvisí s prací. Když něco zvedneš, vykonáš práci a těleso touto prací získá polohovou energii — třeba sekera zvednutá nad hlavou. Při seknutí do dřeva se tahle energie zase promění zpátky v práci. Podobně bowlingová koule získá při hodu pohybovou energii prací tvé ruky a tuto energii pak využije k shození kuželek.</p>\n\n<h3>Příběh míčku: nahoře, dole, zase nahoře</h3>\n<p>Představ si míček, který spadne ze stromu. Nahoře na větvi se nehýbe — má jen <strong>polohovou energii</strong>, pohybová je nulová. Jak padá, klesá a zrychluje: polohová energie ubývá a pohybová přibývá. Těsně nad zemí je jeho rychlost největší — má jen <strong>pohybovou energii</strong>, polohová klesla na nulu.</p>\n<p>Stejně to funguje i obráceně. Když míček vyhodíš svisle vzhůru, na začátku má hodně pohybové energie. Čím výš letí, tím víc zpomaluje — pohybová energie se mění na polohovou. V nejvyšším bodě se na okamžik zastaví: pohybová energie je nulová, polohová je největší.</p>\n\n<h3>Zákon zachování mechanické energie</h3>\n<p>Platí to i obecně pro energii: „Energii nelze vyrobit ani zničit, pouze se přeměňuje z jednoho druhu na jiný.\" Pro mechanickou energii to fyzikové zapsali přesněji. „Pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stejný.\" Energie tedy nemizí ani nevzniká z ničeho — jen přeskakuje mezi polohovou a pohybovou podobou.</p>\n<p>Proto platí: kolik pohybové energie má míček u země, tolik měl polohové energie nahoře.</p>\n\n<h3>Energie putuje i mezi tělesy</h3>\n<p>Energie nemusí zůstat jen u jednoho tělesa — může přejít na jiné. Když vystřelíš z luku, natažená tětiva má polohovou energii pružnosti. Při výstřelu ji celou předá šípu, který se rozletí — tětiva zpomalí, šíp zrychlí. Podobně na kulečníku: koule, která se pohybuje, narazí do koule v klidu a předá jí část své pohybové energie.</p>\n\n<h3>V běžném životě energie trochu unikne</h3>\n<p>V opravdovém životě žádná přeměna neproběhne úplně beze ztráty. Část energie se vždycky změní třením na <strong>teplo</strong>, které se rozptýlí do okolí a k pohybu ho už nevyužijeme. Proto skateboardista na U-rampě nikdy nevyjede do stejné výšky, ze které vyjel — tření mu kousek energie sebralo.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Kulička se valí po zakřivené dráze (jako U-rampa) a nikde neztrácí energii třením. Na začátku je nahoře v klidu s celkovou mechanickou energií 10 J. Sleduj, jak se E<sub>p</sub> a E<sub>k</sub> mění, ale součet zůstává stále stejný:</p>\n<ul>\n<li>nahoře: E<sub>p</sub> = 10 J, E<sub>k</sub> = 0 J → E = 10 J</li>\n<li>o kousek níž: E<sub>p</sub> = 6 J, E<sub>k</sub> = 4 J → E = 10 J</li>\n<li>ještě níž: E<sub>p</sub> = 2 J, E<sub>k</sub> = 8 J → E = 10 J</li>\n<li>úplně dole: E<sub>p</sub> = 0 J, E<sub>k</sub> = 10 J → E = 10 J</li>\n</ul>\n<p>Na druhé straně rampy se to celé odehraje obráceně — kulička vystoupá zase do stejné výšky, protože jí zbylo přesně 10 J.</p>\n<p>Když známe celkovou energii E a jednu z jejích částí, druhou dopočítáme odečtením: E<sub>p</sub> = E − E<sub>k</sub> nebo E<sub>k</sub> = E − E<sub>p</sub>. Třeba u kuličky ve výšce, kde E<sub>k</sub> = 4 J a E = 10 J, vyjde E<sub>p</sub> = 10 − 4 = 6 J — přesně tolik, kolik ukazuje tabulka výše.</p>\n<p>Vzorec E<sub>p</sub> = m · g · h umíme použít i k výpočtu. Kámen o hmotnosti 3 kg leží na skále ve výšce 4 m, g = 10 N/kg. Jeho polohová energie nahoře je:</p>\n<p>E<sub>p</sub> = m · g · h = 3 · 10 · 4 = 120 J</p>\n<p>Kámen spadne dolů, kde je výška nulová, a tedy i polohová energie nulová. Podle zákona zachování se celá polohová energie proměnila na pohybovou, takže těsně nad zemí má kámen pohybovou energii E<sub>k</sub> = 120 J.</p>\n<p>Funguje to i naopak. Chlapec hodí míček o hmotnosti 1 kg svisle vzhůru a na začátku mu dá pohybovou energii 20 J. V nejvyšším bodě je celá tato energie polohová, E<sub>p</sub> = 20 J. Z toho spočítáme výšku výstupu:</p>\n<p>h = E<sub>p</sub> : (m · g) = 20 : (1 · 10) = 2 m</p>",
					zapis: {"vzorec":"E = Eₚ + Eₖ      (odvozeně: Eₚ = E − Eₖ,  Eₖ = E − Eₚ)","jednotky":["mechanická energie — značíme E, jednotka J (joule)","polohová energie — značíme Eₚ, jednotka J (joule)","pohybová energie — značíme Eₖ, jednotka J (joule)","Převody: 1 kJ = 1 000 J, 1 MJ = 1 000 000 J."],"vzorecSlovy":"mechanická energie = polohová energie + pohybová energie","zakon":"Pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stejný.","body":["E = Ep + Ek","pád: polohová → pohybová","hod vzhůru: pohybová → polohová","přenos: luk → šíp, koule → koule","tření → teplo, energie se ztrácí z pohybu"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Zákon zachování energie', cesta: 'vDavukfb5qU' },
					],
				},
				{
					slug: 'energeticka-hodnota-potravin',
					nazev: 'Energetická hodnota potravin',
					interakce: 'svacina',
					obsah: "<h2>Energetická hodnota potravin</h2>\n\n<p>Každý živý organismus potřebuje k životu energii. Člověk ji získává z potravy — z rostlin i z živočichů. Tělo v sobě „spaluje\" <strong>cukry a tuky</strong> spolu s kyslíkem, podobně jako motor spaluje palivo.</p>\n<p>Tuto energii tělo využívá hlavně na práci svalů, tedy na pohyb. Kousek energie si vezme i mozek — ten posílá zprávy mezi nervy pomocí elektrických signálů.</p>\n\n<h3>Jak se energetická hodnota zjišťuje</h3>\n<p>Vědci potravinu spálí v laboratoři a změří, kolik <strong>tepla</strong> se přitom uvolní. Právě toto teplo je energetická hodnota potraviny.</p>\n\n<h3>V jakých jednotkách se energie měří</h3>\n<p>Energie se měří v <strong>joulech (J)</strong>, u jídla nejčastěji v <strong>kilojoulech (kJ)</strong> — to je tisíc joulů. Na obalech potravin se ale pořád objevují i starší jednotky: <strong>kalorie (cal)</strong> a <strong>kilokalorie (kcal)</strong>.</p>\n\n<h3>Které živiny dávají nejvíc energie</h3>\n<p>Jídlo obsahuje tři hlavní <strong>živiny</strong>: bílkoviny, sacharidy (cukry a škroby) a tuky. Bílkoviny i sacharidy dají na 1 gram asi <strong>17 kJ</strong>. Tuky dají na 1 gram asi <strong>38 kJ</strong> — víc než dvojnásobek.</p>\n<p>Tuk má víc energie proto, že jeho molekuly obsahují víc vodíku a uhlíku. Při spalování se tyto látky slučují s kyslíkem a uvolňují teplo. Proto je tučné jídlo víc výživné, ale taky snáz vede k nadváze.</p>\n\n<h3>Energetická hodnota na obalu</h3>\n<p>Na obalu potraviny bývá energetická hodnota napsaná <strong>dvakrát</strong>. Jednou na <strong>100 gramů</strong> — aby šly potraviny mezi sebou porovnat. Podruhé na <strong>jednu porci</strong> — kolik sníš doopravdy najednou.</p>\n\n<h3>Kolik energie tělo potřebuje za den</h3>\n<p>Náctiletý člověk, který se běžně hýbe (škola, chůze, trochu sportu), potřebuje denně asi <strong>9 000 až 10 000 kJ</strong>. Kdo sportuje víc, potřebuje energie víc — klidně přes <strong>12 000 kJ</strong>. Kdo se moc nehýbe, potřebuje energie méně.</p>\n<p>Když člověk sní víc energie, než tělo spotřebuje, přebytek se v těle uloží jako <strong>tuk</strong>.</p>\n\n<h3>Kolik energie spálí běžná činnost</h3>\n<ul>\n<li>sezení, škola — asi <strong>250 kJ</strong> za hodinu</li>\n<li>chůze — asi <strong>800 kJ</strong> za hodinu</li>\n<li>fotbal, běh — asi <strong>2 000 kJ</strong> za hodinu</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Energii porce spočítáme z hodnoty na 100 g: vydělíme hmotnost porce stem a vynásobíme energetickou hodnotou na 100 g. Vzorcem: E = (m : 100) · E<sub>100</sub>.</p>\n<p>Müsli tyčinka má na obalu „1 700 kJ / 100 g\" a jedna tyčinka váží 50 g. Kolik kJ sníš, když ji sníš celou?</p>\n<p>E = (m : 100) · E<sub>100</sub> = (50 : 100) · 1 700 = 850 kJ</p>\n<p>Jogurt má na obalu „400 kJ / 100 g\" a kelímek váží 150 g. Kolik kJ je v celém kelímku?</p>\n<p>E = (m : 100) · E<sub>100</sub> = (150 : 100) · 400 = 600 kJ</p>\n<p>Hodina fotbalu spálí asi 2 000 kJ. Dvě müsli tyčinky dají 2 · 850 = 1 700 kJ — to je zhruba tolik, kolik hodina fotbalu spálí. Zbytek si tělo vezme z vlastních zásob.</p>",
					zapis: {"vzorec":"E = (m : 100) · E₁₀₀","jednotky":["energetická hodnota potraviny — značíme E, jednotka J (joule), u jídla častěji kJ (kilojoule)","hmotnost potraviny — značíme m, jednotka g (gram)","starší jednotky energie potravin: kalorie (cal), kilokalorie (kcal)","Převody: 1 kJ = 1 000 J."],"vzorecSlovy":"energie porce = (hmotnost porce : 100) krát energetická hodnota na 100 gramů","body":["energie z jídla → pohyb (svaly), mozek","hodnota potraviny = teplo při spálení","jednotky: J, kJ (nové); cal, kcal (staré, u jídla)","bílkoviny, sacharidy: asi 17 kJ/g","tuky: asi 38 kJ/g (nejvíc)","na obalu: hodnota na 100 g i na porci","denní potřeba: asi 9 000–10 000 kJ","přebytek energie z jídla → tuk"]},
					odkazy: [
						{ nazev: 'Společnost pro výživu — Energetická hodnota potravin', url: 'https://www.vyzivaspol.cz/energeticka-hodnota-potravin/' },
						{ nazev: '100+1 zahraniční zajímavost — Jak se zjišťuje energetická hodnota potravin', url: 'https://www.stoplusjednicka.cz/kdyz-se-pali-jidlo-jak-se-zjistuje-energeticka-hodnota-potravin' },
					],
				},
				{
					slug: 'vnitrni-energie-telesa',
					interakce: 'vnitrni-energie',
					nazev: 'Vnitřní energie tělesa',
					obsah: "<h2>Vnitřní energie tělesa</h2>\n\n<h3>Z čeho jsou tělesa (opakování)</h3>\n<p>Všechna tělesa jsou složená z drobounkých <strong>částic</strong> — atomů a molekul. Tyto částice se neustále a nepravidelně pohybují a nikdy se úplně nezastaví.</p>\n<p>Poznáme to třeba na čaji. V horké vodě se barvivo rozpustí samo a rychle — tomu se říká difuze. Ve studené vodě to jde mnohem pomaleji, protože čím vyšší teplota, tím rychlejší pohyb částic. Podobný důkaz je i <strong>Brownův pohyb</strong>: zrnka pylu ve vodě se pod mikroskopem stále chvějí, protože do nich narážejí částice vody.</p>\n<p>Mezi částicemi navíc působí síly, které je drží u sebe, ale nedovolí jim srazit se úplně dohromady.</p>\n\n<h3>Částice v pevné látce, kapalině a plynu</h3>\n<p>V <strong>pevné látce</strong> částice jen kmitají na svém místě — silné síly jim nedovolí ho opustit. V <strong>kapalině</strong> síly drží částice pohromadě, ale ty se mohou pohybovat a klouzat kolem sebe. V <strong>plynu</strong> na sebe částice skoro vůbec nepůsobí a pohybují se volně všemi směry.</p>\n\n<h3>Každá částice má svoji energii</h3>\n<p>Protože se částice pohybují, má každá z nich <strong>pohybovou energii</strong>. A protože pořád mírně mění svou polohu vůči sousedním částicím, má i <strong>polohovou energii</strong>. Platí to pro úplně každou částici v tělese — v kameni, ve vodě i ve vzduchu.</p>\n\n<h3>Co je vnitřní energie tělesa</h3>\n<p>Sečteme-li energie úplně všech částic v tělese, dostaneme jeho <strong>vnitřní energii</strong>. Čím víc částic těleso má a čím jsou rychlejší (tedy čím vyšší má těleso teplotu), tím větší vnitřní energii má.</p>\n<p>Pozor: vnitřní energie tělesa se netýká pohybu ani polohy celého tělesa. Letící míč i stejný míč v klidu na zemi mohou mít úplně stejnou vnitřní energii. Stačí, aby měly stejnou teplotu a stejný počet částic. To, jestli míč letí, popisuje jiná energie — pohybová a polohová energie tělesa jako celku, ne jeho vnitřní energie.</p>\n\n<h3>Jak vnitřní energii tělesa změníme</h3>\n<p>Vnitřní energii tělesa zvýšíme:</p>\n<ul>\n<li><strong>zahřátím</strong> — částice se pohybují rychleji</li>\n<li><strong>konáním práce</strong> — třením, stlačením nebo ohýbáním tělesa</li>\n<li><strong>přijetím tepla</strong> od teplejšího tělesa</li>\n<li><strong>přidáním částic</strong> — třeba dofouknutím pneumatiky</li>\n</ul>\n<p>Když vnitřní energie tělesa roste, těleso se zahřívá — jeho <strong>teplota stoupá</strong>. Když vnitřní energie klesá, teplota tělesa <strong>klesá</strong>.</p>\n\n<h3>Vnitřní energie kolem nás</h3>\n<p>S růstem vnitřní energie třením se setkáváme často. Při brzdění se zahřívají brzdy auta, při vrtání se zahřívá vrták. Ohýbáš-li drát pořád na stejném místě, nakonec se v tom místě roztaví a přetrhne. Podobně se zahřívá i topná spirála ve vařiči, kterou prochází elektrický proud.</p>\n<p>Tohoto zahřívání třením lidé využívají — třeba když rozdělávají oheň třením dřeva o dřevo, nebo si třou ruce, aby je zahřáli. Přehřátí ale může materiál i poškodit, a proto se stroje <strong>chladí</strong> — vodou, olejem nebo vzduchem. Tak se chladí třeba vrtaný zub u zubaře, motor auta, nebo dokonce vesmírné lodě, když prolétají atmosférou.</p>",
					zapis: {"jednotky":["vnitřní energie tělesa — jednotka J (joule), stejně jako každá jiná energie","vnitřní energie nemá na základní škole zvláštní značku (aby se nepletla s napětím U)"],"body":["vnitřní energie = energie všech částic","závisí na počtu částic a na teplotě","nezávisí na pohybu ani poloze tělesa","zvýšení: zahřátí, práce, teplo, více částic","roste energie → roste teplota","klesá energie → klesá teplota"]},
					odkazy: [
						{ nazev: 'Fyzika007 — Vnitřní energie tělesa (výklad + příklady)', url: 'https://www.fyzika007.cz/molekulov%C3%A1-fyzika-atermika/vnit%C5%99n%C3%AD-energie-t%C4%9Blesa' },
						{ nazev: 'Eductify — procvičení: Změny vnitřní energie (8. ročník)', url: 'https://www.eductify.com/cs/fyzika/c80/8-rocnik-zs/p-zvet/zmeny-vnitrne-energie' },
					],
				},
				{
					slug: 'tepelna-vymena-a-teplo',
					interakce: 'kalorimetr',
					nazev: 'Tepelná výměna, teplo, měrná tepelná kapacita',
					obsah: "<h2>Tepelná výměna, teplo, měrná tepelná kapacita</h2>\n\n<h3>Co je tepelná výměna</h3>\n<p>Když se dotknou dvě tělesa s <strong>různou teplotou</strong>, nastává mezi nimi <strong>tepelná výměna</strong>. Částice teplejšího tělesa se pohybují rychleji a při srážkách předávají část své energie částicím chladnějšího tělesa. Rychlé částice tak zpomalují a pomalé zrychlují.</p>\n<p>Teplejší těleso postupně <strong>ztrácí</strong> vnitřní energii, chladnější těleso ji <strong>získává</strong>. Výměna skončí ve chvíli, kdy se teploty obou těles <strong>vyrovnají</strong>.</p>\n\n<h3>Teplo — energie, která putuje</h3>\n<p>Energii, kterou teplejší těleso předá chladnějšímu při tepelné výměně, nazýváme <strong>teplo</strong>. Značíme ho <strong>Q</strong> a měříme v joulech (J), stejně jako jinou energii. Teplejší těleso teplo <strong>odevzdává</strong>, chladnější ho <strong>přijímá</strong>.</p>\n<p>Pokud jsou obě tělesa při výměně izolována od okolí (teplo nikam neuniká), platí, že odevzdané teplo je přesně stejně velké jako teplo přijaté.</p>\n\n<h3>Teplo není totéž co teplota</h3>\n<p>Tahle dvě slova se snadno pletou. <strong>Teplota</strong> popisuje, jak je těleso právě teď zahřáté — měříme ji teploměrem a značíme <strong>t</strong>, jednotka je stupeň Celsia (°C), vědci používají kelvin (K). <strong>Teplo</strong> je naopak energie, která se při výměně přenáší — nedá se přímo změřit, jen dopočítat.</p>\n\n<h3>Na čem závisí množství tepla</h3>\n<p>Kolik tepla těleso při ohřívání přijme, závisí na třech věcech. Za prvé na <strong>rozdílu teplot</strong> — čím víc chceme těleso ohřát, tím víc tepla potřebujeme. Ohřát hrnec studené vody jen na mytí nádobí stačí méně tepla než uvařit stejnou vodu na čaj.</p>\n<p>Za druhé na <strong>hmotnosti</strong> — čím víc látky ohříváme, tím víc tepla je třeba. Uvařit vodu na čaj pro 2 lidi spotřebuje méně tepla než stejně studenou vodu pro 20 lidí.</p>\n<p>Za třetí na <strong>látce</strong> samotné — každá látka se ohřívá jinak rychle. Olej se rozehřeje na vysokou teplotu mnohem rychleji než stejné množství vody.</p>\n\n<h3>Měrná tepelná kapacita c</h3>\n<p>Aby šlo látky podle rychlosti ohřívání porovnat, zavedli fyzikové veličinu <strong>měrná tepelná kapacita</strong>, značku <strong>c</strong>. Říká nám, <strong>kolik tepla musíme dodat 1 kg látky, aby se ohřála o 1 °C</strong>. Jednotka je joule na kilogram a stupeň Celsia, zapisujeme J/(kg·°C).</p>\n<p>Voda má měrnou tepelnou kapacitu <strong>c = 4 200 J/(kg·°C)</strong>. Znamená to, že na ohřátí 1 kg vody o 1 °C potřebujeme 4 200 J tepla. Hodnoty pro další látky najdeme ve fyzikálních tabulkách.</p>\n<p>Látky s <strong>vysokým c</strong> (třeba voda) se ohřívají i chladnou pomalu a dokážou v sobě udržet hodně energie — používají se jako zásobník tepla, třeba v topení nebo v chladičích. Látky s <strong>nízkým c</strong> (třeba kovy) se naopak ohřívají i chladnou rychle — jsou to dobré tepelné vodiče, používají se třeba na žebra chladičů.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Teplo, které těleso přijme, spočítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>)</strong></p>\n<p>kde m je hmotnost tělesa, c měrná tepelná kapacita látky, t<sub>1</sub> počáteční teplota a t<sub>2</sub> konečná teplota.</p>\n<p>Příklad: v konvici ohříváme 2 kg vody z 20 °C na 30 °C. Rozdíl teplot je t<sub>2</sub> − t<sub>1</sub> = 30 − 20 = 10 °C. Teplo, které voda přijme:</p>\n<p>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) = 2 · 4 200 · 10 = 84 000 J = 84 kJ</p>\n<p>Funguje to i naopak — když známe teplo, dopočítáme třeba hmotnost: m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)]. Kolik kg vody ohřejeme o 10 °C, když máme k dispozici 42 000 J tepla?</p>\n<p>m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)] = 42 000 : (4 200 · 10) = 42 000 : 42 000 = 1 kg</p>",
					zapis: {"vzorec":"Q = m · c · (t₂ − t₁)      (odvozeně: m = Q : [c · (t₂ − t₁)],  c = Q : [m · (t₂ − t₁)])","jednotky":["teplo — značíme Q, jednotka J (joule)","hmotnost — značíme m, jednotka kg (kilogram)","měrná tepelná kapacita — značíme c, jednotka J/(kg·°C)","počáteční teplota — značíme t₁, jednotka °C (stupeň Celsia)","konečná teplota — značíme t₂, jednotka °C (stupeň Celsia)","1 kJ = 1 000 J,  1 MJ = 1 000 000 J,  1 kg = 1 000 g","Do vzorce dosazuj teplo v J, hmotnost v kg, kapacitu v J/(kg·°C) a teploty v °C."],"vzorecSlovy":"teplo = hmotnost × měrná tepelná kapacita × rozdíl teplot (konečná teplota mínus počáteční teplota)","zakon":"Pokud jsou dvě tělesa při tepelné výměně tepelně izolována od okolí, velikost odevzdaného tepla teplejším tělesem je stejně velká jako velikost tepla přijatého chladnějším tělesem.","body":["teplejší → chladnější, dotykem","Q = teplo (J), t = teplota (°C) — není totéž","teplo: záleží na Δt, hmotnosti, látce","c = kolik J ohřeje 1 kg o 1 °C","voda: vysoké c, kovy: nízké c","Q = m · c · (t₂ − t₁)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Teplo a teplota (ústřední topení)', cesta: 'YLiXzSWoRRg' },
					],
				},
			],
		},
		{
			slug: 'tepelne-motory',
			nazev: 'Tepelné motory',
			podtemata: [
				{
					slug: 'tepelny-motor-parni-stroj',
					nazev: 'Tepelný motor, parní stroj, parní turbína',
					interakce: 'ucinnost-motoru',
					obsah: "<h2>Tepelný motor, parní stroj, parní turbína</h2>\n\n<p><strong>Tepelný motor</strong> je stroj, který mění <strong>teplo na pohyb</strong>. Patří sem parní stroje, spalovací motory i reaktivní motory. Každý typ má jinou <strong>účinnost</strong> — jinak dobře využije teplo na pohyb.</p>\n\n<h3>Jak pára pohání píst</h3>\n<p>Voda se v nádrži zahřeje až k varu a vznikne pára. Horká pára má velký tlak a tlačí na píst nebo na lopatky. Tím se teplo mění na pohyb — to je základ každého parního stroje.</p>\n\n<h3>Kdo vymyslel parní stroj</h3>\n<ul>\n<li><strong>Hérón z Alexandrie</strong> (1. století) postavil první parní stroj, takzvanou Hérónovu baňku. Pára z ní unikala zahnutými trubicemi a roztáčela kovovou kouli. Sloužilo to ale jen k zábavě.</li>\n<li><strong>Denis Papin</strong> (17. století) vynalezl tlakový hrnec. Pára v něm zvedala píst, a tak dokázala zvedat i těžká břemena.</li>\n<li><strong>Thomas Newcomen</strong> (18. století) Papinův stroj zdokonalil. Používal ho k čerpání vody z dolů.</li>\n<li><strong>James Watt</strong> (1784) parní stroj výrazně vylepšil a <strong>nastartoval průmyslovou revoluci</strong>.</li>\n</ul>\n\n<h3>Jak Watt stroj vylepšil</h3>\n<p>Watt přidal <strong>klikový mechanismus</strong>, který měnil přímočarý pohyb pístu na otáčení kola. <strong>Setrvačník</strong> zajistil, že se kolo točilo plynule. <strong>Šoupátko</strong> pouštělo páru střídavě na obě strany pístu, takže stroj pracoval oběma směry a měl větší výkon.</p>\n\n<h3>Kde se parní stroj používal</h3>\n<p>Parní stroj poháněl stroje v továrnách a čerpal vodu z dolů. Jezdily s ním lokomotivy i parníky, používal se i v zemědělství — třeba u parního pluhu. Čech <strong>Josef Božek</strong> postavil první český parní automobil (1815) a první český parník na Vltavě (1817).</p>\n\n<h3>Nevýhody parního stroje</h3>\n<p>Parní stroj byl velký a těžký. Vyžadoval náročnou údržbu a časté doplňování vody. Hrozilo u něj i riziko výbuchu kotle. Jeho účinnost byla jen asi <strong>15 %</strong> — většina tepla se ztratila. Navíc znečišťoval prostředí.</p>\n\n<h3>Parní turbína</h3>\n<p>V parní turbíně roztáčí pára <strong>lopatky</strong>, a tak se energie páry mění na otáčivý pohyb. Turbíny pohánějí generátory v <strong>tepelných elektrárnách</strong> o výkonu 200 až 600 megawattů. Jejich účinnost je vyšší než u parního stroje — až <strong>35 %</strong>.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Účinnost říká, kolik procent tepla se promění na pohyb. Zbytek se ztratí jako teplo, které unikne do okolí.</p>\n<p><strong>Příklad:</strong> Parní stroj dostane 1 000 J tepla a má účinnost 15 %. Na pohyb promění 1 000 · 0,15 = 150 J. Zbylých 850 J unikne jako teplo.</p>\n<p><strong>Příklad:</strong> Parní turbína dostane také 1 000 J tepla, ale má účinnost 35 %. Na pohyb promění 1 000 · 0,35 = 350 J — víc než dvojnásobek parního stroje.</p>",
					zapis: {"jednotky":["teplo — značíme Q, jednotka J (joule)","výkon — značíme P, jednotka W (watt)","účinnost — značíme η, jednotka % (procento)"],"body":["tepelný motor: teplo → pohyb","pára tlačí na píst nebo lopatky","Watt: klika, setrvačník, šoupátko","parní stroj: doprava, průmysl, zemědělství","malá účinnost, velké ztráty tepla","turbína: pára roztáčí lopatky, elektrárny"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Parní stroj — Síla moderního světa', cesta: '1mdQ5Th3Vro' },
						{ druh: 'video', nazev: 'Píseň: Teplo na pohyb 🎵', cesta: '/materialy/fyzika/8-rocnik/tepelne-motory/tepelny-motor-parni-stroj/pisen-teplo-na-pohyb.m4a' },
					],
					odkazy: [
						{ nazev: 'ČT edu — Vznik parního stroje', url: 'https://edu.ceskatelevize.cz/video/3536-vznik-parniho-stroje' },
						{ nazev: 'Techmania — Princip parního stroje (animace)', url: 'https://digital.techmania.cz/stroje/princip-parniho-stroje/' },
						{ nazev: 'Wordwall — kvíz Tepelné motory', url: 'https://wordwall.net/cs/resource/111383163/tepeln%C3%A9-motory' },
					],
				},
				{
					slug: 'spalovaci-motory',
					nazev: 'Spalovací motory',
					interakce: 'motor',
					obsah: "<h2>Spalovací motory</h2>\n\n<p>Spalovací motor je tepelný motor. Palivo v něm hoří přímo uvnitř motoru, ne mimo něj jako u parního stroje. Chemická energie paliva se mění nejdřív na teplo a pak na pohyb.</p>\n\n<h3>Z čeho se motor skládá</h3>\n<p>Uvnitř motoru je <strong>válec</strong> a v něm se pohybuje <strong>píst</strong>. Píst je spojený s <strong>klikovým hřídelem</strong>, který mění jeho pohyb nahoru a dolů na otáčení kol. Do válce vede <strong>sací ventil</strong>, kterým přitéká palivo se vzduchem, a <strong>výfukový ventil</strong>, kterým odchází spaliny.</p>\n\n<h3>Jak motory dělíme</h3>\n<p>Podle paliva a způsobu zapálení dělíme motory na <strong>zážehové</strong> a <strong>vznětové</strong>. Podle počtu pohybů pístu v jednom cyklu je dělíme na <strong>čtyřtaktní</strong> a <strong>dvoutaktní</strong>.</p>\n\n<h3>Čtyři doby zážehového motoru (Otto, 1876)</h3>\n<p>Zážehový motor spaluje <strong>benzín</strong>. Palivo se ve válci smíchá se vzduchem — kdysi to dělal <strong>karburátor</strong> (přístroj na míchání paliva se vzduchem), dnešní motory palivo přímo <strong>vstřikují</strong> tenkou tryskou. Motor pracuje ve čtyřech dobách:</p>\n<ol>\n<li><strong>sání</strong> — sací ventil se otevře, píst jde dolů a nasaje směs vzduchu a benzínu</li>\n<li><strong>stlačení</strong> — oba ventily jsou zavřené, píst jde nahoru a směs stlačí, tím se zahřeje</li>\n<li><strong>výbuch</strong> — těsně před vrcholem přeskočí jiskra ze <strong>zapalovací svíčky</strong>, směs vybuchne a horké plyny tlačí píst dolů — jen tahle doba koná práci</li>\n<li><strong>výfuk</strong> — výfukový ventil se otevře, píst jde nahoru a vytlačí spálené plyny ven</li>\n</ol>\n<p>Pak se všechny čtyři doby znovu opakují. Účinnost zážehového motoru je <strong>20 až 33 %</strong> — zbytek paliva se promění jen v odpadní teplo. Používá se v osobních autech i malých letadlech. V autě bývají čtyři válce. Střídají se, takže vždy jeden zrovna pracuje a motor běží plynule.</p>\n\n<h3>Vznětový motor — motor bez jiskry</h3>\n<p>Vznětový (Dieselův) motor spaluje <strong>naftu</strong>. Nemá zapalovací svíčku. Píst stlačí vzduch ve válci tak silně, že se sám prudce zahřeje, a teprve pak se do horkého vzduchu <strong>vstříkne</strong> nafta — a sama se vznítí.</p>\n<p>Vznětový motor má účinnost <strong>30 až 40 %</strong>, tedy vyšší než zážehový. Používá se v autech, nákladních autech, autobusech i lokomotivách. Je ale těžší a dražší a produkuje víc emisí, proto má výfuk vybavený <strong>filtrem pevných částic</strong>. Často má i <strong>turbodmychadlo</strong> — malý kompresor, který natlačí do válce víc vzduchu a motor tak má víc síly.</p>\n\n<h3>Dvoutaktní motor</h3>\n<p>Dvoutaktní motor je jednodušší. Nemá žádné ventily — sání i výfuk řídí svým pohybem přímo píst. Celý cyklus proběhne jen ve dvou fázích místo čtyř: sání se stlačením a výbuch s výfukem.</p>\n<p>Je menší a lehčí než čtyřtaktní motor, proto se používá v motocyklech, sekačkách nebo křovinořezech. Nevýhodou je, že se do benzínu musí přidávat olej, motor víc znečišťuje vzduch a má nižší účinnost.</p>\n\n<h3>Co motor potřebuje, aby fungoval</h3>\n<p>Při výbuchu ve válci vznikne teplota kolem <strong>2000 °C</strong>, proto se motor musí <strong>chladit</strong> vodou nebo vzduchem — jinak by se roztavil. Píst potřebuje i <strong>mazání</strong> olejem, aby se ve válci nezadřel. A protože se motor sám nerozeběhne, musí se před spuštěním <strong>nastartovat</strong> — dnes to udělá elektrický startér poháněný autobaterií.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Zážehový motor má účinnost aspoň 20 %. Sportovní auto spálí palivo s energií 25 000 kJ. Kolik z této energie motor skutečně promění na pohyb auta?</p>\n<p>20 % z 25 000 kJ = 25 000 : 100 · 20 = 5 000 kJ.</p>\n<p>Zbylých 20 000 kJ (80 %) se ztratí jako odpadní teplo. Vznětový motor je úspornější — má účinnost až 40 %. Nákladní auto spálí naftu s energií 15 000 kJ. Na pohyb z ní motor využije:</p>\n<p>40 % z 15 000 kJ = 15 000 : 100 · 40 = 6 000 kJ.</p>",
					zapis: {"jednotky":["účinnost motoru — udává se v % (procentech); ukazuje, kolik energie z paliva se promění na pohyb (zbytek je ztracené teplo)"],"body":["spalovací motor: palivo hoří uvnitř motoru","válec, píst, klikový hřídel, ventily","zážehový: benzín + jiskra ze svíčky","vznětový: nafta, zapálí se stlačením (bez svíčky)","4 doby: sání, stlačení, výbuch, výfuk","4 válce → vždy jeden pracuje","dvoutaktní: bez ventilů, jen 2 fáze, lehčí","motor je nutné startovat, chladit a mazat"]},
					odkazy: [
						{ nazev: 'Techmania — Čtyřdobý zážehový motor', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/plyny/tepelne-motory/ctyrdoby-zazehovy-motor' },
						{ nazev: 'Wordwall — kvíz Spalovací motory', url: 'https://wordwall.net/cs/resource/108360943/spalovací-motory-kviz' },
					],
				},
			],
		},
		{
			slug: 'teplo-a-zmeny-skupenstvi',
			nazev: 'Teplo a změny skupenství',
			podtemata: [
				{
					slug: 'teplo-a-premeny-skupenstvi',
					nazev: 'Teplo a přeměny skupenství látek',
					interakce: 'ohrev',
					obsah: "<h2>Teplo a přeměny skupenství látek</h2>\n\n<p>Každá látka se vyskytuje ve třech skupenstvích: pevném, kapalném nebo plynném. Ve všech třech je tvořená stejnými malými částicemi — atomy nebo molekulami. Liší se jen tím, jak moc se částice pohybují a jak silně na sebe navzájem působí.</p>\n\n<h3>Jak se částice chovají</h3>\n<ul>\n<li><strong>pevné látky</strong> — částice jsou blízko sebe a silně se přitahují, to dává tělesu pevnost; jen kmitají na místě, a proto má těleso stálý tvar</li>\n<li><strong>kapalné látky</strong> — částice jsou také blízko sebe, a proto se kapalina <strong>nedá stlačit</strong>; kloužou po sobě, přitahují se, takže tvoří kapky, a v klidu vytvářejí vodorovnou hladinu</li>\n<li><strong>plynné látky</strong> — částice jsou daleko od sebe a pohybují se rychle a volně; dají se stlačit a <strong>rozpínají se</strong> — vyplní celou nádobu, do které je dáme — a nemají žádný stálý tvar</li>\n</ul>\n<p>Pevné látky dělíme na dvě skupiny. Krystalické látky mají částice uspořádané pravidelně a tají vždy při stejné teplotě — patří sem třeba led, sůl nebo kovy. Amorfní látky mají uspořádání nepravidelné a při zahřívání postupně měknou — patří sem třeba sklo, vosk, plast nebo čokoláda.</p>\n\n<h3>Co mění skupenství</h3>\n<p>Skupenství látky nejvíc ovlivňuje teplota. Čím je teplota vyšší, tím rychleji se částice pohybují a tím volněji se od sebe mohou vzdálit. Menší vliv má i tlak okolí: vysoký tlak brání částicím se oddálit, nízký tlak jim to naopak usnadňuje.</p>\n<ul>\n<li><strong>dodáváme teplo</strong>, teplota roste: pevné skupenství se mění na kapalné (<strong>tání</strong>) a kapalné na plynné (<strong>vypařování, var</strong>)</li>\n<li><strong>odebíráme teplo</strong>, teplota klesá: plynné skupenství se mění na kapalné (<strong>kapalnění</strong>) a kapalné na pevné (<strong>tuhnutí</strong>)</li>\n</ul>\n\n<h3>💡 Sublimace</h3>\n<p>U některých látek se dá pevná látka změnit rovnou na plynnou, bez toho, aby se nejdřív stala kapalinou. Říká se tomu sublimace. Příkladem je jód, který mění pevné krystalky rovnou na fialovou páru. Podobně vzniká i ohon komet. Opačný děj, kdy plyn přejde rovnou na pevnou látku, se nazývá desublimace.</p>",
					zapis: {"body":["3 skupenství: pevné, kapalné, plynné — stejné částice","pevné: částice kmitají na místě, mají pevný tvar","kapalné: částice kloužou po sobě, nedají se stlačit, tvoří hladinu","plynné: částice daleko od sebe, rychlé, stlačitelné, rozpínají se","krystalické látky: pravidelné, tají najednou (led, sůl, kovy)","amorfní látky: nepravidelné, měknou postupně (sklo, vosk, plast)","skupenství mění hlavně teplota, trochu i tlak","teplo dodáváme: tání → vypařování/var","teplo odebíráme: kapalnění → tuhnutí","sublimace: pevné → plynné rovnou (jód); opak desublimace"]},
					odkazy: [
						{ nazev: 'Změny skupenství — tuhnutí, tání, var, kondenzace, sublimace (OnlineSchool.cz)', url: 'https://onlineschool.cz/fyzika/zmeny-skupenstvi/' },
						{ nazev: 'Skupenství látek (Fyzika na Vltavě)', url: 'https://www.zsvltava.cz/fyzika/?p=253' },
					],
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Teplo mění skupenství 🎵', cesta: '/materialy/fyzika/8-rocnik/teplo-a-zmeny-skupenstvi/teplo-a-premeny-skupenstvi/pisen-teplo-meni-skupenstvi.m4a' },
					],
				},
				{
					slug: 'tani',
					nazev: 'Tání',
					interakce: 'ohrev',
					obsah: "<h2>Tání</h2>\n<p>Když pevnou látku zahříváme, její teplota stoupá. Jakmile dosáhne <strong>teploty tání</strong>, začne se měnit z pevné látky na kapalinu. Této přeměně říkáme <strong>tání</strong>. U kovů se jí říká <strong>tavení</strong>.</p>\n\n<h3>Teplota tání</h3>\n<p>Teplotě, při které látka taje, říkáme <strong>teplota tání</strong> a značíme ji t<sub>t</sub>. Každá látka taje při jiné teplotě. <strong>Led taje při 0 °C.</strong> Cín taje při 232 °C, olovo při 327 °C, hliník při 658 °C, měď při 1084 °C a železo při 1535 °C.</p>\n<p>Látky s pravidelně uspořádanými částicemi (odborně <strong>krystalické</strong>) — třeba led, sůl nebo kovy — tají vždy při <strong>jedné</strong> přesné teplotě. Beztvaré látky (odborně <strong>amorfní</strong>) — třeba vosk nebo sklo — nejdřív jen měknou a tají v celém <strong>rozmezí</strong> teplot.</p>\n<p>Teplotu tání jde i ovlivnit. Sůl na silnici sníží teplotu tání ledu, takže voda zůstane kapalná i při −20 °C. Vysoký tlak ji sníží také — pod ostřím brusle taje led už při asi −8 °C.</p>\n\n<h3>Co se děje s částicemi</h3>\n<p>Při tání se částice uvolňují ze svých pevných vazeb a začínají se volně pohybovat. Proto se z pevné látky stává kapalina. Teplota se přitom vůbec nemění — zůstává na teplotě tání, dokud se úplně všechna pevná látka nepřemění na kapalinu. Teprve potom teplota kapaliny zase začne stoupat.</p>\n<p>Představ si kostku ledu, kterou zahříváme v hrnci. Teplota ledu roste, dokud nedosáhne 0 °C. Pak se led začne měnit na vodu a teplota zůstává na 0 °C, i když pořád přidáváme teplo. Teprve až roztaje úplně poslední kousek ledu, začne teplota vody znovu stoupat.</p>\n\n<h3>Skupenské teplo tání</h3>\n<p>Aby látka roztála, potřebuje teplo. Tomuto teplu říkáme <strong>skupenské teplo tání</strong> a značíme ho L<sub>t</sub>. Měříme ho v joulech (J), stejně jako každé jiné teplo. Toto teplo nezvyšuje teplotu — celé se spotřebuje na to, aby se částice uvolnily z vazeb.</p>\n<p>Různé látky potřebují na roztátí různé množství tepla. Proto fyzikové zavedli <strong>měrné skupenské teplo tání</strong> — teplo potřebné k roztátí 1 kilogramu látky. Značíme ho l<sub>t</sub> a měříme v joulech na kilogram (J/kg). Měrné skupenské teplo tání ledu je <strong>332 kJ/kg</strong>. Měrné skupenské teplo tání a tuhnutí téže látky je stejné.</p>\n<p>Skupenské teplo tání spočítáme podle vzorce <strong>L<sub>t</sub> = l<sub>t</sub> · m</strong>, kde m je hmotnost látky, která taje. Čím víc látky chceme roztavit, tím víc tepla potřebujeme.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Vzorec L<sub>t</sub> = l<sub>t</sub> · m jde přepočítat i obráceně. Když známe teplo a měrné teplo, dopočítáme hmotnost: m = L<sub>t</sub> : l<sub>t</sub>. Když známe teplo a hmotnost, dopočítáme měrné teplo: l<sub>t</sub> = L<sub>t</sub> : m.</p>\n<p>Kostka ledu má hmotnost 2 kg a měrné skupenské teplo tání ledu je 332 000 J/kg (332 kJ/kg). Kolik tepla potřebujeme, aby celá kostka roztála?</p>\n<p>L<sub>t</sub> = l<sub>t</sub> · m = 332 000 · 2 = 664 000 J = 664 kJ</p>\n<p>Na roztátí jiného kusu ledu jsme dodali 996 000 J tepla (996 kJ). Kolik ledu roztálo?</p>\n<p>m = L<sub>t</sub> : l<sub>t</sub> = 996 000 : 332 000 = 3 kg</p>",
					zapis: {"vzorec":"Lₜ = lₜ · m      (odvozeně: lₜ = Lₜ : m,  m = Lₜ : lₜ)","jednotky":["skupenské teplo tání — značíme Lₜ, jednotka J (joule)","měrné skupenské teplo tání — značíme lₜ, jednotka J/kg (joule na kilogram)","hmotnost — značíme m, jednotka kg (kilogram)","Převody: 1 kJ = 1 000 J.","Do vzorce dosazuj teplo v J, měrné skupenské teplo v J/kg a hmotnost v kg."],"vzorecSlovy":"skupenské teplo tání = měrné skupenské teplo tání krát hmotnost","body":["Lₜ = lₜ · m","pevná látka → kapalina (u kovů: tavení)","teplota tání — u každé látky jiná","během tání teplota se nemění","skupenské teplo → uvolní částice, teplotu nezvýší","sůl a tlak mění teplotu tání","krystalické: 1 teplota; amorfní: rozmezí"]},
					odkazy: [
						{ nazev: 'Techmania Edu — Tání a tuhnutí', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/skupenstvi/tani-tuhnuti' },
						{ nazev: 'Fyzika 8. ročník, změny skupenství (Wordwall)', url: 'https://wordwall.net/cs/resource/42774194/fyzika-8-ro%C4%8Dn%C3%ADk-zm%C4%9Bny-skupenstv%C3%AD' },
					],
				},
				{
					slug: 'tuhnuti',
					interakce: 'tuhnuti',
					nazev: 'Tuhnutí',
					obsah: "<h2>Tuhnutí</h2>\n<p>Když kapalinu ochlazujeme, její teplota klesá. Při <strong>teplotě tuhnutí</strong> se z kapaliny odebírá teplo a látka se mění na <strong>pevnou</strong>. U vody se tomu říká <strong>mrznutí</strong>. Tuhnutí je opačný děj k tání.</p>\n\n<h3>Teplota tuhnutí</h3>\n<p>U krystalických látek je <strong>teplota tuhnutí stejná jako teplota tání</strong>. Voda taje i mrzne při <strong>0 °C</strong>. Amorfní látky nemají jednu přesnou teplotu, ale celé rozmezí, ve kterém tuhnou postupně.</p>\n\n<h3>Co se děje s částicemi</h3>\n<p>Při tuhnutí částice zpomalují a spojují se pevnými vazbami do pravidelného tvaru. Tuhnutí vždy začíná od nějakého <strong>pevného jádra</strong>. Led na řece roste od břehu nebo od kamene, kapka mrzne od smítka prachu.</p>\n\n<h3>Teplo se uvolňuje</h3>\n<p><strong>Během tuhnutí se teplota látky nemění</strong>, dokud neztuhne úplně všechno. Teplo, které z kapaliny odebíráme, se přitom neztrácí — <strong>uvolňuje se do okolí</strong>. Říká se mu <strong>skupenské teplo</strong>.</p>\n\n<h3>Voda je výjimka — objem se zvětšuje</h3>\n<p>Většina látek při tuhnutí objem zmenšuje. Voda je výjimka: při mrznutí objem naopak zvětšuje. Proto má led menší hustotu než voda a plave na hladině. V přírodě je to výhoda — led plave nahoře a ryby mohou žít pod ním.</p>\n<p>V technice to ale dělá potíže: zmrzlá voda praská potrubí, beton i asfalt. Proto se vodovody vedou aspoň 90 cm hluboko pod zemí, v chladnějších oblastech až 140 cm. Této hloubce se říká nezámrzná hloubka. Na zimu se navíc z potrubí voda vypouští.</p>\n\n<h3>Kdyby led neplaval</h3>\n<p>Zkus si domyslet, co by se stalo, kdyby voda byla jako ostatní látky. Led by byl těžší než voda a klesal by ke dnu. Rybník by pak nezamrzal shora, ale ode dna, a mohl by promrznout skrz naskrz. Ledová vrstva na hladině totiž funguje jako přikrývka, která chrání vodu i život pod ní.</p>\n\n<h3>Teplota tuhnutí se dá posunout — solení silnic</h3>\n<p>Čistá voda mrzne při 0 °C. Když v ní ale rozpustíme sůl, částicím to brání srovnat se do pravidelné ledové mřížky. Voda pak potřebuje ještě větší zimu, než zmrzne.</p>\n<p>Přesně to využívají silničáři: sůl led nezahřívá, jen mu sníží teplotu tuhnutí. Led tak „má nad nulou\" a taje i v mrazu. Osolená břečka je přitom na dotek studená, protože si teplo bere z okolí. Solení má ale hranici — funguje jen do asi −21 °C, při větším mrazu se místo soli sype písek a drť.</p>\n\n<h3>💡 Podchlazená voda</h3>\n<p>Čistá voda bez pevného jádra může zůstat kapalná i pod nulou. Stačí do ní pak ťuknout a během okamžiku v ní vznikne led. Neztuhne proto, že by se ochladila, ale proto, že konečně dostala, od čeho začít.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Teplo, které se při tuhnutí uvolní, umíme spočítat. Skupenské teplo tuhnutí značíme L<sub>t</sub>, hmotnost m a měrné skupenské teplo tuhnutí l<sub>t</sub>. Pro led je l<sub>t</sub> = 332 kJ/kg — stejně jako u tání, protože měrné skupenské teplo tání a tuhnutí má u téže látky stejnou hodnotu.</p>\n<p>Kbelík s 5 kg vody přes noc úplně zmrzne. Kolik tepla se přitom uvolní do okolí?</p>\n<p>L<sub>t</sub> = l<sub>t</sub> · m = 332 · 5 = 1 660 kJ</p>\n<p>Funguje to i obráceně. Do okolí se uvolnilo 664 kJ tepla a všechna voda v nádobě zmrzla. Jakou měla nádoba hmotnost vody?</p>\n<p>m = L<sub>t</sub> : l<sub>t</sub> = 664 : 332 = 2 kg</p>\n<p>Podchlazená voda taky ukazuje, jak silné skupenské teplo je. Z vody podchlazené na −5 °C po ťuknutí zmrzne jen malá část, asi <strong>šestnáctina</strong> — zbytek zůstane kapalný jako <strong>ledová kaše</strong>. Uvolněné teplo totiž vodu hned zase ohřeje zpátky na 0 °C, a tuhnutí se zastaví. Aby zmrzla úplně celá, muselo by být podchlazení asi <strong>80 °C</strong>, a to už se v přírodě nestává.</p>",
					zapis: {"vzorec":"Lₜ = lₜ · m      (odvozeně: lₜ = Lₜ : m,  m = Lₜ : lₜ)","jednotky":["skupenské teplo tuhnutí — značíme Lₜ, jednotka J (joule)","měrné skupenské teplo tuhnutí — značíme lₜ, jednotka J/kg (joule na kilogram)","hmotnost — značíme m, jednotka kg (kilogram)","Převody: 1 kJ = 1 000 J.","Do vzorce dosazuj teplo a měrné skupenské teplo ve stejné jednotce (J nebo kJ) a hmotnost v kg."],"vzorecSlovy":"uvolněné skupenské teplo = měrné skupenské teplo tuhnutí krát hmotnost","zakon":"Měrné skupenské teplo tání a tuhnutí dané látky mají stejnou hodnotu.","body":["tuhnutí: kapalina → pevná látka (ochlazování)","u vody: mrznutí","teplota tuhnutí = teplota tání","teplota se během tuhnutí nemění, teplo se uvolňuje","voda: objem se zvětšuje, led plave","sůl snižuje teplotu tuhnutí","Lₜ = lₜ · m"]},
					odkazy: [
						{ nazev: 'Techmania Edu — Tání a tuhnutí', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/skupenstvi/tani-tuhnuti' },
						{ nazev: 'Proč se v zimě solí silnice? (RVP)', url: 'https://clanky.rvp.cz/clanek/r/GCACA/11637/PROC-SE-V-ZIME-SOLI-SILNICE.html' },
					],
				},
				{
					slug: 'vyparovani',
					nazev: 'Vypařování',
					interakce: 'vyparovani',
					obsah: "<h2>Vypařování</h2>\n<p><strong>Vypařování</strong> je děj, při kterém se kapalina mění na plyn (páru). Probíhá jen na <strong>povrchu kapaliny</strong> a děje se to při <strong>každé teplotě</strong>. Kapalina tedy nemusí vřít — vypařuje se i studená voda v míse.</p>\n<p>Molekuly na povrchu kapaliny dostávají energii, třeba ze slunce. Rychlejší molekuly se uvolní z kapaliny a odletí pryč jako pára. V kapalině zůstanou jen ty pomalejší.</p>\n\n<h3>Na čem závisí rychlost vypařování</h3>\n<p>Vypařování jde <strong>urychlit</strong> několika způsoby.</p>\n<ul>\n<li><strong>vyšší teplota</strong> — prádlo na slunci uschne dřív než ve stínu</li>\n<li><strong>větší povrch</strong> — rozložený ručník uschne dřív než smotaný do ruličky</li>\n<li><strong>proudění vzduchu</strong> — vítr nebo průvan páru rychle odvádí</li>\n<li><strong>druh kapaliny</strong> — líh se vypařuje rychleji než voda</li>\n</ul>\n<p>Kapaliny, které se vypařují velmi rychle, se nazývají <strong>těkavé látky</strong> (benzín, aceton, líh). Jejich páry jsou často <strong>hořlavé</strong>, proto se u benzínové pumpy nesmí kouřit.</p>\n\n<h3>Vypařování odebírá teplo</h3>\n<p>Aby se molekula uvolnila z kapaliny, potřebuje energii. Tu si bere jako <strong>teplo z okolí</strong>. Proto se kapalina i její okolí při vypařování <strong>ochlazuje</strong>.</p>\n<p>Plavci je po vylezení z vody zima, protože voda na kůži se vypařuje a bere si teplo z jeho těla. Stejně se tělo chladí <strong>pocením</strong> a pes chladí vyplazeným jazykem. Při horečce proto pomáhají mokré zábaly.</p>\n\n<h3>Vodní pára kolem nás</h3>\n<p>Vodní pára je <strong>neviditelná</strong>. Co vidíme jako bílý obláček nad rybníkem nebo nad lesem po dešti, je ve skutečnosti <strong>mlha</strong> — drobné kapičky vody. Množství vodní páry ve vzduchu ukazuje <strong>vlhkoměr</strong>.</p>\n<p>Vypařování využíváme každý den. Schne díky němu prádlo, vytřená podlaha i umyté nádobí, uschne i obrázek namalovaný vodovými barvami.</p>",
					zapis: {"body":["vypařování: kapalina se mění na páru","probíhá při každé teplotě, jen z povrchu","urychlí: teplota, povrch, proudění vzduchu, druh kapaliny","těkavé látky (benzín, aceton, líh) — rychlé, páry hořlavé","vypařování ochlazuje — odebírá okolí teplo","vodní pára je neviditelná, mlha = drobné kapičky"]},
					odkazy: [
						{ nazev: 'Vypařování, var a kapalnění (Fyzika007)', url: 'https://www.fyzika007.cz/struktura-avlastnosti-l%C3%A1tek/vypa%C5%99ov%C3%A1n%C3%AD-var-a-kapaln%C4%9Bn%C3%AD' },
					],
				},
				{
					slug: 'var',
					nazev: 'Var',
					interakce: 'ohrev',
					obsah: "<h2>Var</h2>\n<p><strong>Var</strong> je změna kapalné látky na plynnou. Nastává, když kapalinu zahřejeme na její <strong>teplotu varu</strong>. Var je podobný <strong>vypařování</strong>, ale je mnohem prudší.</p>\n\n<h3>Čím se var liší od vypařování</h3>\n<p>Vypařování probíhá jen na <strong>povrchu</strong> kapaliny, a to za jakékoli teploty. Var probíhá v <strong>celém objemu</strong> kapaliny najednou, ale jen při teplotě varu.</p>\n\n<h3>Jak var vypadá</h3>\n<p>Uvnitř kapaliny vznikají <strong>bubliny páry</strong>. Stoupají k hladině a pára z nich uniká do vzduchu. Právě proto vroucí voda v hrnci probublává.</p>\n<p>Během celého varu se teplota kapaliny <strong>nemění</strong>. Zůstane stát na teplotě varu, dokud se nevyvaří úplně všechna kapalina.</p>\n\n<h3>Teplota varu</h3>\n<p>Každá látka vře při jiné teplotě. Voda vře při <strong>100 °C</strong>, líh (ethanol) při 78 °C, rtuť až při 357 °C.</p>\n<p>Ovlivní ji i <strong>příměsi</strong> — slaná voda vře při vyšší teplotě.</p>\n\n<h3>Teplota varu závisí na tlaku</h3>\n<p>Čím nižší je tlak vzduchu, tím nižší je i teplota varu. Vysoko v horách je vzduch řidší. Voda tam vře už kolem 80 °C, takže se jídlo vaří pomaleji.</p>\n<p>Naopak vyšší tlak teplotu varu zvyšuje. V tlakovém hrnci (papiňáku) stoupne tlak až na 300 kPa. Voda v něm pak vře až při 130 °C, takže se jídlo uvaří rychleji.</p>\n\n<h3>Využití: destilace</h3>\n<p>Různé kapaliny mají různou teplotu varu. Toho využívá <strong>destilace</strong> — postupné zahřívání směsi, při kterém nejdřív unikne pára z látky s nižší teplotou varu. Tak se vyrábí třeba destilovaná voda nebo líh. Stejným způsobem se z ropy oddělují benzín a petrolej.</p>\n\n<h3>Skupenské teplo varu</h3>\n<p>Aby se kapalina změnila na páru, potřebuje navíc ještě teplo. Toto teplo nezvyšuje teplotu, ale uvolňuje částice z jejich vzájemného přitahování.</p>\n<p>Značíme ho L<sub>v</sub> a měříme v joulech (J). Kolik tepla potřebuje 1 kilogram látky, udává <strong>měrné skupenské teplo varu</strong> l<sub>v</sub> v J/kg. U vody je l<sub>v</sub> = 2 260 kJ/kg.</p>\n<p>Skupenské teplo varu spočítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>L<sub>v</sub> = l<sub>v</sub> · m</strong></p>\n<p>Čím víc kapaliny chceme vyvařit, tím víc tepla potřebujeme — teplo roste přímo úměrně s hmotností.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>V hrnci je 3 kg vody zahřáté na 100 °C. Kolik tepla potřebujeme, aby se celá vyvařila? Měrné skupenské teplo varu vody je l<sub>v</sub> = 2 260 kJ/kg.</p>\n<p>L<sub>v</sub> = l<sub>v</sub> · m = 2 260 · 3 = 6 780 kJ</p>\n<p>Na vyvaření celého hrnce vody bychom potřebovali 6 780 kJ tepla.</p>\n<p>Funguje to i naopak. Konvice dodala vroucí vodě teplo 2 260 kJ. Jakou hmotnost vody tím vyvařila?</p>\n<p>m = L<sub>v</sub> : l<sub>v</sub> = 2 260 : 2 260 = 1 kg</p>\n<p>Konvice vyvařila 1 kg vody.</p>",
					zapis: {"vzorec":"Lᵥ = lᵥ · m      (odvozeně: lᵥ = Lᵥ : m,  m = Lᵥ : lᵥ)","jednotky":["skupenské teplo varu — značíme Lᵥ, jednotka J (joule)","měrné skupenské teplo varu — značíme lᵥ, jednotka J/kg (joule na kilogram)","hmotnost — značíme m, jednotka kg (kilogram)","Převody: 1 kJ = 1 000 J, 1 MJ = 1 000 000 J.","Do vzorce dosazuj měrné skupenské teplo v J/kg a hmotnost v kg."],"vzorecSlovy":"skupenské teplo varu = měrné skupenské teplo varu krát hmotnost","body":["Lᵥ = lᵥ · m","var: celý objem, jen při teplotě varu","vypařování: jen povrch, každá teplota","bubliny páry stoupají k hladině","teplota se během varu nemění","nízký tlak → nižší teplota varu (hory)","vysoký tlak → vyšší teplota varu (papiňák)","příměsi mění teplotu varu (slaná voda vře výš)"]},
					odkazy: [
						{ nazev: 'Pokus: Var vody — osolená vs. neosolená (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/6143-pokus-var-vody' },
						{ nazev: 'Pokus: Závislost teploty varu na tlaku (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/6330-pokus-zavislost-teploty-varu-na-tlaku' },
					],
				},
				{
					slug: 'kondenzace',
					interakce: 'kondenzace',
					nazev: 'Kondenzace (kapalnění)',
					obsah: "<h2>Kondenzace (kapalnění)</h2>\n\n<p>Když <strong>plyn (páru) ochlazujeme</strong>, jeho teplota klesá. Páře pak ubývá energie a mění se z <strong>plynného skupenství na kapalné</strong>. Tomuto ději říkáme <strong>kapalnění</strong> neboli <strong>kondenzace</strong>.</p>\n<p>Kondenzace je <strong>opačný děj k vypařování</strong>. Vypařování mění kapalinu na páru, kondenzace ji mění zpátky na kapalinu.</p>\n\n<h3>Jak kondenzace probíhá</h3>\n<p>Ochlazené částice páry se pohybují pomaleji. Jejich přitažlivé síly je pak dokážou zadržet blízko u sebe, a tak se částice <strong>shlukují do kapiček</strong>.</p>\n<p>Kondenzace většinou začíná na nějakém <strong>pevném jádru</strong>. Ve vzduchu to bývá smítko prachu, kolem kterého vznikne dešťová kapka. Na povrchu to bývá studené místo, kolem kterého vznikne rosa nebo orosená plechovka.</p>\n\n<h3>Při kondenzaci se teplo uvolňuje</h3>\n<p>Tohle je nejdůležitější věc, kterou si z kondenzace odnést. Vypařování teplo <strong>spotřebovává</strong> — proto je ti po koupání chladno. Kondenzace je opačný děj, a tak teplo naopak <strong>vrací do okolí</strong>.</p>\n<p>Uvolní se přesně tolik tepla, kolik si vypařování vzalo. U vroucí vody je to obrovské množství — <strong>2 260 kJ z každého kilogramu</strong> páry, která zkondenzuje.</p>\n<p>Proto pára popálí hůř než vařící voda, i když mají stejnou teplotu 100 °C. Pára na kůži nejdřív zkondenzuje a uvolní svoje teplo, a teprve potom chladne jako voda. Kůže tak dostane dvě porce tepla za sebou.</p>\n<p>Stačí i docela malé množství páry. Jediný gram páry uvolní při kondenzaci tolik tepla, že by ohřál mnohem víc vody, než by sis myslel. Proto se <strong>nikdy nesahá nad hrnec s vařící vodou</strong> ani k ventilu papiňáku.</p>\n\n<h3>Kde kondenzaci vidíme</h3>\n<p>Pára kondenzuje tam, kde je chladno. Plechovka z lednice se orosí zvenku, protože se o ni ochladí vlhký vzduch místnosti. Okna se v zimě potí zevnitř, protože se teplý vlhký vzduch pokoje ochladí o studené sklo. Brýlím se totéž stane, když přijdeš z mrazu do tepla.</p>\n<p>Vodní pára je plyn a je <strong>průhledná</strong> — vidět není. To bílé nad hrncem s vroucí vodou nebo obláček od úst v zimě jsou už drobné <strong>kapičky</strong>, které z páry zkondenzovaly.</p>\n<p>Kolik vodní páry unese vzduch, záleží na jeho teplotě — čím teplejší vzduch, tím víc páry unese. <strong>Rosný bod</strong> je teplota, na kterou musí vzduch vychladnout, aby byl párou nasycený a pára v něm začala kondenzovat. Pod rosným bodem tak vzniká rosa, mlha i mraky.</p>\n\n<h3>Využití kondenzace</h3>\n<p>Protože kondenzace uvolňuje tolik tepla, používá se k topení. Pára v radiátorech továren i lodí při kondenzaci ohřívá okolí.</p>\n<p>Plyny lze zkapalnit i <strong>silným ochlazením</strong> — tak vzniká třeba kapalný dusík. Některé plyny lze zkapalnit i <strong>stlačením</strong>: propan-butan v láhvi na vaření je zkapalněný stlačením. Dusík ani kyslík se stlačením za pokojové teploty zkapalnit nedají, musí se nejdřív silně ochladit.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Teplo, které se při kondenzaci uvolní, spočítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>L<sub>v</sub> = l<sub>v</sub> · m</strong></p>\n<p>kde l<sub>v</sub> je měrné skupenské teplo (u vody l<sub>v</sub> = 2 260 kJ/kg) a m je hmotnost páry, která zkondenzovala.</p>\n<p>Příklad: Ve varné konvici zkondenzuje 3 kg páry zpátky na vodu. Kolik tepla se přitom uvolní?</p>\n<p>L<sub>v</sub> = l<sub>v</sub> · m = 2 260 · 3 = 6 780 kJ</p>\n<p>Pro srovnání: ohřát 3 kg vody z 0 °C na 100 °C (tedy o 100 °C) stojí podle vzorce Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) jen:</p>\n<p>Q = 3 · 4 200 · 100 = 1 260 000 J = 1 260 kJ</p>\n<p>Kondenzace stejného množství páry tedy uvolní víc než pětkrát tolik tepla — a to ještě ani nezchladne o jediný stupeň.</p>\n<p>Funguje to i naopak. Radiátor při kondenzaci páry uvolnil 9 040 kJ tepla. Kolik kilogramů páry v něm zkondenzovalo?</p>\n<p>m = L<sub>v</sub> : l<sub>v</sub> = 9 040 : 2 260 = 4 kg</p>\n<p>A ta ilustrace z úvodu: jediný gram páry uvolní teplo L<sub>v</sub> = l<sub>v</sub> · m = 2 260 000 · 0,001 = 2 260 J. Tímto teplem bychom podle vzorce Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) ohřáli vodu o m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)] = 2 260 : (4 200 · 80) ≈ 6,7 gramu — tedy skoro 7 gramů vody z 20 °C až na var. To je opravdu hodně tepla z jediného gramu páry.</p>",
					zapis: {"vzorec":"Lᵥ = lᵥ · m      (odvozeně: lᵥ = Lᵥ : m,  m = Lᵥ : lᵥ)","jednotky":["teplo, které se při kondenzaci uvolní — značíme Lᵥ, jednotka J (joule), často kJ (kilojoule)","měrné skupenské teplo — značíme lᵥ, jednotka J/kg; pro vodu lᵥ = 2 260 kJ/kg","hmotnost páry — značíme m, jednotka kg (kilogram)","Do vzorce dosazuj lᵥ v J/kg a m v kg."],"vzorecSlovy":"teplo uvolněné při kondenzaci = měrné skupenské teplo krát hmotnost zkondenzované páry","body":["kondenzace (kapalnění) = plyn → kapalina, opak vypařování","částice zpomalí a shluknou se do kapiček","začíná od pevného jádra (prach, studený povrch)","teplo se UVOLŇUJE (vypařování ho spotřebovává)","lᵥ = 2 260 kJ/kg (u vody)","rosný bod = teplota, kdy vzduch je nasycený párou","vodní pára je průhledná; mlha a obláček = kapičky vody","příklady: rosa, orosené sklo, mlha, pára nad hrncem"]},
					odkazy: [
						{ nazev: 'Techmania Edu — Vypařování a kondenzace', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/skupenstvi/vyparovani-kondenzace' },
					],
				},
				{
					slug: 'skupenske-zmeny-vody-v-prirode',
					nazev: 'Skupenské změny vody v přírodě',
					interakce: 'kolobeh-vody',
					obsah: "<h2>Skupenské změny vody v přírodě</h2>\n\n<p>V přírodě mění voda skupenství pořád dokola — vypařuje se, kondenzuje, mrzne i taje. Tyhle proměny dohromady tvoří <strong>koloběh vody</strong>. Je to pořád stejná voda, jen putuje z místa na místo.</p>\n\n<h3>Vypařování: voda stoupá jako pára</h3>\n<p>Voda se vypařuje z moří, jezer, řek i rybníků. Vypařuje se také z listů rostlin, z kůže živočichů a z vlhké půdy. Mění se na neviditelnou vodní páru a stoupá vzhůru do vzduchu.</p>\n\n<h3>Kondenzace: vznikají mraky, rosa a mlha</h3>\n<p>Teplý vzduch s párou stoupá výš, kde je větší zima, a pára se ochlazuje. Ochlazená pára <strong>kondenzuje</strong> — mění se zpátky na drobné kapičky vody. Kapičky se lepí na prach nebo zrnka soli ve vzduchu a spolu vytvářejí <strong>mrak</strong>. Čím víc kapiček mrak obsahuje, tím je tmavší.</p>\n<p>Stejná změna se děje i u země. Když se vzduch v noci ochladí pod <strong>rosný bod</strong>, pára na chladných površích zkondenzuje na kapičky — vznikne <strong>rosa</strong>. Mlha je vlastně stejná věc jako mrak, jen ve výšce, kde zrovna stojíme my. Když vyjdeš v mlze na kopec a ona zůstane pod tebou, díváš se najednou na oblak — ačkoli se s ní vůbec nic nestalo.</p>\n\n<h3>Tuhnutí: vznikají led a kroupy</h3>\n<p>Kapičky v mraku se spojují do větších kapek. Ve vysokém bouřkovém mraku je velká zima, a tak kapky vody zmrznou — vznikne <strong>kroupa</strong>. Silný stoupavý proud vzduchu ji vynese znovu nahoru, kde nabalí další vrstvu ledu. Čím déle kroupa takhle v mraku koluje, tím je nakonec větší — bývá i přes centimetr a uvnitř má vrstvy jako cibule.</p>\n<p>Podobně voda tuhne i jinde — na řekách a kalužích, nebo na kapkách deště, které cestou k zemi promrznou na drobné kousky ledu.</p>\n\n<h3>Tání: voda se vrací zpátky do koloběhu</h3>\n<p>Led a sníh se při oteplení zase mění zpátky na vodu — <strong>táním</strong>. Na jaře roztátý sníh stéká z hor do potoků a řek a odtud zpátky do moří. Koloběh se tím uzavírá.</p>\n\n<h3>Sublimace a desublimace: rovnou mezi ledem a párou</h3>\n<p>Sníh a led se dokážou přeměnit na páru i bez tání, úplně rovnou — říká se tomu <strong>sublimace</strong>. Děje se to pomalu i v mrazu, třeba u starého sněhu na horách.</p>\n<p>Funguje to i obráceně: hodně studená pára se může rovnou proměnit v led — <strong>desublimuje</strong>. Tak vzniká na zemi <strong>jinovatka</strong>, když se pára ochladí na chladném povrchu pod bod mrazu. Stejně tak vysoko v mracích vznikají desublimací drobné ledové krystalky a sněhové vločky — jsou to vysoká bílá oblaka, říká se jim <strong>cirrus</strong>.</p>\n\n<h3>Co koloběh pohání</h3>\n<p>Vypařování teplo spotřebovává, kondenzace ho naopak uvolňuje. Voda si tak po cestě nese i energii — nabere ji od Slunce nad teplým mořem a předá ji vzduchu vysoko v mracích. Motorem celého koloběhu je <strong>Slunce</strong>, bez něj by se voda nevypařila.</p>\n<p>Voda se v koloběhu nespotřebovává ani nevzniká — je jí pořád stejně, jen se přelévá mezi mořem, vzduchem, ledovci a řekami. Voda, kterou dnes vypiješ, byla už mnohokrát mrakem i mořem.</p>\n<p>Pozor na jeden častý omyl: to bílé, co vidíš v mlze, v obláčku z úst nebo nad hrncem, není pára. Vodní pára je neviditelný plyn. To bílé jsou už zkondenzované kapičky vody.</p>\n\n<h3>Srážky a jejich měření</h3>\n<p>Kapky vody i led z mraků padají na zem jako <strong>srážky</strong> — déšť, sníh nebo kroupy. Množství deště se měří <strong>srážkoměrem</strong> v milimetrech; číslo udává, jak vysoký sloupec vody by srážky vytvořily. Sníh se nechá roztát a změří se, kolik vody z něj vzniklo.</p>\n<p>V průmyslových oblastech se může vlivem znečištěného vzduchu tvořit <strong>kyselý déšť</strong>, který škodí rostlinám, půdě i vodě v přírodě.</p>",
					zapis: {"jednotky":["množství srážek — bez značky, jednotka mm (milimetr); měří se srážkoměrem, udává výšku vodního sloupce","rosný bod — bez značky, jednotka °C (stupeň Celsia)"],"body":["vypařování = voda mění se na páru","kondenzace = pára mění se na kapičky (mraky, rosa, mlha)","čím víc kapiček, tím tmavší mrak","tuhnutí = voda mrzne na led (kroupy)","tání = led a sníh se mění zpět na vodu","sublimace = led/sníh přímo na páru","desublimace = pára přímo na led (jinovatka, sněhové vločky, cirrus)","motor koloběhu = Slunce; vypařování teplo spotřebovává, kondenzace ho uvolňuje","pára je neviditelná, bílé je vždy kapičky vody","srážkoměr měří déšť v mm"]},
					odkazy: [
						{ nazev: 'Jak vznikají kroupy? (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/15702-jak-vznikaji-kroupy' },
						{ nazev: 'Techmania Edu — Atmosférické srážky', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/meteorologie/atmosfericke-srazky' },
					],
				},
			],
		},
		{
			slug: 'elektrina',
			nazev: 'Elektřina',
			podtemata: [
				{
						slug: 'elektricky-naboj',
						nazev: 'Elektrický náboj, elektrování těles, elektrická síla',
						interakce: 'elektrovani',
						obsah: "<h2>Elektrický náboj, elektrování těles, elektrická síla</h2>\n\n<p>Když si češeš umyté a suché vlasy plastovým hřebenem, vlasy se najednou zvednou a lepí se k němu. Hřeben i vlasy se <strong>zelektrizovaly</strong> — začala mezi nimi působit <strong>elektrická síla</strong>. Příčinou téhle síly je <strong>elektrický náboj</strong>.</p>\n\n<h3>Elektrování těles třením</h3>\n<p>Když se o sebe třou dvě různé látky, mohou se z jedné na druhou přesouvat <strong>elektrony</strong>. Tomuto ději se říká <strong>elektrování třením</strong>.</p>\n<p>Třením plastového hřebenu o vlasy se elektrony přesunou z vlasů do hřebenu. Hřeben tak získá elektrony navíc a nabije se <strong>záporně</strong>. Vlasům elektrony naopak chybí, a tak se nabijí <strong>kladně</strong>.</p>\n<p>Plast se třením nabíjí vždy <strong>záporně</strong>, sklo se naopak nabíjí vždy <strong>kladně</strong>.</p>\n\n<h3>Dva druhy náboje a elektrická síla</h3>\n<ul>\n<li><strong>kladný</strong> — nese ho <strong>proton</strong> (p⁺) v jádře atomu; při běžném zacházení jádro neopouští</li>\n<li><strong>záporný</strong> — nese ho <strong>elektron</strong> (e⁻) v obalu atomu; ten se dá snadno uvolnit a přesouvat</li>\n<li><strong>neutron</strong> (n⁰) v jádře je bez náboje</li>\n</ul>\n<p>Náboj protonu a elektronu je <strong>stejně velký, ale opačný</strong>. Elektrický náboj nelze vyrobit ani zničit — dá se jen <strong>přesouvat</strong> spolu s elektrony.</p>\n<p>Nabitá tělesa na sebe navzájem působí elektrickou silou. <strong>Souhlasné (stejné) náboje se odpuzují, nesouhlasné (různé) náboje se přitahují.</strong></p>\n<p>Proto se rozčesané vlasy lepí k hřebenu, mají totiž opačný náboj. Mezi sebou se ale navzájem rozestupují, protože mají stejný náboj.</p>\n<p>Síla je tím větší, čím <strong>větší jsou náboje</strong> obou těles. A tím menší, čím <strong>větší je vzdálenost</strong> mezi nimi.</p>\n\n<h3>Neutrální a nabité těleso</h3>\n<p>Běžná tělesa mívají stejný počet protonů a elektronů. Říkáme jim <strong>neutrální</strong> — jejich náboje se navenek vyruší.</p>\n<ul>\n<li><strong>neutrální</strong>: stejný počet protonů a elektronů → navenek se náboje vyruší</li>\n<li><strong>nabité (iont)</strong>: převažuje jeden náboj. <strong>Kationt (+)</strong> = atom, který elektron ztratil; <strong>aniont (−)</strong> = atom, který elektron navíc přijal.</li>\n</ul>\n<p>Ionty vznikají právě přenosem elektronů mezi dvěma tělesy při tření. Pozor: iont nikdy nevzniká odtržením protonů — ty zůstávají v jádře, mění se jen počet elektronů v obalu.</p>\n\n<h3>Přenos náboje: vodiče a izolanty</h3>\n<p>Elektrony se mohou přesouvat mezi tělesy nejen třením, ale i pouhým dotykem. Různé látky ale tento přenos umožňují různě dobře.</p>\n<ul>\n<li><strong>vodiče</strong> (všechny kovy) náboj snadno přenášejí</li>\n<li><strong>izolanty</strong> (suché dřevo, plast, guma) náboj nepřenášejí</li>\n</ul>\n<p>Nabité těleso lze vybít <strong>uzemněním</strong> — vodivým spojením se Zemí, která přijme všechny volné elektrony navíc. Uzemnění se používá třeba u bleskosvodu jako ochrana před úrazem elektrickým proudem.</p>\n<p>Při přesunu elektronů mezi tělesy může vzniknout jiskra a nepříjemné bodnutí. Stává se to třeba při svlékání svetru přes hlavu. Nebo když se dotkneš karoserie auta po dlouhé jízdě v suchém počasí. Tomuto jevu se říká <strong>statická elektřina</strong>.</p>\n<p>Kvůli jiskrám je třeba dávat pozor hlavně u hořlavin, třeba u benzínu. Cisterny s benzínem se proto před vypuštěním <strong>uzemňují</strong> zvláštním proužkem. Při tankování aut se navíc vypíná motor.</p>\n<p><strong>Zákon zachování náboje:</strong> celkový elektrický náboj se vzájemným elektrováním těles v izolované soustavě nemění. Dotknou se třeba dvě tělesa se stejně velkým, ale opačným nábojem. Jejich celkový náboj je pak nulový a při dotyku se zneutralizují.</p>\n\n<h3>Elektroskop a měření náboje</h3>\n<p>Elektrický náboj je fyzikální veličina. Značíme ho <strong>Q</strong> a měříme v jednotce <strong>coulomb (C)</strong>.</p>\n<p>Nejmenší možný náboj se nazývá <strong>elementární náboj</strong>. Je to náboj jediného elektronu nebo protonu: e = 1,6 · 10⁻¹⁹ C. Náboj každého tělesa je vždy jeho násobkem.</p>\n<p>Jestli je těleso nabité, zjistíme přístrojem <strong>elektroskop</strong>. Elektroskop ale neurčí, jaké je znaménko náboje ani jak velký náboj je. K porovnání velikosti náboje dvou těles slouží <strong>elektrometr</strong> — elektroskop se stupnicí.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Jednotka 1 coulomb je ve skutečnosti velmi velká. Těleso nabité na 1 C by muselo obsahovat 6 · 10¹⁸ volných elektronů.</p>\n<p>Baterie a akumulátory takhle velký náboj mívají, například autobaterie může mít náboj 200 C. Tělesa zelektrovaná třením (jako hřeben nebo vlasy) mají ale mnohem menší náboj.</p>\n<p>Proto se pro ně používají menší jednotky: milicoulomb (mC), mikrocoulomb (μC) a nanocoulomb (nC). Platí: 1 mC = 0,001 C, 1 μC = 0,000 001 C a 1 nC = 0,000 000 001 C.</p>\n<p>Kolik je to v základní jednotce? Hřeben nabitý na 5 mC má náboj Q = 5 · 0,001 C = 0,005 C.</p>\n<p>A obráceně: vlasy mají náboj 2 000 μC. Převedeme na milicoulomby: Q = 2 000 · 0,000 001 C = 0,002 C = 2 mC.</p>",
						zapis: {"jednotky":["elektrický náboj — značíme Q, jednotka C (coulomb)","elementární náboj — značíme e, jednotka C (coulomb); e = 1,6 · 10⁻¹⁹ C (náboj jednoho elektronu nebo protonu)","Převody: 1 mC (milicoulomb) = 0,001 C, 1 μC (mikrocoulomb) = 0,000 001 C, 1 nC (nanocoulomb) = 0,000 000 001 C."],"zakon":"Celkový elektrický náboj se vzájemným elektrováním těles v izolované soustavě nemění.","body":["náboj = příčina elektrické síly mezi zelektrovanými tělesy","proton (+), elektron (−), neutron bez náboje","náboj p+ a e− stejně velký, opačný; nelze vyrobit ani zničit","tření: elektrony přeskočí mezi tělesy","plast se nabíjí záporně, sklo kladně","neutrální těleso: počet p+ = počet e−","iont: kationt (+) ztratil e−, aniont (−) přijal e−, jen změnou elektronů","náboj: značka Q, jednotka C; elementární e = 1,6·10⁻¹⁹ C","elektroskop pozná nabité těleso, elektrometr porovná velikost","vodiče (kovy) přenášejí, izolanty (dřevo, plast, guma) ne","uzemnění vybije těleso spojením se Zemí","statická elektřina: jiskry při doteku nabitých těles","souhlasné náboje se odpuzují, nesouhlasné přitahují","síla: větší náboj i menší vzdálenost → silnější"]},
						odkazy: [
							{ nazev: 'Elekrostatika – 8. ročník ZŠ (test, 13 otázek) — testi.cz', url: 'https://testi.cz/testy/fyzika/elekrostatika-8.rocnik-zs/' },
						],
					},
				{
						slug: 'elektricke-pole',
						nazev: 'Elektrické pole',
						interakce: 'elektricke-pole',
						obsah: "<h2>Elektrické pole</h2>\n<p>Kolem každého <strong>nabitého tělesa</strong> vzniká neviditelné <strong>elektrické pole</strong>. Projevuje se tak, že působí <strong>elektrickou silou</strong> na jiná tělesa — a to i na dálku, bez dotyku.</p>\n<ul>\n<li>nesouhlasně nabitá tělesa (+ a −) se <strong>přitahují</strong> — třeba hřeben a vlasy, nebo mikrotenový sáček a ruka</li>\n<li>souhlasně nabitá tělesa se <strong>odpuzují</strong> — proto se rozčesané vlasy navzájem rozestupují</li>\n</ul>\n\n<h3>Siločáry — jak si pole nakreslit</h3>\n<p>Elektrické pole je neviditelné, ale fyzikové ho kreslí pomocí <strong>siločar</strong>. Podle dohody ukazují siločáry směr síly, která by působila na <strong>kladný náboj</strong> — proto vždycky míří <strong>od + k −</strong>.</p>\n<p>Čím jsou siločáry k sobě <strong>hustší</strong>, tím je pole na tom místě <strong>silnější</strong>. Dál od nabitého tělesa síla slábne a siločáry <strong>řídnou</strong>. Mezi dvěma rovnoběžnými nabitými deskami jsou siločáry rovnoběžné po celé ploše — takovému poli se říká <strong>stejnorodé (homogenní)</strong>.</p>\n<p>Tvar siločar dokonce uvidíš v pokusu: do oleje ponoříš dva nabité kovové drátky a hladinu posypeš jemnou krupicí. Zrnka se sama srovnají podél neviditelných siločar.</p>\n\n<h3>Vodič v elektrickém poli</h3>\n<p>V nenabitém kovu se působením cizího pole <strong>přesunou volné elektrony</strong> na jednu stranu tělesa. Tomu se říká <strong>elektrostatická indukce</strong>. Jedna strana kovu je pak záporná, druhá kladná, i když je těleso jako celek pořád neutrální. Proto se k zelektrovanému pravítku rozkutálí i neutrální plechovka.</p>\n<p>Indukci umí ukázat i <strong>elektroskop</strong> — přístroj s ručičkou, který ukazuje nabití. Když k němu přiblížíš nabitou tyč, ručička se vychýlí, i když se tyče nedotkneš. A po oddálení tyče se zase vrátí zpátky. Ale dotkneš-li se elektroskopu rukou zrovna ve chvíli, kdy je tyč blízko, odvedeš tím část náboje do země. Po oddálení tyče pak elektroskop zůstane nabitý natrvalo.</p>\n\n<h3>Izolant v elektrickém poli</h3>\n<p>V izolantu elektrony atomy neopustí — jen se uvnitř atomů <strong>natočí</strong> k jedné straně. Tomu se říká <strong>polarizace</strong>. I takové těleso je k nabitému tělesu přitahováno, přestože zůstává elektricky neutrální.</p>\n<p>Proto se k zelektrovanému pravítku přitáhnou drobné kousky papíru nebo tenký proud vody z kohoutku. Na rozdíl od vodiče ale z izolantu <strong>náboj odvést nelze</strong>.</p>\n\n<h3>⚡ Faradayova klec — proč je v autě při bouřce bezpečno</h3>\n<p>Vezmi si znovu <strong>elektrostatickou indukci</strong> z odstavce výš: v kovu se volné elektrony přesunou tam, kam je vnější pole tlačí. Jenže tím samy vytvoří <strong>pole opačného směru</strong> — a ta dvě se uvnitř kovu navzájem <strong>vyruší</strong>.</p>\n<p>Uvnitř uzavřeného kovového obalu proto <strong>vnější elektrické pole nic nezmůže</strong>. Tomu se říká <strong>Faradayova klec</strong> a potkáš ji častěji, než by ses nadál(a):</p>\n<ul>\n<li><strong>auto při bouřce</strong> — blesk sjede po plechu karoserie do země a posádky uvnitř se nedotkne. (Pozor: chrání <strong>plech</strong>, ne gumové pneumatiky — ty jsou v tom nevinně, ačkoli se to často říká. A platí to jen se <strong>zavřenými okny</strong> a bez sahání na kovové části; kabriolet nechrání vůbec.)</li>\n<li><strong>letadlo</strong>, do kterého blesk udeří poměrně běžně, a nikdo si toho ani nevšimne</li>\n<li><strong>kovový oplet kabelu</strong> u sluchátek nebo antény — drží rušení venku</li>\n<li><strong>mikrovlnná trouba</strong> — mřížka ve dvířkách nepustí mikrovlny ven, a přitom se skrz ni dá koukat dovnitř</li>\n</ul>\n<p>👉 Klec nemusí být plná deska, stačí <strong>hustá kovová síť</strong>. Její oka ale musí být <strong>mnohem menší než délka vlny</strong> toho, co má zadržet. Přesně proto vypadá mřížka v troubě jako kouzlo: <strong>mikrovlny</strong> jsou dlouhé asi <strong>12 cm</strong>, a tak dírkami neprojdou.</p>\n<p><strong>Světlo</strong> má ale délku vlny statisíckrát menší, a proto proletí bez problémů. Proto dovnitř vidíš, a přesto se u dvířek neohřeješ.</p>",
						zapis: {"body":["pole: vzniká kolem nabitého tělesa","pole: působí silou i na dálku","náboje nesouhlasné (+/−): přitahují se","náboje souhlasné: odpuzují se","siločáry: směr od + k −","siločáry husté = pole silné","mezi deskami: pole stejnorodé (homogenní)","vodič: indukce — elektrony se posunou","elektroskop: dotyk při indukci = trvalé nabití","izolant: polarizace — elektrony se natočí","izolant: náboj z něj nejde odvést","Faradayova klec: uvnitř dutiny není pole"]},
						odkazy: [
							{ nazev: 'Elektrický náboj a elektrické pole — rozcestník videí (ČT edu)', url: 'https://edu.ceskatelevize.cz/tema/elektricky-naboj-a-elektricke-pole' },
							{ nazev: 'Pokusy: Umělé blesky — Faradayova klec (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5393-pokusy-umele-blesky' },
						],
					},
				{
						slug: 'vznik-elektrickeho-proudu',
					interakce: 'vznik-elektrickeho-proudu',
						nazev: 'Vznik elektrického proudu ve vodiči',
						obsah: "<h2>Vznik elektrického proudu ve vodiči</h2>\n\n<p>Aby přístroj fungoval, musí jím <strong>téct elektrický proud</strong>. K tomu ho zapojíme do <strong>elektrického obvodu se zdrojem napětí</strong>.</p>\n\n<h3>Co je elektrický proud</h3>\n<p><strong>Elektrický proud je uspořádaný pohyb volných nabitých částic.</strong> Protéká vodičem a nesou ho:</p>\n<ul>\n<li><strong>volné elektrony v kovech</strong> — část elektronů se uvolní z atomů a pohybuje se volně</li>\n<li><strong>ionty</strong> v roztocích solí a kyselin, třeba v kyselině sírové v autobaterii</li>\n<li>za zvláštních podmínek i <strong>částice ve vzduchu</strong> — při blesku nebo jiskření</li>\n</ul>\n<p><strong>Iont</strong> je částice, která ztrátou nebo ziskem elektronu získala náboj — kladný, nebo záporný. Proto vede proud i pot a tělní tekutiny, a proto je vodičem i lidské tělo.</p>\n\n<h3>Napětí jako příčina proudu</h3>\n<p><strong>Elektrické napětí</strong> vzniká rozdílem nábojů mezi dvěma body. Záporná svorka zdroje má přebytek elektronů, kladná jejich nedostatek. Napětí je <strong>příčinou</strong> proudu a získáme ho ze <strong>zdroje napětí</strong>.</p>\n\n<h3>Podmínky průchodu proudu</h3>\n<p>Aby vodičem protékal proud, musí platit tyto podmínky:</p>\n<ul>\n<li><strong>elektrické pole</strong> mezi dvěma nabitými tělesy (+ a −) žene nabité částice vodičem — třeba mezi kladnou a zápornou svorkou baterie</li>\n<li>stejně je to při <strong>blesku</strong>: pole vzniká mezi kladně nabitou zemí a záporně nabitými mraky</li>\n<li>mezi konci vodiče proto musí být <strong>elektrické napětí</strong></li>\n<li>proud prochází jen <strong>vodiči</strong> (kovy, roztoky); <strong>izolanty</strong> (dřevo, plast, guma) proud nepropustí, protože v nich nejsou žádné volné částice</li>\n</ul>\n<p>Záporné částice — elektrony a záporné ionty — míří ke <strong>kladné svorce</strong> zdroje. Kladné ionty míří k <strong>záporné svorce</strong>.</p>\n\n<h3>Odkud bereme napětí</h3>\n<p>Napětí do zásuvky posílá <strong>elektrárna</strong> přes rozvodnou elektrickou síť. Přenosné zdroje jsou <strong>akumulátory</strong> — dobíjecí baterie v mobilu, notebooku i autě — a <strong>monočlánky</strong>: tužkové, knoflíkové nebo ploché baterie.</p>\n<p>Elektrickou energii vyrábí <strong>otáčivý pohyb</strong>: turbíny větrné, vodní nebo parní, nebo elektromagnet v <strong>generátoru</strong> poháněném motorem. Turbína je kolo, které roztáčí proudící voda, vítr nebo pára. Generátor je stroj, který otáčivým pohybem vyrábí elektrické napětí. V monočláncích a akumulátorech napětí dodává <strong>chemická reakce</strong>, v solárních panelech <strong>sluneční záření</strong>.</p>\n\n<h3>Dva druhy proudu</h3>\n<ul>\n<li><strong>stejnosměrný (DC)</strong> — teče stále stejným směrem; z baterií a akumulátorů. U některých spotřebičů na směru záleží (LED dioda, elektronika), u jiných ne (žárovka)</li>\n<li><strong>střídavý (AC)</strong> — pravidelně mění směr; z elektráren, máme ho v zásuvce; pohání velké spotřebiče (pračka, fén)</li>\n</ul>\n<p>Spotřebiče, u kterých na směru proudu záleží, na střídavý proud přímo nefungují. Pokud je napájíme ze zásuvky, mají uvnitř obvod, který střídavý proud změní na stejnosměrný.</p>",
								zapis: {"body":["proud = uspořádaný pohyb nabitých částic","kovy: nosič = volný elektron","roztoky: nosič = iont (sůl, kyselina)","vzduch: výjimečně, při blesku","iont = atom, co získal/ztratil elektron","pole (+/−) žene nabité částice","blesk: pole mezi zemí (+) a mraky (−)","podmínka: napětí mezi konci vodiče","vodič proud vede, izolant nevede","záporné částice → kladná svorka","kladné ionty → záporná svorka","napětí = rozdíl nábojů dvou bodů","napětí je příčina proudu","ze zásuvky: elektrárna, rozvodná síť","přenosné zdroje: baterie, akumulátor","energii dává otáčivý pohyb (turbína, generátor)","energii dává i chemická reakce, slunce","stejnosměrný (DC): směr stálý","střídavý (AC): směr se mění"]},
								odkazy: [
							{ nazev: 'ČT edu — Elektrický proud a napětí (video, 2 min)', url: 'https://edu.ceskatelevize.cz/video/1921-elektricky-proud-a-napeti' },
							{ nazev: 'Wordwall — Elektrický proud a napětí, 8. třída (kvíz)', url: 'https://wordwall.net/cs/resource/89308040' },
						],
					},
				{
						slug: 'chemicke-zdroje-napeti',
						interakce: 'galvanicky-clanek',
						nazev: 'Chemické zdroje elektrického napětí',
						obsah: "<h2>Chemické zdroje napětí — galvanické články</h2>\n\n<p>Galvanický článek vyrábí elektrické napětí chemickou reakcí. Do vodivého roztoku, kterému říkáme elektrolyt, se ponoří dvě elektrody z různých materiálů — obvykle kovů, ale i uhlík se hodí. Reakce mezi elektrolytem a elektrodami nabije jednu elektrodu záporně a druhou kladně — vznikne napětí.</p>\n<ul>\n<li>záporná elektroda (nazývá se <strong>anoda</strong>) — např. zinek, lithium, kadmium</li>\n<li>kladná elektroda (nazývá se <strong>katoda</strong>) — např. uhlík (grafit) nebo měď</li>\n</ul>\n<p>Jako elektrolyt slouží vodný roztok silné kyseliny nebo soli, případně hustá pasta se solí rozpuštěnou ve zvláštním rozpouštědle.</p>\n\n<h3>Nejznámější články</h3>\n<ul>\n<li><strong>Suchý článek</strong> — zinková nádoba (anoda) a uhlíková tyčinka (katoda), elektrolyt je salmiaková pasta. Napětí <strong>1,5 V</strong>, na jedno použití (hračky). Vybitý může vytéct.</li>\n<li><strong>Plochá baterie</strong> — tři suché články za sebou → <strong>4,5 V</strong></li>\n<li><strong>Alkalické články</strong> — vyšší kapacita a delší životnost, zvládnou i velký nárazový odběr (blesk fotoaparátu, MP3 přehrávač)</li>\n<li><strong>Lithiové články</strong> (jednorázové) — kvalitní i po letech skladování; hodinky, klíč od auta, baterie na základní desce počítače. (Mobil, fotoaparát a notebook mají jiný typ — dobíjecí <strong>lithium-iontový akumulátor</strong>.)</li>\n<li><strong>Olověný akumulátor</strong> — záporná elektroda z olova, kladná z olověné mřížky s oxidem olovičitým. Velká kapacita, <strong>dobíjecí</strong>, napětí <strong>12 V</strong> (autobaterie)</li>\n</ul>\n<p>Baterie je jednorázová a nedobíjí se. Akumulátor je dobíjecí a použiješ ho opakovaně.</p>\n\n<h3>Proč se baterie vybije</h3>\n<p>Napětí nevzniká z ničeho — při reakci se rozpouští kov elektrody. Když se látky uvnitř spotřebují, reakce skončí a napětí zmizí. Baterie je vlastně zásobník chemické energie.</p>\n<p>V akumulátoru dokáže nabíjení reakci obrátit a látky obnovit, v jednorázovém článku ne. Proto vybitý zinkový článek často vyteče: nádobka je prožraná a agresivní pasta unikne ven. Vybité články proto nenech ve spotřebiči.</p>\n\n<h3>Napětí se sčítá — proto plochá baterie</h3>\n<p>Jeden suchý článek dá 1,5 V a víc z něj nedostaneš — napětí určuje dvojice použitých kovů, ne velikost článku. Chceš-li víc, zapoj články za sebou a napětí se sečte.</p>\n<ul>\n<li>plochá baterie = 3 články → 3 · 1,5 V = <strong>4,5 V</strong></li>\n<li>devítivoltová baterie = 6 článků → 6 · 1,5 V = <strong>9 V</strong></li>\n</ul>\n\n<h3>Kapacita — jak dlouho baterie vydrží</h3>\n<p>Malá tužková AA a velká buřtová D mají obě 1,5 V. Větší článek neznamená větší napětí — znamená, že vydrží déle. Tomu se říká <strong>kapacita</strong> a udává se v mAh.</p>\n<p>Článek s kapacitou 2 000 mAh dodá proud 2 000 mA po dobu jedné hodiny, nebo menší proud 200 mA po deset hodin.</p>\n\n<h3>Bezpečnost a co s vybitými</h3>\n<ul>\n<li>Baterii <strong>nikdy nezkratuj</strong> drátem — proud se prudce zvedne a článek se rozpálí. Lithiový článek se nesmí ani propichovat a mačkat, hrozí požár.</li>\n<li><strong>Nemíchej staré a nové</strong> články ani různé typy v jednom přístroji — silnější tlačí do slabšího a ten může vytéct.</li>\n<li><strong>Baterie nepatří do koše.</strong> Obsahují těžké kovy, které by se dostaly do půdy a vody. Sběrné nádoby jsou ve školách, obchodech i na úřadech a kovy z nich se dají znovu použít.</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Celkové napětí baterie ze stejných článků za sebou spočítáme jako počet článků krát napětí jednoho článku. Devítivoltová baterie má 6 článků po 1,5 V:</p>\n<p>U = n · U₁ = 6 · 1,5 = 9 V</p>",
							zapis: {"vzorec":"U = n · U₁","jednotky":["celkové napětí baterie — značíme U, jednotka V (volt)","počet článků zapojených za sebou — značíme n, bez jednotky (počet)","napětí jednoho článku — značíme U₁, jednotka V (volt)","kapacita článku — bez značky, jednotka mAh (miliampérhodina)","Převody: 1 Ah = 1 000 mAh."],"vzorecSlovy":"celkové napětí = počet článků krát napětí jednoho článku","body":["galvanický článek: reakce → napětí","elektrody: záporná (anoda), kladná (katoda)","elektrolyt: vodivý roztok nebo pasta","suchý článek: 1,5 V, jednorázový","plochá baterie: 3× 1,5 V = 4,5 V","olověný akumulátor: 12 V, dobíjecí","články za sebou: napětí se sčítá","kapacita v mAh: jak dlouho vydrží","baterie = jednorázová, akumulátor = dobíjecí","nezkratovat, nepropichovat, nemíchat typy","vybité baterie do sběru, ne do koše"]},
							odkazy: [
							{ nazev: 'Pokusy: Baterky (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5462-pokusy-baterky' },
							{ nazev: 'Pokus: Elektřina z ovoce a zeleniny (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5524-pokus-elektrina-z-ovoce-a-zeleniny' },
							{ nazev: 'Jak probíhá recyklace baterií (ECOBAT)', url: 'https://www.ecobat.cz/jak-probiha-recyklace-baterii/' },
							{ nazev: 'Druhy baterií — spojovačka (Wordwall)', url: 'https://wordwall.net/cs/resource/71804207/druhy-bateri%C3%AD' },
						],
					},
				{
						slug: 'elektricke-obvody',
						nazev: 'Elektrické obvody',
						interakce: 'obvod',
						obsah: "\n\t\t\t\t\t\t\t<h2>Elektrické obvody</h2>\n\t\t\t\t\t\t\t<p><strong>Elektrický obvod</strong> vzniká, když vodivě spojíme víc prvků dohromady. Musí v něm být <strong>zdroj napětí</strong> (třeba baterie), <strong>spotřebič</strong> (žárovka, zvonek, motor…) a <strong>vodiče</strong>, které je spojují. Obvod může mít navíc <strong>spínač, měřidla nebo pojistku</strong>. Příčinou elektrického proudu je <strong>elektrické napětí</strong> — v obvodu ho zajistí právě zdroj elektrického napětí.</p>\n\t\t\t\t\t\t\t<p>Žárovka je skleněná baňka, ze které je vysátý vzduch. Uvnitř je tenoučké <strong>wolframové vlákno</strong> spojené se dvěma částmi patice žárovky, kterou zašroubujeme do objímky.</p>\n\t\t\t\t\t\t\t<p>U zdrojů napětí rozeznáváme dva póly. U <strong>tužkové baterie</strong> je výčnělek na horní ploše kladný pól (+), rovná spodní plocha záporný pól (−). U <strong>ploché baterie</strong> je kladný pól (+) kratší kovový plíšek, záporný pól (−) delší plíšek.</p>\n\t\t\t\t\t\t\t<h3>Schematické značky</h3>\n\t\t\t\t\t\t\t<p>Obvod nekreslíme jako obrázek, ale jako <strong>schéma</strong> — přehledné zakreslení pomocí dohodnutých <strong>schematických značek</strong>. Vodiče kreslíme přímými nebo pravoúhlými čarami. Místo, kde je vodivě spojeno víc vodičů, se nazývá <strong>uzel</strong>.</p>\n\t\t\t\t\t\t\t<p>Mezi základní značky patří:</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>vodič</li>\n\t\t\t\t\t\t\t<li>zdroj (baterie)</li>\n\t\t\t\t\t\t\t<li>zdroj – monočlánek</li>\n\t\t\t\t\t\t\t<li>zdroj – plochá baterie</li>\n\t\t\t\t\t\t\t<li>žárovka (kolečko s křížkem)</li>\n\t\t\t\t\t\t\t<li>spínač otevřený a zavřený</li>\n\t\t\t\t\t\t\t<li>tlačítkový spínač</li>\n\t\t\t\t\t\t\t<li>zvonek</li>\n\t\t\t\t\t\t\t<li>pojistka</li>\n\t\t\t\t\t\t\t<li>cívka</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Uzavřený a otevřený obvod</h3>\n\t\t\t\t\t\t\t<p>Elektrický proud prochází obvodem jen tehdy, když je <strong>uzavřený</strong>. Všechny jeho části jsou pak vodivě spojené a tvoří nepřerušenou cestu od jednoho pólu zdroje k druhému — uzavřeme ho třeba sepnutím spínače.</p>\n\t\t\t\t\t\t\t<p>Když je obvod <strong>otevřený</strong> (vypnutým spínačem nebo přerušeným vodičem), proud neprochází a spotřebič nefunguje. Aby žárovka svítila, musí být také dokonale spojené všechny vodivé části, správně zašroubovaná do objímky a nesmí mít prasklé vlákno.</p>\n\t\t\t\t\t\t\t<h3>Jednoduchý a složený obvod</h3>\n\t\t\t\t\t\t\t<p><strong>Jednoduchý obvod</strong> má jen jeden spotřebič — zdroj, vodiče, spínač a jednu žárovku zapojené v jedné smyčce. <strong>Složený obvod</strong> má víc spotřebičů, které lze zapojit dvěma způsoby: <strong>za sebou (sériově)</strong> nebo <strong>vedle sebe (paralelně)</strong>. Elektronické přístroje mívají mnohem složitější obvody — běžný spotřebič může uvnitř obsahovat desítky, stovky až miliony součástek zapojených sériově i paralelně zároveň.</p>\n\t\t\t\t\t\t\t<p>Při <strong>sériovém</strong> zapojení jsou spotřebiče zapojené jeden za druhým, jako žárovičky na starším vánočním stromečku. Má to nevýhodu: když se poškodí jedna žárovka, přeruší se celý obvod a nesvítí ani jedna.</p>\n\t\t\t\t\t\t\t<p>Při <strong>paralelním</strong> zapojení je každý spotřebič připojený ke zdroji vlastními vodiči, jako zásuvky a spotřebiče v domácnosti. Obvod je <strong>rozvětvený</strong> a místa rozvětvení jsou uzly. Výhoda je, že když se jeden spotřebič vypne nebo poškodí, přeruší se jen jeho větev — ostatními spotřebiči proud dál prochází.</p>\n\t\t\t\t\t\t\t<h3>Zkrat — pozor!</h3>\n\t\t\t\t\t\t\t<p>Když vodivě spojíme svorky zdroje <strong>bez spotřebiče</strong> (nebo proud najde cestu mimo spotřebič), vznikne <strong>zkrat</strong>: obvodem teče velký proud, vodiče se přehřívají a <strong>hrozí požár</strong>.</p>\n\t\t\t\t\t\t\t<p>Před zkratem a přetížením chrání <strong>pojistka</strong>. Nejjednodušší je tavná pojistka: tenký drátek ve skleněné baňce se při průchodu velkého proudu zahřeje, roztaví a přeruší obvod. Pojistky se používají v elektronických přístrojích, v autech i v domácnosti.</p>\n\t\t\t\t\t\t\t<h3>Bezpečné zapojování</h3>\n\t\t\t\t\t\t\t<p>Obvod nejdřív sestavíme <strong>bez zdroje</strong> a se spínačem v <strong>otevřené (vypnuté)</strong> poloze. Zkontrolujeme, že vodiče nemají poškozenou izolaci a že žárovka je pevně zašroubovaná do objímky.</p>\n\t\t\t\t\t\t\t<p>Teprve po kontrole dobrého stavu všech částí připojíme zdroj a nakonec obvod uzavřeme sepnutím spínače.</p>\n\t\t\t\t\t\t",
						zapis: {"body":["obvod: zdroj + vodiče + spotřebič","může mít i spínač, měřidla, pojistku","proud teče jen uzavřeným obvodem","tužková baterie: výčnělek +, plocha −","plochá baterie: kratší plíšek +, delší −","schéma: značky + čáry, uzel = spojení vodičů","jednoduchý obvod = jeden spotřebič","sériově (za sebou): porucha vypne celý obvod","paralelně (vedle sebe, rozvětvený): porucha vypne jen větev","zkrat: spojení bez spotřebiče → velký proud, požár","pojistka chrání před zkratem a přehřátím","zapojuj: bez zdroje → kontrola → zdroj → spínač"]},
						odkazy: [
							{ nazev: 'Pokus: Elektrické obvody (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/3427-pokus-elektricke-obvody' },
							{ nazev: 'Pokus: Elektrický zkrat (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/6931-pokus-elektricky-zkrat' },
						],
					},
				{
						slug: 'elektricky-proud-mereni',
						nazev: 'Elektrický proud a jeho měření',
						interakce: 'meridla',
						obsah: "\n\t\t\t\t\t\t\t<h2>Elektrický proud a jeho měření</h2>\n\t\t\t\t\t\t\t<p>Elektrický proud je fyzikální veličina. Udává, kolik elektrického náboje projde vodičem za jednu sekundu. Značíme ho <strong>I</strong> a měříme v <strong>ampérech (A)</strong>.</p>\n\t\t\t\t\t\t\t<p style=\"font-size:1.3rem\"><strong>I = Q : t</strong></p>\n\t\t\t\t\t\t\t<p>Q je elektrický náboj a t je čas, za který náboj vodičem projde. Dosadíme-li náboj v coulombech a čas v sekundách, vyjde proud v ampérech.</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>1 A = 1 000 mA (miliampér), 1 mA = 0,001 A</li>\n\t\t\t\t\t\t\t<li>1 A = 1 000 000 µA (mikroampér), 1 µA = 0,000 001 A</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Dohodnutý směr proudu</h3>\n\t\t\t\t\t\t\t<p>Fyzikové se dohodli, že proud teče <strong>od kladného pólu k zápornému</strong> (od + k −). Je to jen dohoda — je <strong>opačná</strong> než skutečný pohyb elektronů ve vodiči.</p>\n\t\t\t\t\t\t\t<p>Vědci totiž tento směr určili dřív, než objevili elektrony. Na dohodnutém směru je dnes postavená celá teorie elektřiny, a tak zůstal platit dodnes.</p>\n\t\t\t\t\t\t\t<h3>Stejnosměrný a střídavý proud</h3>\n\t\t\t\t\t\t\t<p><strong>Stejnosměrný proud</strong> teče vodičem pořád stejným směrem. Takový proud dávají baterie, monočlánky i akumulátory. Značí se zkratkou <strong>DC</strong>.</p>\n\t\t\t\t\t\t\t<p><strong>Střídavý proud</strong> mění směr pravidelně, mnohokrát za sekundu. Takový proud teče v domácí zásuvce. Značí se zkratkou <strong>AC</strong>.</p>\n\t\t\t\t\t\t\t<p>💡 Kapacita baterie se udává v <strong>ampérhodinách (Ah)</strong> nebo miliampérhodinách (mAh) — vychází ze vzorce Q = I · t. Baterie 1 000 mAh dodá proud 1 A po dobu 1 hodiny. Stejně tak vydrží dodávat 2 A po dobu půl hodiny, nebo 1 mA po dobu 1 000 hodin.</p>\n\t\t\t\t\t\t\t<h3>Měření ampérmetrem</h3>\n\t\t\t\t\t\t\t<p>Proud měříme přístrojem zvaným <strong>ampérmetr</strong>. Velikost proudu měří podle jeho účinků, hlavně podle magnetických.</p>\n\t\t\t\t\t\t\t<p>Ampérmetr zapojujeme do obvodu <strong>sériově</strong> — obvod rozpojíme před spotřebičem nebo za ním a na to místo vložíme ampérmetr. Celý měřený proud tak musí projít ampérmetrem, proto se obvod v tomto místě nesmí rozvětvit.</p>\n\t\t\t\t\t\t\t<p>Svorku + na přístroji vždy spojíme se svorkou + zdroje. Před měřením ještě nastavíme, jestli měříme stejnosměrný nebo střídavý proud. Když tato pravidla nedodržíme, hrozí <strong>poškození ampérmetru</strong>.</p>\n\t\t\t\t\t\t\t<h3>Proč má ampérmetr malý odpor</h3>\n\t\t\t\t\t\t\t<p>Ampérmetr má schválně <strong>velmi malý vnitřní odpor</strong>, skoro nulový. Je zapojený přímo v cestě proudu — kdyby proud brzdil, naměřená hodnota by neodpovídala skutečnosti.</p>\n\t\t\t\t\t\t\t<p>⚠️ Právě proto se ampérmetr <strong>nikdy nezapojuje paralelně</strong>, tedy vedle spotřebiče nebo přímo ke svorkám zdroje. Vznikl by <strong>zkrat</strong> a obvodem by protekl obrovský proud, který ampérmetr i zdroj zničí.</p>\n\t\t\t\t\t\t\t<h3>Rozsah a multimetr</h3>\n\t\t\t\t\t\t\t<p>Když neznáme velikost měřeného proudu, začínáme vždy na <strong>největším rozsahu</strong>. Teprve podle výchylky ručičky nebo čísla na displeji přepneme na menší, přesnější rozsah. Kdybychom začali rovnou na malém rozsahu, hrozí <strong>přetížení a poškození přístroje</strong>.</p>\n\t\t\t\t\t\t\t<p>Proud umí měřit i <strong>multimetr</strong> — přístroj, který dokáže měřit víc veličin — když ho přepneme do režimu ampérmetru. Měřicí hroty pak zapojíme do správných zdířek: pro malé proudy (mA) bývá jiná zdířka než pro velké proudy (A). I tehdy ho zapojujeme sériově, stejně jako samostatný ampérmetr.</p>\n\t\t\t\t\t\t\t<p>💡 Před zapojováním měřidla obvod raději odpojíme od zdroje a nedotýkáme se holých vodičů. Zabráníme tak zkratu i úrazu elektrickým proudem.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Vodičem projde náboj 6 C za 3 sekundy. Jaký proud vodičem teče?</p>\n\t\t\t\t\t\t\t<p>I = Q : t = 6 : 3 = 2 A</p>\n\t\t\t\t\t\t\t<p>Žárovkou teče proud 2 A po dobu 5 sekund. Kolik náboje jí projde? Použijeme odvozený vzorec Q = I · t.</p>\n\t\t\t\t\t\t\t<p>Q = I · t = 2 · 5 = 10 C</p>\n\t\t\t\t\t\t\t<p>Baterie má kapacitu 2 000 mAh. Jak dlouho vydrží dodávat proud 500 mA? Použijeme vzorec t = Q : I, kde mAh : mA = hodiny.</p>\n\t\t\t\t\t\t\t<p>t = Q : I = 2 000 : 500 = 4 hodiny</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"I = Q : t      (odvozeně: Q = I · t,  t = Q : I)","jednotky":["elektrický proud — značíme I, jednotka A (ampér)","elektrický náboj — značíme Q, jednotka C (coulomb)","čas — značíme t, jednotka s (sekunda)","Převody: 1 A = 1 000 mA (1 mA = 0,001 A),  1 A = 1 000 000 µA (1 µA = 0,000 001 A).","Do vzorce dosazuj náboj v C a čas v s, proud pak vyjde v A."],"vzorecSlovy":"elektrický proud = elektrický náboj děleno časem","body":["I = Q : t","jednotka: ampér (A), mA, µA","dohodnutý směr: od + k −","elektrony se pohybují opačně","DC stejnosměrný, AC střídavý","ampérmetr: sériově, + na +","celý proud jde ampérmetrem","nikdy paralelně = zkrat","rozsah: největší → menší"]},
						odkazy: [
							{ nazev: 'Měření elektrického proudu ampérmetrem (RVP.CZ)', url: 'https://dum.rvp.cz/materialy/mereni-elektrickeho-proudu-ampermetrem.html' },
							{ nazev: 'Elektrický proud a napětí — převody jednotek (Wordwall)', url: 'https://wordwall.net/cs/resource/74196967/elektrick%C3%BD-proud-a-nap%C4%9Bt%C3%AD-p%C5%99evody-jednotek' },
						],
					},
				{
						slug: 'elektricke-napeti-mereni',
						nazev: 'Elektrické napětí a jeho měření',
						interakce: 'meridla',
						obsah: "\n\t\t\t\t\t\t\t<h2>Elektrické napětí a jeho měření</h2>\n\t\t\t\t\t\t\t<p><strong>Elektrické napětí</strong> je hlavní vlastnost každého zdroje i spotřebiče. Značíme ho <strong>U</strong> a měříme v jednotce <strong>volt (V)</strong>.</p>\n\t\t\t\t\t\t\t<p>Napětí bývá i hodně malé, nebo hodně velké, proto používáme násobky a díly voltu. Patří mezi ně <strong>kilovolt (kV)</strong>, <strong>megavolt (MV)</strong> a <strong>milivolt (mV)</strong>. Platí: 1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V.</p>\n\t\t\t\t\t\t\t<h3>Kde se s napětím setkáváme</h3>\n\t\t\t\t\t\t\t<p>Elektrárna vyrábí proud, který teče rozvodnou sítí až do zásuvky ve zdi. Napětí v zásuvce je <strong>230 V</strong> — při špatném zacházení může být velmi nebezpečné.</p>\n\t\t\t\t\t\t\t<p>Přenosné zdroje mají menší napětí. <strong>Akumulátor</strong> je dobíjecí baterie — najdeme ji v mobilu, v notebooku i v autě. Autobaterie má napětí kolem <strong>12 V</strong>, nabíjení mobilu a notebooku přes USB-C kabel bývá <strong>20 V</strong>.</p>\n\t\t\t\t\t\t\t<p><strong>Monočlánek</strong> (tužková nebo knoflíková baterie) má napětí <strong>1,5 V</strong>. <strong>Plochá baterie</strong> je uvnitř složená ze tří monočlánků za sebou, proto má napětí <strong>4,5 V</strong>.</p>\n\t\t\t\t\t\t\t<h3>Zapojení více zdrojů za sebou</h3>\n\t\t\t\t\t\t\t<p>Když spojíme <strong>kladnou (+) svorku</strong> jedné baterie se <strong>zápornou (−) svorkou</strong> druhé, napětí zdrojů se <strong>sčítá</strong>. Tak vznikne plochá baterie: tři články po 1,5 V dají dohromady 4,5 V. Zapojením více zdrojů za sebou se v obvodu zvýší nejen <strong>napětí</strong>, ale i <strong>proud</strong>.</p>\n\t\t\t\t\t\t\t<p>Stejně funguje i zařízení na víc tužkových baterií, třeba čtyři baterie po 1,5 V dají 6 V. Zařízení ale funguje jen při <strong>správném počtu</strong> a <strong>správné orientaci</strong> baterií.</p>\n\t\t\t\t\t\t\t<h3>Měření napětí voltmetrem</h3>\n\t\t\t\t\t\t\t<p>Napětí měříme přístrojem, který se jmenuje <strong>voltmetr</strong>. Zapojujeme ho <strong>paralelně</strong> — vedle spotřebiče, na kterém chceme napětí měřit, nebo přímo ke svorkám zdroje.</p>\n\t\t\t\t\t\t\t<p>Voltmetr porovnává napětí před spotřebičem a za ním, a proto se <strong>nezapojuje do hlavního obvodu</strong>. Jím samotným smí protékat jen <strong>nepatrný proud</strong>, jinak by měření zkreslil.</p>\n\t\t\t\t\t\t\t<h3>Postup při měření</h3>\n\t\t\t\t\t\t\t<p>Nejdřív nastavíme, jestli měříme <strong>stejnosměrné, nebo střídavé</strong> napětí, a odhadneme <strong>rozsah</strong>. Pak spojíme <strong>kladnou svorku (+)</strong> přístroje s <strong>kladnou svorkou (+)</strong> zdroje.</p>\n\t\t\t\t\t\t\t<p>Voltmetr, který umí měřit i střídavé napětí, se přepólováním <strong>nepoškodí</strong> — jen u stejnosměrného napětí ukáže zápornou hodnotu.</p>\n\t\t\t\t\t\t\t<h3>Multimetr</h3>\n\t\t\t\t\t\t\t<p>💡 <strong>Multimetr</strong> je přístroj, který umí měřit napětí, proud i další veličiny — ale vždy jen <strong>jednu najednou</strong>. Pro měření napětí ho musíme jinak zapojit i jinak nastavit než pro měření proudu.</p>\n\t\t\t\t\t\t",
						zapis: {"jednotky":["elektrické napětí — značíme U, jednotka V (volt)","Převody: 1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V."],"body":["napětí: značka U, jednotka V (volt)","zásuvka 230 V","monočlánek 1,5 V","plochá baterie: 3× 1,5 V = 4,5 V","za sebou: napětí se sčítá","za sebou: roste i proud","voltmetr: zapojení paralelně","voltmetr: protéká jím jen nepatrný proud","nastavit druh napětí a rozsah","+ přístroje na + zdroje","multimetr: měří U i I zvlášť"]},
						odkazy: [
							{ nazev: 'Elektrický proud a napětí (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/1921-elektricky-proud-a-napeti' },
							{ nazev: 'Elektrický proud, napětí, odpor, Ohmův zákon — test (testi.cz)', url: 'https://testi.cz/testy/fyzika/elektricky-proud-napeti-odpor-ohmuv-zakon/' },
						],
					},
				{
						slug: 'elektricky-proud-v-kovech-odpor',
						nazev: 'Elektrický proud v kovech, odpor vodiče',
						interakce: 'odpor-vodice-zaklad',
						obsah: "\n\t\t\t\t\t\t\t<h2>Elektrický proud v kovech, odpor vodiče</h2>\n\t\t\t\t\t\t\t<p>Kovy jsou krystalické látky — jejich atomy jsou pravidelně uspořádané do krystalové mřížky. V kovu je vždycky spousta volných elektronů. Nejsou pevně vázané k žádnému atomu a mohou se volně pohybovat po celém kovu.</p>\n\t\t\t\t\t\t\t<p>Když kovem neprochází proud, volné elektrony létají všemi směry naprosto neuspořádaně. Tomuhle pohybu se říká tepelný pohyb elektronů.</p>\n\t\t\t\t\t\t\t<p>Jakmile ale vodič zapojíme do obvodu se zdrojem napětí, vznikne v něm elektrické pole. Elektrické pole elektrony usměrní — všechny se rozjedou stejným směrem, od záporného pólu ke kladnému. Tenhle usměrněný pohyb elektronů nazýváme elektrický proud.</p>\n\t\t\t\t\t\t\t<h3>Proč vodič klade odpor</h3>\n\t\t\t\t\t\t\t<p>Elektrony při svém pohybu narážejí do atomů krystalové mřížky. Atomy jsou totiž mnohem větší než elektrony — až stotisíckrát — a tak ke srážkám dochází velmi často. Při srážkách elektron většinou změní směr a zpomalí. Proto vodič klade odpor průchodu proudu.</p>\n\t\t\t\t\t\t\t<p>Elektron navíc při srážce předá atomu kousek své energie. Atom pak kmitá rychleji a vodič se zahřívá.</p>\n\t\t\t\t\t\t\t<h3>Elektrický odpor</h3>\n\t\t\t\t\t\t\t<p>Elektrický odpor značíme <strong>R</strong> a jednotkou je <strong>ohm (Ω)</strong>. Menší jednotka je miliohm (mΩ), větší kiloohm (kΩ) a megaohm (MΩ).</p>\n\t\t\t\t\t\t\t<p>Malý odpor mají dobré vodiče, třeba stříbro, měď, zlato nebo hliník. Dobrý vodič se málo zahřívá. Proto se elektrické vedení dělá z mědi a citlivé kontakty se pozlacují nebo postříbřují.</p>\n\t\t\t\t\t\t\t<p>Velký odpor má třeba nichrom (slitina niklu a chromu) — používá se na topné spirály varných konvic, fénů i topinkovačů. Podobně konstantan (slitina mědi a niklu) se používá na rezistory — součástky s přesně daným odporem. Vyrábějí se z něj i topné spirály tepelných spotřebičů.</p>\n\t\t\t\t\t\t\t<p>Izolanty, třeba keramika nebo plast, mají odpor obrovský. Žádný kov ale izolant není.</p>\n\t\t\t\t\t\t\t<p>Odpor vodiče závisí také na jeho délce, tloušťce a na teplotě — víc si o tom povíme v dalším tématu.</p>\n\t\t\t\t\t\t\t<h3>Tepelné účinky proudu</h3>\n\t\t\t\t\t\t\t<p>Čím větší odpor vodič má, tím víc se při průchodu proudu zahřívá. Tohle zahřívání využíváme třeba u žárovky — wolframové vlákno v ní žhne na 2 200 až 3 000 °C. I po vypnutí zůstává vlákno ještě horké. Podobně fungují vařič, elektrická trouba, varná konvice, žehlička nebo elektrické topení.</p>\n\t\t\t\t\t\t\t<p>Studené vlákno žárovky má menší odpor než rozžhavené. Hned po zapnutí jím proto protéká největší proud — a právě tehdy se vlákno nejčastěji přepálí.</p>\n\t\t\t\t\t\t\t<p>Zahřívání vodiče využívá i pojistka — tenký drátek se při přetížení roztaví a obvod přeruší. Tím ochrání zbytek zařízení před poškozením. Zahřívání ale může být i nebezpečné: při přetížení obvodu nebo zkratu se mohou roztavit dráty elektrického vedení a hrozí požár.</p>\n\t\t\t\t\t\t\t<p><strong>Příklad:</strong> Měděný kabel nabíječky zůstává po hodině nabíjení jen vlažný, protože měď má malý odpor. Topná spirála v konvici se ale rozžhaví doruda — nichrom, ze kterého je vyrobená, má odpor mnohem větší.</p>\n\t\t\t\t\t\t",
						zapis: {"jednotky":["elektrický odpor — značíme R, jednotka Ω (ohm)","1 mΩ = 0,001 Ω,  1 kΩ = 1 000 Ω,  1 MΩ = 1 000 000 Ω"],"body":["elektrony v kovu: volné, pohyblivé","bez proudu: pohyb neuspořádaný (tepelný)","proud = usměrněný pohyb elektronů","odpor: srážky elektronů s atomy","srážky → vodič se zahřívá","malý odpor = dobrý vodič (měď, stříbro)","velký odpor = špatný vodič (nichrom, konstantan)","rezistor: součástka s daným odporem","odpor závisí i na délce, tloušťce, teplotě","využití tepla: žárovka, vařič, pojistka","přetížení, zkrat → roztavení, požár"]},
						odkazy: [
							{ nazev: 'Nebezpečná elektřina (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5416-nebezpecna-elektrina' },
						],
					},
				{
						slug: 'zavislost-odporu-na-vodici',
						nazev: 'Závislost odporu na vlastnostech vodiče (nad rámec RVP)',
						interakce: 'odpor-vodice',
						obsah: "\n\t\t\t\t\t\t\t<h2>Závislost odporu na vlastnostech vodiče (nad rámec RVP)</h2>\n\t\t\t\t\t\t\t<p>Elektrický odpor vodiče <strong>R</strong> ukazuje, jak moc vodič brání průchodu proudu. Měříme ho v jednotce <strong>ohm</strong> — píšeme řeckým písmenem Ω, čteme „óm\". Násobky jsou kiloohm (kΩ) a megaohm (MΩ).</p>\n\t\t\t\t\t\t\t<p>Čím větší odpor, tím hůř proud vodičem prochází. Odpor závisí na čtyřech věcech: na délce vodiče, na jeho tloušťce, na materiálu a na teplotě.</p>\n\t\t\t\t\t\t\t<h3>Délka a tloušťka vodiče</h3>\n\t\t\t\t\t\t\t<p>Čím je vodič delší, tím větší má odpor. Elektrony totiž na cestě narazí do víc atomů a víc se brzdí. Tloušťka (odborně <strong>průřez</strong>) funguje obráceně: čím je vodič tenčí, tím míň místa mají elektrony k pohybu, a odpor je větší. Tlustý vodič má proto menší odpor než tenký.</p>\n\t\t\t\t\t\t\t<p>Délku vodiče značíme <strong>l</strong> a měříme v metrech (m). Průřez vodiče značíme <strong>S</strong> a měříme v metrech čtverečních (m²). U kulatého drátu ho spočítáme ze vzorce S = π·r², kde r je poloměr drátu.</p>\n\t\t\t\t\t\t\t<h3>Materiál a teplota vodiče</h3>\n\t\t\t\t\t\t\t<p>Odpor závisí i na materiálu, ze kterého je vodič vyrobený. Popisuje ho <strong>měrný odpor</strong> (rezistivita), značka <strong>ρ</strong> (řecké písmeno ró), jednotka Ω·m. Udává, jaký odpor by měl vodič z dané látky dlouhý 1 m s průřezem 1 m². Hodnoty pro různé látky najdeme ve fyzikálních tabulkách.</p>\n\t\t\t\t\t\t\t<p>Hodnoty bývají velmi malé, proto se často udávají v mikroohmmetrech (μΩ·m), což je 0,000 001 Ω·m. Nejmenší měrný odpor mají nejlepší vodiče — měď, zlato, stříbro a hliník.</p>\n\t\t\t\t\t\t\t<p>Odpor kovů roste i s teplotou. Čím je vodič teplejší, tím víc atomy v mřížce kmitají a víc brzdí elektrony, takže odpor je větší.</p>\n\t\t\t\t\t\t\t<h3>Vzorec pro výpočet odporu</h3>\n\t\t\t\t\t\t\t<p>Pro vodič o délce l a průřezu S platí vzorec:</p>\n\t\t\t\t\t\t\t<p style=\"font-size:1.3rem\"><strong>R = ρ · l : S</strong></p>\n\t\t\t\t\t\t\t<p>Všechny veličiny dosazujeme v základních jednotkách — délku v metrech, průřez v metrech čtverečních a měrný odpor v Ω·m.</p>\n\t\t\t\t\t\t\t<p>💡 V praxi je ale průřez drátu jen zlomek milimetru čtverečního a v metrech čtverečních se s ním počítá špatně. Tabulky proto uvádějí měrný odpor i v jednotce Ω·mm²/m. Pak dosazujeme délku v metrech a průřez rovnou v mm² a vyjde stejný výsledek.</p>\n\t\t\t\t\t\t\t<p>V těchto jednotkách má měď ρ = 0,018, hliník 0,028, konstantan 0,50 a nichrom asi 1,1 Ω·mm²/m. Proto se topná spirála z nichromu rozžhaví, kdežto přívodní měděný kabel zůstane studený. (Je to týž údaj jen v jiných jednotkách: 0,018 Ω·mm²/m = 0,000 000 018 Ω·m.)</p>\n\t\t\t\t\t\t\t<h3>Rezistor</h3>\n\t\t\t\t\t\t\t<p>Rezistor je součástka s přesně danou hodnotou odporu. Tvoří ho dlouhý tenký odporový drát z konstantanu, izolovaný a navinutý na keramickém válečku. Velikost jeho odporu určuje materiál i rozměry vodiče.</p>\n\t\t\t\t\t\t\t<p>Hodnotu poznáme podle barevných proužků. Ve schématu ho kreslíme jako obdélník. Rezistor se používá k regulaci proudu v obvodu.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Odporový drát je z konstantanu (ρ = 0,50 Ω·mm²/m), má délku 10 m a průřez 1 mm². Jaký má odpor?</p>\n\t\t\t\t\t\t\t<p>R = ρ · l : S = 0,50 · 10 : 1 = 5 : 1 = 5 Ω</p>\n\t\t\t\t\t\t\t<p>Zkusíme to i obráceně. Topný drát z nichromu (ρ = 1,1 Ω·mm²/m) má průřez 1 mm² a odpor 22 Ω. Jak dlouhý drát potřebujeme?</p>\n\t\t\t\t\t\t\t<p>l = R · S : ρ = 22 · 1 : 1,1 = 22 : 1,1 = 20 m</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"R = ρ · l : S      (odvozeně: l = R · S : ρ,  S = ρ · l : R,  ρ = R · S : l)","jednotky":["elektrický odpor — značíme R, jednotka Ω (ohm)","měrný odpor (rezistivita) — značíme ρ, jednotka Ω·m","délka vodiče — značíme l, jednotka m (metr)","průřez vodiče — značíme S, jednotka m² (metr čtvereční)","Převody: 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω, 1 mm² = 0,000 001 m².","Do vzorce dosazuj v Ω·m, m a m². Při ρ v Ω·mm²/m dosazuj délku v m a průřez v mm²."],"vzorecSlovy":"elektrický odpor = měrný odpor krát délka vodiče děleno průřez vodiče","body":["délka ↑ → odpor ↑","průřez (tloušťka) ↑ → odpor ↓","materiál: měrný odpor ρ","teplota ↑ → odpor ↑ (u kovů)","rezistor: pevný odpor, reguluje proud"]},
						odkazy: [
							{ nazev: 'Odpor vodiče (Eduportál Techmania)', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/elektricky-proud/odpor-vodice' },
						],
					},
				{
						slug: 'ohmuv-zakon',
						nazev: 'Ohmův zákon',
						interakce: 'ohm',
						obsah: "\n\t\t\t\t\t\t\t<h2>Ohmův zákon</h2>\n\t\t\t\t\t\t\t<p>Připojíš-li žárovku k téměř vybité baterii, svítí jen slabě a motorek se otáčí pomalu. K plně nabité baterii svítí jasně a motorek se otáčí rychle. <strong>Elektrické napětí</strong> a <strong>elektrický proud</strong> ve vodiči spolu úzce souvisí. Závislost proudu na napětí prokázal pokusy v roce 1826 německý fyzik <strong>Georg Simon Ohm</strong>.</p>\n\t\t\t\t\t\t\t<h3>Pokus: měníme napětí, měříme proud</h3>\n\t\t\t\t\t\t\t<p>Do obvodu zapojíme žárovku, <strong>ampérmetr</strong> a <strong>voltmetr</strong>. Ampérmetr měří proud <strong>I</strong> v ampérech (A), voltmetr měří napětí <strong>U</strong> ve voltech (V).</p>\n\t\t\t\t\t\t\t<p>Postupně zvyšujeme napětí na zdroji a pokaždé odečteme proud. Výsledek je jasný: <strong>kolikrát se zvětší napětí, tolikrát se zvětší proud</strong>. V grafu proudu podle napětí je to přímka, která vychází z počátku.</p>\n\t\t\t\t\t\t\t<h3>Znění zákona</h3>\n\t\t\t\t\t\t\t<p><strong>Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče.</strong> Konstantou této úměrnosti (ve vztahu U = R · I) je fyzikální veličina <strong>elektrický odpor R</strong>. Čím větší odpor vodič má, tím menší proud jím při stejném napětí prochází.</p>\n\t\t\t\t\t\t\t<h3>Elektrický odpor</h3>\n\t\t\t\t\t\t\t<p>Elektrický odpor popisuje, jak moc vodič brání průchodu proudu. Značíme ho <strong>R</strong> a jeho jednotka je <strong>ohm</strong>, značka <strong>Ω</strong> (čti „óm\", zapisujeme řeckým písmenem omega). Přímo ho měří přístroj <strong>ohmmetr</strong>. My ho ale většinou určíme nepřímo — změříme napětí a proud a vypočítáme jejich podíl.</p>\n\t\t\t\t\t\t\t<p>Odpor samotného vodiče (drátu) bývá zanedbatelný. Mnohem důležitější je odpor zapojených spotřebičů, třeba žárovky nebo topné spirály vařiče. Jejich odpor rozhoduje, kolik proudu obvodem poteče. Ve výpočtech proto se spotřebiči počítáme jako s rezistory s danou hodnotou odporu.</p>\n\t\t\t\t\t\t\t<h3>Tři podoby vzorce</h3>\n\t\t\t\t\t\t\t<p>Ze znění zákona plynou tři vzorce: <strong>I = U : R</strong>, <strong>U = R · I</strong> a <strong>R = U : I</strong>. Když známe dvě veličiny, třetí dopočítáme. Při stejném napětí platí: čím <strong>větší odpor</strong>, tím <strong>menší proud</strong> vodičem prochází.</p>\n\t\t\t\t\t\t\t<h3>Pozor na teplotu</h3>\n\t\t\t\t\t\t\t<p>Ohmův zákon platí přesně jen <strong>za stálé teploty</strong> vodiče. Odpor kovů s rostoucí teplotou <strong>roste</strong> — proto třeba u rozžhaveného vlákna žárovky už proud není přesně přímo úměrný napětí. Výjimkou je slitina <strong>konstantan</strong>, jejíž odpor se s teplotou skoro nemění. Proto se z ní vyrábějí rezistory, u kterých má Ohmův zákon platit spolehlivě.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Vodičem při napětí 10 V teče proud 0,2 A. Jeho odpor spočítáme z Ohmova zákona:</p>\n\t\t\t\t\t\t\t<p>R = U : I = 10 : 0,2 = <strong>50 Ω</strong></p>\n\t\t\t\t\t\t\t<p>Horší vodič propustí při stejném napětí jen 0,05 A.</p>\n\t\t\t\t\t\t\t<p>R = 10 : 0,05 = <strong>200 Ω</strong> — čtvrtinový proud znamená čtyřnásobný odpor.</p>\n\t\t\t\t\t\t\t<p>Vzorec funguje i naopak. Rezistor s odporem 6 Ω je připojený k napětí 12 V. Kolik jím prochází proudu?</p>\n\t\t\t\t\t\t\t<p>I = U : R = 12 : 6 = <strong>2 A</strong></p>\n\t\t\t\t\t\t\t<p>A ještě jednou jinak: rezistorem s odporem 4 Ω prochází proud 3 A. Jaké je na něm napětí?</p>\n\t\t\t\t\t\t\t<p>U = R · I = 4 · 3 = <strong>12 V</strong></p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"I = U : R      (odvozeně: U = R · I,  R = U : I)","jednotky":["elektrický proud — značíme I, jednotka A (ampér)","elektrické napětí — značíme U, jednotka V (volt)","elektrický odpor — značíme R, jednotka Ω (ohm)","Převody: 1 mΩ = 0,001 Ω,  1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω,  1 MΩ = 1 000 000 Ω.","Do vzorce dosazuj proud v A, napětí ve V a odpor v Ω."],"vzorecSlovy":"proud = napětí děleno odporem;  napětí = odpor krát proud;  odpor = napětí děleno proudem","zakon":"Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče a nepřímo úměrný elektrickému odporu R.","body":["napětí ↑ → proud ↑ (přímá úměrnost)","R = odpor, konstanta úměrnosti","větší odpor → menší proud","R měříme nepřímo: R = U : I","platí jen za stálé teploty","konstantan: odpor stálý s teplotou"]},
						odkazy: [
							{ nazev: 'Pokus: Elektrický proud a Ohmův zákon (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5420-pokus-elektricky-proud-a-ohmuv-zakon' },
							{ nazev: 'Ohmův zákon pro část obvodu — 8. ročník (Umíme fakta)', url: 'https://www.umimefakta.cz/cviceni-ohmuv-zakon-pro-cast-obvodu-8-trida' },
						],
						materialy: [
							{ druh: 'video', nazev: 'Píseň: U děleno R 🎵', cesta: '/materialy/fyzika/8-rocnik/elektrina/ohmuv-zakon/pisen-u-deleno-r.m4a' },
						],
					},
				{
						slug: 'zapojeni-spotrebicu-za-sebou',
						nazev: 'Zapojení spotřebičů za sebou (sériově)',
						interakce: 'zapojeni',
						obsah: "\n\t\t\t\t\t\t\t<h2>Zapojení spotřebičů za sebou (sériově)</h2>\n\t\t\t\t\t\t\t<p>Elektrické spotřebiče (žárovka, konvice, pračka…) můžeme do obvodu zapojit dvěma způsoby: <strong>za sebou (sériově)</strong>, nebo <strong>vedle sebe (paralelně)</strong>. Každý elektrický spotřebič má vlastní odpor. Pro výpočty proto spotřebiče nahradíme <strong>rezistory</strong>.</p>\n\t\t\t\t\t\t\t<p>V sériovém obvodu jdou rezistory <strong>jeden za druhým</strong> a obvod se <strong>nerozvětvuje</strong>. Jednoduché sériové zapojení je nejbasičtější typ elektrického obvodu.</p>\n\t\t\t\t\t\t\t<h3>Proud — teče všude stejně</h3>\n\t\t\t\t\t\t\t<p>Proud se v sériovém obvodu <strong>nedělí</strong>. Je stejný ve všech částech obvodu, tedy i ve všech rezistorech. Všechny elektrony procházejí každou částí obvodu — <strong>zákon zachování toku</strong>. Je to podobné jako proud vody v korytě řeky — kolik jí proteče na začátku, tolik i na konci.</p>\n\t\t\t\t\t\t\t<h3>Napětí — rozdělí se mezi spotřebiče</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>napětí zdroje se <strong>rozdělí mezi rezistory</strong>: U = U<sub>1</sub> + U<sub>2</sub> (zákon o úbytcích napětí)</li>\n\t\t\t\t\t\t\t<li>rozdělí se ve <strong>stejném poměru jako odpory</strong> — např. odpory 2 : 1 rozdělí napětí také 2 : 1</li>\n\t\t\t\t\t\t\t<li>na rezistoru s <strong>větším odporem je větší napětí</strong>, na menším odporu menší napětí</li>\n\t\t\t\t\t\t\t<li>napětí na jednotlivém rezistoru vypočítáme z Ohmova zákona: U<sub>1</sub> = R<sub>1</sub> · I, U<sub>2</sub> = R<sub>2</sub> · I</li>\n\t\t\t\t\t\t\t<li>Ohmův zákon platí nejen pro celý obvod, ale i pro jeho jednotlivé části — pro každý rezistor zvlášť</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Celkový odpor — rezistory se sčítají</h3>\n\t\t\t\t\t\t\t<p>Rezistory za sebou tvoří jeden <strong>delší odporový drát</strong>, proto se jejich odpory <strong>sčítají</strong>: R = R<sub>1</sub> + R<sub>2</sub>. Celkový odpor sériového obvodu je vždy <strong>větší</strong> než odpor kteréhokoli jednotlivého rezistoru. Platí to i pro víc spotřebičů za sebou — celkový odpor je součet odporů všech. Proud v obvodu pak vypočítáme z Ohmova zákona: I = U : R.</p>\n\t\t\t\t\t\t\t<h3>Vánoční žárovky — když jeden spotřebič vypadne</h3>\n\t\t\t\t\t\t\t<p>Sériové zapojení má jednu <strong>nevýhodu</strong>: přeruší-li se jediný spotřebič, obvod se přeruší a <strong>zhasnou úplně všechny žárovky najednou</strong>. Stalo by se to třeba na starém vánočním řetězu, kde praskne jedna žárovka. Pomůcka k zapamatování: když se proud <strong>nedělí</strong>, napětí se <strong>dělí</strong> — a naopak.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Sériově zapojíme dva rezistory R<sub>1</sub> = 4 Ω a R<sub>2</sub> = 6 Ω. Obvodem prochází proud I = 2 A, stejný ve všech částech.</p>\n\t\t\t\t\t\t\t<p>Napětí na prvním rezistoru: U<sub>1</sub> = R<sub>1</sub> · I = 4 · 2 = 8 V. Napětí na druhém: U<sub>2</sub> = R<sub>2</sub> · I = 6 · 2 = 12 V. Celkové napětí zdroje: U = U<sub>1</sub> + U<sub>2</sub> = 8 + 12 = 20 V.</p>\n\t\t\t\t\t\t\t<p>Ověříme to přes celkový odpor: R = R<sub>1</sub> + R<sub>2</sub> = 4 + 6 = 10 Ω. Podle Ohmova zákona U = R · I = 10 · 2 = 20 V — sedí to.</p>\n\t\t\t\t\t\t\t<p>Na vánočním řetězu svítí sériově 3 stejné žárovky, každá s odporem 2 Ω, zapojené na zdroj s napětím 12 V. Celkový odpor: R = 2 + 2 + 2 = 6 Ω. Proud v obvodu: I = U : R = 12 : 6 = 2 A.</p>\n\t\t\t\t\t\t\t<p>Napětí na jedné žárovce: U<sub>1</sub> = R<sub>1</sub> · I = 2 · 2 = 4 V. Stejné napětí je i na ostatních dvou žárovkách, protože mají stejný odpor. Kontrola: 4 + 4 + 4 = 12 V, přesně napětí zdroje.</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"I = I₁ = I₂,  U = U₁ + U₂,  R = R₁ + R₂","jednotky":["elektrický proud — značíme I (na rezistorech I₁, I₂ — jsou stejné jako I), jednotka A (ampér)","elektrické napětí — značíme U (na rezistorech U₁, U₂), jednotka V (volt)","elektrický odpor — značíme R (na rezistorech R₁, R₂), jednotka Ω (ohm)","Převody: 1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω.","Do vztahů dosazuj proud v A, napětí ve V a odpor v Ω."],"vzorecSlovy":"proud je ve všech rezistorech stejný jako celkový; celkové napětí = součet napětí na rezistorech; celkový odpor = součet odporů rezistorů","zakon":"Ohmův zákon platí pro veličiny v celém obvodu (U, I, R), ale i pro jednotlivé části obvodu: rezistory (R₁, U₁, I₁ a R₂, U₂, I₂).","body":["sériově: spotřebiče za sebou, obvod nerozvětven","proud: stejný všude, nedělí se","napětí: dělí se, U = U₁ + U₂","větší odpor → větší napětí na něm","odpor: R = R₁ + R₂, roste","porucha jednoho spotřebiče → zhasne vše"]},
						odkazy: [
							{ nazev: 'Sériové a paralelní zapojení — výklad (E-manuel.cz)', url: 'https://e-manuel.cz/kapitoly/elektricke-obvody/vyklad/seriove-a-paralelni-zapojeni/' },
							{ nazev: 'Sériové a paralelní zapojení v obvodu — test (testi.cz)', url: 'https://testi.cz/testy/fyzika/seriove-a-paralelni-zapojeni-v-obvodu/' },
						],
					},
				{
						slug: 'zapojeni-spotrebicu-vedle-sebe',
						nazev: 'Zapojení spotřebičů vedle sebe (paralelně)',
						interakce: 'zapojeni',
						obsah: "\n\t\t\t\t\t\t\t<h2>Zapojení spotřebičů vedle sebe (paralelně)</h2>\n\t\t\t\t\t\t\t<p>Elektrické spotřebiče můžeme do obvodu zapojit dvěma způsoby: <strong>za sebou (sériově)</strong>, nebo <strong>vedle sebe (paralelně)</strong>. Každý elektrický spotřebič má vlastní odpor, proto ho pro výpočty nahrazujeme <strong>rezistorem</strong>. V paralelním obvodu je každý spotřebič připojen přímo ke zdroji.</p>\n\t\t\t\t\t\t\t<p>Vodiče se spojují v místech, kterým říkáme <strong>uzly</strong>, takže je obvod <strong>rozvětvený</strong>. Přesně takhle jsou zapojené zásuvky v domácnosti. Paralelní zapojení spotřebičů je důležitý typ elektrického obvodu.</p>\n\t\t\t\t\t\t\t<h3>Napětí — na každé větvi stejné</h3>\n\t\t\t\t\t\t\t<p>Oba konce každého rezistoru jsou přímo spojené s póly zdroje. Proto je napětí na každé větvi stejné jako napětí zdroje. V paralelním zapojení se napětí nedělí, jak by se to dělo v sériovém obvodu.</p>\n\t\t\t\t\t\t\t<h3>Proud — dělí se v uzlu</h3>\n\t\t\t\t\t\t\t<p>V uzlu se proud rozdělí do jednotlivých větví. Platí zákon o zachování proudu: <strong>I = I<sub>1</sub> + I<sub>2</sub></strong>. Kolik proudu do uzlu vteče, tolik z něj musí i vytéct.</p>\n\t\t\t\t\t\t\t<p>Tok elektronů si můžeš představit jako řeku, která se rozdělí do dvou koryt. Rezistorem s menším odporem poteče víc proudu, stejně jako víc vody poteče širším korytem. Proud se totiž rozdělí v opačném poměru, než jsou odpory: čím větší odpor, tím menší proud.</p>\n\t\t\t\t\t\t\t<p>Proud na každé větvi spočítáme z Ohmova zákona zvlášť: <strong>I<sub>1</sub> = U : R<sub>1</sub></strong> a <strong>I<sub>2</sub> = U : R<sub>2</sub></strong>. Ohmův zákon totiž platí nejen pro celý obvod, ale i pro každou jeho část.</p>\n\t\t\t\t\t\t\t<h3>Celkový odpor — proč klesá</h3>\n\t\t\t\t\t\t\t<p>Rezistory vedle sebe tvoří dohromady větší plochu průřezu, kterou proud prochází. Proto celkový odpor klesá a je menší než odpor kterékoli jednotlivé větve. Platí vzorec <strong>1 : R = 1 : R<sub>1</sub> + 1 : R<sub>2</sub></strong>.</p>\n\t\t\t\t\t\t\t<p>I kdyby bylo vedle sebe zapojeno víc spotřebičů, funguje to stejně — jen do součtu přibudou další zlomky. Celkový odpor vždycky vyjde menší, než má nejmenší z rezistorů.</p>\n\t\t\t\t\t\t\t<h3>Výhoda paralelního zapojení</h3>\n\t\t\t\t\t\t\t<p>Když se proud dělí, napětí se nedělí — to je dobrá pomůcka k zapamatování. Hlavní výhoda paralelního zapojení je, že spotřebiče fungují nezávisle na sobě. Když jedna žárovka v domácnosti přepálí, obvod se nepřeruší a ostatní spotřebiče svítí a fungují dál.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Ke zdroji s napětím U = 12 V jsou paralelně připojené dva rezistory: R<sub>1</sub> = 6 Ω a R<sub>2</sub> = 3 Ω. Spočítáme proud v obou větvích z Ohmova zákona.</p>\n\t\t\t\t\t\t\t<p>I<sub>1</sub> = U : R<sub>1</sub> = 12 : 6 = 2 A</p>\n\t\t\t\t\t\t\t<p>I<sub>2</sub> = U : R<sub>2</sub> = 12 : 3 = 4 A</p>\n\t\t\t\t\t\t\t<p>Celkový proud je jejich součet: I = I<sub>1</sub> + I<sub>2</sub> = 2 + 4 = 6 A. Odpory jsou v poměru R<sub>1</sub> : R<sub>2</sub> = 6 : 3, tedy 2 : 1. Proudy vyšly přesně obráceně, 2 A : 4 A, tedy 1 : 2.</p>\n\t\t\t\t\t\t\t<p>Celkový odpor spočítáme ze vzorce pro paralelní rezistory: 1 : R = 1 : R<sub>1</sub> + 1 : R<sub>2</sub>. Dosadíme: 1 : R = 1 : 6 + 1 : 3 = 1 : 6 + 2 : 6 = 3 : 6 = 1 : 2. Když je 1 : R = 1 : 2, je R = 2 Ω.</p>\n\t\t\t\t\t\t\t<p>Zkouška: R = U : I = 12 : 6 = 2 Ω — vyšlo to stejně jako přes vzorec pro paralelní rezistory.</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"U = U₁ = U₂,  I = I₁ + I₂,  1 : R = 1 : R₁ + 1 : R₂","jednotky":["elektrické napětí — značíme U (na větvích U₁, U₂ — jsou stejné jako U), jednotka V (volt)","elektrický proud — značíme I (na větvích I₁, I₂ — jejich součet je I), jednotka A (ampér)","elektrický odpor — značíme R (na větvích R₁, R₂), jednotka Ω (ohm)","Převody: 1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω.","Do vztahů dosazuj proud v A, napětí ve V a odpor v Ω."],"vzorecSlovy":"napětí je na všech větvích stejné jako napětí zdroje; celkový proud je součtem proudů v jednotlivých větvích; převrácená hodnota celkového odporu je součtem převrácených hodnot odporů jednotlivých větví","zakon":"Součet proudů v jednotlivých větvích je roven celkovému proudu v obvodu: I = I₁ + I₂.","body":["paralelně: každý spotřebič ke zdroji","napětí: všude stejné jako zdroj","proud: dělí se, I = I₁ + I₂","odpor: 1 : R = 1 : R₁ + 1 : R₂, klesá","porucha jednoho → ostatní fungují"]},
						odkazy: [
							{ nazev: 'Sériové a paralelní zapojení (E-manuel.cz)', url: 'https://e-manuel.cz/kapitoly/elektricke-obvody/vyklad/seriove-a-paralelni-zapojeni/' },
						],
					},
				{
						slug: 'rezistor-s-promennym-odporem',
						nazev: 'Rezistor s proměnným odporem',
						interakce: 'reostat',
						obsah: "\n\t\t\t\t\t\t\t<h2>Rezistor s proměnným odporem — reostat a potenciometr</h2>\n\t\t\t\t\t\t\t<p>Rezistor s proměnným odporem je součástka, u které jde <strong>měnit odpor</strong>. Skládá se z <strong>odporového drátu</strong> a <strong>posuvného jezdce</strong>. Jezdec určuje, jak dlouhý kus drátu je právě zapojený do obvodu.</p>\n\t\t\t\t\t\t\t<p>Podle konstrukce bývá <strong>posuvný</strong> (jezdec klouže rovně) nebo <strong>otočný</strong> (jezdec se otáčí jako knoflík). Podle způsobu zapojení do obvodu se mu říká <strong>reostat</strong>, nebo <strong>potenciometr</strong>.</p>\n\t\t\t\t\t\t\t<h3>Reostat — regulace proudu</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>zapojí se jednou svorkou (kovovou spojkou pro vodič) na konstrukci a svorkou jezdce — využívá jen <strong>jednu část</strong> drátu</li>\n\t\t\t\t\t\t\t<li>slouží k <strong>regulaci proudu</strong> v obvodu: čím menší odpor, tím větší proud i výkon</li>\n\t\t\t\t\t\t\t<li>dnes se moc nepoužívá (velké ztráty tepla) — nahradily ho polovodičové (elektronické) součástky; dřív ovládal třeba tramvaje</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Potenciometr — dělič napětí</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>zapojí se <strong>obě svorky konstrukce i jezdec</strong> — využívá <strong>obě části</strong> drátu</li>\n\t\t\t\t\t\t\t<li>slouží k <strong>regulaci napětí</strong>: jezdec rozdělí drát na dva sériové rezistory a napětí ze zdroje se rozdělí mezi ně</li>\n\t\t\t\t\t\t\t<li>platí: čím menší odpor má jedna část, tím větší odpor (a tím i napětí) má druhá část</li>\n\t\t\t\t\t\t\t<li>umí to i naopak: polohu jezdce převede na odpor a ten na napětí — tak vzniká <strong>snímač polohy</strong></li>\n\t\t\t\t\t\t\t<li>snímače polohy, úhlu i napětí se využijí v <strong>průmyslu a robotice</strong>, při kalibraci přístrojů nebo v ovládacích panelech</li>\n\t\t\t\t\t\t\t<li>jako dělič napětí se potenciometr využívá k ovládání <strong>hlasitosti, jasu, otáček motorů</strong></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Jak je reostat vyrobený</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>na keramickém nebo plastovém válci je navinutý <strong>odporový drát</strong> (třeba ze slitiny nichrom nebo konstantan)</li>\n\t\t\t\t\t\t\t<li>tento drát má vyšší odpor než měděný vodič a vydrží vysokou teplotu</li>\n\t\t\t\t\t\t\t<li>po drátu klouže kovový <strong>jezdec</strong>, spojený s výstupní svorkou — posunem jezdce se mění, kolik závitů drátu je zapojeno</li>\n\t\t\t\t\t\t\t<li>čím delší kus drátu je zapojen, tím <strong>větší je odpor</strong></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Proč se reostat zahřívá</h3>\n\t\t\t\t\t\t\t<p>Reostat omezuje proud svým odporem. Přitom se elektrická energie mění na teplo, proto se zahřívá. Platí pro něj vzorec pro výkon <strong>P = U · I</strong> (nebo P = I² · R). Každý reostat má výrobcem daný <strong>jmenovitý výkon</strong> (třeba 25 W) — kolik tepla dokáže bez poškození vyzářit.</p>\n\t\t\t\t\t\t\t<p>Když jím prochází moc velký proud, přehřeje se a odporový drát se může přepálit.</p>\n\t\t\t\t\t\t\t<h3>Co se stane při nulovém odporu</h3>\n\t\t\t\t\t\t\t<p>Když jezdec posuneme na doraz tak, že v obvodu nezůstane žádný kus drátu (R = 0 Ω), reostat přestane proud omezovat vůbec. V obvodu pak teče proud omezený jen odporem ostatních součástek — může být nebezpečně velký a spálit spotřebič nebo vodiče.</p>\n\t\t\t\t\t\t\t<p>Proto se u reostatu vždy dává pozor, na jakou hodnotu je jezdec nastavený, než se obvod zapne.</p>\n\t\t\t\t\t\t\t<h3>Využití dnes</h3>\n\t\t\t\t\t\t\t<p>Čisté reostaty se dnes kvůli ztrátám teplem používají málo — nahradily je polovodičové (elektronické) součástky (tranzistory, triaky), které teplem neplýtvají. Potenciometry se naopak používají běžně.</p>\n\t\t\t\t\t\t\t<p>Najdeme je jako <strong>otočný knoflík hlasitosti</strong> u starších zesilovačů a rádií. Používají se i jako <strong>snímač polohy plynového pedálu</strong> v autech nebo páky u herních ovladačů. Staré typy stmívačů světel fungovaly přímo jako reostat, dnešní obvykle spínají proud jinak.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Zdroj s napětím <strong>12 V</strong> je připojen k reostatu. Jezdec je nastaven na odpor <strong>6 Ω</strong>: proud I = U : R = 12 : 6 = <strong>2 A</strong>.</p>\n\t\t\t\t\t\t\t<p>Posuneme jezdec tak, aby v obvodu zůstal jen odpor <strong>3 Ω</strong> (poloviční). Proud vzroste na I = 12 : 3 = <strong>4 A</strong> — dvakrát menší odpor znamená dvakrát větší proud.</p>\n\t\t\t\t\t\t\t<p>Výkon na reostatu při 3 Ω je P = U · I = 12 · 4 = <strong>48 W</strong>. Pokud je jeho jmenovitý výkon jen 25 W, reostat by se poškodil.</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"I = U : R      (odvozeně: U = I · R,  R = U : I);  P = U · I  (odvozeně: P = I² · R)","jednotky":["elektrický proud — značíme I, jednotka A (ampér)","elektrické napětí — značíme U, jednotka V (volt)","elektrický odpor — značíme R, jednotka Ω (ohm)","elektrický výkon — značíme P, jednotka W (watt)","Převody: 1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω,  1 kW = 1 000 W.","Do vzorců dosazuj proud v A, napětí ve V, odpor v Ω a výkon ve W."],"vzorecSlovy":"elektrický proud = napětí děleno odporem; elektrický výkon = napětí krát proud (nebo proud na druhou krát odpor)","body":["jezdec: mění délku zapojeného drátu","delší drát → větší odpor","reostat: reguluje proud (jedna část)","potenciometr: dělí napětí (obě části)","potenciometr: umí být i snímač polohy","reostat: mění energii v teplo","R = 0 Ω: proud neomezený, nebezpečí"]},
						odkazy: [
							{ nazev: 'Reostat, dělič napětí (potenciometr) — F8 (vyuka.p3k.eu)', url: 'https://vyuka.p3k.eu/f8-reostat-delic-napeti-potenciometr/' },
							{ nazev: 'Rezistory s proměnnou hodnotou (Wikipedie)', url: 'https://cs.wikipedia.org/wiki/Rezistory_s_prom%C4%9Bnnou_hodnotou' },
						],
					},
				{
						slug: 'elektricka-prace-a-vykon',
						interakce: 'elektricka-prace-a-vykon',
						nazev: 'Elektrická práce a energie, výkon proudu',
						obsah: "<h2>Elektrická práce a energie, výkon proudu</h2>\n\n<p>Když připojíme kovový vodič ke zdroji elektrického napětí, vznikne ve vodiči <strong>elektrické pole</strong>. Pole působí na nabité částice elektrickou silou. Síla uvede volné elektrony do usměrněného pohybu — vzniká elektrický proud. Při průchodu proudu vodičem tak síly elektrického pole konají <strong>elektrickou práci</strong>.</p>\n<p>Elektrická práce se značí <strong>W</strong>. Jednotka je <strong>joule (J)</strong>, v praxi se často používá <strong>kilowatthodina (kWh)</strong>. Elektrický proud přenáší obvodem elektrickou energii ze zdroje ke spotřebiči. Zdrojem elektrické energie je zdroj elektrického napětí.</p>\n<p>Elektrická energie se dá přenášet na velké vzdálenosti. Snadno se také mění na jiné druhy energie, které potřebujeme. Proto se v domácnostech i v průmyslu používá tak často.</p>\n\n<h3>Přeměny elektrické energie</h3>\n<p>V elektrických spotřebičích a vodičích se elektrická energie mění na jiné druhy energie:</p>\n<ul>\n<li>na <strong>mechanickou práci</strong> (mixér, vrtačka, výtah, elektroautomobil)</li>\n<li>na <strong>teplo</strong> (vařič, topení, konvice)</li>\n<li>na <strong>světlo</strong> (žárovka, televize)</li>\n<li>na <strong>chemickou energii</strong> (nabíjení akumulátoru, elektrolýza)</li>\n</ul>\n\n<h3>Výkon a příkon</h3>\n<ul>\n<li><strong>Výkon P</strong> = energie za sekundu, jednotka <strong>watt (W)</strong>. Počítá se <strong>P = U · I</strong>.</li>\n<li><strong>Příkon P<sub>0</sub></strong> = kolik spotřebič odebírá ze sítě (údaj na štítku). Příkon je vlastně výkon procházejícího proudu, počítá se stejně: <strong>P<sub>0</sub> = U · I</strong> — a právě tenhle výkon platíš.</li>\n<li><strong>Užitečný výkon</strong> je jen ta část příkonu, kterou spotřebič opravdu použije na to, co po něm chceme. Je vždy <strong>menší než příkon</strong> — zbytek uniká jako <strong>teplo (ztráty)</strong>.</li>\n<li><strong>Práce: W = P<sub>0</sub> · t = U · I · t</strong></li>\n</ul>\n\n<h3>Jednotky energie</h3>\n<p>Když spotřebič o výkonu <strong>1 W</strong> běží <strong>1 sekundu</strong>, spotřebuje <strong>1 J</strong>. Proto platí <strong>1 Ws = 1 J</strong>. Dál platí <strong>1 Wh = 3 600 J</strong> a <strong>1 kWh = 3 600 000 J</strong>. Spotřeba elektřiny doma se počítá v kWh.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p><strong>Účinnost</strong> udává, kolik procent spotřebované elektrické energie spotřebič využije na užitečnou práci. Stejně tak udává, jakou část příkonu spotřebič promění ve svůj užitečný výkon. Účinnost je vždy <strong>menší než 100 %</strong> — část energie se vždy ztratí jako teplo.</p>\n<p>Klasická žárovka má účinnost jen asi <strong>5 %</strong> — zbylých 95 % energie se mění na teplo, ne na světlo. <strong>LED žárovka</strong> má účinnost mnohem vyšší, asi <strong>70 %</strong>, proto svítí úsporněji.</p>\n<p>Z účinnosti plyne, proč se LED vyplatí. Klasická žárovka 100 W promění na světlo jen 5 W (100 · 5 %). LED se stejnou svítivostí potřebuje mnohem méně energie. Poměr účinností je 70 % : 5 %, tedy <strong>čtrnáctkrát méně</strong>.</p>\n<p>Za měsíc svícení (5 hodin denně) spotřebuje stará žárovka 15 kWh, LED jen zlomek. A přebytek u staré žárovky nezmizel: <strong>topil ti do pokoje</strong>.</p>\n<p>🧮 <strong>Kolik stojí vaření vody — celý příklad.</strong> Rychlovarná konvice má na štítku <strong>2 000 W</strong> a v rodině běží asi <strong>30 minut denně</strong>. Kolik za ni zaplatíte za měsíc?</p>\n<ol>\n<li><strong>Převeď na kilowatty a hodiny</strong> — v kWh se totiž elektřina účtuje: 2 000 W = <strong>2 kW</strong>, 30 minut = <strong>0,5 h</strong></li>\n<li><strong>Denní spotřeba:</strong> <strong>W</strong> = <strong>P</strong> · <strong>t</strong> = 2 · 0,5 = <strong>1 kWh</strong></li>\n<li><strong>Za 30 dní:</strong> 1 · 30 = <strong>30 kWh</strong></li>\n<li><strong>Cena</strong> (počítejme 5 Kč za kWh): 30 · 5 = <strong>150 Kč</strong></li>\n</ol>\n<p>👉 Všimni si, že se počítá s <strong>příkonem ze štítku</strong>, ne s užitečným výkonem. <strong>Platíš všechno, co spotřebič ze sítě odebere</strong>, i tu část, která unikne jako nechtěné teplo.</p>\n<p>💡 Zkus si sám: kolik by stálo svícení staré 100W žárovky 5 hodin denně po celý měsíc? (Nápověda: 0,1 kW · 5 h = 0,5 kWh za den.)</p>",
						zapis: {"vzorec":"P = U · I;  P₀ = U · I;  W = P₀ · t = U · I · t      (odvozeně: t = W : P₀,  P₀ = W : t)","jednotky":["elektrická práce a energie W — joule (J) nebo kilowatthodina (kWh)","výkon P — watt (W)","příkon P₀ — watt (W)","elektrické napětí U — volt (V)","elektrický proud I — ampér (A)","čas t — sekunda (s), při výpočtu v kWh hodina (h)","1 Ws = 1 J,  1 Wh = 3 600 J,  1 kWh = 1 000 Wh = 3 600 000 J,  1 kW = 1 000 W","Pro výsledek v J dosazuj příkon ve W a čas v s; pro výsledek v kWh příkon v kW a čas v h."],"vzorecSlovy":"výkon se rovná napětí krát proud; příkon se rovná napětí krát proud; elektrická práce se rovná příkonu krát čas, tedy napětí krát proud krát čas","body":["proud ve vodiči → koná elektrickou práci","elektrická práce: značka W, jednotka J (kWh)","proud přenáší energii ke spotřebiči","zdroj energie = zdroj napětí","energie jde na dálku, snadno se mění","přeměny: pohyb, teplo, světlo, chemická energie","výkon P: energie za sekundu, watt (W)","příkon P₀: odběr ze sítě, na štítku","užitečný výkon < příkon (ztráty teplem)","spotřeba domácnosti: kilowatthodiny (kWh)","1 Ws = 1 J, 1 Wh = 3 600 J","účinnost: kolik % energie se využije","účinnost vždy menší než 100 %","klasická žárovka: účinnost jen 5 %","LED žárovka: účinnost asi 70 %"]},
						materialy: [
							{ druh: 'youtube', nazev: 'Video: Elektrická práce, výkon a účinnost spotřebičů', cesta: 'jPZ2a2J8MHc' },
						],
						odkazy: [
							{ nazev: 'Procvičování: Elektrická práce a výkon (Umíme fakta)', url: 'https://www.umimefakta.cz/fyzika/cviceni-elektricka-prace-a-vykon' },
							{ nazev: 'Prezentace: Kolik zaplatíme za elektřinu (PDF, ZŠ Horšovský Týn)', url: 'https://www.zshtyn.cz/wp-content/uploads/2021/04/Elektrick%C3%A1-pr%C3%A1ce-a-v%C3%BDkon-II-PDF.pdf' },
							{ nazev: 'Práce a výkon elektrického proudu (Eduportál Techmania)', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/elektricky-proud/prace-vykon-elektrickeho-proudu' },
						],
					},
				{
						slug: 'ucinky-proudu-a-bezpecnost',
						interakce: 'ucinky-proudu-a-bezpecnost',
						nazev: 'Účinky proudu na člověka, bezpečnost',
						obsah: "\n\t\t\t\t\t\t\t<h2>Účinky proudu na člověka a bezpečnost</h2>\n\t\t\t\t\t\t\t<p><strong>Lidské tělo je vodič.</strong> Průchod proudu tělem může způsobit popáleniny, křeče svalů, <strong>fibrilaci (rozhození rytmu) až zástavu srdce</strong>, poškození nervů, mozku i paměti.</p>\n\t\t\t\t\t\t\t<p>Poškození může být <strong>přímé</strong> — proud prochází přímo tkáněmi — nebo <strong>nepřímé</strong>, třeba popálenina od hořícího oděvu nebo zlomenina po pádu.</p>\n\t\t\t\t\t\t\t<p>Účinky se navíc dělí na <strong>akutní</strong>, které se projeví hned, a <strong>pozdní</strong>, které se ukážou až za měsíce nebo roky.</p>\n\t\t\t\t\t\t\t<p><strong>Stejnosměrný proud</strong> (třeba z baterie) vyvolá silné křeče svalů v místě, kudy do těla vstupuje i vystupuje. Člověk se pak od zdroje nemůže sám odtrhnout.</p>\n\t\t\t\t\t\t\t<p><strong>Střídavý proud</strong>, jaký teče i domácí zásuvkou, navíc může rozhodit srdeční rytmus — způsobit fibrilaci. Proud může v těle rozkládat i krev a buněčné membrány.</p>\n\t\t\t\t\t\t\t<h3>Míra poškození podle proudu</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>0,5–1 mA — práh vnímání</li>\n\t\t\t\t\t\t\t<li>1–8 mA — podráždění nervů, stoupá krevní tlak</li>\n\t\t\t\t\t\t\t<li>6–15 mA — křeč, člověk se <strong>nemůže pustit</strong></li>\n\t\t\t\t\t\t\t<li>~25 mA — křeč dýchacích svalů</li>\n\t\t\t\t\t\t\t<li>~60 mA — fibrilace srdce (přechodná zástava); <strong>nad 80 mA</strong> — trvalá zástava srdce</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Co velikost proudu ovlivňuje</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>odpor suchého člověka</strong>: velký odpor má jen <strong>suchá kůže a suchá obuv při malém napětí</strong> (~150 000 Ω). Proto z baterie nic necítíš. Suchá obuv odpor proti zemi ještě zvyšuje, zvlášť pokud je z gumy. Od zhruba 50 V se ale kůže prorazí a odpor těla klesne na <strong>~2 000 Ω</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>odpor vlhkého člověka</strong>: vlhký člověk má nízký odpor hned od začátku. Ani suchý člověk po proražení kůže není v bezpečí. Vodivější jsi ostatně i po pouhém zpocení.</li>\n\t\t\t\t\t\t\t<li><strong>cesta proudu</strong>: nejnebezpečnější přes ruku do srdce nebo přes hlavu</li>\n\t\t\t\t\t\t\t<li>bezpečné napětí <strong>ve vlhkých a zvlášť nebezpečných prostorách</strong> (koupelna, bazén, sklep): stejnosměrné <strong>25 V</strong>, střídavé <strong>12 V</strong>. V suchých místnostech jsou meze vyšší (střídavé 50 V, stejnosměrné 120 V). Zásuvkových <strong>230 V</strong> se to ale netýká nikde, ta jsou nebezpečná vždy.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Jistič vás nezachrání — proudový chránič ano</h3>\n\t\t\t\t\t\t\t<p>Ty dvě věci se pletou, a je v tom podstatný rozdíl:</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Jistič</strong> hlídá, aby obvodem netekl <strong>příliš velký</strong> proud\n\t\t\t\t\t\t\t(typicky nad 16 A) — chrání <strong>vedení a dům před požárem</strong>. Proud\n\t\t\t\t\t\t\t115 mA, který podle výpočtu níže zabíjí, je pro jistič naprosto nezajímavý; ani se nehne.</li>\n\t\t\t\t\t\t\t<li><strong>Proudový chránič</strong> porovnává, kolik proudu do spotřebiče\n\t\t\t\t\t\t\t<strong>přiteče</strong> a kolik se ho <strong>vrátí</strong>. Když se část ztrácí — třeba\n\t\t\t\t\t\t\t<strong>tělem člověka do země</strong> — okamžitě vypne. Reaguje už na\n\t\t\t\t\t\t\t<strong>30 mA</strong>, tedy pod hranicí, za kterou hrozí fibrilace,\n\t\t\t\t\t\t\ta stihne to za setiny sekundy.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>Proto je proudový chránič dnes povinný u zásuvek v koupelnách a venku.\n\t\t\t\t\t\t\t<strong>Pozor — chránič není důvod si dovolit víc.</strong> Zásuvka v koupelně je\n\t\t\t\t\t\t\tpřípustná jen mimo prostor vany a sprchy, a spotřebič se u vody nikdy\n\t\t\t\t\t\t\tnepoužívá. Chránič je poslední záchrana, když se něco pokazí, ne povolení riskovat.</p>\n\t\t\t\t\t\t\t<h3>Rizika mimo domácí zásuvku</h3>\n\t\t\t\t\t\t\t<p>Bezpečnost s elektřinou nekončí u zásuvky doma — pár pravidel platí i venku a při mimořádných situacích.</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Hoří zapojený spotřebič?</strong> Nejdřív <strong>vypni proud</strong> —\n\t\t\t\t\t\t\tvytáhni zástrčku ze zásuvky, nebo vypni jistič. Teprve pak has. <strong>Vodou se zapojený\n\t\t\t\t\t\t\tspotřebič nikdy nehasí</strong> — voda vede proud a proud by tekl vodním proudem\n\t\t\t\t\t\t\taž k tobě.</li>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Trafostanice, sloupy a vedení vysokého napětí:</strong> nikdy\n\t\t\t\t\t\t\tnepodlézej ani nepřelézej oplocení a nelez na stožár. U vysokého napětí může\n\t\t\t\t\t\t\tproud <strong>přeskočit obloukem i bez dotyku</strong> — stačí se přiblížit,\n\t\t\t\t\t\t\tsáhnout na vedení vůbec nemusíš. Stejným způsobem vzniká i blesk při bouřce.</li>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Spadlý drát na zemi</strong> (i u trolejového vedení vlaků) se\n\t\t\t\t\t\t\tchová stejně. Může být pod napětím, i když nejiskří a nic neukazuje. Nepřibližuj\n\t\t\t\t\t\t\tse k němu, varuj ostatní a volej <strong>112</strong> (případně <strong>150</strong> hasiče). <strong>155</strong> volej navíc jen tehdy, je-li někdo zraněný.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>👉 U vysokého napětí neplatí „nic jsem se nedotkl, tak je to bezpečné\" — rozhoduje\n\t\t\t\t\t\t\tvzdálenost, ne dotyk.</p>\n\t\t\t\t\t\t\t<h3>Bezpečná pravidla</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>nesahat na vypínač/kabely <strong>mokrou rukou</strong>, žádné spotřebiče ve vaně a sprše</li>\n\t\t\t\t\t\t\t<li>před výměnou žárovky <strong>vypnout jistič</strong>; do zásuvky nestrkat drobné předměty</li>\n\t\t\t\t\t\t\t<li>nedotýkat se jednou rukou elektrického kabelu a druhou rukou kovového předmětu</li>\n\t\t\t\t\t\t\t<li>spotřebič připojovat do zásuvky, až když je <strong>vypnutý</strong></li>\n\t\t\t\t\t\t\t<li>nedotýkat se poškozených kabelů ani spadlých drátů vedení</li>\n\t\t\t\t\t\t\t<li>neotvírat a neopravovat spotřebič, dokud <strong>není vytažený ze zásuvky</strong></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>První pomoc při úrazu proudem</h3>\n\t\t\t\t\t\t\t<p><strong>Na pořadí opravdu záleží</strong> — dělej to přesně takhle:</p>\n\t\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li><strong>Vypni proud</strong> (vypínač, jistič, pojistky). Dokud proud teče,\n\t\t\t\t\t\t\tnesahej na zraněného — tekl by i tebou.</li>\n\t\t\t\t\t\t\t<li><strong>Mysli na vlastní bezpečnost.</strong> ⚠️ Jde-li o <strong>vysoké napětí</strong>\n\t\t\t\t\t\t\t(sloup, trafostanice, spadlý drát, trolejové vedení), <strong>nepřibližuj se a nic\n\t\t\t\t\t\t\tneodsouvej</strong>. Proud tam přeskočí obloukem i bez dotyku. Zůstaň v bezpečné\n\t\t\t\t\t\t\tvzdálenosti a volej <strong>155 nebo 112</strong>. Jde-li o běžnou domácí elektřinu\n\t\t\t\t\t\t\t(zásuvka, spotřebič) a proud vypnout nejde, odsuň zraněného <strong>suchou dřevěnou\n\t\t\t\t\t\t\tnebo plastovou tyčí</strong>. Případně použij suchou gumovou obuv a gumové rukavice,\n\t\t\t\t\t\t\tnikdy se ho nedotýkej holou rukou. Zraněný, kterému nemá kdo pomoct, protože ležíš vedle něj, je na tom hůř.</li>\n\t\t\t\t\t\t\t<li><strong>Zavolej 155</strong> — hned, ještě než začneš pomáhat. Zapni si\n\t\t\t\t\t\t\t<strong>hlasitý odposlech</strong>, nebo pošli volat někoho jiného. Operátor tě\n\t\t\t\t\t\t\tpovede a řekne ti, co dělat.</li>\n\t\t\t\t\t\t\t<li><strong>Uvolni oděv a zkontroluj dech i tep.</strong> Nedýchá normálně?\n\t\t\t\t\t\t\t<strong>Stlačuj hrudník</strong> — uprostřed hrudi, do hloubky asi 5 cm,\n\t\t\t\t\t\t\trychlostí zhruba 100× za minutu. Pokud umíš, přidávej i umělé dýchání.\n\t\t\t\t\t\t\tNepřestávej, dokud nepřijede pomoc.</li>\n\t\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t\t<p>👉 Zraněného <strong>vždy předej záchranářům</strong>, i když se probral a tvrdí,\n\t\t\t\t\t\t\tže je mu dobře. Proud může poškodit srdce tak, že se to projeví až za několik hodin.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Proč z ploché baterie nic necítíš, a přitom zásuvka zabíjí? Stačí\n\t\t\t\t\t\t\t<strong>Ohmův zákon</strong> <strong>I</strong> = <strong>U</strong> : <strong>R</strong>:</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Plochá baterie 4,5 V</strong> na suchou kůži (R ≈ 150 000 Ω):\n\t\t\t\t\t\t\t<strong>I</strong> = 4,5 : 150 000 = 0,00003 A = <strong>30 µA</strong> → ani to nepoznáš,\n\t\t\t\t\t\t\tjsi hluboko pod prahem vnímání.</li>\n\t\t\t\t\t\t\t<li><strong>Zásuvka 230 V</strong>: tady je zrada. Suchá kůže má sice velký odpor,\n\t\t\t\t\t\t\tale jen do zhruba <strong>50 V</strong>. Při vyšším napětí se elektricky <strong>prorazí</strong>\n\t\t\t\t\t\t\ta přestane chránit. Odpor těla pak klesne na <strong>asi 2 000 Ω</strong> a vyjde\n\t\t\t\t\t\t\t<strong>I</strong> = 230 : 2 000 = <strong>115 mA</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Mokrý člověk</strong> (R ≈ 2 000 Ω): stejně nízký odpor má vlhká kůže\n\t\t\t\t\t\t\thned od malého napětí. Vyjde proto opět <strong>I</strong> = 230 : 2 000 = <strong>115 mA</strong>.\n\t\t\t\t\t\t\tNebezpečné je to tak jako tak — suchý po proražení kůže i rovnou mokrý.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>⚠️ Podívej se do tabulky výš: <strong>obě poslední čísla jsou hluboko nad 80 mA</strong>,\n\t\t\t\t\t\t\ttedy v pásmu zástavy srdce. <strong>Zásuvka je životu nebezpečná vždycky, i když jsi\n\t\t\t\t\t\t\túplně suchý.</strong> Už nad ~50 V se totiž prorazí kůže i v suchu, takže tě odpor\n\t\t\t\t\t\t\tsuché kůže vůbec nechrání. Vlhký člověk je ohrožen stejně, jen k tomu nepotřebuje\n\t\t\t\t\t\t\tžádné vysoké napětí — nízký odpor má hned od začátku.</p>\n\t\t\t\t\t\t\t<p>👉 A právě proto <strong>není bezpečné napětí totéž co malé napětí</strong>: rozhoduje,\n\t\t\t\t\t\t\tjestli napětí dokáže prorazit kůži. Do koupelny proto nepatří žádný spotřebič ze zásuvky\n\t\t\t\t\t\t\tani prodlužovačka a na vypínač se nesahá mokrou rukou.</p>\n\t\t\t\t\t\t",
						zapis: {"vzorec":"I = U : R      (odvozeně: U = I · R,  R = U : I)","jednotky":["elektrický proud I — ampér (A)","elektrické napětí U — volt (V)","elektrický odpor R — ohm (Ω)","1 A = 1 000 mA = 1 000 000 µA","Do vzorce dosazuj napětí ve V a odpor v Ω; proud vyjde v A."],"vzorecSlovy":"proud je roven napětí děleno odporem; napětí je rovno proudu krát odpor; odpor je roven napětí děleno proudem","zakon":"Elektrický proud je přímo úměrný napětí a nepřímo úměrný elektrickému odporu.","body":["tělo je vodič, proud škodí","přímé: tkáň; nepřímé: popálenina, zlomenina","akutní ihned, pozdní za měsíce","stejnosměrný: křeč v místě vstupu","střídavý ze zásuvky: riziko fibrilace","proud rozkládá krev a buňky","škoda roste s proudem (mA)","odpor, cesta i napětí mění riziko","jistič chrání dům, chránič člověka","chránič vypíná už při 30 mA","bezpečné napětí: stejnosměrné 25 V, střídavé 12 V","vysoké napětí škodí i bez dotyku","nesahat mokrou rukou na elektriku","první pomoc: vypni proud, volej 155","uvolni oděv, zkontroluj dech a tep; nedýchá? stlačuj hrudník"]},
						materialy: [
							{ druh: 'youtube', nazev: 'Video: Účinky elektrického proudu na lidský organismus', cesta: 'VfCqvZDHUWQ' },
						],
						odkazy: [
							{ nazev: 'Video: Nebezpečná elektřina (ČT edu, pořad PORT)', url: 'https://edu.ceskatelevize.cz/video/5416-nebezpecna-elektrina' },
							{ nazev: 'Bezpečnost a první pomoc při zásahu proudem (ČEZ)', url: 'https://www.cez.cz/cs/clanky/bezpecnost-a-prvni-pomoc-pri-zasahu-elektrickym-proudem-163506' },
							{ nazev: 'První pomoc krok za krokem: úraz elektrickým proudem (Stačí málo)', url: 'https://www.staci-malo.cz/detail/co-delat-pri-urazu-elektrickym-proudem' },
							{ nazev: 'Prevence úrazů elektřinou doma (Dětství bez úrazů)', url: 'https://detstvibezurazu.cz/prevence-urazu-deti/bezpecny-domov/urazy-elektrickym-proudem/' },
						],
					},
			],
		},
		{
			slug: 'zvuk',
			nazev: 'Zvuk',
			podtemata: [
				{
					slug: 'kmitani-a-vlneni',
					nazev: 'Kmitání a vlnění (nad rámec RVP)',
					interakce: 'vlneni',
					obsah: "\n\t\t\t\t\t\t<h2>Kmitání a vlnění (nad rámec RVP)</h2>\n\t\t\t\t\t\t<p>Příkladem kmitavého pohybu je dítě na houpačce, kyvadlo nebo skokan na bungee laně. Těleso se opakovaně vychyluje na obě strany a vrací se zpět. Když těleso pravidelně prochází rovnovážnou polohou, jde o <strong>periodický kmitavý pohyb</strong>.</p>\n\t\t\t\t\t\t<h3>Základní pojmy kmitání</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Rovnovážná poloha</strong> — poloha, ve které je těleso v klidu.</li>\n\t\t\t\t\t\t\t<li><strong>Kmitání</strong> — pohyb, při kterém se těleso opakovaně vychyluje z rovnovážné polohy a vrací se zpět. Výchylka pravidelně střídá strany.</li>\n\t\t\t\t\t\t\t<li><strong>Kmit</strong> — nejmenší pravidelně se opakující část pohybu: z jedné krajní výchylky přes rovnovážnou polohu do druhé a zpět.</li>\n\t\t\t\t\t\t\t<li><strong>Kyv</strong> — pohyb tělesa jen jedním směrem, tedy polovina kmitu.</li>\n\t\t\t\t\t\t\t<li><strong>Amplituda</strong> — velikost největší výchylky z rovnovážné polohy. Bez tření je výchylka na obě strany stejně velká.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Perioda a frekvence</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Perioda T</strong> — doba jednoho kmitu; jednotka <strong>sekunda (s)</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Frekvence f</strong> — počet kmitů za 1 sekundu, tedy i počet period za 1 sekundu; jednotka <strong>hertz (Hz)</strong>.</li>\n\t\t\t\t\t\t\t<li>Perioda a frekvence jsou <strong>převrácené hodnoty</strong>: <strong>f = 1 : T</strong> a <strong>T = 1 : f</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Příklad: houpačka udělá 2 kmity za sekundu, proto f = 2 Hz. Jeden kmit trvá půl sekundy, proto T = 0,5 s.</p>\n\t\t\t\t\t\t<p>V běžném životě jde většinou o <strong>tlumené kmitání</strong>. Výchylka se kvůli tření o vzduch i uvnitř tělesa postupně zmenšuje, až se těleso zastaví.</p>\n\t\t\t\t\t\t<h3>Vlnění</h3>\n\t\t\t\t\t\t<p>Když hodíme kamínek do vody, rozkmitají se molekuly v místě dopadu. Se zpožděním se rozkmitají i molekuly sousední — kmitání se šíří dál a vznikají <strong>vlny</strong>. Vlnění tedy vzniká šířením kmitavého pohybu látkovým prostředím.</p>\n\t\t\t\t\t\t<p>Všechny částice kmitají se <strong>stejnou frekvencí</strong>. Pokud zanedbáme tření, kmitají i se stejnou amplitudou, jen každá s malým zpožděním.</p>\n\t\t\t\t\t\t<h3>Vlnová délka a rychlost šíření</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Vlnová délka λ</strong> — nejmenší vzdálenost dvou bodů, které kmitají stejně (ve stejné fázi); jednotka <strong>metr (m)</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Rychlost šíření vlnění v</strong> — jednotka <strong>metr za sekundu (m/s)</strong>. Závisí na tom, jak blízko sebe jsou částice látky a jak silně jsou vzájemně vázány.</li>\n\t\t\t\t\t\t\t<li>Vlnění se nejrychleji šíří pevnými látkami a nejpomaleji plyny.</li>\n\t\t\t\t\t\t\t<li>Vztah: <strong>λ = v · T = v : f</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Druhy mechanického vlnění</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Vlnění příčné</strong> — částice kmitají <strong>kolmo</strong> na směr šíření (vlny na hladině, struna kytary). Vlnu je vidět jako „kopečky a údolí\". Existuje jen v pevných a kapalných látkách, kde jsou částice vázány přitažlivými silami.</li>\n\t\t\t\t\t\t\t<li><strong>Vlnění podélné</strong> — částice kmitají <strong>ve směru</strong> šíření (například zvuk, klasy obilí v poli za větru, padající kostky domina). Vzniká nahuštěním a zředěním částic. Existuje ve všech skupenstvích.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Houpačka z úvodu má f = 2 Hz. Spočítáme periodu.</p>\n\t\t\t\t\t\t<p>T = 1 : f = 1 : 2 = <strong>0,5 s</strong></p>\n\t\t\t\t\t\t<p>Vlna se šíří rychlostí 2 m/s a její perioda je 3 s. Jaká je její vlnová délka?</p>\n\t\t\t\t\t\t<p>λ = v · T = 2 · 3 = <strong>6 m</strong></p>\n\t\t\t\t\t\t<p>Zvuk se šíří vzduchem rychlostí 340 m/s s frekvencí 170 Hz. Jaká je jeho vlnová délka?</p>\n\t\t\t\t\t\t<p>λ = v : f = 340 : 170 = <strong>2 m</strong></p>\n\t\t\t\t\t",
					zapis: {"vzorec":"f = 1 : T      (odvozeně: T = 1 : f)      λ = v · T = v : f      (odvozeně: v = λ : T,  T = λ : v,  v = λ · f,  f = v : λ)","jednotky":["perioda — značíme T, jednotka s (sekunda)","frekvence — značíme f, jednotka Hz (hertz)","vlnová délka — značíme λ, jednotka m (metr)","rychlost šíření vlnění — značíme v, jednotka m/s (metr za sekundu)","Do vzorců dosazuj periodu v s, frekvenci v Hz a rychlost v m/s; vlnová délka vyjde v m."],"vzorecSlovy":"frekvence = 1 děleno periodou; perioda = 1 děleno frekvencí; vlnová délka = rychlost krát perioda = rychlost děleno frekvencí","body":["rovnovážná poloha: klidová poloha tělesa","kmit: tam a zpět jednou","kyv: pohyb jedním směrem, půl kmitu","amplituda: největší výchylka z rovnováhy","perioda T: doba jednoho kmitu","frekvence f: počet kmitů za sekundu","perioda T ↔ frekvence f: převrácené hodnoty","vlnění: šíření kmitání látkou","vlnová délka λ: vzdálenost bodů se stejnou fází","příčné vlnění: kolmo na směr šíření","podélné vlnění: ve směru šíření"]},
					materialy: [
						{
							druh: 'youtube',
							nazev: 'Video: Kmitání a vlnění',
							cesta: 'oP6IJtosIp0',
						},
					],
				},
				{
					slug: 'zvuk-vznik-a-sireni',
					nazev: 'Zvuk, vznik a šíření zvuku',
					interakce: 'ozvena',
					obsah: "\n\t\t\t\t\t\t<h2>Zvuk, vznik a šíření zvuku</h2>\n\t\t\t\t\t\t<p><strong>Zvuk je mechanické vlnění, které vnímáme sluchem.</strong> Vzniká <strong>chvěním těles</strong> — třeba rozkmitanou strunou, blánou bubnu nebo hlasivkami. Kmitající těleso vysílá kolem sebe tlakovou vlnu, kterou uslyšíme jako zvuk. K šíření zvuku je vždy potřeba <strong>látkové prostředí</strong>.</p>\n\t\t\t\t\t\t<h3>Jak zvuk vzniká a šíří se</h3>\n\t\t\t\t\t\t<p>Chvějící se těleso stlačuje a zřeďuje částice okolního prostředí — vzduchu, vody nebo pevné látky. Tyto změny hustoty se šíří látkou dál od zdroje jako <strong>tlaková vlna</strong>. Zvuk chvějícího se tělesa vzniká opakováním takových tlakových impulsů.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Ve vakuu se zvuk nešíří</strong> — nejsou tam žádné částice, které by se zhušťovaly a zřeďovaly.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Frekvence a výška tónu</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Frekvence f</strong> (starší název kmitočet) udává počet kmitů zdroje za 1 sekundu; jednotka <strong>hertz (Hz)</strong>.</li>\n\t\t\t\t\t\t\t<li>Frekvence určuje <strong>výšku tónu</strong>: nízká frekvence znamená hluboký tón, vysoká frekvence vysoký tón. Komorní tón „a\" má frekvenci 440 Hz — podle něj se ladí hudební nástroje.</li>\n\t\t\t\t\t\t\t<li>Lidské ucho slyší přibližně <strong>16 Hz až 16 000 Hz</strong> (nejcitlivější je na 2 000–4 000 Hz).</li>\n\t\t\t\t\t\t\t<li><strong>Infrazvuk</strong> — vlnění pod 16 Hz (dorozumívají se jím sloni nebo velryby).</li>\n\t\t\t\t\t\t\t<li><strong>Ultrazvuk</strong> — vlnění nad 16 kHz (vysílají ho delfíni nebo netopýři a využívají ho k echolokaci).</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Zdroje zvuku, tón a hluk</h3>\n\t\t\t\t\t\t<p>Zvuk vzniká chvěním pružných těles. Rozkmitat je lze několika způsoby:</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Úderem</strong> — blána bubnu, struna klavíru, kovadlina pod úderem kladiva.</li>\n\t\t\t\t\t\t\t<li><strong>Drnkáním</strong> — struny kytary nebo harfy, křídla luční kobylky.</li>\n\t\t\t\t\t\t\t<li><strong>Smýkáním</strong> — smyčec houslí, vlhký prst na okraji sklenice.</li>\n\t\t\t\t\t\t\t<li><strong>Trvalou deformací</strong> — tříštící se sklo, mačkaný papír, zmrzlý sníh při chůzi.</li>\n\t\t\t\t\t\t\t<li><strong>Rychlým pohybem</strong> — švihnutí proutkem, práskající bič, lopatky větráku.</li>\n\t\t\t\t\t\t\t<li><strong>Prouděním kolem hrany</strong> — píšťalka, flétna, dráty ve větru.</li>\n\t\t\t\t\t\t\t<li><strong>Prudkou změnou tlaku</strong> — výstřel, otevření láhve s bublinkami, hrom.</li>\n\t\t\t\t\t\t\t<li><strong>Prouděním mezi tělesy</strong> — lidské hlasivky, hvízdání rty.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Různé nástroje znějí jinak i při stejném tónu. Určuje to <strong>barva zvuku</strong>, která závisí na velikosti, tvaru a materiálu tělesa.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Tón</strong> (hudební zvuk) vzniká <strong>pravidelným</strong> kmitáním (struna, hlasivky).</li>\n\t\t\t\t\t\t\t<li><strong>Hluk</strong> vzniká <strong>nepravidelným</strong> kmitáním (šramot, vrzání, praskání).</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Rychlost zvuku</h3>\n\t\t\t\t\t\t<p>Rychlost zvuku závisí na prostředí, kterým se šíří. Nejrychleji se šíří v pevných látkách, nejpomaleji v plynech. V pevné látce jsou částice blízko sebe a pevně vázané, takže reagují na pohyb sousední částice velmi rychle. V plynu jsou částice daleko od sebe a bez vazby, takže reagují pomalu.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>ve vzduchu <strong>≈ 340 m/s</strong> (mírně kolísá s teplotou, vlhkostí a hustotou vzduchu)</li>\n\t\t\t\t\t\t\t<li>ve vodě <strong>≈ 1 500 m/s</strong></li>\n\t\t\t\t\t\t\t<li>v oceli <strong>≈ 5 000 m/s</strong></li>\n\t\t\t\t\t\t\t<li>ve vakuu <strong>0 m/s</strong> (zvuk se nešíří)</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Odraz zvuku: ozvěna, dozvuk a ultrazvuk</h3>\n\t\t\t\t\t\t<p>Zvukové vlnění se odráží od velkých ploch — skal, jeskyní, budov, lesa nebo mořského dna.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Ozvěna</strong> — odražený zvuk uslyšíme zvlášť, má-li zpoždění aspoň <strong>0,1 s</strong>; to odpovídá překážce vzdálené aspoň <strong>17 m</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Dozvuk</strong> — u bližší překážky (do 17 m) původní a odražený zvuk splynou. Zvuk se rozléhá, trvá déle a je zesílený (jeskyně, kostel, prázdná místnost). Využívají to koncertní sály — zdi a stropy musí být členité, jinak vzniká ozvěna. Nevýhodou dozvuku je nižší srozumitelnost řeči.</li>\n\t\t\t\t\t\t\t<li><strong>Ultrazvuk se odráží ze všech zvuků nejlépe</strong>, proto ho využívají přístroje i zvířata. Odraz ultrazvuku se využívá: <strong>sonar</strong> (hloubka moře), <strong>echolot</strong> (hejna ryb), <strong>sonografie</strong> (zobrazení orgánů nebo miminka).</li>\n\t\t\t\t\t\t\t<li>Dál ho využívá <strong>defektoskopie</strong> (skryté trhliny v materiálu) a echolokace netopýrů a velryb.</li>\n\t\t\t\t\t\t\t<li>Odrazu zvuku využívá i <strong>lékařský stetoskop</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Ohyb a pohlcování zvuku</h3>\n\t\t\t\t\t\t<p>Zvuk se ohýbá i za menší překážky — proto slyšíme zvuk z místnosti s jen pootevřenými dveřmi.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Vysoké tóny</strong> s vysokou frekvencí se ohýbají jen na malých překážkách.</li>\n\t\t\t\t\t\t\t<li><strong>Hluboké tóny</strong> s nízkou frekvencí se ohýbají i za velké překážky. Proto z kapely o pár ulic dál slyšíme jen basu a buben, ale ne zpěv.</li>\n\t\t\t\t\t\t\t<li>Zvuk <strong>pohlcují</strong> měkké materiály s obsahem vzduchu: polystyren, molitan, pěna, vata, textil.</li>\n\t\t\t\t\t\t\t<li>Využití: <strong>zvuková izolace</strong> — nahrávací studia, protihlukové stěny u silnic.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Obor fyziky, který zkoumá vznik, šíření a vnímání zvuku, se nazývá <strong>akustika</strong>.</p>\n\t\t\t\t\t",
					zapis: {"jednotky":["frekvence — značíme f, jednotka Hz (hertz)","rychlost šíření zvuku — značíme v, jednotka m/s (metr za sekundu)"],"body":["zvuk = mechanické vlnění, vnímáme sluchem","vzniká chvěním pružných těles","šíří se jen látkovým prostředím","ve vakuu se zvuk nešíří","frekvence f: kmity za sekundu (Hz)","vysoká frekvence → vysoký tón","sluch: 16 Hz až 16 000 Hz","nejcitlivější ucho: 2 000–4 000 Hz","komorní tón a: 440 Hz","infrazvuk pod 16 Hz, ultrazvuk nad 16 kHz","tón = pravidelné kmitání, hluk = nepravidelné","barva zvuku: velikost, tvar, materiál tělesa","rychlost zvuku: pevné > kapaliny > plyny","vzduch 340 m/s, voda 1 500 m/s","ocel 5 000 m/s, vakuum 0 m/s","ozvěna: zpoždění aspoň 0,1 s, aspoň 17 m","dozvuk: bližší překážka, zvuk splývá","ultrazvuk se odráží nejlépe","hluboké tóny se ohýbají i za velké překážky","měkké porézní materiály zvuk pohlcují","akustika = obor fyziky o zvuku"]},
					materialy: [
						{
							druh: 'youtube',
							nazev: 'Video: Fyzika zvuku – vysvětlení',
							cesta: 'irfetAid_y0',
						},
						{
							druh: 'youtube',
							nazev: 'Video: Akustický diktát',
							cesta: '4uaNca3El9A',
						},
						{ druh: 'video', nazev: 'Píseň: Ve vakuu ticho 🎵', cesta: '/materialy/fyzika/8-rocnik/zvuk/zvuk-vznik-a-sireni/pisen-ve-vakuu-ticho.m4a' },
					],
				},
				{
					slug: 'vnimani-zvuku-a-hlasitost',
					nazev: 'Vnímání zvuku, hlasitost zvuku',
					interakce: 'decibely',
					obsah: "\n\t\t\t\t\t\t<h2>Vnímání zvuku, hlasitost zvuku</h2>\n\t\t\t\t\t\t<p>Člověk vnímá zvuk sluchem. Zvuková vlna se šíří vzduchem jako tlaková vlna, projde uchem a mozek ji nakonec vyhodnotí jako zvuk.</p>\n\t\t\t\t\t\t<h3>Cesta zvuku uchem</h3>\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li><strong>Ušní boltec</strong> zachytí zvuk z okolí a nasměruje ho do zvukovodu.</li>\n\t\t\t\t\t\t\t<li><strong>Zvukovod</strong> vede zvuk dál k bubínku.</li>\n\t\t\t\t\t\t\t<li><strong>Ušní bubínek</strong> se dopadem zvukové vlny rozkmitá (pohyb od 0,0001 mm až po 1 mm).</li>\n\t\t\t\t\t\t\t<li><strong>Kůstky</strong> (kladívko, kovadlinka, třmínek) přenesou kmity přes pružné okénko do vnitřního ucha.</li>\n\t\t\t\t\t\t\t<li><strong>Hlemýžď</strong> — kmity se přenesou do kapaliny uvnitř.</li>\n\t\t\t\t\t\t\t<li><strong>Vláskové buňky</strong> rozkmitá kapalina a vyšlou nervový signál. Jsou velmi jemné — <strong>při poškození se už neobnoví</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Sluchový nerv</strong> pošle signál do mozku, který ho vnímá jako zvuk.</li>\n\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t<h3>Ucho jako přeměňovač energie</h3>\n\t\t\t\t\t\t<p>Ucho cestou postupně předává kmity dalšímu prostředí. Nejprve kmitá <strong>vzduch</strong> (akustická energie), pak <strong>kůstky</strong> spojené s bubínkem (mechanická energie) a v hlemýždi <strong>kapalina</strong> (hydraulická energie). Vláskové buňky kmity kapaliny nakonec promění na <strong>elektrický nervový signál</strong>. Zvuk se tak do mozku nedostává přímo, ale až po několika přeměnách.</p>\n\t\t\t\t\t\t<h3>Hlasitost zvuku</h3>\n\t\t\t\t\t\t<p>Vnímání hlasitosti je <strong>subjektivní</strong> — každý člověk má jinou citlivost sluchu. Objektivně ji popisuje <strong>hladina intenzity zvuku</strong>, která měří tlak zvukové vlny. Jednotkou je <strong>decibel (dB)</strong>.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Práh slyšitelnosti</strong> — nejslabší slyšitelný zvuk; hladina <strong>0 dB</strong> (odtud se stupnice měří).</li>\n\t\t\t\t\t\t\t<li><strong>Práh bolesti</strong> — nejsilnější zvuk, který ucho snese; hladina <strong>130 dB</strong>, při překročení hrozí protržení bubínku.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h3>Rizika nadměrného hluku</h3>\n\t\t\t\t\t\t<p>Dlouhodobý pobyt v hluku nad <strong>90 dB</strong> trvale a nevratně poškozuje vláskové (nervové) buňky. Při extrémním hluku může prasknout bubínek. Nadměrný hluk zhoršuje i psychický stav — způsobuje nesoustředěnost a poruchy pozornosti. Zhoršuje i fyzický stav — bolesti hlavy a nevolnost.</p>\n\t\t\t\t\t\t<h3>Ochrana sluchu</h3>\n\t\t\t\t\t\t<p>Sluch chráníme více způsoby. Používáme <strong>ochranné pomůcky</strong> — protihluková sluchátka a špunty do uší. Udržujeme bezpečnou vzdálenost od zdroje hluku, třeba na přehlídce tryskových letadel, a posloucháme hudbu ve sluchátkách rozumně nahlas.</p>\n\t\t\t\t\t\t<p>Hluk omezujeme i technicky — tlumiči výfuku, odhlučněním strojů a protihlukovými stěnami. Platí i <strong>hygienické normy</strong> a ohleduplnost lidí, třeba vypnutí motoru stojícího auta nebo zákaz práce se sekačkami o nedělích.</p>\n\t\t\t\t\t",
					zapis: {"jednotky":["hladina intenzity zvuku — jednotka dB (decibel)"],"body":["boltec → zvukovod → bubínek","bubínek kmitá: 0,0001 až 1 mm","kůstky: kladívko, kovadlinka, třmínek","kůstky vedou kmity do hlemýždě","hlemýžď: kmity rozvlní kapalinu uvnitř","vláskové buňky: kapalina → nervový signál","poškozené vláskové buňky se neobnoví","sluchový nerv nese signál do mozku","prostředí kmitů: vzduch → kůstky → kapalina → nerv","hlasitost je subjektivní, citlivost je různá","hladina intenzity zvuku = objektivní hlasitost","jednotka hladiny intenzity: decibel (dB)","práh slyšitelnosti: 0 dB","práh bolesti: 130 dB, hrozí protržení bubínku","nad 90 dB: trvalé poškození sluchu","hluk škodí i psychicky a fyzicky","ochrana: sluchátka, špunty, vzdálenost, tišší hudba","ochrana: tlumiče, stěny, hygienické normy, ohleduplnost"]},
					materialy: [
						{
							druh: 'youtube',
							nazev: 'Video: Jak slyšíme a chráníme sluch',
							cesta: '109chWMF7RI',
						},
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co máš umět za 1. pololetí</h2>
						<p>Přehled učiva prvního pololetí 8. ročníku. Dole na stránce si dej <strong>souhrnný kvíz</strong> složený z otázek všech probraných témat.</p>
						<h3>1. <a href="../../mechanicka-prace-a-vykon/">Mechanická práce a výkon</a></h3>
						<ul><li>práce W = F · s (joule); výkon P = W : t (watt)</li></ul>
						<h3>2. <a href="../../energie/">Energie</a></h3>
						<ul><li>přeměny energie; pohybová a polohová energie; zákon zachování mechanické energie; energetická hodnota potravin; vnitřní energie; tepelná výměna a teplo</li></ul>
						<h3>3. <a href="../../tepelne-motory/">Tepelné motory</a></h3>
						<ul><li>parní stroj; spalovací motory</li></ul>
						<h3>4. <a href="../../teplo-a-zmeny-skupenstvi/">Teplo a změny skupenství</a></h3>
						<ul><li>tání a tuhnutí; vypařování a var; kondenzace; skupenské změny vody v přírodě</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>práce W = F · s (J), výkon P = W : t (W)</li>
							<li>1 kWh = 3,6 MJ</li>
						</ul>
					`,
					zapis: {
						body: [
							'Mechanická práce vzniká působením síly po určité dráze a výkon udává, jak rychle se práce vykoná.',
							'Energie se může přeměňovat mezi pohybovou a polohovou, ale celková mechanická energie se zachovává.',
							'Vnitřní energie tělesa se mění tepelnou výměnou a teplo může způsobit změnu skupenství.',
							'Tepelné motory, například parní stroj a spalovací motor, využívají tepelnou energii.',
						],
						zakon: 'Zákon zachování mechanické energie: mechanická energie se může přeměňovat mezi pohybovou a polohovou, ale její celková velikost se zachovává.',
						vzorec: 'W = F · s      (odvozeně: F = W : s,  s = W : F);  P = W : t      (odvozeně: W = P · t,  t = W : P)',
						jednotky: [
							'práce W — joule (J)',
							'síla F — newton (N)',
							'dráha s — metr (m)',
							'výkon P — watt (W)',
							'čas t — sekunda (s)',
							'1 kWh = 3,6 MJ',
							'Do vzorců dosazuj v základních jednotkách: práci v J, sílu v N, dráhu v m a čas v s.',
						],
					},
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co máš umět za celý 8. ročník</h2>
						<p>Přehled učiva celého ročníku. Dole na stránce najdeš <strong>souhrnný kvíz</strong> z otázek všech témat roku.</p>
						<h3>1. <a href="../../mechanicka-prace-a-vykon/">Mechanická práce a výkon</a></h3>
						<ul><li>W = F · s, P = W : t</li></ul>
						<h3>2. <a href="../../energie/">Energie</a></h3>
						<ul><li>pohybová a polohová energie, zákon zachování, vnitřní energie, tepelná výměna</li></ul>
						<h3>3. <a href="../../tepelne-motory/">Tepelné motory</a></h3>
						<ul><li>parní stroj, spalovací motory</li></ul>
						<h3>4. <a href="../../teplo-a-zmeny-skupenstvi/">Teplo a změny skupenství</a></h3>
						<ul><li>tání, tuhnutí, vypařování, var, kondenzace; koloběh vody</li></ul>
						<h3>5. <a href="../../elektrina/">Elektřina</a></h3>
						<ul><li>elektrický náboj a pole; vznik proudu, zdroje napětí; obvody; měření proudu (A) a napětí (V); odpor a Ohmův zákon; sériové a paralelní zapojení; reostat a potenciometr; práce a výkon proudu; účinky proudu a bezpečnost</li></ul>
						<h3>6. <a href="../../zvuk/">Zvuk</a></h3>
						<ul><li>kmitání a vlnění; vznik a šíření zvuku; vnímání zvuku a hlasitost (decibely)</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>W = F · s, P = W : t, 1 kWh = 3,6 MJ</li>
							<li>Ohmův zákon: I = U : R</li>
							<li>rychlost zvuku ve vzduchu ≈ 340 m/s</li>
						</ul>
					`,
					zapis: {
						body: [
							'Mechanická práce závisí na síle a dráze, výkon vyjadřuje práci vykonanou za určitý čas.',
							'Energie může být pohybová, polohová nebo vnitřní; při přeměnách platí zákon zachování energie.',
							'Teplo souvisí s tepelnou výměnou a změnami skupenství: táním, tuhnutím, vypařováním, varem a kondenzací.',
							'V elektrických obvodech měříme proud a napětí, pracujeme s odporem a Ohmovým zákonem a rozlišujeme sériové a paralelní zapojení.',
							'Zvuk vzniká kmitáním, šíří se vlněním a jeho hlasitost vyjadřujeme v decibelech.',
						],
					},
				},
			],
		},
	],
	// Struktura 9. ročníku PŘESTAVĚNA dle skutečných složek učitele na Google Disku (témata 01–22).
	// Celek 1 (Magnetické pole) HOTOVÝ; ostatní celky zatím dlaždice — doplní se výkladem + kvízy.
	'fyzika/9-rocnik': [
		{
			slug: 'magneticke-pole',
			nazev: 'Magnetické pole',
			podtemata: [
				{
					slug: 'magnety-magneticke-pole-opakovani',
					nazev: 'Magnety a magnetické pole (opakování)',
					interakce: 'magnety-opakovani',
					obsah: "<h2>Magnety a magnetické pole (opakování)</h2>\n\n<p>Magnet znáš určitě z domova — třeba magnetku na lednici nebo střelku kompasu. Magnet umí přitahovat některé kovové věci, i když se jich vůbec nedotýká. V tomto opakování si připomeneme, jak magnety fungují a jaké mají vlastnosti.</p>\n\n<h3>Které látky magnet přitahuje</h3>\n<ul>\n<li><strong>Feromagnetické látky</strong> se k magnetu silně přitahují a dají se samy zmagnetovat. Patří sem železo a jeho slitiny, tedy ocel, a dále kobalt a nikl.</li>\n<li><strong>Nemagnetické látky</strong> na magnet skoro nereagují. Jsou to třeba dřevo, papír, korek, ale i některé kovy — hliník, měď, zinek nebo stříbro.</li>\n<li>Pro zajímavost: existují i <strong>diamagnetické látky</strong>, které magnet nepatrně odpuzuje — třeba uhlík, měď nebo zlato.</li>\n</ul>\n\n<h3>Magnet a jeho póly</h3>\n<p>Každý magnet má dva <strong>magnetické póly</strong>: <strong>severní (N)</strong> a <strong>jižní (S)</strong>. Na pólech je magnetická síla nejsilnější. Uprostřed magnetu je naopak <strong>netečné pásmo</strong>, kde je síla nejslabší.</p>\n<p>Když magnet přelomíš na dva kusy, nezíská jeden kus jen severní pól a druhý jen jižní. Každý kousek magnetu má znovu oba póly — severní i jižní.</p>\n\n<h3>Přitahování a odpuzování</h3>\n<p>Stejné póly se odpuzují: severní pól odpuzuje jiný severní pól. Opačné póly se naopak přitahují: severní pól přitahuje jižní pól. Čím dál od sebe magnety jsou, tím je jejich vzájemná síla slabší.</p>\n\n<h3>Magnetické pole a indukční čáry</h3>\n<p>Kolem každého magnetu vzniká <strong>magnetické pole</strong>. Projevuje se tím, že silově působí na jiné magnety a na feromagnetické látky. Přítomnost magnetického pole zjistíme malou <strong>magnetkou</strong>, tedy střelkou kompasu.</p>\n<p>Magnetické pole umíme i zviditelnit. Když na magnet položíme papír a nasypeme na něj železné piliny, uspořádají se do <strong>pilinového obrazce</strong>. Piliny ukazují, jakým směrem magnetická síla kolem magnetu působí.</p>\n<p>Fyzikové kreslí magnetické pole pomocí <strong>magnetických indukčních čar</strong>. Jsou to uzavřené křivky, které vně magnetu vedou od severního pólu k jižnímu. Ukazují, kam by se natočil severní pól magnetky.</p>\n\n<h3>Jak vzniká magnet — magnetizace</h3>\n<p>Přírodní magnet je nerost s obsahem železa, říká se mu <strong>magnetit</strong>. Trvalé umělé magnety vznikají <strong>magnetizací</strong> — silné magnetické pole zmagnetuje feromagnetickou látku a udělá z ní magnet. Takto vznikají třeba feritové nebo neodymové magnety.</p>\n<p>Magnety mají různé tvary: tyčový, podkova nebo malá magnetka, což je střelka kompasu.</p>\n\n<h3>K čemu se magnety využívají</h3>\n<ul>\n<li>rychlé <strong>připevnění</strong> — nástěnka, autoanténa, magnet na svítilně, držák dvířek</li>\n<li><strong>kompas, buzola</strong></li>\n<li><strong>reproduktory</strong></li>\n<li>magnetické stavebnice</li>\n<li><strong>pevný disk počítače</strong> (harddisk)</li>\n<li>páska videokazety, audiokazety</li>\n<li>menší <strong>elektromotor</strong> (stěrače, autíčka)</li>\n<li><strong>sběrač kovových štěpin</strong> v motoru či topení</li>\n</ul>\n\n<h3>Magnetické pole Země</h3>\n<p>I naše planeta se chová jako obrovský <strong>tyčový magnet</strong>. Střelka kompasu ukazuje svým severním pólem k severu. Proto na severním zeměpisném pólu Země leží ve skutečnosti <strong>jižní magnetický pól</strong>. Magnetické póly neleží přesně na zeměpisných pólech, jen poblíž.</p>\n<p>Magnetické pole Země nás chrání před <strong>slunečním větrem</strong> a kosmickým zářením. Jde o proud nebezpečných nabitých částic ze Slunce — magnetické pole je odkloní, takže Zemi ve velké míře obletí.</p>\n<p>Pro zajímavost: magnetické pole Země vzniká otáčením tekutého železného jádra Země. Proto se magnetické póly Země pomalu posouvají. Částice, které se přece jen dostanou blízko k pólům, se srážejí se vzduchem — tak vzniká polární záře.</p>",
					zapis: {"jednotky":["V tomto tématu se nepracuje s žádnou fyzikální veličinou ani jednotkou — jde o vlastnosti magnetů a jejich pólů."],"zakon":"Magnet má vždy 2 magnetické póly – severní a jižní. Souhlasné póly magnetů se odpuzují, nesouhlasné přitahují.","body":["feromagnetické látky: přitahují se a jdou zmagnetovat (železo, ocel, kobalt, nikl)","nemagnetické látky: na magnet skoro nereagují (dřevo, papír, hliník, měď)","magnet má 2 póly: severní N, jižní S","na pólech síla nejsilnější, uprostřed netečné pásmo","souhlasné póly se odpuzují, nesouhlasné se přitahují","se vzdáleností magnetická síla slábne","magnetické pole zjistíme magnetkou (kompasem)","indukční čáry: uzavřené křivky od N k S","magnetizace: silné pole zmagnetuje feromagnetickou látku a vznikne trvalý magnet","využití: připevnění (nástěnka, autoanténa, svítilna, dvířka), kompas, reproduktor, stavebnice, pevný disk, páska kazety, elektromotor, sběrač štěpin","Země = velký tyčový magnet","na severním zeměpisném pólu Země je jižní magnetický pól","pole Země nás chrání před slunečním větrem"]},
					materialy: [{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"infografika","nazev":"Infografika: Magnety a magnetické pole","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/infografika-magnety-prehled.png"}],
					odkazy: [{"nazev":"Magnetismus — kvíz (Wordwall)","url":"https://wordwall.net/cs/resource/27704217/magnetismus-2"},{"nazev":"Simulace: Magnet a kompas (PhET, česky)","url":"https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_all.html?locale=cs"},{"nazev":"Fyzikální liga: Magnetické pole","url":"/hry/liga-karty/?rocnik=9&celek=magneticke-pole"}],
				},
				{
					materialy: [{"druh":"infografika","nazev":"Infografika: Magnetické pole vodiče a cívky","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/infografika-vodic-civka-prehled.png"},{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"audio","nazev":"Polemika: Proč se u vodiče otočí magnetka 🎧","cesta":"/media/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/vodic-civka-dialog1-omnivoice.mp3","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice)."}],
					slug: 'magneticke-pole-vodice-a-civky',
					nazev: 'Magnetické pole vodiče a cívky s proudem',
					interakce: 'oersted',
					obsah: "<h2>Magnetické pole vodiče a cívky s proudem</h2>\n<p>V roce 1820 dělal dánský fyzik <strong>Hans Christian Oersted</strong> zajímavý pokus. Položil kompas vedle drátu a pak drátem pustil elektrický proud. Střelka kompasu se hned pohnula, jako by byla blízko magnetu. Jeho pokusy dál rozvíjel francouzský fyzik <strong>André Marie Ampère</strong>.</p>\n<p>Oersted tak objevil, že <strong>kolem vodiče s proudem vzniká magnetické pole</strong>. Jeho příčinou je pohyb elektronů uvnitř drátu — tedy sám elektrický proud.</p>\n<h3>Tvar pole kolem přímého vodiče a pravidlo pravé ruky</h3>\n<p>Magnetické pole kolem drátu jde i vidět. Když pod drát nasypeme železné piliny a zapneme proud, piliny se samy srovnají do <strong>soustředných kružnic</strong> kolem drátu. Přesně takový tvar má neviditelné magnetické pole kolem celého přímého vodiče.</p>\n<p>Směr, kterým pole kolem drátu míří, poznáme <strong>pravidlem pravé ruky</strong>. Uchop si vodič pravou rukou tak, aby <strong>palec mířil po směru proudu</strong>, tedy od plusu k mínusu. Zahnuté prsty pak ukazují, kudy kolem drátu běží magnetické čáry.</p>\n<p>Proč se používá zrovna pravá ruka? Protože se fyzikové dávno dohodli, že proud teče od plusu k mínusu. Kdybys použil levou ruku, vyšlo by ti všechno obráceně.</p>\n<h3>Pole tlačí na vodič — elektromotory</h3>\n<p>Magnetické pole nejen vzniká, ale i <strong>působí silou</strong> na vodič, kterým prochází proud. Čím větší je proud a čím silnější pole, tím větší je i síla. Dva vodiče vedle sebe se touto silou <strong>přitahují</strong>, když proud teče stejným směrem, a <strong>odpuzují</strong>, když teče směrem opačným. Tohoto jevu využívají <strong>elektromotory</strong>.</p>\n<h3>Cívka a její magnetické pole</h3>\n<p>Silnější magnetické pole získáme, když vodič <strong>navineme do mnoha závitů</strong> — takovému vodiči se říká <strong>cívka</strong>. Je to dlouhý izolovaný měděný drát navinutý na válci. Magnetické pole je kolem celé cívky, ale <strong>nejsilnější je uvnitř ní</strong>. Cívka s proudem se pak chová úplně stejně jako obyčejný tyčový magnet.</p>\n<h3>Na čem závisí síla pole cívky</h3>\n<p>Čím víc závitů cívka má, tím je její magnetické pole silnější. Ještě víc pole zesílíme, když dovnitř cívky vložíme <strong>železné jádro</strong>. Který konec cívky bude severní pól a který jižní, závisí na <strong>směru proudu</strong> v závitech.</p>\n<p>I tady platí pravidlo pravé ruky, jen se dělá trochu jinak než u rovného drátu. <strong>Obejmi cívku pravou rukou</strong> tak, aby prsty mířily po směru proudu v závitech. Odtažený palec pak ukazuje k <strong>severnímu pólu</strong> cívky. Když otočíš směr proudu, třeba prohodíš dráty na zdroji, severní pól cívky se přehodí na druhý konec.</p>\n<h3>K čemu je cívka dobrá</h3>\n<p>Cívka je vlastně magnet, který se dá <strong>vypnout</strong> — stačí vypnout proud, který jí prochází. Tuhle vlastnost využívá <strong>elektromagnet</strong>, o kterém se dozvíš víc v samostatném tématu Elektromagnet. My si tu ukážeme jen to, co cívka dělá v běžných spotřebičích. V <strong>reproduktoru a sluchátkách</strong> rozkmitá membránu, a tak vznikne zvuk.</p>",
					zapis: {"jednotky":["elektrický proud — značíme I, jednotka A (ampér)","počet závitů cívky — jen počet, bez značky a bez jednotky (značka N patří severnímu pólu)"],"zakon":"Pravidlo pravé ruky pro vodič: palec ukazuje směr proudu (od + k −), zahnuté prsty ukazují směr magnetických indukčních čar kolem vodiče. Ampérovo pravidlo pravé ruky pro cívku: prsty ukazují dohodnutý směr proudu, který prochází závity cívky (od + k −); palec ukazuje severní magnetický pól cívky a zároveň směr magnetických indukčních čar, které vycházejí z cívky.","body":["Oersted 1820: proud budí magnetické pole","kolem vodiče: pole = soustředné kružnice","pravidlo pravé ruky (vodič): palec proud, prsty pole","proud je dohodnutý od + k −, proto pravá ruka","pole tlačí na vodič silou","stejný směr proudu: vodiče se přitahují","opačný směr proudu: vodiče se odpuzují","cívka = vodič navinutý do závitů","cívka s proudem = jako tyčový magnet","víc závitů + železné jádro = silnější pole","obrácení proudu = obrácení pólů cívky"]},
					odkazy: [{"nazev":"Test: Cívka a magnetické pole (Wordwall)","url":"https://wordwall.net/cs/resource/113962641/test-c%C3%ADvka-a-magnetick%C3%A9-pole"},{"nazev":"Fyzikální liga: Magnetické pole","url":"/hry/liga-karty/?rocnik=9&celek=magneticke-pole"}],
				},
				{
					materialy: [{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"infografika","nazev":"Infografika: Elektromagnet a jeho využití","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/elektromagnet/infografika-elektromagnet-prehled.png"}],
					slug: 'elektromagnet',
					interakce: 'elektromagnet',
					nazev: 'Elektromagnet a jeho využití',
					obsah: "<h2>Elektromagnet a jeho využití</h2>\n\n<p>Elektromagnet je cívka s jádrem z <strong>magneticky měkké oceli</strong>. Cívka je vodič stočený do mnoha závitů.</p>\n<p>Když cívkou prochází elektrický proud, jádro se rychle zmagnetuje. Po vypnutí proudu magnetické pole zase rychle zmizí. Pole elektromagnetu vypadá stejně jako pole obyčejného tyčového magnetu.</p>\n\n<h3>Jak elektromagnet zesílit</h3>\n<p>Sílu elektromagnetu ovlivňují dvě věci. Čím <strong>více závitů</strong> má cívka, tím silnější je magnetické pole. Čím <strong>větší proud</strong> cívkou teče, tím je pole také silnější.</p>\n\n<h3>Co umí navíc oproti obyčejnému magnetu</h3>\n<ul>\n<li>Jde ho <strong>zapnout a vypnout</strong> spolu s proudem.</li>\n<li>Jde mu <strong>prohodit póly</strong> — stačí obrátit směr proudu.</li>\n<li>Bývá <strong>mnohem silnější</strong> než obyčejný magnet.</li>\n</ul>\n\n<h3>Kde se elektromagnet využívá</h3>\n<ul>\n<li><strong>Jeřáb</strong> na nakládání železného šrotu — magnet se zapne, přitáhne kov, a po přenesení se zase vypne.</li>\n<li><strong>Zvonek</strong> — cívka přitáhne kovovou kotvu, ta udeří do zvonku.</li>\n<li><strong>Jistič</strong> — při přetížení silné pole přitáhne kotvu a vypne obvod; na rozdíl od pojistky ho lze znovu zapnout.</li>\n<li><strong>Relé</strong> — spínač ovládaný slabým proudem, třeba u závor na železničním přejezdu.</li>\n<li><strong>Elektromotor</strong>.</li>\n<li><strong>Oční lékařství</strong> — vytahování kovových pilin z oka.</li>\n</ul>",
					zapis: {"body":["elektromagnet = cívka + jádro (magneticky měkká ocel)","zapnutí proudu → jádro se rychle zmagnetuje","vypnutí proudu → pole rychle zmizí","víc závitů → silnější pole","větší proud → silnější pole","jde zapnout, vypnout i přepólovat","využití: jeřáb, zvonek, jistič, relé, elektromotor"]},
					odkazy: [{"nazev":"Elektromagnet, elektromotor — kvíz (Wordwall)","url":"https://wordwall.net/resource/100782493/fyzika/elektromagnet-elektromotor"},{"nazev":"Fyzikální liga: Magnetické pole","url":"/hry/liga-karty/?rocnik=9&celek=magneticke-pole"}],
				},
			],
		},
		{
			slug: 'indukce-a-stridavy-proud',
			nazev: 'Elektromagnetická indukce a střídavý proud',
			podtemata: [
				{
					slug: 'pusobeni-pole-na-vodic-elektromotor',
					nazev: 'Působení magnetického pole na vodič s proudem, elektromotor',
					interakce: 'elektromotor',
					obsah: "<h2>Působení magnetického pole na vodič s proudem, elektromotor</h2>\n\n<h3>Síla na vodič v magnetickém poli</h3>\n<p>Vodič nebo cívka s proudem se chová jako magnet. Proto na ně magnetické pole působí <strong>silou</strong>. Síla je největší, když vodič leží kolmo na siločáry pole.</p>\n<p>Když je vodič rovnoběžný se siločarami, síla na něj nepůsobí vůbec. Čím větší proud vodičem teče, tím větší je i síla.</p>\n\n<h3>Směr síly — pravidlo levé ruky</h3>\n<p>Směr síly zjistíme <strong>Flemingovým pravidlem levé ruky</strong>. Necháme siločáry vstupovat do levé dlaně a prsty natočíme ve směru proudu ve vodiči. Palec nám pak ukáže směr síly, kterou pole na vodič působí.</p>\n\n<h3>Cívka se roztáčí</h3>\n<p>Cívku upevníme tak, aby se mohla volně otáčet mezi póly magnetu. Na jednu stranu závitu působí síla jedním směrem, na druhou stranu opačným — proud tam totiž teče opačně. Tahle dvojice sil cívku roztočí.</p>\n<p>Čím víc závitů má cívka, tím je otáčivá síla větší. Tento jev využívá třeba <strong>reproduktor</strong> nebo <strong>ampérmetr</strong> — a hlavně z něj vznikl elektromotor.</p>\n\n<h3>Elektromotor</h3>\n<p><strong>Elektromotor</strong> je stroj, který mění elektrickou energii na pohybovou. Skládá se ze dvou hlavních částí.</p>\n<p><strong>Stator</strong> je pevná vnější část s magnety nebo elektromagnety. <strong>Rotor</strong>, kterému se říká také kotva, je vnitřní část, která se otáčí a má jednu nebo víc cívek.</p>\n<p>Aby se rotor točil pořád dokola, potřebuje stejnosměrný motor ještě <strong>komutátor</strong>. Je to kovový prstenec rozdělený na dvě části. Otáčí se spolu s rotorem a dotýkají se ho kartáčky spojené se zdrojem proudu. Po každé půlotočce komutátor obrátí směr proudu v cívce, a proto se rotor netočí jen kousek, ale stále dál.</p>\n\n<h3>Motory a jejich využití</h3>\n<p>Elektromotory napájíme buď stejnosměrným proudem, třeba z baterie, nebo střídavým proudem ze zásuvky. Motory na střídavý proud dělíme na jednofázové — pohánějí třeba pračku nebo ventilátor — a třífázové, které roztáčejí velké stroje v továrnách.</p>\n<p>Elektromotor najdeme skoro všude: ve vysavači, výtahu, elektromobilu, elektrickém nářadí, tramvaji i v hračkách.</p>",
					zapis: {"body":["vodič/cívka s proudem = magnet → pole na něj působí silou","síla největší kolmo na siločáry, nulová rovnoběžně s nimi","větší proud → větší síla","směr síly: Flemingovo pravidlo levé ruky","otáčivá cívka: dvojice sil ji roztáčí, víc závitů = větší síla","využití otáčení: reproduktor, ampérmetr, elektromotor","elektromotor: elektrická energie → pohybová energie","stator = pevná část s magnety, rotor (kotva) = otáčivá část s cívkou","komutátor: po každé půlotočce obrátí proud v cívce rotoru","motory: stejnosměrné (baterie) i střídavé (síť) — jednofázové, třífázové","využití: vysavač, výtah, elektromobil, nářadí, tramvaj, hračky"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak se točí elektromotory', cesta: 'Hi-Tc84eglY' },
						{ druh: 'infografika', nazev: 'Infografika: Jak se točí elektromotor', cesta: '/materialy/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/infografika-elektromotor.png' },
					],
				},
				{
					slug: 'elektromagneticka-indukce',
					interakce: 'indukce',
					nazev: 'Elektromagnetická indukce',
					obsah: "<h2>Elektromagnetická indukce</h2>\n\n<p>Vodič, kterým prochází proud, vytváří kolem sebe magnetické pole. To už víme z dřívějšího učiva. Anglický fyzik <strong>Michael Faraday</strong> zkoumal, jestli to jde i naopak.</p>\n<p>Zajímalo ho, jestli dokáže pomocí magnetického pole vyrobit ve vodiči elektrický proud. Svůj nápad si ověřil jednoduchým pokusem.</p>\n\n<h3>Faradayův pokus</h3>\n<p>Faraday připojil cívku (svinutý drát) k voltmetru — přístroji, který měří napětí. Pak k cívce <strong>pohyboval magnetem</strong>. Ručička voltmetru se vychýlila: na cívce vzniklo napětí.</p>\n<p>Tomuto jevu říkáme <strong>elektromagnetická indukce</strong>. Vzniká vždy, když se v okolí vodiče nebo cívky <strong>mění magnetické pole</strong>. Vznikne tak <strong>indukované napětí</strong>, a je-li obvod uzavřený, poteče i <strong>indukovaný proud</strong>.</p>\n\n<h3>Na čem závisí velikost napětí</h3>\n<ul>\n<li>Čím <strong>rychleji</strong> se magnet pohybuje, tím větší je indukované napětí.</li>\n<li>Čím <strong>silnější</strong> magnet použijeme, tím větší je indukované napětí.</li>\n<li>Čím víc <strong>závitů</strong> má cívka, tím větší je indukované napětí.</li>\n<li>Když magnet pohybujeme <strong>opačným směrem</strong>, otočí se i polarita napětí.</li>\n<li>Pole se dá měnit i jinak — zapnutím, vypnutím nebo změnou proudu v <strong>elektromagnetu</strong>. Největší změna nastává právě při zapnutí a vypnutí.</li>\n</ul>\n\n<h3>Kdy se nic neindukuje</h3>\n<p>Pokud magnet u cívky <strong>klidně leží</strong> a nehýbe se, magnetické pole se nemění. Napětí ani proud se pak neindukuje.</p>\n<p>Platí tu <strong>zákon zachování energie</strong>: pohybová energie magnetu se mění na energii elektrickou. Když se magnet nepohybuje, žádnou energii nepředává.</p>\n\n<h3>Kde se indukce využívá</h3>\n<p>Na elektromagnetické indukci pracují <strong>dynamo</strong> a <strong>alternátor</strong>, které vyrábějí elektřinu v elektrárnách. Malé dynamo najdeš i na <strong>jízdním kole</strong> — roztáčí ho kolo a svítí přední i zadní světlo.</p>\n<p>Indukce funguje také v zapalovacích svíčkách motoru, v „protřepávacích\" svítilnách, v indukčních brzdách, v indukční varné desce i v peci na tavení kovů. Bez drátů díky ní fungují bezdrátové nabíječky, používá ji i transformátor a elektrická kytara.</p>",
					zapis: {"jednotky":["indukované napětí — značíme Uᵢ, jednotka V (volt)","indukovaný proud — značíme Iᵢ, jednotka A (ampér)"],"zakon":"Při elektromagnetické indukci platí zákon zachování energie: kinetická energie pohybujícího se magnetu se přemění na energii elektrickou.","body":["indukce = jev při změně magnetického pole u vodiče/cívky","změna pole → indukované napětí (v uzavřeném obvodu i proud)","žádná změna pole → nic se neindukuje","rychlejší pohyb, silnější magnet, víc závitů = větší napětí","opačný směr pohybu magnetu = opačná polarita napětí"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Elektromagnetická indukce 1', cesta: 'HTQTf58aXBQ' },
						{ druh: 'youtube', nazev: 'Video: Elektromagnetická indukce 2', cesta: 'gn-CN3StDUs' },
						{ druh: 'video', nazev: 'Píseň: Magnet v pohybu 🎵', cesta: '/materialy/fyzika/9-rocnik/magneticke-pole/elektromagneticka-indukce/pisen-magnet-v-pohybu.m4a' },
					],
				},
				{
					slug: 'vznik-stridaveho-proudu-alternator',
					nazev: 'Vznik střídavého proudu, alternátor',
					interakce: 'alternator',
					obsah: "<h2>Vznik střídavého proudu a alternátor</h2>\n\n<p>V cívce se indukuje proud, když se u ní pohybuje magnet. Směr pohybu magnetu určuje směr indukovaného proudu. Když se magnet u cívky otáčí, proud se pravidelně obrací.</p>\n<p>Proudu, který takhle mění svůj směr, říkáme <strong>střídavý proud</strong>. Právě ten teče z běžné zásuvky.</p>\n\n<h3>Graf střídavého proudu</h3>\n<p>Velikost střídavého proudu <strong>kolísá mezi nulou a maximem</strong>. Když proud teče opačným směrem, zapisujeme ho jako <strong>zápornou hodnotu</strong>. Proto graf střídavého proudu stoupá nahoru i klesá pod nulu.</p>\n\n<h3>Alternátor — stroj, který vyrábí střídavý proud</h3>\n<p><strong>Alternátor</strong> je elektrický generátor. Je to točivý stroj, který vyrábí střídavý proud pomocí elektromagnetické indukce. Mění pohybovou (otáčivou) energii na energii elektrickou.</p>\n<p>Napětí se indukuje nejvíc ve chvíli, kdy se magnetické pole u cívky mění nejrychleji. Otáčející se cívku spojují s obvodem <strong>kroužky</strong>.</p>\n\n<h3>Rotor a stator</h3>\n<ul>\n<li><strong>Rotor</strong> je otáčející se část alternátoru. Vytváří proměnlivé magnetické pole — je to magnet nebo elektromagnet.</li>\n<li><strong>Stator</strong> je pevná (nehybná) část s cívkami. Právě v jeho cívkách se indukuje napětí.</li>\n<li>Má-li stator jednu cívku, vzniká jednofázové napětí. Má-li tři cívky, vzniká <strong>třífázové napětí</strong> — to se vyrábí v elektrárnách.</li>\n</ul>\n\n<h3>Alternátor a dynamo</h3>\n<p>Kroužky zajišťují pohyblivý kontakt obvodu s otáčející se cívkou — směr proudu mění samo otáčení cívky v magnetickém poli. Kdybychom místo kroužků použili <strong>komutátor</strong> (rozdělený kroužek), proud by měnil jen svou velikost, ne směr. Takový generátor se jmenuje <strong>dynamo</strong> a vyrábí stejnosměrný proud.</p>\n\n<h3>Kde se alternátor a dynamo používají</h3>\n<p>Alternátor pracuje v <strong>automobilu</strong> — za jízdy nabíjí akumulátor, ze kterého jede veškerá elektřina v autě. Najdeme ho i v <strong>elektrocentrále</strong>, kde spalovací motor roztáčí rotor a vyrábí náhradní elektřinu tam, kde není zásuvka, nebo když vypadne proud.</p>\n<p>Alternátor vyrábí proud i ve <strong>všech elektrárnách kromě solárních</strong> — turbína poháněná vodou, větrem nebo párou v nich roztáčí rotor alternátoru.</p>\n<p>Menší generátor, dynamo, znáš třeba z <strong>jízdního kola</strong> nebo ze starší svítilny. Otáčením se v něm vyrábí proud pro světlo.</p>",
					zapis: {"body":["magnet u cívky → indukovaný proud, otáčení mění směr","střídavý proud: mění velikost i směr, ze zásuvky","alternátor: otáčivá energie → elektrická (indukcí)","rotor = otáčí se (magnet), stator = stojí (cívky)","3 cívky statoru → třífázové napětí (elektrárny)","komutátor místo kroužků → dynamo (stejnosměrný proud)","alternátor: auto, elektrocentrála, elektrárny; dynamo: kolo"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Příběh střídavého proudu (generátor)', cesta: '3Y_USuTTVbw' },
					],
				},
				{
					slug: 'vlastnosti-stridaveho-proudu',
					nazev: 'Vlastnosti střídavého proudu',
					interakce: 'stridavy-proud',
					obsah: "<h2>Vlastnosti střídavého proudu</h2>\n\n<p>Z baterky teče proud pořád jedním směrem. Říkáme mu <strong>stejnosměrný</strong>. Ze zásuvky ale teče jiný proud — pravidelně mění velikost i směr. Říkáme mu <strong>střídavý</strong>. Vzniká otáčením cívky v magnetickém poli, jako u alternátoru.</p>\n\n<h3>Perioda a frekvence</h3>\n<p>Když zakreslíme, jak se proud v čase mění, dostaneme pravidelnou vlnovku. Fyzikové jí říkají <strong>sinusoida</strong>. Elektrony ve vodiči přitom opakovaně mění směr podle toho, jak se cívka zrovna otáčí.</p>\n<p>Vlnovka se pořád stejně opakuje. Nejkratší doba, za kterou se jedna vlna zopakuje, se jmenuje <strong>perioda</strong>. Značíme ji <strong>T</strong> a měříme v sekundách. Je to zároveň doba jedné otočky cívky v alternátoru.</p>\n<p>Kolik takových otoček proběhne za jednu sekundu, tomu říkáme <strong>frekvence</strong>. Značíme ji <strong>f</strong> a měříme v hertzích (Hz). Platí vztah <strong>f = 1 : T</strong> — čím kratší perioda, tím vyšší frekvence.</p>\n\n<h3>50 hertzů v síti</h3>\n<p>V naší rozvodné síti má proud frekvenci přesně <strong>50 Hz</strong>. Cívka v alternátoru se otočí padesátkrát za sekundu. Proud se proto stokrát za sekundu na okamžik vynuluje — a přesto žárovka nebliká. Vlákno je tak rozžhavené, že za tak krátkou chvíli nestihne vychladnout, a naše oko by tak rychlou změnu stejně nepostřehlo.</p>\n\n<h3>Maximální a efektivní hodnota</h3>\n<p>Proud i napětí se pořád mění, a tak fyzikové zavedli dvě důležité hodnoty. <strong>Maximální hodnota</strong> (I<sub>m</sub>, U<sub>m</sub>) je největší velikost proudu nebo napětí. Nastane dvakrát za periodu, jednou v každém směru.</p>\n<p><strong>Efektivní hodnota</strong> (I, U) je taková velikost stejnosměrného proudu, který má stejné účinky. Je zhruba <strong>70 %</strong> maximální hodnoty. V naší síti má napětí efektivní hodnotu <strong>230 V</strong>.</p>\n<p>Právě efektivní hodnotu ukazují měřicí přístroje jako voltmetr — okamžitou hodnotu totiž nedokážou sledovat. Výkon spotřebiče počítáme z efektivních hodnot napětí a proudu: <strong>P = U · I</strong>.</p>\n\n<h3>Proč vůbec střídavý proud?</h3>\n<p>Stejnosměrný proud by byl jednodušší. Střídavé napětí ale umí <strong>transformátor</strong> snadno zvýšit i snížit, stejnosměrné ne.</p>\n<p>Vedení ztrácí energii zahříváním drátů a ztráty rostou s proudem. Elektrárna proto napětí zvýší až na stovky kilovoltů. Proud tím klesne a vedení skoro netopí. Před domem se napětí zase sníží na 230 V. Bez střídavého proudu by dálkový přenos elektřiny nebyl možný a elektrárna by musela stát v každém městě.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Ze vzorce f = 1 : T spočítáme, jak dlouho trvá jedna otočka cívky při frekvenci 50 Hz:</p>\n<p>T = 1 : f = 1 : 50 = <strong>0,02 s</strong>, tedy 20 milisekund.</p>\n<p>Maximální napětí spočítáme z efektivní hodnoty vynásobením číslem <strong>1,4</strong>: 230 · 1,4 = <strong>322 V</strong>. Přesnější číslo je odmocnina ze dvou (asi 1,41) a s ní vyjde skutečná špička napětí v zásuvce asi <strong>325 V</strong>. Proto se u součástek hlídá, jaké napětí vydrží — a zásuvka je nebezpečnější, než se podle čísla 230 V zdá.</p>\n\n<h3>Příklady z hodiny</h3>\n<ol>\n<li>Cívka alternátoru se otáčí s frekvencí <strong>25 Hz</strong>. Jak dlouho trvá jedna otočka (perioda)? <details><summary>řešení</summary>T = 1 : f = 1 : 25 = <strong>0,04 s</strong> (40 milisekund)</details></li>\n<li>Perioda střídavého proudu je <strong>0,01 s</strong>. Jaká je jeho frekvence? <details><summary>řešení</summary>f = 1 : T = 1 : 0,01 = <strong>100 Hz</strong></details></li>\n<li>Na cívce naměříme <strong>maximální napětí 140 V</strong>. Jaké napětí ukáže voltmetr (efektivní hodnota)? <details><summary>řešení</summary>Voltmetr ukazuje efektivní hodnotu: U = U<sub>m</sub> : 1,4 = 140 : 1,4 = <strong>100 V</strong></details></li>\n<li>Elektrickým vařičem v zásuvce (230 V) prochází proud <strong>2 A</strong>. Jaký je jeho výkon? <details><summary>řešení</summary>P = U · I = 230 · 2 = <strong>460 W</strong></details></li>\n</ol>",
					zapis: {"vzorec":"f = 1 : T      (odvozeně: T = 1 : f)      P = U · I      (odvozeně: U = P : I,  I = P : U)","jednotky":["perioda — značíme T, jednotka s (sekunda)","frekvence — značíme f, jednotka Hz (hertz)","napětí — značíme U, jednotka V (volt)","proud — značíme I, jednotka A (ampér)","výkon — značíme P, jednotka W (watt)","Do vzorců dosazuj periodu v sekundách, frekvenci v hertzích, napětí ve voltech a proud v ampérech.","Převody: 1 kHz = 1 000 Hz, 1 ms = 0,001 s, 1 kW = 1 000 W."],"vzorecSlovy":"frekvence se rovná jedné děleno periodou; výkon se rovná napětí krát proud","body":["střídavý proud: graf je sinusoida, mění velikost i směr","T = perioda — doba jedné otočky cívky (s)","f = frekvence — počet otoček za sekundu (Hz), f = 1 : T","Im, Um = maximální hodnota; efektivní hodnota = co ukazují přístroje (~70 % maxima)","síť: napětí 230 V (efektivní), frekvence 50 Hz","výkon: P = U · I"]},
				},
				{
					slug: 'transformator',
					nazev: 'Transformátor',
					interakce: 'transformator',
					obsah: "<h2>Transformátor</h2>\n\n<p>Transformátor je zařízení, které mění velikost střídavého napětí. Používá se hlavně při přenosu elektrické energie na velké vzdálenosti a v mnoha zařízeních kolem nás.</p>\n\n<h3>Jak je postavený</h3>\n<p>Transformátor má dva obvody, každý se svou cívkou. Cívka, do které přivádíme napětí, se nazývá <strong>primární</strong> (vstupní). Cívka, ze které napětí odebíráme, se nazývá <strong>sekundární</strong> (výstupní). Obě cívky jsou navinuté na společném ocelovém jádře.</p>\n\n<h3>Jak transformátor funguje</h3>\n<p>Primární cívka je připojená ke zdroji střídavého napětí. Protéká jí proud, který kolem sebe vytváří proměnlivé magnetické pole. Ocelové jádro toto pole přenese k sekundární cívce, kde se <strong>indukcí</strong> naindukuje nové střídavé napětí. Skoro nic se přitom neztratí — až 98 ze 100 dílů energie projde dál.</p>\n\n<h3>Transformační poměr</h3>\n<p>Napětí a počet závitů primární cívky značíme U₁ a N₁, napětí a počet závitů sekundární cívky značíme U₂ a N₂. Napětí se na cívkách mění ve stejném poměru, v jakém se liší počet jejich závitů: <strong>U₂ : U₁ = N₂ : N₁</strong>. Kolikrát víc závitů má cívka, tolikrát vyšší napětí na ní vznikne.</p>\n\n<h3>Transformace nahoru a dolů</h3>\n<ul>\n<li><strong>Nahoru</strong> — sekundární cívka má víc závitů, napětí <strong>roste</strong>. Tak se zvyšuje napětí za elektrárnou pro dálkový přenos (400 kV) nebo v zapalovací svíčce auta (45 000 V).</li>\n<li><strong>Dolů</strong> — sekundární cívka má míň závitů, napětí <strong>klesá</strong>. Tak fungují nabíječky telefonů nebo rozvod napětí do domácnosti (230 V).</li>\n</ul>\n<p>Proud se přitom mění opačně než napětí — elektrický výkon P = U · I totiž zůstává skoro stejný. Kolikrát napětí klesne, tolikrát proud vzroste, a naopak.</p>\n\n<p>Transformátor funguje <strong>jen se střídavým napětím</strong>. Indukce potřebuje magnetické pole, které se pořád mění, a to vzniká jen tehdy, když se mění i proud v primární cívce. Se stejnosměrným proudem, jaký dává třeba baterka, transformátor nepracuje.</p>\n\n<p>Právě díky transformátorům funguje rozvodná síť: napětí z elektrárny se nejdřív zvýší pro dálkový přenos, po cestě k domácnostem se postupně sníží. Malé transformátory najdeme i v nabíječkách a v mnoha domácích spotřebičích.</p>\n\n<h3>Velký proud z transformátoru</h3>\n<p>Transformátor umí vyrobit i velký proud při nízkém napětí. Používá se to tam, kde je potřeba roztavit nebo spojit kov teplem.</p>\n<ul>\n<li><strong>Indukční pec</strong> — velký proud v cívce roztaví kov.</li>\n<li><strong>Svařování elektrickým obloukem</strong> — teplota oblouku dosahuje až 6 000 °C.</li>\n<li><strong>Pistolová páječka</strong> — malá cívka s jedním závitem pájí elektrické obvody.</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Transformační poměr k porovnává počty závitů: <strong>k = N₂ : N₁</strong>, a platí i <strong>U₂ = k · U₁</strong>.</p>\n<p><strong>Příklad 1 — transformace dolů:</strong> Primární cívka má 500 závitů a napětí 200 V. Sekundární cívka má 100 závitů. Jaké napětí bude na sekundární cívce?</p>\n<p>k = N₂ : N₁ = 100 : 500 = 0,2<br>U₂ = k · U₁ = 0,2 · 200 = <strong>40 V</strong></p>\n<p>Výstupní napětí je nižší než vstupní — jde o transformaci dolů.</p>\n<p><strong>Příklad 2 — transformace nahoru:</strong> Primární cívka má 100 závitů a napětí 200 V. Sekundární cívka má 500 závitů. Jaké napětí bude na sekundární cívce?</p>\n<p>k = N₂ : N₁ = 500 : 100 = 5<br>U₂ = k · U₁ = 5 · 200 = <strong>1 000 V</strong></p>\n<p>Výstupní napětí je vyšší než vstupní — jde o transformaci nahoru.</p>",
					zapis: {"vzorec":"U₂ : U₁ = N₂ : N₁      (odvozeně: U₂ = U₁ · N₂ : N₁,  U₁ = U₂ · N₁ : N₂)","jednotky":["primární napětí — značíme U₁, jednotka V (volt)","sekundární napětí — značíme U₂, jednotka V (volt)","počet závitů primární cívky — značíme N₁, bez jednotky (jen počet)","počet závitů sekundární cívky — značíme N₂, bez jednotky (jen počet)","Převod: 1 kV = 1 000 V. Do vztahu dosazuj obě napětí ve V a počty závitů jako celá čísla."],"vzorecSlovy":"poměr sekundárního a primárního napětí je stejný jako poměr počtu závitů sekundární a primární cívky","body":["mění velikost střídavého napětí, slouží k přenosu energie","primární a sekundární cívka na společném ocelovém jádře","v sekundární cívce se indukuje napětí","účinnost přenosu až 98 %","napětí ~ počet závitů (stejný poměr)","nahoru: víc závitů, napětí ↑, proud ↓","dolů: míň závitů, napětí ↓, proud ↑","funguje jen na střídavý proud"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Transformátor — skrytý motor našeho světa', cesta: 'Zme6eL0Mzr8' },
					],
				},
			],
		},
		{
			slug: 'elektricky-proud-v-latkach',
			nazev: 'Elektrický proud v látkách',
			podtemata: [
				{
					slug: 'prenos-elektricke-energie',
					nazev: 'Přenos elektrické energie, energetická rozvodná síť',
					interakce: 'prenos',
					obsah: "<h2>Přenos elektrické energie</h2>\n<p>Elektřina z <strong>zásuvky</strong> u tebe doma urazí dlouhou cestu. Vznikne v elektrárně, projede stovky kilometrů po vysokém napětí a pak se několikrát <strong>transformuje</strong> — to znamená, že se jí mění napětí — než doputuje do tvého bytu. Pojďme si tu cestu projít krok za krokem.</p>\n\n<h3>Elektřina vzniká v elektrárně</h3>\n<p>V elektrárně vyrábí elektřinu velký stroj — <strong>alternátor</strong>. Vyrábí <strong>střídavý proud</strong>, který mnohokrát za sekundu mění směr.</p>\n<p>Alternátor má <strong>tři cívky</strong>. Každá cívka vyrábí vlastní proud, tomu říkáme <strong>fáze</strong>. Proud z jedné cívky je vždy maličko posunutý v čase oproti druhé — o třetinu doby jednoho kmitu. Vzniká tak <strong>trojfázový proud</strong> a k jeho přenosu potřebujeme <strong>tři vodiče</strong>.</p>\n<p>Napětí mezi jedním fázovým vodičem a zemí je <strong>230 V</strong>. Napětí mezi dvěma fázovými vodiči je <strong>400 V</strong>.</p>\n\n<h3>Napětí jde nahoru a proud vyráží na cestu</h3>\n<p>Elektrárna vyrábí proud při napětí asi 10 kV. Hned vedle elektrárny stojí <strong>transformátor</strong>, který napětí zvýší až na <strong>220 kV nebo 400 kV</strong>. Tomu se říká <strong>velmi vysoké napětí</strong>.</p>\n<p>Proč se napětí zvyšuje? Při vysokém napětí stačí vodičem téct <strong>menší proud</strong>, aby přenesl stejné množství energie. Menší proud znamená menší <strong>ztráty</strong> — po cestě se promarní méně energie.</p>\n<p>Této části sítě, která vede proud dálkovým nadzemním vedením mezi vysokými stožáry, se říká <strong>přenosová soustava</strong>.</p>\n\n<h3>Vedení mezi stožáry</h3>\n<p>Vedení může být <strong>nadzemní</strong> nebo <strong>podzemní</strong> — ve městech vedou dráty často pod zemí. Dráty mezi stožáry jsou <strong>hliníková lana s ocelovým jádrem</strong>. Ocel uprostřed lana drží tah, vítr a námrazu, hliník kolem vede proud. Hliník vede o něco hůř než měď, ale je mnohem <strong>lehčí a levnější</strong> — proto lano unese delší rozpětí mezi stožáry.</p>\n<p>Tyto dráty nejsou izolované. Visí ale vysoko nad zemí a dostatečně daleko od sebe, takže se nemůžou dotknout — nehrozí zkrat ani úraz.</p>\n\n<h3>Napětí zase klesá k nám domů</h3>\n<p>Proud nemůže vjet do zásuvky s napětím 400 kV — musí se postupně snížit. V <strong>rozvodnách</strong> se napětí sníží nejdřív na 110 kV, pak na <strong>22 kV</strong>. Rozvodny navíc rozvádějí proud z jednoho přívodu do víc větví sítě a umí jednotlivou větev podle potřeby zapnout nebo vypnout. Této části sítě, která proud rozvádí k jednotlivým odběratelům, se říká <strong>distribuční soustava</strong>.</p>\n<p>Napětí mění <strong>transformátory</strong> — a protože se přenáší tři fáze najednou, transformuje se každá fáze <strong>zvlášť</strong>. Poslední transformátor, třeba na sloupu nebo v malé budce u silnice, sníží napětí až na <strong>230 V</strong>, které pak teče do zásuvek v domácnostech.</p>\n<p>Síť navíc chrání <strong>ochranná zařízení</strong>, třeba přepěťové ochrany. Chrání síť i odběratele před poškozením, třeba při bouřce.</p>\n<p>Kabely, které vedou do domů, jsou z <strong>mědi</strong> — měď má ze všech běžných kovů nejmenší odpor a dobře se spojuje. Na krátkém kusu vodiče ve zdi nezáleží na hmotnosti, tak jako u dálkového vedení. Fázové vodiče jsou tu izolované, barevně odlišené a vedou spolu v jednom kabelu.</p>\n\n<h3>Elektřina u tebe doma</h3>\n<p>Domácnost používá jen <strong>jednu fázi</strong> s napětím 230 V. Velké stroje — třeba míchačka, cirkulárka nebo obráběcí stroj — využívají všechny <strong>tři fáze</strong> najednou, podle zapojení na 3 × 230 V nebo 3 × 400 V.</p>\n<p>V zásuvce jsou tři vodiče. <strong>Fázový vodič</strong> přivádí proud z elektrárny, <strong>nulovací vodič</strong> ho odvádí zpátky do sítě a <strong>ochranný vodič PE</strong> je spojený se zemí. Ochranný vodič je připojený na kovovou kostru spotřebiče — když se na ni omylem dostane napětí, svede ho do země a jistič nebo proudový chránič proud vypne.</p>",
					zapis: {"jednotky":["elektrické napětí — značíme U, jednotka V (volt)","Převod: 1 kV (kilovolt) = 1 000 V."],"body":["alternátor (3 cívky) → trojfázový střídavý proud","napětí fáze–země 230 V, mezi fázemi 400 V","u elektrárny transformátor napětí ZVÝŠÍ (na 220 kV / 400 kV)","vysoké napětí → malý proud → malé ztráty (přenosová soustava)","vedení: nadzemní i podzemní; mezi stožáry hliník + ocelové jádro, neizolované, vysoko a daleko od sebe","transformátory mění napětí, každá fáze zvlášť; rozvodny rozvádějí proud do větví a umí je zapnout/vypnout","distribuční soustava: napětí klesá 110 kV → 22 kV → 230 V","ochranná zařízení (přepěťové ochrany) chrání síť a odběratele","domácí rozvody: měď (malý odpor), izolované barevné vodiče v kabelu","doma: 1 fáze 230 V; velké stroje: 3 fáze (3×230 V / 3×400 V)","zásuvka: fázový + nulovací + ochranný vodič PE → jistič/chránič vypne při poruše"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Cesta elektřiny', cesta: 'fimbeSGx8iY' },
						{ druh: 'video', nazev: 'Píseň: Proud si cestu najde 🎵', cesta: '/materialy/fyzika/9-rocnik/elektricky-proud-v-latkach/prenos-elektricke-energie/pisen-proud-si-cestu-najde.m4a' },
					],
				},
				{
					slug: 'vedeni-proudu-v-kapalinach',
					nazev: 'Vedení elektrického proudu v kapalinách, elektrolýza',
					interakce: 'elektrolyza',
					obsah: "<h2>Vedení elektrického proudu v kapalinách</h2>\n<p><strong>Destilovaná (čistá) voda</strong> elektrický proud nevede. Ponoříš do ní dvě elektrody, zapojíš žárovku — nerozsvítí se. Jakmile ale do vody přisypeš <strong>kuchyňskou sůl</strong>, žárovka se rozsvítí. Sůl v pevném stavu přitom sama o sobě proud nevede.</p>\n\n<h3>Proč roztok soli vede proud</h3>\n<p>Molekuly vody naruší pevnou krystalovou mřížku soli. Ze soli se uvolní nabité částice, kterým se říká <strong>ionty</strong>. Vzniknou kladné <strong>kationty</strong> sodíku Na⁺ a záporné <strong>anionty</strong> chloru Cl⁻.</p>\n<p>Kapalinám, které takhle vedou proud, se říká <strong>elektrolyty</strong>. Patří mezi ně roztoky solí, kyselin i zásad — vede i mořská voda nebo obyčejná pitná voda, protože obsahuje rozpuštěné minerály.</p>\n\n<h3>Kationty a anionty putují k elektrodám</h3>\n<p>Do elektrolytu ponoříme dvě kovové nebo uhlíkové tyčinky — <strong>elektrody</strong> — a zapojíme je ke zdroji napětí. Kladné kationty se pohybují k záporné elektrodě, záporné anionty ke kladné. Tenhle usměrněný pohyb iontů je <strong>elektrický proud</strong> v kapalině.</p>\n<p>Elektroda, ke které míří kladné kationty, se jmenuje <strong>katoda</strong>. Elektroda, ke které míří záporné anionty, se jmenuje <strong>anoda</strong>. <strong>Pozor:</strong> elektrody se nejmenují podle svého náboje, ale podle iontů, které přitahují.</p>\n\n<h3>Elektrolýza — proud mění látky</h3>\n<p><strong>Elektrolýza</strong> je děj, při kterém průchod proudu elektrolytem způsobí <strong>látkové změny</strong>. V kapalině se rozkládají látky nebo se z roztoku uvolňují nové.</p>\n\n<h3>K čemu se elektrolýza využívá</h3>\n<ul>\n<li>výroba čistých látek — elektrolýzou se z rudy získávají čisté kovy, třeba <strong>hliník</strong>; z roztoku soli se dá získat chlor, z vody rozkladem vodík a kyslík</li>\n<li><strong>pokovování</strong> — na předmět se nanese tenká vrstva jiného kovu: pozlacení šperků, pochromování, pozinkování. Chrání to před korozí, nebo to jen hezky vypadá</li>\n</ul>\n<p>Na podobném principu — pohybu iontů v kapalině — fungují i <strong>akumulátory</strong>, tedy dobíjecí baterie v autě nebo v mobilu. Jak přesně v nich vzniká napětí, se dozvíš v příští kapitole.</p>",
					zapis: {"body":["destilovaná voda nevede, roztoky solí/kyselin/zásad (elektrolyty) vedou","v roztoku soli: kladné kationty Na⁺ + záporné anionty Cl⁻","proud v kapalině = pohyb iontů: kationty → katoda, anionty → anoda","elektrolýza = průchod proudu elektrolytem → látkové změny","využití: výroba čistých kovů (např. hliník), pokovování","podobný princip: akumulátory (dobíjecí baterie)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Vedení proudu v kapalinách', cesta: 'D_aMAsD-EKM' },
					],
				},
				{
					slug: 'chemicke-zdroje-napeti',
					nazev: 'Chemické zdroje elektrického napětí',
					interakce: 'razeni-clanku',
					obsah: "<h2>Chemické zdroje elektrického napětí</h2>\n<p>Chemický zdroj napětí vznikne, když do <strong>elektrolytu</strong> (vodivého roztoku) ponoříme <strong>dvě elektrody</strong> z různých kovů, případně z uhlíku. Chemické reakce mezi elektrolytem a elektrodami přesunou náboj. Na jedné elektrodě se hromadí elektrony, na druhé jich ubývá.</p>\n<ul>\n<li><strong>Anoda</strong> — u článku, který se vybíjí, je to elektroda <strong>záporná</strong> (zinek, lithium).</li>\n<li><strong>Katoda</strong> — u vybíjejícího se článku elektroda <strong>kladná</strong> (uhlík/grafit, měď).</li>\n</ul>\n<p>⚠️ <strong>Nespojuj si anodu natrvalo se znaménkem mínus.</strong> Název elektrody se řídí tím, co se na ní děje, ne polaritou. Při elektrolýze i při nabíjení akumulátoru je anoda naopak <strong>kladná</strong>. Pravidlo „anoda = mínus\" platí jen pro článek, který zrovna dodává proud.</p>\n<h3>Co se děje uvnitř článku</h3>\n<p>Uvnitř článku neteče proud stejně jako v drátu. <strong>V kovu proud tvoří volné elektrony</strong>, ale <strong>v elektrolytu se pohybují ionty</strong> — nabité částice z rozpuštěné látky. Kladné i záporné ionty putují <strong>oběma směry současně</strong>, každé ke své elektrodě.</p>\n<p>Obvod tak tvoří dva různé děje. <strong>Vně</strong> článku běží drátem elektrony od záporné elektrody ke kladné. <strong>Uvnitř</strong> ho uzavírají ionty v elektrolytu. Bez toho druhého by se náboj na elektrodách hned nashromáždil a proud by se zastavil.</p>\n<h3>Napětí článku určuje dvojice kovů</h3>\n<p>Proč má tužková baterie zrovna 1,5 V? Každý kov posílá elektrony jinak ochotně a napětí článku je dané právě rozdílem mezi oběma kovy.</p>\n<ul>\n<li>Napětí <strong>nezáleží na velikosti</strong> článku — tužková i buřtová baterie dají 1,5 V, větší jen vydrží déle (<strong>kapacita</strong> v mAh).</li>\n<li>Vyššího napětí dosáhneme <strong>zapojením více článků za sebou</strong> — víc článků za sebou = vyšší napětí (viz níže).</li>\n<li>Ze <strong>dvou stejných kovů</strong> žádný článek nesestavíš — rozdíl mezi nimi by byl nulový.</li>\n</ul>\n<p>💡 Vyzkoušej doma: zapíchni do citronu <strong>zinkový</strong> plíšek (stačí pozinkovaný hřebík) a vedle něj <strong>měděný</strong> plíšek nebo minci. Nech mezi nimi pár milimetrů, ale tak, aby se nedotýkaly. Voltmetrem naměříš kolem <strong>1 V</strong> — citronová šťáva slouží jako elektrolyt. Se dvěma <strong>měděnými</strong> plíšky nenaměříš nic, i kdyby byl citron sebekyselejší.</p>\n<p>⚠️ Napětí měř vždy <strong>měřicím přístrojem, nikdy jazykem</strong>, a citron už potom <strong>nejez</strong>. Do šťávy se z plíšků uvolňují ionty zinku a mědi, které do těla nepatří. Použité plíšky vyhoď a ruce si umyj.</p>\n<h3>Suchý článek a baterie</h3>\n<p>Nejznámější jednorázové zdroje napětí jsou tyto:</p>\n<ul>\n<li><strong>Suchý článek</strong> — zinková nádoba (−), uhlíková tyčinka (+), uvnitř salmiaková pasta; napětí <strong>1,5 V</strong>, jednorázový (v hračkách).</li>\n<li><strong>Plochá baterie</strong> — tři suché články za sebou, napětí <strong>4,5 V</strong>.</li>\n<li><strong>Alkalické</strong> — vyšší kapacita a životnost, zvládnou i velký nárazový odběr (blesk fotoaparátu, MP3 přehrávač).</li>\n<li><strong>Lithiové</strong> (jednorázové) — kvalitní i po letech skladování; hodinky, klíč od auta, záložní baterie na základní desce počítače.</li>\n</ul>\n<h3>Akumulátory — zdroje, které se dají nabíjet</h3>\n<p><strong>Akumulátor</strong> je zdroj napětí, který po vybití znovu <strong>nabijeme</strong> a používáme ho opakovaně.</p>\n<ul>\n<li><strong>Olověný akumulátor</strong> — velká kapacita, dobíjecí, napětí <strong>12 V</strong> (autobaterie). Záporná elektroda je z olova, kladnou tvoří olověná mřížka s oxidem olovičitým.</li>\n<li><strong>Lithium-iontový</strong> (mobil, notebook, elektromobil) — lehký, velká kapacita, snese stovky nabití. Nemá rád úplné vybití ani vysokou teplotu.</li>\n<li><strong>Palivový článek</strong> — zvláštní případ: nevybíjí se, protože se do něj palivo (vodík) <strong>průběžně dodává</strong>. Odpadem je čistá voda.</li>\n</ul>\n<h3>Řazení článků za sebou: napětí se sčítá</h3>\n<p>Když zapojíme víc článků <strong>za sebou</strong> (sériově), jejich napětí se sečtou. Plochá baterie má proto 4,5 V — jsou v ní tři tužkové články po 1,5 V.</p>\n<p>Platí to i obráceně: když známe celkové napětí a napětí jednoho článku, spočítáme, kolik článků je za sebou zapojených.</p>\n<h3>Bezpečnost: opotřebovaná baterie může vytéct</h3>\n<p>⚠️ Opotřebovaný zinkový (suchý) článek může začít <strong>vytékat</strong>. Uniklá kyselina může zařízení nevratně poškodit, proto vybité baterie včas vyměňuj.</p>\n<h3>Pro zvídavé: počítáme</h3>\n<ol>\n<li>Kolik tužkových článků (1,5 V) musíš zapojit za sebou, aby vznikla devítivoltová baterie (9 V)? <details><summary>řešení</summary>n = U : U₁ = 9 : 1,5 = <strong>6 článků</strong></details></li>\n<li>V baterii svítilny jsou za sebou čtyři tužkové články po <strong>1,5 V</strong>. Jaké je celkové napětí zdroje? <details><summary>řešení</summary>U = 4 · 1,5 = <strong>6 V</strong></details></li>\n<li>Kolik tužkových článků (1,5 V) bys musel zapojit za sebou, abys jejich součtem dosáhl napětí olověného akumulátoru (12 V)? <details><summary>řešení</summary>n = 12 : 1,5 = <strong>8 článků</strong></details></li>\n<li>Kolik plochých baterií (4,5 V) musíš spojit za sebou, aby dohromady daly napětí 18 V? <details><summary>řešení</summary>n = 18 : 4,5 = <strong>4 ploché baterie</strong></details></li>\n</ol>",
					zapis: {"vzorec":"U = n · U₁      (odvozeně: n = U : U₁,  U₁ = U : n)","jednotky":["celkové napětí — značíme U, jednotka V (volt)","napětí jednoho článku — značíme U₁, jednotka V (volt)","počet článků — značíme n, bez jednotky (číslo)","Převody: 1 kV = 1 000 V,  1 V = 1 000 mV.","Do vzorce dosazuj obě napětí ve voltech; počet článků je celé číslo."],"vzorecSlovy":"celkové napětí = počet článků krát napětí jednoho článku","body":["zdroj napětí: elektrolyt + dvě elektrody z různých kovů","vybíjení: anoda −, katoda +","vně: elektrony v drátu; uvnitř: ionty v elektrolytu","napětí = dvojice kovů, ne velikost článku","suchý článek 1,5 V; plochá baterie 4,5 V (3 články za sebou)","akumulátor = dobíjecí zdroj (olověný 12 V, lithium-iontový)","sériové řazení: napětí se sčítá (U = n · U₁)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Chemické zdroje elektrického napětí', cesta: 'wC1cAYJitUk' },
					],
					odkazy: [
						{ nazev: 'Pokusy: Baterky (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5462-pokusy-baterky' },
						{ nazev: 'Pokus: Elektřina z ovoce a zeleniny (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/5524-pokus-elektrina-z-ovoce-a-zeleniny' },
						{ nazev: 'Jak probíhá recyklace baterií (ECOBAT)', url: 'https://www.ecobat.cz/jak-probiha-recyklace-baterii/' },
						{ nazev: 'Druhy baterií — spojovačka (Wordwall)', url: 'https://wordwall.net/cs/resource/71804207/druhy-bateri%C3%AD' },
						{ nazev: 'Pokus: Citronová baterie (Sbírka pokusů MFF UK)', url: 'https://fyzikalnipokusy.cz/2206/citronova-baterie' },
						{ nazev: 'Galvanické články — zápisky (Uč se online)', url: 'https://www.ucseonline.cz/skola/zakladni-skola/skolni-zapisky/chemie/galvanicke-clanky/' },
					],
				},
				{
					slug: 'vedeni-proudu-v-plynech',
					nazev: 'Vedení elektrického proudu v plynech',
					interakce: 'jiskra',
					obsah: "<h2>Vedení elektrického proudu v plynech</h2>\n<p>Vzduch kolem nás je za normálních podmínek <strong>špatný vodič</strong>. Elektrický proud jím skoro neprochází, proto musí spotřebiče vést proud po kabelech. Vzduch ale není dokonalý izolant — je v něm pár nabitých částic, a tak se nabitý elektroskop časem sám pomalu vybije.</p>\n<p>Horký vzduch vede elektřinu mnohem lépe než studený. Když k nabitému elektroskopu přiblížíš hořící svíčku, vybije se rychle. Čím je vzduch teplejší, tím lépe proud vede.</p>\n<h3>Co je ionizace</h3>\n<p>Při vysoké teplotě se molekuly vzduchu pohybují rychle a často do sebe narážejí. Tomuto ději se říká <strong>ionizace</strong> — z molekul se uvolňují elektrony.</p>\n<ul>\n<li>Molekula, která elektron ztratí, se stane <strong>kladným iontem</strong>.</li>\n<li>Molekula, která elektron navíc přijme, se stane <strong>záporným iontem</strong>.</li>\n<li>Vzduch pak vede proud, protože v něm létají volné elektrony i ionty.</li>\n</ul>\n<p>Vzduch se dá zionizovat i jinak než teplem — pomáhá třeba kosmické záření z vesmíru. Proto je vzduch vysoko nad zemí mnohem vodivější než u země. Ve výšce 50 kilometrů je vzduch už velmi dobrý vodič.</p>\n<h3>Jiskrový výboj: blesk</h3>\n<p>Když se ve zionizovaném vzduchu náhle spojí kladný a záporný náboj, vznikne <strong>výboj</strong> — krátký, jasně svítící průchod proudu plynem. Nejznámější jiskrový výboj je <strong>blesk</strong>.</p>\n<p>Blesk vzniká mezi mrakem a zemí nebo mezi dvěma mraky. V bouřkovém mraku se třením kapek a ledových krystalků nabije spodek mraku záporně a vršek kladně. Když napětí mezi mrakem a zemí naroste dost vysoko, vzduch se stane vodivým a proud jím rychle proteče.</p>\n<p>Blesk bývá dlouhý 2 až 3 kilometry. Uvnitř dosahuje teplota až <strong>20 000 až 30 000 °C</strong>. Tahle obrovská teplota prudce ohřeje vzduch, ten se rychle rozepne a vznikne hrom. Blesk vidíme dřív, než hrom uslyšíme, protože světlo letí rychleji než zvuk.</p>\n<p>Proti blesku chrání budovy <strong>bleskosvod</strong> — kovová tyč na střeše, spojená drátem se zemí. Vynalezli ho nezávisle na sobě Benjamin Franklin a český vědec Prokop Diviš. Malé jiskrové výboje využívá také zapalovací svíčka v autě.</p>\n<h3>Obloukový výboj: svařování</h3>\n<p>Elektrický oblouk vznikne mezi dvěma <strong>uhlíkovými elektrodami</strong>, které se nejdřív dotknou a pak mírně oddálí. Mezi nimi vznikne jasně zářící proud rozžhaveného plynu.</p>\n<p>Elektrický oblouk se využívá hlavně při <strong>svařování</strong> kovů, ale i při řezání plechů nebo v pecích na tavení kovu. Jeho světlo je tak jasné, že by mohlo poškodit oči — proto musí ten, kdo svařuje, nosit <strong>ochranné brýle nebo štít</strong>.</p>\n<h3>Výboj ve zředěném plynu: zářivky a neonky</h3>\n<p>Ve skleněné trubici s malým množstvím plynu vznikne při ionizaci <strong>výboj ve zředěném plynu</strong>. Barva světla závisí na tom, jaký plyn je v trubici.</p>\n<p>Tento typ výboje se využívá v <strong>zářivkách</strong> a <strong>doutnavkách</strong>, ale i v barevných světelných reklamách — třeba v neonových nápisech.</p>",
					zapis: {"body":["vzduch: za normálních podmínek špatný vodič","vzduch není dokonalý izolant","horký vzduch vede proud lépe","ionizace: srážky uvolní elektron","vzniká kladný a záporný iont","kosmické záření vzduch ionizuje","ve 50 km vzduch dobře vodí","jiskrový výboj = blesk","blesk dlouhý 2–3 km","teplota v blesku 20 000–30 000 °C","hrom = rozpínání ohřátého vzduchu","blesk vidíme dřív, než slyšíme hrom","ochrana před bleskem: bleskosvod","oblouk vzniká mezi uhlíkovými elektrodami","oblouk: svařování, řezání, tavení kovů","u oblouku nutné ochranné brýle","zředěný plyn: zářivky, doutnavky","barva výboje závisí na plynu"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak funguje blesk', cesta: 'rTo2z2xTOGk' },
					],
				},
				{
					slug: 'polovodice-vlastni-vodivost',
					nazev: 'Polovodiče, vlastní vodivost polovodičů',
					interakce: 'polovodic',
					obsah: "<h2>Polovodiče a jejich vlastní vodivost</h2>\n<p>Látky podle vedení elektrického proudu dělíme na tři skupiny. <strong>Vodiče</strong> (třeba kovy) proud vedou dobře. <strong>Izolanty</strong> proud nevedou vůbec. A jsou tu ještě <strong>polovodiče</strong> — vedou proud jen za určitých podmínek.</p>\n<p>Nejznámější polovodiče jsou <strong>křemík (Si)</strong> a <strong>germanium</strong>. Nechovají se ani jako vodiče, ani jako izolanty — jsou tak trochu „napůl\".</p>\n<h3>Odpor polovodičů se mění opačně než u kovů</h3>\n<p>U kovů platí: čím vyšší teplota, tím větší odpor a horší vedení proudu. U polovodičů je to přesně naopak.</p>\n<ul>\n<li>Studený polovodič má velký odpor a proud vede jen málo.</li>\n<li>Zahřátý polovodič má malý odpor a proud vede lépe.</li>\n</ul>\n<p>Odpor polovodiče mění i světlo — osvětlený polovodič vede proud lépe než neosvětlený.</p>\n<h3>Jak vzniká vlastní vodivost</h3>\n<p>Křemík má 4 valenční elektrony — to jsou ty nejvíc vnější, kterými je atom pevně spojen se sousedními atomy v krystalu.</p>\n<p>Když se krystal zahřeje, elektron se může vytrhnout z vazby a stane se <strong>volným elektronem</strong>. Na jeho místě zůstane prázdné místo, kterému říkáme <strong>díra</strong>. Vzniká tak vždy dvojice — volný elektron a díra.</p>\n<p>Díra se chová jako kladná částice a pohybuje se opačným směrem než elektrony. Elektrický proud v polovodiči tvoří pohyb volných elektronů i děr — tomu se říká <strong>vlastní vodivost</strong>.</p>\n<h3>Využití: termistor a fotorezistor</h3>\n<p><strong>Termistor</strong> je součástka, jejíž odpor se mění s teplotou. Používá se třeba v elektronických teploměrech nebo tam, kde je potřeba změřit velmi vysokou teplotu.</p>\n<p><strong>Fotorezistor</strong> mění odpor podle osvětlení. Najdeme ho třeba ve fotobuňkách nebo v optických závorách, které počítají procházející věci.</p>",
					zapis: {"body":["vodič vede, izolant nevede, polovodič vede jen za určitých podmínek","nejznámější polovodiče: křemík (Si), germanium","studený polovodič: velký odpor, špatně vede","teplý polovodič: malý odpor, dobře vede (opak kovů)","odpor mění i osvětlení","křemík: 4 valenční elektrony, pevné vazby v krystalu","zahřátím vzniká vždy pár: volný elektron + díra","díra = kladná částice, pohyb opačně než elektrony","proud v polovodiči = pohyb volných elektronů a děr","termistor: odpor mění teplota (elektronické teploměry)","fotorezistor: odpor mění světlo (fotobuňka, optická závora)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Polovodiče pohánějí náš svět', cesta: 'W7V0PBb97eY' },
					],
				},
				{
					slug: 'polovodice-typu-n-a-p-dioda',
					nazev: 'Polovodiče typu N a P, dioda',
					interakce: 'dioda',
					obsah: "<h2>Polovodiče typu N a P, dioda</h2>\n<p>Polovodič vede elektrický proud líp, když do něj přidáme <strong>příměs</strong> — trošku jiného prvku než křemík. Příměsi stačí opravdu málo. Takovému vylepšenému polovodiči se říká <strong>nevlastní polovodič</strong>.</p>\n<p>Podle toho, jaký prvek přidáme, vznikají dva druhy nevlastních polovodičů: <strong>typ N</strong> a <strong>typ P</strong>. Liší se tím, co mají navíc — buď volné elektrony, nebo volná místa po nich.</p>\n\n<h3>Typ N — elektrony navíc</h3>\n<p>Do křemíku přidáme prvek, který má o jeden elektron víc, třeba fosfor, arsen nebo antimon. Tenhle elektron zůstane volný a může se v krystalu pohybovat.</p>\n<p>Volné elektrony nesou záporný náboj, proto se polovodič jmenuje <strong>typ N</strong> — negativní. Proud jím vedou hlavně volné elektrony. Říká se tomu <strong>elektronová vodivost</strong>, protože proud nesou elektrony.</p>\n\n<h3>Typ P — díry navíc</h3>\n<p>Do křemíku přidáme jiný prvek, kterému naopak jeden elektron chybí, třeba bor, hliník, galium nebo indium. Tam, kde elektron chybí, zůstane prázdné místo — říká se mu <strong>díra</strong>.</p>\n<p>Díra se chová jako kladný náboj, proto se polovodič jmenuje <strong>typ P</strong> — pozitivní. Elektrony z okolí do děr přeskakují, a tak se díra jakoby posouvá dál. Říká se tomu <strong>děrová vodivost</strong>, protože proud nesou díry.</p>\n\n<h3>Přechod PN: proud jen jedním směrem</h3>\n<p>Když v jednom krystalu spojíme typ N s typem P, vznikne mezi nimi <strong>přechod PN</strong>. Podle toho, jak polovodič zapojíme do obvodu, se chová úplně jinak.</p>\n<p>V <strong>propustném směru</strong> proud prochází. V <strong>závěrném směru</strong> proud neprochází vůbec — polovodič se chová jako vypnutý spínač.</p>\n\n<h3>Dioda a její příbuzní</h3>\n<p><strong>Dioda</strong> je součástka s přechodem PN, která propouští proud jen jedním směrem. Šipka ve značce diody ukazuje směr, kterým proud smí procházet.</p>\n<p>Diody se používají jako <strong>usměrňovač</strong> — mění střídavý proud na stejnosměrný. Najdeš je v úplně každém elektronickém zařízení.</p>\n<p>Zvláštní diody umí i další věci. <strong>Fotodioda</strong> mění dopadající světlo na elektřinu. <strong>LED</strong> (svítivá dioda) naopak mění elektřinu na světlo — svítí jen v propustném zapojení, spotřebuje málo energie a vydrží dlouho.</p>\n\n<h3>Tranzistor a čip</h3>\n<p><strong>Tranzistor</strong> má dva přechody PN a funguje jako moc rychlý spínač — buď proud propustí, nebo ne. Tímhle způsobem počítač zpracovává nuly a jedničky.</p>\n<p>Na jedné malé destičce křemíku, které se říká <strong>čip</strong>, je spojeno miliony tranzistorů. Čipy řídí mobily, počítače i auta.</p>",
					zapis: {"body":["příměs do křemíku → nevlastní polovodič, vyšší vodivost","typ N: elektrony navíc (příměs fosfor, arsen, antimon) → elektronová vodivost","typ P: díry navíc (příměs bor, hliník, galium, indium) → děrová vodivost","přechod PN = styk typu N a typu P","propustný směr: proud prochází","závěrný směr: proud neprochází","dioda: proud jen jedním směrem, usměrňovač","LED (propustný směr): elektřina → světlo"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Polovodiče — srdce elektroniky', cesta: 'uoLW-OHBDls' },
					],
				},
			],
		},
		{
			slug: 'elektricka-energie-a-bezpecnost',
			nazev: 'Elektrická energie a bezpečnost',
			podtemata: [
				{
					slug: 'elektricka-energie-a-premeny',
					nazev: 'Elektrická energie a její přeměny',
					obsah: "<h2>Elektrická energie a její přeměny</h2>\n\n<p>Elektrická energie je výhodná tím, že se snadno mění na jiné druhy energie a naopak.</p>\n\n<h3>Elektrická energie se mění na…</h3>\n<ul>\n<li><strong>tepelnou</strong> — proud zahřívá vodič (větší odpor a proud = více tepla): vařič, žehlička, topení, pájka;</li>\n<li><strong>světelnou</strong> — žárovka, výbojka (reklamy, zářivky), <strong>LED</strong>;</li>\n<li><strong>magnetickou</strong> — kolem vodiče či cívky vzniká pole: elektromagnet;</li>\n<li><strong>pohybovou</strong> — na vodič v magnetickém poli působí síla: elektromotor, reproduktor;</li>\n<li><strong>chemickou</strong> — elektrolýza a pokovování.</li>\n</ul>\n\n<h3>…a naopak vzniká z jiné energie</h3>\n<ul>\n<li><strong>pohybová → elektrická</strong> — elektromagnetická indukce v <strong>alternátoru</strong> (elektrárny);</li>\n<li><strong>magnetická → elektrická</strong> — indukce v <strong>transformátoru</strong>;</li>\n<li><strong>světelná → elektrická</strong> — <strong>solární panely</strong>, fotovoltaika;</li>\n<li><strong>chemická → elektrická</strong> — galvanické články a akumulátory.</li>\n</ul>\n<p>Platí přitom <strong>zákon zachování energie</strong> — energie se jen přeměňuje, nevzniká ani nezaniká.</p>\n\n<h3>Tak proč mluvíme o „spotřebě\" energie?</h3>\n<p>Když energie nezaniká, co se s ní vlastně stane, než přijde účet? Nic se neztratilo — jen skončila jako teplo rozptýlené do okolí. Mixér ohřeje těsto i motor, žárovka pokoj, nabíječka sebe samu. Teplo rozptýlené po celém pokoji už ale nedokážeš sebrat a použít znovu.</p>\n<p>👉 Proto je poctivější říkat, že energii <strong>„znehodnocujeme\"</strong>, ne že ji spotřebováváme. Pořád jí je stejně, jen se z použitelné podoby změnila na nepoužitelnou. Proto žádný stroj nevydá víc energie, než do něj dáme. Proto nemůže existovat <strong>věčný stroj, který by běžel sám od sebe</strong> (perpetuum mobile).</p>\n<p>💡 Zamysli se nad <strong>přímotopem</strong>. Veškerá elektřina v něm skončí jako teplo, takže má účinnost skoro <strong>100 %</strong>. Není to výjimka ze zákona ani protiklad k tomu, co ses učil(a) o ztrátách.</p>\n<p>Je to případ, kdy je „ztrátové\" teplo přesně tím, co po stroji chceme. Totéž teplo je u počítače nebo motoru jen ztráta. Jestli je energie užitečná, nerozhoduje fyzika, ale náš záměr.</p>\n\n<h3>✏️ Zamysli se</h3>\n<p>Vyzkoušej si přeměny energie na zařízeních, o kterých se ve výkladu ještě nemluvilo.</p>\n<ol>\n<li>Diktafon nebo telefon zaznamená tvůj hlas pomocí <strong>mikrofonu</strong>. Uvnitř má mikrofon\n(podobně jako reproduktor) cívku a magnet. Jaká přeměna energie v mikrofonu nastává?\n<details><summary>řešení</summary>Zvuková vlna rozkmitá membránu s cívkou v magnetickém poli. Pohyb cívky pak vyvolá elektrické napětí — jde o přeměnu <strong>pohybová → elektrická</strong>\n(elektromagnetická indukce). Mikrofon pracuje přesně opačně než reproduktor.</details></li>\n<li><strong>Elektrický zvonek</strong> u domovních dveří po zmáčknutí tlačítka klepe kladívkem\no zvonek. Přes jaké mezikroky se elektrická energie promění na zvuk, který slyšíš?\n<details><summary>řešení</summary>Proud protéká cívkou a vytvoří <strong>magnetické</strong> pole,\nto přitáhne kovové kladívko — vzniká <strong>pohybová</strong> energie. Úder kladívka o zvonek\npak rozechvěje vzduch a vznikne zvuk. Řetězec je: elektrická → magnetická → pohybová → zvuková.</details></li>\n<li><strong>Indukční varná deska</strong> se sama téměř nezahřívá, přesto uvaří vodu v hrnci\nrychleji než klasická plotýnka. Kde v tomto případě vzniká teplo a jaké přeměny tomu předchází?\n<details><summary>řešení</summary>Cívka pod deskou vytváří střídavé <strong>magnetické</strong>\npole. To v kovovém dně hrnce vyvolá vířivé elektrické proudy, a teprve ty zahřejí dno hrnce\nodporem materiálu. Přeměna je tedy elektrická → magnetická → (elektrická) → <strong>tepelná</strong>\n— ale teplo vzniká přímo v hrnci, ne v desce.</details></li>\n<li><strong>Powerbanka</strong> nejdřív nabiješ ze zásuvky a později z ní nabiješ telefon.\nPopiš, jaké dvě přeměny energie při tom postupně proběhnou.\n<details><summary>řešení</summary>Při nabíjení powerbanky probíhá přeměna\n<strong>elektrická → chemická</strong> (energie se uloží v akumulátoru). Při nabíjení telefonu\npak probíhá opačná přeměna <strong>chemická → elektrická</strong> — a v telefonu se znovu uloží\njako chemická energie v jeho vlastní baterii.</details></li>\n</ol>",
					zapis: {
						body: [
							'Elektrická energie se snadno mění na tepelnou, světelnou, magnetickou, pohybovou nebo chemickou energii.',
							'Pohybová, světelná a chemická energie se mohou naopak měnit na elektrickou energii.',
							'Při přeměnách část energie často skončí jako teplo rozptýlené do okolí.',
							'Žádný stroj nemůže vydat více energie, než do něj dodáme.',
						],
						zakon: 'Energie nevzniká ani nezaniká, pouze se přeměňuje z jednoho druhu na jiný.',
					},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Elektromagnetická indukce', cesta: 'MaQ4DzuqK5E' },
						{ druh: 'video', nazev: 'Píseň: Dobrý sluha, zlý pán 🎵', cesta: '/materialy/fyzika/9-rocnik/elektricka-energie-a-bezpecnost/elektricka-energie-a-premeny/pisen-dobry-sluha-zly-pan.m4a' },
					],
					odkazy: [
						{ nazev: 'Video: Generátor elektrického proudu (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/3524-generator-elektrickeho-proudu' },
						{ nazev: 'Video: Solární panely (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/1924-solarni-panely' },
					],
					interakce: 'premeny-energie',
				},
				{
					slug: 'ucinky-proudu-bezpecnost',
					nazev: 'Účinky proudu na organismus, bezpečnost',
					interakce: 'bezpecna-vzdalenost-vedeni',
					obsah: "<h2>Účinky proudu na organismus, bezpečnost</h2>\n\n<p><strong>Lidské tělo vede elektrický proud.</strong> Proud jím proto snadno prochází. Většinou to škodí: způsobuje popáleniny, křeče svalů a poškození nervů. Lékaři proud přesto někdy využívají léčebně, třeba ve fyzioterapii.</p>\n\n<h3>Jak proud škodí tělu</h3>\n<p>Čím větší proud tělem prochází, tím větší je nebezpečí. Malý proud ucítíš jen jako slabé brnění. Se zvětšujícím se proudem přibývají křeče a bolest, až nakonec hrozí zástava srdce.</p>\n<ul>\n<li>0,5–1 mA — první pocit, že proud vůbec teče,</li>\n<li>2–5 mA — brní to, stoupá krevní tlak,</li>\n<li>6–15 mA — křeč svalů, člověk se <strong>nemůže sám pustit</strong>,</li>\n<li>25 mA — křeč dýchacích svalů, těžko se dýchá,</li>\n<li>60 mA — srdce se roztřese a přestane pravidelně pumpovat, u střídavého proudu tomu říkáme <strong>fibrilace</strong>,</li>\n<li><strong>nad 80 mA — srdce zpravidla trvale zastaví.</strong></li>\n</ul>\n\n<h3>Co rozhoduje o nebezpečí</h3>\n<p>Kolik proudu tělem poteče, závisí hlavně na odporu kůže. Suchá kůže a suchá obuv mají velký odpor, asi 150 000 Ω, proto z baterie většinou nic neucítíš. Od napětí kolem 50 V se ale kůže prorazí a odpor těla klesne na pouhých <strong>2 000 Ω</strong>. Vlhká kůže má tak malý odpor hned od začátku.</p>\n<p>Záleží také na tom, kudy proud tělem prochází. Nejnebezpečnější je cesta přes levou ruku do srdce, nebezpečná je i cesta přes hlavu do mozku. A platí i to, že čím déle proud tělem prochází, tím větší je poškození — proto je tak nebezpečné, že se při silnějším proudu člověk nedokáže sám pustit.</p>\n\n<h3>Bezpečné napětí</h3>\n<p>Ve vlhkých a zvlášť nebezpečných prostorách, jako je koupelna, bazén nebo sklep, platí přísnější mez: stejnosměrné napětí smí být nejvýš 25 V, střídavé jen 12 V. V suchých místnostech jsou meze vyšší — střídavé 50 V, stejnosměrné 120 V. Napětí ze zásuvky, tedy 230 V, je nebezpečné vždycky a všude.</p>\n\n<h3>Zásady bezpečnosti doma i venku</h3>\n<p>Základní pravidla u domácích spotřebičů — mokrá ruka, jistič, poškozené kabely — už znáš z osmé třídy. Tady si řekneme, jak se chovat u vedení venku.</p>\n<ul>\n<li>vysoké stroje a předměty — jeřáb, sklápěč, žebřík, i draka nebo model letadla — nikdy nezvedej ani nepouštěj do blízkosti vedení; ochranné pásmo platí i pro techniku, ne jen pro lidi,</li>\n<li>na poli pod vedením dávej pozor na výšku zemědělských strojů, jako je kombajn nebo postřikovač — dotyk výložníku s drátem je jedna z nejčastějších příčin úrazů elektřinou u dospělých,</li>\n<li>po vichřici nebo bouřce buď u vedení obzvlášť opatrný — spadlý drát bývá právě tehdy.</li>\n</ul>\n\n<h3>⚡ Vedení vysokého napětí</h3>\n<p><strong>Nedotýkáme se nosných stožárů elektrického vedení ani drátů spadlých na zem.</strong> U vysokého napětí navíc nerozhoduje jen dotyk — proud umí <strong>přeskočit vzduchem jako jiskra</strong>, které se říká oblouk. Nebezpečí proto hrozí, i když se stožáru nebo drátu vůbec nedotkneš.</p>\n<p>Proto se k vedení nikdy nepřibližuj a nezkoušej se ho dotknout ani nepřímo — <strong>tyčí, prutem, žebříkem ani dronem</strong>. Ze stejného důvodu se nikdy neleze na stožáry vedení ani na vagony a jiné vysoké konstrukce v jejich blízkosti.</p>\n<p>Proto zákon (energetický zákon č. 458/2000 Sb.) kolem vedení stanovuje <strong>ochranné pásmo</strong> — vzdálenost od krajního drátu, kam se nesmí stavět, sázet stromy ani vjíždět s technikou. Platí, že <strong>čím vyšší napětí vedení má, tím širší ochranné pásmo je</strong>; přesnou šířku pro každou hladinu napětí stanovuje energetický zákon.</p>\n<p><strong>Spadlý drát na zemi bývá pořád pod napětím</strong>, i když se nehýbe a vůbec nejiskří — na pohled to nepoznáš. K němu se nikdy nepřibližuj, ihned volej <strong>112</strong> (případně <strong>150</strong> hasiče) — <strong>155</strong> navíc jen tehdy, je-li někdo zraněný — a od místa odcházej <strong>drobnými krůčky</strong>, nikdy neutíkej velkými skoky.</p>\n\n<h3>První pomoc při úrazu proudem</h3>\n<ol>\n<li><strong>Vypni proud</strong> — vypínačem, jističem nebo pojistkami.</li>\n<li>Pokud to nejde a zraněný se stále dotýká vodiče, odděl ho <strong>izolující tyčí</strong> ze suchého dřeva nebo plastu. <strong>Nikdy se ho ani jeho oděvu nedotýkej holou rukou</strong>, dokud není mimo dosah proudu. U vysokého napětí se raději vůbec nepřibližuj, viz výše.</li>\n<li><strong>Volej 155 souběžně</strong> — zapni si hlasitý odposlech, nebo pošli volat někoho jiného. Nečekej, až budeš s pomocí hotový.</li>\n<li><strong>Nedýchá normálně?</strong> Začni stlačovat hrudník. Puls nehledej, jen ztrácíš čas a laik ho stejně spolehlivě nenahmatá.</li>\n</ol>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Proč zásuvka zabíjí, i když jsi úplně suchý? Spočítáme to Ohmovým zákonem: <strong>I = U : R</strong>. Zásuvka má napětí U = 230 V. Kůže se nad 50 V prorazí, takže odpor klesne na R = 2 000 Ω — stejně jako u mokré kůže.</p>\n<p>I = U : R = 230 : 2 000 = 0,115 A, tedy <strong>115 mA</strong>.</p>\n<p>Podívej se do tabulky výš: 115 mA je hluboko nad 80 mA, tedy v pásmu zástavy srdce. Proto je zásuvka 230 V nebezpečná vždycky — ať jsi suchý, nebo mokrý.</p>",
					zapis: {"jednotky":["elektrický proud — značíme I, jednotka A (ampér); v příkladech měříme v miliampérech (mA), 1 mA = 0,001 A","elektrický odpor — značíme R, jednotka Ω (ohm)","elektrické napětí — značíme U, jednotka V (volt)"],"body":["tělo vede proud — čím proud, tím horší poškození","0,5–1 mA cítíš, 60 mA fibrilace srdce, nad 80 mA zástava srdce","čím déle proud teče, tím větší poškození — proto je nebezpečné, že se člověk nemůže pustit","sucho: odpor asi 150 000 Ω, po proražení kůže (nad 50 V) i mokro: jen asi 2 000 Ω","nejnebezpečnější cesta: ruka → srdce, hlava → mozek","bezpečné napětí: stejnosměrné 25 V, střídavé 12 V (vlhké prostory)","zásuvka 230 V je nebezpečná vždy","stožáry, dráty vedení, spadlý drát — nikdy se nedotýkat","u vysokého napětí hrozí i oblouk bez dotyku","úraz proudem: vypnout → nedotýkat se holou rukou → volat 155 → stlačovat hrudník"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Elektrická bezpečnost', cesta: 'VfCqvZDHUWQ' },
						{ druh: 'youtube', nazev: 'Video: Domovní elektroinstalace', cesta: 'jhqpxSjUCMk' },
					],
					odkazy: [
						{ nazev: 'Bezpečně s elektřinou (ČEZ Distribuce)', url: 'https://www.cezdistribuce.cz/cs/bezpecnost/bezpecnost-a-ochrana-zdravi/bezpecne-s-elektrinou' },
					],
				},
			],
		},
		{
			slug: 'jaderna-fyzika',
			nazev: 'Jaderná fyzika',
			podtemata: [
				{
					slug: 'jadro-atomu',
					nazev: 'Jádro atomu',
					interakce: 'izotopy',
					obsah: "<h2>Jádro atomu</h2>\n\n<p>Atom je základní stavební částice, ze které je tvořeno úplně všechno kolem nás. Je velmi malý — jeho velikost je řádově 10⁻¹⁰ m, do jednoho milimetru by se jich vešlo 10 milionů za sebou. Každý atom se skládá ze dvou částí: <strong>jádra</strong> uprostřed a <strong>obalu</strong> kolem něj.</p>\n\n<h3>Obal a jádro atomu</h3>\n<p><strong>Obal atomu</strong> tvoří <strong>elektrony</strong> — záporně nabité částice, které se pohybují kolem jádra. Elektrony se dají z atomu snadno uvolnit třením. V kovech se volně pohybují a vytvářejí <strong>elektrický proud</strong>.</p>\n<p><strong>Jádro atomu</strong> tvoří <strong>protony</strong> (kladně nabité) a <strong>neutrony</strong> (bez náboje). Společně se nazývají <strong>nukleony</strong>. Jádro je vzhledem k celému atomu velice malé — je asi stotisíckrát menší než atom sám.</p>\n<p>Přestože je jádro tak malé, je v něm soustředěna <strong>téměř všechna hmotnost atomu</strong>. Proton i neutron váží asi 1 800krát víc než elektron, hmotnost elektronů se proto dá zanedbat.</p>\n<p>Proton a elektron mají náboj stejně velký, jen s opačným znaménkem. Za normálních podmínek je atom <strong>elektricky neutrální</strong> — počet protonů v jádře se rovná počtu elektronů v obalu.</p>\n\n<h3>🔬 Jak jsme objevovali atom (modely atomu)</h3>\n<ul>\n<li><strong>Daltonův model (1803)</strong> — atom jako malá, nedělitelná kulička; každý prvek má své vlastní atomy</li>\n<li><strong>Thomsonův model (1897)</strong> — „rozinky v pudinku\": J. J. Thomson objevil elektron; atom si představoval jako kladnou hmotu (pudink) s rozptýlenými elektrony (rozinkami)</li>\n<li><strong>Rutherfordův model (1911)</strong> — pokus s ostřelováním zlaté fólie ukázal, že téměř všechna hmota je v malém kladném <strong>jádře</strong> a elektrony obíhají kolem</li>\n<li><strong>Bohrův model (1913)</strong> — elektrony obíhají jen po určitých drahách (slupkách) s danou energií, „jako planety kolem Slunce\"</li>\n<li><strong>Moderní kvantový model</strong> — elektron nemá přesnou dráhu; známe jen oblasti (<strong>orbitaly</strong>), kde se nejpravděpodobněji nachází</li>\n</ul>\n<p>👉 Každý nový pokus model vylepšil — věda se vyvíjí postupným zpřesňováním.</p>\n\n<h3>Protonové a nukleonové číslo</h3>\n<p><strong>Protonové číslo Z</strong> udává počet protonů v jádře. Jednoznačně určuje, o jaký chemický prvek jde — každý prvek najdeme v periodické tabulce podle jeho protonového čísla.</p>\n<p><strong>Nukleonové číslo A</strong> udává počet všech nukleonů v jádře, tedy protonů a neutronů dohromady. Určuje hmotnost jádra, a tedy skoro celého atomu.</p>\n<p>Počet neutronů spočítáme jako rozdíl obou čísel: <strong>N = A − Z</strong>. Jádro uranu zapisujeme ²³⁸U — má protonové číslo 92 a nukleonové číslo 238. Počet neutronů proto je 238 − 92 = 146. Atom je neutrální, takže má i 92 elektronů.</p>\n\n<h3>Izotopy</h3>\n<p><strong>Izotopy</strong> jsou různé druhy atomů téhož prvku. Mají stejné protonové číslo, ale <strong>různé nukleonové číslo</strong> — liší se počtem neutronů. Chemické vlastnosti mají stejné, liší se jen hmotností a chováním při jaderných reakcích.</p>\n<p>Například uhlík se v přírodě vyskytuje jako tři izotopy: uhlík ¹²C, uhlík ¹³C a uhlík ¹⁴C. Všechny mají 6 protonů, ale liší se počtem neutronů.</p>\n<p>Zajímavý je i vodík, který má tři izotopy s vlastními jmény. <strong>Lehký vodík</strong> (protium) má 1 proton a žádný neutron. <strong>Deuterium</strong> (těžký vodík) má navíc 1 neutron, je proto dvakrát těžší. <strong>Tritium</strong> (supertěžký vodík) má neutrony dva, v přírodě je vzácné a je radioaktivní.</p>\n\n<h3>Nuklid a značení prvků</h3>\n<p><strong>Nuklid</strong> je skupina úplně stejných atomů — mají stejné protonové i stejné nukleonové číslo. Izotopy uhlíku dohromady tvoří prvek uhlík, ale jeden konkrétní izotop, třeba uhlík 12, je už jeden nuklid.</p>\n<p>Prvek zapisujeme jeho značkou, třeba C pro uhlík nebo U pro uran. Nukleonové číslo píšeme vlevo nahoře vedle značky, protonové číslo vlevo dole.</p>\n<p>Uran s 92 protony a 238 nukleony tak zapíšeme ²³⁸₉₂U. Nuklid uhlíku se 6 protony a 12 nukleony zapíšeme ¹²₆C.</p>\n\n<h3>Jaderné síly</h3>\n<p><strong>Jaderné síly</strong> jsou velmi silné přitažlivé síly, které drží nukleony v jádře pohromadě. Působí jen na velmi krátkou vzdálenost — pouze uvnitř jádra.</p>\n<p>Musí překonat odpudivou elektrickou sílu mezi protony, které se navzájem odpuzují. Čím je jádro větší, tím je méně stabilní a má větší sklon se rozpadnout.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Vztah N = A − Z umíme použít pro libovolné jádro. U uranu (Z = 92, A = 238) vyjde N = 238 − 92 = 146 neutronů. U uhlíku ¹²C (Z = 6, A = 12) vyjde N = 12 − 6 = 6 neutronů. U uhlíku ¹⁴C (Z = 6, A = 14) vyjde N = 14 − 6 = 8 neutronů — proto má víc neutronů a je těžší.</p>\n<p>Když se protony a neutrony spojí do jádra, výsledné jádro je <strong>lehčí</strong> než součet hmotností všech nukleonů zvlášť. Tomuto rozdílu říkáme <strong>hmotnostní úbytek</strong>.</p>\n<p>Chybějící hmotnost se přemění na energii, která nukleony v jádře drží pohromadě — na <strong>vazebnou energii</strong>. Platí pro ni Einsteinův vzorec <strong>E = m · c²</strong>, kde m je hmotnostní úbytek a c je rychlost světla.</p>\n<p>Rychlost světla je obrovské číslo — 300 000 km/s, tedy 300 000 000 m/s — a ve vzorci se navíc umocňuje. Proto i malinký hmotnostní úbytek uvolní obrovské množství energie. Proto je jaderná energie mnohem silnější než energie z hoření (chemických reakcí).</p>",
					zapis: {"vzorec":"N = A − Z      (odvozeně: A = N + Z,  Z = A − N)      E = m · c²      (odvozeně: m = E : c²)","jednotky":["počet neutronů N — bez jednotky","nukleonové číslo A — počet nukleonů (bez jednotky)","protonové číslo Z — počet protonů (bez jednotky)","vazebná energie E — značíme E, jednotka J (joule)","hmotnostní úbytek m — značíme m, jednotka kg (kilogram)","rychlost světla c — značíme c, jednotka m/s (metr za sekundu)","300 000 km/s = 300 000 000 m/s. Do vztahu E = m · c² dosazuj m v kg a c v m/s; energie vyjde v J."],"vzorecSlovy":"počet neutronů = nukleonové číslo minus protonové číslo; vazebná energie = hmotnostní úbytek krát druhá mocnina rychlosti světla","body":["atom = jádro + obal (elektrony)","jádro = protony (+) a neutrony (0) = nukleony","jádro je asi 100 000× menší než atom","v jádře je téměř celá hmotnost atomu","proton, neutron ≈ 1 800× hmotnost elektronu","atom neutrální: počet protonů = počet elektronů","Z = protonové číslo → určuje prvek","A = nukleonové číslo → počet nukleonů","N = A − Z (počet neutronů)","izotopy: stejné Z, různé A (jiný počet neutronů)","nuklid: stejné Z i stejné A","jaderné síly: krátký dosah, drží jádro pohromadě","hmotnostní úbytek → vazebná energie E = m · c²"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jádro atomu a síly v jádře', cesta: 'gbUMqax9SMs' },
						{ druh: 'youtube', nazev: 'Video: Atom, iont, izotop', cesta: '5WUfEMAbwQM' },
						{ druh: 'youtube', nazev: 'Video: Atomy a modely', cesta: 'uszDiE3FDQk' },
						{ druh: 'video', nazev: 'Píseň: Síla z jádra 🎵', cesta: '/materialy/fyzika/9-rocnik/jaderna-fyzika/jadro-atomu/pisen-sila-z-jadra.m4a' },
					],
				},
				{
					slug: 'radioaktivita',
					nazev: 'Radioaktivita, ochrana před zářením',
					interakce: 'rozpad',
					obsah: "<h2>Radioaktivita, ochrana před zářením</h2>\n\n<p>Roku <strong>1896</strong> objevil francouzský fyzik <strong>Henri Becquerel</strong>, že uranová ruda vydává neviditelné záření. Šlo o rudu zvanou <strong>smolinec</strong> z Jáchymova.</p>\n<p>Manželé <strong>Marie a Pierre Curieovi</strong> ho zpracovali celý vagon a získali jen asi <strong>0,1 gramu</strong> nových prvků polonia a radia. Zjistili také, že záření má <strong>tři složky</strong> — dnes jim říkáme alfa, beta a gama. Později <strong>Ernest Rutherford</strong> dokázal, že záření vychází přímo z jádra atomu.</p>\n<p><strong>Radioaktivita</strong> je <strong>samovolný rozpad nestabilních jader</strong>. Jádra těžších prvků se sama mění na jiná a přitom uvolňují <strong>ionizující záření</strong> — záření, které dokáže z atomů vyrážet elektrony. Člověk tento rozpad nijak neovlivní. Látky, které záření vydávají, nazýváme <strong>radionuklidy</strong> — třeba uran, radium nebo radon.</p>\n\n<h3>Druhy záření a co je zastaví</h3>\n<ul>\n<li><strong>Záření α (alfa)</strong> — proud jader helia (2 protony + 2 neutrony), kladné; protonové číslo se sníží o 2. <strong>Zastaví ho list papíru</strong> (dolet ve vzduchu jen ~5 cm).</li>\n<li><strong>Záření β (beta)</strong> — proud rychlých elektronů z jádra (neutron se změní na proton a elektron); protonové číslo se zvětší o 1. Zastaví ho <strong>hliníkový plech</strong>.</li>\n<li><strong>Záření γ (gama)</strong> — elektromagnetické záření s velmi vysokou energií, <strong>nejpronikavější a nejnebezpečnější</strong>; zastaví ho jen silná vrstva <strong>olova nebo betonu</strong>.</li>\n</ul>\n\n<h3>Poločas rozpadu</h3>\n<p><strong>Poločas rozpadu T</strong> je doba, za kterou se rozpadne <strong>přesně polovina</strong> jader. Různé radionuklidy ho mají různý — uran 238 má poločas asi <strong>4,5 miliardy let</strong>, radon 222 jen <strong>3,5 dne</strong>. Po každém dalším poločasu klesne množství zase na polovinu.</p>\n<p>Uhlík 14 má poločas <strong>5 730 let</strong>. Po této době se přemění přesně polovina uhlíku 14 na dusík. Proto se uhlík 14 používá k <strong>určování stáří</strong> starých nálezů, třeba kostí nebo dřeva.</p>\n\n<h3>Ochrana před zářením</h3>\n<p>Před zářením se chráníme třemi způsoby. <strong>Stínění</strong> hustým materiálem záření pohltí — třeba olovo nebo beton. Pomáhá i <strong>bezpečná vzdálenost</strong> od zdroje a co nejkratší <strong>doba</strong>, kterou u něj strávíme. Dávku záření, kterou tělo přijme, měříme v <strong>sievertech (Sv)</strong> pomocí <strong>dozimetru</strong> — přístroje, který záření zaznamenává.</p>\n\n<h3>🏠 Radon v domě</h3>\n<p><strong>Radon</strong> je přírodní radioaktivní plyn, který stoupá z podloží a může pronikat prasklinami do domů. Není vidět ani cítit — pozná se <strong>jen měřením</strong>. V Česku je radonu v podloží hodně (žula), proto se s ním počítá při každé stavbě.</p>\n<ul>\n<li><strong>Nechat změřit</strong> — měřicí detektory zjistí, kolik radonu doma je (hádání nestačí)</li>\n<li><strong>Často větrat</strong> — čerstvý vzduch množství radonu v místnosti snižuje</li>\n<li><strong>Utěsnit a opravit dům</strong> — uzavřít praskliny v podlaze a odvést radon mimo dům</li>\n</ul>\n\n<h3>Využití radioaktivity</h3>\n<p>Radioaktivita má i užitečné stránky. Lékaři ozařováním léčí nádory a radioaktivitu využívají i přístroje kolem nás.</p>\n<ul>\n<li><strong>určování stáří</strong> (uhlík <sup>14</sup>C)</li>\n<li><strong>léčba nádorů</strong> ozařováním</li>\n<li><strong>detektory kouře</strong></li>\n<li><strong>defektoskopie</strong> — hledání skrytých vad uvnitř materiálu</li>\n<li><strong>zdroj energie</strong> pro vesmírné sondy</li>\n</ul>",
					zapis: {"jednotky":["poločas rozpadu — značíme T, jednotka s nebo rok (podle radionuklidu)","dávka záření — jednotka Sv (sievert)"],"body":["radioaktivita: samovolný rozpad nestabilních jader","vzniká ionizující záření, nelze ho ovlivnit","záření alfa → zastaví list papíru","záření beta → zastaví hliníkový plech","záření gama → zastaví olovo nebo beton","poločas rozpadu: doba na polovinu jader","ochrana: stínění, vzdálenost, kratší čas","dávka záření se měří v sievertech","využití: určování stáří uhlíkem 14","využití: léčba nádorů, detektory kouře","radon: neviditelný plyn, zjistíme měřením","radon snížíme větráním a utěsněním domu"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Radioaktivita — neviditelná síla', cesta: '8QArttMYsHA' },
					],
				},
				{
					slug: 'jaderna-energie-a-reakce',
					nazev: 'Jaderná energie, jaderná reakce',
					interakce: 'retezova-reakce',
					obsah: "<h2>Jaderná energie, jaderná reakce</h2>\n<p><strong>Jaderná energie</strong> je energie „uložená\" přímo v jádře atomu. Uvolní se při vhodné jaderné reakci a projeví se hlavně jako <strong>teplo</strong>. Lidé jí často říkají „atomová energie\", ale to není přesný název.</p>\n\n<h3>Co je jaderná reakce</h3>\n<p>Jaderná reakce je <strong>vyvolaná přeměna jádra</strong> stabilního prvku. Spustí ji srážka s jinou částicí — neutronem, protonem nebo částicí α či β. Při jaderné reakci vždy vznikne <strong>jádro jiného prvku</strong>, než jaké do reakce vstoupilo.</p>\n<p>Jaderná reakce se liší od radioaktivity: reakci někdo <strong>vyvolá</strong> zásahem částice, radioaktivní rozpad probíhá <strong>samovolně</strong>. První jadernou reakci pozoroval fyzik <strong>E. Rutherford</strong>: ostřeloval dusík částicemi α a vznikl kyslík.</p>\n<p>Při každé jaderné reakci platí <strong>zákon zachování nukleonového i protonového čísla</strong>. Kolik nukleonů (protonů a neutronů) vstoupí do reakce, tolik jich z ní i vystoupí. Stejně tak zůstává stejný i počet protonů.</p>\n\n<h3>Štěpení jádra uranu</h3>\n<p>Při <strong>štěpení</strong> zasáhne neutron těžké jádro, například <strong>uran 235</strong>. Jádro se rozpadne na dvě lehčí jádra (třeba baryum a krypton), uvolní se <strong>další neutrony</strong> a obrovská energie.</p>\n\n<h3>Řetězová reakce</h3>\n<p>Uvolněné neutrony mohou zasáhnout další jádra uranu a rozštěpit je taky. Vznikne <strong>řetězová reakce</strong> — reakce, která sama pokračuje dál a dál. Musí být splněná podmínka <strong>kritického množství</strong> uranu.</p>\n<ul>\n<li><strong>Neřízená řetězová reakce</strong> — všechny neutrony reagují naráz, energie se uvolní během okamžiku → <strong>jaderná bomba</strong>.</li>\n<li><strong>Řízená řetězová reakce</strong> — část neutronů se pohltí, výkon zůstává stálý → <strong>jaderný reaktor</strong>.</li>\n</ul>\n\n<h3>Slučování jader (fúze)</h3>\n<p>Při <strong>fúzi</strong> se naopak dvě lehčí jádra spojí v jedno těžší. Uvolní se přitom ještě větší energie než při štěpení. Fúze potřebuje obrovskou teplotu — <strong>miliony stupňů Celsia</strong>, proto se jí říká termonukleární reakce.</p>\n<p>Fúze probíhá přirozeně ve <strong>hvězdách</strong>. V jádru Slunce je teplota asi <strong>15 milionů °C</strong> a vodík se tam slučuje na helium. Lidé fúzi zkoumají v zařízení zvaném <strong>tokamak</strong>; nezvládnutá fúze pohání i vodíkovou bombu.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Zákon zachování nukleonového a protonového čísla si ověříme na Rutherfordově reakci. Dusík (nukleonové číslo 14, protonové 7) zasáhne částice α (nukleonové 4, protonové 2). Vznikne kyslík (nukleonové 17, protonové 8) a jeden proton (nukleonové 1, protonové 1).</p>\n<p>Nukleonová čísla: 14 + 4 = 18 před reakcí, 17 + 1 = 18 po reakci. Sedí to.</p>\n<p>Protonová čísla: 7 + 2 = 9 před reakcí, 8 + 1 = 9 po reakci. I tady to sedí — počet nukleonů i protonů zůstal stejný.</p>",
					zapis: {"jednotky":[],"zakon":"Při jaderných reakcích se zachovává celkový počet nukleonů i celkový počet protonů.","body":["jaderná energie: uložená v jádře atomu","reakce: vyvolaná zásahem částice","reakce vyvolaná, radioaktivita samovolná","vzniká jádro jiného prvku","štěpení: uran 235 → dvě jádra","štěpení uvolní další neutrony","neutrony štěpí další jádra: řetězová reakce","neřízená → jaderná bomba","řízená → jaderný reaktor","fúze: lehčí jádra → jedno těžší","fúze ve hvězdách: vodík → helium"]},
					odkazy: [
						{ nazev: 'e-manuel.cz: Umělé jaderné reakce (štěpení, fúze)', url: 'https://e-manuel.cz/kapitoly/jaderna-fyzika/vyklad/umele-reakce/' },
						{ nazev: 'Techmania: Štěpení jader', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/atomy-castice/stepeni-jader' },
					],
				},
				{
					slug: 'jaderny-reaktor-elektrarna',
					nazev: 'Jaderný reaktor, jaderná elektrárna',
					interakce: 'reaktor',
					obsah: "<h2>Jaderný reaktor a jaderná elektrárna</h2>\n\n<p><strong>Jaderný reaktor</strong> je zařízení, ve kterém probíhá <strong>řízená řetězová reakce</strong>. Uvnitř se štěpí jádra uranu a uvolňuje se teplo. Nejrozšířenější typ se jmenuje <strong>vodní tlakový reaktor</strong>.</p>\n<p>Místo, kde reakce probíhá, se nazývá <strong>aktivní zóna</strong>. Je uvnitř silné ocelové <strong>tlakové nádoby</strong>. Kolem celého reaktoru je ještě ochranný obal z oceli a betonu — <strong>kontejnment</strong>. Ten brání tomu, aby záření uniklo ven.</p>\n\n<h3>Palivo a moderátor</h3>\n<p><strong>Palivem</strong> reaktoru je obohacený <strong>uran 235</strong> (oxid uraničitý), slisovaný do tyčí. V jednom kilogramu uranu je tolik energie jako v celém vagonu uhlí.</p>\n<p>Neutrony, které se při štěpení uvolní, jsou moc rychlé na to, aby dobře štěpily další jádra. Proto je v reaktoru <strong>moderátor</strong> — látka, která neutrony zpomalí na vhodnou rychlost. Jako moderátor slouží voda, těžká voda nebo grafit.</p>\n\n<h3>Regulační tyče a chladivo</h3>\n<p><strong>Regulační tyče</strong> jsou z bórové oceli a pohlcují neutrony navíc. Zasunutím hlouběji do aktivní zóny reakci zpomalíme, vysunutím ji zrychlíme — takhle obsluha řídí výkon reaktoru.</p>\n<p>Pro nouzové případy jsou tu ještě <strong>havarijní tyče</strong> z kadmia. Ty dokážou řetězovou reakci rychle úplně zastavit.</p>\n<p><strong>Chladivo</strong> odvádí teplo z aktivní zóny — nejčastěji je to voda. Aby zůstala kapalná i při teplotě kolem 300 °C, je pod velkým tlakem asi 16 MPa (megapascalů, jednotka tlaku).</p>\n\n<h3>Jak vzniká elektřina</h3>\n<p>Jaderná elektrárna funguje podobně jako elektrárna tepelná. Liší se jen v tom, odkud se bere teplo — tady z řízeného štěpení jader, ne ze spalování uhlí.</p>\n<p>Teplo vyrobí páru. Pára roztočí <strong>turbínu</strong> spojenou s <strong>generátorem</strong> a generátor vyrobí elektřinu.</p>\n<p>Voda v elektrárně proudí ve <strong>třech oddělených okruzích</strong>. Primární okruh je radioaktivní a vede přímo u reaktoru. Sekundární okruh vede páru k turbíně a terciární okruh vodu chladí.</p>\n\n<h3>Bezpečnost a jaderný odpad</h3>\n<p><strong>Výhody:</strong> jaderná elektrárna nevypouští do ovzduší skleníkové plyny — uniká z ní jen čistá vodní pára. Je také velmi účinná: na stejné množství elektřiny stačí mnohem méně paliva než u uhelné elektrárny.</p>\n<p><strong>Nevýhody:</strong> použité, „vyhořelé\" palivo zůstává radioaktivní a musí se bezpečně skladovat i tisíce let; teprve se hledá způsob, jak ho dál využít. Uran je stejně jako uhlí nebo ropa <strong>neobnovitelný</strong> zdroj.</p>\n<p>Stavba elektrárny i výroba obohaceného uranu jsou velmi nákladné. A případná havárie by mohla mít <strong>katastrofické následky</strong> — proto reaktor chrání havarijní tyče i kontejnment zároveň.</p>\n\n<h3>Temelín a Dukovany</h3>\n<p>V České republice vyrábějí elektřinu dvě jaderné elektrárny: <strong>Temelín</strong> a <strong>Dukovany</strong>.</p>\n<p>Malé jaderné reaktory pohánějí i ponorky, ledoborce a kosmické sondy. Používají se i k výrobě <strong>radiofarmak</strong> — léků s malým množstvím radioaktivní látky, které lékařům pomáhají vyšetřit tělo.</p>",
					zapis: {"jednotky":["tlak chladiva — značíme p, jednotka MPa (megapascal); v reaktoru přibližně 16 MPa"],"body":["reaktor: řízená řetězová reakce","typ: vodní tlakový reaktor","palivo: obohacený uran 235","moderátor: zpomaluje neutrony","regulační tyče: řídí výkon (bórová ocel)","havarijní tyče: rychlé zastavení (kadmium)","chladivo: odvádí teplo, voda pod tlakem","elektrárna: teplo → pára → turbína → generátor","tři okruhy: primární, sekundární, terciární","výhody: bez skleníkových plynů, úsporné palivo","nevýhody: odpad na tisíce let, riziko havárie","ČR: Temelín, Dukovany","jinde: ponorky, sondy, radiofarmaka"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak funguje jaderná elektrárna', cesta: 'BJbAvgpwCWc' },
					],
				},
			],
		},
		{
			slug: 'energie-a-vesmir',
			nazev: 'Zdroje energie a vesmír',
			podtemata: [
				{
					slug: 'obnovitelne-a-neobnovitelne-zdroje',
					nazev: 'Obnovitelné a neobnovitelné zdroje energie',
					obsah: "\n\t\t\t\t\t\t<h2>Obnovitelné a neobnovitelné zdroje energie</h2>\n\t\t\t\t\t\t<p>Přírodní zdroje energie, ze kterých vyrábíme elektřinu nebo poháníme stroje, dělíme do dvou skupin.</p>\n\n\t\t\t\t\t\t<h3>Obnovitelné zdroje</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>nacházejí se v přírodě v <strong>neomezeném množství</strong> — samy se stále doplňují,</li>\n\t\t\t\t\t\t<li>patří sem <strong>sluneční záření, vítr, tekoucí voda, geotermální proudy, biomasa a bioplyn i vodík</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>👉 „Obnovitelný\" ale neznamená „nevyčerpatelný\". Vytěžený les nebo přetížený geotermální vrt potřebují čas, než se vzpamatují, a mohou dojít stejně jako uhlí. Rozhoduje <strong>rychlost, jakou se zdroj obnovuje</strong>, ne jeho množství.</p>\n\t\t\t\t\t\t<p>🔍 <strong>Vodík je zvláštní případ.</strong> Řadíme ho mezi obnovitelné zdroje. Na Zemi se ale volný skoro nevyskytuje — musíme ho <strong>vyrobit</strong> (nejčastěji elektrolýzou vody), a to spotřebuje energii.</p>\n\t\t\t\t\t\t<p>Proto se o vodíku často mluví spíš jako o <strong>nosiči energie</strong>. Umí energii uchovat a přenést, třeba pro auta na vodíkový pohon — podobně jako baterie.</p>\n\n\t\t\t\t\t\t<h3>Neobnovitelné zdroje</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>jsou jen v <strong>omezeném množství</strong> a za určitou dobu se vyčerpají,</li>\n\t\t\t\t\t\t<li><strong>fosilní paliva</strong> — uhlí, ropa, zemní plyn (vznikla ze zbytků odumřelých organismů v zemské kůře bez přístupu vzduchu),</li>\n\t\t\t\t\t\t<li>ropné břidlice a písky, <strong>jaderné palivo</strong>.</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Druhy elektráren</h3>\n\t\t\t\t\t\t<p>Podle využitého zdroje stavíme elektrárny <strong>jaderné</strong> (zpravidla obohacený uran 235), <strong>tepelné</strong> (spalují fosilní paliva), <strong>sluneční</strong> (fotovoltaické), <strong>větrné</strong>, <strong>vodní</strong> a <strong>geotermální</strong>.</p>\n\n\t\t\t\t\t\t<h3>☀️ Skoro všechno je vlastně sluneční energie</h3>\n\t\t\t\t\t\t<p>Když se u každého zdroje zeptáš „a odkud se ta energie vzala?\", dojdeš skoro pokaždé ke stejné odpovědi — ke <strong>Slunci</strong>:</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>vítr</strong> vzniká tím, že Slunce ohřívá vzduch nerovnoměrně,</li>\n\t\t\t\t\t\t<li><strong>vodní</strong> elektrárna žije z koloběhu vody, a ten pohání sluneční teplo, které vodu vypařuje,</li>\n\t\t\t\t\t\t<li><strong>biomasa</strong> je energie zachycená fotosyntézou,</li>\n\t\t\t\t\t\t<li><strong>uhlí a ropa</strong> jsou vlastně totéž — sluneční energie, kterou zachytily rostliny. Stalo se to před stovkami milionů let a od té doby energie ležela pod zemí.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Jen tři zdroje ze Slunce nepocházejí: <strong>jaderná</strong>, <strong>geotermální</strong> a <strong>přílivová</strong> energie. Jaderná energie pochází z jader atomů. Geotermální teplo je z velké části z rozpadu radioaktivních prvků v zemském nitru.</p>\n\t\t\t\t\t\t<p><strong>Přílivová</strong> energie si bere energii z otáčení Země. Měsíc svou gravitací jen „drží\" příliv na místě, planeta se pod ním otáčí. Země se tím opravdu, i když nepatrně, zpomaluje.</p>\n\t\t\t\t\t\t<p>👉 Rozdíl mezi obnovitelným a neobnovitelným zdrojem tedy není v tom, <strong>odkud</strong> energie je. Je v tom, <strong>jak rychle se doplňuje</strong>: uhlí vznikalo desítky milionů let, vítr fouká zítra znovu.</p>\n\n\t\t\t\t\t\t<h3>Přečerpávací elektrárna</h3>\n\t\t\t\t\t\t<p>Sluneční panel nevyrábí v noci a větrník za bezvětří. Naopak v poledne dodá elektrárna víc, než je zrovna potřeba. Elektřina se přitom <strong>ve velkém špatně skladuje</strong> a sítí musí každou vteřinu protékat přesně tolik, kolik se právě spotřebuje.</p>\n\t\t\t\t\t\t<p>Příkladem řešení této potíže v ČR je <strong>Dlouhé stráně</strong> v Jeseníkách — obrovská <strong>baterie z vody</strong>. Ukládá energii: když je v síti přebytek elektřiny (v noci), <strong>přečerpá vodu z dolní nádrže do horní</strong>. V době špičky přes den vodu <strong>vypustí zpět dolů</strong> a roztočí turbínu s generátorem.</p>\n\t\t\t\t\t\t<p>Přečerpáním se část energie ztratí, takže dolů se jí vrátí míň, než kolik stálo čerpání nahoru. Přesto se to vyplatí — <strong>elektřina, která by se jinak vůbec nevyužila, takhle počká</strong> na chvíli, kdy je jí potřeba.</p>\n\n\t\t\t\t\t\t<h3>Zamysli se / Z praxe</h3>\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t<li>Malá vesnice si pořídila jen sluneční elektrárnu jako <strong>jediný</strong> zdroj elektřiny pro celou nemocnici. Proč je to nebezpečný nápad?\n\t\t\t\t\t\t<details><summary>řešení</summary>Sluneční panely v noci nevyrábí vůbec a přes den závisí na počasí — výkon <strong>nejde poručit</strong>. Nemocnice ale potřebuje elektřinu nepřetržitě (přístroje na oddělení JIP, chlazení léků). Musí mít vždy záložní zdroj (např. dieselový agregát nebo připojení do sítě), který doplní výpadek.</details></li>\n\t\t\t\t\t\t<li>Přečerpávací elektrárna čerpá v noci a vyrábí ve dne. Proč se jí to i přes ztráty vyplatí, když by se dalo čekat, že je to „zbytečná práce navíc\"?\n\t\t\t\t\t\t<details><summary>řešení</summary>Elektřinu ve velkém nejde uskladnit jinak (baterie na celé město by byly obrovské a drahé). Noční elektřina z jaderných nebo větrných elektráren by jinak <strong>propadla bez užitku</strong>, protože v noci je nízká spotřeba. I se ztrátou 25 % je lepší část energie zachránit a použít ji přes den ve špičce, než ji nevyužít vůbec.</details></li>\n\t\t\t\t\t\t<li>Je vodík obnovitelný zdroj energie? Zdůvodni.\n\t\t\t\t\t\t<details><summary>řešení</summary>Ano, řadí se mezi obnovitelné zdroje. Na Zemi se ale v čisté podobě skoro nevyskytuje — musí se <strong>vyrobit</strong> (nejčastěji elektrolýzou vody), a to stojí energii. Proto se mu často říká <strong>nosič energie</strong> (jako baterie). Umí energii uchovat a přenést, ne ji sám „zadarmo\" dodat jako slunce nebo vítr.</details></li>\n\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Modelová přečerpávací elektrárna má čerpadla o výkonu <strong>500 MW</strong> a turbíny o výkonu <strong>750 MW</strong>.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>V noci čerpadla běží <strong>8 hodin</strong> → spotřebují 500 MW × 8 h = <strong>4 000 MWh</strong>.</li>\n\t\t\t\t\t\t<li>Přes den turbíny vyrábí <strong>4 hodiny</strong> → vyrobí 750 MW × 4 h = <strong>3 000 MWh</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Zpátky se tedy vrátí jen 3 000 MWh ze 4 000 MWh. Cestou se ztratí 1 000 MWh, tedy 25 % (tření vody v potrubí, teplo na ložiskách čerpadel a turbín). I tak se to vyplatí: bez přečerpávání by se noční přebytek elektřiny nevyužil vůbec.</p>\n\t\t\t\t\t",
					zapis: {"jednotky":["výkon elektrárny — značíme P, jednotka W (watt); v energetice MW (megawatt)","vyrobená nebo spotřebovaná energie — značíme E, jednotka Wh (watthodina); v energetice MWh (megawatthodina); základní jednotka je joule, 1 Wh = 3 600 J","1 MWh = energie při výkonu 1 MW po dobu 1 hodiny"],"body":["obnovitelné: v přírodě neomezené, samy se doplňují","obnovitelné: sluneční záření, vítr, voda, geotermální proudy","obnovitelné: biomasa, bioplyn, vodík","čerpat jen tak rychle, jak se obnoví","neobnovitelné: omezené množství, časem se vyčerpají","fosilní paliva: uhlí, ropa, zemní plyn","vznik: zbytky organismů bez přístupu vzduchu","neobnovitelné: ropné břidlice a písky, jaderné palivo","elektrárny: jaderné, tepelné, sluneční, větrné","elektrárny: vodní, geotermální","jaderná elektrárna: palivo obohacený uran 235","vodík: obnovitelný zdroj, ale nosič energie","vodík se vyrábí elektrolýzou vody","skoro vše je uložená sluneční energie","výjimky: jaderná, geotermální, přílivová energie","sluneční a větrné: výkon nejde poručit","elektřina se ve velkém špatně skladuje","přečerpávací elektrárna: baterie z vody","v noci čerpá vodu do horní nádrže","přes den vypouští vodu, roztáčí turbínu"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Od uhlí ke hvězdám 🎵', cesta: '/materialy/fyzika/9-rocnik/energie-a-vesmir/obnovitelne-a-neobnovitelne-zdroje/pisen-od-uhli-ke-hvezdam.m4a' },
					],
					interakce: 'obnovitelne-zdroje',
					odkazy: [
						{ nazev: 'Obnovitelné zdroje energie (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/2605-obnovitelne-zdroje-energie' },
						{ nazev: 'Přečerpávací elektrárna Dlouhé stráně (ČT edu)', url: 'https://edu.ceskatelevize.cz/video/8796-precerpavaci-elektrarna-dlouhe-strane' },
						{ nazev: 'Výroba elektřiny (Svět energie, ČEZ)', url: 'https://www.svetenergie.cz/cz/elektrina/vyroba-elektriny' },
					],
				},
				{
					slug: 'slunecni-soustava',
					nazev: 'Sluneční soustava',
					interakce: 'soustava',
					obsah: `
						<h2>Sluneční soustava</h2>
						<p>Sluneční soustavu tvoří hvězda <strong>Slunce</strong> v centru a tělesa, která se pohybují v jejím <strong>gravitačním poli</strong> — planety a jejich měsíce, trpasličí planety, planetky, komety a meteoroidy.</p>
						<h3>Slunce</h3>
						<ul>
							<li>Žhavá koule <strong>plazmatu</strong> o průměru asi <strong>1,4 milionu km</strong> (váží jako 330 tisíc Zemí).</li>
							<li>V jádru je teplota <strong>15 milionů °C</strong> a probíhají <strong>termonukleární reakce</strong> (vodík se slučuje na helium) — to je zdroj veškeré energie Slunce.</li>
							<li>Svítí už 4,5 miliardy let a ještě stejně dlouho bude.</li>
						</ul>
						<h3>Osm planet</h3>
						<p>Merkur, Venuše, Země, Mars, Jupiter, Saturn, Uran, Neptun.</p>
						<ul>
							<li><strong>Kamenné planety</strong> (Merkur, Venuše, Země, Mars) — mají <strong>pevný povrch</strong> a málo nebo žádné měsíce.
								<ul>
									<li><strong>Merkur</strong> — nejmenší planeta, vzhledem podobná Měsíci (plná kráterů), nemá žádný měsíc.</li>
									<li><strong>Venuše</strong> — má nejhustší atmosféru ze všech planet (oxid uhličitý), na povrchu je kvůli skleníkovému efektu asi <strong>460 °C</strong>; je téměř stejně velká jako Země, proto se jí říká „sesterská planeta Země"; na obloze ji vidíme jako jitřenku nebo večernici.</li>
									<li><strong>Země</strong> — jediná planeta s podmínkami pro život.</li>
									<li><strong>Mars</strong> — „rudá planeta" (barvu dávají horniny s oxidem železa), má dva malé měsíce <strong>Phobos</strong> a <strong>Deimos</strong> a nejvyšší sopku celé sluneční soustavy <strong>Olympus Mons</strong> (24 km nad okolím). Den na Marsu trvá skoro stejně dlouho jako na Zemi — asi 24 hodin a 40 minut.</li>
								</ul>
							</li>
							<li><strong>Plynné planety</strong> (Jupiter, Saturn, Uran, Neptun) — „plynní obři" bez pevného povrchu, složené hlavně z vodíku a helia, s mnoha měsíci.
								<ul>
									<li><strong>Jupiter</strong> — největší planeta a s více než 95 měsíci jich má i nejvíc; čtyři největší (Io, Europa, Ganymed, Callisto) objevil už v 17. století Galileo Galilei. Na povrchu má obří bouři zvanou <strong>Velká rudá skvrna</strong>.</li>
									<li><strong>Saturn</strong> — výrazné <strong>prstence</strong> z ledu, prachu a kamení; jeho největší měsíc <strong>Titan</strong> je jediný měsíc ve sluneční soustavě s hustou atmosférou.</li>
									<li><strong>Uran</strong> — „ledový obr", modrozelená barva; jako jediná planeta má osu otáčení natočenou „naležato".</li>
									<li><strong>Neptun</strong> — také ledový obr, nejchladnější planeta (asi −220 °C), s extrémně silným prouděním v atmosféře (vítr přes 900 km/h).</li>
								</ul>
							</li>
						</ul>
						<h3>Další tělesa</h3>
						<ul>
							<li><strong>Trpasličí planety</strong> — podobné planetám, ale v jejich blízkosti obíhají další podobná tělesa; např. <strong>Pluto</strong> (dřív počítané mezi planety, obíhá až za Neptunem), <strong>Ceres</strong> (v pásu planetek mezi Marsem a Jupiterem), Eris, Haumea, Makemake.</li>
							<li><strong>Planetky (asteroidy)</strong> — drobná tělesa nepravidelného tvaru, většina v <strong>hlavním pásu mezi Marsem a Jupiterem</strong>; některé mohou křížit dráhu Země.</li>
							<li><strong>Komety</strong> — obíhají po protáhlých elipsách, mají jádro z ledu a prachu a při přiblížení ke Slunci jim vzniká <strong>ohon</strong> (Halleyova kometa se vrací každých 76 let).</li>
							<li><strong>Meteoroid</strong> vzniká rozpadem komety; <strong>meteor</strong> („padající hvězda") je jev, kdy meteoroid v atmosféře shoří; co dopadne na zem, je <strong>meteorit</strong>.</li>
						</ul>
						<h3>Vzdálenosti a pohyb</h3>
						<ul>
							<li><strong>Astronomická jednotka (AU)</strong> = střední vzdálenost Země–Slunce, asi <strong>150 milionů km</strong>.</li>
							<li><strong>Světelný rok (ly)</strong> = vzdálenost, kterou urazí světlo za rok (9,46 bilionu km).</li>
							<li><strong>Parsek (pc)</strong> = další jednotka pro vzdálenosti hvězd; je to vzdálenost, ze které by astronomická jednotka byla vidět pod úhlem jedné úhlové vteřiny.</li>
							<li>Pohyb planet popisují <strong>Keplerovy zákony</strong>: planety obíhají po elipsách a čím blíž jsou Slunci, tím rychleji se pohybují.</li>
						</ul>
					`,
					zapis: {
						body: [
							'Sluneční soustavu tvoří Slunce a tělesa, která se pohybují v jeho gravitačním poli.',
							'Kolem Slunce obíhá osm planet v pořadí Merkur, Venuše, Země, Mars, Jupiter, Saturn, Uran a Neptun.',
							'Merkur, Venuše, Země a Mars jsou kamenné planety; Jupiter, Saturn, Uran a Neptun jsou plynní obři.',
							'Do Sluneční soustavy patří také trpasličí planety, planetky, komety a meteoroidy.',
						],
						zakon: 'Keplerovy zákony: Planety obíhají kolem Slunce po elipsách a čím blíž jsou Slunci, tím rychleji se pohybují.',
					},
				},
				{
					slug: 'vesmir-a-galaxie',
					nazev: 'Vesmír a jeho vznik, galaxie',
					obsah: "\n\t\t\t\t\t\t<h2>Vesmír a jeho vznik</h2>\n\t\t\t\t\t\t<p>Vesmír vznikl před přibližně <strong>13,8 miliardami let</strong> z extrémně hustého a horkého stavu. Této události říkáme <strong>velký třesk</strong>.</p>\n\n\t\t\t\t\t\t<h3>Jak šel vývoj vesmíru za sebou</h3>\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li><strong>Velký třesk</strong> — vesmír vznikl z velmi malého, hustého a horkého bodu</li>\n\t\t\t\t\t\t\t<li><strong>Rychlé rozpínání</strong> — vesmír se okamžitě začal zvětšovat (a rozpíná se dodnes)</li>\n\t\t\t\t\t\t\t<li><strong>Vznik částic</strong> — po krátké chvíli se vytvořily protony a neutrony</li>\n\t\t\t\t\t\t\t<li><strong>Tvorba lehkých prvků</strong> — z částic vznikala jádra nejlehčích prvků, hlavně vodíku a helia</li>\n\t\t\t\t\t\t\t<li><strong>Horké plazma</strong> — vesmír byl dlouho plný směsi nabitých částic a světla</li>\n\t\t\t\t\t\t\t<li><strong>Vznik atomů</strong> — asi po 380 000 letech se elektrony spojily s jádry do neutrálních atomů. Vesmír se tím stal průhledným.</li>\n\t\t\t\t\t\t\t<li><strong>Vznik prvních hvězd</strong> — asi po 400 milionech let se z plynu zažehly první hvězdy</li>\n\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t<h3>Galaxie</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Galaxie</strong> je obrovské seskupení hvězd, plynu, prachu a temné hmoty, které drží pohromadě <strong>gravitace</strong>.</li>\n\t\t\t\t\t\t\t<li>Ve středu mnoha galaxií se nachází obří <strong>černá díra</strong>.</li>\n\t\t\t\t\t\t\t<li>Podle tvaru rozlišujeme galaxie <strong>spirální, eliptické, čočkovité a nepravidelné</strong>.</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Naše galaxie — Mléčná dráha</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>je to <strong>spirální galaxie s příčkou</strong></li>\n\t\t\t\t\t\t\t<li>průměr má zhruba <strong>100 000 světelných let</strong></li>\n\t\t\t\t\t\t\t<li>disk je silný asi <strong>3 000 světelných let</strong></li>\n\t\t\t\t\t\t\t<li>obsahuje řádově <strong>stovky miliard hvězd</strong> (uvádí se kolem 300 miliard)</li>\n\t\t\t\t\t\t\t<li><strong>Slunce</strong> leží v jednom ze spirálních ramen — je to jedna obyčejná hvězda z mnoha</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Jak vidíme Mléčnou dráhu na obloze</h3>\n\t\t\t\t\t\t<p>V noci na tmavém místě vidíme Mléčnou dráhu jako světlý <strong>mléčný pás</strong>. Díváme se přitom na <strong>hlavní rovinu</strong> naší galaxie.</p>\n\n\t\t\t\t\t\t<h3>Vesmír se rozpíná</h3>\n\t\t\t\t\t\t<p>Vzdálené galaxie se od nás vzdalují — jejich světlo je posunuté k červené barvě (<strong>rudý posuv</strong>). Čím je galaxie dál, tím rychleji se vzdaluje (<strong>Hubbleův zákon</strong>). Právě to je hlavní důkaz, že se vesmír stále <strong>rozpíná</strong>. Rozpínání se navíc zrychluje — za to může záhadná <strong>temná energie</strong>.</p>\n\n\t\t\t\t\t\t<h3>Černé díry</h3>\n\t\t\t\t\t\t<p><strong>Černá díra</strong> je objekt s tak silnou gravitací, že z něj neunikne ani světlo. Uprostřed Mléčné dráhy je obří černá díra jménem <strong>Sagittarius A*</strong>. Je hmotná jako miliony Sluncí dohromady. Černé díry pomáhají formovat a ovlivňovat galaxie, ve kterých se nacházejí.</p>\n\n\t\t\t\t\t\t<h3>✏️ Věděl(a) jsi, že...</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>Galaxie se mohou přitahovat a spojovat. Naše Mléčná dráha se řítí vstříc sousední galaxii <strong>Andromeda</strong> a za přibližně <strong>4,5 miliardy let</strong> se s ní srazí. Jednotlivé hvězdy se ale skoro určitě do sebe nenarazí, protože jsou od sebe nesmírně daleko.</li>\n\t\t\t\t\t\t\t<li>Ve viditelném vesmíru je odhadem <strong>200 miliard galaxií</strong> — a v každé z nich mohou být stovky miliard hvězd.</li>\n\t\t\t\t\t\t\t<li>Světlo z nejvzdálenějších galaxií k nám letí miliardy let. Když se na ně díváme, vidíme vesmír takový, jaký vypadal dávno v minulosti.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t",
					zapis: {"zakon":"Hubbleův zákon: čím je galaxie dál, tím rychleji se vzdaluje.","body":["velký třesk: vznik vesmíru","před 13,8 miliardami let","z horkého a hustého stavu","vesmír se od vzniku rozpíná","rozpínání se zrychluje (temná energie)","vznik částic: protony a neutrony","atomy: asi po 380 000 letech","první hvězdy: po 400 milionech let","pak vznikly galaxie","galaxie: hvězdy, plyn, prach","drží je pohromadě gravitace","tvary: spirální, eliptické, čočkovité, nepravidelné","ve vesmíru asi 200 miliard galaxií","černá díra: neunikne ani světlo","Sagittarius A*: černá díra v Galaxii","Mléčná dráha: spirální galaxie s příčkou","průměr asi 100 000 světelných let","disk silný asi 3 000 světelných let","asi 300 miliard hvězd","Slunce leží v jednom rameni","na obloze vidíme jako mléčný pás","rudý posuv: galaxie se vzdalují","Hubbleův zákon: dál → rychleji","budoucí srážka s galaxií Andromeda"]},
					interakce: 'rozpinani-vesmiru',
					odkazy: [
						{ nazev: 'ČT edu: Velký třesk', url: 'https://edu.ceskatelevize.cz/video/2317-velky-tresk' },
						{ nazev: 'ČT edu: Vznik vesmíru (rozšiřující, spíše pro SŠ)', url: 'https://edu.ceskatelevize.cz/video/2319-vznik-vesmiru' },
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co máš umět za 1. pololetí</h2>
						<p>Přehled učiva prvního pololetí 9. ročníku. Dole na stránce si dej <strong>souhrnný kvíz</strong> složený z otázek všech probraných témat.</p>
						<h3>1. <a href="../../magneticke-pole/">Magnetické pole</a></h3>
						<ul><li>magnety (opakování); magnetické pole vodiče s proudem a cívky; elektromagnet a jeho využití</li></ul>
						<h3>2. <a href="../../indukce-a-stridavy-proud/">Elektromagnetická indukce a střídavý proud</a></h3>
						<ul><li>elektromagnetická indukce; vznik střídavého proudu a alternátor; vlastnosti střídavého proudu; elektromotor; transformátor (U₂ : U₁ = N₂ : N₁)</li></ul>
						<h3>3. <a href="../../elektricky-proud-v-latkach/">Elektrický proud v látkách</a></h3>
						<ul><li>vedení proudu v kapalinách (elektrolýza) a plynech; chemické zdroje napětí; polovodiče a dioda; přenos elektrické energie</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>transformátor: U₂ : U₁ = N₂ : N₁</li>
							<li>střídavý proud v síti: 50 Hz, 230 V</li>
						</ul>
					`,
					zapis: {
						body: [
							'Magnetické pole vzniká také kolem vodiče s proudem a cívky; elektromagnet toto pole využívá.',
							'Elektromagnetická indukce umožňuje vznik střídavého proudu v alternátoru a transformátor mění jeho napětí.',
							'Elektrický proud mohou vést kapaliny, plyny a polovodiče; patří sem také chemické zdroje napětí a dioda.',
							'Střídavý proud v elektrické síti má frekvenci 50 Hz a napětí 230 V.',
						],
						vzorec: 'U₂ : U₁ = N₂ : N₁      (odvozeně: U₂ = U₁ · N₂ : N₁,  U₁ = U₂ · N₁ : N₂,  N₂ = N₁ · U₂ : U₁,  N₁ = N₂ · U₁ : U₂)',
						jednotky: [
							'vstupní napětí U₁ — volt (V)',
							'výstupní napětí U₂ — volt (V)',
							'počet závitů vstupní cívky N₁ — bez jednotky',
							'počet závitů výstupní cívky N₂ — bez jednotky',
							'Napětí dosazuj ve stejných jednotkách, obvykle ve voltech; počty závitů jsou celá čísla.',
						],
					},
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co máš umět za celý 9. ročník</h2>
						<p>Přehled učiva celého ročníku. Dole na stránce najdeš <strong>souhrnný kvíz</strong> z otázek všech témat roku.</p>
						<h3>1. <a href="../../magneticke-pole/">Magnetické pole</a></h3>
						<ul><li>magnety, pole vodiče a cívky, elektromagnet</li></ul>
						<h3>2. <a href="../../indukce-a-stridavy-proud/">Elektromagnetická indukce a střídavý proud</a></h3>
						<ul><li>indukce, alternátor, vlastnosti střídavého proudu, elektromotor, transformátor</li></ul>
						<h3>3. <a href="../../elektricky-proud-v-latkach/">Elektrický proud v látkách</a></h3>
						<ul><li>kapaliny, plyny, polovodiče a dioda, chemické zdroje, přenos elektrické energie</li></ul>
						<h3>4. <a href="../../elektricka-energie-a-bezpecnost/">Elektrická energie a bezpečnost</a></h3>
						<ul><li>přeměny elektrické energie; účinky proudu na organismus a bezpečnost</li></ul>
						<h3>5. <a href="../../jaderna-fyzika/">Jaderná fyzika</a></h3>
						<ul><li>jádro atomu (protony, neutrony, izotopy); radioaktivita (α, β, γ, poločas rozpadu); jaderná energie a reakce; reaktor a jaderná elektrárna</li></ul>
						<h3>6. <a href="../../energie-a-vesmir/">Zdroje energie a vesmír</a></h3>
						<ul><li>obnovitelné a neobnovitelné zdroje energie; sluneční soustava (8 planet, AU, světelný rok, Keplerovy zákony)</li></ul>
						<h3>📋 Klíčové vztahy a hodnoty</h3>
						<ul>
							<li>transformátor: U₂ : U₁ = N₂ : N₁</li>
							<li>záření α (helium), β (elektrony), γ (elektromagnetické) — ochrana vzdáleností, stíněním a časem</li>
							<li>1 AU = 150 milionů km; světelný rok = vzdálenost, kterou světlo urazí za rok</li>
							</ul>
							`,
							zapis: {
							body: [
								'Magnetické pole vzniká kolem magnetu, vodiče s proudem i cívky; k tématu patří také elektromagnet.',
								'Elektromagnetická indukce se využívá v alternátoru a transformátor mění elektrické napětí.',
								'Elektrický proud mohou vést kapaliny, plyny i polovodiče; k učivu patří také dioda, chemické zdroje a přenos elektrické energie.',
								'Elektrická energie se přeměňuje na jiné druhy energie a při práci s proudem musíme dodržovat bezpečnost.',
								'Jaderná fyzika popisuje jádro atomu, radioaktivitu a jadernou energii; mezi další témata patří zdroje energie a sluneční soustava.',
							],
							vzorec: 'U₂ : U₁ = N₂ : N₁      (odvozeně: U₂ = U₁ · N₂ : N₁,  U₁ = U₂ · N₁ : N₂,  N₂ = N₁ · U₂ : U₁,  N₁ = N₂ · U₁ : U₂)',
							jednotky: [
								'vstupní napětí U₁ — volt (V)',
								'výstupní napětí U₂ — volt (V)',
								'počet závitů vstupní cívky N₁ — bez jednotky',
								'počet závitů výstupní cívky N₂ — bez jednotky',
								'Napětí dosazuj ve stejných jednotkách, obvykle ve voltech; počty závitů jsou celá čísla.',
							],
							},
							},
			],
		},
	],
	'informatika/7-rocnik': [
		{
			slug: 'programovani-podminky-udalosti',
			nazev: 'Programování — podmínky, postavy a události',
			podtemata: [
				{
					slug: 'opakovani-s-podminkou',
					interakce: 'opakovani',
					nazev: 'Opakování s podmínkou',
					obsah: `
						<h2>Opakuj, dokud…</h2>
						<p>Ve Scratchi už umíme blok <strong>opakuj (10) krát</strong>. Jenže co když dopředu nevíme, kolikrát je potřeba něco zopakovat?</p>
						<p>👉 Na to je blok <strong>opakuj dokud nenastane &lt;podmínka&gt;</strong> — program opakuje příkazy tak dlouho, dokud podmínka není splněna.</p>
						<h3>Podmínka = otázka s odpovědí ANO/NE</h3>
						<ul>
							<li><strong>dotýkáš se okraje?</strong> — postava došla na kraj scény</li>
							<li><strong>dotýkáš se barvy ( )?</strong> — kulička narazila na čáru</li>
							<li><strong>klávesa (mezerník) stisknuta?</strong></li>
						</ul>
						<p>Počítač podmínku vyhodnotí <strong>pokaždé znovu</strong> — proto se program umí sám zastavit ve správnou chvíli.</p>
						<h3>Kdy se ptá?</h3>
						<p>Podmínku vyhodnocuje <strong>před každým průchodem</strong>. Z toho plyne důležitá věc: když je splněná už na začátku, příkazy uvnitř <strong>neproběhnou ani jednou</strong>. Postava, která už na okraji stojí, se tedy nehne — a není to chyba, tak se ten blok chová.</p>
						<h3>Tři opakování a kdy které</h3>
						<ul>
							<li><strong>opakuj (10) krát</strong> — počet znáš dopředu (nakresli čtverec)</li>
							<li><strong>opakuj dokud nenastane ⟨podmínka⟩</strong> — počet neznáš, ale víš, čím to skončí (jeď, dokud nenarazíš)</li>
							<li><strong>opakuj stále</strong> — nemá skončit vůbec (kulisy hry, hlídání kláves)</li>
						</ul>
						<h3>Kde se to hodí?</h3>
						<ul>
							<li>postava jde vpřed, <em>dokud</em> nenarazí na zeď</li>
							<li>hra běží, <em>dokud</em> hráči nedojdou životy</li>
							<li>odpočet běží, <em>dokud</em> čas nedojde na nulu</li>
						</ul>
						<h3>Pozor na nekonečnou smyčku</h3>
						<p>Když podmínka nemůže nikdy nastat, program se opakuje donekonečna. To někdy chceme (kulisy hry), ale jindy je to <strong>chyba</strong>. Poznáš ji podle toho, že program „jede" a nic se neděje — a příčina bývá pořád stejná: <strong>uvnitř smyčky se nemění nic, co by podmínku mohlo splnit</strong>. Když čekáš, až <em>životy = 0</em>, musí uvnitř být blok, který životy ubírá.</p>
						<p>🐭 Vyzkoušej na <a href="https://scratch.mit.edu" target="_blank" rel="noopener">scratch.mit.edu</a> — učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html" target="_blank" rel="noopener">Programování ve Scratchi</a>, kapitola 4.</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Blockly Games — hry s bloky', url: 'https://blockly.games/?lang=cs' },
					],
				},
				{
					slug: 'udalosti-a-vstupy',
					nazev: 'Události a vstupy — myš a klávesnice',
					interakce: 'udalosti',
					obsah: `
						<h2>Program, který poslouchá</h2>
						<p><strong>Událost</strong> je okamžik, na který program čeká a hned na něj zareaguje. Ve Scratchi je poznáš podle <strong>žlutých bloků</strong> ve tvaru klobouku — většina z nich začíná slovem „po" („po kliknutí…", „po stisku klávesy…").</p>
						<h3>Jaké události známe?</h3>
						<ul>
							<li>🖱️ <strong>kliknutí myší</strong> na postavu nebo na zelenou vlajku</li>
							<li>⌨️ <strong>stisk klávesy</strong> — šipky pro pohyb, mezerník pro výstřel</li>
							<li>📩 <strong>přijetí zprávy</strong> od jiné postavy</li>
						</ul>
						<h3>Žluté bloky událostí v české paletě</h3>
						<ul>
							<li><strong>po kliknutí na zelenou vlajku</strong> — start celého programu</li>
							<li><strong>po stisku klávesy (mezerník)</strong> — v nabídce jsou i <em>šipka vlevo</em>, <em>šipka vpravo</em>, <em>libovolná</em></li>
							<li><strong>po kliknutí na mě</strong> — spustí se, když hráč klikne na tuhle postavu</li>
							<li><strong>po obdržení zprávy (…)</strong> — postava reaguje na zprávu od jiné postavy</li>
						</ul>
						<h3>Ovládání postavy klávesnicí</h3>
						<p>Každá šipka má vlastní scénář: <em>po stisku klávesy (šipka vpravo) → změň x o 10</em>. Tak vznikne ovládání jako ve hře.</p>
						<h3>Sledování myši</h3>
						<p>Postava se umí <strong>otáčet za ukazatelem myši</strong> nebo jít na pozici myši — základ pro chytání, míření a kreslení.</p>
						<h3>Scénářů běží víc naráz</h3>
						<p>Každá událost si vede <strong>svůj vlastní scénář</strong> a všechny běží zároveň — jedna postava tak může mít scénář pro každou šipku, další pro kliknutí a další pro zprávu. Z toho plyne i opačná věc: <strong>postava, která nemá žádný scénář začínající událostí, se po spuštění programu vůbec nerozjede.</strong> Nemá totiž co by ji spustilo. (Výjimkou je <em>když startuje můj klon</em> — ten čeká na klon, ne na hráče.)</p>
						<p>💡 Program řízený událostmi nedělá věci „od začátku do konce", ale <strong>reaguje na to, co uděláš</strong> — stejně jako mobil čeká na tvé ťuknutí.</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html" target="_blank" rel="noopener">Programování ve Scratchi</a> (NPI ČR), kapitola 5 — Myš a klávesnice.</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Code.org — kurzy zdarma (i česky)', url: 'https://studio.code.org/courses' },
					],
				},
				{
					slug: 'posilani-zprav',
					nazev: 'Objekty a posílání zpráv',
					obsah: `
						<h2>Postavy si povídají</h2>
						<p>Ve větším programu je víc postav a každá má své scénáře. Jak zařídit, aby spolupracovaly? Pošlou si <strong>zprávu</strong>.</p>
						<h3>Jak to funguje?</h3>
						<ul>
							<li>Jedna postava použije blok <strong>vyšli zprávu</strong> (např. „start závodu")</li>
							<li>Ostatní mají scénář <strong>po obdržení zprávy</strong> — a v tu chvíli se rozběhnou</li>
						</ul>
						<p>👉 Zpráva je jako <strong>startovní výstřel</strong>: kdo ji slyší, začne dělat svou práci. Odesílatel nemusí vědět, kdo všechno poslouchá.</p>
						<h3>K čemu je to dobré?</h3>
						<ul>
							<li>vypravěč dořekne větu → pošle zprávu → objeví se další scéna</li>
							<li>hráč sebere klíč → zpráva „otevři dveře"</li>
							<li>tlačítko START spustí celou hru</li>
						</ul>
						<h3>Vlastní zprávy — kolik jich může být?</h3>
						<p>Zpráv si můžeš vytvořit <strong>libovolně mnoho</strong> a každá má své jméno („start", „konec hry", „otevři dveře"). Novou vyrobíš tak, že v bloku <strong>vyšli zprávu</strong> rozbalíš nabídku a zvolíš <strong>nová zpráva</strong> — pak jí dáš jméno. Ať je srozumitelné: za měsíc už nevíš, co dělala zpráva „zprava2".</p>
						<h3>Dva podobné bloky — pozor na rozdíl</h3>
						<ul>
							<li><strong>vyšli zprávu</strong> — pošle ji a program pokračuje dál, aniž by čekal</li>
							<li><strong>vyšli zprávu a čekej</strong> — pošle ji a <strong>počká</strong>, až všichni příjemci svou reakci dokončí</li>
						</ul>
						<p>👉 Má-li scénka navazovat přesně (vypravěč dořekne větu, teprve pak promluví druhá postava), použij <strong>vyšli zprávu a čekej</strong>. Když má běžet víc věcí najednou, stačí obyčejné <strong>vyšli zprávu</strong>.</p>
						<p>A když stejnou zprávu přijme pět postav, <strong>rozběhnou se všechny naráz</strong> — ne jedna po druhé. To je hlavní síla zpráv.</p>
						<h3>Mini-projekt: interaktivní scénka</h3>
						<p>Vytvoř scénku se dvěma postavami, které se střídají v dialogu pomocí zpráv — přesně tak se programují animované příběhy.</p>
						<p>📗 Učebnice Scratch, kapitola 6 (Posílání zpráv).</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'modelovani-grafy-schemata',
			nazev: 'Modelování pomocí grafů a schémat',
			podtemata: [
				{
					slug: 'modely-a-schemata',
					nazev: 'Modely a schémata kolem nás',
					obsah: `
						<h2>Model = zjednodušený obraz skutečnosti</h2>
						<p>Plánek metra, mapa, rodokmen, schéma zapojení — to všechno jsou <strong>modely</strong>. Vynechávají nepodstatné a nechávají jen to, co potřebujeme k řešení.</p>
						<h3>Proč modely používáme?</h3>
						<ul>
							<li>skutečnost je moc složitá — model ji <strong>zjednoduší</strong></li>
							<li>v modelu rychle najdeme <strong>odpověď na otázku</strong> (kudy jet, kdo je čí bratranec)</li>
							<li>model můžeme <strong>zkontrolovat a opravit</strong> — chybí v něm něco? přebývá?</li>
						</ul>
						<h3>Dobrý model odpovídá na otázku</h3>
						<p>👉 Stejná skutečnost může mít různé modely. Plánek metra neukazuje skutečné vzdálenosti — a přesto je pro cestování nejlepší: cestujícímu stačí <strong>pořadí stanic a kde se přestupuje</strong>, o metry se nestará. Pro stavbaře tunelů by byl přesně proto k ničemu.</p>
						<h3>Co do modelu patří a co ne</h3>
						<p>Rozhoduje <strong>otázka, kterou řešíš</strong>. Rodokmen zachycuje vztahy v rodině — kdo je čí rodič a sourozenec; výška ani oblíbená jídla do něj nepatří, protože k té otázce nic nepřidají. Schéma zapojení obvodu ukazuje, <strong>co je s čím propojené</strong>; skutečnou barvu ani délku vodičů schválně vynechává, jinak by se v něm nikdo nevyznal.</p>
						<p>👉 Když ti v modelu <strong>chybí údaj</strong>, který k řešení potřebuješ, model <strong>doplň</strong> — nevymýšlej si hodnotu a úlohu kvůli tomu nevzdávej. A když v něm něco přebývá, škrtni to: každý zbytečný údaj ztěžuje hledání odpovědi.</p>
						<h3>Vyzkoušej si</h3>
						<p>Nakresli schéma cesty do školy: kroužky = místa, čáry = cesty. Právě jsi vytvořil(a) <strong>graf</strong> — víc v další kapitole!</p>
						<p>🦫 Úlohy s modely najdeš v archivu soutěže <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobřík informatiky</a> — kategorie <strong>Benjamin</strong> pro 6.–7. třídu, <strong>Kadet</strong> pro 8.–9.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Základy informatiky', url: 'https://archiv-imysleni.npi.cz/ucebnice/zaklady-informatiky-pro-zakladni-skoly.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'ohodnocene-grafy',
					nazev: 'Ohodnocené grafy — nejkratší cesta',
					interakce: 'graf-cesta',
					obsah: `
						<h2>Graf: kroužky a čáry</h2>
						<p>V informatice je <strong>graf</strong> obrázek z <strong>vrcholů</strong> (kroužky = města, křižovatky, lidé) a <strong>hran</strong> (čáry = silnice, vztahy, spojení).</p>
						<h3>Ohodnocený graf</h3>
						<p>Když ke každé hraně připíšeme <strong>číslo</strong> (kilometry, minuty, cenu), vznikne <strong>ohodnocený graf</strong>.</p>
						<ul>
							<li><strong>Nejkratší (minimální) cesta</strong> — kudy se dostat z A do B s nejmenším součtem čísel? Přesně tohle počítá navigace v autě!</li>
							<li><strong>Kostra grafu</strong> — které hrany stačí ponechat, aby vše zůstalo propojené co nejlevněji? Tak se plánují rozvody elektřiny nebo internetu.</li>
						</ul>
						<h3>Jak hledat nejkratší cestu?</h3>
						<p>👉 Systematicky: postupuj od startu, u každého vrcholu si zapisuj <strong>nejmenší dosažený součet</strong> a škrtej horší možnosti. Nezkoušej cesty náhodně — přesnost vyhrává nad rychlostí.</p>
						<p>🦫 V testech <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobříka informatiky</a> jsou grafové úlohy každý rok.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Základy informatiky', url: 'https://archiv-imysleni.npi.cz/ucebnice/zaklady-informatiky-pro-zakladni-skoly.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
						{ nazev: 'Blockly Games — hry s bloky', url: 'https://blockly.games/?lang=cs' },
					],
				},
				{
					slug: 'orientovane-grafy-a-automaty',
					nazev: 'Orientované grafy a automaty',
					obsah: `
						<h2>Když má čára šipku</h2>
						<p>Někdy jde spojení jen jedním směrem: jednosměrka, řeka, „kdo koho porazil". Hrany se šipkami tvoří <strong>orientovaný graf</strong>.</p>
						<h3>Automat = graf stavů</h3>
						<p><strong>Automat</strong> v informatice není hrací skříň — je to model, který má <strong>stavy</strong> (kroužky) a <strong>přechody</strong> (šipky s podmínkou):</p>
						<ul>
							<li>turniket: stav <em>zamčeno</em> → (vhozená mince) → stav <em>odemčeno</em></li>
							<li>semafor: červená → červená + žlutá → zelená → žlutá → červená… (žlutému světlu se lidově říká oranžové, ve vyhlášce je <strong>žluté</strong>)</li>
							<li>postava ve hře: stojí → (šipka) → běží → (mezerník) → skáče</li>
						</ul>
						<p>👉 Automat přesně říká, <strong>co se smí stát v jaké situaci</strong> — proto se s ním navrhují programy, hry i pračky.</p>
						<h3>Šipka platí jen jedním směrem</h3>
						<p>To je na orientovaném grafu to hlavní. Když vede šipka z A do B, <strong>neznamená to, že se dá i z B do A</strong> — na to by musela existovat druhá, samostatná šipka. Přesně jako jednosměrka: tudy ano, zpátky ne. V neorientovaném grafu (obyčejná čára bez šipky) se chodí oběma směry.</p>
						<h3>Jak automat nakreslit</h3>
						<ol>
							<li>vypiš <strong>stavy</strong> — v jaké situaci se věc může nacházet (kroužky)</li>
							<li>od každého stavu nakresli <strong>šipky</strong> tam, kam se z něj dá dostat</li>
							<li>na každou šipku napiš <strong>podmínku</strong>, která ten přechod spustí</li>
							<li>označ <strong>počáteční stav</strong> — kde se začíná po zapnutí</li>
						</ol>
						<p>Pračka: <em>praní</em> → <em>máchání</em> → <em>ždímání</em>. O přechodu do dalšího stavu nerozhoduje náhoda, ale <strong>splnění podmínky</strong> — třeba uplynulý čas nebo dosažená teplota. Semafor jede pořád dokola v pevném pořadí: červená → červená + žlutá → zelená → žlutá → červená.</p>
						<p>👉 K čemu to je: když máš vypsané všechny stavy a přechody, hned vidíš, jestli tvůj program <strong>nezapomněl na nějakou situaci</strong>. Právě tak může hra „zamrznout" — dostane se do stavu, ze kterého nevede žádná šipka ven.</p>
						<h3>Souběžné (paralelní) činnosti</h3>
						<p>Model umí zachytit i činnosti běžící <strong>zároveň</strong>: zatímco se vaří těstoviny, krájíme zeleninu. Ve Scratchi běží scénáře postav také souběžně — každá postava si jede ten svůj.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Základy informatiky', url: 'https://archiv-imysleni.npi.cz/ucebnice/zaklady-informatiky-pro-zakladni-skoly.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'programovani-vetveni-promenne',
			nazev: 'Programování — větvení, parametry a proměnné',
			podtemata: [
				{
					slug: 'vetveni-programu',
					interakce: 'vetveni',
					nazev: 'Větvení — když… tak… jinak…',
					obsah: `
						<h2>Program se rozhoduje</h2>
						<p>Blok <strong>když &lt;podmínka&gt; tak … jinak …</strong> rozdělí program na dvě větve. Splněno → první větev, nesplněno → druhá.</p>
						<h3>Příklady rozhodování</h3>
						<ul>
							<li>když se <em>dotýká okraje</em> → otoč se</li>
							<li>když je <em>skóre &gt; 10</em> → bublina „Vyhráls!" <em>jinak</em> hraj dál</li>
							<li>když je <em>stisknuta mezera</em> → vystřel</li>
						</ul>
						<h3>Rozhodování v opakování</h3>
						<p>Nejčastěji je <strong>když</strong> schované uvnitř smyčky <strong>opakuj stále</strong>: program pořád dokola kontroluje, co se děje, a reaguje. Tak funguje každá hra.</p>
						<h3>Skládání podmínek</h3>
						<p>Podmínky jde spojovat do složitějších — ve Scratchi jsou na to zelené bloky:</p>
						<ul>
							<li><strong>a</strong> — platí, jen když platí <em>obě</em> podmínky
								(<em>když ⟨dotýkáš se (čára)?⟩ a ⟨rychlost &gt; 5⟩</em>)</li>
							<li><strong>nebo</strong> — stačí, aby platila <em>aspoň jedna</em>
								(<em>když ⟨dotýkáš se barvy (červená)?⟩ nebo ⟨dotýkáš se barvy (modrá)?⟩</em> → skonči)</li>
							<li><strong>ne</strong> — otočí platnost naruby: <em>ne &lt;dotýkáš se okraje?&gt;</em> je splněné
								právě tehdy, když se postava okraje <em>ne</em>dotýká</li>
						</ul>
						<h3>Když podmínka neplatí</h3>
						<p>Pozor na časté nedorozumění: větev <strong>jinak</strong> se při splněné podmínce
							<strong>vůbec nevykoná</strong> — program projde právě jednu z obou větví, nikdy obě.
							A když blok <strong>jinak</strong> vůbec nemá (samotné <em>když… tak…</em>), tak se při
							nesplněné podmínce prostě nestane nic a program pokračuje dál.</p>
						<h3>Jak si větvení nakreslit</h3>
						<p>Rozhodování se dobře kreslí jako <strong>rozcestí</strong>: kosočtverec s otázkou a dvě
							šipky — <em>ano</em> doleva, <em>ne</em> doprava. Než začneš skládat bloky, zkus si na papír
							nakreslit, co se má stát v každé větvi. U hry to bývá jen pár rozcestí, ale právě ona
							dělají z programu hru.</p>
						<p>📗 Učebnice Scratch, kapitola 7 (Rozhodování).</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Blockly Games — hry s bloky', url: 'https://blockly.games/?lang=cs' },
					],
				},
				{
					slug: 'souradnice-a-kresleni',
					nazev: 'Souřadnice a kreslení',
					interakce: 'souradnice',
					obsah: `
						<h2>Kde přesně postava je?</h2>
						<p>Scéna ve Scratchi je mřížka: <strong>x</strong> (vodorovně, −240 až 240) a <strong>y</strong> (svisle, −180 až 180). Střed je (0, 0).</p>
						<p>Celá scéna je tedy <strong>480 bodů široká</strong> a <strong>360 bodů vysoká</strong>.</p>
						<ul>
							<li><strong>skoč na x: … y: …</strong> — přesun na přesné místo</li>
							<li><strong>změň x o 10</strong> — posun doprava; <strong>změň y o −10</strong> — dolů</li>
						</ul>
						<h3>Kreslení perem</h3>
						<p>Rozšíření <strong>Pero</strong> umí za postavou kreslit čáru. Bloky se jmenují <strong>pero zapni</strong> (od teď postava při pohybu kreslí), <strong>pero vypni</strong> (přestane kreslit — jako když zvedneš tužku) a <strong>smaž</strong> (vygumuje všechno nakreslené).</p>
						<p>Obrazec jde nakreslit <strong>dvěma způsoby</strong>:</p>
						<ul>
							<li><strong>souřadnicemi</strong> — pero zapni a pak <em>změň x o 100</em>, <em>změň y o 100</em>, <em>změň x o −100</em>, <em>změň y o −100</em>. Vznikne čtverec o straně 100 bodů: dvě strany nakreslí změna x (vodorovně), dvě změna y (svisle).</li>
							<li><strong>otáčením</strong> — postava jde pořád dopředu a v každém rohu se otočí: <em>opakuj 4×</em> ( <em>dopředu (100) kroků</em>, <em>otoč se doprava o (90) stupňů</em> ). Tenhle způsob je kratší a hodí se na jakýkoli pravidelný obrazec.</li>
						</ul>
						<p>👉 <strong>Kolik stupňů v rohu?</strong> Postava musí dokola udělat celou otáčku, tedy 360°. U pravidelného obrazce se to rozdělí mezi všechny rohy: <strong>360° : počet stran</strong>. Čtverec 360 : 4 = 90°, šestiúhelník 360 : 6 = 60°, trojúhelník 360 : 3 = 120°.</p>
						<p>S opakováním tak vzniknou krásné <strong>geometrické vzory</strong> — hvězdy, mnohoúhelníky i spirály.</p>
						<h3>Kde se souřadnice používají?</h3>
						<ul>
							<li>mapy a GPS (zeměpisná šířka a délka)</li>
							<li>obrázky v počítači (každý pixel má souřadnice)</li>
							<li>hry — pozice hráčů, střel i překážek</li>
						</ul>
						<p>📗 Učebnice Scratch, kapitola 8 (Souřadnice).</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Blockly Games — hry s bloky', url: 'https://blockly.games/?lang=cs' },
					],
				},
				{
					slug: 'vlastni-bloky-s-parametry',
					nazev: 'Vlastní bloky s parametry',
					interakce: 'vlastni-bloky',
					obsah: `
						<h2>Vyrob si vlastní příkaz</h2>
						<p>Když stejný kus programu potřebuješ víckrát, vytvoř <strong>vlastní blok</strong> — pojmenovaný podprogram. Program se zkrátí a zpřehlední.</p>
						<h3>Parametr = nastavitelná hodnota</h3>
						<p>Blok <strong>nakresli čtverec</strong> je fajn. Blok <strong>nakresli čtverec (velikost)</strong> je lepší — jedním blokem nakreslíš malý i velký čtverec, jen změníš číslo v okénku.</p>
						<ul>
							<li><em>nakresli čtverec (50)</em> → malý čtverec</li>
							<li><em>nakresli čtverec (120)</em> → velký čtverec</li>
						</ul>
						<h3>Jak si blok vyrobíš</h3>
						<p>V paletě <em>Moje bloky</em> je tlačítko <strong>Vytvořit blok</strong>: pojmenuješ ho, volbou <em>Přidat vstup</em> mu přidáš okénko (parametr) a potvrdíš. Ve scénářích se objeví hlavička <strong>scénář pro …</strong> — pod ni vložíš příkazy, které má blok dělat.</p>
						<h3>Opravuješ na jednom místě</h3>
						<p>V tom je hlavní síla vlastních bloků: když opravíš kód <strong>uvnitř</strong> bloku, opraví se to naráz všude, kde se blok používá. Deset kopií téhož kódu bys musel(a) opravovat desetkrát — a na jednu bys zaručeně zapomněl(a).</p>
						<p>Parametrů může mít blok i <strong>několik</strong>, stačí přidat další okénko: <em>nakresli obdélník (šířka) (výška)</em>.</p>
						<h3>Kdy se vlastní blok vyplatí?</h3>
						<p>Když tentýž kus programu potřebuješ <strong>víckrát</strong>. U programu o třech blocích si prací navíc spíš přiděláš.</p>
						<p>👉 Rozdělení programu na vlastní bloky = <strong>rozklad problému na části</strong>. Každou část si vyzkoušíš zvlášť — v jednom obřím scénáři se chyba hledá dlouho. To je jedna z nejdůležitějších dovedností programátora (a hodí se i mimo informatiku).</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html" target="_blank" rel="noopener">Programování ve Scratchi II</a> (NPI ČR), kapitola 9 — Parametry.</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
					],
				},
				{
					slug: 'promenne',
					nazev: 'Proměnné',
					interakce: 'promenne',
					obsah: `
						<h2>Krabička na hodnotu</h2>
						<p><strong>Proměnná</strong> je pojmenovaná krabička v paměti, do které si program ukládá hodnotu — číslo nebo text. Krabička má <strong>jméno</strong> (skóre, životy, rychlost) a <strong>obsah</strong>, který se může měnit.</p>
						<h3>Tři základní operace</h3>
						<ul>
							<li><strong>nastav skóre na 0</strong> — vložení hodnoty</li>
							<li><strong>změň skóre o 1</strong> — úprava hodnoty</li>
							<li><strong>použij hodnotu</strong> — např. <em>když skóre = 10, tak…</em></li>
						</ul>
						<h3>K čemu proměnné slouží?</h3>
						<ul>
							<li>🎮 skóre a životy ve hře</li>
							<li>⏱️ odpočet času</li>
							<li>🔢 zapamatování odpovědi hráče</li>
						</ul>
						<p>👉 Dobré jméno proměnné říká, co je uvnitř. <em>skore</em> je lepší než <em>x</em> — za měsíc budeš vědět, co program dělá.</p>
						<h3>Jak na to ve Scratchi</h3>
							<p>Novou proměnnou vytvoříš v paletě <strong>Proměnné</strong> tlačítkem <strong>„Vytvoř proměnnou"</strong>. Při vytváření volíš, jestli platí <strong>pro všechny postavy</strong> (sdílená, např. skóre), nebo <strong>„Jen pro tuto postavu"</strong> (každá postava má svou). Když <strong>zaškrtneš políčko</strong> vedle jména proměnné v paletě, ukáže se na scéně okénko s její aktuální hodnotou — hodí se na sledování skóre při hraní.</p>
							<p>📗 Učebnice Scratch, kapitola 10 (Proměnné).</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Code.org — kurzy zdarma (i česky)', url: 'https://studio.code.org/courses' },
					],
				},
			],
		},
		{
			slug: 'pocitace',
			nazev: 'Počítače',
			podtemata: [
				{
					slug: 'soubory-slozky-aplikace',
					interakce: 'binarni',
					nazev: 'Soubory, složky a aplikace',
					obsah: `
						<h2>Kam se ukládá naše práce</h2>
						<p><strong>Soubor</strong> = pojmenovaná data na disku (text, obrázek, zvuk, video, program). <strong>Složka</strong> = pořadač, který soubory uspořádává.</p>
						<h3>Přípona prozradí druh</h3>
						<ul>
							<li><strong>.docx .pdf .txt</strong> — texty a dokumenty</li>
							<li><strong>.jpg .png</strong> — obrázky; <strong>.mp3</strong> — zvuk; <strong>.mp4</strong> — video</li>
							<li>operační systém podle přípony pozná, <strong>kterou aplikací</strong> soubor otevřít</li>
						</ul>
						<h3>Uvnitř souboru: samé nuly a jedničky</h3>
						<p>Počítač uvnitř nezná písmenka ani obrázky — zná jen dva stavy, <strong>0</strong> a <strong>1</strong>, jako zhasnutou a rozsvícenou žárovku. Takové jedno číslo (0 nebo 1) se nazývá <strong>bit</strong>. Když bitů dáme dohromady osm, vznikne <strong>bajt</strong> — a osm žárovek, které mohou svítit nebo ne, dokáže zapsat libovolné číslo od <strong>0 do 255</strong>.</p>
						<p>Každý soubor je v počítači jen dlouhá řada bajtů (čísel 0–255) za sebou. Aby počítač věděl, které písmeno která hodnota znamená, používá tabulku <strong>ASCII</strong>: číslo 65 je písmeno „A", číslo 97 je „a" a tak dále. Obrázky a zvuky fungují podobně — jen čísla znamenají barvu bodu nebo výšku tónu místo písmene.</p>
						<h3>Aplikace se instalují — a aktualizují</h3>
						<p><strong>Instalace</strong> = nakopírování programu do počítače (z oficiálního obchodu či webu výrobce!). <strong>Aktualizace</strong> opravují chyby a bezpečnostní díry — neodkládej je. Nepoužívané aplikace <strong>odinstaluj</strong>.</p>
						<h3>Pořádek se vyplatí</h3>
						<p>👉 Promyšlená struktura složek (Škola → Informatika → Projekty) + rozumné názvy souborů = za půl roku najdeš, co hledáš. „bezejmenný_final2_OPRAVDU.docx" ne. 🙂</p>
					`,
					odkazy: [
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
						{ nazev: 'Datová Lhota (ČT :D)', url: 'https://decko.ceskatelevize.cz/datova-lhota' },
					],
				},
				{
					slug: 'site-internet-email',
					interakce: 'pakety',
					nazev: 'Síť doma i ve škole, internet a e-mail',
					obsah: `
						<h2>Počítače propojené dohromady</h2>
						<p><strong>Počítačová síť</strong> = zařízení, která si vyměňují data. Doma: router (Wi-Fi) spojuje mobily, počítače i televizi a připojuje je k internetu. Ve škole: učebny propojené kabely přes společné prvky.</p>
						<h3>Internet — síť sítí</h3>
						<ul>
							<li>zpráva se rozdělí na <strong>balíčky (pakety)</strong>, které putují sítí samostatně</li>
							<li>každé zařízení má <strong>adresu</strong>, aby balíčky trefily cíl</li>
							<li>u cíle se balíčky zase složí dohromady</li>
						</ul>
						<h3>Jak putuje e-mail?</h3>
						<p>Napíšeš zprávu → tvůj poštovní server ji předá <strong>serveru adresáta</strong> → tam čeká, dokud si ji adresát nestáhne. Je to jako pošta: schránka, třídírna, doručení. 📬</p>
						<p>👉 Vyzkoušej nakreslit <strong>model své domácí sítě</strong>: co všechno je u vás připojené k routeru?</p>
						<p>📺 Pěkně to vysvětluje seriál <a href="https://decko.ceskatelevize.cz/datova-lhota" target="_blank" rel="noopener">Datová Lhota</a> (ČT :D).</p>
					`,
					odkazy: [
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
						{ nazev: 'Datová Lhota (ČT :D)', url: 'https://decko.ceskatelevize.cz/datova-lhota' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'zabezpeceni-a-digitalni-stopa',
					nazev: 'Zabezpečení, práva a digitální stopa',
					obsah: `
						<h2>Chraň svůj účet</h2>
						<ul>
							<li><strong>Silné heslo</strong> — dlouhé, nejde uhodnout, pro každou službu jiné</li>
							<li><strong>Dvoufázové ověření</strong> — heslo + kód z mobilu; i ukradené heslo pak zloději nestačí</li>
							<li>heslo <strong>nikomu nesděluj</strong> — ani „kamarádovi", ani „správci z e-mailu"</li>
						</ul>
						<h3>Proč je „Bobík2011" špatné heslo</h3>
						<p>Jméno mazlíčka, přezdívka, oblíbený klub nebo datum narození jsou <strong>veřejně dohledatelné</strong> — obvykle stačí projít tvůj vlastní profil. Útočník je nezkouší ručně, ale programem, který jich vyzkouší tisíce za vteřinu. Dlouhé heslo je proto silnější než krátké „chytré": vymysli si <strong>tři slova, která spolu nesouvisejí</strong> — ale vlastní, ne ta z učebnice nebo z webu. Takové heslo se hádá o hodně hůř a přitom si ho zapamatuješ.</p>
						<h3>Přístupová práva</h3>
						<p>U sdílených souborů se nastavuje, kdo smí co: <strong>číst</strong> → <strong>komentovat</strong> → <strong>měnit obsah</strong> → <strong>měnit práva</strong>. Sdílej vždy jen to nejnutnější — právo <em>číst</em> stačí tomu, kdo si má práci jen prohlédnout, a nikdo ti pak obsah omylem nepřepíše ani nesmaže. Pozor i na to, <strong>komu</strong> sdílíš: „kdokoli s odkazem" znamená opravdu kdokoli, komu se odkaz dostane do ruky, kdežto sdílení konkrétním lidem se dá kdykoli odebrat.</p>
						<h3>Digitální stopa</h3>
						<p>👉 Všechno, co na internetu uděláš, někde <strong>zanechá záznam</strong>: fotky, komentáře, lajky, poloha mobilu. Stopa se <strong>nedá spolehlivě smazat</strong> — než něco pošleš, rozmysli si, jestli to může vidět kdokoli a navždy.</p>
					`,
					odkazy: [
						{ nazev: 'E-Bezpečí', url: 'https://www.e-bezpeci.cz' },
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.cz' },
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
					],
				},
			],
		},
		{
			slug: 'hry-ve-scratchi',
			nazev: 'Hry ve Scratchi — návody',
			podtemata: [
				{
					slug: 'hra-chytej-jablka',
					nazev: 'Hra 1: Chytej jablka',
					// recyklace hotové simulace (1. 8. 2026): hra stojí na proměnné skóre a její
					// typická chyba je chybějící „nastav skóre na 0" — přesně to PromenneSimulace ukazuje
					interakce: 'promenne',
					obsah: `
						<h2>🍎 Chytej jablka</h2>
						<p>Košík dole chytá padající jablka. Naše první opravdová hra — stačí 2 postavy a proměnná!</p>
						<h3>Připrav si</h3>
						<ul>
						<li>postava <strong>Košík</strong> (miska, klobouk…) dole na scéně</li>
						<li>postava <strong>Jablko</strong></li>
						<li>proměnná <strong>skóre</strong></li>
						</ul>
						<h3>Scénář Košíku</h3>
						<ol>
						<li>po kliknutí na vlajku → opakuj stále:</li>
						<li>když je stisknuta šipka doprava → změň x o 10</li>
						<li>když je stisknuta šipka doleva → změň x o −10</li>
						</ol>
						<h3>Scénář Jablka</h3>
						<ol>
						<li>po kliknutí na vlajku → nastav skóre na 0</li>
						<li>skoč na náhodné x, y = 170 (nahoru)</li>
						<li>opakuj stále: změň y o −5 (padá)</li>
						<li>když ⟨dotýkáš se (Košík)?⟩ → změň skóre o 1, zahraj zvuk, skoč zpět nahoru na náhodné x</li>
						<li>když y &lt; −170 (spadlo na zem) → skoč zpět nahoru na náhodné x</li>
						</ol>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>jablko padá rychleji s rostoucím skóre (změň y o −(5 + skóre/10))</li>
						<li>přidej <strong>shnilé jablko</strong> — když ho chytíš, skóre −2</li>
						<li>hra na čas: proměnná čas, po 60 sekundách konec</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
					],
				},
				{
					slug: 'hra-bludiste',
					nazev: 'Hra 2: Bludiště',
					interakce: 'bludiste',
					obsah: `
						<h2>🌀 Bludiště</h2>
						<p>Projdi bludištěm k cíli — a nesmíš se dotknout zdi!</p>
						<h3>Připrav si</h3>
						<ul>
						<li><strong>pozadí</strong>: nakresli bludiště — chodby bílé, zdi jednou barvou (např. černou)</li>
						<li>malá postava <strong>Hráč</strong> (zmenši na 30–50 %)</li>
						<li>postava <strong>Cíl</strong> (dveře, poklad…)</li>
						</ul>
						<h3>Scénář Hráče — pohyb (a hned kontrola zdi)</h3>
						<p>Čtyři stejně stavěné scénáře, pro každou šipku jeden. Pohyb a kontrola patří
						<strong>k sobě</strong> — proto je návrat hned pod pohybem:</p>
						<ol>
						<li>po stisku klávesy (šipka nahoru) → změň y o 5; když ⟨dotýkáš se barvy (černá)?⟩ → změň y o −5</li>
						<li>po stisku klávesy (šipka dolů) → změň y o −5; když ⟨dotýkáš se barvy (černá)?⟩ → změň y o 5</li>
						<li>po stisku klávesy (šipka vlevo) → změň x o −5; když ⟨dotýkáš se barvy (černá)?⟩ → změň x o 5</li>
						<li>po stisku klávesy (šipka vpravo) → změň x o 5; když ⟨dotýkáš se barvy (černá)?⟩ → změň x o −5</li>
						</ol>
						<h3>Scénář Hráče — start a cíl</h3>
						<ol>
						<li>po kliknutí na vlajku → skoč na x: ( ) y: ( ) (na start), opakuj stále:</li>
						<li>když ⟨dotýkáš se (Cíl)?⟩ → bublina „Vyhráls!", zastav (všechno)</li>
						</ol>
						<p>👉 <strong>Přísnější verze:</strong> místo návratu o krok zpět dej za dotyk zdi
						⟨skoč na x: ( ) y: ( )⟩ na start. Jedno škrtnutí o zeď a jde se od začátku!</p>
						<h3>Co se tu vlastně učíš</h3>
						<p>Bludiště v počítači <strong>není bludiště</strong>. Žádná zeď v programu neexistuje — je to jen
						obrázek pozadí. Postava proto do zdi normálně vjede a program teprve <em>potom</em> zjistí,
						že pod ní svítí černá barva, a vrátí ji zpátky. Této dvojici kroků
						(<strong>proveď pohyb → zkontroluj → ukliď</strong>) se říká <strong>detekce a řešení kolize</strong>
						a stojí na ní úplně každá hra, i ta na mobilu.</p>
						<p>Zeď se pozná <strong>podle barvy</strong> blokem ⟨dotýkáš se barvy ( )?⟩ — barvu do něj naber
						<strong>kapátkem</strong> přímo z bludiště, ne od oka z palety. Stačí odstín o chlup jiný a blok
						mlčí, i když zeď vypadá stejně. Proto ta rada kreslit zdi <strong>jedinou</strong> barvou.</p>
						<h3>⚠️ Tři chyby, které dělá skoro každý</h3>
						<ul>
						<li><strong>Postava projede zdí.</strong> Blok se ptá až na to, kde postava skončila — když krok
						přeskočí celou zeď (a postava je taky široká, takže musí přesáhnout zeď i o její velikost),
						program nic nepozná. Buď krok zmenši, nebo zdi zesil.</li>
						<li><strong>Kontrola je daleko od pohybu.</strong> Nejčastější chyba téhle hry: pohyb je ve čtyřech
						scénářích u šipek, ale návrat po nárazu si někdo dá zvlášť do ⟨opakuj stále⟩. Tam ale program
						<em>vůbec neví, kudy postava šla</em> — a nemá jak ji vrátit správným směrem. Proto patří
						návrat vždy hned pod ten pohyb, který ho způsobil.</li>
						<li><strong>Návrat opačným směrem, než byl pohyb.</strong> Když se postava po každém dotyku vrací
						pořád stejně (třeba vždy dolů), zasekne se ve zdi. Ke „změň y o 5" patří návrat „změň y o −5",
						ne jiný.</li>
						</ul>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>přidej <strong>stopky</strong> (proměnná čas) — kdo projde nejrychleji?</li>
						<li>více úrovní: po dosažení cíle nedávej ⟨zastav (všechno)⟩, ale přepni na další pozadí
						s těžším bludištěm a pošli hráče zpátky na start — po „zastav (všechno)" by se už nic nepřepnulo</li>
						<li>přidej hlídače, který se pohybuje po chodbě blokem ⟨klouzej ( ) sekund na x: ( ) y: ( )⟩ — dotyk = návrat na start</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
					],
				},
				{
					slug: 'hra-honicka',
					nazev: 'Hra 3: Honička',
					interakce: 'honicka',
					obsah: `
						<h2>🐱 Honička</h2>
						<p>Kočka honí myš, kterou ovládáš ty. Jak dlouho jí utečeš?</p>
						<h3>Připrav si</h3>
						<ul>
						<li>postava <strong>Myš</strong> (ovládá hráč)</li>
						<li>postava <strong>Kočka</strong></li>
						<li>proměnná <strong>čas</strong></li>
						</ul>
						<h3>Scénář Myši</h3>
						<ol>
						<li>po kliknutí na vlajku → opakuj stále: skoč na (ukazatel myši) — postava běhá za tvou myší</li>
						</ol>
						<h3>Scénář Kočky</h3>
						<ol>
						<li>po kliknutí na vlajku → nastav čas na 0, skoč na x: (-200) y: (-150) — tedy do rohu</li>
						<li>opakuj stále — a <strong>všechno ostatní patří dovnitř tohoto bloku</strong>:
							<ul>
							<li>nastav směr k (Myš), dopředu o (3) kroků</li>
							<li>změň čas o (1), čekej (0.1) sekund</li>
							<li>když ⟨dotýkáš se (Myš)?⟩ tak → bublina (spoj „Mám tě! Vydržel(a) jsi " (čas / 10)), zastav (všechno)</li>
							</ul>
						</li>
						</ol>
						<h3>Proč zrovna takhle</h3>
						<ul>
						<li>Kočka skočí <strong>do rohu</strong> scény, aby měl hráč na začátku náskok</li>
						<li><strong>3 kroky</strong> v jednom opakování: větší krok by Kočku posouval trhaně a hra by byla nehratelná</li>
						<li>proměnná <strong>čas</strong> počítá <strong>desetiny</strong> sekundy: přičteš celou <strong>1</strong> a čekáš 0.1 sekundy, na konci vydělíš deseti. Kdybys rovnou přičítal(a) 0.1, vyšlo by po třech sekundách <em>3.0000000000000013</em> — počítač desetinná čísla sčítá nepřesně.</li>
						<li>ve Scratchi se do okének píše desetinná <strong>tečka</strong>, ne čárka</li>
						</ul>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>kočka postupně <strong>zrychluje</strong>: dopředu o (3 + čas / 100) — čas počítá desetiny, takže už po půl minutě hry je krok dvojnásobný (6) a po minutě trojnásobný (9)</li>
						<li>přidej druhou kočku z jiného rohu</li>
						<li>na scéně se objevuje sýr — sebrání přidá body</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch (zdarma)', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-pro-2-stupen-zakladni-skoly.html' },
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co umíme po 1. pololetí</h2>
						<ul>
							<li><strong>Programování ve Scratchi:</strong> opakování s podmínkou, události (myš, klávesnice), posílání zpráv mezi postavami</li>
							<li><strong>Modelování:</strong> modely a schémata, ohodnocené grafy (nejkratší cesta, kostra), orientované grafy a automaty, souběžné činnosti</li>
						</ul>
						<p>👉 Souhrnný kvíz níže se skládá automaticky z otázek probraných podtémat.</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co umíme po 7. ročníku</h2>
						<ul>
							<li><strong>Programování:</strong> podmínky, události, zprávy, větvení, souřadnice, vlastní bloky s parametry, proměnné</li>
							<li><strong>Modelování:</strong> schémata, grafy, automaty</li>
							<li><strong>Počítače:</strong> soubory a aplikace, sítě a internet, e-mail, zabezpečení a digitální stopa</li>
						</ul>
						<p>👉 Souhrnný kvíz níže prověří celý ročník. Trénovat můžeš i v archivu <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobříka informatiky</a> (Benjamin).</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
	],
	'informatika/8-rocnik': [
		{
			slug: 'roboticka-stavebnice',
			nazev: 'Programování robotické stavebnice',
			podtemata: [
				{
					slug: 'sestaveni-a-oziveni-robota',
					nazev: 'Sestavení a oživení robota',
					interakce: 'sestaveni-robota',
					obsah: `
						<h2>Ze stavebnice živý robot</h2>
						<p>🏫 <em>U nás ve škole používáme stavebnici <strong>VEX IQ</strong> — konkrétní návody najdeš v celku „Robotika VEX IQ". Principy na této stránce platí pro každou stavebnici.</em></p>
						<p>Robot ze stavebnice má tři části: <strong>kostku s počítačem</strong> (mozek), <strong>motory</strong> (svaly) a <strong>senzory</strong> (smysly). My mu dodáme <strong>program</strong> — myšlenky.</p>
						<h3>Postup oživení</h3>
						<ol>
							<li>sestav robota podle návodu (nebo vlastní konstrukci)</li>
							<li>připoj motory a senzory do správných portů</li>
							<li>v programovacím prostředí sestav z bloků program</li>
							<li>nahraj program do kostky a spusť</li>
						</ol>
						<p>👉 Robot udělá <strong>přesně to, co mu program říká</strong> — ne to, co sis přál(a). Když jede jinam, chyba je v programu (nebo v zapojení), a to je dobrá zpráva: dá se najít a opravit.</p>
						<h3>Než ho pustíš na zem</h3>
						<ol>
							<li>zkontroluj <strong>zapojení</strong> — každý motor a senzor ve svém portu, konektory dotlačené</li>
							<li>zkus rukou, jestli jsou <strong>spoje pevné</strong> a kola se točí volně</li>
							<li>nabitá baterie a robot na <strong>volné ploše</strong>, ne na kraji stolu</li>
						</ol>
						<p>👉 Robot couvá, i když má jet dopředu? Program bývá v pořádku — obvykle jsou <strong>motory zapojené obráceně</strong> nebo prohozený levý a pravý. Zkontroluj porty dřív, než začneš přepisovat program.</p>
						<p>👉 Program se vykonává <strong>shora dolů</strong>, jeden příkaz po druhém. Když prohodíš pořadí dvou bloků, robot udělá jiný pohyb — pořadí je součást zadání, ne detail.</p>
						<h3>První jízda</h3>
						<p>Rozjeď oba motory na 2 sekundy vpřed, pak zastav. Přidej otočku — robot zatáčí tím, že se <strong>každý motor točí jinak</strong>: při různých rychlostech opíše oblouk, při jednom vpřed a druhém vzad se otočí na místě. Hotovo, robot poslouchá!</p>
						<p>👉 První program má být <strong>jednoduchý a hned vyzkoušený</strong> — dvě sekundy dopředu stačí. Pak přidávej <strong>po malých krocích</strong> a po každém přidání robota pusť. Když se něco pokazí, víš přesně který kousek za to může; ve dvaceti blocích přidaných najednou bys chybu hledal(a) dlouho.</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html" target="_blank" rel="noopener">Robotika s LEGO Mindstorms</a>, kap. 1–2.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice LEGO robotika', url: 'https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html' },
					],
				},
				{
					slug: 'motory-displej-zvuk',
					nazev: 'Jízda, displej a zvuk',
					interakce: 'motory-displej-zvuk',
					obsah: `
						<h2>Výstupy robota</h2>
						<p><strong>Výstupní zařízení</strong> = vše, čím robot působí na okolí: motory, displej, reproduktor, světla.</p>
						<p>Je to přesný opak <strong>vstupů</strong> — čidel a tlačítek, kterými robot okolí <em>vnímá</em>.
						Mezi vstupy a výstupy sedí program a rozhoduje: <em>vidím překážku</em> (vstup) →
						<em>zastav a pípni</em> (výstup). Úplně stejně je stavěný počítač i tvůj mobil:
						vstup → zpracování → výstup.</p>
						<h3>Přesná jízda</h3>
						<ul>
							<li>jízda <strong>na čas</strong> (2 s vpřed) × jízda <strong>na otáčky</strong> (přesnější — 1 otáčka kola = přesná vzdálenost)</li>
							<li>👉 proč je čas nespolehlivý: vybitá baterie robota zpomalí, takže za stejné 2 s ujede kratší dráhu; po koberci ho brzdí i větší tření. Otáčky měří, kolik se kolo <strong>opravdu otočilo</strong>, takže si s vybitou baterií i s odporem podložky poradí. Pozor ale: když kolo <strong>prokluzuje</strong> (točí se na místě), ošidí i otáčky — otáčka je pak sice stejná, ale robot se pod ní neposune.</li>
							<li>zatáčení: každý motor jinak rychle — rozdíl rychlostí stáčí robota do oblouku, jeden motor vpřed a druhý vzad ho otočí na místě</li>
							<li><strong>opakování</strong>: čtverec = 4× (rovně + otočka o 90°, protože 360° děleno 4 stranami je 90° na roh)</li>
						</ul>
						<h3>Displej a zvuk</h3>
						<p>Robot umí na displeji ukázat obrázek či text a přehrát zvuk — skvělé pro hlášení stavu: „našel jsem čáru!", smajlík při cíli, houkání při couvání. 🤖</p>
						<p>👉 Vyzkoušej: robot objede čtverec a v každém rohu pípne. Blok zvuku musí být <strong>uvnitř opakování</strong> — jen tam proběhne 4×. Před opakováním by pípl jednou na začátku, za ním jednou na konci.</p>
						<h3>Displej je okno do hlavy robota</h3>
						<p>Displej má ještě jedno použití, kvůli kterému ho profesionálové milují: <strong>hledání chyb</strong>.
						Robot se ti nepokazí nahlas — prostě jede jinam, než chceš, a mlčí o tom. Nech si na displej
						vypisovat <strong>hodnotu čidla</strong> a rázem vidíš, co robot doopravdy vnímá.</p>
						<p>Typický příběh z hodiny: robot má zastavit 20 cm před zdí, ale nabourá. Program vypadá
						správně. Na displeji se ale ukáže, že čidlo hlásí pořád stejné velké číslo — a je jasné,
						že problém není v programu, ale v čidle: kouká někam vedle, nebo je ve špatném portu.
						<strong>Bez displeje bys přepisoval(a) program, který je celou dobu v pořádku.</strong></p>
						<p>👉 Zvuk se hodí na totéž, jen „naslepo": robot pípne pokaždé, když projde určitým místem
						programu. Když nepípne, víš, že se tam vůbec nedostal — třeba proto, že podmínka nikdy
						nebyla splněná. Robot ti tím ukáže, kudy program běžel, i když ho máš na zemi přes půl třídy.</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html" target="_blank" rel="noopener">Robotika s LEGO Mindstorms</a> (NPI ČR), kap. 3–6.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice LEGO robotika', url: 'https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html' },
					],
				},
				{
					slug: 'senzory-robota',
					nazev: 'Senzory — robot vnímá svět',
					interakce: 'senzory-robota',
					obsah: `
						<h2>Smysly robota</h2>
						<ul>
							<li>👆 <strong>dotykový senzor</strong> — narazil jsem? (tlačítko)</li>
							<li>📏 <strong>ultrazvukový senzor</strong> — jak daleko je překážka? Vyšle krátký zvuk a měří, za jak dlouho se vrátí ozvěna (jako netopýr).</li>
							<li>🎨 <strong>senzor barvy/světla</strong> — jakou barvu vidím? kolik světla se odráží?</li>
						</ul>
						<h3>Senzor + rozhodování = chytrý robot</h3>
						<p>Hodnotu senzoru čte program v podmínce:</p>
						<ul>
							<li><em>opakuj, dokud je vzdálenost větší než 10 cm: jeď vpřed</em> → robot zastaví před zdí</li>
							<li><em>když vidí černou → toč doleva, jinak → toč doprava</em> → robot sleduje čáru!</li>
						</ul>
						<p>👉 <strong>Jízda po čáře</strong> je královská úloha: robot se podél okraje čáry „vlní" — pořád dokola měří a opravuje směr. Když sjede na bílou plochu, senzor to hlásí a program ho stočí zpátky k čáře. Podobně pracuje asistent pro jízdu v pruhu v autě — jen se místo senzoru barvy dívá kamerou na čáry na silnici.</p>
						<h3>Když senzor „lže"</h3>
						<p>Ultrazvuk měří jen tam, kam <strong>míří</strong>. Od šikmé stěny se ozvěna odrazí jinam a měkká látka (záclona, deka) zvuk pohltí — v obou případech se nic nevrátí a senzor hlásí velkou vzdálenost, i když je zeď kousek před robotem. Dotykový senzor je naopak spolehlivý, ale pozná překážku až <strong>po nárazu</strong> — proto se oba často kombinují.</p>
						<p>👉 Proč je v programu opakování s podmínkou, a ne jediný příkaz <em>jeď</em>? Bez opakování by robot změřil vzdálenost jen jednou na začátku a pak by jel naslepo. Měřit se musí <strong>průběžně</strong>, jinak nemá podmínka co hlídat.</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html" target="_blank" rel="noopener">Robotika s LEGO Mindstorms</a> (NPI ČR), kap. 7–9.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice LEGO robotika', url: 'https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'projekt-muj-robot',
					nazev: 'Projekt Můj robot',
					interakce: 'projekt-robot',
					obsah: `
						<h2>Vyřeš problém robotem</h2>
						<p>Závěr robotiky: navrhni, sestav a naprogramuj robota, který <strong>splní úkol</strong>. Třeba:</p>
						<ul>
							<li>projede bludiště a nenarazí</li>
							<li>najde a odtlačí předmět z kruhu</li>
							<li>zaparkuje do garáže podle barevné značky</li>
							<li>hlídá okraj stolu a nikdy z něj nespadne</li>
						</ul>
						<h3>Jak na projekt?</h3>
						<ol>
							<li><strong>rozděl problém na části</strong> (jízda, hledání, reakce na senzor) — tohle je vždycky první krok, dřív než sáhneš na kostky</li>
							<li>každou část vyřeš a <strong>otestuj zvlášť</strong> — v malém kousku programu chybu najdeš snadno, ve velkém celku skoro ne</li>
							<li>hotové části <strong>spoj dohromady a testuj celek</strong> — často se teprve tady ukáže, že si dvě části navzájem překážejí</li>
							<li><strong>laď</strong> — napoprvé to nejede nikomu 🙂 Ladění není selhání, je to běžná součást práce: oprav, vyzkoušej, dolaď.</li>
							<li>udělej <strong>zkoušku nanečisto</strong>, teprve pak předveď a vysvětli, <strong>jak program funguje</strong></li>
						</ol>
						<h3>Který senzor na který úkol?</h3>
						<ul>
							<li>🎨 <strong>senzor barvy</strong> — zaparkovat podle barevné značky, jet po čáře</li>
							<li>📏 <strong>ultrazvukový senzor</strong> — bludiště: hlásí překážku před robotem, program ho včas otočí jiným směrem</li>
							<li>👆 <strong>dotykový senzor</strong> — poznat náraz do stěny</li>
							<li>💡 <strong>senzor barvy v režimu odraženého světla</strong> — nad okrajem stolu se skoro nic neodrazí, robot pozná, že pod ním chybí deska, a zastaví</li>
						</ul>
						<p>👉 Hodnotí se nejen výsledek, ale hlavně <strong>postup řešení</strong>: rozklad na části, testování, opravy chyb. Při předvádění vysvětli, jak program funguje — tím ukážeš, že mu opravdu rozumíš.</p>
						<p>👉 Zkouška nanečisto odhalí, co se zasekne. Před třídou už na opravu nebývá čas.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice LEGO robotika', url: 'https://archiv-imysleni.npi.cz/ucebnice/robotika-na-2-stupni-zakladni-skoly-s-lego-mindstorms.html' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'microbit',
			nazev: 'Programování micro:bitu',
			podtemata: [
				{
					slug: 'oziveni-a-led-displej',
					nazev: 'Oživení desky a LED displej',
					interakce: 'led-displej',
					obsah: `
						<h2>Počítač do dlaně</h2>
						<p><strong>micro:bit</strong> je malá programovatelná deska: displej 5×5 LED (dohromady <strong>25 světýlek</strong>), dvě tlačítka, senzory pohybu a teploty, rádio. Programuje se z bloků v prostředí <a href="https://makecode.microbit.org" target="_blank" rel="noopener">MakeCode</a> — funguje i <strong>simulátor</strong> přímo v prohlížeči, deska není nutná.</p>
						<h3>První program</h3>
						<ol>
							<li>blok <strong>po spuštění</strong> → ukaž ikonu ❤️</li>
							<li>blok <strong>opakuj stále</strong> → střídej dva obrázky = animace</li>
							<li>stáhni program do desky (nebo sleduj simulátor)</li>
						</ol>
						<p>👉 Mezi obrázky patří blok <strong>čekej 400 ms</strong> — nechá obrázek chvíli svítit. Bez pauzy by se obrázky střídaly tak rychle, že by splynuly v jeden.</p>
						<p>👉 Pozor na rozdíl: <strong>po spuštění</strong> proběhne <em>jedenkrát</em> a skončí, kdežto <strong>opakuj stále</strong> jede pořád dokola. Animace proto patří do „opakuj stále" — a musí se v ní střídat <strong>dva různé</strong> obrázky, jinak se na displeji nic nezmění.</p>
						<h3>Co umí displej?</h3>
						<ul>
							<li>ikony a vlastní obrázky (rozsvěcení jednotlivých LED)</li>
							<li>posouvající se text — jmenovka, vzkaz</li>
							<li>čísla — teplota, skóre, odpočet</li>
						</ul>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html" target="_blank" rel="noopener">Programujeme micro:bit pomocí MakeCode</a>, kap. 1.</p>
					`,
					odkazy: [
						{ nazev: 'MakeCode — simulátor micro:bitu', url: 'https://makecode.microbit.org' },
						{ nazev: 'učebnice micro:bit', url: 'https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html' },
						{ nazev: 'microbit.org — nápady na projekty', url: 'https://microbit.org/cs/projects/' },
					],
				},
				{
					slug: 'tlacitka-naklon-zvuk',
					nazev: 'Tlačítka, náklon a zvuk',
					interakce: 'microbit-vstupy',
					obsah: `
						<h2>Deska reaguje</h2>
						<p><strong>Vstup</strong> je to, čím deska vnímá okolí (tlačítka, senzory), <strong>výstup</strong> to, čím na okolí působí (displej, zvuk). U hudebního nástroje je vstupem náklon a výstupem tón — u každého programu se vyplatí vědět, co je co.</p>
						<h3>Vstupy</h3>
						<ul>
							<li><strong>tlačítka A a B</strong> — <em>po stisku A</em> → udělej… Kromě A a B nabízí MakeCode i volbu <strong>A+B</strong>, takže deska pozná i stisk obou tlačítek najednou.</li>
							<li><strong>akcelerometr</strong> — pozná zatřesení, naklonění, otočení logem dolů i volný pád. Měří pohyb, takže barvu předmětu ani lidský hlas z něj nevyčteš.</li>
							<li>👉 události jako ve Scratchi: program čeká na událost a reaguje</li>
						</ul>
						<h3>Jak událost funguje</h3>
						<p>Bloky uvnitř události se nespustí hned. Program u nich <strong>čeká</strong> a rozběhne je, teprve až událost nastane — nic mezitím nemaže ani nevypíná. Deska přitom sleduje všechny své události zároveň, takže může mít vlastní blok pro tlačítko A, další pro zatřesení a další pro náklon.</p>
						<h3>Zvuk a hudba</h3>
						<p>Zvuk umí micro:bit přehrávat jako tóny a melodie — jde z něj naprogramovat <strong>hudební nástroj</strong>: náklonem měníš výšku tónu, tlačítkem hraješ. 🎵 Starší deska (V1) k tomu potřebuje připojená <strong>sluchátka nebo bzučák</strong>, novější <strong>V2</strong> má malý reproduktor přímo na sobě.</p>
						<h3>V1, nebo V2? Poznáš to na první pohled</h3>
						<p>Ve škole potkáš obě generace a <strong>program je pro obě stejný</strong> — jen zvuk se chová jinak. Novější <strong>V2</strong> poznáš podle tří novinek: vzadu je <strong>reproduktor</strong> a <strong>mikrofon</strong> (vpředu svítí kontrolka, když deska poslouchá) a <strong>zlaté logo</strong> vpředu nad displejem reaguje na dotek jako další tlačítko. Starší <strong>V1</strong> nic z toho nemá, a tak k melodii potřebuje sluchátka nebo bzučák připojený na kolíky.</p>
						<h3>Nápady na vyzkoušení</h3>
						<ul>
							<li><strong>kámen–nůžky–papír</strong>: po zatřesení ukaž náhodný symbol</li>
							<li><strong>elektronická kostka</strong>: zatřes a padne náhodné číslo 1–6 — bez náhody by kostka ukazovala pořád totéž a hra by ztratila smysl</li>
							<li><strong>krokoměr</strong>: každé zatřesení přičte 1 do proměnné <em>kroky</em> a displej ji ukáže</li>
						</ul>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html" target="_blank" rel="noopener">Programujeme micro:bit pomocí MakeCode</a> (NPI ČR), kap. 2–4.</p>
					`,
					odkazy: [
						{ nazev: 'MakeCode — simulátor micro:bitu', url: 'https://makecode.microbit.org' },
						{ nazev: 'učebnice micro:bit', url: 'https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html' },
						{ nazev: 'microbit.org — nápady na projekty', url: 'https://microbit.org/cs/projects/' },
					],
				},
				{
					slug: 'propojeni-a-externi-zarizeni',
					nazev: 'Rádio a externí zařízení',
					interakce: 'microbit-radio',
					obsah: `
						<h2>Desky si povídají</h2>
						<p>Dva micro:bity se propojí <strong>bezdrátově rádiem</strong>: jeden vyšle zprávu (číslo nebo text), druhý ji přijme a zareaguje — stejný princip jako posílání zpráv ve Scratchi, jen vzduchem.</p>
						<h3>Co s tím?</h3>
						<ul>
							<li>📡 tajná vysílačka — posílání znaků mezi lavicemi</li>
							<li>🚪 dálkové ovládání — tlačítko u jedné desky rozsvítí druhou</li>
							<li>🏁 měření času na trati — start a cíl si pošlou signál</li>
						</ul>
						<h3>Připojení dalších zařízení</h3>
						<p>Přes <strong>piny</strong> na spodní hraně jde k desce připojit LED pásek, motorek, čidlo vlhkosti… micro:bit je pak mozkem vlastního vynálezu — zalévací hlídač květin, poplašné zařízení na šuplík, semafor pro lego-město. 💡</p>
						<h3>Aby se desky slyšely</h3>
						<p>Obě desky musí mít v programu nastavené <strong>stejné číslo skupiny</strong> — je to jako naladit stejnou stanici. Když má každá jiné, zprávy si nepředají, i když leží vedle sebe. Ve třídě, kde vysílá víc dvojic, si každá zvolí své číslo, aby si vzájemně nemluvily do vysílání.</p>
						<p>Posílat jde <strong>číslo nebo krátký text</strong> — fotku ani celý program rádiem neodešleš. V učebně dosah pohodlně stačí; přes několik zdí už signál slábne.</p>
						<h3>Piny na spodní hraně</h3>
						<p>Tři velké kroužky <strong>P0, P1, P2</strong> plus <strong>3V</strong> a <strong>GND</strong> se dají chytit krokosvorkami. Přes ně se k desce připojí LED pásek, motorek nebo čidlo vlhkosti. Zalévací hlídač pak funguje takhle: čidlo v květináči hlásí <strong>vlhkost jako číslo</strong>, program ho porovná s hranicí a při suchu ukáže na displeji smutný obličej (nebo pošle zprávu rádiem druhé desce).</p>
						<h3>Mini-projekt</h3>
						<p>Navrhni a předveď vlastní zařízení s micro:bitem — od nápadu přes program po ukázku. Postup jako u robota: rozděl, testuj, dolaď.</p>
						<p>📗 Učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html" target="_blank" rel="noopener">Programujeme micro:bit pomocí MakeCode</a> (NPI ČR), kap. 5–6.</p>
					`,
					odkazy: [
						{ nazev: 'MakeCode — simulátor micro:bitu', url: 'https://makecode.microbit.org' },
						{ nazev: 'učebnice micro:bit', url: 'https://archiv-imysleni.npi.cz/ucebnice/18-robotika-pro-zakladni-skoly-programujeme-micro-bit-pomoci-makecode.html' },
						{ nazev: 'microbit.org — nápady na projekty', url: 'https://microbit.org/cs/projects/' },
					],
				},
			],
		},
		{
			slug: 'hromadne-zpracovani-dat',
			nazev: 'Hromadné zpracování dat',
			podtemata: [
				{
					slug: 'adresy-bunek-a-vzorce',
					nazev: 'Adresy buněk a vzorce',
					interakce: 'tabulka-vzorce',
					obsah: `
						<h2>Tabulka, která počítá</h2>
						<p>Tabulkový procesor (Excel, Google Tabulky, LibreOffice Calc) je mřížka <strong>buněk</strong>. Každá buňka má <strong>adresu</strong>: sloupec + řádek, třeba <strong>B3</strong>.</p>
						<h3>Vzorec začíná =</h3>
						<ul>
							<li><code>=B2+B3</code> — součet dvou buněk</li>
							<li><code>=B2*1.21</code> — cena s DPH</li>
							<li>změníš-li vstupní buňku, výsledek se <strong>přepočítá sám</strong> — v tom je síla tabulek</li>
						</ul>
						<h3>Relativní × absolutní adresa</h3>
						<p>Když vzorec <strong>kopíruješ</strong> dolů, adresy se posouvají s ním (<em>relativní</em>: z B2 se stane B3). Když má adresa zůstat na místě, <strong>ukotvi ji dolarem</strong>: <code>$B$1</code> (<em>absolutní</em>).</p>
						<p>👉 Typická úloha: sloupec cen × jeden kurz eura v buňce <code>$B$1</code>. Kurz se ukotví, ceny se posouvají.</p>
					`,
					odkazy: [
						{ nazev: 'cvičná data — státy světa', url: 'http://simandl.asp2.cz/Online.aspx' },
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
					],
				},
				{
					slug: 'funkce-v-tabulkach',
					nazev: 'Funkce — průměr, počet, KDYŽ',
					interakce: 'funkce-tabulky',
					obsah: `
						<h2>Hotové výpočty na zavolání</h2>
						<p><strong>Funkce</strong> je připravený výpočet se jménem. Do závorky patří, s čím má pracovat — nejčastěji <strong>oblast buněk</strong> (např. B2:B31 = sloupec třiceti hodnot).</p>
						<h3>Nejužitečnější funkce</h3>
						<ul>
							<li><code>=SUMA(B2:B31)</code> — součet; <code>=PRŮMĚR(B2:B31)</code> — průměr</li>
							<li><code>=MAX(…)</code>, <code>=MIN(…)</code> — největší a nejmenší hodnota</li>
							<li><code>=POČET(…)</code> — kolik je čísel; <code>=RANK(B2;$B$2:$B$31;1)</code> — na kolikátém místě je hodnota mezi ostatními. <strong>Třetí údaj rozhoduje o pořadí:</strong> <code>1</code> řadí od nejmenší (u známek správně, jednička je nejlepší), bez něj se řadí od největší — a nejhorší známka by vyšla jako první místo. (V novějším Excelu <code>=RANK.EQ</code> se stejnými údaji.)</li>
							<li>textové: <code>=ZLEVA(A2;3)</code> — první 3 znaky, <code>=DÉLKA(A2)</code> — počet znaků</li>
							<li><code>=KDYŽ(B2&gt;=50;"prospěl";"neprospěl")</code> — rozhodování jako ve Scratchi!</li>
						</ul>
						<h3>Jak se funkce píše</h3>
						<p>Vzorec začíná <strong>=</strong>, pak je jméno funkce a v závorce to, s čím má počítat. Oblast se zapisuje <strong>od–do s dvojtečkou</strong> (B2:B31) a dá se vybrat i myší. Víc údajů se v české verzi odděluje <strong>středníkem</strong>: <code>=ZLEVA(A2;3)</code>.</p>
						<h3>Snadno se popletou</h3>
						<ul>
							<li><code>=SUMA(B2:B31)</code> hodnoty <em>sečte</em>, kdežto <code>=POČET(B2:B31)</code> jen spočítá, <em>kolik</em> buněk v oblasti obsahuje číslo — text ani prázdnou buňku nezapočítá</li>
							<li><code>=MAX(…)</code> vrátí největší hodnotu, ale ne jméno toho, komu patří; na to, na kolikátém místě hodnota je, je <code>=RANK(…)</code></li>
							<li><code>=PRŮMĚR(…)</code> dělí součet <strong>počtem čísel</strong>, ne počtem řádků. Jediná buňka s textem nebo prázdná proto průměr změní, i když tabulka vypadá pořád stejně — právě proto tabulce často vychází jiný průměr, než jaký sis spočítal na papíře</li>
						</ul>
						<p>👉 Všimni si: <strong>KDYŽ</strong> je stejné větvení, jaké znáš z programování. Tabulka je vlastně program — jen zapsaný do buněk.</p>
						<p>👉 Vyzkoušej na tabulce známek celé třídy: průměr, nejlepší a nejhorší známka, kolik žáků bylo hodnoceno a kdo je v žebříčku kolikátý. Pět funkcí a máš hotový přehled. <strong>Pozor:</strong> u známek je nejlepší ta <em>nejmenší</em> — nejlepší známku proto najde MIN a nejhorší MAX.</p>
					`,
					odkazy: [
						{ nazev: 'cvičná data — státy světa', url: 'http://simandl.asp2.cz/Online.aspx' },
					],
				},
				{
					slug: 'razeni-filtrovani-velka-data',
					nazev: 'Řazení, filtrování a velká data',
					interakce: 'razeni-filtrovani',
					obsah: `
						<h2>Tabulka jako evidence</h2>
						<p>Tabulka dat = <strong>záznamy</strong> (řádky), které mají ve sloupcích <strong>tytéž druhy údajů</strong> — jméno, ročník, počet obyvatel: žáci, knihy, státy světa. Nový záznam = nový řádek se všemi údaji.</p>
						<h3>Řazení</h3>
						<p>Podle libovolného sloupce: abecedně, podle velikosti, data. Pozor — řadí se <strong>celé řádky</strong>, ne jen jeden sloupec!</p>
						<h3>Filtrování</h3>
						<p><strong>Filtr</strong> dočasně skryje řádky, které nesplňují podmínku: <em>ukaž jen státy Evropy s počtem obyvatel nad 10 milionů</em>. Data se nemažou, jen se nezobrazují.</p>
						<h3>Jak řadit, aby se data nerozsypala</h3>
						<p>Nejhorší, co se dá udělat, je označit <strong>jediný sloupec</strong> a seřadit ho. Ten se seřadí sám za sebe, ale ostatní sloupce zůstanou stát — u každého jména je pak cizí údaj a tabulka je rozsypaná. Když si toho všimneš hned, zachrání tě <strong>Ctrl+Z</strong> (zpět) — po uložení a zavření souboru už ne. Správně stačí <strong>kliknout do tabulky</strong> (nebo označit celou oblast včetně záhlaví) a zvolit řazení; program pak přehází celé řádky. První řádek se jmény sloupců si nech označit jako <strong>záhlaví</strong>, ať se neseřadí mezi data.</p>
						<h3>Filtr s více podmínkami</h3>
						<p>Podmínky se dají skládat: <em>světadíl = Evropa</em> <strong>a zároveň</strong> <em>obyvatel &gt; 10 000 000</em>. Zapnutý filtr poznáš podle trychtýře v záhlaví sloupce; <strong>vypnutím se všechna data vrátí</strong>, protože filtr nic nemaže. Pozor na to při počítání průměru — funkce počítají i s řádky, které jsou schované.</p>
						<h3>Než začneš počítat, data si prohlédni</h3>
						<p>Velká data bývají špinavá: prázdné buňky, překlepy, <strong>tentýž údaj zapsaný dvěma způsoby</strong> („Česko" × „Česká republika"), číslo uložené jako text. Seřazení sloupce je odhalí rychle — nesmysly vyplavou na kraj. Počítat z neprohlédnutých dat znamená spolehlivě dostat přesný, ale špatný výsledek.</p>
						<h3>Ověř hypotézu daty</h3>
						<p>👉 „Velké státy mají víc obyvatel než malé — platí to vždy?" S tabulkou stovek států to zjistíš za minutu: seřaď, filtruj, spočítej průměr, vytvoř graf. <strong>Odpovídej na základě dat, ne dojmů.</strong></p>
						<p>🗂️ Cvičná data: <a href="http://dbs.pf.jcu.cz/simandl/" target="_blank" rel="noopener">Online přípravna úloh pro ICT</a> (v nabídce je i geografie států světa).</p>
					`,
					odkazy: [
						{ nazev: 'cvičná data — státy světa', url: 'http://simandl.asp2.cz/Online.aspx' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'hry-ve-scratchi',
			nazev: 'Hry ve Scratchi — návody',
			podtemata: [
				{
					slug: 'hra-ping-pong',
					nazev: 'Hra 1: Ping-pong',
					interakce: 'ping-pong',
					obsah: `
						<h2>🏓 Ping-pong</h2>
						<p>Klasika: odrážej míček pálkou, ať nespadne dolů.</p>
						<h3>Připrav si</h3>
						<ul>
						<li>postava <strong>Pálka</strong> (protáhlý obdélník) dole</li>
						<li>postava <strong>Míček</strong></li>
						<li><strong>pozadí</strong>: úplně dole přes celou šířku <strong>červený pruh</strong> — propadliště
						(proč zrovna takhle, se dozvíš níž)</li>
						<li>proměnné <strong>skóre</strong> a <strong>životy</strong></li>
						</ul>
						<h3>Scénář Pálky</h3>
						<ol>
						<li>po kliknutí na vlajku → opakuj stále: nastav x na (x myši) — pálka jezdí za myší, y se nemění</li>
						</ol>
						<h3>Scénář Míčku</h3>
						<ol>
						<li>po kliknutí na vlajku → nastav skóre na 0, nastav životy na 3, skoč na x: 0 y: 0, nastav směr (45)</li>
						<li>opakuj stále: dopředu o 10 kroků, když narazíš na okraj, odraz se</li>
						<li>když ⟨dotýkáš se (Pálka)?⟩ → otoč se ↻ o ⟨(180) + ⟨náhodné číslo od (−20) do (20)⟩⟩ stupňů (ať to není nuda), dopředu o 15 kroků, změň skóre o 1</li>
						<li>když ⟨dotýkáš se barvy (červená)?⟩ (proletěl dolů do propadliště) → změň životy o −1, skoč na x: 0 y: 0, čekej 1 sekund</li>
						<li>když životy = 0 → bublina ⟨spoj („Konec hry! Skóre: ") (skóre)⟩, zastav (všechno)</li>
						</ol>
						<h3>Co se tu vlastně učíš</h3>
						<p>V každé hře jsou dva druhy postav a ping-pong je má hezky vedle sebe. <strong>Pálka</strong>
						nic nerozhoduje — jen opisuje, kde je myš. <strong>Míček</strong> naopak jede sám a program mu
						pořád dokola říká jedno: <em>popojeď a rozhlédni se</em>. Tomu opakování se říká
						<strong>herní smyčka</strong> a je v každé hře, kterou kdy uvidíš.</p>
						<p>Druhá věc: ve Scratchi se <strong>nelétá po souřadnicích, ale po směru</strong>. Míček má svůj
						směr (0 = vzhůru, 90 = doprava) a blok ⟨dopředu o ( ) kroků⟩ ho posune tam, kam kouká.
						Proto se odraz nedělá „skočením jinam", ale <strong>otočením směru</strong> — a od okraje to
						umí Scratch sám blokem ⟨když narazíš na okraj, odraz se⟩.</p>
						<p><strong>Skóre a životy jsou proměnné</strong> — paměť hry. Všimni si, že se obě nastavují
						hned na začátku. Bez toho by druhá hra začala s výsledkem té první.</p>
						<h3>⚠️ Proč se míček „lepí" na pálku</h3>
						<p>Nejčastější chyba téhle hry: míček se dotkne pálky, otočí se o 180° — a protože se pálky
						pořád ještě dotýká, hned v dalším kole se otočí zase. Kmitá na místě a skóre šílí.
						Proto je ve scénáři po otočení ještě <strong>dopředu o 15 kroků</strong>: míček z pálky
						nejdřív odjede, a teprve pak se ptá znovu.</p>
						<h3>⚠️ A proč to červené propadliště</h3>
						<p>Napadlo tě, že by stačilo napsat <em>když y &lt; −175 → ubyde život</em>? Vypadá to
						rozumně a <strong>hra by přesto nikdy neskončila</strong>. Blok ⟨když narazíš na okraj,
						odraz se⟩ totiž odráží od <em>všech</em> okrajů — i od toho dolního. Míček se ode dna
						odrazí dřív, než stihne na −175 klesnout, a hraje se donekonečna.</p>
						<p>Spočítej si to: scéna sahá k y = −180 a odraz nastane, jakmile míček dolní okraj přesáhne.
						Míček velký 30 bodů se tedy nejníž dostane se středem na <strong>−165</strong>, čtyřicetibodový
						dokonce jen na −160. Podmínka „y &lt; −175" nevyjde ani jednou.</p>
						<p>Červený pruh tenhle spor řeší jednoduše: míček se ho dotkne <em>cestou dolů</em>,
						ještě než se stačí od dna odrazit — a je jedno, jak je velký. 👉 Zapamatuj si to jako
						pravidlo: <strong>když se dvě pravidla ve hře perou, vyhraje to rychlejší z nich.</strong></p>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>míček zrychluje se skóre: za každých 10 bodů přidej 1 krok
						(⟨dopředu o ⟨(10) + ⟨(skóre) / (10)⟩⟩ kroků⟩ — po deseti bodech 11, po dvaceti 12…)</li>
						<li>dvouhráčová verze: druhá pálka nahoře na klávesy A/D</li>
						<li>bonusové cihly nahoře, které mizí po zásahu (jako Arkanoid)</li>
						<li><strong>poctivější odraz:</strong> otočka o 180° pošle míček přesně tam, odkud přiletěl —
						ve skutečnosti se tak odrazí jen míček, který narazil kolmo. Opravdový odraz od pálky obrací
						jen pohyb nahoru–dolů, a hlavně: čím dál od středu pálky míček trefí, tím šikměji se má
						odrazit. Zkus směr počítat z rozdílu x míčku a x pálky. Hra tím rázem dostane taktiku.</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
					],
				},
				{
					slug: 'hra-vesmirna-strilecka',
					nazev: 'Hra 2: Vesmírná střílečka',
					interakce: 'strilecka',
					obsah: `
						<h2>🚀 Vesmírná střílečka</h2>
						<p>Raketa střílí na padající meteory. Naučíš se <strong>klonování</strong> — nejdůležitější trik větších her!</p>
						<h3>Připrav si</h3>
						<ul>
						<li>postava <strong>Raketa</strong> dole (šipky doleva/doprava)</li>
						<li>postava <strong>Střela</strong> (malá tečka), postava <strong>Meteor</strong></li>
						<li>proměnné <strong>skóre</strong> a <strong>životy</strong></li>
						</ul>
						<h3>Scénář Rakety</h3>
						<ol>
						<li>po kliknutí na vlajku → nastav skóre na 0, nastav životy na 3, skoč na x: 0 y: (−140)</li>
						<li>opakuj stále: když ⟨klávesa (šipka vlevo) stisknuta?⟩ → změň x o −8;
						když ⟨klávesa (šipka vpravo) stisknuta?⟩ → změň x o 8</li>
						<li>když životy = 0 → bublina ⟨spoj („Konec! Skóre: ") (skóre)⟩, zastav (všechno)</li>
						</ol>
						<h3>Scénář Střely</h3>
						<ol>
						<li>po kliknutí na vlajku → <strong>skryj se</strong> (originál nikdy nevidíme — létají jen klony)</li>
						<li>po stisku klávesy (mezerník) → klonuj (sebe)</li>
						<li>když startuje můj klon → ukaž se, skoč na (Raketa), opakuj stále: změň y o 15; když y &gt; 175 → zruš tento klon</li>
						</ol>
						<h3>Scénář Meteoru</h3>
						<ol>
						<li>po kliknutí na vlajku → skryj se; opakuj stále: čekej 1 sekund, klonuj (sebe)</li>
						<li>když startuje můj klon → ukaž se, skoč na x: ⟨náhodné číslo od (−200) do (200)⟩ y: 180, opakuj stále: změň y o −4</li>
						<li>když ⟨dotýkáš se (Střela)?⟩ → změň skóre o 1, zruš tento klon (střela zmizí sama nahoře)</li>
						<li>když ⟨dotýkáš se (Raketa)?⟩ → změň životy o −1, zruš tento klon</li>
						<li>když y &lt; −175 → zruš tento klon</li>
						</ol>
						<h3>Co je klonování a proč je tak důležité</h3>
						<p>Střel je za hru stovky a meteorů taky. Vyrobit stovky postav ručně nejde — a nemuselo by
						to ani pomoct, protože předem nevíš, kolikrát hráč stiskne mezerník. <strong>Klon</strong>
						je kopie postavy, kterou si program vyrobí <em>až za běhu</em>, přesně když ji potřebuje.</p>
						<p>Nejdůležitější je tohle: <strong>klon si spustí vlastní program</strong> pod hlavičkou
						⟨když startuje můj klon⟩ a od té chvíle si žije sám. Dvacet střel ve vzduchu = dvacet
						programů běžících najednou, každý si pamatuje svou vlastní polohu. Ty jsi přitom napsal
						scénář jen <strong>jednou</strong>.</p>
						<p>Klon vzniká jako přesná kopie originálu <em>v tom okamžiku</em> — se stejným vzhledem,
						velikostí i směrem. A protože originál je skrytý, je skrytý i klon: proto na sebe každý
						klon musí hned zavolat ⟨ukaž se⟩.</p>
						<h3>⚠️ Klon po sobě musí uklidit</h3>
						<p>Scratch udrží najednou nejvýš <strong>300 klonů</strong>. Když je jich tolik, blok ⟨klonuj (sebe)⟩
						už prostě <em>nic neudělá</em> — a nic nehlásí. Zapomenutý ⟨zruš tento klon⟩ se pozná takhle:
						hra chvíli šlape, pak přestane střílet a nikdo neví proč. Proto má každý klon ve scénáři
						svůj konec: střela nad horním okrajem, meteor pod dolním, oba při zásahu.</p>
						<p>👉 Skrytý klon <strong>není zrušený klon</strong>. Když ho jen skryješ, dál se počítá do těch
						300 a dál mu běží program. Zmizet z očí a přestat existovat jsou dvě různé věci.</p>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>meteory se objevují stále rychleji: začni na 3 sekundách a za každých 10 bodů
						jednu ubírej, ale nikdy pod 1 (⟨čekej ⟨(3) − ⟨(skóre) / (10)⟩⟩ sekund⟩ — po deseti bodech
						2 sekundy, po dvaceti 1)</li>
						<li>zvuky výstřelu a výbuchu, pozadí s hvězdami</li>
						<li>velký meteor vydrží dva zásahy — použij proměnnou <strong>jen pro tuto postavu</strong>
						(„síla"): každý klon jich má vlastní kopii, takže si každý meteor počítá své vlastní zásahy.
						Kdyby byla proměnná společná pro všechny, sdílelo by ji všech dvacet meteorů naráz.</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
					],
				},
				{
					slug: 'hra-skakacka',
					nazev: 'Hra 3: Skákačka',
					interakce: 'skakacka',
					obsah: `
						<h2>🦖 Skákačka</h2>
						<p>Postava přeskakuje běžící překážky — jako dinosaurus v Chromu. Naučíš se udělat <strong>gravitaci</strong>.</p>
						<h3>Připrav si</h3>
						<ul>
						<li>postava <strong>Běžec</strong> vlevo dole (stojí na místě, „běží" svět kolem)</li>
						<li>postava <strong>Kaktus</strong> (překážka)</li>
						<li>postava <strong>Země</strong> — široký nízký pruh přes celou scénu, po kterém se běží</li>
						<li>proměnné <strong>rychlostY</strong>, <strong>skóre</strong> a <strong>výška země</strong>
						(nastav ji na y, ve kterém Běžec stojí — třeba −100)</li>
						</ul>
						<h3>Scénář Běžce — gravitace</h3>
						<ol>
						<li>po kliknutí na vlajku → nastav rychlostY na 0</li>
						<li>opakuj stále: změň rychlostY o −1 (tíže táhne dolů), změň y o rychlostY</li>
						<li>když ⟨dotýkáš se (Země)?⟩ → nastav rychlostY na 0, nastav y na (výška země)</li>
						<li>po stisku klávesy (mezerník) → když ⟨(y) = (výška země)⟩ (stojí na zemi) → nastav rychlostY na 12 (výskok!)</li>
						</ol>
						<h3>Scénář Kaktusu</h3>
						<ol>
						<li>po kliknutí na vlajku → opakuj stále: skoč na x: 240 y: (výška země), klouzej 2 sekund na x: (−240) y: (výška země)</li>
						<li>když ⟨dotýkáš se (Běžec)?⟩ → bublina ⟨spoj („Konec! Skóre: ") (skóre)⟩, zastav (všechno)</li>
						<li>skóre roste s časem (opakuj stále: čekej 1 sekund, změň skóre o 1)</li>
						</ol>
						<h3>Co se tu vlastně učíš: gravitace</h3>
						<p>Skoro každý začátečník napíše skok takhle: <em>změň y o 50, čekej, změň y o −50</em>.
						Postava vyskočí — ale vypadá to jako výtah. Skutečný skok je oblouk: nahoru se zpomaluje
						a dolů zase zrychluje. A ten oblouk nejde nakreslit, ten musí <strong>vyjít sám</strong>.</p>
						<p>Trik je v tom, že se nepočítá poloha, ale <strong>rychlost — a ta je proměnná</strong>.
						Tíže nestahuje postavu dolů; tíže jí každé kolo <em>ubere kousek rychlosti</em>. Teprve
						rychlost pak posune postavu:</p>
						<ul>
						<li>výskok nastaví rychlostY na 12,</li>
						<li>každé kolo: rychlostY o 1 menší (11, 10, 9 … 1, 0, −1, −2 …),</li>
						<li>a y se pokaždé změní právě o tuhle rychlost.</li>
						</ul>
						<p>Postava tak stoupá čím dál pomaleji, ve <strong>vrcholu se na okamžik zastaví</strong>
						(rychlost 0) a pak padá čím dál rychleji. Nikdo to nenaprogramoval — vyšlo to samo
						z jednoho odečítání. Spočítej si to: 11 + 10 + 9 + … + 1 = <strong>66 bodů</strong> vysoko,
						nahoře je v 11. kole a na zemi zpátky ve 23.</p>
						<p>💡 A tohle není trik ze Scratche — přesně takhle padá i skutečný kámen. Ve fyzice
						se tomu říká <strong>rovnoměrně zrychlený pohyb</strong>: tíže nemění polohu, mění rychlost.</p>
						<h3>⚠️ Dvě pasti</h3>
						<ul>
						<li><strong>Skákání ve vzduchu.</strong> Bez podmínky „když stojí na zemi" si hráč mačkáním
						mezerníku doplňuje rychlost pořád dokola a odletí ze scény. Skočit smí jen ten, kdo stojí.</li>
						<li><strong>Propadnutí zemí.</strong> Postava padá čím dál rychleji (u našeho skoku dopadá
						rychlostí −11) — a když je země tenká čára, v jednom kole ji celou přeskočí a padá dál.
						Proto se po dopadu y <em>nastaví</em> přímo na výšku země; zastavit rychlost nestačí.</li>
						</ul>
						<p>Poslední věc: <strong>Běžec nikam neběží.</strong> Stojí vlevo na místě a pohybuje se svět
						kolem něj. Tenhle obrat používá skoro každá běhací hra — je totiž mnohem snazší posouvat
						pár kaktusů než celou krajinu za hrdinou.</p>
						<h3>💡 Vylepšení pro šikovné</h3>
						<ul>
						<li>překážky zrychlují se skóre; občas letí i pták (nutné se přikrčit)</li>
						<li>střídání dne a noci (pozadí) a <strong>rekord</strong>: proměnnou nastav jen tehdy,
						když je skóre větší — a hlavně ji na startu hry <em>ne</em>nuluj, jinak žádný rekord nevznikne</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
					],
				},
			],
		},
		{
			slug: 'vex-iq',
			nazev: 'Robotika VEX IQ',
			podtemata: [
				{
					slug: 'co-umi-vex-iq',
					nazev: 'Co robot VEX IQ umí',
					obsah: `
						<h2>🤖 Seznam se: VEX IQ</h2>
						<p>Ve škole stavíme roboty ze stavebnice <strong>VEX IQ</strong>. Díly se spojují bez šroubování (zacvakávací plastové nosníky a piny) — robot vznikne rychle a jde kdykoli přestavět.</p>
						<h3>Mozek robota (Robot Brain)</h3>
						<ul>
						<li>displej a tlačítka — spouštění programů přímo na robotu</li>
						<li><strong>12 portů</strong> na motory a čidla (kabely stačí zacvaknout)</li>
						<li>rádio pro spojení s ovladačem a počítačem</li>
						</ul>
						<h3>Co všechno robot umí</h3>
						<ul>
						<li>🚗 <strong>jezdit</strong> — dva hnací motory (tank drive), přesné otáčky</li>
						<li>🦾 <strong>zvedat a chytat</strong> — další motory pro rameno a klepeta</li>
						<li>👀 <strong>vnímat okolí</strong> — čidla vzdálenosti, barvy, náklonu, dotyku (viz další stránka)</li>
						<li>🎮 <strong>poslouchat ovladač</strong> — režim řízení (Driver Control) jako RC autíčko</li>
						<li>🧠 <strong>jednat sám</strong> — program rozhoduje podle čidel (autonomní režim)</li>
						</ul>
						<h3>Programování — VEXcode IQ</h3>
						<p>Programuje se ve <strong>VEXcode IQ</strong> — my ho pouštíme rovnou v prohlížeči, existuje ale i verze k nainstalování do počítače. Bloky vypadají <strong>skoro stejně jako Scratch</strong>: opakování, podmínky, události, proměnné. Co umíš ze Scratche, použiješ i tady! Kdo chce víc, může přepnout na Python.</p>
						<h3>Jeden rozdíl proti Scratchi, který musíš vědět</h3>
						<p>Ve Scratchi program <strong>běží v prohlížeči</strong> a ty se na něj koukáš. Tady je to jinak:
						hotový program se do robota <strong>stáhne</strong> (kabelem, nebo bezdrátově přes rádio) a od té
						chvíle běží <strong>uvnitř robota</strong>. Počítač můžeš klidně zavřít a odnést — robot jede dál,
						protože program má v sobě.</p>
						<p>Z toho plyne pár věcí, které ve Scratchi neřešíš:</p>
						<ul>
						<li><strong>Změna v počítači se robota nedotkne</strong>, dokud ji tam znovu nestáhneš. Většina
						záhad typu „opravil jsem to a on dělá pořád totéž" je přesně tohle.</li>
						<li><strong>Robot ti nemůže vypsat chybu na obrazovku</strong> — musíš se ptát jeho displeje.</li>
						<li><strong>Robot je na baterku.</strong> Docházející baterie program nezastaví — jen zpomalí
						motory, takže robot začne zatáčet jinak a jezdit kratší dráhy (úplně vybitá ho pak vypne
						celého). Když se přesná jízda „bez příčiny" zhorší, nejdřív se podívej na stav nabití.</li>
						</ul>
						<h3>Soutěže</h3>
						<p>S roboty VEX IQ se jezdí i celosvětová soutěž <strong>VEX IQ Robotics Competition</strong> — každý rok nová hra, týmy sbírají body jízdou i autonomními programy.</p>
					`,
					odkazy: [
						{ nazev: 'VEXcode IQ — programování v prohlížeči', url: 'https://codeiq.vex.com' },
						{ nazev: 'Návod česky: první program ve VEXcode', url: 'https://lab.wonderly.cz/informatika/8-rocnik/vex-iq/vexcode-prvni-program/' },
						{ nazev: 'vexrobotics.com — stavebnice VEX IQ', url: 'https://www.vexrobotics.com/iq' },
					],
				},
				{
					slug: 'cidla-vex-iq',
					interakce: 'cara',
					nazev: 'Čidla VEX IQ — návod k použití',
					obsah: `
						<h2>👀 Čidla — smysly robota</h2>
						<p>Čidlo (senzor) zapoj kabelem do libovolného portu mozku a v programu ho přidej v nastavení zařízení (Devices). Pak můžeš jeho hodnoty číst v podmínkách — stejné „když… tak…" jako ve Scratchi.</p>
						<h3>🔴 Nárazník (Bumper Switch)</h3>
						<p>Tlačítko — pozná náraz. <em>Použití: jeď dopředu, dokud není nárazník stisknutý → zastav a couvni.</em></p>
						<h3>💡 Dotykové LED (Touch LED)</h3>
						<p>Svítící tlačítko — reaguje na dotyk prstu a umí svítit barvami. <em>Použití: start programu dotykem; barva ukazuje stav robota (zelená = hotovo).</em></p>
						<h3>📏 Čidlo vzdálenosti (Distance Sensor)</h3>
						<p>Měří vzdálenost k překážce (ultrazvuk/laser). <em>Použití: zastav 10 cm před zdí; objeď překážku; najdi nejbližší předmět otáčením.</em></p>
						<h3>🎨 Čidlo barvy (Color/Optical Sensor)</h3>
						<p>Pozná barvu a odstín pod sebou nebo před sebou. <em>Použití: jízda po černé čáře; zastav na červené značce; roztřiď kostky podle barvy.</em></p>
						<h3>🧭 Gyro / Inertial</h3>
						<p>Měří natočení robota. <em>Použití: otoč se přesně o 90° (bez gyra robot zatáčí pokaždé jinak!); jeď rovně i po nárazu.</em></p>
						<h3>⚙️ Čidla v motorech</h3>
						<p>Každý chytrý motor sám měří otáčky → „jeď 2 otáčky dopředu" je přesné na stupně, bez dalšího čidla.</p>
						<h3>Jak čidla použít v programu</h3>
						<ol>
						<li>blok <strong>čekej, dokud</strong> — jeď, <em>čekej dokud vzdálenost &lt; 10 cm</em>, zastav</li>
						<li>blok <strong>když… tak… jinak</strong> — <em>když vidím černou → toč doleva, jinak doprava</em> (jízda po čáře!)</li>
						<li>hodnoty čidel si nech <strong>vypisovat na displej</strong> mozku — nejrychlejší ladění</li>
						</ol>
					`,
					odkazy: [
						{ nazev: 'VEXcode IQ — programování v prohlížeči', url: 'https://codeiq.vex.com' },
						{ nazev: 'Návod česky: první program ve VEXcode', url: 'https://lab.wonderly.cz/informatika/8-rocnik/vex-iq/vexcode-prvni-program/' },
					],
				},
				{
					slug: 'vexcode-prvni-program',
					nazev: 'Návod česky: první program ve VEXcode IQ',
					interakce: 'vexcode',
					obsah: `
						<h2>🧑‍💻 První program pro robota — česky krok za krokem</h2>
						<p>Prostředí VEXcode IQ je anglicky — ale bloky vypadají jako Scratch a s tímto návodem je zvládneš levou zadní.</p>
						<h3>1️⃣ Otevři projekt</h3>
						<ol>
							<li>Na počítači otevři <strong>codeiq.vex.com</strong> (QR dole)</li>
							<li><strong>New Blocks Project</strong> = nový projekt s bloky</li>
							<li>Nahoře projekt pojmenuj (např. PrvniJizda)</li>
						</ol>
						<h3>2️⃣ Řekni programu, co má robot za díly (Devices)</h3>
						<ol>
							<li>vpravo nahoře ikona 🔌 <strong>Devices → Add a device</strong></li>
							<li>zvol <strong>Drivetrain</strong> (podvozek) → vyber porty levého a pravého motoru (podle zapojení kabelů)</li>
							<li>stejně přidej čidla: <strong>Distance, Optical/Color, Bumper, Touch LED</strong> — vždy port, do kterého jsou zapojená</li>
						</ol>
						<h3>3️⃣ Slovníček nejdůležitějších bloků</h3>
						<ul>
							<li><strong>when started</strong> = po spuštění (začátek programu)</li>
							<li><strong>drive forward / reverse</strong> = jeď vpřed / vzad</li>
							<li><strong>drive for 200 mm</strong> = ujeď přesně 200 mm</li>
							<li><strong>turn right / left for 90 degrees</strong> = otoč se vpravo / vlevo o 90°</li>
							<li><strong>set drive velocity</strong> = nastav rychlost jízdy (v %)</li>
							<li><strong>wait 1 seconds</strong> = čekej 1 s; <strong>wait until</strong> = čekej, dokud…</li>
							<li><strong>repeat / forever</strong> = opakuj ×krát / opakuj stále</li>
							<li><strong>if … then … else</strong> = když … tak … jinak</li>
							<li><strong>distance found object / distance in mm</strong> = hodnoty čidla vzdálenosti</li>
							<li><strong>print</strong> = vypiš na displej mozku (skvělé na ladění!)</li>
						</ul>
						<h3>4️⃣ První program — čtverec</h3>
						<ol>
							<li><strong>when started</strong></li>
							<li><strong>repeat 4</strong>: uvnitř <strong>drive for 300 mm</strong> + <strong>turn right for 90 degrees</strong></li>
							<li>přidej na konec zvuk (<strong>play sound</strong>) jako oslavu 🎉</li>
						</ol>
						<h3>5️⃣ Nahraj a spusť</h3>
						<ol>
							<li>připoj mozek robota <strong>USB kabelem</strong> k počítači a zapni ho</li>
							<li>klikni na <strong>Download</strong> — program se nahraje do mozku (do vybrané pozice 1–4)</li>
							<li>odpoj kabel, polož robota na zem a na mozku program <strong>spusť tlačítkem</strong></li>
						</ol>
						<h3>6️⃣ Druhý program — zastav před zdí</h3>
						<ol>
							<li><strong>when started</strong> → <strong>drive forward</strong> (bez vzdálenosti = jede pořád)</li>
							<li><strong>wait until</strong> distance in mm &lt; 100</li>
							<li><strong>stop driving</strong> + zvuk</li>
						</ol>
						<p>👉 Nefunguje to? Zkontroluj: správné porty v Devices, zapnutý mozek, vybraný správný program. A hodnoty čidel si nech vypisovat blokem <strong>print</strong>.</p>
					`,
					odkazy: [
						{ nazev: 'VEXcode IQ — programování v prohlížeči', url: 'https://codeiq.vex.com' },
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co umíme po 1. pololetí</h2>
						<ul>
							<li><strong>Robotická stavebnice LEGO:</strong> sestavení a oživení robota, jízda a výstupy (motory, displej, zvuk), senzory (dotyk, vzdálenost, barva), jízda po čáře, projekt Můj robot</li>
						</ul>
						<p>👉 Souhrnný kvíz níže se skládá automaticky z otázek probraných podtémat.</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co umíme po 8. ročníku</h2>
						<ul>
							<li><strong>Robotika:</strong> LEGO robot — motory, senzory, rozhodování, projekt</li>
							<li><strong>micro:bit:</strong> displej, tlačítka a senzory, rádio, externí zařízení</li>
							<li><strong>Tabulky:</strong> adresy buněk, vzorce, funkce (PRŮMĚR, MAX, KDYŽ…), řazení, filtrování, velká data</li>
						</ul>
						<p>👉 Souhrnný kvíz níže prověří celý ročník. Trénovat můžeš i v archivu <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobříka informatiky</a> (Kadet).</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
	],
	'informatika/9-rocnik': [
		{
			slug: 'programovaci-projekty',
			nazev: 'Programovací projekty',
			podtemata: [
				{
					slug: 'plan-projektu-a-ladeni',
					nazev: 'Plán projektu, testování a ladění',
					obsah: `
						<h2>Od nápadu k hotovému programu</h2>
						<p>V 9. ročníku už neprogramujeme cvičení, ale <strong>projekty</strong> — větší programy podle vlastního plánu (učebnice <a href="https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html" target="_blank" rel="noopener">Scratch II — projekty</a>).</p>
						<h3>Postup profesionálů</h3>
						<ol>
							<li><strong>Popiš problém</strong> — co přesně má program dělat? co uvidí uživatel?</li>
							<li><strong>Rozděl na části</strong> — pozadí, postavy, ovládání, skóre… (vlastní bloky!)</li>
							<li><strong>Tvoř po částech</strong> a každou hned <strong>otestuj</strong></li>
							<li><strong>Odlaď chyby</strong> — chyba je normální součást práce, ne selhání</li>
							<li><strong>Předveď</strong> a nech ostatní program vyzkoušet</li>
						</ol>
						<p>👉 Mysli i na <strong>uživatele</strong>: pochopí ovládání? je text čitelný? zvládne hru i začátečník? Dobrý program je ohleduplný k lidem, kteří ho používají.</p>
						<h3>Jak se ladí doopravdy</h3>
						<p>Ladění není zkoušení náhodných změn, dokud to nezačne fungovat. Postup, který používají profesionálové:</p>
						<ol>
							<li><strong>Popiš přesně, co je špatně</strong> — „nejde to" se opravit nedá, „postava po restartu začíná se skóre z minulé hry" ano.</li>
							<li><strong>Zužuj místo chyby</strong> — vypni části programu, dokud nezůstane nejmenší kousek, který ještě zlobí.</li>
							<li><strong>Podívej se, co program opravdu počítá</strong> — ukaž si proměnnou na scéně nebo si její hodnotu nech vypsat v bublině. Skoro vždycky se ukáže, že v ní je něco jiného, než čekáš.</li>
							<li><strong>Měň jednu věc</strong> a po každé změně vyzkoušej. Dvě změny naráz se navzájem zamaskují.</li>
						</ol>
						<p>Tři chyby, které v projektech vznikají nejčastěji: chybí <em>nastav (skóre) na 0</em> na začátku · podmínka <em>když… tak</em> leží <strong>mimo</strong> blok <em>opakuj stále</em>, takže se vyhodnotí jen jednou na začátku a pak už nikdy · dva scénáře si přepisují tutéž proměnnou.</p>
						<p>👉 Hotový program dej <strong>vyzkoušet někomu jinému</strong> a jen ho mlčky pozoruj. Autor totiž ovládání zná, a proto přehlédne přesně to, co ostatním nedojde.</p>
						<h3>První projekty</h3>
						<p><strong>Nákupní seznam</strong> (přidávání a mazání položek v seznamu) a <strong>Kulička</strong> (ovládání myší, posílání zpráv) — rozcvička na velké hry.</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
					],
				},
				{
					slug: 'seznamy-a-promenne-v-projektech',
					nazev: 'Seznamy — mnoho hodnot najednou',
					interakce: 'seznamy',
					obsah: `
						<h2>Proměnná × seznam</h2>
						<p>Proměnná uchová <strong>jednu</strong> hodnotu. <strong>Seznam</strong> jich uchová <strong>mnoho</strong> — očíslovaných za sebou (1., 2., 3. prvek…).</p>
						<h3>Co se seznamem umíme?</h3>
						<p>Scratch má na seznamy vlastní bloky:</p>
						<ul>
							<li><strong>přidej (rohlíky) k [nákup]</strong> — nová položka se zařadí na konec, seznam se o ni prodlouží</li>
							<li><strong>prvek (3) z [nákup]</strong> — přečte třetí položku</li>
							<li><strong>pořadí (rohlíky) ve [nákup]</strong> — řekne, na kolikátém místě hledaná položka je</li>
							<li><strong>smaž (2) z [nákup]</strong> — odebere jen tu jednu položku, ostatní zůstanou beze změny; celý seznam vyprázdní až blok <strong>smaž všechno z</strong></li>
							<li><strong>nahraď (2) v [nákup] hodnotou (mléko)</strong> a <strong>délka [nákup]</strong></li>
							<li>projít celý seznam: <strong>opakuj (délka [nákup]) krát</strong> — u seznamu se 6 položkami proběhne opakování 6×</li>
						</ul>
						<h3>Projekty se seznamy</h3>
						<ul>
							<li>🛒 <strong>Nákupní seznam</strong> — přidávání a mazání položek</li>
							<li>🎹 <strong>Klavír</strong> — seznam tónů = melodie; každý přidaný tón melodii prodlouží a program pak seznam projde a hraje tón po tónu</li>
							<li>🌍 <strong>Světadíly</strong> — dvojice seznamů otázka–odpověď = kvíz. Prvek č. 3 v otázkách patří k prvku č. 3 v odpovědích, proto se seznamy procházejí společně.</li>
						</ul>
						<h3>Proč ne deset proměnných?</h3>
						<p>Deset kontaktů by se dalo uložit i do deseti proměnných — jenže každou bys musel(a) v programu obsloužit zvlášť a jedenáctý kontakt bys už neměl(a) kam dát. Seznam se dá <strong>projít jedním opakováním</strong> a <strong>rozšířit na libovolný počet položek</strong>. Uložit do něj jde text i čísla.</p>
						<p>👉 Kombinace <strong>seznam + opakování + proměnná</strong> je základ skoro každé skutečné aplikace (kontakty, playlist, chat…).</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
					],
				},
				{
					slug: 'klonovani-animace-hry',
					nazev: 'Klonování, animace a tvorba hry',
					interakce: 'klonovani',
					obsah: `
						<h2>Velké finále: vlastní hra</h2>
						<h3>Klonování</h3>
						<p><strong>Klon</strong> = kopie postavy vytvořená za běhu programu. Ohňostroj z desítek jisker, déšť mincí, hejno nepřátel — vše z jedné postavy, kterou program klonuje. Všechny klony sdílejí společný scénář, ale každý si podle něj běží po svém — má vlastní polohu a hodnoty.</p>
						<p>V paletě Ovládání na to jsou tři bloky: <strong>klonuj (sebe)</strong> vyrobí nový klon, <strong>když startuje můj klon</strong> je hlavička scénáře, který si každý klon provádí sám za sebe, a <strong>zruš tento klon</strong> ho zase odstraní.</p>
						<p>👉 Na rušení klonů nezapomínej. Scratch jich udrží nejvýš <strong>300</strong> — pak blok <em>klonuj</em> prostě nic nevyrobí, takže nové jiskry ani mince už se neobjeví a hra se rozbije. Jiskra ohňostroje se proto po chvíli sama zruší, stejně jako mince, kterou hráč sebral. (Až program zastavíš, všechny klony zmizí samy.)</p>
						<h3>Animace</h3>
						<p>Postava střídá <strong>kostýmy</strong> → běží, mává, bliká. Pozadí se střídají → měníš úrovně hry. Import a úprava kostýmů dává hře vlastní tvář.</p>
						<h3>Návrh hry (Bludiště, Piano tiles…)</h3>
						<ol>
							<li>pravidla: co je cíl? kdy hráč vyhraje / prohraje?</li>
							<li>ovládání, překážky, skóre a životy (proměnné)</li>
							<li>úrovně (pozadí), zvuky, úvodní a závěrečná obrazovka</li>
						</ol>
						<h3>Co hru dodělá</h3>
						<ul>
							<li><strong>úvodní obrazovka</strong> přivítá hráče a vysvětlí pravidla — bez ní nikdo neví, co má dělat</li>
							<li><strong>závěrečná obrazovka</strong> oznámí výsledek: vyhrál jsi, tolik bodů, zkus to znovu</li>
							<li><strong>zvuky</strong> jsou zpětná vazba — pípnutí u sebrané mince a jiný zvuk u zásahu hráči hned řeknou, jestli udělal dobře, nebo špatně</li>
						</ul>
						<p>👉 Dobrá hra vzniká <strong>postupným přidáváním</strong>: nejdřív se hýbe postava, pak přibude cíl, pak překážky… Po každém kroku hru otestuj!</p>
						<p>🦫 Trénink logiky: archiv <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobříka informatiky</a> (kategorie Kadet).</p>
					`,
					odkazy: [
						{ nazev: 'učebnice Scratch II — projekty', url: 'https://archiv-imysleni.npi.cz/ucebnice/programovani-ve-scratchi-ii-projekty-pro-2-stupen-zakladni-skoly.html' },
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'digitalni-technologie',
			nazev: 'Digitální technologie',
			podtemata: [
				{
					slug: 'hardware-a-software',
					nazev: 'Hardware, software a operační systémy',
					obsah: `
						<h2>Z čeho se skládá počítač</h2>
						<h3>Hardware — co si můžeš osahat</h3>
						<ul>
							<li><strong>procesor (CPU)</strong> — počítá, vykonává příkazy programů</li>
							<li><strong>operační paměť (RAM)</strong> — rychlá pracovní deska; po vypnutí se maže</li>
							<li><strong>disk (SSD)</strong> — trvalé úložiště souborů</li>
							<li>vstupy (klávesnice, myš, mikrofon) a výstupy (monitor, reproduktory)</li>
						</ul>
						<p>Zařízení se dělí podle toho, kudy jde informace: <strong>vstupní</strong> ji do počítače dostávají (klávesnice, myš, mikrofon, kamera, skener), <strong>výstupní</strong> ji předávají ven k tobě (monitor, tiskárna, reproduktory, sluchátka). Dotykový displej umí obojí naráz.</p>
						<h3>Software — programy</h3>
						<p><strong>Operační systém</strong> (Windows, macOS, Linux, Android, iOS) řídí <strong>celý počítač</strong>: spouští aplikace, spravuje soubory, paměť i připojená zařízení. <strong>Aplikace</strong> je proti tomu program na <strong>jeden úkol</strong> — prohlížeč, textový editor, hra. Bez systému by aplikace neměla kde běžet; systém sám ale za tebe dopis nenapíše.</p>
						<h3>Když počítač zlobí</h3>
						<p>Většina „záhad" má triviální příčinu — a skoro vždycky je v jedné z těch tří vrstev, které už znáš: hardware (kabel), aplikace, nebo systém. Postupuj klidně a <strong>po krocích</strong>, od nejjednodušší příčiny ke složitější:</p>
						<ol>
							<li>nereaguje myš nebo klávesnice? <strong>Nejdřív kabel</strong> (nebo baterie a vypínač u bezdrátové)</li>
							<li>nereaguje jen jeden program? Zkus ho <strong>ukončit vynuceně</strong> a spustit znovu</li>
							<li>až potom <strong>restartuj</strong> celý počítač</li>
						</ol>
						<p>👉 Měň vždycky <strong>jednu věc</strong> a hned vyzkoušej, jestli to pomohlo. Když přehodíš pět věcí naráz, nedozvíš se, co bylo špatně — a příště začneš od začátku.</p>
						<h3>Komprese dat</h3>
						<p>👉 <strong>Komprese</strong> zmenšuje soubory: bezeztrátová (ZIP — vše jde obnovit) × ztrátová (JPG, MP3 — zahodí, co oko/ucho nepozná). Proto se fotka vejde do zprávy.</p>
						<h3>Technologie kolem nás</h3>
						<ul>
							<li><strong>umělá inteligence</strong> — programy, které se učí ze vzorů v datech místo z pevně napsaných pravidel</li>
							<li><strong>internet věcí (IoT)</strong> — běžné věci připojené k síti: žárovka, váha, chytrá zásuvka, senzor v poli</li>
							<li><strong>virtuální realita</strong> — počítačem vytvořený svět, do kterého se díváš brýlemi; rozšířená realita (AR) naopak přidává obraz do skutečného světa</li>
						</ul>
						<p>👉 Zkus si o tom popovídat doma: co tyhle technologie mění na tom, jak žijeme — a co za to platíme? Mikrolekce a pracovní sešity k tématu jsou na <a href="https://opocitacich.cz" target="_blank" rel="noopener">opocitacich.cz</a> (část obsahu je placená).</p>
					`,
					odkazy: [
						{ nazev: 'opocitacich.cz — digitální technologie', url: 'https://opocitacich.cz' },
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
						{ nazev: 'Datová Lhota (ČT :D)', url: 'https://decko.ceskatelevize.cz/datova-lhota' },
					],
				},
				{
					slug: 'pocitacove-site-a-internet',
					interakce: 'pakety',
					nazev: 'Počítačové sítě, internet a web',
					obsah: `
						<h2>Jak spolu počítače mluví</h2>
						<h3>Základní pojmy</h3>
						<ul>
							<li><strong>klient</strong> — zařízení, které o něco žádá (tvůj mobil)</li>
							<li><strong>server</strong> — počítač, který službu poskytuje (uchovává web, poštu, hru)</li>
							<li><strong>paket</strong> — balíček dat; <strong>IP adresa</strong> — číselná adresa zařízení</li>
							<li><strong>switch/router</strong> — křižovatky, které pakety posílají správným směrem</li>
						</ul>
						<h3>Internet a web</h3>
						<p><strong>Internet</strong> = celosvětové propojení sítí. <strong>Web</strong> je jedna z jeho služeb: prohlížeč (klient) si řekne o stránku na adrese <strong>URL</strong>, webový <strong>server</strong> ji pošle, prohlížeč vykreslí. Další služby: e-mail, streamování, hry, cloud.</p>
						<h3>Cloud a datacentra</h3>
						<p>👉 „Cloud" nejsou obláčky — jsou to <strong>obrovské haly plné serverů</strong> (datacentra). Tvoje fotky „v cloudu" leží na konkrétních discích, jen ne u tebe doma.</p>
					`,
					odkazy: [
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
						{ nazev: 'opocitacich.cz — digitální technologie', url: 'https://opocitacich.cz' },
						{ nazev: 'Datová Lhota (ČT :D)', url: 'https://decko.ceskatelevize.cz/datova-lhota' },
					],
				},
				{
					slug: 'bezpecnost-pocitace-a-dat',
					nazev: 'Bezpečnost — útoky a obrana',
					interakce: 'bezpecnost-pocitace',
					obsah: `
						<h2>Kdo útočí a proč</h2>
						<p>Útočníkům jde nejčastěji o <strong>peníze a data</strong>. Nejslabší článek? Většinou <strong>člověk</strong>, ne technika.</p>
						<h3>Nejčastější útoky</h3>
						<ul>
							<li><strong>phishing</strong> — podvodná zpráva „z banky/školy": klikni, přihlas se → heslo je pryč</li>
							<li><strong>škodlivé programy</strong> — vir/ransomware zašifruje soubory a chce výkupné</li>
							<li><strong>uhodnutí hesla</strong> — slabá a opakovaná hesla padnou za vteřiny</li>
						</ul>
						<h3>Vrstvy obrany</h3>
						<ul>
							<li>🔄 <strong>aktualizace</strong> systému i aplikací (záplaty děr)</li>
							<li>🛡️ <strong>antivir</strong> (hledá a blokuje škodlivé programy v souborech) a <strong>firewall</strong> (hlídač příchozích spojení ze sítě)</li>
							<li>🔑 silná hesla + <strong>dvoufázové ověření</strong> (k heslu ještě jednorázový kód z telefonu — samotné ukradené heslo pak útočníkovi nestačí)</li>
							<li>💾 <strong>zálohování</strong> — kopie důležitých dat jinde (druhý disk, cloud); nejspolehlivější způsob, jak se z ransomwaru dostat zpátky</li>
						</ul>
						<h3>Jak poznat phishing</h3>
						<ul>
							<li><strong>tlačí na čas</strong> — „účet bude do hodiny zablokován" má vypnout tvé přemýšlení</li>
							<li><strong>odkaz vede jinam</strong>, než tvrdí — na počítači na něj najeď myší a přečti si skutečnou adresu. Důležitá je část <strong>těsně před prvním lomítkem</strong>: v <em>mojebanka.csob.cz.prihlaseni-overeni.cz</em> je skutečnou adresou <em>prihlaseni-overeni.cz</em>, ne banka. Na mobilu na odkaz raději nesahej vůbec.</li>
							<li>adresa odesílatele skoro sedí, ale ne úplně — pozor, ani koncovka <em>.cz</em> sama o sobě nic nezaručuje</li>
							<li>👉 <strong>Banka ani škola po tobě nikdy nebude chtít heslo</strong> — ani mailem, ani po telefonu. Když si nejsi jistý/á, zavři zprávu a přihlas se sám/sama tak, jak jsi zvyklý/á.</li>
						</ul>
						<h3>Heslo, které vydrží</h3>
						<p>Silné heslo není krátké a plné divných znaků, ale hlavně <strong>dlouhé</strong> — třeba věta nebo tři nesouvisející slova. Do každé služby patří <strong>jiné</strong> heslo: když unikne jedno, útočník ho hned zkouší i jinde. Zapamatovat si všechna nejde, a proto se používá <strong>správce hesel</strong>.</p>
						<h3>Zálohování 3–2–1</h3>
						<p>Ověřené pravidlo: <strong>3</strong> kopie dat, na <strong>2</strong> různých typech úložiště (třeba disk v počítači + cloud), z toho <strong>1</strong> mimo domov. Záloha na témže disku je k ničemu — ransomware zašifruje i ji. A zálohu je potřeba <strong>občas vyzkoušet</strong>: nezkoušená záloha není záloha.</p>
						<p>👉 Když se to přesto stane: odpoj počítač od sítě, hesla měň <strong>z jiného zařízení</strong> a útok nahlas. Výkupné se platit nemá — zaplacení nezaručí vůbec nic a útočníka to jen povzbudí.</p>
						<p>👉 Žádná obrana není stoprocentní — cíl je útočníkovi práci co nejvíc <strong>ztížit</strong> a mít <strong>zálohu</strong> pro případ nejhoršího.</p>
					`,
					odkazy: [
						{ nazev: 'E-Bezpečí', url: 'https://www.e-bezpeci.cz' },
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.cz' },
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
					],
				},
				{
					slug: 'digitalni-stopa-a-identita',
					nazev: 'Digitální stopa a identita',
					obsah: `
						<h2>Co o tobě internet ví</h2>
						<p><strong>Digitální stopa</strong> = všechny záznamy, které po sobě v digitálním světě necháváš:</p>
						<ul>
							<li>co sám zveřejníš — fotky, komentáře, profily</li>
							<li>co se sbírá samo — poloha mobilu, historie vyhledávání, <strong>cookies</strong> (podle nich si weby pamatují tebe a tvé chování, proto tě reklama „pronásleduje"), metadata fotek (kdy a kde vznikly)</li>
						</ul>
						<h3>Algoritmy sociálních sítí</h3>
						<p>👉 Sítě ti ukazují to, u čeho <strong>zůstaneš nejdéle</strong> — ne to, co je pravdivé nebo důležité. Vědět to = první krok, jak se nenechat vodit.</p>
						<h3>Zásady digitální sebeobrany</h3>
						<ul>
							<li>sdílej s rozmyslem — internet <strong>nezapomíná</strong></li>
							<li>kontroluj nastavení soukromí a oprávnění aplikací</li>
							<li>nevěř všemu — ověřuj zdroje, pozor na podvržené fotky a videa</li>
							<li>svou <strong>digitální identitu</strong> (účty, přezdívky, pověst) si buduj jako vizitku — jednou ji uvidí i budoucí zaměstnavatel</li>
						</ul>
						<h3>Co udělat hned dnes (15 minut)</h3>
						<ol>
							<li>projdi si v mobilu <strong>oprávnění aplikací</strong> — hra opravdu nepotřebuje přístup ke kontaktům ani k poloze</li>
							<li>vypni ve fotoaparátu <strong>ukládání polohy</strong> k fotkám — jinak si snímek nese souřadnice místa, kde vznikl. U fotek, které jsi už poslal(a), to nic nespraví, poloha v nich zůstává; a čas a model telefonu v souboru zůstávají tak jako tak.</li>
							<li>otevři nastavení soukromí na sítích a podívej se, <strong>kdo tvé příspěvky doopravdy vidí</strong></li>
							<li>vyhledej si ve vyhledávači vlastní jméno — uvidíš zhruba to, co uvidí i ostatní</li>
						</ol>
						<h3>Když se objeví něco nepříjemného</h3>
						<p>Fotku ani zprávu, která ti ubližuje, neřeš sám/sama a hlavně <strong>neodpovídej útočníkovi</strong>. Ulož si důkaz (snímek obrazovky s datem), <strong>podej hlášení přímo v aplikaci</strong> a řekni to dospělému. Pomoc je i na lince <strong>116 111</strong>, která je zdarma a nonstop. O výmaz svých údajů jde požádat i provozovatele webu — <strong>právo na výmaz</strong> platí v celé Evropské unii. Požádat můžeš i <strong>sám/sama</strong>, za mladší děti to zařídí rodič; rodičům to ale řekni, pomůžou ti to dotáhnout. Není to jistota na sto procent — ze zákona existují výjimky, kdy se údaje smazat nesmějí.</p>
						<p>👉 Úplně smazat digitální stopu nejde — obsah bývá zkopírovaný jinam. Dá se ale <strong>zmenšit</strong> a hlavně od dneška zvětšovat pomaleji.</p>
					`,
					odkazy: [
						{ nazev: 'E-Bezpečí', url: 'https://www.e-bezpeci.cz' },
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.cz' },
						{ nazev: 'Jak na internet (CZ.NIC)', url: 'https://www.jaknainternet.cz' },
					],
				},
			],
		},
		{
			slug: 'zaverecne-projekty',
			nazev: 'Závěrečné projekty',
			podtemata: [
				{
					slug: 'zaverecny-projekt',
					nazev: 'Závěrečný projekt',
					obsah: `
						<h2>Ukaž, co umíš</h2>
						<p>Na závěr základní školy vytvoříš <strong>vlastní tvůrčí projekt</strong> — sám/sama nebo ve dvojici. Cíl: vyřešit skutečný problém a předvést tvůrčí přístup.</p>
						<h3>Náměty</h3>
						<ul>
							<li>🎮 dokončení větší hry ve Scratchi</li>
							<li>🤖 robot či micro:bit vynález (chytrá domácnost, měřicí stanice)</li>
							<li>🌐 webová stránka třídy, kroužku, obce</li>
							<li>📊 datový projekt — sesbírej data, zpracuj v tabulce, vytvoř grafy a závěry</li>
							<li>🏆 příprava na soutěž (robotika, programování, <a href="https://www.ibobr.cz" target="_blank" rel="noopener">Bobřík informatiky</a>)</li>
						</ul>
						<h3>Co se hodnotí</h3>
						<ol>
							<li><strong>návrh</strong> — popsání problému a plán řešení</li>
							<li><strong>realizace</strong> — funkčnost, rozklad na části, testování</li>
							<li><strong>prezentace</strong> — srozumitelné předvedení a vysvětlení, jak to funguje</li>
						</ol>
						<p>👉 Ta tři kritéria jsou zároveň <strong>tři fáze práce</strong>: nejdřív návrh, pak realizace, nakonec předvedení.</p>
						<h3>Jak si téma zúžit</h3>
						<p>Nejčastější chyba je téma příliš velké. „Chytrá domácnost" se za pár hodin udělat nedá, ale <strong>jedna konkrétní věc</strong> ano: čidlo, které pípne, když se otevřou dveře. Zeptej se sám sebe: <em>co přesně bude hotový projekt umět a jak poznám, že je hotový?</em> Kdo to neví, ladí donekonečna.</p>
						<h3>Rozvrhni si čas</h3>
						<ol>
							<li>rozděl práci na části a odhadni, kolik hodin každá zabere</li>
							<li>nech si <strong>rezervu na ladění</strong> — vždycky se něco pokazí</li>
							<li>měj co nejdřív hotovou <strong>nejjednodušší funkční verzi</strong> a teprve pak přidávej; polotovar, který jede, je lepší než skvělý nápad, který nikdy nespustíš</li>
						</ol>
						<h3>Na prezentaci si připrav</h3>
						<ul>
							<li>jakou úlohu projekt řeší a pro koho</li>
							<li>krátké předvedení naživo (a zálohu — video nebo snímky, kdyby technika zlobila)</li>
							<li>vysvětlení, <strong>jak to funguje</strong> — to je hlavní část hodnocení</li>
							<li>co nefungovalo a jak jsi to opravil(a); tohle není přiznání neúspěchu, ale právě ta část, která ukazuje, že jsi to dělal(a) sám/sama</li>
						</ul>
						<p>👉 Projekt je tvoje <strong>vizitka z informatiky</strong> — vyber si téma, které tě opravdu baví. Když se nakonec něco nepovede dotáhnout, popiš, kde to uvázlo a proč; to je poctivější (a lépe hodnocené) než tvrdit, že je hotovo.</p>
					`,
					odkazy: [
						{ nazev: 'Scratch — programuj online', url: 'https://scratch.mit.edu' },
						{ nazev: 'MakeCode — simulátor micro:bitu', url: 'https://makecode.microbit.org' },
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
		{
			slug: 'vex-iq',
			nazev: 'Robotika VEX IQ',
			podtemata: [
				{
					slug: 'vex-iq-navody',
					nazev: 'VEX IQ — návody a odkazy',
					interakce: 'vex-gyroskop',
					obsah: `
						<h2>🤖 Roboti VEX IQ v 9. ročníku</h2>
						<p>Pokračujeme s roboty VEX IQ — složitější konstrukce, přesná jízda s gyrem a autonomní úlohy.</p>
						<h3>Návody (z 8. ročníku)</h3>
						<ul>
						<li><a href="/informatika/8-rocnik/vex-iq/co-umi-vex-iq/">Co robot VEX IQ umí</a> — mozek, motory, ovladač, VEXcode</li>
						<li><a href="/informatika/8-rocnik/vex-iq/cidla-vex-iq/">Čidla VEX IQ — návod k použití</a> — nárazník, vzdálenost, barva, gyro + jak je číst v programu</li>
						</ul>
						<h3>Výzvy pro deváťáky</h3>
						<ol>
						<li><strong>Přesný čtverec</strong> — objeď čtverec 50×50 cm s gyrem (otáčky přesně 90°)</li>
						<li><strong>Parkování</strong> — zajeď do garáže a zastav 5 cm před zdí (čidlo vzdálenosti)</li>
						<li><strong>Sledovač čáry</strong> — projeď dráhu po černé čáře co nejrychleji (čidlo barvy)</li>
						<li><strong>Třídička</strong> — najdi kostky a roztřiď je podle barvy (rameno + čidlo barvy)</li>
						<li><strong>Soutěžní úloha</strong> — sestav a naprogramuj robota na letošní hru VIQRC</li>
						</ol>
						<h3>Proč zrovna gyro</h3>
						<p>Otočku o 90° jde zkusit i tak, že se spočítají otáčky kol — jenže kola po hladké podlaze <strong>prokluzují</strong> a robot se pokaždé otočí trochu jinak. <strong>Gyro</strong> měří skutečné natočení robota, takže hlídá úhel bez ohledu na to, co dělají kola. Proto je u přesného čtverce klíčové: chyba 3° se po čtyřech rozích sečte na 12 a robot skončí jinde, než začal.</p>
						<p>👉 U každé výzvy: nejdřív <strong>plán na papír</strong> (rozklad na části), pak program po kouscích testuj — jako u každého projektu. <strong>VIQRC</strong> je soutěž s roboty VEX IQ. Novou hru vyhlásí na začátku sezony a tým pak celý rok robota staví, přestavuje a ladí program — příprava je vlastně to hlavní, co se na soutěži zúročí.</p>
					`,
					odkazy: [
						{ nazev: 'VEXcode IQ — programování v prohlížeči', url: 'https://codeiq.vex.com' },
						{ nazev: 'Návod česky: první program ve VEXcode', url: 'https://lab.wonderly.cz/informatika/8-rocnik/vex-iq/vexcode-prvni-program/' },
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'pololetni-shrnuti',
					nazev: 'Pololetní shrnutí',
					obsah: `
						<h2>Co umíme po 1. pololetí</h2>
						<ul>
							<li><strong>Programovací projekty (Scratch II):</strong> plán projektu, testování a ladění, seznamy a proměnné, klonování, animace, tvorba vlastní hry</li>
						</ul>
						<p>👉 Souhrnný kvíz níže se skládá automaticky z otázek probraných podtémat.</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co umíme po 9. ročníku</h2>
						<ul>
							<li><strong>Projekty:</strong> plánování, ladění, seznamy, klony, hry — a vlastní závěrečný projekt</li>
							<li><strong>Digitální technologie:</strong> hardware a software, komprese, sítě a internet, bezpečnost, digitální stopa a identita</li>
						</ul>
						<p>👉 Souhrnný kvíz níže prověří celý ročník — dobrá příprava i na střední školu. Trénink: archiv <a href="https://www.ibobr.cz/test/archiv" target="_blank" rel="noopener">Bobříka informatiky</a> (Kadet).</p>
					`,
					odkazy: [
						{ nazev: 'iBobr — archiv testů', url: 'https://www.ibobr.cz/test/archiv' },
					],
				},
			],
		},
	],
	'pracovni-cinnosti/6-rocnik': [
		{
			slug: '3d-modelovani',
			nazev: '3D modelování',
			podtemata: [
				{
					slug: 'tinkercad',
					nazev: 'Návod: Tinkercad — 3D kreslení pro začátečníky',
					obsah: `
						<h2>Co je Tinkercad?</h2>
						<p><strong>Tinkercad</strong> je 3D kreslení zdarma přímo v prohlížeči — nic se neinstaluje. Skládáš hotová tělesa jako stavebnici a za pár minut máš vlastní 3D model, který jde i vytisknout na 3D tiskárně.</p>
						<p>ℹ️ <em>Toto téma nejede podle časového plánu — vracíme se k němu průběžně, kdykoli zbyde čas nebo chuť tvořit.</em></p>
						<h3>1️⃣ Přihlášení</h3>
						<ol>
							<li>Otevři <strong>tinkercad.com</strong> (QR dole) — prostředí jde dole na stránce <strong>přepnout do češtiny</strong></li>
							<li>Klikni na <strong>Přihlásit se / Join now</strong> — použij přístup od učitele (kód třídy a přezdívka, vlastní e-mail není potřeba)</li>
							<li>Vlevo zvol <strong>3D návrhy → Vytvořit nový návrh</strong></li>
						</ol>
						<h3>2️⃣ Ovládání pracovní plochy</h3>
						<ul>
							<li>🖱️ <strong>pravé tlačítko + tažení</strong> — otáčení pohledu kolem modelu</li>
							<li><strong>kolečko myši</strong> — přiblížení/oddálení</li>
							<li><strong>levé tlačítko</strong> — vybírání a přetahování těles</li>
							<li>kostka vlevo nahoře — rychlé pohledy (shora, zepředu…)</li>
						</ul>
						<h3>3️⃣ Základní postup — stavebnice těles</h3>
						<ol>
							<li>Z pravého panelu <strong>přetáhni těleso</strong> (kvádr, válec, střecha…) na plochu</li>
							<li><strong>Bílé úchyty</strong> v rozích = změna rozměrů (klikni na číslo a napiš přesnou hodnotu v mm)</li>
							<li><strong>Černá šipka nahoře</strong> = zvednutí tělesa nad plochu</li>
							<li><strong>Zakřivené šipky</strong> = otočení kolem osy</li>
						</ol>
						<h3>4️⃣ Kouzlo Tinkercadu: DÍRA</h3>
						<p>Každé těleso může být <strong>plné</strong>, nebo <strong>díra</strong> (šrafované). Když díru překryješ s plným tělesem a dáš <strong>Seskupit (Ctrl+G)</strong>, díra se z tělesa „vykousne". Tak vzniknou otvory, nápisy, klíčenky…</p>
						<h3>5️⃣ Užitečné nástroje</h3>
						<ul>
							<li><strong>Zarovnat (L)</strong> — vybraná tělesa srovná na střed či hranu</li>
							<li><strong>Zrcadlit (M)</strong> — převrátí těleso</li>
							<li><strong>Ctrl+D</strong> — duplikát; <strong>Ctrl+Z</strong> — krok zpět (nejdůležitější klávesa 🙂)</li>
						</ul>
						<h3>🎯 Úkoly na vyzkoušení (od nejlehčího)</h3>
						<ol>
							<li><strong>Jmenovka na lavici</strong> — kvádr + 3D text se jménem (seskupit)</li>
							<li><strong>Klíčenka</strong> — placka s textem a dírkou na kroužek (válec jako díra)</li>
							<li><strong>Domeček</strong> — kvádr + střecha + díry jako okna a dveře</li>
							<li><strong>Hrací kostka</strong> — krychle + zapuštěné puntíky (koule jako díry)</li>
						</ol>
						<h3>💾 Uložení a 3D tisk</h3>
						<p>Návrh se ukládá sám. Pro tisk: <strong>Export → .STL</strong> — soubor pak učitel pošle do 3D tiskárny.</p>
					`,
					odkazy: [
						{ nazev: 'Tinkercad — spustit v prohlížeči', url: 'https://www.tinkercad.com' },
					],
				},
				{
					slug: 'sketchup',
					nazev: 'Návod: SketchUp — přesnější 3D kreslení',
					obsah: `
						<h2>Co je SketchUp?</h2>
						<p><strong>SketchUp</strong> je druhý krok po Tinkercadu. Nekreslíš skládáním hotových těles, ale <strong>od čáry</strong>: nakreslíš půdorys a <strong>vytáhneš ho do výšky</strong>. Používají ho architekti a návrháři — webová verze <strong>SketchUp Free</strong> je zdarma v prohlížeči.</p>
						<p>ℹ️ <em>I toto téma děláme průběžně, bez pevného plánu. Nejdřív zvládni Tinkercad — SketchUp je přesnější, ale méně odpouští.</em></p>
						<h3>1️⃣ Spuštění</h3>
						<ol>
							<li>Otevři <strong>app.sketchup.com</strong> (QR dole) — prostředí je anglicky, ale vystačíš si s tímto českým návodem</li>
							<li>Přihlas se účtem od učitele a zvol <strong>Create new</strong> (šablona v milimetrech/metrech)</li>
						</ol>
						<h3>2️⃣ Nejdůležitější nástroje</h3>
						<ul>
							<li>✏️ <strong>Čára (L)</strong> — kreslí hrany; uzavřený obrys vytvoří plochu</li>
							<li>▭ <strong>Obdélník (R)</strong> a ⭕ <strong>Kružnice (C)</strong></li>
							<li>⬆️ <strong>Tlač/Táhni — Push/Pull (P)</strong> — KOUZLO SketchUpu: chytneš plochu a vytáhneš ji do 3D (zatlačení = díra)</li>
							<li>🔄 <strong>Orbit (O)</strong> + kolečko myši — otáčení a zoom pohledu</li>
							<li>📏 <strong>Metr (T)</strong> — měření a vodicí čáry</li>
						</ul>
						<h3>3️⃣ Přesné rozměry</h3>
						<p>Během kreslení prostě <strong>napiš čísla</strong> a stiskni Enter. Obdélník: táhni, napiš <strong>100;50</strong>, Enter → přesně 100 × 50 mm. Stejně funguje výška u Push/Pull.</p>
						<h3>🎯 Úkol: domeček se střechou</h3>
						<ol>
							<li>Obdélník 6 × 4 m → Push/Pull do výšky 3 m</li>
							<li>Čárou rozděl horní plochu uprostřed → nástrojem <strong>Přesun (M)</strong> zvedni čáru nahoru → sedlová střecha</li>
							<li>Na stěny nakresli obdélníky jako okna a dveře → Push/Pull mírně dovnitř</li>
						</ol>
						<h3>💡 Rady</h3>
						<ul>
							<li><strong>Ctrl+Z</strong> vrací krok — experimentuj beze strachu</li>
							<li>drž se <strong>barevných os</strong> (červená/zelená/modrá) — kreslíš pak rovně</li>
							<li>ulož přes <strong>Save</strong> — příště pokračuješ, kde jsi skončil</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'SketchUp Free — spustit v prohlížeči', url: 'https://app.sketchup.com' },
					],
				},
			],
		},
		{
			slug: 'shrnuti',
			nazev: 'Shrnutí a opakování',
			podtemata: [
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: `
						<h2>Co umíme po 6. ročníku</h2>
						<ul>
							<li><strong>Tinkercad</strong> — skládání 3D modelu z hotových těles, díra jako nástroj, zarovnání, měřítko a export pro 3D tisk</li>
							<li><strong>SketchUp</strong> — kreslení tvaru a vytažení do prostoru, přesné rozměry, orbit a měřítko</li>
						</ul>
						<p>👉 Souhrnný kvíz níže se skládá automaticky z otázek obou návodů — projdi si ho, až budeš chtít zjistit, co ti z 3D modelování zůstalo v hlavě.</p>
						<p>ℹ️ <em>3D modelování nejede podle časového plánu, vracíme se k němu průběžně. Shrnutí proto ber jako opakování, ne jako zkoušení k termínu.</em></p>
					`,
					odkazy: [
						{ nazev: 'Tinkercad — kreslit v prohlížeči', url: 'https://www.tinkercad.com' },
						{ nazev: 'SketchUp Free — spustit v prohlížeči', url: 'https://app.sketchup.com' },
					],
				},
			],
		},
	],
};

const f9Audio: Array<{ podtema: string } & Material> = [
	{ podtema: 'magnety-magneticke-pole-opakovani', druh: 'audio', nazev: 'Polemika: Proč magnet nepřitáhne každý kov 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-dialog1-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'magnety-magneticke-pole-opakovani', druh: 'audio', nazev: 'Polemika: Proč se stejné póly magnetu odpuzují 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-dialog2-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'magnety-magneticke-pole-opakovani', druh: 'audio', nazev: 'Polemika: Proč kompas ukazuje k severu 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-dialog3-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'magneticke-pole-vodice-a-civky', druh: 'audio', nazev: 'Polemika: Síla na vodič pohání i reproduktor 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/vodic-civka-dialog2-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'magneticke-pole-vodice-a-civky', druh: 'audio', nazev: 'Polemika: Pravidlo pravé ruky určí póly cívky 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/vodic-civka-dialog3-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'elektromagnet', druh: 'audio', nazev: 'Polemika: Proč jádro zesílí pole elektromagnetu 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-dialog1-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'elektromagnet', druh: 'audio', nazev: 'Polemika: Proč elektromagnet zvedne železo a vypne jistič 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-dialog2-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
	{ podtema: 'elektromagnet', druh: 'audio', nazev: 'Polemika: Jak elektromagnet ovládá zvonek i relé 🎧', cesta: '/media/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-dialog3-omnivoice.mp3', ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice).' },
];

const magnetickePole = temata['fyzika/9-rocnik'].find((tema) => tema.slug === 'magneticke-pole');
for (const { podtema: slug, ...audio } of f9Audio) {
	const podtema = magnetickePole?.podtemata?.find((item) => item.slug === slug);
	if (!podtema?.materialy) throw new Error(`Chybí podtéma F9: ${slug}`);
	podtema.materialy.push(audio);
}

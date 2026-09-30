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
	/**
	 * Úvod „Jednoduše řečeno" — 2–4 krátké věty prostým textem (bez HTML, bez čísel a
	 * vzorců), zobrazí se ve zvýrazněném boxu NAD výkladem. Do rozsahu výkladu
	 * se nepočítá (OBSAH-PRAVIDLA.md kap. 3 a 13).
	 */
	uvod?: string;
	/**
	 * Nadstavba „Pro zvídavé" — HTML BEZ obalu <details> (obal a nadpis přidá
	 * šablona), zobrazí se sbalená POD výkladem. Do rozsahu výkladu se nepočítá
	 * a kvíz z ní nesmí zkoušet nic, co není i v `obsah` nebo v `zapis`.
	 */
	zvidave?: string;
	materialy?: Material[];
	/** Externí odkazy k tématu — na stránce se ukážou s QR kódem pro naskenování */
	odkazy?: { nazev: string; url: string }[];
	/** Interaktivní prvek na stránce (komponenta se vybírá podle názvu) */
	interakce?: 'alternativni-motory' | 'alternator' | 'archimedes' | 'atom-molekuly' | 'barometr' | 'barva' | 'barvy' | 'bezpecna-vzdalenost-vedeni' | 'bezpecnost-pocitace' | 'binarni' | 'bludiste' | 'cara' | 'cas' | 'cocka' | 'decibely' | 'diagram' | 'difuze' | 'dioda' | 'draha' | 'duha' | 'el-polje' | 'elektricka-prace-a-vykon' | 'elektricke-pole' | 'elektrolyza' | 'elektromagnet' | 'elektromotor' | 'elektron' | 'elektrovani' | 'energia' | 'fotovoltaika' | 'funkce-tabulky' | 'galvanicky-clanek' | 'graf-cesta' | 'gravitacni-sila' | 'honicka' | 'hustota' | 'hydraulika' | 'hydrostatika' | 'indukce' | 'izotopy' | 'jaderna-energia' | 'jastina' | 'jiskra' | 'kadinky' | 'kalorimetr' | 'kladka' | 'klin' | 'klonovani' | 'kolobeh-vody' | 'kondenzace' | 'kvarky' | 'led-displej' | 'lom' | 'magnet' | 'magneticke-pole' | 'magnety-opakovani' | 'material' | 'mechanicka' | 'meridla' | 'mereni' | 'mesic' | 'microbit-radio' | 'microbit-vstupy' | 'motor' | 'motory-displej-zvuk' | 'naboj' | 'naklonena-rovina' | 'napeti' | 'nestejnoroda-lod' | 'obnovitelne-zdroje' | 'obvod' | 'odpor' | 'odpor-vodice' | 'odpor-vodice-zaklad' | 'odraz' | 'oersted' | 'ohm' | 'ohrev' | 'oko' | 'opakovani' | 'opakovani-velicin' | 'odskok' | 'ozobot' | 'ozvena' | 'paka' | 'pakety' | 'palivo' | 'ping-pong' | 'planety-vaha' | 'pohyb' | 'pokusy' | 'polares' | 'polovodic' | 'posuvny-otacivy' | 'povetrnostni-mapa' | 'prace' | 'premeny-energie' | 'prenos' | 'pretlak' | 'prevody' | 'projekt-robot' | 'promenne' | 'proton' | 'proud' | 'razeni-clanku' | 'razeni-filtrovani' | 'reaktor' | 'refleks' | 'relativita-pohybu' | 'rezonance' | 'reostat' | 'retezova-reakce' | 'rovinne-zrcadlo' | 'rozpad' | 'rozpinani-vesmiru' | 'rychlost' | 'rychlost-svetla' | 'senzory-robota' | 'sestaveni-robota' | 'seznamy' | 'sila-mag' | 'sila-vektor' | 'skakacka' | 'skatepark' | 'sketchup' | 'skladani-sil' | 'skupenstvi' | 'souradnice' | 'soustava' | 'spektrum' | 'stridavy-proud' | 'strilecka' | 'stupnice' | 'sublimace' | 'svacina' | 'tabulka-vzorce' | 'tani' | 'teleso-latka' | 'teplomer' | 'teziste' | 'tinkercad' | 'tlak' | 'tlak-plocha' | 'tlmeni' | 'transformator' | 'treni' | 'tuhnuti' | 'ucinky-proudu-a-bezpecnost' | 'ucinky-sily' | 'ucinnost-motoru' | 'ucinnost' | 'udalosti' | 'uzitky' | 'valec' | 'var' | 'vedeni' | 'vetveni' | 'vesmiruni' | 'vex-gyroskop' | 'vexcode' | 'vlastni-bloky' | 'vlneni' | 'vnitrni-energie' | 'vodic' | 'vrh' | 'vykon' | 'vyparovani' | 'vypocet-rychlosti' | 'vzajemne-pusobeni' | 'vznik-elektrickeho-proudu' | 'viny' | 'zachovani' | 'zakon' | 'zapojeni' | 'zrcadlo' | 'zrychleni' | 'zvuk';
	/** Druhá interaktivní simulace na téže stránce (zobrazí se pod první) */
	interakce2?: 'indukce-dve-civky' | 'kolejnice' | 'polovodic-dopovani' | 'prumer';
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Úvod do fyziky — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky/uvod-do-fyziky-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Tělesa a látky — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/telesa-a-latky/telesa-a-latky-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Částicové složení látek (1/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/casticove-slozeni-latek-atomy-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Částicové složení látek (3/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/casticove-slozeni-latek-difuze-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Částicové složení látek (2/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/casticove-slozeni-latek/casticove-slozeni-latek-pohyb-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Atomy a molekuly (1/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/atomy-a-molekuly-atom-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Atomy a molekuly (2/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/atomy-a-molekuly-molekuly-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Atomy a molekuly (3/3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/atomy-a-molekuly-smesi-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Skupenství látek a jejich vlastnosti — 1. díl',
							cesta: '/media/fyzika/6-rocnik/latka-a-teleso/skupenstvi-latek/skupenstvi-latek-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Vzájemné působení těles, síla — 1. díl',
							cesta: '/media/fyzika/6-rocnik/sila/vzajemne-pusobeni-teles-sila/vzajemne-pusobeni-teles-sila-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Gravitační síla a gravitační pole — 1. díl',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/gravitacni-sila-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA 2: Gravitační síla — 2. díl',
							cesta: '/media/fyzika/6-rocnik/sila/gravitacni-sila/gravitacni-sila-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Délka – jak měřit správně (díl 3 ze 3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/delka-mereni-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Délka — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/delka-meridla-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Délka – metr a převody (díl 1 ze 3) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/delka/delka-metr-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Hmotnost — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hmotnost/hmotnost-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkast: Objem — dialog',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/objem/objem-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Hustota — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/hustota/hustota-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Souhrnné opakování fyzikálních veličin (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/souhrnne-opakovani-velicin/souhrnne-opakovani-velicin-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Souhrnné opakování fyzikálních veličin (díl 2 ze 2) — 2. díl',
							cesta: '/media/fyzika/6-rocnik/fyzikalni-veliciny/souhrnne-opakovani-velicin/souhrnne-opakovani-velicin-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Čas a jeho měření (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/cas/cas-a-jeho-mereni/cas-a-jeho-mereni-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA 2: Čas a jeho měření — 2. díl',
							cesta: '/media/fyzika/6-rocnik/cas/cas-a-jeho-mereni/cas-a-jeho-mereni-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Teplota a její měření (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/teplota-a-jeji-mereni-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA 2: Teplota a její měření — 2. díl',
							cesta: '/media/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/teplota-a-jeji-mereni-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Teplotní roztažnost (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/teplota/teplotni-roztaznost/teplotni-roztaznost-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA 2: Teplotní roztažnost — 2. díl',
							cesta: '/media/fyzika/6-rocnik/teplota/teplotni-roztaznost/teplotni-roztaznost-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Magnetické vlastnosti látek, magnetické pole — 1. díl',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/magneticke-vlastnosti-latek/magneticke-vlastnosti-latek-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Elektrické vlastnosti látek (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/elektricke-vlastnosti-latek/elektricke-vlastnosti-latek-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Elektrické vlastnosti látek (díl 2 ze 2) — 2. díl',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/elektricke-vlastnosti-latek/elektricke-vlastnosti-latek-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Jednoduché elektrické obvody (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/jednoduche-elektricke-obvody/jednoduche-elektricke-obvody-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Jednoduché elektrické obvody (díl 2 ze 2) — 2. díl',
							cesta: '/media/fyzika/6-rocnik/elektrina-a-magnetismus/jednoduche-elektricke-obvody/jednoduche-elektricke-obvody-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
					materialy: [
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pololetní shrnutí (díl 1 ze 4) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pololetni-shrnuti/pololetni-shrnuti-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pololetní shrnutí (díl 2 ze 4) — 2. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pololetni-shrnuti/pololetni-shrnuti-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pololetní shrnutí (díl 3 ze 4) — 3. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pololetni-shrnuti/pololetni-shrnuti-dialog3.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pololetní shrnutí (díl 4 ze 4) — 4. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pololetni-shrnuti/pololetni-shrnuti-dialog4.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
					],
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pokusy (díl 1 ze 2) — 1. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pokusy/pokusy-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Pokusy (díl 2 ze 2) — 2. díl',
							cesta: '/media/fyzika/6-rocnik/shrnuti/pokusy/pokusy-dialog2.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
					odkazy: [{"nazev":"O pohybu (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/pohyb/o-pohybu"},{"nazev":"Pohyb tělesa (Fyzika na Vltavě)","url":"https://www.zsvltava.cz/fyzika/?p=805"}],
					slug: 'klid-a-pohyb-telesa',
					nazev: 'Klid a pohyb tělesa',
					interakce: 'relativita-pohybu',
					obsah: "<h2>Klid a pohyb tělesa</h2>\n\n<p>Těleso je <strong>v pohybu</strong>, když mění svou polohu vůči jinému tělesu. Je <strong>v klidu</strong>, když svou polohu vůči němu nemění. Vždy proto musíme uvést, vůči jakému tělesu (kdo, nebo co je pozorovatel) klid nebo pohyb posuzujeme.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-08.svg\" alt=\"Žena vejde do výtahu a vyjede nahoru: vůči výtahu je v klidu, vůči muži v přízemí v pohybu\" /></a><figcaption>Žena ve výtahu je vůči výtahu v klidu, ale vůči muži v přízemí v pohybu.</figcaption></figure>\n<p>Sedící cestující ve vlaku je v klidu vůči spolucestujícímu na vedlejším sedadle. Vůči dítěti, které stojí u přejezdu a mává projíždějícímu vlaku, je ale v pohybu. Stejné těleso může být v klidu vůči jednomu tělesu a zároveň v pohybu vůči jinému.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-01.jpg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-01.jpg\" alt=\"Dvě dívky sedí vedle sebe u okna ve vlaku a dívají se do mobilů\" /></a><figcaption>Spolucestující vedle sebe jsou vůči sobě v klidu, vůči krajině za oknem se ale pohybují.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-04.svg\" alt=\"Cestující ve vlaku je v klidu vůči spolucestujícímu a v pohybu vůči dítěti u přejezdu\" /></a><figcaption>Stejný cestující je v klidu vůči spolucestujícímu a zároveň v pohybu vůči dítěti u přejezdu.</figcaption></figure>\n<p>Může se pohybovat strom? Ano. Vůči řidiči jedoucího auta strom mění polohu, a proto se pohybuje. Spolu se Zemí se navíc pohybuje i vůči Slunci. Klid a pohyb tělesa proto vždy závisí na tom, s čím je srovnáváme (odborně: jsou relativní).</p>\n<h3>Trasa pohybu (trajektorie): kudy těleso prochází</h3>\n<p>Čára, kterou těleso opíše při pohybu, se nazývá trajektorie. V běžném životě říkáme trasa. Může být vidět, třeba stopa lyžaře ve sněhu, čára tužky na papíře nebo vlak na kolejích. Nebo si ji jen představujeme.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-02.jpg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-02.jpg\" alt=\"Ruka se štětcem maluje na bílý papír zvlněnou černou čáru\" /></a><figcaption>Stopa štětce na papíře je trajektorie — stejně jako čára tužky.</figcaption></figure>\n<h3>Přímočarý a křivočarý pohyb</h3>\n<p>Podle tvaru trasy rozlišujeme dva druhy pohybu.</p>\n<ul>\n<li><strong>Přímočarý pohyb:</strong> trasou je přímka nebo úsečka. Takhle jede výtah, zboží na pásu u pokladny, letadlo při dálkovém letu nebo padá šiška ze stromu.</li>\n<li><strong>Křivočarý pohyb:</strong> trasou je jakákoli křivka, ne přímka. Příkladem je slalom lyžaře, kličkování zajíce, let dravce při lovu, pohyb dítěte na kolotoči nebo míč při volejbalu.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-07.svg\" alt=\"Přímočarý pohyb (výtah) a křivočarý pohyb (slalom lyžaře)\" /></a><figcaption>Přímočarý pohyb má za trajektorii přímku, křivočarý pohyb křivku.</figcaption></figure>\n<h3>Dráha: jakou délku těleso urazilo</h3>\n<p><strong>Dráha</strong> je délka trasy, kterou těleso urazilo. Značíme ji <strong>s</strong> a měříme v metrech (m); použít můžeme i jiné jednotky délky.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-06.svg\" alt=\"Dráha s: základní jednotka metr, další jednotky km, cm, mm\" /></a><figcaption>Dráha se značí s a měří se v metrech; můžeme použít i jiné jednotky délky.</figcaption></figure>\n<p>Trasa a dráha nejsou totéž: trasa je čára, dráha je její délka. V běžném životě se slovo dráha používá i jinak, třeba oválná závodní dráha, dráha planety nebo dráha střely. Ve všech těchto případech myslíme tvar čáry, tedy trasu (trajektorii) — ne její délku.</p>\n<p>Příklad: auto jede z Prahy do Ostravy. Trajektorie je modrá křivka na mapě. Dráha je délka této křivky, asi 371 km.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/klid-a-pohyb-obr-03.svg\" alt=\"Zjednodušená mapka cesty autem z Prahy do Ostravy: trajektorie je modrá křivka, dráha asi 371 km\" /></a><figcaption>Modrá křivka je trajektorie auta z Prahy do Ostravy, její délka (dráha) je asi 371 km.</figcaption></figure>",
					uvod: "Sedíš v jedoucím autě vedle mámy. Oproti mámě se nehýbeš, pořád sedíte vedle sebe. Oproti domům za okénkem se ale hýbeš, protože je míjíš. Hýbat se tedy vždycky znamená hýbat se oproti něčemu.",
					zvidave: "<p>Sedící cestující ve vlaku je v klidu i vůči svému sedadlu — vůči všemu, co jede s ním.</p>\n<p>Trasu letícího ptáka nevidíme, musíme si ji jen představit.</p>",
					zapis: {"jednotky":["dráha — délka trajektorie, značka s, jednotka m (metr)"],"body":["Pohyb: těleso mění polohu vzhledem k jinému tělesu.","Klid: těleso nemění polohu vzhledem k jinému tělesu.","Klid a pohyb jsou relativní — uvádíme, vzhledem k jakému tělesu (pozorovatel).","Trajektorie (trasa) — čára, po které se těleso pohybuje.","Pohyb je přímočarý, nebo křivočarý."]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Základy pohybu tělesa: Jak se věci hýbou?',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa/infografika-zaklady-pohybu.jpg',
						},
					],
				},
				{
					odkazy: [{"nazev":"Valení (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/pohyb/valeni"}],
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
					odkazy: [{"nazev":"Rychlost, dráha, čas: vzorce – 7. ročník (Umíme to)","url":"https://www.umimefakta.cz/fyzika/cviceni-rychlost-draha-cas-vzorce-7-trida"},{"nazev":"Rychlost – výpočet rychlosti, času, dráhy (Dopočítej.cz)","url":"https://www.dopocitej.cz/fyzika/rychlost.html"}],
					slug: 'rychlost-draha-cas',
					nazev: 'Rychlost, dráha, čas',
					interakce: 'rychlost',
					obsah: "<h2>Rychlost, dráha, čas</h2>\n<p>Rychlejšího závodníka poznáme podle toho, že urazí stejnou dráhu za kratší čas. <strong>Rychlost</strong> říká, jak rychle se něco pohybuje. Ukazuje, jakou dráhu těleso urazí za jednotku času, nejčastěji za 1 sekundu nebo za 1 hodinu. Čím delší dráhu urazí za stejnou dobu, tím je rychlejší. Když jede auto stálou rychlostí 20 m/s, urazí každou sekundu 20 metrů.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-13.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-13.svg\" alt=\"Auto ujede každou sekundu 20 metrů: polohy 0, 20, 40 a 60 m v časech 0 až 3 s\" /></a><figcaption>Auto stálou rychlostí 20 m/s urazí každou sekundu 20 metrů.</figcaption></figure>\n<p>Rychlost značíme <strong>v</strong>, dráhu <strong>s</strong> a čas <strong>t</strong>. Platí mezi nimi vzorec:</p>\n<p style=\"font-size:1.3rem\"><strong>v = s : t</strong></p>\n<p>Rychlost je dráha dělená časem. V jednotce rychlosti je nahoře dráha (metry, kilometry) a dole čas (sekundy, hodiny), proto dráhu dělíme časem. Když ze vzorce vyjádříme dráhu nebo čas, dostaneme dva další vzorce: <strong>s = v · t</strong> a <strong>t = s : v</strong>. Dosazujeme jen jednotky, které k sobě patří: metry a sekundy (rychlost vyjde v m/s), nebo kilometry a hodiny (rychlost vyjde v km/h). Příklad: těleso urazí 30 m za 3 s, jeho rychlost je v = 30 : 3 = <strong>10 m/s</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-07.svg\" alt=\"Těleso urazí 30 m za 3 s: polohy po sekundách 0, 10, 20 a 30 m, výpočet 30 : 3 = 10 m/s\" /></a><figcaption>Dráha 30 m za 3 s: v = s : t = 30 : 3 = 10 m/s.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-08.svg\" alt=\"Tabulka veličin rychlost, dráha a čas s jednotkami a vzorcový trojúhelník\" /></a><figcaption>Značky a jednotky veličin a z trojúhelníku vyčtené vzorce v = s : t, s = v · t a t = s : v.</figcaption></figure>\n\n<h3>Jednotky rychlosti</h3>\n<p>Základní jednotkou je <strong>metr za sekundu (m/s)</strong>. V běžném životě se nejčastěji používá <strong>kilometr za hodinu (km/h)</strong>. Další jednotky vznikají spojením jednotky délky a času, třeba km/s, m/min nebo cm/s. V USA a ve Velké Británii se používá míle za hodinu (mph), v letectví a na moři uzel — jedna námořní míle za hodinu.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-17.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-17.svg\" alt=\"Jednotky rychlosti: m/s, km/h, mph a uzel\" /></a><figcaption>Základní jednotka je m/s, v běžném životě se nejčastěji používá km/h; mph a uzel se používají v USA, ve Velké Británii, v letectví a na moři.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-06.svg\" alt=\"Vzorec v = s : t: metry a sekundy dají m/s, kilometry a hodiny dají km/h\" /></a><figcaption>Do vzorce dosazujeme jen jednotky, které k sobě patří.</figcaption></figure>\n\n<h3>Převod mezi m/s a km/h</h3>\n<p>Platí <strong>1 m/s = 3,6 km/h</strong>. Mezi jednotkami se proto <strong>násobí nebo dělí číslem 3,6</strong> — desetinná čárka se nikam neposouvá. Hodina má 3 600 sekund a kilometr má 1 000 metrů, z toho číslo 3,6 vychází.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-15.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-15.svg\" alt=\"Odkud se bere číslo 3,6: 1 km = 1 000 m, 1 h = 3 600 s, 3 600 : 1 000 = 3,6\" /></a><figcaption>Číslo 3,6 vychází z 3 600 sekund v hodině a 1 000 metrů v kilometru.</figcaption></figure>\n<ul>\n<li>Z m/s na km/h: <strong>násob 3,6</strong> (10 m/s = 36 km/h)</li>\n<li>Z km/h na m/s: <strong>děl 3,6</strong> (36 km/h = 10 m/s)</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-01.svg\" alt=\"Převod m/s a km/h: násobíme nebo dělíme číslem 3,6, například 10 m/s = 36 km/h\" /></a><figcaption>Z m/s na km/h násobíme 3,6, z km/h na m/s dělíme 3,6; desetinná čárka se neposouvá.</figcaption></figure>\n<p>Když se mění jen jednotka délky, posouváme čárku jako u délek: 8 km/s je 8 000 m/s, 1 cm/s je 0,01 m/s. Když se mění jen jednotka času, počítáme logicky: 2 m/s znamená 2 metry za sekundu, minuta má 60 sekund, takže za minutu urazí 120 metrů. Proto 2 m/s = 120 m/min.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-16.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-16.svg\" alt=\"Převod, když se mění jen jedna jednotka: 8 km/s = 8 000 m/s, 1 cm/s = 0,01 m/s, 2 m/s = 120 m/min\" /></a><figcaption>Když se mění jen jednotka délky nebo jen jednotka času, počítáme podle logiky.</figcaption></figure>\n\n<h3>Okamžitá rychlost</h3>\n<p><strong>Okamžitá rychlost</strong> ukazuje, jak rychle se těleso pohybuje v daném okamžiku. Měříme ji tachometrem v autě nebo na kole a policejním radarem. Rychlost větru měří anemometr (vrtulka s kalíšky), přibližně ji ukáže větrný rukáv na letišti.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-02.svg\" alt=\"Čím měříme rychlost: tachometr, policejní radar, anemometr a větrný rukáv\" /></a><figcaption>Okamžitou rychlost měříme tachometrem a radarem, rychlost větru anemometrem; přibližně ji ukáže větrný rukáv.</figcaption></figure>\n\n<h3>Rovnoměrný a nerovnoměrný pohyb</h3>\n<p>Když se rychlost tělesa po celou dobu pohybu nemění, koná <strong>rovnoměrný pohyb</strong>. Těleso za stejné doby urazí vždy stejné dráhy. Tak se pohybuje eskalátor (jezdící schody), hodinová ručička nebo auto na úseku dálnice.</p>\n<p>Když se rychlost během pohybu mění, jde o <strong>nerovnoměrný pohyb</strong>, třeba jízda vlaku z Ostravy do Prahy, kola do kopce a z kopce nebo auta městem přes křižovatky. Pohyb může mít několik částí: auto jede ve městě 50 km/h, na křižovatkách stojí a za městem jede 90 km/h.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-19.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-19.svg\" alt=\"Tabulka: rovnoměrný a nerovnoměrný pohyb, jejich rychlost a příklady\" /></a><figcaption>Rovnoměrný pohyb má stálou rychlost, u nerovnoměrného se rychlost mění.</figcaption></figure>\n<p>Nerovnoměrný pohyb je <strong>zrychlený</strong>, když se rychlost postupně zvětšuje (rozjíždění autobusu, start rakety, volný pád). Je <strong>zpomalený</strong>, když se rychlost postupně zmenšuje (brzdění vlaku).</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-20.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-20.svg\" alt=\"Poloha tělesa po každé sekundě: u zrychleného pohybu se rozestupy zvětšují, u zpomaleného zmenšují\" /></a><figcaption>Zrychlený pohyb: za stejné doby stále delší dráha. Zpomalený pohyb: za stejné doby stále kratší dráha.</figcaption></figure>\n\n<h3>Graf rychlosti a času</h3>\n<p>Graf ukazuje, jak se okamžitá rychlost mění v čase. Na svislou osu vynášíme rychlost, na vodorovnou čas. Z tvaru čáry poznáme druh pohybu: vodorovná čára je rovnoměrný pohyb, stoupající čára zrychlený a klesající čára zpomalený. Vodorovná čára na nule znamená klid. U profesionálních řidičů průběh rychlosti zapisuje tachograf, aby se kontrolovala rychlost i povinné přestávky.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-05.svg\" alt=\"Graf rychlosti na čase s úseky klid, zrychlený, zpomalený a rovnoměrný pohyb\" /></a><figcaption>Z tvaru čáry v grafu poznáme klid, zrychlený, zpomalený a rovnoměrný pohyb.</figcaption></figure>\n\n<h3>Průměrná rychlost</h3>\n<p><strong>Průměrná rychlost</strong> je celá dráha dělená celým časem pohybu, i když se rychlost po cestě měnila. Počítáme ji stejným vzorcem v = s : t. U rovnoměrného pohybu je stejná jako okamžitá rychlost. U nerovnoměrného pohybu je to rychlost, kterou by těleso muselo mít, kdyby jelo rovnoměrně a urazilo stejnou dráhu za stejný čas.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-22.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-22.svg\" alt=\"Okamžitá rychlost (tachometr) a průměrná rychlost (celá dráha : celý čas)\" /></a><figcaption>Okamžitá rychlost platí v daném okamžiku, průměrná rychlost je celá dráha dělená celým časem.</figcaption></figure>\n<p>Příklad: Franta a Pepa vyrazili ze školy domů zároveň. Pepa jel část cesty na motorce 50 km/h a zbytek šel pěšky 5 km/h. Franta jel celou cestu na kole stálou rychlostí 20 km/h. Domů dorazili ve stejný okamžik, a tak byla průměrná rychlost obou stejná, 20 km/h.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-23.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/rychlost-draha-cas-obr-23.svg\" alt=\"Franta na kole 20 km/h a Pepa na motorce 50 km/h a pěšky 5 km/h dorazí domů zároveň\" /></a><figcaption>Franta a Pepa vyrazili zároveň a dorazili zároveň, průměrná rychlost obou je 20 km/h.</figcaption></figure>",
					uvod: "Představ si závod v běhu s kamarádem. Kdo za stejnou dobu doběhne dál, ten je rychlejší. Rychlost tedy říká, jak daleko se za nějakou dobu dostaneš.",
					zvidave: "<p>Metry za sekundu se hodí třeba u běžce. Kilometry za hodinu známe z rychloměru v autě.</p>\n<h3>Graf dráhy a času</h3>\n<p>Pohyb zakreslíme do grafu, kde je na jedné ose čas a na druhé dráha. U rovnoměrného pohybu je graf <strong>přímka</strong>, protože rychlost se nemění. U nerovnoměrného pohybu přímka není.</p>\n<h3>Počítáme</h3>\n<p>Auto jede rychlostí 72 km/h. Kolik je to metrů za sekundu?</p>\n<p>v = 72 : 3,6 = <strong>20 m/s</strong></p>\n<p>A naopak: cyklista jede rychlostí 5 m/s. Kolik to je v km/h?</p>\n<p>v = 5 · 3,6 = <strong>18 km/h</strong></p>\n<p>Autobus ujel 60 km za 90 minut. Jaká byla jeho průměrná rychlost v km/h?</p>\n<p>90 min = 1,5 h<br>v = s : t = 60 : 1,5 = <strong>40 km/h</strong></p>\n<p>💡 Zkouška po hlavě: 1,5 · 40 = 60 km — souhlasí.</p>",
					zapis: {"vzorec":"v = s : t;  s = v · t;  t = s : v","jednotky":["v — rychlost (m/s, km/h)","s — dráha (m, km), t — čas (s, h)","1 m/s = 3,6 km/h (násob, děl 3,6)"],"body":["rovnoměrný pohyb — v se nemění; nerovnoměrný — mění se","průměrná rychlost = celá dráha : celý čas","Příklad: 30 m : 3 s = 10 m/s"]},
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
					odkazy: [{"nazev":"Příklady na výpočet rychlosti (+ řešení) (Fyzika na Vltavě)","url":"https://www.zsvltava.cz/fyzika/?p=6054"},{"nazev":"Rychlost, dráha, čas – 7. ročník (Umíme to)","url":"https://www.umimefakta.cz/fyzika/cviceni-rychlost-draha-cas-7-trida"}],
					slug: 'priklady-na-vypocet-rychlosti',
					nazev: 'Příklady na výpočet rychlosti',
					interakce: 'vypocet-rychlosti',
					obsah: "<h2>Příklady na výpočet rychlosti</h2>\n<p>Vzorec <strong>v = s : t</strong> teď použijeme na skutečné úlohy. Nejdřív zjistíme, co známe, pak dosadíme a výsledek napíšeme i s jednotkou. Jednotky musí k sobě patřit: km/h — km — h, nebo m/s — m — s. Když je zadání míchá, nejdřív je převedeme (1 km = 1 000 m, 1 h = 3 600 s). Z m/s na km/h násobíme 3,6, opačně dělíme 3,6.</p>\n\n<h3>Grafy rovnoměrného pohybu</h3>\n<p>Při rovnoměrném pohybu se rychlost nemění (v = konst.), a proto je graf rychlosti <strong>vodorovná přímka</strong>. Auto na dálnici jede třeba pořád 130 km/h.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-01.svg\" alt=\"Graf rychlosti auta na dálnici: vodorovná přímka na 130 km/h během 15 minut\" /></a><figcaption>Rovnoměrný pohyb: graf rychlosti je vodorovná přímka.</figcaption></figure>\n<p>Těleso urazí za stejné časy stejné dráhy. Tomáš se pohybuje stálou rychlostí 5 m/s, tedy 300 m za minutu: za 2 min 600 m, za 4 min 1 200 m, za 6 min 1 800 m. Dráha je <strong>přímo úměrná času</strong> a graf dráhy je <strong>rostoucí přímka</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-02.svg\" alt=\"Graf dráhy Tomáše: přímka rostoucí o 300 m za každou minutu, 10 minut\" /></a><figcaption>Graf dráhy při stálé rychlosti 5 m/s je rostoucí přímka.</figcaption></figure>\n<p>U nerovnoměrného pohybu graf dráhy přímka není. Tři auta měříme po 5, 10 a 15 s a mají ujeto a) 40, 120, 220 m, b) 100, 200, 300 m, c) 100, 180, 220 m. Jen auto b) urazí za každých 5 s stejnou dráhu (100 m), jen jeho body leží na přímce, a koná tedy rovnoměrný pohyb.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-07.svg\" alt=\"Tři úseky jízdy auta po 5 sekundách: zrychluje (40, 80, 100 m), jede rovnoměrně (3krát 100 m), zpomaluje (100, 80, 40 m)\" /></a><figcaption>Auto zrychluje, jede rovnoměrně a zpomaluje: dráhy za stejné časy.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-08.svg\" alt=\"Prázdný graf dráhy s časem 5, 10 a 15 sekund a dráhou do 300 m pro zakreslení bodů 100, 200 a 300 m\" /></a><figcaption>Prázdný graf dráhy k dokreslení.</figcaption></figure>\n<ol>\n<li>nakresli kolmé osy se šipkami — čas je vždy vodorovně</li>\n<li>ke každé ose napiš značku veličiny a jednotku</li>\n<li>na obě osy narýsuj rovnoměrnou stupnici podle hodnot</li>\n<li>vynes body z tabulky a spoj je čarou</li>\n</ol>\n\n<h3>Srovnání rychlostí</h3>\n<p>Porovnáváme dráhu ujetou za 1 s. Nákladní auto ujede 60 m za 4 s: v = 60 : 4 = <strong>15 m/s</strong>. Osobní auto ujede stejných 60 m za 3 s: v = 60 : 3 = <strong>20 m/s</strong>. Osobní auto je rychlejší o 5 m za sekundu.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-10.svg\" alt=\"Nákladní auto na silnici se značkami po 15 metrech: 60 m ujede za 4 sekundy\" /></a><figcaption>Nákladní auto: 60 m za 4 s, tedy 15 m/s.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-11.svg\" alt=\"Osobní auto na silnici se značkami po 20 metrech: 60 m ujede za 3 sekundy\" /></a><figcaption>Osobní auto: 60 m za 3 s, tedy 20 m/s.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-13.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-13.svg\" alt=\"Dvě karty s výpočtem: 60 m děleno 4 s je 15 m/s a 60 m děleno 3 s je 20 m/s\" /></a><figcaption>Výpočet rychlosti nákladního a osobního auta.</figcaption></figure>\n\n<h3>Výpočet rychlosti</h3>\n<p><strong>Příklad 1: Cesta autem</strong><br>Auto ujelo 200 km za 4 hodiny. Jaká byla jeho průměrná rychlost?</p>\n<ul>\n<li>zapíšeme, co známe: s = 200 km, t = 4 h</li>\n<li>vzorec: v = s : t</li>\n<li>dosadíme: v = 200 : 4</li>\n<li>výsledek: v = <strong>50 km/h</strong></li>\n</ul>\n<p><strong>Příklad 2: Krátký běh</strong><br>Žák uběhl 100 m za 20 sekund. Jaká byla jeho průměrná rychlost?</p>\n<p>v = s : t = 100 : 20 = <strong>5 m/s</strong>. Na km/h: 5 · 3,6 = 18 km/h.</p>\n<p>Minuty na hodiny převedeme dělením šedesáti.</p>\n<p><strong>Příklad 3: Turistický výlet</strong><br>Turisté ušli 3 km za 36 minut. Vypočítej jejich rychlost v km/h.</p>\n<p>36 min = 36 : 60 = 0,6 h.<br>v = s : t = 3 : 0,6 = <strong>5 km/h</strong></p>\n<p><strong>Příklad 4: Dopravní letadlo</strong><br>Letadlo uletělo 585 km za 1 hodinu 18 minut. Vypočítej jeho průměrnou rychlost.</p>\n<p>18 min = 18 : 60 = 0,3 h, celý čas je 1 h + 0,3 h = 1,3 h.<br>v = s : t = 585 : 1,3 = <strong>450 km/h</strong></p>\n<p>⚠️ <strong>Pozor na častou chybu:</strong> kdo zapomene na celou hodinu a dělí jen 0,3 h, vyjde mu 585 : 0,3 = 1 950 km/h. Tak rychle dopravní letadla nelétají. Minuty vždy převeď a přičti k celým hodinám.</p>\n\n<h3>Jízdní řád a navigace</h3>\n<p>Z jízdního řádu vyčteme: 2 km za 3 min, 5 km za 6 min, 8 km za 9 min a 12 km za 12 min. Podle tabulky nakreslíme graf (čas v min vodorovně, dráha v km svisle). Z něj odhadneme, že 3 km autobus ujel asi za 4 min a za 7 min asi 6 km.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-14.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-14.svg\" alt=\"Jízdní řád spoje Lipová – Dub: 12 km za 12 minut, časy odjezdů 10:40 až 10:52 na zastávkách\" /></a><figcaption>Z jízdního řádu určíme dráhu a čas jízdy.</figcaption></figure>\n<p>Průměrnou rychlost spočítáme z celé jízdy: 12 km za 12 min, tedy 1 km za minutu. Hodina má 60 minut, takže v = 1 · 60 = <strong>60 km/h</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-16.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-16.svg\" alt=\"Výpočet rychlosti autobusu: čas 10:52 minus 10:40 je 12 minut, dráha 12 km, tedy 1 km za minutu, 60 km/h\" /></a><figcaption>Rychlost spoje z jízdního řádu vychází 60 km/h.</figcaption></figure>\n<p>Délku trasy a čas ukazuje i navigace. Modrá trasa: 15 km za 15 min, tedy 60 km/h. Šedá objížďka: 18 km za 24 min, tedy 3 km za 4 min. V hodině je 15 čtyřminutovek, 15 · 3 = <strong>45 km/h</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-17.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-17.svg\" alt=\"Schematická mapa s vymyšlenými místy Louka a Skála: modrá trasa 15 km za 15 minut (60 km/h) a objížďka 18 km za 24 minut (45 km/h)\" /></a><figcaption>Kratší trasa není vždy nejrychlejší: srovnání rychlostí.</figcaption></figure>\n\n<h3>Dráha a čas, dva pohyby v jednom grafu</h3>\n<p>Dráha se vypočítá jako součin rychlosti a času: <strong>s = v · t</strong>. Čas určíme jako podíl dráhy a rychlosti: <strong>t = s : v</strong>.</p>\n<p><strong>Příklad 5: Jak daleko dojde Tomáš?</strong><br>Tomáš se pohybuje stálou rychlostí 5 m/s. Jak velkou dráhu urazí za 6 minut?</p>\n<p>Rychlost je v m/s, proto čas převedeme na sekundy: t = 6 min = 6 · 60 s = 360 s.<br>s = v · t = 5 · 360 = <strong>1 800 m</strong></p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-03.svg\" alt=\"Řešený příklad: rychlost 5 m/s po dobu 6 minut, tedy 360 s, dá dráhu 1 800 m\" /></a><figcaption>Dráha při rychlosti 5 m/s za 6 minut je 1 800 m.</figcaption></figure>\n<p><strong>Příklad 6: Za jak dlouho dojde Tomáš?</strong><br>Tomáš se pohybuje stálou rychlostí 5 m/s. Za jak dlouho urazí 3 km?</p>\n<p>Dráhu převedeme na metry: s = 3 km = 3 000 m.<br>t = s : v = 3 000 : 5 = 600 s = <strong>10 min</strong></p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-04.svg\" alt=\"Řešený příklad: dráha 3 km, tedy 3 000 m, při rychlosti 5 m/s trvá 600 s, tedy 10 minut\" /></a><figcaption>Dráha 3 km při rychlosti 5 m/s zabere 10 minut.</figcaption></figure>\n<p>Do jednoho grafu můžeme kreslit pohyby více těles. Výpočet a graf se u stejného pohybu musí shodovat.</p>\n<p><strong>Příklad 7: Traktor a automobil</strong><br>Z města vyjel v 8:00 traktor rychlostí 40 km/h. V 8:30 za ním stejnou cestou vyjel automobil rychlostí 80 km/h. Kdy a kde se potkají?</p>\n<ul>\n<li>traktor: za 15 min ujede 10 km, za 30 min 20 km, za 60 min 40 km</li>\n<li>automobil: za 15 min ujede 20 km, za 30 min 40 km, za 60 min 80 km</li>\n<li>graf automobilu je posunutý o 30 min — když vyjíždí, má traktor ujeto 20 km</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-05.svg\" alt=\"Silnice s traktorem a autem: traktor jede 40 km/h, auto 80 km/h a vyjíždí o 30 minut později, s tabulkou a postupem\" /></a><figcaption>Traktor a auto: kdy a kde auto traktor dožene.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/priklady-na-vypocet-rychlosti-obr-06.svg\" alt=\"Graf dráhy traktoru a auta: přímky se protnou po 60 minutách ve vzdálenosti 40 km\" /></a><figcaption>Auto dohoní traktor po 1 hodině ve 40 km.</figcaption></figure>\n<p>Automobil dohoní traktor 40 km za městem. Traktor jel do té chvíle 60 min, automobil 30 min. Potkají se v 9:00.</p>\n\n<h3>✏️ Procvič si</h3>\n<ol>\n<li>Lyžař urazil 30 km za 2 hodiny. Jaká byla rychlost? <details><summary>řešení</summary>v = 30 : 2 = <strong>15 km/h</strong></details></li>\n<li>Cyklisté ujeli 45 km za 3 hodiny. <details><summary>řešení</summary>v = 45 : 3 = <strong>15 km/h</strong></details></li>\n<li>Vlak ujel 360 km za 4 hodiny. <details><summary>řešení</summary>v = 360 : 4 = <strong>90 km/h</strong></details></li>\n<li>Turista ušel 6 km za 120 minut. Rychlost v km/h? <details><summary>řešení</summary>120 min = 2 h; v = 6 : 2 = <strong>3 km/h</strong></details></li>\n<li>Etapa 231 km za 5 h 30 min. <details><summary>řešení</summary>5 h 30 min = 5,5 h; v = 231 : 5,5 = <strong>42 km/h</strong></details></li>\n<li>Chlapec uběhl 60 m za 9 s. Rychlost v km/h? <details><summary>řešení</summary>3 600 s : 9 s = 400, za hodinu 400 · 60 = 24 000 m; v = <strong>24 km/h</strong></details></li>\n<li>Sprinteři uběhli 100 m za 10 s. Jakou měli rychlost v m/s a v km/h? <details><summary>řešení</summary>v = 100 : 10 = <strong>10 m/s</strong>, to je 10 · 3,6 = <strong>36 km/h</strong></details></li>\n<li>Chodec ušel 1 km za 12 min. Jakou měl rychlost v km/h? <details><summary>řešení</summary>12 min = 12 : 60 = 0,2 h; v = 1 : 0,2 = <strong>5 km/h</strong></details></li>\n<li>Střela proletěla 1,2 km za 2 s. Jakou měla rychlost v m/s? <details><summary>řešení</summary>1,2 km = 1 200 m; v = 1 200 : 2 = <strong>600 m/s</strong></details></li>\n<li>Cyklista ujel 42 km za 1 h 30 min. Jakou měl rychlost v km/h? <details><summary>řešení</summary>1 h 30 min = 1,5 h; v = 42 : 1,5 = <strong>28 km/h</strong></details></li>\n</ol>\n\n<h3>Shrnutí</h3>\n<p>Zapiš, co znáš, sjednoť jednotky, dosaď a napiš výsledek s jednotkou. Rychlost je v = s : t, dráha s = v · t a čas t = s : v. U rovnoměrného pohybu je graf rychlosti vodorovná přímka a graf dráhy rostoucí přímka.</p>",
					uvod: "Představ si cestu do školy. Víš, jak je daleko a jak dlouho ti trvá. Už z těchto údajů umíme spočítat, jak rychle jdeš. A také to, jak dlouho by ti cesta trvala, kdybys šel pomaleji nebo rychleji.",
					zvidave: "<h3>Zkouška výpočtu</h3>\n<p>Správnost výsledku ověříš zkouškou: dosadíš zpět do vzorce s = v · t.</p>\n<p>Cyklista z procvičování: 5,5 · 42 = 231 km — souhlasí.</p>\n<p>Letadlo z příkladu 4: 1,3 · 450 = 585 km — souhlasí.</p>\n<p>Výsledek si také odhadni. Rychlost 1 950 km/h dopravní letadlo nemá — chyba je v převodu času.</p>\n<h3>Proč se někdy počítá po minutách</h3>\n<p>Jiný autobus ujel 6 km za 8 minut. Kdybychom 8 minut převedli na hodiny, vyšlo by 8 : 60 = 0,1333… Za čárkou se trojky opakují donekonečna, a proto by výsledek vyšel jen přibližně. Počítáním po minutách vyjde přesně: 6 km za 8 min jsou 3 km za 4 min, hodina má 15 čtyřminutovek, 15 · 3 = <strong>45 km/h</strong>.</p>",
					zapis: {"vzorec":"v = s : t   (s = v · t,  t = s : v)","vzorecSlovy":"rychlost = dráha děleno čas","jednotky":["km/h: dráha v km, čas v h; m/s: dráha v m, čas v s","minuty na hodiny: děl 60","z m/s na km/h krát 3,6, z km/h na m/s děl 3,6"],"body":["postup: zapiš → sjednoť jednotky → dosaď","graf rychlosti: vodorovná přímka; graf dráhy: rostoucí přímka","Příklad: 200 km : 4 h = 50 km/h"]},
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Tahák: rovnoměrný pohyb — vzorce a grafy',
						},
						{
							druh: 'pdf',
							nazev: 'Dráhy pro Ozobota (k vytištění)',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/ozobot-drahy.pdf',
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
					odkazy: [{"nazev":"Síla a její účinky (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/sila/sila-jeji-ucinky"},{"nazev":"Fyzika 7. třída SÍLA – kvíz (Wordwall)","url":"https://wordwall.net/cs/resource/66154705/fyzika-7-t%C5%99%C3%ADda-s%C3%ADla"}],
					slug: 'sila',
					nazev: 'Síla',
					interakce: 'sila-vektor',
					obsah: "<h2>Síla</h2>\n<p>Kolem sebe pořád vidíme, jak na sebe tělesa nějak působí: ruka napíná tětivu luku, tenisová raketa udeří do míčku, brankář chytá letící míč, magnet přitahuje hřebík. Tomuto vzájemnému působení těles říkáme <strong>síla</strong>. <strong>Síla</strong> je fyzikální veličina, která popisuje, jak na sebe tělesa navzájem působí.</p>\n<p>Tělesa na sebe mohou působit <strong>při dotyku</strong> (raketa a míček), nebo <strong>na dálku</strong> (magnet a hřebík). Při působení na dálku mluvíme o <strong>silovém poli</strong>. Silové pole může být gravitační, magnetické nebo elektrické. Působení je vždy <strong>vzájemné</strong>: když jedno těleso působí na druhé, působí i druhé těleso na první.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-07.svg\" alt=\"Dvě koule, modrá a šedá, se šipkami mířícími k sobě\" /></a><figcaption>Dvě tělesa na sebe působí vzájemně a každé z nich dostane sílu opačného směru.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-12.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-12.svg\" alt=\"Tři silová pole: gravitační pole kolem Země, magnetické pole kolem tyčového magnetu s póly N a S a elektrické pole kolem kladného náboje\" /></a><figcaption>Gravitační, magnetické i elektrické pole působí silou i na dálku.</figcaption></figure>\n\n<h3>Účinky síly</h3>\n<p>Síla může těleso uvést do pohybu nebo do klidu, změnit jeho rychlost či směr. Podle toho, kde na tělese síla působí, má <strong>posuvný</strong> (těleso se posune), nebo <strong>otáčivý účinek</strong> (těleso se otočí). Když se pohyb mění, třeba když člověk roztlačuje auto, jde o dynamické působení. Když těleso zůstává v klidu, třeba když míč leží na lavičce, jde o statické působení a síly se navzájem ruší.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-15.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-15.svg\" alt=\"Stejná síla působící na těleso v různých místech (působištích), které se podle toho posune, nebo otočí\" /></a><figcaption>Stejná síla těleso posune, nebo otočí podle toho, kde na něj působí.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-08.svg\" alt=\"Statické a dynamické působení: kniha leží na stole a člověk roztlačuje auto\" /></a><figcaption>Kniha na stole je v klidu, protože se síly ruší, a auto při roztlačování mění svůj pohyb.</figcaption></figure>\n<p>Síla může těleso také <strong>deformovat</strong>, tedy změnit jeho tvar. Deformace je <strong>dočasná</strong>, když těleso po skončení působení síly samo obnoví původní tvar (míč, pružina). Je <strong>trvalá</strong>, když těleso zůstane ve změněném tvaru (modelína, plech, auto po nárazu). Jedna síla může mít i několik účinků najednou.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-09.svg\" alt=\"Jedna síla a tři účinky na těleso: posuvný (šipka vede čtverec), otáčivý (kruhová šipka) a deformační (stlačený čtverec se šipkami)\" /></a><figcaption>Jedna síla může těleso posunout, otočit, nebo zdeformovat.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-10.svg\" alt=\"Čtyři fáze nárazu tenisového míče do rakety: míč se stlačí, vrátí do původního tvaru a odletí\" /></a><figcaption>Při odrazu od rakety se míč dočasně zdeformuje a pak se vrátí do původního tvaru.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-11.svg\" alt=\"Červené auto po nárazu do zdi s poškozenou kapotou, světlomety a nárazníkem\" /></a><figcaption>Po nárazu do zdi zůstane auto trvale zdeformované.</figcaption></figure>\n\n<h3>Jednotka a měření síly</h3>\n<p>Sílu značíme <strong>F</strong> a měříme ji v <strong>newtonech (N)</strong>. K měření síly slouží <strong>siloměr</strong>. Má uvnitř pružinu a platí: čím větší síla na siloměr působí, tím víc se pružina natáhne.</p>\n\n<h3>Síla jako šipka</h3>\n<p>Síla má tři vlastnosti: <strong>velikost</strong>, <strong>směr</strong> a <strong>působiště</strong> (místo, kde síla na těleso působí, například bod dotyku). Veličině, která má velikost i směr, se říká <strong>vektor</strong>. Proto sílu kreslíme jako šipku.</p>\n<p>Příklad: člověk táhne paletový vozík za držadlo. Působištěm je místo, kde se ruka dotýká držadla. Směr síly je směr, kterým za držadlo táhne.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-01.svg\" alt=\"Člověk táhne paletový vozík s krabicemi; červená šipka síly F, popisky Směr (směr tažení držadla) a Působiště (místo dotyku ruky a vozíku)\" /></a><figcaption>Člověk táhne vozík silou, která má směr tažení a působiště na místě, kde se ruka dotýká držadla.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-06.svg\" alt=\"Šedá kostka a modrá šipka síly F s popisky Směr (špička), Velikost (délka šipky) a Působiště (začátek šipky)\" /></a><figcaption>Sílu kreslíme šipkou: začátek šipky je působiště, délka udává velikost a špička směr síly.</figcaption></figure>\n\n<h3>Znázornění síly</h3>\n<p>Sílu kreslíme jako úsečku se šipkou. Začátek šipky je v <strong>působišti</strong>, šipka ukazuje <strong>směr síly</strong> (například vodorovně vpravo nebo vodorovně vlevo) a její délka ukazuje <strong>velikost síly</strong>. Vedle šipky můžeme připsat číselnou hodnotu s jednotkou, třeba F = 35 N.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-05.svg\" alt=\"Dvě šipky síly F na tělese, jedna míří vodorovně vpravo a druhá vodorovně vlevo, obě mají působiště na tělese\" /></a><figcaption>Síla může na těleso působit vodorovně vpravo, nebo vodorovně vlevo.</figcaption></figure>\n<p>Aby šipka nebyla ani moc velká, ani moc malá, zvolíme si <strong>měřítko</strong>, třeba že 1 cm šipky odpovídá síle 1 N. Sílu 5 N pak nakreslíme jako vodorovnou šipku dlouhou 5 cm, směřující vpravo. Pro sílu 400 N můžeme zvolit měřítko, kde 1 cm odpovídá 100 N. Šipka pak bude dlouhá 4 cm. Když kreslíme víc sil najednou, musí mít všechny stejné měřítko.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-04.svg\" alt=\"Síla 5 N ve vodorovném směru vpravo, měřítko 1 cm odpovídá 1 N, šipka dlouhá 5 cm s označeným působištěm a směrem síly\" /></a><figcaption>Síla 5 N míří vodorovně vpravo a při měřítku 1 cm = 1 N ji znázorňuje šipka dlouhá 5 cm.</figcaption></figure>\n<p><strong>Příklad 1:</strong> Na obrázku jsou dvě síly a měřítko, kde 1 cm odpovídá 3 N. Šipka první síly měří 5 cm, takže F<sub>1</sub> = 5 · 3 N = 15 N. Šipka druhé síly měří 2 cm, takže F<sub>2</sub> = 2 · 3 N = 6 N.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-02.svg\" alt=\"Dvě síly: F1 je šikmá šipka o pěti dílcích a F2 svislá šipka o dvou dílcích, měřítko 1 cm odpovídá 3 N\" /></a><figcaption>Dvě různoběžné síly F1 a F2 jsou nakreslené šipkami v měřítku 1 cm = 3 N.</figcaption></figure>\n<p><strong>Příklad 2:</strong> Na obrázku jsou dvě síly a u první je zapsaná velikost F<sub>1</sub> = 1 kN. Platí 1 kN = 1 000 N a šipka první síly měří 5 cm. Jeden centimetr tedy odpovídá 1 000 : 5 = 200 N. Šipka druhé síly měří 4 cm, takže F<sub>2</sub> = 4 · 200 N = 800 N.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-03.svg\" alt=\"Dvě různoběžné síly: F1 = 1 kN je šipka o pěti dílcích a F2 je šipka o čtyřech dílcích\" /></a><figcaption>Velikost síly F2 zjistíme z délky její šipky podle měřítka, které dopočítáme ze síly F1 = 1 kN.</figcaption></figure>\n\n<h3>Druhy sil</h3>\n<ul>\n<li><strong>Elektrická síla</strong> – například zelektrizované pravítko přitahuje papírky</li>\n<li><strong>Magnetická síla</strong> – například magnet přitahuje železné předměty</li>\n<li><strong>Gravitační síla</strong> – tělesa se navzájem přitahují</li>\n<li><strong>Tíhová síla</strong> – podrobně ji poznáme v dalším podtématu</li>\n<li><strong>Třecí síla</strong> – působí na těleso tažené po podložce</li>\n</ul>\n<p>Mezi další síly patří <strong>tahová</strong> (například táhneme za lano), <strong>tlaková</strong> (například tlačíme vozík) a <strong>vztlaková</strong> síla. Vztlakovou sílu se teprve budeme učit.</p>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/tahova-sila.png\" alt=\"Jeřáb – příklad tahové síly\" />\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-13.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-13.svg\" alt=\"Druhy sil, piktogramy: tahová síla, tlaková síla a tíhová síla; postavy tlačící a táhnoucí s šipkami F1 a F2\" /></a><figcaption>Sílu poznáme podle toho, jak působí: může těleso táhnout, tlačit, nebo ho přitahovat k Zemi tíhou.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<ul>\n<li>Síla popisuje vzájemné působení těles. Značíme ji F a měříme ji siloměrem v newtonech (N).</li>\n<li>Síla může těleso posunout, otočit nebo deformovat.</li>\n<li>Síla má velikost, směr a působiště. Kreslíme ji šipkou v zvoleném měřítku.</li>\n<li>Druhy sil: elektrická, magnetická, gravitační, tíhová, třecí, tahová, tlaková a vztlaková.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-14.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/sila/sila-obr-14.svg\" alt=\"Mapa pojmů: vzájemné působení (statické, dynamické) vede k síle, síla má posuvný, otáčivý a deformační účinek (dočasná, trvalá deformace); vedle toho působení na dálku (silové pole)\" /></a><figcaption>Mapa pojmů shrnuje, jak vzájemné působení těles vede k síle a jaké účinky síla má.</figcaption></figure>",
					uvod: "Když tlačíš dveře, aby se otevřely, působíš na ně silou. Silou můžeš věc rozhýbat, zastavit nebo ji zmáčknout do jiného tvaru. A dveře zároveň působí na tebe, protože si tělesa působí vždy navzájem. Sílu můžeme nakreslit jako šipku.",
					zvidave: "<p>Jednotka síly se jmenuje newton podle anglického fyzika Isaaca Newtona.</p>",
					zapis: {"jednotky":["síla F — jednotka newton (N), měří ji siloměr","1 kN = 1 000 N"],"body":["síla = vzájemné působení těles, dotykem i na dálku","účinky: posuvný, otáčivý, deformační","velikost + směr + působiště = vektor, kreslí se šipkou","měřítko: 1 cm odpovídá 3 N; šipka 5 cm → F = 5 · 3 N = 15 N","druhy: elektrická, magnetická, gravitační, tíhová, třecí, tahová, tlaková, vztlaková"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Síly kolem nás 🎵', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/sila/pisen-sily-kolem-nas.m4a' },
					],
				},
				{
					odkazy: [{"nazev":"Tíha a tíhová síla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/sila/tiha-tihova-sila"},{"nazev":"Gravitační vs. tíhová síla a tíha – 7. ročník (Umíme to)","url":"https://www.umimefakta.cz/fyzika/cviceni-tiha-7-trida"}],
					slug: 'gravitacni-sila',
					interakce: 'vrh',
					nazev: 'Gravitační síla',
					obsah: "<h2>Gravitační síla</h2>\n<p>Všechna tělesa, která mají hmotnost, se navzájem přitahují. Této síle říkáme <strong>gravitační síla</strong>. Je vždy <strong>přitažlivá</strong>, nikdy neodpuzuje, a působení je vždy <strong>vzájemné</strong>: Slunce přitahuje Zemi a Země přitahuje Slunce. Zákony gravitace popsal anglický fyzik Isaac Newton.</p>\n<p>Velikost gravitační síly závisí na <strong>hmotnostech obou těles</strong>. Čím větší mají tělesa hmotnost, tím větší je gravitační síla. Mezi planetami a jinými vesmírnými tělesy jsou velké gravitační síly a ovlivňují jejich pohyb. Mezi menšími objekty, třeba mezi dvěma tužkami na stole, je gravitační síla zanedbatelná.</p>\n<p>Velikost gravitační síly závisí i na <strong>vzdálenosti těles</strong>. Čím jsou tělesa dál od sebe, tím je gravitační síla menší. Astronaut v meziplanetárním prostoru proto nepadá volným pádem k Zemi: přitažlivá síla Země je v takové vzdálenosti velmi slabá.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-01.svg\" alt=\"Slunce vlevo a Země vpravo, každé s červenou šipkou míří k druhému tělesu\" /></a><figcaption>Slunce a Země se navzájem přitahují.</figcaption></figure>\n\n<h3>Gravitační pole Země</h3>\n<p>V okolí Země je <strong>gravitační pole</strong>. Všechna tělesa v okolí Země jsou přitahována do středu Země. Nejsilněji gravitační síla působí na tělesa na povrchu Země, s rostoucí výškou pole slábne.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-02.svg\" alt=\"Země s červeným křížkem ve středu a kolem ní jablko, astronaut, družice a další tělesa; u každého červená šipka míří do středu Země\" /></a><figcaption>Země přitahuje všechna tělesa kolem sebe směrem do svého středu.</figcaption></figure>\n<p>V omezeném prostoru poblíž povrchu Země není vzhledem k velikosti Země vidět rozdíl ve směru gravitačních sil. Na blízká tělesa proto působí gravitační síla <strong>ve svislém směru</strong>, tedy svisle dolů. Jablko padá ze stromu rovně dolů a padák s nákladem letí svisle k zemi.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-03.svg\" alt=\"Krajina s letadlem, padákem s bednou, stromem, domem a potápěčem; u každého červená svislá šipka dolů s popiskem Fg\" /></a><figcaption>U všech těles v krajině míří gravitační síla Fg svisle dolů.</figcaption></figure>\n\n<h3>Výpočet gravitační síly</h3>\n<p>Pro tělesa v blízkosti povrchu Země platí, že na každý 1 kg hmotnosti tělesa působí gravitační síla přibližně 10 N. Gravitační sílu značíme <strong>F<sub>g</sub></strong> (index g je jako gravitační). Sílu, kterou Země přitahuje těleso o hmotnosti m, vypočítáme podle vzorce:</p>\n<p><strong>F<sub>g</sub> = m · g</strong></p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-04.svg\" alt=\"Vzorcový trojúhelník: nahoře Fg, dole vlevo m a vpravo g; z něj se čte Fg = m · g, m = Fg : g, g = Fg : m\" /></a><figcaption>Ze vzorcového trojúhelníku vyčteme, jak vypočítat sílu Fg, hmotnost m i konstantu g.</figcaption></figure>\n<ul>\n<li>m ... hmotnost [kg]</li>\n<li>F<sub>g</sub> ... gravitační síla [N]</li>\n<li>g ... tíhové zrychlení (konstanta g), na Zemi zhruba 10 N/kg</li>\n</ul>\n<p>Ze vzorce vypočítáme i hmotnost a číslo g: <strong>m = F<sub>g</sub> : g</strong> a <strong>g = F<sub>g</sub> : m</strong>.</p>\n<p>Veličině g se říká <strong>tíhové zrychlení</strong> (často jen konstanta g). Udává, jak tělesa zrychlují při volném pádu. Pro naše výpočty používáme zaokrouhlenou hodnotu g = 10 N/kg. Tam, kde jsou potřeba velmi přesné výpočty, se používá g = 9,81 N/kg. Tato hodnota závisí na výšce nad povrchem Země: s rostoucí výškou se zmenšuje. Víc o tíhovém zrychlení se budeš učit až na střední škole.</p>\n<p><strong>Důležité:</strong> Při výpočtu gravitační síly dosazuj hmotnost vždy v základních jednotkách, tedy v kilogramech! Pamatuj: 1 t = 1 000 kg.</p>\n<p><strong>Příklad 1:</strong> Jak velká gravitační síla působí na batoh o hmotnosti 2 kg?<br>\nm = 2 kg, g = 10 N/kg<br>\nF<sub>g</sub> = m · g = 2 · 10 = <strong>20 N</strong></p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-05.svg\" alt=\"Příklad s batohem: m = 2 kg, g = 10 N/kg, Fg = 2 kg · 10 N/kg = 20 N; bublina „Základní jednotka hmotnosti: kilogram!“\" /></a><figcaption>Batoh o hmotnosti 2 kg je přitahován k Zemi silou 20 N.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/gravitacni-sila-obr-06.svg\" alt=\"Těleso o hmotnosti 100 g zavěšené na siloměru v ruce nad Zemí; svislá šipka dolů s popiskem Fg = 1 N\" /></a><figcaption>Těleso o hmotnosti 100 g zavěšené na siloměru je přitahováno k Zemi silou 1 N.</figcaption></figure>\n<p><strong>Příklad 2:</strong> Vypočítej sílu, kterou jsou přitahována tělesa k Zemi.</p>\n<p><strong>Žehlička</strong> (m = 0,6 kg)<br>\nF<sub>g</sub> = m · g = 0,6 · 10 = <strong>6 N</strong></p>\n<p><strong>Auto</strong> (m = 1 200 kg)<br>\nF<sub>g</sub> = m · g = 1 200 · 10 = 12 000 N = <strong>12 kN</strong></p>\n<p><strong>Ocelový nosník</strong> (m = 1,4 t = 1 400 kg)<br>\nF<sub>g</sub> = m · g = 1 400 · 10 = 14 000 N = <strong>14 kN</strong></p>\n<p><strong>Příklad 3:</strong> Jakou hmotnost má automobil, který je k Zemi přitahován silou 8 kN?<br>\nF<sub>g</sub> = 8 kN = 8 000 N, g = 10 N/kg<br>\nm = F<sub>g</sub> : g = 8 000 : 10 = <strong>800 kg</strong></p>\n<p>Procvič si:</p>\n<p>1) Těleso o hmotnosti 40 kg<br>\nF<sub>g</sub> = 40 · 10 = <strong>400 N</strong></p>\n<p>2) Těleso je k Zemi přitahováno silou 12 kN. Jaká je jeho hmotnost?<br>\nm = F<sub>g</sub> : g = 12 000 : 10 = <strong>1 200 kg</strong></p>\n<p>3) Těleso je k Zemi přitahováno silou 7 kN. Jaká je jeho hmotnost?<br>\nm = F<sub>g</sub> : g = 7 000 : 10 = <strong>700 kg</strong></p>\n<p>4) Auto o hmotnosti 1 600 kg<br>\nF<sub>g</sub> = 1 600 · 10 = 16 000 N = <strong>16 kN</strong></p>\n<p>5) Těleso o hmotnosti 12 t (12 000 kg)<br>\nF<sub>g</sub> = 12 000 · 10 = 120 000 N = <strong>120 kN</strong></p>\n\n<h3>Tíhová síla</h3>\n<p>Když neseme těžké břemeno, říkáme, že je to tíha. Země přitahuje břemeno gravitační silou a břemeno proto tlačí na naše ruce. Podle toho cítíme, jak těžké břemeno je.</p>\n<p>Ve skutečnosti na těleso u povrchu Země působí ještě <strong>odstředivá síla</strong>, kterou způsobuje otáčení (rotace) Země. Míří směrem od osy otáčení a největší je na rovníku, kde se Země otáčí nejrychleji. <strong>Tíhová síla</strong> vzniká společným působením gravitační síly a odstředivé síly. Působí na všechna tělesa v blízkosti povrchu Země a určuje svislý směr, tedy směr volného pádu. Na těleso jako celek působí v jednom bodě, v jeho těžišti.</p>\n<p>V běžném životě je rozdíl mezi tíhovou a gravitační silou velice malý. Pro naše výpočty proto tíhovou sílu počítáme stejně jako gravitační. V učebnicích se kvůli tomu setkáš s pojmem gravitační (tíhová) síla.</p>\n<p>Ve stavu <strong>beztíže</strong> těleso na nic netlačí, a kdybys se v něm postavil na váhu, nenaměřila by nic. Beztíže nastává například v kosmické lodi na oběžné dráze, při volném pádu nebo při letu po parabolické dráze (oblouku, po kterém letí vržené těleso).</p>\n\n<h3>Hmotnost, tíha a váhy</h3>\n<p>Hmotnost tělesa říká, kolik látky v něm je, a zůstává stejná všude: na Zemi, na Měsíci i ve vesmíru. Gravitační (tíhová) síla se podle místa mění, protože gravitační pole je jinde silnější a jinde slabší. Hodnota g je pro různá gravitační pole jiná. Na povrchu Měsíce je 6× menší než na Zemi, proto se kosmonauti na Měsíci při chůzi jakoby vznášejí a podivně poskakují.</p>\n<p>Všechny váhy fungují na principu měření tíhové (gravitační) síly. Místo v newtonech ale mají stupnici v kilogramech. Hmotnost ze známé síly vypočítáme podle vzorce <strong>m = F<sub>g</sub> : g</strong>.</p>\n\n<h3>Shrnutí</h3>\n<ul>\n<li>Gravitační síla je vždy přitažlivá a vzájemná. Roste s hmotností těles a s rostoucí vzdáleností slábne.</li>\n<li>Země přitahuje tělesa do svého středu, u povrchu nejsilněji. Poblíž povrchu míří gravitační síla svisle dolů.</li>\n<li>F<sub>g</sub> = m · g, kde g = 10 N/kg. Hmotnost dosazujeme v kilogramech, hmotnost zjistíme jako m = F<sub>g</sub> : g.</li>\n<li>Tíhová síla vzniká z gravitační a odstředivé síly. Rozdíl je malý, proto ji počítáme jako gravitační.</li>\n<li>Hmotnost je všude stejná, gravitační (tíhová) síla se podle místa mění. Váhy měří sílu a ukazují kilogramy.</li>\n</ul>",
					uvod: "Když pustíš míč z ruky, spadne dolů, protože ho přitahuje Země. Přitahují se všechna tělesa, ale jen u obrovských, jako je Země, to opravdu poznáme. Čím víc látky v něčem je, tím silněji to Země přitahuje. Proto tě těžký batoh táhne k zemi víc než lehký.",
					zvidave: "<p>Kdyby bylo těleso na Zemi přitahováno silou 60 N, na Měsíci by ho gravitace táhla dolů jen silou 10 N, protože 60 : 6 = 10. Hmotnost tělesa by přitom zůstala stejná.</p>",
					zapis: {"vzorec":"Fg = m · g      (m = Fg : g, g = Fg : m)","jednotky":["Fg v N, m v kg, g = 10 N/kg na Zemi","1 kN = 1 000 N, 1 t = 1 000 kg"],"body":["vždy přitažlivá, roste s hmotností, s dálkou slábne","míří svisle dolů","tíhovou sílu počítáme jako gravitační","hmotnost stejná všude, síla se mění","40 kg → Fg = 40 · 10 = 400 N"]},
					materialy: [
					],
				},
				{
					odkazy: [{"nazev":"Smykové tření (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/sila/odporove-sily/smykove-treni"},{"nazev":"Třecí síla / tření – kvíz (Wordwall)","url":"https://wordwall.net/cs/resource/29383261/fyzika/t%C5%99ec%C3%AD-s%C3%ADla-t%C5%99en%C3%AD"}],
					slug: 'treci-sila',
					interakce: 'treni',
					nazev: 'Třecí síla',
					obsah: "<h2>Třecí síla</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila-piktogram.png\" alt=\"Třecí síla – lyžař\" />\n<p>Když se dva povrchy o sebe třou, vzniká mezi nimi <strong>tření</strong>. Tření vytváří <strong>třecí sílu</strong>, kterou značíme <strong>F<sub>t</sub></strong> (index t je jako tření). Třecí síla vzniká mezi povrchy dotýkajících se pevných těles při jejich vzájemném pohybu nebo při snaze o pohyb. Příčinou jsou drobné nerovnosti povrchů a přitažlivé síly mezi částicemi dotýkajících se těles.</p>\n<p>Třecí síla působí vždy <strong>proti vzájemnému pohybu</strong> stykových ploch, nebo proti snaze o pohyb, kterou plochy posouváme. Má <strong>brzdící a tepelné účinky</strong>: pohyb zpomaluje a třecí plochy zahřívá. Přesto je často užitečná: díky klidovému tření chodíme a auto se rozjede.</p>\n<p>Dokud těleso tlačíme jen slabě, zůstává v klidu, protože mu tření brání. Když je naše síla větší než největší třecí síla, těleso se dá do pohybu.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-01.svg\" alt=\"Auto jedoucí doprava po vozovce se šipkami sil: u hnacího kola klidové tření Ft dopředu, u nehnaného kola krátká šipka valivého odporu dozadu\" /></a><figcaption>U hnacího kola auta působí klidové tření dopředu a díky němu se auto rozjede.</figcaption></figure>\n\n<h3>Na čem tření závisí</h3>\n<p>Velikost třecí síly závisí na <strong>tlakové síle</strong>, která působí kolmo na povrch. Čím větší je tlaková síla, tím větší je třecí síla. Plně naložený kamion působí na vozovku větší gravitační (tíhovou) silou než prázdný, a proto vzniká větší třecí síla. Když nám předmět klouže po šikmé ploše, stačí ho přitlačit a klouzat přestane.</p>\n<p>Třecí síla závisí také na <strong>kombinaci povrchů</strong>. Čím jsou plochy drsnější, tím je třecí síla větší. Hokejový puk se po ledu pohybuje s mnohem menší třecí silou než po betonu.</p>\n<p>Tření se zmenšuje <strong>uhlazením a leštěním</strong> ploch nebo <strong>promazáním</strong> styčné plochy. Mažeme panty dveří, olej v motoru brání jeho zadření a po banánové slupce chodec uklouzne, protože se tření zmenší. Když jsou plochy vyleštěné dokonale, tření se naopak zase zvětší: částice obou povrchů jsou k sobě velmi blízko a přitahují se. Velká třecí síla vznikne třeba mezi dvěma hladkými zrcadly.</p>\n<p>Při měření třecí síly s jedním, dvěma a třemi hranoly (položenými za sebou nebo na sobě) platí: čím víc hranolů, tím větší třecí síla.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-02.svg\" alt=\"Měření třecí síly: skupiny hranolů (1 hranol, 2 a 3 hranoly na sobě a 3 hranoly vedle sebe) a sloupcový graf třecí síly\" /></a><figcaption>Třecí síla se měří tak, že se táhnou hranoly různě naskládané na podložce a porovnávají se výsledky.</figcaption></figure>\n\n<h3>Smykové, klidové a valivé tření</h3>\n<p>Tření se projevuje třemi způsoby.</p>\n<p><strong>Smykové tření</strong> vzniká tam, kde se jedno těleso posouvá po povrchu druhého. Tomu se říká také smýkání: smyčec smýkáme po strunách, Indiáni převáželi náklad na smyku z dlouhých tyčí taženém koňmi a když se autu při jízdě přestanou otáčet kola, pohybuje se smykem.</p>\n<p><strong>Klidové tření</strong> působí, když se těleso snažíme uvést do pohybu, ale ještě se nepohybuje. Je větší než smykové tření: podle tabulky níže je součinitel tření v klidu například u dřeva na dřevě víc než dvakrát větší než při pohybu (0,65 proti 0,30). Největší hodnoty dosáhne těsně před rozpohybováním tělesa. Jakmile se těleso rozpohybuje, třecí síla se výrazně zmenší. Proto je těžké roztlačit skříň při stěhování nebo auto, které nestartuje.</p>\n<p><strong>Valivé tření</strong> vzniká, když se jedno těleso valí (kutálí) po povrchu druhého. Je ze všech projevů tření nejmenší, a proto všude, kde používáme kola, měníme smykové tření na valivé. Při valení těleso tlačí na podložku před sebou a vytváří tak mírnou nerovnost, kterou musí překonat. Platí: čím větší poloměr kola, tím menší valivé tření. Po nerovném povrchu se proto pojede lépe na koloběžce s velkými koly než s malými kolečky. Když při jízdě na kole po rovině přestaneme šlapat, kolo se dál valí a zpomaluje ho třecí síla (valivé tření), až se úplně zastavíme.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-03.svg\" alt=\"Kolo se valí doprava po podložce, pod kolem je podložka promáčknutá do mírné nerovnosti\" /></a><figcaption>Valivé tření vzniká proto, že kolo pod sebou podložku mírně promačkává.</figcaption></figure>\n<p>Tření zmenšují i <strong>kuličková a válečková ložiska</strong>. Skládají se ze dvou prstenců, mezi kterými jsou kuličky nebo válečky. Najdeme je v jízdním kole (spojují pevnou konstrukci kola s otáčivými řídítky), v automobilu při otáčení kol na hřídeli, na skateboardu nebo na in-line bruslích.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-04.svg\" alt=\"Tři kuličková ložiska různé velikosti vedle sebe, u každého vnější a vnitřní prstenec a mezi nimi řada kuliček\" /></a><figcaption>Kuličková ložiska mají mezi prstenci kuličky, které tření zmenšují.</figcaption></figure>\n\n<h3>Výpočet třecí síly</h3>\n<p>Třecí sílu vypočítáme jako součin tlakové síly a součinitele tření:</p>\n<p><strong>F<sub>t</sub> = F<sub>n</sub> · f</strong></p>\n<ul>\n<li>F<sub>t</sub> ... třecí síla [N]</li>\n<li>F<sub>n</sub> ... normálová (tlaková, přítlačná) síla, která působí kolmo na podložku pod tělesem [N]</li>\n<li>f ... součinitel tření, číslo bez jednotky, které najdeme v tabulce</li>\n</ul>\n<p>Součinitel tření závisí na materiálu stýkajících se těles a na drsnosti povrchů. V klidu je větší, když se těleso pohybuje, klesá. Několik hodnot z tabulky (v klidu / při pohybu):</p>\n<ul>\n<li>dřevo na dřevě (průměrně) ... 0,65 / 0,30</li>\n<li>kůže na kovu ... 0,60 / 0,25</li>\n<li>ocel na dřevě ... 0,55 / 0,35</li>\n<li>ocel na oceli (suchá) ... 0,15 / 0,10</li>\n</ul>\n<p><strong>Příklad:</strong> Vypočti třecí sílu, která vzniká při tlačení ocelového tělesa o hmotnosti 50 kg po dřevěné vodorovné podložce. Těleso je už v pohybu.<br>\nm = 50 kg, f = 0,35 (ocel na dřevě při pohybu)<br>\nNejdřív spočítáme gravitační (tíhovou) sílu: F<sub>g</sub> = m · g = 50 · 10 = 500 N.<br>\nTěleso je na vodorovné podložce, takže F<sub>n</sub> má stejnou velikost jako F<sub>g</sub>: F<sub>n</sub> = 500 N.<br>\nF<sub>t</sub> = F<sub>n</sub> · f = 500 · 0,35 = <strong>175 N</strong></p>\n<p>Třecí síla má velikost 175 N.</p>\n\n<h3>Kdy nám tření pomáhá a kdy vadí</h3>\n<p>V některých případech je tření užitečné nebo dokonce nutné. Díky němu chodíme, jedeme na kole, píšeme křídou na tabuli a tužkou na papír, brzdíme brzdami, drží hřebík ve dřevě a hmoždinka ve zdi, můžeme táhnout smyčec po struně, zapálit sirku nebo si zahřát ruce třením. Bez tření by nám boty klouzaly po chodníku. V zimě pomáhá tření i bezpečnosti na silnicích, proto se silnice posypávají.</p>\n<p>Jindy nám tření škodí. Zvyšuje spotřebu energie (například u aut), způsobuje opotřebení a poškození strojů a ztěžuje pohyb. Projevuje se třeba skřípáním pantů dveří, neustálým brzděním pohybu, přehříváním nebo zadřením motoru a zahříváním zubu při vrtání kazu. Proto se motory musí promazávat olejem.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila/treci-sila-obr-05.svg\" alt=\"Zblízka dřevěná prkna s odřeným povrchem a lesklými hlavičkami hřebíků nebo šroubů\" /></a><figcaption>Tření povrchy opotřebovává, proto jsou prkna odřená a hlavičky šroubů vyleštěné.</figcaption></figure>\n\n<h3>Jak tření zvětšíme a zmenšíme</h3>\n<p>Tření <strong>zvětšíme</strong> zdrsněním povrchu, například smirkovým papírem nebo pilníkem, nebo použitím jiných materiálů. Proti smeknutí na ledu pomáhají nesmeky na boty pro chůzi po zledovatělém povrchu a sněhové řetězy na kola automobilů.</p>\n<p>Tření <strong>zmenšíme</strong> uhlazením a leštěním třecích ploch, mazáním olejem nebo vazelínou a použitím ložisek. Proto mažeme panty dveří, jízdní kolo nebo motor.</p>\n\n<h3>Shrnutí</h3>\n<ul>\n<li>Tření vzniká mezi dotýkajícími se povrchy při pohybu nebo při snaze o pohyb. Třecí síla F<sub>t</sub> působí vždy proti němu, brzdí a zahřívá.</li>\n<li>Třecí síla je větší při větší tlakové síle a při drsnějších površích. Vyleštěním a promazáním se zmenšuje.</li>\n<li>Smykové tření: těleso se posouvá. Klidové tření: těleso se ještě nepohnulo, je největší. Valivé tření: těleso se valí, je nejmenší.</li>\n<li>F<sub>t</sub> = F<sub>n</sub> · f. Na vodorovné podložce je F<sub>n</sub> = F<sub>g</sub>. Součinitel f najdeme v tabulce.</li>\n<li>Tření je někdy užitečné (chůze, brzdění, psaní), jindy škodí (opotřebení, zahřívání, ztráty energie).</li>\n<li>Tření zvětšíme zdrsněním povrchu, zmenšíme leštěním, mazáním a ložisky.</li>\n</ul>",
					uvod: "Když šoupeš botou po zemi, něco tě brzdí. Tomu se říká tření. Na ledu je tření malé, proto na něm klouzáme. Na drsném chodníku je větší, proto se na něm dobře zastavíme.",
					zvidave: "<p>Když těleso stojí a tlačíme do něj jen slabě, je klidová třecí síla stejně velká jako naše síla a míří proti ní. Roste spolu s naší silou až po největší hodnotu. Teprve když naše síla tuhle hodnotu překoná, těleso se rozjede.</p>\n<p>Třecí síla <strong>nezávisí na velikosti styčné plochy</strong>. Cihla tažená po stole naplocho i postavená na hranu klade zhruba stejný odpor, protože se nezměnila ani tlaková síla, ani drsnost povrchů.</p>\n<p>Ze vzorce F<sub>t</sub> = F<sub>n</sub> · f se dá vypočítat i tlaková síla F<sub>n</sub> = F<sub>t</sub> : f a součinitel tření f = F<sub>t</sub> : F<sub>n</sub>.</p>\n<p>V zimě se silnice posypávají pískem, který povrch zdrsní, nebo solí, která led rozpouští.</p>",
					zapis: {"vzorec":"Ft = Fn · f      (Fn tlaková síla, f součinitel tření)","jednotky":["Ft, Fn v N; f bez jednotky (z tabulky)"],"body":["působí proti pohybu, brzdí a zahřívá","roste s tlakovou silou a drsností povrchů","druhy: smykové, klidové (největší), valivé (nejmenší)","zvětšíme drsností; zmenšíme mazáním, leštěním, ložisky","50 kg, f = 0,35: Fn = 500 N, Ft = 500 · 0,35 = 175 N"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Třecí síla', cesta: '7JG_JbKRw70' },
					],
				},
				{
					odkazy: [{"nazev":"Skládání sil – 7. ročník (Umíme to)","url":"https://www.umimefakta.cz/fyzika/cviceni-skladani-sil-7-trida"}],
					slug: 'skladani-sil',
					interakce: 'skladani-sil',
					nazev: 'Skládání sil',
					obsah: "<h2>Skládání sil</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil.png\" alt=\"Skládání sil – přetahování o krabici\" />\n<p>Když na těleso působí víc sil najednou, jejich účinky se skládají. Záleží na tom, jakým směrem síly působí, jak jsou velké a zda působí v jednom místě, nebo na více místech. My se budeme zabývat jen silami, které působí ve společném bodě. Tomu bodu říkáme <strong>působiště</strong>.</p>\n<p>Všechny tyto síly můžeme nahradit jednou jedinou silou, která má na těleso stejný účinek. Říkáme jí <strong>výslednice sil</strong> a značíme ji F. Postupu, kterým výslednici hledáme, se říká <strong>skládání sil</strong>.</p>\n<p>Každou sílu kreslíme jako šipku, která vychází z působiště. Šipka míří ve směru síly a její délka ukazuje velikost síly podle zvoleného měřítka. Při měřítku 1 cm = 10 N nakreslíme sílu 30 N jako šipku dlouhou 3 cm.</p>\n\n<h3>Síly stejného směru</h3>\n<p>Síly stejného směru najdeme třeba u psího nebo koňského spřežení. Výslednice má <strong>stejný směr</strong> jako všechny působící síly a její velikost je rovna <strong>součtu</strong> velikostí všech sil. Pro dvě síly platí:</p>\n<p><strong>F = F<sub>1</sub> + F<sub>2</sub></strong></p>\n<p><strong>Příklad:</strong> Dva psi táhnou ve spřežení saně. První táhne silou F<sub>1</sub> = 30 N a druhý silou F<sub>2</sub> = 50 N.<br>\nF = F<sub>1</sub> + F<sub>2</sub> = 30 N + 50 N = <strong>80 N</strong><br>\nVýslednice míří stejným směrem jako oba psi.</p>\n<p>Stejně se sčítá i víc sil. Adam táhne těžký dřevěný kvádr na východ silou 50 N a Bára mu pomáhá stejným směrem silou 40 N. Jejich účinky se sčítají: 50 N + 40 N = 90 N na východ.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-01.svg\" alt=\"Dva psi táhnou saně stejným směrem doprava; z jednoho působiště vedou šipky F1 = 30 N, F2 = 50 N a výslednice F = 80 N (1 cm = 10 N), vedle zápis F = F1 + F2 = 30 N + 50 N = 80 N\" /></a><figcaption>Psi táhnou saně stejným směrem, proto se jejich síly sčítají: 30 N + 50 N = 80 N.</figcaption></figure>\n\n<h3>Síly opačného směru</h3>\n<p>Síly opačného směru působí třeba tehdy, když se psi přetahují o kost nebo když se družstva přetahují na laně. Výslednice dvou sil opačného směru má <strong>stejný směr jako větší síla</strong> a její velikost je rovna <strong>rozdílu</strong> velikostí obou sil. Od větší síly tedy odečteme menší:</p>\n<p><strong>F = větší síla − menší síla</strong></p>\n<p><strong>Příklad:</strong> Dva psi se tahají o kost. První táhne doleva silou F<sub>1</sub> = 30 N a druhý doprava silou F<sub>2</sub> = 50 N. Větší je síla F<sub>2</sub>, proto výslednice míří <strong>doprava</strong>.<br>\nF = 50 N − 30 N = <strong>20 N</strong> (doprava)</p>\n<p>Zkusíme přidat třetí sílu. K Adamovi a Báře se přidá Cyril, ale táhne kvádr opačným směrem silou 30 N. Adam a Bára táhnou dohromady 90 N na východ, Cyril proti nim 30 N. Výslednice je 90 N − 30 N = 60 N na východ, a kvádr se proto pohybuje na východ.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-02.svg\" alt=\"Dva psi se přetahují o kost: síla F1 = 30 N míří doleva, síla F2 = 50 N doprava a výslednice F = 20 N míří doprava (1 cm = 10 N)\" /></a><figcaption>Při opačném směru sil se síly odečtou a výslednice 20 N míří jako větší síla F2.</figcaption></figure>\n\n<h3>Rovnováha sil</h3>\n<p>Síly jsou v <strong>rovnováze</strong>, když se jejich působení na těleso navzájem vyruší. Výslednice takových sil má velikost F = 0 N. Nastane to například tehdy, když na těleso působí dvě stejně velké síly opačného směru.</p>\n<p><strong>Příklad:</strong> Dvě družstva se přetahují na laně. Jedno táhne silou 4 500 N doleva a druhé silou 4 500 N doprava. Výslednice je F = 0 N, a proto se lano nebude pohybovat ani doleva, ani doprava.</p>\n<p>Síly v rovnováze nemají na těleso žádný <strong>pohybový účinek</strong>. Pokud bylo těleso v klidu, zůstane v klidu. Pokud se pohybovalo, bude se pohybovat dál beze změny. Mohou mít jen <strong>deformační účinek</strong>: těleso stlačí nebo natáhnou (pružina), nebo ho rozdělí na části (přetržené lano, rozbitý hrnek).</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-03.svg\" alt=\"Přetahování na laně: síla F1 míří doleva a síla F2 doprava, obě jsou stejně velké (4 500 N), výslednice je F = 0\" /></a><figcaption>Stejně velké síly opačného směru se ruší, výslednice je nulová a lano se nepohybuje.</figcaption></figure>\n\n<h3>Různoběžné síly</h3>\n<p>Někdy síly nemíří ani stejným, ani opačným směrem. Říkáme jim <strong>různoběžné</strong>. Takové síly nepůsobí ani spolu (sčítání), ani proti sobě (odčítání), a proto velikost výslednice nejde jednoduše vypočítat. Velikost i směr výslednice můžeme na základní škole určit jen <strong>graficky</strong>, tedy kreslením. Výslednice vychází ze stejného působiště jako obě síly.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-04.svg\" alt=\"Tři případy skládání různoběžných sil: v každém vycházejí z jednoho působiště pod jiným úhlem šipky F1 a F2 a červená šipka výslednice F\" /></a><figcaption>U různoběžných sil se společným působištěm záleží na úhlu mezi nimi, jak velká a kam mířící je výslednice.</figcaption></figure>\n\n<h3>Pro zvídavé žáky: rovnoběžník</h3>\n<p>Různoběžné síly umíme složit metodou doplnění na <strong>rovnoběžník</strong>. Dva psi táhnou saně a přijedou ke křižovatce. První táhne dál rovně silou F<sub>1</sub> = 40 N, ale druhý uhne stranou (vlevo od směru jízdy) a začne táhnout silou F<sub>2</sub> = 30 N. Postupujeme takto:</p>\n<ol>\n<li>Z koncového bodu šipky F<sub>1</sub> vedeme pomocnou čáru rovnoběžnou se silou F<sub>2</sub>.</li>\n<li>Z koncového bodu šipky F<sub>2</sub> vedeme pomocnou čáru rovnoběžnou se silou F<sub>1</sub>.</li>\n<li>Výslednice F začíná ve společném působišti a končí v průsečíku pomocných čar.</li>\n<li>Velikost síly F změříme a zapíšeme ve správných jednotkách.</li>\n</ol>\n<p>Síly nakreslíme v měřítku 1 cm = 10 N. Sílu F<sub>1</sub> = 40 N nakreslíme jako úsečku dlouhou 4 cm a sílu F<sub>2</sub> = 30 N jako úsečku dlouhou 3 cm. Úhlopříčku F změříme. V našem obrázku je dlouhá asi 65 mm, tedy F = asi 65 N. Velikost výslednice záleží na úhlu mezi silami.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/skladani-sil-obr-05.svg\" alt=\"Skládání rovnoběžníkem: ze společného působiště vede F1 = 40 N vodorovně doprava a F2 = 30 N šikmo vzhůru pod úhlem asi 44°, čárkované čáry tvoří rovnoběžník a jeho úhlopříčka je výslednice F asi 65 N (1 cm = 10 N)\" /></a><figcaption>Výslednici dvou různoběžných sil najdeme jako úhlopříčku rovnoběžníku sestrojeného z obou sil.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<ul>\n<li>Výslednice sil je jedna síla, která má na těleso stejný účinek jako všechny síly dohromady. Hledání výslednice je skládání sil. Skládáme síly, které mají společné působiště.</li>\n<li>Síly stejného směru: výslednice má stejný směr a velikost je součet sil, F = F<sub>1</sub> + F<sub>2</sub>.</li>\n<li>Síly opačného směru: výslednice míří jako větší síla a velikost je rozdíl sil, větší minus menší.</li>\n<li>Stejně velké síly opačného směru jsou v rovnováze, F = 0 N. Nemají pohybový účinek, ale mohou těleso deformovat.</li>\n<li>Různoběžné síly neumíme sečíst ani odečíst. Výslednici určíme graficky, například rovnoběžníkem.</li>\n<li>Sílu kreslíme šipkou, jejíž délka odpovídá velikosti síly v měřítku.</li>\n</ul>",
					uvod: "Když s kamarádem táhneme krabici na stejnou stranu, pomáháme si a krabice se rozjede snáz. Když táhneme proti sobě, vyhraje ten, kdo je silnější. Když jsme stejně silní, krabice zůstane stát. Když se síly takhle spojí do jedné, říkáme tomu skládání sil.",
					zvidave: "<p>Výslednice různoběžných sil není nikdy tak velká jako součet sil ani tak malá jako jejich rozdíl. Pro síly 40 N a 30 N leží mezi 10 N (síly proti sobě) a 70 N (síly stejným směrem). V příkladu s rovnoběžníkem vyjde při úhlu na obrázku asi 65 N, tedy hodnota mezi těmito mezemi.</p>\n<p>Čím menší je úhel mezi dvěma silami, tím větší je jejich výslednice a blíží se součtu. Čím větší je úhel, tím je výslednice menší a blíží se rozdílu.</p>",
					zapis: {"vzorec":"Stejný směr: F = F₁ + F₂\nOpačný směr: F = větší − menší","jednotky":["F, F₁, F₂ v N; při opačném směru míří výslednice jako větší síla"],"body":["výslednice = síla se stejným účinkem jako všechny síly","stejně velké opačné síly: F = 0 N, rovnováha","různoběžné síly: výslednici určíme graficky","30 N + 50 N = 80 N stejným směrem","50 N − 30 N = 20 N k větší síle"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Skládání sil', cesta: 'GWJnn_4_zHc' },
						{ druh: 'audio', nazev: 'Poslech: jak složit síly do jedné výslednice 🎧', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/audio-pravidlo-rovnobezniku.mp3' },
					],
				},
				{
					odkazy: [{"nazev":"Těžiště (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/sila/teziste"},{"nazev":"Stabilita (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/sila/teziste/stabilita"}],
					slug: 'teziste',
					interakce: 'teziste',
					nazev: 'Těžiště',
					obsah: "<h2>Těžiště</h2>\n<img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste.png\" alt=\"Těžiště nákladního auta\" />\n<p><strong>Těžiště</strong> je působiště tíhové síly, kterou Země působí na těleso. Tíhová síla působí na těleso jako celek v jednom bodě, právě v těžišti. Můžeme si představit, že v tomto bodě je soustředěná celá hmotnost tělesa. Těžiště značíme písmenem T. Každé těleso má vždy jedno těžiště.</p>\n<p>Těžiště je bod, pod kterým musíme těleso podepřít, aby zůstalo v klidu. Stejně tak ho můžeme zavěsit za bod, který leží přímo nad těžištěm. Když těleso není podepřeno pod těžištěm ani zavěšeno nad ním, tíhová síla ho začne překlápět a těleso padá.</p>\n<p>Můžeš si to vyzkoušet pokusem. Dřevěné pravítko zavěšené na šňůrce uprostřed zůstane viset vodorovně, protože těžiště je uprostřed. Když na jeden konec pravítka přivážeme těžší gumu, těžiště se posune a pravítko se nakloní.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-01.svg\" alt=\"Vyvážená soustava kamenů. Dole leží na sobě dva velké kameny, přes ně je položená dlouhá tenká deska. Na jejím levém konci jsou na sobě tři kameny, na pravém konci jeden kámen. Přes soustavu vede svislá červená čárkovaná přímka a k ní žlutá bublina s textem „Na této přímce leží těžiště celé soustavy kamenů“. Pod kresbou dva řádky: „každé těleso má vždy jedno těžiště“ a „označujeme ho písmenem T“\" /></a><figcaption>Těžiště celé soustavy kamenů leží na svislé přímce nad podepřením desky.</figcaption></figure>\n<p>Těžiště se může nacházet uvnitř tělesa, ale také mimo něj. Mimo těleso leží například u dutých těles, u obruče, podkovy nebo hrnečku.</p>\n\n<h3>Těžiště pravidelných těles</h3>\n<p>U geometricky pravidelných těles s pravidelně rozloženou hmotou leží těžiště v jejich geometrickém středu. Je to například koule, krychle, čtverec nebo kvádr.</p>\n<p>U trojúhelníku umíme těžiště narýsovat jako průsečík těžnic. Na obrázku jsou těžnice červené a těžiště je označené T.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-02.svg\" alt=\"Trojúhelník se třemi červenými úsečkami (těžnicemi), z nichž každá vede z jednoho vrcholu k protější straně. Všechny tři se protínají v jednom bodě označeném T\" /></a><figcaption>Těžnice trojúhelníku se protínají v jednom bodě, v těžišti T.</figcaption></figure>\n<p>U osově souměrných těles leží těžiště na jejich ose souměrnosti. Patří sem třeba váza, kuželka, hruška nebo člověk. Těžiště vázy leží uvnitř její dutiny na ose souměrnosti. Těžiště podkovy leží mimo těleso, také na ose souměrnosti.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-03.svg\" alt=\"Tři předměty vedle sebe, každý s křížkem a písmenem T a žlutou bublinou. Váza s červenou svislou čerchovanou osou souměrnosti: „Těžiště leží uvnitř dutiny vázy na její ose souměrnosti“. Podkova s osou souměrnosti, křížek leží v otevřeném prostoru uvnitř oblouku, ne v kovu: „Těžiště leží mimo těleso na ose souměrnosti“. Smeták s kartáčem dole a dlouhou rukojetí, křížek v rukojeti blíž ke kartáči: „Těžiště leží uvnitř rukojeti smetáku blíž těžší části“\" /></a><figcaption>Těžiště vázy leží v dutině, těžiště podkovy mimo kov a těžiště smetáku v rukojeti blíž ke kartáči.</figcaption></figure>\n\n<h3>Těžiště nepravidelných těles</h3>\n<p>U nepravidelných těles závisí poloha těžiště na rozložení látky v tělese. Těžiště najdeme pokusem, zavěšováním tělesa v různých polohách. Těleso zavěsíme za jeden bod a počkáme, až se ustálí. Svislý směr určuje <strong>těžnici</strong> tělesa. Je to přímka, která prochází bodem závěsu a má svislý směr. Těžiště leží na této přímce, pod bodem závěsu. Potom těleso zavěsíme za jiný bod a najdeme další těžnici. Těžiště leží v průsečíku všech těžnic.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-04.svg\" alt=\"Dvě zavěšení téhož plochého žlutého tělesa nepravidelného tvaru. Vlevo visí za jeden bod a nit se závažím ukazuje svislou červenou těžnici. Vpravo visí za jiný bod, jsou vidět obě červené těžnice a těžiště T je v jejich průsečíku\" /></a><figcaption>Těleso zavěsíme za dva různé body a těžiště najdeme v průsečíku obou těžnic.</figcaption></figure>\n<p>Těžiště těles s nepravidelným tvarem leží blíž k místu, kde je soustředěno nejvíc hmoty. U smetáku je těžiště uvnitř rukojeti, blíž k těžší části.</p>\n<p>Když je těleso vyrobeno z více látek s různou hustotou, je těžiště posunuto víc k té části, kde je hustota větší. (Látka s větší hustotou má při stejném objemu větší hmotnost.) Podle toho mají ženy těžiště o trochu níž než muži. Ženy mají větší pánev a muži větší ramena. U muže leží těžiště asi ve 57 % výšky těla nad zemí, u ženy asi v 55 %.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-05.svg\" alt=\"Dvě oblečené postavy zezadu vedle sebe, vlevo muž se znakem ♂, vpravo žena se znakem ♀. U každé je svislá kóta celé výšky h a vodorovná čára od paty k bodu T v úrovni boků. Kóta k bodu T je u muže popsaná „asi 57 % h“, u ženy „asi 55 % h“, bod T ženy je o kousek níž\" /></a><figcaption>Těžiště leží u muže asi ve 57 % a u ženy asi v 55 % výšky těla.</figcaption></figure>\n\n<h3>Stabilita tělesa</h3>\n<p><strong>Stabilita</strong> tělesa je schopnost tělesa udržet se v rovnovážné poloze po vychýlení, tedy schopnost odolávat převrácení. Těleso podepřené plochou (podstavou) je stabilní, když svislá přímka vedená těžištěm prochází touto plochou. Čím nižší je těžiště a čím větší je plocha podstavy, tím je těleso stabilnější. Stabilně stojí například cvičenkyně na kladině nebo stolek s květinou.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-06.svg\" alt=\"Dva obrázky vedle sebe. Vlevo cvičenkyně stojící vzpřímeně na kladině, uvnitř těla bod T a z něj svisle dolů šipka tíhy. Vpravo stolek s květinou v květináči, uvnitř bod T a z něj svisle dolů šipka tíhy. Popisky „a“ a „b“\" /></a><figcaption>Těleso je stabilní, když svislice z těžiště prochází plochou podepření.</figcaption></figure>\n<p>Stabilitu tělesa můžeme zvýšit třemi způsoby.</p>\n<ul>\n<li><strong>Poloha těžiště:</strong> těleso je stabilnější, když je jeho těžiště co nejníž nad podložkou. Proto se dětské hrnečky dělají s těžkým dnem, aby se těžko převrátily.</li>\n<li><strong>Plocha podstavy:</strong> čím větší je plocha podstavy tělesa, tím je těleso stabilnější. K vysokým stožárům se nahoře připevní lana a ta se upevní k zemi co nejdál od stožáru. Tím se zvětší plocha, která stožár stabilizuje.</li>\n<li><strong>Tvar tělesa:</strong> tělesa s širší základnou a nízkým těžištěm jsou obecně stabilnější. Brankář při chytání míče široce rozkročí nohy a přikrčí se. Komíny se stavějí dole široké a nahoře úzké.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-07.svg\" alt=\"Brankář v přikrčeném postoji na trávníku před sítí fotbalové branky, nohy rozkročené, ruce v rukavicích před tělem, mírně předkloněný. Bez popisků\" /></a><figcaption>Brankář při chytání široce rozkročí nohy a přikrčí se.</figcaption></figure>\n\n<h3>Rovnovážné polohy</h3>\n<p>Těleso podepřené nebo zavěšené v jediném bodě zůstane v klidu, jen když tento bod leží přesně pod těžištěm (podepření) nebo přesně nad ním (zavěšení). Rozlišujeme <strong>stálou</strong>, <strong>volnou</strong> a <strong>vratkou</strong> rovnovážnou polohu. Stabilní je těleso ve stálé rovnovážné poloze: po vychýlení se v ní udrží. Čím se jednotlivé polohy liší, vysvětluje část Pro zvídavé.</p>\n\n<h3>Těžiště v praxi</h3>\n<p>Stabilita těles je důležitá v architektuře a stavebnictví. Těžiště lidského těla se mění podle polohy. Toto umění rovnováhy těla musí ovládat sportovci, například artisté, gymnasté, atleti při skoku do výšky, akrobati, jezdci na kole, jezdci motokrosu nebo skokani na lyžích.</p>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-09.svg\" alt=\"Akrobatická skupina na cválajícím koni. Kůň nese na hřbetě jednoho člověka, ten drží rovnováhu s dalším akrobatem, který stojí nebo klečí výš nad ním\" /></a><figcaption>Akrobaté na koni musí neustále držet těžiště nad oporou.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<ul>\n<li>Těžiště T je působiště tíhové síly. Každé těleso má jedno těžiště. Může ležet i mimo těleso, například u obruče nebo podkovy.</li>\n<li>Pravidelná tělesa mají těžiště v geometrickém středu, u trojúhelníku je v průsečíku těžnic. Osově souměrná tělesa mají těžiště na ose souměrnosti.</li>\n<li>Těžiště nepravidelného tělesa najdeme zavěšováním v různých polohách. Leží v průsečíku těžnic a blíž k místu, kde je nejvíc hmoty.</li>\n<li>Stabilita je schopnost tělesa udržet se v rovnovážné poloze po vychýlení. Těleso podepřené plochou je stabilní, když svislice z těžiště prochází touto plochou.</li>\n<li>Stabilitu zvýšíme nižším těžištěm, větší plochou podstavy a širší základnou.</li>\n<li>Rozlišujeme stálou, volnou a vratkou rovnovážnou polohu.</li>\n</ul>",
					uvod: "Zkus položit pravítko vodorovně na prst. Když ho podepřeš uprostřed, zůstane ležet, ale kousek vedle spadne. Bod uprostřed pravítka, který prst podpírá, je jeho těžiště. Díky těžišti poznáme, proč se jedny věci převrací snáz než jiné.",
					zvidave: "<p>Rovnovážné polohy se liší tím, co se stane po vychýlení. Představ si tyč, která se může otáčet kolem bodu závěsu.</p>\n<ul>\n<li><strong>Stálá</strong> (také stabilní): těžiště leží pod bodem závěsu. Po vychýlení se těžiště zvedne, tíhová síla ho táhne zpět a těleso se vrátí. Příkladem je kulička na dně misky.</li>\n<li><strong>Vratká</strong> (také labilní): těžiště leží nad podepřeným bodem. Po vychýlení těžiště klesá a těleso se převrátí do jiné polohy. Příkladem je tužka postavená na špičku.</li>\n<li><strong>Volná</strong> (také indiferentní): těžiště je v bodě otáčení nebo zůstává po vychýlení stejně vysoko. Těleso zůstane v každé nové poloze. Příkladem je koule ležící na vodorovné podlaze.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste/teziste-obr-08.svg\" alt=\"Tři nákresy téže tyče vedle sebe, u každého označený bod T a šipka tíhy směřující z T svisle dolů. Popisky pod nákresy: a) stálá poloha (tyč visí na závěsu nad T), b) volná poloha (bod otáčení v T), c) vratká poloha (tyč stojí na podpěrném bodu pod T)\" /></a><figcaption>Tyč může být zavěšena nad těžištěm, podepřena v těžišti nebo pod ním, a to určuje její rovnovážnou polohu.</figcaption></figure>\n<p>Když těleso zavěsíme, natočí se tak, že těžiště je přímo pod bodem závěsu. Tíhová síla působí v těžišti a otáčí těleso, dokud těžiště nemá nejnižší možnou polohu. Proto těžnice vede přesně pod závěsem.</p>\n<p>Slovo těžnice se používá i u trojúhelníku. Těžnice trojúhelníku je úsečka, která spojuje vrchol se středem protější strany. Těžiště trojúhelníku leží v průsečíku všech tří těžnic.</p>\n<p>Široká podstava dovolí větší náklon bez převrácení a nízké těžiště ho udrží déle nad podstavou. Na vysoký komín nebo věž se vyplatí širší základna, na nákladní auto, jeřáb nebo soutěžní vůz nízké těžiště. Naložený vysoký náklad těžiště auta zvedne a v zatáčce se pak snáz převrátí.</p>\n<p>Provazochodec drží dlouhou tyč a posouvá ji na stranu. Tím posouvá těžiště celku „provazochodec s tyčí“ a udrží ho nad lanem.</p>",
					zapis: {"body":["těžiště T = působiště tíhové síly, každé těleso má jedno","těžiště může ležet i mimo těleso (obruč, podkova)","pravidelná tělesa: těžiště v geometrickém středu","osově souměrná tělesa: těžiště na ose souměrnosti","nepravidelná tělesa: zavěšujeme, těžiště = průsečík těžnic","těžiště je blíž k místu s nejvíc hmoty","stabilita = odolnost proti převrácení; roste s nižším těžištěm a větší podstavou","rovnovážné polohy: stálá, volná, vratká"]},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Kladka (3/3) — 1. díl',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/jednoduche-stroje-kladka-kladkostroj-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Kladka (1/3) — 1. díl',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/jednoduche-stroje-kladka-pevna-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Kladka (2/3) — 1. díl',
							cesta: '/media/fyzika/7-rocnik/jednoduche-stroje/kladka/jednoduche-stroje-kladka-volna-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
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
				{
					slug: 'klin',
					interakce: 'klin',
					nazev: 'Klín (nad rámec RVP)',
					obsah: "<h2>Klín (nad rámec RVP)</h2>\n<p><strong>Klín</strong> patří mezi <strong>jednoduché stroje</strong> stejně jako páka, kladka nebo nakloněná rovina. Používáme ho, když chceme něco rozštípnout, rozříznout nebo propíchnout. Klín se v hodinách neprobírá povinně — ber ho jako bonus k páce, kladce a nakloněné rovině.</p>\n\n<h3>Co je klín</h3>\n<p><strong>Klín</strong> si můžeš představit jako <strong>dvě nakloněné roviny přiložené zády k sobě</strong>. Jejich šikmé plochy se sbíhají do <strong>ostří</strong>, na opačném konci je klín nejtlustší — tam je jeho <strong>hřbet</strong>, do kterého tlučeme.</p>\n<p>Rozdíl proti nakloněné rovině je v tom, co se pohybuje: po nakloněné rovině táhneme <strong>břemeno</strong> a rovina stojí, kdežto klín se sám <strong>zaráží do materiálu</strong> a rozevírá ho do stran.</p>\n<p>Když do klínu udeříš shora (třeba kladivem do sekery zaražené do špalku), síla se na šikmých plochách klínu rozdělí na dvě síly, které tlačí <strong>do stran</strong>. Ty pak dřevo rozevírají a štípají.</p>\n\n<h3>Ostrý, nebo tupý klín</h3>\n<p>Čím je klín <strong>delší a tenčí</strong>, tím snáz vnikne do materiálu. Čím je <strong>kratší a tlustší (tupější)</strong>, tím větší silou ho musíme zarážet — zato materiál rozevře už po kratší dráze.</p>\n<p>Představ si dvě sekery s klínem stejně dlouhým 12 cm (měřeno od ostří ke hřbetu). Sekera A je u hřbetu tlustá 4 cm, sekera B jen 2 cm.</p>\n<p>Sekera B je dvakrát tenčí než sekera A (4 cm : 2 cm = 2). Její klín je štíhlejší, a proto <strong>snáz vnikne</strong> do dřeva — stačí menší síla úderu. Zato dřevo rozevře po stejné hloubce méně.</p>\n<p>Proto mají opravdové <strong>štípací</strong> sekery klín spíš tlustý: nemají do dřeva jen vniknout, ale hlavně ho rozevřít a rozlomit. Tenká čepel se ve špalku snadno zasekne. Tenký klín je naopak výhodný tam, kde chceme <strong>řezat nebo krájet</strong> — u nože nebo dláta.</p>\n\n<h3>Klín kolem nás</h3>\n<p>S klínem se setkáváš u spousty běžných nástrojů a věcí:</p>\n<ul>\n<li>sekera — štípe dřevo</li>\n<li>nůž — krájí a řeže</li>\n<li>dláto — vysekává drážky do dřeva</li>\n<li>hřebík — jeho hrot je klín, který se zaráží mezi vlákna dřeva</li>\n<li>zuby — přední zuby (řezáky) mají tvar klínu a slouží k ukusování</li>\n</ul>\n\n<h3>Zlaté pravidlo mechaniky i u klínu</h3>\n<p>Ani klín nám <strong>práci neušetří</strong> — jen ji rozloží na menší sílu a delší dráhu.</p>\n<p>I u klínu platí stejné pravidlo jako u ostatních jednoduchých strojů: <strong>kolikrát si usnadníme sílu, tolikrát delší dráhu (hloubku vniku) musíme urazit.</strong> Štíhlý a dlouhý klín vniká snáz, ale musí projít hlouběji, aby materiál rozštípl. Tlustý a tupý klín potřebuje větší sílu, zato materiál rozevře už po kratší dráze.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Pro klín je důležitý <strong>poměr délky klínu k jeho tloušťce</strong>. Spočítáme ho pro obě sekery:</p>\n<p>sekera A: 12 : 4 = <strong>3</strong>  |  sekera B: 12 : 2 = <strong>6</strong></p>\n<p>Sekera B má poměr dvakrát větší, a proto jí ke stejnému rozštípnutí stačí zhruba <strong>poloviční síla</strong> úderu. Zato musí do dřeva zajet dvakrát hlouběji, než ho rozevře stejně široko. To je přesně zlaté pravidlo mechaniky.</p>\n<p>Kdyby byl klín stejně tenký jako u sekery B (2 cm), ale dvakrát delší (24 cm), byl by poměr 24 : 2 = <strong>12</strong>. Takový klín by vnikal ještě snáz, ale musel by zajet ještě hlouběji.</p>",
					zapis: {"zakon":"Zlaté pravidlo mechaniky: kolikrát si usnadníme sílu, tolikrát delší dráhu musíme urazit. U klínu je touto dráhou hloubka, do které klín zajede.","body":["klín — jednoduchý stroj na štípání, řezání a propichování","klín = dvě nakloněné roviny přiložené zády k sobě, sbíhají se do ostří; proti ostří je hřbet","mění směr síly — úder shora se mění na síly rozevírající materiál do stran","štíhlý (dlouhý a tenký) klín — vnikne menší silou, ale musí zajet hlouběji","tlustý (tupý) klín — potřebuje větší sílu, zato rozevře materiál po kratší dráze (štípací sekera)","příklady: sekera, nůž, dláto, hrot hřebíku, přední zuby (řezáky)"],"jednotky":["délka klínu i jeho tloušťka — jednotka cm nebo m; 1 m = 100 cm","poměr délky klínu k tloušťce — bez jednotky (12 cm : 4 cm = 3)"]},
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
						{
							druh: 'video',
							nazev: 'Podkást POLEMIKA: Archimédův zákon — 1. díl',
							cesta: '/media/fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/archimeduv-zakon/archimeduv-zakon-dialog.mp4',
							ai: 'Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program.',
						},
					],
				},
				{
					slug: 'telesa-stejnoroda-a-nestejnoroda',
					nazev: 'Tělesa stejnorodá a nestejnorodá',
					interakce: 'nestejnoroda-lod',
					obsah: "<h2>Tělesa stejnorodá a nestejnorodá</h2>\n<h3>Stejnorodá tělesa</h3>\n<p>Stejnorodé těleso je vyrobené z <strong>jedné jediné látky</strong>. V celém svém objemu má stejné vlastnosti — stejnou hustotu, barvu i tvrdost. Příkladem je ocelový hřebík nebo skleněná kulička.</p>\n<h3>Nestejnorodá tělesa</h3>\n<p>Nestejnorodé těleso se skládá ze <strong>dvou nebo více různých látek</strong>. V různých částech má odlišné vlastnosti. Příkladem je tužka (dřevo a tuha), žula (křemen, živec a slída) nebo železobetonový panel (beton a ocelová výztuž).</p>\n<p>U nestejnorodého tělesa nemá smysl mluvit o jedné hustotě látky. Místo toho počítáme jeho <strong>průměrnou hustotu ρ<sub>p</sub></strong> — z hmotnosti a objemu CELÉHO tělesa, i s dutinami a různými částmi.</p>\n<h3>Pokus s plastelínou</h3>\n<p>Když uděláš z kousku plastelíny kuličku a hodíš ji do vody, klesne ke dnu — plastelína je hustší než voda.</p>\n<p>Ze stejného kousku plastelíny teď vytvaruj malou lodičku s dutinou uvnitř. Hmotnost plastelíny se nezměnila, ale objem lodičky je mnohem větší, protože obsahuje i vzduch. Průměrná hustota lodičky klesla pod hustotu vody, a proto plove.</p>\n<h3>Proč plove ocelová loď</h3>\n<p>Voda má hustotu 1 000 kg/m³, ocel asi 7 800 kg/m³. Kus plné oceli je tedy skoro osmkrát hustší než voda, a proto se ve vodě potopí. Trup lodi je ale dutý a uvnitř je vzduch, jehož hustota je jen asi 1,2 kg/m³.</p>\n<p>Průměrnou hustotu lodi počítáme z hmotnosti a objemu oceli i vzduchu dohromady. I malá dutina s lehkým vzduchem průměrnou hustotu hodně sníží. Když klesne průměrná hustota lodi pod 1 000 kg/m³, loď na vodě plove — přestože je celá z těžké oceli.</p>\n<h3>Proč se ponorka potápí, vynořuje a vznáší</h3>\n<p>Ponorka má ve svém trupu <strong>vyrovnávací (balastní) nádrže</strong>. Když do nich napustí vodu, její hmotnost se zvětší a průměrná hustota vzroste nad hustotu vody — ponorka klesá ke dnu.</p>\n<p>Když vodu z nádrží vypustí a nahradí ji vzduchem, hmotnost klesne a ponorka zase stoupá k hladině. Objem ponorky se přitom nemění, mění se jen její hmotnost.</p>\n<p>Když nádrže naplní vodou i vzduchem ve správném poměru, hmotnost ponorky se vyrovná hmotnosti vody, kterou vytlačí. Vztlaková síla a tíhová síla jsou pak stejně velké — ponorka se vznáší uprostřed vodního sloupce a neklesá ani nestoupá.</p>\n<h3>Proč potápěče nadnáší vesta</h3>\n<p>Potápěč má na sobě vestu, které se říká <strong>kompenzátor vztlaku</strong>. Když chce stoupat, napustí do vesty vzduch z lahve. Objem vesty se zvětší, ale hmotnost potápěče skoro ne — jeho průměrná hustota klesne pod hustotu vody.</p>\n<p>Když chce klesat, vzduch z vesty zase vypustí. Průměrná hustota lidského těla je přibližně stejná jako hustota vody, proto potápěč navíc potřebuje závaží, aby se mohl potopit do hloubky.</p>\n<h3>Pro zvídavé: počítáme</h3>\n<p>Průměrnou hustotu počítáme stejně jako hustotu jedné látky — z hmotnosti a objemu CELÉHO tělesa:</p>\n<p>ρ<sub>p</sub> = m : V</p>\n<p>Duté ocelové těleso má hmotnost 4 000 kg a objem 5 m³ (ocel i vzduch uvnitř dohromady). Jeho průměrná hustota je ρ<sub>p</sub> = m : V = 4 000 : 5 = 800 kg/m³. Protože 800 kg/m³ je méně než hustota vody 1 000 kg/m³, těleso na vodě plove.</p>\n<p>Jiné duté ocelové těleso má hmotnost 6 000 kg a stejný objem 5 m³. Jeho průměrná hustota je ρ<sub>p</sub> = 6 000 : 5 = 1 200 kg/m³. To je víc než hustota vody, takže toto těleso se potápí.</p>",
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
					odkazy: [{"nazev":"Wikipedie: Atmosférický tlak","url":"https://cs.wikipedia.org/wiki/Atmosférický_tlak"},{"nazev":"Škola s nadhledem: Atmosférický tlak","url":"https://www.skolasnadhledem.cz/game/3913"},{"nazev":"Umíme to: Atmosférický tlak","url":"https://www.umimefakta.cz/fyzika/cviceni-atmosfericky-tlak"}],
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
					odkazy: [{"nazev":"Wikipedie: Měření tlaku","url":"https://cs.wikipedia.org/wiki/Měření_tlaku"},{"nazev":"Škola s nadhledem: Přetlak, podtlak, vakuum","url":"https://www.skolasnadhledem.cz/game/3918"},{"nazev":"Eductify: Přetlak, podtlak, vakuum","url":"https://www.eductify.com/cs/fyzika/32/tlak/p-ppv/vakuum"}],
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
					odkazy: [{"nazev":"ČHMÚ: Meteorologická terminologie","url":"https://www.chmi.cz/predpoved-pocasi/meteorologicka-terminologie"},{"nazev":"Wikipedie: Anemometr","url":"https://cs.wikipedia.org/wiki/Anemometr"},{"nazev":"Škola s nadhledem: Atmosféra a meteorologie","url":"https://www.skolasnadhledem.cz/game/3915"}],
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
					odkazy: [{"nazev":"Světelný zdroj (Wikipedie)","url":"https://cs.wikipedia.org/wiki/Sv%C4%9Bteln%C3%BD_zdroj"},{"nazev":"Rychlost světla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/rychlost-svetla"},{"nazev":"Optické prostředí (Wikipedie)","url":"https://cs.wikipedia.org/wiki/Optick%C3%A9_prost%C5%99ed%C3%AD"},{"nazev":"Infračervené záření (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/elektromagneticke-vlny/infracervene-zareni"}],
					slug: 'svetlo-jeho-zdroje',
					nazev: 'Světlo a jeho zdroje',
					interakce: 'rychlost-svetla',
					obsah: "\n\t\t\t\t\t\t<h2>Světlo a jeho zdroje</h2>\n\t\t\t\t\t\t<p><strong>Světlo</strong> je druh záření, které vidíme zrakem. Nauka o světle, jeho šíření a vnímání se nazývá <strong>optika</strong>.</p>\n\t\t\t\t\t\t<p>Předměty světlo buď <strong>vyrábějí</strong> (zdroje světla), nebo jen <strong>odrážejí</strong> cizí světlo. Díky odrazu vidíme třeba Měsíc, zrcadlo nebo tento papír — jsou to druhotné zdroje.</p>\n\n\t\t\t\t\t\t<h3>Zdroje světla</h3>\n\t\t\t\t\t\t<p>Zdroj světla je těleso, které vysílá světlo a přitom mění jiný druh energie na světelnou. Zdroje dělíme podle původu na přírodní a umělé.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>přirozené zdroje</strong>: Slunce, oheň, blesk, světluška</li>\n\t\t\t\t\t\t<li><strong>umělé zdroje</strong>: žárovka, zářivka, LED, svíčka, displej</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Podle velikosti rozlišujeme <strong>bodové</strong> a <strong>plošné</strong> zdroje. U bodového zdroje (hvězda, pouliční lampa, svíčka) jsou rozměry zanedbatelné a paprsky se z něj šíří <strong>rozbíhavě</strong>. Plošný zdroj má velkou svítící plochu (řada zářivek na stropě, TV obrazovka) — chová se jako mnoho bodových zdrojů vedle sebe, proto za překážkou vzniká i polostín. Ve velké vzdálenosti od bodového zdroje se rozbíhavost paprsků zmenšuje — sluneční paprsky dopadající na Zemi jsou už prakticky rovnoběžné.</p>\n\n\t\t\t\t\t\t<h3>Druhy zdrojů podle vzniku</h3>\n\t\t\t\t\t\t<p>Světlo může vznikat několika různými způsoby.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>rozžhavená tělesa</strong> — svítí díky vysoké teplotě (Slunce, plamen, hvězdy, vlákno žárovky)</li>\n\t\t\t\t\t\t<li><strong>chemické zdroje</strong> — světlo vzniká chemickou reakcí (světluška, svítící tyčinka); u živočichů a rostlin se tomu říká <strong>bioluminiscence</strong></li>\n\t\t\t\t\t\t<li><strong>elektrický výboj v plynech</strong> — světlo vzniká průchodem proudu plynem (blesk, jiskry, zářivky)</li>\n\t\t\t\t\t\t<li><strong>fosforeskující látky</strong> — postupně uvolňují dřív uschovanou energii (svítící ručičky hodin)</li>\n\t\t\t\t\t\t<li><strong>elektronické zdroje</strong> — LED žárovky, displeje telefonů, obrazovky televizí</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Nad 525 °C tělesa svítí červeně, při dalším zahřívání přes oranžovou a žlutou až k bílé a modrobílé. Povrch Slunce má teplotu asi 5 500 °C.</p>\n\n\t\t\t\t\t\t<h3>Neviditelné záření: infračervené a ultrafialové</h3>\n\t\t\t\t\t\t<p>Lidské oko vidí jen část záření — barevné spektrum. Těsně vedle něj leží záření, která nevidíme.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>infračervené záření (IR)</strong> — leží za červenou barvou, vnímáme ho jako teplo; vidí ho hadi</li>\n\t\t\t\t\t\t<li><strong>ultrafialové záření (UV)</strong> — leží za fialovou barvou; vidí ho ptáci, hmyz a ryby</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Infračervené záření snímají termokamery a využívá se třeba v dálkových ovladačích. Ultrafialové záření je v malém množství zdravé (opalování), ve větším škodí kůži i očím.</p>\n\n\t\t\t\t\t\t<h3>Šíření světla</h3>\n\t\t\t\t\t\t<p>Světlo se šíří prostorem všemi směry jako vlnění. Vlny si rozkládáme na <strong>paprsky</strong>, které kreslíme jako přímku se šipkou. Ve <strong>stejnorodém (homogenním) prostředí</strong> se paprsky šíří <strong>přímočaře</strong> — po dokonalých přímkách.</p>\n\t\t\t\t\t\t<p>Homogenní prostředí má stejné optické vlastnosti v celém svém objemu, například čirá voda nebo sklo. Atmosféra mění hustotu podle výšky i teploty, a proto jako celek homogenní není.</p>\n\t\t\t\t\t\t<p>Přímočarého šíření světla využívá měření vzdálenosti laserem, optická vodováha i laserové řezání materiálu. Vzniká díky němu také stín.</p>\n\n\t\t\t\t\t\t<h3>Optické prostředí</h3>\n\t\t\t\t\t\t<p>Optické prostředí je prostředí, kterým se může světlo šířit — třeba některé látky nebo vakuum. Různá prostředí ovlivňují průchod světla různě: pohlcují ho, rozptylují, nebo odrážejí.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>průhledné</strong> — světlo prochází bez rozptylu, obraz vidíme beze změny (čirá voda, vzduch, čiré sklo)</li>\n\t\t\t\t\t\t<li><strong>průsvitné</strong> — světlo prochází, ale zčásti se rozptyluje; vidíme jen rozmazané obrysy (mlha, kouř, mléčné sklo, matné sklo)</li>\n\t\t\t\t\t\t<li><strong>neprůhledné</strong> — světlo neprochází, buď se pohltí, nebo se odrazí na povrchu (kov, dřevo, beton, zeď, zrcadlo)</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Odraz světla od zrcadel a lesklých povrchů podrobně vysvětluje podtéma o odrazu světla.</p>\n\n\t\t\t\t\t\t<h3>Rychlost světla</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>ve vakuu: <strong>c = 300 000 km/s = 300 000 000 m/s</strong> — největší rychlost ve vesmíru</li>\n\t\t\t\t\t\t<li>rychlost světla ve vakuu je základní fyzikální konstanta, značí se <strong>c</strong></li>\n\t\t\t\t\t\t<li>ve vzduchu: téměř stejná; ve vodě ~225 000 km/s; ve skle ~200 000 km/s; v diamantu ~125 000 km/s</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>V každém prostředí kromě vakua se světlo šíří pomaleji.</p>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Slunce je od Země vzdálené 150 000 000 km. Této vzdálenosti se říká <strong>astronomická jednotka</strong>, značka AU.</p>\n\t\t\t\t\t\t<p>Čas, za který k nám doletí sluneční světlo, spočítáme podle vzorce t = s : v.</p>\n\t\t\t\t\t\t<p>t = s : v = 150 000 000 : 300 000 = <strong>500 s</strong></p>\n\t\t\t\t\t\t<p>500 sekund je asi <strong>8 minut a 20 sekund</strong> — tak dlouho letí světlo ze Slunce k Zemi.</p>\n\t\t\t\t\t\t<p>Od vzdálenějších hvězd letí světlo roky. Vzdálenosti hvězd proto udáváme ve <strong>světelných letech</strong> (ly) — to je dráha, kterou světlo urazí za 1 rok. Světlo z Polárky k nám letí 433 let.</p>\n\t\t\t\t\t",
					zapis: {"body":["zdroje vyrábějí světlo, ostatní jen odrážejí (Měsíc, zrcadlo)","zdroje: přirozené/umělé; bodové (rozbíhavé), plošné (rovnoběžné)","světlo se šíří všemi směry; ve stejnorodém prostředí přímočaře","optické prostředí: průhledné, průsvitné, neprůhledné","ve vakuu 300 000 km/s, jinde pomaleji","optika: nauka o světle a jeho vnímání","rozžhavená tělesa: svítí teplem (Slunce, žárovka)","nad 525 °C: červená → oranžová → žlutá → bílá → modrobílá","chemické zdroje (bioluminiscence): světluška, svítící tyčinka","elektrický výboj v plynu: blesk, zářivka","fosforeskující a elektronické zdroje: hodiny, LED, displej","infračervené (IR): za červenou, cítíme jako teplo","ultrafialové (UV): za fialovou, ve velkém škodí","homogenní prostředí: stejné vlastnosti v celém objemu","atmosféra není homogenní: mění se hustota i teplota","přímočaré šíření: laser, vodováha, vznik stínu","Slunce–Země = 150 000 000 km = 1 AU, světlo 500 s","světelný rok (ly): Polárka je 433 světelných let"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Světlo — od plamene ke hvězdám', cesta: 'v4EdVxeZ9J0' },
						{ druh: 'youtube', nazev: 'Video: Odhalený svět světla', cesta: 'JkgrUOUgZ7Q' },
						{ druh: 'video', nazev: 'Píseň: Světelný proud 🎵', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/svetlo-jeho-zdroje/pisen-svetelny-proud.mp4' },
					],
				},
				{
					odkazy: [{"nazev":"Odraz a lom světla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/odraz-lom-svetla"}],
					slug: 'odraz-svetla',
					nazev: 'Odraz světla, zákon odrazu',
					interakce: 'odraz',
					obsah: "\n\t\t\t\t\t\t<h2>Odraz světla, zákon odrazu</h2>\n\t\t\t\t\t\t<p>Dopadne-li světelný paprsek na rozhraní dvou prostředí, může nastat <strong>odraz</strong>, <strong>lom</strong> nebo <strong>pohlcení</strong> světla. Prostředí, která světlo nepropouštějí ani nepohlcují, ho odrážejí.</p>\n\n\t\t\t\t\t\t<h3>Odraz na různých površích</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>nerovná plocha</strong> → rozptyl světla, díky němu vidíme i do stínu (stěny místnosti)</li>\n\t\t\t\t\t\t<li><strong>rovná lesklá plocha</strong> → svazek zůstane rovnoběžný (zrcadlo, klidná hladina, hladký plech)</li>\n\t\t\t\t\t\t<li><strong>dvě rovnoběžná zrcadla naproti sobě</strong> → obraz se odráží mezi nimi sem a tam a vzniká nekonečná řada zmenšujících se obrazů</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Odrazka na kole</h3>\n\t\t\t\t\t\t<p>Odrazka je poskládaná z drobných <strong>koutů</strong> — tří na sebe kolmých plošek jako roh krabice. Paprsek se v koutu odrazí třikrát a vyjde <strong>zpátky přesně tím směrem, odkud přišel</strong>. Proto odrazka „svítí\" právě řidiči, jehož světla na ni dopadla. Stejně fungují i patníky u silnice.</p>\n\n\t\t\t\t\t\t<h3>Zákon odrazu</h3>\n\t\t\t\t\t\t<p><strong>Úhel dopadu</strong> α je úhel mezi dopadajícím paprskem a kolmicí dopadu. <strong>Úhel odrazu</strong> α′ je úhel mezi odraženým paprskem a touž kolmicí.</p>\n\t\t\t\t\t\t<p><strong>„Úhel odrazu je roven úhlu dopadu.\"</strong> — zapisujeme α' = α.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>oba úhly měříme <strong>od kolmice dopadu</strong> (kolmice k ploše v bodě dopadu)</li>\n\t\t\t\t\t\t<li>dopadající i odražený paprsek leží <strong>v jedné rovině</strong></li>\n\t\t\t\t\t\t<li>kolmici umíme sestrojit i pro zakřivené plochy — u koule je to spojnice středu s bodem dopadu</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Zrcadla</h3>\n\t\t\t\t\t\t<p>Zrcadlo má hladký lesklý povrch — vyleštěný kov chráněný sklem. Podle tvaru je <strong>rovinné, kulové, nebo válcové</strong>.</p>\n\t\t\t\t\t\t<p>Podobně se chová i klidná hladina vody nebo okenní tabule: část světla se odrazí a část projde dál.</p>\n\t\t\t\t\t\t<p>Zrcadlo v nákresu kreslíme jako čáru podle tvaru odrazné plochy; stranu, kam světlo neprojde, <strong>zašrafujeme</strong>.</p>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Paprsek dopadne na zrcadlo pod úhlem 30°. Podle zákona odrazu α′ = α se odrazí pod stejným úhlem: α′ = 30°.</p>\n\t\t\t\t\t\t<p>Když paprsek dopadne na zrcadlo kolmo (úhel dopadu 0°), odrazí se také pod úhlem 0° — vrátí se zpátky stejnou cestou.</p>\n\t\t\t\t\t",
					zapis: {"vzorec":"α′ = α","jednotky":["úhel dopadu — značíme α, jednotka stupeň (°)","úhel odrazu — značíme α′, jednotka stupeň (°)","oba úhly dosazuj ve stupních (°) a měř je od kolmice dopadu"],"vzorecSlovy":"Úhel odrazu se rovná úhlu dopadu.","zakon":"Úhel odrazu je roven úhlu dopadu.","body":["na rozhraní: odraz, lom, pohlcení","co světlo nepropustí ani nepohltí: odrazí se","nerovná plocha → rozptyl světla","rozptyl: vidíme předměty i ve stínu","rovná lesklá plocha → svazek rovnoběžný","dvě zrcadla naproti → nekonečná řada obrazů","odrazka: kout ze 3 plošek, vrátí paprsek zpět","zákon odrazu: α′ = α","úhly měříme od kolmice dopadu","dopadající, odražený paprsek, kolmice: jedna rovina","kolmice jde i pro křivé plochy (u koule: spojnice středu)","zrcadlo: hladký lesklý povrch (kov + sklo); tvary rovinné, kulové, válcové","hladina vody, okenní tabule: část odrazí, část projde","značka zrcadla: čára podle tvaru + šrafování za ní","příklad: dopad 30° → odraz 30° (i 0° → 0°)"]},
					materialy: [
					],
				},
				{
					odkazy: [{"nazev":"Odraz a lom světla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/odraz-lom-svetla"},{"nazev":"Úplný odraz světla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/uplny-odraz-svetla"}],
					slug: 'lom-svetla',
					nazev: 'Lom světla',
					interakce: 'lom',
					obsah: "\n\t\t\t\t\t\t<h2>Lom světla</h2>\n\t\t\t\t\t\t<p>Při přechodu do jiného optického prostředí světlo <strong>mění rychlost</strong> — a proto se <strong>láme</strong> (mění směr). Lom nastává na rozhraní dvou prostředí s různými optickými vlastnostmi.</p>\n\t\t\t\t\t\t<p>Ve vakuu a ve vzduchu letí světlo asi <strong>300 000 km/s</strong>. Ve vodě už jen asi <strong>225 000 km/s</strong>, ve skle kolem <strong>200 000 km/s</strong>. V diamantu letí světlo nejpomaleji — jen asi <strong>125 000 km/s</strong>. Čím je prostředí opticky hustší, tím je světlo pomalejší — a tím víc se láme.</p>\n\n\t\t\t\t\t\t<h3>Opticky hustší a opticky řidší prostředí</h3>\n\t\t\t\t\t\t<p>Prostředí porovnáváme veličinou <strong>index lomu</strong>. Značíme ho <strong>n</strong> a jednotku nemá — jen udává, kolikrát je v daném prostředí světlo pomalejší než ve vakuu.</p>\n\t\t\t\t\t\t<p>Čím větší index lomu, tím je prostředí <strong>opticky hustší</strong>. Voda má index lomu asi 1,33, sklo 1,5 až 1,9, vzduch přibližně 1.</p>\n\t\t\t\t\t\t<p><strong>Opticky hustší prostředí</strong> — světlo se v něm šíří pomaleji, třeba voda nebo sklo. <strong>Opticky řidší prostředí</strong> — světlo se v něm šíří rychleji, třeba vzduch.</p>\n\n\t\t\t\t\t\t<h3>Dva případy lomu</h3>\n\t\t\t\t\t\t<p>Úhel dopadu α a úhel lomu β měříme od kolmice dopadu — pomyslné čáry kolmé na rozhraní. Když paprsek dopadá přesně po kolmici, vůbec se neláme.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>lom KE kolmici</strong> — z prostředí opticky řidšího do hustšího (vzduch → voda/sklo); úhel lomu β je <strong>menší</strong> než úhel dopadu α</li>\n\t\t\t\t\t\t<li><strong>lom OD kolmice</strong> — z hustšího do řidšího (voda → vzduch); úhel lomu je <strong>větší</strong> než úhel dopadu</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Úplný odraz</h3>\n\t\t\t\t\t\t<p>Při přechodu z hustšího do řidšího prostředí se s rostoucím úhlem dopadu zvětšuje úhel lomu. Při <strong>mezním úhlu dopadu</strong> je úhel lomu 90° — lomený paprsek běží podél rozhraní.</p>\n\t\t\t\t\t\t<p>Při ještě větším úhlu dopadu se paprsek už nezlomí ven a nastává <strong>úplný (totální) odraz</strong>. Využívají ho optická vlákna, odrazky i odrazné hranoly ve fotoaparátech a dalekohledech.</p>\n\n\t\t\t\t\t\t<h3>Lom světla kolem nás</h3>\n\t\t\t\t\t\t<p>Paprsky od ponořené části hole nebo brčka se na hladině lámou — oko je prodlouží rovně a předmět se zdá zalomený. Ze stejného důvodu vypadá bazén mělčí, než doopravdy je.</p>\n\t\t\t\t\t\t<p>Ryby a jiné předměty pod hladinou vidíme jinde, než kde skutečně jsou. Lom světla způsobuje i <strong>fata morganu</strong> — zdánlivé zrcadlení oblohy nad rozpáleným pískem nebo silnicí.</p>\n\t\t\t\t\t\t<p>Při východu a západu Slunce vidíme sluneční kotouč zploštělý. Lomu světla využívají i čočky — třeba v lupě, brýlích nebo dalekohledu.</p>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Index lomu spočítáme vzorcem n = c / v. Písmeno c je rychlost světla ve vakuu, písmeno v rychlost světla v daném prostředí.</p>\n\t\t\t\t\t\t<p>Vezmeme sklo s indexem lomu n = 1,5 — to je spodní hodnota z tabulky. Vzorec si upravíme na v = c / n.</p>\n\t\t\t\t\t\t<p>v = c / n = 300 000 / 1,5 = <strong>200 000 km/s</strong></p>\n\t\t\t\t\t\t<p>Vyšla nám stejná rychlost světla ve skle, jakou jsme si řekli na začátku.</p>\n\t\t\t\t\t",
					zapis: {"vzorec":"n = c / v","jednotky":["index lomu — značíme n, jednotku nemá (jen poměr rychlostí)","rychlost světla ve vakuu — značíme c, jednotka km/s (kilometr za sekundu)","rychlost světla v prostředí — značíme v, jednotka km/s (kilometr za sekundu)"],"vzorecSlovy":"Index lomu vypočítáme jako podíl rychlosti světla ve vakuu a rychlosti světla v daném prostředí.","body":["lom: světlo mění rychlost i směr","lom nastává: na rozhraní dvou prostředí","řidší → hustší: lom ke kolmici","hustší → řidší: lom od kolmice","n: poměr rychlostí, bez jednotky","větší n = opticky hustší prostředí","n vody ≈ 1,33","n skla = 1,5 až 1,9","n vzduchu ≈ 1","mezní úhel dopadu: úhel lomu 90°","nad mezním úhlem: úplný (totální) odraz","využití: optická vlákna, odrazky, hranoly","brčko ve vodě: zdá se zalomené","bazén: hloubka vypadá menší","ryby pod hladinou: vidíme je jinde","fata morgana: zdánlivé zrcadlení oblohy","lom využívají: čočky (lupa, brýle, dalekohled)","výpočet: v = c / n","sklo: v = 200 000 km/s"]},
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Index lomu 🎵', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/lom-svetla/pisen-index-lomu.mp4' },
					],
				},
				{
					odkazy: [{"nazev":"Fáze Měsíce (astro.cz)","url":"https://planety.astro.cz/zeme/1959-faze-mesice"},{"nazev":"Zatmění Měsíce (astro.cz)","url":"https://www.astro.cz/na-obloze/mesic/zatmeni-mesice.html"},{"nazev":"Zatmění Slunce (astro.cz)","url":"https://www.astro.cz/na-obloze/slunce/zatmeni-slunce.html"}],
					slug: 'stin-faze-mesice',
					nazev: 'Stín a fáze Měsíce',
					interakce: 'mesic',
					obsah: "\n\t\t\t\t\t\t<h2>Stín a fáze Měsíce</h2>\n\n\t\t\t\t\t\t<h3>Stín a polostín</h3>\n\t\t\t\t\t\t<p>Za neprůhledným tělesem vzniká <strong>stín</strong> — prostor, kam nesvítí žádné světlo, protože se světlo šíří přímočaře. Na stínítku vidíme <strong>vržený stín</strong>, například stín stromu na silnici. Hranici stínu určují paprsky, které procházejí těsně kolem okraje tělesa. U bodového zdroje polostín nevzniká a hranice stínu je ostrá.</p>\n\t\t\t\t\t\t<p>U plošných zdrojů vzniká kolem stínu ještě <strong>polostín</strong> — prostor, kam dopadá světlo jen z části zdroje. Polostín není úplně tmavý, na stínítku je jen slabě šedý.</p>\n\n\t\t\t\t\t\t<h3>Fáze Měsíce</h3>\n\t\t\t\t\t\t<p>Měsíc sám nesvítí, vidíme jen tu část, kterou osvětluje Slunce. Měsíc obíhá Zemi a mění polohu, proto vidíme pokaždé jinak velkou osvětlenou část.</p>\n\t\t\t\t\t\t<p>Při <strong>novu</strong> je Měsíc mezi Zemí a Sluncem, a tak vidíme jeho neosvětlenou stranu. Při <strong>úplňku</strong> je naopak Země mezi Sluncem a Měsícem, a tak vidíme celou osvětlenou stranu.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>nov</strong> → <strong>první čtvrť</strong> (dorůstá, tvar D) → <strong>úplněk</strong> → <strong>poslední čtvrť</strong> (couvá, tvar C) → nov</li>\n\t\t\t\t\t\t<li>celý cyklus fází trvá přibližně <strong>29,5 dne</strong></li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Zatmění Měsíce</h3>\n\t\t\t\t\t\t<p>Zatmění Měsíce nastane, když se <strong>Země dostane mezi Slunce a Měsíc</strong>. Země vrhá stín na Měsíc, který ztmavne nebo zčervená — říká se mu pak <strong>krvavý Měsíc</strong>. Sluneční světlo se přitom láme a rozptyluje v zemské atmosféře, a do stínu propustí jen červenou barvu. Zatmění Měsíce lze bezpečně pozorovat pouhým okem.</p>\n\t\t\t\t\t\t<p>Může nastat jen při <strong>úplňku</strong>. Měsíc ale neobíhá Zemi ve stejné rovině jako Země kolem Slunce. Proto stín Země často Měsíc mine, nebo zasáhne jen zčásti.</p>\n\t\t\t\t\t\t<p>Zatmění Měsíce nastává průměrně dvakrát až třikrát do roka, nejvýše pětkrát. Někdy ale žádné nenastane a čeká se i několik let. Podle toho, kolik Měsíce zasáhne stín, rozlišujeme zatmění <strong>úplné</strong> (celý Měsíc ve stínu) a <strong>částečné</strong> (jen část Měsíce ve stínu).</p>\n\n\t\t\t\t\t\t<h3>Zatmění Slunce</h3>\n\t\t\t\t\t\t<p>Zatmění Slunce nastane, když se <strong>Měsíc dostane mezi Zemi a Slunce</strong> a zakryje ho. Měsíc přitom vrhá stín na Zemi. Dívat se smíš jen přes <strong>ochranné brýle</strong> — jedinou výjimkou je těch pár minut, kdy Měsíc zakryje celé Slunce.</p>\n\t\t\t\t\t\t<p>Může nastat jen při <strong>novu</strong>. Slunce je sice 400krát větší než Měsíc, ale je také 400krát dál od Země. Proto na obloze vidíme oba kotouče stejně velké.</p>\n\t\t\t\t\t\t<p>Při <strong>úplném zatmění</strong> je celé Slunce zakryté Měsícem, na několik minut je tma a kolem Měsíce září sluneční korona. Při <strong>částečném zatmění</strong> Měsíc zakryje jen část Slunce a jas zůstává stále silný. Kdo stojí jen v polostínu Měsíce, vidí právě tenhle částečný jev.</p>\n\t\t\t\t\t\t<p>Úplné zatmění Slunce nastává na Zemi zhruba každých 18 měsíců, ale je vidět jen na malém území, proto je vzácné. Částečná zatmění jsou častější a vidí je větší část Země.</p>\n\n\t\t\t\t\t\t<h3>Prstencové zatmění (pro zajímavost)</h3>\n\t\t\t\t\t\t<p>Dráha Měsíce kolem Země není kruh, ale elipsa, takže je Měsíc někdy blíž Zemi a někdy dál. Když je Měsíc dál, jeho kotouč je na obloze menší než sluneční.</p>\n\t\t\t\t\t\t<p>Slunce pak Měsíc nezakryje celé — kolem tmavého Měsíce zůstane zářit tenký prstenec Slunce. Tomuto jevu se říká <strong>prstencové zatmění Slunce</strong>.</p>\n\t\t\t\t\t",
					zapis: {"body":["stín: prostor bez světla za tělesem","vržený stín: např. strom na silnici","hranici stínu určují okrajové paprsky","polostín: u plošných zdrojů, slabě šedý","Měsíc nesvítí, vidíme jeho osvětlenou část","fáze: nov, D, úplněk, C, nov","cyklus fází trvá přibližně 29,5 dne","nov: Měsíc uprostřed; úplněk: Země uprostřed","zatmění Měsíce: při úplňku, dráhy nesouběžné","zatmění Měsíce 2–3× ročně; úplné/částečné: celý/část ve stínu, zrudne","zatmění Slunce: jen při novu","dívat se jen přes ochranné brýle","výjimka: pár minut úplného zákrytu","Slunce 400× větší, 400× dál","proto kotouče na obloze stejně velké","úplné Slunce: tma+korona, vzácné (malé území); částečné: jas silný, častější","prstencové zatmění: Měsíc dál, nezakryje celé"]},
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
					odkazy: [{"nazev":"Zrcadla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/opticke-zobrazovani/zrcadla"},{"nazev":"Zobrazení rovinným zrcadlem (ELUC)","url":"https://eluc.ikap.cz/lekce/zobrazeni-rovinnym-zrcadlem"},{"nazev":"Odraz světla a zrcadla – 7. ročník (Umíme fakta)","url":"https://www.umimefakta.cz/fyzika/cviceni-odraz-svetla-a-zrcadla-7-trida"}],
					slug: 'optika-rovinneho-zrcadla',
					interakce: 'rovinne-zrcadlo',
					nazev: 'Optika rovinného zrcadla',
					obsah: "<h2>Optika rovinného zrcadla</h2>\n<p>Naše oko vytvoří obraz těles. Některá <strong>sama svítí</strong> (Slunce, hvězdy, žárovka), jiná jsou <strong>osvětlená a odrážejí světlo</strong> do našich očí (kniha, stůl, hory, Měsíc). Když se světlo odrazí od zrcadla, vzniká <strong>obraz tělesa</strong>. Pro odražené paprsky platí <strong>zákon odrazu</strong> (úhel odrazu se rovná úhlu dopadu).</p>\n\n<h3>Jaký obraz vidí naše oko</h3>\n<p>Obraz předmětu je určen paprsky, které do oka přicházejí — <strong>obraz vidíme vždy ve směru přicházejících paprsků</strong>. Na vznik obrazu nemá vliv, jestli se paprsek cestou odrazil, nebo lomil. Zda jde o skutečný předmět, nebo jen jeho obraz v zrcadle, vyhodnotí teprve náš mozek podle zkušeností.</p>\n\n<h3>Vlastnosti obrazu v rovinném zrcadle</h3>\n<ul>\n<li><strong>zdánlivý</strong> — nevzniká skutečnými paprsky, je „za zrcadlem“, nejde zachytit na stínítko (vytvoří ho jen náš zrak)</li>\n<li><strong>stejně velký</strong> jako předmět</li>\n<li><strong>stejně vzdálený</strong> od zrcadla jako předmět</li>\n<li><strong>stranově převrácený</strong> — pravá strana se jeví jako levá a naopak (při jiném natočení zrcadla zase horní strana jako dolní)</li>\n<li><strong>vzpřímený</strong> — není obrácený vzhůru nohama</li>\n</ul>\n<p>Obraz sestrojíme pomocí <strong>osové souměrnosti</strong> podle roviny zrcadla.</p>\n\n<h3>Využití</h3>\n<p>Kosmetická zrcadla používáme k líčení, estetická zrcadla opticky zvětšují místnost. Dalším využitím je <strong>periskop</strong> ponorky a zrcadlové nápisy. Proto se na sanitkách píše nápis <strong>AMBULANCE zrcadlově</strong> — ve zpětném zrcátku ho pak řidič vpředu přečte správně.</p>",
					zapis: {"zakon":"Zákon odrazu: úhel odrazu se rovná úhlu dopadu.","body":["zrcadlo: odraz světla → vzniká obraz tělesa","obraz vidíme ve směru paprsků do oka","cesta paprsku (odraz, lom): bez vlivu","skutečný předmět, nebo obraz: pozná mozek","vlastnost 1: zdánlivý (nejde zachytit na stínítko)","vlastnost 2: stejně velký jako předmět","vlastnost 3: stejně vzdálený od zrcadla","vlastnost 4: stranově převrácený (pravá ↔ levá)","vlastnost 5: vzpřímený (ne vzhůru nohama)","obraz sestrojíme: osová souměrnost podle zrcadla","využití: kosmetická (líčení), estetická (zvětšení místnosti)","využití: periskop ponorky","využití: zrcadlové nápisy (AMBULANCE na sanitce)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Iluze reality — rovinná zrcadla', cesta: 'JsleRYDXXwM' },
					],
				},
				{
					odkazy: [{"nazev":"Zrcadla (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/opticke-zobrazovani/zrcadla"},{"nazev":"Zobrazení dutým zrcadlem (ELUC)","url":"https://eluc.ikap.cz/lekce/zobrazeni-dutym-zrcadlem"},{"nazev":"Zobrazení vypuklým zrcadlem (ELUC)","url":"https://eluc.ikap.cz/lekce/zobrazeni-vypuklym-zrcadlem"}],
					slug: 'kulova-zrcadla-dute-zrcadlo',
					nazev: 'Kulová zrcadla a duté zrcadlo',
					interakce: 'zrcadlo',
					obsah: "<h2>Kulová zrcadla a duté zrcadlo</h2>\n<p>Lesklá koule odráží světlo a může fungovat jako zrcadlo. U vyráběných <strong>kulových zrcadel</strong> tvoří odraznou plochu jen malá část povrchu koule (tzv. vrchlík).</p>\n\n<h3>Popis kulového zrcadla</h3>\n<ul>\n<li><strong>střed křivosti S</strong> — střed kulové plochy, z níž je zrcadlo vyrobeno (někdy značený také C)</li>\n<li><strong>poloměr křivosti r</strong> — poloměr této kulové plochy (r = |SV|)</li>\n<li><strong>vrchol V</strong> — nejvyšší bod zrcadla, když ho položíme okrajem na podložku (leží na optické ose)</li>\n<li><strong>optická osa o</strong> — spojnice středu křivosti a vrcholu</li>\n<li><strong>ohnisko F</strong> — leží přesně uprostřed mezi středem křivosti a vrcholem</li>\n<li><strong>ohnisková vzdálenost f</strong> — vzdálenost ohniska od vrcholu (základní parametr zrcadla)</li>\n</ul>\n<p>Protože ohnisko leží přesně v polovině mezi středem křivosti a vrcholem, platí vztah <strong>f = r/2</strong>.</p>\n\n<h3>Duté zrcadlo</h3>\n<p>Odraznou plochou je <strong>vnitřní</strong> (vydutá) strana kulové plochy. Střed i ohnisko leží <strong>před zrcadlem</strong> a jsou <strong>skutečné</strong> — paprsky jimi opravdu procházejí.</p>\n<ul>\n<li>paprsky rovnoběžné s osou se po odrazu setkají <strong>v ohnisku</strong> (lze zapálit oheň, soustředit sluneční energii v solární elektrárně)</li>\n<li>naopak paprsky vycházející z ohniska se po odrazu šíří jako <strong>rovnoběžný svazek</strong> → reflektory světel aut a svítilen</li>\n<li>duté zrcadlo se používá i v <strong>solárním kolektoru</strong>, kde soustředěné paprsky ohřívají vodu</li>\n</ul>\n<p>Obraz v dutém zrcadle závisí na vzdálenosti předmětu:</p>\n<ul>\n<li>předmět <strong>dál než poloměr r</strong> → obraz skutečný, převrácený, <strong>zmenšený</strong></li>\n<li>předmět <strong>mezi r a ohniskem f</strong> → obraz skutečný, převrácený, <strong>zvětšený</strong></li>\n<li>předmět <strong>blíž než ohnisko f</strong> → obraz zdánlivý, vzpřímený, <strong>zvětšený</strong> (kosmetické, zubní i ušní zrcátko)</li>\n</ul>\n\n<h3>Konstrukce obrazu pomocí tří paprsků</h3>\n<p>Obraz v dutém zrcadle najdeme pomocí <strong>tří význačných paprsků</strong>:</p>\n<ul>\n<li><strong>rovnoběžný</strong> paprsek se odrazí tak, že prochází <strong>ohniskem F</strong></li>\n<li><strong>ohniskový</strong> paprsek (prochází ohniskem) se odrazí <strong>rovnoběžně s osou</strong></li>\n<li><strong>středový</strong> paprsek (prochází středem křivosti S) se odrazí <strong>po stejné přímce zpět</strong></li>\n</ul>\n<p>Kde se dva odražené paprsky protnou, vzniká krajní bod skutečného obrazu. Pokud se neprotnou, ale jen se zdají vycházet z jednoho bodu, vzniká tam zdánlivý obraz.</p>\n\n<h3>Vypuklé zrcadlo</h3>\n<p>Odraznou plochou je <strong>vnější</strong> (vypouklá) strana. Střed i ohnisko leží <strong>za zrcadlem</strong> a jsou <strong>zdánlivé</strong> — paprsky jimi nikdy neprocházejí.</p>\n<p>Vypuklé zrcadlo vytváří <strong>vždy</strong> obraz <strong>zdánlivý, vzpřímený a zmenšený</strong>, zato zachytí velkou část prostoru. Stejné tři paprsky platí i tady, jen se odrážejí, jako by vycházely z ohniska za zrcadlem.</p>\n<p>Využití: <strong>dopravní zrcadla</strong> u nepřehledných křižovatek, zpětná zrcátka, bezpečnostní zrcadla v obchodech.</p>\n\n<p>💡 Kulová zrcadla se snadno vyrábějí, ale ostře zobrazují jen předměty u osy. Přesnější jsou <strong>parabolická zrcadla</strong> — používají je dalekohledy, radioteleskopy, satelitní paraboly pro příjem televizního signálu i Hubbleův a Webbův teleskop.</p>",
					zapis: {"vzorec":"f = r/2","jednotky":["poloměr křivosti — značíme r, jednotka m (metr)","ohnisková vzdálenost — značíme f, jednotka m (metr)"],"vzorecSlovy":"Ohnisková vzdálenost je poloviční oproti poloměru křivosti zrcadla.","body":["kulové zrcadlo: část lesklé koule (vrchlík)","body zrcadla: vrchol V, optická osa o","body zrcadla: střed křivosti S, ohnisko F","ohnisko: uprostřed mezi S a V","vztah: f = r/2","duté zrcadlo: odráží vnitřní stranou","duté: střed i ohnisko před zrcadlem, skutečné","duté: rovnoběžné paprsky → ohnisko (oheň, elektrárna)","duté: paprsky z ohniska → rovnoběžný svazek (reflektory)","duté: solární kolektor ohřívá vodu","tři paprsky: rovnoběžný → přes ohnisko","tři paprsky: ohniskový → rovnoběžně s osou","tři paprsky: středový → zpět po téže přímce","duté obraz: dál než r → skutečný, převrácený, zmenšený","duté obraz: mezi f a r → skutečný, převrácený, zvětšený","duté obraz: blíž než f → zdánlivý, vzpřímený, zvětšený (zrcátko)","vypuklé zrcadlo: odráží vnější stranou","vypuklé: střed i ohnisko za zrcadlem, zdánlivé","vypuklé obraz: vždy zdánlivý, vzpřímený, zmenšený","vypuklé využití: dopravní, zpětná, bezpečnostní zrcadla","parabolická zrcadla: přesnější, dalekohledy, teleskopy"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Fyzika kulových zrcadel', cesta: 'xkCEjfT11L8' },
					],
				},
				{
					odkazy: [{"nazev":"Zobrazení tenkou spojkou (ELUC)","url":"https://eluc.ikap.cz/lekce/zobrazeni-tenkou-spojkou"},{"nazev":"Zobrazení tenkou rozptylkou (ELUC)","url":"https://eluc.ikap.cz/lekce/zobrazeni-tenkou-rozptylkou"},{"nazev":"Čočky (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/opticke-zobrazovani/cocky"},{"nazev":"Čočky – kvíz (Wordwall)","url":"https://wordwall.net/cs/resource/112356120/f/%C4%8Do%C4%8Dky"}],
					slug: 'opticka-cocka',
					nazev: 'Optická čočka (spojky a rozptylky)',
					interakce: 'cocka',
					obsah: "<h2>Optická čočka (spojky a rozptylky)</h2>\n<p><strong>Čočky</strong> jsou tělesa z průhledné látky (sklo, plast) ohraničená jednou nebo dvěma kulovými plochami. Využívají <strong>lom světla</strong> při průchodu čočkou. Podle tvaru je dělíme na spojky a rozptylky.</p>\n\n<h3>Popis čočky</h3>\n<ul>\n<li><strong>optická osa</strong> — spojnice středů křivosti obou kulových ploch, prochází optickým středem čočky</li>\n<li><strong>optický střed S</strong> — bod uprostřed čočky, kterým paprsek prochází beze změny směru</li>\n<li><strong>ohniska F a F´</strong> — každá čočka má dvě ohniska</li>\n<li><strong>ohnisková vzdálenost f</strong> — vzdálenost ohniska od optického středu, nejdůležitější parametr čočky</li>\n<li><strong>optická mohutnost</strong> — udává počet dioptrií; čím víc dioptrií, tím je čočka zakřivenější a víc láme paprsky</li>\n<li><strong>zvětšení</strong> — poměr velikosti obrazu k velikosti předmětu; je-li větší než 1, je obraz větší než předmět</li>\n</ul>\n\n<h3>Spojné čočky (spojky)</h3>\n<ul>\n<li>uprostřed <strong>nejširší</strong>, na okrajích nejtenčí</li>\n<li>rovnoběžný svazek paprsků <strong>spojují</strong> do jednoho bodu — do <strong>ohniska</strong></li>\n<li>mají <strong>skutečná</strong> ohniska (paprsky jimi procházejí), <strong>kladnou</strong> ohniskovou vzdálenost i kladný počet dioptrií</li>\n<li>značka: dvě šipky směřující ven</li>\n<li>v ohnisku lze pomocí spojky (např. lupy) a slunečních paprsků rozdělat oheň</li>\n</ul>\n\n<h3>Rozptylné čočky (rozptylky)</h3>\n<ul>\n<li>uprostřed <strong>nejtenčí</strong>, na okrajích nejširší</li>\n<li>rovnoběžný svazek paprsků <strong>rozptylují</strong> — jako by vycházely z jednoho bodu</li>\n<li>mají <strong>zdánlivá</strong> ohniska (paprsky jimi nikdy neprocházejí), <strong>zápornou</strong> ohniskovou vzdálenost i záporný počet dioptrií</li>\n</ul>\n<p>Spojku od rozptylky poznáme i pohledem skrz čočku do dálky: spojka obraz převrací, rozptylka ne.</p>\n\n<h3>Význačné paprsky a konstrukce obrazu</h3>\n<p>Obraz sestrojíme pomocí tří paprsků. <strong>Rovnoběžný</strong> s osou se po lomu láme do ohniska. <strong>Ohniskový</strong> paprsek (jde ohniskem) se láme rovnoběžně s osou. <strong>Středový</strong> paprsek prochází optickým středem beze změny směru.</p>\n<p>U rozptylky platí stejné tři paprsky, jen se rovnoběžný paprsek láme tak, jako by vycházel ze zdánlivého ohniska.</p>\n<p>Předmět umístíme před čočku na optickou osu. Z jeho krajního bodu vedeme dva význačné paprsky. Kde se paprsky po průchodu čočkou protnou, vznikne krajní bod <strong>skutečného obrazu</strong>. Pokud se neprotnou, ale jen se zdají vycházet z jednoho bodu, oko v něm vidí <strong>zdánlivý obraz</strong>.</p>\n\n<h3>Obraz spojky a rozptylky</h3>\n<p>Spojka vytvoří čtyři druhy obrazů podle vzdálenosti předmětu:</p>\n<ul>\n<li>předmět <strong>dál než 2f</strong> → skutečný, převrácený, <strong>zmenšený</strong> (oko, objektiv fotoaparátu)</li>\n<li>předmět <strong>přesně ve 2f</strong> → skutečný, převrácený, <strong>stejně velký</strong></li>\n<li>předmět <strong>mezi f a 2f</strong> → skutečný, převrácený, <strong>zvětšený</strong> (dataprojektor, zvětšovací přístroje)</li>\n<li>předmět <strong>blíž než f</strong> → zdánlivý, vzpřímený, <strong>zvětšený</strong> (lupa, mikroskop, dalekohled)</li>\n</ul>\n<p>Rozptylka vytváří <strong>vždy</strong> obraz zdánlivý, vzpřímený a zmenšený, nezávisle na vzdálenosti předmětu. Používá se třeba ve dveřním kukátku — obraz je menší, zato je vidět celá chodba.</p>\n\n<h3>Využití</h3>\n<p><strong>Spojka:</strong> lupa, mikroskop, dalekohled, objektiv, brýle, zvětšovací přístroje. <strong>Rozptylka:</strong> kukátko, brýle, složitější optické soustavy (objektivy, dalekohledy).</p>",
					zapis: {"jednotky":["ohnisková vzdálenost — značíme f, jednotka m (metr)","optická mohutnost — jednotka D (dioptrie)"],"body":["čočka: průhledné těleso, lom světla","optická osa: spojnice středů křivosti","optický střed S na ose","ohniska F, F´: dvě u čočky","ohnisková vzdálenost f: ohnisko ↔ střed","optická mohutnost: počet dioptrií","zvětšení: obraz ku předmětu","spojka: uprostřed nejširší","spojka: spojuje paprsky do ohniska","spojka: skutečné ohnisko, f i dioptrie kladné","spojka: značka dvě šipky ven","rozptylka: uprostřed nejtenčí","rozptylka: rozptyluje paprsky z bodu","rozptylka: zdánlivé ohnisko, f i dioptrie záporné","poznáme je pohledem do dálky: spojka převrací","paprsek rovnoběžný: láme se do ohniska","paprsek ohniskový: láme se rovnoběžně s osou","paprsek středový: neláme se","u rozptylky: stejné paprsky, zdánlivé ohnisko","spojka: dál než 2f → skutečný, převrácený, zmenšený","spojka: přesně 2f → skutečný, převrácený, stejně velký","spojka: mezi f a 2f → skutečný, převrácený, zvětšený","spojka: blíž než f → zdánlivý, vzpřímený, zvětšený","rozptylka: vždy zdánlivý, vzpřímený, zmenšený","spojka lupou: v ohnisku lze rozdělat oheň"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Svět skrz čočku', cesta: 'cERyrQE-PBQ' },
						{ druh: 'video', nazev: 'Píseň: Optická jízda 🎵', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/opticka-cocka/pisen-opticka-jizda.mp4' },
					],
				},
				{
					odkazy: [{"nazev":"Oční vady (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/lidske-oko/ocni-vady"},{"nazev":"Krátkozrakost (myopie) – NZIP","url":"https://www.nzip.cz/clanek/382-kratkozrakost-myopie"},{"nazev":"Dalekozrakost (hypermetropie) – NZIP","url":"https://www.nzip.cz/clanek/385-dalekozrakost-hypermetropie"},{"nazev":"Vady oka (ELUC)","url":"https://eluc.ikap.cz/lekce/vady-oka"}],
					slug: 'oko-vady-oka',
					nazev: 'Oko a vady oka',
					interakce: 'oko',
					obsah: "<h2>Oko a vady oka</h2>\n<p><strong>Oko</strong> je optická soustava — zachytí svazek paprsků od okolních předmětů a vytvoří jejich obraz na citlivé vrstvě (sítnici).</p>\n\n<h3>Čím světlo v oku prochází</h3>\n<p>rohovka → komorová voda → <strong>zornice</strong> (otvor v duhovce, funguje jako clona fotoaparátu) → <strong>čočka</strong> (pružná dvojvypuklá spojka) → sklivec → <strong>sítnice</strong></p>\n<p>Rohovka je průhledný ochranný obal oka a nasměruje paprsky k čočce. Komorová voda je průhledná a chrání oko před zvýšeným tlakem zvenčí. Zornice se při silném světle zužuje a při slabém rozšiřuje — řídí tak množství světla, které do oka vstoupí.</p>\n<p>Čočka je silná jen asi 4 mm. Sklivec je průhledná výplň oka.</p>\n<p>Na sítnici jsou dva druhy světločivých buněk: <strong>tyčinky</strong> (vidění v šeru) a <strong>čípky</strong> (barvy — tři druhy: červená, zelená, modrá). V místě nejostřejšího vidění (žluté skvrně) jsou nahuštěné <strong>čípky</strong>. Tyčinky a čípky se souhrnně nazývají <strong>fotoreceptory</strong>.</p>\n\n<h3>Vznik obrazu</h3>\n<p>Nejdůležitější jsou čočka a sítnice. Obraz na sítnici je vždy <strong>skutečný, zmenšený a převrácený</strong>. Podráždění se zrakovým nervem přenese do mozku, který vjem zpracuje (a obraz „otočí\").</p>\n\n<h3>Akomodace — zaostřování</h3>\n<p>Oko zaostřuje na různé vzdálenosti <strong>změnou zakřivení pružné čočky</strong> (mění tak její ohniskovou vzdálenost). Zdravé oko zaostří na blízko asi na 10–15 cm; „na dálku\" až do nekonečna. Nejvhodnější vzdálenost pro čtení je <strong>25–30 cm</strong>. S věkem čočka tuhne a schopnost akomodace klesá.</p>\n<p>Oko jako celek má optickou mohutnost asi <strong>+59 dioptrií</strong>. Změnou zakřivení mění čočka mohutnost až o <strong>15 dioptrií</strong>. Na blízko se čočka maximálně zakulatí, což může způsobit bolest.</p>\n<p>Oko a oční svaly se při čtení zblízka rychle unaví. Na dálku je čočka naopak zploštělá a oko se nenamáhá.</p>\n<p>Blízký bod — nejmenší vzdálenost pro zaostření — se mění s věkem. Děti zaostří i na 7 cm, senioři jen na 60 cm. Ve vysokém věku už čočka nezaostří ani nablízko, ani na dálku.</p>\n\n<h3>Zrakové vady a jejich korekce</h3>\n<ul>\n<li><strong>Dalekozrakost</strong> — ostře vidí do dálky, blízké rozmazaně; obraz vzniká <strong>za sítnicí</strong> (oko láme málo). Korekce: brýle se <strong>spojkami</strong> (kladné dioptrie, +).</li>\n<li><strong>Krátkozrakost</strong> — ostře vidí zblízka, dálku rozmazaně; obraz vzniká <strong>před sítnicí</strong> (oko láme příliš). Korekce: brýle s <strong>rozptylkami</strong> (záporné dioptrie, −).</li>\n</ul>\n<p>Při dalekozrakosti je blízký bod dál než 25 cm od oka. Při krátkozrakosti je daleký bod blíž než 5 metrů. Obě vady lze opravit i kontaktními čočkami — kladnými dioptriemi při dalekozrakosti, zápornými při krátkozrakosti.</p>\n<p>V roce <strong>1954</strong> objevil český vědec <strong>Otto Wichterle</strong> měkký materiál pro kontaktní čočky.</p>\n\n<h3>Vnímání obrazu</h3>\n<p>Velikost obrazu závisí na zorném úhlu — úhlu, který svírají paprsky z krajních bodů předmětu. Vzdálené velké letadlo proto vidíme maličké, i když je ve skutečnosti obrovské. Malého brouka na ruce naopak vidíme poměrně velkého.</p>\n<p>Dvě oči umožňují <strong>prostorové vidění</strong>. Mozek spojí dva převrácené obrazy z očí do jednoho vzpřímeného a prostorového vjemu.</p>",
					zapis: {"body":["oko: optická soustava, vytváří obraz na sítnici","obraz na sítnici: skutečný, zmenšený, převrácený, mozek zpracuje","rohovka: chrání oko, láme paprsky k čočce","komorová voda: chrání před tlakem zvenčí","zornice: zužuje se při silném světle, rozšiřuje při slabém","čočka: pružná spojka, silná 4 mm","sklivec: průhledná výplň oka","fotoreceptory: tyčinky (šero) a čípky (barvy)","čípky: 3 druhy — červená, zelená, modrá","optická mohutnost oka: asi +59 dioptrií","akomodace: zaostřování změnou zakřivení čočky, mění mohutnost až o 15 D","blízký bod: 10–15 cm (děti 7 cm, senioři 60 cm)","čtení bez námahy: vzdálenost 25–30 cm","daleký bod zdravého oka: nekonečno","dalekozrakost: blízký bod dál než 25 cm, obraz za sítnicí, koriguje spojka","krátkozrakost: daleký bod blíž než 5 m, obraz před sítnicí, koriguje rozptylka","korekce: i kontaktní čočky (+ nebo − dioptrie)","velikost obrazu: závisí na zorném úhlu","dvě oči: umožňují prostorové vidění","1954: Otto Wichterle objevil měkký materiál pro kontaktní čočky"]},
					materialy: [
						{ druh: 'infografika', nazev: 'Oko jako optická soustava', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka/infografika-oko.jpg' },
						{ druh: 'infografika', nazev: 'Historie brýlí (nad rámec RVP)', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka/infografika-historie-bryli.jpg' },
					],
				},
				{
					odkazy: [{"nazev":"Duha (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/uplny-odraz-svetla/duha"},{"nazev":"Duha (Wikipedie)","url":"https://cs.wikipedia.org/wiki/Duha"},{"nazev":"Edutorium: Rozklad světla hranolem (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/katalog/edutorium/410/rozklad-svetla-hranolem"}],
					slug: 'rozklad-svetla-duha',
					nazev: 'Rozklad světla a duha',
					interakce: 'duha',
					obsah: "<h2>Rozklad bílého světla, duha</h2>\n<p>Sluneční světlo vnímáme jako <strong>bílé</strong>. Ve skutečnosti je složené z barev. Když projde <strong>optickým hranolem</strong>, rozloží se na barevné paprsky.</p>\n<p>Jev poprvé popsal roku <strong>1671 Isaac Newton</strong>. Pruh barev nazval <strong>spektrum</strong>. Spojkou barevné paprsky zase složil zpět do bílého světla — důkaz, že bílé světlo je složené.</p>\n\n<h3>Barevné spektrum</h3>\n<ul>\n<li>vzniká spojitý pás <strong>sedmi</strong> barev v pořadí: <strong>červená, oranžová, žlutá, zelená, modrá, indigová (tmavomodrá), fialová</strong> (barvy do sebe plynule přecházejí)</li>\n<li>příčinou rozkladu je, že <strong>každá barva se láme jinak</strong> — <strong>červená nejméně, fialová nejvíce</strong></li>\n<li>barvy spektra se liší <strong>vlnovou délkou světla</strong> — červená má vlnovou délku nejdelší, fialová nejkratší</li>\n</ul>\n\n<h3>Duha — přirozený rozklad světla</h3>\n<ul>\n<li>vzniká rozkladem slunečního světla na <strong>dešťových kapkách</strong></li>\n<li>bílé světlo vstoupí do kapky (láme se a rozkládá), uvnitř se <strong>jednou odrazí</strong> a při výstupu se spektrum ještě rozšíří</li>\n<li><strong>dvojitá duha</strong>: slabší vedlejší duha vzniká <strong>výš nad hlavní duhou</strong> — <strong>dvěma</strong> odrazy v kapce — a má <strong>opačné pořadí barev</strong></li>\n<li>vidíme ji, když máme <strong>Slunce za zády</strong> a déšť před sebou; <strong>červená je nahoře</strong>, fialová dole</li>\n<li>nejčastěji ji vidíme jako <strong>půlkruh</strong>; z letadla ji lze pozorovat i jako celý <strong>kruh</strong></li>\n<li>rozklad světla lze pozorovat i při <strong>zalévání hadicí</strong> nebo u <strong>vodopádů</strong></li>\n<li>duha je <strong>optický jev</strong>, ne hmotný předmět</li>\n<li>každý pozorovatel ji vidí z jiných kapek podle své polohy vůči Slunci; proto se k ní nikdy nedá přiblížit</li>\n</ul>\n\n<p>Podstatu duhy správně vysvětlil lomem paprsků český fyzik a lékař <strong>Jan Marcus Marci</strong> v <strong>17. století</strong>. Dokázal to pokusem s rozkladem světla na hranolu.</p>",
					zapis: {"body":["bílé světlo: je složené z barev","hranol: rozkládá bílé světlo na spektrum","Newton, rok 1671: objevil a pojmenoval spektrum","spojka: barvy znovu složí zpět na bílou","spektrum: spojitý pás, barvy plynule přecházejí","7 barev: červená, oranžová, žlutá, zelená, modrá, indigová, fialová","indigová = tmavomodrá","lom barev: červená nejméně, fialová nejvíce","vlnová délka: červená nejdelší, fialová nejkratší","duha: rozklad slunečního světla na dešťových kapkách","v kapce: světlo se láme, jednou odrazí, znovu láme","dvojitá duha: vedlejší duha výš nad hlavní, dvěma odrazy, opačné pořadí barev, slabší","vidíme ji: Slunce za zády, déšť před sebou","barvy duhy: červená nahoře, fialová dole","tvar duhy: obvykle půlkruh, z letadla kruh","rozklad světla i u hadice a u vodopádu","duha: optický jev, ne hmotný předmět","duha: každý ji vidí z jiných kapek, nedá se přiblížit","Jan Marcus Marci, 17. století: vysvětlil duhu lomem paprsků"]},
					materialy: [
					],
				},
				{
					odkazy: [{"nazev":"Vnímání barev (Eduportál Techmania)","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/svetlo/vnimani-barev"},{"nazev":"Mísení barev (ELUC)","url":"https://eluc.ikap.cz/lekce/miseni-barev"},{"nazev":"Barevný model (Wikipedie)","url":"https://cs.wikipedia.org/wiki/Barevn%C3%BD_model"}],
					slug: 'vnimani-barev',
					nazev: 'Vnímání barev (RGB a CMYK)',
					interakce: 'barvy',
					obsah: "<h2>Vnímání barev (RGB a CMYK)</h2>\n<p>Na sítnici jsou <strong>tři druhy čípků</strong> — každý citlivý na jednu barvu: červenou, zelenou nebo modrou. Výsledná barva vzniká až <strong>v mozku</strong> složením vjemů ze všech čípků. Na barvu tělesa má vliv i <strong>odraz a pohlcení (absorpce)</strong> světla látkou.</p>\n\n<h3>Skládání barevných světel — RGB</h3>\n<p>Systém RGB používají obrazovky, displeje a barevné reflektory.</p>\n<ul>\n<li><strong>RGB</strong> = red, green, blue (červená, zelená, modrá) — základní barvy <strong>světla</strong></li>\n<li><strong>bílé</strong> světlo vznikne složením všech tří základních barev se stejnou intenzitou</li>\n<li>doplňkové barvy (dvě základní dohromady): žlutá, purpurová (sytě růžová), azurová (modrozelená)</li>\n<li>ostatní barvy (hnědá, růžová, …) vznikají <strong>složením všech tří barev</strong> v různém poměru</li>\n<li><strong>černé světlo neexistuje</strong> — černá je nepřítomnost světla (tma)</li>\n</ul>\n\n<h3>Světlo a látky</h3>\n<p>Různé látky světlo propouštějí a pohlcují (absorbují) různě. Podle toho rozlišujeme tři druhy látek.</p>\n<ul>\n<li><strong>neprůhledná</strong> látka: nepropustí žádné světlo, pohltí všechny barvy (beton, dřevo, hliník)</li>\n<li><strong>průzračná průhledná</strong> látka: propustí všechny barvy světla (čisté sklo, křemen, diamant)</li>\n<li><strong>barevná průhledná</strong> látka: propustí jen část barev, zbytek pohltí (barevné filtry, barevné brýle)</li>\n</ul>\n<p>Například růžové světlo vznikne, když látka propustí jen modré a červené světlo.</p>\n\n<h3>Barva těles</h3>\n<p>Oko vnímá barvu tělesa podle toho, které barvy těleso <strong>odráží</strong>. Bílé těleso odráží všechny barvy, černé je úplně pohltí. Barva tělesa proto závisí i na <strong>barvě dopadajícího světla</strong> — v bílém denním světle vypadá jinak než pod barevným reflektorem.</p>\n\n<h3>Míchání barviv — CMYK</h3>\n<p>Míchání temper nebo inkoustů je opačné než skládání světel: mícháme látky, které barvy <strong>pohlcují</strong>. Čím víc barviv smícháme, tím <strong>tmavší</strong> je výsledek.</p>\n<ul>\n<li><strong>CMYK</strong> = cyan (azurová), magenta (purpurová), yellow (žlutá) + <strong>K</strong> = black (černá)</li>\n<li>černé barvivo vznikne smícháním základních barviv — pohltí všechno světlo</li>\n<li>přesto se do tiskáren přidává ještě černý inkoust — kvůli lepšímu odstínu a úspoře barevných inkoustů při černobílém tisku</li>\n</ul>\n<p><strong>Zajímavost:</strong> malíři při míchání temper používají jiné tři barvy — žlutou, červenou a modrou.</p>",
					zapis: {"body":["sítnice: tři druhy čípků — červený, zelený, modrý","výsledná barva: skládá mozek z vjemů čípků","barvu tělesa ovlivňuje: odraz a pohlcení (absorpce) světla","RGB: red, green, blue — základní barvy světla","RGB používají: obrazovky, displeje, reflektory","bílé světlo: R + G + B stejnou intenzitou","doplňkové barvy světla: žlutá, purpurová (sytě růžová), azurová (modrozelená)","ostatní barvy světla: složení všech tří barev v různém poměru","černé světlo neexistuje — černá = žádné světlo","neprůhledná látka: nepropustí nic (beton, dřevo, hliník)","průzračná průhledná látka: propustí vše (sklo, křemen, diamant)","barevná průhledná látka: propustí jen část barev","příklad: růžové světlo = propuštěné modré + červené","bílé těleso: odráží všechny barvy","černé těleso: pohltí všechno světlo","barva tělesa závisí i na barvě osvětlení","CMYK: cyan, magenta, yellow, black","míchání barviv: víc barviv = tmavší výsledek","černé barvivo: smíchání základních barviv, pohltí vše","černá v tiskárně navíc: lepší odstín, úspora inkoustu","zajímavost — malíři: jiné primární barvy žlutá, červená, modrá"]},
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
						<ul><li>tlak p = F : S (pascal); tlaková síla a tlak v praxi</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>rychlost v = s : t (m/s, km/h; 1 m/s = 3,6 km/h)</li>
							<li>tlak p = F : S (Pa)</li>
							<li>rovnováha na páce F₁ · a₁ = F₂ · a₂ (N, m)</li>
							<li>gravitační síla Fg = m · g (g = 10 N/kg, tedy na 1 kg připadá asi 10 N)</li>
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
							'U kapalin a pevných těles počítáme tlak a poznáváme tlakovou sílu.',
						],
						vzorec: 'v = s : t      (odvozeně: s = v · t,  t = s : v)      Fg = m · g      p = F : S      (odvozeně: F = p · S,  S = F : p)      F₁ · a₁ = F₂ · a₂',
						jednotky: [
							'rychlost v — metr za sekundu (m/s)',
							'dráha s — metr (m), čas t — sekunda (s)',
							'tlak p — pascal (Pa)',
							'síla F — newton (N), obsah plochy S — metr čtvereční (m²)',
							'1 m/s = 3,6 km/h; gravitační síla na 1 kg je přibližně 10 N.',
							'Do vzorců dosazuj dráhu v m, čas v s, sílu v N a obsah plochy v m².',
							'hmotnost m — kilogram (kg), g = 10 N/kg',
							'rameno síly a — metr (m)',
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
						<ul><li>deformace; páka, moment síly, rovnováha na páce; kladka pevná a volná; nakloněná rovina a zlaté pravidlo mechaniky</li></ul>
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
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>rychlost v = s : t (1 m/s = 3,6 km/h)</li>
							<li>gravitační síla Fg = m · g, g = 10 N/kg</li>
							<li>rovnováha na páce F₁ · a₁ = F₂ · a₂</li>
							<li>tlak p = F : S (Pa); hydrostatický tlak pₕ = h · ρ · g</li>
							<li>vztlaková síla Fvz = V · ρ · g (Archimédův zákon)</li>
							<li>zákon odrazu α′ = α; ohnisko kulového zrcadla f = r : 2</li>
						</ul>
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
					obsah: "<h2>Mechanická práce</h2>\n\n<p>Ve fyzice <strong>těleso koná práci</strong>, když působí na jiné těleso silou a tím ho <strong>posune ve směru síly</strong>. Musí platit obě podmínky zároveň — síla i posunutí.</p>\n<ul>\n<li>práci konáš, když tlačíš auto, které nechce nastartovat, nebo zvedáš činky</li>\n<li>práci koná jeřáb, když zvedá náklad, nebo ty, když hodíš míč</li>\n<li>práci koná i <strong>silové pole</strong> — gravitační síla, když jablko spadne ze stromu, nebo magnetické pole, když přitáhne ocelovou kuličku</li>\n</ul>\n<p>Paní ve frontě, která jen <strong>drží</strong> těžký nákup, práci nekoná: působí na nákup silou, ale nákup se neposouvá.</p>\n\n<h3>Práce jako fyzikální veličina</h3>\n<p>Práce vyjadřuje množství energie, kterou těleso vydá na posunutí jiného tělesa. Značka je <strong>W</strong>, jednotka <strong>joule (J)</strong> (čti „džaul“). Vypočítáme ji jako součin síly působící ve směru posunutí a dráhy, kterou těleso urazí:</p>\n<p style=\"font-size:1.3rem\"><strong>W = F · s</strong></p>\n<p>Sílu dosazujeme v newtonech, dráhu v metrech. Větší síla nebo delší dráha znamená větší práci; dvojnásobná síla dá dvojnásobnou práci.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-04.svg\" alt=\"Definice práce: tabulka veličin a jednotek, vzorec W = F · s a vzorcový trojúhelník\" /></a><figcaption>Práce W, síla F a dráha s: W = F · s; při zvedání tělesa W = m · g · s.</figcaption></figure>\n<p>Těleso vykoná práci 1 J, když ho síla 1 N posune po dráze 1 m. Násobky: <strong>1 kJ = 1 000 J</strong>, <strong>1 MJ = 1 000 000 J</strong>. 💡 Joule je také jednotka tepla a energie.</p>\n<p><strong>Příklad:</strong> Motor auta táhne silou 1,3 kN a auto ujede 5 km. F = 1 300 N, s = 5 000 m<br>\nW = F · s = 1 300 · 5 000 = <strong>6 500 000 J</strong></p>\n\n<h3>Kdy se práce nekoná</h3>\n<p>Práce se nekoná, když se těleso nepohybuje; když se pohybuje stejnou rychlostí po přímce a žádná síla na něj nepůsobí (jede setrvačností); nebo když síla míří kolmo na směr pohybu. Práce se tedy koná jen tehdy, když nenulová síla působí na nenulové dráze a nesvírá s ní pravý úhel.</p>\n<ul>\n<li>Michal tlačí na tyč, ale tyč se nehne: F = 20 N, s = 0 m → W = 0 J, práci nekoná</li>\n<li>Michal postrčí vozík: F = 20 N, s = 10 m → W = 200 J, práci koná</li>\n<li>Michal jede na skateboardu a neodráží se: F = 0 N, s = 250 m → W = 0 J, práci nekoná (konal ji jen při rozjezdu)</li>\n<li>chlapec jede na kole bez šlapání: nepůsobí silou, práci nekoná</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-01.svg\" alt=\"Tři situace Michala: tyč se nehne, vozík se posune, skateboard jede bez odrážení\" /></a><figcaption>Práci koná jen síla, která těleso posune: tyč W = 0 J, vozík W = 200 J, skateboard W = 0 J.</figcaption></figure>\n\n<h3>Výpočet síly a dráhy</h3>\n<p>Ze vzorce W = F · s plyne <strong>s = W : F</strong> a <strong>F = W : s</strong>.</p>\n<p><strong>Příklad:</strong> Jakou silou táhne lokomotiva vlak, když na trati dlouhé 4 500 m (4,5 km) vykoná práci 900 MJ?<br>\nW = 900 MJ = 900 000 000 J; F = W : s = 900 000 000 : 4 500 = <strong>200 000 N = 200 kN</strong></p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-02.svg\" alt=\"Lokomotiva táhne vlak po dráze 4 500 m, práce 900 000 000 J, síla F = 200 000 N\" /></a><figcaption>Síla lokomotivy: F = W : s = 900 000 000 : 4 500 = 200 000 N.</figcaption></figure>\n\n<h3>Práce při zvedání tělesa</h3>\n<p>Těleso zvedáme silou stejně velkou jako jeho <strong>tíhová síla</strong>, jen míří nahoru. Tíhová síla je F = m · g, kde g = 10 N/kg. Práce při zvedání je tedy <strong>W = m · g · s</strong>.</p>\n<p><strong>Příklad:</strong> Chlapec zvedá závaží o hmotnosti 5 kg do výšky 1 m. Jakou práci vykoná?<br>\nF = m · g = 5 · 10 = <strong>50 N</strong>; W = F · s = 50 · 1 = <strong>50 J</strong></p>\n<p><strong>Příklad:</strong> Máma zvedá hračku o hmotnosti 600 g na polici ve výšce 150 cm. Jakou práci vykoná?<br>\nm = 0,6 kg; s = 1,5 m; F = m · g = 0,6 · 10 = <strong>6 N</strong>; W = F · s = 6 · 1,5 = <strong>9 J</strong></p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-obr-03.svg\" alt=\"Máma zvedá hračku o hmotnosti 0,6 kg na polici do výšky 1,5 m, F = 6 N, W = 9 J\" /></a><figcaption>Zvedání hračky: F = m · g = 6 N, W = F · s = 6 · 1,5 = 9 J.</figcaption></figure>\n<p><strong>Příklad:</strong> Jeřáb zvedá bednu o hmotnosti 300 kg do výšky 5 m. Jakou práci vykoná?<br>\nF = m · g = 300 · 10 = <strong>3 000 N</strong>; W = F · s = 3 000 · 5 = <strong>15 000 J</strong></p>",
					uvod: "Když tlačíš těžkou skříň a ona se pohne, děláš práci. Když do ní jen opřeš ruce a ona stojí, hodně se namáháš, ale práci pro fyziku neděláš. Fyzika o práci mluví tehdy, když do něčeho tlačíš nebo to táhneš a ono se kvůli tomu pohne.",
					zvidave: "<p><strong>Na čem práce závisí.</strong> Malou silou po krátké dráze vykonáme málo práce, velkou silou po dlouhé dráze mnoho práce.</p>\n<p><strong>Síla kolmo na dráhu.</strong> Neseš tašku vodorovně. Tvoje síla míří nahoru (držíš tašku), ale taška se posouvá vodorovně. Síla svírá s dráhou pravý úhel, a proto práci ve fyzice nekonáš.</p>",
					zapis: {"vzorec":"W = F · s","jednotky":["W práce (J), F síla (N), s dráha (m)","1 kJ = 1 000 J, 1 MJ = 1 000 000 J"],"body":["síla a posun ve směru síly = práce","bez síly, posunu, při kolmé síle W = 0","s = W : F, F = W : s","zvedání 5 kg o 1 m: W = m · g · s = 50 J"]},
					odkazy: [{"nazev":"Wordwall — Práce, výkon, energie (veličiny a značky)","url":"https://wordwall.net/resource/79662704/fyzika/fyzika-pr%C3%A1ce-v%C3%BDkon-energie-veli%C4%8Diny-a-zna%C4%8Dky"},{"nazev":"Hra pro třídu: Mechanická práce a výkon (Fyzikální liga)","url":"/hry/liga-karty?rocnik=8&celek=mechanicka-prace-a-vykon"}],
					materialy: [{"druh":"video","nazev":"Píseň: Mechanická práce a výkon 🎵","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/pisen-mechanicka-prace-a-vykon.m4a"},{"druh":"video","nazev":"Mechanická práce — 1. díl: síla a posunutí","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Mechanická práce — 2. díl: násobit, nebo dělit?","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog2.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Mechanická práce — 3. díl: práce při zvedání","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/mechanicka-prace-dialog3.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
				},
				{
					materialy: [{"druh":"video","nazev":"Píseň: Mechanická práce a výkon 🎵","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/mechanicka-prace/pisen-mechanicka-prace-a-vykon.m4a"},{"druh":"infografika","nazev":"Infografika: Výkon — základní přehled","cesta":"/materialy/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/infografika-prehled.jpg"},{"druh":"video","nazev":"Výkon — 1. díl: práce, čas a watt","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog1-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 2. díl: vztahy práce, výkonu a času","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog2-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 3. díl: kilowatt a mechanická práce motoru","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog3-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 4. díl: výkon síly při pohybu","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog4-animovany.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 1. díl","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog1.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 3. díl","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog3.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Výkon — 4. díl","cesta":"/media/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-dialog4.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
					slug: 'vykon',
					nazev: 'Výkon',
					interakce: 'vykon',
					obsah: "<h2>Výkon</h2>\n\n<p>Bagr a dělník s krompáčem vykopou stejnou jámu, vykonají tedy stejnou <strong>práci</strong>. Bagr ji ale udělá za kratší čas. Rychlost konání práce popisuje veličina <strong>výkon</strong>. Kdo zvládne stejnou práci za kratší čas, má větší výkon — proto výkonem porovnáváme stroje i lidi.</p>\n\n<h3>Výkon jako veličina</h3>\n<p>Výkon říká, jak velká práce se vykoná za jednu sekundu. Větší práce za určitý čas znamená větší výkon, menší práce za stejný čas menší výkon.</p>\n<p>Značíme ho velkým <strong>P</strong>; malé <strong>p</strong> je ve fyzice tlak. Jednotka je <strong>watt (W)</strong>. Výkon 1 W znamená, že těleso za 1 s vykoná práci 1 J. Výkon 2 kW znamená práci 2 kJ za 1 s.</p>\n<p>Pozor: písmeno <strong>W</strong> je značka práce i jednotky watt. Pozná se podle polohy: W = 60 J je práce, ale P = 60 W je výkon.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-05.svg\" alt=\"Definice výkonu: P = W : t, veličiny a jednotky\" /></a><figcaption>Výkon P je práce W vykonaná za čas t; při stejné práci má větší výkon ten, kdo ji vykoná rychleji.</figcaption></figure>\n\n<h3>Výpočet výkonu</h3>\n<p style=\"font-size:1.3rem\"><strong>P = W : t</strong></p>\n<p>Vykonanou práci <strong>W</strong> vydělíme časem <strong>t</strong>. Práci dosazujeme v joulech, čas v sekundách. Odtud také <strong>W = P · t</strong> a <strong>t = W : P</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-06.svg\" alt=\"Tabulka: práce W, čas t a výkon P = W : t\" /></a><figcaption>Výkon P = W : t v tabulce: stejná práce za kratší čas znamená větší výkon.</figcaption></figure>\n<p>Větší jednotky: <strong>1 kW</strong> (kilowatt) = <strong>1 000 W</strong>, <strong>1 MW</strong> (megawatt) = <strong>1 000 000 W</strong>.</p>\n<p><strong>Příklad:</strong> Motor jeřábu vynese betonový panel o hmotnosti 6 t do výšky 80 m za 1 minutu. Jaký má výkon?<br>\nF = m · g = 6 000 · 10 = 60 000 N; W = F · s = 60 000 · 80 = 4 800 000 J; t = 60 s<br>\nP = W : t = 4 800 000 : 60 = <strong>80 000 W = 80 kW</strong></p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-01.svg\" alt=\"Řešený příklad: výkon motoru jeřábu\" /></a><figcaption>Výkon motoru jeřábu vypočítáme z tíhové síly, práce a času.</figcaption></figure>\n\n<h3>Kilowatthodina (kWh)</h3>\n<p>U elektrických strojů se práce udává v přehlednějších jednotkách: <strong>kilowatthodinách (kWh)</strong> nebo watthodinách (Wh). 1 kWh je práce stroje o výkonu 1 kW za 1 hodinu: 1 000 W · 3 600 s = <strong>3 600 000 J</strong>. V kWh se udává spotřeba elektřiny a podle ní se účtuje její cena.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-03.svg\" alt=\"Kilowatthodina: 1 kWh = 1 kW · 1 h = 1 000 W · 3 600 s = 3 600 000 J\" /></a><figcaption>Odvození: 1 kWh = 3 600 000 J.</figcaption></figure>\n<p>Když chceme práci v kWh, dosadíme do W = P · t kilowatty a hodiny. <strong>Příklad:</strong> elektromotor o výkonu 9 kW běží 16 hodin: W = 9 · 16 = <strong>144 kWh</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-04.svg\" alt=\"Řešený příklad: práce elektromotoru v kilowatthodinách, 9 kW · 16 h = 144 kWh\" /></a><figcaption>Práce elektromotoru v kWh: 9 kW · 16 h = 144 kWh.</figcaption></figure>\n\n<h3>Výkon a rychlost</h3>\n<p>Platí <strong>P = F · v</strong> (síla v newtonech, rychlost v metrech za sekundu), tedy i v = P : F a F = P : v. Při stejné síle je výkon přímo úměrný rychlosti. Sešlápnutím plynu dostane motor víc paliva, jeho výkon a tím i rychlost auta vzrostou.</p>\n<p><strong>Příklad:</strong> Auto jede rychlostí 54 km/h při tažné síle motoru 1 200 N. Rychlost v m/s: 54 : 3,6 = 15 m/s. P = F · v = 1 200 · 15 = <strong>18 000 W = 18 kW</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon/vykon-obr-02.svg\" alt=\"Řešený příklad: výkon motoru automobilu P = F · v\" /></a><figcaption>Výkon motoru auta z tažné síly a rychlosti: P = F · v = 18 kW.</figcaption></figure>\n<p>💡 Starší jednotka výkonu motorů aut a motorek je <strong>koňská síla</strong> (hp): <strong>1 hp = 0,735 kW</strong>.</p>",
					uvod: "Představ si, že dva kluci mají uklidit stejně velký pokoj. První to uklidí za chvilku, druhý se s tím vleče celé odpoledne. Práci mají oba stejnou, ale první ji udělal rychleji. A právě tomu, jak rychle se práce dělá, říkáme ve fyzice výkon.",
					zvidave: "<p><strong>Kde vídáme kilowatty a megawatty.</strong> Kilowatty vídáme třeba u vařiče nebo žehličky. Megawatty se používají u velkých strojů, třeba v elektrárnách.</p>\n<p><strong>Další příklad na čas.</strong> Elektrický vařič má výkon 1 000 W, tedy 1 kW. Za kolik sekund vykoná práci 5 000 J?<br>\nt = W : P = 5 000 : 1 000 = <strong>5 s</strong></p>\n<p><strong>Odkud se bere P = F · v.</strong> Práce je W = F · s a rychlost v = s : t. Když do P = W : t dosadíme W = F · s, dostaneme P = F · s : t = F · (s : t) = F · v.</p>",
					zapis: {"vzorec":"P = W : t","jednotky":["P výkon (watt, W), W práce (joule, J), t čas (sekunda, s)","1 kW = 1 000 W, 1 MW = 1 000 000 W"],"body":["výkon = rychlost práce; 1 W = 1 J/s","P výkon, p tlak; dosazuj J, s","1 kWh = 3 600 000 J","P = F · v","např. 4 800 000 J : 60 s = 80 kW"]},
					odkazy: [{"nazev":"Umíme fakta — Výkon (cvičení)","url":"https://www.umimefakta.cz/fyzika/cviceni-vykon"},{"nazev":"Wordwall — Výkon","url":"https://wordwall.net/resource/64369600"},{"nazev":"Hra pro třídu: Mechanická práce a výkon (Fyzikální liga)","url":"/hry/liga-karty?rocnik=8&celek=mechanicka-prace-a-vykon"}],
				},
				{
					slug: 'ucinnost',
					nazev: 'Účinnost (nad rámec RVP)',
					interakce: 'ucinnost',
					obsah: "<h2>Účinnost (nad rámec RVP)</h2>\n\n<p>Každý stroj dostává práci a jen část z ní promění v to, co potřebujeme. Kolik práce stroj dostane za 1 s a kolik z ní skutečně využije, porovnává veličina <strong>účinnost</strong>.</p>\n\n<h3>Příkon a výkon</h3>\n<p><strong>Příkon</strong> značíme <strong>P₀</strong> (čti „pé nula“). Je to práce, kterou stroj dostane za 1 s, u vysavače ta, kterou přijme ze zásuvky. <strong>Výkon</strong> značíme <strong>P</strong>. Je to užitečná práce, kterou stroj vykoná za 1 s, u vysavače sání u hubice. Slovo „výkon“ tu tedy znamená jen užitečnou část, příkon je práce, kterou stroj dostává. Příkon i výkon měříme ve wattech (W).</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-01.svg\" alt=\"Vysavač: u zásuvky příkon P₀, u sací hubice výkon P, účinnost η = P : P₀\" /></a><figcaption>Vysavač dostane příkon P₀ ze zásuvky a užitečný výkon P předá u hubice; účinnost je jejich poměr.</figcaption></figure>\n\n<h3>Vzorec účinnosti</h3>\n<p style=\"font-size:1.3rem\"><strong>η = P : P₀</strong></p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-03.svg\" alt=\"Účinnost η = výkon : příkon, tedy užitečná práce za 1 s : práce, kterou stroj za 1 s dostane\" /></a><figcaption>Účinnost je výkon děleno příkonem: užitečná práce za 1 s ku práci, kterou stroj za 1 s dostane.</figcaption></figure>\n<p>Účinnost značíme řeckým písmenem <strong>η</strong> (éta). Výkon P vydělíme příkonem P₀, oba dosazujeme ve stejné jednotce. Výsledek často udáváme v <strong>procentech</strong>: vynásobíme ho stem, takže 0,83 je 83 %. Obráceně z procent uděláme desetinné číslo tak, že je vydělíme stem: 96 % = 96 : 100 = 0,96.</p>\n<p>Účinnost je vždy <strong>menší než 1</strong>, tedy menší než 100 %. Část práce se totiž ztrácí, například třením. Kolik se ztratí, spočítáme jako 100 % − η.</p>\n<p>Příklad: výkon stroje je 3 a příkon 4 (ve stejné jednotce). Pak η = 3 : 4 = 0,75 = <strong>75 %</strong>. Zbylých <strong>25 %</strong> jsou ztráty.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-04.svg\" alt=\"Pruh o čtyřech dílech: výkon 3 díly (75 %), ztráty 1 díl (25 %)\" /></a><figcaption>Při výkonu 3 a příkonu 4 je účinnost 75 %; zbývající čtvrtina jsou ztráty.</figcaption></figure>\n\n<h3>Příklad: kladkostroj</h3>\n<p>Kladkostroj má výkon P = 0,4 W a příkon P₀ = 0,48 W. Jaká je jeho účinnost?<br>\nη = P : P₀ = 0,4 : 0,48 ≐ 0,83 = <strong>83 %</strong><br>\nZtráty jsou asi <strong>17 %</strong> (100 − 83 = 17).</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/mechanicka-prace-a-vykon/ucinnost/ucinnost-obr-02.svg\" alt=\"Kladkostroj s pevnou a volnou kladkou: P = 0,4 W, P₀ = 0,48 W, účinnost 83 %, ztráty 17 %\" /></a><figcaption>Kladkostroj s výkonem 0,4 W a příkonem 0,48 W má účinnost asi 83 %, ztráty jsou asi 17 %.</figcaption></figure>\n\n<h3>Příklad: motor výtahu</h3>\n<p>Motor výtahu zvedne rovnoměrným pohybem náklad o hmotnosti 240 kg do výšky 36 m za 90 s. Jaký je výkon motoru?<br>\nF = m · g = 240 · 10 = 2 400 N (g = 10 N/kg)<br>\nW = F · s = 2 400 · 36 = 86 400 J<br>\nP = W : t = 86 400 : 90 = <strong>960 W</strong></p>\n<p>Jaký je příkon motoru, když jeho účinnost je η = 96 %? Nejdřív procenta převedeme na číslo: 96 % = 0,96. Ze vzorce η = P : P₀ plyne <strong>P₀ = P : η</strong>:<br>\nP₀ = P : η = 960 : 0,96 = <strong>1 000 W</strong></p>\n<p>A jaký příkon by potřeboval parní stroj, který pohání stejný výtah a má účinnost jen 20 %? Platí 20 % = 0,2.<br>\nP₀ = P : η = 960 : 0,2 = <strong>4 800 W</strong><br>\nParní stroj by tedy potřeboval pětkrát větší příkon (4 800 : 960 = 5).</p>\n\n<p><strong>Shrnutí:</strong> Účinnost je poměr užitečné práce za 1 s (výkonu) k práci, kterou stroj za 1 s dostane (příkonu): η = P : P₀. Vždy je menší než 100 %, protože se část ztrácí. Čím nižší je účinnost, tím větší příkon stroj potřebuje na stejný výkon.</p>",
					uvod: "Vysavač bere elektřinu ze zásuvky. Všechnu ji ale nepoužije na sání, část se ztratí, třeba se motor zahřeje. Účinnost říká, jak velká část toho, co stroj dostane, se opravdu využije.",
					zvidave: "<p><strong>Kam se ztráty poděly.</strong> Ztracená práce se nejčastěji změní v teplo (tření součástek, odpor vodičů) nebo v hluk. Kladkostroj z příkladu ztrácí těch asi 17 % hlavně třením v kladkách a laně.</p>\n<p><strong>Účinnost z energie.</strong> Stejně se účinnost počítá i z energie: energii, kterou stroj užitečně využil, vydělíme energií, kterou dostal. Motor tak promění na pohyb jen část energie paliva a zbytek uteče jako odpadní teplo.</p>\n<p><strong>Výkon z příkonu.</strong> Ze vzorce η = P : P₀ plyne také P = η · P₀. Motor výtahu: P = 0,96 · 1 000 = 960 W.</p>\n<p><strong>Parní stroje.</strong> Starší parní stroje měly účinnost jen asi 15 % až 20 %. V našem příkladu počítáme s 20 %.</p>",
					zapis: {"vzorec":"η = P : P₀","jednotky":["η v %, P a P₀ ve W"],"body":["příkon P₀ = práce, kterou stroj dostane za 1 s; výkon P = užitečná práce za 1 s","účinnost je vždy pod 100 % (ztráty)","P₀ = P : η; 96 % = 0,96","kladkostroj: 0,4 W : 0,48 W ≐ 0,83 = 83 %","výtah: P = 960 W, η = 96 % → P₀ = 1 000 W"]},
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
					obsah: "<h2>Energie a její přeměny</h2>\n\n<p>Aby člověk, živočich nebo stroj mohl konat práci, musí mít v sobě něco, co se dá do práce proměnit. Tomu říkáme <strong>energie</strong>. Energie se může proměnit v práci a vykonaná práce se může přeměnit v energii.</p>\n<ul>\n<li>Rukou natáhneš tětivu luku, ta získá energii, a po uvolnění vykoná práci: vystřelí šíp.</li>\n<li>Zvedneš kladivo: čím větší výšku nad hřebíkem bude mít, tím větší energii získá, a tím větší práci vykoná při zatlučení hřebíku.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/energie-a-jeji-premeny/energie-a-jeji-premeny-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/energie-a-jeji-premeny/energie-a-jeji-premeny-obr-01.svg\" alt=\"Schéma řetězu přeměn energie: jaderná energie Slunce, světelná, chemická energie rostlin a uhlí, tepelná a pohybová energie páry, elektrická energie a nakonec světlo a teplo žárovky\" /></a><figcaption>Energie na cestě od Slunce až po žárovku mění podobu, ale nezmizí.</figcaption></figure>\n\n<h3>Druhy energie</h3>\n<p>Energie má víc podob. Rozlišujeme tyto druhy:</p>\n<ul>\n<li><strong>mechanická</strong> (spojená s mechanickou prací) — patří sem <strong>pohybová energie</strong> pohybujících se těles a <strong>polohová energie</strong> těles ve výšce</li>\n<li><strong>chemická</strong> (trávení a dýchání nebo všechna paliva: benzín, uhlí, biomasa…)</li>\n<li><strong>elektrická</strong></li>\n<li><strong>magnetická</strong></li>\n<li><strong>světelná</strong></li>\n<li><strong>jaderná</strong></li>\n<li><strong>tepelná</strong></li>\n</ul>\n\n<h3>Zákon zachování energie</h3>\n<p>Důležité pravidlo: <strong>energii není možné vytvořit ani zničit</strong>. Může se pouze přeměňovat z jednoho druhu energie v jiný.</p>\n<p>Ukážeme si to na cestě energie od Slunce až po žárovku:</p>\n<ul>\n<li>V jádru Slunce je <strong>jaderná energie</strong>, která se mění na <strong>světelnou</strong>.</li>\n<li>Rostliny zachytí energii světla a uloží ji jako <strong>chemickou energii</strong>. Chemická energie zůstane i v uhlí, které z rostlin za dlouhý čas vznikne.</li>\n<li>Když uhlí spálíme, chemická energie se změní na <strong>tepelnou energii</strong> zahřáté páry.</li>\n<li>Pára se pohybuje a má <strong>pohybovou energii</strong>.</li>\n<li>Pohybová energie se přemění na <strong>elektrickou energii</strong>, kterou dráty vedou až do žárovky. V žárovce se přemění na <strong>světlo a teplo</strong>.</li>\n</ul>\n<p>Energie na své cestě mění podobu, ale nezmizí a z ničeho nevznikne.</p>\n\n<h3>Energie jako fyzikální veličina</h3>\n<p>Energie vyjadřuje schopnost tělesa konat práci. Dá se říct, že energie je „uložená práce“. Značka je <strong>E</strong>, základní jednotka je <strong>joule (J)</strong>. Jednotky energie jsou stejné jako jednotky práce.</p>\n<p>Pro elektrickou energii používáme i jednotky <strong>watthodina (Wh)</strong> a <strong>kilowatthodina (kWh)</strong>.</p>\n\n<h3>Shrnutí</h3>\n<p>Energie je schopnost konat práci a měříme ji v joulech. Mění se z jednoho druhu na jiný (zákon zachování energie), nikdy ji nevytvoříme ani nezničíme.</p>",
					uvod: "Když natáhneš gumičku a pustíš ji, vystřelí. Napnutá gumička měla v sobě schovanou schopnost něco rozpohybovat. Té schopnosti fyzici říkají energie. Energie nikdy nezmizí, jen se mění z jedné podoby na druhou.",
					zvidave: "<p><strong>Turbína a generátor.</strong> V elektrárně pára roztočí turbínu (má pohybovou energii) a turbína pohání generátor, který ji přeměňuje na elektrickou energii.</p>\n<p><strong>Slovo „spotřeba“.</strong> Když říkáme, že spotřebič energii „spotřebuje“, není to přesné. Energie nezanikne, jen se přemění na jiný druh. Žárovka přemění elektrickou energii hlavně na teplo a jen menší část na světlo.</p>\n<p><strong>Kilowatthodina.</strong> Podle kWh se udává spotřeba elektřiny a účtuje se podle ní její cena. Platí 1 kWh = 3 600 000 J (víc v podtématu Výkon).</p>",
					zapis: {"jednotky":["značka E, jednotka J (joule), stejná jako u práce","elektřina: i Wh a kWh"],"zakon":"Energii není možné vytvořit ani zničit, jen se přeměňuje z jednoho druhu v jiný.","body":["energie = uložená práce, schopnost konat práci","energie se mění v práci a práce v energii","druhy: mechanická, chemická, elektrická, magnetická, světelná, jaderná, tepelná","příklad: luk → šíp, Slunce → žárovka"]},
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
					obsah: "<h2>Pohybová a polohová energie tělesa</h2>\n\n<p>Těleso získá <strong>mechanickou energii</strong>, když s ním konáme mechanickou práci, tedy když na něj působíme silou a posouváme ho po dráze. Mechanickou energii dělíme na dva druhy: <strong>pohybovou</strong> a <strong>polohovou</strong>.</p>\n\n<h3>Pohybová energie</h3>\n<p>Pohybovou energii má <strong>každé pohybující se těleso</strong>. Jinak se jí říká <strong>kinetická</strong> (kineze = pohyb). Značka je E<sub>k</sub> (k jako kinetická), jednotka je joule (J).</p>\n<p>Velikost pohybové energie závisí na hmotnosti a na rychlosti tělesa:</p>\n<ul>\n<li>čím větší je hmotnost tělesa, tím větší je jeho pohybová energie</li>\n<li>pohybová energie je přímo úměrná druhé mocnině rychlosti: když se rychlost tělesa zvětší 2×, jeho pohybová energie se zvětší 2 · 2 = 4×; když se rychlost zvětší 3×, energie se zvětší 3 · 3 = 9×</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-01.svg\" alt=\"Bowlingová koule s číslem 8 a dvě kuželky, jedna stojí a druhá leží\" /></a><figcaption>Rychle se pohybující bowlingová koule má pohybovou energii a shodí kuželky.</figcaption></figure>\n\n<p>Pohybovou energii využíváme k rozbíjení, drcení nebo posouvání předmětů a k pohonu strojů a zařízení:</p>\n<ul>\n<li>házení šipek: pohybová energie ruky a šipky se mění na práci při zapíchnutí šipky do terče</li>\n<li>bowling: pohybová energie koule se mění na práci při bourání kuželek</li>\n<li>demoliční koule: pohybová energie koule se mění na práci při bourání zdí</li>\n<li>autíčka na setrvačník: uvnitř je otáčející se železný kotouč, který se roztáčí opakovaným pohybem autíčka a pak ho pohání vpřed</li>\n<li>vrtačka: pohybová energie točícího se vrtáku se mění na práci při zavrtání vrutů do dřeva</li>\n</ul>\n\n<p>Velikost pohybové energie souvisí se <strong>setrvačností</strong> tělesa. Z pohybové energie plynou i nebezpečné situace:</p>\n<ul>\n<li>těžký plně naložený kamion se před přechodem nebo překážkou brzdí mnohem hůř než osobní auto jedoucí stejnou rychlostí, protože oba musí svou pohybovou energii snížit na nulu</li>\n<li>auto, které jede ve městě rychleji, než je povoleno, má mnohem větší pohybovou energii, a proto mnohem delší brzdnou dráhu</li>\n<li>velká nákladní loď na moři těžko zastavuje nebo mění směr, proto ji do přístavu táhnou malé vlečné čluny</li>\n<li>pád těžkého a rychle letícího letadla má katastrofické důsledky a srážka s překážkou při rychlé jízdě na kole má často těžké následky</li>\n</ul>\n\n<h3>Polohová energie</h3>\n<p>Polohovou energii mohou mít i tělesa, která jsou <strong>v klidu</strong>. Jinak se jí říká <strong>potenciální</strong>. Tuto energii není na první pohled vidět jako při pohybu, ale zvednuté těleso má ukrytý potenciál vykonat práci při pádu z výšky. Stejně tak natažená nebo stlačená pružina může vykonat práci, když ji uvolníme.</p>\n<p>Polohová energie má dvě podoby: polohová energie <strong>v gravitačním poli Země</strong> a polohová energie <strong>pružnosti</strong>.</p>\n\n<h3>Polohová energie v gravitačním poli Země</h3>\n<p>Má ji každé těleso, které se nachází v určité výšce nad povrchem Země. Značka je E<sub>p</sub> (p jako potenciální), jednotka je joule (J). Velikost polohové energie závisí na <strong>hmotnosti</strong> tělesa a na <strong>výšce</strong>, ve které se těleso nachází.</p>\n<p>Výšku určujeme vždy k tomu, co je pro daný děj důležité:</p>\n<ul>\n<li>při skoku parašutisty je důležitá jeho výška nad Zemí</li>\n<li>při zatloukání hřebíku kladivem je důležitá výška kladiva nad hřebíkem</li>\n<li>při pádu nářadí ze stolu je důležitá výška stolu nad podlahou, nezávisle na tom, jestli je podlaha v přízemí, nebo v některém patře</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-02.svg\" alt=\"Kameník drží v jedné ruce dláto a druhou rukou do něj tluče kladivem, od kamene odletují úlomky\" /></a><figcaption>Kameník tluče kladivem do dláta a od kamene odletují úlomky.</figcaption></figure>\n\n<p><strong>Jak se polohová energie spočítá.</strong> Těleso získá energii tak, že práce vykonaná při jeho zvednutí se v něm uloží. Zvedneme těleso o hmotnosti m do výšky h. Výška h je zároveň dráha, po které těleso zvedáme, takže s = h. Působíme silou vzhůru o velikosti tíhové síly F<sub>G</sub> = m · g. Vykonáme práci W = F · s = m · g · h. Tato práce zůstane v tělese uložena jako jeho polohová energie. Těleso je pak schopné vykonat stejně velkou práci; koná ji gravitační síla, když těleso padá z výšky dolů.</p>\n<p>Polohovou energii tedy počítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>E<sub>p</sub> = m · g · h</strong></p>\n<p>Důležité: do vzorce dosazujeme všechny veličiny v základních jednotkách. Hmotnost v kilogramech, výšku v metrech a g = 10 N/kg. Energie pak vyjde v joulech.</p>\n<p>Ze vzorce si můžeme vyjádřit hmotnost i výšku:</p>\n<ul>\n<li>hmotnost: m = E<sub>p</sub> : (g · h)</li>\n<li>výška: h = E<sub>p</sub> : (m · g)</li>\n</ul>\n\n<p>Polohovou energii v gravitačním poli využíváme při skocích na lyžích a při sjezdu na lyžích. Využívají ji také kladivo, sekera, buchar a lis.</p>\n<p>Může být i nebezpečná. Při pádu se polohová energie tělesa mění na pohybovou a při dopadu tato pohybová energie koná práci. Proto bývají pády na pevnou podložku z velké výšky destruktivní: vedou k vážným úrazům a poškození. Pozor si musí dávat i skokani do vody, aby dopadli v dokonale svislé poloze, jinak se o hladinu zraní.</p>\n\n<h3>Polohová energie pružnosti</h3>\n<p>Polohovou energii pružnosti má každé natažené, stlačené, ohnuté nebo zkroucené pružné těleso. Je to například stlačená nebo natažená pružina, stlačený vzduch, ohnutý pružný prut nebo natažená guma.</p>\n<p>Těleso získá tuto energii tak, že práce vykonaná při jeho deformaci (změně tvaru) se v něm uloží.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-03.svg\" alt=\"Lukostřelec v červené tunice natahuje luk se založeným šípem, tětiva je napnutá\" /></a><figcaption>Lukostřelec natahuje luk a napjatá tětiva tím získává polohovou energii pružnosti.</figcaption></figure>\n<p>Využití polohové energie pružnosti:</p>\n<ul>\n<li>střelba z luku</li>\n<li>natahovací hračky s pérkem</li>\n<li>pružinové houpačky</li>\n<li>pinball</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/pohybova-a-polohova-energie/pohybova-a-polohova-energie-obr-04.svg\" alt=\"Čtyři předměty s pružinou: houpací kůň na velké pružině, natahovací housenky, natahovací plechový kohout a stůl hry pinball\" /></a><figcaption>Pružinu využívá houpací kůň, natahovací housenky, plechový kohout i hra pinball.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Mechanická energie je pohybová a polohová. Pohybovou energii E<sub>k</sub> má těleso, které se pohybuje; při dvojnásobné rychlosti je čtyřnásobná. Polohovou energii má těleso ve výšce (E<sub>p</sub> = m · g · h) a pružné těleso natažené nebo stlačené. Všechny druhy energie se měří v joulech.</p>",
					uvod: "Rychle se kutálející koule srazí kuželky. Těžká věc zvednutá vysoko může při pádu něco rozbít. Obě mají schopnost něco posunout nebo rozbít a té schopnosti fyzici říkají energie. Jedna je schovaná v pohybu, druhá ve výšce.",
					zvidave: "<p><strong>Příklad na výpočet.</strong> Cihla o hmotnosti 2 kg leží na lešení ve výšce 5 m, g = 10 N/kg. Její polohová energie je E<sub>p</sub> = m · g · h = 2 · 10 · 5 = 100 J.</p>\n<p><strong>Kolik musí cihla vážit?</strong> Aby ve stejné výšce 5 m měla polohovou energii 200 J, spočítáme m = E<sub>p</sub> : (g · h) = 200 : (10 · 5) = 4 kg.</p>\n<p><strong>Rychlost auta.</strong> Pravidlo „dvojnásobná rychlost, čtyřnásobná pohybová energie“ platí i pro auta. Auto, které místo 50 km/h jede 100 km/h, má čtyřikrát větší pohybovou energii.</p>\n<p><strong>Větší jednotky.</strong> Energie se někdy udává v kilojoulech a megajoulech: 1 kJ = 1 000 J a 1 MJ = 1 000 000 J.</p>\n<p><strong>Pinball.</strong> Ve hře pinball odražená pružina vystřelí kuličku na hrací plochu.</p>",
					zapis: {"vzorec":"Eₚ = m · g · h      (m = Eₚ : (g · h),  h = Eₚ : (m · g))","jednotky":["Eₖ, Eₚ: J (joule); m v kg, h v m, g = 10 N/kg"],"body":["mechanická energie: pohybová Eₖ a polohová Eₚ","Eₖ má pohybující se těleso, roste s hmotností a rychlostí (2× rychlost → 4× Eₖ)","Eₚ má i těleso v klidu: ve výšce, nebo pružné natažené, stlačené, ohnuté či zkroucené"]},
					odkazy: [
						{ nazev: 'Wordwall — kvíz Energie (pohybová, polohová, zachování)', url: 'https://wordwall.net/resource/37856406/energie' },
					],
				},
				{
					slug: 'zakon-zachovani-mechanicke-energie',
					interakce: 'skatepark',
					nazev: 'Zákon zachování mechanické energie',
					obsah: "<h2>Zákon zachování mechanické energie</h2>\n\n<h3>Celková mechanická energie tělesa</h3>\n<p>Mechanická energie má dvě části: <strong>pohybovou</strong> (odborně kinetickou) a <strong>polohovou</strong> (odborně potenciální). Jejich součet je <strong>celková mechanická energie tělesa</strong>. Značíme ji E a měříme v joulech (J), stejně jako obě její části.</p>\n<p style=\"font-size:1.3rem\"><strong>E = E<sub>p</sub> + E<sub>k</sub></strong></p>\n<p>Například letadlo o hmotnosti 500 tun, které letí rychlostí 900 km/h ve výšce 12 km, má polohovou i pohybovou energii. Jeho celková mechanická energie je rovna součtu obou.</p>\n<p>Práce se může přeměnit na mechanickou energii a naopak. Sekera zvednutá nad hlavu získá polohovou energii tím, že vykonáš práci. Tuto energii pak změní na práci při štípání dřeva. Bowlingová koule získá pohybovou energii tím, že vykonáš práci. Tuto energii pak změní na práci při shození kuželek.</p>\n\n<h3>Zákon zachování mechanické energie</h3>\n<p>Platí fyzikální zákon: „Energii nelze vyrobit ani zničit, pouze se přeměňuje z jednoho druhu na jiný.“ Pro mechanickou energii zní přesněji: „Pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stejný.“</p>\n<p>Při mechanických dějích se tedy pohybová energie může měnit na polohovou a naopak. Celková mechanická energie tělesa se ale nemění.</p>\n\n<h3>Pád tělesa a hod vzhůru</h3>\n<p><strong>Pád.</strong> Při pádu tělesa se polohová energie mění na pohybovou. Parašutista vyskočí z vrtulníku z určité výšky svisle dolů (odpor vzduchu zanedbáme). Nahoře má jen polohovou energii. Při pádu se jeho výška a polohová energie zmenšují. Protože zrychluje, jeho pohybová energie se zvětšuje. Při dopadu na zem má nulovou výšku, a tedy nulovou polohovou energii, ale jeho rychlost a pohybová energie jsou největší. Velikost pohybové energie při dopadu je rovna velikosti polohové energie na začátku pádu.</p>\n<p><strong>Hod vzhůru.</strong> Když vyhazuješ míč do výšky (odpor vzduchu zanedbáme), musíš mu na začátku udělit rychlost, a tedy pohybovou energii. Při letu vzhůru se jeho rychlost a pohybová energie postupně zmenšují, zatímco výška a polohová energie se zvětšují. V největší výšce se míč zastaví, jeho pohybová energie klesne na nulu a polohová energie je největší. Její velikost je rovna velikosti pohybové energie na začátku.</p>\n<p><strong>Kulička na dráze.</strong> Totéž vidíme na kuličce, která se bez tření valí po zakřivené dráze:</p>\n<ul>\n<li>nahoře stojí: E<sub>k</sub> = 0 J, výška je největší, E<sub>p</sub> = 10 J</li>\n<li>rychlost roste, výška se zmenšuje: E<sub>k</sub> = 4 J, E<sub>p</sub> = 6 J</li>\n<li>rychlost roste ještě víc, výška se zmenšuje: E<sub>k</sub> = 8 J, E<sub>p</sub> = 2 J</li>\n<li>dole je rychlost největší a výška nulová: E<sub>k</sub> = 10 J, E<sub>p</sub> = 0 J</li>\n<li>na druhé straně rychlost klesá a výška roste: E<sub>k</sub> = 5 J, E<sub>p</sub> = 5 J</li>\n<li>nahoře se kulička zase zastaví: E<sub>k</sub> = 0 J, E<sub>p</sub> = 10 J</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/zakon-zachovani-mechanicke-energie/zakon-zachovani-mechanicke-energie-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/zakon-zachovani-mechanicke-energie/zakon-zachovani-mechanicke-energie-obr-01.svg\" alt=\"Kulička se valí po dráze: součet pohybové a polohové energie je v každé poloze 10 J.\" /></a><figcaption>Kulička se valí po dráze: součet pohybové a polohové energie je v každé poloze 10 J.</figcaption></figure>\n<p>Ve všech polohách dává součet E<sub>k</sub> + E<sub>p</sub> stejné číslo: celková mechanická energie kuličky se nemění, E = 10 J. Na druhé straně dráhy kulička vystoupá zase do stejné výšky.</p>\n\n<h3>Přenos energie mezi tělesy</h3>\n<p>U některých dějů se energie přenáší z jednoho tělesa na jiné těleso.</p>\n<ul>\n<li><strong>Střelba z luku:</strong> polohová energie pružnosti tětivy se přenese na šíp, který při vystřelení získá rychlost. Polohová energie pružnosti tětivy se tak přeměnila na pohybovou energii šípu.</li>\n<li><strong>Kulečník:</strong> jedna koule narazí do druhé, která je v klidu, a druhá koule se uvede do pohybu. První koule předá část své pohybové energie té druhé.</li>\n</ul>\n\n<h3>Zákon zachování energie v běžném životě</h3>\n<p>V běžném životě je každá přeměna jedné podoby energie na jinou spojena s určitými ztrátami. Tření koná práci a část mechanické energie se přemění na vnitřní energii (těleso se zahřeje). Pro pohyb ani deformaci tuto energii už nevyužijeme.</p>\n<p>Skateboardista na U rampě proto nevystoupá do stejné výšky, ze které vystartoval. Tření mu ubere část mechanické energie, a ta pak stačí jen na menší výšku. Chce-li vystoupat do stejné výšky, musí vykonat práci a potřebnou energii doplnit.</p>\n\n<h3>Shrnutí</h3>\n<p>Celková mechanická energie tělesa je součet polohové a pohybové energie: E = E<sub>p</sub> + E<sub>k</sub>. Energii nelze vyrobit ani zničit, jen se přeměňuje. Pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stejný. Při pádu se polohová energie mění na pohybovou, při hodu vzhůru pohybová na polohovou. Energie se také přenáší mezi tělesy, například z tětivy na šíp. Při tření se část mechanické energie přemění na vnitřní energii a k pohybu ji už nevyužijeme.</p>",
					uvod: "Když se houpeš, nahoře na okamžik zastavíš a dole jsi nejrychlejší. Energie výšky se tak mění na energii pohybu a zase zpátky. Nic se při tom nevyrobí ani nezničí, energie jen přechází z jedné podoby do druhé. Kdyby nic nebrzdilo, houpal by ses pořád stejně vysoko.",
					zvidave: "<p><strong>Kam se energie ztratí.</strong> Když tření ubere skateboardistovi mechanickou energii, energie nezmizí. Kolečka, rampa a okolní vzduch se o trochu zahřejí, roste jejich vnitřní energie. Součet všech druhů energie se tedy nezmění, ubývá jen energie mechanické. Energie se nevyrábí a neničí ani při tření.</p>\n<p><strong>Pád ve skutečnosti.</strong> Parašutista s otevřeným padákem je brzděn vzduchem, takže při dopadu je jeho pohybová energie menší než polohová energie na začátku pádu. Rozdíl se přemění na vnitřní energii a zahřeje vzduch a padák. Zákon zachování mechanické energie ve tvaru „součet zůstává stejný“ platí přesně jen tehdy, když tření a odpor vzduchu nepůsobí (nebo jsou zanedbatelné).</p>\n<p><strong>Dopočítáme chybějící část.</strong> Známe-li celkovou energii E a jednu její část, druhou dopočítáme odečtením: E<sub>p</sub> = E − E<sub>k</sub> nebo E<sub>k</sub> = E − E<sub>p</sub>. U kuličky, která má E<sub>k</sub> = 4 J a E = 10 J, vyjde E<sub>p</sub> = 10 − 4 = 6 J. To odpovídá druhé poloze na obrázku.</p>\n<p><strong>Kámen ze skály.</strong> Kámen o hmotnosti 3 kg leží na skále ve výšce 4 m, g = 10 N/kg. Jeho polohová energie nahoře je E<sub>p</sub> = m · g · h = 3 · 10 · 4 = 120 J. Kámen spadne dolů, kde je výška nulová, a tedy i polohová energie nulová. Podle zákona zachování se celá polohová energie proměnila na pohybovou, takže těsně nad zemí má kámen pohybovou energii E<sub>k</sub> = 120 J.</p>\n<p><strong>Jak vysoko doletí míč.</strong> Chlapec hodí míček o hmotnosti 1 kg svisle vzhůru a na začátku mu dá pohybovou energii 20 J. V nejvyšším bodě je celá tato energie polohová, E<sub>p</sub> = 20 J. Výšku výstupu spočítáme ze vzorce E<sub>p</sub> = m · g · h: h = E<sub>p</sub> : (m · g) = 20 : (1 · 10) = 2 m.</p>",
					zapis: {"vzorec":"E = Eₚ + Eₖ","vzorecSlovy":"mechanická energie = polohová energie + pohybová energie","jednotky":["E, Eₚ, Eₖ: J (joule)"],"zakon":"Pokud se mechanická energie nemění v jiné druhy energie, je součet Eₚ + Eₖ stejný.","body":["energii nelze vyrobit ani zničit, jen přeměnit","pád: Eₚ → Eₖ; hod vzhůru: Eₖ → Eₚ","tření: část energie → vnitřní (těleso se zahřeje)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Zákon zachování energie', cesta: 'vDavukfb5qU' },
					],
				},
				{
					slug: 'energeticka-hodnota-potravin',
					nazev: 'Energetická hodnota potravin',
					interakce: 'svacina',
					obsah: "<h2>Energetická hodnota potravin</h2>\n\n<h3>Proč potřebujeme energii</h3>\n<p>Všechny živé organismy potřebují k životu <strong>energii</strong>. Člověk ji získává hlavně z <strong>potravy</strong>. Potravu tvoří rostliny a živočichové.</p>\n\n<h3>Co tělo s potravou dělá</h3>\n<p>Tělo „spaluje“ <strong>cukry a tuky</strong> spolu s kyslíkem. Tak z potravy uvolní <strong>chemickou energii</strong>. Tu využívá k práci svalů (pohybová energie) a k fungování mozku (elektrická energie).</p>\n\n<h3>Jak se energetická hodnota zjišťuje</h3>\n<p>Potravinu můžeme v laboratoři spálit a zjistit, kolik <strong>tepla</strong> se při hoření uvolní. Právě toto teplo udává <strong>energetickou hodnotu</strong> potraviny.</p>\n\n<h3>Jednotky energetické hodnoty</h3>\n<ul>\n<li>základní jednotka energie je <strong>joule (J)</strong>, větší jednotka je <strong>kilojoule (kJ)</strong></li>\n<li>starší jednotky energie, které se dnes používají jen u potravin, jsou <strong>kalorie (cal)</strong> a <strong>kilokalorie (kcal)</strong></li>\n</ul>\n\n<h3>Na kolik gramů se hodnota udává</h3>\n<p>Energetická hodnota potravin se nejčastěji udává na <strong>100 g</strong> potraviny. Chceme-li zjistit, kolik energie jsme snědli třeba během oběda, musíme provést celkový výpočet podle hmotnosti jednotlivých potravin.</p>\n<p>Energie roste <strong>úměrně hmotnosti</strong>: dvakrát větší množství potraviny má dvakrát větší energii. Energii porce o hmotnosti m proto vypočteme ze vzorce <strong>E = (m : 100) · E<sub>100</sub></strong>, kde E<sub>100</sub> je energetická hodnota na 100 g.</p>\n\n<h3>Shrnutí</h3>\n<p>Živé organismy potřebují energii. Člověk ji získává hlavně z potravy: tělo spaluje cukry a tuky spolu s kyslíkem a chemickou energii využije pro práci svalů a činnost mozku. Energetickou hodnotu potraviny zjistíme spálením v laboratoři, kde měříme uvolněné teplo. Udává se v joulech nebo kilojoulech, u potravin i ve starších kaloriích a kilokaloriích, nejčastěji na 100 g potraviny.</p>",
					uvod: "Jídlo je pro tělo něco jako palivo. Když se najíš, získáš energii na běhání, na hraní i na přemýšlení. Kolik energie jídlo obsahuje, zjistíme tak, že se kousek jídla spálí a změří se teplo, které při tom vznikne.",
					zvidave: "<p><strong>Energie se nevyrábí.</strong> Energie z jídla nevzniká z ničeho. Chemická energie potravy se v těle přeměňuje na pohybovou energii svalů, na elektrickou energii v mozku a na vnitřní energii. Proto se při sportu zahřejeme. Celkové množství energie se přitom nezmění.</p>\n<p><strong>Kilojoule a kalorie.</strong> Předpona kilo- znamená tisíc, takže 1 kJ = 1 000 J. Kalorie a joule měří totéž, energii, jen v jiné jednotce. Na obalech potravin bývá energie uvedená v kJ i v kcal. Převod je asi 1 kcal ≈ 4,2 kJ; berme ho jen jako údaj, který si můžeš na obalu ověřit, a počítat s ním nebudeme.</p>\n<p><strong>Které živiny dávají nejvíc energie.</strong> Jídlo obsahuje tři hlavní živiny: bílkoviny, sacharidy (cukry a škroby) a tuky. Bílkoviny i sacharidy dají na 1 gram asi 17 kJ. Tuky dají na 1 gram asi 38 kJ, tedy víc než dvojnásobek. Molekuly tuku obsahují hodně uhlíku a vodíku a málo kyslíku. Při spalování se s kyslíkem slučují a uvolňují teplo, proto má tučné jídlo víc energie na stejnou hmotnost.</p>\n<p><strong>Energetická hodnota na obalu.</strong> Na obalu potraviny bývá energetická hodnota napsaná dvakrát. Jednou na 100 gramů, aby šly potraviny mezi sebou porovnat. Podruhé na jednu porci, tedy na to, kolik sníš doopravdy najednou.</p>\n<p><strong>Kolik energie tělo potřebuje.</strong> Náctiletý člověk, který se běžně hýbe (škola, chůze, trochu sportu), potřebuje za den asi 9 000 až 10 000 kJ. Kdo sportuje víc, potřebuje energie víc, klidně přes 12 000 kJ. Kdo se málo hýbe, potřebuje méně. Když člověk sní víc energie, než tělo spotřebuje, přebytek se v těle uloží jako tuk.</p>\n<p><strong>Kolik energie spotřebuje pohyb.</strong> Orientačně za jednu hodinu:</p>\n<ul>\n<li>chůze: asi 1 200 kJ (20 kJ za minutu)</li>\n<li>běh: asi 2 400 kJ (40 kJ za minutu)</li>\n<li>plavání: asi 3 000 kJ (50 kJ za minutu)</li>\n</ul>\n<p><strong>Počítáme energii porce.</strong> Vzorec E = (m : 100) · E<sub>100</sub> říká, že hmotnost porce srovnáme se 100 g. Když je porce poloviční, je poloviční i energie. Když je jedenapůlkrát větší, přidáme k hodnotě na 100 g její polovinu. Počítáme jen s celými čísly.</p>\n<p>Müsli tyčinka má na obalu „1 700 kJ / 100 g“ a jedna tyčinka váží 50 g, tedy polovinu ze 100 g. Kolik kJ sníš, když ji sníš celou?</p>\n<p>E = 1 700 : 2 = 850 kJ</p>\n<p>Jogurt má na obalu „400 kJ / 100 g“ a kelímek váží 150 g, tedy 100 g a ještě 50 g. Kolik kJ je v celém kelímku?</p>\n<p>E = 400 + 400 : 2 = 400 + 200 = 600 kJ</p>\n<p>Dvě müsli tyčinky dají 2 · 850 = 1 700 kJ. Hodina běhu spotřebuje asi 2 400 kJ, tedy víc, než ti dvě tyčinky dodají. Zbytek si tělo vezme z vlastních zásob.</p>",
					zapis: {"vzorec":"E = (m : 100) · E₁₀₀","jednotky":["energetická hodnota potravin: J (joule), kJ (kilojoule); starší kalorie (cal), kilokalorie (kcal) jen u potravin"],"body":["energii získává člověk hlavně z potravy (rostliny, živočichové)","tělo spaluje cukry a tuky s kyslíkem: chemická energie → práce svalů (pohybová), mozek (elektrická)","energetickou hodnotu zjistíme spálením potraviny: uvolněné teplo","udává se nejčastěji na 100 g potraviny","energii oběda vypočteme podle hmotnosti jednotlivých potravin"]},
					odkazy: [
						{ nazev: 'Společnost pro výživu — Energetická hodnota potravin', url: 'https://www.vyzivaspol.cz/energeticka-hodnota-potravin/' },
						{ nazev: '100+1 zahraniční zajímavost — Jak se zjišťuje energetická hodnota potravin', url: 'https://www.stoplusjednicka.cz/kdyz-se-pali-jidlo-jak-se-zjistuje-energeticka-hodnota-potravin' },
					],
				},
				{
					slug: 'vnitrni-energie-telesa',
					interakce: 'vnitrni-energie',
					nazev: 'Vnitřní energie tělesa',
					obsah: "<h2>Vnitřní energie tělesa</h2>\n\n<h3>Z čeho jsou tělesa (opakování)</h3>\n<p>Z učiva 6. třídy si zopakujeme tři důležité poznatky o složení látek:</p>\n<ul>\n<li>Tělesa jsou složena z <strong>částic</strong> — atomů a molekul, které se neustále a neuspořádaně pohybují. Jejich pohyb je chaotický, nepředvídatelný a nikdy se nezastaví. Důkazem je <strong>difuze</strong> (samovolné promíchání částic různých látek) a <strong>Brownův pohyb</strong> (pohyb pylových zrnek na vodě).</li>\n<li>Rychlost pohybu částic závisí na teplotě tělesa: čím vyšší teplota, tím rychlejší pohyb částic. Poznáme to třeba na čaji: v horké vodě se barvivo smísí s vodou snadno a rychle i bez míchání, ve studené vodě mnohem hůř.</li>\n<li>Mezi částicemi působí <strong>přitažlivé a odpudivé síly</strong>, které udržují pohybující se částice v rovnovážné poloze, tedy v jakési ideální vzdálenosti. Důkazem je pružnost materiálů (po dočasné deformaci se vrátí do původního stavu), nestlačitelnost kapalin nebo soudržnost kapek vody.</li>\n</ul>\n<p><strong>Pevná látka, kapalina a plyn.</strong> V <strong>pevných látkách</strong> částice kmitají kolem pevných rovnovážných poloh v krystalické mřížce; velmi silné přitažlivé a odpudivé síly jim nedovolí tyto polohy opustit. V <strong>kapalinách</strong> síly udržují částice ve stejných vzdálenostech, ale částice mohou měnit své polohy a kloužou po sobě. V <strong>plynech</strong> na sebe částice působí jen malými silami nebo vůbec ne a pohybují se zcela volně prostorem.</p>\n\n<h3>Co je vnitřní energie tělesa</h3>\n<p>Každá částice tělesa (atom, molekula) se neustále pohybuje, a proto má <strong>pohybovou energii</strong> danou rychlostí svého pohybu. Každá částice také neustále mění svou polohu vůči ostatním částicím, a proto má <strong>polohovou energii</strong> danou její okamžitou polohou. Ta se změní, když se částice vychýlí z rovnovážné polohy, tedy když se k jiným částicím více přiblíží, nebo se od nich vzdálí. Platí to pro úplně každou částici — v kameni, ve vodě i ve vzduchu.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-01.svg\" alt=\"Prostorová krystalová mřížka: červené kuličky (atomy uhlíku) spojené tenkými tyčkami, v pravém dolním rohu legenda: červená kulička = C\" /></a><figcaption>V pevné látce jsou částice uspořádané v krystalové mřížce a kmitají kolem svých poloh.</figcaption></figure>\n<p>Součet energií všech částic, ze kterých je těleso složeno, se nazývá <strong>vnitřní energie tělesa</strong>. Měří se v joulech (J), stejně jako každá jiná energie. Její velikost závisí hlavně na stavu částic uvnitř tělesa:</p>\n<ul>\n<li>na <strong>počtu částic</strong> v tělese</li>\n<li>na <strong>teplotě</strong> tělesa, která ovlivňuje rychlost částic</li>\n</ul>\n<p>Vnitřní energii neovlivňuje, jestli se těleso pohybuje, nebo je v klidu, ani jeho poloha v gravitačním poli. Letící míč i stejný míč v klidu na zemi mohou mít úplně stejnou vnitřní energii, pokud mají stejnou teplotu a stejný počet částic. To, že míč letí nebo je ve výšce, popisuje pohybová a polohová energie tělesa jako celku, ne jeho vnitřní energie.</p>\n\n<h3>Jak vnitřní energii tělesa změníme</h3>\n<p>Vnitřní energii tělesa <strong>zvýšíme</strong>:</p>\n<ul>\n<li><strong>zahřátím</strong> — částice se pohybují rychleji</li>\n<li><strong>přidáním částic</strong> — třeba dofouknutím pneumatiky</li>\n<li><strong>konáním práce</strong> — tělesu tím dodáme energii, třeba třením (při vrtání nebo brzdění), stlačením či natažením tělesa</li>\n<li><strong>přijetím tepelné energie</strong> od tělesa s vyšší teplotou</li>\n</ul>\n\n<h3>Jak se změna vnitřní energie projeví navenek</h3>\n<p>Zvýšení vnitřní energie tělesa se projeví <strong>zvýšením jeho teploty</strong>. Snížení vnitřní energie se projeví <strong>snížením teploty</strong>. Známe to z běžného života:</p>\n<ul>\n<li>při brzdění se zahřívají brzdy</li>\n<li>při vrtání se zahřívá vrták vrtačky</li>\n<li>když drát opakovaně kroutíme na jednom místě, zahřeje se a v tom místě se přetrhne</li>\n<li>topná spirála vařiče se zahřívá, když jí prochází elektrický proud (volné elektrony se pohybují mezi částicemi látky)</li>\n</ul>\n\n<h3>Změna vnitřní energie v praxi</h3>\n<p><strong>Využití.</strong> Zvyšování teploty třením využíváme třeba při rozdělávání ohně, nebo když si třeme studené ruce, abychom je zahřáli.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-02.svg\" alt=\"Dvě ruce zapalují zápalku o škrtací plošku krabičky, zápalka hoří jasným plamenem a stoupá z ní kouř\" /></a><figcaption>Třením o škrtací plošku se zápalka zahřeje a vzplane.</figcaption></figure>\n<p><strong>Negativní důsledky.</strong> Zvyšování teploty třením způsobuje přehřátí a poškození materiálu. Poškození předcházíme <strong>chlazením</strong> — vodou, olejem nebo vzduchem. Chladí se například:</p>\n<ul>\n<li>zub při vrtání kazu vodou</li>\n<li>kovové díly při obrábění olejem</li>\n<li>motor v autě</li>\n</ul>\n<p>Kosmické lodě před zahřátím při průletu atmosférou chrání speciální tepelné štíty.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/vnitrni-energie-telesa/vnitrni-energie-telesa-obr-03.svg\" alt=\"Zubař v modrém oděvu a rukavicích vrtá zub pacientce v křesle, zubní asistentka vedle drží hadičku s vodou a odsávačkou\" /></a><figcaption>Zubař při vrtání zubu chladí vodou, aby se zub třením nepřehřál.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Tělesa se skládají z částic, které se neustále pohybují a působí na sebe silami. Každá částice má pohybovou a polohovou energii. Jejich součet u všech částic tělesa je vnitřní energie tělesa. Závisí na počtu částic a na teplotě, ne na pohybu ani poloze tělesa jako celku. Vnitřní energii zvýšíme konáním práce, přijetím tepla nebo přidáním částic. Když roste, roste i teplota tělesa; když klesá, teplota klesá. Zahřívání třením někdy využíváme a někdy mu musíme bránit chlazením.</p>",
					uvod: "Všechno kolem nás se skládá z maličkých částeček, které se pořád pohybují. Každá z nich má trochu energie a všechny dohromady mají vnitřní energii tělesa. Když si třeš dlaně o sebe, přidáš jim energii a ruce se zahřejí.",
					zvidave: "<p><strong>Proč se pylová zrnka chvějí.</strong> Zrnka pylu na vodě se pod mikroskopem stále chvějí, protože do nich narážejí rychle se pohybující částice vody. Brownův pohyb je tedy vidět, i když samotné částice vody vidět nejsou.</p>\n<p><strong>Teplota a vnitřní energie nejsou totéž.</strong> Vana horké vody a hrnek horké vody mohou mít stejnou teplotu, ale vana má mnohem víc částic, a proto i mnohem větší vnitřní energii. Při tání ledu navíc tělesu energii dodáváme, a přesto se jeho teplota po dobu tání nemění: dodaná energie se spotřebuje na změnu skupenství, tedy na změnu uspořádání a vzájemné polohy částic.</p>\n<p><strong>Energie se nevyrábí.</strong> Když se zahřívají brzdy, energie nevzniká z ničeho. Pohybová energie auta se při brzdění přeměňuje na vnitřní energii brzd, a celková energie se přitom nezmění.</p>\n<p><strong>Oheň třením.</strong> Oheň se dá rozdělat i třením dřeva o dřevo: dřevo se třením zahřívá, až se vznítí.</p>\n<p><strong>Značka.</strong> Vnitřní energie nemá na základní škole zvláštní značku, aby se nepletla s napětím U.</p>",
					zapis: {"jednotky":["vnitřní energie: J (joule), zvláštní značku nemá"],"body":["vnitřní energie = součet pohybové a polohové energie všech částic tělesa","závisí na počtu částic a na teplotě; nezávisí na pohybu ani poloze celého tělesa","změna: konáním práce (tření) nebo tepelnou výměnou (přijetím tepla), též přidáním částic; těleso se zahřeje","energie roste → teplota roste; klesá → teplota klesá","příklad: třením se zahřejí ruce, brzdy i vrták"]},
					odkazy: [
						{ nazev: 'Fyzika007 — Vnitřní energie tělesa (výklad + příklady)', url: 'https://www.fyzika007.cz/molekulov%C3%A1-fyzika-atermika/vnit%C5%99n%C3%AD-energie-t%C4%9Blesa' },
						{ nazev: 'Eductify — procvičení: Změny vnitřní energie (8. ročník)', url: 'https://www.eductify.com/cs/fyzika/c80/8-rocnik-zs/p-zvet/zmeny-vnitrne-energie' },
					],
				},
				{
					slug: 'tepelna-vymena-a-teplo',
					interakce: 'kalorimetr',
					nazev: 'Tepelná výměna, teplo, měrná tepelná kapacita',
					obsah: "<h2>Tepelná výměna, teplo, měrná tepelná kapacita</h2>\n\n<h3>Tepelná výměna</h3>\n<p>Tepelná výměna nastává, když se dotknou dvě tělesa s <strong>různou teplotou</strong>. V místě dotyku se přenáší energie mezi částicemi obou těles. Rychlejší částice teplejšího tělesa narážejí do pomalejších částic chladnějšího tělesa a předávají jim část své pohybové energie. Rychlé částice tím zpomalí a pomalé zrychlí.</p>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/tepelna-vymena-a-teplo/tepelna-vymena-a-teplo-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/tepelna-vymena-a-teplo/tepelna-vymena-a-teplo-obr-01.svg\" alt=\"Schéma tepelné výměny: vlevo červený obdélník s nápisem horké těleso a červenými kuličkami (částicemi) se šipkami rychlosti, vpravo modrý obdélník s nápisem studené těleso a modrými kuličkami; nahoře nad oběma tělesy ohnutá šipka od horkého ke studenému s nápisy teplo a přenos energie; dvě bubliny: rychlejší částice narazí do pomalejších, předají jim část energie a zpomalí; pomalejší částice získají energii a zrychlí\" /></a><figcaption>Teplo přechází z horkého tělesa na studené: rychlejší částice předají pomalejším část své energie.</figcaption></figure>\n<p>Energie přitom přechází od teplejšího tělesa k chladnějšímu:</p>\n<ul>\n<li>teplejší těleso svou vnitřní energii <strong>snižuje</strong></li>\n<li>chladnější těleso svou vnitřní energii <strong>zvyšuje</strong></li>\n<li>tepelná výměna <strong>skončí</strong>, když se teploty obou těles vyrovnají</li>\n</ul>\n\n<h3>Teplo</h3>\n<p><strong>Teplo</strong> je energie, kterou teplejší těleso předává chladnějšímu při tepelné výměně. Je to část vnitřní energie těles, která se přenáší z jednoho tělesa na druhé. Značíme ho <strong>Q</strong> a měříme v joulech (J).</p>\n<ul>\n<li>teplejší těleso teplo <strong>odevzdává</strong></li>\n<li>chladnější těleso teplo <strong>přijímá</strong></li>\n<li>když jsou obě tělesa tepelně izolována od okolí (teplo nikam neuniká), je odevzdané teplo teplejšího tělesa stejně velké jako teplo přijaté chladnějším tělesem</li>\n</ul>\n<p>Těleso tedy teplo v sobě neskladuje — má vnitřní energii. Teplo je jen ta její část, která se právě předává.</p>\n\n<h3>Teplo a teplota se nesmí zaměňovat</h3>\n<p>Ve fyzice mají slova teplo a teplota odlišný význam:</p>\n<ul>\n<li><strong>Teplo</strong> je část vnitřní energie předávaná při tepelné výměně. Jako množství energie ho přímo neměříme — jeho velikost dopočítáme z jiných měřitelných veličin, protože změna vnitřní energie se projeví změnou teploty.</li>\n<li><strong>Teplota</strong> popisuje okamžitý stav tělesa. Měříme ji teploměrem, značíme ji <strong>t</strong> a udáváme ve stupních Celsia (°C). Vědci používají kelvin (K).</li>\n</ul>\n\n<h3>Výpočet tepla</h3>\n<p>Kolik tepla těleso přijme, závisí na třech věcech:</p>\n<ul>\n<li>na <strong>rozdílu teplot</strong> — čím větší rozdíl, tím víc tepla je třeba. Zahřát hrnec studené vody na mytí nádobí spotřebuje méně tepla než uvařit stejnou vodu na čaj.</li>\n<li>na <strong>hmotnosti tělesa</strong> — čím větší hmotnost, tím víc tepla je třeba. Uvařit studenou vodu na čaj pro 2 osoby spotřebuje méně tepla než uvařit stejně studenou vodu pro 20 osob.</li>\n<li>na <strong>látce</strong> — každá látka spotřebuje na ohřívání jiné množství tepla. Olej se rozehřeje na vysokou teplotu mnohem rychleji než stejné množství vody.</li>\n</ul>\n<p>Vlastnost látek, kterou se to liší, se jmenuje <strong>měrná tepelná kapacita</strong> a značí se <strong>c</strong>. Teplo pak spočítáme podle vzorce:</p>\n<p style=\"font-size:1.3rem\"><strong>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>)</strong></p>\n<p>Q je teplo, m hmotnost tělesa, c měrná tepelná kapacita látky, t<sub>1</sub> je počáteční teplota tělesa a t<sub>2</sub> konečná teplota tělesa.</p>\n\n<h3>Měrná tepelná kapacita látky</h3>\n<p>Měrná tepelná kapacita <strong>c</strong> je fyzikální veličina, která popisuje tepelné vlastnosti látek. Říká, <strong>kolik tepla musíme dodat 1 kg látky, aby se její teplota zvýšila o 1 °C</strong>. Její jednotka je joule na kilogram a stupeň Celsia, zapisujeme <strong>J/(kg · °C)</strong>. Každá látka ji má jinou. Hodnoty najdeme ve fyzikálních tabulkách.</p>\n<p>Například měrná tepelná kapacita vody je <strong>4 200 J/(kg · °C)</strong>. To znamená, že když chceme 1 kg vody ohřát o 1 °C, musíme jí dodat 4 200 J tepla. V tabulkách jsou hodnoty často ve větších jednotkách: 1 kJ/(kg · °C) = 1 000 J/(kg · °C).</p>\n<p>Příklad: v konvici ohříváme 2 kg vody z 20 °C na 30 °C. Rozdíl teplot je t<sub>2</sub> − t<sub>1</sub> = 30 − 20 = 10 °C. Voda přijme teplo:</p>\n<p>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) = 2 · 4 200 · 10 = 84 000 J = 84 kJ</p>\n\n<h3>Měrná tepelná kapacita v praxi</h3>\n<p>Měrná tepelná kapacita určuje, jak snadno se látka ohřívá a ochlazuje a jak dobře v sobě udrží tepelnou energii.</p>\n<ul>\n<li><strong>Vysoká hodnota c</strong> — velké množství dodaného tepla způsobí jen malé zahřátí a látka se ohřívá i ochlazuje pomalu. Dokáže v sobě udržet hodně energie, proto se používá jako zásobník tepelné energie. Příkladem je voda: přenáší teplo z tepláren do topení v domácnostech a je náplní v chladičích.</li>\n<li><strong>Nízká hodnota c</strong> — na zahřátí o 1 °C stačí málo tepla, proto se látka snadno ohřívá i ochlazuje. Příkladem jsou kovy, které se proto rychle ohřejí; využívají se třeba jako kovová žebra chladičů nebo kovová topná tělesa.</li>\n</ul>\n<figure><a href=\"/obrazky/fyzika/8-rocnik/energie/tepelna-vymena-a-teplo/tepelna-vymena-a-teplo-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/8-rocnik/energie/tepelna-vymena-a-teplo/tepelna-vymena-a-teplo-obr-02.svg\" alt=\"Kovový chladič zepředu: obdélníková mřížka s vodorovnými kovovými trubkami a mezi nimi hustými tenkými žebry, po stranách tmavé nádržky s hrdly\" /></a><figcaption>Chladič má kovové trubky s hustými tenkými žebry, kterými odvádí teplo.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Když se dotknou dvě tělesa s různou teplotou, nastane tepelná výměna: rychlejší částice teplejšího tělesa předají část energie pomalejším částicím chladnějšího tělesa. Předaná energie je teplo Q, měří se v joulech a přechází od teplejšího tělesa k chladnějšímu, dokud se teploty nevyrovnají. Teplo není teplota — teplotu měříme teploměrem ve stupních Celsia. Teplo spočítáme podle vzorce Q = m · c · (t<sub>2</sub> − t<sub>1</sub>). Měrná tepelná kapacita c říká, kolik tepla ohřeje 1 kg látky o 1 °C; voda ji má vysokou, kovy nízkou.</p>",
					uvod: "Když naliješ horký čaj do studeného hrnku, hrnek se zahřeje a čaj trochu vychladne. Teplejší věc totiž předává studenější věci část své energie a té říkáme teplo. Předávání skončí, až mají obě věci stejnou teplotu.",
					zvidave: "<p><strong>Když se těleso ochlazuje.</strong> Vzorec Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) platí i pro ochlazování. Konečná teplota je pak nižší než počáteční, rozdíl t<sub>2</sub> − t<sub>1</sub> vyjde záporný, a proto i Q vyjde záporné — těleso teplo odevzdává. Například 3 kg vody se ochladí z 80 °C na 60 °C: t<sub>2</sub> − t<sub>1</sub> = 60 − 80 = −20 °C, Q = 3 · 4 200 · (−20) = −252 000 J. Voda tedy odevzdá teplo 252 000 J.</p>\n<p><strong>Ze vzorce dopočítáme i hmotnost nebo měrnou tepelnou kapacitu.</strong> Platí m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)] a c = Q : [m · (t<sub>2</sub> − t<sub>1</sub>)]. Kolik kg vody ohřejeme o 10 °C teplem 42 000 J? m = 42 000 : (4 200 · 10) = 42 000 : 42 000 = 1 kg.</p>\n<p><strong>Větší jednotky.</strong> 1 kJ = 1 000 J, 1 MJ = 1 000 000 J a 1 kg = 1 000 g. Do vzorce dosazujeme teplo v joulech, hmotnost v kilogramech, měrnou tepelnou kapacitu v J/(kg · °C) a teploty ve °C.</p>\n<p><strong>Míchání teplé a studené vody.</strong> Když smícháme stejná množství studené a teplé vody (dvě stejné hmotnosti), teplejší voda odevzdá tolik tepla, kolik studenější přijme, a výsledná teplota vyjde přibližně jako průměr obou teplot: (t<sub>1</sub> + t<sub>2</sub>) : 2. Kdybychom smíchali víc studené vody než teplé, vyjde teplota blíž teplotě studené. Naměřená hodnota bývá o kousek nižší, protože trocha tepla uniká do okolí.</p>\n<p><strong>Měrná tepelná kapacita a vedení tepla jsou dvě různé věci.</strong> Měrná tepelná kapacita říká, kolik tepla látka potřebuje na ohřátí. Jak dobře látka teplo vede, je jiná vlastnost: kovy teplo vedou dobře (tepelné vodiče), zatímco tepelné izolanty ho vedou špatně. Voda se sice ohřívá pomalu, ale tepelný izolant to není.</p>",
					zapis: {"vzorec":"Q = m · c · (t₂ − t₁)","jednotky":["Q [J], m [kg], t [°C]"],"body":["teplo Q: energie předaná teplejším tělesem chladnějšímu","výměna končí při vyrovnání teplot; teplo ≠ teplota","c: teplo na ohřátí 1 kg o 1 °C; voda 4 200 J/(kg · °C)","voda: vysoké c, kovy: nízké c","příklad: 2 kg vody z 20 °C na 30 °C: Q = 2 · 4 200 · 10 = 84 000 J"]},
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
				{
					slug: 'alternativni-motory',
					nazev: 'Alternativní motory a pohony (nad rámec RVP)',
					interakce: 'alternativni-motory',
					obsah: "<h2>Alternativní motory a pohony (nad rámec RVP)</h2>\n<p>Pístový spalovací motor se čtyřmi dobami není jediný způsob, jak přeměnit energii paliva na pohyb. Konstruktéři vymysleli i jiné principy — motor s otáčivým pístem, motor úplně bez pístů, a dokonce motor, který funguje i tam, kde není žádný vzduch.</p>\n\n<h3>Wankelův motor — píst, který se otáčí</h3>\n<p>Wankelův motor nemá klasický píst pohybující se nahoru a dolů. Místo něj se uvnitř oválné komory otáčí <strong>trojúhelníkový rotor</strong>. Všechny čtyři doby — sání, stlačení, výbuch i výfuk — probíhají <strong>současně</strong>, jen v různých komorách kolem rotoru.</p>\n<p>Výhodou je velmi <strong>hladký a klidný chod</strong> bez otřesů. Nevýhodou jsou potíže s <strong>těsněním</strong> rotoru a vyšší spotřeba paliva.</p>\n\n<h3>Proudový motor — pohon reakcí</h3>\n<p>Proudový (reaktivní) motor pohání letadla. Nasává vzduch, <strong>kompresor</strong> ho stlačí, ve <strong>spalovací komoře</strong> se smísí s palivem a zapálí. Horké plyny roztočí <strong>turbínu</strong> (ta zároveň pohání kompresor) a <strong>tryskou</strong> unikají ven vysokou rychlostí.</p>\n<p>Motor funguje na principu <strong>akce a reakce</strong>: plyny prudce vytrysknou dozadu (akce), a proto je letadlo tlačeno stejně velkou silou dopředu (reakce).</p>\n\n<h3>Raketový motor — bez vzduchu z okolí</h3>\n<p>Raketový motor pracuje na stejném principu akce a reakce jako proudový, ale s jedním zásadním rozdílem: nemůže nasávat vzduch z okolí, protože ve vesmíru žádný není. Proto si musí <strong>kyslík (okysličovadlo)</strong> vézt s sebou ve vlastní nádrži, spolu s nádrží paliva.</p>\n<p>Palivo a okysličovadlo se smísí a spálí ve <strong>spalovací komoře</strong>, horké plyny unikají <strong>tryskou</strong> ven a raketu tlačí opačným směrem. Díky tomu, že raketový motor nepotřebuje okolní vzduch, funguje stejně dobře v atmosféře i ve <strong>vakuu</strong> — jen tak mohou rakety létat do vesmíru.</p>\n<p>💡 Existuje i <strong>náporový motor</strong> (ramjet) — nemá žádné pohyblivé součásti a vzduch do něj „nacpe\" samotná rychlost letu. Funguje ale jen při velmi vysokých rychlostech; jeho výhodou je vysoký tah a jednoduchost.</p>\n\n<h3>Alternativní pohony</h3>\n<p>Vedle klasického benzínu a nafty se vozidla pohánějí i jinak:</p>\n<ul>\n<li><strong>alternativní paliva</strong> — LPG, CNG nebo bioplyn</li>\n<li><strong>hybridní pohon</strong> — kombinuje spalovací motor s elektromotorem</li>\n<li><strong>elektromobily</strong> — spalovací motor úplně nahrazují elektromotorem napájeným z baterie</li>\n<li><strong>vodíkový pohon</strong> — vodík se v palivovém článku mění na elektřinu pro elektromotor; považuje se za budoucnost čisté energie</li>\n</ul>",
					zapis: {"body":["Wankelův motor: místo pístu se otáčí trojúhelníkový rotor","Wankelův motor: sání, stlačení, výbuch, výfuk probíhají současně v různých komorách","Wankelův motor: hladký chod, ale potíže s těsněním a vyšší spotřeba","proudový motor: kompresor stlačí vzduch, směs se spálí, roztočí se turbína","proudový motor: plyny unikají tryskou — princip akce a reakce","raketový motor: stejný princip jako proudový, ale nese si i okysličovadlo","raketový motor: funguje i ve vakuu, proto lety do vesmíru","náporový motor (ramjet): bez pohyblivých částí, vysoký tah, funguje jen při vysoké rychlosti","alternativní paliva: LPG, CNG, bioplyn","hybrid: spalovací motor + elektromotor","elektromobil: spalovací motor nahrazen elektromotorem a baterií","vodíkový pohon: palivový článek mění vodík na elektřinu pro elektromotor"]},
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
					obsah: "<h2>Tuhnutí</h2>\n<p>Když kapalinu ochlazujeme, její teplota klesá. Při <strong>teplotě tuhnutí</strong> se z kapaliny odebírá teplo a látka se mění na <strong>pevnou</strong>. U vody se tomu říká <strong>mrznutí</strong>. Tuhnutí je opačný děj k tání.</p>\n\n<h3>Teplota tuhnutí</h3>\n<p>U krystalických látek je <strong>teplota tuhnutí stejná jako teplota tání</strong>. Voda taje i mrzne při <strong>0 °C</strong>. Amorfní látky nemají jednu přesnou teplotu, ale celé rozmezí, ve kterém tuhnou postupně.</p>\n\n<h3>Co se děje s částicemi</h3>\n<p>Při tuhnutí částice zpomalují a spojují se pevnými vazbami do pravidelného tvaru. Tuhnutí vždy začíná od nějakého <strong>pevného jádra</strong>. Led na řece roste od břehu nebo od kamene, kapka mrzne od smítka prachu.</p>\n\n<h3>Teplo se uvolňuje</h3>\n<p><strong>Během tuhnutí se teplota látky nemění</strong>, dokud neztuhne úplně všechno. Teplo, které z kapaliny odebíráme, se přitom neztrácí — <strong>uvolňuje se do okolí</strong>. Říká se mu <strong>skupenské teplo</strong>.</p>\n\n<h3>Voda je výjimka — objem se zvětšuje</h3>\n<p>Většina látek při tuhnutí objem zmenšuje. Voda je výjimka: při mrznutí objem naopak zvětšuje. Proto má led menší hustotu než voda a plave na hladině. V přírodě je to výhoda — led plave nahoře a ryby mohou žít pod ním.</p>\n<p>V technice to ale dělá potíže: zmrzlá voda praská potrubí, beton i asfalt. Proto se vodovody vedou aspoň 90 cm hluboko pod zemí, v chladnějších oblastech až 140 cm. Této hloubce se říká nezámrzná hloubka. Na zimu se navíc z potrubí voda vypouští.</p>\n\n<h3>Kdyby led neplaval</h3>\n<p>Zkus si domyslet, co by se stalo, kdyby voda byla jako ostatní látky. Led by byl těžší než voda a klesal by ke dnu. Rybník by pak nezamrzal shora, ale ode dna, a mohl by promrznout skrz naskrz. Ledová vrstva na hladině totiž funguje jako přikrývka, která chrání vodu i život pod ní.</p>\n\n<h3>Teplota tuhnutí se dá posunout — solení silnic</h3>\n<p>Čistá voda mrzne při 0 °C. Když v ní ale rozpustíme sůl, částicím to brání srovnat se do pravidelné ledové mřížky. Voda pak potřebuje ještě větší zimu, než zmrzne.</p>\n<p>Přesně to využívají silničáři: sůl led nezahřívá, jen mu sníží teplotu tuhnutí. Led tak „má nad nulou\" a taje i v mrazu. Osolená břečka je přitom na dotek studená, protože si teplo bere z okolí.</p>\n<p>V praxi sůl pomůže jen do mrazu kolem −5 až −7 °C, při teplotách pod −11 °C už je skoro k ničemu a sype se písek a drť. Úplná hranice, kdy by sůl vůbec fungovala, je −21 °C, ale k tomu by bylo potřeba přesně namíchaný roztok, jaký na silnici nikdy nevznikne.</p>\n\n<h3>💡 Podchlazená voda</h3>\n<p>Čistá voda bez pevného jádra může zůstat kapalná i pod nulou. Stačí do ní pak ťuknout a během okamžiku v ní vznikne led. Neztuhne proto, že by se ochladila, ale proto, že konečně dostala, od čeho začít.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Teplo, které se při tuhnutí uvolní, umíme spočítat. Skupenské teplo tuhnutí značíme L<sub>t</sub>, hmotnost m a měrné skupenské teplo tuhnutí l<sub>t</sub>. Pro led je l<sub>t</sub> = 332 kJ/kg — stejně jako u tání, protože měrné skupenské teplo tání a tuhnutí má u téže látky stejnou hodnotu.</p>\n<p>Kbelík s 5 kg vody přes noc úplně zmrzne. Kolik tepla se přitom uvolní do okolí?</p>\n<p>L<sub>t</sub> = l<sub>t</sub> · m = 332 · 5 = 1 660 kJ</p>\n<p>Funguje to i obráceně. Do okolí se uvolnilo 664 kJ tepla a všechna voda v nádobě zmrzla. Jakou měla nádoba hmotnost vody?</p>\n<p>m = L<sub>t</sub> : l<sub>t</sub> = 664 : 332 = 2 kg</p>\n<p>Podchlazená voda taky ukazuje, jak silné skupenské teplo je. Z vody podchlazené na −5 °C po ťuknutí zmrzne jen malá část, asi <strong>šestnáctina</strong> — zbytek zůstane kapalný jako <strong>ledová kaše</strong>. Uvolněné teplo totiž vodu hned zase ohřeje zpátky na 0 °C, a tuhnutí se zastaví. Aby zmrzla úplně celá, muselo by být podchlazení asi <strong>80 °C</strong>, a to už se v přírodě nestává.</p>\n<p>Obě čísla vycházejí z porovnání měrného skupenského tepla tuhnutí ledu (l<sub>t</sub> = 332 kJ/kg) a měrné tepelné kapacity vody (c = 4 200 J/(kg·°C)): 332 000 : 4 200 ≈ 79, tedy asi 80 °C.</p>",
					zapis: {"vzorec":"Lₜ = lₜ · m      (odvozeně: lₜ = Lₜ : m,  m = Lₜ : lₜ)","jednotky":["skupenské teplo tuhnutí — značíme Lₜ, jednotka J (joule)","měrné skupenské teplo tuhnutí — značíme lₜ, jednotka J/kg (joule na kilogram)","hmotnost — značíme m, jednotka kg (kilogram)","Převody: 1 kJ = 1 000 J.","Do vzorce dosazuj teplo a měrné skupenské teplo ve stejné jednotce (J nebo kJ) a hmotnost v kg."],"vzorecSlovy":"uvolněné skupenské teplo = měrné skupenské teplo tuhnutí krát hmotnost","zakon":"Měrné skupenské teplo tání a tuhnutí dané látky mají stejnou hodnotu.","body":["tuhnutí: kapalina → pevná látka (ochlazování)","u vody: mrznutí","teplota tuhnutí = teplota tání","teplota se během tuhnutí nemění, teplo se uvolňuje","voda: objem se zvětšuje, led plave","sůl snižuje teplotu tuhnutí","Lₜ = lₜ · m"]},
					odkazy: [
						{ nazev: 'Techmania Edu — Tání a tuhnutí', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/skupenstvi/tani-tuhnuti' },
						{ nazev: 'Jak vlastně funguje solení silnic v zimě? (Zeptej se vědce)', url: 'https://zeptejsevedce.cz/dotazy-a-odpovedi/jak-vlastne-funguje-soleni-silnic-v-zime/' },
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
						obsah: "<h2>Elektrické pole</h2>\n<p>Kolem každého <strong>nabitého tělesa</strong> vzniká neviditelné <strong>elektrické pole</strong>. Projevuje se tak, že působí <strong>elektrickou silou</strong> na jiná tělesa — a to i na dálku, bez dotyku.</p>\n<ul>\n<li>nesouhlasně nabitá tělesa (+ a −) se <strong>přitahují</strong> — třeba hřeben a vlasy, nebo mikrotenový sáček a ruka</li>\n<li>souhlasně nabitá tělesa se <strong>odpuzují</strong> — proto se rozčesané vlasy navzájem rozestupují</li>\n</ul>\n\n<h3>Siločáry — jak si pole nakreslit</h3>\n<p>Elektrické pole je neviditelné, ale fyzikové ho kreslí pomocí <strong>siločar</strong>. Podle dohody ukazují siločáry směr síly, která by působila na <strong>kladný náboj</strong> — proto vždycky míří <strong>od + k −</strong>.</p>\n<p>Čím jsou siločáry k sobě <strong>hustší</strong>, tím je pole na tom místě <strong>silnější</strong>. Dál od nabitého tělesa síla slábne a siločáry <strong>řídnou</strong>. Mezi dvěma rovnoběžnými nabitými deskami jsou siločáry rovnoběžné po celé ploše — takovému poli se říká <strong>stejnorodé (homogenní)</strong>.</p>\n<p>Tvar siločar dokonce uvidíš v pokusu: do oleje ponoříš dva nabité kovové drátky a hladinu posypeš jemnou krupicí. Zrnka se sama srovnají podél neviditelných siločar.</p>\n\n<h3>Vodič v elektrickém poli</h3>\n<p>V nenabitém kovu se působením cizího pole <strong>přesunou volné elektrony</strong> na jednu stranu tělesa. Tomu se říká <strong>elektrostatická indukce</strong>. Jedna strana kovu je pak záporná, druhá kladná, i když je těleso jako celek pořád neutrální. Proto se k zelektrovanému pravítku rozkutálí i neutrální plechovka.</p>\n<p>Indukci umí ukázat i <strong>elektroskop</strong> — přístroj s ručičkou, který ukazuje nabití. Když k němu přiblížíš nabitou tyč, ručička se vychýlí, i když se tyče nedotkneš. A po oddálení tyče se zase vrátí zpátky. Ale dotkneš-li se elektroskopu rukou zrovna ve chvíli, kdy je tyč blízko, odvedeš tím část náboje do země. Teď je důležité pořadí: nejdřív odtáhni ruku a teprve pak tyč. Jen tak elektroskop zůstane nabitý natrvalo.</p>\n\n<h3>Izolant v elektrickém poli</h3>\n<p>V izolantu elektrony atomy neopustí — jen se uvnitř atomů <strong>natočí</strong> k jedné straně. Tomu se říká <strong>polarizace</strong>. I takové těleso je k nabitému tělesu přitahováno, přestože zůstává elektricky neutrální.</p>\n<p>Proto se k zelektrovanému pravítku přitáhnou drobné kousky papíru nebo tenký proud vody z kohoutku. Na rozdíl od vodiče ale z izolantu <strong>náboj odvést nelze</strong>.</p>\n\n<h3>⚡ Faradayova klec — proč je v autě při bouřce bezpečno</h3>\n<p>Vezmi si znovu <strong>elektrostatickou indukci</strong> z odstavce výš: v kovu se volné elektrony přesunou tam, kam je vnější pole tlačí. Jenže tím samy vytvoří <strong>pole opačného směru</strong> — a ta dvě se uvnitř kovu navzájem <strong>vyruší</strong>.</p>\n<p>Uvnitř uzavřeného kovového obalu proto <strong>vnější elektrické pole nic nezmůže</strong>. Tomu se říká <strong>Faradayova klec</strong> a potkáš ji častěji, než by ses nadál(a):</p>\n<ul>\n<li><strong>auto při bouřce</strong> — blesk sjede po plechu karoserie do země a posádky uvnitř se nedotkne. (Pozor: chrání <strong>plech</strong>, ne gumové pneumatiky — ty jsou v tom nevinně, ačkoli se to často říká. A platí to jen se <strong>zavřenými okny</strong> a bez sahání na kovové části; kabriolet nechrání vůbec.)</li>\n<li><strong>letadlo</strong>, do kterého blesk udeří poměrně běžně, a nikdo si toho ani nevšimne</li>\n<li><strong>kovový oplet kabelu</strong> u sluchátek nebo antény — drží rušení venku</li>\n<li><strong>mikrovlnná trouba</strong> — mřížka ve dvířkách nepustí mikrovlny ven, a přitom se skrz ni dá koukat dovnitř</li>\n</ul>\n<p>👉 Klec nemusí být plná deska, stačí <strong>hustá kovová síť</strong>. Její oka ale musí být <strong>mnohem menší než délka vlny</strong> toho, co má zadržet. Přesně proto vypadá mřížka v troubě jako kouzlo: <strong>mikrovlny</strong> jsou dlouhé asi <strong>12 cm</strong>, a tak dírkami neprojdou.</p>\n<p><strong>Světlo</strong> má ale délku vlny statisíckrát menší, a proto proletí bez problémů. Proto dovnitř vidíš, a přesto se u dvířek neohřeješ.</p>",
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
						obsah: "<h2>Vznik elektrického proudu ve vodiči</h2>\n\n<p>Aby přístroj fungoval, musí jím <strong>téct elektrický proud</strong>. K tomu ho zapojíme do <strong>elektrického obvodu se zdrojem napětí</strong>.</p>\n\n<h3>Co je elektrický proud</h3>\n<p><strong>Elektrický proud je uspořádaný pohyb volných nabitých částic.</strong> Protéká vodičem a nesou ho:</p>\n<ul>\n<li><strong>volné elektrony v kovech</strong> — část elektronů se uvolní z atomů a pohybuje se volně</li>\n<li><strong>ionty</strong> v roztocích solí a kyselin, třeba v kyselině sírové v autobaterii</li>\n<li>za zvláštních podmínek i <strong>částice ve vzduchu</strong> — při blesku nebo jiskření</li>\n</ul>\n<p><strong>Iont</strong> je částice, která ztrátou nebo ziskem elektronu získala náboj — kladný, nebo záporný. Proto vede proud i pot a tělní tekutiny, a proto je vodičem i lidské tělo.</p>\n\n<h3>Napětí jako příčina proudu</h3>\n<p><strong>Elektrické napětí</strong> vzniká rozdílem nábojů mezi dvěma body. Záporná svorka zdroje má přebytek elektronů, kladná jejich nedostatek. Napětí je <strong>příčinou</strong> proudu a získáme ho ze <strong>zdroje napětí</strong>.</p>\n\n<h3>Podmínky průchodu proudu</h3>\n<p>Aby vodičem protékal proud, musí platit tyto podmínky:</p>\n<ul>\n<li><strong>elektrické pole</strong> mezi dvěma nabitými tělesy (+ a −) žene nabité částice vodičem — třeba mezi kladnou a zápornou svorkou baterie</li>\n<li>stejně je to při <strong>blesku</strong>: pole vzniká mezi kladně nabitou zemí a záporně nabitými mraky</li>\n<li>mezi konci vodiče proto musí být <strong>elektrické napětí</strong></li>\n<li>proud prochází jen <strong>vodiči</strong> (kovy, roztoky); <strong>izolanty</strong> (dřevo, plast, guma) proud nepropustí, protože v nich nejsou žádné volné částice</li>\n</ul>\n<p>Záporné částice — elektrony a záporné ionty — míří ke <strong>kladné svorce</strong> zdroje. Kladné ionty míří k <strong>záporné svorce</strong>.</p>\n<p>Dohodnutý směr (od + k −) i skutečný pohyb volných elektronů (od − k +) jsou tak oba „správně“ — každý jen v jiném smyslu: dohodnutý směr platí pro výpočty a kreslení obvodů, skutečný pohyb elektronů popisuje, co se ve vodiči doopravdy děje.</p>\n\n<h3>Odkud bereme napětí</h3>\n<p>Napětí do zásuvky posílá <strong>elektrárna</strong> přes rozvodnou elektrickou síť. Přenosné zdroje jsou <strong>akumulátory</strong> — dobíjecí baterie v mobilu, notebooku i autě — a <strong>monočlánky</strong>: tužkové, knoflíkové nebo ploché baterie.</p>\n<p>Elektrickou energii vyrábí <strong>otáčivý pohyb</strong>: turbíny větrné, vodní nebo parní, nebo elektromagnet v <strong>generátoru</strong> poháněném motorem. Turbína je kolo, které roztáčí proudící voda, vítr nebo pára. Generátor je stroj, který otáčivým pohybem vyrábí elektrické napětí. V monočláncích a akumulátorech napětí dodává <strong>chemická reakce</strong>, v solárních panelech <strong>sluneční záření</strong>.</p>\n\n<h3>Dva druhy proudu</h3>\n<ul>\n<li><strong>stejnosměrný (DC)</strong> — teče stále stejným směrem; z baterií a akumulátorů. U některých spotřebičů na směru záleží (LED dioda, elektronika), u jiných ne (žárovka)</li>\n<li><strong>střídavý (AC)</strong> — pravidelně mění směr; z elektráren, máme ho v zásuvce; pohání velké spotřebiče (pračka, fén)</li>\n</ul>\n<p>Spotřebiče, u kterých na směru proudu záleží, na střídavý proud přímo nefungují. Pokud je napájíme ze zásuvky, mají uvnitř obvod, který střídavý proud změní na stejnosměrný.</p>",
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
						obsah: "\n\t\t\t\t\t\t\t<h2>Závislost odporu na vlastnostech vodiče (nad rámec RVP)</h2>\n\t\t\t\t\t\t\t<p>Elektrický odpor vodiče <strong>R</strong> ukazuje, jak moc vodič brání průchodu proudu. Měříme ho v jednotce <strong>ohm</strong> — píšeme řeckým písmenem Ω, čteme „óm\". Násobky jsou kiloohm (kΩ) a megaohm (MΩ).</p>\n\t\t\t\t\t\t\t<p>Čím větší odpor, tím hůř proud vodičem prochází. Odpor závisí na čtyřech věcech: na délce vodiče, na jeho tloušťce, na materiálu a na teplotě.</p>\n\t\t\t\t\t\t\t<h3>Délka a tloušťka vodiče</h3>\n\t\t\t\t\t\t\t<p>Čím je vodič delší, tím větší má odpor. Elektrony totiž na cestě narazí do víc atomů a víc se brzdí. Tloušťka (odborně <strong>průřez</strong>) funguje obráceně: čím je vodič tenčí, tím míň místa mají elektrony k pohybu, a odpor je větší. Tlustý vodič má proto menší odpor než tenký.</p>\n\t\t\t\t\t\t\t<p>Délku vodiče značíme <strong>l</strong> a měříme v metrech (m). Průřez vodiče značíme <strong>S</strong> a měříme v metrech čtverečních (m²). U kulatého drátu ho spočítáme ze vzorce S = π·r², kde r je poloměr drátu.</p>\n\t\t\t\t\t\t\t<h3>Materiál a teplota vodiče</h3>\n\t\t\t\t\t\t\t<p>Odpor závisí i na materiálu, ze kterého je vodič vyrobený. Popisuje ho <strong>měrný odpor</strong> (rezistivita), značka <strong>ρ</strong> (řecké písmeno ró), jednotka Ω·m. Udává, jaký odpor by měl vodič z dané látky dlouhý 1 m s průřezem 1 m². Hodnoty pro různé látky najdeme ve fyzikálních tabulkách.</p>\n\t\t\t\t\t\t\t<p>Hodnoty bývají velmi malé, proto se často udávají v mikroohmmetrech (μΩ·m), což je 0,000 001 Ω·m. Nejmenší měrný odpor mají nejlepší vodiče — stříbro, měď, zlato a hliník.</p>\n\t\t\t\t\t\t\t<p>Odpor kovů roste i s teplotou. Čím je vodič teplejší, tím víc atomy v mřížce kmitají a víc brzdí elektrony, takže odpor je větší.</p>\n\t\t\t\t\t\t\t<h3>Vzorec pro výpočet odporu</h3>\n\t\t\t\t\t\t\t<p>Pro vodič o délce l a průřezu S platí vzorec:</p>\n\t\t\t\t\t\t\t<p style=\"font-size:1.3rem\"><strong>R = ρ · l : S</strong></p>\n\t\t\t\t\t\t\t<p>Všechny veličiny dosazujeme v základních jednotkách — délku v metrech, průřez v metrech čtverečních a měrný odpor v Ω·m.</p>\n\t\t\t\t\t\t\t<p>💡 V praxi je ale průřez drátu jen zlomek milimetru čtverečního a v metrech čtverečních se s ním počítá špatně. Tabulky proto uvádějí měrný odpor i v jednotce Ω·mm²/m. Pak dosazujeme délku v metrech a průřez rovnou v mm² a vyjde stejný výsledek.</p>\n\t\t\t\t\t\t\t<p>V těchto jednotkách má měď ρ = 0,018, hliník 0,028, konstantan 0,50 a nichrom asi 1,1 Ω·mm²/m. Proto se topná spirála z nichromu rozžhaví, kdežto přívodní měděný kabel zůstane studený. (Je to týž údaj jen v jiných jednotkách: 0,018 Ω·mm²/m = 0,000 000 018 Ω·m.)</p>\n\t\t\t\t\t\t\t<h3>Rezistor</h3>\n\t\t\t\t\t\t\t<p>Rezistor je součástka s přesně danou hodnotou odporu. Tvoří ho dlouhý tenký odporový drát z konstantanu, izolovaný a navinutý na keramickém válečku. Velikost jeho odporu určuje materiál i rozměry vodiče.</p>\n\t\t\t\t\t\t\t<p>Hodnotu poznáme podle barevných proužků. Ve schématu ho kreslíme jako obdélník. Rezistor se používá k regulaci proudu v obvodu.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Odporový drát je z konstantanu (ρ = 0,50 Ω·mm²/m), má délku 10 m a průřez 1 mm². Jaký má odpor?</p>\n\t\t\t\t\t\t\t<p>R = ρ · l : S = 0,50 · 10 : 1 = 5 : 1 = 5 Ω</p>\n\t\t\t\t\t\t\t<p>Zkusíme to i obráceně. Topný drát z nichromu (ρ = 1,1 Ω·mm²/m) má průřez 1 mm² a odpor 22 Ω. Jak dlouhý drát potřebujeme?</p>\n\t\t\t\t\t\t\t<p>l = R · S : ρ = 22 · 1 : 1,1 = 22 : 1,1 = 20 m</p>\n\t\t\t\t\t\t",
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
						obsah: "\n\t\t\t\t\t\t\t<h2>Účinky proudu na člověka a bezpečnost</h2>\n\t\t\t\t\t\t\t<p><strong>Lidské tělo je vodič.</strong> Průchod proudu tělem může způsobit popáleniny, křeče svalů, <strong>fibrilaci (rozhození rytmu) až zástavu srdce</strong>, poškození nervů, mozku i paměti.</p>\n\t\t\t\t\t\t\t<p>Poškození může být <strong>přímé</strong> — proud prochází přímo tkáněmi — nebo <strong>nepřímé</strong>, třeba popálenina od hořícího oděvu nebo zlomenina po pádu.</p>\n\t\t\t\t\t\t\t<p>Účinky se navíc dělí na <strong>akutní</strong>, které se projeví hned, a <strong>pozdní</strong>, které se ukážou až za měsíce nebo roky.</p>\n\t\t\t\t\t\t\t<p><strong>Stejnosměrný proud</strong> (třeba z baterie) vyvolá silné křeče svalů v místě, kudy do těla vstupuje i vystupuje. Člověk se pak od zdroje nemůže sám odtrhnout.</p>\n\t\t\t\t\t\t\t<p><strong>Střídavý proud</strong>, jaký teče i domácí zásuvkou, navíc může rozhodit srdeční rytmus — způsobit fibrilaci. Proud může v těle rozkládat i krev a buněčné membrány.</p>\n\t\t\t\t\t\t\t<h3>Míra poškození podle proudu</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>0,5–1 mA (u stejnosměrného proudu asi 2 mA) — práh vnímání, mravenčení</li>\n\t\t\t\t\t\t\t<li>asi 1–5 mA — brnění, mírné stahy svalů, tělu to zatím neškodí</li>\n\t\t\t\t\t\t\t<li>přibližně 5–15 mA (zdroje se liší, záleží i na tom, jak dlouho proud prochází) — křeč, člověk se <strong>nemůže pustit</strong></li>\n\t\t\t\t\t\t\t<li>kolem 25 mA — křeč dýchacích svalů</li>\n\t\t\t\t\t\t\t<li>od zhruba 30 mA (u déle trvajícího průchodu) roste riziko <strong>fibrilace srdce</strong>, jistěji nastává kolem 60 mA; <strong>nad 80 mA</strong> hrozí trvalá zástava srdce a takový úraz bývá smrtelný</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Co velikost proudu ovlivňuje</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>odpor suchého člověka</strong>: velký odpor má jen <strong>suchá kůže a suchá obuv při malém napětí</strong> (~150 000 Ω). Proto z baterie nic necítíš. Suchá obuv odpor proti zemi ještě zvyšuje, zvlášť pokud je z gumy. Tenhle vysoký odpor je ale nejistá ochrana — stačí zpocené ruce, vlhká podlaha, poškozená obuv, nebo prostě vyšší napětí: odpor kůže totiž není stálé číslo, čím víc napětí na ni působí, tím víc klesá. Proto odpor těla dokáže spadnout na jednotky tisíc ohmů, klidně na <strong>~2 000 Ω</strong>, a normy proto s tak vysokým odporem u bezpečnostních výpočtů nepočítají.</li>\n\t\t\t\t\t\t\t<li><strong>odpor vlhkého člověka</strong>: vlhký člověk má nízký odpor hned od začátku. Ani suchý člověk není v bezpečí — do stejně nízkého odporu se dostane při sebemenší nehodě (zpocení, vlhko, poškozená izolace). Vodivější jsi ostatně i po pouhém zpocení.</li>\n\t\t\t\t\t\t\t<li><strong>cesta proudu</strong>: nejnebezpečnější přes ruku do srdce nebo přes hlavu</li>\n\t\t\t\t\t\t\t<li>bezpečné napětí <strong>ve vlhkých a zvlášť nebezpečných prostorách</strong> (koupelna, bazén, sklep): stejnosměrné <strong>25 V</strong>, střídavé <strong>12 V</strong>. V suchých místnostech jsou meze vyšší (střídavé 50 V, stejnosměrné 120 V). Číslo 50 V není náhodné: norma počítá s odporem těla i obuvi asi <strong>1 750 Ω</strong> a s tím, že tělem nemá projít víc než <strong>30 mA</strong> — 1 750 Ω × 30 mA vyjde zhruba 50 V. Zásuvkových <strong>230 V</strong> se to ale netýká nikde, ta jsou nebezpečná vždy.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>Jistič vás nezachrání — proudový chránič ano</h3>\n\t\t\t\t\t\t\t<p>Ty dvě věci se pletou, a je v tom podstatný rozdíl:</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Jistič</strong> hlídá, aby obvodem netekl <strong>příliš velký</strong> proud\n\t\t\t\t\t\t\t(typicky nad 16 A) — chrání <strong>vedení a dům před požárem</strong>. Proud\n\t\t\t\t\t\t\t115 mA, který podle výpočtu níže zabíjí, je pro jistič naprosto nezajímavý; ani se nehne.</li>\n\t\t\t\t\t\t\t<li><strong>Proudový chránič</strong> porovnává, kolik proudu do spotřebiče\n\t\t\t\t\t\t\t<strong>přiteče</strong> a kolik se ho <strong>vrátí</strong>. Když se část ztrácí — třeba\n\t\t\t\t\t\t\t<strong>tělem člověka do země</strong> — okamžitě vypne. Reaguje už na\n\t\t\t\t\t\t\t<strong>30 mA</strong> a stihne to za setiny sekundy — rychleji, než by proud\n\t\t\t\t\t\t\tv tomhle pásmu stihl srdci vážně uškodit.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>Proto je proudový chránič dnes povinný u zásuvek v koupelnách a venku.\n\t\t\t\t\t\t\t<strong>Pozor — chránič není důvod si dovolit víc.</strong> Zásuvka v koupelně je\n\t\t\t\t\t\t\tpřípustná jen mimo prostor vany a sprchy, a spotřebič se u vody nikdy\n\t\t\t\t\t\t\tnepoužívá. Chránič je poslední záchrana, když se něco pokazí, ne povolení riskovat.</p>\n\t\t\t\t\t\t\t<h3>Rizika mimo domácí zásuvku</h3>\n\t\t\t\t\t\t\t<p>Bezpečnost s elektřinou nekončí u zásuvky doma — pár pravidel platí i venku a při mimořádných situacích.</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Hoří zapojený spotřebič?</strong> Nejdřív <strong>vypni proud</strong> —\n\t\t\t\t\t\t\tvytáhni zástrčku ze zásuvky, nebo vypni jistič. Teprve pak has. <strong>Vodou se zapojený\n\t\t\t\t\t\t\tspotřebič nikdy nehasí</strong> — voda vede proud a proud by tekl vodním proudem\n\t\t\t\t\t\t\taž k tobě.</li>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Trafostanice, sloupy a vedení vysokého napětí:</strong> nikdy\n\t\t\t\t\t\t\tnepodlézej ani nepřelézej oplocení a nelez na stožár. U vysokého napětí může\n\t\t\t\t\t\t\tproud <strong>přeskočit obloukem i bez dotyku</strong> — stačí se přiblížit,\n\t\t\t\t\t\t\tsáhnout na vedení vůbec nemusíš. Stejným způsobem vzniká i blesk při bouřce.</li>\n\t\t\t\t\t\t\t<li>⚠️ <strong>Spadlý drát na zemi</strong> (i u trolejového vedení vlaků) se\n\t\t\t\t\t\t\tchová stejně. Může být pod napětím, i když nejiskří a nic neukazuje. Nepřibližuj\n\t\t\t\t\t\t\tse k němu, varuj ostatní a volej <strong>112</strong> (případně <strong>150</strong> hasiče). <strong>155</strong> volej navíc jen tehdy, je-li někdo zraněný.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>👉 U vysokého napětí neplatí „nic jsem se nedotkl, tak je to bezpečné\" — rozhoduje\n\t\t\t\t\t\t\tvzdálenost, ne dotyk.</p>\n\t\t\t\t\t\t\t<h3>Bezpečná pravidla</h3>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>nesahat na vypínač/kabely <strong>mokrou rukou</strong>, žádné spotřebiče ve vaně a sprše</li>\n\t\t\t\t\t\t\t<li>před výměnou žárovky <strong>vypnout jistič</strong>; do zásuvky nestrkat drobné předměty</li>\n\t\t\t\t\t\t\t<li>nedotýkat se jednou rukou elektrického kabelu a druhou rukou kovového předmětu</li>\n\t\t\t\t\t\t\t<li>spotřebič připojovat do zásuvky, až když je <strong>vypnutý</strong></li>\n\t\t\t\t\t\t\t<li>nedotýkat se poškozených kabelů ani spadlých drátů vedení</li>\n\t\t\t\t\t\t\t<li>neotvírat a neopravovat spotřebič, dokud <strong>není vytažený ze zásuvky</strong></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<h3>První pomoc při úrazu proudem</h3>\n\t\t\t\t\t\t\t<p><strong>Na pořadí opravdu záleží</strong> — dělej to přesně takhle:</p>\n\t\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t\t<li><strong>Vypni proud</strong> (vypínač, jistič, pojistky). Dokud proud teče,\n\t\t\t\t\t\t\tnesahej na zraněného — tekl by i tebou.</li>\n\t\t\t\t\t\t\t<li><strong>Mysli na vlastní bezpečnost.</strong> ⚠️ Jde-li o <strong>vysoké napětí</strong>\n\t\t\t\t\t\t\t(sloup, trafostanice, spadlý drát, trolejové vedení), <strong>nepřibližuj se a nic\n\t\t\t\t\t\t\tneodsouvej</strong>. Proud tam přeskočí obloukem i bez dotyku. Zůstaň v bezpečné\n\t\t\t\t\t\t\tvzdálenosti a volej <strong>155 nebo 112</strong>. Jde-li o běžnou domácí elektřinu\n\t\t\t\t\t\t\t(zásuvka, spotřebič) a proud vypnout nejde, odsuň zraněného <strong>suchou dřevěnou\n\t\t\t\t\t\t\tnebo plastovou tyčí</strong>. Případně použij suchou gumovou obuv a gumové rukavice,\n\t\t\t\t\t\t\tnikdy se ho nedotýkej holou rukou. Zraněný, kterému nemá kdo pomoct, protože ležíš vedle něj, je na tom hůř.</li>\n\t\t\t\t\t\t\t<li><strong>Zavolej 155</strong> — hned, ještě než začneš pomáhat. Zapni si\n\t\t\t\t\t\t\t<strong>hlasitý odposlech</strong>, nebo pošli volat někoho jiného. Operátor tě\n\t\t\t\t\t\t\tpovede a řekne ti, co dělat.</li>\n\t\t\t\t\t\t\t<li><strong>Uvolni oděv a zkontroluj dech i tep.</strong> Nedýchá normálně?\n\t\t\t\t\t\t\t<strong>Stlačuj hrudník</strong> — uprostřed hrudi, do hloubky asi 5 cm,\n\t\t\t\t\t\t\trychlostí zhruba 100× za minutu. Pokud umíš, přidávej i umělé dýchání.\n\t\t\t\t\t\t\tNepřestávej, dokud nepřijede pomoc.</li>\n\t\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t\t<p>👉 Zraněného <strong>vždy předej záchranářům</strong>, i když se probral a tvrdí,\n\t\t\t\t\t\t\tže je mu dobře. Proud může poškodit srdce tak, že se to projeví až za několik hodin.</p>\n\t\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t\t<p>Proč z ploché baterie nic necítíš, a přitom zásuvka zabíjí? Stačí\n\t\t\t\t\t\t\t<strong>Ohmův zákon</strong> <strong>I</strong> = <strong>U</strong> : <strong>R</strong>:</p>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><strong>Plochá baterie 4,5 V</strong> na suchou kůži (R ≈ 150 000 Ω):\n\t\t\t\t\t\t\t<strong>I</strong> = 4,5 : 150 000 = 0,00003 A = <strong>30 µA</strong> → ani to nepoznáš,\n\t\t\t\t\t\t\tjsi hluboko pod prahem vnímání.</li>\n\t\t\t\t\t\t\t<li><strong>Zásuvka 230 V</strong>: tady je zrada. Suchá kůže sice může mít velký odpor,\n\t\t\t\t\t\t\tale spolehnout se na něj nejde — normy proto pro bezpečnostní výpočty u vyššího\n\t\t\t\t\t\t\tnapětí počítají s mnohem nižším, opatrným odporem těla, asi <strong>2 000 Ω</strong>\n\t\t\t\t\t\t\t(blízko hodnotě, se kterou norma počítá pro tělo s obuví, asi 1 750 Ω). Vyjde\n\t\t\t\t\t\t\t<strong>I</strong> = 230 : 2 000 = <strong>115 mA</strong>.</li>\n\t\t\t\t\t\t\t<li><strong>Mokrý člověk</strong> (R ≈ 2 000 Ω): stejně nízký odpor má vlhká kůže\n\t\t\t\t\t\t\thned od malého napětí. Vyjde proto opět <strong>I</strong> = 230 : 2 000 = <strong>115 mA</strong>.\n\t\t\t\t\t\t\tNebezpečné je to tak jako tak — pro suchého i pro mokrého člověka nakonec vyjde stejné nebezpečné číslo.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<p>⚠️ Podívej se do tabulky výš: <strong>obě poslední čísla jsou hluboko nad 80 mA</strong>,\n\t\t\t\t\t\t\ttedy v pásmu zástavy srdce. <strong>Zásuvka je životu nebezpečná vždycky, i když jsi\n\t\t\t\t\t\t\túplně suchý.</strong> Nad bezpečnou hranicí napětí totiž vysoký odpor suché kůže\n\t\t\t\t\t\t\tspolehlivě nechrání — stačí málo a odpor spadne stejně nízko jako u vlhké kůže.\n\t\t\t\t\t\t\tVlhký člověk je ohrožen stejně, jen k tomu nepotřebuje žádné vysoké napětí —\n\t\t\t\t\t\t\tnízký odpor má hned od začátku.</p>\n\t\t\t\t\t\t\t<p>👉 A právě proto <strong>není bezpečné napětí totéž co malé napětí</strong>: rozhoduje,\n\t\t\t\t\t\t\tjestli se dá spolehnout na vysoký odpor kůže — a nad bezpečnou hranicí (50 V)\n\t\t\t\t\t\t\tto normy nedovolují. Do koupelny proto nepatří žádný spotřebič ze zásuvky\n\t\t\t\t\t\t\tani prodlužovačka a na vypínač se nesahá mokrou rukou.</p>\n\t\t\t\t\t\t",
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
					odkazy: [{"nazev":"Techmania: Kmitání","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/kmitani"},{"nazev":"Techmania: Vlnění","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vlneni"},{"nazev":"Wikipedie: Vlnová délka","url":"https://cs.wikipedia.org/wiki/Vlnov%C3%A1_d%C3%A9lka"},{"nazev":"Umíme to: Vlnění, pojmy (8. třída)","url":"https://www.umimefakta.cz/fyzika/cviceni-vlneni-pojmy-8-trida"}],
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
					odkazy: [{"nazev":"Techmania: Vznik a druhy zvuku","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vznik-druhy-zvuku"},{"nazev":"Techmania: Šíření zvuku","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/sireni-zvuku"},{"nazev":"Techmania: Ozvěna a dozvuk","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/ozvena-dozvuk"},{"nazev":"Techmania: Výška zvuku","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vyska-zvuku"}],
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
					odkazy: [{"nazev":"NZIP: Ucho, sluch a rovnováha","url":"https://www.nzip.cz/clanek/1507-ucho-sluch-rovnovaha"},{"nazev":"Techmania: Intenzita zvuku","url":"https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/intenzita-zvuku"},{"nazev":"NZIP: Ochrana zdraví před hlukem","url":"https://www.nzip.cz/clanek/1046-ochrana-zdravi-pred-hlukem"},{"nazev":"NZIP: Zdravotní účinky hluku","url":"https://www.nzip.cz/clanek/1045-zdravotni-ucinky-hluku"}],
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
						<h3>3. <a href="../../teplo-a-zmeny-skupenstvi/">Teplo a změny skupenství</a></h3>
						<ul><li>tání a tuhnutí; vypařování a var; kondenzace; skupenské změny vody v přírodě</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>práce W = F · s (J), výkon P = W : t (W)</li>
							<li>1 kWh = 3,6 MJ</li>
							<li>polohová energie Eₚ = m · g · h (J)</li>
							<li>teplo Q = m · c · (t₂ − t₁) (J)</li>
							<li>skupenské teplo tání Lₜ = lₜ · m (J)</li>
						</ul>
					`,
					zapis: {
						body: [
							'Mechanická práce vzniká působením síly po určité dráze a výkon udává, jak rychle se práce vykoná.',
							'Pokud nepůsobí tření, přeměňuje se polohová energie na pohybovou a jejich součet zůstává stejný.',
							'Vnitřní energie tělesa se mění tepelnou výměnou a teplo může způsobit změnu skupenství.',
							'Šíření tepla vedením, prouděním a sáláním vysvětluje, jak se teplo předává mezi tělesy.',
						],
						zakon: 'Zákon zachování mechanické energie: pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stále stejný.',
						vzorec: 'W = F · s      (odvozeně: F = W : s,  s = W : F);  P = W : t      (odvozeně: W = P · t,  t = W : P);  Eₚ = m · g · h;  Q = m · c · (t₂ − t₁);  Lₜ = lₜ · m',
						jednotky: [
							'práce W — joule (J)',
							'síla F — newton (N)',
							'dráha s — metr (m)',
							'výkon P — watt (W)',
							'čas t — sekunda (s)',
							'1 kWh = 3,6 MJ',
							'Do vzorců dosazuj v základních jednotkách: práci v J, sílu v N, dráhu v m a čas v s.',
							'měrná tepelná kapacita c — J/(kg·°C)',
							'měrné skupenské teplo tání lₜ — J/kg',
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
						<ul><li>elektrický náboj a pole; vznik proudu a zdroje napětí; elektrické obvody</li><li>měření proudu (A) a napětí (V); odpor a Ohmův zákon</li><li>sériové a paralelní zapojení; reostat; práce a výkon proudu; bezpečnost</li></ul>
						<h3>6. <a href="../../zvuk/">Zvuk</a></h3>
						<ul><li>kmitání a vlnění; vznik a šíření zvuku; vnímání zvuku a hlasitost (decibely)</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>W = F · s, P = W : t, 1 kWh = 3,6 MJ</li>
							<li>Ohmův zákon: I = U : R</li>
							<li>teplo Q = m · c · (t₂ − t₁) (J)</li>
							<li>elektrický výkon P = U · I (W), elektrická práce W = U · I · t</li>
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
					obsah: "<h2>Magnety a magnetické pole (opakování)</h2>\n\n<p>Magnet působí silou na některé předměty i bez dotyku. V tomto opakování si připomeneme, které látky magnet přitahuje, jaké má magnet póly a jak popisujeme jeho magnetické pole.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-01.jpg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-01.jpg\" alt=\"Ruka drží tyčový magnet, na jeho konci visí kancelářské sponky\" /></a><figcaption>Magnet přitahuje kancelářské sponky.</figcaption></figure>\n\n<h3>Které látky magnet přitahuje</h3>\n<ul>\n<li><strong>Feromagnetické látky</strong> na magnetické pole silně reagují. Silně se přitahují k magnetu a dají se <strong>zmagnetovat</strong> — když na ně působí velmi silné magnetické pole, samy se začnou chovat jako magnety. Patří sem železo, ocel (slitina železa), kobalt a nikl.</li>\n<li><strong>Nemagnetické látky</strong> na magnetické pole téměř nereagují. Z nekovů je to dřevo, papír, korek, plastelína, z kovů hliník, nerezová ocel, měď, zinek a stříbro.</li>\n<li>💡 Pro zajímavost: existují i <strong>diamagnetické látky</strong>, které magnet nepatrně odpuzuje — třeba uhlík, měď nebo zlato. Tuha z tužky může levitovat (vznášet se) nad silnými magnety.</li>\n</ul>\n\n<h3>Magnet a jeho póly</h3>\n<p>Každý magnet má dva <strong>magnetické póly</strong>: <strong>severní (N — north)</strong>, který se nejčastěji značí červeně, a <strong>jižní (S — south)</strong>. Jmenují se podle světové strany, na kterou ukazují (střelka kompasu). Na pólech je magnetická síla nejsilnější. Mezi póly je <strong>netečné pásmo</strong>, kde je síla nejslabší a které nepřitahuje žádná tělesa, ani magnety.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-04.svg\" alt=\"Tyčový magnet s pólem S vlevo, pólem N vpravo a netečným pásmem uprostřed; u pólů visí nejvíc hřebíků\" /></a><figcaption>Na pólech je magnetická síla nejsilnější, v netečném pásmu uprostřed nejslabší.</figcaption></figure>\n<p>Když magnet rozdělíš na části, každá část bude mít znovu oba póly — severní i jižní.</p>\n\n<h3>Přitahování a odpuzování</h3>\n<p>Magnetická síla může být přitažlivá i odpudivá. <strong>Stejné póly se odpuzují</strong> (severní odpuzuje severní), <strong>opačné póly se přitahují</strong> (severní přitahuje jižní). S rostoucí vzdáleností se magnetická síla zmenšuje.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-05.svg\" alt=\"Dvojice magnetů: opačné póly se přitahují, stejné póly se odpuzují\" /></a><figcaption>Stejné póly se odpuzují, opačné póly se přitahují.</figcaption></figure>\n\n<h3>Magnetické pole a indukční čáry</h3>\n<p>Kolem magnetů vzniká <strong>magnetické pole</strong>. Projevuje se silovým působením na jiné magnety a na tělesa z feromagnetických látek. Na tělesa z nemagnetických látek magnetická síla nepůsobí. Existenci pole zjistíme <strong>magnetkou</strong> — samostatnou nebo jako střelkou kompasu.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-06.svg\" alt=\"Kompas se střelkou: červený severní konec ukazuje k severu\" /></a><figcaption>Střelka kompasu je magnetka; její severní pól (červený) ukazuje k severu.</figcaption></figure>\n<p>Magnetické pole umíme zviditelnit. Malé magnetky se kolem magnetu různě nasměrují. Nebo na karton či folii, položenou na magnetu, nasypeme železné piliny. Piliny se zmagnetují a uspořádají do <strong>pilinového obrazce</strong>, který ukazuje, jakým směrem magnetická síla v okolí magnetu působí. U dostatečně silného magnetu vznikne obrazec i v prostoru. Na papíře je vidět oba póly i netečné pásmo tyčového magnetu.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-07.svg\" alt=\"Pilinový obrazec tyčového magnetu na papíře, popisky pól S, netečné pásmo a pól N\" /></a><figcaption>Piliny se zmagnetují a ukážou tvar pole; vidět jsou oba póly i netečné pásmo.</figcaption></figure>\n<p>Pole kreslíme pomocí <strong>magnetických indukčních čar</strong>. Mají stejný směr jako piliny v obrazci. Ukazují, jakým směrem působí magnetická síla v daném místě; směr udává severní pól magnetky. Jsou to uzavřené křivky, které vně magnetu vedou od severního pólu (N) k jižnímu (S), a můžeme si je představit v celém prostoru kolem magnetu. Nejsilnější je pole kolem pólů.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-09.svg\" alt=\"Tři panely téhož magnetu: piliny, indukční čáry a magnetky\" /></a><figcaption>Piliny, indukční čáry i magnetky ukazují stejný směr pole.</figcaption></figure>\n<p>Indukční čáry mají u různých typů magnetů (tyčový, kulový, podkova, plochý) jiný tvar. Vždy ale vně magnetu vedou od severního pólu (N) k jižnímu (S).</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-11.svg\" alt=\"Indukční čáry kulového, podkovového a plochého magnetu\" /></a><figcaption>Tvar indukčních čar je u různých magnetů jiný, vně magnetu vždy vedou od N k S.</figcaption></figure>\n<p>U dvou magnetů natočených <strong>opačnými póly k sobě</strong> je pole nejsilnější mezi nimi a magnety se přitahují. U magnetů natočených <strong>stejnými póly k sobě</strong> je pole mezi nimi nejslabší a magnety se odpuzují.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-13.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-13.svg\" alt=\"Dva magnety: opačné póly k sobě se přitahují, stejné póly k sobě se odpuzují; indukční čáry\" /></a><figcaption>Opačné póly k sobě: pole mezi magnety je nejsilnější. Stejné póly k sobě: nejslabší.</figcaption></figure>\n\n<h3>Jaké jsou magnety</h3>\n<p><strong>Přírodní magnety</strong> jsou nerosty s obsahem železa, například magnetit (magnetovec). <strong>Umělé permanentní magnety</strong> vznikají silnou magnetizací feromagnetického tělesa, třeba feritový nebo neodymový magnet. Magnety mají různé tvary: tyčový, podkova nebo magnetka (střelka kompasu).</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-03.svg\" alt=\"Tvary magnetů: podkova, tyčový magnet, magnetka a feritové nebo neodymové magnety\" /></a><figcaption>Magnety mají různé tvary: podkova, tyčový magnet, magnetka (střelka kompasu).</figcaption></figure>\n\n<h3>K čemu se magnety využívají</h3>\n<ul>\n<li>rychlé <strong>připevnění</strong> — nástěnka, autoanténa, magnet na svítilně, držák dvířek</li>\n<li><strong>kompas, buzola</strong></li>\n<li><strong>reproduktory</strong></li>\n<li>magnetické stavebnice</li>\n<li><strong>pevný disk počítače</strong> (harddisk)</li>\n<li>páska videokazety, audiokazety</li>\n<li>menší <strong>elektromotor</strong> (stěrače, autíčka)</li>\n<li><strong>sběrač kovových štěpin</strong> v motoru či topení</li>\n</ul>\n\n<h3>Magnetické pole Země</h3>\n<p>Země se chová jako obrovský <strong>tyčový magnet</strong>. Střelka kompasu ukazuje svým severním magnetickým pólem k severu, proto na severním zeměpisném pólu Země leží <strong>jižní magnetický pól</strong>. Magnetické póly neleží přesně na zeměpisných pólech, jen poblíž.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-14.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-14.svg\" alt=\"Země jako tyčový magnet s indukčními čarami, střelka kompasu a zeměpisná osa\" /></a><figcaption>Země se chová jako obří magnet; na severním zeměpisném pólu leží jižní magnetický pól.</figcaption></figure>\n<p>Magnetické pole Země nás chrání před <strong>slunečním větrem</strong> a kosmickým zářením — proudy nebezpečných nabitých částic. Pole je odkloní, takže Zemi ve velké míře obejdou.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-15.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-obr-15.svg\" alt=\"Magnetické pole Země odklání sluneční vítr\" /></a><figcaption>Magnetické pole Země odklání sluneční vítr; obrázek není v měřítku.</figcaption></figure>\n<p>💡 Pro zajímavost: magnetické pole Země vzniká díky rotaci tekutého železného jádra. Magnetické póly se proto pomalu, ale neustále pohybují a mění svou polohu. Nabité částice, které se neodkloní, se pohybují po indukčních čarách a hromadí se u pólů. Srážkami se vzduchem tam vzniká <strong>polární záře</strong>.</p>",
					uvod: "Určitě znáš magnet na lednici. Magnet umí přitáhnout třeba hřebík nebo sponku a nemusí se jich ani dotknout. Kolem magnetu je totiž neviditelné místo, kde jeho síla působí. Tomu místu říkáme magnetické pole.",
					zapis: {"jednotky":["Žádná veličina ani jednotka."],"zakon":"Magnet má vždy dva póly: severní N a jižní S. Stejné póly se odpuzují, opačné přitahují.","body":["magnet přitahuje železo, ocel, kobalt, nikl (jdou zmagnetovat), ne dřevo","nejsilnější na pólech, uprostřed netečné pásmo; se vzdáleností slábne","pole zjistíme magnetkou; indukční čáry vedou od N k S","Země = velký magnet; u severního zeměpisného pólu je jižní magnetický pól","pole Země chrání před slunečním větrem","využití: kompas, reproduktor"]},
					materialy: [{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"infografika","nazev":"Infografika: Magnety a magnetické pole","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/infografika-magnety-prehled.png"},{"druh":"video","nazev":"Jak poznáme neviditelné magnetické pole — 2. díl","cesta":"/media/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-dialog2.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."},{"druh":"video","nazev":"Země, kompas a polární záře — 3. díl","cesta":"/media/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/magnety-opakovani-dialog3.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
					odkazy: [{"nazev":"Magnetismus — kvíz (Wordwall)","url":"https://wordwall.net/cs/resource/27704217/magnetismus-2"},{"nazev":"Simulace: Magnet a kompas (PhET, česky)","url":"https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_all.html?locale=cs"},{"nazev":"Fyzikální liga: Magnetické pole","url":"/hry/liga-karty/?rocnik=9&celek=magneticke-pole"}],
				},
				{
					materialy: [{"druh":"infografika","nazev":"Infografika: Magnetické pole vodiče a cívky","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/infografika-vodic-civka-prehled.png"},{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"audio","nazev":"Polemika: Proč se u vodiče otočí magnetka 🎧","cesta":"/media/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/vodic-civka-dialog1-omnivoice.mp3","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice)."},{"druh":"video","nazev":"Proč se u vodiče otočí magnetka — 1. díl","cesta":"/media/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/vodic-civka-dialog1.mp4","ai":"Hlasy Evy a Marka vytvořila umělá inteligence (OmniVoice). Fyzikální schémata a animace kreslí program."}],
					slug: 'magneticke-pole-vodice-a-civky',
					nazev: 'Magnetické pole vodiče a cívky s proudem',
					interakce: 'oersted',
					obsah: "<h2>Magnetické pole vodiče a cívky s proudem</h2>\n\n<p>V roce 1820 si dánský fyzik <strong>Hans Christian Oersted</strong> všiml souvislosti mezi magnetismem a elektrickým proudem. Natáhl vodič blízko magnetky. Když vodičem začal protékat elektrický proud, magnetka se vychýlila. Proto v okolí vodiče s proudem vzniká <strong>magnetické pole</strong>. Magnetické účinky vodičů s proudem pak podrobněji zkoumal francouzský fyzik <strong>André Marie Ampère</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-01.svg\" alt=\"Dva panely pohledu shora: magnetka u vodiče bez proudu míří k severu, s proudem se odchýlí, vzdálená magnetka se nezmění\" /></a><figcaption>Oerstedův pokus: proud vychýlí magnetku.</figcaption></figure>\n\n<h3>Magnetické pole přímého vodiče</h3>\n<p>Pole můžeme zviditelnit. Skrz karton kolmo vedeme vodič, na karton nasypeme kovové piliny a vodičem necháme procházet proud. Piliny se uspořádají do <strong>soustředných kružnic</strong> — vznikne pilinový obrazec pole. Kolem každého vodiče s proudem vzniká magnetické pole a jeho příčinou je <strong>pohyb nabitých elektronů</strong>. Magnetické indukční čáry mají tvar soustředných kružnic se středem ve vodiči, a to po celé jeho délce.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-02.svg\" alt=\"Kovové piliny kolem vodiče tvoří soustředné kružnice\" /></a><figcaption>Piliny kolem vodiče s proudem tvoří soustředné kružnice.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-03.svg\" alt=\"Svislý vodič s proudem a tři červené uzavřené indukční čáry kolem něj\" /></a><figcaption>Indukční čáry kolem vodiče s proudem jsou kružnice.</figcaption></figure>\n<p>Směr indukčních čar určíme <strong>pravidlem pravé ruky</strong>: uchop vodič pravou rukou tak, aby palec mířil po směru proudu (od + k −). Zahnuté prsty ukazují směr indukčních čar kolem vodiče.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-04.svg\" alt=\"Pravidlo pravé ruky u vodiče: palec ukazuje směr proudu nahoru, prsty směr indukčních čar\" /></a><figcaption>Pravidlo pravé ruky pro přímý vodič.</figcaption></figure>\n\n<h3>Síla na vodič a elektromotory</h3>\n<p>Magnetické pole působí silou na vodič s proudem. Tato síla je tím větší, čím je větší proud a čím je silnější magnetické pole. Dva rovnoběžné vodiče, kterými protéká proud, na sebe také působí silou podobně jako dvojice magnetů. Když proud protéká oběma vodiči <strong>stejným směrem</strong>, vodiče se <strong>přitahují</strong>. Když je směr proudu <strong>opačný</strong>, vodiče se <strong>odpuzují</strong>. Silové působení magnetu na vodič s proudem se využívá v <strong>elektromotorech</strong>.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-05.svg\" alt=\"Dva rovnoběžné vodiče v průřezu: při opačném proudu se odpuzují, při souhlasném přitahují, s indukčními čarami\" /></a><figcaption>Rovnoběžné vodiče s proudem se přitahují nebo odpuzují.</figcaption></figure>\n\n<h3>Cívka</h3>\n<p>Silnější magnetické účinky získáme, když dlouhý vodič navineme do <strong>cívky</strong>. Cívka je součástka z dlouhého izolovaného drátu (používá se měděný drát pokrytý průhlednou lakovou izolací), který je navinutý na válci z izolačního materiálu, například z plastu. Do dutiny cívky můžeme vložit <strong>železné jádro</strong>, čímž magnetické účinky cívky s proudem zesílíme.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-06.svg\" alt=\"Schéma válcové cívky na jádru a toroidní cívky se začátkem a koncem drátu\" /></a><figcaption>Válcová cívka a toroid.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-07.svg\" alt=\"Schematická značka cívky a cívky s jádrem\" /></a><figcaption>Značka cívky a cívky s jádrem.</figcaption></figure>\n\n<h3>Magnetické pole cívky s proudem</h3>\n<p>Magnetické pole je v celém prostoru okolo cívky. <strong>Nejsilnější je uvnitř cívky</strong>, v jejím okolí je slabší. Cívka s proudem se chová jako <strong>tyčový magnet</strong>. Její magnetické póly závisí na směru proudu v cívce — když třeba prohodíš dráty na zdroji, póly se přehodí. Póly určujeme <strong>Ampérovým pravidlem pravé ruky</strong>: prsty ukazují dohodnutý směr proudu, který prochází závity cívky (od + k −), a palec ukazuje <strong>severní magnetický pól</strong> cívky. Zároveň ukazuje směr indukčních čar, které z cívky vycházejí.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-08.svg\" alt=\"Piliny kolem cívky s 8 závity v řezu, severní pól vpravo a jižní vlevo, se směrem proudu v závitech\" /></a><figcaption>Pole cívky s proudem se podobá poli tyčového magnetu.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/magneticke-pole-vodice-a-civky/magneticke-pole-vodice-a-civky-obr-09.svg\" alt=\"Pravidlo pravé ruky pro cívku: prsty ukazují směr proudu, palec severní pól nahoře, indukční čáry a zdroj s plus a mínus\" /></a><figcaption>Ampérovo pravidlo pravé ruky pro cívku.</figcaption></figure>\n<p>Využití magnetického pole cívky s proudem je <strong>elektromagnet</strong>. Podrobněji se mu věnuje samostatné téma Elektromagnet.</p>\n\n<h3>Shrnutí</h3>\n<p>Kolem vodiče s proudem je magnetické pole; u přímého vodiče má indukční čáry ve tvaru kružnic, jejichž směr určíme pravidlem pravé ruky. Na vodič s proudem v magnetickém poli působí síla (elektromotor). Cívka s proudem se chová jako tyčový magnet a její póly závisí na směru proudu.</p>\n",
					uvod: "Kolem drátu, kterým teče elektřina z baterie, je neviditelné magnetické pole. Když drát vedeme nad kompas a zapneme proud, střelka kompasu se vychýlí, stejně jako u magnetu. Když drát namotáme do spirály jako pružinku, pole je mnohem silnější. Taková spirála se pak chová jako magnet.",
					zvidave: "<p>💡 Pro zajímavost (nadstavba): Čím víc má cívka závitů, tím je její magnetické pole silnější — každý další závit k poli přidá.</p>\n<p>💡 Proč se používá zrovna pravá ruka? Fyzikové se dohodli, že proud teče od plusu k mínusu. Kdybys použil levou ruku, vyšlo by ti všechno obráceně.</p>\n<p>💡 Cívka je magnet, který se dá vypnout — stačí vypnout proud. Cívka také rozkmitá membránu v reproduktoru a sluchátkách, a tak vzniká zvuk.</p>",
					zapis: {"jednotky":["elektrický proud: značka I, jednotka A (ampér)"],"zakon":"Pravidlo pravé ruky: u vodiče palec = směr proudu, prsty = indukční čáry; u cívky prsty = směr proudu, palec = severní pól.","body":["Oersted 1820: proud vytváří magnetické pole","pole přímého vodiče: soustředné kružnice","proud stejným směrem: vodiče se přitahují, opačným odpuzují","cívka s proudem = tyčový magnet, pole nejsilnější uvnitř","póly cívky závisí na směru proudu","železné jádro zesílí pole → elektromagnet"]},
					odkazy: [{"nazev":"Test: Cívka a magnetické pole (Wordwall)","url":"https://wordwall.net/cs/resource/113962641/test-c%C3%ADvka-a-magnetick%C3%A9-pole"},{"nazev":"Fyzikální liga: Magnetické pole","url":"/hry/liga-karty/?rocnik=9&celek=magneticke-pole"}],
				},
				{
					materialy: [{"druh":"video","nazev":"Píseň: Ze severu na jih 🎵","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/magnety-magneticke-pole-opakovani/pisen-ze-severu-na-jih.m4a"},{"druh":"infografika","nazev":"Infografika: Elektromagnet a jeho využití","cesta":"/materialy/fyzika/9-rocnik/magneticke-pole/elektromagnet/infografika-elektromagnet-prehled.png"}],
					slug: 'elektromagnet',
					interakce: 'elektromagnet',
					nazev: 'Elektromagnet a jeho využití',
					obsah: "<h2>Elektromagnet a jeho využití</h2>\n\n<p>Elektromagnet je součástka, která využívá magnetické vlastnosti <strong>cívky</strong>. Cívku už znáš: je to vodič navinutý do mnoha závitů. Do cívky se vloží <strong>jádro</strong> z <strong>magneticky měkké oceli</strong> — a je z ní elektromagnet.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-01.svg\" alt=\"Baterie, drát a hřebík s vinutím: elektromagnet se sponkami na obou koncích, severní pól vlevo a jižní vpravo\" /></a><figcaption>Jednoduchý elektromagnet z hřebíku, drátu a baterie.</figcaption></figure>\n\n<h3>Jak elektromagnet funguje</h3>\n<p>Magneticky měkká ocel se při zapnutí proudu <strong>velmi rychle zmagnetuje</strong>. Po vypnutí proudu její magnetické pole <strong>velmi rychle zanikne</strong>. Magnetické pole elektromagnetu je stejné jako pole tyčového magnetu.</p>\n\n<h3>Jak elektromagnet zesílit</h3>\n<p>Nejsilnější pole má cívka s největším počtem závitů. Může jich mít i několik tisíc. Čím <strong>více závitů</strong>, tím silnější magnetické pole. Sílu pole ovlivníme také velikostí proudu: čím <strong>větší proud</strong> cívkou teče, tím je pole silnější.</p>\n\n<h3>Co umí elektromagnet navíc oproti obyčejnému magnetu</h3>\n<ul>\n<li>Jde ho <strong>zapnout a vypnout</strong> — stačí zapnout nebo vypnout elektrický proud.</li>\n<li>Jde mu <strong>prohodit póly</strong> — severní a jižní pól si vymění místa, když obrátíme póly zdroje.</li>\n<li>Jeho pole bývá <strong>mnohonásobně silnější</strong> než u obyčejných (permanentních) magnetů.</li>\n</ul>\n\n<h3>Kde se elektromagnet využívá</h3>\n<ul>\n<li><strong>Jeřáb</strong> na nakládání železného šrotu — magnet se zapne, přitáhne kov, a po přenesení se zase vypne.</li>\n<li><strong>Elektromotor</strong>.</li>\n<li><strong>Jistič</strong> — přeruší elektrický obvod, třeba doma při přetížení nebo při zkratu (kdy se vodiče spojí bez spotřebiče). Přetížení vznikne například tehdy, když zapneme příliš mnoho spotřebičů najednou. Obvodem pak teče příliš velký proud, elektromagnet vytvoří silné pole a přitáhne <strong>kotvu</strong> jističe (pohyblivou kovovou část). Tím se obvod rozpojí a změní se poloha ručky jističe. Výhoda proti tavné pojistce: jistič můžeme ručně zase zapnout.</li>\n<li><strong>Zvonek</strong> — viz níže.</li>\n<li><strong>Automatické systémy</strong> — používají <strong>relé</strong>, tedy elektromagnetický spínač. Je to spínač proudu v obvodu, který je řízený jiným obvodem se slabým signálem. Příkladem jsou automatické závory u kolejí: když vlak svými železnými koly spojí obě kolejnice, sepne se řídicí obvod a ten zapne spouštění závor.</li>\n<li><strong>Oční lékařství</strong> — vytahování kovových pilin z oka.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-02.svg\" alt=\"Schéma jističe při normálním proudu a při přetížení: cívka přitáhne kotvu, páčka rozpojí kontakt\" /></a><figcaption>Jistič vypne obvod elektromagnetem při přetížení.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-04.svg\" alt=\"Schéma relé: řídicí obvod se spínačem a cívkou, kotva a kontakty výkonového obvodu\" /></a><figcaption>Relé: malý proud v cívce spíná větší proud.</figcaption></figure>\n\n<h3>Jak funguje elektrický zvonek</h3>\n<p>Zmáčkneme tlačítko (K) zvonku. Obvodem teče proud a elektromagnet (E) vytvoří magnetické pole. Pole přitáhne kotvu (A) a její kladívko udeří na zvonek (B). Zároveň kotva se ale odtrhne od přerušovače (T) a přeruší obvod, takže proud přestane téct.</p>\n<p>Bez proudu pole zanikne a kotva se vrátí do původní polohy. Tím se přerušovač (T) zase sepne a obvodem znovu začne procházet proud. Všechno se opakuje stále dokola, dokud držíme tlačítko zvonku zmáčknuté.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/magneticke-pole/elektromagnet/elektromagnet-obr-03.svg\" alt=\"Schéma elektrického zvonku se součástmi E, A, B, K, U a T a čtyřmi kroky činnosti\" /></a><figcaption>Elektrický zvonek: elektromagnet střídavě přitahuje a pouští kotvu.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Elektromagnet je cívka s jádrem z magneticky měkké oceli. Pole vzniká po zapnutí proudu a po vypnutí zaniká. Silnější je s více závity a větším proudem. Používá se v jeřábu, zvonku, jističi, relé, elektromotoru i v lékařství.</p>\n",
					uvod: "Zvonek u dveří zvoní, jen když zmáčkneš tlačítko. Uvnitř něj je magnet, který se dá zapnout a vypnout: když ho zapneš, přitahuje, a když ho vypneš, přestane. Takovému magnetu říkáme elektromagnet.",
					zapis: {"jednotky":["Žádná nová veličina ani jednotka."],"body":["elektromagnet = cívka + jádro z magneticky měkké oceli","proud zapnut → jádro se rychle zmagnetuje; vypnut → pole rychle zmizí","víc závitů a větší proud → silnější pole","jde zapnout, vypnout i přepólovat; silnější než permanentní magnet","využití: jeřáb, zvonek, jistič, relé, elektromotor"]},
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
					obsah: "<h2>Působení magnetického pole na vodič s proudem, elektromotor</h2>\n\n<p>Vodič nebo cívka s proudem se chová jako magnet. Proto na ně magnetické pole působí <strong>magnetickou silou</strong>.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-01.svg\" alt=\"Vodič s proudem I mezi póly magnetu, šipky indukčních čar od N k S a magnetické síly F, délka vodiče l, popisky směr indukčních čar, směr síly a směr proudu od + k −\" /></a><figcaption>Na vodič s proudem v magnetickém poli působí magnetická síla F.</figcaption></figure>\n\n<h3>Na čem síla závisí</h3>\n<p><strong>Směr</strong> síly závisí na tom, jak míří indukční čáry magnetického pole (kde je severní a kde jižní pól), a na <strong>směru proudu</strong> ve vodiči. Když obrátíme proud nebo póly magnetu, obrátí se i směr síly.</p>\n\n<h3>Pravidlo levé ruky</h3>\n<p>Směr síly zjistíme <strong>Flemingovým pravidlem levé ruky</strong>: do levé dlaně necháme vstupovat indukční čáry magnetického pole a prsty natočíme ve směru proudu ve vodiči. Palec pak ukáže směr magnetické síly.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-02.svg\" alt=\"Levá ruka s dlaní pod severním pólem: šipky indukčních čar vstupují do dlaně, prsty míří ve směru proudu od + k −, palec ukazuje sílu F; vedle podkovový magnet s vodičem a zdrojem\" /></a><figcaption>Podle pravidla levé ruky indukční čáry vstupují do dlaně, prsty ukazují směr proudu a palec směr síly.</figcaption></figure>\n\n<h3>Jak velká síla je</h3>\n<p><strong>Velikost</strong> síly závisí na těchto věcech:</p>\n<ul>\n<li>na <strong>velikosti proudu</strong> — čím větší proud vodičem teče, tím větší je síla,</li>\n<li>na <strong>síle magnetického pole</strong> a na délce vodiče, která je v poli — čím silnější pole a čím delší část vodiče v něm je, tím větší je síla,</li>\n<li>na <strong>poloze vodiče</strong> v poli — největší síla působí na vodič <strong>kolmý</strong> k indukčním čarám, protože pole působí na celou jeho délku. Na vodič <strong>rovnoběžný</strong> s indukčními čarami nepůsobí žádná magnetická síla.</li>\n</ul>\n\n<h3>Cívka v magnetickém poli</h3>\n<p>Cívka s proudem je upevněná tak, aby se mohla volně otáčet mezi póly podkovovitého magnetu. Chová se jako dvojice vodičů kolmých ke směru pole. Na částech závitu, které jsou kolmé k indukčním čarám, působí největší síla. Na části rovnoběžné s indukčními čarami nepůsobí žádná síla. V protilehlých stranách závitu teče proud opačně, proto tam síly míří opačně a závit se začne otáčet.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-03.svg\" alt=\"Jeden závit cívky s proudem mezi póly S a N, zelené šipky sil F opačným směrem na protilehlých stranách závitu, žluté šipky proudu I, přívody + a −\" /></a><figcaption>Na protilehlých stranách závitu s proudem míří síly opačně, a proto se závit otáčí.</figcaption></figure>\n\n<p>Čím víc závitů má cívka, tím větší výsledná síla jí otáčí. Tento jev využívají:</p>\n<ul>\n<li><strong>reproduktor</strong> — cívka je spojená s pružnou membránou a kolem ní je magnet. Velikost proudu v cívce ovlivňuje, jak se cívka s membránou vychýlí,</li>\n<li><strong>ampérmetr</strong> — vychýlení vodiče vychýlí ručku,</li>\n<li><strong>elektromotor</strong>.</li>\n</ul>\n\n<h3>Elektromotor: stator a rotor</h3>\n<p><strong>Elektromotor</strong> je elektrický stroj, který mění elektrickou energii na pohybovou (mechanickou) energii. Využívá vzájemné působení magnetického pole a elektrického proudu, který prochází cívkou. Skládá se ze dvou částí:</p>\n<ul>\n<li><strong>stator</strong> — vnější pevná část s magnety nebo elektromagnety (elektromagnety tvoří soustava cívek),</li>\n<li><strong>rotor</strong> (říká se mu také kotva) — točivá část, bývá uvnitř motoru. Tvoří ji jedna cívka, u velkých motorů více cívek. Cívky rotoru mají jádra z magneticky měkké látky.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-04.svg\" alt=\"Řez stejnosměrným motorem: magnety statoru N a S, cívky rotoru, komutátor, dva kartáčky s popisky + a −, šipka otáčení rotoru\" /></a><figcaption>Stejnosměrný motor má stator s magnety, rotor s cívkami, komutátor a dva kartáčky.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-10.svg\" alt=\"Stator a rotor motoru z vysavače: nepohyblivý stator, otáčivý rotor s cívkami, komutátor a uhlíkové kartáčky\" /></a><figcaption>Motor z vysavače má nepohyblivý stator a otáčivý rotor s cívkami, komutátorem a uhlíkovými kartáčky.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-07.svg\" alt=\"Stator malého elektromotoru s mnoha pevnými cívkami kolem středu na desce s elektronikou\" /></a><figcaption>Stator malého elektromotoru tvoří pevné cívky rozmístěné kolem středu.</figcaption></figure>\n\n<h3>Stejnosměrný elektromotor a komutátor</h3>\n<p>Stejnosměrný elektromotor je napájený zdrojem stejnosměrného napětí, například tužkovými bateriemi. Aby se rotor točil plynule, musí se po každé půlotáčce změnit směr sil, tedy musí se obrátit směr proudu v cívce. Jinak by síly otočily cívku do jedné polohy a tam by zůstala. Změna proudu změní směr sil a cívka se otočí o další půlotáčku.</p>\n<p>To zařizuje <strong>komutátor</strong> — mechanický přepínač polarity. Je to otáčivý kovový prstenec upevněný na hřídeli rotoru a rozdělený na dvě části. K oběma polovinám při otáčení přiléhají <strong>kartáčky</strong> — plíšky spojené se zdrojem, každý s jinou svorkou. Po půlotáčce si poloviny komutátoru vymění místa, dotýkají se opačných kartáčků, a tím se změní polarita obou polovin komutátoru.</p>\n<p>Jedna půlotáčka motoru probíhá takto:</p>\n<ol>\n<li>Poloviny komutátoru se dotýkají kartáčků, cívkou rotoru protéká proud a ta se chová jako elektromagnet se severním a jižním pólem. Pól magnetu statoru začne odpuzovat stejný pól cívky rotoru.</li>\n<li>Rotor se otáčí a odpuzování pokračuje.</li>\n<li>Před koncem půlotáčky se poloviny komutátoru na chvíli odpojí od kartáčků a rotor se točí dál setrvačností (protože se už roztočil).</li>\n</ol>\n<p>V další půlotáčce si poloviny komutátoru vymění kontakt s kartáčky, změní se směr proudu v cívce rotoru, cívka změní svou polaritu a celý děj se opakuje.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-05.svg\" alt=\"Tři fáze půlotáčky motoru vedle sebe: póly S a N statoru, cívka rotoru, komutátor s kartáčky + a −, šipky otáčení\" /></a><figcaption>Během půlotáčky se cívka otáčí a komutátor s kartáčky přepíná směr proudu.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-09.svg\" alt=\"Princip elektromotoru s komutátorem ve čtyřech fázích a) až d): otáčející se kotva mezi póly N a S, zdroj přes komutátor a kartáče, směr proudu a točivý moment\" /></a><figcaption>Ve čtyřech fázích a) až d) je vidět, jak se kotva elektromotoru otáčí a komutátor přepíná směr proudu.</figcaption></figure>\n\n<h3>Druhy motorů a jejich využití</h3>\n<p>Elektromotory jsou poháněné buď stejnosměrným proudem, třeba z baterie, nebo střídavým proudem ze zásuvky.</p>\n<ul>\n<li><strong>Stejnosměrné motory</strong> (napájené stejnosměrným napětím) pohánějí elektrická vozidla a stroje, například tramvaje, elektrické lokomotivy, vysavače nebo elektrický vláček.</li>\n<li><strong>Střídavé motory</strong> (napájené střídavým napětím) se dělí na jednofázové a třífázové. <strong>Jednofázové</strong> jsou v domácích spotřebičích, třeba ve ventilátorech a pračkách. <strong>Třífázové</strong> pohánějí průmyslové stroje a zařízení.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-08.svg\" alt=\"Střídavý motor rozebraný na stator s vinutím ve skříni a válcový rotor na hřídeli\" /></a><figcaption>Střídavý motor má stator s vinutím ve skříni a válcový rotor na hřídeli.</figcaption></figure>\n\n<p>Elektromotory najdeme skoro všude:</p>\n<ul>\n<li>v elektrickém nářadí (například akuvrtačka),</li>\n<li>v domácích spotřebičích (mixér, elektrický mlýnek na baterky, vysavač),</li>\n<li>v dopravních prostředcích (trolejbusy, tramvaje, elektromobily),</li>\n<li>ve výtahu,</li>\n<li>v elektronice (počítač, DVD přehrávač),</li>\n<li>v pohyblivých hračkách na baterky.</li>\n</ul>\n<p>Na štítku motoru výrobce uvádí jeho parametry, například výkon, napětí, proud a otáčky.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-11.svg\" alt=\"Štítek elektromotoru s údaji výrobce: typ, výkon, napětí, proud, otáčky, frekvence, ochrana, hmotnost\" /></a><figcaption>Na štítku elektromotoru najdeme údaje výrobce, například napětí, proud, otáčky a výkon.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Magnetické pole působí silou na vodič s proudem. Čím větší proud, tím větší síla, a největší je, když vodič leží kolmo k indukčním čarám. Směr síly určíme pravidlem levé ruky. Cívka mezi póly magnetu se dvojicí sil otáčí. Elektromotor mění elektrickou energii na pohybovou. Má pevný stator a točivý rotor. Stejnosměrný motor navíc potřebuje komutátor, který po každé půlotáčce obrátí směr proudu v cívce.</p>\n",
					uvod: "Hračka na baterky jezdí, protože se v ní točí malý motor. Uvnitř je drát, kterým teče elektřina, a vedle něj magnet. Magnet drát s elektřinou tlačí a stočený drát se z toho začne otáčet. Takový motor se jmenuje elektromotor.",
					zvidave: "<p>💡 Pro větší účinnost se v rotoru zapojuje více cívek a ve statoru více magnetů nebo elektromagnetů.</p>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/pusobeni-pole-na-vodic-elektromotor-obr-06.svg\" alt=\"Stator jako prstenec se střídavě červenými a modrými magnety uvnitř a rotor s mnoha cívkami\" /></a><figcaption>Stator tvoří prstenec magnetů a uvnitř se otáčí rotor s mnoha cívkami.</figcaption></figure>\n<p>💡 Magnetické pole působí silou i na proud nabitých částic v plynech. Tak se ovládá směr paprsku v rentgenových a výbojových trubicích nebo ve starších skleněných televizních obrazovkách. Magnetické pole Země odkloní většinu nabitých částic, které přicházejí ze Slunce, a díky tomu nás chrání. Zbylé částice se zachytí, srazí se s atomy v atmosféře a ty svítí — vzniká polární záře.</p>",
					zapis: {"jednotky":["Žádná nová veličina ani jednotka."],"body":["vodič nebo cívka s proudem = magnet → pole na něj působí silou","větší proud, silnější pole = větší síla; kolmo největší, rovnoběžně žádná","směr síly: pravidlo levé ruky (čáry do dlaně, prsty proud, palec síla)","cívka mezi póly: dvojice sil ji otáčí","elektromotor: elektrická → pohybová energie; stator = pevná část, rotor = točivá cívka","komutátor po půlotáčce obrátí proud v cívce; motory stejnosměrné i střídavé"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak se točí elektromotory', cesta: 'Hi-Tc84eglY' },
						{ druh: 'infografika', nazev: 'Infografika: Jak se točí elektromotor', cesta: '/materialy/fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor/infografika-elektromotor.png' },
					],
				},
				{
					slug: 'elektromagneticka-indukce',
					interakce: 'indukce',
					interakce2: 'indukce-dve-civky',
					nazev: 'Elektromagnetická indukce',
					obsah: "<h2>Elektromagnetická indukce</h2>\n\n<p>Vodič, kterým prochází proud, vytváří kolem sebe magnetické pole. To už víme z dřívějšího učiva. Anglický fyzik <strong>Michael Faraday</strong> zkoumal, jestli to jde i naopak.</p>\n<p>Zajímalo ho, jestli dokáže pomocí magnetického pole vyrobit ve vodiči elektrický proud. Svůj nápad si ověřil jednoduchým pokusem.</p>\n<p>Faraday byl anglický chemik a fyzik. Elektromagnetickou indukci objevil v roce 1831, stejně jako magnetické a elektrické siločáry. Do té doby se elektrická energie vyráběla jen chemicky, v bateriích. Jeho objev dal základ pro dynama.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-06.svg\" alt=\"Portrét Michaela Faradaye a dvě kresby: magnet se pohybuje k cívce s ampérmetrem a od ní, výchylka ručičky ukazuje indukovaný proud\" /></a><figcaption>Michael Faraday zjistil, že pohybující se magnet u cívky vyvolá elektrický proud.</figcaption></figure>\n\n<h3>Faradayův pokus</h3>\n<p>Faraday připojil cívku (svinutý drát) k voltmetru — přístroji, který měří napětí. Pak k cívce <strong>pohyboval magnetem</strong>. Ručička voltmetru se vychýlila: na cívce vzniklo napětí.</p>\n<p>Když magnet leží v blízkosti cívky a nehýbe se, ručička stojí na nule. Když jím pohybujeme v okolí cívky nebo uvnitř ní, ručička se vychýlí.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-01.svg\" alt=\"Cívka s mnoha závity spojená s voltmetrem (stupnice 0 až 300 V) a tyčový magnet s pólem N vlevo a S vpravo\" /></a><figcaption>Cívka je připojená k voltmetru a u ní leží tyčový magnet.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-02.svg\" alt=\"Cívka na kotouči spojená s ampérmetrem (nula uprostřed stupnice), nad ní tyčový magnet a dvě šipky nahoru a dolů, které ukazují pohyb magnetu do cívky a ven\" /></a><figcaption>Při zasouvání magnetu do cívky a vysouvání ven se ručička ampérmetru vychyluje.</figcaption></figure>\n\n<p>Tomuto jevu říkáme <strong>elektromagnetická indukce</strong>. Vzniká vždy, když se v okolí vodiče nebo cívky <strong>mění magnetické pole</strong>. Vznikne tak <strong>indukované napětí</strong> (značka Uᵢ), a je-li obvod uzavřený, poteče i <strong>indukovaný proud</strong> (značka Iᵢ).</p>\n<p>Magnetické pole v cívce se mění třeba tak, že se magnet a cívka vzájemně pohybují: hýbeme magnetem, nebo naopak cívkou. Při vzájemném pohybu cívky a magnetu se v cívce indukuje elektrický proud. Pole se mění také změnou proudu v druhé cívce, tedy v elektromagnetu — když ho zapneme nebo vypneme, změníme směr proudu nebo proud zesílíme či zeslabíme.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-04.svg\" alt=\"Dvě části: a) magnet se pohybuje do cívky, ampérmetr se vychýlí a magnetické pole se zesiluje; b) magnet je v klidu uvnitř cívky, proud nevzniká a pole se nemění\" /></a><figcaption>Proud vzniká jen při pohybu magnetu, a když magnet v cívce stojí, proud nevzniká.</figcaption></figure>\n\n<h3>Na čem závisí velikost napětí</h3>\n<p>Velikost i směr indukovaného napětí a proudu závisí na těchto věcech:</p>\n<ul>\n<li>Čím <strong>rychleji</strong> se magnet pohybuje, tím větší je indukované napětí.</li>\n<li>Čím <strong>silnější</strong> magnet použijeme, tím větší je indukované napětí.</li>\n<li>Čím víc <strong>závitů</strong> má cívka, tím větší je indukované napětí.</li>\n<li>Když magnet pohybujeme <strong>opačným směrem</strong>, otočí se i polarita napětí.</li>\n<li>Pole se dá měnit i jinak — zapnutím, vypnutím nebo změnou proudu v <strong>elektromagnetu</strong>. Největší změna nastává právě při zapnutí a vypnutí.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-03.svg\" alt=\"Dvě cívky vedle sebe: levá je přes spínač připojená ke zdroji, pravá ke galvanometru s nulou uprostřed stupnice; ručička se vychyluje při zapnutí a vypnutí\" /></a><figcaption>Při zapnutí a vypnutí proudu v první cívce se ve druhé cívce vychýlí ručička galvanometru.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-07.svg\" alt=\"Cívka s více závity spojená s voltmetrem a žárovkou, vedle ní pohyblivý magnet N–S; vlevo výčet toho, co ovlivňuje velikost proudu\" /></a><figcaption>Velikost indukovaného proudu ovlivňuje rychlost změny pole, síla magnetu a počet závitů cívky.</figcaption></figure>\n\n<h3>Zapamatuj si: na čem záleží indukovaný proud</h3>\n<p><strong>Velikost</strong> indukovaného elektrického proudu záleží na <strong>síle magnetu</strong>, na <strong>rychlosti pohybu magnetu</strong> a na <strong>počtu závitů cívky</strong>. V simulaci dává cívka se 4 závity při stejném pohybu magnetu větší výchylku ampérmetru než cívka se 2 závity.</p>\n<p><strong>Směr</strong> proudu záleží na <strong>směru pohybu magnetu v cívce</strong> (dovnitř, nebo ven) a na <strong>natočení magnetu</strong> (který pól je otočený k cívce). Když magnet otočíš pólem naopak (prohodíš póly), otočí se i směr proudu. Ampérmetr ukazuje velikost i směr proudu: výchylka na jednu nebo druhou stranu od nuly.</p>\n<p>Směr proudu závisí i na tom, jestli se magnetické pole u cívky zesiluje, nebo zeslabuje. Když se pole zesiluje (magnet se přibližuje), teče proud jedním směrem. Když se pole zeslabuje (magnet se vzdaluje), teče proud opačným směrem: opačná změna pole dává opačný směr proudu. Indukovaný proud má vždy takový směr, že jeho vlastní magnetické pole působí proti změně, která ho vyvolala.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-05.svg\" alt=\"Tři situace s magnetem a galvanometrem (stupnice v mA): a) pole se zesiluje a proud teče jedním směrem; b) magnet stojí a proud nevzniká; c) pole se zeslabuje a proud teče opačným směrem\" /></a><figcaption>Když se pole zesiluje, teče proud jedním směrem, když se zeslabuje, teče opačným směrem, a když se nemění, neteče žádný.</figcaption></figure>\n\n<p><strong>Když se magnet v cívce nepohybuje, proud neteče (0).</strong> Magnet, který leží u cívky nebo v klidu stojí uvnitř ní, magnetické pole nemění, a proto žádný proud nevyvolá.</p>\n<p>Vyzkoušej v simulaci níže: měň sílu a rychlost magnetu, směr jeho pohybu i otočení pólů a sleduj, jak se mění ampérmetr. Počet závitů cívky měníš posuvníkem v první simulaci (voltmetr); v simulaci s ampérmetry porovnej cívku se 2 a se 4 závity.</p>\n\n<h3>Kdy se nic neindukuje</h3>\n<p>Pokud magnet u cívky <strong>klidně leží</strong> a nehýbe se, magnetické pole se nemění. Napětí ani proud se pak neindukuje. Stejně je to, když se nemění proud v elektromagnetu: pole, které se nijak nemění, žádné napětí ani proud nevyvolá.</p>\n<p>Platí tu <strong>zákon zachování energie</strong>: pohybová energie magnetu se mění na energii elektrickou. Když se magnet nepohybuje, žádnou energii nepředává. Energie se tedy nevyrábí, jen se přeměňuje.</p>\n\n<h3>Kde se indukce využívá</h3>\n<p>Na elektromagnetické indukci pracují generátory elektřiny: <strong>alternátor</strong> vyrábí elektřinu v elektrárnách a elektrocentrálách, malý generátor na <strong>jízdním kole</strong> (lidově dynamo) — roztáčí ho kolo a svítí přední i zadní světlo.</p>\n<p>Indukce funguje také tady:</p>\n<ul>\n<li>v zapalovací cívce motoru — rychlá změna proudu v ní vyvolá vysoké napětí pro jiskru na zapalovací svíčce,</li>\n<li>v kapesních svítilnách, které se rozsvítí protřepáním — třepáním se silný permanentní magnet pohybuje uvnitř cívky,</li>\n<li>v indukčních brzdách — v kovovém kotouči při pohybu vznikají vířivé proudy a kotouč se chová jako magnet, který působí proti pohybu (například v rotopedu),</li>\n<li>v indukční varné desce — zahřívá se jen speciální dno hrnce, deska sama nehřeje,</li>\n<li>v peci na tavení kovů — v kovu uvnitř cívky vzniknou vířivé proudy a ty kov silně zahřejí,</li>\n<li>v bezdrátových nabíječkách, které přenášejí elektrickou energii bez drátů,</li>\n<li>v transformátoru, který mění napětí při přenosu elektrické energie (i v transformační stanici),</li>\n<li>v elektrické kytaře — proud se při hře indukuje v cívkách pod strunami,</li>\n<li>při záznamu zvuku na magnetické pásky (magnetofonové kotouče, kazety).</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-08.svg\" alt=\"Průhledná protřepávací kapesní svítilna, uvnitř trubice viditelná cívka z měděného drátu a pohyblivý magnet, na jednom konci tlačítko\" /></a><figcaption>V protřepávací svítilně se uvnitř cívky pohybuje magnet a indukuje proud.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-09.svg\" alt=\"Indukční pec: měděná cívka ve tvaru spirály kolem rozžhaveného kovového kusu, který září dožluta\" /></a><figcaption>V indukční peci se kov uvnitř cívky rozžhaví, protože se v něm indukují vířivé proudy.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce/elektromagneticka-indukce-obr-10.svg\" alt=\"Tři příklady využití indukce: indukční varná deska, bezdrátová nabíječka a transformační stanice\" /></a><figcaption>Indukci využívá indukční varná deska, bezdrátová nabíječka i transformační stanice.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Elektromagnetická indukce je jev, při kterém se v cívce nebo vodiči indukuje napětí, když se v okolí mění magnetické pole. V uzavřeném obvodu pak teče indukovaný proud. Pole měníme vzájemným pohybem magnetu a cívky nebo změnou proudu v druhé cívce (elektromagnetu). Větší napětí dostaneme rychlejším pohybem, silnějším magnetem a více závity. Opačná změna pole (zesilování a zeslabování) nebo prohozené póly obrátí směr proudu. Když se pole nemění, nic se neindukuje. Energie se nevyrábí, jen se pohybová energie magnetu mění na elektrickou. Využívá se v alternátoru, dynamu, transformátoru i v bezdrátové nabíječce.</p>\n",
					uvod: "Malý generátor na kole (lidově dynamo) je přístroj, který rozsvítí světlo, jen když se točí kolo. Uvnitř něj se točí magnet kousek od drátu a v drátu se z toho objeví elektřina. Když magnet stojí, nic se neděje. Tomu říkáme elektromagnetická indukce.",
					zvidave: "<p>💡 Pusť malý silný magnet do svislé trubky z mědi. Měď sama magnet nepřitahuje, a přesto magnet trubkou padá pomalu. Při jeho pádu se v trubce indukují vířivé proudy, které působí proti pohybu magnetu a brzdí ho. Na stejném principu fungují indukční brzdy.</p>\n<p>💡 Když zasouváš magnet do cívky, která je zapojená do uzavřeného obvodu, cítíš slabý odpor. Ten je cenou za elektřinu: práce tvé ruky se mění na elektrickou energii, a proto se energie neztrácí ani nevzniká z ničeho.</p>",
					zapis: {"jednotky":["indukované napětí Uᵢ, jednotka V (volt)","indukovaný proud Iᵢ, jednotka A (ampér)"],"zakon":"Energie se nevyrábí, jen se mění: pohybová energie magnetu → elektrická.","body":["indukce = změna magnetického pole u cívky → napětí, v uzavřeném obvodu i proud","pole se nemění (magnet v klidu) → nic se neindukuje","větší napětí: rychlejší pohyb, silnější magnet, víc závitů","opačný pohyb magnetu nebo prohozené póly → opačný směr proudu","využití: dynamo, alternátor, transformátor, bezdrátová nabíječka"]},
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
					obsah: "<h2>Vznik střídavého proudu a alternátor</h2>\n\n<p>V cívce se indukuje proud, když se u ní pohybuje magnet. Tomu jevu říkáme elektromagnetická indukce. Směr pohybu magnetu určuje směr indukovaného napětí a proudu: když magnetem pohneme opačně, ručička voltmetru nebo ampérmetru se vychýlí na opačnou stranu. Když se magnet u cívky otáčí, proud se pravidelně obrací.</p>\n<p>Proudu, který takhle mění svůj směr, říkáme <strong>střídavý proud</strong>. Právě ten odebíráme z elektrické sítě, tedy z běžné zásuvky.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-01.svg\" alt=\"Cívka s mnoha závity a ampérmetrem s nulou uprostřed stupnice ve dvou obrázcích pod sebou: nahoře se magnet zasouvá do cívky, dole se vysouvá ven a ručička se vychýlí na opačnou stranu\" /></a><figcaption>Když magnet do cívky zasouváme a vysouváme, ručička ampérmetru se vychyluje na opačné strany.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-10.svg\" alt=\"Ručně otáčený magnet poháněný pásem a kladkou poblíž cívky připojené k miliampérmetru s nulou uprostřed stupnice; šipky ukazují směr otáčení magnetu\" /></a><figcaption>Otáčením magnetu u cívky vzniká střídavý proud.</figcaption></figure>\n\n<h3>Graf střídavého proudu</h3>\n<p>Velikost střídavého proudu <strong>kolísá mezi nulou a maximem</strong>. Když proud teče opačným směrem, zapisujeme ho jako <strong>zápornou hodnotu</strong>. Proto graf střídavého proudu stoupá nahoru i klesá pod nulu.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-02.svg\" alt=\"Graf střídavého napětí U v čase t: modrá vlnovka (sinusoida) kmitá nad osou t i pod ní\" /></a><figcaption>Střídavé napětí v grafu kmitá nad osou času i pod ní.</figcaption></figure>\n\n<h3>Alternátor — stroj, který vyrábí střídavý proud</h3>\n<p><strong>Alternátor</strong> je elektrický generátor. Je to točivý stroj, který vyrábí elektrickou energii ve formě střídavého proudu pomocí elektromagnetické indukce. Mění pohybovou (otáčivou) energii na energii elektrickou.</p>\n<p>Napětí a proud se v závitu cívky indukují nejvíc ve chvíli, kdy se magnetické pole, které závitem prochází, mění nejrychleji. Když se závit otáčí, mění se jeho natočení vůči magnetickému poli, a proto se mění i směr proudu. Otáčející se cívku spojují s obvodem <strong>kroužky</strong>, které zajišťují pohyblivý kontakt.</p>\n<p>Na obrázcích vidíš jednoduchý model: mezi magnety se otáčí smyčka. U alternátoru v elektrárně je to obráceně — otáčí se magnet (elektromagnet) a cívky stojí. Podrobně je to v dalším oddílu.</p>\n<p>Závit se otáčí pravidelně, a proto se pravidelně mění velikost i směr indukovaného proudu a napětí v cívce.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-03.svg\" alt=\"Model alternátoru: obdélníkový závit cívky se otáčí mezi dvěma magnety (severní a jižní pól), červené šipky siločar, kroužky s přívody a klika, která závit roztáčí\" /></a><figcaption>V modelu alternátoru se závit otáčí mezi póly dvou magnetů a jeho konce vedou přes kroužky do obvodu.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-09.svg\" alt=\"Jednoduchý model generátoru střídavého proudu: vodivá smyčka se otáčí mezi dvěma nehybnými magnety (póly N a S), otáčení (mechanická energie) se mění na elektrickou energii\" /></a><figcaption>Generátor mění otáčení smyčky v magnetickém poli, tedy mechanickou energii, na elektrickou energii.</figcaption></figure>\n\n<h3>Rotor a stator</h3>\n<ul>\n<li><strong>Rotor</strong> je otáčející se část alternátoru. Vytváří proměnlivé magnetické pole — u malých generátorů je to silný magnet, častěji elektromagnet (ten se otáčí i s vlastním zdrojem malého stejnosměrného napětí).</li>\n<li><strong>Stator</strong> je pevná (nehybná) část s cívkami. Právě v jeho cívkách se indukuje napětí a proud.</li>\n<li>Má-li stator jednu cívku, vzniká jednofázové napětí. Má-li tři cívky, vzniká <strong>třífázové napětí</strong> — to se vyrábí v elektrárnách a přenáší se v rozvodné síti. Napětí ze tří cívek dávají v každém okamžiku dohromady nulu.</li>\n</ul>\n<p>Konstrukce alternátoru je podobná jako u elektromotoru, jen stroj pracuje na opačném principu.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-11.svg\" alt=\"Tři cívky (červená, modrá, zelená) kolem otáčejícího se magnetu uprostřed, pod každou měřicí přístroj; vpravo graf napětí u₁, u₂, u₃ v čase (tři posunuté vlnovky) a rovnice u₁ + u₂ + u₃ = 0\" /></a><figcaption>Tři cívky kolem otáčejícího se magnetu dávají tři posunutá napětí, jejichž součet je v každém okamžiku nulový.</figcaption></figure>\n\n<h3>Alternátor a dynamo</h3>\n<p>Kroužky zajišťují jen pohyblivý kontakt obvodu s otáčející se cívkou — směr proudu mění samo otáčení cívky v magnetickém poli. Kdybychom místo kroužků použili <strong>komutátor</strong> (rozdělený kroužek), jako je ve stejnosměrném motoru, proud by měnil jen svou velikost, ne směr. Takto upravený generátor se jmenuje <strong>dynamo</strong> a vyrábí stejnosměrný proud.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-04.svg\" alt=\"Graf stejnosměrného proudu s kolísající velikostí: řada stejných oblouků nad osou, žádná část křivky pod osou\" /></a><figcaption>Stejnosměrný proud může kolísat, ale jeho křivka zůstává celá nad osou.</figcaption></figure>\n\n<h3>Kde se alternátor používá</h3>\n<p>Alternátor pracuje v <strong>automobilu</strong> — za jízdy vyrábí proud a nabíjí akumulátor (autobaterii), ze kterého jede veškerá elektřina v autě. Najdeme ho i v <strong>elektrocentrále</strong>, což je naftový generátor elektrického napětí. Spalovací motor v ní pohání rotor alternátoru. Používá se tam, kde není přístup k rozvodné síti (třeba při práci na silnicích), nebo jako záložní zdroj, když vypadne proud (třeba v nemocnicích).</p>\n<p>Alternátor vyrábí proud i ve <strong>všech elektrárnách kromě solárních</strong> — větrné, vodní nebo parní turbíny (v tepelných a jaderných elektrárnách) v nich roztáčejí rotor alternátoru a přeměňují svou pohybovou energii na elektrickou. Rotor alternátoru v elektrárně bývá tvořený cívkami elektromagnetu.</p>\n<p><strong>Dynamo</strong> je generátor s komutátorem, který dává stejnosměrný proud.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-05.svg\" alt=\"Motorový prostor auta: alternátor s hliníkovým tělem, řemenice a přes ni vedený žebrový řemen od motoru\" /></a><figcaption>Alternátor v motorovém prostoru auta pohání řemen od motoru.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-06.svg\" alt=\"Elektrocentrála: žlutý benzínový nebo naftový agregát v ochranném rámu s motorem, alternátorem, zásuvkami a ovládacím panelem\" /></a><figcaption>Elektrocentrála je agregát, v němž spalovací motor pohání alternátor.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-07.svg\" alt=\"Větrná elektrárna: bílá věž s vrtulí (rotorem větrné turbíny) proti obloze a větvím stromů\" /></a><figcaption>Vrtule větrné elektrárny pohání alternátor.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vznik-stridaveho-proudu-alternator/vznik-stridaveho-proudu-alternator-obr-08.svg\" alt=\"Rotor alternátoru v elektrárně: velké válcové těleso s pevně navinutými cívkami elektromagnetu\" /></a><figcaption>Rotor alternátoru v elektrárně tvoří cívky elektromagnetu.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Když se magnet u cívky otáčí, indukuje se v ní proud, který pravidelně mění směr — střídavý proud (teče ze zásuvky). Jeho velikost kolísá mezi nulou a maximem, opačný směr zapisujeme jako zápornou hodnotu. Alternátor je točivý stroj, který pomocí indukce mění otáčivou energii na elektrickou. Rotor se otáčí a vytváří proměnlivé pole, stator stojí a má cívky, ve kterých se indukuje napětí (tři cívky = třífázové napětí). S komutátorem místo kroužků vznikne dynamo se stejnosměrným proudem. Alternátor najdeme v autě, v elektrocentrále a ve všech elektrárnách kromě solárních; dynamo je generátor s komutátorem, který dává stejnosměrný proud.</p>\n",
					uvod: "Když roztočíš magnet těsně u cívky z drátu, v drátu se objeví elektřina. Magnet se točí pořád dokola, a tak elektřina teče chvíli na jednu stranu a chvíli na druhou. Takhle vyrábí elektřinu stroj, kterému se říká alternátor. Najdeš ho třeba v autě, kde za jízdy dobíjí akumulátor (autobaterii).",
					zvidave: "<p>💡 Když na kole jedeš rychleji, dynamo svítí silněji. Otáčí se totiž rychleji, magnetické pole u cívky se mění rychleji, a proto se v ní indukuje větší napětí. Stejné pravidlo platí u každého alternátoru.</p>\n<p>💡 Dynamo na jízdním kole je ve skutečnosti malý alternátor: otáčí se v něm magnet a vyrábí střídavý proud. Dynamo se mu říká jen ze zvyku.</p>\n<p>💡 Zkus si to doma: vezmi motorek ze staré hračky, připoj k němu malou LED diodu a rychle ho roztoč šňůrkou (zkus oba směry). Dioda krátce zabliká. Motorek se změnil v dynamo, protože stroje na výrobu proudu a elektromotory jsou si konstrukčně podobné.</p>",
					zapis: {"body":["otáčející se magnet u cívky → indukovaný proud, který střídá směr = střídavý proud (ze zásuvky)","graf: velikost kolísá mezi nulou a maximem, opačný směr = záporná hodnota","alternátor: otáčivá energie → elektrická (indukcí)","rotor = otáčí se (magnet), stator = stojí (cívky)","3 cívky statoru → třífázové napětí (elektrárny)","komutátor místo kroužků → dynamo: generátor, který dává stejnosměrný proud","alternátor: auto, elektrocentrála, elektrárny"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Příběh střídavého proudu (generátor)', cesta: '3Y_USuTTVbw' },
					],
				},
				{
					slug: 'vlastnosti-stridaveho-proudu',
					nazev: 'Vlastnosti střídavého proudu',
					interakce: 'stridavy-proud',
					obsah: "<h2>Vlastnosti střídavého proudu</h2>\n\n<p>Při rovnoměrném otáčení cívky v magnetickém poli vzniká v cívce pravidelně proměnné napětí a obvodem protéká proud se stejným časovým průběhem. Takový proud se jmenuje střídavý.</p>\n\n<h3>Stejnosměrný a střídavý proud</h3>\n<p>Z baterky teče proud pořád jedním směrem. Říkáme mu <strong>stejnosměrný</strong>. Ze zásuvky ale teče jiný proud — pravidelně mění velikost i směr. Říkáme mu <strong>střídavý</strong>. Vzniká otáčením cívky v magnetickém poli, jako u alternátoru. Nejčastěji ho používáme tak, že zapojíme obvod do zásuvky.</p>\n<p>Zdroj střídavého napětí kreslíme ve schématu jako kroužek s vlnovkou.</p>\n<p>Elektrony ve vodiči při střídavém proudu opakovaně mění směr pohybu podle polarity zdroje. Po určitou dobu se pohybují jedním směrem, a když se polarita napětí změní, pohybují se směrem opačným.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-01.svg\" alt=\"Model zdroje střídavého napětí: obdélníková cívka se otáčí klikou mezi červeným a zeleným magnetem, konce cívky vedou přes dva kroužky do obvodu se svítící žárovkou\" /></a><figcaption>Otáčením cívky klikou mezi magnety vzniká střídavé napětí, které rozsvítí žárovku.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-02.svg\" alt=\"Schematická značka zdroje střídavého napětí: kruh s vlnovkou uprostřed a dvěma přívody nahoře a dole\" /></a><figcaption>Zdroj střídavého napětí se ve schématu značí kroužkem s vlnovkou.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-03.svg\" alt=\"Graf napětí U v čase t s vlnovkou a nad ní i pod ní kousky vodiče s elektrony, které se pohybují jednou jedním a jednou opačným směrem\" /></a><figcaption>U střídavého napětí se volné elektrony ve vodiči pohybují střídavě jedním a pak opačným směrem.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-06.svg\" alt=\"Dva grafy napětí pod sebou: nahoře stejnosměrné napětí baterie 1,5 V (vodorovná čára), dole střídavé napětí ze zásuvky (vlnovka nad a pod nulou) s efektivní hodnotou 230 V a maximální hodnotou Uₘ\" /></a><figcaption>Stejnosměrné napětí baterie je v grafu vodorovná čára, střídavé napětí ze zásuvky vlnovka.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-09.svg\" alt=\"Tužková baterie s označením 1,5 V a evropská zásuvka; popisky stejnosměrné napětí (baterie) a střídavé napětí (zásuvka)\" /></a><figcaption>Tužková baterie dává stejnosměrné napětí 1,5 V a zásuvka střídavé napětí.</figcaption></figure>\n\n<h3>Graf střídavého proudu a perioda</h3>\n<p>Když zakreslíme, jak se proud v čase mění, dostaneme pravidelnou vlnovku. Při rovnoměrném otáčení cívky v magnetickém poli je to takzvaná <strong>sinusoida</strong>.</p>\n<p>Nejkratší doba, za kterou se průběh střídavého proudu opakuje, se jmenuje <strong>perioda</strong>. Značíme ji <strong>T</strong> a měříme v sekundách (s). Je to zároveň doba, jak dlouho trvá jedna otočka cívky v alternátoru. V grafu ji najdeme takto: jedna vlna vede od nuly nahoru do maxima, dolů přes nulu do maxima na opačné straně a zpět do nuly.</p>\n<p>Na obrázku je perioda <strong>T = 0,5 s</strong>. V druhém grafu (T = 0,2 s) se stejný průběh opakuje pětkrát za sekundu.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-04.svg\" alt=\"Graf proudu I v ampérech v čase t: modrá sinusoida s maximem 2 A a minimem −2 A; pod osou dvě šipky T označují dvě po sobě jdoucí periody\" /></a><figcaption>Perioda T je doba jednoho úplného kmitu proudu a v grafu jsou vyznačené dvě po sobě jdoucí periody.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-07.svg\" alt=\"Graf střídavého proudu v mikroampérech od −30 do +30 v čase od 0 do 0,5 s, šipkou vyznačená perioda T = 0,2 s mezi dvěma po sobě jdoucími vrcholy; pod grafem věta o pětinásobném opakování za sekundu, f = 5 Hz\" /></a><figcaption>Při periodě T = 0,2 s se průběh opakuje pětkrát za sekundu, tedy f = 5 Hz.</figcaption></figure>\n\n<h3>Frekvence</h3>\n<p><strong>Frekvence</strong> (kmitočet) je počet period, tedy opakování, za jednu sekundu. Je to také počet otoček cívky v alternátoru za jednu sekundu. Značíme ji <strong>f</strong> a měříme v hertzích (<strong>Hz</strong>). V grafu s periodou 0,5 s je <strong>f = 2 Hz</strong>: cívka udělá dvě otočky za sekundu a v grafu vidíme dvě opakující se vlny za sekundu.</p>\n<p>Pro periodu a frekvenci platí vztah <strong>f = 1 : T</strong> (a také <strong>T = 1 : f</strong>). Čím kratší perioda, tím vyšší frekvence. Když je perioda 0,2 s, je frekvence 1 : 0,2 = 5 Hz.</p>\n<p>V naší rozvodné síti má střídavé napětí frekvenci <strong>50 Hz</strong>. Cívka v alternátoru se tedy otočí padesátkrát za sekundu a jedna perioda trvá T = 1 : 50 s = <strong>20 ms</strong> (milisekund; 1 ms je tisícina sekundy).</p>\n\n<p>Převody jednotek: 1 ms = 0,001 s, 1 kHz = 1 000 Hz (kilohertz), 1 kW = 1 000 W (kilowatt). Do vzorců dosazujeme periodu v sekundách, frekvenci v hertzích, napětí ve voltech, proud v ampérech a výkon ve wattech.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-08.svg\" alt=\"Rámeček s definicí: perioda T je čas jednoho opakování děje, frekvence f je počet opakování za 1 sekundu v hertzích; vzorce T = 1 : f a f = 1 : T\" /></a><figcaption>Perioda je čas jednoho opakování děje a frekvence počet opakování za sekundu, platí T = 1 : f a f = 1 : T.</figcaption></figure>\n\n<h3>Maximální a efektivní hodnota</h3>\n<p>Okamžité hodnoty proudu a napětí se velmi rychle mění. Elektrické spotřebiče na tak rychlé změny nedokážou reagovat. Žárovka například nesvítí nejvíc tehdy, kdy je proud největší, a nezhasne, když je proud zrovna nulový. Proto zavádíme dvě hlavní hodnoty pro popis střídavého proudu a napětí.</p>\n<p><strong>Maximální hodnota</strong> (I<sub>m</sub>, U<sub>m</sub>) je největší hodnota proudu nebo napětí. Proud jí dosahuje vždy jen dvakrát za periodu, pokaždé s opačnou polaritou. V grafu s periodou 0,5 s je I<sub>m</sub> = 2 A: poprvé nastane v čase 0,125 s při kladném směru proudu a podruhé v čase 0,375 s při opačném směru.</p>\n<p><strong>Efektivní hodnota</strong> (I, U) je taková velikost proudu nebo napětí, která odpovídá stejnosměrnému proudu se stejnými účinky a výkonem jako daný střídavý proud. Tuto hodnotu naměří všechny měřicí přístroje, protože okamžitá hodnota se velmi rychle mění a přístroje umějí měřit jen účinky proudu. Efektivní hodnota je rovna <strong>70 %</strong> maximální hodnoty.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/vlastnosti-stridaveho-proudu/vlastnosti-stridaveho-proudu-obr-05.svg\" alt=\"Graf střídavého proudu I v čase t: modrá sinusoida s maximy Iₘ nad osou a −Iₘ pod osou, červená vodorovná čára I označuje efektivní hodnotu mezi nulou a maximem\" /></a><figcaption>Efektivní hodnota střídavého proudu I leží mezi nulou a maximální hodnotou Iₘ.</figcaption></figure>\n\n<h3>Výkon a střídavé napětí v síti</h3>\n<p>Výkon střídavého proudu se vypočítá z efektivních hodnot proudu a napětí: <strong>P = U · I</strong>. Například vařič v zásuvce (230 V), kterým prochází proud 2 A, má výkon 230 · 2 = 460 W.</p>\n<p>V energetice, tedy v rozvodné síti, používáme střídavé napětí s efektivní hodnotou <strong>230 V</strong> a frekvencí <strong>50 Hz</strong>.</p>\n\n<h3>Příklady z hodiny</h3>\n<ol>\n<li>Cívka alternátoru se otáčí s frekvencí <strong>25 Hz</strong>. Jak dlouho trvá jedna otočka (perioda)? <details><summary>řešení</summary>T = 1 : f = 1 : 25 s = <strong>40 ms</strong></details></li>\n<li>Perioda střídavého proudu je <strong>10 ms</strong>. Jaká je jeho frekvence? <details><summary>řešení</summary>10 ms je 1 : 100 s, takže f = 1 : T = <strong>100 Hz</strong></details></li>\n<li>Maximální napětí na cívce je <strong>200 V</strong>. Jaké napětí ukáže voltmetr (efektivní hodnota, 70 % maxima)? <details><summary>řešení</summary>U = 70 % z 200 V = <strong>140 V</strong></details></li>\n<li>Elektrickým vařičem v zásuvce (230 V) prochází proud <strong>2 A</strong>. Jaký je jeho výkon? <details><summary>řešení</summary>P = U · I = 230 · 2 = <strong>460 W</strong></details></li>\n</ol>\n\n<h3>Shrnutí</h3>\n<p>Střídavý proud mění velikost i směr, jeho graf je sinusoida. Perioda T je doba jedné otočky cívky, frekvence f je počet otoček za sekundu a platí f = 1 : T. V síti je 50 Hz, tedy perioda 20 ms. Maximální hodnota je největší, efektivní hodnota (70 % maxima) je ta, kterou ukazují přístroje; v zásuvce je efektivní napětí 230 V. Výkon vypočítáme z efektivních hodnot: P = U · I.</p>\n",
					uvod: "Baterka v kapesní svítilně tlačí proud pořád jedním směrem. Zásuvka doma ho ale pořád obrací sem a tam, tak rychle, že si toho nevšimneš. Žárovka přesto svítí klidně, protože na tak rychlé změny nestíhá reagovat.",
					zvidave: "<p>💡 Při 50 Hz se proud v zásuvce vynuluje stokrát za sekundu, protože v každé periodě projde nulou dvakrát. Žárovka přesto nebliká: vlákno je tak rozžhavené, že za tak krátkou chvíli nestihne vychladnout, a oko by tak rychlou změnu stejně nepostřehlo.</p>\n<p>💡 Maximální napětí spočítáme z efektivního vynásobením číslem <strong>1,4</strong> (to je zhruba 100 : 70): 230 · 1,4 = <strong>322 V</strong>. Přesnější číslo je odmocnina ze dvou (asi 1,41) a s ní vyjde skutečná špička napětí v zásuvce asi <strong>325 V</strong>. Proto se u součástek hlídá, jaké napětí vydrží — a zásuvka je nebezpečnější, než se podle čísla 230 V zdá. Stejně dopočítáš i opačným směrem: na cívce je maximální napětí 140 V, voltmetr ukáže 140 : 1,4 = <strong>100 V</strong>.</p>\n<p>💡 Proč se v síti používá střídavý proud, když by stejnosměrný byl jednodušší? Střídavé napětí umí <strong>transformátor</strong> snadno zvýšit i snížit, stejnosměrné ne. Vedení ztrácí energii zahříváním drátů a ztráty rostou s proudem. Elektrárna proto napětí zvýší až na stovky kilovoltů, proud tím klesne a vedení skoro netopí. Před domem se napětí zase sníží na 230 V. Střídavý proud se snadno transformuje, a proto se pro rozvod elektřiny používá nejčastěji (existují i vedení na stejnosměrné vysoké napětí, ale ta jsou dražší a řídčí).</p>",
					zapis: {"vzorec":"f = 1 : T (T = 1 : f)\nP = U · I\n(U = P : I, I = P : U)","jednotky":["T (s), f (Hz), U (V), I (A), P (W)"],"vzorecSlovy":"frekvence = jedna lomeno perioda; výkon = napětí krát proud","body":["střídavý proud: sinusoida, mění směr","T = doba otočky, f = otoček za s","efektivní = 70 % maxima (měří ji přístroj)","síť: 230 V, 50 Hz, 20 ms"]},
				},
				{
					slug: 'transformator',
					nazev: 'Transformátor',
					interakce: 'transformator',
					obsah: "<h2>Transformátor</h2>\n\n<p>Transformátor je elektrotechnické zařízení, které slouží k přenosu elektrické energie a zároveň k přeměně (transformaci) velikosti elektrického napětí. Používá se hlavně při přenosu elektrické energie na velké vzdálenosti a v mnoha zařízeních kolem nás. Je to netočivý stroj — nic se v něm neotáčí, na rozdíl od alternátoru. Mění hodnoty střídavého napětí a proudu, ale frekvence zůstává stejná (z 50 Hz v zásuvce zůstane 50 Hz).</p>\n\n<h3>Z čeho se transformátor skládá</h3>\n<p>Transformátor se skládá ze dvou samostatných elektrických obvodů. Každý obvod má svou cívku (vinutí), tedy drát omotaný do <strong>závitů</strong> (jedno omotání drátu je jeden závit). Obě cívky mají společné ocelové <strong>jádro</strong>.</p>\n<ul>\n<li><strong>Primární cívka</strong> (vstupní) je napojená na zdroj střídavého napětí. Napětí na ní značíme U₁ a počet jejích závitů N₁.</li>\n<li><strong>Sekundární cívka</strong> (výstupní) je ta, ze které odebíráme transformované napětí. Napětí na ní značíme U₂ a počet jejích závitů N₂.</li>\n<li><strong>Jádro</strong> (magnetický obvod) uzavírá magnetické pole. Bývá z tenkých, navzájem izolovaných plechů z oceli, což je látka, kterou magnet silně přitahuje.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-01.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-01.svg\" alt=\"Transformátor má dvě cívky z měděného drátu na společném jádře.\" /></a><figcaption>Transformátor má dvě cívky z měděného drátu na společném jádře.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-02.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-02.svg\" alt=\"Schéma zapojení: primární cívka je připojená ke zdroji střídavého napětí a na svorkách sekundární cívky měříme napětí U₂.\" /></a><figcaption>Schéma zapojení: primární cívka je připojená ke zdroji střídavého napětí a na svorkách sekundární cívky měříme napětí U₂.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-11.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-11.svg\" alt=\"Transformátor má v nákresu dvě vinutí na společném jádře a dole svou schematickou značku.\" /></a><figcaption>Transformátor má v nákresu dvě vinutí na společném jádře a dole svou schematickou značku.</figcaption></figure>\n\n<h3>Jak transformátor funguje</h3>\n<p>Primární cívku připojíme ke zdroji střídavého napětí. Proud v ní se pořád mění, a proto cívka slouží jako elektromagnet, který vytváří proměnlivé magnetické pole. Společné jádro přenese magnetické pole z jedné cívky do druhé bez velkých ztrát energie do okolí. V sekundární cívce se pomocí elektromagnetické indukce naindukuje střídavé napětí. Účinnost přenosu může být až <strong>98 %</strong>: ze 100 dílů energie projde dál 98.</p>\n<p>Transformátor pracuje <strong>pouze na střídavé napětí</strong>. Podmínkou elektromagnetické indukce je proměnlivé magnetické pole a to zajišťuje jen proměnný proud v primární cívce. Oba obvody jsou samostatné, energii mezi nimi přenáší jen magnetické pole v jádře.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-03.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-03.svg\" alt=\"Magnetické pole se uzavírá v jádře a prochází z jedné cívky do druhé.\" /></a><figcaption>Magnetické pole se uzavírá v jádře a prochází z jedné cívky do druhé.</figcaption></figure>\n\n<h3>Rovnice transformátoru</h3>\n<p>Transformátor umožňuje napětí zvyšovat i snižovat. Velikost napětí na sekundární cívce závisí na počtu závitů obou cívek. Z vlastností elektromagnetické indukce plyne: kolikrát víc závitů má sekundární cívka, které vystavíme proměnné magnetické pole primární cívky, tolikrát větší napětí se v ní naindukuje. Napětí se tedy mění ve stejném poměru jako počty závitů cívek:</p>\n<p><strong>U₂ : U₁ = N₂ : N₁</strong></p>\n<p>Poměr závitů sekundární a primární cívky se jmenuje <strong>transformační poměr</strong> <strong>k</strong>. Je roven i poměru napětí na sekundární a primární cívce: <strong>k = U₂ : U₁ = N₂ : N₁</strong>. Z toho plyne <strong>U₂ = k · U₁</strong> a <strong>N₂ = k · N₁</strong>. Z rovnice se dá dopočítat i <strong>U₂ = U₁ · N₂ : N₁</strong> a <strong>U₁ = U₂ · N₁ : N₂</strong>. (Na hodině se může transformační poměr značit písmenem p.)</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-12.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-12.svg\" alt=\"Napětí se mění ve stejném poměru jako počty závitů: U₂ : U₁ = N₂ : N₁.\" /></a><figcaption>Napětí se mění ve stejném poměru jako počty závitů: U₂ : U₁ = N₂ : N₁.</figcaption></figure>\n\n<h3>Transformace nahoru a dolů</h3>\n<p><strong>Transformace nahoru</strong> znamená zvyšování napětí. Transformační poměr je větší než jedna (k > 1), sekundární cívka má více závitů než primární a napětí na ní je vyšší než napětí ze zdroje. Příklady:</p>\n<ul>\n<li>zvýšení napětí z elektrárny na velmi vysoké napětí, například 400 kV, pro dálkový přenos (vyšší napětí umožňuje snížit ztráty na vedení; 1 kV = 1 000 V),</li>\n<li>zapalovací svíčka v motoru auta (45 000 V zapálí stlačenou směs benzínových par se vzduchem),</li>\n<li>zvyšování napětí pro start výkonných motorů,</li>\n<li>získávání vysokých napětí v televizních přijímačích,</li>\n<li>Teslův transformátor.</li>\n</ul>\n<p><strong>Transformace dolů</strong> znamená snižování napětí. Transformační poměr je menší než jedna (k &lt; 1), sekundární cívka má méně závitů než primární a napětí na ní je nižší než napětí ze zdroje. Příklady:</p>\n<ul>\n<li>nabíječky mobilních telefonů a notebooků (například v nabíječce s USB-C se 230 V ze zásuvky přemění na 20 V),</li>\n<li>adaptéry k zařízením, která pracují na menší napětí (elektronické klávesy, nabíječky na baterky),</li>\n<li>snižování napětí z rozvodné sítě ke spotřebiteli (230 V).</li>\n</ul>\n<p>Rozvodná síť tak funguje díky transformátorům. Zvýšení napětí za elektrárnou umožňuje přenos energie na dlouhé vzdálenosti s minimálními ztrátami. Snížení napětí před obydlími dává bezpečné a použitelné napětí pro domácí spotřebiče. Například: v elektrárně je napětí 6 300 V, transformátor ho zvýší na 220 kV pro přenos, dál se sníží na 22 kV a nakonec na 230 V do domácností.</p>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-04.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-04.svg\" alt=\"Teslův transformátor vytváří velmi vysoké napětí a z jeho koule šlehají blesky.\" /></a><figcaption>Teslův transformátor vytváří velmi vysoké napětí a z jeho koule šlehají blesky.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-05.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-05.svg\" alt=\"Nabíječka s evropskou vidlicí snižuje napětí ze zásuvky.\" /></a><figcaption>Nabíječka s evropskou vidlicí snižuje napětí ze zásuvky.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-14.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-14.svg\" alt=\"Za elektrárnou se napětí zvýší, před domácnostmi se postupně sníží na 230 V.\" /></a><figcaption>Za elektrárnou se napětí zvýší, před domácnostmi se postupně sníží na 230 V.</figcaption></figure>\n\n<h3>Proud v transformátoru a velký proud</h3>\n<p>Elektrický výkon <strong>P = U · I</strong> zůstává na vstupu i na výstupu stejný, když zanedbáme ztráty energie. Když se napětí zmenší, proud v sekundárním obvodu se tolikrát zvětší. Kolikrát se napětí zvětší, tolikrát se proud zmenší. Velikost proudu se mění v opačném poměru než počty závitů cívek: <strong>I₁ : I₂ = U₂ : U₁ = N₂ : N₁</strong>.</p>\n<p>Velký proud znamená vysokou teplotu — dráty se zahřívají. Proto se pro dálkový přenos napětí zvyšuje: při stejném výkonu je pak proud menší, vedení se méně zahřívá a ztráty jsou menší.</p>\n<p>Velký proud se dá i využít. Transformátor s malým napětím a velkým proudem se používá tam, kde je potřeba kov zahřát:</p>\n<ul>\n<li><strong>Indukční pec</strong> taví nebo kalí kovy (kalení je zahřátí kovu s rychlým ochlazením, aby byl tvrdší). Sekundární cívka má malý počet závitů a velmi vysoký proud rozžhaví kov uvnitř cívky (například konec kovové tyče) na vysokou teplotu. Tavit se může jen kousek kovového předmětu, nebo velké množství kovu v nádobě, jejíž stěny obklopuje cívka.</li>\n<li><strong>Svařování elektrickým obloukem</strong>: napětí se sníží na 10–50 V a proud se zvýší, aby se zahřály elektrody. Jasně zářivý elektrický oblouk má teplotu až 6 000 °C.</li>\n<li><strong>Transformátorová (pistolová) páječka</strong> pájí elektrické obvody. Sekundární cívku tvoří jeden závit, páječka roztaví kousek cínového drátu a roztavený cín pak vodivě spojí jednotlivé části obvodu.</li>\n</ul>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-06.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-06.svg\" alt=\"Na jádře transformátoru je vpravo kovový prstenec s vodou, ze které stoupá pára.\" /></a><figcaption>Na jádře transformátoru je vpravo kovový prstenec s vodou, ze které stoupá pára.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-07.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-07.svg\" alt=\"Konec kovové tyče uvnitř cívky se rozžhaví.\" /></a><figcaption>Konec kovové tyče uvnitř cívky se rozžhaví.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-08.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-08.svg\" alt=\"Indukční pec v řezu: kov uprostřed taví cívka, která ho obklopuje.\" /></a><figcaption>Indukční pec v řezu: kov uprostřed taví cívka, která ho obklopuje.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-09.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-09.svg\" alt=\"Při svařování elektrickým obloukem se kov taví v jasně zářícím oblouku.\" /></a><figcaption>Při svařování elektrickým obloukem se kov taví v jasně zářícím oblouku.</figcaption></figure>\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-10.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-10.svg\" alt=\"Pistolová páječka má sekundární cívku tvořenou jedním závitem.\" /></a><figcaption>Pistolová páječka má sekundární cívku tvořenou jedním závitem.</figcaption></figure>\n\n<h3>Příklady</h3>\n<ol>\n<li>Primární cívka transformátoru má <strong>500 závitů</strong> a je připojená ke zdroji střídavého napětí <strong>200 V</strong>. Sekundární cívka má <strong>100 závitů</strong>. Jaké napětí je na sekundární cívce? <details><summary>řešení</summary>k = N₂ : N₁ = 100 : 500 = 1 : 5, sekundární cívka má pětkrát míň závitů, takže U₂ = 200 : 5 = <strong>40 V</strong> (transformace dolů, k &lt; 1)</details></li>\n<li>Primární cívka má <strong>100 závitů</strong> a napětí <strong>200 V</strong>. Sekundární cívka má <strong>500 závitů</strong>. Jaké napětí je na sekundární cívce? <details><summary>řešení</summary>k = N₂ : N₁ = 500 : 100 = 5, U₂ = k · U₁ = 5 · 200 = <strong>1 000 V</strong> (transformace nahoru, k > 1)</details></li>\n<li>Primární cívka má <strong>1 000 závitů</strong> a napětí <strong>230 V</strong>. Sekundární cívka má <strong>100 závitů</strong>. Jaké napětí je na sekundární cívce? <details><summary>řešení</summary>k = 100 : 1 000 = 1 : 10, U₂ = 230 : 10 = <strong>23 V</strong></details></li>\n<li>Transformátor sníží napětí z <strong>200 V</strong> na <strong>40 V</strong>. Primárním obvodem teče proud <strong>2 A</strong>. Jaký proud teče sekundárním obvodem (ztráty zanedbáme)? <details><summary>řešení</summary>Napětí se zmenšilo 5krát (200 : 40 = 5), proud se proto 5krát zvětší: 2 · 5 = <strong>10 A</strong>. Kontrola výkonu: 200 · 2 = 400 W a 40 · 10 = 400 W</details></li>\n</ol>\n\n<figure><a href=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-13.svg\" target=\"_blank\" rel=\"noopener\"><img src=\"/obrazky/fyzika/9-rocnik/indukce-a-stridavy-proud/transformator/transformator-obr-13.svg\" alt=\"Dvě cívky na společném jádře tvaru E jsou primární a sekundární.\" /></a><figcaption>Dvě cívky na společném jádře tvaru E jsou primární a sekundární.</figcaption></figure>\n\n<h3>Shrnutí</h3>\n<p>Transformátor přenáší elektrickou energii a mění velikost střídavého napětí. Má dvě cívky (primární a sekundární) na společném ocelovém jádře. Střídavý proud v primární cívce vytváří proměnlivé magnetické pole a to v sekundární cívce elektromagnetickou indukcí vyvolá napětí. Se stejnosměrným napětím proto nefunguje. Napětí se mění ve stejném poměru jako počty závitů: U₂ : U₁ = N₂ : N₁ a transformační poměr je k = N₂ : N₁. Při k > 1 napětí roste (nahoru) a proud klesá, při k &lt; 1 napětí klesá (dolů) a proud roste; výkon P = U · I zůstává stejný a účinnost je až 98 %. Vysoké napětí v dálkovém vedení znamená menší proud, a tedy menší ztráty. Velký proud z transformátoru taví kov, svařuje a pájí.</p>\n",
					uvod: "Elektřina putuje z elektrárny po drátech s velmi vysokým napětím. Než dojde do zásuvky, transformátor napětí zmenší, aby bylo pro domácnost bezpečné. Umí to i obráceně, napětí zvětšit, ale funguje jen s takovým proudem, který se pořád mění.",
					zvidave: "<p>💡 Proč jsou ztráty na vedení při vysokém napětí tak malé? Výkon přenesený vedením je P = U · I, takže při stejném výkonu je proud tolikrát menší, kolikrát je napětí větší. Například výkon 4 000 000 W přenese proud 1 000 A při napětí 4 000 V, ale jen 100 A při napětí 40 000 V (I = P : U). Ztráty ohřevem vedení přitom rostou rychleji než proud: desetkrát menší proud znamená stokrát menší ztráty. Proto se dálkové vedení vede na stovkách kilovoltů.</p>\n<p>💡 Co se stane, když transformátor připojíš k baterce? Stejnosměrný proud je stálý, takže vytváří stálé magnetické pole a to v sekundární cívce nic neindukuje. Napětí se v ní objeví jen na okamžik při zapnutí a při vypnutí, protože právě tehdy se pole změní. Primární cívka má navíc malý odpor a stejnosměrným proudem by se mohla přehřát, proto to doma nezkoušej.</p>\n<p>💡 Nabíječka telefonu není jen transformátor. Telefon se nabíjí stejnosměrným proudem, kdežto transformátor dává střídavý. Uvnitř nabíječky proto bývají ještě součástky, které střídavý proud přemění na stejnosměrný.</p>",
					zapis: {"vzorec":"U₂ : U₁ = N₂ : N₁   (k = N₂ : N₁)","jednotky":["U (V), N počet závitů, k bez jednotky"],"vzorecSlovy":"napětí jako závity","body":["mění velikost jen střídavého napětí","primární (vstup) a sekundární (výstup) cívka, společné jádro","nahoru: k > 1, U ↑, I ↓; dolů: k < 1, U ↓, I ↑","P = U · I stejný, účinnost až 98 %","např. 500 : 100 závitů, 200 V → 40 V"]},
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
					obsah: "<h2>Vedení elektrického proudu v plynech</h2>\n<p>Vzduch kolem nás je za normálních podmínek <strong>špatný vodič</strong>. Elektrický proud jím skoro neprochází, proto musí spotřebiče vést proud po kabelech. Vzduch ale není dokonalý izolant — je v něm pár nabitých částic, a tak se nabitý elektroskop časem sám pomalu vybije.</p>\n<p>Horký vzduch vede elektřinu mnohem lépe než studený. Když k nabitému elektroskopu přiblížíš hořící svíčku, vybije se rychle. Čím je vzduch teplejší, tím lépe proud vede.</p>\n<h3>Co je ionizace</h3>\n<p>Při vysoké teplotě se molekuly vzduchu pohybují rychle a často do sebe narážejí. Při těchto srážkách se z molekul uvolňují elektrony — tomuto ději se říká <strong>ionizace</strong>.</p>\n<ul>\n<li>Molekula, která elektron ztratí, se stane <strong>kladným iontem</strong>.</li>\n<li>Molekula, která elektron navíc přijme, se stane <strong>záporným iontem</strong>.</li>\n<li>Vzduch pak vede proud, protože v něm létají volné elektrony i ionty.</li>\n</ul>\n<p>Vzduch se dá zionizovat i jinak než teplem — pomáhá třeba kosmické záření z vesmíru. Proto je vzduch vysoko nad zemí mnohem vodivější než u země. Ve výšce 50 kilometrů je vzduch už velmi dobrý vodič.</p>\n<h3>Jiskrový výboj: blesk</h3>\n<p>Když se ve zionizovaném vzduchu náhle spojí kladný a záporný náboj, vznikne <strong>výboj</strong> — krátký, jasně svítící průchod proudu plynem. Nejznámější jiskrový výboj je <strong>blesk</strong>.</p>\n<p>Blesk vzniká mezi mrakem a zemí nebo mezi dvěma mraky. V bouřkovém mraku se třením kapek a ledových krystalků nabije spodek mraku záporně a vršek kladně. Když napětí mezi mrakem a zemí naroste dost vysoko, vzduch se stane vodivým a proud jím rychle proteče.</p>\n<p>Blesk bývá dlouhý 2 až 3 kilometry. Uvnitř dosahuje teplota až <strong>20 000 až 30 000 °C</strong>. Tahle obrovská teplota prudce ohřeje vzduch, ten se rychle rozepne a vznikne hrom. Blesk vidíme dřív, než hrom uslyšíme, protože světlo letí rychleji než zvuk.</p>\n<p>Proti blesku chrání budovy <strong>bleskosvod</strong> — kovová tyč na střeše, spojená drátem se zemí. Vynalezli ho nezávisle na sobě Benjamin Franklin a český vědec Prokop Diviš. Malé jiskrové výboje využívá také zapalovací svíčka v autě.</p>\n<h3>Obloukový výboj: svařování</h3>\n<p>Elektrický oblouk vznikne mezi dvěma <strong>uhlíkovými elektrodami</strong>, které se nejdřív dotknou a pak mírně oddálí. Mezi nimi vznikne jasně zářící proud rozžhaveného plynu.</p>\n<p>Elektrický oblouk se využívá hlavně při <strong>svařování</strong> kovů, ale i při řezání plechů nebo v pecích na tavení kovu. Jeho světlo je tak jasné, že by mohlo poškodit oči — proto musí ten, kdo svařuje, nosit <strong>ochranné brýle nebo štít</strong>.</p>\n<h3>Výboj ve zředěném plynu: zářivky a neonky</h3>\n<p>Ve skleněné trubici s malým množstvím plynu vznikne při ionizaci <strong>výboj ve zředěném plynu</strong>. Barva světla závisí na tom, jaký plyn je v trubici.</p>\n<p>Tento typ výboje se využívá v <strong>zářivkách</strong> a <strong>doutnavkách</strong>, ale i v barevných světelných reklamách — třeba v neonových nápisech.</p>",
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
					interakce2: 'polovodic-dopovani',
					obsah: "<h2>Polovodiče typu N a P, dioda</h2>\n<p>Polovodič vede elektrický proud líp, když do něj přidáme <strong>příměs</strong> — trošku jiného prvku než křemík. Příměsi stačí opravdu málo. Takovému vylepšenému polovodiči se říká <strong>nevlastní polovodič</strong>.</p>\n<p>Podle toho, jaký prvek přidáme, vznikají dva druhy nevlastních polovodičů: <strong>typ N</strong> a <strong>typ P</strong>. Liší se tím, co mají navíc — buď volné elektrony, nebo volná místa po nich.</p>\n\n<h3>Typ N — elektrony navíc</h3>\n<p>Do křemíku přidáme prvek, který má o jeden elektron víc, třeba fosfor, arsen nebo antimon. Tenhle elektron zůstane volný a může se v krystalu pohybovat.</p>\n<p>Volné elektrony nesou záporný náboj, proto se polovodič jmenuje <strong>typ N</strong> — negativní. Proud jím vedou hlavně volné elektrony. Říká se tomu <strong>elektronová vodivost</strong>, protože proud nesou elektrony.</p>\n\n<h3>Typ P — díry navíc</h3>\n<p>Do křemíku přidáme jiný prvek, kterému naopak jeden elektron chybí, třeba bor, hliník, galium nebo indium. Tam, kde elektron chybí, zůstane prázdné místo — říká se mu <strong>díra</strong>.</p>\n<p>Díra se chová jako kladný náboj, proto se polovodič jmenuje <strong>typ P</strong> — pozitivní. Elektrony z okolí do děr přeskakují, a tak se díra jakoby posouvá dál. Říká se tomu <strong>děrová vodivost</strong>, protože proud nesou díry.</p>\n\n<h3>Přechod PN: proud jen jedním směrem</h3>\n<p>Když v jednom krystalu spojíme typ N s typem P, vznikne mezi nimi <strong>přechod PN</strong>. Podle toho, jak polovodič zapojíme do obvodu, se chová úplně jinak.</p>\n<p>V <strong>propustném směru</strong> proud prochází. V <strong>závěrném směru</strong> proud neprochází vůbec — polovodič se chová jako vypnutý spínač.</p>\n<p>V propustném zapojení je typ N připojen k zápornému pólu zdroje a typ P ke kladnému pólu. Volné elektrony se pak pohybují k pólu +, díry k pólu −.</p>\n\n<h3>Dioda a její příbuzní</h3>\n<p><strong>Dioda</strong> je součástka s přechodem PN, která propouští proud jen jedním směrem. Šipka ve značce diody ukazuje směr, kterým proud smí procházet.</p>\n<p>Diody se používají jako <strong>usměrňovač</strong> — mění střídavý proud na stejnosměrný. Najdeš je v úplně každém elektronickém zařízení.</p>\n<p>Zvláštní diody umí i další věci. <strong>Fotodioda</strong> mění dopadající světlo na elektřinu. <strong>LED</strong> (svítivá dioda) naopak mění elektřinu na světlo — svítí jen v propustném zapojení, spotřebuje málo energie a vydrží dlouho.</p>\n\n<h3>Tranzistor a čip</h3>\n<p><strong>Tranzistor</strong> má dva přechody PN a funguje jako moc rychlý spínač — buď proud propustí, nebo ne. Tímhle způsobem počítač zpracovává nuly a jedničky.</p>\n<p>Na jedné malé destičce křemíku, které se říká <strong>čip</strong>, je spojeno miliony tranzistorů. Čipy řídí mobily, počítače i auta.</p>",
					zapis: {"body":["příměs do křemíku → nevlastní polovodič, vyšší vodivost","typ N: elektrony navíc (příměs fosfor, arsen, antimon) → elektronová vodivost","typ P: díry navíc (příměs bor, hliník, galium, indium) → děrová vodivost","přechod PN = styk typu N a typu P","propustný směr: proud prochází","závěrný směr: proud neprochází","propustné zapojení: typ N na záporném pólu zdroje, typ P na kladném; elektrony míří k +, díry k −","dioda: proud jen jedním směrem, usměrňovač","LED (propustný směr): elektřina → světlo"]},
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
					obsah: "<h2>Elektrická energie a její přeměny</h2>\n\n<p>Elektrická energie je výhodná tím, že se snadno mění na jiné druhy energie a naopak.</p>\n\n<h3>Elektrická energie se mění na…</h3>\n<ul>\n<li><strong>tepelnou</strong> — proud zahřívá vodič (větší odpor a proud = více tepla): vařič, žehlička, topení, pájka;</li>\n<li><strong>světelnou</strong> — žárovka, výbojka (reklamy, zářivky), <strong>LED</strong>;</li>\n<li><strong>magnetickou</strong> — kolem vodiče či cívky vzniká pole: elektromagnet;</li>\n<li><strong>pohybovou</strong> — na vodič v magnetickém poli působí síla: elektromotor, reproduktor;</li>\n<li><strong>chemickou</strong> — elektrolýza a pokovování.</li>\n</ul>\n\n<h3>…a naopak vzniká z jiné energie</h3>\n<ul>\n<li><strong>pohybová → elektrická</strong> — elektromagnetická indukce v <strong>alternátoru</strong> (elektrárny);</li>\n<li><strong>magnetická → elektrická</strong> — indukce v <strong>transformátoru</strong>;</li>\n<li><strong>světelná → elektrická</strong> — <strong>solární panely</strong>, fotovoltaika;</li>\n<li><strong>chemická → elektrická</strong> — galvanické články a akumulátory.</li>\n</ul>\n<p>Platí přitom <strong>zákon zachování energie</strong> — energie se jen přeměňuje, nevzniká ani nezaniká.</p>\n\n\n\n<h3>Vzorce pro elektrickou práci a výkon (nad rámec RVP)</h3>\n<p>Přeměny energie umíme i spočítat — vzorce znáš už z 8. ročníku, tady jen stručné zopakování v souvislosti s elektřinou.</p>\n<p><strong>Výkon P</strong> = energie za sekundu, jednotka <strong>watt (W)</strong>. Počítá se <strong>P = U · I</strong>.</p>\n<p><strong>Elektrická práce (energie) W</strong> = <strong>P · t = U · I · t</strong>, jednotka <strong>joule (J)</strong>, v praxi častěji <strong>kilowatthodina (kWh)</strong>. Platí <strong>1 kWh = 3 600 000 J</strong>. Elektroměr doma měří spotřebu právě v kWh a podle ní se platí účet za elektřinu.</p>\n<p>🧮 <strong>Příklad.</strong> Trouba má příkon <strong>2 kW</strong> a peče <strong>1 hodinu</strong>. Kolik elektřiny spotřebuje a kolik za to zaplatíme, když 1 kWh stojí 5 Kč?</p>\n<p><strong>W</strong> = <strong>P</strong> · <strong>t</strong> = 2 · 1 = <strong>2 kWh</strong></p>\n<p>Cena = 2 · 5 = <strong>10 Kč</strong></p>\n\n<h3>Tak proč mluvíme o „spotřebě\" energie?</h3>\n<p>Když energie nezaniká, co se s ní vlastně stane, než přijde účet? Nic se neztratilo — jen skončila jako teplo rozptýlené do okolí. Mixér ohřeje těsto i motor, žárovka pokoj, nabíječka sebe samu. Teplo rozptýlené po celém pokoji už ale nedokážeš sebrat a použít znovu.</p>\n<p>👉 Proto je poctivější říkat, že energii <strong>„znehodnocujeme\"</strong>, ne že ji spotřebováváme. Pořád jí je stejně, jen se z použitelné podoby změnila na nepoužitelnou. Proto žádný stroj nevydá víc energie, než do něj dáme. Proto nemůže existovat <strong>věčný stroj, který by běžel sám od sebe</strong> (perpetuum mobile).</p>\n<p>💡 Zamysli se nad <strong>přímotopem</strong>. Veškerá elektřina v něm skončí jako teplo, takže má účinnost skoro <strong>100 %</strong>. Není to výjimka ze zákona ani protiklad k tomu, co ses učil(a) o ztrátách.</p>\n<p>Je to případ, kdy je „ztrátové\" teplo přesně tím, co po stroji chceme. Totéž teplo je u počítače nebo motoru jen ztráta. Jestli je energie užitečná, nerozhoduje fyzika, ale náš záměr.</p>\n\n<h3>✏️ Zamysli se</h3>\n<p>Vyzkoušej si přeměny energie na zařízeních, o kterých se ve výkladu ještě nemluvilo.</p>\n<ol>\n<li>Diktafon nebo telefon zaznamená tvůj hlas pomocí <strong>mikrofonu</strong>. Uvnitř má mikrofon\n(podobně jako reproduktor) cívku a magnet. Jaká přeměna energie v mikrofonu nastává?\n<details><summary>řešení</summary>Zvuková vlna rozkmitá membránu s cívkou v magnetickém poli. Pohyb cívky pak vyvolá elektrické napětí — jde o přeměnu <strong>pohybová → elektrická</strong>\n(elektromagnetická indukce). Mikrofon pracuje přesně opačně než reproduktor.</details></li>\n<li><strong>Elektrický zvonek</strong> u domovních dveří po zmáčknutí tlačítka klepe kladívkem\no zvonek. Přes jaké mezikroky se elektrická energie promění na zvuk, který slyšíš?\n<details><summary>řešení</summary>Proud protéká cívkou a vytvoří <strong>magnetické</strong> pole,\nto přitáhne kovové kladívko — vzniká <strong>pohybová</strong> energie. Úder kladívka o zvonek\npak rozechvěje vzduch a vznikne zvuk. Řetězec je: elektrická → magnetická → pohybová → zvuková.</details></li>\n<li><strong>Indukční varná deska</strong> se sama téměř nezahřívá, přesto uvaří vodu v hrnci\nrychleji než klasická plotýnka. Kde v tomto případě vzniká teplo a jaké přeměny tomu předchází?\n<details><summary>řešení</summary>Cívka pod deskou vytváří střídavé <strong>magnetické</strong>\npole. To v kovovém dně hrnce vyvolá vířivé elektrické proudy, a teprve ty zahřejí dno hrnce\nodporem materiálu. Přeměna je tedy elektrická → magnetická → (elektrická) → <strong>tepelná</strong>\n— ale teplo vzniká přímo v hrnci, ne v desce.</details></li>\n<li><strong>Powerbanka</strong> nejdřív nabiješ ze zásuvky a později z ní nabiješ telefon.\nPopiš, jaké dvě přeměny energie při tom postupně proběhnou.\n<details><summary>řešení</summary>Při nabíjení powerbanky probíhá přeměna\n<strong>elektrická → chemická</strong> (energie se uloží v akumulátoru). Při nabíjení telefonu\npak probíhá opačná přeměna <strong>chemická → elektrická</strong> — a v telefonu se znovu uloží\njako chemická energie v jeho vlastní baterii.</details></li>\n</ol>",
					zapis: {"body":["Elektrická energie se snadno mění na tepelnou, světelnou, magnetickou, pohybovou nebo chemickou energii.","Pohybová, světelná a chemická energie se mohou naopak měnit na elektrickou energii.","Při přeměnách část energie často skončí jako teplo rozptýlené do okolí.","Žádný stroj nemůže vydat více energie, než do něj dodáme.","výkon P = U · I, energie za sekundu (nad rámec RVP)","elektrická práce W = P · t = U · I · t, jednotka J nebo kWh (nad rámec RVP)"],"zakon":"Energie nevzniká ani nezaniká, pouze se přeměňuje z jednoho druhu na jiný.","vzorec":"P = U · I;  W = P · t = U · I · t","jednotky":["výkon P — watt (W)","elektrická práce (energie) W — joule (J) nebo kilowatthodina (kWh)","elektrické napětí U — volt (V)","elektrický proud I — ampér (A)","čas t — sekunda (s), při výpočtu v kWh hodina (h)","1 kWh = 3 600 000 J"],"vzorecSlovy":"výkon se rovná napětí krát proud; elektrická práce se rovná výkonu krát čas, tedy napětí krát proud krát čas"},
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
					obsah: "<h2>Účinky proudu na organismus, bezpečnost</h2>\n\n<p><strong>Lidské tělo vede elektrický proud.</strong> Proud jím proto snadno prochází. Většinou to škodí: způsobuje popáleniny, křeče svalů a poškození nervů. Lékaři proud přesto někdy využívají léčebně, třeba ve fyzioterapii.</p>\n\n<h3>Jak proud škodí tělu</h3>\n<p>Čím větší proud tělem prochází, tím větší je nebezpečí. Malý proud ucítíš jen jako slabé brnění. Se zvětšujícím se proudem přibývají křeče a bolest, až nakonec hrozí zástava srdce.</p>\n<ul>\n<li>0,5–1 mA (u stejnosměrného proudu asi 2 mA) — první pocit, že proud vůbec teče,</li>\n<li>asi 1–5 mA — brní to, mírně se stahují svaly, tělu to zatím neškodí,</li>\n<li>přibližně 5–15 mA (přesná hranice je u různých lidí trochu jiná a záleží i na tom, jak dlouho proud tělem prochází) — křeč svalů, člověk se <strong>nemůže sám pustit</strong>,</li>\n<li>kolem 25 mA — křeč dýchacích svalů, těžko se dýchá,</li>\n<li>od zhruba 30 mA (při delším průchodu) začíná růst riziko, že se srdce roztřese a přestane pravidelně pumpovat — tomu říkáme <strong>fibrilace</strong>; jistěji nastává kolem 60 mA,</li>\n<li><strong>nad 80 mA</strong> — hrozí, že srdce trvale zastaví; takový úraz bývá smrtelný.</li>\n</ul>\n\n<h3>Co rozhoduje o nebezpečí</h3>\n<p>Kolik proudu tělem poteče, závisí hlavně na odporu kůže. Suchá kůže a suchá obuv mají velký odpor, asi 150 000 Ω, proto z baterie většinou nic neucítíš. Spoléhat se na to ale nejde: stačí zpocené ruce, vlhká podlaha nebo poškozená obuv — a navíc odpor kůže není stálé číslo, čím vyšší napětí na ni působí, tím víc klesá. Přesné hodnoty se u různých zdrojů liší, proto normy pro bezpečnostní výpočty u vyššího napětí počítají s tou nejnepříznivější hodnotou, kolem <strong>2 000 Ω</strong>. Vlhká kůže má tak malý odpor hned od začátku.</p>\n<p>Záleží také na tom, kudy proud tělem prochází. Nejnebezpečnější je cesta přes levou ruku do srdce, nebezpečná je i cesta přes hlavu do mozku. A platí i to, že čím déle proud tělem prochází, tím větší je poškození — proto je tak nebezpečné, že se při silnějším proudu člověk nedokáže sám pustit.</p>\n\n<h3>Bezpečné napětí</h3>\n<p>Ve vlhkých a zvlášť nebezpečných prostorách, jako je koupelna, bazén nebo sklep, platí přísnější mez: stejnosměrné napětí smí být nejvýš 25 V, střídavé jen 12 V. V suchých místnostech jsou meze vyšší — střídavé 50 V, stejnosměrné 120 V. Číslo 50 V vzniklo výpočtem: norma počítá s odporem těla i obuvi asi 1 750 Ω a s tím, že tělem nemá projít víc než <strong>30 mA</strong> — 1 750 Ω × 30 mA vyjde zhruba 50 V. Napětí ze zásuvky, tedy 230 V, je nebezpečné vždycky a všude.</p>\n\n<h3>Zásady bezpečnosti doma i venku</h3>\n<p>Základní pravidla u domácích spotřebičů — mokrá ruka, jistič, poškozené kabely — už znáš z osmé třídy. Tady si řekneme, jak se chovat u vedení venku.</p>\n<ul>\n<li>vysoké stroje a předměty — jeřáb, sklápěč, žebřík, i draka nebo model letadla — nikdy nezvedej ani nepouštěj do blízkosti vedení; ochranné pásmo platí i pro techniku, ne jen pro lidi,</li>\n<li>na poli pod vedením dávej pozor na výšku zemědělských strojů, jako je kombajn nebo postřikovač — dotyk výložníku s drátem je jedna z nejčastějších příčin úrazů elektřinou u dospělých,</li>\n<li>po vichřici nebo bouřce buď u vedení obzvlášť opatrný — spadlý drát bývá právě tehdy.</li>\n</ul>\n\n<h3>⚡ Vedení vysokého napětí</h3>\n<p><strong>Nedotýkáme se nosných stožárů elektrického vedení ani drátů spadlých na zem.</strong> U vysokého napětí navíc nerozhoduje jen dotyk — proud umí <strong>přeskočit vzduchem jako jiskra</strong>, které se říká oblouk. Nebezpečí proto hrozí, i když se stožáru nebo drátu vůbec nedotkneš.</p>\n<p>Proto se k vedení nikdy nepřibližuj a nezkoušej se ho dotknout ani nepřímo — <strong>tyčí, prutem, žebříkem ani dronem</strong>. Ze stejného důvodu se nikdy neleze na stožáry vedení ani na vagony a jiné vysoké konstrukce v jejich blízkosti.</p>\n<p>Proto zákon (energetický zákon č. 458/2000 Sb.) kolem vedení stanovuje <strong>ochranné pásmo</strong> — vzdálenost od krajního drátu, kam se nesmí stavět, sázet stromy ani vjíždět s technikou. Platí, že <strong>čím vyšší napětí vedení má, tím širší ochranné pásmo je</strong>; přesnou šířku pro každou hladinu napětí stanovuje energetický zákon.</p>\n<p>U nejvyššího napětí (nad 400 kV) — to jsou ty obrovské příhradové stožáry, které vídáš v krajině — je ochranné pásmo <strong>30 metrů</strong> od krajního drátu na každou stranu, tedy skoro přesně délka celého basketbalového hřiště. Tak široký pruh země kolem vedení zůstává úmyslně prázdný — nesmí se tam stavět, sázet vysoké stromy ani vjíždět s vysokou technikou, protože u takového napětí je i pouhá blízkost nebezpečná.</p>\n<p><strong>Spadlý drát na zemi bývá pořád pod napětím</strong>, i když se nehýbe a vůbec nejiskří — na pohled to nepoznáš. K němu se nikdy nepřibližuj, ihned volej <strong>112</strong> (případně <strong>150</strong> hasiče) — <strong>155</strong> navíc jen tehdy, je-li někdo zraněný — a od místa odcházej <strong>drobnými krůčky</strong>, nikdy neutíkej velkými skoky.</p>\n\n<h3>První pomoc při úrazu proudem</h3>\n<ol>\n<li><strong>Vypni proud</strong> — vypínačem, jističem nebo pojistkami.</li>\n<li>Pokud to nejde a zraněný se stále dotýká vodiče, odděl ho <strong>izolující tyčí</strong> ze suchého dřeva nebo plastu. <strong>Nikdy se ho ani jeho oděvu nedotýkej holou rukou</strong>, dokud není mimo dosah proudu. U vysokého napětí se raději vůbec nepřibližuj, viz výše.</li>\n<li><strong>Volej 155 souběžně</strong> — zapni si hlasitý odposlech, nebo pošli volat někoho jiného. Nečekej, až budeš s pomocí hotový.</li>\n<li><strong>Nedýchá normálně?</strong> Začni stlačovat hrudník. Puls nehledej, jen ztrácíš čas a laik ho stejně spolehlivě nenahmatá.</li>\n</ol>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Proč zásuvka zabíjí, i když jsi úplně suchý? Spočítáme to Ohmovým zákonem: <strong>I = U : R</strong>. Zásuvka má napětí U = 230 V. Pro bezpečnostní výpočet se u tak vysokého napětí nepočítá s klidovým odporem suché kůže, ale s opatrně nízkým odporem R = 2 000 Ω — stejně jako u mokré kůže, protože stačí málo (zpocení, vlhko) a na tuhle hodnotu odpor skutečně klesne.</p>\n<p>I = U : R = 230 : 2 000 = 0,115 A, tedy <strong>115 mA</strong>.</p>\n<p>Podívej se do tabulky výš: 115 mA je hluboko nad 80 mA, tedy v pásmu zástavy srdce. Proto je zásuvka 230 V nebezpečná vždycky — ať jsi suchý, nebo mokrý.</p>",
					zapis: {"jednotky":["elektrický proud — značíme I, jednotka A (ampér); v příkladech měříme v miliampérech (mA), 1 mA = 0,001 A","elektrický odpor — značíme R, jednotka Ω (ohm)","elektrické napětí — značíme U, jednotka V (volt)"],"body":["tělo vede proud — čím proud, tím horší poškození","0,5–1 mA cítíš, od 30 mA roste riziko fibrilace srdce (jistě kolem 60 mA), nad 80 mA zástava srdce","čím déle proud teče, tím větší poškození — proto je nebezpečné, že se člověk nemůže pustit","sucho: odpor asi 150 000 Ω; při vlhku, nebo u napětí nad 50 V (bezpečnostní odhad): jen asi 2 000 Ω","nejnebezpečnější cesta: ruka → srdce, hlava → mozek","bezpečné napětí: stejnosměrné 25 V, střídavé 12 V (vlhké prostory)","zásuvka 230 V je nebezpečná vždy","stožáry, dráty vedení, spadlý drát — nikdy se nedotýkat","u vysokého napětí hrozí i oblouk bez dotyku","úraz proudem: vypnout → nedotýkat se holou rukou → volat 155 → stlačovat hrudník"]},
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
					obsah: "<h2>Jádro atomu</h2>\n\n<p>Atom je základní stavební částice, ze které je tvořeno úplně všechno kolem nás. Je velmi malý — jeho velikost je řádově 10⁻¹⁰ m, do jednoho milimetru by se jich vešlo 10 milionů za sebou. Každý atom se skládá ze dvou částí: <strong>jádra</strong> uprostřed a <strong>obalu</strong> kolem něj.</p>\n\n<h3>Obal a jádro atomu</h3>\n<p><strong>Obal atomu</strong> tvoří <strong>elektrony</strong> — záporně nabité částice, které se pohybují kolem jádra. Elektrony se dají z atomu snadno uvolnit třením. V kovech se volně pohybují a vytvářejí <strong>elektrický proud</strong>.</p>\n<p><strong>Jádro atomu</strong> tvoří <strong>protony</strong> (kladně nabité) a <strong>neutrony</strong> (bez náboje). Společně se nazývají <strong>nukleony</strong>. Jádro je vzhledem k celému atomu velice malé — je asi stotisíckrát menší než atom sám.</p>\n<p>Přestože je jádro tak malé, je v něm soustředěna <strong>téměř všechna hmotnost atomu</strong>. Proton i neutron váží asi 1 800krát víc než elektron, hmotnost elektronů se proto dá zanedbat.</p>\n<p>Proton a elektron mají náboj stejně velký, jen s opačným znaménkem. Za normálních podmínek je atom <strong>elektricky neutrální</strong> — počet protonů v jádře se rovná počtu elektronů v obalu.</p>\n\n<h3>🔬 Jak jsme objevovali atom (modely atomu)</h3>\n<ul>\n<li><strong>Daltonův model (1803)</strong> — atom jako malá, nedělitelná kulička; každý prvek má své vlastní atomy</li>\n<li><strong>Thomsonův model (1897)</strong> — „rozinky v pudinku\": J. J. Thomson objevil elektron; atom si představoval jako kladnou hmotu (pudink) s rozptýlenými elektrony (rozinkami)</li>\n<li><strong>Rutherfordův model (1911)</strong> — pokus s ostřelováním zlaté fólie ukázal, že téměř všechna hmota je v malém kladném <strong>jádře</strong> a elektrony obíhají kolem</li>\n<li><strong>Bohrův model (1913)</strong> — elektrony obíhají jen po určitých drahách (slupkách) s danou energií, „jako planety kolem Slunce\"</li>\n<li><strong>Moderní kvantový model</strong> — elektron nemá přesnou dráhu; známe jen oblasti (<strong>orbitaly</strong>), kde se nejpravděpodobněji nachází</li>\n</ul>\n<p>👉 Každý nový pokus model vylepšil — věda se vyvíjí postupným zpřesňováním.</p>\n\n<h3>Protonové a nukleonové číslo</h3>\n<p><strong>Protonové číslo Z</strong> udává počet protonů v jádře. Jednoznačně určuje, o jaký chemický prvek jde — každý prvek najdeme v periodické tabulce podle jeho protonového čísla.</p>\n<p><strong>Nukleonové číslo A</strong> udává počet všech nukleonů v jádře, tedy protonů a neutronů dohromady. Určuje hmotnost jádra, a tedy skoro celého atomu.</p>\n<p>Počet neutronů spočítáme jako rozdíl obou čísel: <strong>N = A − Z</strong>. Jádro uranu zapisujeme ²³⁸U — má protonové číslo 92 a nukleonové číslo 238. Počet neutronů proto je 238 − 92 = 146. Atom je neutrální, takže má i 92 elektronů.</p>\n\n<h3>Izotopy</h3>\n<p><strong>Izotopy</strong> jsou různé druhy atomů téhož prvku. Mají stejné protonové číslo, ale <strong>různé nukleonové číslo</strong> — liší se počtem neutronů. Chemické vlastnosti mají stejné, liší se jen hmotností a chováním při jaderných reakcích.</p>\n<p>Například uhlík se v přírodě vyskytuje jako tři izotopy: uhlík ¹²C, uhlík ¹³C a uhlík ¹⁴C. Všechny mají 6 protonů, ale liší se počtem neutronů.</p>\n<p>Zajímavý je i vodík, který má tři izotopy s vlastními jmény. <strong>Lehký vodík</strong> (protium) má 1 proton a žádný neutron. <strong>Deuterium</strong> (těžký vodík) má navíc 1 neutron, je proto dvakrát těžší. <strong>Tritium</strong> (supertěžký vodík) má neutrony dva, v přírodě je vzácné a je radioaktivní.</p>\n\n<h3>Nuklid a značení prvků</h3>\n<p><strong>Nuklid</strong> je skupina úplně stejných atomů — mají stejné protonové i stejné nukleonové číslo. Izotopy uhlíku dohromady tvoří prvek uhlík, ale jeden konkrétní izotop, třeba uhlík 12, je už jeden nuklid.</p>\n<p>Prvek zapisujeme jeho značkou, třeba C pro uhlík nebo U pro uran. Nukleonové číslo píšeme vlevo nahoře vedle značky, protonové číslo vlevo dole.</p>\n<p>Uran s 92 protony a 238 nukleony tak zapíšeme ²³⁸₉₂U. Nuklid uhlíku se 6 protony a 12 nukleony zapíšeme ¹²₆C.</p>\n\n<h3>Jaderné síly</h3>\n<p><strong>Jaderné síly</strong> jsou velmi silné přitažlivé síly, které drží nukleony v jádře pohromadě. Působí jen na velmi krátkou vzdálenost — pouze uvnitř jádra.</p>\n<p>Musí překonat odpudivou elektrickou sílu mezi protony, které se navzájem odpuzují. Čím je jádro větší, tím je méně stabilní a má větší sklon se rozpadnout.</p>\n\n<h3>Relativní atomová hmotnost a síla v jádře (nad rámec RVP)</h3>\n<p><strong>Relativní atomová hmotnost A<sub>r</sub></strong> udává, kolikrát je atom těžší než jeden proton — proton je totiž hmotnost nejlehčího atomu, vodíku.</p>\n<p>U jednoho nuklidu je to vždy celé číslo — je rovné jeho nukleonovému číslu. Nuklid uhlíku ¹²C má proto A<sub>r</sub> = 12.</p>\n<p>Prvky se ale v přírodě většinou vyskytují jako směs víc izotopů v různém poměru, a proto v tabulkách najdeš u prvků desetinné číslo — je to průměr přes všechny izotopy podle jejich zastoupení. Železo má relativní atomovou hmotnost 55,85, protože je směsí izotopů (nejvíc ⁵⁶Fe, dál ⁵⁴Fe, ⁵⁷Fe a ⁵⁸Fe).</p>\n<p>Jaderné síly z odstavce výš musí uvnitř jádra překonávat obrovský odpor. Dva protony vedle sebe se navzájem elektricky odpuzují silou asi <strong>230 N</strong> — tak velkou silou tlačí na zem těleso o hmotnosti přes <strong>23 kg</strong>, třeba pytel brambor. A to je síla mezi jen dvěma nepatrnými částicemi, mnohonásobně menšími než celý atom.</p>\n<p>Že jádro navzdory tomu drží pohromadě, dokazuje, jak ohromně silné jaderné síly ve skutečnosti jsou. Musí tuhle odpudivou sílu spolehlivě přemoct, a navíc udržet pohromadě klidně i stovky nukleonů najednou. Proto se z jádra při běžných dějích — hoření, tření, chemických reakcích — nikdy nic neuvolní. K rozbití jádra je potřeba mnohem víc energie, než jakou máme běžně po ruce.</p>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p>Vztah N = A − Z umíme použít pro libovolné jádro. U uranu (Z = 92, A = 238) vyjde N = 238 − 92 = 146 neutronů. U uhlíku ¹²C (Z = 6, A = 12) vyjde N = 12 − 6 = 6 neutronů. U uhlíku ¹⁴C (Z = 6, A = 14) vyjde N = 14 − 6 = 8 neutronů — proto má víc neutronů a je těžší.</p>\n<p>Když se protony a neutrony spojí do jádra, výsledné jádro je <strong>lehčí</strong> než součet hmotností všech nukleonů zvlášť. Tomuto rozdílu říkáme <strong>hmotnostní úbytek</strong>.</p>\n<p>Chybějící hmotnost se přemění na energii, která nukleony v jádře drží pohromadě — na <strong>vazebnou energii</strong>. Platí pro ni Einsteinův vzorec <strong>E = m · c²</strong>, kde m je hmotnostní úbytek a c je rychlost světla.</p>\n<p>Rychlost světla je obrovské číslo — 300 000 km/s, tedy 300 000 000 m/s — a ve vzorci se navíc umocňuje. Proto i malinký hmotnostní úbytek uvolní obrovské množství energie. Proto je jaderná energie mnohem silnější než energie z hoření (chemických reakcí).</p>",
					zapis: {"vzorec":"N = A − Z      (odvozeně: A = N + Z,  Z = A − N)      E = m · c²      (odvozeně: m = E : c²)","jednotky":["počet neutronů N — bez jednotky","nukleonové číslo A — počet nukleonů (bez jednotky)","protonové číslo Z — počet protonů (bez jednotky)","vazebná energie E — značíme E, jednotka J (joule)","hmotnostní úbytek m — značíme m, jednotka kg (kilogram)","rychlost světla c — značíme c, jednotka m/s (metr za sekundu)","300 000 km/s = 300 000 000 m/s. Do vztahu E = m · c² dosazuj m v kg a c v m/s; energie vyjde v J."],"vzorecSlovy":"počet neutronů = nukleonové číslo minus protonové číslo; vazebná energie = hmotnostní úbytek krát druhá mocnina rychlosti světla","body":["atom = jádro + obal (elektrony)","jádro = protony (+) a neutrony (0) = nukleony","jádro je asi 100 000× menší než atom","v jádře je téměř celá hmotnost atomu","proton, neutron ≈ 1 800× hmotnost elektronu","atom neutrální: počet protonů = počet elektronů","Z = protonové číslo → určuje prvek","A = nukleonové číslo → počet nukleonů","N = A − Z (počet neutronů)","izotopy: stejné Z, různé A (jiný počet neutronů)","nuklid: stejné Z i stejné A","jaderné síly: krátký dosah, drží jádro pohromadě","hmotnostní úbytek → vazebná energie E = m · c²","relativní atomová hmotnost Ar: kolikrát je atom těžší než proton (nad rámec RVP)","u nuklidu je Ar celé číslo = nukleonové číslo, u prvku je to průměr izotopů (nad rámec RVP)","2 protony v jádře se odpuzují silou asi 230 N (nad rámec RVP)"]},
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jádro atomu a síly v jádře', cesta: 'gbUMqax9SMs' },
						{ druh: 'youtube', nazev: 'Video: Atom, iont, izotop', cesta: '5WUfEMAbwQM' },
						{ druh: 'youtube', nazev: 'Video: Atomy a modely', cesta: 'uszDiE3FDQk' },
						{ druh: 'video', nazev: 'Píseň: Síla z jádra 🎵', cesta: '/materialy/fyzika/9-rocnik/jaderna-fyzika/jadro-atomu/pisen-sila-z-jadra.m4a' },
					],
				},
				{
					slug: 'kvarky',
					nazev: 'Kvarky (nad rámec RVP)',
					interakce: 'kvarky',
					obsah: "<h2>Kvarky (nad rámec RVP)</h2>\n\n<p>Jádro atomu drží pohromadě jaderné síly mezi protony a neutrony. Ale ani proton a neutron nejsou ty úplně nejmenší kousky hmoty — samy se skládají z ještě menších částic.</p>\n\n<ul>\n<li>Proton a neutron nejsou nejmenší kousky hmoty.</li>\n<li>Skládají se ze tří ještě menších částic, kterým se říká <strong>kvarky</strong>.</li>\n<li>Kvark je zatím nejmenší známá částice, ze které se skládá proton a neutron.</li>\n<li>Kvarky v protonu i neutronu drží pohromadě velmi silná jaderná síla.</li>\n<li>Kvark se zatím nikomu nepodařilo rozdělit na nic menšího.</li>\n</ul>",
					zapis: {"body":["proton a neutron nejsou nejmenší kousky hmoty","proton i neutron se skládají ze tří kvarků","kvark = nejmenší známá částice, ze které se skládá proton a neutron","kvarky drží pohromadě velmi silná jaderná síla","kvark se zatím nikomu nepodařilo rozdělit dál"]},
				},
				{
					slug: 'radioaktivita',
					nazev: 'Radioaktivita, ochrana před zářením',
					interakce: 'rozpad',
					obsah: "<h2>Radioaktivita, ochrana před zářením</h2>\n\n<p>Roku <strong>1896</strong> objevil francouzský fyzik <strong>Henri Becquerel</strong>, že uranová ruda vydává neviditelné záření. Šlo o rudu zvanou <strong>smolinec</strong> z Jáchymova.</p>\n<p>Manželé <strong>Marie a Pierre Curieovi</strong> ho zpracovali celý vagon a získali jen asi <strong>0,1 gramu</strong> nových prvků polonia a radia. Zjistili také, že záření má <strong>tři složky</strong> — dnes jim říkáme alfa, beta a gama. Později <strong>Ernest Rutherford</strong> dokázal, že záření vychází přímo z jádra atomu.</p>\n<p><strong>Radioaktivita</strong> je <strong>samovolný rozpad nestabilních jader</strong>. Jádra těžších prvků se sama mění na jiná a přitom uvolňují <strong>ionizující záření</strong> — záření, které dokáže z atomů vyrážet elektrony. Člověk tento rozpad nijak neovlivní. Látky, které záření vydávají, nazýváme <strong>radionuklidy</strong> — třeba uran, radium nebo radon.</p>\n\n<h3>Druhy záření a co je zastaví</h3>\n<ul>\n<li><strong>Záření α (alfa)</strong> — proud jader helia (2 protony + 2 neutrony), kladné; protonové číslo se sníží o 2. <strong>Zastaví ho list papíru</strong> (dolet ve vzduchu jen ~5 cm).</li>\n<li><strong>Záření β (beta)</strong> — proud rychlých elektronů z jádra (neutron se změní na proton a elektron); protonové číslo se zvětší o 1. Zastaví ho <strong>hliníkový plech</strong>.</li>\n<li><strong>Záření γ (gama)</strong> — elektromagnetické záření s velmi vysokou energií, <strong>nejpronikavější a nejnebezpečnější</strong>; zastaví ho jen silná vrstva <strong>olova nebo betonu</strong>.</li>\n</ul>\n\n<h3>Poločas rozpadu</h3>\n<p><strong>Poločas rozpadu T</strong> je doba, za kterou se rozpadne <strong>přesně polovina</strong> jader. Různé radionuklidy ho mají různý — uran 238 má poločas asi <strong>4,5 miliardy let</strong>, radon 222 jen <strong>3,8 dne</strong>. Po každém dalším poločasu klesne množství zase na polovinu.</p>\n<p>Uhlík 14 má poločas <strong>5 730 let</strong>. Po této době se přemění přesně polovina uhlíku 14 na dusík. Proto se uhlík 14 používá k <strong>určování stáří</strong> starých nálezů, třeba kostí nebo dřeva.</p>\n\n<h3>Ochrana před zářením</h3>\n<p>Před zářením se chráníme třemi způsoby. <strong>Stínění</strong> hustým materiálem záření pohltí — třeba olovo nebo beton. Pomáhá i <strong>bezpečná vzdálenost</strong> od zdroje a co nejkratší <strong>doba</strong>, kterou u něj strávíme. Dávku záření, kterou tělo přijme, měříme v <strong>sievertech (Sv)</strong> pomocí <strong>dozimetru</strong> — přístroje, který záření zaznamenává.</p>\n\n<h3>🏠 Radon v domě</h3>\n<p><strong>Radon</strong> je přírodní radioaktivní plyn, který stoupá z podloží a může pronikat prasklinami do domů. Není vidět ani cítit — pozná se <strong>jen měřením</strong>. V Česku je radonu v podloží hodně (žula), proto se s ním počítá při každé stavbě.</p>\n<ul>\n<li><strong>Nechat změřit</strong> — měřicí detektory zjistí, kolik radonu doma je (hádání nestačí)</li>\n<li><strong>Často větrat</strong> — čerstvý vzduch množství radonu v místnosti snižuje</li>\n<li><strong>Utěsnit a opravit dům</strong> — uzavřít praskliny v podlaze a odvést radon mimo dům</li>\n</ul>\n\n<h3>Využití radioaktivity</h3>\n<p>Radioaktivita má i užitečné stránky. Lékaři ozařováním léčí nádory a radioaktivitu využívají i přístroje kolem nás.</p>\n<ul>\n<li><strong>určování stáří</strong> (uhlík <sup>14</sup>C)</li>\n<li><strong>léčba nádorů</strong> ozařováním</li>\n<li><strong>detektory kouře</strong></li>\n<li><strong>defektoskopie</strong> — hledání skrytých vad uvnitř materiálu</li>\n<li><strong>zdroj energie</strong> pro vesmírné sondy</li>\n</ul>",
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
					obsah: "<h2>Jaderný reaktor a jaderná elektrárna</h2>\n\n<p><strong>Jaderný reaktor</strong> je zařízení, ve kterém probíhá <strong>řízená řetězová reakce</strong>. Uvnitř se štěpí jádra uranu a uvolňuje se teplo. Nejrozšířenější typ se jmenuje <strong>vodní tlakový reaktor</strong>.</p>\n<p>Místo, kde reakce probíhá, se nazývá <strong>aktivní zóna</strong>. Je uvnitř silné ocelové <strong>tlakové nádoby</strong>. Kolem celého reaktoru je ještě ochranný obal z oceli a betonu — <strong>kontejnment</strong>. Ten brání tomu, aby záření uniklo ven.</p>\n\n<h3>Palivo a moderátor</h3>\n<p><strong>Palivem</strong> reaktoru je obohacený <strong>uran 235</strong> (oxid uraničitý), slisovaný do tyčí. V jednom kilogramu uranu je tolik energie jako v celém vagonu uhlí.</p>\n<p>Neutrony, které se při štěpení uvolní, jsou moc rychlé na to, aby dobře štěpily další jádra. Proto je v reaktoru <strong>moderátor</strong> — látka, která neutrony zpomalí na vhodnou rychlost. Jako moderátor slouží voda, těžká voda nebo grafit.</p>\n\n<h3>Regulační tyče a chladivo</h3>\n<p><strong>Regulační tyče</strong> jsou z bórové oceli a pohlcují neutrony navíc. Zasunutím hlouběji do aktivní zóny reakci zpomalíme, vysunutím ji zrychlíme — takhle obsluha řídí výkon reaktoru.</p>\n<p>Pro nouzové případy jsou tu ještě <strong>havarijní tyče</strong> z kadmia. Ty dokážou řetězovou reakci rychle úplně zastavit.</p>\n<p><strong>Chladivo</strong> odvádí teplo z aktivní zóny — nejčastěji je to voda. Aby zůstala kapalná i při teplotě kolem 300 °C, je pod velkým tlakem asi 16 MPa (megapascalů, jednotka tlaku).</p>\n\n<h3>Jak vzniká elektřina</h3>\n<p>Jaderná elektrárna funguje podobně jako elektrárna tepelná. Liší se jen v tom, odkud se bere teplo — tady z řízeného štěpení jader, ne ze spalování uhlí.</p>\n<p>Teplo vyrobí páru. Pára roztočí <strong>turbínu</strong> spojenou s <strong>generátorem</strong> a generátor vyrobí elektřinu.</p>\n<p>Voda v elektrárně proudí ve <strong>dvou oddělených okruzích</strong>. Primární okruh je radioaktivní a vede přímo u reaktoru, kde ohřívá vodu. Přes výměník tepla předá teplo sekundárnímu okruhu, který vede páru k turbíně, generátoru a kondenzátoru — ten páru zase zchladí zpět na vodu.</p>\n\n<h3>Bezpečnost a jaderný odpad</h3>\n<p><strong>Výhody:</strong> jaderná elektrárna nevypouští do ovzduší skleníkové plyny — uniká z ní jen čistá vodní pára. Je také velmi účinná: na stejné množství elektřiny stačí mnohem méně paliva než u uhelné elektrárny.</p>\n<p><strong>Nevýhody:</strong> použité, „vyhořelé\" palivo zůstává radioaktivní a musí se bezpečně skladovat i tisíce let; teprve se hledá způsob, jak ho dál využít. Uran je stejně jako uhlí nebo ropa <strong>neobnovitelný</strong> zdroj.</p>\n<p>Stavba elektrárny i výroba obohaceného uranu jsou velmi nákladné. A případná havárie by mohla mít <strong>katastrofické následky</strong> — proto reaktor chrání havarijní tyče i kontejnment zároveň.</p>\n\n<h3>Temelín a Dukovany</h3>\n<p>V České republice vyrábějí elektřinu dvě jaderné elektrárny: <strong>Temelín</strong> a <strong>Dukovany</strong>.</p>\n<p>Malé jaderné reaktory pohánějí i ponorky, ledoborce a kosmické sondy. Používají se i k výrobě <strong>radiofarmak</strong> — léků s malým množstvím radioaktivní látky, které lékařům pomáhají vyšetřit tělo.</p>",
					zapis: {"jednotky":["tlak chladiva — značíme p, jednotka MPa (megapascal); v reaktoru přibližně 16 MPa"],"body":["reaktor: řízená řetězová reakce","typ: vodní tlakový reaktor","palivo: obohacený uran 235","moderátor: zpomaluje neutrony","regulační tyče: řídí výkon (bórová ocel)","havarijní tyče: rychlé zastavení (kadmium)","chladivo: odvádí teplo, voda pod tlakem","elektrárna: teplo → pára → turbína → generátor","dva okruhy: primární (u reaktoru), sekundární (turbína, generátor, kondenzátor)","výhody: bez skleníkových plynů, úsporné palivo","nevýhody: odpad na tisíce let, riziko havárie","ČR: Temelín, Dukovany","jinde: ponorky, sondy, radiofarmaka"]},
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
					obsah: "\n\t\t\t\t\t\t<h2>Obnovitelné a neobnovitelné zdroje energie</h2>\n\t\t\t\t\t\t<p>Přírodní zdroje energie, ze kterých vyrábíme elektřinu nebo poháníme stroje, dělíme do dvou skupin.</p>\n\n\t\t\t\t\t\t<h3>Obnovitelné zdroje</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>stále se obnovují a doplňují</strong> — slunce svítí dál, vítr fouká dál, pokácený les zase doroste,</li>\n\t\t\t\t\t\t<li>patří sem <strong>sluneční záření, vítr, tekoucí voda, geotermální proudy, biomasa a bioplyn i vodík</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>👉 „Obnovitelný\" ale neznamená „nevyčerpatelný\". Vytěžený les nebo přetížený geotermální vrt potřebují čas, než se vzpamatují, a mohou dojít stejně jako uhlí. Rozhoduje <strong>rychlost, jakou se zdroj obnovuje</strong>, ne jeho množství.</p>\n\t\t\t\t\t\t<p>🔍 <strong>Vodík je zvláštní případ.</strong> Řadíme ho mezi obnovitelné zdroje. Na Zemi se ale volný skoro nevyskytuje — musíme ho <strong>vyrobit</strong> (nejčastěji elektrolýzou vody), a to spotřebuje energii.</p>\n\t\t\t\t\t\t<p>Proto se o vodíku často mluví spíš jako o <strong>nosiči energie</strong>. Umí energii uchovat a přenést, třeba pro auta na vodíkový pohon — podobně jako baterie.</p>\n\n\t\t\t\t\t\t<h3>Neobnovitelné zdroje</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>jsou jen v <strong>omezeném množství</strong> a za určitou dobu se vyčerpají,</li>\n\t\t\t\t\t\t<li><strong>fosilní paliva</strong> — uhlí, ropa, zemní plyn (vznikla ze zbytků odumřelých organismů v zemské kůře bez přístupu vzduchu),</li>\n\t\t\t\t\t\t<li>ropné břidlice a písky, <strong>jaderné palivo</strong>.</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h3>Druhy elektráren</h3>\n\t\t\t\t\t\t<p>Podle využitého zdroje stavíme elektrárny <strong>jaderné</strong> (zpravidla obohacený uran 235), <strong>tepelné</strong> (spalují fosilní paliva), <strong>sluneční</strong> (fotovoltaické), <strong>větrné</strong>, <strong>vodní</strong> a <strong>geotermální</strong>.</p>\n\n\t\t\t\t\t\t<h3>☀️ Skoro všechno je vlastně sluneční energie</h3>\n\t\t\t\t\t\t<p>Když se u každého zdroje zeptáš „a odkud se ta energie vzala?\", dojdeš skoro pokaždé ke stejné odpovědi — ke <strong>Slunci</strong>:</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>vítr</strong> vzniká tím, že Slunce ohřívá vzduch nerovnoměrně,</li>\n\t\t\t\t\t\t<li><strong>vodní</strong> elektrárna žije z koloběhu vody, a ten pohání sluneční teplo, které vodu vypařuje,</li>\n\t\t\t\t\t\t<li><strong>biomasa</strong> je energie zachycená fotosyntézou,</li>\n\t\t\t\t\t\t<li><strong>uhlí a ropa</strong> jsou vlastně totéž — sluneční energie, kterou zachytily rostliny. Stalo se to před stovkami milionů let a od té doby energie ležela pod zemí.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Jen tři zdroje ze Slunce nepocházejí: <strong>jaderná</strong>, <strong>geotermální</strong> a <strong>přílivová</strong> energie. Jaderná energie pochází z jader atomů. Geotermální teplo je z velké části z rozpadu radioaktivních prvků v zemském nitru.</p>\n\t\t\t\t\t\t<p><strong>Přílivová</strong> energie si bere energii z otáčení Země. Měsíc svou gravitací jen „drží\" příliv na místě, planeta se pod ním otáčí. Země se tím opravdu, i když nepatrně, zpomaluje.</p>\n\t\t\t\t\t\t<p>👉 Rozdíl mezi obnovitelným a neobnovitelným zdrojem tedy není v tom, <strong>odkud</strong> energie je. Je v tom, <strong>jak rychle se doplňuje</strong>: uhlí vznikalo desítky milionů let, vítr fouká zítra znovu.</p>\n\n\t\t\t\t\t\t<h3>Přečerpávací elektrárna</h3>\n\t\t\t\t\t\t<p>Sluneční panel nevyrábí v noci a větrník za bezvětří. Naopak v poledne dodá elektrárna víc, než je zrovna potřeba. Elektřina se přitom <strong>ve velkém špatně skladuje</strong> a sítí musí každou vteřinu protékat přesně tolik, kolik se právě spotřebuje.</p>\n\t\t\t\t\t\t<p>Příkladem řešení této potíže v ČR je <strong>Dlouhé stráně</strong> v Jeseníkách — obrovská <strong>baterie z vody</strong>. Ukládá energii: když je v síti přebytek elektřiny (v noci), <strong>přečerpá vodu z dolní nádrže do horní</strong>. V době špičky přes den vodu <strong>vypustí zpět dolů</strong> a roztočí turbínu s generátorem.</p>\n\t\t\t\t\t\t<p>Přečerpáním se část energie ztratí, takže dolů se jí vrátí míň, než kolik stálo čerpání nahoru. Přesto se to vyplatí — <strong>elektřina, která by se jinak vůbec nevyužila, takhle počká</strong> na chvíli, kdy je jí potřeba.</p>\n\n\t\t\t\t\t\t<h3>Zamysli se / Z praxe</h3>\n\t\t\t\t\t\t<ol>\n\t\t\t\t\t\t<li>Malá vesnice si pořídila jen sluneční elektrárnu jako <strong>jediný</strong> zdroj elektřiny pro celou nemocnici. Proč je to nebezpečný nápad?\n\t\t\t\t\t\t<details><summary>řešení</summary>Sluneční panely v noci nevyrábí vůbec a přes den závisí na počasí — výkon <strong>nejde poručit</strong>. Nemocnice ale potřebuje elektřinu nepřetržitě (přístroje na oddělení JIP, chlazení léků). Musí mít vždy záložní zdroj (např. dieselový agregát nebo připojení do sítě), který doplní výpadek.</details></li>\n\t\t\t\t\t\t<li>Přečerpávací elektrárna čerpá v noci a vyrábí ve dne. Proč se jí to i přes ztráty vyplatí, když by se dalo čekat, že je to „zbytečná práce navíc\"?\n\t\t\t\t\t\t<details><summary>řešení</summary>Elektřinu ve velkém nejde uskladnit jinak (baterie na celé město by byly obrovské a drahé). Noční elektřina z jaderných nebo větrných elektráren by jinak <strong>propadla bez užitku</strong>, protože v noci je nízká spotřeba. I se ztrátou 25 % je lepší část energie zachránit a použít ji přes den ve špičce, než ji nevyužít vůbec.</details></li>\n\t\t\t\t\t\t<li>Je vodík obnovitelný zdroj energie? Zdůvodni.\n\t\t\t\t\t\t<details><summary>řešení</summary>Ano, řadí se mezi obnovitelné zdroje. Na Zemi se ale v čisté podobě skoro nevyskytuje — musí se <strong>vyrobit</strong> (nejčastěji elektrolýzou vody), a to stojí energii. Proto se mu často říká <strong>nosič energie</strong> (jako baterie). Umí energii uchovat a přenést, ne ji sám „zadarmo\" dodat jako slunce nebo vítr.</details></li>\n\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t<h3>Pro zvídavé: počítáme</h3>\n\t\t\t\t\t\t<p>Modelová přečerpávací elektrárna má čerpadla o výkonu <strong>500 MW</strong> a turbíny o výkonu <strong>750 MW</strong>.</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>V noci čerpadla běží <strong>8 hodin</strong> → spotřebují 500 MW × 8 h = <strong>4 000 MWh</strong>.</li>\n\t\t\t\t\t\t<li>Přes den turbíny vyrábí <strong>4 hodiny</strong> → vyrobí 750 MW × 4 h = <strong>3 000 MWh</strong>.</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p>Zpátky se tedy vrátí jen 3 000 MWh ze 4 000 MWh. Cestou se ztratí 1 000 MWh, tedy 25 % (tření vody v potrubí, teplo na ložiskách čerpadel a turbín). I tak se to vyplatí: bez přečerpávání by se noční přebytek elektřiny nevyužil vůbec.</p>\n\t\t\t\t\t",
					zapis: {"jednotky":["výkon elektrárny — značíme P, jednotka W (watt); v energetice MW (megawatt)","vyrobená nebo spotřebovaná energie — značíme E, jednotka Wh (watthodina); v energetice MWh (megawatthodina); základní jednotka je joule, 1 Wh = 3 600 J","1 MWh = energie při výkonu 1 MW po dobu 1 hodiny"],"body":["obnovitelné: stále se obnovují a doplňují","obnovitelné: sluneční záření, vítr, voda, geotermální proudy","obnovitelné: biomasa, bioplyn, vodík","čerpat jen tak rychle, jak se obnoví","neobnovitelné: omezené množství, časem se vyčerpají","fosilní paliva: uhlí, ropa, zemní plyn","vznik: zbytky organismů bez přístupu vzduchu","neobnovitelné: ropné břidlice a písky, jaderné palivo","elektrárny: jaderné, tepelné, sluneční, větrné","elektrárny: vodní, geotermální","jaderná elektrárna: palivo obohacený uran 235","vodík: obnovitelný zdroj, ale nosič energie","vodík se vyrábí elektrolýzou vody","skoro vše je uložená sluneční energie","výjimky: jaderná, geotermální, přílivová energie","sluneční a větrné: výkon nejde poručit","elektřina se ve velkém špatně skladuje","přečerpávací elektrárna: baterie z vody","v noci čerpá vodu do horní nádrže","přes den vypouští vodu, roztáčí turbínu"]},
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
					odkazy: [{"nazev":"Planety.astro.cz: Sluneční soustava","url":"https://planety.astro.cz/soustava/1864-slunecni-soustava"},{"nazev":"Wikipedie: Sluneční soustava","url":"https://cs.wikipedia.org/wiki/Slune%C4%8Dn%C3%AD_soustava"}],
					slug: 'slunecni-soustava',
					nazev: 'Sluneční soustava',
					interakce: 'soustava',
					obsah: "<h2>Sluneční soustava</h2>\n<p>Sluneční soustavu tvoří hvězda <strong>Slunce</strong> v centru. Kolem ní se v jejím <strong>gravitačním poli</strong> pohybují další tělesa: planety a jejich měsíce, trpasličí planety a planetky. Patří sem i komety a meteoroidy.</p>\n<p>Patří sem také <strong>meteorické roje</strong> a drobné prachové částice; ty tvoří meziplanetární látku.</p>\n\n<h3>Slunce</h3>\n<ul>\n\t<li>Žhavá koule <strong>plazmatu</strong> o průměru asi <strong>1,4 milionu km</strong> (váží jako 330 tisíc Zemí).</li>\n\t<li>V jádru je teplota <strong>15 milionů °C</strong>. Probíhají tam <strong>termonukleární reakce</strong> (vodík se slučuje na helium) — to je zdroj veškeré energie Slunce.</li>\n\t<li>V jádru je obrovský tlak a hustota <strong>9krát větší</strong> než olovo.</li>\n\t<li>Kolem vlastní osy se Slunce otočí jednou za <strong>25 dní</strong>.</li>\n\t<li>Na viditelném povrchu je teplota <strong>4 000 °C až 6 000 °C</strong>. Sluneční skvrny mají nižší teplotu, proto jsou tmavší.</li>\n\t<li>Při sluneční erupci vytryskne ze Slunce oblak chladnějšího plazmatu zvaný <strong>protuberance</strong>. Slunce má i vlastní <strong>magnetické pole</strong>.</li>\n\t<li>Svítí už 4,5 miliardy let a ještě stejně dlouho bude.</li>\n</ul>\n\n<h3>Osm planet</h3>\n<p>Merkur, Venuše, Země, Mars, Jupiter, Saturn, Uran, Neptun.</p>\n\n<h3>Kamenné planety</h3>\n<p><strong>Kamenné planety</strong> (Merkur, Venuše, Země, Mars) jsou nejblíž Slunci. Mají <strong>pevný povrch</strong> a málo nebo žádné měsíce.</p>\n<ul>\n\t<li><strong>Merkur</strong> — nejmenší planeta, vzhledem podobná Měsíci (plná kráterů), má jen velmi řídkou atmosféru a nemá žádný měsíc.</li>\n\t<li><strong>Venuše</strong> — má nejhustší atmosféru ze všech planet (oxid uhličitý) s tlakem skoro <strong>100krát větším</strong> než na Zemi. Na povrchu je kvůli skleníkovému efektu asi <strong>460 °C</strong>. Je téměř stejně velká jako Země, proto se jí říká „sesterská planeta Země\". Na obloze ji vidíme jako jitřenku nebo večernici.</li>\n\t<li><strong>Země</strong> — jediná planeta s podmínkami pro život. Díky jejímu pohybu kolem Slunce máme <strong>4 roční období</strong>, díky otáčení kolem vlastní osy se střídá den a noc. Kolem Země obíhá <strong>Měsíc</strong>, který k ní má vázanou rotaci — vidíme z něj stále jen jednu stranu. Měsíc má fáze (nov, první čtvrt, úplněk, poslední čtvrt) a jeho gravitace na Zemi způsobuje příliv a odliv.</li>\n\t<li><strong>Mars</strong> — „rudá planeta\" (barvu dávají horniny s oxidem železa). Má dva malé měsíce <strong>Phobos</strong> a <strong>Deimos</strong>, v překladu Děs a Hrůza. Na Marsu je nejvyšší sopka celé sluneční soustavy, <strong>Olympus Mons</strong> (24 km nad okolím). Den na Marsu se nazývá <strong>Sol</strong> a trvá skoro stejně dlouho jako na Zemi (asi 24 hodin a 40 minut), planeta má poloviční průměr, desetkrát menší hmotnost a třikrát slabší gravitaci než Země.</li>\n</ul>\n\n<h3>Plynné planety</h3>\n<p><strong>Plynné planety</strong> (Jupiter, Saturn, Uran, Neptun) jsou „plynní obři\" bez pevného povrchu. Jsou složené hlavně z vodíku a helia jako Slunce a mají mnoho měsíců. Rychle se otáčejí kolem vlastní osy, proto jsou mírně zploštělé. V jejich atmosférách je kromě vodíku a helia i metan a čpavek — ty jim dávají barvu.</p>\n<ul>\n\t<li><strong>Jupiter</strong> — největší planeta, má víc než 95 měsíců a je jich nejvíc ze všech planet. Čtyři největší měsíce (Io, Europa, Ganymed, Callisto) objevil už v sedmnáctém století Galileo Galilei. V jeho atmosféře zuří obří bouře zvaná <strong>Velká rudá skvrna</strong>. Jeho silná gravitace ovlivňuje i další tělesa, třeba planetky a komety.</li>\n\t<li><strong>Saturn</strong> — má nažloutlou barvu a výrazné <strong>prstence</strong> z ledu, prachu a kamení. Jeho hustota je menší než hustota vody. Má druhý největší počet měsíců ze všech planet. Největší z nich je <strong>Titan</strong> — jediný měsíc ve sluneční soustavě s hustou atmosférou.</li>\n\t<li><strong>Uran</strong> — „ledový obr\" s modrozelenou barvou a slabšími prstenci. Je to <strong>nejchladnější planeta</strong> sluneční soustavy (teplota atmosféry až <strong>−220 °C</strong>) s větrem až <strong>900 km/h</strong>. Jako jediná planeta má osu otáčení natočenou „naležato\".</li>\n\t<li><strong>Neptun</strong> — také ledový obr, s podobným složením jako Uran a extrémně silným prouděním v atmosféře.</li>\n</ul>\n\n<h3>Další tělesa sluneční soustavy</h3>\n<ul>\n\t<li><strong>Trpasličí planety</strong> — podobné planetám, ale v jejich blízkosti obíhají další podobná tělesa. Patří sem <strong>Pluto</strong>, dřív počítané mezi planety; dnes obíhá až za Neptunem spolu s Eris, Haumea a Makemake. Patří sem i <strong>Ceres</strong> — je podobná Měsíci a obíhá v pásu planetek mezi Marsem a Jupiterem.</li>\n\t<li><strong>Planetky (asteroidy)</strong> — drobná kamenná a kovová tělesa nepravidelného tvaru o velikosti od <strong>100 metrů do 1 kilometru</strong>. Většina jich obíhá v <strong>hlavním pásu mezi Marsem a Jupiterem</strong>, některé mohou křížit dráhu Země. Je jich přes <strong>200 tisíc</strong>, dobře prozkoumaná je jen asi desetina z nich. Některé nesou česká jména, třeba Šumava, Sázava nebo Komenský.</li>\n\t<li><strong>Kuiperův pás</strong> — pás těles za Neptunem tvořený zmrzlým metanem, čpavkem a vodou. Patří sem i trpasličí planety Pluto, Haumea a Makemake.</li>\n\t<li><strong>Komety</strong> — obíhají po protáhlých elipsách. Jádro komety je pevné těleso z ledu a prachu o velikosti několika kilometrů. Při přiblížení ke Slunci se začne odpařovat a vzniká <strong>ohon</strong> dlouhý i stovky milionů kilometrů. Nejznámější je Halleyova kometa, která se vrací každých <strong>76 let</strong>; nové komety se stále objevují.</li>\n\t<li><strong>Meteoroid</strong> vzniká rozpadem komety. <strong>Meteor</strong> („padající hvězda\") je jev, kdy meteoroid v atmosféře shoří. Co dopadne na zem, je <strong>meteorit</strong>.</li>\n\t<li><strong>Meteorické roje</strong> — meteory přicházející ve stejnou dobu ze stejného směru na obloze. Jmenují se podle souhvězdí, odkud přilétají, třeba <strong>Perseidy</strong> (srpen) nebo <strong>Leonidy</strong> (listopad).</li>\n</ul>\n\n<h3>Vzdálenosti a pohyb</h3>\n<ul>\n\t<li><strong>Astronomická jednotka (AU)</strong> = střední vzdálenost Země–Slunce, asi <strong>150 milionů km</strong>.</li>\n\t<li><strong>Světelný rok (ly)</strong> = vzdálenost, kterou urazí světlo za rok (9,46 bilionu km). Například hvězda <strong>Polárka</strong> je od nás vzdálená 433 světelných let.</li>\n\t<li><strong>Parsek (pc)</strong> — další jednotka pro vzdálenosti hvězd. Je to vzdálenost, ze které by astronomická jednotka byla vidět pod úhlem jedné úhlové vteřiny.</li>\n\t<li><strong>1. Keplerův zákon</strong>: planety obíhají kolem Slunce po elipsách.</li>\n\t<li><strong>2. Keplerův zákon</strong>: čím blíž je planeta Slunci, tím rychleji se pohybuje. Platí to i takto: poměr rychlostí planety ve dvou místech dráhy je opačný než poměr jejích vzdáleností od Slunce.</li>\n</ul>\n\n<h3>Pro zvídavé: počítáme</h3>\n<p><strong>3. Keplerův zákon</strong> dává do vztahu oběžnou dobu planety <strong>T</strong> a její střední vzdálenost od Slunce <strong>a</strong>. Poměr druhých mocnin oběžných dob dvou planet se rovná poměru třetích mocnin jejich vzdáleností. Dobu T dosazujeme v letech, vzdálenost a v astronomických jednotkách (AU).</p>\n<p>Země má oběžnou dobu T₁ = 1 rok a vzdálenost a₁ = 1 AU. Vymyšlená planeta má vzdálenost a₂ = 4 AU. Jakou má oběžnou dobu T₂?</p>\n<p>T₁² : T₂² = a₁³ : a₂³ → 1² : T₂² = 1³ : 4³ → 1 : T₂² = 1 : 64 → T₂² = 64 → T₂ = <strong>8</strong></p>\n<p>Vymyšlená planeta má oběžnou dobu <strong>T₂ = 8 let</strong> — oběh kolem Slunce jí trvá osmkrát déle než Zemi.</p>",
					zapis: {"vzorec":"T₁² : T₂² = a₁³ : a₂³ (T = oběžná doba planety, a = střední vzdálenost od Slunce)","jednotky":["oběžná doba planety — značíme T, jednotka rok","střední vzdálenost od Slunce — značíme a, jednotka AU (astronomická jednotka)","1 AU = 150 milionů km (střední vzdálenost Země od Slunce)","1 ly (světelný rok) = 9,46 bilionu km (dráha, kterou urazí světlo za 1 rok)","1 pc (parsek) = vzdálenost, ze které je vidět 1 AU pod úhlem jedné úhlové vteřiny","Do vzorce dosazuj oběžnou dobu v letech a vzdálenost od Slunce v AU."],"vzorecSlovy":"poměr druhých mocnin oběžných dob dvou planet je roven poměru třetích mocnin jejich středních vzdáleností od Slunce","zakon":"Keplerovy zákony: Planety obíhají kolem Slunce po elipsách a čím blíž jsou Slunci, tím rychleji se pohybují. Poměr druhých mocnin jejich oběžných dob se rovná poměru třetích mocnin jejich středních vzdáleností od Slunce (třetí Keplerův zákon).","body":["soustava: Slunce + tělesa v jeho poli","Slunce: žhavá koule plazmatu","Slunce: průměr 1,4 mil. km","jádro Slunce: 15 mil. °C","povrch Slunce: 4 000–6 000 °C","8 planet: Merkur až Neptun","kamenné: Merkur, Venuše, Země, Mars","plynné: Jupiter, Saturn, Uran, Neptun","trpasličí planety: Pluto, Ceres aj.","planetky: hlavní pás Mars–Jupiter","komety: ohon při přiblížení Slunci","meteoroid: vzniká rozpadem komety","meteor: padající hvězda","meteorit: dopad na Zemi","AU = 150 milionů km","světelný rok: dráha světla za rok","1. Keplerův zákon: dráhy jsou elipsy","2. Keplerův zákon: blíž Slunci, rychleji","3. Keplerův zákon: poměr T² = poměr a³"]},
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
						<h3>1. <a href="../../jaderna-fyzika/">Jaderná fyzika</a></h3>
						<ul><li>jádro atomu (protony, neutrony, izotopy); radioaktivita a druhy záření; poločas rozpadu a ochrana; štěpení jader a řetězová reakce; jaderný reaktor a jaderná elektrárna</li></ul>
						<h3>2. <a href="../../energie-a-vesmir/">Zdroje energie a vesmír</a></h3>
						<ul><li>obnovitelné a neobnovitelné zdroje energie, přehled elektráren</li></ul>
						<h3>3. <a href="../../magneticke-pole/">Magnetické pole</a></h3>
						<ul><li>magnety (opakování); magnetické pole vodiče s proudem a cívky; elektromagnet a jeho využití</li></ul>
						<h3>4. <a href="../../indukce-a-stridavy-proud/">Elektromagnetická indukce a střídavý proud</a></h3>
						<ul><li>elektromotor; elektromagnetická indukce; vznik střídavého proudu a alternátor; vlastnosti střídavého proudu; transformátor (U₂ : U₁ = N₂ : N₁)</li></ul>
						<h3>📋 Klíčové vztahy</h3>
						<ul>
							<li>počet neutronů N = A − Z; vazebná energie E = m · c²</li>
							<li>záření α (jádra helia), β (rychlé elektrony), γ (elektromagnetické)</li>
							<li>střídavý proud v síti: 50 Hz, 230 V; frekvence f = 1 : T</li>
						</ul>
					`,
					zapis: {
						body: [
							'Jaderná fyzika popisuje jádro atomu, izotopy, radioaktivitu a druhy záření, poločas rozpadu a jaderné reakce v reaktoru.',
							'Zdroje energie dělíme na obnovitelné a neobnovitelné; probíráme přehled elektráren.',
							'Magnetické pole vzniká také kolem vodiče s proudem a cívky; elektromagnet toto pole využívá.',
							'Elektromagnetická indukce umožňuje vznik střídavého proudu v alternátoru a transformátor mění jeho napětí.',
							'Střídavý proud v elektrické síti má frekvenci 50 Hz a napětí 230 V.',
						],
						vzorec: 'N = A − Z      (odvozeně: A = N + Z,  Z = A − N)      E = m · c²      f = 1 : T',
						jednotky: [
							'počet neutronů N — bez jednotky',
							'nukleonové číslo A — počet nukleonů (bez jednotky)',
							'protonové číslo Z — počet protonů (bez jednotky)',
							'vazebná energie E — značíme E, jednotka J (joule)',
							'hmotnostní úbytek m — značíme m, jednotka kg (kilogram)',
							'rychlost světla c — značíme c, jednotka m/s (metr za sekundu)',
							'perioda — značíme T, jednotka s (sekunda)',
							'frekvence — značíme f, jednotka Hz (hertz)',
						],
					},
				},
				{
					slug: 'rocni-shrnuti',
					nazev: 'Roční shrnutí',
					obsah: "\n\t\t\t\t\t\t<h2>Co máš umět za celý 9. ročník</h2>\n\t\t\t\t\t\t<p>Přehled učiva celého ročníku. Dole na stránce najdeš <strong>souhrnný kvíz</strong> z otázek všech témat roku.</p>\n\t\t\t\t\t\t<h3>1. <a href=\"../../magneticke-pole/\">Magnetické pole</a></h3>\n\t\t\t\t\t\t<ul><li>magnety, pole vodiče a cívky, elektromagnet</li></ul>\n\t\t\t\t\t\t<h3>2. <a href=\"../../indukce-a-stridavy-proud/\">Elektromagnetická indukce a střídavý proud</a></h3>\n\t\t\t\t\t\t<ul><li>indukce, alternátor, vlastnosti střídavého proudu, elektromotor, transformátor</li></ul>\n\t\t\t\t\t\t<h3>3. <a href=\"../../elektricky-proud-v-latkach/\">Elektrický proud v látkách</a></h3>\n\t\t\t\t\t\t<ul><li>kapaliny, plyny, polovodiče a dioda, chemické zdroje, přenos elektrické energie</li></ul>\n\t\t\t\t\t\t<h3>4. <a href=\"../../elektricka-energie-a-bezpecnost/\">Elektrická energie a bezpečnost</a></h3>\n\t\t\t\t\t\t<ul><li>přeměny elektrické energie; účinky proudu na organismus a bezpečnost</li></ul>\n\t\t\t\t\t\t<h3>5. <a href=\"../../jaderna-fyzika/\">Jaderná fyzika</a></h3>\n\t\t\t\t\t\t<ul><li>jádro atomu (protony, neutrony, izotopy); radioaktivita (α, β, γ, poločas rozpadu); jaderná energie a reakce; reaktor a jaderná elektrárna</li></ul>\n\t\t\t\t\t\t<h3>6. <a href=\"../../energie-a-vesmir/\">Zdroje energie a vesmír</a></h3>\n\t\t\t\t\t\t<ul><li>obnovitelné a neobnovitelné zdroje energie; sluneční soustava (8 planet, AU, světelný rok, Keplerovy zákony); vesmír a jeho vznik, galaxie a Hubbleův zákon</li></ul>\n\t\t\t\t\t\t<h3>📋 Klíčové vztahy a hodnoty</h3>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>transformátor: U₂ : U₁ = N₂ : N₁</li>\n\t\t\t\t\t\t\t<li>počet neutronů N = A − Z; vazebná energie E = m · c²</li>\n\t\t\t\t\t\t\t<li>frekvence f = 1 : T; síť 50 Hz a 230 V; výkon P = U · I</li>\n\t\t\t\t\t\t\t<li>záření α (helium), β (elektrony), γ (elektromagnetické) — ochrana vzdáleností, stíněním a časem</li>\n\t\t\t\t\t\t\t<li>1 AU = 150 milionů km; světelný rok = vzdálenost, kterou světlo urazí za rok</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t",
							zapis: {"body":["Magnetické pole vzniká kolem magnetu, vodiče s proudem i cívky; k tématu patří také elektromagnet.","Elektromagnetická indukce se využívá v alternátoru a transformátor mění elektrické napětí.","Elektrický proud mohou vést kapaliny, plyny i polovodiče; k učivu patří také dioda, chemické zdroje a přenos elektrické energie.","Elektrická energie se přeměňuje na jiné druhy energie a při práci s proudem musíme dodržovat bezpečnost.","Jaderná fyzika popisuje jádro atomu, radioaktivitu a jadernou energii; závěr roku patří zdrojům energie, sluneční soustavě a vesmíru."],"vzorec":"U₂ : U₁ = N₂ : N₁      (odvozeně: U₂ = U₁ · N₂ : N₁,  U₁ = U₂ · N₁ : N₂,  N₂ = N₁ · U₂ : U₁,  N₁ = N₂ · U₁ : U₂)","jednotky":["vstupní napětí U₁ — volt (V)","výstupní napětí U₂ — volt (V)","počet závitů vstupní cívky N₁ — bez jednotky","počet závitů výstupní cívky N₂ — bez jednotky","Napětí dosazuj ve stejných jednotkách, obvykle ve voltech; počty závitů jsou celá čísla."]},
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
						{ nazev: 'Programování — podmínky, postavy a události (Nová informatika, ZŠ Holice)', url: 'https://vyuka.zsholice.cz/programovani-podminky-postavy-a-udalosti/' },
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
						{ nazev: 'Lekce 4 — Proměnné ve Scratchi (ITnetwork)', url: 'https://www.itnetwork.cz/pro-deti/scratch/promenne-ve-scratchi' },
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
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.gov.cz/' },
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
						{ nazev: 'Micro:bit ve výuce — nápady na projekty (microbiti.cz)', url: 'https://www.microbiti.cz/search/label/projekty' },
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
						{ nazev: 'Micro:bit ve výuce — nápady na projekty (microbiti.cz)', url: 'https://www.microbiti.cz/search/label/projekty' },
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
						{ nazev: 'Micro:bit ve výuce — nápady na projekty (microbiti.cz)', url: 'https://www.microbiti.cz/search/label/projekty' },
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
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.gov.cz/' },
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
						{ nazev: 'kurzy NÚKIB — osveta.nukib.cz', url: 'https://osveta.nukib.gov.cz/' },
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
					interakce: 'tinkercad',
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
					interakce: 'sketchup',
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

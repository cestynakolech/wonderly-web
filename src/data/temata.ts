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
	interakce?: 'hydraulika' | 'skupenstvi' | 'obvod' | 'hustota' | 'teplomer' | 'skladani-sil' | 'vrh' | 'teziste' | 'cara' | 'binarni' | 'pakety' | 'paka' | 'magnet' | 'kladka' | 'ohm' | 'rychlost' | 'odraz' | 'lom' | 'mesic' | 'hydrostatika' | 'vlneni' | 'zapojeni' | 'transformator' | 'rozpad' | 'soustava' | 'ohrev' | 'elektrovani' | 'valec' | 'planety-vaha' | 'atom-molekuly' | 'izotopy' | 'difuze' | 'tlak-plocha' | 'cocka' | 'zrcadlo' | 'stupnice' | 'prevody' | 'ozobot' | 'prace' | 'kadinky' | 'treni' | 'archimedes' | 'kalorimetr' | 'skatepark' | 'indukce' | 'elektromagnet' | 'rovinne-zrcadlo' | 'motor' | 'dioda' | 'barometr' | 'oko' | 'elektrolyza' | 'barvy' | 'alternator' | 'elektromotor' | 'vyparovani' | 'jiskra' | 'duha' | 'reaktor' | 'decibely' | 'pretlak' | 'svacina' | 'prenos' | 'graf-cesta' | 'naklonena-rovina' | 'ucinky-sily' | 'meridla' | 'odpor-vodice' | 'odpor-vodice-zaklad' | 'reostat' | 'tabulka-vzorce' | 'souradnice' | 'promenne' | 'led-displej' | 'vetveni' | 'opakovani' | 'udalosti' | 'vlastni-bloky' | 'bludiste' | 'funkce-tabulky' | 'senzory-robota' | 'klonovani' | 'microbit-vstupy' | 'microbit-radio' | 'vexcode' | 'sestaveni-robota' | 'motory-displej-zvuk' | 'projekt-robot' | 'ping-pong' | 'honicka' | 'strilecka' | 'skakacka' | 'razeni-filtrovani' | 'vykon' | 'elektricke-pole' | 'oersted' | 'ucinnost-motoru' | 'kolobeh-vody' | 'vnitrni-energie' | 'tuhnuti' | 'kondenzace';
	/** Druhá interaktivní simulace na téže stránce (zobrazí se pod první) */
	interakce2?: 'kolejnice' | 'prumer';
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
					`,
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
							<li><strong>Daniel Gabriel Fahrenheit</strong> — velice přesný rtuťový teploměr a vlastní stupnice (teplota lidského těla ≈ 98 °F); používá se v anglicky mluvících zemích</li>
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
							<li><strong>přenosné zdroje</strong> — baterie a akumulátory: tužkový článek 1,5 V, plochá baterie 4,5 V, autobaterie 12,6 V</li>
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
					obsah: `
						<h2>Klid a pohyb tělesa</h2>
						<p><strong>Pohyb tělesa</strong> je změna polohy tělesa vzhledem k jinému tělesu.</p>
						<p>Těleso je vzhledem k jinému tělesu <strong>v klidu</strong>, pokud se vzhledem k němu nepohybuje.</p>
						<p>👉 Vždy záleží na pozorovateli: cestující ve vlaku je <strong>v klidu vzhledem k sedadlu</strong>, ale <strong>v pohybu vzhledem k lidem na nástupišti</strong>. Klid a pohyb jsou relativní.</p>
						<h3>Trajektorie a dráha</h3>
						<ul>
							<li><strong>Trajektorie</strong> je čára, po které se těleso pohybuje — může být viditelná (stopa lyžaře) i myšlená (let letadla)</li>
							<li><strong>Dráha (s)</strong> je délka trajektorie; fyzikální veličina se základní jednotkou <strong>metr (m)</strong></li>
						</ul>
						<h3>Druhy pohybu podle tvaru trajektorie</h3>
						<ul>
							<li><strong>přímočarý</strong> — trajektorií je přímka (jedoucí výtah)</li>
							<li><strong>křivočarý</strong> — trajektorií je křivka (slalom lyžaře, hod míčem)</li>
						</ul>
					`,
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
					obsah: `
						<h2>Posuvný a otáčivý pohyb</h2>
						<p>Existují <strong>dva základní jednoduché pohyby</strong> těles. Všechny složitější pohyby jsou z nich složené.</p>
						<h3>Posuvný pohyb</h3>
						<p>Každý bod tělesa se pohybuje <strong>stejným směrem a stejnou rychlostí</strong> po úplně stejné trajektorii — každý bod urazí stejnou dráhu.</p>
						<img src="/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-pohyb.jpg" alt="Posuvný pohyb trojúhelníkového pravítka" />
						<p>Příklady: vlak na rovné trati, zboží na pokladním pásu, letadlo při dálkovém letu.</p>
						<h3>Otáčivý pohyb</h3>
						<p>Body tělesa se pohybují <strong>po kružnicích</strong> se středy na <strong>ose otáčení</strong>. Osa může být uvnitř tělesa (krasobruslařka při piruetě) i mimo něj (auto na kruhovém objezdu).</p>
						<img src="/obrazky/fyzika/7-rocnik/pohyb-a-rychlost/otacivy-pohyb.jpg" alt="Otáčivý pohyb trojúhelníkového pravítka" />
						<p>👉 <strong>Čím dál je bod od osy otáčení, tím větší kružnici opisuje a pohybuje se rychleji</strong> — konec hodinové ručičky je rychlejší než její střed.</p>
						<h3>Složený pohyb</h3>
						<p>Kombinace jednoduchých pohybů:</p>
						<ul>
							<li><strong>Země</strong> — otáčí se kolem vlastní osy a zároveň obíhá kolem Slunce</li>
							<li><strong>šroub</strong> — otáčí se a přitom se posouvá; trajektorie má tvar <strong>šroubovice</strong></li>
							<li>horská dráha, akrobatický let, gymnasta na hrazdě</li>
						</ul>
					`,
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
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb/infografika-prehled.jpg',
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
						<h3>Okamžitá a průměrná rychlost</h3>
						<ul>
							<li><strong>okamžitá rychlost</strong> — jak rychle se těleso pohybuje právě teď; ukazuje ji tachometr nebo policejní radar</li>
							<li><strong>průměrná rychlost</strong> — celková dráha děleno celkový čas celého pohybu</li>
						</ul>
						<h3>Druhy pohybu podle rychlosti</h3>
						<ul>
							<li><strong>rovnoměrný</strong> — rychlost se nemění (eskalátor, hodinová ručička, auto na dálnici)</li>
							<li><strong>nerovnoměrný</strong> — rychlost se mění; <strong>zrychlený</strong> (start rakety, rozjíždění autobusu) nebo <strong>zpomalený</strong> (brždění vlaku)</li>
						</ul>
						<p>⚠️ Pozor: mezi m/s a km/h se <strong>neposouvá desetinná čárka</strong>! Hodina má 3 600 s a kilometr 1 000 m — proto koeficient 3,6 (10 m/s = 36 km/h).</p>
					`,
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Rychlost: základy fyziky v pohybu',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/infografika-zaklady-rychlosti.jpg',
						},
						{
							druh: 'infografika',
							nazev: 'Tahák: rychlost pohybu',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas/infografika-prehled.jpg',
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
						Cyklista urazí v závodu etapu dlouhou 220 km za 5 hodin a 30 minut. Jakou jel rychlostí?</p>
						<p>5 h 30 min = 5,5 h<br>v = s : t = 220 : 5,5 = <strong>40 km/h</strong></p>
						<p>💡 Zkouška po hlavě: 5,5 &middot; 40 = 220 km — souhlasí.</p>

						<p><strong>Příklad 8: Turistický výlet</strong><br>
						Turisté ušli v rovinatém terénu vzdálenost 3 km za 36 minut. Vypočítej jejich rychlost.</p>
						<p>36 min = 0,6 h<br>v = s : t = 3 : 0,6 = <strong>5 km/h</strong></p>

						<p><strong>Příklad 9: Dopravní letadlo</strong><br>
						Dopravní letadlo uletělo vzdálenost 650 km za 1 hodinu 18 minut. Vypočti jeho průměrnou rychlost.</p>
						<p>18 min = 0,3 h, takže celkový čas je 1 h + 0,3 h = 1,3 h<br>v = s : t = 650 : 1,3 = <strong>500 km/h</strong></p>
						<p>💡 Zkouška po hlavě: 1,3 &middot; 500 = 650 km — souhlasí.</p>
						<p>⚠️ <strong>Pozor na častou chybu:</strong> kdo u příkladu 9 vydělí dráhu jen 0,3 h (zapomene na celou hodinu), vyjde mu přes 2 000 km/h — tak rychle dopravní letadla nelétají! Minuty vždy převeď (děleno 60) a přičti k celým hodinám.</p>
						<h3>Pravidla pro kreslení grafů</h3>
						<ol>
							<li>dvě kolmé osy se šipkami; <strong>časová osa je vždy vodorovná</strong></li>
							<li>popiš osy značkami veličin a jednotkami</li>
							<li>na osy rovnoměrné stupnice podle naměřených hodnot</li>
							<li>vynes body z tabulky a spoj je</li>
						</ol>
						<p>Graf rychlosti rovnoměrného pohybu je <strong>vodorovná přímka</strong>; graf dráhy je <strong>přímka stoupající vzhůru</strong>.</p>
						<h3>✏️ Procvič si: příklady z hodiny</h3>
						<p>Nejdřív počítej sám (v = s / t), pak si rozklikni řešení.</p>
						<ol>
							<li>Auto ujelo 200 km za 4 hodiny. Jaká byla průměrná rychlost? <details><summary>řešení</summary>v = 200 / 4 = <strong>50 km/h</strong></details></li>
							<li>Běžec na lyžích urazil 30 km za 2 hodiny. <details><summary>řešení</summary>v = 30 / 2 = <strong>15 km/h</strong></details></li>
							<li>Cyklisté ujeli 45 km za 3 hodiny. <details><summary>řešení</summary>v = 45 / 3 = <strong>15 km/h</strong></details></li>
							<li>Vlak ujel 360 km za 4 hodiny. <details><summary>řešení</summary>v = 360 / 4 = <strong>90 km/h</strong></details></li>
							<li>Turista ušel 6 km za 120 minut. Rychlost v km/h? <details><summary>řešení</summary>120 min = 2 h; v = 6 / 2 = <strong>3 km/h</strong></details></li>
							<li>Žák uběhl 100 m za 20 s. Rychlost v m/s? <details><summary>řešení</summary>v = 100 / 20 = <strong>5 m/s</strong> (= 18 km/h)</details></li>
							<li>Cyklista urazil etapu 220 km za 5 h 30 min. <details><summary>řešení</summary>5 h 30 min = 5,5 h; v = 220 / 5,5 = <strong>40 km/h</strong> (zkouška: 5,5 · 40 = 220)</details></li>
							<li>Turisté ušli 3 km za 36 minut. <details><summary>řešení</summary>36 min = 0,6 h; v = 3 / 0,6 = <strong>5 km/h</strong></details></li>
							<li>Letadlo uletělo 650 km za 1 h 18 min. <details><summary>řešení</summary>18 min = 0,3 h → celkem 1,3 h; v = 650 / 1,3 = <strong>500 km/h</strong> (zkouška: 1,3 · 500 = 650). ⚠️ Častá chyba: dělit jen 0,3 h — vyšlo by přes 2 000 km/h!</details></li>
						</ol>
					`,
					materialy: [
						{
							druh: 'infografika',
							nazev: 'Tahák: rovnoměrný pohyb — vzorce a grafy',
							cesta: '/materialy/fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti/infografika-prehled.jpg',
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
					obsah: `
						<h2>Síla</h2>
						<p><strong>Síla</strong> je fyzikální veličina, která popisuje vzájemné působení těles.</p>
						<p>Značka veličiny: <strong>F</strong> &nbsp; Jednotka: <strong>N (newton)</strong></p>
						<p>Síla je určená <strong>velikostí</strong>, <strong>směrem</strong> a <strong>působištěm</strong>, proto ji zakreslujeme pomocí šipky. Velikost šipky odpovídá zvolenému měřítku (např. 1 cm = 1 N).</p>

						<h3>Druhy sil</h3>
						<ul>
							<li><strong>Elektrická síla</strong> – např. zelektrizované pravítko přitahuje papírky</li>
							<li><strong>Magnetická síla</strong> – např. magnet přitahuje železné předměty</li>
							<li><strong>Gravitační (tíhová) síla</strong> – tělesa se navzájem přitahují, čím větší těleso, tím větší síla</li>
							<li><strong>Třecí síla</strong> – působí na těleso tažené po podložce</li>
						</ul>
						<p>Mezi další síly patří <strong>tahová</strong>, <strong>tlaková</strong> a <strong>vztlaková</strong> síla.</p>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/tahova-sila.png" alt="Jeřáb – příklad tahové síly" />

						<h3>Směr síly a působiště</h3>
						<p>Směr síly udává směr šipky, <strong>působiště</strong> je bod, ve kterém síla na těleso působí.</p>
						<p>Podle umístění působiště na tělese může mít síla <strong>posuvné</strong> nebo <strong>otáčivé</strong> účinky.</p>
					`,
					materialy: [
						{ druh: 'infografika', nazev: 'Tahák: síla a její znázornění', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/sila/infografika-prehled.jpg' },
					],
				},
				{
					slug: 'gravitacni-sila',
					interakce: 'vrh',
					nazev: 'Gravitační síla',
					obsah: `
						<h2>Gravitační síla</h2>
						<p>Každé těleso o hmotnosti 1 kg je k Zemi přitahováno silou přibližně 10 N. Tomuto poměru mezi gravitační silou a hmotností říkáme <strong>gravitační konstanta</strong> a značíme ji <strong>g</strong>.</p>
						<p>Na Zemi platí: <strong>g = 10 N/kg</strong></p>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila-vzorec.jpg" alt="Vzorec Fg = m . g" />

						<h3>Vzorec</h3>
						<p><strong>Fg = m · g</strong></p>
						<ul>
							<li>m ... hmotnost [kg]</li>
							<li>Fg ... gravitační síla [N]</li>
							<li>g ... gravitační konstanta = 10 N/kg</li>
						</ul>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila-priklad.jpg" alt="Těleso o hmotnosti 100 g je přitahováno k Zemi silou 1 N" />

						<h3>Příklad: Vypočítej sílu, kterou jsou tělesa přitahována k Zemi</h3>
						<p><strong>Žehlička</strong> (m = 0,6 kg)<br>
						Fg = m · g = 0,6 · 10 = <strong>6 N</strong></p>
						<p><strong>Auto</strong> (m = 1 200 kg)<br>
						Fg = m · g = 1 200 · 10 = 12 000 N = <strong>12 kN</strong></p>
						<p><strong>Ocelový nosník</strong> (m = 1,4 t = 1 400 kg)<br>
						Fg = m · g = 1 400 · 10 = 14 000 N = <strong>14 kN</strong></p>

						<h3>Procvič si</h3>
						<p>1) Těleso o hmotnosti 40 kg<br>
						Fg = 40 · 10 = <strong>400 N</strong></p>
						<p>2) Těleso je k Zemi přitahováno silou 12 kN. Jaká je jeho hmotnost?<br>
						m = Fg : g = 12 000 : 10 = <strong>1 200 kg</strong></p>
						<p>3) Těleso je k Zemi přitahováno silou 7 kN. Jaká je jeho hmotnost?<br>
						m = Fg : g = 7 000 : 10 = <strong>700 kg</strong></p>
						<p>4) Auto o hmotnosti 1 600 kg<br>
						Fg = 1 600 · 10 = 16 000 N = <strong>16 kN</strong></p>
						<p>5) Těleso o hmotnosti 12 t (12 000 kg)<br>
						Fg = 12 000 · 10 = 120 000 N = <strong>120 kN</strong></p>
					`,
					materialy: [
						{ druh: 'infografika', nazev: 'Tahák: gravitační síla', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila/infografika-prehled.jpg' },
					],
				},
				{
					slug: 'treci-sila',
					interakce: 'treni',
					nazev: 'Třecí síla',
					obsah: `
						<h2>Třecí síla</h2>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/treci-sila-piktogram.png" alt="Třecí síla – lyžař" />
						<p><strong>Třecí síla</strong> je síla, která působí proti síle působící na těleso.</p>
						<ul>
							<li>Pokud je třecí síla <strong>větší</strong>, těleso zůstává v klidu.</li>
							<li>Pokud je síla působící na těleso <strong>větší</strong> než třecí síla, těleso se pohybuje.</li>
						</ul>

						<h3>Vzorec</h3>
						<p><strong>Ft = Fn · f</strong></p>
						<ul>
							<li>Ft ... třecí síla [N]</li>
							<li>Fn ... normálová síla – přítlačná síla působící kolmo na podložku pod tělesem [N]</li>
							<li>f ... součinitel tření – závisí na povrchu, drsnosti a druhu materiálu (uveden v tabulkách). V klidu je větší, při pohybu klesá.</li>
						</ul>

						<h3>Příklad</h3>
						<p>Vypočti třecí sílu, která vzniká při tlačení ocelového tělesa o hmotnosti 50 kg po dřevěné vodorovné podložce (těleso je už v pohybu, f = 0,4).</p>
						<p>Výpočet Fg:<br>
						Fg = m · g = 50 · 10 = 500 N</p>
						<p>Na vodorovné podložce platí Fg = Fn, tedy Fn = 500 N.</p>
						<p>Třecí síla:<br>
						Ft = Fn · f = 500 · 0,4 = <strong>200 N</strong></p>

						<h3>Tření zvětšíme</h3>
						<ul>
							<li>zdrsněním povrchu</li>
							<li>užitím jiných materiálů</li>
						</ul>
						<h3>Tření zmenšíme</h3>
						<ul>
							<li>úpravou povrchu (hladší)</li>
							<li>mazáním</li>
							<li>užitím ložisek</li>
						</ul>

						<h3>Pozitivní a negativní účinky tření</h3>
						<p><strong>Výhody:</strong> brzdění, posyp silnic (bezpečnost), psaní po tabuli/papíře</p>
						<p><strong>Nevýhody:</strong> brzdění (ztráty), zahřívání součástí strojů, odírání styčných ploch</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Třecí síla', cesta: '7JG_JbKRw70' },
						{ druh: 'infografika', nazev: 'Tahák: tření a třecí síly', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/treci-sila/infografika-prehled.jpg' },
					],
				},
				{
					slug: 'skladani-sil',
					interakce: 'skladani-sil',
					nazev: 'Skládání sil',
					obsah: `
						<h2>Skládání sil</h2>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/skladani-sil.png" alt="Skládání sil – přetahování o krabici" />
						<p>Pokud na těleso působí více sil, můžeme je nahradit jednou <strong>výslednicí sil</strong>, která má na těleso stejný účinek.</p>

						<h3>Síly stejného směru</h3>
						<p>Pokud síly F₁ a F₂ působí ve <strong>stejném směru</strong>, jejich výslednice se sčítá:</p>
						<p><strong>F = F₁ + F₂</strong></p>

						<h3>Síly opačného směru</h3>
						<p>Pokud síly F₁ a F₂ působí proti sobě (<strong>opačným směrem</strong>), jejich výslednice se odečítá:</p>
						<p><strong>F = F₁ − F₂</strong></p>
						<p>Výsledná síla má směr té větší ze sil. Pokud jsou síly stejně velké a míří proti sobě, jsou v <strong>rovnováze</strong> a výslednice je nulová – těleso zůstává v klidu (např. přetahování lanem, kdy ani jedno družstvo nevyhrává).</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Skládání sil', cesta: 'GWJnn_4_zHc' },
						{ druh: 'audio', nazev: 'Poslech: jak složit síly do jedné výslednice 🎧', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/audio-pravidlo-rovnobezniku.mp3' },
					],
				},
				{
					slug: 'teziste',
					interakce: 'teziste',
					nazev: 'Těžiště',
					obsah: `
						<h2>Těžiště</h2>
						<img src="/obrazky/fyzika/7-rocnik/sily-kolem-nas/teziste.png" alt="Těžiště nákladního auta" />
						<p><strong>Těžiště</strong> je bod tělesa, ve kterém si můžeme představit soustředěnou veškerou hmotnost tělesa a ve kterém působí jeho celková tíhová síla.</p>
						<p>U pravidelných souměrných těles (koule, krychle, kvádr) leží těžiště ve středu souměrnosti. U nepravidelných těles ho zjišťujeme zavěšením tělesa na niti – těžiště leží na svislici procházející bodem závěsu.</p>

						<h3>Poloha těžiště a stabilita</h3>
						<p>Čím níže a čím blíže ke středu podstavy se těžiště tělesa nachází, tím je těleso <strong>stabilnější</strong> a hůře se převrací.</p>
						<p>Proto mají např. nákladní auta, jeřáby nebo soutěžní vozy snahu mít těžiště co nejníže – sníží se tím riziko převrácení.</p>

						<h3>Druhy rovnovážné polohy</h3>
						<ul>
							<li><strong>Stabilní</strong> – po vychýlení se těleso vrátí zpět do původní polohy (těžiště se při vychýlení zvedá)</li>
							<li><strong>Labilní</strong> – po vychýlení se těleso nevrátí, převrátí se do jiné polohy (těžiště při vychýlení klesá)</li>
							<li><strong>Volná (indiferentní)</strong> – těleso zůstává v jakékoli nové poloze (těžiště zůstává ve stejné výšce, např. valící se koule)</li>
						</ul>
					`,
					materialy: [
						{ druh: 'infografika', nazev: 'Tahák: těžiště a stabilita', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/teziste/infografika-prehled.jpg' },
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
					obsah: `
						<h2>Působení těles a deformace</h2>
						<p>Každé těleso ve vesmíru na ostatní tělesa nějak působí a zároveň je jimi ovlivňováno. Tomuto vzájemnému ovlivňování říkáme <strong>vzájemné působení (interakce)</strong>. Může probíhat dotykem, nebo na dálku (např. gravitační, magnetické nebo elektrické pole).</p>
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/vzajemne-pusobeni.jpg" alt="Vzájemné působení dvou těles" />

						<h3>Statické a dynamické působení</h3>
						<ul>
							<li><strong>Statické působení</strong> – těleso zůstává v klidu, síly se navzájem ruší (například kniha leží na stole).</li>
							<li><strong>Dynamické působení</strong> – vede ke změně pohybu tělesa, ke změně jeho rychlosti nebo směru (například auto se rozjíždí).</li>
						</ul>

						<h3>Účinky síly na těleso</h3>
						<p>Když síla působí na těleso, může způsobit jednu ze tří základních změn (nebo jejich kombinaci):</p>
						<ul>
							<li><strong>Posuvný účinek</strong> – mění polohu tělesa.</li>
							<li><strong>Otáčivý účinek</strong> – otáčí tělesem kolem osy.</li>
							<li><strong>Deformační účinek</strong> – mění tvar tělesa.</li>
						</ul>
						<p>Záleží na tom, kde síla na těleso působí. Působení v <strong>těžišti</strong> vede k posunutí, působení mimo těžiště způsobuje otáčení.</p>
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/posuv-otaceni.jpg" alt="Posuvný a otáčivý účinek síly" />

						<h3>Deformace tělesa</h3>
						<p>Síla může těleso nejen posunout nebo otočit, ale také změnit jeho tvar. Tomuto jevu říkáme <strong>deformace</strong>. Rozlišujeme dva základní typy:</p>
						<ul>
							<li><strong>Pružná (elastická) deformace</strong> – dočasná. Po skončení působení síly se těleso vrátí do původního tvaru (např. míč, pružina).</li>
							<li><strong>Trvalá (plastická) deformace</strong> – tvar tělesa zůstává změněný i po skončení působení síly (např. pomačkaný plech, modelína).</li>
						</ul>
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/pruzna-deformace.jpg" alt="Pružná deformace – tenisový míček a raketa" />
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/trvala-deformace.jpg" alt="Trvalá deformace – havarované auto" />
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Porozumění síle a deformaci', cesta: '0vmDKVXisgE' },
						{ druh: 'youtube', nazev: 'Video: Síla a interakce', cesta: 'RRSRb_6VXt0' },
					],
				},
				{
					slug: 'jednoduche-stroje-paky',
					interakce: 'paka',
					nazev: 'Jednoduché stroje a páky',
					obsah: `
						<h2>Jednoduché stroje a páky</h2>
						<p><strong>Jednoduché stroje</strong> jsou zařízení, která nám usnadňují práci – umožňují zvedat nebo přemísťovat těžká tělesa menší silou. Patří mezi ně například páka, kladka, nakloněná rovina nebo kolo na hřídeli.</p>

						<h3>Páka</h3>
						<p><strong>Páka</strong> je tuhá tyč, která se může otáčet kolem pevného bodu zvaného <strong>osa otáčení (O)</strong>. Vzdálenost mezi osou otáčení a působištěm síly se nazývá <strong>rameno síly (a)</strong>.</p>
						<p>Čím delší je rameno síly, tím menší síla stačí k vyvážení stejného účinku. Proto se páka hodí k práci s těžkými břemeny.</p>
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/paka-priklad1.jpg" alt="Páka v rovnováze – stejně dlouhá ramena" />
						<img src="/obrazky/fyzika/7-rocnik/jednoduche-stroje/paka-priklad2.jpg" alt="Páka v rovnováze – kratší rameno u břemene" />
						<p>Na obrázcích je vidět, že stejně velkou silou nadzvedneme větší břemeno, pokud je <strong>rameno u břemene kratší</strong> než rameno, na které působíme silou.</p>

						<h3>Podmínka rovnováhy na páce</h3>
						<p>Páka je v rovnováze, pokud platí:</p>
						<p><strong>F<sub>1</sub> &middot; a<sub>1</sub> = F<sub>2</sub> &middot; a<sub>2</sub></strong></p>
						<p>kde F<sub>1</sub>, F<sub>2</sub> jsou síly působící na páku a a<sub>1</sub>, a<sub>2</sub> jsou jejich ramena (vzdálenosti od osy otáčení).</p>

						<h3>Příklad 1</h3>
						<p>Na páce jsou zavěšena dvě závaží: m<sub>1</sub> = 200 g = 0,2 kg na rameni a<sub>1</sub> = 9 cm a m<sub>2</sub> = 100 g = 0,1 kg na rameni a<sub>2</sub> = 18 cm. Je páka v rovnováze?</p>
						<p>F<sub>g1</sub> = m<sub>1</sub> &middot; g = 0,2 &middot; 10 = 2 N</p>
						<p>F<sub>g2</sub> = m<sub>2</sub> &middot; g = 0,1 &middot; 10 = 1 N</p>
						<p>F<sub>g1</sub> &middot; a<sub>1</sub> = 2 &middot; 9 = 18</p>
						<p>F<sub>g2</sub> &middot; a<sub>2</sub> = 1 &middot; 18 = 18</p>
						<p>Obě strany se rovnají (18 = 18), páka je v rovnováze. Dvojnásobná síla si vystačí s polovičním ramenem.</p>

						<h3>Příklad 2</h3>
						<p>Na rameni a<sub>1</sub> = 2 m působí síla F<sub>1</sub> = 20 N. Jak velká síla F<sub>2</sub> je potřeba na rameni a<sub>2</sub> = 4 m, aby byla páka v rovnováze?</p>
						<p>F<sub>1</sub> &middot; a<sub>1</sub> = F<sub>2</sub> &middot; a<sub>2</sub></p>
						<p>F<sub>2</sub> = (F<sub>1</sub> &middot; a<sub>1</sub>) : a<sub>2</sub> = (20 &middot; 2) : 4 = 10 N</p>
						<p>Na delší rameno tedy stačí poloviční síla.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Páky — nadlidská síla', cesta: 'aXsCK4BXLe4' },
						{ druh: 'youtube', nazev: 'Video: Páka — opakování', cesta: 'qLAoiYEeaSA' },
						{ druh: 'infografika', nazev: 'Tahák: moment síly', cesta: '/materialy/fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky/infografika-moment-sily.jpg' },
					],
				},
				{
					slug: 'kladka',
					interakce: 'kladka',
					nazev: 'Kladka — pevná a volná',
					obsah: `
						<h2>Kladka</h2>
						<p><strong>Kladka</strong> je kolo s drážkou, přes které je vedeno lano. Patří mezi <strong>jednoduché stroje</strong> — usnadňuje nám zvedání břemen. Rozlišujeme dva základní druhy: <strong>pevnou</strong> a <strong>volnou</strong> kladku.</p>

						<h3>Pevná kladka</h3>
						<p><strong>Pevná kladka</strong> je připevněná (např. ke stropu) a neposouvá se. <strong>Nemění velikost síly</strong> — táhneme stejnou silou, jako je tíha břemene — ale <strong>mění její směr</strong>. Místo abychom břemeno zvedali nahoru, můžeme lano táhnout dolů, což je pohodlnější (a můžeme se do lana i opřít vlastní vahou).</p>
						<ul>
							<li>síla na lano = tíha břemene (<strong>F = F<sub>G</sub></strong>)</li>
							<li>dráha lana = výška zdvihu</li>
							<li>výhoda: pohodlný <strong>směr</strong> tahu (např. vlajka na stožár, studna s okovem)</li>
						</ul>

						<h3>Volná kladka</h3>
						<p><strong>Volná kladka</strong> se pohybuje spolu s břemenem — břemeno visí na její ose. Břemeno je neseno <strong>dvěma částmi lana</strong>, takže se jeho tíha <strong>rozdělí na polovinu</strong> mezi obě části.</p>
						<p>Představ si břemeno o tíze <strong>100 N</strong> (10 kg): jednu část lana <strong>drží strop silou 50 N</strong> a za druhou <strong>táhneš ty silou 50 N</strong>. Obě síly se <strong>skládají</strong> — dohromady <strong>50 N + 50 N = 100 N</strong> udrží celé břemeno. Ty tak zvedneš 100 N pouhými <strong>50 N</strong>, ale lano musíš vytáhnout <strong>dvakrát delší</strong>.</p>
						<ul>
							<li>síla na lano = polovina tíhy břemene (<strong>F = F<sub>G</sub> / 2</strong>)</li>
							<li>dráha lana = <strong>dvojnásobek</strong> výšky zdvihu</li>
							<li>výhoda: menší <strong>síla</strong> (co ušetříme na síle, doplatíme na dráze — to platí u všech strojů)</li>
						</ul>
						<p>🎒 <strong>Jako pytlíky do schodů:</strong> deset kilo vyneseš buď <strong>najednou v jednom balíku</strong> (velká síla, jedna cesta), nebo <strong>desetkrát po jednom kile</strong> (malá síla, ale mnohem delší chození). <strong>Práce je v obou případech stejná</strong> — vždycky je něco za něco.</p>

						<h3>Kladkostroj</h3>
						<p>Spojením několika pevných a volných kladek vznikne <strong>kladkostroj</strong>. S ním zvedneme velmi těžká břemena malou silou — používá se u jeřábů, na lodích nebo v dílnách. Kolik částí lana břemeno nese, tolikrát menší silou ho zvedneme.</p>

						<h3>Zlaté pravidlo mechaniky</h3>
						<p>U každého jednoduchého stroje platí: <strong>kolikrát si usnadníme sílu, tolikrát delší dráhu musíme překonat.</strong> Práci si nikdy neušetříme — jen ji rozložíme pohodlněji.</p>
					`,
				},
				{
					slug: 'naklonena-rovina',
					interakce: 'naklonena-rovina',
					nazev: 'Nakloněná rovina',
					obsah: `
						<h2>Nakloněná rovina</h2>
						<p>Stejně jako páka nebo kladka patří mezi <strong>jednoduché stroje</strong> i <strong>nakloněná rovina</strong> — šikmá plocha (rampa, prkno, skluz), po které vytahujeme nebo spouštíme těžké břemeno. Místo abychom je zvedali svisle vzhůru, táhneme je šikmo nahoru — a stačí nám na to <strong>menší síla</strong>. Za to ale musíme těleso posunout po <strong>delší dráze</strong>.</p>

						<h3>Jak nakloněná rovina šetří sílu</h3>
						<p>Bez tření platí pro sílu <strong>F</strong>, kterou musíme vynaložit při tažení břemene po nakloněné rovině, vztah:</p>
						<p><strong>F = G &middot; h : l</strong></p>
						<p>kde <strong>G</strong> je tíha břemene, <strong>h</strong> je výška, do které břemeno zvedáme, a <strong>l</strong> je délka nakloněné roviny (šikmé dráhy, po které břemeno táhneme). Čím je nakloněná rovina <strong>delší</strong> při stejné výšce, tím je <strong>mírnější</strong> a tím <strong>menší síla</strong> nám stačí. Ve skutečnosti se do potřebné síly promítá i <strong>tření</strong> mezi břemenem a rovinou, které ji o něco zvětšuje — pro jednoduchost počítáme v ideálním případě bez tření.</p>

						<h3>Cena za menší sílu: delší dráha</h3>
						<p>Nakloněná rovina nám práci neušetří, jen ji rozloží pohodlněji — přesně podle <strong>zlatého pravidla mechaniky</strong>, které platí u všech jednoduchých strojů: kolikrát si usnadníme sílu, tolikrát delší dráhu musíme urazit. Vytažení břemene po šikmé rampě trvá déle a je to dál, ale zvládne to i slabší síla.</p>

						<h3>Nakloněná rovina kolem nás</h3>
						<p>S nakloněnou rovinou se setkáváme na každém kroku: <strong>nájezdová rampa</strong> pro vozíčkáře nebo na nakládání beden do auta, <strong>silniční serpentiny</strong> v horách (klikaté zatáčky prodlužují dráhu, aby auto nemuselo do prudkého kopce), nebo dětská <strong>skluzavka</strong>. Zajímavým příkladem je <strong>šroub</strong> — jeho závit je vlastně nakloněná rovina <strong>navinutá kolem válce</strong>. Proto se šroub zašroubuje malou silou na šroubováku (ale musíme jím mnohokrát otočit), zatímco zatlouct hřebík rovnou by vyžadovalo mnohem větší sílu.</p>

						<h3>Příklad 1</h3>
						<p>Břemeno o tíze G = 600 N táhneme po nakloněné rovině dlouhé l = 3 m na výšku h = 1 m. Jak velká síla F je potřeba (bez tření)?</p>
						<p>F = G &middot; h : l = 600 &middot; 1 : 3 = 200 N</p>
						<p>Stačí nám síla 200 N — tedy třikrát menší, než kdybychom břemeno zvedali svisle (600 N), protože dráha je třikrát delší než výška.</p>

						<h3>Příklad 2</h3>
						<p>Břemeno o tíze G = 800 N chceme vytáhnout do výšky h = 2 m silou F = 200 N. Jak dlouhá musí být nakloněná rovina?</p>
						<p>F = G &middot; h : l &nbsp;&rArr;&nbsp; l = G &middot; h : F</p>
						<p>l = 800 &middot; 2 : 200 = 8 m</p>
						<p>Nakloněná rovina musí být dlouhá 8 metrů — čtyřikrát delší než výška, protože jsme sílu zmenšili čtyřikrát (z 800 N na 200 N).</p>

						<h3>Shrnutí</h3>
						<p>Nakloněná rovina je jednoduchý stroj, který nahrazuje svislé zvedání břemene tažením po šikmé ploše. Platí vztah F = G &middot; h : l: čím delší a mírnější je rovina, tím menší síla stačí — ale dráha, kterou musíme urazit, se úměrně prodlouží. Práci si nikdy neušetříme, jen ji „rozprostřeme" na delší dráhu s menší silou.</p>
					`,
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
					interakce: 'tlak-plocha',
					obsah: `
						<h2>Tlak</h2>
						<p><strong>Tlaková síla</strong> působí při dotyku dvou těles, vždy <strong>kolmo na plochu</strong> tělesa. Její účinky se mohou projevit deformací (změnou tvaru) tělesa.</p>
						<p><strong>Tlak</strong> vyjadřuje míru účinku tlakové síly na těleso — říká nám, jak moc je síla „zkoncentrovaná" na jednom místě.</p>
						<ul>
							<li>značka: <strong>p</strong></li>
							<li>základní jednotka: <strong>pascal (Pa)</strong></li>
							<li>vzorec: <strong>p = F : S</strong> (tlak = síla děleno plocha)</li>
						</ul>
						<p>Tlak 1 Pa vyvolá síla 1 N působící kolmo na plochu 1 m². Představ si to jako 100 g nastrouhané čokolády rovnoměrně rozsypané na ploše 1 × 1 metr.</p>
						<h3>Násobky jednotky</h3>
						<ul>
							<li>1 kPa (kilopascal) = 1 000 Pa</li>
							<li>1 MPa (megapascal) = 1 000 000 Pa</li>
							<li>1 hPa (hektopascal) = 100 Pa — používá se v meteorologii</li>
						</ul>
						<h3>Na čem tlak závisí</h3>
						<ul>
							<li><strong>přímo úměrně na síle</strong> — čím větší síla, tím větší tlak</li>
							<li><strong>nepřímo úměrně na ploše</strong> — čím větší plocha, tím menší tlak (proto jehlový podpatek bolí víc než teniska)</li>
						</ul>
						<h3>Zvětšování tlaku (koncentrovat sílu na malou plochu)</h3>
						<p>nůž, sekera, šicí a injekční jehla, vosí žihadlo — plochu zmenšujeme broušením ostří či bodců</p>
						<h3>Zmenšování tlaku (rozložit sílu na velkou plochu)</h3>
						<p>sněžnice a lyže, pásy bagru a tanku, široké pneumatiky traktoru, více kol u nákladních aut, velbloudí ploché nohy, ležení na tenkém ledu při záchraně</p>
						<h3>Další vzorce a jednotky</h3>
						<ul>
							<li>tlaková síla: <strong>F = p · S</strong></li>
							<li>plocha: <strong>S = F : p</strong></li>
							<li>plochu S dosazujeme vždy v <strong>metrech čtverečních (m²)</strong></li>
							<li>převody: 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm²</li>
						</ul>
					`,
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
					obsah: `
						<h2>Pascalův zákon</h2>
						<p><strong>Tlak vyvolaný vnější silou působící na kapalinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů.</strong> Tlak se tedy zvětší ve všech místech kapaliny stejně.</p>
						<p>Když zatlačíme na píst uzavřené baňky s otvory naplněné vodou, voda nestříká jen ve směru síly, ale <strong>všemi směry kolmo ke stěnám nádoby</strong>.</p>
						<p><strong>Proč to funguje?</strong> Kapaliny jsou téměř dokonale nestlačitelné — jejich částice jsou tak blízko u sebe, že je nelze více stlačit, a tak tlak výborně přenášejí.</p>
						<h3>Hydraulická zařízení — násobení síly</h3>
						<p>Základem jsou <strong>dvě propojené nádoby s písty o různých plochách</strong> (S₁ malý, S₂ velký) a uzavřenou kapalinou (obvykle olejem). Tlak je v celém systému stejný:</p>
						<ul>
							<li><strong>p = F₁ : S₁ = F₂ : S₂</strong></li>
							<li>výsledná síla: <strong>F₂ = F₁ · (S₂ : S₁)</strong></li>
						</ul>
						<p>👉 <strong>Zlaté pravidlo hydrauliky:</strong> Kolikrát je druhý píst větší než první, přesně tolikrát větší síla na něj působí. Plocha 100× větší = síla 100× větší.</p>
						<h3>Příklad (z hodiny)</h3>
						<p>Na malý píst o obsahu 3 m² působí síla 24 N → tlak p = 24 : 3 = <strong>8 Pa</strong>. Velký píst má obsah 12 m² → F₂ = 8 · 12 = <strong>96 N</strong>.</p>
						<h3>Příklad: zubařské křeslo</h3>
						<p>Zubař tlačí na malý píst (S₁ = 5 cm²) silou 20 N. Velký píst má S₂ = 400 cm², tedy 80× víc → síla je 80 × 20 = <strong>1 600 N</strong>, což uzvedne 160 kg. Když křeslo váží 30 kg, pacient může vážit až <strong>130 kg</strong>.</p>
						<h3>Kde všude hydraulika pracuje</h3>
						<p>hydraulické zvedáky a lisy, brzdy automobilů, bagry a jeřáby, zubařská a lékařská křesla, hydraulické výtahy</p>
						<h3>Hodí se vědět</h3>
						<p>Obsah kruhového pístu o poloměru r: <strong>S = π · r²</strong> (π ≈ 3,14).</p>
					`,
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
					obsah: `
						<h2>Hydrostatický tlak</h2>
						<p><strong>Hydrostatický tlak vzniká působením gravitační síly Země.</strong> Kapalina působí na dno i stěny nádoby a také na tělesa ponořená v kapalině — na potápěče, ryby i ponorky.</p>
						<p>Čím jsme <strong>hlouběji pod hladinou</strong> a čím je kapalina <strong>hustší</strong>, tím větší tlak na nás působí.</p>
						<h3>Vzorec</h3>
						<ul>
							<li><strong>p<sub>h</sub> = h · ρ · g</strong></li>
							<li>h … hloubka pod hladinou (v metrech)</li>
							<li>ρ … hustota kapaliny (v kg/m³); voda má 1000 kg/m³</li>
							<li>g … gravitační konstanta (10 N/kg)</li>
						</ul>
						<p>Například v hloubce 10 m pod vodou: p<sub>h</sub> = 10 · 1000 · 10 = <strong>100 000 Pa</strong>.</p>
						<h3>Tlaková síla vody</h3>
						<p>Síla na plochu (třeba dno nebo stěnu tělesa): <strong>F = S · h · ρ · g</strong>. Například na starý most (6 × 8 m) v hloubce 5 m působí voda silou F = 48 · 5 · 1000 · 10 = <strong>2 400 000 N</strong>.</p>
						<h3>Hydrostatický paradox</h3>
						<p>Tlak u dna <strong>nezávisí na tvaru nádoby ani množství vody</strong> — jen na hloubce a hustotě. Nádoby se stejným dnem a stejnou výškou hladiny mají u dna stejný tlak i sílu na dno.</p>
						<h3>Spojené nádoby</h3>
						<p>Hladina kapaliny je ve všech částech spojených nádob <strong>vodorovná a ve stejné výšce</strong>, bez ohledu na jejich tvar.</p>
						<h3>Využití v praxi</h3>
						<ul>
							<li><strong>hráz přehrady</strong> — u dna je mnohem širší, protože s hloubkou roste tlak</li>
							<li><strong>vodojem</strong> — staví se výš než okolní budovy; voda teče z kohoutku díky výšce hladiny</li>
							<li><strong>hadicová vodováha</strong> — spojené nádoby ukazují stejnou výšku</li>
							<li><strong>sifon u umyvadla a WC</strong> — vodní zátka brání zápachu z odpadu</li>
							<li><strong>plavební komora (zdymadlo)</strong> — pomáhá lodím překonat výškové rozdíly hladin</li>
						</ul>
					`,
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
					obsah: `
						<h2>Vztlaková síla a Archimédův zákon</h2>
						<p>Na těleso ponořené do kapaliny působí svisle vzhůru <strong>vztlaková síla Fvz</strong> — proto nám věci pod vodou připadají lehčí.</p>
						<h3>Archimédův zákon</h3>
						<p><strong>Těleso ponořené do kapaliny je nadlehčováno vztlakovou silou, jejíž velikost se rovná tíze kapaliny stejného objemu, jako je objem ponořeného tělesa.</strong></p>
						<ul>
							<li>vzorec: <strong>Fvz = V · ρ · g</strong></li>
							<li>V … objem ponořené části tělesa (m³)</li>
							<li>ρ … hustota kapaliny (kg/m³)</li>
							<li>g … gravitační konstanta (10 N/kg)</li>
						</ul>
						<h3>Příklad z hodiny (měřeno pěti způsoby)</h3>
						<p>Těleso „vážilo" na závěsné váze na vzduchu <strong>500 g</strong>, ve vodě jen <strong>400 g</strong>. Rozdíl m = 100 g = 0,1 kg → vztlaková síla Fvz = 0,1 &middot; 10 = <strong>1 N</strong>. Dalšími metodami vyšlo 1,1 N, 0,9 N, 1,1 N a 0,9 N — jejich průměr je zase <strong>1 N</strong> (součet 5 N děleno 5 měřeními). Měření není nikdy úplně přesné (bublinky, vlnky, zaokrouhlování), ale průměr se pravdě přiblíží.</p>
						<h3>Potápění, vznášení, plování</h3>
						<p>Porovnáváme vztlakovou sílu s tíhovou silou tělesa (nebo hustotu tělesa s hustotou kapaliny):</p>
						<ul>
							<li><strong>potápí se</strong> — Fg &gt; Fvz (hustota tělesa větší než kapaliny; kámen)</li>
							<li><strong>vznáší se</strong> — Fg = Fvz (stejné hustoty; ryba v akváriu)</li>
							<li><strong>plove</strong> — Fg &lt; Fvz (menší hustota; korek, led, loď)</li>
						</ul>
						<h3>Kde to potkáš</h3>
						<ul>
							<li><strong>ocelová loď</strong> — ocel je hustší než voda, ale trup je dutý; <em>průměrná</em> hustota lodi (ocel + vzduch uvnitř) je menší než hustota vody, a tak plove</li>
							<li><strong>ponorka</strong> — napouštěním a vypouštěním vody do nádrží mění svou průměrnou hustotu, a proto se potopí nebo vynoří</li>
							<li><strong>slaná voda</strong> — má větší hustotu než sladká, takže nadlehčuje víc (v Mrtvém moři se člověk neponoří)</li>
							<li><strong>vzduch nadnáší také</strong> — horkovzdušný balon i balonek s heliem stoupají, protože jsou řidší než okolní vzduch</li>
						</ul>
					`,
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Archimédes 🎵', cesta: '/materialy/fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/archimeduv-zakon/pisen-archimedes.mp4' },
					],
				},
				{
					slug: 'telesa-stejnoroda-a-nestejnoroda',
					nazev: 'Tělesa stejnorodá a nestejnorodá',
					obsah: `
						<h2>Tělesa stejnorodá a nestejnorodá</h2>
						<h3>Stejnorodá tělesa</h3>
						<ul>
							<li>jsou z <strong>jedné jediné látky</strong></li>
							<li>v celém objemu mají stejné vlastnosti (hustotu, barvu, tvrdost)</li>
							<li>příklady: ocelový hřebík, skleněná kulička</li>
						</ul>
						<h3>Nestejnorodá tělesa</h3>
						<ul>
							<li>skládají se ze <strong>dvou nebo více různých látek</strong></li>
							<li>v různých částech mají odlišné vlastnosti</li>
							<li>příklady: tužka (dřevo + tuha), žula (křemen + živec + slída), železobetonový panel</li>
						</ul>
						<p>👉 U nestejnorodých těles neurčujeme hustotu látky, ale počítáme jejich <strong>průměrnou hustotu ρp</strong>. Podle ní se řídí i plování — loď z oceli plove, protože její průměrná hustota (ocel + vzduch uvnitř) je menší než hustota vody.</p>
					`,
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
					obsah: `
						<h2>Atmosférický tlak</h2>
						<p><strong>Atmosféra</strong> je plynný obal Země tvořený vzduchem: přibližně <strong>78 % dusíku, 21 % kyslíku</strong> a 1 % dalších plynů.</p>
						<p>Na částice vzduchu působí gravitační síla Země — horní vrstvy tlačí na spodní, a tak vzniká <strong>atmosférický tlak</strong>.</p>
						<h3>Vlastnosti</h3>
						<ul>
							<li>značka <strong>pa</strong>, jednotka pascal (Pa); v meteorologii <strong>hPa</strong> (1 hPa = 100 Pa)</li>
							<li>největší je u povrchu Země, <strong>s výškou klesá</strong> (ve velehorách je „řídký vzduch")</li>
							<li>hustota vzduchu u povrchu je přibližně 1,29 kg/m³ a s výškou také klesá</li>
						</ul>
						<h3>Normální tlak</h3>
						<p>Dohodnutá hodnota <strong>101 325 Pa ≈ 1 013 hPa</strong> — průměrný tlak u hladiny moře; odpovídá 760 mm rtuťového sloupce (mmHg).</p>
						<h3>Torricelliho pokus (1643)</h3>
						<p>Evangelista Torricelli naplnil trubici rtutí a obrátil ji do misky — rtuť klesla na výšku asi 760 mm. Sloupec drží právě atmosférický tlak. Na tomto principu funguje <strong>rtuťový barometr</strong>; kovový barometr se jmenuje <strong>aneroid</strong> a zapisovací <strong>barograf</strong>.</p>
						<h3>Využití v praxi</h3>
						<p>Přísavky drží na hladkém povrchu díky tlaku atmosféry (pod přísavkou vzduch není). Tlak vzduchu souvisí i s počasím — viz Meteorologie.</p>
					`,
					materialy: [
						{ druh: 'video', nazev: 'Píseň: Kolem Země vzduch se točí 🎵', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/atmosfericky-tlak/pisen-atmosfericky-tlak.mp4' },
					],
				},
				{
					slug: 'pretlak-podtlak-vakuum',
					nazev: 'Přetlak, podtlak, vakuum',
					interakce: 'pretlak',
					obsah: `
						<h2>Přetlak, podtlak, vakuum</h2>
						<p>Je-li v uzavřené nádobě jiný tlak než v okolí, vzniká přetlak, podtlak, nebo dokonce vakuum.</p>
						<h3>Přetlak — uvnitř VÍC než venku</h3>
						<ul>
							<li>nafouknutý míč, pneumatika, sprej, tlakové lahve potápěčů, kabina letadla, plíce při výdechu</li>
							<li>vytváří ho <strong>hustilka nebo kompresor</strong>, měří ho <strong>manometr</strong> (trubička se při tlaku narovnává jako papírová frkačka)</li>
							<li>manometry mívají stupnici v barech: <strong>1 bar = 100 000 Pa</strong> ≈ tlak jedné atmosféry; pneumatika se hustí asi na 2,5 baru přetlaku</li>
						</ul>
						<h3>Podtlak — uvnitř MÍŇ než venku</h3>
						<ul>
							<li>vzniká odsátím vzduchu nebo zvětšením prostoru; okolí se <strong>nasává dovnitř</strong> (tlak se chce vyrovnat)</li>
							<li>pití brčkem, vysavač, přísavky, gumový zvon na odpad, pumpa u studny, plíce při nádechu</li>
						</ul>
						<h3>Vakuum — téměř NIC</h3>
						<ul>
							<li>téměř všechen vzduch odčerpán <strong>vývěvou</strong>, tlak skoro nulový</li>
							<li>baňka žárovky, vakuově balené potraviny, vesmírný prostor</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Neviditelná síla tlaku', cesta: 'vWIJeVNdiyM' },
						{ druh: 'infografika', nazev: 'Tahák: přetlak, podtlak, vakuum', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/pretlak-podtlak-vakuum/infografika-prehled.jpg' },
						{ druh: 'video', nazev: 'Píseň: Podtlak & mrak 🎵', cesta: '/materialy/fyzika/7-rocnik/atmosfera-a-tlak-vzduchu/pretlak-podtlak-vakuum/pisen-podtlak-a-mrak.mp4' },
					],
				},
				{
					slug: 'meteorologie-a-mereni-tlaku',
					nazev: 'Meteorologie a měření tlaku',
					obsah: `
						<h2>Meteorologie a měření tlaku</h2>
						<p>Hodnoty atmosférického tlaku jsou důležité pro <strong>předpověď počasí</strong>. Porovnáváme je s normálem 1 013 hPa:</p>
						<ul>
							<li><strong>tlaková výše</strong> (odborně anticyklóna) — tlak vyšší než normál a než v okolí → obvykle jasné, slunečné počasí</li>
							<li><strong>tlaková níže</strong> (odborně cyklóna) — tlak nižší než normál a než v okolí → oblačnost a srážky; hluboká níže (pod 980 hPa) přináší bouřky a vichřice</li>
						</ul>
						<p>👉 Rozdíly tlaku uvádí vzduch do pohybu: <strong>vítr</strong> proudí z místa s vyšším tlakem do místa s nižším tlakem.</p>
						<h3>Čím se tlak měří</h3>
						<ul>
							<li><strong>rtuťový barometr</strong> — sloupec rtuti jako u Torricelliho</li>
							<li><strong>aneroid</strong> — kovový tlakoměr s pružnou krabičkou</li>
							<li><strong>barograf</strong> — barometr se zapisovačem, kreslí průběh tlaku v čase</li>
						</ul>
							<p>👉 Pro předpověď je důležitější než samotné číslo to, jak se tlak <strong>mění</strong>: když <strong>klesá</strong>, počasí se obvykle kazí (blíží se níže s deštěm a větrem), když <strong>stoupá</strong>, obloha se vyjasňuje. Rychlý pokles o víc než 10 hPa za pár hodin varuje před vichřicí.</p>
						<p>Přibližně platí, že v blízkosti hladiny moře klesne tlak o <strong>1 hPa na každých 8 metrů výšky</strong>. Právě proto se naměřené hodnoty <strong>přepočítávají na hladinu moře</strong> — bez toho by horská stanice hlásila nízký tlak pořád a na mapě by v horách vycházela věčná níže. Teprve po přepočtu jde poctivě porovnat stanice v různých nadmořských výškách. Pozor: pravidlo „1 hPa na 8 metrů" platí jen u hladiny moře — vysoko v horách už tlak klesá pomaleji a meteorologové počítají přesněji.</p>
							<h3>Povětrnostní mapa</h3>
							<p>Na mapě počasí spojují <strong>izobary</strong> místa se stejným tlakem — podobně jako vrstevnice spojují místa ve stejné nadmořské výšce. Tlaková výše se značí písmenem <strong>V</strong>, tlaková níže písmenem <strong>N</strong>.</p>
							<p>👉 Čím <strong>hustěji</strong> jsou izobary u sebe, tím prudčeji se tlak na krátkou vzdálenost mění — a tím <strong>silnější vítr</strong> v té oblasti fouká.</p>
						<h3>Meteorologická pozorování</h3>
						<p>Meteorologové sledují kromě tlaku i teplotu, vlhkost, srážky, vítr a oblačnost — z pozemních stanic, balonů i družic. <strong>Meteorologická družice</strong> snímkuje oblačnost shora z vesmíru, takže je na ní vidět i bouřkový systém nad celou Evropou. Každá veličina má svůj přístroj:</p>
							<ul>
								<li><strong>teploměr</strong> — teplota vzduchu; na stanici visí v bílé budce ve stínu, 2 m nad zemí</li>
								<li><strong>vlhkoměr</strong> — vlhkost vzduchu</li>
								<li><strong>anemometr</strong> — rychlost větru; roztáčí ho miskový kříž (obvykle tři misky)</li>
								<li><strong>srážkoměr</strong> — množství spadlého deště v milimetrech; sníh se v něm nechá roztát a změří se jako voda</li>
							</ul>
							<p>Měří se <strong>v pravidelných termínech</strong> (u nás hlavně v 7, 14 a 21 hodin), aby šly hodnoty z různých míst a různých dnů poctivě porovnat. Předpověď počasí pomáhá dopravě, zemědělství i záchranářům — a také energetikům, protože podle ní plánují, kolik proudu vyrobí větrné a solární elektrárny a kolik ho bude potřeba na topení.</p>
					`,
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
					materialy: [
						{ druh: 'infografika', nazev: 'Tahák: odraz světla', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/odraz-svetla/infografika-prehled.jpg' },
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
						</ul>
						<h3>Duha — přirozený rozklad světla</h3>
						<ul>
							<li>vzniká rozkladem slunečního světla na <strong>dešťových kapkách</strong></li>
							<li>vidíme ji, když máme <strong>Slunce za zády</strong> a déšť před sebou; <strong>červená je nahoře</strong>, fialová dole</li>
							<li>bílé světlo vstoupí do kapky (láme se a rozkládá), uvnitř se <strong>jednou odrazí</strong> a při výstupu se spektrum ještě rozšíří</li>
							<li><strong>dvojitá duha</strong>: slabší vedlejší duha vzniká <strong>dvěma</strong> odrazy v kapce a má <strong>opačné pořadí barev</strong></li>
						</ul>
						<p>💡 Podstatu duhy správně vysvětlil lomem paprsků český fyzik a lékař <strong>Jan Marcus Marci</strong> (17. století).</p>
					`,
					materialy: [
						{ druh: 'infografika', nazev: 'Rozklad světla a duha — přehled', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/rozklad-svetla-duha/infografika-prehled.jpg' },
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
					materialy: [
						{ druh: 'infografika', nazev: 'Vnímání barev, RGB a CMYK — přehled', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/vnimani-barev/infografika-prehled.jpg' },
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
					obsah: `
						<h2>Mechanická práce</h2>
						<p>Ve fyzice <strong>těleso koná práci</strong>, právě když působí na jiné těleso silou a tím způsobí, že se toto těleso <strong>posune ve směru síly</strong>. Musí být splněné <strong>obě podmínky</strong> — síla i posunutí.</p>
						<ul>
							<li>práci konáme, když tlačíme rozjeté auto, zvedáme činku, jeřáb zvedá náklad</li>
							<li>práci může vykonat i <strong>silové pole</strong> — gravitační síla koná práci, když jablko spadne ze stromu</li>
							<li>👉 když paní ve frontě jen <strong>drží</strong> těžký nákup, práci nekoná — působí silou, ale nákup se neposune</li>
						</ul>
						<h3>Práce jako fyzikální veličina</h3>
						<ul>
							<li>značka <strong>W</strong>, jednotka <strong>joule (J)</strong> (čti „džaul")</li>
							<li>těleso vykoná práci 1 J, když silou 1 N posune těleso po dráze 1 m</li>
							<li>násobky: <strong>1 kJ = 1 000 J</strong>, <strong>1 MJ = 1 000 000 J</strong></li>
						</ul>
						<h3>Výpočet</h3>
						<p>Práce = síla (ve směru posunutí) × dráha:</p>
						<p style="font-size:1.3rem"><strong>W = F · s</strong></p>
						<p>Odvozené vztahy: <strong>s = W : F</strong> a <strong>F = W : s</strong>. Do vzorce dosazujeme vždy v základních jednotkách — sílu v <strong>newtonech</strong>, dráhu v <strong>metrech</strong>.</p>
						<h3>Práce při zvedání tělesa</h3>
						<p>Abychom těleso zvedli, musíme působit silou o velikosti tíhové síly <strong>F<sub>g</sub> = m · g</strong> (g = 10 N/kg).</p>
						<p><strong>Příklad:</strong> Máma zvedá hračku o hmotnosti 600 g do výšky 150 cm.<br>
						m = 0,6 kg → F = m · g = 0,6 · 10 = <strong>6 N</strong>; s = 1,5 m<br>
						W = F · s = 6 · 1,5 = <strong>9 J</strong></p>
						<p><strong>Příklad:</strong> Jakou silou táhne lokomotiva vlak, když na trati dlouhé 4 km vykoná práci 800 MJ?<br>
						s = 4 000 m, W = 800 000 000 J → F = W : s = 800 000 000 : 4 000 = <strong>200 000 N = 200 kN</strong></p>
					`,
				},
				{
					slug: 'vykon',
					nazev: 'Výkon',
					interakce: 'vykon',
					obsah: `
						<h2>Výkon</h2>
						<p>Někdy je důležité nejen <em>jak velkou</em> práci vykonáme, ale i <strong>jak rychle</strong>. Bagr i dělník vykopou stejnou jámu (stejná práce), ale bagr to zvládne rychleji — má větší výkon. <strong>Výkon</strong> slouží k porovnávání strojů a lidí při konání práce.</p>
						<h3>Výkon jako fyzikální veličina</h3>
						<ul>
							<li>popisuje <strong>rychlost konání práce</strong> — jak velká práce se vykoná za 1 sekundu</li>
							<li>značka <strong>P</strong> (velké P — pozor, malé p je tlak!), jednotka <strong>watt (W)</strong></li>
							<li>násobky: <strong>1 kW = 1 000 W</strong>, <strong>1 MW = 1 000 000 W</strong></li>
							<li>těleso s výkonem 1 W vykoná za 1 s práci 1 J</li>
						</ul>
						<h3>Výpočet</h3>
						<p style="font-size:1.3rem"><strong>P = W : t</strong></p>
						<p>Dosazujeme v základních jednotkách — práci v <strong>joulech</strong>, čas v <strong>sekundách</strong>. Odvozené vztahy: <strong>W = P · t</strong>, <strong>t = W : P</strong>. Mezi výkonem a rychlostí platí <strong>P = F · v</strong>.</p>
						<p><strong>Příklad:</strong> Motor jeřábu vynese betonový panel 6 t do výšky 80 m za 1 minutu.<br>
						m = 6 000 kg → F<sub>g</sub> = 60 000 N; W = F · s = 60 000 · 80 = 4 800 000 J; t = 60 s<br>
						P = W : t = 4 800 000 : 60 = <strong>80 000 W = 80 kW</strong></p>
						<h3>Kilowatthodina (kWh)</h3>
						<p>Pro elektrické spotřebiče se práce (spotřebovaná energie) udává v <strong>kilowatthodinách</strong>: 1 kWh = práce stroje o výkonu 1 kW za 1 hodinu. Platí <strong>1 kWh = 3 600 000 J</strong>. V kWh se účtuje elektřina.</p>
						<p><strong>Příklad:</strong> Elektromotor o výkonu 9 kW běží 16 hodin.<br>
						W = P · t = 9 kW · 16 h = <strong>144 kWh</strong></p>
						<p>💡 Starší jednotka výkonu motorů je <strong>koňská síla</strong> (hp): 1 hp = 0,735 kW.</p>
					`,
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
					obsah: `
						<h2>Energie a její přeměny</h2>
						<p>Aby člověk, zvíře nebo stroj mohl konat práci, musí mít v sobě něco, co se v práci promění — <strong>energii</strong>. Energie se může proměnit v práci a vykonaná práce se zase uloží jako energie.</p>
						<ul>
							<li>rukou natáhnu tětivu luku → luk získá energii → po uvolnění vykoná práci a vystřelí šíp</li>
							<li>čím výš zvednu kladivo, tím větší energii získá a tím větší práci vykoná při zatlučení hřebíku</li>
						</ul>
						<h3>Druhy energie</h3>
						<p>mechanická, <strong>chemická</strong> (paliva, trávení), elektrická, magnetická, světelná, <strong>jaderná</strong>, tepelná.</p>
						<h3>Zákon zachování energie</h3>
						<p>👉 <strong>Energii nelze vytvořit ani zničit — může se jen přeměňovat</strong> z jednoho druhu na jiný. Např.: jaderná energie Slunce → světlo → chemická energie rostlin → chemická energie uhlí → tepelná energie páry → pohybová energie → elektrická energie → světlo a teplo v žárovce.</p>
						<h3>Energie jako veličina</h3>
						<ul>
							<li>vyjadřuje <strong>schopnost tělesa konat práci</strong> — energie je „uložená práce"</li>
							<li>značka <strong>E</strong>, jednotka <strong>joule (J)</strong> — stejná jako u práce; u elektrické energie také Wh a kWh</li>
						</ul>
					`,
				},
				{
					slug: 'pohybova-a-polohova-energie',
					interakce: 'skatepark',
					nazev: 'Pohybová a polohová energie tělesa',
					obsah: `
						<h2>Pohybová a polohová energie tělesa</h2>
						<p><strong>Mechanickou energii</strong> těleso získá při konání mechanické práce. Dělíme ji na <strong>pohybovou</strong> a <strong>polohovou</strong>.</p>
						<h3>Pohybová (kinetická) energie E<sub>k</sub></h3>
						<ul>
							<li>má ji <strong>každé pohybující se těleso</strong>, jednotka joule</li>
							<li>je <strong>přímo úměrná hmotnosti</strong> — těžší těleso má větší E<sub>k</sub></li>
							<li>je úměrná <strong>druhé mocnině rychlosti</strong> — při 2× větší rychlosti je E<sub>k</sub> <strong>4×</strong> větší, při 3× větší rychlosti <strong>9×</strong> větší</li>
						</ul>
						<p>Souvisí se <strong>setrvačností</strong>: naložený kamion se brzdí hůř než osobní auto, rychlé auto má delší brzdnou dráhu. Využití: bowling, demoliční koule, vrtačka.</p>
						<h3>Polohová (potenciální) energie E<sub>p</sub></h3>
						<p>Mohou ji mít i tělesa <strong>v klidu</strong> — mají „ukrytý potenciál" vykonat práci. Má dvě podoby:</p>
						<p><strong>A) Polohová energie v gravitačním poli</strong> — má ji každé těleso ve výšce nad Zemí. Práce vykonaná při zvednutí (W = m·g·h) se v tělese uloží jako energie:</p>
						<p style="font-size:1.3rem"><strong>E<sub>p</sub> = m · g · h</strong></p>
						<p>Dosazujeme v základních jednotkách: hmotnost v kg, výšku v m, g = 10 N/kg. Výšku měříme vzhledem k tomu, co je pro děj důležité (podlaha, hřebík, zem). Odvozené: m = E<sub>p</sub> : (g·h), h = E<sub>p</sub> : (m·g).</p>
						<p><strong>B) Polohová energie pružnosti</strong> — má ji každé natažené, stlačené či zkroucené pružné těleso (pružina, ohnutý luk, natažená guma). Využití: střelba z luku, natahovací hračky, pinball.</p>
					`,
				},
				{
					slug: 'zakon-zachovani-mechanicke-energie',
					interakce: 'skatepark',
					nazev: 'Zákon zachování mechanické energie',
					obsah: `
						<h2>Zákon zachování mechanické energie</h2>
						<p><strong>Celková mechanická energie</strong> tělesa je součet jeho pohybové a polohové energie:</p>
						<p style="font-size:1.3rem"><strong>E = E<sub>p</sub> + E<sub>k</sub></strong></p>
						<h3>Zákon zachování</h3>
						<p>„Pokud se mechanická energie nemění v jiné druhy energie, je <strong>součet polohové a pohybové energie stále stejný</strong>." Během děje se E<sub>p</sub> a E<sub>k</sub> navzájem přeměňují, ale celek zůstává.</p>
						<ul>
							<li><strong>Při pádu</strong> se polohová energie mění na pohybovou — nahoře max. E<sub>p</sub> a nulová E<sub>k</sub>, dole nulová E<sub>p</sub> a max. E<sub>k</sub>. Pohybová energie při dopadu = polohová energie na začátku.</li>
							<li><strong>Při vyhození vzhůru</strong> se pohybová energie mění na polohovou — v nejvyšším bodě se těleso zastaví (E<sub>k</sub> = 0, E<sub>p</sub> max.).</li>
						</ul>
						<h3>Přenos energie mezi tělesy</h3>
						<p>Energie může přejít z jednoho tělesa na druhé: tětiva luku předá energii šípu, jedna kulečníková koule předá pohybovou energii druhé.</p>
						<h3>V běžném životě</h3>
						<p>Každá přeměna je spojená se <strong>ztrátami</strong> — část energie se třením mění na <strong>teplo</strong>, které už na pohyb nevyužijeme. Proto skateboardista na U-rampě nevyjede do stejné výšky, ze které vyjel.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Zákon zachování energie', cesta: 'vDavukfb5qU' },
					],
				},
				{
					slug: 'energeticka-hodnota-potravin',
					nazev: 'Energetická hodnota potravin',
					interakce: 'svacina',
					obsah: `
						<h2>Energetická hodnota potravin</h2>
						<p>Všechny živé organismy potřebují k životu <strong>energii</strong>. Člověk ji získává hlavně z <strong>potravy</strong> (rostliny a živočichové). Tělo spaluje <strong>cukry a tuky</strong> spolu s kyslíkem a využívá tak chemickou energii — pro práci svalů (pohyb) i činnost mozku. Mozek si přitom část energie mění na <strong>elektrickou</strong>: nervy si předávají zprávy elektrickými signály.</p>
						<h3>Jak se energetická hodnota zjišťuje</h3>
						<p>Potravina se <strong>spálí v laboratoři</strong> a změří se <strong>teplo</strong>, které přitom uvolní — to udává její energetickou hodnotu.</p>
						<h3>Jednotky</h3>
						<ul>
							<li>základní: <strong>joule (J)</strong>, <strong>kilojoule (kJ)</strong></li>
							<li>starší, dnes už jen u potravin: <strong>kalorie (cal)</strong>, <strong>kilokalorie (kcal)</strong></li>
						</ul>
						<p>👉 Energetická hodnota se udává nejčastěji <strong>na 100 g</strong> potraviny. Kolik energie jsi snědl, spočítáš podle hmotnosti jednotlivých potravin.</p>
					`,
				},
				{
					slug: 'vnitrni-energie-telesa',
					interakce: 'vnitrni-energie',
					nazev: 'Vnitřní energie tělesa',
					obsah: `
						<h2>Vnitřní energie tělesa</h2>
						<h3>Připomenutí o částicích (6. třída)</h3>
						<ul>
							<li>tělesa jsou z <strong>částic</strong> (atomy, molekuly), které se neustále a neuspořádaně pohybují (důkaz: difuze, Brownův pohyb) — a nikdy se nezastaví</li>
							<li>rychlost pohybu částic závisí na <strong>teplotě</strong> — čím teplejší těleso, tím rychlejší částice (čaj se v horké vodě obarví rychleji)</li>
							<li>mezi částicemi působí <strong>přitažlivé i odpudivé síly</strong>, které je drží v rovnovážné poloze</li>
						</ul>
						<h3>Částice mají energii</h3>
						<p>Každá částice má <strong>pohybovou energii</strong> (protože se pohybuje) i <strong>polohovou energii</strong> (podle polohy vůči ostatním).</p>
						<h3>Vnitřní energie</h3>
						<ul>
							<li><strong>vnitřní energie tělesa = součet energií všech jeho částic</strong></li>
							<li>závisí na <strong>počtu částic</strong> a na <strong>teplotě</strong> tělesa (ta určuje rychlost částic)</li>
							<li>neovlivňuje ji pohyb, poloha ani rychlost celého tělesa jako celku</li>
						</ul>
						<h3>Jak vnitřní energii změníme</h3>
						<ul>
							<li><strong>zvýšíme</strong>: zahřátím, přidáním částic (dofouknutí pneumatiky), <strong>konáním práce</strong> (tření, stlačení), přijetím tepla od teplejšího tělesa</li>
							<li>zvýšení vnitřní energie se projeví <strong>zvýšením teploty</strong>, snížení jejím poklesem</li>
							<li>příklady: zahřáté brzdy, rozpálený vrták, opakovaně ohýbaný drát se přetrhne, topná spirála vařiče</li>
						</ul>
						<p>Využití: rozdělání ohně třením, zahřátí rukou. Naopak přehřátí třením ničí materiál — proto se stroje <strong>chladí</strong> (voda, olej, vzduch).</p>
					`,
				},
				{
					slug: 'tepelna-vymena-a-teplo',
					interakce: 'kalorimetr',
					nazev: 'Tepelná výměna, teplo, měrná tepelná kapacita',
					obsah: `
						<h2>Tepelná výměna, teplo, měrná tepelná kapacita</h2>
						<h3>Tepelná výměna</h3>
						<p>Nastává při <strong>dotyku těles s různou teplotou</strong>. Rychlejší částice teplejšího tělesa narážejí do pomalejších částic chladnějšího a předávají jim část své energie — rychlé zpomalí, pomalé zrychlí. Teplejší těleso vnitřní energii <strong>ztrácí</strong>, chladnější ji <strong>získává</strong>. Výměna skončí, když se <strong>teploty vyrovnají</strong>.</p>
						<h3>Teplo</h3>
						<ul>
							<li><strong>teplo Q</strong> = část vnitřní energie, kterou teplejší těleso předá chladnějšímu při tepelné výměně; jednotka <strong>joule (J)</strong></li>
							<li>teplejší těleso teplo <strong>odevzdává</strong>, chladnější <strong>přijímá</strong>; při izolaci od okolí je odevzdané teplo = přijaté teplo</li>
							<li>👉 <strong>nepleť teplo a teplotu!</strong> Teplo Q je předávaná energie (J); <strong>teplota t</strong> popisuje stav tělesa, měří se teploměrem (°C, vědci kelvin K)</li>
						</ul>
						<h3>Výpočet tepla</h3>
						<p>Přijaté teplo závisí na <strong>rozdílu teplot</strong>, na <strong>hmotnosti</strong> a na <strong>látce</strong>:</p>
						<p style="font-size:1.3rem"><strong>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>)</strong></p>
						<p>t<sub>1</sub> je počáteční, t<sub>2</sub> konečná teplota.</p>
						<h3>Měrná tepelná kapacita c</h3>
						<ul>
							<li>udává, <strong>kolik tepla dodáme 1 kg látky, aby se ohřála o 1 °C</strong>; jednotka <strong>J/(kg·°C)</strong></li>
							<li>voda má c = <strong>4 200 J/(kg·°C)</strong> — na ohřátí 1 kg vody o 1 °C je třeba 4 200 J</li>
							<li><strong>vysoké c</strong> (voda): ohřívá se i chladne pomalu, drží hodně energie → zásobník tepla (topení, chladiče)</li>
							<li><strong>nízké c</strong> (kovy): ohřívají i chladnou rychle → dobré tepelné vodiče (žebra chladičů)</li>
						</ul>
					`,
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
					obsah: `
						<h2>Tepelný motor, parní stroj, parní turbína</h2>
						<p><strong>Tepelný motor</strong> je stroj, který přeměňuje <strong>teplo na pohyb</strong>. Patří sem parní stroje, spalovací motory a reaktivní motory. Liší se <strong>účinností</strong> — kolik vstupní energie promění na pohyb.</p>
						<h3>Parní stroje — historie</h3>
						<ul>
							<li><strong>Hérón z Alexandrie</strong> (1. stol.) — první parní stroj („Hérónova baňka"); pára roztáčela kouli, ale sloužil jen pro zábavu</li>
							<li><strong>Denis Papin</strong> (17. stol.) — tlaková nádoba (Papinův hrnec); pára zvedala píst</li>
							<li><strong>Thomas Newcomen</strong> (18. stol.) — čerpal vodu z dolů</li>
							<li><strong>James Watt</strong> (1784) — zdokonalil parní stroj a <strong>nastartoval průmyslovou revoluci</strong>: klikovým mechanismem změnil přímočarý pohyb pístu na otáčení kola, přidal setrvačník (plynulý chod) a šoupátko (pára tlačí píst oběma směry)</li>
						</ul>
						<h3>Využití a nevýhody parního stroje</h3>
						<p>Použití: průmysl (pohon strojů, čerpání vody), doprava (lokomotivy, parníky), zemědělství. Čech <strong>Josef Božek</strong> postavil první český parní automobil (1815) i parník (1817).</p>
						<p>Nevýhody: velké a těžké, náročná údržba, riziko výbuchu kotle, <strong>malá účinnost jen ~15 %</strong>, znečišťování prostředí.</p>
						<h3>Parní turbína</h3>
						<p>Vodní <strong>pára roztáčí lopatky turbíny</strong> — energie páry se mění na otáčivý pohyb. Používá se v <strong>tepelných elektrárnách</strong> k pohonu generátorů (výkon 200–600 MW). Účinnost <strong>max. ~35 %</strong> — vyšší než u parního stroje.</p>
					`,
				},
				{
					slug: 'spalovaci-motory',
					nazev: 'Spalovací motory',
					interakce: 'motor',
					obsah: `
						<h2>Spalovací motory</h2>
						<p><strong>Spalovací motor</strong> získává teplo <strong>spalováním paliva uvnitř motoru</strong>. Přeměňuje chemickou energii → tepelnou → pohybovou.</p>
						<h3>Hlavní části pístového motoru</h3>
						<p>Pracovní <strong>válec</strong> s pohyblivým <strong>pístem</strong>, který přes <strong>klikový hřídel</strong> pohání kola. Přívod paliva řídí <strong>sací ventil</strong>, odvod spalin <strong>výfukový ventil</strong>.</p>
						<p>Motory dělíme podle paliva a zapálení na <strong>zážehové</strong> a <strong>vznětové</strong>, podle chodu na <strong>čtyřtaktní</strong> a <strong>dvoutaktní</strong>.</p>
						<h3>Zážehový čtyřtaktní motor (Otto, 1876)</h3>
						<p>Palivo <strong>benzín</strong>; směs par a vzduchu zapálí <strong>elektrická jiskra ze svíčky</strong>. Pracuje ve <strong>4 taktech</strong>:</p>
						<ol>
							<li><strong>sání</strong> — píst dolů, nasává se palivová směs (sací ventil otevřen)</li>
							<li><strong>stlačení (komprese)</strong> — oba ventily zavřené, píst stlačuje směs</li>
							<li><strong>výbuch a rozpínání (expanze)</strong> — jiskra zapálí směs, horké plyny tlačí píst dolů — <strong>jediný pracovní takt</strong> (palivo koná práci)</li>
							<li><strong>výfuk</strong> — píst nahoru, vytlačí spaliny (výfukový ventil otevřen)</li>
						</ol>
						<p>Účinnost <strong>20–33 %</strong>. Použití: osobní auta, malá letadla. Často 4válcový motor (vždy je jeden válec v pracovní době).</p>
						<h3>Zážehový dvoutaktní motor</h3>
						<p>Jednodušší, <strong>bez ventilů</strong> (řídí ho píst); cyklus ve 2 fázích (sání+stlačení, výbuch+výfuk). Menší a lehčí — motocykly, sekačky, křovinořezy. Nevýhoda: do benzínu se přidává olej, více emisí, nižší účinnost.</p>
						<h3>Vznětový motor (Diesel)</h3>
						<p>Palivo <strong>nafta</strong> (nebo zemní plyn). <strong>Nemá svíčku</strong> — směs se stlačením prudce zahřeje a <strong>sama se vznítí</strong>. Použití: auta, náklaďáky, autobusy, lokomotivy. Účinnost <strong>30–40 %</strong>. Výhody: větší výkon při rozjezdu, nižší spotřeba; nevýhody: těžší, dražší, více emisí (filtr pevných částic), často turbodmychadlo.</p>
						<p>👉 Každý motor je nutné <strong>nastartovat</strong> (roztočit setrvačník), <strong>chladit</strong> (voda/vzduch) a <strong>mazat</strong> olejem.</p>
					`,
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
					obsah: `
						<h2>Teplo a přeměny skupenství látek</h2>
						<p>Látka se běžně vyskytuje ve <strong>třech skupenstvích</strong> — pevném, kapalném, plynném. Ve všech je tvořena <strong>stejnými částicemi</strong>, liší se jen jejich <strong>pohybem a silovým působením</strong>.</p>
						<h3>Struktura částic</h3>
						<ul>
							<li><strong>pevné</strong> — částice blízko u sebe, velké síly → pevnost; jen kmitají kolem stálých poloh → stálý tvar</li>
							<li><strong>kapalné</strong> — částice blízko (nestlačitelné), ale kloužou po sobě → tekuté, nemají stálý tvar, tvoří hladinu</li>
							<li><strong>plynné</strong> — částice daleko od sebe, bez vazeb → stlačitelné, rozpínavé, bez tvaru, velmi rychlé</li>
						</ul>
						<p>Pevné látky dělíme na <strong>krystalické</strong> (pravidelné uspořádání, tají při jedné teplotě — led, sůl, kovy) a <strong>amorfní</strong> (nepravidelné, při zahřátí postupně měknou — sklo, vosk, plast, čokoláda).</p>
						<h3>Změny skupenství</h3>
						<p>Nejvíc je ovlivňuje <strong>teplota</strong> (mění rychlost částic). Také <strong>vnější tlak</strong> má vliv.</p>
						<ul>
							<li><strong>dodáváme teplo</strong> (roste teplota): pevné → kapalné (<strong>tání</strong>) → plynné (<strong>vypařování, var</strong>)</li>
							<li><strong>odebíráme teplo</strong> (klesá teplota): plynné → kapalné (<strong>kapalnění</strong>) → pevné (<strong>tuhnutí</strong>)</li>
						</ul>
						<p>💡 U některých látek se pevné skupenství mění <strong>rovnou na plynné</strong> — to je <strong>sublimace</strong> (např. jód, tvorba ohonu komet); opačný děj je <strong>desublimace</strong>.</p>
					`,
				},
				{
					slug: 'tani',
					nazev: 'Tání',
					interakce: 'ohrev',
					obsah: `
						<h2>Tání</h2>
						<p>Když pevnou látku zahříváme, teplota roste. Jakmile dosáhne <strong>teploty tání</strong>, začne se dodávaným teplem měnit z <strong>pevného skupenství na kapalné</strong>. U kovů se tomu říká <strong>tavení</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>při tání se částice uvolňují z vazeb a začínají se volně pohybovat</li>
							<li><strong>během tání se teplota nemění</strong>, dokud se všechna pevná látka nepřemění na kapalinu; teprve pak teplota kapaliny zase roste</li>
						</ul>
						<h3>Teplota tání t<sub>t</sub></h3>
						<p>Každá látka taje při jiné teplotě. <strong>Led taje při 0 °C.</strong> Příklady: cín 232 °C, olovo 327 °C, hliník 658 °C, měď 1084 °C, železo 1535 °C.</p>
						<ul>
							<li>krystalické látky tají při <strong>jedné</strong> teplotě; amorfní v <strong>rozmezí</strong> teplot (postupně měknou)</li>
							<li>teplotu tání lze ovlivnit <strong>příměsemi</strong> (sůl na silnici — voda zůstane kapalná i při −20 °C) a <strong>tlakem</strong> (pod ostřím brusle led taje už při ~−8 °C)</li>
						</ul>
						<h3>Skupenské teplo tání</h3>
						<p>Teplo potřebné, aby látka roztála; nemění teplotu, jen uvolní částice. <strong>L<sub>t</sub> = l<sub>t</sub> · m</strong> (l<sub>t</sub> = měrné skupenské teplo tání, J/kg). Pro led je l<sub>t</sub> = <strong>332 kJ/kg</strong>. Měrné teplo tání a tuhnutí téže látky je stejné.</p>
					`,
				},
				{
					slug: 'tuhnuti',
					interakce: 'tuhnuti',
					nazev: 'Tuhnutí',
					obsah: `
						<h2>Tuhnutí</h2>
						<p>Když kapalinu ochlazujeme, teplota klesá. Při <strong>teplotě tuhnutí</strong> se odebíráním tepla mění z <strong>kapalného skupenství na pevné</strong>. U vody se tomu říká <strong>mrznutí</strong>. Tuhnutí je <strong>opačný děj k tání</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>částice zpomalují a vytvářejí pevné vazby; tuhnutí začíná od <strong>pevného jádra</strong> (led od břehu, kapka od smítka prachu)</li>
							<li><strong>během tuhnutí se teplota nemění</strong>, dokud vše neztuhne; přitom se <strong>uvolňuje skupenské teplo</strong> do okolí</li>
							<li>u krystalických látek je teplota tuhnutí <strong>stejná jako teplota tání</strong> (voda a led — 0 °C)</li>
						</ul>
						<h3>Změna objemu — voda je výjimka</h3>
						<p>Většina látek při tuhnutí <strong>zmenšuje objem</strong>. <strong>Voda naopak objem zvětšuje</strong> — proto má led <strong>menší hustotu</strong> než voda a plave.</p>
						<ul>
							<li>+ v přírodě: led plave, ryby přežijí pod ním</li>
							<li>− v technice: praská vodovodní potrubí, beton i asfalt; proto se potrubí vede pod <strong>nezámrznou hloubkou</strong> (v nížinách asi 80 cm, na horách až 140 cm) a na zimu se z trubek vypouští voda</li>
						</ul>
						<h3>Kdyby led neplaval</h3>
						<p>Stojí za to domyslet, co by ta jediná výjimka znamenala, kdyby platila jako u ostatních
						látek. Led by byl <strong>těžší než voda</strong> a klesal by ke dnu. Rybník by tak nezamrzal
						shora, ale <strong>ode dna</strong> — a v zimě by promrzl skrz naskrz, protože nahoře by nikdy
						nevznikla ledová vrstva, která teď funguje jako <strong>přikrývka</strong> a další chladnutí
						brzdí. Ryby ani vodní rostliny by zimu nepřečkaly. Celý život v našich vodách visí na tom,
						že se voda při mrznutí <em>roztahuje</em>.</p>
						<h3>Teplota tuhnutí se dá posunout — solení silnic</h3>
						<p>Že voda mrzne při 0 °C, platí jen pro <strong>čistou</strong> vodu. Rozpuštěná látka částicím
						brání srovnat se do pravidelné mřížky ledu, takže musí být <strong>ještě větší zima</strong>,
						než led vznikne.</p>
						<p>Přesně to dělá sůl na silnici: nesnaží se led roztavit tím, že by ho hřála — jen mu
						<strong>sníží teplotu tuhnutí</strong>, takže led najednou „má nad nulou" a taje i v mrazu.
						Teplo na to ovšem potřebuje pořád, a bere si ho z okolí — proto je osolená břečka
						na dotek <strong>ledově studená</strong>. Má to ale mez —
						solí lze mrznutí odsunout nejvýš k <strong>−21 °C</strong>, a při silnějším mrazu už proto
						solení nepomáhá. Silničáři tehdy sypou písek a drť, které nic netaví a jen zdrsňují povrch.</p>
						<h3>💡 Podchlazená voda</h3>
						<p>Vzpomeň si na to <strong>pevné jádro</strong> ze začátku stránky. Když ho voda nemá — je čistá
						a v hladké lahvi — dokáže zůstat kapalná i <strong>pod nulou</strong>. Stačí pak lahví ťuknout
						a v ní se během vteřiny rozběhne led. Ne proto, že by se ochladila, ale proto, že
						<strong>konečně dostala, od čeho začít</strong>.</p>
						<p>Pozor ale — <strong>celá nezmrzne</strong>, a důvod je hned o kus výš na této stránce:
						tuhnutí <em>uvolňuje</em> skupenské teplo. Tím se voda sama ohřeje zpátky na 0 °C a děj
						se zastaví. Z vody podchlazené na −5 °C proto ztuhne jen asi <strong>šestnáctina</strong>
						a v lahvi zůstane <strong>ledová kaše</strong>. Aby zmrzla celá, muselo by být podchlazení
						nemožných 80 °C.</p>
					`,
				},
				{
					slug: 'vyparovani',
					nazev: 'Vypařování',
					interakce: 'vyparovani',
					obsah: `
						<h2>Vypařování</h2>
						<p><strong>Vypařování</strong> je změna kapalného skupenství na plynné. Probíhá <strong>na povrchu</strong> kapaliny a <strong>při každé teplotě</strong>.</p>
						<h3>Co vypařování urychlí</h3>
						<ul>
							<li><strong>vyšší teplota</strong> kapaliny (prádlo na slunci, fén)</li>
							<li><strong>větší povrch</strong> (ručník rozložený, ne smotaný)</li>
							<li><strong>odvádění par</strong> nad kapalinou (vítr, průvan)</li>
							<li><strong>druh kapaliny</strong> — líh se vypařuje rychleji než voda; <strong>těkavé látky</strong> (benzín, aceton, líh) velmi rychle a jejich páry jsou často <strong>hořlavé</strong> (u pumpy se nekouří!)</li>
						</ul>
						<h3>Vypařování ochlazuje</h3>
						<p>Částice potřebují k uvolnění energii, proto vypařující se kapalina <strong>odebírá okolí teplo</strong> → ochlazuje se. Proto je plavci po vylezení z vody zima, tělo se chladí <strong>pocením</strong>, pes vyplazením jazyka, při horečce pomáhají mokré zábaly.</p>
						<p>Vodní pára je <strong>neviditelná</strong> — co „vidíme" je mlha (drobné kapičky). Vlhkost vzduchu měří <strong>vlhkoměr</strong>.</p>
					`,
				},
				{
					slug: 'var',
					nazev: 'Var',
					interakce: 'ohrev',
					obsah: `
						<h2>Var</h2>
						<p><strong>Var</strong> je také změna kapalného skupenství na plynné, ale je mnohem <strong>intenzivnější</strong>: probíhá <strong>v celém objemu</strong> kapaliny a jen při <strong>teplotě varu</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>uvnitř kapaliny vznikají <strong>bubliny páry</strong>, stoupají k hladině a pára uniká</li>
							<li><strong>během varu se teplota nemění</strong>, dokud se všechna kapalina nevyvaří</li>
						</ul>
						<p>👉 Rozdíl: <strong>vypařování</strong> = jen na povrchu, za všech teplot; <strong>var</strong> = v celém objemu, jen při teplotě varu.</p>
						<h3>Teplota varu t<sub>v</sub></h3>
						<p>Každá látka vře jinak. <strong>Voda vře při 100 °C</strong> (za normálního tlaku); ethanol 78 °C, rtuť 357 °C.</p>
						<ul>
							<li>závisí na <strong>tlaku</strong>: při nízkém tlaku je nižší (na Himálaji vře voda při ~80 °C), při vysokém vyšší (Papinův hrnec ~130 °C — vaří rychleji)</li>
							<li>ovlivní ji i <strong>příměsi</strong> (slaná voda vře při vyšší teplotě)</li>
						</ul>
						<p><strong>Destilace</strong> odděluje složky směsi podle různé teploty varu (destilovaná voda, líh, zpracování ropy).</p>
						<p>Skupenské teplo varu: <strong>L<sub>v</sub> = l<sub>v</sub> · m</strong>; pro vodu l<sub>v</sub> = <strong>2 260 kJ/kg</strong>.</p>
					`,
				},
				{
					slug: 'kondenzace',
					interakce: 'kondenzace',
					nazev: 'Kondenzace (kapalnění)',
					obsah: `
						<h2>Kondenzace (kapalnění)</h2>
						<p>Když plyn (páru) ochlazujeme, teplota klesá a pára se mění z <strong>plynného skupenství na kapalné</strong>. Tomu říkáme <strong>kapalnění (kondenzace)</strong> — je to <strong>opačný děj k vypařování</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>ochlazené částice páry zpomalí, přitažlivé síly je zadrží u sebe → <strong>shlukují se do kapiček</strong></li>
							<li>kondenzace začíná od <strong>pevného jádra</strong> (smítko prachu → dešťová kapka; studený povrch → rosa, orosená plechovka)</li>
						</ul>
						<h3>Při kondenzaci se teplo UVOLŇUJE</h3>
						<p>Tohle je to hlavní, co si ze stránky odnes. Vypařování teplo <strong>spotřebovává</strong>
						(proto tě po koupání zebe) — a kondenzace, jeho opačný děj, ho zase
						<strong>vrací do okolí</strong>. Kolik? Přesně tolik, kolik si vypařování vzalo —
						a u vody vroucí při 100 °C je to <strong>2 260 kJ na každý kilogram</strong>.</p>
						<p>To je obrovské číslo. Ohřát celý kilogram vody z ledové až po vroucí (0 → 100 °C)
						stojí 420 kJ — kondenzující pára tedy uvolní <strong>víc než pětkrát tolik</strong>,
						a to ještě ani o stupeň nevychladne.</p>
						<h3>⚠️ Proč pára popálí hůř než vařící voda</h3>
						<p>Vroucí voda i pára nad ní mají <strong>stejnou teplotu 100 °C</strong> — a přesto je opaření
						párou mnohem horší. Důvod je právě skupenské teplo: pára na kůži nejdřív
						<strong>zkondenzuje</strong> a teprve pak chladne. Kůži tedy předá dvě porce tepla za sebou,
						zatímco voda jen tu druhou.</p>
						<p>👉 Představ si to na malém množství: jediný <strong>gram</strong> páry uvolní při kondenzaci
						tolik tepla, že by ohřálo skoro <strong>7 gramů</strong> vody z 20 °C na 100 °C. Proto se nikdy
						nesahá nad hrnec s vařící vodou ani k ventilu papiňáku — a proto <strong>pára topí</strong>
						v radiátorech továren i lodí.</p>
						<h3>Rosný bod</h3>
						<p><strong>Rosný bod</strong> je <strong>teplota</strong>, na kterou musí vzduch vychladnout, aby byl vodní parou <strong>nasycený</strong> a pára v něm začala kondenzovat. Čím teplejší vzduch, tím víc páry unese — proto při ochlazení pod rosný bod přebytečná pára zkapalní. Vznikají tak <strong>rosa, mlha i mraky</strong>.</p>
						<p>Z toho plyne pravidlo, které vysvětlí skoro všechno orosení kolem tebe:
						<strong>pára kondenzuje tam, kde je chladno</strong>. Plechovka z lednice se orosí
						<em>zvenku</em> (vlhký pokojový vzduch se o ni ochladí), okna se v zimě potí
						<em>zevnitř</em> (teplý vlhký vzduch pokoje se ochladí o studené sklo) a brýle ti zamlží,
						když z chladna přijdeš do tepla — ne naopak.</p>
						<p>Kondenzaci vidíme i jako obláček, který ti v zimě jde od úst. Pozor na slova:
						<strong>vodní pára je plyn a je průhledná</strong> — vidět není. To bílé jsou už
						<em>kapičky</em>, které z páry zkondenzovaly, když ji venkovní mráz ochladil.</p>
						<p>Plyny lze zkapalnit i <strong>silným ochlazením</strong> (kapalný dusík) nebo
						<strong>stlačením</strong> — to ale funguje jen u některých. Propan-butan v lahvi na vaření
						je stlačením zkapalněný, kdežto dusík ani kyslík se za pokojové teploty stlačit na kapalinu
						nedají a v tlakové lahvi zůstávají plynné; ty se musí nejdřív pořádně ochladit.</p>
					`,
				},
				{
					slug: 'skupenske-zmeny-vody-v-prirode',
					nazev: 'Skupenské změny vody v přírodě',
					interakce: 'kolobeh-vody',
					obsah: `
						<h2>Skupenské změny vody v přírodě</h2>
						<p>V přírodě probíhají všechny skupenské změny vody najednou — dohromady tvoří <strong>koloběh vody</strong>.</p>
						<h3>Vypařování a sublimace</h3>
						<p>Voda se vypařuje z <strong>vodních ploch, rostlin, půdy i kůže</strong> a stoupá jako vodní pára. Sníh a led se mohou i v mrazu pomalu měnit rovnou na páru — <strong>sublimace</strong>.</p>
						<h3>Přeměny páry u země</h3>
						<ul>
							<li>při ochlazení pod <strong>rosný bod</strong> pára kondenzuje → <strong>rosa</strong></li>
							<li>při ochlazení pod <strong>0 °C</strong> pára desublimuje → <strong>jinovatka</strong></li>
						</ul>
						<h3>Oblaka a srážky</h3>
						<ul>
							<li>teplý vlhký vzduch stoupá, ve výšce se ochladí; na <strong>kondenzačních jádrech</strong> (prach, sůl) vznikají kapičky → <strong>oblaka</strong> (čím víc kapek, tím tmavší)</li>
							<li>kapky se spojují, těžknou a padají jako <strong>déšť</strong>; když cestou promrznou, dopadnou jako <strong>zmrzlý déšť</strong> (drobné ledové krupky)</li>
							<li><strong>kroupy</strong> jsou něco jiného a vznikají jen v bouřkovém mraku: silný stoupavý proud vynese zárodek znovu a znovu nahoru, ten pokaždé přibere další vrstvu ledu — proto bývají velké přes centimetr a uvnitř mají vrstvy jako cibule</li>
							<li>vysoko a v zimě vzniká z páry desublimací <strong>led a sněhové vločky</strong> (bílá oblaka typu cirrus)</li>
						</ul>
						<p>Voda ze srážek se znovu vypaří — a <strong>koloběh</strong> se opakuje. Srážky měří <strong>srážkoměr</strong> (v mm = výška vodního sloupce). V průmyslových oblastech mohou vznikat <strong>kyselé deště</strong>, které škodí přírodě.</p>
						<h3>Co ten koloběh vlastně pohání</h3>
						<p>Vypařování <strong>spotřebovává</strong> teplo a kondenzace ho zase <strong>uvolňuje</strong>.
						Voda se tedy nejen stěhuje z místa na místo — <strong>stěhuje s sebou i energii</strong>.
						Nabere ji od Slunce nad teplým mořem, odnese ji vysoko do atmosféry a tam ji při vzniku
						oblaku předá vzduchu. Motorem celého koloběhu je <strong>Slunce</strong>: bez něj by se voda
						nevypařila a všechna by zůstala ležet v mořích.</p>
						<p>👉 A jedna věc, která se plete: voda se v koloběhu <strong>nespotřebovává ani nevyrábí</strong>.
						Pořád je jí stejně, jen se přelévá mezi mořem, vzduchem, ledovci a řekami. Ta, kterou dnes
						vypiješ, byla mnohokrát mrakem i mořem.</p>
						<h3>Mlha a oblak jsou totéž</h3>
						<p>Liší se jediným: <strong>ve které výšce zrovna jsou</strong>. Oblak je pára zkondenzovaná
						vysoko, mlha úplně stejná věc při zemi. Když vyjdeš v mlze na kopec a ona zůstane pod tebou,
						díváš se najednou na oblak — ačkoli se s ní vůbec nic nestalo.</p>
						<p>👉 Pozor na běžný omyl: <strong>to bílé, co vidíš, není pára</strong>. Vodní pára je plyn,
						a ten je úplně <em>průhledný</em>. Mlha, obláček z úst i „pára" nad hrncem jsou už
						<strong>drobné kapičky vody</strong> — tedy zkondenzovaná voda, ne pára.</p>
					`,
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
						obsah: `
							<h2>Elektrický náboj</h2>
							<p>Když si češeš umyté vlasy plastovým hřebenem, vlasy se zvednou a lepí se k hřebenu. Tělesa se <strong>zelektrizovala</strong> a působí mezi nimi <strong>elektrická síla</strong>. Její příčinou je <strong>elektrický náboj</strong>.</p>
							<h3>Dva druhy náboje</h3>
							<ul>
								<li><strong>kladný</strong> — nese ho <strong>proton</strong> (p⁺) v jádře atomu; při běžném zacházení jádro neopouští</li>
								<li><strong>záporný</strong> — nese ho <strong>elektron</strong> (e⁻) v obalu atomu; ten se dá snadno uvolnit a přesouvat</li>
								<li><strong>neutron</strong> (n⁰) v jádře je bez náboje</li>
							</ul>
							<p>Náboj protonu a elektronu je <strong>stejně velký, ale opačný</strong>. Náboj nelze vyrobit ani zničit — jen <strong>přesouvat</strong> spolu s elektrony.</p>
							<h3>Neutrální a nabité těleso</h3>
							<ul>
								<li><strong>neutrální</strong>: stejný počet protonů a elektronů → navenek se náboje vyruší</li>
								<li><strong>nabité (iont)</strong>: převažuje jeden náboj. <strong>Kationt (+)</strong> = atom, který elektron ztratil; <strong>aniont (−)</strong> = atom, který elektron navíc přijal. Pozor: iont nevzniká odtržením protonů, mění se jen počet elektronů.</li>
							</ul>
							<h3>Náboj jako veličina</h3>
							<p>Značka <strong>Q</strong>, jednotka <strong>coulomb (C)</strong>. Nejmenší náboj je <strong>elementární náboj</strong> e = 1,6·10⁻¹⁹ C (náboj jednoho elektronu i protonu). Nabité těleso zjistí <strong>elektroskop</strong>, porovná elektrometr.</p>
							<h3>Elektrování a přenos náboje</h3>
							<ul>
								<li><strong>třením</strong> se přesouvají elektrony: plast se nabíjí vždy <strong>záporně</strong>, sklo <strong>kladně</strong></li>
								<li><strong>vodiče</strong> (všechny kovy) náboj snadno přenášejí; <strong>izolanty</strong> (suché dřevo, plast, guma) ne</li>
								<li>nabité těleso lze <strong>vybít uzemněním</strong> — vodivým spojením se Zemí (bleskosvod, ochrana před úrazem)</li>
							</ul>
							<p><strong>Zákon zachování náboje:</strong> celkový náboj se v izolované soustavě elektrováním nemění.</p>
							<h3>Elektrická síla</h3>
							<p><strong>Souhlasné náboje se odpuzují, nesouhlasné přitahují.</strong> Síla je tím větší, čím <strong>větší jsou náboje</strong> a čím <strong>menší je vzdálenost</strong> mezi nimi. Proto se rozčesané vlasy lepí k hřebenu, ale navzájem se rozestupují.</p>
						`,
					},
				{
						slug: 'elektricke-pole',
						nazev: 'Elektrické pole',
						interakce: 'elektricke-pole',
						obsah: `
							<h2>Elektrické pole</h2>
							<p><strong>Elektrické pole</strong> vzniká <strong>kolem každého nabitého tělesa</strong>. Projevuje se tím, že působí <strong>elektrickou silou</strong> na jiná tělesa — i <strong>na dálku</strong>, bez dotyku.</p>
							<ul>
								<li>nesouhlasně nabitá tělesa (+ a −) se <strong>přitahují</strong> (hřeben a vlasy)</li>
								<li>souhlasně nabitá tělesa se <strong>odpuzují</strong> (jednotlivé vlasy mezi sebou)</li>
							</ul>
							<h3>Vodič v elektrickém poli</h3>
							<p>V nenabitém kovu se působením pole <strong>přesunou volné elektrony</strong> na jednu stranu — nastane <strong>elektrostatická indukce</strong>. Jedna strana je pak záporná, druhá kladná, i když je těleso jako celek neutrální. Proto se neutrální plechovka rozkutálí k zelektrovanému pravítku.</p>
							<h3>Izolant v elektrickém poli</h3>
							<p>V izolantu elektrony atom neopustí, jen se uvnitř atomů nakloní — nastane <strong>polarizace</strong>. Těleso je také přitahováno (kousky papíru, pramínek vody z kohoutku k pravítku), ale náboj z něj <strong>nelze odvést</strong>.</p>
							<h3>Siločáry</h3>
							<ul>
								<li>ukazují <strong>směr síly na kladný náboj</strong>, orientace <strong>od + k −</strong></li>
								<li>čím <strong>hustší</strong> siločáry, tím <strong>silnější</strong> pole; dál od tělesa síla slábne a siločáry řídnou</li>
								<li>mezi dvěma rovnoběžnými deskami je pole <strong>stejnorodé (homogenní)</strong> — siločáry jsou rovnoběžné</li>
							</ul>
							<h3>⚡ Faradayova klec — proč je v autě při bouřce bezpečno</h3>
							<p>Vezmi si znovu <strong>elektrostatickou indukci</strong> z odstavce výš: v kovu se
							volné elektrony přesunou tam, kam je vnější pole tlačí. Jenže tím samy vytvoří
							<strong>pole opačného směru</strong> — a ta dvě se uvnitř kovu navzájem <strong>vyruší</strong>.</p>
							<p>Uvnitř uzavřeného kovového obalu proto <strong>vnější elektrické pole nic nezmůže</strong>.
							Tomu se říká <strong>Faradayova klec</strong> a potkáš ji častěji, než by ses nadál(a):</p>
							<ul>
								<li><strong>auto při bouřce</strong> — blesk sjede po plechu karoserie do země a posádky
								uvnitř se nedotkne. (Pozor: chrání <em>plech</em>, ne gumové pneumatiky — ty jsou
								v tom nevinně, ačkoli se to často říká. A platí to jen se <strong>zavřenými okny</strong>
								a bez sahání na kovové části; kabriolet nechrání vůbec.)</li>
								<li><strong>letadlo</strong>, do kterého blesk udeří poměrně běžně, a nikdo si toho
								ani nevšimne</li>
								<li><strong>kovový oplet kabelu</strong> u sluchátek nebo antény — drží rušení venku</li>
								<li><strong>mikrovlnná trouba</strong> — mřížka ve dvířkách nepustí mikrovlny ven,
								a přitom se skrz ni dá koukat dovnitř</li>
							</ul>
							<p>👉 Klec nemusí být plná deska, stačí <strong>hustá kovová síť</strong>. Její oka ale
							musí být <strong>mnohem menší než vlnová délka</strong> toho, co má zadržet — a přesně
							proto vypadá mřížka v troubě jako kouzlo: <strong>mikrovlny</strong> jsou dlouhé asi
							<strong>12 cm</strong> a dírkami neprojdou, kdežto <strong>světlo</strong> má vlnovou
							délku statisíckrát menší a proletí bez problémů. Proto dovnitř vidíš, a přesto se
							u dvířek neohřeješ.</p>
						`,
					},
				{
						slug: 'vznik-elektrickeho-proudu',
						nazev: 'Vznik elektrického proudu ve vodiči',
						obsah: `
							<h2>Vznik elektrického proudu ve vodiči</h2>
							<p>Aby přístroj fungoval, musí jím <strong>téct elektrický proud</strong>. K tomu ho zapojíme do <strong>elektrického obvodu se zdrojem napětí</strong>.</p>
							<h3>Co je elektrický proud</h3>
							<p><strong>Elektrický proud je uspořádaný pohyb volných nabitých částic.</strong> Nesou ho:</p>
							<ul>
								<li><strong>volné elektrony v kovech</strong> (část elektronů se uvolní z atomů)</li>
								<li><strong>ionty</strong> v roztocích solí a kyselin (proto je vodičem i pot a tělní tekutiny → člověk vede proud)</li>
								<li>za zvláštních podmínek i částice ve vzduchu (blesk, jiskření)</li>
							</ul>
							<h3>Podmínky průchodu proudu</h3>
							<ul>
								<li>musí být <strong>elektrické napětí</strong> mezi konci vodiče (mezi svorkami zdroje) — to žene částice</li>
								<li>proud prochází jen <strong>vodiči</strong> (kovy, roztoky), <strong>neprochází izolanty</strong> (dřevo, plast, guma)</li>
								<li>záporné částice míří ke <strong>kladné</strong> svorce, kladné ionty k <strong>záporné</strong> svorce</li>
							</ul>
							<h3>Napětí jako příčina proudu</h3>
							<p><strong>Elektrické napětí</strong> vzniká rozdílem nábojů mezi dvěma body: záporná svorka má přebytek elektronů, kladná jejich nedostatek. Napětí je <strong>příčinou</strong> proudu a získáme ho ze <strong>zdroje napětí</strong> (zásuvka z elektrárny, baterie, akumulátor).</p>
							<h3>Dva druhy proudu</h3>
							<ul>
								<li><strong>stejnosměrný (DC)</strong> — teče stále stejným směrem; z baterií a akumulátorů. U některých spotřebičů na směru záleží (LED dioda, elektronika), u jiných ne (žárovka)</li>
								<li><strong>střídavý (AC)</strong> — pravidelně mění směr; z elektráren, máme ho v zásuvce; pohání velké spotřebiče (pračka, fén)</li>
							</ul>
						`,
					},
				{
						slug: 'chemicke-zdroje-napeti',
						nazev: 'Chemické zdroje elektrického napětí',
						obsah: `
							<h2>Chemické zdroje napětí — galvanické články</h2>
							<p><strong>Galvanický článek</strong> vyrábí napětí <strong>chemickou reakcí</strong>. Do vodivého roztoku (<strong>elektrolytu</strong> — sůl nebo kyselina) se ponoří <strong>dvě elektrody z různých materiálů</strong> — obvykle kovů, ale i uhlík se hodí. Reakce způsobí, že se na jedné elektrodě hromadí elektrony (nabíjí se <strong>záporně</strong>), na druhé jich ubývá (nabíjí se <strong>kladně</strong>) — vzniká napětí.</p>
							<ul>
								<li>záporná elektroda: např. zinek, lithium, kadmium</li>
								<li>kladná elektroda: např. uhlík (grafit) nebo měď</li>
							</ul>
							<h3>Nejznámější články</h3>
							<ul>
								<li><strong>Suchý článek</strong> — zinková nádoba (−) a uhlíková tyčinka (+), elektrolyt = salmiaková pasta. Napětí <strong>1,5 V</strong>, na jedno použití (hračky). Vybitý může vytéct.</li>
								<li><strong>Plochá baterie</strong> — tři suché články za sebou → <strong>4,5 V</strong></li>
								<li><strong>Alkalické články</strong> — větší kapacita a životnost (blesk fotoaparátu)</li>
								<li><strong>Lithiové články</strong> (jednorázové) — kvalitní i po letech skladování; hodinky, klíč od auta, baterie na základní desce počítače</li>
								<li><strong>Olověný akumulátor</strong> — velká kapacita, <strong>dobíjecí</strong>, napětí <strong>12 V</strong> (autobaterie)</li>
							</ul>
							<p><strong>Baterie</strong> = jednorázová (nedobíjecí), <strong>akumulátor</strong> = dobíjecí (opakovaně použitelný).</p>
						<h3>Proč se baterie vybije</h3>
						<p>Napětí nevyrábí nic kouzelného — <strong>rozpouští se při něm kov elektrody</strong>.
						Když se chemické látky uvnitř spotřebují, reakce skončí a napětí zmizí. Proto je baterie
						vlastně <strong>zásobník chemické energie</strong>: v akumulátoru umí nabíjení reakci
						obrátit a látky obnovit, v jednorázovém článku ne.</p>
						<p>Tím se vysvětlí i to, proč vybitý zinkový článek často <strong>vyteče</strong>: nádobka
						z elektrody je prožraná až skrz a agresivní pasta se dostane ven. Proto se vybité články
						nenechávají ve spotřebiči — dokážou zničit hračku i dálkový ovladač.</p>
						<h3>Napětí se sčítá — proto plochá baterie</h3>
						<p>Jeden suchý článek dá <strong>1,5 V</strong> a víc z něj nedostaneš, protože napětí
						určuje <strong>dvojice použitých kovů</strong>, ne velikost. Chceš-li víc, musíš články
						<strong>zapojit za sebou</strong> a napětí se sečte:</p>
						<ul>
							<li>plochá baterie = 3 články → 3 · 1,5 V = <strong>4,5 V</strong></li>
							<li>devítivoltová baterie = 6 článků → 6 · 1,5 V = <strong>9 V</strong></li>
							<li>autobaterie = 6 olověných článků po 2 V → <strong>12 V</strong></li>
						</ul>
						<p>👉 Malá tužková AA a velká buřtová D mají <strong>obě 1,5 V</strong>. Větší článek
						neznamená větší napětí — znamená, že <strong>vydrží déle</strong>. Tomu se říká
						<strong>kapacita</strong> a udává se v mAh: článek s kapacitou 2 000 mAh dodá proud
						2 000 mA po jednu hodinu, nebo 200 mA po deset hodin.</p>
						<h3>⚠️ Bezpečnost a co s vybitými</h3>
						<ul>
							<li><strong>Nikdy nezkratuj</strong> baterii drátem — proud se prudce zvedne a článek
							se rozpálí. U lithiových to může skončit požárem, proto se nesmí ani propichovat
							a mačkat (nafouklý článek z mobilu patří rovnou do sběru).</li>
							<li><strong>Nemíchej staré a nové</strong> články ani různé typy v jednom přístroji:
							silnější „tlačí" do slabšího a ten může vytéct.</li>
							<li><strong>Baterie nepatří do koše.</strong> Obsahují těžké kovy, které by se dostaly
							do půdy a vody. Sběrné nádoby jsou ve školách, obchodech i na obecních úřadech —
							a kovy z nich se dají použít znovu.</li>
						</ul>
						`,
					},
				{
						slug: 'elektricke-obvody',
						nazev: 'Elektrické obvody',
						interakce: 'obvod',
						obsah: `
							<h2>Elektrické obvody</h2>
							<p><strong>Elektrický obvod</strong> vzniká vodivým spojením více prvků. Musí obsahovat <strong>zdroj napětí</strong>, <strong>vodiče</strong> a <strong>spotřebič</strong> (žárovka, zvonek, motor…). Může mít i <strong>spínač, měřidla, pojistku</strong>. <strong>Proud teče jen uzavřeným obvodem</strong> — všechny části musí být vodivě spojené.</p>
							<h3>Schéma obvodu</h3>
							<p>Přehledné zakreslení pomocí <strong>schematických značek</strong>; vodiče kreslíme přímými nebo pravoúhlými čarami. Místo, kde je víc vodičů spojeno, je <strong>uzel</strong>. Značky: zdroj (baterie), žárovka (kolečko s křížkem), spínač otevřený/zavřený, pojistka, zvonek.</p>
							<h3>Jednoduchý a složený obvod</h3>
							<ul>
								<li><strong>jednoduchý</strong> — jeden spotřebič (zdroj, vodiče, spínač, žárovka). U tužkové baterie je výčnělek +, rovná plocha −.</li>
								<li><strong>složený</strong> — víc spotřebičů, zapojených <strong>za sebou (sériově)</strong> nebo <strong>vedle sebe (paralelně)</strong></li>
							</ul>
							<h3>Zkrat — pozor!</h3>
							<p>Když vodivě spojíme svorky zdroje <strong>bez spotřebiče</strong> (nebo proud najde cestu mimo spotřebič), vznikne <strong>zkrat</strong>: teče velký proud, vodiče se přehřejí a <strong>hrozí požár</strong>. Chrání před ním <strong>pojistka</strong> — tenký drátek, který se při velkém proudu přetaví a přeruší obvod.</p>
							<h3>Bezpečné zapojování</h3>
							<p>Nejdřív sestav obvod <strong>bez zdroje</strong> a se spínačem <strong>vypnutým</strong>, zkontroluj vodiče i žárovku, teprve pak připoj zdroj a nakonec sepni spínač.</p>
						`,
					},
				{
						slug: 'elektricky-proud-mereni',
						nazev: 'Elektrický proud a jeho měření',
						interakce: 'meridla',
						obsah: `
							<h2>Elektrický proud a jeho měření</h2>
							<p><strong>Elektrický proud</strong> udává, kolik náboje projde vodičem za 1 sekundu. Značka <strong>I</strong>, jednotka <strong>ampér (A)</strong>. Platí <strong>I = Q / t</strong>.</p>
							<ul>
								<li>1 A = 1 000 mA (miliampér)</li>
								<li>1 A = 1 000 000 µA (mikroampér)</li>
							</ul>
							<h3>Dohodnutý směr proudu</h3>
							<p>Dohodnutý směr proudu je <strong>od + k −</strong>. Pozor: je <strong>opačný</strong> než skutečný pohyb elektronů (dohodnut byl dřív, než se elektrony objevily).</p>
							<p>💡 Kapacita baterie se udává v <strong>ampérhodinách (Ah, mAh)</strong> — vychází z Q = I·t. Baterie 1000 mAh dodá proud 1 A po dobu 1 hodiny.</p>
							<h3>Měření ampérmetrem</h3>
							<ul>
								<li>měřidlo je <strong>ampérmetr</strong>, do obvodu se zapojuje <strong>sériově</strong> (obvod rozpojíme a ampérmetr vložíme do cesty proudu)</li>
								<li>celý měřený proud musí projít ampérmetrem, proto se obvod v tom místě nesmí rozvětvit</li>
								<li>nastavíme druh proudu (stejnosměrný/střídavý) a <strong>rozsah</strong>, <strong>svorku + přístroje</strong> spojíme se <strong>svorkou + zdroje</strong></li>
								<li>při špatném zapojení hrozí <strong>poškození ampérmetru</strong></li>
							</ul>
						`,
					},
				{
						slug: 'elektricke-napeti-mereni',
						nazev: 'Elektrické napětí a jeho měření',
						interakce: 'meridla',
						obsah: `
							<h2>Elektrické napětí a jeho měření</h2>
							<p><strong>Elektrické napětí</strong> je hlavní charakteristika zdrojů i spotřebičů. Značka <strong>U</strong>, jednotka <strong>volt (V)</strong>.</p>
							<ul>
								<li>1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V</li>
							</ul>
							<h3>Napětí běžných zdrojů</h3>
							<ul>
								<li>zásuvka ze sítě <strong>230 V</strong> (nebezpečné!)</li>
								<li>monočlánek <strong>1,5 V</strong>, plochá baterie <strong>4,5 V</strong>, autobaterie <strong>12 V</strong>, USB-C nabíjení ~5–20 V</li>
							</ul>
							<h3>Zapojení více zdrojů za sebou</h3>
							<p>Když spojíme <strong>+ svorku jedné baterie s − svorkou druhé</strong>, napětí se <strong>sčítá</strong>. Tři články po 1,5 V dají 4,5 V. Zařízení funguje jen při správném počtu a <strong>správné orientaci</strong> baterií.</p>
							<h3>Měření voltmetrem</h3>
							<ul>
								<li>měřidlo je <strong>voltmetr</strong>, zapojuje se <strong>paralelně</strong> — vedle spotřebiče (nebo ke svorkám zdroje)</li>
								<li>voltmetr <strong>nezapojujeme do hlavního obvodu</strong>, aby jím netekl proud</li>
								<li>nastavíme druh napětí a rozsah, <strong>+ přístroje</strong> ke <strong>+ zdroje</strong></li>
							</ul>
							<p>💡 <strong>Multimetr</strong> umí měřit proud i napětí, ale vždy jen <strong>jednu veličinu</strong> — pro každou se jinak nastaví i zapojí.</p>
						`,
					},
				{
						slug: 'elektricky-proud-v-kovech-odpor',
						nazev: 'Elektrický proud v kovech, odpor vodiče',
						interakce: 'odpor-vodice-zaklad',
						obsah: `
							<h2>Elektrický proud v kovech a odpor vodiče</h2>
							<p>Kovy jsou <strong>krystalické látky</strong> — atomy jsou pravidelně uspořádány v <strong>krystalové mřížce</strong> a mají spoustu <strong>volných elektronů</strong>.</p>
							<ul>
								<li><strong>bez proudu:</strong> volné elektrony se pohybují neuspořádaně všemi směry (tepelný pohyb)</li>
								<li><strong>s proudem:</strong> zdroj napětí vytvoří elektrické pole, které elektrony usměrní — pohybují se od − k + (to je elektrický proud)</li>
							</ul>
							<h3>Proč vzniká odpor</h3>
							<p>Letící elektrony <strong>narážejí do atomů</strong> mřížky, mění směr a zpomalují — vodič tak <strong>klade odpor</strong> průchodu proudu. Při srážkách předají část energie atomům, které začnou víc kmitat → <strong>vodič se zahřívá</strong>.</p>
							<h3>Elektrický odpor</h3>
							<ul>
								<li>značka <strong>R</strong>, jednotka <strong>ohm (Ω)</strong>; 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω</li>
								<li><strong>malý odpor</strong> = dobrý vodič (stříbro, měď, zlato, hliník), málo se zahřívá — proto se z mědi dělá vedení</li>
								<li><strong>velký odpor</strong> = špatný vodič, silně se zahřívá (<strong>nichrom</strong> = slitina niklu a chromu → topné spirály varné konvice, fénu i topinkovače; <strong>konstantan</strong> = měď a nikl → rezistory)</li>
								<li><strong>izolanty</strong> (keramika, plast) mají odpor obrovský; žádný kov není izolant</li>
							</ul>
							<h3>Tepelné účinky proudu</h3>
							<p>Zahřívání vodiče proudem <strong>využíváme</strong> (žárovka — wolframové vlákno 2200–3000 °C, vařič, konvice, žehlička, pojistka), ale má i <strong>nebezpečné důsledky</strong> — při přetížení nebo zkratu se dráty roztaví a hrozí <strong>požár</strong>.</p>
						`,
					},
				{
						slug: 'zavislost-odporu-na-vodici',
						nazev: 'Závislost odporu na vlastnostech vodiče (nad rámec RVP)',
						interakce: 'odpor-vodice',
						obsah: `
							<h2>Na čem závisí odpor vodiče</h2>
							<p>Elektrický odpor vodiče (R, jednotka <strong>ohm Ω</strong>) závisí na čtyřech věcech:</p>
							<ul>
								<li><strong>délka</strong> — čím <strong>delší</strong> vodič, tím <strong>větší</strong> odpor (elektrony narazí do víc atomů)</li>
								<li><strong>tloušťka (průřez)</strong> — čím <strong>tenčí</strong> vodič, tím <strong>větší</strong> odpor (méně místa pro pohyb)</li>
								<li><strong>materiál</strong> — popisuje ho <strong>měrný odpor (rezistivita) ρ</strong>, jednotka Ω·m; nejmenší mají nejlepší vodiče (stříbro, měď, zlato, hliník)</li>
								<li><strong>teplota</strong> — čím <strong>vyšší</strong> teplota, tím <strong>větší</strong> odpor (atomy víc kmitají)</li>
							</ul>
							<h3>Výpočet odporu</h3>
							<p>Pro vodič délky <strong>l</strong> a průřezu <strong>S</strong> platí <strong>R = ρ · l / S</strong>. Všechny veličiny dosazujeme v základních jednotkách (m, m², Ω·m). U kruhového průřezu je S = π·r².</p>
							<p>💡 V praxi se ale s metry čtverečními počítá špatně — průřez drátu bývá zlomek milimetru čtverečního. Proto tabulky uvádějí měrný odpor i v <strong>Ω·mm²/m</strong>: pak se <strong>délka dosazuje v metrech a průřez rovnou v mm²</strong> a vyjde totéž. V těchto jednotkách má měď ρ = 0,018, hliník 0,028, konstantan 0,50 a nichrom asi 1,1 Ω·mm²/m — proto se topná spirála z nichromu rozžhaví, kdežto přívodní měděný kabel zůstane studený. (Je to týž údaj jen v jiných jednotkách: 0,018 Ω·mm²/m = 0,000 000 018 Ω·m.)</p>
							<h3>Rezistor</h3>
							<p><strong>Rezistor</strong> je součástka s přesnou hodnotou odporu — tenký odporový drát (konstantan) navinutý na keramickém válečku. Hodnotu udávají <strong>barevné proužky</strong>. Slouží k <strong>regulaci proudu</strong> v obvodu.</p>
						`,
					},
				{
						slug: 'ohmuv-zakon',
						nazev: 'Ohmův zákon',
						interakce: 'ohm',
						obsah: `
							<h2>Ohmův zákon</h2>
							<p>Připojíš-li žárovku k vybité baterii, svítí slabě; k nabité svítí jasně. Napětí a proud spolu souvisí. Dokázal to roku 1826 německý fyzik <strong>Georg Simon Ohm</strong>.</p>
							<h3>Znění</h3>
							<p><strong>Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče.</strong> Kolikrát se zvětší napětí, tolikrát se zvětší proud. Konstantou úměrnosti je <strong>elektrický odpor R</strong>.</p>
							<h3>Vzorce</h3>
							<ul>
								<li><strong>I = U / R</strong></li>
								<li><strong>U = R · I</strong></li>
								<li><strong>R = U / I</strong></li>
							</ul>
							<p>Odpor tak měříme <strong>nepřímo</strong> — změříme U a I a dopočítáme. (Přímo měří <strong>ohmmetr</strong>.) Při stejném napětí: čím <strong>větší odpor</strong>, tím <strong>menší proud</strong>.</p>
							<h3>Příklad</h3>
							<p>Vodičem při napětí 10 V teče proud 0,2 A. Odpor: R = U / I = 10 / 0,2 = <strong>50 Ω</strong>. (Horší vodič se stejným napětím propustí jen 0,1 A → R = 10 / 0,1 = 100 Ω — poloviční proud znamená dvojnásobný odpor.)</p>
							<h3>Pozor na teplotu</h3>
							<p>Ohmův zákon platí přesně jen <strong>za stálé teploty</strong>. Odpor kovů s teplotou <strong>roste</strong> (rozžhavené vlákno žárovky), takže tam už proud není přímo úměrný napětí. Výjimkou je slitina <strong>konstantan</strong>, jejíž odpor se s teplotou skoro nemění — proto se z ní dělají rezistory.</p>
						`,
					},
				{
						slug: 'zapojeni-spotrebicu-za-sebou',
						nazev: 'Zapojení spotřebičů za sebou (sériově)',
						interakce: 'zapojeni',
						obsah: `
							<h2>Zapojení spotřebičů za sebou (sériově)</h2>
							<p>Spotřebiče (pro výpočty je nahradíme <strong>rezistory</strong>) jsou v sériovém obvodu zapojeny <strong>jeden za druhým</strong>. Obvod se <strong>nerozvětvuje</strong>.</p>
							<h3>Proud</h3>
							<p>Proud se <strong>nedělí</strong> — je ve všech částech obvodu (i ve všech rezistorech) <strong>stejný</strong>. Všechny elektrony procházejí každou částí obvodu.</p>
							<h3>Napětí</h3>
							<ul>
								<li>napětí zdroje se <strong>rozdělí mezi rezistory</strong> — <strong>U = U₁ + U₂</strong></li>
								<li>rozdělí se ve <strong>stejném poměru jako odpory</strong>: na větším odporu je větší napětí</li>
								<li>na jednotlivém rezistoru z Ohmova zákona: U₁ = R₁ · I, U₂ = R₂ · I</li>
							</ul>
							<h3>Celkový odpor</h3>
							<p>Rezistory za sebou tvoří <strong>delší odporový drát</strong>, proto se odpory <strong>sčítají</strong>: <strong>R = R₁ + R₂</strong> — celkový odpor je <strong>větší</strong> než jednotlivé.</p>
							<h3>Pomůcka</h3>
							<p>Když se proud <strong>nedělí</strong> → dělí se napětí. Nevýhoda série: přeruší-li se jeden spotřebič (vánoční řetěz), <strong>zhasne celý obvod</strong>.</p>
						`,
					},
				{
						slug: 'zapojeni-spotrebicu-vedle-sebe',
						nazev: 'Zapojení spotřebičů vedle sebe (paralelně)',
						interakce: 'zapojeni',
						obsah: `
							<h2>Zapojení spotřebičů vedle sebe (paralelně)</h2>
							<p>V paralelním obvodu je <strong>každý spotřebič připojen přímo ke zdroji</strong>. Obvod je <strong>rozvětvený</strong>, vodiče se spojují v <strong>uzlech</strong>. Takto jsou zapojené zásuvky v domácnosti.</p>
							<h3>Napětí</h3>
							<p>Všechny rezistory jsou svými konci připojené na póly zdroje → <strong>napětí na všech je stejné</strong> jako napětí zdroje.</p>
							<h3>Proud</h3>
							<ul>
								<li>v uzlu se proud <strong>rozdělí do větví</strong> — <strong>I = I₁ + I₂</strong></li>
								<li>rozdělí se v <strong>opačném poměru než odpory</strong>: větším odporem teče menší proud</li>
								<li>na jednotlivé větvi z Ohmova zákona: I₁ = U / R₁, I₂ = U / R₂</li>
							</ul>
							<h3>Celkový odpor</h3>
							<p>Rezistory vedle sebe tvoří <strong>větší plochu průřezu</strong>, takže <strong>celkový odpor klesá</strong> (je menší než nejmenší z nich). Platí <strong>1/R = 1/R₁ + 1/R₂</strong>.</p>
							<h3>Pomůcka</h3>
							<p>Když se proud <strong>dělí</strong> → napětí se nedělí. Výhoda paralelu: když jeden spotřebič vypadne, <strong>ostatní fungují dál</strong>.</p>
						`,
					},
				{
						slug: 'rezistor-s-promennym-odporem',
						nazev: 'Rezistor s proměnným odporem',
						interakce: 'reostat',
						obsah: `
							<h2>Rezistor s proměnným odporem — reostat a potenciometr</h2>
							<p>Je to rezistor, u kterého lze <strong>měnit odpor</strong>. Tvoří ho odporový drát a <strong>posuvný jezdec</strong>, který určuje, jak velká část drátu je zapojena. Podle konstrukce je <strong>posuvný</strong> nebo <strong>otočný</strong>. Podle způsobu zapojení se mu říká reostat, nebo potenciometr.</p>
							<h3>Reostat — regulace proudu</h3>
							<ul>
								<li>zapojí se jednou svorkou konstrukce a svorkou jezdce (využívá <strong>jednu část</strong> drátu)</li>
								<li>slouží k <strong>regulaci proudu</strong>: čím menší odpor, tím větší proud a výkon</li>
								<li>dnes se moc nepoužívá (velké ztráty tepla) — nahradily ho polovodiče; dřív ovládal tramvaje</li>
							</ul>
							<h3>Potenciometr — dělič napětí</h3>
							<ul>
								<li>zapojí se <strong>obě svorky konstrukce i jezdec</strong> (využívá obě části)</li>
								<li>slouží k <strong>regulaci napětí</strong>: jezdec rozdělí drát na dva sériové rezistory a napětí se mezi ně rozdělí</li>
								<li>využití: ovládání <strong>hlasitosti, jasu, otáček</strong>; jako <strong>snímač polohy či úhlu</strong> v robotice a průmyslu</li>
							</ul>
						`,
					},
				{
						slug: 'elektricka-prace-a-vykon',
						nazev: 'Elektrická práce a energie, výkon proudu',
						obsah: `
							<h2>Elektrická práce, energie a výkon</h2>
							<p>Když proud prochází vodičem, konají síly elektrického pole <strong>elektrickou práci</strong> (značka <strong>W</strong>, jednotka <strong>joule J</strong>, v praxi <strong>kilowatthodina kWh</strong>). Proud tak přenáší obvodem <strong>elektrickou energii</strong> ze zdroje ke spotřebiči.</p>
							<h3>Přeměny elektrické energie</h3>
							<ul>
								<li>na <strong>mechanickou práci</strong> (mixér, vrtačka, výtah)</li>
								<li>na <strong>teplo</strong> (vařič, topení, konvice)</li>
								<li>na <strong>světlo</strong> (žárovka, televize)</li>
								<li>na <strong>chemickou energii</strong> (nabíjení akumulátoru, elektrolýza)</li>
							</ul>
							<h3>Výkon a příkon</h3>
							<ul>
								<li><strong>Výkon P</strong> = energie za sekundu, jednotka <strong>watt (W)</strong>.</li>
								<li><strong>Příkon P₀</strong> = kolik spotřebič odebírá ze sítě (údaj na štítku). Počítá se <strong>P₀ = U · I</strong> — a právě tenhle výkon platíš.</li>
								<li><strong>Užitečný výkon</strong> je jen ta část příkonu, kterou spotřebič opravdu použije na to, co po něm chceme. Je vždy <strong>menší než příkon</strong> — zbytek uniká jako <strong>teplo (ztráty)</strong>.</li>
								<li><strong>Práce: W = P₀ · t = U · I · t</strong></li>
							</ul>
							<h3>Jednotky energie</h3>
							<p>1 Wh = 3 600 J; <strong>1 kWh = 3 600 000 J</strong>. Spotřeba elektřiny doma se počítá v kWh.</p>
							<h3>🧮 Kolik stojí vaření vody — celý příklad</h3>
							<p>Rychlovarná konvice má na štítku <strong>2 000 W</strong> a v rodině běží asi
							<strong>15 minut denně</strong>. Kolik za ni zaplatíte za měsíc?</p>
							<ol>
								<li><strong>Převeď na kilowatty a hodiny</strong> — v kWh se totiž elektřina účtuje:
								2 000 W = <strong>2 kW</strong>, 15 minut = <strong>0,25 h</strong></li>
								<li><strong>Denní spotřeba:</strong> <em>W</em> = <em>P</em> · <em>t</em> = 2 · 0,25 =
								<strong>0,5 kWh</strong></li>
								<li><strong>Za 30 dní:</strong> 0,5 · 30 = <strong>15 kWh</strong></li>
								<li><strong>Cena</strong> (počítejme 5 Kč za kWh): 15 · 5 = <strong>75 Kč</strong></li>
							</ol>
							<p>👉 Všimni si, že se počítá s <strong>příkonem ze štítku</strong>, ne s užitečným výkonem —
							<strong>platíš všechno, co spotřebič ze sítě odebere</strong>, i tu část, která unikne
							jako nechtěné teplo.</p>
							<p>💡 Zkus si sám: kolik by stálo svícení staré 100W žárovky 5 hodin denně po celý měsíc?
							(Nápověda: 0,1 kW · 5 h = 0,5 kWh za den — tedy přesně tolik jako ta konvice.)</p>
							<h3>Účinnost</h3>
							<p>Udává, kolik % energie se přemění na tu, kterou od spotřebiče <strong>opravdu chceme</strong> — u světel tedy na světlo. Klasická žárovka má jen ~5 % (zbytek je teplo), <strong>LED žárovka asi 50 %</strong> — proto se dnes používají LED.</p>
							<p>Z účinnosti plyne i to, proč se LED vyplatí: aby dala stejné světlo jako
							<strong>100W žárovka</strong>, stačí jí kolem <strong>10 W</strong>. Za měsíc svícení
							(5 hodin denně) je to <strong>1,5 kWh</strong> místo 15 kWh — <strong>desetina</strong>.
							A přebytek u staré žárovky nezmizel: <strong>topil ti do pokoje</strong>.</p>
						`,
					},
				{
						slug: 'ucinky-proudu-a-bezpecnost',
						nazev: 'Účinky proudu na člověka, bezpečnost',
						obsah: `
							<h2>Účinky proudu na člověka a bezpečnost</h2>
							<p><strong>Lidské tělo je vodič.</strong> Průchod proudu tělem může způsobit popáleniny, křeče svalů, <strong>fibrilaci (rozhození rytmu) až zástavu srdce</strong>, poškození nervů a mozku.</p>
							<h3>Míra poškození podle proudu</h3>
							<ul>
								<li>~1 mA — práh vnímání</li>
								<li>6–15 mA — křeč, člověk se <strong>nemůže pustit</strong></li>
								<li>~25 mA — křeč dýchacích svalů</li>
								<li>~60 mA — fibrilace srdce; <strong>nad 80 mA</strong> — trvalá zástava srdce</li>
							</ul>
							<h3>Co velikost proudu ovlivňuje</h3>
							<ul>
								<li><strong>odpor člověka</strong>: velký odpor má jen <strong>suchá kůže při malém napětí</strong> (~100 000 Ω) — proto z baterie nic necítíš. Od zhruba 50 V se kůže prorazí a odpor těla klesne na <strong>~1 500 Ω v suchu a ~1 000 Ω ve vlhku</strong>; vlhký člověk je tedy ohroženější, ale <strong>ani suchý není v bezpečí</strong></li>
								<li><strong>cesta proudu</strong>: nejnebezpečnější přes ruku do srdce nebo přes hlavu</li>
								<li>bezpečné napětí <strong>ve vlhkých a zvlášť nebezpečných prostorách</strong> (koupelna, bazén, sklep): stejnosměrné <strong>25 V</strong>, střídavé <strong>12 V</strong>. V suchých místnostech jsou meze vyšší (střídavé 50 V, stejnosměrné 120 V) — zásuvkových <strong>230 V</strong> se to ale netýká nikde, ta jsou nebezpečná vždy</li>
							</ul>
							<h3>🧮 Spočítej si to Ohmovým zákonem</h3>
							<p>Proč z ploché baterie nic necítíš, a přitom zásuvka zabíjí? Stačí
							<strong>Ohmův zákon</strong> <em>I</em> = <em>U</em> : <em>R</em>:</p>
							<ul>
								<li><strong>Plochá baterie 4,5 V</strong> na suchou kůži (R ≈ 100 000 Ω):
								<em>I</em> = 4,5 : 100 000 = <strong>0,05 mA</strong> → ani to nepoznáš,
								jsi hluboko pod prahem vnímání.</li>
								<li><strong>Zásuvka 230 V</strong>: tady je zrada. Suchá kůže má sice velký odpor,
								ale <strong>jen do zhruba 50 V</strong> — při vyšším napětí se elektricky
								<strong>prorazí</strong> a přestane chránit. Odpor těla pak klesne na
								<strong>asi 1 500 Ω</strong> a vyjde <em>I</em> = 230 : 1 500 ≈ <strong>153 mA</strong>.</li>
								<li><strong>Mokrý člověk</strong> (R ≈ 1 000 Ω): <em>I</em> = 230 : 1 000 =
								<strong>230 mA</strong> — a to je ještě horší.</li>
							</ul>
							<p>⚠️ Podívej se do tabulky výš: <strong>obě poslední čísla jsou hluboko nad 80 mA</strong>,
							tedy v pásmu zástavy srdce. <strong>Zásuvka je životu nebezpečná vždycky, i když jsi
							úplně suchý</strong> — většina smrtelných úrazů se stane právě v suchu. Vlhko riziko
							jen dál zvyšuje, protože sníží odpor ještě víc.</p>
							<p>👉 A právě proto <strong>není bezpečné napětí totéž co malé napětí</strong>: rozhoduje,
							jestli napětí dokáže prorazit kůži. Do koupelny proto nepatří žádný spotřebič ze zásuvky
							ani prodlužovačka a na vypínač se nesahá mokrou rukou.</p>
							<h3>Jistič vás nezachrání — proudový chránič ano</h3>
							<p>Ty dvě věci se pletou, a je v tom podstatný rozdíl:</p>
							<ul>
								<li><strong>Jistič</strong> hlídá, aby obvodem netekl <em>příliš velký</em> proud
								(typicky nad 16 A) — chrání <strong>vedení a dům před požárem</strong>. Proud
								115 mA, který zabíjí člověka, je pro jistič naprosto nezajímavý; ani se nehne.</li>
								<li><strong>Proudový chránič</strong> porovnává, kolik proudu do spotřebiče
								<em>přiteče</em> a kolik se ho <em>vrátí</em>. Když se část ztrácí — třeba
								<strong>tělem člověka do země</strong> — okamžitě vypne. Reaguje už na
								<strong>30 mA</strong>, tedy pod hranicí, za kterou hrozí fibrilace,
								a stihne to za setiny sekundy.</li>
							</ul>
							<p>Proto je proudový chránič dnes povinný u zásuvek v koupelnách a venku.
							<strong>Pozor — chránič není důvod si dovolit víc:</strong> zásuvka v koupelně je
							přípustná jen mimo prostor vany a sprchy a spotřebič se v ní nikdy nepoužívá
							u vody. Chránič je poslední záchrana, když se něco pokazí, ne povolení riskovat.</p>
							<h3>Bezpečná pravidla</h3>
							<ul>
								<li>nesahat na vypínač/kabely <strong>mokrou rukou</strong>, žádné spotřebiče ve vaně a sprše</li>
								<li>před výměnou žárovky <strong>vypnout jistič</strong>; do zásuvky nestrkat předměty</li>
								<li>nedotýkat se poškozených kabelů ani spadlých drátů vedení</li>
							</ul>
							<h3>První pomoc při úrazu proudem</h3>
							<p><strong>Na pořadí opravdu záleží</strong> — dělej to přesně takhle:</p>
							<ol>
								<li><strong>Vypni proud</strong> (vypínač, jistič, pojistky). Dokud proud teče,
								nesahej na zraněného — tekl by i tebou.</li>
								<li><strong>Mysli na vlastní bezpečnost.</strong> Když proud vypnout nejde, odsuň
								zraněného <strong>suchou dřevěnou nebo plastovou tyčí</strong>, nikdy holou rukou.
								Zraněný, kterému nemá kdo pomoct, protože ležíš vedle něj, je na tom hůř.</li>
								<li><strong>Zavolej 155</strong> — hned, ještě než začneš pomáhat. Zapni si
								<strong>hlasitý odposlech</strong>, nebo pošli volat někoho jiného. Operátor tě
								povede a řekne ti, co dělat.</li>
								<li><strong>Nedýchá normálně? Začni stlačovat hrudník</strong> — uprostřed hrudi,
								do hloubky asi 5 cm, rychlostí zhruba 100× za minutu, a nepřestávej, dokud
								nepřijede pomoc. Puls nehledej, jen ztrácíš čas a laik ho stejně spolehlivě
								nenahmatá.</li>
							</ol>
							<p>👉 Zraněného <strong>vždy předej záchranářům</strong>, i když se probral a tvrdí,
							že je mu dobře. Proud může poškodit srdce tak, že se to projeví až za několik hodin.</p>
						`,
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
					obsah: `
						<h2>Kmitání a vlnění</h2>
						<p>Příkladem <strong>kmitavého pohybu</strong> je dítě na houpačce, kyvadlo nebo skokan na bungee laně. Těleso se opakovaně vychyluje na obě strany a vrací se zpět.</p>
						<h3>Základní pojmy kmitání</h3>
						<ul>
							<li><strong>Rovnovážná poloha</strong> — poloha, ve které je těleso v klidu.</li>
							<li><strong>Kmitání</strong> — pohyb, při kterém se těleso opakovaně vychyluje z rovnovážné polohy a zase se do ní vrací; výchylka pravidelně střídá strany.</li>
							<li><strong>Kmit</strong> — nejmenší pravidelně se opakující část pohybu (z jedné krajní výchylky přes rovnovážnou polohu do druhé krajní výchylky a zpět).</li>
							<li><strong>Amplituda</strong> — velikost největší výchylky z rovnovážné polohy. Bez tření je výchylka na obě strany stejně velká.</li>
						</ul>
						<h3>Perioda a frekvence</h3>
						<ul>
							<li><strong>Perioda T</strong> — doba jednoho kmitu; jednotka <strong>sekunda (s)</strong>.</li>
							<li><strong>Frekvence f</strong> — počet kmitů za 1 sekundu; jednotka <strong>hertz (Hz)</strong>.</li>
							<li>Perioda a frekvence jsou <strong>převrácené hodnoty</strong>: <strong>f = 1 / T</strong> a <strong>T = 1 / f</strong>.</li>
						</ul>
						<p>Příklad: houpačka udělá <strong>2 kmity za sekundu</strong> → f = 2 Hz, jeden kmit trvá půl sekundy → T = 0,5 s.</p>
						<p>V běžném životě jde většinou o <strong>tlumené kmitání</strong> — výchylka se kvůli tření (o vzduch i uvnitř tělesa) postupně zmenšuje, až se těleso zastaví.</p>
						<h3>Vlnění</h3>
						<p>Když hodíme kamínek do vody, rozkmitají se molekuly v místě dopadu a se zpožděním i molekuly sousední — kmitání se šíří dál a vznikají <strong>vlny</strong>. <strong>Vlnění</strong> tedy vzniká šířením kmitavého pohybu látkovým prostředím. Všechny částice kmitají se stejnou frekvencí (a bez ztrát i se stejnou amplitudou), ale každá s malým zpožděním.</p>
						<ul>
							<li><strong>Vlnová délka λ</strong> — nejmenší vzdálenost dvou bodů, které kmitají stejně (ve stejné fázi); jednotka <strong>metr (m)</strong>.</li>
							<li><strong>Rychlost šíření vlnění v</strong> — jednotka <strong>metr za sekundu (m/s)</strong>. Vlnění se nejrychleji šíří pevnými látkami, nejpomaleji plyny.</li>
							<li>Vztah: <strong>λ = v · T = v / f</strong>.</li>
						</ul>
						<h3>Druhy mechanického vlnění</h3>
						<ul>
							<li><strong>Vlnění příčné</strong> — částice kmitají <strong>kolmo</strong> na směr šíření (vlny na hladině, struna kytary). Vlnu je vidět jako „kopečky a údolí".</li>
							<li><strong>Vlnění podélné</strong> — částice kmitají <strong>ve směru</strong> šíření, vzniká nahuštěním a zředěním částic (např. <strong>zvuk</strong>, padající kostky domina). Existuje ve všech skupenstvích.</li>
						</ul>
					`,
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
					obsah: `
						<h2>Zvuk, vznik a šíření zvuku</h2>
						<p><strong>Zvuk je mechanické vlnění, které vnímáme sluchem.</strong> Vzniká <strong>chvěním těles</strong> (rozkmitaná struna, blána bubnu, hlasivky). K šíření zvuku je vždy potřeba <strong>látkové prostředí</strong>.</p>
						<h3>Jak zvuk vzniká a šíří se</h3>
						<ul>
							<li>Chvějící se těleso stlačuje a zřeďuje částice okolního prostředí (vzduchu, vody, pevné látky).</li>
							<li>Tyto změny hustoty se šíří látkou dál od zdroje jako <strong>tlaková vlna</strong>.</li>
							<li><strong>Ve vakuu se zvuk nešíří</strong> — nejsou tam žádné částice, které by se zhušťovaly a zřeďovaly.</li>
						</ul>
						<h3>Frekvence a výška tónu</h3>
						<ul>
							<li><strong>Frekvence f</strong> (starší název kmitočet) udává počet kmitů zdroje za 1 sekundu; jednotka <strong>hertz (Hz)</strong>.</li>
							<li>Frekvence určuje <strong>výšku tónu</strong>: nízká frekvence = hluboký tón, vysoká frekvence = vysoký tón. Komorní tón <em>a</em> má 440 Hz — podle něj se ladí nástroje.</li>
							<li>Lidské ucho slyší přibližně <strong>16 Hz až 16 000 Hz</strong> (nejcitlivější je na 2000–4000 Hz).</li>
							<li><strong>Infrazvuk</strong> — pod 16 Hz (dorozumívají se jím sloni, velryby).</li>
							<li><strong>Ultrazvuk</strong> — nad 16 kHz (delfíni, netopýři — echolokace).</li>
						</ul>
						<h3>Zdroje zvuku, tón a hluk</h3>
						<p>Zvuk vzniká chvěním pružných těles — rozkmitat je lze úderem, drnkáním, smýkáním, prouděním vzduchu (píšťala) i prudkou změnou tlaku (výstřel, hrom).</p>
						<ul>
							<li><strong>Tón</strong> (hudební zvuk) vzniká <strong>pravidelným</strong> kmitáním (struna, hlasivky).</li>
							<li><strong>Hluk</strong> vzniká <strong>nepravidelným</strong> kmitáním (šramot, vrzání, praskání).</li>
						</ul>
						<h3>Rychlost zvuku</h3>
						<p>Rychlost zvuku závisí na prostředí — nejrychleji se šíří v pevných látkách, nejpomaleji v plynech:</p>
						<ul>
							<li>ve vzduchu <strong>≈ 340 m/s</strong> (mírně kolísá s teplotou a vlhkostí)</li>
							<li>ve vodě <strong>≈ 1500 m/s</strong></li>
							<li>v oceli <strong>≈ 5000 m/s</strong></li>
							<li>ve vakuu <strong>0 m/s</strong> (zvuk se nešíří)</li>
						</ul>
						<h3>Odraz zvuku: ozvěna a dozvuk</h3>
						<ul>
							<li><strong>Ozvěna</strong> — odražený zvuk uslyšíme zvlášť, má-li zpoždění aspoň <strong>0,1 s</strong>; to odpovídá překážce vzdálené aspoň <strong>17 m</strong>.</li>
							<li><strong>Dozvuk</strong> — u bližší překážky (méně než 17 m) původní a odražený zvuk splynou, zvuk se rozléhá a je zesílený (kostel, prázdná místnost).</li>
							<li><strong>Odraz ultrazvuku</strong> se využívá: <strong>sonar</strong> (hloubka moře), <strong>sonografie</strong> (zobrazení orgánů, miminka), defektoskopie (trhliny v materiálu).</li>
						</ul>
						<h3>Ohyb a pohlcování zvuku</h3>
						<ul>
							<li>Zvuk se <strong>ohýbá</strong> za překážky — hluboké tóny i za velké (proto z kapely o pár ulic dál slyšíme jen basu a buben).</li>
							<li>Měkké porézní materiály (molitan, pěna, textil) zvuk <strong>pohlcují</strong> — využití: zvuková izolace, protihlukové stěny.</li>
						</ul>
						<p>Obor fyziky, který zkoumá vznik, šíření a vnímání zvuku, se nazývá <strong>akustika</strong>.</p>
					`,
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
					],
				},
				{
					slug: 'vnimani-zvuku-a-hlasitost',
					nazev: 'Vnímání zvuku, hlasitost zvuku',
					interakce: 'decibely',
					obsah: `
						<h2>Vnímání zvuku a hlasitost</h2>
						<p>Člověk vnímá zvuk <strong>sluchem</strong>. Zvuková vlna projde uchem a nakonec ji jako zvuk vyhodnotí mozek.</p>
						<h3>Cesta zvuku uchem</h3>
						<ol>
							<li><strong>Ušní boltec</strong> zachytí zvuk z okolí a nasměruje ho do zvukovodu.</li>
							<li><strong>Zvukovod</strong> vede zvuk dál k bubínku.</li>
							<li><strong>Ušní bubínek</strong> se dopadem zvukové vlny rozkmitá (pohyb od 0,0001 mm až po 1 mm).</li>
							<li><strong>Kůstky</strong> (kladívko, kovadlinka, třmínek) přenesou kmity přes pružné okénko do vnitřního ucha.</li>
							<li><strong>Hlemýžď</strong> — kmity se přenesou do kapaliny uvnitř.</li>
							<li><strong>Vláskové buňky</strong> rozkmitá kapalina a vyšlou nervový signál. Jsou velmi jemné — <strong>při poškození se už neobnoví</strong>.</li>
							<li><strong>Sluchový nerv</strong> pošle signál do mozku, který ho vnímá jako zvuk.</li>
						</ol>
						<h3>Hlasitost zvuku</h3>
						<p>Vnímání hlasitosti je <strong>subjektivní</strong> (každý má jinou citlivost). Objektivně ji popisuje <strong>hladina intenzity zvuku</strong> — měří tlak zvukové vlny; jednotka <strong>decibel (dB)</strong>.</p>
						<ul>
							<li><strong>Práh slyšitelnosti</strong> — nejslabší slyšitelný zvuk; hladina <strong>0 dB</strong> (odtud se stupnice měří).</li>
							<li><strong>Práh bolesti</strong> — nejsilnější zvuk, který ucho snese; hladina <strong>130 dB</strong>, při překročení hrozí protržení bubínku.</li>
						</ul>
						<h3>Rizika hluku a ochrana sluchu</h3>
						<ul>
							<li>Dlouhodobý pobyt nad <strong>90 dB</strong> <strong>trvale a nevratně</strong> poškozuje nervové (vláskové) buňky.</li>
							<li>Nadměrný hluk zhoršuje psychický i fyzický stav — nesoustředěnost, bolesti hlavy, nevolnost.</li>
							<li><strong>Ochrana:</strong> protihluková sluchátka a špunty, dostatečná vzdálenost od zdroje, rozumná hlasitost ve sluchátkách, tlumiče a protihlukové stěny, ohleduplnost.</li>
						</ul>
					`,
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
					obsah: `
						<h2>Magnety a magnetické pole</h2>
						<h3>Jak látky reagují na magnet</h3>
						<ul>
							<li><strong>Feromagnetické</strong> — silně se přitahují k magnetu a lze je zmagnetovat (železo a jeho slitiny = ocel, <strong>kobalt, nikl</strong>).</li>
							<li><strong>Nemagnetické</strong> — na magnet téměř nereagují (dřevo, papír, korek i některé kovy: hliník, měď, zinek, stříbro).</li>
							<li><strong>Diamagnetické</strong> — magnet je nepatrně odpuzuje (uhlík, měď, zlato).</li>
						</ul>
						<h3>Magnety a jejich póly</h3>
						<ul>
							<li><strong>Přírodní</strong> magnet — nerost s železem (magnetit), <strong>umělé permanentní</strong> — feritový, neodymový; tvary: tyčový, podkova, magnetka (střelka kompasu).</li>
							<li>Každý magnet má <strong>severní pól (N)</strong> a <strong>jižní pól (S)</strong>. I když magnet rozlomíme, každá část má zase oba póly.</li>
							<li>Na pólech je magnetická síla <strong>nejsilnější</strong>, uprostřed je <strong>netečné pásmo</strong>, kde je nejslabší.</li>
						</ul>
						<h3>Magnetické pole</h3>
						<ul>
							<li>Vzniká v okolí magnetu a projevuje se <strong>silovým působením</strong> na magnety a feromagnetické látky.</li>
							<li><strong>Stejné póly se odpuzují, opačné přitahují.</strong> Se vzdáleností síla slábne.</li>
							<li>Jeho přítomnost zjistíme <strong>magnetkou</strong> (kompasem).</li>
						</ul>
						<h3>Zviditelnění pole</h3>
						<p>Na papír nad magnetem nasypeme <strong>železné piliny</strong> — uspořádají se do <strong>pilinového obrazce</strong>. Graficky pole kreslíme jako <strong>magnetické indukční čáry</strong>: jsou to uzavřené křivky, které vychází ze <strong>severního pólu (N)</strong> a míří k <strong>jižnímu (S)</strong>; jejich směr udává severní pól magnetky.</p>
					`,
				},
				{
					slug: 'magneticke-pole-vodice-a-civky',
					nazev: 'Magnetické pole vodiče a cívky s proudem',
					interakce: 'oersted',
					obsah: `
						<h2>Magnetické pole vodiče a cívky s proudem</h2>
						<p>Roku <strong>1820</strong> dánský fyzik <strong>H. Ch. Oersted</strong> zjistil, že se magnetka vychýlí, když blízkým vodičem začne procházet proud. <strong>Kolem vodiče s proudem tedy vzniká magnetické pole.</strong> Jeho účinky dál zkoumal <strong>A. M. Ampère</strong>.</p>
						<h3>Přímý vodič s proudem</h3>
						<ul>
							<li>Příčinou pole je <strong>pohyb elektronů</strong> (proud).</li>
							<li>Magnetické indukční čáry mají tvar <strong>soustředných kružnic</strong> se středem ve vodiči.</li>
							<li>Směr čar určíme <strong>pravidlem pravé ruky</strong>.</li>
							<li>Pole působí na vodič <strong>silou</strong> — tím větší, čím větší je proud a silnější pole. Dva rovnoběžné vodiče se stejným směrem proudu se <strong>přitahují</strong>, s opačným <strong>odpuzují</strong>. Využití: <strong>elektromotory</strong>.</li>
						</ul>
						<h3>Cívka s proudem</h3>
						<ul>
							<li><strong>Cívka</strong> = dlouhý izolovaný (lakovaný měděný) drát navinutý na válci. Silnější pole získáme navinutím vodiče do mnoha závitů.</li>
							<li>Vložením <strong>železného jádra</strong> účinky ještě zesílíme.</li>
							<li>Cívka s proudem se chová jako <strong>tyčový magnet</strong>; <strong>nejsilnější pole je uvnitř</strong>. Její póly závisí na směru proudu (pravidlo pravé ruky). Využití: <strong>elektromagnet</strong>.</li>
						</ul>
						<h3>✋ Pravidlo pravé ruky — jak se opravdu používá</h3>
						<p>Jmenuje se stejně, ale <strong>pro vodič a pro cívku se dělá jinak</strong>. Vezmi si
						pravou ruku a zkus si obojí nanečisto:</p>
						<ul>
							<li><strong>Přímý vodič:</strong> uchop ho do pravé ruky tak, aby <strong>palec mířil
							po směru proudu</strong> (od + k −). Zahnuté prsty pak ukazují, kudy kolem vodiče
							<strong>běží indukční čáry</strong>.</li>
							<li><strong>Cívka:</strong> obejmi ji pravou rukou tak, aby <strong>prsty šly po směru
							proudu v závitech</strong>. Odtažený palec pak míří k <strong>severnímu pólu</strong>
							cívky.</li>
						</ul>
						<p>👉 Vyzkoušej si hned dvě věci, které z pravidla plynou: <strong>otoč směr proudu</strong>
						(prohoď dráty na zdroji) — a severní pól cívky se přehodí na druhý konec. A druhá:
						pravidlo je <strong>na pravou ruku</strong>, protože směr proudu se dohodl od + k −.
						Levou rukou vyjde všechno obráceně.</p>
						<h3>K čemu je cívka dobrá</h3>
						<p>Tenhle magnet má oproti obyčejnému jednu obrovskou výhodu: <strong>dá se vypnout</strong>.
						A to je základ spousty věcí kolem tebe:</p>
						<ul>
							<li><strong>jeřáb na vrakovišti</strong> — přitáhne auto a nad hromadou proud vypne, náklad pustí</li>
							<li><strong>zvonek</strong> — cívka přitáhne kladívko, to <em>udeří do kovové misky</em>
							a přitom rozpojí obvod; kladívko se vrátí, obvod se zase spojí a všechno se opakuje.
							Zvuk vydává rozezvučená miska, ne to přepínání — kladívko na ni jen rychle bubnuje</li>
							<li><strong>relé</strong> — malým proudem se spíná velký (tak startér nastartuje auto)</li>
							<li><strong>reproduktor a sluchátka</strong> — cívka v poli magnetu rozkmitá membránu</li>
						</ul>
					`,
				},
				{
					slug: 'elektromagnet',
					interakce: 'elektromagnet',
					nazev: 'Elektromagnet a jeho využití',
					obsah: `
						<h2>Elektromagnet a jeho využití</h2>
						<p><strong>Elektromagnet</strong> je cívka s jádrem z <strong>magneticky měkké oceli</strong>. Ta se při zapnutí proudu rychle zmagnetuje a po vypnutí proudu její magnetické pole rychle zaniká. Pole má stejný tvar jako u tyčového magnetu.</p>
						<h3>Co ovlivňuje sílu elektromagnetu</h3>
						<ul>
							<li>Čím <strong>více závitů</strong> cívka má, tím silnější je pole.</li>
							<li>Čím <strong>větší proud</strong> cívkou teče, tím silnější je pole.</li>
						</ul>
						<h3>Výhody oproti permanentnímu magnetu</h3>
						<ul>
							<li>lze ho <strong>zapnout a vypnout</strong> (spolu s proudem),</li>
							<li>lze <strong>prohodit póly</strong> (změnou pólů zdroje),</li>
							<li>bývá <strong>mnohem silnější</strong>.</li>
						</ul>
						<h3>Kde se využívá</h3>
						<ul>
							<li><strong>jeřáby</strong> na nakládání železného šrotu,</li>
							<li><strong>elektromotor</strong>,</li>
							<li><strong>jistič</strong> — při přetížení silné pole přitáhne kotvu a rozpojí obvod (na rozdíl od pojistky lze znovu zapnout),</li>
							<li><strong>zvonek</strong> a <strong>relé</strong> (spínač řízený slabým signálem, např. závory u kolejí),</li>
							<li>oční lékařství — vytahování kovových pilin z oka.</li>
						</ul>
					`,
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
					obsah: `
						<h2>Působení magnetického pole na vodič s proudem</h2>
						<p>Vodič nebo cívka s proudem se chová jako magnet — proto na něj <strong>magnetické pole působí silou</strong>.</p>
						<h3>Magnetická síla na vodič</h3>
						<ul>
							<li><strong>Směr síly</strong> závisí na orientaci indukčních čar (pólů) a na <strong>směru proudu</strong> ve vodiči (určíme <strong>Flemingovým pravidlem levé ruky</strong>).</li>
							<li><strong>Velikost síly</strong> je tím větší, čím větší je proud.</li>
							<li>Největší síla působí na vodič <strong>kolmý</strong> k indukčním čarám; na vodič <strong>rovnoběžný</strong> s nimi nepůsobí síla žádná.</li>
						</ul>
						<h3>Cívka v magnetickém poli</h3>
						<p>Na cívku, která se může otáčet mezi póly magnetu, působí <strong>dvojice sil, které ji roztáčejí</strong>. Čím víc závitů, tím větší síla. Tento jev využívá <strong>reproduktor, ampérmetr</strong> a hlavně <strong>elektromotor</strong>.</p>
						<h3>Elektromotor</h3>
						<ul>
							<li>Mění <strong>elektrickou energii na mechanickou (pohybovou)</strong>.</li>
							<li><strong>Stator</strong> — vnější pevná část s magnety nebo elektromagnety.</li>
							<li><strong>Rotor (kotva)</strong> — otáčející se část s cívkami uvnitř.</li>
							<li><strong>Stejnosměrný motor</strong> potřebuje <strong>komutátor</strong> — dělený kroužek s kartáčky, který každou půlotočku obrátí směr proudu v cívce, aby se rotor točil stále dál.</li>
							<li>Využití: vysavač, výtah, elektromobil, elektrické nářadí, tramvaje, hračky.</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak se točí elektromotory', cesta: 'Hi-Tc84eglY' },
					],
				},
				{
					slug: 'elektromagneticka-indukce',
					interakce: 'indukce',
					nazev: 'Elektromagnetická indukce',
					obsah: `
						<h2>Elektromagnetická indukce</h2>
						<p>Víme, že kolem vodiče s proudem vzniká magnetické pole. Anglický fyzik <strong>Michael Faraday</strong> hledal opačnou cestu — jak <strong>pomocí magnetického pole vytvořit ve vodiči proud</strong>.</p>
						<h3>Pokus a princip</h3>
						<p>Když k cívce připojené k voltmetru <strong>pohybujeme magnetem</strong>, na svorkách cívky se objeví napětí; v uzavřeném obvodu pak teče proud. <strong>Elektromagnetická indukce</strong> je jev, který nastává při <strong>změně magnetického pole</strong> v okolí vodiče nebo cívky — vzniká <strong>indukované napětí</strong> a <strong>indukovaný proud</strong>.</p>
						<ul>
							<li>Změnu pole zajistíme <strong>pohybem magnetu</strong> nebo <strong>změnou proudu v elektromagnetu</strong> (zapnutím, vypnutím, změnou směru či velikosti).</li>
							<li>Pokud se pole <strong>nemění</strong> (magnet stojí), <strong>nic se neindukuje</strong>.</li>
							<li>Platí <strong>zákon zachování energie</strong>: pohybová energie magnetu se mění na energii elektrickou.</li>
						</ul>
						<h3>Na čem závisí velikost a směr indukovaného napětí</h3>
						<ul>
							<li><strong>rychlost pohybu</strong> magnetu — rychleji = větší napětí,</li>
							<li><strong>směr pohybu</strong> — opačný směr = opačná polarita,</li>
							<li><strong>síla magnetu</strong> a <strong>počet závitů</strong> cívky — víc = větší napětí,</li>
							<li>rychlost změny pole (největší při zapnutí a vypnutí elektromagnetu).</li>
						</ul>
						<h3>Kde se využívá</h3>
						<p>Alternátor a dynamo v elektrárnách, zapalovací svíčky motorů, „protřepávací" svítilny, <strong>indukční brzdy</strong>, <strong>indukční varná deska</strong>, indukční pec na tavení kovů, <strong>bezdrátové nabíječky</strong>, transformátor i elektrická kytara.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Elektromagnetická indukce 1', cesta: 'HTQTf58aXBQ' },
						{ druh: 'youtube', nazev: 'Video: Elektromagnetická indukce 2', cesta: 'gn-CN3StDUs' },
					],
				},
				{
					slug: 'vznik-stridaveho-proudu-alternator',
					nazev: 'Vznik střídavého proudu, alternátor',
					interakce: 'alternator',
					obsah: `
						<h2>Vznik střídavého proudu a alternátor</h2>
						<p>Při pohybu magnetu u cívky se indukuje proud a napětí. Protože <strong>směr pohybu určuje směr proudu</strong>, při otáčení se proud pravidelně obrací. Takovému proudu říkáme <strong>střídavý proud</strong> — odebíráme ho ze zásuvky.</p>
						<p>Graf střídavého proudu ukazuje, jak jeho velikost <strong>kolísá mezi nulou a maximem</strong> a jak se mění směr (opačný směr = záporná hodnota).</p>
						<h3>Alternátor</h3>
						<ul>
							<li>Je to <strong>elektrický generátor</strong> — točivý stroj, který vyrábí <strong>střídavý proud</strong> na principu elektromagnetické indukce.</li>
							<li>Přeměňuje <strong>pohybovou (rotační) energii na elektrickou</strong>.</li>
							<li>Největší napětí se indukuje tehdy, když se pole v závitu mění <strong>nejrychleji</strong>. <strong>Kroužky</strong> zajišťují kontakt s otáčející se cívkou.</li>
						</ul>
						<h3>Rotor a stator</h3>
						<ul>
							<li><strong>Rotor</strong> — otáčející se část, vytváří proměnlivé magnetické pole (magnet nebo elektromagnet).</li>
							<li><strong>Stator</strong> — pevná část s cívkami, kde se indukuje napětí. Tři cívky = <strong>třífázové napětí</strong> (vyrábí se v elektrárnách).</li>
							<li>Kdybychom místo kroužků použili <strong>komutátor</strong>, získáme stejnosměrný proud — takový generátor je <strong>dynamo</strong>.</li>
						</ul>
						<h3>Kde se využívá</h3>
						<p>V <strong>automobilu</strong> (za jízdy nabíjí akumulátor), v <strong>elektrocentrále</strong> (záložní zdroj) a ve <strong>všech elektrárnách kromě solárních</strong> — turbína roztáčí rotor alternátoru.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Příběh střídavého proudu (generátor)', cesta: '3Y_USuTTVbw' },
					],
				},
				{
					slug: 'vlastnosti-stridaveho-proudu',
					nazev: 'Vlastnosti střídavého proudu',
					obsah: `
						<h2>Vlastnosti střídavého proudu</h2>
						<p>Při rovnoměrném otáčení cívky v magnetickém poli vzniká <strong>pravidelně proměnné napětí</strong> a obvodem teče proud se stejným průběhem. Zdrojem je nejčastěji <strong>zásuvka</strong>. Elektrony ve vodiči přitom <strong>opakovaně mění směr</strong> podle polarity zdroje.</p>
						<h3>Perioda a frekvence</h3>
						<ul>
							<li>Grafem střídavého proudu je <strong>sinusoida</strong>.</li>
							<li><strong>Perioda T</strong> — nejkratší doba, za kterou se průběh opakuje (= doba jedné otočky cívky); jednotka <strong>sekunda (s)</strong>.</li>
							<li><strong>Frekvence f</strong> — počet period za sekundu (= počet otoček cívky za sekundu); jednotka <strong>hertz (Hz)</strong>. Platí <strong>f = 1 / T</strong>.</li>
						</ul>
						<h3>Maximální a efektivní hodnota</h3>
						<ul>
							<li><strong>Maximální hodnota</strong> (I<sub>m</sub>, U<sub>m</sub>) — největší okamžitá hodnota; nastává dvakrát za periodu.</li>
							<li><strong>Efektivní hodnota</strong> (I, U) — odpovídá stejnosměrnému proudu se <strong>stejnými účinky</strong>; právě tu měří přístroje. Je rovna zhruba <strong>70 % maximální hodnoty</strong>.</li>
						</ul>
						<h3>Výkon a síť</h3>
						<p>Výkon se počítá z efektivních hodnot: <strong>P = U · I</strong>. V rozvodné síti používáme napětí s efektivní hodnotou <strong>230 V</strong> a frekvencí <strong>50 Hz</strong>.</p>
					
						<p>Proud v síti se sto­krát za sekundu na okamžik vynuluje, a přesto žárovka nebliká: vlákno
							je tak rozžhavené, že za tu setinu sekundy nestihne vychladnout — a naše oko by tak
							rychlou změnu stejně nepostřehlo.</p>
						<h3>🧮 Co ta čísla ze zásuvky znamenají</h3>
						<p>Obě si můžeš snadno rozebrat:</p>
						<ul>
							<li><strong>50 Hz</strong> → perioda <em>T</em> = 1 : <em>f</em> = 1 : 50 = <strong>0,02 s</strong>,
							tedy <strong>20 milisekund</strong> na jednu otočku cívky v alternátoru. Za tu dobu
							projde napětí nulou <em>dvakrát</em> — proto těch stokrát za sekundu.</li>
							<li><strong>230 V</strong> je hodnota <strong>efektivní</strong>, ne největší. Maximum
							z ní dostaneš vynásobením <strong>1,4</strong> (přesněji √2): 230 · 1,4 ≈
							<strong>325 V</strong>. Ve špičce má tedy napětí v zásuvce kolem 325 V.
							Právě proto se u součástek hlídá, jaké napětí <em>vydrží</em> — a proto je
							zásuvka ještě nebezpečnější, než se podle čísla 230 zdá.</li>
						</ul>
						<h3>Proč vůbec střídavý, když stejnosměrný je jednodušší?</h3>
						<p>Odpověď je jediná a velmi praktická: <strong>střídavé napětí umí transformátor měnit</strong>
						nahoru a dolů, stejnosměrné ne. A to je pro rozvod elektřiny všechno.</p>
						<p>Vedení totiž ztrácí energii zahříváním drátů, a ztráty rostou <strong>s proudem</strong>
						(ne s napětím). Elektrárna proto napětí <strong>vytransformuje nahoru</strong> na stovky
						kilovoltů — tím při stejném výkonu <em>klesne proud</em> a vedení skoro netopí — a před
						domem se zase <strong>sníží na 230 V</strong>. Bez střídavého proudu by dálkový přenos
						elektřiny nebyl možný a elektrárna by musela stát v každém městě.</p>`,
				},
				{
					slug: 'transformator',
					nazev: 'Transformátor',
					interakce: 'transformator',
					obsah: `
						<h2>Transformátor</h2>
						<p><strong>Transformátor</strong> slouží k přenosu elektrické energie a zároveň ke <strong>změně (transformaci) velikosti napětí</strong>.</p>
						<h3>Jak funguje</h3>
						<ul>
							<li>Má <strong>dva obvody</strong>, každý se svou cívkou, na <strong>společném ocelovém jádře</strong>.</li>
							<li><strong>Primární cívka</strong> je na zdroji střídavého napětí; v <strong>sekundární</strong> se <strong>indukuje</strong> střídavé napětí.</li>
							<li>Pracuje <strong>jen na střídavé napětí</strong> — indukce potřebuje proměnlivé magnetické pole. Účinnost bývá až <strong>98 %</strong>.</li>
						</ul>
						<h3>Rovnice transformátoru</h3>
						<p>Napětí se mění ve stejném poměru jako počty závitů: <strong>U₂ / U₁ = N₂ / N₁</strong>.</p>
						<ul>
							<li><strong>Transformace nahoru</strong> (k > 1) — sekundární cívka má víc závitů, napětí <strong>roste</strong> (např. 400 kV pro dálkový přenos, zapalovací svíčka).</li>
							<li><strong>Transformace dolů</strong> (k < 1) — méně závitů, napětí <strong>klesá</strong> (nabíječky, rozvod 230 V do domácnosti).</li>
							<li><strong>Proud</strong> se mění v <strong>opačném poměru</strong> než napětí (výkon P = U·I zůstává stejný): kolikrát klesne napětí, tolikrát vzroste proud.</li>
						</ul>
						<p>Transformace velkého proudu se využívá v <strong>indukční peci</strong>, při <strong>svařování obloukem</strong> (nízké napětí, velký proud) a v pistolové páječce.</p>
						<h3>✏️ Příklady z hodiny</h3>
						<ol>
							<li>Primární cívka má <strong>500 závitů</strong> a napětí <strong>200 V</strong>; sekundární má <strong>100 závitů</strong>. Jaké je výstupní napětí? <details><summary>řešení</summary>k = N₂/N₁ = 100/500 = 0,2 → U₂ = 0,2 · 200 = <strong>40 V</strong> (transformace dolů)</details></li>
							<li>Primární cívka má <strong>100 závitů</strong> a napětí <strong>200 V</strong>; sekundární má <strong>500 závitů</strong>. Jaké je výstupní napětí? <details><summary>řešení</summary>k = N₂/N₁ = 500/100 = 5 → U₂ = 5 · 200 = <strong>1 000 V</strong> (transformace nahoru)</details></li>
						</ol>
					`,
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
					obsah: `
						<h2>Přenos elektrické energie</h2>
						<h3>Výroba a fáze</h3>
						<ul>
							<li>Elektřina se vyrábí ve velkých <strong>alternátorech</strong> jako <strong>střídavý proud</strong>.</li>
							<li>Alternátor má <strong>tři cívky</strong> → vzniká <strong>trojfázový proud</strong> (napětí každé fáze je posunuté o třetinu periody). Proto se při dálkovém přenosu vedou <strong>tři vodiče</strong>.</li>
							<li>Napětí mezi fázovým vodičem a zemí je <strong>230 V</strong>, mezi dvěma fázemi <strong>400 V</strong>.</li>
						</ul>
						<h3>Přenosová a distribuční soustava</h3>
						<ul>
							<li><strong>Přenosová soustava</strong> — dopravuje energii na velké vzdálenosti nadzemním vedením za <strong>velmi vysokého napětí 220 kV nebo 400 kV</strong>. Vysoké napětí znamená <strong>malý proud</strong>, a tím <strong>malé ztráty</strong> ve vedení.</li>
							<li><strong>Distribuční soustava</strong> — rozvádí energii k odběratelům (napětí <strong>22 kV</strong>), nakonec transformované na <strong>230 V</strong> do zásuvky.</li>
						</ul>
						<h3>Prvky sítě a spotřebitel</h3>
						<ul>
							<li><strong>Vedení</strong> (doma měděné vodiče v izolaci, při dálkovém přenosu neizolovaná hliníková lana s ocelovým jádrem, zavěšená vysoko nad zemí — hliník je proti mědi mnohem lehčí a ocelová duše lano unese), <strong>transformátory</strong>, <strong>rozvodny</strong> a ochranná zařízení.</li>
							<li>Domácnost využívá <strong>jednu fázi (230 V)</strong>; velké stroje všechny tři fáze (3×400 V). V zásuvce je <strong>fázový</strong> vodič, <strong>nulovací</strong> (uzemněný) a <strong>ochranný kolík</strong>.</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Cesta elektřiny', cesta: 'fimbeSGx8iY' },
					],
				},
				{
					slug: 'vedeni-proudu-v-kapalinach',
					nazev: 'Vedení elektrického proudu v kapalinách, elektrolýza',
					interakce: 'elektrolyza',
					obsah: `
						<h2>Vedení elektrického proudu v kapalinách</h2>
						<p><strong>Destilovaná voda proud nevede</strong> — žárovka v obvodu nesvítí. Jakmile do ní přisypeme <strong>kuchyňskou sůl</strong>, žárovka se rozsvítí. (Sůl v pevném stavu ale vodivá není.)</p>
						<h3>Proč roztok soli vede proud</h3>
						<ul>
							<li>Molekuly vody naruší krystalovou mřížku soli a vzniknou <strong>ionty</strong>: kladné kationty Na⁺ a záporné anionty Cl⁻.</li>
							<li>Po zapojení zdroje se <strong>kationty pohybují k záporné elektrodě</strong> a <strong>anionty ke kladné</strong>. Tento usměrněný pohyb iontů je elektrický proud.</li>
						</ul>
						<h3>Elektrody a elektrolyty</h3>
						<ul>
							<li><strong>Katoda</strong> přitahuje kladné kationty, <strong>anoda</strong> přitahuje záporné anionty. <strong>Pozor:</strong> elektrody se jmenují podle iontů, které přitahují, ne podle svého náboje.</li>
							<li><strong>Elektrolyt</strong> = kapalina, která vede proud (roztoky solí, kyselin, zásad). Vodivá je i pitná voda (obsahuje minerály).</li>
						</ul>
						<h3>Elektrolýza a její využití</h3>
						<p><strong>Elektrolýza</strong> je děj, při kterém průchodem proudu elektrolytem nastávají <strong>látkové změny</strong>.</p>
						<ul>
							<li>výroba čistých látek (chlor a vodík rozkladem, čisté kovy z rudy),</li>
							<li><strong>pokovování</strong> — pozlacení, pochromování, pozinkování (kvůli vzhledu, ceně a ochraně proti korozi).</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Vedení proudu v kapalinách', cesta: 'D_aMAsD-EKM' },
					],
				},
				{
					slug: 'chemicke-zdroje-napeti',
					nazev: 'Chemické zdroje elektrického napětí',
					obsah: `
						<h2>Chemické zdroje elektrického napětí</h2>
						<p>Chemický zdroj napětí získáme, když do <strong>elektrolytu</strong> (vodivého roztoku) ponoříme <strong>dvě elektrody z různých materiálů</strong> (kovy, případně uhlík). Chemické reakce přesunou náboj — na jedné elektrodě se hromadí elektrony (záporná), na druhé ubývají (kladná).</p>
						<ul>
							<li><strong>Anoda</strong> — u článku, který se vybíjí, je to elektroda <strong>záporná</strong> (zinek, lithium).</li>
							<li><strong>Katoda</strong> — u vybíjejícího se článku elektroda <strong>kladná</strong> (uhlík/grafit, měď).</li>
						</ul>
						<p>⚠️ <strong>Nespojuj si anodu natrvalo se znaménkem mínus.</strong> Názvy se totiž řídí
						tím, <em>co se na elektrodě děje</em>, ne polaritou — a ta se při jiném ději obrátí:
						při <strong>elektrolýze i při nabíjení</strong> akumulátoru je anoda <strong>kladná</strong>.
						Pravidlo „anoda = mínus" tedy platí jen pro článek, který zrovna dodává proud.</p>
						<h3>Nejznámější články</h3>
						<ul>
							<li><strong>Suchý článek</strong> — zinková nádoba (−), uhlíková tyčinka (+), salmiaková pasta; napětí <strong>1,5 V</strong>, jednorázový (v hračkách).</li>
							<li><strong>Plochá baterie</strong> — tři suché články za sebou, napětí <strong>4,5 V</strong>.</li>
							<li><strong>Alkalické</strong> — vyšší kapacita a životnost (blesk fotoaparátu).</li>
							<li><strong>Lithiové</strong> (jednorázové) — kvalitní i po letech skladování; hodinky, klíč od auta, záložní baterie na základní desce počítače.</li>
							<li><strong>Olověný akumulátor</strong> — velká kapacita, <strong>dobíjecí</strong>, napětí <strong>12 V</strong> (autobaterie).</li>
						</ul>
						<h3>Uvnitř článku neteče proud elektronů</h3>
						<p>Tohle je nejdůležitější rozdíl oproti drátu — a zapadá do celého tohoto celku o vedení
						proudu v různých látkách. <strong>V kovu proud tvoří volné elektrony</strong>, ale
						<strong>v elektrolytu se pohybují ionty</strong>: nabité částice, které vznikly z rozpuštěné
						látky. A protože jsou mezi nimi kladné i záporné, putují <strong>oběma směry současně</strong>
						— každé ke své elektrodě.</p>
						<p>Obvod se tak skládá ze dvou různých dějů: <strong>vně</strong> článku běží drátem elektrony
						od záporné elektrody ke kladné, <strong>uvnitř</strong> ho uzavírají ionty v roztoku. Bez toho
						druhého by se náboj na elektrodách okamžitě nashromáždil a proud by se zastavil.</p>
						<h3>Napětí článku určuje dvojice kovů</h3>
						<p>Proč zrovna 1,5 V? Každý kov se snaží posílat elektrony jinak ochotně, a
						<strong>napětí článku je dané právě tím rozdílem</strong> mezi oběma kovy. Proto:</p>
						<ul>
							<li>napětí <strong>nezáleží na velikosti</strong> článku — tužková i buřtová dají 1,5 V;
							větší jen vydrží déle (<strong>kapacita</strong> v mAh)</li>
							<li>vyššího napětí se dosáhne <strong>sériovým zapojením</strong>: 3 × 1,5 V = 4,5 V
							(plochá), 6 × 2 V = 12 V (autobaterie)</li>
							<li>ze <strong>dvou stejných materiálů</strong> žádný článek nesestavíš — rozdíl by byl nulový</li>
						</ul>
						<p>💡 Vyzkoušej doma: zapíchni do citronu <strong>zinkový</strong> plíšek (postačí
						pozinkovaný hřebík) a vedle něj <strong>měděný</strong> (kousek drátu nebo mince s velkým
						podílem mědi), pár milimetrů od sebe, ale tak, aby se nedotýkaly. Přiložením
						<strong>voltmetru</strong> naměříš kolem <strong>1 V</strong> — citronová šťáva slouží jako
						elektrolyt. A hlavní pointa téhle stránky: se <em>dvěma měděnými</em> plíšky nenaměříš nic,
						i kdyby byl citron sebekyselejší.</p>
						<p>⚠️ Dvě věci k tomu pokusu: napětí měř <strong>měřicím přístrojem, nikdy jazykem</strong> —
						a <strong>citron už potom nejez</strong>. Do šťávy se z plíšků uvolňují ionty zinku a mědi,
						které do těla nepatří. Použité plíšky vyhoď a ruce si umyj.</p>
						<h3>Dnešní akumulátory</h3>
						<ul>
							<li><strong>Lithium-iontový</strong> (mobil, notebook, elektromobil) — lehký, velká kapacita,
							snese stovky nabití. Nemá rád úplné vybití ani vysokou teplotu.</li>
							<li><strong>Palivový článek</strong> — zvláštní případ: nevybíjí se, protože se do něj
							palivo (vodík) <strong>průběžně dodává</strong>. Odpadem je čistá voda.</li>
						</ul>
					`,
				},
				{
					slug: 'vedeni-proudu-v-plynech',
					nazev: 'Vedení elektrického proudu v plynech',
					interakce: 'jiskra',
					obsah: `
						<h2>Vedení elektrického proudu v plynech</h2>
						<p>Vzduch je za běžných podmínek <strong>špatný vodič</strong>, ale ne dokonalý izolant — nabitý elektroskop se časem sám vybíjí, protože ve vzduchu je malé množství nabitých částic. <strong>Horký vzduch vede mnohem lépe</strong> (plamen svíčky elektroskop vybije rychle).</p>
						<h3>Ionizace plynu</h3>
						<ul>
							<li>Při vysoké teplotě se molekuly rychle srážejí, uvolní se elektron a vznikne <strong>kladný iont</strong>; elektron se přidá k jiné molekule a vznikne <strong>záporný iont</strong>.</li>
							<li>Vlivem kosmického záření je vzduch ve výšce vodivější (ve 50 km už velmi dobrý vodič).</li>
						</ul>
						<h3>Výboje v plynech</h3>
						<ul>
							<li><strong>Blesk</strong> (jiskrový výboj) — dlouhý 2–3 km, v kanálu až <strong>20 000–30 000 °C</strong>; hrom vzniká rychlým rozpínáním ohřátého vzduchu. Blesk vidíme dřív, než slyšíme hrom (zvuk je pomalejší). Ochrana: <strong>bleskosvod</strong> (B. Franklin a Prokop Diviš).</li>
							<li><strong>Elektrický oblouk</strong> — mezi uhlíkovými elektrodami; využití při <strong>svařování</strong> (nutná ochrana zraku).</li>
							<li><strong>Výboj ve zředěných plynech</strong> — barva světla závisí na plynu; využití: <strong>světelné reklamy</strong>.</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jak funguje blesk', cesta: 'rTo2z2xTOGk' },
					],
				},
				{
					slug: 'polovodice-vlastni-vodivost',
					nazev: 'Polovodiče, vlastní vodivost polovodičů',
					obsah: `
						<h2>Polovodiče a jejich vlastní vodivost</h2>
						<p>Nejznámější polovodiče jsou <strong>křemík (Si)</strong> a germanium. Nechovají se ani jako vodič, ani jako izolant — jsou „napůl".</p>
						<h3>Odpor závisí na teplotě opačně než u kovů</h3>
						<ul>
							<li>Kovy: s rostoucí teplotou <strong>roste odpor</strong>.</li>
							<li>Polovodiče: při nízké teplotě mají <strong>velký odpor</strong> (skoro nevedou), s rostoucí teplotou <strong>odpor klesá a vodivost roste</strong>. Čím teplejší polovodič, tím lepší vodič.</li>
						</ul>
						<h3>Vlastní vodivost</h3>
						<ul>
							<li>Křemík (IV. skupina) má 4 valenční elektrony a v krystalu tvoří pevné vazby.</li>
							<li>Zahřátím se elektron vytrhne z vazby → vznikne <strong>volný elektron</strong> a na jeho místě <strong>díra</strong>. Vzniká vždy pár elektron–díra.</li>
							<li><strong>Díra se chová jako kladná částice</strong> a pohybuje se opačným směrem než elektrony.</li>
							<li>Proud v polovodiči tvoří pohyb <strong>volných elektronů a děr</strong>.</li>
						</ul>
						<h3>Využití</h3>
						<ul>
							<li><strong>Termistor</strong> — mění odpor s teplotou (elektronické teploměry, měření vysokých teplot).</li>
							<li><strong>Fotorezistor</strong> — mění odpor podle osvětlení (fotobuňka, optická závora).</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Polovodiče pohánějí náš svět', cesta: 'W7V0PBb97eY' },
					],
				},
				{
					slug: 'polovodice-typu-n-a-p-dioda',
					nazev: 'Polovodiče typu N a P, dioda',
					interakce: 'dioda',
					obsah: `
						<h2>Polovodiče typu N a P, dioda</h2>
						<p>Vodivost polovodiče zvýšíme přidáním nepatrné <strong>příměsi</strong> — prvku s jiným počtem valenčních elektronů než křemík. Vznikne <strong>nevlastní polovodič</strong>.</p>
						<ul>
							<li><strong>Typ N</strong> (negativní) — příměs z V. skupiny (fosfor, arsen, antimon) má o 1 elektron víc → <strong>volné elektrony navíc</strong>, elektronová vodivost.</li>
							<li><strong>Typ P</strong> (pozitivní) — příměs z III. skupiny (bor, hliník, galium, indium) má o 1 elektron míň → <strong>díry navíc</strong>, děrová vodivost.</li>
						</ul>
						<h3>Přechod PN</h3>
						<ul>
							<li><strong>Propustný směr</strong> (N k zápornému, P ke kladnému pólu) — proud <strong>prochází</strong>.</li>
							<li><strong>Závěrný směr</strong> (obráceně) — proud <strong>neprochází</strong>, polovodič se chová jako vypnutý spínač.</li>
						</ul>
						<h3>Součástky s přechodem PN</h3>
						<ul>
							<li><strong>Dioda</strong> — propouští proud jen jedním směrem; mění střídavý proud na stejnosměrný. Šipka ve značce udává propustný směr.</li>
							<li><strong>Fotodioda</strong> — mění světlo na elektřinu; základ fotovoltaických článků.</li>
							<li><strong>LED (svítivá dioda)</strong> — mění elektřinu na světlo, jen v propustném zapojení; nízká spotřeba, dlouhá životnost.</li>
							<li><strong>Tranzistor</strong> — dva přechody PN, funguje jako rychlý spínač; základ veškeré elektroniky.</li>
						</ul>
					`,
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
					obsah: `
						<h2>Elektrická energie a její přeměny</h2>
						<p>Elektrická energie je výhodná tím, že se snadno mění na jiné druhy energie i naopak.</p>
						<h3>Elektrická energie se mění na…</h3>
						<ul>
							<li><strong>tepelnou</strong> — proud zahřívá vodič (větší odpor a proud = více tepla): vařič, žehlička, topení, pájka;</li>
							<li><strong>světelnou</strong> — žárovka, výbojka (reklamy, zářivky), <strong>LED</strong>;</li>
							<li><strong>magnetickou</strong> — kolem vodiče či cívky vzniká pole: elektromagnet;</li>
							<li><strong>pohybovou</strong> — na vodič v magnetickém poli působí síla: elektromotor, reproduktor;</li>
							<li><strong>chemickou</strong> — elektrolýza a pokovování.</li>
						</ul>
						<h3>…a naopak vzniká z jiné energie</h3>
						<ul>
							<li><strong>pohybová → elektrická</strong> — elektromagnetická indukce v <strong>alternátoru</strong> (elektrárny);</li>
							<li><strong>magnetická → elektrická</strong> — indukce v <strong>transformátoru</strong>;</li>
							<li><strong>světelná → elektrická</strong> — <strong>solární panely</strong>, fotovoltaika;</li>
							<li><strong>chemická → elektrická</strong> — galvanické články a akumulátory.</li>
						</ul>
						<p>Platí přitom <strong>zákon zachování energie</strong> — energie se jen přeměňuje, nevzniká ani nezaniká.</p>
						<h3>Tak proč mluvíme o „spotřebě" energie?</h3>
						<p>Když energie nezaniká, co se s ní vlastně stane, než přijde účet? Nic se neztratilo —
						jen <strong>skončila jako teplo</strong> rozptýlené do okolí. Mixér ohřeje těsto i motor,
						žárovka pokoj, nabíječka sebe samu. Teplo rozptýlené po celém pokoji už ale nedokážeš
						sebrat a použít znovu.</p>
						<p>👉 Proto je poctivější říkat, že energii <strong>„znehodnocujeme"</strong>, ne
						spotřebováváme: pořád jí je stejně, jen se z použitelné podoby změnila na nepoužitelnou.
						A právě tenhle jednosměrný sešup je důvod, proč <strong>žádný stroj nevydá víc, než do něj
						dáme</strong> — a proč nemůže existovat perpetuum mobile.</p>
						<p>💡 Zamysli se nad <strong>přímotopem</strong>: veškerá elektřina v něm skončí jako teplo,
						takže se dá říct, že jeho účinnost je prakticky 100 %. Není to výjimka ze zákona ani
						protiklad k tomu, co ses učil(a) o ztrátách — je to případ, kdy je „ztrátové" teplo
						<strong>přesně tím, co po stroji chceme</strong>. Totéž teplo je u počítače nebo motoru
						ztráta. <strong>Jestli je energie užitečná, nerozhoduje fyzika, ale náš záměr.</strong></p>
					`,
				},
				{
					slug: 'ucinky-proudu-bezpecnost',
					nazev: 'Účinky proudu na organismus, bezpečnost',
					obsah: `
						<h2>Účinky proudu na organismus a bezpečnost</h2>
						<p><strong>Lidské tělo je vodič.</strong> Účinky proudu bývají negativní (poškození zdraví), ale i pozitivní (elektroléčba ve fyzioterapii). Průchod proudu tělem způsobuje <strong>popáleniny, křeče svalů, fibrilaci srdce</strong> (u střídavého proudu) a poškození nervů a mozku.</p>
						<h3>Míra poškození podle velikosti proudu</h3>
						<ul>
							<li>0,5–1 mA — práh vnímání,</li>
							<li>6–15 mA — křeč, člověk se <strong>nemůže pustit</strong>,</li>
							<li>25 mA — křeč dýchacích svalů,</li>
							<li>60 mA — fibrilace (chvění) srdce,</li>
							<li><strong>nad 80 mA — zpravidla trvalá zástava srdce.</strong></li>
						</ul>
						<h3>Co velikost proudu ovlivňuje</h3>
						<ul>
							<li><strong>Odpor člověka:</strong> v suchu a suché obuvi asi <strong>150 000 Ω</strong>, ve vlhku jen asi <strong>2000 Ω</strong> → mokrý člověk je mnohem víc ohrožen.</li>
							<li><strong>Cesta proudu:</strong> nejnebezpečnější je přes <strong>ruku do srdce</strong> nebo přes hlavu (mozek).</li>
							<li><strong>Bezpečné napětí</strong> dle normy: stejnosměrné <strong>25 V</strong>, střídavé <strong>12 V</strong> (zásuvka 230 V je nebezpečná).</li>
						</ul>
						<h3>Bezpečná pravidla</h3>
						<ul>
							<li>na vypínač ani kabely nesahat <strong>mokrou rukou</strong>, žádné spotřebiče ve vaně a sprše,</li>
							<li>před výměnou žárovky <strong>vypnout jistič</strong>; do zásuvky nestrkat předměty,</li>
							<li>nedotýkat se poškozených kabelů ani spadlých drátů vedení.</li>
						</ul>
						<h3>⚡ Bezpečné vzdálenosti od elektrického vedení</h3>
						<p>Čím vyšší napětí, tím dál dokáže elektřina <strong>přeskočit vzduchem</strong> — proto se od vedení (i spadlých drátů) drž dál:</p>
						<ul>
							<li>do 1 kV (dráty na ulici): <strong>7 metrů</strong></li>
							<li>do 35 kV (venkovské vedení): <strong>10 metrů</strong></li>
							<li>do 110 kV: <strong>12 metrů</strong> · do 220 kV: <strong>15 metrů</strong></li>
							<li>do 400 kV (velké stožáry dálkového přenosu): <strong>20 metrů</strong>, nad 400 kV až <strong>25 metrů</strong></li>
						</ul>
						<h3>První pomoc při úrazu proudem</h3>
						<ol>
							<li><strong>vypni proud</strong> (vypínač, jistič, pojistky),</li>
							<li>dbej na <strong>vlastní bezpečnost</strong> — zraněného odsuň <strong>suchou dřevěnou/plastovou tyčí</strong>, ne holou rukou,</li>
							<li>zkontroluj dech a tep, případně <strong>masáž srdce a umělé dýchání</strong>,</li>
							<li>zavolej <strong>155</strong>.</li>
						</ol>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Elektrická bezpečnost', cesta: 'VfCqvZDHUWQ' },
						{ druh: 'youtube', nazev: 'Video: Domovní elektroinstalace', cesta: 'jhqpxSjUCMk' },
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
					obsah: `
						<h2>Jádro atomu</h2>
						<p>Atom je velice malý (velikost řádově <strong>10⁻¹⁰ m</strong>) a skládá se z <strong>jádra</strong> a <strong>obalu</strong>.</p>
						<ul>
							<li><strong>Obal</strong> tvoří <strong>elektrony</strong> — záporně nabité částice. V kovech tvoří volné elektrony elektrický proud.</li>
							<li><strong>Jádro</strong> tvoří <strong>protony</strong> (kladné) a <strong>neutrony</strong> (bez náboje). Společně se nazývají <strong>nukleony</strong>.</li>
							<li>Jádro je maličké, ale je v něm soustředěna <strong>téměř všechna hmotnost</strong> atomu.</li>
							<li>Za normálních podmínek je atom <strong>elektricky neutrální</strong> — počet protonů v jádře a elektronů v obalu je stejný.</li>
						</ul>
						<h3>🔬 Jak jsme objevovali atom (modely atomu)</h3>
						<ul>
							<li><strong>Daltonův model (1803)</strong> — atom jako malá, nedělitelná kulička; každý prvek má své vlastní atomy</li>
							<li><strong>Thomsonův model (1897)</strong> — „rozinky v pudinku": J. J. Thomson objevil elektron; atom si představoval jako kladnou hmotu (pudink) s rozptýlenými elektrony (rozinkami)</li>
							<li><strong>Rutherfordův model (1911)</strong> — pokus s ostřelováním zlaté fólie ukázal, že téměř všechna hmota je v malém kladném <strong>jádře</strong> a elektrony obíhají kolem</li>
							<li><strong>Bohrův model (1913)</strong> — elektrony obíhají jen po určitých drahách (slupkách) s danou energií, „jako planety kolem Slunce"</li>
							<li><strong>Moderní kvantový model</strong> — elektron nemá přesnou dráhu; známe jen oblasti (<strong>orbitaly</strong>), kde se nejpravděpodobněji nachází</li>
						</ul>
						<p>👉 Každý nový pokus model vylepšil — věda se vyvíjí postupným zpřesňováním.</p>
						<h3>Popis jádra</h3>
						<ul>
							<li><strong>Protonové číslo Z</strong> — počet protonů; <strong>určuje, o jaký prvek jde</strong> (najdeme v periodické tabulce).</li>
							<li><strong>Nukleonové číslo A</strong> — počet nukleonů (protonů + neutronů); určuje hmotnost jádra.</li>
							<li>Počet neutronů = <strong>A − Z</strong> (např. uran ²³⁸U: 92 protonů, 238 − 92 = 146 neutronů).</li>
						</ul>
						<h3>Izotopy</h3>
						<p><strong>Izotopy</strong> téhož prvku mají stejné protonové číslo, ale <strong>různé nukleonové číslo</strong> (různý počet neutronů). Mají stejné chemické vlastnosti, ale liší se hmotností a chováním při jaderných reakcích. Např. uhlík ¹²C, ¹³C, ¹⁴C nebo vodík (lehký, deuterium, tritium).</p>
						<h3>Jaderné síly</h3>
						<p><strong>Jaderné síly</strong> jsou velmi silné přitažlivé síly, které působí jen na krátkou vzdálenost (uvnitř jádra) a drží nukleony pohromadě — překonávají odpudivou elektrickou sílu mezi protony. Čím je jádro větší, tím je <strong>méně stabilní</strong> a snáz se rozpadá.</p>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Jádro atomu a síly v jádře', cesta: 'gbUMqax9SMs' },
						{ druh: 'youtube', nazev: 'Video: Atom, iont, izotop', cesta: '5WUfEMAbwQM' },
						{ druh: 'youtube', nazev: 'Video: Atomy a modely', cesta: 'uszDiE3FDQk' },
					],
				},
				{
					slug: 'radioaktivita',
					nazev: 'Radioaktivita, ochrana před zářením',
					interakce: 'rozpad',
					obsah: `
						<h2>Radioaktivita</h2>
						<p>Roku <strong>1896</strong> objevil <strong>Henri Becquerel</strong>, že z uranové rudy vychází neviditelné záření. Manželé <strong>Curieovi</strong> zjistili, že má tři složky, a <strong>Rutherford</strong> dokázal, že vychází z jádra atomu.</p>
						<p><strong>Radioaktivita</strong> je <strong>samovolný rozpad nestabilních jader</strong> — jádra těžších prvků se samovolně mění na jiná a uvolňují <strong>ionizující záření</strong>. Nelze ho nijak ovlivnit. Látky, které záření vydávají, se nazývají <strong>radionuklidy</strong> (uran, radium, radon…).</p>
						<h3>Druhy záření</h3>
						<ul>
							<li><strong>Záření α (alfa)</strong> — proud jader helia (2 protony + 2 neutrony), kladné; protonové číslo se sníží o 2. <strong>Zastaví ho list papíru</strong> (dolet ve vzduchu jen ~5 cm).</li>
							<li><strong>Záření β (beta)</strong> — proud rychlých elektronů z jádra (neutron se změní na proton a elektron); protonové číslo se zvětší o 1. Zastaví ho <strong>hliníkový plech</strong>.</li>
							<li><strong>Záření γ (gama)</strong> — elektromagnetické záření s velmi vysokou energií, <strong>nejpronikavější a nejnebezpečnější</strong>; zastaví ho jen silná vrstva <strong>olova nebo betonu</strong>.</li>
						</ul>
						<h3>Poločas rozpadu</h3>
						<p><strong>Poločas rozpadu T</strong> je doba, za kterou se rozpadne <strong>přesně polovina</strong> jader. Různé radionuklidy ho mají různý — uran 238 přes 4,5 miliardy let, radon 222 jen 3,5 dne. Po každém poločasu klesne množství na polovinu.</p>
						<h3>Využití a ochrana</h3>
						<ul>
							<li><strong>Využití:</strong> určování stáří (uhlík ¹⁴C), léčba nádorů ozařováním, detektory kouře, defektoskopie, zdroj energie pro vesmírné sondy.</li>
							<li><strong>Ochrana:</strong> <strong>stínění</strong> (olovo, beton), <strong>bezpečná vzdálenost</strong> a <strong>zkrácení doby</strong> vystavení. Dávku záření měříme v <strong>sievertech (Sv)</strong> dozimetrem.</li>
						</ul>
						<h3>🏠 Radon v domě</h3>
						<p><strong>Radon</strong> je přírodní radioaktivní plyn, který stoupá z podloží a může pronikat prasklinami do domů. Není vidět ani cítit — pozná se <strong>jen měřením</strong>. V Česku je radonu v podloží hodně (žula), proto se s ním počítá při každé stavbě.</p>
						<ul>
							<li><strong>Nechat změřit</strong> — měřicí detektory zjistí, kolik radonu doma je (hádání nestačí)</li>
							<li><strong>Často větrat</strong> — čerstvý vzduch množství radonu v místnosti snižuje</li>
							<li><strong>Utěsnit a opravit dům</strong> — uzavřít praskliny v podlaze a odvést radon mimo dům</li>
						</ul>
					`,
					materialy: [
						{ druh: 'youtube', nazev: 'Video: Radioaktivita — neviditelná síla', cesta: '8QArttMYsHA' },
					],
				},
				{
					slug: 'jaderna-energie-a-reakce',
					nazev: 'Jaderná energie, jaderná reakce',
					obsah: `
						<h2>Jaderná energie a jaderná reakce</h2>
						<p><strong>Jaderná energie</strong> je energie „uložená" v jádře atomu. Uvolní se při vhodné jaderné reakci jako pohybová energie unikajících částic a projevuje se hlavně jako <strong>teplo</strong>. (Nesprávně se jí říká „atomová".)</p>
						<h3>Jaderná reakce</h3>
						<ul>
							<li>Je to <strong>vyvolaná přeměna jádra</strong> stabilního prvku — spustí ji srážka s jinou částicí (neutron, proton, α, β). Vždy vzniká <strong>nové jádro jiného prvku</strong>.</li>
							<li>První jadernou reakci pozoroval <strong>E. Rutherford</strong> (dusík ostřelovaný částicemi α → kyslík).</li>
							<li><strong>Reakce × radioaktivita:</strong> reakce je vyvolaná přeměna stabilních jader, radioaktivita je <strong>samovolná</strong> přeměna nestabilních jader.</li>
							<li>Při jaderných reakcích platí <strong>zákon zachování nukleonového i protonového čísla</strong> (součty na obou stranách rovnice jsou stejné).</li>
						</ul>
						<h3>Slučování a štěpení jader</h3>
						<ul>
							<li><strong>Slučování (fúze)</strong> — lehčí jádra se spojí na těžší, uvolní se obrovská energie; potřebuje <strong>miliony °C</strong> (termonukleární reakce). Probíhá ve <strong>hvězdách</strong> (v jádru Slunce ~15 mil. °C, vodík → helium). Využití: <strong>tokamak</strong>, vodíková bomba.</li>
							<li><strong>Štěpení</strong> — těžké jádro (uran 235) po zásahu neutronem se rozpadne na dvě lehčí jádra a uvolní další neutrony i obrovskou energii.</li>
						</ul>
						<h3>Řetězová reakce</h3>
						<ul>
							<li>Uvolněné neutrony štěpí další jádra — vzniká <strong>řetězová reakce</strong> (za podmínky <strong>kritického množství</strong>).</li>
							<li><strong>Neřízená</strong> — všechny neutrony reagují, energie se uvolní naráz → <strong>atomová bomba</strong>.</li>
							<li><strong>Řízená</strong> — část neutronů se pohltí → stálý výkon → <strong>jaderný reaktor</strong>.</li>
						</ul>
					`,
				},
				{
					slug: 'jaderny-reaktor-elektrarna',
					nazev: 'Jaderný reaktor, jaderná elektrárna',
					interakce: 'reaktor',
					obsah: `
						<h2>Jaderný reaktor a jaderná elektrárna</h2>
						<p><strong>Jaderný reaktor</strong> je zařízení, ve kterém probíhá <strong>řízená řetězová reakce</strong>. Nejrozšířenější je <strong>vodní tlakový reaktor</strong>.</p>
						<h3>Části reaktoru</h3>
						<ul>
							<li><strong>Aktivní zóna</strong> — v ocelové tlakové nádobě, ukrytá v ochranném obalu (<strong>kontejnment</strong> z oceli a betonu) proti úniku záření.</li>
							<li><strong>Palivo</strong> — obohacený <strong>uran 235</strong> (oxid uraničitý) v tyčích. V 1 kg uranu je energie jako v celém vagonu uhlí.</li>
							<li><strong>Moderátor</strong> — zpomaluje neutrony na rychlost vhodnou pro štěpení (voda, těžká voda, grafit).</li>
							<li><strong>Chladivo</strong> — odvádí teplo (voda ~300 °C při vysokém tlaku ~16 MPa, aby zůstala kapalná).</li>
							<li><strong>Regulační tyče</strong> — pohlcují neutrony (bórová ocel) a řídí výkon; <strong>havarijní tyče</strong> (kadmium) reakci rychle zastaví.</li>
						</ul>
						<p>Výkon řídíme zasouváním a vysouváním tyčí: zasunutí hlouběji reakci tlumí, vysunutí zvyšuje.</p>
						<h3>Jaderná elektrárna</h3>
						<ul>
							<li>Funguje podobně jako tepelná, jen teplo pochází z <strong>řízeného štěpení</strong>. Teplo vyrábí páru → pára roztáčí <strong>turbínu s generátorem</strong> → vzniká elektřina.</li>
							<li>Má <strong>tři oddělené vodní okruhy</strong>: primární (radioaktivní, u reaktoru), sekundární (pára pro turbínu), terciární (chlazení).</li>
							<li>V ČR vyrábějí elektřinu jaderné elektrárny <strong>Temelín</strong> a <strong>Dukovany</strong>.</li>
							<li>Reaktory pohánějí i ponorky, ledoborce a kosmické sondy a vyrábějí radiofarmaka pro lékařství.</li>
						</ul>
					`,
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
					obsah: `
						<h2>Obnovitelné a neobnovitelné zdroje energie</h2>
						<p>Přírodní zdroje energie, ze kterých vyrábíme elektřinu nebo poháníme stroje, dělíme do dvou skupin.</p>
						<h3>Obnovitelné zdroje</h3>
						<ul>
							<li>doplňují se <strong>tak rychle, jak je stačíme využívat</strong> — zítra jich bude zas tolik co dnes,</li>
							<li>patří sem <strong>sluneční záření, vítr, tekoucí voda, geotermální teplo, biomasa a bioplyn</strong>.</li>
						</ul>
						<p>👉 „Obnovitelný" ale neznamená „nevyčerpatelný": les vykácený rychleji, než stačí dorůst,
						nebo přetížený geotermální vrt dojdou stejně jako uhlí. Rozhoduje <strong>rychlost, jakou se
						zdroj obnovuje</strong>, ne jeho množství.</p>
						<p>⚠️ <strong>Vodík mezi zdroje nepatří</strong>, ačkoli se to často říká. Na Zemi se volný
						skoro nevyskytuje — musí se vyrobit, a to spotřebuje víc energie, než z něj potom získáme.
						Vodík je proto <strong>nosič energie</strong>, něco jako baterie: umí ji přenést a uchovat,
						ale sám ji nedodá.</p>
						<h3>Neobnovitelné zdroje</h3>
						<ul>
							<li>jsou jen v <strong>omezeném množství</strong> a za určitou dobu se vyčerpají,</li>
							<li><strong>fosilní paliva</strong> — uhlí, ropa, zemní plyn (vznikla ze zbytků odumřelých organismů v zemské kůře bez přístupu vzduchu),</li>
							<li>ropné břidlice a písky, <strong>jaderné palivo</strong>.</li>
						</ul>
						<h3>Druhy elektráren</h3>
						<p>Podle využitého zdroje stavíme elektrárny <strong>jaderné</strong> (uran 235), <strong>tepelné</strong> (spalují fosilní paliva), <strong>sluneční</strong> (fotovoltaické), <strong>větrné</strong>, <strong>vodní</strong> a <strong>geotermální</strong>.</p>
						<h3>☀️ Skoro všechno je vlastně sluneční energie</h3>
						<p>Když se u každého zdroje zeptáš „a odkud se ta energie vzala?", dojdeš skoro pokaždé
						ke stejné odpovědi — ke <strong>Slunci</strong>:</p>
						<ul>
							<li><strong>vítr</strong> vzniká tím, že Slunce ohřívá vzduch nerovnoměrně</li>
							<li><strong>vodní</strong> elektrárna žije z koloběhu vody, a ten pohání sluneční teplo,
							které vodu vypařuje</li>
							<li><strong>biomasa</strong> je energie zachycená fotosyntézou</li>
							<li><strong>uhlí a ropa</strong> jsou totéž — jen sluneční energie, kterou rostliny
							zachytily před stovkami milionů let a která od té doby ležela pod zemí</li>
						</ul>
						<p>Ze Slunce nepocházejí jen tři: <strong>jaderná</strong> energie (z jader atomů),
						<strong>geotermální</strong> (teplo zemského nitra — z velké části také z rozpadu
						radioaktivních prvků) a <strong>přílivová</strong>, která si bere energii
						<strong>z otáčení Země</strong>; Měsíc svou gravitací jen „drží" příliv na místě,
						zatímco planeta se pod ním otáčí. Země se tím opravdu, i když nepatrně, zpomaluje.</p>
						<p>👉 Rozdíl mezi obnovitelným a neobnovitelným zdrojem tedy není v tom, <em>odkud</em>
						energie je — ale <strong>jak rychle se doplňuje</strong>: uhlí vznikalo desítky milionů let,
						vítr fouká zítra znovu.</p>
						<h3>Slabina obnovitelných: nedají se poručit</h3>
						<p>Sluneční panel nevyrábí v noci a větrník za bezvětří — a naopak: v poledne dodá elektrárna
						víc, než je zrovna potřeba. Elektřina se přitom <strong>ve velkém špatně skladuje</strong>
						a sítí musí každou vteřinu protékat přesně tolik, kolik se právě spotřebuje.</p>
						<h3>Přečerpávací elektrárna (Dlouhé stráně)</h3>
						<p>Právě to je odpověď na potíž popsanou výš — je to obrovská <strong>baterie z vody</strong>.
						Ukládá energii: když je v síti přebytek elektřiny (v noci), <strong>přečerpá vodu z dolní nádrže do horní</strong>; v době špičky přes den vodu <strong>vypustí zpět dolů</strong> a roztočí turbínu s generátorem.</p>
						<p>Přečerpáním se část energie ztratí, takže dolů se jí vrátí míň, než kolik stálo čerpání
						nahoru. Přesto se to vyplatí — <strong>elektřina, která by se jinak vůbec nevyužila,
						takhle počká</strong> na chvíli, kdy je jí potřeba.</p>
					`,
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
							<li><strong>Kamenné planety</strong> (Merkur, Venuše, Země, Mars) — mají <strong>pevný povrch</strong> a málo nebo žádné měsíce. <strong>Země</strong> je jediná planeta s podmínkami pro život; <strong>Mars</strong> je „rudá planeta".</li>
							<li><strong>Plynné planety</strong> (Jupiter, Saturn, Uran, Neptun) — „plynní obři" bez pevného povrchu, složené hlavně z vodíku a helia, s mnoha měsíci. <strong>Jupiter</strong> je největší, <strong>Saturn</strong> má výrazné prstence.</li>
						</ul>
						<h3>Další tělesa</h3>
						<ul>
							<li><strong>Trpasličí planety</strong> — např. Pluto a Ceres.</li>
							<li><strong>Planetky (asteroidy)</strong> — drobná tělesa, většina v pásu mezi Marsem a Jupiterem.</li>
							<li><strong>Komety</strong> — obíhají po protáhlých elipsách, mají jádro z ledu a prachu a při přiblížení ke Slunci jim vzniká <strong>ohon</strong> (Halleyova kometa se vrací každých 76 let).</li>
							<li><strong>Meteor</strong> („padající hvězda") vzniká, když těleso shoří v atmosféře; co dopadne na zem, je <strong>meteorit</strong>.</li>
						</ul>
						<h3>Vzdálenosti a pohyb</h3>
						<ul>
							<li><strong>Astronomická jednotka (AU)</strong> = střední vzdálenost Země–Slunce, asi <strong>150 milionů km</strong>.</li>
							<li><strong>Světelný rok (ly)</strong> = vzdálenost, kterou urazí světlo za rok (9,46 bilionu km).</li>
							<li>Pohyb planet popisují <strong>Keplerovy zákony</strong>: planety obíhají po elipsách a čím blíž jsou Slunci, tím rychleji se pohybují.</li>
						</ul>
					`,
					odkazy: [
						{ nazev: 'Video: Planety vnitřní (kamenné) — fyzika 9 ZŠ (Petr Němec)', url: 'https://www.youtube.com/watch?v=9K0boEQVY-s' },
						{ nazev: 'Video: Planety vnější (plynní obři) — fyzika 9 ZŠ (Petr Němec)', url: 'https://www.youtube.com/watch?v=FVnJjclojns' },
					],
				},
				{
					slug: 'vesmir-a-galaxie',
					nazev: 'Vesmír a jeho vznik, galaxie',
					obsah: `
						<h2>Vesmír a jeho vznik</h2>
						<p>Vesmír vznikl před přibližně <strong>13,8 miliardami let</strong> z extrémně hustého a horkého stavu. Této události říkáme <strong>velký třesk</strong>.</p>
						<h3>Jak šel vývoj vesmíru za sebou</h3>
						<ol>
							<li><strong>Velký třesk</strong> — vesmír vznikl z velmi malého, hustého a horkého bodu</li>
							<li><strong>Rychlé rozpínání</strong> — vesmír se okamžitě začal zvětšovat (a rozpíná se dodnes)</li>
							<li><strong>Vznik částic</strong> — po krátké chvíli se vytvořily protony a neutrony</li>
							<li><strong>Tvorba lehkých prvků</strong> — z částic vznikala jádra nejlehčích prvků, hlavně vodíku a helia</li>
							<li><strong>Horké plazma</strong> — vesmír byl dlouho plný směsi nabitých částic a světla</li>
							<li><strong>Vznik atomů</strong> — asi po 380 000 letech se elektrony spojily s jádry do neutrálních atomů a vesmír se stal průhledným</li>
						</ol>
						<h3>Galaxie</h3>
						<ul>
							<li><strong>Galaxie</strong> je obrovské seskupení hvězd, plynu a prachu, které drží pohromadě <strong>gravitace</strong>.</li>
							<li>Ve středu mnoha galaxií se nachází obří <strong>černá díra</strong>.</li>
							<li>Podle tvaru rozlišujeme galaxie <strong>spirální, eliptické, čočkovité a nepravidelné</strong>.</li>
						</ul>
						<h3>Naše galaxie — Mléčná dráha</h3>
						<ul>
							<li>je to <strong>spirální galaxie s příčkou</strong></li>
							<li>průměr má zhruba <strong>100 000 světelných let</strong></li>
							<li>obsahuje řádově <strong>stovky miliard hvězd</strong> (uvádí se kolem 300 miliard)</li>
							<li><strong>Slunce</strong> leží v jednom ze spirálních ramen — je to jedna obyčejná hvězda z mnoha</li>
						</ul>
						<h3>Vesmír se rozpíná</h3>
						<p>Vzdálené galaxie se od nás vzdalují — jejich světlo je posunuté k červené barvě (<strong>rudý posuv</strong>). Čím je galaxie dál, tím rychleji se vzdaluje (<strong>Hubbleův zákon</strong>). Právě to je hlavní důkaz, že se vesmír stále <strong>rozpíná</strong>.</p>
					`,
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

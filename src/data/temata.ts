export type Material = {
	druh: 'infografika' | 'pdf' | 'video' | 'audio' | 'youtube';
	nazev: string;
	/** U druhu 'youtube' je zde ID videa (např. 'oP6IJtosIp0'), jinak cesta k souboru. */
	cesta: string;
};
export type Podtema = {
	slug: string;
	nazev: string;
	obsah?: string;
	materialy?: Material[];
	/** Interaktivní prvek na stránce (komponenta se vybírá podle názvu) */
	interakce?: 'hydraulika';
};
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
						Cyklista urazí v závodu etapu dlouhou 231 km za 5 hodin a 30 minut. Jakou jel rychlostí?</p>
						<p>5 h 30 min = 5,5 h<br>v = s : t = 231 : 5,5 = <strong>42 km/h</strong></p>

						<p><strong>Příklad 8: Turistický výlet</strong><br>
						Turisté ušli v rovinatém terénu vzdálenost 3 km za 36 minut. Vypočítej jejich rychlost.</p>
						<p>36 min = 0,6 h<br>v = s : t = 3 : 0,6 = <strong>5 km/h</strong></p>

						<p><strong>Příklad 9: Dopravní letadlo</strong><br>
						Dopravní letadlo uletělo vzdálenost 585 km za 1 hodinu 18 minut. Vypočti jeho průměrnou rychlost.</p>
						<p>18 min = 0,3 h, takže celkový čas je 1 h + 0,3 h = 1,3 h<br>v = s : t = 585 : 1,3 = <strong>450 km/h</strong></p>
						<p>⚠️ <strong>Pozor na častou chybu:</strong> kdo u příkladu 9 vydělí dráhu jen 0,3 h (zapomene na celou hodinu), vyjde mu nesmyslných 1950 km/h — tak rychle dopravní letadla nelétají! Minuty vždy převeď (děleno 60) a přičti k celým hodinám.</p>
						<h3>Pravidla pro kreslení grafů</h3>
						<ol>
							<li>dvě kolmé osy se šipkami; <strong>časová osa je vždy vodorovná</strong></li>
							<li>popiš osy značkami veličin a jednotkami</li>
							<li>na osy rovnoměrné stupnice podle naměřených hodnot</li>
							<li>vynes body z tabulky a spoj je</li>
						</ol>
						<p>Graf rychlosti rovnoměrného pohybu je <strong>vodorovná přímka</strong>; graf dráhy je <strong>přímka stoupající vzhůru</strong>.</p>
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
						<p>Vypočti třecí sílu, která vzniká při tlačení ocelového tělesa o hmotnosti 50 kg po dřevěné vodorovné podložce (těleso je už v pohybu, f = 0,35).</p>
						<p>Výpočet Fg:<br>
						Fg = m · g = 50 · 10 = 500 N</p>
						<p>Na vodorovné podložce platí Fg = Fn, tedy Fn = 500 N.</p>
						<p>Třecí síla:<br>
						Ft = Fn · f = 500 · 0,35 = <strong>175 N</strong></p>

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
						{ druh: 'infografika', nazev: 'Tahák: tření a třecí síly', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/treci-sila/infografika-prehled.jpg' },
					],
				},
				{
					slug: 'skladani-sil',
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
						{ druh: 'audio', nazev: 'Poslech: jak složit síly do jedné výslednice 🎧', cesta: '/materialy/fyzika/7-rocnik/sily-kolem-nas/skladani-sil/audio-pravidlo-rovnobezniku.mp3' },
					],
				},
				{
					slug: 'teziste',
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
				},
				{
					slug: 'jednoduche-stroje-paky',
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
						<p>Na páce jsou zavěšena dvě závaží: m<sub>1</sub> = 100 g = 0,1 kg na rameni a<sub>1</sub> = 9 cm a m<sub>2</sub> = 50 g = 0,05 kg na rameni a<sub>2</sub> = 18 cm. Je páka v rovnováze?</p>
						<p>F<sub>g1</sub> = m<sub>1</sub> &middot; g = 0,1 &middot; 10 = 1 N</p>
						<p>F<sub>g2</sub> = m<sub>2</sub> &middot; g = 0,05 &middot; 10 = 0,5 N</p>
						<p>F<sub>g1</sub> &middot; a<sub>1</sub> = 1 &middot; 9 = 9</p>
						<p>F<sub>g2</sub> &middot; a<sub>2</sub> = 0,5 &middot; 18 = 9</p>
						<p>Obě strany se rovnají (9 = 9), páka je v rovnováze.</p>

						<h3>Příklad 2</h3>
						<p>Na rameni a<sub>1</sub> = 2 m působí síla F<sub>1</sub> = 20 N. Jak velká síla F<sub>2</sub> je potřeba na rameni a<sub>2</sub> = 4 m, aby byla páka v rovnováze?</p>
						<p>F<sub>1</sub> &middot; a<sub>1</sub> = F<sub>2</sub> &middot; a<sub>2</sub></p>
						<p>F<sub>2</sub> = (F<sub>1</sub> &middot; a<sub>1</sub>) : a<sub>2</sub> = (20 &middot; 2) : 4 = 10 N</p>
						<p>Na delší rameno tedy stačí poloviční síla.</p>
					`,
					materialy: [
						{ druh: 'infografika', nazev: 'Tahák: moment síly', cesta: '/materialy/fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky/infografika-moment-sily.jpg' },
					],
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
						<p>Těleso „vážilo" na závěsné váze na vzduchu 0,5 kg, ve vodě jen 0,425 kg. Rozdíl m = 0,075 kg → vztlaková síla Fvz = 0,075 · 10 = <strong>0,75 N</strong>. Dalšími metodami vyšlo 0,81 N, 0,76 N, 0,88 N a 0,86 N — průměr <strong>0,812 N</strong>. Měření není nikdy úplně přesné (bublinky, vlnky, zaokrouhlování).</p>
						<h3>Potápění, vznášení, plování</h3>
						<p>Porovnáváme vztlakovou sílu s tíhovou silou tělesa (nebo hustotu tělesa s hustotou kapaliny):</p>
						<ul>
							<li><strong>potápí se</strong> — Fg &gt; Fvz (hustota tělesa větší než kapaliny; kámen)</li>
							<li><strong>vznáší se</strong> — Fg = Fvz (stejné hustoty; ryba v akváriu)</li>
							<li><strong>plove</strong> — Fg &lt; Fvz (menší hustota; korek, led, loď)</li>
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
					obsah: `
						<h2>Přetlak, podtlak, vakuum</h2>
						<p>Je-li v uzavřené nádobě jiný tlak než v okolí, vzniká přetlak, podtlak, nebo dokonce vakuum.</p>
						<h3>Přetlak — uvnitř VÍC než venku</h3>
						<ul>
							<li>nafouknutý míč, pneumatika, sprej, tlakové lahve potápěčů, kabina letadla, plíce po nádechu</li>
							<li>vytváří ho <strong>hustilka nebo kompresor</strong>, měří ho <strong>manometr</strong> (trubička se při tlaku narovnává jako papírová frkačka)</li>
							<li>manometry mívají stupnici v barech: <strong>1 bar = 100 000 Pa</strong> ≈ tlak jedné atmosféry; pneumatika se hustí asi na 2,5 baru přetlaku</li>
						</ul>
						<h3>Podtlak — uvnitř MÍŇ než venku</h3>
						<ul>
							<li>vzniká odsátím vzduchu nebo zvětšením prostoru; okolí se <strong>nasává dovnitř</strong> (tlak se chce vyrovnat)</li>
							<li>pití brčkem, vysavač, přísavky, gumový zvon na odpad, pumpa u studny, plíce před nádechem</li>
						</ul>
						<h3>Vakuum — téměř NIC</h3>
						<ul>
							<li>téměř všechen vzduch odčerpán <strong>vývěvou</strong>, tlak skoro nulový</li>
							<li>baňka žárovky, vakuově balené potraviny, vesmírný prostor</li>
						</ul>
					`,
					materialy: [
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
							<li><strong>tlaková výše</strong> — tlak vyšší než normál → obvykle jasné, slunečné počasí</li>
							<li><strong>tlaková níže</strong> — tlak nižší než normál → oblačnost a srážky; při hlubokém poklesu pod 1 000 hPa hrozí bouřky a vichřice</li>
						</ul>
						<p>👉 Rozdíly tlaku uvádí vzduch do pohybu: <strong>vítr</strong> proudí z místa s vyšším tlakem do místa s nižším tlakem.</p>
						<h3>Čím se tlak měří</h3>
						<ul>
							<li><strong>rtuťový barometr</strong> — sloupec rtuti jako u Torricelliho</li>
							<li><strong>aneroid</strong> — kovový tlakoměr s pružnou krabičkou</li>
							<li><strong>barograf</strong> — barometr se zapisovačem, kreslí průběh tlaku v čase</li>
						</ul>
						<p>Přibližně platí, že v blízkosti hladiny moře klesne tlak o <strong>1 hPa na každých 8 metrů výšky</strong>.</p>
						<h3>Meteorologická pozorování</h3>
						<p>Meteorologové sledují kromě tlaku i teplotu, vlhkost, srážky, vítr a oblačnost — z pozemních stanic, balonů i družic. Předpověď počasí pomáhá dopravě, zemědělství, energetice i záchranářům.</p>
					`,
					materialy: [
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
						{ druh: 'video', nazev: 'Píseň: Světelný proud 🎵', cesta: '/materialy/fyzika/7-rocnik/svetlo-a-jeho-sireni/svetlo-jeho-zdroje/pisen-svetelny-proud.mp4' },
					],
				},
				{
					slug: 'odraz-svetla',
					nazev: 'Odraz světla, zákon odrazu',
					obsah: `
						<h2>Odraz světla, zákon odrazu</h2>
						<p>Dopadne-li paprsek na rozhraní dvou prostředí, může nastat <strong>odraz</strong>, <strong>lom</strong>, nebo <strong>pohlcení</strong> světla.</p>
						<h3>Odraz na různých površích</h3>
						<ul>
							<li><strong>nerovná plocha</strong> → rozptyl světla (díky němu vidíme i do stínu)</li>
							<li><strong>rovná lesklá plocha</strong> → svazek zůstane rovnoběžný (zrcadlo, klidná hladina)</li>
						</ul>
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
					obsah: `
						<h2>Lom světla</h2>
						<p>Při přechodu do jiného optického prostředí světlo <strong>mění rychlost</strong> — a proto se <strong>láme</strong> (mění směr).</p>
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
				},
			],
		},
		{
			slug: 'zrcadla-a-cocky',
			nazev: 'Zrcadla a čočky',
			podtemata: [
				{
					slug: 'optika-rovinneho-zrcadla',
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
				},
				{
					slug: 'kulova-zrcadla-dute-zrcadlo',
					nazev: 'Kulová zrcadla a duté zrcadlo',
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
				},
				{
					slug: 'opticka-cocka',
					nazev: 'Optická čočka (spojky a rozptylky)',
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
						{ druh: 'video', nazev: 'Píseň: Optická jízda 🎵', cesta: '/materialy/fyzika/7-rocnik/zrcadla-a-cocky/opticka-cocka/pisen-opticka-jizda.mp4' },
					],
				},
				{
					slug: 'oko-vady-oka',
					nazev: 'Oko a vady oka',
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
	],
	'fyzika/8-rocnik': [
		{
			slug: 'mechanicka-prace-a-vykon',
			nazev: 'Mechanická práce a výkon',
			podtemata: [
				{
					slug: 'mechanicka-prace',
					nazev: 'Mechanická práce',
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
						<p><strong>Příklad:</strong> Jakou silou táhne lokomotiva vlak, když na trati dlouhé 4,5 km vykoná práci 900 MJ?<br>
						s = 4 500 m, W = 900 000 000 J → F = W : s = 900 000 000 : 4 500 = <strong>200 000 N = 200 kN</strong></p>
					`,
				},
				{
					slug: 'vykon',
					nazev: 'Výkon',
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
				},
				{
					slug: 'energeticka-hodnota-potravin',
					nazev: 'Energetická hodnota potravin',
					obsah: `
						<h2>Energetická hodnota potravin</h2>
						<p>Všechny živé organismy potřebují k životu <strong>energii</strong>. Člověk ji získává hlavně z <strong>potravy</strong> (rostliny a živočichové). Tělo spaluje <strong>cukry a tuky</strong> spolu s kyslíkem a využívá tak chemickou energii — pro práci svalů (pohyb) i činnost mozku.</p>
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
					nazev: 'Tuhnutí',
					obsah: `
						<h2>Tuhnutí</h2>
						<p>Když kapalinu ochlazujeme, teplota klesá. Při <strong>teplotě tuhnutí</strong> se odebíráním tepla mění z <strong>kapalného skupenství na pevné</strong>. U vody se tomu říká <strong>mrznutí</strong>. Tuhnutí je <strong>opačný děj k tání</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>částice zpomalují a vytvářejí pevné vazby; tuhnutí začíná od <strong>pevného jádra</strong> (led od břehu, kroupy na smítku prachu)</li>
							<li><strong>během tuhnutí se teplota nemění</strong>, dokud vše neztuhne; přitom se <strong>uvolňuje skupenské teplo</strong> do okolí</li>
							<li>u krystalických látek je teplota tuhnutí <strong>stejná jako teplota tání</strong> (voda a led — 0 °C)</li>
						</ul>
						<h3>Změna objemu — voda je výjimka</h3>
						<p>Většina látek při tuhnutí <strong>zmenšuje objem</strong>. <strong>Voda naopak objem zvětšuje</strong> — proto má led <strong>menší hustotu</strong> než voda a plave.</p>
						<ul>
							<li>+ v přírodě: led plave, ryby přežijí pod ním</li>
							<li>− v technice: praská vodovodní potrubí, beton i asfalt; proto se potrubí vede pod <strong>nezámrznou hloubkou</strong> (asi 90–140 cm) a na zimu se z trubek vypouští voda</li>
						</ul>
					`,
				},
				{
					slug: 'vyparovani',
					nazev: 'Vypařování',
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
					nazev: 'Kondenzace (kapalnění)',
					obsah: `
						<h2>Kondenzace (kapalnění)</h2>
						<p>Když plyn (páru) ochlazujeme, teplota klesá a pára se mění z <strong>plynného skupenství na kapalné</strong>. Tomu říkáme <strong>kapalnění (kondenzace)</strong> — je to <strong>opačný děj k vypařování</strong>.</p>
						<h3>Průběh</h3>
						<ul>
							<li>ochlazené částice páry zpomalí, přitažlivé síly je zadrží u sebe → <strong>shlukují se do kapiček</strong></li>
							<li>kondenzace začíná od <strong>pevného jádra</strong> (smítko prachu → dešťová kapka; studený povrch → rosa, orosená plechovka)</li>
						</ul>
						<h3>Rosný bod</h3>
						<p><strong>Rosný bod</strong> je stav, kdy je vzduch <strong>nasycený</strong> vodní parou a ta začne kondenzovat. Čím teplejší vzduch, tím víc páry unese. Vznikají tak <strong>rosa, mlha i mraky</strong>.</p>
						<p>Kondenzaci vidíme i u orosených brýlí (z chladna do tepla) nebo jako obláček páry z úst v zimě. Plyny lze zkapalnit i <strong>silným ochlazením</strong> (kapalný dusík) nebo <strong>stlačením</strong> (tlakové lahve).</p>
					`,
				},
				{
					slug: 'skupenske-zmeny-vody-v-prirode',
					nazev: 'Skupenské změny vody v přírodě',
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
							<li>kapky se spojují, těžknou a padají jako <strong>déšť</strong>; ve výšce zmrznou na <strong>kroupy</strong></li>
							<li>vysoko a v zimě vzniká z páry desublimací <strong>led a sněhové vločky</strong> (bílá oblaka typu cirrus)</li>
						</ul>
						<p>Voda ze srážek se znovu vypaří — a <strong>koloběh</strong> se opakuje. Srážky měří <strong>srážkoměr</strong> (v mm = výška vodního sloupce). V průmyslových oblastech mohou vznikat <strong>kyselé deště</strong>, které škodí přírodě.</p>
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
							<p><strong>Galvanický článek</strong> vyrábí napětí <strong>chemickou reakcí</strong>. Do vodivého roztoku (<strong>elektrolytu</strong> — sůl nebo kyselina) se ponoří <strong>dvě elektrody z různých kovů</strong>. Reakce způsobí, že se na jedné elektrodě hromadí elektrony (nabíjí se <strong>záporně</strong>), na druhé jich ubývá (nabíjí se <strong>kladně</strong>) — vzniká napětí.</p>
							<ul>
								<li>záporná elektroda: např. zinek, lithium, kadmium</li>
								<li>kladná elektroda: např. uhlík (grafit) nebo měď</li>
							</ul>
							<h3>Nejznámější články</h3>
							<ul>
								<li><strong>Suchý článek</strong> — zinková nádoba (−) a uhlíková tyčinka (+), elektrolyt = salmiaková pasta. Napětí <strong>1,5 V</strong>, na jedno použití (hračky). Vybitý může vytéct.</li>
								<li><strong>Plochá baterie</strong> — tři suché články za sebou → <strong>4,5 V</strong></li>
								<li><strong>Alkalické články</strong> — větší kapacita a životnost (blesk fotoaparátu)</li>
								<li><strong>Lithiové články</strong> — kvalitní i po dlouhém skladování (mobil, notebook)</li>
								<li><strong>Olověný akumulátor</strong> — velká kapacita, <strong>dobíjecí</strong>, napětí <strong>12 V</strong> (autobaterie)</li>
							</ul>
							<p><strong>Baterie</strong> = jednorázová (nedobíjecí), <strong>akumulátor</strong> = dobíjecí (opakovaně použitelný).</p>
						`,
					},
				{
						slug: 'elektricke-obvody',
						nazev: 'Elektrické obvody',
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
								<li><strong>velký odpor</strong> = špatný vodič, silně se zahřívá (konstantan = slitina mědi a niklu → topné spirály, rezistory)</li>
								<li><strong>izolanty</strong> (keramika, plast) mají odpor obrovský; žádný kov není izolant</li>
							</ul>
							<h3>Tepelné účinky proudu</h3>
							<p>Zahřívání vodiče proudem <strong>využíváme</strong> (žárovka — wolframové vlákno 2200–3000 °C, vařič, konvice, žehlička, pojistka), ale má i <strong>nebezpečné důsledky</strong> — při přetížení nebo zkratu se dráty roztaví a hrozí <strong>požár</strong>.</p>
						`,
					},
				{
						slug: 'zavislost-odporu-na-vodici',
						nazev: 'Závislost odporu na vlastnostech vodiče (nad rámec RVP)',
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
							<h3>Rezistor</h3>
							<p><strong>Rezistor</strong> je součástka s přesnou hodnotou odporu — tenký odporový drát (konstantan) navinutý na keramickém válečku. Hodnotu udávají <strong>barevné proužky</strong>. Slouží k <strong>regulaci proudu</strong> v obvodu.</p>
						`,
					},
				{
						slug: 'ohmuv-zakon',
						nazev: 'Ohmův zákon',
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
							<p>Vodičem při napětí 10 V teče proud 0,2 A. Odpor: R = U / I = 10 / 0,2 = <strong>50 Ω</strong>. (Horší vodič se stejným napětím propustí jen 0,05 A → R = 10 / 0,05 = 200 Ω.)</p>
							<h3>Pozor na teplotu</h3>
							<p>Ohmův zákon platí přesně jen <strong>za stálé teploty</strong>. Odpor kovů s teplotou <strong>roste</strong> (rozžhavené vlákno žárovky), takže tam už proud není přímo úměrný napětí. Výjimkou je slitina <strong>konstantan</strong>, jejíž odpor se s teplotou skoro nemění — proto se z ní dělají rezistory.</p>
						`,
					},
				{
						slug: 'zapojeni-spotrebicu-za-sebou',
						nazev: 'Zapojení spotřebičů za sebou (sériově)',
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
								<li><strong>Výkon P</strong> = energie za sekundu, jednotka <strong>watt (W)</strong>. Vzorec <strong>P = U · I</strong>.</li>
								<li><strong>Práce: W = P · t = U · I · t</strong></li>
								<li><strong>Příkon P₀</strong> = kolik spotřebič odebírá ze sítě (na štítku). Je vždy <strong>větší</strong> než užitečný výkon — část energie uniká jako <strong>teplo (ztráty)</strong>.</li>
							</ul>
							<h3>Jednotky energie</h3>
							<p>1 Wh = 3 600 J; <strong>1 kWh = 3 600 000 J</strong>. Spotřeba elektřiny doma se počítá v kWh.</p>
							<h3>Účinnost</h3>
							<p>Udává, kolik % energie se přemění na užitečnou práci — vždy <strong>méně než 100 %</strong>. Klasická žárovka má jen ~5 % (zbytek je teplo), <strong>LED žárovka ~70 %</strong> — proto se dnes používají LED.</p>
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
								<li><strong>odpor člověka</strong>: v suchu a suché obuvi ~150 000 Ω, ve vlhku jen ~2000 Ω → <strong>mokrý člověk je mnohem víc ohrožen</strong></li>
								<li><strong>cesta proudu</strong>: nejnebezpečnější přes ruku do srdce nebo přes hlavu</li>
								<li>bezpečné napětí dle normy: stejnosměrné <strong>25 V</strong>, střídavé <strong>12 V</strong> (zásuvka 230 V je nebezpečná)</li>
							</ul>
							<h3>Bezpečná pravidla</h3>
							<ul>
								<li>nesahat na vypínač/kabely <strong>mokrou rukou</strong>, žádné spotřebiče ve vaně a sprše</li>
								<li>před výměnou žárovky <strong>vypnout jistič</strong>; do zásuvky nestrkat předměty</li>
								<li>nedotýkat se poškozených kabelů ani spadlých drátů vedení</li>
							</ul>
							<h3>První pomoc při úrazu proudem</h3>
							<ol>
								<li><strong>vypni proud</strong> (vypínač, jistič, pojistky)</li>
								<li>dbej na <strong>vlastní bezpečnost</strong> — zraněného odsuň <strong>suchou dřevěnou/plastovou tyčí</strong>, ne holou rukou</li>
								<li>zkontroluj dech a tep, případně <strong>masáž srdce a umělé dýchání</strong></li>
								<li>zavolej záchrannou službu <strong>155</strong></li>
							</ol>
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
				{ slug: 'elektrarny-a-jaderne-havarie', nazev: 'Elektrárny a jaderné havárie' },
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
				{ slug: 'bezpecnost-a-prvni-pomoc', nazev: 'Bezpečnost a první pomoc při úrazu proudem' },
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
				{ slug: 'kosmonautika', nazev: 'Kosmonautika' },
			],
		},
	],
};

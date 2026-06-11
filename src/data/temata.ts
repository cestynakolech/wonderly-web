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
				},
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

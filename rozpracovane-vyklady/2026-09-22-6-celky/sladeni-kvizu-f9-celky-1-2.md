# Sladění kvízů s výklady — F9, celky Magnetické pole + Indukce a střídavý proud
Nezávislá kontrola 22. 9. 2026. Zdroj výkladů: `node podtema.mjs get fyzika/9-rocnik/<celek>/<klic>`,
kvízy: `node testy/vypis-kviz.mjs fyzika/9-rocnik/<celek>/<klic>`.
Typy: (a) fakta/čísla jinak než ve výkladu · (b) látka mimo výklad · (c) nosná část výkladu bez otázky · (d) délková nápověda / únik / duplicita.
Všechny početní příklady přepočítány (`node -e`) — **výsledky sedí**: T(50 Hz)=0,02 s=20 ms · 2·50=100 průchodů nulou/s · 230·1,4=322 V, 230·√2=325,3 V · T(25 Hz)=0,04 s · f(0,01 s)=100 Hz · 140:1,4=100 V · 230·2=460 W · trafo 20·300:100=60 V, 200·40:400=20 V, 2·400:100=8 A.

---

## magnety-magneticke-pole-opakovani — VERDIKT: NESLADĚNO (7)
(24 otázek — nad závazných 21, v pořádku.)

1. **(c) | nosná část bez otázky | bod ZAPIS „na severním zeměpisném pólu Země je jižní magnetický pól" + celý odstavec „Magnetické pole Země" nemá žádnou otázku; pokrytá je jen nadstavba (Q23 polární záře, Q24 posun pólů).**
   NÁVRH (přidat jako Q25, na konec základní části): „Jaký magnetický pól Země leží u severního zeměpisného pólu?" → „jižní magnetický pól | severní magnetický pól | Země tam žádný pól nemá" — vysvětlení: „Severní pól magnetky míří k severu, a ten přitahuje pól opačný — jižní."
2. **(c) | nosná část bez otázky | bod ZAPIS „pole Země nás chrání před slunečním větrem" nemá otázku.**
   NÁVRH (přidat): „Před čím nás chrání magnetické pole Země?" → „před slunečním větrem | před deštěm a kroupami | před zvukem letadel" — vysvětlení: „Pole odkloní nabité částice ze Slunce, takže Zemi z velké části obletí."
3. **(d) | únik | otázka 3 „Kamarád tvrdí, že sehnal magnet…" — není vada; vada je Q1 „Které látky se silně přitahují k magnetu?": správná odpověď „feromagnetické (železo, kobalt, nikl)" doslova prozrazuje Q20 „Které dva kovy patří spolu se železem mezi silně feromagnetické látky? → kobalt a nikl".**
   NÁVRH (přeformulovat Q1 bez výčtu): „Jak se odborně říká látkám, které se k magnetu silně přitahují?" → „feromagnetické | nemagnetické | diamagnetické" — vysvětlení: „Feromagnetické látky jdou i samy zmagnetovat."
4. **(d) | únik | otázka 2 „Patří hliník mezi feromagnetické látky?" — vysvětlení „Hliník, měď, zinek či stříbro na magnet téměř nereagují" dává hotovou odpověď na Q15 i na distraktory Q20.**
   NÁVRH (zkrátit vysvětlení Q2): „Hliník je kov, ale magnet ho nepřitahuje — magnetické jsou jen některé kovy."
5. **(a) | nejednoznačná odpověď | otázka 15 „Která trojice látek patří mezi nemagnetické?" — distraktor „uhlík, měď, zlato" je podle téhož výkladu také nemagnetický (výklad uvádí měď jednou mezi nemagnetickými, podruhé mezi diamagnetickými), takže otázka má dvě obhajitelné odpovědi.**
   NÁVRH (vyměnit distraktor za jednoznačný): „Která trojice látek patří mezi nemagnetické?" → „papír, korek, zinek | železo, kobalt, nikl | ocel, železo, litina" — vysvětlení: „Nemagnetické látky na magnet téměř nereagují; železo, ocel a nikl naopak ano."
6. **(b) | mimo výklad | otázka 23 „Proč polární záře vzniká hlavně u magnetických pólů Země…" — správná odpověď tvrdí, že se indukční čáry u pólů sbíhají k povrchu; ve výkladu tahle věta ani myšlenka nikde není (výklad má jen „částice se srážejí se vzduchem").**
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Proč vzniká polární záře?" → „nabité částice ze Slunce se srážejí se vzduchem | sluneční světlo se odráží od ledovců | magnetické pole Země samo svítí" — vysvětlení: „Částice, které projdou k pólům, narazí do vzduchu a rozsvítí ho." (počet 24 zůstává)
7. **(b) | mimo výklad | otázka 22 „Proč nesmíme silný magnet přiložit k harddisku…" — odpověď stojí na tom, že data jsou uložená jako zmagnetované oblasti; výklad harddisk pouze jmenuje v seznamu využití.**
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Proč magnet působí i na předmět, kterého se nedotýká?" → „kolem magnetu je magnetické pole | magnet vysílá teplý vzduch | magnet vydává slabý zvuk" — vysvětlení: „Magnetické pole je v celém okolí magnetu, se vzdáleností jen slábne."

---

## magneticke-pole-vodice-a-civky — VERDIKT: NESLADĚNO (7)
(21 otázek.)

1. **(d) | únik | otázka 7 „Jak se chovají dva rovnoběžné vodiče se stejným…" — vysvětlení „Opačný směr proudu by je odpuzoval" je doslova odpověď Q21 („Jak se budou chovat dva rovnoběžné vodiče, pokud v nich proud teče opačným směrem? → budou se odpuzovat"); navíc jde o duplicitní pár.**
   NÁVRH: ŠKRTNOUT Q7 a NAHRADIT: „Co udělá magnetické pole s vodičem, kterým teče proud?" → „působí na něj silou | ochladí ho | změní jeho barvu" — vysvětlení: „Čím větší proud a silnější pole, tím větší síla." (Q21 zůstává, počet 21 se drží.)
2. **(d) | únik | otázka 5 „Jak určíme směr indukčních čar u vodiče?" — vysvětlení „Palec ukazuje směr proudu, prsty směr čar" je hotová odpověď Q15.**
   NÁVRH (zkrátit vysvětlení Q5): „Ruku si k vodiči přiložíme podle dohodnutého směru proudu."
3. **(d) | únik | otázka 15 „Jak držíme pravou ruku u přímého vodiče, abychom…" — vysvětlení „To je postup pro cívku, ne pro přímý vodič — u vodiče vede palec, ne prsty" dává odpověď Q16 (a vysvětlení Q16 zrcadlově odpověď Q15).**
   NÁVRH (vysvětlení Q15): „U přímého vodiče vede palec — ukazuje směr proudu." NÁVRH (vysvětlení Q16): „U cívky vedou prsty po proudu v závitech a palec ukáže pól."
4. **(d) | únik | otázka 9 „Co je cívka?" — vysvětlení „Používá se lakovaný měděný drát" prozrazuje Q19 („Z jakého drátu je navinutá cívka? → z izolovaného měděného drátu").**
   NÁVRH (vysvětlení Q9): „Mnoho závitů vedle sebe dá mnohem silnější pole než jeden drát."
5. **(d) | únik | otázka 2 „Kdo si jako první všiml souvislosti proudu a…" — vysvětlení „Magnetka se vychýlila, když vodičem prošel proud" je odpověď Q13 („Co roku 1820 zjistil Oersted? → vychýlení magnetky proudem").**
   NÁVRH (vysvětlení Q2): „Oersted byl dánský fyzik; Newton ani Pascal se magnetismem vodičů nezabývali."
6. **(c) | nosná část bez otázky | bod ZAPIS „víc závitů + železné jádro = silnější pole" je pokrytý jen z poloviny — na jádro je Q10, na počet závitů cívky otázka chybí.**
   NÁVRH (nahradit nadbytečnou Q7 z nálezu 1 nelze dvakrát — přidat místo duplicity): „Jak se změní pole cívky, když na ni navineme víc závitů?" → „zesílí | zeslábne | nezmění se" — vysvětlení: „Každý další závit přidá k poli cívky."
7. **(a) | jinak než ve výkladu | otázka 9 a 8 — výklad má „izolovaný měděný drát", vysvětlení Q9 říká „lakovaný"; vysvětlení Q8 mluví o „rotoru motoru", který ve výkladu tohoto podtématu není.**
   NÁVRH (vysvětlení Q8): „Síla mezi polem a vodičem s proudem roztáčí elektromotor."

---

## elektromagnet — VERDIKT: NESLADĚNO (7)
(21 otázek.)

1. **(b) | mimo výklad | otázka 15 „Co se stane se silou pole elektromagnetu, když z cívky…" — výklad uvádí jen DVĚ věci ovlivňující sílu (počet závitů a proud); že jádro zesiluje pole, v něm není.**
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Které dvě věci ovlivňují sílu elektromagnetu?" → „počet závitů a velikost proudu | barva drátu a délka jádra | teplota místnosti a čas" — vysvětlení: „Víc závitů i větší proud dají silnější pole."
2. **(d) | únik | otázka 1 „Co je elektromagnet?" — správná odpověď „cívka s jádrem z měkké oceli" je doslova odpověď Q12 („Z jaké oceli je jádro elektromagnetu?").**
   NÁVRH (Q1 bez prozrazení materiálu): „Co je elektromagnet?" → „cívka s ocelovým jádrem | permanentní magnet ze železa | obyčejný rovný drát" — vysvětlení: „Pole vzniká, až když cívkou teče proud."
3. **(d) | únik | otázka 8 „K čemu slouží jistič s elektromagnetem?" — vysvětlení „Na rozdíl od pojistky ho lze znovu zapnout" je hotová odpověď Q17.**
   NÁVRH (vysvětlení Q8): „Při přetížení silné pole přitáhne kotvu a obvod se rozpojí."
4. **(d) | únik | otázka 12 „Z jaké oceli je jádro elektromagnetu?" — vysvětlení „Měkká ocel se rychle zmagnetuje i odmagnetuje" je odpověď Q14.**
   NÁVRH (vysvětlení Q12): „Hliník není feromagnetický, na jádro se nehodí."
5. **(d) | únik | otázka 5 „Kterou výhodu má elektromagnet oproti permanentnímu…" — vysvětlení „Také u něj lze prohodit póly" prozrazuje Q6.**
   NÁVRH (vysvětlení Q5): „Permanentní magnet drží pořád, elektromagnet jen když teče proud."
6. **(d) | únik | otázka 7 „Kde se elektromagnet využívá při manipulaci s kovem?" — vysvětlení „Po vypnutí proudu náklad pustí" prozrazuje Q21.**
   NÁVRH (vysvětlení Q7): „Sklo ani dřevo magnet nepřitahuje, jeřáb na šrot zvedá železo."
7. **(a) | jinak než ve výkladu | otázka 10 „Jak funguje elektrický zvonek?" — vysvětlení „Kotva při pohybu obvod přerušuje a spíná stále dokola" ve výkladu není (výklad: „cívka přitáhne kovovou kotvu, ta udeří do zvonku").**
   NÁVRH (vysvětlení Q10): „Cívka přitáhne kovovou kotvu a ta udeří do zvonku."

---

## pusobeni-pole-na-vodic-elektromotor — VERDIKT: NESLADĚNO (6)
(21 otázek.)

1. **(d) | duplicity | otázky 13–21 z velké části opakují otázky 1–12: Q3≡Q14≡Q15 (kolmo/rovnoběžně), Q5≡Q16 (dvojice sil), Q6≡Q18 (přeměna energie), Q8≡Q19 (rotor), Q9≡Q20 (komutátor), Q10≡Q17 (reproduktor), Q11≡Q21 (vysavač) — sedm párů, blok zkouší jen ~12 faktů.**
   NÁVRH: ŠKRTNOUT Q15, Q16, Q17, Q18, Q21 a NAHRADIT pěti otázkami z nepokryté látky (viz nález 4) — Q14, Q19, Q20 lze ponechat jako aplikační nadstavbu na konci.
2. **(d) | únik | otázka 3 „Kdy je síla na vodič největší?" — vysvětlení „Na rovnoběžný vodič síla nepůsobí" je odpověď Q14; vysvětlení Q14 („Největší síla naopak vzniká u vodiče v pravém úhlu") je odpověď Q15.**
   NÁVRH (vysvětlení Q3): „Rozhoduje úhel mezi vodičem a indukčními čarami pole."
3. **(d) | únik | otázka 19 „Co je u elektromotoru rotor?" — vysvětlení jmenuje stator i komutátor a tím dává odpovědi Q7 a Q9/Q20; opačně vysvětlení Q8 „Je tvořen cívkami" prozrazuje Q19.**
   NÁVRH (vysvětlení Q19): „Rotor se otáčí uvnitř motoru a nese cívky."
4. **(c) | nosná část bez otázky | bod ZAPIS „motory: stejnosměrné (baterie) i střídavé (síť) — jednofázové, třífázové" + celý odstavec „Motory a jejich využití" nemají ani jednu otázku.**
   NÁVRH (jako náhrada za duplicity): a) „Jakým proudem napájíme elektromotory?" → „stejnosměrným i střídavým | pouze stejnosměrným | pouze střídavým" — vysvětlení: „Stejnosměrný dá baterie, střídavý zásuvka." b) „Jaké motory roztáčejí velké stroje v továrnách?" → „třífázové | jednofázové | stejnosměrné z baterie" — vysvětlení: „Jednofázové stačí na pračku nebo ventilátor."
5. **(d) | délková nápověda | otázky 2 (+17 znaků), 9 (+24), 10 (+15), 3 (+10) — správná odpověď je nejdelší s náskokem přes 10 znaků, žák ji pozná bez znalosti.**
   NÁVRH: Q2 „Na čem závisí směr magnetické síly na vodič?" → „na směru proudu a pólů | na tloušťce izolace vodiče | na denní době a počasí". Q9 „K čemu slouží komutátor ve stejnosměrném motoru?" → „po půlotočce obrátí proud | měří napětí na kartáčcích | chladí rotor proudem vzduchu". Q10 „Který přístroj také využívá sílu na vodič v poli?" → „reproduktor | rtuťový teploměr | tužková baterie". Q3 „Kdy je síla na vodič největší?" → „při poloze kolmo k čarám | při poloze podél čar | když proud nestojí".
6. **(b) | mimo výklad + křížový únik | otázka 21 „Ve kterém z uvedených zařízení najdeme elektromotor?" — vysvětlení tvrdí, že zapalovací svíčka a bezdrátová nabíječka jsou příklady indukce, což je odpověď otázek 21 a 11 v bloku `elektromagneticka-indukce`; vysvětlení Q6 a Q18 navíc odkazují na alternátor a generátor, které ve výkladu tohoto podtématu nejsou.**
   NÁVRH: ŠKRTNOUT Q21 (viz nález 1) a u Q6 psát vysvětlení bez cizích pojmů: „Elektromotor dává pohyb, energii na něj bere z elektřiny."

---

## elektromagneticka-indukce — VERDIKT: NESLADĚNO (6)
(21 otázek.)

1. **(d) | únik | otázka 7 „Jak počet závitů cívky ovlivní indukované napětí?" — vysvětlení „Také silnější magnet dá větší napětí" je hotová odpověď Q13.**
   NÁVRH (vysvětlení Q7): „Každý další závit přidá svůj díl indukovaného napětí."
2. **(d) | únik | otázka 3 „Kdy se v cívce indukuje napětí?" — vysvětlení „Rozhoduje ZMĚNA pole — čím rychlejší, tím větší napětí" prozrazuje Q5.**
   NÁVRH (vysvětlení Q3): „Stojící pole neindukuje nic, musí se měnit."
3. **(b) | mimo výklad | otázky 10 („Jak funguje indukční varná deska"), 16 (indukční brzdy), 17 (indukční pec), 18 (elektrická kytara) — výklad tahle zařízení jen JMENUJE v jednom seznamu, jejich princip (vířivé proudy, snímač, brzdný účinek) v něm není.**
   NÁVRH: ŠKRTNOUT Q10, Q16, Q18 a NAHRADIT otázkami z výkladu: a) „Čím Faraday zjistil, že na cívce vzniklo napětí?" → „voltmetrem | teploměrem | lupou" — vysvětlení: „Voltmetr měří napětí, jeho ručička se vychýlila." b) „Jakou značku má indukované napětí?" → „Uᵢ | Iᵢ | Tᵢ" — vysvětlení: „Napětí značíme U, indukované má malé i." c) „Co pohání dynamo na jízdním kole?" → „otáčející se kolo | baterie v rámu | sluneční světlo" — vysvětlení: „Kolo roztáčí dynamo a to svítí do předního i zadního světla." (Q17 ponechat, pec je ve výkladu jmenovaná i s účelem.)
4. **(b) | mimo výklad | otázka 19 „Musí se při indukci pohybovat vždy jen magnet, nebo stačí…" — výklad mluví výhradně o pohybu magnetu u cívky, o pohybu cívky kolem nehybného magnetu v něm není ani slovo.**
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Co se musí u cívky dít, aby se indukovalo napětí?" → „musí se měnit magnetické pole | pole musí být co nejsilnější | cívka se musí zahřát" — vysvětlení: „Bez změny pole se neindukuje nic, i kdyby byl magnet sebesilnější."
5. **(d) | únik | otázka 1 „Co je elektromagnetická indukce?" — správná odpověď „vznik napětí při změně pole" je zároveň odpovědí Q3 („Kdy se v cívce indukuje napětí? → když se pole mění").**
   NÁVRH (Q3 přeformulovat jinam): „Co vznikne v cívce navíc, když je obvod uzavřený?" → „indukovaný proud | teplo místo napětí | nic dalšího" — vysvětlení: „V otevřeném obvodu je jen napětí, proud potřebuje uzavřenou cestu."
6. **(c) | nosná část bez otázky | jednotky ze ZAPISU (Uᵢ ve voltech, Iᵢ v ampérech) a Faradayův pokus s voltmetrem nemají žádnou otázku.**
   NÁVRH: pokryto návrhy a) a b) v nálezu 3.

---

## vznik-stridaveho-proudu-alternator — VERDIKT: NESLADĚNO (6)
(21 otázek.)

1. **(d) | délková nápověda | otázky 12 (+37 znaků), 8 (+21), 9 (+21), 3 (+15), 10 (+14) — pět správných odpovědí je nejdelších, u Q12 skoro trojnásobně.**
   NÁVRH: Q12 „K čemu slouží elektrocentrála?" → „k výrobě elektřiny bez sítě | k měření napětí v síti | k ohřevu užitkové vody". Q8 „Čím se liší dynamo od alternátoru?" → „má komutátor | nemá žádné cívky | nepotřebuje pohyb" — vysvětlení: „Proto dává stejnosměrný proud." Q9 „Kdy se indukuje největší napětí?" → „při nejrychlejší změně pole | při zcela stálém poli | při vypnutém stroji". Q3 „Co je alternátor?" → „generátor střídavého proudu | dobíjecí olověná baterie | druh úsporné žárovky". Q10 „K čemu slouží alternátor v automobilu?" → „nabíjí akumulátor | chladí motor auta | brzdí přední kola".
2. **(d) | únik | otázka 6 „Kde v alternátoru se indukuje napětí?" — vysvětlení „Stator je pevná část s cívkami" je doslova odpověď Q15; stejně vysvětlení Q5 („Rotor vytváří proměnlivé magnetické pole") dává odpověď Q14.**
   NÁVRH (vysvětlení Q6): „V rámu ani v kroužcích se napětí neindukuje, vzniká ve vinutí." NÁVRH (vysvětlení Q5): „Kroužky se sice otáčejí s ním, ale pole nevytvářejí."
3. **(d) | duplicita + únik | otázky 8 a 18 zkoušejí totéž (komutátor → dynamo → stejnosměrný proud) a jejich vysvětlení si navzájem dávají odpovědi.**
   NÁVRH: ŠKRTNOUT Q18 a NAHRADIT: „Jaké napětí vznikne ve statoru s jedinou cívkou?" → „jednofázové | třífázové | žádné" — vysvětlení: „Tři cívky dají tři fáze, jedna cívka jednu."
4. **(d) | únik | otázka 1 „Jaký proud odebíráme ze zásuvky?" — vysvětlení „jeho tok se v drátech neustále rychle obrací tam a zpět" je odpověď Q2; vysvětlení Q11 „Ostatní roztáčejí turbínou rotor alternátoru" je odpověď Q19.**
   NÁVRH (vysvětlení Q1): „Ze zásuvky teče proud z rozvodné sítě, ne z baterie." NÁVRH (vysvětlení Q11): „Solární panel vyrábí elektřinu přímo ze světla, bez otáčení."
5. **(a) | rozpor s výkladem | otázky 13 a 16 stojí na pasáži „Otáčející se cívku spojují s obvodem kroužky" / „směr proudu mění samo otáčení cívky", zatímco tentýž výklad o kus výš říká, že se otáčí rotor s magnetem a cívky statoru stojí — žák dostane dvě neslučitelná tvrzení.**
   NÁVRH: buď nechat výklad opravit (rozpor je ve výkladu), nebo Q13 přeformulovat bez sporné části: „Co zajišťují kroužky v alternátoru?" → „pohyblivý kontakt s obvodem | chlazení celého stroje | uchycení statoru k rámu" — vysvětlení: „Bez nich by se přívodní vodiče při otáčení zamotaly."
6. **(c)/(pořadí) | nadstavba na konci | otázka 21 „Co se stane, když se magnet pohybuje u cívky?" je nejzákladnější fakt celého podtématu a stojí až na 21. místě, zatímco aplikační otázky (Q16, Q19) jsou dřív; jednofázové napětí (stator s jednou cívkou) přitom otázku nemá vůbec.**
   NÁVRH: Q21 přesunout na začátek bloku (mezi Q1 a Q2), na konec dát aplikační otázku z nálezu 3.

---

## vlastnosti-stridaveho-proudu — VERDIKT: NESLADĚNO (4)
(21 otázek; všech šest početních otázek přepočítáno a je správně — 20 ms, 100 průchodů nulou, 325 V, 1,4, 200 period, 0,04 s.)

1. **(c) | nosná část bez otázky | tři ze čtyř „Příkladů z hodiny" nemají v kvízu obdobu: výkon vařiče (230 V, 2 A → 460 W), frekvence z periody (0,01 s → 100 Hz) a efektivní napětí z maxima (140 V : 1,4 = 100 V); vzorec P = U · I je ve ZAPISU jako hlavní vztah, ale početně se nezkouší vůbec.**
   NÁVRH (přidat místo duplicitní dvojice Q17/Q18, viz nález 3): a) „Vařičem v zásuvce (230 V) teče proud 2 A. Jaký je jeho výkon?" → „460 W | 230 W | 115 W" — vysvětlení: „P = U · I = 230 · 2 = 460 W." b) „Perioda střídavého proudu je 0,01 s. Jaká je frekvence?" → „100 Hz | 50 Hz | 10 Hz" — vysvětlení: „f = 1 : T = 1 : 0,01 = 100 Hz."
2. **(c) | nosná část bez otázky | odstavec o dálkovém přenosu (ztráty rostou s proudem, elektrárna zvýší napětí na stovky kilovoltů, před domem se sníží na 230 V) nemá otázku — Q17 a Q18 se ptají jen obecně na transformátor.**
   NÁVRH (přidat): „Proč elektrárna posílá energii na velmi vysoké napětí?" → „aby byl malý proud a malé ztráty | aby dráty víc hřály | aby byl proud co největší" — vysvětlení: „Ztráty ve vedení rostou s proudem, vyšší napětí proud sníží."
3. **(d) | duplicita | otázky 17 a 18 zkoušejí tutéž myšlenku (bez transformátoru by nešel dálkový přenos) a vysvětlení Q17 „Střídavé napětí transformátor snadno zvýší i sníží" dává odpověď Q18.**
   NÁVRH: ŠKRTNOUT Q18 a nahradit návrhem a) z nálezu 1 (počet 21 se drží).
4. **(d) | nevěrohodné distraktory | otázka 1 „Jaký tvar má graf střídavého proudu?" (distraktor „čtverec") a otázka 7 „Co vyjadřuje efektivní hodnota proudu?" (distraktor „nulu") — nesmyslná možnost je nápověda.**
   NÁVRH: Q1 → „sinusoida | rovná přímka | schody nahoru" — vysvětlení: „Pravidelná vlnovka vzniká rovnoměrným otáčením cívky." Q7 → „stejné účinky jako stejnosměrný proud | největší špičku proudu za periodu | dobu jedné periody" — vysvětlení: „Špičku značíme Iₘ, efektivní hodnota je asi 70 % z ní."

---

## transformator — VERDIKT: NESLADĚNO (6)
(21 otázek; všechny tři početní otázky přepočítány a jsou správné — 60 V, 20 V, 8 A, celá čísla.)

1. **(d) | duplicita + únik | otázky 3 a 20 zkoušejí totéž („funguje jen na střídavé") a vysvětlení Q3 „Indukce potřebuje proměnlivé pole" je doslova odpověď Q20.**
   NÁVRH: ŠKRTNOUT Q3 a NAHRADIT: „Co se s energií stane při průchodu transformátorem?" → „skoro celá projde dál | z poloviny se ztratí | transformátor ji vyrobí" — vysvětlení: „Projde až 98 ze 100 dílů energie."
2. **(d) | únik | otázka 8 „Co se stane s proudem, když napětí klesne?" — vysvětlení „Výkon P = U·I zůstává stejný" je hotová odpověď Q15 („Co zůstává přibližně stejné na vstupu i výstupu? → výkon").**
   NÁVRH (vysvětlení Q8): „Kolikrát napětí klesne, tolikrát proud vzroste — a naopak."
3. **(d) | únik | otázka 7 „Kdy transformátor napětí snižuje?" — vysvětlení „Transformace dolů, k < 1 (nabíječky)" dává odpověď Q16; vysvětlení Q9 „Např. 400 kV pro dálkový přenos" spolu s Q6 dává odpověď Q17.**
   NÁVRH (vysvětlení Q7): „Méně závitů na výstupu znamená menší napětí." NÁVRH (vysvětlení Q9): „Menší proud znamená menší ohřev drátů, a tedy menší ztráty."
4. **(d) | duplicita + únik | otázky 4 a 19 tvoří pár (primární × sekundární cívka) a vysvětlení Q19 „v sekundární se teprve indukuje výstupní napětí" je odpověď Q4.**
   NÁVRH: ŠKRTNOUT Q19 a NAHRADIT: „Jak se jmenuje cívka, ze které napětí odebíráme?" → „sekundární | primární | indukční" — vysvětlení: „Do primární cívky napětí přivádíme, ze sekundární ho bereme." (pak Q4 a nová otázka nejsou duplicitní — jedna se ptá na místo indukce, druhá na název výstupní cívky; pokud by to bylo málo odlišné, nahradit otázkou na pistolovou páječku z nálezu 6)
5. **(d) | délková nápověda | otázky 11 (+23 znaků), 9 (+16), 8 (+14) — správná odpověď je výrazně nejdelší.**
   NÁVRH: Q11 „Kde se využívá transformace velkého proudu?" → „při svařování obloukem | v běžné žárovce | v tužkové baterii" — vysvětlení: „Nízké napětí a velmi vysoký proud dokáže roztavit kov." Q9 „Proč se energie přenáší na velmi vysoké napětí?" → „aby byl malý proud | aby dráty zářily | kvůli barvě drátů". Q8 „Co se stane s proudem, když napětí klesne?" → „ve stejném poměru vzroste | ve stejném poměru klesne | úplně zmizí".
6. **(c) | nosná část bez otázky | pistolová páječka (malá cívka s jedním závitem) z odstavce „Velký proud z transformátoru" nemá otázku; Q11 jmenuje jen pec a svařování.**
   NÁVRH (přidat místo duplicity z nálezu 4): „Kolik závitů má cívka pistolové páječky?" → „jeden | sto | tisíc" — vysvětlení: „Jediný silný závit dá malé napětí a velký proud, který pájku rozpálí."

---

## ⚠️ ze `zkontroluj.mjs` (doslovně, celý běh)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 565 otázek (20 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 179 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
ℹ️  laťku lze utáhnout příkazem: npm run prijmi-latku (brána sama nic nepřepisuje)
✅ Vše zapojené správně.
```
Žádné ⚠️ se netýká přímo osmi kontrolovaných klíčů. **Brána přitom hlásí „0 duplicit, 0 úniků odpovědí" na 150 blocích — v těchto osmi blocích jsem ručně našel 20 úniků a 20 duplicitních párů, takže `testy/uniky.mjs` je vůči únikům do `vysvetleni` slepá.** Délkový náskok ≥10 znaků hlásí bránou měřených 179 otázek globálně; z toho v kontrolovaných blocích 20 otázek (alternátor 5, elektromotor 4, transformátor 3, ostatní zbytek).

---

## ZAPRACOVÁNO 22. 9. 2026

Zdroj: `git log -1 --format=%h` po commitu — viz zpráva exekutora. Zálohy `--otazky` před zásahem: `scratchpad/kviz-<klic>-pred.txt` (8 souborů). Po zásahu ověřeno `node testy/vypis-kviz.mjs <klic>` = 21 u všech 8 bloků, `node testy/uniky.mjs` = 0 duplicit/0 úniků, `node zkontroluj.mjs` = 0 ⚠️ k těmto klíčům, `npm run build` prošel (481 stránek).

**magnety-magneticke-pole-opakovani** (24→21): [x] 1 (přidáno jako nová otázka na konci) · [x] 2 (přidáno) · [x] 3 (Q1 přeformulována) · [x] 4 (Q2 vysvětlení zkráceno) · [x] 5 (Q15 distraktor vyměněn) · [x] 6 (Q23 nahrazena) · [x] 7 (Q22 nahrazena). Na 21 sníženo škrtnutím 5 nejslabších/nejvíc okrajových otázek beze samostatného nálezu (nerost magnetit, tvary magnetů, netečné pásmo, duplicitní „po rozlomení", piliny) — zbytek beze změny.

**magneticke-pole-vodice-a-civky** (21): [x] 1 (Q7 nahrazena; duplicita s Q21 zmizela) · [x] 2 (Q5 vysvětlení) · [x] 3 (Q15+Q16 vysvětlení) · [x] 4 (Q9 vysvětlení) · [x] 5 (Q2 vysvětlení) · [x] 6 (nová otázka o počtu závitů — nahradila Q1 „co vzniká kolem vodiče", protože Q7 už NÁVRH nálezu 1 zabíral; odchylka od „nahradit Q7" popsána v NÁVRH textu samém) · [x] 7 (Q8 vysvětlení, „rotor motoru"→„elektromotor").

**elektromagnet** (21): [x] 1 (Q15 nahrazena) · [x] 2 (Q1 nahrazena) · [x] 3 (Q8 vysvětlení) · [x] 4 (Q12 vysvětlení) · [x] 5 (Q5 vysvětlení) · [x] 6 (Q7 vysvětlení) · [x] 7 (Q10 vysvětlení).

**pusobeni-pole-na-vodic-elektromotor** (21): [x] 1 (Q15,16,17,18,21 škrtnuty; nahrazeno 5 otázkami — nález4 dal jen 2 hotové texty (a,b), zbylé 3 (kotva/rotor synonymum, další místa výskytu, mechanika Flemingova pravidla) dopsány z nepokryté látky výkladu, ne z nálezu — ODCHYLKA, zapsáno) · [x] 2 (Q3 vysvětlení+text) · [x] 3 (Q19 vysvětlení) · [x] 4 (a,b doplněny) · [x] 5 (Q2,Q3,Q9,Q10 přepsány) · [x] 6 (Q21 škrtnuta, Q6 vysvětlení). Navíc opraveny 2 nové úniky, které vznikly až sladěním (Q20↔Q9 „půlotočka", Q16↔Q7 „otáčející se část s cívkami") — mimo nálezy, odhaleno `uniky.mjs` po zásahu.

**elektromagneticka-indukce** (21): [x] 1 (Q7 vysvětlení) · [x] 2 (sloučeno s nálezem 5 — Q3 celá nahrazena, čímž zmizel i union do Q5) · [x] 3 (Q10,16,18 nahrazeny a,b,c) · [x] 4 (Q19 nahrazena) · [x] 5 (Q3 nahrazena) · [x] 6 (pokryto body a,b z nálezu 3).

**vznik-stridaveho-proudu-alternator** (21): [x] 1 (Q3,8,9,10,12 přepsány kratší distraktory) · [x] 2 (Q5,Q6 vysvětlení) · [x] 3 (Q18 nahrazena „jednofázové napětí") · [x] 4 (Q1,Q11 vysvětlení) · [x] 5 (Q13 přeformulována dle NÁVRH; Q16 ponechána — nepoužívá slovo „cívka" jako podmět otáčení, rozpor ve výkladu se jí netýká tak přímo, ODCHYLKA zapsána) · [x] 6 (Q21 přesunuta mezi Q1/Q2, nová „jednofázové" otázka na konec).

**vlastnosti-stridaveho-proudu** (21): [x] 1 (přidány a) vařič 460 W, b) perioda→100 Hz — položka c) z nálezu textu nebyla explicitně navržena, nedoplňována) · [x] 2 (přidána otázka o vysokém napětí elektrárny) · [x] 3 (Q18 škrtnuta, nahrazena a); pro slot b) a novou otázku nálezu 2 odstraněna navíc Q9 „kterou hodnotu naměří přístroj" — redundantní s Q7 — a Q19 „kolikrát je proud největší" — ODCHYLKA, nález sám nedal dost náhrad na 3 sloty, doplněno exekutorem) · [x] 4 (Q1,Q7 distraktory přepsány).

**transformator** (21): [x] 1 (Q3 nahrazena) · [x] 2 (Q8 vysvětlení) · [x] 3 (Q7,Q9 vysvětlení) · [x] 4 (Q19 nahrazena — použit rovnou návrh z nálezu 6, ne „sekundární cívka" varianta, jak nález sám nabízel jako alternativu) · [x] 5 (Q8,Q9,Q11 distraktory) · [x] 6 (pokryto bodem 4 — pistolová páječka).

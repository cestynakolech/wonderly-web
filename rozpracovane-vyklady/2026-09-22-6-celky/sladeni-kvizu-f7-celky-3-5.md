# Sladění kvízů s výklady — F7, celky jednoduche-stroje / tlak-v-kapalinach / vztlakova-sila-a-plovani-teles

Kontrola 22. 9. 2026, nezávislý kontrolor. Všech 9 bloků má 21 otázek (počet je splněn).
Měřeno: `node testy/vypis-kviz.mjs <klic>`, `node podtema.mjs . get <klic>`, vlastní skript na náskok
(stejná definice jako `zkontroluj.mjs` ř. 197–198: správná striktně nejdelší a náskok ≥ 10 znaků).
Všechny výpočty přepočítány. NIC NEBYLO ZAPSÁNO do `kvizy.ts` ani `temata.ts`.

---

## fyzika/7-rocnik/jednoduche-stroje/pusobeni-teles-a-deformace — VERDIKT: NESLADĚNO (6)

1. (a) fakta jinak než ve výkladu | otázka 6 „Kolik základních účinků může mít síla…" | Výklad říká doslova „Síla na těleso může působit **dvěma způsoby**" (změní pohyb / změní tvar) a teprve pohybové účinky dělí na posuvný a otáčivý. Číslo „tři" ve výkladu nikde nestojí — dítě, které výklad četlo, sáhne po „dva", což ani není v nabídce. Navíc náskok 29 znaků (34 vs 5).
   NÁVRH: „Na které dva způsoby může síla těleso ovlivnit?" → „změní mu pohyb, nebo jeho tvar" (29) / „změní mu barvu, nebo hmotnost" (29) / „změní mu teplotu, nebo objem" (28). Vysvětlení: „Výklad uvádí dva způsoby — změnu pohybu (posun či otočení) a změnu tvaru."

2. (a)+(d) látka mimo výklad + únik | otázka 18 „Může jedna síla způsobit více účinků najednou?" | Kombinace účinků ve výkladu vůbec není; odpověď navíc prozrazuje vysvětlení otázky 6 („…nebo zdeformovat — i v kombinaci"). Náskok 13 znaků.
   NÁVRH: ŠKRTNOUT a NAHRADIT otázkou na úvodní (dosud nezkoušenou) větu výkladu o oboustrannosti působení: „Když kladivo působí na hřebík, co dělá hřebík?" → „působí zpátky na kladivo" (24) / „nepůsobí vůbec na nic" (21) / „mění se v jinou látku" (21). Vysvětlení: „Působení nikdy nejde jen jedním směrem — obě tělesa působí na sebe navzájem."

3. (d) délková nápověda | otázka 1 „Jak nazýváme vzájemné ovlivňování těles?" | Náskok 18 znaků (29 vs 11).
   NÁVRH: „vzájemné působení" (18) / „vzájemné odpuzování" (20) / „vzájemné míjení" (16). Vysvětlení beze změny.

4. (d) délková nápověda | otázka 11 „Jaká deformace je pružná (elastická)?" | Náskok 11 znaků (44 vs 33).
   NÁVRH: „dočasná, tvar se vrátí" (22) / „trvalá, tvar zůstane změněný" (28) / „taková, po níž se těleso rozpadne" (33).

5. (d) délková nápověda | otázka 12 „Jaká deformace je trvalá (plastická)?" | Náskok 14 znaků (39 vs 25).
   NÁVRH: „tvar zůstane změněný" (20) / „těleso se vždy vrátí zpět" (25) / „žádná změna tvaru nenastane" (27).

6. (d) duplicita | otázky 13 + 15 (příklad pružné deformace dvakrát) a 14 + 17 (příklad trvalé deformace dvakrát) | Čtyři z 21 otázek zkoušejí dvě fakta; přitom těžiště a dělení pohybových účinků zůstávají bez otázky.
   NÁVRH: otázku 15 ŠKRTNOUT a NAHRADIT: „Co je těžiště tělesa?" → „bod rovnováhy tělesa" (20) / „nejtěžší místo povrchu" (23) / „střed horní stěny" (17). Vysvětlení: „Těžiště je bod, kolem kterého je těleso v rovnováze."
   Otázku 17 ŠKRTNOUT a NAHRADIT: „Jak se dělí pohybové účinky síly?" → „na posuvný a otáčivý" (21) / „na pružný a trvalý" (19) / „na statický a dynamický" (23). Vysvětlení: „Pohybové účinky jsou dva — posuvný (posun) a otáčivý (otočení kolem osy)."

---

## fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky — VERDIKT: NESLADĚNO (9)

1. (a) definice jinak než ve výkladu | otázka 3 „Co je rameno síly?" | Výklad: „Vzdálenost mezi osou otáčení a místem, kde na páku působí síla." Kvíz žádá „kolmou vzdálenost osy otáčení od směru síly" — jiná (přesnější, ale ve výkladu neuvedená) definice; žák ji ze stránky nemá kde vzít.
   NÁVRH: „Co je rameno síly na páce?" → „vzdálenost osy od místa působení síly" (37) / „celková délka celé tyče od konce ke konci" (40) / „hmotnost zavěšeného závaží v kilogramech" (39). Vysvětlení: „Rameno a měříme od osy otáčení k místu, kde síla na páku působí."

2. (a) vzorec mimo výklad | otázka 5 „Podle jakého vzorce vypočítáme moment síly?" | Výklad neuvádí značku M ani vzorec M = F · a, říká jen „Součinu síly a jejího ramene se říká moment síly."
   NÁVRH: „Čemu se říká moment síly?" → „součinu síly a jejího ramene" (27) / „podílu síly a jejího ramene" (27) / „součtu síly a jejího ramene" (27). Vysvětlení: „Moment síly = síla krát její rameno."

3. (a) jednotka mimo výklad | otázka 6 „Jaká je jednotka momentu síly?" | N·m není ve výkladu ani v poli ZAPIS (tam jen N a m).
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Co patří mezi jednoduché stroje?" → „kolo na hřídeli" (15) / „elektrický motor" (16) / „spalovací turbína" (17). Vysvětlení: „Výklad jmenuje páku, kladku, nakloněnou rovinu a kolo na hřídeli."

4. (a) tvrzení bez opory ve výkladu | otázka 4 „Co popisuje moment síly?" | Spojení momentu s „otáčivým účinkem" je látka sousedního podtématu, v tomto výkladu není. Zároveň chybí otázka na polohu osy u dvojzvratné páky (výklad: „osu uprostřed tyče").
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Kde má osu otáčení dvojzvratná páka?" → „uprostřed tyče" (14) / „na kraji tyče" (13) / „mimo tyč" (8). Vysvětlení: „Dvojzvratná páka má osu uprostřed, síly působí na obou stranách."

5. (b) látka jiného podtématu | otázky 16, 17, 18 „Co je pevná kladka…", „Zvedáme 2 kg (20 N) přes pevnou kladku…", „Jakou silou zvedneme 20 N přes volnou kladku?" | Výklad páky kladku jen jmenuje v seznamu jednoduchých strojů; celá látka i výpočty patří podtématu `kladka` a duplicitně tam už jsou (tamní otázky 1, 2, 3, 9, 21). Cross-blokovou duplicitu `uniky.mjs` nezachytí (porovnává jen uvnitř bloku).
   NÁVRH: všechny tři ŠKRTNOUT a NAHRADIT otázkami z výkladu páky:
   16 → „Kde má osu jednozvratná páka?" → „na kraji tyče" (13) / „uprostřed tyče" (14) / „v těžišti břemene" (17). Vysvětlení: „U jednozvratné páky je osa na kraji a obě síly působí na stejné straně."
   17 → „Proč se páce s osou uprostřed říká dvojzvratná?" → „síly ji otáčejí na opačné strany" (31) / „má dvě různě dlouhá ramena" (26) / „unese dvojnásobné břemeno" (26). Vysvětlení: „Každá síla otáčí pákou na jinou stranu — proto dvojzvratná."
   18 → „Proč musí sval na paži táhnout velkou silou?" → „má velmi krátké rameno" (22) / „má velmi dlouhé rameno" (22) / „nemá žádnou osu otáčení" (23). Vysvětlení: „Sval je blízko loketního kloubu, takže má krátké rameno — musí proto táhnout velkou silou." (Zároveň se tím pokryje nález 9.)

6. (a) nadstavba mimo výklad | otázky 19 a 20 „K čemu slouží momentový klíč?", „Kde se v technice mluví o točivém momentu?" | Momentový klíč ani točivý moment motorů ve výkladu nejsou (výklad zná jen „maticový klíč" v seznamu nástrojů).
   NÁVRH: 19 ŠKRTNOUT a NAHRADIT: „Co z výkladu využívá páku?" → „rovnoramenné váhy" (18) / „digitální teploměr" (18) / „sluneční hodiny" (15). Vysvětlení: „Rovnoramenné váhy jsou dvojzvratná páka se stejně dlouhými rameny."
   20 ŠKRTNOUT a NAHRADIT: „Jaká síla stačí na dvakrát delší rameno?" → „poloviční" (9) / „dvojnásobná" (11) / „stejná" (6). Vysvětlení: „Výklad počítá: na rameni 4 m stačí 10 N místo 20 N na rameni 2 m."

7. (a) látka mimo výklad | otázka 21 „Rovnováhy na páce se využívá i při…" | Těžiště je v tomto výkladu vůbec zmíněno není.
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Co se stane, když si těžší dítě sedne na houpačku stejně daleko od osy jako lehčí?" → „zůstane dole a lehčí nahoře" (27) / „houpačka je v rovnováze" (24) / „lehčí dítě klesne dolů" (22). Vysvětlení: „Větší síla na stejném rameni má větší moment — houpačka není v rovnováze."

8. (a) zařazení bez opory | otázky 14 a 15 „Který nástroj je dvojzvratná páka?" / „…jednozvratná páka?" | Výklad uvádí jako příklady dvojzvratné houpačku a rovnoramenné váhy, jako jednozvratné otvírák a stavební kolečko. Nůžky, kleště a louskáček jsou ve výkladu jen v seznamu „Páka kolem nás" BEZ zařazení — kvíz zkouší zařazení, které ve výkladu není.
   NÁVRH: 14 → „Který příklad je dvojzvratná páka?" → „houpačka" (8) / „lis na česnek" (13) / „páčidlo" (8). 15 → „Který příklad je jednozvratná páka?" → „stavební kolečko" (16) / „rovnoramenné váhy" (17) / „maticový klíč" (13). Vysvětlení podle výkladu (osa uprostřed / na kraji).

9. (c) nosná část výkladu bez otázky | h3 „Pro zvídavé: počítáme", odstavec o svalu na paži | Žádná otázka; řeší návrh v nálezu 5 (nová otázka 18).

---

## fyzika/7-rocnik/jednoduche-stroje/kladka — VERDIKT: NESLADĚNO (10)

Výpočty přepočítány a souhlasí: 200 : 2 = 100 N (9), 2 · 3 = 6 m (12), 240 : 3 = 80 N (15), 4 m (18), 3× (19), 60 : 2 = 30 N (21), 50 + 50 = 100 N (4).

1. (d) duplicita | otázky 7 „Co je kladkostroj?" a 20 „Z čeho vznikne kladkostroj?" | Doslova tatáž odpověď dvakrát („spojení více pevných a volných kladek"); každá z nich prozrazuje tu druhou. `uniky.mjs` to kvůli jinému znění nezachytilo.
   NÁVRH: otázku 20 ŠKRTNOUT a NAHRADIT: „Kde se kladkostroje používají?" → „u jeřábů, na lodích, v dílnách" (29) / „v teploměrech a barometrech" (27) / „v hodinkách a kompasech" (24). Vysvětlení: „Výklad uvádí jeřáby, lodě a dílny."

2. (d) duplicita | otázky 3, 9 a 21 (volná kladka půlí sílu — jednou slovně, dvakrát číselně) | Tři z 21 otázek na jediný fakt.
   NÁVRH: otázku 21 ŠKRTNOUT a NAHRADIT: „Proč se u pevné kladky táhne lano dolů snáz?" → „můžeme se opřít vlastní vahou" (28) / „lano se tím samo zkracuje" (26) / „kladka tím zmenší sílu" (23). Vysvětlení: „Pevná kladka sílu nezmenší, ale směr dolů je pohodlnější — opřeme se vlastní vahou."

3. (a) údaj bez opory ve výkladu | otázka 11 „Na kolika částech lana visí břemeno u pevné kladky?" | Výklad počet částí lana u PEVNÉ kladky neuvádí (uvádí ho jen u volné — „dvě části lana").
   NÁVRH: „Kolik částí lana nese břemeno u volné kladky?" → „dvě" (3) / „jedna" (5) / „čtyři" (5). Vysvětlení: „Břemeno drží dvě části lana, proto na každou připadá polovina tíhy."

4. (d) délková nápověda | otázka 1 „Co je kladka?" | Náskok 19 (36 vs 17).
   NÁVRH: „kolo s drážkou pro lano" (23) / „tyč otáčivá kolem osy" (22) / „šikmá plocha pro břemeno" (25).

5. (d) délková nápověda | otázka 2 „Co dělá pevná kladka se silou?" | Náskok 12 (35 vs 23).
   NÁVRH: „mění jen směr síly" (19) / „zmenší sílu na polovinu" (23) / „sílu zdvojnásobí" (16).

6. (d) délková nápověda | otázka 3 „Jak velkou silou zvedneme břemeno na volné kladce?" | Náskok 13 (30 vs 17).
   NÁVRH: „poloviční" (9) / „stejná jako tíha" (16) / „dvojnásobná" (11).

7. (d) délková nápověda | otázka 5 „Co ‚zaplatíme' za poloviční sílu u volné kladky?" | Náskok 10 (28 vs 18).
   NÁVRH: „dvakrát delší lano" (18) / „nic, je to zadarmo" (18) / „kladka se zahřeje" (17).

8. (d) délková nápověda | otázka 6 „Proč se u vlajkového stožáru používá pevná kladka?" | Náskok 18 (47 vs 29).
   NÁVRH: „táhneme dolů, nešplháme" (23) / „aby vlajka vážila méně" (22) / „aby stačila poloviční síla" (26).

9. (d) délková nápověda | otázka 7 „Co je kladkostroj?" | Náskok 21 (37 vs 16).
   NÁVRH: „spojení více kladek" (19) / „kladka s motorem" (16) / „velmi velká páka" (16).

10. (d) délková nápověda | otázka 8 „Co říká zlaté pravidlo mechaniky?" | Náskok 28 (58 vs 30).
   NÁVRH: „menší síla, delší dráha" (23) / „stroj vyrobí práci navíc" (24) / „síla se rovná dráze" (19).

---

## fyzika/7-rocnik/jednoduche-stroje/naklonena-rovina — VERDIKT: NESLADĚNO (4)

Výpočty přepočítány a souhlasí: 300·1:3 = 100 N (4), 600·2:6 = 200 N (5), 8:2 = 4× (8), 400·3:100 = 12 m (9), 500·1:4 = 125 N (11), 200·2:50 = 8 m (12), 12:2 = 6× (13), 800·2:10 = 160 N (21). Všechny výsledky celá čísla.

1. (d) délková nápověda | otázka 1 „Co je nakloněná rovina?" | Náskok 34 (60 vs 26).
   NÁVRH: „šikmá plocha pro zvedání břemen" (30) / „kolo s drážkou pro lano" (23) / „tuhá tyč otáčivá kolem osy" (26).

2. (d) délková nápověda | otázka 6 „Proč vedou horské silnice do kopce v serpentinách…" | Náskok 35 (57 vs 22).
   NÁVRH: „delší dráha, mírnější stoupání" (30) / „aby auta jela rychleji do kopce" (31) / „aby se ušetřil asfalt na stavbu" (31).

3. (d) délková nápověda | otázka 7 „Co je šroub z hlediska jednoduchých strojů?" | Náskok 15 (36 vs 21).
   NÁVRH: „nakloněná rovina kolem válce" (28) / „druh dvojzvratné páky" (21) / „pevná kladka se závitem" (23).

4. (d) nadbytek stejných úloh na úkor pokrytí | otázky 4, 5, 11, 21 (čtyřikrát F = G·h:l), 9 a 12 (dvakrát l = G·h:F), 8 a 13 (dvakrát poměr l:h) | 8 z 21 otázek testuje tři úlohy, zatímco část výkladu o šroubu proti hřebíku a význam písmen ve vzorci zkoušené nejsou.
   NÁVRH: otázku 11 ŠKRTNOUT a NAHRADIT: „Proč jde šroub zašroubovat menší silou než zatlouct hřebík?" → „závit prodlužuje dráhu" (22) / „šroub je z tvrdší oceli" (23) / „hřebík má menší hlavičku" (24). Vysvětlení: „Závit je nakloněná rovina — menší síla za cenu mnoha otáček."
   Otázku 21 ŠKRTNOUT a NAHRADIT: „Co znamená l ve vzorci F = G · h : l?" → „délku nakloněné roviny" (22) / „výšku nakloněné roviny" (23) / „tíhu břemene" (13). Vysvětlení: „l je délka roviny, h výška a G tíha břemene."

---

## fyzika/7-rocnik/tlak-v-kapalinach/tlak — VERDIKT: NESLADĚNO (7)

Výpočet přepočítán: 50 : 0,5 = 100 Pa (21) — správně.

1. (c) nosná část výkladu bez otázky | h3 „Další vzorce" a „Pro zvídavé: počítáme" | Vzorec S = F : p ani jeden z obou dopočtů výkladu (F = 200 · 0,01 = 2 N; S = 300 : 30 000 = 0,01 m² = 100 cm²) nemá otázku. Blok má jediný číselný příklad z 21 otázek.
   NÁVRH: otázku 20 (převod 1 m² = 100 dm², okrajová) ŠKRTNOUT a NAHRADIT: „Podle jakého vzorce vypočítáme plochu, když známe sílu a tlak?" → „S = F : p" (9) / „S = p : F" (9) / „S = F · p" (9). Vysvětlení: „Ze vzorce p = F : S plyne S = F : p."

2. (c) nosná část výkladu bez otázky | h3 „Tlak je všude kolem nás" (velbloud, ptáci, technika) | Celá pasáž bez otázky, zatímco „jak tlak zvětšit/zmenšit" je zkoušeno čtyřikrát (13, 14, 15, 16).
   NÁVRH: otázku 13 (duplicitní zrcadlo otázek 10 a 11) ŠKRTNOUT a NAHRADIT: „Proč má velbloud široká chodidla?" → „aby se nebořil do písku" (23) / „aby se rychleji ochladil" (24) / „aby lépe utekl před lvem" (24). Vysvětlení: „Široká chodidla rozloží váhu na velkou plochu, tlak na písek je proto malý."

3. (a) tvrzení bez opory ve výkladu | otázka 9, vysvětlení „Normální atmosférický tlak je asi 1 013 hPa" | Atmosférický tlak ve výkladu tohoto podtématu není (fyzikálně je údaj správný, ale žák ho na stránce nenajde).
   NÁVRH: vysvětlení nahradit: „Předpona hekto- znamená sto: 1 hPa = 100 Pa, stejně jako 1 hl = 100 l."

4. (d) délková nápověda | otázka 12 „Proč bolí šlápnutí jehlovým podpatkem víc než teniskou?" | Náskok 17 (59 vs 42).
   NÁVRH: „menší plocha, větší tlak" (24) / „jehlový podpatek je těžší než teniska" (37) / „guma tenisky tlak zvětšuje" (26).

5. (d) délková nápověda | otázka 16 „K čemu slouží sněžnice?" | Náskok 15 (58 vs 43).
   NÁVRH: „rozloží váhu na větší plochu" (28) / „zvětšují tlak na sníh pod nohama" (32) / „zmenšují plochu pod nohou" (26).

6. (d) délková nápověda | otázka 17 „Proč mají bagry a tanky pásy a traktory široké pneumatiky?" | Náskok 38 (70 vs 32) — nejhorší v celé trojici celků.
   NÁVRH: „rozloží váhu na velkou plochu" (29) / „aby byl tlak na půdu co největší" (32) / „jen kvůli vyšší rychlosti jízdy" (31).

7. (DROBNÉ) celá čísla | otázka 21 „Krabice působí na stůl silou 50 N a její dno má obsah 0,5 m²…" | Zadání pracuje s desetinným číslem, i když výsledek vyjde celý; pravidlo žádá celá čísla v příkladech.
   NÁVRH: „Krabice působí na stůl silou 50 N a její dno má obsah 2 m². Jaký je tlak na stůl?" → „25 Pa" (5) / „100 Pa" (6) / „52 Pa" (5). Vysvětlení: „p = F : S = 50 : 2 = 25 Pa."

---

## fyzika/7-rocnik/tlak-v-kapalinach/pascaluv-zakon — VERDIKT: NESLADĚNO (9)

Výpočty přepočítány a souhlasí: 24 : 3 = 8 Pa (10), 8 · 12 = 96 N (11), 20 : 0,0005 = 40 000 Pa (12), 80 · 20 = 1 600 N (13), 400 : 10 000 = 0,04 m² (20).

1. (a) číslo ve správné odpovědi není ve výkladu + desetinné zadání | otázka 12 „Zubař tlačí na malý píst o ploše 5 cm² (0,0005 m²) silou 20 N…" | Výklad zubařské křeslo počítá POMĚREM ploch (400 : 5 = 80), tlak 40 000 Pa ve výkladu nikde není; navíc zadání i mezivýsledek jsou desetinné.
   NÁVRH: „Velký píst zubařského křesla má 400 cm², malý 5 cm². Kolikrát je větší?" → „80krát" (6) / „8krát" (5) / „800krát" (7). Vysvětlení: „400 : 5 = 80 — velký píst je 80krát větší, proto je i síla 80krát větší."

2. (d) duplicita | otázky 9 „Plocha druhého pístu je 10× větší…" a 21 „Pokud je plocha druhého pístu 100× větší…" | Tentýž fakt (zlaté pravidlo hydrauliky) dvakrát, obě vysvětlení se navzájem prozrazují.
   NÁVRH: otázku 9 ŠKRTNOUT a NAHRADIT (výklad definuje píst, dosud nezkoušeno): „Co je píst?" → „pohyblivá deska v nádobě" (24) / „pevné dno nádoby" (17) / „trubice s kapalinou" (19). Vysvětlení: „Píst je pohyblivá deska, kterou tlačíme přímo do kapaliny."

3. (a) pojem mimo výklad + (d) náskok 31 | otázka 14 „Proč se hydraulice říká ‚páka na sílu'?" | Přezdívka „páka na sílu" ve výkladu není; zároveň je poslední část výpočtu výkladu (F₂ : g = 1 600 : 10 = 160 kg) bez otázky.
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Křeslo zvedá síla 1 600 N. Jakou hmotnost uzvedne (g = 10 N/kg)?" → „160 kg" (6) / „16 kg" (5) / „1 600 kg" (8). Vysvětlení: „m = F : g = 1 600 : 10 = 160 kg — křeslo váží 30 kg, pacient tedy až 130 kg."

4. (d) délková nápověda | otázka 2 „Proč kapaliny dobře přenášejí tlak?" | Náskok 10 (33 vs 23).
   NÁVRH: „nedají se stlačit" (17) / „jsou snadno stlačitelné" (23) / „mají vlastní stálý tvar" (23).

5. (d) délková nápověda | otázka 4 „Co je základem hydraulického zařízení?" | Náskok 14 (47 vs 33).
   NÁVRH: „dvě nádoby s písty" (19) / „dvě oddělené nádoby bez propojení" (33) / „pružina spojená s pákou" (23).

6. (d) délková nápověda | otázka 15 „Co se stane po sešlápnutí brzdového pedálu v autě?" | Náskok 37 (72 vs 35).
   NÁVRH: „tlak kapaliny přitlačí destičky" (31) / „ocelové lanko zatáhne přímo za kola" (35) / „stlačený vzduch nafoukne pneumatiky" (35).

7. (d) délková nápověda | otázka 17 „Kde všude se hydraulika využívá?" | Náskok 22 (48 vs 26).
   NÁVRH: „zvedáky, lisy a brzdy aut" (25) / „žárovky, vařiče a ledničky" (26) / „sluneční hodiny a kompasy" (25).

8. (a) nadstavba ve vysvětlení | otázka 5, vysvětlení „olej — nestlačitelný, maže součástky a nerezaví" | Výklad říká jen „(obvykle oleje)"; mazání ani nerezavění tam nejsou.
   NÁVRH: vysvětlení: „Výklad uvádí, že hydraulická zařízení používají obvykle olej."

9. (a) převod bez opory | otázka 20 „Převod jednotek: 400 cm² = ?" a vysvětlení „1 m² = 10 000 cm²" | V tomto výkladu ani v jeho ZAPIS nejsou převody plošných jednotek uvedeny (jsou jen u podtématu `tlak`).
   NÁVRH: buď doplnit převod do jednotek ZAPIS tohoto podtématu, nebo otázku přeformulovat na poměr ploch bez převodu: „Kolikrát je píst o ploše 400 cm² větší než píst o ploše 5 cm²?" → „80krát" (6) / „8krát" (5) / „800krát" (7) — pozor, pak by kolidovala s návrhem nálezu 1; v tom případě ponechat otázku 20 a doplnit převod do výkladu.

---

## fyzika/7-rocnik/tlak-v-kapalinach/hydrostaticky-tlak — VERDIKT: NESLADĚNO (12)

Výpočty přepočítány a souhlasí: 10·1000·10 = 100 000 Pa (17), 3·1000·10 = 30 000 Pa (18), 48·5·1000·10 = 2 400 000 N (20), 5 − 2 = 3 m (21).

1. (c) nosná část výkladu bez otázky | „Pro zvídavé: počítáme", třetí příklad (600 000 Pa → h = 60 m) a odvozený vzorec h = pₕ : (ρ · g) ze ZAPIS | Obrácený výpočet nemá otázku, zatímco přímý výpočet je dvakrát (17 a 18).
   NÁVRH: otázku 18 ŠKRTNOUT a NAHRADIT: „U dna přehrady je tlak 600 000 Pa. Jak je přehrada hluboká (ρ = 1 000 kg/m³, g = 10 N/kg)?" → „60 m" (5) / „6 m" (4) / „600 m" (6). Vysvětlení: „h = pₕ : (ρ · g) = 600 000 : 10 000 = 60 m."

2. (a) pojem mimo výklad | otázka 10 „Co říká hydrostatický paradox…" (a vysvětlení otázky 3) | Výklad pojem „hydrostatický paradox" vůbec nepoužívá, má jen nadpis „Tvar nádoby nehraje roli". Zároveň je tu náskok 12 znaků.
   NÁVRH: „Dvě nádoby mají stejně velké dno a stejně vysokou hladinu. Jak je to se silou na dno?" → „je v obou stejná" (17) / „větší je v širší nádobě" (24) / „větší je v užší nádobě" (23). Vysvětlení: „Rozhoduje jen hloubka a hustota — tvar nádoby ani množství vody ne." Z vysvětlení otázky 3 větu o paradoxu vypustit.

3. (a) tvrzení bez opory ve výkladu | otázka 17, vysvětlení „v deseti metrech přibude tlak celé jedné atmosféry" | Atmosférický tlak ve výkladu není.
   NÁVRH: vysvětlení: „pₕ = h · ρ · g = 10 · 1 000 · 10 = 100 000 Pa."

4. (d) délková nápověda | otázka 1 „Čím vzniká hydrostatický tlak?" | Náskok 16 (42 vs 26).
   NÁVRH: „tíhou kapaliny" (14) / „působením větru na hladinu" (26) / „zahříváním kapaliny" (19).

5. (d) délková nápověda | otázka 2 „Na co působí hydrostatický tlak?" | Náskok 26 (49 vs 23).
   NÁVRH: „všemi směry" (11) / „jen na dno nádoby" (17) / „jen na hladinu kapaliny" (23).

6. (d) délková nápověda | otázka 3 „Na čem závisí velikost hydrostatického tlaku?" | Náskok 11 (42 vs 31).
   NÁVRH: „na hloubce a hustotě" (21) / „na tvaru nádoby a množství vody" (31) / „na barvě a teplotě nádoby" (25).

7. (d) délková nápověda | otázka 10 — řeší návrh v nálezu 2 (náskok 12 → 0).

8. (d) délková nápověda | otázka 11 „Jak jsou vysoko hladiny kapaliny ve spojených nádobách?" | Náskok 14 (32 vs 18).
   NÁVRH: „všude stejně vysoko" (19) / „v širší nádobě výš" (18) / „v užší nádobě výš" (17).

9. (d) délková nápověda | otázka 13 „Proč je hráz přehrady u dna mnohem širší než nahoře?" | Náskok 31 (56 vs 25).
   NÁVRH: „tlak u dna je největší" (22) / „jen kvůli hezčímu vzhledu" (25) / „aby se na ni lépe šplhalo" (25).

10. (d) délková nápověda | otázka 14 „Proč se vodojem staví výš než okolní budovy?" | Náskok 40 (61 vs 21) — nejhorší v bloku.
   NÁVRH: „výška hladiny vytváří tlak" (26) / „aby byl vidět z velké dálky" (27) / „aby do něj nepršelo listí" (25).

11. (d) délková nápověda | otázka 15 „K čemu slouží sifon u umyvadla a WC?" | Náskok 18 (44 vs 26).
   NÁVRH: „vodní zátka zadrží zápach" (25) / „šetří vodu při splachování" (26) / „ohřívá vodu v potrubí" (21).

12. (d) délková nápověda | otázka 16 „K čemu slouží plavební komora (zdymadlo)?" | Náskok 19 (44 vs 25).
   NÁVRH: „překonání rozdílu hladin" (24) / „sušení lodí po plavbě" (21) / „měření rychlosti proudu" (23).

---

## fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/archimeduv-zakon — VERDIKT: NESLADĚNO (8)

Výpočty přepočítány a souhlasí: 0,1 · 10 = 1 N (8), 0,001 · 1 000 · 10 = 10 N (18).

1. (c) nosná část výkladu + bod ZAPIS bez otázky | h3 „Proč vztlaková síla vzniká" (bod ZAPIS „vzniká: tlak zdola > tlak shora") | Celé vysvětlení příčiny vztlaku nemá jedinou otázku, zatímco „co vztlak dělá" je zkoušeno třikrát (1, 7, 16).
   NÁVRH: otázku 7 (duplicitní s otázkou 1) ŠKRTNOUT a NAHRADIT: „Proč vztlaková síla vzniká?" → „dole tlačí kapalina víc než nahoře" (33) / „nahoře tlačí kapalina víc než dole" (34) / „ze stran tlačí kapalina nejvíc" (30). Vysvětlení: „Spodní stěna je hlouběji, hydrostatický tlak je tam větší — rozdíl sil míří vzhůru."

2. (c) nosná část výkladu bez otázky | odstavec o poměru hustot (ledovec 9/10 pod hladinou, Titanic, korek 200 kg/m³ a 4/5 nad hladinou) | Bez otázky; naopak „kdy těleso plove" je v bloku třikrát (11, 13, 18).
   NÁVRH: otázku 11 ŠKRTNOUT a NAHRADIT: „Jak velká část ledovce je pod hladinou?" → „asi devět desetin" (17) / „asi jedna desetina" (18) / „přesně polovina" (15). Vysvětlení: „Led má 916 kg/m³, voda 1 000 kg/m³ — pod hladinou je asi 9/10 objemu."

3. (c) odvozené vzorce a příklady výkladu bez otázky | „Pro zvídavé: počítáme" (2 m³ → 20 000 N; 30 000 N → 3 m³; 45 000 N a 3 m³ → 1 500 kg/m³) a odvozené vzorce V = Fvz : (ρ · g), ρ = Fvz : (V · g) ze ZAPIS | Žádná z těchto tří úloh není v kvízu.
   NÁVRH: otázku 2 (nevěrohodné distraktory, viz nález 8) ŠKRTNOUT a NAHRADIT: „Na těleso ve vodě působí vztlak 30 000 N. Jaký je objem ponořené části?" → „3 m³" (4) / „30 m³" (5) / „300 m³" (6). Vysvětlení: „V = Fvz : (ρ · g) = 30 000 : 10 000 = 3 m³."

4. (a) čísla mimo výklad + desetinné zadání | otázka 18 „Těleso o objemu 0,001 m³ je celé pod vodou (ρ = 1000). Vztlak?" | Ani 0,001 m³, ani 10 N ve výkladu nejsou; výklad počítá s 2 m³ → 20 000 N. Pravidlo žádá čísla ze správné odpovědi ve výkladu a celá čísla.
   NÁVRH: „Ponořená část kvádru má objem 2 m³, voda 1 000 kg/m³. Jaká je vztlaková síla?" → „20 000 N" (8) / „2 000 N" (7) / „200 N" (6). Vysvětlení: „Fvz = V · ρ · g = 2 · 1 000 · 10 = 20 000 N."

5. (a) tvrzení bez opory ve výkladu | otázka 20 „Kdo podle legendy objevil zákon o nadlehčování ve vaně?" a vysvětlení „Archimédes ze Syrakus — zvolal prý ‚Heuréka!'" | Vana, Heuréka ani Syrakusy ve výkladu nejsou.
   NÁVRH: „Kdo zákon o nadlehčování popsal?" → „Archimédés" (10) / „Isaac Newton" (12) / „Blaise Pascal" (13). Vysvětlení: „Archimédés (287–212 př. n. l.), učenec ze starověkého Řecka."

6. (a) číslo jinak než ve výkladu | otázka 13, vysvětlení „Led (~900 kg/m³)" | Výklad uvádí 916 kg/m³.
   NÁVRH: vysvětlení: „Led má asi 916 kg/m³, voda 1 000 kg/m³ — proto plove."

7. (a) pojem jinak než ve výkladu | otázka 4, vysvětlení „…krát tíhové zrychlení g" | Výklad i ZAPIS znají jen „gravitační konstanta g = 10 N/kg"; „tíhové zrychlení" je pojem navíc a pro 7. ročník matoucí.
   NÁVRH: vysvětlení: „Objem ponořené části krát hustota kapaliny krát gravitační konstanta g = 10 N/kg."

8. (DROBNÉ) nevěrohodné distraktory | otázka 2 „Jaká je značka vztlakové síly? → Fvz | Fg1 | Ft2" | Značky „Fg1" a „Ft2" neexistují, odpověď je tím prozrazena. Řeší návrh v nálezu 3 (otázka nahrazena).

---

## fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/telesa-stejnoroda-a-nestejnoroda — VERDIKT: NESLADĚNO (8)

Výpočty přepočítány a souhlasí: 8 000 : 1 000 = 8 (15), 1 000 : 1 = 1 000 (21). V bloku není jediný výpočet průměrné hustoty.

1. (c) vzorec a oba příklady výkladu bez otázky | h3 „Pro zvídavé: počítáme" (ρp = m : V; 4 000 : 5 = 800 kg/m³ plove; 6 000 : 5 = 1 200 kg/m³ se potápí) a pole ZAPIS „ρp = m : V (z celého tělesa)" | Blok nemá otázku na vzorec ani jediný číselný příklad; zato pojem „stejnorodé" zkouší pětkrát (1, 2, 3, 11, 19).
   NÁVRH: otázku 19 (duplicitní s otázkou 3) ŠKRTNOUT a NAHRADIT: „Podle jakého vzorce počítáme průměrnou hustotu?" → „ρp = m : V" (10) / „ρp = m · V" (10) / „ρp = V : m" (10). Vysvětlení: „Průměrná hustota = hmotnost celého tělesa děleno objem celého tělesa."
   Otázku 11 (duplicitní s otázkou 3) ŠKRTNOUT a NAHRADIT: „Duté ocelové těleso má hmotnost 4 000 kg a objem 5 m³. Jaká je jeho průměrná hustota?" → „800 kg/m³" (10) / „80 kg/m³" (9) / „8 000 kg/m³" (12). Vysvětlení: „ρp = m : V = 4 000 : 5 = 800 kg/m³ — méně než voda, těleso plove."

2. (c) nosná část výkladu + bod ZAPIS bez otázky | h3 „Pokus s plastelínou" (bod ZAPIS „plastelína: kulička klesne, lodička plove") | Bez otázky.
   NÁVRH: otázku 18 (duplicitní s otázkou 9) ŠKRTNOUT a NAHRADIT: „Proč lodička z plastelíny plove, i když kulička klesne?" → „má větší objem a menší hustotu" (30) / „plastelína ve vodě zlehkne" (27) / „lodička je z jiné plastelíny" (29). Vysvětlení: „Hmotnost je stejná, ale lodička má uvnitř vzduch — průměrná hustota klesne pod hustotu vody."

3. (c) celý h3 + tři body ZAPIS bez otázky | h3 „Proč se ponorka potápí, vynořuje a vznáší" (body ZAPIS „ponorka klesá/stoupá/vznáší") | Ani jedna otázka; zato „ocelová loď a vzduch v dutině" je v bloku čtyřikrát (10, 13, 17, 20).
   NÁVRH: otázku 13 ŠKRTNOUT a NAHRADIT: „Co udělá ponorka, když napustí do nádrží vodu?" → „klesá ke dnu" (12) / „stoupá k hladině" (16) / „zůstane na místě" (17). Vysvětlení: „Voda v balastních nádržích zvýší hmotnost i průměrnou hustotu — ponorka klesá."
   Otázku 17 ŠKRTNOUT a NAHRADIT: „Kdy se ponorka vznáší?" → „má vodu i vzduch v nádržích" (26) / „má nádrže plné jen vody" (23) / „má nádrže plné jen vzduchu" (26). Vysvětlení: „Vztlaková a tíhová síla jsou pak stejně velké — ponorka neklesá ani nestoupá."

4. (c) nosná část výkladu + bod ZAPIS bez otázky | h3 „Proč potápěče nadnáší vesta" (kompenzátor vztlaku, závaží) | Bez otázky.
   NÁVRH: otázku 20 (duplicitní s otázkou 8) ŠKRTNOUT a NAHRADIT: „Proč potápěč napustí do vesty vzduch?" → „zvětší objem a sníží hustotu" (28) / „zvětší hmotnost a klesne" (24) / „zahřeje se mu tím tělo" (23). Vysvětlení: „Objem vesty se zvětší, hmotnost skoro ne — průměrná hustota klesne a potápěč stoupá."

5. (d) duplicita | otázky 3, 11 a 19 (ocelový hřebík / skleněná kulička jako stejnorodé těleso) | Tři otázky na jeden fakt; řeší návrhy v nálezu 1.

6. (d) únik odpovědi do jiné otázky | otázka 3 „Který příklad je stejnorodé těleso? → ocelový hřebík | tužka | železobetonový panel" | Distraktory jsou doslova správné odpovědi otázek 5 (tužka) a 12 (železobetonový panel) — žák si je z jedné otázky přečte do druhé.
   NÁVRH: odpovědi otázky 3 změnit na „ocelový hřebík" (14) / „betonová zeď s výztuží" (23) / „dřevěná tyč s hřebíky" (22). Vysvětlení beze změny.

7. (d) duplicita | otázky 9 „Podle čeho se řídí, zda těleso plove?" a 18 „Co znamená, že průměrná hustota je menší než hustota vody?" | Tentýž fakt; řeší návrh v nálezu 2.

8. (d) duplicita | otázky 10, 13, 17 a 20 (ocelová loď / vzduch v dutině čtyřikrát) | Řeší návrhy v nálezech 3 a 4; po nich zůstanou 10 a 17 jako jediné dvě (17 nahrazeno, tedy 10 a nová otázka o vzduchu zůstávají odlišné).

---

## ⚠️ ze `zkontroluj.mjs` (doslovně, celý web — k těmto 9 klíčům se NEVÁŽE ani jedno)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 565 otázek (20 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 179 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
ℹ️  laťku lze utáhnout příkazem: npm run prijmi-latku (brána sama nic nepřepisuje)
✅ Vše zapojené správně.
```

Poznámka ke kotvám: brána hlásí „0 duplicit, 0 úniků odpovědí", přesto jsou výše doloženy
duplicitní páry (kladka 7/20, pascalův zákon 9/21, tělesa stejnorodá 3/11/19) i únik
(tělesa stejnorodá, otázka 3 → 5 a 12) a cross-blokové překrytí páky 16–18 × kladka 1–3.
`uniky.mjs` porovnává jen uvnitř bloku a podle znění, ne podle faktu — tyhle vady neuvidí.
Z 34 otázek s náskokem ≥ 10 znaků v těchto 9 blocích připadá 9 na `hydrostaticky-tlak`
a 7 na `kladka`; celoweboví 179 je tedy z velké části zde.

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 9 bloků opraveno podle nálezů výše, každý ověřen `node testy/vypis-kviz.mjs <klic> --otazky` = 21 otázek:

- pusobeni-teles-a-deformace: zapracováno 6/6 (dva způsoby působení síly nahradily „tři účinky"
  mimo výklad; pružná/trvalá deformace zkrácena na délku; duplicitní otázky 15 a 17 nahrazeny
  těžištěm a dělením pohybových účinků; „více účinků najednou" nahrazeno reciprocitou
  kladivo–hřebík).
- jednoduche-stroje-paky: zapracováno 9/9 (rameno síly, moment síly a jednotka N·m sladěny
  s výkladem bez vzorce/jednotky navíc; osa dvojzvratné páky doplněna; otázky 16–18 —
  látka kladky — nahrazeny osou jednozvratné páky, důvodem názvu „dvojzvratná" a svalem na
  paži; momentový klíč a točivý moment nahrazeny rovnoramennými váhami a poměrem síly/ramene;
  těžiště nahrazeno houpačkou; dvojzvratná/jednozvratná páka dostaly příklady podle výkladu).
- kladka: zapracováno 10/10 (duplicity 7/20 a 3/9/21 rozpuštěny náhradou za využití
  kladkostrojů a důvod pohodlnosti pevné kladky; „na kolika částech lana visí břemeno u pevné
  kladky" — bez opory ve výkladu — nahrazeno volnou kladkou; 6× délková nápověda).
- naklonena-rovina: zapracováno 4/4 (3× délková nápověda; nadbytek úloh na F=G·h:l — otázky 11
  a 21 nahrazeny šroubem/hřebíkem a významem písmene l ve vzorci).
- tlak: zapracováno 7/7 (vzorec S=F:p a velbloud doplněny místo duplicitní/okrajové otázky;
  atmosférický tlak mimo výklad odstraněn z vysvětlení; 3× délková nápověda; příklad s krabicí
  přepsán na celá čísla — 2 m² místo 0,5 m²).
- pascaluv-zakon: zapracováno 9/9 (zubařské křeslo přepočítáno na poměr ploch 400:5=80krát
  místo desetinného tlaku 40 000 Pa mimo výklad; duplicitní otázka o 10× větší ploše nahrazena
  definicí pístu; „páka na sílu" nahrazena výpočtem hmotnosti 160 kg; 4× délková nápověda;
  vysvětlení u oleje zkráceno na to, co výklad skutečně říká). Otázka 20 (převod cm²→m², bez
  opory v tomto výkladu) nedostala převod jednotek do výkladu (mimo rozsah zadání) — místo
  toho nahrazena dopočtem hmotnosti pacienta (30 kg + 160 kg → 130 kg) z „Pro zvídavé" výkladu,
  aby nekolidovala s opravenou otázkou 12; zdokumentováno zde.
- hydrostaticky-tlak: zapracováno 12/12 (pojem „hydrostatický paradox" mimo výklad nahrazen
  popisnou otázkou o síle na dno; zdvojený přímý výpočet — otázka 18 — nahrazena obráceným
  výpočtem hloubky z tlaku; atmosférická zmínka odstraněna z vysvětlení; 8× délková nápověda).
- archimeduv-zakon: zapracováno 8/8 (nevěrohodné distraktory Fvz/Fg1/Ft2 nahrazeny výpočtem
  objemu z výkladové „Pro zvídavé" úlohy; duplicitní otázka 7 nahrazena příčinou vzniku
  vztlaku; ledovec 9/10 pod hladinou nahradil duplicitní „kdy těleso plove"; číslo tělesa
  0,001 m³ mimo výklad nahrazeno příkladem 2 m³ → 20 000 N; vána/Heuréka nahrazeny přímou
  otázkou na autora zákona; hustota ledu opravena na 916 kg/m³; „tíhové zrychlení" nahrazeno
  „gravitační konstantou g" podle výkladu).
- telesa-stejnoroda-a-nestejnoroda: zapracováno 8/8 (vzorec ρp=m:V a příklad duté ocelové
  těleso 4000 kg/5 m³ doplněny místo duplicitních otázek; pokus s plastelínou doplněn; ponorka
  (klesání/vznášení) doplněna dvěma otázkami místo duplicitní lodi; potápěčská vesta doplněna;
  únik odpovědi v otázce 3 (distraktory „tužka"/„železobetonový panel" byly správné odpovědi
  jiných otázek) opraven na neutrální distraktory).

Druhé kolo `node testy/uniky.mjs` po prvním zapracování odhalilo 10 nových úniků (fráze ve
vysvětlení jedné nové/upravené otázky prozrazovala odpověď jiné — např. „160 kg", „uprostřed
tyče", „na kraji tyče", „menší síla, delší dráha", „průměrnou hustotu" 2×) — opraveno
přeformulováním vysvětlení beze změny věcného obsahu, beze změny odpovědí.

Brány: `node testy/uniky.mjs` → 0 duplicit, 0 úniků (150 bloků/2740 otázek). `node zkontroluj.mjs`
→ 0 nálezů u těchto 9 klíčů (✅ Vše zapojené správně; zbylá 4 varování jsou stará, netýkají se
jich; náskok ≥10 znaků klesl celoweboví ze 179 na 106, z čehož většina patřila právě těmto
blokům). `npm run build` → 481 stránek OK.

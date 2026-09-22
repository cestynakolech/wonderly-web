# Sladění kvízů s přestavěnými výklady — F7, celky „Pohyb a rychlost" a „Síly kolem nás"
Nezávislá kontrola 22. 9. 2026. Všech 9 bloků má 21 otázek. Všechny výpočty v kvízech přepočítány
(`node -e`) — aritmeticky sedí; vady jsou v NESOULADU S VÝKLADEM, v látce mimo výklad a v délkové
nápovědě. Měřidla `testy/cisla-ve-vykladu.mjs` i `testy/uniky.mjs` hlásí u těchto bloků 0 —
první z nich totiž přeskakuje otázky, které mají číslo v ZADÁNÍ (řádek „if (vZadani.length) continue"),
takže rozdíly typu „výklad 231 km / kvíz 220 km" neumí vidět. Nálezy níže jsou tedy strojově neodhalené.

## fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa — VERDIKT: NESLADĚNO (3)

NÁLEZY:
1. (d) únik + délka | otázka 20 „Může být těleso zároveň v klidu i…" | vysvětlení („cestující ve vlaku je
   klidný vzhledem k sedadlu, ale pohybuje se vzhledem k nádraží") prozrazuje odpovědi otázek 3 a 4;
   navíc náskok 17 znaků (31/9/14).
   NÁVRH: „Může být těleso zároveň v klidu i v pohybu?" / „ano — podle zvoleného tělesa" (28) /
   „ne, to nejde v žádném případě" (29) / „jen ve vesmíru mimo planety" (27).
   Vysvětlení: „Záleží, ke kterému tělesu polohu vztahujeme."
2. (d) délková nápověda | otázka 5 „Říkáme, že klid a pohyb jsou…" | náskok 11 znaků (40/29/7).
   NÁVRH: „Říkáme, že klid a pohyb jsou…" / „relativní — záleží na porovnání" (31) /
   „absolutní — platí vždy stejně" (29) / „náhodné a nedají se určit" (25).
   Vysvětlení: „Vždy musíme říct, k čemu polohu vztahujeme."
3. (d) délková nápověda | otázka 6 „Co je trajektorie?" | náskok 14 znaků (33/19/17).
   NÁVRH: „Co je trajektorie?" / „čára, po které se těleso pohybuje" (33) /
   „délka cesty, kterou těleso urazilo" (34) / „doba, po kterou pohyb tělesa trvá" (33).
   Vysvětlení: „Trajektorie je čára pohybu — stopa lyžaře ve sněhu."

Pokrytí výkladu je jinak úplné (relativita, trasa, přímočarý/křivočarý, dráha s v metrech).

## fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb — VERDIKT: NESLADĚNO (5)

NÁLEZY:
1. (a) ROZPOR S VÝKLADEM | otázka 15 „Z čeho je složen pohyb planety Země?" | správná odpověď tvrdí
   „ze dvou otáčivých pohybů — kolem osy a kolem Slunce", jenže výklad i ZAPIS říkají opak:
   „složený pohyb = posuvný + otáčivý" a Zemi uvádějí právě jako příklad složeného pohybu.
   (Fyzikálně má pravdu výklad: oběh kolem Slunce je křivočarý pohyb posuvný, Země si přitom
   udržuje směr osy.) Vysvětlení otázky 14 tuto chybu ještě rozšiřuje („nebo více otáčivých").
   NÁVRH: „Z čeho je složen pohyb planety Země?" / „z posuvného a otáčivého pohybu" (30) /
   „jen z otáčivého pohybu kolem osy" (32) / „jen z posuvného pohybu vpřed" (28).
   Vysvětlení: „Země se otáčí kolem osy a zároveň obíhá kolem Slunce — to je složený pohyb."
   Zároveň v otázce 14 vypustit z vysvětlení „(nebo více otáčivých)".
2. (d) délková nápověda | otázka 3 „Jaké trajektorie mají body tělesa při…" | náskok 14 (27/11/13).
   NÁVRH: odpovědi „stejný tvar i stejnou délku" (27) / „různé tvary a různé délky" (25) /
   „vždy kružnice kolem osy" (23).
3. (d) délková nápověda | otázka 7 „Jak se pohybují body tělesa při otáčivém…" | náskok 10 (31/21/11).
   NÁVRH: „po kružnicích kolem osy otáčení" (31) / „po přímkách stejným směrem" (26) /
   „všechny naprosto stejně rychle" (30).
4. (d) délková nápověda | otázka 9 „Který bod tělesa se při otáčení pohybuje…" | náskok 10 (25/15/14).
   NÁVRH: „bod nejdál od osy otáčení" (25) / „bod ležící přímo na ose" (23) /
   „všechny body stejně rychle" (26).
5. (d) duplicitní pár | otázky 9 a 10 „Konec hodinové ručičky se oproti jejímu…" | obě zkoušejí týž fakt
   a vysvětlení otázky 9 prozradí odpověď otázky 10.
   NÁVRH: vysvětlení otázky 9 zkrátit na „Větší kružnice za stejný čas znamená větší rychlost."
   (bez hodinové ručičky); znění otázky 10 ponechat.

## fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas — VERDIKT: NESLADĚNO (8)

NÁLEZY:
1. (b) látka mimo výklad | otázka 9 „Kolik m/s je 1 km/s?" | jednotka km/s se ve výkladu nikde
   nevyskytuje; žák, který se učil ze stránky, ji nemá odkud vzít.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Kolik m/s je 72 km/h?" / „20 m/s" / „200 m/s" / „26 m/s".
   Vysvětlení: „72 : 3,6 = 20 m/s — přesně tenhle příklad je ve výkladu."
2. (b) látka mimo výklad | otázka 10 „Rychlost 2 m/s je kolik metrů za minutu?" | jednotka m/min ani
   převod na minuty ve výkladu nejsou (výklad učí jen převod m/s ↔ km/h číslem 3,6).
   NÁVRH ŠKRTNOUT a NAHRADIT: „Autobus ujel 60 km za 90 minut. Jaká byla jeho průměrná rychlost?" /
   „40 km/h" / „90 km/h" / „30 km/h". Vysvětlení: „90 min = 1,5 h; v = 60 : 1,5 = 40 km/h."
   (Tenhle výpočet je ve výkladu v oddíle „Pro zvídavé" a dnes na něj není ani jedna otázka — viz nález 7.)
3. (b) látka mimo výklad | otázka 13 „Čím se měří rychlost větru?" | anemometr ani vítr ve výkladu nejsou,
   navíc náskok 21 znaků (31/10/10).
   NÁVRH ŠKRTNOUT a NAHRADIT: „Jaké značky mají dráha a čas ve vzorci v = s : t?" /
   „dráha s, čas t" / „dráha d, čas c" / „dráha t, čas s". Vysvětlení: „Dráha je s, čas t, rychlost v."
4. (b) látka mimo výklad | otázka 21 „Jaké zařízení zaznamenává průběh rychlosti…" | tachograf ve výkladu
   není (výklad zná jen tachometr a radar).
   NÁVRH ŠKRTNOUT a NAHRADIT: „Cyklista jede rychlostí 20 m/s. Kolik je to km/h?" /
   „72 km/h" / „56 km/h" / „200 km/h". Vysvětlení: „20 · 3,6 = 72 km/h."
5. (b) látka mimo výklad | otázka 18 „Jak vypadá graf rychlosti rovnoměrného…" | výklad tohoto podtématu
   mluví jen o grafu DRÁHY a času („graf je přímka"); graf rychlosti je až ve vedlejším podtématu.
   NÁVRH: „Jak vypadá graf rovnoměrného pohybu (dráha na čase)?" / „je to přímka" (11) /
   „je to křivka" (11) / „je to kružnice" (13). Vysvětlení: „Rychlost se nemění, proto přímka."
6. (a) tvrzení nad rámec výkladu | otázka 3 „Jaká je základní jednotka rychlosti?" | výklad neříká,
   že m/s je „základní" a km/h „odvozená" — uvádí obě rovnocenně jako nejčastější.
   NÁVRH: „V jakých jednotkách se rychlost udává nejčastěji?" / „m/s nebo km/h" (13) /
   „jen metry (m)" (13) / „newtony (N)" (11). Vysvětlení: „Metry za sekundu u běžce, km/h na rychloměru."
7. (c) nosná část výkladu bez otázky | oddíl „Pro zvídavé: počítáme" (72 km/h = 20 m/s, 20 m/s = 72 km/h,
   60 km za 90 min = 40 km/h) nemá ani jednu otázku.
   NÁVRH: pokryto nálezy 1, 2 a 4 — po jejich provedení jsou všechny tři příklady v kvízu, počet zůstane 21.
8. (d) úniky a délka | otázky 1, 6, 8, 11, 14, 15 | vysvětlení otázky 6 prozradí odpověď otázky 8
   („hodina má 3600 s"), vysvětlení otázky 11 prozradí otázku 12 („ukazuje ji tachometr"), vysvětlení
   otázky 14 prozradí otázku 15 („eskalátor"), vysvětlení otázky 15 prozradí otázky 16 a 17
   („rozjíždění je zrychlený a brždění zpomalený"); otázka 1 má náskok 24 znaků a otázka 8 náskok 34
   znaků s nevěrohodnými distraktory („protože je to zakázané", „smí se to").
   NÁVRH: vysvětlení zkrátit na „1 m/s = 3,6 km/h." (6), „Tachometr ukazuje, jak rychle jedeš teď." →
   přesunout zmínku o tachometru jen k otázce 12, „Stálá rychlost = rovnoměrný pohyb." (14),
   „Rychlost se nemění." (15). Otázka 1: „Co vyjadřuje rychlost?" / „dráhu uraženou za jednotku času" (30) /
   „délku celé cesty tam i zpět" (27) / „hmotnost tělesa při pohybu" (26). Otázka 8:
   „Proč se při převodu m/s ↔ km/h neposouvá jen čárka?" / „hodina nemá 1 000 sekund" (24) /
   „desetinná čárka to neumí" (24) / „kilometr nemá 100 metrů" (23).

## fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti — VERDIKT: NESLADĚNO (6)

NÁLEZY:
1. (a) čísla jinak než ve výkladu | otázka 12 „Cyklista urazil etapu 220 km za 5 h 30…" | výklad počítá
   TENTÝŽ příklad s 231 km (231 : 5,5 = 42 km/h), kvíz má 220 km → 40 km/h. Výsledek 42 km/h je ve
   výkladu dvakrát (příklad 8 i „Procvič si"), v kvízu není nikde.
   NÁVRH: „Cyklista urazil etapu 231 km za 5 h 30 min. Rychlost?" / „42 km/h" / „44 km/h" / „35 km/h".
   Vysvětlení: „5 h 30 min = 5,5 h; v = 231 : 5,5 = 42 km/h."
2. (a) čísla jinak než ve výkladu | otázka 14 „Letadlo uletělo 650 km za 1 h 18 min…" | výklad má 585 km
   → 450 km/h a jmenovitě varuje před chybou 585 : 0,3 = 1 950 km/h; kvíz má 650 km → 500 km/h
   a mlhavé „přes 2 000 km/h".
   NÁVRH: „Letadlo uletělo 585 km za 1 h 18 min. Průměrná rychlost?" / „450 km/h" / „1 950 km/h" /
   „585 km/h". Vysvětlení: „1 h 18 min = 1,3 h; v = 585 : 1,3 = 450 km/h."
3. (d) únik v ZADÁNÍ | otázka 11 „Turisté ušli 3 km za 36 minut (0,6 h)…" | závorka prozrazuje odpověď
   otázky 10 („Kolik hodin je 36 minut? 0,6 h"). Totéž otázka 14: „(1,3 h)" prozrazuje otázku 13.
   NÁVRH: ze zadání obou otázek závorky vypustit — „Turisté ušli 3 km za 36 minut. Rychlost?"
   a „Letadlo uletělo 585 km za 1 h 18 min. Průměrná rychlost?" (odpovědi beze změny, resp. dle nálezu 2).
4. (d) únik ve vysvětlení | otázka 9 „Turista ušel 6 km za 120 minut. Rychlost…" | vysvětlení „120 min = 2 h"
   je doslovná odpověď otázky 8.
   NÁVRH: vysvětlení zkrátit na „v = 6 : 2 = 3 km/h."
5. (c) nosná část výkladu bez otázky | bod návodu „na obě osy vyznač stejně velké dílky" nemá otázku,
   zatímco otázka 20 („Tomáš urazí za 2 minuty 600 m…") zkouší přímou úměrnost, kterou výklad nezavádí.
   NÁVRH ŠKRTNOUT otázku 20 a NAHRADIT: „Jak musí být na osách grafu vyznačené dílky?" /
   „stejně velké" (12) / „různě velké" (12) / „na velikosti nezáleží" (21).
   Vysvětlení: „Nestejné dílky by graf pokřivily."
6. (d) délková nápověda | otázky 18 (náskok 8: 24/16/16) a 21 (náskok 13: 25/9/12).
   NÁVRH otázka 18: „přímka stoupající vzhůru" (24) / „vodorovná přímka nahoře" (23) /
   „klesající přímka dolů" (21). Otázka 21: „značky veličin a jednotky" (25) /
   „jen barvy jednotlivých os" (25) / „jméno autora a datum" (21).

## fyzika/7-rocnik/sily-kolem-nas/sila — VERDIKT: NESLADĚNO (7)

NÁLEZY:
1. (b) látka mimo výklad — ZÁVAŽNÉ | otázky 17, 18, 19 „Jaké jsou deformační účinky síly?",
   „Stlačená pružina je příklad deformace…", „Vymodelovaná modelína je příklad deformace…" |
   přestavěný výklad o deformaci NEMLUVÍ vůbec (zná jen posuvný a otáčivý účinek); deformace patří
   do podtématu „Působení těles a deformace" (celek Jednoduché stroje).
   NÁVRH ŠKRTNOUT tři otázky a NAHRADIT třemi z výkladu (počet zůstane 21):
   a) „Kolik newtonů má 1 kN?" / „1 000 N" / „100 N" / „10 000 N" — „1 kN = 1 000 N."
   b) „Sílu 1 kN kreslíme šipkou 5 cm. Kolika N odpovídá 1 cm?" / „200 N" / „500 N" / „50 N" —
      „1 000 : 5 = 200 N na centimetr."
   c) „Která síla působí na těleso tažené po podložce?" / „třecí" / „magnetická" / „vztlaková" —
      „Tření brání tažení tělesa po podložce."
2. (b) látka mimo výklad | otázka 21 „Míč ležící na lavičce je příklad účinku…" | pojmy statický
   a dynamický účinek síly ve výkladu nejsou.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Jak se říká veličině, která má velikost i směr?" / „vektor" /
   „skalár" / „jednotka". Vysvětlení: „Proto sílu kreslíme jako šipku."
3. (a) tvrzení nad rámec výkladu + délka | otázka 16 „Jaké mohou být pohybové účinky síly?" | výklad
   uvádí pouze „síla může s tělesem pohnout, nebo jím otočit"; správná odpověď má náskok 41 znaků
   (54/13/5) a rovnou vyjmenovává čtyři účinky.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Gravitační síla je tím větší, čím je těleso…" / „větší" / „menší" /
   „barevnější". Vysvětlení: „Čím větší těleso, tím větší gravitační síla."
4. (a) čísla mimo výklad | otázka 10 „Kreslíme sílu 400 N v měřítku 1 cm ~ 100 N…" | výklad pracuje
   s měřítky 1 cm = 1 N a 1 cm = 200 N; hodnoty 400 N ani 100 N/cm v něm nejsou.
   NÁVRH: „Kreslíme sílu 800 N v měřítku 1 cm = 200 N. Jak dlouhá bude šipka?" / „4 cm" / „8 cm" /
   „2 cm". Vysvětlení: „800 : 200 = 4 cm — přesně jako F₂ ve výkladu."
5. (d) únik ve vysvětlení | otázka 7 „Čím znázorňujeme sílu v obrázku?" | vysvětlení „Šipka: začátek =
   působiště, směr šipky = směr síly, délka = velikost" prozradí odpovědi otázek 8 i 9.
   NÁVRH: vysvětlení zkrátit na „Sílu kreslíme jako šipku."
6. (d) délková nápověda | otázky 8 (17), 9 (12), 13 (28), 20 (19).
   NÁVRH otázka 8: „bod, kde síla na těleso působí" (29) / „nejtěžší bod celého tělesa" (26) /
   „konec nakreslené šipky" (22). Otázka 9: „velikost síly v měřítku" (23) / „směr působící síly" (21) /
   „hmotnost celého tělesa" (22). Otázka 13: „ano, působení je vzájemné" (25) /
   „ne, působí jen jedno těleso" (27) / „jen u magnetů a železa" (22). Otázka 20:
   „podle působiště a směru síly" (28) / „podle barvy a tvaru tělesa" (26) / „podle teploty tělesa" (21).
7. (b) pojem mimo výklad | otázka 14 „Který je příklad působení na dálku?" | výraz „působení na dálku"
   ani silové pole výklad nezavádí (uvádí jen příklad magnet–hřebík).
   NÁVRH: „Která síla přitahuje železné předměty?" / „magnetická" / „třecí" / „tlaková".
   Vysvětlení: „Magnet přitahuje železo magnetickou silou."

## fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila — VERDIKT: NESLADĚNO (6)

NÁLEZY:
1. (b) látka mimo výklad + obří náskok — ZÁVAŽNÉ | otázka 16 „Jak vzniká tíhová síla?" | správná odpověď
   „společným působením gravitační síly a odstředivé síly rotace Země" má náskok 46 znaků (65/19/16)
   a odstředivá síla ve výkladu vůbec není (výklad mluví jen o „drobném vlivu otáčení Země"); pro
   7. ročník je to navíc látka nad rámec.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Jak se změní hmotnost tělesa, když ho přeneseme na Měsíc?" /
   „nezmění se" (10) / „bude 6× menší" (13) / „bude 6× větší" (13).
   Vysvětlení: „Hmotnost je všude stejná, mění se jen tíha." (pokrývá bod ZAPIS, viz nález 4)
2. (b) látka mimo výklad | otázka 18 „Co je stav beztíže?" | stav beztíže ani volný pád ve výkladu nejsou
   a vysvětlení navíc odkazuje na rovnováhu sil z jiného podtématu.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Těleso má hmotnost 40 kg. Jakou silou ho Země přitahuje?" / „400 N" /
   „40 N" / „4 000 N". Vysvětlení: „Fg = 40 · 10 = 400 N." (příklad je ve výkladu v „Procvič si")
3. (b) látka jiného podtématu | otázka 21 „V jednom bodě tělesa působí tíhová síla…" | těžiště v tomto
   výkladu není — je to nosný pojem podtématu Těžiště, takže otázka zároveň prozrazuje látku sousedního bloku.
   NÁVRH ŠKRTNOUT a NAHRADIT: „Těleso je přitahováno silou 7 kN. Jaká je jeho hmotnost?" / „700 kg" /
   „70 kg" / „7 000 kg". Vysvětlení: „m = 7 000 : 10 = 700 kg." (příklad je ve výkladu)
4. (a) čísla mimo výklad | otázka 14 „Těleso je přitahováno silou 8 kN. Jaká je…" | výklad počítá
   12 kN → 1 200 kg a 7 kN → 700 kg; hodnota 8 kN v něm není.
   NÁVRH: „Těleso je přitahováno silou 12 kN. Jaká je jeho hmotnost?" / „1 200 kg" / „120 kg" /
   „12 000 kg". Vysvětlení: „m = Fg : g = 12 000 : 10 = 1 200 kg."
5. (d) únik ve vysvětlení | otázka 7 „Jakou silou působí Země na těleso o hmotnosti…" | vysvětlení
   „to je gravitační konstanta g" spolu s odpovědí prozradí otázku 9 (g = 10 N/kg); totéž dělá
   vysvětlení otázky 17.
   NÁVRH: vysvětlení otázky 7 zkrátit na „Na každý kilogram působí asi 10 N."; u otázky 17
   „Rozdíl je na ZŠ zanedbatelný."
6. (d) délková nápověda | otázky 6 (19), 17 (23), 20 (24).
   NÁVRH otázka 6: „do středu Země, svisle dolů" (26) / „k severnímu pólu Země" (22) /
   „vodorovně podél povrchu" (23). Otázka 17: „stejně jako gravitační sílu" (26) /
   „úplně jiným vzorcem" (19) / „tíhovou sílu nepočítáme" (23). Otázka 20:
   „měří sílu, ukazují kilogramy" (28) / „měří objem tělesa" (17) / „počítají částice látky" (23).

Pozn.: nosný bod ZAPIS „hmotnost je všude stejná, tíha se mění" dnes otázku nemá — doplní ho nález 1.

## fyzika/7-rocnik/sily-kolem-nas/treci-sila — VERDIKT: NESLADĚNO (6)

NÁLEZY:
1. (a) čísla jinak než ve výkladu — ZÁVAŽNÉ | otázka 9 „Ocelové těleso 50 kg tlačíme po dřevě
   (f = 0,4)…" | výklad počítá TENTÝŽ příklad se součinitelem f = 0,35 a výsledkem 175 N;
   kvíz má f = 0,4 a 200 N. Ani 0,4, ani 200 N ve výkladu nejsou. (Oba výpočty jsou aritmeticky
   správné: 500 · 0,35 = 175, 500 · 0,4 = 200 — vadou je nesoulad se stránkou.)
   NÁVRH: „Ocelové těleso 50 kg tlačíme po dřevě (f = 0,35). Jaká je třecí síla?" / „175 N" /
   „500 N" / „1 750 N". Vysvětlení: „Fn = 50 · 10 = 500 N; Ft = 500 · 0,35 = 175 N."
2. (b) tvrzení mimo výklad | otázka 3 „Co je příčinou tření?" | „přitažlivé síly částic" výklad
   neuvádí (mluví jen o drobných nerovnostech povrchu).
   NÁVRH: „Co je příčinou tření?" / „drobné nerovnosti povrchů" (25) / „hmotnost tělesa na podložce" (27) /
   „barva a lesk obou povrchů" (25). Vysvětlení: „Žádný povrch není dokonale hladký."
3. (a) číslo bez opory ve vysvětlení | otázka 11 „Proč puk klouže po ledu líp než po betonu?" |
   vysvětlení tvrdí „Ocel na ledu má f ≈ 0,027", takové číslo ve výkladu není.
   NÁVRH: vysvětlení nahradit „Led je hladký, beton drsný — drsnější povrch znamená větší tření."
4. (d) únik ve vysvětlení | otázka 12 „Které tření je největší?" | vysvětlení „Klidové > smykové >
   valivé" prozradí odpověď otázky 13.
   NÁVRH: vysvětlení zkrátit na „Nejtěžší je těleso utrhnout z místa."
5. (c) nosná část výkladu bez otázky | bod ZAPIS „větší tření = těleso stojí, větší síla = pohyb"
   nemá otázku; naopak otázka 1 má nevěrohodné distraktory („jen tehdy, když je vše ponořené ve vodě").
   NÁVRH ŠKRTNOUT otázku 1 a NAHRADIT: „Co se stane, když je třecí síla větší než síla, kterou
   těleso tlačíme?" / „těleso zůstane v klidu" (22) / „těleso se hned rozjede" (22) /
   „těleso zrychlí" (14). Vysvětlení: „Tlačící síla musí tření nejdřív překonat."
6. (d) délková nápověda | otázky 14 (11), 15 (14), 16 (7), 19 (7).
   NÁVRH otázka 14: „když těleso ještě stojí" (23) / „při rychlé jízdě po dálnici" (26) /
   „jen na zledovatělém povrchu" (27). Otázka 15: „posouvání po povrchu" (20) / „valení tělesa po zemi" (21) /
   „let tělesa vzduchem" (19). Otázka 16: „mazáním a leštěním" (18) / „zdrsněním povrchu" (17) /
   „posypáním pískem" (16). Otázka 19: „při chůzi, brzdění a psaní" (25) /
   „tření nikdy užitečné není" (25) / „jen v zimě na sněhu" (19).

## fyzika/7-rocnik/sily-kolem-nas/skladani-sil — VERDIKT: NESLADĚNO (6)

NÁLEZY:
1. (b) látka mimo výklad | otázky 5 a 17 „K Adamovi (50 N) a Báře (40 N) se přidá…", „Síly 20 N, 30 N
   a 10 N působí stejným směrem…" | výklad skládá výhradně DVĚ síly; skládání tří sil v něm není
   (a otázka 5 má navíc náskok 19 znaků).
   NÁVRH ŠKRTNOUT obě a NAHRADIT dvěma z výkladu:
   a) „Dvě družstva táhnou lano každé silou 4 500 N proti sobě. Co se děje?" / „lano se nehýbe" (14) /
      „lano jede doleva" (16) / „lano jede doprava" (17) — „Stejně velké opačné síly dají výslednici 0 N."
   b) „Co může rovnováha sil s tělesem udělat?" / „deformovat ho" (13) / „rozpohybovat ho" (15) /
      „zrychlit ho" (11) — „Síly v rovnováze těleso nerozpohybují, ale mohou natáhnout pružinu."
      (tím se zároveň pokryje nosný bod ZAPIS „I v rovnováze se těleso může deformovat", který dnes
      otázku nemá)
2. (b) pořadí nadstavby | otázka 13 „Jakým pravidlem skládáme dvě různoběžné…" | jde o látku z oddílu
   „Pro zvídavé", ale stojí uprostřed bloku — nadstavba patří na konec.
   NÁVRH: otázku beze změny znění přesunout na pozici 21 (poslední).
3. (d) únik ve vysvětlení | otázka 7 „Kdy jsou dvě síly v rovnováze?" | vysvětlení „Rovnováha = stejné
   velikosti + opačné směry" je doslovná odpověď otázky 15; odpověď otázky 6 („0 N") navíc spolu
   s vysvětlením prozradí otázku 21.
   NÁVRH: vysvětlení otázky 7 zkrátit na „Účinky sil se pak navzájem ruší."; u otázky 6 vypustit
   slovo „rovnováha": „Stejně velké síly proti sobě se vyruší."
4. (d) duplicitní pár | otázky 1 a 16 „Co je výslednice sil?" / „Výslednice má vždy…" | obě zkoušejí
   tutéž definici a obě mají obří náskok (25 a 38 znaků).
   NÁVRH ŠKRTNOUT otázku 16 a NAHRADIT: „Kam míří výslednice dvou opačných sil?" /
   „jako ta větší síla" (18) / „jako ta menší síla" (18) / „vždycky doprava" (15).
   Vysvětlení: „Výslednice má směr větší z obou sil." Otázka 1 nově: „Co je výslednice sil?" /
   „síla se stejným účinkem jako ostatní" (36) / „vždy ta největší z působících sil" (33) /
   „síla, která těleso vždycky zastaví" (34).
5. (b) příklad mimo výklad | otázka 20 „Knize ležící na stole působí tíhová síla…" | reakce podložky
   (síla stolu vzhůru) ve výkladu není; výklad zná rovnováhu jen u přetahování a u svislého zavěšení.
   NÁVRH: „Závaží visí v klidu na provázku, tíhová síla je 5 N. Jakou silou táhne provázek?" /
   „5 N vzhůru" / „5 N dolů" / „0 N". Vysvětlení: „Klid znamená rovnováhu — provázek táhne stejně
   velkou silou nahoru." (příklad odpovídá otázce 15, kterou pak sloučit: viz nález 6)
6. (d) délková nápověda | otázky 10 (18), 12 (20), 15 (23).
   NÁVRH otázka 10: „lano jede doleva, 200 N" (24) / „lano zůstává na místě" (21) /
   „lano jede doprava, 200 N" (24). Otázka 12: „20 N směrem větší síly" (21) / „80 N směrem menší síly" (22) /
   „0 N, síly se vyruší" (19). Otázka 15: „stejně velká, ale opačná" (24) / „menší než tíhová síla" (22) /
   „kolmá na tíhovou sílu" (22).

## fyzika/7-rocnik/sily-kolem-nas/teziste — VERDIKT: NESLADĚNO (4)

NÁLEZY:
1. (c) nosná část výkladu bez otázky — ZÁVAŽNÉ | celý oddíl h3 „Rovnovážné polohy: stálá, vratká, volná"
   (tři samostatné body v ZAPIS) nemá ani jednu z 21 otázek, zatímco fakt „nízké těžiště = větší
   stabilita" zkoušejí hned otázky 12, 14, 15, 19 i 21.
   NÁVRH: ŠKRTNOUT otázky 10 a 14 (viz nálezy 2 a 3) a otázku 19 a NAHRADIT třemi:
   a) „Jak se chová těleso ve stálé rovnovážné poloze?" / „samo se vrátí zpět" (18) /
      „samo se převrátí" (16) / „zůstane vychýlené" (17) — „Po vychýlení se těžiště zvedne."
   b) „Co udělá těleso ve vratké poloze?" / „převrátí se" (11) / „vrátí se zpět" (13) /
      „zůstane stát" (12) — „Těžiště po vychýlení klesne, těleso se překlopí."
   c) „Které těleso je ve volné rovnovážné poloze?" / „valící se koule" (15) / „stojící kuželka" (15) /
      „visící obruč" (12) — „Těžiště zůstává pořád stejně vysoko."
2. (b) látka mimo výklad | otázka 10 „Kdy je těleso podepřené v rovnováze?" | výklad hledá těžiště
   ZAVĚŠENÍM na niti; podepření pod těžištěm v něm není.
   NÁVRH: ŠKRTNOUT a nahradit otázkou 1a z nálezu 1.
3. (b) příklad mimo výklad + vnitřní rozpor | otázka 14 „Proč mají dětské hrnečky těžké dno?" |
   hrneček ve výkladu není; navíc vysvětlení otázky 4 uvádí hrneček jako těleso s těžištěm MIMO
   materiál, což si s „těžkým dnem, které snižuje těžiště" odporuje.
   NÁVRH: ŠKRTNOUT a nahradit otázkou 1b z nálezu 1; ve vysvětlení otázky 4 nechat jen příklady
   z výkladu: „U obruče a podkovy leží těžiště v prázdném prostoru."
4. (a) jiný pojem než ve výkladu | otázka 9 „Kde je těžiště tělesa z více materiálů?" | výklad mluví
   o části, která je TĚŽŠÍ („tam, kde je nejvíc hmoty"); hustota se v 7. ročníku v tomto výkladu
   nezavádí.
   NÁVRH: „Kde leží těžiště tělesa z více materiálů?" / „blíž k těžší části" (18) /
   „vždycky přesně uprostřed" (24) / „v lehčí části" (13).
   Vysvětlení: „Těžiště se stěhuje tam, kde je víc hmoty."

---

## ⚠️ z `node zkontroluj.mjs` (doslovně, celý běh — žádné varování se netýká těchto 9 klíčů)

⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 565 otázek (20 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 179 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří

Závěr běhu: „✅ Vše zapojené správně."

## ZAPRACOVÁNO 22. 9. 2026

Všech 9 bloků opraveno podle nálezů výše, každý ověřen `node testy/vypis-kviz.mjs <klic> --otazky` = 21 otázek:

- klid-a-pohyb-telesa: zapracováno 3/3 (otázky 5, 6, 20 — délka + únik).
- posuvny-otacivy-pohyb: zapracováno 5/5 (Země = posuvný + otáčivý pohyb opraveno, odstraněno
  „nebo více otáčivých" z otázky 14, 3× délková nápověda, duplicitní pár 9/10 rozdělen).
- rychlost-draha-cas: zapracováno 8/8 (3 otázky mimo výklad nahrazeny výpočty z výkladu —
  72 km/h→20 m/s, 60 km/90 min→40 km/h, 20 m/s→72 km/h; graf přepsán na dráhu-čas;
  „základní jednotka" nahrazena; 6× únik/délka v otázkách 1, 6, 8, 11, 14, 15).
- priklady-na-vypocet-rychlosti: zapracováno 6/6 (cyklista 231 km→42 km/h, letadlo 585 km→
  450 km/h — obě čísla teď sedí na výkladu; závorky s prozrazenými hodinami odstraněny;
  otázka 20 nahrazena dílky grafu; 2× délková nápověda).
- sila: zapracováno 7/7 (3 otázky o deformaci mimo výklad nahrazeny kN/měřítkem/třecí silou;
  statický/dynamický účinek a „působení na dálku" nahrazeny vektorem a magnetickou silou;
  měřítko 400N/100N→800N/200N dle výkladu; 4× délka).
- gravitacni-sila: zapracováno 6/6 (odstředivá síla a stav beztíže — látka mimo výklad —
  nahrazeny Měsícem (6×) a příkladem 40 kg→400 N; těžiště přesunuto pryč (patří do sousedního
  bloku), nahrazeno 7 kN→700 kg; 8 kN→12 kN sladěno s výkladem; 3× délka).
- treci-sila: zapracováno 6/6 (f = 0,35→175 N sladěno s výkladem místo f=0,4→200 N; příčina
  tření zjednodušena na nerovnosti povrchu; číslo f≈0,027 bez opory odstraněno; otázka 1
  nahrazena bodem ZAPIS o síle a tření; 4× délka).
- skladani-sil: zapracováno 6/6 (skládání tří sil nahrazeno dvěma příklady z výkladu —
  přetahovaná 4 500 N a rovnováha/deformace pružiny; nadstavba o rovnoběžníku přesunuta na
  konec; duplicitní pár 1/16 sloučen; kniha na stole nahrazena zavěšeným závažím; 3× délka).
- teziste: zapracováno 4/4 (chybějící oddíl stálá/vratká/volná rovnovážná poloha doplněn
  3 otázkami místo podepření pod těžištěm, hrnečku a soutěžních aut; hustota nahrazena
  „těžší částí" dle výkladu).

Navíc při zapracování `node testy/uniky.mjs` odhalil 4 nové úniky, které nálezy nezachytily
(číslo/slovo z vysvětlení jedné otázky prozrazovalo odpověď jiné v témž bloku) — opraveno
zkrácením vysvětlení (Země/šroub, letadlo/hodiny, síla-působiště/posuvné účinky,
skladani-sil lano/0 N), beze změny věcného obsahu.

Brány: `node testy/uniky.mjs` → 0 duplicit, 0 úniků. `node zkontroluj.mjs` → 0 nálezů u těchto
9 klíčů (zbylá 4 varování jsou stará a netýkají se jich). `npm run build` → 481 stránek OK.

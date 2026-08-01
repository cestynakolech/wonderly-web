# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (1. 8. 2026, ráno — SAMOSTATNÁ PRÁCE)

**HOTOVO A NASAZENO (bod 1 a část bodu 2 noční fronty):**

1. **Popisky na mapách deníku — vyřešeno, ale příčina byla jinde, než říkala fronta.**
   Poznámka z noci tvrdila, že `CestyRok.astro` si popisky umísťuje vlastním kódem;
   **není to pravda** — používá `pripravPohledy()` → `rozmistiPopiskyPolozek()` stejně
   jako všechny mapy. Skutečná vada: **popisek domova („jižní Čechy") se kreslil napevno
   pod domeček ÚPLNĚ MIMO rozmisťovač**, takže ležel na cizím pinu v **sedmi letech z osmi**.
   Nově ho umísťuje týž kód; místo navíc zabírá i odznak počtu u shluku a domeček sám.
   Nouzová varianta už nebere prvního kandidáta naslepo, ale toho s nejmenším překryvem
   (přetečení výřezu váží 12×), přibyl prstenec pozic kolem značky a třetí velikost písma.
   Kotva: nové měřidlo `testy/mapa-popisky.mjs` — **182 pohledů, 0 nálezů**; podvrh jich
   najde 282. Běží **v bráně při každém buildu**. Ověřeno i okem (2021, 2022) a curlem.

   > **Past, do které jsem sám šlápl a stojí za zapamatování:** měřidlo nejdřív volalo
   > `pripravPohledy` BEZ domova, takže popisek domova vůbec neměřilo a hlásilo „0 nálezů" —
   > **falešná nula**. Kontrola musí volat funkci se STEJNÝMI argumenty jako stránka.
   > Druhá past: kroužek shluku je jen OBRYS, uvnitř jsou vidět tečky míst. Když se bral
   > jako plný kotouč, jméno nemělo kam jít a odlétlo 30 jednotek od své značky.

2. **Kvízy — dorovnáno pět nejhorších bloků, 59 % → 56 %** (67 otázek).
   `vnimani-barev` 14/16 → 0, `tepelna-vymena-a-teplo` 15/17 → 0, `kmitani-a-vlneni`
   12/14 → 0, `energeticka-hodnota-potravin` 10/12 → 0, `zaverecny-projekt` 9/10 → 0.
   Nezávislý kontrolor nenašel věcnou chybu; dvě drobnosti opraveny — výklad energetické
   hodnoty nově říká, že mozek využívá **elektrickou** energii (kvíz se na to ptal, na
   stránce to nebylo). **Rohatka se sama utáhla na 56 %.**
   Nové měřidlo **`testy/delky.mjs`** vypíše konkrétní otázky i rozdíl v znacích:
   `node testy/delky.mjs vnimani-barev`.

3. **Druhá dávka kvízů hotová — 56 % → 54 %** (dalších 49 otázek): `elektricke-pole`,
   `vznik-elektrickeho-proudu`, `magneticke-pole-vodice-a-civky`,
   `jaderny-reaktor-elektrarna`, `obnovitelne-a-neobnovitelne-zdroje` — všechny na nule.
   Kontrolor opět nenašel věcnou chybu, zato **tři vysvětlení prozrazovala odpověď na
   SOUSEDNÍ otázku** (Oersted, střídavý proud „máme ho v zásuvce", „jsou nevyčerpatelné")
   a jedna otázka prozrazovala odpověď svým vlastním zněním („Jak se **přitahují**
   nesouhlasně nabitá tělesa?"). Opraveno. **Tohle hledej v každé další dávce** —
   je to častější vada než špatná délka.

4. **Třetí dávka kvízů hotová — 54 % → 51 %.** `odraz-svetla` (17/21),
   `optika-rovinneho-zrcadla`, `spalovaci-motory`, `seznamy-a-promenne-v-projektech`,
   `bezpecnost-pocitace-a-dat` — všechny na nule. **Celkem 15 bloků, 59 % → 51 %.**
   Kontrolor našel tři drobnosti: výklad odrazu světla nevysvětloval **odrazku na kole**
   (kvíz se na ni ptal), vysvětlení u ransomwaru prozrazovalo pozdější otázku o záloze
   a otázka „K čemu je rozptyl světla **dobrý**?" prozrazovala odpověď svým zněním.
   Opraveno; výklad má nově odstavec o koutovém odražeči.

5. **Čtvrtá dávka kvízů — 51 % → 49 %. Celkem 20 bloků, 59 % → 49 %.**
   Dorovnáno `skupenstvi-latek`, `modely-a-schemata`, `vetveni-programu`.
   **DVA bloky se musely PŘEPSAT, ne dorovnat** — vznikly slepením dvou dávek:
   `microbit/propojeni-a-externi-zarizeni` měl **čtyři duplicitní páry z deseti**
   (dvakrát piny, dvakrát rádio, dvakrát měření času, dvakrát propojení) a
   `roboticka-stavebnice/projekt-muj-robot` **tři páry** — 6 otázek pokrývalo 3 fakta.
   Ten druhý jsem sám přehlédl, našel ho až kontrolor. **Před dorovnáváním bloku si
   proto vždycky nech vypsat VŠECHNY jeho otázky, ne jen ty s délkovou nápovědou.**

6. **Pátá dávka — 49 % → 47 %. Celkem 24 bloků, 59 % → 47 %.**
   `telesa-stejnoroda-a-nestejnoroda`, `casticove-slozeni-latek`, `teplotni-roztaznost`,
   `teplo-a-premeny-skupenstvi`. V částicovém složení byl další duplicitní pár (dvakrát
   šíření vůně difuzí) — vyměněn za difuzi v pevných látkách, která je ve výkladu, ale
   v kvízu chyběla. **Kontrolor: 0 nálezů** (přepočítal i kolejnici 3 mm).
   Nový nástroj **`node testy/vypis-kviz.mjs <blok>`** vypíše VŠECHNY otázky bloku —
   délkové měřidlo duplicity neukáže.

7. **Šestá dávka — 47 % → 44 %. Celkem 28 bloků, 59 % → 44 %.**
   `oko-vady-oka`, `jaderna-energie-a-reakce`, `kulova-zrcadla-dute-zrcadlo`, `teziste`.

   > **⚠️ NEJDŮLEŽITĚJŠÍ POUČENÍ CELÉHO DOROVNÁVÁNÍ (nález kontrolora 1. 8.):**
   > Přílišné zkracování správné odpovědi ji dokáže ZKAZIT. Dvakrát se to stalo:
   > „skutečný, převrácený, **zmenšený**" zkráceno na „skutečný a převrácený" —
   > jenže zmenšený je JEDINÝ znak, který ten případ odlišuje od předmětu mezi
   > r a f; a „**širší postoj**, nižší těžiště" zkráceno na „nižší těžiště",
   > čímž vypadla polovina odpovědi na otázku o brankáři.
   > **Krátit se smí jen vata, nikdy rozlišující znak. Když správná odpověď vyjde
   > nejdelší, PRODLUŽ DISTRAKTORY — nekrať ji.**

   Dále vyměněna otázka „Kdo má těžiště obvykle níž? → ženy" (mimo učivo, navíc
   stereotyp) za soutěžní auta z výkladu.

8. **Sedmá dávka — 44 % → 42 %. Celkem 32 bloků, 59 % → 42 %.**
   `archimeduv-zakon`, `telesa-a-latky`, `var`, `elektricke-obvody`.
   Kontrolor **potřetí** našel vadu ze zkracování: „mléko je látka, láhev **s mlékem**
   je těleso" zkráceno na „mléko látka, láhev těleso" — tím se posunul význam a odpověď
   si začala protiřečit s vlastním vysvětlením. Druhý nález: čtyři otázky Archimédova
   zákona (loď, ponorka, slaná voda, balon) zkoušely učivo, které na stránce nebylo →
   výklad dostal novou sekci „Kde to potkáš" (mazat dobré otázky by byla škoda).

**FRONTA — čím pokračovat:**
1. **Kvízy dál po dávkách 4+ bloků** (`node zkontroluj.mjs` vypíše nejhorší).
   Zbývají bloky kolem 9/12: `elektricky-proud-v-kovech-odpor`, `elektromagnet`,
   `elektromagneticka-indukce`, `vlastnosti-stridaveho-proudu`.
   **Postup:** `node testy/vypis-kviz.mjs <blok>` (duplicity!) → `node testy/delky.mjs
   <blok> --odpovedi` → dorovnat skriptem s pojistkou → kontrolor → brána → build → push.
   Pomůcka: `node testy/delky.mjs <blok> --odpovedi` vypíše i znění odpovědí s délkami,
   takže se dorovnává bez čtení celého souboru.
   Postup: `node testy/delky.mjs <blok>` → dorovnat → kontrolor → brána → build → push.
   Pozn.: hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
   dvakrát to zachytilo, že se týž řetězec odpovědí vyskytuje v souboru vícekrát.
2. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem);
   na řadě je `vetveni-programu` (inf. 7) nebo `funkce-v-tabulkach` (inf. 8).
3. Kontrolovat i to, co běží samo (hlídač deníku, pečlivá videa).

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 23:20 — SAMOSTATNÁ NOČNÍ PRÁCE)

**Učitel jde spát a zadal: pracuj samostatně dál, sám si kontroluj, co je podle domluvy
potřeba dodělat — na škole i na webu cesty. Bez ptaní.** Rozpočet: ~12 kol, pak /clear.

**FRONTA PRÁCE (v tomto pořadí):**
1. **Popisky míst na mapě ROKU se překrývají.** Ve Vogézách jsou čtyři místa do 3,4 jednotek
   od sebe (Salbert, Le Thillot, Rupt-sur-Moselle, Saint-Maurice) a žádné nemá `popisekPosun`.
   Příčina: `rozmistiPopisky()` z `src/data/cesty/mapa.ts` používá **jen `CestyVse.astro`**;
   `CestyRok.astro` si popisky umisťuje vlastním kódem, který překryv neřeší. Buď na mapě
   roku použít tutéž funkci, nebo doplnit ruční posuny. Ověřit VÝPOČTEM překryvu obdélníků
   (vzor `ramecek()` v mapa.ts), ne okem.
2. **Škola — dorovnávat kvízy** (uhodnutelnost 59 %). Podle brány: `zaverecny-projekt` (9/10),
   `tepelna-vymena-a-teplo` (15/17), `vnimani-barev` (14/16), `kmitani-a-vlneni` (12/14),
   `energeticka-hodnota-potravin` (10/12). Postup a pasti níže; v každém bloku hledat
   i duplicitní páry otázek a otázky na učivo, které na stránce není vyloženo.
3. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem).
4. Kontrolovat i to, co běží samo: `node zkontroluj.mjs` po každé změně, hlídač deníku
   běží hodinově a nasazuje sám.

**HOTOVO 31. 7. v noci (jen na vědomí):**
- **Longevelle sur Doubs 2025** — nárok Content ID byl na PŮVODNÍM zvuku (video z 2025,
  automat se ho nedotkl). Nová verze s jinou hudbou, úvodní mapou (850 km ≈ 4 082 Kč)
  a titulkem místa: https://youtu.be/-l7f6ja0rR4 ; originál přepnut na soukromý.
  Obraz bitově shodný s anonymizovanou verzí (kotva = md5 video stopy).
- **Denní strop nahrávání na YouTube opraven** — dnes odešlo 5 videí místo 2, protože každý
  automat počítal jen svá. Nově společné počítadlo a strop **2/den z tohoto Macu**
  (druhý profil radekmicek nahrává až 3 denně a čerpá tutéž kvótu 10 000 jednotek).
- **Le Bourg-d'Oisans už je na YouTube** (nezařazený, 21:18) BEZ názvů přibalených míst —
  nezveřejňovat, dokud nevznikne přestavěná verze. V `KE-SCHVALENI.md`.
- Doplněny **francouzské popisy** Livet-et-Gavet a Col d'Ornon → všech 12 míst 2026 má cs/en/de/fr.
- Nasazeno: odkazy na videa u míst (Frangy, Vaulnaveys, Livet-et-Gavet) + automat `videa_na_web.py`.
- Škola: meteorologie F7 — uhodnutelnost 19/21 → 4/21, výklad doplněn, tři věcné chyby opraveny.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 18:30 — INFORMATIKA + DENÍK)

**ZADÁNÍ UČITELE 31. 7. večer: „kde to lokálním modelům nejde, převezmi to sám"
a „jeď dál, šetři tokeny".** Podle toho:
- **49 překladů popisů míst přeložil člověk** (lokální smyčka je 11 h zamítala) →
  **156/156 míst má popis v cs, en, de i fr.** Zapsáno přes `zapis_popisy.py`, který
  nově umí i překlady (`{"slug": {"en": …}}`) pod týmž zámkem.
- Pojistky proti opakování: `POKUSU_NA_PREKLAD = 3` v `popisy_mist.py` · sdílený zámek
  modelu v `pecliva_videa.py` · **otisk výsledného videa jako kotva** (shodný otisk =
  kolo se nepočítá) · chybová hláška ukazuje návratový kód místo konce stderru.
- **Rohatka na kvízy** (`testy/rohatka.json`): zhoršení SHODÍ build, zlepšení laťku
  utáhne samo. Ověřeno obousměrně.
- **Měřidlo délkové nápovědy nadhodnocovalo** — počítalo i remízy, takže otázka
  „značka proudu: I / U / R" (všechny 1 znak) se vykazovala jako uhodnutelná; takových
  je 103. Nově se počítá jen STRIKTNĚ nejdelší → skutečný stav 65 %, ne 76 %.
- **Dorovnáno 11 bloků** (vnitřní energie, vypařování, senzory robota, hardware+software,
  sestavení robota, řazení a filtrování, plán projektu, přenos el. energie, kondenzace,
  elektrické obvody, ohodnocené grafy) → **77 % → 62 %**. U pěti z nich se přitom našly
  **duplicitní páry otázek** (3–4 páry z 10) — bloky vznikly slepením dvou dávek.
  **Dál dorovnávat:** `rezistor-s-promennym-odporem` (11/12),
  `meteorologie-a-mereni-tlaku` (19/21), `vlastni-bloky-s-parametry`, `zabezpeceni-a-digitalni-stopa`.
- **VĚCNÁ CHYBA opravena:** výklad i kvíz fyziky 9 tvrdily, že dálková vedení jsou
  **měděná**. Přenosová vedení VVN jsou hliníková lana s ocelovým jádrem (AlFe) —
  měď je při stejné vodivosti asi 3× těžší a prohnula by stožáry. Opraveno i s důvodem.
- Pozn. k dorovnávání: otázky mají v `kvizy.ts` dva formáty (jednořádkový a víceřádkový).
  Skript, který hledá `odpovedi: […]` jen do konce řádku, ty víceřádkové **tiše minul** —
  hlásil „nešlo" u 4 z 18. Hledat v úseku ~700 znaků od textu otázky, ne do `\n`.

> **ODLOŽENO — anonymizace videa žere 19–32 GB a systém proces zabíjí (signál 9).**
> Tři pokusy: (1) sdílený zámek modelu, aby neběžela souběžně s Ollamou (nasazeno,
> správné, ale nestačí), (2) uvolnění modelu z paměti přes `keep_alive: 0` (uvolnilo
> 44 GB, proces přesto zabit), (3) krájení videa na 30s kousky místo 120s
> (`DELKA_KOUSKU_S`, složky nesou délku v názvu — `zdroj30s`, `anonym30s`, nic se
> nemaže). Ani po zkrácení paměť neklesla, naopak 32 GB. Data se přitom nedrží —
> `detekce_syrove` má jen souřadnice. **Podezření: paměť roste s počtem volání
> insightface na snímek** (3030 volání na video), tedy únik v modelu/ort, ne v našem
> kódu. **Další nápad k vyzkoušení:** `--krok 2` nebo 3 (analyzovat každý druhý/třetí
> snímek; okno ±5 snímků při rozmazávání to pokryje) → 2–3× méně volání modelu.

**DENÍK — NÁLEZ 31. 7. večer: smyčka vracela učiteli NEZMĚNĚNÝ soubor.** Učitel po
opravách hlásil, že video vypadá stejně (rozmazaná střecha, lavička, terasa i manželka).
Příčina nebyla v anonymizaci: `zamitnuto()` vynulovalo nálezy a kola > 1 vybírají kousky
k přepracování **podle nálezů**, takže vyšlo „přepracovávám **0 z 1** kousků" a kontrolor
znovu odkýval týž soubor z 5:28 ráno — tedy verzi vyrobenou ještě PŘED opravou v 16:25.
Opraveno: zamítnutí učitelem vrací smyčku na **kolo 0** (celé video, výchozí práh —
opravoval se kód, ne citlivost; přitvrzování prahu by tu bylo proti smyslu připomínky,
protože rozmazává víc) a prázdný seznam kousků se nikdy nebere jako „není co dělat".
Video se od 18:09 přepracovává celé; kotva = otisk `anonym/kousek_000.mp4` před během
byl `6e4132c7…`, po doběhnutí musí být JINÝ. Pak učitel odklikne `--schvaleno`/`--zamitnuto`.
**Pravidlo napříště: hlášku automatu neber jako důkaz — porovnej otisk souboru.**
- **K revizi zbývají 2 videa:** `Schongau_DE` (94 MB) a `Le_Bourg-dOisans_v2` (248 MB).
  Le Bourg se ještě přestaví — jeho média se změnila a čeká na Le Lavandou (13 médií
  z ručního vkladu, uzavře se 6. 8. podle pravidla 7 dní).
- **Čeká na učitele:** sloučit dvě složky Geisingen (v `KE-SCHVALENI.md`) — ta
  s neviditelnými znaky v názvu je podmnožina `Geisingen_DE`, automat z ní videa nedělá.
- Reference tváří: **56 učitel, 62 manželka** (ráno 13 a 31). Roky 2021 a 2022 pro
  učitele NEEXISTUJÍ — ověřeno měřením, ve videích není (drží kameru).

**ŠKOLA — hotovo `microbit/oziveni-a-led-displej`** (inf. 8): `LedDisplejSimulace` —
displej 5×5 na klikání, dva obrázky, animace jejich střídáním. Dvě pointy: ze **dvou
stejných** obrázků animace nevznikne, a tentýž program v bloku **„po spuštění"** jednou
doběhne a zůstane stát. Test `testy/simulace/led-displej.mjs` (47 kontrol, obousměrně
ověřen podvrhem). Kvíz přepsán: měl **4 duplicitní páry z 10 otázek** a správná odpověď
byla nejdelší u 9 z 10 (nově 5 z 10, největší rozdíl 7 znaků). Výklad doplněn o `pauza
400 ms` a rozdíl obou bloků — kvíz se na to ptal, ale na stránce to nebylo.
**Další na řadě:** `vetveni-programu` (inf. 7) nebo `funkce-v-tabulkach` (inf. 8).

> **Past (nález kontrolora 31. 7.):** displej po zastavení programu skákal na obrázek,
> do kterého se KRESLÍ — tedy se obraz změnil přesně proti větě, kterou si žák právě
> přečetl. Zastavení proto nově přepne kreslení na ten obrázek, který svítil. A pozor
> na **tautologický test**: `ok(a !== b || true, …)` hlásí ✅ vždycky. Kontrolor ho našel,
> já ho pak při přepisu omylem napsal podruhé — grepovat `|| true` v testech.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 13:50 — INFORMATIKA)

**VĚTŠÍ ZMĚNA Z AUDITU JE HOTOVÁ.** Kontroly nově čtou **skutečná data** přes
`testy/data.mjs` (esbuild → `import`), ne text souboru. Brána i měření názornosti nad
tím běží, brána se pouští při každém `npm run build` (`prebuild`) a byla ověřena
**obousměrně** (podvrh se najde, zdravý stav nehlásí nic). Nová kontrola 6c hlídá, že
každé podtéma s kvízem je zastoupené v ročním opakování. Brána teď vidí **2436 otázek
ve 164 blocích** (dřív tvrdila 2084).

> **Pravidlo pro každou další kontrolu:** piš ji nad `nactiData()`, nikdy nad textem
> souboru. Vzory nad textem si nech jen na kontrolu ZAPOJENÍ (import v `.astro`, řádek
> s vykreslením, union typ) — tam je předmětem kontroly opravdu zdrojový kód.

**TEĎ SE DĚLÁ INFORMATIKA** — podle auditu je to největší díra na webu:
47 podtémat, jen 5 simulací a **ani jedno podtéma s obrázkem či videem**.

| ročník | bez názornosti | simulací |
|---|---|---|
| informatika 7 | 14 z 18 | 4 |
| informatika 8 | 16 z 18 | 2 |
| informatika 9 | 10 z 11 | 1 |

**Hotovo:**
- `adresy-bunek-a-vzorce` (inf. 8) — `TabulkaVzorceSimulace`. Úloha přímo z výkladu: sloupec
  cen v € a kurz v B1. S `$B$1` vyjde 100/300/500/1000 Kč, s relativním `B1` se odkaz posune
  na předchozí VÝSLEDEK a čísla se lavinovitě rozjedou (100 → 1200 → 24 000 → 960 000).
- `souradnice-a-kresleni` (inf. 7) — `SouradniceSimulace`. Scéna −240…240 × −180…180, klikání,
  posun po 10 (i šipkami), pero, cíle a program čtverce krok po kroku. Pointa je **záporné y
  = DOLŮ**. Mřížka je po 50, aby rohy čtverce (±50) padly na linky. Test `testy/simulace/
  souradnice.mjs` (51 kontrol). Výklad doplněn o kreslení otáčením + pravidlo 360 : počet stran.

- `promenne` (inf. 7) — `PromenneSimulace`. Krabička `skóre` + okénko na scéně jako ve
  Scratchi, program „seber tři jablka" krok za krokem. **Pointa: program jde přepnout na
  verzi BEZ bloku `nastav skóre na 0`** — napoprvé vyjde taky 3, podruhé 6, potřetí 9;
  tím se vysvětlí, proč hra po restartu začíná s cizím skóre. Test 26 kontrol.

**Návrh dalších simulací informatiky (v pořadí užitku):**
1. `microbit/oziveni-a-led-displej` (inf. 8) — mřížka 5×5 LED, žák kreslí a spustí
   animaci střídáním dvou obrázků.
3. `vetveni-programu` (inf. 7) — vývojový diagram, žák přepne podmínku a vidí, kudy to teče.
4. `funkce-v-tabulkach` (inf. 8) — SUMA/PRŮMĚR/MAX nad malou tabulkou (naváže na hotovou
   TabulkaVzorceSimulace, dá se z ní hodně převzít).
5. `orientovane-grafy-a-automaty` (inf. 7) — automat jako kolečka a šipky, žák posílá vstup.

> **Past ověřená 31. 7.:** u simulace ke Scratchi VŽDY použít **české názvy bloků podle
> Scratche 3** (`pero zapni` / `pero vypni` / `smaž`, `dopředu (100) kroků`), ne doslovný
> překlad anglických („pero dolů"). Kvízy na webu už české názvy používají, takže doslovný
> překlad si se stránkou protiřečí — a žák blok v paletě nenajde. Zdroj pravdy: scratch-l10n.
> Druhá past: **tlačítko přepínače musí pojmenovávat AKCI** („zapnout pero"), ne stav —
> jinak na něm při kreslení stojí „pero nahoru". Stav patří slovy do stavového řádku.

**Pozor u informatiky na dvě věci:** (a) `senzory-robota` má ČTYŘI duplicitní páry otázek
z deseti — chce přepsat celý blok podle výkladu, ne jen dorovnat délky; (b) informatika má
nejkratší výklady na webu (medián ~700 znaků), takže u některých podtémat je potřeba spíš
doplnit TEXT než přidat simulaci.

**Zbytek fronty z auditu** (neztratit):
- **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet otázek
  s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
- Dorovnávat jen **449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý efekt.
- Levné kontroly: výklad pod ~700 znaků · číslo ve správné odpovědi, které není ve výkladu
  (58 případů).
- K ověření učitelem: otázka „Co je stav beztíže? → působící síly jsou v rovnováze"
  (fyzika 7) — beztíže je volný pád, ne rovnováha sil.


## ⏩⏩⏩⏩⏩⏩ AUDIT STRATEGIE (31. 7. 2026, 12:40) — ČTI JAKO PRVNÍ

Učitel zadal: *„udělej celkový nezávislý audit, jestli je strategie správná — někdy příliš
záplat nedá dobrý výsledek a je třeba jedna větší změna."* Běželi **dva nezávislí auditoři
s různými otázkami**. Závěr: **architektura je v pořádku, velký přepis by byl zbytečný.
Špatná byla TRIÁŽ a hlavně MĚŘIDLA.**

**Co je ověřeno a nemá se měnit:** výkon (72 kB HTML, 7 kB CSS po gzipu na 405 stránek —
poběží i na školním tabletu) · univerzální šablona simulací se nevyplatí (jen 8 % zdroje
je sdílitelný styl, 74 % je scéna a fyzika) · zapojení simulace přes 4 místa brána spolehlivě
hlídá · testy simulací přes `node:vm` jsou tvrdá kotva.

**Hlavní poučení: NEVĚŘ VLASTNÍM MĚŘIDLŮM, DOKUD JE NĚKDO NEPROVĚŘÍ.**
Všechny tři kontrolní skripty četly TypeScript **regulárními výrazy místo dat**:
1. `testy/nazornost.mjs` hledal `druh: 'obrazek'` — ta hodnota v datech **není ani jednou**,
   správně je `'infografika'` (23×). Infografiky se nikdy nepočítaly → fyzika 7 hlásila
   5 mezer, ve skutečnosti 2. **Opraveno.**
2. `zkontroluj.mjs` hlásí **2084 otázek, ve skutečnosti jich je 2426** (import dat přes
   esbuild). 14 bloků shrnutí (342 otázek) nevidí vůbec, protože se skládají programově.
   **ZATÍM NEOPRAVENO — viz fronta níže.**
3. Odsazení bloku `elektrina` v `temata.ts` je o tabulátor jiné, takže naivní regex
   napočítá 22 podtémat místo 37.
→ **Pravidlo do budoucna: kontroly mají číst DATA (esbuild → `import`), ne text souboru.**
   `esbuild` je v `node_modules`, import trvá ~10 ms. Vzor je v commitu tohoto auditu.

**Co se z auditu udělalo hned:**
- Brána běží při každém buildu (`"prebuild": "node zkontroluj.mjs"`) — dosud jen z dobré vůle.
- **Roční opakování nepokrývalo všechna podtémata.** Souhrnný kvíz bere otázky po kolech
  do stropu; když je strop < počet podtémat, poslední témata se do opakování **nedostanou
  nikdy** (fyzika 8: 35 podtémat, strop 30 → vypadával celý celek `zvuk`). Navíc v seznamu
  celků informatiky chyběly `hry-ve-scratchi` a `vex-iq`, takže **144 otázek přidaných
  v předchozí session se do opakování nedostalo vůbec.** Opraveno, ověřeno importem dat.
- **Tištěný test šel složit hádáním na známku 2.** Strategie „vyber nejdelší odpověď" má
  úspěšnost 72 %, tedy ~5 ze 7 otázek. Test teď losuje přednostně z otázek bez délkové
  nápovědy → kleslo na ~3,8 ze 7. **Není to oprava dat**: ve 148 ze 164 bloků není ani
  7 čistých otázek.
- **Recyklace místo psaní nových simulací** (1 řádek místo ~200): `energie-a-jeji-premeny`
  ← `skatepark`, `teplo-a-premeny-skupenstvi` ← `ohrev`, `elektricky-naboj` ← `elektrovani`,
  `elektricke-obvody` ← `obvod`. Mezer názornosti ve fyzice 8: **22 → 13**.

**Tři návrhy auditora ZAMÍTNUTY po vlastní kontrole** (nepřebírat je příště bez ověření):
`tuhnuti` ← `ohrev` a `kondenzace` ← `vyparovani` by ukazovaly OPAČNÝ směr děje, než se
probírá (porušuje pravidlo o logické scéně); `vykon` ← `prace` nepokrývá výkon vůbec.

**FRONTA — co z auditu zbývá, v pořadí užitku:**
1. **Přepsat `zkontroluj.mjs` a `nazornost.mjs` na import dat přes esbuild.** Zruší tři
   nezávislé regexové parsery téhož souboru a odstraní zdroj falešných čísel. *Tohle je
   ta „jedna větší změna", na kterou se učitel ptal — zbytek jsou opravdu jen záplaty.*
2. **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet
   otázek s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
3. **Dorovnávat jen 449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý
   efekt. Zkracovat správnou odpověď a přebytek dávat do `vysvetleni`.
4. Levné strojové kontroly: podtéma bez zastoupení v ročním shrnutí · výklad pod ~700 znaků ·
   číslo ve správné odpovědi, které není ve výkladu (58 případů) · shoda počtu otázek
   podle parsování a podle importu.
5. **Skutečná díra není ve fyzice, ale v informatice:** 47 podtémat, 5 simulací, medián
   výkladu ~700 znaků a **ani jedno podtéma nemá obrázek či video**. 39 podtémat má
   simulaci a přitom výklad pod 1200 znaků — energie šla do simulací místo do textu.
6. K ověření učitelem (neopravovat potichu): otázka „Co je stav beztíže? → působící síly
   jsou v rovnováze" (fyzika 7) — beztíže je volný pád, ne rovnováha sil.

## ⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 11:15 — ŠKOLA: názornost fyziky 8, čti jako první)

**Zadání učitele:** „Média k fyzice 8 (22 podtémat bez obrázku/videa), stránky jsou textové,
chybí názornost." Číslo ověřeno skriptem: fyzika 8 má **37 podtémat a 22 z nich nemá ani
obrázek, ani video, ani simulaci**. Příčina: `public/materialy/fyzika/` obsahuje jen
**6-rocnik a 7-rocnik** — pro osmičku a devítku tam není ani jeden soubor.

**Měření názornosti napříč webem** (skript, dá se zopakovat — viz níže):

| ročník | bez názornosti / celkem |
|---|---|
| fyzika 6 | 6 / 21 |
| fyzika 7 | 5 / 33 |
| **fyzika 8** | **22 / 37** ← řeší se |
| fyzika 9 | 10 / 25 |
| informatika 7 / 8 / 9 | 15/18 · 17/18 · 10/11 |
| pracovní činnosti 6 | 2 / 2 |

**Zvolený postup** (fotky ani videa vyrobit neumím — ty dodává učitel a YouTube automat;
umím ale simulace a infografiky jako kód, což je u elektřiny názornější než obrázek):
elektřina má 12 z těch 22 podtémat a je nejabstraktnější, proto se začalo tam.

**HOTOVO 31. 7. (5 z 22 podtémat, nasazeno a ověřeno curl):**
- `MeridlaSimulace` — ampérmetr do série, voltmetr paralelně + **oba chybné způsoby**
  (`elektricky-proud-mereni`, `elektricke-napeti-mereni`)
- `OdporVodiceSimulace` — R = ρ·l/S včetně vlivu teploty
  (`elektricky-proud-v-kovech-odpor`, `zavislost-odporu-na-vodici`)
- `ReostatSimulace` — týž jezdec jako reostat (proud) × potenciometr (napětí)
  (`rezistor-s-promennym-odporem`)

**ZBÝVÁ 17 podtémat bez názornosti** — návrh pořadí pro další kola:
1. `elektricky-naboj` + `elektricke-pole` (elektrování třením, přitahování, siločáry)
2. `elektricka-prace-a-vykon` + `vykon` (počítadlo kWh a korun podle skutečných spotřebičů)
3. `ucinky-proudu-a-bezpecnost` (infografika účinků + pojistka)
4. `elektricke-obvody`, `vznik-elektrickeho-proudu`, `chemicke-zdroje-napeti`
5. teplo: `tuhnuti`, `kondenzace`, `skupenske-zmeny-vody-v-prirode`, `teplo-a-premeny-skupenstvi`
6. `tepelny-motor-parni-stroj`, `energie-a-jeji-premeny`, `vnitrni-energie-telesa`
(`pololetni-shrnuti` a `rocni-shrnuti` názornost nepotřebují — jsou to rozcestníky s kvízem.)

**Jak si měření zopakovat:** projít `temata.ts` a u každého podtématu se ptát, jestli má
`interakce`/`interakce2`, materiál `druh: 'obrazek'` nebo `druh: 'video'`. **Past:** blok
`elektrina` má v `temata.ts` o jeden tabulátor jiné odsazení než ostatní celky, takže
naivní regex `^\t{5}slug:` ho přeskočí a napočítá 22 podtémat místo 37. Používej `^\t{5,}`.

**Poučení z tohoto kola — nezávislý kontrolor našel u první simulace 10 vad, dvě vážné:**
1. **Animace protiřečila vlastnímu textu.** U zkratu text tvrdil „proud žárovku obejde",
   ale tečky dál obíhaly hlavní smyčku skrz žárovku. Kdo kreslí schéma i text, snadno
   popíše, co zamýšlel, ne co je vidět.
2. **Jediná součástka v obvodu zabila didaktický smysl.** Napětí na žárovce se rovnalo
   napětí zdroje, takže správné (voltmetr paralelně) i chybné (v sérii) měření ukazovalo
   stejných 12 V — žák nemá jak poznat rozdíl. Opraveno na dvě součástky v sérii:
   6 V na žárovce z 12 V zdroje. **Pravidlo: simulace měření musí mít v obvodu aspoň dvě
   součástky, jinak se rozdíl nemá kde projevit.**
3. **Simulace předbíhala učivo.** Používala Ohmův zákon, který je v `temata.ts` až o dvě
   podtémata dál. Před nasazením ověřovat i POŘADÍ podtémat, nejen správnost.
   Test to teď hlídá strojově (v textech nesmí být „I = U / R" ani hodnota v ohmech).
4. Kontrolora neposlouchat slepě: navrhoval zvýšit zkratový proud na 8× kvůli názornosti,
   jenže při přemostění žárovky se proud přesně **zdvojnásobí** — necháno pravdivé 2 A.

**Druhé kolo kontroly (simulace odporu a reostatu) — 15 nálezů, 8 vážných. Poučení, která
platí pro KAŽDOU další simulaci:**
1. **Zjednodušený model si musí sednout se schématem.** Potenciometr počítal dělič
   naprázdno, ale na schématu na něm visela žárovka 10 Ω — zobrazená napětí byla až
   dvojnásobná proti skutečnosti. Řešení nebylo počítat zatížený dělič (tím by zmizela
   celá čísla), ale **dát na výstup voltmetr** — což je zároveň to, jak se potenciometr
   opravdu používá. **Když model něco zanedbává, schéma to musí zanedbání ospravedlnit.**
2. **Reostat a potenciometr mají protichůdné požadavky na čísla**: reostat potřebuje
   odpor drátu ≫ odpor spotřebiče, dělič naprázdno naopak. Čísla se musí navrhnout
   pro každý režim zvlášť (teď: 12 V, drát 40 Ω, žárovka 10 Ω, krok jezdce 25 %).
3. **Obvod na schématu musí být UZAVŘENÝ.** Chyběl vodič od spotřebiče ke spodní
   kolejnici — dítě hledá uzavřenou smyčku jako první věc.
4. **Jas žárovky se řídí VÝKONEM (I²·R), ne proudem.** Při poklesu proudu na pětinu
   zbyde 4 % jasu, ne 20 % — jinak simulace slibuje víc světla, než by ve třídě bylo.
5. **Vypsaný vzorec musí dát vypsaný výsledek.** U zahřátého drátu stálo na obrazovce
   „0,5 · 4 / 1" a hned pod tím „2,04 Ω". Teď vzorec ukazuje hodnotu za studena
   a vliv zahřátí se dopisuje zvlášť; test to hlídá tak, že si dosazení **přepočítá**.
6. **Jednotky musí sedět s výkladem na téže stránce.** Výklad učil ρ v Ω·m, simulace
   používala Ω·mm²/m — žák dosazující podle výkladu by byl 10⁶× mimo. Do výkladu proto
   přibyla praktická jednotka i převod.
7. **Kontrolovat i POŘADÍ podtémat.** Simulace byla zapojená i tam, kde se ρ ani vzorec
   ještě neprobraly → vznikla zjednodušená verze přes prop (`odpor-vodice-zaklad`).
8. **Pozor na nefyzikální popisky ovládání.** „Rozžhavený drát" u hliníku (taje při
   660 °C) neexistuje; činitel 1,6 odpovídá zahřátí asi na 175 °C, ne rozžhavení.
9. **Ořezané mapování zabije pointu.** Rychlost elektronů byla oříznutá na mez, takže
   mezi 2 Ω a 10 Ω nebyl vidět žádný rozdíl — přitom „větší odpor = menší proud" je
   celé sdělení simulace. Test proto ověřuje, že různé vstupy dají různé rychlosti.

**Jak se simulace ověřují bez prohlížeče** (náhledový server často blokuje jiná session):
skript ve scratchpadu spustí **skutečný `<script>` komponenty** v Node přes `node:vm`
s náhradním DOM, pak zavolá vystavené čisté funkce (`svg.__stavMeridel`, `svg.__odpor`,
`svg.__reostat`…) a proměří spojitost pohybu po 16 ms i všechny kombinace ovládání.
Tohle je tvrdší kotva než pohled okem a nestojí skoro nic — u nových simulací pokračuj stejně.

## ⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 6:00 — ŠKOLA: díry v kvízech)

**Uzavřeno: 12 podtémat bez kvízu má kvíz.** Pracovní činnosti (Tinkercad, SketchUp),
VEX IQ (4 podtémata 8. a 9. roč.) a hry ve Scratchi (6 podtémat) — celkem **144 nových
otázek**. Zbylých 11 „podtémat bez kvízu" jsou **shrnutí**, kterým se kvíz skládá
automaticky funkcí `slozSouhrnnyKviz` — díra to není. Jediné skutečně bez kvízu zůstává
`fyzika/6-rocnik/shrnuti/pokusy` (sbírka pokusů, kvíz tam nedává smysl).

**Kvízů je ve skutečnosti 2086 otázek, ne 358.** Údaj 358 z předchozích session byl
podhodnocený: `zkontroluj.mjs` počítal otázky regexem `^\s*text:` a **jednořádkové
otázky** (`{ text: '…', odpovedi: […] }`, kterých je většina) do počtu vůbec nebral —
takže ani jeho kontrola „ke každé otázce patří odpovědi" na nich neplatila. Opraveno
a ověřeno obousměrně (podvrh bez odpovědí se najde, definice typu se nepočítá).

**Poučení pro psaní kvízů (odhalil nezávislý kontrolor, platí i do budoucna):**
1. **Správná odpověď nesmí být systematicky nejdelší** — v první verzi jich bylo 73 %
   a šly uhodnout bez znalosti látky. Míchání pořadí to neodstraní. Měřit skriptem;
   cíl je ~33–40 % a žádný rozdíl ≥ 10 znaků.
2. **Vysvětlení jedné otázky nesmí prozradit jinou** otázku téhož bloku (a bloky
   sousedních témat se prozrazují navzájem).
3. **Neuvádět klávesovou zkratku v zadání**, když se na ni jiná otázka ptá — jde pak
   vyloučit. („K čemu je nástroj Metr (T)?" prozradilo distraktor T jinde.)
4. **Nesmyslný distraktor je nápověda** („ve Wordu", „změříš to pravítkem").
5. Kontrolor se pouští **dvakrát**: opravy samy zanesly dva nové úniky.

**Hotovo z toho úkolu: 2 nejhorší bloky** (`skupenske-zmeny-vody-v-prirode`
a `posilani-zprav`, obojí 100 % → ~41–50 %). Při tom vyšla najevo **past, kterou je
potřeba znát: vysvětlení u otázky se žákovi ukáže JEN při ŠPATNÉ odpovědi**
(`Kviz.astro`) — kdo odpoví správně, nedozví se nic navíc. Podstatné podmínky
(„pod rosným bodem", „při teplotě pod 0 °C") proto **patří do odpovědi**, ne do
vysvětlení; zkracovat se smí jen to, co je opravdu vata. Nezávislý kontrolor při tom
našel i dvě starší vady: definice kyselých dešťů neodpovídala na položenou otázku
a otázka „Proč je mrak s více kapkami tmavší? → obsahuje víc vody" byla kruhová
(zopakovala zadání místo příčiny). Obojí opraveno. Výklad `posilani-zprav` doplněn
o vlastní zprávy a rozdíl „vyšli zprávu" × „vyšli zprávu a čekej" — tři otázky
zkoušely učivo, které na stránce vůbec nebylo.

**⚠️ ÚKOL NA DALŠÍ KOLA — délková nápověda ve starých kvízech.** Když jsem měřil
vlastní novou dávku, změřil jsem pro jistotu i zbytek webu: **u 64 % z 2085 otázek je
správná odpověď nejdelší** (náhoda je 33 %) — žák je uhodne bez znalosti látky. Míchání
pořadí to neřeší, míchá pořadí, ne délku. Kontrola je nově v `zkontroluj.mjs` (bod 6b):
neblokuje build, ale vypíše podíl a **jmenuje 5 nejhorších bloků**. Postup je dorovnávat
je po dávkách (4+ bloků na kolo): buď zkrátit správnou odpověď, nebo prodloužit
distraktory — a znovu spustit bránu. Nejhorší zbývající (brána je vypíše sama): `sestaveni-a-oziveni-robota` (10/10),
`senzory-robota` (10/10), `razeni-filtrovani-velka-data` (10/10),
`plan-projektu-a-ladeni` (10/10), `hardware-a-software` (11/11).

**Pozor — v `senzory-robota` (informatika 8) nejde jen o délky: blok má ČTYŘI
DUPLICITNÍ PÁRY.** Ptá se dvakrát na ultrazvuk („Jak měří vzdálenost?" × „Který senzor
odpoví, jak daleko je překážka?"), dvakrát na dotykový senzor, dvakrát na jízdu po čáře
a dvakrát na zastavení před zdí — z 10 otázek je 8 ve dvojicích. Chce to přepsat celý
blok podle výkladu (jen 3 senzory + podmínka + jízda po čáře), ne jen dorovnat délky.
Rozdělaná verze nikde není, začni od stávajícího bloku v `kvizy.ts`. **Před editací
načti text přes Read** — v datech jsou české uvozovky „ ", takže `old_string`
zkopírovaný z výstupu `grep` nesedí a Edit selže.

**Čeká na rozhodnutí učitele** (výklad, ne kvíz — nesahal jsem na to): kontrolor
upozornil, že u SketchUpu ve výkladu (`temata.ts`, podtéma `sketchup`) může být sporné
(a) zadávání rozměrů jako `100;50` — oddělovač závisí na jazyku prostředí, v anglickém
je čárka, a výklad sám říká, že prostředí je anglicky; (b) věta o ukládání přes Save —
webový SketchUp Free má i automatické ukládání. Otázky na obojí jsem z kvízu raději
vypustil. Ověřit u školní sestavy a případně upravit výklad.

## ⏩⏩⏩ KDE POKRAČOVAT (30. 7. 2026, 22:15 — deník)

**Na webu jsou roky 2019–2026 a POPIS MAJÍ VŠECHNA MÍSTA (156 ze 156).** Bod „dopsat
popisy" je tím uzavřený. Francouzština nasazená.

**1. Překlady dohání lokální automat sám** (hlídač à 1 h, `--jen-preklady`):
chybí 72× en, 83× de, 147× fr (čísla vyskočila tím, že přibylo 71 nových českých
popisů). Do toho nezasahovat — jen občas zkontrolovat, že hlídač běží.

**2. Čeká na učitele:** Omega **není v gitu** (nález auditu: skripty nemají historii,
nedá se nic vrátit). `pip-audit` hlásí 2 zranitelnosti v `torch` (oprava ve verzi 2.13.0).

**0. NEJDŘÍV SI PŘEČTI TOHLE (31. 7. 2026, 5:30 — po úklidu před /clear):**
Popis místa se zapisuje VÝHRADNĚ přes `zapis_popisy.py` a i ten teď drží zámek —
automat na popisy si soubor načte na začátku dávky a na konci zapíše celý, takže
ruční zápis mezitím **beze stopy zmizí**. Stalo se to dvakrát za jednu noc
(15 popisů z dat webu, pak 5 oprav včetně Loketu). Před buildem vždy `node
zkontroluj.mjs` — nově hlídá i data cest a právě tuhle ztrátu odhalil.

**3. Pečlivá videa běží — první video čeká na odklik.** `pecliva_videa.py` +
LaunchAgent `com.omega.pecliva-videa` zpracovávají stará videa PO JEDNOM se
samoopravnou smyčkou; až bude hotové, objeví se řádek v `KE-SCHVALENI.md`
a protokol vedle videa. Schválení: `venv/bin/python3 pecliva_videa.py --schvaleno`,
vrácení do smyčky: `--zamitnuto "co je špatně"`. Stav: `--stav`.

**4. Z auditů zbývá k dodělání** (nálezy jsou v odpovědi z 31. 7., nasazené opravy
v gitu): u deníku ještě chybí popisky ~170 míst na společné mapě `/cesty/vse`,
překlad názvů videí a stellplatzových údajů do en/de/fr, `hreflang` a canonical,
kontrast `--ztlumeny` a rozšíření `zkontroluj.mjs` o kontroly dat cest.
U školy: Pracovní činnosti mají 0 kvízů, 13 podtémat je bez kvízu, informatika má
poloviční kvízy (ø 12 proti 21) a 22 z 37 podtémat fyziky 8 nemá žádné médium.

### Co se opravilo 30. 7. večer (ať se to neopakuje)

- **Automat mazal ručně psané popisy.** `stare_cesty.py` skládá `.ts` z `popisy-mist.json`;
  popis zapsaný rovnou do `.ts` tedy při dalším běhu zmizel — takhle se ztratilo 15 popisů
  (našly se v gitu a jsou zpátky). **Popis se zapisuje VÝHRADNĚ přes `zapis_popisy.py`**,
  nikdy přímo do dat webu.
- **Francouzština se na web nedostávala.** `blok_popisu()` uměl jen cs/en/de, takže hotové
  francouzské překlady ležely ladem. Jazyky jsou nově v `JAZYKY_POPISU` — **při dalším
  jazyku doplnit i tam** (a v `popisy_mist.py` do `JAZYKY_PREKLADU`).
- **Kotva zamítala i správné články.** U velkých měst vznikla fotka na okraji, kilometry
  od bodu v článku (Praha, Brno, Gdaňsk zůstaly bez faktů). Nově `fakta_mist.py --zdroj
  SLUG JAZYK TITUL` — článek vybere člověk, v datech je to vidět jako `zdroj_rucne`.
  Automat si kotvu nevypíná nikdy.
- **Pozor na správný článek, ne jen správné jméno.** Olsztyn dostal fakta z článku
  o zaniklé správní jednotce („gromada“). GPS přitom seděla — kotva tohle nepozná.

**Postup psaní popisů** (kdyby přibyla nová místa):
```bash
cd ~/Desktop/Omega/skripty
venv/bin/python3 fakta_mist.py --vypis 12        # ověřená fakta k přečtení
# … popisy napsat do JSON {"slug": "text"} …
venv/bin/python3 zapis_popisy.py davka.json      # zapíše (síto zkontroluje)
venv/bin/python3 stare_cesty.py --ts vse --tise  # do dat webu → build → push
```
Popisy piš **čtivě, ne jako výčet údajů** (přání učitele 30. 7.: „byly to jen body,
uprav do čtivé formy"). Fakta ber JEN z `fakta-mist.json`; nic nepřidávej — nezávislý
kontrolor 30. 7. našel v 71 popisech 6 tvrzení bez opory ve zdroji (vč. „v podhůří
Šumavy" nebo UNESCO přiřazené k nesprávné části zdroje).

## ⏩⏩ STAV K 30. 7. 2026 VEČER — co je hotové z mapy dřívějších cest

Body 1–3, **5 i 6 HOTOVÉ**, bod 4 (popisy) běží jako automat. Navíc francouzština webu.

- ✅ **Roky 2019–2022 na webu** (bod 5) — 43 cest, 133 míst; `stare_cesty.py --ts vse`
  zapíše všechny roky naráz a sám udržuje rejstřík `roky.ts`. Výjezdy se číslují
  v rámci roku (dřív globálně: rok 2023 začínal „výjezdem č. 36“).
- ✅ **Ochrana ručně psaných roků** — `RUCNE_PSANE_ROKY = {2024, 2025, 2026}`.
  Učitel 30. 7. přidal do „Dřívějších dovolených“ fotky až po letošní Landshut
  a ptal se, „jestli se tam něco nepere“: automat ruční roky NIKDY nepřepíše
  (mají galerie, stellplatze, videa, reporty, které z fotek nevzniknou).
- ✅ **Hlídač nových fotek** (bod 6) — `hlidac_starych_fotek.py`, LaunchAgent
  `com.omega.stare-fotky-hlidac`, **doháněč** à 1 h: pozná nové fotky podle otisku
  složky, přepočítá cesty, udělá dávku popisů (12/běh), builduje a pushuje —
  ale commituje JEN `src/data/cesty`, aby nesebral rozdělanou práci učitele.
- 🔄 **Popisy míst** (bod 4) — `popisy_mist.py`: kotva = článek na Wikipedii, jehož
  JMÉNO i SOUŘADNICE sedí na místo; autor qwen3:30b-a3b, **nezávislý kontrolor
  gemma4:26b**. Hotovo 95 popisů ze 123 míst (6 nemá na Wikipedii zdroj),
  92 anglických překladů; němčina a francouzština se dopočítávají.
- ✅ **Francouzská verze deníku** (zadání 30. 7.) — `/cesty/fr/`, celé rozhraní,
  28 zemí, francouzský tvar data („6 juillet 2026“, „1er août 2022“), vlajky
  u přepínače jazyků (na úzkém telefonu jen vlajka). 11 popisů míst 2025/2026
  přeloženo ručně, u ostatních záskok češtinou.

**Poučení, která stála čas (ať se neopakují):**
1. Keš jmen míst má **verzi** (`KES_VERZE`) — po opravě pravidel pojmenování se
   jinak držel paskvil „Brémský Přístav“ dál, protože byl v keši.
2. Lokální modely: fáze **podle modelu, ne podle místa**. Střídání qwen↔gemma po
   každém kroku = 6 přehození modelu v RAM na místo (4 min/místo); po přeskupení
   trvá kontrola 95 popisů vteřiny. A qwen3 potřebuje `/no_think` v promptu —
   parametr `think:false` přes `/api/generate` nestačí.
3. **Kontrolor sám nestačí** — anglické „přemýšlení“ modelu propustil jako popis.
   Před kontrolora patří strojová pojistka (`je_cesky_popis`).
4. Wikipedie vrací **HTTP 429 s `Retry-After`** — respektovat, jinak místa
   zbytečně přicházejí o popis.

**Zbývá k rozhodnutí učiteli:** pár míst má z geokódování divné názvy
(„France métropolitaine“, „Küstengewässer…“, „Ujezd“) — jsou to body z moře nebo
z velkých území; buď je pojmenovat ručně, nebo z mapy vynechat.

## ⏩⏩ ZADÁNÍ UČITELE 30. 7. 2026 — MAPA DŘÍVĚJŠÍCH CEST (dělat jako první)

Učitel rozhodl o mapě starých cest (automat `Omega/skripty/stare_cesty.py`, 43 cest
2019–2023 vytěžených z fotek, pilotně nasazený rok 2023):

1. **Podoba mapy roku 2023 se učiteli LÍBÍ a MÁ ZŮSTAT** (30. 7. 2026, po zhlédnutí
   nasazené mapy: „tohle se mi líbí může zůstat"). Tedy: všechna místa jako kolečka,
   blízká obepnutá kroužkem s počtem, trasy se šipkami, modrý domeček s popiskem
   „jižní Čechy", pod mapou rozcestník s vlaječkami. **Nepřestavovat!**
   Rozdělení roku na jednotlivé cesty (víkend × prázdninová cesta) zůstává jako
   možné vylepšení, ale až na výslovné přání — dnešní dělení podle vzdálenosti stačí.
2. **Opakované návštěvy stejného místa se ZACHOVÁVAJÍ** (30. 7.: „opakovaně jsme jezdili
   na stejná místa jiný rok ale to chci zachovat"). Slučovat se smí JEN dva shluky téže
   cesty se stejným jménem (`slouc_stejnojmenna` v stare_cesty.py) — nikdy napříč
   cestami ani roky. Slugy míst musí zůstat unikátní (ověřeno: v roce 2023 jsou).
3. **Názvy míst: originál, ne strojový překlad.** 30. 7. se na webu objevil paskvil
   „Brémský Přístav" (Nominatim s `accept-language=cs` počeštil Bremerhaven). Opraveno:
   dotaz jde BEZ češtiny, jméno se protáhne slovníkem vžitých exonym (`EXONYMA`
   v body_z_fotek.py — Bremen→Brémy, Gdańsk→Gdaňsk…), zemi určuje KÓD státu
   (`ZEME_PODLE_KODU`), protože název země se vrací v místním jazyce („Deutschland").
4. **Popisy míst: VYROBIT** (ne nechat prázdné). U ~150 míst vyrábět z veřejných
   faktů o místě — nikdy si nevymýšlet, co tam učitel zažil.
5. **Roky 2019–2022 doplnit: ANO** (dalších 35 cest) — a stejně tak KAŽDÝ další rok,
   který učitel přidá („další roky co přidám taky ano").
6. **HLÍDAČ NOVÝCH FOTEK** (nové zadání): lokální model má při zapnutém počítači sám
   zjistit, že přibyly nové fotky, a začít dělat mapu bez vyzvání. Tedy LaunchAgent
   v režimu DOHÁNĚČ (hodinové buzení, práce při první příležitosti) nad
   `body_z_fotek.py` + `stare_cesty.py`; sleduje složku
   `Cestovatelský deník/Dřívější dovolené` (vizitky) a čekárnu.
   Souvisí: učitel chtěl automat i pro `zpracuj_rucni_vklad.py` (dosud se pouští ručně).

Zbývá z předchozího: 9 videí (.MOV) a 6 fotek bez EXIF, ze kterých se GPS zatím nečte
(u videí jde doprogramovat). Přehled všech 43 cest je v `Cestovatelský deník/KE-SCHVALENI.md`.

**Pozn.:** učitel psal část zadání do jiné session; tato (hlavní) ho převzala.
Práce druhé session je commitnutá (`1898a08`), nic se neztratilo.


## ⏩ KDE POKRAČOVAT (29. 7. 2026 večer — úkoly učitele k deníku: 1 a 2 HOTOVÉ, 3 běží)

1. ✅ **Mapa roku začíná doma** — data roku mají nový volitelný bod `domov`
   (`jižní Čechy`, x 344.9 / y 351.7, spočteno stejnou projekcí jako `trasa_uvod.py`).
   Kreslí se modrý domeček, trasa z něj vychází a započítá se do výřezu celkové mapy
   (2025 i 2026). Nasazeno, ověřeno na živém webu.
2. ✅ **U místa jen JEHO video** — mřížka „Videa z cesty" se při přiblížení na místo
   skryje (viditelná jen u celkové mapy); u karty místa je nově náhled jeho videa.
   Ověřeno v DOM: po kliknutí na Landshut mřížka skrytá, u každé viditelné karty 1 video.
3. ✅ **Fotogalerie u míst 2026** — kliknutí na náhled fotku zvětší přes celou obrazovku
   (šipky, klávesnice, Esc). Kontrola anonymizace všech 154 fotek 2026 doběhla (0 nálezů
   u 150, 4 fotky vyřazeny), nový automat `Omega/skripty/vyber_fotky_na_web.py` vybral
   **104 fotek ze 150** (série pozná z blízkého času + podobnosti popisu bge-m3, vyhrává
   nejostřejší dle variance Laplaciánu), učitel je schválil a jsou nahrané v R2;
   `galerie:` zapojeno u 6 míst 2026.

**Další věci hotové 29. 7. večer (zadání učitele během práce):**
- **Chamrousse u Livet-et-Gavet** — spaní u sjezdovek, olympijský sjezd mužů 1968 na trati
  Casserousse (zároveň 28. MS), stání Place des Niverolles (park4night 20 €/24 h).
  POZOR na past: složky fotek jsou pojmenované podle reverzního geokódování, ale GPS
  v EXIF ukazuje jinam — fotky „Vaulnaveys" i „Livet-et-Gavet" jsou obě z Chamrousse
  (1680–1800 m), učitel to vysvětlil: fotí se i cestou autem a na výletech.
- **Frangy** — přespání u vinaře 10 €/os., elektřina 6 €, voda 4 € (z vlastní návštěvy).
  Nové pole `overenoNaMiste` v typu `Stellplatz`: u vlastních cen se ukazuje hláška
  „platily při naší návštěvě, dnes mohou být jiné", u dohledaných „jen orientační".
- **Vlaječky v rozcestníku mapy** (položky nesou `zeme`, z toho `vlajky`).
- **Sloučeny dvě složky Geisingen** (25 fotek z `⁨Geisingen⁩, 8.7. 2026` s neviditelnými
  znaky do `Geisingen_DE`), cesty ve stavech obou automatů přepsány.

- **Automat na OPRAVY nálezů anonymizace** (`Omega/skripty/oprav_anonymizaci.py`) — učitel:
  „když to můžeš rozmazávat ve smyčce, můžeš to i opravovat". Z 5 nálezů: 1 opraven
  (SPZ Geisingen — citlivější kaskáda našla 2 značky), 3 uzavřeny jako PLANÝ POPLACH
  a 1 zůstal učiteli (čitelná SPZ na `Vaulnaveys 13-36-45`).
  **Poučení, které stojí za zapamatování:** vision model se u „zbytečného rozmazání"
  plete — rozostřené pozadí fotky mu splývá s rozmazáním od anonymizace, takže odpoví
  ANO i na fotku, kde se nerozmazalo vůbec nic. Proto o planém poplachu rozhoduje
  MĚŘENÍ, ne model: (a) liší se výsledek od originálu (< 0,5 = nic rozmazané),
  (b) podobnost tváře s referencemi a jak velkou část snímku zabírá (< 0,33 a < 2 %
  = cizí drobná postava, rozmazaná správně). Naměřeno: Schongau rozdíl 0,22;
  Vaulnaveys tváře 0,24 / 0,05 % a 0,16 / 0,62 %.
  **Past:** `cv2`/`insightface` jsou jen v `Omega/skripty/venv/bin/python3`.
- **Fotky na webu: 106** (104 schválených + 2, které byly planý poplach). Nahrávání
  jednou spadlo na chybu Cloudflare 520 uprostřed Livet-et-Gavet — doplněno dávkou
  jen chybějících fotek; po nahrávání VŽDY porovnat počty s výběrem.

**ČEKÁ NA UČITELE:** (a) fotka s čitelnou SPZ (`Vaulnaveys 13-36-45`) — VideoAutomat ji
mezitím uklidil, zůstala jen v `.pred-opravou/`, na web nešla; (b) jméno vinařství
ve Frangy (fotky ceníku jsou v knihovně Fotek, kam Claude nesmí — stačí export na Plochu);
(c) rozhodnutí, jestli pustit anonymizaci na 461 fotek v čekárně a doplnit na web místa
23.–28. 7. (Bourg-d'Oisans, Riez, Saint-Tropez, Le Lavandou…); (d) zvážit LaunchAgent
pro `zpracuj_rucni_vklad.py`.

Pak teprve pokračovat simulacemi z auditu (seznam níže).

**Nové 29. 7. večer — deník (zadání učitele během práce):**
- `Omega/skripty/body_z_fotek.py` — z „vizitkové" fotky (jedna fotka z dřívějšího výletu
  ve sdíleném albu) udělá bod na mapě: GPS + datum → poloha (projekce jako trasa_uvod.py),
  jméno místa z Nominatimu, návrh videa z kanálu podle názvu a roku → KE-SCHVALENI.md.
  Vizitku pozná podle ROKU (jiný rok než probíhající cesta). Otestováno: 5 bodů z čekárny,
  Col d'Ornon vyšel 272,7/398,1 shodně s ručním výpočtem.
- **Čekárna čeká 7 dní** (`CEKACI_DNY = 7` v pipeline_sdilene.py) od poslední fotky místa,
  ne 14, jak učitel předpokládal — plus KLID_HODIN. Fotky z 26.–28. 7. půjdou ~4. 8.
- **`zpracuj_rucni_vklad.py` NEBĚŽÍ SÁM** (není v LaunchAgentu) — 29. 7. tam leželo
  22 nezpracovaných videí z Bourg-d'Oisans (24. 7., den etapy Tour) a Le Lavandou;
  spuštěno ručně, roztříděno do fotky-puvodni. Zvážit hodinový LaunchAgent.
- **Tour de France 2026: tři etapy.** 17. a 18. 7. dvě etapy u Ballon d'Alsace
  (13. Dole–Belfort, 14. Mulhouse–Le Markstein se stoupáním na Ballon d'Alsace),
  24. 7. **Col d'Ornon** (19. etapa Gap–Alpe d'Huez) — přijeli den předem a spali
  na silnici; nové místo na webu. Zjištěno z GPS v EXIF fotek.
- **V čekárně čeká 461 fotek** z míst, o kterých web neví: Bourg-d'Oisans, Riez,
  Saint-Bonnet-en-Champsaur, Sainte-Maxime, Saint-Tropez, Gassin, Le Lavandou (23.–28. 7.).

_Starší sekce „KDE POKRAČOVAT“ jsou v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — nečtou se automaticky._

## Fronta nápadů (seřazeno podle priority)

### Kandidáti na simulace (NOVÝ audit temata.ts, 28. 7. 2026 — kolo 38; zásoba na měsíc)

Z 64 fyzikálních podtémat bez interakce vybráno 12 s jevem, který jde ANIMOVAT či OVLÁDAT:
1. [x] **F7 treci-sila** — HOTOVO v kole 39 (TreniSimulace: led/dřevo/beton, hystereze
   klidové × smykové, vše celé N).
2. [x] **F7 archimeduv-zakon** — HOTOVO v kole 40 (ArchimedesSimulace: siloměr ve 3 fázích,
   4 materiály × 3 kapaliny, vše celé N).
3. [x] **F8 tepelna-vymena-a-teplo** — HOTOVO v kole 41 (KalorimetrSimulace: generátor úloh
   s celými výsledky, bilance odevzdané=přijaté teplo).
4. [x] **F8 pohybova-a-polohova-energie + zakon-zachovani** — HOTOVO v kole 42
   (SkateparkSimulace na obou stránkách: ideální rampa × se třením, teplo Q).
5. [x] **F9 elektromagneticka-indukce** — HOTOVO v kole 43 (IndukceSimulace: 4 závislosti
   z výkladu, voltmetr ±20 dílků, „magnet stojí = nic").
6. [x] **F9 elektromagnet** — HOTOVO v kole 44 (ElektromagnetSimulace: proud × závity ×
   jádro = sponky, vypnutí, prohození pólů).
7. [x] **F7 optika-rovinneho-zrcadla** — HOTOVO v kole 48 (RovinneZrcadloSimulace:
   osová souměrnost, zákon odrazu, praporek + zrcadlový nápis AMBULANCE).
8. [x] **F8 spalovaci-motory** — HOTOVO v kole 49 (SpalovaciMotorSimulace: řez motorem —
   píst + ojnice + klika + ventily, klik na dobu = póza s popisem, ▶ celý cyklus jako čistá
   funkce času, zážehový × vznětový mění svíčku/vstřikovač i popisy).
9. [x] **F9 polovodice-typu-n-a-p-dioda** — HOTOVO v kole 50 (DiodaSimulace: PN přechod
   s hradlovou vrstvou, napětí −5…+5 V po 1 V, práh LED 2 V, celé mA přes rezistor 200 Ω,
   V-A charakteristika s pohyblivým bodem, tlačítko ⇄ otoč zdroj).
10. [x] **F7 atmosfericky-tlak** — HOTOVO v kole 51 (BarometrSimulace: balón 0–8000 m
    po 1000, Torricelliho rtuťový barometr, celé hPa dle standardní atmosféry — kotva
    1013 hPa = 760 mm u moře, % normálu, místa Ještěd→Everest).
11. [x] **F7 oko-vady-oka** — HOTOVO v kole 52 (OkoSimulace: řez okem se sítnicí, 3 stavy
    oka, ohnisko před/na/za sítnicí, brýle rozptylka/spojka vrací obraz na sítnici, panel
    „co vidí" s rozmazáním přes SVG filtr, strom=dálka × kniha=blízko).
12. [x] **F9 vedeni-proudu-v-kapalinach** — HOTOVO v kole 53 (ElektrolyzaSimulace: destilovaná
    voda nevede × roztok NaCl vede, ionty Na⁺→katoda / Cl⁻→anoda se šipkami, žárovka dle
    proudu, napětí 0–12 V po 2 V → celé A (R=2 Ω), režim pokovování lžičky Au⁺ s vrstvou dle I).
Záměrně vynecháno: shrnutí/opakování, čistě výkladová témata (úvod do fyziky, zdroje energie,
vesmír má simulaci soustavy) a témata s hotovou příbuznou simulací.

### Další úkoly
- [ ] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [ ] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [ ] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
- **Hermes — sjednocení návodů (audit z noci 29. 7.):** `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md`
  — Hermes JE nainstalovaný (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly.
  Návrh: jeden HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md" (Hermes
  md soubory pro Clauda číst UMÍ). Rozhodnutí ráno.
- **Automatický restart samostatného režimu po obnově tokenů:** šlo by naplánovanou úlohou
  (cron v danou hodinu spustí novou session). Nová trvalá konfigurace → jen se souhlasem.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.

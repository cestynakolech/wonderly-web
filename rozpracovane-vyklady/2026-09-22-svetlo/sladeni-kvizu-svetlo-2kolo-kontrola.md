# F7 Světlo a jeho šíření — kvízy, NEZÁVISLÁ KONTROLA 2. KOLA

Kontroloval: nezávislý kontrolor (čerstvý kontext, nevěděl, jak bloky vznikly), 22. 9. 2026.
Podklad porovnání: `src/data/kvizy.ts` (řádky 3251–3342) × výklady z `src/data/temata.ts`
(čteno přes `node podtema.mjs … get fyzika/7-rocnik/svetlo-a-jeho-sireni/<podtema>`).

## Co bylo ověřeno tvrdou kotvou

- **Počet otázek: 4 × 21** (`node testy/vypis-kviz.mjs <blok>`) — všechny bloky sedí na závazný cíl.
- **Délková nápověda**: vlastní přepočet délek všech 84 trojic (znaky, ne bajty).
  Největší náskok správné odpovědi je **7 znaků** (lom Q9, lom Q11, stín Q4) — pod prahem 10.
  Správná odpověď je nejdelší jen v 1/21, 3/21, 4/21, 3/21 případech, průměry délek
  správná × nesprávná: 14,6×15,1 · 20,6×19,3 · 15,7×14,5 · 18,3×17,7. **Bez nálezu.**
- **Brány** `node testy/uniky.mjs` a `node testy/delky.mjs` na těchto blocích mlčí — nálezy níže
  jsou tedy takové, které brány nevidí (skloňování, přeformulované úniky, křížení mezi otázkami).
- **Přepočty čísel**: 300 000 : 1,5 = 200 000 km/s ✔ · 150 000 000 : 300 000 = 500 s = 8 min 20 s ✔ ·
  300 000 : 1,33 = 225 564 ≈ 225 000 km/s ✔ · 300 000 : 2,42 = 123 967 ≈ 125 000 km/s ✔ ·
  Slunce/Měsíc 400,7× větší a 389× dál ≈ „400× a 400×" ✔ · Draperův bod 798 K = **525 °C** ✔.
- **Teplota povrchu Slunce 5 500 °C je fyzikálně SPRÁVNĚ** (5 772 K = 5 499 °C). Pokud je někde
  vedená jako „chyba PDF", je to falešný poplach — v kvízu (světlo Q5) ji NEOPRAVOVAT.
- Správná odpověď je ve všech 84 otázkách na prvním místě, právě jedna správná, žádná
  otázka nemá dvě obhajitelné odpovědi (prověřeno položku po položce; k hraničnímu
  případu stín Q14 „jen svářečským sklem" viz poznámka u nálezu S-8).

**Celkem 29 nálezů: světlo-jeho-zdroje 9 · odraz-světla 7 · lom-světla 7 · stín-fáze-Měsíce 6.**
Z toho ZÁVAŽNÉ 5, DROBNÉ 24. Čísla otázek = pořadí ve výpisu `vypis-kviz.mjs`.

---

## A) svetlo-jeho-zdroje (řádky 3252–3272) — 9 nálezů

### A-1 [ZÁVAŽNÉ] Q16 (ř. 3267) — únik odpovědi přes slovní základ „červen-"
Zadání „Které záření leží hned za **červenou** barvou…" obsahuje kořen správné odpovědi
**infra-červené**. Kdo nezná látku, trefí ji jen shodou slov. Brána `uniky.mjs` to nevidí.
**Návrh:**
`{ text: 'Které neviditelné záření vnímáme jako teplo a snímají ho termokamery?', odpovedi: ['infračervené', 'ultrafialové', 'rentgenové'], vysvetleni: 'IR záření leží hned za červenou barvou spektra; používají ho dálkové ovladače a vidí ho hadi.' },`

### A-2 [ZÁVAŽNÉ] Q17 (ř. 3268) — týž únik přes „fialov-"
Zadání „…leží za **fialovou** barvou" prozradí **ultra-fialové**.
**Návrh:**
`{ text: 'Které neviditelné záření v malém množství opaluje a ve větším škodí kůži i očím?', odpovedi: ['ultrafialové', 'infračervené', 'radiové'], vysvetleni: 'UV záření leží za fialovým koncem spektra; opalování ano, ale dlouhé vystavení poškodí kůži i oči.' },`

### A-3 [DROBNÉ] Q21 (ř. 3272) — únik „stejnorodé" → „stejné"
Zadání „Co je **stejnorodé** (homogenní) prostředí?" nese základ správné odpovědi
„má všude **stejné** vlastnosti".
**Návrh (mění se jen zadání):**
`{ text: 'Jaké prostředí označíme jako homogenní?', odpovedi: ['má všude stejné vlastnosti', 'mění svou hustotu podle výšky', 'vůbec nepropouští světlo'], vysvetleni: 'Homogenní je třeba čirá voda nebo sklo; atmosféra homogenní není.' },`

### A-4 [ZÁVAŽNÉ] Q6 (ř. 3257) — vysvětlení tvrdí fyzikální nesmysl o plošném zdroji
„Z bodového zdroje se rozbíhají; **z plošného jsou rovnoběžné**." Plošný zdroj (zářivky na
stropě, TV) vysílá světlo do všech stran — rovnoběžný svazek vzniká vzdáleností zdroje
(Slunce), ne velikostí plochy. Táž věta je i ve výkladu, kde si navíc protiřečí s větou
„Ve velké vzdálenosti od bodového zdroje se rozbíhavost zmenšuje". Chyba pochází z podkladu.
**Návrh (kvíz):**
`vysvetleni: 'Z bodového zdroje se paprsky rozbíhají do všech stran; prakticky rovnoběžné jsou až hodně daleko od zdroje — třeba sluneční paprsky u Země.'`
**Vázaná oprava výkladu** (musí udělat exekutor výkladů, jinak se rozejde řetěz):
větu „Plošný zdroj má velkou svítící plochu … a jeho paprsky jsou rovnoběžné." nahradit
„Plošný zdroj má velkou svítící plochu (řada zářivek na stropě, TV obrazovka) — chová se
jako mnoho bodových zdrojů vedle sebe, proto za překážkou vzniká i polostín."

### A-5 [DROBNÉ] Q11 (ř. 3262) — distraktor „asi 400 000 km/s" je rychlejší než světlo
Věrohodný distraktor se vylučuje s Q9 téhož bloku („nejvyšší rychlost ve vesmíru je
300 000 km/s") — žák ho škrtne bez znalosti látky.
**Návrh:** `odpovedi: ['asi 200 000 km/s', 'asi 300 000 km/s', 'asi 100 000 km/s']`

### A-6 [DROBNÉ] Q19 (ř. 3270) — distraktor popírá zadání otázky
Zadání zní „**Proč vidíme** neprůhledné předměty…", možnost „vůbec je nevidíme" tedy nemůže
platit; je to nápověda. (OBSAH-PRAVIDLA § 4: nesmyslná možnost je nápověda.)
**Návrh:** `odpovedi: ['odrážejí světlo do očí', 'samy vyzařují vlastní teplo', 'vysílá k nim paprsky naše oko']`
(třetí možnost je doložená žákovská představa, tedy věrohodná; délky 21 / 26 / 27 znaků.)

### A-7 [DROBNÉ] Q13 a Q14 (ř. 3264–3265) — správná odpověď má jiný podmět než distraktory
Zadání „Co dělá se světlem průhledné **prostředí**?" — distraktory mají podmět prostředí
(„pohlcuje…", „odráží…"), jen správná odpověď má podmět světlo („prochází…"). Formální
odlišnost je sama o sobě vodítko a navíc je to gramaticky nesourodé.
**Návrh Q13:** `odpovedi: ['propouští ho bez rozptylu', 'pohlcuje všechno světlo', 'světlo jen odráží zpět']`
**Návrh Q14:** `odpovedi: ['propouští ho, ale rozptýlené', 'nepropustí vůbec žádné světlo', 'zrcadlí okolí jako zrcadlo']`

### A-8 [DROBNÉ] Q7 (ř. 3258) — vysvětlení připisuje ostrý stín přímočarosti
„Paprsky jdou rovně — proto vznikají **ostré** stíny." Ostrost hranice stínu nezávisí na
homogenitě, ale na velikosti zdroje — a stín Q4 učí přesně to („ostrý stín bez polostínu
vzniká u bodového zdroje"). Dvě místa webu tvrdí o téže věci dvě různé příčiny.
**Návrh:** `vysvetleni: 'Paprsky jdou po přímkách — proto se za překážku nedostanou a vzniká stín.'`

### A-9 [DROBNÉ] Q7 × stín Q1 — křížový únik mezi sousedními bloky téhož celku
Stín Q1 má správnou odpověď doslova „**světlo se šíří přímočaře**"; zadání světlo Q7 zní
„Jak se světlo **šíří** ve stejnorodém prostředí?" se správnou odpovědí „přímočaře".
Pravidlo zakazuje prozrazení odpovědi i v sousedním bloku.
**Návrh (mění se světlo Q7, stín Q1 zůstává):**
`{ text: 'Kudy se světlo šíří v čirém skle nebo ve vodě?', odpovedi: ['po přímkách', 'po obloucích', 'klikatě'], vysvetleni: 'Paprsky jdou po přímkách — proto se za překážku nedostanou a vzniká stín.' },`

---

## B) odraz-svetla (řádky 3275–3295) — 7 nálezů

### B-1 [ZÁVAŽNÉ] Q4 (ř. 3278) — kruhová otázka: odpověď je opis zadání
„Co je **kolmice dopadu**?" → „**kolmice v bodě dopadu**". Odpověď neříká nic navíc a obě
klíčová slova jsou v zadání (zákaz kruhové otázky, OBSAH-PRAVIDLA § 4).
**Návrh:**
`{ text: 'Od čeho měříme úhel dopadu a úhel odrazu?', odpovedi: ['od kolmice dopadu', 'od roviny zrcadla', 'od dopadajícího paprsku'], vysvetleni: 'Obě čísla měříme od pomocné kolmé čáry v místě, kde paprsek dopadl na plochu.' },`

### B-2 [DROBNÉ] Q17 (ř. 3291) — vysvětlení prozrazuje odpověď na B-1
„Oba úhly dosazujeme ve stupních (°) a **měříme je od kolmice dopadu**." Po opravě B-1 by to
byl přímý únik; i dnes prozrazuje Q4.
**Návrh:** `vysvetleni: 'Velikost úhlu dopadu i úhlu odrazu zapisujeme ve stupních (°).'`

### B-3 [ZÁVAŽNÉ] Q9 × Q18 (ř. 3283 a 3292) — zadání jedné otázky prozrazuje odpověď druhé
Q9 „K čemu je v místnosti dobrý **rozptyl** světla?" říká žákovi, co dělá světlo v místnosti;
Q18 „**Světlá stěna místnosti** světlo hlavně…" má správnou odpověď „**rozptyluje**".
**Návrh (mění se Q9):**
`{ text: 'K čemu je dobré, že se světlo od stěn odráží do všech stran?', odpovedi: ['vidíme i věci ve stínu', 'všude jsou ostré stíny', 'světlo se úplně ztratí'], vysvetleni: 'Odražené světlo od stěn osvětlí i místa, kam zdroj přímo nesvítí.' },`

### B-4 [DROBNÉ] Q8 × Q10 (ř. 3282 a 3284) — zrcadlová dvojice se stejnou nabídkou
Obě otázky mají tytéž dvě klíčové možnosti jen prohozené („rozptýlí se do stran" /
„zůstane rovnoběžný"). Kdo uhodne jednu, má druhou zdarma.
**Návrh (mění se Q10):**
`{ text: 'Jak se od zrcadla odrazí svazek rovnoběžných paprsků?', odpovedi: ['zůstane rovnoběžný', 'sbíhá se do jednoho bodu', 'rozbíhá se do všech stran'], vysvetleni: 'Hladká rovinná plocha odráží spořádaně — vzniká zrcadlový obraz.' },`

### B-5 [DROBNÉ] Q15 (ř. 3289) — distraktor „je studená" není fyzikální možnost
Nesouvisí s otázkou, proto je nápovědou.
**Návrh:** `odpovedi: ['vlny světlo rozptylují', 'voda všechno světlo pohltí', 'vlny světlo lámou pod hladinu']`

### B-6 [DROBNÉ] Q6 (ř. 3280) — distraktor „zmizí uvnitř zrcadla"
Světlo nemůže „zmizet"; nevěrohodné.
**Návrh:** `odpovedi: ['vrátí se stejnou cestou', 'odrazí se někam do strany', 'projde zrcadlem na druhou stranu']`

### B-7 [DROBNÉ] Q18 (ř. 3292) — distraktor „láme" u neprůhledné stěny
Lom na neprůhledné zdi nastat nemůže; navíc lom se probírá až v dalším podtématu.
**Návrh:** `odpovedi: ['rozptyluje', 'pohlcuje do sebe', 'odráží jen jedním směrem']`

---

## C) lom-svetla (řádky 3298–3318) — 7 nálezů

### C-1 [DROBNÉ] Q2 × Q4 (ř. 3299 a 3301) — zrcadlová dvojice, navíc již pokrytá Q6/Q7
Q2 „Kdy nastává lom KE kolmici? → z řidšího do hustšího" a Q4 „Kdy nastává lom OD kolmice?
→ z hustšího do řidšího" mají identickou nabídku jen prohozenou; totéž ještě jednou zkouší
Q6 (vzduch → sklo) a Q7 (voda → vzduch). Čtyři z 21 otázek na jediný fakt.
**Návrh — Q4 nahradit jevem, který výklad má a kvíz nepokrývá:**
`{ text: 'Jak vypadá sluneční kotouč při západu Slunce?', odpovedi: ['zdá se zploštělý', 'zdá se protažený do výšky', 'vypadá úplně stejně'], vysvetleni: 'Světlo se v atmosféře láme, a proto se nízko nad obzorem kotouč jeví zploštělý.' },`

### C-2 [DROBNÉ] Q3 × Q5 (ř. 3300 a 3302) — druhá zrcadlová dvojice („menší" / „větší")
Sama o sobě obhajitelná, ale spolu s C-1 dělá z pěti otázek jedno učivo.
**Návrh — Q5 nahradit doloženým jevem z výkladu:**
`{ text: 'Proč vypadá bazén mělčí, než doopravdy je?', odpovedi: ['světlo se láme na hladině', 'voda dno nadzvedává', 'dno je natřené světlou barvou'], vysvetleni: 'Lom na hladině posune obraz dna vzhůru — bazén se zdá mělčí, než je.' },`
(Pokud se exekutor rozhodne ponechat C-2 beze změny, C-1 je z těch dvou důležitější.)

### C-3 [DROBNÉ] Q9 (ř. 3306) — chybí podmínka „z hustšího do řidšího", věta je tak nepravdivá
„Co nastane při větším úhlu dopadu, než je mezní úhel? → úplný odraz" platí jen na cestě
z opticky hustšího prostředí do řidšího; pro vzduch → sklo mezní úhel neexistuje.
**Návrh:**
`{ text: 'Paprsek jde z vody do vzduchu pod větším úhlem, než je mezní. Co se stane?', odpovedi: ['úplný (totální) odraz', 'lom ke kolmici', 'pohlcení'], vysvetleni: 'Světlo se už ven nezlomí, zůstane „uvězněno" ve vodě a odrazí se zpět.' },`

### C-4 [DROBNÉ] Q10 (ř. 3307) — kostrbaté zadání pro 7. ročník
„Při přechodu z kterého do kterého prostředí může nastat úplný odraz?"
**Návrh:** `text: 'Kdy může nastat úplný odraz?'` (odpovědi i vysvětlení beze změny)

### C-5 [DROBNÉ] Q20 (ř. 3317) — distraktory jsou jen přesunutá desetinná čárka
„asi 3,30" a „asi 13,3" neodpovídají žádné látce (n = 13,3 by znamenalo rychlost 22 500 km/s).
**Návrh:** `odpovedi: ['asi 1,33', 'asi 1,00', 'asi 2,50']` — jednička je doložená hodnota
vzduchu z výkladu, 2,5 je blízko diamantu, oba tedy věrohodné.

### C-6 [DROBNÉ] Q12 (ř. 3309) — únik přes slovní základ „lom-/zlom-"
Zadání „Proč vypadá brčko ve vodě **zlomené**?" nese základ odpovědi „paprsky se **lámou**".
**Návrh:** `text: 'Proč vidíme ponořenou část brčka posunutou do strany?'` (odpovědi beze změny)

### C-7 [DROBNÉ] Q11 (ř. 3308) — „vlákna" bez přívlastku + náskok délky 7 znaků
Samotné slovo „vlákna" si žák spojí s vláknem žárovky (to je v sousedním bloku).
**Návrh:** `odpovedi: ['optická vlákna a hranoly', 'žárovky a zářivky', 'stínidla a clony']`
(délky 24 / 17 / 16 → beze změny náskoku, ale významově jednoznačné; vysvětlení ponechat)

---

## D) stin-faze-mesice (řádky 3321–3341) — 6 nálezů

### D-1 [ZÁVAŽNÉ] Q16 (ř. 3336) — „krvavý Měsíc" vysvětlen OHYBEM místo lomu a rozptylu
`vysvetleni: '„Krvavý Měsíc" — červené světlo se v atmosféře Země **ohne** do stínu.'`
Ohyb (difrakce) to není; výklad sám správně říká „světlo se přitom **láme a rozptyluje**
v zemské atmosféře". Kvíz tedy učí jinou příčinu než stránka nad ním — a je to jedna
z doložených chyb podkladu, která přežila 1. kolo.
**Návrh:** `vysvetleni: '„Krvavý Měsíc" — atmosféra Země sluneční světlo láme a rozptyluje, do stínu propustí hlavně červenou barvu.'`

### D-2 [DROBNÉ] Q5 (ř. 3325) — gramatická chyba v odpovědi
„Svítí **Měsíc** vlastním světlem? → ano, svítí **samo**" — Měsíc je rod mužský.
**Návrh:** `odpovedi: ['ne, jen odráží', 'ano, svítí sám', 'jen při úplňku']`

### D-3 [DROBNÉ] Q17 (ř. 3337) — „Ve fázi zatmění … je Měsíc ve fázi…"
Slovo „fáze" ve dvou různých významech v jedné větě; pro 7. ročník matoucí.
**Návrh:** `text: 'Při zatmění Slunce je Měsíc ve fázi…'` (odpovědi i vysvětlení beze změny)

### D-4 [DROBNÉ] Q17 × Q18 (ř. 3337 a 3338) — zrcadlová dvojice (nov ↔ úplněk)
Obě otázky mají tutéž nabídku prohozenou; navíc „couvání" v Q18 není název fáze
(fáze je poslední čtvrť). Výklad má několik nepokrytých údajů, kterými jde Q18 nahradit.
**Návrh — Q18 nahradit:**
`{ text: 'Kolikrát do roka zhruba nastane zatmění Měsíce?', odpovedi: ['dvakrát až třikrát', 'ani jednou', 'skoro každý měsíc'], vysvetleni: 'Průměrně dvakrát až třikrát, nejvýše pětkrát — někdy se ale čeká i několik let.' },`
(Pokud exekutor Q18 zachovat chce, pak alespoň `odpovedi: ['úplňku', 'novu', 'poslední čtvrti']`.)

### D-5 [DROBNÉ] Q6 (ř. 3326) — odpověď neodpovídá znění výkladu + nevěrohodný distraktor
Výklad příčinu fází formuluje jako „vidíme pokaždé jinak velkou osvětlenou část", kvíz jako
„vidíme ho z různých úhlů" (neurčité). Distraktor „Měsíc se nafukuje a splaskává" je nesmysl,
zatímco doložená žákovská představa „zakrývá ho stín Země" v nabídce chybí.
**Návrh:**
`{ text: 'Proč se tvar Měsíce na obloze mění?', odpovedi: ['vidíme jinak velkou osvětlenou část', 'zemský stín ho každou noc zakrývá', 'pořád ho zakrývají mraky'], vysvetleni: 'Jak Měsíc obíhá Zemi, díváme se na jeho osvětlenou polovinu z jiné strany.' },`
(délky 33 / 32 / 24 znaků — náskok 1)

### D-6 [DROBNÉ] Q3 a Q1 (ř. 3323 a 3321) — matoucí, resp. nevěrohodný distraktor
Q3 „Co je polostín?" nabízí „stín, který vrhá Měsíc" — jenže Měsíc při zatmění Slunce
opravdu vrhá stín **i polostín** (výklad: „Kdo stojí jen v polostínu Měsíce…"), takže
distraktor je napůl pravdivý. Q1 nabízí „světlo se bojí velké tmy" — to není možnost, ale vtip.
**Návrh Q3:** `odpovedi: ['světlo z části zdroje', 'stín za průsvitným tělesem', 'stín v pravé poledne']`
**Návrh Q1:** `odpovedi: ['světlo se šíří přímočaře', 'světlo se kolem tělesa ohýbá', 'těleso samo vyrábí světlo']`
(„ohýbá se kolem překážky" je doložená žákovská představa — věrohodné a poučné.)

---

## Co NENÍ nález (aby se to znovu neotvíralo)

- 5 500 °C u Slunce i 525 °C u počátku červeného žhnutí jsou správné (5 772 K, 798 K).
- 433 světelných let k Polárce, 29,5 dne cyklu fází, 400× / 400× u Slunce a Měsíce,
  225 000 / 200 000 / 125 000 km/s — vše souhlasí s výkladem i se skutečností.
- Desetinná čísla 1,5 a 1,33 u indexu lomu nejsou porušením pravidla o celých číslech:
  výsledek výpočtu (200 000 km/s) celý je a jiné hodnoty index lomu mít nemůže.
- Počet otázek 21 ve všech čtyřech blocích sedí; pořadí „správná první" drží všech 84 otázek.

## ZAPRACOVÁNO 23. 9. 2026

Všech 29 nálezů (5 ZÁVAŽNÉ, 24 DROBNÉ) zapracováno přesně dle návrhů do `src/data/kvizy.ts`:
A-1 až A-9, B-1 až B-7, C-1 až C-7, D-1 až D-6. A-8 a A-9 sloučeny do jedné úpravy Q7
(návrh A-9 už obsahoval opravu z A-8). D-1 (krvavý Měsíc — ohyb → lom a rozptyl) opraveno.
Vázaná oprava výkladu k A-4 (plošný zdroj) NENÍ součástí této úlohy — patří exekutorovi
výkladů, zapsáno zvlášť. Ověřeno: `node testy/uniky.mjs` 0 úniků, `node zkontroluj.mjs`
0 chyb, `npm run build` 481 stránek OK, `node testy/vypis-kviz.mjs` 21/21 ve všech
4 blocích. Commit viz git log `src/data/kvizy.ts`.

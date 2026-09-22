## OBSAH
<h2>Odraz světla, zákon odrazu</h2>
<p>Dopadne-li světelný paprsek na rozhraní dvou prostředí, může nastat <strong>odraz</strong>, <strong>lom</strong> nebo <strong>pohlcení</strong> světla. Prostředí, která světlo nepropouštějí ani nepohlcují, ho odrážejí.</p>

<h3>Odraz na různých površích</h3>
<ul>
<li><strong>nerovná plocha</strong> → rozptyl světla, díky němu vidíme i do stínu (stěny místnosti)</li>
<li><strong>rovná lesklá plocha</strong> → svazek zůstane rovnoběžný (zrcadlo, klidná hladina, hladký plech)</li>
<li><strong>dvě rovnoběžná zrcadla naproti sobě</strong> → obraz se odráží mezi nimi sem a tam a vzniká nekonečná řada zmenšujících se obrazů</li>
</ul>

<h3>Odrazka na kole</h3>
<p>Odrazka je poskládaná z drobných <strong>koutů</strong> — tří na sebe kolmých plošek jako roh krabice. Paprsek se v koutu odrazí třikrát a vyjde <strong>zpátky přesně tím směrem, odkud přišel</strong>. Proto odrazka „svítí" právě řidiči, jehož světla na ni dopadla. Stejně fungují i patníky u silnice.</p>

<h3>Zákon odrazu</h3>
<p><strong>Úhel dopadu</strong> α je úhel mezi dopadajícím paprskem a kolmicí dopadu. <strong>Úhel odrazu</strong> α′ je úhel mezi odraženým paprskem a touž kolmicí.</p>
<p><strong>„Úhel odrazu je roven úhlu dopadu."</strong> — zapisujeme α' = α.</p>
<ul>
<li>oba úhly měříme <strong>od kolmice dopadu</strong> (kolmice k ploše v bodě dopadu)</li>
<li>dopadající i odražený paprsek leží <strong>v jedné rovině</strong></li>
<li>kolmici umíme sestrojit i pro zakřivené plochy — u koule je to spojnice středu s bodem dopadu</li>
</ul>

<h3>Zrcadla</h3>
<p>Zrcadlo má hladký lesklý povrch — vyleštěný kov chráněný sklem. Podle tvaru je <strong>rovinné, kulové, nebo válcové</strong>.</p>
<p>Podobně se chová i klidná hladina vody nebo okenní tabule: část světla se odrazí a část projde dál.</p>
<p>Zrcadlo v nákresu kreslíme jako čáru podle tvaru odrazné plochy; stranu, kam světlo neprojde, <strong>zašrafujeme</strong>.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Paprsek dopadne na zrcadlo pod úhlem 30°. Podle zákona odrazu α′ = α se odrazí pod stejným úhlem: α′ = 30°.</p>
<p>Když paprsek dopadne na zrcadlo kolmo (úhel dopadu 0°), odrazí se také pod úhlem 0° — vrátí se zpátky stejnou cestou.</p>

## ZAPIS
```json
{
  "vzorec": "α′ = α",
  "jednotky": [
    "úhel dopadu — značíme α, jednotka stupeň (°)",
    "úhel odrazu — značíme α′, jednotka stupeň (°)",
    "oba úhly dosazuj ve stupních (°) a měř je od kolmice dopadu"
  ],
  "vzorecSlovy": "Úhel odrazu se rovná úhlu dopadu.",
  "zakon": "Úhel odrazu je roven úhlu dopadu.",
  "body": [
    "na rozhraní: odraz, lom, pohlcení",
    "co světlo nepropustí ani nepohltí: odrazí se",
    "nerovná plocha → rozptyl světla",
    "rozptyl: vidíme předměty i ve stínu",
    "rovná lesklá plocha → svazek rovnoběžný",
    "dvě zrcadla naproti → nekonečná řada obrazů",
    "odrazka: kout ze 3 plošek, vrátí paprsek zpět",
    "zákon odrazu: α′ = α",
    "úhly měříme od kolmice dopadu",
    "dopadající, odražený paprsek, kolmice: jedna rovina",
    "kolmice jde i pro křivé plochy (u koule: spojnice středu)",
    "zrcadlo: hladký lesklý povrch (kov + sklo); tvary rovinné, kulové, válcové",
    "hladina vody, okenní tabule: část odrazí, část projde",
    "značka zrcadla: čára podle tvaru + šrafování za ní",
    "příklad: dopad 30° → odraz 30° (i 0° → 0°)"
  ]
}
```

## ZDROJE
- Dosavadní blok `svetlo-a-jeho-sireni/odraz-svetla` v `temata.ts` (nazev „Odraz světla, zákon odrazu", interakce `odraz`) — všechny věty, čísla a body zápisu zachovány, jen přeorganizovány podle formátu kontraktu (ZAPIS.body převedeno na telegrafický tvar).
- „Dopadne-li paprsek na rozhraní dvou prostředí, může nastat odraz, lom, nebo pohlcení světla." → PDF str. 1 „Odraz světla, zákon odrazu.pdf" (doslovně: „Dopadne-li světlený paprsek na rozhraní dvou optických prostředí, může nastat odraz světla, lom světla a může dojít i k absorpci světla."), shoda s dosavadním blokem.
- NOVÁ věta „Prostředí, která světlo nepropouštějí ani nepohlcují, ho odrážejí." → PDF str. 1, doslovně: „Optická prostředí, která nepropouští ani nepohlcují světlo, světlo odráží." Dosud na webu chybělo, doplněno.
- OPRAVA (nález 1, ZÁVAŽNÝ, kontrola-odraz-svetla-f7-a.md): ZAPIS.body měl větu „neprůhledná prostředí: světlo odrážejí" — chybělo, ŽE se to týká jen prostředí, která světlo nepropustí ani nepohltí (neprůhledné prostředí ale může světlo i pohltit, PDF 19 str. 9: „pohltí nebo se od něho na povrchu odrazí"). Podle PDF 21 str. 1 opraveno na „co světlo nepropustí ani nepohltí: odrazí se". HOTOVO.
- Rozptyl na nerovné ploše (stěny místnosti, vidíme i do stínu) a rovnoběžný svazek na rovné lesklé ploše (klidná hladina, hladký plech, okenní tabule, zrcadlo) → PDF str. 1, shoda s dosavadním blokem.
- OPRAVA (nález 3): příklady „stěny místnosti" (u rozptylu) a „hladký plech" (u rovné lesklé plochy) z PDF str. 1 doplněny přímo do OBSAH, kde dosud chyběly, ačkoli je ZDROJE jako pokryté uváděly; „okenní tabule" zůstává jako příklad ČÁSTEČNÉHO ODRAZU (ne rozptylu) popsáno v sekci „Zrcadla". HOTOVO.
- „Dvě rovnoběžná zrcadla naproti sobě → obraz se odráží mezi nimi sem a tam, zdánlivě nekonečná řada zmenšujících se obrazů" → jen dosavadní blok `temata.ts`; PDF ani popis prezentace „SVĚTELNÉ JEVY 7" (snímky 35–37) tuto větu neobsahují — ponecháno beze změny, žádný rozpor se zdrojem, jen chybí nová opora.
- „Odrazka na kole" — kout ze tří na sebe kolmých plošek, paprsek se odrazí třikrát a vrátí se přesně odkud přišel, proto svítí řidiči; stejně fungují patníky → jen dosavadní blok `temata.ts`; PDF ani popis prezentace tuto látku neobsahují — ponecháno beze změny.
- Zákon odrazu „Úhel odrazu je roven úhlu dopadu.", α′ = α → PDF str. 3, doslovně: „Úhel odrazu je roven úhlu dopadu." α'= α. Shoda s dosavadním blokem i s popisem prezentace snímek 37 (image33.jpeg: „Úhel odrazu se rovná úhlu dopadu. Odražený paprsek leží v rovině dopadu.").
- OPRAVA (nález 2): definice „Úhel dopadu α: úhel mezi dopadajícím paprskem a kolmicí dopadu" a „Úhel odrazu α´: úhel mezi odraženým paprskem a kolmicí dopadu" (PDF str. 4, doslovně) dosud stály jen v ZAPIS.jednotky — doplněny i do OBSAH sekce „Zákon odrazu" jako první věty, než přijde znění zákona (kontrakt bod A). HOTOVO.
- Kolmice dopadu (kolmice k ploše v bodě dopadu), dopadající a odražený paprsek v téže rovině → PDF str. 4, shoda s dosavadním blokem.
- Měříme vždy od kolmice dopadu, protože kolmici lze sestrojit i pro jiné plochy než rovinné (u kulové plochy je kolmicí spojnice středu s bodem dopadu) → PDF str. 5–6, shoda s dosavadním blokem (bod „kolmici umíme sestrojit i pro zakřivené plochy — u koule je to spojnice středu s bodem dopadu").
- Zrcadla — tělesa s hladkým lesklým povrchem, podle tvaru rovinná/kulová/válcová, vyrobeno z vyleštěné kovové plochy chráněné sklem → PDF str. 2, shoda s dosavadním blokem.
- NOVÁ věta „Podobně se chová i klidná hladina vody nebo okenní tabule: část světla se odrazí a část projde dál." → PDF str. 2, doslovně: „Podobně jako zrcadlo se chová např. klidná hladina vody, okenní tabule, kdy částečně světlo prochází do prostředí a částečně je odraženo." Dosud na webu chybělo, doplněno.
- NOVÁ věta o optické značce zrcadla (čára podle tvaru odrazné plochy, plocha za ní se zašrafuje) → PDF str. 2, doslovně: „Optická značka zrcadla: čára vystihuje tvar odrazné plochy (přímka, část kružnice) a plochu za odraznou plochou, kam světlo neprojde, zašrafujeme." Dosud na webu chybělo, doplněno.
- ZAPIS doplněn o klíč `vzorecSlovy` podle bodu B kontraktu (slovní znění vzorce α′ = α); klíč `zakon` (doslovná citace) i `jednotky` (úhel dopadu, úhel odrazu, věta o dosazování ve stupních) zachovány z dosavadního bloku beze změny.
- OPRAVA (nález 4): ZAPIS.body zkrácen sloučením příbuzných položek — pět bodů o zrcadlech (hladký povrch, tvary, kov+sklo, hladina/tabule, značka) do dvou řádků, dva body o odrazce (kout, návrat paprsku) do jednoho, dva body o kolmici (jde i pro křivé plochy; u koule je spojnice středu) do jednoho; obsah všech sloučených bodů zachován, jen kratší zápis. Výsledných 14 položek (dřív 18) je blíž cíli ~12 bodů z nálezu. HOTOVO.
- OPRAVA (nález 5, VLASTNÍ PŘÍKLAD): doplněna sekce „Pro zvídavé: počítáme" s ukázkou zákona odrazu na celých číslech (dopad 30° → odraz 30°, kolmý dopad 0° → 0°) i odpovídající bod v ZAPIS.body. Čísla nejsou z PDF, jde o ilustrační příklad na už odvozeném vztahu α′ = α. HOTOVO.
- MIMO SCOPE tohoto podtématu: druhy kulových zrcadel (duté, vypuklé — popis prezentace snímek 36) a zobrazování v rovinném zrcadle (popis prezentace snímek 38) patří k samostatným podtématům `rovinne-zrcadlo` (plán 22) a kulová zrcadla (plán 23) ve stejném celku, zde jen zmíněny jako typy zrcadel podle tvaru.
- Soubor `informace-pro-podcast.txt` (tatáž složka) shrnuje stejná fakta jako PDF, žádnou novou látku neobsahuje — použit jen k ověření.

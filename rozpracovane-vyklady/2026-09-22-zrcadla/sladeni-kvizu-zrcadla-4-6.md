# Sladění kvízů s novými výklady — zrcadla-a-cocky, podtémata 4–6 (F7)

Nezávislá kontrola 22. 9. 2026. Podklady: `node podtema.mjs … get fyzika/7-rocnik/zrcadla-a-cocky/<klic>`
(ověřeno, že `obsah` i `zapis` v pracovním stromu `src/data/temata.ts` jsou ZNAK ZA ZNAK shodné
s `vyklad-<klic>-f7.md` — porovnáno skriptem, 3× `true`), kvízy `node testy/vypis-kviz.mjs <klic>`
(3× 21 otázek), délky `node testy/delky.mjs <klic>`, křížové úniky vlastním skriptem.
Do `kvizy.ts` ani `temata.ts` nebylo nic zapsáno.

---

## oko-vady-oka — VERDIKT: NESLADĚNO (10)

### NÁLEZY

1. **(c) nosná část bez otázky** | h3 „Vnímání obrazu" — „Velikost obrazu závisí na zorném úhlu…" | Celá NOVÁ sekce výkladu (ZAPIS bod „velikost obrazu: závisí na zorném úhlu") nemá v kvízu ani jednu otázku; pokrytá je jen její druhá věta (dvě oči → Q17).
   **NÁVRH — ŠKRTNOUT otázku 16 („Co dalekozraké oko vidí ostře?" — třetí otázka na dalekozrakost, navíc s nevěrohodným distraktorem „nic") a NAHRADIT:**
   - Otázka: `Na čem závisí, jak velký předmět vidíme?`
   - Odpovědi: `na zorném úhlu` | `na hmotnosti pozorovaného předmětu` | `na barvě pozorovaného předmětu`  (14 / 34 / 30 znaků)
   - Vysvětlení: `Zorný úhel svírají paprsky z krajních bodů předmětu — vzdálené letadlo proto vidíme maličké.`

2. **(c) nosná část bez otázky** | h3 „Čím světlo v oku prochází" — nové věty o rohovce, komorové vodě, sklivci a pojmu fotoreceptory | Čtyři NOVÉ body ZAPIS („rohovka: chrání oko, láme paprsky k čočce", „komorová voda: chrání před tlakem zvenčí", „sklivec: průhledná výplň oka", „fotoreceptory: tyčinky a čípky") nemají žádnou otázku — kvíz zůstal u staré verze výkladu.
   **NÁVRH — ŠKRTNOUT otázku 5 („Na které vrstvě oka vzniká obraz?" — viz nález 6, odpověď je doslova ve správné odpovědi otázky 1) a NAHRADIT:**
   - Otázka: `Jaký úkol má v oku rohovka?`
   - Odpovědi: `chrání oko a směruje paprsky k čočce` | `rozhoduje o barvě očí a velikosti duhovky` | `vytváří barevný vjem podobně jako mozek`  (36 / 41 / 39 znaků)
   - Vysvětlení: `Rohovka je průhledný ochranný obal oka; světlo jí vstupuje dovnitř a míří dál k čočce.`

3. **(c) nadstavba bez otázky** | závěr h3 „Zrakové vady a jejich korekce" — „V roce 1954 objevil… Otto Wichterle…" + „korekce: i kontaktní čočky" | Dva ZAPIS body bez otázky; nadstavbová otázka navíc v bloku úplně chybí (pravidlo „nadstavba na konec").
   **NÁVRH — ŠKRTNOUT otázku 21 („Co udělá mozek s obrazem, přeneseným zrakovým nervem?" — duplicitní s otázkou 6, viz nález 8) a NAHRADIT na POSLEDNÍM místě bloku:**
   - Otázka: `Který český vědec objevil roku 1954 měkký materiál pro kontaktní čočky?`
   - Odpovědi: `Otto Wichterle` | `Jaroslav Heyrovský` | `Jan Janský`  (14 / 18 / 10 znaků)
   - Vysvětlení: `Otto Wichterle objevil měkký materiál, díky kterému se vady oka opravují i kontaktními čočkami.`
   - Pozn.: distraktory schválně NEJSOU Newton ani Marci — ti jsou správnou odpovědí v sousedním bloku `rozklad-svetla-duha` (křížový únik).

4. **(c) body bez otázky, bez volného místa** | ZAPIS „optická mohutnost oka: asi +59 dioptrií" a „akomodace… mění mohutnost až o 15 D" | Nová čísla výkladu se v kvízu neobjevují vůbec.
   **NÁVRH:** při 21 slotech je nelze doplnit bez škrtu nosné otázky — buď je nechat jen ve výkladu a ZAPISu (přijatelné, jde o rámečkovou zajímavost z PDF), **nebo** zaměnit otázku 11 („Jak se mění schopnost akomodace s věkem?") za: `Jakou optickou mohutnost má zdravé oko jako celek?` / `asi +59 dioptrií` | `asi +5 dioptrií jako lupa` | `nula, oko světlo jen propouští` (17 / 25 / 30 znaků), vysvětlení `Celá optická soustava oka má dohromady asi +59 dioptrií.`

5. **(c) čísla výkladu bez otázky** | h3 „Akomodace" a „Zrakové vady" — 7 cm (děti), 60 cm (senioři), 25 cm (blízký bod u dalekozrakosti), 5 m (daleký bod u krátkozrakosti), nekonečno (daleký bod zdravého oka) | Pět NOVÝCH číselných údajů výkladu není v kvízu (otázka 20 pokrývá jen 10–15 cm).
   **NÁVRH:** rozšířit vysvětlení už existujících otázek, aby čísla zazněla (bez zabrání slotu): otázka 20 vysvětlení → `Zdravé oko zaostří asi na 10–15 cm; děti i na 7 cm, senioři jen na 60 cm.`; otázka 12 vysvětlení → `Dalekozraké oko láme málo — obraz by vznikl až za sítnicí a blízký bod je dál než 25 cm.`; otázka 14 vysvětlení → `Krátkozraké oko láme příliš — daleký bod je blíž než 5 metrů.`

6. **(d) únik odpovědi** | otázka 1 „Co je hlavním úkolem oka?" | Správná odpověď zní `vytvořit obraz na sítnici` — a otázka 5 se ptá `Na které vrstvě oka vzniká obraz?` se správnou odpovědí `na sítnici`. Odpověď je tedy doslova napsaná v jiné otázce; otázka 5 je navíc obsahově duplicitní.
   **NÁVRH:** ŠKRTNOUT otázku 5 a nahradit ji otázkou z nálezu 2 (rohovka). Otázka 1 zůstává beze změny.

7. **(d) únik odpovědi** | otázka 7 „Které buňky sítnice vnímají barvy?" | Vysvětlení `Čípky vnímají barvy (tři druhy: červená, zelená, modrá).` prozrazuje celou správnou odpověď otázky 19 (`tři — každý na jinou barvu`).
   **NÁVRH:** vysvětlení otázky 7 změnit na `Čípky pracují za denního světla a rozliší barvy; tyčinky barvy nerozeznají.` (znění otázky i odpovědí beze změny).

8. **(d) únik odpovědi + duplicita** | otázka 6 „Jaký je obraz na sítnici?" | Vysvětlení `Obraz je převrácený — mozek ho pak „otočí".` prozrazuje správnou odpověď otázky 21 (`zpracuje ho a otočí`) a opačně: vysvětlení otázky 21 (`Vzniklý obraz je převrácený…`) prozrazuje otázku 6. Obě otázky navíc zkoušejí týž ZAPIS bod.
   **NÁVRH:** ŠKRTNOUT otázku 21 (nahradit otázkou z nálezu 3) a vysvětlení otázky 6 změnit na `Sítnice zachytí obraz zmenšený a hlavou dolů; teprve mozek vjem srovná.`

9. **(d) únik odpovědi** | otázka 18 „Kde je na sítnici místo nejostřejšího vidění?" | Vysvětlení `Ve žluté skvrně jsou nahuštěné čípky — nejostřejší barevné vidění.` prozrazuje správnou odpověď otázky 7 (`čípky`).
   **NÁVRH:** vysvětlení otázky 18 změnit na `Žlutá skvrna je místo nejostřejšího vidění — světločivé buňky jsou tam nahuštěné nejhustěji.`

10. **(d) délková nápověda (drobné)** | otázka 9 „Co je akomodace oka?" | Správná odpověď `zaostřování zakřivením čočky` (28 znaků) je striktně nejdelší, náskok +3 znaky (`node testy/delky.mjs oko-vady-oka` → 1/21). Pod prahem 10 znaků, ale brána ji počítá jako nápovědu.
    **NÁVRH:** distraktory prodloužit — `zaostřování zakřivením čočky` | `změna barvy duhovky a zornice` (29) | `otáčení celého oka ve všech směrech` (35); vysvětlení beze změny.

---

## rozklad-svetla-duha — VERDIKT: NESLADĚNO (11)

### NÁLEZY

1. **(d) duplicita** | otázka 19 „Kolikrát se paprsek světla odrazí uvnitř…" vs. otázka 13 „Čím vzniká slabší vedlejší duha?" | Obě otázky zkoušejí naprosto týž fakt (vedlejší duha = dva vnitřní odrazy); dvě otázky z 21 pokrývají jeden ZAPIS bod, zatímco bod „tvar duhy: obvykle půlkruh, z letadla kruh" nemá otázku žádnou.
   **NÁVRH — ŠKRTNOUT otázku 19 a NAHRADIT:**
   - Otázka: `Jaký tvar má duha, když ji vidíme ze země?`
   - Odpovědi: `obvykle jako půlkruh` | `vždy jako rovná čára nad obzorem` | `vždy jako úplný kruh nad krajinou`  (20 / 32 / 33 znaků)
   - Vysvětlení: `Ze země vidíme z duhy jen půlkruh; z letadla se dá pozorovat i jako celý kruh.`

2. **(d) vzájemný únik** | otázka 5 „Která barva se láme nejméně?" a otázka 6 „Která barva se láme nejvíce?" | Vysvětlení otázky 5 (`Červené světlo se ohýbá nejméně, fialové nejvíc.`) dává hotovou odpověď otázky 6 a opačně (`Fialová se láme nejsilněji — je na opačném konci než červená.`).
   **NÁVRH:** vysvětlení otázky 5 → `Nejmenší lom má paprsek na červeném konci spektra.`; vysvětlení otázky 6 → `Na opačném konci spektra je lom největší, proto se paprsek odkloní nejvíc.` (znění otázek a odpovědí beze změny).

3. **(d) únik odpovědi** | otázka 8 „Jaké je správné pořadí barev spektra?" | Vysvětlení `Od nejméně lomené (červená) po nejvíc lomenou (fialová).` prozrazuje správné odpovědi otázek 5 i 6 naráz.
   **NÁVRH:** vysvětlení otázky 8 → `Barvy jdou ve spektru vždy v tomto pořadí a plynule do sebe přecházejí.`

4. **(d) únik odpovědi** | otázka 8 „Jaké je správné pořadí barev spektra?" | Správná odpověď vyjmenovává přesně sedm barev — žák si je spočítá a má zadarmo správnou odpověď otázky 7 (`sedm`). ZAPIS bod „spektrum: spojitý pás, barvy plynule přecházejí" přitom nemá otázku žádnou.
   **NÁVRH — ŠKRTNOUT otázku 7 („Kolik spektrálních barev rozlišujeme?" — počet zůstává doložený v otázce 8) a NAHRADIT:**
   - Otázka: `Jak na sebe barvy ve spektru navazují?`
   - Odpovědi: `plynule přecházejí jedna v druhou` | `jsou oddělené ostrými černými čarami` | `střídají se s úzkými bílými pruhy`  (33 / 36 / 33 znaků)
   - Vysvětlení: `Spektrum je spojitý pás — mezi sousedními barvami není ostrá hranice.`

5. **(d) únik odpovědi** | otázka 3 „Kdo poprvé popsal rozklad světla a nazval…" | Vysvětlení `Newton pruh barev nazval spektrum a zase ho složil do bílé.` prozrazuje správnou odpověď otázky 17 (`spojnou čočkou složil barvy zpět v bílé`).
   **NÁVRH:** vysvětlení otázky 3 → `Rozklad světla popsal roku 1671 Isaac Newton a pruh barev nazval spektrum.`

6. **(d) únik odpovědi** | otázka 13 „Čím vzniká slabší vedlejší duha?" | Vysvětlení `Vedlejší duha má dva odrazy — proto je slabší a barvy má obráceně.` prozrazuje správnou odpověď otázky 14 (`opačné`). Totéž dělalo vysvětlení otázky 19 (ta se škrtá nálezem 1).
   **NÁVRH:** vysvětlení otázky 13 → `Vedlejší duha vzniká dvěma odrazy uvnitř kapky, a proto je vidět slaběji.`

7. **(d) délková nápověda — 8 z 21 otázek, z toho 5 s náskokem ≥ 10 znaků** | otázky 2, 8, 9, 10, 15 | `node testy/delky.mjs rozklad-svetla-duha` → 8/21; náskoky: otázka 2 **+18**, otázka 8 **+27**, otázka 9 **+10**, otázka 10 **+12**, otázka 15 **+23**. Nejhorší blok z kontrolované trojice — správná odpověď se dá uhodnout podle délky bez znalosti látky.
   **NÁVRH (znění otázek beze změny, mění se jen distraktory):**
   - otázka 2: `rozloží se na barevné spektrum` (30) | `projde beze změny a zůstane bílé` (32) | `pohltí se a zmizí uvnitř hranolu` (32)
   - otázka 8: `červená, oranžová, žlutá, zelená, modrá, indigová, fialová` (58) | `fialová, indigová, modrá, zelená, žlutá, oranžová, červená` (58) | `žlutá, červená, zelená, fialová, modrá, oranžová a indigová` (59)
   - otázka 9: `na dešťových kapkách` (20) | `na vysokých bílých oblacích` (27) | `na suchém prachu ve vzduchu` (27)
   - otázka 10: `když máme Slunce za zády a déšť před sebou` (42) | `když stojíme čelem ke Slunci a déšť máme za zády` (48) | `jen v pravé poledne, když Slunce stojí nejvýš` (45)
   - otázka 15: `u vodopádu nebo při zalévání hadicí` (35) | `ve tmě, když na zeď posvítíme baterkou` (38) | `na suché zdi ozářené večerním sluncem` (37)

8. **(c) bod výkladu bez otázky** | ZAPIS „tvar duhy: obvykle půlkruh, z letadla kruh" | Bez otázky.
   **NÁVRH:** pokryto novou otázkou z nálezu 1.

9. **(c) body výkladu bez otázky** | ZAPIS „spektrum: spojitý pás, barvy plynule přecházejí" a „indigová = tmavomodrá"; dále „vedlejší duha vzniká VÝŠ nad hlavní" | Spojitost spektra i poloha vedlejší duhy nejsou v kvízu vůbec; „indigová = tmavomodrá" zazní jen uvnitř výčtu v otázce 8.
   **NÁVRH:** spojitost pokryje nová otázka z nálezu 4; polohu vedlejší duhy doplnit do vysvětlení otázky 14 → `Druhý odraz obrátí pořadí barev; vedlejší duha je navíc výš nad hlavní.`; „indigová = tmavomodrá" ponechat ve výkladu (na samostatnou otázku není volný slot).

10. **(a) tvrzení nad rámec výkladu** | otázka 21 „Proč se k duze nikdy nedá přiblížit?" | Správná odpověď `je to jev závislý jen na poloze pozorovatele` říká „JEN na poloze pozorovatele", zatímco výklad říká „každý pozorovatel ji vidí z jiných kapek podle své polohy **vůči Slunci**" — duha závisí i na poloze Slunce a kapek, slovo „jen" je věcně chybné zjednodušení. Odpověď je zároveň nejdelší jen o kousek (43 vs 46/44 — těsně pod prahem).
    **NÁVRH:** Otázka: `Proč se k duze nikdy nedá přiblížit?` / Odpovědi: `každý ji vidí z jiných kapek` (28) | `je to pevný oblouk zavěšený na obloze` (37) | `utíká, protože se otáčí spolu se Sluncem` (40); vysvětlení: `Duha je optický jev — kdo se posune, vidí ji už z jiných kapek, proto k ní nedojde.`

11. **(drobné) překlep** | otázka 12 „Kolikrát se paprsek odrazí uvnitr kapky u základní duhy?" | V zadání je `uvnitr` místo `uvnitř`.
    **NÁVRH:** opravit na `Kolikrát se paprsek odrazí uvnitř kapky u základní duhy?` (odpovědi i vysvětlení beze změny).

---

## vnimani-barev — VERDIKT: NESLADĚNO (8)

### NÁLEZY

1. **(a) kvíz zkouší, co ve výkladu není** | otázky 17, 18, 19 „Jaká barva vznikne složením červeného a zeleného / červeného a modrého / zeleného a modrého světla?" | Výklad uvádí jen výčet `doplňkové barvy (dvě základní dohromady): žlutá, purpurová (sytě růžová), azurová (modrozelená)` — KTERÁ dvojice dává kterou barvu, tam nestojí. Tři z 21 otázek tedy zkoušejí fakt, který se z výkladu nedá zjistit (a navíc jsou to tři varianty téže otázky).
   **NÁVRH:** ŠKRTNOUT otázky 18 a 19 a nahradit je otázkami z nálezu 3; otázku 17 PONECHAT jen tehdy, doplní-li exekutor do h3 „Skládání barevných světel — RGB" jednu doloženou větu, např. `Červená se zelenou dají žlutou, červená s modrou purpurovou a zelená s modrou azurovou.` Pokud se výklad měnit nebude, ŠKRTNOUT i otázku 17 a NAHRADIT (nadstavba na POSLEDNÍ místo bloku): `Které tři barvy míchají malíři při malování temperami?` / `žlutou, červenou a modrou` (25) | `azurovou, purpurovou a zelenou` (30) | `bílou, černou a stříbrnou barvu` (31), vysvětlení `Malíři míchají barviva, proto používají jinou trojici než displeje se systémem RGB.` (pokryje i ZAPIS bod „zajímavost — malíři", viz nález 5).

2. **(a) kvíz zkouší, co ve výkladu není** | otázka 20 „Proč se černá v CMYK značí písmenem K, a ne B?" | Výklad říká jen `CMYK = cyan (azurová), magenta (purpurová), yellow (žlutá) + K = black (černá)` — o důvodu volby písmene K ani o záměně s „blue" z RGB v něm není ani slovo. Otázka je nad rámec výkladu i ročníku (jde o typografickou konvenci, ne o fyziku).
   **NÁVRH — ŠKRTNOUT otázku 20 a NAHRADIT (ZAPIS bod „černé barvivo: smíchání základních barviv, pohltí vše" dosud bez otázky):**
   - Otázka: `Jak vznikne černé barvivo?`
   - Odpovědi: `smícháním základních barviv` | `zesílením jediného modrého barviva` | `zahřátím barviva na vysokou teplotu`  (27 / 34 / 35 znaků)
   - Vysvětlení: `Smíchaná barviva pohltí všechno světlo — výsledek je černý.`

3. **(c) CELÁ nosná sekce bez otázky** | h3 „Světlo a látky" — neprůhledná / průzračná průhledná / barevná průhledná látka + příklad růžového světla | Čtyři ZAPIS body (`neprůhledná látka: nepropustí nic`, `průzračná průhledná látka: propustí vše`, `barevná průhledná látka: propustí jen část barev`, `příklad: růžové světlo = propuštěné modré + červené`) nemají v kvízu ani jednu otázku. Nejzávažnější mezera bloku.
   **NÁVRH — obsadit sloty po škrtnutých otázkách 18 a 19:**
   - (a) Otázka: `Co udělá se světlem neprůhledná látka, třeba beton nebo dřevo?`
     Odpovědi: `nepropustí žádné světlo` | `propustí všechny barvy světla beze ztráty` | `propustí jen některé barvy světla`  (23 / 41 / 33 znaků)
     Vysvětlení: `Neprůhledná látka světlo nepropustí — všechny barvy pohltí.`
   - (b) Otázka: `Proč vidíme přes barevný filtr růžové světlo?`
     Odpovědi: `propustí jen modré a červené světlo` | `pohltí úplně všechny barvy denního světla` | `odrazí všechny barvy zpět do oka pozorovatele`  (35 / 41 / 45 znaků)
     Vysvětlení: `Barevná průhledná látka propustí jen část barev, zbytek pohltí.`
   - Pozn.: „průzračná průhledná látka (sklo, křemen, diamant)" zůstane pokryta jen distraktorem — na samostatnou otázku není při stropu 21 volný slot.

4. **(c) bod výkladu bez otázky** | ZAPIS „černé barvivo: smíchání základních barviv, pohltí vše" | Bez otázky; kvíz zkouší jen „víc barviv = tmavší" (otázka 14).
   **NÁVRH:** pokryto novou otázkou z nálezu 2.

5. **(c) nadstavba bez otázky** | závěr výkladu „Zajímavost: malíři… používají jiné tři barvy — žlutou, červenou a modrou" | Jediná nadstavbová věta výkladu nemá otázku a blok nemá žádnou otázku určenou na konec jako nadstavbu.
   **NÁVRH:** pokryto variantou z nálezu 1 (otázka o malířích na poslední místo bloku).

6. **(d) únik odpovědi** | otázka 3 „Co znamená zkratka RGB?" | Vysvětlení `RGB = red, green, blue — tři základní barvy světla, odpovídají čípkům.` prozrazuje správnou odpověď otázky 1 (`tři — červený, zelený, modrý`), a naopak správná odpověď otázky 1 prozrazuje otázku 3 (`červená, zelená, modrá`).
   **NÁVRH:** vysvětlení otázky 3 → `Zkratka je z anglického red, green, blue — základní barvy světla.`; otázku 1 ponechat, ale vysvětlení → `Každý druh čípku je citlivý na jinou základní barvu světla.`

7. **(d) únik odpovědi** | otázka 5 „Jak vznikne bílé světlo v systému RGB?" | Vysvětlení `Červená + zelená + modrá se stejnou intenzitou dají bílou.` vyjmenuje přesně správnou odpověď otázky 3 (`červená, zelená, modrá`).
   **NÁVRH:** vysvětlení otázky 5 → `Všechny tři základní barvy světla stejně silně dají dohromady bílou.`

8. **(d) částečný únik (drobné)** | otázka 13 „Co je podstatou míchání barviv (CMYK)?" | Vysvětlení `Barviva světlo pohlcují — na rozdíl od skládání světel.` naznačuje správnou odpověď otázky 15 (`světla se sčítají, barviva ubírají`).
   **NÁVRH:** vysvětlení otázky 13 → `Barvivo funguje jako filtr: část barev ze světla ubere.`

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně, celý běh, exit 0)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 492 otázek (18 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 37 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

Žádné ⚠️ nejmenuje přímo klíče `oko-vady-oka`, `rozklad-svetla-duha` ani `vnimani-barev` —
brána je souhrnná. Do čísla „37 otázek s náskokem ≥10 znaků" spadá 5 otázek bloku
`rozklad-svetla-duha` (nález 7 tamtéž), doloženo `node testy/delky.mjs rozklad-svetla-duha`.
Řádek „Vazby v kvízech: … 0 duplicit, 0 úniků odpovědí" je FALEŠNĚ ZELENÝ — úniky
popsané výše (oko 4×, duha 4×, barvy 3×) brána nevidí, protože porovnává jen shodná
slovní spojení uvnitř bloku.

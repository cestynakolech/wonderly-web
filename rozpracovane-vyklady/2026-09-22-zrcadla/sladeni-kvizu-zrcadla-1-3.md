# Sladění kvízů s NOVÝMI výklady — zrcadla-a-cocky (F7), klíče 1–3
Nezávislá kontrola 22. 9. 2026. Zdroj výkladu: `rozpracovane-vyklady/2026-09-22-zrcadla/vyklad-<klic>-f7.md`
(ověřeno, že tentýž text je i v `src/data/temata.ts` — grep na 6 nosných vět, všechny 1×).
Kvíz: `node testy/vypis-kviz.mjs <klic>` — všechny tři bloky mají 21 otázek.
Délky měřeny stejným vzorcem jako `zkontroluj.mjs:197` (`delky[0] - max(ostatní)`).

---

## optika-rovinneho-zrcadla — VERDIKT: NESLADĚNO (6)

NÁLEZY:

1. **(d) únik — otázka 13 „Proč je na sanitkách nápis AMBULANCE napsán zrcadlově?"**
   Zadání otázky 13 doslova obsahuje odpověď otázky 20 („je napsaný zrcadlově (pozpátku)").
   Kdo čte 13, má 20 zadarmo — a naopak. Dvě otázky na tentýž fakt.
   NÁVRH: ŠKRTNOUT otázku 20 a NAHRADIT (pokrývá zároveň nález 3):
   - otázka: „Má na vznik obrazu vliv, jestli se paprsek cestou odrazil, nebo lomil?"
   - odpovědi: „nemá na obraz vliv" (18) | „obraz vždy zmenší" (17) | „obraz vždy převrátí" (19) — náskok −1
   - vysvětlení: „Obraz vidíme vždy ve směru přicházejících paprsků, ať k nám dorazily jakkoli."

2. **(d) duplicita + vzájemný únik — otázka 11 „Proč vidíme Měsíc, ačkoli sám nesvítí?" a otázka 21 „Proč vidíme hory, přestože samy nesvítí?"**
   Stejná otázka dvakrát, stejná správná odpověď („odráží / odrážejí sluneční světlo"), stejné vysvětlení.
   Třetí otázka na totéž je ještě #10. Tři otázky na jeden řádek výkladu.
   NÁVRH: ŠKRTNOUT otázku 21 a NAHRADIT (pokrývá zároveň nález 4):
   - otázka: „K čemu se používají kosmetická zrcadla?"
   - odpovědi: „k líčení a holení" (17) | „k ohřevu vody" (13) | „k měření vzdálenosti" (20) — náskok −3
   - vysvětlení: „Kosmetická zrcadla slouží k líčení, estetická opticky zvětšují místnost."

3. **(c) nosná věta výkladu bez otázky — „Na vznik obrazu nemá vliv, jestli se paprsek cestou odrazil, nebo lomil."**
   ZAPIS bod „cesta paprsku (odraz, lom): bez vlivu" nemá v kvízu jedinou otázku.
   NÁVRH: viz nález 1 (náhrada za škrtnutou otázku 20).

4. **(c) ZAPIS bod bez otázky — „využití: kosmetická (líčení)"**
   Otázka 15 pokrývá jen estetická zrcadla; kosmetická (líčení) ve výkladu i v ZAPIS jsou, v kvízu nikde.
   NÁVRH: viz nález 2 (náhrada za škrtnutou otázku 21).

5. **(d) únik mezi otázkami 3 a 9.**
   Vysvětlení otázky 3 („Vzniká „za zrcadlem", nejde zachytit na stínítko — je zdánlivý.") prozrazuje
   odpověď otázky 9 („ne, je zdánlivý"), a odpověď otázky 9 zase prozrazuje odpověď otázky 3.
   NÁVRH: přepsat vysvětlení otázky 3 bez zmínky o stínítku:
   „Za zrcadlem žádné světlo doopravdy není — obraz nám vytvoří teprve zrak, proto je zdánlivý."
   (Otázku 9 i její vysvětlení ponechat beze změny.)

6. **(a) DROBNÉ — otázka 18 (úhel mezi paprsky 60° → 30° od kolmice) stojí na úvaze, kterou výklad nemá.**
   Výklad zákon odrazu jen zmiňuje jednou větou; že se úhel mezi paprsky dělí na dvě poloviny,
   ve výkladu ani v ZAPIS není. Přepočet sám je správný (60/2 = 30), ale opora ve výkladu chybí.
   NÁVRH: ponechat jako nadstavbu (je na konci bloku), NEBO nahradit obyčejnou aplikací:
   - otázka: „Paprsek dopadá na rovinné zrcadlo pod úhlem 40° od kolmice. Jaký je úhel odrazu?"
   - odpovědi: „40°" | „80°" | „50°" — náskok 0
   - vysvětlení: „Úhel odrazu se vždy rovná úhlu dopadu."

Délková nápověda: v tomto bloku 0 otázek s náskokem ≥10 (max. +1 u otázky 13). OK.

---

## kulova-zrcadla-dute-zrcadlo — VERDIKT: NESLADĚNO (5)

NÁLEZY:

1. **(c) ZÁVAŽNÉ — vzorec `f = r/2` nemá ani jednu otázku.**
   Je to jediný vzorec podtématu, ve výkladu má vlastní větu („Protože ohnisko leží přesně v polovině
   mezi středem křivosti a vrcholem, platí vztah f = r/2") a v ZAPIS samostatný klíč `"vzorec": "f = r/2"`
   i bod „vztah: f = r/2". Otázka 3 zkouší jen slovní polohu ohniska, vztah čísel nikde.
   NÁVRH: ŠKRTNOUT otázku 12 („Jaké je ohnisko vypuklého zrcadla?" — odvoditelná z otázky 11 a z otázky 6,
   jejíž distraktor je přesně odpověď otázky 12) a NAHRADIT:
   - otázka: „Jak velká je ohnisková vzdálenost f kulového zrcadla?"
   - odpovědi: „polovina poloměru r" (19) | „dvojnásobek poloměru r" (22) | „stejná jako poloměr r" (21) — náskok −3
   - vysvětlení: „Ohnisko leží uprostřed mezi středem křivosti a vrcholem, proto f = r/2."

2. **(c) ZÁVAŽNÉ — z celého h3 „Konstrukce obrazu pomocí tří paprsků" chybí STŘEDOVÝ paprsek a pravidlo průsečíku.**
   Rovnoběžný paprsek pokrývá otázka 7, ohniskový otázka 21, ale ZAPIS bod „tři paprsky: středový →
   zpět po téže přímce" a věta „Kde se dva odražené paprsky protnou, vzniká krajní bod skutečného obrazu"
   nemají v kvízu žádnou otázku.
   NÁVRH: ŠKRTNOUT otázku 14 („Jaká je hlavní výhoda vypuklého zrcadla?" — týž obsah jako otázka 15
   a jako odpověď „zachytí velký kus okolí" už zaznívá v otázce 13/15) a NAHRADIT:
   - otázka: „Jak se od dutého zrcadla odrazí paprsek jdoucí středem křivosti S?"
   - odpovědi: „po stejné přímce zpět" (21) | „rovnoběžně s optickou osou" (26) | „do ohniska F" (12) — náskok −5
   - vysvětlení: „Středový paprsek dopadá kolmo na zrcadlo, proto se vrací po téže přímce."

3. **(c) DROBNÉ — ZAPIS bod „duté: solární kolektor ohřívá vodu" nemá otázku.**
   Otázka 16 zkouší jen solární elektrárnu (soustředění energie); kolektor (ohřev vody) je ve výkladu
   samostatná odrážka doložená PDF str. 15, v kvízu chybí.
   NÁVRH: rozšířit otázku 16 o druhou část NEBO přidat na konec (a jinde ubrat) otázku:
   - otázka: „K čemu slouží duté zrcadlo v solárním kolektoru?"
   - odpovědi: „ohřívá v něm vodu" (17) | „chladí v něm vodu" (17) | „rozsvěcí pouliční lampu" (23) — náskok −6
   - vysvětlení: „Soustředěné sluneční paprsky předají energii vodě, která se ohřeje."

4. **(c) DROBNÉ — pojem „ohnisková vzdálenost f" se v kvízu objevuje jen jako DISTRAKTOR.**
   V otázce 18 („Co je poloměr křivosti r?") je distraktor „vzdálenost ohniska od vrcholu" — což je
   PRAVDIVÁ definice jiného pojmu z téhož výkladu. Žák si ji odnese jako „špatnou odpověď".
   NÁVRH: po zavedení otázky z nálezu 1 (kde se f definuje kladně) ponechat; jinak vyměnit distraktor za
   „vzdálenost obrazu od zrcadla".

5. **(b) DROBNÉ — otázka 13 „Jaký obraz vytváří vypuklé zrcadlo? → zdánlivý a zmenšený" vypouští „vzpřímený".**
   Výklad i ZAPIS mají všude trojici „zdánlivý, vzpřímený a zmenšený" (a stejná trojice je ve vysvětlení
   téže otázky) — v odpovědi chybí.
   NÁVRH: odpovědi „zdánlivý, vzpřímený, zmenšený" (28) | „skutečný, převrácený, zvětšený" (30) |
   „zdánlivý, vzpřímený, zvětšený" (29) — náskok −1; vysvětlení: „Nezávisle na poloze předmětu je obraz vždy stejný."

Délková nápověda: 0 otázek s náskokem ≥10 (max. 0). OK.

---

## opticka-cocka — VERDIKT: NESLADĚNO (12)

NÁLEZY:

1. **(d) ZÁVAŽNÉ — délková nápověda v 7 otázkách z 21.** Náskok správné odpovědi (měřeno vzorcem zkontroluj.mjs):
   #8 +29, #10 +25, #18 +18, #11 +14, #1 +13, #12 +12, #15 +10. Třetina bloku jde uhodnout podle délky.
   NÁVRHY (jen odpovědi, zadání i vysvětlení beze změny, není-li uvedeno jinak):
   - #8 „Co udělá rozptylka s rovnoběžným svazkem paprsků?": „rozptýlí je do stran" (20) | „spojí je do bodu ohniska" (24) | „nechá je beze změny" (19) — náskok −4
   - #10 „Co znamená větší počet dioptrií čočky?": „čočka víc láme paprsky" (22) | „čočka je plošší a tenčí" (23) | „čočka je širší a delší" (22) — náskok −1
   - #18 „Proč lze spojkou (lupou) rozdělat oheň?": „soustředí paprsky do ohniska" (28) | „rozptýlí paprsky do stran" (25) | „odrazí paprsky zpět ke Slunci" (29) — náskok −1
   - #11 „Který paprsek se při průchodu čočkou neláme?": „středový" (8) | „rovnoběžný" (10) | „ohniskový" (9) — náskok −2
   - #1 „Z čeho jsou vyrobené optické čočky?": „ze skla či plastu" (17) | „z kovu" (6) | „ze zrcadlové fólie" (18) — náskok −1
   - #12 „Jak se láme paprsek rovnoběžný s osou?": „projde ohniskem" (15) | „vrátí se stejnou cestou" (23) | „nezmění vůbec směr" (18) — náskok −8
   - #15 „Jaký obraz vytváří rozptylka?": „zdánlivý, vzpřímený, zmenšený" (29) | „skutečný, převrácený, zvětšený" (30) | „zdánlivý, vzpřímený, zvětšený" (29) — náskok −1

2. **(a) ZÁVAŽNÉ — otázka 21 „Které optické pomůcky mohou obsahovat jak spojku, tak rozptylku?"**
   Vysvětlení tvrdí „podle vady zraku buď spojku (dalekozrakost), nebo rozptylku (krátkozrakost)".
   Výklad krátkozrakost ani dalekozrakost NEOBSAHUJE — ZDROJE výkladu je výslovně vedou jako
   MIMO SCOPE („patří do podtématu `oko-vady-oka`"). Zároveň je to únik do sousedního bloku.
   NÁVRH: ponechat zadání i odpovědi, přepsat vysvětlení: „Brýlové čočky jsou podle potřeby buď spojky,
   nebo rozptylky — obojí se v brýlích používá."

3. **(a) DROBNÉ — otázka 12 mluví o „obrazovém ohnisku", výklad ten pojem nezná.**
   Výklad má jen „ohniska F a F´"; „obrazové / předmětové ohnisko" se v OBSAH ani v ZAPIS nevyskytuje.
   NÁVRH: viz nález 1, nové znění odpovědi „projde ohniskem".

4. **(a) DROBNÉ — vysvětlení otázky 8 „jako by vycházel z ohniska před čočkou".**
   Výklad říká jen „mají zdánlivá ohniska (paprsky jimi nikdy neprocházejí)", o poloze „před čočkou" mlčí.
   NÁVRH: vysvětlení „Rozptylka svazek rozbíhá — paprsky jako by vycházely ze zdánlivého ohniska."

5. **(c) ZÁVAŽNÉ — pojem „zvětšení" (poměr velikosti obrazu k velikosti předmětu) nemá otázku.**
   Je to samostatná odrážka výkladu i ZAPIS bod „zvětšení: obraz ku předmětu".
   NÁVRH: ŠKRTNOUT otázku 17 („Kde se využívá rozptylka?" — duplicitní s otázkou 16, jejíž distraktor je
   přesně odpověď 17, a s otázkou 15) a NAHRADIT:
   - otázka: „Co udává zvětšení čočky?"
   - odpovědi: „poměr obrazu k předmětu" (23) | „součet obrazu a předmětu" (24) | „rozdíl obou vzdáleností" (23) — náskok −1
   - vysvětlení: „Je-li zvětšení větší než 1, je obraz větší než předmět."

6. **(c) ZÁVAŽNÉ — čtvrtý případ zobrazení spojkou „předmět přesně ve 2f → skutečný, převrácený, stejně velký" nemá otázku.**
   Výklad má čtyři případy (odrážka doložená prezentací), kvíz pokrývá jen tři (#13, #20, #14).
   Navíc distraktor „stejně velký" v otázce 13 je ve skutečnosti správná odpověď tohoto nepokrytého případu.
   NÁVRH: ŠKRTNOUT otázku 5 („Jaké ohnisko má spojka?" — týž obsah nese otázka 9 i otázka 6) a NAHRADIT:
   - otázka: „Jaký obraz dá spojka, když je předmět přesně ve dvojnásobku ohniskové vzdálenosti?"
   - odpovědi: „skutečný, převrácený, stejně velký" (34) | „zdánlivý, vzpřímený, stejně velký" (33) | „skutečný, převrácený, dvakrát větší" (35) — náskok −1
   - vysvětlení: „Ve vzdálenosti 2f vznikne obraz stejně velký jako předmět."

7. **(c) — „každá čočka má DVĚ ohniska F a F´" nemá otázku.** ZAPIS bod „ohniska F, F´: dvě u čočky".
   NÁVRH: přidat místo jedné z párových duplicit (#6 nebo #9, obě zkoušejí znaménko dioptrií):
   - otázka: „Kolik ohnisek má optická čočka?"
   - odpovědi: „dvě ohniska F a F´" (18) | „jen jedno ohnisko F" (19) | „žádné ohnisko nemá" (18) — náskok −1
   - vysvětlení: „Ohniska leží po obou stranách čočky, značí se F a F´."

8. **(c) — „ohnisková vzdálenost f = vzdálenost ohniska od optického středu, nejdůležitější parametr čočky" nemá otázku.**
   Pojem v kvízu figuruje jen jako součást zadání otázek 13, 14, 20, nikde se nedefinuje.

9. **(c) — „optická osa = spojnice středů křivosti obou ploch" nemá otázku** (ZAPIS bod „optická osa: spojnice středů křivosti").

10. **(c) — „Spojku od rozptylky poznáme pohledem skrz čočku do dálky: spojka obraz převrací, rozptylka ne." nemá otázku.**
    Přitom je to nově doplněná praktická věta výkladu i ZAPIS bod.

11. **(c) — „značka spojky: dvě šipky směřující ven" nemá otázku** (ZAPIS bod „spojka: značka dvě šipky ven").

12. **(c) — konstrukce obrazu bez otázky:** ani „kde se paprsky protnou → skutečný obraz, jinak zdánlivý",
    ani „u rozptylky platí stejné tři paprsky, jen se rovnoběžný láme jakoby ze zdánlivého ohniska"
    (dva ZAPIS body) nemají v kvízu otázku. Nepokryta je i jednotka dioptrie D ze ZAPIS `jednotky`.

    POZNÁMKA K POČTU: nálezy 5–12 hlásí 8 nepokrytých nosných míst, ale blok má držet 21 otázek.
    Volný prostor na škrt je v párových duplicitách: #5 × #9 (ohnisko spojky/rozptylky),
    #16 × #17 (kde se používá spojka/rozptylka), #6 × #9 (znaménko dioptrií), #14 × #16 (lupa).
    Doporučené pořadí náhrad: #17 → zvětšení (nález 5), #5 → případ 2f (nález 6), #6 → dvě ohniska (nález 7).
    Zbylé mezery (8–12) je nutné řešit rozšířením bloku nad 21 nebo dalším kolem po schválení.

DALŠÍ (d) ÚNIK: vysvětlení otázky 14 „To je princip lupy — zvětšený vzpřímený obraz." prozrazuje odpověď
otázky 16 („lupa nebo mikroskop") a zároveň vylučuje distraktor „lupa" v otázce 17. Otázka 18
(„Proč lze spojkou (lupou) rozdělat oheň?") vylučuje distraktor „zápalné sklo na oheň" v otázce 17.
NÁVRH: vysvětlení #14 přepsat na „Předmět blíž než ohnisko dá zvětšený vzpřímený zdánlivý obraz."
(po škrtu otázky 17 podle nálezu 5 zbytek úniku odpadá).

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně, celý výpis varování)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 492 otázek (18 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 37 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
ℹ️  laťku lze utáhnout příkazem: npm run prijmi-latku (brána sama nic nepřepisuje)
✅ Vše zapojené správně.
```

Ke třem kontrolovaným klíčům se ŽÁDNÉ ⚠️ jmenovitě neváže. Brána hlásí globálně 37 otázek
s náskokem ≥10 znaků — 7 z nich (19 %) je v bloku `opticka-cocka` (nález 1 výše);
`optika-rovinneho-zrcadla` a `kulova-zrcadla-dute-zrcadlo` mají 0.
Řádek „0 duplicit, 0 úniků odpovědí" NEVYVRACÍ nálezy 1, 2, 5 (rovinné zrcadlo) ani únik u čoček —
`uniky.mjs` porovnává jen uvnitř bloku a shodou formulací, ne obsahem (viz paměť
`feedback-brana-meri-jen-cast-uniku`, `feedback-duplicity-jen-uvnitr-bloku`).

---

## ZAPRACOVÁNO 22. 9. 2026

**optika-rovinneho-zrcadla — 6/6 zapracováno, 21 otázek.**
- Nález 1+3: otázka 20 (duplicitní AMBULANCE) nahrazena „Má na vznik obrazu vliv, jestli se
  paprsek cestou odrazil, nebo lomil?" — vysvětlení PŘEPSÁNO oproti návrhu (originál by doslova
  opakoval odpověď otázky 2 „ve směru přicházejících paprsků" → nové znění bez té fráze).
- Nález 2+4: otázka 21 (duplicitní hory/Měsíc) nahrazena „K čemu se používají kosmetická
  zrcadla?" — vysvětlení PŘEPSÁNO oproti návrhu (originál by prozradil odpověď otázky 15
  „opticky zvětšují prostor" u estetických zrcadel).
- Nález 5: vysvětlení otázky 3 přepsáno přesně dle návrhu (bez zmínky stínítka).
- Nález 6 (DROBNÉ): otázka 18 (60°/2=30°) PONECHÁNA beze změny — nález sám nabízel tuto
  možnost jako rovnocennou k náhradě; nová 40°-otázka by byla strukturně skoro totožná
  s otázkou 17, bez přínosu.

**kulova-zrcadla-dute-zrcadlo — 5/5 zapracováno, 21 otázek.**
- Nález 1: otázka 12 nahrazena „Jak velká je ohnisková vzdálenost f?" (f = r/2) — vysvětlení
  PŘEPSÁNO oproti návrhu (originál „uprostřed mezi středem křivosti a vrcholem" by prozradil
  odpověď otázky 3 „uprostřed mezi S a V"); nové znění mluví o poměru, ne o poloze.
- Nález 2: otázka 14 nahrazena středovým paprskem přesně dle návrhu.
- Nález 3: otázka 16 ROZŠÍŘENA (ne přidána nová) tak, aby pokryla solární elektrárnu i
  kolektor zároveň — ušetřilo se místo v bloku (21 drženo bez potřeby škrtat další otázku).
- Nález 4: otázka 18 ponechána beze změny — po zavedení otázky z nálezu 1 (f se definuje
  kladně vlastní otázkou) je to jedna ze dvou možností, které nález sám nabízel.
- Nález 5: odpovědi otázky 13 doplněny o „vzpřímený" přesně dle návrhu.

**opticka-cocka — zapracovány nálezy 1, 2, 3, 4, 5, 6, 7 a „DALŠÍ únik" (celkem 8 z 12 bodů
nálezu); nálezy 8–12 ODLOŽENY — 21 otázek drženo.**
- Nález 1 (délková nápověda #8, #10, #18, #11, #1, #12, #15): odpovědi přepsány přesně dle
  návrhu u všech 7 otázek.
- Nález 2: vysvětlení otázky 21 přepsáno dle návrhu (bez krátkozrakosti/dalekozrakosti mimo scope).
- Nález 3: vyřešen týmž zásahem jako nález 1 u otázky 12 („projde ohniskem" místo „obrazovým ohniskem").
- Nález 4: vysvětlení otázky 8 přepsáno dle návrhu.
- Nález 5: otázka 17 (duplicitní „Kde se využívá rozptylka?") nahrazena „Co udává zvětšení
  čočky?" dle návrhu — podle doporučeného pořadí náhrad v POZNÁMCE.
- Nález 6: otázka 5 (duplicitní „Jaké ohnisko má spojka?") nahrazena případem 2f dle návrhu.
- Nález 7: otázka 6 (duplicitní dioptrie spojky) nahrazena „Kolik ohnisek má optická čočka?"
  dle návrhu a dle doporučeného pořadí náhrad v POZNÁMCE.
- DALŠÍ únik: vysvětlení otázky 14 přepsáno dle návrhu; distraktor „zápalné sklo" zmizel
  automaticky se škrtem otázky 17 (nález 5).
- **Nálezy 8–12 (chybějící otázky na: ohnisková vzdálenost f jako pojem, optická osa jako
  definice, rozlišení spojka/rozptylka pohledem do dálky, značka spojky, konstrukce obrazu
  přes průsečík paprsků/jednotka dioptrie D) NEZAPRACOVÁNY.** Blok už po nálezech 5–7 nemá
  volný slot na další škrt (zbylé páry byly čerpány přesně podle POZNÁMKY v nálezu), a
  zadání drží 21 jako závazný počet. Nález sám u těchto bodů žádá „rozšíření bloku nad 21
  nebo další kolo po schválení" — čeká na rozhodnutí učitele/orchestrátora.

Ověřeno: `node testy/vypis-kviz.mjs <klic>` = 21 u všech tří klíčů, `node testy/uniky.mjs` =
0 duplicit / 0 úniků, `node zkontroluj.mjs` bez jmenovitého nálezu k těmto klíčům (náskok
≥10 znaků celkově klesl z 37 na 30), `npm run build` proběhl bez chyby (481 stránek).

## ZAPRACOVÁNO 22. 9. 2026 (2)

**opticka-cocka — dořešeny odložené nálezy 8–12 (5/5), 21 otázek beze změny počtu.**
Rozhodnutí orchestrátora: neodkládat, ale každý nález typu (c) řešit NAHRAZENÍM nejslabší/
duplicitní/okrajové stávající otázky v bloku. Provedené náhrady:

- **Nález 8** (ohnisková vzdálenost f jako pojem): NAHRAZENA otázka 10 „Co znamená větší
  počet dioptrií čočky?" (okrajová, přebývala vedle otázky 9 o dioptriích rozptylky) →
  „Co je ohnisková vzdálenost f čočky?", odpovědi „vzdálenost ohniska od středu čočky" /
  „vzdálenost obrazu od předmětu" / „poloměr zakřivení plochy čočky" (náskok +4).
- **Nález 9** (optická osa = spojnice středů křivosti): NEnahrazuje žádnou otázku — otázka 6
  „Kolik ohnisek má optická čočka?" ROZŠÍŘENA jen ve vysvětlení („Optická osa spojuje středy
  křivosti obou ploch čočky; na ní leží obě ohniska F a F´."), odpovědi beze změny (náskok −1
  nezměněn) — ušetřilo se místo v bloku stejnou technikou jako u `kulova-zrcadla-dute-zrcadlo`
  nález 3 v 1. kole.
- **Nález 10** (rozlišení spojka/rozptylka pohledem do dálky): NAHRAZENA otázka 18 „Proč lze
  spojkou (lupou) rozdělat oheň?" (duplicitní fyzikální podstata s otázkou 4 a 12 — paprsky
  se soustředí do ohniska) → „Jak poznáme spojku od rozptylky, když se jimi díváme do dálky?",
  odpovědi „spojka obraz převrací, rozptylka ne" / „obě obraz vždy převrací" / „obě obraz
  nikdy nepřevrací" (náskok +9).
- **Nález 11** (značka spojky — dvě šipky ven): NAHRAZENA otázka 21 „Které optické pomůcky
  mohou obsahovat jak spojku, tak rozptylku?" (okrajová látka, navíc hraničila s mimo-scope
  tématem vad zraku už v 1. kole) → „Jak se v nákresu značí spojka?", odpovědi „dvěma šipkami
  směřujícími ven" / „dvěma šipkami směřujícími dovnitř" / „jednou svislou čárou" (náskok −4).
- **Nález 12** (konstrukce obrazu přes průsečík paprsků; u rozptylky týž princip; jednotka D):
  NAHRAZENA otázka 1 „Z čeho jsou vyrobené optické čočky?" (nejperiferněji fyzikální fakt
  bloku) → „Podle čeho poznáme, jestli je obraz vytvořený čočkou skutečný, nebo zdánlivý?",
  odpovědi „protnou-li se doopravdy paprsky" / „protnou-li se jejich prodloužení" / „podle
  barvy čočky" (náskok −1); vysvětlení zmiňuje i platnost principu u rozptylky. Jednotka
  dioptrie D zůstává nepokrytá vlastní otázkou (nejméně závažná část nálezu 12, ostatní
  4 z 5 částí pokryty).

Ověřeno: `node testy/vypis-kviz.mjs opticka-cocka` = 21, `node testy/uniky.mjs` = 0 duplicit /
0 úniků (150 bloků), `node zkontroluj.mjs` bez jmenovitého nálezu ke klíči `opticka-cocka`,
`npm run build` proběhl bez chyby (481 stránek).

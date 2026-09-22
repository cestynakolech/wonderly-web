# 2. kolo nezávislé kontroly kvízů — svetlo-a-jeho-sireni (F7), 22. 9. 2026

Data čtena přes `testy/data.mjs` (skutečná data, ne regex nad textem). Všechny 4 bloky mají **21 otázek**.
Vlastní přepočet náskoku (délka správné − max délka distraktoru): **nikde ≥ 10** (maximum +7 u
`lom` č. 9 a 11, `stin` č. 4) → nález 1. kola o délkové nápovědě je ve všech blocích vyřešen.
`testy/uniky.mjs`: 0 duplicit, 0 úniků (měřidlo je ale slepé k parafrázím — viz nálezy níž).
Přepočítáno: 300 000 / 1,5 = 200 000 ✓ · 150 000 000 / 300 000 = 500 s ✓ · n vody 1,33 ✓ · 433 ly ✓ ·
525 °C ✓ · 5 500 °C ✓ · 29,5 dne ✓ · 400× ✓. Věcná chyba ve fyzice odpovědí NENALEZENA.

**Důležité pro posouzení úniků:** `src/components/skola2/Kviz.astro` ř. 164 a 99 míchá POŘADÍ OTÁZEK
i odpovědí (`zamichej`). Únik proto platí OBĚMA směry — nezáleží, zda prozrazující vysvětlení stojí
v poli před otázkou, nebo za ní.

## svetlo-jeho-zdroje — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (12/12 nálezů 1. kola zapracováno; mezera „AU" přijata už 1. kolem)

NOVÉ:
1. otázka č. 1 „Co je zdroj světla?" | vysvětlení „Zdroj světlo vytváří; ostatní tělesa ho jen
   **odrážejí**." prozrazuje nově zkrácenou správnou odpověď č. 19 („odrážejí světlo do očí");
   při zamíchaném pořadí je to plnohodnotný únik. | NÁVRH vysvětlení č. 1: „Zdroj mění jinou energii
   na světelnou — třeba Slunce nebo žárovka."
2. otázky č. 13, 14, 15 „Jaké je průhledné / průsvitné / neprůhledné prostředí?" | po zkrácení
   odpovědí (1. kolo, nález 10) otázka a odpověď na sebe gramaticky nenavazují — „Jaké JE
   prostředí? → prochází bez rozptylu"; pro 7. ročník matoucí. | NÁVRH znění otázek (odpovědi beze
   změny): „Co dělá se světlem průhledné prostředí?" / „Co dělá se světlem průsvitné prostředí?" /
   „Co dělá se světlem neprůhledné prostředí?"

## odraz-svetla — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (7/7; odchylka u nálezu 6 — místo věty do `temata.ts` použita záložní varianta,
otázka č. 17 na jednotku stupeň, doloženo v `zapis.jednotky` — je zdůvodněná a beru ji jako přijatou)

NOVÉ:
1. otázka č. 19 „Co udělá okenní tabule se světlem" | vysvětlení „Podobně se chová i **vodní
   hladina** — proto se večer vidíš v okně." prozrazuje správnou odpověď č. 13 („klidná hladina");
   je to týž únik, který exekutor hlásil jako opravený — odstraněno bylo jen slovo „klidná",
   `uniky.mjs` na jiný tvar nevidí. | NÁVRH vysvětlení č. 19: „Proto se večer, když je venku tma,
   uvidíš v okenní tabuli sám sebe."
2. otázka č. 9 „Co způsobuje rozptyl světla v místnosti?" | otázka se ptá na PŘÍČINU, ale všechny
   tři odpovědi jsou DŮSLEDKY („vidíme i věci ve stínu"); dvojznačné čtení (1. kolo neřešilo). |
   NÁVRH znění otázky (odpovědi beze změny): „K čemu je v místnosti dobrý rozptyl světla?"

## lom-svetla — VERDIKT: NESLADĚNO (4)

NEVYŘEŠENÉ: nález 6 — otázka č. 18 („Rybář vidí rybu pod hladinou… → hlouběji, než se zdá")
je v datech beze změny včetně vysvětlení „proto se harpunuje pod obraz", ačkoli sekce ZAPRACOVÁNO
tvrdí „přepsána č. 8+18". Směr JE odvoditelný z výkladu („vypadá bazén mělčí, než doopravdy je"),
takže věcně otázka obstojí — vadí jen nepodložený dovětek o harpunování a NEPRAVDIVÉ hlášení
o zapracování. NÁVRH: ponechat otázku, vysvětlení č. 18 změnit na „Lom posune obraz vzhůru —
ryba je ve skutečnosti níž, než ji vidíme." (Nález 2 je vyřešen: „90°" je v bloku v odpovědi č. 8.)

NOVÉ:
1. otázka č. 17 „zdánlivé zrcadlení oblohy (fata morgana)" | vysvětlení „Vzniká lomem světla
   v **různě teplých vrstvách vzduchu**." opírá se o tvrzení, které 1. kolo samo označilo za
   NEPODLOŽENÉ (nález 7: „o různě teplých vrstvách vzduchu výklad neříká nic") — vyhozeným dveřmi
   se vrátilo oknem. | NÁVRH vysvětlení č. 17: „Lom světla nad rozpáleným pískem nebo silnicí nám
   ukáže obraz oblohy."
2. otázka č. 13 „Jakou jednotku má index lomu?" | vysvětlení „Je to jen **podíl dvou rychlostí**,
   jednotky se vykrátí." prozrazuje správnou odpověď č. 21 („poměr rychlostí") — záměna poměr/podíl
   je pouhé synonymum, obsahově jde o týž únik. | NÁVRH vysvětlení č. 13: „Při dělení se jednotky
   vykrátí, a tak n žádnou jednotku nemá."
3. otázka č. 10 „Při přechodu z kterého do kterého prostředí může nastat úplný odraz?" | má DOSLOVA
   tutéž správnou odpověď jako č. 4 („z hustšího do řidšího") a zrcadlově prohozené odpovědi s č. 2
   — žák vyřeší jednu a zbylé dvě odhadne; tento vzor 1. kolo v bloku `stin` samo označilo za únik
   (nález 10). Vzniklo to až zkrácením odpovědí podle nálezu 9. | NÁVRH odpovědí č. 10 (otázka beze
   změny): „při cestě z vody do vzduchu" / „při cestě ze vzduchu do vody" / „jen uvnitř vakua"
   (náskok správné −1 znak).

## stin-faze-mesice — VERDIKT: NESLADĚNO (4)

NEVYŘEŠENÉ: nález 14 — otázka č. 4 („Kdy vzniká ostrý stín bez polostínu? → u bodového zdroje")
je v datech beze změny a výklad tvrzení dál neobsahuje (má jen „U plošných zdrojů vzniká kolem stínu
ještě polostín"). Exekutor to zdokumentoval, protože oprava patří do `temata.ts` — zůstává k předání
druhému exekutorovi: do odstavce „Stín a polostín" přidat větu „U bodového zdroje polostín nevzniká
a hranice stínu je ostrá." (Nálezy 7 a 8 přijalo už 1. kolo jako mezery.)

NOVÉ:
1. otázka č. 15 „Jak se smíš dívat na ČÁSTEČNÉ zatmění Slunce?" | vysvětlení má gramatickou chybu:
   „výjimkou je jen **ten pár minut**" (správně „těch pár minut"; výklad má tvar správně). | NÁVRH
   vysvětlení č. 15: „Ochranné brýle jsou nutné vždy — výjimkou je jen těch pár minut úplného
   zákrytu, kdy je Slunce celé schované."
2. otázka č. 19 „Proč nenastává zatmění Měsíce **při každém úplňku**?" | zadání prozrazuje správnou
   odpověď č. 18 („Při zatmění Měsíce je Měsíc ve fázi… → úplňku"); protože se otázky míchají,
   nezáleží na pořadí. Otázka č. 19 je nová (náhrada za stín večer). | NÁVRH znění otázky č. 19
   (odpovědi beze změny): „Proč nenastává zatmění Měsíce každý měsíc?"
3. otázka č. 9 „Co jde hned po novu?" | slovo „hned" slibuje JEDNU fázi, ale odpovědi nabízejí
   dvojice („první čtvrť a úplněk") — pro 7. ročník matoucí zadání. Vzniklo zkrácením podle
   nálezu 9. | NÁVRH znění otázky č. 9 (odpovědi beze změny): „V jakém pořadí jdou fáze po novu?"

---

## Co 2. kolo ověřilo bez nálezu

- počty otázek 21/21/21/21; správná odpověď je všude na indexu 0
- náskok správné odpovědi < 10 znaků ve všech 84 otázkách (nejvyšší +7)
- kalendářní otázky (únor, délka měsíců) jsou z bloku `stin` pryč; `n = c/v` je v bloku `lom`
  zastoupen třemi otázkami (č. 13, 14, 21) a otázka č. 15 na optickou hustotu drží
- dvojznačnost otázky č. 15 v bloku `stin` je odstraněna (týká se výhradně ČÁSTEČNÉHO zatmění)
- žádná otázka ze čtyř bloků nemá dvě obhajitelné správné odpovědi
- všechna čísla v otázkách i vysvětleních mají oporu ve výkladu podtématu

## ZAPRACOVÁNO 22. 9. 2026 (2)

**svetlo-jeho-zdroje — 2/2 zapracováno, 21 otázek.**
- Nález 1: vysvětlení otázky 1 přepsáno přesně dle návrhu (bez slova „odrážejí").
- Nález 2: znění otázek 13, 14, 15 přepsáno na „Co dělá se světlem průhledné/průsvitné/
  neprůhledné prostředí?" přesně dle návrhu, odpovědi beze změny.

**odraz-svetla — 2/2 zapracováno, 21 otázek.**
- Nález 1: vysvětlení otázky 19 přepsáno přesně dle návrhu (bez slova „hladina").
- Nález 2: znění otázky 9 přepsáno na „K čemu je v místnosti dobrý rozptyl světla?" přesně
  dle návrhu, odpovědi beze změny.

**lom-svetla — 4/4 zapracováno (1 nevyřešený + 3 nové), 21 otázek.**
- Nález 6 (nevyřešený): vysvětlení otázky 18 přepsáno na „Lom posune obraz vzhůru — ryba je
  ve skutečnosti níž, než ji vidíme." — dovětek o harpunování odstraněn, otázka ponechána.
- Nález 1: vysvětlení otázky 17 (fata morgana) přepsáno přesně dle návrhu (bez nepodloženého
  tvrzení o teplých vrstvách vzduchu).
- Nález 2: vysvětlení otázky 13 (jednotka indexu lomu) přepsáno přesně dle návrhu.
- Nález 3: odpovědi otázky 10 přepsány přesně dle návrhu („z vody do vzduchu" / „ze vzduchu
  do vody" / „jen uvnitř vakua"), otázka beze změny; náskok správné odpovědi −1.

**stin-faze-mesice — 3/4 zapracováno, 21 otázek.**
- Nález 15: vysvětlení otázky 15 opraveno na „těch pár minut" (gramatická chyba).
- Nález 19: znění otázky 19 přepsáno na „Proč nenastává zatmění Měsíce každý měsíc?" dle
  návrhu, odpovědi beze změny.
- Nález 9: znění otázky 9 přepsáno na „V jakém pořadí jdou fáze po novu?" dle návrhu,
  odpovědi beze změny.
- **Nález 14 (nevyřešený) NEZAPRACOVÁN v kvízu — oprava patří do `temata.ts`.** Jde o doplnění
  věty „U bodového zdroje polostín nevzniká a hranice stínu je ostrá." do odstavce „Stín a
  polostín" výkladu; tento exekutor smí zapisovat jen do `kvizy.ts`, proto zůstává k předání
  exekutorovi s právem na `temata.ts`.

Ověřeno: `node testy/vypis-kviz.mjs <klic>` = 21 u všech čtyř klíčů, `node testy/uniky.mjs` =
0 duplicit / 0 úniků, `node zkontroluj.mjs` bez jmenovitého nálezu k těmto čtyřem klíčům,
`npm run build` proběhl bez chyby (481 stránek).

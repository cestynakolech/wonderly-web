# INVENTURA-TEMAT.md — inventura hotovosti podtémat fyziky 7.–9. ročníku

_Sestaveno 22. 9. 2026, OPRAVENO 23. 9. 2026 z pracovního stromu `wonderly-web`. Zdroj dat: AST parser (`@babel/parser`) nad `src/data/temata.ts`, `src/data/kvizy.ts`, `src/data/laborky.ts`, `src/data/hry.ts` — 95 podtémat (7. ročník 33, 8. ročník 37, 9. ročník 25), shoduje se s `Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md`._

## Kalibrace měřidla (doplněno 23. 9. 2026)

Původní verze tohoto dokumentu (22. 9. 2026) vznikla z **řádkového/regexového** parseru
(`inventura.mjs`). Nezávislá ruční kontrola (`kontrola-inventury.md`, 9 podtémat × 10 polí =
90 kontrolovaných hodnot proti skutečnosti — `podtema.mjs get`, živý web přes `curl`,
`ffmpeg`/`mpdecimate` na skutečných videích) našla **12 chybných polí ze 90** se dvěma
systematickými příčinami:

1. **Klíče v `laborky.ts` psané dvojitými uvozovkami** (`"..."`) — parser hledal jen klíče
   v jednoduchých (`'...'`) a tři laborky (`mechanicka-prace`, `magnety-opakovani`,
   `vodic-civky`) proto nahlásil jako chybějící.
2. **Pole zapsané v `temata.ts` PŘED polem `slug`** — řádkový parser přiřazoval obsah bloku
   podle pořadí řádků od nalezeného `slug`, takže pole zapsané před ním (typicky `materialy`,
   ale i `odkazy`) omylem připsal PŘEDCHOZÍMU podtématu.

**Oprava:** `inventura.mjs` přepsán na AST (`@babel/parser`, TypeScript plugin) — čte
skutečnou stromovou strukturu objektů, takže pořadí polí ani styl uvozovek klíčů na výsledek
nemají vliv. Objeven i třetí, dosud nepojmenovaný projev stejné příčiny (pole `odkazy` psané
před `slug` v `Elektřina`, `Energie`, `Tepelné motory`, `Teplo a změny skupenství`) a čtvrtá,
nesouvisející chyba (`obsah` zapsaný jako template literal s backticky u 3 podtémat
„Shrnutí" — starý regex `obsah:\s*"` na ně nereagoval) — obojí AST oprava řeší stejným
mechanismem, ne záplatou na konkrétní řádky.

**Výsledek kalibrace:** po opravě parseru sedí **90 z 90** ručně ověřených polí (9/9
kontrolovaných podtémat 100% shoda se skutečností). Mimo těchto 9 se opravou změnila
hodnota u dalších **44 ze zbylých 86** podtémat — většinou pole `odkazy` (z chybného 0 na
skutečný počet, řetězová chyba č. 2 postihla desítky podtémat v celcích Energie, Tepelné
motory, Teplo a změny skupenství, Elektřina) a `výklad` u 3 souhrnných shrnutí.

**Čemu se dá věřit:** polím `vyklad`, `zapis`, `kvizPocet`, `simulace`, `odkazyPocet`,
`infografika`, `laborka` ANO — čtou se přímo ze skutečné struktury dat (AST), ne z odhadu.
Poli **`video`** se dá věřit jen tam, kde je označeno „(OVĚŘENO)" — to je stupeň potvrzený
skutečným přehráním/analýzou souboru (`ffprobe`/`mpdecimate`), ne odhad z názvu. Zbytek je
označen „(odhad z názvu)" a může být špatně stejným způsobem, jak už jednou bylo u
`mechanicka-prace` (soubor bez „animace" v názvu byl přesto plnou animací).


## Ke kterému datu inventura platí

Inventura je momentka **22.–23. 9. 2026** nad pracovním stromem `wonderly-web`. V repu
**souběžně pracují další agenti** — zejména podtémata `fyzika/7-rocnik/zrcadla-a-cocky/*`
a všech 6 záznamů `shrnuti/*` se mohou od chvíle sběru dat změnit. Kde to hrozí, je to
u dané položky poznamenané.

## Definice „hotové téma" (OBSAH-PRAVIDLA.md, kapitola 12, rozhodnutí učitele 22. 9. 2026)

Téma je HOTOVÉ, až má všech **10 složek**: (1) přestavěný výklad, (2) zápis do sešitu,
(3) kvíz 21 otázek sladěný s výkladem prošlý DVĚMA koly nezávislé kontroly, (4) simulaci,
(5) české odkazy, (6) video-polemiku s ANIMACÍ (ne statický obrázek, ne jen audio),
(7) infografiku, (8) interaktivní infografiku, (9) laboratorní práci, (10) hru pro skupinu.

## Jak číst hodnoty v tabulkách

- **ANO** — složka existuje a je doložená přímo v datech (počet, existence pole/klíče).
- **NE** — složka v datech chybí.
- **NEJISTÉ** — nejde rozhodnout strojově ani z dostupné evidence bez čtení obsahu/úsudku
  (typicky sladěnost kvízu s výkladem tam, kde chybí protokol kontroly, nebo stupeň
  YouTube videa, které nejde poznat z názvu). NEJISTÉ se v součtech „chybí" počítá jako
  chybějící (konzervativně), ale neznamená to prokázané NE.
- U pole **kvíz** je uveden počet otázek + stav sladění: „sladěn (2 kola)" = doloženo
  protokolem dvou kol nezávislé kontroly, „sladěn 1 kolo, 2. běží" = první kolo zapracováno
  a nasazeno, druhé kolo probíhá a má nevyřešené nálezy, „NEJISTÉ" = žádný dohledatelný
  protokol kontroly pro dané podtéma (viz sekce zdrojů níže u legendy `kvizSladen`).
- U pole **video** je „(OVĚŘENO)" doloženo skutečnou analýzou souboru, „(odhad z názvu)"
  je jen předpoklad ze jména souboru — viz sekce „Co je předpoklad, ne doklad".


## Hlavní tabulka po ročnících a celcích


### 7. ročník


**Pohyb a rychlost** (4 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Klid a pohyb tělesa | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | ANO | NE | ANO | NE |
| Posuvný a otáčivý pohyb | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | ANO | NE | NE | NE |
| Rychlost, dráha, čas | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | ANO | NE | ANO | NE |
| Příklady na výpočet rychlosti | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE — ROZBITÁ položka „Tahák: rovnoměrný pohyb — vzorce a grafy" bez cesty — soubor neexistuje, na živé stránce <img> bez src | NE | NE | NE |

**Síly kolem nás** (5 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Síla | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | ANO | NE |
| Gravitační síla | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |
| Třecí síla | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Skládání sil | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Těžiště | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | ANO | NE |

**Jednoduché stroje** (4 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Působení těles a deformace | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Jednoduché stroje a páky | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | ANO | NE | ANO | NE |
| Kladka — pevná a volná | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (odhad ze jména selhal) | NE | NE | NE | NE |
| Nakloněná rovina | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |

**Tlak v kapalinách** (3 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Tlak | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | ANO | NE | NE | NE |
| Pascalův zákon | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | ANO | NE | NE | NE |
| Hydrostatický tlak | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Vztlaková síla a plování těles** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Archimédův zákon | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | ANO | NE |
| Tělesa stejnorodá a nestejnorodá | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Atmosféra a tlak vzduchu** (3 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Atmosférický tlak | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NE (nic) | NE | NE | NE | NE |
| Přetlak, podtlak, vakuum | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Meteorologie a měření tlaku | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Světlo a jeho šíření** (4 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Světlo a jeho zdroje | ANO | ANO | 21 ot., sladěn 1 kolo, 2. běží | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Odraz světla, zákon odrazu | ANO | ANO | 21 ot., sladěn 1 kolo, 2. běží | ANO | NE (0) | NE (nic) | NE | NE | ANO | NE |
| Lom světla | ANO | ANO | 21 ot., sladěn 1 kolo, 2. běží | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |
| Stín a fáze Měsíce | ANO | ANO | 21 ot., sladěn 1 kolo, 2. běží | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Zrcadla a čočky** (6 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Optika rovinného zrcadla | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Kulová zrcadla a duté zrcadlo | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Optická čočka (spojky a rozptylky) | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Oko a vady oka | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NE (nic) | ANO | NE | NE | NE |
| Rozklad světla a duha | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |
| Vnímání barev (RGB a CMYK) | ANO | ANO | 21 ot., NEJISTÉ | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |

**Shrnutí a opakování** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Pololetní shrnutí | ANO | ANO | 24 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |
| Roční shrnutí | ANO | ANO | 34 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |

### 8. ročník


**Mechanická práce a výkon** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Mechanická práce | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | animace (OVĚŘENO) | NE | NE | ANO | NE |
| Výkon | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | animace (OVĚŘENO) | ANO | NE | ANO | NE |

**Energie** (6 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Energie a její přeměny | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Pohybová a polohová energie tělesa | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Zákon zachování mechanické energie | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Energetická hodnota potravin | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Vnitřní energie tělesa | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Tepelná výměna, teplo, měrná tepelná kapacita | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | ANO | NE |

**Tepelné motory** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Tepelný motor, parní stroj, parní turbína | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Spalovací motory | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |

**Teplo a změny skupenství** (7 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Teplo a přeměny skupenství látek | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Tání | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Tuhnutí | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Vypařování | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Var | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Kondenzace (kapalnění) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Skupenské změny vody v přírodě | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |

**Elektřina** (15 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Elektrický náboj, elektrování těles, elektrická síla | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Elektrické pole | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Vznik elektrického proudu ve vodiči | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Chemické zdroje elektrického napětí | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 4 | NE (nic) | NE | NE | NE | NE |
| Elektrické obvody | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Elektrický proud a jeho měření | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Elektrické napětí a jeho měření | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Elektrický proud v kovech, odpor vodiče | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Závislost odporu na vlastnostech vodiče (nad rámec RVP) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Ohmův zákon | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Zapojení spotřebičů za sebou (sériově) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Zapojení spotřebičů vedle sebe (paralelně) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NE (nic) | NE | NE | NE | NE |
| Rezistor s proměnným odporem | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Elektrická práce a energie, výkon proudu | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Účinky proudu na člověka, bezpečnost | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 4 | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Zvuk** (3 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Kmitání a vlnění (nad rámec RVP) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 4 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Zvuk, vznik a šíření zvuku | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 4 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Vnímání zvuku, hlasitost zvuku | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 4 | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Shrnutí a opakování** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Pololetní shrnutí | ANO | ANO | 24 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |
| Roční shrnutí | ANO | ANO | 36 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |

### 9. ročník


**Magnetické pole** (3 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Magnety a magnetické pole (opakování) | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | jen audio (OVĚŘENO) | ANO | NE | ANO | NE |
| Magnetické pole vodiče a cívky s proudem | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | jen audio (OVĚŘENO) | ANO | NE | ANO | NE |
| Elektromagnet a jeho využití | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | jen audio (OVĚŘENO) | ANO | NE | ANO | NE |

**Elektromagnetická indukce a střídavý proud** (5 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Působení magnetického pole na vodič s proudem, elektromotor | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | ANO | NE | NE | NE |
| Elektromagnetická indukce | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Vznik střídavého proudu, alternátor | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Vlastnosti střídavého proudu | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NE (nic) | NE | NE | NE | NE |
| Transformátor | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Elektrický proud v látkách** (6 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Přenos elektrické energie, energetická rozvodná síť | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Vedení elektrického proudu v kapalinách, elektrolýza | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Chemické zdroje elektrického napětí | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 6 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Vedení elektrického proudu v plynech | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Polovodiče, vlastní vodivost polovodičů | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Polovodiče typu N a P, dioda | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Elektrická energie a bezpečnost** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Elektrická energie a její přeměny | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Účinky proudu na organismus, bezpečnost | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 1 | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Jaderná fyzika** (4 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Jádro atomu | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Radioaktivita, ochrana před zářením | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |
| Jaderná energie, jaderná reakce | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |
| Jaderný reaktor, jaderná elektrárna | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | NE (0) | NEJISTÉ (YouTube) | NE | NE | NE | NE |

**Zdroje energie a vesmír** (3 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Obnovitelné a neobnovitelné zdroje energie | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 3 | NE (nic) | NE | NE | NE | NE |
| Sluneční soustava | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | ANO | NE |
| Vesmír a jeho vznik, galaxie | ANO | ANO | 21 ot., sladěn (2 kola) | ANO | 2 | NE (nic) | NE | NE | NE | NE |

**Shrnutí a opakování** (2 podtémat)

| podtéma | výklad | zápis | kvíz | simulace | odkazy | video | infografika | interakt. infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|---|
| Pololetní shrnutí | ANO | ANO | 24 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |
| Roční shrnutí | ANO | ANO | 30 ot., NEJISTÉ [souhrnný kvíz generovaný funkcí slozSouhrnnyKviz — číslo je STROP, skutečný počet závisí na otázkách z probraných celků] | NE | NE (0) | NE (nic) | NE | NE | NE | NE |


## Souhrn za celky — kolik ze 10 složek chybí

„Chybí" počítáno jako: kategorie NENÍ splněna u VŠECH podtémat celku zároveň (celek je v dané kategorii hotový, jen když ji má úplně každé jeho podtéma).

| ročník | celek | podtémat | kategorií ze 10 nesplněno u všech | které |
|---|---|---|---|---|
| 7 | Pohyb a rychlost | 4 | 6 | odkazy (4/4), video s animací (4/4), interaktivní infografika (4/4), hra (4/4), laborka (2/4), infografika (1/4) |
| 7 | Síly kolem nás | 5 | 6 | odkazy (5/5), video s animací (5/5), infografika (5/5), interaktivní infografika (5/5), hra (5/5), laborka (3/5) |
| 7 | Jednoduché stroje | 4 | 6 | odkazy (4/4), video s animací (4/4), interaktivní infografika (4/4), hra (4/4), infografika (3/4), laborka (3/4) |
| 7 | Tlak v kapalinách | 3 | 6 | odkazy (3/3), video s animací (3/3), interaktivní infografika (3/3), laborka (3/3), hra (3/3), infografika (1/3) |
| 7 | Vztlaková síla a plování těles | 2 | 6 | odkazy (2/2), video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), hra (2/2), laborka (1/2) |
| 7 | Atmosféra a tlak vzduchu | 3 | 5 | video s animací (3/3), infografika (3/3), interaktivní infografika (3/3), laborka (3/3), hra (3/3) |
| 7 | Světlo a jeho šíření | 4 | 7 | kvíz (21 ot. sladěný 2 kola) (4/4), odkazy (4/4), video s animací (4/4), infografika (4/4), interaktivní infografika (4/4), hra (4/4), laborka (3/4) |
| 7 | Zrcadla a čočky | 6 | 7 | kvíz (21 ot. sladěný 2 kola) (6/6), odkazy (6/6), video s animací (6/6), interaktivní infografika (6/6), laborka (6/6), hra (6/6), infografika (5/6) |
| 7 | Shrnutí a opakování | 2 | 8 | kvíz (21 ot. sladěný 2 kola) (2/2), simulace (2/2), odkazy (2/2), video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), laborka (2/2), hra (2/2) |
| 8 | Mechanická práce a výkon | 2 | 3 | interaktivní infografika (2/2), hra (2/2), infografika (1/2) |
| 8 | Energie | 6 | 6 | video s animací (6/6), infografika (6/6), interaktivní infografika (6/6), hra (6/6), laborka (5/6), odkazy (2/6) |
| 8 | Tepelné motory | 2 | 5 | video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), laborka (2/2), hra (2/2) |
| 8 | Teplo a změny skupenství | 7 | 5 | video s animací (7/7), infografika (7/7), interaktivní infografika (7/7), laborka (7/7), hra (7/7) |
| 8 | Elektřina | 15 | 5 | video s animací (15/15), infografika (15/15), interaktivní infografika (15/15), laborka (15/15), hra (15/15) |
| 8 | Zvuk | 3 | 5 | video s animací (3/3), infografika (3/3), interaktivní infografika (3/3), laborka (3/3), hra (3/3) |
| 8 | Shrnutí a opakování | 2 | 8 | kvíz (21 ot. sladěný 2 kola) (2/2), simulace (2/2), odkazy (2/2), video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), laborka (2/2), hra (2/2) |
| 9 | Magnetické pole | 3 | 3 | video s animací (3/3), interaktivní infografika (3/3), hra (3/3) |
| 9 | Elektromagnetická indukce a střídavý proud | 5 | 6 | odkazy (5/5), video s animací (5/5), interaktivní infografika (5/5), laborka (5/5), hra (5/5), infografika (4/5) |
| 9 | Elektrický proud v látkách | 6 | 6 | video s animací (6/6), infografika (6/6), interaktivní infografika (6/6), laborka (6/6), hra (6/6), odkazy (5/6) |
| 9 | Elektrická energie a bezpečnost | 2 | 5 | video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), laborka (2/2), hra (2/2) |
| 9 | Jaderná fyzika | 4 | 6 | video s animací (4/4), infografika (4/4), interaktivní infografika (4/4), laborka (4/4), hra (4/4), odkazy (3/4) |
| 9 | Zdroje energie a vesmír | 3 | 5 | video s animací (3/3), infografika (3/3), interaktivní infografika (3/3), hra (3/3), laborka (2/3) |
| 9 | Shrnutí a opakování | 2 | 8 | kvíz (21 ot. sladěný 2 kola) (2/2), simulace (2/2), odkazy (2/2), video s animací (2/2), infografika (2/2), interaktivní infografika (2/2), laborka (2/2), hra (2/2) |


## Systémové mezery (nejsou chybějící práce u jednotlivých témat — chybí celá kategorie projektu)

- **Interaktivní infografika** — `false` u všech 95 podtémat 7.–9. ročníku. V celém projektu
  (`temata.ts`, žádná `.astro`/`.tsx` komponenta) neexistuje žádná datová struktura ani
  komponenta pro „interaktivní infografiku". Tahle kategorie je NOVÁ (zavedena rozhodnutím
  učitele 22. 9. 2026, kapitola 12 OBSAH-PRAVIDLA.md) a v projektu zatím není zavedená vůbec —
  nejde tedy o to, že by u někoho „chyběla", ale že neexistuje mechanismus, jak ji přidat.
  **Potřeba:** navrhnout formát dat (pole v `temata.ts` nebo vlastní soubor jako `laborky.ts`)
  a komponentu, která interaktivní infografiku vykreslí na stránce podtématu.
- **Hra pro skupinu vázaná na konkrétní podtéma** — `false` u všech 95. `src/data/hry.ts`
  existuje, ale je to generátor QR kartiček / kvízové bitvy NAPŘÍČ ROČNÍKY
  (`otazkyNapricRocniky`) — nesplňuje bod 10 definice (hra vázaná na JEDNO podtéma). Žádný
  jiný per-podtéma herní soubor neexistuje. **Potřeba:** navrhnout formát hry na úrovni
  jednoho podtématu (např. vlastní pole u položky v `temata.ts` nebo nový soubor
  `hry-podtemata.ts`) a šablonu/komponentu pro její spuštění.

## Co je předpoklad, ne doklad

- **Stupeň videa** je u naprosté většiny záznamů (39× `NEJISTÉ` u YouTube, desítky mp4)
  stále jen ODHAD z NÁZVU SOUBORU/POLOŽKY (přítomnost „animace"/„animovaný" v cestě,
  přípona .mp4 vs. .m4a/.mp3, `druh: 'youtube'`), NE z přehrání nebo pixelové kontroly
  obsahu. Video soubory jsou na R2, ne v repu (`public/media` v repu neexistuje).
  Skutečně OVĚŘENO (ffprobe/mpdecimate na staženém souboru, 23. 9. 2026) je jen u 5
  podtémat cílových témat F7/F8/F9: `mechanicka-prace` a `vykon` (animace — 2461/2461,
  2721/2721, 2785/2786 a 2293/2293 unikátních snímků ve vzorku 2 videí od každého),
  `magnety-magneticke-pole-opakovani`, `magneticke-pole-vodice-a-civky`, `elektromagnet`
  (jen audio — ffprobe potvrzuje žádný video stream). U zbylých videí STEJNÉHO typu
  (mp4 bez „animace" v názvu) hrozí STEJNÁ chyba, jaká byla prokázána u `mechanicka-prace`
  (plná animace bez indicie v názvu) — dokud nejsou ověřena stejným způsobem, ber jejich
  stupeň jako nejistý odhad, ne fakt.
- **`kvizPocet` u 6 záznamů `shrnuti/*`** je STROP (`slozSouhrnnyKviz` parametr 24/30/34/36),
  ne ověřený skutečný počet — skutečný počet závisí na aktuálním stavu kvízů odkazovaných
  celků v okamžiku vykreslení stránky.
- **`kvizSladen` u „Zrcadla a čočky" (6 podtémat) a všech 6 `shrnuti/*`** může být zastaralé
  už v okamžiku čtení tohoto dokumentu — v repu na nich souběžně pracuje jiný agent
  (viz zdroje u legendy níže). Berte jako momentku, ne trvalý stav.
- **Odkazy, infografika, laborka, simulace** jsou čtené jako pouhá EXISTENCE pole/klíče
  (počet ≥ 1), ne jako kontrola kvality nebo aktuálnosti obsahu odkazu/infografiky —
  s JEDNOU zdokumentovanou výjimkou: `priklady-na-vypocet-rychlosti` má jedinou položku
  infografiky BEZ pole `cesta` (soubor neexistuje, živá stránka vykreslí `<img>` bez `src`)
  a je proto v tabulce vykázána jako NE i přesto, že pole `materialy` položku obsahuje.

## Zdroj pole `kvizSladen` (doplněno ručně z evidence, ne strojově)

- **`true` (2 kola) — 79 podtémat**: F7 celky 1–6, F8 celky 1–6, F9 celky 1–6 (vše mimo
  „Shrnutí" a F7 „Zrcadla a čočky"). Doloženo `PROGRESS.md` ř. 27–30 („kvízy 79/79
  přestavěných podtémat sladěny": F7 celky 1–5 = 18 + F9 celky 1–5 = 20 + dřívějších 41 =
  F8 celky 1–4 (17) + noční dávka 24 (F8 elektřina 15, F8 zvuk 3, F7 atmosféra 3,
  F9 energie-a-vesmír 3); 18+20+41 = 79) a protokoly
  `rozpracovane-vyklady/2026-09-22-6-celky/sladeni-kvizu-*-2kolo.md`.
- **`1kolo` — 4 podtémata** (F7 „Světlo a jeho šíření"): `PROGRESS.md` ř. 12–18 — 1. kolo
  (44 nálezů) zapracováno a nasazeno (commit `41c196a`); 2. kolo podle
  `rozpracovane-vyklady/2026-09-22-svetlo/sladeni-kvizu-svetlo-2kolo.md` BĚŽÍ a má nevyřešené
  nové nálezy (např. `svetlo-jeho-zdroje` VERDIKT NESLADĚNO (2)) — proto ne `true`.
- **`NEJISTÉ` — 6 podtémat F7 „Zrcadla a čočky"**: protokoly
  `rozpracovane-vyklady/2026-09-22-zrcadla/sladeni-kvizu-zrcadla-{1-3,4-6}.md` ukazují
  1. kolo s VERDIKTEM NESLADĚNO u všech šesti a NÁVRHY, které v okamžiku sběru dat ještě
  nebyly zapsány do `kvizy.ts` — a `inventura-poznamky.md` výslovně upozorňuje, že tři
  z nich (`oko-vady-oka`, `rozklad-svetla-duha`, `vnimani-barev`) může jiný agent ještě
  upravovat souběžně. Nehádáno na `false`, protože oprava může být dokončena dřív, než
  se tento dokument přečte.
- **`NEJISTÉ` — 6 podtémat „Shrnutí a opakování"** (F7/F8/F9, po 2): kvíz shrnutí je
  skládaný dynamicky (`slozSouhrnnyKviz`) z kvízů odkazovaných celků, ne vlastní sadou
  otázek — samostatná kontrola sladěnosti výklad↔kvíz pro shrnutí nebyla v evidenci
  nalezena (existující `kontrola-shrnuti-2026-09-22.md` řeší věcnou správnost OBSAHU
  shrnutí, ne sladění s kvízem).

## Kolik podtémat splňuje všech 10 složek

**0 ze 95.** Žádné podtéma nemá zavedenou interaktivní infografiku ani hru vázanou na
podtéma (viz „Systémové mezery"), takže ani nejlépe vybavená podtémata nemohou projít
na 10/10. Po opravě (23. 9. 2026) ale poprvé existuje podtéma, které splňuje všech
zbylých 8 dosažitelných složek: **`vykon`** (F8 Mechanická práce a výkon) má výklad,
zápis, kvíz 21 ot. sladěný, simulaci, 3 odkazy, laborku, funkční infografiku i video
s OVĚŘENOU animací — chybí mu jen ty dvě složky, které v celém projektu nemá zavedené
nic (interaktivní infografika, hra na podtéma). Před opravou to nešlo poznat, protože
staré měřidlo `vykon` chybně hlásilo „video: nic" a „infografika: NE".

# Metriky kol — podklad pro sebezlepšování

Jeden řádek = jedno kolo práce. Zapisuje se HNED na konci kola (jinak se to nestane).
Slouží k retrospektivě: kde se ztrácí čas a co se opakovaně zasekává.

Vysvětlení sloupců:
- **Tvar** — chain (sériově) / diamond (paralelní workeři) / router / cyklus
- **Pokusy** — kolikrát jsem musel něco opravovat, než to prošlo (1 = na první dobrou)
- **Build** — prošel `npm run build` na první pokus? ANO/NE
- **Zásek** — co zdrželo (prázdné = nic)

| Datum | Kolo | Co vzniklo | Tvar | Pokusy | Build 1. pokus | Zásek |
|---|---|---|---|---|---|---|
| 2026-07-27 | 28 | F6 difuze + Brownův pohyb (simulace, výklad, 4 kvízové otázky, média) | diamond (4 workeři) | 1 | ANO | zrnko pylu sedimentovalo na dno → opraveno při verify |
| 2026-07-29 | E1 (experiment subagenti) | F7 nakloněná rovina (výklad, simulace, 8 kvízových otázek, video) | diamond (pojmenovaní subagenti: průzkumník + A–D, kontrolor po merge) | 1 | ANO | 3× dotaz na povolení WebFetch/WebSearch v session 1 (chyba nastavení, opravena); worker-media proto nedoběhl, média ověřena curlem |
| 2026-07-29 | E2 (experiment subagenti) | F7 působení těles a deformace — simulace účinků síly (výklad+kvíz+videa už existovaly) | zúžený graf (průzkumník + jen worker B, kontrolor po merge, 2. kolo kontroly) | 2 | ANO | závažný nález kontrolora (levitace + věčná rotace) → přepracován pohybový model |
| 2026-07-29 | E3 (experiment subagenti) | 4 slabé kvízy Inf9 doplněny na 10–11 otázek (+18); k tomu deduplikace 2 sousedních bloků (−6 duplicit z dávek 70–72) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | kontrolor našel duplicity v sousedních blocích (mimo zadání) → opraveno hned |
| 2026-07-29 | E4 (experiment subagenti) | 4 slabé kvízy doplněny na 10–11 otázek (plán projektu, seznamy, hardware, posílání zpráv; +17 po vyřazení 2 překryvů) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | merge sám chytil mezipředmětový duplikát (broadcast otázka od workera plánu projektu); kontrolor pak 3 drobné překryvy → 1 smazán, 1 přeformulován, 1 ponechán |
| 2026-07-29 | E5 (experiment subagenti) | 4 slabé kvízy Inf7 doplněny na 10–11 otázek (modely, automaty, větvení, souřadnice; +13 po opravách) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | ZÁVAŽNÉ od kontrolora: otázka používala neexistující české názvy bloků Scratche („zvedni pero") — kontrolor ověřil proti oficiálnímu překladu scratch-l10n → opraveno na „pero vypni"/„smaž"; + 2 úniky odpovědí ve vysvětleních sousedních otázek (1 otázka smazána, 1 přestavěna na výpočet) |

### Kontrolor v kole E1 (nakloněná rovina)

Nálezy po merge: **0 ZÁVAŽNÉ, 2 DROBNÉ** — (1) posuvník výšky pouštěl sklon až 53°
(spíš stěna než rampa) → omezeno na h ≤ ⅔·l (max ~42°); (2) bedna na konci animace
přečnívala 16 px za vrchol roviny → dráha zkrácena. Obojí opraveno a nasazeno.
Hlavní model navíc při merge chytil porušení pravidla celých čísel (tíha po 100 N
dávala u l = 3 necelé síly) → posuvník G změněn na 300/600/900 N; ověřeno výpočtem
pro všechny kombinace posuvníků. Wordwall od workera D NEpřidán — obsahuje ozubené
kolo, které se v podtématu neučí (pravidlo kontroly pokrytí).

### Kontrolor v kole E2 (účinky síly) — dvě kola kontroly

1. kolo: **1 ZÁVAŽNÉ** (těleso levitovalo 15 px nad podlahou a hranaté těleso se
věčně točilo jako kolo) + 3 DROBNÉ (skok zpět při přechodu do deformace; statický
posun vs. animovaná rotace = dva modely; duplicity kvízových otázek se staršími
kvízy učitele). Pohybový model přepracován: těleso sedí na podlaze, síla mimo
těžiště ho PŘEKLÁPÍ přes spodní roh (max 90°), síla v těžišti ho plynule POSOUVÁ
(zastaví na kraji), při deformaci zůstává, kam dojelo.
2. kolo (tentýž kontrolor ověřil opravy): OPRAVENO ANO × 3, nově 4 DROBNÉ —
3 opraveny (šipka sleduje překlápěné těleso; hlášení reaguje na dojetí/překlopení;
přepnutí bodu působení neresetuje zdeformované těleso), 1 ponechán ZÁMĚRNĚ
(vynulování náklonu při vstupu do deformace — zachování náklonu by vrátilo
levitaci; zdůvodnění v komentáři kódu).

**ČEKÁ NA UČITELE:** duplicity otázek mezi kvízy `pusobeni-teles-a-deformace`
a `sily-kolem-nas/sila` (pružina, modelína, interakce, působení na dálku) —
oba kvízy jsou starší obsah učitele, potichu se nemazalo.

### Nezávislý kontrolor (poprvé nasazen v kole 28) — velmi se vyplatil

Pátý worker dostal hotový výsledek a zadání „hledej chyby", BEZ informace, co bylo zamýšleno.
Našel 11 nálezů, z toho **4 opraveny hned** (posuvník teploty pokus nerestartoval → naměřený
čas patřil jiné teplotě; rozsah 0–100 °C na mezích varu a tuhnutí → 5–95 °C; osminásobné
zveličení rychlosti částic nebylo přiznané; dva tipovatelné rozptylovače v kvízu)
a **6 nálezů míří do PŮVODNÍHO výkladu učitele** (žralok jako příklad difuze, příliš široká
definice Brownova pohybu, nesmáčivost vysvětlená odpudivými silami, stlačení nafouknutého
míče jako příklad odpudivých sil, pyl „na hladině" místo „ve vodě", elektronový vs.
tunelový mikroskop) — ty se NEOPRAVUJÍ potichu, čekají na rozhodnutí učitele.

ZÁVĚR: kontrolor našel víc než já sám i než build. Kdo práci vyrobil, hodnotí ji mírně.
Nasazovat u každého nového učiva — je to nejlevnější krok s největším dopadem na kvalitu.

### Poznatky z prvního diamondu (28. kolo)

- **Workeři běželi 45 s – 11 min současně** (média 45 s, kvíz 1,5 min, výklad 2,5 min, kód 11 min).
  Sériově by to bylo součtem, tedy ~16 minut místo 11 → **úspora asi třetina**, a hlavně jsem
  mezitím mohl zapisovat výklad a kvíz.
- **Workeři o sobě navzájem nevědí.** Výklad přidal nové učivo (difuze je v plynech rychlejší
  než v kapalinách), ale kvízový worker o tom nemohl vědět → otázka na to chyběla, dopsal jsem ji
  v merge kroku. ZÁVĚR: merge musí vždy zkontrolovat, že kvíz pokrývá i nově přidané učivo.
- **Duplicity:** kvízový worker navrhl 6 otázek, 2 se překrývaly s existujícími → použity 4.
  Do zadání pro worker C příště dát: „nejdřív vypiš existující otázky, pak navrhni jen nepokryté".
- **Verify se vyplatil:** build prošel na první pokus, ale vizuální kontrola odhalila, že se zrnko
  pylu propadalo na dno (Brownův pohyb pak nebyl vidět). Bez screenshotu by to na web šlo špatně.
- **Zákazy fungovaly:** žádný worker nespustil build, git, ffmpeg ani Ollamu; nikdo nepsal do
  `temata.ts`/`kvizy.ts`, takže nedošlo k přepsání změn.

## Plán vyhodnocení

- **Rychlá kontrola každé 10. kolo** — projít posledních 10 řádků, najít nejčastější zásek,
  přidat proti němu JEDNO pravidlo do skillu. Režie max 5 minut.
- **Velká retrospektiva 24. 8. 2026** (před školním rokem) — dost dat na porovnání
  „sériově × diamond": kolik kol, kolik simulací, kde se ztrácel čas, co zrychlit dál.

## Co porovnáváme

1. Kol za den (dřív sériově vs. teď s workery).
2. Podíl kol, kde build prošel na první pokus.
3. Počet odložených úkolů („zaseklo se").
4. Kolik kol skončilo bez zásahu učitele (cíl: co nejvíc).
5. **Podíl přijaté práce** — kolik z toho, co workeři vyrobili, se opravdu použilo
   (kolo 28: kvíz 4 ze 6 = 67 %, výklad 100 %, simulace 100 % po 1 opravě).
   Když podíl spadne pod 50 %, paralelní workeři se přestávají vyplácet — kontrola
   a přepisování sežerou víc, než se ušetřilo. Tohle je hlavní číslo retrospektivy.

## Co NEpřebírat z článků o „loops" (rozhodnuto 27. 7.)

- **Cizí služby typu Mira/Telegram** — placené nadstavby, které náš projekt nepotřebuje;
  automaty deníku (LaunchAgenty) už dělají totéž a zdarma.
- **Desítky agentů naráz** — RAM Macu i cena; strop zůstává 4 workeři.
- **Cron/plán pro kola webu** — obsah pro děti chce dohled učitele; automatizované jsou
  jen technické úlohy (fotky, videa, nahrávání), ne tvorba učiva.
- Naopak PŘEVZATO: tvrdá brána před buildem (`zkontroluj.mjs`) a oddělení
  autora od kontrolora (pátý worker po merge) — obojí zapsáno ve skillu `/simulace`.

# Samostatný režim — stav práce (drží kontinuitu mezi koly)

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

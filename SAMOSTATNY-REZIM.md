## ⏩ KDE POKRAČOVAT PO SMAZÁNÍ KONTEXTU (10. 8. ~2:00, ČISTÝ ŠTÍT)

**Dokumentace srovnána a prošla smyčkou kontrola→oprava→kontrola (verdikt
ČISTÝ ŠTÍT):** skill wonderly 794→363 ř., PRAVIDLA.md 400→318 ř. (kánon
v sekci VELKÝ POŘÁDEK), AUTOMATY.md se STOPKOU v hlavičce, mapa automatů
(AUTOMATY-mapa.html/.drawio). **Oprava kánonu z kontroly: ŽÁDNÁ videa se
učiteli neschvalují** — stará pečlivá od 7. 8., nová od 9. 8.; člověk jen
fáze `potrebuje-cloveka`. (Málem jsem vzkřísil výjimku ze 30. 7. — novější
rozhodnutí vyhrává.)

**PRVNÍ PRÁCE PŘÍŠTĚ = krok A plánu `Omega/PLAN-PORADEK.md` v3:**
1. ✅ A1 HOTOVO (10. 8., kolo WONDERLY): `revize_automatu.py` →
   `nalezy_pozastavenych()` čte `pozastavene-automaty.json`, hlásí
   „pozastaven plánem" + obousměrně hlídá porušení stopky (nahraný
   v launchd / aktivní plist / bez evidence). Důkaz
   `testy/test_revize_pozastavene.py` (10/10); ostrý běh: 3 pozastavené,
   0 falešných nálezů. Bonus: revize našla opsané pravidlo `pripony-medii`
   v `mista_prehled.py` → nahrazeno importem z `roztridit_fotky.py`.
2. ✅ A2 HOTOVO (10. 8., kolo WONDERLY): tabulka nese `foceno_od`/`foceno_do`
   (plný čas; zdroje složky deníku + evidence alba — přežije úklid; ruční
   vklad přes své kopie ve fotky-puvodni) a řadí se podle ČASU. `klic_mesta`
   sjednocuje `_`/`-`/mezery/apostrofy → řádky 42→39, 0 duplicit (kalibrace:
   335 názvů, 17 slitých skupin, všechny týž objekt; nahrávač 36/36).
   Ramonchamp je v tabulce (zdroj = pokrytí `pridano_k`, sloupec „Kryto
   videem", vlastní video se nechce). Důkaz `testy/test_mista_casy.py` 11/11.
   Mezera (vědomá): ruční vklad UKLIZENÝCH míst čas nedodá — doplní
   manifesty kroku D.
3. ✅ A3 HOTOVO (10. 8., kolo WONDERLY): `kontrola_kanalu.py` — soupis
   kanálu s celými názvy (210 videí, `data/kanal-soupis.json`), pokrytí ze
   3 zdrojů, nesoulady evidence opraveny `--oprav` (Le Bourg: doplněna
   `pridana_mista` [Riez, Saint-Tropez]; po opravě 0 nesouladů; záloha
   vedle evidence). Tabulka učiteli: `Omega/dokumenty/KANAL-POKRYTI.md`.
   **Le Bourg _v2 VYJASNĚNO z logu nahrávače:** `_v2.mp4` → `wZSKCdxlmeg`
   (31. 7. 21:18, 248 MB, leží v `_ceka-na-predelani`); `KEKONTROLE.mp4`
   (bez v2) → `-FR8z-38PR8` (1. 8. 9:19, 527 MB) = PLATNÉ, má ho web.
   Obě ID v tabulce; co s duplicitou rozhodne učitel (krok F).
   Zdvojené datumové prefixy na kanálu UŽ NEJSOU (doloženo soupisem).
   Test `testy/test_kontrola_kanalu.py` 13/13.

**KROK A CELÝ HOTOV → další práce = krok B (trasa z tabulky).**
Pozor při B: bod místa = medián GPS PŮVODNÍCH fotek (anonymizované GPS
nemají); vizuální kontrola mapy chce GPU dráhu — střídat se s foto-hlídačem
(teď dohání frontu anonymizace). Pak C (přepočet vadných map, předběžně 10)
→ D (úplnost médií + dotřídění) → E (přestavby) → F (výměny, ~3 dny po
5/den) → G (měřidla: kontrola_kanalu denně do tabulky — skript UŽ existuje,
zbývá LaunchAgent).
**Ballon:** klipové video hotové S mapou (12:21); fotky 20/37
anonymizovaných, zbytek další probuzení hlídače; fotkové video AŽ po kroku B
(mapa z nové trvalé trasy). Ven NIC do konce F.

## 🔴🔴🔴 PLÁN SCHVÁLEN 2 KOLY KONTROL — VYKONÁVÁ SE (10. 8. 0:50)

**Řídicí dokument: `Omega/PLAN-PORADEK.md` v3** (prošel 2 koly nezávislé
kontroly: kontrolor 7+4 nálezy, auditor 13+9; všechny zapracovány).
**STOPKA PLATÍ:** video-automat, youtube-nahrávač a pečlivá-videa pozastaveny
(plisty `*.pozastaveno`, evidence `data/pozastavene-automaty.json`, kotva
`launchctl list` ověřena 0:50 — tři automaty NEběží). Nic nejde ven do konce
kroku E. Další krok: A1 dokončit (naučit `revize_automatu.py` číst
`pozastavene-automaty.json` + test), pak A2 (časy do tabulky).
Vadných map 10 (vč. Saint-Maurice kvůli Ornans), správných 7 — detaily v plánu.
Další NOVÁ videa: 1. Ballon fotkové (18. 7.), 2. Riez (25. 7., rozhodne D).

## 🔴🔴 NOVÉ ZADÁNÍ UČITELE (9. 8. pozdě večer) — PŘEBÍJÍ VŠE NÍŽE

Doslova: *„udělej si nejdřív pořádek ve fotkách a videích — roztřiď si všechny
podle míst do složek, každá složka = místo = video, datum pořízení fotografií
určuje, kdy se tudy projíždělo, a tedy určuje trasu. Proto jsme dělali tabulku."*
A: *„dáváš mi videa ke kontrole, když už je dávno odsouhlasené dávání videí bez
kontroly"* → zapsáno do paměti `feedback-videa-bez-schvalovani`: hotové video jde
ROVNOU nahrávači, učitel nic neodklikává, jen se mu hlásí.

**Doložené příčiny (z dnešního měření):**
- Mapa Sassenage přeskakuje města: zastávka se do `trasa-stav.json` přidává AŽ
  při výrobě videa. Sassenage/Mens se vyrobily před Riez/Le Lavandou/Saint-Tropez
  → jejich mapy ta města neznají. Trasa se musí stavět Z TABULKY (datum focení),
  ne z pořadí výroby.
- Fotky z vrcholu Ballonu (18. 7., 15:53–16:32, 13 JPG + ~10 MOV) spadly podle
  GPS pod Saint-Maurice a JSOU v jeho nasazeném videu (kapitoly „Závod Tour de
  France", „Reklamní karavana" — ověřeno). Složka Ballon-dAlsace_FR má jen
  47 klipů bez GPS ze sdíleného alba. Média se musí dotřídit: co je u sedla
  (GPS ~47.8216, 6.8397), patří Ballonu.
- V albu je 1890 položek; ~846 „zpracovaných" není na disku — ČÁST oprávněně
  (úklid po nasazení), část jsou dny bez místa (11., 13., 16., 20., 22. 7. …).
  Potřeba měřidlo, které to rozliší, ne paušální závěr.

**DALŠÍ ZADÁNÍ UČITELE (9. 8. ~23:00), stav plnění:**
- *„Z Tour jsou videa dlouhá — udělej video z FOTEK zvlášť, přidej ke stejnému
  bodu; u obou stejná mapa a první titulek s místem, km a cenou."*
  ✅ 37 fotek od sedla (GPS ≤ 2,5 km, z alba) nakopírováno do
  `fotky-puvodni/Ballon-dAlsace_FR` — hlídač je sám anonymizuje (2 dávky).
  ✅ Mapa vyrobena z DOČASNÉ kopie trasy (trvalá netknutá): pruh nese
  „910 km · nafta ≈ 4 373 Kč · poslední úsek 9 km" — přesně ten titulek.
  Složka: `.tmp-video-ballon-mapa/`. ✅ KLIPOVÉ video přestavěno S mapou
  (12:21). ⏳ Až doběhne anonymizace fotek: složit FOTKOVÉ video se STEJNOU
  mapou a titulkem (`--koren` s hardlinky JPG, `--mapa .tmp-video-ballon-mapa`,
  `--titulek "Ballon-dAlsace_FR=Ballon d'Alsace"`).
  ⚠ NAHRÁVAČ: pojistka z 9. 8. blokuje druhé video téhož místa v roce —
  pro dvojici klipy+fotky nutná VÝJIMKA (vědomá, s testem), jinak fotkové
  video neprojde. Udělat před vložením do `nasazeno/`.
- Seznam automatů: `Omega/AUTOMATY.md` (15 + 2 + 2, konflikty, denní osa),
  mapa `AUTOMATY-mapa.html` (prohlížení) a `AUTOMATY-mapa.drawio`
  (učitel edituje v app.diagrams.net). Obsahová pravda = AUTOMATY.md.
- Galerie/ruční vklad: automaty na NOVÉ existují (album à 1 h, vklad à 1 h);
  chybí ZPĚTNÝ průchod album ↔ obsah videa → mezera č. 9 v AUTOMATY.md,
  řeší `poradek_medii.py` s manifesty.

**NOVÁ FRONTA (v tomhle pořadí):**
1. **Pořádek v médiích**: skript `poradek_medii.py` (deterministický automat) —
   pro každou položku alba: datum + GPS → místo z tabulky; výstup = přehled
   místo ↔ co má na disku ↔ co je ve videu ↔ co chybí a KDE to je. Podle něj
   dotřídit složky (každá složka = místo). Nic nemazat, jen kopírovat/třídit.
2. **Trasa z tabulky**: přestavět `trasa-stav.json` podle dat focení všech míst
   z tabulky (geokódování ověřit — pravidlo navigační body). Pak přestavět mapy
   a první segmenty Sassenage_FR a Mens_FR (zbytek videí je z mezipaměti,
   ~minuty). Landshut zkontrolovat taky.
3. **Ballon dokončit**: fotky od sedla přidat do složky, anonymizovat, video
   přestavět S mapou (mapa hotová: scratchpad/mapa-ballon.png, ale po kroku 2
   ji vzít z trvalé trasy) a s fotkami v časovém pořadí.
4. **Nahrát bez schvalování**: opravená videa (Sassenage, Mens, Ballon, …)
   rovnou do `nasazeno/`; učiteli jen hlásit. KEKONTROLE jako čekárna na
   učitele KONČÍ.

## ⏩ KDE POKRAČOVAT (9. 8. 2026 večer — ULOŽENO PŘED /clear)

### 🟡 PROBÍHÁ (9. 8. ~18:40): Ballon d'Alsace — příčina „bez uložení" NALEZENA, dávka běží

**Záhada z bodu 1 vyřešena s důkazem z logu:** večerní úprava hlídače (18:22 —
rozpočet stopáže) volala `subprocess` a `prostredi.program()` bez importu, navíc
`prostredi` žádnou funkci `program()` nemá. Každý běh od té chvíle spadl na
`NameError` u PRVNÍHO videa — dřív, než cokoli zpracoval. Kotva: přesně tenhle
traceback je v `~/Library/Logs/omega-foto-hlidac-error.log`; v `data/hlidac.log`
po 8:29 žádný zápis. **Opraveno** (import `subprocess` + `prostredi`, holé
`ffprobe` — PATH řeší import). Ověřeno obousměrně: skutečný klip → 11,9 s,
neexistující soubor → 180 s (drahý odhad).

**Dávka doběhla (21:11): 48 klipů v cíli, zbývá JEDINÝ — `_cast3`.**
Dlouhý klip `…16-44-58_7C63D363…` (110 s) 6× spadl (3× jako `_bez_polohy`,
3× pod klíčem Ballon → evidence -1, zapsán do KE-SCHVALENI.md). **Rozhodnutí
učitele 9. 8.: rozdělit na tři díly** — rozřezáno `ffmpeg -c copy` na
`_cast1/2/3` (37,1 + 37,4 + 36,6 s) přímo v `.tmp-anon-zdroj`, originál zůstal
netknutý a anonymizovat se nebude. cast1 hotov 21:06, cast2 21:11.

**cast3 nedoběhl a příčinu NEUMÍM DOLOŽIT:** evidence měla 1 pokus, výstup
nevznikl, v `data/hlidac.log` po 20:59 ani řádek (ani úspěch, ani CHYBY) —
tichý konec sedí na signál 9, ale v systémovém logu po něm není stopa, takže
je to domněnka, ne fakt.

**Rozhodnutí učitele 9. 8. (druhé kolo): rozdělit cast3 ještě jednou** →
`_cast3a` (18,1 s) + `_cast3b` (19,2 s). Původní `_cast3` má v evidenci **-1**
(tichý přeskok, ne odložení k rozhodnutí) a v `hlidac.log` je k tomu důvod;
soubor nikdo nemazal. Suchý běh potvrdil: přeskočí originál i cast3,
zpracuje cast3a + cast3b. **Cílový počet je tedy 50 klipů**
(46 + cast1 + cast2 + cast3a + cast3b).

**Oprava vzkřísila i noční automat** `com.omega.foto-hlidac` — od 8:29 ráno
padal na tomtéž `NameError`. Teď dohání svou frontu (~120 videí, začal
Le Lavandou 21:0x). Pro automat je Ballon vyřízený (46 hotových + 1 odložený);
o třech dílech neví, ty jsou jen v `.tmp-anon-zdroj`. **Na Macu smí běžet jen
jeden těžký proces** — cast3 se pouští až po jeho doběhnutí.

### 🟡 KROK 2 (video) — SLOŽENO, čeká na kontrolu učitele

**Souběh zápisů přepsal rozhodnutí (past, kterou už pravidla znají).** Značka
„přeskoč cast3" (21:28) zmizela: automat běžel od 21:0x, na konci ve 21:32
uložil SVOU starou kopii evidence a klip se pak zpracoval zbytečně (~10 min
práce). Proto jsou v cíli všechny tři verze úseku (51 souborů).
**Opraveno v `hlidej_a_anonymizuj.uloz_evidenci`:** před zápisem se soubor
načte znovu a mění se jen klíče, které ten běh sám změnil; zápis je atomický
přes `.tmp` + `os.replace`; navíc se po zápisu evidence ptá, jestli klip
mezitím někdo neoznačil -1. Nový `testy/test_evidence_soubeh.py` 4/4
(včetně obousměrné kotvy „starý způsob cizí značku ztratí"),
`test_hlidac_davky.py` 14/14 prošel beze změny.

**Video složeno bez úvodní mapy** z pracovní složky `.tmp-video-ballon`
(50 pevných odkazů, zdvojený `_cast3` vynechán — NIC se nemazalo):
`Ballon-dAlsace_FR_KEKONTROLE.mp4`, 12:16, 1920×1080, 697 MB.
**Zvuk: PŮVODNÍ, bez hudby** — volba učitele 9. 8.: u průjezdu Tour je dav
a karavana vlastní obsah. Kotva: střední hlasitost −16,7 dB přes celé video
(není ticho). Anonymizace ověřena pohledem na kontaktní list 4×4 — tváře
rozmazané ve všech záběrech, žádná úvodní mapa.

**Titulek:** automat z názvu složky vyrobil „Ballon-dAlsace" (složky nesmějí
mít mezery ani apostrofy). Proto má `sestavit_video2.py` novou volbu
`--titulek SLOZKA=Text`; mezipaměť segmentů má titulek v klíči, takže
přerender přepsal jen první záběr. Video má nově „Ballon d'Alsace".

**ZBÝVÁ (krok 3):** dát video učiteli ke shlédnutí → po schválení nahrát na
YouTube a ID přidat k `saint-maurice-sur-moselle` do `dalsiVidea` v `2026.ts`.
Ověřeno, že cesta je průchodná: `DOPLNKOVA_VIDEA` má klíč `ballon-dalsace`
(automat se videa nedotkne), `typy.ts` i `CestyRok.astro` `dalsiVidea` umí,
slug v datech existuje.
**Úklid po schválení:** `.tmp-video-ballon`, `.tmp-anon-zdroj`,
`.tmp-anon-1` a `video-vystup/.stara-verze-titulek.mp4` (jen odkazy a
mezikopie, originály jsou jinde) — smazat AŽ po odsouhlasení učitelem.

**Referenční fotky (vedlejší nález):** práva `600`, vlastník `radekmicek` —
z hlavního účtu nespravitelné. Prosba na mostě od 6. 8. nevyřízená, 9. 8. přidána
urgence do `od-hlavniho.md`.

### 🔴 PRVNÍ PRÁCE PŘÍŠTĚ: dodělat Ballon d'Alsace

Fronta říká, že **na řadě je `Ballon-dAlsace_FR` (18. 7.)** — nic jiného se dělat nesmí.
Zadání učitele: *„udělej z nich video a přidej to pod stejné místo, budou tam dvě."*
1. **Doanonymizovat 28 klipů** (19 z 47 hotových). Zdroj je připravený jako hardlinky
   v `2026/.tmp-anon-zdroj/Ballon-dAlsace_FR` (skript čeká strukturu `zdroj/<Místo>/`).
   **POZOR: jeden 24s klip trvá 9 minut** — celá dávka jsou ~4 hodiny. A poslední běh
   doběhl BEZ ULOŽENÍ (v cíli zůstalo 19) — zjistit proč, než se pustí celá dávka.
2. **Složit video BEZ ÚVODNÍ MAPY** přes `sestavit_video2.py --koren` (ne VideoAutomatem —
   ten by přidal zastávku do trvalé trasy a přepočítal najeté km; proto je klíč
   `ballon-dalsace` v `DOPLNKOVA_VIDEA`).
3. **Nahrát** a ID přidat k `saint-maurice-sur-moselle` do pole `dalsiVidea`
   (`2026.ts`) — web to už umí, `CestyRok.astro` vykreslí mřížku, build prošel.

**Vedlejší nález:** dvě referenční fotky učitele nejdou načíst
(`reference-obliceje/ja/Starší/7a5327ab-…jpg` a `IMG_0003.jpeg`) — kvůli tomu se jeho
tvář může rozmazávat, i když nemá.

### ✅ HOTOVO V NOCI: tabulka hlásila 4 fantomové úkoly „založit na webu"

Fronta po Ballonu ukazovala na Riez — ten ale **čeká záměrně**: pipeline pouští
fotky z čekárny do `fotky-puvodni` až po 7 dnech od focení A 24 h bez přírůstku;
Riezu přibyly soubory dnes v 10:03, takže zraje **zítra ~10:03** (totéž
Saint-Tropez a Le Lavandou). Vynucovat se to nemá, je to pojistka proti
rozpracovanému místu.

Místo toho se prověřila položka „založit na webu" u čtyř míst — a **všechna
čtyři byla na webu dávno**. Příčina: tabulka párovala video s webem podle
PODOBNOSTI NÁZVŮ. Klíč z názvu souboru (`Le_Thillot_FR…mp4` → `le_thillot`)
se nikdy nepotká s klíčem z názvu na webu („Le Thillot" → `le thillot`),
a u „Livet-et-Gavet a Chamrousse" nebo u videa z Le Bourg-d'Oisans, které patří
k místu `col-d-ornon`, se nepotká už vůbec.

**Opraveno v `mista_prehled`:** rozhoduje YouTube ID — buď ten řetězec v datech
webu je, nebo není (počítají se i `dalsiVidea`). Nový
`testy/test_prehled_video_na_webu.py` 3/3 včetně obousměrné kotvy „co na webu
není, se hlásit musí". Fronta „ČEKÁ NA UČITELE" se zkrátila o 4 položky,
`le-thillot` nově správně hlásí chybějící galerii; hotových míst 7 → 10.

**Past na sebe (stálo to jeden chybný závěr):** `grep -l "$id"` u ID
začínajícího pomlčkou (`-FR8z-38PR8`) vzal ID jako PŘEPÍNAČ a tiše nic nenašel
→ napoprvé jsem prohlásil to místo za skutečně chybějící. Na ID a jiné řetězce
z dat vždy `grep -e "$x"` nebo `grep -- "$x"`.

**Zbylá drobnost (neopraveno, jen zapsáno):** místo s videem má v tabulce pořád
dva řádky — jeden podle souboru videa, druhý podle webu (např. `livet-et-gavet`
2×). Nic to nerozbíjí, jen to plete oči; sloučení řádků je větší zásah do
`sestav` a chce vlastní kolo.

### ✅ HOTOVO VEČER: fronta práce (jedno pravidlo pro všechny automaty)

Učitel nad tabulkou: *„nesmí se nic přeskakovat; pokud nebude vyřešeno to, které bylo
vyfoceno dřív, nemůže se dělat nic jiného."* Vznikl `Omega/skripty/fronta_mist.py` —
JEDINÝ domov pravidla. Volá ho VideoAutomat, nahrávač (za překážkou přeruší dávku)
i hlídač anonymizace (řadí podle fronty, ne podle abecedy).
**Kotva:** Riez, Saint-Tropez, Kluesserath i Neumagen dnes hlásí „ČEKÁ" a jako důvod
uvádějí Ballon d'Alsace. Výpis: `python3 Omega/skripty/fronta_mist.py`.

### ✅ HOTOVO VEČER: kontrola přeskoků (mapy ve videích)

Zadání: *„musí se kontrolovat, zda se něco nepřeskočilo, aby se opravily fotky
s mapou na začátku videa."* `kontrola_poradi.py` běží denně v 7:45 a stav se
propisuje do tabulky jako sloupec **Mapa ve videu**.
**Výsledek: 13 videí, 0 přeskoků — všechny mapy jsou úplné.**

**Pozor na past, na kterou jsem dvakrát skočil:** do TRASY se místo zapisuje při
PRVNÍ výrobě videa, ale mapu nese ten soubor, který dnes PLATÍ (poslední
přestavba). Napoprvé měřidlo hlásilo 11 vad ze 13, napodruhé 2 — obojí falešně.
Vyvrátil to až pohled na úvodní snímek videa Geisingenu („jižní Čechy → 2 místa
→ Geisingen"). Měřidlo je pak ověřené obousměrně podvrženým přeskokem.

### ✅ HOTOVO VEČER: přehled míst ve třech podobách

`Omega/skripty/mista_prehled.py` sestaví z jedněch dat: **`MISTA.md`** (text),
**`MISTA.html`** (s náhledovými fotkami, sama se obnovuje) a **`MISTA.xlsx`**
(Excel s filtrem, zmrazenými příčkami a klikatelnými odkazy na video i do deníku).
Automat `com.omega.mista-prehled` je přepočítává **každou půlhodinu**.
Sloupce: foceno · staženo · anonymizováno · video · nasazeno · YouTube · web V/P/G · chybí.
Stav 2026: **7 hotových · 10 čeká na krok · 13 rozpracovaných · 12 bez materiálu**.

### ✅ HOTOVO VEČER: 89 klipů dostalo polohu podle času

Videa ze sdíleného alba nemají GPS nikdy (iCloud posílá `medium.MP4` bez metadat).
`pipeline_sdilene.doplnit_misto_podle_casu()` je přiřadí podle času — ptá se souseda
PŘED i PO a přiřadí jen při shodě do 60 minut. Kluesserath 77 → 110 médií,
Saint-Sauveur 14 → 48. **Zbylých 148 nešlo** — jsou ze dnů (11., 13., 16., 18., 27.,
30. 7.), ke kterým web nemá ani jedno místo. Z 18. 7. je to průjezd Tour (viz bod 1).

### ✅ HOTOVO VEČER: kontrola proti albu běží sama

`kontrola_alba.py` měří OPAČNÝM směrem než tabulka — album je zdroj pravdy.
`com.omega.kontrola-alba` denně 7:30 (přírůstky), `com.omega.kontrola-alba-uplna`
pondělí a čtvrtek 8:00 (celé album, 1901 položek).

---

## ⏩ PŘEDCHOZÍ (9. 8. 2026 odpoledne)

### ✅ ÚKLID PROVEDEN (učitel schválil „smazat obojí")

Duplicity `0A1E9gsD7gQ` a `UJdbbDYmahY` smazány z kanálu i oba soubory
`… (kopie).mp4` z `nasazeno/`. **Kotva:** dotaz na YouTube obě ID nevrací,
platná videa `-FR8z-38PR8` („23. 07. · Le Bourg-dOisans") a `X38H3CJ7UoY`
(„25. 07. · Saint-Bonnet-en-Champsaur") žijí; originální soubory i
`…kapitoly.txt` zůstaly. Evidence 17 → 15 záznamů, záloha před zásahem leží
v `data/youtube-nahravac-stav.pred-uklidem-9-8-2026.json`. Fotek se to netýká.

### ✅ HOTOVO ODPOLEDNE: příčina duplicit nalezena a zalepena

**Řetěz příčin je doložený z logu, ne z úvahy:**
1. VideoAutomat vyrobil totéž město PODRUHÉ (past „město v `nasazeno/` nepoznám
   jako hotové") — Le Bourg-d'Oisans 31. 7. v 21:21 a znovu ve 23:25, Saint-Bonnet
   1. 8. ve 12:26 a znovu 2. 8. v 00:27. Časy sedí na minutu s `mtime` obou kopií.
2. Druhý soubor učitel taky přesunul do `nasazeno/` → Finder přilepil „ (kopie)".
3. **Nahrávač hlídal duplicity podle PŘESNÉHO NÁZVU SOUBORU** — přílepek název
   změnil, takže video prohlásil za nové a poslal na kanál. Titulek proto přišel
   i o datum („Le Bourg-dOisans FR KEKONTROLE (kopie)").

Kopie NEJSOU totožné soubory: `ffprobe` ukazuje stejnou délku i stopy, ale jinou
velikost — jsou to druhé rendery téhož města, ne poškozené duplikáty.

**Co se opravilo** (`nahraj_na_youtube.py`, `vyrob_video_automat.py`):
- rozhoduje **klíč místa v rámci roku**, ne název souboru; opakovaná návštěva
  v jiném roce (Rothenburg 3×) i stejnojmenné místo v jiné zemi (Frangy_CH ×
  Frangy_FR) se nezablokují,
- pojistka se ptá **před každým nahráním uvnitř smyčky** — nález kontrolora:
  předfiltr propustil dva NOVÉ soubory téhož místa v jedné dávce,
- otisk místa je odolný vůči přejmenování (apostrof, mezera, pomlčka, diakritika)
  i vůči přílepkům „ (1)", „-1", „_kopie", „_final", „.mp4.mp4",
- `hezky_nazev` čistí název JEDINOU funkcí (domov pravidla), takže titulek
  duplicity už nemůže přijít o datum.

**Kotva:** proti evidenci podvržené do stavu před 3. 8. by nová pojistka **obě
duplicity zastavila** (staré pravidlo je pouštělo). Testy: nový
`testy/test_nahravac_bez_duplicit.py` 33/33, `test_video_nasazeno.py` 14/14,
`test_bez_kopii.py` 0 kopií pravidla (registr má nově `otisk-mista-pro-youtube`),
`test_povoleni_hook.py` 36 případů. Kalibrace na 1969 skutečných videích a
162 názvech míst: žádná dvě různá místa se neslijí.

**Kontrolor běžel DVAKRÁT a podruhé měřil chováním** — pustil skutečný `main()`
nad podvrženou složkou s atrapou nahrávání: dva soubory téhož místa → 1 nahrání,
devět variant názvu → 1 nahrání, tři různá místa (včetně Frangy_FR + Frangy_CH)
→ 3 nahrání. Jeho tři drobné nálezy z druhého kola jsou taky opravené:
uříznutý kód země („Gassin_KEKONTROLE.mp4") už pojistku neobejde, kód země se
porovnává bez ohledu na velikost písmen, a titulek z názvu s mezerou dá
správné „Gassin (Francie)" místo zkomoleného „Gassin FR".

### ✅ HOTOVO: Ornans má správné datum (nasazeno, commit `d562c34`)

Datum **19. 7. 2026** místo 18. 7. — doloženo z fotek: 39 snímků z 19. 7.
(13:59–21:12) a 18 z rána 20. 7. při odjezdu, z 18. 7. **ani jeden**.
Chronologie míst zůstala rostoucí (17. 7. → 19. 7. → 20. 7.).

### ✅ HOTOVO: vrátný přestal obtěžovat u ověřování

`povoleni_hook.py`: `nahraj_na_youtube.py --stav` je pouhý výpis evidence, ptát se
na něj byla chyba nastavení (skutečné nahrání se ptá dál). A hooky samy
(`/Users/Shared/*.py`) se už nehlásí jako „mimo projekt" — bydlí tam proto, že je
sdílejí oba účty. Obousměrný test vrátného: 36 příkazů, 15 projde / 21 se zeptá ✅

### ✅ GEISINGEN UŽ SE NEBUDE VYRÁBĚT (výtka učitele: „oprav to už jednou pořádně")

Doloženo: klíč `geisingen` má **7 vyrobených videí** (nejvíc má Le Thillot — 9×).
Příčina, na kterou tři starší pojistky nedosáhly: `⁨Geisingen⁩, 8.7. 2026` je
**ručně vyexportované album z Fotek**, ne složka založená automatem.
- `uz_hotovo()` se ptá **nejdřív na otisk fotek** (ř. 203) — ruční export má jiná
  jména souborů, takže otisk nikdy nesedí a rozhodnutí padne dřív, než se kdokoli
  zeptá, jestli video existuje,
- hledání záznamu podle klíče nepomohlo, protože po první výrobě si export
  **založil vlastní záznam** a přestal být „bezejmenný dvojník" (evidence má pro
  Geisingen dva záznamy: `Geisingen_DE` z 29. 7. a export z 5. 8.),
- kanonická složka `Geisingen_DE` je dávno uklizená, takže v pipeline zbyl
  jen export — a vracel se do fronty **každou hodinu**.

Nově rozhoduje, ČÍM ta složka je: `je_rucni_export()` (neviditelné znaky
U+2068/U+2069 nebo koncové datum). **Kotva:** skutečné `zpracuj_mesto()` nad tou
složkou vrací `False` s hláškou PŘESKAKUJI; 20 ostatních složek beze změny;
`test_video_nasazeno.py` 20/20 se scénářem 7b.

**Druhý nález z téhož dne:** automat vyrobil Sassenage ve 13:40 (32 médií) a ve
14:40 znovu jako `_v2` (36 médií — přibalil Saint-Denis a Saint-Sorlin). To je
správně, ale nahrávač by z dvojice vzal **starší, chudší** verzi (byla ve frontě
první) a plnější navždy přeskakoval. Nově rozhoduje čas souboru
(`jen_nejnovejsi_z_mista`), test 36/36.

### 🔴 PRVNÍ PRÁCE PŘÍŠTĚ

1. **Video „23. 07. · Le Bourg-d'Oisans" visí u místa `col-d-ornon`** (24. 7.).
   Obsahově sedí (zdroje z 23. i 24. 7., závod), ale místo „Le Bourg-d'Oisans"
   v datech roku 2026 vůbec neexistuje — buď je založit, nebo nechat být vědomě.
3. Tři názvy videí mají **zdvojený datumový prefix** („25. 07. · 25. 07. · …").
   V obou evidencích nahrávačů takový titulek NENÍ (prohlédnuto 17 + 31 záznamů),
   takže vznikl až na kanálu — ověřit dotazem na YouTube, ne v datech.

### ✅ HOTOVO A ŽIVÉ (dopoledne, ověřeno curlem)

- **Svitavy — TŘETÍ chyba v jednom popisu za den.** Ráno se opravovala „poutní cesta
  na Vraclav" na „křížovou cestu na Kalvárii" — a i to bylo špatně: ta je
  v **Moravské Třebové**, 12 km daleko; obě města spojuje jen název okresu. Takovou
  záměnu žádná kontrola z paměti nechytí, zní věrohodně. Odhalilo ji až hledání ve
  zdroji (slovo „Kalvárie" v článku o Svitavách není ani jednou). Nový text stojí
  jen na větách ze zdroje. Deník chyb má na to novou třídu `zamena-podle-okresu`.
- **Rothenburg má napevno německý článek** (183 vět místo českého pahýlu s 1230
  znaky) — hradby, věže i ochoz jsou tím doložené.
- **Ornans zbaven cizího videa** — sestřih `swDAmX8BRJA` je celý ze
  Saint-Maurice-sur-Moselle. Pokles míst s videem 15 → 14 je ZÁMĚRNÝ.
- **Le Bourg-d'Oisans: pravidlo o verzích znovu potvrzeno.** `wZSKCdxlmeg` má
  v názvu „v2", ale je **NEJSTARŠÍ** (31. 7.) a leží v `_ceka-na-predelani`;
  platné je `-FR8z-38PR8` (1. 8., dvojnásobná velikost), které web už má.
  Do dat se nesáhlo. **„v2" v názvu neznamená novější — rozhoduje log nahrávače.**

### 📌 STAV DENÍKU CHYB K DNEŠKU

Třída `fakt-bez-zdroje` je na **12 výskytech** — všechny z dneška, všechny z popisů
psaných z paměti. Nové třídy: `podklad-prilis-uzky` (sbíral se jen úvod článku),
`zamena-podle-okresu`, `nastaveni-bez-identity`, `zkouska-spini-ostra-data` (2×).

---

## ⏩ PŘEDCHOZÍ (9. 8. 2026 dopoledne — popisy se píšou ZE ZDROJE)

### ✅ ZMĚNA PRINCIPU JE HOTOVÁ A NASAZENÁ

Zadání učitele: *„pokračuj s těmi popisy ze zdroje."* Vyšlo z toho, že deník chyb
hlásil třídu `fakt-bez-zdroje` nad prahem opakování.

| co | před | po |
|---|---|---|
| míst v podkladech (`fakta-mist.json`) | 76 | 204 |
| vět ze zdrojů | 400 | 2 950 |
| popisů na webu s doloženým zdrojem | 71 % | **96 %** |

1. **Sběrač vidí i ručně psané roky.** `vsechna_mista(vcetne_rucnich=True)` — jen pro
   SBĚR; výchozí `False` zůstává, jinak by `zapis_popisy.py` začal přepisovat roky,
   které si píšeme ručně. Kotva: zapisovač vidí dál 156 míst, sběrač 193.
2. **Sbírá se CELÝ článek, ne jen úvod.** Úvod nese jen okres a počet obyvatel;
   Oskar Schindler je v článku o Svitavách až na 12 423. znaku. Strop 20 000 znaků,
   soubor má i tak 0,45 MB. V datech to pozná pole `rozsah: "clanek"`.
3. **Místa, která nevznikla z fotek, se dohledají v datech webu**
   (`fakta_mist.misto_z_dat_webu`) — devět míst roku 2026 do té doby nemělo z čeho
   čerpat, protože v podkladech z GPS vůbec nebyla.
4. **Měřidlo `kontrola_dolozitelnosti.py`** ten princip hlídá. Uznává TŘI stavy, ne
   dva: článek nalezen · ověřeno, že článek není (malé obce ho nikdy mít nebudou) ·
   chybí podklad. Má počítadlo vstupů — nula zkoumaných míst je tvrdá chyba, ne úspěch.

### 🔍 CO UKÁZALA KONTROLA (a proč na tom záleží)

| | proti ÚVODU (ráno) | proti CELÉMU ČLÁNKU (dopoledne) |
|---|---|---|
| posouzených tvrzení | 129 | 147 |
| „zdroj o tom mlčí" | 67 (52 %) | 48 (33 %) |
| **„popis odporuje zdroji"** | **0** | **2** |

Obě odporující věty jsem přitom **ráno psal jako OPRAVU** starší chyby — a obě byly
zase mimo, protože vznikly z přepočtu souřadnic a vlastní představy:
Esch neleží „na plošině nad údolím Mosely", ale `im südlichen Salmtal am Rande der
Moselberge`; Saint-Maurice-Colombier není 15 km od Montbéliardu (to je vzdušná čára),
zdroj uvádí 20 km po silnici. **Dokud text vzniká z hlavy, oprava jen vymění jednu
nedoloženou větu za druhou.** Obojí opraveno workerem z vět ve zdroji a nasazeno
(ověřeno curlem), přibyla i doložená fakta navíc (Esch 1086 jako Asche).

Zbylých 48 nedoložených tvrzení v textech ZŮSTÁVÁ — kontrolor je neoznačil za
nepravdivá, jen za taková, která v článku nestojí (Villonovo vězení, kaple sv. Michala).
Změna se týká toho, jak popisy vznikají PŘÍŠTĚ.

### ⏭️ CO ZBÝVÁ

1. **Dva nálezy přesběr nevyřeší** — křížová cesta na Kalvárii (Svitavy) v článku
   není vůbec a český článek o Rothenburgu je pahýl bez zmínky o hradbách.
   Chce to druhý článek ke stejnému místu (Wikipedie v jiném jazyce).
2. **Sestřih `swDAmX8BRJA` sdílejí Saint-Maurice-sur-Moselle a Ornans** — vlastní
   video k nim v nahrávači není.
3. **Tři kopie videa z Le Bourg-d'Oisans** (`wZSKCdxlmeg` v2, `0A1E9gsD7gQ`,
   `UJdbbDYmahY`), web má `-FR8z-38PR8`. Která je platná, se musí doložit Z LOGU
   nahrávače — „v2" v názvu neznamená novější.
4. Tři názvy videí mají zdvojený datumový prefix („25. 07. · 25. 07. · …").

### ✅ MEZITÍM NASAZENO

**Schongau a Geisingen dostaly svá vlastní videa** (`k4cqRFIsEQU`, `_M3govihGYc`) —
obě ukazovala sestřih celé německé části a jejich videa nevisela u žádného místa.
Sestřih zůstal u Landshutu, který vlastní video nemá. Kotva: míst 25 → 25,
popisů 20 → 20, galerií 10 → 10, osiřelá videa 2 → 0.

---

## ⏩ PŘEDCHOZÍ (9. 8. 2026 ráno — popisy roku 2025 nasazeny)

### ✅ HOTOVO A ŽIVÉ: 34 popisů míst roku 2025 (commit `6ab972a`)

Loňská Normandie, Francie, Bavorsko i české zastávky mají popis ve všech čtyřech
jazycích. Ověřeno curlem: `cesty.wonderly.cz/cesty/2025/` i mutace `…/en/2025/`
a `…/de/2025/` vracejí 200 a obsahují nový text.

**Rohatka seděla:** míst zůstává 53, `videoId` i galerie beze změny, bloků
`popis:` 13 → 47, diff **204 přidaných řádků a 0 ubraných** (34 × 6). Šest míst
zůstává bez vlastního popisu schválně — jsou to opakované návštěvy (Rothenburg 3×,
Nördlingen, Dinkelsbühl, Dvůr Králové) a berou si ho od první návštěvy.
Tím padá i bod 4 ze seznamu nálezů kontrolora níže.

**Tři kontroloři, osm oprav.** Fakta prověřily dvě nezávislé dvojice (17 + 17 míst),
překlady třetí kontrolor (102 překladů, 0 nálezů). Opraveno: poutní cesta ze Svitav
vede na **Kalvárii**, ne na Vraclav (30 km daleko); Eisenberg leží **východně** od
Jeny (přepočet GPS: 22 km, azimut 78°), ne severně; Esch je na plošině nad Moselou,
ne mezi vinicemi; u Saint-Maurice-Colombier se nepodařilo doložit přehradní jezero;
muzeum vylodění v Arromanches stojí na nábřeží, ne nad městem (nahoře je kino
Arromanches 360); mrazová kotlina patří Horské Kvildě, ne sousední Kvildě; radnice
ve Dvoře Králové je novorenesanční, renesanční je Městská věž; „Zámek proslula" →
„proslavila".

### 🔴 PRVNÍ PRÁCE PŘÍŠTĚ: popisy z DOLOŽENÉHO zdroje, ne z hlavy

Deník chyb hlásí třídu **`fakt-bez-zdroje` 9× — to je nad prahem 3, takže platí
„změň princip, ne záplatu"**. Osm z devíti vzniklo dnes: popisy jsem psal z vlastní
znalosti a chyby našel až kontrolor. Princip má být opačný — text vzniká z ověřeného
zdroje. Podklad už existuje: `Omega/skripty/data/fakta-mist.json` (76 míst, věty
z Wikipedie i se `zdroj:`), jenže popisy roku 2025 se z něj nebraly.

Návrh dalšího kroku: rozšířit sběr fakt na místa, která v `fakta-mist.json` chybí,
a psát popisy z jeho vět — kontrolor pak neověřuje moji paměť, ale shodu se zdrojem.

### ⏭️ ZBÝVÁ Z NÁLEZŮ KONTROLORA (nic z toho web nerozbíjí)

1. Schongau a Geisingen mají `videoId` sestřihu, zatímco jejich **vlastní videa**
   (`k4cqRFIsEQU`, `_M3govihGYc`) nejsou u žádného místa.
2. Tři názvy videí mají **zdvojený datumový prefix** („25. 07. · 25. 07. · …").

### 🔧 CO SE PŘITOM SPRAVILO

- **Vrátný se přestal ptát na úklid vlastních dočasných souborů** (přání učitele
  „stále odklikávám to samé"). `/Users/Shared/povoleni_hook.py` → `mazani_je_bezpecne`:
  projde `rm`, jehož každý cíl je ve složce session nebo má předponu `tmp-`; ostatní
  mazání se ptá dál. Obousměrný důkaz `Omega/skripty/testy/test_povoleni_hook.py`
  (22 případů: 9 projít, 13 zeptat se).
- **Deník chyb bere i opravy vlastní práce** (učitel: „zapisuj si opravy a chyby
  všechny") — dnes 8 faktických oprav + 2 vlastní chyby.
- **Podpis commitů opraven** (rozhodl učitel 9. 8.). Dvacet starších commitů vzniklo
  jako `Your Name <you@example.com>` — v repu byl zapsaný zástupný text a globální
  identita nebyla žádná. Na začátku se totiž nastavovalo jen **přihlášení** ke GitHubu
  (`gh auth` v `~/.gitconfig` jako credential helper), což je něco jiného než podpis.
  Nově `Radek Míček <292464341+cestynakolech@users.noreply.github.com>`, lokálně
  i globálně. Zástupná adresa GitHubu schválně: **repozitář je veřejný**, takže
  skutečný e-mail by v historii commitů vysbírali roboti. Historie se nepřepisuje.

---

## ⏩ PŘEDCHOZÍ (9. 8. 2026 v noci — deník: letošní cesty, silvestr, deník chyb)

### ✅ HOTOVÉ A ŽIVÉ (9. 8. 2026, 00:15–01:00)

1. **Letošní cesty před dovolenou na mapě 2026** — učitel přidal do „Dřívějších
   dovolených" fotky z 5 víkendů (únor–červen 2026), doplněno 10 míst.
   Rok 2026 je ručně psaný, takže do něj automat zapsat nesmí; blok se vygeneroval
   TOUŽ funkcí `ts_soubor()`, aby platila stejná pravidla. Produkce: **36 dnů na
   cestě · 25 míst**, 6 samostatných tras z domova a zpět.
2. **Silvestr** (nález učitele „nevidím silvestra v mapě") — fotky z 30. a 31. 12.
   prodloužily pobyt ve Dvoře Králové na 29.–31. 12. 2025 a s ním výjezd 13.
   Porovnání VŠECH fotek proti datům webu (`scratchpad/co_chybi.py`) jinak nic
   nenašlo; zbylé dva rozdíly jsou chyby geokódování z dovolené 2025
   („France métropolitaine", „Küstengewässer") a na mapu jako místa nepatří.
3. **Tři vady, které našel nezávislý kontrolor** (všechny doloženy přepočtem GPS):
   Landshut měl pin **45 km** jižně, Geisingen **35 km** východně a Saint-Bonnet
   (25. 7.) byl v poli za Gassinem (26. 7.) → falešná čára **321 km**.
4. **DENÍK CHYB** (přání učitele) — `Omega/skripty/denik_chyb.py`, přehled
   `Omega/dokumenty/DENIK-CHYB.md`. Plní se SÁM: hook syntaxe zapíše každou
   chybu, kterou chytí, revize automatů své nálezy. Trvající chyba se jen
   prodlužuje, **nový výskyt až po NÁVRATU** — jinak by jedna neopravená drobnost
   za týden vykázala sedm „opakování". Důkazy: 25 + 14 kontrol.
5. **Brána hlídá polohy a pořadí míst deníku** — `testy/cesty-poloha.mjs`:
   totéž město = tentýž bod napříč roky (20 km), chronologie pole, datum uvnitř
   svého výjezdu. Důkaz 16 kontrol, dluh rohatky 15 → 14.

### 🔧 DVĚ VLASTNÍ PASTI DNEŠNÍ NOCI (obě chycené včas)

- **Kontrola poloh nejdřív měřila `undefined`.** Četla místa přes `nactiCesty()`,
  která vrací jen čtyři pole BEZ souřadnic — a tiše hlásila „0 nálezů", což
  vypadalo jako čistá data. Odhalil to až podvrh. Proto má kontrola **počítadlo
  porovnaných dvojic** a sama se ozve, když klesne na nulu.
- **Zkouška si zapsala vymyšlenou chybu do ostré evidence.** Test pouštěl hook
  jako samostatný proces a ten zapsal do ostrého deníku chyb. Nově zkoušky píšou
  do `DENIK_CHYB`. (V ostrém deníku po tom zůstal jeden záznam `z_hooku.py` —
  **čeká na odkliknutí učitele, jestli ho smazat**.)

### ✅ TŘI POKYNY UČITELE Z 9. 8. — SPLNĚNO

1. **„Chyby nemaž, i když jsou zdánlivě nesmyslné — pokud se zopakuje, bude co
   hledat."** Testovací záznam v deníku chyb tedy ZŮSTÁVÁ. `denik_chyb.py` mazání
   vůbec neumí, jde jen zapisovat.
2. **„Někdy jedeme do jednoho místa víckrát za rok — nech je víckrát, ale udělej
   jedno místo popisu."** Návštěvy zůstávají samostatné, popis se bere od první
   (`CestyRok.astro` → `popisMista`). `stare_cesty.ts_soubor()` druhou kopii už
   negeneruje; přegenerováním ubylo **24 zdvojených popisů**, místa a videa beze změny.
3. **„Popisy píšeš vše ty."** Nahrazuje starší pravidlo „popisy píše ČLOVĚK"
   z 30. 7. Opraveno: Lednice („v rámci kulturního krajiny" → Lednicko-valtický
   areál), Horní Planá (Lipenská → Lipno ve všech jazycích, fr tvrdila
   „jihovýchodně OD Šumavy"). Dopsány popisy Rothenburgu, Dinkelsbühlu,
   Nördlingenu (kráter Ries) a Jemnice.

### 🔴 PRVNÍ PRÁCE PO CLEARU (zadal učitel 9. 8. 2026: „dopiš ty popisy i do roku 2025")

**Popisy jsou HOTOVÉ a napsané, zbývá je jen vložit.** Leží v
`Omega/skripty/data/popisy-2025-k-vlozeni.json` — 34 míst roku 2025 bez popisu
(loňská Normandie a Francie: Arromanches, Colleville, Utah Beach, Ouistreham,
Dunkerque, Nevers, Salins-les-Bains…, plus Rothenburg, Dinkelsbühl, Nördlingen,
Svitavy, Kelheim, Zalakaros, Horská Kvilda…). Tvar `{"název místa": "popis"}`.

Postup:
1. `zapis_popisy.py` je NEPŘIJME — `vsechna_mista()` ručně psané roky (2025, 2026)
   schválně přeskakuje, takže tahle místa nezná. Zapsat proto přímo do
   `src/data/cesty/2025.ts` (je ručně psaný, automat ho nepřepíše).
2. Párovat podle **názvu**, ne slugu, a vložit **jen k PRVNÍMU výskytu jména**
   v roce — druhá návštěva si popis vezme od něj (`CestyRok.astro` → `popisMista`).
3. Rohatka: počet míst (53), `videoId` a stellplatzů se NESMÍ změnit; popisů má
   přibýt 34 (z 13 na 47 bloků `popis: {`).
4. Pak `npm run build` (brána musí projít), `git push`, ověřit `curl`.
5. **Fakta prověřit** — popisy jsem psal z vlastní znalosti, ne z `fakta-mist.json`.
   Před nasazením je nechat projít nezávislým kontrolorem se zadáním „ověř, že
   tvrzení o každém místě sedí" (u Normandie hlavně data a jména pláží).

### ⏭️ ZBÝVÁ Z NÁLEZŮ KONTROLORA (nic z toho web nerozbíjí)

1. Schongau a Geisingen mají `videoId` sestřihu, zatímco jejich **vlastní videa**
   (`k4cqRFIsEQU`, `_M3govihGYc`) nejsou u žádného místa.
2. Tři názvy videí mají **zdvojený datumový prefix** („25. 07. · 25. 07. · …").
3. ~~Popis Lednice, Horní Planá, chybějící popisy~~ — **HOTOVO** (viz výše).
4. **Rothenburg, Dinkelsbühl a Nördlingen nemají popis v roce 2025**, kde jsou
   také (17. 4. a 21.–23. 12.). Sdílení popisu funguje jen v rámci roku —
   `zapis_popisy.py` ručně psané roky schválně přeskakuje, takže tahle místa
   nezná. Buď je dopsat do `2025.ts`, nebo sdílet popis napříč roky.

---

## ⏩ PŘEDCHOZÍ (8. 8. 2026 v noci, kolo WONDERLY — trojice „Délka")

### ✅ TROJICE `delka` JE HOTOVÁ A ŽIVÁ (8. 8. 2026, 23:50)

Tři díly na `lab.wonderly.cz/skola2/fyzika/6-rocnik/fyzikalni-veliciny/delka/`,
ověřeno curlem — všechna tři videa vracejí 200 a velikost bajt na bajt odpovídá
souborům na Macu. **Fyzika 6 má teď polemiku u 11 z 21 podtémat.**

| díl | délka | kotva |
|---|---|---|
| 1/3 Proč se všude měří v metrech? | 2:56 | video 176,40 s = zvuk 176,41 s |
| 2/3 Čím změřit vlas a čím vzdálenost ke hvězdě? | 2:37 | 157,97 = 157,97 s |
| 3/3 Počítají se dílky podle čárek, nebo mezer? | 2:55 | 175,75 = 175,75 s |

U všech tří `moov` před `mdat` a obrazová i zvuková stopa. Zvuk: 74 replik,
64 prošlo napoprvé, 10 označeno k ruční kontrole — **z toho 9 planý poplach**
(scénář má čísla slovy, přepis je vrací číslicemi) a **jedna skutečná vada**:
Eva měla říct „Tak jím zkus změřit tloušťku vlasu", hlas to zkrátil na „Zkusím
změřit" a obrátil tím smysl (má vyzvat Marka, ne mluvit o sobě). Přemluveno
na shodu 100 %.

### ⚠️ TICHÁ VADA NÁSTROJE, KTERÁ SE PŘITOM NAŠLA

`vyrob_omnivoice.py` přeskakoval každou repliku, jejíž soubor už existoval —
**takže po opravě věty ve scénáři ohlásil „hotovo" a slepil do MP3 STARÝ text.**
Hláška vypadala stejně jako po skutečné práci a MP3 mělo tutéž velikost bajt
na bajt; jediná cesta, jak změnu prosadit, bylo smazat soubor, o čemž nikdo
nevěděl. Nově se vedle repliky ukládá text, ze kterého vznikla (`NN-JMENO.txt`).
**Replika BEZ stopy se považuje za platnou** — jinak by kontrola přemluvila
všechny dosud hotové díly. Stopa se zapisuje jen u nově vyrobené nahrávky:
dopsat ji u přeskočené by prohlásilo za shodné to, co nikdo neověřil, a příští
oprava věty by se už nikdy nechytila (tuhle vadu v prvním návrhu odhalil až
vlastní test). Důkaz `testy/test_zmena_textu_repliky.py`, 6 kontrol.

### ⚠️ WHISPER SE NIKDY NESPOUŠTÍ RUČNĚ

Na tomhle Macu jsou dvě kopie `libomp`; bez `KMP_DUPLICATE_LIB_OK=TRUE` se
whisper zabije při startu a **učiteli vyskočí systémový dialog „Aplikace Python
se neočekávaně ukončila"** (viděl ho dvakrát). Volá se výhradně
`vyrob_omnivoice.prepis_lokalne()`. Zapsáno do `PRAVIDLA.md`.

### ▶️ PŘEDCHOZÍ ROZDĚLANÉ (už hotové)

Fyzika 6 má polemiku u 10 z 21 podtémat (změřeno nad naimportovanými daty).
Další díra v už rozpracovaném celku „fyzikální veličiny" je **Délka** — hmotnost,
objem i hustota polemiku mají. Vzniká proto trojice krátkých dílů:

| díl | slug | replik | schémat |
|---|---|---|---|
| 1/3 metr a převody | `delka-metr-dialog` | 28 | 6 |
| 2/3 čím měřit (od vlasu po hvězdy) | `delka-meridla-dialog` | 24 | 5 |
| 3/3 jak měřit správně | `delka-mereni-dialog` | 22 | 8 |

**Hotovo:** scénáře (3 workeři naráz) · nezávislý kontrolor (11 nálezů, všechny
opraveny) · **brána kvízu 21 z 21 otázek** · scénosledy se štítkem `"skupina": "delka"` ·
19 schémat vykresleno a prohlédnuto očima.
**Zbývá:** dokončit zvuk (běží, díl 3 měl v 23:04 hotových 13 replik z 22) ·
úvodní ilustrace `podklad-00.png` ke každému dílu (mflux, GPU dráha až po zvuku) ·
videa · nahrát do R2 + zápis do `temata.ts` + build a push · ověřit curlem.

**Nálezy kontrolora, které stojí za zapamatování** (opraveno ve scénářích):
- **Značka délky je `l`, ne `d`** — scénář prohlásil správnou odpověď za omyl.
  Kvíz téhož podtématu píše `l = 72 mm`, učitelův podklad „dé nebo el".
- **„mezi popsanými čárkami je deset menších čárek, čili deset mezer"** — mezer je
  deset, ale menších čárek jen devět, a scénář si čtyři repliky nato sám odporoval.
  Rozbíjelo to pointu celého dílu (dílek se počítá přes MEZERY).
- **Díl 1 nebyl polemika, ale kvíz** — Marek jen přitakával. Doplněny dvě platné
  námitky (recepty na hrnky, míle v Anglii), na které musí Eva odpovědět věcně.

### 🔧 OPRAVENO V NÁSTROJÍCH (audit na startu kola)

1. **Revize automatů hlásila dva falešné poplachy jako `⏳ PŘETRVÁVÁ`.** Chyby byly
   z 8. 8. 00:33 a z 1. 8., ale skripty se opravily 8. 8. v 9:57–9:59. Doplněna
   **druhá kotva zastaralosti**: byl dotčený skript od pádu změněn? Sleduje i
   IMPORTOVANÉ moduly (spadl `zaloz_mista_z_fotek.py`, oprava byla v `mista_deniku.py`)
   a porovnává ČAS, ne jen datum. Nález se **nezahazuje**, jen přeřadí do nové sekce
   „⏳ Opraveno, čeká na ověření" — důkazem je až úspěšný běh. Ostrý běh: **0 nálezů**,
   2 čekají na ověření. Reprodukce s chudým PATH potvrdila, že oba kroky doběhnou.
   Důkaz `testy/test_revize_nalezu.py` 15 → **20 kontrol**.
2. **Brána pokrytí kvízu neuměla trojici** — díly si otázky rozdělí, takže žádný
   sám neprošel a u trojic se dala jen obejít (a obcházela se). Nově se posuzují
   dohromady podle štítku `"skupina"` ve scénosledu (štítek, ne opsaný seznam).
   Bez štítku se neslučuje nic, aby se `gravitacni-sila-dialog` a `dialog2`
   (dvě VERZE téhož dílu) nesešly dohromady.
3. **Brána měřila jen podíl shodných slov** — a odpověď z běžných slov („látka
   vzniklá smícháním více látek") vyšla jako pokrytá i tam, kde o směsích nepadlo
   slovo: **dvojice dílů „pokryla" 14 ze 14 otázek**, přičemž jediná zmínka zněla
   „příště si povíme, co jsou směsi". Nově musí zaznít i nosné (nejdelší) slovo
   odpovědi, shoda na kmeni kvůli skloňování. Kalibrace na 137 otázkách hotových
   dílů: k modelu jde nově 2 (1 %), díru u trojice zachytí.
   Důkaz `testy/test_skupina_kvizu.py` (12 kontrol).

Audit startu kola jinak čistý: žádný zaseknutý proces, brána webu zelená
(94 komponent, 2479 otázek), testy simulací 1015 kontrol / 0 spadlo, `git status` čistý.

---

## Předchozí kolo (8. 8. 2026 večer — trojice „atomy a molekuly")

**✅ TROJICE `atomy-a-molekuly` JE HOTOVÁ A ŽIVÁ.** Všechny tři díly jsou na
`lab.wonderly.cz/skola2/fyzika/6-rocnik/latka-a-teleso/atomy-a-molekuly/`
(ověřeno dvakrát curlem: stránka vrací 3 videa a 2 animace, všech 5 souborů
v R2 odpovídá HTTP 200). Díl 1 „Z čeho jsou věci kolem nás" 1:42 ·
díl 2 „Jak vzniká molekula" 1:55 · díl 3 „sloučenina a směs" 2:06.
Předtím hotová částicová série F6 je živá dál.

**Kotvy, kterými je trojice doložená:**
- **zvuk:** všechny tři díly 20 replik; součet délek replik proti hotovému MP3
  dává pauzy přesně 7,00 s (19 mezer) u každého dílu, žádná replika není tichá
  ani kratší než 0,7 s. Díl 1 a 3 prošly 20/20 na první pokus, díl 2 19 + 1.
- **video:** délka se rovná délce zvuku (102,62 · 114,91 · 126,39 s),
  `moov` před `mdat` u všech tří, obraz i zvuková stopa.
- **animace měřítka atomu:** ve všech 188 snímcích platí, že počet atomů
  v záběru krát průměr 0,1 nm dá šířku výřezu → na milimetr vyjde 10 000 000.
- **animace vzniku molekul:** součet atomů je ve všech 127 snímcích 16 —
  nic nepřibylo ani neubylo (přesně to je v dílu Evin omyl). Ve videu ověřeno,
  že se animace opravdu hýbe (4 různé snímky z 5) a poslední se drží do konce.
- **obě animace jen na své stránce**, na žádné cizí (past ze 7. 8. s hoistovaným CSS).

### ✅ PŘETOČENO NA STÁLÝ HLAS (8. 8. 2026 večer, na přání učitele)

Trojice je na webu ve **verzi 2** (`polemika-atomy-a-molekuly-*-v2.mp4`,
ověřeno dvakrát curlem, všechna tři média HTTP 200). Marek měl v první verzi
172 Hz proti 146–150 Hz ve zbytku ročníku; po přetočení stálou referencí:
díl 1 Eva 252 / Marek 152 · díl 2 Eva 246 / Marek 146 · díl 3 Eva 242 / Marek 150
(starší díl pro srovnání 234 / 150). **Rozptyl Marka mezi díly klesl z 25 Hz na 6 Hz.**
Nová adresa `-v2` schválně — média jdou s roční mezipamětí.

### ⚠️ ČEKÁ NA ODKLIKNUTÍ UČITELEM

1. **NEVYJASNĚNO: jeden běh výroby zvuku vyrobil 60 zmetků.** Všech 60 replik
   byl tichý šum (shoda 0–18 %, hlasitost −39 dB proti obvyklým −26 dB), přitom
   totéž zadání se o hodinu později povedlo. Běh startoval na 13 % baterie
   s právě zapojeným kabelem — ale pokračoval i po dobití na 44 % a úsporný
   režim byl vypnutý, takže **to není doložená příčina, jen podezření**.
   Pojistka `baterie.py` se ptá jen „jsme v síti?", takže start na 13 % jí
   projde. Práh se zvedat NEBUDE, dokud nebude důkaz — jinak by pojistka jen
   bránila práci. Zmetky leží jako `*.zmetek-13procent`, kdyby se hledala příčina.
   **Zavedena aspoň pojistka proti jalovému běhu:** neprojde-li ani jedna
   z prvních pěti replik, výroba se vzdá (ušetří 45 volání ze 60).
2. **Vedlejší popisky na starších snímcích jsou pod normou čitelnosti.**
   Barva `SEDA` (#8a97a8) má proti pozadí 2,82 : 1; postihuje 242 textů
   z 1315 na 142 kresbách. Nová série má tmavší `SEDA_TEXT` (5,15 : 1).
   Sjednotit i staré díly by znamenalo přerenderovat všechna nasazená videa.
3. **Úklid hotový a úplný (8. 8. 2026 večer).** Smazáno 6 nepoužívaných videí
   v R2 (3 ze špatné cesty bez `latka-a-teleso/`, 3 z verze 1), 21 dnešních záloh
   a na pokyn učitele i 5 starších záloh z jiných dílů — **dohromady 69,9 MB**.
   Před každým smazáním ověřeno, že existuje živý protějšek; po smazání, že živá
   `-v2` videa vracejí 200 a smazaná 404. Ve složce zvuku zůstalo 23 nahrávek
   (99,4 minuty), žádná kratší než 30 s. Zálohy `.predchozi` už nikde nejsou.

### ▶️ ROZDĚLANÉ: nic — fronta je volná

Další na řadě podle učiva 6. ročníku: `skupenstvi-latek` už polemiku má
(nasazená 8. 8. ráno ve verzi 2). Nabízí se pokračovat dalším podtématem
F6 bez podkástu, nebo se vrátit k názornosti informatiky.

### 🎬 HOTOVO A ŽIVÉ: animace k výkladu pod textem podtématu (přání učitele 8. 8.)

*„chci to pod text viditelně jako interaktivní video, jen přesně tu animaci"* —
aby si k ní učitel vykládal vlastními slovy a mohl si ji sám spouštět.
**12 animací je na 8 stránkách Fyziky 6** (ověřeno curlem na produkci).
Ovládání: přehrát/pauza · od začátku · zpomalit na polovinu · dokola.

- Komponenta `src/components/skola2/AnimaceVyklad.astro`, zapojená v šabloně
  hned pod výkladem; data `src/data/animace.ts` **generuje**
  `Omega/skripty/animace_na_web.py` (`--nahraj` = R2 + zápis dat).
- **Párování animace ↔ podtéma se čte ZE SCÉNOSLEDŮ, ne z ruční mapy** —
  ruční mapa by se rozešla při prvním přečíslování scén a nikdo by si toho
  nevšiml (špatný klip u správného titulku vypadá dobře).
- Didaktické popisky (co je vidět · na co se zeptat · čím je scéna podložená)
  píše ČLOVĚK do `Omega/skripty/data/animace-popisy.json`; automat je nepřepisuje.
  **Nová animace bez popisku se na web nedostane** a skript to vypíše.
- **Zvuk:** klipy jsou němé (změřeno `volumedetect`: −91 dB) a přehrávač má
  navíc `muted`. Tichou stopu ze souboru NEODSTRAŇOVAT — bez ní se `moov`
  posune za data a přehrávač zamrzne hned na začátku (past ze 7. 8.).
- **Tichá vada nalezená vlastní kontrolou:** podle samotného slugu se animace
  psaná pro F6 přilepila i ke gravitační síle v F7. Páruje se proto podtéma
  I ročník. Poučení: měřit se musí `<video class="…">`, ne výskyt jména —
  hoistované CSS komponenty je v HTML všech 166 stránek, které ji importují.
- **Rozhodnutí učitele 8. 8.: animace přibývají JEN tam, kde vznikají podkásty**
  — tedy jako vedlejší produkt výroby dílů, žádná zvláštní kola navíc.
  Nedělat proto samostatnou frontu „animace k tématům bez podkástu".

### 🔍 Audit na startu kola (8. 8. dopoledne)
- **Oba „přetrvávající" nálezy revize automatů jsou ZASTARALÉ, ne živé.**
  `com.omega.foto-kontrola-kvality` padal v 00:33 na chybějícím PATH; oprava
  (jediný domov `prostredi.py` v `mista_deniku.py`) přišla až v 09:58 téhož dne.
  Doloženo reprodukcí s chudým PATH (`env -i PATH=/usr/bin:/bin`): oba dřív
  padající kroky dnes doběhnou — `zaloz_mista_z_fotek.py` „založeno 0, přeskočeno 1",
  `vyber_fotky_na_web.py` „vybráno 25 z 34". **Revize ale hlásí chybu z posledních
  řádků logu bez ohledu na to, že skript byl mezitím opraven** — do fronty:
  porovnávat čas chyby s časem změny skriptu.
- **`animace_podkastu.py` si jako jediný skript řetězu podkástů nebral zámek
  dráhy** (render Chromem + ffmpeg je těžká CPU práce). Doplněno `drz_cpu`.
- Brána webu (94 komponent, 2479 otázek) i testy simulací (1015 kontrol, 0 spadlo)
  zelené, `test_bez_kopii` dluh 0, `git status` čistý.
- **Vrátný: čekání na doběhnutí rozdělané práce se už neodklikává** (přání
  učitele 8. 8. — vyskočil dotaz na `Monitor`). Ověřeno obousměrně: `Monitor`
  projde, `rm` se pořád ptá. Zapsáno do `PRAVIDLA.md` i do pamětí.
- **Plánovaná úloha `wonderly-audit-nedele`** (neděle 8:00) — velký audit
  jede od teď sám, zadání učitele z 8. 8.
- **Vlastní chyba dne, na kterou se přišlo hned:** čekací smyčka poznala jen
  jednu ze dvou hlášek o čekání (obsazená dráha), a na druhé (málo paměti)
  skončila jako „hotovo". Tentýž vzorec jako „opatření platí jen částečně" —
  když se čeká z více důvodů, musí je podmínka pokrýt všechny.

### ✅ HOTOVO 8. 8. (kolo WONDERLY v noci + celkový audit dopoledne)
- **Polemika „Skupenství látek" NASAZENÁ ve verzi 2** (5:29, ověřeno curlem —
  produkce vrací nový soubor bajt na bajt). V2 = nálezy kontrolora: „roztavíš"
  místo „rozpustíš", bezpečnostní věta ke karamelu, pokus se stříkačkou řečený
  i v audiu, závěr bez „limonáda = táž voda", popisek scény 08 nad nádobami,
  bílé obrysy částic (jdou spočítat i při překryvu). Hlasy 244–254 Hz ✅,
  38/38 replik v přepisu ✅, faststart ✅ (pozn.: mdat je za 200 kB — číst celý soubor).
- **Fronta 1–3 hotová**: díl dotažen · hlídač fotek dávkuje (fotky 20/běh,
  video 1/běh, evidence pokusů přežije signál 9, po 3 nezdarech odklad do
  KE-SCHVALENI; **ostrý důkaz: evidence odpočítává, žádné další zabití**) ·
  falešné poplachy revize opraveny.
- **Celkový audit (3 nezávislí kontroloři)** — všech 12 nálezů uzavřeno:
  tautologická zkouška přepsána (měří UVNITŘ práce) · pauza baterie ≤ 30 %
  v hlídači · evidence snese JSON špatného typu · „zbývá" nepočítá odložená ·
  falešné negativy revize (živé poslední slovo) · **PATH pravidlo má jediný
  domov `skripty/prostredi.py`** (do té doby 6 kopií; registrováno, hlídá
  test_bez_kopii, dluh 0) · **atomický zápis anonymizace** (temp + os.replace,
  poloviční soubor po zabití se už nepočítá za hotový) · `com.omega.foto-hlidac`
  přidán do denní revize · podmínky výběru souborů mají jeden domov
  (af.najdi_nove_soubory). Testy: hlídač 14/14, revize 15/15, kopie 0 dluhu.
- Trvalé zápisy: skill wonderly +4 řádky (import prostredi), PRAVIDLA.md +1 řádek.

### 4. Rozhodnutí učitele (nikdy kvůli tomu nestát)
- ~~llama3.1~~ VYŘEŠENO 8. 8.: učitel schválil, stažena zpět (Starlink),
  role offline kontrolora vrácena, model ověřen otázkou (odpověděl správně).
- **open-webui**: zprovoznit až doma s Mac mini, kolem 20. 8. (paměť založena).
- na mostě leží pokyn pro druhý účet: smazat 2 nečitelné referenční fotky.

## ✅ HOTOVO 8. 8. 2026 — velký audit a sjednocení (3 nezávislí kontroloři)
Zkráceně; plné nálezy v transkriptu session a v `Omega/dokumenty/`.
- **Zvuk VÝHRADNĚ lokálně** (rozhodnutí učitele): OmniVoice + lokální whisper
  (dvoustupňová kontrola small→medium, obousměrný důkaz v `obousmerne.json`);
  `automat_podkastu.py` přepnut z placeného TTS na lokální; návody OpenAI/
  ElevenLabs v archivu `dokumenty/archiv-zruseno/`, zmínky vyčištěny.
- **Dvě dráhy zátěže** (schválil učitel): GPU = 1 model + CPU = 1 proces,
  pojistka měří skutečné procesy a RAM (`zamek_modelu.py`, testy prošly:
  obě naráz ✓, kolize ✓, pojistka ✓); zámek doplněn do `kontrola_anonymizace.py`.
- **Úklid** (schválil učitel): vypnut dojetý automat hrubé anonymizace
  (plist v `LaunchAgents-vypnuto/`); smazány 4 staré modely Ollama (~46 GB)
  a venvy zamítnutých hlasů (1,6 GB); open-webui ZŮSTÁVÁ (Mac mini).
- **YouTube strop sjednocen na 5/den** (kód = pravidla = paměť = skill;
  čísla se nadále NEOPISUJÍ, platí konstanta v kódu).
- **Jedna fronta** (tady) — opraven skill /sef, offline graf, OFFLINE-REZIM.
- **Hermes**: pravdivě zapsán jako VYPNUTÁ ZÁLOHA + návod ke spuštění.
- Stellplatz: měsíční brzda přesunuta PŘED zámek (konec hodinových hlášek).
- Vrátný: opravena cesta ve 2 souborech; předávací dokumenty NAHRAZENO;
  paměti aktualizovány (pečlivá videa, fronta, YouTube, modely 7).

## 📌 Živé zadání, fronta a reference

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `START.md`).

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### ▶️ POTOM: učitel 5. 8. SCHVÁLIL přepsat na polemiky VŠECHNA zbývající témata F6

Je jich **16** (ne 17 — gravitační síla polemiku už má). Pořadí podle učiva; ke
každému stejný řetěz jako dosud: kvíz → polemika → brána `pokryti_kvizu.py` →
scénosled → schémata → **prohlídka kontaktním listem** → zvuk → video → nasazení.

1. ~~`uvod-do-fyziky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
2. ~~`telesa-a-latky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
3. `casticove-slozeni-latek`
4. `atomy-a-molekuly`
5. ~~`skupenstvi-latek`~~ ✅ HOTOVO a nasazeno 8. 8. (v2 po auditu)
6. `delka`
7. `cas-a-jeho-mereni`
8. `teplota-a-jeji-mereni`
9. `teplotni-roztaznost`
10. `elektricke-vlastnosti-latek`
11. `magneticke-vlastnosti-latek`
12. `jednoduche-elektricke-obvody`
13. `pokusy`
14. `souhrnne-opakovani-velicin`
15. `pololetni-shrnuti`
16. `rocni-shrnuti`

**Nepracuj na víc než třech dílech v jedné session** — kontext dojde uprostřed
a hrozí, že se ztratí rozdělaná práce. Po každém dokončeném dílu zapiš stav sem
a commitni; pak se dá kdykoli navázat.

**Ohlídej si tohle:** shrnující díly (14–16) mají kvízy složené z otázek jiných
témat, takže brána bude chtít pokrýt hodně otázek naráz — počítej u nich s delší
polemikou nebo je rozděl na dva díly. `pokusy` naopak nemusí mít kvíz vůbec;
pokud ho brána nenajde, ověř to a poznač, ať se to nehledá znovu.

**Co je hotové a nasazené (5. 8. odpoledne):**
- Dvě polemiky ke gravitační síle, obě s videem, obě živé na
  `lab.wonderly.cz/skola2/fyzika/6-rocnik/sila/gravitacni-sila/` (ověřeno curlem).
  Hlasy z ElevenLabs, proto je v názvu atribuce `elevenlabs.io` — free tarif ji žádá.
- Celý řetěz skriptů: `pokryti_kvizu.py` → `vyrob_podkasty.py` / `vyrob_dialog_elevenlabs.py`
  → `snimky_podkastu.py` → `video_podkastu.py` → `automat_podkastu.py`.
- Kvóta ElevenLabs vyčerpaná (zbývá 1 410 znaků, obnoví se za měsíc). **Dál se jede
  přes OpenAI**, cena ověřená na 6,20 Kč za díl, tedy asi 700 Kč za všech 115.

### ▶️ TADY SE POKRAČUJE

**Další na řadě je díl 3 `casticove-slozeni-latek`** (souhlasí s hlavičkou nahoře). Postup beze změny:
kvíz → polemika → brána → scénosled → schémata → **prohlídka kontaktním listem** →
zvuk → video → R2 + `temata.ts` → build → push → **ověřit curlem na produkci**.

**Nové pravidlo z dnešního měření: scénář drž pod 4 700 znaky.** Ne kvůli syntéze
(ta si po opravě poradí i s delším), ale kvůli spolehlivosti střihu — viz tabulka
u dílu 2. Dlouhý díl stál 24 Kč a tři pokusy, krátký 5,6 Kč a jeden.

**Jak ověřit hotový díl** (kotva hlídá jen POČET slov, ne KTERÁ chybí): porovnej
každou repliku scénáře se slovy v přepisu `<slug>.prepis.json` a vypiš repliky pod
60 % shody. Repliky plné čísel a jmen vyjdou nízko, i když zazněly — u těch se
podívej do přepisu očima. Takhle se dnes potvrdilo, že oba nasazené díly jsou úplné
a že i `hustota-dialog.mp3` (zůstal po třech neúspěších) je v pořádku.


### ❓ Nálezy ve výkladu F6 — čekají na rozhodnutí učitele

_(přesunuto z uzavřeného kola D9, ať rozhodnutí nezapadne v archivu)_

**❓ NÁLEZY VE VÝKLADU F6 — ČEKAJÍ NA ROZHODNUTÍ UČITELE** (pravidlo
[[feedback-kontrolovat-spravnost-textu]]: odborný text učitele neopravovat potichu).
Ve scénářích jsou všechny obejity — netvrdí se nic sporného. **Na webu zatím JAK BYLY.**

| # | podtéma | co je ve výkladu | proč to nesedí |
|---|---|---|---|
| 1 | `magneticke-vlastnosti-latek` | „železo a jeho **sloučeniny** (ocel)" | ocel je **slitina** (železo + uhlík), ne sloučenina; a většina sloučenin železa feromagnetická není (rez, síran železnatý) |
| 2 | `magneticke-vlastnosti-latek` | ocel mezi feromagnetickými, **nerezová ocel** mezi nemagnetickými | přímý rozpor bez vysvětlení; nemagnetické jsou jen austenitické nerezi, běžné nože a indukční dna magnet přitahuje |
| 3 | `magneticke-vlastnosti-latek` | pole Země vzniká „**rotací** tekutého jádra" | pole tvoří **proudění** vodivého jádra (geodynamo); rotace sama pole nedělá |
| 4 | `magneticke-vlastnosti-latek` | indukční čáry = „uzavřené křivky **vedoucí od** severního pólu k jižnímu" | uzavřená křivka nikam „nevede"; od N k J míří **vně** magnetu |
| 5 | `skupenstvi-latek` | „krystalické látky — **velice tvrdé**"; „amorfní — méně tvrdé" | led 1,5, sůl 2,5, cukr 2 podle Mohse; sklo (amorfní) má 5,5, je tedy tvrdší. Tvrdost z krystalické stavby neplyne |
| 6 | `delka` | „laserový měřič vzdáleností — **nejpřesnější**" | laser měří s odchylkou 1–2 mm, mikrometr o řádek výš na setiny mm, tedy ~100× jemněji |
| 7 | `teplotni-roztaznost` | „látky **všech skupenství** se zahřátím zvětší" | chybí anomálie vody (0 až 4 °C se zahříváním smršťuje — proto led plave); je to učivo 6. ročníku |
| 8 | `teplotni-roztaznost` × `teplota-a-jeji-mereni` | rtuťový teploměr jako běžná pomůcka × „rtuť dnes zakázaná" | dvě stránky si protiřečí |
| 9 | `cas-a-jeho-mereni` | „čas udávala **hmotnost** odkapané vody" | klepsydra má stupnici na hladině, měří objem |
| 10 | `cas-a-jeho-mereni` | „fyzika pojem **vteřina nezná**" | „vteřina" je spisovný český název, jen se přednostně říká sekunda |
| 11 | `hmotnost` | zakazuje „váha tělesa" a o odstavec dál „1 litr vody **váží** 1 kg" | stránka si odporuje v tom, co sama zakázala |
| 12 | `souhrnne-opakovani-velicin` | „m = 5 kg **je veličina**, 5 m je jednotka" | obojí je ZÁPIS; „m = 5 kg" je hmotnost, „5 m" je délka pět metrů |
| 13 | `hustota` | „atom železa je **56×** těžší než vodíku" | vychází 55,4 — chybí slovo „přibližně" |
| 14 | `pokusy` | balónek a papírky = „opačné náboje se přitahují" | papírky **nejsou nabité**; jde o polarizaci, kterou tatáž stránka jinde správně vysvětluje |
| 15 | `pokusy` | Archimédův pohár bez podmínky ponoření | bez „celý pod hladinou, voda nesmí přetéct" vyjde objem jen ponořené části |
| 16 | `elektricke-vlastnosti-latek` | „uzemnění — Země **přijme** volné elektrony" | platí jen pro záporně nabité těleso; u kladného elektrony ze Země naopak přitečou |
| 17 | `elektricke-vlastnosti-latek` | „plast se nabije **vždy** záporně, sklo kladně" | znaménko závisí na DVOJICI třených látek, ne na materiálu samotném |
| 18 | `elektricke-vlastnosti-latek` | nabité těleso „**obsahuje ionty**" | u kovů jde o přebytek či nedostatek volných elektronů, ionty nevznikají |
| 19 | `rocni-shrnuti` | v přehledu veličin mají proud a napětí ve sloupci Značka „—" | chybí `I` a `U`, jako jediné ze všech devíti veličin |
| 20 | `pokusy` | řetěz sponek „ukáže dosah magnetické síly" | ukazuje slábnutí přenesené magnetizace při dotyku; pole působí i bez dotyku |

### 🤖 HERMES ZAPOJEN (rozhodnutí učitele 4. 8. večer — tokeny docházely)

Pokyn učitele: orchestrátor přednostně řeší **chyby a nastavení** (slabší model pak
pracuje s dobře seřízeným strojem); mechanickou práci přebírá **Hermes** — lokální
agent `~/.hermes/hermes-agent`, model gemma4:31b přes Ollamu, tedy zdarma.
Fronta úkolů: `~/Desktop/Omega/HERMES-UKOLY.md` — **ŽIVÝ soubor: aktualizovat na
konci KAŽDÉHO kola spolu s tímto stavem** (hotové odškrtnout, nové mechanické úkoly
z čerstvé práce doplnit — přání učitele 4. 8.) (popisy prezentací 7/8/9, mutační
měření 6 nejslepějších testů, soupis chybějícího `cz()`, tabulky PRAVIDLA.md,
zdraví automatů) → výsledky do `Omega/HERMES-VYSLEDKY.md`. Hermes nikdy nepushuje,
nemaže, nenahrává ven. Spuštění (i pro učitele):
`~/.hermes/hermes-agent/venv/bin/hermes -z "Přečti /Users/radek_soukromy/Desktop/Omega/HERMES-UKOLY.md a plň úkoly po řadě podle pravidel v něm."`
Paměť: [[feedback-hermes-zalozni-pracant]].

### 🔥 ZADÁNÍ UČITELE 5. 8. RÁNO (nejvyšší priorita — „fyzika je nejdůležitější“)

**A. Tajemná laboratoř → příběhová pátračka** (`src/pages/hry/laborator.astro`).
Dnes: dole lišta otazníků, klik vybere otázku („otázka za hodiny“). Učitel chce:
děti HLEDAJÍ V OBRÁZKU — kliknou na předmět (hodiny), otevře se otázka; po uhádnutí
se předmět ZMĚNÍ a stane se INDICIÍ k dalšímu stanovišti (hodiny se přeřídí — ručičky
ukážou SMĚR dalšího úkolu, nebo čas = číslo, které napoví umístění). Řetěz stanovišť
= příběh, soutěž, ať to děti baví. Návrh řetězu si rozmyslet předem (každé razítko
odemyká další indicii), zachovat razítka a ročníky. Vlastní kolo v ČERSTVÉ session,
klidně vějíř (návrh příběhu × implementace × kontrola).

**B. Fyzika na 100 % — v KAŽDÉM podtématu: interaktivní animace + video + audio
podkást.** Změřeno 5. 8. z dat webu (116 podtémat fyziky):
| ročník | podtémat | bez simulace | bez videa | bez audia |
|---|---|---|---|---|
| F6 | 21 | 7 | 20 | 21 |
| F7 | 33 | 9 | 13 | 32 |
| F8 | 37 | 14 | 32 | 37 |
| F9 | 25 | 12 | 12 | 25 |
Postup po kolech (fyzika má přednost před informatikou ve frontě):
1. **Simulace (42 chybí)** — vějíře `/simulace` po 4, od F6 (nejmenší dluh, základ).
2. **Videa (77 chybí)** — worker-media hledá ČESKÁ oficiální YouTube vložení
   (pravidla: jen oficiální přehrávač, jen české, ověřit pokrytí učiva).
   Co nenajde → seznam učiteli do KE-SCHVALENI.md (může natočit/dodat sám).
3. **Audio podkásty (115 chybí) — ROZHODNUTO 5. 8.: OpenAI TTS API.**
   Lokální TTS zamítnuto (strojové). Cena potvrzena učiteli: ~150–300 Kč za všech
   115 dílů (~350 min, ~350 tis. znaků; před spuštěním ověřit aktuální ceník).

   **POVEL `WONDERLY PODKASTY` = pracuj na podkástech takto:**
   1. Zkontroluj klíč v `~/Desktop/Omega/skripty/data/openai-klic.txt`
      (chmod 600; NIKDY ho nevypisovat do chatu ani logů). Když tam ještě není,
      scénáře se píší i bez něj — výroba zvuku počká.
   2. Napiš dávku SCÉNÁŘŮ (vějíř 4× worker, po ročnících od F6): 2–4 min mluveného
      slova na podtéma, jeden vypravěč, jazyk pro děti 2. stupně, čísla celá,
      obsah VYCHÁZÍ z výkladu podtématu (src/data/temata.ts) — žádné nové učivo,
      nezávislý kontrolor zkontroluje věcnou správnost proti výkladu.
      Scénáře do `Omega/podkasty-scenare/<rocnik>/<podtema-slug>.md`.
   3. PRVNÍ DÍL = VZOREK: vyrob MP3 (model gpt-4o-mini-tts, hlas vybrat český
      poslechem, výstup `/Users/Shared/Škola/podkasty/<rocnik>/<slug>.mp3`),
      pošli učiteli k poslechu (SendUserFile / Telegram) a POČKEJ na schválení
      hlasu a formátu — do té doby jen scénáře, žádná hromadná výroba.
   4. Po schválení: noční automat (LaunchAgent vzor zsh; baterie ≤ 30 % pauza;
      1 těžký proces) vyrábí dávky, průběžně zapojovat na web jako materiál
      `druh: 'audio'` k podtématu + build + push + curl. Checklist pořadí:
      `/Users/Shared/Škola/PODKASTY-A-VIDEA-checklist.md`.
   Druh materiálu `audio` v datech existuje a web ho umí.
Měřidlo pokrytí zapojit do brány jako sledovanou hodnotu (ne tvrdou chybu),
ať čísla klesají viditelně každé kolo.

### 🌙 FRONTA (pořadí drž)

1. **Názornost informatiky** — zbývá **22 podtémat** (4. 8. kolo D3 přidalo 4:
   celá `roboticka-stavebnice` + `hra-ping-pong`). Na řadě podle měřidla
   `node testy/nazornost.mjs`: Inf8 `hry-ve-scratchi` (2 zbylé: střílečka, skákačka),
   `hromadne-zpracovani-dat`, `co-umi-vex-iq`; Inf7 `hra-honicka`;
   Inf9 `programovaci-projekty`, `digitalni-technologie` (3).
   Dávka 4+ patří do vějíře (`/simulace`).
2. **Dvojice videí v `nasazeno/`** (zadání učitele): u Le Bourg-d'Oisans a Saint-Bonnet
   leží dvě verze. Nechat tu, **kde je toho víc**, a ověřit, jestli v delší nechybí něco
   z kratší — u Le Bourg to hrozí: kratší verze (4:58) obsahuje **přibalená místa
   Saint-Tropez, Le Lavandou a Riez**, delší (6:06) je jen z Le Bourg (77 médií).
   Když v delší opravdu chybí, složit ze dvou jednu.
3. **Testy simulací jsou z poloviny slepé — DOMĚŘIT.** Mutační test přes všech 16
   simulací (3. 8. dopoledne) skončil: **310 mutací, odhaleno 155, prošlo 155**.
   Pořadí podle toho, kde je díra největší (odhaleno / celkem):

   | simulace | odhaleno | simulace | odhaleno |
   |---|---|---|---|
   | `tabulka-vzorce` | **6/26** | `promenne` | 6/15 |
   | `souradnice` | **7/25** | `led-displej` | 6/12 |
   | `zapojeni` | **8/26** | `meridla` | 7/15 |
   | `vetveni` | **6/19** | `bludiste` | 10/22 |
   | `reostat` | 8/21 | `opakovani` | 8/18 |
   | `odpor-vodice` | 11/25 | `elektrovani` | 12/18 |
   | `vlastni-bloky` | 15/20 | `udalosti` | 18/20 |
   | `funkce-tabulky` | 13/14 | `senzory-robota` | **14/14 ✅** |

   Detail k jedné simulaci: `node testy/mutace.mjs <název>` (vypíše, které mutace prošly
   a kus kódu, který nikdo neměří). Celý běh trvá přes 10 minut — pouštět na pozadí.
   **Jak se díra zavírá** (vzor z 3. 8., obojí doloženo podvrhy): měřit skutečnou scénu
   a vypsané hodnoty, ne text zdroje · texty vázat na chování (popisek proti tomu, co
   tlačítko udělá) · očekávání psát ručně, ne brát z testované komponenty (tautologie) ·
   projít VŠECHNY stavy, ne jen výchozí. Ke každé opravené simulaci patří skript podvrhů
   v `testy/podvrhy/` a záznam v `testy/obousmerne.json`.
   Začít od `tabulka-vzorce` (6/26) — tam je slepota největší.
   Splácení zároveň umořuje dluh rohatky: ke každému doměřenému testu zapsat
   podvrh + zdravý stav do `testy/obousmerne.json` (dluh `bezDokladu` = 14, jen klesat).
4. `cz()` chybí v 11 simulacích, které formátují čísla.
4b. **Z auditu 4. 8.** (celý výstup v `AUDIT-2026-08-04.md`):
   - ~~Měřidlo názvů bloků MakeCode + VEXcode~~ — **HOTOVO 5. 8. (kolo D8)**,
     hned našlo a opravilo 4 živé vady.
   - **Čísla v PROGRESS.md generovat, ne opisovat** („14 simulací" × realita 86) —
     buď skriptem z brány, nebo nahradit odkazem na `node zkontroluj.mjs`.
   - **Checkpointy vázat na datum, ne číslo kola** — „revize à 10 kol" umřela
     přečíslováním (od 29. 7. bez checkpointu); totéž metriky kol 29–72 chybí.
   - **U počítadla vazeb přiznat výluku** — „prošlo 150 ze 165 bloků": 15 souhrnných
     skládaných bloků je mimo záměrně, ale nikde to není napsáno.
   - **PRAVIDLA.md v Omeze má rozbité tabulky** (ř. 35–41, 115–126) — srovnat.
   - **Commit = jedno téma** — tour.astro/worker.js nepřibalovat k nesouvisejícím
     commitům (a718292, e90a0d2); zapsáno i do skillu /wonderly.
5. **BLOKOVÁNO, ne zapomenuto:** obě nové simulace (funkce v tabulkách, senzory robota)
   neprošly očima v prohlížeči — port 8788 drží dev server jiné session a cizí server
   tahle session zastavit nesmí (zkoušeno 3. 8. dvakrát). Až bude volný, projít je
   pohledem; kotvou jsou zatím testy, build a kontrola vygenerovaného HTML.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz` (rozhodovací tabulka v `KE-SCHVALENI.md`).

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

`node testy/vypis-kviz.mjs <blok>` (vypíše VŠECHNY otázky — hledej duplicitní páry,
délkové měřidlo je neukáže) → `node testy/delky.mjs <blok> --odpovedi` (znění
i délky, dorovnává se bez čtení celého souboru) → opravit → kontrolor → brána →
build → push. Hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
třikrát zachytila, že se týž řetězec v souboru vyskytuje vícekrát nebo vůbec.

> Pozn. 1. 8. 2026: pod tímhle nadpisem byla **podruhé zapsaná fronta úkolů**, která
> si protiřečila s frontou nahoře — a právě podle ní se ráno jelo dorovnávat kvízy,
> ačkoli audit z 31. 7. říkal, že skutečná díra je jinde. Nález auditora strategie.
> **Živá fronta i otevřené dotazy na učitele jsou VŽDY jen v nejhornější sekci.**

## Fronta nápadů (seřazeno podle priority)

### 🚴 Appka /tour — automatické přepínání mezi velkými závody (zadáno 4. 8. 2026)

Přání učitele: *„aby se to samostatně přepínalo na zrovna aktuální velké závody a vše
šlo automaticky — Vuelta a tak dále."* Rozpracované zadání, ověřený průzkum:

- **Tour, Tour Femmes i Vuelta mají TOTOŽNOU strukturu** (pořadatel ASO): `/en/rankings`
  s ajax adresami `itg`/`ite` i `racecenter.<doména>/api/…` (ověřeno 4. 8. 2026 — všechny
  tři vracejí HTTP 200). **Giro NE** (pořadatel RCS, `/en/rankings` vrací 404) — potřebovalo
  by vlastní parser, řešit až v druhém kroku.
- **Který závod běží, se nemusí hádat z kalendáře**: pro každou doménu zjistit etapu
  z `rankings`, zkusit `pack-<rok>-<etapa+1>` a podívat se na stáří pole `date`.
  Čerstvé (< 15 min) = tenhle závod se právě jede. Volbu závodu cachovat na hodinu,
  ať se to nedotazuje pořád dokola.
- **České jezdce hledat podle seznamu jmen**, ne podle národnosti v tabulce (ta tam není).
  Seznam ~15 českých profesionálů (muži i ženy) natvrdo v kódu, aktualizace jednou za rok.
  POZOR na diakritiku — hledat zkrácené tvary bez koncovky („NOSKOV", „VACEK", „ČERN"…),
  a ověřit, že zkratka nechytá cizí jméno.
- **Lokální modely (ollama) se sem NEHODÍ**: worker běží v Cloudflare, kam lokální model
  nedosáhne, a úloha není jazyková, ale deterministická. Jediné smysluplné využití AI by
  byl překlad anglického živého komentáře — a to by musela dělat Workers AI, ne ollama.
- Mimo sezonu musí stránka umět říct „právě se nejede žádný velký závod" místo pomlček.

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

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026 — sloučení dvou front, nález auditu)

Škola (web):
- [ ] `zkontroluj.mjs`: počítadlo otázek (`^\s*text:\s*'`) nepočítá starší jednořádkový
  zápis kvízů — jen kosmetika výpisu, opravit regex (nález 28. 7. u F8 tepelná výměna).
- [ ] Simulace „Rozpálená kolejnice" (dilatační spára, výpočet prodloužení) — F6/F8.
- [ ] Simulace „Změř to rukou, nebo teploměrem?" (tři kádinky) — F6 teplota.
- [ ] Generátor příkladů na průměrnou teplotu s grafem (celá čísla) — F6.
- [ ] Doplnit kompenzátor (expanzní smyčku) do výkladu teplotní roztažnosti.

Deník:
- [ ] Opravit 8 VAD z auditu webu 29. 7. (datum „červenec 2026" v EN/DE, neklikací
  piny bez JS, překryv pinů roků, atribuce mapy, video bez datové předpony,
  `satisfies` v preklady.ts) — drobné, bez rozhodování.
- [ ] Připomínky učitele 29. 7.: úvodní mapa roku začíná doma (jižní Čechy) ·
  u karty místa jen jeho vlastní video · fotogalerie u míst 2026 (náhled + zvětšení).
- [ ] Stará videa a fotky k bodům starších cest (zadání 2. 8., postup
  v `Cestovatelský deník/KE-SCHVALENI.md`) — začít bodem (a): `videa_k_mistum.py`.

Organizace:
- [ ] Po sjednocení úložiště modelů znovu ostrý test `graf_local.py` (dva modely).

Čeká na rozhodnutí učitele (přestěhováno tamtéž):
- [?] Referenční tváře 2021 — z kandidátů vybrat a POTVRDIT (přidání tváře = ta osoba
  se přestane rozmazávat, potvrzuje vždy učitel).
- [?] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a stará
  skrýt? (YouTube neumí vyměnit soubor.)
- [?] Rozhodovací tabulky z 29. 7.: laboratorní práce (12), nové simulace (10),
  UX školy (8), mapa+poutavost deníku (14).
- [?] 9 videí „k rozhodnutí" — `Cestovatelský deník/KE-SCHVALENI.md`.
- [?] Odkaz na video „Teplota a její měření – Fyzika 6" (v soupisu kanálu není).
- [?] Návrh: shlukování popisků na úvodní mapě do čtverců („7 míst"), zásah
  do `trasa_uvod.py`, ~1 kolo práce.

### 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (posouzeno, čeká na pokyn)

Učitel navrhl dát značkám „něco jako referenční fotky obličejů", ze všech států
a v mnoha velikostech. **Posouzeno odborně: tudy ne, ale jádro nápadu je dobré.**

- Reference obličejů řeší **identifikaci** (čí tvář to je), ne hledání. Detekci
  dělá jiný model a reference k ní nepotřebuje.
- U SPZ neselhává identifikace (značky se rozmazávají všechny stejně), ale
  **detekce** — dnešní Haar kaskáda `haarcascade_russian_plate_number.xml`
  hlásí střechu, plot, lavičku i terasu (doloženo v `data/pecliva-videa.log`
  31. 7., dvě zamítnutí po sobě). Katalog vzorů by nepomohl: kaskáda neporovnává
  obrázek s obrázkem, hledá jen přechody světla a tmy. Různé velikosti navíc
  už řeší `detectMultiScale` sama.
- **Co pomůže:** hledat značky jen UVNITŘ nalezených aut (střecha ani plot
  v autě nejsou) — bez cizího `.pt` modelu, který je vědomě zakázaný.
- **Z nápadu si vzít tohle:** sada značek z různých států a velikostí jako
  **zkušební sada pro měření**. Dnes nikdo neví, kolik značek automat přehlédne,
  a bez měření nejde zlepšení doložit.
- Navržené pořadí: (1) změřit dnešní stav na zkušební sadě, (2) přidat kontext
  auta, (3) přeměřit. Čeká na pokyn učitele.

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


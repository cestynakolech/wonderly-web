## ⏩ KDE POKRAČOVAT (9. 8. 2026 ráno — popisy roku 2025 NASAZENY)

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


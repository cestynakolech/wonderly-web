# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 NEJDŘÍV OTEVŘI `SAMOSTATNY-REZIM.md`
> **Aktuální stav práce, živá fronta úkolů i jediný seznam otevřených dotazů na učitele
> jsou v `SAMOSTATNY-REZIM.md`, v jeho NEJHORNĚJŠÍ sekci** — ne tady. Tenhle soubor je
> spíš technická příručka (jak co přidat, kde co leží); jeho jednotlivé sekce mohou být
> staršího data.
>
> Poslední stav: **3. 8. 2026** — kolo D1: **4 nové simulace informatiky naráz**
> (klonování ve Scratchi, vstupy micro:bitu, rádio micro:bitu, první program ve VEXcode);
> názornost informatiky **30 → 26** podtémat bez názornosti. Měřidlo `testy/nazvy-bloku.mjs`
> rozšířeno o vzory `pokud ⟨⟩ tak` a „náhodnou hodnotu" i s obousměrným důkazem.
> **Nedoběhla druhá kontrola oprav** (došel týdenní limit) — zadání je připravené
> v `SAMOSTATNY-REZIM.md`, sekce „🔴 NEDOKONČENO Z KOLA D1". Předchozí stav (2. 8.):
> hluché stránky 36 → **0**, dojetý celý audit kontrol (brána čte data, měří se i mapa
> „všechna místa", slovník druhů materiálu, mutační test simulací).

## ⏩ Jak navázat v nové session
1. Přečti `CLAUDE.md`, pak **`SAMOSTATNY-REZIM.md` (horní sekce)** a podle potřeby tenhle soubor.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5 && node zkontroluj.mjs
   ```
   Brána musí skončit `✅ Vše zapojené správně.` — běží i sama v `prebuild`.
3. **CELÁ FYZIKA 2. STUPNĚ (6, 7, 8 i 9) JE KOMPLETNÍ** — tagy `fyzika-6-hotova`, `fyzika-7-hotova`, `fyzika-8-hotova`, `fyzika-9-hotova`. Každý ročník má navíc celek **„Shrnutí a opakování"** (pololetní + roční shrnutí s automaticky skládaným souhrnným kvízem a tisknutelným testem).
4. Další možné kroky: doplnit média k Fyzice 6 (infografiky/písně/videa z YouTube automatu), předměty Informatika a Pracovní činnosti, nebo revize hotových stránek. Podklady 6. roč.: `/Users/Shared/Škola/6/` (složky 01–08 + záloha `SmartBooks`).

### 🔎 Měřidla a kontroly (co je po ruce)
| Příkaz | K čemu |
|---|---|
| `node zkontroluj.mjs` | hlavní brána — zapojení simulací, kvízy, mapy, čísla, názvy bloků |
| `node testy/vsechny-simulace.mjs` | všechny testy simulací (aktuální počty vypisuje běh sám) |
| `node testy/kratke-vyklady.mjs 1200` | krátké výklady; 🕳 = hluchá stránka (dnes 0) |
| `node testy/mutace.mjs [název]` | **mutační test** — je test simulace vůbec k něčemu? (pomalý, mimo bránu) |
| `node testy/nazvy-bloku.mjs` | názvy bloků Scratche proti české lokalizaci |
| `node testy/vypis-kviz.mjs <blok>` · `node testy/delky.mjs <blok>` | práce s kvízy |

### 🕹️ Interaktivní infografiky — jak přidat další (kladka…)
Aktuální počet simulací vypisuje brána `node zkontroluj.mjs` (číslo sem neopisovat — opsané zastarává, nález auditu 4. 8.). Jsou to canvas/SVG komponenty čistě v prohlížeči, styl viz existující. **Vzor přidání nové:**
1. Vytvoř komponentu `src/components/skola2/<Nazev>Simulace.astro` (podívej se na `TezisteSimulace`, `VrhSimulace`, `SkupenstviSimulace` — stejný rámeček `<section class="ramecek simulace">`, ovládání, `<script>` bez importů).
2. V `src/data/temata.ts`: rozšiř typ `interakce?: … | 'novy-klic'` a přidej `interakce: 'novy-klic',` k danému podtématu.
3. V `src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro`: přidej import + řádek `{podtema.interakce === 'novy-klic' && <NazevSimulace />}`.
4. `npm run build` → `git push`. Ověř `curl` na živé URL.
**Hotové interakce (klíč → podtéma):** hydraulika→pascaluv-zakon(F7), skupenstvi→skupenstvi-latek(F6), hustota→hustota(F6), obvod→jednoduche-elektricke-obvody(F6), teplomer→teplotni-roztaznost(F6), skladani-sil→skladani-sil(F7), vrh→gravitacni-sila(F7), teziste→teziste(F7), **paka→jednoduche-stroje-paky(F7)**, **magnet→magneticke-vlastnosti-latek(F6)**, **cara→cidla-vex-iq(Inf8)**, **binarni→soubory-slozky-aplikace(Inf7)**, **pakety→site-internet-email(Inf7) + pocitacove-site-a-internet(Inf9)**.
**Nápady na příště:** vyčerpány (páka, magnet, kladka hotové). Případně nakloněná rovina, kolo na hřídeli.
**Pozn. k testování:** v náhledovém prohlížeči (preview) se `requestAnimationFrame` zpomaluje → animace ověřuj VÝPOČTEM v konzoli, ne okem; na reálném zařízení běží plynule.

## ✅ HOTOVÉ a funkční na webu (lab.wonderly.cz)
### Funkce
- Kreslený design, navigace předmět→ročník→téma→podtéma
- Procvičovací kvíz s vysvětlením při špatné odpovědi + tančící/mlátící profesor (SVG animace v `Kviz.astro`)
- Tisknutelný test `…/test/` (heslo `ucitel-wonderly`): A4 = 4 lístky, líc hlavička+ot.1–4, rub 5–7, klíč
- Interaktivní simulace hydrauliky (`HydraulikaSimulace.astro`) na stránce Pascalova zákona
- Materiály: infografiky (jpg), písničky (mp3/m4a/mp4)

### Fyzika 7 — 30 podtémat KOMPLET (výklad + kvíz s vysvětleními + materiály)
- **Pohyb a rychlost** (4/4): klid-a-pohyb-telesa, posuvny-otacivy-pohyb, rychlost-draha-cas, priklady-na-vypocet-rychlosti
- **Síly kolem nás** (5/5): sila, gravitacni-sila, treci-sila, skladani-sil, teziste
- **Jednoduché stroje** (2/2): jednoduche-stroje-paky (páka+moment), pusobeni-teles-a-deformace (+kvíz)
- **Tlak v kapalinách** (3/3): tlak, pascaluv-zakon (+simulace), hydrostaticky-tlak
- **Vztlak** (2/2): archimeduv-zakon, telesa-stejnoroda-a-nestejnoroda (+kvíz)
- **Atmosféra a tlak** (3/3): atmosfericky-tlak, pretlak-podtlak-vakuum, meteorologie-a-mereni-tlaku
- **Světlo a jeho šíření** (4/4): svetlo-jeho-zdroje, odraz-svetla, lom-svetla, stin-faze-mesice
- **Zrcadla a čočky** (6/6): optika-rovinneho-zrcadla, kulova-zrcadla-dute-zrcadlo, opticka-cocka (+píseň), oko-vady-oka, rozklad-svetla-duha, vnimani-barev (oko/rozklad/barvy = infografiky). Pozn.: oko-historie-brýlí, rozklad, barvy jsou „nad rámec RVP".

## 🔜 ZBÝVÁ dodělat
**Fyzika 6, 7, 8 i 9 — HOTOVO (100 %)** (tagy `fyzika-6/7/8/9-hotova`) včetně pololetních a ročních shrnutí.
**NÁZORNOST (zadání učitele 31. 7. 2026):** `public/materialy/fyzika/` má jen 6. a 7. ročník.
Bez obrázku, videa i simulace je **40 podtémat informatiky** (nejhorší díra — ani jeden
obrázek či video ve všech třech ročnících; řeší se PRÁVĚ TEĎ), **13 podtémat fyziky 8** (z původních 22 — 3 vyřešena
novými simulacemi, 4 recyklací hotových, 2 jsou shrnutí, která názornost nepotřebují)
a **10 podtémat fyziky 9**. **Skutečně nejhůř je na tom informatika**: 47 podtémat,
5 simulací a ani jedno podtéma s obrázkem či videem — to je podle auditu větší díra
než zbytek fyziky 8. Pořadí dalších kol i fronta z auditu viz `SAMOSTATNY-REZIM.md`.
Zbývá dál: média k Fyzice 6 (infografiky/písně/videa); Pracovní činnosti — zatím jen celek 3D modelování (Tinkercad+SketchUp, 20. 7.), ostatní témata Pč dle podkladů učitele. Informatika 7–9 KOMPLET (výklad+kvízy+testy+odkazy s QR).

## 📋 Fyzika 8 — ROZPRACOVÁNO (struktura dle skutečného učiva 1–35)
Struktura `temata.ts` klíč `fyzika/8-rocnik` PŘESTAVĚNA podle složek učitele `/Users/Shared/Škola/8/` — 6 celků:
1. **mechanicka-prace-a-vykon** ✅ HOTOVO (mechanicka-prace, vykon)
2. **energie** ✅ HOTOVO (energie-a-jeji-premeny, pohybova-a-polohova-energie, zakon-zachovani-mechanicke-energie, energeticka-hodnota-potravin, vnitrni-energie-telesa, tepelna-vymena-a-teplo)
3. **tepelne-motory** ✅ HOTOVO (tepelny-motor-parni-stroj, spalovaci-motory)
4. **teplo-a-zmeny-skupenstvi** ✅ HOTOVO (teplo-a-premeny-skupenstvi, tani, tuhnuti, vyparovani, var, kondenzace, skupenske-zmeny-vody-v-prirode) — pozor: opraveny 3 chyby v podkladu (sublimace, var „z pevného", voda vře „0 °C")
5. **elektrina** ✅ HOTOVO (15 podtémat: náboj, pole, vznik proudu, chemické zdroje, obvody, proud+měření, napětí+měření, proud v kovech+odpor, závislost odporu, Ohmův zákon, sériové/paralelní zapojení, reostat/potenciometr, práce+výkon, účinky+bezpečnost) — výklad + kvízy z SmartBooks PDF 18–32. Bez chyb v podkladu.
6. **zvuk** ✅ HOTOVO (kmitani-a-vlneni, zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost) — výklad + kvízy + YouTube videa z automatu. Bez chyb v podkladu (SmartBooks PDF 33–35).

Postup: číst PDF (lokálně nebo přes Google Drive MCP text) → obsah do temata.ts + kvízy do kvizy.ts → build → push. Média (infografiky/písně) dodá uživatel lokálně; videa řeší YouTube automat.
- **Google Disk čitelný pro text** (search_files vrací contentSnippet), binárky ne. Přehled ke stažení: `Omega/dokumenty/fyzika8-ke-stazeni.md`. Kontrola chyb: `Omega/dokumenty/kontrola-podkladu-fyzika8.md`.
- **Fyzika 9** zatím nezpracována; struktura `fyzika/9-rocnik` je zatím starý placeholder (přestavět dle `Škola/9/` až budou podklady).
- Časové plány 8B (59 h) a 9 (41 h) v `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/`.
- **Kvíz: profesor je nově VIDEO** (`public/video/profesor/tanci.mp4` a `lomi-rukama.mp4`) — správně = tančí, špatně = lomí rukama.

## 🎬 Videa (později, dávkově)
Velká výkladová videa (>25 MB) → učitel nahraje na YouTube jako „nezařazená", dá odkazy (do txt souborů u zvuku ve sdílené složce). Pak se hromadně vloží do stránek (přidat do `materialy` u podtématu jako druh `video` s YouTube embedem, nebo malé mp4 přímo).

## 🛠️ Build / git postup
```
cd ~/Desktop/wonderly-web
# 1) uprav src/data/temata.ts (výklad+materiály) a src/data/kvizy.ts (otázky)
# 2) média do public/materialy/fyzika/<rocnik>/<tema>/<podtema>/
#    - infografiky: zmenšit na ~1200px jpg q82 (PIL), písničky WAV→m4a/mp3 (ffmpeg)
npm run build                          # musí projít bez erroru
git add -A src public/materialy
git commit -m "..."                    # patička viz konvence sessionu
git push origin main                   # Cloudflare deploy ~1 min
# ověření nasazení:
for i in $(seq 8); do curl -s https://lab.wonderly.cz/fyzika/7-rocnik/<tema>/<podtema>/ | grep -c "Spustit kvíz" | grep -q 1 && echo OK && break; sleep 10; done
```

## 🔄 Jak se vrátit zpět, když se něco nepovede
Každý `git push` = uložená verze na GitHubu (restore point). Web jde vrátit do libovolného dřívějšího stavu:
```
cd ~/Desktop/wonderly-web
git log --oneline -20                 # seznam verzí (nahoře nejnovější)
git revert <hash>                     # vrátí konkrétní změnu (bezpečné, vytvoří nový commit)
git push origin main                  # nasadí návrat
```
Pro rychlý návrat na pojmenovaný milník: `git tag` ukáže značky (např. `fyzika-7-hotova`), návrat `git revert` nebo `git checkout <tag> -- .`.
**Milníky značíme tagem** po dokončení většího celku: `git tag -a <nazev> -m "popis" && git push origin <nazev>`.

## 📝 Pravidlo aktualizace (na konci každé session)
1. Přidej NOVÝ datovaný záznam do sekce „Historie" níže (staré NEmaž — je to lidsky čitelná historie).
2. Aktualizuj sekce „HOTOVÉ" a „ZBÝVÁ" výše podle reálného stavu.
3. `git add -A && git commit && git push` (i PROGRESS.md se tím uloží na GitHub jako verze).
4. Po dokončení celého ročníku/velkého celku přidej git tag jako milník.

## 🗓️ Historie (changelog — přidávej nahoru, staré nech)

- **2026-08-11 pozdě večer (druhá smyčka: kráječ videí v principu)** —
  Zadání učitele „projdi dnešní chyby a rozpory, smyčka do 0". Návody:
  0 nálezů po 4 kolech (7 oprav, hlavně nedomyté snapshoty v PLAN-PORADEK).
  Hon na 4 odložená videa Saint-Sauveur odhalil ŘETĚZ tří vad kráječe:
  (1) `-map 0` táhl mebx stopy iPhonu → muxer segmentů nezapsal moov
  a kousek byl nečitelný i z čerstvého střihu; (2) recyklace torza —
  „hotové kousky se nekrájí znovu" lhalo donekonečna; (3) dítě vracelo
  kód 0 při chybě („selhal (kód 0)"). Kontroloři ve 3 kolech přidali:
  slep() atomicky (temp+replace) s kotvou stopáže (ffmpeg concat vrací
  0 i při chybě demuxingu!), délková shoda recyklovaných kousků, zákaz
  duplicit v seznamu, selektivní monkeypatch v testu (dřív zabíjel
  i ffmpeg a měřil špatnou větev). Testy 21/21 s podvrhy obou směrů.
  Nový konflikt HLADOVĚNÍ DRÁHY (kontrola kvality à 5 min vytlačila
  anonymizaci; smyčka teď při obsazené dráze čeká). Videa se přes noc
  dodělávají sama (47/49), výrobu spustí čekač.
- **2026-08-11 večer (kolo WONDERLY: měřidla map v principu + simulace výkonu)** —
  Audit návodů po /clear: 3 kola, 0 nálezů (5 drobností: kadence kontroly
  kvality, značky ⏸ v ose AUTOMATY.md). **Hlavní oprava dne: měřidla map
  lhala o nových videích** — `prepocet_map` i denní `kontrola_poradi`
  rekonstruovaly obsah mapy ze STARÉ trasy i u videí složených z trvalé
  trasy (falešné „chybí Ornans/Riez", ráno 12, večer 15 „k přestavbě").
  Nové pravidlo HRANICE TRVALÉ TRASY (jediný domov
  `kontrola_poradi.mapa_z_trvale_trasy`, krok B = 10. 8. 8:27) → 8 map
  k přestavbě = přesně seznam kroku E (nezávislá kotva). Pevné součty 7/10
  v testu (4× po sobě padal) nahrazeny invarianty + čistou funkcí
  `chybejici_zastavky` s podvrhy obou směrů. `kontrola_kanalu` umí povýšení
  krytého místa na vlastní video (Riez, Saint-Tropez) — odebere krytí
  i zbylé `pridano_k`; kontrolor chytil oscilaci oprav i ISO čas s „T".
  Evidence srovnána (0 nesouladů), testy 27/27 a 19/19, 4 kola nezávislé
  kontroly měřidel, pravidlo v PRAVIDLA.md. **Web: nová simulace VÝKONU**
  (F8, jeřáb vs. dělník, celá čísla, čistá funkce času; kontrolor 2 drobné
  nálezy, opraveny) — názornost F8 11 → 10. Anonymizace běží smyčkou
  (Saint-Sauveur), zítra 9:15 nahraje automat 5 dílů sám.

- **2026-08-11 (kolo WONDERLY: audit návodů do 0 + úniky kvízů 38 → 0)** —
  Kolo začalo povinným auditem dokumentace (zadání učitele): dva hledači
  rozporů naráz, opravy, smyčka s nezávislým kontrolorem do **0 nálezů**
  (3 kola). Hlavní opravy: kánon popisů míst („píše Claude ze zdroje", ruční
  roky přímo do .ts) sjednocen ve skillu i PRAVIDLA.md; **modelů je 8, ne 7**
  — llama3.1 se po omylném smazání týž den vrátil (jediný kontrolor jiné
  rodiny; `popisy_mist.KONTROLORI` zúžen na něj); mrtvé cesty záloh
  v PLAN-PORADEK.md. **Web: všech 38 úniků odpovědí v kvízech opraveno na 0**
  a rohatka utažena — příští únik shodí build. Postup diamantem: 5 workerů
  (sonnet) navrhlo přeformulování ve ~25 blocích, hlavní model zapsal,
  **5 kol nezávislé kontroly** (11+6+2+2+0 nálezů). Kontroloři chytili mj.:
  moje vysvětlení tvrdilo „W není značka veličiny" (je to značka práce),
  „částice plynu letí svižněji" (rychlost určuje teplota, ne skupenství —
  správný důvod je volná dráha), únik počtu tlačítek micro:bitu přes
  SOUSEDNÍ blok a šíření vůně vydávané za difuzi (je to proudění). Past dne:
  **návrh kontrolora umí vrátit původní únik** („vraťte konkrétní ‚malé p je
  tlak'") — oprava musí být konkrétní JINÝMI slovy. Nahrazeny 2 otázky;
  výklad odrazu doplněn o dvě rovnoběžná zrcadla; ve výkladu micro:bitu
  opravena poloha dotykového loga V2 (bylo „vzadu", správně vpředu nad
  displejem). Deník mezitím: anonymizace 113 → 89 souborů (čekací smyčka
  střídá dráhu s kontrolou kvality fotek), v `nasazeno/` čeká 5 dílů na
  zítřejší kvótu.

- **2026-08-10 (celý den: plán POŘÁDEK A–D + ZMĚNA ZPŮSOBU PRÁCE + 2 videa ven)** —
  Dopoledne dojety **kroky A, B, C a D** plánu `Omega/PLAN-PORADEK.md`: revize
  automatů zná STOPKU; tabulka míst má přesné ČASY focení, je bez duplicit
  (42 → 39 řádků) a poprvé v ní je Ramonchamp; **trasa se staví z tabulky —
  16 → 31 zastávek, 2 826 km** (Ballon i Ornans v ní byly poprvé); spočítáno,
  že **10 map je vadných a 7 v pořádku** — týž seznam, k jakému došel plán
  z jiných dat; dotříděno 26 médií do Le Lavandou se souhlasem dvou
  nezávislých kritérií.
  **Odpoledne učitel změnil způsob práce:** *„všechnu práci vrhnout vždy na
  video, které je v pořadí; videa se budou dělat v pořadí cesty, jinak je to
  nelogické"* a *„vše na další video a mezitím dodělat web"*. Podle toho jsou
  **hotová a živá dvě videa**: **Landshut** (`uuRd8CtlUJI`, 1:30) a **Ballon
  d'Alsace** (`ghBZ3WUwQPY`, 12:21) — obě prošly kontrolami (mapa, zvuk,
  délky, anonymizace pohledem), jsou na kanálu i na webu, ověřeno curlem.
  Ballon je na webu **nové místo** s popisem ve 4 jazycích z doloženého
  zdroje. Landshut dostal vlastní video místo sestřihu německé části.
  **Tři poruchy nalezené a opravené:** hlídač anonymizace se 10,5 h točil
  naprázdno (systém ho zabíjel pro paměť na jednom videu); tabulka hlásila
  zrušený krok „schválit video" — zrušené pravidlo přežilo v KÓDU; přerušený
  upload vyrobil na kanálu duplicitu (vadný zbytek přepnut na soukromý,
  nahrávač se teď po chybě sám ptá kanálu).
  **Dvě vlastní chyby přiznané a opravené:** ze tří vzorků paměti jsem
  vyhlásil „lineární únik" — doběhnuté měření (39 vzorků) to vyvrátilo;
  a hlídač zaseknutí spustil čtyři falešné poplachy, než se doladil.
  **Nové nástroje:** `hlidac_zaseknuti.py` (à 30 min, mluví lokálním modelem
  jen při nálezu), `priprav_mapy.py` (10 map dopředu), `poradek_medii.py`,
  `prepocet_map.py`, `trasa_z_tabulky.py`, `kontrola_kanalu.py` — každý
  s obousměrným důkazem (dohromady ~120 kontrol).
  **Tabulka nově ukazuje** sloupec „Mapa připravena" a dva různé časy videa
  (výroba × nasazení) — na přání učitele: *„vše, co vytvoříš, zaznamenat do
  tabulky, je to důležité pro kontrolu a plánování"*.

- **2026-08-10 dopoledne (kolo WONDERLY: KROK A plánu PORADEK celý hotov)** —
  Deník: vykonán kompletní krok A plánu `Omega/PLAN-PORADEK.md` v3.
  **A1:** revize automatů zná STOPKU — pozastavené automaty čte z
  `pozastavene-automaty.json`, hlásí je „pozastaven plánem" a obousměrně hlídá
  porušení (nahraný v launchd / aktivní plist / bez evidence); test 10/10,
  ostrý běh 3 pozastavené a 0 falešných poplachů. Bonus: revize sama našla
  opsané pravidlo `pripony-medii` → nahrazeno importem z domova.
  **A2:** tabulka míst nese plný ČAS první a poslední fotky (zdroje: složky
  deníku + evidence alba, která přežije úklid) a řadí se podle času;
  `klic_mesta` sjednocuje oddělovače a apostrofy → 42→39 řádků, 0 duplicit
  (kalibrace na 335 názvech: 17 slitých skupin, všechny týž objekt; testy
  nahrávače 36/36). Ramonchamp je poprvé v tabulce (zdroj = pokrytí
  `pridano_k`, sloupec „Kryto videem", vlastní video se po něm nechce).
  **A3:** nový `kontrola_kanalu.py` — soupis kanálu s CELÝMI názvy
  (210 videí), pokrytí ze tří zdrojů, nesoulad evidence Le Bourg srovnán
  (`pridana_mista` += Riez, Saint-Tropez; poté 0 nesouladů). Z logu nahrávače
  doloženo: `_v2` soubor = `wZSKCdxlmeg` (31. 7., 248 MB, čeká na předělání),
  platné je `-FR8z-38PR8` (1. 8., 527 MB, má ho web) — „v2" zase neznamenalo
  novější. Tabulka pro učitele: `Omega/dokumenty/KANAL-POKRYTI.md`; zdvojené
  datumové prefixy na kanálu už nejsou (doloženo soupisem). Tři nové testy
  (10+11+13 kontrol) v denní revizi. **Na řadě: krok B — trasa z tabulky.**

- **2026-08-08 v noci (kolo WONDERLY: trojice „Délka" + dvě opravy měřidel)** —
  Fyzika 6 má polemiku u 10 z 21 podtémat; další díra ve veličinách je **Délka**
  (hmotnost, objem i hustota ji mají). Vznikla **trojice krátkých dílů**: metr
  a převody (28 replik) · čím měřit, od vlasu po hvězdy (24) · jak měřit správně (22).
  Scénáře psali **tři workeři naráz**, pak **nezávislý kontrolor**: 11 nálezů,
  všechny opraveny. Nejvážnější: scénář prohlásil **správnou značku délky `l`
  za omyl** (kvíz téhož podtématu píše `l = 72 mm`) a věta „mezi popsanými čárkami
  je deset menších čárek, čili deset mezer" **bořila pointu celého dílu** — mezer je
  deset, ale menších čárek jen devět, a scénář si to o čtyři repliky dál sám
  vyvracel. **Brána kvízu 21 z 21.** 19 schémat kreslí kód (stupnice se počítají
  z počtu mezer, ne od oka); kontaktní list našel oříznutý popisek a překryv textu
  s kresbou — obojí opraveno a přerenderováno. Zvuk lokálním OmniVoice: díl 3
  hotov (18 replik z 22 na první pokus).
  **Dvě opravy měřidel, obě s obousměrným důkazem:** (1) revize automatů hlásila
  dva **falešné poplachy** `⏳ PŘETRVÁVÁ` u chyb, jejichž skripty se týž den opravily
  — doplněna druhá kotva (sleduje i importované moduly a porovnává ČAS, ne datum),
  nález se nezahazuje, jen přeřadí do „čeká na ověření"; ostrý běh **0 nálezů**.
  (2) brána pokrytí kvízu **neuměla trojici** (díly si otázky rozdělí, takže se
  u trojic dala jen obejít) a **měřila jen podíl shodných slov** — dvojice dílů
  díky tomu „pokryla" 14 ze 14 otázek, ačkoli jediná zmínka zněla „příště si povíme,
  co jsou směsi". Nově musí zaznít i nosné slovo odpovědi; kalibrace na 137 otázkách
  hotových dílů posílá k modelu 2 navíc (1 %).

- **2026-08-08 dopoledne (kolo WONDERLY: částicová série F6 — dva díly rozpracované, dvě nové animace)** —
  Vyrobeny **scénosledy, 19 schémat a dvě animace** k dílům „Z čeho je všechno
  složené" (Démokritos, Brown) a „Jak se částice chovají" (neuspořádaný pohyb,
  teplota, tlak, síly). **Obě animace kreslí kód a jejich kotvy se spočítaly
  PŘED renderem:** u Brownova pohybu se zrnko nehýbe náhodně „aby to vypadalo",
  ale proto, že se sečtou impulzy skutečných nárazů molekul — vyšla dráha 1091 px
  proti posunu 156 px, tedy sedmkrát delší, a na pěti semínkách 4,2× až 19,6×.
  To je právě chování náhodné procházky, o kterém díl mluví. U teploty se poměr
  rychlostí NEZADÁVAL, ale změřil z toho, kolik částice ujely: **1,171 proti
  spočtenému √(373/273) = 1,169.** Rozdíl mezi 0 a 100 °C je tedy jen 17 % —
  scéna to nesmí zveličit, a aby přesto byl vidět, měří ho pruh a číslo v km/h.
  **Dvě vlastní chyby, obojí odhaleno vlastní kontrolou:** (1) první nastavení
  zrnka mělo takovou hmotnost, že se za devět vteřin posunulo o 19 px a vůbec
  nebylo vidět, že se hýbe — kotva to ukázala dřív, než se cokoli vyrenderovalo;
  (2) čekací smyčka na uvolnění dráhy poznala jen JEDNU ze dvou hlášek o čekání
  a na té druhé (málo volné paměti) skončila jako „hotovo" — tentýž vzorec jako
  „opatření tiše platí jen na část případů".
  **Prohlídka kontaktním listem našla tři vady, které z výpisu skriptu nejsou
  vidět:** překrývající se popisky u dělení křídy, text „zahříváme" nakreslený
  přímo v plameni a popisky start/konec ležící na dráze zrnka. Opraveno; navíc
  mikroskop dostal jediný domov (kreslily ho dvě scény zvlášť).
  **Brána pokrytí kvízu: trojice dílů pokrývá všech 18 otázek beze zbytku.**
  **Oba díly jsou hotové a NASAZENÉ** (1:42 a 1:52; ověřeno curlem — stránka
  vrací tři videa a obě nová jsou v R2). Délka videa se rovná délce zvuku na
  setinu, hlasy nejsou prohozené (245 a 151 Hz). **Trojice dílů pokrývá
  všech 18 kvízových otázek beze zbytku.**
  **Splněno i přání učitele o samostatných animacích:** dvanáct klipů běží
  nově i pod výkladem podtématu (přehrát/pauza, od začátku, zpomalit, dokola)
  na osmi stránkách Fyziky 6. Klipy jsou němé (změřeno −91 dB) a přehrávač má
  `muted`; tichá stopa v souboru ZŮSTÁVÁ, bez ní by přehrávač zamrzl.
  **Audit na startu kola:** oba „přetrvávající" nálezy revize automatů jsou
  ZASTARALÉ, ne živé — chyba padla v 00:33, oprava PATH přišla v 09:58 téhož dne;
  doloženo reprodukcí s chudým PATH (oba kroky dnes doběhnou). Revize by měla
  porovnávat čas chyby s časem změny skriptu. `animace_podkastu.py` si jako
  jediný skript řetězu nebral zámek dráhy — doplněn.
  **Dvě přání učitele zařízena:** velký audit jede od teď **každou neděli sám**
  (plánovaná úloha `wonderly-audit-nedele`), a **čekání na doběhnutí rozdělané
  práce se už neodklikává** — vrátný ho propouští, ověřeno obousměrně.

- **2026-08-08 odpoledne (dodatek: verze 2 dílu + všech 12 nálezů auditu uzavřeno)** —
  Na pokyn učitele dotaženy VŠECHNY nálezy celkového auditu: díl skupenství
  nasazen ve **verzi 2** („roztavíš" místo „rozpustíš", bezpečnostní věta,
  stříkačka i v audiu, opravený závěr, popisek scény 08, bílé obrysy částic;
  produkce vrací nový soubor bajt na bajt). Systémově: PATH pravidlo má jediný
  domov `skripty/prostredi.py` (bylo 6 kopií; registrováno + hlídáno), atomický
  zápis anonymizace (temp + os.replace), hlídač fotek v denní revizi, pauza
  baterie, tautologická zkouška přepsána. Zaveden povel **`WONDERLY AUDIT`**
  (velký audit + úklid dokumentace, každou neděli — definice ve skillu).
- **2026-08-08 v noci (kolo WONDERLY: audit + polemika skupenství nasazena)** —
  Audit na startu kola našel a opravil tři věci: (1) řetěz kontroly anonymizace
  padal pod launchd na holém `node` (z terminálu prošel — proto vypadal zdravě);
  PATH se teď rozšiřuje v `mista_deniku.py` a zdědí ho všechny navazující
  skripty; logy nově ukládají KONEC tracebacku, ne useknutý začátek.
  (2) Hlídač nových fotek byl znovu zabit systémem bez jediného výsledku —
  „dávka 99 fotek" je ve skutečnosti 88 VIDEÍ + 6 fotek; nový kód bere fotky
  po 20 a video nejvýš jedno na probuzení, s evidencí pokusů psanou před prací
  (přežije signál 9) a odložením po 3 nezdarech (test 13/13 — našel při psaní
  skutečnou chybu). (3) Revize automatů hlásila mrtvou cestu, protože regex
  bral celý příkaz `node testy/obousmerne.mjs` jako název souboru (test 14/14).
  **Hlavní práce: díl `skupenstvi-latek-dialog` dotažen a NASAZEN** — zvuk
  lokálním OmniVoice (38/38 replik na první pokus; hlasy změřeny: 146/250 Hz,
  obě v pásmech), animace částic přerenderovaná s měřenými kotvami (mřížka
  pevné látky, sloupec kapaliny 189 px spočtený = naměřený, plyn zaplní 97 %
  nádoby), ilustrace scény 0 mfluxem (led správně plave), video 5:16 s
  faststartem i zvukovou stopou, úplnost doložena porovnáním všech 38 replik
  s přepisem. Ověřeno curlem na produkci (stránka i soubor z R2). GPU dráha se
  celou noc střídala s automaty — čekání řešila smyčka, pojistka zámku
  fungovala správně (odmítla OmniVoice, dokud jely fotky/pečlivá videa).

- **2026-08-07 (podkásty F6 nasazené · videa se rozhýbala · dvě vady vlastních měřidel)** —
  **Všech 8 dílů Fyziky 6 dostalo nový hlas** (lokální OmniVoice, zdarma), učitel je
  poslechl a schválil. Kotvou správnosti byla **změřená výška hlasu** (muž 142–161 Hz,
  žena 233–264 Hz) — prohození hlasů se jinak pozná až poslechem celého dílu.
  **Osm videí nasazeno:** hmotnost, hustota, objem a vzájemné působení sil dostaly
  video vůbec poprvé, tři díly druhou verzi vedle stávající, úvod do fyziky nahradil
  starší nahrávku s prohozenými hlasy. Čtyřem dílům se musela dokreslit chybějící
  úvodní ilustrace — schémata měly hotová, chyběla jen ta jediná neschematická scéna.
  **Učitel pak zadal pohyblivé scény:** *„aby se do videa nepřidávaly jen statické
  obrázky… například když říkají, že astronaut upustí kladivo a pero, tak by to bylo
  i vidět… ne jen ty předměty, ale i to okolí."* Vznikl modul `animace_podkastu.py`;
  `video_podkastu.py` umí vložit klip místo statického snímku a poslední snímek podrží
  do konce scény. Nasazené jsou dva díly s animacemi: úvod do fyziky (kámen × papír
  na Zemi, kladivo × pero na Měsíci) a gravitační síla (Newtonovo dělo — tři výstřely,
  dva dopadnou, třetí obíhá). **Animace kreslí KÓD, ne video model:** polohy se počítají
  z volného pádu, pádu s odporem a numerické integrace v gravitačním poli, takže
  „dopadly současně" i „obíhá" z výpočtu VYJDOU. Generativní model se z pozemských
  videí naučil, že lehké věci padají pomaleji vždycky — na Měsíci by učil opak zvuku.
  **Nejdražší past dne vypadala jako vada obsahu:** učiteli se klip „zastavil po 0,07 s,
  ani se to nerozběhlo". Animace byla v pořádku — soubor měl **index (`moov`) až za
  obrazovými daty a žádnou zvukovou stopu**, na čemž přehrávač zamrzne hned na začátku.
  Doloženo hledáním značek `moov`/`mdat`; nově má každý klip `+faststart` a tichou stopu.
  Hotová videa podkástů to měla odjakživa, samostatně vyráběné klipy ne — proto to
  nikdo dřív neodhalil.
  **Dvě vady ve VLASTNÍCH měřidlech** (opakovaný vzorec projektu): (1) brána
  `pokryti_kvizu.py` hlásila jako chybějící **každou odpověď kratší než tři znaky**,
  tedy všechny značky Fe, O, m, V, F napříč fyzikou — zbyla jí prázdná množina
  klíčových slov; k tomu špatně skládala číslovky („sto osmnáct" → „8 100" místo 118).
  Opraveno, regrese změřena na všech 8 dílech: **0 zhoršených, 3 zlepšené**.
  (2) Měřidlo polohy pera tvrdilo, že pero visí ve vzduchu, ačkoli leželo — měřilo
  text hlášky a vracelo v obou časech totéž; vyvrátil to až pohled na výřez.
  **Poučení: když si měření a pohled odporují, hledej chybu nejdřív v měření.**
  Třetí poučení je od učitele: **splněná norma kontrastu není důkaz čitelnosti** —
  tmavý text na trávě měl 6,2 : 1 (norma 4,5) a přesto mu splýval; text přes kresbu
  proto patří na bílou plaketu. Splacen i zapsaný dluh: `vyrob_video_automat.py` si
  nově bere sdílený zámek modelu kolem výroby hudby ACE-Stepem.
  Napsané a branou prověřené jsou **scénáře `atomy-a-molekuly`** jako tři krátké díly
  (14 ze 14 otázek pokryto); chybí jim scénosledy. Návod pro kolegu:
  `Omega/dokumenty/NAVOD-ANIMACE-PODKASTU.md`.

- **2026-08-05 (audio podkásty fyziky — celá Fyzika 6 napsaná, hlas vybrán, rozhodnut dialog)** —
  Povel `WONDERLY PODKASTY`. **Napsáno a zkontrolováno všech 21 z 21 scénářů Fyziky 6**
  (`Omega/podkasty-scenare/6/`), tři dávky vějířem workerů, ke každé **nezávislý kontrolor**;
  měřidlo nad všemi hlásí 21 vstupů, 0 nálezů. Učitel zřídil klíč OpenAI (ověřen skutečným
  voláním), poslechem 13 hlasů vybral **`fable`** a schválil první hotový díl
  (gravitační síla, 3:58) — pak ale rozhodl, že podkásty budou **DIALOG dvou lidí**
  (`fable` vysvětluje, `nova` se ptá), protože „polemika by byla zajímavější".
  **Nejcennější výstup nejsou scénáře, ale 20 věcných chyb NALEZENÝCH VE VÝKLADU NA WEBU**
  (ocel jako „sloučenina", krystalické látky „velice tvrdé", laserový dálkoměr
  „nejpřesnější", uzemnění jen pro záporný náboj, u proudu a napětí chybí značky I a U…) —
  do `temata.ts` se bez pokynu učitele NESÁHLO, tabulka čeká v `SAMOSTATNY-REZIM.md`.
  **Dvě z nich byly BEZPEČNOSTNÍ:** díl o obvodech uváděl zásuvku mezi zdroji a hned nato
  dával návod na zapojení, aniž kdy řekl, že zdrojem smí být jen baterie; u Archimédova
  poháru chyběl krok „kámen celý pod hladinou". Poučení: **u obsahu konzumovaného
  POSLECHEM BEZ OBRAZU musí kontrolor dostat zvláštní otázku „dá se to podle poslechu
  bezpečně provést a nechybí krok?"** — běžná kontrola věcné správnosti to nenajde,
  protože každá věta je sama o sobě pravdivá. **Nápad učitele, který zafungoval:** místo
  syntézy replika po replice (zní slepeně, intonace se u každé resetuje) přečte celý
  rozhovor každý hlas zvlášť, repliky se podle časů slov vystřihnou a proloží — výsledek
  74 s proti 89 s a znatelně plynulejší. Proměřeno i to, co zdarma NEJDE: hranice replik
  podle pauz (nejkratší vybraná pauza 0,75 s = nejdelší nevybraná, odhad chybný o 3,7–10 s)
  ani lokální whisper (liší se o 0,19 s, useknul by 1–3 repliky ze 13; větší model
  nepomohl). ZBÝVÁ: zkušební díl na **ElevenLabs Text to Dialogue** (víc mluvčích v jednom
  požadavku → odpadá střih i dvojí syntéza), ověřit jeho cenu, pak přepsat 21 scénářů
  do dialogu, vyrobit, zapojit na web jako `druh: 'audio'` a pokračovat F7 (33 podtémat).

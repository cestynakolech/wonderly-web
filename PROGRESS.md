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
  ZBÝVÁ jim zvuk, ilustrace scény 0 a video — GPU dráhu držela celé dopoledne
  anonymizace fotek; postup a doložené kotvy jsou v `SAMOSTATNY-REZIM.md`.
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

- **2026-08-04 (appka /tour přepnuta z mužské na ŽENSKOU Tour + poznávačka + oprava živé tabulky)** —
  Zadání učitele: *„nyní jsme na dámské tour a jede tam minimálně jedna Češka, pokud to jde
  předělej ji"*, pak *„pokus se tam dostat startovní číslo a dej nám sem obrázky dresu
  a přilby, ať ji poznáme"* a *„nefungují živá data do tabulky"*.
  **Kdo se sleduje:** Nikola Nosková (Cofidis Women, **číslo 147**) — jediná Češka na startu
  Tour de France Femmes 2026 (1.–9. 8., Lausanne → Nice, 9 etap). Ověřeno DVĚMA nezávislými
  cestami: startovní listinou a projetím celé výsledkové tabulky (139 jmen) na českou
  diakritiku — druhé nalezené jméno je Slovinka Žigart, další Češka tam není.
  **Hotovo a nasazené** (`https://lab.wonderly.cz/tour/`): zdroj dat přepnut na
  `letourfemmes.fr` + `racecenter.letourfemmes.fr`; startovní číslo v hlavičce karty;
  sekce „Jak ji poznáte v televizi" — vlastní SVG kresby dresu (žluté rukávy, tmavě
  červená ramena, červeno-bílý trup, svislé COFIDIS) a bílé přilby Uvex + tabulka
  startovního čísla; QR kód na ploše (`QR-noskova-tour-femmes.png`); koncept e-mailu
  s odkazem připraven v Gmailu (odeslání je na učiteli).
  **Čtyři skutečné chyby nalezené a opravené** (podrobně i s pastmi v skillu `/wonderly`,
  sekce „Mini-aplikace /tour"): (1) ženská tabulka má **o sloupec navíc** → parser hledá
  čas podle tvaru, ne podle indexu; (2) **pomlčka ve sloupci Gap ≠ „vede"**, ale dojezd
  v čase vítězky — chybu měla i mužská verze (Vacek 154. „vede"); (3) endpointy mimo
  etapu vracejí **prázdné tělo (204)**, na kterém `.json()` padal a shazoval s sebou
  i výpis skupin; (4) **živá tabulka se nikdy nezobrazila**, protože ženský racecenter
  nevysílá telemetrii jednotlivých závodnic — běh závodu se teď pozná podle stáří
  posledního záznamu skupin (< 15 min) a živá pozice se odvodí ze skupiny, kde má
  Nosková číslo. Navíc: francouzské názvy skupin přeloženy do češtiny, komentář zbaven
  HTML značek a doplněn fallback `cs → en → fr` (česká verze u žen neexistuje).
  **Ověřeno kotvami, ne dojmem:** worker spouštěn přímo v Node proti živým datům;
  oprava živé tabulky doložena OBOUSMĚRNĚ (čerstvá data → jede se + pozice ve skupině;
  stará data → skryto); SVG kresby vyrenderovány přes `qlmanage` do PNG a prohlédnuty
  (první verze měla odsazené rukávy a moc tlusté dno přilby → opraveno).
  **ZBÝVÁ / na příště:** živá tabulka se v ostrém provozu ukáže až za jízdy etapy —
  ověřit ji **5.–9. 8. odpoledne** (etapa 5+); po skončení závodu 9. 8. se stránka
  přepne zpět na mužskou Tour podle návodu ve skillu.

- **2026-08-02 večer II (audit automatů: opsaná pravidla; mapa dostala videa; zkratka WONDERLY)** —
  Učitel zadal: *„překontroluj všechny automaty, zda nedělají totéž — že se něco opraví
  a najednou druhý automat jede z jiných příkazů."* Podnětem bylo, že se mu **videa,
  která zkontroloval a přesunul do `nasazeno/`, po hodině vracela k revizi**.
  **Příčina byla přesně ta, na kterou se ptal:** oprava z 31. 7. („hledej video i
  v nasazeno/") žila ve funkci `uz_hotovo()`, jenže hlavní smyčka ji **nevolala** —
  měla vlastní kopii podmínky. V jednom běhu logu to stálo vedle sebe: *„uklid po
  nasazeni Gassin"* a o řádek níž *„NOVÉ MĚSTO: Gassin"*. Le Bourg vzniklo **5×**,
  Saint-Bonnet 3×, přes 600 MB navíc.
  **Audit 56 skriptů našel tři opsaná pravidla:** projekce mapy ve třech skriptech
  (jeden si koeficienty tahal **regexem ze zdrojáku** druhého), denní strop YouTube
  napsaný v druhém automatu **znovu číslem** (`DENNI_LIMIT = 2`), a rozhodnutí
  o hotovém městě. Projekce navíc **nebyly shodné** — jedna zaokrouhlovala, druhá ne,
  a rozdíl pod 0,05 px první měření zamaskovalo. Sjednoceno tak, že se **žádnému
  volajícímu nezměnilo chování** (doloženo na čtyřech bodech před i po).
  **Zavedeno:** `projekce_mapy.py` (jediný domov), registr `data/pravidla-registr.json`
  + hlídač `test_bez_kopii.py` s rohatkou (dluh **0**), zapojený do denní revize.
  **Dvakrát mě přitom vlastní hlídač propustil** a přišlo se na to až podvrhem:
  hlídat jméno funkce nestačí (pravidlo se dá opsat jako holé ČÍSLO) a import smí
  omluvit jen obálku funkce, nikdy zakázaný zápis. Nakonec 5 podvrhů chyceno, zdravý
  stav mlčí. Vedlejší nález: **`revize_grafu.py` se vůbec nepřekládal** (česká uvozovka
  ukončila řetězec + `*gen or [...]`) a nikdo o tom nevěděl, protože ho nic nespouštělo
  — revize nově překládá všech 56 skriptů.
  **Mapa deníku: odkazy na videa 15 → 37 míst.** Pečlivá anonymizace jede po jednom
  a čeká na odklik, takže na 73 videí by mapa čekala měsíc; párovač proto bere i
  **původní videa**, která na kanálu leží už teď. Přepracovaná verze má vždy přednost
  a po výměně se odkaz přepíše sám. Soukromá videa se přeskočí (mrtvý odkaz).
  **Nová simulace „Funkce v tabulkách"** (Inf8) — POČET nebere text ani prázdno,
  PRŮMĚR dělí počtem ČÍSEL, prázdná buňka se v porovnání bere jako nula. Test 93 kontrol.
  **Nezávislý kontrolor našel 11 vad a jedna byla vážná a věcná:** mez `KDYŽ` byla na 3,
  takže žák s **čtyřkou** dostal „neprospěl" — ve škole je 4 dostatečná, tedy prospěl.
  Bylo to jediné tvrzení na stránce, které si žák umí okamžitě ověřit. Opraveno i to,
  že výklad učil `=RANK` bez třetího údaje, zatímco simulace hned pod ním tentýž tvar
  označovala za past.
  **Zkratka `WONDERLY`** (přání učitele): jedno slovo = celá věta „načti stav, vezmi
  první úkol z fronty, pracuj samostatně"; noční běh `/loop WONDERLY`. Návod
  `~/.claude/skills/wonderly/START.md`. Při tom se ukázalo, že **fronta úkolů byla
  na dvou místech a rozešla se** — skill vedl „média k Fyzice 6", stavový soubor
  „názornost informatiky". Nově platí dělba: skill říká JAK se pracuje,
  `SAMOSTATNY-REZIM.md` CO je na řadě, zadání `/loop` jen to jedno slovo.
  **Poučení dne:** tentýž vzorec „opsané pravidlo" se objevil ve třech vrstvách naráz —
  v kódu automatů, v textu zadání a v mých vlastních měřidlech. Kdo pravidlo potřebuje,
  ať si ho IMPORTUJE; kdo ho opíše, ať to hlídač shodí.

- **2026-08-02, 20:00 (informatika 7 — hra bludiště; a proč se na okraji nesmí ořezávat)** —
  Nová simulace `BludisteSimulace` u podtématu `hra-bludiste`. Výklad jmenuje **tři chyby,
  „které dělá skoro každý"** — nově jdou všechny tři na přepínačích **způsobit a vidět**:
  krok 30 px přeskočí tenkou zeď 10 px a **postava projede zdí**; obě rady výkladu (zmenšit
  krok NEBO zeď zesílit) opravdu zaberou; návrat schovaný v ⟨opakuj stále⟩ neví, kudy
  postava šla, vrací ji vždycky dolů a **postava uvízne ve zdi**. Test **125 kontrol**,
  testy simulací celkem **659**, názornost informatiky **33 → 32**. Kvíz dostal **3 otázky
  na jádro výkladu** (detekce kolize, kam patří návrat, nabírání barvy kapátkem — dosud se
  na to neptal vůbec) a délková nápověda klesla ze 4/9 na 3/12.
  **Nezávislý kontrolor našel 17 vad, 6 vážných**, a ta nejdražší byla neviditelná:
  **ořez na okraji scény posunul postavu mimo mřížku velkého kroku.** Osy zdí leží schválně
  přesně uprostřed mezi zastávkami kroku 30 (…160, 190…), jinak by postava na zeď šlápla —
  jenže po **jediném stisku ←** se fáze posunula na 48 + 30k, všechny tři zdi padly do
  dosahu a **zdí už nešlo projet vůbec**. Hra přitom dál vypadala, že funguje, jen postava
  „nemohla dál" — žák by se naučil pravý opak výkladu. Okraj scény se proto nově chová jako
  zeď: krok, který by vedl ven, se **neprovede** a fáze zůstane celá; ze stejného důvodu
  vrací každá změna programu postavu na start (jiná délka kroku = jiná mřížka).
  Další vážné: hláška brala čísla i směr z **aktuálních voleb** místo z toho, co se opravdu
  stalo, takže po přepnutí tvrdila „krok 5 px je delší než zeď 40 px" a popisovala pohyb,
  ke kterému nedošlo · týž znak **🏁 znamenal na jedné obrazovce dvě věci** (klobouk
  programu i cíl; paleta má `EVENT_WHENFLAGCLICKED` se **zelenou** vlajkou) · postava
  uvízlá ve zdi se kreslila **červeně přes černou zeď** (kontrast 2,83 : 1, norma je 3 : 1)
  — nově světlá výplň, bílý obrys a ✗, aby to poznal i barvoslepý žák.
  **Šestý vážný nález byl zase v TESTU:** deset podvrhů jím prošlo. Nejzrádnější — názvy
  bloků se kontrolovaly ve *spojeném* textu obou variant programu, takže podvrh „dotýkáš se
  barvy (**modrá**)" v jedné variantě prošel, protože „černá" byla v té druhé. Nově se měří
  každá varianta zvlášť; přibyly kontroly čísel v hláškách proti nastaveným volbám,
  `preventDefault`, `aria-pressed` u všech šesti přepínačů, `aria-label` u všech čtyř šipek
  a poloha cíle proti popisu pro odečítač.
  **Obousměrně doloženo 17 podvrhy** (každý na KOPII ve scratchpadu — pravidlo z minula
  dodrženo, commit šel před ověřováním a do repa se nesahalo): každý podvrh se najde,
  2 až 25 spadlých kontrol, zdravý stav mlčí. Poctivá poznámka k mezi metody: s krokem
  30 px a silnými zdmi se do chodeb netrefíš vůbec (zastávky leží 15 px od osy zdi) —
  není to vada, ale bez vysvětlení by to vypadalo jako zaseknutá simulace, takže to hláška
  po nárazu říká nahlas.
  *Deník:* dokončena práce, kterou nechal automat rozdělanou — rok 2021 dostal odkazy
  na videa (Skanzen Přerov nad Labem, Nová Pec 2, Koloděje) a KRATOCHVÍLE byla vyměněna za
  přeanonymizovanou verzi; všechna čtyři videa ověřena přes `/embed/` i názvem z oEmbedu.
  **Kapitoly k Le Bourg-d'Oisans doběhly, ale nasadit je nejde bez rozhodnutí učitele:**
  log nahrávače doložil, že na YouTube je soubor `_v2.mp4` (4:58), zatímco kapitoly se
  počítaly z verze 6:06 — kapitola „3:14" by padla o minutu jinam. Tři varianty s cenou
  jsou v `KE-SCHVALENI.md`. **Poučení: „která verze je na kanálu" se nepozná podle názvu
  souboru ani podle jeho času — musí to doložit log nahrávače.**

- **2026-08-02 večer (informatika 7 — vlastní bloky s parametry)** — Nová simulace
  `VlastniBlokySimulace`. Program kreslí tři čtverce, ale otáčí se o **80° místo 90°**,
  takže se čáry neuzavřou — chyba je vidět na první pohled, ne jen napsaná. Pointa výkladu
  *„opravuješ na jednom místě"* je tím měřitelná: **tři kopie kódu si vyžádají tři opravy**
  (a mezi nimi zůstávají dva útvary křivé), **vlastní blok jedinou**. Srovnání 3 × 1 zůstává
  na obrazovce i po přepnutí režimu. Parametr: tentýž blok kreslí 50, 80 i 120.
  Test **61 kontrol**, testy simulací celkem **534**, názornost informatiky **34 → 33**.
  **Nezávislý kontrolor našel 2 vážné a 6 drobných vad.** (1) Řádky programu měly
  `display: inline-block`, takže se skládaly **vedle sebe** a „tři kopie pod sebou" se
  rozpadly do vodorovné změti. (2) **Test vůbec nečetl scénu** — podvrh „kresli vždy správný
  úhel" prošel všemi 45 kontrolami, ačkoli hláška tvrdila opak toho, co bylo vidět; test teď
  čte skutečné `points` a `stroke`, a tři podvrhy kontrolora shodí 6, 9 a 1 kontrolu.
  Drobné: česká shoda („zbývající 1 zůstala křivá"), závěrečná věta tvrdila „na jednu se
  zapomene" ve chvíli, kdy už byly všechny tři útvary zelené, kontrola názvů bloků běžela jen
  v jednom ze dvou režimů a vzor měřidla neuměl interpolaci `jdi (${v}) kroků`.
  **Vlastní chyba, a už podruhé tatáž:** opravy podle kontrolora jsem zahodil příkazem
  `git checkout` nad necommitnutou prací. Poprvé se to stalo u měřidla šablon a je to
  zapsané v paměti — a přesto se to opakovalo. Pravidlo pro příště: **po každé dávce oprav
  rovnou commit, teprve pak jakékoli ověřování s podvrhem.**


> Starší záznamy (do 2026-08-02) jsou v `PROGRESS-ARCHIV.md` — pro navázání práce se nečtou.

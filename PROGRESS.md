# PROGRESS.md — technický stav práce

_Aktualizováno 19. 7. 2026. Souběžně čti `CLAUDE.md` (trvalý kontext)._

## ⏩ Jak navázat v nové session
1. Přečti `CLAUDE.md` a tento `PROGRESS.md`.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5
   ```
3. **CELÁ FYZIKA 2. STUPNĚ (6, 7, 8 i 9) JE KOMPLETNÍ** — tagy `fyzika-6-hotova`, `fyzika-7-hotova`, `fyzika-8-hotova`, `fyzika-9-hotova`. Každý ročník má navíc celek **„Shrnutí a opakování"** (pololetní + roční shrnutí s automaticky skládaným souhrnným kvízem a tisknutelným testem).
4. Další možné kroky: doplnit média k Fyzice 6 (infografiky/písně/videa z YouTube automatu), předměty Informatika a Pracovní činnosti, nebo revize hotových stránek. Podklady 6. roč.: `/Users/Shared/Škola/6/` (složky 01–08 + záloha `SmartBooks`).

### 🕹️ Interaktivní infografiky — jak přidat další (kladka…)
Na webu je **14 interaktivních simulací** (canvas/SVG, čistě v prohlížeči, styl viz existující). **Vzor přidání nové:**
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
Zbývá: média k Fyzice 6 (infografiky/písně/videa); Pracovní činnosti — zatím jen celek 3D modelování (Tinkercad+SketchUp, 20. 7.), ostatní témata Pč dle podkladů učitele. Informatika 7–9 KOMPLET (výklad+kvízy+testy+odkazy s QR).

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

- **2026-07-31 noc (dva audity, propojení videí, pečlivá anonymizace)** — Na přání učitele
  proběhly **dva nezávislé audity** (deník a škola) a podle nich dávka oprav. *Škola:*
  přetlak/podtlak v plicích byl u špatné fáze dýchání (výklad i kvíz), kalorimetr hlásil
  součin v joulech jako kJ, rozepnutý vypínač byl překrytý spojitým drátem, 6 duplicitních
  otázek informatiky nahrazeno novými. *Deník:* počítadlo sčítalo i dny doma mezi výjezdy
  (2024 hlásil 336 místo 72), překlad dat neuměl rozsahy (60+ dat zůstávalo česky i v en/fr,
  včetně přelomu roku), paleta měla 6 barev na 8 roků, popisky na společné mapě vedly
  u opakovaných míst vždy na poslední rok, pět popisů pocházelo z rozcestníků (Loket
  popisoval **anatomický loket**). Přidána přístupnost: `initial-scale`, `hreflang`,
  canonical, `lang` na přepínači, kontrast drobných textů 4,0 → 7,0 : 1.
  **Videa z YouTube propojena s místy na mapě** (`videa_k_mistum.py`) — kotvou je rok
  z playlistu a skutečný název z oEmbedu (uložený byl zkrácený). **Nový automat na pečlivou
  anonymizaci** starých videí po jednom se samoopravnou smyčkou (`pecliva_videa.py`,
  LaunchAgent) — další video se nezačne, dokud učitel neodklikne. Na připomínku učitele
  opraveno i to, že přepnutí jazyka zahazovalo zanoření mapy.
  **Dvě poučení, která stála nejvíc času:** (1) automat na popisy si soubor načte na začátku
  dávky a na konci zapíše celý — ruční zápis mezitím beze stopy zmizí; za jednu noc se tak
  ztratilo nejdřív 15 popisů a pak 5 oprav, než dostal `zapis_popisy.py` zámek.
  (2) Kontrola obrazu nesmí stát na samotném měření: citlivá kaskáda hlásila 21 „čitelných
  SPZ" na dobře anonymizovaném videu a u drobných tváří vycházela ostrost po rekompresi
  vyšší než v originále. Nálezy proto potvrzuje pohled na výřez. `zkontroluj.mjs` nově
  hlídá i data cest — a hned odhalil ztracenou opravu popisů.

- **2026-07-30 noc (deník — popis mají všechna místa; dva tiché nálezy)** — Při přebírání
  práce se ukázalo, že v datech cest **chybí 15 popisů, které tam předtím byly**: automat
  skládá `.ts` z `popisy-mist.json`, takže popis zapsaný rovnou do dat webu při dalším běhu
  zmizel. Zachráněny z gitu a zapsány natrvalo (13; zbylé 2 patří ručně psaným rokům, kam
  automat nesahá). Druhý nález: **francouzské překlady se na web nikdy nedostaly** —
  `blok_popisu()` uměl jen cs/en/de, hotových 10 překladů leželo ladem; jazyky jsou nově
  v `JAZYKY_POPISU`. Pak dopsáno **71 popisů z ověřených faktů** a tím má popis
  **všech 156 míst**. Nezávislý kontrolor prošel všech 71 bloků a našel 6 tvrzení bez
  opory ve zdroji (Chanovice „v podhůří Šumavy“ — ve zdroji není; Týn „kousek pod
  soutokem“ místo „východně od soutoku“; UNESCO u Sassnitz přiřazené i křídovému pobřeží,
  ač zdroj mluví jen o bukových pralesech; Diabla Góra „vysoká 157 m“ místo nadmořské
  výšky; Gouda dvě tvrzení navíc; Pleckensteiner Wald „neosídlené“) — vše opraveno před
  nasazením. Sběrač faktů umí nově **ručně určený článek** (`fakta_mist.py --zdroj SLUG
  JAZYK TITUL`, v datech značka `zdroj_rucne`): u velkých měst vznikla fotka na okraji
  a kotva podle GPS zamítala i správný článek, takže Praha, Brno a Gdaňsk zůstávaly bez
  faktů. **Poučení:** kotva ověří jméno a polohu, ale ne to, že článek popisuje MÍSTO —
  Olsztyn dostal fakta z článku o zaniklé správní jednotce („gromada“).

- **2026-07-30 večer (přesnost lokálních modelů — tři nezávislé audity)** — Učitel zadal
  audit cíle „méně tokenů, přesnější lokální modely, které se samy zlepšují". Tři nezávislí
  auditoři našli vážné věci. **(1) Kontrolorem byl model, který propadl u vlastní přejímací
  zkoušky** — `gemma4:26b` si u falešného tvrzení spočítala správný výsledek a přesto ho
  schválila; `graf_local.py` ji proto vyloučil, ale `popisy_mist.py` i `stellplatz_ceny.py`
  ji dál používaly, obojí zapisuje rovnou na web. **(2) Automat na ceny padal měsíc při
  každém buzení** na `Operation not permitted` (systémový python v launchd nesmí na soubory
  na Ploše) — a v rejstříku byl veden jako funkční. **(3) Startovní čtení session stálo
  69 500 tokenů**; přesunem historie do archivů (nic se nemazalo, ověřeno 129 = 10 + 119
  záznamů) kleslo na 29 300. **(4) Kotva u cen měla díry** — „Free WiFi" doložilo cenu
  „Gratuit", „250 reviews since 2015" doložilo „5 €". **(5) Anonymizace se zapisovala před
  měřením**, takže fotka mohla přijít o rozmazání a nález se smazal jako planý poplach.
  Vše opraveno a ověřeno testy s podvrhy. **Nové samokontroly:** `revize_automatu.py`
  (denní LaunchAgent — chyby v logu, systémový python v plistu, mlčící automat),
  `kontrola_obsazeni_roli.py` (běží před každou dávkou; kontrolorem smí být jen model se
  složenou zkouškou), `zamek_modelu.py` (na Macu jen jeden lokální model naráz).
  **Klíčové poučení:** zkouška musí měřit tu práci, kterou model dělá — původní byla
  početní, ale model posuzuje české věty; změřeno 9 modelů na skutečné úloze
  (`test_kontrolora.py`). A ukázalo se, že chyba nebyla v kontrolorovi, ale v **autorovi**:
  qwen3:30b-a3b si k faktům přidával hodnotící dovětky („tvoří hlavní atrakci"), které ve
  zdroji nejsou — zachytává je nově síto v kódu za nula tokenů. Rozhodnutí učitele:
  zbývajících 52 popisů napíše Claude jednorázově (konečná množina; ladit automat vyšlo
  dráž), lokálnímu automatu zůstávají překlady a nová místa. Nový `fakta_mist.py` sbírá
  ověřená fakta do `fakta-mist.json` — u každé věty je vidět, odkud pochází.

- **2026-07-30 odpoledne (deník — celá mapa dřívějších cest, hlídač, francouzština)** —
  Dokončeny body 5 a 6 učitelova zadání. **Na webu jsou roky 2019–2024**; učitel během
  práce doplnil fotky až po letošní cestu, takže přibyl i **rok 2024 (46 míst)** a rok
  2023 vyrostl na 45 míst. `stare_cesty.py --ts vse` zapíše všechny roky naráz a sám
  udržuje rejstřík `roky.ts`; výjezdy se číslují v rámci roku (dřív globálně — rok 2023
  začínal „výjezdem č. 36"). **Ochrana ručně psaných roků:** učitel se ptal, „jestli se
  tam něco nepere" — perlo by se, automat by přepsal ručně psané 2025 a 2026 i s
  galeriemi, stellplatzy a Bertíkovými reporty. Pojistka je dvojitá: seznam
  `RUCNE_PSANE_ROKY` **a** značka v hlavičce (automat přepíše jen soubor, který sám
  napsal), takže na žádný ruční rok se nedá zapomenout. **Popisy míst** vyrábí nový
  `popisy_mist.py` — kotvou je článek na Wikipedii, jehož *jméno i souřadnice* sedí na
  místo, autor qwen3:30b-a3b, nezávislý kontrolor gemma4:26b; hotovo 95 popisů ze 123
  míst (6 nemá zdroj), překlady se dopočítávají. **Hlídač nových fotek**
  (`hlidac_starych_fotek.py` + LaunchAgent `com.omega.stare-fotky-hlidac`, doháněč à 1 h)
  si nových fotek všimne sám a mapu dodělá bez vyzvání; commituje jen `src/data/cesty`,
  aby nesebral rozdělanou práci. **Francouzská verze deníku** (`/cesty/fr/`): celé
  rozhraní, 28 zemí, tvar data „6 juillet 2026" i „1er août 2022", vlajky u přepínače
  jazyků (na úzkém telefonu jen vlajka), 11 popisů 2025/2026 přeloženo ručně.
  Opraveny názvy míst z geokódování („gmina Kętrzyn" → „Kętrzyn").
  **Poučení:** keš jmen potřebuje verzi (jinak v ní zůstal „Brémský Přístav" i po
  opravě); lokální modely dávkovat **po modelech, ne po místech** (střídání qwen↔gemma
  = 6 přehození v RAM na místo, 4 min/místo → po přeskupení kontrola 95 popisů za
  vteřiny); qwen3 potřebuje `/no_think` v promptu; **kontrolor sám nestačí** — propustil
  anglické „přemýšlení" modelu jako popis, proto strojová pojistka před ním; Wikipedie
  vrací 429 s `Retry-After`.
- **2026-07-30 (deník — dřívější dovolené z fotek)** — Učitel nasypal do složky „Dřívější dovolené" 309 souborů a zadal: *„můžeš dělat mapu; jezdily jsme hodně na prodloužené víkendy — víkend jedna cesta z domova na místo a zpět — a vždy prázdniny jedna dlouhá cesta na měsíc a půl."* Vznikl automat `Omega/skripty/stare_cesty.py`: z EXIF (GPS + datum) poskládá **rok → cesty → místa** (pauza > 5 dní = nová cesta, shluk do 15 km = jedno místo, fotky do 25 km od domova se vynechají jako běžný život), jména míst z Nominatimu (kešované), x/y stejnou projekcí jako `trasa_uvod.py`. Výsledek: **288 fotek s GPS, 43 cest v letech 2019–2023** (nejdelší 6. 7. – 16. 8. 2022, 42 dní a 25 míst). Web umí **víc cest v jednom roce**: nové typy `Vyjezd` + `Mesto.vyjezd`, `CestyRok.astro` kreslí každý výjezd zvlášť jako domov → místa → domov (serverově i v klientském překreslování mapy), `popis` je teď volitelný (u starých míst se text doplňuje postupně). Nasazen pilotní **rok 2023** (8 výjezdů, 34 míst — ověřeno: 8 tras, víkendy po 3 bodech, prázdninová cesta 19 bodů; roky 2025/2026 zůstaly na jedné trase, bez chyb v konzoli). Přehled všech 43 cest je v `Cestovatelský deník/KE-SCHVALENI.md` k odkliknutí. ZBÝVÁ: rozcestník roku dělit podle cest (34 pinů na jedné mapě je nepřehledné), doplnit roky 2019–2022, popisy míst, GPS z 9 videí .MOV a 6 fotek bez EXIF.
- **2026-07-29 večer — tři připomínky učitele k deníku.** (1) **Mapa roku začíná doma:**
  data roku mají nový volitelný bod `domov` (jižní Čechy, x 344.9 / y 351.7 — spočteno
  stejnou projekcí jako úvodní mapy videí v `trasa_uvod.py`); na celkové mapě se kreslí
  modrý domeček, trasa z něj vychází a bod se započítá do výřezu (2025 i 2026).
  (2) **Mřížka „Videa z cesty" jen u celkové mapy** — při přiblížení na místo se skryje,
  u karty místa je nově náhled JEHO videa. (3) **Galerie:** kliknutí na náhled fotku
  zvětší přes celou obrazovku (šipky, klávesnice, Esc) místo otevírání nové karty.
  Při té práci se ukázalo, že web 2026 měl jen 8 z 11 míst cesty — **doplněny Frangy,
  Vaulnaveys-le-Haut a Livet-et-Gavet** (trojjazyčné popisy; zatím bez stellplatzů a videí).
  Fotky na web: kontrola anonymizace všech 154 fotek 2026 doběhla s 0 nálezy, nový automat
  `Omega/skripty/vyber_fotky_na_web.py` z podobných záběrů vybírá jeden (čas + podobnost
  popisu, vyhrává nejostřejší) → návrh do `KE-SCHVALENI.md`. Učitel výběr schválil,
  **na webu je 106 fotek** u 6 míst 2026. Přibyl i automat na OPRAVY nálezů anonymizace
  (`oprav_anonymizaci.py`) — z 5 nálezů 1 opraven, 3 uzavřeny jako planý poplach na
  základě MĚŘENÍ (rozdíl od originálu, podobnost tváře s referencemi a její velikost —
  vision model se tu plete, protože rozostřené pozadí mu splývá s anonymizací),
  1 zbyl učiteli. Doplněny údaje ze zážitků: Frangy (přespání u vinaře 10/6/4 €)
  a Chamrousse u Livet-et-Gavet (olympijský sjezd 1968 na Casserousse, stání
  Place des Niverolles), vlaječky v rozcestníku mapy.
- **2026-07-29 večer — automat cen dojel, nový režim „rovnou na web".** Na přání učitele
  („ceny stejně neznám, nasaď kontrolora a zadávej rovnou, ale napiš, že nejsou aktuální")
  má automat 2 pojistky: kotva (doslovné úryvky) + NEZÁVISLÝ kontrolor gemma4:26b (jiná
  rodina než autor qwen). Co projde, zapíše sám do `src/data/cesty/stellplatz-ceny.json`
  + commit + push; web ceny přimíchá při buildu a VŽDY u nich ukazuje trojjazyčné
  upozornění „jen orientační, veřejně dohledané, nemusí být aktuální". Dohledáno 9 míst
  (Karlstadt 2025 + 8× 2026 přes park4night API podle GPS měst; Ornans = areál
  Camping-Car Park) — **všech 9 prošlo kotvou i kontrolorem** (Landshut 10 €/24h,
  Schongau 8 €, Geisingen 14 €, francouzské aire vesměs „Gratuit", Ornans 21,32 €).
  Oba automaty (ceny i kontrola anonymizace) jedou nově jako DOHÁNĚČ: hodinové buzení
  + vlastní hlídání „už jsem dnes/tento měsíc běžel" — **Mac nemusí být vzhůru v konkrétní
  čas**. ČEKÁ NA ZPRACOVÁNÍ: 3 připomínky učitele k deníku (viz SAMOSTATNY-REZIM.md).
- **2026-07-29 — dva nové automaty (park4night potvrzen učitelem).** (1) **Okno „okolí
  obce/PSČ"**: `Omega/skripty/okoli.py` + skill `/okoli` — z názvu obce nebo PSČ vrátí
  zajímavá místa a stání pro obytné auto z OpenStreetMap s GPS a odkazy do mapy; funguje
  i z Telegramu („okolí 34401" → Chodský hrad, kempy, německý stellplatz — otestováno).
  (2) **Automat cen stellplatzů**: `stellplatz_ceny.py` + LaunchAgent měsíčně — stáhne
  stránky navštívených míst z park4night, qwen3:30b-a3b vytěží ceny s kotvou „doslovné
  úryvky + čísla musí být v textu" (parafráze zahazuje), změny jdou do KE-SCHVALENI.md.
  Ostrý test: Karlstadt → 10 €/noc, 0,50 €/kWh, 1 € voda = přesně ceny z účtenky 2025.
  (3) Web: typ Stellplatz rozšířen o cenaNoc/elektrina/voda/gps/rokCen + ikony 🅿️🔌🚰
  na kartách míst; Karlstadt převeden. ČEKÁ: odkazy dalších míst z aplikace učitele.
- **2026-07-29 — zbylých 8 laborek + data návštěv.** Rubrika laboratorních prací je
  kompletní: 12 tisknutelných pracovních listů (nově tloušťka listu papíru F6, graf
  chladnutí F6, rychlost chůze/běhu F7, těžiště kartonu F7, gumička a vztlak F7, míchání
  teplé a studené vody F8, elektromagnet z hřebíku F9, Sluneční soustava na hřišti F9).
  Nezávislý kontrolor: 2 drobné nálezy (popisek tabulky chladnutí + neměřitelná slaná
  voda) opraveny před nasazením; fyzika ověřena výpočty (Bolt 37,6 km/h, planety 1 au=10 m,
  Proxima ≈ 2 700 km v modelu). Od učitele doplněna data Le Thillot 12. 7. a Ornans 18. 7.
  (EN teď ukazuje „12 July 2026") + datové předpony názvů tří videí. Pravidla fotek do
  paměti (jen fotky, jedna z podobných, zatím 2026). Návrh automatu cen stellplatzů
  (park4night + qwen3:30b-a3b, kotva „číslo musí být v textu") a okna „okolí obce" přes
  Telegram: `Omega/dokumenty/NAVRH-stellplatz-a-okoli-2026-07-29.md`.
- **2026-07-29 — audit webu + velká dávka vylepšení (schváleno učitelem).** Dva nezávislí
  kontroloři prošli celý web → `Omega/dokumenty/AUDIT-WEBU-2026-07-29.md`. Nasazeno:
  (1) **deník** — opravy vad (překlad slovních dat a seznamu zemí do EN/DE vč. spojky,
  `zeme: 'Německo, Francie'`, rozestup pinů roků na rozcestníku ověřen výpočtem 18,00,
  klikací piny i bez JS + spojnice, atribuce CC BY-SA na všech mapách, satisfies
  v preklady.ts) a vylepšení map (mapa Vše: barvy pinů podle roku + legenda + chytré
  popisky rozmistiPopisky; tooltips všude; animované kreslení trasy s ohledem na
  prefers-reduced-motion; větší dotykové plochy; statistiky výprav; vlajky; mřížka
  náhledů videí; počítadlo dnů na cestě). (2) **škola** — vyhledávání na každé stránce
  (komponenta Hledani), šipky předchozí/další podtéma, odznaky 🎮✏️🎬🧪 na kartách,
  ukládání nejlepšího výsledku kvízu do localStorage + odznak „co už umím" na kartách,
  tiskové styly, viewport+meta description. (3) **laboratorní práce** — nová rubrika:
  `laborky.ts` + tisknutelný pracovní list `[podtema]/laborka/` (kyvadlo F6, hustota
  kamene F6, momenty na pravítku F7, výkon na schodech F8); kontrolor opravil kyv→kmit
  a zavěšení kyvadla. (4) **automat kontroly anonymizace** fotek deníku (SPZ/sochy/
  reklamy/tváře) — `kontrola_anonymizace.py`, LaunchAgent denně 8:20. Vše ověřeno
  curl na živém webu. ČEKÁ NA UČITELE: data návštěv Le Thillot a Ornans (v datech je
  jen „červenec 2026"), body 6–8 z rozhodovací tabulky, zbylých 8 návrhů laborek.
- **2026-07-29 — dokončení dorovnání kvízů (po E7).** Poslední 3 slabé bloky doplněny:
  kladka +1 (kladkostroj — 4 části lana = 4× menší síla), nakloněná rovina +2 (výpočet
  délky l = G·h:F = 400·3:100 = 12 m; vliv tření), události a vstupy +2 (přijetí zprávy
  jako událost; postava bez scénáře). Nezávislý kontrolor prověřil všech 12 otázek
  (5 nových + 7 z kola E7): 3 chyby opraveny — únik odpovědi přes vysvětlení starší
  otázky (nakloněná rovina: čísla změněna; události: z vysvětlení vypuštěno „přijetí
  zprávy"), duplicitní otázka odpočtu nahrazena podmínkou „dotýká se barvy?" (kulička
  a čára). Navíc „zelenou vlajku"→„vlaječku" dle scratch-l10n. Celkem 358 otázek.
  HERMES-POKRACUJ.md: nic rozdělaného.
- **2026-07-29 — experiment subagentů, kola E3–E7: dorovnání slabých kvízů.** Pět dávek
  4× worker-kviz paralelně: +78 otázek po kontrolách, deduplikace 2 bloků (−6), opravy
  dle kontrolora (názvy bloků Scratche dle scratch-l10n, úniky odpovědí, protiřečení).
  Zbývají 3 bloky → `HERMES-POKRACUJ.md` (události a vstupy, nakloněná rovina, kladka);
  kontrola otázek z E7 dodatečně. SMAZÁNO vložené video kanálu Petr Němec (rozhodnutí
  učitele — případné odkazy až po dohodě s majitelem; ověřeno oEmbedem všech 41 videí,
  jiná jeho videa na webu nejsou). Duplicity kvízů síly ponechány (rozhodnutí učitele).
- **2026-07-29 — experiment subagentů, kola E1+E2 (F7 jednoduché stroje).** E1: nové
  podtéma „Nakloněná rovina" (výklad, simulace F=G·h/l, 8 otázek kvízu, video) — kompletní
  a nasazené. E2: simulace „Účinky síly na těleso" (posuvný/otáčivý/deformační účinek,
  pružná × trvalá deformace) k existujícímu podtématu `pusobeni-teles-a-deformace`.
  Nezávislý kontrolor v E2 chytil závažný nález (levitace + věčná rotace) → pohybový
  model přepracován (překlopení přes roh, klouzání, těleso na podlaze). Metriky:
  `METRIKY-KOL.md` řádky E1/E2; protokol `~/Desktop/Omega/EXPERIMENT-SUBAGENTI.md`.
  ČEKÁ NA UČITELE: duplicity otázek mezi kvízy `pusobeni-teles-a-deformace` a
  `sily-kolem-nas/sila`.

_Starší záznamy (od začátku projektu) jsou v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — ten se automaticky nečte._

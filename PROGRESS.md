# PROGRESS.md — technický stav práce

_Aktualizováno 31. 7. 2026. Souběžně čti `CLAUDE.md` (trvalý kontext)._

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

- **2026-07-31 noc (dvě připomínky učitele k deníku + meteorologie F7)** — *Deník:*
  učitel hlásil dvě věci a obě měly jinou příčinu. **(1) Ve videu s více městy chyběly
  názvy míst.** VideoAutomat sléval média hostitele i „přibalených" míst do JEDNÉ pracovní
  složky, takže sestavovací skript viděl jediné město a vykreslil jen jeden titulek —
  název hostitele. Ramonchamp, Ornans, Le Lavandou, Riez ani Saint-Tropez tak ve videu
  nebyly pojmenované vůbec. Každé místo má nově vlastní složku a tím i svůj titulek;
  ověřeno obousměrně (6 kontrol, podvrh se slitou složkou musí dát jediný titulek).
  **(2) Mapa nedávala odkazy na videa.** Na kanálu bylo **9 videí roku 2026, ale web znal
  jen 5** — u Frangy, Vaulnaveys-le-Haut a Livet-et-Gavet odkaz chyběl. Příčina je
  systémová: roky 2025 a 2026 píše člověk, takže se jich `stare_cesty.py` ani
  `videa_k_mistum.py` nedotknou a nahrávač na YouTube o webu neví — nové video čekalo,
  až si ho někdo všimne. Nový `videa_na_web.py` odkazy doplní (jen PŘIDÁVÁ, ruční data
  nikdy nepřepisuje) a volá ho hodinový hlídač, který změnu i nasadí. Umí i místa
  **přibalená do cizího videa**, která se podle názvu videa nespárují nikdy.
  **Poučení:** oEmbed vrací 200 jen u VEŘEJNÝCH videí — u nezařazeného vrátí 401,
  ačkoli takové video jde přehrát i vložit. Kdyby se dostupnost posuzovala podle
  oEmbedu, pět správných videí 2026 by se na web nedostalo; rozhoduje proto až `/embed/`.
  *Škola:* podtéma **meteorologie F7** — délková nápověda **19 z 21 → 4 z 21**
  (největší rozdíl 4 znaky). Výklad doplněn o povětrnostní mapu (izobary, značky V a N,
  hustota izobar = síla větru), přepočet na hladinu moře, přístroje a trend tlaku —
  na sedm z toho se kvíz ptal, aniž to na stránce bylo vyloženo. Nezávislý kontrolor
  běžel dvakrát a našel 22 + 9 vad: „při poklesu pod 1 000 hPa hrozí vichřice" je
  nesmysl (běžná hodnota zataženého dne; Kyrill měl 962 hPa), „mlha a mrholení" je
  u tlakové výše v zimě TYPICKÉ, takže to nebyl chybný distraktor, a anemometr má
  tři misky, ne čtyři. Druhé kolo odhalilo hlavně **úniky, které zanesly opravy
  z prvního kola** — vysvětlení u vlhkoměru doslova odpovídalo na otázku o anemometru.

- **2026-07-31 večer II (převzetí práce po lokálním modelu, audit, kvízy)** — Učitel zadal
  dvě věci: *„kde to lokálním modelům vysloveně nejde, zkus to převzít ty"* a *„udělej
  audit, jestli neděláme pořád stejné chyby, které se opraví a zase to jede špatně."*
  *Audit (dva nezávislí auditoři):* opakuje se jediný vzorec — **„automat ohlásí úspěch,
  ale nic nevyrobil"**, doloženo **7×**. Z rejstříku pravidel běží 56 v kódu, ale **44 je
  jen text** — a právě ta textová se porušují opakovaně. Nejtvrdší nález: **překladová
  smyčka běžela 11 hodin a pokaždé vypsala „0 z 14 / 0 z 22 / 0 z 13"**; přitom držela
  sdílený zámek (23 h blokovala ceny stellplatzů) a v paměti 44,5 GB.
  *Převzetí práce:* těch **49 vět přeložil člověk → 156/156 míst má popis v cs, en, de i fr.**
  Pojistka: `POKUSU_NA_PREKLAD = 3` (pravidlo učitele „třikrát a dost" platí i pro automaty).
  *Video KRATOCHVÍLE — konečně opravdu přepracované.* Kromě smyčky (viz předchozí záznam)
  se ukázala druhá, hlubší příčina: **proces zabíjel systém signálem 9**. Anonymizace
  101s Full HD videa vyšplhala na 19–32 GB. Tři pokusy: sdílený zámek modelu (správný,
  nestačil) → uvolnění modelu z paměti (44 GB volných, přesto zabito) → **krájení videa
  na 30s kousky** (`DELKA_KOUSKU_S`, složky nesou délku v názvu, nic se nemaže). Teprve
  to prošlo: 4 kousky po ~5 min, paměť 6 GB místo 32. **Doloženo otiskem** `0705ceaf…`
  proti `3781f448…` — poprvé za celý den je soubor skutečně jiný. Filtr falešných poplachů
  uchránil **23 míst** před zbytečným rozmazáním.
  *Kvízy:* dorovnáno **17 bloků, uhodnutelnost 77 % → 60 %**. Přitom se ukázalo, že
  **vlastní měřidlo nadhodnocovalo**: počítalo i remízy, takže otázka „značka proudu:
  I / U / R" (všechny 1 znak) se vykazovala jako uhodnutelná — takových je 103. Skutečný
  stav nebyl 76 %, ale 65 %. V **devíti blocích** se navíc našly **duplicitní páry otázek**
  (3–4 z 10; bloky vznikly slepením dvou dávek) — nahrazeny novými. Nově **rohatka**:
  zhoršení kvality shodí build, zlepšení laťku samo utáhne.
  *Věcná chyba:* výklad i kvíz fyziky 9 tvrdily, že dálková vedení jsou **měděná**;
  ve skutečnosti jsou to hliníková lana s ocelovým jádrem (měď je 3× těžší a prohnula by
  stožáry). Opraveno i s vysvětlením proč.
  **Poučení dne:** hláška automatu není důkaz — kotvou je otisk souboru. A nadhodnocené
  měřidlo je stejně škodlivé jako podhodnocené: tiše posílá práci tam, kde vada není.

- **2026-07-31 večer (informatika 8 — LED displej; a proč deník vracel totéž video)** —
  *Škola:* nová simulace `LedDisplejSimulace` u podtématu `oziveni-a-led-displej`.
  Displej 5×5 na klikání, dva obrázky a program, který je střídá; pointy jsou dvě —
  ze **dvou stejných** obrázků animace nevznikne (program běží, displej stojí) a tentýž
  program v bloku **„po spuštění"** jednou doběhne a zůstane stát na druhém obrázku.
  **Nezávislý kontrolor našel 12 vad, 5 vážných.** Nejhorší byla moje: displej po
  zastavení skočil na obrázek, do kterého se KRESLÍ (6 → 16 svítících LED), tedy se
  obraz změnil přesně proti větě, kterou si žák právě přečetl; zastavení proto nově
  přepne kreslení na ten obrázek, který svítil. Dál: „po spuštění" po doběhnutí zůstávalo
  formálně „běžící" a tlačítko nabízelo zastavit skončený program; kopie obrázku nešla
  vzít zpět (přibylo „↩ vrátit zpět"); zvýrazněné byly dva řádky programu naráz; odsazení
  bloku CSS sbalilo. **Kvíz přepsán celý** — měl **4 duplicitní páry z 10 otázek**
  a správná odpověď byla nejdelší u 9 z 10 (nově 5 z 10, největší rozdíl 7 znaků).
  Výklad doplněn o `pauza 400 ms` a rozdíl obou bloků: kvíz se na to ptal, ale na stránce
  to vyloženo nebylo. Test `testy/simulace/led-displej.mjs` má **47 kontrol** a je ověřen
  obousměrně (podvrh se najde, zdravý stav mlčí).
  **Dvě poučení:** (1) kontrolor našel v mém testu tvrzení psané jako `a !== b || true`,
  které nemohlo nikdy selhat — a při přepisu jsem si tutéž tautologii omylem napsal
  podruhé; `|| true` v testech se vyplatí grepovat. (2) Přesné znění českého překladu
  MakeCode se mezi zdroji liší („po spuštění" × „při startu"), takže zdrojem pravdy je
  **názvosloví téže stránky** — jinak si výklad, kvíz a simulace protiřečí.
  *Deník:* učitel hlásil, že po včerejších opravách vypadá video 2021 stejně — pořád
  rozmazaná střecha, lavička, terasa i manželka. **Anonymizace za to nemohla: smyčka mu
  vracela nezměněný soubor.** `zamitnuto()` vynuluje nálezy, jenže kola > 1 vybírají
  kousky k přepracování **podle nálezů** → „přepracovávám **0 z 1** kousků" → kontrolor
  znovu odkýval verzi z 5:28 ráno, vyrobenou ještě před opravou v 16:25. Opraveno:
  ruční zamítnutí vrací smyčku na kolo 0 (celé video, výchozí práh — opravoval se kód,
  ne citlivost; přitvrzování prahu by tu bylo proti smyslu připomínky, protože rozmazává
  víc), a prázdný seznam kousků se už nikdy nebere jako „není co dělat".
  **Poučení: hláška automatu není důkaz** — kotvou je otisk souboru před během a po něm.

- **2026-07-31 odpoledne/večer (deník — anonymizace videí a duplicitní videa)** — Učitel
  hlásil tři věci a všechny měly jinou příčinu. **(1) Duplicitní videa k revizi:** místo se
  uzavíralo už 30 minut po posledním souboru, takže vznikla verze bez toho, co učitel dodal
  druhý den (Le Bourg v1 v 0:13, v2 v 1:16) → nově se čeká **7 dní od posledního média**,
  stejně jako čekárna sdíleného alba, a hostitel čeká i na svá přibalená místa. **(2) Videa
  vyrobená znovu, ačkoli už jsou na YouTube:** kontrola „hotovo" vyžadovala existenci
  výstupu na zapsané cestě — jenže učitel schválené video PŘESOUVÁ do `nasazeno/`, takže
  cesta zmizela a automat město považoval za nové (tak vznikl druhý Frangy, Geisingen
  i Schongau). Doloženo výpočtem: otisky médií seděly, média se nezměnila. **(3) Dvě složky
  pro jedno město:** export z Fotek dává do názvu neviditelné znaky U+2068/U+2069, takže
  „⁨Geisingen⁩, 8.7. 2026" vypadalo jako jiné město než `Geisingen_DE` (a bylo jeho
  podmnožinou — 25 z 27 souborů). Ruční vklad dostal vlastní hodinový automat; dosud se
  pouštěl ručně a dvakrát se na něj zapomnělo (naposledy tam leželo 10 nezpracovaných videí
  Le Lavandou, která nejsou v žádném videu).
  **Anonymizace starých videí — tři připomínky učitele k videu z 2021.** Rozmazávalo
  střechu a plot jako SPZ a hlavu NAMALOVANOU na zdi: filtr falešných poplachů v projektu
  byl, ale volal se **jen u fotek**. Nově se detekce slučují do STOP a vision se ptá jednou
  za stopu (30 snímků = 1 dotaz) — na 20 s videa to zahodilo **28 chybných rozmazání**
  a mezi nimi nebyl ani jeden skutečný člověk. Rozmazávalo taky manželku: reference byly
  jen z července 2026 a v roce 2021 vycházela 0,32 proti prahu 0,45. Po doplnění referencí
  vyšla 0,502, ale jen v jednom snímku z pěti — proto se **známost rozhoduje za CELOU
  stopu** (pojistka: kromě shody nad prahem musí být dost vysoko i medián, aby jeden výkyv
  neodkryl cizího člověka). Vznikl `reference_tvare_z_videi.py`, který tváře vytáhne
  ze starých videí **po letech a řetězí je od nejnovějšího roku zpět**; referencí je nově
  56 a 62 místo 13 a 31.
  **Tři poučení, která stála nejvíc:** (a) kontrola hlídala jen MÁLO rozmazání, nikdy
  ZBYTEČNÉ — proto protokol hlásil „0 nálezů", zatímco učitel při přehrání viděl tři chyby;
  (b) načítání referencí nečetlo podsložky, takže fotky, které učitel dal do `Starší/`,
  by tiše ležely ladem; (c) při druhém běhu vyšla shoda **1,015** — výřezy se poznaly samy
  se sebou, protože už byly mezi referencemi; měřidlo, které se tváří sebejistě, je
  nebezpečnější než žádné. Vlastní chyba k zapamatování: držet celý snímek pro každou stopu
  vyčerpalo paměť a systém proces zabil (kód 137) — do RAM patří jen výřez.

- **2026-07-31 večer (informatika 7 — proměnné)** — Druhá simulace informatiky v tomto
  dni: `PromenneSimulace` u podtématu `promenne`. Krabička `skóre` s hodnotou, vedle ní
  okénko na scéně přesně jak ho kreslí Scratch, a program „seber tři jablka" procházený
  krok za krokem s výpisem, co se stalo (*přepsáno: 3 → 0*, *přičteno +1: 2 → 3*).
  **Pointa je chyba, na které děti nejvíc padají:** program jde přepnout na verzi BEZ
  bloku `nastav skóre na 0`. Napoprvé vyjde taky 3 (krabička byla prázdná), podruhé 6,
  potřetí 9 — tím je vidět, proč hra po restartu „začíná s cizím skóre". Čísla zůstávají
  celá. Test `testy/simulace/promenne.mjs`: **26 kontrol** přes `node:vm` nad skutečným
  skriptem komponenty. Web má nově **73 zapojených interakcí a 74 komponent simulací**.
  Past potvrzena znovu: `curl` na živou stránku vrátil starou verzi z mezipaměti
  Cloudflare a slova z výkladu („krabička", „nastav skóre na 0") to zamaskovala —
  ověřovat je potřeba na řetězci, který je JEN v simulaci (`prom-svg`).

- **2026-07-31 odpoledne (informatika 7 — souřadnice scény Scratche)** — Druhá simulace
  informatiky: `SouradniceSimulace` u podtématu `souradnice-a-kresleni`. Scéna −240…240 ×
  −180…180, žák klikne, kam má kočka skočit, a nahoře se složí blok, který se **opravdu
  provedl**; posun po 10 tlačítky i šipkami, pero kreslící za postavou, cíle k trefení
  a program čtverce procházený krok za krokem (žádná animace — stav po *n* krocích je čistá
  funkce, takže jde celý ověřit výpočtem). Pointa je **záporné y = DOLŮ**, což děti pletou,
  protože z tabulek počítají řádky shora. Bez názornosti je informatika 7 nově 14 z 18.
  **Nezávislý kontrolor našel 12 vad, dvě vážné** — a obě byly o tom, že simulace mluví jinak
  než zbytek stránky: (1) používala doslovný překlad **„pero dolů"**, jenže české bloky
  Scratche 3 se jmenují **„pero zapni" / „pero vypni" / „smaž"** a přesně tak se na ně ptá
  kvíz o dva odstavce níž — žák by blok v paletě marně hledal; (2) přepínač pera byl psaný
  jako název bloku, ale choval se jako popis akce, takže **když pero kreslilo, stálo na
  tlačítku „pero nahoru"** — přesně opačná představa, a skutečný stav prozrazoval jen odstín
  pozadí. Dál opraveno: modrá pilulka ukazovala vždy „skoč na…", i po stisku „změň x o 10";
  ruční zásah nechával v seznamu příkazů svítit „nyní" u kroku, který neběžel; kliknout šlo
  i mimo scénu a ořez na kraji byl tichý; mřížka po 60 nepadala na krok 10 ani na stranu
  čtverce 100 (nově po 50 + čísla na osách); „dílky" místo „bodů"; (0, 0) se popisovalo jako
  „přímo na ose" místo středu scény. **Výklad doplněn o kreslení otáčením** (`opakuj 4×
  (dopředu 100 kroků, otoč se o 90°)`) a pravidlo **360° : počet stran** — dvě otázky kvízu
  to zkoušely, ale na stránce to vyloženo nebylo. Délková nápověda v tom bloku srovnána
  ze 7 z 10 na 3 skutečné (rozdíl < 10 znaků). Test `testy/simulace/souradnice.mjs` má
  **51 kontrol** přes `node:vm` nad skutečným skriptem komponenty — mimo jiné že kladné y je
  na obrazovce nahoře, měřítko obou os je stejné (čtverec vyjde jako čtverec), čtverec se
  uzavře, souřadnice zůstávají celá čísla, klik mimo scénu nic neudělá a program se
  nepřetvařuje, že běží. Nasazení ověřeno `curl` s časovým razítkem.
  **Poučení:** u simulace k cizímu programu je zdrojem pravdy jeho **český překlad**
  (scratch-l10n), ne doslovný převod anglického názvu — jinak si stránka protiřečí sama
  se sebou. A popisek přepínače má pojmenovávat AKCI, stav patří slovy do stavového řádku.

- **2026-07-31 odpoledne (větší změna: kontroly čtou data + start informatiky)** —
  Na zadání učitele provedena „ta jedna větší změna", kterou doporučil audit.
  Nový modul `testy/data.mjs` přeloží `kvizy.ts` a `temata.ts` esbuildem a **naimportuje
  je jako skutečné objekty**; brána `zkontroluj.mjs` i měření `testy/nazornost.mjs` nad
  tím běží. Rozdíl: brána nově vidí **2436 otázek ve 164 blocích** místo dřívějších 2084
  a kontrola „ke každé otázce patří tři odpovědi" konečně běží na všech (14 bloků shrnutí
  se skládá programově, takže je žádný vzor nad textem neviděl). Brána se pouští při
  každém `npm run build` (`prebuild`) — dosud jen z dobré vůle. Přibyla **kontrola 6c**:
  každé podtéma s kvízem musí být zastoupené v ročním opakování svého ročníku — přesně
  ta chyba, kvůli které se 144 otázek VEX IQ a her ve Scratchi nikdy neobjevilo v opakování.
  Vše ověřeno **obousměrně**: podvržená otázka se dvěma odpověďmi se najde, celek vypadlý
  ze souhrnu se najde (6 podtémat), zdravý stav nehlásí nic.
  **Začala informatika** — podle auditu největší díra na webu: 47 podtémat, 5 simulací
  a ani jedno podtéma s obrázkem či videem. První simulace `TabulkaVzorceSimulace`
  u podtématu `adresy-bunek-a-vzorce`: úloha přímo z výkladu (sloupec cen v € a kurz
  v B1), žák kliká na buňky a vidí jejich adresu, přepíná relativní × absolutní odkaz
  a kopíruje vzorec dolů. S `$B$1` vyjde 100/300/500/1000 Kč, s relativním `B1` se odkaz
  posune na předchozí VÝSLEDEK a čísla se lavinovitě rozjedou (100 → 1200 → 24 000 →
  960 000) — chyba je vidět na první pohled a všechna čísla zůstávají celá.
  Na přání učitele dostaly **papírky u elektrování tři fáze** (leží → zvedají se
  a napřimují → na určitou vzdálenost odskočí; po vybití spadnou zpět) a **paralelní
  zapojení kuličky proudu, které se v uzlu jen rozdělí** (stejné odpory → ob jednu;
  20 Ω × 60 Ω → tři do slabšího odporu a jedna do většího).
  **Poučení:** falešný poplach z vlastního měřidla je horší než chybějící kontrola —
  tiše určuje, na čem se pracuje. A `curl` na živý web může vrátit starou verzi
  z mezipaměti Cloudflare; k adrese proto přidávat časové razítko.

- **2026-07-31 poledne (audit strategie — měřidla lhala, ne architektura)** — Na zadání
  učitele („někdy příliš záplat nedá dobrý výsledek a je třeba jedna větší změna") proběhly
  **dva nezávislé audity s různými otázkami**. Závěr: architektura webu je v pořádku
  (výkon 72 kB HTML a 7 kB CSS po gzipu; univerzální šablona simulací by se nevyplatila,
  protože 74 % zdroje je scéna a fyzika), **ale všechny tři kontrolní skripty četly
  TypeScript regulárními výrazy místo dat a tiše lhaly**. `nazornost.mjs` hledal
  `druh: 'obrazek'`, který v datech není ani jednou (správně `'infografika'`), takže
  infografiky nikdy nepočítal; `zkontroluj.mjs` hlásí 2084 otázek, ve skutečnosti jich je
  **2426**. Odtud plyne jediná skutečně velká změna, která zbývá: **kontroly mají číst DATA
  přes esbuild import, ne text souboru.** Hned se opravilo: brána běží při každém buildu
  (dosud jen z dobré vůle), **roční opakování nově pokrývá všechna podtémata** (souhrnný
  kvíz bral otázky po kolech do stropu — u fyziky 8 bylo 35 podtémat a strop 30, takže
  vypadával celý celek zvuk; a v seznamu celků informatiky chyběly `hry-ve-scratchi`
  a `vex-iq`, takže **144 otázek z předchozí session se do opakování nedostalo vůbec**),
  a **tištěný test už nejde složit hádáním** — strategie „vyber nejdelší odpověď" měla
  úspěšnost 72 %, tedy známku 2 bez znalosti látky; test teď losuje přednostně z otázek
  bez délkové nápovědy (5,4 → 3,8 hádatelných ze 7). Data to neopravuje: ve 148 ze 164
  bloků není ani 7 čistých otázek. **Auditory nelze poslouchat slepě** — ze sedmi návrhů
  na recyklaci simulací byly tři špatné (`tuhnuti` ← ohřev a `kondenzace` ← vypařování by
  ukazovaly opačný směr děje, `vykon` ← práce výkon vůbec nepokrývá). Zbylé čtyři nasazeny
  jedním řádkem místo ~200: mezer názornosti ve fyzice 8 je **13 místo 22**.
  Na přání učitele dostaly **papírky u elektrování tři fáze** (leží → zvedají se
  a napřimují → na určitou vzdálenost odskočí a přilepí se; po vybití spadnou zpět)
  a **paralelní zapojení kuličky proudu, které se v uzlu jen rozdělí** — při stejných
  odporech ob jednu, při 20 Ω × 60 Ω tři do slabšího odporu a jedna do většího.
  Past: podíl 0,6/0,8 vyjde v plovoucí čárce 0,74999…, takže se z 24 kuliček jedna ztrácela.

- **2026-07-31 dopoledne (fyzika 8 — začátek názornosti, 5 podtémat z 22)** — Učitel zadal:
  *„Média k fyzice 8 (22 podtémat bez obrázku/videa), stránky jsou textové, chybí názornost."*
  Číslo **ověřeno měřením**: fyzika 8 má 37 podtémat a 22 z nich nemá ani obrázek, ani video,
  ani simulaci; příčina je, že `public/materialy/fyzika/` obsahuje **jen 6. a 7. ročník** —
  pro osmičku a devítku tam nikdy nic nevzniklo. Protože fotky a natočená videa dodává učitel,
  řeší se názornost tím, co jde vyrobit jako kód: **simulacemi**. Začalo se elektřinou
  (12 z těch 22 podtémat, nejabstraktnější učivo). Nasazeny **tři nové simulace pokrývající
  5 podtémat**: měřicí přístroje (ampérmetr do série, voltmetr paralelně **i oba chybné
  způsoby**), odpor vodiče (R = ρ·l/S s vlivem délky, průřezu, materiálu i teploty)
  a rezistor s proměnným odporem (týž jezdec jednou jako reostat, podruhé jako potenciometr).
  **Nezávislý kontrolor našel u první simulace 10 vad a dvě z nich byly vážné.** (1) Animace
  protiřečila vlastnímu textu: u zkratu text tvrdil „proud žárovku obejde", ale tečky dál
  obíhaly skrz žárovku. (2) V obvodu byla jediná součástka, takže napětí na žárovce se rovnalo
  napětí zdroje — **správné i chybné měření voltmetrem ukazovalo stejných 12 V** a celý smysl
  úlohy padl; opraveno na dvě součástky v sérii (6 V z 12 V). (3) Simulace používala Ohmův
  zákon, který se probírá až o dvě podtémata dál. Kontrolor se ale neposlouchá slepě: navrhoval
  zvýšit zkratový proud na 8× kvůli dramatičnosti, jenže při přemostění žárovky se proud přesně
  zdvojnásobí — ponecháno pravdivé 2 A a skutečné nebezpečí popsáno slovy.
  **Ověřování bez prohlížeče:** náhledový server blokovala jiná session, proto se simulace
  ověřují skriptem, který spustí **skutečný `<script>` komponenty** v Node (`node:vm`)
  s náhradním DOM a proměří spojitost pohybu po 16 ms i všechny kombinace ovládání
  (max skok 4,5 px z limitu 20; při zkratu 0 teček uvnitř žárovky; potenciometr dává celé
  volty ve všech 11 polohách). Nasazení ověřeno `curl` na všech 5 stránkách.
  **Druhé kolo kontroly** (simulace odporu a reostatu) přineslo **15 nálezů, 8 vážných** —
  a tentokrát prošly i mé vlastní testy, protože testovaly proti špatnému předpokladu.
  Nejzávažnější: **potenciometr počítal dělič naprázdno, ale na schématu na něm visela
  žárovka 10 Ω** → zobrazená napětí byla až dvojnásobná proti skutečnosti (5 V místo 2,5 V).
  Opraveno tím, že na výstupu je nově **voltmetr** — což je zároveň to, jak se potenciometr
  v praxi používá; dělič je tím počítán správně a čísla zůstala celá. Dál: schéma reostatu
  bylo nakreslené jako **rozpojený obvod** (chyběl vodič od spotřebiče ke kolejnici);
  **vypsaný vzorec nesouhlasil s vypsaným výsledkem**, jakmile se zapnul ohřev („0,5 · 4 / 1"
  a pod tím „2,04 Ω"); **jednotky ρ si odporovaly s výkladem na téže stránce** (Ω·m ×
  Ω·mm²/m — žák dosazující podle výkladu by byl 10⁶× mimo, proto do výkladu přibyla
  praktická jednotka i převod); simulace **předbíhala učivo** na dřívějším podtématu (vznikla
  zjednodušená verze bez ρ a bez vzorce); „rozžhavený drát" byl u hliníku nefyzikální
  (taje při 660 °C); zahřátý konstantan přestal dávat celá čísla; a rychlost elektronů byla
  oříznutá na mez, takže rozdíl mezi 2 Ω a 10 Ω nebyl vůbec vidět — přitom „větší odpor =
  menší proud" je celé sdělení té simulace. Vše opraveno, nasazeno a ověřeno na živém webu.
  **Poučení:** jas žárovky se řídí VÝKONEM (I²·R), ne proudem (pokles proudu na pětinu = 4 %
  jasu, ne 20 %); a když model něco zanedbává, schéma to zanedbání musí ospravedlnit.
  Testy simulací jsou nově v repu (`testy/`) i s návodem a rozšířené o všechny tyto nálezy.
  **Past do příště:** blok `elektrina` má v `temata.ts` o tabulátor jiné odsazení, takže
  naivní regex napočítá 22 podtémat místo 37.

- **2026-07-31 ráno (škola — díry v kvízech zalepené, chyba v kontrolní bráně)** —
  Samostatná práce podle priorit. **12 podtémat bez kvízu dostalo kvíz** (144 otázek):
  Pracovní činnosti měly do teď kvízů nula — Tinkercad (18) a SketchUp (16); VEX IQ
  4 podtémata 8. a 9. ročníku (46); hry ve Scratchi 6 podtémat (64). Zbylých 11 podtémat
  „bez kvízu" jsou shrnutí, kterým se kvíz skládá sám — díra to nebyla.
  **Nález v kontrolní bráně:** `zkontroluj.mjs` počítal otázky vzorem `^\s*text:`, takže
  **jednořádkové otázky vůbec nepočítal** — a jeho kontrola „ke každé otázce patří
  odpovědi" na většině otázek neplatila. Po opravě je vidět skutečný stav: web má
  **2086 kvízových otázek**, ne 358, jak se roky uvádělo. Oprava ověřena obousměrně
  (podvrh bez odpovědí se najde, definice typu se nepočítá).
  **Nezávislý kontrolor běžel dvakrát a podruhé se to vyplatilo:** napoprvé potvrdil
  fakta i pořadí odpovědí, ale našel, že **správná odpověď byla nejdelší u 73 % otázek**
  — daly se uhodnout bez znalosti látky (míchání pořadí to neřeší). Po vyrovnání na 37 %
  a odstranění úniků mezi otázkami kontrolor v druhém kole odhalil, že **opravy samy
  zanesly dva nové úniky** (vysvětlení prozrazovalo sousední otázku). Opraveno.
  Z kvízu vypuštěny dvě otázky opřené o tvrzení, která závisí na verzi SketchUpu
  (oddělovač rozměrů `100;50`, ukládání jen přes Save) — k ověření učitelem, viz
  SAMOSTATNY-REZIM.md.
  **Měření odhalilo, že tatáž vada je po celém webu** (65 % otázek) — kontrola je proto
  nově v bráně, neblokuje build a jmenuje 5 nejhorších bloků k postupnému dorovnání.
  Dva nejhorší (`skupenske-zmeny-vody-v-prirode`, `posilani-zprav` — obojí 100 %) hned
  srovnány. Při tom vyšla najevo **past: vysvětlení u otázky se ukáže JEN při špatné
  odpovědi**, takže podmínky učiva („pod rosným bodem") patří do odpovědi, ne do
  vysvětlení. Kontrolor u toho našel dvě starší vady: definice kyselých dešťů
  neodpovídala na položenou otázku a otázka na tmavý mrak byla kruhová (opakovala
  zadání místo příčiny). Výklad `posilani-zprav` doplněn o vlastní zprávy a rozdíl
  „vyšli zprávu" × „vyšli zprávu a čekej" — tři otázky zkoušely učivo, které na
  stránce nebylo.

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

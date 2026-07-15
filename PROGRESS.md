# PROGRESS.md — technický stav práce

_Aktualizováno 14. 7. 2026. Souběžně čti `CLAUDE.md` (trvalý kontext)._

## ⏩ Jak navázat v nové session
1. Přečti `CLAUDE.md` a tento `PROGRESS.md`.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5
   ```
3. **CELÁ FYZIKA 2. STUPNĚ (6, 7, 8 i 9) JE KOMPLETNÍ** — tagy `fyzika-6-hotova`, `fyzika-7-hotova`, `fyzika-8-hotova`, `fyzika-9-hotova`. Každý ročník má navíc celek **„Shrnutí a opakování"** (pololetní + roční shrnutí s automaticky skládaným souhrnným kvízem a tisknutelným testem).
4. Další možné kroky: doplnit média k Fyzice 6 (infografiky/písně/videa z YouTube automatu), předměty Informatika a Pracovní činnosti, nebo revize hotových stránek. Podklady 6. roč.: `/Users/Shared/Škola/6/` (složky 01–08 + záloha `SmartBooks`).

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
Zbývá: média k Fyzice 6 (infografiky/písně/videa), předměty Informatika a Pracovní činnosti (zatím prázdné dlaždice).

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
- **2026-07-15 (2)** — **Deník: přidán rok 2025 s Karlstadtem a Bertíkovým reportem.** Zdroj: `Škola/6/07 Opakování rok/Bertíkův čmuchací.docx` (vznik 23. 7. 2025 dle metadat → zařazeno pod rok 2025). Nová volitelná položka `report` u města (typy.ts) + rozbalovací sekce „🐾 Bertíkův čmuchací report" v CestyRok.astro (odstavce, přeložený titulek cs/en/de v TEXTY). Karlstadt: pin dopočítán z okolních měst (x 307,7; y 353,9), stellplatz Karlburger Str. 16 s cenami, popis cs/en/de. Text reportu je podklad k videu s fotkami, které už je na YouTube — **odkaz na video dodá učitel** (pak doplnit do `videa` + `videoId` v `2025.ts`). Build OK (285 stránek), nasazeno, ověřeno cs/en/de.
- **2026-07-15 (noční samostatná práce)** — Zpracovány zbylé podklady učitele ze `Škola/6`: (1) **Nová stránka „20 jednoduchých pokusů"** v celku Shrnutí 6. ročníku (z docx v `07 Opakování rok`). (2) **Wordwall odkazy učitele** (10 cvičení z `Test pololetí kvíz.docx`) přidány na pololetní shrnutí 6. (3) **Pololetní souhrn 6 rozšířen o základy elektřiny a magnetismu** — pololetní test učitele (xlsx A/B/C) zkouší ionty, el. a mag. sílu; souhrnný kvíz i text upraveny. (4) Do kvízů doplněny 2 otázky z testů učitele (zelektrizované pravítko; odečet objemu z odměrného válce). Pozn.: `Bertíkův čmuchací.docx` ve složce `6/07` je zápisek do deníku cesty.wonderly.cz (Karlstadt) — omylem ve školní složce, ponechán na místě. Build OK (282 stránek), nasazeno a ověřeno živě.
- **2026-07-14** — **Fyzika 6 DOKONČENA (18/18, 100 %) + Shrnutí pro všechny ročníky!** (1) Roztříděny SmartBooks PDF v `/Users/Shared/Škola/6/` do tématických složek učitele (01 Látka … 06 Teplota + nová „08 Elektřina a magnetismus"); záloha `SmartBooks` ponechána. Odhalen prohozený soubor Hmotnost/Objem (viz `Omega/dokumenty/kontrola-podkladu-fyzika6.md`). (2) Fyzika 6 postavena v 6 celcích dle složek učitele: Látka a těleso (5), Síla (2), Fyzikální veličiny (5), Čas (1), Teplota (2), Elektřina a magnetismus (3) — výklad + kvízy 12–17 otázek z lokálních SmartBooks PDF 1–18. Opraveny chyby podkladu: 116→118 prvků, chybné vysvětlení beztíže na ISS. Tag `fyzika-6-hotova`. (3) **Nová funkce: celek „Shrnutí a opakování" v každém ročníku 6–9** — podstránky Pololetní a Roční shrnutí (přehled učiva s odkazy na celky + klíčové vztahy). Souhrnné kvízy se skládají AUTOMATICKY z otázek podtémat (funkce `slozSouhrnnyKviz` na konci `kvizy.ts`, round-robin napříč celky; pololetí 24, rok 30 otázek) — při doplnění otázek k tématům se souhrny samy aktualizují. Tisknutelný test `/test/` funguje i pro shrnutí (náhodných 7 otázek z celého souhrnu). Build OK (281 stránek), nasazeno a ověřeno živě.
- **2026-07-13 (8)** — **Fyzika 9 DOKONČENA (22/22, 100 %)!** Uživatel dodal chybějící podklady lokálně do `/Users/Shared/Škola/9/` (roztřídil je do celků 1 Elektřina, 2 Atom, 3. Vesmír + záloha `vše`). Doplněno posledních 6 témat (výklad + kvízy z lokálních SmartBooks PDF): **elektromotor** (síla na vodič, komutátor), **transformátor** (U₂/U₁=N₂/N₁, nahoru/dolů), **přenos elektrické energie** (3 fáze, 220/400 kV, distribuce 22 kV), **jádro atomu** (nukleony, Z/A, izotopy, jaderné síly), **radioaktivita** (α/β/γ, poločas rozpadu, ochrana, Sv), **sluneční soustava** (8 planet, komety/meteory, AU/ly, Keplerovy zákony). Struktura webu zachována (6 celků). Tím je hotová celá fyzika 2. stupně (7+8+9). Build OK (219 str.). Milník: tag `fyzika-9-hotova`.
- **2026-07-13 (7)** — **Fyzika 9, celek 6** (Zdroje energie a vesmír) — hotové obnovitelné/neobnovitelné zdroje (výklad + kvíz, PDF 21). Sluneční soustava (22) = prázdná složka → dlaždice. **HOTOVO vše, co má podklady: 16 z 22 témat Fyziky 9.** Chybí 6 témat s prázdnými složkami na Disku (04 elektromotor, 08 transformátor, 09 přenos energie, 17 jádro atomu, 18 radioaktivita, 22 sluneční soustava) — čekají na PDF od učitele. Build OK (213 str.).
- **2026-07-13 (6)** — **Fyzika 9, celek 5** (Jaderná fyzika) — hotová **2 ze 4**: jaderná energie a reakce, jaderný reaktor + elektrárna (výklad + kvízy, SmartBooks PDF 19–20 z Disku). **⚠️ Chybí podklady**: složky `17 Jádro atomu` a `18 Radioaktivita` na Disku PRÁZDNÉ → dlaždice. Build OK (212 str.).
- **2026-07-13 (5)** — **Fyzika 9, celek 4 HOTOVÝ (2/2)** — elektrická energie a její přeměny, účinky proudu na organismus + bezpečnost (výklad + kvízy). Zdroj: SmartBooks PDF 15–16 z Disku. Build OK (210 str.).
- **2026-07-13 (4)** — **Fyzika 9, celek 3** (Elektrický proud v látkách) — hotová **5 z 6 podtémat**: vedení proudu v kapalinách/elektrolýza, chemické zdroje napětí, vedení proudu v plynech, polovodiče vlastní vodivost, polovodiče N a P + dioda (výklad + kvízy 11–12 ot.). Zdroj: SmartBooks PDF z Disku (témata 10–14). **⚠️ Chybí podklad**: složka `09 Přenos elektrické energie` na Disku PRÁZDNÁ → zůstává dlaždice. Build OK (208 str.).
- **2026-07-13 (3)** — **Fyzika 9, celek 2** (Elektromagnetická indukce a střídavý proud) — hotová **3 z 5 podtémat**: elektromagnetická indukce, vznik střídavého proudu + alternátor, vlastnosti střídavého proudu (výklad + kvízy 12 ot.). Zdroj: SmartBooks PDF z Disku. **⚠️ Chybí podklady**: složky `04 Elektromotor` a `08 Transformátor` na Disku jsou PRÁZDNÉ → obě zůstávají dlaždice (doplnit až budou PDF). Uživatel: pokračovat automaticky celek po celku bez ptaní. Build OK (203 str.).
- **2026-07-13 (2)** — **Fyzika 9 ZAHÁJENA**. Struktura `fyzika/9-rocnik` přestavěna dle skutečných složek učitele na **Google Disku** (parent folder ID `1q8kWtshe-EahjEQaxnP1xb87-4sght3e`, témata 01–22) do **6 celků**: 1 Magnetické pole, 2 Elektromagnetická indukce a střídavý proud, 3 Elektrický proud v látkách, 4 Elektrická energie a bezpečnost, 5 Jaderná fyzika, 6 Zdroje energie a vesmír. **✅ HOTOVÝ celek 1 Magnetické pole** — 3 podtémata (magnety-opakování, magnetické pole vodiče a cívky, elektromagnet), výklad + kvízy (12 ot. každý). Zdroj: SmartBooks PDF čtené PŘÍMO Z DISKU přes MCP (contentSnippet) — lokální složka `Škola/9/` je prázdná. Ostatní celky zatím dlaždice. Build OK (200 str.), nasazeno. Commit `d0c9343`.
- **2026-07-13** — **Fyzika 8 DOKONČENA (100 %)**. Doplněn poslední celek 6 **Zvuk** — 3 podtémata (Kmitání a vlnění, Zvuk vznik a šíření, Vnímání zvuku a hlasitost) s výkladem + kvízy (14 otázek každé). Zdroj: SmartBooks PDF 33–35 (lokálně). Ověřena fakta (f=1/T, λ=v·T=v/f; rychlost zvuku 340/1500/5000 m/s; ozvěna 0,1 s → 17 m; infra/ultrazvuk 16 Hz/16 kHz; práh slyšitelnosti 0 dB, bolesti 130 dB, poškození >90 dB) — bez chyb v podkladu. **Nový druh materiálu `youtube`** (Material.druh + iframe embed přes youtube-nocookie v index.astro) — poprvé použity YouTube odkazy z automatu (uložené v .txt u témat ve sdílené složce): oP6IJtosIp0, irfetAid_y0, 4uaNca3El9A, 109chWMF7RI. Build OK (201 stránek). Milník: tag `fyzika-8-hotova`.
- **2026-07-12 (4)** — **Fyzika 8, celek 5 Elektřina HOTOVO** (15 podtémat). Výklad + kvíz (12–13 otázek každý) pro: elektrický náboj, elektrické pole, vznik proudu, chemické zdroje napětí, elektrické obvody, proud+měření (ampérmetr sériově), napětí+měření (voltmetr paralelně), proud v kovech+odpor, závislost odporu na vodiči, Ohmův zákon, sériové/paralelní zapojení, reostat/potenciometr, práce+energie+výkon, účinky proudu na člověka+bezpečnost. Zdroj: SmartBooks PDF 18–32 (lokálně synced). Přepočítány příklady Ohmova zákona (10V/0,2A→50Ω) a převody kWh (1 kWh=3,6 MJ) — bez chyb v podkladu. Nasazeno, ověřeno živě. Commit `f602bfe`. Zbývá už jen celek 6 Zvuk (3 podtémata).
- **2026-07-12 (3)** — Zahájena **Fyzika 8**. Struktura přestavěna dle skutečného učiva (6 celků, témata 1–35). Hotové: celek 1 (Mechanická práce, Výkon) a celek 2 (Energie — 6 podtémat: přeměny, pohybová/polohová, ZZE, energetická hodnota potravin, vnitřní energie, tepelná výměna+měrná kapacita). Vše obsah + kvízy z ověřených SmartBooks PDF (+ text z Google Disku). Kontrola: nesrovnalost 54/90 km/h v příkladu Výkon.pdf (kontrola-podkladu-fyzika8.md). **Kvíz: profesor nově jako VIDEO** (tančí/lomí rukama) místo SVG. Přehled ke stažení médií 8. roč.: fyzika8-ke-stazeni.md. Uložena paměť [[youtube-fyzika-automat]].
- **2026-07-12 (2)** — **Fyzika 7 DOKONČENA (100 %)**. Doplněno téma „Zrcadla a čočky" — 6 podtémat (rovinné zrcadlo, kulová/duté zrcadlo, čočka spojka/rozptylka, oko a vady, rozklad světla a duha, vnímání barev RGB/CMYK) s výkladem + kvízy, + doplněny 2 chybějící kvízy (deformace, stejnorodá tělesa). Celkem 8 nových kvízů. Zdroje: SmartBooks PDF (zrcadla, čočky) + ověřené texty pro podcast (oko/rozklad/barvy). **Chyba v podkladu**: SmartBooks „23 Kulová zrcadla" str. 4 má prohozené definice dutého/vypuklého zrcadla — na webu uvedeno správně, zapsáno do kontrola-podkladu-fyzika7.md. Milník: tag `fyzika-7-hotova`.
- **2026-07-12** — Fyzika 7 hotová z ~90 % (Pohyb, Síly, Tlak, Vztlak, Atmosféra, Světlo A). Přidán tančící profesor, vysvětlení v kvízech, R2 úložiště pro deník, časové plány 7B/8B/9, kontrola ŠVP. Založeny CLAUDE.md + PROGRESS.md. Milník: tag `fyzika-7-zaklad`.
- _(sem přidávej další záznamy)_

## ⚠️ Pasti
- Cesty do složek `/Users/Shared/Škola/...` mají mezery a diakritiku → v bashi vždy do uvozovek, u `find`/`cp` pozor na globbing.
- Fonty v headless Chrome pro generování infografik se nemusí načíst → radši používat infografiky od učitele (NotebookLM) zmenšené přes PIL.
- Kvízy: správná odpověď je v datech VŽDY první (na webu se zamíchá) — nepřehazovat.
- Deník = obytné auto, ne kolo.

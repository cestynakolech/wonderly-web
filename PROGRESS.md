# PROGRESS.md — technický stav práce

_Aktualizováno 12. 7. 2026. Nejnovější commit: `ad7a321`. Souběžně čti `CLAUDE.md` (trvalý kontext)._

## ⏩ Jak navázat v nové session
1. Přečti `CLAUDE.md` a tento `PROGRESS.md`.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5
   ```
3. **Čím začít: Fyzika 8** — podklady se dotřiďují do `/Users/Shared/Škola/8/` (část už připravil učitel, zbytek se stahuje z Google Disku). Postup stejný jako u 7. ročníku: ověřit fakta → obsah do `temata.ts` → kvízy do `kvizy.ts` → média do `public/`.
4. **Fyzika 7 je KOMPLETNÍ** (viz „HOTOVÉ") — tag `fyzika-7-hotova`.

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
**Fyzika 7 — HOTOVO (100 %).** Milník: tag `fyzika-7-hotova`.
Další na řadě = **Fyzika 8** (viz níže) — až budou dotříděné podklady.

## 📋 Fyzika 8 — ROZPRACOVÁNO (struktura dle skutečného učiva 1–35)
Struktura `temata.ts` klíč `fyzika/8-rocnik` PŘESTAVĚNA podle složek učitele `/Users/Shared/Škola/8/` — 6 celků:
1. **mechanicka-prace-a-vykon** ✅ HOTOVO (mechanicka-prace, vykon)
2. **energie** ✅ HOTOVO (energie-a-jeji-premeny, pohybova-a-polohova-energie, zakon-zachovani-mechanicke-energie, energeticka-hodnota-potravin, vnitrni-energie-telesa, tepelna-vymena-a-teplo)
3. **tepelne-motory** ✅ HOTOVO (tepelny-motor-parni-stroj, spalovaci-motory)
4. **teplo-a-zmeny-skupenstvi** ✅ HOTOVO (teplo-a-premeny-skupenstvi, tani, tuhnuti, vyparovani, var, kondenzace, skupenske-zmeny-vody-v-prirode) — pozor: opraveny 3 chyby v podkladu (sublimace, var „z pevného", voda vře „0 °C")
5. **elektrina** 🔜 ZBÝVÁ (15 podtémat 18–32) — zdroj `Škola/8/5 Elektřina /`
6. **zvuk** 🔜 ZBÝVÁ (kmitani-a-vlneni, zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost) — zdroj `Škola/8/6 Zvuk/`

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
- **2026-07-12 (3)** — Zahájena **Fyzika 8**. Struktura přestavěna dle skutečného učiva (6 celků, témata 1–35). Hotové: celek 1 (Mechanická práce, Výkon) a celek 2 (Energie — 6 podtémat: přeměny, pohybová/polohová, ZZE, energetická hodnota potravin, vnitřní energie, tepelná výměna+měrná kapacita). Vše obsah + kvízy z ověřených SmartBooks PDF (+ text z Google Disku). Kontrola: nesrovnalost 54/90 km/h v příkladu Výkon.pdf (kontrola-podkladu-fyzika8.md). **Kvíz: profesor nově jako VIDEO** (tančí/lomí rukama) místo SVG. Přehled ke stažení médií 8. roč.: fyzika8-ke-stazeni.md. Uložena paměť [[youtube-fyzika-automat]].
- **2026-07-12 (2)** — **Fyzika 7 DOKONČENA (100 %)**. Doplněno téma „Zrcadla a čočky" — 6 podtémat (rovinné zrcadlo, kulová/duté zrcadlo, čočka spojka/rozptylka, oko a vady, rozklad světla a duha, vnímání barev RGB/CMYK) s výkladem + kvízy, + doplněny 2 chybějící kvízy (deformace, stejnorodá tělesa). Celkem 8 nových kvízů. Zdroje: SmartBooks PDF (zrcadla, čočky) + ověřené texty pro podcast (oko/rozklad/barvy). **Chyba v podkladu**: SmartBooks „23 Kulová zrcadla" str. 4 má prohozené definice dutého/vypuklého zrcadla — na webu uvedeno správně, zapsáno do kontrola-podkladu-fyzika7.md. Milník: tag `fyzika-7-hotova`.
- **2026-07-12** — Fyzika 7 hotová z ~90 % (Pohyb, Síly, Tlak, Vztlak, Atmosféra, Světlo A). Přidán tančící profesor, vysvětlení v kvízech, R2 úložiště pro deník, časové plány 7B/8B/9, kontrola ŠVP. Založeny CLAUDE.md + PROGRESS.md. Milník: tag `fyzika-7-zaklad`.
- _(sem přidávej další záznamy)_

## ⚠️ Pasti
- Cesty do složek `/Users/Shared/Škola/...` mají mezery a diakritiku → v bashi vždy do uvozovek, u `find`/`cp` pozor na globbing.
- Fonty v headless Chrome pro generování infografik se nemusí načíst → radši používat infografiky od učitele (NotebookLM) zmenšené přes PIL.
- Kvízy: správná odpověď je v datech VŽDY první (na webu se zamíchá) — nepřehazovat.
- Deník = obytné auto, ne kolo.

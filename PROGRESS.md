# PROGRESS.md — technický stav práce

_Aktualizováno 12. 7. 2026. Nejnovější commit: `ad7a321`. Souběžně čti `CLAUDE.md` (trvalý kontext)._

## ⏩ Jak navázat v nové session
1. Přečti `CLAUDE.md` a tento `PROGRESS.md`.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5
   ```
3. **Čím začít: dodělat zbytek Fyziky 7** (viz „ZBÝVÁ" níže) — Zrcadla a čočky, Oko, Rozklad světla, Vnímání barev + 2 chybějící kvízy. Materiály jsou už nakopírované v `public/`, jen chybí stránky.
4. Pak Fyzika 8 (až budou podklady staženy z Google Disku do `/Users/Shared/Škola/8/`).

## ✅ HOTOVÉ a funkční na webu (lab.wonderly.cz)
### Funkce
- Kreslený design, navigace předmět→ročník→téma→podtéma
- Procvičovací kvíz s vysvětlením při špatné odpovědi + tančící/mlátící profesor (SVG animace v `Kviz.astro`)
- Tisknutelný test `…/test/` (heslo `ucitel-wonderly`): A4 = 4 lístky, líc hlavička+ot.1–4, rub 5–7, klíč
- Interaktivní simulace hydrauliky (`HydraulikaSimulace.astro`) na stránce Pascalova zákona
- Materiály: infografiky (jpg), písničky (mp3/m4a/mp4)

### Fyzika 7 — 22 podtémat KOMPLET (výklad + kvíz s vysvětleními + materiály), ~441 otázek
- **Pohyb a rychlost** (4/4): klid-a-pohyb-telesa, posuvny-otacivy-pohyb, rychlost-draha-cas, priklady-na-vypocet-rychlosti
- **Síly kolem nás** (5/5): sila, gravitacni-sila, treci-sila, skladani-sil, teziste
- **Jednoduché stroje**: jednoduche-stroje-paky (páka+moment). `pusobeni-teles-a-deformace` má obsah, CHYBÍ kvíz.
- **Tlak v kapalinách** (3/3): tlak, pascaluv-zakon (+simulace), hydrostaticky-tlak
- **Vztlak**: archimeduv-zakon (hotové). `telesa-stejnoroda-a-nestejnoroda` má obsah, CHYBÍ kvíz.
- **Atmosféra a tlak** (3/3): atmosfericky-tlak, pretlak-podtlak-vakuum, meteorologie-a-mereni-tlaku
- **Světlo a jeho šíření** (4/4): svetlo-jeho-zdroje, odraz-svetla, lom-svetla, stin-faze-mesice

## 🔜 ZBÝVÁ dodělat (Fyzika 7 — poslední kus)
Materiály (písničky, infografiky) jsou **už nakopírované v `public/materialy/fyzika/7-rocnik/zrcadla-a-cocky/`** — jen přidat stránky do `temata.ts` + kvízy do `kvizy.ts`:
1. **Zrcadla a čočky** (téma `zrcadla-a-cocky`): podtémata `opticka-cocka` (píseň `opticka-cocka/pisen-opticka-jizda.mp4` hotová), `optika-rovinneho-zrcadla`, `kulova-zrcadla-dute-zrcadlo`
2. **Nová podtémata** (26–29, infografiky hotové v public/): oko a vady oka (`oko-vady-oka/infografika-oko.jpg`, `…historie-bryli.jpg`), rozklad světla/duha (`rozklad-svetla-duha/infografika-prehled.jpg`), vnímání barev RGB/CMYK (`vnimani-barev/infografika-prehled.jpg`). Pozn.: 27,28,29 jsou „nad rámec RVP".
3. **2 chybějící kvízy**: `pusobeni-teles-a-deformace`, `telesa-stejnoroda-a-nestejnoroda`
4. Zdroj textů (ověřených) pro tato podtémata: `/Users/Shared/Škola/7/4 Světlo/<číslo>/informace-pro-podcast.txt`

Pozn.: v `public/` jsou staged (necommitnuté) obrázky/písně pro čočky/oko/rozklad/barvy — commitnou se se stránkami.

## 📋 Fyzika 8 a 9 (další fáze)
- Podklady zatím NEJSOU stažené. Uživatel stáhne ZIPy z Google Disku do `/Users/Shared/Škola/8/` (a `/9/`), asistent rozbalí (`ditto -x -k`) a roztřídí podle podtémat.
- Struktura témat 8 a 9 už na webu existuje (prázdné dlaždice „Obsah připravujeme"), viz `temata.ts` klíče `fyzika/8-rocnik`, `fyzika/9-rocnik`.
- Celky 8: Energie, Teplo, Motory, Elektřina, Zvuk. Celky 9: atom/jádro, elektro/indukce, vesmír/kosmonautika.
- Časové plány 8B (59 h) a 9 (41 h) hotové v `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/`.

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

## ⚠️ Pasti
- Cesty do složek `/Users/Shared/Škola/...` mají mezery a diakritiku → v bashi vždy do uvozovek, u `find`/`cp` pozor na globbing.
- Fonty v headless Chrome pro generování infografik se nemusí načíst → radši používat infografiky od učitele (NotebookLM) zmenšené přes PIL.
- Kvízy: správná odpověď je v datech VŽDY první (na webu se zamíchá) — nepřehazovat.
- Deník = obytné auto, ne kolo.

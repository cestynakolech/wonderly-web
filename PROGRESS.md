# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 Aktuální stav, fronta i otevřené dotazy jsou v `SAMOSTATNY-REZIM.md` (⚡, 📌, ❓) — ne tady
> Tenhle soubor je technická příručka (jak co přidat, kde co leží) a historie; sekce mohou být staršího data. Fronta je jedna pro celý web (značky `[fox]`/`[skola2]`/`[cesty]`).

## ⏩ Jak navázat v nové session
Postup čtení: `CLAUDE.md` (úvod) → `SAMOSTATNY-REZIM.md` (horní sekce); stav fyziky a odložená informatika: SR ⚡ + `OBSAH-PRAVIDLA.md` (preambule). Rychlá kontrola stavu:
```
cd ~/Desktop/wonderly-web && git log --oneline -5 && node zkontroluj.mjs
```
Brána musí skončit `✅ Vše zapojené správně.` — běží i sama v `prebuild`.

### 🔎 Měřidla a kontroly (co je po ruce)
| Příkaz | K čemu |
|---|---|
| `node zkontroluj.mjs` | hlavní brána — zapojení simulací, kvízy, mapy, čísla, názvy bloků |
| `node testy/vsechny-simulace.mjs` | všechny testy simulací (aktuální počty vypisuje běh sám) |
| `node testy/kratke-vyklady.mjs 1200` | krátké výklady; 🕳 = hluchá stránka (dnes 0) |
| `node testy/mutace.mjs [název]` | **mutační test** — je test simulace vůbec k něčemu? (pomalý, mimo bránu) |
| `node testy/nazvy-bloku.mjs` | názvy bloků Scratche proti české lokalizaci |
| `node testy/vypis-kviz.mjs <blok>` · `node testy/delky.mjs <blok>` | práce s kvízy |

### 🕹️ Simulace (interaktivní infografiky) — jak přidat další (kladka…)
Od 23. 9. 2026 je „simulace" a „interaktivní infografika" JEDNA a TATÁŽ složka ústavy (`OBSAH-PRAVIDLA.md` kap. 12) — klikací/odkrývací schéma i posuvník s dopočtem se počítají stejně, žádné rozlišení dvou kategorií. Aktuální počet simulací vypisuje brána `node zkontroluj.mjs` (číslo sem neopisovat — opsané zastarává, nález auditu 4. 8.). Jsou to canvas/SVG komponenty čistě v prohlížeči, styl viz existující. **Vzor přidání nové:**
1. Vytvoř komponentu `src/components/skola2/<Nazev>Simulace.astro` (podívej se na `TezisteSimulace`, `VrhSimulace`, `SkupenstviSimulace` — stejný rámeček `<section class="ramecek simulace">`, ovládání, `<script>` bez importů).
2. V `src/data/temata.ts`: rozšiř typ `interakce?: … | 'novy-klic'` a přidej `interakce: 'novy-klic',` k danému podtématu.
3. V `src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro`: přidej import + řádek `{podtema.interakce === 'novy-klic' && <NazevSimulace />}`.
4. `npm run build` → `git push`. Ověř `curl` na živé URL.
**Hotové interakce:** seznam a počet vypíše `grep "interakce:" src/data/temata.ts` /
`node zkontroluj.mjs` — ruční seznam se opsáním zastarává (K3-Z6, 27. 9. 2026).
**Nápady na příště:** nakloněná rovina, kolo na hřídeli.
**Pozn. k testování:** v náhledovém prohlížeči (preview) se `requestAnimationFrame` zpomaluje → animace ověřuj VÝPOČTEM v konzoli, ne okem; na reálném zařízení běží plynule.

## ✅ HOTOVÉ a funkční na webu (lab.wonderly.cz)
### Funkce
- Kreslený design, navigace předmět→ročník→téma→podtéma
- Procvičovací kvíz s vysvětlením při špatné odpovědi + tančící/mlátící profesor (SVG animace v `Kviz.astro`)
- Tisknutelný test `…/test/` (heslo `ucitel-wonderly`): A4 = 4 lístky, líc hlavička+ot.1–4, rub 5–7, klíč
- Interaktivní simulace hydrauliky (`HydraulikaSimulace.astro`) na stránce Pascalova zákona
- Materiály: infografiky (jpg), písničky (mp3/m4a/mp4)

### Hotová podtémata — zdroj pravdy je kód, ne ruční výčet (oprava V6-11, 27. 9. 2026)
Ruční seznam „Fyzika 7 — 30 podtémat KOMPLET" byl smazán, protože se stejně jako
opsaná čísla jinde v tomto souboru rozchází se skutečností a nikdo ho neaktualizuje.
Skutečný seznam a stav: `grep -A2 "podtema:" src/data/temata.ts` (celky/podtémata),
`node zkontroluj.mjs` (počty a zapojení), `node testy/nazornost.mjs` (kdo má/nemá
simulaci), aktuální fronta a co chybí je v nejhornější sekci `SAMOSTATNY-REZIM.md`.

## 🔜 ZBÝVÁ dodělat
Stav fyziky a fronty vede VÝHRADNĚ `SAMOSTATNY-REZIM.md`. Historická část (od původního řádku 131) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — jen se nečte automaticky.

## 🛠️ Build / git postup
→ jediný domov je [CLAUDE.md § Postup nasazení](CLAUDE.md) (build, commit, push, ověření curlem ve smyčce). Sem se neopisuje.

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

## Historie — 19.–25. 10. 2026: katalog pracantů, pojistka hotového, hry, audit 25. 10.
19.–25. 10.: `KATALOG-PRACANTU.md` (21. 10., směrovací tabulka), `pojistka_hotove` (b1bd2c8, pre-commit + `npm test`), panely a hry pro třídu (Magnety, Příklady na výpočet rychlosti, Výkon, Mechanická práce…), odstranění externích odkazů z polí `odkazy` (58350d3, 25. 10.), `PANELY-NAVOD.md` do repa. 25. 10.: WONDERLY AUDIT — nálezy 10/13/45 (velké/střední/malé), podklady `Omega/predavka/2026-10-25/audit/`, startovní čtení zkráceno (80 298 B → viz SR). Strom byl 26 commitů pozadu → stash + záloha SVG (`Omega/smazano-zaloha/2026-10-25/web-untracked/`), nic nesmazáno. Brána lokálně padá jen kvůli nesledovaným měřidlům laborek (`audit/brana-laborky.md`).

## Historie — 12.–18. 10. 2026: panely W58–W116 a audit 18. 10.
12.–15. 10.: ~107 commitů, panely „… v pohybu“ (W58–W116, podklady `Omega/predavka/2026-10-1*/`), pravidlo „živý web před výběrem úlohy“ ([[feedback-zivy-web-pred-vyberem]]), rozhodnutí o modelech agentů (1465ed0). 18. 10.: audit — opravy A/B/C (`Omega/predavka/2026-10-18/OPRAVA-*.md`), kotvy; startovní čtení 107 952 → 76 052 B (wc -c); velké nálezy ve frontě SAMOSTATNY-REZIM § 📌.

## Historie — 8. 10. 2026: 2.–8. 10. souhrn (doplněno auditem 11. 10.)

Za 2.–8. 10. 2026 přibylo ~450 commitů (nejvíc 3. a 4. 10.): obrázky a animace k tématům (mj. skupenství látek, značení směru proudu ⊙/⊗), schválené opravy distraktorů ve vatě, bonus videa NotebookLM (7.–9. ročník, 8. 10.: vypařování, tuhnutí, teplo a přeměny skupenství, spalovací a alternativní motory, klín). 11. 10. audit doplnil brány laborek (`bezpecnost-laborek`, `cela-cisla-laborek`) do `testy/obousmerne.json`. Podrobnosti v `git log` a `SAMOSTATNY-REZIM.md`.

## Historie — 16. 10. 2026: skrytý oddíl /suplovani/ (přírodopis – nervová soustava)

Jediný list `src/pages/suplovani/prirodopis-nervova-soustava.astro` (6 karet 3×2 pro tabuli 1920×1080
bez posouvání, na mobilu pod sebou). Dle upřesnění učitele bez rozcestníku /suplovani/, bez QR a odkazů.
`<meta name="robots" content="noindex, nofollow">` (nový prop `noindex` v `SkolaLayout.astro`);
není v menu ani navigaci, web nemá sitemapu. Adresa: https://wonderly.cz/suplovani/prirodopis-nervova-soustava/
(na lab. subdoméně to Worker nepřesměruje — jen kořenová doména). Build prošel i s bránami.

## Historie — 1. 10. 2026: téma 4 vlna 1–2 nasazena

Commit 1cb56ef, živě 7/7: F9 Elektrická energie, F7 Pascalův zákon, Hydrostatický tlak, Tlak, F8 Teplo a přeměny skupenství, Tání, Tuhnutí (48 obrázků, 7 kvízů po 21, 2 kola kontroly Claude + Codex). CI build spadl, nasazeno `wrangler deploy` (viz Omega `prace/ci-selhani.md`). Mobil dávka 1 (8 simulací) 8537ea4, měřidlo `testy/mobil-citelnost.mjs`. Zbytek fronty: `SAMOSTATNY-REZIM.md`.

## Historie — 10. 9. 2026 (deterministická inventura podtématu)

Přidán `inventura-podtematu.mjs`, který bez modelu a sítě vypíše pro jedno
podtéma stav videa, polemiky, infografiky, kvízu, písničky a laborky včetně
důkazu. `ANO` vychází jen z `HEAD`; pracovní strom a neověřitelné externí cíle
jsou `NEJISTÉ`. Regresní test pokrývá ručně ověřené `Klid a pohyb tělesa`,
MP4 písničku oddělenou od videa, souhrnný kvíz přiřazený za literálem a hlubší
odsazení podtémat elektřiny F8.

## 📝 Pravidlo aktualizace (na konci každé session)
Jediný domov: `CLAUDE.md` řádek 5 (nový datovaný záznam do Historie, HOTOVÉ/ZBÝVÁ,
commit+push, tag po velkém celku). Sem se neopisuje (K3-Z7, 27. 9. 2026).

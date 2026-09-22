# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 NEJDŘÍV OTEVŘI `SAMOSTATNY-REZIM.md`
> **Aktuální stav práce, živá fronta úkolů i jediný seznam otevřených dotazů na učitele
> jsou v `SAMOSTATNY-REZIM.md`, v jeho NEJHORNĚJŠÍ sekci** — ne tady. Tenhle soubor je
> spíš technická příručka (jak co přidat, kde co leží); jeho jednotlivé sekce mohou být
> staršího data. Fronta je JEDINÁ pro celý web (sekce `[fox]`, `[skola2]`, `[cesty]`) —
> každá položka nese na začátku značku, do které sekce patří.
>
> ### Poslední stav: **22. 9. 2026 — F7 zrcadla-a-cocky HOTOVO 6/6 a nasazeno; kvízy světla sladěny, zrcadla v kontrole**
> F7 8. celek `zrcadla-a-cocky` HOTOVO 6/6 podtémat (optika-rovinneho-zrcadla,
> kulova-zrcadla-dute-zrcadlo, opticka-cocka, oko-vady-oka, rozklad-svetla-duha,
> vnimani-barev), zdroje PDF Škola/7/4 Světlo 22, 23, 25, 26, 28, 29, 2 kola nezávislé
> kontroly, commit `2d7e7c9`, push, curl ověřen. Kvízy `svetlo-a-jeho-sireni` sladěny
> (1. kolo 44 nálezů zapracováno, commit `41c196a`, nasazeno; 2. kolo kontroly běží);
> kvízy `zrcadla-a-cocky` v 1. kole kontroly (2 kontroloři).
>
> ### Dřívější stav: **22. 9. 2026 — F7 svetlo-a-jeho-sireni HOTOVO 4/4 a nasazeno; F7 zrcadla-a-cocky v běhu**
> F7 7. celek `svetlo-a-jeho-sireni` HOTOVO 4/4 podtémata, 2 kola nezávislé kontroly, commit
> `c453d06`, push, curl ověřen; kvíz zatím NESLADĚN s novým výkladem (zařadit do sladění
> spolu se zrcadly). Doloženy a opraveny 2 fyzikální chyby PDF podkladu (teplota Slunce,
> „krvavý Měsíc"). Rozjeto F7 8. celek `zrcadla-a-cocky` — 6 výkladů napsáno, 1. kolo
> kontroly proběhlo (1 celek NEPROŠLO, ostatní DROBNOSTI), opraváři běží.
>
> ### Dřívější stav: **22. 9. 2026 — kvízy 79/79 přestavěných podtémat sladěny**
> Sladění kvízů F7 celků 1–5 (18) a F9 celků 1–5 (20) HOTOVO: 1. kolo 243 nálezů, 2. kolo
> 80 nových; čtyři bloky zkráceny z 22–24 na 21 otázek; push `b4968f2`; curl ověřen. Spolu
> s dřívějšími 41 podtématy je tak sladěno kvízů celkem 79/79.
>
> ### Dřívější stav: **22. 9. 2026 — odkazy u 7 podtémat HOTOVO, bod E 41/41; sladění kvízů F7/F9 celků 1–5 rozjeto**
> Doplněno 23 českých odkazů u 7 podtémat (F7 atmosfericky-tlak, pretlak-podtlak-vakuum,
> meteorologie-a-mereni-tlaku; F8 kmitani-a-vlneni, zvuk-vznik-a-sireni,
> vnimani-zvuku-a-hlasitost; F9 slunecni-soustava) — worker médií → nezávislý kontrolor →
> zápis, push `989e549`. Bod E („hotové téma") tím kompletní pro 41/41 přestavěných podtémat.
> Nález: F7 celky 1–5 a F9 celky 1–5 (38 podtémat) mají kvíz nesladěný s novým výkladem —
> rozjeto sladění (4 kontroloři: F7 1–2, F7 3–5, F9 1–2, F9 3–5), pak F7 svetlo-a-jeho-sireni
> a zrcadla-a-cocky.
>
> ### Dřívější stav: **22. 9. 2026 — sladění kvízů F8 celků 1–4 HOTOVO; kvízy 41/41 sladěny**
> F8 celky 1–4 (17 podtémat) sladěny: 1. kolo 91 nálezů, 2. kolo 18 nových; push `530c64c`.
> Spolu s dříve dokončenými 24 podtématy je tak sladěno kvízů celkem 41/41. Rozjeto doplnění
> odkazů u 7 podtémat bez mediálních odkazů (3 workeři médií).
>
> ### Dřívější stav: **22. 9. 2026 (noc) — sladění kvízů 24 podtémat HOTOVO; F8 celky 1–4 v běhu**
> Krok (c) sladění kvízů s novými výklady dokončen pro všech 24 podtémat (F8 elektřina 15,
> F7 `atmosfera-a-tlak-vzduchu` 3, F8 `zvuk` 3, F9 `energie-a-vesmir` 3) — 2 kola nezávislého
> kontrolora, zapsáno `kvizy.ts`, push `4652cbd`. Rozjeto sladění dříve přestavěných F8
> celků 1–4 (17 podtémat).
>
> ### Dřívější stav: **21. 9. 2026 — F7 tlak-v-kapalinach HOTOV 3/3; F9 elektricka-energie-a-bezpecnost HOTOV 2/2**
> Čtvrté celky obou ročníků přestavěny přes `podtema.mjs`, každé podtéma prošlo
> nezávislým kontrolorem opus. F8 celky 1–4 (17), F7 celky 1–4 (16), F9 celky 1–4 (16) = 49 podtémat.
> Další dávka: 5. celky F7 (`vztlakova-sila-a-plovani-teles`), F8 (`elektrina`), F9 (`jaderna-fyzika`).
>
> ### Dřívější stav: **21. 9. 2026 — F7 jednoduche-stroje HOTOV 4/4; F9 elektricky-proud-v-latkach HOTOV 6/6**
> Třetí celky obou ročníků přestavěny přes `podtema.mjs`, každé podtéma prošlo
> nezávislým kontrolorem opus. F8 celky 1–4 (17), F7 celky 1–3 (13), F9 celky 1–3 (14) = 44 podtémat.
> Další dávka: 4. celky F7 (`tlak-v-kapalinach`) a F9 (`elektricka-energie-a-bezpecnost`).
>
> ### Dřívější stav: **21. 9. 2026 — F7 sily-kolem-nas HOTOV 5/5; F9 indukce-a-stridavy-proud HOTOV 5/5**
> Druhé celky obou ročníků přestavěny přes `podtema.mjs`, každé podtéma prošlo
> nezávislým kontrolorem opus. F8 celky 1–4, F7 celky 1–2, F9 celky 1–2 hotové = 32 podtémat.
> Další dávka: 3. celky F7 (`jednoduche-stroje`) a F9 (`elektricky-proud-v-latkach`).
>
> ### Dřívější stav: **21. 9. 2026 — F9 magneticke-pole HOTOV 3/3; indukce-a-stridavy-proud 1/5**
> F9 `magneticke-pole` (3 podtémata) HOTOV přes `podtema.mjs`, každé prošlo nezávislým
> kontrolorem. F9 2. celek `indukce-a-stridavy-proud` zapsáno `elektromagneticka-indukce`
> (1/5), zbytek u kontrolorů. F7 2. celek `sily-kolem-nas` u kontrolorů.
>
> ### Dřívější stav: **21. 9. 2026 — 3. dávka hotova, celek teplo-a-zmeny-skupenstvi F8 7/7**
> Celek `teplo-a-zmeny-skupenstvi` F8 (7 podtémat) přestavěn podle schváleného vzoru A+B+C+D
> nástrojem `podtema.mjs`, každé podtéma prošlo nezávislým kontrolorem. F8 hotové celky 1–4.
> Podle bodu E ve `SAMOSTATNY-REZIM.md` teď běží 1. celky F7 (`pohyb-a-rychlost`) a F9
> (`magneticke-pole`) souběžně. V F8 zbývá elektřina, zvuk, shrnutí.
>
> ### Dřívější stav: **21. 9. 2026 — 2. dávka hotova (mechanická práce a výkon + tepelné motory)**
> Celky `mechanicka-prace-a-vykon` a `tepelne-motory` F8 (4 podtémata) přestavěny podle
> schváleného vzoru A+B+C+D nástrojem `podtema.mjs`, každé podtéma prošlo nezávislým
> kontrolorem.
>
> ### Dřívější stav: **21. 9. 2026 — celek Energie F8 hotov (6/6 podtémat)**
> Celek energie 8. ročníku přestavěn podle schváleného vzoru A+B+C+D nástrojem
> `podtema.mjs`, každé podtéma prošlo nezávislým kontrolorem. Další dávka: zbytek fyziky 8.
>
> ### Dřívější stav: **22. 8. 2026 večer — kvízy fyziky 7 dorovnány, celá fyzika 6–9 na cíli 21**
> Fyzika 7 dorovnána na 21 otázek (10 bloků, 44 nových otázek, doplněny 2 věty výkladu
> duhy/barev). Kontrolor 0 nálezů, nasazeno commit `acceba4`, ověřeno obsahem na produkci.
> Celá fyzika 6–9 tím splňuje cíl 21 otázek na podtéma. Zbývá informatika + Pč (424 otázek).

## ⏩ Jak navázat v nové session
_Aktuální stav přestavby výkladu vede `SAMOSTATNY-REZIM.md`, ne tato sekce._
1. Přečti `CLAUDE.md`, pak **`SAMOSTATNY-REZIM.md` (horní sekce)** a podle potřeby tenhle soubor.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5 && node zkontroluj.mjs
   ```
   Brána musí skončit `✅ Vše zapojené správně.` — běží i sama v `prebuild`.
3. **CELÁ FYZIKA 2. STUPNĚ (6, 7, 8 i 9) JE KOMPLETNÍ** — tagy `fyzika-6-hotova`, `fyzika-7-hotova`, `fyzika-8-hotova`, `fyzika-9-hotova`. Každý ročník má navíc celek **„Shrnutí a opakování"** (pololetní + roční shrnutí s automaticky skládaným souhrnným kvízem a tisknutelným testem).
4. Další možné kroky: doplnit média k Fyzice 6 (infografiky/písně/videa z YouTube automatu), předměty Informatika a Pracovní činnosti, nebo revize hotových stránek. Podklady 6. roč.: `/Users/Shared/Škola/6/` (složky 01–08 + záloha `SmartBooks`).

### 📌 Kolo 14. 8. 2026 (odpoledne až podvečer) — FYZIKA 8 MÁ NÁZORNOST HOTOVOU

Změřeno `node testy/nazornost.mjs`: **fyzika 8 — bez názornosti 2 z 37**, a ty dvě
jsou pololetní a roční shrnutí, která ji nepotřebují. Vzniklo:
- **`elektricka-prace-a-vykon`** — simulace (spotřebič + elektroměr; stará vs. LED
  žárovka), kvíz 19 otázek, 3 české odkazy a 2 videa. Kontrolor: 12 nálezů,
  4 závažné, všechny opraveny (commity `f57c36c`, `efb6f67`, `49b542a`, `77cfff6`).
- **`ucinky-proudu-a-bezpecnost`** — simulace Ohmova zákona na lidském těle
  (napětí × stav kůže → pásmo nebezpečí; cesta proudu tělem), kvíz doplněn na 19,
  5 ověřených českých zdrojů (commity `e3e5bf4`, `a8cf40a`). ✅ **Druhá kontrola
  proběhla 14. 8. večer — 11 nálezů, 4 závažné, všechny opraveny** (viz záznam
  „2026-08-14 večer" v Historii níže).

**Nástroj `testy/nahled-simulace.mjs` opraven třikrát** (platí pro všechny simulace):
doplněn `createElementNS` a `cancelAnimationFrame` do sandboxu (bez nich se náhled
ZASEKL místo pádu — render běžel 5 minut), vkládání `textContent` zpátky do SVG
(popisky byly v náhledu prázdné, takže vizuální kontrola ukazovala prázdné rámečky)
a nové `klik=<id>` pro simulace ovládané tlačítky. Regresní zkouška: 5 dřívějších
simulací se renderuje dál.

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
**NÁZORNOST FYZIKY (zadání učitele 31. 7. 2026) — HOTOVO, FRONTA PRÁZDNÁ** (stav
22. 8. 2026 večer): ze 101 podtémat fyziky 6.–9. má simulaci 92, zbylých 9 je
8 opakovacích shrnutí (logicky bez simulace) + `uvod-do-fyziky` (rozhodnuto, že
simulace nedává smysl). Informatika a Pracovní činnosti zůstávají ve frontě —
podrobnosti viz `SAMOSTATNY-REZIM.md`.
Zbývá dál: média k Fyzice 6 (infografiky/písně/videa); Pracovní činnosti — zatím jen celek 3D modelování (Tinkercad+SketchUp, 20. 7.), ostatní témata Pč dle podkladů učitele. Informatika 7–9 KOMPLET (výklad+kvízy+testy+odkazy s QR).

> ⤵️ Historická část (od původního řádku 131) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — beze změny, jen se nečte automaticky.

## 🎬 Videa (později, dávkově)
Velká výkladová videa (>25 MB) → učitel nahraje na YouTube jako „nezařazená", dá odkazy (do txt souborů u zvuku ve sdílené složce). Pak se hromadně vloží do stránek (přidat do `materialy` u podtématu jako druh `video` s YouTube embedem, nebo malé mp4 přímo).

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

## Historie — 10. 9. 2026 (deterministická inventura podtématu)

Přidán `inventura-podtematu.mjs`, který bez modelu a sítě vypíše pro jedno
podtéma stav videa, polemiky, infografiky, kvízu, písničky a laborky včetně
důkazu. `ANO` vychází jen z `HEAD`; pracovní strom a neověřitelné externí cíle
jsou `NEJISTÉ`. Regresní test pokrývá ručně ověřené `Klid a pohyb tělesa`,
MP4 písničku oddělenou od videa, souhrnný kvíz přiřazený za literálem a hlubší
odsazení podtémat elektřiny F8.

## Historie — 10. 9. 2026 (zápisy do sešitu, dělba práce s automatem)

**Hotovo a živé na webu:** zápisy do sešitu k prvním třem podtématům v pořadí
7 → 8 → 9 — `rychlost-draha-cas`, `vykon`, `magneticke-pole-vodice-a-civky`.
Nezávislý kontrolor ve třech kolech (3 → 2 → 0 nálezů), po sloučení s prací
automatu ještě jednou (2 → 1 → 0). Ověřeno curlem na produkci.

**Souběh s automatem — vyřešeno rozhodnutím učitele.** Automat
`wonderly-fyzika-doplnovani-1h` plnil tutéž frontu ve stejném pořadí, obě větve
vyrobily tytéž tři zápisy zvlášť (pracují ve dvou různých kopiích repa —
`~/Desktop/wonderly-web` a `~/wonderly-web`). Nic se nezahodilo, verze se
sloučily. Učitel pak rozhodl: **zápisy, laborky, kvízy a animace dělá automat**
(dopoledne poslal 24 commitů a srazil chybějící zápisy ze 76 na 22),
**session dělá polemiky a písničky**, které automat výslovně přeskakuje.

**Rozpracováno a odloženo:** polemika F7 „Klid a pohyb tělesa" — tři scénáře
trojice hotové a zkontrolované, pokrytí kvízu 21/21, scénosledy napsané.
Výroba zvuku stojí na právech (`/Users/Shared/Škola/podkasty` patří účtu
`radekmicek`) a most na druhý účet neexistuje. Podrobně i s tím, co má
rozhodnout učitel, v `SAMOSTATNY-REZIM.md`, sekce „Odloženo — zaseklo se".

**Nález u měřidla:** `pokryti_kvizu.py` volá `~/bin/ask-local`, který neexistuje
— nikdy se tedy nezeptá modelu a hlásí falešné díry (u této trojice 2 z 21).
Navíc chce `gemma4:26b`, který na mini není stažený. Oprava čeká.

> ⤵️ Sedm nejstarších záznamů Historie (3. 8., 16. 8., pět z 19. 8. 2026) přesunuto do [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — audit-zkrácení 6. 9. 2026.
> ⤵️ Nedělní audit 2026-09-20 tam přesunul dalších 15 záznamů (19.–23. 8. 2026) a duplicitní zápis ze 12. 9.

## 📝 Pravidlo aktualizace (na konci každé session)
1. Přidej NOVÝ datovaný záznam do sekce „Historie" níže (staré NEmaž — je to lidsky čitelná historie).
2. Aktualizuj sekce „HOTOVÉ" a „ZBÝVÁ" výše podle reálného stavu.
3. `git add -A && git commit && git push` (i PROGRESS.md se tím uloží na GitHub jako verze).
4. Po dokončení celého ročníku/velkého celku přidej git tag jako milník.

> ⤵️ Historická část (od původního řádku 183) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — beze změny, jen se nečte automaticky.


---

## 🎵 Suno MP3 Wave 1 — 25. 8. 2026 (Subagent)

### Co jsem udělal:
1. ✅ **Vytvořil Python skript** — `suno-organize.py` v repo
   - Automaticky organizuje MP3 z `~/Downloads/` do fyziky struktury
   - Zařazuje podle klíčových slov v názvech (energia→6.ročník, sila→7.ročník atd.)
   - Otestvován na 5 MP3 — **100% přesnost**
   
2. ✅ **Vytvořil kontrolní seznamy a návody:**
   - `SUNO-CHECKLIST.md` — seznam všech 116 potřebných skladeb
   - `SUNO-NAVOD.md` — detailní návod na stahování
   - `SUNO-STATUS.md` — status report

3. ✅ **Přiravil fyziku strukturu** — všechny adresáře připraveny:
   - `6-rocnik/uvod-do-fyziky/`
   - `7-rocnik/sily-kolem-nas/`, `7-rocnik/pohyb-a-sily/`, `7-rocnik/tekutiny-a-tlak/`
   - `8-rocnik/prace-a-energie/`, `8-rocnik/elektricita-magnetizmus/`
   - `9-rocnik/elektrina-detaily/`, `9-rocnik/magnetizmus-detaily/`, `9-rocnik/optika/`

### 🎯 Cíl:
- **Wave 1:** 50+ MP3 dnes (31% pokrytí)
- **Finále:** 116 MP3 (100% fyziky)

### 📊 Aktuální stav (opraveno auditem 6. 9. 2026, „6 v repo" bylo špatně spočítané):
- **Navazuje na fázi 1** (26 hlavních témat, jedna píseň na téma — ta byla
  ohlášena „26/26 HOTOVO" 21. 8. 2026, viz `SAMOSTATNY-REZIM.md`). Tato Wave 1
  je VĚTŠÍ, NOVÝ cíl: píseň na **každé z 116 podtémat** fyziky, ne jen na
  hlavní téma.
- Skutečný stav na disku: **22 m4a nasazeno** (`dist/materialy/fyzika/**/*.m4a`),
  shoduje se s číslem „písnička 22/116" v Historii PROGRESS.md k 22. 8. —
  odpovídá fázi 1. Od 25. 8. do dneška (6. 9.) nepřibyla žádná další.
- Hotovo: ✅ Infrastruktura (skript, checklisty)
- Zbývá: 🔄 Stahování a nasazení dalších ~94 skladeb ze Suno na zbylá podtémata

### 🚀 Další kroky:
1. Otevř https://suno.ai/me (tvůj Suno profil)
2. Stáhni 50+ skladeb (Download button na každou)
3. Spusť: `python3 ~/Desktop/wonderly-web/suno-organize.py --auto`
4. ✅ Hotovo — skladby se zorganizují samy


2026-09-12T02:38:57.602817+02:00
## Lokální doplňování F8 — první téma Mechanická práce a výkon
- Tento celek není z hlediska nově požadovaných médií kompletní. Jediný aktuální stav: ../Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md; důkazy ../Omega/dokumenty/wonderly-audit/8/mechanicka-prace-video-denik.md.
- Hotový animovaný pilot je místně v Omega/podkasty-video/mechanicka-prace-dialog.mp4; přenos na Mini a technická/vizuální kontrola ověřeny. Video není nahrané do R2 ani zapojené jako dostupné veřejné médium.
- V místním pracovním stromě je společná píseň zapojena i u Výkonu a obě podtémata odkazují na existující Fyzikální ligu s předvolbou tohoto celku. Celá brána i nový build prošly; nové HTML obsahuje oba odkazy a píseň. Herní test skutečného JS používá reálnou banku42 otázek.
- Zbývají další videa/polemiky, statická infografika Výkonu a laborka Mechanické práce; po nich závěrečná inventura. Změny nejsou commitnuté ani tímto během publikované. Nenačítán další těžký model vedle cizí gemma4:26b; podrobný stav pokračování je v kanonickém checkpointu, nikoli zde.


2026-09-12T07:45:26.878817+02:00
### F8 — bezpečná příprava při cizí modelové obsazenosti
Nově připravený a vyrenderovaný návrh infografiky Výkonu a laboratorního listu Mechanické práce, zatím mimo web a bez obsahové brány. Pilot neopakován, žádná publikace. Kanonický stav a jediný další krok: ../Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md, poslední AKTUÁLNÍ CHECKPOINT; podrobnosti v mechanicka-prace-video-denik.md.


## Historie — 12. 9. 2026: pilot Mechanické práce a píseň u Výkonu
- Publikační balík pouze pro F8: první plně animovaný díl Mechanické práce s přiznáním AI a existující společná píseň zapojená také u Výkonu. Nové výklady, kvízy ani herní kód tento commit neobsahuje.
- Pilot v existujícím R2, SHA256 535bed1edce8c653760df004107575dfe1e045753b0276781c68cbc116dd5df2; zpětný R2 get i browser fetch živé mediální URL potvrdily shodných2146630 B. Předchozí obsahová kontrola prvního scénáře Gemma31b bez nálezu, pokrytí skupiny21/21 a finální technická/vizuální kontrola pilotu doloženy v Omeze.
- Základ aktuální origin/main8da45ea; starý MacBook main byl zastaralý, jeho odmítnutý push nic nepřepsal. Čistý oddělený worktree zachovává novější zápisy i odstranění starých infografik. Nový get/set pouze materialy obou podtémat, outsideRangeUnchanged=true a read-back; zkontroluj.mjs a npm run build exit0.
- Herní odkazy/předvolba zatím místně: chybí doložené nezávislé code review. Infografika Výkonu a laborka Mechanické práce zůstávají DRAFT_WAITING_CONTENT_REVIEW. Cizí načtený model nevypnut, jiný velký model nenačten.
- Celé téma není dokončeno. Kanonický stav a ověření nasazení po pushi: Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md; důkazy Omega/dokumenty/wonderly-audit/8/mechanicka-prace-video-denik.md.


### F8 — upozornění na neúplnou sérii (2026-09-12T10:45:18.450924+02:00)
- U pilotu výslovně uvedeno, že další díly připravujeme a série není úplná. Nemění se učivo, média, odkazy ani kód; jde o pravdivý publikační stav. Dokončení série ani celého tématu tím není splněno. Kanonický stav: ../Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md.


## Historie — 2026-09-12T11:20:42.545186+02:00 — Infografika Výkon (F8)
Doplněn základní přehled výkonu z podkladů učitele: vztahy, jednotky, porovnání práce a času, kWh. Nezávislá kontrola gemma4:31b BEZ NÁLEZU, vizuální kontrola a výpočty ověřeny; detail Omega/dokumenty/wonderly-audit/8/vykon-infografika/. Zapojeno pouze u Výkonu, společná píseň zachována. Pokračování videosérie stále není hotové.


### F8 — laborka Držení a zvedání (2026-09-12T11:49:53.123894+02:00)
- Doplněn jeden laboratorní list Mechanické práce z PDF kotev str.1/2/4; měření zůstává prázdné, skutečný pokus nebyl proveden.
- Nezávislá Gemma31b kontrola bez nálezu, přesný JSON hash a095b5fd8757311a40d5e87e284cb788abeca350bf43e97c22628720c3a2dbe0; převzetí rodičem proti zdroji a schématu.
- Dokončení celého F8 stále NE. Navazující videa čekají doložení zdrojů tří příkladů a výrobu; pilot ani infografika se neopakují. Kanonický checkpoint: ../Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md.
- Brána, nový build a skutečné nasazení se ověřují před označením publikace za dokončenou.


### F8 — dokončení přijaté série Mechanická práce (2026-09-13)
- Uživatel po poslechu přijal druhý a třetí díl. Přesně připnuté MP4 byly bez nové výroby nahrány do R2 a zapojeny k podtématu Mechanická práce; první díl už neslibuje chybějící pokračování.
- Výkon zůstává beze změny se čtyřmi zveřejněnými díly. Další podobná videa k Mechanické práci ani Výkonu se nevyrábějí.
- Publikační důkazy (R2 hashe, build, commit, origin/main a živé přehrávání) jsou v kanonickém BOTS checkpointu na Mini.


### F7 — Klid a pohyb tělesa: cílená oprava podle PDF (2026-09-13)
- Výklad a 21 otázek navázány výhradně na PDF Pohyb tělesa str.1–4. Odstraněny nepodložené pojmy kinematika, vztažná soustava a nulová rychlost i otázka na převod kilometru. Doplněno přirovnání stromu vůči Slunci a rozdíl trajektorie/dráhy z podkladu.
- Nezávislé obsahové kontroly Gemma31b po opravě přesných vstupů bez nálezu; původně odhalené dva úniky odpovědí opraveny bez změny bran. Zkontroluj rc0, 0 duplicit/úniků, build478 stránek, cílená RED/GREEN regrese s mutantem.
- Zdrojová mapa, reporty a důkazy: Omega/dokumenty/wonderly-audit/7/klid-a-pohyb-*. Původní materiály, interakce a laborka zachovány; nejsou nově obsahově schvalovány tímto zápisem. Polemika/video a píseň zatím nejsou doplněné, celé podtéma není hotové.


### F9 Magnety — nová statická infografika
- Přidán přehled šesti panelů dle zdroje, bez změny hotového výkladu a kvízu. Gemma31b review2 přesné v3 BEZ NÁLEZU, skutečný PNG vizuálně vyhovuje, layout RED v1/v2 → GREEN v3 (59 textů, žádný překryv ani ořez). Důkazy Omega/dokumenty/wonderly-audit/9/magnety-opakovani-infografika/.
- Tři hotové audio díly nadále čekají na poslech, nejsou touto změnou zapojeny. Celé F9 není dokončeno, žádná práce F7.


### F9 Magnety — laboratorní práce
- Zapojen nový list Póly magnetů a kompas jako detektor pole, převzatý z připraveného v4 s úpravou pouze dvou odkazů na stránkování pro webovou šablonu. Nezávislá Gemma31b kontrola navrh-web.json2da8977…00702a BEZ NÁLEZU. Tabulka zůstává prázdná, pokus netvrzen jako provedený.
- Důkazy Omega/dokumenty/wonderly-audit/9/magnety-opakovani-laborka/; původní PDF neměněno. Audio nadále čeká na skutečný poslech.


### F9 Magnetické pole — zapojení existující hry
- Doplněn odkaz Fyzikální liga do všech tří podtémat. Nevznikla nová hra ani banka: skutečný JS předvolí ročník9/celek magneticke-pole a identických66 otázek; ověřen i původní režim bez parametrů a neplatná předvolba.
- Blokové get/set zachovalo všechna ostatní pole a původní odkazy. Důkaz Omega/dokumenty/wonderly-audit/9/magneticke-pole-herni-zapojeni.json; regrese existujícím testem v magnety-opakovani-laborka/hra-predvolba-test.json.


## F9 — infografika vodiče a cívky (2026-09-13)
Nová statická přehledová infografika pro magneticke-pole-vodice-a-civky. PDF kotvy a nezávislé review přesné verze BEZ NÁLEZU; skutečný PNG1200×1940, SHA2568b4fb0c00bce887f59ea4e5c9b164161faa06387797209e2c4ab6111f1877134, vizuálně ověřeno. RED/GREEN oprava kolize kružnice s nadpisem. Existující výklad, kvíz a odkazy nezměněny. Celé F9 stále nedokončeno; kanonický stav v Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md.


### F9 — laboratorní práce Proud v cívce a směr magnetky (2026-09-13T23:22:47.820215+02:00)
- Nový pracovní list: bezpečný školní zdroj s proudovým omezením, čtyři pozorované situace a prázdná tabulka; nejde o provedený pokus. Nezávislá kontrola Gemma31b BEZ NÁLEZU pro přesný návrh623a4b1c740a3ad5c146b80fdea7862fc9ad22bdf33dd288d15213f749bab368.
- Node syntax, inventura, zkontroluj a build prošly; přesný import a všechna pole skutečné dist routy ověřena. Živé nasazení se přebírá odděleně. Jediný stav a další krok: ../Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md. Audio A/B tím není zveřejněno, celé F9 stále nedokončeno.


### F9 — zapojení společné písně (2026-09-13T23:27:25.496375+02:00)
- Původní výrobní evidence hudba-suno/EVIDENCE.md dávka5 určuje Ze severu na jih pro celý celek magneticke-pole. Stejný existující M4A beze změny bajtů doplněn u vodiče/cívky a elektromagnetu. Nejde o novou píseň ani obsahový reaudit hotového média.
- Blokové set/get potvrzují nezměněná ostatní pole; zkontroluj/build PASS a dvě dist routy obsahují přesnou cestu. Živé převzetí samostatně v kanonické matici Omega/dokumenty/WONDERLY-FYZIKA-7-9-MATICE.md. Audio polemiky tím není publikováno.


### F9 — nová infografika Elektromagnet (2026-09-14T00:03:30.065994+02:00)
- Nový přehled šesti principů a schematická značka souvislé cívky s jádrem. PDF kotvy, Gemma31b review2 BEZ NÁLEZU, opakovaná vizuální kontrola a41 getBBox bez kolizí/ořezů. Původní nejednoznačné vinutí zachováno, RED/GREEN důkazy v Omega/dokumenty/wonderly-audit/9/elektromagnet-infografika/.
- Blokový get/set, inventura, hlavní brána a build PASS; konkrétní dist obsah ověřen. PNG SHA25608cc3621845cecdc8e00bb1328a7684861ec1afe35a1ebc2f70e24960961342b. Živé nasazení se přebírá samostatně v kanonické matici. Audio dialogy nejsou tímto publikovány.

### Nástroj `podtema.mjs` — závazná cesta pro strojový zápis do temata.ts (2026-09-21)
- Nový `podtema.mjs` + `podtema-lock.py`: bezpečný get/set polí podtématu přes klíč
  predmet/rocnik/tema/podtema, AST parsing (`@babel/parser`), flock, atomický zápis.
  Syntaxe: `node podtema.mjs ROOT get|set KLIC [FIELD JSON_FILE]`. Od dneška ZÁVAZNÁ
  cesta pro strojový zápis do `temata.ts`; `@babel/parser` a `esbuild` přidány do devDependencies.
- Schéma `zapis` rozšířeno o pole `vzorecSlovy` (vzorová přestavba energie F8, viz `SAMOSTATNY-REZIM.md`).

### F9 jaderná fyzika HOTOV 4/4, F8 chemické zdroje napětí zapsáno (2026-09-21)
- `jadro-atomu`, `radioaktivita` (F9) a `chemicke-zdroje-napeti` (F8, 8. ročník)
  zapsány přes `podtema.mjs`, `zkontroluj.mjs` i build PASS, dist obsahuje
  klíčová čísla (146, tři složky, klíč od auta). Nálezy do `KE-SCHVALENI.md`
  body 17–19.

### F7 vztlaková síla HOTOV 2/2, F8 elektřina 4/15 (2026-09-21)
- `archimeduv-zakon`, `telesa-stejnoroda-a-nestejnoroda` (F7) a `elektricky-naboj`,
  `elektricke-pole`, `vznik-elektrickeho-proudu` (F8) zapsány přes `podtema.mjs`,
  `zkontroluj.mjs` i build PASS, dist obsahuje klíčová slova (ponořené části,
  plastelín, elektroskop, Faradayov, blesk). Nálezy do `KE-SCHVALENI.md` body 20–21.

### F8 elektřina HOTOVO 15/15, 6. celky rozjety (2026-09-21 až 22)
- Zbývajících 11 podtémat F8 elektřina dokontrolováno a zapsáno podle PDF
  učitele (A+B+C+D výklad + ZAPIS), každé prošlo nezávislým kontrolorem
  (Opus, čerstvý kontext, 2–3 kola kontrola→oprava); zapsáno `podtema.mjs`,
  `zkontroluj.mjs` i build PASS. Commity `518c599`, `e78b938`, `ff77438`,
  `d491ea0`; push `d491ea0` ověřen curlem na lab.wonderly.cz
  (`ucinky-proudu-a-bezpecnost`, `elektricky-proud-v-kovech-odpor`,
  `elektricke-obvody`) — curl bez hlavičky `User-Agent` vrací 403.
- Kde se web a PDF lišily, platilo PDF (např. LED úspora 70 %); poznámky
  „k rozhodnutí učitele" se do textu nepíšou. Pracovní soubory
  `rozpracovane-vyklady/2026-09-21/` commitnuty. Sladění kvízů F8 elektřina
  s novými výklady zatím NEUDĚLÁNO.
- Rozjeto 6. celků: F7 `atmosfera-a-tlak-vzduchu` (3), F8 `zvuk` (3), F9
  `energie-a-vesmir` (3; `vesmir-a-galaxie` bez PDF, zdroj popis prezentace
  `9 vesmir_a_jeho_vznik.md`); pracovní složka
  `rozpracovane-vyklady/2026-09-22-6-celky/`, 1. vlna 4 výkladů běží.

### 6. celky HOTOVO 9/9 a nasazeny (2026-09-22)
- F7 `atmosfera-a-tlak-vzduchu` (atmosfericky-tlak, pretlak-podtlak-vakuum,
  meteorologie-a-mereni-tlaku), F8 `zvuk` (kmitani-a-vlneni,
  zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost), F9 `energie-a-vesmir`
  (obnovitelne-a-neobnovitelne-zdroje, slunecni-soustava, vesmir-a-galaxie)
  dokončeny; každé podtéma prošlo nezávislým kontrolorem (Opus, čerstvý
  kontext) ve 2–3 kolech; zapsáno `podtema.mjs`, `zkontroluj.mjs` i build PASS.
- Zdroje: PDF učitele 1:1 (Škola/7/3 Mechanické vlastnosti kapalin 16–18,
  Škola/8/6 Zvuk 33–35, Škola/9 str. 21–22); `vesmir-a-galaxie` bez PDF →
  zdroj popis prezentace `Omega/dokumenty/prezentace-popisy/9
  vesmir_a_jeho_vznik.md`. PDF mělo přednost před webem (kromě zjevných chyb
  extrakce, např. Torricelli 1643); „stojaté vlnění" z prezentace do kmitání
  nezařazeno; 3. Keplerův zákon ponechán s citací PDF str. 23; ZAPIS sluneční
  soustavy zkrácen z 39 na 19 bodů (strop ~22).
- Commity `40b59cb` (F7), `547cd5f` (F8 zvuk), `104047b` + `e91813c` (F9);
  push `e91813c`; curl ověřen s User-Agent na slunecni-soustava,
  kmitani-a-vlneni, atmosfericky-tlak — ANO. Pracovní složka
  `rozpracovane-vyklady/2026-09-22-6-celky/` (výklady + protokoly
  kontrola-*-a/b/c.md + README.md) commitnuta.
- Nález pro sladění kvízů: `zkontroluj.mjs` hlásí nesoulad čísla galaxií
  v kvízu (100 vs. 200 dle nového výkladu) — první konkrétní důkaz, že
  kvízy je nutné sladit. Past dne: worker někdy vloží cizí značku
  (`</content>`) nebo poznámku „k rozhodnutí učitele" — kontrolor to chytá.
- DALŠÍ KROK: (c) sladění kvízů s novými výklady — rozsah 24 podtémat
  (F8 elektřina 15 + 6. celky 9) + dříve přestavěné F8 celky 1–4; průzkum
  stavu kvízů právě běží.

### Krok (c): sladění kvízů 24 podtémat HOTOVO (2026-09-22, noc)
- HOTOVO pro 24 podtémat: F8 elektřina 15, F7 `atmosfera-a-tlak-vzduchu` 3,
  F8 `zvuk` 3, F9 `energie-a-vesmir` 3. Všech 24 mělo už 21 otázek — šlo
  čistě o věcný soulad s novými výklady.
- Postup: nezávislý kontrolor kvízů (Opus, čerstvý kontext) → nálezy v
  pevném tvaru s návrhem znění → exekutor zapracoval do `kvizy.ts` (jediný
  zapisovatel, 21 otázek drženo) → brány `uniky.mjs`+`zkontroluj.mjs`+build
  → DRUHÉ kolo kontrolora → opravy. 1. kolo 144 nálezů; 2. kolo 46 nových
  nálezů zanesených opravami (F9 10, elektřina 9–15 10, atmosféra+zvuk 11,
  elektřina 1–8 15) — pravidlo „kontrolor dvakrát" se potvrdilo.
- Commity: `4f53733`, `eab8bfc`, `7a51d3b` (F9); `d5cfb32`, `62d5ef2`
  (elektřina 9–15); `013ab2f`, `1383466` (atmosféra+zvuk); `98e1290`,
  `4652cbd` (elektřina 1–8). Push `4652cbd`; curl s User-Agent ověřen:
  `elektricky-proud-v-kovech-odpor`, `atmosfericky-tlak`,
  `vesmir-a-galaxie` — ANO. Protokoly:
  `rozpracovane-vyklady/2026-09-22-6-celky/sladeni-kvizu-*.md` (1. kolo +
  `-2kolo.md`, sekce ZAPRACOVÁNO).
- Mezery bran: `zkontroluj.mjs` bod 6d přeskakuje čísla ≤12 (`const MALE =
  12`) → neviděl 1,29 vs 1,23 kg/m³; `uniky.mjs` hlásil 0, kontrolor ručně
  našel 10 délkových nápověd (náskok ≥10 znaků) a 5 úniků v 8 blocích.
  Zelené brány ≠ doklad sladění.
- Rozjeto: sladění kvízů dříve přestavěných F8 celků 1–4 (17 podtémat:
  `mechanicka-prace`, `vykon`, `energie-a-jeji-premeny`,
  `pohybova-a-polohova-energie`, `zakon-zachovani-mechanicke-energie`,
  `energeticka-hodnota-potravin`, `vnitrni-energie-telesa`,
  `tepelna-vymena-a-teplo`, `tepelny-motor-parni-stroj`, `spalovaci-motory`,
  `teplo-a-premeny-skupenstvi`, `tani`, `tuhnuti`, `vyparovani`, `var`,
  `kondenzace`, `skupenske-zmeny-vody-v-prirode`) — 2 kontroloři běží.
- DALŠÍ KROK: dokončit F8 celky 1–4, pak podle bodu E projít, co ještě
  chybí k „hotovému tématu" u přestavěných celků.

### Krok (c): sladění kvízů F8 celků 1–4 HOTOVO (2026-09-22) — kvízy 41/41 sladěny
- F8 celky 1–4 (17 podtémat) sladěny: 1. kolo 91 nálezů (celky 1–2: 48,
  celky 3–4: 43), 2. kolo 18 nových (10 + 8). Commity `a14c6cd`, `c72728e`,
  `40dac2a`, `530c64c`; push `530c64c`; curl ověřen (tani, vykon,
  spalovaci-motory — ANO). Spolu s dřívějšími 24 podtématy sladěno celkem
  41/41 podtémat.
- Odloženo (kosmetika): `tepelna-vymena-a-teplo` — sjednocení zápisu
  „4200"→„4 200" spouští bránu `uniky.mjs` (substring), ponecháno; zapsáno
  v `sladeni-kvizu-f8-celky-1-2-2kolo.md`.
- NOVÁ PAST: curl na `lab.wonderly.cz` bez cache-busting parametru vrací
  z Cloudflare cache starý obsah (`cf-cache-status: HIT`); s
  `?cb=<čas+náhoda>` přijde čerstvý — ověřovací smyčka musí posílat
  User-Agent i cache-busting query.
- Průzkum bodu E: všech 41 přestavěných podtémat má simulaci; 7 nemá pole
  `odkazy` (F7 atmosfericky-tlak, pretlak-podtlak-vakuum,
  meteorologie-a-mereni-tlaku; F8 kmitani-a-vlneni, zvuk-vznik-a-sireni,
  vnimani-zvuku-a-hlasitost; F9 slunecni-soustava) — rozjeto 3 workeři médií
  (jen české odkazy, videa ne).

### Odkazy u 7 podtémat HOTOVO, bod E 41/41; sladění kvízů F7/F9 celků 1–5 rozjeto (2026-09-22)
- Doplněno 23 českých odkazů: F7 atmosfericky-tlak, pretlak-podtlak-vakuum,
  meteorologie-a-mereni-tlaku (3+3+3); F8 kmitani-a-vlneni,
  zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost (4+4+4); F9
  slunecni-soustava (2, 2 návrhy zamítnuty kontrolorem). Postup: worker
  médií (jen odkazy, videa ne) → nezávislý kontrolor (curl 200, čeština,
  věcnost, Wordwall pokrytí) → exekutor zápis. Commit `989e549`, push,
  ověřeno živě. Bod E kompletní pro 41/41 přestavěných podtémat.
- Nález: F7 celky 1–5 (18 podtémat) a F9 celky 1–5 (20 podtémat) mají
  výklad HOTOVO, ale kvíz NESLADĚN s novým výkladem — dle definice
  hotového tématu tedy nejsou hotová, přestože vedena jako HOTOVO. Rozjeto
  sladění (4 kontroloři: F7 1–2, F7 3–5, F9 1–2, F9 3–5); poté F7 7. celek
  `svetlo-a-jeho-sireni` (PDF Škola/7/4 Světlo 19,20,21,24) a 8. celek
  `zrcadla-a-cocky` (PDF 22,23,25,26,28,29).
- Past tvaru dat: pole `odkazy` zná jen `nazev` a `url`; Techmania odkazy
  psát s `https://`.

### Sladění kvízů F7/F9 celků 1–5 HOTOVO — kvízy 79/79 přestavěných podtémat sladěny (2026-09-22)
- F7 celky 1–5 (18 podtémat) a F9 celky 1–5 (20 podtémat) sladěny: 1. kolo
  243 nálezů (F9 1–2: 49, F7 1–2: 51, F7 3–5: 73, F9 3–5: 70), 2. kolo 80
  nových (21+14+20+25). Čtyři bloky zkráceny z 22–24 na 21 otázek
  (magnety-magneticke-pole-opakovani, prenos-elektricke-energie,
  chemicke-zdroje-napeti F9, ucinky-proudu-bezpecnost,
  jaderny-reaktor-elektrarna).
- Commity `2755995`, `ec5eb42`, `37f5a32`, `d2ca18f`, `2f62f40`, `0762e8f`,
  `b4968f2`; push `b4968f2`; curl ověřen (radioaktivita, hydrostaticky-tlak,
  transformator — ANO). Celkem sladěno 79/79 přestavěných podtémat; bod E
  splněn kromě odkazů u F7/F9 celků 1–5 (nezjišťováno — do fronty).
- Mezery měřidel: `cisla-ve-vykladu.mjs` přeskakuje otázky s číslem v
  zadání (`if (vZadani.length) continue`) → neviděl 200 N vs 175 N, 220 vs
  231 km; `uniky.mjs` porovnává podřetězce jen uvnitř bloku a přes české
  skloňování → nevidí přeformulované úniky ani duplicity mezi bloky.
- Rozjeto F7 7. celek `svetlo-a-jeho-sireni` (4 podtémata, PDF Škola/7/4
  Světlo 19, 20, 21, 24; popis prezentace SVĚTELNÉ JEVY 7): výklady
  napsané, 1. kolo kontroly zdroje PROŠLO S DROBNOSTMI, odraz a stín
  NEPROŠLO, lom PROŠLO S DROBNOSTMI, opraváři běží; pracovní složka
  `rozpracovane-vyklady/2026-09-22-svetlo/`.

### F7 svetlo-a-jeho-sireni HOTOVO 4/4; F7 zrcadla-a-cocky v běhu (2026-09-22)
- F7 7. celek `svetlo-a-jeho-sireni` HOTOVO 4/4 (svetlo-jeho-zdroje,
  odraz-svetla, lom-svetla, stin-faze-mesice): zdroje PDF Škola/7/4 Světlo
  19, 21, 24, 20 + popis prezentace SVĚTELNÉ JEVY 7; 2 kola nezávislé
  kontroly (1. kolo 29 nálezů, 2. kolo 1 věcný + 16 drobností); zapsáno
  `podtema.mjs`, build i `zkontroluj.mjs` OK; commit `c453d06`, push OK;
  curl ověřen (lom-svetla, stin-faze-mesice — ANO). Doloženy a opraveny
  2 fyzikální chyby PDF podkladu (teplota povrchu Slunce 4 500 °C → 5 500 °C,
  „krvavý Měsíc" ohyb → lom a rozptyl) —
  `Omega/dokumenty/kontrola-podkladu-fyzika7.md`. Kvíz F7 světlo zatím
  NESLADĚN s novým výkladem — zařadit do kroku sladění spolu se zrcadly.
- Rozjeto F7 8. celek `zrcadla-a-cocky`: 6 výkladů napsáno
  (optika-rovinneho-zrcadla, kulova-zrcadla-dute-zrcadlo, opticka-cocka,
  oko-vady-oka, rozklad-svetla-duha, vnimani-barev; PDF 22, 23, 25, 26, 28,
  29), 1. kolo kontroly: rovinné DROBNOSTI 5, kulová DROBNOSTI 9, čočka
  NEPROŠLO 8, oko DROBNOSTI 4, rozklad DROBNOSTI 2, barvy DROBNOSTI 6,
  opraváři běží; pracovní složka `rozpracovane-vyklady/2026-09-22-zrcadla/`.

### F7 zrcadla-a-cocky HOTOVO 6/6 a nasazeno; kvízy světla sladěny, zrcadla v kontrole (2026-09-22)
- F7 8. celek `zrcadla-a-cocky` HOTOVO 6/6 podtémat (optika-rovinneho-zrcadla,
  kulova-zrcadla-dute-zrcadlo, opticka-cocka, oko-vady-oka, rozklad-svetla-duha,
  vnimani-barev): zdroje PDF Škola/7/4 Světlo 22, 23, 25, 26, 28, 29 (+27 jen
  1 věta „nad rámec"), 2 kola nezávislé kontroly (1. kolo 34 nálezů, 2. kolo
  1 věcný + 15 drobností); commit `2d7e7c9`, push OK; curl ověřen
  (opticka-cocka, kulova-zrcadla — ANO).
- Kvízy F7 `svetlo-a-jeho-sireni` SLADĚNY: 1. kolo 44 nálezů zapracováno,
  commit `41c196a`, nasazeno; 2. kolo kontroly běží. Kvízy `zrcadla-a-cocky`
  v 1. kole kontroly (2 kontroloři).
- Past dne: dva exekutoři na různých souborech (`temata.ts` × `kvizy.ts`) se
  potkali na společné bráně `zkontroluj.mjs`/prebuild — rozpracovaný `kvizy.ts`
  s dočasným únikem zablokoval build tomu druhému; exekutor správně
  necommitoval a dokončil se až po commitu kvízů. Pravidlo: brány běží nad
  celým repem, souběžné zápisy do různých datových souborů se musí dokončovat
  po jednom.

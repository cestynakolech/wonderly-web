# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 NEJDŘÍV OTEVŘI `SAMOSTATNY-REZIM.md`
> **Aktuální stav práce, živá fronta úkolů i jediný seznam otevřených dotazů na učitele
> jsou v `SAMOSTATNY-REZIM.md`, v jeho NEJHORNĚJŠÍ sekci** — ne tady. Tenhle soubor je
> spíš technická příručka (jak co přidat, kde co leží); jeho jednotlivé sekce mohou být
> staršího data. Fronta je JEDINÁ pro celý web (sekce `[fox]`, `[skola2]`, `[cesty]`) —
> každá položka nese na začátku značku, do které sekce patří.
>
> ### Poslední stav: **22. 8. 2026 večer — kvízy fyziky 7 dorovnány, celá fyzika 6–9 na cíli 21**
> Fyzika 7 dorovnána na 21 otázek (10 bloků, 44 nových otázek, doplněny 2 věty výkladu
> duhy/barev). Kontrolor 0 nálezů, nasazeno commit `acceba4`, ověřeno obsahem na produkci.
> Celá fyzika 6–9 tím splňuje cíl 21 otázek na podtéma. Zbývá informatika + Pč (424 otázek).

## ⏩ Jak navázat v nové session
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

## Historie — 23. 8. 2026 večer (mini jako pracoviště)
Mac mini vybaven jako plnohodnotné pracoviště Claude Code (skilly/agenti/paměť/repa),
obousměrný sync paměti (`sync-mini-pamet.sh`), hybridní směrování práce
(`Omega/SMEROVANI-PRACE.md`), spouštěcí rohatka `wonderly-uloha.sh` se stropem 10/den;
dokumentační balík pro učitele (8 dokumentů) na Macu i disku T7. Otevřené: allowlist
Hermese nevynucuje omezení technicky (viz paměť `projekt-mini-jako-pracoviste`).

## Historie — 23. 8. 2026 — nedělní WONDERLY AUDIT
Kotvy zelené: `zkontroluj.mjs` exit 0 (3145 otázek/166 bloků, 130 komponent),
`vsechny-simulace.mjs` exit 0 (2567 kontrol), `uniky.mjs` exit 0 (0 duplicit/0 úniků),
`test_bez_kopii.py` exit 0 (dluh 0), lab.wonderly.cz + cesty.wonderly.cz HTTP 200.
3 nezávislí kontroloři → 3 nálezy, všechny opravené: (1) `denik_chyb.py` slučoval 46
pádů 10 různých testů do jedné „opakované třídy" — rozděleno podle názvu testu, ověřeno
obousměrně; (2) `AUTOMATY.md` měl dva protichůdné řádky o `cz.wonderly.hlidac-ticha` —
sloučeno; (3) `PROGRESS.md` měl duplicitní bloky „Předchozí stav" — obsah přenesen do
Historie a bloky odstraněny. Kontrolor oprav s čerstvým kontextem: 0 nálezů. Starší
poplach „`com.omega.foto-kontrola-kvality` nenahraný v launchd" už neplatí — automat
běží (ověřeno launchctl). Startovní čtení: 144 677 B (před auditem 145 646 B, −969 B).
POZNÁMKA: metrika dosud nebyla v bajtech (starší záznam 30. 7. je v tokenech,
neporovnatelný) — od 23. 8. 2026 definice: součet `wc -c` CLAUDE.md + PROGRESS.md +
SAMOSTATNY-REZIM.md + skill wonderly (SKILL.md + START.md). Toto je základna pro příští neděle.

## Historie — 22. 8. 2026 (revize starších simulací dokončena)
Revize kvality starších simulací dokončena 37/37, 6 nálezů opraveno a nasazeno
(panáčci, Binarni, páka, kladka, Ozobot, přetlak). Kvíz `soubory-slozky-aplikace`
dorovnán na cíl 21 otázek.

## Historie — 22. 8. 2026 (dokončeny úkoly z rozhodnutí učitele)
**Dokončeny oba úkoly z „ROZHODNUTÍ UČITELE 22. 8. 2026" (SAMOSTATNY-REZIM.md):**
1) měď vs. hliník ve vedení rozlišeno ve výkladu i kvízu `prenos-elektricke-energie`
(F9), commit `8c31c26`; 2) bezpečné vzdálenosti od vedení vráceny obrazně do
`ucinky-proudu-bezpecnost` (F9), commit `acd1292`. Kvíz po zásahu: F9
`prenos-elektricke-energie` 22 otázek, `ucinky-proudu-bezpecnost` 24 otázek.
Nezávislý kontrolor běžel do 0 nálezů (7, resp. 8 kol). **3 body čekají na
rozhodnutí učitele** (ochranná pásma vedení — rozpor prezentace vs. zákon
458/2000 Sb.; práh ~50 V na kůži; bezpečné napětí 50 V st/120 V ss v suchu —
podklad SmartBooks je útržkovitý) — viz blok „ČEKÁ NA ROZHODNUTÍ UČITELE
(23. 8. 2026)" v SAMOSTATNY-REZIM.md.

## Historie — 22. 8. 2026 noc (uzávěrka bloku, rozhodnutí učitele)
**Dokončena názornost fyziky:** 92 ze 101 podtémat má simulaci, zbylých 9 jsou
shrnutí/úvod, kde simulace nedává smysl. **Audit starších simulací F8:** 10
komponent (teplo/skupenství, elektřina), 5 vad opraveno, commit `8af0dfc`.
**Kontrola podkladů F9** kompletní (22 PDF, protokol
`Omega/dokumenty/kontrola-podkladu-fyzika9.md`), **F8 dokončen** (protokol
doplněn), nasazeno commity `d834875` a `3ed197c`. Nezkontrolováno:
„Od_výbuchu_k_pohybu_Svět_motorů.pdf" (F8) — obrázkové PDF bez textové vrstvy.
**Pokrytí materiálů fyziky:** kvíz 116/116, simulace 107/116, video 61/116,
písnička 22/116, infografika 17/116 (F8 i F9 nula) — infografiky další velký
úkol. **Lokální modely:** sběr verdiktů rozšířen na filtry map a rozmazávání
(dřív rozhodovaly bez měření), hlídač rolí vidí i přiřazení přes slovník
v `graf_local.py`. Zjištění: žádný dostupný lokální model neprošel zároveň
zkouškou `cestina` i `kontrola` (grounding) — offline kontrola textů je proto
nespolehlivá. **ROZHODNUTÍ UČITELE 22. 8. 2026** (viz blok nahoře
SAMOSTATNY-REZIM.md) — 3 věcné opravy (měď/hliník ve vedení, bezpečné
vzdálenosti obrazně vrátit, energie potravin nechat obecně) + obecné pravidlo
„obsah pro ZŠ, podrobnosti do budoucí nadstavby". Otevřeno: připravit učiteli
souhrn o možnostech orchestrace lokálních modelů (dotaz nestihnut zodpovědět).
**Audit nasazených simulací dokončen pro VŠECHNY ročníky:** F8 (22. 8., 5 vad
opraveno, commit `8af0dfc`), F9 (23 komponent, 0 nálezů), F6+F7 (48 komponent,
1 nález = falešný poplach u tíže planet, vysvětlen v kódu commitem `6469422`).
Kotva `node testy/vsechny-simulace.mjs` exit 0 (37 souborů, 2567 kontrol).

## Historie — 22. 8. 2026 večer (samostatný režim)
**NASAZENO A OVĚŘENO:** simulace síly jako vektoru (F7, podtéma `sila`) —
`src/components/skola2/SilaVektorSimulace.astro`, klíč interakce `sila-vektor`, commit
`fdb6cd7`, curl na produkci potvrdil `sv-f`, `sv-jed`, `sv-smer-90`, značení `Fg`. Kontrolní
smyčka měla PĚT kol (3→2→1→2→0 nálezů): porovnání desetin na rovnost (hláška se nikdy
nezobrazila), skládání sil mimo výklad podtématu (obsah zúžen), tíha značená „G" místo
`Fg`, posuvník nikdy nedosáhl „bedna se zvedá" (mrtvá větev), plaketa useknutá/popisky mimo
scénu u 10 z 55 kombinací. Poučení: autor si má sám před odevzdáním projet všechny kombinace
ovládání a ověřit obalové obdélníky, pravdivost hlášek a celá čísla.
**NASAZENO:** `testy/nahled-simulace.mjs` umí nově `cas=<sekundy>` — snímek až po doběhnutí
animace (commit `4996115`), bez argumentu beze změny (ověřeno shodným otiskem).
**ROZDĚLANÉ:** simulace k podtématu `klid-a-pohyb-telesa` (F7).
**FRONTA NÁZORNOSTI** zkrácena na 10 podtémat (viz SAMOSTATNY-REZIM.md).
**NASAZENO A OVĚŘENO (dávka 4 revize):** F6 `cas-a-jeho-mereni` — doplněn výklad úlohy s Ozobotem (obvod, obsah, v=s/t) dle prezentace Dráha puzzle, `OzobotSimulace.astro` zeštíhlena na cm/s, commit `a9f671b`; zkontrolováno 20/37 simulací.

## Historie — 22. 8. 2026 (samostatný režim)
**NASAZENO:** simulace vlastní vodivosti polovodiče (`PolovodicVodivostSimulace.astro`)
zapojena k `polovodice-vlastni-vodivost` (F9) přes klíč `polovodic`. Kontrolor: 0 nálezů
(neplete vlastní a příměsovou vodivost, scéna prohlédnuta při −20 °C i 100 °C). Commit `c73087f`,
curl ověřil `pol-svg`, `pol-slider`, `pol-teplomer-sloupec`, `pol-vzorec`, `pol-castice`, `pol-zarovka`.
**ROZDĚLANÉ:** simulace vektoru síly F7 (`SilaVektorSimulace.astro`) — hotová, čeká na
prohlédnutí scény, kontrolora a zapojení do `temata.ts`, necommitnuto.
**ZJIŠTĚNÍ:** `testy/vsechny-simulace.mjs` měří jen komponenty s ručním testem v
`testy/simulace/*.mjs` — nové simulace (Dioda, Ozvěna, PolovodicVodivost, RychlostSvetla)
takový test nemají, počet „37 souborů" o nich mlčí. Do fronty: dopsat chybějící testy nebo
zviditelnit, které komponenty ruční test nemají.

## Historie — 21. 8. 2026 ráno
**Fyzika 6 dokončena, celá fyzika 6–9 KOMPLET na 21 otázkách.** 16 bloků F6 zkontrolováno
2 nezávislými kontrolory + 1 po opravách; nálezy: 3 otázky mimo výklad nahrazeny, 5 oprav
brány, 1 nesoulad s výkladem opraven. Commit `8fb4e0d`, tag `kvizy-fyzika-21-komplet`.
Souběžně noční stavba propojení Maců: opraven Tailscale, obousměrné SSH, git fronta
`wonderly-fronta` se 54 migrovanými úkoly, `tep.py` + hlídač ticha, Ollama na mini
s modely bge-m3 a qwen3:8b.

## Historie — 19. 8. 2026 večer (uzávěrka)
**Fyzika 8 KOMPLET: všech 35 podtémat na 21 otázkách.** Dnes přibylo 187 otázek v 8 dávkách
(kvízové commity 7868c64, e996a51, 530e6d6, 1cb25f0, 1100df4, 55261f1 + dvě dávky v 166835a
a e6d576d). Každá dávka prošla nezávislým kontrolorem; chyceno: otázka o turbodmychadlu
mimo probranou látku, duplicity mezi bloky, nepravdivé hlášení o úniku (vyvráceno git stash
+ uniky.mjs). Rozšířeny výklady 3 podtémat (rezistor-s-promennym-odporem,
energeticka-hodnota-potravin, elektricky-proud-mereni), aby kvíz netestoval neprobranou látku.
Ollama povýšena 0.32.9 → 0.32.14, stažen qwen3.8:27b-mlx (18 GB), zkouška na TEPLOTA.pptx:
23/23 snímků, 0 selhání, ~1,6x pomalejší než ThinkingCap (16,2 vs. 10 min). popis_prezentace.py
rozšířen o POPIS_MODEL/POPIS_OPTIONS/POPIS_VYSTUP (zpětně slučitelné). Zbývá dořešit chybějící
otázky: F6 88, F7 39, F9 155 (F8 už 0) — čísla z odpoledního měření, přepočet příště.

## Historie — 22. 8. 2026 odpoledne (samostatný režim, pokračování bloku názornosti)
**NASAZENO 4 simulace/opravy v jednom bloku, vše ověřeno curlem na produkci:**
- Klid a pohyb (F7, `klid-a-pohyb-telesa`, `RelativitaPohybuSimulace`) — commit `2a31dc9`.
- Bezpečná vzdálenost od vedení (F9, `ucinky-proudu-bezpecnost`, `BezpecnaVzdalenostVedeniSimulace`) — commit `67af855`.
- Posuvný a otáčivý pohyb (F7, `posuvny-otacivy-pohyb`) + oprava věcné chyby ve výkladu
  („po úplně stejné trajektorii" → „dráhy mají stejný tvar i délku a jsou rovnoběžné, ale
  nejsou totožné", temata.ts + 2× kvizy.ts) — commit `179d699`.
- Výměna simulace `pusobeni-teles-a-deformace` (F7): stará dělila deformaci podle VELIKOSTI
  SÍLY, výklad a kvíz ji dělí podle MATERIÁLU (guma vs. plastelína) — commit `573ebc9`,
  starý soubor `UcinkySilySimulace.astro` zachován nezapojený.
- Povětrnostní mapa (F7, `meteorologie-a-mereni-tlaku`, `PovetrnostniMapaSimulace`) —
  commit `36259f7`. 6 kol kontroly odstranilo vymyšlený vzorec „vítr = rozdíl tlaku × 1,5 km/h"
  a kreslený barograf (nahrazen pevnou mřížkou 3 hodnot). Curl potvrdil `meteo-svg` na 2. pokusu.

**Poučení:** průzkum názornosti nad textem se spletl a označil pokryté podtéma za
nepokryté — měřit se musí nad naimportovanými daty s křížovou kontrolou proti větvím
stránky. Přeměřeno: chybí 5 podtémat — F6: `uvod-do-fyziky`, `telesa-a-latky`,
`vzajemne-pusobeni-teles-sila`; F7: `priklady-na-vypocet-rychlosti`,
`telesa-stejnoroda-a-nestejnoroda`. Obecná kontrola scény (obalové obdélníky všech
prvků proti sobě, přes všechny kombinace ovládání) je jediná, co spolehlivě chytá vady —
kontrola po jedné třídě vad pokaždé jednu nechala projít.

## Historie — 22. 8. 2026 večer (samostatný režim, dokončení fronty názornosti)
**NASAZENO A OVĚŘENO posledních 5 simulací — FRONTA NÁZORNOSTI FYZIKY JE PRÁZDNÁ:**
povětrnostní mapa (F7 `meteorologie-a-mereni-tlaku`, commit `36259f7`), stejnorodá a
nestejnorodá tělesa (F7 `telesa-stejnoroda-a-nestejnoroda`, commit `bb66548` + doplnění
hustot do výkladu), výpočet rychlosti (F7 `priklady-na-vypocet-rychlosti`) a třídění
těleso vs. látka (F6 `telesa-a-latky`) společným commitem `65db871`, vzájemné působení
těles (F6 `vzajemne-pusobeni-teles-sila`, commit `11492a7`). Přeměřeno nad daty: 101
podtémat fyziky 6.–9., 92 má simulaci, 9 ne — 8 opakovacích shrnutí (logicky bez
simulace) + `uvod-do-fyziky` (rozhodnuto: simulace nedává smysl, jediný jev pokrývá video).
**Nástroj:** `testy/nahled-simulace.mjs` opraven podruhé (commit `434958a`) — sandbox
teď zvládá dynamicky vytvářené prvky (`createElementNS`+`appendChild`); `RozpadSimulace`
se dosud kreslila prázdná (0 kruhů), teď 400.
**Poučení:** kontrola scény musí být OBECNÁ (obalové obdélníky všech prvků proti sobě
i okrajům, přes všechny kombinace ovládání) — kontrola po jedné třídě vad vždy jednu
nechala projít. Simulace nesmí tvrdit vzorec, který výklad neučí — doplnit výklad, ne
vymýšlet vztah. Animace potřebuje společné měřítko dráhy, jinak lže pořadí v cíli.
**Čím pokračovat:** názornost fyziky hotová, další cíl je kontrola kvality STARŠÍCH
simulací týmiž měřítky (obecná kontrola překryvů, opora čísel ve výkladu) — nové
kontroly odhalily vady i v už nasazené práci.

## Historie — 22. 8. 2026 pozdě večer (audit už nasazených simulací 8. ročníku)
Po dokončení fronty názornosti začal AUDIT NASAZENÝCH simulací týmiž novými
měřítky. Prověřeno 10 komponent 8. ročníku (teplo/skupenství a elektřina),
nalezeno 5 vad, všechny opraveny a nasazeny commitem `8af0dfc`, nezávislá
kontrola 0 nálezů: (1) čtyři nepodložená tvrzení (rozpad účinnosti tepelného
motoru na %, var vody 90 °C v horách, „−5 °C na lžíci soli", 1 V „Voltův
článek" u zinek+měď mimo výklad) odstraněna nebo převedena na kvalitativní
popis; (2) hláška o pohybu částic bez napětí ve `VznikElektrickehoProuduSimulace`
se zobrazovala vždy místo jen při 0 V, opraveno podmínkou; (3) oprava textu u
`TuhnutiSimulace` zavedla přetečení viewBoxu (128 znaků do 660 px), opraveno
zalomením a zkrácením, při té příležitosti nalezeno i starší přetečení
(„led zabírá víc místa", 7 px přes okraj).
**POUČENÍ:** audit se vyplácí — vady byly ve „vedené jako hotové" práci. Nová
trvalá třída kontroly: MĚŘENÍ ŠÍŘKY TEXTU proti okrajům viewBoxu a panelu
(odhad z počtu znaků, velikosti a tučnosti písma).

## Historie — 22. 8. 2026 noc (revize starších simulací, dávka 1)
Revize 5 nejstarších simulací dokončena, kontrolor 0 nálezů. Opraveno: (1)
`SkladaniSilSimulace` — panáčci od 3. kusu mimo viewBox, přerovnáno do mřížky
3×2 (commit `7801897`); (2) doplněn výklad bit/bajt/ASCII k podtématu
soubory-slozky-aplikace + 6 otázek kvízu (blok 10→16, commit `d09155d`).
Nasazeno, ověřeno curl přímo na produkci (slovo „bajt" na živé stránce).
**POZOR NA MĚŘIDLA:** dvakrát si pracovník upravil vlastní měřidlo současně
s opravou komponenty, celkový počet kontrol klesl (2579 → 2567). Nezávislá
kontrola pokles rozebrala a mutačními testy doložila, že měřidla nezeslábla
(proporční ubrání odstraněné položky + sloučení kategorií). Pravidlo: sáhne-li
pracovník na vlastní měřidlo, musí to nezávislý kontrolor prověřit podvrhem.
**OMEZENÍ NÁSTROJE (do fronty):** `testy/nahled-simulace.mjs` neumí
vyrenderovat simulace kreslené do `<canvas>` (padá na
`platno.getContext is not a function`), např. `ElektrickePoleSimulace` — dá
se prověřit jen čtením kódu, ne okem. Stojí za doplnění.
**Čím pokračovat:** audit dalších ročníků (6., 7., 9.) týmiž měřítky.

## Historie — 22. 8. 2026 (dávka 2 revize simulací)
Nasazena dávka 2 revize simulací: PakaSimulace a KladkaSimulace opravené
(commit `292ec38`), kvíz `soubory-slozky-aplikace` dorovnán na 21 otázek
a zbaven křížových úniků (commit `64ed687`), ověřeno curl na produkci.

## Historie — 22. 8. 2026 (brána úniků posílena a nasazena)
Brána `testy/uniky.mjs` posílena (flexe, slovník tématu, distraktory, pojistka
temata, jednotky ²/³), 50/50 měřidel obousměrně doloženo. Po opravě 106 textů
0 úniků, smazána zastaralá `UcinkySilySimulace` (schválil učitel), nasazeno
a ověřeno HTTP 200 (commit `cbbebb9`). V Omeze: kontroloři llama3.1 vyměněni
za gemma4:26b/qwen3:30b-a3b, hlídač rolí měří doménovou zkouškou, návody
lokál+Hermes srovnány, nový skill `/kolega`.

## Historie — 19. 8. 2026 pozdní večer (kvízy fyziky 9 KOMPLET)
**Fyzika 9: vsech 22 podtemat na 21 otazkach** (155 novych otazek v 5 vlnach; klicove commity
vlozeni a oprav az po `7d3d2c9`). Kontrola: **TŘI paralelní nezávislí kontroloři** nad celým
rozsahem (magnetismus/střídavý proud · elektřina/polovodiče · jádro/vesmír) — nálezy 0+1+2,
vše opraveno: prohozené hranice vzdáleností od spadlého vedení (20 m ↔ 400 kV), vágní
vysvětlení u záření gama (vráceno olovo/beton), překryv aktivní zóny s kontejnmentem
(nahrazeno moderátorem). **Cíl 21 otázek: F7, F8 i F9 hotové**, zbývá jen fyzika 6 (88 otázek,
přesné rozdělení změřit) a pak informatika/Pč (rozhodnutí učitele „teď jen fyzika" platí).
Otevřeno: nesoulad bezpečných napětí F8×F9 (ve frontě).

## Historie — 19. 8. 2026 (kontrola fyzikálních jednotek DOKONČENA)
Prošlo se všech **98 simulací s fyzikální jednotkou** (z 118 komponent `src/components/skola2/`),
5 nezávislých kontrolorů. Jediná vadná: **`OerstedSimulace`** (chyběla μ0, poloměr v cm místo m →
22° místo 11°) — **OPRAVENO** (B = μ0·I/(2π·r), tan α = B/B_Země; kontrolor: PROJDE). **`VrhSimulace`
byla už opravená** commitem `dfd800e` — evidence ji mylně vedla jako neopravenou, oprava potvrzena
(dolety sedí s teorií na 0,2 %). `DifuzeSimulace` a `CaraSimulace` prošly bez nálezu, uzavřeno.
`snimky_podkastu.py` sjednocen na konstantu `PX_NA_CM = 25` (kontrolor: PROJDE). Build po opravách:
brána „✅ Vše zapojené správně", 2579 kontrol testů simulací, 0 spadlo, 469 stránek. Nový podnět do
fronty: sjednotit `s_pevna_tvar_objem` (17 px/cm) na `PX_NA_CM`. Otevřeno pro učitele: přegenerovat
`skupenstvi-latek-dialog`, `6/objem-dialog`, `6/souhrnne-opakovani-velicin-dialog`? Podrobně
v `SAMOSTATNY-REZIM.md`, nahoře.

## Historie — 19. 8. 2026 odpoledne (uzávěrka pracovního bloku)
**Nasazeno:** kvízy F8 dorovnány z 12 na 21 otázek u 6 podtémat (54 nových otázek): `ohmuv-zakon`,
`elektricke-napeti-mereni`, `elektricky-proud-v-kovech-odpor` (commit **7868c64**) a
`zavislost-odporu-na-vodici`, `zapojeni-spotrebicu-za-sebou`, `zapojeni-spotrebicu-vedle-sebe`
(commit **e996a51**); obě dávky prošly nezávislým kontrolorem (první opravila 2 střední nálezy,
druhá bez nálezu). Kontrola fyzikálních jednotek DOKONČENA a opravena `OerstedSimulace`
(commit **b96c935**, viz stav výše). **Evidence srovnána s měřením** nad naimportovanými daty:
celý web **891 chybějících otázek / 124 podtémat pod cílem 21**, jen fyzika **447 / 78**, F8 **138**
(staré číslo 495 bylo zastaralé a počítalo jen fyziku). Do fronty: přegenerovat `6/objem-dialog` a
`6/souhrnne-opakovani-velicin-dialog` (stejné vadné měřítko jako `skupenstvi-latek-dialog`), sjednotit
`s_pevna_tvar_objem` (17 px/cm) na `PX_NA_CM = 25`, zpřísnit práh délkové nápovědy v `zkontroluj.mjs`
(dnes 15 znaků, kontrolor našel těsný případ, který prošel).

## Historie — 19. 8. 2026 v noci (uzávěrka session)
**Nasazeno:** kvízy F8 elektřina — `elektricke-pole`, `vznik-elektrickeho-proudu`, `elektricke-obvody`
na **21 otázek**, `elektricky-proud-mereni` na 18 (víc výklad neunese, podnět k rozšíření zapsán);
commity **6262f9f**, **17084f4**. **Popisy prezentací fyziky 6 KOMPLETNÍ** (6 nových, ověřeno proti
obsahu) — blokáda fyziky 6 padla; běží dávka na ostatní ročníky. Zavedena **úspora kontextu**
(agenti max 1 500 znaků, do sdílených souborů píše jen exekutor, historie v archivech).
Prezentace `Škola/6/05 Čas/,.pptx` přejmenována na **`Čas a jeho měření.pptx`** (i její popis).
**Nálezy:** `popis_prezentace.py` nenastavoval `num_ctx` → jel na ~4096 místo 262144 a **tiše ořezával**
vstup (opravuje se, hotové popisy možná předělat); kostka 170 px → 10 cm opravena v `snimky_podkastu.py`,
ale **chybná verze je v nasazeném videu `skupenstvi-latek-dialog`** (čeká rozhodnutí);
`VrhSimulace.astro` (F7 pohyb) — **opravena** (viz nejnovější stav výše, potvrzeno 19. 8.);
mírnější podezření `DifuzeSimulace` a `CaraSimulace` prošla kontrolou bez nálezu. **Díl 15 se přepracovává** — učitel rozhodl, že v polemikách se MAREK plete a EVA
ho opravuje (pravidlo v ústavě, skillu i zadání); zvuk i videa znovu, nasazení až po kontrolorovi.
**Otevřeno pro učitele:** přegenerovat `skupenstvi-latek-dialog`? opravit `VrhSimulace`? povýšit
ollamu (0.32.9 < potřebných 0.32.12, blokuje zkoušku Qwenu 3.8 dne 20. 8. odpoledne)? napsat
Petru Němcovi o svolení k jeho 13 videím?
**Fronta a přesný postup: `SAMOSTATNY-REZIM.md`, úplně nahoře.**

## Historie — 19. 8. 2026 (uzávěrka dlouhé session, vše commitnuté a pushnuté)
**Nasazeno:** zrušena placená výroba zvuku (zarážka v obou skriptech, zvuk je výhradně
lokální OmniVoice — učitel hlas schválil); odstraněno **41 cizích videí** z webu (zůstalo
50 videí učitele) a postavena **brána `testy/cizi-videa.mjs`** + seznam `testy/youtube-vlastni.json`
(neschválené YouTube ID shodí build, funguje offline); smazány všechny pokyny k vyhledávání
videí (záloha v `Omega/rozdelane/smazane-pokyny-vyhledavani-videi.md`); nasazeno **12 vlastních
animací** k výkladu fyziky 6; měřidlo `testy/uniky.mjs` porovnává čísla i s jednotkou a odhalilo
**8 skutečných úniků** (opraveny); kvízy F7 kladka + nakloněná rovina 10 → 19 a F8 teplo 12 → 18;
opraveny 3 otázky testující mimo výklad; deník: 3 mrtvá videoId, 4 data míst, 9 názvů videí,
Kluesserath (3 díly) a Neumagen-Dhron (2 díly) na YouTube; opraven hlídač automatů.
**Nově vznikla obsahová ústava `OBSAH-PRAVIDLA.md`** (řetěz PDF + prezentace → text výkladu →
kvízy/hry/videa), zapojená do zadání všech workerů a skillů.
**Závazná rozhodnutí učitele 19. 8.:** kvíz cíl **21 otázek/podtéma** (5–8 je jen velikost dávky);
prezentace rovnocenné s PDF; chybějící popisy prezentací dopsat automatem před další prací na
fyzice 6; rozdíl plán × web není vada webu; hry defaultně jen probrané učivo; **ostatní předměty
se teď nedělají — jen fyzika**; na web jen vlastní videa učitele; hotová videa se nepředělávají.
**Rozděláno:** díl 15 `pololetni-shrnuti` (zvuk část 1 hotový, 2–4 se vyrábějí — nenasazovat bez
nezávislé kontroly), popisy 6 prezentací (čeká na GPU), dorovnání kvízů na 21 (**chybí 495 otázek
u 82 podtémat**: F6 76, F7 39, F8 225, F9 155), deník Trittenheim + výměna Kluesserath 3 → 6 dílů.
**Fronta a přesný postup: `SAMOSTATNY-REZIM.md`, úplně nahoře.**

## Historie — 16. 8. 2026 (polemiky-podkásty F6 dokončeny díly 7–14)
**Polemiky-podkásty F6 díly 7–14** (čas a měření, teplota, teplotní roztažnost, elektrické a magnetické vlastnosti,
jednoduché obvody, pokusy, souhrnné opakování veličin) — všechny nasazené,
nezávisle zkontrolované, nálezy opravené (viz commity ba80617…ed585b6 v git logu).
Doplněna média 8. ročníku fyziky (27 podtémat, commity 21b8dc6…0d803d6) a zapojeny
3 hotové simulace Informatiky 9 (d0861d1). Rohatka délkové nápovědy utažena na
**616/28 %** (`node zkontroluj.mjs`). **Díl 15 `pololetni-shrnuti` NENÍ BLOKOVÁN** —
scénáře hotové (4×, brána 24/24 v `Omega/podkasty-scenare/6/`), vyrobí se
lokálně OmniVoice. Detaily a fronta v `SAMOSTATNY-REZIM.md`.

## Historie — 3. 8. 2026 (kolo D1 — 4 nové simulace informatiky)
**Kolo D1: 4 nové simulace informatiky naráz** (klonování ve Scratchi, vstupy micro:bitu, rádio micro:bitu, první program ve VEXcode);
názornost informatiky **30 → 26** podtémat bez názornosti. Měřidlo `testy/nazvy-bloku.mjs`
rozšířeno o vzory `pokud ⟨⟩ tak` a „náhodnou hodnotu" i s obousměrným důkazem.
Druhá kontrola oprav z kola D1 mezitím proběhla (viz záznam „14. 8. večer" níže
v Historii) — dobová sekce „🔴 NEDOKONČENO Z KOLA D1" v `SAMOSTATNY-REZIM.md`
už dnes neexistuje (uzavřená kola se stěhují do archivu). Předchozí stav (2. 8.):
hluché stránky 36 → **0**, dojetý celý audit kontrol (brána čte data, měří se i mapa
„všechna místa", slovník druhů materiálu, mutační test simulací).


## 📝 Pravidlo aktualizace (na konci každé session)
1. Přidej NOVÝ datovaný záznam do sekce „Historie" níže (staré NEmaž — je to lidsky čitelná historie).
2. Aktualizuj sekce „HOTOVÉ" a „ZBÝVÁ" výše podle reálného stavu.
3. `git add -A && git commit && git push` (i PROGRESS.md se tím uloží na GitHub jako verze).
4. Po dokončení celého ročníku/velkého celku přidej git tag jako milník.

> ⤵️ Historická část (od původního řádku 183) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — beze změny, jen se nečte automaticky.


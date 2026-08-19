# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 NEJDŘÍV OTEVŘI `SAMOSTATNY-REZIM.md`
> **Aktuální stav práce, živá fronta úkolů i jediný seznam otevřených dotazů na učitele
> jsou v `SAMOSTATNY-REZIM.md`, v jeho NEJHORNĚJŠÍ sekci** — ne tady. Tenhle soubor je
> spíš technická příručka (jak co přidat, kde co leží); jeho jednotlivé sekce mohou být
> staršího data. Fronta je JEDINÁ pro celý web (sekce `[fox]`, `[skola2]`, `[cesty]`) —
> každá položka nese na začátku značku, do které sekce patří.
>
> ### Poslední stav: **19. 8. 2026 (uzávěrka dlouhé session)** — vše commitnuté a PUSHNUTÉ
> **Nasazeno:** zrušena placená výroba zvuku (zarážka v obou skriptech, zvuk je výhradně
> lokální OmniVoice — učitel hlas schválil); odstraněno **41 cizích videí** z webu (zůstalo
> 50 videí učitele) a postavena **brána `testy/cizi-videa.mjs`** + seznam `testy/youtube-vlastni.json`
> (neschválené YouTube ID shodí build, funguje offline); smazány všechny pokyny k vyhledávání
> videí (záloha v `Omega/rozdelane/smazane-pokyny-vyhledavani-videi.md`); nasazeno **12 vlastních
> animací** k výkladu fyziky 6; měřidlo `testy/uniky.mjs` porovnává čísla i s jednotkou a odhalilo
> **8 skutečných úniků** (opraveny); kvízy F7 kladka + nakloněná rovina 10 → 19 a F8 teplo 12 → 18;
> opraveny 3 otázky testující mimo výklad; deník: 3 mrtvá videoId, 4 data míst, 9 názvů videí,
> Kluesserath (3 díly) a Neumagen-Dhron (2 díly) na YouTube; opraven hlídač automatů.
> **Nově vznikla obsahová ústava `OBSAH-PRAVIDLA.md`** (řetěz PDF + prezentace → text výkladu →
> kvízy/hry/videa), zapojená do zadání všech workerů a skillů.
> **Závazná rozhodnutí učitele 19. 8.:** kvíz cíl **21 otázek/podtéma** (5–8 je jen velikost dávky);
> prezentace rovnocenné s PDF; chybějící popisy prezentací dopsat automatem před další prací na
> fyzice 6; rozdíl plán × web není vada webu; hry defaultně jen probrané učivo; **ostatní předměty
> se teď nedělají — jen fyzika**; na web jen vlastní videa učitele; hotová videa se nepředělávají.
> **Rozděláno:** díl 15 `pololetni-shrnuti` (zvuk část 1 hotový, 2–4 se vyrábějí — nenasazovat bez
> nezávislé kontroly), popisy 6 prezentací (čeká na GPU), dorovnání kvízů na 21 (**chybí 495 otázek
> u 82 podtémat**: F6 76, F7 39, F8 225, F9 155), deník Trittenheim + výměna Kluesserath 3 → 6 dílů.
> **Fronta a přesný postup: `SAMOSTATNY-REZIM.md`, úplně nahoře.**
>
> Poslední stav: **16. 8. 2026** — polemiky-podkásty F6 dokončeny díly **7–14**
> (čas a měření, teplota, teplotní roztažnost, elektrické a magnetické vlastnosti,
> jednoduché obvody, pokusy, souhrnné opakování veličin) — všechny nasazené,
> nezávisle zkontrolované, nálezy opravené (viz commity ba80617…ed585b6 v git logu).
> Doplněna média 8. ročníku fyziky (27 podtémat, commity 21b8dc6…0d803d6) a zapojeny
> 3 hotové simulace Informatiky 9 (d0861d1). Rohatka délkové nápovědy utažena na
> **616/28 %** (`node zkontroluj.mjs`). **Díl 15 `pololetni-shrnuti` NENÍ BLOKOVÁN** —
> scénáře hotové (4×, brána 24/24 v `Omega/podkasty-scenare/6/`), vyrobí se
> lokálně OmniVoice. Detaily a fronta v `SAMOSTATNY-REZIM.md`.
>
> Poslední stav před tím: **3. 8. 2026** — kolo D1: **4 nové simulace informatiky naráz**
> (klonování ve Scratchi, vstupy micro:bitu, rádio micro:bitu, první program ve VEXcode);
> názornost informatiky **30 → 26** podtémat bez názornosti. Měřidlo `testy/nazvy-bloku.mjs`
> rozšířeno o vzory `pokud ⟨⟩ tak` a „náhodnou hodnotu" i s obousměrným důkazem.
> Druhá kontrola oprav z kola D1 mezitím proběhla (viz záznam „14. 8. večer" níže
> v Historii) — dobová sekce „🔴 NEDOKONČENO Z KOLA D1" v `SAMOSTATNY-REZIM.md`
> už dnes neexistuje (uzavřená kola se stěhují do archivu). Předchozí stav (2. 8.):
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
**NÁZORNOST (zadání učitele 31. 7. 2026):** dobové číslo je zastaralé, aktuální stav
je změřený přímo nad daty `node testy/nazornost.mjs` (18. 8. 2026): **26 podtémat
ze 166 je bez jakékoli názornosti** (simulace/infografika/video), z toho fyzika 6 i 7
po 2 (obě shrnutí, která ji nepotřebují), fyzika 8 2, fyzika 9 2, informatika
7.–9. ročník dohromady 15 (6+3+6) a Pracovní činnosti 3. Pořadí dalších kol i fronta
z auditu viz `SAMOSTATNY-REZIM.md`.
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

## 📝 Pravidlo aktualizace (na konci každé session)
1. Přidej NOVÝ datovaný záznam do sekce „Historie" níže (staré NEmaž — je to lidsky čitelná historie).
2. Aktualizuj sekce „HOTOVÉ" a „ZBÝVÁ" výše podle reálného stavu.
3. `git add -A && git commit && git push` (i PROGRESS.md se tím uloží na GitHub jako verze).
4. Po dokončení celého ročníku/velkého celku přidej git tag jako milník.

> ⤵️ Historická část (od původního řádku 183) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — beze změny, jen se nečte automaticky.


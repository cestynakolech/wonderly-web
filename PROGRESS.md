# PROGRESS.md — technický stav práce

_Technický přehled projektu (základ z 31. 7. 2026). Souběžně čti `CLAUDE.md` (trvalý kontext)._

> ## 🚩 NEJDŘÍV OTEVŘI `SAMOSTATNY-REZIM.md`
> **Aktuální stav práce, živá fronta úkolů i jediný seznam otevřených dotazů na učitele
> jsou v `SAMOSTATNY-REZIM.md`, v jeho NEJHORNĚJŠÍ sekci** — ne tady. Tenhle soubor je
> spíš technická příručka (jak co přidat, kde co leží); jeho jednotlivé sekce mohou být
> staršího data. Fronta je JEDINÁ pro celý web (sekce `[fox]`, `[skola2]`, `[cesty]`) —
> každá položka nese na začátku značku, do které sekce patří.
>
> ### Poslední stav: viz Historie níže (nejnovější datovaný záznam) — tyhle snapshoty
> duplikovaly stejné zápisy v sekci Historie 1:1, smazány auditem 27. 9. 2026
> (K3-Z1), znění beze ztráty zůstává v Historii pod stejným datem/commitem.

## ⏩ Jak navázat v nové session
_Aktuální stav přestavby výkladu vede `SAMOSTATNY-REZIM.md`, ne tato sekce._
1. Přečti `CLAUDE.md`, pak **`SAMOSTATNY-REZIM.md` (horní sekce)** a podle potřeby tenhle soubor.
2. Rychlá kontrola stavu:
   ```
   cd ~/Desktop/wonderly-web && git log --oneline -5 && node zkontroluj.mjs
   ```
   Brána musí skončit `✅ Vše zapojené správně.` — běží i sama v `prebuild`.
3. **Fyzika 6–9 má napsaný obsah** (výklad+kvíz, tagy `fyzika-6/7/8/9-hotova`) včetně
   „Shrnutí a opakování" u každého ročníku, ALE podle rozšířené definice „hotového
   tématu" (`OBSAH-PRAVIDLA.md` kap. 12, 9 složek vč. podkastu/videa) hotová NENÍ —
   aktuální díru vede nejhornější sekce `SAMOSTATNY-REZIM.md` (rozpor K3-R14 opraven
   27. 9. 2026).
4. Co je právě na řadě (living fronta, ne ruční výčet zde): nejhornější sekce
   `SAMOSTATNY-REZIM.md`, blok „⚡ ČÍM ZAČÍT" (oprava V9-3, 27. 9. 2026). Informatika
   a Pracovní činnosti jsou ODLOŽENY rozhodnutím učitele 25. 9. 2026 — NEBRAT jako
   úkol, dokud fyzika není hotová. Podklady 6. roč. (pokud přece jen): `/Users/Shared/Škola/6/`.

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
**Fyzika 6–9: výklad+kvíz napsán pro všechna podtémata**, ale podle rozšířené
definice „hotového tématu" (`OBSAH-PRAVIDLA.md` kap. 12 — 9 složek vč. podkastu/videa
s animací) hotová NENÍ. Aktuální stav fronty (chybějící podkasty/videa, vata v kvízech,
mrtvé odkazy…) vede VÝHRADNĚ nejhornější sekce `SAMOSTATNY-REZIM.md` — čísla se sem
neopisují, protože zastarávají (opraveno auditem 27. 9. 2026, K3-R14).
Informatika a Pracovní činnosti jsou ODLOŽENY rozhodnutím učitele 25. 9. 2026, dokud
není hotová fyzika (`OBSAH-PRAVIDLA.md`, preambule).

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

## Historie — 27. 9. 2026: audit + sjednocení dokumentace (kolo 2, uzávěrka)

Commity Omega `12603d7` (detektor tajemství, V16 — poslední pokus), `3338a63`
(sjednocení návodů D3); wonderly-web `464ad69` (sjednocení návodů D3), `3da75a3`
(exekutor.md odkazuje na `_SPOLECNE.md`, rozsah zápisů dle `povoleni_hook.py`).
Úspora startovní dokumentace 171 948 → 111 084 B (ověřeno `Omega/METRIKY-KOL.md`).
Opravy V18 (rozpor „kdo zapisuje do sdílených souborů" — vloženo jako V18-4 do
❓ sekce, čeká na U1/U4) a pamětí kolo 2 (paměť sjednocena na `-Users-Shared--kola`
jako jediný živý domov, opuštěná složka `-Users-radek-soukromy-Desktop-Omega`
ověřena a označena mrtvá).

## Historie — 27. 9. 2026: nedělní WONDERLY AUDIT (závěr, 3.–6. kolo)

Souhrn celého dne v `Omega/dokumenty/audit-2026-09-27.md` (K1–K3 + opravy A/B/C).
Oprava falešného poplachu zálohy Omegy (nový detektor tajemství, 0 nálezů nad
HEAD, 104 testů). Startovní čtení 171 948 → 111 084 B (`Omega/METRIKY-KOL.md`,
nový soubor). `zkontroluj.mjs`/build/push/curl ověřeny zelené. Fronta a otevřené
dotazy na učitele sloučeny do `SAMOSTATNY-REZIM.md`, sekce „❓".

## Historie — 27. 9. 2026: nedělní WONDERLY AUDIT (zkrácení dokumentace, 2 kola)

- **1. kolo:** Exekutor A zkrátil startovní dokumentaci podle nálezů nezávislého
  kontrolora (K3): smazáním/přesunem 15 duplicitních „Poslední/Dřívější stav" bloků
  (K3-Z1), 26 historických záznamů z 12.–14. a 21.–22. 9. do `PROGRESS-ARCHIV.md`
  (K3-Z2), Suno-Wave1 bloku (K3-Z3), Kola 14. 8. (K3-Z4) a oprav stálých rozporů
  (K3-R14: „fyzika 100 % hotová" bylo zastaralé vůči `OBSAH-PRAVIDLA.md` kap. 12).
  SAMOSTATNY-REZIM.md a skill `/wonderly` zkráceny/opraveny souběžně (stav automatů
  dle `launchctl list`, ne dle datovaného textu v `PLAN-PORADEK.md`/`SKILL.md`, viz
  dodatek 27. 9. 2026 v `Omega/PLAN-PORADEK.md`).
- **2. kolo (V4-1…V4-12):** nezávislý kontrolor našel, že zkrácení 1. kola omylem
  ztratilo obsah — vráceno PLNÉ znění 11 archivovaných záznamů 21.–22. 9. (bylo
  zkrácené) a 10 nehotových úkolů z archivu zpět do živé fronty `SAMOSTATNY-REZIM.md`
  (cisla-ve-vykladu.mjs, uniky.mjs mezi bloky, odkazy F7/F9 1–5, shrnutí bez
  názornosti, MEMORY.md nad limitem, 22 kandidátů pravidel, cron pravidla-dluh-denne,
  kosmetika 4200→4 200, terminologie vaty, odložená informatika/Pč); opraveny
  2 dangling odkazy a nekonzistentní cesta k paměti projektu (sjednoceno na
  `-Users-Shared--kola`, ověřeno `ls`/`wc -l`). Přehled nálezů K1/K2/K3 a všech
  oprav uložen trvale do `Omega/dokumenty/audit-2026-09-27.md` (scratchpad zmizí).
  Součet `wc -c` čtyř startovních souborů (CLAUDE.md, PROGRESS.md,
  SAMOSTATNY-REZIM.md, skill SKILL.md) po 2. kole ≈ 93 000 B (proti výchozím
  171 948 B před auditem) — orientační, přesné číslo dá `wc -c` znovu, sem se
  neopisuje natrvalo (zastarává).

## Historie — 20.–23. 9. 2026: nedělní WONDERLY AUDIT

- Tři nezávislí kontroloři: opakované třídy chyb · kód vs. pravidla · bobtnání dokumentace.
- Sloučeny rozejité větve MacBooku a Mac mini (~100 commitů pozadu, konflikty v
  PROGRESS.md a temata.ts vyřešeny bez ztráty médií; lokální verze vedla na
  neexistující obrázek, který mini záměrně odstranil).
- PROGRESS.md zkrácen: 15 záznamů historie do archivu (−16 455 znaků), smazán
  duplicitní popis téže práce ze 12. 9. vzniklý sloučením větví.
- Postup nasazení měl JEDINÝ domov v CLAUDE.md; PROGRESS.md i skill `/wonderly`
  teď jen odkazují.
- Do `package.json` doplněny chybějící závislosti `@babel/parser` 7.29.7 a
  `esbuild` 0.27.7 (dosud jen cizí podzávislost, mohly zmizet).
- Deník chyb: `revize_automatu.py` sjednocuje tvar nálezu (`bez_dekorace()`),
  takže se pozná recidiva — 3 skutečné pády byly dosud vedené jako 12 záznamů;
  doloženo obousměrnou zkouškou.
- Hook `kontrola_syntaxe_hook.py` rozšířen na Bash: chytá Python v
  `python3 -c` i heredocu (třída `syntaxe-py` se vracela 19×); doloženo obousměrně.
- `ZASTAVENE-AUTOMATY-2026-09-12.md` lhal u tří automatů (`ohlas-se`, `tep`,
  `hlidac-ticha` běží) — opraveno podle `launchctl` a logů; 17 dalších záznamů
  ověřeno jako správné.
- Odstraněna příčina zbytečných dotazů na učitele: projektový vrátný
  `/Users/Shared/povoleni_hook.py` a orchestrátorský hook se rozcházely
  (allow × deny), proto se Claude Code ptal člověka; vrátný teď v
  orchestrátorském režimu vrací rovnou „deleguj subagentovi". Test vrátného:
  126 případů, obousměrně v pořádku.
- Kotvy: `zkontroluj.mjs` exit 0 · `testy/vsechny-simulace.mjs` 37 souborů /
  2 567 kontrol / 0 spadlo · `test_bez_kopii.py` 0 nových kopií · lab i
  cesty.wonderly.cz HTTP 200.
- Měření startovního čtení (`wc -c`, 23. 9. 2026): CLAUDE.md 5 348 ·
  PROGRESS.md 47 642 · SAMOSTATNY-REZIM.md 53 030 · skill SKILL.md 29 132 —
  součet 135 152 znaků, proti výchozí míře auditu 101 074 je to +34 078. Součet
  ale NENÍ čistý ukazatel škrtů: do PROGRESS.md a do fronty (SAMOSTATNY-REZIM.md)
  dnes přibyly zápisy z běžné práce jiných session souběžně s auditem.

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
Jediný domov: `CLAUDE.md` řádek 5 (nový datovaný záznam do Historie, HOTOVÉ/ZBÝVÁ,
commit+push, tag po velkém celku). Sem se neopisuje (K3-Z7, 27. 9. 2026).

> ⤵️ Historická část (od původního řádku 183) je v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — beze změny, jen se nečte automaticky.


> ⤵️ 15 záznamů z 12.–14. 9. 2026 (Mechanická práce/Výkon F8, Klid a pohyb F7, Magnety a
> vodiče/cívka F9) přesunuto do [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — audit
> 27. 9. 2026, K3-Z2 (10 012 B).

> ⤵️ 11 záznamů z 21.–22. 9. 2026 (`podtema.mjs`, F9 jaderná fyzika, F7 vztlaková síla,
> F8 elektřina 15/15, 6. celky, sladění kvízů 24+F8 1–4+F7/F9 1–5, F7 světlo i zrcadla)
> přesunuto do [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — audit 27. 9. 2026, K3-Z2
> (12 696 B).

### Úklid, dokumentace a kontrola kvality — 11 nasazení, 485 stránek (2026-09-23)
- 11 commitů nasazeno a ověřeno curlem: `1e5a9ba` úklid po pádu (kvízy zrcadel
  4–6, roční shrnutí F9) · `bf2fbe8` 9 bodů „PDF platí" + 3 chyby podkladu
  doloženy · `fbbcaed` 49 nálezů z 2. kol kvízů (světlo 29, zrcadla 20) ·
  `627738f` 46 prověřených odkazů u 19 podtémat · `696b335` body 11, 13, 18
  (nad rámec RVP) · `87aafa0` body 5, 7, ochranná pásma, směr proudu ·
  `c788c2d` nové podtéma klín a kvarky · `6bb6c7e` nové podtéma účinnost a
  alternativní motory · `48252bf` bezpečnostní text o účincích proudu
  (26 míst, 3 kola kontroly) · `13667e8` odblokování brány ·
  `23f5378`/`158eacd` pravidla o animacích + práh 0,50.
- Web vzrostl z 481 na 485 stránek (4 nová podtémata). Pravidlo: „hotové
  téma" má nově 9 složek (OBSAH-PRAVIDLA.md kap. 12, simulace a interaktivní
  infografika sloučeny), hra je samostatná na podtéma, práh animace = podíl
  unikátních snímků ≥ 0,50. `KE-SCHVALENI.md`: 16 z 21 bodů vyřízeno.
- Nové nástroje: `Omega/skripty/kontrola_odkazu.py` (curl + gemma4:26b,
  zkalibrováno), `Omega/skripty/kontrola_animace.py` (práh 0,50),
  `wonderly-web/testy/nastroje/vata-v-distraktorech.mjs` (mimo bránu, zapnout
  až po opravě bloků), opravený AST parser inventury.
- Otevřeno pro příští session: animace (z 62 videí animované jen 1),
  vata v kvízech (65/166 bloků, 7 oprav připraveno NEZAPSÁNO — čeká na
  učitele, podklady v `Omega/dokumenty/vata-pripravene-opravy/`), 9 mrtvých
  odkazů s náhradami připravenými v
  `Omega/dokumenty/nahrady-mrtvych-odkazu-2026-09-23.md` (NEZAPSÁNO), nález
  že prebuild brána jde obejít přes `npx astro build`, blok
  `teplota-a-jeji-mereni` má 22 otázek místo 21. Podrobná fronta a odkaz „jak
  navázat" jsou v horní sekci `SAMOSTATNY-REZIM.md`.

## Historie — 28. 9. 2026: kontrola plných animací a test lokálního modelu

Omega `9076e15`: skládání vyžaduje plné MP4 všech scén, ověřuje jejich délku a původ přes otisky textu, nahrávky, scénosledu i videa. Technická kontrola nenahrazuje prohlídku děje. Opraven NAVOD-ANIMACE-PODKASTU.md, návazný NAVOD-POLEMIKY-F6.md a skill podkast-video, který ještě vedl přes statické PNG. Tři výrobní služby pozastaveny; pět dokončených videí a šestý rozpracovaný díl ještě nejsou předělané. ThinkingCap Qwen3.8 Q4_K_M lokálně nainstalován a otestován na 90 případech; výchozí MLX ponechán (nestabilní jediný bod navíc, 2–2,9× pomalejší). Výsledky nezávisle přepočítané, viz Omega/dokumenty/thinkingcap-38-test-2026-09-28/STAV.md. Odeslání sedmi commitů Omegy do GitHub main odmítla automatická kontrola oprávnění; samostatný dotaz na tento přesný rozsah čeká na uživatele.

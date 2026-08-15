# NÁVOD PRO KOLEGU — předání projektu wonderly

Píšu to pro člověka (nebo Claude), který o projektu neví nic a má na něm zítra
pokračovat. Bez omáčky, prakticky.

## 1. Co to je

Statický web **wonderly.cz** (Astro, Cloudflare Workers, zdarma). Tři sekce na
subdoménách: **lab.wonderly.cz** = `/skola2` (2. stupeň — fyzika, informatika,
Pč), **cesty.wonderly.cz** = `/cesty` (cestovatelský deník), **fox.wonderly.cz**
= `/fox` (1. stupeň). Je to **JEDNO repo, JEDEN build, JEDEN Worker** —
subdomény jsou jen přesměrování podle Host hlavičky v `worker.js`. Push na
`main` nasadí **všechny tři sekce naráz**. Důsledek: rozbitá prebuild brána
kvůli jedné sekci zablokuje nasazení úplně všeho.

## 2. Kde se co dozvíš (v tomhle pořadí)

1. `SAMOSTATNY-REZIM.md` — sekce úplně nahoře „⚡ ČÍM ZAČÍT" (aktuální stav + co dělat teď)
2. `CLAUDE.md` — trvalý kontext, technologie, pravidlo řezu dokumentace
3. `.claude/orchestrator-prompt.md` — jak se pracuje (viz bod 3 níže)
4. `PROGRESS.md` — technická příručka (jak co přidat, kde co leží); sekce můžou být staršího data, nevěř jim slepě

Fronta úkolů je **JEDNA** pro celý web, žije jen v `SAMOSTATNY-REZIM.md`, položky
mají značky `[fox]` / `[skola2]` / `[cesty]`.

## 3. Jak se pracuje

Orchestrátorský režim: hlavní sezení **nedělá práci samo**, jen ji rozděluje a
sléváš výsledky. Skutečnou práci dělají subagenti: `exekutor`, `pruzkumnik`,
`kontrolor`, `worker-vyklad`, `worker-kviz`, `worker-simulace`, `worker-media`.
Zapíná se `/orch-on` (vytvoří `~/.claude/ORCHESTRATOR_ON`, vrátný pak hlavnímu
sezení blokuje Read/Edit/Write/Grep i neřídicí Bash), vypíná `/orch-off`.
Zahájení pracovního bloku: `/pokracuj`.

## 4. Měřidla a brány

| Příkaz | Co hlídá |
|---|---|
| `node zkontroluj.mjs` | hlavní brána — zapojení simulací, kvízy, mapy, čísla, názvy bloků; běží i v `prebuild` |
| `npm run build` | sestaví web do `dist/` (spustí prebuild = brána + testy simulací) |
| `node testy/nazornost.mjs` | kolik podtémat nemá žádnou simulaci/infografiku |
| `node testy/kratke-vyklady.mjs 1200` | najde „hluché" stránky (příliš krátký výklad) |
| `node testy/simulace/<nazev>.mjs <cesta ke komponentě>` | jednotkový test konkrétní simulace |
| `node testy/rozvrzeni-sceny.mjs <část názvu>` | kontrola rozvržení scény simulace |
| `node testy/nahled-simulace.mjs <PLNÁ cesta komponenty> <výstup.svg> svg=<id> [klik=<id>]` | vyrenderuje simulaci do SVG pro vizuální kontrolu |
| `node testy/mutace.mjs <nazev>` | **jen informativní** — je test simulace vůbec k něčemu? NENÍ to brána |
| `npm run prijmi-latku` | sníží rohatku po SKUTEČNĚ ověřené opravě |

Pasti u `nahled-simulace.mjs`: cesta ke komponentě musí být **PLNÁ** (ne
relativní), bere přesně **dva argumenty** (výstup + volby), a **nikdy ho
nepouštět přes rouru** — roura maskuje pád nástroje jako prázdný výstup.

## 5. Rohatky (ratchety)

`testy/rohatka.json` a `testy/obousmerne.json` drží čísla, která se smí jen
**snižovat** (např. počet otázek s příliš dlouhou správnou odpovědí). Nové
měřidlo musí mít zapsaný **obousměrný doklad**: test musí spadnout na
podvrženém/vadném vstupu a projít na zdravém — jinak brána shodí build.
Výjimka ze stropu se nezapisuje na seznam výjimek, ale musí být doložena
měřidlem. Snížení rohatky potvrzuje `npm run prijmi-latku` — jen po skutečné
opravě, ne předem.

## 6. Osm pastí, do kterých se tu už šláplo

1. Hlášení „hotovo" bez ověření — vždy ověřit **počtem** v souboru (grep/diff), ne tvrzením.
2. Viditelný stav simulace psaný přes `classList` nebo text mimo `<svg>` — náhledový nástroj to nevidí; stav patří jako SVG atribut.
3. Klik/animace bez viditelné změny ve výstupu — kontrolor to neodhalí, pokud se nezmění nic měřitelného.
4. Ohýbání komponenty podle omezení nástroje — správně je opravit NÁSTROJ, ne komponentu.
5. Relativní cesty v zápisu se rozvinou špatně (končily v `/Users/Shared/Škola` místo v repu) — psát vždy absolutní cestou.
6. Sloučený výpis dvou front deníku vedl ke ztrátě rozlišení — fronty se nesmí míchat beze značky.
7. Hledání názvu komponenty v živém HTML nefunguje — Astro ho při buildu zkompiluje pryč; hledat podle `id`.
8. Mutační test (`testy/mutace.mjs`) jako brána je falešná jistota — je jen informativní, do brány nepatří.

## 7. Nasazení

```
node zkontroluj.mjs        # brána musí skončit ✅
npm run build              # ověří sestavení (spustí i prebuild)
git add -A src public/materialy
git commit -m "..."
git push origin main       # Cloudflare nasadí samo, ~1 min
curl -s -o /dev/null -w '%{http_code}' https://lab.wonderly.cz/...   # ověření
```

Po pushi vždy ověřit `curl` na živé URL a hledat **konkrétní `id`** z komponenty
(ne jméno komponenty — to build zkompiluje pryč, viz past č. 7).

## 8. Cestovatelský deník

Pracovní prostor a skripty: `~/Desktop/Omega`. Data (fotky, videa): `/Users/Shared/Cestovatelský deník/`.
- Stav míst se čte **JEN** z `MISTA.xlsx` — nikde jinde.
- Pořadí trasy/zpracování drží `fronta_mist.py`, podle data focení.
- Video-automat čeká **7 dní** od nejnovějšího média dané skupiny přibalených míst, než místo zpracuje.
- YouTube nahrávání má **denní strop 5 videí**.
- Na Macu běží zámek dráhy `Omega/skripty/zamek_modelu.py`: vždy jen **jedna** těžká úloha v GPU dráze (ollama/vision) a **jedna** v CPU dráze (ffmpeg/build) současně — nikdy dvě naráz v téže dráze.

## 9. Na co se ptát učitele a co ne

Kroky, které ze zadání přímo plynou, se **neodklikávají** — dělají se rovnou.
Ptát se jen na: mazání a přesuny souborů (`rm`, `mv`), zásahy mimo pracovní
složky, publikování ven (YouTube, veřejné příspěvky), platby, instalace.
Vrátný, který tohle vynucuje: `/Users/Shared/povoleni_hook.py`, jeho test
`~/Desktop/Omega/skripty/testy/test_povoleni_hook.py` (113 případů).

## 10. Kde je teď práce

Přesný aktuální stav a co dělat jako první: `SAMOSTATNY-REZIM.md`, blok
„⚡ ČÍM ZAČÍT" úplně nahoře. Neopisuj si ho sem ani nikam jinam — opsaný stav
zastarává a klame (zavedený nález projektu).

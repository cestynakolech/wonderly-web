# PLÁN — F9 `magneticke-pole` (celek), 3 podtémata

Zjišťovací úkol 23. 9. 2026. Definice hotového tématu: 9 složek podle
`OBSAH-PRAVIDLA.md` kap. 12 (simulace + interaktivní infografika sloučené).
Klíče podtémat ověřeny v `src/data/temata.ts`: `magnety-magneticke-pole-opakovani`,
`magneticke-pole-vodice-a-civky`, **`elektromagnet`** (ne `elektromagnet-a-jeho-vyuziti`,
jak psalo zadání — správný slug je kratší).

## Stav 3× 9 (ověřeno přímo v datech/živě, ne odhadem)

| podtéma | výklad | zápis | kvíz | simulace/int.infografika | odkazy | video | infografika | laborka | hra |
|---|---|---|---|---|---|---|---|---|---|
| magnety-magneticke-pole-opakovani | ANO | ANO | 21, sladěn | ANO (`interakce: magnety-opakovani`) | ANO (3) | **NE** (jen audio) | ANO | ANO (`laborky.ts:57`) | NE |
| magneticke-pole-vodice-a-civky | ANO | ANO | 21, sladěn | ANO (`interakce: oersted`) | ANO (2) | **NE** (jen audio) | ANO | ANO (`laborky.ts:21`) | NE |
| elektromagnet | ANO | ANO | 21, sladěn | ANO (`interakce: elektromagnet`) | ANO (2) | **NE** (jen audio) | ANO | ANO (`laborky.ts:403`, jednoduché uvozovky) | NE |

**Důkazy:**
- výklad/zápis/odkazy/infografika/simulace: `node podtema.mjs "$(pwd)" get fyzika/9-rocnik/magneticke-pole/<slug>` (23. 9. 2026) — pole `obsah`, `zapis`, `odkazy`, `materialy[].druh==='infografika'`, `interakce`.
- kvíz: `node testy/vypis-kviz.mjs <slug>` → `21 otázek` u všech tří (u `elektromagnet` grep chytí navíc cizí blok `elektromagneticka-indukce`, ale skutečný blok tématu má taky 21).
- laborka: `grep -n "fyzika/9-rocnik/magneticke-pole" src/data/laborky.ts` → 3 klíče (řádky 21, 57, 403 — poslední zapsaný jednoduchými uvozovkami, proto ho starý regexový parser hlásil jako chybějící; AST oprava to už vidí správně).
- video: `curl -sI https://wonderly.cz/media/fyzika/9-rocnik/magneticke-pole/<slug>/...-omnivoice.mp3` → `content-type: audio/mpeg`; `ffprobe -show_entries stream=codec_type,codec_name` na dialog1 u všech tří vrátil pouze `mp3,audio` — ŽÁDNÝ video stream, potvrzuje „jen audio (OVĚŘENO)" z INVENTURA-TEMAT.md.
- hra: `src/data/hry.ts` neobsahuje klíčování po podtématu, jen celek-level Fyzikální liga (`celek: 'magneticke-pole'` v odkazech) — potvrzuje systémovou mezeru, hra vázaná na podtéma dnes neexistuje u žádného z 95 podtémat.

## Shoda s INVENTURA-TEMAT.md

**Beze změny** — po dnešní AST opravě (90/90) je stav v inventuře (řádky 238–240,
starý 10sloupcový formát) totožný s tím, co jsem ověřil živě. Jediný rozdíl je
formální: nová 9sloupcová definice slučuje „simulace" a „interakt. infografika"
do jedné složky, takže sloupec `interakt. infografika = NE` z inventury už
NENÍ nedostatek — je pokrytý sloupcem `simulace = ANO`. Fakticky se tedy
nic neliší, jen se jinak čte týž řádek.

## Co skutečně chybí

Jen **jedna věc opakovaná 3×**: video-polemika s ANIMACÍ. Dnes existuje jen
audiostopa (OmniVoice dialog) bez obrazu — podle přechodného ustanovení
(OBSAH-PRAVIDLA.md kap. 12) zůstává zveřejněná, animace se doplní.

Hra pro skupinu — **NE, ale NENÍ práce na tomto tématu** (systémová mezera přes
všech 95 podtémat, řeší se jako samostatný projekt, ne v rámci F9).

## Návrh výroby — 1. vlna (3 nezávislé úlohy, žádná na druhé nezávisí)

| # | co | podklad | kdo | odhad |
|---|---|---|---|---|
| 1 | Animace k videu „Magnety a magnetické pole (opakování)" (3 dialogy, už mají audio) | `/Users/Shared/Škola/9/1 Elektřina/01 Magnety, magnetické pole - opakování/Magnety, magnetické pole - opakování.pdf` + existující obsah `magnety-magneticke-pole-opakovani` | worker-media (kreslené schéma kódem dle pravidla „Animace podkástů" — pohyblivé scény kreslí kód, ne video model) | střední (3× krátká scéna: pole magnetu, indukční čáry, Země jako magnet) |
| 2 | Animace k videu „Magnetické pole vodiče a cívky s proudem" (3 dialogy) | `/Users/Shared/Škola/9/1 Elektřina/02 Magnetické pole vodiče a cívky s proudem/2. Magnetické pole vodiče a cívky s proudem.pdf` | worker-media | střední (pravidlo pravé ruky, cívka, siločáry — potřebuje přesnou geometrii, viz „Obrázek nesmí lhat") |
| 3 | Animace k videu „Elektromagnet a jeho využití" (3 dialogy) | `/Users/Shared/Škola/9/1 Elektřina/03 Elektromagnet a jeho využití/ Elektromagnet a jeho využití.pdf` | worker-media | střední (zapnutí/vypnutí cívky, jeřáb, zvonek, relé) |

4. úloha do 1. vlny není potřeba — u tohoto celku není žádná další produkční
mezera; hru řešit odděleně jako systémový projekt (mimo rozsah F9).

Po dokončení všech tří animací bude F9 `magneticke-pole` KOMPLETNÍ na 9/9 u
všech tří podtémat (kromě systémové mezery „hra", která se u tohoto tématu
nevyrábí).

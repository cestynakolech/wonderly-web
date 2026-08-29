# Sekce cestovatelský deník (cesty.wonderly.cz = /cesty)

Deník z cest **obytným autem** (NE cyklistika! EN „Journeys on Wheels", DE „Reisen auf
Rädern"). Mapa Evropy s piny měst, fotogalerie, YouTube videa z cest, jazyky CS/EN/DE/FR.

## Kde co je
- `src/data/cesty/` — data deníku: `typy.ts`, `roky.ts`, `mapa.ts`, `preklady.ts`, `2019.ts`–`2025.ts`
- `src/components/cesty/` — komponenty deníku
- `src/layouts/CestyLayout.astro` — layout (CS/EN/DE/FR, tmavý režim)
- `src/pages/cesty/` — `index.astro`, `[rok].astro`, `vse.astro` + jazykové mutace `en/ de/ fr/`
- `public/cesty/` — statické obrázky, mapa Evropy
- Plnokvalitní fotky žijí v **R2** (`wonderly-media`), worker je servíruje přes `/media/`

## Konvence a pravidla
- **YouTube videa jen přes oficiální vložený přehrávač** (žádné stažené kopie na web).
- Roky **2024–2026 se v datech píší ručně** a automat je nepřepisuje; starší roky (2019–2023)
  plní automaty z GPS fotek.
- Stav míst se čte **JEN z `~/Desktop/Omega/MISTA.xlsx`**; pořadí práce hlídá `fronta_mist.py`.

## Provozní data a skripty MIMO repo (v `~/Desktop/Omega`)
Na složku Omega nejde z repa ukázat CLAUDE.md-ukazatelem (jiný kořen) — proto aspoň soupis:
- `MISTA.xlsx` — jediný zdroj pravdy o stavu míst
- `skripty/nahraj_fotky.py <složka> <rok>/<mesto>` — fotky do R2 + náhledy (hlídá limit 10 GB)
- `skripty/pridat_mesto.py` (alias `mesto`) — přidá město na mapu deníku
- anonymizace fotek/videí a tvorba videí — skripty tamtéž, přehled v `Omega/AUTOMATY.md`

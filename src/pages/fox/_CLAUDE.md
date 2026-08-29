# Sekce fox — 1. stupeň (fox.wonderly.cz = /fox)

Stránky pro 1. stupeň (paní Lišková). Jediná stránka `index.astro`: úvodní video
s liškou, pod ním okénka předmětů s cvičeními odkazovanými na **Wordwall.net**.

## Konvence a pravidla
- **Externí kvíz přidat jen po ověření, že testuje probrané učivo** — nic se nepřidává
  „od oka“; hry se otvírají přímo na Wordwallu (jen odkazem, nic se nestahuje).
- Data cvičení jsou vložená přímo ve frontmatteru `index.astro` (pole odkazů) —
  fox nemá žádné soubory v `src/data/` ani `src/components/`, proto na rozdíl
  od ostatních sekcí nepotřebuje ukazatelové CLAUDE.md.
- Odkazy na Wordwall vždy s `target="_blank" rel="noopener"` (viz stávající vzor).

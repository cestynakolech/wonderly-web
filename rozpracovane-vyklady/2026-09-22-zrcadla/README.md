STAV 22. 9. 2026: celek F7 Zrcadla a čočky (6 podtémat) — ZAPSÁNO 22. 9. 2026 (build OK)

# Rozpracované návrhy výkladů — F7 Zrcadla a čočky, 22. 9. 2026

Co to je: pracovní podklady (výklady k podtématům celku „Zrcadla a čočky" a jejich
kontroly) podle `rozpracovane-vyklady/2026-09-21/ZADANI-WORKER-VYKLAD.md`. Soubory
`vyklad-*.md` mají tři sekce (OBSAH, ZAPIS, ZDROJE); soubory `kontrola-*-a.md`/`-b.md`
jsou nezávislé kontroly (a = první kolo, b = po opravě).

## Stav 6 klíčů

| klíč | soubor | stav |
|---|---|---|
| `optika-rovinneho-zrcadla` | vyklad-optika-rovinneho-zrcadla-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `kulova-zrcadla-dute-zrcadlo` | vyklad-kulova-zrcadla-dute-zrcadlo-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `opticka-cocka` | vyklad-opticka-cocka-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `oko-vady-oka` | vyklad-oko-vady-oka-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `rozklad-svetla-duha` | vyklad-rozklad-svetla-duha-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `vnimani-barev` | vyklad-vnimani-barev-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |

„Build OK" se týká obsahu/zápisu — ověřeno `podtema.mjs get` proti .md (shoda obsah i zapis,
počty `<p>`/`<h3>`/body/vzorec/jednotky sedí u všech 6 klíčů). `node zkontroluj.mjs` (0 chyb)
a `npm run build` proběhly bez chyby.

Kolo „b" kontroly u všech 6 podtémat: `kulova-zrcadla-dute-zrcadlo` mělo NEPROŠLO kvůli
metakomentáři „k rozhodnutí učitele" v ZDROJE (H2×nazev už bylo věcně vyřešené) — opraveno,
plus 2 drobnosti (doplněno „vzpřímený" k obrazu blíž než ohnisko, přeformulováno značení S/C).
Ostatních 5 podtémat mělo PROŠLO jen s drobnostmi (neobratná čeština, kruhové definice,
duplicitní slovesa/body v ZAPIS, metakomentáře o vlastním postupu v ZDROJE) — všechny .md
opraveny podle protokolů „b", zapsáno do `src/data/temata.ts` přes `podtema.mjs`.

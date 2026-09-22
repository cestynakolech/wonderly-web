STAV 22. 9. 2026: celek F7 Světlo a jeho šíření (4 podtémata) zapsáno a nasazeno

# Rozpracované návrhy výkladů — F7 Světlo a jeho šíření, 22. 9. 2026

Co to je: pracovní podklady (výklady k podtématům celku „Světlo a jeho šíření" a jejich
kontroly) podle `ZADANI-WORKER-VYKLAD.md` ve složce `2026-09-21/`. Soubory `vyklad-*.md`
mají tři sekce (OBSAH, ZAPIS, ZDROJE); soubory `kontrola-*-a.md`/`-b.md` jsou nezávislé
kontroly (a = první kolo, b = po opravě).

## Stav 4 klíčů

| klíč | soubor | stav |
|---|---|---|
| `svetlo-jeho-zdroje` | vyklad-svetlo-jeho-zdroje-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `odraz-svetla` | vyklad-odraz-svetla-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `lom-svetla` | vyklad-lom-svetla-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `stin-faze-mesice` | vyklad-stin-faze-mesice-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |

Kolo „b" kontroly: `svetlo-jeho-zdroje` mělo NEPROŠLO kvůli jedné nedoložené větě v ZDROJE
(„chyba podkladu nahlášena učiteli" bez zápisu v `kontrola-podkladu-fyzika7.md`) — doplněny
dvě položky do `~/Desktop/Omega/dokumenty/kontrola-podkladu-fyzika7.md` (teplota Slunce
4500 °C → 5 500 °C; IR — netopýři nevidí, jen hadi) a doplněny odkazy v ZDROJE; `odraz-svetla`,
`lom-svetla`, `stin-faze-mesice` měly PROŠLO jen s drobnostmi (chybějící „oranžová" v barevné
řadě, přeformulace vět, sjednocení zápisu čísel, sloučení bodů ZAPIS). Všechny .md opraveny,
zapsáno do `src/data/temata.ts` přes `podtema.mjs`, ověřeno porovnáním počtu `<p>`/`<h3>`/bodů
zápisu (a klíčů vzorec/jednotky) s daty a potvrzeno `zkontroluj.mjs` i `npm run build`.

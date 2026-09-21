# Rozpracované návrhy výkladů — 6 celků, 22. 9. 2026

Co to je: pracovní podklady (výklady k podtématům fyziky a jejich kontroly) pro tři
rozpracované celky — F7 Atmosféra a tlak vzduchu (hotovo), F8 Zvuk a F9 Energie a vesmír
(v kontrole/opravě). Soubory `vyklad-*.md` mají tři sekce (OBSAH, ZAPIS, ZDROJE) podle
`ZADANI-WORKER-VYKLAD.md` ve složce `2026-09-21/`; soubory `kontrola-*-a.md`/`-b.md` jsou
nezávislé kontroly (a = první kolo, b = po opravě).

## Stav 9 klíčů

| klíč | soubor | stav |
|---|---|---|
| `atmosfericky-tlak` | vyklad-atmosfericky-tlak-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `pretlak-podtlak-vakuum` | vyklad-pretlak-podtlak-vakuum-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `meteorologie-a-mereni-tlaku` | vyklad-meteorologie-a-mereni-tlaku-f7.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `kmitani-a-vlneni` | vyklad-kmitani-a-vlneni-f8.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `vnimani-zvuku-a-hlasitost` | vyklad-vnimani-zvuku-a-hlasitost-f8.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `zvuk-vznik-a-sireni` | vyklad-zvuk-vznik-a-sireni-f8.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `obnovitelne-a-neobnovitelne-zdroje` | vyklad-obnovitelne-a-neobnovitelne-zdroje-f9.md | ZAPSÁNO 22. 9. 2026 (build OK) |
| `slunecni-soustava` | vyklad-slunecni-soustava-f9.md | v opravě |
| `vesmir-a-galaxie` | vyklad-vesmir-a-galaxie-f9.md | ZAPSÁNO 22. 9. 2026 (build OK) |

F7 atmosféra a tlak vzduchu: u tří klíčů kontrolor v kole „b" (`kontrola-*-b.md`) buď
potvrdil PROŠLO s jen drobnými nálezy, nebo (u `pretlak-podtlak-vakuum`) nahlásil NEPROŠLO
kvůli jednomu odstavci s pěti větami — vše opraveno v `.md`, zapsáno do `src/data/temata.ts`
přes `podtema.mjs`, ověřeno porovnáním počtu `<p>`/`<h3>`/bodů zápisu s daty a potvrzeno
`zkontroluj.mjs` i `npm run build`.

F8 zvuk a F9 energie-a-vesmir: kontrola zatím jen v kole „a" (u `obnovitelne-a-neobnovitelne-zdroje`
i „b"), zápis do `temata.ts` čeká na dokončení kontrolního kola.

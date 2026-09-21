STAV 21. 9. 2026 23:33: všech 15 podtémat F8 elektřina zapsáno a nasazeno

# Rozpracované návrhy výkladů — předání 21. 9. 2026 (před /clear)

Co to je: záloha pracovních souborů ze scratchpadu staré session (výklady k podtématům
fyziky, zadání pro workery, přepis videa B. Chernyho a jeho shrnutí pro wonderly, audit
pravidel, testy lokálních modelů). Kopie (`cp`), originály zůstávají ve scratchpadu do
zániku dočasného adresáře.

Stav ke dni 21. 9. 2026 večer.

## Jak je stav určen

- **„zapsáno"** = obsah v `src/data/temata.ts` (ověřeno strojově přes `podtema.mjs`
  a porovnáním s první řádkou `## OBSAH` v návrhu — u 55 návrhů mimo F8 elektřinu
  se první řádek (H2 nadpis) i navazující text shodují s živými daty).
- U **F8 elektřina** (9 rozpracovaných klíčů, viz níž) je stav podrobnější — určen
  kontrolní prací (worker/kontrolor), ne jen textovou shodou. U tří z nich (`elektricke-obvody`,
  `elektricky-proud-mereni`, `elektricke-napeti-mereni`) je nadpis v `temata.ts` sice
  stejný jako v návrhu, ale text obsahu se liší → živý obsah je STARÁ verze, nový návrh
  (PROŠLÝ kontrolou) ještě nebyl zapsán.

## F8 elektřina — rozpracovaná dávka (9 klíčů prošlo/prochází, 2 zbývá napsat)

| klíč | soubor | stav |
|---|---|---|
| `elektricke-obvody` | vyklad-elektricke-obvody-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `elektricky-proud-mereni` | vyklad-elektricky-proud-mereni-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `elektricke-napeti-mereni` | vyklad-elektricke-napeti-mereni-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `zavislost-odporu-na-vodici` | vyklad-zavislost-odporu-na-vodici-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `ohmuv-zakon` | vyklad-ohmuv-zakon-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `elektricky-proud-v-kovech-odpor` | vyklad-elektricky-proud-v-kovech-odpor-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `zapojeni-spotrebicu-za-sebou` | vyklad-zapojeni-spotrebicu-za-sebou-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `zapojeni-spotrebicu-vedle-sebe` | vyklad-zapojeni-spotrebicu-vedle-sebe-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `rezistor-s-promennym-odporem` | vyklad-rezistor-s-promennym-odporem-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `elektricka-prace-a-vykon` | vyklad-elektricka-prace-a-vykon-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |
| `ucinky-proudu-a-bezpecnost` | vyklad-ucinky-proudu-a-bezpecnost-f8.md | ZAPSÁNO 21. 9. 2026 (build OK) |

Součet F8 elektřina: 1× OPRAVENO/čeká kontrola, 1× NAPSÁNO/čeká kontrolu, 3× PROŠLO/nezapsáno,
3× NEPROŠLO, 1× píše se, 2× zbývá napsat.

## Ostatní návrhy (F7 celky 1–5, F9 celky 1–5, F8 mimo elektřinu)

55 souborů `vyklad-*.md` — obsah ověřen jako **zapsáno** (nadpis i navazující text
v `temata.ts` se shodují s návrhem). Patří k 59 podtématům hotovým a nasazeným — viz
`SAMOSTATNY-REZIM.md`, blok „Stav 21. 9. 2026". `vyklad-gravitacni-sila-f7.md` je zapsán
pod `fyzika/6-rocnik/sila/gravitacni-sila` (název souboru „f7" je jen pracovní, téma
patří k 6. ročníku). `vyklad-zakon-zachovani-f8.md` je zapsán pod plným klíčem
`zakon-zachovani-mechanicke-energie`.

## Ostatní dokumenty

- `ZADANI-WORKER-VYKLAD.md` — vzorové zadání pro workery na tvorbu výkladu.
- `boris-cherny-prepis.md` — celý přepis videa B. Chernyho (zdroj `boris.en.vtt`).
- `boris-cherny-pro-wonderly.md` — shrnutí/poučení z videa pro projekt wonderly (odtud
  pravidlo o vlnách workerů, viz paměť `feedback-vlny-workeru.md`).
- `pravidla-audit.md` — audit pravidel, 22 kandidátů na zkrácení, čeká na výběr učitele
  (živá kopie v `Omega/dokumenty/PRAVIDLA-AUDIT-2026-09-21.md`).
- `lokalni-modely-test.md`, `lokalni-modely-doporuceni.md` — zkoušky lokálních modelů
  a doporučení pro delegaci.

## Počty

- Souborů celkem zkopírováno: 74 (68× `vyklad-*.md` + 6 dalších dokumentů).
- F8 elektřina: 9 rozpracovaných klíčů (soubor existuje: 1 opraveno/čeká kontrolu,
  1 napsáno/čeká kontrolu, 3 prošlo/nezapsáno, 3 neprošlo, 1 píše se) + 2 zbývá napsat
  (soubor zatím chybí) = 11 klíčů dohromady.
- Ostatní: 59 souborů `vyklad-*.md` je zapsáno v `temata.ts` (68 − 9 rozpracovaných F8
  elektřina; zahrnuje i `gravitacni-sila-f7` zapsaný pod `6-rocnik` a `zakon-zachovani-f8`
  zapsaný pod plným slugem `zakon-zachovani-mechanicke-energie`).

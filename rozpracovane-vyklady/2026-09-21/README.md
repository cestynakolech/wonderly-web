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
| `elektricke-obvody` | vyklad-elektricke-obvody-f8.md | PROŠLO (nezapsáno) |
| `elektricky-proud-mereni` | vyklad-elektricky-proud-mereni-f8.md | PROŠLO (nezapsáno) |
| `elektricke-napeti-mereni` | vyklad-elektricke-napeti-mereni-f8.md | PROŠLO s 2 drobnostmi (nezapsáno): v OBSAH vypustit nepodloženou větu o ručkovém voltmetru; v ZAPIS bod „plochá baterie: 3× 1,5 V = 4,5 V" |
| `zavislost-odporu-na-vodici` | vyklad-zavislost-odporu-na-vodici-f8.md | NEPROŠLO: 3 odstavce >4 věty, 2 věty >20 slov, chybí „délku značíme l", metakomentáře v ZDROJE |
| `ohmuv-zakon` | vyklad-ohmuv-zakon-f8.md | NEPROŠLO: zákon musí nést i „a nepřímo úměrný odporu R"; doplnit mΩ; věta o rezistorech z PDF s. 6; 3 dlouhé věty; vysvětlit U a I i s názvy jednotek |
| `elektricky-proud-v-kovech-odpor` | vyklad-elektricky-proud-v-kovech-odpor-f8.md | OPRAVENO, čeká na opakovanou kontrolu |
| `zapojeni-spotrebicu-za-sebou` | vyklad-zapojeni-spotrebicu-za-sebou-f8.md | NEPROŠLO (9 nálezů): vrátit větu „Všechny elektrony procházejí každou částí obvodu — zákon zachování toku"; vrátit „(zákon o úbytcích napětí)"; nezařazenou látku z PDF str. 3/5/6 označit MIMO SCOPE nebo zařadit Ohmův zákon pro části obvodu; odstavec „Vánoční žárovky" začíná cizí pomůckou; 2 odstavce >4 věty; 3 věty >20 slov; „motor" bez opory → pračka/PC/vařič; body zápisu jednoslovné, zavést indexy 1/2; I = U : R uvést v textu |
| `zapojeni-spotrebicu-vedle-sebe` | vyklad-zapojeni-spotrebicu-vedle-sebe-f8.md | NAPSÁNO, čeká na kontrolu |
| `rezistor-s-promennym-odporem` | vyklad-rezistor-s-promennym-odporem-f8.md | PÍŠE SE (soubor doplněn dodatečně, může být neúplný) |
| `elektricka-prace-a-vykon` | — (soubor chybí) | ZBÝVÁ NAPSAT |
| `ucinky-proudu-a-bezpecnost` | — (soubor chybí, F8 verze; F9 verze `vyklad-ucinky-proudu-bezpecnost-f9.md` je ZAPSÁNA) | ZBÝVÁ NAPSAT |

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

# Předávka: appka „Češi na Tour" → přepnuta na ženskou Tour

**Datum:** 4. 8. 2026 · **Adresa:** https://lab.wonderly.cz/tour/ · **Kód:** `src/pages/tour.astro` + `/api/tour` ve `worker.js`

Tenhle soubor je shrnutí pro toho, kdo bude pokračovat. Trvalé poznatky jsou navíc
v skillu `/wonderly` (sekce „Mini-aplikace /tour") — ten se načítá sám, tohle je
kontext k jedné konkrétní práci.

## Co je hotové a nasazené

| Věc | Stav |
|---|---|
| Přepnutí zdroje dat na `letourfemmes.fr` | ✅ nasazeno, ověřeno `curl` |
| Sledovaná závodnice: Nikola Nosková (Cofidis Women, č. 147) | ✅ ověřena dvěma zdroji |
| Startovní číslo v hlavičce karty | ✅ |
| Poznávačka — SVG dres, přilba, startovní číslo | ✅ vyrenderováno a prohlédnuto |
| QR kód na stránku | ✅ `~/Desktop/QR-noskova-tour-femmes.png` |
| E-mail s odkazem | ⚠️ **koncept** v Gmailu — odeslání je na učiteli |
| Živá tabulka za jízdy etapy | ✅ opraveno, ⚠️ **v ostrém provozu neověřeno** |

## Co zbývá

1. **Ověřit živou tabulku za jízdy** — 5.–9. 8. odpoledne, když se jede etapa.
   Kontrola: `curl -s "https://lab.wonderly.cz/api/tour?t=$(date +%s)"` → musí být
   `zavodSeJede: true` a `stariDatMin` malé číslo. Zatím doloženo jen simulací.
2. **Po 9. 8. přepnout zpět na mužskou Tour** — návod ve skillu `/wonderly`.
3. Kdyby Nosková odstoupila, zmizí z tabulek a karta ukáže pomlčky — pak stránku
   buď zrušit, nebo dopsat hlášku „závod nedokončila".

## Co jsme se naučili (a co z toho platí i jinde)

**Cizí web se nezeptá, než změní strukturu.** Kód, který u mužské Tour roky fungoval,
byl na ženské rozbitý ve třech místech — a ani jednou nespadl, jen tiše lhal:

- **sloupce podle indexu** (`bunky[4]` = čas): ženská tabulka má o sloupec navíc,
  takže se místo času četl tým. Oprava: hledat hodnotu podle TVARU (`00h 00' 00''`)
  a sousední sloupce odvodit od ní.
- **pomlčka ≠ „vede"**: ve sloupci Gap znamená „dojel v čase vítěze". Tuhle chybu
  měla i původní mužská verze — Vacek na 154. místě měl u sebe napsáno „vede".
- **prázdná odpověď ≠ klid**: ženský racecenter nevysílá telemetrii jednotlivých
  závodnic vůbec. Původní kód z toho usoudil „závod se nejede" a živá tabulka mlčela
  celou etapu. Oprava: běh závodu se pozná podle **stáří** posledního záznamu skupin.

**Diakritika**: tabulky píšou „N. NOSKOVÁ" — `indexOf('NOSKOVA')` nenajde nic.
Hledá se zkrácený tvar bez koncovky.

**Jak se to ověřovalo, když nešel prohlížeč** (lab.wonderly.cz je pro nástroj Browser
blokovaná, port dev serveru držela jiná session):

- `worker.js` jde spustit **přímo v Node** — stačí stub `globalThis.caches`;
- obalením `globalThis.fetch` se podvrhne stáří dat a otestují se **oba směry**
  (jede se → tabulka svítí; dojeto → zhasnutá) bez čekání na peloton;
- SVG kresby se vytáhly z `dist/` do prostého HTML a přes `qlmanage -t` převedly
  na PNG k prohlédnutí — první verze měla odsazené rukávy a moc tlusté dno přilby.

Testovací skripty jsou ve scratchpadu session (`test-worker.mjs`, `test-zive2.mjs`) —
pokud se budou hodit natrvalo, patří do `testy/`.

## Návrh, čím pokračovat

1. **5.–9. 8.**: jednou denně odpoledne ověřit živou tabulku (viz výše) — je to
   jediná část, která nemá důkaz z ostrého provozu.
2. **Drobnost k zvážení**: ztráta se zobrazuje v surovém tvaru `+ 00h 04' 30''`;
   hezčí by bylo `+4:30`. Kosmetika, učitel si nestěžoval.
3. **Po závodě**: přepnutí zpět na mužskou Tour je otázka čtyř míst v kódu —
   ale rovnou u toho opravit i tam ten „vede" (pomlčka ve sloupci Gap).

# Společné zadání: PŘESTAVBA výkladu podtématu (učitel 21. 9. 2026)

Učitel schválil VZOR — drž se ho tvarem i úrovní: `/private/tmp/claude-502/-Users-Shared--kola/c373a426-dfa0-4020-bf85-d07308545470/scratchpad/vyklad-zakon-zachovani-f8.md` (přečti celý). Nic se nemaže, jen přeskládá, zjednoduší a doplní. Jazyk „spíš 9–10 let" platí pro všechny ročníky.

## Zdroje
- Současný blok: v `/Users/radek_soukromy/Desktop/wonderly-web/src/data/temata.ts` najdi GREPEM `slug: '<SLUG>'` ve správném ročníku (některé slugy existují ve dvou ročnících — ověř podle okolních slugů celku) a přečti jen blok toho podtématu (od `slug:` po další `slug:` / konec celku). Soubor je obrovský, NEČTI celý. `obsah` = HTML (h2, h3, p, ul, ol, li, strong, sub, img, details/summary); dnešní `zapis` musí v novém zůstat celý (vzorce, odvozené vztahy, jednotky, převody, věta o dosazování, body); `interakce`, `materialy`, `odkazy`, `nazev` neměníš. Název do `<h2>` z `nazev`. `<img>` zachovej.
- Zdroje učitele: podle parametrů v konkrétním zadání (PDF ve složce Škola, popis prezentace v `~/Desktop/Omega/dokumenty/prezentace-popisy/`, případné `rozdeleni-prezentace-*.txt`). PPTX samo nečti. Útržkovité SmartBooks — chybějící látku NEDOPLŇUJ. Když podklad k podtématu NEEXISTUJE: přestav jen z dosavadního bloku, NIC nového nepřidávej a do ZDROJE napiš jako první řádek sekce „PODKLAD UČITELE CHYBÍ — přestavěno jen z dosavadního bloku".
- Pravidla: `/Users/radek_soukromy/Desktop/wonderly-web/OBSAH-PRAVIDLA.md`; zadání `/Users/radek_soukromy/Desktop/wonderly-web/SAMOSTATNY-REZIM.md` řádky 55–125.

## Čtyři požadavky (závazné)
A) Plynulost — každý pojem dořeknout, než přijde další; text neskáče tam a zpět.
B) „Zápis do sešitu" JSON v pořadí: `vzorec` (+ odvozené vztahy; jen je-li ve zdroji/dosavadním bloku) → `jednotky` (každá veličina ze vzorce ve tvaru „název — značíme X, jednotka Y (název)"; + převody a věta o dosazování, pokud byly) → `vzorecSlovy` (slovní znění KAŽDÉHO vzorce) → `zakon` (DOSLOVNÝ opis ze zdroje; není-li, klíč vynech) → `body` (telegraficky, 3–6 slov na řádek, jedno heslo na bod; vzor „pád: polohová → pohybová").
C) Jazyk pro dítě 9–10 let: věty do ~20 slov, cizí slova jen s vysvětlením, odstavce max 3–4 věty, žádný `<em>`, čísla od tisíce s mezerou („1 000"), nadpisů h3 nejvýše 7.
D) Náročné počítání/odvozování na KONEC pod `<h3>Pro zvídavé: počítáme</h3>` (když počítání není, nadpis vynech); základní vysvětlení veličin ze vzorce zůstává v hlavním textu. Celá čísla (tabulkové konstanty dovolené; hodnoty volit tak, aby výsledky vyšly celé), KAŽDÝ výpočet přepočítat s mezivýsledkem.

## Železná pravidla
- DOSAVADNÍ obsah webu (každá věta, příklad, číslo, bod zápisu, jednotka, převod) se NIKDY nevyřazuje — je to nejčastější nález kontrolora. „MIMO SCOPE" smí označit jen NOVOU látku ze zdroje, kterou nezařazuješ.
- Nic bez opory (ve zdroji nebo dosavadním bloku) nepřidávej. Sporné nebo chybějící fakty piš do ZDROJE jako „NAVRŽENO K DOPLNĚNÍ — k rozhodnutí učitele". Rozpor mezi zdrojem a webem nahlas v ZDROJE, dosavadní ponech.
- Vlastní ilustrační příklady jsou dovolené, v ZDROJE označ „VLASTNÍ PŘÍKLAD".
- Dolní indexy v OBSAH přes `<sub>`, v ZAPIS unicode (zápis se nevykresluje jako HTML).
- V ZDROJE cituj dosavadní blok slugem + doslovnou větou, ne číslem řádku (řádky se posouvají).

## Kontrakt výstupu
Zapiš do souboru daného v konkrétním zadání se třemi sekcemi přesně jako vzor: `## OBSAH` (HTML), `## ZAPIS` (blok ```json, klíče vzorec?, jednotky, vzorecSlovy?, zakon?, body; prázdné klíče vynech), `## ZDROJE`. Soubor začíná `## OBSAH`, za sekcí ZDROJE nic dalšího.
V ODPOVĚDI vrať jen cestu a 2 řádky: počet nadpisů/odstavců a počet položek zápisu.

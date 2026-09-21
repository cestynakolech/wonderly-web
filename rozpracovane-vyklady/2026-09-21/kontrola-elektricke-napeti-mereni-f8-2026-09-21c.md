# Závěrečná (3.) nezávislá kontrola — vyklad-elektricke-napeti-mereni-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ: žádné

## Doklady
- Nález 1 (metakomentáře v ZDROJE): vyřešen. `grep -n -i "nález kontroly|kontrolor|kontroly 21|VYPUŠTĚNA|OPRAVENO|1. kolo|2. kolo"` = 0 zásahů; ř. 63 a 65 nesou už jen věcné doložení (PDF str. 5, PDF str. 2).
- Nález 2 („sériově" v ZAPIS.body): vyřešen. ZAPIS.body má „za sebou: napětí se sčítá" (slovo „sériově" v OBSAH ani ZAPIS není; zůstalo jen v ZDROJE, kam žák nevidí).
- Nález 3 (USB-C 5–20 V vs. PDF): vyřešen podle rozhodnutí „platí PDF". OBSAH ř. 9 má „bývá 20 V"; PDF str. 1–2 doslovně: „nabíjení mobilu a notebooku přes USB-C kabel: 20 V, …" (pypdf).
- Nález 4: oprava se nežádala, text beze změny („zvýší nejen napětí, ale i proud" = PDF str. 3 doslovně).

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče jednotky, body.
- Věty: žádná nad 20 slov; odstavce: žádný nad 4 věty (strojově, OBSAH bez značek).
- Metakomentáře: žádné (grep viz výše).
- Čísla v nově změněných větách proti PDF: 20 V (str. 1–2) ✓; 3 × 1,5 = 4,5 V (str. 3 doslovně) ✓; 4 × 1,5 = 6 V (str. 3) ✓; 230 V, 12 V, 1,5 V (str. 1–2) ✓; převody 1 kV/1 MV/1 mV (str. 1) ✓.

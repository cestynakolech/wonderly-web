# Závěrečná (3.) nezávislá kontrola — vyklad-elektricka-prace-a-vykon-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ:
1. DROBNÉ — ř. 99: na konci souboru zůstal cizí uzavírací tag `</content>`. Ve složce ho má jen tento soubor a vyklad-ucinky-proudu-a-bezpecnost-f8.md (`grep -l "</content>" *.md` = 2), ostatních 89 výkladů je bez něj. Je až za sekcí ZDROJE (do temata.ts se nepřepisuje), proto nebrání přijetí; oprava = smazat řádek.

## Doklady k nálezům kola b
- Nález 1 (1 Ws): vyřešen. Ř. 26: „Když spotřebič o výkonu 1 W běží 1 sekundu, spotřebuje 1 J. Proto platí 1 Ws = 1 J." — chybné „watt za sekundu" je pryč.
- Nález 2 (účinnost LED): vyřešen podle rozhodnutí „platí PDF". OBSAH ř. 30 „asi 70 %", ZAPIS body „LED žárovka: účinnost asi 70 %". PDF 31 str. 6 doslovně (pdftotext): „např. LED žárovky mají účinnost 70 % ➪ 70% elektrické energie přemění na světlo a jen 30% přemění na neužitečné teplo".
- Nález 3 (příklad rozchozený s účinností): vyřešen. Ř. 31–32: „Poměr účinností je 70 % : 5 %, tedy čtrnáctkrát méně." Přepočet (node): 70/5 = 14 ✓; 100 · 5 % = 5 W světla ✓; 5 : 0,7 = 7,14 W — text žádné necelé číslo neuvádí, měsíc staré žárovky 0,1 · 5 · 30 = 15 kWh ✓, LED popsána jen slovem „zlomek" (bez nepravdivého čísla).
- Nález 4 (metakomentář v ZDROJE): vyřešen. `grep -n "rozhodnutí učitele|NAVRŽENO|k rozhodnutí"` = 0 zásahů; ř. 96 nese už jen doslovnou citaci PDF str. 6 a konstatování opravy proti dosavadnímu bloku.
- Nález 5 (2 věty přes 20 slov): vyřešen. Strojová kontrola OBSAH (regex přes `<p>`/`<li>`, HTML odstraněno): žádná věta nad 20 slov.
- Nález 6 (ZDROJE tvrdí shodu, kterou text nemá): vyřešen. OBSAH ř. 19 má „Výkon P … Počítá se P = U · I", ZAPIS.vzorec „P = U · I; P₀ = U · I; W = P₀ · t = U · I · t" a ZAPIS.jednotky nově „výkon P — watt (W)"; PDF 31 str. 3 doslovně „Elektrický výkon: P = U ⋅ I" ✓.
- Nález 7 (celá čísla): vyřešen. Konvice přepsána na 30 minut denně: 2 000 W = 2 kW, 30 min = 0,5 h, 2 · 0,5 = 1 kWh, 1 · 30 = 30 kWh, 30 · 5 = 150 Kč — všechny výsledky celé (ověřeno node). Zbylé „0,1 kW · 5 h = 0,5 kWh" je jen nápověda k domácí úloze převzatá z dosavadního bloku, výsledek 15 kWh je celý.

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče vzorec, jednotky, vzorecSlovy, body (pořadí předepsané, `zakon` právem chybí).
- Věty: žádná nad 20 slov; odstavce `<p>`: žádný nad 4 věty (strojově).
- Metakomentáře: žádné (grep „k rozhodnutí|NAVRŽENO|kontrolor|1. kolo|2. kolo|OPRAVENO" = 0); MIMO SCOPE poznámky v ZDROJE tento soubor nemá.
- Čísla proti PDF 31 (pdftotext -layout): 1 Ws = 1 J, 1 Wh = 3 600 J, 1 kWh = 3 600 000 J (str. 2) ✓; P = U · I, W = P · t = U · I · t (str. 3) ✓; příkon P₀, štítek, ztráty, „příkon vždy větší než výkon" (str. 3–4) ✓; žárovka 5 %, LED 70 % (str. 6) ✓.
- Převody (node): 1 kWh = 1000 · 3600 = 3 600 000 J ✓.

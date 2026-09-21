# Nezávislá kontrola: vyklad-elektricka-prace-a-vykon-f8.md (21. 9. 2026, kolo b)

Podklad: "/Users/Shared/Škola/8/5 Elektřina /31 Elektrická práce a energie, výkon elektrického proudu/31.  Elektrická práce a energie, výkon elektrického proudu.pdf" (6 stran, pdftotext).
Dosavadní blok: `node podtema.mjs . get fyzika/8-rocnik/elektrina/elektricka-prace-a-vykon`.

VERDIKT: NEPROŠLO

NÁLEZY:

1. **Věcná chyba v jednotkách.** Sekce „Jednotky energie": „Watt za sekundu je stejná jednotka jako joule: 1 Ws = 1 J."
   Ws NENÍ „watt za sekundu" (to by byl W/s), ale **wattsekunda = watt krát sekunda**: 1 W · 1 s = 1 J.
   Formulace učí děti špatně číst jednotku a je v rozporu i s logikou W = P · t.
   Má být např.: „Když spotřebič o výkonu 1 W běží 1 sekundu, spotřebuje 1 J. Proto 1 Ws = 1 J."
   (PDF str. 2 uvádí jen holý vztah „1 Ws = 1 J", slovní výklad je autorský a je chybný.)

2. **Číslo v rozporu s PDF — účinnost LED.** Sekce „Pro zvídavé: počítáme": „LED žárovka má účinnost mnohem vyšší, asi 50 %"
   a ZAPIS, bod „LED žárovka: účinnost asi 50 %".
   PDF str. 6 doslovně: „např. LED žárovky mají účinnost 70 % ➪ 70 % elektrické energie přemění na světlo a jen 30 % přemění
   na neužitečné teplo". Podle rozhodnutí (PDF má přednost) má být **70 %** v OBSAH i v ZAPIS.

3. **Navazující příklad se pak rozchází s účinností.** Tamtéž: „aby dala stejné světlo jako 100W žárovka, stačí jí kolem 10 W…
   1,5 kWh místo 15 kWh — desetina."
   Poměr 10× plyne z dvojice 5 % / 50 %. Při 70 % (PDF str. 6) vychází: 100 W · 5 % = 5 W světla; 5 : 0,7 ≈ **7 W**, tedy
   měsíčně 0,007 kW · 5 h · 30 = **1,05 kWh**, ne 1,5 kWh, a „desetina" neplatí (vyjde asi čtrnáctina).
   Buď se čísla příkladu přepočítají k 70 %, nebo se příklad přeformuluje tak, aby na účinnosti nestál.

4. **Metakomentář v souboru.** ZDROJE, odrážka „ROZPOR — LED žárovka…": „NAVRŽENO K DOPLNĚNÍ — k rozhodnutí učitele,
   zda přepsat na 70 % podle PDF". Rozhodnutí je dané (platí PDF), poznámka „k rozhodnutí učitele" je metakomentář a musí zmizet;
   ZDROJE má nést jen věcnou citaci PDF str. 6 s číslem 70 %.

5. **Věty přes 20 slov (2×).** Sekce „Pro zvídavé: počítáme":
   - „Z účinnosti plyne i to, proč se LED vyplatí: aby dala stejné světlo jako 100W žárovka, stačí jí kolem 10 W." (21 slov)
   - „👉 Všimni si, že se počítá s příkonem ze štítku, ne s užitečným výkonem — platíš všechno, co spotřebič ze sítě odebere,
     i tu část, která unikne jako nechtěné teplo." (28 slov)
   Obě rozdělit na kratší věty (kontrakt, požadavek C: věty do ~20 slov).

6. **ZDROJE tvrdí shodu, kterou text nemá.** ZDROJE: „Výkon P = energie za sekundu, jednotka watt (W); vzorec P = U · I →
   dosavadní blok + PDF str. 3, shoda."
   V OBSAH ani v ZAPIS ale vzorec ve tvaru **P = U · I** nikde není — je tam jen P₀ = U · I. PDF str. 3 má nadpis „Elektrický
   výkon: P = U ⋅ I" a teprve str. 3–4 ztotožňuje příkon s výkonem procházejícího proudu. Buď vzorec P = U · I do textu doplnit,
   nebo citaci v ZDROJE opravit, aby netvrdila shodu. Navíc ZAPIS/jednotky nevysvětluje veličinu **P** (jen P₀), ačkoli v OBSAH vystupuje.

7. **DROBNÉ — celá čísla v příkladu.** Sekce „Pro zvídavé: počítáme", příklad s konvicí: „15 minut = 0,25 h… 2 · 0,25 = 0,5 kWh".
   Pravidlo OBSAH-PRAVIDLA.md ř. 189 („příklady pro děti musí vycházet v celých číslech"). Přepočítáno: zadání je aritmeticky správné
   (2 · 0,25 = 0,5; 0,5 · 30 = 15; 15 · 5 = 75 Kč), ale mezivýsledky jsou desetinné. Jde o obsah převzatý z dosavadního bloku
   (zachovat je správně), jako zlepšení se nabízí 30 minut denně → 2 · 0,5 = 1 kWh/den, 30 kWh/měsíc, 150 Kč (vše celé).

OVĚŘENO BEZ NÁLEZU:
- ZAPIS je validní JSON (`json.loads` prošlo), pořadí klíčů vzorec → jednotky → vzorecSlovy → body sedí, `zakon` právem vynechán (v PDF není).
- Z dosavadního bloku nevypadlo nic: všechny čtyři přeměny energie, obě bullets výkon/příkon, užitečný výkon, W = P₀ · t = U · I · t,
  1 Wh = 3 600 J, 1 kWh = 3 600 000 J, celý příklad s konvicí včetně obou „👉/💡" odstavců, účinnost 5 % i věta o topení do pokoje,
  vzorec a všechny jednotky ze zápisu (navíc přibylo 1 Ws = 1 J).
- Přepočty: 2 000 W = 2 kW; 2 · 0,25 = 0,5 kWh; 0,5 · 30 = 15 kWh; 15 · 5 = 75 Kč; 0,1 kW · 5 h = 0,5 kWh; 0,01 kW · 5 h · 30 = 1,5 kWh — vše sedí.
- Jazyk: žádný `<em>`, 4 nadpisy h3 (limit 7), žádný odstavec nad 4 věty, čísla od tisíce s mezerou (3 600 J, 2 000 W, 1 000 W).
- Doložení v PDF sedí u: elektrické pole → síla → pohyb elektronů → práce (str. 1), W/J/kWh (str. 1), přenos energie a zdroj energie (str. 1),
  výhody přenosu a přeměny (str. 2), seznam přeměn včetně elektroautomobilu a elektrolýzy (str. 2), příkon P₀ a štítek (str. 3–4),
  ztráty a „příkon je vždy větší než výkon" (str. 4), účinnost a 5 % žárovka (str. 6).

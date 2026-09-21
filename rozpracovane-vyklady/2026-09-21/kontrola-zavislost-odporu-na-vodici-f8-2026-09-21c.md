# Závěrečná (3.) nezávislá kontrola — vyklad-zavislost-odporu-na-vodici-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ:
1. DROBNÉ — OBSAH, h3 „Materiál a teplota vodiče": po rozdělení odstavce začíná nový odstavec větou „Bývají velmi malé, proto se často udávají v mikroohmmetrech (μΩ·m)…" — podmět („hodnoty měrného odporu") zůstal v předchozím odstavci, žák 8. ročníku nemá na co navázat. Nebrání přijetí; oprava = „Bývají" → „Hodnoty bývají".

## Doklady
- Nález 1 („ohmmetr" jako název jednotky): vyřešen. ZAPIS.jednotky má „měrný odpor (rezistivita) — značíme ρ, jednotka Ω·m" bez slova „ohmmetr"; důvod doložen v ZDROJE ř. 62.
- Nález 2 (nereálná topná spirála 100 m × 5 mm²): vyřešen. Příklad zní „Odporový drát je z konstantanu (ρ = 0,50 Ω·mm²/m), má délku 10 m a průřez 1 mm²"; přepočet 0,50 · 10 : 1 = 5 Ω (node) — celé číslo, rozměry reálné.
- Nález 3 (pořadí kovů): vyřešen podle rozhodnutí „platí PDF". OBSAH: „měď, zlato, stříbro a hliník" = PDF str. 3 doslovně („nejmenší hodnoty měrného elektrického odporu mají nejlepší vodiče: měď, zlato, stříbro, hliník, …").
- Nález 4 („mřížka"): oprava se nežádala, beze změny; opora hlášena v ZDROJE.

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče vzorec, jednotky, vzorecSlovy, body.
- Věty: žádná nad 20 slov; odstavce: žádný nad 4 věty (strojově).
- Metakomentáře o kolech kontroly: žádné (grep „nález kontroly|kontrolor|OPRAVENO|1. kolo|2. kolo" = 0); ř. 71 je věcné doložení rozporu PDF vs. dosavadní web, což kontrakt žádá.
- Čísla proti PDF/zdroji: ρ 0,018 / 0,028 / 0,50 / 1,1 Ω·mm²/m = dosavadní blok webu (v PDF čísla nejsou, přiznáno v ZDROJE); μΩ·m = 10⁻⁶ Ω·m (PDF str. 3) ✓; 0,018 Ω·mm²/m = 0,000 000 018 Ω·m ✓; 22 · 1 : 1,1 = 20 m ✓ (node); S = π·r² (PDF str. 2) ✓.

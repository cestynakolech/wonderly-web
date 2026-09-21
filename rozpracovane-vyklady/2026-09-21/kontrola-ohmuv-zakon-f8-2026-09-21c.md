# Závěrečná (3.) nezávislá kontrola — vyklad-ohmuv-zakon-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ:
1. DROBNÉ — ZDROJE, ř. 62: „jednotky A a V doloženy PDF str. 4". Na str. 4 PDF (text i vykreslená stránka) jsou jen jednotky odporu mΩ, kΩ, MΩ — ampér ani volt tam nejsou. Věta v OBSAH je věcně správná a opora existuje (graf str. 5 má osy „I (mA)" a „U (V)", schéma str. 2), ale odkaz na stranu je chybný. Nebrání přijetí; oprava = přepsat citaci na PDF str. 5 (osy grafu) / str. 2.

## Doklady
- Nález 1 („napětí měnit v proud"): vyřešen. OBSAH h3 „Znění zákona": „Čím větší odpor vodič má, tím menší proud jím při stejném napětí prochází." = PDF str. 4 doslovně.
- Nález 2 (konstanta úměrnosti): vyřešen. „Konstantou této úměrnosti (ve vztahu U = R · I) je … elektrický odpor R." — vázáno na tvar, kde R konstantou skutečně je.
- Nález 3 (horší vodič 0,1 A / 100 Ω): vyřešen podle rozhodnutí „platí PDF". OBSAH má 0,05 A a 200 Ω; ověřeno vykreslením str. 5 PDF (pdftoppm, prohlédnuto): bublina „Horší vodič … R = 10 V : 0,05 A = 200 Ω", zelená přímka má při 10 V hodnotu 50 mA. Přepočet 10 : 0,05 = 200 ✓, poměr 0,2 → 0,05 = čtvrtina, 50 → 200 = čtyřnásobek ✓ (text to tak i říká).
- Nález 4 (dlouhá věta): vyřešen, věta rozdělena na „Horší vodič propustí při stejném napětí jen 0,05 A." + samostatný výpočtový řádek.
- Nález 5 (metakomentáře v ZDROJE): vyřešen; grep „nález kontroly|kontrolor|kontroly 21|OPRAVENO|1. kolo|2. kolo" = 0 zásahů, bývalá ř. 72 o průběhu oprav je pryč.

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče vzorec, jednotky, vzorecSlovy, zakon, body.
- Věty: žádná nad 20 slov; odstavce: žádný nad 4 věty (strojově).
- Čísla proti PDF: 1826 / Georg Simon Ohm (str. 1) ✓; znění zákona (str. 2) doslovně ✓; 1 mΩ = 0,001 Ω, 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω (str. 4) ✓; 10 : 0,2 = 50 Ω a 10 : 0,05 = 200 Ω (graf str. 5) ✓; vlastní příklady 12 : 6 = 2 A, 4 · 3 = 12 V — celé výsledky ✓ (node).

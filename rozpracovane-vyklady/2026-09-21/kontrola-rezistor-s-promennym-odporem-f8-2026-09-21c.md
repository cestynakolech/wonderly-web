# Kontrola výkladu — rezistor-s-promennym-odporem (F8), 21. 9. 2026 (kolo c, závěrečné)

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ:
1. DROBNÉ — OBSAH, sekce „Využití dnes" (ř. 40): „…nahradily je polovodičové (elektronické) součástky (tranzistory, triaky), které teplo neplýtvají." Vazba je gramaticky chybná (plýtvat se pojí se 7. pádem). Oprava: „…které teplem neplýtvají." Pozn.: chyba je zděděná z temata.ts:2868, ale věta byla při opravě nálezu 5 upravována, takže se opravuje tady. Nebrání zápisu.

## Ověření nálezů z kola b (1–8)
1. Věta o posunu jezdce rozdělena na dvě (ř. 45): „Posuneme jezdec tak, aby v obvodu zůstal jen odpor 3 Ω (poloviční)." + „Proud vzroste na I = 12 : 3 = 4 A — dvakrát menší odpor znamená dvakrát větší proud." VYŘEŠENO.
2. Dlouhá odrážka o výrobě rozdělena na dvě (ř. 25–26): materiál drátu / proč se používá. VYŘEŠENO.
3. Věta „Najdeme je jako…" rozdělena na dvě (ř. 41). VYŘEŠENO.
4. Potenciometr už „neměří" — ř. 18 zní „umí to i naopak: polohu jezdce převede na odpor a ten na napětí". Opora PDF str. 9 doslovně: „Potenciometry umí také naopak převést polohu mechanické části na hodnotu odporu a následně na elektrické napětí." VYŘEŠENO.
5. „polovodičové (elektronické) součástky" na obou místech (ř. 10 a ř. 40). Opora PDF str. 7 doslovně: „dnes je nahrazen polovodičovými součástkami". VYŘEŠENO.
6. Příčina a následek narovnány (ř. 32): „Reostat omezuje proud svým odporem. Přitom se elektrická energie mění na teplo, proto se zahřívá." Fyzikálně správně (teplo je důsledek, ne účel). VYŘEŠENO.
7. Metakomentáře v ZDROJE („DOPLNĚNO (kontrola úplnosti při psaní)" apod.) — pryč, grep vrací 0 řádků. Zbývající poznámky typu „ponecháno z dosavadního bloku" / „v OBSAH vypuštěno" jsou doložení původu a rozsahu zdroje, ne komentář k průběhu psaní. VYŘEŠENO.
8. Tvrzení o schématické značce z OBSAH odstraněno a v ZDROJE (ř. 83) odůvodněno chybějící textovou oporou na PDF str. 4 (ověřeno: str. 4 obsahuje jen nadpis „Schématická značka reostatu / potenciometru:" a obrázek). VYŘEŠENO.

## Kontrola, že opravy nezanesly novou chybu
- ZAPIS: JSON se parsuje bez chyby, klíče vzorec, jednotky, vzorecSlovy, body (7 bodů); klíč `zakon` právem chybí (v PDF není formulovaný zákon).
- Věty: po odečtení matematických znaků žádná věta nepřesahuje 20 slov; odstavce max 4 věty.
- Struktura: h2 = 1, h3 = 7 (na limitu), žádný `<em>`, tisíce s mezerou.
- Přepočet (node): 12:6=2 A; 12:3=4 A; P = 12·4 = 48 W; kontrola P = I²·R = 16·3 = 48 W; 48 W > jmenovitých 25 W, závěr „reostat by se poškodil" platí. Vše celá čísla.
- Nově změněné věty (ř. 10, 18, 32, 40, 41, 45) sedí na PDF str. 7 a 9 nebo jsou fyzikálně korektní přeformulování; žádná nepřidává tvrzení nad zdroj.

Podklad: PDF „/Users/Shared/Škola/8/5 Elektřina /30  Rezistor s proměnným odporem/ 30.  Rezistor s proměnným odporem.pdf" (11 stran, pypdf).

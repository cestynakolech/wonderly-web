# 4. nezávislá kontrola (po 3. kole oprav) — vyklad-elektricky-proud-v-kovech-odpor-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ: žádné
DROBNOSTI:
1. ZDROJE ř. 54 — na konci odrážky zůstal editační dovětek „Text opraven: doplněno „i na topné spirály tepelných spotřebičů" u konstantanu". Je to táž kategorie jako smazané ř. 68/70 z kola c, ale odrážka nese doslovnou citaci PDF str. 4 a věcně je v pořádku; stačí dovětek utnout.
2. ZDROJE ř. 60 — závorka „(bez mezery v tisících, opraveno na formát s mezerou)" popisuje průběh úpravy, ne zdroj. Beze změny proti kolu c, bez vlivu na správnost.

## Doklady k nálezům kola c
- NOVÉ 1 (věta 22 slov o konstantanu): VYŘEŠENO. OBSAH ř. 12 nyní: „Podobně konstantan (slitina mědi a niklu) se používá na rezistory — součástky s přesně daným odporem. Vyrábějí se z něj i topné spirály tepelných spotřebičů." Delší z obou vět má 14 tokenů; strojová kontrola OBSAH nenašla žádnou větu nad 20 slov.
- NOVÉ 2 (editační poznámky v ZDROJE): VYŘEŠENO pro obě vytčená místa. `grep -nE "Gramatická oprava|Přesnější spojka|původní →"` = 0. Bývalá ř. 69 je přepsaná na holé doložení: „Při srážkách elektron většinou změní směr → PDF str. 2, doslovně „Elektrony při srážkách s atomy vodiče často změní směr svého pohybu" — ne každá srážka směr mění." Zbytkové dovětky na ř. 54 a 60 viz DROBNOSTI (kolo c je vytčeny neměla, ř. 54 naopak uvádělo jako doklad).

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče jednotky a body; `vzorec` i `zakon` právem chybí (podtéma bez výpočtu).
- Odstavce `<p>`: strojově žádný nad 4 věty. Věty v OBSAH: žádná nad 20 slov (0 zásahů).
- Metakomentáře typu „NAVRŽENO / k rozhodnutí": 0 zásahů. Poznámky „MIMO SCOPE" na ř. 65–67 jsou povolené.
- PDF 25 (pypdf) str. 4 doslovně: „z kovů má velký odpor např. konstantan (slitina mědi a niklu), z kterého se vyrábí odporový drát na výrobu součástek s konkrétní hodnotou elektrického odporu (rezistor) nebo topné spirály tepelných spotřebičů" — obě nové věty na ř. 12 sedí, včetně přiřazení OBOU použití konstantanu. Nichrom v PDF 25 skutečně není (`grep -i nichrom` = 0), v ZDROJE ř. 54 je to přiznáno jako doplněk z dosavadního bloku.
- PDF 25 str. 4 dále kryje ř. 11 (zlato, stříbro, měď, hliník; „čím je kov lepší vodič, tím méně se zahřívá"; měděné vodiče, pozlacené/postříbřené kontakty) a ř. 13 (žádný kov není izolant; keramika, plast).
- PDF 25 str. 9: „teplota wolframového vlákna v klasické žárovce se pohybuje mezi 2200 °C a 3000 °C" — kryje ř. 16 (zápis 2 200 až 3 000 °C s mezerou v tisících).
- Číselné převody v ZAPIS: 1 mΩ = 0,001 Ω, 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω — ověřeno ✓.
- Věcné změny 3. kola se omezily na rozdělení jedné věty a na smazání/přepis dvou odrážek v ZDROJE; v OBSAH nepřibylo žádné nové tvrzení ani číslo.

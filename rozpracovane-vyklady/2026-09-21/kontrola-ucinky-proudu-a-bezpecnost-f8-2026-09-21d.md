# 4. nezávislá kontrola (po 3. kole oprav) — vyklad-ucinky-proudu-a-bezpecnost-f8.md

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ: žádné
DROBNOSTI:
1. ř. 22 — odrážka „odpor vlhkého člověka" má i s návěstím 22 tokenů (19 slov bez návěstí „odpor vlhkého člověka:"), tedy těsně na hranici požadavku C. Bez vlivu na správnost; případně zkrátit na „Vlhký člověk má nízký odpor hned od začátku. Ani suchý člověk po proražení kůže není v bezpečí."
2. ř. 99–101 — odrážka „Plochá baterie 4,5 V…" má 27 tokenů, ale ~11 z nich je zápis vzorce (4,5 : 150 000 = 0,00003 A = 30 µA). Text beze změny proti kolu c, čitelnost dobrá.

## Doklady k nálezům kola c
- NOVÉ 1 (věta 36 slov, „Mokrý člověk"): VYŘEŠENO. ř. 106–108 nyní tři věty: „Mokrý člověk (R ≈ 2 000 Ω): stejně nízký odpor má vlhká kůže hned od malého napětí." / „Vyjde proto opět I = 230 : 2 000 = 115 mA." / „Nebezpečné je to tak jako tak — suchý po proražení kůže i rovnou mokrý." Nejdelší z nich 15 tokenů.
- NOVÉ 2 (cizí tag `</content>`): VYŘEŠENO. `grep -n "</content>\|<content>"` = 0 zásahů; soubor končí ř. 181 odrážkou ZDROJE o Ohmově zákonu.
- NOVÉ 3 (odrážka „odpor člověka" na 6 vět): VYŘEŠENO. Rozděleno na dvě odrážky — ř. 21 „odpor suchého člověka" (4 věty) a ř. 22 „odpor vlhkého člověka" (2 věty).
- NOVÉ 4 (převrácené pořadí v ZAPIS.body): VYŘEŠENO. Poslední bod zní „uvolni oděv, zkontroluj dech a tep; nedýchá? stlačuj hrudník" — přesně navržené znění a pořadí.
- NOVÉ 5 (nálepky „OPRAVA CITACE:", „ROZPOR OPRAVEN:"): VYŘEŠENO. `grep -nE "OPRAVA CITACE|ROZPOR OPRAVEN|NAVRŽENO|k rozhodnutí"` = 0. Věcné jádro obou odrážek zůstalo: ř. 166 (50 V / 120 V jen z dosavadního bloku, PDF je neobsahuje) a ř. 177 (první pomoc podle PDF str. 5).

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče vzorec, jednotky, vzorecSlovy, zakon, body.
- Odstavce `<p>`: strojově žádný nad 4 věty.
- Věty v OBSAH nad 20 slov (strojově, `<p>` i `<li>`): jen dvě z DROBNOSTÍ výše, obě bez vlivu na správnost; věta z NOVÉ 1 kola c je pryč.
- Metakomentáře: 0 zásahů (viz grep výše). Poznámky „MIMO SCOPE" na ř. 172–173 jsou povolené.
- Přepočty (node): 4,5/150 000 = 0,00003 A = 30 µA ✓; 230/2 000 = 0,115 A = 115 mA ✓; 115 > 80 mA ✓; chránič 30 mA < 60 mA (fibrilace) ✓.
- PDF 32 (pypdf, str. 2) stupnice doslovně: „0,5 až 1 mA – práh vnímání", „1 až 8 mA – podráždění v nervech, stoupání krevního tlaku", „6 až 15 mA – způsobuje křeč", „25 mA – křeč dýchacího svalstva", „60 mA – chvění srdeční komory (fibrilace), přechodná zástava srdce", „nad 80 mA – zpravidla trvalá zástava srdce" — shoda s ř. 12–16.
- PDF 32 str. 2: „Odpor člověka ve vlhku … asi 2000 ohmů, v suchu a suché obuvi asi 150 000 ohmů" a „Suchá obuv velmi zvyšuje odpor proti zemi, obzvlášť je-li z dobře izolujících materiálů, např. z gumy" — kryje ř. 21–22 i odrážky „Pro zvídavé".
- PDF 32 str. 3: „Nejvyšší bezpečná hodnota stejnosměrného napětí podle normy je 25 V a střídavého napětí 12 V" — kryje ř. 24 i ZAPIS.body.
- PDF 32 str. 5: „uvolníme mu oděv, zkontrolujeme tep, dech a v případě potřeby mu poskytneme umělé dýchání a masáž srdce"; „zavoláme záchrannou službu 155" — kryje ř. 87–90 i opravený bod ZAPIS.
- Věcné změny 3. kola se týkaly jen rozdělení vět, rozdělení odrážky, pořadí v ZAPIS a nálepek v ZDROJE; žádné nové číslo ani tvrzení nepřibylo.

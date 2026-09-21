# Kontrola výkladu — zapojeni-spotrebicu-za-sebou (F8), 21. 9. 2026 (kolo c, závěrečné)

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ: žádné

## Ověření nálezů z kola b (1–5)
1. Metakomentáře v ZDROJE („OPRAVENO (nález N)", „OVĚŘENO (nález 8)") — pryč. `grep -n "OPRAVENO|OVĚŘENO|DOPLNĚNO|nález|<em>"` v souboru vrací 0 řádků. VYŘEŠENO.
2. Citace obrázku opravena na „PDF str. 4" (ř. 66). Ověřeno v PDF: „Na obrázku níže je zakreslen proud a napětí v sériovém obvodu:" je na STRANĚ 4 (patička „4/6"). VYŘEŠENO.
3. Citace pomůcky opravena na „PDF str. 5" (ř. 67). Ověřeno: „- je-li obvod rozvětvený, proud se rozdělí do větví" je na STRANĚ 5 (blok POMŮCKY — Proud, patička „5/6"). VYŘEŠENO.
4. Dovětek z dosavadního bloku vrácen: ř. 4 „Jednoduché sériové zapojení je nejbasičtější typ elektrického obvodu." — doslovná shoda s temata.ts:2759. VYŘEŠENO.
5. Věta z PDF str. 1 doplněna: ř. 3 „Každý elektrický spotřebič má vlastní odpor." — doslovná shoda s PDF str. 1. VYŘEŠENO.

## Kontrola, že opravy nezanesly novou chybu
- ZAPIS: JSON se parsuje bez chyby, klíče vzorec, jednotky, vzorecSlovy, zakon, body (6 bodů).
- Věty: nejdelší věta 20 tokenů včetně vzorců („Na vánočním řetězu svítí sériově 3 stejné žárovky…"), po odečtení matematických znaků žádná věta nepřesahuje 20 slov.
- Odstavce: max 4 věty (P3 a P4 mají 4, ostatní 2–3).
- Struktura: h2 = 1, h3 = 5, žádný `<em>`, tisíce s mezerou („1 000 V").
- Přepočet příkladů (node): 4·2=8; 6·2=12; 8+12=20; 4+6=10; 10·2=20; 2+2+2=6; 12:6=2; 2·2=4; 4+4+4=12. Vše sedí, všechny mezivýsledky celá čísla.
- Nově změněné/doplněné věty sedí na PDF str. 1 (doslovně) a na dosavadní blok (doslovně).
- Ostatní citace v ZDROJE přezkoušeny proti extrahovanému textu PDF (str. 2, 3, 5, 6) — čísla stran souhlasí.

Podklad: PDF „/Users/Shared/Škola/8/5 Elektřina /28 …/28.  Zapojení spotřebičů v elektrickém obvodu za sebou.pdf" (6 stran, pypdf).

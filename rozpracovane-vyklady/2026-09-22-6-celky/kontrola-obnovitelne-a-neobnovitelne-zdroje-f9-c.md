VERDIKT: PROŠLO

Kontrolováno (3. kolo, úzké): `vyklad-obnovitelne-a-neobnovitelne-zdroje-f9.md` proti nálezům verze b,
proti PDF `/Users/Shared/Škola/9/1 Elektřina/21 Obnovitelné a neobnovitelné zdroje energie/ 21.  Obnovitelné a neobnovitelné zdroje energie.pdf`
(4 strany, pdftotext -layout) a proti dosavadnímu bloku `slug: 'obnovitelne-a-neobnovitelne-zdroje'`
(src/data/temata.ts ř. 3108–3216).

OVĚŘENÍ NÁLEZŮ VERZE b:
1. metakomentáře v ZDROJE — VYŘEŠENO JEN ZČÁSTI. Všechny čtyři vytčené formulace zmizely,
   ale přibyla nová téhož druhu, ř. 105: „Klíč `jednotky` opraven na tvar «název — značíme X,
   jednotka Y (název)»" (popis vlastní editace + odkaz na kontrakt). Drobné, viz NEVYŘEŠENÉ.
2. odstavec o vodíku (5 vět) — VYŘEŠENO. Nyní ř. 11 (3 věty) + ř. 12 (2 věty).
3. vypadlé „obnovitelný ≠ nevyčerpatelný" — VYŘEŠENO. Ř. 10 větu vrací i s „Rozhoduje rychlost,
   jakou se zdroj obnovuje, ne jeho množství."
4. tvar klíče `jednotky` — VYŘEŠENO. „výkon elektrárny — značíme P, jednotka W (watt); v energetice
   MW (megawatt)", „…energie — značíme E, jednotka Wh (watthodina); v energetice MWh".

NEVYŘEŠENÉ: nález 1 verze b (metakomentář v ZDROJE) — nově ř. 105, drobné, netýká se textu pro žáky.

NOVÉ: žádné.
Ověřeno vlastním přepočtem a proti zdroji:
- ZAPIS je validní JSON (json.loads OK), klíče `jednotky` + `body`, 20 bodů, žádný nad 7 slov.
- Nejdelší věta v OBSAH má 20 slov (skript nad HTML bez značek) — limit drží.
- Odstavce `<p>` nejvýš 4 věty. Delší jsou jen položky „Zamysli se" (otázka + `<details>` řešení),
  což je zavedený tvar, ne odstavec.
- Žádné cizí značky (`</content>`, ```` ```html ````, `<em>`, TODO), struktura OBSAH → ZAPIS → ZDROJE,
  1× h2, 7× h3, počítací část poslední.
- Výpočet (node): 500×8 = 4 000 MWh; 750×4 = 3 000 MWh; rozdíl 1 000 MWh; 1 000/4 000 = 25 %. Čísla celá.
- PDF str. 1: definice obou skupin, výčet „Sluneční záření, vítr, tekoucí voda, geotermální proudy,
  biomasa a bioplyn, vodík", fosilní paliva „ze zbytků odumřelých rostlin a živočichů … bez přítomnosti
  vzduchu", ropné břidlice a písky, jaderné palivo — vše sedí doslovně.
- PDF str. 2: šest druhů elektráren, „palivem je zpravidla obohacený uran 235" — sedí.
- PDF str. 3–4: Dlouhé stráně, v noci z dolní do horní nádrže, ve špičce přes turbínu na generátor — sedí.
- Všechny 4 body dosavadního `zapis.body` se v novém zápisu objevují (rozepsané telegraficky).

DROBNOSTI (jazykové / kosmetické, nebrání přijetí):
a) ZAPIS bod „obnovitelné: slunce, vítr, voda, geotermální proudy" — PDF i OBSAH mají „sluneční záření";
   psát malým písmenem „slunce" místo zdroje energie je nepřesné.
b) `jednotky`: u energie chybí zmínka, že základní jednotka je joule (1 Wh = 3 600 J); žák zná E v J z F8.
c) Ř. 7 bullet „neomezené množství" (doslovně z PDF) stojí hned vedle ř. 10 „mohou dojít stejně jako uhlí".
   Napětí je vědomé rozhodnutí z minulého kola (PDF má přednost), jen upozorňuji, že zůstává.

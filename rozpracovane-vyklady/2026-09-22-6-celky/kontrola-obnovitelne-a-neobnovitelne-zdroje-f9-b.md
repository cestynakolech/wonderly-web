VERDIKT: PROŠLO S DROBNOSTMI

Kontrolováno (2. kolo): `rozpracovane-vyklady/2026-09-22-6-celky/vyklad-obnovitelne-a-neobnovitelne-zdroje-f9.md`
proti PDF `/Users/Shared/Škola/9/vše/21 Obnovitelné a neobnovitelné zdroje energie/ 21.  Obnovitelné a neobnovitelné zdroje energie.pdf`
(4 strany, pdftotext -layout), proti dosavadnímu bloku `slug: 'obnovitelne-a-neobnovitelne-zdroje'`
(src/data/temata.ts ř. 3324–3433), kontraktu `rozpracovane-vyklady/2026-09-21/ZADANI-WORKER-VYKLAD.md`
a `OBSAH-PRAVIDLA.md` § 3 VÝKLAD.

NEVYŘEŠENÉ z verze a: nález 6 (metakomentáře v ZDROJE) — jen nahrazen jinými metakomentáři, viz nález 1 níže.
Nález 2 vyřešen rozhodnutím ve prospěch PDF, ale s vedlejší ztrátou věty — viz nález 3.
Vyřešeno: 1 (ZAPIS přepsán telegraficky na 20 bodů + doplněny elektrárny, uran 235, vodík, výjimky ze Slunce, doplněn klíč `jednotky`),
3 („geotermální teplo" → „geotermální proudy" podle PDF str. 1),
4 (v hlavním textu už žádná věta nepřesahuje 20 slov; dřívější 29/25/23/21/21 slov rozděleno),
5 (nyní jednoznačně „Jen tři zdroje ze Slunce nepocházejí: …"),
7 („Pro zvídavé: počítáme" je nyní poslední h3).

NÁLEZY:

1. DROBNÉ — sekce `## ZDROJE`, věty „Rozhodnutí: PDF má přednost, definice v OBSAH přepsána podle PDF",
   „přeformulována na varovný odstavec …, aby neodporovala definici z PDF", „ponecháno beze změny obsahu,
   jen rozdělené věty a jednoznačnější úvodní věta výčtu výjimek", „ZAPIS.body rozepsán telegraficky
   (3–6 slov na řádek) a doplněn o …".
   CO JE ŠPATNĚ: totéž, co vytkl nález 6 verze a — popis vlastní editace místo věcné citace zdroje.
   Staré formulace zmizely, nahradily je nové téhož druhu.
   CO MÁ BÝT: v ZDROJE nechat jen citace PDF/dosavadního bloku a hlášené rozpory; popis editace vynechat.

2. DROBNÉ — sekce „Obnovitelné zdroje", odstavec „🔍 Vodík je zvláštní případ. …" — 5 vět.
   CO JE ŠPATNĚ: kontrakt C žádá odstavce nejvýše 3–4 věty. Vada vznikla nově, při rozdělování
   dlouhých vět (oprava nálezu 4 z verze a). Ostatní odstavce OBSAH limit drží.
   CO MÁ BÝT: rozdělit na dva odstavce (definice vodíku / vodík jako nosič energie).

3. DROBNÉ — sekce „Obnovitelné zdroje", nový text „nacházejí se v přírodě v neomezeném množství".
   CO JE ŠPATNĚ: z dosavadního webu bez náhrady vypadly věty „«Obnovitelný» ale neznamená
   «nevyčerpatelný»: les vykácený rychleji, než stačí dorůst, nebo přetížený geotermální vrt dojdou
   stejně jako uhlí" a „Rozhoduje rychlost, jakou se zdroj obnovuje, ne jeho množství" (dosavadní blok,
   slug `obnovitelne-a-neobnovitelne-zdroje`). Nové znění je z PDF str. 1 („Látky, které se nacházejí na
   naší planetě v neomezeném množství / Nelze je vyčerpat"), což zadání dovoluje (PDF má přednost),
   ale zůstává napětí uvnitř textu: bullet tvrdí „neomezené množství", následující odstavec vzápětí
   varuje, že les i geotermální vrt „potřebují čas, než se vzpamatují".
   CO MÁ BÝT: buď vrátit větu „obnovitelný ≠ nevyčerpatelný" (věcně přesnější), nebo napětí odstranit
   formulací typu „doplňují se pořád dokola, ale jen svým tempem". Rozhodnutí patří učiteli.

4. DROBNÉ — sekce `## ZAPIS`, klíč `jednotky`: „výkon elektrárny P — megawatt (MW)",
   „vyrobená nebo spotřebovaná energie — megawatthodina (MWh)".
   CO JE ŠPATNĚ: kontrakt B předepisuje tvar „název — značíme X, jednotka Y (název)"; zde chybí
   slovo „značíme"/„jednotka" a u energie i značka veličiny.
   CO MÁ BÝT: „výkon — značíme P, jednotka W (watt); v energetice MW (megawatt)" apod.

CO NAOPAK SEDÍ (ověřeno, ne nález):
- Výpočet přečerpávací elektrárny znovu přepočítán (node): 500 × 8 = 4 000 MWh; 750 × 4 = 3 000 MWh;
  rozdíl 1 000 MWh; 1 000/4 000 = 25 %; účinnost 75 % — pro přečerpávací elektrárnu realistická. Čísla celá.
- Dlouhé stráně, princip přečerpávání → PDF str. 3–4 doslovně. Druhy elektráren včetně „zpravidla
  obohacený uran 235" → PDF str. 2 doslovně. Definice a výčet neobnovitelných → PDF str. 1.
- Výčet obnovitelných (sluneční záření, vítr, tekoucí voda, geotermální proudy, biomasa a bioplyn, vodík)
  → PDF str. 1 doslovně.
- Obsah dosavadního bloku jinak zachován (vodík jako nosič energie, oddíl o sluneční energii, přílivová
  energie a zpomalování Země, slabina „nedají se poručit", všechny tři úlohy se řešením i s hodnotou 25 %).
- ZAPIS je validní JSON (json.loads OK; klíče `jednotky`, `body`; 20 bodů, žádný nad 7 slov).
- Struktura: soubor začíná `## OBSAH`, za ZDROJE nic; 1× h2, 7× h3 (limit 7), žádný `<em>` (dřívější
  `<em>odkud</em>` nahrazen `<strong>`), žádné metakomentáře uvnitř OBSAH, „4 000 MWh" s mezerou.

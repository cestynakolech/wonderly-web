VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné

Ověření nálezů 1–5 z verze a:
1. Úvodní věta — OPRAVENO. Nyní „Některá sama svítí (Slunce, hvězdy, žárovka), jiná jsou osvětlená a odrážejí světlo do našich očí…" — souvětí „buď…nebo" už není rozťaté, větný zlomek zmizel. Obsah sedí na PDF str. 1 („jsou zdrojem světla… jsou osvětlená a jejich odražené světlo dopadá do našich očí").
2. Využití — OPRAVENO. „Kosmetická zrcadla používáme k líčení, estetická zrcadla opticky zvětšují místnost." Optické zvětšení místnosti je nyní přiřazeno výhradně estetickým zrcadlům, přesně podle PDF str. 7 („➢ Kosmetická zrcadla" bez dodatku; „➢ Estetická zrcadla: pro optické zvětšení místností"). Doplněk „k líčení" je doložen sousedním PDF 23 str. 15 („Kosmetická zrcadla na líčení").
3. Stranové převrácení — OPRAVENO. Doplněno „(při jiném natočení zrcadla zase horní strana jako dolní)", odpovídá PDF str. 6 „(popřípadě při jiné orientaci zrcadla se horní strana jeví jako dolní a naopak)".
4. Věta o procesech — OPRAVENO. Nyní „Na vznik obrazu nemá vliv, jestli se paprsek cestou odrazil, nebo lomil." Smysl sedí na PDF str. 4 „Jakými procesy paprsky cestou od předmětu do oka přišly, nemá na vznik obrazu vliv." Posun „dráha paprsku" odstraněn.
5. ZAPIS — OPRAVENO. Bod zní „cesta paprsku (odraz, lom): bez vlivu" (5 slov), smysl shodný s bodem 4.

Kontrola, že opravy nezanesly novou chybu:
- ZAPIS je validní JSON (json.loads OK), klíče zakon + body, 13 položek — souhlasí s tvrzením v ZDROJE.
- h2 „Optika rovinného zrcadla" = pole nazev v datech (klíč fyzika/7-rocnik/zrcadla-a-cocky/optika-rovinneho-zrcadla, ověřeno přes testy/data.mjs). Shoda.
- 3× h3 (limit 7). Žádná věta v OBSAH nad 20 slov (strojově přeměřeno). Žádný odstavec nad 4 věty.
- V OBSAH ani ZAPIS není metakomentář, „OPRAVA", „NÁLEZ", „MIMO SCOPE", odkaz na stranu PDF ani cizí značka; z nadstandardních znaků jen — , „ , → , ↔ (shodné s dosavadním blokem v temata.ts).
- Žádná desetinná ani necelá čísla.
- Věcně přepočteno/přečteno proti PDF „22 Rovinné zrcadlo/ Rovinné zrcadlo.pdf" (pdftotext -layout, 9 stran): všech pět vlastností obrazu, osová souměrnost, periskop i nápis AMBULANCE sedí na str. 5–9. Fyzikálně nic chybného: obraz v rovinném zrcadle je zdánlivý, stejně velký, stejně vzdálený, stranově převrácený, vzpřímený — souhlasí.

NOVÉ: žádné

DROBNOSTI:
1. ZAPIS, bod „využití: kosmetická a estetická zrcadla" — OBSAH obě zrcadla nově rozlišuje (líčení × zvětšení místnosti), zápis do sešitu je zase slévá dohromady. Nejde o nepravdu, jen o ztrátu rozlišení, kvůli kterému se nález 2 opravoval. Nabízí se „využití: kosmetická (líčení), estetická (zvětšení místnosti)".
2. OBSAH, vlastnost „zdánlivý": „je „za zrcadlem"" — otevírací uvozovka je česká (U+201E), zavírací je rovná ("). Vada je převzatá beze změny z dosavadního bloku v temata.ts, nevznikla touto opravou.

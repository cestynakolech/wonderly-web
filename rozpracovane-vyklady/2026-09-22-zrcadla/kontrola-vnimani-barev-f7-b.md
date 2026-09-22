# Nezávislá kontrola B — vyklad-vnimani-barev-f7.md

VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné
- Nález 1 (metakomentář v ZDROJE): odstavec s „python3 -c" a s čísly řádků 2195–2222 jako doložením je pryč; dosavadní blok se už necituje číslem řádku (viz drobnost 3).
- Nález 2 (špatný klíč): první odrážka ZDROJE zní „Dosavadní blok `fyzika/7-rocnik/zrcadla-a-cocky/vnimani-barev` v `temata.ts`" — klíč je dohledatelný, celek `svetlo` se v souboru už nevyskytuje.
- Nález 3 (cizí slova): OBSAH i ZAPIS nyní „purpurová (růžová), azurová (modrozelená)". Sedí na PDF 29 str. 3/13 (pdftotext ř. 57): „žlutá, magenta (růžová, purpurová) a azurová (modrozelená, tyrkysová)". „Magenta" zůstává jen v rozpisu zkratky CMYK, kde je hned přeložena.
- Nález 4 (protiřečící si pořadí u černé): pořadí prohozeno — nejdřív „černé barvivo vznikne smícháním základních barviv — pohltí všechno světlo", pak „přesto se do tiskáren přidává ještě černý inkoust — kvůli lepšímu odstínu a úspoře barevných inkoustů při černobílém tisku". Formulace sedí na PDF str. 10/13 (ř. 187): „z důvodu lepšího barevného odstínu a šetření barevných inkoustů při černobílém tisku"; volnější „kvůli sytosti barev" je pryč. Spojka „přesto" rozpor odstraňuje.
- Nález 5 (jak vznikají ostatní odstíny): doplněna odrážka „ostatní barvy (hnědá, růžová, …) vznikají složením všech tří barev v různém poměru" — doslovná opora PDF str. 4/13 (ř. 69).
- Nález 6 (malíři): nyní „Zajímavost: malíři při míchání temper používají jiné tři barvy — žlutou, červenou a modrou." Odpovídá rubrice „Pro zajímavost", PDF str. 11/13 (ř. 201–212), a slovem „jiné" je odlišeno od CMYK.

NOVÉ: žádné
Kontrola, že opravy nic nerozbily:
- ZAPIS: validní JSON, klíč `body`, 21 telegrafických bodů (o jeden víc kvůli nálezu 5), žádný nad 20 slov.
- Struktura: 1× h2, 4× h3 (limit 7 OK); žádný odstavec nad 4 věty; žádná věta ani odrážka nad 20 slov.
- V OBSAH ani ZAPIS žádný metakomentář, značka ➪, emoji ani odkaz na zdroje.
- Všechna změněná tvrzení doložena PDF 29 (str. 2–4/13 RGB a doplňkové barvy, str. 5–6/13 druhy látek, str. 7–8/13 barva těles, str. 10/13 CMYK a černé barvivo, str. 11–12/13 malíři). Fyzika sedí: RGB = sčítací míchání, CMYK = odčítací, černá jako nepřítomnost světla.
- Vynechání zajímavosti PDF str. 4/13 o „tyčinkách citlivých na barevné světlo" (rozpor s vlastním úvodem PDF) je doložené — podle zadání v pořádku, není nález.

DROBNOSTI:
1. Slovo „růžová" má v textu dva různé významy hned ve dvou sousedních odrážkách sekce RGB: jako vysvětlení purpurové (vzniká ze DVOU základních barev) a jako příklad „ostatních barev" (vzniká ze TŘÍ barev). Obojí je doslova z PDF a fyzikálně obojí platí (magenta = R+B, světle růžová potřebuje i zelenou), ale dítěti to může znít jako rozpor. Čistší by bylo „purpurová (sytě růžová)" nebo jiný příklad ostatních barev (hnědá, oranžová).
2. ZDROJE (poslední odstavce) používají fráze „VYNECHÁNO (věcně k rozhodnutí učitele)" a „NAVRŽENO K DOPLNĚNÍ — k rozhodnutí učitele". Věcné řešení je správné a doložené; frázi by bylo lepší nahradit prostým doložením rozporu v PDF.
3. Poslední odrážka ZDROJE znovu popisuje vlastní postup kontroly („vypuštěn metakomentář … odkaz na `python3 -c` a čísla řádků v `temata.ts`"). Původní vada je odstraněna, ale zápis o opravě znovu vnáší do ZDROJE řeč o postupu místo o zdroji.

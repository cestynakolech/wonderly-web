VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné

Ověření nálezů 1–8 z verze a:
1. Chod paprsků u rozptylky (ZÁVAŽNÉ) — OPRAVENO. Doplněna věta „U rozptylky platí stejné tři paprsky, jen se lámou tak, jako by vycházely ze zdánlivého ohniska." + bod v ZAPIS „u rozptylky: stejné paprsky, zdánlivé ohnisko". Sedí na PDF str. 16 („Rovnoběžný s osou … se láme tak, že po průchodu čočkou jako by vycházel z obrazového ohniska") a na Optické_čočky.md snímek 11 (konstrukce obrazu rozptylkou, prodloužení paprsků za čočkou). ZDROJE už netvrdí víc, než text obsahuje.
2. Čtvrtý případ 2f — OPRAVENO. „Spojka vytvoří čtyři druhy obrazů" + odrážka „předmět přesně ve 2f → skutečný, převrácený, stejně velký" + odpovídající bod v ZAPIS. Doloženo: Optické_čočky.md snímek 15 (tabulka „Finální tahák", řádek „Spojka (= 2f) → Skutečný, Převrácený, Stejně velký") a „SVĚTELNÉ JEVY 7" snímek 32, image26.jpeg (čtyři schémata, mj. „skutečný, převrácený, stejně velký"). Fyzikálně přepočteno ze zobrazovací rovnice: a = 2f ⇒ 1/a' = 1/f − 1/(2f) = 1/(2f) ⇒ a' = 2f, zvětšení −1, tedy skutečný, převrácený, stejně velký. Souhlasí. Odchylka od PDF (tři případy) je v ZDROJE výslovně zapsána jako rozpor PDF × prezentace, není rozhodnuta mlčky.
3. Praktické rozpoznání čočky — OPRAVENO. „Spojku od rozptylky poznáme i pohledem skrz čočku do dálky: spojka obraz převrací, rozptylka ne." Doslovná shoda se „SVĚTELNÉ JEVY 7" snímek 33 a s Optické_čočky.md snímek 12.
4. Kukátko — OPRAVENO. Doplněno „obraz je menší, zato je vidět celá chodba"; PDF str. 16 „dveřní kukátko (zmenšený obraz, ale širokoúhlý záběr)".
5. Zvětšení — OPRAVENO. „…je-li větší než 1, je obraz větší než předmět." Definice doložena „SVĚTELNÉ JEVY 7" snímky 24 i 32 („Zvětšení — poměr velikosti obrazu k velikosti předmětu"), doplněk je přímý důsledek definice poměru, žádné nové číslo.
6. Klíč jednotky — OPRAVENO. ZAPIS má „jednotky": f v metrech, optická mohutnost v dioptriích (D). Fyzikálně správně (1 D = 1 m⁻¹). Zápis s klíčem jednotky bez klíče vzorec je v datech zavedený (22 podtémat v temata.ts), podtema.mjs ho přijímá.
7. ZAPIS, obrazy spojky — OPRAVENO. Jeden slitý bod rozdělen na čtyři, slovy a bez znaků > < („spojka: dál než 2f → skutečný, převrácený, zmenšený" atd.), u každého je doplněn rozlišující znak převrácený / vzpřímený.
8. H2 × nazev — OPRAVENO. Pole nazev v datech (fyzika/7-rocnik/zrcadla-a-cocky/opticka-cocka, čteno přes testy/data.mjs) zní „Optická čočka (spojky a rozptylky)"; h2 výkladu je s ním znak po znaku shodné.

Kontrola, že opravy nezanesly novou chybu:
- ZAPIS je validní JSON, klíče jednotky + body, 25 položek (souhlasí se ZDROJE).
- 6× h3 (limit 7). Žádná věta v OBSAH nad 20 slov, žádný odstavec nad 4 věty (strojově přeměřeno).
- V OBSAH ani ZAPIS není metakomentář, odkaz na stranu PDF ani cizí značka; nadstandardní znaky jen — , → , ↔ , F´ (apostrof má i PDF str. 7).
- Žádná desetinná ani necelá čísla; jediná čísla jsou 1, 2f, f.
- Věcně proti PDF „25 Čočky, spojky, rozptylky.pdf" (pdftotext -layout, 18 stran): spojka uprostřed nejširší / rozptylka nejtenčí (str. 2–3), optická osa a optický střed (str. 6), dvě ohniska a f (str. 7), optická mohutnost (str. 7), skutečná × zdánlivá ohniska a znaménka f i dioptrií (str. 8, 14), oheň lupou (str. 7), tři paprsky spojky (str. 10), postup konstrukce (str. 10), tři obrazy spojky a jejich využití (str. 11–13), rozptylka vždy zdánlivý/vzpřímený/zmenšený (str. 16), využití (str. 17–18) — vše sedí, nic nového nevzniklo.

NOVÉ: žádné

DROBNOSTI:
1. OBSAH, „U rozptylky platí stejné tři paprsky, jen se lámou tak, jako by vycházely ze zdánlivého ohniska." — zobecnění na všechny tři paprsky je nepřesné: středový paprsek se neláme vůbec a ohniskový podle PDF str. 16 do ohniska míří, nevychází z něj. Formulace je doslova převzatá ze sesterského výkladu kulových zrcadel, takže série je jednotná; pro přesnost by stačilo „…jen se rovnoběžný paprsek láme tak, jako by vycházel ze zdánlivého ohniska."
2. OBSAH, „optická osa — spojnice středů křivosti obou kulových ploch, prochází optickým středem čočky" × „optický střed S — bod čočky, kterým prochází optická osa" — definice jsou vzájemně kruhové (osa přes střed, střed přes osu). PDF str. 6 optický střed nedefinuje vůbec, takže jde o vlastní formulaci; není nová (byla už ve verzi a), ale pro sedmáka nic nevysvětluje.
3. ZAPIS, „poznat je jde pohledem do dálky: spojka převrací" — neobratná čeština; přirozeněji „poznáme je pohledem do dálky: spojka převrací".
4. ZDROJE, poslední MIMO SCOPE o fotoaparátu: „NAVRŽENO K DOPLNĚNÍ jako případná zajímavost, k rozhodnutí učitele" — týž druh metakomentáře, jaký je u sesterského výkladu kulových zrcadel veden jako nález. Zde nevznikl touto opravou (byl ve verzi a) a MIMO SCOPE odrážka je jinak legitimní doklad, proto jen upozornění na nejednotnost dávky.

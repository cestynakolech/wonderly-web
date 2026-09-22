VERDIKT: NEPROŠLO

NEVYŘEŠENÉ: žádné

Ověření nálezů 1–9 z verze a:
1. Diagnóza prohozených definic — OPRAVENO. ZDROJE nyní říká „SKUTEČNOU chybu v podkladu, ne artefakt extrakce PDF", a chyba je doložena zápisem mimo výklad: ~/Desktop/Omega/dokumenty/kontrola-podkladu-fyzika7.md, řádek 26 („23 Kulová zrcadla, str. 4 … definice dutého a vypuklého zrcadla jsou prohozené … Na webu je uvedeno SPRÁVNĚ."). Věcné znění výkladu je fyzikálně správné: duté = vnitřní plocha, střed i ohnisko před zrcadlem, skutečné; vypuklé = vnější plocha, za zrcadlem, zdánlivé. Potvrzuje to i samo PDF str. 12 („Vypuklé zrcadlo má ohnisko za zrcadlem ➪ je zdánlivé").
2. Konstrukce obrazu — OPRAVENO. Doplněna druhá věta: „Pokud se neprotnou, ale jen se zdají vycházet z jednoho bodu, vzniká tam zdánlivý obraz." Odpovídá PDF str. 7 („pokud se paprsky po odrazu od zrcadla neprotnou, ale vychází jakoby z jednoho bodu, naše oko vytvoří v tomto bodě zdánlivý obraz předmětu").
3. Vrchol V — OPRAVENO. „nejvyšší bod zrcadla, když ho položíme okrajem na podložku (leží na optické ose)" = PDF str. 4 doslovně.
4. Parabolická zrcadla — OPRAVENO. Doplněny „satelitní paraboly pro příjem televizního signálu"; PDF str. 18 („využívají přijímací satelity k příjmu signálu — signál TV, záření z vesmíru"), prezentace Spherical_Mirror_Physics.md snímek 15 („využití: satelitní přijímače, vesmírná komunikace a dalekohledy") — ověřeno v obou.
5. Značení S × C — OPRAVENO. V OBSAH „střed křivosti S … (v prezentaci značený C)". Ověřeno: „SVĚTELNÉ JEVY 7" snímek 44 i 47 mají „C………….Střed křivosti zrcadla".
6. Pokrytí snímků 39–51 — OPRAVENO, doplněno do ZDROJE.
7. Citace strany — OPRAVENO na „PDF str. 5 (prohozený blok)"; ověřeno, že str. 11 obsahuje jen nadpis „2. Vypuklé zrcadlo" a citovaná věta je na str. 5.
8. ZAPIS — OPRAVENO. (a) bod rozdělen na „body zrcadla: vrchol V, optická osa o" a „body zrcadla: střed křivosti S, ohnisko F"; (b) „převrácený" doplněno do obou bodů o skutečném obrazu, shoda s PDF str. 8–9. body má nyní 21 položek.
9. H2 × nazev — VYŘEŠENO. Pole nazev v datech (fyzika/7-rocnik/zrcadla-a-cocky/kulova-zrcadla-dute-zrcadlo, čteno přes testy/data.mjs) zní „Kulová zrcadla a duté zrcadlo"; h2 výkladu zní přesně stejně.

Kontrola, že opravy nezanesly novou chybu:
- ZAPIS je validní JSON, klíče vzorec, jednotky, vzorecSlovy, body; 21 položek (souhlasí se ZDROJE).
- f = r/2 přepočteno: PDF str. 4 „r = |SV|", „Ohnisko F — bod přesně ve středu mezi středem křivosti a vrcholem", „Ohnisková vzdálenost f — vzdálenost mezi ohniskem a vrcholem" ⇒ f = |FV| = |SV|/2 = r/2. Souhlasí; navíc doslovně v Spherical_Mirror_Physics.md snímek 3 („F leží přesně v polovině mezi S a V, tedy f = r/2"). Jednotka m u r i f je správná.
- Tři význačné paprsky sedí na PDF str. 7 (rovnoběžný → přes F; ohniskový → rovnoběžně s osou; středový → po téže přímce zpět). Věta o vypuklém zrcadle sedí na PDF str. 13.
- Tři druhy obrazu dutého zrcadla sedí na PDF str. 8–10, vlastnosti obrazu vypuklého na str. 13, využití na str. 15–16, parabolická zrcadla na str. 17–18.
- 4× h3 (limit 7). Žádná věta v OBSAH nad 20 slov, žádný odstavec nad 4 věty (strojově přeměřeno).
- V OBSAH ani ZAPIS není metakomentář ani cizí značka; 💡 je zavedená značka projektu (39× v temata.ts) a je i v PDF str. 17.
- Žádná desetinná ani necelá čísla.

NOVÉ:
1. ZDROJE, 1. odrážka (konec) a poslední odrážka „KONTROLA PO OPRAVĚ" — metakomentář „rozhodnutí učitele". Doslovně: „…tento rozpor (nazev × dosavadní H2) zůstává k rozhodnutí učitele, sjednocení s polem `nazev` je krok podle kontraktu." a „nález 9 (H2 × nazev) zůstává zapsán jako rozhodnutí učitele — H2 ponecháno podle kontraktu opsané z pole `nazev`." Věcně je nález 9 uzavřený (h2 = nazev), takže odložení na učitele už nic neodkládá a je to jen metakomentář v dokumentaci. Druhá formulace navíc vznikla až při této opravě. OPRAVA: obě zmínky „zůstává k rozhodnutí učitele" / „zůstává zapsán jako rozhodnutí učitele" vypustit a ponechat jen konstatování „H2 sjednocen s polem `nazev`; dosavadní H2 zněl „Kulová zrcadla, duté a vypuklé zrcadlo", vypuklé zrcadlo je v textu nadále plně probráno."

DROBNOSTI:
1. ZAPIS, bod „duté obraz: blíž než f → zdánlivý, zvětšený (zrcátko)" — oprava nálezu 8b doplnila „převrácený" do obou bodů o skutečném obrazu, ale u třetího případu zůstalo chybět protějškové „vzpřímený", ačkoli OBSAH i PDF str. 10 ho uvádějí. Trojice bodů je tím nesourodá. Nabízí se „duté obraz: blíž než f → zdánlivý, vzpřímený, zvětšený".
2. OBSAH, „střed křivosti S — … (v prezentaci značený C)" — pro žáka čtoucího web není zřejmé, o kterou prezentaci jde. Srozumitelnější „někdy značený také C".

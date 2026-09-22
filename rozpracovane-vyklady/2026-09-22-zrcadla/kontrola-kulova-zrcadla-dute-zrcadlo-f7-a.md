VERDIKT: PROŠLO S DROBNOSTMI

Kontrolováno proti: PDF "/Users/Shared/Škola/7/4 Světlo/23  Kulová zrcadla, duté zrcadlo, vypuklé zrcadlo/Kulová zrcadla, duté zrcadlo, vypuklé zrcadlo.pdf" (18 stran, pdftotext -layout + pdftotext -raw + vykreslení str. 4 a 5 přes pdftoppm), popis prezentace Spherical_Mirror_Physics.md (15 snímků), popis prezentace "SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" snímky 39-51 (dle rozdeleni-prezentace-Svetlo.txt), dosavadní blok temata.ts.

Ověřeno bez nálezu: ZAPIS je validní JSON (klíče vzorec, jednotky, vzorecSlovy, body v pořadí dle kontraktu; 20 bodů). Vzorec f = r/2 je doložen dvakrát: prezentace Spherical_Mirror_Physics.md snímek 3 doslovně ("F leží přesně v polovině mezi S a V, tedy f = r/2") a PDF str. 4 slovně ("Ohnisko F - bod přesně ve středu mezi středem křivosti a vrcholem"; "Ohnisková vzdálenost f - vzdálenost mezi ohniskem a vrcholem"; "r = |SV|"). Přepočítáno: f = |FV| = |SV|/2 = r/2, souhlasí. Přiřazení duté = vnitřní plocha, ohnisko před zrcadlem, skutečné / vypuklé = vnější plocha, ohnisko za zrcadlem, zdánlivé je fyzikálně správně. Tři druhy obrazu dutého zrcadla souhlasí s PDF str. 8-10 i s prezentací snímky 7-9. 4× h3 (limit 7), žádná věta nad 20 slov, žádný odstavec nad 4 věty, žádné <em>, žádná desetinná čísla. Všechny 4 body dosavadního zápisu a všechny věty dosavadního obsahu jsou v novém zachovány. Pojem "vrchlík" doložen (prezentace snímek 2), solární kolektor (PDF str. 15), ušní zrcátko (PDF str. 15), tři význačné paprsky (PDF str. 7 doslovně).

NÁLEZY:

1. ZDROJE, "Jde zjevně o chybu extrakce dvousloupcového rozvržení PDF, ne o chybu podkladu"
   Co je špatně: toto tvrzení je prokazatelně nepravdivé. Strany 4 a 5 PDF jsem vykreslil (pdftoppm -r 80) a prohlédl: jsou JEDNOSLOUPCOVÉ. Na str. 4 je pod nadpisem "Druhy kulových zrcadel" vytištěno doslova "➢ Vypuklé - odrazná plocha je z vnitřní kulové plochy - střed a ohnisko leží před zrcadlem, paprsky jimi skutečně prochází" a na str. 5 "➢ Duté - odrazná plocha je z vnější strany kulové plochy - střed a ohnisko leží za zrcadlem, paprsky jimi skutečně neprochází, jsou zdánlivé". Prohození tedy není artefakt extrakce, ale SKUTEČNÁ CHYBA V PODKLADU UČITELE.
   Důsledek: OBSAH-PRAVIDLA kap. 1 a zákaz 7 žádají, aby se chyba v podkladech nahlásila a zapsala do ~/Desktop/Omega/dokumenty/kontrola-podkladu-*.md. Diagnóza "artefakt extrakce" tento zápis umlčí a chyba zůstane v podkladu, ze kterého se budou dělat kvízy, hry i testy.
   Co má být: přeformulovat na "chyba v PDF str. 4-5: nadpisy ➢ Vypuklé a ➢ Duté jsou prohozené, ověřeno vykreslením stránky; nahlášeno do kontrola-podkladu". Věcné znění výkladu je správně a zůstává.

2. Sekce "Konstrukce obrazu pomocí tří paprsků", "Kde se dva odražené paprsky protnou, vzniká krajní bod obrazu."
   Co je špatně: zobecnění na "obrazu" dělá z věty nepravdu pro třetí polohu předmětu. PDF str. 7 říká "v bodě, kde se odražené paprsky protnou, získáme krajní bod SKUTEČNÉHO obrazu předmětu" a hned dodává druhý případ: "pokud se paprsky po odrazu od zrcadla neprotnou, ale vychází jakoby z jednoho bodu, naše oko vytvoří v tomto bodě zdánlivý obraz předmětu". U předmětu blíž než f (který výklad o dva odstavce níž popisuje jako zdánlivý obraz) se odražené paprsky NEPROTNOU - žák podle napsaného pravidla obraz nenajde.
   Co má být: doplnit druhou větu o zdánlivém obrazu (PDF str. 7). Sesterský výklad čoček tentýž krok obsahuje, zde chybí.

3. Sekce "Popis kulového zrcadla", "vrchol V - nejvyšší bod zrcadla (na optické ose)"
   Co je špatně: vypadla podmínka, bez které je definice nejednoznačná. PDF str. 4: "Vrchol zrcadla V - když položíte zrcadlo okrajem na podložku, je to nejvyšší bod zrcadla." Nejvyšší bod závisí na tom, jak zrcadlo leží; pro dítě 9-10 let je věta bez podmínky matoucí.
   Co má být: doplnit podmínku z PDF str. 4, nebo definovat vrchol jako průsečík optické osy s plochou zrcadla.

4. Závěrečný odstavec, "Přesnější jsou parabolická zrcadla - používají je dalekohledy, radioteleskopy i Hubbleův a Webbův teleskop."
   Co je špatně: vypadli satelitní přijímače, ačkoli je oba zdroje u parabolických zrcadel výslovně uvádějí - PDF str. 18 "vyu ívají přijímací satelity k příjmu signálu (signál TV, záření z vesmíru)" a prezentace Spherical_Mirror_Physics.md snímek 15 "využití: satelitní přijímače, vesmírná komunikace a dalekohledy". Sekce ZDROJE je sama cituje ("používají je satelitní přijímače a vesmírná zrcadla"), ale v OBSAH nejsou. Řetěz, bod 2.
   Co má být: doplnit "satelitní paraboly pro příjem televizního signálu" (PDF str. 18) - pro sedmáka nejnázornější příklad ze všech.

5. Značení středu křivosti - v celém výkladu "S"
   Co je špatně: nezaznamenaný rozpor mezi rovnocennými zdroji. PDF (str. 3-4) a Spherical_Mirror_Physics.md používají S, ale vlastní prezentace učitele "SVĚTELNÉ JEVY 7", která podle rozdeleni-prezentace-Svetlo.txt pokrývá toto podtéma snímky 39-51, používá C: snímek 44 i 47 zní "C....Střed křivosti zrcadla, F.....Ohnisko zrcadla, V....Vrchol zrcadla" a stejné značení mají i obrázky snímků 41-45. Žák uvidí ve třídě C a na webu S. OBSAH-PRAVIDLA kap. 3 žádá rozpor mezi PDF a prezentací ověřit a ZAPSAT, ne rozhodnout mlčky.
   Co má být: buď uvést obě značení ("střed křivosti S (v prezentaci značený C)"), nebo rozpor zapsat do ZDROJE a do kontrola-podkladu.

6. ZDROJE jako celek - chybí prezentace "SVĚTELNÉ JEVY 7" snímky 39-51
   Co je špatně: k tomuto podtématu patří podle rozdeleni-prezentace-Svetlo.txt 13 snímků (39-51) vlastní prezentace učitele. ZDROJE je nezmiňuje ani jako pokryté, ani jako MIMO SCOPE - pokrytí druhého rovnocenného zdroje tedy nejde ověřit. Obsahově jsem je prošel a nadrámcovou látku jsem v nich nenašel (jde o stejné konstrukce obrazu, snímek 49 "Duté zrcadlo (parabolické)", snímek 50 porovnání sférického a parabolického zrcadla), takže doplnění textu to nevyžaduje - chybí jen doklad.
   Co má být: přidat do ZDROJE řádek s pokrytím snímků 39-51.

7. ZDROJE, "podle PDF str. 11 a popisu prezentace snímek 4 a 14, kde je u vypuklého zrcadla výslovně uvedeno 'střed (S) a ohnisko (F) leží za zrcadlem'"
   Co je špatně: chybná citace strany. PDF str. 11 obsahuje jen nadpis "2. Vypuklé zrcadlo" a nic víc. Citovaná věta o středu a ohnisku za zrcadlem je v PDF na str. 5 (v prohozeném bloku "➢ Duté"). Citace na prezentaci snímek 4 a 14 je správná.
   Co má být: opravit na "PDF str. 5 (prohozený blok, viz nález 1) a prezentace snímek 4 a 14".

8. ZAPIS - telegrafické body
   Co je špatně: (a) bod "body zrcadla: vrchol V, osa o, střed S, ohnisko F" má 10 slov a čtyři hesla, kontrakt žádá 3-6 slov a jedno heslo na bod; (b) body o obrazu vypustily rozlišující znak "převrácený" - "duté obraz: dál než r → skutečný, zmenšený" a "duté obraz: mezi f a r → skutečný, zvětšený", ačkoli OBSAH i PDF str. 8-9 převrácení uvádějí. Zápis do sešitu je to jediné, co žákovi zůstane, a chybí v něm právě to, čím se skutečný obraz pozná.
   Co má být: rozdělit bod (a) na dva a doplnit "převrácený" do obou bodů podle (b).

9. Nadpis H2 změněn z "Kulová zrcadla, duté a vypuklé zrcadlo" na "Kulová zrcadla a duté zrcadlo"
   Co je špatně: kontrakt sice žádá H2 opsat z pole nazev, ale z nadpisu tím vypadlo "vypuklé", kterému výklad věnuje celou sekci a pět bodů zápisu. ZDROJE změnu poctivě přiznává; upozorňuji jen na důsledek - nadpis už neodpovídá obsahu a podtéma se hůř hledá.
   Co má být: rozhodnutí učitele - buď sjednotit opačně (upravit pole nazev na "Kulová zrcadla, duté a vypuklé zrcadlo"), nebo ponechat.

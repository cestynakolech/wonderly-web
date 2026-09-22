VERDIKT: PROŠLO S DROBNOSTMI

Kontrolováno proti: PDF „/Users/Shared/Škola/7/4 Světlo/19.  Světlo, zdroje světla, šíření světla/ 19.  Světlo, zdroje světla, šíření světla.pdf" (16 s.), popis prezentace „SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" (snímky 1–15), „rozdeleni-prezentace-Svetlo.txt", dosavadní blok `fyzika/7/svetlo-a-jeho-sireni/svetlo-jeho-zdroje` v `src/data/temata.ts`, kontrakt ZADANI-WORKER-VYKLAD.md, OBSAH-PRAVIDLA.md § 3.

OVĚŘENO BEZ NÁLEZU
- Výpočet: 150 000 000 : 300 000 = 500 s; 500 s = 8 min 20 s (přepočítáno `node`). Souhlasí s PDF str. 15 („přibližně 8 minut").
- Rychlosti: vakuum 300 000 km/s = 300 000 000 m/s (PDF str. 15), voda 225 000, sklo 200 000 (PDF str. 15), diamant 125 000 (rozdeleni-prezentace-Svetlo.txt, doporučená sada; kontrola n=2,42 → 300 000/2,42 = 123 967 ≈ 125 000). Vše v celých číslech.
- 525 °C, 4 500 °C, 433 let, 150 000 000 km, AU, ly — všechna čísla mají oporu (PDF str. 3, 15, 16). Čísla od tisíce psána s mezerou.
- Struktura: 1× h2, 7× h3 (strop 7 dodržen), 0× <em>, JSON v ZAPIS je validní (`JSON.parse` OK, 20 bodů), soubor začíná `## OBSAH`, za ZDROJE nic dalšího, žádné cizí značky ani metakomentáře v OBSAH.
- Věty do ~20 slov, odstavce max 3 věty. Všech 5 dosavadních bodů zápisu i všechny dosavadní věty OBSAH zachovány.
- Citace stran v ZDROJE jsem ověřil kus po kuse — sedí (str. 1 optika, 2 IR/UV, 3 zdroj+rozžhavená, 4 chemické, 5 výboj, 6 fosforeskující/elektronické/druhotné, 7–9 vliv a druhy prostředí, 10 homogenní, 10–12 přímočaré šíření a paprsek, 12–14 bodový/plošný, 15 rychlost a AU, 16 Polárka).

NÁLEZY
1. [DROBNÉ] sekce „Optické prostředí", odrážky „průsvitné … (mlha, kouř, mléčné sklo)" a „neprůhledné … (kov, dřevo, beton)" — vypadly dosavadní příklady z webu: „matné sklo" (průsvitné) a „zeď, zrcadlo" (neprůhledné). Železné pravidlo kontraktu: dosavadní příklad se nikdy nevyřazuje. Navíc obojí má oporu i v prezentaci (snímek 13: „Průsvitné … (matné sklo)", „Neprůhledné … (klasické zrcadlo)"). MÁ BÝT: příklady doplnit zpět vedle nových z PDF str. 8–9.

2. [DROBNÉ] ZAPIS, body 1–5 („Zdroje světla světlo vyrábějí, zatímco ostatní předměty jen odrážejí cizí světlo." atd.) — prvních pět bodů jsou souvětí o 12–14 slovech, kontrakt B žádá telegraficky „3–6 slov na řádek, jedno heslo na bod" (schválený vzor `vyklad-zakon-zachovani-f8.md` má 5 telegrafických bodů; druhý výklad téhož celku, `odraz-svetla`, tytéž dosavadní věty na telegrafický tvar převedl). MÁ BÝT: sjednotit tvar (obsah dosavadních vět zachovat, jen zkrátit), zároveň odpadne částečná duplicita: bod 1 × „druhotné zdroje: odrážejí cizí světlo (Měsíc, zrcadlo)", bod 2 × „bodový zdroj: paprsky rozbíhavé; plošný: rovnoběžné". Počet 20 bodů je na horní hranici únosnosti.

3. [DROBNÉ] ZAPIS, `jednotky`: „dráha — značíme s, jednotka km (kilometr)" a „rychlost — značíme v, jednotka km/s" — jednotkou dráhy je metr (m) a rychlosti metr za sekundu (m/s); kilometr je jen jednotka zvolená v tomto příkladu. Tvrzení nemá oporu v PDF ani v dosavadním bloku (ten u tohoto podtématu `jednotky` vůbec nemá). MÁ BÝT: „dráha — značíme s, jednotka m (metr)", „rychlost — značíme v, jednotka m/s", a větu o dosazování ponechat („v příkladu dosazujeme v kilometrech a kilometrech za sekundu").

4. [DROBNÉ] ZAPIS, `vzorec: "t = s : v"` — vztah není v PDF 19 ani v dosavadním bloku; ZDROJE ho samy označují „VLASTNÍ VÝPOČET (doplňkový)". Kontrakt B přitom klíč `vzorec` povoluje „jen je-li ve zdroji/dosavadním bloku". MÁ BÝT: buď klíč vynechat a výpočet nechat jen v textu „Pro zvídavé", nebo doplnit oporu (odkaz na dřívější podtéma o pohybu) a nechat rozhodnout učitele.

5. [DROBNÉ] OBSAH, první řádek `<h2>Světlo, zdroje světla, šíření světla</h2>` — kontrakt: „Název do `<h2>` z `nazev`", přičemž `nazev` bloku je „Světlo a jeho zdroje". (Stejný rozpor má i dosavadní web, takže nejde o regresi, ale o nesplněný bod kontraktu.) MÁ BÝT: rozhodnout — buď h2 = „Světlo a jeho zdroje", nebo zároveň upravit `nazev`; tiše ponechat rozpor ne.

6. [DROBNÉ] sekce ZDROJE jako celek — prezentace je podle OBSAH-PRAVIDLA.md § 3 („PREZENTACE JSOU ROVNOCENNÝ ZDROJ S PDF") rovnocenný zdroj, ale ZDROJE ji necitují vůbec; odkaz je jen na `rozdeleni-prezentace-Svetlo.txt` kvůli rychlosti v diamantu. Látka snímku 15 („Rychlost světla v materiálu se mění v závislosti na indexu lomu materiálu…", monofrekvenční/monochromatické světlo), který rozdělení přiřazuje právě tomuto podtématu (snímky 1–15), není ani zařazena, ani označena MIMO SCOPE. MÁ BÝT: snímky 1–15 projít a nezařazenou látku výslovně označit „MIMO SCOPE" s odůvodněním (patří k `lom-svetla`).

7. [DROBNÉ] PDF str. 3 „Vyzařování světla u zvířat a rostlin říkáme bioluminiscence" a PDF str. 14 „Ve větších vzdálenostech od bodového zdroje se míra rozbíhavosti paprsků zmenšuje … sluneční paprsky dopadající na Zemi jsou … prakticky rovnoběžné" — ani jedno není ve výkladu a ani jedno není v ZDROJE označeno MIMO SCOPE (kontrakt: nezařazená nová látka ze zdroje se označuje). MÁ BÝT: doplnit (bioluminiscence se hodí k chemickým zdrojům — světluška) nebo označit MIMO SCOPE.

8. [DROBNÉ — nepřesnost převzatá z podkladu] sekce „Druhy zdrojů podle vzniku", „Povrch Slunce má teplotu asi 4 500 °C" — opora je (PDF str. 3 „Slunce (teplota povrchu asi 4500°C)"), ale údaj neodpovídá skutečnosti: teplota fotosféry Slunce je asi 5 500 °C (5 778 K). Podle OBSAH-PRAVIDLA.md § 3 se údaj z podkladu přepočítává, protože „v podkladech už chyby byly". MÁ BÝT: nahlásit učiteli jako rozpor podkladu (vzor: upozornění v `rozdeleni-prezentace-Svetlo.txt`) a po rozhodnutí uvést „asi 5 500 °C".

9. [DROBNÉ — nepřesnost převzatá z podkladu] sekce „Neviditelné záření", „vidí ho hadi a netopýři" (IR) — opora je (PDF str. 2 „vidí ho hadi, netopýři"), ale tvrzení je věcně chybné: netopýři infračervené záření nevidí, orientují se echolokací; IR vnímají hadi (jamkové orgány) a někteří brouci. MÁ BÝT: rozpor podkladu nahlásit učiteli a netopýry z výčtu vypustit.

# Sladění kvízů s novými výklady — F8 elektřina, 8 podtémat (nezávislá kontrola, 22. 9. 2026)

Metoda: `node podtema.mjs ROOT get fyzika/8-rocnik/elektrina/<klic>` (pole `obsah` + `zapis`)
proti `node testy/vypis-kviz.mjs <klic>` (21 otázek, správná první). Všechny výpočty přepočítány
(`node -e`: 6·1,5=9 · 3·1,5=4,5 · 4·1,5=6 · 2000:200=10 · 2400:800=3 · 3000:5=600 · 1,5 V=1500 mV ·
6:3=2 · 2·5=10 · 2000:500=4 — vše OK). Náskok = délka správné odpovědi minus délka nejdelšího
distraktoru; práh brány `zkontroluj.mjs` je ≥10 znaků.

Typy: (a) fakt/číslo navíc nebo jinak než ve výkladu · (b) otázka na vypuštěnou látku ·
(c) nosná část výkladu bez otázky · (d) délková nápověda a únik odpovědi.

---

## elektricky-naboj — VERDIKT: NESLADĚNO (8 nálezů)

NÁLEZY:

1. (d) otázka č. 5 „Jaký náboj má neutron?" | náskok +13 (`žádný (je neutrální)` [20] vs `kladný` [6], `záporný` [7]) — správná odpověď je o 13 znaků delší, nad prahem brány.
   NÁVRH: „Jaký náboj má neutron v jádře atomu?" — `žádný` / `kladný jako proton` / `záporný jako elektron`. Vysvětlení: „Neutron je bez náboje, náboj nesou jen proton (+) a elektron (−)."

2. (d) otázka č. 6 „Kdy je těleso elektricky neutrální?" | náskok +13 (`má stejně protonů a elektronů` [29] vs [16]/[14]).
   NÁVRH: „Kdy je těleso elektricky neutrální?" — `stejně protonů a elektronů` / `má víc elektronů než protonů` / `má víc protonů než elektronů`. Vysvětlení: „Náboje se navenek vyruší."

3. (d) otázka č. 7 „Co je kationt?" | náskok +13 (`atom, který ztratil elektron (kladný)` [37] vs [24]/[14]).
   NÁVRH: „Co je kationt?" — `atom, který ztratil elektron` / `atom, který přijal elektron navíc` / `atom, který má náboj vyrušený` . Vysvětlení: „Chybí mu elektron, proto převáží kladný náboj protonů."

4. (d) otázka č. 8 „Jak se tělesa elektrují?" | náskok +17 (`třením (přesunem elektronů)` [27] vs `zahřátím` [8], `osvětlením` [10]).
   NÁVRH: „Jak se tělesa elektrují?" — `třením` / `zahřátím nad plamenem` / `osvětlením silnou lampou`. Vysvětlení: „Při tření přecházejí elektrony z jednoho tělesa na druhé."

5. (c) nepokryto — **elementární náboj** `e = 1,6 · 10⁻¹⁹ C` je v h3 „Elektroskop a měření náboje" i v poli ZAPIS (`jednotky`), ale neptá se na něj žádná otázka.
   ŠKRTNOUT a NAHRADIT otázku č. 2 (»Které dva druhy elektrického náboje existují?« — odpověď plyne z otázek 3, 4 a 5, je to duplicita):
   „Jak se jmenuje nejmenší možný náboj, který má jeden elektron nebo proton?" — `elementární náboj` / `neutrální náboj` / `coulombův náboj`. Vysvětlení: „Elementární náboj e = 1,6 · 10⁻¹⁹ C; náboj každého tělesa je vždy jeho násobkem."

6. (c) nepokryto — **statická elektřina** (jiskra při svlékání svetru, dotyk karoserie, uzemňování cisteren s benzínem) je celý odstavec h3 „Přenos náboje" i bod ZAPIS `statická elektřina: jiskry při doteku nabitých těles`; žádná otázka.
   ŠKRTNOUT a NAHRADIT otázku č. 20 (»Jak lze náboj přesouvat mezi tělesy?« — obsahově totéž co otázka 17 o zákonu zachování náboje):
   „Proč se cisterna s benzínem před vypuštěním uzemňuje?" — `aby nepřeskočila jiskra` / `aby benzín rychleji vytekl` / `aby se benzín neohřál`. Vysvětlení: „Při přesunu elektronů může přeskočit jiskra a u hořlavin hrozí vznícení."

7. (c) nepokryto — **elektrometr** (elektroskop se stupnicí, porovná velikost náboje) je v ZAPIS bodě `elektroskop pozná nabité těleso, elektrometr porovná velikost`; otázka č. 19 se ptá jen na elektroskop.
   ŠKRTNOUT a NAHRADIT otázku č. 4 (»Která částice nese kladný náboj?« — trojice otázek 3+4+5 zkouší jedno a totéž a navzájem si prozrazují odpovědi):
   „Kterým přístrojem porovnáme, které ze dvou těles má větší náboj?" — `elektrometrem` / `elektroskopem` / `teploměrem`. Vysvětlení: „Elektroskop jen pozná, že těleso je nabité. Velikost porovná až elektrometr — elektroskop se stupnicí."

8. (c) nepokryto — celý h3 **„Pro zvídavé: počítáme"** (1 C = 6 · 10¹⁸ elektronů, autobaterie 200 C, převody mC/μC/nC, příklad 5 mC = 0,005 C) nemá jedinou otázku; podle pravidla mají otázky z nadstavby patřit na konec bloku.
   ŠKRTNOUT a NAHRADIT otázku č. 10 (»Jak na sebe působí souhlasné náboje?« — spolu s otázkou 11 tvoří pár, kde si obě otázky navzájem dávají odpověď v distraktorech; obě se dají sloučit do jedné) a otázku 11 přeformulovat na „Jak na sebe působí souhlasné a jak nesouhlasné náboje?" — `souhlasné se odpuzují, nesouhlasné přitahují` / `souhlasné se přitahují, nesouhlasné odpuzují` / `obojí se vždy jen přitahuje`.
   Nová otázka na konec bloku: „Kolik coulombů je náboj 5 mC?" — `0,005 C` / `0,05 C` / `5000 C`. Vysvětlení: „1 mC = 0,001 C, takže Q = 5 · 0,001 C = 0,005 C."

Poznámka (nehlášeno jako nález, pod prahem): otázka č. 1 má náskok +8 (`elektrický náboj` [16] vs `hmotnost` [8]).

---

## elektricke-pole — VERDIKT: NESLADĚNO (5 nálezů)

NÁLEZY:

1. (d) otázka č. 2 „Jak se elektrické pole projevuje?" | vysvětlení zní doslova „Pole působí silou i na dálku." a tím dává odpověď na otázku č. 3 („Musí se tělesa dotýkat…?" → `ne, působí i na dálku`).
   NÁVRH: vysvětlení u otázky 2 zkrátit na „Pole se pozná podle síly, kterou působí na jiná tělesa." (bez slova „na dálku").

2. (c) nepokryto — ZAPIS bod `elektroskop: dotyk při indukci = trvalé nabití` (odstavec v h3 „Vodič v elektrickém poli": dotyk rukou ve chvíli, kdy je tyč blízko, nabije elektroskop natrvalo) nemá žádnou otázku.
   ŠKRTNOUT a NAHRADIT otázku č. 3 (»Musí se tělesa dotýkat…?« — duplicitní s otázkou 2 i s otázkou 1):
   „Kdy zůstane elektroskop nabitý i po oddálení nabité tyče?" — `když se ho při indukci dotkneme rukou` / `když tyč jen přiblížíme a zase oddálíme` / `vždy, elektroskop se už nevybije`. Vysvětlení: „Dotyk odvede část náboje do země, a proto elektroskopu po oddálení tyče náboj zůstane."

3. (c) nepokryto — ZAPIS bod `izolant: náboj z něj nejde odvést` (h3 „Izolant v elektrickém poli": „Na rozdíl od vodiče z izolantu náboj odvést nelze.") nemá otázku.
   ŠKRTNOUT a NAHRADIT otázku č. 12 (»Jak na sebe působí nesouhlasně nabitá tělesa?« — slovo od slova táž otázka jako otázka 11 v bloku elektricky-naboj a překrývá se i s otázkou 1 zde):
   „V čem se izolant v elektrickém poli liší od vodiče?" — `náboj z něj nejde odvést` / `vůbec ho pole neovlivní` / `náboj z něj odteče snadněji`. Vysvětlení: „V izolantu se elektrony jen natočí (polarizace), ale těleso neopustí — odvést je nelze."

4. (c) nepokryto — pokus se siločárami (dva nabité drátky v oleji, krupice se srovná podél siločar) je v h3 „Siločáry"; žádná otázka. DROBNÉ.
   NÁVRH (až se uvolní místo, jinak nechat): „Jak si tvar siločar ukážeme v pokusu?" — `krupicí na hladině oleje` / `pilinami na papíře` / `solí ve vodě`.

5. (d) otázka č. 15 „Co posádku v autě při bouřce NEchrání…" | distraktor `zavřená okna bez sahání na kov` je doslova odpověď otázky č. 21 (`zavřít okna a nedotýkat se kovových částí`) — jedna otázka řeší druhou.
   NÁVRH: distraktor u otázky 15 vyměnit za `plastová palubní deska uvnitř`, zbytek beze změny.

Poznámka: poměr je vychýlený — 9 z 21 otázek (13–21) je z nadstavbového oddílu „⚡ Faradayova klec", zatímco jádro (indukce, polarizace) má dohromady 3 otázky. Otázky z nadstavby jsou správně až na konci bloku.

---

## vznik-elektrickeho-proudu — VERDIKT: NESLADĚNO (6 nálezů)

NÁLEZY:

1. (a) otázka č. 9 „Co je střídavý proud (AC)?" | vysvětlení uvádí „50 period za sekundu, tedy 100 obratů (svorky se prohodí každých 10 ms)" — výklad tohoto podtématu neobsahuje ani 50 Hz, ani 100 obratů, ani 10 ms (grep na „50", „perioda" ve výkladu: 0 výskytů). Fyzikálně to sedí, ale je to látka navíc a pro 8. ročník bez opory ve výkladu.
   NÁVRH: vysvětlení nahradit za „Střídavý proud mění směr pravidelně, mnohokrát za sekundu — takový je v zásuvce. Stejnosměrný (z baterie) teče stále stejným směrem." Otázka i odpovědi beze změny.

2. (a) otázka č. 12 „Jak se pohybují částice bez napětí?" | správná odpověď `neuspořádaně` a vysvětlení „Bez napětí konají jen tepelný pohyb." — tepelný ani neuspořádaný pohyb v tomto výkladu vůbec není (patří do podtématu elektricky-proud-v-kovech-odpor, kde je otázka č. 2 doslova táž).
   ŠKRTNOUT a NAHRADIT (nepokrytý h3 „Odkud bereme napětí", viz nález 4):
   „Co v elektrárně roztáčí generátor, který vyrábí napětí?" — `turbína` / `baterie` / `rezistor`. Vysvětlení: „Turbína je kolo roztáčené vodou, větrem nebo párou; generátor pak otáčivým pohybem vyrábí napětí."

3. (d) otázka č. 21 „Kromě LED diody, u kterého dalšího zařízení také záleží na směru proudu?" | zadání doslova prozrazuje odpověď otázky č. 11 („U kterého spotřebiče záleží na směru proudu?" → `LED dioda`); distraktor `klasická obyčejná žárovka` zase prozrazuje otázku č. 17.
   ŠKRTNOUT a NAHRADIT (nepokrytý bod ZAPIS `kladné ionty → záporná svorka`, viz nález 5):
   „Kam v obvodu míří kladné ionty?" — `k záporné svorce zdroje` / `ke kladné svorce zdroje` / `nikam, ionty se nepohybují`. Vysvětlení: „Kladné ionty přitahuje záporná svorka, záporné částice naopak kladná."

4. (c) nepokryto — celý h3 **„Odkud bereme napětí"** (elektrárna a rozvodná síť, turbína větrná/vodní/parní, generátor, chemická reakce v monočláncích, solární panely) a s ním dva body ZAPIS (`energii dává otáčivý pohyb (turbína, generátor)`, `energii dává i chemická reakce, slunce`) nemá jedinou otázku. Otázka č. 14 se ptá jen na výčet zdrojů (zásuvka/baterie/akumulátor). Řeší nález 2.

5. (c) nepokryto — ZAPIS bod `kladné ionty → záporná svorka`; otázka č. 19 pokrývá jen elektrony ke kladné svorce. Řeší nález 3.

6. (c) nepokryto — poslední odstavec výkladu („Spotřebiče, u kterých na směru záleží, mají uvnitř obvod, který střídavý proud změní na stejnosměrný") nemá otázku. DROBNÉ.
   ŠKRTNOUT a NAHRADIT otázku č. 17 (»U které součástky nezáleží na směru proudu?« — trojice 11+17+21 zkouší jedno a totéž):
   „Jak může nabíječka z LED světlem fungovat ze zásuvky, když LED potřebuje stejnosměrný proud?" — `obsahuje obvod, který proud usměrní` / `LED umí pracovat i se střídavým proudem` / `zásuvka dodává rovnou stejnosměrný proud`. Vysvětlení: „Spotřebiče citlivé na směr mají uvnitř obvod, který střídavý proud změní na stejnosměrný."

---

## chemicke-zdroje-napeti — VERDIKT: NESLADĚNO (6 nálezů)

NÁLEZY:

1. (a) ZÁVAŽNÉ — otázka č. 10 „Který článek je vhodný do mobilu a notebooku?" | správná odpověď `lithiový`, ale výklad říká přesný opak: „Lithiové články (jednorázové) — … hodinky, klíč od auta, baterie na základní desce počítače. **(Mobil, fotoaparát a notebook mají jiný typ — dobíjecí lithium-iontový akumulátor.)**"
   NÁVRH: „Do kterého zařízení se hodí jednorázový lithiový článek?" — `do klíče od auta` / `do mobilního telefonu` / `do startéru auta`. Vysvětlení: „Jednorázové lithiové články jsou kvalitní i po letech skladování — hodinky, klíč od auta, základní deska počítače. Mobil má jiný typ, dobíjecí lithium-iontový akumulátor."

2. (a) otázka č. 9 „Co se hromadí na záporné elektrodě?" | výklad tohoto podtématu o hromadění elektronů nemluví — říká jen, že „reakce nabije jednu elektrodu záporně a druhou kladně". Navíc náskok +1 (`elektrony` nejdelší).
   ŠKRTNOUT a NAHRADIT (nepokrytý převod `1 Ah = 1 000 mAh` z pole ZAPIS, viz nález 6):
   „Kolik miliampérhodin je kapacita 1 Ah?" — `1 000 mAh` / `100 mAh` / `10 mAh`. Vysvětlení: „Předpona mili znamená tisícinu, takže 1 Ah = 1 000 mAh."

3. (a) otázka č. 20 „Co naměří voltmetr, když jsou obě elektrody článku ze STEJNÉHO kovu?" | odpověď `0 V` — výklad hodnotu 0 V netvrdí a voltmetr v tomto podtématu vůbec nezmiňuje; říká jen „elektrody z různých materiálů" a „napětí určuje dvojice použitých kovů". DROBNÉ (závěr je správný, ale opřený o domyšlení).
   NÁVRH: přeformulovat bez měřidla a bez čísla: „Proč nevznikne napětí, když jsou obě elektrody ze stejného kovu?" — `napětí vzniká až mezi různými kovy` / `stejné kovy dávají dvojnásobné napětí` / `stejné kovy elektrolyt rozpustí rychleji`. Vysvětlení: „Napětí určuje dvojice různých materiálů elektrod — u stejného kovu není mezi elektrodami rozdíl."

4. (c) nepokryto — názvy elektrod **anoda / katoda** (odrážky pod H2, bod ZAPIS `elektrody: záporná (anoda), kladná (katoda)`) nemá otázku (grep „anoda|katoda" v bloku: 0).
   ŠKRTNOUT a NAHRADIT otázku č. 6 (»Jaké napětí má autobaterie?« — doslovný duplikát otázky č. 15 v bloku elektricke-napeti-mereni; 12 V se tam zkouší také):
   „Jak se jmenuje záporná elektroda galvanického článku?" — `anoda` / `katoda` / `elektrolyt`. Vysvětlení: „Záporná elektroda je anoda (třeba zinek), kladná katoda (třeba uhlík)."

5. (c) nepokryto — zákaz **zkratování** baterie („Baterii nikdy nezkratuj drátem — proud se prudce zvedne a článek se rozpálí", bod ZAPIS `nezkratovat, …`) nemá otázku (grep „zkrat" v bloku: 0).
   ŠKRTNOUT a NAHRADIT otázku č. 12 (»Co může udělat vybitý zinkový článek?« — překrývá se s otázkou 18, kde se vytečení také objevuje):
   „Co se stane, když spojíš obě svorky baterie holým drátem?" — `článek se rozpálí` / `baterie se dobije` / `nestane se vůbec nic`. Vysvětlení: „Bez spotřebiče prudce vzroste proud a článek se rozpálí — baterii nikdy nezkratuj."

6. (c) nepokryto — převod `1 Ah = 1 000 mAh` z pole ZAPIS (`jednotky`). Řeší nález 2.

Poznámka: otázky 4, 5 a 6 (1,5 V / 4,5 V / 12 V) jsou obsahově totožné s otázkami 13, 14 a 15 bloku elektricke-napeti-mereni — mezi bloky `testy/uniky.mjs` neporovnává. Doporučuji rozdělit: čísla článků nechat tam, sem dát chemii článku.

---

## elektricke-obvody — VERDIKT: NESLADĚNO (4 nálezy)

NÁLEZY:

1. (c) ZÁVAŽNÉ nepokryto — **důsledek poruchy** u sériového a paralelního zapojení, tedy dva body ZAPIS (`sériově (za sebou): porucha vypne celý obvod`, `paralelně (vedle sebe, rozvětvený): porucha vypne jen větev`) a dva celé odstavce výkladu (vánoční žárovičky vs. domácí zásuvky). Otázky 5 a 6 se ptají jen na geometrii („za sebou / vedle sebe"). Grep „vánoč|větev|poškodí" v bloku: 0.
   ŠKRTNOUT a NAHRADIT otázku č. 17 (»Kdy vznikne zkrat, i když se svorky zdroje přímo nedotknou?« — trojice 7+8+17 zkouší zkrat):
   „Na vánočním řetězu zapojeném za sebou praskne jedna žárovička. Co se stane?" — `nesvítí žádná` / `nesvítí jen ta prasklá` / `ostatní začnou svítit jasněji`. Vysvětlení: „V sériovém zapojení se poruchou přeruší celý obvod."
   ŠKRTNOUT a NAHRADIT otázku č. 20 (»Proč má spínač ve schématu dvě různé značky?« — překrývá se s otázkou 13 o značkách):
   „Proč doma po vypnutí jedné lampy svítí ostatní dál?" — `jsou zapojené paralelně` / `jsou zapojené sériově` / `mají každá svou pojistku`. Vysvětlení: „V paralelním (rozvětveném) obvodu se přeruší jen jedna větev, ostatními proud teče dál."

2. (c) nepokryto — **póly ploché baterie** (`kratší plíšek +, delší −`, bod ZAPIS i odstavec výkladu); otázka č. 14 se ptá jen na tužkovou baterii. Grep „plíšek|plochá" v bloku: 0.
   ŠKRTNOUT a NAHRADIT otázku č. 12 (»Kdy připojíme obvod ke zdroji?« — trojice 11+12+21 zkouší jeden postup):
   „Který plíšek ploché baterie je kladný pól?" — `kratší` / `delší` / `oba stejně`. Vysvětlení: „U ploché baterie je kladný pól kratší plíšek, záporný delší."

3. (c) nepokryto — stavba **žárovky** (skleněná baňka s vysátým vzduchem, wolframové vlákno, patice a objímka, prasklé vlákno jako důvod, proč nesvítí) je celý odstavec výkladu; žádná otázka. DROBNÉ.
   NÁVRH (až se uvolní další místo): „Proč žárovka nesvítí, i když je obvod uzavřený?" — `má prasklé vlákno` / `má moc silné sklo` / `je plná vzduchu`.

4. (d) otázka č. 21 „Co uděláme jako úplně poslední krok při sestavování obvodu?" | její distraktory `připojíme zdroj` a `zkontrolujeme všechny vodiče` jsou odpovědi otázek 11 a 12 — trojice si navzájem dává řešení.
   NÁVRH: po výměně otázky 12 (nález 2) distraktory u otázky 21 změnit na `zašroubujeme žárovku do objímky` a `zkontrolujeme izolaci vodičů`.

---

## elektricky-proud-mereni — VERDIKT: NESLADĚNO (6 nálezů)

NÁLEZY:

1. (d) otázka č. 1 „Co udává elektrický proud?" | náskok +18 (`kolik náboje projde vodičem za 1 s` [34] vs `kolik váží vodič` [16]).
   NÁVRH: „Co udává elektrický proud?" — `náboj, který projde za 1 s` / `hmotnost vodiče na jeden metr délky` / `teplotu vodiče při průchodu proudu`. Vysvětlení: „Proud = náboj děleno časem."

2. (d) otázka č. 7 „Jak zapojíme ampérmetr do obvodu?" | náskok +15 (`sériově (do cesty proudu)` [25] vs `paralelně` [9]).
   NÁVRH: „Jak zapojíme ampérmetr do obvodu?" — `sériově` / `paralelně vedle spotřebiče` / `mimo obvod k jeho okraji`. Vysvětlení: „Celý měřený proud musí projít ampérmetrem."

3. (d) otázka č. 11 „Co udává kapacita baterie v mAh?" | náskok +17 (`jak velký proud a jak dlouho dodá` [33] vs `hmotnost baterie` [16]).
   NÁVRH: „Co udává kapacita baterie v mAh?" — `jak dlouho dodá daný proud` / `jaké napětí baterie dodává na svorkách` / `jakou hmotnost baterie po nabití má`. Vysvětlení: „Vychází z Q = I · t."

4. (c) ZÁVAŽNÉ nepokryto — celý h3 **„Stejnosměrný a střídavý proud"** (DC z baterií, AC v zásuvce) i bod ZAPIS `DC stejnosměrný, AC střídavý` nemá v bloku jedinou otázku (grep „stejnosměrn|střídav" mezi otázkami: 0 — slovo „druh proudu" v otázce 14 nic nezkouší).
   ŠKRTNOUT a NAHRADIT otázku č. 9 (»Jak je dohodnutý směr proudu vůči pohybu elektronů?« — překrývá se s otázkami 8 a 15):
   „Jaký proud dává tužková baterie?" — `stejnosměrný (DC)` / `střídavý (AC)` / `nejprve střídavý, pak stejnosměrný`. Vysvětlení: „Baterie, monočlánky i akumulátory dávají stejnosměrný proud — DC. Střídavý (AC) je v zásuvce."

5. (c) nepokryto — h3 **„Rozsah a multimetr"** v části o multimetru (režim ampérmetru, jiná zdířka pro mA a pro A, i tak se zapojuje sériově); otázka 21 multimetr jen zmiňuje v závorce.
   ŠKRTNOUT a NAHRADIT otázku č. 16 (»Proč se obvod v místě zapojení ampérmetru nesmí rozvětvit?« — trojice 7+16+19 zkouší totéž):
   „Jak zapojíme multimetr, když jím chceme měřit proud?" — `sériově, jako ampérmetr` / `paralelně vedle spotřebiče` / `k jedné svorce zdroje`. Vysvětlení: „V režimu ampérmetru se multimetr zapojuje sériově; hroty se navíc dávají do zdířky podle velikosti proudu (mA, nebo A)."

6. (c) nepokryto — z h3 „Pro zvídavé: počítáme" se zkouší jen odvozený tvar `t = Q : I` (otázky 17 a 18); základní tvar `I = Q : t` a `Q = I · t` se jen deklaruje (otázka 4), ale nikde se s ním nepočítá.
   ŠKRTNOUT a NAHRADIT otázku č. 12 (»Co hrozí při špatném zapojení ampérmetru?« — odpověď vyplývá z otázky 19, navíc náskok +4):
   „Vodičem projde náboj 8 C za 4 sekundy. Jak velký proud jím teče?" — `2 A` / `4 A` / `32 A`. Vysvětlení: „I = Q : t = 8 : 4 = 2 A." (přepočítáno: 8:4 = 2 ✔)

Poznámka: otázky 17 a 18 používají čísla (2400 mAh, 800 mA, 3000 mAh, 5 h), která ve výkladu nejsou — to je v pořádku, jde o nové příklady na vzorec z výkladu a všechny vycházejí celé (3 h, 600 mA).

---

## elektricke-napeti-mereni — VERDIKT: NESLADĚNO (8 nálezů)

NÁLEZY:

1. (d) otázka č. 5 „Jak zapojíme voltmetr?" | náskok +19 (`paralelně (vedle spotřebiče)` [28] vs `sériově` [7], `do zdroje` [9]).
   NÁVRH: „Jak zapojíme voltmetr?" — `paralelně` / `sériově do cesty proudu` / `doprostřed hlavního obvodu`. Vysvětlení: „Voltmetr se připojuje vedle spotřebiče."

2. (d) otázka č. 11 „Co umí multimetr?" | náskok +24 (`měřit proud i napětí (ne najednou)` [34] vs `jen napětí` [10]).
   NÁVRH: „Co umí multimetr?" — `měřit víc veličin` / `měřit jen elektrické napětí ve voltech` / `jen svítit do tmy jako baterka`. Vysvětlení: „Multimetr měří napětí, proud i další veličiny."

3. (d) otázka č. 12 „Musí zařízení na baterky fungovat při špatné orientaci baterií?" | náskok +13 (`ne, záleží na orientaci` [23] vs `ano, vždy` [9]).
   NÁVRH: „Musí zařízení na baterky fungovat při špatné orientaci baterií?" — `ne, záleží na orientaci` / `ano, fungovat bude vždycky stejně` / `jen když je venku teplo nad nulou`. Vysvětlení: „Baterie musí být otočené správně a musí jich být správný počet."

4. (d) otázka č. 11 | odpověď `měřit proud i napětí (ne najednou)` doslova prozrazuje odpověď otázky č. 20 („Zvládne jeden multimetr ukázat obě veličiny ve stejnou chvíli?" → `ne, jen jednu z nich`).
   NÁVRH: řeší ho jak přeformulování v nálezu 2 (bez „ne najednou"), tak výměna otázky 20 podle nálezu 7.

5. (d) otázka č. 14 „Jaké napětí má plochá baterie?" | vysvětlení „Plochá baterie spojuje tři menší monočlánky v jednom pouzdře" dává odpověď na otázku č. 16 („Kolik monočlánků … abychom dostali napětí ploché baterie?" → `3`).
   NÁVRH: vysvětlení u otázky 14 změnit na „Plochá baterie má vyšší napětí než jeden monočlánek, protože je uvnitř složená z několika článků za sebou." (bez čísla).

6. (a) otázka č. 6 „Proč voltmetr nezapojujeme do hlavního obvodu?" | správná odpověď `aby jím netekl proud` jde proti výkladu i proti ZAPIS bodu `voltmetr: protéká jím jen nepatrný proud` — výklad říká „Jím samotným smí protékat jen nepatrný proud, jinak by měření zkreslil." Náskok +7.
   NÁVRH: „Proč voltmetr nezapojujeme do hlavního obvodu?" — `smí jím téct jen nepatrný proud` / `zahřál by se a mohl by shořet` / `ukazoval by napětí v miliampérech`. Vysvětlení: „Kdyby voltmetrem tekl větší proud, zkreslil by měření — proto se připojuje jen vedle spotřebiče."

7. (c) nepokryto — ZAPIS bod `za sebou: roste i proud` (výklad: „Zapojením více zdrojů za sebou se v obvodu zvýší nejen napětí, ale i proud") nemá otázku (grep: 0).
   ŠKRTNOUT a NAHRADIT otázku č. 20 (»Zvládne jeden multimetr ukázat obě veličiny ve stejnou chvíli?« — duplicita s otázkou 11):
   „Co se v obvodu kromě napětí zvýší, když zapojíme víc zdrojů za sebou?" — `proud` / `odpor vodičů` / `hmotnost spotřebiče`. Vysvětlení: „Vyšší napětí požene obvodem i větší proud."

8. (c) nepokryto — h3 „Postup při měření", věta „Voltmetr, který umí měřit i střídavé napětí, se přepólováním nepoškodí — jen u stejnosměrného napětí ukáže zápornou hodnotu" (rozdíl proti ampérmetru, kde špatné zapojení přístroj ničí). Grep „přepól": 0.
   ŠKRTNOUT a NAHRADIT otázku č. 16 (»Kolik monočlánků po 1,5 V …« — odpověď je prozrazena vysvětlením otázky 14, viz nález 5):
   „Co se stane, když voltmetr připojíme obráceně?" — `ukáže zápornou hodnotu` / `okamžitě se zničí` / `přestane měřit úplně`. Vysvětlení: „Voltmetr se přepólováním nepoškodí, u stejnosměrného napětí jen ukáže zápornou hodnotu. Ampérmetr je na špatné zapojení mnohem citlivější."

Poznámka: USB-C 20 V a příklad „čtyři baterie po 1,5 V = 6 V" z výkladu také nemají otázku (nejsou v poli ZAPIS, proto neuvádím jako samostatný nález). Otázky 13, 14 a 15 jsou obsahově totožné s otázkami 4, 5 a 6 bloku chemicke-zdroje-napeti.

---

## elektricky-proud-v-kovech-odpor — VERDIKT: NESLADĚNO (5 nálezů)

NÁLEZY:

1. (a) ZÁVAŽNÉ — otázka č. 18 „K čemu se používá konstantan?" | distraktor `na topné spirály konvic` je podle výkladu **také správně**: „Podobně konstantan (slitina mědi a niklu) se používá na rezistory … **Vyrábějí se z něj i topné spirály tepelných spotřebičů.**" Otázka má tedy dvě správné odpovědi a její vysvětlení („Topné spirály se dělají z nichromu.") výkladu přímo odporuje.
   NÁVRH: „Která součástka se vyrábí z konstantanu a má přesně daný odpor?" — `rezistor` / `pojistka` / `vodič vedení`. Vysvětlení: „Rezistor je součástka s přesně daným odporem; vyrábí se z konstantanu, slitiny mědi a niklu."

2. (d) otázka č. 9 „Z čeho jsou topné spirály (velký odpor)?" | její odpověď `nichrom` spolu s vysvětlením otázky 18 tvoří dvojici, kde si otázky navzájem dávají řešení. Po opravě podle nálezu 1 problém mizí.

3. (c) ZÁVAŽNÉ nepokryto — ZAPIS bod `odpor závisí i na délce, tloušťce, teplotě` (výklad: „Odpor vodiče závisí také na jeho délce, tloušťce a na teplotě") nemá otázku (grep „tloušť|délce": 0).
   ŠKRTNOUT a NAHRADIT otázku č. 1 (»Co mají kovy hodně?« — obsahově totéž co otázka 21 „Co znamená, že elektron je volný"):
   „Na čem kromě materiálu závisí odpor vodiče?" — `na délce, tloušťce a teplotě` / `jen na barvě izolace vodiče` / `jen na tvaru zásuvky ve zdi`. Vysvětlení: „Kromě materiálu rozhoduje i to, jak je vodič dlouhý a tlustý a jak je teplý."

4. (c) ZÁVAŽNÉ nepokryto — celý odstavec „Studené vlákno žárovky má menší odpor než rozžhavené. Hned po zapnutí jím proto protéká největší proud — a právě tehdy se vlákno nejčastěji přepálí." (h3 Tepelné účinky proudu) nemá otázku.
   ŠKRTNOUT a NAHRADIT otázku č. 5 (»Co se děje s vodičem při průchodu proudu?« — překrývá se s otázkami 4 a 12):
   „Kdy se žárovka nejčastěji přepálí?" — `hned po zapnutí` / `po několika hodinách svícení` / `až dlouho po vypnutí`. Vysvětlení: „Studené vlákno má menší odpor, takže hned po zapnutí jím teče největší proud."

5. (c) nepokryto — převod `1 mΩ = 0,001 Ω` z pole ZAPIS (`jednotky`); otázky 15 a 16 pokrývají jen kΩ a MΩ. DROBNÉ.
   NÁVRH (až se uvolní místo, jinak nechat): „Kolik ohmů je 1 mΩ?" — `0,001 Ω` / `1 000 Ω` / `100 Ω`. Vysvětlení: „Předpona mili znamená tisícinu."

Ověřeno bez nálezu: 2200–3000 °C u wolframového vlákna (otázka 19) sedí s výkladem; převody 1 kΩ = 1 000 Ω a 1 MΩ = 1 000 000 Ω přepočítány; konstantan = měď + nikl a nichrom = nikl + chrom souhlasí s výkladem.

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně)

Běh 22. 9. 2026, exit 0. K těmto osmi klíčům **nevyšlo ani jedno ⚠️**. Všechna vypsaná ⚠️ (doslovně):

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 612 otázek (22 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 264 — laťku lze utáhnout: npm run prijmi-latku
⚠️  fyzika/9-rocnik/energie-a-vesmir/vesmir-a-galaxie: číslo 100 není ve výkladu — „Kolik galaxií je odhadem ve viditelném vesmíru?"
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

Doplňující řádky téhož běhu (kontext, ne ⚠️):
```
Náskok správné odpovědi: 264 otázek s náskokem ≥10 znaků (16 souhrnných /shrnuti/ vynecháno záměrně)
Vazby v kvízech: prošlo 150 bloků / 2743 otázek — 0 duplicit, 0 úniků odpovědí.
Měřidla: 53 z 53 má doložené obousměrné ověření.
✅ Vše zapojené správně.
```

Pozor: brána `uniky.mjs` hlásí 0 úniků, přesto jsem ručně našel 5 úniků odpovědi mezi otázkami
téhož bloku (elektricke-pole 2↔3 a 15↔21, vznik-elektrickeho-proudu 11↔21,
elektricke-napeti-mereni 11↔20 a 14↔16) a 10 otázek s náskokem ≥10 znaků, které se v součtu 264
schovávají. Kontrolu náskoku ani úniků tedy nelze vzít jako doklad sladění.

---

## ZAPRACOVÁNO 22. 9. 2026

Vše zapsáno do `src/data/kvizy.ts`. Zálohy původních výpisů (`--otazky`) uloženy do scratchpadu
před zásahem. Po úpravě má každý z 8 klíčů opět přesně 21 otázek (`testy/vypis-kviz.mjs`).

- [x] **elektricky-naboj** (8/8): nálezy 1–4 (neutron, neutralita, kationt, elektrování) opraveny
  beze změny počtu; nález 5 (elementární náboj) nahradil otázku 2; nález 7 (elektrometr) nahradil
  otázku 4 — vysvětlení upraveno oproti návrhu (nemělo přímo opakovat odpověď otázky o elektroskopu,
  jinak by vzniknul únik); nález 6 (cisterna) nahradil otázku 20; nález 8: otázka 10 zrušena,
  otázka 11 přeformulována na sloučenou „souhlasné a nesouhlasné", na uvolněné místo doplněna nová
  otázka o 5 mC (číslo ověřeno ve výkladu).
- [x] **elektricke-pole** (4/5): nálezy 1, 2, 3, 5 zapracovány beze změny. Nález 4 (siločáry pokus)
  NEPROVEDEN — žádné jiné volné místo v bloku, návrh sám říkal „až se uvolní místo, jinak nechat".
- [x] **vznik-elektrickeho-proudu** (6/6): nález 1 (AC vysvětlení) — text upraven oproti návrhu,
  vypuštěna věta o stejnosměrném proudu, protože doslovně unikala do odpovědi otázky o DC
  (`uniky.mjs` to při prvním běhu opravdu odhalil). Nálezy 2 a 4 řeší jedna náhrada (otázka 12 →
  turbína), nálezy 3 a 5 řeší jedna náhrada (otázka 21 → kladné ionty; vysvětlení zkráceno oproti
  návrhu, doslovné znění by prozradilo odpověď otázky 19 o elektronech). Nález 6 nahradil otázku 17.
- [x] **chemicke-zdroje-napeti** (6/6) — včetně kritického nálezu 1 (lithiový článek do mobilu):
  otázka 10 přeformulována podle návrhu, teď se ptá na jednorázový lithiový článek a vysvětlení
  správně rozlišuje od dobíjecího lithium-iontového akumulátoru v mobilu/notebooku. Nálezy 2 a 6
  řeší jedna náhrada (otázka 9 → mAh převod). Nález 3 přeformuloval otázku 20. Nález 4 nahradil
  otázku 6 (anoda/katoda). Nález 5 nahradil otázku 12 (zkratování).
- [x] **elektricke-obvody** (4/4 s výjimkou): nález 1 nahradil otázky 17 a 20. Nález 2 nahradil
  otázku 12. Nález 4 upravil distraktory otázky 21. Nález 3 (žárovka — stavba) NEPROVEDEN, žádné
  volné místo se neuvolnilo (byl označen jako DROBNÉ „až se uvolní další místo").
- [x] **elektricky-proud-mereni** (6/6): nálezy 1–3 (délková nápověda u otázek 1, 7, 11) opraveny.
  Nález 4 nahradil otázku 9 (DC u tužkové baterie). Nález 5 nahradil otázku 16 (multimetr). Nález 6
  nahradil otázku 12 novým výpočtem (8 C za 4 s → 2 A, výsledek ověřen ve výkladu).
- [x] **elektricke-napeti-mereni** (8/8): nálezy 1–3 a 6 (délková nápověda) opraveny. Nález 5
  zkrátil vysvětlení otázky 14 (bez čísla 3). Nález 4 vyřešen společně nálezy 2 a 7 (přeformulování
  + náhrada otázky 20). Nález 7 nahradil otázku 20 (proud roste se zdroji za sebou). Nález 8
  nahradil otázku 16 (přepólování voltmetru).
- [x] **elektricky-proud-v-kovech-odpor** (3/5 nálezů akčních, zbylé 2 jsou poznámky bez akce):
  kritický nález 1 (konstantan má dvě správné odpovědi) vyřešen — otázka 18 přeformulována na
  „která součástka se vyrábí z konstantanu", vysvětlení zkráceno oproti návrhu (doslovné znění
  „slitina mědi a niklu" by unikalo do odpovědi otázky 17). Nález 2 nevyžadoval zásah (problém mizí
  automaticky opravou nálezu 1). Nález 3 nahradil otázku 1 (závislost odporu). Nález 4 nahradil
  otázku 5 (přepálení žárovky). Nález 5 (1 mΩ) NEPROVEDEN, žádné volné místo (DROBNÉ).

Brány po zásahu: `node testy/uniky.mjs` → 0 duplicit, 0 úniků (jeden únik při prvním běhu — AC/DC
vysvětlení výše — opraven před zápisem). `node zkontroluj.mjs` → exit 0, žádné ⚠️ k těmto osmi
klíčům (náskok ≥10 znaků klesl z 264 na 219 otázek). `npm run build` → 481 stránek, bez chyby.

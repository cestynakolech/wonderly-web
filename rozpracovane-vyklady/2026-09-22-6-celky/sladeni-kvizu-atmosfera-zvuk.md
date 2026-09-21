# Sladění kvízů s NOVÝMI výklady — F7 atmosféra a tlak vzduchu, F8 zvuk
Nezávislá kontrola 22. 9. 2026. Zdroj: `node podtema.mjs ROOT get <klíč>` (obsah + zapis)
proti `node testy/vypis-kviz.mjs <klíč>` (21 otázek, správná první). Jen čtení, nic zapsáno do dat.
Typy: (a) fakt/číslo mimo výklad · (b) látka, kterou výklad vypustil · (c) nosná část výkladu bez otázky · (d) délková nápověda.

---

## atmosfericky-tlak — VERDIKT: NESLADĚNO (10 nálezů)

1. **(a) otázka č. 16** „Jaká je přibližně hustota vzduchu u povrchu…" — správná odpověď **1,29 kg/m³**, výklad i ZAPIS uvádějí **1,23 kg/m³** („hustota vzduchu u povrchu je přibližně 1,23 kg/m³"). Žák, který se učil ze stránky, odpoví 1,23 a dostane chybu. Vysvětlení navíc říká „asi 1,3 kg".
   NÁVRH: „Jaká je přibližně hustota vzduchu u povrchu Země?" → **1,23 kg/m³** | 1 000 kg/m³ | 0,001 kg/m³. Vysvětlení: „Krychlový metr vzduchu má hmotnost asi 1,23 kg, krychlový metr vody 1 000 kg."
   Pozn.: měřidlo `testy/cisla-ve-vykladu.mjs` tenhle rozpor NENAJDE — konstanta `MALE = 12` přeskakuje všechna čísla ≤ 12, tedy i 1.29.

2. **(a) otázka č. 17** „O kolik klesne tlak na každých 8 m výšky…" — pravidlo „1 hPa na 8 m" je ve výkladu **meteorologie-a-mereni-tlaku**, v tomhle výkladu není ani slovo.
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nález 9): „Kolik pascalů je 1 hektopascal?" → **100 Pa** | 10 Pa | 1 000 Pa. Vysvětlení: „1 hPa = 100 Pa, proto je normální tlak 101 325 Pa asi 1 013 hPa."

3. **(a) otázka č. 18** „Proč se atmosférický tlak nepočítá jednoduše jako hydrostatický (h·ρ·g)?" — výklad naopak vzorec h·ρ·g v části „Pro zvídavé" POUŽIJE a nikde netvrdí, že ho použít nelze; „vzduch je stlačitelný" ve výkladu není. Otázka je navíc nad 7. ročník.
   NÁVRH — ŠKRTNOUT a NAHRADIT: „Jak vysoká by musela být trubice, kdyby Torricelli místo rtuti použil vodu?" → **skoro 10 metrů** | asi 1 metr | asi 76 centimetrů. Vysvětlení: „Voda je mnohem řidší než rtuť, proto by ji stejný tlak vyhnal mnohem výš."

4. **(a) otázka č. 19** „Čím měří lékaři krevní tlak (jednotka)?" — krevní tlak ani hodnota 120/80 ve výkladu nejsou (výklad má jen 760 mmHg z Torricelliho pokusu).
   NÁVRH — ŠKRTNOUT a NAHRADIT: „Jakou hustotu má rtuť, se kterou Torricelli počítal?" → **13 500 kg/m³** | 1 000 kg/m³ | 135 000 kg/m³. Vysvětlení: „Rtuť je asi 13,5krát hustší než voda, proto stačí sloupec 76 cm."

5. **(a) otázka č. 20** „Ve výšce 10 000 m nad mořem je tlak…" — hodnoty 26–29 kPa ani „čtvrtinový tlak" ve výkladu nejsou.
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nález 7): „Rtuťový sloupec je vysoký 0,76 m, rtuť má hustotu 13 500 kg/m³, g = 10 N/kg. Jaký tlak vyjde?" → **102 600 Pa** | 10 260 Pa | 1 026 000 Pa. Vysvětlení: „p = h · ρ · g = 0,76 · 13 500 · 10 = 102 600 Pa, skoro přesně normální tlak."

6. **(a) otázka č. 21** „Vzduch je tekutina. Proč?" — pojem „tekutina" se v novém výkladu vůbec nevyskytuje.
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nález 8): „Co všechno ovlivňuje velikost atmosférického tlaku?" → **teplota, vlhkost, výška a šířka** | pouze nadmořská výška daného místa a nic víc | jen síla větru a množství sněhu v okolí. Vysvětlení: „Výklad uvádí čtyři vlivy: teplotu vzduchu, vodní páru, nadmořskou výšku a zeměpisnou šířku."

7. **(c)** Nepokryto: celý h3 „Pro zvídavé: počítáme" (p = 0,76 · 13 500 · 10 = 102 600 Pa; ověřeno výpočtem = 102 600) — řeší náhrada v nálezu 5.

8. **(c)** Nepokryto: čtyři vlivy na velikost tlaku (teplota, vlhkost, nadmořská výška, zeměpisná šířka) — řeší náhrada v nálezu 6.

9. **(c)** Nepokryto: převod **1 hPa = 100 Pa** (ZAPIS, „jednotky") — otázka 11 se ptá jen na název jednotky. Řeší náhrada v nálezu 2.

10. **(d)** Délková nápověda (správná odpověď nejdelší o ≥20 znaků): č. 10 (+51), č. 15 (+36), č. 4 (+28).
   NÁVRH č. 10: „Jak fungoval Torricelliho pokus?" → **rtuť v obrácené trubici drží 760 mm** | rtuť se v trubici úplně vypařila do okolí | vzduch se zvážil na kuchyňské váze v misce.
   NÁVRH č. 15: „Proč drží přísavka na hladkém povrchu?" → **přitlačuje ji atmosférický tlak** | je přilepená speciálním lepidlem | drží ji magnetická síla gumy.
   NÁVRH č. 4: „Jak vzniká atmosférický tlak?" → **gravitace tlačí vzduch dolů** | sluneční paprsky tlačí na zemský povrch | teplo ze zemského jádra nadnáší vzduch.

---

## pretlak-podtlak-vakuum — VERDIKT: NESLADĚNO (5 nálezů)

1. **(a) otázka č. 19** „Proč vydrží vakuově balené potraviny déle?" — správná „bez vzduchu se kazí pomaleji" i vysvětlení (kyslík, mikroorganismy, oxidace) jsou mimo výklad; výklad jen uvádí vakuově balené potraviny jako příklad vakua.
   NÁVRH: „Co znamená, že jsou potraviny balené ve vakuu?" → **je z obalu odčerpaný vzduch** | obal je nafouknutý stlačeným vzduchem | obal je zahřátý na sto stupňů Celsia. Vysvětlení: „Vakuum = prostor, ze kterého je odčerpaný téměř všechen vzduch."

2. **(pořadí / nadstavba) otázky č. 12 a č. 13** („Manometr ukáže přetlak 1 bar…", „Na kolik barů se hustí pneumatiky…") pocházejí z h3 **„Pro zvídavé: počítáme"**, ale stojí uprostřed bloku. Nadstavbové otázky patří na konec.
   NÁVRH: beze změny znění je přesunout na pozice 20 a 21.

3. **(c)** Nepokryto: druhý výpočet z „Pro zvídavé" — celkový tlak v pneumatice **1 atm + 2,5 atm = 3,5 atm**.
   NÁVRH — ŠKRTNOUT č. 15 („Proč drží masážní baňka na kůži?" — čtvrtá otázka na tentýž jev jako č. 2, 5, 14, 18) a NAHRADIT: „Manometr ukazuje u pneumatiky přetlak 2,5 baru. Jaký je celkový tlak v pneumatice?" → **asi 3,5 atmosféry** | asi 2,5 atmosféry jako na manometru | pořád jen 1 atmosféra. Vysvětlení: „K přetlaku 2,5 atm se přičte tlak okolní atmosféry: 1 + 2,5 = 3,5 atmosféry."

4. **(c)** Nepokryto: starší jednotka **atmosféra (atm)**, ZAPIS „starší jednotka atmosféra (atm) — asi 100 000 Pa" — žádná otázka, přitom ji dvě otázky v odpovědích používají.
   NÁVRH — nahradit znění č. 19 z nálezu 1 touhle otázkou jen v případě, že se č. 19 nechá beze změny; jinak přidat místo č. 20 („Proč syčí sprej" — duplikuje č. 1/č. 4): „Jak se jmenuje starší jednotka tlaku, přibližně rovná 1 baru?" → **atmosféra (atm)** | hektopascal (hPa) | newton (N).

5. **(jazyk) otázka č. 6**, distraktor „ve zdravých plicích hned po **zhlubokém** nádechu" — chybný tvar slova (správně „po hlubokém nádechu").
   NÁVRH: „ve zdravých plicích hned po hlubokém nádechu".

Délková nápověda: nejvyšší náskok +13 (č. 1, 2, 17) — pod prahem, bez nálezu.

---

## meteorologie-a-mereni-tlaku — VERDIKT: NESLADĚNO (8 nálezů)

1. **(c)** Nepokryto: celý h3 **„Pro zvídavé: počítáme"** (400 : 8 = 50; 1 020 − 50 = 970 hPa; přepočítáno, sedí) — žádná otázka.
   NÁVRH — ŠKRTNOUT č. 13 („Stoupající tlak vzduchu obvykle věští…" — duplicitní protějšek č. 12) a NAHRADIT: „U moře ukazuje barometr 1 020 hPa. Jaký tlak bude na chatě 400 m nad mořem?" → **970 hPa** | 1 070 hPa | 1 013 hPa. Vysvětlení: „Tlak klesá o 1 hPa na 8 m: 400 : 8 = 50 hPa, 1 020 − 50 = 970 hPa."

2. **(c)** Nepokryto: **8 měřených veličin** (ZAPIS „měří 8 veličin: teplota, tlak, vítr, vlhkost, oblačnost a srážky, ovzduší, záření, půda").
   NÁVRH — ŠKRTNOUT č. 16 („Proč hlídají předpověď počasí i energetici?" — okrajová aplikace) a NAHRADIT: „Kolik veličin meteorologové na stanici pravidelně měří?" → **osm** | dvě | dvacet čtyři. Vysvětlení: „Teplota, tlak, směr a rychlost větru, vlhkost, oblačnost se srážkami, čistota ovzduší, sluneční záření a vlhkost s teplotou půdy."

3. **(c)** Nepokryto: **heliograf** (ZAPIS „heliograf — doba slunečního svitu").
   NÁVRH — ŠKRTNOUT č. 11 („Čím se na stanici měří vlhkost vzduchu?" — třetí otázka téhož typu po č. 8 a č. 10) a NAHRADIT: „Čím se měří, jak dlouho během dne svítilo slunce?" → **heliografem** | anemografem | meteorologickou budkou. Vysvětlení: „Heliograf je skleněná koule, která zaznamenává dobu slunečního svitu."

4. **(c)** Nepokryto: **ČHMÚ v Praze** (ZAPIS „ČHMÚ v Praze: data ze stanic, balonů, družic") — v otázce č. 14 je Praha dokonce jen v chybném distraktoru.
   NÁVRH — upravit č. 14 (beze škrtu): „Který ústav u nás sbírá údaje o počasí a odkud?" → **ČHMÚ ze stanic, balonů i družic** | jediná stanice na pražském letišti | soukromé firmy jen z vlastních čidel.

5. **(a) otázka č. 3**, vysvětlení „Ve výši vzduch klesá a ohřívá se, takže se mraky rozpouštějí. (V zimě se pod **inverzí** umí držet i mlha.)" — sestupný pohyb vzduchu ani pojem inverze ve výkladu nejsou a jsou nad 7. ročník.
   NÁVRH vysvětlení: „Tlaková výše přináší obvykle jasné, slunečné počasí."

6. **(a) otázka č. 5**, vysvětlení „V níži vzduch stoupá, ochlazuje se a vodní pára se sráží v mraky" — srážení vodní páry výklad neuvádí.
   NÁVRH vysvětlení: „Tlaková níže přináší oblačnost a srážky; hluboká níže pod 1 000 hPa i bouřky a vichřice."

7. **(a) otázka č. 10**, vysvětlení „1 mm srážek znamená 1 litr vody spadlý na metr čtvereční" — ve výkladu není.
   NÁVRH vysvětlení: „Srážkoměr odvádí vodu do odměrné nádoby se stupnicí v milimetrech vodního sloupce; sníh se nechá roztát."

8. **(c)** Nepokryto (drobné): **otáčení Země stáčí proudící vzduch do vírů** (ZAPIS) a **hluboká níže pod 1 000 hPa**.
   NÁVRH: doplnit do vysvětlení č. 6 („…otáčení Země navíc proudící vzduch stáčí do vírů") a do vysvětlení č. 5 (viz nález 6) — bez zásahu do počtu otázek.

Délková nápověda: nejvyšší náskok +4 — bez nálezu.

---

## kmitani-a-vlneni — VERDIKT: NESLADĚNO (6 nálezů)

1. **(c)** Nepokryto: **KYV** — samostatná odrážka výkladu i bod ZAPISu („kyv: pohyb jedním směrem, půl kmitu"); žádná z 21 otázek se na něj neptá, ačkoli otázka na kmit (č. 15) je.
   NÁVRH — ŠKRTNOUT č. 19 („Jaká je jednotka vlnové délky?" — čtvrtá otázka typu „jaká je jednotka" po č. 5, 7, 20) a NAHRADIT: „Kolik kyvů tvoří jeden kmit?" → **dva** | jeden | čtyři. Vysvětlení: „Kyv je pohyb jen jedním směrem, tedy polovina kmitu."

2. **(c)** Nepokryto: **v jakém prostředí příčné a podélné vlnění existuje** („příčné jen v pevných a kapalných látkách", „podélné ve všech skupenstvích").
   NÁVRH — ŠKRTNOUT č. 20 („Jaká je jednotka rychlosti šíření vlnění?") a NAHRADIT: „Ve kterých látkách může vzniknout příčné vlnění?" → **jen v pevných a kapalných** | ve všech látkách, i v plynech | jenom v plynech a v kapalinách. Vysvětlení: „Částice musí být vázány přitažlivými silami; v plynu takové vazby nejsou — tam projde jen podélné vlnění."

3. **(c)** Nepokryto: vztah **λ = v : f** (třetí výpočet z „Pro zvídavé": 340 : 170 = 2 m; přepočítáno, sedí). Otázky č. 16, 17 i 18 pracují jen s λ = v · T.
   NÁVRH — ŠKRTNOUT č. 18 („Vlna se šíří rychlostí 10 m/s a její perioda je 2 s…" — třetí otázka na tentýž vzorec) a NAHRADIT: „Zvuk má frekvenci 170 Hz a šíří se rychlostí 340 m/s. Jaká je jeho vlnová délka?" → **2 m** | 4 m | 170 m. Vysvětlení: „λ = v : f = 340 : 170 = 2 m."

4. **(a) otázka č. 12** „Co je vlnová délka λ? → **vzdálenost sousedních vrcholů vlny**" — výklad definuje λ jako „nejmenší vzdálenost dvou bodů, které kmitají stejně (ve stejné fázi)". Formulace přes „vrcholy" platí jen pro příčné vlnění; u podélného (zvuk, viz č. 14) žádné vrcholy nejsou.
   NÁVRH: „Co je vlnová délka λ?" → **vzdálenost dvou stejně kmitajících bodů** | doba, za kterou vlna urazí jeden metr dráhy | rychlost, jakou se vlna šíří daným prostředím. Vysvětlení: „Je to nejmenší vzdálenost dvou bodů kmitajících ve stejné fázi; měří se v metrech."

5. **(celá čísla) otázka č. 21** „Kyvadlo má periodu **0,25 s**. Jakou má frekvenci?" — zadání i mezivýpočet 1 : 0,25 jsou desetinné; výklad pracuje jen s 2 Hz a 0,5 s.
   NÁVRH: „Kyvadlo má periodu 2 s. Kolik kmitů udělá za 10 sekund?" → **5** | 2 | 20. Vysvětlení: „Jeden kmit trvá 2 s, za 10 s stihne kyvadlo 10 : 2 = 5 kmitů; frekvence je pak 0,5 Hz."

6. **(c)** Nepokryto (drobné): „vlnění se nejrychleji šíří pevnými látkami a nejpomaleji plyny" a „všechny částice kmitají se stejnou frekvencí".
   NÁVRH: doplnit do vysvětlení č. 11 („Kmitání se přenáší z částice na částici, všechny kmitají se stejnou frekvencí, jen se zpožděním; nejrychleji se vlnění šíří pevnou látkou, nejpomaleji plynem.") — bez zásahu do počtu otázek. POZOR: samostatnou otázku na „nejrychleji v pevných látkách" sem NEPŘIDÁVAT, byla by duplicitou otázky č. 9 v bloku zvuk-vznik-a-sireni.

Délková nápověda: žádná správná odpověď není nejdelší o víc než 0 znaků — bez nálezu.

---

## zvuk-vznik-a-sireni — VERDIKT: NESLADĚNO (7 nálezů)

1. **(c)** Nepokryto: **komorní tón a = 440 Hz** (ZAPIS bod, výklad: „podle něj se ladí hudební nástroje").
   NÁVRH — ŠKRTNOUT č. 18 („Proč se zvuk nešíří ve vakuu?" — duplikuje č. 3, stejná látka i stejné vysvětlení) a NAHRADIT: „Jakou frekvenci má komorní tón a, podle kterého se ladí nástroje?" → **440 Hz** | 44 Hz | 4 400 Hz. Vysvětlení: „Komorní a má 440 Hz; podle něj se ladí orchestr."

2. **(c)** Nepokryto: **barva zvuku** (ZAPIS „barva zvuku: velikost, tvar, materiál tělesa").
   NÁVRH — ŠKRTNOUT č. 17 („Jaká je přibližná rychlost zvuku ve vodě?" — třetí otázka nad toutéž tabulkou po č. 10 a č. 16) a NAHRADIT: „Proč zní housle a kytara jinak, i když hrají stejný tón?" → **liší se barvou zvuku** | jeden je vždycky hlasitější | jeden hraje o oktávu výš. Vysvětlení: „Barva zvuku závisí na velikosti, tvaru a materiálu tělesa."

3. **(únik mezi otázkami) otázka č. 10**, vysvětlení: „Obě vyšší čísla (1500 i 5000 m/s) patří hustším prostředím…" — prozrazuje odpovědi otázek č. 16 (ocel 5 000 m/s) a č. 17 (voda 1 500 m/s). Vysvětlení č. 17 („hůř než kov") prozrazuje č. 16.
   NÁVRH vysvětlení č. 10: „Ve vzduchu jsou částice nejdál od sebe, proto vedou zvuk nejpomaleji — asi 340 m/s."

4. **(jazyk) otázka č. 19** — znění „Proč z kapely hrající o pár ulic dál slyšíme hlavně basu a buben, i když je slabší kapela za rohem domu?" je zkomolené a pro 8. ročník nesrozumitelné; navíc délková nápověda.
   NÁVRH: „Proč je z kapely za rohem domu slyšet hlavně basa a buben?" → **hluboké tóny se ohýbají i za překážky** | vysoké tóny se šíří rychleji než hluboké | basa a buben vysílají ultrazvuk skrz zeď.

5. **(d)** Délková nápověda ≥20 znaků: č. 12 (+35), č. 11 (+31), č. 8 (+28), č. 1 (+24), č. 13 (+22).
   NÁVRH č. 12: „Co je dozvuk?" → **původní a odražený zvuk splynou** | zvuk úplně pohlcený měkkou stěnou | zvuk, který se ve vakuu šíří pomaleji.
   NÁVRH č. 11: „Kdy uslyšíme ozvěnu jako samostatný zvuk?" → **odražený zvuk má zpoždění 0,1 s** | ozvěnu slyšíme při každém zvuku hned | ozvěna ve skutečnosti vůbec neexistuje.
   NÁVRH č. 8: „Jaký je rozdíl mezi tónem a hlukem?" → **tón vzniká pravidelným kmitáním** | tón je vždycky hlasitější než hluk | hluk vzniká jen ve vodě a v kovech.
   NÁVRH č. 1: „Co je zvuk?" → **mechanické vlnění vnímané sluchem** | druh světla o velmi nízké frekvenci | elektrický proud v nervech ucha.
   NÁVRH č. 13: „K čemu se využívá odraz ultrazvuku?" → **sonar, echolot a sonografie** | výroba světla v zářivkách | ohřev vody v rychlovarné konvici.

6. **(formát) otázky č. 10 a č. 17** — v č. 10 má znak „přibližně" jen správná odpověď, v č. 17 mají „≈" jen distraktory. Nejednotný zápis číselných odpovědí funguje jako vodítko.
   NÁVRH: psát všechny tři možnosti stejně („340 m/s | 1 500 m/s | 5 000 m/s") a slovo „přibližně" mít jen v zadání otázky.

7. **(c)** Nepokryto (drobné): **nejcitlivější ucho 2 000–4 000 Hz** (ZAPIS bod) je jen ve vysvětlení č. 5, a **defektoskopie i stetoskop** nemají otázku. Bez náhrady — stačí ponechat ve vysvětleních (č. 5, č. 13).

---

## vnimani-zvuku-a-hlasitost — VERDIKT: NESLADĚNO (6 nálezů)

1. **(duplicita + únik) otázky č. 9 a č. 19** — „Jaká hladina odpovídá prahu slyšitelnosti? → **0 dB**" a „Od jaké hladiny začíná stupnice decibelů? → **od 0 dB**" testují totéž a vysvětlení č. 19 („Stupnice začíná od prahu slyšitelnosti") odpověď č. 9 přímo prozrazuje.
   NÁVRH — ŠKRTNOUT č. 19 a NAHRADIT (pokryje nález 4): „Jak velké jsou kmity ušního bubínku?" → **0,0001 mm až 1 mm** | 1 cm až 5 cm | celý 1 metr sem a tam. Vysvětlení: „Bubínek se rozkmitá jen nepatrně — od deseti tisícin milimetru po jeden milimetr."

2. **(c)** Nepokryto: celý h3 **„Ucho jako přeměňovač energie"** (ZAPIS „prostředí kmitů: vzduch → kůstky → kapalina → nerv") — nejnosnější myšlenka výkladu bez jediné otázky.
   NÁVRH — ŠKRTNOUT č. 13 (viz nález 3) a NAHRADIT: „V jakém pořadí si v uchu kmity předávají?" → **vzduch → kůstky → kapalina → nerv** | kapalina → vzduch → nervový signál → kůstky | nervový signál → kůstky → vzduch → kapalina. Vysvětlení: „Kmitá vzduch, pak kůstky, pak kapalina v hlemýždi a vláskové buňky to promění v nervový signál."

3. **(a) otázka č. 13** „Jak chrání sluch bezpečná vzdálenost od zdroje? → se vzdáleností hlasitost klesá" — výklad tvrzení, že hlasitost se vzdáleností klesá, NEobsahuje (jen doporučuje „udržujeme bezpečnou vzdálenost od zdroje hluku"). Řeší škrt v nálezu 2; ochrana zůstane pokrytá otázkami č. 12, 20 a 21.

4. **(c)** Nepokryto: **kmity bubínku 0,0001 mm až 1 mm** (ZAPIS bod) — řeší náhrada v nálezu 1.

5. **(únik) otázka č. 17**, vysvětlení „Nejsilnější zvuk, který ucho ještě snese, se nazývá práh bolesti" — prozrazuje odpověď otázky č. 10.
   NÁVRH vysvětlení č. 17: „Při extrémně silném zvuku může bubínek prasknout."

6. **(c)** Nepokryto (drobné): **hygienické normy a ohleduplnost** (vypnutí motoru stojícího auta, zákaz sekaček v neděli) — ZAPIS bod.
   NÁVRH: doplnit do vysvětlení č. 20: „Hluk omezují i hygienické normy a ohleduplnost — vypnutý motor stojícího auta nebo klid o nedělích."

Délková nápověda: nejvyšší náskok +20 (č. 7) a +19 (č. 5) — na hranici; NÁVRH č. 7: „Je vnímání hlasitosti u lidí stejné?" → **ne, každý slyší jinak citlivě** | ano, u všech lidí je úplně stejné | záleží jenom na věku posluchače.

---

## ⚠️ ze `zkontroluj.mjs` (doslovně)

K těmto 6 klíčům měřidlo NEHLÁSÍ ŽÁDNÉ ⚠️. Celý výpis varování běhu 22. 9. 2026:

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 612 otázek (22 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 264 — laťku lze utáhnout: npm run prijmi-latku
⚠️  fyzika/9-rocnik/energie-a-vesmir/vesmir-a-galaxie: číslo 100 není ve výkladu — „Kolik galaxií je odhadem ve viditelném vesmíru?"
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

Pozor — ticho měřidla není doklad o sladění:
- bod 6d (`testy/cisla-ve-vykladu.mjs`) přeskakuje všechna čísla ≤ 12 (`const MALE = 12`), proto NEodhalil rozpor 1,29 vs 1,23 kg/m³ u atmosfericky-tlak;
- bod 6b měří délkovou nápovědu jen jako CELKOVÝ počet otázek s náskokem ≥10 znaků proti přijaté laťce, ne po blocích — proto se neozval ani u otázek s náskokem +51, +36 a +35 nalezených výše.

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 6 klíčů zapracováno, `node testy/uniky.mjs` 0 duplicit / 0 úniků, `node zkontroluj.mjs` 0 ⚠️ k těmto klíčům, `npm run build` OK (481 stránek). Zálohy `--otazky` před úpravou ve scratchpadu session.

**atmosfericky-tlak** (10/10 nálezů) — [x] 1 hustota 1,23 kg/m³ [x] 2 hPa=100Pa [x] 3 trubice s vodou [x] 4 ŠKRTNUTO NAHRAZENO JINAK: místo „hustota rtuti" dán „vzorec ph=h·ρ·g" — NÁVRH nálezu 4 (hustota rtuti 13 500 kg/m³) totiž kolidoval s otázkou 5/20 (výpočtová otázka používá stejné číslo 13 500 → `uniky.mjs` hlásil únik); vzorcová otázka číslo neobsahuje [x] 5 výpočet 102 600 Pa [x] 6 čtyři vlivy na tlak [x] 7 pokryto (viz 5) [x] 8 pokryto (viz 6) [x] 9 pokryto (viz 2) [x] 10 délková nápověda č.4/10/15 zkrácena.

**pretlak-podtlak-vakuum** (5/5 nálezů) — [x] 1 potraviny ve vakuu — vysvětlení PŘEFORMULOVÁNO (návrh „prostor…téměř…odčerpaný" doslova opakoval odpověď otázky „Co je vakuum?" → únik; nové znění: „Ve vakuovém balení skoro žádný vzduch nezůstal…") [x] 2 přesun č.12/13 na konec (pozice 20, 21) [x] 3 masážní baňka nahrazena pneumatikou 2,5 baru [x] 4 přidána jednotka atmosféra (atm) místo sprej [x] 5 jazyk „zhlubokém"→„hlubokém". Vedlejší úprava nad rámec nálezů: poslední otázka (přesunuté č.13 „na kolik barů se hustí pneumatiky") ŠKRTNUTA a nahrazena obecnou otázkou na vzorec `p(celkový) = p(atm) + p(přetlak)` — doslovně stejné číslo 2,5 baru jako v nové otázce nálezu 3 způsobovalo únik.

**meteorologie-a-mereni-tlaku** (8/8 nálezů) — [x] 1 výpočet 970 hPa [x] 2 osm veličin [x] 3 heliograf [x] 4 ČHMÚ upraveno beze škrtu [x] 5 vysvětlení č.3 zkráceno [x] 6 vysvětlení č.5 zkráceno [x] 7 vysvětlení č.10 zkráceno [x] 8 doplněno do vysvětlení č.5 a č.6 (víry, hluboká níže).

**kmitani-a-vlneni** (6/6 nálezů) — [x] 1 kyv/kmit [x] 2 příčné vlnění jen v pevných/kapalných [x] 3 λ=v:f výpočet [x] 4 vlnová délka definice [x] 5 kyvadlo 2s/10s [x] 6 doplněno vysvětlení č.11.

**zvuk-vznik-a-sireni** (7/7 nálezů) — [x] 1 komorní tón 440 Hz [x] 2 barva zvuku [x] 3 vysvětlení č.10 zkráceno [x] 4 jazyk otázky o kapele [x] 5 délková nápověda č.1/8/11/12/13 zkrácena [x] 6 sjednocen formát čísel u otázky o rychlosti zvuku ve vzduchu (č.17 zrušena náhradou barvy zvuku) [x] 7 bez náhrady, ponecháno ve vysvětleních.

**vnimani-zvuku-a-hlasitost** (6/6 nálezů) — [x] 1 kmity bubínku [x] 2 pořadí kmitů v uchu (vysvětlení PŘEFORMULOVÁNO: návrh „kapalina v hlemýždi" doslova opakoval odpověď otázky „Co rozkmitá vláskové buňky v hlemýždi?" → únik; nové znění „tekutina ve vnitřním uchu") [x] 3 pokryto (viz 2) [x] 4 pokryto (viz 1) [x] 5 vysvětlení č.17 zkráceno [x] 6 doplněno do vysvětlení č.20 [x] délková nápověda č.7 zkrácena (č.5 ponechána, jen +19, bez explicitního NÁVRHU v nálezu).

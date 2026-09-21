# Sladění kvízů s přestavěnými výklady — F8 Tepelné motory + Teplo a změny skupenství

Nezávislá kontrola 22. 9. 2026. Zdroj: `node podtema.mjs ROOT get fyzika/8-rocnik/<celek>/<klic>`
(obsah + zapis) proti `node testy/vypis-kviz.mjs <klic>` (21 otázek, správná první).
Jen čtení — do `kvizy.ts` ani `temata.ts` nic zapsáno nebylo.
Typy: (a) fakt/číslo mimo výklad nebo jinak · (b) látka, kterou výklad vypustil ·
(c) nosná část výkladu bez otázky · (d) délková nápověda, únik, duplicita.
Práh náskoku = 10 znaků (`zkontroluj.mjs` ř. 198, rohatka `pocetNaskok10`).
Všechny výpočty přepočítány (`node -e`), výsledky celočíselné.

---

## tepelny-motor-parni-stroj — VERDIKT: NESLADĚNO (5)

1. **(d) otázka č. 12** „Co roztáčí páru u parní turbíny?" — otázka je obrácená: ptá se, co roztáčí
   PÁRU, ale správná odpověď („pára roztáčí lopatky turbíny") odpovídá na opačnou otázku; distraktory
   „píst | magnet" navíc nemají stejný tvar jako správná odpověď.
   NÁVRH: „Co roztáčí pára v parní turbíně?" → **lopatky turbíny** | píst ve válci | klikový hřídel.
   Vysvětlení: „Pára naráží na lopatky turbíny a roztáčí je." (délky 15/13/14)

2. **(d) otázka č. 21** „K čemu sloužila Hérónova baňka, první parní stroj z 1. století?" — zadání
   samo prozrazuje odpověď otázky č. 4 („Kdo sestrojil první starověký parní stroj? → Hérón").
   NÁVRH — ŠKRTNOUT a NAHRADIT (nadstavba, zůstane poslední): „Parní stroj dostane 1 000 J tepla
   a má účinnost 15 %. Kolik z toho promění na pohyb?" → **150 J** | 850 J | 15 J.
   Vysvětlení: „1 000 · 0,15 = 150 J; zbylých 850 J unikne jako teplo do okolí." (ověřeno: 150)

3. **(c)** Nepokryto: celý h3 **„Pro zvídavé: počítáme"** (1 000 J · 0,15 = 150 J, ztráta 850 J;
   1 000 J · 0,35 = 350 J u turbíny) nemá ani jednu otázku — řeší náhrada v nálezu 2.

4. **(c)** Nepokryto: h3 **„Jak pára pohání píst"** (voda se zahřeje k varu, horká pára má velký tlak
   a tlačí na píst) — v kvízu chybí, přitom je to základ celého tématu.
   NÁVRH — ŠKRTNOUT č. 15 („Na jakou energii mění turbína energii páry?" — potřetí totéž po č. 1
   a č. 12) a NAHRADIT: „Co v parním stroji tlačí na píst?" → **horká pára s velkým tlakem** |
   studený vzduch z okolí | voda z kotle. Vysvětlení: „Voda se v kotli zahřeje až k varu a vzniklá
   horká pára tlačí na píst." (délky 26/22/12)

5. **(d) délková nápověda ≥10 znaků u sedmi otázek**: č. 13 (+31), č. 12 (+22), č. 3 (+18),
   č. 8 (+14), č. 11 (+12), č. 15 (+11), č. 7 (+10). NÁVRHY (správná první, vždy kratší než nejdelší
   distraktor):
   - č. 13: „Kde se používá parní turbína?" → **v tepelných elektrárnách** | v náramkových hodinkách |
     v kapesní kalkulačce (24/23/20).
   - č. 3: „Čím se od sebe druhy motorů hlavně liší?" → **účinností** | barvou kotle |
     hmotností paliva (9/12/16).
   - č. 8: „Kde se parní stroje využívaly?" → **lokomotivy, parníky, továrny** |
     jen v dětských hračkách a modelech | v mobilních telefonech a počítačích (28/34/35).
   - č. 11: „Která nevýhoda platí pro parní stroj?" → **velký, těžký, riziko výbuchu kotle** |
     nepotřeboval žádné palivo ani vodu | byl velmi tichý, čistý a úsporný (34/34/32).
   - č. 7: „K čemu Watt přidal setrvačník?" → **pro plynulý chod** | pro zpomalení stroje |
     pro chlazení kotle (16/20/18).
   - č. 12 a č. 15 řeší nálezy 1 a 4.

---

## spalovaci-motory — VERDIKT: NESLADĚNO (6)

1. **(a) otázka č. 16**, vysvětlení „Start (**setrvačník**), chlazení (voda/vzduch) a mazání olejem."
   — výklad říká, že motor startuje **elektrický startér poháněný autobaterií**; setrvačník patří
   do výkladu parního stroje (Watt). Žák dostane rozporné vysvětlení.
   NÁVRH vysvětlení: „Motor se musí nastartovat elektrickým startérem z autobaterie, chladit vodou
   nebo vzduchem a mazat olejem — sám se nerozeběhne."

2. **(a) otázka č. 20** „Jaké jsou výhody vznětového motoru oproti zážehovému? → **vyšší tažná síla
   a nižší spotřeba**" — ani tažná síla, ani nižší spotřeba ve výkladu nejsou (výklad uvádí jen vyšší
   účinnost 30–40 % proti 20–33 %, větší hmotnost, cenu, emise, filtr a turbodmychadlo).
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nález 6): „Proč má vznětový motor ve výfuku filtr pevných
   částic?" → **produkuje víc emisí** | je těžší a dražší | nemá zapalovací svíčku.
   Vysvětlení: „Vznětový motor vypouští víc emisí, proto má výfuk s filtrem pevných částic."
   (délky 19/17/22)

3. **(a) otázka č. 13**, vysvětlení „Vznětový motor jezdí na naftu **(nebo zemní plyn)**" — zemní plyn
   se ve výkladu nevyskytuje. NÁVRH vysvětlení: „Vznětový (Dieselův) motor spaluje naftu."

4. **(d) otázka č. 21**, vysvětlení „…**Watt v roce 1784 zdokonalil parní stroj**" — prozrazuje odpověď
   otázky č. 5 sousedního bloku *tepelny-motor-parni-stroj* („James Watt (1784)"). Navíc je tu jméno
   psané **„Nikolaus Otto"**, zatímco v bloku parního stroje stojí **„Nicolaus Otto"** — dvojí pravopis
   téhož jména v jednom celku.
   NÁVRH: sjednotit na „Nicolaus Otto, 1876"; vysvětlení: „Zážehový čtyřtaktní motor sestrojil Otto
   v roce 1876."

5. **(c)** Nepokryto: celý h3 **„Pro zvídavé: počítáme"** (20 % z 25 000 kJ = 5 000 kJ;
   40 % z 15 000 kJ = 6 000 kJ) — v kvízu není jediný výpočet.
   NÁVRH — ŠKRTNOUT č. 3 („Co je hlavní pohyblivá část pístového motoru?" — triviální a její vysvětlení
   navíc napovídá odpověď č. 4) a NAHRADIT na poslední místo: „Motor spálí palivo s energií 25 000 kJ
   a má účinnost 20 %. Kolik energie promění na pohyb?" → **5 000 kJ** | 20 000 kJ | 2 500 kJ.
   Vysvětlení: „25 000 : 100 · 20 = 5 000 kJ, zbylých 20 000 kJ odejde jako odpadní teplo."
   (ověřeno: 5 000)

6. **(c)** Nepokryto dál: teplota ve válci při výbuchu **asi 2000 °C**, karburátor × přímé vstřikování,
   turbodmychadlo, filtr pevných částic.
   NÁVRH: filtr řeší nález 2; teplotu doplnit do vysvětlení č. 16: „Při výbuchu je ve válci asi
   2000 °C, proto se motor musí chladit vodou nebo vzduchem, jinak by se roztavil."

---

## teplo-a-premeny-skupenstvi — VERDIKT: NESLADĚNO (4)

1. **(d) otázka č. 11**, vysvětlení „Např. jód nebo **tvorba ohonu komet**." — doslova prozrazuje
   odpověď otázky č. 20 („Co je příkladem sublimace v přírodě? → tvorba ohonu komety").
   NÁVRH vysvětlení č. 11: „Sublimace je přechod pevné látky rovnou na plyn, například u jódu."

2. **(a) otázka č. 14**, vysvětlení „…vypařování **(při varu prudce v celém objemu)**" — o varu
   v celém objemu není v tomhle výkladu ani slovo (var se tu jen jmenuje) a věta zároveň prozrazuje
   odpovědi č. 1 a č. 2 bloku *var*.
   NÁVRH vysvětlení: „Kapalina se dodáváním tepla mění na plyn — vypařování. Kapalnění je opačný děj,
   tuhnutí se týká pevné látky."

3. **(pořadí / nadstavba) otázky č. 11 a č. 16** (sublimace, desublimace) pocházejí z nadstavbového
   bloku **💡 Sublimace**, ale stojí uprostřed kvízu; nadstavba patří na konec (č. 20 tam už je).
   NÁVRH: přesunout beze změny znění na pozice 20 a 21 (spolu s dosavadní č. 20).

4. **(d) otázka č. 13** „Má na skupenství vliv i tlak? → **ano, má**" — ano/ne otázka, kterou žák
   uhodne bez znalosti (distraktory „ne, vůbec žádný", „jen u kovů" nejsou věrohodné).
   NÁVRH: „Jak působí na skupenství vysoký tlak?" → **brání částicím se oddálit** |
   usnadňuje částicím se oddálit | na částice nemá žádný vliv. Vysvětlení: „Vysoký tlak brání
   částicím se od sebe vzdálit, nízký tlak jim to naopak usnadňuje." (délky 25/29/26)

Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.

---

## tani — VERDIKT: NESLADĚNO (7)

1. **(d) DUPLICITA č. 6 × č. 16** — „Jak tají amorfní látky (sklo, vosk)? → postupně v rozmezí teplot"
   a „Jak taje amorfní látka jako sklo? → postupně měkne v rozmezí teplot" jsou prakticky táž otázka
   i táž odpověď.
   NÁVRH — ŠKRTNOUT č. 16 a NAHRADIT (nadstavbový výpočet, na konec): „Na roztátí kusu ledu jsme
   dodali 996 kJ tepla (lt = 332 kJ/kg). Kolik ledu roztálo?" → **3 kg** | 2 kg | 6 kg.
   Vysvětlení: „m = Lt : lt = 996 : 332 = 3 kg." (ověřeno: 3)

2. **(d) DUPLICITA + ÚNIK č. 8 × č. 17** — obě otázky jsou o tlaku pod ostřím brusle a vysvětlení
   č. 8 („Pod tlakem taje led už při ~−8 °C") doslova prozrazuje odpověď č. 17 („led taje už
   kolem −8 °C").
   NÁVRH — ŠKRTNOUT č. 17 a NAHRADIT: „Co udává měrné skupenské teplo tání?" →
   **teplo na roztátí 1 kg látky** | teplo na ohřátí látky o 1 °C | teplotu, při které látka taje.
   Vysvětlení: „Značíme ho lt a měříme v joulech na kilogram." (délky 27/28/29)
   Zároveň zkrátit vysvětlení č. 8 na: „Pod ostřím brusle je velký tlak a ten teplotu tání snižuje."

3. **(a) otázka č. 13** „Proč se na spoje elektroniky používá cín? → má nižší teplotu tání než
   součástky" — pájení ani použití cínu v elektronice ve výkladu nejsou, výklad uvádí jen
   „Cín taje při 232 °C".
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nepokrytý převod ze ZAPISu): „Kolik joulů je 1 kilojoule?"
   → **1 000 J** | 100 J | 10 000 J. Vysvětlení: „1 kJ = 1 000 J, proto je 332 kJ/kg totéž
   co 332 000 J/kg."

4. **(d) ÚNIK č. 7 → č. 21** — odpověď č. 7 („sůl sníží teplotu tání") dělá z č. 21 („Co ovlivňuje
   teplotu tání kromě tlaku? → příměsi v látce") otázku bez obsahu; vysvětlení č. 21 navíc opakuje
   celou č. 7.
   NÁVRH — ŠKRTNOUT č. 21 a NAHRADIT: „Co znamená ve vzorci Lt = lt · m písmeno m?" →
   **hmotnost látky, která taje** | teplo, které látka přijme | teplotu tání látky.
   Vysvětlení: „Čím víc látky chceme roztavit, tím víc tepla potřebujeme." (délky 25/25/18)

5. **(d) délková nápověda ≥10 znaků u šesti otázek**: č. 7 (+40), č. 8 (+39), č. 4 (+19),
   č. 13 (+17), č. 1 (+12), č. 5 (+11). NÁVRHY:
   - č. 7: „Proč se solí zledovatělé silnice?" → **sůl sníží teplotu tání ledu** |
     sůl led svým teplem rozpouští | sůl led ztvrdí a zdrsní povrch (27/29/30).
   - č. 8: „Proč brusle kloužou po ledu?" → **tlak ostří led roztaví** | led je vždycky trochu mokrý |
     ostří led rozpálí třením (22/27/24).
   - č. 4: „Co se děje s teplotou během tání?" → **nemění se** | stále roste | rovnoměrně klesá (9/11/16).
   - č. 1: „Co je tání?" → **změna pevné látky na kapalinu** | změna kapaliny na plynnou páru |
     změna plynu zpátky na kapalinu (29/30/30).
   - č. 5: „Jak tají krystalické látky?" → **při jedné teplotě** | v širokém rozmezí teplot |
     netají, jen měknou (17/24/18).
   - č. 13 se ruší podle nálezu 3.

6. **(d) otázka č. 14**, distraktor „úplně a nenávratně navždy přestanou existovat" je nesmysl,
   tedy nápověda. NÁVRH: „uvolňují se z vazeb a začnou se volně pohybovat" |
   „spojí se pevně do pravidelné krystalové mřížky" | „zůstanou na místě a jen pomaleji kmitají"
   (47/46/40).

7. **(c)** Nepokryto: obrácený výpočet **m = Lt : lt** (996 : 332 = 3 kg) — řeší nález 1;
   převod **1 kJ = 1 000 J** — řeší nález 3; význam symbolů ve vzorci — řeší nález 4.

---

## tuhnuti — VERDIKT: NESLADĚNO (4)

1. **(a) otázka č. 11**, vysvětlení „V nížinách stačí asi **80 cm**, na horách až 140 cm" — výklad
   uvádí **aspoň 90 cm**, v chladnějších oblastech až 140 cm. Číslo 80 cm ve výkladu není.
   NÁVRH vysvětlení: „Vodovody se vedou aspoň 90 cm hluboko, v chladnějších oblastech až 140 cm,
   aby voda v potrubí nezamrzla."

2. **(d) ÚNIK č. 13 → č. 20** — vysvětlení č. 13 „Slaná voda mrzne až ve větším mrazu **(do −21 °C)**"
   doslova prozrazuje odpověď č. 20 („Až do jaké nejnižší teploty dokáže sůl posunout tuhnutí vody?
   → asi −21 °C").
   NÁVRH vysvětlení č. 13: „Sůl led neohřívá, jen mu sníží teplotu tuhnutí, a proto led taje i v mrazu."

3. **(c)** Nepokryto: celý **výpočtový blok** („Pro zvídavé", Lt = lt · m, lt ledu = 332 kJ/kg,
   332 · 5 = 1 660 kJ, 664 : 332 = 2 kg) i ZAPIS-**vzorec** — v kvízu není ani jedna otázka na vzorec,
   hodnotu ani výpočet, ačkoli je vzorec v zápise do sešitu.
   NÁVRH — ŠKRTNOUT č. 15 („Jakou úlohu má ledová vrstva na hladině rybníka?" — třetí otázka na týž
   jev po č. 9 a č. 14) a NAHRADIT na konec: „Kolik tepla se uvolní, když zmrzne 5 kg vody?
   (lt = 332 kJ/kg)" → **1 660 kJ** | 332 kJ | 664 kJ. Vysvětlení: „Lt = lt · m = 332 · 5 = 1 660 kJ;
   měrné skupenské teplo tuhnutí je stejné jako u tání." (ověřeno: 1 660)

4. **(c)** Nepokryto: ZAPIS-**zákon** „Měrné skupenské teplo tání a tuhnutí dané látky mají stejnou
   hodnotu" — v tomhle bloku bez otázky (vlastní otázku má jen blok *tani*, č. 20; opakovat ji sem
   by byla mezibloková duplicita).
   NÁVRH: pokrýt ji druhou větou vysvětlení u nové otázky z nálezu 3 (viz výše) — bez další otázky.

Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.

---

## vyparovani — VERDIKT: NESLADĚNO (3)

1. **(a) + (d) otázka č. 20** „Čím se vypařování liší od varu?" — tvrzení „var probíhá v celém objemu
   kapaliny a jen při teplotě varu" v tomhle výkladu vůbec není (výklad říká jen „kapalina nemusí
   vřít"), a otázka i vysvětlení prozrazují odpovědi č. 1 a č. 2 sousedního bloku *var*.
   NÁVRH — ŠKRTNOUT a NAHRADIT (zkouší dosud neprověřený činitel „druh kapaliny"):
   „Proč se rozlitý líh ztratí ze stolu dřív než voda?" → **líh se vypařuje rychleji** |
   líh se vsákne do dřeva stolu | líh se na vzduchu mění na led.
   Vysvětlení: „Rychlost vypařování závisí i na druhu kapaliny — líh patří mezi těkavé látky."

2. **(d) ÚNIK č. 6 ↔ č. 16** — odpověď č. 6 („těkavé — líh či benzín") a odpověď č. 16 („Co znamená,
   že je kapalina těkavá? → rychle se vypařuje") se navzájem vyzrazují: kdo vidí jednu, odpoví druhou.
   NÁVRH přeformulovat č. 6 bez slova „těkavý": „Která z uvedených kapalin se vypaří nejrychleji?"
   → **líh** | voda | olej. Vysvětlení: „Líh se vypařuje rychleji než voda i olej." (délky 3/4/4)

3. **(d) DUPLICITA pěti otázek na tytéž činitele** — č. 4 (obecně), č. 5 (povrch + teplota),
   č. 13 (teplo + proudění), č. 17 (proudění), č. 19 (povrch); odpověď č. 5 dopředu vyzrazuje
   odpovědi č. 17 i č. 19.
   NÁVRH — ŠKRTNOUT č. 5 (celá je obsažená v č. 4, 13, 17 a 19) a NAHRADIT otázkou na dosud
   nepoužitý příklad z výkladu: „Proč po vytření uschne podlaha?" → **voda se z ní vypaří** |
   voda se vsákne do betonu | voda zmrzne na tenký film. Vysvětlení: „Vypařování využíváme každý
   den — schne prádlo, vytřená podlaha i umyté nádobí." (délky 19/24/25)

Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.
Pokrytí ZAPISu ověřeno bod po bodu — všech šest bodů má otázku.

---

## var — VERDIKT: NESLADĚNO (5)

1. **(d) ÚNIK/DUPLICITA č. 1 × č. 2** — odpověď č. 1 („Co je var? → **vypařování v celém objemu**")
   dává rovnou odpověď na č. 2 („Čím se var liší od vypařování? → probíhá v celém objemu").
   NÁVRH přeformulovat č. 1: „Co je var?" → **prudká přeměna kapaliny na páru** |
   přeměna páry zpět na kapalinu | přeměna pevné látky na kapalinu. Vysvětlení: „Var nastane,
   když kapalinu zahřejeme na její teplotu varu." (délky 31/29/31)

2. **(d) ÚNIK č. 6 → č. 10 a č. 16** — vysvětlení č. 6 „…**v horách proto voda vře dřív než u moře**"
   prozrazuje odpověď č. 10 („Proč se v horách hůř uvaří jídlo? → voda vře při nižší teplotě")
   i směr odpovědi č. 16.
   NÁVRH vysvětlení č. 6: „Čím nižší je tlak nad hladinou, tím snáz se pára z kapaliny uvolní."

3. **(a) otázka č. 20** „Proč to, co se tvoří varem uvnitř kapaliny, stoupá k hladině, a ne ke dnu?"
   — zadání je pro osmáka zbytečně opsané (vyhýbá se slovu „bublina") a odůvodnění z vysvětlení
   („pára je lehčí než okolní kapalina") ve výkladu vůbec není.
   NÁVRH: „Co dělají bubliny páry, které při varu vzniknou uvnitř kapaliny?" →
   **stoupají k hladině a pára uniká** | klesají ke dnu hrnce | zůstávají stát uprostřed.
   Vysvětlení: „Právě proto vroucí voda v hrnci probublává." (délky 31/20/24)

4. **(a) otázka č. 11**, distraktor **„332,5 kJ/kg"** — desetinné číslo tam, kde výklad (blok *tani*)
   uvádí celých **332 kJ/kg**; porušuje pravidlo celých čísel.
   NÁVRH distraktory: **2 260 kJ/kg** | 332 kJ/kg | 100 kJ/kg.

5. **(c)** Nepokryto: **destilace ropy na benzín a petrolej**, **tlak 300 kPa** v papiňáku a obrácený
   výpočet **m = Lv : lv** (2 260 : 2 260 = 1 kg).
   NÁVRH — ŠKRTNOUT č. 17 („Co lze destilací vyrobit z mořské vody?" — odsolování mořské vody
   ve výkladu není) a NAHRADIT: „Co se destilací získává z ropy?" → **benzín a petrolej** |
   sůl a písek | led a sníh. Vysvětlení: „Složky ropy mají různou teplotu varu, proto se oddělují
   postupným zahříváním." (délky 17/11/10)
   Tlak doplnit do vysvětlení č. 15: „V tlakovém hrnci stoupne tlak až na 300 kPa a voda v něm
   vře při 130 °C."

Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.
Výpočet č. 18 přepočítán: 2 260 · 2 = 4 520 kJ ✓ (celé číslo).

---

## kondenzace — VERDIKT: NESLADĚNO (4)

1. **(a) otázka č. 20** „Co se děje s teplotou vodní páry, dokud probíhá kondenzace přesně při
   100 °C? → Teplota zůstává 100 °C…" — výklad kondenzace **nikde netvrdí**, že se během kondenzace
   teplota nemění (stálá teplota během děje je jen ve výkladech *var*, *tani* a *tuhnuti*).
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje nepokrytý obrácený výpočet): „Radiátor uvolnil kondenzací
   páry 9 040 kJ tepla. Kolik páry v něm zkondenzovalo? (lv = 2 260 kJ/kg)" → **4 kg** | 2 kg | 9 kg.
   Vysvětlení: „m = Lv : lv = 9 040 : 2 260 = 4 kg." (ověřeno: 4)

2. **(a) + (jazyk) otázka č. 19**, zadání „(skupenské teplo **kondenzační vody** je 2 260 kJ/kg)" —
   takový pojem neexistuje a v jednotkách kJ/kg se udává **měrné** skupenské teplo (výklad: lv).
   NÁVRH zadání: „Kolik tepla se uvolní, když zkondenzují 3 kg vodní páry? (měrné skupenské teplo
   lv = 2 260 kJ/kg)" → **6 780 kJ** | 2 260 kJ | 4 520 kJ. Vysvětlení: „Lv = lv · m = 2 260 · 3 =
   6 780 kJ." (ověřeno: 6 780)

3. **(c) + (d)** Nepokryto: h3 **„Využití kondenzace"** má otázky jen na zkapalňování plynů
   (č. 11, 15, 17), **topení párou v radiátorech továren a lodí** chybí. Zároveň čtyři otázky
   (č. 7, 8, 18, 21) zkoušejí tentýž jev — orosení chladného povrchu.
   NÁVRH — ŠKRTNOUT č. 7 (nejobecnější z těch čtyř) a NAHRADIT: „K čemu se kondenzace páry využívá
   v továrnách a na lodích?" → **k topení v radiátorech** | k výrobě elektřiny | k chlazení strojů.
   Vysvětlení: „Kondenzující pára v radiátorech uvolňuje teplo a ohřívá okolí." (délky 22/18/17)

4. **(d) ÚNIK č. 13 → č. 2** — vysvětlení č. 13 „**Kondenzace je opačný děj k vypařování**, proto
   teplo vrací zpátky" prozrazuje odpověď č. 2 („Opačným dějem ke kondenzaci je… → vypařování").
   NÁVRH vysvětlení č. 13: „Uvolní se přesně tolik tepla, kolik ho předtím spotřebovala přeměna
   vody na páru."

Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.
Přepočítáno: 6 780 : 1 260 = 5,4 → „víc než pětkrát" ✓ (č. 12); 2 260 J : (4 200 · 80) = 6,7 g
→ „asi 7 gramů" ✓ (č. 16).

---

## skupenske-zmeny-vody-v-prirode — VERDIKT: NESLADĚNO (5)

1. **(d) ÚNIK č. 10 → č. 19** — vysvětlení č. 10 „Srážky se udávají **v milimetrech — je to výška
   vodního sloupce**" doslova prozrazuje odpověď č. 19 („V milimetrech (mm), jako výšku vodní vrstvy").
   NÁVRH vysvětlení č. 10: „Srážkoměr zachytí spadlou vodu; teploměr měří teplotu a vlhkoměr
   vlhkost vzduchu."

2. **(a) otázka č. 5** „Na čem v ovzduší kondenzuje vodní pára? → **na kondenzačních jádrech**" —
   pojem „kondenzační jádro" se ve výkladu vůbec nevyskytuje (výklad mluví o prachu a zrnkách soli),
   žák ho ze stránky nezná.
   NÁVRH: „Na čem se ve vzduchu tvoří kapičky mraku?" → **na prachu a zrnkách soli** |
   na slunečních paprscích | na bublinkách vzduchu. Vysvětlení: „Kapičky se lepí na drobné částečky
   ve vzduchu a spolu vytvářejí mrak." (délky 24/23/21)

3. **(c)** Nepokryto: h3 **„Tání: voda se vrací zpátky do koloběhu"** (roztátý sníh stéká z hor
   do potoků a řek zpátky do moří) — v kvízu chybí celý krok tání, ačkoli bez něj se koloběh
   neuzavře (ZAPIS: „tání = led a sníh se mění zpět na vodu").
   NÁVRH — ŠKRTNOUT č. 13 („Co vznikne, když kapky deště cestou k zemi promrznou? → zmrzlý déšť" —
   termín „zmrzlý déšť" ve výkladu není, výklad mluví o „drobných kouscích ledu") a NAHRADIT:
   „Jak se voda z hor vrací na jaře zpátky do moří?" → **sníh roztaje a steče do řek** |
   sníh se rovnou vypaří | sníh zůstane ležet celé léto. Vysvětlení: „Táním se sníh mění na vodu,
   ta stéká do potoků a řek a koloběh se uzavírá." (délky 27/21/28)

4. **(a) otázka č. 8**, vysvětlení „Husté kapky sluneční světlo **pohltí a rozptýlí**, dolů ho projde
   méně" — výklad uvádí jen, že čím víc kapiček, tím je mrak tmavší; optické zdůvodnění v něm není.
   NÁVRH vysvětlení: „Čím víc kapiček mrak obsahuje, tím míň světla jím projde — proto vypadá tmavší."

5. **(a) otázka č. 9** „Jak vznikají sněhové vločky a ledové krystaly v mracích? → **desublimací
   na prachu**" — výklad u desublimace v mracích prach nezmiňuje (prach a sůl patří ke kondenzaci
   kapiček).
   NÁVRH: → **desublimací páry** | táním kroup za letu | kondenzací na kapkách. Vysvětlení:
   „Vysoko v mracích se pára mění rovnou na led — tak vznikají krystalky a vločky." (délky 16/19/21)

Drobnost bez nálezu: název vysokých oblaků **cirrus** zůstává v kvízu nepokrytý (nadstavbový detail).
Délková nápověda: žádná otázka nedosáhla náskoku 10 znaků — bez nálezu.

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně, celý výpis; ke kontrolovaným 9 klíčům se žádné netýká)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 572 otázek (21 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 217 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

Pozn.: měřidlo `testy/uniky.mjs` na těchto devíti blocích nehlásí nic — všechny výše uvedené úniky
a duplicity jsou nalezeny čtením, brána je nevidí (porovnává jen uvnitř bloku a podle shody slov).

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 9 klíčů zapracováno do `src/data/kvizy.ts`, každý ověřen na přesně 21 otázek
(`node testy/vypis-kviz.mjs <klic> --otazky`). Brány: `node testy/uniky.mjs` → 0 duplicit,
0 úniků (celý web); `node zkontroluj.mjs` → 0 ⚠️ k těmto 9 klíčům (4 zbylé ⚠️ jsou
nesouvisející, stejné jako před zásahem); `npm run build` → 481 stránek OK.

- [x] tepelny-motor-parni-stroj — zapracováno 5/5 (nálezy 1–5, nález 3 vyřešen nálezem 2)
- [x] spalovaci-motory — zapracováno 6/6 (nálezy 1–6, nález 6 sloučen do vysvětlení č. 16 s nálezem 1)
- [x] teplo-a-premeny-skupenstvi — zapracováno 4/4
- [x] tani — zapracováno 7/7
- [x] tuhnuti — zapracováno 4/4 (nález 4 sloučen do vysvětlení nové otázky z nálezu 3)
- [x] vyparovani — zapracováno 3/3
- [x] var — zapracováno 5/5
- [x] kondenzace — zapracováno 4/4
- [x] skupenske-zmeny-vody-v-prirode — zapracováno 5/5

### Odchylky od NÁVRHU (nutné opravy druhého kola)

Po prvním zapracování `testy/uniky.mjs` odhalil 4 NOVÉ úniky, které samy zanesly opravy
(přesně vzor z pravidel — druhé kolo kontroly je povinné):

1. **tepelny-motor-parni-stroj** — nová výpočtová otázka (nález 2) v původním znění
   „…má účinnost 15 %…" doslova prozrazovala odpověď „Jaká je přibližná účinnost parního
   stroje? → asi 15 %". Přeformulováno na dotaz na ztrátové teplo (850 J), číslo 15 %
   se v zadání už neobjevuje.
2. **tepelny-motor-parni-stroj** — zkrácení odpovědi u „Kde se používá parní turbína?"
   (nález 5, č. 13) na „v tepelných elektrárnách" zvýšilo shodu s otázkou „Jaký výkon mají
   generátory poháněné parní turbínou v elektrárnách?" nad práh brány. Z této otázky
   odstraněno „v elektrárnách" ze zadání i „v tepelných elektrárnách" z vysvětlení
   (informace zůstává jen u otázky o turbíně).
3. **vyparovani** — nález 1 (líh se ztrácí rychleji) a nález 2 (líh se vypaří nejrychleji)
   po zapracování zkoušely prakticky totéž tvrzení a vzájemně se prozrazovaly. Otázka
   z nálezu 2 přeformulována opačně („Která kapalina se vypařuje NEJPOMALEJI?" → olej),
   aby testovala jiný fakt.
4. **var** — nová otázka z nálezu 3 („Co dělají bubliny páry, které při varu vzniknou
   uvnitř kapaliny?") doslova opakovala odpověď otázky č. 3 („Co vzniká uvnitř kapaliny
   při varu? → bubliny páry"). Přeformulováno bez slov „bubliny"/"páry" („Co se děje
   s tím, co při varu vznikne uvnitř kapaliny?").

Všechna čísla v nových výpočtových otázkách (tani: 996/332/3; tuhnutí: 332/5/1660;
spalovací motory: 25000/20 %/5000/20000; tepelný motor: 1000/150/850;
kondenzace: 9040/2260/4/6780) ověřena přímo v `node podtema.mjs . get <klic>` —
všechna se doslova shodují s výkladovým blokem „Pro zvídavé: počítáme".

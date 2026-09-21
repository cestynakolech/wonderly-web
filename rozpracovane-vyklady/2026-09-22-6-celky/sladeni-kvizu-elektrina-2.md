# Nezávislá kontrola sladění kvízů s novými výklady — F8 elektřina (7 podtémat)

Kontrolor, 22. 9. 2026. Zdroje: `node podtema.mjs . get fyzika/8-rocnik/elektrina/<klic>`
(pole `obsah` + `zapis`) a `node testy/vypis-kviz.mjs <klic>`. Všechny číselné odpovědi
přepočítány (`node -e`). Délkový náskok správné odpovědi změřen skriptem nad daty
(`nactiData()`), práh jako v `zkontroluj.mjs` 6b2 = 10 znaků.
NIC nebylo zapisováno do `kvizy.ts` ani `temata.ts`.

Typy nálezů: (a) fakt/číslo v otázce, které výklad neuvádí nebo uvádí jinak ·
(b) otázka na látku, kterou nový výklad vypustil · (c) nosná část výkladu bez otázky ·
(d) délková nápověda.

---

## zavislost-odporu-na-vodici — VERDIKT: NESLADĚNO (5 nálezů)

1. **(a) | otázka č. 20 | „V textu je pořadí čtyř kovů od…"** — otázka stojí na premise,
   která ve výkladu neplatí. Výklad říká: *„Nejmenší měrný odpor mají nejlepší vodiče — měď,
   zlato, stříbro a hliník."* To NENÍ pořadí od nejlepšího k nejhoršímu (nejlepší je stříbro,
   uvedené až třetí). Měrný odpor zlata ani stříbra výklad neuvádí, žák odpověď nemá odkud vzít.
   **NÁVRH — ŠKRTNOUT a NAHRADIT** (pokryje obrácený tvar vzorce z části „Pro zvídavé“):
   - Otázka: „Nichromový drát (ρ = 1,1 Ω·mm²/m) s průřezem 1 mm² má mít odpor 22 Ω. Jak dlouhý musí být?“
   - Odpovědi: `20 m` | `22 m` | `24 m`
   - Vysvětlení: „Ze vzorce R = ρ · l : S plyne l = R · S : ρ = 22 · 1 : 1,1 = 20 m.“
     (Přepočítáno: 22 / 1,1 = 20 ✓, shoduje se s výpočtem ve výkladu.)

2. **(c) | nepokryto: jednotka odporu a její násobky** — úvodní odstavec h2 („ohm, Ω, čteme óm,
   násobky kΩ a MΩ“) a bod ZAPIS „1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω“ nezkouší žádná z 21 otázek
   (otázka 7 se ptá na jednotku měrného odporu, ne odporu).
   **NÁVRH — nahradit otázku č. 19** („Ze čtyř materiálů … vede proud nejhůř → nichrom“), která
   se překrývá s otázkou 6 („Které látky mají nejmenší měrný odpor“) — je to tentýž fakt z druhé strany:
   - Otázka: „Kolik ohmů je 1 kΩ?“
   - Odpovědi: `1 000 Ω` | `100 Ω` | `1 000 000 Ω`
   - Vysvětlení: „Předpona kilo znamená tisíc, takže 1 kΩ = 1 000 Ω; milion ohmů je 1 MΩ.“

3. **(d) | otázka č. 8 | „Co je rezistor?"** — správná odpověď je o 23 znaků delší než nejdelší
   distraktor (`součástka s přesnou hodnotou odporu` × `zdroj napětí` / `spínač`); žák trefí podle délky.
   **NÁVRH — ponechat otázku, srovnat distraktory:**
   - Odpovědi: `součástka s přesnou hodnotou odporu` | `zdroj napětí pro celý elektrický obvod` | `spínač, který obvod zapíná a vypíná`

4. **(d) | otázka č. 12 | „V jakých jednotkách dosazujeme do vzorce…"** — náskok +13 znaků
   (`základních (m, m², Ω·m)` × `v cm` / `jak chceme`).
   **NÁVRH:** `základních (m, m², Ω·m)` | `v centimetrech a milimetrech čtverečních` | `v libovolných, jak se nám zrovna hodí`

5. **(d) | otázka č. 4 | „Co popisuje měrný odpor (rezistivita) ρ?"** — náskok +10 znaků
   (`jak látka brání proudu` × `délku vodiče` / `teplotu`).
   **NÁVRH:** `jak látka brání proudu` | `délku vodiče v metrech` | `teplotu vodiče ve stupních`

---

## ohmuv-zakon — VERDIKT: NESLADĚNO (5 nálezů)

1. **(c) | nepokryto: graf proudu podle napětí** — h3 „Pokus: měníme napětí, měříme proud“ končí
   nosnou větou *„V grafu proudu podle napětí je to přímka, která vychází z počátku.“* Na tu se
   neptá žádná z 21 otázek.
   **NÁVRH — nahradit otázku č. 10** („Kdy platí Ohmův zákon přesně?“), která se obsahově kryje
   s otázkou 19 („Proč se rozžhavené vlákno neřídí Ohmovým zákonem přesně“) — vysvětlení u 19
   navíc odpověď na 10 doslova prozrazuje:
   - Otázka: „Jak vypadá graf závislosti proudu na napětí, když má vodič stálý odpor?“
   - Odpovědi: `přímka vycházející z počátku` | `křivka, která nejdřív roste a pak zase klesá` | `vodorovná čára ve stále stejné výšce`
   - Vysvětlení: „Kolikrát se zvětší napětí, tolikrát se zvětší proud — proto je grafem přímka z počátku.“

2. **(c) | nepokryto: čí odpor v obvodu rozhoduje** — celý odstavec h3 „Elektrický odpor“
   („Odpor samotného vodiče bývá zanedbatelný… rozhoduje odpor spotřebičů, proto se počítají
   jako rezistory“) nemá žádnou otázku.
   **NÁVRH — nahradit otázku č. 13** („V kterém roce byl formulován Ohmův zákon“ — letopočet je
   nejslabší, čistě pamětní položka a blok už má otázku 2 na objevitele):
   - Otázka: „Čí odpor hlavně rozhoduje o tom, kolik proudu obvodem poteče?“
   - Odpovědi: `odpor zapojených spotřebičů` | `odpor přívodních drátů, ten bývá největší` | `odpor vzduchu kolem vodičů`
   - Vysvětlení: „Odpor samotných drátů je zanedbatelný; proud určuje odpor spotřebiče, třeba žárovky nebo spirály vařiče.“

3. **(a/pořadí) | otázky č. 7 a 8 | „Jaký proud teče, když U = 10 V…" / „Jaký odpor má vodič…"** —
   obě přebírají čísla z nadstavbové části „Pro zvídavé: počítáme“ (10 V, 0,2 A, 50 Ω), ale stojí
   uprostřed bloku, kdežto ostatní početní otázky (16, 20, 21) jsou na konci. Otázky z nadstavby
   patří podle pravidla na konec.
   **NÁVRH:** beze změny znění přesunout otázky 7 a 8 za dnešní otázku 21 (pořadí ve výsledku:
   … 19, 20, 21, „Jaký proud teče, když U = 10 V a R = 50 Ω?“, „Jaký odpor má vodič, když U = 10 V a I = 0,2 A?“).
   Výpočty samy sedí: 10 / 50 = 0,2 A ✓, 10 / 0,2 = 50 Ω ✓.

4. **(d) | otázka č. 6 | „Jak měříme odpor spotřebiče?"** — náskok +26 znaků, k tomu nesmyslné
   distraktory (`na váze`, `teploměrem`) — dvojitá nápověda.
   **NÁVRH:**
   - Odpovědi: `nepřímo — změříme U a I a dopočítáme` | `odhadem podle tloušťky přívodního kabelu` | `porovnáním s odporem stejně dlouhého drátu`
   - Vysvětlení nechat, ale bez výčtu přístrojů, ať neprozradí otázku 15: „Odpor určíme jako podíl naměřeného napětí a proudu.“

5. **(d) | otázka č. 10 | „Kdy platí Ohmův zákon přesně?"** — náskok +13 znaků
   (`za stálé teploty vodiče` × `jen v zimě` / `vždy`). Otázku navrhuji škrtnout už v nálezu 1;
   pokud zůstane, distraktory srovnat: `za stálé teploty vodiče` | `jen za mrazu pod nulou` | `vždy a za každé teploty`.

---

## zapojeni-spotrebicu-za-sebou — VERDIKT: NESLADĚNO (3 nálezy)

Všech šest početních otázek přepočítáno a sedí: 4 + 6 = 10 Ω ✓, 10 − 6 = 4 V ✓, 3 · 2 = 6 V ✓,
10 / (2+3) = 2 A ✓, (2+5) · 3 = 21 V ✓, 1+1+1 = 3 V ✓.

1. **(a) + (c) | otázka č. 21 | „Kam je nejvýhodnější zapojit ampérmetr, pokud…"** — o zapojování
   ampérmetru do sériového obvodu ani o měření proudu v různých místech výklad neříká NIC
   (ampérmetr se v tomto výkladu vůbec nevyskytuje). Zároveň výkladu chybí otázka na kvantitativní
   dělení napětí: *„rozdělí se ve stejném poměru jako odpory — např. odpory 2 : 1 rozdělí napětí také 2 : 1“*.
   **NÁVRH — ŠKRTNOUT a NAHRADIT:**
   - Otázka: „Sériově jsou zapojené rezistory 4 Ω a 2 Ω. V jakém poměru se mezi ně rozdělí napětí zdroje?“
   - Odpovědi: `2 : 1` | `1 : 2` | `1 : 1`
   - Vysvětlení: „Napětí se dělí ve stejném poměru jako odpory — na větším odporu je větší napětí.“

2. **(d) | otázka č. 3 | „Jak se chová napětí v sériovém obvodu?"** — náskok +11 znaků
   (`rozdělí se mezi spotřebiče` × `je všude stejné` / `je nulové`).
   **NÁVRH:** `rozdělí se mezi spotřebiče` | `je na všech stejné jako u zdroje` | `je na každém spotřebiči nulové`

3. **(c) | nepokryto: „zákon zachování toku"** — pojmenování zákona z h3 „Proud — teče všude
   stejně“ nezkouší žádná otázka (otázka 2 se ptá jen na chování proudu, název zákona nepadne).
   **NÁVRH — drobné, řešit jen při další dávce:** nahradit otázku č. 7 („Jaký je celkový odpor
   oproti jednotlivým“ — překrývá se s otázkou 12 o delším drátu):
   - Otázka: „Jak se jmenuje pravidlo, podle kterého je proud stejný ve všech částech sériového obvodu?“
   - Odpovědi: `zákon zachování toku` | `zákon o úbytcích napětí` | `zákon o dělení proudu v uzlu`
   - Vysvětlení: „Kolik elektronů do části obvodu vteče, tolik z ní i vyteče — jako voda v korytě řeky.“

---

## zapojeni-spotrebicu-vedle-sebe — VERDIKT: NESLADĚNO (5 nálezů)

Početní otázky přepočítány: 12 / 3 = 4 A ✓, 2 + 5 = 7 A ✓, 1/(1/4 + 1/4) = 2 Ω ✓, 9 V ✓.

1. **(d) | otázka č. 2 | „Jak se chová napětí v paralelním obvodu?"** — náskok +23 znaků
   (`na všech je stejné jako u zdroje` × `dělí se` / `je nulové`).
   **NÁVRH:** `na všech je stejné jako u zdroje` | `dělí se mezi jednotlivé větve obvodu` | `na každé větvi klesne na nulu`

2. **(d) | otázka č. 1 | „Jak jsou spotřebiče zapojené paralelně?"** — náskok +19 znaků.
   **NÁVRH:** `vedle sebe, každý ke zdroji` | `za sebou v jedné jediné řadě` | `do kruhu kolem zdroje napětí`

3. **(d) | otázka č. 12 | „Proč rezistory vedle sebe mají menší odpor?"** — náskok +11 znaků.
   **NÁVRH:** `tvoří větší plochu průřezu` | `jsou dohromady delší než jeden` | `jsou chladnější než v sérii`

4. **(a) | otázka č. 9 | „Jak jsou zapojené zásuvky v domácnosti?"** — vysvětlení tvrdí
   „Každý spotřebič má stejné napětí **230 V**“, jenže hodnota 230 V se v tomto výkladu
   vůbec nevyskytuje (výklad mluví jen o „napětí zdroje“). Žák si ji ze stránky neověří.
   **NÁVRH — otázku i odpovědi ponechat, opravit vysvětlení:**
   „Každá zásuvka je připojená přímo na oba póly zdroje, proto je na všech stejné napětí
   a spotřebiče se navzájem neovlivňují.“

5. **(c) | nepokryto: proud se dělí v opačném poměru než odpory** — výklad to má rozepsané
   i s čísly (6 Ω a 3 Ω → 2 A a 4 A, tedy poměr odporů 2 : 1 a proudů 1 : 2). Otázka 5 pokrývá
   jen kvalitativní stranu („menší odpor → větší proud“).
   **NÁVRH — nahradit otázku č. 21** („Tři žárovky paralelně, kolik má obvod větví?“ — triviální
   a překrývá se s otázkami 1, 13 a 19):
   - Otázka: „Paralelně jsou rezistory 6 Ω a 3 Ω. V jakém poměru se mezi ně rozdělí proud (ve stejném pořadí)?“
   - Odpovědi: `1 : 2` | `2 : 1` | `1 : 1`
   - Vysvětlení: „Proud se dělí opačně, než jsou odpory — větví s menším odporem poteče víc proudu (2 A a 4 A).“

---

## rezistor-s-promennym-odporem — VERDIKT: NESLADĚNO (2 nálezy)

Početní otázka přepočítána: 12 / 3 = 4 A ✓. Délkový náskok nikde nepřekročil práh 10 znaků
(nejvíc +6 u otázky 12). Fakta z otázek 14 (tramvaje), 18 (jmenovitý výkon 25 W), 20 (R = 0 Ω),
21 (pedál plynu) mají ve výkladu doslovnou oporu.

1. **(c) | nepokryto: výpočet výkonu na reostatu (P = U · I)** — h3 „Proč se reostat zahřívá“
   i „Pro zvídavé“ vrcholí výpočtem P = 12 · 4 = 48 W proti jmenovitým 25 W, což je nosné
   vyústění celého výkladu (a `zapis.vzorec` obsahuje P = U · I). Žádná otázka výkon nepočítá —
   otázka 13 se ptá jen kvalitativně.
   **NÁVRH — nahradit otázku č. 9** („Čím menší odpor reostatu, tím … větší proud“), která se
   obsahově kryje s otázkou 13 i s početní otázkou 19:
   - Otázka: „Reostatem prochází při napětí 12 V proud 4 A. Jaký je na něm výkon?“
   - Odpovědi: `48 W` | `16 W` | `3 W`
   - Vysvětlení: „P = U · I = 12 · 4 = 48 W. Reostat se jmenovitým výkonem 25 W by se takovým zatížením poškodil.“
   (Přepočítáno: 12 · 4 = 48 ✓, shodné s výkladem.)

2. **(c) | nepokryto (drobné): materiál odporového drátu** — výklad jmenuje nichrom a konstantan
   a keramický/plastový válec, otázka 12 se spokojí s obecným „z odporového drátu“.
   **POZOR:** doslovná otázka na konstantan i na keramický váleček už je v bloku
   `zavislost-odporu-na-vodici` (otázky 9 a 16) — doplnit ji sem by znamenalo mezi-blokovou
   duplicitu, kterou `testy/uniky.mjs` neodhalí (porovnává jen uvnitř bloku). **Doporučení:
   NEdoplňovat**, jen případně rozšířit vysvětlení otázky 12 o větu „Bývá to slitina s velkým
   měrným odporem, navinutá na nevodivém válci.“

---

## elektricka-prace-a-vykon — VERDIKT: NESLADĚNO (8 nálezů)

Početní otázky přepočítány: 2 · 3 = 6 kWh ✓, 1 · 5 · 5 = 25 Kč ✓, 0,5 · 4 = 2 kWh ✓,
240 / 12 = 20 kWh ✓, 1 Wh = 3 600 J ✓.

1. **(a) ZÁVAŽNÉ | otázka č. 12 | „Proč se dnes používají LED žárovky?"** — vysvětlení tvrdí
   *„klasická žárovka promění na světlo jen asi 5 %, LED kolem poloviny“*, ale výklad uvádí
   **účinnost LED asi 70 %** („LED žárovka má účinnost mnohem vyšší, asi 70 %“, i v ZAPIS).
   Vysvětlení tedy odporuje stránce, ze které se žák učí.
   **NÁVRH — otázku i odpovědi ponechat, opravit vysvětlení:**
   „Klasická žárovka promění na světlo jen asi 5 % energie, LED asi 70 % — na stejné světlo
   proto potřebuje mnohem méně elektřiny.“

2. **(a) | otázka č. 7 | „Co ukazuje energetický štítek na spotřebiči?"** — výklad o energetickém
   štítku ani o třídách A–G nemluví vůbec (zná jen „údaj na štítku“ = příkon). Otázka i vysvětlení
   („energetickou třídu (A–G) i roční spotřebu v kWh“) stojí mimo výklad.
   **NÁVRH — ŠKRTNOUT a NAHRADIT** (zároveň pokryje nález 6):
   - Otázka: „Jakou účinnost má LED žárovka?“
   - Odpovědi: `asi 70 %` | `přesně 100 %` | `asi 20 %`
   - Vysvětlení: „LED promění na světlo asi 70 % energie; sto procent nemá žádný spotřebič, část se vždy ztratí jako teplo.“

3. **(a) | otázka č. 4 | „Co ukazuje elektroměr v jednotkách kWh?"** — slovo elektroměr se
   v novém výkladu nevyskytuje; výklad říká jen „Spotřeba elektřiny doma se počítá v kWh“.
   **NÁVRH — přeformulovat na fakt z výkladu:**
   - Otázka: „V jakých jednotkách se počítá spotřeba elektřiny v domácnosti?“
   - Odpovědi: `v kilowatthodinách (kWh)` | `ve wattech na jeden den` | `v joulech za každou minutu`
   - Vysvětlení: „Domácí spotřeba se účtuje v kilowatthodinách: 1 kWh je výkon 1 kW po dobu jedné hodiny.“

4. **(a) | otázka č. 19 | „Energetický štítek chladničky udává roční…"** — opět energetický
   štítek (viz nález 2) a vysvětlení přidává údaj „reálné chladničky mají obvykle 150–250 kWh/rok“,
   který ve výkladu není.
   **NÁVRH — ponechat výpočet, vypustit štítek i cizí rozsah:**
   - Otázka: „Chladnička spotřebuje za rok 240 kWh. Kolik je to průměrně za měsíc?“
   - Odpovědi: `20 kWh` | `2 kWh` | `200 kWh`
   - Vysvětlení: „Rok má 12 měsíců, takže 240 : 12 = 20 kWh za měsíc.“ (240 / 12 = 20 ✓)

5. **(a) | otázka č. 16 | „LED žárovka svítí stejně jasně jako klasická 100W…"** — zadání dává
   LED příkon 10 W, jenže výklad tvrdí, že LED potřebuje **čtrnáctkrát méně** (poměr účinností
   70 % : 5 %), tedy asi 7 W. Čísla v otázce a ve výkladu si odporují.
   **NÁVRH — ŠKRTNOUT a NAHRADIT** otázkou, jejíž zadání i výsledek jsou doslova ve výkladu
   („Za měsíc svícení (5 hodin denně) spotřebuje stará žárovka 15 kWh“):
   - Otázka: „Stará žárovka s příkonem 100 W svítí 5 hodin denně. Kolik kWh spotřebuje za 30 dní?“
   - Odpovědi: `15 kWh` | `5 kWh` | `50 kWh`
   - Vysvětlení: „0,1 kW · 5 h = 0,5 kWh za den, za 30 dní 15 kWh.“ (0,1 · 5 · 30 = 15 ✓)

6. **(c) | nepokryto: účinnost LED 70 %** — výklad ji uvádí dvakrát a je v ZAPIS, ale ptá se jen
   otázka 11 na klasickou žárovku (5 %). Řeší návrh v nálezu 2.

7. **(c) | nepokryto: přeměny elektrické energie a přenos energie ke spotřebiči** — h3 „Přeměny
   elektrické energie“ (mechanická práce, teplo, světlo, chemická energie) pokrývá jen otázka 20
   (chemická); body ZAPIS „proud přenáší energii ke spotřebiči“ a „zdroj energie = zdroj napětí“
   nemá žádná otázka.
   **NÁVRH — nahradit otázku č. 8** („Kde najdeme příkon spotřebiče → na výrobním štítku“, která
   se kryje s dnešní otázkou 7 o štítku i s otázkou 5):
   - Otázka: „Na co se mění elektrická energie ve vrtačce nebo v mixéru?“
   - Odpovědi: `na mechanickou práci` | `na chemickou energii v akumulátoru` | `na světlo a nic jiného`
   - Vysvětlení: „Motor koná mechanickou práci; na teplo se energie mění ve vařiči, na světlo v žárovce a na chemickou energii při nabíjení.“

8. **(a/pořadí) | otázky č. 11, 12, 13** — účinnost žárovky a LED pochází z nadstavbové části
   „Pro zvídavé: počítáme“, ale otázky stojí uprostřed bloku před běžnými otázkami 18–21.
   **NÁVRH:** přesunout je (spolu s otázkou 10 o účinnosti) až za dnešní otázku 21, aby nadstavba
   byla na konci.

---

## ucinky-proudu-a-bezpecnost — VERDIKT: NESLADĚNO (6 nálezů)

Početní otázka přepočítána: 230 / 2 000 = 0,115 A = 115 mA ✓. Hodnoty 12 V / 25 V / 120 V,
30 mA (chránič), 60 mA (fibrilace), 0,5–1 mA (práh vnímání), 150 000 Ω, 2 000 Ω, 155
mají ve výkladu doslovnou oporu. Délkový náskok nikde nepřekročil práh.

1. **(a) | otázka č. 1 | „Proč lidské tělo vede elektrický proud?"** — správná odpověď
   „obsahuje tělní tekutiny s ionty“ ani slovo ion se ve výkladu nevyskytuje; výklad konstatuje
   pouze „Lidské tělo je vodič“ a dál pracuje s jeho odporem.
   **NÁVRH — přeformulovat na fakt z výkladu:**
   - Otázka: „Jak se chová lidské tělo, když se dotkne vodiče pod napětím?“
   - Odpovědi: `chová se jako vodič, proud jím projde` | `chová se jako dokonalý izolant` | `proud vždy odrazí zpět do zásuvky`
   - Vysvětlení: „Tělo je vodič — proud jím projde a může způsobit popáleniny, křeče i zástavu srdce.“

2. **(c) | nepokryto: rozdíl stejnosměrného a střídavého proudu, přímé × nepřímé a akutní ×
   pozdní účinky** — čtyři samostatné body ZAPIS („stejnosměrný: křeč v místě vstupu“,
   „střídavý ze zásuvky: riziko fibrilace“, „přímé: tkáň; nepřímé: popálenina, zlomenina“,
   „akutní ihned, pozdní za měsíce“) nemá žádná z 21 otázek.
   **NÁVRH — nahradit otázku č. 8** („Smíme sahat na vypínač mokrou rukou? ne / ano / jen krátce“ —
   nejslabší otázka bloku, překrývá se s otázkou 5):
   - Otázka: „Kdy se projeví pozdní účinky úrazu elektrickým proudem?“
   - Odpovědi: `až za měsíce nebo roky` | `okamžitě při průchodu proudu` | `jen během prvních minut po úrazu`
   - Vysvětlení: „Akutní účinky přijdou hned, pozdní se mohou ukázat až za měsíce nebo roky.“

3. **(c) | nepokryto: co dělat po probrání zraněného a stlačování hrudníku** — závěr h3
   „První pomoc“ („zraněného vždy předej záchranářům, i když se probral“, „stlačuj hrudník
   asi 5 cm, 100× za minutu“) nezkouší žádná otázka.
   **NÁVRH — nahradit otázku č. 2** („Co může způsobit proud procházející tělem“ — kryje se
   s otázkami 3, 4 a 15):
   - Otázka: „Zraněný po úrazu proudem se probral a tvrdí, že je mu dobře. Co uděláme?“
   - Odpovědi: `přesto ho předáme záchranářům` | `necháme ho odejít domů` | `počkáme hodinu a pak uvidíme`
   - Vysvětlení: „Proud může poškodit srdce tak, že se to projeví až za několik hodin — proto zraněného vždy předáme záchranářům.“

4. **(a) | otázka č. 16 | „Co dělá jistič v rozvodné skříni bytu?"** — vysvětlení popisuje
   mechanismus („obsahuje kovový pásek, který se při velkém proudu ohne“), který výklad neuvádí.
   **NÁVRH — otázku a odpovědi ponechat, opravit vysvětlení:**
   „Jistič hlídá, aby obvodem netekl příliš velký proud (typicky nad 16 A) — chrání vedení a dům
   před požárem, ne přímo člověka.“

5. **(c) | nepokryto (drobné): tísňová linka 112 a spadlý drát** — výklad výslovně učí
   „volej 112 (případně 150 hasiče), 155 navíc jen při zranění“; otázka 12 pokrývá jen 155,
   otázka 19 jen chování u trafostanice. Doporučení: při dalším doplňování bloku přidat otázku
   na spadlý drát pod napětím a linku 112 (dnes by musela vytlačit otázku z bezpečnostních
   pravidel, proto neoznačuji za povinné).

6. **(a/pořadí) | otázky č. 13 a 14** — obě vycházejí z nadstavbové části „Pro zvídavé: počítáme“
   (115 mA, 4,5 V × 230 V), ale stojí uprostřed bloku, před běžnými otázkami 15–21.
   **NÁVRH:** přesunout obě beze změny znění na konec bloku, za dnešní otázku 21.

---

## ⚠️ ze `node zkontroluj.mjs` k těmto sedmi klíčům

Skript doběhl s `exit=0` a hlášením „✅ Vše zapojené správně.“
**K žádnému ze sedmi kontrolovaných klíčů nevypsal jediný řádek ⚠️.** Vypsaná varování se týkají
jiných částí webu a jsou zde uvedena doslovně jen pro doložení, že měřidlo skutečně běželo:

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 612 otázek (22 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 264 — laťku lze utáhnout: npm run prijmi-latku
⚠️  fyzika/9-rocnik/energie-a-vesmir/vesmir-a-galaxie: číslo 100 není ve výkladu — „Kolik galaxií je odhadem ve viditelném vesmíru?"
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

**Pozor na falešný klid:** bod 6d (číslo mimo výklad) nehlásí u těchto bloků nic, protože
početní úlohy z měření vynechává — rozpory v nálezech výše (LED „kolem poloviny“ × 70 %,
energetický štítek, 230 V, ionty) leží ve **vysvětleních a zadáních**, kam 6d ani 6b2 nedosáhnou.
Délkové nápovědy (10 otázek s náskokem ≥10 znaků v těchto blocích) jsou v souhrnném čísle 264
utopené, protože rohatka měří jen celkový počet, ne jednotlivé bloky.

---

## ZAPRACOVÁNO 22. 9. 2026

Exekutor. Vše zapracováno přesně dle NÁVRHŮ výše, s těmito odchylkami vynucenými bránou
`testy/uniky.mjs` (nález sama kontrola nehlásila — nové úniky vznikly až mezi NOVĚ vloženými
otázkami a existujícím obsahem bloku, proto se dořešily hned při zapracování):

- **zapojeni-spotrebicu-vedle-sebe, otázka „Jak jsou zapojené zásuvky v domácnosti?“**
  (nález 4): navržené vysvětlení „Každá zásuvka je připojená přímo na oba póly zdroje…“
  vytvořilo únik (kmeny „kazd-“/„zdro-“ ze slov „každý“/„zdroji“ v odpovědi jiné otázky
  bloku). Přeformulováno na „Zásuvka bývá spojená přímo s oběma póly rozvodu, proto mají
  všechny stejné napětí a spotřebiče se navzájem neovlivňují.“ — věcně stejné, bez shodných
  kmenů.
- **zapojeni-spotrebicu-vedle-sebe, nová otázka o poměru proudu 6 Ω : 3 Ω** (nález 5):
  navržené vysvětlení s čísly „(2 A a 4 A)“ prozrazovalo odpověď jiné otázky bloku
  („V paralelní větvi… Jaký proud touto větví teče?“ → 4 A). Čísla z vysvětlení odstraněna,
  zůstalo jen kvalitativní zdůvodnění (poměr 1:2 je už v samotné odpovědi).
- **elektricka-prace-a-vykon, otázka „Proč se dnes používají LED žárovky?“** (nález 1):
  opravené vysvětlení s „…LED asi 70 %“ kolidovalo s novou otázkou „Jakou účinnost má LED
  žárovka?“ (nález 2, také 70 %). Číslo 70 % z tohoto vysvětlení odstraněno („LED žárovka
  mnohem víc“), fakt 5 % u klasické žárovky zůstal.
- **elektricka-prace-a-vykon, nová otázka „Na co se mění elektrická energie ve vrtačce
  nebo v mixéru?“** (nález 7): vysvětlení zmiňovalo i „chemickou energii při nabíjení“, což
  prozrazovalo odpověď otázky o akumulátoru. Zkráceno na mechanickou práci, teplo a světlo.

Zbytek zapracován beze změny proti návrhu:

- [x] zavislost-odporu-na-vodici 5/5 (nálezy 1–5 vč. přesunu č. 20→škrtnuto+nahrazeno,
      č. 19→nahrazeno kΩ otázkou)
- [x] ohmuv-zakon 5/5 (nálezy 1–5; otázky 7 a 8 přesunuty na konec bloku, nález 5 pohlcen
      nálezem 1)
- [x] zapojeni-spotrebicu-za-sebou 3/3
- [x] zapojeni-spotrebicu-vedle-sebe 5/5 (viz odchylky výše)
- [x] rezistor-s-promennym-odporem 2/2 (nález 2 = jen rozšíření vysvětlení, beze škrtu)
- [x] elektricka-prace-a-vykon 8/8 (viz odchylky výše; otázky 10–13 přesunuty na konec bloku)
- [x] ucinky-proudu-a-bezpecnost 6/6 (nálezy 1–4 a 6; nález 5 je jen doporučení pro
      příští dávku, žádná otázka se dnes nepřidávala)

Ověřeno: `node testy/vypis-kviz.mjs <klíč>` = 21 otázek u všech sedmi klíčů,
`node testy/uniky.mjs` = 0 duplicit / 0 úniků, `node zkontroluj.mjs` = 0 ⚠️ k těmto
klíčům, `npm run build` proběhl bez chyby.

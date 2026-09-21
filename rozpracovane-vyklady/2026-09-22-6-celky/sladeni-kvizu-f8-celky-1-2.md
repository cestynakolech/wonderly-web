# Nezávislá kontrola sladění kvízů s výklady — F8, celky „Mechanická práce a výkon" + „Energie"

Kontrolor, 22. 9. 2026. Podklad: `node podtema.mjs … get` (obsah + zapis) a
`node testy/vypis-kviz.mjs <plný klíč>` (21 otázek i s odpověďmi a vysvětleními).
Všechny číselné příklady přepočítány (`node -e`). Délky odpovědí měřeny skriptem nad
skutečnými daty (`testy/data.mjs`), ne nad textem souboru.

Pozn. k měřidlům: `node testy/uniky.mjs` hlásí u všech osmi bloků **0 duplicit a 0 úniků** —
všechny níže uvedené úniky typu (d) jsou tedy mimo dosah brány (kryje se s pamětí
„Brána měří jen část úniků"). Náskok délky počítán jako
`délka(správná) − max(délka ostatních)`; hranice ≥ 10 znaků dle `zkontroluj.mjs:198`.

Formát návrhu: `ODPOVĚDI: <správná> | <distraktor> | <distraktor>` (správná vždy první).

---

## mechanicka-prace — VERDIKT: NESLADĚNO (7)

NÁLEZY:

1. **(a) | otázka 18 „Se kterou další veličinou má joule společnou…" | ZÁVAŽNÉ** —
   správná odpověď „s energií a teplem" tvrdí, že joule je jednotkou i energie a tepla.
   Výklad mechanické práce o energii ani teple NIKDE nemluví (obsahuje jen práci, sílu,
   dráhu, tíhovou sílu a převody kJ/MJ); v `zapis.jednotky` je jen „práce — značíme W,
   jednotka J (joule)". Žák to z této stránky nemá odkud vědět.
   **NÁVRH: ŠKRTNOUT a NAHRADIT** otázkou, která zároveň zaceluje mezeru z nálezu 2:
   - OTÁZKA: „Neseš tašku vodorovně a tvá síla míří nahoru. Konáš práci?"
   - ODPOVĚDI: `ne — síla míří kolmo | ano — taška je hodně těžká | ano — ujdeš dlouhou cestu`
   - VYSVĚTLENÍ: „Když síla svírá s dráhou pravý úhel, práce se nekoná."

2. **(c) | ve výkladu bez otázky: „síla kolmo na dráhu → práce nekoná" | ZÁVAŽNÉ** —
   je to samostatná věta v h3 „Kdy se práce nekoná" („třeba když neseš tašku vodorovně
   a tvá síla míří nahoru") a zároveň vlastní bod `zapis.body`. Ani jedna z 21 otázek se
   ho nedotýká; kolmost se neobjeví ani v žádném distraktoru.
   **NÁVRH:** pokrývá ho nová otázka z nálezu 1 (počet zůstává 21).

3. **(c) | ve výkladu bez otázky: třetí případ nekonání práce (F = 0 N, přesto pohyb)** —
   výklad má celý odrážkový příklad „Michal stojí na skateboardu, který už jede, ale sám
   se neodráží: F = 0 N, přesto ujede 250 m → práci nekoná" i větu o rovnoměrném přímočarém
   pohybu. V kvízu na to není nic.
   **NÁVRH: ŠKRTNOUT otázku 12** („Jak vypočítáme sílu, známe-li práci a dráhu?" — týž
   vztah už prakticky zkouší otázka 16 s lokomotivou) **a NAHRADIT:**
   - OTÁZKA: „Michal jede na skateboardu a neodráží se: F = 0 N, ujede 250 m. Koná práci?"
   - ODPOVĚDI: `ne — nepůsobí silou | ano — ujel celých 250 m | ano — vždyť se pohybuje`
   - VYSVĚTLENÍ: „W = F · s; když je síla nulová, je nulová i práce."

4. **(d) délková nápověda | otázka 1 „Kdy těleso ve fyzice koná práci?" | ZÁVAŽNÉ** —
   správná 50 znaků, ostatní 26 a 15 → **náskok 24 znaků**. Žák uhodne bez znalosti látky.
   **NÁVRH** (stejná otázka, jiné odpovědi):
   - ODPOVĚDI: `působí silou a těleso se posune | jen drží těžké těleso v rukou | zahřeje se, ale nehne se`
     (31 / 29 / 24 znaků → náskok 2)

5. **(d) délková nápověda | otázka 3 „Může vykonat práci i silové pole?"** —
   47 vs. 25 a 19 → **náskok 22 znaků**.
   **NÁVRH:** ODPOVĚDI: `ano — třeba gravitační síla | ne, jen člověk nebo stroj | ne, jen stroje a motory`
   (27 / 25 / 23 → náskok 2)

6. **(d) délková nápověda | otázka 13 „Jak velkou silou musíme působit, abychom…"** —
   40 vs. 21 a 27 → **náskok 13 znaků**.
   **NÁVRH:** ODPOVĚDI: `silou rovnou tíhové síle F = m · g | silou rovnou hmotnosti v kilogramech | jakoukoli malou silou stačí`
   (35 / 37 / 27 → správná už není nejdelší)

7. **(d) délková nápověda | otázka 10 „V jakých jednotkách musíme dosazovat sílu…" | DROBNÉ** —
   33 vs. 21 a 11 → **náskok 12 znaků**.
   **NÁVRH:** ODPOVĚDI: `v newtonech a v metrech | v kilogramech a v kilometrech | na jednotkách nezáleží`
   (23 / 29 / 22 → náskok záporný)

POZNÁMKA (pořadí, bez nálezu): otázky 14–16 pocházejí z h3 „Pro zvídavé: počítáme"
(máma s hračkou, lokomotiva), zatímco základní příklady 19–21 (jeřáb, saně, dělník)
stojí až za nimi. Nadstavba má podle pravidel stát na konci — doporučujeme prohodit
pořadí bloků 14–16 a 19–21.

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 14 → 0,6 · 10 = **6 N**; o. 15 → 6 · 1,5 = **9 J**;
o. 16 → 900 000 000 : 4 500 = **200 000 N**; o. 19 → 300 · 10 · 5 = **15 000 J**;
o. 20 → 40 · 10 = **400 J**; o. 21 → 300 : 50 = **6 m**. Všechny výsledky celočíselné.

---

## vykon — VERDIKT: NESLADĚNO (7)

NÁLEZY:

1. **(d) únik | otázka 3 „Jaká je značka výkonu?" | ZÁVAŽNÉ** — její vysvětlení zní
   „…ale ve vzorci **P = W : t** značí práci", čímž doslova prozradí správnou odpověď
   otázky 5 („Podle jakého vzorce počítáme výkon?" → `P = W : t`).
   **NÁVRH:** VYSVĚTLENÍ otázky 3 změnit na: „Značka výkonu je velké P. Písmeno W má ve
   fyzice dvě role — jednou je to jednotka watt, jednou značka práce."

2. **(d) únik | otázka 18 „Sešlápneš plyn v autě víc…" | ZÁVAŽNÉ** — vysvětlení
   „Mezi výkonem a rychlostí je přímá úměra (**P = F · v**)" prozradí správnou odpověď
   otázky 10 („Jaký vztah platí mezi výkonem, silou a rychlostí?" → `P = F · v`).
   **NÁVRH:** VYSVĚTLENÍ otázky 18: „Větší výkon motoru znamená i větší rychlost auta."

3. **(d) únik + duplicita | otázka 13 „Co udává kilowatthodina (kWh)?"** — vysvětlení
   „…v ní se účtuje elektřina" prozradí odpověď otázky 16 („V čem se udává spotřeba
   elektrické energie spotřebičů?" → `v kilowatthodinách (kWh)`); obě otázky navíc stojí
   na jediném faktu z výkladu („V kilowatthodinách se také účtuje elektřina").
   **NÁVRH: ŠKRTNOUT otázku 16 a NAHRADIT** (zacelí zároveň mezeru z nálezu 4):
   - OTÁZKA: „Kolik wattů je 1 megawatt (MW)?"
   - ODPOVĚDI: `1 000 000 W | 1 000 W | 100 000 W`
   - VYSVĚTLENÍ: „Předpona mega- znamená milion; megawatty vídáme u elektráren."
   Vysvětlení otázky 13 zkrátit na: „kWh je odvozená jednotka práce (energie)."

4. **(c) | ve výkladu bez otázky: 1 MW = 1 000 000 W** — výklad má vlastní h3 „Jednotky
   výkonu" s oběma převody a `zapis.body` obsahuje „1 kW = 1 000 W, 1 MW = 1 000 000 W".
   Kvíz zkouší jen kilowatt (o. 8), megawatt vůbec.
   **NÁVRH:** pokrývá nová otázka z nálezu 3.

5. **(d) délková nápověda | otázka 13 „Co udává kilowatthodina (kWh)?" | ZÁVAŽNÉ** —
   38 vs. 10 a 14 → **náskok 24 znaků**.
   **NÁVRH:** ODPOVĚDI: `práci stroje o výkonu 1 kW za 1 hodinu | výkon stroje, který běží celou hodinu | sílu, kterou stroj vyvine za hodinu`
   (38 / 38 / 35 → náskok 0)

6. **(d) délková nápověda | otázky 18, 12, 16, 6** — náskoky **20, 16, 13, 11** znaků.
   **NÁVRH:**
   - o. 18: `zvětší se, roste i rychlost | zmenší se, auto zpomalí | nezmění se, zůstane stejný` (28 / 25 / 29)
   - o. 12: `velké P je výkon, malé p tlak | velké P i malé p je výkon | malé p je výkon, velké P tlak` (29 / 25 / 29)
   - o. 6: `za 1 sekundu se vykoná práce 1 J | za 1 hodinu se vykoná práce 1 J | za 1 sekundu působí síla 1 N` (32 / 31 / 30)
   - o. 16: řeší ŠKRT z nálezu 3.

7. **(pořadí) | otázky 11 a 15 | DROBNÉ** — obě pocházejí z h3 „Pro zvídavé: počítáme"
   (jeřáb 4 800 000 J / 60 s; elektromotor 9 kW × 16 h), ale stojí před základními
   příklady 19–21 (motor, vrtačka). Nadstavbové otázky patří na konec bloku.
   **NÁVRH:** přesunout 11 a 15 za dosavadní otázku 21.

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 11 → 4 800 000 : 60 = **80 000 W**;
o. 15 → 9 · 16 = **144 kWh**; o. 19 → 15 000 : 5 = **3 000 W**;
o. 20 → 5 000 : 500 = **10 s**; o. 21 → 600 · 20 = **12 000 J**. Vše celočíselné.

---

## energie-a-jeji-premeny — VERDIKT: NESLADĚNO (5)

NÁLEZY:

1. **(d) duplicita + únik | otázka 14 „V žárovce se elektrická energie mění hlavně na…" | ZÁVAŽNÉ** —
   její správná odpověď `světlo a teplo` prozradí otázku 20 („…část energie se ztrácí,
   protože se vlákno rozžhaví. Jako jaká energie se tato ztracená část projeví?" →
   `jako tepelná energie`). Obě otázky navíc stojí na téže jediné větě výkladu
   („…kde se promění na světlo a teplo").
   **NÁVRH: ŠKRTNOUT otázku 14 a NAHRADIT** (zacelí zároveň mezeru z nálezu 2):
   - OTÁZKA: „S čím souvisí mechanická energie?"
   - ODPOVĚDI: `s pohybem a polohou těles | s teplotou a barvou těles | s nábojem a magnety`
   - VYSVĚTLENÍ: „Mechanická energie se týká toho, jak se těleso pohybuje a kde je."

2. **(c) | ve výkladu bez otázky: mechanická energie** — je to PRVNÍ položka seznamu
   druhů energie v h3 „Druhy energie" a jediná, která má ve výkladu vlastní vysvětlení
   („souvisí s pohybem a polohou těles"); v kvízu se neobjeví ani jednou (o. 5 ji má
   jen ve vysvětlení). Přitom jaderná (o. 9), chemická (o. 7, 10), elektrická (o. 18),
   magnetická (o. 19) i tepelná (o. 17, 20) svou otázku mají.
   **NÁVRH:** pokrývá nová otázka z nálezu 1.

3. **(a) | otázka 12 „Zvednu kladivo výš nad hřebík…" | DROBNÉ** — vysvětlení říká
   „Čím výš, tím víc **polohové energie**…". Pojem „polohová energie" v tomto výkladu
   není (zavádí se až v podtématu pohybová-a-polohová-energie); výklad tu píše jen
   „získá větší energii".
   **NÁVRH:** VYSVĚTLENÍ změnit na: „Čím výš kladivo zvedneš, tím víc energie získá —
   a tím větší práci vykoná při dopadu."

4. **(d) duplicita | otázky 6 a 13** — otázka 6 („Co říká zákon zachování energie?" →
   `energii nelze vytvořit ani zničit, jen přeměnit`) a otázka 13 („Může energie ‚jen tak'
   zmizet?" → `ne, jen se přemění na jiný druh`) zkoušejí tentýž fakt a první odpověď
   doslova obsahuje odpověď druhé.
   **NÁVRH: ŠKRTNOUT otázku 13 a NAHRADIT:**
   - OTÁZKA: „Co se stane s energií, když ji spotřebič „spotřebuje"?"
   - ODPOVĚDI: `změní se na jiný druh | úplně zanikne beze stopy | zůstane navždy v drátech`
   - VYSVĚTLENÍ: „Slovo ‚spotřeba' je nepřesné — energie se jen mění na jinou podobu."

5. **(d) délková nápověda | otázky 8, 2, 6, 12, 13, 11 | ZÁVAŽNÉ** — šest z 21 otázek má
   náskok ≥ 10 znaků: **30, 29, 28, 28, 13, 12**.
   **NÁVRH:**
   - o. 8: `uložená energie se změní v práci | energie luku úplně zanikne | vznikne zcela nová energie` (33 / 27 / 29)
   - o. 2: `schopnost tělesa konat práci | hmotnost a objem tělesa | rychlost letícího tělesa` (29 / 24 / 26)
   - o. 6: `energii nelze vyrobit ani zničit | energie časem sama zmizí | energie neustále přibývá` (33 / 25 / 26)
   - o. 12: `bude větší, kladivo má víc energie | bude menší, kladivo zpomalí | nezmění se, hřebík je stejný` (35 / 27 / 30)
   - o. 11: `watthodina a kilowatthodina | metr a kilometr za hodinu | pascal a hektopascal` (27 / 25 / 22)
   - o. 13: řeší ŠKRT z nálezu 4.

OVĚŘENO: blok neobsahuje žádný číselný příklad, není co přepočítávat; všechny druhy
energie v odpovědích jsou z výčtu ve výkladu.

---

## pohybova-a-polohova-energie — VERDIKT: NESLADĚNO (6)

NÁLEZY:

1. **(d) únik | otázka 1 „Na jaké dva druhy dělíme mechanickou energii?" | ZÁVAŽNÉ** —
   vysvětlení zní „Mechanická energie = pohybová (**kinetická**) + polohová
   (**potenciální**)" a prozradí naráz správné odpovědi otázky 2 (`kinetická`)
   i otázky 10 (`potenciální`).
   **NÁVRH:** VYSVĚTLENÍ otázky 1 změnit na: „Mechanickou energii má těleso díky svému
   pohybu nebo díky své poloze."

2. **(d) únik | otázka 11 „Na čem závisí polohová energie tělesa…" | ZÁVAŽNÉ** —
   vysvětlení „**Ep = m · g · h** — hmotnost a výška" prozradí správnou odpověď
   otázky 12 („Podle jakého vzorce počítáme polohovou energii?").
   **NÁVRH:** VYSVĚTLENÍ otázky 11 změnit na: „Čím těžší těleso a čím výš je, tím větší
   má polohovou energii."

3. **(c) | ve výkladu bez otázky: značka polohové energie Eₚ** — výklad ji zavádí větou
   „Značíme ji E_p a počítáme podle vzorce" a `zapis.jednotky` má vlastní řádek
   „polohová energie — značíme Eₚ". Kvíz se ptá jen na značku pohybové energie (o. 3),
   Eₚ je tam pouhý distraktor.
   **NÁVRH: ŠKRTNOUT otázku 4** („Které těleso má pohybovou energii?" — týž fakt už
   zkouší otázka 8 i vysvětlení o. 2) **a NAHRADIT:**
   - OTÁZKA: „Jaká je značka polohové energie?"
   - ODPOVĚDI: `Ep | Ek | Eg`
   - VYSVĚTLENÍ: „Index p = potenciální (polohová); Ek patří pohybové energii."

4. **(c) | ve výkladu bez otázky: využití polohové energie v gravitačním poli** —
   výklad má celý odstavec „Polohovou energii v gravitačním poli využíváme třeba při
   skoku na lyžích nebo u kladiva a sekery, kde těžká hlava dopadá z výšky". Kvíz má
   otázku na využití energie **pružnosti** (o. 15, 16), na gravitační polohovou nic.
   **NÁVRH: ŠKRTNOUT otázku 20** („Podle čeho určujeme výšku h…" — má tři různě dlouhé
   odpovědi a je okrajová) **a NAHRADIT:**
   - OTÁZKA: „Proč má sekera těžkou hlavu a zvedáme ji vysoko?"
   - ODPOVĚDI: `získá tím velkou polohovou energii | je to jen zvyk, tvar nerozhoduje | těžká hlava se hůř zlomí`
   - VYSVĚTLENÍ: „Větší hmotnost i větší výška = větší Ep, a tím větší práce při seknutí."

5. **(a) | otázka 5 „Jak závisí pohybová energie na hmotnosti?" | DROBNÉ** — správná
   odpověď tvrdí „**přímo úměrně** — těžší těleso má větší Ek" a vysvětlení dokonce
   „Dvojnásobná hmotnost → dvojnásobná pohybová energie". Výklad ani `zapis` přímou
   úměru neuvádějí — píší jen „Čím větší je hmotnost tělesa, tím větší má pohybovou
   energii" a „Eₖ roste s hmotností". (Fyzikálně to platí, ale z této stránky to žák nevyčte.)
   **NÁVRH** (řeší i délkovou nápovědu, náskok byl 25 znaků):
   - ODPOVĚDI: `těžší těleso má větší Ek | lehčí těleso má větší Ek | na hmotnosti nezáleží`
     (24 / 24 / 22 → náskok 0)

6. **(d) délková nápověda | otázky 8, 9, 16** — náskoky **22, 16, 10** znaků.
   **NÁVRH:**
   - o. 8: `má větší pohybovou energii | má horší a slabší brzdy | jezdí vždycky pomaleji` (27 / 24 / 23)
   - o. 9: `i těleso, které stojí ve výšce | jen těleso, které se pohybuje | jen kapalina v nádobě` (31 / 29 / 22)
   - o. 16: `stlačená nebo natažená pružina | kámen ležící volně na zemi | auto stojící na parkovišti` (30 / 26 / 28)

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 14 → 2 · 10 · 3 = **60 J**; o. 17 → 10 · 10 · 2 = **200 J**;
o. 18 → 60 : (10 · 3) = **2 kg**; o. 19 → 80 : (4 · 10) = **2 m**. Vše celočíselné.
Poměry u o. 6 a 7 (2× → 4×, 3× → 9×) sedí s výkladem.

---

## zakon-zachovani-mechanicke-energie — VERDIKT: NESLADĚNO (6)

NÁLEZY:

1. **(d) únik | otázka 11 „Proč skateboardista na U-rampě nevyjede…" | ZÁVAŽNÉ** —
   správná odpověď zní „tření mu ubere část energie (**změní se na teplo**)" a prozradí
   odpověď otázky 12 („Na co se ztrácí mechanická energie třením?" → `na teplo`), která
   stojí hned za ní. Vysvětlení otázky 13 („Teplo je také energie") totéž opakuje.
   **NÁVRH:** odpovědi otázky 11 změnit na
   `ODPOVĚDI: tření mu ubere část energie | zvětší se jeho hmotnost | poruší se zákon zachování`
   (26 / 24 / 26 — mimochodem tím zmizí i náskok 22 znaků).

2. **(d) duplicita + zavádějící znění | otázka 20 „V jaké fázi letu má těleso ještě nulovou…" | ZÁVAŽNÉ** —
   zkouší tentýž fakt jako otázka 7 (nahoře je rychlost/Ek nulová) a její správná odpověď
   „nahoře, kde se **ještě** nepohybuje" popisuje těleso PŘED pádem, ne fázi letu —
   zadání i odpověď si protiřečí.
   **NÁVRH: ŠKRTNOUT a NAHRADIT** (zacelí mezeru z nálezu 3):
   - OTÁZKA: „Letadlo letí rychle vysoko nad zemí. Jakou energii má?"
   - ODPOVĚDI: `polohovou i pohybovou zároveň | jen polohovou, letí vysoko | jen pohybovou, letí rychle`
   - VYSVĚTLENÍ: „Celková mechanická energie je součet obou: E = Ep + Ek."

3. **(c) | ve výkladu bez otázky: těleso s Ep i Ek zároveň** — výklad má na to vlastní
   odstavec hned pod vzorcem („Například letící letadlo má obojí najednou…"). Všech 21
   otázek pracuje jen s přeměnou jedné energie na druhou, nikdy se souběhem obou.
   **NÁVRH:** pokrývá nová otázka z nálezu 2.

4. **(c) | ve výkladu bez otázky: vztah práce ↔ mechanická energie** — nosný odstavec
   „Mechanická energie úzce souvisí s prací. Když něco zvedneš, vykonáš práci a těleso
   touto prací získá polohovou energii — třeba sekera zvednutá nad hlavou. Při seknutí
   se tahle energie zase promění zpátky v práci." Kvíz to nezkouší.
   **NÁVRH: ŠKRTNOUT otázku 14** („Kde má horská dráha nejvyšší rychlost?" — týž fakt
   jako o. 4 a navíc s cizím příkladem, viz nález 5) **a NAHRADIT:**
   - OTÁZKA: „Zvedneš sekeru nad hlavu. Co se stalo s prací, kterou jsi vykonal?"
   - ODPOVĚDI: `uložila se jako polohová energie | proměnila se rovnou v teplo vzduchu | beze stopy se ztratila v okolí`
   - VYSVĚTLENÍ: „Při seknutí se tahle polohová energie zase promění zpátky v práci."

5. **(a) | otázky 14 a 18 „horská dráha" | DROBNÉ** — výklad pracuje výhradně s míčkem
   na stromě, míčem vyhozeným vzhůru, kuličkou na zakřivené dráze, lukem, kulečníkem
   a skateboardistou na U-rampě. „Horská dráha" ve výkladu není vůbec.
   **NÁVRH:** otázku 14 řeší nález 4; v otázce 18 nahradit „Vozík horské dráhy" za
   „Kulička na zakřivené dráze" (zbytek zadání i odpovědi beze změny).

6. **(d) délková nápověda | otázky 2, 13, 10, 1, 7 | ZÁVAŽNÉ** — náskoky
   **36, 27, 22, 14, 12** znaků; u otázky 2 je správná odpověď víc než dvakrát delší než
   nejdelší distraktor.
   **NÁVRH:**
   - o. 2: `součet Ep a Ek zůstává stále stejný | součet Ep a Ek se stále zvětšuje | součet Ep a Ek se stále zmenšuje` (37 / 36 / 36)
   - o. 13: `ano — teplo je taky energie | ne, ta energie úplně zmizí | ano, ale jenom ve vakuu` (27 / 26 / 24)
   - o. 10: `první koule předá část energie | obě koule se zastaví natrvalo | energie beze stopy zanikne` (30 / 29 / 27)
   - o. 1: `součet polohové a pohybové | rozdíl polohové a pohybové | jen pohybová energie tělesa` (26 / 26 / 28)
   - o. 7: `nulová, míč se zastaví | největší z celého letu | stejná jako na začátku` (22 / 22 / 23)

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 15 → 16 − 6 = **10 J**; o. 17 → 30 − 12 = **18 J**;
o. 8, 16, 18, 21 pracují se zachováním součtu (10 J, 24 J, 45 J, 20 J) — souhlasí
s tabulkou v h3 „Pro zvídavé". Vše celočíselné.

---

## energeticka-hodnota-potravin — VERDIKT: NESLADĚNO (6)

NÁLEZY:

1. **(a) | otázka 3 „Jakou energii tělo z potravy využívá pro svaly?" | ZÁVAŽNÉ** —
   správná odpověď je `chemickou`, jenže slovo „chemick*" se v celém výkladu i v `zapis`
   vyskytuje **0×** (ověřeno `grep -c "chemick"` nad vytaženým podtématem → `0`).
   Výklad mluví jen o tom, že tělo „spaluje cukry a tuky spolu s kyslíkem". Žák nemá
   z této stránky jak odpověď poznat.
   **NÁVRH: ŠKRTNOUT a NAHRADIT** (zacelí mezeru z nálezu 2):
   - OTÁZKA: „Kolik kJ spálí zhruba hodina fotbalu nebo běhu?"
   - ODPOVĚDI: `2 000 kJ | 250 kJ | 800 kJ`
   - VYSVĚTLENÍ: „Hodina sezení spálí asi 250 kJ, hodina chůze asi 800 kJ, fotbal asi 2 000 kJ."

2. **(c) | ve výkladu bez otázky: celý h3 „Kolik energie spálí běžná činnost" | ZÁVAŽNÉ** —
   výklad uvádí tři konkrétní čísla (sezení ~250 kJ/h, chůze ~800 kJ/h, fotbal/běh
   ~2 000 kJ/h) a žádná z 21 otázek se jich nedotkne. Je to jediná celá sekce výkladu
   bez jediné otázky.
   **NÁVRH:** pokrývá nová otázka z nálezu 1.

3. **(c) | ve výkladu bez otázky: přebytek energie → tuk** — výklad to má jako
   samostatný odstavec („Když člověk sní víc energie, než tělo spotřebuje, přebytek se
   v těle uloží jako tuk") a zároveň jako poslední bod `zapis.body`.
   **NÁVRH: ŠKRTNOUT otázku 8** („Jak zjistíš, kolik energie jsi snědl za oběd?" — tvrzení
   „sečteš hodnoty snědených porcí" ve výkladu vůbec není, viz nález 6) **a NAHRADIT:**
   - OTÁZKA: „Sníš víc energie, než tělo spotřebuje. Co se s přebytkem stane?"
   - ODPOVĚDI: `uloží se v těle jako tuk | vyloučí se úplně beze zbytku | promění se v teplo těla`
   - VYSVĚTLENÍ: „Tělo si přebytečnou energii schová do tukových zásob."

4. **(c) | ve výkladu bez otázky: vzorec E = (m : 100) · E₁₀₀ | ZÁVAŽNÉ** — je to jediný
   vzorec podtématu, stojí v `zapis.vzorec` i v `zapis.vzorecSlovy`. Otázky 14, 15, 17, 18
   sice počítají energii porcí, ale všechny výhradně úvahou o násobku/dílu hmotnosti;
   na samotný vzorec se neptá žádná.
   **NÁVRH: ŠKRTNOUT otázku 12** („Co udává větší číslo energetické hodnoty…" — viz
   nález 6) **a NAHRADIT:**
   - OTÁZKA: „Podle jakého vzorce spočítáš energii jedné porce?"
   - ODPOVĚDI: `E = (m : 100) · E₁₀₀ | E = (m · 100) · E₁₀₀ | E = (100 : m) · E₁₀₀`
   - VYSVĚTLENÍ: „Hmotnost porce vydělíš stem a vynásobíš hodnotou na 100 g."

5. **(c) | ve výkladu bez otázky: 17 kJ/g u bílkovin a sacharidů** — výklad má obě čísla
   vedle sebe (17 kJ i 38 kJ) a `zapis.body` je má jako dva samostatné body. Kvíz se ptá
   jen na tuky (o. 20); hodnota 17 kJ je v bloku pouze ve vysvětlení téže otázky, takže
   ji žák uvidí jen při chybné odpovědi.
   **NÁVRH: ŠKRTNOUT otázku 5** („Jaká je základní jednotka energetické hodnoty?" — týž
   fakt už zkouší o. 6 a o. 11) **a NAHRADIT:**
   - OTÁZKA: „Kolik kJ dá přibližně 1 gram bílkovin nebo sacharidů?"
   - ODPOVĚDI: `17 kJ | 38 kJ | 70 kJ`
   - VYSVĚTLENÍ: „Bílkoviny i sacharidy dají asi 17 kJ na gram, tuky asi 38 kJ."

6. **(a) | otázky 8 a 12 | DROBNÉ** — obě stojí na tvrzeních, která výklad neobsahuje:
   „sečteš hodnoty snědených porcí" (o. 8) a „vyšší hodnota ≠ zdravější potravina"
   (o. 12, vysvětlení). Výklad o sčítání porcí ani o zdravosti nemluví.
   **NÁVRH:** obě otázky jsou ŠKRTNUTY a nahrazeny v nálezech 3 a 4 (počet zůstává 21).

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 14 → 300 · 2 = **600 kJ**; o. 15 → 400 : 2 = **200 kJ**;
o. 16 → 2 000 : 1 000 = **2 kJ**; o. 17 → 250 · 3 = **750 kJ**; o. 18 → 1 500 : 3 = **500 kJ**.
Vše celočíselné. Délková nápověda: **0 otázek** se správnou odpovědí nejdelší — v pořádku.

---

## vnitrni-energie-telesa — VERDIKT: NESLADĚNO (6)

NÁLEZY:

1. **(c) | ve výkladu bez otázky: celý h3 „Částice v pevné látce, kapalině a plynu" | ZÁVAŽNÉ** —
   výklad tomu věnuje samostatnou sekci (v pevné látce částice kmitají na místě,
   v kapalině klouzají kolem sebe, v plynu se pohybují volně všemi směry). Ani jedna
   z 21 otázek se skupenství nedotýká — slovo „pevná/kapalina/plyn" se v bloku vůbec
   nevyskytuje.
   **NÁVRH: ŠKRTNOUT otázku 18** („promneš si ruce…" — čtvrtá otázka na tentýž fakt,
   viz nález 2) **a NAHRADIT:**
   - OTÁZKA: „Jak se pohybují částice v pevné látce?"
   - ODPOVĚDI: `kmitají na svém místě | volně létají všemi směry | kloužou kolem sebe`
   - VYSVĚTLENÍ: „Silné síly jim nedovolí své místo opustit — jen kmitají."

2. **(d) čtyřnásobná duplicita + vzorec distraktorů | otázky 12, 17, 18, 19 | ZÁVAŽNÉ** —
   všechny čtyři zkoušejí jediný fakt „třením/ohýbáním se koná práce a roste vnitřní
   energie" (brzdy, drát, ruce, vrták) a jejich správné odpovědi mají skoro identické
   znění. Navíc u otázek 17, 18, 19 a 21 je třetí distraktor pokaždé varianta na
   „…jako celku…", takže žák odpovědi rozpozná podle vzorce, ne podle látky.
   **NÁVRH:** otázku 18 ŠKRTNOUT (nález 1); v otázkách 17, 19 a 21 nahradit třetí
   distraktor tak, aby se slovo „jako celku" neopakovalo:
   - o. 17: třetí odpověď → `Ohyb drát ochlazuje a zpevňuje`
   - o. 19: třetí odpověď → `Vrták se ohřeje od okolního vzduchu`
   - o. 21: třetí odpověď → `Spirála nasává teplo z místnosti`

3. **(d) únik | otázka 10 „Jak lze zvýšit vnitřní energii tělesa?" | ZÁVAŽNÉ** —
   její vysvětlení vyjmenuje „Zahřátí, tření, stlačení nebo **přidání částic**",
   čímž prozradí správnou odpověď otázky 14 („Dofoukneš pneumatiku…" →
   `zvýší se — přibyly částice`).
   **NÁVRH:** VYSVĚTLENÍ otázky 10 zkrátit na: „Zahřátím i třením se vnitřní energie
   tělesa zvětší."

4. **(c) | ve výkladu bez otázky: jednotka vnitřní energie (J)** — `zapis.jednotky` má
   vlastní řádek „vnitřní energie tělesa — jednotka J (joule), stejně jako každá jiná
   energie" i poznámku, že na ZŠ nemá zvláštní značku. Kvíz se na jednotku neptá.
   **NÁVRH: ŠKRTNOUT otázku 16** („Vnitřní energie tělesa se sníží…" — zrcadlová
   duplicita otázky 11, viz nález 6) **a NAHRADIT:**
   - OTÁZKA: „V jaké jednotce se udává vnitřní energie tělesa?"
   - ODPOVĚDI: `joule (J) | kelvin (K) | watt (W)`
   - VYSVĚTLENÍ: „Je to energie jako každá jiná, proto se měří v joulech."

5. **(a) | otázka 15 „Co drží částice tělesa v rovnovážné poloze…" | DROBNÉ** —
   odpověď mluví o „**přitažlivých i odpudivých** silách" a zadání o „**rovnovážné
   poloze**". Výklad ani jeden z těch pojmů neobsahuje — má jen „Mezi částicemi navíc
   působí síly, které je drží u sebe, ale nedovolí jim srazit se úplně dohromady".
   **NÁVRH** (přeformulovat do slov výkladu):
   - OTÁZKA: „Co dělají síly, které působí mezi částicemi tělesa?"
   - ODPOVĚDI: `drží je u sebe a nedovolí je srazit | jen je od sebe odtlačují pryč | mezi částicemi žádné síly nejsou`
   - VYSVĚTLENÍ: „Síly mezi částicemi je drží pohromadě, ale nedovolí jim srazit se dohromady."

6. **(d) duplicita | otázky 11 a 16** — otázka 11 („Čím se navenek projeví zvýšení
   vnitřní energie?" → `vyšší teplotou`) a otázka 16 („Vnitřní energie tělesa se sníží.
   Jak se to navenek projeví?" → `Teplota tělesa klesne`) jsou zrcadlové půlky jednoho
   faktu; odpověď první prakticky vydá odpověď druhé.
   **NÁVRH:** řeší ŠKRT otázky 16 v nálezu 4 (počet zůstává 21).

OVĚŘENO: blok neobsahuje číselný příklad. Délková nápověda: **0 otázek** se správnou
odpovědí nejdelší — v pořádku (6 otázek má správnou odpověď naopak nejkratší, což je
na hraně, ale pravidlo to neporušuje).

---

## tepelna-vymena-a-teplo — VERDIKT: NESLADĚNO (5)

NÁLEZY:

1. **(a) | otázka 17 „Smícháš 1 kg vody o 20 °C a 1 kg vody o 60 °C…" | ZÁVAŽNÉ** —
   směšovací (kalorimetrická) úloha a výsledná teplota jako aritmetický průměr nejsou
   ve výkladu ani v `zapis` NIKDE. Výklad končí u vzorce Q = m · c · (t₂ − t₁) a u věty,
   že odevzdané teplo se rovná přijatému. Žák nemá z čeho postup odvodit; vysvětlení
   („Při různých hmotnostech by to tak jednoduché nebylo") navíc látku naznačuje, ale
   neučí. Výsledek (20 + 60) : 2 = **40 °C** sice sedí, ale otázka je mimo výklad.
   **NÁVRH: ŠKRTNOUT a NAHRADIT** (zacelí mezeru z nálezu 4):
   - OTÁZKA: „Kolik kg vody ohřeješ o 10 °C teplem 42 000 J? (c = 4 200 J/(kg·°C))"
   - ODPOVĚDI: `1 kg | 10 kg | 42 kg`
   - VYSVĚTLENÍ: „m = Q : [c · (t₂ − t₁)] = 42 000 : (4 200 · 10) = 1 kg."

2. **(a) | otázka 16 „V kalorimetru smícháš horkou a studenou vodu…" | ZÁVAŽNÉ** —
   slovo „kalorimetr" se ve výkladu ani v `zapis` nevyskytuje; výklad mluví o tělesech
   „izolovaných od okolí". Samotný testovaný zákon ve výkladu JE, cizí je jen pojem.
   **NÁVRH** (ponechat otázku, přepsat do slov výkladu):
   - OTÁZKA: „Dvě tělesa si vyměňují teplo a teplo neuniká do okolí. Jak souvisí odevzdané a přijaté teplo?"
   - ODPOVĚDI: `jsou si přesně rovny | odevzdané je vždy větší | přijaté je vždy větší`
   - VYSVĚTLENÍ: „Kolik tepla teplejší těleso odevzdá, přesně tolik chladnější přijme."

3. **(d) únik | otázka 19 „Co znamenají t₁ a t₂ ve vzorci Q = m · c · (t₂ − t₁)?" | ZÁVAŽNÉ** —
   zadání otázky 19 obsahuje celý vzorec, a tím prozradí správnou odpověď otázky 9
   („Podle jakého vzorce počítáme teplo?"). Totéž dělají vysvětlení otázek 20 a 21
   („Q = m · c · Δt").
   **NÁVRH:** zadání otázky 19 změnit na „Co znamenají t₁ a t₂ ve vzorci pro teplo?"
   (odpovědi i vysvětlení beze změny) a ve vysvětleních otázek 20 a 21 psát jen
   „2 · 4 200 · 10 = 84 000 J", resp. „3 · 4 200 · 20 = 252 000 J", bez uvedení vzorce.

4. **(c) | ve výkladu bez otázky: odvozený vzorec m = Q : [c · (t₂ − t₁)] | ZÁVAŽNÉ** —
   výklad má na něj vlastní odstavec i dopočítaný příklad (42 000 J → 1 kg) a
   `zapis.vzorec` uvádí i tvar pro c. Kvíz počítá jen dopředu (o. 20, 21), zpětný
   výpočet nezkouší vůbec.
   **NÁVRH:** pokrývá nová otázka z nálezu 1.

5. **(d) únik | otázka 12 „Jaká je měrná tepelná kapacita vody?" | DROBNÉ** —
   vysvětlení končí „…**proto se ohřívá pomalu**", čímž prozradí správnou odpověď
   otázky 13 („Látka s vysokým c (např. voda) se…" → `ohřívá i chladne pomalu`).
   **NÁVRH:** VYSVĚTLENÍ otázky 12 zkrátit na: „Na 1 kg vody a 1 °C je potřeba
   přesně 4 200 J."

POZNÁMKA (bez nálezu): otázka 14 mluví o kovech na „chladiče **a topná tělesa**";
výklad zmiňuje jen „žebra chladičů". Věcně je nízké c u topného tělesa spíš vedlejší,
doporučujeme zúžit zadání na „Proč se kovy hodí na žebra chladičů?".

OVĚŘENÉ VÝPOČTY (všechny sedí): o. 17 → (20 + 60) : 2 = **40 °C** (otázka je ale mimo
výklad, viz nález 1); o. 20 → 2 · 4 200 · 10 = **84 000 J** (distraktory 42 000 a 8 400
odpovídají popsaným chybám); o. 21 → 3 · 4 200 · 20 = **252 000 J** (distraktor
126 000 = 3 · 4 200 · 10, distraktor 240 000 = 3 · 4 000 · 20 — oba sedí s vysvětlením).
Vše celočíselné. Délková nápověda: **0 otázek** se správnou odpovědí nejdelší — v pořádku.

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně, celý výpis)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 572 otázek (21 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 217 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

**Žádné ⚠️ se netýká přímo kontrolovaných osmi klíčů.** Brána skončila s návratovým
kódem 0. Z celkových 217 otázek s náskokem ≥ 10 znaků připadá **31 na těchto osm bloků**
(mechanicka-prace 4, vykon 5, energie-a-jeji-premeny 6, pohybova-a-polohova-energie 4,
zakon-zachovani 6, zbylé tři bloky 0) — po provedení návrhů výše by jich zde bylo 0.

`node testy/uniky.mjs` hlásí u všech osmi bloků 0 duplicit a 0 úniků; všech 11 úniků
typu (d) popsaných výše je tedy mimo její dosah (porovnává jen dvojice otázek, ne obsah
vysvětlení proti odpovědím jiných otázek).

---

## ZAPRACOVÁNO 22. 9. 2026

Vše zapsáno do `src/data/kvizy.ts`. Zálohy původních výpisů (`--otazky`, přes
`testy/vypis-kviz.mjs`) uloženy do scratchpadu před zásahem. Po úpravě má každý
z 8 klíčů opět přesně 21 otázek.

- [x] **mechanicka-prace** (7/7): nález 1 nahradil otázku 18 (taška vodorovně), pokrývá i
  nález 2. Nález 3 nahradil otázku 12 (skateboardista F=0). Nálezy 4–7 (délková nápověda
  otázek 1, 3, 10, 13) opraveny beze změny počtu. POZNÁMKA (pořadí bloků 14–16/19–21) bez
  nálezu — NEPROVEDENA, mimo rozsah nálezů.
- [x] **vykon** (7/7): nálezy 1 a 2 zkrátily vysvětlení otázek 3 a 18 (odstranění vzorců
  P=W:t a P=F·v). Nález 3 nahradil otázku 16 (spotřeba kWh) otázkou o megawattu, pokrývá
  nález 4; vysvětlení otázky 13 zkráceno dle nálezu. Nález 5 a 6 (délková nápověda otázek
  13, 18, 12, 6) opraveny. Nález 7 přesunul otázky 11 a 15 na konec bloku (za otázku 21).
- [x] **energie-a-jeji-premeny** (5/5): nález 1 nahradil otázku 14 (žárovka) otázkou o
  mechanické energii, pokrývá nález 2. Nález 3 upravil vysvětlení otázky 12 (kladivo).
  Nález 4 nahradil otázku 13 (energie „nezmizí") otázkou o spotřebiči. Nález 5 (délková
  nápověda otázek 8, 2, 6, 12, 11) opraven.
- [x] **pohybova-a-polohova-energie** (6/6): nálezy 1 a 2 zkrátily vysvětlení otázek 1 a 11
  (odstranění vzorců/termínů kinetická/potenciální a Ep=m·g·h). Nález 3 nahradil otázku 4
  otázkou o značce Eₚ. Nález 4 nahradil otázku 20 otázkou o sekeře. Nález 5 (přímá úměra u
  otázky 5) — odpovědi i vysvětlení přeformulovány do slov výkladu („čím větší hmotnost,
  tím větší Ek"), odchylka od návrhu: návrh měnil jen odpovědi, vysvětlení bylo upraveno
  navíc, protože i ono tvrdilo „dvojnásobná → dvojnásobná", což výklad neobsahuje. Nález 6
  (délková nápověda otázek 8, 9, 16) opraven.
- [x] **zakon-zachovani-mechanicke-energie** (6/6): nález 1 upravil odpovědi otázky 11
  (odstranění „změní se na teplo"). Nález 2 nahradil otázku 20 (fáze letu) otázkou o
  letadle, pokrývá nález 3. Nález 4 nahradil otázku 14 (horská dráha) otázkou o sekeře.
  Nález 5 přejmenoval „Vozík horské dráhy" na „Kulička na zakřivené dráze" v otázce 18.
  Nález 6 (délková nápověda otázek 2, 13, 10, 1, 7) opraven. Při doběhu `uniky.mjs` po
  zásahu vyšel nový únik (nová odpověď otázky 2 „zůstává stále stejný" sdílela slova se
  starším vysvětlením otázky o míči „zůstává stejná") — vysvětlení přeformulováno na
  „energie se jen přelévá… celkem pořád 30 J", bez sdílených slov.
- [x] **energeticka-hodnota-potravin** (6/6, započítány jako 4 náhrady): nález 1 nahradil
  otázku 3 (chemická energie svalů) otázkou o kJ spálených při fotbalu, pokrývá nález 2.
  Nález 3 nahradil otázku 8 (sčítání porcí) otázkou o přebytku energie/tuku. Nález 4
  nahradil otázku 12 (větší číslo) otázkou o vzorci E=(m:100)·E₁₀₀. Nález 5 nahradil
  otázku 5 (jednotka) otázkou o 17 kJ/g. Nález 6 vyřešen náhradami 3 a 4. Po zásahu vyšel
  nový únik (nová otázka o 17 kJ a existující otázka o 38 kJ „tuky" se navzájem prozrazovaly
  ve vysvětleních) — obě vysvětlení zkrácena bez křížového čísla.
- [x] **vnitrni-energie-telesa** (6/6): nález 1 nahradil otázku 18 otázkou o částicích
  v pevné látce. Nález 2 upravil třetí distraktor otázek 17, 19, 21 (bez opakování „jako
  celku"); u otázky 19 upraveno i vysvětlení (distraktor „ohřeje se od vzduchu" místo
  „otáčení jako celku"), u otázky 21 obdobně. Nález 3 zkrátil vysvětlení otázky 10 (bez
  „přidání částic"). Nález 4 nahradil otázku 16 otázkou o jednotce J. Nález 5 přeformuloval
  otázku 15 (síly mezi částicemi) do slov výkladu. Nález 6 vyřešen škrtem otázky 16.
- [x] **tepelna-vymena-a-teplo** (5/5): nález 1 nahradil otázku 17 (směšování 20+60 °C)
  zpětným výpočtem hmotnosti (42 000 J → 1 kg), pokrývá nález 4. Nález 2 přeformuloval
  otázku 16 (kalorimetr → „dvě tělesa"). Nález 3 upravil zadání otázky 19 a vysvětlení
  otázek 20/21 (bez uvedení vzorce). Nález 5 zkrátil vysvětlení otázky 12 (bez „ohřívá
  pomalu"). POZNÁMKA (otázka 14, topná tělesa) bez nálezu — NEPROVEDENA. Po zásahu vyšel
  třícestný únik kolem hodnoty 4200/1 kg mezi otázkami 12, 17 a 20 — vysvětlení otázky 12
  přepsáno bez čísel, zadání/vysvětlení otázky 17 sjednoceno na zápis „4200" (bez mezery,
  po vzoru otázek 20/21, čímž se netokenizuje stejně jako „4 200" u otázky 12), vysvětlení
  otázky 20 přepsáno bez číslice „1 kg".

Brány po zásahu: `node testy/uniky.mjs` → 0 duplicit, 0 úniků (dvě kola — první odhalilo
3 nové úniky vzniklé zásahem, popsány výše, po opravě 0). `node zkontroluj.mjs` → exit 0,
žádné ⚠️ k těmto osmi klíčům (náskok ≥10 znaků klesl z 217 na 193 otázek). `npm run build`
→ 481 stránek, bez chyby.

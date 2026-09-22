# 2. kolo nezávislé kontroly kvízů — F8 Tepelné motory + Teplo a změny skupenství

Kontrola 22. 9. 2026 po zapracování 1. kola. Čteno: `node testy/vypis-kviz.mjs <klic>`
(plné znění s odpověďmi i vysvětleními) proti `node podtema.mjs . get fyzika/8-rocnik/<celek>/<klic>`.
Do `kvizy.ts` ani `temata.ts` nic zapsáno nebylo.

Kotvy 2. kola:
- všech 9 bloků má přesně **21 otázek** (ověřeno skriptem nad daty, ne nad textem souboru),
- **žádná otázka v devíti blocích nemá náskok správné odpovědi ≥ 10 znaků** (přepočítáno
  ze všech tří odpovědí; nejhorší je kondenzace č. 5 = +8 a skupenské změny č. 1/č. 4 = +6),
- všechny výpočty přepočítány `node -e` a všechny vycházejí celočíselně:
  996 : 332 = 3 · 332 · 5 = 1 660 · 2 260 · 3 = 6 780 · 9 040 : 2 260 = 4 · 2 260 · 2 = 4 520 ·
  25 000 · 0,20 = 5 000 (zbytek 20 000) · 1 000 − 150 = 850 · 2 260 : 420 = 5,38 („víc než pětkrát") ·
  2 260 : (4 200 · 80) = 6,7 g („asi 7 gramů"),
- `node testy/uniky.mjs` → 0 duplicit, 0 úniků (brána uvnitř bloku nevidí nic z níže uvedeného),
- `node testy/uniky-krizove.mjs` → mezi bloky **našel novou duplicitu po 1. kole** (tani č. 13), viz níže.

---

## tepelny-motor-parni-stroj — VERDIKT: SLADĚNO
NEVYŘEŠENÉ: žádné (1: č. 12 obrácena a distraktory srovnány; 2: č. 21 = výpočet 1 000 − 150 = 850 J;
3: blok „Pro zvídavé" pokryt tou otázkou; 4: č. 15 = „Co v parním stroji tlačí na píst"; 5: všechny
náskoky pod práh — č. 13 +1, č. 3 −7, č. 8 −7, č. 11 0, č. 7 −4)
NOVÉ: žádné
POZN. (mimo rozsah 1. kola, drobnost do stavu): č. 16 „Kdo sestrojil tlakovou nádobu zvanou
**Papinův** hrnec? → **Denis Papin**" má odpověď doslova v zadání. Šlo by na „Kdo vynalezl tlakový
hrnec, v němž pára zvedala píst?" (odpovědi beze změny).

---

## spalovaci-motory — VERDIKT: SLADĚNO
NEVYŘEŠENÉ: žádné (1 + 6: vysvětlení č. 15 nese startér z autobaterie i 2000 °C; 2: nová č. 19 na filtr
pevných částic; 3: vysvětlení č. 12 už zemní plyn nezmiňuje; 4: „Nicolaus Otto, 1876" a Watt zmizel
z vysvětlení; 5: triviální otázka na píst zrušena, č. 21 = 25 000 · 20 % = 5 000 kJ)
NOVÉ: žádné
POZN. (drobnost): v č. 20 zůstal distraktor „**James Watt, 1784**" — dvojice Watt+1784 je správná
odpověď č. 5 v sousedním bloku *tepelny-motor-parni-stroj*. Stačilo by „James Watt, 1712" nebo
„Thomas Newcomen, 1712".

---

## teplo-a-premeny-skupenstvi — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (1: vysvětlení sublimace už ohon komety neprozrazuje; 2: z vysvětlení č. 13 zmizel
var v celém objemu; 3: sublimační trojice je na koncích 19–21; 4: ano/ne otázka na tlak nahrazena)
NOVÉ:
1. **otázka č. 14** „Jak se nazývá přeměna plynu na kapalinu?" | vysvětlení končí větou
   „…**sublimace je přeměna pevné látky rovnou na plyn**", což je doslova odpověď č. 19 („Jak se
   nazývá změna pevné látky rovnou na plyn? → **sublimace**"). Před opravou stála sublimace na
   pozici 11, tedy PŘED č. 15 — přesunem nadstavby na konec (nález 3 z 1. kola) se z neškodného
   zpětného odkazu stal dopředný únik. Brána `uniky.mjs` ho nevidí (mez 4 — význam bez shody hodnot).
   NÁVRH vysvětlení č. 14: „Odebíráním tepla se částice plynu zpomalí, spojí se a vznikne kapalina —
   tomu říkáme kapalnění."
POZN. (starší, 1. kolo neřešilo): vysvětlení č. 13 „…**Kapalnění je opačný děj**, tuhnutí se týká pevné
látky" prozrazuje odpověď hned následující č. 14. Doporučeno zkrátit na: „Kapalina se dodáváním tepla
mění na plyn — tomu říkáme vypařování."

---

## tani — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (1: duplicita 6×16 pryč, č. 21 = 996 : 332 = 3 kg; 2: otázka na tlak pod bruslí je
jen jedna a vysvětlení č. 8 zkráceno; 3: cín nahrazen; 4: č. 20 na význam m; 5: náskoky pod práh —
č. 7 −3, č. 8 −5, č. 4 −7, č. 1 −1, č. 5 −7; 6: distraktory č. 14 věrohodné)
NOVÉ:
1. **otázka č. 13** „Kolik joulů je 1 kilojoule?" | **doslovná mezibloková duplicita** — táž otázka
   s touž odpovědí už je v 8. ročníku dvakrát: `mechanicka-prace-a-vykon/mechanicka-prace`
   („Kolik joulů je 1 kilojoule (kJ)? → 1 000 J") a `energie/energeticka-hodnota-potravin`
   („Kolik joulů je přibližně 1 kilojoule? → 1 000 J"). Doloženo `node testy/uniky-krizove.mjs`
   → „shodná hodnota 1 000 j | krytí tématu 100 %" (dvě dvojice). Nová otázka z 1. kola tedy do
   bloku přinesla otázku, kterou žák zná z jiných dvou bloků téhož ročníku.
   NÁVRH — ŠKRTNOUT a NAHRADIT (pokryje odvozený tvar vzorce ze ZAPISu, který otázku nemá):
   „Jak ze vzorce Lt = lt · m dopočítáme měrné skupenské teplo tání?" → **lt = Lt : m** | lt = Lt · m |
   lt = m : Lt. Vysvětlení: „Součin se rozděluje dělením — teplo vydělíme hmotností." (délky 12/12/12)
2. **otázka č. 16** „Co udává měrné skupenské teplo tání?" | vysvětlení „Značíme ho lt a **měříme
   v joulech na kilogram**" prozrazuje odpověď č. 18 („Jaká je jednotka měrného skupenského tepla
   tání? → **J/kg**"). Otázka č. 16 je nová z 1. kola, jde tedy o únik zanesený opravou; brána ho
   nechytí, protože jednotka je napsaná slovy (známá mez měřidla č. 1 a 2).
   NÁVRH vysvětlení č. 16: „Celé teplo značíme velkým Lt, měrné teplo malým lt."
3. **otázka č. 20** „Co znamená **ve vzorci Lt = lt · m** písmeno m?" | zadání ukazuje celý vzorec,
   tedy správnou odpověď č. 10 („Podle jakého vzorce počítáme skupenské teplo tání? → **Lt = lt · m**").
   Táž vada v menším i u nové č. 13, jejíž vysvětlení uvádí „332 kJ/kg" = odpověď č. 11.
   NÁVRH znění č. 20: „Co znamená ve vzorci pro skupenské teplo tání písmeno m?" (odpovědi beze změny);
   vada u č. 13 odpadne s nálezem 1.
POZN. (drobnost): č. 9 „Co je skupenské teplo tání? → teplo potřebné, aby látka roztála" a nová č. 16
„Co udává měrné skupenské teplo tání? → teplo na roztátí 1 kg látky" jsou blízký pár — liší se jen
slovy „1 kg". Obsahově je rozdíl L × l správný, ale odpovědi by měly rozdíl říct výslovně.

---

## tuhnuti — VERDIKT: SLADĚNO
NEVYŘEŠENÉ: žádné (1: vysvětlení č. 11 uvádí 90 cm a 140 cm přesně podle výkladu; 2: −21 °C už je jen
u č. 19; 3: nová č. 21 = 332 · 5 = 1 660 kJ; 4: zákon o shodě měrných tepel je v druhé větě téhož
vysvětlení — přijatá odchylka 1. kola)
NOVÉ: žádné
Ověřeno navíc: všechna čísla bloku mají oporu ve výkladu (0 °C, 90/140 cm, −21 °C, šestnáctina,
80 °C podchlazení, 332 kJ/kg, distraktor 664 kJ = obrácený příklad z výkladu); náskoky pod práh.

---

## vyparovani — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ:
- **nález 2 (jen částečně)** — únik č. 6 ↔ č. 16 se opravou přesunul z odpovědi do vysvětlení:
  č. 6 má dnes vysvětlení „Olej je **málo těkavý, proto se z povrchu ztrácí pomalu**", což je přesně
  odpověď č. 16 („Co znamená, že je kapalina těkavá? → **rychle se vypařuje**"), a č. 6 stojí před ní.
  Slovo „těkavý" mělo z otázky č. 6 zmizet úplně.
NOVÉ:
1. **otázka č. 6** „Která z uvedených kapalin se vypařuje nejpomaleji? → **olej**" | **olej se
   ve výkladu vůbec nevyskytuje** — výklad jmenuje jen těkavé látky (benzín, aceton, líh) a dvojici
   „líh se vypařuje rychleji než voda". Správná odpověď tedy nemá oporu v podkladu stránky; žák ji
   z výkladu nemůže odvodit. (Vzniklo odchylkou 3 ze zapracování.)
   NÁVRH — přeformulovat na fakt, který ve výkladu je, a bez slova prozrazujícího č. 16:
   „Která z uvedených kapalin patří mezi těkavé látky?" → **aceton** | voda | mléko.
   Vysvětlení: „Mezi těkavé látky patří benzín, aceton a líh — proto se s nimi zachází opatrně."
   (délky 6/4/6; řeší zároveň nevyřešený nález 2)
Ověřeno: nálezy 1 a 3 z 1. kola vyřešeny (č. 20 zkouší druh kapaliny a má oporu ve výkladu,
č. 5 nahrazena podlahou z výkladu); žádný náskok ≥ 10 znaků.

---

## var — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ:
- **nález 3 (část a)** — u přepsané č. 20 („Co se děje s tím, co při varu vznikne uvnitř kapaliny?")
  zůstalo vysvětlení „**Je to lehčí než okolní kapalina**, a proto to stoupá vzhůru…". Přesně tohle
  1. kolo vytklo: výklad o nižší hustotě páry nic neříká, píše jen „Stoupají k hladině a pára z nich
  uniká do vzduchu. Právě proto vroucí voda v hrnci probublává." Tvrzení navíc zůstalo v datech.
  Navíc je znění otázky pro osmáka mlhavé („s tím, co … vznikne") — to je ale přijatá odchylka 4.
  NÁVRH vysvětlení č. 20: „Stoupá to k hladině a uniká do vzduchu — právě proto vroucí voda v hrnci
  probublává."
NOVÉ: žádné
Ověřeno: 1: č. 1 přeformulována, č. 2 už neprozrazuje; 2: vysvětlení č. 6 bez hor; 4: distraktory
č. 11 jsou celá čísla (2 260 | 332 | 100 kJ/kg); 5: č. 17 = destilace ropy na benzín a petrolej,
300 kPa doplněno do vysvětlení č. 15; č. 18: 2 260 · 2 = 4 520 kJ ✓.

---

## kondenzace — VERDIKT: SLADĚNO
NEVYŘEŠENÉ: žádné (1: č. 20 = obrácený výpočet 9 040 : 2 260 = 4 kg; 2: č. 19 mluví o měrném
skupenském teple lv, 2 260 · 3 = 6 780 kJ; 3: nová č. 7 na topení párou v radiátorech továren a lodí,
nejobecnější otázka na orosení zrušena; 4: vysvětlení č. 13 už nejmenuje vypařování)
NOVÉ: žádné
POZN. (drobnost): zadání nové č. 20 začíná „**Radiátor** uvolnil kondenzací páry…", což zpětně
napovídá odpověď č. 7 („k topení v radiátorech"). Směr je zpětný a téma (továrny, lodě) chybí,
proto jen poznámka; případná úprava „Pára v topení uvolnila 9 040 kJ tepla…".

---

## skupenske-zmeny-vody-v-prirode — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (1: vysvětlení č. 10 už mm neprozrazuje; 2: č. 5 mluví o prachu a zrnkách soli
podle výkladu; 3: č. 13 pokrývá tání a návrat vody do moří; 4: vysvětlení č. 8 bez optiky;
5: č. 9 bez prachu)
NOVÉ:
1. **otázka č. 9** „Jak vznikají sněhové vločky a ledové krystaly v mracích? → **desublimací páry**" |
   po opravě je správná odpověď skoro totožná s odpovědí č. 4 („Jak vzniká jinovatka? →
   **desublimací páry** při teplotě pod 0 °C"), která stojí dřív. Obě otázky tak zkoušejí totéž slovo
   a č. 4 odpověď č. 9 dopředu prozrazuje (před opravou se lišily: „desublimací na prachu").
   NÁVRH č. 9: „Jak vznikají vysoko v mracích sněhové vločky?" → **pára se mění rovnou na led** |
   kapky deště cestou zmrznou | kroupy se za letu rozpadnou. Vysvětlení: „Vysoko v mracích je taková
   zima, že pára přeskočí kapalné skupenství." (délky 25/26/26)
POZN.: cirrus zůstává nepokrytý (nadstavba, 1. kolo to přijalo).

---

## Co brány nevidí (pro příště)

`testy/uniky.mjs` skončila na těchto devíti blocích s 0 nálezy, přestože výše jsou tři úniky
(teplo-a-premeny č. 14 → č. 19, tani č. 16 → č. 18, tani č. 20 → č. 10) a jedna mezibloková
duplicita. Důvody jsou v její vlastní hlavičce: mez 4 (význam bez shody hodnot), mez 1 a 2
(jednotka napsaná slovy — „v joulech na kilogram" × „J/kg") a mez 5 (porovnává jen uvnitř bloku).
Mezibloková duplicita tani č. 13 byla naopak odhalena hned — `node testy/uniky-krizove.mjs`
ji hlásí jako „krytí tématu 100 %". Doporučení: po každém zapracování kvízů pouštět i
`uniky-krizove.mjs`, ne jen `uniky.mjs` a `zkontroluj.mjs`.

---

## ZAPRACOVÁNO 22. 9. 2026

- [x] **teplo-a-premeny-skupenstvi č. 14** — vysvětlení přepsáno bez zmínky sublimace:
  „Odebíráním tepla se částice plynu zpomalí, spojí se a vznikne kapalina — tomu říkáme
  kapalnění." (POZN. o č. 13 mimo počet nálezů, ponecháno jako drobnost — beze změny.)
- [x] **tani č. 13** — otázka na doslovnou mezibloky duplicitu 1 000 J nahrazena
  odvozeným vzorcem: „Jak ze vzorce Lt = lt · m dopočítáme měrné skupenské teplo tání?"
  → **lt = Lt : m** | lt = Lt · m | lt = m : Lt. Ověřeno v podkladu (`m = Lt : lt`, tvar
  `lt = Lt : m` je ve výkladu doslova). `uniky-krizove.mjs` už duplicitu nehlásí.
- [x] **tani č. 16** — vysvětlení už neuvádí jednotku slovy: „Celé teplo značíme velkým
  Lt, měrné teplo malým lt."
- [x] **tani č. 20** — zadání zobecněno na „…ve vzorci pro skupenské teplo tání písmeno
  m?" (vzorec už neukazuje). Vysvětlení přeformulováno na „Písmeno m je hmotnost — čím
  je vyšší, tím víc tepla vzorec vypočítá." (původní znění po úpravě zadání nově sdílelo
  nosné slovo se sousední otázkou č. 9 a `uniky.mjs` hlásil nový únik — doladěno, teď 0).
- [x] **vyparovani č. 6 (nález 2 + nové)** — přeformulováno na fakt z výkladu: „Která
  z uvedených kapalin patří mezi těkavé látky?" → **aceton** | voda | mléko. Vysvětlení:
  „Mezi těkavé látky patří benzín, aceton a líh — proto se s nimi zachází opatrně."
  Ověřeno v podkladu (`node podtema.mjs . get .../vyparovani`): benzín, aceton, líh jsou
  těkavé látky doslova. Řeší zároveň nevyřešený nález 2 (slovo „těkavý" u č. 6 zmizelo).
- [x] **var č. 20 (nález 3 část a)** — vysvětlení přepsáno bez tvrzení o hustotě páry:
  „Stoupá to k hladině a uniká do vzduchu — právě proto vroucí voda v hrnci probublává."
- [x] **skupenske-zmeny-vody-v-prirode č. 9** — přeformulováno mimo souběh s č. 4:
  „Jak vznikají vysoko v mracích sněhové vločky?" → **pára se mění rovnou na led** |
  kapky deště cestou zmrznou | kroupy se za letu rozpadnou. Vysvětlení: „Vysoko v mracích
  je taková zima, že pára přeskočí kapalné skupenství."

Kontroly po zápisu: `node testy/vypis-kviz.mjs` → všech 5 upravených bloků 21 otázek;
`node testy/uniky.mjs` → 0 duplicit, 0 úniků; `node testy/uniky-krizove.mjs` → mezibloková
duplicita tani č. 13 zmizela; `node zkontroluj.mjs` → 0 nálezů; `npm run build` → 481
stránek, bez chyby. Náskoky všech upravených/nových otázek přepočítány `node -e`, žádný
≥ 10 znaků.

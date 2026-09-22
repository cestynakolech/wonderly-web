# Sladění kvízů s novými výklady — svetlo-a-jeho-sireni (F7), 22. 9. 2026

Nezávislá kontrola. Data čtena přes `testy/data.mjs` (skutečná data webu, ne regex nad textem).
Všechny čtyři bloky mají **21 otázek** (počet sedí). Náskok počítán stejným vzorcem jako
`zkontroluj.mjs` ř. 197–200: `délka(odpovedi[0]) − max(délka distraktorů)`, problém = striktně
nejdelší A náskok ≥ 10.

**Kotva k délkové nápovědě:** na celém webu je 64 otázek s náskokem ≥ 10 (3134 otázek ve 166 blocích).
**27 z nich, tj. 42 %, je v těchto třech nových blocích** — jsou to tři nejhorší bloky webu:
`svetlo-jeho-zdroje` 10, `stin-faze-mesice` 9, `lom-svetla` 8 (čtvrtý web. blok `opticka-cocka` má 7).
Přepočítáno `node` nad `d.kvizy`, globální součet 64 se shoduje s výpisem `zkontroluj.mjs`.

**Přepočítaná fyzika výkladů (všechna čísla sedí):** 300 000 / 1,5 = 200 000 km/s ✓ ·
300 000 / 1,33 = 225 564 ≈ 225 000 km/s ✓ · diamant n = 2,42 → 123 967 ≈ 125 000 km/s ✓ ·
150 000 000 / 300 000 = 500 s = 8 min 20 s ✓ · 90 − 40 = 50° ✓ · 300 000 / 40 075 = 7,5× kolem Země ✓ ·
525 °C = Draperův bod ✓ · povrch Slunce 5 500 °C ✓ · lunace 29,5 dne ✓ · Polárka ≈ 433 ly ✓.
Věcná chyba ve fyzice výkladů NENALEZENA — nálezy níž jsou o sladění kvízu s výkladem.

Všechny navržené trojice odpovědí jsem přepočítal skriptem: **žádný návrh nemá správnou
odpověď nejdelší** (jediná výjimka Z6 opravena úpravou distraktoru, viz nález).

---

## svetlo-jeho-zdroje — VERDIKT: NESLADĚNO (12)

NÁLEZY:

**1. (c) | h3 „Druhy zdrojů podle vzniku" — celá kapitola bez jediné otázky.**
Bez otázky zůstává 5 bodů ZAPIS: „rozžhavená tělesa: svítí teplem", „nad 525 °C: červená →
oranžová → žlutá → bílá → modrobílá", „chemické zdroje (bioluminiscence)", „elektrický výboj
v plynu: blesk, zářivka", „fosforeskující a elektronické zdroje". Ani teplota povrchu Slunce
5 500 °C není v žádné otázce ani odpovědi.
**NÁVRH — ŠKRTNOUT otázku č. 5 („Světluška je zdroj…" — duplicita s č. 3 a 4) a NAHRADIT:**
- Otázka: „Jak vzniká světlo světlušky?"
- „chemickou reakcí" / „zahřátím na 5 500 °C" / „elektrickým výbojem"
- Vysvětlení: „Chemická reakce v těle živočicha — bioluminiscence."
**NÁVRH — ŠKRTNOUT otázku č. 20 („Ve tmě (bez jakéhokoli zdroje) předměty…") a NAHRADIT:**
- Otázka: „Jakou barvou začne svítit těleso zahřáté nad 525 °C?"
- „červenou" / „modrobílou" / „zelenou"
- Vysvětlení: „Nad 525 °C nejdřív červeně; teprve při dalším zahřívání přes oranžovou a žlutou k bílé."

**2. (c) | h3 „Neviditelné záření: infračervené a ultrafialové" — celá kapitola bez otázky.**
ZAPIS body „infračervené (IR): za červenou, cítíme jako teplo" a „ultrafialové (UV): za fialovou,
ve velkém škodí" nemají v bloku žádnou otázku.
**NÁVRH — ŠKRTNOUT otázku č. 16 („Čiré okenní sklo je prostředí…" — viz nález 11) a NAHRADIT:**
- Otázka: „Které záření leží hned za červenou barvou a vnímáme ho jako teplo?"
- „infračervené" / „ultrafialové" / „rentgenové"
- Vysvětlení: „IR záření snímají termokamery, používají ho dálkové ovladače; vidí ho hadi."
**NÁVRH — ŠKRTNOUT otázku č. 17 („Matné sklo v koupelně je prostředí…" — viz nález 11) a NAHRADIT:**
- Otázka: „Které záření leží za fialovou barvou a ve větším množství škodí kůži?"
- „ultrafialové" / „infračervené" / „radiové"
- Vysvětlení: „UV je v malém množství zdravé (opalování), ve větším škodí kůži i očím."

**3. (c) | ZAPIS bod „optika: nauka o světle a jeho vnímání" — bez otázky.**
Slovo „optika" není v žádné z 21 otázek ani odpovědí.
**NÁVRH — ŠKRTNOUT otázku č. 10 („Existuje něco rychlejšího než světlo ve vakuu?" — náskok 28
znaků, viz nález 10) a NAHRADIT:**
- Otázka: „Jak se jmenuje nauka o světle a jeho vnímání?"
- „optika" / „akustika" / „mechanika"
- Vysvětlení: „Optika — nauka o světle, jeho šíření a vnímání."

**4. (c) | ZAPIS body „homogenní prostředí: stejné vlastnosti v celém objemu" a „atmosféra není
homogenní" — bez otázky.** Otázka č. 7 sice slovo „stejnorodém" použije v zadání, ale význam
pojmu nezkouší.
**NÁVRH — ŠKRTNOUT otázku č. 21 („Plamen svíčky je…" — duplicita s č. 1 a 3) a NAHRADIT:**
- Otázka: „Co je stejnorodé (homogenní) prostředí?"
- „má všude stejné vlastnosti" / „mění svou hustotu podle výšky" / „vůbec nepropouští světlo"
- Vysvětlení: „Homogenní je třeba čirá voda nebo sklo; atmosféra homogenní není."

**5. (c) | ZAPIS bod „světelný rok (ly): Polárka je 433 světelných let" — bez otázky.**
**NÁVRH — ŠKRTNOUT otázku č. 2 („Proč vidíme Měsíc, když sám nesvítí?" — tatáž látka jako
č. 19) a NAHRADIT:**
- Otázka: „Za jak dlouho k nám doletí světlo z Polárky?"
- „za 433 let" / „za 433 dní" / „za 433 sekund"
- Vysvětlení: „Vzdálenost udáváme ve světelných letech — Polárka je 433 světelných let daleko."

**6. (c) | ZAPIS bod „Slunce–Země = 150 000 000 km = 1 AU, světlo 500 s" — číslo 500 s ani
zkratka AU nejsou nikde v otázkách ani odpovědích** (otázka 18 jen v zadání zmíní „asi 8 minut").
**NÁVRH — PŘEPSAT otázku č. 18 („Sluneční světlo k nám letí asi 8 minut. Co z toho plyne?"):**
- Otázka: „Jak dlouho letí světlo ze Slunce k Zemi (150 000 000 km)?"
- „500 sekund" / „50 sekund" / „5 000 sekund"
- Vysvětlení: „t = s : v = 150 000 000 : 300 000 = 500 s, tedy 8 minut a 20 sekund."
(Zbývající mezera: zkratka AU zůstane nepokrytá — bez rozšíření bloku nad 21 otázek ji nelze doplnit.)

**7. (c) | ZAPIS bod „bodové (rozbíhavé), plošné (rovnoběžné)" — zkoušeny jen NÁZVY, ne chování
paprsků.** Otázka č. 6 se ptá jen na dělení; slovo „rozbíhavě"/„rovnoběžné" v bloku není.
**NÁVRH — PŘEPSAT otázku č. 6:**
- Otázka: „Jak se šíří paprsky z bodového zdroje?"
- „rozbíhavě" / „rovnoběžně" / „sbíhavě"
- Vysvětlení: „Z bodového zdroje se rozbíhají; z plošného jsou rovnoběžné."
(Pozn.: původní znění č. 6 „Jak dělíme zdroje podle velikosti? → bodové a plošné" je navíc
o 2 znaky nejdelší; pokud zůstane, změnit distraktor „velké a malé" → „velké a malé zdroje".)

**8. (b) | otázka č. 20 „Ve tmě (bez jakéhokoli zdroje) předměty…" — ve výkladu není.**
Výklad nic o vidění ve tmě neříká. Řeší nález 1 (škrt + náhrada).

**9. (b) | otázka č. 9, vysvětlení „…sedmkrát kolem Země za sekundu!" — ve výkladu není.**
Údaj je početně správný (300 000 / 40 075 = 7,5), ale zdroj ho neuvádí a výklad ho nemá.
**NÁVRH — nové vysvětlení č. 9:** „Ve vakuu c = 300 000 km/s = 300 000 000 m/s — nejvyšší
rychlost ve vesmíru."

**10. (d) | DÉLKOVÁ NÁPOVĚDA u 10 z 21 otázek (48 %) — nejhorší blok celého webu.**
Postižené otázky a náskoky: č. 1 (+13), 7 (+14), 8 (+36), 10 (+28), 11 (+16), 13 (+27),
14 (+39), 15 (+13), 18 (+19), 19 (+25).
**NÁVRH — nová znění odpovědí** (č. 10 a 18 řeší nálezy 3 a 6):
- č. 1 „Co je zdroj světla?": „těleso, které světlo vyrábí" / „každé lesklé těleso v pokoji" / „jen Slunce a hvězdy"
- č. 7 „Jak se světlo šíří ve stejnorodém prostředí?": „přímočaře" / „v kruzích" / „klikatě"
- č. 8 „Co je světelný paprsek?": „přímka se šipkou" / „tenký proud vody" / „zvláštní druh stínu"
- č. 11 „Jak rychle se šíří světlo ve skle?": „asi 200 000 km/s" / „asi 300 000 km/s" / „asi 400 000 km/s"
- č. 13 „Jaké je průhledné optické prostředí?": „prochází bez rozptylu" / „pohlcuje všechno světlo" / „světlo jen odráží zpět"
- č. 14 „Jaké je průsvitné prostředí?": „prochází, ale rozptyluje se" / „nepropustí vůbec žádné světlo" / „zrcadlí okolí jako zrcadlo"
- č. 15 „Jaké je neprůhledné prostředí?": „pohlcuje nebo odráží" / „propouští všechno světlo" / „zpomaluje světlo o polovinu"
- č. 19 „Proč vidíme neprůhledné předměty…?": „odrážejí světlo do očí" / „samy vyzařují vlastní teplo" / „vůbec je nevidíme"

**11. (d) | ÚNIK: odpovědi č. 13 a 14 obsahují přímo odpovědi otázek 16 a 17.**
DŮKAZ: č. 13 správná = „světlo jím prochází bez rozptylu **(čiré sklo)**" → č. 16 „**Čiré okenní
sklo** je prostředí… průhledné". Totéž č. 14 „**(matné sklo)**" → č. 17 „**Matné sklo** v koupelně…
průsvitné". Vysvětlení č. 14 („Přes matné sklo prochází světlo, ale obraz je rozmazaný") únik zdvojuje.
**NÁVRH:** řeší nález 2 (škrt č. 16 a 17) + nález 10 (z odpovědí 13 a 14 zmizí příklady v závorce).

**12. (d) | ÚNIK: vysvětlení č. 11 prozradí odpověď č. 12.**
DŮKAZ: vysv. č. 11 = „V látkách se světlo zpomaluje: voda ~225 000, sklo ~200 000, **diamant
~125 000 km/s**" → č. 12 „Ve kterém prostředí je světlo nejpomalejší? → **v diamantu**".
**NÁVRH — nové vysvětlení č. 11:** „Ve skle je světlo pomalejší než ve vakuu — v každém
prostředí kromě vakua se zpomalí."

---

## odraz-svetla — VERDIKT: NESLADĚNO (7)

Pozitivně: **0 otázek s délkovou nápovědou** (žádná správná odpověď není nejdelší) —
jediný ze čtyř bloků, který v tomhle měřidle projde bez nálezu.

NÁLEZY:

**1. (c) | ZAPIS bod „značka zrcadla: čára podle tvaru + šrafování za ní" — bez otázky.**
Slovo „šrafování" ani „nákres" není v bloku ani jednou; přitom jde o samostatný odstavec výkladu
(„Zrcadlo v nákresu kreslíme jako čáru… zašrafujeme").
**NÁVRH — ŠKRTNOUT otázku č. 21 („Proč oslňuje sníh za slunečného dne?" — viz nález 5) a NAHRADIT:**
- Otázka: „Jak se v nákresu značí zrcadlo?"
- „čára se šrafováním" / „plná tučná tečka" / „kroužek s křížkem"
- Vysvětlení: „Čára podle tvaru odrazné plochy; strana, kam světlo neprojde, se zašrafuje."

**2. (c) | ZAPIS bod „hladina vody, okenní tabule: část odrazí, část projde" — bez otázky.**
Otázka č. 13 se ptá jen „co se chová podobně jako zrcadlo → klidná hladina"; dělení světla na
odraženou a prošlou část zkoušeno není.
**NÁVRH — ŠKRTNOUT otázku č. 19 („Černá deska světlo hlavně…" — viz nález 4) a NAHRADIT:**
- Otázka: „Co udělá okenní tabule se světlem, které na ni dopadne?"
- „část odrazí, část pustí" / „všechno světlo odrazí" / „všechno světlo pohltí"
- Vysvětlení: „Stejně se chová i klidná vodní hladina — proto se večer vidíš v okně."

**3. (c) | ZAPIS bod „odrazka: kout ze 3 plošek, vrátí paprsek zpět" — zkoušen jen SMĚR, ne stavba.**
Otázka č. 20 zjišťuje pouze, kam odrazka vrací světlo; slova „kout" a „tři plošky" (ani patníky)
v bloku nejsou, přestože má odrazka ve výkladu vlastní kapitolu h3.
**NÁVRH — PŘEPSAT otázku č. 20 („Odrazka na kole vrací světlo…"):**
- Otázka: „Z čeho je poskládaná odrazka na kole?"
- „z koutů se 3 ploškami" / „z jedné ploché desky" / „z drobných žárovek"
- Vysvětlení: „Paprsek se v koutu odrazí třikrát a vrátí se přesně tam, odkud přišel."

**4. (b) | otázka č. 19 „Černá deska světlo hlavně… pohlcuje" — ve výkladu není.**
Výklad zná pohlcení jen jako jednu ze tří možností na rozhraní; o černých površích a jejich
zahřívání (vysvětlení: „proto se na slunci zahřívají") neříká nic. Řeší nález 2.

**5. (b) | otázka č. 21 „Proč oslňuje sníh za slunečného dne?" — ve výkladu není.**
Sníh se ve výkladu nevyskytuje. Řeší nález 1.

**6. (b) | otázka č. 17 „Úhel mezi paprskem a zrcadlem je 40°. Jaký je úhel dopadu?" — postup
90 − 40 = 50 výklad nikde neukazuje.** Kapitola „Pro zvídavé: počítáme" obsahuje jen dopad 30° → 30°
a 0° → 0°. Navíc je to nadstavba stojící uprostřed bloku, ne na konci.
**NÁVRH — PONECHAT otázku (výpočet je správný: 90 − 40 = 50), ale PŘESUNOUT na poslední místo
bloku a doplnit oporu ve výkladu** — do kapitoly „Pro zvídavé: počítáme" přidat větu:
„Kolmice svírá se zrcadlem 90°, takže když paprsek svírá se zrcadlem 40°, je úhel dopadu 90 − 40 = 50°."
(Bez doplnění výkladu otázku ŠKRTNOUT a NAHRADIT: „Kde je hranice mezi stínem a světlem ostrá…"
— ale úprava výkladu je lepší, látka je pro 7. ročník přiměřená.)

**7. (d) | ÚNIK ve třech dvojicích vysvětlení.**
DŮKAZ a): vysv. č. 5 = „Paprsek se odráží vždy **pod stejným úhlem, jakým dopadl**" → to je doslova
odpověď č. 2 („Jak zní zákon odrazu? → úhel odrazu = úhel dopadu").
DŮKAZ b): vysv. č. 11 = „**Vyleštěná kovová plocha chráněná sklem.**" → to je odpověď č. 14
(„Z čeho je vyrobené klasické zrcadlo? → z kovové vrstvy pod sklem").
DŮKAZ c): vysv. č. 15 = „**Nerovný povrch = rozptyl** = žádný souvislý obraz" → odpověď č. 8
(„na nerovné ploše → rozptýlí se do stran").
**NÁVRH — nová vysvětlení:**
- č. 5: „Zákon odrazu platí pro každý úhel — proto 30°."
- č. 11: „Zrcadlo musí mít dokonale hladký lesklý povrch, jinak se obraz rozpadne."
- č. 15: „Na vlnící se hladině nevznikne souvislý obraz — každá vlna je jinak nakloněná."

---

## lom-svetla — VERDIKT: NESLADĚNO (11)

NÁLEZY:

**1. (c) | ZÁVAŽNÉ: nosný vzorec podtématu `n = c / v` a celá kapitola h3 „Opticky hustší a
opticky řidší prostředí" nemají ANI JEDNU z 21 otázek.**
DŮKAZ: řetězec „index lomu" ani písmeno „n" se v celém bloku nevyskytuje. Bez otázky zůstává
7 bodů ZAPIS: „n: poměr rychlostí, bez jednotky", „větší n = opticky hustší prostředí",
„n vody ≈ 1,33", „n skla = 1,5 až 1,9", „n vzduchu ≈ 1", „výpočet: v = c / n", „sklo: v = 200 000 km/s".
Zároveň je to jediné pole `vzorec` v zápisu podtématu — kvíz nezkouší hlavní vzorec hodiny.
**NÁVRH — ŠKRTNOUT otázku č. 21 („Při lomu se část světla zároveň…" — viz nález 5) a NAHRADIT:**
- Otázka: „Co udává index lomu n?"
- „poměr rychlostí" / „hmotnost prostředí" / „teplotu látky"
- Vysvětlení: „Kolikrát je světlo v daném prostředí pomalejší než ve vakuu."
**NÁVRH — ŠKRTNOUT otázku č. 13 („Proč se dno bazénu zdá mělčí…" — duplicita s č. 12 brčko) a NAHRADIT:**
- Otázka: „Jakou jednotku má index lomu?"
- „žádnou" / „stupeň" / „kilometr"
- Vysvětlení: „Je to jen poměr dvou rychlostí, jednotky se vykrátí."
**NÁVRH — ŠKRTNOUT otázku č. 20 („Vzduch nad rozpálenou silnicí se tetelí…" — viz nález 7) a NAHRADIT:**
- Otázka: „Jaký index lomu má voda?"
- „asi 1,33" / „asi 3,30" / „asi 13,3"
- Vysvětlení: „Voda 1,33, sklo 1,5 až 1,9, vzduch přibližně 1."
**NÁVRH — PŘEPSAT otázku č. 14 („Ve kterém prostředí je světlo rychlejší — ve vodě, nebo ve skle?"
— viz nález 9):**
- Otázka: „Sklo má index lomu 1,5. Jak rychle v něm letí světlo?"
- „200 000 km/s" / „450 000 km/s" / „150 000 km/s"
- Vysvětlení: „v = c / n = 300 000 : 1,5 = 200 000 km/s." (přepočítáno: 300 000 / 1,5 = 200 000 ✓)

**2. (a)+(c) | otázka č. 8 definuje mezní úhel jinak než výklad a hodnota 90° chybí v celém bloku.**
DŮKAZ: výklad = „Při **mezním úhlu dopadu je úhel lomu 90°** — lomený paprsek běží podél rozhraní";
kvíz č. 8 = „největší úhel dopadu, při kterém ještě nastává lom". Znak „90°" není v bloku ani jednou.
**NÁVRH — ŠKRTNOUT otázku č. 18 („Rybář vidí rybu pod hladinou…" — viz nález 6) a NAHRADIT:**
- Otázka: „Jak velký je úhel lomu při mezním úhlu dopadu?"
- „90°" / „45°" / „180°"
- Vysvětlení: „Lomený paprsek běží přesně podél rozhraní."
(Otázku č. 8 zároveň přeformulovat, viz nález 9.)

**3. (c) | ZAPIS bod „fata morgana: zdánlivé zrcadlení oblohy" — bez otázky.**
Pojem se v bloku objeví jen uvnitř vysvětlení č. 20 („i fata morgána"), tedy jako vedlejší zmínka
v textu, který žák uvidí pouze při chybné odpovědi.
**NÁVRH — do bloku nevejde bez dalšího škrtu; doporučuji PŘEPSAT otázku č. 12 (brčko) tak, aby po
škrtu č. 13 pokryla obě aplikace, a fata morganu doplnit místo nejslabší zbylé otázky č. 17
(„Který drahokam nejvíc zpomaluje světlo") — ŠKRTNOUT a NAHRADIT:**
- Otázka: „Jak se jmenuje zdánlivé zrcadlení oblohy nad rozpáleným pískem?"
- „fata morgana" / „polární záře" / „duha nad pouští"
- Vysvětlení: „Vzniká lomem světla v různě teplých vrstvách vzduchu."
(Pozn.: pak zůstane nepokryto „diamant 125 000 km/s"; alternativa je ponechat č. 17 a fata morganu
nezkoušet — rozhodne exekutor podle toho, co je v podkladu důležitější.)

**4. (c) | ZAPIS bod „využití: optická vlákna, odrazky, hranoly" — zkoušena jen optická vlákna.**
Otázka č. 11 nabízí jedinou aplikaci; odrazné hranoly ve fotoaparátech a dalekohledech nejsou nikde.
**NÁVRH — PŘEPSAT otázku č. 11 („Kde se úplný odraz využívá?"):**
- Otázka: „Co všechno využívá úplný odraz?"
- „vlákna, odrazky, hranoly" / „žárovky a zářivky" / „stínidla a clony"
- Vysvětlení: „Optická vlákna, odrazky na kole i hranoly ve fotoaparátech a dalekohledech."

**5. (b) | otázka č. 21 „Při lomu se část světla zároveň odráží" — ve výkladu lomu NENÍ.**
Věta o dělení paprsku („část se odrazí a část projde dál") stojí ve výkladu **odrazu světla**,
ne tady; tento výklad ji neobsahuje. Řeší nález 1.

**6. (b) | otázka č. 18 „Kde ryba skutečně je? → hlouběji, než se zdá" — výklad směr neuvádí.**
DŮKAZ: výklad říká pouze „Ryby a jiné předměty pod hladinou vidíme **jinde**, než kde skutečně jsou".
Vysvětlení navíc přidává nadstavbu „proto se harpunuje pod obraz". Řeší nález 2.

**7. (b) | otázka č. 20 „Vzduch nad rozpálenou silnicí se tetelí. Proč?" — ve výkladu není.**
Výklad zná jen „fata morgana — zdánlivé zrcadlení oblohy nad rozpáleným pískem nebo silnicí";
o různě teplých vrstvách vzduchu a jejich různé optické hustotě neříká nic. Řeší nález 1.

**8. (c) | zploštělý sluneční kotouč při východu a západu — bez otázky** (odstavec výkladu
„Při východu a západu Slunce vidíme sluneční kotouč zploštělý"). DROBNÉ, do 21 otázek se nevejde —
hlásím jako zbývající mezeru.

**9. (d) | DÉLKOVÁ NÁPOVĚDA u 8 z 21 otázek (38 %).**
Náskoky: č. 2 (+39), 4 (+39), 8 (+35), 12 (+24), 14 (+16), 15 (+13), 19 (+16), 20 (+28).
**NÁVRH — nová znění odpovědí** (č. 14 a 20 řeší nález 1):
- č. 2 „Kdy nastává lom KE kolmici?": „z řidšího do hustšího" / „z hustšího do řidšího" / „při dopadu po kolmici"
- č. 4 „Kdy nastává lom OD kolmice?": „z hustšího do řidšího" / „z řidšího do hustšího" / „při kolmém dopadu"
- č. 8 „Co je mezní úhel?": „úhel dopadu s lomem 90°" / „úhel dopadu přesně 45 stupňů" / „úhel odrazu u zrcadla"
- č. 12 „Proč vypadá brčko ve vodě zlomené?": „paprsky se lámou na hladině" / „brčko se ohne horkem vody" / „voda brčko doopravdy zkřiví"
- č. 15 „Opticky hustší prostředí znamená…": „světlo je v něm pomalejší" / „prostředí je těžší na váhu" / „prostředí je tmavší"
- č. 19 „Lom světla využívají ke své funkci…": „čočky" / „zrcadla" / „stínidla"

**10. (d) | ÚNIK: odpovědi č. 2 a 4 obsahují přímo řešení otázek 6 a 7.**
DŮKAZ: č. 2 správná = „z řidšího do hustšího prostředí **(vzduch → voda)**" → č. 6 „Paprsek jde
**ze vzduchu do skla**. Láme se… ke kolmici". Totéž č. 4 „**(voda → vzduch)**" → č. 7 „Paprsek jde
**z vody do vzduchu**. Láme se… od kolmice".
**NÁVRH:** řeší nález 9 (z odpovědí č. 2 a 4 zmizí konkrétní dvojice v závorce).

**11. (d) | ÚNIK ve dvou dvojicích vysvětlení.**
DŮKAZ a): vysv. č. 2 i č. 4 = „Do opticky hustšího **(„pomalejšího")** prostředí…" a vysv. č. 14 =
„sklo je **opticky hustší**" → odpověď č. 15 („Opticky hustší prostředí znamená… světlo se v něm šíří pomaleji").
DŮKAZ b): vysv. č. 8 = „Nad mezním úhlem se světlo už nezlomí ven — **jen se odrazí**" → odpověď
č. 9 („Co nastane při větším úhlu dopadu, než je mezní? → úplný (totální) odraz").
**NÁVRH — nová vysvětlení:**
- č. 2: „Paprsek se přikloní blíž k pomyslné kolmici v bodě dopadu."
- č. 4: „Paprsek se odkloní dál od pomyslné kolmice v bodě dopadu."
- č. 8: „Při mezním úhlu běží lomený paprsek přesně podél rozhraní."

---

## stin-faze-mesice — VERDIKT: NESLADĚNO (14)

NÁLEZY:

**1. (a) | ZÁVAŽNÉ: otázka č. 15 má podle výkladu DVĚ obhajitelné odpovědi.**
DŮKAZ: distraktor „pouhým okem chvilku" je ve výkladu označen za povolený — „Dívat se smíš jen
přes ochranné brýle — **jedinou výjimkou je těch pár minut, kdy Měsíc zakryje celé Slunce.**"
Otázka „Jak lze bezpečně pozorovat zatmění Slunce?" tedy vylučuje odpověď, kterou výklad připouští.
**NÁVRH — PŘEPSAT otázku č. 15:**
- Otázka: „Jak se smíš dívat na ČÁSTEČNÉ zatmění Slunce?"
- „jen přes ochranné brýle" / „klidně pouhým okem chvilku" / „přes obyčejné sluneční brýle"
- Vysvětlení: „Pouhým okem jen při úplném zákrytu — a jen těch pár minut, kdy je Slunce celé schované."

**2. (b) | ZÁVAŽNÉ: otázka č. 20 „Proč nemají všechny kalendářní měsíce stejný počet dnů?" —
ve výkladu NENÍ NIC o kalendáři.** Slova „kalendář", „rok 365" ani „dohoda" se ve výkladu
nevyskytují; správná odpověď má navíc 63 znaků a náskok +44 (největší v celém tématu).
**NÁVRH — ŠKRTNOUT a NAHRADIT (pokrývá nepokryté ZAPIS body „Slunce 400× větší, 400× dál" a
„proto kotouče na obloze stejně velké"):**
- Otázka: „Proč vidíme Slunce a Měsíc na obloze stejně velké?"
- „Slunce je 400× dál i 400× větší" / „obě tělesa jsou opravdu stejně veliká" / „Měsíc je k nám blíž než hvězdy"
- Vysvětlení: „Slunce je 400krát větší, ale také 400krát dál — proto se kotouče kryjí."

**3. (b) | ZÁVAŽNÉ: otázka č. 21 „Proč únor občas má 29 dnů?" — ve výkladu NENÍ NIC.**
Přestupný rok ani oběh Země kolem Slunce se ve výkladu nevyskytují; náskok správné odpovědi +32.
**NÁVRH — ŠKRTNOUT a NAHRADIT (pokrývá nepokrytou kapitolu h3 „Prstencové zatmění"):**
- Otázka: „Co je prstencové zatmění Slunce?"
- „Měsíc nezakryje celé Slunce" / „Slunce úplně zakryje celý Měsíc" / „Země zakryje celý Měsíc"
- Vysvětlení: „Měsíc je zrovna dál od Země, jeho kotouč je menší a kolem zůstane zářit prstenec."

**4. (b) | otázka č. 19 „Tvůj stín je večer při nízkém Slunci… dlouhý" — ve výkladu není.**
Výklad o délce stínu podle výšky Slunce nic neříká.
**NÁVRH — ŠKRTNOUT a NAHRADIT (pokrývá nepokrytý ZAPIS bod „zatmění Měsíce: při úplňku, dráhy nesouběžné"):**
- Otázka: „Proč nenastává zatmění Měsíce při každém úplňku?"
- „Měsíc obíhá v jiné rovině" / „Měsíc bývá zakrytý mraky" / „Země se v tu chvíli neotáčí"
- Vysvětlení: „Dráha Měsíce není v téže rovině jako dráha Země — stín Země Měsíc často mine."

**5. (a) | otázka č. 2 používá termín „plný stín", který výklad nezná.**
DŮKAZ: výklad pracuje s pojmy „**stín**" a „**vržený stín**", nikde „plný stín".
**NÁVRH — PŘEPSAT otázku č. 2:**
- Otázka: „Co je stín?"
- „prostor bez světla" / „místo se slabším osvětlením" / „zrcadlový odraz tělesa"
- Vysvětlení: „Za neprůhledné těleso se světlo nedostane — vzniká stín."

**6. (c) | ZAPIS body „vržený stín: např. strom na silnici" a „hranici stínu určují okrajové
paprsky" — bez otázky.** Slovo „stínítko" ani „okrajové paprsky" nejsou v bloku.
Do 21 otázek se po nálezech 2–4 nevejde — hlásím jako zbývající mezeru; nejslabší kandidát na
výměnu je otázka č. 8 („Jak se jmenuje fáze, kdy je vidět celý osvětlený kotouč?"), která
duplikuje č. 18.
**NÁVRH (pokud exekutor č. 8 škrtne):**
- Otázka: „Co určuje hranici stínu?"
- „paprsky kolem okraje tělesa" / „paprsky ze středu zdroje" / „odražené paprsky od stínítka"
- Vysvětlení: „Paprsky, které projdou těsně kolem okraje tělesa."

**7. (c) | ZAPIS bod „úplné Slunce: tma + korona, vzácné (malé území); částečné: jas silný,
častější" — bez otázky.** Slovo „korona" v bloku není, stejně jako polostín Měsíce na Zemi
a údaj „zhruba každých 18 měsíců". Zbývající mezera (blok je plný).

**8. (c) | ZAPIS bod „zatmění Měsíce 2–3× ročně; úplné/částečné" — bez otázky.**
Četnost ani dělení úplné/částečné u zatmění Měsíce se nezkouší. Zbývající mezera.

**9. (d) | DÉLKOVÁ NÁPOVĚDA u 9 z 21 otázek (43 %).**
Náskoky: č. 1 (+30), 2 (+28), 3 (+40), 5 (+13), 6 (+28), 9 (+17), 15 (+18), 20 (+44), 21 (+32).
**NÁVRH — nová znění odpovědí** (č. 2, 15, 20, 21 řeší nálezy 1, 2, 3, 5):
- č. 1 „Proč za neprůhledným tělesem vzniká stín?": „světlo se šíří přímočaře" / „světlo se bojí velké tmy" / „těleso samo vyrábí světlo"
- č. 3 „Co je polostín?": „světlo z části zdroje" / „stín v pravé poledne" / „stín, který vrhá Měsíc"
- č. 5 „Svítí Měsíc vlastním světlem?": „ne, jen odráží" / „ano, svítí samo" / „jen při úplňku"
- č. 6 „Proč se tvar Měsíce na obloze mění?": „vidíme ho z různých úhlů" / „Měsíc se nafukuje a splaskává" / „pořád ho zakrývají mraky"
- č. 9 „Co jde hned po novu?": „první čtvrť a úplněk" / „úplněk a první čtvrť" / „hned poslední čtvrť"

**10. (d) | ÚNIK: otázka č. 12 má jako distraktor doslova správnou odpověď otázky č. 13 a naopak.**
DŮKAZ: č. 12 odpovědi = „když se Země dostane mezi Slunce a Měsíc" / „**když se Měsíc dostane mezi
Zemi a Slunce**"; č. 13 správná = „**když se Měsíc dostane mezi Zemi a Slunce**". Obě otázky stojí
v bloku hned vedle sebe.
**NÁVRH — PŘEPSAT otázku č. 13:**
- Otázka: „Kdo vrhá stín při zatmění Slunce?"
- „Měsíc na Zemi" / „Země na Měsíc" / „Slunce na Měsíc"
- Vysvětlení: „Měsíc se dostane mezi Zemi a Slunce a jeho stín dopadne na Zemi."

**11. (d) | ÚNIK: vysvětlení č. 12 prozradí odpověď č. 16.**
DŮKAZ: vysv. č. 12 = „Země vrhá stín na Měsíc — ten ztmavne či **zčervená**" → č. 16 „Při zatmění
Měsíce může Měsíc vypadat… **načervenalý**".
**NÁVRH — nové vysvětlení č. 12:** „Země se dostane mezi Slunce a Měsíc a vrhne na něj svůj stín."

**12. (d) | ÚNIK: vysvětlení č. 17 a 18 prozrazují odpovědi č. 12 a 13.**
DŮKAZ: vysv. č. 17 = „**Měsíc musí být mezi Zemí a Sluncem**" → odpověď č. 13; vysv. č. 18 =
„**Země musí být uprostřed**" → odpověď č. 12.
**NÁVRH — nová vysvětlení:**
- č. 17: „Zatmění Slunce může nastat jen v novu."
- č. 18: „Zatmění Měsíce může nastat jen v úplňku."

**13. (d) | ÚNIK: vysvětlení č. 9 prozradí odpovědi č. 7, 8 i 11.**
DŮKAZ: vysv. č. 9 = „**Nov** → **dorůstá** (první čtvrť) → **úplněk** → couvá (poslední čtvrť) → nov"
→ č. 7 („fáze, kdy Měsíc není vidět → nov"), č. 8 („celý osvětlený kotouč → úplněk"),
č. 11 („Měsíc dorůstá do tvaru písmene… D").
**NÁVRH — nové vysvětlení č. 9:** „Po novu Měsíc postupně přibývá, až je celý osvětlený."

**14. (b) | otázka č. 4 „Kdy vzniká ostrý stín bez polostínu? → u bodového zdroje" — výklad
opačné tvrzení neobsahuje.** Výklad říká jen „U plošných zdrojů vzniká kolem stínu ještě polostín".
DROBNÉ — odvodit lze, ale doporučuji doplnit do výkladu větu: „U bodového zdroje polostín nevzniká
a hranice stínu je ostrá."

---

## ⚠️ ze `zkontroluj.mjs` (doslovně)

Běh 22. 9. 2026, exit 0. K těmto čtyřem klíčům se nevztahuje ŽÁDNÉ jmenovité ⚠️ — měřidlo na ně
neukazuje, protože rohatka hlídá jen součty přes celý web. Doslovný výpis všech ⚠️:

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 521 otázek (19 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 64 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
ℹ️  laťku lze utáhnout příkazem: npm run prijmi-latku (brána sama nic nepřepisuje)
✅ Vše zapojené správně.
```

Doprovodné řádky téhož běhu, které jsou pro tuhle kontrolu podstatné:
```
Kontrola webu — 129 interakcí (+2 druhých na stránce), 131 komponent simulací, 3134 kvízových otázek v 166 blocích.
Náskok správné odpovědi: 64 otázek s náskokem ≥10 znaků (16 souhrnných /shrnuti/ vynecháno záměrně — počítaly by se dvakrát).
Vazby v kvízech: prošlo 150 bloků / 2732 otázek — 0 duplicit, 0 úniků odpovědí.
```

**POZOR na měřidlo:** brána hlásí „0 úniků odpovědí", ale tahle kontrola našla **9 skutečných
úniků** ve čtyřech blocích (nálezy: světlo 11, 12; odraz 7; lom 10, 11; stín 10, 11, 12, 13).
Sedí to s pamětí `feedback-brana-meri-jen-cast-uniku` — `uniky.mjs` je slepá k únikům
z pole `vysvetleni` do odpovědi jiné otázky téhož bloku. Doporučuji brát „0 úniků" jako
neprůkazné, ne jako doklad.

---

## ZAPRACOVÁNO 22. 9. 2026

Všechny 4 bloky zapracovány do `src/data/kvizy.ts` (počet zůstal 21/21/21/21). Záloha
původních výpisů `--otazky` v `/private/tmp/claude-502/-Users-Shared--kola/…/scratchpad/
kviz-<klic>-pred.txt`.

- **svetlo-jeho-zdroje: 12/12 nálezů zapracováno.** Nahrazeny/přepsány otázky 2, 5, 6, 10,
  16, 17, 18, 20, 21 (nové znění); odpovědi zkráceny u 1, 7, 8, 11, 13, 14, 15, 19 (délková
  nápověda); vysvětlení opravena u 9, 11 (únik). Zbývající nepokrytá mezera z nálezu 6 (zkratka
  AU) ponechána zdokumentovaná — do 21 otázek se nevejde beze škrtu další otázky.
- **odraz-svetla: 7/7 nálezů zapracováno.** Nahrazeny otázky 19, 20, 21 (nové znění dle
  nálezů); vysvětlení opravena u 5, 11, 15 (únik). **Odchylka od nálezu 6:** primární návrh
  (doplnit větu do výkladu „Pro zvídavé: počítáme") NEPROVEDEN — do `temata.ts` nesmí sahat
  tento exekutor (píše tam jiný proces). Použita nálezem uvedená záložní varianta: otázka č. 17
  (40°→50°) nahrazena grunt-testovanou otázkou „V jakých jednotkách měříme úhel dopadu a
  odrazu?" (jednotky stupeň, doloženo v `zapis.jednotky` výkladu). Doporučuji orchestrátorovi
  předat druhému exekutorovi větu z nálezu 6 pro `temata.ts`, aby šlo číselný příklad vrátit.
- **lom-svetla: 11/11 nálezů zapracováno.** Doplněna otázka na `n = c/v` (č. 21) i na jednotku
  n (č. 13) a hodnotu n vody (č. 20); přepsána č. 14 (rychlost ve skle přes n), č. 8+18 (mezní
  úhel/90°), č. 11 (využití), č. 17→fata morgana; zkráceny odpovědi č. 2, 4, 8, 12, 15, 19;
  opravena vysvětlení č. 2, 4, 8 (únik). Nález 3 poznámka „PŘEPSAT č. 12 (brčko)" beze
  konkrétního znění vyřešena finálním zněním z nálezu 9 (kratší otázka i odpovědi). Zbývající
  nepokrytá mezera z nálezu 8 (zploštělý kotouč při východu/západu) zdokumentována, do 21 se
  nevejde. Diamant 125 000 km/s po nahrazení č. 17 zůstal nepokrytý — akceptováno dle
  poznámky nálezu („rozhodne exekutor").
- **stin-faze-mesice: 14/14 nálezů zapracováno.** Opravena dvouznačnost č. 15 (přeformulováno
  na ČÁSTEČNÉ zatmění); nahrazeny otázky 2 (plný stín→stín), 8 (duplicita úplňku→hranice
  stínu, nález 6 proveden), 13, 19, 20, 21; zkráceny odpovědi 1, 3, 5, 6, 9; opravena
  vysvětlení 9, 12, 17, 18 (únik). Nálezy 7, 8 (korona, četnost zatmění Měsíce) a 14 (bodový
  zdroj bez polostínu) zůstávají zdokumentované mezery — blok je na stropu 21 otázek, nález 14
  navíc žádá větu do výkladu (`temata.ts`, mimo mé oprávnění).

**Kontrola po zásahu:** `testy/uniky.mjs` po prvním kole doplňování našel 4 NOVÉ úniky
(vlastní vysvětlení nově zapsaných/upravených otázek prozrazovala odpověď sousední otázky —
„prochází/rozptylu" u světla, „klidná hladina" u odrazu, „poměr rychlostí" u lomu, „pouhým
okem" u stínu). Všechny 4 přeformulovány (odstraněn jeden ze dvou rozlišujících slov) a
kontrolor spuštěn znovu → 0 úniků, 0 duplicit. `zkontroluj.mjs` exit 0, žádné nové ⚠️ k těmto
čtyřem klíčům; náskok ≥10 znaků na webu klesl ze 64 na 37. `npm run build` proběhl (481
stránek). Potvrzuje pravidlo „kontrolora pouštět dvakrát".

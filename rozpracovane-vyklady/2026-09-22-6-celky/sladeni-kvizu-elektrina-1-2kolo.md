# Sladění kvízů F8 elektřina — 2. KOLO nezávislé kontroly (22. 9. 2026)

Metoda: `node testy/vypis-kviz.mjs elektrina/<klic>` (plné znění s odpověďmi i vysvětleními)
proti `node podtema.mjs . get fyzika/8-rocnik/elektrina/<klic>`. Náskok správné odpovědi
přepočítán skriptem nad `kvizy.ts` (scratchpad/naskok.mjs) — v osmi blocích je jediná otázka
s náskokem ≥6 znaků (elektricky-naboj #1, +8) a ani jedna ≥10. Délková nápověda z 1. kola je
tedy skutečně pryč. Všechny počty otázek: 8× 21. Výpočty přepočítány (`node -e`):
6·1,5=9 · 9:1,5=6 · 2000:200=10 · 8:4=2 · 2400:800=3 · 3000:5=600 · 1,5 V=1500 mV ·
5·0,001=0,005 · 3·1,5=4,5 — všechno sedí.

Strojová kontrola úniků nad `kvizy.ts` (scratchpad/uniky2.mjs, shoda ≥60 % plnovýznamových slov
správné odpovědi v textu/vysvětlení jiné otázky téhož bloku) + ruční čtení každého bloku.

---

## elektricky-naboj — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné (nálezy 1–8 z 1. kola ověřeny jako provedené; otázka 2 = elementární náboj,
4 = elektrometr, 19 = cisterna, 21 = 5 mC, 10 = sloučené souhlasné/nesouhlasné, délky u 5–8 srovnány)

NOVÉ:
1. otázka č. 13 „Co je aniont?" | vysvětlení končí větou „Ztrátou elektronu vzniká naopak kationt."
   a tím doslova dává odpověď otázky č. 7 („Co je kationt?" → `atom, který ztratil elektron`);
   nově vložený distraktor u otázky 7 (`atom, který přijal elektron navíc`) je zase doslova
   správná odpověď otázky 13 — dvojice si navzájem řeší obě zadání.
   NÁVRH: vysvětlení u otázky 13 zkrátit na „Aniont vznikne, když atom přijme navíc elektron —
   proto v něm převáží záporný náboj." (bez věty o kationtu) a distraktor u otázky 7 vyměnit
   za `atom, který ztratil celý proton`.
2. otázka č. 14 „Jaký náboj získá sklo…?" | vysvětlení „…Plast se naopak nabíjí vždy záporně."
   prozrazuje odpověď otázky č. 9 („Jak se nabíjí plast při tření?" → `záporně`).
   NÁVRH: vysvětlení zkrátit na „Sklo se třením nabíjí kladně, protože při tření ztrácí elektrony."

## elektricke-pole — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné — nález 4 (pokus s krupicí v oleji) uznávám jako skutečně zanedbatelný:
není v poli ZAPIS, jde o demonstraci k siločárám, které blok pokrývá otázkami 7, 8, 9 a 11.

NOVÉ:
1. otázka č. 12 „V čem se izolant liší od vodiče?" (nová v 1. kole) | vysvětlení „V izolantu se
   elektrony jen natočí (polarizace), ale těleso neopustí — odvést je nelze." prozrazuje odpověď
   otázky č. 5 („Co se děje s izolantem v elektrickém poli?" → `polarizuje se — náboje se nakloní`)
   i otázky č. 6 (`pole je zpolarizuje`).
   NÁVRH: vysvětlení u otázky 12 změnit na „Z vodiče náboj odteče pryč, z izolantu ne — jeho
   elektrony zůstávají vázané ve svých atomech."

## vznik-elektrickeho-proudu — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné (nálezy 1–6 provedeny: otázka 12 = turbína, 21 = kladné ionty, 17 = usměrnění)

NOVÉ:
1. otázka č. 9 „Co je střídavý proud (AC)?" | opravené vysvětlení končí „— takový proud teče
   v domácí zásuvce." a tím dává odpověď otázky č. 10 („Odkud máme střídavý proud?" → `ze zásuvky`)
   i otázky č. 16 (`střídavý proud (AC)` u pračky a fénu). 1. kolo z vysvětlení vyhodilo větu
   o baterii, ale zásuvku tam nechalo.
   NÁVRH: vysvětlení u otázky 9: „Střídavý proud pravidelně mění směr, a to mnohokrát za sekundu."
2. otázka č. 17 (nová v 1. kole) „Jak může nabíječka z LED světlem fungovat ze zásuvky, když LED
   potřebuje stejnosměrný proud?" | zadání samo říká, že u LED na směru proudu záleží → prozrazuje
   odpověď otázky č. 11 („U kterého spotřebiče záleží na směru proudu?" → `LED dioda`), a slovem
   „ze zásuvky" navíc míří na otázku 10. Je to tentýž typ úniku, který 1. kolo vytklo staré otázce 21.
   NÁVRH: „Co musí mít uvnitř spotřebič citlivý na směr proudu, aby fungoval ze zásuvky?" —
   `usměrňovací obvod` / `silnější přívodní kabel` / `větší pojistku na vstupu`. Vysvětlení:
   „Takový obvod změní proud ze sítě na stejnosměrný."

## chemicke-zdroje-napeti — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné — kritický nález 1 (lithiový článek do mobilu) je opraven správně: otázka 10
se ptá na jednorázový lithiový článek a `do klíče od auta` sedí s výkladem.

NOVÉ:
1. otázka č. 6 (nová v 1. kole) „Jak se jmenuje záporná elektroda galvanického článku?" |
   vysvětlení „Záporná elektroda je anoda (třeba zinek), kladná katoda (třeba uhlík)." prozrazuje
   odpověď otázky č. 8 („Jaká je záporná elektroda suchého článku?" → `zinková nádoba`).
   NÁVRH: vysvětlení u otázky 6 zkrátit na „Záporné elektrodě se říká anoda, kladné katoda."
2. otázka č. 20 (přeformulovaná v 1. kole) „Proč nevznikne napětí, když jsou obě elektrody ze
   stejného kovu?" | správná odpověď `napětí vzniká až mezi různými kovy` je obsahově táž věta
   jako správná odpověď otázky č. 3 („Z čeho musí být elektrody v článku?" → `ze dvou různých
   materiálů`) — duplicita a zároveň únik.
   NÁVRH: otázku 20 nahradit nepokrytým elektrolytem suchého článku: „Co je elektrolytem v suchém
   článku?" — `salmiaková pasta` / `čistá voda z kohoutku` / `suchý vzduch uvnitř pouzdra`.
   Vysvětlení: „Elektrolyt nemusí být jen roztok — v suchém článku je to hustá pasta."

## elektricke-obvody — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: nález 3 (stavba žárovky) — NEUZNÁVÁM důvod „žádné volné místo". Volné místo v bloku
je: otázka č. 8 („Proč je zkrat nebezpečný?" → `vodiče se přehřejí`) je celá obsažená ve
vysvětlení otázky č. 7 („Teče velký proud, hrozí požár.") — 7 a 8 zkoušejí jedno a totéž
a vysvětlení sedmičky osmičku rovnou řeší.
   NÁVRH: otázku 8 nahradit návrhem z 1. kola: „Proč žárovka nesvítí, i když je obvod uzavřený?" —
   `má prasklé vlákno` / `má moc silné sklo` / `je plná vzduchu`. Vysvětlení: „Uvnitř baňky je
   vysátý vzduch a tenké wolframové vlákno; když praskne, obvod je přerušený."

NOVÉ:
1. otázka č. 17 (nová v 1. kole) „Na vánočním řetězu zapojeném **za sebou** praskne jedna
   žárovička…" | spojení zadání („za sebou") s vysvětlením („V sériovém zapojení se poruchou
   přeruší celý obvod") dává odpověď otázky č. 5 („Jak jsou spotřebiče zapojené v sériovém
   obvodu?" → `za sebou`).
   NÁVRH: zadání otázky 17 změnit na „Na vánočním řetězu zapojeném sériově praskne jedna
   žárovička. Co se stane?" (zbytek beze změny).

## elektricky-proud-mereni — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (nálezy 1–6 provedeny; nový příklad 8 C za 4 s = 2 A přepočítán a vychází celý)

NOVÉ:
1. otázka č. 16 (nová v 1. kole) „Jak zapojíme multimetr, když jím chceme měřit proud?" |
   správná odpověď `sériově, jako ampérmetr` i její vysvětlení doslova dávají odpověď otázky
   č. 7 („Jak zapojíme ampérmetr do obvodu?" → `sériově`). Trojice 7+16+19, kterou 1. kolo
   chtělo rozbít, tak zůstala pohromadě.
   NÁVRH: „Do které zdířky zapojíme hroty multimetru, když měříme malý proud v mA?" —
   `do zdířky pro mA` / `do zdířky pro velké proudy v A` / `do zdířky pro měření napětí`.
   Vysvětlení: „Multimetr má pro malé a velké proudy oddělené zdířky, jinak se přetíží."

## elektricke-napeti-mereni — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (nálezy 1–8 provedeny; otázka 16 = přepólování, 20 = růst proudu,
vysvětlení otázky 14 už neobsahuje číslo 3)

NOVÉ:
1. otázka č. 20 (nová v 1. kole) „Co se v obvodu **kromě napětí** zvýší, když zapojíme víc zdrojů
   za sebou?" | zadání samo tvrdí, že napětí roste → prozrazuje odpověď otázky č. 7 („Co se stane,
   když zapojíme více zdrojů za sebou (+ k −)?" → `napětí se sčítá`; distraktory `napětí se ruší`
   a `napětí klesá` jsou tím vyřazené).
   NÁVRH: „Zvýší se zapojením více zdrojů za sebou i proud v obvodu?" — `ano, roste i proud` /
   `ne, proud naopak klesne` / `ne, proud zůstane stejný`. Vysvětlení: „Vyšší napětí požene
   obvodem i větší proud."

## elektricky-proud-v-kovech-odpor — VERDIKT: NESLADĚNO (4)
NEVYŘEŠENÉ: nález 5 (převod 1 mΩ = 0,001 Ω) — NEUZNÁVÁM jako zanedbatelný: mΩ je výslovně
v poli ZAPIS (`jednotky`: „1 mΩ = 0,001 Ω") a obě sousední předpony (kΩ, MΩ) otázky mají
(15 a 16), takže chybí jen tahle. Volné místo je otázka č. 14 (viz nový nález 2).
   NÁVRH: otázku 14 nahradit: „Kolik ohmů je 1 mΩ?" — `0,001 Ω` / `1 000 Ω` / `100 Ω`.
   Vysvětlení: „Předpona mili znamená tisícinu ohmu."

NOVÉ:
1. otázka č. 17 „Z jakých dvou kovů je slitina konstantan?" | vysvětlení „…Nikl a chrom tvoří
   nichrom (topné spirály)." dává odpověď otázky č. 9 („Z čeho jsou topné spirály?" → `nichrom`)
   a obráceně vysvětlení otázky 9 („Nichrom (nikl + chrom)…") vyřazuje distraktor otázky 17.
   1. kolo považovalo nichromovou dvojici za vyřešenou opravou otázky 18 — únik se ale jen
   přesunul do otázky 17.
   NÁVRH: vysvětlení u otázky 17 zkrátit na „Konstantan je slitina mědi a niklu." a u otázky 9
   na „Nichrom má velký odpor a snese žhavení, aniž by shořel."
2. otázka č. 14 „Co vytvoří zdroj napětí ve vodiči, aby elektrony proudily usměrněně?" |
   vysvětlení „…které elektrony usměrní od − k +." je doslova správná odpověď otázky č. 3
   („Kam se pohybují elektrony při proudu?" → `od − k +`).
   NÁVRH: otázku 14 nahradit převodem 1 mΩ (viz NEVYŘEŠENÉ výše) — vyřeší se obojí najednou.
   Pokud má otázka 14 zůstat, vysvětlení zkrátit na „Napětí vytvoří ve vodiči elektrické pole."
3. otázka č. 18 (přeformulovaná v 1. kole) | vysvětlení tvrdí, že se konstantan hodí „díky svému
   velkému a **stálému** odporu" — o stálosti odporu konstantanu výklad nic neříká (grep „stál":
   0 výskytů), je to tvrzení navíc.
   NÁVRH: vysvětlení: „Rezistor je součástka s přesně daným odporem; vyrábí se z konstantanu,
   který má velký odpor."

---

## Co 2. kolo naopak potvrdilo jako v pořádku

- Všech 8 bloků má přesně 21 otázek, správná odpověď je vždy první a je věcně správná podle výkladu.
- Délková nápověda: po 1. kole nezůstala v osmi blocích ani jedna otázka s náskokem ≥10 znaků
  (jediná nad +5 je elektricky-naboj #1 s +8, což 1. kolo výslovně přijalo jako podprahové).
- Kritické nálezy 1. kola jsou skutečně opravené: lithiový článek (chemicke #10) i konstantan
  se dvěma správnými odpověďmi (odpor #18) už problém nemají.
- Všechny nové výpočtové otázky dávají celá čísla (2 A, 3 h, 600 mA, 10 h, 6 článků, 1 000 mAh,
  0,005 C) a všechny vycházejí ze vzorce uvedeného ve výkladu.

---

## ZAPRACOVÁNO 22. 9. 2026

- [x] elektricky-naboj — otázka 13 (aniont): vysvětlení zkráceno, věta o kationtu odstraněna;
  otázka 7 (kationt): distraktor `atom, který přijal elektron navíc` → `atom, který ztratil celý proton`
- [x] elektricky-naboj — otázka 14 (sklo): vysvětlení zkráceno, věta o plastu odstraněna
- [x] elektricke-pole — otázka 12 (izolant vs. vodič): vysvětlení přepsáno bez zmínky polarizace
- [x] vznik-elektrickeho-proudu — otázka 9 (AC): vysvětlení zkráceno bez zmínky zásuvky
- [x] vznik-elektrickeho-proudu — otázka 17: zadání i odpovědi přeformulovány na usměrňovací obvod
- [x] chemicke-zdroje-napeti — otázka 6 (anoda/katoda): vysvětlení zkráceno bez zmínky zinku
- [x] chemicke-zdroje-napeti — otázka 20: nahrazena otázkou o elektrolytu (salmiaková pasta)
- [x] elektricke-obvody — otázka 8 (NEVYŘEŠENÉ, zkrat = duplicita s otázkou 7): nahrazena
  otázkou o prasklém vlákně žárovky
- [x] elektricke-obvody — otázka 17 (vánoční řetěz): zadání „za sebou" → „sériově"
- [x] elektricky-proud-mereni — otázka 16 (multimetr): přeformulována na volbu zdířky mA/A
- [x] elektricke-napeti-mereni — otázka 20: přeformulována na otázku o růstu proudu
- [x] elektricky-proud-v-kovech-odpor — otázka 14 (NEVYŘEŠENÉ mΩ + NOVÉ únik): nahrazena
  otázkou „Kolik ohmů je 1 mΩ?" (0,001 Ω)
- [x] elektricky-proud-v-kovech-odpor — otázka 17 (konstantan) a otázka 9 (nichrom):
  vysvětlení zkrácena, křížový odkaz odstraněn
- [x] elektricky-proud-v-kovech-odpor — otázka 18 (rezistor): vysvětlení bez tvrzení o
  „stálém" odporu konstantanu

Brány po opravě: `node testy/uniky.mjs` 0/0, `node zkontroluj.mjs` 0 nálezů k těmto klíčům,
`npm run build` OK, všech 8 bloků 21 otázek.

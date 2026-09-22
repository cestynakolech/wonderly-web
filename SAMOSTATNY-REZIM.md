## ČEKÁ NA ROZHODNUTÍ UČITELE (23. 8. 2026)

U všech tří bodů platí: zdrojové PDF SmartBooks je ÚTRŽKOVITÉ (placený obsah,
„číst dál" končí u zdi) — chybějící číslo tedy nemusí být chyba na webu, jen
oříznutý zdroj. Rozhoduje učitel.

1. **Ochranná pásma vedení** — prezentace učitele („Elektřina 9", popis v
   `Omega/dokumenty/prezentace-popisy/`) uvádí do 1 kV = 7 m a 1–35 kV = 10 m,
   dohledané zdroje k zákonu 458/2000 Sb. ale uvádí 7/12/15/20 m podle napětí
   a 1 m u izolovaného kabelu do 1 kV — zdroje se rozcházejí, proto jsou
   konkrétní metry na webu zatím VYNECHANÉ (jen zásada „čím vyšší napětí, tím
   širší pásmo"). Doplnit tabulku podle zákona, podle prezentace, nebo nechat
   bez čísel?
   Ověřeno 22. 8. přímo ve zdrojovém PDF učitele („16 Účinky proudu na
   lidský organismus…", 9. ročník, str. 3–5): ŽÁDNÉ metry tam nejsou (str. 6
   je zamčený placený obsah). Vynechání konkrétních metrů z výkladu je tedy
   doložené, ne odhad. Rozpor zůstává jen mezi prezentací „Elektřina 9" (7 m
   do 1 kV, 10 m pro 1–35 kV) a energetickým zákonem 458/2000 Sb. (7 m do
   35 kV, 12/15/20/30 m výš, 1 m izolovaný kabel do 1 kV) — kategorie i
   hodnoty se liší. Simulace BezpecnaVzdalenostVedeniSimulace.astro už metry
   také neuvádí, takže na stránce není rozpor.
2. **Práh „od ~50 V se prorazí kůže"** (výklad F8 i F9) nemá oporu ve zdrojovém
   PDF SmartBooks — to dokládá jen odpory kůže 150 000 Ω (sucho) a 2000 Ω
   (vlhko), ne konkrétní napětí. Ponechat, nebo upravit?
3. **Bezpečné napětí „v suchých místnostech 50 V střídavé / 120 V stejnosměrné"**
   také nemá oporu ve zdrojovém PDF — to uvádí jen 25 V ss / 12 V st bez
   rozlišení prostoru. Ponechat, nebo upravit?
   Ověřeno v témž PDF, str. 4: doslova „Nejvyšší bezpečná hodnota
   stejnosměrného napětí podle normy je 25 V a střídavého napětí 12 V" — BEZ
   rozlišení suchých a vlhkých prostor. Rozlišení podle prostoru (50 V
   střídavé / 120 V stejnosměrné v suchu) i práh 50 V pro proražení kůže
   tedy ve zdroji opravdu nejsou; na webu zůstávají, protože podklad je
   útržkovitý a rozhodnutí je na učiteli.
4. Tíže na Jupiteru v simulaci PlanetyVahaSimulace (F6): hodnota 2,36× Země je
   PŘESNÝM přepisem tabulky z prezentace „Síla 6.pptx" (snímek 11, Nezkreslená
   věda: člověk 75 kg → Jupiter 177 kg, Saturn 80 kg). Fyzikální přepočet ale
   dává Jupiter 2,53× (prostý vzorec g=G·M/R²), tedy zhruba o 7 % víc; Saturn
   1,067× sedí. Tabulka v prezentaci je nejspíš zaokrouhlená nebo nepřesná.
   Nechat podle prezentace (žák uvidí totéž co v hodině), nebo opravit na
   fyzikálně přesnou hodnotu? Simulace zatím ZŮSTÁVÁ podle prezentace, jen
   s vysvětlujícím komentářem v kódu (commit 6469422).


> ⤵️ Uzavřené audity/nasazení a stav-snapshot k 19.–22. 8. 2026 (starý řádek 43–524) jsou v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

## 📌 Živé zadání, fronta a reference

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `~/.claude/skills/wonderly/START.md`).

> **wonderly je JEDEN web, tři sekce — fronta je SPOLEČNÁ pro všechny.** Každá
> položka fronty nese na začátku značku sekce: `[fox]` = web pro 1. stupeň,
> `[skola2]` = lab.wonderly.cz (2. stupeň, tenhle repo — dosud jediný obsah fronty),
> `[cesty]` = cestovatelský deník. Bez značky se nezakládá nová položka.

### 🔴 PRIORITA — přestavba obsahu fyziky (zadáno 21. 9. 2026)

`[skola2]` Zadání učitele. **NIC SE NEMAŽE** — texty se jen přestavují a doplňují.

**A) Plynulost výkladu.** Texty k tématům nesmí „přeskakovat" mezi pojmy.
Doložený příklad učitele: u energie se v jednom podtématu stále skáče mezi
polohovou a pohybovou energií. Každé téma má jít v jedné linii, ne sem a tam.

**B) Nová část „Zápis do sešitu"** u každého podtématu, v TOMTO pořadí:
1. **Vzoreček** (má-li ho téma) a pod ním **pod sebou** rozepsané všechny
   veličiny z něj — tvar: `síla — značíme F, jednotka N (newton)`.
2. **Vzoreček slovy**, ne jen značkami.
3. **Přesné znění zákona**, jde-li o zákon.
4. **Body s nápovědou** — jen pár slov na bod, NE celé vysvětlení.
   Důvod (slova učitele): *„děti si nemohou psát celé stránky, děti se neučí
   psát, ale rozumět fyzikálním zákonům; na podrobné čtení mají web, ne sešit."*

**C) Úroveň a řazení textu na webu.** Od nejjednoduššího k nejsložitějšímu.
Jazyková úroveň mnohem nižší než dosud — učitel říká „spíš pro 9–10 let":
žák má **tušit, jak fyzika funguje**, ne umět všechno spočítat.

**D) Nadstavba na konec stránky.** Náročné počítání a odvozování se nemaže,
jen se přesune na KONEC podtématu jako bonus pro schopnější žáky.

**Postup:** nejdřív **JEDNO podtéma KOMPLET** (A+B+C+D) jako vzor, nechat
schválit učitelem, teprve pak dávkově zbytek. Začít u **energie (8. ročník)** —
právě na ní učitel skákání ukázal.

**Stav 21. 9. 2026:** Vzor schválen učitelem (vlastní číselné příklady povoleny).
Celek Energie F8 HOTOV — 6/6 podtémat přestavěno podle A+B+C+D (worker-výklad →
nezávislý kontrolor opus → `podtema.mjs`), 5 z 6 potřebovalo 1 opravnou smyčku.
Zapsáno výhradně nástrojem `podtema.mjs`, build i `zkontroluj.mjs` procházejí.
2. dávka HOTOVA — celky `mechanicka-prace-a-vykon` (2 podtémata) a
`tepelne-motory` (2 podtémata) přestavěny stejným postupem, každé podtéma
mělo nezávislého kontrolora (opus), 3 ze 4 podtémat měla 1 opravnou smyčku.
3. dávka HOTOVA — celek `teplo-a-zmeny-skupenstvi` 7/7 podtémat přestavěno
(tuhnutí, var, kondenzace, skupenské změny vody v přírodě + 3 dřívější),
každé podtéma mělo nezávislého kontrolora, 6 ze 7 potřebovalo 1 opravnou
smyčku. Typický nález oprav: vypadlý dosavadní bod/věta při 1. kole —
pravidlo „dosavadní obsah se nikdy nevyřazuje jako MIMO SCOPE" doplněno
do zadání workerů. F8 hotové celky 1–4. Podle bodu E teď běží 1. celky
F7 (`pohyb-a-rychlost`, 4 podtémata) a F9 (`magneticke-pole`, 3 podtémata)
souběžně. Zbývá v F8: `elektrina` (15), `zvuk` (3), `shrnuti` (2, bez
zdrojů) — přijde na řadu ve svém pořadí podle bodu E.
Drobnosti do stavu: podtéma potraviny má 7×`<h3>` a 8 bodů zápisu (víc než vzor,
neškodí); odvozené vztahy uvnitř rámečku vzorce se na užší obrazovce zalamují
na dva řádky — zvážit přesun do nadstavby.
F7 1. celek `pohyb-a-rychlost` HOTOV 4/4 podtémata (klid a pohyb, posuvný a
otáčivý pohyb, rychlost/dráha/čas, příklady na výpočet rychlosti) — každé
mělo nezávislého kontrolora, 3 ze 4 potřebovaly 1 opravnou smyčku. U příkladů
kontrolor odhalil nedoložená čísla u příkladů 8 a 9 (220 km/650 km) — přepsáno
na přesná čísla z prezentace Pohyb (snímky 26–27): 231 km/42 km/h a
585 km/450 km/h, viz KE-SCHVALENI.md bod (6).
F9 1. celek `magneticke-pole` HOTOV 3/3 (magnety-magneticke-pole-opakovani,
elektromagnet, magneticke-pole-vodice-a-civky), všechna přes nezávislého
kontrolora, zapsáno `podtema.mjs`, build a `zkontroluj.mjs` procházejí.
F9 2. celek `indukce-a-stridavy-proud` (5 podtémat) 3/5 zapsáno
(elektromagneticka-indukce, pusobeni-pole-na-vodic-elektromotor,
vznik-stridaveho-proudu-alternator) — vlastnosti-stridaveho-proudu u
kontrolora, transformator v opravě.
F7 2. celek `sily-kolem-nas` (5 podtémat) 4/5 zapsáno (sila, skladani-sil,
teziste, treci-sila) — gravitacni-sila v opravě.

F7 2. celek `sily-kolem-nas` HOTOV 5/5, F9 2. celek `indukce-a-stridavy-proud`
HOTOV 5/5 — obojí přes `podtema.mjs`, každé podtéma nezávislý kontrolor opus,
většinou stačila 1 opravná smyčka (nejčastější nález = vypadlá věta/bod
z dosavadního bloku). Souhrn: F8 celky 1–4, F7 celky 1–2, F9 celky 1–2 hotové
= 32 podtémat. F7 3. celek `jednoduche-stroje` HOTOV 4/4 (pusobeni-teles-a-deformace,
kladka, naklonena-rovina, paky zapsány přes `podtema.mjs`; u kladky a nakloněné roviny
neexistuje podklad učitele — viz KE-SCHVALENI.md bod 10). F9 3. celek
`elektricky-proud-v-latkach` HOTOV 6/6 (vedeni-proudu-v-kapalinach,
polovodice-typu-n-a-p-dioda, polovodice-vlastni-vodivost, prenos-elektricke-energie,
chemicke-zdroje-napeti, vedeni-proudu-v-plynech), vše přes `podtema.mjs`, build
a `zkontroluj.mjs` procházejí. Souhrn: F8 celky 1–4 (17), F7 celky 1–3 (13),
F9 celky 1–3 (14) = 44 podtémat. DALŠÍ: 4. celky F7 `tlak-v-kapalinach` (3)
a F9 `elektricka-energie-a-bezpecnost` (2) — už se píší; pak 5. celky včetně
F8 `elektrina` (15).

**Stav 21. 9. 2026:** F7 4. celek `tlak-v-kapalinach` 2/3 zapsáno (`tlak`,
`pascaluv-zakon` přes `podtema.mjs`, build a `zkontroluj.mjs` procházejí;
`hydrostatika` na opakované kontrole). F9 4. celek `elektricka-energie-a-bezpecnost`
0/2 (oba u kontrolorů).

**Stav 21. 9. 2026:** F7 4. celek `tlak-v-kapalinach` HOTOV 3/3
(`hydrostaticky-tlak` doplněn přes `podtema.mjs`, build a `zkontroluj.mjs`
procházejí). F9 4. celek `elektricka-energie-a-bezpecnost` HOTOV 2/2
(`elektricka-energie-a-premeny`, `ucinky-proudu-bezpecnost`). Souhrn:
F8 celky 1–4 (17), F7 celky 1–4 (16), F9 celky 1–4 (16) = 49 podtémat.
DALŠÍ: 5. celky — F7 `vztlakova-sila-a-plovani-teles` (2), F8 `elektrina`
(15), F9 `jaderna-fyzika` (4). 8 workerů spadlo na limitu API 21. 9.
~17:00, znovu spustit.

**Stav 21. 9. 2026:** F9 5. celek `jaderna-fyzika` HOTOV 4/4 (`jaderna-energie-a-reakce`,
`jaderny-reaktor-elektrarna`, `jadro-atomu`, `radioaktivita` — vše přes
`podtema.mjs`, build a `zkontroluj.mjs` procházejí). F8 5. celek `elektrina`
1/15 zapsáno (`chemicke-zdroje-napeti`), 4 u kontrolorů (náboj, pole, vznik
proudu, obvody), 4 se píší (proud měření, napětí měření, proud v kovech,
závislost odporu), 6 čeká. F7 5. celek `vztlakova-sila-a-plovani-teles` 0/2
(oba na opakované kontrole). Souhrn hotových podtémat: 49 + 4 + 1 = 54.
Do KE-SCHVALENI.md bod 16: F9 Jaderný reaktor — rozpor „tři vs. dva vodní
okruhy" mezi dosavadním webem a popisem prezentace, ponecháno dosavadní;
body 17–19: poločas radonu, relativní atomová hmotnost a odpudivá síla
230 N (mimo rozsah), chemické zdroje — nepřesnost v PDF u lithiových
článků a návrh vzorce t = Q : I.

**Stav 21. 9. 2026:** F7 5. celek `vztlakova-sila-a-plovani-teles` HOTOV 2/2
(`archimeduv-zakon`, `telesa-stejnoroda-a-nestejnoroda` — přes `podtema.mjs`,
build a `zkontroluj.mjs` procházejí; F7 celky 1–5 hotové = 18 podtémat).
F8 5. celek `elektrina` 4/15 zapsáno (chemické zdroje, `elektricky-naboj`,
`elektricke-pole`, `vznik-elektrickeho-proudu`), u kontrolorů/oprav: obvody,
proud měření, napětí měření, proud v kovech, závislost odporu, Ohmův zákon;
čeká 5: zapojení za sebou, vedle sebe, rezistor, elektrická práce a výkon,
účinky proudu. Souhrn hotových: 54 + 5 = 59. Zkouška delegace na Hermese/
GPT-5.5 zrušena učitelem („Hermes pracuje nekvalitně"). Do KE-SCHVALENI.md
bod 20: F7 Tělesa stejnorodá — rozpor hustot: prezentace ocel 7 800, vzduch
1,2 kg/m³ vs. web 8 000 a „asi 1" (ponecháno kvůli celým číslům); bod 21:
F8 Vznik proudu — dohodnutý směr proudu od + k − není v podkladu ani na
webu, navrženo k doplnění.

**E) POŘADÍ A ÚPLNOST (upřesněno 21. 9. 2026)**

(i) **Pořadí práce** = 1. celek (téma) u ročníků 7, 8, 9, pak 2. celek u všech
tří, atd. — cíl: to, co učitel učí příště, je hotové ve všech ročnících naráz.
Ročník 6 učitel nezmínil, zůstává mimo pořadí, dokud neřekne.

(ii) **„Hotové téma"** = ÚPLNĚ VŠE, co učitel kdy chtěl: výklad podle A–D +
zápis do sešitu + kvíz 21 otázek SLADĚNÝ s novým výkladem (po přestavbě
výkladu se kvíz musí znovu zkontrolovat proti výkladu — nadstavba na konci
je stále učivo, ale otázky z ní patří na konec kvízu) + názornost
(simulace/animace, kde chybí) + české odkazy + vše prošlé nezávislým
kontrolorem.

(iii) **Stav k 21. 9.:** F8 celky 1–4 hotové (mechanická práce a výkon,
energie, tepelné motory, teplo a změny skupenství). Podle bodu E teď běží
1. celky F7 (`pohyb-a-rychlost`, 4 podtémata) a F9 (`magneticke-pole`,
3 podtémata) souběžně, pak 2. celky, atd.; F8 celek 5+ až ve svém pořadí.
Kvízová kontrola sladění s novým výkladem = samostatný krok po každém
celku (zatím neudělán pro F8 celky 1–4 → zařadit).

**PŘEDÁNÍ 21. 9. večer (před /clear):** Hotovo a nasazeno 59 podtémat
(F8 celky 1–4 = 17 + chemické zdroje, náboj, pole, vznik proudu = 4
z elektřiny; F7 celky 1–5 = 18; F9 celky 1–5 = 20). Rozpracovaná F8
elektřina viz `rozpracovane-vyklady/2026-09-21/README.md` (zdroj: scratchpad
staré session `/private/tmp/claude-502/-Users-Shared--kola/c373a426-dfa0-4020-bf85-d07308545470/scratchpad/`).
**Stav 22. 9. 2026: F8 elektřina HOTOVO 15/15** (commit `d491ea0`, nasazeno
a ověřeno curlem na lab.wonderly.cz — `ucinky-proudu-a-bezpecnost`,
`elektricky-proud-v-kovech-odpor`, `elektricke-obvody`). Past: curl na
lab.wonderly.cz bez hlavičky `User-Agent` vrací 403 — ověřovací smyčka musí
posílat `User-Agent`.
**Stav 22. 9. 2026 večer: 6. celky HOTOVO 9/9** — F7 `atmosfera-a-tlak-vzduchu`
(atmosfericky-tlak, pretlak-podtlak-vakuum, meteorologie-a-mereni-tlaku), F8
`zvuk` (kmitani-a-vlneni, zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost), F9
`energie-a-vesmir` (obnovitelne-a-neobnovitelne-zdroje, slunecni-soustava,
vesmir-a-galaxie). Každé podtéma prošlo nezávislým kontrolorem (Opus,
čerstvý kontext) ve 2–3 kolech; zápis `podtema.mjs`; `zkontroluj.mjs` + build
OK. Zdroje: PDF učitele 1:1 (Škola/7/3 Mechanické vlastnosti kapalin 16–18,
Škola/8/6 Zvuk 33–35, Škola/9 str. 21–22); `vesmir-a-galaxie` bez PDF → zdroj
popis prezentace `Omega/dokumenty/prezentace-popisy/9 vesmir_a_jeho_vznik.md`.
Rozhodnutí orchestrátora: PDF má přednost před webem (kromě zjevných chyb
extrakce, např. Torricelli 1643); „stojaté vlnění" z prezentace do kmitání
nezařazeno; 3. Keplerův zákon ponechán s citací PDF str. 23; ZAPIS sluneční
soustavy zkrácen z 39 na 19 bodů (strop ~22). Pracovní složka
`rozpracovane-vyklady/2026-09-22-6-celky/` (výklady + protokoly
kontrola-*-a/b/c.md + README.md) commitnuta. Commity `40b59cb` (F7),
`547cd5f` (F8 zvuk), `104047b` + `e91813c` (F9); push `e91813c`; curl ověřen
(slunecni-soustava, kmitani-a-vlneni, atmosfericky-tlak — ANO). Nález pro
krok (c): `zkontroluj.mjs` hlásí nesoulad čísla galaxií v kvízu (100 vs. 200
dle nového výkladu) — první konkrétní důkaz, že kvízy je nutné sladit. Past
dne: worker někdy vloží cizí značku (`</content>`) nebo poznámku „k rozhodnutí
učitele" — kontrolor to chytá.
DALŠÍ KROK nové session: ~~(a) dokončit F8 elektřina~~ HOTOVO 22. 9. (commit
`d491ea0`); ~~(b) 6. celky~~ HOTOVO 9/9 22. 9. (commit `e91813c`, viz výše);
~~(c) sladění kvízů s novými výklady~~ **HOTOVO 24/24 (22. 9. 2026, noc,
commit `4652cbd`)** — F8 elektřina 15, F7 `atmosfera-a-tlak-vzduchu` 3, F8
`zvuk` 3, F9 `energie-a-vesmir` 3; 2 kola nezávislého kontrolora (1. kolo 144
nálezů, 2. kolo 46 nových po opravách), zapsáno `kvizy.ts` (21 otázek drženo),
brány `uniky.mjs`+`zkontroluj.mjs`+build OK, curl ověřen. **F8 celky 1–4
(17 podtémat)** ~~HOTOVO 41/41 (22. 9. 2026, commit 530c64c)~~ — 1. kolo
91 nálezů (celky 1–2: 48, celky 3–4: 43), 2. kolo 18 nových (10 + 8);
commity `a14c6cd`, `c72728e`, `40dac2a`, `530c64c`; push `530c64c`; curl
ověřen (tani, vykon, spalovaci-motory — ANO). Celkem sladěno 41/41 podtémat.
Odloženo (kosmetika, k drobnostem): `tepelna-vymena-a-teplo` — sjednocení
zápisu „4200"→„4 200" spouští bránu `uniky.mjs` (substring), ponecháno;
zapsáno v `sladeni-kvizu-f8-celky-1-2-2kolo.md`.
DALŠÍ KROK: ~~(i) doplnit odkazy u 7 podtémat~~ HOTOVO 22. 9. — 23 odkazů
(F7 atmosfericky-tlak, pretlak-podtlak-vakuum, meteorologie-a-mereni-tlaku 3+3+3;
F8 kmitani-a-vlneni, zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost 4+4+4;
F9 slunecni-soustava 2), commit `989e549`, push, curl ověřeno. ~~(ii) bod E
kompletní pro 41 přestavěných podtémat~~ HOTOVO 41/41. Nález: F7 celky 1–5
(18 podtémat) a F9 celky 1–5 (20 podtémat) mají výklad HOTOVO, ale kvíz
NESLADĚN s novým výkladem (v běhu 22. 9. — 4 kontroloři: F7 1–2, F7 3–5,
F9 1–2, F9 3–5) — dle definice hotového tématu tedy nejsou hotová, přestože
PROGRESS je vede jako HOTOVO. ~~(iii) dorovnat sladění kvízů F7 celky 1–5 +
F9 celky 1–5 (38 podtémat)~~ HOTOVO 22. 9. — F7 celky 1–5 (18) a F9 celky
1–5 (20): kvíz SLADĚN 22. 9. — 1. kolo 243 nálezů (F9 1–2: 49, F7 1–2: 51,
F7 3–5: 73, F9 3–5: 70), 2. kolo 80 nových (21+14+20+25); čtyři bloky
zkráceny z 22–24 na 21 otázek (magnety-magneticke-pole-opakovani,
prenos-elektricke-energie, chemicke-zdroje-napeti F9,
ucinky-proudu-bezpecnost, jaderny-reaktor-elektrarna); commity `2755995`,
`ec5eb42`, `37f5a32`, `d2ca18f`, `2f62f40`, `0762e8f`, `b4968f2`; push
`b4968f2`; curl ověřen (radioaktivita, hydrostaticky-tlak, transformator —
ANO). Bod E tak splněn u všech 79/79 přestavěných podtémat kromě odkazů u
F7/F9 celků 1–5 (nezjišťováno — viz náměty níže). ~~(iv) F7 7. celek
`svetlo-a-jeho-sireni`~~ **HOTOVO 22. 9. (commit `c453d06`)** — 4/4 podtémata
(svetlo-jeho-zdroje, odraz-svetla, lom-svetla, stin-faze-mesice), zdroje PDF
Škola/7/4 Světlo 19, 21, 24, 20 + popis prezentace SVĚTELNÉ JEVY 7, 2 kola
nezávislé kontroly, `podtema.mjs`, build i `zkontroluj.mjs` OK, curl ověřen
(lom-svetla, stin-faze-mesice — ANO); doloženy a opraveny 2 fyzikální chyby
PDF podkladu (teplota povrchu Slunce, „krvavý Měsíc" —
`Omega/dokumenty/kontrola-podkladu-fyzika7.md`); kvíz F7 světlo zatím
NESLADĚN s novým výkladem — zařadit do kroku sladění spolu se zrcadly. NYNÍ:
(v) F7 8. celek `zrcadla-a-cocky` — **V BĚHU**: 6 výkladů napsáno
(optika-rovinneho-zrcadla, kulova-zrcadla-dute-zrcadlo, opticka-cocka,
oko-vady-oka, rozklad-svetla-duha, vnimani-barev; PDF 22, 23, 25, 26, 28,
29), 1. kolo kontroly: rovinné DROBNOSTI 5, kulová DROBNOSTI 9, čočka
NEPROŠLO 8, oko DROBNOSTI 4, rozklad DROBNOSTI 2, barvy DROBNOSTI 6,
opraváři běží; pracovní složka `rozpracovane-vyklady/2026-09-22-zrcadla/`;
poté sladění kvízů světlo + zrcadla (10 bloků), pak shrnutí F7/F8/F9 (bez
zdrojů); F8 a F9 7. celek = shrnutí (bez zdrojů, auto-skládaný kvíz);
(vi) další celky přestavby podle fronty.
Mezery bran zjištěné při sladění: `zkontroluj.mjs` bod 6d přeskakuje čísla
≤12 (`const MALE = 12`) → neviděl 1,29 vs 1,23 kg/m³; `uniky.mjs` hlásil 0 na
bloky, kde kontrolor ručně našel 10 délkových nápověd (náskok ≥10 znaků) a
5 úniků v 8 blocích — zelené brány ≠ doklad sladění. Doplněno 22. 9. (sladění
F7/F9 1–5): `cisla-ve-vykladu.mjs` přeskakuje otázky s číslem v zadání
(`if (vZadani.length) continue`) → neviděl 200 N vs 175 N, 220 vs 231 km;
`uniky.mjs` porovnává podřetězce přes české skloňování a jen uvnitř bloku →
nevidí obrácené/přeformulované úniky ani duplicity mezi bloky (páky × kladka).
NOVÁ PAST: curl bez
cache-busting parametru vrací z Cloudflare cache starý obsah (cf-cache-status:
HIT); s `?cb=<čas+náhoda>` přijde čerstvý — ověřovací smyčka musí posílat
User-Agent i cache-busting query. Postřeh: `podtema.mjs` má zámek (BUSY) —
souběžné čtení řešit read-only přes `testy/data.mjs`. NÁMĚTY do fronty
[skola2]: (1) `cisla-ve-vykladu.mjs` kontrolovat i otázky s číslem v zadání;
(2) `uniky.mjs` porovnávat i mezi bloky téhož celku a přes tvary slov
(lemmatizace nebo alespoň kmen); (3) zjistit odkazy u F7/F9 celků 1–5.
(d) pravidla: úklid U/D/zadání workerů spuštěn
21. 9. večer (agent mohl doběhnout nebo ne — ověřit `git -C ~/Desktop/Omega
log -3`, `ls ~/.claude/agents/_SPOLECNE.md`, `ls ~/.claude/agents.zaloha-2026-09-21`),
N (22 kandidátů na zkrácení) čeká na výběr učitele v
`Omega/dokumenty/PRAVIDLA-AUDIT-2026-09-21.md` (pokud chybí, kopie je
v `rozpracovane-vyklady/2026-09-21/pravidla-audit.md`); (e) denní rutina
`~/.claude/scheduled-tasks/pravidla-dluh-denne/SKILL.md` založena, ale cron
`30 7 * * 1-6` je třeba zaregistrovat v aplikaci přes `/schedule` — učitel;
(f) `KE-SCHVALENI.md` má 21 bodů k rozhodnutí učitele; (g) Hermes/GPT
delegace zamítnuta učitelem 21. 9.

### 🆕 Nové položky fronty (15. 8. 2026) — cestovatelský deník a příprava

- [cesty] Doplnění starších fotek. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [cesty] Doplnění cest z minulých let. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [příprava] Vyzkoušet průzkumníka přes Hermese na lokálním modelu a porovnat
  výstup s Claude verzí; výsledek zapsat do `METRIKY-KOL.md` do tabulky srovnání
  režimů (řádek režimu B). Tvar volání pro neinteraktivní běh:
  `~/.hermes/hermes-agent/venv/bin/hermes -z "zadání" --provider ollama --model <model>`,
  případně `--provider openrouter --model openai/gpt-5.5`.
  ⚠️ Učitelem uvedený příklad `--model qwen2.5:14b` NEBUDE fungovat — ten model byl
  při úklidu 8. 8. 2026 smazán. Z lokálních je na české texty `gemma4:26b`, na
  kód/dávky `qwen3:30b-a3b`; před spuštěním ověřit `ollama list`.
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md`
  podle prvního měření (viz položka výše). Výchozí tabulka už je zapsaná
  (15. 8. 2026); tahle položka znamená její posun směrem k lokálním modelům tam,
  kde měření ukáže, že stačí.
- [příprava] Přímé srovnání vision: ThinkingCap vs qwen3.8:27b-mlx na jedné dávce
  ~10 map/fotek deníku (stejné obrázky, stejná otázka, `mapa_projde_kontrolou`);
  vítěz nahradí model v automatech. Zadáno 21. 9. 2026.

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### 📥 Nálezy z historie, dosud nevyřešené (přesunuto a otagováno 16. 8. 2026)

- [skola2] Sjednotit odpor lidského těla mezi F8 `ucinky-proudu-a-bezpecnost`
  (100 000 Ω / 1 500 Ω suchá / 1 000 Ω vlhká) a F9 `ucinky-proudu-bezpecnost`
  (150 000 Ω / 2 000 Ω) — žák projde oběma ročníky a dostane dvě čísla pro
  totéž; sjednotit podle F8.
- [cesty] Ručně opravit pořadová čísla u 2 videí na kanálu (přání učitele):
  `u4NmKbMRhiE` a `9Sv4exafb-c` (tvar `01 · DD. MM. · …`) — stroj na ně
  nesahá, titulek psal učitel ručně.
- [cesty] Manifest médií deníku — pro každé místo strojový soupis (zdroje,
  GPS/čas, anonymizace, výběr do galerie/videa, otisk, odkazy); největší
  architektonické vylepšení deníku, samostatné kolo.
- [cesty] Atomická publikace galerií (`nahraj_fotky.py`) — nahrávat do nové
  verze a zveřejnit jedním manifestem, ať výpadek nenechá venku neúplnou galerii.
- [skola2] Typová kontrola (`astro check`) hlásí 5219 chyb — než se zavede
  jako brána, napřed hlášky probrat (samostatný úkol, ne desetiminutovka).
- [skola2] Telemetrii (zdravotní reporty automatů) přesunout do zvláštní
  složky/větve, ať je historie čitelná.
- [skola2] Sjednotit dokumentaci do tří vrstev (až nakonec, je v ní nasbírané
  know-how).
- [skola2] Skript `kontrola_navodu` — deterministická kontrola návodů
  (existence odkazovaných cest, zakázané opsané konstanty, mrtvé křížové
  odkazy); nahradí ruční smyčku po /clear.
- [skola2] Sloučit sandbox testů simulací — 23 kopií prologu (19 rozešlých
  variant, 767 řádků) do sdíleného `testy/sandbox-simulace.mjs` (do kořene
  testy/, NE do simulace/); postup po rodinách s mutací před/po každou.
- [skola2] Rozhodnout: odkazy F9 `chemicke-zdroje-napeti` jsou 4× doslova
  stejné jako u F8 stejného slugu — vada, nebo záměr?

> ⤵️ Starší blok (od původního řádku 235) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- [cesty] **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- [cesty] **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- [skola2] **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz` (rozhodovací tabulka v `KE-SCHVALENI.md`).

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

`node testy/vypis-kviz.mjs <blok>` (vypíše VŠECHNY otázky — hledej duplicitní páry,
délkové měřidlo je neukáže) → `node testy/delky.mjs <blok> --odpovedi` (znění
i délky, dorovnává se bez čtení celého souboru) → opravit → kontrolor → brána →
build → push. Hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
třikrát zachytila, že se týž řetězec v souboru vyskytuje vícekrát nebo vůbec.

> Pozn. 1. 8. 2026: pod tímhle nadpisem byla **podruhé zapsaná fronta úkolů**, která
> si protiřečila s frontou nahoře — a právě podle ní se ráno jelo dorovnávat kvízy,
> ačkoli audit z 31. 7. říkal, že skutečná díra je jinde. Nález auditora strategie.
> **Živá fronta i otevřené dotazy na učitele jsou VŽDY jen v nejhornější sekci.**

## Fronta nápadů (seřazeno podle priority)

### [skola2] ⚡ Nekonzistence bezpečného napětí mezi 8. a 9. ročníkem (zadáno 20. 8. 2026)

Nález nezávislého kontrolora při revizi dávek 7+8 kvízů fyziky 8: `temata.ts:3749`
(8. ročník) uvádí bezpečné napětí ve vlhkých prostorách stejnosměrné **30 V**
(sucho **120 V**), ale `temata.ts:4656` (9. ročník) uvádí obecně stejnosměrné
**25 V**. Sjednotit podle platné normy (rozlišit případně vlhko/sucho i v 9. ročníku,
nebo ověřit, která hodnota je aktuálně správná) — teď se to neopravovalo, jen zapsáno.

### [skola2] 🔒 Rohatka bez klíče tiše projde (zadáno 19. 8. 2026)

Brána `zkontroluj.mjs` čte stropy rohatek z `testy/rohatka.json` vzorem `?? Infinity`.
Když klíč v souboru chybí (překlep, ruční editace, poškozený nebo špatně slitý soubor),
strop se stane nekonečnem a měřidlo **mlčky projde** místo aby build shodilo — zmizí
celá kontrola a nikdo si toho nevšimne, protože build je zelený. Netýká se jen dnes
zavedeného klíče `pocetNaskok10`, ale VŠECH stropů v souboru, například `pocetNejdelsi`.
Řešení: chybějící klíč má být tvrdá chyba (build spadne s hláškou, který klíč chybí),
ne tiché Infinity — nové rohatky se pak musí zakládat vědomě, ne vzniknout nedopatřením.
Doloženo: nezávislý kontrolor 19. 8. 2026 při kontrole prahu délkové nápovědy — po
odstranění klíče brána skončila exit 0.

### [skola2] 🚴 Appka /tour — automatické přepínání mezi velkými závody (zadáno 4. 8. 2026)

Přání učitele: *„aby se to samostatně přepínalo na zrovna aktuální velké závody a vše
šlo automaticky — Vuelta a tak dále."* Rozpracované zadání, ověřený průzkum:

- **Tour, Tour Femmes i Vuelta mají TOTOŽNOU strukturu** (pořadatel ASO): `/en/rankings`
  s ajax adresami `itg`/`ite` i `racecenter.<doména>/api/…` (ověřeno 4. 8. 2026 — všechny
  tři vracejí HTTP 200). **Giro NE** (pořadatel RCS, `/en/rankings` vrací 404) — potřebovalo
  by vlastní parser, řešit až v druhém kroku.
- **Který závod běží, se nemusí hádat z kalendáře**: pro každou doménu zjistit etapu
  z `rankings`, zkusit `pack-<rok>-<etapa+1>` a podívat se na stáří pole `date`.
  Čerstvé (< 15 min) = tenhle závod se právě jede. Volbu závodu cachovat na hodinu,
  ať se to nedotazuje pořád dokola.
- **České jezdce hledat podle seznamu jmen**, ne podle národnosti v tabulce (ta tam není).
  Seznam ~15 českých profesionálů (muži i ženy) natvrdo v kódu, aktualizace jednou za rok.
  POZOR na diakritiku — hledat zkrácené tvary bez koncovky („NOSKOV", „VACEK", „ČERN"…),
  a ověřit, že zkratka nechytá cizí jméno.
- **Lokální modely (ollama) se sem NEHODÍ**: worker běží v Cloudflare, kam lokální model
  nedosáhne, a úloha není jazyková, ale deterministická. Jediné smysluplné využití AI by
  byl překlad anglického živého komentáře — a to by musela dělat Workers AI, ne ollama.
- Mimo sezonu musí stránka umět říct „právě se nejede žádný velký závod" místo pomlček.

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026 — sloučení dvou front, nález auditu)

Škola (web):
- [skola2] Zpřesnit brány kvízové kontroly: `zkontroluj.mjs` bod 6d má
  `const MALE = 12` a přeskakuje tak i menší desetinná čísla (past: 1,29 vs.
  1,23 kg/m³ neodhaleno) — snížit práh nebo přidat kontrolu desetinných čísel;
  do `zkontroluj.mjs` přidat měření náskoku délky správné odpovědi ≥10 znaků
  (`uniky.mjs` délkovou nápovědu nehlídá vůbec, hlásil 0 tam, kde bylo 5 úniků
  v 8 blocích). Zadáno 22. 9. 2026 noc při sladění kvízů 24 podtémat.
- [skola2] `zkontroluj.mjs`: počítadlo otázek (`^\s*text:\s*'`) nepočítá starší jednořádkový
  zápis kvízů — jen kosmetika výpisu, opravit regex (nález 28. 7. u F8 tepelná výměna).
- [skola2] Simulace „Rozpálená kolejnice" (dilatační spára, výpočet prodloužení) — F6/F8.
- [skola2] Simulace „Změř to rukou, nebo teploměrem?" (tři kádinky) — F6 teplota.
- [skola2] Generátor příkladů na průměrnou teplotu s grafem (celá čísla) — F6.
- [skola2] Doplnit kompenzátor (expanzní smyčku) do výkladu teplotní roztažnosti.

Deník:
- [cesty] Opravit 8 VAD z auditu webu 29. 7. (datum „červenec 2026" v EN/DE, neklikací
  piny bez JS, překryv pinů roků, atribuce mapy, video bez datové předpony,
  `satisfies` v preklady.ts) — drobné, bez rozhodování.
- [cesty] Připomínky učitele 29. 7.: úvodní mapa roku začíná doma (jižní Čechy) ·
  u karty místa jen jeho vlastní video · fotogalerie u míst 2026 (náhled + zvětšení).
- [cesty] Stará videa a fotky k bodům starších cest (zadání 2. 8., postup
  v `Cestovatelský deník/KE-SCHVALENI.md`) — začít bodem (a): `videa_k_mistum.py`.

Organizace:
- [skola2] Po sjednocení úložiště modelů znovu ostrý test `graf_local.py` (dva modely).

Čeká na rozhodnutí učitele (přestěhováno tamtéž):
- **Smazat zbloudilé kopie v R2.** V bucketu `wonderly-media` zůstaly dvě kopie na chybném
  klíči `media/fyzika/6-rocnik/teplota/teplotni-roztaznost/polemika-roztaznost-1.mp4` a
  `-2.mp4` (nahrány omylem 16. 8. s prefixem navíc). Správné kopie fungují. Kopie na
  chybném klíči nikdo nečte — smazat? (mazání se neprovádí bez souhlasu)
- **Cloudflare Workers Build dnes jednou spadl bez viditelné příčiny.** 16. 8. 2026
  commit `edb1137` se po pushi na `main` normálně nenasadil (jiné komity ten den se
  propsaly do ~1 minuty, tenhle vůbec). Přes GitHub API zjištěno: check run
  „Workers Builds: wonderly-web" má `conclusion: failure`, ale text chyby nejde
  stáhnout (`Cloudflare Builds API` vrací „Authentication error 10000" — aktuální
  `wrangler` token nemá scope pro Builds API). Lokální `npm run build` přitom prošel
  čistě (469 stránek), takže nešlo o chybu v datech. Obejito ručním
  `npx wrangler deploy` — funguje jako záložní cesta, ale nenahrazuje trvalou opravu.
  Doporučení: podívat se do Cloudflare dashboardu na konkrétní chybu buildu (odkaz
  na build byl v logu agenta) a/nebo doplnit `wrangler` token o Builds scope, ať se
  dá příčina zjistit automaticky příště, místo ručního obcházení.
- [cesty] Referenční tváře 2021 — z kandidátů vybrat a POTVRDIT (přidání tváře = ta osoba
  se přestane rozmazávat, potvrzuje vždy učitel).
- [cesty] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a stará
  skrýt? (YouTube neumí vyměnit soubor.)
- [skola2] Rozhodovací tabulky z 29. 7.: laboratorní práce (12), nové simulace (10),
  UX školy (8).
- [cesty] Rozhodovací tabulka z 29. 7.: mapa+poutavost deníku (14).
- [cesty] 9 videí „k rozhodnutí" — `Cestovatelský deník/KE-SCHVALENI.md`.
- [skola2] Odkaz na video „Teplota a její měření – Fyzika 6" (v soupisu kanálu není).
- [cesty] Návrh: shlukování popisků na úvodní mapě do čtverců („7 míst"), zásah
  do `trasa_uvod.py`, ~1 kolo práce.
- [cesty] **Hudba pod videa podkástů ze Suno** (návrh učitele 16. 8., má předplatné).
  Nerealizováno — vyžaduje přihlášení do jeho účtu Suno a stažení souborů, chce se
  potvrdit rozsah: jen znělka na začátek/konec, nebo podkres celého dílu? Jednotná
  znělka pro celou sérii, nebo jiná ke každému dílu?
  Upřesnění (16. 8.): předplatné Suno Pro, ~2000 skladeb zbývá z 2500/měsíc, komerční
  použití na kanálu povoleno. Cíl A: hudba/podkres pod videa podkastů — čeká se lepší
  kvalita než z lokálního modelu (dosavadní řešení: kreslené animace + ticho/jednoduchý
  podkres, viz [[projekt-animace-podkastu]]). Cíl B: existuje loňská básnička učitele,
  kterou nechal v jiném projektu (repu) přepracovat na písničku — rytmická, svižná;
  potřeba nastavit hlas/styl ve Suno tak, aby to NEZPÍVALY DĚTI (cílovka 2. stupeň,
  dětský zpěv by na ně působil nevhodně/nudně). Pokud se cíl B osvědčí, učitel chce
  zadávat další písničky přímo a přidávat je na web do míst, kde zatím hudba/píseň
  chybí. Realizace čeká, až bude učitel u počítače — přihlášení do Suno účtu a
  stažení výstupů vyžaduje jeho potvrzení v tu chvíli, nejde předschválit dopředu.
- [skola2] **Fahrenheit — formulace.** V dialogu dílu 8 (`teplota-a-jeji-mereni`) zaznělo
  „v anglicky mluvících zemích", reálně se Fahrenheit používá hlavně v USA. Přeformulovat?
- [skola2] **Klementinum — rok.** Sporné číslo (1775 začátek měření vs. 1785/1929 rekord,
  viz otázky výše). V dialogu dílu 8 je zmíněn jen rok 1775 jako začátek měření, sporný
  rekord vynechán. Potvrdit, nebo doplnit správný rok rekordu?
- [skola2] **Přeskoky v pořadí úvodních map videí.** Automat `kontrola_poradi.py`
  dlouhodobě hlásí 8 přeskoků (např. chybí zastávka ballon-d-alsace). Čeká na
  rozhodnutí, jestli se mapy mají předělat.
- [skola2] **Uzemnění — jednosměrná formulace** (viz nález #16). V `temata.ts`
  (~ř. 1196) i v kvízu `kvizy.ts` (~ř. 1574) stojí „Země přijme volné elektrony
  a těleso se vybije" — platí jen pro záporně nabité těleso, u kladně nabitého
  proudí elektrony opačně (ze Země do tělesa). Nový doklad: video dílu 10
  ilustruje právě kladně nabitou cisternu s benzínem, takže obrázek a text si
  u tohoto příkladu odporují (mluvený dialog se pasti vyhnul — mluví neutrálně
  o „odvedení přebytečného náboje"). Návrh: přeformulovat obousměrně na „náboj
  se odvede do země / vyrovná se se zemí". NEOPRAVENO — čeká na rozhodnutí učitele.
- [skola2] **Značení magnetických pólů — N/S vs. S/J (rozpor napříč webem).** Text i kvíz
  značí póly anglicky: `temata.ts` ř. 1121 a 1140, `kvizy.ts` ř. 1453 a 1492 („severní
  (N — north, značí se červeně) a jižní (S — south)", „vycházejí z N a směřují k S").
  Video a dialog dílu 11 ale používají české S = severní (červená) / J = jižní (modrá)
  — všech 13 snímků. Písmeno „S" tak v textu znamená jižní pól a ve videu severní pól,
  tedy přesný opak. Žák, který si pustí video i přečte text, to má proti sobě. Týká se
  i tématu `magneticke-pole` (temata.ts ř. 3885, 3895), nejde o ojedinělý překlep.
  Doporučení: sjednotit na české S/J (běžné v českých učebnicích) a v textu jednou
  větou zmínit, že na koupených magnetech bývá anglické N/S, kde N = severní.
  NEOPRAVENO — jde o volbu konvence, rozhodne učitel. Po rozhodnutí je oprava mechanická
  (text + kvíz, videa už konvenci mají).
- [cesty] **`MISTA.xlsx` otevřený v Excelu** ukazuje starou kopii — zavřít bez ukládání
  (akce pro učitele, ne pro automat).

### [cesty] 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (posouzeno, čeká na pokyn)

Učitel navrhl dát značkám „něco jako referenční fotky obličejů", ze všech států
a v mnoha velikostech. **Posouzeno odborně: tudy ne, ale jádro nápadu je dobré.**

- Reference obličejů řeší **identifikaci** (čí tvář to je), ne hledání. Detekci
  dělá jiný model a reference k ní nepotřebuje.
- U SPZ neselhává identifikace (značky se rozmazávají všechny stejně), ale
  **detekce** — dnešní Haar kaskáda `haarcascade_russian_plate_number.xml`
  hlásí střechu, plot, lavičku i terasu (doloženo v `data/pecliva-videa.log`
  31. 7., dvě zamítnutí po sobě). Katalog vzorů by nepomohl: kaskáda neporovnává
  obrázek s obrázkem, hledá jen přechody světla a tmy. Různé velikosti navíc
  už řeší `detectMultiScale` sama.
- **Co pomůže:** hledat značky jen UVNITŘ nalezených aut (střecha ani plot
  v autě nejsou) — bez cizího `.pt` modelu, který je vědomě zakázaný.
- **Z nápadu si vzít tohle:** sada značek z různých států a velikostí jako
  **zkušební sada pro měření**. Dnes nikdo neví, kolik značek automat přehlédne,
  a bez měření nejde zlepšení doložit.
- Navržené pořadí: (1) změřit dnešní stav na zkušební sadě, (2) přidat kontext
  auta, (3) přeměřit. Čeká na pokyn učitele.

### Další úkoly
- [skola2] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [skola2] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [skola2] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
- [skola2] **Hermes — sjednocení návodů (audit z noci 29. 7.):** `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md`
  — Hermes JE nainstalovaný (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly.
  Návrh: jeden HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md" (Hermes
  md soubory pro Clauda číst UMÍ). Rozhodnutí ráno.
- [skola2] **Automatický restart samostatného režimu po obnově tokenů:** šlo by naplánovanou úlohou
  (cron v danou hodinu spustí novou session). Nová trvalá konfigurace → jen se souhlasem.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)

### Polemika F7 „Klid a pohyb tělesa" — zvuk nejde vyrobit z účtu radek_soukromy (10. 9. 2026)

**Hotovo a připraveno k převzetí** (nic z toho se neztratilo):
- tři scénáře trojice v `~/Desktop/Omega/podkasty-scenare/7/`:
  `klid-a-pohyb-telesa-relativnost-dialog`, `-trajektorie-dialog`, `-draha-dialog`
  (2 872 / 2 783 / 2 644 znaků, tedy pod stropem 4 700)
- ke každému hotový `.scenosled.json` se štítkem `"skupina": "klid-a-pohyb-telesa-7"`
- **pokrytí kvízu 21 z 21 otázek doloženo**; brána sama hlásí 19, protože jí u dvou
  otázek chybí model (viz nález níže) — doplňkové posouzení udělal `qwen3:8b`
  a bylo ověřeno obousměrně (ANO na to, co ve scénáři je; NE na jednotku síly
  a hustotu, které tam nejsou)
- nezávislý kontrolor scénářů: 2 nálezy, oba opraveny (krkolomná věta, foneticky
  nesmyslný omyl „es jako sto" nahrazen typickou žákovskou chybou „dé jako dráha")

**Na čem to stojí — dvě nezávislé překážky, obě mimo dosah této session:**
1. `vyrob_omnivoice.py` ukládá zvuk do `/Users/Shared/Škola/podkasty/<rocnik>/`.
   Ta složka patří účtu **radekmicek** (`drwxr-xr-x radekmicek wheel`) a z účtu
   `radek_soukromy` do ní zapsat nejde — `PermissionError` už při `mkdir`.
   Složka `podkasty` navíc zatím vůbec neexistuje.
2. Most na druhý účet (`/Users/Shared/Claude-most/`), kterým by se práce dala
   předat, **neexistuje** — takže ani obchvat není otevřený.

**Vyzkoušeno (2 různé přístupy, dál se netočím):** přímá výroba pod tímto účtem
(napoprvé zastavena pojistkou paměti — správně, model `qwen3:8b` držel 11 GB;
po jeho uvolnění selhala na právech) · předání přes most (most není).

**Zbývá dodělat, až bude cesta otevřená:** zvuk 3 dílů · 12 nových schémat
(k tématu klid/pohyb/trajektorie/dráha neexistuje ani jedno z 307 hotových —
názvy kreseb jsou už zapsané ve scénosledech) · videa · nahrání do R2 · zápis
do `temata.ts`.

**Rozhodnout musí učitel:** má se výroba zvuku dělat z účtu `radekmicek`, nebo
se má složce `/Users/Shared/Škola/podkasty` nastavit zápis i pro `radek_soukromy`?
(Změna práv je zásah do systému, proto se neudělala sama.)

### Nález u brány `pokryti_kvizu.py` — nikdy se nezeptá modelu (10. 9. 2026)
Brána volá `~/bin/ask-local`, jenže **ten soubor neexistuje** (ověřeno `find`
přes ~/bin, Omegu i /Users/Shared). Každá otázka, která neprojde porovnáním slov,
proto vždy propadne jako nepokrytá — hlášku „lokální model není k dispozici, beru
jako nepokryté" nelze odlišit od skutečné díry. Druhá vada: `MODEL = "gemma4:26b"`,
ale ten model na mini vůbec není stažený (`ollama list`: bge-m3, llama3.1,
qwen3:8b, gpt-oss:20b) a s 24 GB RAM by se tam podle pravidla přesnosti ani
neměl cpát. Dokud se obojí nespraví, hlásí brána falešné díry — u této trojice
2 z 21. Oprava je zásah do měřidla, patří k ní obousměrný důkaz.

> Hotové logy dávek revize starších simulací (22. 8. 2026, 37/37 dokončeno) přesunuty do archivu.

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení (22. 8. 2026)
- Kvíz podtématu `cas-a-jeho-mereni` (F6) rozšířen o úlohu s Ozobotem (obvod, obsah, rychlost) na 26 otázek.


Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


> Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026) a úklid 22. 8. 2026 večer:
> migrace do git fronty `wonderly-fronta/prijate/` ověřena hotová (soubory
> `cesty-9-fotek-saint-sauveur-uklid.md`, `cesty-poloha-zastavky-po-uklidu-zhrubne.md`,
> `cesty-kontaktni-list-anonymizace.md` tam existují) — znění přesunuto do archivu,
> nové položky zakládat jen ve `wonderly-fronta`.

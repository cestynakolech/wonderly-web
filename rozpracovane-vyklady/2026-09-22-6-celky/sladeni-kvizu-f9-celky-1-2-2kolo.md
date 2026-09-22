# Sladění kvízů F9 (celky Magnetické pole + Indukce a střídavý proud) — 2. KOLO
Nezávislá kontrola 22. 9. 2026 po zásahu exekutora (sekce ZAPRACOVÁNO v `sladeni-kvizu-f9-celky-1-2.md`).
Data čtena read-only přes `testy/data.mjs`; všech 8 bloků má **21 otázek** (ověřeno výpisem hlaviček).
Početní otázky přepočítány znovu (`node -e`): 60 V · 20 V · 8 A · 460 W · 100 Hz · 20 ms · 200 period · 0,04 s · 325 V — **vše sedí**.
Délkové náskoky přeměřeny strojově: jediná otázka s náskokem ≥10 je alternátor Q5.
`node testy/uniky.mjs` na těchto osmi klíčích **nehlásí nic** — všechny níže uvedené úniky jsou pro bránu neviditelné (potvrzuje závěr 1. kola).

---

## magnety-magneticke-pole-opakovani — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (všech 7 nálezů 1. kola zapracováno)
NOVÉ:
1. **otázka č. 17 „Proč magnet působí i na předmět…" | duplicita + únik** — nová otázka z nálezu 7 má odpověď „kolem magnetu je magnetické pole", což je totéž, co odpověď Q14 („Kde vzniká magnetické pole? → v okolí (kolem) magnetu"); vysvětlení Q14 („Magnetické pole vzniká v okolí magnetu…") navíc odpověď Q17 přímo dává.
   NÁVRH (Q17 posunout k působení na dálku bez opakování Q14): „Musí se magnet předmětu dotknout, aby na něj působil?" → „ne, působí i na dálku | ano, jinak nepůsobí | ano, musí se dotknout dvakrát" — vysvětlení: „Síla slábne se vzdáleností, ale nezmizí."
2. **otázka č. 15 „Které dva kovy patří spolu se železem…" | únik vzniklý opravou** — vysvětlení „Hliník, měď, zinek a stříbro jsou naopak nemagnetické" dává hotovou odpověď na Q11, protože nález 5 do správné trojice Q11 nově vložil právě **zinek** („papír, korek, zinek").
   NÁVRH (vysvětlení Q15): „Železo, kobalt a nikl jsou tři silně magnetické kovy."
3. **otázka č. 12 „Do které skupiny látek patří uhlík, měď a zlato?" | dvě obhajitelné odpovědi** — distraktor „nemagnetické" je podle výkladu ( „…ale i některé kovy — hliník, **měď**, zinek nebo stříbro") i podle vysvětlení Q15 pro měď správný; jde o zrcadlo nálezu 5 z 1. kola, opravena byla jen jedna strana.
   NÁVRH (vyměnit spornou měď): „Do které skupiny látek patří uhlík a zlato?" → „diamagnetické | feromagnetické | nemagnetické" — vysvětlení: „Magnet je nepatrně odpuzuje, proto diamagnetické."

---

## magneticke-pole-vodice-a-civky — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné (7/7 zapracováno)
NOVÉ:
1. **otázka č. 7 „Co udělá magnetické pole s vodičem…" | únik vzniklý opravou** — náhradní otázka z nálezu 1 má vysvětlení „Čím větší proud a silnější pole, tím větší síla", což je doslova odpověď Q6 („Na čem závisí velikost síly…? → na proudu a síle pole"); obě otázky navíc nesou prakticky identické vysvětlení.
   NÁVRH (vysvětlení Q7): „Vodič s proudem se chová jako magnet, proto ho pole tlačí."
2. **otázka č. 1 „Jak se změní pole cívky, když navineme víc závitů?" | nosná část bez otázky** — tahle nová otázka nahradila původní Q1 „Co vzniká kolem vodiče, kterým protéká proud?", takže **hlavní věta celého podtématu** (kolem vodiče s proudem vzniká magnetické pole) už nemá v bloku žádnou otázku; Q3 a Q4 ji jen předpokládají.
   NÁVRH: ponechat novou otázku, ale vrátit základ místo dubletní Q10 nebo jako výměnu za Q11 (cívka = tyčový magnet): „Co vznikne kolem vodiče, kterým protéká proud?" → „magnetické pole | elektrické jiskry | jenom teplo" — vysvětlení: „Objevil to Oersted: proud v drátu vychýlil magnetku."

---

## elektromagnet — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (7/7 zapracováno, ale nález 3 jen přestěhoval únik — viz NOVÉ 1)
NOVÉ:
1. **otázka č. 8 „K čemu slouží jistič s elektromagnetem?" | únik vzniklý opravou** — nové vysvětlení „Při přetížení silné pole přitáhne kotvu a obvod se rozpojí." je téměř doslova správná odpověď Q16 („Silnější proud posílí pole, to přitáhne kotvu a rozpojí obvod."). Únik se z Q17 jen přesunul na Q16.
   NÁVRH (vysvětlení Q8): „Jistič chrání vedení: při poruše obvod sám odpojí."
2. **otázka č. 15 „Které dvě věci ovlivňují sílu elektromagnetu?" | duplicita + únik** — nová otázka z nálezu 1 je souhrnem Q3 (počet závitů) a Q4 (proud); vysvětlení Q4 „Sílu pole řídíme proudem i počtem závitů." dává její odpověď rovnou. Stejnou látku zkouší ještě Q19 a Q20.
   NÁVRH (nahradit nepokrytou látkou výkladu — relé u závor): „Čím je ovládané relé?" → „slabým proudem v cívce | silným proudem z motoru | ručním klíčem" — vysvětlení: „Slabý proud přes cívku sepne silnější obvod, třeba závory." (a současně zkrátit vysvětlení Q4 na „Proud si sílu pole řídí.")
3. **otázka č. 5 „Kterou výhodu má elektromagnet oproti permanentnímu magnetu?" | duplicita + únik** — s Q21 („Proč je výhodnější než permanentní magnet? → lze ho zapnout a vypnout") zkouší tentýž fakt a nové vysvětlení Q5 „Permanentní magnet drží pořád, elektromagnet jen když teče proud." dává odpověď Q21.
   NÁVRH (vysvětlení Q5): „Proud rozhoduje, kdy magnet drží a kdy ne." + Q21 přepsat na jev z výkladu, který otázku nemá (síla elektromagnetu proti běžnému magnetu): „Jak silný bývá elektromagnet proti obyčejnému magnetu?" → „bývá mnohem silnější | bývá vždy slabší | je stejně silný" — vysvětlení: „Velkou sílu dá hodně závitů a velký proud."

---

## pusobeni-pole-na-vodic-elektromotor — VERDIKT: NESLADĚNO (6)
NEVYŘEŠENÉ: **2** a **3** (obě jen z poloviny)
- nález 2: vysvětlení dnešní Q19 pořád obsahuje „Největší síla naopak vzniká u vodiče v pravém úhlu k čarám." = hotová odpověď Q3 („Kdy je síla největší? → při poloze kolmo k čarám"). Opraveno bylo jen vysvětlení Q3.
  NÁVRH (vysvětlení Q19): „Podél čar pole na vodič netlačí vůbec."
- nález 3: vysvětlení Q8 „Je tvořen cívkami." pořád prozrazuje odpověď Q20 („Co je u elektromotoru rotor? → otáčející se část s cívkami"). Opraveno bylo jen vysvětlení Q20.
  NÁVRH (vysvětlení Q8): „Otáčí se uvnitř statoru."
NOVÉ (všechny tři vlastní otázky exekutora zanesly únik):
1. **otázka č. 16 „Jak se jinak říká rotoru elektromotoru?" | duplicita + únik** — správná odpověď „kotva" je doslova součástí odpovědi Q8 („rotor (kotva)"), otázka tedy nic nezkouší; s Q8 a Q20 jde o trojici na tentýž pojem.
   NÁVRH (nahradit nepokrytým jevem výkladu — ampérmetr): „Který měřicí přístroj využívá otáčení cívky v poli?" → „ampérmetr | teploměr | váhy" — vysvětlení: „Cívka s proudem se v poli natočí a pohne ručičkou." (a v Q8 nechat odpověď jen „rotor")
2. **otázka č. 17 „Kde jinde kromě vysavače, výtahu a tramvaje…" | únik v zadání** — otázka má v textu vypsanou celou správnou odpověď Q11 („vysavač, výtah, tramvaj"), takže Q11 se dá vyřešit bez znalosti.
   NÁVRH: „Kde všude najdeme elektromotor?" → „v elektromobilu i v nářadí | jen v továrních strojích | jen v hračkách" — vysvětlení: „Elektromotor je skoro ve všem, co se z elektřiny hýbe." (a ponechat Q11 beze změny)
3. **otázka č. 18 „Jak přiložíme levou ruku podle Flemingova pravidla…" | únik v zadání** — zadání prozrazuje odpověď Q13 („Čím určíme směr magnetické síly? → pravidlem levé ruky").
   NÁVRH: „Jak přiložíme ruku, abychom určili směr síly na vodič?" → „siločáry do dlaně, prsty po proudu, palec ukáže sílu | prsty do dlaně, palec po proudu, siločáry ukáží sílu | dlaň k vodiči, palec ukáže teplo" — vysvětlení: „Dlaň přijímá siločáry, prsty míří po proudu, palec ukáže sílu."
4. **otázka č. 16 (vysvětlení) | tvrzení bez opory** — „Kotva je lidový název pro tuhle část motoru." Výklad říká jen „Rotor, kterému se říká také kotva" — o lidovém (nespisovném) názvu tam není nic; kotva je běžný odborný termín.
   NÁVRH: viz NOVÉ 1 (otázku nahradit); pokud zůstane, vysvětlení: „Rotoru se v technice říká také kotva."

---

## elektromagneticka-indukce — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (6/6 zapracováno)
NOVÉ:
1. **otázka č. 19 „Co se musí u cívky dít, aby se indukovalo napětí?" | duplicita + únik vzniklý opravou** — náhrada z nálezu 4 vrátila zpátky přesně tu vadu, kterou nález 5 odstraňoval: odpověď „musí se měnit magnetické pole" je obsahem odpovědi Q1 („Co je elektromagnetická indukce? → vznik napětí při změně pole") a vysvětlení Q1 („Klíčová je ZMĚNA magnetického pole.") ji dává doslova; navíc je to zrcadlo Q4 (magnet nehybně leží → nic).
   NÁVRH (nahradit nepokrytou částí výkladu — jednotka indukovaného proudu ze ZÁPISU): „V jakých jednotkách měříme indukovaný proud Iᵢ?" → „v ampérech | ve voltech | v hertzích" — vysvětlení: „Proud se vždy měří v ampérech, napětí ve voltech."

---

## vznik-stridaveho-proudu-alternator — VERDIKT: NESLADĚNO (4)
NEVYŘEŠENÉ: **5** (exekutor sám zapsal jako ODCHYLKU) — Q17 („Proč se u alternátoru proud pravidelně obrací směr? → protože se při otáčení pravidelně mění směr pohybu **vodiče** v poli") pořád stojí na otáčející se cívce, zatímco Q15 a Q16 učí, že se otáčí rotor s magnetem a vinutí statoru stojí. Žák dostane dvě neslučitelná tvrzení.
  NÁVRH (Q17 bez pohybujícího se vodiče): „Proč se proud z alternátoru pravidelně obrací?" → „otáčející se magnet mění směr pole u cívky | cívka se střídavě ohřívá a chladí | kroužky přepínají proud ručně" — vysvětlení: „Jednou k cívce míří severní pól, pak jižní — a proud se otočí."
NOVÉ:
1. **otázka č. 21 „Jaké napětí vznikne ve statoru s jedinou cívkou?" | únik** — nová otázka z nálezu 3 má vysvětlení „Tři cívky dají tři fáze, jedna cívka jednu.", což je hotová odpověď Q8 („Kolik cívek má stator pro třífázové napětí? → tři").
   NÁVRH (vysvětlení Q21): „Jedna cívka = jedna fáze; takové napětí je jednofázové."
2. **otázka č. 5 „Jakou energii alternátor přeměňuje na elektrickou?" | délková nápověda** — správná odpověď „pohybovou (rotační)" má 19 znaků proti 9 a 9 u obou distraktorů (náskok **10**, jediná taková otázka ve všech osmi blocích).
   NÁVRH: „pohybovou | světelnou | chemickou" — vysvětlení: „Otáčení rotoru se mění na elektřinu."
3. **otázka č. 17 (znění) | nečeská věta** — „Proč se u alternátoru proud pravidelně obrací směr?" je gramaticky vadné (buď „proud obrací směr", nebo „směr proudu se obrací").
   NÁVRH: viz znění v části NEVYŘEŠENÉ.

---

## vlastnosti-stridaveho-proudu — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: **1 (část c)** — třetí „příklad z hodiny" (maximální napětí 140 V → efektivní 140 : 1,4 = 100 V) pořád nemá v bloku otázku; Q16 zkouší jen opačný směr (násobení číslem 1,4). Nález sám návrh nedal, exekutor doplnil jen a) a b).
  NÁVRH (přidat místo duplicitní dvojice Q3/Q4 nebo místo Q5): „Na cívce naměříme maximální napětí 140 V. Jaké napětí ukáže voltmetr?" → „100 V | 140 V | 196 V" — vysvětlení: „U = Uₘ : 1,4 = 140 : 1,4 = 100 V."
NOVÉ:
1. **škrtnutá otázka „Kterou hodnotu naměří běžný přístroj?" | nosná část bez otázky** — exekutor ji smazal nad rámec nálezů (sám označil jako ODCHYLKU) a tím zmizela jediná otázka na větu výkladu „Právě efektivní hodnotu ukazují měřicí přístroje jako voltmetr"; Q7 se ptá jen na význam efektivní hodnoty, ne na to, co přístroj ukazuje. Bez otázky zůstala i věta „maximální hodnota nastane dvakrát za periodu" (škrtnutá Q19).
   NÁVRH (vrátit jednu z nich místo Q3 nebo Q6): „Kterou hodnotu napětí ukáže voltmetr v zásuvce?" → „efektivní (230 V) | maximální (325 V) | nulovou" — vysvětlení: „Přístroje ukazují efektivní hodnotu, špičku sledovat neumějí."

---

## transformator — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (6/6 zapracováno)
NOVÉ:
1. **otázka č. 3 „Co se s energií stane při průchodu transformátorem?" | duplicita + únik vzniklý opravou** — náhrada z nálezu 1 zkouší totéž co Q10 („Jaká je účinnost dobrého transformátoru? → až 98 %") a její vysvětlení „Projde až 98 ze 100 dílů energie." dává odpověď Q10 doslova.
   NÁVRH (Q3 nahradit nepokrytou látkou — oddělení obvodů/jádro, nebo primární cívkou): „Jak se jmenuje cívka, do které napětí přivádíme?" → „primární | sekundární | indukční" — vysvětlení: „Do primární napětí přivádíme, ze sekundární ho odebíráme."
2. **otázka č. 16 „Kde se využívá transformace napětí dolů?" | únik** — vysvětlení „…ne velké napětí pro dálkový přenos." dává odpověď Q17 („Kde se využívá transformace nahoru? → přenos energie a svíčka auta").
   NÁVRH (vysvětlení Q16): „Nabíječka i zásuvka potřebují malé, bezpečné napětí."
3. **otázka č. 2 „Z čeho se transformátor skládá?" | duplicita** — odpověď „dvě cívky na společném jádře" je totéž co odpověď Q12 („Co mají obě cívky společné? → jsou navinuté na jádře").
   NÁVRH (Q12 nahradit nepokrytým faktem výkladu): „Čím jsou primární a sekundární obvod spojené?" → „jen magnetickým polem v jádře | společným drátem | vzduchem mezi cívkami" — vysvětlení: „Cívky se elektricky nedotýkají, energii přenáší pole v jádře."

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 21 nálezů 2. kola zapracováno do `src/data/kvizy.ts`, včetně obou nevyřešených bodů z 1. kola (pusobeni-pole-na-vodic-elektromotor Q19/Q8, vznik-stridaveho-proudu-alternator Q17, vlastnosti-stridaveho-proudu chybějící otázka „140 V → 100 V"). Všechny NÁVRHY z protokolu použity, u dvou míst upraveny proti doslovnému znění, protože jejich strojové zavedení samo vytvořilo nový únik (bráně `uniky.mjs` neviditelný v protokolu, ale zachycený po zapsání):
- elektromagnet: místo NÁVRHU „Čím je ovládané relé?" (duplikuje existující Q17 „Jak relé ovládá silný proud…") nová otázka „Kde ještě kromě jeřábu, zvonku a jističe pracuje elektromagnet?" → elektromotor.
- vlastnosti-stridaveho-proudu: vysvětlení nové otázky o 140 V/100 V zbaveno čísla „1,4" (prozrazovalo Q16 o násobiteli) a nová otázka „Kterou hodnotu ukáže voltmetr v zásuvce?" zbavena čísel „230 V"/„325 V" (prozrazovaly jiné otázky se stejnou zásuvkou).

Ověřeno: `node testy/vypis-kviz.mjs <klic>` = 21 u všech 8 bloků, `node testy/uniky.mjs` = 0 duplicit / 0 úniků, `node zkontroluj.mjs` = 0 nálezů k těmto klíčům, `npm run build` bez chyb (481 stránek).

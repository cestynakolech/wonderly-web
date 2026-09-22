# Sladění kvízů s přestavěnými výklady — F9, celky 3–5

Kontrola 22. 9. 2026. Zdroj dat: `testy/data.mjs` (skutečná data webu, ne regex).
Pravidla: `OBSAH-PRAVIDLA.md` kap. 4. Typy nálezů: (a) fakta/čísla jinak než ve výkladu,
(b) látka vypuštěná z výkladu, (c) nosná část výkladu bez otázky, (d) délková nápověda / únik.

Pozn.: `podtema.mjs get` hlásil `BUSY: another podtema operation holds the lock`
(zámek drží jiný proces) — výklady načteny read-only přes `testy/data.mjs`, což je táž data.

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/prenos-elektricke-energie — VERDIKT: NESLADĚNO (5)
Počet otázek: 22 (cíl 21 splněn).

1. **(a) ot. 9 „Co dělá rozvodna?"** — distraktor „mění velikost napětí v síti" je podle výkladu
   PRAVDIVÝ („V **rozvodnách** se napětí sníží nejdřív na 110 kV, pak na 22 kV"), otázka má tedy
   dvě správné odpovědi.
   NÁVRH: „Co dělá rozvodna kromě změny napětí?" →
   „rozvádí proud do více větví sítě" | „vyrábí elektřinu z uhlí" | „ukládá energii do baterií".
   Vysvětlení: „Rozvodna spojuje vedení z různých směrů a jednotlivé větve umí zapnout i vypnout."

2. **(d) ot. 3 × ot. 17** — dvojice na tentýž fakt (230 V fáze–zem / 400 V mezi fázemi) s prohozenými
   odpověďmi; vysvětlení ot. 3 („Mezi dvěma fázemi navzájem je napětí vyšší") a ot. 17 („Napětí mezi
   fází a zemí je nižší") si navzájem prozrazují odpověď.
   NÁVRH: ŠKRTNOUT ot. 17 a NAHRADIT (nepokrytý pojem „přenosová soustava"):
   „Jak se jmenuje část sítě, která vede proud dálkovým vedením mezi vysokými stožáry?" →
   „přenosová soustava" | „domovní rozvod" | „ochranné pásmo".
   Vysvětlení: „Tahle část sítě přenáší energii na velké vzdálenosti při velmi vysokém napětí."

3. **(c) nosné části výkladu bez otázky** — nadzemní × podzemní vedení; ochranná zařízení
   (přepěťové ochrany); převod 1 kV = 1 000 V (ZAPIS/jednotky).
   NÁVRH a: ŠKRTNOUT ot. 20 („Proč jsou dálková vedení zavěšena vysoko" — tentýž fakt jako ot. 8)
   a NAHRADIT: „Kudy vede elektrické vedení ve městech nejčastěji?" →
   „pod zemí" | „po střechách domů" | „vzduchem bez drátů".
   Vysvětlení: „Vedení může být nadzemní i podzemní — ve městech vedou kabely často pod zemí."
   NÁVRH b: ŠKRTNOUT ot. 2 („Kolik vodičů se vede při dálkovém přenosu" — viz nález 5)
   a NAHRADIT: „Co chrání síť a odběratele při bouřce?" →
   „přepěťová ochrana" | „chladicí věž" | „měnič frekvence".
   Vysvětlení: „Síť chrání ochranná zařízení, třeba přepěťové ochrany."

4. **(a) ot. 12, vysvětlení** — „P = U·I: vyšší U → menší I → menší ztráty (rostou s I²)" uvádí dva
   vzorce, které ve výkladu nejsou (výklad jen slovně: menší proud → menší ztráty).
   NÁVRH vysvětlení: „Při vyšším napětí stačí na stejný výkon menší proud a se slabším proudem se
   ve vedení ztratí méně energie."

5. **(d) ot. 2 × ot. 14 × ot. 18** — tři otázky se správnou odpovědí „tři"; vysvětlení ot. 14
   („proto vznikají tři fáze proudu") prozradí ot. 18 i ot. 2.
   NÁVRH: ŠKRTNOUT ot. 2 (viz náhrada v nálezu 3b) a vysvětlení ot. 14 zkrátit na:
   „Jedna cívka by dala jen jednofázový proud."

Přepočty: nejsou (blok bez příkladů). Délka: ot. 9 (+5), 10 (+7) — pod prahem 10, v pořádku.

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/vedeni-proudu-v-kapalinach — VERDIKT: NESLADĚNO (8)
Počet otázek: 21.

1. **(d) DUPLICITA ot. 6 × ot. 18** — „Jak se nazývají kapaliny vedoucí proud → elektrolyty"
   a „Co je společné pro roztoky solí, kyselin a zásad → Nazývají se elektrolyty".
   NÁVRH: ŠKRTNOUT ot. 18 a NAHRADIT (ZAPIS bod „podobný princip: akumulátory"):
   „Na jakém podobném principu jako elektrolýza fungují akumulátory?" →
   „na pohybu iontů v kapalině" | „na pohybu vzduchu v trubici" | „na hoření paliva uvnitř"
   Vysvětlení: „I v dobíjecí baterii přenášejí náboj ionty v kapalině."

2. **(d) DUPLICITA ot. 10 × ot. 19** — obě mají doslova stejnou správnou odpověď
   „kvůli vzhledu a ochraně proti korozi".
   NÁVRH: ŠKRTNOUT ot. 19 a NAHRADIT: „Z čeho jsou elektrody ponořené do elektrolytu?" →
   „z kovu nebo z uhlíku" | „ze skla nebo z porcelánu" | „z papíru nebo ze dřeva".
   Vysvětlení: „Do elektrolytu se ponoří dvě kovové nebo uhlíkové tyčinky."

3. **(d) DUPLICITA ot. 9 × ot. 21** — „k pokovování a výrobě čistých látek" × „K výrobě čistých
   látek, například kovů z rudy"; navíc znění ot. 9 prozradí ot. 21.
   NÁVRH: ŠKRTNOUT ot. 21 a NAHRADIT: „Který kov se z rudy získává elektrolýzou?" →
   „hliník" | „železo" | „cín". Vysvětlení: „Výklad uvádí jako příklad hliník."

4. **(d) DUPLICITA ot. 7 × ot. 17** — pitná voda vede díky rozpuštěným minerálům; správná odpověď
   ot. 7 („ano, obsahuje rozpuštěné minerály (ionty)") je doslova odpovědí ot. 17.
   NÁVRH: ŠKRTNOUT ot. 17 a NAHRADIT: „Které plyny se získají rozkladem vody elektrolýzou?" →
   „vodík a kyslík" | „dusík a helium" | „chlor a neon".
   Vysvětlení: „Z vody se uvolní vodík a kyslík, chlor vzniká z roztoku soli."

5. **(d) ot. 5, vysvětlení** — „Elektrody se jmenují podle iontů, které přitahují." je doslova
   správná odpověď ot. 16.
   NÁVRH vysvětlení ot. 5: „Katoda i kationty začínají stejně — proto se k sobě hodí."

6. **(d) ot. 1 × ot. 13** — zadání ot. 13 („Proč destilovaná voda nevede elektrický proud?")
   prozrazuje odpověď „ne" u ot. 1.
   NÁVRH: ŠKRTNOUT ot. 13 a NAHRADIT: „Které ionty vzniknou ve vodě z kuchyňské soli?" →
   „Na⁺ a Cl⁻" | „H⁺ a O²⁻" | „Fe²⁺ a Cu²⁺".
   Vysvětlení: „Voda rozpustí mřížku soli na sodík a chlor."

7. **(a) ot. 12 „Na které elektrodě se při pokovování vylučuje kov"** — výklad o vylučování kovu na
   katodě nic neříká, uvádí jen „na předmět se nanese tenká vrstva jiného kovu". Látka navíc.
   NÁVRH: „Co se při pokovování nanese na předmět?" →
   „tenká vrstva jiného kovu" | „tenká vrstva plastu" | „tenká vrstva skla".
   Vysvětlení: „Pozlacení, pochromování, pozinkování."

8. **(d) délková nápověda — 7 otázek z 21 nad prahem**: ot. 7 (+31), ot. 8 (+34), ot. 9 (+19),
   ot. 10 (+21), ot. 11 (+16), ot. 12 (+23), ot. 13 (+22) znaků náskoku.
   NÁVRH (příklady): ot. 8 → „látkové změny v elektrolytu" | „ohřev drátu proudem" | „druh dobíjecí
   baterie"; ot. 11 → „ne, až v roztoku" | „ano, vždycky" | „jen v mrazu"; ot. 9 → „k pokovování"
   | „k měření teploty" | „k výrobě zvuku".

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti — VERDIKT: NESLADĚNO (5)
Počet otázek: 22 (cíl splněn).

1. **(d) ot. 3, vysvětlení** — „Zinková nádoba a uhlíková tyčinka." je doslova správná odpověď ot. 4.
   NÁVRH vysvětlení ot. 3: „Tužková i buřtová baterie mají stejné napětí, větší jen vydrží déle."

2. **(d) ot. 17, vysvětlení** — „Ze dvou stejných kovů napětí nevznikne." je jádro správné odpovědi
   ot. 21.
   NÁVRH vysvětlení ot. 17: „Citronová šťáva slouží jako elektrolyt, plíšky se nesmí dotýkat."

3. **(d) ot. 22, vysvětlení** — „u vybíjejícího se článku je anoda naopak záporná" prozrazuje
   odpověď ot. 2 („Jak se nazývá záporná elektroda → anoda").
   NÁVRH vysvětlení ot. 22: „Název elektrody se řídí dějem, který na ní probíhá, ne polaritou."

4. **(c) nosné části výkladu bez otázky** — kapacita v mAh (výklad: „větší jen vydrží déle
   (kapacita v mAh)") a bezpečnostní pokyn „napětí měř vždy měřicím přístrojem, nikdy jazykem".
   NÁVRH: ŠKRTNOUT ot. 11 („Je suchý článek dobíjecí?" — fakt už nese ot. 6 a vysvětlení ot. 11
   „Dobíjecí je až akumulátor") a NAHRADIT:
   „Čím se u baterie udává, jak dlouho vydrží?" →
   „kapacitou v mAh" | „napětím ve voltech" | „hmotností v gramech".
   Vysvětlení: „Napětí má velká i malá baterie stejné, liší se kapacitou."
   NÁVRH b (bez změny počtu): vysvětlení ot. 18 doplnit o „napětí měř voltmetrem, nikdy jazykem —
   a citron pak nejez."

5. **(d) délková nápověda**: ot. 1 (+20), ot. 8 (+22), ot. 9 (+22), ot. 10 (+34).
   NÁVRH: ot. 10 → „při velkém odběru (blesk)" | „jen v autobateriích" | „jen v hodinkách";
   ot. 9 → „vodivý roztok" | „suchý vzduch" | „pevný kus kovu".

Přepočty (sedí): ot. 12: 4 · 1,5 V = **6 V** ✓; ot. 13: 12 : 1,5 = **8** článků ✓;
výklad „Pro zvídavé": 9 : 1,5 = 6 ✓, 18 : 4,5 = 4 ✓. Výsledky celá čísla ✓.

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/vedeni-proudu-v-plynech — VERDIKT: NESLADĚNO (10)
Počet otázek: 21. **Blok vznikl slepením dvou dávek — šest duplicitních párů z 21 otázek.**

1. **(d) DUPLICITA ot. 3 × ot. 15** — „Co je ionizace plynu → vznik iontů uvolněním elektronů
   z molekul" × „Co se stane s molekulami plynu při ionizaci → Uvolní se z nich elektron a vznikne iont".
   NÁVRH: ŠKRTNOUT ot. 15 a NAHRADIT: „Jak dlouhý bývá blesk?" →
   „2 až 3 kilometry" | „2 až 3 metry" | „200 až 300 kilometrů".
   Vysvětlení: „Blesk bývá dlouhý 2 až 3 km."

2. **(d) DUPLICITA ot. 4 × ot. 16** — obě „Proč je vzduch ve velké výšce vodivější" → kosmické záření.
   NÁVRH: ŠKRTNOUT ot. 16 a NAHRADIT: „Mezi čím vzniká elektrický oblouk?" →
   „mezi dvěma uhlíkovými elektrodami" | „mezi dvěma skleněnými tyčkami" | „mezi dvěma magnety".
   Vysvětlení: „Elektrody se nejdřív dotknou a pak mírně oddálí."

3. **(d) DUPLICITA ot. 5 × ot. 17** — obě „Jaký výboj je blesk" → jiskrový.
   NÁVRH: ŠKRTNOUT ot. 17 a NAHRADIT: „Čím si musí chránit oči ten, kdo svařuje?" →
   „brýlemi nebo štítem" | „slunečními brýlemi" | „ničím, světlo je slabé".
   Vysvětlení: „Světlo oblouku je tak jasné, že by poškodilo oči."

4. **(d) DUPLICITA ot. 9 × ot. 20** — obě „využití elektrického oblouku" → svařování.
   NÁVRH: ŠKRTNOUT ot. 20 a NAHRADIT: „V jakých světelných zdrojích se využívá výboj ve zředěném
   plynu?" → „v zářivkách a doutnavkách" | „v klasických žárovkách" | „v olejových lampách".
   Vysvětlení: „Ve skleněné trubici s malým množstvím plynu."

5. **(d) DUPLICITA ot. 10 × ot. 21** — obě „Na čem závisí barva světla výboje" → na druhu plynu.
   NÁVRH: ŠKRTNOUT ot. 21 a NAHRADIT: „Jak se nabije spodní část bouřkového mraku?" →
   „záporně" | „kladně" | „nenabije se".
   Vysvětlení: „Třením kapek a ledových krystalků se spodek mraku nabije záporně, vršek kladně."

6. **(d) DUPLICITA ot. 11 × ot. 18** — obě „Co způsobuje hrom" → rychlé rozpínání ohřátého vzduchu.
   NÁVRH: ŠKRTNOUT ot. 18 a NAHRADIT: „Kdo u nás nezávisle vynalezl bleskosvod?" →
   „Prokop Diviš" | „Jaroslav Heyrovský" | „Jan Evangelista Purkyně".
   Vysvětlení: „Ve stejné době ho vynalezl i Benjamin Franklin."
   (Současně upravit vysvětlení ot. 8 — dnes zní „Vynálezci: Franklin a Prokop Diviš" a nově by
   prozradilo odpověď → „Kovová tyč na střeše svede blesk do země.")

7. **(a) ot. 13 „Proč jiskra snáz přeskočí kratší mezeru → na kratší vzdálenost stačí menší napětí"**
   — o závislosti průrazného napětí na vzdálenosti ve výkladu není ani slovo.
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Kde v autě vzniká malý jiskrový výboj?" →
   „v zapalovací svíčce" | „v alternátoru" | „v chladiči".
   Vysvětlení: „Malé jiskrové výboje využívá zapalovací svíčka."

8. **(a) ot. 12** — „silné elektrické pole" jako pojem ve výkladu není (výklad mluví o dost vysokém
   napětí mezi mrakem a zemí).
   NÁVRH: „Kdy vzduch mezi mrakem a zemí přestane izolovat?" →
   „když napětí naroste dost vysoko" | „když se vzduch ochladí" | „když se zvýší vlhkost trávy".
   Vysvětlení: „Při dost vysokém napětí se vzduch zionizuje a začne vést proud."

9. **(d) ot. 1, vysvětlení** — „Není ale dokonalý izolant." je jádro správné odpovědi ot. 14.
   NÁVRH vysvětlení ot. 1: „Proto musí spotřebiče vést proud po kabelech."

10. **(d) délková nápověda**: ot. 3 (+26), ot. 11 (+20), ot. 7 (+13).
    NÁVRH: ot. 7 → „zvuk je pomalejší" | „hrom vzniká později" | „blesk je hlasitější";
    ot. 11 → „rozpínání horkého vzduchu" | „náraz dvou těžkých mraků" | „praskání kusů ledu".

Přepočet: ot. 19: 340 m/s · 6 s = **2 040 m ≈ 2 km** ✓ (odpověď „asi 2 km" sedí).
Výklad teplotu 20 000–30 000 °C i délku blesku 2–3 km uvádí ✓.

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/polovodice-vlastni-vodivost — VERDIKT: NESLADĚNO (7)
Počet otázek: 21.

1. **(a) ot. 14 „Do které skupiny periodické soustavy patří křemík → IV. skupina"** — výklad o
   skupinách periodické soustavy nemluví vůbec, uvádí jen „Křemík má 4 valenční elektrony".
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Jak dělíme látky podle vedení elektrického proudu?" →
   „na vodiče, polovodiče a izolanty" | „na kovy, plasty a plyny" | „na pevné, kapalné a plynné".
   Vysvětlení: „Polovodič vede proud jen za určitých podmínek."

2. **(a) ot. 21 „Jakou chemickou značku má germanium → Ge"** — značka Ge ve výkladu NENÍ
   (výklad píše „křemík (Si) a germanium").
   NÁVRH: ŠKRTNOUT a NAHRADIT: „K čemu slouží optická závora s fotorezistorem?" →
   „počítá procházející věci" | „měří teplotu v místnosti" | „vyrábí elektrický proud".
   Vysvětlení: „Fotorezistor pozná, kdy se přeruší světlo."

3. **(d) DUPLICITA ot. 5 × ot. 15** — „Co vznikne, když se zahřátím vytrhne elektron z vazby →
   pár volný elektron a díra" × „Co vzniká vždy společně, když se zahřátím vytrhne elektron z
   vazby → pár elektron a díra" (téměř doslovná kopie).
   NÁVRH: ŠKRTNOUT ot. 15 a NAHRADIT (pojem z názvu podtématu, dosud bez otázky):
   „Jak se jmenuje vodivost čistého polovodiče bez příměsí?" →
   „vlastní vodivost" | „cizí vodivost" | „iontová vodivost".
   Vysvětlení: „Nesou ji elektrony i díry, které vzniknou zahřátím."

4. **(d) ot. 1, vysvětlení** — „Dalším je germanium." je doslova správná odpověď ot. 12.
   NÁVRH vysvětlení ot. 1: „Měď i železo jsou kovy, tedy dobré vodiče."

5. **(d) ot. 9, vysvětlení** — „Využívá se i pro velmi vysoké teploty." je doslova správná odpověď
   ot. 16.
   NÁVRH vysvětlení ot. 9: „Odpor termistoru se mění s teplotou, proto se z něj teplota odečte."

6. **(d) ot. 13, vysvětlení** — „Křemík je ve IV. skupině periodické soustavy." je doslova správná
   odpověď ot. 14 (a zároveň látka mimo výklad, viz nález 1).
   NÁVRH vysvětlení ot. 13: „Těmito čtyřmi elektrony je atom spojený se sousedy v krystalu."
   Současně vysvětlení ot. 20 („Ge je značka germania") prozrazuje ot. 21 → viz nález 2,
   nové vysvětlení ot. 20: „Cu je značka mědi, ta je kov a vede výborně."

7. **(d) délková nápověda**: ot. 9 (+22), ot. 5 (+16), ot. 8 (+14), ot. 3 (+13), ot. 2 (+11).
   NÁVRH: ot. 3 → „klesá" | „roste" | „vůbec se nemění"; ot. 9 → „k měření teploty" |
   „k měření osvětlení v místnosti" | „k výrobě zvuku v reproduktoru".

---

## fyzika/9-rocnik/elektricky-proud-v-latkach/polovodice-typu-n-a-p-dioda — VERDIKT: NESLADĚNO (8)
Počet otázek: 21.

1. **(a) ot. 4 a ot. 13 zkoušejí V. a III. skupinu periodické soustavy** — výklad žádné skupiny
   neuvádí, píše jen „prvek, který má o jeden elektron víc (fosfor, arsen, antimon)" a „prvek,
   kterému jeden elektron chybí (bor, hliník, galium, indium)". Dvě otázky z 21 mimo výklad.
   NÁVRH ot. 4: „Jaký prvek přidáme do křemíku, aby vznikl typ N?" →
   „takový, co má o elektron víc" | „takový, co má o elektron míň" | „takový, co má stejně elektronů".
   Vysvětlení: „Elektron navíc zůstane volný — třeba u fosforu."
   NÁVRH ot. 13: „Který prvek přidáme do křemíku, aby vznikl typ P?" →
   „bor" | „fosfor" | „měď". Vysvětlení: „Boru jeden elektron chybí, zůstane po něm díra."

2. **(a+d) ot. 6 × ot. 15** — (i) konkrétní zapojení pólů („N k −, P k +") výklad neuvádí;
   (ii) správná odpověď ot. 6 doslova prozrazuje ot. 15 = duplicita.
   NÁVRH: ot. 6 odpovědi zkrátit na „v propustném směru" | „nikdy" | „vždy stejně";
   ŠKRTNOUT ot. 15 a NAHRADIT (nosná h3 „Tranzistor a čip" bez otázky):
   „Co je čip?" → „křemíková destička s tranzistory" | „druh baterie do mobilu" |
   „kovová fólie kolem drátu". Vysvětlení: „Čipy řídí mobily, počítače i auta."

3. **(d) ot. 8, vysvětlení** — „Mění střídavý proud na stejnosměrný." je doslova správná odpověď ot. 16.
   NÁVRH vysvětlení ot. 8: „Dioda funguje jako jednosměrný ventil — opačně proud zastaví."

4. **(d+a) ot. 10 × ot. 18** — vysvětlení ot. 10 („Je základem fotovoltaických článků.") prozrazuje
   ot. 18; fotovoltaický/solární článek navíc ve výkladu vůbec není.
   NÁVRH: ŠKRTNOUT ot. 18 a NAHRADIT: „Jak se jmenuje polovodič s příměsí?" →
   „nevlastní polovodič" | „vlastní polovodič" | „dokonalý izolant".
   Vysvětlení: „Příměs zvýší vodivost." Nové vysvětlení ot. 10: „Fotodioda reaguje na dopadající světlo."

5. **(d) ot. 11 × ot. 17** — správná odpověď ot. 11 („součástka se 2 přechody PN…") doslova
   prozrazuje ot. 17 („Kolik přechodů PN obsahuje tranzistor → dva").
   NÁVRH: ŠKRTNOUT ot. 17 a NAHRADIT (pojem z výkladu i ZAPIS bez otázky):
   „Jak se jmenuje vodivost v polovodiči typu N?" → „elektronová" | „děrová" | „iontová".
   Vysvětlení: „Proud v typu N nesou volné elektrony."

6. **(d) ot. 9, vysvětlení** — „Svítí jen v propustném zapojení." je jádro správné odpovědi ot. 20.
   NÁVRH vysvětlení ot. 9: „Svítivá dioda dává světlo, aniž by se rozžhavilo vlákno."

7. **(c) další nosná část bez otázky** — „závěrný směr" má jen ot. 7; usměrňovač ot. 16 ✓;
   po opravách výše je pokryt čip i elektronová vodivost.

8. **(d) délková nápověda — 9 otázek z 21**: ot. 5 (+30), ot. 11 (+29), ot. 6 (+22), ot. 8 (+20),
   ot. 4 (+16), ot. 7 (+16), ot. 2 (+11), ot. 12 (+10), ot. 1 (+8).
   NÁVRH: ot. 5 → „styk typu N a P" | „druh dobíjecí baterie" | „silný kovový drát";
   ot. 7 → „je jako vypnutý spínač" | „vede ze všeho nejlépe" | „rozsvítí se a hřeje";
   ot. 8 → „pustí proud jen jedním směrem" | „zesiluje slabý zvuk z mikrofonu" | „měří teplotu vzduchu".

---

## fyzika/9-rocnik/elektricka-energie-a-bezpecnost/elektricka-energie-a-premeny — VERDIKT: NESLADĚNO (3)
Počet otázek: 21.

1. **(d) DUPLICITA ot. 11 × ot. 18** — obě zkoušejí zákon zachování energie; vysvětlení ot. 11
   („Energie nevzniká ani nezaniká") je přímo odpovědí ot. 18 („jen mění formu").
   NÁVRH: ŠKRTNOUT ot. 18 a NAHRADIT (výklad: „nemůže existovat věčný stroj"):
   „Proč nemůže existovat věčný stroj (perpetuum mobile)?" →
   „žádný stroj nevydá víc energie, než do něj dáme" | „nikdo ho zatím nevymyslel" |
   „potřeboval by příliš drahé díly".
   Vysvětlení: „Energie se jen přeměňuje a část vždy skončí jako nevyužitelné teplo."

2. **(d) DUPLICITA ot. 1 × ot. 12** — vařič i žehlička, obě „na tepelnou".
   NÁVRH: ŠKRTNOUT ot. 12 a NAHRADIT (nosný závěr výkladu „jestli je energie užitečná,
   nerozhoduje fyzika, ale náš záměr"):
   „Proč je teplo u přímotopu užitečné, ale u počítače ztráta?" →
   „rozhoduje náš záměr, ne fyzika" | „u počítače je teplo studenější" |
   „přímotop vyrábí jiný druh tepla".
   Vysvětlení: „Totéž teplo je jednou cílem, jindy nechtěným vedlejším produktem."

3. **(d) ot. 13 × ot. 14 si prozrazují odpovědi v distraktorech** — ot. 13 má distraktor
   „mění elektřinu na zvuk pomocí reproduktoru" (= odpověď ot. 14) a ot. 14 distraktor
   „mění zvuk na elektřinu pomocí membrány" (= odpověď ot. 13).
   NÁVRH ot. 13: „mění zvuk na elektřinu" | „mění elektřinu na teplo" | „mění světlo na elektřinu";
   NÁVRH ot. 14: „mění elektřinu na zvuk" | „mění elektřinu na světlo" | „mění teplo na pohyb".

Přepočty: blok je bez číselných příkladů. Délky: ot. 2 (+13), ot. 10 (+12) — doporučeno dorovnat
(„větší odpor a proud" | „menší odpor vodiče" | „nižší napětí zdroje").

---

## fyzika/9-rocnik/elektricka-energie-a-bezpecnost/ucinky-proudu-bezpecnost — VERDIKT: NESLADĚNO (5)
Počet otázek: 24 (cíl splněn).

1. **(c) celá kapitola „Pro zvídavé: počítáme" (I = U : R = 230 : 2 000 = 115 mA) nemá otázku** —
   přitom je to nosný závěr výkladu (proč zásuvka zabíjí i suchého člověka).
   NÁVRH: ŠKRTNOUT ot. 9 (tentýž fakt jako ot. 18 — nebezpečí bez dotyku) a NAHRADIT:
   „Nad 50 V se kůže prorazí a odpor těla klesne na 2 000 Ω. Jaký proud projde tělem ze zásuvky 230 V?"
   → „115 mA" | „15 mA" | „2 mA".
   Vysvětlení: „I = U : R = 230 : 2 000 = 0,115 A, tedy 115 mA — hluboko nad hranicí 80 mA."

2. **(c) hodnota 60 mA (fibrilace) je v ZAPIS, ale žádná otázka ji nezkouší** — ot. 2 se ptá jen na
   druh proudu.
   NÁVRH: ŠKRTNOUT ot. 1 („Je lidské tělo vodič?" — odpověď plyne už ze zadání ot. 5 i ot. 7)
   a NAHRADIT: „Při jakém proudu se srdce roztřese a přestane pravidelně pumpovat?" →
   „60 mA" | „6 mA" | „600 mA".
   Vysvětlení: „Menší proudy působí brnění a křeč svalů, tenhle už rozhodí rytmus srdce."

3. **(c) ZAPIS bod „čím déle proud teče, tím větší poškození" nemá otázku.**
   NÁVRH (bez změny počtu): vysvětlení ot. 3 rozšířit na „Nastane křeč svalů — a čím déle proud
   tělem prochází, tím větší je poškození."

4. **(d) ot. 17, vysvětlení** — „spadlý drát může být pořád pod napětím" je jádro správné odpovědi
   ot. 22.
   NÁVRH vysvětlení ot. 17: „Vedení se nedotýkáme ani nepřímo — tyčí, žebříkem ani dronem."

5. **(a) ot. 16 „podle normy"** — výklad se na žádnou normu neodvolává, mluví o „přísnější mezi ve
   vlhkých a zvlášť nebezpečných prostorách".
   NÁVRH: „Jaké nejvyšší stejnosměrné napětí je bezpečné ve vlhkých prostorách?" →
   „25 V" | „48 V" | „50 V". Vysvětlení: „Ve vlhku platí přísnější mez než v suché místnosti."

Přepočet: 230 : 2 000 = **0,115 A = 115 mA** ✓ shoduje se s výkladem; hranice 0,5–1 / 6–15 / 25 /
60 / 80 mA v otázkách 13, 3, 14, 4 odpovídají tabulce ve výkladu ✓. Délky v pořádku (max +8).

---

## fyzika/9-rocnik/jaderna-fyzika/jadro-atomu — VERDIKT: NESLADĚNO (5)
Počet otázek: 21.

1. **(c) pojem NUKLID má ve výkladu vlastní kapitolu i bod v ZAPIS, ale žádnou otázku.**
   NÁVRH: ŠKRTNOUT ot. 12 („Které atomy jsou méně stabilní → větší (těžší) atomy" — výklad mluví
   o jádru, ne o atomu, a fakt je okrajový) a NAHRADIT:
   „Co je nuklid?" → „atomy se stejným Z i stejným A" | „atomy s různým počtem protonů" |
   „atom bez elektronového obalu".
   Vysvětlení: „Je to jeden konkrétní druh atomu, třeba uhlík 12."

2. **(c) hmotnostní úbytek a E = m · c² jsou ve vzorci v ZAPIS i v kapitole „Pro zvídavé", ale
   žádná otázka je nezkouší.**
   NÁVRH: ŠKRTNOUT ot. 2 („Které částice jsou v obalu atomu" — plyne už z vysvětlení ot. 1 a ze
   zadání ot. 17) a NAHRADIT:
   „Na co se promění hmotnost, která jádru chybí (hmotnostní úbytek)?" →
   „na vazebnou energii" | „na teplo v obalu atomu" | „na nové neutrony".
   Vysvětlení: „Platí E = m · c²; rychlost světla je obrovská, proto stačí malý úbytek."

3. **(c) ZAPIS body „jádro je asi 100 000× menší než atom" a „proton ≈ 1 800× hmotnost elektronu"
   nemají otázku.**
   NÁVRH: ŠKRTNOUT ot. 3 („Jaký náboj má proton" — odpověď nese vysvětlení ot. 2 i ot. 17)
   a NAHRADIT: „Kolikrát je jádro menší než celý atom?" →
   „asi stotisíckrát" | „asi stokrát" | „asi desetkrát".
   Vysvětlení: „Jádro je proti celému atomu opravdu nepatrné."

4. **(d) ot. 8, vysvětlení** — „Např. uran 238: 238 − 92 = 146." ukazuje přímo na distraktor ot. 19
   (146 u ²³⁵U) a napovídá, že správně je jiné číslo.
   NÁVRH vysvětlení ot. 8: „Nukleonové číslo počítá protony i neutrony, protonové jen protony —
   rozdíl jsou neutrony."

5. **(d) délková nápověda**: ot. 8 (+29), ot. 9 (+19), ot. 6 (+14), ot. 11 (+12), ot. 2 (+11).
   NÁVRH: ot. 6 → „počet protonů" | „počet neutronů" | „hmotnost celého obalu";
   ot. 11 → „drží jádro pohromadě" | „odpuzují protony od sebe" | „přitahují elektrony k jádru".

Přepočty (sedí): ot. 18: 14 − 6 = **8** ✓; ot. 19: 235 − 92 = **143** ✓; ot. 21: tritium 1 p + 2 n
= A **3** ✓; výklad: 238 − 92 = 146 ✓, 12 − 6 = 6 ✓, 14 − 6 = 8 ✓. Vše celá čísla ✓.

---

## fyzika/9-rocnik/jaderna-fyzika/radioaktivita — VERDIKT: NESLADĚNO (5)
Počet otázek: 21.

1. **(d) trojice ot. 5 / ot. 16 / ot. 17 si navzájem prozrazuje odpovědi** — vysvětlení ot. 16
   („List papíru stačí jen na slabé záření alfa, olovo nebo beton je potřeba až na gama") obsahuje
   odpověď ot. 5 i ot. 17; vysvětlení ot. 17 („Papír zastaví alfa a tenký hliník beta") obsahuje
   odpověď ot. 5 i ot. 16; vysvětlení ot. 7 („Zastaví ho jen silné olovo nebo beton") odpověď ot. 17.
   NÁVRH vysvětlení ot. 16: „Beta je proud rychlých elektronů — zastaví ho už tenký kovový plech."
   NÁVRH vysvětlení ot. 17: „Gama má nejvyšší energii a potřebuje mimořádně silnou bariéru."
   NÁVRH vysvětlení ot. 7: „Gama je elektromagnetické záření s velmi vysokou energií."

2. **(c) poločas uhlíku 14 (5 730 let) — číslo z výkladu bez otázky** (ot. 10 zkouší jen využití).
   NÁVRH: ŠKRTNOUT ot. 3 („Lze rozpad ovlivnit? → ne" — je i ve vysvětlení ot. 1) a NAHRADIT:
   „Jaký poločas rozpadu má uhlík 14, kterým se určuje stáří nálezů?" →
   „5 730 let" | „57 let" | „5 730 dnů".
   Vysvětlení: „Po této době se přemění přesně polovina uhlíku 14 na dusík."

3. **(c) ochrana proti radonu (větrání, utěsnění domu) je v ZAPIS, kvíz zkouší jen měření (ot. 21).**
   NÁVRH: ŠKRTNOUT ot. 9 („Kolik zůstane po dvou poločasech → čtvrtina" — překrývá se s výpočtem
   v ot. 18) a NAHRADIT: „Jak nejsnáz snížíš množství radonu v místnosti?" →
   „častým větráním" | „zatemněním oken" | „vytápěním na vyšší teplotu".
   Vysvětlení: „Trvalé řešení je utěsnit praskliny a odvést radon mimo dům."

4. **(c) Rutherfordův podíl (dokázal, že záření vychází z jádra) je jen ve vysvětlení ot. 13** —
   ve výkladu je to samostatné tvrzení.
   NÁVRH (bez změny počtu): vysvětlení ot. 1 rozšířit na „Uvolňuje se ionizující záření, které
   vychází přímo z jádra atomu."

5. **(d) délková nápověda**: ot. 4 (+28), ot. 1 (+21), ot. 8 (+18), ot. 11 (+12), ot. 6 (+10).
   NÁVRH: ot. 1 → „rozpad nestabilních jader" | „ohřívání látky zevnitř" | „zvláštní druh elektřiny";
   ot. 8 → „doba rozpadu poloviny jader" | „doba rozpadu všech jader" | „rychlost letu záření".

Přepočet: ot. 18: 80 g → 40 g → 20 g → **10 g** po 3 poločasech ✓ (celá čísla);
ot. 9: po dvou poločasech **čtvrtina** ✓; radon 222 „3,5 dne" ✓ souhlasí s výkladem.

---

## fyzika/9-rocnik/jaderna-fyzika/jaderna-energie-a-reakce — VERDIKT: NESLADĚNO (5)
Počet otázek: 21.

1. **(a) ot. 17 „Kolik neutronů obvykle vznikne při rozštěpení jednoho jádra uranu → dva až tři"**
   — číslo 2–3 ve výkladu NENÍ, výklad říká jen „uvolní se další neutrony".
   NÁVRH: ŠKRTNOUT a NAHRADIT (kapitola „Pro zvídavé: počítáme" nemá otázku):
   „Dusík (A = 14) zasáhne částice alfa (A = 4). Kolik je součet nukleonových čísel před reakcí?"
   → „18" | „14" | „10".
   Vysvětlení: „14 + 4 = 18 a po reakci 17 (kyslík) + 1 (proton) = 18 — počet nukleonů se zachovává."

2. **(b) ot. 18 „Co reguluje výkon řízené řetězové reakce → zasunutí regulačních tyčí"** — regulační
   tyče v tomto výkladu vůbec nejsou (patří do podtématu Jaderný reaktor); otázka navíc prozrazuje
   odpověď ot. 4 a 5 sousedního bloku `jaderny-reaktor-elektrarna`.
   NÁVRH: ŠKRTNOUT a NAHRADIT: „Jaká teplota je v jádru Slunce, kde probíhá fúze?" →
   „asi 15 milionů °C" | „asi 15 tisíc °C" | „asi 15 °C".
   Vysvětlení: „Fúze potřebuje miliony stupňů, proto se jí říká termonukleární reakce."

3. **(a) ot. 20 „Který další prvek se kromě uranu štěpí v reaktorech → plutonium"** — plutonium není
   ve výkladu tohoto ani sousedního podtématu.
   NÁVRH: ŠKRTNOUT a NAHRADIT: „V jakém zařízení lidé zkoumají řízenou fúzi?" →
   „v tokamaku" | „v alternátoru" | „v transformátoru".
   Vysvětlení: „Nezvládnutá fúze naopak pohání vodíkovou bombu."

4. **(a) ot. 11 mluví o „atomové bombě"** — výklad používá „jaderná bomba" a výslovně upozorňuje,
   že „atomová energie" není přesný název; distraktor ot. 12 („v atomové bombě letadla") je navíc
   nesmyslný, tedy sám o sobě nápověda.
   NÁVRH ot. 11: „Kde se využívá neřízená řetězová reakce?" →
   „v jaderné bombě" | „v jaderné elektrárně" | „ve fotovoltaickém panelu".
   NÁVRH ot. 12 distraktory: „v jaderné bombě" | „v obyčejné žárovce".

5. **(drobné, a) ot. 13 „Co platí při jaderné reakci?"** — zadání je useknuté, odpověď
   „nukleonové i protonové číslo" není větou a otázka je kruhová.
   NÁVRH: „Co se při jaderné reakci zachovává?" →
   „počet nukleonů i počet protonů" | „jen počet elektronů v obalu" | „jen celkový náboj obalu".
   Vysvětlení: „Kolik nukleonů a protonů do reakce vstoupí, tolik jich z ní i vystoupí."

Přepočet kapitoly „Pro zvídavé" (sedí): 14 + 4 = 18 = 17 + 1 ✓; 7 + 2 = 9 = 8 + 1 ✓.
Délky bez nálezu (max +1) ✓.

---

## fyzika/9-rocnik/jaderna-fyzika/jaderny-reaktor-elektrarna — VERDIKT: NESLADĚNO (4)
Počet otázek: 24 (cíl splněn).

1. **(d) ot. 5 × ot. 17** — „Jak snížíme výkon → zasuneme tyče hlouběji" a „Jak zvýšíme výkon →
   Vysuneme regulační tyče"; distraktor každé z nich je správnou odpovědí té druhé a vysvětlení
   ot. 17 popisuje obojí.
   NÁVRH: ŠKRTNOUT ot. 5 a NAHRADIT: „Jak se jmenuje místo uvnitř reaktoru, kde probíhá štěpení?"
   → „aktivní zóna" | „kontejnment" | „chladicí věž".
   Vysvětlení: „Aktivní zóna je uvnitř silné ocelové tlakové nádoby."

2. **(a) ot. 14** — odpověď „Tlakovodní reaktor", výklad říká „**vodní tlakový reaktor**"; vysvětlení
   navíc tvrdí, že „voda slouží zároveň jako moderátor i chladicí médium", což ve výkladu není.
   NÁVRH: „Jaký typ jaderného reaktoru je dnes nejrozšířenější?" →
   „vodní tlakový reaktor" | „reaktor chlazený vzduchem" | „reaktor bez moderátoru".
   Vysvětlení: „Nejrozšířenější typ se jmenuje vodní tlakový reaktor."

3. **(c) tlak chladiva 16 MPa je v ZAPIS/jednotkách, ale žádná otázka ho nezkouší** (ot. 12 zkouší
   jen důvod tlaku).
   NÁVRH: ŠKRTNOUT ot. 9 („Který okruh je radioaktivní → primární" — fakt nesou i vysvětlení
   ot. 18 a 19) a NAHRADIT: „Jaký tlak má voda v primárním okruhu reaktoru?" →
   „asi 16 MPa" | „asi 16 kPa" | „asi 16 Pa".
   Vysvětlení: „MPa je megapascal, jednotka tlaku; díky němu voda při 300 °C nevře."

4. **(d) vysvětlení ot. 18 a ot. 19 vyjmenovávají všechny tři okruhy** („Radioaktivní je primární
   okruh a páru pro turbínu vyrábí okruh sekundární"), takže si prozrazují odpovědi navzájem i
   s ot. 9.
   NÁVRH vysvětlení ot. 18: „V sekundárním okruhu vzniká pára, která pohání turbínu s generátorem."
   NÁVRH vysvětlení ot. 19: „Chladicí voda z řeky nebo z věže ochladí páru zpět na vodu."

Délky: jen ot. 13 (+6), pod prahem ✓. Přepočty: blok je bez číselných příkladů;
údaj „1 kg uranu ≈ vagon uhlí" (ot. 20) souhlasí s výkladem ✓.

---

## ⚠️ ze `node zkontroluj.mjs` (doslovně)

```
⚠️  komponenta PolovodicSimulace.astro existuje, ale není zapojená na stránce podtématu
⚠️  kvízy se zlepšily na 565 otázek (20 %) — laťku lze utáhnout: npm run prijmi-latku
⚠️  otázek s obřím náskokem (≥10 znaků) ubylo na 179 — laťku lze utáhnout: npm run prijmi-latku
⚠️  šablony — SestaveniRobotaSimulace: id se skládá výrazem, tahle část se neměří
```

První ⚠️ se týká kontrolovaného celku: podtéma `polovodice-vlastni-vodivost` má v datech
`interakce: "polovodic"`, ale brána hlásí, že komponenta `PolovodicSimulace.astro` není zapojená
na stránce podtématu.

## Poznámka k měřidlu (mimo zadané typy)

`zkontroluj.mjs` hlásí pro celý web „Vazby v kvízech: … **0 duplicit, 0 úniků odpovědí**",
přestože jen v těchto dvanácti blocích je **13 duplicitních dvojic** (nejhorší
`vedeni-proudu-v-plynech`: 6 párů z 21 otázek) a **přes 20 vysvětlení, která doslova nesou
odpověď na jinou otázku téhož bloku**. Měřidlo `testy/uniky.mjs` tedy tyhle případy nevidí.

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 12 bloků upraveno podle nálezů výše a ověřeno `node testy/vypis-kviz.mjs <klic> --otazky` = 21 otázek. Bloky s 22/24 otázkami zkráceny na 21 (přednostně škrtnuty duplicitní/nejslabší otázky z nálezů, zbytek podle vlastního úsudku exekutora s odůvodněním níže):

- prenos-elektricke-energie: zapracováno 5/5 (22→21 — dvě pravdivé odpovědi u „co dělá
  rozvodna" opraveny; duplicita ot. 3/17 napětí 230/400 V vyřešena novou otázkou o přenosové
  soustavě; duplicita ot. 2/20 nahrazena podzemním vedením a přepěťovou ochranou; vzorec
  P=U·I odstraněn z vysvětlení; trojice „tři fáze" zkrácena; navíc škrtnuta otázka o
  transformátorech s trojfázovým proudem jako nejslabší/nejméně nosná pro cíl 21).
- vedeni-proudu-v-kapalinach: zapracováno 8/8 (4 duplicitní páry — elektrolyty, pokovování
  vzhled, výroba čistých látek, pitná voda — nahrazeny akumulátory, materiálem elektrod,
  hliníkem a plyny z elektrolýzy vody; vysvětlení ot. 5 a ot. 12 přepsána, aby neprozrazovala
  jiné otázky; 7× délková nápověda zkrácena).
- chemicke-zdroje-napeti (klíč `elektricky-proud-v-latkach`, ne F8): zapracováno 5/5
  (22→21 — 3 vysvětlení přestala prozrazovat sousední otázky; kapacita v mAh doplněna
  náhradou za duplicitní „je suchý článek dobíjecí"; bezpečnostní pokyn o měření napětí
  doplněn do vysvětlení citronové baterie beze změny počtu; 4× délková nápověda; navíc
  škrtnuta otázka o ploché baterii 4,5 V jako nejslabší — duplicitní koncept sčítání napětí
  se sériovými výpočty v ot. 12/13).
- vedeni-proudu-v-plynech: zapracováno 10/10 (6 duplicitních párů ze slepení dvou dávek
  nahrazeno novým obsahem — délka blesku, elektrický oblouk, ochrana zraku při svařování,
  zářivky/doutnavky, nabití mraku, Prokop Diviš; okrajová „silná mezera/napětí" a „silné
  elektrické pole" nahrazeny jiskrou v zapalovací svíčce a ionizací vzduchu; 3× délková
  nápověda).
- polovodice-vlastni-vodivost: zapracováno 7/7 (skupiny periodické soustavy a značka Ge
  mimo výklad nahrazeny dělením látek a optickou závorou; duplicita vytržení elektronu
  z vazby vyřešena vlastní vodivostí; 3 vysvětlení přestala prozrazovat sousední otázky;
  5× délková nápověda).
- polovodice-typu-n-a-p-dioda: zapracováno 8/8 (skupiny V./III. mimo výklad nahrazeny
  popisem počtu elektronů a konkrétním prvkem bor; konkrétní póly N/P zkráceny na propustný
  směr; čip doplněn místo duplicity; fotovoltaický článek mimo výklad nahrazen nevlastním
  polovodičem; duplicita počtu přechodů PN vyřešena elektronovou vodivostí; 2 vysvětlení
  přepsána; 9× délková nápověda).
- elektricka-energie-a-premeny: zapracováno 3/3 (duplicita zákona zachování energie
  vyřešena otázkou o perpetuu mobile; duplicita vařič/žehlička nahrazena záměrem u tepla;
  vzájemně prozrazující distraktory mikrofonu a reproduktoru opraveny; 2× délková
  nápověda).
- ucinky-proudu-bezpecnost: zapracováno 5/5 (24→21 — přepočet 230:2000=115 mA doplněn
  náhradou za duplicitní otázku o jeřábu; hranice 60 mA fibrilace doplněna náhradou za
  „je tělo vodič"; vysvětlení o délce průchodu proudu i o spadlém drátu přestala prozrazovat
  sousední otázky; norma nahrazena přísnější mezí ve vlhku; navíc škrtnuty 3 otázky z hustého
  klastru o spadlém drátu/vedení — kombajn pod vedením, načasování rizika po bouřce, způsob
  odchodu od drátu — jako nejméně nosné pro cíl 21, jádro tématu zůstalo pokryté).
- jadro-atomu: zapracováno 5/5 (nuklid, hmotnostní úbytek/E=mc² a poměr jádro/atom doplněny
  náhradou za tři okrajové otázky; vysvětlení o uranu 238 přestalo prozrazovat distraktor;
  5× délková nápověda).
- radioaktivita: zapracováno 5/5 (trojice vzájemně prozrazujících vysvětlení alfa/beta/gama
  opravena; poločas uhlíku 14 a ochrana proti radonu doplněny náhradou za duplicitní
  otázky; Rutherfordův podíl doplněn do vysvětlení beze změny počtu; 5× délková nápověda).
- jaderna-energie-a-reakce: zapracováno 5/5 (počet neutronů 2–3 a plutonium mimo výklad
  nahrazeny výpočtem nukleonových čísel a tokamakem; regulační tyče přesunuty do sesterského
  podtématu, nahrazeny teplotou jádra Slunce; atomová bomba přejmenována na jadernou;
  kruhová otázka o zachování čísel přeformulována).
- jaderny-reaktor-elektrarna: zapracováno 4/4 (24→21 — duplicita snížení/zvýšení výkonu
  vyřešena aktivní zónou; tlakovodní/vodní tlakový reaktor sjednocen s výkladem; tlak 16 MPa
  doplněn náhradou za duplicitní otázku o radioaktivním okruhu; vysvětlení sekundárního a
  terciárního okruhu přestala vyjmenovávat všechny tři okruhy najednou; navíc škrtnuty
  otázky o celkovém počtu okruhů a o využití reaktorů mimo elektrárny — fakta pokrývají už
  specifičtější otázky o jednotlivých okruzích).

Druhé kolo `node testy/uniky.mjs` po prvním průchodu odhalilo 6 nových úniků (odpovědi
nových/upravených otázek se prozrazovaly navzájem: nevlastní polovodič, hranice 80 mA,
aktivní zóna, 300 °C nevře, „drží pohromadě" u jaderných sil, proud rychlých elektronů
u beta záření) — všech 6 opraveno přeformulováním vysvětlení nebo odpovědi, pak
`testy/uniky.mjs` = 0 duplicit / 0 úniků na celém webu.

Brány: `node testy/uniky.mjs` → 0 duplicitních párů, 0 úniků (2732 otázek, 150 bloků).
`node zkontroluj.mjs` → 0 ⚠️ vázaných na těchto 12 klíčů (4 preexistující obecná
upozornění webu — PolovodicSimulace nezapojená komponenta, 2× informační hlášky o
zlepšení laťky, šablona SestaveniRobotaSimulace — beze změny, nesouvisí s touto úpravou).
`npm run build` → 481 stránek, bez chyby.

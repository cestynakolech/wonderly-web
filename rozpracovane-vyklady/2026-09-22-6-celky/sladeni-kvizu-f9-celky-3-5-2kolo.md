# 2. kolo kontroly kvízů — F9, celky 3–5 (22. 9. 2026)

Nezávislá kontrola po zapracování nálezů 1. kola. Data: `testy/data.mjs` (skutečná data webu).
Ověřeno: 12× 21 otázek ✓; délková nápověda — ve všech 12 blocích je největší náskok +9 znaků
(ot. 4 chemické zdroje), práh ≥10 nepřekročen nikde ✓; všechny přepočty ověřeny `python3`:
230 : 2 000 = 0,115 A = 115 mA ✓ · 4 · 1,5 = 6 V ✓ · 12 : 1,5 = 8 ✓ · 340 · 6 = 2 040 m ✓ ·
14 − 6 = 8 ✓ · 235 − 92 = 143 ✓ · 14 + 4 = 18 = 17 + 1 ✓ · 80 → 40 → 20 → 10 g ✓ ·
uhlík 14 poločas 5 730 let ✓. Klíč `chemicke-zdroje-napeti` ověřen v cestě
`fyzika/9-rocnik/elektricky-proud-v-latkach/…` (blok F8 `elektrina/…` je jiný, nekontrolován).

---

## prenos-elektricke-energie — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 16 „Jak se jmenuje část sítě, která vede…" | vysvětlení ot. 15 („mnohem méně než dálková
   **přenosová** síť") napovídá odpověď nové ot. 16 („přenosová soustava") — jediná odpověď,
   která slovo „přenosová" obsahuje.
   NÁVRH vysvětlení ot. 15: „Distribuční soustava pracuje s napětím 22 kV — mnohem míň než
   dálkové vedení mezi stožáry, ale pořád mnohem víc, než uvidíš doma v zásuvce."

Drobné mimo počet: vysvětlení ot. 21 („Ochranný vodič svede unikající napětí do země…") nese
odpověď ot. 11 („uzemňuje spotřebič") — pochází z doby před 1. kolem, nezhoršeno.

---

## vedeni-proudu-v-kapalinach — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 13 „Které ionty vzniknou ve vodě z kuchyňské soli" | NOVÁ otázka duplikuje ot. 14
   („Co vznikne, když se ve vodě rozpustí krystal kuchyňské soli? → Kladné a záporné ionty") —
   týž fakt (rozpuštění soli dá ionty), odpověď „Na⁺ a Cl⁻" je jen konkrétnější zápis odpovědi
   ot. 14 a vysvětlení obou mluví o naruš. mřížce. Vznikla nová duplicita místo odstraněné.
   NÁVRH: ŠKRTNOUT ot. 14 a NAHRADIT (nepokrytý bod ZAPIS „mořská voda vede"):
   „Vede mořská voda elektrický proud?" → „ano, je v ní rozpuštěná sůl" | „ne, je slaná" |
   „jen když je teplá". Vysvětlení: „Rozpuštěná sůl dodá vodě ionty."
2. ot. 19 „Proč suchá kuchyňská sůl v pevném stavu nevede" | znění otázky prozrazuje odpověď
   ot. 11 („Vede kuchyňská sůl v pevném stavu proud? → ne, až v roztoku") a vysvětlení ot. 11
   („Ionty se uvolní až ve vodě") je zase jádrem odpovědi ot. 19. Je to táž vada, jakou 1. kolo
   odstranilo u dvojice ot. 1 × ot. 13 (destilovaná voda), jen na jiné dvojici.
   NÁVRH: ŠKRTNOUT ot. 11 (fakt nese ot. 19 i ot. 2) a NAHRADIT:
   „Čím uzavírají obvod náboje uvnitř elektrolytu?" → „pohybem iontů" | „pohybem elektronů" |
   „pohybem molekul vody". Vysvětlení: „V kovu vedou proud elektrony, v kapalině ionty."

---

## chemicke-zdroje-napeti — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: 3 (jen částečně — opraveno bylo vysvětlení, ne znění otázky)
NOVÉ:
1. ot. 21 „Kdy je anoda kladná elektroda, i když…" | ZNĚNÍ otázky obsahuje „i když jinak platí
   „anoda = mínus"" — to je doslova odpověď ot. 2 („Jak se nazývá záporná elektroda galvanického
   článku? → anoda"). 1. kolo opravilo jen vysvětlení ot. 22, únik ale nese samo zadání.
   NÁVRH ot. 21: „Kdy je anoda kladná elektroda, i když u vybíjeného článku platí opak?" →
   odpovědi beze změny.
2. ot. 10 „Čím se u baterie udává, jak dlouho vydrží" | NOVÁ otázka má vysvětlení („Napětí má
   velká i malá baterie stejné, liší se kapacitou.") skoro totožné s vysvětlením ot. 15
   („Velikost článku mění jen kapacitu, ne napětí.") i ot. 3 — ot. 15 tak prozrazuje klíčové
   slovo odpovědi ot. 10 („kapacitou v mAh") a ot. 10 naopak vylučuje distraktor ot. 15.
   NÁVRH vysvětlení ot. 15: „Každý kov posílá elektrony jinak ochotně — napětí vzniká z rozdílu
   mezi oběma kovy."

---

## vedeni-proudu-v-plynech — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 17 „Čím si musí chránit oči ten, kdo svařuje" | NOVÁ otázka + její vysvětlení („Světlo
   **oblouku** je tak jasné…") spojí oblouk se svařováním, a tím prozradí odpověď ot. 9
   („Kde se využívá elektrický oblouk? → při svařování"); opačně vysvětlení ot. 9 („Nutná je
   ochrana zraku.") ukazuje na ot. 17.
   NÁVRH vysvětlení ot. 17: „Záření z takového světla poškodí oči během chvilky."
   a NÁVRH vysvětlení ot. 9: „Teplota oblouku roztaví i ocel."
2. ot. 14 „Proč se nabitý elektroskop časem sám vybije, i když je vzduch špatný vodič" | ZNĚNÍ
   otázky tvrdí, že vzduch je špatný vodič = odpověď ot. 1 („špatně (je skoro izolant)").
   1. kolo opravilo únik jen ve směru ot. 1 → ot. 14; opačný směr zůstal.
   NÁVRH ot. 14: „Proč se nabitý elektroskop časem sám vybije?" → odpovědi beze změny.
3. ot. 15 „Jak dlouhý bývá blesk" | NOVÁ otázka má odpověď „2 až 3 kilometry", zatímco ot. 19
   počítá vzdálenost bouřky „asi 2 km" — dvě různé veličiny se stejným číslem vedle sebe děti
   plete a zároveň napovídá.
   NÁVRH: ot. 15 ponechat a rozpojit čísla v ot. 19 — hrom uslyšíš až za 15 sekund:
   „Hrom uslyšíš 15 sekund po záblesku. Rychlost zvuku je asi 340 metrů za sekundu. Jak daleko
   od tebe bouřka přibližně udeřila?" → „asi 5 km" | „asi 15 km" | „asi 340 m".
   Vysvětlení: „340 · 15 = 5 100 metrů, tedy zhruba 5 kilometrů." (přepočteno: 340 · 15 = 5 100 ✓)

---

## polovodice-vlastni-vodivost — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 21 „K čemu slouží optická závora s fotorezistorem" | ZNĚNÍ nové otázky doslova obsahuje
   odpověď ot. 17 („Kde se využívá fotorezistor? → v optické závoře").
   NÁVRH ot. 21: „K čemu slouží optická závora?" → odpovědi beze změny,
   vysvětlení: „Čidlo pozná, kdy se paprsek přeruší."
2. ot. 15 „Jak se jmenuje vodivost čistého polovodiče bez příměsí" | vysvětlení nové otázky
   („Nesou ji elektrony i díry, které vzniknou zahřátím.") je zároveň odpovědí ot. 5
   („Co vznikne, když se zahřátím vytrhne elektron z vazby? → elektron a díra") i ot. 8
   („Co tvoří elektrický proud v polovodiči? → pohyb elektronů a děr").
   NÁVRH vysvětlení ot. 15: „Vlastní = bez cizí příměsi, jen samotný křemík."

---

## polovodice-typu-n-a-p-dioda — VERDIKT: NESLADĚNO (4)
NEVYŘEŠENÉ: 1 (jen částečně — skupiny periodické soustavy, které ve výkladu NEJSOU, zůstaly
ve vysvětlení ot. 2 „prvky V. skupiny", ot. 3 „prvky III. skupiny" a ve znění ot. 14
„polovodič s příměsí z V. skupiny"; nahrazeny byly jen ot. 4 a ot. 13)
NOVÉ:
1. ot. 13 „Který prvek přidáme do křemíku, aby vznikl typ P" | vysvětlení ot. 3 zní
   „P = pozitivní, prvky III. skupiny (**bor**, hliník)" — doslova odpověď nové ot. 13.
   NÁVRH vysvětlení ot. 3: „Chybějící elektron zanechá v mřížce prázdné místo."
2. ot. 4 „Jaký prvek přidáme do křemíku, aby vznikl typ N" | NOVÁ otázka je jen jinak
   formulovaná ot. 2 („Co přináší příměs do polovodiče typu N? → elektrony navíc") — týž fakt
   dvakrát, navíc vysvětlení ot. 2 jmenuje fosfor stejně jako vysvětlení ot. 4.
   NÁVRH: ŠKRTNOUT ot. 4 a NAHRADIT (nepokrytý pojem z výkladu): „Kolik tranzistorů bývá na
   jednom čipu?" → „miliony" | „přesně dva" | „jeden jediný".
   Vysvětlení: „Proto se na destičku vejde celý počítač."
3. ot. 18 „Jak se jmenuje polovodič s příměsí" | vysvětlení nové otázky („Příměs zvýší
   vodivost.") je odpovědí ot. 1 („Jak zvýšíme vodivost polovodiče? → přidáním příměsi");
   vysvětlení ot. 1 je navíc po opravě kruhové („Taková příměs zvýší jeho vodivost.").
   NÁVRH vysvětlení ot. 18: „Vlastní polovodič je čistý, nevlastní má příměs."
   NÁVRH vysvětlení ot. 1: „Stačí opravdu nepatrné množství cizího prvku."
4. ot. 8 „Co umí dioda" | oprava 1. kola dala ot. 8 vysvětlení „jednosměrný ventil" — přesně tu
   formulaci má vysvětlení ot. 16 („Dioda funguje jako jednosměrný ventil pro elektřinu…"),
   takže únik se jen otočil: ot. 16 teď prozrazuje ot. 8.
   NÁVRH vysvětlení ot. 16: „Ze střídavého proudu propustí jen půlvlny jednoho směru."

---

## elektricka-energie-a-premeny — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 18 „Proč nemůže existovat věčný stroj (perpetuum mobile)" | vysvětlení nové otázky
   („**Energie se jen přeměňuje** a část vždy skončí jako nevyužitelné teplo.") obsahuje doslova
   správnou odpověď ot. 11 („Platí i pro elektrickou energii zákon zachování energie? →
   ano, energie se jen přeměňuje"). Oprava 1. kola únik jen otočila (dřív vedl ot. 11 → ot. 18).
   NÁVRH vysvětlení ot. 18: „Část energie při každé přeměně skončí jako teplo rozptýlené do
   okolí a znovu ji použít nejde."

---

## ucinky-proudu-bezpecnost — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 9 „Nad 50 V se kůže prorazí a odpor těla klesne na 2 000 Ω…" | ZADÁNÍ nové otázky uvádí
   hodnotu 2 000 Ω, což je doslova odpověď ot. 15 („Jaký je přibližně odpor lidského těla
   ve vlhku (mokrá kůže)? → 2 kΩ").
   NÁVRH ot. 15: „Kdy klesne odpor lidského těla na pouhé 2 kΩ?" →
   „při mokré kůži nebo nad 50 V" | „jen při teplotě nad 30 °C" | „jen v suché obuvi".
   Vysvětlení: „Vlhká kůže má malý odpor hned, suchá až po proražení."

---

## jadro-atomu — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 18 a ot. 19 (výpočty neutronů) | obě vysvětlení začínají „Počet neutronů = A − Z" —
   to je doslova odpověď ot. 8 („Jak spočítáme počet neutronů? → A − Z").
   NÁVRH vysvětlení ot. 18: „Od 14 nukleonů odečteme 6 protonů, zbydou neutrony: 14 − 6 = 8."
   NÁVRH vysvětlení ot. 19: „235 nukleonů minus 92 protonů = 143 neutronů; 146 patří ²³⁸U."

---

## radioaktivita — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 3 „Jaký poločas rozpadu má uhlík 14, **kterým se určuje stáří nálezů**" | ZNĚNÍ nové
   otázky prozrazuje celou odpověď ot. 10 („K čemu se využívá izotop uhlíku C 14? → k určování
   stáří vzorků"). Únik vznikl až zapracováním nálezu 2 z 1. kola.
   NÁVRH ot. 3: „Jaký poločas rozpadu má uhlík 14?" → odpovědi beze změny.
2. ot. 3, vysvětlení („Po této době se přemění přesně **polovina** uhlíku 14 na dusík.") | nese
   odpověď ot. 8 („Co je poločas rozpadu? → doba rozpadu poloviny jader").
   NÁVRH vysvětlení ot. 3: „Proto se uhlíkem 14 datují nálezy staré tisíce let."
   (pozn.: platí jen spolu s opravou nálezu 1 — jinak se únik přesune do ot. 10)
3. ot. 16, vysvětlení („**Beta je tvořeno rychlými elektrony** — zastaví je už tenký kovový
   plech.") | nese odpověď ot. 6 („Co je záření beta? → proud rychlých elektronů"). Oprava
   1. kola text jen přeformulovala, takže ho `testy/uniky.mjs` (shoda podřetězce) nevidí,
   ale dítěti odpověď prozradí stejně.
   NÁVRH vysvětlení ot. 16: „Tenký kov záření beta pohltí, papír na ně nestačí."

---

## jaderna-energie-a-reakce — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 18 „Jaká teplota je v jádru Slunce, kde probíhá fúze" | vysvětlení nové otázky
   („**Fúze potřebuje miliony stupňů**…") je odpovědí ot. 15 („Proč se v elektrárnách používá
   štěpení, a ne fúze? → fúze potřebuje obrovskou teplotu"); vysvětlení ot. 15 („Takovou teplotu
   jako na Slunci zatím neumíme dlouho udržet.") ukazuje zpět na ot. 18.
   NÁVRH vysvětlení ot. 18: „Proto se jí říká termonukleární reakce."
2. ot. 17 „Dusík (A = 14) zasáhne částice alfa (A = 4)…" | vysvětlení nové otázky končí
   „…**počet nukleonů se zachovává**" = odpověď ot. 13 („Co se při jaderné reakci zachovává? →
   počet nukleonů i počet protonů").
   NÁVRH vysvětlení ot. 17: „14 + 4 = 18; po reakci vznikne kyslík 17 a proton 1, tedy také 18."
3. ot. 11 × ot. 12 | distraktor ot. 12 („v jaderné bombě") je správnou odpovědí ot. 11
   a naopak distraktor ot. 11 („v jaderné elektrárně") míří na odpověď ot. 12 („v jaderném
   reaktoru") — dvojice si navzájem zužuje výběr na jedinou možnost.
   NÁVRH distraktory ot. 12: „v parní turbíně" | „v obyčejné žárovce".

---

## jaderny-reaktor-elektrarna — VERDIKT: NESLADĚNO (2)
NEVYŘEŠENÉ: žádné
NOVÉ:
1. ot. 12 „Jaký typ jaderného reaktoru je dnes nejrozšířenější" | vysvětlení
   („Nejrozšířenější typ se jmenuje vodní tlakový reaktor.") jen doslova opakuje otázku
   i odpověď — dítě se z něj nic nedozví.
   NÁVRH vysvětlení ot. 12: „Voda v něm slouží jako chladivo a je pod velkým tlakem."
2. ot. 13 „K čemu slouží chladivo v jaderném reaktoru" | distraktor „zpomaluje neutrony na
   vhodnou rychlost" je doslova odpovědí ot. 3 („K čemu slouží moderátor? → zpomaluje
   neutrony"), jejíž vysvětlení navíc zní „Zpomaluje neutrony na rychlost vhodnou pro štěpení."
   NÁVRH distraktory ot. 13: „udržuje v reaktoru stálý tlak" | „pohlcuje neutrony a řídí výkon".

---

## ZAPRACOVÁNO 22. 9. 2026

Všech 25 nálezů (včetně obou nevyřešených z 1. kola) zapracováno do `src/data/kvizy.ts`.
Otázky nebo vysvětlení opraveny podle NÁVRHů z protokolu, u dvou vedeni-proudu-v-kapalinach
a jednoho polovodice-typu-n-a-p-dioda (ot. 4) proveden ŠKRTNOUT+NAHRADIT, ve F9 bloku
vedeni-proudu-v-plynech ot. 19 rozpojena čísla (6 s → 15 s), u polovodice-typu-n-a-p-dioda
navíc odstraněny zbylé odkazy na „V./III. skupinu" (ot. 2 vysvětlení, ot. 14 znění), které
1. kolo nedořešilo. F9 blok `chemicke-zdroje-napeti` (elektricky-proud-v-latkach), ne F8
(elektrina) — ověřeno cestou v `data.mjs`.

Ověřeno: `node testy/vypis-kviz.mjs "9-rocnik/…/chemicke-zdroje-napeti"` = 21 otázek (i ostatních
11 klíčů = 21); `node testy/uniky.mjs` → 0 duplicit / 0 úniků; `node zkontroluj.mjs` → 0 duplicit,
0 úniků, „Vše zapojené správně."; `npm run build` → 481 stránek bez chyby.

---

## Poznámka k měřidlu (mimo zadané typy)

`testy/uniky.mjs` hlásí po opravách 0 duplicit / 0 úniků, přesto je v těchto dvanácti blocích
**25 nálezů**, z toho 8 případů, kdy vysvětlení nebo zadání nese odpověď jiné otázky téhož bloku
jinými tvary téhož slova („rychlých elektronů" × „rychlými elektrony", „optické závoře" ×
„optická závora", „přenosová soustava" × „přenosová síť"). Měřidlo porovnává podřetězce, takže
české skloňování ho spolehlivě obejde — právě tudy prošla většina nálezů 2. kola.

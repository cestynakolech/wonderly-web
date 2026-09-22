# 2. kolo nezávislé kontroly kvízů — F7, celky jednoduche-stroje / tlak-v-kapalinach / vztlakova-sila

Kontrola 22. 9. 2026, nezávislý kontrolor, čerstvý kontext. Nic nezapsáno do `kvizy.ts`.
Měřeno: `node testy/vypis-kviz.mjs <klic> --otazky`, vlastní výpis dat přes `testy/data.mjs`
(otázky + odpovědi + délky + náskok), `node podtema.mjs . get <plná cesta>`, vlastní detektor
úniků (správná odpověď jedné otázky doslova ve znění / vysvětlení / distraktoru jiné otázky),
`node testy/uniky.mjs` (0 duplicit, 0 úniků) a `node testy/uniky-krizove.mjs`.
Všech 9 bloků má 21 otázek. Všechny číselné příklady přepočítány — **všechny sedí a všechny
vycházejí v celých číslech** (600 000 : 10 000 = 60 m; 400 : 5 = 80; 80 · 20 = 1 600 N;
1 600 : 10 = 160 kg; 160 − 30 = 130 kg; 50 : 2 = 25 Pa; 4 000 : 5 = 800 kg/m³;
30 000 : 10 000 = 3 m³; 2 · 1 000 · 10 = 20 000 N; 48 · 5 · 1 000 · 10 = 2 400 000 N; 5 − 2 = 3 m).
Ani jedna otázka v těchto 9 blocích nemá náskok ≥ 10 znaků (nejhorší: pascaluv-zakon 9).

---

## pusobeni-teles-a-deformace — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (nálezy 1–6 z 1. kola ověřeny jako zapracované; náskoky ot. 1 = −2,
ot. 11 = −11, ot. 12 = −7, ot. 6 = +1)

NOVÉ:
1. otázka 17 „Jak se dělí pohybové účinky síly?" | DROBNÉ — únik do vysvětlení: vysvětlení
   nové ot. 17 zní „…posuvný (posun) a **otáčivý (otočení kolem osy)**", což je opis správné
   odpovědi ot. 16 („otáčí tělesem kolem osy"). `uniky.mjs` to kvůli jinému tvaru slova nevidí.
   NÁVRH vysvětlení ot. 17: „Výklad dělí pohybové účinky na dva — jeden těleso posune, druhý
   s ním otočí."

---

## jednoduche-stroje-paky — VERDIKT: NESLADĚNO (7)

NEVYŘEŠENÉ: nález 8 jen zčásti. Správné odpovědi (houpačka / stavební kolečko) už oporu mají,
ale **distraktory dál zkoušejí zařazení, které ve výkladu ani ve zdroji není**: SmartBooks
„Páka (nad rámec RVP).pdf", s. 13 uvádí lis na česnek, kleště, maticový klíč, páčidlo jen
v seznamu „Využití principu páky v praxi" — BEZ dělení na dvojzvratné/jednozvratné (s. 1–2
klasifikuje pouze rovnoramenné váhy, překlápěcí houpačku, otvírák a stavební kolečko).

NOVÉ:
1. otázka 14 „Který příklad je dvojzvratná páka?" | ZÁVAŽNÉ — **dvě správné odpovědi**:
   distraktor „páčidlo" je učebnicová dvojzvratná páka (podložené uprostřed, síly na opačných
   stranách osy) stejně jako správná „houpačka". Zdroj páčidlo nezařazuje, takže obhajoba
   „je to jednozvratná" nemá oporu.
   NÁVRH: „Který příklad je dvojzvratná páka?" → „houpačka" (8) / „otvírák na lahve" (17) /
   „lis na česnek" (13). Vysvětlení: „Houpačka má osu uprostřed — síly na ní působí na obou
   stranách. Otvírák i lis mají osu na kraji." (Oba distraktory jsou jednozvratné podle
   výkladu i zdroje, s. 2.)
2. otázka 15 „Který příklad je jednozvratná páka?" | ZÁVAŽNÉ — hrozí rovněž dvě správné
   odpovědi: distraktor „maticový klíč" se běžně řadí k jednozvratným pákám (osa = matice,
   síla i odpor na téže straně) a zdroj ani výklad ho nezařazuje.
   NÁVRH: „stavební kolečko" (16) / „rovnoramenné váhy" (17) / „nůžky" (6). Vysvětlení:
   „Kolečko má osu na kraji (kolo) a obě síly na stejné straně. Váhy i nůžky mají osu uprostřed."
3. otázka 17 „Proč se páce **s osou uprostřed** říká dvojzvratná?" | ZÁVAŽNÉ — znění nové
   otázky prozrazuje správnou odpověď nové ot. 4 („Kde má osu otáčení dvojzvratná páka?" →
   „uprostřed tyče"). Obě otázky přibyly v 1. kole, únik je tedy nový.
   NÁVRH ot. 17: „Proč se jednomu druhu páky říká dvojzvratná?" → „síly ji otáčejí na opačné
   strany" (32) / „má dvě různě dlouhá ramena" (26) / „unese dvojnásobné břemeno" (25).
   Vysvětlení beze změny.
4. otázka 20 „Jaká síla stačí na dvakrát delší rameno?" | ZÁVAŽNÉ — odpověď „poloviční" je
   doslova ve vysvětlení ot. 9 („…Dvakrát dál stačí **poloviční síla**."). Navíc je to potřetí
   týž fakt (9 číselně, 10 číselně, 20 slovně).
   NÁVRH: vysvětlení ot. 9 zkrátit na „2 · 9 = x · 18 → x = 1 N." a v ot. 20 ponechat znění;
   nebo ot. 20 nahradit dosud nezkoušeným bodem výkladu: „Co platí pro menší z obou sil na
   páce?" → „působí dál od osy" (18) / „působí blíž k ose" (18) / „působí přímo v ose" (18).
   Vysvětlení: „Zjednodušeně: menší síla působí dál od osy, větší síla blíž k ose."
5. otázka 15, distraktor „rovnoramenné váhy" | DROBNÉ — je to doslova správná odpověď ot. 19
   („Co z výkladu využívá páku?"). Týž vzor úniku, který 1. kolo vytklo u bloku
   telesa-stejnoroda (ot. 3 → 5 a 12). Řeší návrh 2 (nůžky místo váh) — pak stačí upravit
   jen jeden ze dvou.
6. otázka 19 „Co z výkladu využívá páku?" | DROBNÉ — formulace mluví o „výkladu", ne o fyzice;
   dítě řeší otázku o stránce, ne o páce.
   NÁVRH: „Které zařízení je dvojzvratná páka se stejně dlouhými rameny?" → „rovnoramenné
   váhy" (17) / „digitální teploměr" (18) / „sluneční hodiny" (15). Vysvětlení beze změny.
   (Pozn.: pak ale koliduje s ot. 14/17 — čistší je nechat ot. 19 a použít návrh 2.)

Ověřeno navíc: v bloku páky už NENÍ ani jedna otázka na kladku (nález 5 z 1. kola vyřešen),
moment síly ani N·m se nezkoušejí nad rámec výkladu, rameno síly odpovídá výkladu.

---

## kladka — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (všech 10 nálezů 1. kola ověřeno; nejhorší náskok v bloku je nyní +4)

NOVÉ:
1. otázka 11 „Kolik částí lana nese břemeno u volné kladky?" (nová) | ZÁVAŽNÉ — odpověď „dvě"
   je prozrazena hned dvakrát: ve ZNĚNÍ ot. 4 („Jak se jeho tíha rozdělí mezi **dvě části
   lana**?") a ve VYSVĚTLENÍ ot. 3 („Břemeno nesou **dvě části lana**…"). Únik vznikl až
   zapracováním 1. kola.
   NÁVRH: ot. 4 přeformulovat na „Břemeno 100 N visí na volné kladce. Jak se jeho tíha rozdělí?"
   a vysvětlení ot. 3 zkrátit na „Volná kladka zmenší potřebnou sílu na polovinu."
2. otázka 3 „Jak velkou silou zvedneme břemeno na volné kladce?" | ZÁVAŽNÉ — zkrácená odpověď
   „poloviční" je nyní doslova ve ZNĚNÍ ot. 5 („Co ‚zaplatíme' za **poloviční** sílu u volné
   kladky?") a ve vysvětleních ot. 9 a 14. Před 1. kolem byla odpověď delší věta, takže únik
   je nový důsledek zkrácení.
   NÁVRH: ot. 5 přeformulovat: „Co ‚zaplatíme' za menší sílu u volné kladky?" → odpovědi beze
   změny; vysvětlení ot. 9 na „200 : 2 = 100 N" a ot. 14 na „Volná kladka visí na břemeni a
   pohybuje se s ním, pevná je připevněná a nehýbe se."

---

## naklonena-rovina — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: nález 4 jen zčásti — a zápis v sekci ZAPRACOVÁNO to popisuje nepřesně.
Tvrdí se „otázky 11 a 21 nahrazeny", ve skutečnosti byly nahrazeny otázky **9 a 21**:
ot. 11 je pořád výpočet F = G · h : l (500 · 1 : 4 = 125 N). Blok tak má tutéž úlohu
F = G · h : l třikrát (4, 5, 11) a obrácenou l = G · h : F jen jednou (12).
NÁVRH: ot. 11 nahradit dosud nezkoušenou částí výkladu „Cena za menší sílu": „Nakloněná
rovina zmenší potřebnou sílu čtyřikrát. Jak se změní dráha?" → „bude čtyřikrát delší" (22) /
„bude čtyřikrát kratší" (23) / „zůstane stejná" (14). Vysvětlení: „Zlaté pravidlo mechaniky —
kolikrát si usnadníme sílu, tolikrát delší dráhu musíme urazit."

NOVÉ: žádné. (Nové ot. 9 „šroub vs. hřebík" i ot. 21 „význam l" mají oporu ve výkladu,
náskoky −2 a 0, výpočty 300·1:3=100, 600·2:6=200, 8:2=4, 500·1:4=125, 200·2:50=8, 12:2=6
přepočítány a sedí.)

---

## tlak — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (nálezy 1–7 ověřeny; ot. 21 nyní 50 : 2 = 25 Pa, celá čísla; vysvětlení
ot. 9 už atmosférický tlak neuvádí)

NOVÉ:
1. otázka 16 „K čemu slouží sněžnice?" | ZÁVAŽNÉ — zkrácená odpověď „rozloží váhu na větší
   plochu" je prozrazena vysvětlením ot. 11 („…stejná síla **rozložená na větší plochu** dává
   menší tlak (**proto se sněžnice nezaboří**)"). Vysvětlení jmenuje i sněžnice, takže vazba
   je úplná. Únik vznikl zkrácením odpovědí v 1. kole.
   NÁVRH: vysvětlení ot. 11 ukončit slovy „…Plochou se ve vzorci dělí — proto stejná síla na
   dvojnásobné ploše dává poloviční tlak." (bez zmínky o sněžnicích).
2. otázky 13, 14, 16, 17 | DROBNÉ — čtyři z 21 otázek zkoušejí týž fakt „větší plocha → menší
   tlak" (velbloud, jak zmenšit tlak, sněžnice, pásy a pneumatiky) a mají prakticky totožnou
   správnou odpověď. Nahrazení ot. 13 velbloudem (návrh 1. kola) koncentraci nesnížilo, jen
   vyměnilo příklad. Zároveň zůstává bez otázky pasáž výkladu o ptácích (úzké zobáky a drápy)
   a oba dopočty „Pro zvídavé" (F = 200 · 0,01 = 2 N; S = 300 : 30 000 = 0,01 m²).
   NÁVRH: ot. 17 nahradit: „Proč mají ptáci úzké a ostré zobáky a drápy?" → „malá plocha dá
   velký tlak" (24) / „velká plocha dá velký tlak" (25) / „tvar zobáku na tlak nemá vliv" (28).
   Vysvětlení: „Výklad uvádí ptáky jako opak velblouda — ostrý zobák soustředí sílu na
   maličkou plochu."

---

## pascaluv-zakon — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (nálezy 1–9 ověřeny; přijatá odchylka u ot. 20 zdokumentovaná v 1. kole
se nebere jako vada; vysvětlení u oleje i definice pístu odpovídají výkladu)

NOVÉ:
1. otázky 12 → 13 → 14 → 20 | ZÁVAŽNÉ — **řetěz tří úniků ve znění otázek**, který vznikl až
   zapracováním 1. kola (ot. 12, 14 i 20 jsou nové):
   • ot. 13 začíná „Velký píst zubařského křesla je **80×** větší než malý" = správná odpověď
     ot. 12 („80krát");
   • ot. 14 začíná „Křeslo zvedá síla **1 600 N**" = správná odpověď ot. 13;
   • ot. 20 začíná „…uzvedne až **160 kg**" = správná odpověď ot. 14 (a „160 kg" je v ot. 20
     navíc i distraktorem).
   Žák, který si přečte blok, získá tři odpovědi zadarmo. `uniky.mjs` hlásí 0, protože
   porovnává odpovědi mezi sebou, ne odpověď proti znění další otázky.
   NÁVRH (zachovat jen jeden článek řetězu, ostatní odvázat od čísel):
   • ot. 13: „Zubař tlačí na malý píst silou 20 N, velký píst má 400 cm² a malý 5 cm². Jaká
     síla zvedá křeslo?" → „1 600 N" (7) / „80 N" (4) / „100 N" (5). Vysvětlení: „400 : 5 = 80,
     takže 80 · 20 = 1 600 N."
   • ot. 14: „Jakou hmotnost uzvedne síla, kterou křeslo zvedá (g = 10 N/kg)?" — číslo 1 600 N
     ponechat jen ve vysvětlení: „m = F : g = 1 600 : 10 = 160 kg."
   • ot. 20: „Křeslo váží 30 kg. Kolik nejvíc může vážit pacient, když píst uzvedne dohromady
     160 kg?" je totéž — lépe nahradit: „Kolikrát větší sílu dá píst se 100× větší plochou?"
     už v bloku je (ot. 21), proto raději: „Proč je v hydraulickém zařízení potřeba kapalina,
     a ne vzduch?" → „kapalina se nedá stlačit" (25) / „kapalina je lehčí než vzduch" (26) /
     „vzduch by zamrzl" (16). Vysvětlení: „Kapaliny jsou téměř nestlačitelné, proto přenesou
     tlak beze ztráty."
2. otázky 3 a 16 | DROBNÉ — správná odpověď je nejdelší s náskokem 9 znaků, těsně pod laťkou
   10 (ot. 3: 34 vs 25; ot. 16: 44 vs 35). Brána je nechá projít, ale délková nápověda tam je.
   NÁVRH ot. 3: „všemi směry ke stěnám nádoby" (28) / „jen ve směru pohybu pístu" (25) /
   „jen otvorem naproti pístu" (25). NÁVRH ot. 16: „kabinu tlačí nahoru píst" (24) / „kabina
   visí jen na ocelových lanech" (35) / „kabinu nadnáší stlačený vzduch" (30).

---

## hydrostaticky-tlak — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (všech 12 nálezů ověřeno; nejhorší náskok v bloku je nyní +3; nová ot. 18
600 000 : 10 000 = 60 m odpovídá výkladu „Pro zvídavé", nová ot. 10 už pojem „hydrostatický
paradox" nepoužívá a z vysvětlení ot. 3 i 17 zmizel atmosférický tlak)

NOVÉ:
1. otázka 12 „Na jakém principu funguje hadicová vodováha?" | DROBNÉ — odpověď „spojených
   nádob" stojí doslova ve znění ot. 11 („Jak jsou vysoko hladiny kapaliny **ve spojených
   nádobách**?") i ve vysvětleních ot. 11 a 16. Únik existoval i před 1. kolem, kontrola ho
   ale nezachytila; s novým zněním ot. 10/11 zůstává.
   NÁVRH ot. 12: „Na jakém principu funguje hadicová vodováha?" → ponechat, ale vysvětlení
   ot. 11 zkrátit na „Kapalina se ustálí ve stejné výšce — jinak by ji rozdíl tlaků přelil."
   a ve znění ot. 11 psát „ve dvou propojených nádobách".

---

## archimeduv-zakon — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (nálezy 1–8 ověřeny; ot. 2 = 30 000 : 10 000 = 3 m³ a ot. 18 = 2 · 1 000 ·
10 = 20 000 N jsou doslova příklady z výkladu; hustota ledu 916 kg/m³ i „gravitační konstanta"
sladěny; Archimédés bez vany a Heuréky)

NOVÉ:
1. otázka 5 „Co znamená V ve vzorci Fvz = V · ρ · g?" | DROBNÉ — odpověď „objem ponořené
   části" je doslova ve znění nové ot. 2 („Jaký je **objem ponořené části**?") a ve znění
   ot. 16. Nová ot. 2 vazbu zesílila.
   NÁVRH ot. 2: „Na těleso ve vodě působí vztlak 30 000 N. Jak velký je ponořený objem?"
2. otázka 17 „Jak funguje ponorka?" | DROBNÉ — **cross-bloková duplicita**: blok
   telesa-stejnoroda-a-nestejnoroda dostal v 1. kole dvě nové otázky na ponorku (13 a 17) a
   tahle třetí zkouší týž fakt („vodou mění svou průměrnou hustotu"). Týž typ překrytí, jaký
   1. kolo vytklo u dvojice páky × kladka; `uniky.mjs` ho nevidí (porovnává jen uvnitř bloku),
   `uniky-krizove.mjs` ho nehlásí (jiné znění odpovědi).
   NÁVRH ot. 17 nahradit dosud nezkoušeným bodem výkladu: „Jak mění svou průměrnou hustotu
   ryba?" → „plynovým měchýřem" (18) / „ploutvemi" (9) / „šupinami" (8). Vysvětlení: „Ryba
   nafukuje a stahuje plynový měchýř, a tím mění objem svého těla."

---

## telesa-stejnoroda-a-nestejnoroda — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: nález 6 vyřešen jen formálně. Distraktory ot. 3 sice už neznějí doslova jako
odpovědi ot. 5 a 12, ale únik zůstal oběma směry:
  • nový distraktor ot. 3 „betonová zeď s výztuží" je TÝŽ předmět jako „železobetonový panel",
    což je správná odpověď ot. 12 — kdo čte ot. 3, ví, že železobeton je nestejnorodý;
  • ot. 5 dál nese distraktor „ocelový hřebík", což je doslova správná odpověď ot. 3
    (ta se v 1. kole neupravovala).
NÁVRH: ot. 3 → „ocelový hřebík" (14) / „tenisová raketa" (15) / „stavební cihla se slámou" (25);
ot. 5 → „tužka — dřevo a tuha" (20) / „skleněná kulička z jednoho skla" (31) / „měděný drát" (12).

NOVÉ:
1. otázky 8 a 14 | DROBNÉ — **totožná správná odpověď** „průměrnou hustotu" ve dvou otázkách
   bloku (8 „Co počítáme u nestejnorodých těles místo hustoty látky?" a 14 „Značka ρp
   znamená…"), navíc oba pojmy padnou i ve znění ot. 19 a v odpovědi ot. 9 („podle průměrné
   hustoty"). Duplicitní pár `uniky.mjs` neodhalí, protože znění otázek je různé.
   NÁVRH ot. 14 nahradit dosud nezkoušeným bodem ZAPIS („vesta potápěče" už zkoušená, zůstává
   hustota vzduchu v dutině): „Jakou hmotnost a jaký objem dosazujeme do ρp = m : V?" →
   „celého tělesa i s dutinami" (26) / „jen kovové části tělesa" (24) / „jen vzduchu uvnitř" (19).
   Vysvětlení: „Do vzorce patří hmotnost a objem CELÉHO tělesa, i s dutinami a všemi látkami."

Ověřeno navíc: nové ot. 11 (4 000 : 5 = 800 kg/m³), 13 a 17 (ponorka), 18 (plastelína),
19 (ρp = m : V) a 20 (vesta) mají doslovnou oporu ve výkladu i v ZAPIS; všechny náskoky ≤ +4.

---

## Shrnutí 2. kola

| klíč | nevyřešené z 1. kola | nové | verdikt |
|---|---|---|---|
| pusobeni-teles-a-deformace | 0 | 1 | NESLADĚNO (1) |
| jednoduche-stroje-paky | 1 (nález 8) | 6 | NESLADĚNO (7) |
| kladka | 0 | 2 | NESLADĚNO (2) |
| naklonena-rovina | 1 (nález 4) | 0 | NESLADĚNO (1) |
| tlak | 0 | 2 | NESLADĚNO (2) |
| pascaluv-zakon | 0 | 2 | NESLADĚNO (2) |
| hydrostaticky-tlak | 0 | 1 | NESLADĚNO (1) |
| archimeduv-zakon | 0 | 2 | NESLADĚNO (2) |
| telesa-stejnoroda-a-nestejnoroda | 1 (nález 6) | 1 | NESLADĚNO (2) |

Dvě systémové mezery, které 2. kolo doložilo:
1. **`uniky.mjs` neporovnává správnou odpověď proti ZNĚNÍ jiné otázky.** Právě tam vznikly
   nejhorší nové úniky (pascaluv-zakon 12→13→14→20, kladka 4→11, páky 17→4). Brána hlásí 0.
2. **Zkracování odpovědí kvůli délkové nápovědě vyrábí úniky.** Odpověď zkrácená na jediné
   slovo („poloviční", „dvě", „spojených nádob") se pak doslova vyskytuje ve znění nebo
   vysvětlení jiné otázky. Po každé délkové opravě je proto nutné znovu proběhnout kontrolu
   úniků včetně znění otázek.

## ZAPRACOVÁNO 22. 9. 2026

Všech 9 bloků opraveno v `src/data/kvizy.ts`, včetně obou nevyřešených nálezů z 1. kola
(jednoduche-stroje-paky nález 8, naklonena-rovina nález 4, telesa-stejnoroda nález 6).

- **pusobeni-teles-a-deformace** (1/1): vysvětlení ot. 17 přepsáno, už neopisuje odpověď ot. 16.
- **jednoduche-stroje-paky** (7/7): ot. 14 nahrazena (houpačka/otvírák na lahve/lis na česnek);
  ot. 15 nahrazena (stavební kolečko/nůžky/kleště — odstraněny ambiguní i duplicitní distraktory,
  řeší zároveň nálezy 5 a 6); ot. 17 přeformulována (nemíří na osu ot. 4); ot. 20 nahrazena
  („Co platí pro menší z obou sil na páce?", odstraněna trojice s ot. 9 a 10); ot. 19 ponechána
  beze změny (vyhnuto kolizi s ot. 14/17, jak doporučil kontrolní zápis).
- **kladka** (2/2): ot. 4 a vysvětlení ot. 3 přeformulovány (bez „dvě části lana"); ot. 5 a
  vysvětlení ot. 9, 14 přeformulovány (bez zkráceného „poloviční").
- **naklonena-rovina** (1/1): ot. 11 (třetí duplicitní F = G·h/l) nahrazena otázkou o dráze
  při čtyřnásobně menší síle.
- **tlak** (2/2): vysvětlení ot. 11 zkráceno (bez zmínky sněžnic); ot. 17 nahrazena otázkou
  o ptačích zobácích a drápech.
- **pascaluv-zakon** (2/2): řetěz ot. 13→14→20 přepsán, aby žádná otázka neopisovala číslo
  z odpovědi předchozí (ot. 13 nové zadání, ot. 14 bez „1 600 N" v textu, ot. 20 nahrazena
  otázkou o nestlačitelnosti kapaliny); odpovědi ot. 3 a ot. 16 prodlouženy (žádný náskok ≥10 zn.).
- **hydrostaticky-tlak** (1/1): ot. 11 přeformulována na „dvě propojené nádoby" a vysvětlení
  zkráceno, aby neopisovalo odpověď ot. 12.
- **archimeduv-zakon** (2/2): ot. 2 přeformulována (bez „objem ponořené části"); ot. 17
  nahrazena otázkou o rybím plynovém měchýři (odstraněna cross-bloková duplicita s ponorkou).
- **telesa-stejnoroda-a-nestejnoroda** (2/2): distraktory ot. 3 a ot. 5 vyměněny (bez vzájemného
  křížení se správnými odpověďmi ot. 5 a ot. 12); ot. 14 nahrazena otázkou o dosazování do
  ρp = m : V (odstraněna duplicita s ot. 8).

Ověřeno: `node testy/vypis-kviz.mjs <klíč>` = 21 u všech 9 bloků, `node testy/uniky.mjs` = 0 duplicit
i úniků (opraveno i 1 nově odhalené kolize ve fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila),
`node zkontroluj.mjs` bez nálezu k těmto klíčům, `npm run build` bez chyby.

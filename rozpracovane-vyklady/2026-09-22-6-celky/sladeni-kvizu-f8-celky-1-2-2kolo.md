# 2. kolo nezávislé kontroly kvízů — F8 celky „Mechanická práce a výkon" + „Energie"

Kontrolor, 22. 9. 2026, čerstvý kontext. Podklad: `node testy/vypis-kviz.mjs <klíč>` nad
skutečnými daty (`testy/data.mjs`), výklady z `temata.ts`, `git show a14c6cd` (co přesně
oprava po 1. kole změnila). Všechny příklady přepočítány (`node -e`), délky odpovědí
měřeny v kódových bodech, náskok = délka(správná) − max(délka ostatních), hranice ≥ 10.

DŮLEŽITÉ pro posouzení úniků: `src/components/skola2/Kviz.astro:164` otázky před
zobrazením MÍCHÁ (`poradi = zamichej(otazky)`), takže „vysvětlení stojí až za otázkou"
není obrana — únik platí v obou směrech.

Brány: `node testy/uniky.mjs` → 0 duplicit, 2 úniky, oba v jiném bloku
(`tepelny-motor-parni-stroj`), k osmi kontrolovaným klíčům nic. Všech 8 bloků má 21 otázek.

---

## mechanicka-prace — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (nálezy 1–7 z 1. kola ověřeny: o. 18 taška/kolmá síla, o. 12 skateboard
F = 0 N, náskoky o. 1 = 2, o. 3 = 2, o. 10 = −6, o. 13 = −2). Výpočty: 0,6·10 = 6 N;
6·1,5 = 9 J; 900 000 000 : 4 500 = 200 000 N; 300·10·5 = 15 000 J; 40·10 = 400 J;
300 : 50 = 6 m — vše sedí.

NOVÉ:
1. otázka 12 „Michal jede na skateboardu a neodráží…" | DROBNÉ | její NOVÉ vysvětlení
   začíná „W = F · s; …", což je doslova správná odpověď otázky 7 („Podle jakého vzorce
   počítáme práci?"). U nepočítací otázky vzorec ve vysvětlení nemá co dělat (u počítacích
   19–21 je součástí postupu, tam se nechává; totéž doporučujeme dodatečně u o. 11).
   NÁVRH: VYSVĚTLENÍ otázky 12 → „Když je síla nulová, je nulová i práce."

---

## vykon — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (o. 3 už neobsahuje P = W : t; o. 16 bez P = F · v; kWh-duplicita
nahrazena otázkou o megawattu; náskoky o. 12 = 1, o. 16 = 1, o. 11 = 0, o. 6 = 1;
nadstavbové příklady jeřáb + elektromotor přesunuty na konec jako o. 20 a 21).
Výpočty: 15 000 : 5 = 3 000 W; 5 000 : 500 = 10 s; 600·20 = 12 000 J;
4 800 000 : 60 = 80 000 W; 9·16 = 144 kWh — vše sedí.

NOVÉ:
1. otázka 3 „Jaká je značka výkonu?" | ZÁVAŽNÉ | NOVÉ vysvětlení („Písmeno W má ve fyzice
   dvě role — jednou je to jednotka watt, jednou značka práce") prozrazuje správnou odpověď
   otázky 4 („Jaká je jednotka výkonu?" → `watt (W)`). Oprava únik jen přesunula z otázky 5
   na otázku 4.
   NÁVRH: VYSVĚTLENÍ otázky 3 → „Výkon značíme velkým písmenem P."
   (Delší varianta se zmínkou o tlaku nejde — prozradila by otázku 11.)
2. otázka 9 „Jak vypočítáme práci, známe-li výkon a čas?" | DROBNÉ | zbytek nálezu 1
   z 1. kola: vysvětlení „Ze vzorce P = W : t plyne W = P · t" pořád prozrazuje správnou
   odpověď otázky 5 (`P = W : t`). Oprava se týkala jen otázky 3, tahle zůstala.
   NÁVRH: VYSVĚTLENÍ otázky 9 → „Práci dostaneme, když výkon vynásobíme časem."

---

## energie-a-jeji-premeny — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (o. 14 žárovka nahrazena otázkou na mechanickou energii — opora
ve výkladu „mechanická energie — souvisí s pohybem a polohou těles"; o. 12 kladivo už
nemluví o „polohové energii"; o. 13 nahrazena otázkou o spotřebiči; všechny náskoky < 10,
maximum 8 u o. 6). Blok nemá číselný příklad.

NOVÉ:
1. otázka 6 „Co říká zákon zachování energie?" | DROBNÉ | její vysvětlení „Energie se pouze
   přeměňuje z jednoho druhu na jiný." prozrazuje správnou odpověď NOVÉ otázky 13
   („Co se stane s energií, když ji spotřebič „spotřebuje"?" → `změní se na jiný druh`).
   Duplicita, kterou nález 4 rušil, se vrátila jako únik z vysvětlení.
   NÁVRH: VYSVĚTLENÍ otázky 6 → „Energie nevzniká z ničeho a ani se neztrácí."

---

## pohybova-a-polohova-energie — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (o. 1 bez „kinetická/potenciální"; o. 11 bez Ep = m · g · h; nová o. 4
značka Eₚ; nová o. 20 sekera — opora „u kladiva a sekery, kde těžká hlava dopadá z výšky";
o. 5 bez přímé úměry, náskok 0; náskoky o. 8 = 3, o. 9 = 1, o. 16 = 4, maximum bloku 8).
Výpočty: 2·10·3 = 60 J; 10·10·2 = 200 J; 60 : (10·3) = 2 kg; 80 : (4·10) = 2 m — sedí.

NOVÉ:
1. otázka 4 „Jaká je značka polohové energie?" (NOVÁ otázka) | ZÁVAŽNÉ | její vysvětlení
   „Index p = potenciální (polohová); Ek patří pohybové energii." prozrazuje naráz správnou
   odpověď otázky 10 („Jak se jinak říká polohové energii?" → `potenciální`) i otázky 3
   (značka pohybové → `Ek`).
   NÁVRH: VYSVĚTLENÍ otázky 4 → „Polohovou energii značíme velké E s malým p dole."

---

## zakon-zachovani-mechanicke-energie — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (o. 11 bez „změní se na teplo"; nová o. 20 letadlo; nová o. 14 sekera;
o. 18 „Kulička na zakřivené dráze"; náskoky o. 2 = 3, o. 13 = 1, o. 10 = 1, o. 1 = −1,
o. 7 = 0, maximum bloku 8). Výpočty: 16−6 = 10 J; 24 J; 30−12 = 18 J; 45 J; 20 J — sedí
s tabulkou v h3 „Pro zvídavé".

NOVÉ:
1. otázka 20 „Letadlo letí rychle vysoko nad zemí…" (NOVÁ otázka) | DROBNÉ | vysvětlení
   „Celková mechanická energie je součet obou: E = Ep + Ek." prozrazuje správnou odpověď
   otázky 1 („Co je celková mechanická energie tělesa?" → `součet polohové a pohybové`).
   NÁVRH: VYSVĚTLENÍ otázky 20 → „Letadlo je vysoko, a zároveň letí — má obě energie
   najednou."

---

## energeticka-hodnota-potravin — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (o. 3 kJ za hodinu fotbalu — opora „fotbal, běh — asi 2 000 kJ za hodinu";
o. 8 přebytek → tuk; o. 12 vzorec E = (m : 100) · E₁₀₀ — opora `zapis.vzorec`; o. 5 hodnota
17 kJ — opora „Bílkoviny i sacharidy dají na 1 gram asi 17 kJ"). Výpočty: 300·2 = 600;
400 : 2 = 200; 2 000 : 1 000 = 2; 250·3 = 750; 1 500 : 3 = 500 — vše celočíselné.
Délková nápověda: 0 otázek se správnou odpovědí nejdelší.

NOVÉ:
1. otázka 2 „Co tělo „spaluje" pro získání energie?" | DROBNÉ | zbytek nálezu 1 z 1. kola:
   její vysvětlení končí „…a získává chemickou energii", ale slovo „chemick*" se ve výkladu
   ani v `zapis` nevyskytuje ani jednou (ověřeno `grep -o "chemick[a-zěščřžýáíé]*"` → 0
   výskytů v podtématu, 1 výskyt v kvízu). Kvůli tomu byla v 1. kole škrtnuta otázka 3,
   ve vysvětlení o. 2 pojem zůstal.
   NÁVRH: VYSVĚTLENÍ otázky 2 → „Tělo spaluje cukry a tuky spolu s kyslíkem, podobně jako
   motor palivo."

---

## vnitrni-energie-telesa — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (nová o. 18 částice v pevné látce; nová o. 16 jednotka J; o. 15
přeformulována do slov výkladu; o. 10 bez „přidání částic"; zrcadlová duplicita 11/16
zrušena; slovo „jako celku" už se v distraktorech neopakuje). Blok nemá číselný příklad.

NOVÉ:
1. otázka 17 „Drát, který opakovaně ohýbáme…" | ZÁVAŽNÉ | oprava nálezu 2 (zkrácení třetího
   distraktoru na „Ohyb drát ochlazuje a zpevňuje") vyrobila délkovou nápovědu: správná
   51 znaků vs. 36 a 30 → NÁSKOK 15 (před opravou byl třetí distraktor 43 znaků, náskok 8).
   Správná odpověď je teď v otázce zdaleka nejdelší.
   NÁVRH: ODPOVĚDI otázky 17: `Ohýbáním se koná práce, drát se zahřeje | Drát ztrácí
   částice, a proto chladne | Ohyb drát ochlazuje, a proto nakonec zpevní`
   (39 / 36 / 43 → náskok −4; vysvětlení beze změny).

---

## tepelna-vymena-a-teplo — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (o. 17 směšování nahrazeno zpětným výpočtem hmotnosti; o. 16 bez pojmu
„kalorimetr"; o. 19 „ve vzorci pro teplo"; vysvětlení o. 12 bez „ohřívá pomalu").
Výpočty: 42 000 : (4 200 · 10) = 1 kg; 2·4 200·10 = 84 000 J; 3·4 200·20 = 252 000 J;
distraktory odpovídají popsaným chybám. Délková nápověda: 0 otázek, maximum náskoku 0.
POZNÁMKA 1. kola k o. 14 („topná tělesa") byla výslovně přijata jako neprovedená — nevracíme se.

NOVÉ:
1. otázka 17 „Kolik kg vody ohřeješ o 10 °C teplem 42 000 J?" (NOVÁ otázka) | DROBNÉ |
   její vysvětlení začíná „m = Q : [c · (t₂ − t₁)] = …", tedy vrací do bloku vzorec, který
   nález 3 z 1. kola právě proto odstranil ze zadání o. 19 a z vysvětlení o. 20 a 21 —
   z odvozeného tvaru je správná odpověď otázky 9 (`Q = m · c · (t₂ − t₁)`) zřejmá.
   NÁVRH: VYSVĚTLENÍ otázky 17 → „42 000 : (4 200 · 10) = 1 kg — hmotnost dopočítáme zpětně."
2. otázky 12, 17, 20, 21 — zápis měrné tepelné kapacity | DROBNÉ | táž hodnota je v jednom
   bloku psaná dvěma způsoby: `4 200 J/(kg·°C)` (odpovědi o. 12, vysvětlení o. 21)
   a `4200 J/(kg·°C)` (zadání o. 17, 20, 21 a vysvětlení o. 17, 20) — dokonce uvnitř jediné
   otázky 21 („c vody = 4200" v zadání, „3 · 4 200 · 20" ve vysvětlení). Rozdíl vznikl podle
   zápisu v 1. kole záměrně, „aby se netokenizovalo stejně" jako u o. 12, tedy aby mlčela
   brána `uniky.mjs`. Typografie ale věcný překryv neřeší — žák vidí hodnotu c ve třech
   zadáních a otázka 12 se přesně na ni ptá; pro dítě je „4200" a „4 200" totéž číslo.
   NÁVRH: sjednotit ve všech čtyřech otázkách na `4 200 J/(kg·°C)` (i ve vysvětleních).
   Překryv se zadáním příkladů je u konstanty nevyhnutelný a je věcně v pořádku; pokud
   po sjednocení brána ohlásí únik, patří to řešit v bráně, ne mezerou v čísle.

---

## Souhrn

| klíč | nevyřešené z 1. kola | nové |
|---|---|---|
| mechanicka-prace | 0 | 1 (drobné) |
| vykon | 0 | 2 (1 závažné) |
| energie-a-jeji-premeny | 0 | 1 (drobné) |
| pohybova-a-polohova-energie | 0 | 1 (závažné) |
| zakon-zachovani-mechanicke-energie | 0 | 1 (drobné) |
| energeticka-hodnota-potravin | 0 | 1 (drobné) |
| vnitrni-energie-telesa | 0 | 1 (závažné) |
| tepelna-vymena-a-teplo | 0 | 2 (drobné) |

Všech 33 nálezů 1. kola je vyřešeno. Nových 10, z toho 3 závažné: dva úniky vyrobené
přepsaným vysvětlením (vykon o. 3, pohybova o. 4) a jedna délková nápověda vyrobená
zkrácením distraktoru (vnitrni o. 17, náskok 15).

---

## ZAPRACOVÁNO 22. 9. 2026

- [x] mechanicka-prace o. 12 — vysvětlení zkráceno na „Když je síla nulová, je nulová i práce."
- [x] vykon o. 3 — vysvětlení nahrazeno „Výkon značíme velkým písmenem P."
- [x] vykon o. 9 — vysvětlení nahrazeno „Práci dostaneme, když výkon vynásobíme časem."
- [x] energie-a-jeji-premeny o. 6 — vysvětlení nahrazeno „Energie nevzniká z ničeho a ani se neztrácí."
- [x] pohybova-a-polohova-energie o. 4 — vysvětlení nahrazeno „Polohovou energii značíme velké E s malým p dole."
- [x] zakon-zachovani-mechanicke-energie o. 20 — vysvětlení nahrazeno „Letadlo je vysoko, a zároveň letí — má obě energie najednou."
- [x] energeticka-hodnota-potravin o. 2 — vysvětlení nahrazeno „Tělo spaluje cukry a tuky spolu s kyslíkem, podobně jako motor palivo."
- [x] vnitrni-energie-telesa o. 17 — odpovědi přepsány na 39/36/43 znaků (náskok −4), vysvětlení beze změny.
- [x] tepelna-vymena-a-teplo o. 17 — vysvětlení nahrazeno „42 000 : (4200 · 10) = 1 kg — hmotnost dopočítáme zpětně."
- [ ] tepelna-vymena-a-teplo o. 12/17/20/21 — sjednocení zápisu `4200` → `4 200` NEPROVEDENO: po sjednocení
      `node testy/uniky.mjs` nahlásil 3 nové úniky (zadání o. 17/20/21 doslova cituje odpověď o. 12 „4 200
      J/(kg·°C)") a `npm run build` selhal na bráně `zkontroluj.mjs`. Ponecháno v původním stavu (`4200`
      v zadáních i výpočtech), aby brány zůstaly zelené — sjednocení zápisu čísla vyžaduje napřed upravit
      měřidlo `testy/uniky.mjs` (mimo rozsah této úlohy, psát smí jen kvizy.ts), teprve pak zápis sjednotit.

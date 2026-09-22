# Sladění kvízů F7 „zrcadla-a-cocky" — 2. KOLO nezávislé kontroly (22. 9. 2026)

Kontrolor nevěděl, jak kvízy vznikly. Porovnáno strojově: `node testy/vypis-kviz.mjs <blok>`
proti `node podtema.mjs … get fyzika/7-rocnik/zrcadla-a-cocky/<podtema>` a proti PDF podkladům
(`/Users/Shared/Škola/7/4 Světlo/22, 23, 25, 26, 27, 28, 29`, převedeno `pdftotext -layout`).

## Kotvy (změřeno, ne tvrzeno)

- Počet otázek: všech 6 bloků **21** (hlavička výpisu `vypis-kviz.mjs`).
- Délková nápověda: spočítány znaky všech odpovědí. **Nikde náskok ≥ 10 znaků.**
  Největší náskoky: `opticka-cocka` q18 +9 (na hraně), `kulova` q16 +7, `rozklad` q13 +6.
  Ostatní bloky ≤ +1. → délkové pravidlo je splněno, žádný nález.
- Celá čísla: 25°, 60°/30°, 4 m, f = r/2, +59 D, 15 D, 25–30 cm, 10–15 cm, 7 cm, 60 cm, 5 m,
  4 mm, 1671, 1954 — vše celá čísla, přepočítáno (25° → 25°; 60° : 2 = 30°; 4 m → 4 m). OK.
- Chyby PDF, které výklad správně opravil (kontrolováno zvlášť, NENÍ nález):
  * PDF 23 má prohozené popisy „duté/vypuklé" (str. 4–5: „Vypuklé – odrazná plocha z vnitřní
    kulové plochy") — výklad i kvíz mají správně.
  * PDF 28 (str. 6–7) tvrdí, že u ZÁKLADNÍ duhy se paprsky v kapce „odrazí dvakrát" a vedlejší
    vzniká „vynecháním jednoho odrazu" — obrácené. Výklad i kvíz (q12 jednou, q13 dvakrát) mají správně.
  * PDF 26 (str. 3) tvrdí „nejvíce tyčinek je v tzv. žluté skvrně" — nesprávné (jsou tam čípky).
    Výklad má správně čípky, kvíz q18 se tvrzení vyhýbá. OK.

---

## 1) optika-rovinneho-zrcadla — 3 nálezy

### Nález 1.1 (DROBNÉ) — q14: rozbitá věta doplňovacího typu
`kvizy.ts:3403` zní: „Vyhodnotí to, zda vidíme předmět, nebo jen jeho obraz…" → „náš mozek".
Doplní-li žák odpověď na konec, vznikne nečeská věta („…jeho obraz… náš mozek").
Sloveso je na začátku, tři tečky na konci nic nedoplňují.
**NÁVRH ZNĚNÍ (text):** `Zda vidíme skutečný předmět, nebo jen jeho obraz v zrcadle, vyhodnotí…`
(odpovědi i vysvětlení beze změny).

### Nález 1.2 (DROBNÉ) — q3 × q9: slovo „zdánlivý" prosakuje mezi otázkami
q3 má v ZADÁNÍ „…skutečný, nebo zdánlivý?" a q9 má TOTÉŽ slovo ve správné odpovědi
(„ne, je zdánlivý"). Kdo uvidí q3, uhodne q9 bez znalosti stínítka.
**NÁVRH ZNĚNÍ (q9 odpovědi):** `['ne, na stínítku se neobjeví', 'ano, vždycky to jde', 'jen ve tmě']`
(vysvětlení ponechat — vysvětluje „zdánlivý obraz").

### Nález 1.3 (DROBNÉ) — q16 × q17 × q18: třikrát tentýž zákon, vysvětlení prozrazují q16
Vysvětlení q17 („Úhel odrazu se vždy rovná úhlu dopadu (zákon odrazu)") i q18 doslova
obsahují správnou odpověď q16 („stejný jako úhel dopadu"). Výpočetní q17/q18 mají zůstat,
definiční q16 je navíc.
**NÁVRH ZNĚNÍ (q16 nahradit otázkou na jiné učivo výkladu — „obraz při jiném natočení zrcadla"):**
text: `Co se v zrcadle prohodí, když ho natočíme vodorovně (např. na stropě)?`
odpovědi: `['horní strana s dolní', 'nic se neprohodí', 'obraz se zmenší na polovinu']`
vysvětlení: `Rovinné zrcadlo prohodí strany podle své roviny — u vodorovného zrcadla horní a dolní.`

---

## 2) kulova-zrcadla-dute-zrcadlo — 5 nálezů

### Nález 2.1 (ZÁVAŽNÉ) — q4: „bod na optické ose" není definice vrcholu
`kvizy.ts:3416`: „Co je vrchol zrcadla V?" → správně „bod na optické ose". Jenže na optické
ose leží i střed křivosti S a ohnisko F (výklad: „optická osa o — spojnice středu křivosti
a vrcholu"). Správná odpověď tedy neplatí jen pro vrchol → otázka má fakticky víc správných
odpovědí, jen nejsou nabídnuty. Podklad PDF 23 str. 4: „Vrchol zrcadla V — když položíte
zrcadlo okrajem na podložku, je to nejvyšší bod zrcadla."
**NÁVRH ZNĚNÍ (q4):** odpovědi `['nejvyšší bod odrazné plochy', 'střed celé koule zrcadla', 'okraj zrcadla']`
vysvětlení: `Když zrcadlo položíš okrajem dolů, vrchol V je jeho nejvyšší bod — leží na optické ose.`

### Nález 2.2 (DROBNÉ) — q2: distraktor „nejvyšší bod zrcadla" je definice vrcholu (po opravě 2.1 by odpověď unikla)
Po opravě 2.1 by distraktor q2 doslova odpovídal správné odpovědi q4.
**NÁVRH ZNĚNÍ (q2 odpovědi):** `['střed koule zrcadla', 'bod, kam se sbíhají paprsky', 'bod uprostřed mezi ohniskem a vrcholem']`
(vysvětlení beze změny).

### Nález 2.3 (ZÁVAŽNÉ) — q8 vysvětlení prozrazuje celou odpověď q21
q8 vysvětlení: „Zdroj v ohnisku → po odrazu vychází rovnoběžný svazek jedním směrem."
q21 se ptá přesně na to: „Kam se po odrazu od dutého zrcadla šíří paprsky vycházející
z ohniska?" → „jako rovnoběžný svazek s osou". Dvě otázky na tutéž větu výkladu + únik.
**NÁVRH ZNĚNÍ (q8 překlopit na jiné učivo — využití, které v bloku chybí):**
text: `Proč se duté zrcadlo dává do reflektoru auta i kapesní svítilny?`
odpovědi: `['pošle světlo jedním směrem', 'světlo rozptýlí do všech stran', 'světlo pohltí']`
vysvětlení: `Žárovka sedí v ohnisku, a zrcadlo tak nasměruje světlo dopředu na silnici.`

### Nález 2.4 (DROBNÉ) — q15: tázací slovo „Kde" × odpověď „dopravní zrcadlo" (věc, ne místo)
Nabídka mísí věc („zubní zrcátko") a místo („solární elektrárna").
**NÁVRH ZNĚNÍ (q15):** text `Kde se používá vypuklé zrcadlo?`
odpovědi `['u nepřehledné křižovatky', 'v ordinaci zubaře', 'v solární elektrárně']`
vysvětlení `Široký záběr se hodí u křižovatek, ve zpětných zrcátkách a v obchodech.`

### Nález 2.5 (DROBNÉ) — q16: tázací slovo „K čemu" × odpověď „v solární elektrárně…"
**NÁVRH ZNĚNÍ (q16 text):** `Kde využíváme to, že duté zrcadlo soustředí sluneční paprsky do ohniska?`
(odpovědi i vysvětlení beze změny).

Poznámka bez nálezu: q3 („ohnisko uprostřed mezi S a V") a q12 („f = polovina r") testují tutéž
znalost ze dvou stran; pro 21 otázek je to únosné, ponechat.

---

## 3) opticka-cocka — 3 nálezy

### Nález 3.1 (ZÁVAŽNÉ) — q12 neříká, o kterou čočku jde, a pro rozptylku je odpověď nepravdivá
`kvizy.ts:3447`: „Jak se láme paprsek rovnoběžný s osou?" → „projde ohniskem". Blok se stejně
podrobně věnuje rozptylce; výklad: „U rozptylky … rovnoběžný paprsek se láme tak, jako by
vycházel ze zdánlivého ohniska" (PDF 25 str. 15: „jako by vycházel z obrazového ohniska").
Rovnoběžný paprsek u rozptylky ohniskem NEPROJDE. Vysvětlení to doznává („u spojky"),
zadání ne → otázka je ve své obecné podobě fyzikálně chybná.
**NÁVRH ZNĚNÍ (q12 text):** `Jak se u spojky láme paprsek rovnoběžný s optickou osou?`
**a vysvětlení:** `U spojky se rovnoběžný paprsek láme do ohniska; u rozptylky jen míří, jako by ze zdánlivého ohniska vycházel.`

### Nález 3.2 (DROBNÉ) — q6: vysvětlení neodpovídá na otázku
Otázka „Kolik ohnisek má optická čočka?" má vysvětlení o optické ose („Optická osa spojuje
středy křivosti obou ploch čočky; na ní leží obě ohniska F a F´") — počet ohnisek nevysvětluje.
**NÁVRH ZNĚNÍ (q6 vysvětlení):** `Čočka láme světlo z obou stran, proto má ohnisko před sebou i za sebou — značíme je F a F´.`

### Nález 3.3 (DROBNÉ) — q3 × q7 a q4 × q8: zrcadlové dvojice, kde je odpověď jedné distraktorem druhé
q3 „spojka → uprostřed nejširší" má distraktor „uprostřed je nejtenčí" = správná odpověď q7
(a naopak). Totéž q4 („spojí je do ohniska") × q8 („rozptýlí je do stran"). Kdo zodpoví
jednu, má druhou zadarmo.
**NÁVRH ZNĚNÍ (q7 odpovědi):** `['uprostřed je nejtenčí', 'má z obou stran vypouklé plochy', 'je uprostřed i na krajích stejně silná']`
**NÁVRH ZNĚNÍ (q8 odpovědi):** `['rozptýlí je do stran', 'srovná je do jednoho úzkého pruhu', 'nechá je beze změny']`

Poznámka bez nálezu: q18 má náskok správné odpovědi +9 znaků — těsně pod prahem, ponechat.
Poznámka bez nálezu: q5 („přesně ve 2f → stejně velký") není v PDF 25 (podklad uvádí jen tři
polohy), ale je to správná fyzika a je to i ve výkladu — ponechat.

---

## 4) oko-vady-oka — 5 nálezů

### Nález 4.1 (ZÁVAŽNÉ) — q13: vysvětlení je kruh a nic nevysvětluje
„Spojka pomůže oku více lámat, takže se obraz posune přesně tam, kde vzniká ostrý obraz."
— žák se nedozví, KAM se obraz posune (u dalekozrakosti vzniká za sítnicí, spojka ho posune dopředu).
**NÁVRH ZNĚNÍ (q13 vysvětlení):** `Dalekozraké oko láme málo, obraz by padl až za sítnici. Spojka lom přidá a obraz se posune dopředu, přesně na sítnici.`

### Nález 4.2 (ZÁVAŽNÉ) — q15: totéž kruhové vysvětlení
„Rozptylka lom oka zeslabí, takže se obraz posune přesně tam, kde vzniká ostrý obraz."
**NÁVRH ZNĚNÍ (q15 vysvětlení):** `Krátkozraké oko láme příliš, obraz padne před sítnici. Rozptylka lom ubere a obraz se posune dozadu, přesně na sítnici.`

### Nález 4.3 (DROBNÉ) — q19: „vlnová délka" je nad rámec výkladu i tohoto podtématu
Vysvětlení q19: „Tři druhy čípků reagují každý na jinou vlnovou délku světla…". Výklad
oka ani PDF 26 pojem vlnová délka nemají (patří do podtématu rozklad světla).
**NÁVRH ZNĚNÍ (q19 vysvětlení):** `Máme tři druhy čípků — na červenou, zelenou a modrou; z jejich signálů poskládá mozek výslednou barvu.`

### Nález 4.4 (DROBNÉ) — q19 duplikuje q1 bloku vnimani-barev
Obě otázky v témž celku znějí prakticky stejně („Kolik druhů čípků…" → „tři"). Aby se
v celku netestovala táž věta dvakrát, patří sem spíš vada, která v bloku chybí (tyčinky × čípky za šera).
**NÁVRH ZNĚNÍ (q19 celá):** text `Proč za soumraku vidíme svět skoro černobíle?`
odpovědi `['pracují hlavně tyčinky', 'čípky pracují nejlépe potmě', 'oko si vypne zrakový nerv']`
vysvětlení `Za slabého světla přebírají vidění tyčinky, a ty barvy nerozliší — barvy vidíme čípky za světla.`

### Nález 4.5 (DROBNÉ) — q4: nesmyslné distraktory a únik q1 přes q6
(a) q4 „Jaká je čočka v oku?" má distraktory „rozptylka z kovu" a „ploché zrcadlo" — kov
a zrcadlo v oku odpadnou i bez znalosti učiva.
**NÁVRH ZNĚNÍ (q4 odpovědi):** `['pružná spojka', 'pevná skleněná rozptylka', 'nepružná spojka, která se nemění']`
(b) q6 má v zadání „obraz na sítnici" = celá správná odpověď q1 („vytvořit obraz na sítnici").
**NÁVRH ZNĚNÍ (q6 text):** `Jaký obraz vznikne vzadu v oku na světločivé vrstvě?` (odpovědi beze změny).

---

## 5) rozklad-svetla-duha — 1 nález

Blok je věcně čistý: pořadí barev, lom (ne ohyb), červená nejméně × fialová nejvíce,
jeden odraz u hlavní a dva u vedlejší duhy, červená nahoře, Newton 1671, Marci 17. století,
půlkruh/kruh — vše souhlasí s výkladem i s PDF 28 (a správně opravuje chybu PDF u počtu odrazů).

### Nález 5.1 (DROBNÉ) — kolísá název hlavní duhy: „základní" × „hlavní"
q11 a q12 říkají „základní duha", q13/q14 a výklad „hlavní duha" (výklad: „slabší vedlejší
duha vzniká výš nad hlavní duhou"). Pro žáka to vypadá jako dva různé jevy.
**NÁVRH ZNĚNÍ (q11 text):** `Která barva je u hlavní duhy nahoře?`
**NÁVRH ZNĚNÍ (q12 text):** `Kolikrát se paprsek odrazí uvnitř kapky u hlavní duhy?`
**a q12 vysvětlení:** `Hlavní duha vzniká jedním odrazem uvnitř kapky.`

---

## 6) vnimani-barev — 3 nálezy

### Nález 6.1 (ZÁVAŽNÉ) — q7 vyjmenuje v zadání trojici, která je správnou odpovědí q12
q7: „Jak vznikají doplňkové barvy světla (žlutá, purpurová, azurová)?" — q12 se ptá
„Co znamená zkratka CMYK?" a správná odpověď je „azurová, purpurová, žlutá, černá".
Žák si trojici jen opíše ze zadání q7.
**NÁVRH ZNĚNÍ (q7 text):** `Jak vznikne doplňková barva světla?` (odpovědi i vysvětlení beze změny;
vysvětlení případně doplnit: `Dvě základní barvy světla dohromady dají doplňkovou — žlutou, purpurovou nebo azurovou.`)

### Nález 6.2 (DROBNÉ) — q17: distraktory „reflexe" a „disperze" jsou pojmy mimo výklad
Výklad zavádí jen „pohlcení (absorpce)"; latinské „reflexe/disperze" se v učivu 7. ročníku
nikde neobjeví a jen matou.
**NÁVRH ZNĚNÍ (q17 odpovědi):** `['absorpce', 'odraz', 'rozklad']`
vysvětlení `Pohlcení světla tělesem se odborně nazývá absorpce.`

### Nález 6.3 (DROBNÉ) — q19: zadání se ptá „Proč", ale nepojmenuje, který filtr
„Proč vidíme přes barevný filtr růžové světlo?" → „propustí jen modré a červené světlo".
Otázka předpokládá konkrétní filtr, který nezmiňuje.
**NÁVRH ZNĚNÍ (q19 text):** `Které barvy propustí filtr, přes který vidíme růžové světlo?`
odpovědi `['jen modrou a červenou', 'úplně všechny barvy denního světla', 'žádnou, všechny pohltí']`
vysvětlení `Barevná průhledná látka propustí jen část barev, zbytek pohltí — modrá a červená dají dohromady růžovou.`

---

## Souhrn

| podtéma | otázek | nálezů (závažné / drobné) |
|---|---|---|
| optika-rovinneho-zrcadla | 21 | 3 (0 / 3) |
| kulova-zrcadla-dute-zrcadlo | 21 | 5 (2 / 3) |
| opticka-cocka | 21 | 3 (1 / 2) |
| oko-vady-oka | 21 | 5 (2 / 3) |
| rozklad-svetla-duha | 21 | 1 (0 / 1) |
| vnimani-barev | 21 | 3 (1 / 2) |
| **celkem** | **126** | **20 (6 / 14)** |

## ZAPRACOVÁNO 23. 9. 2026

Všech 20 nálezů zapracováno přesně dle návrhů do `src/data/kvizy.ts` (1.1–1.3, 2.1–2.5,
3.1–3.3, 4.1–4.5, 5.1, 6.1–6.3). Oprava kruhových vysvětlení 4.1/4.2 (oko-vady-oka q13/q15)
podle doslovného návrhu vyvolala nový nález brány `uniky.mjs` (vysvětlení opakovalo přesná
slova distraktoru „před/za sítnicí" u sousední otázky) — přeformulováno beze změny smyslu
(„ostrý obraz by vznikl až za okem" / „už uvnitř oka"), brána teď hlásí 0 úniků. Ostatní
nálezy beze změny oproti návrhu. Ověřeno: `node testy/uniky.mjs` 0 úniků, `node zkontroluj.mjs`
0 chyb, `npm run build` 481 stránek OK, `node testy/vypis-kviz.mjs` 21/21 ve všech 6 blocích.

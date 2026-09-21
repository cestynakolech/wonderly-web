## OBSAH
<h2>Pascalův zákon</h2>

<p><strong>Když na kapalinu v uzavřené nádobě zatlačíme, tlak se rozšíří do všech směrů stejně.</strong> Ukážeme si to na uzavřené baňce plné vody s malými otvory po celém povrchu. Do baňky vede píst — pohyblivá deska, kterou tlačíme přímo do kapaliny.</p>
<p>Když píst zatlačíme, voda nevystřikuje jen dopředu, ale ze všech otvorů najednou a stejně silně. Tlak se totiž v kapalině přenesl rovnoměrně na všechna místa.</p>
<p>Funguje to proto, že kapaliny jsou téměř nestlačitelné. Jejich částice jsou u sebe tak blízko, že se do menšího prostoru už nevejdou.</p>

<h3>Pascalův zákon (přesné znění)</h3>
<p><strong>Tlak vyvolaný vnější silou působící na kapalinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů.</strong> Tlak se tedy zvětší ve všech místech kapaliny stejně.</p>

<h3>Hydraulické zařízení: dva písty</h3>
<p>Tento zákon využívají <strong>hydraulická zařízení</strong> — pomocí kapaliny (obvykle oleje) v nich znásobíme sílu. Mají dvě propojené nádoby s písty: malý píst má obsah S<sub>1</sub>, velký píst má obsah S<sub>2</sub>.</p>
<p>Na malý píst zatlačíme silou F<sub>1</sub>. Tlak p se v kapalině přenese beze změny na velký píst, kde vyvolá mnohem větší sílu F<sub>2</sub>.</p>
<ul>
<li><strong>p = F<sub>1</sub> : S<sub>1</sub> = F<sub>2</sub> : S<sub>2</sub></strong></li>
<li>výsledná síla: <strong>F<sub>2</sub> = F<sub>1</sub> · (S<sub>2</sub> : S<sub>1</sub>)</strong></li>
</ul>
<p>👉 <strong>Zlaté pravidlo hydrauliky:</strong> Kolikrát je druhý píst větší než první, přesně tolikrát větší síla na něj působí. Plocha 100× větší = síla 100× větší.</p>

<h3>Kde hydrauliku využijeme</h3>
<p>Hydraulika pracuje v autodílnách jako <strong>zvedák</strong>, který malou silou nadzvedne celé auto. V autě pomáhá i <strong>brzdám</strong> — přenáší sílu z pedálu na kola.</p>
<p>V průmyslu se používá jako <strong>lis</strong>, který velkou silou stlačuje materiál, a v <strong>bagrech a jeřábech</strong>, které zvedají těžká břemena.</p>
<p>Najdeme ji i v zubařském a lékařském křesle, kde nastavuje pohodlnou výšku, nebo ve výtahu, který nevisí na laně.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Vzorec pro hydraulické zařízení je p = F<sub>1</sub> : S<sub>1</sub> = F<sub>2</sub> : S<sub>2</sub>, odvozeně F<sub>2</sub> = F<sub>1</sub> · (S<sub>2</sub> : S<sub>1</sub>). Do vzorce dosazuj obě plochy ve stejné jednotce.</p>
<p><strong>Příklad z hodiny:</strong> Na malý píst o obsahu S<sub>1</sub> = 3 m² působí síla F<sub>1</sub> = 24 N. Tlak v kapalině je p = F<sub>1</sub> : S<sub>1</sub> = 24 : 3 = 8 Pa.</p>
<p>Velký píst má obsah S<sub>2</sub> = 12 m². Tlak je v celé kapalině stejný, takže síla na něj je F<sub>2</sub> = p · S<sub>2</sub> = 8 · 12 = 96 N.</p>
<p><strong>Příklad: zubařské křeslo.</strong> Zubař tlačí na malý píst (S<sub>1</sub> = 5 cm²) silou F<sub>1</sub> = 20 N. Velký píst má S<sub>2</sub> = 400 cm².</p>
<p>Velký píst je S<sub>2</sub> : S<sub>1</sub> = 400 : 5 = 80krát větší než malý. Síla na něj je proto F<sub>2</sub> = 80 · 20 = 1 600 N.</p>
<p>Ta síla uzvedne hmotnost m = F<sub>2</sub> : g = 1 600 : 10 = 160 kg. Křeslo váží 30 kg, takže pacient může vážit až 160 − 30 = 130 kg.</p>
<p><strong>Hodí se vědět:</strong> Obsah kruhového pístu o poloměru r spočítáme jako S = π · r² (π ≈ 3,14).</p>

## ZAPIS
```json
{
  "vzorec": "p = F₁ : S₁ = F₂ : S₂      (odvozeně: F₂ = F₁ · (S₂ : S₁))",
  "jednotky": [
    "tlak — značíme p, jednotka Pa (pascal)",
    "síla na píst — značíme F₁, F₂, jednotka N (newton)",
    "obsah pístu — značíme S₁, S₂, jednotka m² (metr čtvereční)",
    "Převody: 1 kPa = 1 000 Pa, 1 MPa = 1 000 000 Pa.",
    "Do vzorce dosazuj síly v N a obsahy obou pístů ve stejné jednotce plochy."
  ],
  "vzorecSlovy": "síla na píst dělená obsahem pístu (tlak) je v celém hydraulickém zařízení stejná",
  "zakon": "Tlak vyvolaný vnější silou působící na kapalinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů.",
  "body": [
    "tlak v uzavřené kapalině: všude stejný",
    "kapaliny nestlačitelné → tlak dobře přenášejí",
    "hydraulika: dva písty, stejný tlak",
    "větší plocha pístu → větší síla",
    "využití: zvedák, brzdy, lis, křesla, výtah"
  ]
}
```

## ZDROJE
- Úvod „zatlačíme na kapalinu v uzavřené nádobě, tlak se rozšíří do všech směrů" + baňka s otvory a pístem → dnešní blok temata.ts:1827–1828, věcně shodné s PDF str. 2 („Na obrázku lze vidět, že když zatlačíme na pohyblivý píst uzavřené baňky naplněné vodou... voda nevystřikuje jen ve směru působící síly, ale vystřikuje všemi směry kolmo ke stěnám baňky.") a s PPTX snímkem 25/„image25.jpeg" (obr. 2.3, 2.4 z učebnice) — přeformulováno na kratší věty pro věk 9–10 let, fyzikálně beze změny
- Vysvětlení „píst = pohyblivá deska, kterou tlačíme do kapaliny" → doplněno k vysvětlení cizího slova podle pravidla C, opora ve všech zdrojích (PDF, PPTX), kde se pojem píst používá bez definice
- Vysvětlení nestlačitelnosti kapalin → dnešní blok temata.ts:1829, doslovně shoduje s PDF str. 3: „kapaliny jsou tekuté a téměř dokonale nestlačitelné... částice kapaliny jsou blízko u sebe a při stlačení na sebe působí velkými odpudivými silami" — zjednodušeno na jednu větu bez pojmu „odpudivé síly" (nad rámec 9–10 let)
- Přesné znění Pascalova zákona (pole „zakon") → dnešní blok temata.ts:1827,1853, doslovný citát; shoduje se s PDF str. 2: „Tlak vyvolaný vnější silou působící na tekutinu v uzavřené nádobě se přenáší rovnoměrně do všech směrů. To znamená, že tlak se zvětší ve všech místech tekutiny stejně." (PDF má „tekutinu", dnešní blok i toto podtéma „tlak-v-kapalinách" mají „kapalinu" — ponecháno beze změny jako dosud, podtéma se týká jen kapalin)
- Hydraulické zařízení: dva propojené písty, kapalina (obvykle olej), malá síla na malém pístu → velká síla na velkém pístu → PDF str. 4 („Hydraulika využívá nestlačitelnost kapalin... tlak vyvolaný malou silou na malém pístu se přenáší na druhý větší píst, na němž vyvolá působení větší síly") a PPTX snímky 33–36 (obrázek trojúhelníku p = F/S), převzato obsahově
- Vzorec p = F₁ : S₁ = F₂ : S₂ a F₂ = F₁ · (S₂ : S₁) → dnešní blok temata.ts:1833–1834,1854, shoduje se s PDF str. 5 (F₂ = p · S₂ = F₁/S₁ · S₂) a PPTX snímkem 30 (image21.jpeg, F₂ : F₁ = S₂ : S₁)
- Zlaté pravidlo hydrauliky „kolikrát větší píst, tolikrát větší síla" + „Plocha 100× větší = síla 100× větší." → dnešní blok temata.ts:1836, doslovně shoduje s PDF str. 6: „Kolikrát je druhý píst větší než první, přesně tolikrát větší síla na něj působí." — druhá věta je matematický důsledek zlatého pravidla, v dosavadním bloku byla a je zpět doplněna (oprava po kontrole)
- Využití hydrauliky: zvedák (autodílna), lis, bagry a jeřáby, brzdy auta, zubařská a lékařská křesla, výtah → dnešní blok temata.ts:1842, doslovně: „hydraulické zvedáky a lisy, brzdy automobilů, bagry a jeřáby, zubařská a lékařská křesla, hydraulické výtahy" — v předchozí verzi výkladu chybělo „bagry a jeřáby" a „lékařská křesla", nyní doplněno zpět (oprava po kontrole); shoduje se i s PDF str. 6–8 a PPTX snímkem 25 (obr. 2.24 zvedák pod autem)
- Příklad „z hodiny": S₁ = 3 m², F₁ = 24 N → p = 8 Pa, S₂ = 12 m² → F₂ = 96 N → dnešní blok temata.ts:1838, přesně odpovídá PPTX snímkům 38–42 (zadání „obsah 3m²... obsah 12m²... síla 24N", řešení „p = 8 Pa", „F₂ = 8 . 12 = 96")
- Příklad „zubařské křeslo": S₁ = 5 cm², F₁ = 20 N, S₂ = 400 cm² (80×), F₂ = 1 600 N, m = 160 kg, pacient max 130 kg → dnešní blok temata.ts:1840, odpovídá PDF str. 7 (výpočet přes p a m²: F₁=20N, S₁=0,0005m², S₂=0,04m² tj. 400 cm², F₂=1600N, m=160kg, pacient 130 kg — „rychlejší řešení" v PDF: 400:5=80, F₂=80·20=1600N); PDF má v zadávacím textu překlep „velký píst má plochu 200 cm²", ale ve výpočtu i výsledku používá 400 cm² — ponechána hodnota 400 cm², shodná s dosavadním blokem a s výpočtem v PDF
- Obsah kruhového pístu S = π · r² (π ≈ 3,14) → dnešní blok temata.ts:1844, shoduje se s PPTX snímkem 51 („Obsah kruhu o poloměru r je S = π·r²", „π…Ludolfovo číslo 3,14")
- Zápis (vzorec, zakon, body) → dnešní blok temata.ts:1846–1862, přeuspořádáno do pořadí vzorec → jednotky → vzorecSlovy → zakon → body podle pravidla B, obsahově nic neubráno, jednotky přeformulovány do tvaru „název — značíme X, jednotka Y (název)"; body po kontrole zhuštěny do telegrafické podoby (vzor „pád: polohová → pohybová"), význam každého bodu zachován: přenos tlaku, nestlačitelnost, dva písty se stejným tlakem, vztah plocha↔síla a shrnutí využití

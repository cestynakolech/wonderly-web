## OBSAH
<h2>Transformátor</h2>

<p>Transformátor je zařízení, které mění velikost střídavého napětí. Používá se hlavně při přenosu elektrické energie na velké vzdálenosti a v mnoha zařízeních kolem nás.</p>

<h3>Jak je postavený</h3>
<p>Transformátor má dva obvody, každý se svou cívkou. Cívka, do které přivádíme napětí, se nazývá <strong>primární</strong> (vstupní). Cívka, ze které napětí odebíráme, se nazývá <strong>sekundární</strong> (výstupní). Obě cívky jsou navinuté na společném ocelovém jádře.</p>

<h3>Jak transformátor funguje</h3>
<p>Primární cívka je připojená ke zdroji střídavého napětí. Protéká jí proud, který kolem sebe vytváří proměnlivé magnetické pole. Ocelové jádro toto pole přenese k sekundární cívce, kde se <strong>indukcí</strong> naindukuje nové střídavé napětí. Skoro nic se přitom neztratí — až 98 ze 100 dílů energie projde dál.</p>

<h3>Transformační poměr</h3>
<p>Napětí a počet závitů primární cívky značíme U₁ a N₁, napětí a počet závitů sekundární cívky značíme U₂ a N₂. Napětí se na cívkách mění ve stejném poměru, v jakém se liší počet jejich závitů: <strong>U₂ : U₁ = N₂ : N₁</strong>. Kolikrát víc závitů má cívka, tolikrát vyšší napětí na ní vznikne.</p>

<h3>Transformace nahoru a dolů</h3>
<ul>
<li><strong>Nahoru</strong> — sekundární cívka má víc závitů, napětí <strong>roste</strong>. Tak se zvyšuje napětí za elektrárnou pro dálkový přenos (400 kV) nebo v zapalovací svíčce auta (45 000 V).</li>
<li><strong>Dolů</strong> — sekundární cívka má míň závitů, napětí <strong>klesá</strong>. Tak fungují nabíječky telefonů nebo rozvod napětí do domácnosti (230 V).</li>
</ul>
<p>Proud se přitom mění opačně než napětí — elektrický výkon P = U · I totiž zůstává skoro stejný. Kolikrát napětí klesne, tolikrát proud vzroste, a naopak.</p>

<p>Transformátor funguje <strong>jen se střídavým napětím</strong>. Indukce potřebuje magnetické pole, které se pořád mění, a to vzniká jen tehdy, když se mění i proud v primární cívce. Se stejnosměrným proudem, jaký dává třeba baterka, transformátor nepracuje.</p>

<p>Právě díky transformátorům funguje rozvodná síť: napětí z elektrárny se nejdřív zvýší pro dálkový přenos, po cestě k domácnostem se postupně sníží. Malé transformátory najdeme i v nabíječkách a v mnoha domácích spotřebičích.</p>

<h3>Velký proud z transformátoru</h3>
<p>Transformátor umí vyrobit i velký proud při nízkém napětí. Používá se to tam, kde je potřeba roztavit nebo spojit kov teplem.</p>
<ul>
<li><strong>Indukční pec</strong> — velký proud v cívce roztaví kov.</li>
<li><strong>Svařování elektrickým obloukem</strong> — teplota oblouku dosahuje až 6 000 °C.</li>
<li><strong>Pistolová páječka</strong> — malá cívka s jedním závitem pájí elektrické obvody.</li>
</ul>

<h3>Pro zvídavé: počítáme</h3>
<p>Transformační poměr k porovnává počty závitů: <strong>k = N₂ : N₁</strong>, a platí i <strong>U₂ = k · U₁</strong>.</p>
<p><strong>Příklad 1 — transformace dolů:</strong> Primární cívka má 500 závitů a napětí 200 V. Sekundární cívka má 100 závitů. Jaké napětí bude na sekundární cívce?</p>
<p>k = N₂ : N₁ = 100 : 500 = 0,2<br>U₂ = k · U₁ = 0,2 · 200 = <strong>40 V</strong></p>
<p>Výstupní napětí je nižší než vstupní — jde o transformaci dolů.</p>
<p><strong>Příklad 2 — transformace nahoru:</strong> Primární cívka má 100 závitů a napětí 200 V. Sekundární cívka má 500 závitů. Jaké napětí bude na sekundární cívce?</p>
<p>k = N₂ : N₁ = 500 : 100 = 5<br>U₂ = k · U₁ = 5 · 200 = <strong>1 000 V</strong></p>
<p>Výstupní napětí je vyšší než vstupní — jde o transformaci nahoru.</p>

## ZAPIS
```json
{
  "vzorec": "U₂ : U₁ = N₂ : N₁      (odvozeně: U₂ = U₁ · N₂ : N₁,  U₁ = U₂ · N₁ : N₂)",
  "jednotky": [
    "primární napětí — značíme U₁, jednotka V (volt)",
    "sekundární napětí — značíme U₂, jednotka V (volt)",
    "počet závitů primární cívky — značíme N₁, bez jednotky (jen počet)",
    "počet závitů sekundární cívky — značíme N₂, bez jednotky (jen počet)",
    "Převod: 1 kV = 1 000 V. Do vztahu dosazuj obě napětí ve V a počty závitů jako celá čísla."
  ],
  "vzorecSlovy": "poměr sekundárního a primárního napětí je stejný jako poměr počtu závitů sekundární a primární cívky",
  "body": [
    "mění velikost střídavého napětí, slouží k přenosu energie",
    "primární a sekundární cívka na společném ocelovém jádře",
    "v sekundární cívce se indukuje napětí",
    "účinnost přenosu až 98 %",
    "napětí ~ počet závitů (stejný poměr)",
    "nahoru: víc závitů, napětí ↑, proud ↓",
    "dolů: míň závitů, napětí ↓, proud ↑",
    "funguje jen na střídavý proud"
  ]
}
```
(Pole "zakon" vynecháno — PDF ani prezentace nemají u transformátoru formulovaný samostatný zákon, jen "rovnici transformátoru".)

## ZDROJE
- Definice transformátoru (přenos energie + změna napětí) → PDF str. 1, doslovný citát, mírně zjednodušeno pro 9–10 let
- Stavba: dva obvody, každý svá cívka, společné ocelové jádro → PDF str. 2
- Primární cívka na zdroji střídavého napětí, v sekundární se indukcí naindukuje střídavé napětí → PDF str. 3, prezentace Elektřina 9.md snímek 23
- Transformátor pracuje jen na střídavé napětí (indukce potřebuje proměnlivé pole) → PDF str. 3–4
- Společné jádro přenáší pole bez velkých ztrát, účinnost přenosu až 98 % → PDF str. 4, doslovný citát „bez velkých ztrát energie do okolí (účinnost přenosu může být až 98 %)"; dětsky přeformulováno na „skoro nic se neztratí — až 98 ze 100 dílů energie projde dál" — DOPLNĚNO (v předchozí verzi tento fakt z dosavadního bloku i z PDF vypadl, teď vráceno do OBSAH i ZAPIS.body
- Značení U₁, N₁ (primární) a U₂, N₂ (sekundární) uvedeno větou před vzorcem → shrnutí PDF str. 3 a 5 (schéma s popisky U₁, U₂), doplněno kvůli srozumitelnosti vzorce
- Rovnice transformátoru U₂ : U₁ = N₂ : N₁, transformační poměr k = U₂/U₁ = N₂/N₁ → PDF str. 5
- Transformace nahoru (k>1, víc závitů, napětí roste): dálkový přenos 400 kV, zapalovací svíčka 45 000 V → PDF str. 5–6, doslovná čísla
- Transformace dolů (k<1, míň závitů, napětí klesá): nabíječky telefonů/notebooků, rozvod 230 V do domácnosti → PDF str. 7–8
- Proud se mění v opačném poměru než napětí, výkon P = U·I zůstává stejný (vztah I₁:I₂ = N₂:N₁ z PDF str. 9 popsán jen kvalitativně, do zápisu se nezavádí jako samostatný vzorec — dosavadní blok temata.ts ho také neměl jako vzorec, jen slovně)
- Indukční pec, svařování elektrickým obloukem (teplota oblouku až 6 000 °C), pistolová páječka → PDF str. 10–13, dosavadní blok temata.ts měl tuto část jako odstavec, teď rozepsáno do bodů kvůli srozumitelnosti
- Příklad 1 (500 závitů/200 V/100 závitů → k=0,2 → 40 V) a příklad 2 (100 závitů/200 V/500 závitů → k=5 → 1 000 V) → doslovné hodnoty z prezentace Elektřina 9.md, snímky 25–26, a shodně i z dosavadního bloku temata.ts (temata.ts:4515–4516); oba výpočty přepočítány a sedí
- Celý dosavadní obsah (temata.ts:4496–4533) zachován — jen přeuspořádán do plynulé linie (účel → stavba → princip/účinnost → poměr → nahoru/dolů → jen střídavý proud → přenos/rozvodná síť/nabíječky → velký proud), jazyk zjednodušen, náročné počítání přesunuto pod "Pro zvídavé"; pole `interakce`, `materialy` (YouTube video) se podle zadání neměnily

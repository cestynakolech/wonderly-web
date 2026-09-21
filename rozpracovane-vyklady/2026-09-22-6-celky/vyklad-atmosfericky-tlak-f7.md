## OBSAH
<h2>Atmosférický tlak</h2>
<p><strong>Atmosféra</strong> je plynný obal Země tvořený vzduchem: přibližně <strong>78 % dusíku, 21 % kyslíku</strong> a 1 % dalších plynů.</p>
<p>Na částice vzduchu působí gravitační síla Země — horní vrstvy tlačí na spodní, a tak vzniká <strong>atmosférický tlak</strong>. Na jeho velikost má vliv i teplota vzduchu, množství vodní páry v ovzduší, nadmořská výška a zeměpisná šířka místa.</p>

<h3>Vlastnosti</h3>
<ul>
<li>značka <strong>pa</strong>, jednotka pascal (Pa); v meteorologii <strong>hPa</strong> (1 hPa = 100 Pa)</li>
<li>největší je u povrchu Země, <strong>s výškou klesá</strong> (ve velehorách je „řídký vzduch")</li>
<li>hustota vzduchu u povrchu je přibližně 1,23 kg/m³ a s výškou také klesá</li>
</ul>

<h3>Normální tlak</h3>
<p>Dohodnutá hodnota <strong>101 325 Pa ≈ 1 013 hPa</strong> — průměrný tlak u hladiny moře; odpovídá 760 mm rtuťového sloupce (mmHg).</p>

<h3>Torricelliho pokus (1643)</h3>
<p>Evangelista Torricelli naplnil trubici rtutí a obrátil ji do misky — rtuť klesla na výšku asi 760 mm. Sloupec drží právě atmosférický tlak. Kdyby použil vodu místo rtuti, musela by být trubice vysoká skoro 10 metrů.</p>
<p>Na tomto principu funguje <strong>rtuťový barometr</strong>; kovový barometr se jmenuje <strong>aneroid</strong> a zapisovací <strong>barograf</strong>.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Velikost tlaku šla z Torricelliho pokusu spočítat vzorcem pro hydrostatický tlak: p<sub>h</sub> = h · ρ · g.</p>
<p>Rtuť má hustotu ρ = 13 500 kg/m³ a sloupec byl vysoký h = 0,76 m. Gravitační konstanta je g = 10 N/kg.</p>
<p>p<sub>h</sub> = h · ρ · g = 0,76 · 13 500 · 10 = <strong>102 600 Pa</strong></p>
<p>To je skoro stejná hodnota jako normální atmosférický tlak 101 325 Pa. Pokus tak potvrdil, jak velký tlak vzduch doopravdy má.</p>

<h3>Využití v praxi</h3>
<p>Přísavky drží na hladkém povrchu díky tlaku atmosféry (pod přísavkou vzduch není). Tlak vzduchu souvisí i s počasím — viz Meteorologie.</p>

## ZAPIS
```json
{
  "jednotky": [
    "atmosférický tlak — značíme pa, jednotka Pa (pascal); v meteorologii hPa, 1 hPa = 100 Pa"
  ],
  "body": [
    "atmosféra: plynný obal Země",
    "vzduch: 78 % dusík, 21 % kyslík, 1 % ostatní",
    "tlak vzniká: gravitace tlačí vzduch dolů",
    "tlak: u povrchu největší, s výškou klesá",
    "hustota vzduchu: ~1,23 kg/m³, s výškou klesá",
    "na tlak působí: teplota, vlhkost, výška, šířka",
    "normální tlak = 101 325 Pa ≈ 1 013 hPa",
    "normální tlak = 760 mm rtuti (mmHg)",
    "Torricelliho pokus 1643: rtuť v trubici",
    "barometry: rtuťový, aneroid (kovový), barograf (zapisuje)",
    "výpočet: 0,76 · 13 500 · 10 = 102 600 Pa",
    "přísavky: drží díky tlaku atmosféry"
  ]
}
```

## ZDROJE
- Dosavadní blok `atmosfera-a-tlak-vzduchu/atmosfericky-tlak` v `temata.ts` (nazev „Atmosférický tlak", interakce `barometr`) — všechny věty a čísla zachovány, jen přeorganizovány a doplněny podle formátu kontraktu (H2 → H3 bloky, ZAPIS.body telegraficky).
- „Atmosféra je plynný obal Země", složení vzduchu 78 % dusíku, 21 % kyslíku, 1 % dalších plynů → PDF str. 2 (doslovně: „vzduch obsahuje přibližně 78% dusíku a 21% kyslíku, 1% tvoří malé množství dalších plynů"), shoda s dosavadním blokem a s popisem prezentace „Mechanické vlastnosti kapalin 7.md" snímek 100 (koláčový graf 78 % N₂, 21 % O₂, 1 % ostatní).
- „Na částice vzduchu v atmosféře působí Země gravitační silou ➪ horní vrstvy atmosféry tlačí na spodní vrstvy ➪ vzniká tlak" → PDF str. 2, shoda s dosavadním blokem.
- Faktory ovlivňující velikost atmosférického tlaku (teplota vzduchu, obsah vodní páry, nadmořská výška, zeměpisná šířka) → PDF str. 4, doslovně: „na velikost atmosférického tlaku má vliv teplota vzduchu, obsah vodní páry v atmosféře, nadmořská výška a zeměpisná šířka" — NOVÁ látka ze zdroje, dosud na webu chyběla, doplněno.
- Značka pa, jednotka pascal (Pa), v meteorologii hPa, 1 hPa = 100 Pa → PDF str. 4, shoda s dosavadním blokem.
- „Atmosférický tlak je největší u povrchu Země" a „s narůstající nadmořskou výškou se atmosférický tlak zmenšuje" → PDF str. 4, shoda s dosavadním blokem.
- OPRAVA (nález 1): hustota vzduchu u povrchu Země. PDF str. 2 uvádí doslova „hustota vzduchu je největší u povrchu Země: 1,23 kg/m3". Dosavadní blok `temata.ts` i popis prezentace (snímek 101: „Hustota vzduchu u Země je 1,29 kg/m³") uváděly 1,29 kg/m³ (hodnota vzduchu při 0 °C). Podle platného rozhodnutí má při rozporu mezi PDF a webem přednost PDF — hodnota opravena na 1,23 kg/m³.
- ODEBRÁNO (nález 2): věta o poklesu tlaku s výškou (0 m ≈ 101 000 Pa, 5 000 m ≈ 56 000 Pa, 10 000 m ≈ 29 000 Pa) byla vypuštěna. PDF tuto řadu neobsahuje a popis prezentace (snímek 100) má popisky výšek a hodnot promíchané — přiřazení jednotlivých výšek k tlakům bylo jen vlastní interpretací bez pevné opory, proto podle pravidla „tvrzení bez opory v PDF i v dosavadním bloku se vypouští" odstraněno.
- Normální tlak 101 325 Pa, zaokrouhleně 1 013 hPa, průměrný tlak u hladiny moře, odpovídá 760 mm rtuťového sloupce (mmHg) → PDF str. 7, shoda s dosavadním blokem.
- Torricelliho pokus — naplnění trubice rtutí a obrácení do misky, rtuť klesne na výšku, tlak vzduchu se rovná hydrostatickému tlaku rtuťového sloupce → PDF str. 6 (rok pokusu v extrahovaném textu PDF vytištěn jako „1964", což odporuje datům narození/úmrtí Torricelliho 1608–1647 uvedeným v popisu prezentace snímek 101 — jde zjevně o chybu při extrakci textu z PDF; dosavadní blok temata.ts uváděl historicky správný rok 1643, ponecháno beze změny).
- Kdyby byla v trubici voda místo rtuti, musel by být sloupec vysoký skoro 10 m → popis prezentace snímek 101 („Tlaková síla vzduchu udrží sloupec vody v hadici o výšce přibližně 10 m"). NOVÁ látka ze zdroje (prezentace), doplněno jako vysvětlení, proč Torricelli použil rtuť.
- Rtuťový barometr, aneroid (kovový tlakoměr), barograf (barometr se zapisovačem) → PDF str. 8–10, shoda s dosavadním blokem.
- Výpočet p_h = h · ρ · g = 0,76 · 13 500 · 10 = 102 600 Pa (rtuť ρ = 13 500 kg/m³, h = 0,76 m, g = 10 N/kg), výsledek blízký normálnímu tlaku 101 325 Pa → hodnoty ρ a g převzaty z popisu prezentace snímek 101; vzorec p_h = h·ρ·g je vzorec podtématu „hydrostatický tlak" (celek Tlak v kapalinách), zde použit jen jako doplňkový výpočet vysvětlující Torricelliho pokus — přepočítáno (0,76 × 13 500 = 10 260; × 10 = 102 600), výsledek vychází jako celé číslo.
- Přísavky drží na povrchu díky tlaku atmosféry, pod přísavkou není vzduch → PDF str. 11, shoda s dosavadním blokem.
- Úvodní kapitola PDF str. 1 „Vlastnosti plynů" a „Částice plynů" (nemají vlastní tvar, tekutost, dělitelnost, rozpínavost, stlačitelnost) → MIMO SCOPE tohoto podtématu, tato látka je již vyučována v podtématu `skupenstvi-latek` (6. ročník, celek Látka a těleso), zde by šlo o duplicitu.
- Obsah o tlakové výši/níži, izobarách a měření meteorologických veličin (PDF str. 7 a popis prezentace snímky 98–99) → MIMO SCOPE tohoto podtématu, již pokryto podtématem `meteorologie-a-mereni-tlaku` ve stejném celku; v OBSAH ponechána jen krátká odkazující věta „Tlak vzduchu souvisí i s počasím — viz Meteorologie" (dosavadní blok).
- Obsah o vrstvách atmosféry (troposféra, stratosféra, mezosféra, termosféra, exosféra) → popis prezentace snímky 96–97, PDF tuto látku vůbec neobsahuje. MIMO SCOPE tohoto podtématu (podtéma se jmenuje „Atmosférický tlak", ne „Vrstvy atmosféry") — NAVRŽENO K DOPLNĚNÍ jako případné nové podtéma, k rozhodnutí učitele.
- OPRAVA (nález 3): ZAPIS doplněn o klíč `jednotky` podle bodu B kontraktu, protože OBSAH značku a jednotku tlaku výslovně učí a PDF str. 4 je uvádí jako samostatné odrážky („značka: p s indexem a (jako atmosféra) pa", „jednotka: pascal (Pa)", „z historických a praktických důvodů se v meteorologii používá hektopascal (hPa), 1 hPa = 100 Pa").
- OPRAVA (nález 4, metakomentář): odstraněny procesní věty o spuštěných příkazech a citace číslem řádku. Ověření shody s dosavadním blokem `atmosfericky-tlak` (temata.ts): věty „Atmosféra je plynný obal Země tvořený převážně dusíkem a kyslíkem.", „Normální atmosférický tlak u hladiny moře je přibližně 1 013 hPa." a „Atmosférický tlak měříme barometrem; aneroid je kovový barometr a barograf zapisuje průběh tlaku." jsou v novém textu obsahově zachovány.
- OPRAVA (nález 5): v sekci „Pro zvídavé: počítáme" rozděleny dvě věty přes 20 slov na kratší věty (hustota a výška sloupce zvlášť od gravitační konstanty; srovnání s normálním tlakem zvlášť od závěru o potvrzení pokusu).

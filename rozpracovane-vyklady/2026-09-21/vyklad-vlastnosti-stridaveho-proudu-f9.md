## OBSAH
<h2>Vlastnosti střídavého proudu</h2>

<p>Z baterky teče proud pořád jedním směrem. Říkáme mu <strong>stejnosměrný</strong>. Ze zásuvky ale teče jiný proud — pravidelně mění velikost i směr. Říkáme mu <strong>střídavý</strong>. Vzniká otáčením cívky v magnetickém poli, jako u alternátoru.</p>

<h3>Perioda a frekvence</h3>
<p>Když zakreslíme, jak se proud v čase mění, dostaneme pravidelnou vlnovku. Fyzikové jí říkají <strong>sinusoida</strong>. Elektrony ve vodiči přitom opakovaně mění směr podle toho, jak se cívka zrovna otáčí.</p>
<p>Vlnovka se pořád stejně opakuje. Nejkratší doba, za kterou se jedna vlna zopakuje, se jmenuje <strong>perioda</strong>. Značíme ji <strong>T</strong> a měříme v sekundách. Je to zároveň doba jedné otočky cívky v alternátoru.</p>
<p>Kolik takových otoček proběhne za jednu sekundu, tomu říkáme <strong>frekvence</strong>. Značíme ji <strong>f</strong> a měříme v hertzích (Hz). Platí vztah <strong>f = 1 : T</strong> — čím kratší perioda, tím vyšší frekvence.</p>

<h3>50 hertzů v síti</h3>
<p>V naší rozvodné síti má proud frekvenci přesně <strong>50 Hz</strong>. Cívka v alternátoru se otočí padesátkrát za sekundu. Proud se proto stokrát za sekundu na okamžik vynuluje — a přesto žárovka nebliká. Vlákno je tak rozžhavené, že za tak krátkou chvíli nestihne vychladnout, a naše oko by tak rychlou změnu stejně nepostřehlo.</p>

<h3>Maximální a efektivní hodnota</h3>
<p>Proud i napětí se pořád mění, a tak fyzikové zavedli dvě důležité hodnoty. <strong>Maximální hodnota</strong> (I<sub>m</sub>, U<sub>m</sub>) je největší velikost proudu nebo napětí. Nastane dvakrát za periodu, jednou v každém směru.</p>
<p><strong>Efektivní hodnota</strong> (I, U) je taková velikost stejnosměrného proudu, který má stejné účinky. Je zhruba <strong>70 %</strong> maximální hodnoty. V naší síti má napětí efektivní hodnotu <strong>230 V</strong>.</p>
<p>Právě efektivní hodnotu ukazují měřicí přístroje jako voltmetr — okamžitou hodnotu totiž nedokážou sledovat. Výkon spotřebiče počítáme z efektivních hodnot napětí a proudu: <strong>P = U · I</strong>.</p>

<h3>Proč vůbec střídavý proud?</h3>
<p>Stejnosměrný proud by byl jednodušší. Střídavé napětí ale umí <strong>transformátor</strong> snadno zvýšit i snížit, stejnosměrné ne.</p>
<p>Vedení ztrácí energii zahříváním drátů a ztráty rostou s proudem. Elektrárna proto napětí zvýší až na stovky kilovoltů. Proud tím klesne a vedení skoro netopí. Před domem se napětí zase sníží na 230 V. Bez střídavého proudu by dálkový přenos elektřiny nebyl možný a elektrárna by musela stát v každém městě.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Ze vzorce f = 1 : T spočítáme, jak dlouho trvá jedna otočka cívky při frekvenci 50 Hz:</p>
<p>T = 1 : f = 1 : 50 = <strong>0,02 s</strong>, tedy 20 milisekund.</p>
<p>Maximální napětí spočítáme z efektivní hodnoty vynásobením číslem <strong>1,4</strong>: 230 · 1,4 = <strong>322 V</strong>. Přesnější číslo je odmocnina ze dvou (asi 1,41) a s ní vyjde skutečná špička napětí v zásuvce asi <strong>325 V</strong>. Proto se u součástek hlídá, jaké napětí vydrží — a zásuvka je nebezpečnější, než se podle čísla 230 V zdá.</p>

<h3>Příklady z hodiny</h3>
<ol>
<li>Cívka alternátoru se otáčí s frekvencí <strong>25 Hz</strong>. Jak dlouho trvá jedna otočka (perioda)? <details><summary>řešení</summary>T = 1 : f = 1 : 25 = <strong>0,04 s</strong> (40 milisekund)</details></li>
<li>Perioda střídavého proudu je <strong>0,01 s</strong>. Jaká je jeho frekvence? <details><summary>řešení</summary>f = 1 : T = 1 : 0,01 = <strong>100 Hz</strong></details></li>
<li>Na cívce naměříme <strong>maximální napětí 140 V</strong>. Jaké napětí ukáže voltmetr (efektivní hodnota)? <details><summary>řešení</summary>Voltmetr ukazuje efektivní hodnotu: U = U<sub>m</sub> : 1,4 = 140 : 1,4 = <strong>100 V</strong></details></li>
<li>Elektrickým vařičem v zásuvce (230 V) prochází proud <strong>2 A</strong>. Jaký je jeho výkon? <details><summary>řešení</summary>P = U · I = 230 · 2 = <strong>460 W</strong></details></li>
</ol>

## ZAPIS
```json
{
  "vzorec": "f = 1 : T      (odvozeně: T = 1 : f)      P = U · I      (odvozeně: U = P : I,  I = P : U)",
  "jednotky": [
    "perioda — značíme T, jednotka s (sekunda)",
    "frekvence — značíme f, jednotka Hz (hertz)",
    "napětí — značíme U, jednotka V (volt)",
    "proud — značíme I, jednotka A (ampér)",
    "výkon — značíme P, jednotka W (watt)",
    "Do vzorců dosazuj periodu v sekundách, frekvenci v hertzích, napětí ve voltech a proud v ampérech.",
    "Převody: 1 kHz = 1 000 Hz, 1 ms = 0,001 s, 1 kW = 1 000 W."
  ],
  "vzorecSlovy": "frekvence se rovná jedné děleno periodou; výkon se rovná napětí krát proud",
  "body": [
    "střídavý proud: graf je sinusoida, mění velikost i směr",
    "T = perioda — doba jedné otočky cívky (s)",
    "f = frekvence — počet otoček za sekundu (Hz), f = 1 : T",
    "Im, Um = maximální hodnota; efektivní hodnota = co ukazují přístroje (~70 % maxima)",
    "síť: napětí 230 V (efektivní), frekvence 50 Hz",
    "výkon: P = U · I"
  ]
}
```
(pole „zakon" vynecháno — zdroj neobsahuje doslovné znění zákona, jen vztah f = 1 : T)

## ZDROJE
- Otáčení cívky v magnetickém poli vytváří pravidelně proměnné napětí → PDF str. 1, doslovně
- Zdroj: zapojení do zásuvky → PDF str. 2
- Elektrony opakovaně mění směr podle polarity zdroje → PDF str. 3–4, doslovně
- Srovnání stejnosměrný vs. střídavý proud v úvodu → PDF přímé srovnání neobsahuje; navazuje na dnešní blok (temata.ts:4427, „elektrony mění směr") a na sousední podtéma alternátor (temata.ts:4403, „komutátor → stejnosměrný proud, dynamo") — doplněno kvůli plynulosti podle bodu A zadání (stejnosměrný proud je látka nižších ročníků, jen kontrast, bez nových čísel)
- Graf je sinusoida → PDF str. 5, doslovně
- Perioda T — nejkratší opakující se doba, doba jedné otočky, jednotka s → PDF str. 6, doslovně
- Frekvence f — počet period/otoček za sekundu, jednotka Hz, vztah f = 1/T → PDF str. 6, doslovně
- Maximální hodnota Iₘ, Uₘ — největší hodnota, nastává dvakrát za periodu v opačné polaritě → PDF str. 7, doslovně
- Efektivní hodnota I, U — odpovídá stejnosměrnému proudu se stejnými účinky, měří ji přístroje, je 70 % maximální hodnoty → PDF str. 7, doslovně
- Výkon P = U · I, počítá se z efektivních hodnot → PDF str. 8, doslovně
- V rozvodné síti efektivní napětí 230 V, frekvence 50 Hz → PDF str. 9, doslovně
- Proud se stokrát za sekundu vynuluje, žárovka nebliká (vlákno nestihne vychladnout) a naše oko by tu rychlou změnu stejně nepostřehlo → dnešní blok temata.ts:4442–4444, doslovně, v PDF není, ponecháno beze změny (věta o oku vrácena po kontrole)
- Výpočet T = 1 : 50 = 0,02 s = 20 ms → dnešní blok temata.ts:4448–4450, vzorec f = 1/T doložen PDF str. 6, přepočítáno: 1 : 50 = 0,02 s ✓
- Koeficient 1,4 (max = efektivní · 1,4 = 322 V), přesněji √2 ≈ 1,41 → 325 V → dnešní blok temata.ts:4451–4456, v PDF konkrétní koeficient není (PDF má jen „efektivní = 70 % maximální"), ponecháno beze změny jako dosavadní obsah; přepočítáno: 230 · 1,4 = 322 ✓
- Proč střídavý proud — transformátor mění napětí nahoru/dolů, stejnosměrný ne → dnešní blok temata.ts:4459–4460, v PDF podtématu není, souvisí s podtématem transformátor, ponecháno
- Ztráty vedení rostou s proudem, transformace nahoru na stovky kV, snížení na 230 V před domem, „bez střídavého proudu by dálkový přenos nebyl možný a elektrárna by musela stát v každém městě" → dnešní blok temata.ts:4461–4465, doslovně, v PDF není, ponecháno (závěrečná věta vrácena po kontrole)
- 4 příklady z hodiny (25 Hz→0,04 s; 0,01 s→100 Hz; 140 V→100 V; 230 V a 2 A→460 W) → dnešní blok temata.ts:4467–4471, VLASTNÍ PŘÍKLADY (v PDF konkrétní čísla nejsou), všechny přepočítány a vycházejí přesně: 1:25=0,04; 1:0,01=100; 140:1,4=100; 230·2=460
- Prezentace „Elektřina 9.md": ke slidům pro toto konkrétní podtéma (sinusoida, perioda, efektivní hodnota) nebyl nalezen samostatný popis — snímky u této pozice popisují sousední podtémata (generátor/alternátor a transformátor); k tomuto podtématu tedy sloužilo jen PDF
- Po kontrole (2. kolo) sloučeny nadpisy „Graf: sinusoida" + „Perioda" + „Frekvence" → jeden h3 „Perioda a frekvence" a „Maximální a efektivní hodnota" + „Měření a výkon" → jeden h3 „Maximální a efektivní hodnota"; obsah odstavců beze změny, jen struktura nadpisů podle dosavadního bloku

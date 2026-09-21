## OBSAH
<h2>Ohmův zákon</h2>
<p>Připojíš-li žárovku k téměř vybité baterii, svítí jen slabě a motorek se otáčí pomalu. K plně nabité baterii svítí jasně a motorek se otáčí rychle. <strong>Elektrické napětí</strong> a <strong>elektrický proud</strong> ve vodiči spolu úzce souvisí. Závislost proudu na napětí prokázal pokusy v roce 1826 německý fyzik <strong>Georg Simon Ohm</strong>.</p>

<h3>Pokus: měníme napětí, měříme proud</h3>
<p>Do obvodu zapojíme žárovku, <strong>ampérmetr</strong> a <strong>voltmetr</strong>. Ampérmetr měří proud <strong>I</strong> v ampérech (A), voltmetr měří napětí <strong>U</strong> ve voltech (V).</p>
<p>Postupně zvyšujeme napětí na zdroji a pokaždé odečteme proud. Výsledek je jasný: <strong>kolikrát se zvětší napětí, tolikrát se zvětší proud</strong>. V grafu proudu podle napětí je to přímka, která vychází z počátku.</p>

<h3>Znění zákona</h3>
<p><strong>Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče.</strong> Konstantou této úměrnosti (ve vztahu U = R · I) je fyzikální veličina <strong>elektrický odpor R</strong>. Čím větší odpor vodič má, tím menší proud jím při stejném napětí prochází.</p>

<h3>Elektrický odpor</h3>
<p>Elektrický odpor popisuje, jak moc vodič brání průchodu proudu. Značíme ho <strong>R</strong> a jeho jednotka je <strong>ohm</strong>, značka <strong>Ω</strong> (čti „óm", zapisujeme řeckým písmenem omega). Přímo ho měří přístroj <strong>ohmmetr</strong>. My ho ale většinou určíme nepřímo — změříme napětí a proud a vypočítáme jejich podíl.</p>
<p>Odpor samotného vodiče (drátu) bývá zanedbatelný. Mnohem důležitější je odpor zapojených spotřebičů, třeba žárovky nebo topné spirály vařiče. Jejich odpor rozhoduje, kolik proudu obvodem poteče. Ve výpočtech proto se spotřebiči počítáme jako s rezistory s danou hodnotou odporu.</p>

<h3>Tři podoby vzorce</h3>
<p>Ze znění zákona plynou tři vzorce: <strong>I = U : R</strong>, <strong>U = R · I</strong> a <strong>R = U : I</strong>. Když známe dvě veličiny, třetí dopočítáme. Při stejném napětí platí: čím <strong>větší odpor</strong>, tím <strong>menší proud</strong> vodičem prochází.</p>

<h3>Pozor na teplotu</h3>
<p>Ohmův zákon platí přesně jen <strong>za stálé teploty</strong> vodiče. Odpor kovů s rostoucí teplotou <strong>roste</strong> — proto třeba u rozžhaveného vlákna žárovky už proud není přesně přímo úměrný napětí. Výjimkou je slitina <strong>konstantan</strong>, jejíž odpor se s teplotou skoro nemění. Proto se z ní vyrábějí rezistory, u kterých má Ohmův zákon platit spolehlivě.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Vodičem při napětí 10 V teče proud 0,2 A. Jeho odpor spočítáme z Ohmova zákona:</p>
<p>R = U : I = 10 : 0,2 = <strong>50 Ω</strong></p>
<p>Horší vodič propustí při stejném napětí jen 0,05 A.</p>
<p>R = 10 : 0,05 = <strong>200 Ω</strong> — čtvrtinový proud znamená čtyřnásobný odpor.</p>
<p>Vzorec funguje i naopak. Rezistor s odporem 6 Ω je připojený k napětí 12 V. Kolik jím prochází proudu?</p>
<p>I = U : R = 12 : 6 = <strong>2 A</strong></p>
<p>A ještě jednou jinak: rezistorem s odporem 4 Ω prochází proud 3 A. Jaké je na něm napětí?</p>
<p>U = R · I = 4 · 3 = <strong>12 V</strong></p>

## ZAPIS
```json
{
  "vzorec": "I = U : R      (odvozeně: U = R · I,  R = U : I)",
  "jednotky": [
    "elektrický proud — značíme I, jednotka A (ampér)",
    "elektrické napětí — značíme U, jednotka V (volt)",
    "elektrický odpor — značíme R, jednotka Ω (ohm)",
    "Převody: 1 mΩ = 0,001 Ω,  1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω,  1 MΩ = 1 000 000 Ω.",
    "Do vzorce dosazuj proud v A, napětí ve V a odpor v Ω."
  ],
  "vzorecSlovy": "proud = napětí děleno odporem;  napětí = odpor krát proud;  odpor = napětí děleno proudem",
  "zakon": "Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče a nepřímo úměrný elektrickému odporu R.",
  "body": [
    "napětí ↑ → proud ↑ (přímá úměrnost)",
    "R = odpor, konstanta úměrnosti",
    "větší odpor → menší proud",
    "R měříme nepřímo: R = U : I",
    "platí jen za stálé teploty",
    "konstantan: odpor stálý s teplotou"
  ]
}
```

## ZDROJE
- Úvod (žárovka/motorek na vybité vs. nabité baterii, Ohm objevil zákon roku 1826) → PDF str. 1, shoda s dosavadním blokem temata.ts
- Doslovné znění zákona „Elektrický proud I procházející vodičem je přímo úměrný napětí U mezi konci vodiče." → PDF str. 2, doslovný citát, ponecháno v OBSAH beze změny. Věta „Čím větší odpor vodič má, tím méně je ochoten napětí měnit v proud." přeformulována na „Čím větší odpor vodič má, tím menší proud jím při stejném napětí prochází." (PDF str. 4, doslovně: „při stejném napětí platí, že čím větší je odpor vodiče, tím menší je proud"), protože napětí se v proud „nemění". Věta o konstantě úměrnosti vázána na tvar U = R · I, aby odpovídala tomu, ve kterém vztahu je R konstantou.
- ZAPIS.zakon nese „a nepřímo úměrný elektrickému odporu R" — v doslovné citaci PDF str. 2 tato část není, ale dosavadní blok `temata.ts` ji v poli `zapis.zakon` měl, proto zůstala. Vztah k R je zároveň vysvětlen v OBSAH (odstavec „Znění zákona") a doložen PDF str. 3 („konstantou úměrnosti je fyzikální veličina elektrický odpor R", „při stejném napětí platí, že čím větší je odpor vodiče, tím menší je proud procházející vodičem").
- „Kolikrát se zvětší napětí, tolikrát se zvětší proud", „Konstantou úměrnosti je elektrický odpor R" → PDF str. 3, převzato téměř doslovně, shoda s dosavadním blokem
- Pokus s ampérmetrem a voltmetrem, rostoucí napětí → rostoucí proud, graf jako přímka z počátku → PDF str. 2 (schéma obvodu s V a A) a str. 5 (graf závislosti proudu na napětí, přímky procházející bodem 0)
- Vysvětlení, že ampérmetr měří proud I v ampérech (A) a voltmetr napětí U ve voltech (V) → jednotky A a V doloženy PDF str. 5 (osy grafu „I (mA)" a „U (V)") / str. 2 (schéma obvodu) a ZAPIS.jednotky.
- Definice odporu „popisuje míru, s jakou vodič brání průchodu elektrického proudu", jednotka ohm (Ω), čtení „óm", měřidlo ohmmetr → PDF str. 3
- Odpor samotného vodiče zanedbatelný vs. důležitost odporu spotřebičů (žárovka, topná spirála vařiče) → PDF str. 5
- Věta „při výpočtech elektrických proudů a napětí v obvodech pracujeme se spotřebiči jako s rezistory s danou hodnotou elektrického odporu" → PDF str. 6.
- Tři vzorce I = U/R, U = R·I, R = U/I → PDF str. 3, shoda s dosavadním blokem temata.ts
- Odpor určujeme nepřímo výpočtem z naměřeného U a I; při stejném napětí větší odpor → menší proud → PDF str. 3–4, shoda s dosavadním blokem
- Ohmův zákon platí jen za stálé teploty; odpor kovů s teplotou roste; konstantan jako výjimka → PDF str. 6, shoda s dosavadním blokem
- Příklad „10 V, 0,2 A → 50 Ω" (lepší vodič) → PDF str. 5, shoda s dosavadním blokem
- Příklad „horší vodič" — dosavadní blok temata.ts měl 10 V, 0,1 A → 100 Ω; PDF str. 5 (graf) uvádí 10 V, 0,05 A → 200 Ω. Podle pravidla „kde se web liší od PDF, platí PDF" opraveno na hodnoty z PDF (10 : 0,05 = 200).
- Násobné a dílčí jednotky odporu miliohm (mΩ), kiloohm (kΩ), megaohm (MΩ); 1 mΩ = 0,001 Ω, 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω → PDF str. 4, doslovně, včetně převodu „1 mΩ = 0,001 Ω".
- Příklady „rezistor 6 Ω při 12 V → I = 2 A" a „rezistor 4 Ω, proud 3 A → U = 12 V" → VLASTNÍ PŘÍKLAD, k rozhodnutí učitele. Vzorce I = U:R a U = R·I doloženy PDF str. 3, konkrétní čísla zvolena tak, aby výsledek vyšel celý (12:6 = 2, 4·3 = 12).

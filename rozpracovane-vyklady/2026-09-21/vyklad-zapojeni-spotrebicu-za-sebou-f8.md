## OBSAH
<h2>Zapojení spotřebičů za sebou (sériově)</h2>
<p>Elektrické spotřebiče (žárovka, konvice, pračka…) můžeme do obvodu zapojit dvěma způsoby: <strong>za sebou (sériově)</strong>, nebo <strong>vedle sebe (paralelně)</strong>. Každý elektrický spotřebič má vlastní odpor. Pro výpočty proto spotřebiče nahradíme <strong>rezistory</strong>.</p>
<p>V sériovém obvodu jdou rezistory <strong>jeden za druhým</strong> a obvod se <strong>nerozvětvuje</strong>. Jednoduché sériové zapojení je nejbasičtější typ elektrického obvodu.</p>

<h3>Proud — teče všude stejně</h3>
<p>Proud se v sériovém obvodu <strong>nedělí</strong>. Je stejný ve všech částech obvodu, tedy i ve všech rezistorech. Všechny elektrony procházejí každou částí obvodu — <strong>zákon zachování toku</strong>. Je to podobné jako proud vody v korytě řeky — kolik jí proteče na začátku, tolik i na konci.</p>

<h3>Napětí — rozdělí se mezi spotřebiče</h3>
<ul>
<li>napětí zdroje se <strong>rozdělí mezi rezistory</strong>: U = U<sub>1</sub> + U<sub>2</sub> (zákon o úbytcích napětí)</li>
<li>rozdělí se ve <strong>stejném poměru jako odpory</strong> — např. odpory 2 : 1 rozdělí napětí také 2 : 1</li>
<li>na rezistoru s <strong>větším odporem je větší napětí</strong>, na menším odporu menší napětí</li>
<li>napětí na jednotlivém rezistoru vypočítáme z Ohmova zákona: U<sub>1</sub> = R<sub>1</sub> · I, U<sub>2</sub> = R<sub>2</sub> · I</li>
<li>Ohmův zákon platí nejen pro celý obvod, ale i pro jeho jednotlivé části — pro každý rezistor zvlášť</li>
</ul>

<h3>Celkový odpor — rezistory se sčítají</h3>
<p>Rezistory za sebou tvoří jeden <strong>delší odporový drát</strong>, proto se jejich odpory <strong>sčítají</strong>: R = R<sub>1</sub> + R<sub>2</sub>. Celkový odpor sériového obvodu je vždy <strong>větší</strong> než odpor kteréhokoli jednotlivého rezistoru. Platí to i pro víc spotřebičů za sebou — celkový odpor je součet odporů všech. Proud v obvodu pak vypočítáme z Ohmova zákona: I = U : R.</p>

<h3>Vánoční žárovky — když jeden spotřebič vypadne</h3>
<p>Sériové zapojení má jednu <strong>nevýhodu</strong>: přeruší-li se jediný spotřebič, obvod se přeruší a <strong>zhasnou úplně všechny žárovky najednou</strong>. Stalo by se to třeba na starém vánočním řetězu, kde praskne jedna žárovka. Pomůcka k zapamatování: když se proud <strong>nedělí</strong>, napětí se <strong>dělí</strong> — a naopak.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Sériově zapojíme dva rezistory R<sub>1</sub> = 4 Ω a R<sub>2</sub> = 6 Ω. Obvodem prochází proud I = 2 A, stejný ve všech částech.</p>
<p>Napětí na prvním rezistoru: U<sub>1</sub> = R<sub>1</sub> · I = 4 · 2 = 8 V. Napětí na druhém: U<sub>2</sub> = R<sub>2</sub> · I = 6 · 2 = 12 V. Celkové napětí zdroje: U = U<sub>1</sub> + U<sub>2</sub> = 8 + 12 = 20 V.</p>
<p>Ověříme to přes celkový odpor: R = R<sub>1</sub> + R<sub>2</sub> = 4 + 6 = 10 Ω. Podle Ohmova zákona U = R · I = 10 · 2 = 20 V — sedí to.</p>
<p>Na vánočním řetězu svítí sériově 3 stejné žárovky, každá s odporem 2 Ω, zapojené na zdroj s napětím 12 V. Celkový odpor: R = 2 + 2 + 2 = 6 Ω. Proud v obvodu: I = U : R = 12 : 6 = 2 A.</p>
<p>Napětí na jedné žárovce: U<sub>1</sub> = R<sub>1</sub> · I = 2 · 2 = 4 V. Stejné napětí je i na ostatních dvou žárovkách, protože mají stejný odpor. Kontrola: 4 + 4 + 4 = 12 V, přesně napětí zdroje.</p>

## ZAPIS
```json
{
  "vzorec": "I = I₁ = I₂,  U = U₁ + U₂,  R = R₁ + R₂",
  "jednotky": [
    "elektrický proud — značíme I (na rezistorech I₁, I₂ — jsou stejné jako I), jednotka A (ampér)",
    "elektrické napětí — značíme U (na rezistorech U₁, U₂), jednotka V (volt)",
    "elektrický odpor — značíme R (na rezistorech R₁, R₂), jednotka Ω (ohm)",
    "Převody: 1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω.",
    "Do vztahů dosazuj proud v A, napětí ve V a odpor v Ω."
  ],
  "vzorecSlovy": "proud je ve všech rezistorech stejný jako celkový; celkové napětí = součet napětí na rezistorech; celkový odpor = součet odporů rezistorů",
  "zakon": "Ohmův zákon platí pro veličiny v celém obvodu (U, I, R), ale i pro jednotlivé části obvodu: rezistory (R₁, U₁, I₁ a R₂, U₂, I₂).",
  "body": [
    "sériově: spotřebiče za sebou, obvod nerozvětven",
    "proud: stejný všude, nedělí se",
    "napětí: dělí se, U = U₁ + U₂",
    "větší odpor → větší napětí na něm",
    "odpor: R = R₁ + R₂, roste",
    "porucha jednoho spotřebiče → zhasne vše"
  ]
}
```

## ZDROJE
- Zapojení „za sebou" a „vedle sebe", spotřebiče nahrazeny rezistory, každý spotřebič má vlastní odpor → PDF str. 1 (doslovně: „Elektrické spotřebiče (žárovka, rychlovarná konvice, pračka, PC, vařič, rezistor …) můžeme do obvodu zapojovat dvěma způsoby: 1. za sebou (sériově) 2. vedle sebe (paralelně)", „Každý elektrický spotřebič má vlastní odpor. Různé spotřebiče budou pro účely výpočtů napětí, proudu a odporu v obvodu nahrazeny rezistory."); shoda s dosavadním blokem (slug `zapojeni-spotrebicu-za-sebou`, věta „Spotřebiče (pro výpočty je nahradíme rezistory) jsou v sériovém obvodu zapojeny jeden za druhým.")
- Dovětek „jednoduché sériové zapojení je nejbasičtější typ elektrického obvodu" → dosavadní blok (slug `zapojeni-spotrebicu-za-sebou`, doslovně stejná věta); PDF k tomu nemá protikladnou informaci
- Příklad spotřebiče „pračka" → PDF str. 1 uvádí žárovku, rychlovarnou konvici, pračku, PC a vařič; slovo „motor" se v PDF mezi spotřebiči nevyskytuje
- Obvod se nerozvětvuje, proud stejný ve všech částech, proud se nedělí → PDF str. 2–3 („obvod není rozvětvený, proto všechny elektrony procházejí všemi částmi obvodu ve stejném počtu", „proud se nedělí", „proud je ve všech částech obvodu stejný (tedy i ve všech rezistorech)"); v dosavadním bloku beze změny obsaženo
- „Všechny elektrony procházejí každou částí obvodu — zákon zachování toku." → dosavadní blok (slug `zapojeni-spotrebicu-za-sebou`, doslovně: „Všechny elektrony procházejí každou částí obvodu — zákon zachování toku.") + opora v PDF str. 2 („všechny elektrony procházejí všemi částmi obvodu ve stejném počtu")
- Analogie proudu s vodou v korytě řeky → PDF str. 5 („proud volných elektronů vodičem si můžeme představit jako proud vody a vodič jako koryto řeky", „pokud obvod není rozvětvený, proud se nedělí a teče celým obvodem stejně"); v dosavadním bloku chybělo, doplněno z PDF, formulace zkrácena kvůli délce věty, obsahově beze změny
- Napětí se dělí mezi rezistory, U = U₁ + U₂, poměr jako odpory, na větším odporu větší napětí → PDF str. 3 (doslovně: „napětí ze zdroje se dělí mezi rezistory", „napětí se rozdělí ve stejném poměru jako je poměr odporů rezistorů", „na rezistoru s větším odporem je větší napětí, na rezistoru s menším odporem je menší napětí", „např. pokud jsou odpory rezistorů v poměru 2 : 1, napětí se rozdělí také v poměru 2 : 1"); shoda s dosavadním blokem
- „(zákon o úbytcích napětí)" u U = U₁ + U₂ → dosavadní blok (slug `zapojeni-spotrebicu-za-sebou`, doslovně: „U = U₁ + U₂ (zákon o úbytcích napětí)")
- U₁ = R₁ · I, U₂ = R₂ · I z Ohmova zákona pro jednotlivé rezistory → PDF str. 3 (vzorce U₁ = R₁·I, U₂ = R₂·I); shoda s dosavadním blokem
- „Ohmův zákon platí nejen pro celý obvod, ale i pro jeho jednotlivé části" → PDF str. 5 (doslovně, „👉 Důležité": „Ohmův zákon platí pro veličiny v celém obvodu (U, I, R), ale i pro jednotlivé části obvodu: rezistory (R1, U1, I1 a R2, U2, I2)"); v dosavadním bloku chybělo, doplněno jako bod v OBSAH i jako klíč `zakon` v ZAPIS
- MIMO SCOPE: obrázek „Na obrázku níže je zakreslen proud a napětí v sériovém obvodu" → PDF str. 4; jde jen o schéma/obrázek bez doprovodného textu navíc, do textového OBSAH nepatří (bez obrázkového podkladu ho nelze přiložit)
- MIMO SCOPE: „je-li obvod rozvětvený, proud se rozdělí do větví" → PDF str. 5 (pomůcka pro proud); týká se paralelního (rozvětveného) zapojení, patří k podtématu `zapojeni-spotrebicu-vedle-sebe`, ne k sériovému obvodu
- Celkový odpor: rezistory za sebou = delší odporový drát, odpory se sčítají, R = R₁ + R₂, platí i pro víc spotřebičů → PDF str. 5 (doslovně: „rezistory zapojené za sebou se chovají jako jeden rezistor s větším odporem (je to dáno konstrukcí rezistorů - sčítá se délka odporového drátu obou rezistorů)", „celkový odpor rezistorů za sebou je roven součtu jejich odporů", „pokud by bylo v sérii zapojeno více spotřebičů, jejich celkový odpor bude roven součtu odporu všech zapojených spotřebičů"); shoda s dosavadním blokem
- Věta „Proud v obvodu pak vypočítáme z Ohmova zákona: I = U : R." v oddílu Celkový odpor → obecný Ohmův zákon (podtéma `ohmuv-zakon`), aplikovaný na celkové veličiny U a R sériového obvodu
- Pomůcka „když se proud nedělí → dělí se napětí" → PDF str. 6 (doslovně: „když se proud nedělí ➪ dělí se napětí"); shoda s dosavadním blokem
- Vánoční žárovky: přeruší-li se jeden spotřebič, zhasnou všechny → dosavadní blok (slug `zapojeni-spotrebicu-za-sebou`, věta „Nevýhoda série: přeruší-li se jeden spotřebič (vánoční řetěz), zhasne celý obvod."); v PDF k tomuto podtématu není přímo zmíněno, ponecháno z dosavadního bloku (nic se nevyřazuje) — fyzikálně vyplývá z toho, že proud se v sérii nedělí a obvod se přerušením kdekoli rozpojí
- Příklad „R₁ = 4 Ω, R₂ = 6 Ω, I = 2 A → U₁ = 8 V, U₂ = 12 V, U = 20 V, R = 10 Ω" → VLASTNÍ PŘÍKLAD; vzorce U₁=R₁·I, U₂=R₂·I, U=U₁+U₂, R=R₁+R₂ jsou doloženy výše z PDF, čísla zvolena tak, aby vyšla celá (4·2=8, 6·2=12, 8+12=20, 4+6=10, 10·2=20 — ověřeno)
- Příklad „3 žárovky po 2 Ω, U = 12 V" → VLASTNÍ PŘÍKLAD; vzorce R=R₁+R₂+R₃, I=U:R, U₁=R₁·I doloženy výše z PDF, výpočet ověřen (2+2+2=6, 12:6=2, 2·2=4, 4+4+4=12)

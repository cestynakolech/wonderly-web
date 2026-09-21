## OBSAH
<h2>Zapojení spotřebičů za sebou (sériově)</h2>
<p>Elektrické spotřebiče (žárovka, konvice, motor…) můžeme do obvodu zapojit dvěma způsoby: <strong>za sebou (sériově)</strong>, nebo <strong>vedle sebe (paralelně)</strong>. Pro výpočty nahradíme spotřebiče <strong>rezistory</strong>. V sériovém obvodu jdou rezistory <strong>jeden za druhým</strong> a obvod se <strong>nerozvětvuje</strong>.</p>

<h3>Proud — teče všude stejně</h3>
<p>Proud se v sériovém obvodu <strong>nedělí</strong>. Je stejný ve všech částech obvodu, tedy i ve všech rezistorech. Je to podobné jako proud vody v korytě řeky bez postranních ramen — kolik vody proteče na začátku, tolik jí proteče i na konci.</p>

<h3>Napětí — rozdělí se mezi spotřebiče</h3>
<ul>
<li>napětí zdroje se <strong>rozdělí mezi rezistory</strong>: U = U<sub>1</sub> + U<sub>2</sub></li>
<li>rozdělí se ve <strong>stejném poměru jako odpory</strong> — např. odpory 2 : 1 rozdělí napětí také 2 : 1</li>
<li>na rezistoru s <strong>větším odporem je větší napětí</strong>, na menším odporu menší napětí</li>
<li>napětí na jednotlivém rezistoru vypočítáme z Ohmova zákona: U<sub>1</sub> = R<sub>1</sub> · I, U<sub>2</sub> = R<sub>2</sub> · I</li>
</ul>

<h3>Celkový odpor — rezistory se sčítají</h3>
<p>Rezistory za sebou tvoří jeden <strong>delší odporový drát</strong>, proto se jejich odpory <strong>sčítají</strong>: R = R<sub>1</sub> + R<sub>2</sub>. Celkový odpor sériového obvodu je vždy <strong>větší</strong> než odpor kteréhokoli jednotlivého rezistoru. Platí to i pro víc spotřebičů za sebou — celkový odpor je součet odporů všech.</p>

<h3>Vánoční žárovky — když jeden spotřebič vypadne</h3>
<p>Když se proud <strong>nedělí</strong>, napětí se <strong>dělí</strong> — a naopak. To je dobrá pomůcka k zapamatování. Sériové zapojení má jednu nevýhodu: přeruší-li se jediný spotřebič (třeba praskne jedna žárovka na starém vánočním řetězu), obvod se přeruší a <strong>zhasnou úplně všechny</strong> žárovky najednou.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Sériově zapojíme dva rezistory R<sub>1</sub> = 4 Ω a R<sub>2</sub> = 6 Ω. Obvodem prochází proud I = 2 A, stejný ve všech částech. Napětí na prvním rezistoru: U<sub>1</sub> = R<sub>1</sub> · I = 4 · 2 = 8 V. Napětí na druhém: U<sub>2</sub> = R<sub>2</sub> · I = 6 · 2 = 12 V. Celkové napětí zdroje: U = U<sub>1</sub> + U<sub>2</sub> = 8 + 12 = 20 V.</p>
<p>Ověříme to přes celkový odpor: R = R<sub>1</sub> + R<sub>2</sub> = 4 + 6 = 10 Ω. Podle Ohmova zákona U = R · I = 10 · 2 = 20 V — sedí to.</p>
<p>Na vánočním řetězu svítí sériově 3 stejné žárovky, každá s odporem 2 Ω, zapojené na zdroj s napětím 12 V. Celkový odpor: R = 2 + 2 + 2 = 6 Ω. Proud v obvodu: I = U : R = 12 : 6 = 2 A. Napětí na jedné žárovce: U<sub>1</sub> = R<sub>1</sub> · I = 2 · 2 = 4 V — stejně jako na ostatních dvou, protože mají stejný odpor. Kontrola: 4 + 4 + 4 = 12 V, přesně napětí zdroje.</p>

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
- Zapojení „za sebou" a „vedle sebe", spotřebiče nahrazeny rezistory → PDF str. 1 (doslovně: „Elektrické spotřebiče … můžeme do obvodu zapojovat dvěma způsoby: 1. za sebou (sériově) 2. vedle sebe (paralelně)", „Různé spotřebiče budou pro účely výpočtů napětí, proudu a odporu v obvodu nahrazeny rezistory."); shoda s dosavadním blokem (slug `zapojeni-spotrebicu-za-sebou`, věta „Spotřebiče (pro výpočty je nahradíme rezistory) jsou v sériovém obvodu zapojeny jeden za druhým.")
- Obvod se nerozvětvuje, proud stejný ve všech částech, proud se nedělí → PDF str. 2–3 („obvod není rozvětvený, proto všechny elektrony procházejí všemi částmi obvodu ve stejném počtu", „proud se nedělí", „proud je ve všech částech obvodu stejný (tedy i ve všech rezistorech)"); v dosavadním bloku beze změny obsaženo
- Analogie proudu s vodou v korytě řeky bez postranních ramen → PDF str. 5 („proud volných elektronů vodičem si můžeme představit jako proud vody a vodič jako koryto řeky", „pokud obvod není rozvětvený, proud se nedělí a teče celým obvodem stejně") — v dosavadním bloku CHYBĚLO, doplněno z PDF (řetěz, bod 2: nic z PDF nesmí vypadnout)
- Napětí se dělí mezi rezistory, U = U₁ + U₂, poměr jako odpory, na větším odporu větší napětí → PDF str. 3 (doslovně: „napětí ze zdroje se dělí mezi rezistory", „napětí se rozdělí ve stejném poměru jako je poměr odporů rezistorů", „na rezistoru s větším odporem je větší napětí, na rezistoru s menším odporem je menší napětí", „např. pokud jsou odpory rezistorů v poměru 2 : 1, napětí se rozdělí také v poměru 2 : 1"); shoda s dosavadním blokem
- U₁ = R₁ · I, U₂ = R₂ · I z Ohmova zákona pro jednotlivé rezistory → PDF str. 3 (vzorce U₁ = R₁·I, U₂ = R₂·I); shoda s dosavadním blokem
- Celkový odpor: rezistory za sebou = delší odporový drát, odpory se sčítají, R = R₁ + R₂, platí i pro víc spotřebičů → PDF str. 5 (doslovně: „rezistory zapojené za sebou se chovají jako jeden rezistor s větším odporem (je to dáno konstrukcí rezistorů - sčítá se délka odporového drátu obou rezistorů)", „celkový odpor rezistorů za sebou je roven součtu jejich odporů", „pokud by bylo v sérii zapojeno více spotřebičů, jejich celkový odpor bude roven součtu odporu všech zapojených spotřebičů"); shoda s dosavadním blokem
- Pomůcka „když se proud nedělí → dělí se napětí" → PDF str. 6 (doslovně: „když se proud nedělí ➪ dělí se napětí"); shoda s dosavadním blokem
- Vánoční žárovky: přeruší-li se jeden spotřebič, zhasnou všechny → dosavadní blok (slug `zapojeni-spotrebicu-za-sebou`, věta „Nevýhoda série: přeruší-li se jeden spotřebič (vánoční řetěz), zhasne celý obvod."); v PDF k tomuto podtématu není přímo zmíněno, ponecháno z dosavadního bloku (nic se nevyřazuje) — fyzikálně vyplývá z toho, že proud se v sérii nedělí a obvod se přerušením kdekoli rozpojí
- Příklad „R₁ = 4 Ω, R₂ = 6 Ω, I = 2 A → U₁ = 8 V, U₂ = 12 V, U = 20 V, R = 10 Ω" → VLASTNÍ PŘÍKLAD; vzorce U₁=R₁·I, U₂=R₂·I, U=U₁+U₂, R=R₁+R₂ jsou doloženy výše z PDF, čísla zvolena tak, aby vyšla celá (4·2=8, 6·2=12, 8+12=20, 4+6=10, 10·2=20 — ověřeno)
- Příklad „3 žárovky po 2 Ω, U = 12 V" → VLASTNÍ PŘÍKLAD; vzorce R=R₁+R₂+R₃, I=U:R, U₁=R₁·I doloženy výše z PDF, výpočet ověřen (2+2+2=6, 12:6=2, 2·2=4, 4+4+4=12)

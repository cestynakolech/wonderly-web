## OBSAH
<h2>Zapojení spotřebičů vedle sebe (paralelně)</h2>
<p>V paralelním obvodu je každý spotřebič připojen přímo ke zdroji. Pro výpočty napětí, proudu a odporu nahrazujeme spotřebiče rezistory. Vodiče se spojují v místech, kterým říkáme uzly, takže je obvod rozvětvený. Přesně takhle jsou zapojené zásuvky v domácnosti.</p>

<h3>Napětí — na každé větvi stejné</h3>
<p>Oba konce každého rezistoru jsou přímo spojené s póly zdroje. Proto je napětí na každé větvi stejné jako napětí zdroje. V paralelním zapojení se napětí nedělí, jak by se to dělo v sériovém obvodu.</p>

<h3>Proud — dělí se v uzlu</h3>
<p>V uzlu se proud rozdělí do jednotlivých větví. Platí zákon o zachování proudu: <strong>I = I<sub>1</sub> + I<sub>2</sub></strong>. Kolik proudu do uzlu vteče, tolik z něj musí i vytéct.</p>
<p>Tok elektronů si můžeš představit jako řeku, která se rozdělí do dvou koryt. Rezistorem s menším odporem poteče víc proudu, stejně jako víc vody poteče širším korytem. Proud se totiž rozdělí v opačném poměru, než jsou odpory: čím větší odpor, tím menší proud.</p>
<p>Proud na každé větvi spočítáme z Ohmova zákona zvlášť: <strong>I<sub>1</sub> = U : R<sub>1</sub></strong> a <strong>I<sub>2</sub> = U : R<sub>2</sub></strong>. Ohmův zákon totiž platí nejen pro celý obvod, ale i pro každou jeho část.</p>

<h3>Celkový odpor — proč klesá</h3>
<p>Rezistory vedle sebe tvoří dohromady větší plochu průřezu, kterou proud prochází. Proto celkový odpor klesá a je menší než odpor kterékoli jednotlivé větve. Platí vzorec <strong>1 : R = 1 : R<sub>1</sub> + 1 : R<sub>2</sub></strong>.</p>
<p>I kdyby bylo vedle sebe zapojeno víc spotřebičů, funguje to stejně — jen do součtu přibudou další zlomky. Celkový odpor vždycky vyjde menší, než má nejmenší z rezistorů.</p>

<h3>Výhoda paralelního zapojení</h3>
<p>Když se proud dělí, napětí se nedělí — to je dobrá pomůcka k zapamatování. Hlavní výhoda paralelního zapojení je, že spotřebiče fungují nezávisle na sobě. Když jedna žárovka v domácnosti přepálí, obvod se nepřeruší a ostatní spotřebiče svítí a fungují dál.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Ke zdroji s napětím U = 12 V jsou paralelně připojené dva rezistory: R<sub>1</sub> = 6 Ω a R<sub>2</sub> = 3 Ω. Spočítáme proud v obou větvích z Ohmova zákona.</p>
<p>I<sub>1</sub> = U : R<sub>1</sub> = 12 : 6 = 2 A</p>
<p>I<sub>2</sub> = U : R<sub>2</sub> = 12 : 3 = 4 A</p>
<p>Celkový proud je jejich součet: I = I<sub>1</sub> + I<sub>2</sub> = 2 + 4 = 6 A. Odpory jsou v poměru R<sub>1</sub> : R<sub>2</sub> = 6 : 3, tedy 2 : 1 — a proudy vyšly přesně obráceně, 2 A : 4 A, tedy 1 : 2.</p>
<p>Celkový odpor spočítáme ze vzorce pro paralelní rezistory: 1 : R = 1 : R<sub>1</sub> + 1 : R<sub>2</sub> = 1 : 6 + 1 : 3 = 1 : 6 + 2 : 6 = 3 : 6 = 1 : 2, takže R = 2 Ω.</p>
<p>Zkouška: R = U : I = 12 : 6 = 2 Ω — vyšlo to stejně jako přes vzorec pro paralelní rezistory.</p>

## ZAPIS
```json
{
  "vzorec": "U = U₁ = U₂,  I = I₁ + I₂,  1 : R = 1 : R₁ + 1 : R₂",
  "jednotky": [
    "elektrické napětí U, U₁, U₂ — volt (V)",
    "elektrický proud I, I₁, I₂ — ampér (A)",
    "elektrický odpor R, R₁, R₂ — ohm (Ω)",
    "1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω",
    "Do vztahů dosazuj proud v A, napětí ve V a odpor v Ω."
  ],
  "vzorecSlovy": "napětí je na všech větvích stejné jako napětí zdroje; celkový proud je součtem proudů v jednotlivých větvích; převrácená hodnota celkového odporu je součtem převrácených hodnot odporů jednotlivých větví",
  "zakon": "Součet proudů v jednotlivých větvích je roven celkovému proudu v obvodu: I = I₁ + I₂.",
  "body": [
    "V paralelním obvodu je každý spotřebič připojen přímo ke zdroji a vodiče se spojují v uzlech.",
    "Napětí na všech větvích je stejné jako napětí zdroje.",
    "V uzlu se proud rozdělí do větví; větším odporem prochází menší proud.",
    "Celkový odpor paralelního zapojení je menší než nejmenší z odporů ve větvích.",
    "Porouchá-li se jeden spotřebič, ostatní fungují dál."
  ]
}
```

## ZDROJE
- PDF je export ze SmartBooks (placený zdroj, jen jako zdroj faktů) — obsahově je k tématu úplný (napětí, proud, odpor, shrnutí), „číst dál" na konci odkazuje na navazující látku, ne na oříznutí tohoto podtématu.
- Úvod (spotřebiče zapojeny vedle sebe / za sebou, pro výpočty nahrazeny rezistory) → PDF str. 1
- „napětí na všech rezistorech je stejné jako napětí zdroje" → dosavadní blok slugu `zapojeni-spotrebicu-vedle-sebe`: „napětí na všech je stejné jako napětí zdroje" + PDF str. 2, téměř doslovná shoda
- Proud se v uzlu dělí do větví, I = I₁ + I₂ → dosavadní blok + PDF str. 3, doslovný citát „součet proudů v jednotlivých větvích je roven celkovému proudu v obvodu" použit v poli „zakon"
- Analogie proudu jako řeky rozdělené do koryt → PDF str. 5 („proud volných elektronů vodičem si můžeme představit jako proud vody a vodič jako koryto řeky") — NOVĚ DOPLNĚNO, v dosavadním bloku chybělo
- Opačný poměr proudu k odporu (větší odpor → menší proud) a Ohmův zákon pro jednotlivé větve I₁ = U/R₁, I₂ = U/R₂ → dosavadní blok + PDF str. 3
- Celkový odpor menší díky větší ploše průřezu, vzorec 1/R = 1/R₁ + 1/R₂ → dosavadní blok + PDF str. 4–5
- Zobecnění na více než dva spotřebiče vedle sebe (do součtu přibudou další zlomky) → PDF str. 5 („pokud by bylo v sérii zapojeno více spotřebičů, převrácená hodnota celkového odporu bude rovna součtu převrácených hodnot odporů všech zapojených spotřebičů" — v PDF chybně napsáno „v sérii", věcně jde o vedle sebe podle kontextu odstavce; převzato věcně správně) — NOVĚ DOPLNĚNO
- Výhoda paralelního zapojení, přepálená žárovka v domácnosti nepřeruší ostatní → dosavadní blok, sekce „Pomůcka": „Výhoda paralelu: když jeden spotřebič vypadne, ostatní fungují dál."
- Číselný příklad (U = 12 V, R₁ = 6 Ω, R₂ = 3 Ω) → VLASTNÍ PŘÍKLAD k rozhodnutí učitele; čísla zvolena tak, aby všechny výsledky (I₁ = 2 A, I₂ = 4 A, I = 6 A, R = 2 Ω) vyšly celé; poměr odporů 2:1 a proudů 1:2 zároveň ověřuje tvrzení z PDF str. 3 („pokud jsou odpory rezistorů v poměru 2:1, proud se rozdělí v poměru 1:2")

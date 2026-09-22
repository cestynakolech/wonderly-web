## OBSAH
<h2>Lom světla</h2>
<p>Při přechodu do jiného optického prostředí světlo <strong>mění rychlost</strong> — a proto se <strong>láme</strong> (mění směr). Lom nastává na rozhraní dvou prostředí s různými optickými vlastnostmi.</p>
<p>Ve vakuu a ve vzduchu letí světlo asi <strong>300 000 km/s</strong>. Ve vodě už jen asi <strong>225 000 km/s</strong>, ve skle kolem <strong>200 000 km/s</strong>. V diamantu letí světlo nejpomaleji — jen asi <strong>125 000 km/s</strong>. Čím je prostředí opticky hustší, tím je světlo pomalejší — a tím víc se láme.</p>

<h3>Opticky hustší a opticky řidší prostředí</h3>
<p>Prostředí porovnáváme veličinou <strong>index lomu</strong>. Značíme ho <strong>n</strong> a jednotku nemá — jen udává, kolikrát je v daném prostředí světlo pomalejší než ve vakuu.</p>
<p>Čím větší index lomu, tím je prostředí <strong>opticky hustší</strong>. Voda má index lomu asi 1,33, sklo 1,5 až 1,9, vzduch přibližně 1.</p>
<p><strong>Opticky hustší prostředí</strong> — světlo se v něm šíří pomaleji, třeba voda nebo sklo. <strong>Opticky řidší prostředí</strong> — světlo se v něm šíří rychleji, třeba vzduch.</p>

<h3>Dva případy lomu</h3>
<p>Úhel dopadu α a úhel lomu β měříme od kolmice dopadu — pomyslné čáry kolmé na rozhraní. Když paprsek dopadá přesně po kolmici, vůbec se neláme.</p>
<ul>
<li><strong>lom KE kolmici</strong> — z prostředí opticky řidšího do hustšího (vzduch → voda/sklo); úhel lomu β je <strong>menší</strong> než úhel dopadu α</li>
<li><strong>lom OD kolmice</strong> — z hustšího do řidšího (voda → vzduch); úhel lomu je <strong>větší</strong> než úhel dopadu</li>
</ul>

<h3>Úplný odraz</h3>
<p>Při přechodu z hustšího do řidšího prostředí se s rostoucím úhlem dopadu zvětšuje úhel lomu. Při <strong>mezním úhlu dopadu</strong> je úhel lomu 90° — lomený paprsek běží podél rozhraní.</p>
<p>Při ještě větším úhlu dopadu se paprsek už nezlomí ven a nastává <strong>úplný (totální) odraz</strong>. Využívají ho optická vlákna, odrazky i odrazné hranoly ve fotoaparátech a dalekohledech.</p>

<h3>Lom světla kolem nás</h3>
<p>Paprsky od ponořené části hole nebo brčka se na hladině lámou — oko je prodlouží rovně a předmět se zdá zalomený. Ze stejného důvodu vypadá bazén mělčí, než doopravdy je.</p>
<p>Ryby a jiné předměty pod hladinou vidíme jinde, než kde skutečně jsou. Lom světla způsobuje i <strong>fata morganu</strong> — zdánlivé zrcadlení oblohy nad rozpáleným pískem nebo silnicí.</p>
<p>Při východu a západu Slunce vidíme sluneční kotouč zploštělý. Lomu světla využívají i čočky — třeba v lupě, brýlích nebo dalekohledu.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Index lomu spočítáme vzorcem n = c / v. Písmeno c je rychlost světla ve vakuu, písmeno v rychlost světla v daném prostředí.</p>
<p>Vezmeme sklo s indexem lomu n = 1,5 — to je spodní hodnota z tabulky. Vzorec si upravíme na v = c / n.</p>
<p>v = c / n = 300 000 / 1,5 = <strong>200 000 km/s</strong></p>
<p>Vyšla nám stejná rychlost světla ve skle, jakou jsme si řekli na začátku.</p>

## ZAPIS
```json
{
  "vzorec": "n = c / v",
  "jednotky": [
    "index lomu — značíme n, jednotku nemá (jen poměr rychlostí)",
    "rychlost světla ve vakuu — značíme c, jednotka km/s (kilometr za sekundu)",
    "rychlost světla v prostředí — značíme v, jednotka km/s (kilometr za sekundu)"
  ],
  "vzorecSlovy": "Index lomu vypočítáme jako podíl rychlosti světla ve vakuu a rychlosti světla v daném prostředí.",
  "body": [
    "lom: světlo mění rychlost i směr",
    "lom nastává: na rozhraní dvou prostředí",
    "řidší → hustší: lom ke kolmici",
    "hustší → řidší: lom od kolmice",
    "n: poměr rychlostí, bez jednotky",
    "větší n = opticky hustší prostředí",
    "n vody ≈ 1,33",
    "n skla = 1,5 až 1,9",
    "n vzduchu ≈ 1",
    "mezní úhel dopadu: úhel lomu 90°",
    "nad mezním úhlem: úplný (totální) odraz",
    "využití: optická vlákna, odrazky, hranoly",
    "brčko ve vodě: zdá se zalomené",
    "bazén: hloubka vypadá menší",
    "ryby pod hladinou: vidíme je jinde",
    "fata morgana: zdánlivé zrcadlení oblohy",
    "lom využívají: čočky (lupa, brýle, dalekohled)",
    "výpočet: v = c / n",
    "sklo: v = 200 000 km/s"
  ]
}
```

## ZDROJE
- Dosavadní blok `svetlo-a-jeho-sireni/lom-svetla` v `temata.ts` (nazev „Lom světla", interakce `lom`) — všechny věty a čísla zachovány: „Při přechodu do jiného optického prostředí světlo mění rychlost — a proto se láme (mění směr).", rychlosti 300 000 km/s (vakuum/vzduch), 225 000 km/s (voda), 200 000 km/s (sklo), oba případy lomu (ke/od kolmice s α, β), úplný odraz s využitím u optických vláken a odrazek, i příklad se zalomeným brčkem/bazénem — jen přeorganizováno a doplněno o novou látku z PDF.
- Rychlosti světla 300 000 km/s (vakuum), 225 000 km/s (voda), 200 000 km/s (sklo) ponechány beze změny — odpovídají doporučení v `rozdeleni-prezentace-Svetlo.txt` (upozornění na chyby v prezentaci: snímek 18 uvádí chybně „sklo 225 000 km/s" a „vzduch 299 794 km/s"; doporučené hodnoty vakuum 300 000, vzduch téměř stejně, sklo 200 000). Doplněna rychlost v diamantu 125 000 km/s — popis prezentace „SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" snímek 18 doslovně: „Diamant …125 000 km/s"; tato hodnota v upozornění na chyby NENÍ uvedena jako chybná a `rozdeleni-prezentace-Svetlo.txt` ji přímo doporučuje do výukové řady rychlostí. NOVÁ látka z prezentace, doplněno.
- „Při dopadu světla na jiné průhledné prostředí... světlo projde do tohoto prostředí, přičemž dochází ke změně jeho směru šíření" a „K lomu světla dochází na rozhraní dvou prostředí s jinými optickými vlastnostmi" → PDF str. 1–2 („Lom světla.pdf", složka „24 Lom světla"), shoda s dosavadním blokem, doplněna věta o rozhraní.
- Index lomu — značka n, bez jednotky, vzorec n = c/v (c rychlost světla ve vakuu, v rychlost v prostředí), hodnota vždy větší než 1 → PDF str. 5, doslovně: „Index lomu daného prostředí — Udává hodnotu, kolikrát je v tomto prostředí rychlost světla menší než ve vakuu — Značka: n — Jednotka: není... Vztah pro výpočet: n = c/v". V PDF je celý tento blok pod hlavičkou „💡 Pro zajímavost" — ve výkladu je přesto zařazen jako hlavní zápis (`zapis.vzorec`), protože sesterský podklad, píseň „Index lomu 🎵" v `materialy` dosavadního bloku, s indexem lomu jako s povinnou látkou 7. ročníku počítá. K ROZHODNUTÍ UČITELE: zda n = c/v má zůstat v povinném zápisu, nebo se má označit jako doplňkové „pro zajímavost".
- Příklady indexu lomu: voda 1,33, sklo 1,5–1,9, vzduch 1,0026 (zaokrouhleně 1) → PDF str. 5, doslovně: „např. voda: 1,33 — např. sklo: 1,5 - 1,9 — např. vzduch: 1,0026 (zaokrouhleně 1)". NOVÁ látka, doplněno.
- Opticky hustší prostředí (světlo pomalejší, větší index lomu, např. voda/sklo) a opticky řidší prostředí (světlo rychlejší, menší index lomu, např. vzduch) → PDF str. 5–6, doslovně: „Opticky hustší prostředí — světlo se v něm šíří pomaleji... Opticky řidší prostředí — světlo se v něm šíří rychleji". Shoda s pojmy „hustší/řidší" v dosavadním bloku, doplněna přesná definice přes index lomu.
- Lom ke kolmici (z řidšího do hustšího, úhel lomu menší) a lom od kolmice (z hustšího do řidšího, úhel lomu větší) → PDF str. 6–8, shoda s dosavadním blokem (beze změny).
- Měření úhlu dopadu a úhlu lomu od kolmice dopadu → PDF str. 3, doslovně: „Paprsek světla, který nedopadá kolmo k rozhraní, na tomto rozhraní změní svůj směr — Směr paprsků určujeme pomocí úhlu dopadu a úhlu lomu ➪ velikosti obou úhlů měříme od kolmice dopadu"; kolmý dopad se neláme → PDF str. 10: „Světlo dopadá kolmo na rozhraní — Světlo se neláme — úhel dopadu i lomu je nulový". NOVÁ látka ze zdroje, doplněno — dosud se ve výkladu značky α, β používaly bez vysvětlení, odkud se měří.
- Mezní úhel dopadu — „úhel lomu je β = 90°" a úplný (totální) odraz — „při větším úhlu dopadu než je hodnota mezního úhlu nastává úplný odraz... světlo se cele odrazí" → PDF str. 10–11, doslovně citováno. NOVÁ látka (mezní úhel), rozšiřuje dosavadní stručnou zmínku o úplném odrazu.
- Využití úplného odrazu: „odrazné hranoly ve fotoaparátech a dalekohledech" → PDF str. 11, doplněno k dosavadnímu „optická vlákna a odrazky" (dosavadní blok), obě zachována.
- Popis jevu úplného odrazu na hladině (při pohledu pod malým úhlem k vodě nevidíme předměty pod hladinou) → PDF str. 11, NOVÁ látka, zvážena jako podklad, ale do OBSAH nezařazena zvlášť (MIMO ROZSAH — dostatečně vysvětleno obecnou definicí úplného odrazu), zaznamenáno zde pro úplnost.
- Praktické jevy lomu: hůl/brčko ponořené do vody vypadá nalomené (PDF str. 2, doslovně: „Hůl do vody ponořená vypadá jak nalomená") — shoda s dosavadním blokem („Proč brčko ve sklenici vypadá zlomené?"), zachováno.
- Hloubka bazénu vypadá menší, lidé ve vodě vypadají kratší; předměty a ryby pod hladinou vidíme jinde, než kde skutečně jsou → PDF str. 12–13, doslovně: „Hloubka bazénu vypadá menší, lidé ve vodě vypadají kratší" a „Předměty nebo ryby pod hladinou vody vidíme jinde, než kde skutečně jsou". NOVÁ látka, doplněno.
- Fata morgana — zrcadlení oblohy na horkém písku v poušti nebo na rozpálené silnici (přelud) → PDF str. 14, doslovně: „Fata morgana: např. zrcadlení oblohy na horkém písku v poušti nebo na rozpálené silnici (přelud)". NOVÁ látka, doplněno.
- Zploštění slunečního kotouče při východu či západu slunce → PDF str. 15, doslovně, shoda s popisem prezentace (snímek 18 zmiňuje jen rychlosti, jinak žádný rozpor). NOVÁ látka, doplněno.
- Stranově převrácené předměty za skleněnou koulí nebo sklenicí s vodou → PDF str. 15 — NAVRŽENO K DOPLNĚNÍ, do OBSAH nezařazeno (vyžadovalo by ilustraci/obrázek, aby dítě jevu rozumělo; bez obrázku by text jen matl), k rozhodnutí učitele.
- Čočky (lupa, brýle, dalekohledy, kukátko) využívají lom světla → PDF str. 16, doslovně: „Čočky: lupa, brýle, dalekohledy, kukátko, …". Stručně zmíněno v OBSAH; podrobný výklad čoček patří do podtématu `cocky-spojky-rozptylky` (MIMO SCOPE tohoto podtématu, zde jen jako příklad využití lomu).
- Popis prezentace „SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" snímky 16–27 (rozsah podle `rozdeleni-prezentace-Svetlo.txt`: „24 Lom světla ... snímky 16–27") ověřen — snímky 19–20 (lom ke/od kolmice s obrázky Techmania Science Center) a snímek 27 (úplný odraz, mezní úhel) v souladu s PDF a dosavadním blokem, bez rozporu. Snímky 21–23 obsahují jen doplňkové obrázky/schémata bez nového textového faktu.
- Snímek 24 (čočky — definice spojky/rozptylky) a snímek 25 (rozklad světla, disperze) → MIMO SCOPE tohoto podtématu, patří do `cocky-spojky-rozptylky` a `rozklad-svetla`; navíc `rozdeleni-prezentace-Svetlo.txt` u snímku 24 hlásí zkomolené, fyzikálně nesmyslné definice spojky/rozptylky — nepoužito.
- Index lomu vody 1,33 vzniká i výpočtem z uvedených rychlostí (300 000 / 225 000 = 1,33...), shoda s tabulkovou hodnotou z PDF potvrzena přepočtem.
- Výpočet v „Pro zvídavé: počítáme": v = c/n = 300 000 / 1,5 = 200 000 km/s — VLASTNÍ PŘÍKLAD sestavený z tabulkových hodnot PDF (n skla = 1,5, dolní mez rozsahu 1,5–1,9; c = 300 000 km/s), zvolen tak, aby výsledek vyšel celé číslo a zároveň potvrdil rychlost světla ve skle uvedenou výše v textu; přepočítáno.

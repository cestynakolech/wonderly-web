## OBSAH
<h2>Elektrická práce a energie, výkon proudu</h2>

<p>Když připojíme kovový vodič ke zdroji elektrického napětí, vznikne ve vodiči <strong>elektrické pole</strong>. Pole působí na nabité částice elektrickou silou. Síla uvede volné elektrony do usměrněného pohybu — vzniká elektrický proud. Při průchodu proudu vodičem tak síly elektrického pole konají <strong>elektrickou práci</strong>.</p>
<p>Elektrická práce se značí <strong>W</strong>. Jednotka je <strong>joule (J)</strong>, v praxi se často používá <strong>kilowatthodina (kWh)</strong>. Elektrický proud přenáší obvodem elektrickou energii ze zdroje ke spotřebiči. Zdrojem elektrické energie je zdroj elektrického napětí.</p>
<p>Elektrická energie se dá přenášet na velké vzdálenosti. Snadno se také mění na jiné druhy energie, které potřebujeme. Proto se v domácnostech i v průmyslu používá tak často.</p>

<h3>Přeměny elektrické energie</h3>
<p>V elektrických spotřebičích a vodičích se elektrická energie mění na jiné druhy energie:</p>
<ul>
<li>na <strong>mechanickou práci</strong> (mixér, vrtačka, výtah, elektroautomobil)</li>
<li>na <strong>teplo</strong> (vařič, topení, konvice)</li>
<li>na <strong>světlo</strong> (žárovka, televize)</li>
<li>na <strong>chemickou energii</strong> (nabíjení akumulátoru, elektrolýza)</li>
</ul>

<h3>Výkon a příkon</h3>
<ul>
<li><strong>Výkon P</strong> = energie za sekundu, jednotka <strong>watt (W)</strong>. Počítá se <strong>P = U · I</strong>.</li>
<li><strong>Příkon P<sub>0</sub></strong> = kolik spotřebič odebírá ze sítě (údaj na štítku). Příkon je vlastně výkon procházejícího proudu, počítá se stejně: <strong>P<sub>0</sub> = U · I</strong> — a právě tenhle výkon platíš.</li>
<li><strong>Užitečný výkon</strong> je jen ta část příkonu, kterou spotřebič opravdu použije na to, co po něm chceme. Je vždy <strong>menší než příkon</strong> — zbytek uniká jako <strong>teplo (ztráty)</strong>.</li>
<li><strong>Práce: W = P<sub>0</sub> · t = U · I · t</strong></li>
</ul>

<h3>Jednotky energie</h3>
<p>Když spotřebič o výkonu <strong>1 W</strong> běží <strong>1 sekundu</strong>, spotřebuje <strong>1 J</strong>. Proto platí <strong>1 Ws = 1 J</strong>. Dál platí <strong>1 Wh = 3 600 J</strong> a <strong>1 kWh = 3 600 000 J</strong>. Spotřeba elektřiny doma se počítá v kWh.</p>

<h3>Pro zvídavé: počítáme</h3>
<p><strong>Účinnost</strong> udává, kolik procent spotřebované elektrické energie spotřebič využije na užitečnou práci. Stejně tak udává, jakou část příkonu spotřebič promění ve svůj užitečný výkon. Účinnost je vždy <strong>menší než 100 %</strong> — část energie se vždy ztratí jako teplo.</p>
<p>Klasická žárovka má účinnost jen asi <strong>5 %</strong> — zbylých 95 % energie se mění na teplo, ne na světlo. <strong>LED žárovka</strong> má účinnost mnohem vyšší, asi <strong>70 %</strong>, proto svítí úsporněji.</p>
<p>Z účinnosti plyne, proč se LED vyplatí. Klasická žárovka 100 W promění na světlo jen 5 W (100 · 5 %). LED se stejnou svítivostí potřebuje mnohem méně energie. Poměr účinností je 70 % : 5 %, tedy <strong>čtrnáctkrát méně</strong>.</p>
<p>Za měsíc svícení (5 hodin denně) spotřebuje stará žárovka 15 kWh, LED jen zlomek. A přebytek u staré žárovky nezmizel: <strong>topil ti do pokoje</strong>.</p>
<p>🧮 <strong>Kolik stojí vaření vody — celý příklad.</strong> Rychlovarná konvice má na štítku <strong>2 000 W</strong> a v rodině běží asi <strong>30 minut denně</strong>. Kolik za ni zaplatíte za měsíc?</p>
<ol>
<li><strong>Převeď na kilowatty a hodiny</strong> — v kWh se totiž elektřina účtuje: 2 000 W = <strong>2 kW</strong>, 30 minut = <strong>0,5 h</strong></li>
<li><strong>Denní spotřeba:</strong> <strong>W</strong> = <strong>P</strong> · <strong>t</strong> = 2 · 0,5 = <strong>1 kWh</strong></li>
<li><strong>Za 30 dní:</strong> 1 · 30 = <strong>30 kWh</strong></li>
<li><strong>Cena</strong> (počítejme 5 Kč za kWh): 30 · 5 = <strong>150 Kč</strong></li>
</ol>
<p>👉 Všimni si, že se počítá s <strong>příkonem ze štítku</strong>, ne s užitečným výkonem. <strong>Platíš všechno, co spotřebič ze sítě odebere</strong>, i tu část, která unikne jako nechtěné teplo.</p>
<p>💡 Zkus si sám: kolik by stálo svícení staré 100W žárovky 5 hodin denně po celý měsíc? (Nápověda: 0,1 kW · 5 h = 0,5 kWh za den.)</p>

## ZAPIS
```json
{
  "vzorec": "P = U · I;  P₀ = U · I;  W = P₀ · t = U · I · t      (odvozeně: t = W : P₀,  P₀ = W : t)",
  "jednotky": [
    "elektrická práce a energie W — joule (J) nebo kilowatthodina (kWh)",
    "výkon P — watt (W)",
    "příkon P₀ — watt (W)",
    "elektrické napětí U — volt (V)",
    "elektrický proud I — ampér (A)",
    "čas t — sekunda (s), při výpočtu v kWh hodina (h)",
    "1 Ws = 1 J,  1 Wh = 3 600 J,  1 kWh = 1 000 Wh = 3 600 000 J,  1 kW = 1 000 W",
    "Pro výsledek v J dosazuj příkon ve W a čas v s; pro výsledek v kWh příkon v kW a čas v h."
  ],
  "vzorecSlovy": [
    "Výkon se rovná napětí krát proud.",
    "Příkon se rovná napětí krát proud.",
    "Elektrická práce se rovná příkonu krát čas, tedy napětí krát proud krát čas."
  ],
  "body": [
    "proud ve vodiči → koná elektrickou práci",
    "elektrická práce: značka W, jednotka J (kWh)",
    "proud přenáší energii ke spotřebiči",
    "zdroj energie = zdroj napětí",
    "energie jde na dálku, snadno se mění",
    "přeměny: pohyb, teplo, světlo, chemická energie",
    "výkon P: energie za sekundu, watt (W)",
    "příkon P₀: odběr ze sítě, na štítku",
    "užitečný výkon < příkon (ztráty teplem)",
    "spotřeba domácnosti: kilowatthodiny (kWh)",
    "1 Ws = 1 J, 1 Wh = 3 600 J",
    "účinnost: kolik % energie se využije",
    "účinnost vždy menší než 100 %",
    "klasická žárovka: účinnost jen 5 %",
    "LED žárovka: účinnost asi 70 %"
  ]
}
```

## ZDROJE
- Elektrická síla koná elektrickou práci: pole vzniká po připojení vodiče ke zdroji, pole silou pohání volné elektrony → dosavadní blok slug elektricka-prace-a-vykon: „Když proud prochází vodičem, konají síly elektrického pole elektrickou práci." + PDF str. 1, doslovně: „Po připojení kovového vodiče ke zdroji elektrického napětí se ve vodiči vytvoří elektrické pole. Na nabité částice v elektrickém poli působí elektrická síla. Ta způsobí usměrněný pohyb volných elektronů vodičem — elektrický proud. Elektrická síla koná práci." — vysvětlení příčinného řetězce (pole → síla → pohyb elektronů → proud → práce) NOVÉ, v dosavadním bloku chybělo, doplněno
- Elektrická práce: značka W, jednotka joule (J), v praxi kilowatthodina (kWh) → dosavadní blok stejné znění + PDF str. 1, shoda
- „Elektrický proud přenáší obvodem elektrickou energii. Zdrojem elektrické energie je zdroj elektrického napětí." → PDF str. 1, doslovný citát; věta o zdroji energie NOVÁ, v dosavadním bloku chybělo
- Výhody elektrické energie: přenos na velké vzdálenosti, snadná přeměna na jiné druhy energie → PDF str. 2, doslovně: „Výhody: přenos na velké vzdálenosti a snadná přeměna na jiné druhy energie, které využíváme" — NOVÉ, v dosavadním bloku chybělo
- Přeměny elektrické energie na mechanickou práci (mixér, vrtačka, výtah, elektroautomobil), teplo (vařič, topení, konvice), světlo (žárovka, televize), chemickou energii (nabíjení akumulátoru, elektrolýza) → dosavadní blok stejný seznam + PDF str. 2, shoda (PDF navíc uvádí „elektroautomobil" u mechanické práce — doplněno)
- Výkon P = energie za sekundu, jednotka watt (W); vzorec P = U · I → PDF str. 3, doslovně nadpis „Elektrický výkon: P = U ⋅ I"; vzorec P = U · I do OBSAH doplněn (dosavadní blok měl vzorec jen pro příkon P₀), aby citace souhlasila s textem
- Příkon P₀ je roven výkonu procházejícího proudu, udává množství energie odebírané ze sítě za sekundu, je uveden na štítku spotřebiče → dosavadní blok + PDF str. 3–4, doslovně: „příkon spotřebiče je roven výkonu procházejícího elektrického proudu", „množství elektrické energie, kterou spotřebič odebírá každou sekundu ze sítě, když je v provozu", „příkon každého spotřebiče je uveden na výrobním štítku"
- Užitečný výkon je menší než příkon, zbytek se ztrácí jako teplo („ztráty") → dosavadní blok + PDF str. 4, doslovně: „vodiče spotřebiče zahřívají a toto teplo nevyužijeme pro užitečnou práci spotřebiče — ztráty elektrické energie", „Příkon spotřebiče je vždy větší než jeho mechanický výkon. Spotřebovaná elektrická energie je vždy větší než vykonaná práce spotřebiče."
- Vzorec práce W = P₀ · t = U · I · t → dosavadní blok + PDF str. 3, shoda
- Jednotky energie: 1 Wh = 3 600 J, 1 kWh = 3 600 000 J, spotřeba domácnosti v kWh → dosavadní blok + PDF str. 2, shoda
- 1 Ws = 1 J → PDF str. 2, doslovně „1 Ws = 1 J"; slovní vysvětlení (spotřebič 1 W běžící 1 s spotřebuje 1 J) je VLASTNÍ dovětek, PDF má jen holý vztah
- Účinnost udává, kolik % spotřebované energie se využije na užitečnou práci, respektive jakou část příkonu spotřebič využije pro svůj výkon; vždy menší než 100 % → PDF str. 6, doslovně: „udává, kolik procent spotřebované elektrické energie využije na užitečnou práci", „stejně tak udává, jakou část příkonu spotřebič efektivně využije pro svůj výkon", „účinnost spotřebičů je vzhledem ke ztrátám elektrické energie vždy menší než 100 %" — rozšířeno o druhou formulaci (příkon → výkon), v dosavadním bloku byla jen zkrácená verze
- Klasická žárovka má účinnost jen asi 5 % → dosavadní blok „Klasická žárovka má jen ~5 %" + PDF str. 6, doslovně „účinnost klasické žárovky je pouze 5 %", shoda
- LED žárovka má účinnost 70 % → PDF str. 6, doslovně: „LED žárovky mají účinnost 70 % ➪ 70 % elektrické energie přemění na světlo a jen 30 % přemění na neužitečné teplo". Dosavadní blok uváděl „asi 50 %" — podle rozhodnutí (PDF má přednost) opraveno na 70 % v OBSAH i v ZAPIS, opraven i navazující příklad
- Příklad „100W žárovka → LED čtrnáctkrát méně energie" přepočítán k 70 %: 70 % : 5 % = 14 (poměr účinností, tedy poměr potřebného výkonu při stejné svítivosti); 100 · 5 % = 5 W světla; 100 W žárovka za měsíc (5 h denně, 30 dní) spotřebuje 0,1 · 5 · 30 = 15 kWh — VLASTNÍ PŘÍKLAD, čísla zvolena tak, aby vyšla celá
- Příklad „vaření vody na konvici" upraven na 30 minut denně (dosavadní blok měl 15 minut), aby mezivýsledky vyšly celé: 2 000 W = 2 kW, 30 min = 0,5 h, 2 · 0,5 = 1 kWh/den, 1 · 30 = 30 kWh/měsíc, 30 · 5 = 150 Kč; VLASTNÍ PŘÍKLAD (v PDF není), postup zachován, jen čas a výsledná čísla přepočítána na celá; kontrolní úloha 0,1 kW · 5 h = 0,5 kWh sedí

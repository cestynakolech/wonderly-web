## OBSAH
<h2>Elektrické napětí a jeho měření</h2>

<p><strong>Elektrické napětí</strong> je hlavní vlastnost každého zdroje i spotřebiče. Značíme ho <strong>U</strong> a měříme v jednotce <strong>volt (V)</strong>.</p>
<p>Napětí bývá i hodně malé, nebo hodně velké, proto používáme násobky a díly voltu. Patří mezi ně <strong>kilovolt (kV)</strong>, <strong>megavolt (MV)</strong> a <strong>milivolt (mV)</strong>. Platí: 1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V.</p>

<h3>Kde se s napětím setkáváme</h3>
<p>Elektrárna vyrábí proud, který teče rozvodnou sítí až do zásuvky ve zdi. Napětí v zásuvce je <strong>230 V</strong> — při špatném zacházení může být velmi nebezpečné.</p>
<p>Přenosné zdroje mají menší napětí. <strong>Akumulátor</strong> je dobíjecí baterie — najdeme ji v mobilu, v notebooku i v autě. Autobaterie má napětí kolem <strong>12 V</strong>, nabíjení mobilu a notebooku přes USB-C kabel bývá <strong>20 V</strong>.</p>
<p><strong>Monočlánek</strong> (tužková nebo knoflíková baterie) má napětí <strong>1,5 V</strong>. <strong>Plochá baterie</strong> je uvnitř složená ze tří monočlánků za sebou, proto má napětí <strong>4,5 V</strong>.</p>

<h3>Zapojení více zdrojů za sebou</h3>
<p>Když spojíme <strong>kladnou (+) svorku</strong> jedné baterie se <strong>zápornou (−) svorkou</strong> druhé, napětí zdrojů se <strong>sčítá</strong>. Tak vznikne plochá baterie: tři články po 1,5 V dají dohromady 4,5 V. Zapojením více zdrojů za sebou se v obvodu zvýší nejen <strong>napětí</strong>, ale i <strong>proud</strong>.</p>
<p>Stejně funguje i zařízení na víc tužkových baterií, třeba čtyři baterie po 1,5 V dají 6 V. Zařízení ale funguje jen při <strong>správném počtu</strong> a <strong>správné orientaci</strong> baterií.</p>

<h3>Měření napětí voltmetrem</h3>
<p>Napětí měříme přístrojem, který se jmenuje <strong>voltmetr</strong>. Zapojujeme ho <strong>paralelně</strong> — vedle spotřebiče, na kterém chceme napětí měřit, nebo přímo ke svorkám zdroje.</p>
<p>Voltmetr porovnává napětí před spotřebičem a za ním, a proto se <strong>nezapojuje do hlavního obvodu</strong>. Jím samotným smí protékat jen <strong>nepatrný proud</strong>, jinak by měření zkreslil.</p>

<h3>Postup při měření</h3>
<p>Nejdřív nastavíme, jestli měříme <strong>stejnosměrné, nebo střídavé</strong> napětí, a odhadneme <strong>rozsah</strong>. Pak spojíme <strong>kladnou svorku (+)</strong> přístroje s <strong>kladnou svorkou (+)</strong> zdroje.</p>
<p>Voltmetr, který umí měřit i střídavé napětí, se přepólováním <strong>nepoškodí</strong> — jen u stejnosměrného napětí ukáže zápornou hodnotu.</p>

<h3>Multimetr</h3>
<p>💡 <strong>Multimetr</strong> je přístroj, který umí měřit napětí, proud i další veličiny — ale vždy jen <strong>jednu najednou</strong>. Pro měření napětí ho musíme jinak zapojit i jinak nastavit než pro měření proudu.</p>

## ZAPIS
```json
{
  "jednotky": [
    "elektrické napětí — značíme U, jednotka V (volt)",
    "Převody: 1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V."
  ],
  "body": [
    "napětí: značka U, jednotka V (volt)",
    "zásuvka 230 V",
    "monočlánek 1,5 V",
    "plochá baterie: 3× 1,5 V = 4,5 V",
    "za sebou: napětí se sčítá",
    "za sebou: roste i proud",
    "voltmetr: zapojení paralelně",
    "voltmetr: protéká jím jen nepatrný proud",
    "nastavit druh napětí a rozsah",
    "+ přístroje na + zdroje",
    "multimetr: měří U i I zvlášť"
  ]
}
```

## ZDROJE
- Napětí U, jednotka volt (V), hlavní charakteristika zdrojů i spotřebičů → PDF str. 1; shoda s dosavadním blokem `elektricke-napeti-mereni`: „Elektrické napětí je hlavní charakteristika zdrojů i spotřebičů. Značka U, jednotka volt (V)."
- Převody 1 kV = 1 000 V, 1 MV = 1 000 000 V, 1 mV = 0,001 V → PDF str. 1, doslovné znění; shoda s dosavadním blokem
- Zásuvka 230 V, nebezpečnost při špatném zacházení → PDF str. 1; shoda s dosavadním
- Akumulátor (mobil, notebook, auto), autobaterie kolem 12 V, USB-C nabíjení mobilu A NOTEBOOKU → PDF str. 1; doplněno „a notebooku" podle doslovného znění PDF („nabíjení mobilu a notebooku přes USB-C kabel"), dosavadní web i předchozí verze tohoto návrhu měly jen „mobilu"
- USB-C nabíjení: PDF str. 1 uvádí přesně „20 V"; dosavadní blok `elektricke-napeti-mereni` měl rozsah „~5–20 V". Podle pravidla „kde se web liší od PDF, platí PDF" opraveno na „20 V" (PDF str. 1).
- Monočlánek = tužková/knoflíková baterie, 1,5 V; plochá baterie = 3 monočlánky za sebou, 4,5 V → PDF str. 2
- Sériové řazení zdrojů (+ svorka první baterie k − svorce druhé), napětí se sčítá → PDF str. 3, doslovně: „pro zvýšení napětí v obvodu zapojíme více zdrojů za sebou tak, že kladnou svorku první baterie připojíme k záporné svorce druhé baterie (+ připojím k -)"; shoda s dosavadním blokem
- „zapojením více zdrojů za sebou se zvýší napětí i proud v obvodu" → PDF str. 3, doslovný citát; zapracováno do OBSAH (odstavec „Zapojení více zdrojů za sebou") i do ZAPIS.body
- Příklad 4 × 1,5 V = 6 V (zařízení na tužkové baterie) → PDF str. 3, přepočet ověřen
- Voltmetr se zapojuje paralelně, vedle spotřebiče nebo ke svorkám zdroje → PDF str. 4; shoda s dosavadním
- Voltmetr se nezapojuje do hlavního obvodu, protéká jím jen nepatrný proud → PDF str. 4 doslovně: „voltmetr měří rozdíl mezi nábojem před a za spotřebičem, proto se nezapojuje do hlavního obvodu, aby jím neprotékaly téměř žádné elektrony s nábojem" — PDF je zde fyzikálně nepřesné (voltmetr měří rozdíl napětí/potenciálu, ne rozdíl náboje); ve výkladu záměrně přeformulováno na „napětí před spotřebičem a za ním" kvůli věcné správnosti, nahlášeno k vědomí učitele
- Postup měření: nastavit druh napětí (stejnosměrné/střídavé), odhadnout rozsah, + přístroje na + zdroje → PDF str. 5 doslovně: „nastavíme voltmetr na měření jednosměrného nebo střídavého proudu" — PDF nepřesně píše „proudu" místo „napětí" (voltmetr měří napětí, ne proud); ve výkladu záměrně použito správné „napětí" místo doslovného „proudu" z PDF, nahlášeno
- Voltmetr schopný měřit i střídavé napětí se přepólováním svorek nepoškodí, jen u stejnosměrného napětí ukáže zápornou hodnotu → PDF str. 5, doslovně: „voltmetr, který umí měřit i střídavé napětí, při špatném zapojení (+) a (-) nepoškodíme, ale bude u stejnosměrného napětí ukazovat zápornou hodnotu proudu". Věta o ručkovém voltmetru, který se přepólováním poškodit může, nemá oporu v PDF ani v dosavadním bloku webu, proto v textu není.
- Multimetr měří proud i napětí, ale vždy jen jednu veličinu najednou, jinak zapojení i nastavení → PDF str. 6; shoda s dosavadním blokem
- ZAPIS.body bod „plochá baterie" nese výsledek „= 4,5 V" (3× 1,5 V = 4,5 V), aby žák viděl dopočítanou hodnotu; hodnota 4,5 V doložena PDF str. 2 (viz výše) i OBSAH.
- Zdrojové PDF je útržek SmartBooks (končí odkazem „číst dál" na placený obsah); veškerý dostupný text z dosažitelných stran 1–6 je ve výkladu zapracován.

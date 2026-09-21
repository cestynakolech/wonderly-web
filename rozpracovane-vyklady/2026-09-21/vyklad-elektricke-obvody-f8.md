## OBSAH
<h2>Elektrické obvody</h2>

<p><strong>Elektrický obvod</strong> vzniká, když vodivě spojíme víc prvků dohromady. Musí v něm být <strong>zdroj napětí</strong> (třeba baterie), <strong>spotřebič</strong> (žárovka, zvonek, motor…) a <strong>vodiče</strong>, které je spojují. Obvod může mít navíc <strong>spínač, měřidla nebo pojistku</strong>. Příčinou elektrického proudu je <strong>elektrické napětí</strong> — v obvodu ho zajistí právě zdroj elektrického napětí.</p>
<p>Žárovka je skleněná baňka, ze které je vysátý vzduch. Uvnitř je tenoučké <strong>wolframové vlákno</strong> spojené se dvěma částmi patice žárovky, kterou zašroubujeme do objímky.</p>
<p>U zdrojů napětí rozeznáváme dva póly. U <strong>tužkové baterie</strong> je výčnělek na horní ploše kladný pól (+), rovná spodní plocha záporný pól (−). U <strong>ploché baterie</strong> je kladný pól (+) kratší kovový plíšek, záporný pól (−) delší plíšek.</p>

<h3>Schematické značky</h3>
<p>Obvod nekreslíme jako obrázek, ale jako <strong>schéma</strong> — přehledné zakreslení pomocí dohodnutých <strong>schematických značek</strong>. Vodiče kreslíme přímými nebo pravoúhlými čarami. Místo, kde je vodivě spojeno víc vodičů, se nazývá <strong>uzel</strong>.</p>
<p>Mezi základní značky patří:</p>
<ul>
<li>vodič</li>
<li>zdroj (baterie)</li>
<li>zdroj – monočlánek</li>
<li>zdroj – plochá baterie</li>
<li>žárovka (kolečko s křížkem)</li>
<li>spínač otevřený a zavřený</li>
<li>tlačítkový spínač</li>
<li>zvonek</li>
<li>pojistka</li>
<li>cívka</li>
</ul>

<h3>Uzavřený a otevřený obvod</h3>
<p>Elektrický proud prochází obvodem jen tehdy, když je <strong>uzavřený</strong>. Všechny jeho části jsou pak vodivě spojené a tvoří nepřerušenou cestu od jednoho pólu zdroje k druhému — uzavřeme ho třeba sepnutím spínače.</p>
<p>Když je obvod <strong>otevřený</strong> (vypnutým spínačem nebo přerušeným vodičem), proud neprochází a spotřebič nefunguje. Aby žárovka svítila, musí být také dokonale spojené všechny vodivé části, správně zašroubovaná do objímky a nesmí mít prasklé vlákno.</p>

<h3>Jednoduchý a složený obvod</h3>
<p><strong>Jednoduchý obvod</strong> má jen jeden spotřebič — zdroj, vodiče, spínač a jednu žárovku zapojené v jedné smyčce. <strong>Složený obvod</strong> má víc spotřebičů, které lze zapojit dvěma způsoby: <strong>za sebou (sériově)</strong> nebo <strong>vedle sebe (paralelně)</strong>. Elektronické přístroje mívají mnohem složitější obvody — běžný spotřebič může uvnitř obsahovat desítky, stovky až miliony součástek zapojených sériově i paralelně zároveň.</p>
<p>Při <strong>sériovém</strong> zapojení jsou spotřebiče zapojené jeden za druhým, jako žárovičky na starším vánočním stromečku. Má to nevýhodu: když se poškodí jedna žárovka, přeruší se celý obvod a nesvítí ani jedna.</p>
<p>Při <strong>paralelním</strong> zapojení je každý spotřebič připojený ke zdroji vlastními vodiči, jako zásuvky a spotřebiče v domácnosti. Obvod je <strong>rozvětvený</strong> a místa rozvětvení jsou uzly. Výhoda je, že když se jeden spotřebič vypne nebo poškodí, přeruší se jen jeho větev — ostatními spotřebiči proud dál prochází.</p>

<h3>Zkrat — pozor!</h3>
<p>Když vodivě spojíme svorky zdroje <strong>bez spotřebiče</strong> (nebo proud najde cestu mimo spotřebič), vznikne <strong>zkrat</strong>: obvodem teče velký proud, vodiče se přehřívají a <strong>hrozí požár</strong>.</p>
<p>Před zkratem a přetížením chrání <strong>pojistka</strong>. Nejjednodušší je tavná pojistka: tenký drátek ve skleněné baňce se při průchodu velkého proudu zahřeje, roztaví a přeruší obvod. Pojistky se používají v elektronických přístrojích, v autech i v domácnosti.</p>

<h3>Bezpečné zapojování</h3>
<p>Obvod nejdřív sestavíme <strong>bez zdroje</strong> a se spínačem v <strong>otevřené (vypnuté)</strong> poloze. Zkontrolujeme, že vodiče nemají poškozenou izolaci a že žárovka je pevně zašroubovaná do objímky.</p>
<p>Teprve po kontrole dobrého stavu všech částí připojíme zdroj a nakonec obvod uzavřeme sepnutím spínače.</p>

## ZAPIS
```json
{
  "body": [
    "obvod: zdroj + vodiče + spotřebič",
    "může mít i spínač, měřidla, pojistku",
    "proud teče jen uzavřeným obvodem",
    "tužková baterie: výčnělek +, plocha −",
    "plochá baterie: kratší plíšek +, delší −",
    "schéma: značky + čáry, uzel = spojení vodičů",
    "jednoduchý obvod = jeden spotřebič",
    "sériově (za sebou): porucha vypne celý obvod",
    "paralelně (vedle sebe, rozvětvený): porucha vypne jen větev",
    "zkrat: spojení bez spotřebiče → velký proud, požár",
    "pojistka chrání před zkratem a přehřátím",
    "zapojuj: bez zdroje → kontrola → zdroj → spínač"
  ]
}
```

## ZDROJE
- Elektrický obvod = vodivé spojení prvků; musí obsahovat zdroj napětí, vodiče, spotřebič, může mít spínač/měřidla/pojistku → dosavadní blok slug elektricke-obvody: „Musí obsahovat zdroj napětí, vodiče a spotřebič (žárovka, zvonek, motor…). Může mít i spínač, měřidla, pojistku." + PDF str. 1 (téměř doslovně)
- „Příčinou elektrického proudu je elektrické napětí. Elektrické napětí v obvodu zajistí zdroj elektrického napětí." → PDF str. 17 (Shrnutí), doslovný citát; NOVÉ — v dosavadním bloku chybělo, doplněno na základě kontroly
- Konstrukce žárovky (skleněná baňka s vyčerpaným vzduchem, wolframové vlákno spojené se dvěma částmi patice) → PDF str. 5, NOVÉ — v dosavadním bloku chybělo; věta „vlákno se rozžhaví a svítí" bez opory v PDF byla po kontrole VYPUŠTĚNA
- Polarita tužkové baterie (výčnělek +, rovná plocha −) → dosavadní blok stejná věta + PDF str. 5, shoda
- Polarita ploché baterie (kratší plíšek +, delší −) → PDF str. 5, NOVÉ — v dosavadním bloku chybělo, doplněno
- Schéma, schematické značky, uzel jako spojení vodičů → dosavadní blok „Přehledné zakreslení pomocí schematických značek…" + PDF str. 2–3
- Seznam značek (vodič, zdroj – baterie, zdroj – monočlánek, zdroj – plochá baterie, žárovka, spínač otevřený/zavřený, tlačítkový spínač, zvonek, pojistka, cívka) → PDF str. 3; po kontrole doplněny vodič, monočlánek, plochá baterie, vráceno pojmenování „zdroj (baterie)" z dosavadního bloku a seznam převeden na `<ul>` s pomlčkou „–" jako v PDF
- Jednoduchý obvod = jeden spotřebič; složený = víc spotřebičů, sériově nebo paralelně (paralelní = rozvětvený) → dosavadní blok + PDF str. 4, 7 (jednoduchý/složený), str. 11 (slovo „rozvětvený" patří jen k paralelnímu zapojení, ne k oběma)
- Elektronické přístroje: desítky až miliony součástek, kombinace sériového a paralelního zapojení → PDF str. 13–14 („Pro zajímavost"), zařazeno jednou větou po kontrole
- Sériové zapojení: příklad žároviček na vánočním stromečku, nevýhoda — porucha jedné přeruší celý obvod → PDF str. 8
- Paralelní zapojení: příklad zásuvek v domácnosti, výhoda — porucha jedné větve ostatní nevypne → PDF str. 10–11
- Zkrat vzniká vodivým spojením svorek zdroje bez spotřebiče, velký proud, přehřátí, hrozí požár → dosavadní blok stejná věta + PDF str. 14, doslovně („Při vodivém propojení svorek zdroje bez zapojení spotřebiče vzniká zkrat… vodiče se příliš zahřívají a hrozí vznik požáru!")
- Pojistka — tenký drátek, který se při velkém proudu přetaví a přeruší obvod; použití v elektronice, autech, domácnosti → dosavadní blok + PDF str. 16, doplněno o místa použití
- Bezpečné zapojování: nejdřív bez zdroje, spínač vypnutý, kontrola vodičů/žárovky, teprve pak zdroj, nakonec sepnutí spínače → dosavadní blok + PDF str. 17, rozšířeno o kontrolu izolace vodičů

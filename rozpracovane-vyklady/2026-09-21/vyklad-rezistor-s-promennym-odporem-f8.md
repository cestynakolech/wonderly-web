## OBSAH
<h2>Rezistor s proměnným odporem — reostat a potenciometr</h2>
<p>Rezistor s proměnným odporem je součástka, u které jde <strong>měnit odpor</strong>. Skládá se z <strong>odporového drátu</strong> a <strong>posuvného jezdce</strong>. Jezdec určuje, jak dlouhý kus drátu je právě zapojený do obvodu.</p>
<p>Podle konstrukce bývá <strong>posuvný</strong> (jezdec klouže rovně) nebo <strong>otočný</strong> (jezdec se otáčí jako knoflík). Podle způsobu zapojení do obvodu se mu říká <strong>reostat</strong>, nebo <strong>potenciometr</strong>.</p>

<h3>Reostat — regulace proudu</h3>
<ul>
<li>zapojí se jednou svorkou (kovovou spojkou pro vodič) na konstrukci a svorkou jezdce — využívá jen <strong>jednu část</strong> drátu</li>
<li>slouží k <strong>regulaci proudu</strong> v obvodu: čím menší odpor, tím větší proud i výkon</li>
<li>dnes se moc nepoužívá (velké ztráty tepla) — nahradily ho polovodičové (elektronické) součástky; dřív ovládal třeba tramvaje</li>
</ul>

<h3>Potenciometr — dělič napětí</h3>
<ul>
<li>zapojí se <strong>obě svorky konstrukce i jezdec</strong> — využívá <strong>obě části</strong> drátu</li>
<li>slouží k <strong>regulaci napětí</strong>: jezdec rozdělí drát na dva sériové rezistory a napětí ze zdroje se rozdělí mezi ně</li>
<li>platí: čím menší odpor má jedna část, tím větší odpor (a tím i napětí) má druhá část</li>
<li>umí to i naopak: polohu jezdce převede na odpor a ten na napětí — tak vzniká <strong>snímač polohy</strong></li>
<li>snímače polohy, úhlu i napětí se využijí v <strong>průmyslu a robotice</strong>, při kalibraci přístrojů nebo v ovládacích panelech</li>
<li>jako dělič napětí se potenciometr využívá k ovládání <strong>hlasitosti, jasu, otáček motorů</strong></li>
</ul>

<h3>Jak je reostat vyrobený</h3>
<ul>
<li>na keramickém nebo plastovém válci je navinutý <strong>odporový drát</strong> (třeba ze slitiny nichrom nebo konstantan)</li>
<li>tento drát má vyšší odpor než měděný vodič a vydrží vysokou teplotu</li>
<li>po drátu klouže kovový <strong>jezdec</strong>, spojený s výstupní svorkou — posunem jezdce se mění, kolik závitů drátu je zapojeno</li>
<li>čím delší kus drátu je zapojen, tím <strong>větší je odpor</strong></li>
</ul>

<h3>Proč se reostat zahřívá</h3>
<p>Reostat omezuje proud svým odporem. Přitom se elektrická energie mění na teplo, proto se zahřívá. Platí pro něj vzorec pro výkon <strong>P = U · I</strong> (nebo P = I² · R). Každý reostat má výrobcem daný <strong>jmenovitý výkon</strong> (třeba 25 W) — kolik tepla dokáže bez poškození vyzářit.</p>
<p>Když jím prochází moc velký proud, přehřeje se a odporový drát se může přepálit.</p>

<h3>Co se stane při nulovém odporu</h3>
<p>Když jezdec posuneme na doraz tak, že v obvodu nezůstane žádný kus drátu (R = 0 Ω), reostat přestane proud omezovat vůbec. V obvodu pak teče proud omezený jen odporem ostatních součástek — může být nebezpečně velký a spálit spotřebič nebo vodiče.</p>
<p>Proto se u reostatu vždy dává pozor, na jakou hodnotu je jezdec nastavený, než se obvod zapne.</p>

<h3>Využití dnes</h3>
<p>Čisté reostaty se dnes kvůli ztrátám teplem používají málo — nahradily je polovodičové (elektronické) součástky (tranzistory, triaky), které teplem neplýtvají. Potenciometry se naopak používají běžně.</p>
<p>Najdeme je jako <strong>otočný knoflík hlasitosti</strong> u starších zesilovačů a rádií. Používají se i jako <strong>snímač polohy plynového pedálu</strong> v autech nebo páky u herních ovladačů. Staré typy stmívačů světel fungovaly přímo jako reostat, dnešní obvykle spínají proud jinak.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Zdroj s napětím <strong>12 V</strong> je připojen k reostatu. Jezdec je nastaven na odpor <strong>6 Ω</strong>: proud I = U : R = 12 : 6 = <strong>2 A</strong>.</p>
<p>Posuneme jezdec tak, aby v obvodu zůstal jen odpor <strong>3 Ω</strong> (poloviční). Proud vzroste na I = 12 : 3 = <strong>4 A</strong> — dvakrát menší odpor znamená dvakrát větší proud.</p>
<p>Výkon na reostatu při 3 Ω je P = U · I = 12 · 4 = <strong>48 W</strong>. Pokud je jeho jmenovitý výkon jen 25 W, reostat by se poškodil.</p>

## ZAPIS
```json
{
  "vzorec": "I = U : R      (odvozeně: U = I · R,  R = U : I);  P = U · I  (odvozeně: P = I² · R)",
  "jednotky": [
    "elektrický proud — značíme I, jednotka A (ampér)",
    "elektrické napětí — značíme U, jednotka V (volt)",
    "elektrický odpor — značíme R, jednotka Ω (ohm)",
    "elektrický výkon — značíme P, jednotka W (watt)",
    "Převody: 1 mA = 0,001 A,  1 kV = 1 000 V,  1 kΩ = 1 000 Ω,  1 kW = 1 000 W.",
    "Do vzorců dosazuj proud v A, napětí ve V, odpor v Ω a výkon ve W."
  ],
  "vzorecSlovy": "elektrický proud = napětí děleno odporem; elektrický výkon = napětí krát proud (nebo proud na druhou krát odpor)",
  "body": [
    "jezdec: mění délku zapojeného drátu",
    "delší drát → větší odpor",
    "reostat: reguluje proud (jedna část)",
    "potenciometr: dělí napětí (obě části)",
    "potenciometr: umí být i snímač polohy",
    "reostat: mění energii v teplo",
    "R = 0 Ω: proud neomezený, nebezpečí"
  ]
}
```

## ZDROJE
- PODKLAD JE ÚTRŽKOVITÝ (SmartBooks) — PDF má 11 stran, poslední strana je odříznutý náhled ("Toto Stručné vysvětlení učiva obsahuje pouze základy z tohoto tématu" + odkaz "číst dál" na placený obsah). Chybějící rozsah tedy neznamená přebytek na webu, viz `feedback-utrzkovity-podklad` — rozhoduje učitel.
- Definice: rezistor s měnitelným odporem, tvoří ho odporový drát + posuvný jezdec, dělení posuvný/otočný, reostat/potenciometr podle zapojení → PDF str. 1–2 (téměř doslovně)
- Reostat: jedna svorka na konstrukci + svorka jezdce, využívá jen jednu část, reguluje proud, čím menší odpor tím větší proud a výkon → PDF str. 1, 6 (text + schéma obvodu)
- Reostat dnes se nepoužívá kvůli ztrátám teplem, nahrazen polovodičovými součástkami, dřív ovládal tramvaje → PDF str. 7, doslovně: „dochází k velkým ztrátám elektrické energie přeměnou na teplo, dnes je nahrazen polovodičovými součástkami", „dříve se využíval např. k ovládání starších tramvají"
- Potenciometr: obě svorky konstrukce i jezdec, využívá obě části, dělič napětí, jezdec rozdělí drát na dva sériové rezistory → PDF str. 8 (text + schéma obvodu); dosavadní blok totéž už obsahoval (temata.ts, slug rezistor-s-promennym-odporem)
- „čím menší odpor v jedné části, tím větší odpor (a napětí) ve druhé části" → PDF str. 9, doslovně: „čím menší je odpor v části obvodu bez žárovky, tím větší odpor je v části obvodu se žárovkou → tím je větší napětí na žárovce a větší elektrický výkon" (zjednodušeno bez konkrétní žárovky, princip stejný)
- Opačný princip potenciometru jako snímače (poloha → odpor → napětí) → PDF str. 9, doslovně: „Potenciometry umí také naopak převést polohu mechanické části na hodnotu odporu a následně na elektrické napětí."
- Využití: snímače polohy, úhlu i napětí v průmyslu, robotice, při kalibraci přístrojů a v ovládacích panelech → PDF str. 9, doslovně: „Využití: snímače polohy, úhlu a napětí v průmyslu, robotice či pro kalibraci přístrojů, součást ovládacích panelů."; v dosavadním bloku bylo jen zkráceně „jako snímač polohy či úhlu v robotice a průmyslu" (temata.ts, slug rezistor-s-promennym-odporem)
- Využití potenciometru (jas, hlasitost, otáčky) → PDF str. 9 („řízení jasu, hlasitosti, rychlosti a dalších parametrů…"); dosavadní blok měl podobně už dřív
- Schématická značka reostatu/potenciometru na PDF str. 4 je jen nadpis a obrázek bez doprovodného textu; bez textové opory proto tvrzení o vzhledu značky (obdélník se šipkou) v OBSAH vypuštěno
- Jak je reostat vyrobený (keramický/plastový válec, materiál drátu nichrom/konstantan, jezdec) → dosavadní blok temata.ts (slug rezistor-s-promennym-odporem), v tomto PDF nejsou tyto konkrétní materiály jmenovány textem (PDF ukazuje jen fotku reostatu na str. 2) — ponecháno beze změny
- Proč se zahřívá (P = U·I, P = I²·R, jmenovitý výkon 25 W) → dosavadní blok temata.ts, PDF k tomu má jen obecnou větu o „velkých ztrátách elektrické energie přeměnou na teplo" (str. 7) bez vzorce — vzorec ponechán jako dosavadní, doložen i sousedním podtématem výkonu
- Co se stane při nulovém odporu, včetně „může spálit spotřebič nebo vodiče" → dosavadní blok temata.ts (doslovně: „…může být nebezpečně velký a spálit spotřebič nebo vodiče."); v PDF není, jde o logický důsledek Ohmova zákona (I = U/R při R→0)
- Využití dnes: tranzistory/triaky, knoflík hlasitosti, snímač polohy pedálu, herní ovladač, staré stmívače → dosavadní blok temata.ts, částečná shoda s PDF str. 9 (audio/video technika, automobilový průmysl); konkrétní příklady pedálu, ovladače a stmívače v PDF nejsou — ponecháno jako dosavadní
- Příklad výpočtu (12 V, 6 Ω → 2 A, poloviční 3 Ω → 4 A, P = 48 W, jmenovitý výkon 25 W) → VLASTNÍ PŘÍKLAD, dosavadní blok temata.ts; v PDF konkrétní čísla nejsou; výpočty přepočítány a sedí (12:6=2, 12:3=4, 12·4=48)
- Zápis: I = U:R, P = U·I → dosavadní blok temata.ts; Ohmův zákon je doložen sousedním podtématem, zde ponechán jako aplikace na reostat

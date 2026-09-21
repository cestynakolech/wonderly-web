## OBSAH
<h2>Závislost odporu na vlastnostech vodiče (nad rámec RVP)</h2>
<p>Elektrický odpor vodiče <strong>R</strong> ukazuje, jak moc vodič brání průchodu proudu. Měříme ho v jednotce <strong>ohm</strong> — píšeme řeckým písmenem Ω, čteme „óm". Násobky jsou kiloohm (kΩ) a megaohm (MΩ).</p>
<p>Čím větší odpor, tím hůř proud vodičem prochází. Odpor závisí na čtyřech věcech: na délce vodiče, na jeho tloušťce, na materiálu a na teplotě.</p>

<h3>Délka a tloušťka vodiče</h3>
<p>Čím je vodič delší, tím větší má odpor. Elektrony totiž na cestě narazí do víc atomů a víc se brzdí. Tloušťka (odborně <strong>průřez</strong>) funguje obráceně: čím je vodič tenčí, tím míň místa mají elektrony k pohybu, a odpor je větší. Tlustý vodič má proto menší odpor než tenký.</p>
<p>Délku vodiče značíme <strong>l</strong> a měříme v metrech (m). Průřez vodiče značíme <strong>S</strong> a měříme v metrech čtverečních (m²). U kulatého drátu ho spočítáme ze vzorce S = π·r², kde r je poloměr drátu.</p>

<h3>Materiál a teplota vodiče</h3>
<p>Odpor závisí i na materiálu, ze kterého je vodič vyrobený. Popisuje ho <strong>měrný odpor</strong> (rezistivita), značka <strong>ρ</strong> (řecké písmeno ró), jednotka Ω·m. Udává, jaký odpor by měl vodič z dané látky dlouhý 1 m s průřezem 1 m². Hodnoty pro různé látky najdeme ve fyzikálních tabulkách.</p>
<p>Hodnoty bývají velmi malé, proto se často udávají v mikroohmmetrech (μΩ·m), což je 0,000 001 Ω·m. Nejmenší měrný odpor mají nejlepší vodiče — měď, zlato, stříbro a hliník.</p>
<p>Odpor kovů roste i s teplotou. Čím je vodič teplejší, tím víc atomy v mřížce kmitají a víc brzdí elektrony, takže odpor je větší.</p>

<h3>Vzorec pro výpočet odporu</h3>
<p>Pro vodič o délce l a průřezu S platí vzorec:</p>
<p style="font-size:1.3rem"><strong>R = ρ · l : S</strong></p>
<p>Všechny veličiny dosazujeme v základních jednotkách — délku v metrech, průřez v metrech čtverečních a měrný odpor v Ω·m.</p>
<p>💡 V praxi je ale průřez drátu jen zlomek milimetru čtverečního a v metrech čtverečních se s ním počítá špatně. Tabulky proto uvádějí měrný odpor i v jednotce Ω·mm²/m. Pak dosazujeme délku v metrech a průřez rovnou v mm² a vyjde stejný výsledek.</p>
<p>V těchto jednotkách má měď ρ = 0,018, hliník 0,028, konstantan 0,50 a nichrom asi 1,1 Ω·mm²/m. Proto se topná spirála z nichromu rozžhaví, kdežto přívodní měděný kabel zůstane studený. (Je to týž údaj jen v jiných jednotkách: 0,018 Ω·mm²/m = 0,000 000 018 Ω·m.)</p>

<h3>Rezistor</h3>
<p>Rezistor je součástka s přesně danou hodnotou odporu. Tvoří ho dlouhý tenký odporový drát z konstantanu, izolovaný a navinutý na keramickém válečku. Velikost jeho odporu určuje materiál i rozměry vodiče.</p>
<p>Hodnotu poznáme podle barevných proužků. Ve schématu ho kreslíme jako obdélník. Rezistor se používá k regulaci proudu v obvodu.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Odporový drát je z konstantanu (ρ = 0,50 Ω·mm²/m), má délku 10 m a průřez 1 mm². Jaký má odpor?</p>
<p>R = ρ · l : S = 0,50 · 10 : 1 = 5 : 1 = 5 Ω</p>
<p>Zkusíme to i obráceně. Topný drát z nichromu (ρ = 1,1 Ω·mm²/m) má průřez 1 mm² a odpor 22 Ω. Jak dlouhý drát potřebujeme?</p>
<p>l = R · S : ρ = 22 · 1 : 1,1 = 22 : 1,1 = 20 m</p>

## ZAPIS
```json
{
  "vzorec": "R = ρ · l : S      (odvozeně: l = R · S : ρ,  S = ρ · l : R,  ρ = R · S : l)",
  "jednotky": [
    "elektrický odpor — značíme R, jednotka Ω (ohm)",
    "měrný odpor (rezistivita) — značíme ρ, jednotka Ω·m",
    "délka vodiče — značíme l, jednotka m (metr)",
    "průřez vodiče — značíme S, jednotka m² (metr čtvereční)",
    "Převody: 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω, 1 mm² = 0,000 001 m².",
    "Do vzorce dosazuj v Ω·m, m a m². Při ρ v Ω·mm²/m dosazuj délku v m a průřez v mm²."
  ],
  "vzorecSlovy": "elektrický odpor = měrný odpor krát délka vodiče děleno průřez vodiče",
  "body": [
    "délka ↑ → odpor ↑",
    "průřez (tloušťka) ↑ → odpor ↓",
    "materiál: měrný odpor ρ",
    "teplota ↑ → odpor ↑ (u kovů)",
    "rezistor: pevný odpor, reguluje proud"
  ]
}
```

## ZDROJE
- Název „Závislost odporu na vlastnostech vodiče (nad rámec RVP)" → pole `nazev` slugu `zavislost-odporu-na-vodici`, přeneseno do `<h2>`.
- Definice odporu R, „čím větší odpor, tím horší vodič" → PDF str. 1
- Jednotka ohm (Ω, čti „óm"), násobné jednotky kiloohm (kΩ), megaohm (MΩ) → PDF str. 1
- Závislost na délce vodiče (déle → víc atomů → větší odpor); délku vodiče značíme l, jednotka m → PDF str. 1
- Závislost na tloušťce/průřezu vodiče (tenčí → míň prostoru → větší odpor) → PDF str. 1–2
- S = π·r² pro kruhový průřez → PDF str. 2
- Měrný odpor (rezistivita) ρ, jednotka Ω·m, definice „udává velikost odporu vodiče z dané látky o délce 1 m a ploše průřezu 1 m²" → PDF str. 2. V ZAPIS.jednotky ponechána jen značka jednotky Ω·m bez slovního přepisu „ohmmetr" — v sousedním podtématu `ohmuv-zakon` je „ohmmetr" název měřicího přístroje, dvojí význam téhož slova by žáka mátl.
- „velikosti měrného odporu látek jsou velice malé, hodnoty bývají uvedeny v μΩ·m (10⁻⁶ Ω·m)" → PDF str. 3
- Vzorec R = ρ · l / S, dosazování v základních jednotkách → PDF str. 3, doslovný vzorec
- Rezistor: „součástka s určitou výrobní hodnotou odporu", „dlouhý tenký odporový drát z konstantanu, který je izolovaný a navinutý na keramickém válečku", „velikost jeho elektrického odporu je určena materiálem a rozměry vodiče" → PDF str. 3
- Barevné proužky určují hodnotu odporu, používá se k regulaci proudu, schematická značka „obdélník" → PDF str. 4
- Závislost odporu na teplotě (čím vyšší teplota, tím větší odpor u kovů) → tento PDF ji neuvádí (končí na str. 4, str. 5 je jen placený SmartBooks teaser „číst dál"); DOSAVADNÍ blok webu (slug `zavislost-odporu-na-vodici`) má větu „teplota — čím vyšší teplota, tím větší odpor (atomy víc kmitají)" a stejný jev je doložený i v sousedním podtématu webu „Ohmův zákon" větou „Odpor kovů s teplotou roste". Ponecháno beze změny.
- Tabulka hodnot ρ v Ω·mm²/m (měď 0,018, hliník 0,028, konstantan 0,50, nichrom asi 1,1) a věta o nichromové spirále vs. studeném měděném kabelu → dosavadní blok webu, doslovně: „V těchto jednotkách má měď ρ = 0,018, hliník 0,028, konstantan 0,50 a nichrom asi 1,1 Ω·mm²/m — proto se topná spirála z nichromu rozžhaví, kdežto přívodní měděný kabel zůstane studený." V PDF konkrétní čísla nejsou (jen odkaz „hodnoty jsou ve fyzikálních tabulkách").
- Věta „(Je to týž údaj jen v jiných jednotkách: 0,018 Ω·mm²/m = 0,000 000 018 Ω·m.)" i emoji 💡 na začátku odstavce → dosavadní blok webu, doslovná citace.
- Odvozené vztahy l = R·S:ρ, S = ρ·l:R, ρ = R·S:l a převody 1 kΩ, 1 MΩ, 1 mm² = 0,000001 m² → dosavadní blok webu, obecné jednotkové převody a matematický důsledek hlavního vzorce.
- Pořadí kovů podle měrného odporu: PDF str. 3 uvádí „nejmenší hodnoty měrného elektrického odporu mají nejlepší vodiče: měď, zlato, stříbro, hliník, …". Dosavadní blok webu (sousední slug `elektricky-proud-v-kovech-odpor`) měl pořadí „stříbro, měď, zlato, hliník". Podle pravidla „kde se web liší od PDF, platí PDF" opraveno na pořadí měď, zlato, stříbro, hliník (PDF str. 3).
- Příklad „odporový drát z konstantanu, l = 10 m, S = 1 mm², R = 5 Ω" → VLASTNÍ PŘÍKLAD; rozměry upraveny na reálné (100 m × 5 mm² by vážilo přes 4 kg a do vařiče by se nevešlo), proto zvoleny l = 10 m, S = 1 mm²; ρ = 0,50 Ω·mm²/m doložen dosavadním blokem webu, výpočet ověřen (0,50 · 10 : 1 = 5).
- Příklad „nichromový drát, S = 1 mm², R = 22 Ω, l = 20 m" (odvozený vzorec) → VLASTNÍ PŘÍKLAD; ρ = 1,1 Ω·mm²/m doložen dosavadním blokem webu, výpočet ověřen (22 · 1 : 1,1 = 20).

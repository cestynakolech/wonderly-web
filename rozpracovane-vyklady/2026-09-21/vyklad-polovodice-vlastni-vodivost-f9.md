## OBSAH
<h2>Polovodiče a jejich vlastní vodivost</h2>
<p>Látky podle vedení elektrického proudu dělíme na tři skupiny. <strong>Vodiče</strong> (třeba kovy) proud vedou dobře. <strong>Izolanty</strong> proud nevedou vůbec. A jsou tu ještě <strong>polovodiče</strong> — vedou proud jen za určitých podmínek.</p>
<p>Nejznámější polovodiče jsou <strong>křemík (Si)</strong> a <strong>germanium</strong>. Nechovají se ani jako vodiče, ani jako izolanty — jsou tak trochu „napůl".</p>
<h3>Odpor polovodičů se mění opačně než u kovů</h3>
<p>U kovů platí: čím vyšší teplota, tím větší odpor a horší vedení proudu. U polovodičů je to přesně naopak.</p>
<ul>
<li>Studený polovodič má velký odpor a proud vede jen málo.</li>
<li>Zahřátý polovodič má malý odpor a proud vede lépe.</li>
</ul>
<p>Odpor polovodiče mění i světlo — osvětlený polovodič vede proud lépe než neosvětlený.</p>
<h3>Jak vzniká vlastní vodivost</h3>
<p>Křemík má 4 valenční elektrony — to jsou ty nejvíc vnější, kterými je atom pevně spojen se sousedními atomy v krystalu.</p>
<p>Když se krystal zahřeje, elektron se může vytrhnout z vazby a stane se <strong>volným elektronem</strong>. Na jeho místě zůstane prázdné místo, kterému říkáme <strong>díra</strong>. Vzniká tak vždy dvojice — volný elektron a díra.</p>
<p>Díra se chová jako kladná částice a pohybuje se opačným směrem než elektrony. Elektrický proud v polovodiči tvoří pohyb volných elektronů i děr — tomu se říká <strong>vlastní vodivost</strong>.</p>
<h3>Využití: termistor a fotorezistor</h3>
<p><strong>Termistor</strong> je součástka, jejíž odpor se mění s teplotou. Používá se třeba v elektronických teploměrech nebo tam, kde je potřeba změřit velmi vysokou teplotu.</p>
<p><strong>Fotorezistor</strong> mění odpor podle osvětlení. Najdeme ho třeba ve fotobuňkách nebo v optických závorách, které počítají procházející věci.</p>

## ZAPIS
```json
{
  "body": [
    "vodič vede, izolant nevede, polovodič vede jen za určitých podmínek",
    "nejznámější polovodiče: křemík (Si), germanium",
    "studený polovodič: velký odpor, špatně vede",
    "teplý polovodič: malý odpor, dobře vede (opak kovů)",
    "odpor mění i osvětlení",
    "křemík: 4 valenční elektrony, pevné vazby v krystalu",
    "zahřátím vzniká vždy pár: volný elektron + díra",
    "díra = kladná částice, pohyb opačně než elektrony",
    "proud v polovodiči = pohyb volných elektronů a děr",
    "termistor: odpor mění teplota (elektronické teploměry)",
    "fotorezistor: odpor mění světlo (fotobuňka, optická závora)"
  ]
}
```

## ZDROJE
- Rozdělení látek vodič / izolant (nevodič) / polovodič → prezentace „Elektřina 9", snímek 48 (nový bod, dosud ve výkladu chyběl jako explicitní úvod)
- Nejznámější polovodiče jsou křemík a germanium, chovají se „napůl" (ani vodič, ani izolant) → PDF str. 1, dnešní blok temata.ts:4340
- Kovy: s rostoucí teplotou roste odpor → PDF str. 1
- Polovodiče: nízká teplota → velký odpor, roste teplota → odpor klesá, vodivost roste → PDF str. 1, dnešní blok temata.ts:4343–4344
- Odpor polovodiče ovlivňuje i osvětlení (obecně, nejen u fotorezistoru) → prezentace „Elektřina 9", snímek 50: „zahřátí nebo osvětlení součástky ovlivní odpor"
- Křemík má 4 valenční elektrony a v krystalu tvoří pevné vazby (IV. skupina periodické tabulky) → PDF str. 3, dnešní blok temata.ts:4348; pojem „valenční" (nejvíc vnější elektrony, kterými se atom váže na sousedy) doplněn kvůli fyzikální přesnosti — v dnešním bloku chyběl, atom křemíku má celkem 14 elektronů, jen 4 z nich jsou valenční
- Zahřátím se elektron vytrhne z vazby → vznikne volný elektron a díra, vzniká vždy pár elektron–díra → PDF str. 5, dnešní blok temata.ts:4349
- Díra se chová jako kladná částice, pohybuje se opačným směrem než elektrony → PDF str. 6–7, dnešní blok temata.ts:4350
- Proud v polovodiči tvoří pohyb volných elektronů a děr → PDF str. 7, dnešní blok temata.ts:4351
- Termistor mění odpor s teplotou, využití: elektronické teploměry, měření vysokých teplot → PDF str. 8–9, dnešní blok temata.ts:4355
- Fotorezistor mění odpor podle osvětlení, využití: fotobuňka, optická závora → PDF str. 10 a prezentace snímek 50 (image43), dnešní blok temata.ts:4356
- Bez čísel k výpočtu (jen kvalitativní jevy) → proto žádná sekce „Pro zvídavé: počítáme"; PDF ani prezentace k tomuto podtématu vzorec ani čísla neobsahují
- Téma polovodičů typu N a P, dioda, PN přechod → MIMO SCOPE, patří do sousedního podtématu `polovodice-typu-n-a-p-dioda` (prezentace snímky 51–56), nepřidáváno sem
- Pole `interakce: 'polovodic'`, `materialy` (video „Polovodiče pohánějí náš svět") beze změny — mimo zadání této přestavby

## OBSAH
<h2>Elektrický proud a jeho měření</h2>
<p>Elektrický proud je fyzikální veličina. Udává, kolik elektrického náboje projde vodičem za jednu sekundu. Značíme ho <strong>I</strong> a měříme v <strong>ampérech (A)</strong>.</p>
<p style="font-size:1.3rem"><strong>I = Q : t</strong></p>
<p>Q je elektrický náboj a t je čas, za který náboj vodičem projde. Dosadíme-li náboj v coulombech a čas v sekundách, vyjde proud v ampérech.</p>
<ul>
<li>1 A = 1 000 mA (miliampér), 1 mA = 0,001 A</li>
<li>1 A = 1 000 000 µA (mikroampér), 1 µA = 0,000 001 A</li>
</ul>

<h3>Dohodnutý směr proudu</h3>
<p>Fyzikové se dohodli, že proud teče <strong>od kladného pólu k zápornému</strong> (od + k −). Je to jen dohoda — je <strong>opačná</strong> než skutečný pohyb elektronů ve vodiči.</p>
<p>Vědci totiž tento směr určili dřív, než objevili elektrony. Na dohodnutém směru je dnes postavená celá teorie elektřiny, a tak zůstal platit dodnes.</p>

<h3>Stejnosměrný a střídavý proud</h3>
<p><strong>Stejnosměrný proud</strong> teče vodičem pořád stejným směrem. Takový proud dávají baterie, monočlánky i akumulátory. Značí se zkratkou <strong>DC</strong>.</p>
<p><strong>Střídavý proud</strong> mění směr pravidelně, mnohokrát za sekundu. Takový proud teče v domácí zásuvce. Značí se zkratkou <strong>AC</strong>.</p>
<p>💡 Kapacita baterie se udává v <strong>ampérhodinách (Ah)</strong> nebo miliampérhodinách (mAh) — vychází ze vzorce Q = I · t. Baterie 1 000 mAh dodá proud 1 A po dobu 1 hodiny. Stejně tak vydrží dodávat 2 A po dobu půl hodiny, nebo 1 mA po dobu 1 000 hodin.</p>

<h3>Měření ampérmetrem</h3>
<p>Proud měříme přístrojem zvaným <strong>ampérmetr</strong>. Velikost proudu měří podle jeho účinků, hlavně podle magnetických.</p>
<p>Ampérmetr zapojujeme do obvodu <strong>sériově</strong> — obvod rozpojíme před spotřebičem nebo za ním a na to místo vložíme ampérmetr. Celý měřený proud tak musí projít ampérmetrem, proto se obvod v tomto místě nesmí rozvětvit.</p>
<p>Svorku + na přístroji vždy spojíme se svorkou + zdroje. Před měřením ještě nastavíme, jestli měříme stejnosměrný nebo střídavý proud. Když tato pravidla nedodržíme, hrozí <strong>poškození ampérmetru</strong>.</p>

<h3>Proč má ampérmetr malý odpor</h3>
<p>Ampérmetr má schválně <strong>velmi malý vnitřní odpor</strong>, skoro nulový. Je zapojený přímo v cestě proudu — kdyby proud brzdil, naměřená hodnota by neodpovídala skutečnosti.</p>
<p>⚠️ Právě proto se ampérmetr <strong>nikdy nezapojuje paralelně</strong>, tedy vedle spotřebiče nebo přímo ke svorkám zdroje. Vznikl by <strong>zkrat</strong> a obvodem by protekl obrovský proud, který ampérmetr i zdroj zničí.</p>

<h3>Rozsah a multimetr</h3>
<p>Když neznáme velikost měřeného proudu, začínáme vždy na <strong>největším rozsahu</strong>. Teprve podle výchylky ručičky nebo čísla na displeji přepneme na menší, přesnější rozsah. Kdybychom začali rovnou na malém rozsahu, hrozí <strong>přetížení a poškození přístroje</strong>.</p>
<p>Proud umí měřit i <strong>multimetr</strong> — přístroj, který dokáže měřit víc veličin — když ho přepneme do režimu ampérmetru. Měřicí hroty pak zapojíme do správných zdířek: pro malé proudy (mA) bývá jiná zdířka než pro velké proudy (A). I tehdy ho zapojujeme sériově, stejně jako samostatný ampérmetr.</p>
<p>💡 Před zapojováním měřidla obvod raději odpojíme od zdroje a nedotýkáme se holých vodičů. Zabráníme tak zkratu i úrazu elektrickým proudem.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Vodičem projde náboj 6 C za 3 sekundy. Jaký proud vodičem teče?</p>
<p>I = Q : t = 6 : 3 = 2 A</p>
<p>Žárovkou teče proud 2 A po dobu 5 sekund. Kolik náboje jí projde? Použijeme odvozený vzorec Q = I · t.</p>
<p>Q = I · t = 2 · 5 = 10 C</p>
<p>Baterie má kapacitu 2 000 mAh. Jak dlouho vydrží dodávat proud 500 mA? Použijeme vzorec t = Q : I, kde mAh : mA = hodiny.</p>
<p>t = Q : I = 2 000 : 500 = 4 hodiny</p>

## ZAPIS
```json
{
  "vzorec": "I = Q : t      (odvozeně: Q = I · t,  t = Q : I)",
  "jednotky": [
    "elektrický proud — značíme I, jednotka A (ampér)",
    "elektrický náboj — značíme Q, jednotka C (coulomb)",
    "čas — značíme t, jednotka s (sekunda)",
    "Převody: 1 A = 1 000 mA (1 mA = 0,001 A),  1 A = 1 000 000 µA (1 µA = 0,000 001 A).",
    "Do vzorce dosazuj náboj v C a čas v s, proud pak vyjde v A."
  ],
  "vzorecSlovy": "elektrický proud = elektrický náboj děleno časem",
  "body": [
    "I = Q : t",
    "jednotka: ampér (A), mA, µA",
    "dohodnutý směr: od + k −",
    "elektrony se pohybují opačně",
    "DC stejnosměrný, AC střídavý",
    "ampérmetr: sériově, + na +",
    "celý proud jde ampérmetrem",
    "nikdy paralelně = zkrat",
    "rozsah: největší → menší"
  ]
}
```

## ZDROJE
- I = Q/t, značka I, jednotka ampér (A), mA, µA → PDF str. 1, doslovný citát; shoduje se s dosavadním blokem slugu `elektricky-proud-mereni` („Elektrický proud udává, kolik náboje projde vodičem za 1 sekundu... Platí I = Q / t.")
- Obrácené převody 1 mA = 0,001 A, 1 µA = 0,000 001 A → PDF str. 1, doslovný citát; v dosavadním bloku chyběly, doplněny do výčtu převodů (nejde o novou látku, jen doplnění chybějící části PDF)
- Dohodnutý směr proudu od + k −, opačný než pohyb elektronů → PDF str. 1, doslovný citát; shoda s dosavadním blokem („Dohodnutý směr proudu je od + k −. Pozor: je opačný než skutečný pohyb elektronů…")
- Historické vysvětlení (směr dohodnut dřív, než byly objeveny elektrony) → PDF str. 1, doslovný citát
- Stejnosměrný proud (DC) a střídavý proud (AC), definice i příklady (baterie/monočlánky/akumulátory vs. zásuvka) → PDF str. 3 — NOVÁ LÁTKA ze zdroje, dosavadní blok tuto látku neměl (jen zmiňoval „nastavíme druh proudu"), doplněno
- Kapacita baterie v Ah/mAh, vzorec Q = I·t, příklady 1 A/1 h, 2 A/½ h, 1 mA/1 000 h → PDF str. 2, doslovný citát; dosavadní blok měl jen první příklad („Baterie 1000 mAh dodá proud 1 A po dobu 1 hodiny."), doplněny zbylé dva příklady přímo z PDF, věta rozdělena na dvě kratší
- Ampérmetr měří proud podle jeho účinků, zejména magnetických → PDF str. 3, doslovný citát, doplněno do výkladu (v dosavadním bloku chybělo)
- Sériové zapojení ampérmetru, rozpojení obvodu před/za spotřebičem, kladná svorka přístroje ke kladné svorce zdroje → PDF str. 3–4, shoda s dosavadním blokem
- Zdůvodnění, proč se obvod v místě ampérmetru nesmí rozvětvit → PDF str. 4, obsahově shodné s dosavadním blokem („celý měřený proud musí projít ampérmetrem")
- Pravidla měření (nastavit DC/AC, odhadnout rozsah, + na +, zapojit sériově) a věta „při nedodržení pravidel hrozí poškození ampérmetru" → PDF str. 4, doslovný citát; v předchozí verzi tohoto návrhu chybělo, vráceno zpět
- Vnitřní odpor ampérmetru (velmi malý, skoro nulový) a ⚠️ varování o riziku zkratu při paralelním zapojení → dosavadní blok slugu `elektricky-proud-mereni` („⚠️ Právě malý vnitřní odpor je důvod, proč se ampérmetr nikdy nezapojuje paralelně…"), v PDF je jen samotné pravidlo „zapojit sériově"; zdůvodnění vnitřním odporem i značka ⚠️ jsou z dosavadního webu — v minulé verzi návrhu ⚠️ chybělo, vráceno zpět
- Volba rozsahu (začínat na největším) a věta „Kdybychom začali rovnou na malém rozsahu, hrozí přetížení a poškození přístroje." → dosavadní blok, doslovná věta z webu; v PDF je jen „nastavíme odhadem rozsah měření" bez tohoto zdůvodnění — v minulé verzi návrhu věta chybně vypadla, vrácena zpět
- Ampérmetr uvnitř multimetru a věta o zdířkách („měřicí hroty zapojíme do správných zdířek — pro malé proudy (mA) bývá jiná zdířka než pro velké (A)") → dosavadní blok, v PDF není zmíněno — v minulé verzi návrhu věta o zdířkách chybně vypadla, vrácena zpět
- Vysvětlivka „multimetr — přístroj, který dokáže měřit víc veličin" → VLASTNÍ vysvětlivka pojmu pro dětského čtenáře, fyzikálně obecně platná, bez konkrétního čísla, přidána kvůli pravidlu „cizí slova jen s vysvětlením"
- Bezpečnostní pokyn odpojit obvod od zdroje před zapojováním měřidla → dosavadní blok, v PDF není — ponecháno beze změny
- Poznámka: PDF (SmartBooks) je útržkovité, na konci odkazuje na placené „číst dál" — do výkladu nebylo nic z oříznuté placené části doplňováno, jen viditelný obsah stran 1–4
- Příklady v „Pro zvídavé: počítáme" (6 C za 3 s; 2 A po 5 s; 2 000 mAh při 500 mA, poznámka „mAh : mA = hodiny") → VLASTNÍ PŘÍKLADY — k rozhodnutí učitele; použité vzorce I=Q:t, Q=I·t, t=Q:I jsou doloženy PDF str. 1–2, konkrétní čísla zvolena tak, aby všechny výsledky vyšly celé (6:3=2, 2·5=10, 2000:500=4)

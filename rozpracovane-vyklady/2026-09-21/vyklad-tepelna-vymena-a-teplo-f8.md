## OBSAH
<h2>Tepelná výměna, teplo, měrná tepelná kapacita</h2>

<h3>Co je tepelná výměna</h3>
<p>Když se dotknou dvě tělesa s <strong>různou teplotou</strong>, nastává mezi nimi <strong>tepelná výměna</strong>. Částice teplejšího tělesa se pohybují rychleji a při srážkách předávají část své energie částicím chladnějšího tělesa. Rychlé částice tak zpomalují a pomalé zrychlují.</p>
<p>Teplejší těleso postupně <strong>ztrácí</strong> vnitřní energii, chladnější těleso ji <strong>získává</strong>. Výměna skončí ve chvíli, kdy se teploty obou těles <strong>vyrovnají</strong>.</p>

<h3>Teplo — energie, která putuje</h3>
<p>Energii, kterou teplejší těleso předá chladnějšímu při tepelné výměně, nazýváme <strong>teplo</strong>. Značíme ho <strong>Q</strong> a měříme v joulech (J), stejně jako jinou energii. Teplejší těleso teplo <strong>odevzdává</strong>, chladnější ho <strong>přijímá</strong>.</p>
<p>Pokud jsou obě tělesa při výměně izolována od okolí (teplo nikam neuniká), platí, že odevzdané teplo je přesně stejně velké jako teplo přijaté.</p>

<h3>Teplo není totéž co teplota</h3>
<p>Tahle dvě slova se snadno pletou. <strong>Teplota</strong> popisuje, jak je těleso právě teď zahřáté — měříme ji teploměrem a značíme <strong>t</strong>, jednotka je stupeň Celsia (°C), vědci používají kelvin (K). <strong>Teplo</strong> je naopak energie, která se při výměně přenáší — nedá se přímo změřit, jen dopočítat.</p>

<h3>Na čem závisí množství tepla</h3>
<p>Kolik tepla těleso při ohřívání přijme, závisí na třech věcech. Za prvé na <strong>rozdílu teplot</strong> — čím víc chceme těleso ohřát, tím víc tepla potřebujeme. Ohřát hrnec studené vody jen na mytí nádobí stačí méně tepla než uvařit stejnou vodu na čaj.</p>
<p>Za druhé na <strong>hmotnosti</strong> — čím víc látky ohříváme, tím víc tepla je třeba. Uvařit vodu na čaj pro 2 lidi spotřebuje méně tepla než stejně studenou vodu pro 20 lidí.</p>
<p>Za třetí na <strong>látce</strong> samotné — každá látka se ohřívá jinak rychle. Olej se rozehřeje na vysokou teplotu mnohem rychleji než stejné množství vody.</p>

<h3>Měrná tepelná kapacita c</h3>
<p>Aby šlo látky podle rychlosti ohřívání porovnat, zavedli fyzikové veličinu <strong>měrná tepelná kapacita</strong>, značku <strong>c</strong>. Říká nám, <strong>kolik tepla musíme dodat 1 kg látky, aby se ohřála o 1 °C</strong>. Jednotka je joule na kilogram a stupeň Celsia, zapisujeme J/(kg·°C).</p>
<p>Voda má měrnou tepelnou kapacitu <strong>c = 4 200 J/(kg·°C)</strong>. Znamená to, že na ohřátí 1 kg vody o 1 °C potřebujeme 4 200 J tepla. Hodnoty pro další látky najdeme ve fyzikálních tabulkách.</p>
<p>Látky s <strong>vysokým c</strong> (třeba voda) se ohřívají i chladnou pomalu a dokážou v sobě udržet hodně energie — používají se jako zásobník tepla, třeba v topení nebo v chladičích. Látky s <strong>nízkým c</strong> (třeba kovy) se naopak ohřívají i chladnou rychle — jsou to dobré tepelné vodiče, používají se třeba na žebra chladičů.</p>

<h3>Pro zvídavé: počítáme</h3>
<p>Teplo, které těleso přijme, spočítáme podle vzorce:</p>
<p style="font-size:1.3rem"><strong>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>)</strong></p>
<p>kde m je hmotnost tělesa, c měrná tepelná kapacita látky, t<sub>1</sub> počáteční teplota a t<sub>2</sub> konečná teplota.</p>
<p>Příklad: v konvici ohříváme 2 kg vody z 20 °C na 30 °C. Rozdíl teplot je t<sub>2</sub> − t<sub>1</sub> = 30 − 20 = 10 °C. Teplo, které voda přijme:</p>
<p>Q = m · c · (t<sub>2</sub> − t<sub>1</sub>) = 2 · 4 200 · 10 = 84 000 J = 84 kJ</p>
<p>Funguje to i naopak — když známe teplo, dopočítáme třeba hmotnost: m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)]. Kolik kg vody ohřejeme o 10 °C, když máme k dispozici 42 000 J tepla?</p>
<p>m = Q : [c · (t<sub>2</sub> − t<sub>1</sub>)] = 42 000 : (4 200 · 10) = 42 000 : 42 000 = 1 kg</p>

## ZAPIS
```json
{
  "vzorec": "Q = m · c · (t₂ − t₁)      (odvozeně: m = Q : [c · (t₂ − t₁)],  c = Q : [m · (t₂ − t₁)])",
  "jednotky": [
    "teplo — značíme Q, jednotka J (joule)",
    "hmotnost — značíme m, jednotka kg (kilogram)",
    "měrná tepelná kapacita — značíme c, jednotka J/(kg·°C)",
    "počáteční teplota — značíme t₁, jednotka °C (stupeň Celsia)",
    "konečná teplota — značíme t₂, jednotka °C (stupeň Celsia)",
    "1 kJ = 1 000 J,  1 MJ = 1 000 000 J,  1 kg = 1 000 g",
    "Do vzorce dosazuj teplo v J, hmotnost v kg, kapacitu v J/(kg·°C) a teploty v °C."
  ],
  "vzorecSlovy": "teplo = hmotnost × měrná tepelná kapacita × rozdíl teplot (konečná teplota mínus počáteční teplota)",
  "zakon": "Pokud jsou dvě tělesa při tepelné výměně tepelně izolována od okolí, velikost odevzdaného tepla teplejším tělesem je stejně velká jako velikost tepla přijatého chladnějším tělesem.",
  "body": [
    "teplejší → chladnější, dotykem",
    "Q = teplo (J), t = teplota (°C) — není totéž",
    "teplo: záleží na Δt, hmotnosti, látce",
    "c = kolik J ohřeje 1 kg o 1 °C",
    "voda: vysoké c, kovy: nízké c",
    "Q = m · c · (t₂ − t₁)"
  ]
}
```

POZNÁMKA K BODU 4 KONTROLY: `zapis.vzorec` se v `index.astro` (ř. 216) vypisuje jako `{podtema.zapis.vzorec}` — obyčejná Astro interpolace, BEZ `set:html` (na rozdíl od `obsah`, ř. 207: `set:html={podtema.obsah}`). Tagy `<sub>2</sub>` by se tam proto vypsaly jako viditelný text, ne jako dolní index — stejně jako to má dosud živý blok v temata.ts (řádek 3419) i schválený vzor „zákon zachování energie" (unicode Eₚ, Eₖ v ZAPIS). Proto jsem v OBSAH (set:html → funguje) přepsal t₂/t₁ na `<sub>`, ale v ZAPIS.vzorec i ZAPIS.body ponechal unicode dolní indexy t₂/t₁ — jinak by se na webu zobrazil rozbitý text. K rozhodnutí exekutora/učitele, pokud si žádá jinak i za cenu úpravy `index.astro`.

## ZDROJE
- Tepelná výměna nastává při dotyku těles s různou teplotou; rychlejší částice narážejí do pomalejších a předávají energii → PDF str. 1
- Teplejší těleso ztrácí vnitřní energii, chladnější ji získává; výměna končí vyrovnáním teplot → PDF str. 2–3
- Teplo Q, definice (energie předaná při tepelné výměně), jednotka joule (J) → PDF str. 3
- Teplejší odevzdává / chladnější přijímá teplo → PDF str. 3
- Pole „zakon": izolovaná tělesa — odevzdané teplo = přijaté teplo → PDF str. 3, doslovný citát se dvěma gramatickými opravami: „Pokud máme dvě tělesa" → „Pokud jsou dvě tělesa" a „tepelně izolovány" → „tepelně izolována" (shoda přídavného jména s podmětem „tělesa", PDF mělo nesouhlasný tvar); věcný obsah beze změny
- Rozdíl teplo × teplota; teplota t, teploměr, jednotka °C, vědci kelvin K → PDF str. 3–4
- Tři faktory množství tepla (rozdíl teplot, hmotnost, látka) s příklady: hrnec na mytí vs. čaj, 2 vs. 20 lidí, olej vs. voda → PDF str. 4–5
- Měrná tepelná kapacita c, definice (kolik tepla na 1 kg o 1 °C), jednotka J/(kg·°C) → PDF str. 5–6
- Voda c = 4 200 J/(kg·°C) → PDF str. 6, doslovná hodnota
- Vysoké c (voda, izolant, zásobník tepla — topení, chladiče) a nízké c (kovy, vodič, žebra chladičů) → PDF str. 6–7
- Vzorec Q = m · c · (t₂ − t₁), t₁ počáteční, t₂ konečná teplota → PDF str. 5
- Odvozené vztahy m = Q : [c·(t₂−t₁)], c = Q : [m·(t₂−t₁)] → v PDF nejsou, matematický důsledek hlavního vzorce (stejně jako u schváleného vzoru „zákon zachování energie")
- Příklad „konvice, 2 kg vody, 20 °C → 30 °C, Q = 84 000 J" → VLASTNÍ PŘÍKLAD; čísla zvolena, aby vyšlo celé číslo (2 · 4 200 · 10 = 84 000), ověřeno přepočtem
- Příklad „m = 1 kg vody, Δt = 10 °C, Q = 42 000 J" → VLASTNÍ PŘÍKLAD; ověřeno přepočtem (42 000 : 42 000 = 1)
- Převody „1 kJ = 1 000 J, 1 MJ = 1 000 000 J, 1 kg = 1 000 g" a věta „Do vzorce dosazuj teplo v J, hmotnost v kg, kapacitu v J/(kg·°C) a teploty v °C." → PŘEVZATO BEZE ZMĚNY z dosavadního bloku temata.ts, řádky 3425–3426; v PDF nejsou (obecně platné jednotkové převody a instrukce k dosazování) — v minulé verzi tohoto souboru omylem vypadly, teď vráceny přesně ve stejném znění jako dosud

VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY:

1. Sekce „Přetlak — uvnitř víc než venku", výčet „… nebo naše plíce po nádechu"
   — CO JE ŠPATNĚ: dosavadní blok `pretlak-podtlak-vakuum` měl v témže výčtu „plíce
   při výdechu" a tato formulace z výkladu zmizela. Železné pravidlo kontraktu:
   dosavadní obsah se nevyřazuje, rozpor se hlásí v ZDROJE — v ZDROJE (odrážka
   o příkladech přetlaku) se ale tvrdí jen „nic nebylo odebráno", což neplatí.
   — VĚCNĚ: „plíce po nádechu" má oporu v PDF str. 1 i v prezentaci Sealed_Gas_Pressure
   snímek 13 („PO NÁDECHU (Přetlak)"), takže samotná formulace chybná není; přetlak
   ovšem plíce prakticky vytvářejí až při výdechu (prezentace to tak i popisuje:
   „po nádechu se objem zmenší → vznikne přetlak → vzduch je vytlačen ven").
   — CO MÁ BÝT: uvést obojí („plíce po nádechu, když vzduch vydechujeme"), nebo rozpor
   s dosavadním zněním výslovně zapsat do ZDROJE.

2. Celý OBSAH — věty nad limit ~20 slov (kontrakt, bod C):
   „S přetlakem se setkáváme často: nafouknutý míč, pneumatika auta, …" (30 slov),
   „Manometry mívají stupnici v jednotce bar: 1 bar = 100 000 Pa, …" (26 slov),
   „S vakuem se setkáme třeba v baňce klasické žárovky s vláknem, …" (24 slov),
   „Když tlak v nádobě vzroste, trubička se mírně narovná a posune ručičku …" (22 slov),
   „Proto funguje pití brčkem, sání mateřského mléka, vysavač, …" (22 slov),
   „Vytváří se buď odsátím vzduchu z prostoru …" (21 slov),
   „p(celkový) = 1 atm + 2,5 atm = 3,5 atmosféry — tlak v pneumatice …" (21 slov).
   — CO MÁ BÝT: dlouhé výčty rozdělit na dvě věty nebo je převést na odrážky.

3. Sekce „Pro zvídavé: počítáme", „Pneumatiku auta huštíme na manometru asi na 2,5 baru
   přetlaku." → „p(celkový) = 1 atm + 2,5 atm = 3,5 atmosféry"
   — CO JE ŠPATNĚ: ve vzorci se sčítá 1 atm s hodnotou naměřenou v barech, ale v zápisu
   je najednou „2,5 atm". Dítě nevidí, proč se bar smí dosadit jako atmosféra.
   — CO MÁ BÝT: doplnit půlvětu „protože 1 bar ≈ 1 atmosféra" (PDF str. 3 to výslovně
   říká: „1 bar = 100 000 Pa (100 kPa) a přibližně odpovídá tlaku atmosféry").
   Samotná čísla jsou v pořádku: PDF str. 3 uvádí 2,5 baru i výsledek 3,5 atmosféry,
   přepočet 1 + 2,5 = 3,5 ověřen.

4. Sekce „Pro zvídavé: počítáme" — necelá čísla (2,5 baru, 3,5 atmosféry, „3,5krát")
   — CO JE ŠPATNĚ: obecné pravidlo „celá čísla v příkladech" (OBSAH-PRAVIDLA § 8).
   — POLEHČUJÍCÍ: jde o doslovný údaj z PDF str. 3 a o skutečný huštěný tlak pneumatiky,
   tedy naměřenou hodnotu — výjimka je obhajitelná. Uvádím jen jako upozornění
   pro případnou revizi pravidlem hlídaným strojově.

5. Sekce „Manometr měří přetlak", „Jeden konec je připojený k nádobě, druhý k ručičce."
   — CO JE ŠPATNĚ: proti PDF str. 1 vypadlo slovo „uzavřený" („druhý uzavřený konec je
   připojen k ručičce"), bez něhož princip trubice nedává úplný smysl.
   — CO MÁ BÝT: „druhý, uzavřený konec je spojený s ručičkou".

OVĚŘENO BEZ NÁLEZU (pro úplnost):
- JSON v ZAPIS je validní (`json.loads` prošel; klíče ['vzorec','jednotky','vzorecSlovy',
  'body'], 8 bodů) a pořadí klíčů odpovídá kontraktu.
- 1 bar = 100 000 Pa (PDF str. 3), celkový tlak 2 atmosféry ≈ 200 000 Pa (PDF str. 3
  doslova), jednotka atm jako starší jednotka (PDF str. 3, rámeček „Pro zajímavost").
- Definice přetlaku, podtlaku a vakua i všechny uvedené příklady (nafukovací haly,
  astronaut, masážní baňky, mlaskání, vakuové vaky) jsou v PDF str. 1–7 doslova;
  potvrzeno prezentací Sealed_Gas_Pressure, snímky 2, 5, 6, 7, 8, 10, 12.
- Vzorec p(celkový) = p(atmosférický) + p(přetlak) je korektní formalizace slovního
  popisu z PDF str. 3 (manometr ukazuje rozdíl vůči okolí) — fyzikálně správně.
- Všechny věty i 4 body dosavadního zápisu jsou v návrhu obsaženy (kromě nálezu 1).
- Struktura: 1× h2, 5× h3 (limit 7), žádný <em>, žádný metakomentář v OBSAH,
  odstavce do 4 vět, čísla od tisíce s mezerou.

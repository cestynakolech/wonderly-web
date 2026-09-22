# Nezávislá kontrola B — vyklad-oko-vady-oka-f7.md

VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné
- Nález 1 (h3 „Pro zvídavé"): h3 zrušen, v OBSAH jsou nyní jen 5 h3 (limit 7); +59 D je v sekci „Akomodace — zaostřování", Wichterle v „Zrakové vady a jejich korekce". Ověřeno grepem: řetězec „Pro zvídavé" se v souboru nevyskytuje.
- Nález 2 (Wichterle 1954): OBSAH nyní „V roce 1954 objevil český vědec Otto Wichterle měkký materiál pro kontaktní čočky." Sedí doslovně na PDF 27 str. 3: „…když český vědec Otto Wichterle objevil v roce 1954 měkký materiál pro jejich výrobu" (pdftotext -layout, ř. 50–53). Rok už není vázán na vynález čočky.
- Nález 3 (ZAPIS dublety): JSON validní (json.loads), 20 bodů, všechny telegrafické, žádný nad 20 slov. Čtyři celé věty z dosavadního bloku jsou pokryty telegraficky („oko: optická soustava…", „obraz na sítnici: skutečný, zmenšený, převrácený…", „akomodace: …mění mohutnost až o 15 D", „dalekozrakost: …koriguje spojka" / „krátkozrakost: …koriguje rozptylka"). Porovnáno s `node podtema.mjs . get fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka` — žádný fakt dosavadního zápisu neztracen.
- Nález 4 (funkce zornice): doplněno „Zornice se při silném světle zužuje a při slabém rozšiřuje — řídí tak množství světla, které do oka vstoupí." Sedí na PDF 26 str. 3: „Zornice: otvor v duhovce s proměnlivou velikostí, ovlivňuje množství světla vstupujícího do oka …, při velkém množství svět[l]a se zúží, při malém množství světla se rozšíří".

NOVÉ: žádné
Kontrola, že opravy nic nerozbily:
- ZAPIS: validní JSON, klíč `body`, 20 položek.
- Struktura: 1× h2, 5× h3 (limit 7 OK); žádný odstavec nad 4 věty (nejdelší „Akomodace" = 4 věty); žádná věta nad 20 slov — jediný delší řetězec je výčet částí oka se šipkami (17 slov + 5 šipek), není věta.
- V OBSAH ani v ZAPIS žádný metakomentář, odkaz na temata.ts/PDF, emoji ani cizí značka (➪, 💡) — ověřeno skriptem.
- Změněné/nové věty doloženy PDF 26 (rohovka, komorová voda, zornice, čočka 4 mm, sklivec, fotoreceptory: str. 2–3; +59 D str. 3; 15 D str. 5–6; blízký bod 10–15 / 7 / 60 cm, čtení 25–30 cm str. 7; vady str. 8–9) a PDF 27 str. 3 (Wichterle). Čísla jsou celá.
- Ponechání „čípky ve žluté skvrně" proti chybnému tvrzení PDF („nejvíce tyčinek je ve žluté skvrně") je doložené v ZDROJE — podle zadání v pořádku, není nález.

DROBNOSTI:
1. ZDROJE (odst. k žluté skvrně) používá formulaci „OPRAVA NEPROVEDENA — SPORNÉ (k rozhodnutí učitele) … NAVRŽENO K DOPLNĚNÍ — učitel ať rozhodne". Věcné řešení je správné a doložené, ale frázi „k rozhodnutí učitele" by bylo čistší nahradit prostým doložením rozporu (PDF vs. biologie). Nezakládám na tom NEPROŠLO — je to v ZDROJE, ne v OBSAH.
2. ZDROJE obsahuje popis vlastního postupu („ověřeno `node podtema.mjs get …`", „Počet bodů klesl z 21 na 20") — stejný typ metakomentáře, který byl u sesterského výkladu nálezem. Navíc aritmetika v posledním odstavci nesedí: „odečteny 4 duplicitní věty, přidán 1 nový bod" dává 21 − 4 + 1 = 18, ale bodů je 20 (věty byly slučovány, ne odstraňovány). Věcně bez dopadu, ale popis je zavádějící.

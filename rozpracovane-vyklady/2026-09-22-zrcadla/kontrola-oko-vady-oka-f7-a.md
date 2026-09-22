# Nezávislá kontrola A — vyklad-oko-vady-oka-f7.md

VERDIKT: PROŠLO S DROBNOSTMI

## Co bylo ověřeno (kotvy)
- PDF `/Users/Shared/Škola/7/4 Světlo/26 Oko, vady oka/Oko, vady oka.pdf` (pdftotext -layout, 11 stran) — přečteno celé.
- PDF `27 Optické vlastnosti oka…(nad rámec RVP)` — jen řádky o kontaktních čočkách.
- Popis prezentace „SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" — k oku obsahuje jen image29 (schéma krátkozrakého/dalekozrakého oka), potvrzeno.
- Dosavadní blok `fyzika/7-rocnik/zrcadla-a-cocky/oko-vady-oka` (temata.ts) — přečten, porovnán větu po větě.
- ZAPIS: JSON validní (`json.loads` prošel), klíče: body (21 položek).
- Struktura: 6× h3 (limit 7 OK), žádná věta nad 20 slov kromě výčtového řetězce částí oka (není věta), žádný odstavec nad 4 věty, všechna čísla celá (4 mm, 15 D, 59 D, 7/10–15/25–30/60 cm, 5 m, 1954), žádné cizí značky ani metakomentáře v OBSAH.

## Věcná správnost — vše doloženo
Ověřeno proti PDF: stavba oka a funkce částí (str. 2–3), fotoreceptory (str. 3), +59 dioptrií (str. 3), obraz skutečný/zmenšený/převrácený (str. 4), akomodace a 15 dioptrií (str. 6), blízký bod 10–15 cm, děti 7 cm, senioři 60 cm, čtení 25–30 cm (str. 7), dalekozrakost >25 cm / obraz za sítnicí / spojky, krátkozrakost <5 m / obraz před sítnicí / rozptylky (str. 8–9), zorný úhel s letadlem a broučkem (str. 10), prostorové vidění (str. 11). Nenašel jsem žádné číslo ani tvrzení bez opory.
Rozpor „žlutá skvrna — čípky vs. tyčinky": PDF str. 3 („nejvíce tyčinek je v tzv. žluté skvrně") je fyziologicky/biologicky chybné, výklad správně ponechal čípky a rozpor v ZDROJE nahlásil — posouzeno jako správné řešení, nález to není.

## NÁLEZY
1. Sekce `<h3>Pro zvídavé</h3>` („Optická mohutnost celé soustavy zdravého oka…") — porušení kontraktu bod D: nadpis pro tuto rubriku zní „Pro zvídavé: počítáme" a **když počítání není, nadpis se vynechá**. Na webu je tvar „Pro zvídavé: počítáme" ve všech 48 výskytech v `temata.ts` (ověřeno grepem), samotné „Pro zvídavé" nikde. MÁ BÝT: nadpis vypustit a obě zajímavosti (+59 D, Wichterle) připojit k příslušným sekcím (mohutnost k akomodaci, Wichterle ke korekci vad).
2. Sekce Pro zvídavé, „Měkké kontaktní čočky vynalezl v roce 1954 český vědec Otto Wichterle" — zdroj tvrdí méně: PDF 27 str. 3 doslova „kontaktní čočky byly vynalezeny v roce 1888… když český vědec Otto Wichterle objevil v roce 1954 měkký materiál pro jejich výrobu". Rok 1954 se ve zdroji váže k objevu MATERIÁLU, ne k vynálezu čočky (čočky vynalezeny 1888). MÁ BÝT: „V roce 1954 objevil český vědec Otto Wichterle měkký materiál pro kontaktní čočky." (PDF 27, str. 3).
3. ZAPIS, body 1–4 („Oko je optická soustava…", „Obraz na sítnici je…", „Oko zaostřuje změnou zakřivení…", „Dalekozrakost se koriguje spojkami…") — jsou to celé věty (11–12 slov), ne telegrafické body podle kontraktu B, a **obsahově se kryjí** s pozdějšími telegrafickými body téhož zápisu („akomodace: mění mohutnost čočky až o 15 D", „dalekozrakost: …, obraz za sítnicí", „korekce: i kontaktní čočky"). Sesterské výklady stejné dávky (`vyklad-rozklad-svetla-duha-f7.md`, `vyklad-vnimani-barev-f7.md`) dosavadní věty do telegrafické podoby převedly, tady zůstaly navíc → zápis má 21 bodů s dubletami. MÁ BÝT: sjednotit (obsah dosavadních 4 vět ponechat, ale telegraficky, bez opakování) — rozsah klesne na ~17 bodů, což je pro sešit únosnější; věcně se nic neztratí.
4. Sekce „Čím světlo v oku prochází", odstavec „Rohovka je průhledný ochranný obal…" — odstavec popisuje funkci rohovky, komorové vody, čočky i sklivce, ale u **zornice** funkci vynechává. PDF str. 3 uvádí: „Zornice: otvor v duhovce s proměnlivou velikostí, ovlivňuje množství světla vstupujícího do oka…, při velkém množství světla se zúží, při malém se rozšíří." Dosavadní blok měl jen „funguje jako clona fotoaparátu". MÁ BÝT: doplnit jednu větu o zužování/rozšiřování zornice (PDF str. 3) — jinak je výčet funkcí nekompletní právě u části, která je pro děti nejnázornější.

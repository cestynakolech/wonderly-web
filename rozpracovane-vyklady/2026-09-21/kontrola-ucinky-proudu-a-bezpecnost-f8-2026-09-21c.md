# Závěrečná (3.) nezávislá kontrola — vyklad-ucinky-proudu-a-bezpecnost-f8.md

VERDIKT: NEPROŠLO
NEVYŘEŠENÉ: žádný z osmi nálezů kola b (všech osm doloženo níž); zůstalo ale porušení téhož pravidla na místě, které výčet v kole b nezachytil — viz NOVÉ 1.
NOVÉ:
1. Věta 36 slov v sekci „Pro zvídavé: počítáme", ř. 105–107 (odrážka „Mokrý člověk"): „Mokrý člověk (R ≈ 2 000 Ω): stejný nízký odpor má vlhká kůže hned od malého napětí, proto vyjde stejně I = 230 : 2 000 = 115 mA — nebezpečné, ať je člověk suchý po proražení kůže, nebo rovnou mokrý." Požadavek C zní věty do ~20 slov; u sousedních podtémat byla tatáž vada důvodem NEPROŠLO. Oprava: rozdělit, např. „Mokrý člověk (R ≈ 2 000 Ω): stejně nízký odpor má vlhká kůže hned od malého napětí. Vyjde proto opět I = 230 : 2 000 = 115 mA. Nebezpečné je to tak jako tak — suchý po proražení kůže i rovnou mokrý."
2. DROBNÉ — ř. 181: na konci souboru zůstal cizí uzavírací tag `</content>` (ve složce ho mají jen dva soubory, `grep -l` = 2). Smazat řádek.
3. DROBNÉ — ř. 21: odrážka „odpor člověka" má po rozdělení dlouhé věty 6 vět a nese čtyři různá tvrzení (suchá kůže, suchá obuv, proražení nad 50 V, zpocení). Pro čtenáře 2. stupně je to už odstavec v odrážce; vhodné rozdělit na dvě odrážky (suchý člověk / vlhký člověk).
4. DROBNÉ — ZAPIS.body, poslední bod: „nedýchá? zkontroluj dech, tep, stlačuj hrudník". Pořadí je logicky převrácené — dech se kontroluje proto, aby se zjistilo, zda zraněný dýchá. Lépe: „uvolni oděv, zkontroluj dech a tep; nedýchá? stlačuj hrudník".
5. DROBNÉ — ZDROJE ř. 165 a 176: nálepky „OPRAVA CITACE:" a „ROZPOR OPRAVEN:" popisují průběh opravy návrhu, ne zdroj. Věcné jádro obou odrážek (co říká PDF, co dosavadní blok) je v pořádku a má zůstat; stačí nálepky odstranit.

## Doklady k nálezům kola b
- Nález 1 (9 vět přes 20 slov): všech devět jmenovaných vět rozděleno — strojová kontrola OBSAH našla už jen jedinou dlouhou větu, a to jinou (viz NOVÉ 1).
- Nález 2 (falešná citace PDF u proražení kůže a mezí 50/120 V): vyřešen. ZDROJE ř. 165 uvádí, že jde POUZE o dosavadní blok a že PDF tato slova neobsahuje; text zůstal (PDF ho nepopírá) — v souladu s rozhodnutím orchestrátora.
- Nález 3 (první pomoc — rozpor vydávaný za shodu): vyřešen podle rozhodnutí „platí PDF". OBSAH ř. 86–89: „Uvolni oděv a zkontroluj dech i tep. … Pokud umíš, přidávej i umělé dýchání." PDF 32 str. 5 doslovně: „když je zraněný mimo dosah elektrického proudu, uvolníme mu oděv, zkontrolujeme tep, dech a v případě potřeby mu poskytneme umělé dýchání a masáž srdce". Věta „Puls nehledej…" je pryč (grep „puls" = 0).
- Nález 4 (metakomentář „k rozhodnutí učitele"): vyřešen. Grep „k rozhodnutí|NAVRŽENO" = 0; ř. 167 nese obě sporné věty PDF str. 2 jako holou citaci a zdůvodnění výběru.
- Nález 5 (čísla bez mezery v tisících): vyřešen. V OBSAH je 5× „2 000 Ω"; „2000" zůstalo jen uvnitř doslovných citací PDF v ZDROJE (ř. 167), což je správně.
- Nález 6 (látka z PDF neoznačená): vyřešen. MIMO SCOPE nově pro pozitivní/terapeutické účinky (str. 1) a pro „napětí nižší než 1000 V / tepelná poškození" (str. 3); suchá obuv z gumy (str. 2) a „uvolníme oděv + umělé dýchání" (str. 5) byly naopak zařazeny do textu a doloženy.
- Nález 7 (nejednoznačné bezpečné napětí): vyřešen. ZAPIS.body „bezpečné napětí: stejnosměrné 25 V, střídavé 12 V"; PDF 32 str. 3 doslovně „Nejvyšší bezpečná hodnota stejnosměrného napětí podle normy je 25 V a střídavého napětí 12 V" ✓.
- Nález 8 („jež"): vyřešen, ř. 6 má „které se ukážou až za měsíce nebo roky".

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče vzorec, jednotky, vzorecSlovy, zakon, body.
- Odstavce `<p>`: žádný nad 4 věty (strojově). Věty: jediná přes 20 slov = NOVÉ 1.
- Přepočty (node): 4,5 : 150 000 = 0,00003 A = 30 µA ✓; 230 : 2 000 = 0,115 A = 115 mA ✓; 115 mA > 80 mA ✓; 30 mA chrániče < 60 mA ✓.
- Stupnice mA proti PDF 32 str. 2: 0,5–1 / 1–8 / 6–15 / 25 / 60 (fibrilace, přechodná zástava) / nad 80 mA (trvalá zástava) — doslovná shoda ✓.
- Bezpečnostní pravidla proti PDF 32 str. 4: mokrá ruka, vana/sprcha, jistič před výměnou žárovky, drobné předměty, kabel + kovový předmět, spotřebič připojovat vypnutý, neopravovat nevytažený spotřebič, spadlé dráty a stožáry — vše doloženo ✓.
- První pomoc proti PDF 32 str. 4–5: vypnout obvod, vlastní bezpečnost, izolující předmět (suchá dřevěná/plastová tyč, gumová obuv a rukavice), nedotýkat se holou rukou, uvolnit oděv + tep/dech + umělé dýchání a masáž srdce, volat 155 — vše sedí. Pořadí „volej 155" je ve výkladu dřív než v PDF (tam poslední odrážka), což PDF nepopírá a odpovídá první pomoci.

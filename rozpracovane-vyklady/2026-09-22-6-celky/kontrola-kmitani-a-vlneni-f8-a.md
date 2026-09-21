VERDIKT: NEPROŠLO

NÁLEZY:
1. ZÁVAŽNÉ — sekce ZAPIS, pole `body` („perioda T ↔ frekvence f: převrácené hodnoty“).
   Z dosavadního zápisu v datech zmizela definiční položka „Perioda udává dobu jednoho kmitu,
   frekvence udává počet kmitů za jednu sekundu.“ (ověřeno `node podtema.mjs . get
   fyzika/8-rocnik/zvuk/kmitani-a-vlneni`). V novém ZAPIS není nikde — ani v `body`
   („kmit: tam a zpět jednou“), ani v `jednotky` („perioda — značíme T, jednotka s (sekunda)“),
   ani ve `vzorecSlovy`. Porušeno železné pravidlo kontraktu: „dnešní `zapis` musí v novém
   zůstat celý“. MÁ BÝT: doplnit dva body, např. „perioda T: doba jednoho kmitu“ a
   „frekvence f: počet kmitů za sekundu“ (opora PDF 33 str. 3: „Perioda – Doba jednoho kmitu“,
   „Frekvence – Počet kmitů za 1 sekundu“).

2. DROBNÉ (pokrytí zdrojů) — sekce ZDROJE, poslední odrážka „v PDF ani v dosavadním bloku
   temata.ts tyto pojmy nejsou… do OBSAH nezařazeno (zadání označilo PDF jako jediný doložený
   podklad)“. Podle OBSAH-PRAVIDLA.md § 3 VÝKLAD jsou prezentace ROVNOCENNÝ zdroj s PDF a
   „výklad musí pokrýt látku z OBOU zdrojů“. Pojmy jsou v popisu prezentace doloženy:
   From_Particle_to_Wave.md snímek 3 („KYV – pohyb pouze jedním směrem“) a snímek 12
   (stojaté vlnění, uzly). MÁ BÝT: kyv doplnit do OBSAH (patří k definici kmitu, 1 věta);
   u stojatého vlnění buď doplnit, nebo nechat jako návrh k rozhodnutí učitele — ale důvod
   „PDF je jediný doložený podklad“ neplatí.

3. DROBNÉ — OBSAH, první řádek `<h2>Kmitání a vlnění</h2>`. Kontrakt žádá „Název do `<h2>`
   z `nazev`“, `nazev` v datech je „Kmitání a vlnění (nad rámec RVP)“. MÁ BÝT: buď přesný
   název, nebo vědomá výjimka zapsaná do ZDROJE.

4. DROBNÉ — duplicita příkladu. Týž příklad houpačky je v hlavním textu („Příklad: houpačka
   udělá 2 kmity za sekundu, proto f = 2 Hz. Jeden kmit trvá půl sekundy, proto T = 0,5 s.“)
   i v sekci „Pro zvídavé: počítáme“ („Houpačka udělá 2 kmity za sekundu, tedy f = 2 Hz.“).
   MÁ BÝT: v hlavním textu ponechat závěr, v „Pro zvídavé“ jen dopočet, nebo příklady odlišit.

5. DROBNÉ — jazyk, sekce „Základní pojmy kmitání“: věta „Kmitání — pohyb, při kterém se těleso
   opakovaně vychyluje z rovnovážné polohy a zase se do ní vrací; výchylka pravidelně střídá
   strany.“ má 22 slov a „Kmit — nejmenší pravidelně se opakující část pohybu…“ 21 slov.
   Kontrakt C: věty do ~20 slov. (Obě věty jsou převzaté z dosavadního bloku — vada je mírná.)

OVĚŘENO BEZ NÁLEZU:
- Všechny výpočty přepočítány: T = 1 : 2 = 0,5 s; λ = 2 · 3 = 6 m; λ = 340 : 170 = 2 m — sedí.
- Čísla a definice proti PDF 33 (pdftotext): rovnovážná poloha s. 2; periodický kmitavý pohyb,
  kmit, amplituda, perioda, frekvence s. 3; převrácené hodnoty a tlumené kmitání s. 4;
  vlnění s. 5–6; vlnová délka, rychlost šíření, λ = v·T = v:f s. 6; příčné/podélné s. 7.
  Všechny odkazy na strany v ZDROJE odpovídají skutečnosti.
- Z dosavadního OBSAH nic nevypadlo (kopečky a údolí, domino, tření o vzduch i uvnitř tělesa).
- JSON v ZAPIS je validní (JSON.parse), klíče vzorec/jednotky/vzorecSlovy/body, 8 bodů.
- `vzorec` a věta o dosazování převzaty z dosavadního zápisu doslova; h2 = 1, h3 = 6 (limit 7);
  žádný `<em>`, žádná čtyřciferná čísla bez mezery, žádný metakomentář v OBSAH ani ZAPIS.
- Délka zápisu (8 bodů) je pro toto podtéma přiměřená.

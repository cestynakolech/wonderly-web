VERDIKT: NEPROŠLO

Kontrolováno (2. kolo, úzké): `vyklad-slunecni-soustava-f9.md` proti nálezům verze a,
proti PDF `/Users/Shared/Škola/9/3. Vesmír/22.  Sluneční soustava/22.  Sluneční soustava.pdf`
(24 stran, pdftotext -layout, kontrola po stranách -f/-l) a proti dosavadnímu bloku
`slug: 'slunecni-soustava'` (src/data/temata.ts ř. 3218–3274).

OVĚŘENÍ NÁLEZŮ VERZE a:
1. „osmkrát pomaleji" — VYŘEŠENO. Ř. 61: „oběh kolem Slunce jí trvá osmkrát déle než Zemi."
   O rychlosti text netvrdí nic. Přepočet (node): 4^1,5 = 8; v = 2πa/T → 6,283 vs 3,142 (2× pomaleji).
2. 39 bodů ZAPIS — VYŘEŠENO. Nyní 18 bodů (strop 22 dodržen), kostra zachována.
3. chybějící rozdělení planet v ZAPIS — VYŘEŠENO. Body „kamenné: Merkur, Venuše, Země, Mars"
   a „plynné: Jupiter, Saturn, Uran, Neptun" doplněny; obsah dosavadního `zapis.body` pokryt.
4. Jupiter „na povrchu" — VYŘEŠENO. Ř. 32: „V jeho atmosféře zuří obří bouře zvaná Velká rudá skvrna."
5. věty nad 20 slov — VYŘEŠENO. Nejdelší věta v OBSAH má 19 slov (měřeno skriptem nad textem bez značek).
6. chybějící mezivýsledek dosazení — VYŘEŠENO. Ř. 60: „T₁² : T₂² = a₁³ : a₂³ → 1² : T₂² = 1³ : 4³
   → 1 : T₂² = 1 : 64 → T₂² = 64 → T₂ = 8".
7. číslování Keplerových zákonů — VYŘEŠENO. OBSAH má „1. Keplerův zákon" a „2. Keplerův zákon"
   shodně se ZAPIS; PDF str. 22–23 je má číslované stejně.
8. meziplanetární látka — VYŘEŠENO. Ř. 4: „…a drobné prachové částice; ty tvoří meziplanetární látku."
9. metakomentáře v ZDROJE — NEVYŘEŠENO. Vytčená formulace „doplněn do OBSAH i ZAPIS" je beze změny
   na ř. 127 a přibyly další: ř. 102 „Věta rozdělena na kratší kvůli délkovému limitu (kontrakt C)",
   ř. 126 „OBSAH i ZAPIS teď oba zákony číslují", ř. 128 „Výpočet doplněn o krok dosazení… Věta
   o rychlosti opravena", ř. 129 „ZAPIS.body zkrácen z 39 na 18 položek podle nálezu kontroly".
   Druhá část nálezu (chybějící doslovné věty z dosavadního bloku) VYŘEŠENA — citace doplněny.

NEVYŘEŠENÉ: 9 (metakomentáře v ZDROJE; drobné, netýká se textu pro žáky).

NOVÉ:
1. VĚCNÁ CHYBA — sekce „Plynné planety", ř. 30: „Jejich husté atmosféry tvoří hlavně metan a čpavek."
   Nesprávné a navíc v rozporu s předchozí větou téhož odstavce („složené hlavně z vodíku a helia
   jako Slunce"). Atmosféry plynných obrů jsou z valné většiny vodík a helium (Jupiter ~90 % H₂),
   metan a čpavek jsou příměsi, které dávají barvu. Chyba je převzatá doslovně z PDF str. 10
   („Mají mohutné husté atmosféry složené převážně z metanu a čpavku"), tedy chybuje sám podklad;
   pravidlo „PDF má přednost" platí vůči dosavadnímu webu, ne vůči fyzice.
   CO MÁ BÝT: „V jejich atmosférách je kromě vodíku a helia i metan a čpavek — ty jim dávají barvu."
   (Pro Uran ř. 34 už text barvu z metanu zmiňuje, takže úprava nic neubere.)
2. DROBNÉ — ZDROJE ř. 127 a 128: 3. Keplerův zákon citován jako „PDF str. 24". Ověřeno po stranách:
   „➢ Třetí Keplerův zákon" je na straně 23 z 24 (str. 24 obsahuje jen „Pro zajímavost" a upozornění).
   Obsahově je zákon doložen (znění i „T v letech, a v AU" odpovídá doslovně), sedí jen číslo strany.
   → Vyžádaný bod: 3. Keplerův zákon ZŮSTÁVÁ, je doložen; opravit jen odkaz na str. 23.

OVĚŘENO BEZ NÁLEZU (vyžádané body):
- Čísla planet proti PDF po stranách: Slunce 1,4 mil. km / 330 tis. Zemí / rotace 25 dní / hustota jádra
  9× olovo / jádro 15 mil. °C / povrch 4 000–6 000 °C / 4,5 mld. let (str. 2); Venuše tlak téměř 100×,
  460 °C (str. 5–6); Mars Olympus Mons 24 km, poloviční průměr, 10× menší hmotnost, 3× slabší gravitace,
  Sol 24 h 39 min 35,244 s → „asi 24 hodin a 40 minut" (str. 8); Jupiter přes 95 měsíců (str. 10);
  Uran −220 °C a vítr 900 km/h — obě čísla skutečně u Uranu (str. 13), Neptun (str. 14) je bez čísel;
  planetky 100 m–1 km, přes 200 tisíc, desetina prozkoumaná (str. 18); Halley 76 let (str. 19);
  AU 150 mil. km, 1 ly 9,46 bilionu km, Polárka 433 ly (str. 21–22). Vše sedí.
- ZAPIS je validní JSON (json.loads OK), klíče vzorec, jednotky, vzorecSlovy, zakon, body; 18 bodů.
- Odstavce `<p>` nejvýš 4 věty; žádné cizí značky (`</content>`, `<em>`, TODO); struktura
  OBSAH → ZAPIS → ZDROJE; 1× h2, 7× h3; počítací část poslední; čísla od tisíce s mezerou.
- Z dosavadního `zapis` nevypadlo nic (rozdělení planet i `zakon` zachovány, 3. zákon přidán navíc).

DROBNOSTI (jazykové, nebrání ničemu):
a) Tři odrážky mají po rozdělení dlouhých vět 5 vět (Mars ř. 26, Jupiter ř. 32, Komety ř. 43) —
   pokud limit 3–4 věty platí i na `<li>`, hodí se ubrat větu nebo rozdělit odrážku.
b) V ZAPIS zmizelo slovo „meteoroid" (dosavadní blok měl „…komety a meteoroidy"); zůstal jen meteor
   a meteorit, přitom OBSAH trojici vysvětluje.
c) Ř. 54: 2. Keplerův zákon „poměr rychlostí planety ve dvou místech dráhy je opačný než poměr jejích
   vzdáleností" platí přesně jen v přísluní a odsluní; formulace je doslovně z PDF str. 23, jen na vědomí.
d) `vzorec` má uvnitř shluk mezer („a₁³ : a₂³      (T = …)").

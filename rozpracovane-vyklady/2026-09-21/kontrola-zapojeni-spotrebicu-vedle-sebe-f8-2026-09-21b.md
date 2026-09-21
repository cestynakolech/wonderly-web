# Kontrola výkladu — zapojeni-spotrebicu-vedle-sebe (F8), 21. 9. 2026 (první kontrola)

VERDIKT: NEPROŠLO

## Co je v pořádku (ověřeno)
- Fyzika i všechny výpočty sedí (přepočítáno): U=12 V, R₁=6 Ω, R₂=3 Ω → I₁=12:6=2 A, I₂=12:3=4 A, I=2+4=6 A; 1:6+1:3=1:2 → R=2 Ω; zkouška R=U:I=12:6=2 Ω. Všechny výsledky celá čísla.
- Poměry souhlasí s PDF str. 3: odpory 2:1 → proudy 1:2.
- Napětí stejné na všech větvích (PDF str. 2), dělení proudu v uzlu a I = I₁ + I₂ (PDF str. 3), 1/R = 1/R₁ + 1/R₂ a „výsledná hodnota je vždy menší" (PDF str. 5) — vše doloženo.
- Správně nahlášen rozpor v PDF str. 5 („pokud by bylo v sérii zapojeno více spotřebičů" u paralelního vzorce) — nahlášení v ZDROJE je podle pravidla.
- ZAPIS je validní JSON; h2 = 1, h3 = 5, žádný `<em>`, tisíce s mezerou.
- Z dosavadního bloku nevypadl žádný věcný bod (napětí, proud, opačný poměr, Ohmův zákon pro větve, plocha průřezu, pomůcka, výhoda paralelu).

## NÁLEZY
1. ZAPIS, pole `body`: „V paralelním obvodu je každý spotřebič připojen přímo ke zdroji a vodiče se spojují v uzlech." (a další 4). Co je špatně: body jsou celé věty o 7–16 slovech, opsané z dosavadního bloku. Kontrakt ZADANI-WORKER-VYKLAD.md, požadavek B, žádá telegrafické body „3–6 slov na řádek, jedno heslo na bod" (vzor „pád: polohová → pohybová"); sesterský výklad `zapojeni-spotrebicu-za-sebou` už tvar splňuje („napětí: dělí se, U = U₁ + U₂"). Co má být: přepsat všech 5 bodů telegraficky, např. „paralelně: každý spotřebič ke zdroji", „napětí: všude stejné jako zdroj", „proud: dělí se, I = I₁ + I₂", „odpor: 1 : R = 1 : R₁ + 1 : R₂, klesá", „porucha jednoho → ostatní fungují".
2. ZAPIS, pole `jednotky`: „elektrické napětí U, U₁, U₂ — volt (V)". Co je špatně: chybí předepsaný tvar. Kontrakt B: každá veličina ve tvaru „název — značíme X, jednotka Y (název)". Co má být: „elektrické napětí — značíme U (na větvích U₁, U₂ — jsou stejné jako U), jednotka V (volt)" a obdobně proud a odpor (viz hotový tvar v `vyklad-zapojeni-spotrebicu-za-sebou-f8.md`).
3. OBSAH, Pro zvídavé: počítáme — „Celkový odpor spočítáme ze vzorce pro paralelní rezistory: 1 : R = 1 : R₁ + 1 : R₂ = 1 : 6 + 1 : 3 = 1 : 6 + 2 : 6 = 3 : 6 = 1 : 2, takže R = 2 Ω." Co je špatně: 30 slov v jedné větě (limit C je ~20) a nevysvětlený poslední krok — z „1 : R = 1 : 2" se R = 2 Ω dítěti neodvodí samo. Co má být: rozdělit na 2–3 kratší věty a doplnit větu typu „Když je 1 : R = 1 : 2, je R = 2 Ω."
4. OBSAH, tamtéž — „Odpory jsou v poměru R₁ : R₂ = 6 : 3, tedy 2 : 1 — a proudy vyšly přesně obráceně, 2 A : 4 A, tedy 1 : 2." Co je špatně: 23 slov, přes limit ~20 slov (požadavek C). Co má být: rozdělit na dvě věty (poměr odporů / obrácený poměr proudů).
5. ZDROJE, první odrážka: „PDF je export ze SmartBooks … obsahově je k tématu úplný …, „číst dál" na konci odkazuje na navazující látku, ne na oříznutí tohoto podtématu." Co je špatně: tvrzení není podložené a PDF mu odporuje — na str. 6 je týž blok „UPOZORNĚNÍ: Toto Stručné vysvětlení učiva obsahuje pouze základy z tohoto tématu" + „číst dál" jako u ostatních útržkovitých podkladů (sesterský výklad `rezistor-s-promennym-odporem` totéž upozornění hodnotí opačně, jako útržkovitý podklad). Co má být: nahradit neutrálním konstatováním „PDF str. 6 končí upozorněním, že jde jen o základy tématu (útržkovitý podklad SmartBooks) — rozsah posoudí učitel".
6. OBSAH, úvodní odstavec „V paralelním obvodu je každý spotřebič připojen přímo ke zdroji." Co je špatně: proti dosavadnímu bloku vypadl dovětek s klíčovými slovy („paralelní zapojení spotřebičů je důležitý typ elektrického obvodu") a proti PDF str. 1 chybí úvodní rozcestník „spotřebiče lze zapojit dvěma způsoby: za sebou (sériově) / vedle sebe (paralelně)" a věta „Každý elektrický spotřebič má vlastní odpor." Co má být: doplnit jednu úvodní větu o dvou způsobech zapojení (jako má sesterský výklad) a vrátit dovětek z dosavadního bloku, nebo ho v ZDROJE uvést jako vědomě vypuštěný.

Závěr: fyzika je bez chyby, blokující jsou nálezy 1 a 2 (ZAPIS neodpovídá závaznému tvaru kontraktu) a 3–4 (dlouhé věty). Po opravě stačí rychlá opakovaná kontrola tvaru.

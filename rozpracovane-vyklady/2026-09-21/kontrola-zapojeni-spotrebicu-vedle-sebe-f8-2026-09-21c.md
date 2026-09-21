# Kontrola výkladu — zapojeni-spotrebicu-vedle-sebe (F8), 21. 9. 2026 (kolo c, závěrečné)

VERDIKT: PROŠLO
NEVYŘEŠENÉ: žádné
NOVÉ: žádné

## Ověření nálezů z kola b (1–6)
1. ZAPIS `body` — přepsáno telegraficky, 5 bodů po 4–7 slovech („paralelně: každý spotřebič ke zdroji" … „porucha jednoho → ostatní fungují"). Věcně nic nevypadlo proti temata.ts:2816–2820 (opačný poměr proudů zůstává v OBSAH, ř. 11). VYŘEŠENO.
2. ZAPIS `jednotky` — předepsaný tvar „název — značíme X, jednotka Y (název)" u všech tří veličin (ř. 34–36). Dovětky „(na větvích U₁, U₂ — jsou stejné jako U)" a „(na větvích I₁, I₂ — jejich součet je I)" jsou fyzikálně správné. VYŘEŠENO.
3. Dlouhá věta o celkovém odporu rozdělena na tři (ř. 26) a doplněn chybějící krok „Když je 1 : R = 1 : 2, je R = 2 Ω." VYŘEŠENO.
4. Věta o poměrech rozdělena na dvě (ř. 25): „Odpory jsou v poměru R₁ : R₂ = 6 : 3, tedy 2 : 1." + „Proudy vyšly přesně obráceně, 2 A : 4 A, tedy 1 : 2." VYŘEŠENO.
5. ZDROJE, první odrážka nahrazena neutrálním zněním (ř. 53). Ověřeno v PDF: na STRANĚ 6 je „UPOZORNĚNÍ / Toto Stručné vysvětlení učiva obsahuje pouze základy z tohoto tématu. / číst dál". VYŘEŠENO.
6. Úvod doplněn o rozcestník „dvěma způsoby: za sebou (sériově), nebo vedle sebe (paralelně)" a o větu „Každý elektrický spotřebič má vlastní odpor…" (obojí PDF str. 1 doslovně) a vrácen dovětek „Paralelní zapojení spotřebičů je důležitý typ elektrického obvodu." (temata.ts:2801). VYŘEŠENO.

## Kontrola, že opravy nezanesly novou chybu
- ZAPIS: JSON se parsuje bez chyby, klíče vzorec, jednotky, vzorecSlovy, zakon, body (5 bodů). `zakon` je doslovná věta z PDF str. 3 („součet proudů v jednotlivých větvích je roven celkovému proudu v obvodu").
- Věty: po odečtení matematických znaků žádná věta nepřesahuje 20 slov (nejdelší prozaická věta 20 slov — „Proud na každé větvi spočítáme z Ohmova zákona zvlášť…").
- Odstavce: max 3 věty.
- Struktura: h2 = 1, h3 = 5, žádný `<em>`, tisíce s mezerou, žádné metakomentáře.
- Přepočet (node): 12:6=2 A; 12:3=4 A; 2+4=6 A; 1/6+1/3=1/2 → R=2 Ω; zkouška 12:6=2 Ω. Řetěz „1 : 6 + 2 : 6 = 3 : 6 = 1 : 2" je početně správný. Vše celá čísla.
- Poměry proti PDF str. 3: odpory 2 : 1 → proudy 1 : 2 — doslovná opora („pokud jsou odpory rezistorů v poměru 2 : 1, proud se rozdělí v poměru 1 : 2").
- Chyba v samotném PDF (str. 5, „pokud by bylo v sérii zapojeno více spotřebičů" u paralelního vzorce) zůstává v ZDROJE nahlášena, text ji přebírá věcně správně.

Podklad: PDF „/Users/Shared/Škola/8/5 Elektřina /29 …/ 29.  Zapojení spotřebičů v elektrickém obvodu vedle sebe.pdf" (6 stran, pypdf).

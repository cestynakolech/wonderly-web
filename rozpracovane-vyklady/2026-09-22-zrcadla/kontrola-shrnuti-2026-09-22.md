# Nezávislá kontrola 6 přehledových podtémat „shrnutí" (F7, F8, F9) — 22. 9. 2026

Kotvy: `src/data/temata.ts` (čteno přes `testy/data.mjs`, tj. skutečná data webu),
přestavěné výklady všech podtémat 7.–9. ročníku (pole `zapis.vzorec` / `zakon` / `jednotky` + `obsah`),
časové plány učitele `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/Casovy plan - Fyzika {7B,8B,9} - 2026-27.xlsx`,
`KONTROLA-souladu-planu-a-webu.md`, strojové měření délky vět, `curl` na živý web a na externí odkaz.

Ověřeno a BEZ nálezu (platí pro všech 6):
- Všech 26 odkazů `../../<celek>/` míří na existující slug téhož ročníku a text odkazu se doslova shoduje s polem `nazev` celku (ověřeno i proti `dist/skola2/fyzika/*/`; hloubka `../../` je správná).
- Všechny citované vztahy souhlasí s přestavěnými výklady: `v = s : t`, `p = F : S`, `W = F · s`, `P = W : t`,
  `I = U : R`, `U₂ : U₁ = N₂ : N₁` (i všechny čtyři odvozeniny jsou algebraicky správně).
- Číselné údaje ověřeny ve výkladech: 1 m/s = 3,6 km/h; g = 10 N/kg; 1 kWh = 3 600 000 J = **3,6 MJ** (přepočteno);
  rychlost zvuku ≈ 340 m/s (8/zvuk-vznik-a-sireni); síť 50 Hz / 230 V (9/vlastnosti-stridaveho-proudu);
  α = jádra helia, β = rychlé elektrony, γ = elektromagnetické, ochrana stíněním/vzdáleností/časem (9/radioaktivita);
  1 AU = 150 mil. km, světelný rok, 8 planet, Keplerovy zákony (9/slunecni-soustava).
- ŽÁDNÝ zastaralý vzorec ani značka: nikde se nevyskytuje starší tvar, který by nový výklad psal jinak.
- Tvrzení ze zadání, že „F9 roční shrnutí odkazuje na celky 4–6, které ročník nemá", se NEPOTVRDILO —
  `elektricka-energie-a-bezpecnost`, `jaderna-fyzika` i `energie-a-vesmir` v 9. ročníku existují a názvy sedí.
- Metakomentáře: žádné. Věty: strojově jen 1 překročení 20 slov (viz 8/rocni-shrnuti).
- Dosavadní obsah nebyl vyřazen — bloky `shrnuti` se od commitu 0608e39 nezměnily, přestavba výkladů do nich nesáhla.
- Externí odkaz Wordwall (7/pololetni) je český (`/cs/`), vrací HTTP 200 a testuje látku 1. pololetí.

---

## 7/pololetni-shrnuti — VERDIKT: NEPROŠLO (3)

NÁLEZY:
1. ř. 1971 a ř. 1988 („Pascalův zákon a hydraulika; hydrostatický tlak" / „U kapalin počítáme tlak a poznáváme Pascalův zákon, hydrauliku a hydrostatický tlak.") | Stránka slibuje „Co máš umět za 1. pololetí", ale Pascalův zákon, hydraulická zařízení i hydrostatický tlak jsou v časovém plánu VII.B až v ÚNORU (leden končí položkou „Mechanické vlastnosti kapalin — úvod"); z celku 4 patří do 1. pololetí jen „Tlak, tlaková síla" a „Tlak v praxi" (prosinec). Žák tak dostane v pololetním přehledu neprobranou látku. | NÁVRH — ř. 1971: `<ul><li>tlak p = F : S (pascal); tlaková síla a tlak v praxi</li></ul>` ; ř. 1988: `'U kapalin a pevných těles počítáme tlak a poznáváme tlakovou sílu.',`
2. ř. 1972–1977 („📋 Klíčové vztahy" — jen rychlost, tlak, 10 N) | Přehled vztahů vynechává dva vztahy, které se v 1. pololetí skutečně počítají a které přestavěné výklady mají jako hlavní vzorec: rovnováha na páce `F₁ · a₁ = F₂ · a₂` (7/jednoduche-stroje-paky) a gravitační síla `Fg = m · g` (7/gravitacni-sila). | NÁVRH — mezi ř. 1975 a 1976 vložit `<li>rovnováha na páce F₁ · a₁ = F₂ · a₂ (N, m)</li>` a ř. 1976 nahradit `<li>gravitační síla Fg = m · g (g = 10 N/kg, tedy na 1 kg připadá asi 10 N)</li>`
3. ř. 1990 (`vzorec: 'v = s : t … p = F : S …'`) | Pole `zapis` (zápis do sešitu) nese jen dva vzorce ze čtyř probraných celků — chybí `Fg = m · g` i `F₁ · a₁ = F₂ · a₂`, takže zápis nepokrývá pololetí. | NÁVRH — ř. 1990: `vzorec: 'v = s : t      (odvozeně: s = v · t,  t = s : v)      Fg = m · g      p = F : S      (odvozeně: F = p · S,  S = F : p)      F₁ · a₁ = F₂ · a₂',` a do `jednotky` doplnit `'hmotnost m — kilogram (kg), g = 10 N/kg'` a `'rameno síly a — metr (m)'`

## 7/rocni-shrnuti — VERDIKT: NEPROŠLO (2)

NÁLEZY:
1. ř. 2012 („deformace; páka, moment síly, rovnováha na páce") | Roční shrnutí má pokrýt celý ročník, ale z celku „Jednoduché stroje" vynechává 2 ze 4 podtémat — `kladka` („Kladka — pevná a volná", vzorec F = F_G : 2, zlaté pravidlo mechaniky) a `naklonena-rovina` (F = G · h : l). Obě mají na webu hotový výklad, vzorec i kvíz, a v přehledu ročníku nejsou vůbec. | NÁVRH — ř. 2012: `<ul><li>deformace; páka, moment síly, rovnováha na páce; kladka pevná a volná; nakloněná rovina a zlaté pravidlo mechaniky</li></ul>`
2. celý blok ř. 2002–2037 (chybí `<h3>📋 Klíčové vztahy</h3>`; `zapis` má jen `body`) | Jediné ze tří ročních shrnutí bez přehledu vztahů — 8/rocni-shrnuti má sekci „Klíčové vztahy" (ř. 2552–2557) a 9/rocni-shrnuti má navíc i `vzorec` a `jednotky`. Žák 7. ročníku tak před závěrečným opakováním nemá souhrn vzorců, přestože jich ročník počítá nejvíc. | NÁVRH — před ukončení `obsah` (ř. 2028) vložit:
   `<h3>📋 Klíčové vztahy</h3>` / `<ul>` / `<li>rychlost v = s : t (1 m/s = 3,6 km/h)</li>` / `<li>gravitační síla Fg = m · g, g = 10 N/kg</li>` / `<li>rovnováha na páce F₁ · a₁ = F₂ · a₂</li>` / `<li>tlak p = F : S (Pa); hydrostatický tlak pₕ = h · ρ · g</li>` / `<li>vztlaková síla Fvz = V · ρ · g (Archimédův zákon)</li>` / `<li>zákon odrazu α′ = α; ohnisko kulového zrcadla f = r : 2</li>` / `</ul>`
   (všechny tvary opsány doslova z přestavěných výkladů 7. ročníku)

## 8/pololetni-shrnuti — VERDIKT: NEPROŠLO (3)

NÁLEZY:
1. ř. 2505 a ř. 2519 („parní stroj; spalovací motory" / „Tepelné motory, například parní stroj a spalovací motor, využívají tepelnou energii.") | Časový plán VIII.B má „Spalovací motory" i „Hybridní motory" až v ÚNORU, tedy ve 2. pololetí (leden končí „Opakování za pololetí, klasifikace"). Pololetní přehled tedy žákovi předkládá neprobranou látku. | NÁVRH — ř. 2504–2505 celý celek 3 z pololetního shrnutí vypustit a přečíslovat stávající celek 4 na „3."; ř. 2519 nahradit `'Šíření tepla vedením, prouděním a sáláním vysvětluje, jak se teplo předává mezi tělesy.',`
2. ř. 2521 (`zakon: 'Zákon zachování mechanické energie: … ale její celková velikost se zachovává.'`) a ř. 2517 (tatáž věta v `body`) | Zákon je uveden BEZ podmínky. Přestavěný výklad 8/zakon-zachovani-mechanicke-energie ji má výslovně: „**Pokud se mechanická energie nemění v jiné druhy energie**, je součet polohové a pohybové energie stejný." Bez podmínky je tvrzení nepravdivé všude, kde působí tření nebo odpor vzduchu. | NÁVRH — ř. 2521: `zakon: 'Zákon zachování mechanické energie: pokud se mechanická energie nemění v jiné druhy energie, je součet polohové a pohybové energie stále stejný.',` ; ř. 2517: `'Pokud nepůsobí tření, přeměňuje se polohová energie na pohybovou a jejich součet zůstává stejný.',`
3. ř. 2508–2512 („📋 Klíčové vztahy" — jen W, P a 1 kWh) | Přehled vynechává tři vztahy, které se v 1. pololetí skutečně počítají a přestavěné výklady je mají jako hlavní vzorec: `Eₚ = m · g · h`, `Q = m · c · (t₂ − t₁)` a `Lₜ = lₜ · m`. `zapis.vzorec` (ř. 2522) je postižen stejně. | NÁVRH — mezi ř. 2510 a 2511 vložit `<li>polohová energie Eₚ = m · g · h (J)</li>`, `<li>teplo Q = m · c · (t₂ − t₁) (J)</li>`, `<li>skupenské teplo tání Lₜ = lₜ · m (J)</li>`; ř. 2522 doplnit na `vzorec: 'W = F · s;  P = W : t;  Eₚ = m · g · h;  Q = m · c · (t₂ − t₁);  Lₜ = lₜ · m',` a do `jednotky` přidat `'měrná tepelná kapacita c — J/(kg·°C)'` a `'měrné skupenské teplo tání lₜ — J/kg'`

## 8/rocni-shrnuti — VERDIKT: PROŠLO S DROBNOSTMI (2)

NÁLEZY:
1. ř. 2549 („elektrický náboj a pole; vznik proudu, zdroje napětí; obvody; …") | Jediná položka výčtu má strojově 34 slov, tedy nad limit 20 slov na větu; pro přehled před opakováním je nepřehledná. | NÁVRH — ř. 2549 rozdělit na tři položky: `<ul><li>elektrický náboj a pole; vznik proudu a zdroje napětí; elektrické obvody</li><li>měření proudu (A) a napětí (V); odpor a Ohmův zákon</li><li>sériové a paralelní zapojení; reostat; práce a výkon proudu; bezpečnost</li></ul>`
2. ř. 2553–2557 („📋 Klíčové vztahy") | Chybí `Q = m · c · (t₂ − t₁)` a `P = U · I` — dva vztahy, kolem kterých stojí celý 8. ročník (výklady 8/tepelna-vymena-a-teplo a 8/elektricka-prace-a-vykon je mají jako hlavní vzorec), zatímco uveden je jen Ohmův zákon. | NÁVRH — za ř. 2554 vložit `<li>teplo Q = m · c · (t₂ − t₁) (J)</li>` a za ř. 2555 `<li>elektrický výkon P = U · I (W), elektrická práce W = U · I · t</li>`

## 9/pololetni-shrnuti — VERDIKT: NEPROŠLO (2)

NÁLEZY:
1. ř. 2880–2892 a ř. 2896–2899 (celý přehled „Co máš umět za 1. pololetí": celky Magnetické pole, Indukce a střídavý proud, Elektrický proud v látkách) | Obsah se rozchází s časovým plánem 9. ročníku (IX.A/B/C shodně) i s `KONTROLA-souladu-planu-a-webu.md` („pořadí … atom/jádro → elektro/indukce → vesmír"). Do pololetí (září–leden) patří podle plánu CELÁ JADERNÁ FYZIKA — atom a modely, izotopy a ionty, radioaktivita a druhy záření, poločas rozpadu a ochrana, štěpení jader a řetězová reakce, jaderný reaktor, jaderná elektrárna a havárie, přehled zdrojů energie — a z elektro pouze magnetické pole cívky s proudem, elektromagnetická indukce a generátor (vznik střídavého napětí). Shrnutí jadernou fyziku neuvádí ANI JEDNÍM slovem, a naopak jako pololetní učivo vydává elektromotor (únor), transformátor (únor), přenos elektrické energie a rozvodnou síť (březen), elektrolýzu (březen), vedení proudu v plynech, polovodiče a diodu (duben). | NÁVRH — ř. 2882–2892 nahradit:
   `<h3>1. <a href="../../jaderna-fyzika/">Jaderná fyzika</a></h3>`
   `<ul><li>jádro atomu (protony, neutrony, izotopy); radioaktivita a druhy záření; poločas rozpadu a ochrana; štěpení jader a řetězová reakce; jaderný reaktor a jaderná elektrárna</li></ul>`
   `<h3>2. <a href="../../energie-a-vesmir/">Zdroje energie a vesmír</a></h3>`
   `<ul><li>obnovitelné a neobnovitelné zdroje energie, přehled elektráren</li></ul>`
   `<h3>3. <a href="../../magneticke-pole/">Magnetické pole</a></h3>`
   `<ul><li>magnety (opakování); magnetické pole vodiče s proudem a cívky; elektromagnet a jeho využití</li></ul>`
   `<h3>4. <a href="../../indukce-a-stridavy-proud/">Elektromagnetická indukce a střídavý proud</a></h3>`
   `<ul><li>elektromagnetická indukce; vznik střídavého proudu a alternátor; vlastnosti střídavého proudu</li></ul>`
   `<h3>📋 Klíčové vztahy</h3>`
   `<ul>`
   `<li>počet neutronů N = A − Z; vazebná energie E = m · c²</li>`
   `<li>záření α (jádra helia), β (rychlé elektrony), γ (elektromagnetické)</li>`
   `<li>střídavý proud v síti: 50 Hz, 230 V; frekvence f = 1 : T</li>`
   `</ul>`
   a `zapis` (ř. 2894–2908) sladit: `body` doplnit o jadernou fyziku a zdroje energie, `vzorec` nahradit `'N = A − Z      (odvozeně: A = N + Z,  Z = A − N)      E = m · c²      f = 1 : T'`, `jednotky` převzít doslova z výkladů 9/jadro-atomu a 9/vlastnosti-stridaveho-proudu. (Pokud učitel naopak trvá na pořadí celků na webu, patří oprava do časového plánu — tiché rozhodnutí ve prospěch jednoho zdroje je podle OBSAH-PRAVIDLA kap. 3 zakázané.)
2. ř. 2885 („… vlastnosti střídavého proudu; elektromotor; transformátor …") | Pořadí ve výčtu neodpovídá pořadí podtémat v datech: `pusobeni-pole-na-vodic-elektromotor` je PRVNÍ podtéma celku, ve shrnutí je uvedeno až čtvrté. | NÁVRH — ř. 2885: `<ul><li>elektromotor; elektromagnetická indukce; vznik střídavého proudu a alternátor; vlastnosti střídavého proudu; transformátor (U₂ : U₁ = N₂ : N₁)</li></ul>`

## 9/rocni-shrnuti — VERDIKT: NEPROŠLO (3)

NÁLEZY:
1. ř. 2928 („obnovitelné a neobnovitelné zdroje energie; sluneční soustava (8 planet, AU, světelný rok, Keplerovy zákony)") a ř. 2942 (tatáž mezera v `zapis.body`) | Z celku „Zdroje energie a vesmír" chybí celé podtéma `vesmir-a-galaxie` („Vesmír a jeho vznik, galaxie" — Hubbleův zákon, vznik vesmíru, hvězdy), přestože je na webu hotové a časový plán je má v červnu. Roční shrnutí tak nepokrývá ročník. | NÁVRH — ř. 2928: `<ul><li>obnovitelné a neobnovitelné zdroje energie; sluneční soustava (8 planet, AU, světelný rok, Keplerovy zákony); vesmír a jeho vznik, galaxie a Hubbleův zákon</li></ul>` ; ř. 2942: `'Jaderná fyzika popisuje jádro atomu, radioaktivitu a jadernou energii; závěr roku patří zdrojům energie, sluneční soustavě a vesmíru.',`
2. ř. 2929–2934 („📋 Klíčové vztahy a hodnoty") | Ze čtyř matematicky zapsaných vztahů ročníku je uveden jediný (transformátor); chybí `N = A − Z` a `E = m · c²` z výkladu 9/jadro-atomu, ačkoli položka o jádře atomu v přehledu je (ř. 2926). | NÁVRH — za ř. 2931 vložit `<li>počet neutronů N = A − Z; vazebná energie E = m · c²</li>` a `<li>frekvence f = 1 : T; síť 50 Hz a 230 V; výkon P = U · I</li>`
3. ř. 2934–2935 (`</ul>` a uzavírací backtick) | Odsazení o jeden tabulátor hlubší než okolní blok (`<ul>` na ř. 2930 má 6 tabulátorů, `</ul>` sedm) a za uzavíracím backtickem zůstal v šabloně přebytečný odsazený řádek — v ostatních pěti shrnutích je odsazení jednotné. Kosmetika dat, na vykreslení nemá vliv. | NÁVRH — ř. 2934 a 2935 přeodsadit na 6 tabulátorů, shodně s ř. 2930.

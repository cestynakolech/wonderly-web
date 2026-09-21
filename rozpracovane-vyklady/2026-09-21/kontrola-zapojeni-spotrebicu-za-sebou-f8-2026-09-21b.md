# Kontrola výkladu — zapojeni-spotrebicu-za-sebou (F8), 21. 9. 2026 (kolo b)

VERDIKT: PROŠLO S DROBNOSTMI

## Ověření 9 nálezů z předchozího kola — všech 9 zapracováno
1. „Všechny elektrony procházejí každou částí obvodu — zákon zachování toku." → vráceno (sekce Proud). ANO
2. „(zákon o úbytcích napětí)" u U = U₁ + U₂ → vráceno (sekce Napětí, 1. odrážka). ANO
3. Látka z PDF navíc → zařazen Ohmův zákon pro části obvodu (odrážka + klíč `zakon`), zbytek označen MIMO SCOPE. ANO
4. Odstavec „Vánoční žárovky" začíná vlastním tématem (nevýhoda), pomůcka až na konci. ANO
5./6. Přeměřeno strojově: žádný odstavec nemá přes 4 věty, žádná věta přes 20 slov. ANO
7. „motor" zmizel, v úvodu je „žárovka, konvice, pračka…" — shoda s PDF str. 1. ANO
8. Body zápisu telegraficky 5–8 slov, s indexy U₁/U₂, R₁/R₂. ANO
9. „Proud v obvodu pak vypočítáme z Ohmova zákona: I = U : R." je v hlavním textu (Celkový odpor). ANO

## Ověření fyziky (přepočítáno)
- Příklad 1: R₁=4 Ω, R₂=6 Ω, I=2 A → U₁=8 V, U₂=12 V, U=20 V; R=10 Ω, U=R·I=20 V. Sedí, vše celá čísla.
- Příklad 2: 3× 2 Ω, U=12 V → R=6 Ω, I=12:6=2 A, U₁=2·2=4 V, 4+4+4=12 V. Sedí, vše celá čísla.
- Tvrzení „celkový odpor je vždy větší než kterýkoli jednotlivý", poměr napětí = poměr odporů, proud se nedělí — souhlasí s PDF str. 2–5.
- ZAPIS je validní JSON, klíče v pořadí vzorec → jednotky → vzorecSlovy → zakon → body. Jednotky mají tvar „název — značíme X, jednotka Y (název)". h2 = 1, h3 = 5 (limit 7), žádný `<em>`, tisíce s mezerou („1 000 V").
- Z dosavadního bloku (`temata.ts`) nevypadl žádný bod zápisu, vzorec, jednotka ani převod.

## NÁLEZY
1. Sekce ZDROJE, „OPRAVENO (nález 7): příklad spotřebiče „motor" nahrazen" — a dále řádky „OPRAVENO (nález 1/2/3/4/5 a 6/9)", „OVĚŘENO (nález 8): body v ZAPIS už v této verzi…". Co je špatně: jsou to metakomentáře o průběhu opravy, ne věcné citace zdroje; do souboru, který se zapisuje k datům, nepatří (týž typ nálezu vedl k NEPROŠLO u `zavislost-odporu-na-vodici`). Co má být: ponechat jen věcnou citaci (PDF strana + doslovný úryvek / věta z dosavadního bloku), informaci „opraveno podle nálezu N" hlásit v odpovědi, ne v souboru.
2. ZDROJE, „MIMO SCOPE: obrázek „Na obrázku níže je zakreslen proud a napětí v sériovém obvodu" → PDF str. 3". Co je špatně: věta je v PDF až na straně 4 (je za patičkou „3/6"). Co má být: PDF str. 4.
3. ZDROJE, „MIMO SCOPE: „je-li obvod rozvětvený, proud se rozdělí do větví" → PDF str. 6". Co je špatně: odrážka je v PDF na straně 5 (v bloku POMŮCKY — Proud, před patičkou „5/6"); na str. 6 je až pomůcka pro napětí a odpor. Co má být: PDF str. 5.
4. OBSAH, úvodní odstavec „V sériovém obvodu jdou rezistory jeden za druhým". Co je špatně: proti dosavadnímu bloku vypadl dovětek s klíčovými slovy pro vyhledávání („jednoduché sériové zapojení je nejbasičtější typ elektrického obvodu", v h2 „— jednoduchý elektrický obvod"). Věcně nic nechybí, ale je to ztráta SEO textu z dosavadních dat — ať o ní exekutor ví, případně dodatek vrátí do úvodního odstavce (h2 zůstává podle kontraktu z pole `nazev`).
5. OBSAH, úvod — z PDF str. 1 nebyla zařazena ani označena MIMO SCOPE věta „Každý elektrický spotřebič má vlastní odpor." Co má být: buď jednu větu doplnit do úvodu (vysvětluje, proč se spotřebiče nahrazují rezistory), nebo ji v ZDROJE uvést jako MIMO SCOPE.

Závěr: fyzika, výpočty, úplnost proti dosavadnímu bloku i jazyková měřítka jsou v pořádku; nálezy 1–3 jsou v sekci ZDROJE (formální), 4–5 drobné doplnění. Před zápisem do `temata.ts` stačí vyčistit ZDROJE.

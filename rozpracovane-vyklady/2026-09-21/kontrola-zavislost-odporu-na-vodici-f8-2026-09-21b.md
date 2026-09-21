# Nezávislá kontrola (2. kolo) — vyklad-zavislost-odporu-na-vodici-f8.md

VERDIKT: PROŠLO S DROBNOSTMI

Ověřeno strojově: JSON v ZAPIS validní; 1× h2, 5× h3 (limit 7), žádný `<em>`;
ŽÁDNÁ věta nad 20 slov a ŽÁDNÝ odstavec nad 4 věty (jediný „nález" měřidla —
věta o tabulce ρ — má 17 skutečných slov, zbytek jsou značky a čísla).
Přepočty: 0,50 · 100 : 5 = 10 Ω; 22 · 1 : 1,1 = 20 m; 0,018 Ω·mm²/m = 1,8·10⁻⁸ Ω·m
= 0,000 000 018 Ω·m — vše sedí. Zdroj: PDF „Závislost elektrického odporu na
vlastnostech vodiče (nad rámec RVP)" (SmartBooks, 5 stran, text 4 strany).
Dosavadní blok `fyzika/8-rocnik/elektrina/zavislost-odporu-na-vodici` vypsán přes
`podtema.mjs` — NIC nevypadlo (4 závislosti včetně teploty, S = π·r², R = ρ·l/S,
základní jednotky, odstavec o Ω·mm²/m i s tabulkou měď/hliník/konstantan/nichrom
a s větou o nichromové spirále, rezistor + barevné proužky + regulace proudu,
všechny odvozené vztahy i převody v `zapis`).

Nálezy z 1. kola — VŠECHNY ZAPRACOVÁNY:
- odstavce nad 4 věty: žádný (měřeno strojově);
- věty nad 20 slov: žádná;
- „Délku vodiče značíme l a měříme v metrech (m)." je v h3 „Délka a tloušťka vodiče“,
  v ZAPIS.jednotky „délka vodiče — značíme l, jednotka m (metr)";
- metakomentáře v ZDROJE: pryč — zůstaly jen věcné doklady, povinné hlášení rozporu
  a označení „VLASTNÍ PŘÍKLAD" (obojí kontrakt výslovně žádá).

## NÁLEZY

1. ZAPIS.jednotky — „měrný odpor (rezistivita) — značíme ρ, jednotka Ω·m (ohmmetr)".
   Název jednotky „ohmmetr" je sice správný, ale v sousedním podtématu (`ohmuv-zakon`,
   tentýž ročník) je „ohmmetr" PŘÍSTROJ na měření odporu. Žák 8. ročníku potká totéž
   slovo ve dvou významech bez varování. MÁ BÝT: „jednotka Ω·m (ohm metr — pozor, není to
   měřicí přístroj ohmmetr)", nebo jednotku nechat jen značkou Ω·m. (Formulace pochází
   z dosavadního bloku webu, takže nejde o novou chybu — ale stojí za srovnání obou
   podtémat naráz.)

2. OBSAH, h3 „Pro zvídavé: počítáme" — „Topná spirála je z konstantanu … má délku 100 m
   a průřez 5 mm²". Rozměry nejsou reálné: konstantanový drát 100 m × 5 mm² váží přes
   4 kg a do vařiče se nevejde; pravidlo o logické scéně pro děti platí i pro slovní
   příklady. MÁ BÝT: buď drát/odporový vodič místo „topné spirály", nebo rozumné rozměry
   (např. l = 10 m, S = 1 mm² → R = 5 Ω; výsledek zůstane celý). Výpočet sám je správně.

3. OBSAH, h3 „Materiál a teplota vodiče" — „Nejmenší měrný odpor mají nejlepší vodiče —
   stříbro, měď, zlato a hliník." PDF str. 3 má POŘADÍ JINÉ: „měď, zlato, stříbro, hliník".
   Odchylka je v ZDROJE ohlášena a pořadí ve výkladu odpovídá skutečným hodnotám
   (Ag 1,6 < Cu 1,7 < Au 2,4 < Al 2,7 µΩ·cm), takže věcnou vadu nehlásím — jen upozorňuji,
   že podle měřítka „platí PDF" jde o otevřenou otázku K ROZHODNUTÍ UČITELE (PDF str. 3).

4. OBSAH, h3 „Materiál a teplota vodiče" — „tím víc atomy v mřížce kmitají". Závislost na
   teplotě v tomto PDF NENÍ (končí str. 4 teaserem), opora je jen v dosavadním bloku webu
   a v podtématu `elektricky-proud-v-kovech-odpor` (tam je „mřížky" také) — ZDROJE to
   správně přiznávají. Bez opravy, jen k vědomí: pojem „mřížka" se v tomto výkladu
   nevysvětluje, spoléhá se na předchozí podtéma.

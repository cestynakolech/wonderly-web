# Nezávislá kontrola (2. kolo) — vyklad-ohmuv-zakon-f8.md

VERDIKT: PROŠLO S DROBNOSTMI

Ověřeno strojově: JSON v ZAPIS validní; 1× h2, 6× h3 (limit 7), žádný `<em>`;
žádný odstavec nad 4 věty. Přepočty: 10 : 0,2 = 50 Ω; 10 : 0,1 = 100 Ω; 12 : 6 = 2 A;
4 · 3 = 12 V — vše sedí, všechny výsledky celé. Zdroj: PDF „Ohmův zákon" (SmartBooks,
6 stran) včetně OBRÁZKŮ (stránky vykresleny do PNG a prohlédnuty: str. 2 = schéma obvodu
se žárovkou, V a A; str. 5 = graf I (mA) na U (V), dvě přímky z počátku, bubliny
„Lepší vodič R = 10 V : 0,2 A = 50 Ω" a „Horší vodič R = 10 V : 0,05 A = 200 Ω").
Dosavadní blok `fyzika/8-rocnik/elektrina/ohmuv-zakon` vypsán přes `podtema.mjs` —
NIC nevypadlo (úvod 1826/Ohm, znění, tři vzorce, nepřímé měření + ohmmetr, „větší odpor →
menší proud", příklad 50 Ω/100 Ω, stálá teplota, konstantan; `zapis.zakon`, `vzorec`,
všechny 4 body i převody zachovány).

Nálezy z 1. kola — VŠECHNY ZAPRACOVÁNY:
- `ZAPIS.zakon` nese „… a nepřímo úměrný elektrickému odporu R";
- `ZAPIS.jednotky` má doplněno „1 mΩ = 0,001 Ω" (PDF str. 4);
- věta o rezistorech z PDF str. 6 je v OBSAH („Ve výpočtech proto se spotřebiči počítáme
  jako s rezistory s danou hodnotou odporu.");
- U a I jsou v hlavním textu vysvětleny i s názvy jednotek (h3 „Pokus…": proud I
  v ampérech (A), napětí U ve voltech (V));
- dlouhé věty rozděleny — zbyla jediná hraniční, viz nález 4.

## NÁLEZY

1. OBSAH, h3 „Znění zákona" — „Čím větší odpor vodič má, tím méně je ochoten napětí měnit
   v proud." Formulace je věcně zavádějící: napětí se v proud „nemění", nejde o přeměnu
   veličin (ani takovou větu podklad nemá — PDF str. 3 říká jen „při stejném napětí platí,
   že čím větší je odpor vodiče, tím menší je proud"). MÁ BÝT: „Čím větší odpor vodič má,
   tím menší proud jím při stejném napětí prochází." (PDF str. 4).

2. OBSAH, h3 „Znění zákona" — „Konstantou této úměrnosti je fyzikální veličina elektrický
   odpor R." Ve vztahu I = U : R je konstantou úměrnosti 1 : R, ne R samotné (R je konstanta
   úměrnosti v U = R · I). Formulace je doslovně převzatá z PDF str. 3 i z dosavadního bloku,
   takže NEJDE o vadu návrhu — ale je to nepřesnost podkladu, kterou má podle pravidla
   o tichých opravách vidět učitel. Nejjednodušší náprava: větu vázat na tvar U = R · I.

3. OBSAH, h3 „Pro zvídavé: počítáme" — „Horší vodič propustí při stejném napětí 10 V jen
   proud 0,1 A: R = 10 : 0,1 = 100 Ω". PDF str. 5 (graf) má pro „horší vodič" hodnoty
   10 V : 0,05 A = 200 Ω. Rozpor je v ZDROJE ohlášen a dosavadní číslo webu bylo podle
   kontraktu ponecháno; podle měřítka „kde se web a PDF liší, platí PDF" jde ale o otázku
   K ROZHODNUTÍ UČITELE. Obě varianty jsou početně správné (10 : 0,05 = 200).

4. OBSAH, h3 „Pro zvídavé: počítáme" — táž věta má 22 tokenů (čistého textu ~14 slov,
   zbytek je vzorec vložený doprostřed věty). Hraniční překročení limitu ~20 slov. MÁ BÝT:
   rozdělit na „Horší vodič propustí při stejném napětí jen 0,1 A." + samostatný řádek
   „R = 10 : 0,1 = 100 Ω — poloviční proud znamená dvojnásobný odpor." (stejně jako
   u ostatních výpočtů výš).

5. ZDROJE, ř. 58, 61, 64, 70 a 72 — pětkrát „(nález kontroly 21. 9. 2026)", ř. 72 je celá
   jen o průběhu oprav („Tři dlouhé věty … rozděleny na kratší věty"). Metakomentář
   o kontrolním kole do souboru nepatří, ZDROJE mají nést jen věcné doložení (totéž bylo
   v 1. kole vytknuto souboru `vyklad-zavislost-odporu-na-vodici-f8.md`, kde je to už
   opravené). MÁ BÝT: ponechat věcnou část citací (PDF str. 2, 3, 4, 6), zmínky o kole
   kontroly a ř. 72 celou vypustit.

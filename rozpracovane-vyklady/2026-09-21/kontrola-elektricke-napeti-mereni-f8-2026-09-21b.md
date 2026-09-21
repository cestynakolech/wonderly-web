# Nezávislá kontrola (2. kolo) — vyklad-elektricke-napeti-mereni-f8.md

VERDIKT: PROŠLO S DROBNOSTMI

Ověřeno strojově: JSON v ZAPIS validní; 1× h2, 5× h3 (limit 7), žádný `<em>`;
žádná věta nad 20 slov, žádný odstavec nad 4 věty; čísla od tisíce s mezerou
(1 000 V, 1 000 000 V). Přepočet: 3 × 1,5 = 4,5 V; 4 × 1,5 = 6 V — oba sedí.
Zdroj: PDF „24. Elektrické napětí a jeho měření v obvodu" (SmartBooks, 8 stran,
text 6 stran + teaser). Dosavadní blok `fyzika/8-rocnik/elektrina/elektricke-napeti-mereni`
vypsán přes `podtema.mjs` — NIC z něj nevypadlo (230 V, 1,5 V, 4,5 V, 12 V, USB-C ~5–20 V,
sčítání napětí, orientace baterií, voltmetr paralelně, mimo hlavní obvod, nastavení
druhu a rozsahu, + na +, multimetr; všechny 4 body dosavadního `zapis` pokryty).

Nálezy z 1. kola — OBOJÍ ZAPRACOVÁNO:
- věta o ručkovém voltmetru, který se přepólováním poškodí, je z OBSAH pryč (ověřeno grepem);
- `ZAPIS.body` má „plochá baterie: 3× 1,5 V = 4,5 V" i s výsledkem.

## NÁLEZY

1. ZDROJE, ř. 63 a 65 — „VYPUŠTĚNA dle nálezu kontroly 21. 9. 2026", „OPRAVA (nález
   kontroly 21. 9. 2026): ZAPIS.body bod …". Metakomentář o průběhu kontroly nepatří do
   souboru — sekce ZDROJE má nést jen věcné citace a doložení (totéž bylo v 1. kole
   vytknuto souboru `vyklad-zavislost-odporu-na-vodici-f8.md`). MÁ BÝT: ponechat jen
   věcnou část („Věta o ručkovém voltmetru nemá oporu v PDF ani v dosavadním bloku" /
   „4,5 V doloženo PDF str. 2"), zmínky o kole kontroly škrtnout.

2. ZAPIS.body — „sériově za sebou: napětí se sčítá". Slovo „sériově" se v celém OBSAH
   nevyskytuje ani není nikde vysvětleno; žák ho v zápisu potká poprvé. Pravidlo: cizí
   slovo jen s vysvětlením. MÁ BÝT: buď „za sebou (sériově): napětí se sčítá" s vysvětlením
   v textu, nebo jen „za sebou: napětí se sčítá". (Pozn.: „paralelně" je v OBSAH vysvětleno
   „— vedle spotřebiče", to je v pořádku.)

3. OBSAH, h3 „Kde se s napětím setkáváme" — „nabíjení mobilu a notebooku přes USB-C kabel
   bývá zhruba 5 až 20 V". PDF str. 1 uvádí jen „20 V, …"; rozsah 5–20 V pochází z
   dosavadního bloku webu. Rozpor je v ZDROJE poctivě ohlášen a hodnota je věcně správná
   (USB-C PD 5 V až 20 V), takže věcnou vadu nehlásím — ale podle měřítka „kde se web a PDF
   liší, platí PDF" to zůstává otevřená otázka K ROZHODNUTÍ UČITELE (PDF str. 1).

4. OBSAH, h3 „Zapojení více zdrojů za sebou" — „se v obvodu zvýší nejen napětí, ale i
   proud". Doslovná opora v PDF str. 3 existuje, takže nejde o vadu návrhu; upozorňuji jen,
   že tvrzení platí při nezměněném odporu obvodu (I = U : R). Pro 8. ročník je to přijatelné
   zjednodušení, žádná oprava se nežádá.

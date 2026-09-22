# Nezávislá kontrola navržených odkazů — 22. 9. 2026

Metoda: `curl -L -A "Mozilla/5.0"` na všech 25 URL (HTTP kód + finální URL + `<html lang>` + title),
stažené HTML uloženo a text porovnán s polem `obsah` daného podtématu (`node podtema.mjs . get …`).
Duplicita proti `src/data/temata.ts` ověřena `grep -F` — **žádná z 25 URL v datech zatím není**.

## atmosfericky-tlak — SCHVÁLENO 3 / ZAMÍTNUTO 0
- https://cs.wikipedia.org/wiki/Atmosférický_tlak | VERDIKT: OK | 200 | lang=cs — obsahuje „101 325", „Torricel", „barometr", „aneroid", „barograf", „s rostoucí výškou klesá"
- https://www.skolasnadhledem.cz/game/3913 | VERDIKT: OK | 200 | lang=cs — obsah je za JS, posouzeno podle title „Atmosférický tlak"; stránka zařazena pod `rocnik/1194-plyny` (sedí na 7. r.)
- https://www.umimefakta.cz/fyzika/cviceni-atmosfericky-tlak | VERDIKT: OK | 200 | lang=cs — shrnutí + Rozhodovačka, text: „čím výše se nacházíme, tím nižší atmosférický tlak", „101 325 Pa", „hPa"
  - pozn.: značka webu je dnes „Umíme to" (doména zůstává umimefakta.cz) → název odkazu raději „Umíme to — …"

## pretlak-podtlak-vakuum — SCHVÁLENO 3 / ZAMÍTNUTO 0
- https://cs.wikipedia.org/wiki/Měření_tlaku | VERDIKT: OK | 200 | lang=cs — doslova „přetlak (p př > p b) nebo podtlak (p po < p b)", „absolutní vakuum", Bourdonova trubice
- https://www.skolasnadhledem.cz/game/3918 | VERDIKT: OK | 200 | lang=cs — za JS, title „Přetlak, podtlak, vakuum", `rocnik/1194-plyny`
- https://www.eductify.com/cs/fyzika/32/tlak/p-ppv/vakuum | VERDIKT: OK | 200 | lang=cs — volně přístupné, bez paywallu; obsahuje stříkačku, brčko, kompresor, vakuum, potápěče, Torricelliho pokus i „Spustit test"
  - pozn. 1: web je vícejazyčný (přepínač CS/EN/DE…), ale odkazovaná URL má `/cs/` a je celá česky — pravidlo „odkazy jen česky" splněno
  - pozn. 2: na stránce je překlep zdroje („ve slánce podtlak" místo „ve slámce"); věcnosti to nevadí

## meteorologie-a-mereni-tlaku — SCHVÁLENO 3 / ZAMÍTNUTO 0
- https://www.chmi.cz/predpoved-pocasi/meteorologicka-terminologie | VERDIKT: OK | 200 | lang=cs-CZ — oficiální ČHMÚ
- https://cs.wikipedia.org/wiki/Anemometr | VERDIKT: OK | 200 | lang=cs — OVĚŘENO: výklad slova „anemometr" I „anemograf" v `obsah` podtématu skutečně obsahuje (sekce Meteorologické přístroje), tvrzení navrhovatele sedí
- https://www.skolasnadhledem.cz/game/3915 | VERDIKT: OK | 200 | lang=cs — za JS, title „Atmosféra a meteorologie"

## kmitani-a-vlneni — SCHVÁLENO 4 / ZAMÍTNUTO 0
- http://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/kmitani | VERDIKT: OK | 200 | lang=cs — „rovnovážné polohy", „periodický"
- http://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vlneni | VERDIKT: OK | 200 | lang=cs — „vhodíme-li na klidnou vodní hladinu rybníka kámen"
- https://cs.wikipedia.org/wiki/Vlnov%C3%A1_d%C3%A9lka | VERDIKT: OK | 200 | lang=cs
- https://www.umimefakta.cz/fyzika/cviceni-vlneni-pojmy-8-trida | VERDIKT: OK | 200 | lang=cs — Rozhodovačka lehká/střední/těžká, pojmy f, T, λ, v
  - VÝHRADA (drobná): shrnutí na té stránce tvrdí „skutečné vlny na vodě — ani jedno (ani příčné, ani podélné)", kdežto náš výklad řadí vlny na hladině mezi PŘÍČNÉ. Odkaz tedy výkladu v jednom bodě odporuje — buď to učitel zmíní, nebo se odkaz vynechá.
- ⚠ FORMA: oba odkazy Techmania jsou zapsané jako `http://` (bez TLS; server na https odpovídá 200 bez přesměrování). V `temata.ts` je zavedený tvar `https://edu.techmania.cz/cs/…` (7 existujících záznamů) → před zápisem přepsat na `https://`.

## zvuk-vznik-a-sireni — SCHVÁLENO 4 / ZAMÍTNUTO 0
- https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vznik-druhy-zvuku | VERDIKT: OK | 200 | lang=cs
- http://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/sireni-zvuku | VERDIKT: OK | 200 | lang=cs — „ve vzduchoprázdnu se zvuk nešíří"
- http://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/ozvena-dozvuk | VERDIKT: OK | 200 | lang=cs — „alespoň 0,1 s", „minimálně 17 m" = přesně čísla z výkladu
- http://edu.techmania.cz/encyklopedie/fyzika/akustika/vyska-zvuku | VERDIKT: OK | 200 | lang=cs — „od 16 Hz do 16 kHz"
  - ⚠ FORMA: v této URL CHYBÍ jazykový segment `/cs/` (jako jediná ze sedmi). Ověřeno, že funguje i kanonický tvar `https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/vyska-zvuku` → 200, 0 přesměrování. Zapsat kanonický tvar.
- ⚠ FORMA: 3 ze 4 odkazů `http://` → přepsat na `https://` (viz výše).

## vnimani-zvuku-a-hlasitost — SCHVÁLENO 4 / ZAMÍTNUTO 0
- https://www.nzip.cz/clanek/1507-ucho-sluch-rovnovaha | VERDIKT: OK | 200 | lang=cs — obsahuje boltec, zvukovod, bubínek, kladívko, třmínek, hlemýžď, vláskové buňky (slovo „kovadlinka" na stránce není, jinak sedí)
- http://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/intenzita-zvuku | VERDIKT: OK | 200 | lang=cs — „práh slyšení 0 dB", „Práh bolesti 130 dB" = shodné s výkladem, plus tabulka hlasitostí
  - VÝHRADA (drobná): stránka má vlastní chybu — „p0 … 20 mPa" místo 20 µPa (o tři řády vedle; o pár řádků výš tatáž stránka uvádí správně 10⁻⁵ Pa) a překlep „decibell". Výkladu to neodporuje, ale žák to tam najde. Úroveň textu (logaritmus, 10¹²) je nad 8. ročník — odkaz je rozšiřující.
- https://www.nzip.cz/clanek/1046-ochrana-zdravi-pred-hlukem | VERDIKT: OK | 200 | lang=cs — SZÚ, zásady ochrany sluchu vč. sluchátek
- https://www.nzip.cz/clanek/1045-zdravotni-ucinky-hluku | VERDIKT: OK | 200 | lang=cs — SZÚ, sluch + psychické i fyzické dopady
- ⚠ FORMA: 1 odkaz `http://` → přepsat na `https://`.

## slunecni-soustava — SCHVÁLENO 2 / ZAMÍTNUTO 2
- https://planety.astro.cz/soustava/1864-slunecni-soustava | VERDIKT: OK | 200 | lang=NONE (atribut `lang` chybí, ale `charset=utf-8` a text je celý česky) — pokrývá Slunce, 8 planet, trpasličí planety, planetky, komety, Kuiperův pás
  - pozn.: text je zastaralý v jednom detailu („Eris je dokonce větší než Pluto" — dnešní měření dávají Eris menší poloměr, jen větší hmotnost). Ve výkladu se to netvrdí, takže to nic nekazí, ale učitel o tom má vědět.
- https://cs.wikipedia.org/wiki/Slune%C4%8Dn%C3%AD_soustava | VERDIKT: OK | 200 | lang=cs
- https://www.umimefakta.cz/fyzika/book/cviceni-keplerovy-zakony | VERDIKT: ZAMÍTNOUT (důvod: mimo téma/úroveň — popis nesedí) | 200 | lang=cs
  - DŮKAZ: stránka se sama představuje slovy „Prohlížíte si **shrnutí** informací k určitým tématům… Ke cvičením k jednotlivým podtématům se dostanete pomocí odkazů níže." Není to tedy „sada cvičení (rozhodovačka, pexeso, vpisování)", jak tvrdí návrh — na stránce není ANI JEDEN blok cvičení.
  - DŮKAZ 2 (úroveň): text je středoškolský — „S = v·r·sin α = konst.", „průvodič", „perihélium/afélium", „málo výstředné elipsy". To je nad 9. ročník ZŠ.
  - NÁHRADA (ověřeno curl): `https://www.umimefakta.cz/fyzika/cviceni-keplerovy-zakony` → HTTP 200. Tohle je skutečná stránka s cvičeními a odpovídá popisu, který návrh použil.
- https://wordwall.net/cs/resource/37832364/planety-slune%C4%8Dn%C3%AD-soustavy | VERDIKT: ZAMÍTNOUT (důvod: Wordwall nepokrývá + obtížnost mimo ročník) | 200 | lang=cs
  - DŮKAZ 1 (ročník): kvíz je na Wordwallu označený autorem jako „**4. tř. VL**" (4. třída, vlastivěda). Cíl je 9. ročník fyziky.
  - DŮKAZ 2 (testuje, co není ve výkladu — OBSAH-PRAVIDLA § 9 bod 3): otázky „Jak se nazývá myšlené spojení severního a jižního pólu naší Země? … Zemská osa" a „Kdy je přestupný rok? 29.2." s látkou podtématu vůbec nesouvisí.
  - DŮKAZ 3 (rozpor s výkladem): otázka „Kolik stupňů Celsia je teplota na Venuši?" nabízí 200/500/100/1 000/5 000 — správná odpověď tam musí být 500 °C, kdežto náš výklad uvádí **asi 460 °C**. Žák by dostal jiné číslo než na stránce.
  - Dohromady 17 otázek, převážně typu „Má Slunce gravitační sílu? ano/ne" — úroveň 1. stupně.

---

## Celkem
| podtéma | schváleno | zamítnuto |
|---|---|---|
| atmosfericky-tlak | 3 | 0 |
| pretlak-podtlak-vakuum | 3 | 0 |
| meteorologie-a-mereni-tlaku | 3 | 0 |
| kmitani-a-vlneni | 4 | 0 |
| zvuk-vznik-a-sireni | 4 | 0 |
| vnimani-zvuku-a-hlasitost | 4 | 0 |
| slunecni-soustava | 2 | 2 |
| **součet** | **23** | **2** |

Zákazy podle `OBSAH-PRAVIDLA.md` § 9: žádný z 25 odkazů není video ani YouTube, žádný není
SmartBooks ani jiný placený obsah, žádný není anglický ani slovenský, nikde není reklama na hazard.

## TVAR PRO ZÁPIS

Typ v `src/data/temata.ts` (ř. 22–23) je `odkazy?: { nazev: string; url: string }[]` —
**povinné jsou jen `nazev` a `url`. Pole `popis`, `typ` ani `ověřeno` typ NEZNÁ**, z návrhových
souborů se tedy zahazují (popis slouží jen ke kontrole). Vzor převzatý z bloku `vesmir-a-galaxie`
(ř. 3135–3138) — odsazení tabulátory, jednoduché uvozovky, koncová čárka za posledním prvkem:

```ts
				odkazy: [
					{ nazev: 'Techmania: Ozvěna a dozvuk', url: 'https://edu.techmania.cz/cs/encyklopedie/fyzika/akustika/ozvena-dozvuk' },
				],
```

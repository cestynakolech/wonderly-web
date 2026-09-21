# Nezávislá kontrola: vyklad-ucinky-proudu-a-bezpecnost-f8.md (21. 9. 2026, kolo b)

Podklad: "/Users/Shared/Škola/8/5 Elektřina /32 Účinky proudu na lidský organismus. Bezpečnost práce s elektrickými zařízeními/32.  …pdf" (5 stran, pdftotext).
Dosavadní blok: `node podtema.mjs . get fyzika/8-rocnik/elektrina/ucinky-proudu-a-bezpecnost`.

VERDIKT: NEPROŠLO

NÁLEZY:

1. **Devět vět přes 20 slov** (kontrakt, požadavek C: věty do ~20 slov; u sousedních podtémat to byl důvod NEPROŠLO):
   - „Co velikost proudu ovlivňuje": „Od zhruba 50 V se kůže prorazí a odpor těla klesne na ~2000 Ω, ať jsi suchý nebo mokrý; …" — **38 slov**
   - tamtéž: „odpor člověka: velký odpor má jen suchá kůže a suchá obuv při malém napětí (~150 000 Ω) — proto z baterie nic necítíš." — 22 slov
   - tamtéž: „V suchých místnostech jsou meze vyšší (střídavé 50 V, stejnosměrné 120 V) — zásuvkových 230 V se to ale netýká nikde…" — 24 slov
   - „Jistič vás nezachrání…": „Pozor — chránič není důvod si dovolit víc: zásuvka v koupelně je přípustná jen mimo prostor vany a sprchy…" — 27 slov
   - „Rizika mimo domácí zásuvku": „⚠️ Spadlý drát na zemi (i u trolejového vedení vlaků) se chová stejně — …" — 22 slov
   - „První pomoc…", bod 2: „⚠️ Jde-li o vysoké napětí (sloup, trafostanice, spadlý drát, trolejové vedení) — nepřibližuj se a nic neodsouvej…" — 22 slov
   - tamtéž: „Jde-li o běžnou domácí elektřinu (zásuvka, spotřebič) a proud vypnout nejde, odsuň zraněného suchou dřevěnou nebo plastovou tyčí…" — 29 slov
   - „Pro zvídavé: počítáme": „Suchá kůže má sice velký odpor, ale jen do zhruba 50 V — při vyšším napětí se elektricky prorazí…" — 21 slov
   - tamtéž: „Zásuvka je životu nebezpečná vždycky, i když jsi úplně suchý — už nad ~50 V se totiž prorazí kůže i v suchu…" — 28 slov
   Věty se mají rozdělit; obsah se přitom nesmí vyřadit.

2. **Falešná citace PDF u klíčového tvrzení.** ZDROJE: „Odpor člověka (suchý ~150 000 Ω, po proražení kůže/mokrý ~2000 Ω), …
   bezpečné napětí ve vlhku 25 V/12 V, v suchu vyšší meze → dosavadní blok stejné věty + **PDF str. 2–3, shoda**."
   PDF slova „prorazí"/„50 V"/„suché místnosti"/„120 V" **vůbec neobsahuje** (ověřeno grepem celého textu PDF). PDF str. 2 má jen
   „Odpor člověka ve vlhku … asi 2000 ohmů, v suchu a suché obuvi asi 150 000 ohmů" a str. 3 „Nejvyšší bezpečná hodnota stejnosměrného
   napětí podle normy je 25 V a střídavého napětí 12 V" — bez rozlišení vlhkých a suchých prostor.
   Tvrzení o proražení kůže nad 50 V a o mezích 50 V/120 V v suchu tedy stojí jen na dosavadním webu; ponechat je lze (nic se nevyřazuje),
   ale citace „PDF str. 2–3, shoda" je nepravdivá a musí být přepsána na doslovné znění PDF + poznámku, že zbytek pochází z dosavadního bloku.

3. **Rozpor s PDF vydávaný za shodu — první pomoc.** ZDROJE: „První pomoc: … resuscitace → dosavadní blok + PDF str. 5, **shoda**."
   PDF str. 5 doslovně: „uvolníme mu oděv, **zkontrolujeme tep**, dech a v případě potřeby mu poskytneme **umělé dýchání** a masáž srdce."
   Výklad naopak říká: „Puls nehledej, jen ztrácíš čas" a umělé dýchání vůbec nezmiňuje. To není shoda, ale rozpor, a musí být v ZDROJE
   přiznán (rozhodnutí: platí PDF, tj. buď text uvést do souladu, nebo rozpor doložit).

4. **Metakomentář v souboru.** ZDROJE, odrážka „POZOR — rozpor přímo v PDF…": „…→ NAVRŽENO K DOPLNĚNÍ/OVĚŘENÍ, **k rozhodnutí učitele**."
   Poznámka „k rozhodnutí učitele" do souboru nepatří. Věcné jádro (PDF str. 2 má vedle sebe „Odpor kůže je za sucha kolem 2000 ohmů,
   ale za vlhka jen 1000 ohmů" a „Odpor člověka … v suchu … asi 150 000 ohmů") se má zapsat jako holá citace obou vět bez výzvy k rozhodnutí.

5. **Číslo bez mezery v tisících (5×).** „Co velikost proudu ovlivňuje" a „Pro zvídavé: počítáme": „~2000 Ω", „asi 2000 Ω", „R ≈ 2000 Ω",
   „230 : 2000". Kontrakt, požadavek C: čísla od tisíce s mezerou → **2 000 Ω** (v témže odstavci je správně „150 000 Ω", takže text
   je i vnitřně nejednotný).

6. **Látka z PDF vynechaná a neoznačená jako MIMO SCOPE** (kontrakt: nezařazená nová látka ze zdroje se označuje):
   - str. 1: „Účinky elektrického proudu na organismus mohou být negativní (poškození zdraví) i **pozitivní (využitelné pro terapii)**"
   - str. 3: „**Napětí nižší než 1000 V** mají vliv na bioelektrickou rovnováhu tkání (mozek, nervy)" / „Vysoká napětí způsobují tepelná poškození"
   - str. 2: „**Suchá obuv** velmi zvyšuje odpor proti zemi, obzvlášť je-li z dobře izolujících materiálů, např. z gumy"
   - str. 5: „uvolníme mu oděv" a „umělé dýchání" (viz nález 3)
   V ZDROJE není ani jedna z těchto položek zmíněna.

7. **DROBNÉ — nejednoznačný bod zápisu.** ZAPIS, bod „bezpečné napětí: 25 V / 12 V". Z bodu nejde poznat, které je stejnosměrné a které
   střídavé; PDF str. 3 rozlišuje (stejnosměrné 25 V, střídavé 12 V). Má být např. „bezpečné napětí: stejnosměrné 25 V, střídavé 12 V".

8. **DROBNÉ — slovo nad ročník.** Úvod: „…a **pozdní**, **jež** se ukážou až za měsíce nebo roky." Knižní vztažné zájmeno „jež"
   nahradit („které se ukážou…"); cílový jazyk je dítě 9–10 let.

OVĚŘENO BEZ NÁLEZU:
- ZAPIS je validní JSON (`json.loads` prošlo), pořadí klíčů vzorec → jednotky → vzorecSlovy → zakon → body sedí; `zakon` i `vzorec`
  jsou doslova převzaté z dosavadního bloku.
- Z dosavadního bloku nevypadlo nic: celá tabulka mA, odpor člověka, cesta proudu, bezpečná napětí, jistič vs. chránič (16 A, 30 mA,
  koupelna), rizika mimo zásuvku (hašení, trafostanice, spadlý drát, 112/150/155), všechna bezpečná pravidla, všechny 4 kroky první pomoci
  i oba „👉" odstavce, celá výpočtová sekce (jen přesunutá na konec pod „Pro zvídavé: počítáme"). Přibyla pravidla z PDF str. 4 a guma z str. 5.
- Přepočty: 4,5 : 150 000 = 0,00003 A = 30 µA ✓; 230 : 2000 = 0,115 A = 115 mA ✓; 115 mA je skutečně nad hranicí 80 mA ✓;
  30 mA chrániče je pod 60 mA z tabulky ✓.
- Shoda s PDF str. 2 ověřena u: přímé/nepřímé, akutní/pozdní, stejnosměrný proud a nemožnost odtržení, střídavý proud a fibrilace,
  rozklad krve a membrán, poškození nervů/mozku/paměti, celá stupnice 0,5–1 / 1–8 / 6–15 / 25 / 60 / nad 80 mA; str. 3 cesta proudu a oblouk;
  str. 4 bezpečnostní pokyny.
- Jazyk: žádný `<em>`, 7 nadpisů h3 (limit 7, těsně), žádný odstavec nad 4 věty, „150 000 Ω" a „1 000 mA" správně s mezerou.

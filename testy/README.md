# Testy — ověřování bez prohlížeče

Proč to takhle: náhledový server bývá zabraný jinou session a `computer screenshot`
opakovaně vracel prázdné plátno. Hlavně ale platí, že **animaci nelze poctivě posoudit
okem** — v náhledové záložce se `requestAnimationFrame` nevolá vůbec. Tyhle skripty proto
spustí **skutečný `<script>` komponenty** v Node přes `node:vm` s náhradním DOM
a všechno proměří výpočtem. Je to tvrdší důkaz než pohled a stojí zlomek tokenů.

## Názornost stránek

```bash
node testy/nazornost.mjs fyzika/8
```

Vypíše podtémata, která nemají **ani obrázek, ani video, ani simulaci**, a souhrn po
ročnících. Bez argumentu projde celý web.

> **Past:** blok `elektrina` má v `temata.ts` o jeden tabulátor jiné odsazení než ostatní
> celky. Naivní regex `^\t{5}slug:` ho přeskočí a napočítá u fyziky 8 jen 22 podtémat
> místo 37. Skript proto používá `^\t{5,}`.

## Simulace

```bash
node testy/simulace/meridla.mjs      src/components/skola2/MeridlaSimulace.astro
node testy/simulace/odpor-vodice.mjs src/components/skola2/OdporVodiceSimulace.astro
node testy/simulace/reostat.mjs      src/components/skola2/ReostatSimulace.astro
```

Každý test končí kódem 1, když něco neprojde.

### Jak napsat test k nové simulaci

1. V komponentě vystav **čisté funkce** na SVG elementu — pohyb jako funkce času
   a fyziku jako funkci vstupů (vzor: `svg.__stavMeridel`, `svg.__odpor`, `svg.__reostat`).
   Bez toho se nedá nic poctivě změřit.
2. Zkopíruj nejbližší existující test a uprav v něm náhradní tlačítka
   v `document.querySelectorAll` podle tříd své simulace.
3. Vždy prověř aspoň tohle:
   - **spojitost pohybu** — projet celou animaci po 16 ms, největší skok pod 20 px
     (odmocninová a jiná nelineární mapování dělají skoky u krajů);
   - **objekty nesmí opustit svou dráhu** (tečky z drátu, elektrony z vodiče);
   - **každou kombinaci ovládání** — a že u každé je pro žáka vysvětlení;
   - **čísla, která žák uvidí** — celá, a součty musí sedět;
   - **simulace nesmí předbíhat učivo** — např. u měřidel se hlídá, že v textech není
     `I = U / R` ani hodnota v ohmech, protože Ohmův zákon přijde až o dvě podtémata dál.

### Co odhalil nezávislý kontrolor (drž to při psaní dalších simulací)

- **Animace musí souhlasit s textem.** U zkratu text tvrdil „proud žárovku obejde", ale
  tečky dál obíhaly skrz ni. Autor popíše, co zamýšlel, ne co je vidět — test na to je.
- **Simulace měření potřebuje v obvodu aspoň dvě součástky.** S jedinou se napětí na
  spotřebiči rovná napětí zdroje, takže správné i chybné měření voltmetrem ukáže totéž
  a úloha ztratí smysl.
- **Kontrolora neposlouchat slepě.** Navrhoval zvýšit zkratový proud na 8× kvůli
  názornosti, jenže při přemostění žárovky se proud přesně zdvojnásobí. Zůstala pravda.

# Testy — ověřování bez prohlížeče

Proč to takhle: náhledový server bývá zabraný jinou session a `computer screenshot`
opakovaně vracel prázdné plátno. Hlavně ale platí, že **animaci nelze poctivě posoudit
okem** — v náhledové záložce se `requestAnimationFrame` nevolá vůbec. Tyhle skripty proto
spustí **skutečný `<script>` komponenty** v Node přes `node:vm` s náhradním DOM
a všechno proměří výpočtem. Je to tvrdší důkaz než pohled a stojí zlomek tokenů.

## Kontroly čtou DATA, ne text souboru

`testy/data.mjs` přeloží `kvizy.ts` a `temata.ts` esbuildem a **naimportuje je jako
objekty**. Trvá to ~100 ms a kontroluje se přesně to, co uvidí web.

Proč to takhle je (nález nezávislého auditu 31. 7. 2026): dokud kontroly četly
TypeScript regulárními výrazy, **tiše lhaly**.

- `zkontroluj.mjs` hlásil **2084 otázek, ve skutečnosti jich je 2436** — 14 bloků
  shrnutí se skládá programově funkcí `slozSouhrnnyKviz`, takže je žádný vzor nad
  textem nevidí. Kontrola „ke každé otázce patří tři odpovědi" tak na stovkách
  otázek vůbec neběžela.
- `nazornost.mjs` hledal `druh: 'obrazek'` — ta hodnota se v datech **nevyskytuje ani
  jednou**, správně je `'infografika'`. Infografiky se proto nikdy nezapočítaly
  a skript hlásil falešné mezery (fyzika 7: hlásil 5, ve skutečnosti 2).
- Blok `elektrina` má v `temata.ts` o tabulátor jiné odsazení, takže naivní vzor
  `^\t{5}slug:` napočítal u fyziky 8 jen 22 podtémat místo 37.

**Pravidlo: novou kontrolu nad obsahem piš vždy nad `nactiData()`, nikdy nad textem
souboru.** Vzory nad textem si nech jen na kontrolu ZAPOJENÍ (import v `.astro`,
řádek s vykreslením, union typ) — tam je předmětem kontroly opravdu zdrojový kód.

Závislost: `esbuild` je součástí instalace Astro (`node_modules`), nic se nedoinstalovávalo.

## Názornost stránek

```bash
node testy/nazornost.mjs fyzika/8
```

Vypíše podtémata, která nemají **ani obrázek, ani video, ani simulaci**, a souhrn po
ročnících. Bez argumentu projde celý web.

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

### Tautologický test je horší než žádný

`ok(a !== b || true, '…')` hlásí ✅ za všech okolností. Takhle napsaná kontrola prošla
do `led-displej.mjs` (našel ji až nezávislý kontrolor) a při přepisu se tam omylem
objevila podruhé. Před odevzdáním testu:

```bash
grep -n "|| true" testy/simulace/*.mjs
```

Stejně zrádné je tvrzení, které se opírá o vlastnost, již náhradní DOM nemá.
`prikazyEl.textContent = ''` v prohlížeči smaže děti, v náhradním prvku ne — dokud
neměl `textContent` setter, hromadily se řádky programu a test měřil nesmysl.

### Co odhalil nezávislý kontrolor (drž to při psaní dalších simulací)

- **Zastavení animace nesmí změnit obraz.** U LED displeje skákal po stisku „zastavit"
  displej na obrázek, do kterého se KRESLÍ (6 → 16 svítících LED) — přesně proti větě,
  kterou si žák v tu chvíli četl. Testuj počet svítících prvků před zastavením a po něm.
- **Co doběhlo, nesmí nabízet „zastavit".** Program v bloku „po spuštění" zůstával
  formálně běžící, takže tlačítko nabízelo zastavit něco, co podle textu skončilo.

- **Animace musí souhlasit s textem.** U zkratu text tvrdil „proud žárovku obejde", ale
  tečky dál obíhaly skrz ni. Autor popíše, co zamýšlel, ne co je vidět — test na to je.
- **Simulace měření potřebuje v obvodu aspoň dvě součástky.** S jedinou se napětí na
  spotřebiči rovná napětí zdroje, takže správné i chybné měření voltmetrem ukáže totéž
  a úloha ztratí smysl.
- **Kontrolora neposlouchat slepě.** Navrhoval zvýšit zkratový proud na 8× kvůli
  názornosti, jenže při přemostění žárovky se proud přesně zdvojnásobí. Zůstala pravda.

# Návod: rozdělení infografiky na panely (pole `panely`)

Zavedeno pilotem 13. 10. 2026 (commit 2cdc33a, Mechanická práce 8. r.). Proč: úzké
svislé infografiky (460 px široké, ~2000 px vysoké) jsou na interaktivní tabuli malé
okénko. Panely se na stránce skládají do mřížky přes celou šířku sloupce a tlačítkem
„Zvětšit" jdou po jednom přes celou obrazovku.

## Kdy řezat

- Jen SVG infografiky, které už mají vnitřní bloky (`<g id="…">` s vlastním rámečkem
  `<rect rx="12">` a nadpisem font-size 25). Každý blok = jeden panel.
- 3–6 panelů. Blok je jedna myšlenka; neřezat uprostřed výkladu (např. „Kdy se práce
  nekoná?" 1.–3. zůstal jeden vyšší panel).
- JPG/PNG se neřežou (šablona je nechává na 34rem).

## Jak řezat (bez přepočtu souřadnic)

1. Zkopíruj hlavičku originálu, ale **změň jen viewBox + width/height** na rámeček bloku
   s okrajem 10 px: `viewBox="0 <y_rámečku-10> 460 <výška_rámečku+20>"`, `width="460"`,
   `height="<výška_rámečku+20>"`. Souřadnice uvnitř bloku se NEMĚNÍ.
2. Pozadí: `<rect x="0" y="<y_viewBoxu>" width="460" height="<výška_viewBoxu>" fill="#f8f9fa" />`.
3. `<style>`: jen třídy animací použité v bloku + jejich `@keyframes` +
   `@media (prefers-reduced-motion: reduce) { … animation: none; }` pro tytéž třídy.
4. `<defs>` (markery šipek) zkopírovat, pokud je blok používá (`marker-end`).
5. `<title>`: `<Téma> i/n: <nadpis bloku>` — šablona z něj bere popisek panelu
   (alt + aria-label „Zvětšit: …"). Každý panel musí mít vlastní nadpis uvnitř bloku.
6. `aria-label` na `<svg>`: obsah jen toho bloku (čísla beze změny z originálu).
7. Hlavní nadpis originálu (font-size 34 nahoře) do panelů NEPATŘÍ — název celku je
   v popisku pod mřížkou.

### Past: otáčení přes `transform-box: view-box`

Bloky s otáčením (`transform-origin: <x>px <y>px` + `transform-box: view-box`) fungují
i s posunutým viewBoxem — počátek je v uživatelských souřadnicích (0,0), ne v rohu
viewBoxu. Ověřeno v Chromiu: panel 4 mechanické práce na t = 0 má závaží na podlaze
v čárkované poloze. U každého nového panelu s otáčením totéž ověř snímkem na t = 0
(skript níže). NEPOUŽÍVAT `fill-box` — rámeček skupiny se při otáčení mění.

## Pojmenování

Vedle originálu (originál se nemaže, `cesta` na něj ukazuje dál):
`infografika-<podtema>-panel-1.svg`, `…-panel-2.svg`, … (pořadí shora dolů) — platí pro PRVNÍ infografiku stránky. Druhá infografika „… v pohybu“ (od 14. 10. 2026) má `infografika-<podtema>-pohyb-panel-N.svg`.

## Zápis do temata.ts (jen zapisovatel/exekutor)

K existující položce `{"druh":"infografika", … "cesta":"…/infografika-<podtema>.svg"}`
přidat `"panely":["…/infografika-<podtema>-panel-1.svg", …]` (absolutní cesty od `/materialy/`).
Typ: `Material.panely?: string[]` (src/data/temata.ts).

## Co dělá šablona (src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro)

- `panely` → `figure.infografika-panelova` > `.infografika-mrizka` (grid
  `repeat(auto-fit, minmax(min(100%, 22rem), 1fr))`), každý panel je `<button>`
  (klik/Enter otevře lupu na tom panelu) + tlačítko „⛶ Zvětšit" v popisku.
- Lupa = `<dialog>` (Esc nativně, fokus uvnitř, po zavření fokus zpět), šipky ←/→,
  tažení prstem, ⛶ celá obrazovka (na šířce ≥ 900 px se zapne sama). Celou obrazovku
  dostává `.lupa-obal` uvnitř dialogu — `<dialog>` fullscreen být nesmí a fullscreen
  `<html>` by se v top-layer položil nad dialog.
- Infografiky bez `panely`: beze změny; jen SVG (`img.je-svg`) má šířku sloupce místo 34rem.

## Ověření (po každém novém panelování)

1. `npm run build` + `npm test` rc=0.
2. Snímky: `node /private/tmp/panely/svgtest.mjs` (panely na t = 0 / t = 2500 ms) a
   `node /private/tmp/panely/strana.mjs` (náhled `python3 -m http.server 4329` v dist,
   šířky 375/1280/1920, lupa, šipky, Esc) — upravit URL a názvy souborů.
   Pozn.: přímý `page.goto` na .svg soubor v headless Chromiu visí → SVG vkládat inline.
3. Prohlédnout: telefon 1 sloupec čitelný, 1920 velké panely, lupa co největší.

## Poučení 14.–15. 10. 2026

Výroba infografik „… v pohybu“ (31 nasazeno). Polovina panelů byla napoprvé zamítnuta.

1. **Nejčastější zamítnutí = zdvojení.** Před výrobou stáhnout obr-* stránky, zjistit, které jsou ANIMOVANÉ (`<animate>`, `@keyframes`) a jaký děj ukazují, plus simulace a videa. Panel smí ukázat jen děj, který stránka nemá. Zdvojující panel se VYŘADÍ (přesune vyráběcí worker u panelů Clauda: mv do /Users/Shared/Omega/predavka/vyrazene-panely/<datum>-Wxx/, nic se nemaže; panely Codexu Claude jen nepřevezme – Codexovy soubory v Omeze zůstávají), neopravuje se.
2. **Fyzikální realismus.** Hladina kapaliny vždy vodorovná (i při náklonu – clipPath). Nic se nevznáší: těleso hustší než voda leží na dně nebo visí na provázku vedoucím k ruce. Měřítko sedí s objemem/hmotností (kádinka pojme nalitý objem; pytel 100 kg neexistuje → 4 × 25 kg). Nástroje a anatomie podle předlohy z PDF/obr-* (ucho převzít z obr-01, mikrometr dle fotky v PDF). Smyčec napříč strunou.
3. **Jednotnost.** Barvy/tvary/značky stejně jako obr-* téže stránky a nasazené panely tématu (tyrkys = napětí, barvu elektronu nepoužít na nic jiného, hvězda štěpení žlutá + obrys #c92a2a). Značky (např. póly N/S) vždy ověřit v PDF učitele, NE „opravovat“ podle dojmu.
4. **Text nesmí předbíhat děj ani zůstat po jeho skončení** – vzorkovat celý cyklus (po 25–100 ms).
5. **Kontrast:** text ≥ 4,5:1, značky nesoucí význam ≥ 3:1 (i paprsky, šipky, obrysy, oblaky).
6. **Název souboru** vždy `…-pohyb-panel-N.svg`; jednopanelová infografika bez „1/2“ v titulku.
7. **Opora:** PDF nebo výklad. Odečet měření smí být desetinné číslo (0,06 mm; výjimka učitele 4. 10. 2026, `wonderly-web/OBSAH-PRAVIDLA.md` § 8 „Celá čísla“), výpočty a příklady jen celá čísla. Co nemá oporu, nekreslit (vynechat i „logický důsledek“, pokud ho kontrolor neuzná).
8. **Bezpečnost:** žádné návody k nebezpečným pokusům (lupa nezapaluje papír; varování „nedívej se do Slunce“).
9. **Postup:** výroba → kontrola (čerstvý kontext) → opravy → jediný zapisovatel temata.ts → kontrola commitu na čisté kopii (`git clone --local`, build + `npm test`) → push přesného hashe → ověření `curl ?x=` + shasum. Čekací smyčky psát v BASHI (zsh smyčka hlásí falešné nuly).
10. **Pravidlo 3 pokusů platí i pro panely:** po 3. zamítnutí změnit přístup (převzít kresbu z obr-*, přepočítat poměr, vyřadit panel, převzít Codexův panel a dokončit sám).
11. **Klidový stav (`prefers-reduced-motion`)** – audit 18. 10. 2026 (T4, 28 protokolů): při vypnuté animaci musí panel zůstat ÚPLNÝ a odpovídat popisku/alt (spínač sepnutý jen tehdy, když to říká popisek; skříňka nesmí zůstat nakloněná; všechny texty viditelné). Worker i kontrolor vykreslí panel s `--force-prefers-reduced-motion` a prohlédnou ho.
12. **Žádná naměřená čísla v komentářích** (audit 18. 10., T8, 16 protokolů): komentář v SVG/komponentě nesmí tvrdit hodnotu („na 375 px ≥ 14 px“, „měřítko 1,8“), kterou kód nedrží. Napsat jen odkaz na měřidlo (`testy/…`, `skripty/kontrast_textu_svg.py`) nebo číslo přímo odvodit z atributu.
13. **Jeden tvar = jeden význam i u písmen** (T10): zakázaná písmena podle tématu viz `predavka/2026-10-01/SABLONY-ZADANI.md` § D (N = newton × pól).

## Animace (rozhodnutí učitele 21. 10.)
- Nové panely: animované SVG (SMIL nebo CSS uvnitř SVG, bez JS) všude, kde pohyb vysvětluje příčinu/děj; statické jen tam, kde se nic neděje (tabulky značek, legendy).
- Výjimka z pojistky hotového (1814) udělená učitelem: smí se nahradit soubor nasazeného panelu jeho animovanou verzí se STEJNÝM jménem, stejným textem a dějem (jen přidaný pohyb, případně opravené chyby). Nic jiného nasazeného se nepřepisuje.
- Povinné: smyčka 4–8 s a stav na konci srozumitelný; čísla se objeví rovnou správná (T11, žádné mezistavy); @media (prefers-reduced-motion: reduce) zastaví animaci na nejvýmluvnějším snímku; Safari (kontrola_safari_svg.mjs) a kontrast ≥ 4,5 na statickém i výsledném snímku; velikost souboru ≤ 2× statického.
- Kontrola animace = PŘEHRÁNÍ: kontrolor nechá na Intelu (ssh intel, Chrome headless, vzor ~/wonderly-render/prace/dil2-scena4-v3/) vyrenderovat snímky v čase 0, 25, 50, 75, 100 % smyčky + reduced-motion, a prohlédne je. Na mini prohlížeč nespouštět.
- Pořadí náhrad: 1) F8 elektrické obvody (pilot, 2 panely), 2) W39 přenos el. energie (7), 3) W41 chemické zdroje napětí 9. r. (4), 4) F8 chemické zdroje napětí (2), 5) F7 tělesa – vesta (1); dál podle inventury.
- (doplněno 21. 10. po pilotu) Pohyb MUSÍ ukazovat příčinu a průběh děje (tok proudu/nosičů po vodiči, ohřev změnou barvy/žhnutím, tání, zastavení toku, rozsvícení/zhasnutí). Pouhé postupné zvýrazňování částí nebo přepnutí ‚před/po‘ NESTAČÍ. Žádné texty typu ‚zvýraznění neznázorňuje proud‘. Text panelu se smí minimálně upravit, aby odpovídal pohybu (fakta beze změny, opora ve výkladu). Kontrolor odpovídá i na otázku ‚Vysvětluje pohyb příčinu děje lépe než statický obrázek? ANO/NE‘ – NE = ZAMÍTNUTO.

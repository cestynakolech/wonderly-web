# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩ KDE POKRAČOVAT (4. 8. 2026 — předání novému modelu)

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `START.md`).

### 🔴 NEDOKONČENO Z KOLA D1 — začni tímhle

**Druhá kontrola čtyř nových simulací informatiky NEDOBĚHLA** (došel týdenní limit
uprostřed běhu kontrolora, 3. 8. odpoledne). Simulace jsou nasazené a opravené,
ale potvrzení oprav chybí. Zadání pro kontrolora je připravené — u každé vady
rozhodnout ZAVŘENO / OTEVŘENO a doložit to **spuštěním kódu** (`node -e`), ne přečtením:

| soubor | co ověřit |
|---|---|
| `KlonovaniSimulace.astro` | `když ⟨⟩ tak` (ne „pokud") · `náhodné číslo od ( ) do ( )` · vypsaná pauza `čekej ( ) sekund` souhlasí s nastavenou rychlostí a má českou čárku · počítadlo si neprotiřečí se „selhalo" · zastavení maže klony · hromada roste a klony vznikají v nakresleném generátoru |
| `MicrobitVstupySimulace.astro` | žádné `ukaž ikonu (vykřičník)` ani `(šipka …)` · mez osy X a Y stejná a text si na mezi neodporuje se zvýrazněním · `mg = 1000·sin(úhel)`, mez 500 mg |
| `MicrobitRadioSimulace.astro` | signál slábne plynule se vzdáleností i zdmi (žádná tvrdá čára) · displej u pinů opravdu něco ukáže · hlavičkou je KAŽDÝ klobouk, ne jen první řádek |
| `VexcodeSimulace.astro` | bloky anglicky s jednotkou **mm** (cm VEXcode IQ nemá) + klobouk `when started` · délka animace úměrná hodnotě bloku · robot nezmizí mimo scénu bez hlášky · výchozí program pořád trefí cíl přesně |

Navíc hledat NOVÉ vady, které oprava mohla zanést — hlavně rozpor mezi simulací
a výkladem na téže stránce.

### 🌙 FRONTA (pořadí drž)

1. **Názornost informatiky** — zbývá **26 podtémat** (bylo 30; 3. 8. přibyly 4 simulace,
   viz „Hotovo 3. 8. odpoledne" níž). Na řadě podle měřidla `node testy/nazornost.mjs`:
   Inf8 `roboticka-stavebnice` (3 podtémata), `hry-ve-scratchi` (3), `hromadne-zpracovani-dat`,
   `co-umi-vex-iq`; Inf9 `programovaci-projekty` (2), `digitalni-technologie` (3).
   Dávka 4+ patří do vějíře (`/simulace`).
   Senzory robota jsou HOTOVÉ včetně nálezů kontrolora (viz níž).
2. **Dvojice videí v `nasazeno/`** (zadání učitele): u Le Bourg-d'Oisans a Saint-Bonnet
   leží dvě verze. Nechat tu, **kde je toho víc**, a ověřit, jestli v delší nechybí něco
   z kratší — u Le Bourg to hrozí: kratší verze (4:58) obsahuje **přibalená místa
   Saint-Tropez, Le Lavandou a Riez**, delší (6:06) je jen z Le Bourg (77 médií).
   Když v delší opravdu chybí, složit ze dvou jednu.
3. **Testy simulací jsou z poloviny slepé — DOMĚŘIT.** Mutační test přes všech 16
   simulací (3. 8. dopoledne) skončil: **310 mutací, odhaleno 155, prošlo 155**.
   Pořadí podle toho, kde je díra největší (odhaleno / celkem):

   | simulace | odhaleno | simulace | odhaleno |
   |---|---|---|---|
   | `tabulka-vzorce` | **6/26** | `promenne` | 6/15 |
   | `souradnice` | **7/25** | `led-displej` | 6/12 |
   | `zapojeni` | **8/26** | `meridla` | 7/15 |
   | `vetveni` | **6/19** | `bludiste` | 10/22 |
   | `reostat` | 8/21 | `opakovani` | 8/18 |
   | `odpor-vodice` | 11/25 | `elektrovani` | 12/18 |
   | `vlastni-bloky` | 15/20 | `udalosti` | 18/20 |
   | `funkce-tabulky` | 13/14 | `senzory-robota` | **14/14 ✅** |

   Detail k jedné simulaci: `node testy/mutace.mjs <název>` (vypíše, které mutace prošly
   a kus kódu, který nikdo neměří). Celý běh trvá přes 10 minut — pouštět na pozadí.
   **Jak se díra zavírá** (vzor z 3. 8., obojí doloženo podvrhy): měřit skutečnou scénu
   a vypsané hodnoty, ne text zdroje · texty vázat na chování (popisek proti tomu, co
   tlačítko udělá) · očekávání psát ručně, ne brát z testované komponenty (tautologie) ·
   projít VŠECHNY stavy, ne jen výchozí. Ke každé opravené simulaci patří skript podvrhů
   v `testy/podvrhy/` a záznam v `testy/obousmerne.json`.
   Začít od `tabulka-vzorce` (6/26) — tam je slepota největší.
4. `cz()` chybí v 11 simulacích, které formátují čísla.
5. **BLOKOVÁNO, ne zapomenuto:** obě nové simulace (funkce v tabulkách, senzory robota)
   neprošly očima v prohlížeči — port 8788 drží dev server jiné session a cizí server
   tahle session zastavit nesmí (zkoušeno 3. 8. dvakrát). Až bude volný, projít je
   pohledem; kotvou jsou zatím testy, build a kontrola vygenerovaného HTML.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz` (rozhodovací tabulka v `KE-SCHVALENI.md`).

### ✅ Hotovo 3. 8. odpoledne — 4 nové simulace informatiky naráz (kolo D1)

Vějíř 4× `worker-simulace` paralelně, každý do vlastního nového souboru. Nasazeno,
commity `982d878` (simulace), `e90a0d2` (opravy), `e4dc261` (rozšířené měřidlo).

| podtéma | komponenta | `interakce` | co ukazuje |
|---|---|---|---|
| Inf9 `klonovani-animace-hry` | `KlonovaniSimulace` | `klonovani` | klon = kopie s vlastními hodnotami · zapomenutý `zruš tento klon` → náraz na scratchovský **strop 300 klonů**, kdy `klonuj` mlčky nic nevyrobí |
| Inf8 `tlacitka-naklon-zvuk` | `MicrobitVstupySimulace` | `microbit-vstupy` | tlačítka A/B/A+B, náklon přes akcelerometr (mez 500 mg = 30°), tón jen znázorněný — stránka nikdy nezvučí |
| Inf8 `propojeni-a-externi-zarizeni` | `MicrobitRadioSimulace` | `microbit-radio` | skupiny rádia 0–255, plynule slábnoucí signál (vzdálenost + zdi), piny s krokosvorkami |
| Inf8 `vexcode-prvni-program` | `VexcodeSimulace` | `vexcode` | skládání programu z bloků VEXcode IQ (`drive for 300 mm`), krokování, zeď hřiště |

Kotvy: brána `zkontroluj.mjs` 0 chyb (85 interakcí), build 465 stránek,
simulace ověřená ve vygenerovaném HTML všech čtyř stránek.

**Nezávislý kontrolor našel 16 vad, z toho 7 závažných — přes zelenou bránu i build.**
Všechny opravené autory jednotlivých souborů (`SendMessage` zpět původnímu workerovi —
levné, má kontext). Poučení je zapsané v `METRIKY-KOL.md` (řádek D1) a ve skillu
`/simulace`. Tři nejdůležitější:

- **Měřidlo hlídá jen tvary, které už jednou selhaly.** `testy/nazvy-bloku.mjs` hlásilo
  0 nálezů a přitom nemělo vzor pro `pokud ⟨⟩ tak` (česky je `když ⟨⟩ tak`) ani pro
  „náhodnou hodnotu". Doplněno 3. 8. i s obousměrným důkazem (podvrh → 2 nálezy,
  otisk souboru se změnil a po obnově vrátil).
- **ZNÁMÁ MEZERA, dosud neuzavřená:** názvy bloků **MakeCode a VEXcode nekontroluje NIC.**
  `testy/nazvy-bloku.mjs` umí jen Scratch, a to jen v celcích `SCRATCH_CELKY` a
  komponentách `SIMULACE_SE_SCRATCHEM`. Kontrolor proto ručně stáhl `pxt-microbit`
  a našel, že micro:bit nemá ikonu vykřičníku ani šipky (`showArrow` je jiný blok)
  a VEXcode IQ nezná centimetry. **Stojí za vlastní kolo.**
- **Simulace si protiřečila s výkladem na téže stránce** a nikdo to neměřil: tvrdý
  dosah rádia 25 m proti výkladu „přes zdi signál slábne"; české bloky proti výkladu
  „prostředí VEXcode je anglicky". Worker výklad četl — rozpor je potřeba měřit.

**Problém povolení (opravit ve vrátném):** hook po `Write` vyžaduje ověření v Browser
panelu / `preview_start`, jenže workeři mají jen `Read/Write/Edit/Grep/Glob` — pro ně
je ta podmínka nesplnitelná a hlásili ji jako `PROBLÉM POVOLENÍ`. Buď hook omezit na
hlavní model, nebo workerům ty nástroje dát.

### ✅ Hotovo 3. 8. ráno — nová simulace „Senzory robota" (Inf8)

Podtéma `senzory-robota` mělo výklad, ale žádnou názornost. Simulace ukazuje **tři pointy
výkladu naráz** na jednom robotovi jedoucím ke zdi: (1) **bez opakování** se program
rozhodne jen jednou a robot jede naslepo do zdi, s opakováním zastaví 10 cm před ní;
(2) **ultrazvuk lže** — od šikmé stěny se ozvěna odrazí pryč, záclona ji pohltí, senzor
proto hlásí svůj největší dosah 200 cm, i když je zeď 1 cm daleko, a robot nabourá i
s opakováním; (3) **dotykový senzor** ho zastaví, ale až po nárazu — proto se senzory
kombinují. Na obrazovce jsou pořád vedle sebe dvě čísla: co senzor **hlásí** a jak je
zeď **doopravdy** daleko.

Čísla vycházejí celá (120 cm, krok 10 cm, práh 10 cm → přesně 11 kroků).

> **Nezávislý kontrolor našel 16 nálezů, 6 vážných** — a všechny seděly:
> (1) v jediném stavu (kolmá zeď + program bez opakování + zapnutý dotyk) hláška tvrdila
> „ultrazvuk ji neviděl", ačkoli měřil správně a robot naboural kvůli programu — věta si
> sama odporovala; (2) řádek „program rozhodl" dopočítával podmínku i tam, kde se program
> už neptá, takže u rozmáčknutého robota stálo „program rozhodl: stůj"; (3) `skewX(-20)`
> naklonil stěnu tak, že do ní robot vjel o 17 cm scény a paprsek jí procházel skrz;
> (4) **záclona se v textech důsledně jmenovala „zeď"** a byla nakreslená jako 40px kvádr;
> (5) test porovnával poznámku s toutéž hodnotou v kódu (tautologie) a nekontroloval naučné
> věty — 5 podvržených nepravd prošlo zeleně; (6) kontrola dotyku pokrývala 2 z 12 stavů.
> Dál: neexistující vysvětlení dosahu 200 cm · `aria-label` uvnitř `<svg role="img">`
> odečítač vůbec nečte (jméno dává jen `<title>`, ten se teď přepisuje) · svislé uspořádání
> scény neměřil nikdo (robot mohl létat vzduchem, podlaha být nahoře) · kontrast se počítal
> jen u CSS rámečků, obrysy v SVG ne · v kvízu vysvětlení odporovalo výkladu („odrazí jinam"
> × „pohltí"), otázka o zastavení byla po simulaci dvojznačná a chyběla otázka na kombinaci
> senzorů.

Test **122 → 154 kontrol**, mutační test **14/14**, obousměrně doloženo **21 podvrhy**
(`testy/podvrhy/senzory-robota-podvrhy.mjs`, zapsáno v registru). Kvíz má 11 otázek,
0 úniků, 0 délkových nápověd. Testy simulací celkem **1015**.
Zapojeno do `temata.ts` (`interakce: 'senzory-robota'`) i do stránky podtématu; build
465 stránek, ve vygenerovaném HTML je simulace ověřená.

> ⚠️ **Náhled v prohlížeči se ověřit nepodařilo** — port 8788 drží dev server jiné
> session („wonderly-dist"), cizí server tahle session zastavit nesmí. Kotvou je tedy
> test nad skutečným skriptem komponenty + build + kontrola vygenerovaného HTML.
> Až bude port volný, projít simulaci i očima.

### ✅ Hotovo 3. 8. v noci — simulace „Funkce v tabulkách" (oba úkoly z minulé fronty)

- **Test už vidí i texty v HTML** (úkol 1). Nová sekce 9 neporovnává napevno psané
  řetězce, ale váže text na chování: mez v hlavičce = `MEZ_KDYZ`, rozsahy = počet
  žáků, oddělovač středník, názvy funkcí s háčky, popisky MIN/MAX proti skutečným
  hodnotám, popisek přepínače proti tomu, co tlačítko udělá, chybové kódy z české
  sady Excelu. Přitom se našla živá nesrovnalost: tabulka vypisovala
  `#DĚLENÍ_NULOU!`, ale hláška pod ní tvrdila anglické `#DIV/0!` — sjednoceno.
- **Všech 8 drobných nálezů** (úkol 2): RANK rozlišuje `#HODNOTA!` (text) a `#N/A`
  (prázdná buňka = nula, ta ve sloupci není) · `scope` u všech záhlaví · 2. pád
  v `aria-label` · šrafa `#868e96` (kontrast 1,30 → 3,32 : 1) · „kopírováno dolů"
  v hlavičce · české uvozovky · dorovnané délky u 3 kvízových otázek · mrtvý kód pryč.
- **Nezávislý kontrolor našel 10 dalších, dvě vážné** — a měl pravdu:
  (1) závěrečná hláška měla „18 ÷ 6 = 3" **napevno**, přestože se ukazuje i po změně
  známky, takže po jednom kliknutí tvrdila dětem něco jiného než panel o dva
  centimetry výš; (2) test měřil vzorce, ale **naučné věty vůbec** — z 15 podvržených
  nepravd jich 11 prošlo zeleně, včetně „text je menší než každé číslo" (opak Excelu).
  Nová sekce 10 proto měří i texty: čísla v hlášce se porovnávají s daty po každé
  změně, poznámky u SUMA/POČET/RANK proti chování, nápověda proti `KOLECKO`,
  nadpis a úvod proti zvýrazněné funkci v panelu, kontrast každé čáry ≥ 3 : 1.
  Dále: RANK vypisuje `1` jako Excel (ne `1.`), `<caption>` u tabulky výsledků,
  mřížka `#adb5bd` → `#868e96`, a **dvě nové kvízové otázky** na hlavní pointy
  (třetí údaj u RANK, prázdná buňka v KDYŽ) — kvíz má 15 otázek.
- **Kotva:** test **93 → 167 kontrol**, obousměrně ověřeno **24 podvrhy na kopii mimo
  repo** (zdravá kopie mlčí, každý podvrh test shodí). Testy simulací celkem **828**,
  brány šablon 0 nálezů, build 465 stránek.

### ✅ Hotovo 2. 8. večer

- **Audit automatů na opsaná pravidla** (zadání učitele). Nalezena tři: projekce mapy
  ve 3 skriptech, denní strop YouTube napsaný podruhé číslem, rozhodnutí o hotovém
  městě. Vše sloučeno; nově `projekce_mapy.py`, registr `data/pravidla-registr.json`
  a hlídač `test_bez_kopii.py` (rohatka, dluh 0), zapojený do denní revize.
  Ověřeno 5 podvrhy. Dvakrát přitom hlídač propustil vadu — obojí opraveno.
- **Videa se vracela k revizi** — příčina: hlavní smyčka VideoAutomatu měla vlastní
  kopii podmínky, do které se oprava z 31. 7. nedostala (Le Bourg vzniklo 5×).
  Opraveno, hlídá `test_video_nasazeno.py` (9 kontrol).
- **Mapa: odkazy na videa 15 → 37 míst** — párovač bere i původní videa z kanálu,
  přepracovaná verze má vždy přednost a odkaz se po výměně přepíše sám.
- **Dvě nové simulace** informatiky (bludiště Inf7, funkce v tabulkách Inf8) —
  testy 125 a 93 kontrol, 17 + 11 nálezů kontrolorů opraveno.
- `revize_grafu.py` se vůbec nepřekládal (2 chyby v syntaxi) — opraveno; revize
  nově překládá všech 56 skriptů.

## 🎯 Předchozí stav (2. 8. 2026 večer — vlastní bloky s parametry, kolo C3)

**Hotovo:** simulace **„Vlastní bloky s parametry"** (Inf7, `vlastni-bloky-s-parametry`).
Program kreslí tři čtverce a otáčí se o **80° místo 90°**, takže se čáry neuzavřou —
chyba je vidět, ne jen napsaná. Pointa výkladu *„opravuješ na jednom místě"*:
**tři kopie kódu si vyžádají tři opravy** (a mezitím zůstávají dva útvary křivé),
**vlastní blok jedinou**. Srovnání 3 × 1 zůstane na obrazovce i po přepnutí režimu.
Parametr: tentýž blok kreslí 50, 80 i 120 — liší se jen číslo v okénku.
Test **61 kontrol**, testy simulací celkem **534**. Názornost informatiky **34 → 33**.

> **Nezávislý kontrolor našel 2 vážné a 6 drobných.** Obě vážné stály za to:
> (1) řádky programu měly `display: inline-block`, takže se skládaly **vedle sebe** —
> „tři kopie pod sebou" se rozpadly do vodorovné změti; (2) **test vůbec nečetl scénu**,
> takže podvrh „kresli vždy správný úhel" prošel všemi 45 kontrolami, ačkoli hláška
> tvrdila opak toho, co bylo vidět. Test teď čte skutečné `points` a `stroke` nakreslených
> čar; tři podvrhy kontrolora nově shodí 6, 9 a 1 kontrolu.
> Drobné: česká shoda („zbývající 1 zůstala křivá“) · závěrečná věta tvrdila „na jednu se
> zapomene“ ve chvíli, kdy už byly všechny tři útvary zelené · kontrola názvů bloků běžela
> jen v jednom ze dvou režimů · vzor měřidla neuměl interpolaci `jdi (${v}) kroků`.

> **Vlastní chyba — už podruhé tatáž:** opravy podle kontrolora jsem zahodil příkazem
> `git checkout` nad necommitnutou prací (poprvé u měřidla šablon). Je to zapsané v paměti
> [[feedback-podvrh-jen-na-kopii]] a stejně se to opakovalo. **Pravidlo pro příště: po každé
> dávce oprav rovnou commit, teprve pak jakékoli ověřování s podvrhem.**

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **33 podtémat**. Na řadě: `hra-bludiste` (Inf7),
   `senzory-robota`, `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
   Dávka 4+ patří do vějíře (`/simulace`).
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
3. `cz()` chybí v 11 simulacích, které formátují čísla.

## 🎯 Předchozí stav (2. 8. 2026 odpoledne — CELKOVÁ oprava kontroly šablon, kolo C2)

> **Výtka učitele:** *„stále něco opravuješ a zůstává to neopravené… navrhni celkovou opravu."*
> Byla oprávněná. Kontrola šablon se opravovala třikrát a pokaždé se ukázalo, že hádá.

**Co bylo špatně (v jádru, ne v jednotlivostech):** měřidlo hledalo volání prvků
**regulárními výrazy**. Na každý další způsob zápisu (`$(id)` zkratka, `<script is:inline>`,
`querySelector('#x')`, backticky) by musel přibýt nový vzor — a ten chybějící by byl vždycky
tichá díra. Doloženo: **270 z 945 vyhledání nebylo měřeno vůbec** a u čtyř komponent šlo
smazat CELOU scénu, aniž brána cekla.

**Celková oprava: přestat hádat a MĚŘIT.** Skript komponenty se spustí nad DOMem postaveným
ze skutečné šablony, každý dotaz na prvek se zaznamená a na konci porovná. Je pak jedno,
jakou cestou si skript prvek hledá. Je to tentýž posun jako u kvízů — *číst data, ne text*.

| | regexová verze | dnes |
|---|---|---|
| změřeno vyhledání | 675 | **5101** |
| pokrytí (smazání prvku se odhalí) | — | **977 z 983 = 99,4 %** |
| kontrol v obousměrném testu | 24 | **54** |
| mutací měřidla, které test shodí | 0 ze 6 | **6 ze 6** |

**Druhé kolo kontroly odhalilo, že se měřil jen kód doběhlý při NAČTENÍ** — obsluha tlačítek
ani časovače se nikdy nezavolaly, takže 32 vyhledání v devíti komponentách zůstalo slepých
(mj. celá tyč rotoru u elektromotoru). Nově se posluchači po doběhnutí jednou spustí.
Dál opraveno: komponenta bez jediného měření je **tvrdá chyba** (celý skript v
`DOMContentLoaded` dosud prošel mlčky) · jediné `class={…}` už neumlčí kontrolu id celé
komponenty · zakomentovaná scéna se nepočítá jako existující · prvek vyrobený, ale nikdy
nevložený do stránky, nezakryje vadu · každý `<script>` běží zvlášť · atrapa doplněna tam,
kde padala na ZDRAVÉM kódu (falešné „skript nedoběhl").

> **Zapsaná mez (poctivě):** změřit jde jen kód, který se opravdu provede. Šest vyhledání
> je ve větvích, kam běh při načtení nedojde (šipka síly u motoru, brýle u vady oka).
> Měřidlo také nehlídá překlep v názvu prohlížečové metody. Obojí je v `testy/obousmerne.json`.

> **Vlastní chyba, která stála nejvíc času:** podvrh v repu jsem vracel přes `git checkout`,
> jenže přepis měřidla ještě nebyl commitnutý — **zahodil jsem tím celou práci** a brána pak
> běžela zase na staré slepé verzi. Poučení: podvrhy dělat na KOPIÍCH, a když už v repu,
> tak jen nad commitnutým stavem.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **34 podtémat** bez obrázku či videa. Na řadě:
   `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7), `senzory-robota`,
   `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9). Dávka 4+ patří do vějíře.
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
3. `cz()` chybí v 11 simulacích, které formátují čísla.

## 🎯 Předchozí stav (2. 8. 2026 odpoledne — události a vstupy, kolo C1)

**Hotovo:** simulace **„Události a vstupy"** (Inf7, `udalosti-a-vstupy`) — scéna s kočkou
a míčem, žák vyvolává události tlačítky nebo skutečnou klávesnicí (šipky, mezerník) a vidí,
které žluté klobouky se rozsvítí. Pointa, kterou výklad jen tvrdí slovy: **přepínač vezme
míči klobouk, bloky mu nechá — a zelená vlajka s ním už nehne.** Přepnutí schválně
nevrací postavy na start, jinak by to nebylo vidět. Test má **100 kontrol**, mutační
test 17/19 (zbylé dvě posouvají mez o 1 px = ekvivalentní mutace).
Názornost informatiky **35 → 34** podtémat bez obrázku či videa; testy simulací **472 kontrol**.

> **Poučení kola: oba VÁŽNÉ nálezy byly v testu, ne v simulaci.** Test nečetl HTML šablonu
> vůbec — komponenta se smazanou scénou i všemi tlačítky jím prošla jako zdravá — a hlavní
> pointu ověřoval jen čistou funkcí, takže podvrh „přepínač vrátí míč na start" prošel bez
> povšimnutí. Obojí doložil nezávislý kontrolor podvrhem, obojí je nově uzavřené a ověřené
> oběma směry. **Mutační test k tomu ukázal třetí věc:** konstanty (krok 10, skok 20) jsem
> v testu četl z testovaného kódu, takže se tvrzení přizpůsobila jakékoli hodnotě. Teď se
> čísla čtou z TEXTU bloku, který má žák na obrazovce — kdyby simulace posouvala o jinak,
> než co je v programu napsané, spadne to.
>
> **A kontrolora nelze poslouchat slepě:** označil za závažnou vadu, že výklad píše
> „po obdržení zprávy", a tvrdil, že paleta má „po přijetí zprávy". Ověření v oficiální
> lokalizaci (scratch-l10n, `EVENT_WHENBROADCASTRECEIVED`) ukázalo **pravý opak** — a tím
> se našla skutečná vada na **třech jiných místech webu**, kde se jako název bloku psalo
> „po přijetí zprávy". Opraveno a nově to hlídá měřidlo `nazvy-bloku.mjs` (vzor je zúžený
> na tvar s „po", aby nehlásil popis jevu „událostí je i přijetí zprávy").

Dál opraveno podle kontrolorů: sjednoceno „zelená vlaječka" → „zelená vlajka" (3 místa) ·
kočka a míč mohli stát na témž bodě a slít se i s popisky (dráhy odděleny) · `role="img"`
na ovládané scéně (odečítač by skryl obsah) · kontrast návodu 3,3 : 1 pod normou ·
hláška „Kliknutí na míč nastala" · zaražený míč u okraje hlásil spuštěný scénář, ačkoli
se ve scéně nic nezměnilo · počítadlo spuštěných scénářů se počítalo, ale žák ho neviděl ·
tlačítko ↺ stálo v řádku „Míč:" a šlo si ho splést se spouštěčem události.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **34 podtémat** bez obrázku či videa. Na řadě:
   `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7), `senzory-robota`,
   `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
   Dávka 4+ nezávislých položek patří do vějíře (`/simulace`), ne za sebe.
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
   Nedodělek: `tabulka-vzorce` (háček `__hodnotaB` bere kurz jako parametr).
3. `cz()` chybí v 11 simulacích, které formátují čísla — doplnit při práci na nich.

## 🎯 Předchozí stav (2. 8. 2026 dopoledne — DLOUHODOBÝ AUDIT + OPATŘENÍ)

> **Zadání učitele:** *„udělej si dlouhodobej audit za delší pracovní cyklus, zda se
> s chybami netočíme v kruhu a zda ještě držíme diamant a nezávislého kontrolora…
> vytvoř opatření na zlepšení a pokračuj v práci bez zastavování."*

**Odpověď na otázku „točíme se v kruhu?": ANO, ale ne tam, kde by to čekal.**
Obsah se měřitelně lepší — hluché stránky **36 → 0**, uhodnutelnost kvízů **77 % → 38 %**,
kontrol simulací 244 → 273. Točí se **NÁSTROJE, které obsah hlídají**: vzorec „měřidlo
ukazuje číslo, které nic neměří" je doložen **20 výskyty ve čtyřech dnech**, z toho
5 za jedinou noc. Vlastní retrospektiva to napsala už dřív („ve všech pěti kolech byla
nejdražší vada v měřidle, ne v obsahu"), ale opatření z toho nikdy nevzniklo.

**Tři nezávislí auditoři, každý s jinou otázkou** (opakované vady × dodržování postupů ×
pravidla proti skutečnému kódu). Shodli se jen na jednom — a právě to je nejsilnější nález.

### Co se z auditu zavedlo (vše nasazené a ověřené obousměrně)

1. **Rejstřík obousměrného ověření měřidel** — `testy/obousmerne.json` + kontrola 6h v bráně.
   Pravidlo „novou kontrolu ověř obousměrně" platilo od 30. 7., ale jen jako TEXT, takže
   nic nebránilo nasadit měřidlo bez důkazu. **Nové měřidlo bez dokladu teď shodí build.**
   Dluh splacen hned: **6 ze 6 měřidel** má zapsaný podvrh i zdravý stav
   (`testy/meridla-obousmerne.mjs`, 24 kontrol; ověřeno 7 mutacemi měřidel).
   Pěti měřidlům k tomu musel přibýt parametr dat nebo se logika vytáhla do funkce —
   **právě proto u nich důkaz nikdy nevznikl: nešel jim podvrhnout vstup.**
2. **Duplicity a úniky odpovědí v kvízech** — `testy/uniky.mjs`, kontrola 6g.
   Obojí se opakovalo od 29. 7. a hledalo se ručně pokynem, na který se v tempu zapomínalo.
   Duplicita = tvrdá chyba (dnes 0), úniky drží rohatka (39). Kotva: nad historickými
   kvízy z 31. 7. najde 4 duplicity, mezi nimi **dvakrát doslova tutéž otázku**.
3. **Revize automatů má doháněč** (`--dohanec`, hodinové buzení) **a eskalaci** —
   běžela 1× za 24 h bez náhrady, takže na uspaném Macu se den vynechal. Hlídač zdraví
   neměl hlídače. Nález, který přetrvá do dalšího běhu, se nově označí `⏳ PŘETRVÁVÁ`.
4. **Rejstřík pravidel: opraveno 5 falešných ✅** — pravidlo vedené jako hlídané, jehož
   vykonavatel neexistuje (detail níže v „ČEKÁ NA UČITELE", bod 1).
5. **Počítadlo vstupů u kontrol** — brána nově vypisuje, kolik bloků a otázek prošlo.
   Opakovaný vzorec byl „opatření tiše platí jen na část případů" (filtr falešných
   poplachů se volal jen u fotek; společná mapa se neměřila vůbec).

> **Poctivá poznámka: všechna tři měřidla, která jsem během auditu napsal, byla v první
> verzi vadná.** Detekce duplicit hlásila 13 nálezů, z toho 11 falešných (filtr slov
> ≥ 4 znaky zahazoval čísla, takže „při 0 °C" a „při 100 °C" vyšlo jako shoda 100 %);
> detekce úniků 264 nálezů místo 39; první test měřidla prošel i po zavedení mutace.
> Odhalily to až podvrhy a mutace — ne pohled na výsledek. Je to nejlepší doklad, proč
> má nové opatření smysl.

### Druhý nález: DIAMANT se ze samostatného režimu vytratil

Kola S1–S5 jsou v metrikách všechna „chain", ačkoli se v nich dělaly dávky **5–9
nezávislých stránek** — učebnicový vějíř. Paralelní byla jen kontrola. Nezávislý
kontrolor naopak drží pevně (36 zmínek, vždy s počtem nálezů) — **kromě vlastních
měřidel, na která nebyl nasazen ani jednou**, a přesně tam byly nejdražší vady.
→ **Opatření:** dávka 4+ nezávislých položek se dělá vějířem (audit sám takhle běžel);
kontrolor dostává i kód kontrol, nejen obsah.

### Po auditu: dvě nové simulace informatiky (kola B1–B3)

**Větvení „když… tak… jinak…"** a **opakování „dokud / 10krát / stále"** — obojí nasazené
a ověřené na živém webu. Názornost informatiky **37 → 35** podtémat bez obrázku či videa,
testy simulací **318 → 371 kontrol**.

> **Dva nezávislí kontroloři našli 24 vad, z toho 9 vážných — a to obě simulace předtím
> prošly vlastními 83 kontrolami i buildem.** Nejzávažnější: **obě učily NEEXISTUJÍCÍ
> názvy bloků** („jdi 10 kroků" místo „dopředu o 10 kroků", „když na okraji, odraz se"
> místo „když narazíš na okraj, odraz se"). Systémová příčina: měřidlo `nazvy-bloku.mjs`
> četlo jen výklady a kvízy z dat, **ne komponenty simulací** — brána byla zelená.
> Po rozšíření hned našlo další dvě vady ve STARŠÍCH nasazených simulacích
> („řekni" místo „bublina", 3. osoba „dotýká se").
>
> **A první verze toho rozšíření podvrh NENAŠLA**: na zdrojový kód pouštěla `text()`,
> která maže vše mezi „<" a „>", takže v JS podmínce (`i < 80`) spolkla celé řádky.
> Poznal to až otisk souboru před/po — hláška „0 nálezů" vypadala úplně stejně jako
> zdravý stav. Do příště: **měřidlo psané pro HTML se nesmí pustit na zdrojový kód.**

Další opravy podle kontrolorů: šipky ANO/NE byly obráceně než výklad · dotyk barvy se
počítal bodově, takže postava viditelně stála na pruhu a program tvrdil opak · pointa
větvení byla vidět až po 33 kliknutích (nyní po 6) · „opakuj stále" hlásilo „nic se
nemění", ačkoli postava ujela 200 px · zastavení pojistkou vypadalo jako regulérní konec
smyčky · překryvy textů a kontrast pod normou · v kvízu byly **distraktory, které nejsou
skutečné bloky** (šly vyloučit bez znalosti učiva) · v testech tautologie `? … : true`
a porovnávání s vlastními literály místo se zdrojem pravdy.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **35 podtémat** bez obrázku či videa. Poslední
   velká obsahová mezera; dělat vějířem (`/simulace`).
   Nabízí se: `udalosti-a-vstupy`, `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7),
   `senzory-robota`, `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`) —
   doplňovat jen mutace ve fyzice a chování, ne v pixelech. Nedodělek: `tabulka-vzorce`
   (háček `__hodnotaB` bere kurz jako parametr, takže se výchozí hodnota neuplatní).
3. `cz()` chybí v 11 simulacích, které formátují čísla — doplnit při práci na nich.

## 🎯 Předchozí stav (2. 8. 2026, k ránu — AUDIT KONTROL DOJETÝ)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno skončí,
> začni hned nové. Já jdu spát, ty pracuj, nezastavuj se."* → **Žádné pauzy mezi koly.**
> Dotazy se zapisují sem do „ČEKÁ NA UČITELE", ne do chatu.

**Hotové za noc: hluché stránky 36 → 0** (šest dávek) **a k tomu celý bod 1 fronty —
zbytek auditu kontrol.** Vše nasazené a ověřené.

**a) Brána četla zapojení simulací z TEXTU**, ačkoli data byla načtená o pár řádků výš.
Tichá díra: podtéma s jiným odsazením nebo vzniklé programově by vzor minul a pro
takovou simulaci by se **přeskočily všechny tři kontroly zapojení** — brána zelená.
Ověřeno podvrhem (interakce zapsaná na témž řádku jako slug je pro starý regex
neviditelná; nová brána ji hlásí a končí kódem 1).

**b) Mapa „všechna místa" se neměřila vůbec — a hned se v ní našla vada.** Je to
nejhustší mapa webu (209 pinů, 4 jazykové mutace, kde jiná délka slov dává jiné
rozmístění). Popisek **„Vaulnaveys-le-Haut" přetékal z výřezu ve všech čtyřech
jazycích** a překrýval se s „Col d'Ornon". Příčina: **ruční `popisekPosun` se
aplikoval bez kontroly výřezu** — je doladěný pro mapu roku, ale společná mapa má
jiný výřez i písmo. Nově se posun použije, jen když se popisek vejde. Ověřeno, že
mapa roku dává **přesně stejné souřadnice** jako předtím (žádná regrese), a hotová
stránka přepočítána z nasazeného HTML: 209 pinů, 0 přetečení, 0 překryvů.

> **Málem jsem zavedl falešný poplach.** První verze měřidla hlásila „164 míst se
> beze stopy ztratilo". Není to pravda — `CestyVse.astro` kreslí piny pro **všechna**
> místa a každé je i v seznamu pod mapou; jen jmen se na 209 bodů vejde asi 40
> a zbytek rozmisťovač schválně vynechá. Přepsáno na **sledovanou hodnotu, ne chybu**.

**c) Slovník `DRUHY_MATERIALU`.** Neznámý druh materiálu se tiše ignoroval — přesně
tak vznikla falešná nula u `druh: 'obrazek'` (v datech není ani jednou, správně je
`infografika`) a stejně tiše propadávalo `pdf` (3×). Nově má **každý druh zapsané
rozhodnutí**, jestli se počítá do názornosti (pdf schválně ne — je to dokument ke
stažení). Neznámý druh je **tvrdá chyba**. Ověřeno podvrhem.

**d) Mutační test simulací — `node testy/mutace.mjs [část-názvu]`.** Zavede do zdroje
drobnou chybu a čeká, že test spadne; co projde, to nikdo nehlídá. **Do brány
schválně NEPATŘÍ** (je pomalý), je to nástroj na vyžádání.

> **⚠️ PRVNÍ VERZE NÁSTROJE SAMA LHALA** — a je to potřetí za noc, co měřidlo
> ukázalo číslo, které nic neměřilo. Měnila jen **první** výskyt každého vzoru,
> a ten u `elektrovani` padl do výpočtu SVG polohy pravítka — tedy do vizuálu, který
> test právem nekontroluje. Hlásila „1/5" a **nehnula se ani poté, co do testu přibylo
> šest nových kontrol Coulombova zákona**. Nově mutuje vzorek výskytů napříč souborem
> a u každé neodhalené vypíše kus kódu.

**Test `elektrovani` posílen 4/18 → 12/18.** Vzorec síly se **nikdy neověřoval** (volal
se jen jako vstup), takže záměna násobení za dělení přímo v Coulombově zákoně testem
prošla — žák by viděl scénu, kde silněji nabité pravítko přitahuje slaběji. Nově se
ověřuje přímá úměra s nábojem i pokles s **druhou mocninou** vzdálenosti. Doplněny
i texty, které žák čte. Kontrol simulací celkem **244 → 265**.

**e) Sjednocen vzorec, který byl v simulaci napsaný DVAKRÁT.** Mutační test ukázal, že
změna rychlosti elektronů v kreslicím kódu `OdporVodiceSimulace` testem projde. Příčina:
vzorec `110/(1+R)` byl v souboru dvakrát — jednou v kreslení a podruhé jako testovací
háček `svg.__rychlost`. **Test tedy ověřoval opis, ne to, co žák vidí.** Nově je to jedna
funkce a háček na ni jen ukazuje. *Pravidlo: testovací háček musí ukazovat na TÝŽ kód,
jinak nekontroluje nic.*

**Přeměřeno novou verzí nástroje** (poctivější čísla než stará):
`elektrovani` **12/18** (bylo 4) · `odpor-vodice` **11/25** (bylo 8) · `zapojeni` 8/26 ·
`reostat` 8/21 · `meridla` 7/15 · `souradnice` 7/25 · `led-displej` 6/12 ·
`promenne` 6/15 · `tabulka-vzorce` 6/26. Kontrol simulací **244 → 273**.

**FRONTA — čím pokračovat:**
1. **Doměřit zbylé testy simulací** — postup: `node testy/mutace.mjs <název>` → podívat
   se, které neodhalené mutace jsou ve **fyzice a chování** (ty doplnit) a které v čistém
   vizuálu (polohy, tloušťky čar, natočení — ty nechat být, testy nemají hlídat pixely).
   Nízké procento samo o sobě neznamená špatný test; rozhoduje, CO uniká.
   > **Poctivá poznámka k `tabulka-vzorce`:** doplnil jsem čtyři smysluplné kontroly
   > výchozího stavu, ale **mutační číslo se nepohnulo (6/26)**. Háček `__hodnotaB`
   > totiž bere kurz jako *parametr*, takže se přes něj skutečná výchozí hodnota
   > `let kurz = 25` vůbec neuplatní. Aby šla ověřit, musela by atrapa DOM v testu
   > sbírat vytvořené prvky a číst texty buněk. **Nedodělek, ne hotová věc.**
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Výklad už
   mají všechna slušný, takže tohle je poslední velká obsahová mezera. Skillem `/simulace`.
3. ~~Obnovit `METRIKY-KOL.md`~~ — **hotovo 2. 8.**: doplněna kola S1–S5 i poučení
   z retrospektivy (nejdražší vady noci byly v měřidlech, ne v obsahu). Zapisovat dál
   jeden řádek na kolo, hned na konci kola.
4. Kvízy nejsou priorita (viz audit strategie níže).

**⏳ ČEKÁ NA UČITELE** *(jediný živý seznam — sbírá se sem, ať se nemusí odklikávat průběžně)*

- **K DODATEČNÉMU SCHVÁLENÍ (2. 8., z auditu):** přenastavil jsem **LaunchAgent
  `com.omega.revize-automatu`** — dřív se budil 1× za 24 h a při uspaném Macu se běh
  bez náhrady vynechal, nově se budí hodinově a pracuje jednou denně (`--dohanec`),
  stejně jako ostatní automaty. Je to zásah do nastavení automatu, proto to hlásím;
  kdybyste to chtěl zpět, je to jedna změna v plistu.
- **Rejstřík pravidel měl 5 falešných ✅** (pravidlo se tvářilo jako hlídané, ale nikdo
  ho nehlídal) — opraveno v `Omega/PRAVIDLA.md`. Nejdůležitější z nich: *„správná odpověď
  v kvízu je v datech vždy první"*. `Kviz.astro` tuhle konvenci **používá**, ale nijak
  neověřuje — kdyby se u jedné z 2471 otázek pořadí přehodilo, web by tiše označoval za
  správnou špatnou odpověď. **Strojově to ověřit nejde** (který distraktor je pravdivý,
  pozná jen člověk); zkusil jsem to a heuristika dala 16 podezřelých, z nichž byl
  falešný poplach **všech 16**. Ručně jsem těch 16 prošel a pořadí je všude správně.
  Zůstává to tedy jako pravidlo pro člověka, ne pro stroj — je dobré o tom vědět.
- **Dvě věci, které rejstřík sliboval, a přitom neběží:** (a) přepnutí originálů starých
  videí na *private* po doanonymizování — kód existuje, ale jen za ručním přepínačem,
  sám se nespustí nikdy; (b) ochrana 11 lokálních modelů před smazáním — nehlídá ji nic,
  drží to jen pravidlo „ptát se". Mám u některé z nich něco doprogramovat?
- **⚠️ SÁHL JSEM NA VÁŠ ÚDAJ, PROTOŽE ŠLO O BEZPEČNOST.** Na stránce „Účinky proudu na
  člověka" stálo *„odpor člověka: v suchu a suché obuvi ~150 000 Ω, ve vlhku jen ~2000 Ω"*.
  Ta hodnota platí jen pro **suchou kůži při malém napětí**; při 230 V se kůže prorazí
  a odpor těla klesne k ~1 500 Ω. Nechat to tam by znamenalo učit děti, že suchý dotyk
  zásuvky je neškodný, proto jsem to opravil rovnou a neptal se předem. **Prosím
  o zpětné schválení** — kdybyste to chtěl jinak, vrátím.
- **Jakou generaci VEX IQ mozku škola má?** Stránka `co-umi-vex-iq` uvádí 12 portů na
  motory a čidla. U **starších Brainů si jeden port bere rádio** (volných 11), u novější
  generace je rádio vestavěné a 12 platí.

## 🎯 Předchozí stav (2. 8. 2026, v noci — HLUCHÉ STRÁNKY 0, DÍRA UZAVŘENA)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno kolo skončí,
> začni hned nové, aby se neztrácel čas. Já jdu spát, ty pracuj, nezastavuj se."*
> → **Mezi koly se neplánuje žádná pauza.** Dotazy se nehromadí v chatu, ale zapisují
> se sem do „ČEKÁ NA UČITELE".

**`node testy/kratke-vyklady.mjs 1200` hlásí 🕳 0.** Díra, kterou audit strategie
1. 8. označil za **největší na webu** (36 stránek bez obrázku, videa, simulace *a*
s výkladem pod 1200 znaků), je po šesti dávkách **zavřená celá**.

Poslední dávka (9 stránek, skoro celá elektřina): `elektricke-pole`,
`elektricka-prace-a-vykon`, `ucinky-proudu-a-bezpecnost`, `chemicke-zdroje-napeti`
(F8 i F9), `magneticke-pole-vodice-a-civky`, `elektricka-energie-a-premeny`,
`obnovitelne-a-neobnovitelne-zdroje`, `vlastnosti-stridaveho-proudu`.

Nově vyloženo: Faradayova klec (proč mřížka v troubě stíní mikrovlny, ale ne světlo) ·
**pravidlo pravé ruky konečně POPSANÉ** — dosud se na stránce jen jmenovalo ·
v elektrolytu vedou proud **ionty oběma směry**, vně článku elektrony · napětí článku
určuje dvojice materiálů, ne velikost · proč je střídavý proud výhodný (transformace,
ztráty rostou s proudem) · energie se nespotřebovává, **znehodnocuje** se na teplo ·
skoro všechny zdroje pocházejí ze Slunce (i uhlí) · **jistič chrání dům, chránič člověka**.

> **⚠️⚠️ DVA NEZÁVISLÍ KONTROLOŘI S RŮZNÝMI OTÁZKAMI** (jeden na čísla, druhý na fyziku
> a didaktiku) **NAŠLI NEZÁVISLE NA SOBĚ TENTÝŽ nejzávažnější nález** — to je nejsilnější
> signál, jaký tenhle postup umí dát. **Odpor člověka 150 000 Ω při 230 V je o dva řády
> mimo.** Nad ~50 V se kůže elektricky **prorazí** a odpor těla klesne na ~1 500 Ω.
> Já jsem na tom čísle postavil výpočet, ze kterého vyšlo uklidňující „1,5 mA, nepříjemné
> cuknutí" — ve skutečnosti vychází **153 mA, tedy pásmo zástavy srdce**, a většina
> smrtelných úrazů se stane právě **v suchu**. Blok je přepsaný: nově ukazuje, proč
> z ploché baterie nic necítíš (0,05 mA) a proč zásuvka zabíjí vždycky.

Další vážné nálezy (opraveno): **první pomoc měla volání 155 až jako 4. krok** po
zahájení resuscitace — laik, který začne masírovat, se už k telefonu nedostane · laická
KPR je **jen stlačování hrudníku**, puls se nehledá · **vodík byl veden jako obnovitelný
ZDROJ**, ačkoli je to jen nosič energie · dvě neslučitelné definice obnovitelnosti na
jedné stránce · uhlí „statisíce let" × „stovky milionů let" · **P = U · I bylo zároveň
výkon i příkon** · účinnost LED 70 % neseděla s vlastním příkladem (100 W → 10 W dává
50 %) · uhlík není kov · **anoda není vždy záporná** (při elektrolýze a nabíjení je
kladná) · zvonek zní **úderem kladívka do misky**, ne frekvencí přerušování.

> **Měřidlo `cisla-ve-vykladu.mjs` se za noc dvakrát vyplatilo:** pokaždé okamžitě
> nahlásilo, že oprava ve výkladu rozešla stránku s kvízem (nezámrzná hloubka 90 → 80 cm,
> účinnost LED 70 → 50 %). Obojí sladěno.

**FRONTA — čím pokračovat:**
1. **Zbytek auditu kontrol** — teď je to nejvyšší priorita, protože obsahová díra
   je zavřená: a) **zapojení simulací se čte z TEXTU**, ačkoli data jsou na dosah
   (`zkontroluj.mjs` ř. 25 načte `dataTemata` a už je nepoužije) — podtéma vzniklé
   programově kontrolu obejde; b) **mapa „všechna místa" (`CestyVse.astro`) se neměří
   vůbec** — 209 pinů, čtyři jazykové mutace, a `rozmistiPopisky` popisek, který se
   nevejde, **zahodí**; c) **slovníková kontrola hodnot** `druh`/`interakce` — neznámá
   hodnota má být chyba, ne ticho; d) slabé testy simulací podle mutačního testu:
   `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Výklad už
   mají všechna slušný, takže tohle je další skutečná mezera. Skillem `/simulace`.
3. **Obnovit `METRIKY-KOL.md`** — mrtvý od 29. 7.
4. Kvízy nejsou priorita (viz audit strategie níže).

**⏳ ČEKÁ NA UČITELE** — *přesunuto nahoru; živý seznam je VŽDY jen v nejhornější sekci.*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (2. 8. 2026, v noci — FYZIKA, DÁVKA 5)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno kolo skončí,
> začni hned nové, aby se neztrácel čas. Já jdu spát, ty pracuj, nezastavuj se. Práci
> průběžně kontroluj a potřebné věci pro schválení si ukládej."* → **Mezi koly se
> neplánuje žádná pauza.** Dotazy se nehromadí v chatu, ale zapisují sem do „ČEKÁ NA UČITELE".

**Hluché stránky 15 → 9.** Hotovo šest: `kondenzace`, `tuhnuti`,
`skupenske-zmeny-vody-v-prirode` (F8) a `uvod-do-fyziky`, `telesa-a-latky`,
`souhrnne-opakovani-velicin` (F6). Nasazeno a ověřeno curlem.

Doplněné učivo: kondenzace **uvolňuje** teplo (2 260 kJ/kg) → proto **pára popálí hůř
než vařící voda o téže teplotě** · kdyby led neplaval, rybník by promrzl ode dna ·
solení jen do **−21 °C** · koloběh vody **stěhuje energii** a pohání ho Slunce ·
Galileo + kladivo a pero na Měsíci (Apollo 15) · dvě otázky, jak rozeznat těleso od
látky · značka **t** znamená čas i teplotu (rozliší až jednotka).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ BYLA MOJE VLASTNÍ CHYBA.** Napsal jsem, že podchlazená voda
> po ťuknutí **„zmrzne celá naráz"**. Není to pravda — a odporovalo to odstavci o kus
> výš na téže stránce: tuhnutí **uvolňuje** skupenské teplo, to směs ohřeje na 0 °C
> a děj zastaví. Z vody podchlazené na −5 °C ztuhne jen asi **šestnáctina**, zbytek
> zůstane ledovou kaší (ověřeno výpočtem `c·Δt / l_t`). **Poučení: efektní tvrzení
> si ověřuj i proti vlastnímu textu o dva odstavce výš.**

Další nálezy kontrolora (opraveno): obláček z úst byl na jedné stránce „pára", zatímco
sousední stránka **totéž označuje za omyl** (pára je průhledný plyn, vidět jsou až
kapičky) · **rosný bod je TEPLOTA**, ne „stav" · **kroupy nevznikají zmrznutím padající
kapky**, ale opakovaným výnosem v bouřkovém mraku (odtud vrstvy jako cibule) · dusík
se stlačením nezkapalní, propan-butan ano · „led roztaje sám" navozovalo, že tání
nepotřebuje teplo · nezámrzná hloubka je 80–140 cm, ne 90–140.

> **Měřidlo se hned vyplatilo:** oprava hloubky 90 → 80 cm rozešla výklad s kvízem
> a `testy/cisla-ve-vykladu.mjs` to okamžitě nahlásilo. Sladěno.

**Rozhodnuto sám (odborné posouzení, neptám se):** web říká „základní jednotka"
i u odvozených (m³, kg/m³, N, Pa) — to je školská konvence shodná s učebnicí a
**přepisovat ji napříč desítkami kvízů by bylo horší než užitečné**. U teploty, kde
je to opravdu nepravda (základní jednotka SI je kelvin), je nově hvězdička s vysvětlením.

**FRONTA — čím pokračovat:**
0. **ZBÝVÁ 9 HLUCHÝCH STRÁNEK, všechno fyzika.** Seznam dá
   `node testy/kratke-vyklady.mjs 1200` (🕳). Zbývají: `chemicke-zdroje-napeti` (F8 i F9),
   `elektricka-energie-a-premeny`, `obnovitelne-a-neobnovitelne-zdroje`,
   `magneticke-pole-vodice-a-civky`, `elektricka-prace-a-vykon`, `elektricke-pole`,
   `ucinky-proudu-a-bezpecnost`, `vlastnosti-stridaveho-proudu` — **skoro celá elektřina**,
   dá se dělat jako jeden souvislý blok. **Kontrolor povinně.**
1. **Zbytek auditu kontrol** (beze změny): zapojení simulací se čte z TEXTU · mapa
   `CestyVse.astro` se neměří vůbec · slovníková kontrola `druh`/`interakce` · slabé
   testy `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat bez obrázku či videa. Skillem `/simulace`.
3. **Obnovit `METRIKY-KOL.md`** — mrtvý od 29. 7.

**⏳ ČEKÁ NA UČITELE** — *přesunuto nahoru; živý seznam je VŽDY jen v nejhornější sekci.*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (2. 8. 2026 — INFORMATIKA UZAVŘENA)

**Hluché stránky 21 → 15. Informatika je hotová — všech 6 zbývajících zavřeno**
(`hra-bludiste`, `hra-ping-pong`, `hra-skakacka`, `hra-vesmirna-strilecka`,
`motory-displej-zvuk`, `co-umi-vex-iq`). Nasazeno a ověřeno curlem. **Zbývá 15, všechno fyzika.**

Stránky her byly do teď čisté NÁVODY („udělej tohle") bez učiva. Každá dostala výklad
principu, který se za návodem skrývá: **detekce kolize** (bludiště), **herní smyčka a pohyb
po směru** (ping-pong), **gravitace jako proměnná rychlost** (skákačka), **klonování**
(střílečka), **vstup → program → výstup** a displej jako nástroj ladění (robot),
**program běží v robotu, ne v počítači** (VEX IQ).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ: MĚŘIDLO NÁZVŮ BLOKŮ BYLO PRAKTICKY MRTVÉ.** Vzor založený
> 1. 8. byl psaný jako `'dotýká se'`, jenže **čeština staví zvratné „se" před sloveso**
> („když **se dotýká** okraje"). Ten tvar se v textech skoro nevyskytuje, takže měřidlo
> hlásilo **0 nálezů** a přitom stejnou vadu neslo **pět stránek**. Falešná nula popáté —
> a tentokrát u kontroly, která vznikla právě proto, aby tuhle třídu chyb hlídala.
> Nově se rozhoduje podle **tvaru slovesa** (blok má 2. osobu „dotýkáš"), ne podle
> slovosledu. Přibylo pět dalších vzorů: `startuji jako klon` → **když startuje můj klon** ·
> `smaž klon` → **zruš tento klon** · `odraz se, když` → **když narazíš na okraj, odraz se** ·
> `schovej` → **skryj se** · `x ukazatele myši` → **x myši**.
> *Past při opravě: první verze nového vzoru hlásila i zdravou větu „postava se okraje
> dotýká", která mluví o významu podmínky a žádný blok nepojmenovává. Rozlišuje podmět —
> ve scénáři žádný není. Zúženo na „když se dotýká …".*

**Nezávislý kontrolor: 18 nálezů, tři vážné — všechny byly na stránkách už předtím:**
1. **Ping-pong šel hrát donekonečna.** Blok ⟨když narazíš na okraj, odraz se⟩ odráží
   i ode **dna**, takže podmínka „y &lt; −175" nenastane u **žádného** míčku (ověřeno
   výpočtem: míček 30 bodů se dostane nejníž na −165, čtyřicetibodový na −160). Život
   nikdy neubyl a hra neměla konec. Nově je dole **červené propadliště** a **past je
   z toho udělané učivo** — stránka ten spor rozebírá a končí pravidlem „když se dvě
   pravidla ve hře perou, vyhraje to rychlejší".
2. **Návrat po nárazu v bludišti nešlo naprogramovat.** Kontrola dotyku běžela ve vlastním
   ⟨opakuj stále⟩, ale pohyb je ve čtyřech scénářích u šipek — cyklus nemá jak zjistit,
   **kterým směrem** se postava hnula. Text si to navíc sám vyvracel. Nově je návrat
   hned pod pohybem, který ho způsobil, a všechny čtyři šipky jsou vypsané.
3. **Hlášky se skládaly pomocí `+`** („Konec! Skóre: " + skóre). Ve Scratchi je `+`
   **početní** blok — text v něm platí za nulu, takže by se žákovi vypsalo **holé číslo
   bez nápisu**. Správně ⟨spoj ( ) ( )⟩. **Přidáno do měřidla**, ověřeno podvrhem.

Další opravené nálezy: skákačka používala postavu **Země** a hodnotu **výška země**, které
stránka nikde nezaváděla · střílečce chyběl **scénář Rakety** i nastavení skóre a životů,
takže hra nešla dohrát · „srovnej y" a „přidej ⟨náhodné číslo⟩" nejsou bloky · tvrzení
„otáčka kola je stejně dlouhá, ať jede po čemkoli" **neplatí při prokluzu** — otáčky
vyrovnají vybitou baterii a tření, ale prokluz ošidí i je · vylepšení dávala žákům
**necelá čísla** (10 + skóre/5), přepsáno na celočíselné kroky · „vybitá baterie nezastaví
program" platí jen do chvíle, než se Brain vypne úplně.

**FRONTA — čím pokračovat:**
0. **ZAVÍRAT ZBYLÝCH 15 HLUCHÝCH STRÁNEK — už jen fyzika**, po dávkách 5–6.
   Seznam dá `node testy/kratke-vyklady.mjs 1200` (označí 🕳). Nejkratší:
   `kondenzace` (738), `chemicke-zdroje-napeti` F9 (739), `souhrnne-opakovani-velicin`
   (770), `tuhnuti` (842), `elektricka-energie-a-premeny` (848). **Kontrolor povinně** —
   u fyziky pozor hlavně na čísla a jednotky, ne na názvy bloků.
1. **Zbytek auditu kontrol** (beze změny, viz sekce z 1. 8.): zapojení simulací se čte
   z TEXTU, ač jsou data na dosah · mapa `CestyVse.astro` se neměří vůbec · slovníková
   kontrola hodnot `druh`/`interakce` · slabé testy `elektrovani`, `odpor-vodice`,
   `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Na řadě
   `vetveni-programu` (vývojový diagram) nebo `funkce-v-tabulkach`. Skillem `/simulace`.
3. Kvízy **nejsou priorita** (viz audit strategie níže).
4. **Obnovit `METRIKY-KOL.md`** — pořád mrtvý od 29. 7.

**⏳ ČEKÁ NA UČITELE** *(jediný živý seznam)*
- **Jakou generaci VEX IQ mozku škola má?** Stránka `co-umi-vex-iq` uvádí 12 portů na
  motory a čidla. U **starších Brainů si ale jeden port bere rádio**, takže volných
  zbývá 11; u novější generace je rádio vestavěné a platí 12. Nemám k tomu tvrdou kotvu —
  když jde o starší sadu, dopíšu na stránku závorku. *(Nález kontrolora, nízká závažnost.)*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (1. 8. 2026, večer — VÝKLADY + AUDIT KONTROL)

**Zadání učitele:** pokračovat samostatně podle tohoto souboru, pak udělat nezávislý
audit, navrhnout změny a jet dál. Vše níže je nasazené a ověřené (build + push + curl).

**A) Informatika — doplněno 8 krátkých výkladů, pod 700 znaků jich zbývá 7 (bylo 15).**
`projekt-muj-robot`, `tlacitka-naklon-zvuk`, `seznamy-a-promenne-v-projektech`,
`motory-displej-zvuk`, `funkce-v-tabulkach`, `senzory-robota`,
`vlastni-bloky-s-parametry`, `hra-honicka`. Výklad nově pokrývá i to, na co se ptal
kvíz a na stránce to nebylo. Dvě dávky, každá s nezávislým kontrolorem (26 nálezů).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ: web soustavně učil NÁZVY BLOKŮ, KTERÉ V ČESKÉ PALETĚ
> SCRATCHE NEJSOU** — „řekni" (správně **bublina**), „jdi na" (**skoč na**),
> „otoč se k" (**nastav směr k**), „zastav vše" (**zastav (všechno)**). Žák by scénář
> podle stránky nesestavil. Postiženo bylo **15 míst na 8 stránkách**.
> Nové měřidlo **`node testy/nazvy-bloku.mjs`** to hlídá trvale (bod 6e brány, tvrdá
> chyba), tabulka je opsaná z oficiální lokalizace a kontroluje jen celky, kde se
> opravdu programuje ve Scratchi — u LEGO robota a micro:bitu jsou tytéž obraty
> správně. *Past: první verze měřidla hlásila i zdravé „opakuj dokud **nenastane**".*

Další vážné nálezy kontrolorů (opraveno): ve scénáři **Honičky byla kontrola chycení
ZA blokem „opakuj stále"**, takže hra nikdy neskončila · sčítání 0,1 dává ve Scratchi
**3.0000000000000013** → proměnná počítá celé desetiny a na konci se dělí deseti ·
**micro:bit V2 má reproduktor přímo na desce** (text platil jen pro V1) ·
`=RANK(…)` potřebuje dva údaje, samotná oblast skončí chybou · u známek najde tu
**nejlepší MIN, ne MAX** · měkká záclona zvuk **pohltí**, neodrazí ho jinam.

**B) NEZÁVISLÝ AUDIT KONTROLNÍCH MECHANISMŮ — a co z něj je hotové.**
Auditor prověřoval, které kontroly mohou tiše lhát, a podvrhy v kopii repa to doložil.

1. ✅ **Tichá lež sekce 7 (deník).** Kontroly roků čtou text regulárními výrazy
   citlivými na tabulátory — po přeformátování jednoho souboru **celý rok tiše vypadl
   ze všech kontrol** a brána zůstala zelená (163 míst místo 209). Nově se počty
   z textu porovnávají s počty **ze skutečných dat**; rozdíl = chyba. Ověřeno podvrhem.
2. ✅ **Testy simulací nikdy neběžely hromadně.** Bylo jich 9, brána nespouštěla ani
   jeden a bez argumentu padaly. Nový spouštěč **`node testy/vsechny-simulace.mjs`**
   si komponentu odvodí z názvu testu, hlásí i **počet kontrol (244)** — „nula chyb"
   z nula kontrol je falešná nula — a běží v `prebuild` při každém buildu.
3. ✅ **Dva mrtvé aserty** v `meridla.mjs` (`ok(6 + 6 === 12, …)` a porovnání dvou
   vlastních konstant testu). Nově se čte, co simulace opravdu napsala na displej.
4. ✅ **`reostat.mjs` si načítal `reo-udaj2` a nikdy ho nepoužil** — čísla, která žák
   vidí, se nekontrolovala a podvrh se **7× větším proudem testem prošel**. Nově se
   displej porovnává s výpočtem. (Hned se ukázalo, že jezdec je 0–100 %, ne 0–1.)
5. ✅ **Rohatka porovnávala zaokrouhlená celá procenta** — do jednoho procenta se vešlo
   ~12 nových vadných otázek. Nově hlídá i **počet** otázek (dnes 965 z 2436).
6. ✅ **Chybějící roční opakování bylo neviditelné** (`continue` místo hlášky). Nově:
   stránka existuje, ale kvíz k ní ne = tvrdá chyba (překlep v klíči); ročník ho vůbec
   nemá = varování. **Našlo skutečnou mezeru: `pracovni-cinnosti/6-rocnik`.**

**C) DRUHÝ NEZÁVISLÝ AUDIT — STRATEGIE (kam se energie vyplácí dávat).**
Auditor měřil, kam za tři dny šla práce: simulace 25 %, měřidla 25 %, **kvízy 19 %**,
stav a dokumentace 14 %, deník 14 % — a **výklad 2,3 %** (198 řádků z 8 572).
Osm dávek dorovnávání kvízů = 6 h 38 min souvislé práce a 18 řádků výkladu.

Tři jeho nálezy jsem si ověřil sám a **platí**:
1. **69 % dorovnaných otázek byly slabé nápovědy pod 20 znaků** — přesně to, co audit
   z 31. 7. výslovně zakazoval („dorovnávat jen rozdíly ≥ 20 znaků"). Silných nápověd
   zbývá 208 neopravených. Cíl „33–40 %" byl navíc zčásti iluze: podlaha není 0, ale
   **27,7 %** (u 83 % otázek nějaká striktně nejdelší odpověď existuje).
2. **Rozdvojená fronta ve stavovém souboru byla příčinou špatné priority** — ověřeno,
   opraveno (viz sekce „POSTUP PRÁCE S KVÍZY" níže).
3. **Největší díra: „hluché stránky"** — ani obrázek, ani video, ani simulace **a k tomu
   výklad pod 1200 znaků**. Dnes jich je **36 ze 150** (informatika 21, fyzika 15).
   Nově se měří: `node testy/kratke-vyklady.mjs 1200` je označí 🕳.
   *Vlastní past při ověřování: napsal jsem si měření přes `!nazornost(p)`, jenže ta
   funkce vrací OBJEKT (vždy pravdivý) → „0 hluchých stránek". Falešná nula počtvrté.*

**FRONTA — čím pokračovat (v tomto pořadí; přerovnáno podle auditu strategie):**
0. **ZAVÍRAT HLUCHÉ STRÁNKY TEXTEM, po dávkách 5–6, informatika napřed.**
   Stav: **36 → 21** (tři dávky hotové 1. 8. večer; ve třetí `propojeni-a-externi-zarizeni`,
   `klonovani-animace-hry`, `opakovani-s-podminkou`, `sestaveni-a-oziveni-robota`,
   `vex-iq-navody`). Zbývá 21 — z toho 6 informatika, 15 fyzika.
   *Původní zápis: 36 → 31* (první dávka hotová 1. 8. večer: `zaverecny-projekt`,
   `digitalni-stopa-a-identita`, `plan-projektu-a-ladeni`, `bezpecnost-pocitace-a-dat`,
   `razeni-filtrovani-velka-data`). Nejlevnější práce s největším dopadem:
   ~23 řádků na podtéma proti ~360 řádkům za simulaci. Další na řadě podle
   `node testy/kratke-vyklady.mjs 1200` (označí je 🕳). **Kontrolor povinně.**

   > **Nálezy z první dávky, které stojí za zapamatování (kontrolor, 16 nálezů):**
   > Web tvrdil, že cvičný projekt „Souřadnice" je z učebnice **Scratch II** — není,
   > je to kapitola 8 učebnice **Scratch I**; Scratch II má „Nákupní seznam" (ověřeno
   > v obsahu učebnice i v souborech ke stažení). · Napsal jsem, že častá chyba je
   > podmínka **za** blokem *opakuj stále* — jenže ten je **koncový blok** a nic se
   > za něj připojit nedá; skutečná chyba je podmínka **mimo** cyklus. · Tvrzení
   > „u nezletilých žádá o výmaz rodič" bylo **špatně** — žádat může i žák sám
   > (hranice 15 let se týká souhlasu se službami, ne práva na výmaz). · Pravidlo
   > zálohování **3–2–1** znamená dva různé **typy úložiště**, ne dvě místa. ·
   > Záloha není „jediná obrana proti ransomwaru" (proti zveřejnění ukradených dat
   > nepomůže) — je to nejspolehlivější cesta zpátky. · Odkaz na cvičná data vedl
   > na starou adresu s jiným názvem. · Stránka digitální stopy měla délkovou
   > nápovědu u **6 z 11** otázek (jedna 8,3×) — dorovnáno, blok je na nule.

   > **Druhá dávka (31 → 26): `orientovane-grafy-a-automaty`, `zabezpeceni-a-digitalni-stopa`,
   > `hardware-a-software`, `udalosti-a-vstupy`, `modely-a-schemata`.** Kontrolor opět
   > 16 nálezů. Nejzajímavější: českému signálu se **oficiálně říká žlutý, ne oranžový**
   > (bylo špatně ve výkladu i ve dvou otázkách) · tvrzení „bloky událostí začínají
   > slovem *po*" neplatí — `když (stopky) > ( )` je taky událost · „postava bez události
   > neudělá nic" má výjimku *když startuje můj klon* · u sdíleného souboru je „vidět"
   > a „číst" totéž (nově číst → komentovat → měnit obsah → měnit práva) · vzorové heslo
   > zveřejněné na webu už není vzor, který by někdo použil · odkaz na opocitacich.cz
   > je z části placený, což se teď píše rovnou. Délková nápověda 809 → **796** otázek.

   > **Třetí dávka (26 → 21).** Měřidlo názvů bloků dostalo čtyři nové vzory — a hned
   > našlo, že web učil „dotýká se okraje?" a „vytvoř klon", ačkoli paleta má
   > **„dotýkáš se okraje?"** a **„klonuj (sebe)"**. *Pozor, sám jsem si při tom vyrobil
   > další chybný tvar „dotýkáš se (okraj)?" — položka nabídky se jmenuje **okraje**,
   > ne okraj; odhalil to až kontrolor.* Další nálezy: klonů udrží Scratch nejvýš **300**
   > (pak blok nic nevyrobí a hra se rozbije) · tvrzení, že se na soutěž VIQRC „nedá
   > připravit dopředu", si odporovalo s výzvou na téže stránce · dvě otázky u robota
   > zkoušely testování po malých krocích, které na stránce nebylo · kvíz micro:bitu
   > netestoval to hlavní (stejné číslo skupiny) — otázka doplněna.
1. **Zbytek auditu kontrol** — nejlevnější body s největším dopadem:
   a) **zapojení simulací se čte z TEXTU, ačkoli data jsou na dosah** (`zkontroluj.mjs`
   ř. 25 načte `dataTemata` a už je nepoužije) — podtéma vzniklé programově kontrolu
   obejde; b) **mapa „všechna místa" (`CestyVse.astro`) se neměří vůbec** — 209 pinů,
   jiná funkce i jiné argumenty než mapa roku, čtyři jazykové mutace, a `rozmistiPopisky`
   popisek, který se nevejde, **zahodí** (měřit i to); c) **slovníková kontrola hodnot**
   `druh`/`interakce` — neznámá hodnota má být chyba, ne ticho (přesně tak vznikla
   falešná nula u `druh: 'obrazek'`; dnes `nazornost()` nezná `pdf`); d) slabé testy
   simulací podle mutačního testu: `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Doplnit zbývajících 7 krátkých výkladů** (`zaverecny-projekt`,
   `digitalni-stopa-a-identita`, `klid-a-pohyb-telesa`, `pocitacove-site-a-internet`…).
   Levné, dá se po kusech, **vždy nechat zkontrolovat kontrolorem** — u Scratche
   i micro:bitu se snadno napíše název bloku, který v české lokalizaci není.
3. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem.
   Na řadě `vetveni-programu` (vývojový diagram) nebo `funkce-v-tabulkach`
   (dá se hodně převzít z `TabulkaVzorceSimulace`). Vyrábět skillem `/simulace`.
4. Kvízy **nejsou priorita** — a systematické dorovnávání délkové nápovědy jako
   samostatný úkol auditor doporučil **zastavit**. Sahat na ně jen mimochodem, když
   se stejně otevírá blok kvůli výkladu, a jen na **silné nápovědy ≥ 20 znaků** —
   a to **prodlužováním distraktorů, ne krácením správné odpovědi** (zkracování už
   třikrát zkazilo obsah). Slabé pod 20 znaků nechat být, rohatka je hlídá.
5. **Obnovit `METRIKY-KOL.md`** (jeden řádek na kolo) — je mrtvý od 29. 7., tedy
   přesně od chvíle, kdy začal samostatný režim, takže se rozpočet kol řídí odhadem.

**✅ VYŘÍZENO 1. 8. 2026 večer — učitel rozhodl o všech otevřených dotazech:**
- **micro:bit:** škola má **V1 i V2** → výklad učí, jak je poznat, kvíz má na rozdíl otázku.
- **Topné spirály:** opraveno na **nichrom** (nikl + chrom). Konstantan zůstává tam, kam
  patří — u **rezistorů**, protože jeho odpor se s teplotou skoro nemění. Do tabulky
  měrných odporů přibyl nichrom (~1,1 Ω·mm²/m), aby bylo vidět, proč se spirála rozžhaví
  a přívodní měděný kabel zůstane studený.
- **Beztíže:** správná odpověď je nově **volný pád**. Výklad gravitační síly ten jev
  popisoval správně (astronauti kolem Země volně padají), jen ho nepojmenovával —
  doplněno včetně varování před omylem „beztíže = rovnováha sil" (kniha na stole).
- **Pracovní činnosti 6:** doplněno **roční shrnutí** (souhrnný kvíz ze všech 33 otázek
  Tinkercadu a SketchUpu, strop 40). Kontrola 6c je tím zelená.

> **Při tom se našla vada v samotné rohatce:** shrnutí se skládají z TÝCHŽ objektů
> otázek, takže se každá počítala tolikrát, v kolika shrnutích je zařazená. Přidání
> ročního opakování proto ohlásilo „zhoršení o 12 otázek", ačkoli nevznikla ani jedna
> nová. Nově se **každá otázka počítá jednou** → skutečný stav je **809** různých otázek
> s délkovou nápovědou, ne 953. Ověřeno obousměrně: jediná nová vadná otázka (809 → 810)
> bránu shodí.

**⏳ ČEKÁ NA UČITELE** — *uzavřeno 1. 8., k tomuto dni bylo všechno vyřízeno.
Živý seznam i živá fronta jsou VŽDY jen v nejhornější sekci souboru.*

> ✅ **Vyřízeno 1. 8. večer:** sekce „Když počítač zlobí" i její dvě kvízové otázky
> jsou na pokyn učitele přestěhované ze `zabezpeceni-a-digitalni-stopa` (inf. 7)
> na `hardware-a-software` (inf. 9) — v sedmém ročníku žádná stránka o hardwaru není.
> Text se na novém místě opírá o tři vrstvy, které stránka vykládá (hardware ·
> aplikace · systém). Obě stránky zůstaly nad hranicí 1200 znaků, otázek je pořád 2470.

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (1. 8. 2026, ráno — SAMOSTATNÁ PRÁCE)

**HOTOVO A NASAZENO (bod 1 a část bodu 2 noční fronty):**

1. **Popisky na mapách deníku — vyřešeno, ale příčina byla jinde, než říkala fronta.**
   Poznámka z noci tvrdila, že `CestyRok.astro` si popisky umísťuje vlastním kódem;
   **není to pravda** — používá `pripravPohledy()` → `rozmistiPopiskyPolozek()` stejně
   jako všechny mapy. Skutečná vada: **popisek domova („jižní Čechy") se kreslil napevno
   pod domeček ÚPLNĚ MIMO rozmisťovač**, takže ležel na cizím pinu v **sedmi letech z osmi**.
   Nově ho umísťuje týž kód; místo navíc zabírá i odznak počtu u shluku a domeček sám.
   Nouzová varianta už nebere prvního kandidáta naslepo, ale toho s nejmenším překryvem
   (přetečení výřezu váží 12×), přibyl prstenec pozic kolem značky a třetí velikost písma.
   Kotva: nové měřidlo `testy/mapa-popisky.mjs` — **182 pohledů, 0 nálezů**; podvrh jich
   najde 282. Běží **v bráně při každém buildu**. Ověřeno i okem (2021, 2022) a curlem.

   > **Past, do které jsem sám šlápl a stojí za zapamatování:** měřidlo nejdřív volalo
   > `pripravPohledy` BEZ domova, takže popisek domova vůbec neměřilo a hlásilo „0 nálezů" —
   > **falešná nula**. Kontrola musí volat funkci se STEJNÝMI argumenty jako stránka.
   > Druhá past: kroužek shluku je jen OBRYS, uvnitř jsou vidět tečky míst. Když se bral
   > jako plný kotouč, jméno nemělo kam jít a odlétlo 30 jednotek od své značky.

2. **Kvízy — dorovnáno pět nejhorších bloků, 59 % → 56 %** (67 otázek).
   `vnimani-barev` 14/16 → 0, `tepelna-vymena-a-teplo` 15/17 → 0, `kmitani-a-vlneni`
   12/14 → 0, `energeticka-hodnota-potravin` 10/12 → 0, `zaverecny-projekt` 9/10 → 0.
   Nezávislý kontrolor nenašel věcnou chybu; dvě drobnosti opraveny — výklad energetické
   hodnoty nově říká, že mozek využívá **elektrickou** energii (kvíz se na to ptal, na
   stránce to nebylo). **Rohatka se sama utáhla na 56 %.**
   Nové měřidlo **`testy/delky.mjs`** vypíše konkrétní otázky i rozdíl v znacích:
   `node testy/delky.mjs vnimani-barev`.

3. **Druhá dávka kvízů hotová — 56 % → 54 %** (dalších 49 otázek): `elektricke-pole`,
   `vznik-elektrickeho-proudu`, `magneticke-pole-vodice-a-civky`,
   `jaderny-reaktor-elektrarna`, `obnovitelne-a-neobnovitelne-zdroje` — všechny na nule.
   Kontrolor opět nenašel věcnou chybu, zato **tři vysvětlení prozrazovala odpověď na
   SOUSEDNÍ otázku** (Oersted, střídavý proud „máme ho v zásuvce", „jsou nevyčerpatelné")
   a jedna otázka prozrazovala odpověď svým vlastním zněním („Jak se **přitahují**
   nesouhlasně nabitá tělesa?"). Opraveno. **Tohle hledej v každé další dávce** —
   je to častější vada než špatná délka.

4. **Třetí dávka kvízů hotová — 54 % → 51 %.** `odraz-svetla` (17/21),
   `optika-rovinneho-zrcadla`, `spalovaci-motory`, `seznamy-a-promenne-v-projektech`,
   `bezpecnost-pocitace-a-dat` — všechny na nule. **Celkem 15 bloků, 59 % → 51 %.**
   Kontrolor našel tři drobnosti: výklad odrazu světla nevysvětloval **odrazku na kole**
   (kvíz se na ni ptal), vysvětlení u ransomwaru prozrazovalo pozdější otázku o záloze
   a otázka „K čemu je rozptyl světla **dobrý**?" prozrazovala odpověď svým zněním.
   Opraveno; výklad má nově odstavec o koutovém odražeči.

5. **Čtvrtá dávka kvízů — 51 % → 49 %. Celkem 20 bloků, 59 % → 49 %.**
   Dorovnáno `skupenstvi-latek`, `modely-a-schemata`, `vetveni-programu`.
   **DVA bloky se musely PŘEPSAT, ne dorovnat** — vznikly slepením dvou dávek:
   `microbit/propojeni-a-externi-zarizeni` měl **čtyři duplicitní páry z deseti**
   (dvakrát piny, dvakrát rádio, dvakrát měření času, dvakrát propojení) a
   `roboticka-stavebnice/projekt-muj-robot` **tři páry** — 6 otázek pokrývalo 3 fakta.
   Ten druhý jsem sám přehlédl, našel ho až kontrolor. **Před dorovnáváním bloku si
   proto vždycky nech vypsat VŠECHNY jeho otázky, ne jen ty s délkovou nápovědou.**

6. **Pátá dávka — 49 % → 47 %. Celkem 24 bloků, 59 % → 47 %.**
   `telesa-stejnoroda-a-nestejnoroda`, `casticove-slozeni-latek`, `teplotni-roztaznost`,
   `teplo-a-premeny-skupenstvi`. V částicovém složení byl další duplicitní pár (dvakrát
   šíření vůně difuzí) — vyměněn za difuzi v pevných látkách, která je ve výkladu, ale
   v kvízu chyběla. **Kontrolor: 0 nálezů** (přepočítal i kolejnici 3 mm).
   Nový nástroj **`node testy/vypis-kviz.mjs <blok>`** vypíše VŠECHNY otázky bloku —
   délkové měřidlo duplicity neukáže.

7. **Šestá dávka — 47 % → 44 %. Celkem 28 bloků, 59 % → 44 %.**
   `oko-vady-oka`, `jaderna-energie-a-reakce`, `kulova-zrcadla-dute-zrcadlo`, `teziste`.

   > **⚠️ NEJDŮLEŽITĚJŠÍ POUČENÍ CELÉHO DOROVNÁVÁNÍ (nález kontrolora 1. 8.):**
   > Přílišné zkracování správné odpovědi ji dokáže ZKAZIT. Dvakrát se to stalo:
   > „skutečný, převrácený, **zmenšený**" zkráceno na „skutečný a převrácený" —
   > jenže zmenšený je JEDINÝ znak, který ten případ odlišuje od předmětu mezi
   > r a f; a „**širší postoj**, nižší těžiště" zkráceno na „nižší těžiště",
   > čímž vypadla polovina odpovědi na otázku o brankáři.
   > **Krátit se smí jen vata, nikdy rozlišující znak. Když správná odpověď vyjde
   > nejdelší, PRODLUŽ DISTRAKTORY — nekrať ji.**

   Dále vyměněna otázka „Kdo má těžiště obvykle níž? → ženy" (mimo učivo, navíc
   stereotyp) za soutěžní auta z výkladu.

8. **Sedmá dávka — 44 % → 42 %. Celkem 32 bloků, 59 % → 42 %.**
   `archimeduv-zakon`, `telesa-a-latky`, `var`, `elektricke-obvody`.
   Kontrolor **potřetí** našel vadu ze zkracování: „mléko je látka, láhev **s mlékem**
   je těleso" zkráceno na „mléko látka, láhev těleso" — tím se posunul význam a odpověď
   si začala protiřečit s vlastním vysvětlením. Druhý nález: čtyři otázky Archimédova
   zákona (loď, ponorka, slaná voda, balon) zkoušely učivo, které na stránce nebylo →
   výklad dostal novou sekci „Kde to potkáš" (mazat dobré otázky by byla škoda).

9. **✅ Osmá dávka — CÍL SPLNĚN. Délková nápověda 59 % → 40 %, celkem 36 bloků.**
   Cíl z původního zadání byl 33–40 %. `elektricky-proud-v-kovech-odpor`,
   `elektromagnet`, `elektromagneticka-indukce`, `vlastnosti-stridaveho-proudu`.
   Kontrolor našel 7 nálezů, tři závažné (definice elektromagnetu ztratila slovo
   „**měkká**"; dvě vysvětlení byla doslova odpovědí na pozdější otázku téhož bloku).
   Výklad střídavého proudu nově vysvětluje, proč žárovka nebliká.

10. **Informatika — první krok k názornosti: hra „Chytej jablka" dostala simulaci**
   (recyklace `PromenneSimulace`, jeden řádek v datech). Hra stojí na proměnné skóre
   a její typická chyba je chybějící „nastav skóre na 0" — přesně to simulace ukazuje.
   Kotva: stránka má simulaci v HTML a `nazornost.mjs` už tu mezeru nehlásí.
   **Ostatní hry recyklaci nedostaly** (bludiště, honička, ping-pong, střílečka,
   skákačka) — scéna je o jablkách a jinde by si protiřečila s učivem stránky.
   Automaty prověřeny: všechny LaunchAgenty končí nulou, jen `pip-audit` vrací 1,
   což je jeho normální chování při nálezu (torch — čeká na učitele).

11. **Uzavřen další bod z fronty auditu: „číslo ve správné odpovědi, které není
    ve výkladu".** Nová kontrola `testy/cisla-ve-vykladu.mjs` běží v bráně.
    Doplněno do výkladu: rychlost světla ve vodě ~225 000 km/s a ve skle ~200 000 km/s ·
    scéna Scratche je 480 × 360 bodů · displej micro:bitu má 5×5 = **25** světýlek ·
    svislý a vodorovný směr svírají 90°.

    > **Měřidlo samo bylo nejdřív špatně** (a je to už potřetí, co se to stalo):
    > první verze našla 34 případů, ale 20 z nich byly **výsledky početních úloh**
    > (60 N, 800 kg, 40 °C) — ty ve výkladu být nemají, žák si je spočítá. Druhý zdroj
    > falešných poplachů byla **shrnutí**, která vlastní výklad nemají. Po zpřísnění
    > (přeskoč otázky s čísly v ZADÁNÍ a bloky shrnutí) zbyly 4 skutečné nálezy.
    > Ověřeno obousměrně podvrhem.

12. **Výklad `vetveni-programu` doplněn + VĚCNÁ OPRAVA názvu bloku.**
    Nezávislý kontrolor upozornil, že blok „a zároveň" v českém Scratchi 3 neexistuje.
    Ověřeno ve zdroji pravdy (`scratch-l10n`, `editor/blocks/cs.json`):
    **OPERATORS_AND = „%1 a %2"** — blok se jmenuje prostě **„a"**, dál „nebo" a „ne".
    Web to učil špatně na třech místech (výklad, odpověď v kvízu, vysvětlení) — žák
    by blok v paletě Operátorů nenašel. Opraveno. *(Pozor: „a zároveň" jako běžné
    české spojení je jinde v textech v pořádku — opravovat jen NÁZVY BLOKŮ.)*
    Nové měřidlo **`node testy/kratke-vyklady.mjs [mez]`**: 16 podtémat má výklad
    pod 700 znaků, skoro samá informatika — potvrzuje audit.

**FRONTA — čím pokračovat:**
0. **DOPLŇOVAT KRÁTKÉ VÝKLADY INFORMATIKY** — levnější a hned užitečné, na rozdíl
   od nové simulace se dá dělat i po malých kusech. Nejkratší: `projekt-muj-robot`
   (536), `tlacitka-naklon-zvuk` (566), `seznamy-a-promenne-v-projektech` (572),
   `funkce-v-tabulkach` (584), `motory-displej-zvuk` (592), `senzory-robota` (595).
   **Vždy nechat zkontrolovat kontrolorem** — u Scratche i micro:bitu se snadno
   napíše název bloku, který v české lokalizaci neexistuje.
1. **Kvízy už NEJSOU priorita** — cíl 33–40 % je splněn a rohatka hlídá, aby se to
   nezhoršilo. Dorovnávat dál jen mimochodem, když se stejně sahá do bloku.
2. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem).
   Na řadě: `vetveni-programu` (inf. 7) — vývojový diagram, žák přepne podmínku
   a vidí, kudy to teče; nebo `funkce-v-tabulkach` (inf. 8), kde se dá hodně
   převzít z hotové `TabulkaVzorceSimulace`. Vyrábět skillem `/simulace`.
3. Kontrolovat i to, co běží samo (hlídač deníku, pečlivá videa).

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

`node testy/vypis-kviz.mjs <blok>` (vypíše VŠECHNY otázky — hledej duplicitní páry,
délkové měřidlo je neukáže) → `node testy/delky.mjs <blok> --odpovedi` (znění
i délky, dorovnává se bez čtení celého souboru) → opravit → kontrolor → brána →
build → push. Hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
třikrát zachytila, že se týž řetězec v souboru vyskytuje vícekrát nebo vůbec.

> Pozn. 1. 8. 2026: pod tímhle nadpisem byla **podruhé zapsaná fronta úkolů**, která
> si protiřečila s frontou nahoře — a právě podle ní se ráno jelo dorovnávat kvízy,
> ačkoli audit z 31. 7. říkal, že skutečná díra je jinde. Nález auditora strategie.
> **Živá fronta i otevřené dotazy na učitele jsou VŽDY jen v nejhornější sekci.**

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 23:20 — SAMOSTATNÁ NOČNÍ PRÁCE)

**Učitel jde spát a zadal: pracuj samostatně dál, sám si kontroluj, co je podle domluvy
potřeba dodělat — na škole i na webu cesty. Bez ptaní.** Rozpočet: ~12 kol, pak /clear.

**FRONTA PRÁCE (v tomto pořadí):**
1. **Popisky míst na mapě ROKU se překrývají.** Ve Vogézách jsou čtyři místa do 3,4 jednotek
   od sebe (Salbert, Le Thillot, Rupt-sur-Moselle, Saint-Maurice) a žádné nemá `popisekPosun`.
   Příčina: `rozmistiPopisky()` z `src/data/cesty/mapa.ts` používá **jen `CestyVse.astro`**;
   `CestyRok.astro` si popisky umisťuje vlastním kódem, který překryv neřeší. Buď na mapě
   roku použít tutéž funkci, nebo doplnit ruční posuny. Ověřit VÝPOČTEM překryvu obdélníků
   (vzor `ramecek()` v mapa.ts), ne okem.
2. **Škola — dorovnávat kvízy** (uhodnutelnost 59 %). Podle brány: `zaverecny-projekt` (9/10),
   `tepelna-vymena-a-teplo` (15/17), `vnimani-barev` (14/16), `kmitani-a-vlneni` (12/14),
   `energeticka-hodnota-potravin` (10/12). Postup a pasti níže; v každém bloku hledat
   i duplicitní páry otázek a otázky na učivo, které na stránce není vyloženo.
3. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem).
4. Kontrolovat i to, co běží samo: `node zkontroluj.mjs` po každé změně, hlídač deníku
   běží hodinově a nasazuje sám.

**HOTOVO 31. 7. v noci (jen na vědomí):**
- **Longevelle sur Doubs 2025** — nárok Content ID byl na PŮVODNÍM zvuku (video z 2025,
  automat se ho nedotkl). Nová verze s jinou hudbou, úvodní mapou (850 km ≈ 4 082 Kč)
  a titulkem místa: https://youtu.be/-l7f6ja0rR4 ; originál přepnut na soukromý.
  Obraz bitově shodný s anonymizovanou verzí (kotva = md5 video stopy).
- **Denní strop nahrávání na YouTube opraven** — dnes odešlo 5 videí místo 2, protože každý
  automat počítal jen svá. Nově společné počítadlo a strop **2/den z tohoto Macu**
  (druhý profil radekmicek nahrává až 3 denně a čerpá tutéž kvótu 10 000 jednotek).
- **Le Bourg-d'Oisans už je na YouTube** (nezařazený, 21:18) BEZ názvů přibalených míst —
  nezveřejňovat, dokud nevznikne přestavěná verze. V `KE-SCHVALENI.md`.
- Doplněny **francouzské popisy** Livet-et-Gavet a Col d'Ornon → všech 12 míst 2026 má cs/en/de/fr.
- Nasazeno: odkazy na videa u míst (Frangy, Vaulnaveys, Livet-et-Gavet) + automat `videa_na_web.py`.
- Škola: meteorologie F7 — uhodnutelnost 19/21 → 4/21, výklad doplněn, tři věcné chyby opraveny.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 18:30 — INFORMATIKA + DENÍK)

**ZADÁNÍ UČITELE 31. 7. večer: „kde to lokálním modelům nejde, převezmi to sám"
a „jeď dál, šetři tokeny".** Podle toho:
- **49 překladů popisů míst přeložil člověk** (lokální smyčka je 11 h zamítala) →
  **156/156 míst má popis v cs, en, de i fr.** Zapsáno přes `zapis_popisy.py`, který
  nově umí i překlady (`{"slug": {"en": …}}`) pod týmž zámkem.
- Pojistky proti opakování: `POKUSU_NA_PREKLAD = 3` v `popisy_mist.py` · sdílený zámek
  modelu v `pecliva_videa.py` · **otisk výsledného videa jako kotva** (shodný otisk =
  kolo se nepočítá) · chybová hláška ukazuje návratový kód místo konce stderru.
- **Rohatka na kvízy** (`testy/rohatka.json`): zhoršení SHODÍ build, zlepšení laťku
  utáhne samo. Ověřeno obousměrně.
- **Měřidlo délkové nápovědy nadhodnocovalo** — počítalo i remízy, takže otázka
  „značka proudu: I / U / R" (všechny 1 znak) se vykazovala jako uhodnutelná; takových
  je 103. Nově se počítá jen STRIKTNĚ nejdelší → skutečný stav 65 %, ne 76 %.
- **Dorovnáno 11 bloků** (vnitřní energie, vypařování, senzory robota, hardware+software,
  sestavení robota, řazení a filtrování, plán projektu, přenos el. energie, kondenzace,
  elektrické obvody, ohodnocené grafy) → **77 % → 62 %**. U pěti z nich se přitom našly
  **duplicitní páry otázek** (3–4 páry z 10) — bloky vznikly slepením dvou dávek.
  **Dál dorovnávat:** `rezistor-s-promennym-odporem` (11/12),
  `meteorologie-a-mereni-tlaku` (19/21), `vlastni-bloky-s-parametry`, `zabezpeceni-a-digitalni-stopa`.
- **VĚCNÁ CHYBA opravena:** výklad i kvíz fyziky 9 tvrdily, že dálková vedení jsou
  **měděná**. Přenosová vedení VVN jsou hliníková lana s ocelovým jádrem (AlFe) —
  měď je při stejné vodivosti asi 3× těžší a prohnula by stožáry. Opraveno i s důvodem.
- Pozn. k dorovnávání: otázky mají v `kvizy.ts` dva formáty (jednořádkový a víceřádkový).
  Skript, který hledá `odpovedi: […]` jen do konce řádku, ty víceřádkové **tiše minul** —
  hlásil „nešlo" u 4 z 18. Hledat v úseku ~700 znaků od textu otázky, ne do `\n`.

> **ODLOŽENO — anonymizace videa žere 19–32 GB a systém proces zabíjí (signál 9).**
> Tři pokusy: (1) sdílený zámek modelu, aby neběžela souběžně s Ollamou (nasazeno,
> správné, ale nestačí), (2) uvolnění modelu z paměti přes `keep_alive: 0` (uvolnilo
> 44 GB, proces přesto zabit), (3) krájení videa na 30s kousky místo 120s
> (`DELKA_KOUSKU_S`, složky nesou délku v názvu — `zdroj30s`, `anonym30s`, nic se
> nemaže). Ani po zkrácení paměť neklesla, naopak 32 GB. Data se přitom nedrží —
> `detekce_syrove` má jen souřadnice. **Podezření: paměť roste s počtem volání
> insightface na snímek** (3030 volání na video), tedy únik v modelu/ort, ne v našem
> kódu. **Další nápad k vyzkoušení:** `--krok 2` nebo 3 (analyzovat každý druhý/třetí
> snímek; okno ±5 snímků při rozmazávání to pokryje) → 2–3× méně volání modelu.

**DENÍK — NÁLEZ 31. 7. večer: smyčka vracela učiteli NEZMĚNĚNÝ soubor.** Učitel po
opravách hlásil, že video vypadá stejně (rozmazaná střecha, lavička, terasa i manželka).
Příčina nebyla v anonymizaci: `zamitnuto()` vynulovalo nálezy a kola > 1 vybírají kousky
k přepracování **podle nálezů**, takže vyšlo „přepracovávám **0 z 1** kousků" a kontrolor
znovu odkýval týž soubor z 5:28 ráno — tedy verzi vyrobenou ještě PŘED opravou v 16:25.
Opraveno: zamítnutí učitelem vrací smyčku na **kolo 0** (celé video, výchozí práh —
opravoval se kód, ne citlivost; přitvrzování prahu by tu bylo proti smyslu připomínky,
protože rozmazává víc) a prázdný seznam kousků se nikdy nebere jako „není co dělat".
Video se od 18:09 přepracovává celé; kotva = otisk `anonym/kousek_000.mp4` před během
byl `6e4132c7…`, po doběhnutí musí být JINÝ. Pak učitel odklikne `--schvaleno`/`--zamitnuto`.
**Pravidlo napříště: hlášku automatu neber jako důkaz — porovnej otisk souboru.**
- **K revizi zbývají 2 videa:** `Schongau_DE` (94 MB) a `Le_Bourg-dOisans_v2` (248 MB).
  Le Bourg se ještě přestaví — jeho média se změnila a čeká na Le Lavandou (13 médií
  z ručního vkladu, uzavře se 6. 8. podle pravidla 7 dní).
- **Čeká na učitele:** sloučit dvě složky Geisingen (v `KE-SCHVALENI.md`) — ta
  s neviditelnými znaky v názvu je podmnožina `Geisingen_DE`, automat z ní videa nedělá.
- Reference tváří: **56 učitel, 62 manželka** (ráno 13 a 31). Roky 2021 a 2022 pro
  učitele NEEXISTUJÍ — ověřeno měřením, ve videích není (drží kameru).

**ŠKOLA — hotovo `microbit/oziveni-a-led-displej`** (inf. 8): `LedDisplejSimulace` —
displej 5×5 na klikání, dva obrázky, animace jejich střídáním. Dvě pointy: ze **dvou
stejných** obrázků animace nevznikne, a tentýž program v bloku **„po spuštění"** jednou
doběhne a zůstane stát. Test `testy/simulace/led-displej.mjs` (47 kontrol, obousměrně
ověřen podvrhem). Kvíz přepsán: měl **4 duplicitní páry z 10 otázek** a správná odpověď
byla nejdelší u 9 z 10 (nově 5 z 10, největší rozdíl 7 znaků). Výklad doplněn o `pauza
400 ms` a rozdíl obou bloků — kvíz se na to ptal, ale na stránce to nebylo.
**Další na řadě:** `vetveni-programu` (inf. 7) nebo `funkce-v-tabulkach` (inf. 8).

> **Past (nález kontrolora 31. 7.):** displej po zastavení programu skákal na obrázek,
> do kterého se KRESLÍ — tedy se obraz změnil přesně proti větě, kterou si žák právě
> přečetl. Zastavení proto nově přepne kreslení na ten obrázek, který svítil. A pozor
> na **tautologický test**: `ok(a !== b || true, …)` hlásí ✅ vždycky. Kontrolor ho našel,
> já ho pak při přepisu omylem napsal podruhé — grepovat `|| true` v testech.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 13:50 — INFORMATIKA)

**VĚTŠÍ ZMĚNA Z AUDITU JE HOTOVÁ.** Kontroly nově čtou **skutečná data** přes
`testy/data.mjs` (esbuild → `import`), ne text souboru. Brána i měření názornosti nad
tím běží, brána se pouští při každém `npm run build` (`prebuild`) a byla ověřena
**obousměrně** (podvrh se najde, zdravý stav nehlásí nic). Nová kontrola 6c hlídá, že
každé podtéma s kvízem je zastoupené v ročním opakování. Brána teď vidí **2436 otázek
ve 164 blocích** (dřív tvrdila 2084).

> **Pravidlo pro každou další kontrolu:** piš ji nad `nactiData()`, nikdy nad textem
> souboru. Vzory nad textem si nech jen na kontrolu ZAPOJENÍ (import v `.astro`, řádek
> s vykreslením, union typ) — tam je předmětem kontroly opravdu zdrojový kód.

**TEĎ SE DĚLÁ INFORMATIKA** — podle auditu je to největší díra na webu:
47 podtémat, jen 5 simulací a **ani jedno podtéma s obrázkem či videem**.

| ročník | bez názornosti | simulací |
|---|---|---|
| informatika 7 | 14 z 18 | 4 |
| informatika 8 | 16 z 18 | 2 |
| informatika 9 | 10 z 11 | 1 |

**Hotovo:**
- `adresy-bunek-a-vzorce` (inf. 8) — `TabulkaVzorceSimulace`. Úloha přímo z výkladu: sloupec
  cen v € a kurz v B1. S `$B$1` vyjde 100/300/500/1000 Kč, s relativním `B1` se odkaz posune
  na předchozí VÝSLEDEK a čísla se lavinovitě rozjedou (100 → 1200 → 24 000 → 960 000).
- `souradnice-a-kresleni` (inf. 7) — `SouradniceSimulace`. Scéna −240…240 × −180…180, klikání,
  posun po 10 (i šipkami), pero, cíle a program čtverce krok po kroku. Pointa je **záporné y
  = DOLŮ**. Mřížka je po 50, aby rohy čtverce (±50) padly na linky. Test `testy/simulace/
  souradnice.mjs` (51 kontrol). Výklad doplněn o kreslení otáčením + pravidlo 360 : počet stran.

- `promenne` (inf. 7) — `PromenneSimulace`. Krabička `skóre` + okénko na scéně jako ve
  Scratchi, program „seber tři jablka" krok za krokem. **Pointa: program jde přepnout na
  verzi BEZ bloku `nastav skóre na 0`** — napoprvé vyjde taky 3, podruhé 6, potřetí 9;
  tím se vysvětlí, proč hra po restartu začíná s cizím skóre. Test 26 kontrol.

**Návrh dalších simulací informatiky (v pořadí užitku):**
1. `microbit/oziveni-a-led-displej` (inf. 8) — mřížka 5×5 LED, žák kreslí a spustí
   animaci střídáním dvou obrázků.
3. `vetveni-programu` (inf. 7) — vývojový diagram, žák přepne podmínku a vidí, kudy to teče.
4. `funkce-v-tabulkach` (inf. 8) — SUMA/PRŮMĚR/MAX nad malou tabulkou (naváže na hotovou
   TabulkaVzorceSimulace, dá se z ní hodně převzít).
5. `orientovane-grafy-a-automaty` (inf. 7) — automat jako kolečka a šipky, žák posílá vstup.

> **Past ověřená 31. 7.:** u simulace ke Scratchi VŽDY použít **české názvy bloků podle
> Scratche 3** (`pero zapni` / `pero vypni` / `smaž`, `dopředu (100) kroků`), ne doslovný
> překlad anglických („pero dolů"). Kvízy na webu už české názvy používají, takže doslovný
> překlad si se stránkou protiřečí — a žák blok v paletě nenajde. Zdroj pravdy: scratch-l10n.
> Druhá past: **tlačítko přepínače musí pojmenovávat AKCI** („zapnout pero"), ne stav —
> jinak na něm při kreslení stojí „pero nahoru". Stav patří slovy do stavového řádku.

**Pozor u informatiky na dvě věci:** (a) `senzory-robota` má ČTYŘI duplicitní páry otázek
z deseti — chce přepsat celý blok podle výkladu, ne jen dorovnat délky; (b) informatika má
nejkratší výklady na webu (medián ~700 znaků), takže u některých podtémat je potřeba spíš
doplnit TEXT než přidat simulaci.

**Zbytek fronty z auditu** (neztratit):
- **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet otázek
  s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
- Dorovnávat jen **449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý efekt.
- Levné kontroly: výklad pod ~700 znaků · číslo ve správné odpovědi, které není ve výkladu
  (58 případů).
- K ověření učitelem: otázka „Co je stav beztíže? → působící síly jsou v rovnováze"
  (fyzika 7) — beztíže je volný pád, ne rovnováha sil.


## ⏩⏩⏩⏩⏩⏩ AUDIT STRATEGIE (31. 7. 2026, 12:40) — ČTI JAKO PRVNÍ

Učitel zadal: *„udělej celkový nezávislý audit, jestli je strategie správná — někdy příliš
záplat nedá dobrý výsledek a je třeba jedna větší změna."* Běželi **dva nezávislí auditoři
s různými otázkami**. Závěr: **architektura je v pořádku, velký přepis by byl zbytečný.
Špatná byla TRIÁŽ a hlavně MĚŘIDLA.**

**Co je ověřeno a nemá se měnit:** výkon (72 kB HTML, 7 kB CSS po gzipu na 405 stránek —
poběží i na školním tabletu) · univerzální šablona simulací se nevyplatí (jen 8 % zdroje
je sdílitelný styl, 74 % je scéna a fyzika) · zapojení simulace přes 4 místa brána spolehlivě
hlídá · testy simulací přes `node:vm` jsou tvrdá kotva.

**Hlavní poučení: NEVĚŘ VLASTNÍM MĚŘIDLŮM, DOKUD JE NĚKDO NEPROVĚŘÍ.**
Všechny tři kontrolní skripty četly TypeScript **regulárními výrazy místo dat**:
1. `testy/nazornost.mjs` hledal `druh: 'obrazek'` — ta hodnota v datech **není ani jednou**,
   správně je `'infografika'` (23×). Infografiky se nikdy nepočítaly → fyzika 7 hlásila
   5 mezer, ve skutečnosti 2. **Opraveno.**
2. `zkontroluj.mjs` hlásí **2084 otázek, ve skutečnosti jich je 2426** (import dat přes
   esbuild). 14 bloků shrnutí (342 otázek) nevidí vůbec, protože se skládají programově.
   **ZATÍM NEOPRAVENO — viz fronta níže.**
3. Odsazení bloku `elektrina` v `temata.ts` je o tabulátor jiné, takže naivní regex
   napočítá 22 podtémat místo 37.
→ **Pravidlo do budoucna: kontroly mají číst DATA (esbuild → `import`), ne text souboru.**
   `esbuild` je v `node_modules`, import trvá ~10 ms. Vzor je v commitu tohoto auditu.

**Co se z auditu udělalo hned:**
- Brána běží při každém buildu (`"prebuild": "node zkontroluj.mjs"`) — dosud jen z dobré vůle.
- **Roční opakování nepokrývalo všechna podtémata.** Souhrnný kvíz bere otázky po kolech
  do stropu; když je strop < počet podtémat, poslední témata se do opakování **nedostanou
  nikdy** (fyzika 8: 35 podtémat, strop 30 → vypadával celý celek `zvuk`). Navíc v seznamu
  celků informatiky chyběly `hry-ve-scratchi` a `vex-iq`, takže **144 otázek přidaných
  v předchozí session se do opakování nedostalo vůbec.** Opraveno, ověřeno importem dat.
- **Tištěný test šel složit hádáním na známku 2.** Strategie „vyber nejdelší odpověď" má
  úspěšnost 72 %, tedy ~5 ze 7 otázek. Test teď losuje přednostně z otázek bez délkové
  nápovědy → kleslo na ~3,8 ze 7. **Není to oprava dat**: ve 148 ze 164 bloků není ani
  7 čistých otázek.
- **Recyklace místo psaní nových simulací** (1 řádek místo ~200): `energie-a-jeji-premeny`
  ← `skatepark`, `teplo-a-premeny-skupenstvi` ← `ohrev`, `elektricky-naboj` ← `elektrovani`,
  `elektricke-obvody` ← `obvod`. Mezer názornosti ve fyzice 8: **22 → 13**.

**Tři návrhy auditora ZAMÍTNUTY po vlastní kontrole** (nepřebírat je příště bez ověření):
`tuhnuti` ← `ohrev` a `kondenzace` ← `vyparovani` by ukazovaly OPAČNÝ směr děje, než se
probírá (porušuje pravidlo o logické scéně); `vykon` ← `prace` nepokrývá výkon vůbec.

**FRONTA — co z auditu zbývá, v pořadí užitku:**
1. **Přepsat `zkontroluj.mjs` a `nazornost.mjs` na import dat přes esbuild.** Zruší tři
   nezávislé regexové parsery téhož souboru a odstraní zdroj falešných čísel. *Tohle je
   ta „jedna větší změna", na kterou se učitel ptal — zbytek jsou opravdu jen záplaty.*
2. **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet
   otázek s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
3. **Dorovnávat jen 449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý
   efekt. Zkracovat správnou odpověď a přebytek dávat do `vysvetleni`.
4. Levné strojové kontroly: podtéma bez zastoupení v ročním shrnutí · výklad pod ~700 znaků ·
   číslo ve správné odpovědi, které není ve výkladu (58 případů) · shoda počtu otázek
   podle parsování a podle importu.
5. **Skutečná díra není ve fyzice, ale v informatice:** 47 podtémat, 5 simulací, medián
   výkladu ~700 znaků a **ani jedno podtéma nemá obrázek či video**. 39 podtémat má
   simulaci a přitom výklad pod 1200 znaků — energie šla do simulací místo do textu.
6. K ověření učitelem (neopravovat potichu): otázka „Co je stav beztíže? → působící síly
   jsou v rovnováze" (fyzika 7) — beztíže je volný pád, ne rovnováha sil.

## ⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 11:15 — ŠKOLA: názornost fyziky 8, čti jako první)

**Zadání učitele:** „Média k fyzice 8 (22 podtémat bez obrázku/videa), stránky jsou textové,
chybí názornost." Číslo ověřeno skriptem: fyzika 8 má **37 podtémat a 22 z nich nemá ani
obrázek, ani video, ani simulaci**. Příčina: `public/materialy/fyzika/` obsahuje jen
**6-rocnik a 7-rocnik** — pro osmičku a devítku tam není ani jeden soubor.

**Měření názornosti napříč webem** (skript, dá se zopakovat — viz níže):

| ročník | bez názornosti / celkem |
|---|---|
| fyzika 6 | 6 / 21 |
| fyzika 7 | 5 / 33 |
| **fyzika 8** | **22 / 37** ← řeší se |
| fyzika 9 | 10 / 25 |
| informatika 7 / 8 / 9 | 15/18 · 17/18 · 10/11 |
| pracovní činnosti 6 | 2 / 2 |

**Zvolený postup** (fotky ani videa vyrobit neumím — ty dodává učitel a YouTube automat;
umím ale simulace a infografiky jako kód, což je u elektřiny názornější než obrázek):
elektřina má 12 z těch 22 podtémat a je nejabstraktnější, proto se začalo tam.

**HOTOVO 31. 7. (5 z 22 podtémat, nasazeno a ověřeno curl):**
- `MeridlaSimulace` — ampérmetr do série, voltmetr paralelně + **oba chybné způsoby**
  (`elektricky-proud-mereni`, `elektricke-napeti-mereni`)
- `OdporVodiceSimulace` — R = ρ·l/S včetně vlivu teploty
  (`elektricky-proud-v-kovech-odpor`, `zavislost-odporu-na-vodici`)
- `ReostatSimulace` — týž jezdec jako reostat (proud) × potenciometr (napětí)
  (`rezistor-s-promennym-odporem`)

**ZBÝVÁ 17 podtémat bez názornosti** — návrh pořadí pro další kola:
1. `elektricky-naboj` + `elektricke-pole` (elektrování třením, přitahování, siločáry)
2. `elektricka-prace-a-vykon` + `vykon` (počítadlo kWh a korun podle skutečných spotřebičů)
3. `ucinky-proudu-a-bezpecnost` (infografika účinků + pojistka)
4. `elektricke-obvody`, `vznik-elektrickeho-proudu`, `chemicke-zdroje-napeti`
5. teplo: `tuhnuti`, `kondenzace`, `skupenske-zmeny-vody-v-prirode`, `teplo-a-premeny-skupenstvi`
6. `tepelny-motor-parni-stroj`, `energie-a-jeji-premeny`, `vnitrni-energie-telesa`
(`pololetni-shrnuti` a `rocni-shrnuti` názornost nepotřebují — jsou to rozcestníky s kvízem.)

**Jak si měření zopakovat:** projít `temata.ts` a u každého podtématu se ptát, jestli má
`interakce`/`interakce2`, materiál `druh: 'obrazek'` nebo `druh: 'video'`. **Past:** blok
`elektrina` má v `temata.ts` o jeden tabulátor jiné odsazení než ostatní celky, takže
naivní regex `^\t{5}slug:` ho přeskočí a napočítá 22 podtémat místo 37. Používej `^\t{5,}`.

**Poučení z tohoto kola — nezávislý kontrolor našel u první simulace 10 vad, dvě vážné:**
1. **Animace protiřečila vlastnímu textu.** U zkratu text tvrdil „proud žárovku obejde",
   ale tečky dál obíhaly hlavní smyčku skrz žárovku. Kdo kreslí schéma i text, snadno
   popíše, co zamýšlel, ne co je vidět.
2. **Jediná součástka v obvodu zabila didaktický smysl.** Napětí na žárovce se rovnalo
   napětí zdroje, takže správné (voltmetr paralelně) i chybné (v sérii) měření ukazovalo
   stejných 12 V — žák nemá jak poznat rozdíl. Opraveno na dvě součástky v sérii:
   6 V na žárovce z 12 V zdroje. **Pravidlo: simulace měření musí mít v obvodu aspoň dvě
   součástky, jinak se rozdíl nemá kde projevit.**
3. **Simulace předbíhala učivo.** Používala Ohmův zákon, který je v `temata.ts` až o dvě
   podtémata dál. Před nasazením ověřovat i POŘADÍ podtémat, nejen správnost.
   Test to teď hlídá strojově (v textech nesmí být „I = U / R" ani hodnota v ohmech).
4. Kontrolora neposlouchat slepě: navrhoval zvýšit zkratový proud na 8× kvůli názornosti,
   jenže při přemostění žárovky se proud přesně **zdvojnásobí** — necháno pravdivé 2 A.

**Druhé kolo kontroly (simulace odporu a reostatu) — 15 nálezů, 8 vážných. Poučení, která
platí pro KAŽDOU další simulaci:**
1. **Zjednodušený model si musí sednout se schématem.** Potenciometr počítal dělič
   naprázdno, ale na schématu na něm visela žárovka 10 Ω — zobrazená napětí byla až
   dvojnásobná proti skutečnosti. Řešení nebylo počítat zatížený dělič (tím by zmizela
   celá čísla), ale **dát na výstup voltmetr** — což je zároveň to, jak se potenciometr
   opravdu používá. **Když model něco zanedbává, schéma to musí zanedbání ospravedlnit.**
2. **Reostat a potenciometr mají protichůdné požadavky na čísla**: reostat potřebuje
   odpor drátu ≫ odpor spotřebiče, dělič naprázdno naopak. Čísla se musí navrhnout
   pro každý režim zvlášť (teď: 12 V, drát 40 Ω, žárovka 10 Ω, krok jezdce 25 %).
3. **Obvod na schématu musí být UZAVŘENÝ.** Chyběl vodič od spotřebiče ke spodní
   kolejnici — dítě hledá uzavřenou smyčku jako první věc.
4. **Jas žárovky se řídí VÝKONEM (I²·R), ne proudem.** Při poklesu proudu na pětinu
   zbyde 4 % jasu, ne 20 % — jinak simulace slibuje víc světla, než by ve třídě bylo.
5. **Vypsaný vzorec musí dát vypsaný výsledek.** U zahřátého drátu stálo na obrazovce
   „0,5 · 4 / 1" a hned pod tím „2,04 Ω". Teď vzorec ukazuje hodnotu za studena
   a vliv zahřátí se dopisuje zvlášť; test to hlídá tak, že si dosazení **přepočítá**.
6. **Jednotky musí sedět s výkladem na téže stránce.** Výklad učil ρ v Ω·m, simulace
   používala Ω·mm²/m — žák dosazující podle výkladu by byl 10⁶× mimo. Do výkladu proto
   přibyla praktická jednotka i převod.
7. **Kontrolovat i POŘADÍ podtémat.** Simulace byla zapojená i tam, kde se ρ ani vzorec
   ještě neprobraly → vznikla zjednodušená verze přes prop (`odpor-vodice-zaklad`).
8. **Pozor na nefyzikální popisky ovládání.** „Rozžhavený drát" u hliníku (taje při
   660 °C) neexistuje; činitel 1,6 odpovídá zahřátí asi na 175 °C, ne rozžhavení.
9. **Ořezané mapování zabije pointu.** Rychlost elektronů byla oříznutá na mez, takže
   mezi 2 Ω a 10 Ω nebyl vidět žádný rozdíl — přitom „větší odpor = menší proud" je
   celé sdělení simulace. Test proto ověřuje, že různé vstupy dají různé rychlosti.

**Jak se simulace ověřují bez prohlížeče** (náhledový server často blokuje jiná session):
skript ve scratchpadu spustí **skutečný `<script>` komponenty** v Node přes `node:vm`
s náhradním DOM, pak zavolá vystavené čisté funkce (`svg.__stavMeridel`, `svg.__odpor`,
`svg.__reostat`…) a proměří spojitost pohybu po 16 ms i všechny kombinace ovládání.
Tohle je tvrdší kotva než pohled okem a nestojí skoro nic — u nových simulací pokračuj stejně.

## ⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 6:00 — ŠKOLA: díry v kvízech)

**Uzavřeno: 12 podtémat bez kvízu má kvíz.** Pracovní činnosti (Tinkercad, SketchUp),
VEX IQ (4 podtémata 8. a 9. roč.) a hry ve Scratchi (6 podtémat) — celkem **144 nových
otázek**. Zbylých 11 „podtémat bez kvízu" jsou **shrnutí**, kterým se kvíz skládá
automaticky funkcí `slozSouhrnnyKviz` — díra to není. Jediné skutečně bez kvízu zůstává
`fyzika/6-rocnik/shrnuti/pokusy` (sbírka pokusů, kvíz tam nedává smysl).

**Kvízů je ve skutečnosti 2086 otázek, ne 358.** Údaj 358 z předchozích session byl
podhodnocený: `zkontroluj.mjs` počítal otázky regexem `^\s*text:` a **jednořádkové
otázky** (`{ text: '…', odpovedi: […] }`, kterých je většina) do počtu vůbec nebral —
takže ani jeho kontrola „ke každé otázce patří odpovědi" na nich neplatila. Opraveno
a ověřeno obousměrně (podvrh bez odpovědí se najde, definice typu se nepočítá).

**Poučení pro psaní kvízů (odhalil nezávislý kontrolor, platí i do budoucna):**
1. **Správná odpověď nesmí být systematicky nejdelší** — v první verzi jich bylo 73 %
   a šly uhodnout bez znalosti látky. Míchání pořadí to neodstraní. Měřit skriptem;
   cíl je ~33–40 % a žádný rozdíl ≥ 10 znaků.
2. **Vysvětlení jedné otázky nesmí prozradit jinou** otázku téhož bloku (a bloky
   sousedních témat se prozrazují navzájem).
3. **Neuvádět klávesovou zkratku v zadání**, když se na ni jiná otázka ptá — jde pak
   vyloučit. („K čemu je nástroj Metr (T)?" prozradilo distraktor T jinde.)
4. **Nesmyslný distraktor je nápověda** („ve Wordu", „změříš to pravítkem").
5. Kontrolor se pouští **dvakrát**: opravy samy zanesly dva nové úniky.

**Hotovo z toho úkolu: 2 nejhorší bloky** (`skupenske-zmeny-vody-v-prirode`
a `posilani-zprav`, obojí 100 % → ~41–50 %). Při tom vyšla najevo **past, kterou je
potřeba znát: vysvětlení u otázky se žákovi ukáže JEN při ŠPATNÉ odpovědi**
(`Kviz.astro`) — kdo odpoví správně, nedozví se nic navíc. Podstatné podmínky
(„pod rosným bodem", „při teplotě pod 0 °C") proto **patří do odpovědi**, ne do
vysvětlení; zkracovat se smí jen to, co je opravdu vata. Nezávislý kontrolor při tom
našel i dvě starší vady: definice kyselých dešťů neodpovídala na položenou otázku
a otázka „Proč je mrak s více kapkami tmavší? → obsahuje víc vody" byla kruhová
(zopakovala zadání místo příčiny). Obojí opraveno. Výklad `posilani-zprav` doplněn
o vlastní zprávy a rozdíl „vyšli zprávu" × „vyšli zprávu a čekej" — tři otázky
zkoušely učivo, které na stránce vůbec nebylo.

**⚠️ ÚKOL NA DALŠÍ KOLA — délková nápověda ve starých kvízech.** Když jsem měřil
vlastní novou dávku, změřil jsem pro jistotu i zbytek webu: **u 64 % z 2085 otázek je
správná odpověď nejdelší** (náhoda je 33 %) — žák je uhodne bez znalosti látky. Míchání
pořadí to neřeší, míchá pořadí, ne délku. Kontrola je nově v `zkontroluj.mjs` (bod 6b):
neblokuje build, ale vypíše podíl a **jmenuje 5 nejhorších bloků**. Postup je dorovnávat
je po dávkách (4+ bloků na kolo): buď zkrátit správnou odpověď, nebo prodloužit
distraktory — a znovu spustit bránu. Nejhorší zbývající (brána je vypíše sama): `sestaveni-a-oziveni-robota` (10/10),
`senzory-robota` (10/10), `razeni-filtrovani-velka-data` (10/10),
`plan-projektu-a-ladeni` (10/10), `hardware-a-software` (11/11).

**Pozor — v `senzory-robota` (informatika 8) nejde jen o délky: blok má ČTYŘI
DUPLICITNÍ PÁRY.** Ptá se dvakrát na ultrazvuk („Jak měří vzdálenost?" × „Který senzor
odpoví, jak daleko je překážka?"), dvakrát na dotykový senzor, dvakrát na jízdu po čáře
a dvakrát na zastavení před zdí — z 10 otázek je 8 ve dvojicích. Chce to přepsat celý
blok podle výkladu (jen 3 senzory + podmínka + jízda po čáře), ne jen dorovnat délky.
Rozdělaná verze nikde není, začni od stávajícího bloku v `kvizy.ts`. **Před editací
načti text přes Read** — v datech jsou české uvozovky „ ", takže `old_string`
zkopírovaný z výstupu `grep` nesedí a Edit selže.

**Čeká na rozhodnutí učitele** (výklad, ne kvíz — nesahal jsem na to): kontrolor
upozornil, že u SketchUpu ve výkladu (`temata.ts`, podtéma `sketchup`) může být sporné
(a) zadávání rozměrů jako `100;50` — oddělovač závisí na jazyku prostředí, v anglickém
je čárka, a výklad sám říká, že prostředí je anglicky; (b) věta o ukládání přes Save —
webový SketchUp Free má i automatické ukládání. Otázky na obojí jsem z kvízu raději
vypustil. Ověřit u školní sestavy a případně upravit výklad.

## ⏩⏩⏩ KDE POKRAČOVAT (30. 7. 2026, 22:15 — deník)

**Na webu jsou roky 2019–2026 a POPIS MAJÍ VŠECHNA MÍSTA (156 ze 156).** Bod „dopsat
popisy" je tím uzavřený. Francouzština nasazená.

**1. Překlady dohání lokální automat sám** (hlídač à 1 h, `--jen-preklady`):
chybí 72× en, 83× de, 147× fr (čísla vyskočila tím, že přibylo 71 nových českých
popisů). Do toho nezasahovat — jen občas zkontrolovat, že hlídač běží.

**2. Čeká na učitele:** Omega **není v gitu** (nález auditu: skripty nemají historii,
nedá se nic vrátit). `pip-audit` hlásí 2 zranitelnosti v `torch` (oprava ve verzi 2.13.0).

**0. NEJDŘÍV SI PŘEČTI TOHLE (31. 7. 2026, 5:30 — po úklidu před /clear):**
Popis místa se zapisuje VÝHRADNĚ přes `zapis_popisy.py` a i ten teď drží zámek —
automat na popisy si soubor načte na začátku dávky a na konci zapíše celý, takže
ruční zápis mezitím **beze stopy zmizí**. Stalo se to dvakrát za jednu noc
(15 popisů z dat webu, pak 5 oprav včetně Loketu). Před buildem vždy `node
zkontroluj.mjs` — nově hlídá i data cest a právě tuhle ztrátu odhalil.

**3. Pečlivá videa běží — první video čeká na odklik.** `pecliva_videa.py` +
LaunchAgent `com.omega.pecliva-videa` zpracovávají stará videa PO JEDNOM se
samoopravnou smyčkou; až bude hotové, objeví se řádek v `KE-SCHVALENI.md`
a protokol vedle videa. Schválení: `venv/bin/python3 pecliva_videa.py --schvaleno`,
vrácení do smyčky: `--zamitnuto "co je špatně"`. Stav: `--stav`.

**4. Z auditů zbývá k dodělání** (nálezy jsou v odpovědi z 31. 7., nasazené opravy
v gitu): u deníku ještě chybí popisky ~170 míst na společné mapě `/cesty/vse`,
překlad názvů videí a stellplatzových údajů do en/de/fr, `hreflang` a canonical,
kontrast `--ztlumeny` a rozšíření `zkontroluj.mjs` o kontroly dat cest.
U školy: Pracovní činnosti mají 0 kvízů, 13 podtémat je bez kvízu, informatika má
poloviční kvízy (ø 12 proti 21) a 22 z 37 podtémat fyziky 8 nemá žádné médium.

### Co se opravilo 30. 7. večer (ať se to neopakuje)

- **Automat mazal ručně psané popisy.** `stare_cesty.py` skládá `.ts` z `popisy-mist.json`;
  popis zapsaný rovnou do `.ts` tedy při dalším běhu zmizel — takhle se ztratilo 15 popisů
  (našly se v gitu a jsou zpátky). **Popis se zapisuje VÝHRADNĚ přes `zapis_popisy.py`**,
  nikdy přímo do dat webu.
- **Francouzština se na web nedostávala.** `blok_popisu()` uměl jen cs/en/de, takže hotové
  francouzské překlady ležely ladem. Jazyky jsou nově v `JAZYKY_POPISU` — **při dalším
  jazyku doplnit i tam** (a v `popisy_mist.py` do `JAZYKY_PREKLADU`).
- **Kotva zamítala i správné články.** U velkých měst vznikla fotka na okraji, kilometry
  od bodu v článku (Praha, Brno, Gdaňsk zůstaly bez faktů). Nově `fakta_mist.py --zdroj
  SLUG JAZYK TITUL` — článek vybere člověk, v datech je to vidět jako `zdroj_rucne`.
  Automat si kotvu nevypíná nikdy.
- **Pozor na správný článek, ne jen správné jméno.** Olsztyn dostal fakta z článku
  o zaniklé správní jednotce („gromada“). GPS přitom seděla — kotva tohle nepozná.

**Postup psaní popisů** (kdyby přibyla nová místa):
```bash
cd ~/Desktop/Omega/skripty
venv/bin/python3 fakta_mist.py --vypis 12        # ověřená fakta k přečtení
# … popisy napsat do JSON {"slug": "text"} …
venv/bin/python3 zapis_popisy.py davka.json      # zapíše (síto zkontroluje)
venv/bin/python3 stare_cesty.py --ts vse --tise  # do dat webu → build → push
```
Popisy piš **čtivě, ne jako výčet údajů** (přání učitele 30. 7.: „byly to jen body,
uprav do čtivé formy"). Fakta ber JEN z `fakta-mist.json`; nic nepřidávej — nezávislý
kontrolor 30. 7. našel v 71 popisech 6 tvrzení bez opory ve zdroji (vč. „v podhůří
Šumavy" nebo UNESCO přiřazené k nesprávné části zdroje).

## ⏩⏩ STAV K 30. 7. 2026 VEČER — co je hotové z mapy dřívějších cest

Body 1–3, **5 i 6 HOTOVÉ**, bod 4 (popisy) běží jako automat. Navíc francouzština webu.

- ✅ **Roky 2019–2022 na webu** (bod 5) — 43 cest, 133 míst; `stare_cesty.py --ts vse`
  zapíše všechny roky naráz a sám udržuje rejstřík `roky.ts`. Výjezdy se číslují
  v rámci roku (dřív globálně: rok 2023 začínal „výjezdem č. 36“).
- ✅ **Ochrana ručně psaných roků** — `RUCNE_PSANE_ROKY = {2024, 2025, 2026}`.
  Učitel 30. 7. přidal do „Dřívějších dovolených“ fotky až po letošní Landshut
  a ptal se, „jestli se tam něco nepere“: automat ruční roky NIKDY nepřepíše
  (mají galerie, stellplatze, videa, reporty, které z fotek nevzniknou).
- ✅ **Hlídač nových fotek** (bod 6) — `hlidac_starych_fotek.py`, LaunchAgent
  `com.omega.stare-fotky-hlidac`, **doháněč** à 1 h: pozná nové fotky podle otisku
  složky, přepočítá cesty, udělá dávku popisů (12/běh), builduje a pushuje —
  ale commituje JEN `src/data/cesty`, aby nesebral rozdělanou práci učitele.
- 🔄 **Popisy míst** (bod 4) — `popisy_mist.py`: kotva = článek na Wikipedii, jehož
  JMÉNO i SOUŘADNICE sedí na místo; autor qwen3:30b-a3b, **nezávislý kontrolor
  gemma4:26b**. Hotovo 95 popisů ze 123 míst (6 nemá na Wikipedii zdroj),
  92 anglických překladů; němčina a francouzština se dopočítávají.
- ✅ **Francouzská verze deníku** (zadání 30. 7.) — `/cesty/fr/`, celé rozhraní,
  28 zemí, francouzský tvar data („6 juillet 2026“, „1er août 2022“), vlajky
  u přepínače jazyků (na úzkém telefonu jen vlajka). 11 popisů míst 2025/2026
  přeloženo ručně, u ostatních záskok češtinou.

**Poučení, která stála čas (ať se neopakují):**
1. Keš jmen míst má **verzi** (`KES_VERZE`) — po opravě pravidel pojmenování se
   jinak držel paskvil „Brémský Přístav“ dál, protože byl v keši.
2. Lokální modely: fáze **podle modelu, ne podle místa**. Střídání qwen↔gemma po
   každém kroku = 6 přehození modelu v RAM na místo (4 min/místo); po přeskupení
   trvá kontrola 95 popisů vteřiny. A qwen3 potřebuje `/no_think` v promptu —
   parametr `think:false` přes `/api/generate` nestačí.
3. **Kontrolor sám nestačí** — anglické „přemýšlení“ modelu propustil jako popis.
   Před kontrolora patří strojová pojistka (`je_cesky_popis`).
4. Wikipedie vrací **HTTP 429 s `Retry-After`** — respektovat, jinak místa
   zbytečně přicházejí o popis.

**Zbývá k rozhodnutí učiteli:** pár míst má z geokódování divné názvy
(„France métropolitaine“, „Küstengewässer…“, „Ujezd“) — jsou to body z moře nebo
z velkých území; buď je pojmenovat ručně, nebo z mapy vynechat.

## ⏩⏩ ZADÁNÍ UČITELE 30. 7. 2026 — MAPA DŘÍVĚJŠÍCH CEST (dělat jako první)

Učitel rozhodl o mapě starých cest (automat `Omega/skripty/stare_cesty.py`, 43 cest
2019–2023 vytěžených z fotek, pilotně nasazený rok 2023):

1. **Podoba mapy roku 2023 se učiteli LÍBÍ a MÁ ZŮSTAT** (30. 7. 2026, po zhlédnutí
   nasazené mapy: „tohle se mi líbí může zůstat"). Tedy: všechna místa jako kolečka,
   blízká obepnutá kroužkem s počtem, trasy se šipkami, modrý domeček s popiskem
   „jižní Čechy", pod mapou rozcestník s vlaječkami. **Nepřestavovat!**
   Rozdělení roku na jednotlivé cesty (víkend × prázdninová cesta) zůstává jako
   možné vylepšení, ale až na výslovné přání — dnešní dělení podle vzdálenosti stačí.
2. **Opakované návštěvy stejného místa se ZACHOVÁVAJÍ** (30. 7.: „opakovaně jsme jezdili
   na stejná místa jiný rok ale to chci zachovat"). Slučovat se smí JEN dva shluky téže
   cesty se stejným jménem (`slouc_stejnojmenna` v stare_cesty.py) — nikdy napříč
   cestami ani roky. Slugy míst musí zůstat unikátní (ověřeno: v roce 2023 jsou).
3. **Názvy míst: originál, ne strojový překlad.** 30. 7. se na webu objevil paskvil
   „Brémský Přístav" (Nominatim s `accept-language=cs` počeštil Bremerhaven). Opraveno:
   dotaz jde BEZ češtiny, jméno se protáhne slovníkem vžitých exonym (`EXONYMA`
   v body_z_fotek.py — Bremen→Brémy, Gdańsk→Gdaňsk…), zemi určuje KÓD státu
   (`ZEME_PODLE_KODU`), protože název země se vrací v místním jazyce („Deutschland").
4. **Popisy míst: VYROBIT** (ne nechat prázdné). U ~150 míst vyrábět z veřejných
   faktů o místě — nikdy si nevymýšlet, co tam učitel zažil.
5. **Roky 2019–2022 doplnit: ANO** (dalších 35 cest) — a stejně tak KAŽDÝ další rok,
   který učitel přidá („další roky co přidám taky ano").
6. **HLÍDAČ NOVÝCH FOTEK** (nové zadání): lokální model má při zapnutém počítači sám
   zjistit, že přibyly nové fotky, a začít dělat mapu bez vyzvání. Tedy LaunchAgent
   v režimu DOHÁNĚČ (hodinové buzení, práce při první příležitosti) nad
   `body_z_fotek.py` + `stare_cesty.py`; sleduje složku
   `Cestovatelský deník/Dřívější dovolené` (vizitky) a čekárnu.
   Souvisí: učitel chtěl automat i pro `zpracuj_rucni_vklad.py` (dosud se pouští ručně).

Zbývá z předchozího: 9 videí (.MOV) a 6 fotek bez EXIF, ze kterých se GPS zatím nečte
(u videí jde doprogramovat). Přehled všech 43 cest je v `Cestovatelský deník/KE-SCHVALENI.md`.

**Pozn.:** učitel psal část zadání do jiné session; tato (hlavní) ho převzala.
Práce druhé session je commitnutá (`1898a08`), nic se neztratilo.


## ⏩ KDE POKRAČOVAT (29. 7. 2026 večer — úkoly učitele k deníku: 1 a 2 HOTOVÉ, 3 běží)

1. ✅ **Mapa roku začíná doma** — data roku mají nový volitelný bod `domov`
   (`jižní Čechy`, x 344.9 / y 351.7, spočteno stejnou projekcí jako `trasa_uvod.py`).
   Kreslí se modrý domeček, trasa z něj vychází a započítá se do výřezu celkové mapy
   (2025 i 2026). Nasazeno, ověřeno na živém webu.
2. ✅ **U místa jen JEHO video** — mřížka „Videa z cesty" se při přiblížení na místo
   skryje (viditelná jen u celkové mapy); u karty místa je nově náhled jeho videa.
   Ověřeno v DOM: po kliknutí na Landshut mřížka skrytá, u každé viditelné karty 1 video.
3. ✅ **Fotogalerie u míst 2026** — kliknutí na náhled fotku zvětší přes celou obrazovku
   (šipky, klávesnice, Esc). Kontrola anonymizace všech 154 fotek 2026 doběhla (0 nálezů
   u 150, 4 fotky vyřazeny), nový automat `Omega/skripty/vyber_fotky_na_web.py` vybral
   **104 fotek ze 150** (série pozná z blízkého času + podobnosti popisu bge-m3, vyhrává
   nejostřejší dle variance Laplaciánu), učitel je schválil a jsou nahrané v R2;
   `galerie:` zapojeno u 6 míst 2026.

**Další věci hotové 29. 7. večer (zadání učitele během práce):**
- **Chamrousse u Livet-et-Gavet** — spaní u sjezdovek, olympijský sjezd mužů 1968 na trati
  Casserousse (zároveň 28. MS), stání Place des Niverolles (park4night 20 €/24 h).
  POZOR na past: složky fotek jsou pojmenované podle reverzního geokódování, ale GPS
  v EXIF ukazuje jinam — fotky „Vaulnaveys" i „Livet-et-Gavet" jsou obě z Chamrousse
  (1680–1800 m), učitel to vysvětlil: fotí se i cestou autem a na výletech.
- **Frangy** — přespání u vinaře 10 €/os., elektřina 6 €, voda 4 € (z vlastní návštěvy).
  Nové pole `overenoNaMiste` v typu `Stellplatz`: u vlastních cen se ukazuje hláška
  „platily při naší návštěvě, dnes mohou být jiné", u dohledaných „jen orientační".
- **Vlaječky v rozcestníku mapy** (položky nesou `zeme`, z toho `vlajky`).
- **Sloučeny dvě složky Geisingen** (25 fotek z `⁨Geisingen⁩, 8.7. 2026` s neviditelnými
  znaky do `Geisingen_DE`), cesty ve stavech obou automatů přepsány.

- **Automat na OPRAVY nálezů anonymizace** (`Omega/skripty/oprav_anonymizaci.py`) — učitel:
  „když to můžeš rozmazávat ve smyčce, můžeš to i opravovat". Z 5 nálezů: 1 opraven
  (SPZ Geisingen — citlivější kaskáda našla 2 značky), 3 uzavřeny jako PLANÝ POPLACH
  a 1 zůstal učiteli (čitelná SPZ na `Vaulnaveys 13-36-45`).
  **Poučení, které stojí za zapamatování:** vision model se u „zbytečného rozmazání"
  plete — rozostřené pozadí fotky mu splývá s rozmazáním od anonymizace, takže odpoví
  ANO i na fotku, kde se nerozmazalo vůbec nic. Proto o planém poplachu rozhoduje
  MĚŘENÍ, ne model: (a) liší se výsledek od originálu (< 0,5 = nic rozmazané),
  (b) podobnost tváře s referencemi a jak velkou část snímku zabírá (< 0,33 a < 2 %
  = cizí drobná postava, rozmazaná správně). Naměřeno: Schongau rozdíl 0,22;
  Vaulnaveys tváře 0,24 / 0,05 % a 0,16 / 0,62 %.
  **Past:** `cv2`/`insightface` jsou jen v `Omega/skripty/venv/bin/python3`.
- **Fotky na webu: 106** (104 schválených + 2, které byly planý poplach). Nahrávání
  jednou spadlo na chybu Cloudflare 520 uprostřed Livet-et-Gavet — doplněno dávkou
  jen chybějících fotek; po nahrávání VŽDY porovnat počty s výběrem.

**ČEKÁ NA UČITELE:** (a) fotka s čitelnou SPZ (`Vaulnaveys 13-36-45`) — VideoAutomat ji
mezitím uklidil, zůstala jen v `.pred-opravou/`, na web nešla; (b) jméno vinařství
ve Frangy (fotky ceníku jsou v knihovně Fotek, kam Claude nesmí — stačí export na Plochu);
(c) rozhodnutí, jestli pustit anonymizaci na 461 fotek v čekárně a doplnit na web místa
23.–28. 7. (Bourg-d'Oisans, Riez, Saint-Tropez, Le Lavandou…); (d) zvážit LaunchAgent
pro `zpracuj_rucni_vklad.py`.

Pak teprve pokračovat simulacemi z auditu (seznam níže).

**Nové 29. 7. večer — deník (zadání učitele během práce):**
- `Omega/skripty/body_z_fotek.py` — z „vizitkové" fotky (jedna fotka z dřívějšího výletu
  ve sdíleném albu) udělá bod na mapě: GPS + datum → poloha (projekce jako trasa_uvod.py),
  jméno místa z Nominatimu, návrh videa z kanálu podle názvu a roku → KE-SCHVALENI.md.
  Vizitku pozná podle ROKU (jiný rok než probíhající cesta). Otestováno: 5 bodů z čekárny,
  Col d'Ornon vyšel 272,7/398,1 shodně s ručním výpočtem.
- **Čekárna čeká 7 dní** (`CEKACI_DNY = 7` v pipeline_sdilene.py) od poslední fotky místa,
  ne 14, jak učitel předpokládal — plus KLID_HODIN. Fotky z 26.–28. 7. půjdou ~4. 8.
- **`zpracuj_rucni_vklad.py` NEBĚŽÍ SÁM** (není v LaunchAgentu) — 29. 7. tam leželo
  22 nezpracovaných videí z Bourg-d'Oisans (24. 7., den etapy Tour) a Le Lavandou;
  spuštěno ručně, roztříděno do fotky-puvodni. Zvážit hodinový LaunchAgent.
- **Tour de France 2026: tři etapy.** 17. a 18. 7. dvě etapy u Ballon d'Alsace
  (13. Dole–Belfort, 14. Mulhouse–Le Markstein se stoupáním na Ballon d'Alsace),
  24. 7. **Col d'Ornon** (19. etapa Gap–Alpe d'Huez) — přijeli den předem a spali
  na silnici; nové místo na webu. Zjištěno z GPS v EXIF fotek.
- **V čekárně čeká 461 fotek** z míst, o kterých web neví: Bourg-d'Oisans, Riez,
  Saint-Bonnet-en-Champsaur, Sainte-Maxime, Saint-Tropez, Gassin, Le Lavandou (23.–28. 7.).

_Starší sekce „KDE POKRAČOVAT“ jsou v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — nečtou se automaticky._

## Fronta nápadů (seřazeno podle priority)

### Kandidáti na simulace (NOVÝ audit temata.ts, 28. 7. 2026 — kolo 38; zásoba na měsíc)

Z 64 fyzikálních podtémat bez interakce vybráno 12 s jevem, který jde ANIMOVAT či OVLÁDAT:
1. [x] **F7 treci-sila** — HOTOVO v kole 39 (TreniSimulace: led/dřevo/beton, hystereze
   klidové × smykové, vše celé N).
2. [x] **F7 archimeduv-zakon** — HOTOVO v kole 40 (ArchimedesSimulace: siloměr ve 3 fázích,
   4 materiály × 3 kapaliny, vše celé N).
3. [x] **F8 tepelna-vymena-a-teplo** — HOTOVO v kole 41 (KalorimetrSimulace: generátor úloh
   s celými výsledky, bilance odevzdané=přijaté teplo).
4. [x] **F8 pohybova-a-polohova-energie + zakon-zachovani** — HOTOVO v kole 42
   (SkateparkSimulace na obou stránkách: ideální rampa × se třením, teplo Q).
5. [x] **F9 elektromagneticka-indukce** — HOTOVO v kole 43 (IndukceSimulace: 4 závislosti
   z výkladu, voltmetr ±20 dílků, „magnet stojí = nic").
6. [x] **F9 elektromagnet** — HOTOVO v kole 44 (ElektromagnetSimulace: proud × závity ×
   jádro = sponky, vypnutí, prohození pólů).
7. [x] **F7 optika-rovinneho-zrcadla** — HOTOVO v kole 48 (RovinneZrcadloSimulace:
   osová souměrnost, zákon odrazu, praporek + zrcadlový nápis AMBULANCE).
8. [x] **F8 spalovaci-motory** — HOTOVO v kole 49 (SpalovaciMotorSimulace: řez motorem —
   píst + ojnice + klika + ventily, klik na dobu = póza s popisem, ▶ celý cyklus jako čistá
   funkce času, zážehový × vznětový mění svíčku/vstřikovač i popisy).
9. [x] **F9 polovodice-typu-n-a-p-dioda** — HOTOVO v kole 50 (DiodaSimulace: PN přechod
   s hradlovou vrstvou, napětí −5…+5 V po 1 V, práh LED 2 V, celé mA přes rezistor 200 Ω,
   V-A charakteristika s pohyblivým bodem, tlačítko ⇄ otoč zdroj).
10. [x] **F7 atmosfericky-tlak** — HOTOVO v kole 51 (BarometrSimulace: balón 0–8000 m
    po 1000, Torricelliho rtuťový barometr, celé hPa dle standardní atmosféry — kotva
    1013 hPa = 760 mm u moře, % normálu, místa Ještěd→Everest).
11. [x] **F7 oko-vady-oka** — HOTOVO v kole 52 (OkoSimulace: řez okem se sítnicí, 3 stavy
    oka, ohnisko před/na/za sítnicí, brýle rozptylka/spojka vrací obraz na sítnici, panel
    „co vidí" s rozmazáním přes SVG filtr, strom=dálka × kniha=blízko).
12. [x] **F9 vedeni-proudu-v-kapalinach** — HOTOVO v kole 53 (ElektrolyzaSimulace: destilovaná
    voda nevede × roztok NaCl vede, ionty Na⁺→katoda / Cl⁻→anoda se šipkami, žárovka dle
    proudu, napětí 0–12 V po 2 V → celé A (R=2 Ω), režim pokovování lžičky Au⁺ s vrstvou dle I).
Záměrně vynecháno: shrnutí/opakování, čistě výkladová témata (úvod do fyziky, zdroje energie,
vesmír má simulaci soustavy) a témata s hotovou příbuznou simulací.

### Další úkoly
- [ ] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [ ] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [ ] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
- **Hermes — sjednocení návodů (audit z noci 29. 7.):** `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md`
  — Hermes JE nainstalovaný (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly.
  Návrh: jeden HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md" (Hermes
  md soubory pro Clauda číst UMÍ). Rozhodnutí ráno.
- **Automatický restart samostatného režimu po obnově tokenů:** šlo by naplánovanou úlohou
  (cron v danou hodinu spustí novou session). Nová trvalá konfigurace → jen se souhlasem.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.

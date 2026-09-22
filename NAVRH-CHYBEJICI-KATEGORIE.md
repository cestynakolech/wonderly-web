# Návrh — chybějící kategorie „interaktivní infografika" a „hra pro skupinu"

## ROZHODNUTO 23. 9. 2026

Učitel rozhodl oba otevřené body z tohoto návrhu:

1. **Simulace × interaktivní infografika → varianta B.** Body 4 a 8 z původní
   desetisložkové definice se SLUČUJÍ do jedné složky — „simulace" a
   „interaktivní infografika" jsou totéž (klikací/odkrývací schéma i posuvník
   s dopočtem se počítají stejně). Ústava (`OBSAH-PRAVIDLA.md`, kap. 12) má
   od tohoto data DEVĚT složek místo deseti. Hotových 92 simulací tím tuto
   sloučenou složku splňuje bez další práce.
2. **Hra pro skupinu → PLNÁ varianta.** Bude to SAMOSTATNÁ hra vázaná na
   konkrétní podtéma, NE pouhé rozšíření Fyzikální ligy (MINIMÁLNÍ varianta)
   o třetí výběr „Podtéma".
3. Terminologická past v `PROGRESS.md` (sekce „Interaktivní infografiky" pro
   simulace) — opraveno přejmenováním sekce, viz `PROGRESS.md`.

Varianty níže zůstávají v dokumentu jako historie úvahy, ze které rozhodnutí
vzešlo — nejsou už otevřené k volbě.

## Proč tenhle návrh vznikl

Učitel 22. 9. 2026 stanovil v `OBSAH-PRAVIDLA.md` kap. 12 deset povinných složek
„hotového tématu". Dvě z nich — bod 8 „interaktivní infografika" a bod 10 „hra pro
skupinu" vázaná na podtéma — v projektu jako samostatná kategorie neexistují.
Bez rozhodnutí, co přesně tyto pojmy znamenají a jak se liší od toho, co už je
hotové (simulace, statická infografika, Fyzikální liga), nesplní definici ani
jedno z 95 podtémat a body 4/7/8 i 9/10 se budou dál plést.

## Co dnes existuje (ověřeno branou `zkontroluj.mjs`, 22. 9. 2026)

**Simulace (bod 4 ústavy).** Brána hlásí: *„129 interakcí (+2 druhých na stránce),
131 komponent simulací."* To je 129 unikátních hodnot pole `interakce` + 2 unikátní
hodnoty `interakce2` (celkem 131 unikátních „slotů") a 131 souborů `*Simulace.astro`
v `src/components/` — počty se přesně kryjí, brána navíc upozorňuje, že
`PolovodicSimulace.astro` existuje, ale není nikde zapojená. Rozpad podle předmětu
(vlastní kontrola nad `temata.ts`, mimo bránu): z 139 zápisů pole `interakce:` u
podtémat připadá **107 na fyziku**, 32 na informatiku, 0 na pracovní činnosti.
Průzkumníkův odhad „131 souborů, 107 klíčů u fyziky" byl **přesný, brána i ruční
přepočet ho potvrzují beze změny.**

Dva vzory simulací:
- `TezisteSimulace.astro` — klikací procedurální objev, bez posuvníku, bez vzorce.
- `HydraulikaSimulace.astro` — posuvník mění veličinu → přepočet vzorcem (p=F/S) a
  živá čísla.

**Infografika (bod 7 ústavy).** Statický obrázek, typ `Material{druh:'infografika'}`,
vykreslený jako `<figure><img>` v `[podtema]/index.astro` (ř. 261–267). Žádná
interakce, žádné klikání.

**Hry (bod 10 ústavy).** Fyzikální liga: `src/pages/hry/liga.astro` (tabule) +
`hry/liga/tym.astro` (tablet) + `src/data/hry.ts` (funkce `bankaProLigu()`). Výběr
otázek má granularitu PŘEDMĚT → ROČNÍK → CELEK. Otázky v `kvizy` jsou přitom
INTERNĚ klíčované až na úroveň `predmet/rocnik/celek/podtema`, ale typ `CelekBanky`
(`hry.ts` ř. 45) tuhle informaci při seskupení do celků ZAHAZUJE — na úrovni
podtématu se hrát nedá, i když data by to umožnila. Vedle Ligy běží ještě
`hry/unikovka`, `hry/laborator`, `hry/karty` — žádná z nich není vázaná na jedno
konkrétní podtéma.

**Terminologická past.** `PROGRESS.md` dnes sám nazývá sekci o simulacích
„🕹️ Interaktivní infografiky", ačkoli ústava od 22. 9. rozlišuje simulaci (bod 4)
a interaktivní infografiku (bod 8) jako dvě různé věci. Dokud se pojmy nerozliší
v datech i v hlavách, bude se tahle záměna opakovat.

## Varianty rozlišení: simulace × interaktivní infografika

**Varianta A — infografika bez přepočtu, simulace s přepočtem.**
Interaktivní infografika = klikací/odkrývací schéma podle vzoru
`TezisteSimulace.astro` (žádný posuvník, žádný vzorec, jen postupné odkrývání
popisků/vrstev obrázku). Simulace zůstává vyhrazená pro vzor s posuvníkem a
dopočtem (`HydraulikaSimulace.astro`). Dopad: nový typ komponenty
(`*Infografika.astro` vedle `*Simulace.astro`), ale hotový vzor `TezisteSimulace`
se dá téměř 1:1 přejmenovat/zkopírovat jako šablona — nejde o nový koncept, jen o
nové zařazení existujícího vzoru. Odhad pracnosti: střední — potřeba nová
komponenta na podtéma (desítky minut práce workera na 1 podtéma při existenci
šablony), plus zápis do `temata.ts` (nové pole, např. `infografikaInterakce`) a
řádek v `[podtema]/index.astro`. U ústavy je potřeba dopsat jasnou definici a
kritérium „bez posuvníku a bez vzorce" do kap. 12.

**Varianta B — sloučit body 4 a 8 do jednoho.**
Přiznat, že „simulace" a „interaktivní infografika" jsou v praxi totéž (interaktivní
prvek na stránce), a zredukovat ústavu na devět složek. Dopad: nulová nová práce
na obsahu — jen úprava textu kap. 12 (smazat bod 8, přečíslovat). Riziko: znovu
skryje to, že klikací odkrývání bez výpočtu (Teziste) a posuvník s dopočtem
(Hydraulika) jsou pedagogicky různé nástroje, a učitel tím přijde o rozlišení,
které si 22. 9. výslovně přál zavést (dva různé body v seznamu deseti).

**Varianta C — infografika obohacená o klikací popisky nad existujícím obrázkem.**
Interaktivní infografika = existující statický obrázek (`druh:'infografika'`)
plus vrstva klikacích „bodů zájmu" nad ním (tooltip/rozbalovací popisek), bez nutnosti
kreslit novou grafiku od nuly. Dopad: jedna obecná komponenta
(např. `InteraktivniInfografika.astro`) parametrizovaná souřadnicemi bodů a texty
z `temata.ts`, znovupoužitelná pro všech 95 podtémat — nejnižší pracnost ze tří
variant, protože obrázky (infografiky) už z bodu 7 existují a nekreslí se nové.
Odhad pracnosti: nízká až střední — jedna komponenta jednou, pak jen data (souřadnice
+ text) na podtéma. Do ústavy dopsat: co je „bod zájmu", kolik jich má infografika
mít minimálně, a že se recykluje obrázek z bodu 7 (ušetří i práci s obrázky).

## Varianty hry pro skupinu vázané na podtéma

**MINIMÁLNÍ — rozšířit stávající Ligu.** Data už existují (otázky jsou klíčované
až na `podtema`), jen se v `CelekBanky`/`bankaProLigu()` (`hry.ts` ř. 45) zahazují
při seskupení do celku. Stačí přidat pole `podtema` do `CelekBanky`, upravit
`bankaProLigu()`, aby seskupení nechalo i tuto úroveň, a přidat třetí `<select>`
„Podtéma" do `hry/liga.astro` vedle stávajících PŘEDMĚT/ROČNÍK/CELEK. Pracnost:
nízká, jde o úpravu jednoho souboru dat a jedné stránky, ŽÁDNÁ nová obsahová
tvorba na podtéma — dopad okamžitý na všech 95 podtémat najednou.

**PLNÁ — samostatná hra na podtéma.** Nová herní šablona (např. pexeso, kvíz-závod,
únikovka v malém) generovaná/parametrizovaná daty konkrétního podtématu, vázaná
těsně na jeho obsah (ne jen na sadu otázek z banky). Pracnost: vysoká — nová
komponenta/šablona a její naplnění pro každé podtéma zvlášť (řádově podobná
pracnost jako simulace, ale bez hotového jednoho zavedeného vzoru jako
`TezisteSimulace`/`HydraulikaSimulace`).

## Co jde hromadně automatem a co ručně

- **Automatem/hromadně:** MINIMÁLNÍ varianta hry (úprava `hry.ts` + `liga.astro`
  jednorázově pro všech 95 podtémat najednou); brána `zkontroluj.mjs` rozšířená
  o kontrolu nové kategorie (podle vzoru stávajících kontrol simulací a infografik);
  přejmenování/kopie vzoru `TezisteSimulace.astro` jako startovní šablony pro
  variantu A interaktivní infografiky.
- **Ručně (worker na podtéma):** obsah každé interaktivní infografiky (co se
  klikáním odkrývá, jaký text/schéma), obsah plné hry na podtéma u varianty PLNÁ,
  a u varianty C souřadnice a texty klikacích bodů nad konkrétním obrázkem —
  tohle vyžaduje věcnou znalost tématu, nejde vygenerovat obecným skriptem.

## Co musí rozhodnout učitel

1. Jak rozlišit „simulaci" (bod 4) od „interaktivní infografiky" (bod 8)?
   - A) infografika = klikací/odkrývací bez posuvníku a bez vzorce (vzor Teziste),
     simulace = posuvník + dopočet vzorcem (vzor Hydraulika) — dvě odlišné věci
   - B) zrušit rozdíl, sloučit body 4 a 8 do jednoho v ústavě (devět složek místo deseti)
   - C) infografika = existující statický obrázek z bodu 7 + klikací popisky nad ním
     (recyklace obrázků, nejnižší pracnost)

2. Jak zajistit „hru pro skupinu vázanou na podtéma" (bod 10)?
   - A) MINIMÁLNÍ — rozšířit `CelekBanky`/`bankaProLigu()` o úroveň podtématu a
     přidat 3. select do `hry/liga.astro` (nízká pracnost, hotovo pro všech 95 naráz)
   - B) PLNÁ — nová samostatná herní šablona generovaná pro každé podtéma zvlášť
     (vysoká pracnost, ale herně bohatší zážitek než banka otázek)
   - C) kombinace — nejdřív MINIMÁLNÍ jako rychlé splnění definice, PLNÁ varianta
     jako pozdější vylepšení u vybraných podtémat

3. Má se aktualizovat i `PROGRESS.md` (dnes používá pro simulace nesprávný název
   „Interaktivní infografiky"), aby se pojmy v dokumentaci a v kap. 12 potkaly?
   - A) ano, přejmenovat sekci v `PROGRESS.md` na „Simulace" hned po rozhodnutí bodu 1
   - B) ne, ponechat, dokud nevznikne skutečná kategorie interaktivní infografiky

# Lab. Práce: Coulombův Zákon — Měření Elektrické Síly

## Úvod

Coulombův zákon je **matematickým popisem** elektrické síly mezi dvěma náboji. V této laboratoři budeme konkrétně:
- **Měřit** elektrické síly mezi náboji v různých vzdálenostech
- **Ověřit** matematickou formu zákona: $F \propto \frac{1}{r^2}$
- **Testovat** předpovědi teorie skutečným pokusem
- **Grafit** data a zjistit, zda se shodují s teorií
- **Pochopit** jednotky a fyzikální konstanty

Budeme pracovat přesněji než v předchozích pokusech — s konkrétními čísly a grafů.

---

## Pomůcky

### Přesné měřicí zařízení:
- **Siloměr s vysokou citlivostí** (0–500 mN rozlišení, ideálně do 100 mN)
  - Alternativa: Elektronická váha s přesností na setiny gramu
- **Dva kulovitá tělesa** (mosazné kuličky, plastové koule) — stejné rozměry
- **Míra/posuvné měřidlo** — měření vzdálenosti s přesností ± 1 mm
- **Izolační držák** — plastové nebo dřevěné podpěry
- **Materiál k nabití** (plstěnka, hedváb)
- **Tabulka nebo deska** — stabilní pracovní podložka
- **Papír milimetrovaný** — pro grafické vynášení dat

### Volitelně:
- **Elektrometr** — měření skutečného náboje
- **Digitální kamera** — dokumentace polohy

---

## Postup (krok za krokem)

### Krok 1: Kalibrování siloměru
- Siloměr připojte na pevný stativ.
- Zvěste na něj postupně známé závaží (10 g, 20 g, 50 g).
- Zaznamenejte, jak se výchylka siloměru mění.
- **Cíl**: Zjistit převodní faktor mezi výchylkou a silou (např. 1 cm výchylky = 5 mN).

### Krok 2: Příprava a nabití prvního tělesa
- Vezměte první kuličku.
- Umístěte ji na izolační podložku (aby se náboj neunikl).
- Nabijte ji intenzivním třením plstěnkou (50 pohybů).
- Ověřte nabití elektroskopu nebo papíru.
- **Záznam**: Tato kulička má náboj $q_1$ (typu A).

### Krok 3: Nabití druhého tělesa — první série
- Vezměte druhou kuličku.
- Nabijte ji **stejným způsobem** (stejný počet pohybů, stejný materiál).
- Ověřte nabití — měl by být stejný typ jako $q_1$.
- **Záznam**: Tato kulička má náboj $q_2 = q_1$ (stejný).

### Krok 4: Příprava měřicího systému
- První kuličku fixujte do siloměru tak, aby byla ve výšce 10 cm nad podložkou.
- Druhou kuličku umístěte na podložku pod prvním kuličkou.
- Připravte si měřidlo — měřit budete **vertikální vzdálenost** mezi středy obou kuliček.

### Krok 5: Série měření — Odpuzování
- Začněte se vzdáleností **r = 10 cm**.
- Zapište počáteční číst siloměru (bez kuličky v něm = 0).
- Položte druhou kuličku přímo pod první.
- Zaznamenejte **výchylku siloměru** — kolik mN/gf síla působí.
- Zapište vzdálenost (r) a sílu (F).

- **Opakujte pro vzdálenosti**: 10, 9, 8, 7, 6, 5, 4, 3 cm.
- U každé vzdálenosti počkejte 5 sekund, aby se systém ustálil.

### Krok 6: Analýza inverzní kvadratury
- Pro každou vzdálenost spočtěte: $r^2$ a $\frac{1}{r^2}$
- Spočtěte součin $F \cdot r^2$ pro každou dvojici dat.
- **Cíl**: Ověřit, že součin je přibližně konstantní (důkaz inverzní kvadratury).

### Krok 7: Grafické znázornění
- Sestrojte **dvě grafy**:
  1. **F vs. r** (síla vs. vzdálenost) — měl by být hyperbolický.
  2. **F vs. $\frac{1}{r^2}$** (síla vs. inverzní kvadrát) — měl by být lineární.
- Oba grafy by měly jasně demonstrovat vztah $F \propto \frac{1}{r^2}$.

### Krok 8: Výpočet Coulombovy konstanty
Máte-li odhad skutečných nábojů (např. z elektrometru nebo z rozměrů kuliček), můžete odhadnout:
$$k = \frac{F \cdot r^2}{|q_1 \cdot q_2|}$$
- Srovnejte vaši hodnotu s teoretickou: $k = 8,99 \times 10^9$ N·m²/C².
- Diskutujte chyby měření.

---

## Pozorování – Tabulka Dat

### Tabulka 1: Přesná Měření — Coulombův Zákon

| Vzdálenost r (cm) | Vzdálenost r (m) | Síla F (mN) | Síla F (N) | $r^2$ (m²) | $1/r^2$ (m⁻²) | $F \cdot r^2$ |
|---|---|---|---|---|---|---|
| 10 | 0,10 | | | 0,0100 | 100 | |
| 9 | 0,09 | | | 0,0081 | 123 | |
| 8 | 0,08 | | | 0,0064 | 156 | |
| 7 | 0,07 | | | 0,0049 | 204 | |
| 6 | 0,06 | | | 0,0036 | 278 | |
| 5 | 0,05 | | | 0,0025 | 400 | |
| 4 | 0,04 | | | 0,0016 | 625 | |
| 3 | 0,03 | | | 0,0009 | 1111 | |

**Poznámka**: Sloupec $F \cdot r^2$ by měl být přibližně konstantní — to dokazuje inverzní kvadratu.

### Tabulka 2: Chyba Měření

| Aspekt | Hodnota | Jednotka |
|---|---|---|
| Průměr $F \cdot r^2$ | | N·m² |
| Standardní odchylka | | N·m² |
| Relativní chyba | | % |
| Teoretická konstanta k | 8,99 × 10⁹ | N·m²/C² |

---

## Vysvětlení – Fyzika za Pokusem

### Coulombův Zákon — Formální Zápis

$$\vec{F} = k \cdot \frac{q_1 \cdot q_2}{r^2} \cdot \hat{r}$$

Kde:
- **F** — vektor síly (Newton, N)
- **k** — Coulombova konstanta = 8,99 × 10⁹ N·m²/C²
- **q₁, q₂** — náboje (Coulomby, C)
- **r** — vzdálenost mezi náboji (metr, m)
- **$\hat{r}$** — jednotkový vektor ve směru spojnice nábojů

### Klíčový Vztah: Inverzní Kvadratura

$$F \propto \frac{1}{r^2}$$

To znamená:
- Když $r \times 2$ (zdvojnásobíme vzdálenost), pak $F \div 4$ (čtvrtinování síly).
- Když $r \times 3$, pak $F \div 9$.

**Prakticky**: Při desetinásobném zvětšení vzdálenosti je síla **100× menší**.

### Jednotky Coulombova Zákona

| Veličina | Jednotka | Symbol |
|---|---|---|
| Náboj | Coulomb | C |
| Síla | Newton | N = kg·m/s² |
| Vzdálenost | metr | m |
| Konstanta k | N·m²/C² | |

### Coulomb (C) — Měrná Jednotka Náboje

1 Coulomb = množství náboje, které teče **1 ampérem během 1 sekundy**.
$$1 \text{ C} = 1 \text{ A} \cdot 1 \text{ s}$$

- Typický náboj z třením: 10⁻⁷ až 10⁻⁹ C.
- Náboj elektronu: 1,6 × 10⁻¹⁹ C.

### Příklady Číselných Výpočtů

**Příklad 1**: Dva náboje po 1 μC (10⁻⁶ C) jsou vzdáleny 1 m.
$$F = 8,99 \times 10^9 \cdot \frac{10^{-6} \times 10^{-6}}{1^2} = 8,99 \times 10^{-3} \text{ N} \approx 9 \text{ mN}$$

**Příklad 2**: Stejné náboje, ale vzdáleny 0,1 m (10 cm):
$$F = 8,99 \times 10^9 \cdot \frac{10^{-12}}{0,01} = 8,99 \times 10^{-1} \text{ N} = 0,9 \text{ N}$$

Vidíme: Zvětšením vzdálenosti 10× se síla zmenšila 100×. ✓

### Historický Kontext — Coulomb (1785)

Charles-Augustin de Coulomb experimentálně prokázal tento zákon pomocí **torzní váhy** (citlivé zařízení na měření malých sil). Bez moderních přístrojů empiricky objevil matematickou formu.

---

## Rozšíření – Varianty Pokusů

### Pokus 1: Opačné Náboje — Přitahování
- Nabijte jednu kuličku plstěnkou, druhou hedvábím.
- Měřte **přitahující** sílu na siloměru (těleso se přitahuje místo odpuzování).
- Ověřte, zda i přitahující síla následuje zákon $F \propto \frac{1}{r^2}$.
- **Cíl**: Ověřit, že matematická forma zákona platí pro oba případy.

### Pokus 2: Půlení Náboje
- Nabijte kuličku a měřte sílu.
- Pak kuličku kontaktem dotknete nenabité kuličky (náboj se sdělí).
- Měřte novou sílu — měla by být **čtvrtinová** (když se náboj na obou kuličkách zvlášť kvadratuje).
- **Cíl**: Pochopit vliv náboje na sílu (kvadratická závislost).

### Pokus 3: Tři Tělesa — Superpozice Sil
- Umístěte tři nabité kuličky v řadě.
- Měřte sílu na střední kuličce od obou krajních najednou.
- Diskutujte, jak se síly sčítají (vektorově).
- **Cíl**: Ověřit princip superpozice v elektrostatice.

### Pokus 4: Časová Stabilita Náboje
- Nabijte kuličky a ihned začněte měřit.
- Poté měřte znovu po 5, 10, 20 minutách.
- Sledujte, jak se síla postupně zmenšuje.
- **Cíl**: Pochopit, že náboj v čase vyprchává (zejména ve vlhkosti).

### Pokus 5: Závislost na Tvaru Tělesa
- Opakujte měření s kuličkami, krychličkami a tyčinkami.
- Diskutujte, zda tvar ovlivňuje sílu (teoreticky ne, je-li vzdálenost mezi středy stejná).
- **Cíl**: Ověřit, že Coulombův zákon platí bez ohledu na tvar, je-li těleso bodové vůči vzdálenosti.

### Pokus 6: Metrologie — Jak Měřit Přesně
- Opakujte měření, ale s vyšší přesností:
  - Používejte posuvné měřidlo místo pravítka.
  - Měřte polohu několikrát a průměrujte.
  - Teplotní stabilita (teplota ovlivňuje délku).
- **Cíl**: Pochopit, jak presnost měření ovlivňuje kvalitu dat.

---

## Závěr

Coulombův zákon je **fundamentální zákon elektrostatiky**. Prostřednictvím tohoto pokusu jsme si ověřili:

1. **Inverzní kvadratu**: Síla se se vzdáleností zmenšuje jako $\frac{1}{r^2}$.
2. **Matematická forma**: Lze ji zapsat jednoduchou rovnicí.
3. **Praktické důsledky**: Malé změny vzdálenosti mají obrovské účinky na sílu.

Coulombův zákon je základem pro pochopení:
- Atomu (elektron — jádro interakce).
- Chemických vazeb (rozdělování elektronů).
- Technologií (součástky, polovodiče, plasmatické displeje).

Je to jeden z **nejdůležitějších fyzikálních zákonů** — stejně fundamentální jako Newtonův zákon gravitace, ale pro elektrické síly.

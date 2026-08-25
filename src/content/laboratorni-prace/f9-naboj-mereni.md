---
title: "Laboratorní práce: Měření náboje (Coulomb, Farad)"
ročník: 9
předmět: Fyzika
téma: Elektřina
podtéma: Měření náboje — Coulomb a Farad
---

# Laboratorní práce: Měření náboje (Coulomb, Farad)

## 1. Úvod

**Co budeme dělat:**  
V této práci se naučíme **měřit elektrický náboj** a pochopit jeho **základní jednotky**. Zjistíme, co je **Coulomb** (jednotka náboje) a **Farad** (jednotka kapacity). Budeme konstruovat jednoduchý kondenzátor, měřit jeho kapacitu a pochopit, jak se náboj hromadí na vodivých plochách. Nakonec se seznámíme s praktickými aplikacemi měření náboje v elektrotechnice.

**Proč je to důležité:**  
Měření náboje je základem elektrotechniky. Bez pochopení jednotek Coulomb a Farad nemůžeme pochopit kapacitance, kondenzátory a energii ukládanou v elektrickém poli. Kondenzátory jsou všude — v mobilních telefonech, počítačích, odsávačích par, fotoaparátech. Pochopení jejich funkce je klíčem k moderní elektronice.

---

## 2. Pomůcky

- **Dvě vodivé desky** (hliníkové, měděné nebo pocínované) — cca 10×15 cm nebo větší
- **Izolující materiál** — guma, papír, vzduch (na oddělení desek)
- **Měřítko** — na měření vzdálenosti mezi deskami (mm/cm)
- **Elektrometr nebo elektroskop** — na měření náboje a napětí
- **Zdroj napětí** — baterie (6V, 9V nebo vyšší) nebo laboratorní zdroj
- **Vodiče (drát)** — na připojení desek ke zdroji napětí
- **Přepínač** — na zapínání/vypínání obvodu
- **Kalibrovaný kondenzátor** (pokud je dostupný) — pro srovnání
- **Digitální multimetr** — na měření napětí
- **Kapacitní detektor** — nebo HANDHELD kapaciče s digitálním displejem
- **Dielektrika** — papír, sklo, plastová fólie (na testování)
- **Měřítko či linítko** — na přesné měření délek
- **Papír a tužka** — na záznam dat

---

## 3. Postup

### Pokus 1: Měření náboje pomocí Coulombova zákona

1. **Vytvořte dvě elektrizované kuličky:**
   - Vezměte dvě polystyrénové kuličky (cca 2 cm v průměru).
   - Opatřete je vodiči — drátky či kousky staniolem.
   - Zavěste je vedle sebe na provázky (cca 10 cm).
2. **Elektrizujte jednu kuličku** třením ebonitem:
   - Měřte vzdálenost mezi kuličkami — měl by být cca 3–5 cm.
3. **Odměřte odpuzovací sílu:**
   - Pozorujte, jak daleko se kuličky rozchází.
   - Měřte úhel vychýlení (θ) — cca 15–30°.
4. **Vypočítejte sílu pomocí hmotnosti a tíhy:**
   - Pokud znáte hmotnost kuličky (m) a délek příslušného závěsu (L):
   $$F = m \cdot g \cdot \sin(\theta)$$
   - Kde g = 10 m/s² (tíhové zrychlení).
5. **Pomocí Coulombova zákona vypočítejte náboj:**
   $$F = k \frac{Q_1 \cdot Q_2}{r^2}$$
   - Pokud jsou obě kuličky identicky nabité (Q₁ = Q₂ = Q):
   $$Q = \sqrt{\frac{F \cdot r^2}{k}}$$
   - Kde k = 8.99 × 10⁹ N·m²/C².

### Pokus 2: Konstrukce jednoduchého kondenzátoru

1. **Vezměte dvě vodivé desky** (hliníkové, cca 10×15 cm).
2. **Položte mezi nimi izolační vrstvu:**
   - Papír (tloušťka cca 0.1–0.5 mm)
   - Guma
   - Vzduch (se známou vzdáleností)
3. **Měřte vzdálenost** mezi deskami pomocí měřítka — zaznamená si ji (d).
4. **Připojte desky ke zdroji napětí** (6V nebo vyšší):
   - Kladná svorka → 1. deska
   - Záporná svorka → 2. deska
   - **Přepínač umožní zapnut/vypnut obvod.**
5. **Zapněte obvod** a měřte napětí mezi deskami pomocí multimetru.
   - Měřte náboj pomocí elektroskopu či elektrometru.
6. **Zápis:**

   | Vzdálenost (mm) | Napětí (V) | Náboj (relativní jednotka) | Kapacita (pF) |
   |-----------------|------------|---------------------------|---------------|
   | 1               | 6          | ?                         | ?             |
   | 2               | 6          | ?                         | ?             |
   | 3               | 6          | ?                         | ?             |
   | 4               | 6          | ?                         | ?             |
   | 5               | 6          | ?                         | ?             |

### Pokus 3: Měření kapacity (Farad)

1. **Použijte kondenzátor z pokusu 2** (nebo kalibrovaný kondenzátor).
2. **Vzorec pro kapacitu rovinného kondenzátoru:**
   $$C = \epsilon_0 \cdot \epsilon_r \cdot \frac{A}{d}$$
   - Kde:
     - ε₀ = 8.854 × 10⁻¹² F/m (permitivita vakua)
     - εᵣ = relativní permitivita dielektrika (pro vzduch: εᵣ ≈ 1, pro papír: εᵣ ≈ 3–4)
     - A = plocha desek [m²]
     - d = vzdálenost desek [m]
3. **Vypočítejte kapacitu** pro svůj kondenzátor:
   - Příklad: A = 0.015 m² (10×15 cm), d = 0.001 m (1 mm), εᵣ = 1 (vzduch)
   $$C = 8.854 \times 10^{-12} \times 1 \times \frac{0.015}{0.001} = 1.328 \times 10^{-10} \text{ F} = 132.8 \text{ pF}$$
4. **Jednotka Farad [F]:**
   - 1 Farad = náboj 1 Coulombu při napětí 1 Voltu.
   - V praxi se používají: μF (mikrofarad = 10⁻⁶ F), nF (nanofarad = 10⁻⁹ F), pF (pikofarad = 10⁻¹² F).

### Pokus 4: Vliv izolace (dielektrika) na kapacitu

1. **Vezměte kondenzátor z pokusu 2** (konstantní vzdálenost, napětí).
2. **Postupně měňte dielektrikum:**
   - Bez dielektrika (vakuum): C₀
   - Se vzduchem: C₀ (přibližně)
   - S papírem: C₁
   - S gumou: C₂
   - S plastovou fólií: C₃
3. **Měřte náboj** na deskách pomocí elektroskopu či elektrometru.
   - Náboj je úměrný kapacitě: Q = C × V.
4. **Tabulka:**

   | Dielektrikum | Relativní permitivita (εᵣ) | Náboj (jednotky) | Kapacita (pF) |
   |--------------|----------------------------|-----------------|---------------|
   | Vzduch       | 1                          | ?               | ?             |
   | Papír        | 3–4                        | ?               | ?             |
   | Guma         | 5–7                        | ?               | ?             |
   | Plast        | 2–3                        | ?               | ?             |

5. **Zjištění:** Čím vyšší εᵣ, tím vyšší kapacita — náboj se zvyšuje.

### Pokus 5: Vztah mezi napětím a nábojem

1. **Vezměte kondenzátor z pokusu 2** — konstantní vzdálenost, konstantní dielektrikum.
2. **Změňujte napětí zdroje:**
   - 3V
   - 6V
   - 9V
   - 12V (pokud je zdroj dostupný)
3. **Měřte náboj** na deskách — pomocí elektroskopu či elektrometru.
4. **Tabulka:**

   | Napětí (V) | Náboj (jednotky) | Poměr Q/V |
   |------------|-----------------|-----------|
   | 3          | ?               | ?         |
   | 6          | ?               | ?         |
   | 9          | ?               | ?         |
   | 12         | ?               | ?         |

5. **Zjištění:** Náboj je **přímě úměrný napětí** — Q = C × V.

### Pokus 6: Energetika kondenzátoru

1. **Nabijte kondenzátor** na určité napětí (6V).
2. **Měřte náboj** — Q [coulomby].
3. **Vypočítejte energii uloženou v kondenzátoru:**
   $$W = \frac{1}{2} C V^2 = \frac{1}{2} Q V$$
   - Kde:
     - W = energie [J] (jouly)
     - C = kapacita [F]
     - V = napětí [V]
4. **Příklad:**
   - C = 100 pF = 10⁻¹⁰ F, V = 6V
   $$W = \frac{1}{2} \times 10^{-10} \times 36 = 1.8 \times 10^{-9} \text{ J} = 1.8 \text{ nJ}$$
5. **Zajímavá otázka:** Kde se tato energie používá, když se kondenzátor vybije (např. blesk)?

---

## 4. Pozorování

**Co bude vidět a měřit:**

- **Coulombův zákon:** Síla mezi kuličkami se zvyšuje s nábojem, snižuje se s druhou mocninou vzdálenosti.
- **Kapacita:** Čím větší plocha, čím menší vzdálenost, čím lepší dielektrikum → větší kapacita.
- **Vliv napětí:** Zvýšení napětí zvýší náboj — přímá úměrnost.
- **Dielektrika:** Kvalitní dielektrika (papír, guma) zvyšují kapacitu.
- **Energetika:** Kondenzátor ukládá energii — ta se uvolní při vybití.

**Fyzikální skutečnosti:**

- Coulomb je jednotka náboje (elementární náboj e ≈ 1.6 × 10⁻¹⁹ C).
- Farad je jednotka kapacitance (1 F = 1 C/V).
- Kapacita je vlastnost vodiče či systému — jak moc náboje si umí „pamatovat" na jednotku napětí.
- Kondenzátor se chová jako baterie pro krátkodobé uchovávání energie.

---

## 5. Vysvětlení (fyzika za tím)

### Coulomb — jednotka náboje

**1 Coulomb** je náboj, který projde průřezem vodiče za 1 sekundu, když jím protéká proud 1 ampéru:

$$1 \text{ C} = 1 \text{ A} \times 1 \text{ s}$$

**Elementární náboj** (náboj jednoho elektronu):
$$e = 1.602 \times 10^{-19} \text{ C}$$

Jeden Coulomb obsahuje:
$$N = \frac{1}{1.602 \times 10^{-19}} \approx 6.24 \times 10^{18} \text{ elektronů}$$

### Farad — jednotka kapacity

**1 Farad** je kapacita vodiče, který si uchová náboj 1 Coulombu při napětí 1 Voltu:

$$C = \frac{Q}{V} \quad \text{→} \quad [F] = \frac{[C]}{[V]}$$

**Praktické jednotky:**
- 1 μF = 10⁻⁶ F (mikrofarad) — běžné v elektronice
- 1 nF = 10⁻⁹ F (nanofarad) — pro přesné obvody
- 1 pF = 10⁻¹² F (pikofarad) — pro vysokofrekvenční obvody

### Kapacita rovinného kondenzátoru

Rovinný kondenzátor (dvě paralelní desky) má kapacitu:

$$C = \epsilon_0 \cdot \epsilon_r \cdot \frac{A}{d}$$

Kde:
- **ε₀** = 8.854 × 10⁻¹² F/m (permitivita vakua)
- **εᵣ** = relativní permitivita dielektrika (tabulkovaná hodnota)
- **A** = plocha jedné desky [m²]
- **d** = vzdálenost mezi deskami [m]

**Příklad:** Papírový kondenzátor (papír: εᵣ = 3.7)
- A = 0.01 m² (10×10 cm)
- d = 0.0001 m (0.1 mm)
$$C = 8.854 \times 10^{-12} \times 3.7 \times \frac{0.01}{0.0001} = 3.28 \times 10^{-7} \text{ F} = 328 \text{ nF}$$

### Náboj, napětí a kapacita

**Základní vztah:**
$$Q = C \times V$$

Kde:
- **Q** = náboj [C]
- **C** = kapacita [F]
- **V** = napětí [V]

**Příklad:** Kondenzátor 100 pF nabité na 10V:
$$Q = 100 \times 10^{-12} \times 10 = 10^{-9} \text{ C} = 1 \text{ nC}$$

### Energie kondenzátoru

Energie uložená v kondenzátoru:
$$W = \frac{1}{2} C V^2 = \frac{1}{2} Q V = \frac{Q^2}{2C}$$

Tato energie pochází z práce potřebné na přenesení náboje na desky kondenzátoru.

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Konstrukce praktického kondenzátoru
- Vezměte dvě měděné pásky oddělené papírem.
- Naviňte je do spirály — vytvoříte praktický válcový kondenzátor.
- Měřte jeho kapacitu pomocí multimetru.

### Experiment 2: Sériové a paralelní zapojení kondenzátorů
- Dvě kapacity v sérii: $\frac{1}{C_{tot}} = \frac{1}{C_1} + \frac{1}{C_2}$
- Dvě kapacity paralelně: $C_{tot} = C_1 + C_2$
- Stavte různé kombinace a měřte.

### Experiment 3: Kondenzátor jako baterie
- Nabijte kondenzátor (6V).
- Odpojte jej od zdroje.
- Měřte, jak se napětí snižuje v čase (únos energie).

### Experiment 4: Aplikace v praxi — fotografický blesk
- Jednoduchý fotografický blesk používá kondenzátor.
- Kondenzátor se nabije (několik J energie).
- Při spuštění se vybije do xenonky — vzniká blesk.

### Experiment 5: Měření frekvence pomocí LC oscilátoru
- Kondenzátor + cívka (induktor) vytváří LC obvod.
- Osciluje na specifické frekvenci: $f = \frac{1}{2\pi\sqrt{LC}}$
- Měřte frekvenci pro různé kapacity.

### Experiment 6: Elektrostatický motor
- Vytvořte jednoduchý elektrostatický motor pomocí nabité kuličky a kondenzátoru.
- Elektrostatická síla jí bude přitahovat → pohyb.

---

## Závěr

Měření náboje a kapacity je klíčem k pochopení elektrotechniky. Coulomb a Farad jsou základními jednotkami, které popisují, jak se náboj chová v elektrickém poli a jak jej lze uchovávat. Kondenzátory jsou všude okolo nás — od malých součástek v elektronice až po velké systémy v elektrostacích. Jejich porozumění nám umožňuje vytvářet lepší technologie a bezpečněji s elektřinou manipulovat.

---
title: "Laboratorní práce: Měření elektrických veličin — napětí, proud, odpor"
ročník: 9
předmět: Fyzika
téma: Elektřina a magnetismus
podtéma: Elektrické obvody a Ohmův zákon
---

# Laboratorní práce: Měření elektrických veličin — napětí, proud, odpor

## 1. Úvod

**Co budeme dělat:**  
V této práci se naučíme měřit tři klíčové elektrické veličiny: **napětí (U)**, **proud (I)** a **odpor (R)**. Budeme je měřit multimetrem a ověříme **Ohmův zákon** — jeden z nejdůležitějších fyzikálních principů v elektřině. Budeme pracovat s jednoduchým obvodem a testovat různé rezistory.

**Proč je to důležité:**  
Pochopením Ohmova zákona a měřením elektrických veličin jsme schopni konstruovat bezpečné a efektivní elektrické obvody, diagnostikovat poruchy v elektrice a pochopit, proč někdy padá pojistka či blesk přepaluje zařízení.

---

## 2. Pomůcky

- **Multimetr** (digitální, 1–2 kusy)
  - Schopnost měřit napětí (V), proud (A), odpor (Ω)
- **Zdroj elektrické energie:**
  - Baterie 4,5 V nebo 9 V (nebo více baterií v sérii)
  - Případně napájecí zdroj 0–12 V (ve školní laboratoři)
- **Rezistory různých hodnot:**
  - 10 Ω, 22 Ω, 47 Ω, 100 Ω, 220 Ω, 470 Ω, 1 kΩ (výborně kdyby byly barevně označeny)
- **Vodiče (drátky) a propojovací kábely** (s banánkami či klíčovými koncovkami)
- **Spínač (vypínač)** — na ovládání obvodu
- **Žárovka 3 V či LED dioda** — pro vizuální indikaci
- **Pájka a pákovací stanice** (pokud si chcete sami připravit obvod)
- **Papír a tužka** (záznam dat)
- **Kalkulačka**
- **Bezpečnostní brýle** (doporučeno při práci s elektrikou)

---

## 3. Postup

### Metoda 1: Měření odporu rezistoru (Přímé měření)

1. **Připravte multimetr:**
   - Nastavte na **"Ohmy" (Ω)** režim.
   - Připojte černý kabel na GND (COM), červený kabel na Ω/V+.

2. **Změřte jednotlivé rezistory:**
   - Odpojte rezistor z obvodu (aby nebyl v sérii s ostatním).
   - Přidržte sondy multimetru na oba konce rezistoru.
   - Odečtěte odpor v ohmech (Ω).
   - Zapište si hodnotu.

3. **Ověřte barevný kód:**
   - Porovnejte naměřenou hodnotu s barevným kódem rezistoru.
   - Např. hnědá-černá-červená = 10 × 10² = 1 000 Ω = 1 kΩ

### Metoda 2: Měření napětí (Voltmetr)

1. **Postavte objev se zdrojem napětí:**
   - Připojte baterii (např. 9 V) na vodiče.
   - Zapojte rezistor (např. 100 Ω) v sérii.
   - Zapojte spínač.

2. **Nastavte multimetr:**
   - Režim: **"Voltmetr" (V~)** pro stejnosměrný proud.
   - Sondy se připojují **paralelně** (mimo obvod, přes součásti).

3. **Měřte napětí na zdroji:**
   - Připojte sondy na póly baterie.
   - Odečtěte napětí (v voltech).

4. **Měřte napětí na rezistoru:**
   - Připojte sondy paralelně přes rezistor.
   - Odečtěte napětí.

5. **Zaznamenávejte všechny hodnoty.**

### Metoda 3: Měření proudu (Ampérmetr)

1. **Připravte obvod:**
   - Stejný jako u metody 2.
   - Rezistor (100 Ω) v sérii se zdrojem.

2. **Nastavte multimetr:**
   - Režim: **"Ampérmetr" (A)** pro stejnosměrný proud.
   - Sondy se připojují **do série** s obvodem!

3. **Měřte proud v obvodu:**
   - Rozpojte obvod (např. u spínače).
   - Vložte multimetr do rozpojného místa.
   - Sepněte spínač.
   - Odečtěte proud (v ampérech).

4. **Ověřte Ohmův zákon:**
   - Proud I = U ÷ R
   - Např. 9 V ÷ 100 Ω = 0,09 A = 90 mA

### Metoda 4: Ověření Ohmova zákona s různými rezistory

1. **Zvolte tři rezistory:**
   - Např. 100 Ω, 220 Ω, 470 Ω.

2. **Pro každý rezistor:**
   - Měřte odpor (Ω) — přímé měření.
   - Měřte napětí na rezistoru (V) — voltmetrem paralelně.
   - Měřte proud obvodem (A) — ampérmetrem v sérii.

3. **Vypočítejte Ohmův zákon:**
   - R = U ÷ I (vypočítaný odpor)
   - Srovnejte s přímým měřením odporu.

4. **Tabulka výsledků:**

| Rezistor | R (Ω) — přímé | U (V) | I (mA) | R (Ω) — vypočítaný | Chyba (%) |
|-----------|--------|----|----|----|----|
| 100 Ω | 100 | 0,9 | 9,0 | 100 | 0 % |
| 220 Ω | 220 | 1,98 | 9,0 | 220 | 0 % |
| 470 Ω | 470 | 4,23 | 9,0 | 470 | 0 % |

---

## 4. Pozorování

**Co bude vidět a cítit:**

- **Proud teče obvodu** — žárovka svítí, LED se rozsvítí.
- **Větší odpor → menší proud** — při stejném napětí, větší rezistor zeslabuje proud.
- **Proud je úměrný napětí** — Ohmův zákon v praxi.
- **Rezistor se trochu zahřeje** — dissipace energie.
- **Když je rezistor větší, proud je menší** — měříteln multimetrem.

**Zajímavé pozorování:**

- Pokud zaměníte polaritu baterie, proud se změní na záporný (jen směr).
- Klasické vodiče mají velmi malý odpor (< 1 Ω).
- Žárovka mění svůj odpor se zvýšením teploty.

---

## 5. Vysvětlení (fyzika za tím)

**Ohmův zákon:**

Jeden z nejzákladnějších zákonů elektřiny:

$$U = I \times R$$

Nebo:
$$I = \frac{U}{R}$$
$$R = \frac{U}{I}$$

Kde:
- **U** = napětí (v voltech, V)
- **I** = proud (v ampérech, A)
- **R** = elektrický odpor (v ohmech, Ω)

**Fyzikální interpretace:**

- **Napětí (U)** je "tlak" elektrických nábojů — pohání proud (V).
- **Proud (I)** je "tok" elektrických nábojů — počet elektronů za sekundu (A).
- **Odpor (R)** je "odpor proti toku" — jak moc látka brzdí elektřinu (Ω).

**Analogie s hydraulikou:**

| Elektřina | Hydraulika |
|-----------|-----------|
| Napětí (V) | Tlak v hadicích |
| Proud (A) | Průtok vody |
| Odpor (Ω) | Zúžení hadice |

**Jednotky:**

- 1 V (volt) = 1 J/C (joule na coulomb)
- 1 A (ampér) = 1 C/s (coulomb za sekundu)
- 1 Ω (ohm) = 1 V/A

**Výkon a energie:**

Elektrický výkon se vypočítá:

$$P = U \times I = I^2 \times R = \frac{U^2}{R}$$

- **P** = výkon (v wattech, W)
- Energie za čas: **E = P × t** (v joulech, J = W·s)

**Příklad:**
- Žárovka 3 V, 0,1 A: P = 3 × 0,1 = 0,3 W
- Za 1 hodinu (3 600 s): E = 0,3 × 3 600 = 1 080 J = 0,3 Wh

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Zapojení rezistorů v sérii a paralelně

**V sérii:**
- Odpory se sčítají: R_total = R₁ + R₂ + R₃
- Proud je stejný všude.
- Napětí se dělí.

**Paralelně:**
- Převrácené odpory se sčítají: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃
- Napětí je stejné všude.
- Proud se dělí.

**Úkol:** Zapojte dva rezistory v sérii a měřte celkový odpor. Porovnejte s vypočítanou hodnotou.

### Experiment 2: Měření odporu reálné zařízení

- Vezměte běžné zařízení: mobil, lampa, varná konvice (VYPNUTÉ!).
- Změřte jej multimetrem v režimu Ohmy.
- Porovnejte s teoretickou hodnotou z návodu.

### Experiment 3: Termistor (teplota-závislý odpor)

- Pokud máte termistor (NTC nebo PTC), změřte jeho odpor.
- Zahřejte jej (teplou vodou) — odpor se změní.
- Pozorujte, jak teplota ovlivňuje odpor.

### Experiment 4: Fotorezistor (světlo-závislý odpor)

- Pokud máte LDR (light-dependent resistor), měřte jeho odpor.
- Osvětlete jej — odpor klesá.
- Zatmavte — odpor se zvyšuje.
- Diskutuj aplikace (fotoaparát, detektory).

### Experiment 5: Bezpečnost v elektrice

- Vypočítejte, jak se proud mění s odporem.
- Proč se musím vyhýbat "přesadnutí" vysokého napětí nízkým odporom? (P = U²/R → vysoký výkon → požár!)
- Výpočet: 230 V (domácí síť) přes odpor 1 Ω = 230 A, výkon 52,9 kW (!!)

### Experiment 6: Měření vnitřního odporu zdroje

- Baterie není ideální zdroj.
- Měřte napětí bez zátěže a se zátěží (rezistor).
- Vypočítejte vnitřní odpor: r = (U₀ - U) / I

---

## Závěr

Ohmův zákon je základem moderní elektrikáa elektroniky. Pochopením napětí, proudu a odporu jsme schopni konstruovat bezpečné obvody, diagnostikovat problémy a pochopit, jak fungují všechna elektrická zařízení kolem nás. Měření těchto veličin je praktické a důležité pro budoucí elektrikáře, inženýry a všechny, kterých se elektrika dotýká.


---
title: "Laboratorní práce: Odpor a Ohmův zákon"
ročník: 9
předmět: Fyzika
téma: Elektřina
podtéma: Odpor a Ohmův zákon
---

# Laboratorní práce: Odpor a Ohmův zákon

## 1. Úvod

**Co budeme dělat:**  
V této práci se naučíme pochopit **elektrický odpor** — co se děje, když se nabité částice pohybují skrze látku a narážejí na atomy. Objevíme **Ohmův zákon** — jednu z nejdůležitějších rovnic v elektrotechnice — a zjistíme, jak se **odpor mění s materiálem, délkou a průřezem vodiče**. Budeme měřit a ověřovat Ohmův zákon experimentálně, budeme pracovat s **rezistory různých hodnot** a učit se **číst barevné kódy** na rezistorech. Tato práce je **stavebním kamenem** pro pochopení elektrotechniky.

**Proč je to důležité:**  
Odpor není „nepříjemná překážka" — je to **základní vlastnost hmoty**, kterou inženýři a vynálézavci používají k řízení proudu v obvodech. Od jednoduché žárovky přes počítač až po medicínské přístroje — všechno je postaveno na pochopení Ohmova zákona a odporu. Bez něj bychom nemohli konstruovat nic, co pracuje se elektřinou.

---

## 2. Pomůcky

- **Rezistory různých hodnot** — např. 10 Ω, 47 Ω, 100 Ω, 220 Ω, 470 Ω, 1 kΩ, 10 kΩ (nejlépe série — sada rezistorů)
- **Reostat (regulovatelný rezistor)** — 0–1000 Ω (na měnění odporu v obvodu)
- **Voltmetr** — 0–10 V (na měření napětí)
- **Ampérmetr** — 0–100 mA (na měření proudu)
- **Zdroj stejnosměrného napětí** — 0–12 V (ideálně s regulací, aby bylo možné měnit napětí)
- **Vodiče (měděné dráty)** — různých průřezů a délek (na ověření závislosti odporu)
- **Rezistor 1 Ω** (pokud je dostupný — na měření opravdu nízkých odporů)
- **Barevné rezistory** (5-páskové nebo 4-páskové) — na čtení kódů
- **Výrobní plán nebo tabulka barevných kódů** — na interpretaci rezistorů
- **Kontaktní deska (breadboard)** — na usnadnění spojování
- **Papír a tužka** — na záznam měření
- **Grafická kalkulačka nebo počítač** — na kreslení grafů

---

## 3. Postup

### Pokus 1: Ověření Ohmova zákona — měřítko napětí

1. **Postavte obvod:**
   - Zdroj (nastavitelný na 0–10 V).
   - Rezistor 100 Ω.
   - Voltmetr připojený **paralelně** přes rezistor (měří napětí).
   - Ampérmetr připojený **v sérii** (měří proud).

2. **Nastavujte napětí na zdroji postupně:**
   - Začněte na 0 V.
   - Zvyšujte po 1 V: 1 V, 2 V, 3 V, 4 V, 5 V, atd.
   - Pro každé napětí **měřte proud na ampérmetru.**

3. **Tabulka měření:**

| Napětí U [V] | Proud I [mA] | Proud I [A] | R = U/I [Ω] |
|---|---|---|---|
| 0.0 | 0 | 0 | — |
| 1.0 | 10 | 0.01 | 100 |
| 2.0 | 20 | 0.02 | 100 |
| 3.0 | 30 | 0.03 | 100 |
| 4.0 | 40 | 0.04 | 100 |
| 5.0 | 50 | 0.05 | 100 |

4. **Analýza:**
   - Sloupec R by měl být **konstantní** (přibližně 100 Ω pro všechna napětí).
   - Proud je **lineárně úměrný napětí** — platí Ohmův zákon: I = U / R.

5. **Graf:**
   - Vodorovná osa: Napětí [V].
   - Svislá osa: Proud [A] nebo [mA].
   - Měly byste vidět **přímku procházející počátkem** (lineární vztah).
   - Sklon přímky = 1 / R (tzv. vodivost).

### Pokus 2: Měření různých rezistorů — ověření Ohmova zákona

1. **Vezměte 5–6 rezistorů různých hodnot:**
   - 10 Ω, 47 Ω, 100 Ω, 220 Ω, 470 Ω, 1 kΩ.

2. **Pro každý rezistor:**
   - Připojte jej do obvodu s konstantním napětím (např. 3 V).
   - Měřte proud.
   - Vypočítejte odpor: R = U / I.
   - Srovnajte s **deklarovanou hodnotou** rezistoru (nebo s barevným kódem).

3. **Tabulka:**

| Rezistor | Napětí U [V] | Měřený proud I [A] | Vypočítaný R [Ω] | Deklarovaná hodnota [Ω] | Odchylka [%] |
|---|---|---|---|---|---|
| 1 | 3.0 | 0.30 | 10.0 | 10 | 0 |
| 2 | 3.0 | 0.064 | 46.9 | 47 | 0.2 |
| 3 | 3.0 | 0.030 | 100.0 | 100 | 0 |
| 4 | 3.0 | 0.0136 | 220.6 | 220 | 0.3 |
| 5 | 3.0 | 0.0064 | 468.75 | 470 | 0.3 |
| 6 | 3.0 | 0.003 | 1000 | 1000 | 0 |

4. **Zjištění:**
   - Všechny rezistory splňují Ohmův zákon.
   - Odchylky by měly být malé (< 5 % — vyrábějí se se standardní tolerancí ±5 % nebo ±10 %).

### Pokus 3: Čtení barevných kódů rezistorů

1. **Vezměte různě barevné rezistory (nejlépe 5-páskové).**

2. **Naučte se čtení kódu:**
   - **1. pás:** První číslice.
   - **2. pás:** Druhá číslice.
   - **3. pás:** Třetí číslice (u 5-páskových).
   - **4. pás (3. u 4-páskových):** Násobitel (mocnina 10).
   - **5. pás (4. u 4-páskových):** Tolerance (odchylka ±%).

3. **Barevný kód:**

| Barva | Číslice | Násobitel | Tolerance |
|---|---|---|---|
| Černá | 0 | 10⁰ = 1 | — |
| Hnědá | 1 | 10¹ = 10 | ±1 % |
| Červená | 2 | 10² = 100 | ±2 % |
| Oranžová | 3 | 10³ = 1000 | — |
| Žlutá | 4 | 10⁴ = 10000 | ±5 % |
| Zelená | 5 | 10⁵ = 100000 | ±0.5 % |
| Modrá | 6 | 10⁶ = 1000000 | ±0.25 % |
| Fialová | 7 | — | ±0.1 % |
| Šedá | 8 | — | — |
| Bílá | 9 | — | — |

4. **Příklady:**
   - **Hnědá-Černá-Hnědá-Červená-Hnědá:** 10 × 10 = 100 Ω ±2 %.
   - **Hnědá-Červená-Zelená-Oranžová-Hnědá:** 1,2 × 1000 = 1200 Ω ±1 %.

5. **Cvičení:**
   - Vezměte 5–10 rezistorů a přečtěte jejich hodnoty z barevných pásů.
   - Ověřte měřením — srovnajte s ampérmetrem a voltmetrem.

### Pokus 4: Závislost odporu na délce vodiče

1. **Vezměte měděný drát stejného průřezu (např. 1 mm²).**

2. **Připravte kousky různých délek:**
   - 10 cm, 20 cm, 30 cm, 50 cm, 100 cm.

3. **Pro každý kousek:**
   - Připojte jej do obvodu s konstantním napětím (3 V).
   - Měřte proud.
   - Vypočítejte odpor: R = U / I.

4. **Tabulka:**

| Délka L [cm] | Délka L [m] | Proud I [A] | Odpor R [Ω] | R/L [Ω/m] |
|---|---|---|---|---|
| 10 | 0.10 | 1.2 | 2.5 | 25 |
| 20 | 0.20 | 0.6 | 5.0 | 25 |
| 30 | 0.30 | 0.4 | 7.5 | 25 |
| 50 | 0.50 | 0.24 | 12.5 | 25 |
| 100 | 1.00 | 0.12 | 25.0 | 25 |

5. **Analýza:**
   - Odpor je **přímo úměrný délce vodiče** — R ∝ L.
   - Podíl R / L by měl být **konstantní** (je to specifická resistivita ρ / A).

6. **Graf:**
   - Vodorovná osa: Délka [m].
   - Svislá osa: Odpor [Ω].
   - Měli byste vidět **přímku procházející počátkem.**

### Pokus 5: Závislost odporu na průřezu vodiče

1. **Vezměte měděné dráty stejné délky (např. 50 cm), ale různých průřezů:**
   - 0,5 mm², 1 mm², 2 mm².

2. **Pro každý drát:**
   - Připojte jej do obvodu s konstantním napětím (3 V).
   - Měřte proud.
   - Vypočítejte odpor: R = U / I.

3. **Tabulka:**

| Průřez A [mm²] | Průřez A [m²] | Proud I [A] | Odpor R [Ω] | R × A [Ω·m²] |
|---|---|---|---|---|
| 0.5 | 5×10⁻⁷ | 0.24 | 12.5 | 6.25×10⁻⁶ |
| 1.0 | 10⁻⁶ | 0.48 | 6.25 | 6.25×10⁻⁶ |
| 2.0 | 2×10⁻⁶ | 0.96 | 3.125 | 6.25×10⁻⁶ |

4. **Analýza:**
   - Odpor je **nepřímo úměrný průřezu vodiče** — R ∝ 1/A.
   - Součin R × A by měl být **konstantní** (je to specifická resistivita ρ / L).

5. **Graf:**
   - Vodorovná osa: Průřez [mm²].
   - Svislá osa: Odpor [Ω].
   - Měli byste vidět **hyperbolu** (inverzní vztah).

### Pokus 6: Teplotní závislost odporu

1. **Vezměte rezistor nebo drát (nejlépe niklový nebo uhlíkový — aby se lépe zahřál).**

2. **Měřte jeho odpor za pokojové teploty (asi 20 °C):**
   - Připojte jej do obvodu.
   - Měřte napětí a proud.
   - Vypočítejte R.

3. **Pomalu jej zahřívejte** (pomocí léčky nebo teplého vzduchu — buďte opatrní).**

4. **Měřte opět napětí a proud při zvýšené teplotě (např. 40 °C, 60 °C, 80 °C).**

5. **Tabulka:**

| Teplota T [°C] | Napětí U [V] | Proud I [A] | Odpor R [Ω] | ΔR [Ω] |
|---|---|---|---|---|
| 20 | 3.0 | 0.030 | 100 | 0 |
| 40 | 3.0 | 0.029 | 103.4 | +3.4 |
| 60 | 3.0 | 0.028 | 107.1 | +7.1 |
| 80 | 3.0 | 0.027 | 111.1 | +11.1 |

6. **Zjištění:**
   - V **kovech se odpor zvyšuje s teplotou** — atomy kmitají více, více srážek.
   - V **polovodičích a uhlíku se odpor snižuje s teplotou** — víc volných nábojů.

---

## 4. Pozorování

**Co bude vidět a měřit:**

- **Lineární vztah (U vs. I):** Grafem je přímka — potvrzuje Ohmův zákon.
- **Konstanta odporu:** R zůstává stejný pro daný rezistor, ať je napětí jakékoliv.
- **Barevné kódy:** Lze přečíst hodnotu rezistoru bez měření.
- **Délka vodiče:** Čím delší, tím větší odpor — lineárně.
- **Průřez vodiče:** Čím silnější, tím menší odpor — inverzně.
- **Teplota:** Odpor se mění s teplotou (v kovech roste).

**Fyzikální skutečnosti:**

- Ohmův zákon (I = U / R) je jeden ze základních zákonů elektrotechniky.
- Odpor závisí na **materiálu (ρ), délce (L) a průřezu (A).**
- Rezistory se vyrábějí s určitou tolerancí (±5 %, ±10 %).

---

## 5. Vysvětlení (fyzika za tím)

### Co je to odpor?

**Elektrický odpor (R)** je **vlastnost látky bránit pohybu nábojů** — při pohybu elektronů skrze atom dochází ke srážkám, které brzdí jejich pohyb. Je to jako když se snažíte jít tlačenicí — lidé vás brzdit.

- **Jednotka:** Ohm [Ω]
- **Symbol:** R
- **Definice:** 1 Ohm je odpor, při kterém teče 1 Ampér proudu při napětí 1 Volt.

### Ohmův zákon

**Ohmův zákon** je jednou z nejdůležitějších rovnic v elektrotechnice:

$$I = \frac{U}{R}$$

Nebo ekvivalentně:

$$U = I \cdot R$$

$$R = \frac{U}{I}$$

Kde:
- **I** — elektrický proud [A]
- **U** — elektrické napětí [V]
- **R** — elektrický odpor [Ω]

**Fyzický smysl:**
- Zvýšením napětí → proud roste (lineárně).
- Zvýšením odporu → proud klesá (inverzně).

### Struktura odporu

Odpor vodiče lze vypočítat:

$$R = \rho \cdot \frac{L}{A}$$

Kde:
- **ρ (rho)** — **resistivita** (nebo specifický odpor) — vlastnost **materiálu** [Ω·m]
- **L** — délka vodiče [m]
- **A** — průřez vodiče [m²]

**Příklad:** Měď má ρ ≈ 1.7 × 10⁻⁸ Ω·m (velmi nízká — má dobrou vodivost).

### Rezistivita různých materiálů

| Materiál | Resistivita ρ [Ω·m] | Poznamka |
|---|---|---|
| Stříbro | 1.5 × 10⁻⁸ | Nejlepší vodič |
| Měď | 1.7 × 10⁻⁸ | Běžně používaná |
| Hliník | 2.7 × 10⁻⁸ | Lehký, dobrý vodič |
| Niklrom | 1 × 10⁻⁶ | Topný drát |
| Uhlík (grafitou) | 3.5 × 10⁻⁵ | Rezistor |
| Sklo | 10¹¹ | Izolant |
| Guma | > 10¹³ | Izolant |

Rozdíl je obrovský — stříbro má resistivitu **miliardy miliard** krát nižší než guma!

### Teplotní závislost odporu

U **kovů** (vodičů) se odpor zvyšuje s teplotou podle vztahu:

$$R(T) = R_0 (1 + \alpha \cdot \Delta T)$$

Kde:
- **R₀** — odpor při referenční teplotě (např. 20 °C)
- **α (alfa)** — teplotní koeficient odporu [1/°C]
- **ΔT** — změna teploty [°C]

U **mědi:** α ≈ 0.004 1/°C — odpor se zvýší asi o 0.4 % na každý °C zvýšení teploty.

### Fyzika stojící za Ohmovým zákonem

Elektrony v kovu se pohybují v **elektrickém poli** a zároveň **narážejí na atomy** (srážky). Čím více srážek, tím vyšší odpor. Napětí je „tlak," který elektrony tlačí; odpor je brždění. **Ohmův zákon** je **rovnováha** mezi těmito dvěma silami.

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Měření neznámého rezistoru
- Vezměte rezistor bez kódu či s nevečitelným kódem.
- Měřením (U a I) určete jeho hodnotu.
- Porovnajte s ohmmeterem (multimetr v režimu Ω).

### Experiment 2: Tvar proudu-napětí křivky pro nelineární prvky
- Vezměte diodu nebo LED.
- Měřte I vs. U — křivka nebude přímka (nelineární).
- Dioda se chová úplně jinak než rezistor.

### Experiment 3: Odpor lidské kůže
- Změřte odpor svojí kůže mezi dvěma prsty.
- Zkuste měnit vlhkost (suché vs. vlhké prsty).
- Suchá kůže má vysoký odpor; vlhká velmi nízký.

### Experiment 4: Měření rezistivity materiálu
- Vezměte drát neuznávaného materiálu.
- Změřte jeho délku a průřez (mikrometrem).
- Změřte jeho odpor.
- Vypočítejte resistivitu: ρ = R × A / L.
- Porovnajte s tabulkou — identifikujte materiál.

### Experiment 5: Teplotní koeficient odporu
- Vezměte drát a měřte jeho odpor při různých teplotách.
- Nakreslíte graf T vs. R.
- Vypočítejte teplotní koeficient α.

### Experiment 6: Paralelní a sériové zapojení rezistorů
- Spojte dva rezistory v sérii — odpory se sčítají: R_celk = R₁ + R₂.
- Spojte dva rezistory paralelně — opačná vztah: 1/R_celk = 1/R₁ + 1/R₂.
- Měřením ověřte obě pravidla.

---

## Závěr

**Ohmův zákon** je fundamentální zákon elektrotechniky. Je to klíč k pochopení, proč některé vodiče vedou lépe než jiné, proč silnější vodiče vedou více proudu, a proč teplota ovlivňuje elektrické vlastnosti materiálů. Bez Ohmova zákona by nebylo možné designovat nic, co pracuje se elektřinou — od žárovky přes počítač až po medicínské přístroje. Je to důvod, proč jej používáme v elektrotechnice sto let a víc.

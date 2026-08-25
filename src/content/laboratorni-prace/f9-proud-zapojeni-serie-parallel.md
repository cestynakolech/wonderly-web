---
title: "Laboratorní práce: Sériové a paralelní zapojení"
ročník: 9
předmět: Fyzika
téma: Elektřina
podtéma: Sériové a paralelní zapojení
---

# Laboratorní práce: Sériové a paralelní zapojení

## 1. Úvod

**Co budeme dělat:**  
V této práci se naučíme rozlišovat **sériové** a **paralelní zapojení** součástek — dva základní způsoby, jak se dají komponenty v elektrickém obvodu kombinovat. Zjistíme, že v **sériovém zapojení** je proud stejný všude, ale napětí se dělí; v **paralelním zapojení** je napětí stejné všude, ale proud se dělí. Budeme měřit a ověřovat matematické vztahy pro **celkový odpor** v obou případech. Nakonec pochopíme, **proč jsou některé domácí okruhy zapojeny paralelně** (aby vypnutí jedné žárovky nezhasilo ostatní).

**Proč je to důležité:**  
Sériové a paralelní zapojení jsou **základem všech složitějších obvodů** — od domácích instalací přes elektromobily až po mobilní telefony. Bez pochopení těchto principů bychom nemohli postavit ani jednoduchou elektrickou soustavu. Toto je klíč k tomu, aby elektřina sloužila nám, nikoliv nám v tom bránila.

---

## 2. Pomůcky

- **Rezistory různých hodnot** — např. 100 Ω, 220 Ω, 470 Ω (minimálně 3–4 kusy)
- **Žárovky s paticí** (1,5 V–3 V) — 2–3 kusy (na viditelné znázornění rozdílu)
- **Zdroj stejnosměrného napětí** — 3 V nebo 6 V
- **Voltmetr** — 0–10 V (na měření napětí v jednotlivých bodech)
- **Ampérmetr** — 0–100 mA (na měření proudů)
- **Vodiče (měděné dráty)** — různých délek
- **Kontaktní deska (breadboard)** — nebo vybavení pro svěrky (na usnadnění spojování)
- **Spínač** — na zapínání a vypínání obvodu
- **Výpočetní pomůcky** — kalkulačka, papír, tužka
- **Ilustrační schémata** — na pochopení zapojení

---

## 3. Postup

### Pokus 1: Sériové zapojení rezistorů — měření napětí a proudu

1. **Postavte obvod se **třemi rezistory v sérii:**
   - R₁ = 100 Ω, R₂ = 220 Ω, R₃ = 220 Ω.
   - Zapojení: Zdroj (3 V) → R₁ → R₂ → R₃ → Zdroj (−).
   - V celém obvodu je **jeden jediný proud.**

2. **Připojte ampérmetr:**
   - Vložte jej do série — měří proud procházející všemi rezistory.
   - Měřený proud: I ≈ 0.004 A = 4 mA.

3. **Měřte napětí přes každý rezistor:**
   - Připojte voltmetr **paralelně** přes R₁ (mezi dvěma konci R₁).
   - Zapište U₁.
   - Opakujte pro R₂ a R₃ (zapište U₂ a U₃).

4. **Tabulka:**

| Rezistor | Hodnota [Ω] | Napětí U [V] | Proud I [A] |
|---|---|---|---|
| R₁ | 100 | 0.4 | 0.004 |
| R₂ | 220 | 0.88 | 0.004 |
| R₃ | 220 | 0.88 | 0.004 |
| **Součty** | **540** | **2.16** | **0.004** |

5. **Zjištění:**
   - **Proud je stejný ve všech rezistorech** (I₁ = I₂ = I₃ = 0.004 A).
   - **Napětí se sčítají:** U_celk = U₁ + U₂ + U₃ = 0.4 + 0.88 + 0.88 = 2.16 V (přibližně 3 V, ostatek padá na drátky).
   - **Odpory se sčítají:** R_celk = R₁ + R₂ + R₃ = 100 + 220 + 220 = 540 Ω.

6. **Ověření:**
   - R_celk = U_celk / I = 3 V / 0.004 A = 750 Ω (odchylka je v důsledku vnitřního odporu zdroje a drátků).

### Pokus 2: Sériové zapojení žárovek — viditelný rozdíl

1. **Vezměte tři malé žárovky (1,5–3 V) s patkami.**

2. **Zapojte je v sérii:**
   - Zdroj (3 V) → Žárovka 1 → Žárovka 2 → Žárovka 3 → Zdroj (−).

3. **Pozorování:**
   - Všechny tři žárovky **svítí**, ale **velmi slabě** — proud se dělí mezi všechny rezistance.
   - Napětí se dělí mezi žárovky — každá dostane jen ~1 V.

4. **Vypnutí jedné žárovky:**
   - Vypáchejte vlákno v jedné žárovce (nebo vyšroubujte ji).
   - **Všechny ostatní žárovky se hasnou** — v sérii nefunguje bez jedné komponenty.

5. **Závěr:**
   - Sériové zapojení je **nevhodné pro domácnost** — vypnutí jedné věci vypne všechno.

### Pokus 3: Paralelní zapojení rezistorů — měření napětí a proudu

1. **Postavte obvod se **třemi rezistory paralelně:**
   - R₁ = 100 Ω, R₂ = 220 Ω, R₃ = 220 Ω.
   - Zapojení: Všechny rezistory jsou připojeny na stejné dva body (plus a mínus).
   - Zdroj (3 V) se dělí paralelně do tří větví.

2. **Měřte napětí přes každý rezistor:**
   - Voltmetr připojena paralelně přes **každý rezistor.**
   - Napětí je **stejné pro všechny:** U = 3 V.

3. **Měřte proud v každé větvi:**
   - Vložte ampérmetr **do jedné větve** — měří proud skrze pouze jeden rezistor.
   - Opakujte pro každý rezistor.

4. **Tabulka:**

| Rezistor | Hodnota [Ω] | Napětí U [V] | Proud I [A] | I = U/R |
|---|---|---|---|---|
| R₁ | 100 | 3.0 | 0.030 | 0.030 |
| R₂ | 220 | 3.0 | 0.0136 | 0.0136 |
| R₃ | 220 | 3.0 | 0.0136 | 0.0136 |
| **Součet** | — | **3.0** | **0.0572** | — |

5. **Zjištění:**
   - **Napětí je stejné pro všechny rezistory** (U = 3 V).
   - **Proudy se sčítají:** I_celk = I₁ + I₂ + I₃ = 0.030 + 0.0136 + 0.0136 = 0.0572 A.
   - **Vzorec pro paralelní odpor:** 1/R_celk = 1/R₁ + 1/R₂ + 1/R₃ = 1/100 + 1/220 + 1/220 = 0.01 + 0.00455 + 0.00455 = 0.0191 → R_celk = 52.4 Ω.

6. **Ověření:**
   - R_celk = U_celk / I_celk = 3 V / 0.0572 A ≈ 52.4 Ω ✓

### Pokus 4: Paralelní zapojení žárovek — viditelný rozdíl

1. **Vezměte tři malé žárovky s patkami.**

2. **Zapojte je paralelně:**
   - Všechny tři plus-konce na jeden drát (+ zdroje).
   - Všechny tři mínus-konce na druhý drát (− zdroje).

3. **Pozorování:**
   - Všechny tři žárovky **svítí stejně jasně** — každá dostane plné napětí (3 V).
   - Více света než v sérii.

4. **Vypnutí jedné žárovky:**
   - Vypáchejte vlákno v jedné žárovce.
   - **Ostatní dvě žárovky pokračují v svícení** — nejsou připojeny na vypnuté.

5. **Závěr:**
   - Paralelní zapojení je **vhodné pro domácnost** — vypnutí jedné věci neovlivní ostatní.

### Pokus 5: Kombinované zapojení (série + paralelě)

1. **Postavte komplexnější obvod:**
   - R₁ = 100 Ω v sérii.
   - R₂ = 220 Ω a R₃ = 220 Ω **paralelně** jeden s druhým.
   - Zapojení: Zdroj → R₁ → [R₂ || R₃] → Zdroj (−).

2. **Vypočítejte odpory:**
   - R₂ || R₃: 1/R_par = 1/220 + 1/220 = 0.00909 → R_par = 110 Ω.
   - R_celk = R₁ + R_par = 100 + 110 = 210 Ω.

3. **Měřte:**
   - Celkový proud: I = U / R = 3 V / 210 Ω ≈ 0.0143 A.
   - Napětí na R₁: U₁ = I × R₁ = 0.0143 × 100 = 1.43 V.
   - Napětí na paralelní větvi: U_par = U − U₁ = 3 − 1.43 = 1.57 V.
   - Proudy v paralelní větvi: I₂ = I₃ = U_par / R = 1.57 / 220 ≈ 0.00714 A.

4. **Tabulka:**

| Bod | Velikost | Měřeno | Vypočítáno | Shoda |
|---|---|---|---|---|
| I_celk [A] | — | 0.0143 | 0.0143 | ✓ |
| U₁ [V] | — | 1.43 | 1.43 | ✓ |
| U_par [V] | — | 1.57 | 1.57 | ✓ |
| I₂ [A] | — | 0.00714 | 0.00714 | ✓ |

5. **Záver:**
   - Kombinované obvody lze analyzovat pomocí pravidel pro sérii a paralelní zapojení.

### Pokus 6: Kirchhoffovy zákony — ověření

**Kirchhoffův zákon 1 (proud):** V každém bodě obvodu se sčítají příchozí a odchozí proudy.

1. **V paralelním obvodu z Pokusu 3:**
   - Proud přichází do bodu: I_celk = 0.0572 A.
   - Proud odchází z bodu do tří větví: I₁ + I₂ + I₃ = 0.030 + 0.0136 + 0.0136 = 0.0572 A. ✓

**Kirchhoffův zákon 2 (napětí):** Součet napětí v uzavřené smyčce = 0.

1. **V sériovém obvodu z Pokusu 1:**
   - U_zdroj = U₁ + U₂ + U₃.
   - 3 V = 0.4 + 0.88 + 0.88 + (úbytek na drátcích).
   - Približně se shoduje. ✓

---

## 4. Pozorování

**Co bude vidět a měřit:**

- **Sériové zapojení:**
  - Proud je stejný všude.
  - Napětí se dělí.
  - Žárovky svítí slabě.
  - Vypnutí jedné vypne všechno.

- **Paralelní zapojení:**
  - Napětí je stejné všude.
  - Proud se dělí.
  - Žárovky svítí jasně.
  - Vypnutí jedné neovlivní ostatní.

- **Kombinované zapojení:**
  - Pravidla se kombinují podle situace.

**Fyzikální skutečnosti:**

- V sérii: R_celk = R₁ + R₂ + R₃ + ...
- V paralelě: 1/R_celk = 1/R₁ + 1/R₂ + 1/R₃ + ...
- Kirchhoffovy zákony popisují řešení jakéhokoliv obvodu.

---

## 5. Vysvětlení (fyzika za tím)

### Sériové zapojení

**Sériové zapojení** znamená, že komponenty jsou řazeny **za sebou** — proud, který teče prvním rezistorem, musí jít i druhým a třetím.

#### Vlastnosti:
- **Proud:** Stejný všude. I = I₁ = I₂ = I₃.
- **Napětí:** Dělí se. U_celk = U₁ + U₂ + U₃.
- **Odpor:** Sčítá se. R_celk = R₁ + R₂ + R₃.

#### Matematika:
$$U = I \cdot R_1 + I \cdot R_2 + I \cdot R_3 = I \cdot (R_1 + R_2 + R_3)$$

Tedy:
$$R_{celk} = R_1 + R_2 + R_3$$

#### Příklad:
- R₁ = 100 Ω, R₂ = 220 Ω, R₃ = 220 Ω.
- R_celk = 100 + 220 + 220 = 540 Ω.

### Paralelní zapojení

**Paralelní zapojení** znamená, že komponenty jsou připojeny **vedle sebe** — napětí na všech je stejné, ale proud se dělí do jednotlivých větví.

#### Vlastnosti:
- **Napětí:** Stejné všude. U = U₁ = U₂ = U₃.
- **Proud:** Dělí se. I_celk = I₁ + I₂ + I₃.
- **Odpor:** Reciproční hodnoty se sčítají. 1/R_celk = 1/R₁ + 1/R₂ + 1/R₃.

#### Matematika:
$$I = \frac{U}{R_1} + \frac{U}{R_2} + \frac{U}{R_3} = U \cdot \left(\frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}\right)$$

Tedy:
$$\frac{1}{R_{celk}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}$$

#### Příklad:
- R₁ = 100 Ω, R₂ = 220 Ω, R₃ = 220 Ω.
- 1/R_celk = 1/100 + 1/220 + 1/220 = 0.01 + 0.00455 + 0.00455 = 0.0191.
- R_celk = 1 / 0.0191 = 52.4 Ω.

### Speciální případ: Dva rezistory paralelně

Pokud máte pouze dva rezistory:

$$R_{celk} = \frac{R_1 \cdot R_2}{R_1 + R_2}$$

Příklad: R₁ = 100 Ω, R₂ = 100 Ω.
$$R_{celk} = \frac{100 \times 100}{100 + 100} = \frac{10000}{200} = 50 \text{ Ω}$$

Obecně: Dvě identické rezistory paralelně → jejich odpor je poloviční.

### Kirchhoffovy zákony

**Kirchhoffův zákon 1 (proud):**
$$\sum I_{in} = \sum I_{out}$$

V každém uzlu (kříži větvích) se sčítají příchozí a odchozí proudy — musí se rovnat.

**Kirchhoffův zákon 2 (napětí):**
$$\sum U = 0$$

V každé uzavřené smyčce se sčítají napětí (s příslušnými znaménky) — musí se rovnat nule. To je jen jiný způsob, jak říci, že energie se zachovává.

### Praktické aplikace

| Použití | Zapojení | Důvod |
|---|---|---|
| Domácí instalace | Paralelní | Vypnutí jednoho přístroje neovlivní ostatní |
| Vánoční stromek (staré) | Série | Když žárovka selže, všechny se hasnou (překvapení!) |
| Baterie v diáři | Série | Zvyšujeme napětí (1.5V + 1.5V = 3V) |
| USB nabíječ | Paralelní | Více zařízení se nabíjí na stejné napětí |
| Automechanika | Mixované | Akumulátor (baterie v sérii), reflektory (paralelně) |

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Měření "efektivního odporu" skupiny
- Vezměte skupinu rezistorů v paralelní/sérií.
- Měřením určete jejich efektivní odpor.
- Porovnajte s teoretickou hodnotou.

### Experiment 2: Soustava bateriích v sérii a paralelně
- Vezměte čtyři baterie 1,5 V.
- Zapojte je v sérii: celkové napětí by mělo být 6 V.
- Zapojte je v paralelně: napětí by mělo zůstat 1,5 V, ale kapacita stoupá.
- Měřením ověřte.

### Experiment 3: Oddělení světla v domácnosti
- Doma zjistěte, které zásuvky jsou na jednom okruhu (vypnutím jednoho jistače vidíte, které vypadly).
- Je to serie či paralelní? (Obvykle paralelní — každá zásuvka je nezávislá.)

### Experiment 4: Schéma elektrické instalace
- Nakreslíte schéma své domácnosti — kde je zdroj, jističe, zásuvky, osvětlení.
- Zjistite, zda jsou všechny paralelně (měly by být).

### Experiment 5: Soupravy součástek
- Vezměte dva rezistory 100 Ω a jeden 200 Ω.
- Najítě všechny možné kombinace (sérii, paralelní, mixované) a vyjmenujte jejich odpory.

### Experiment 6: Analýza složitého obvodu
- Nakreslijte libovolný komplexní obvod (série, paralelně, kombinované).
- Vypočítejte его odpor pomocí Kirchhoffových zákonů a pravidel.
- Měřením ověřte.

---

## Závěr

Sériové a paralelní zapojení jsou **základní stavebnicí všech obvodů** — bez pochopení těchto konceptů bychom nemohli pochopit ani jednoduchou domácí instalaci. V sérii se odpory sčítají, napětí se dělí. V paralelě se napětí sčítá, přičemž se dělí proud. Tvůrci domácnosti používají paralelní zapojení, aby mohli vypínat věci nezávisle. Vynálézavci a inženýři kombinují obě pro dosažení přesně takového chování, jaké potřebují. To je kouzlo elektrotechniky.

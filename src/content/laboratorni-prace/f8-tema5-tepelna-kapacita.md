---
title: "Fyzika 8. ročník: Tepelná kapacita — Téma 5"
tema: 5
rocnik: 8
---

# Laboratorní práce: Měření tepelné kapacity látek

## Podtéma: Jak různé látky absorbují a odevzdávají teplo

**Cíl:** Prakticky zjistit, kolik tepla je potřeba k ohřátí různých látek a určit jejich **měrnou tepelnou kapacitu**.

---

## 1. Úvod

Různé látky se ohřívají různou rychlostí. Měď se zahřeje rychle, ale voda velmi pomalu. **Měrná tepelná kapacita (c)** je fyzikální veličina, která říká, kolik tepla je potřeba k ohřátí 1 kg látky o 1 °C.

Během experimentu budete:
- **Měřit** teplotu kapalin před a po ohřátí
- **Měřit** teplotu kovů po ochlazení v horké vodě
- **Počítat** tepelnou kapacitu z naměřených dat
- **Porovnávat** kapacity různých látek

---

## 2. Pomůcky

**Základní pomůcky:**
- Teploměry (0–110 °C, přesnost ≥ 0,5 °C) — nejméně 2 kusy
- Kalorimetr (nebo plechovka obalená v papíru, ideálně s poklopem)
- Hřejáč vody (elektrický varný hrnec) nebo plynový hořák
- Váhy (přesnost ≥ 1 g)
- Odměrný válec (250–500 ml)
- Kovové kusy či tělesa (měď, hliník, železo — min. 50 g každé)
- Kádinka nebo miska na horkou vodu
- Kalkulačka

**Bezpečnost:**
- Ochranné brýle
- Rukavice na horké předměty

---

## 3. Postup

### Fáze 1: Měření tepelné kapacity vody (30 minut)

**Cíl:** Ověřit známou hodnotu měrné tepelné kapacity vody (c_vody ≈ 4 200 J/(kg·°C)).

1. **Odměřte 200 ml** studené vody do kalorimetru.
2. **Zvažte kalorimetr + voda** (zaznamenejte m).
3. **Počáteční teplota:** Zaznamenejte t₁.
4. **Zahřívejte** vodu (např. elektrickým varným hrncem) a **postupně měřte** teplotu každých 30 sekund.
5. **Zaznamenejte** čas a teplotu, dokud se teplota **nezvýší o 20–30 °C**.

| Čas (s) | Teplota (°C) | ΔT (°C) |
|---|---|---|
| 0 | t₁ = |  |
| 30 |  |  |
| 60 |  |  |
| ... |  |  |
| konec | t₂ = | Δt = t₂ − t₁ |

#### Výpočet tepelné kapacity vody

```
Teplo: Q = m · c · Δt

Kde Q je energie dodaná (J), kterou lze zjistit z výkonu hřejáče.
Pokud není znám výkon, lze použít graf a ověřit linearitu.
```

### Fáze 2: Měření tepelné kapacity kovů (30 minut)

**Cíl:** Porovnat, jak rychle se měď, hliník a železo zahřejí/ochladí.

#### Příprava

1. **Kus kovu** (min. 50 g) umístěte do horké vody (80–90 °C) na 5 minut.
2. **Počáteční teplota** hořké vody: t_vody,počátek (zaznamenejte).
3. **Teplota kovu** (po 5 minutách v horké vodě): t_kovu,počátek ≈ t_vody,počátek.

#### Calorimetrické měření

1. **Kus kovu** (teplý) vložte do **studeného kalorimetru s 200 ml vody** (t_vody,počátek ≈ 20 °C).
2. **Postupně měřte** teplotu kalorimetru každých 10 sekund.
3. **Zaznamenejte**, dokud se teploty nevyrovnají (rovnovážná teplota t_rovn).

| Čas (s) | Teplota vody v kalorimetru (°C) |
|---|---|
| 0 | t_počátek ≈ 20 °C |
| 10 |  |
| 20 |  |
| ... |  |
| konec | t_rovn |

#### Výpočet z energie

Ze zákona zachování energie:

```
Teplo ztracené kovem = Teplo získané vodou

m_kovu · c_kovu · (t_kovu,počátek − t_rovn) = m_vody · c_vody · (t_rovn − t_vody,počátek)

c_kovu = [m_vody · c_vody · (t_rovn − t_vody,počátek)] / [m_kovu · (t_kovu,počátek − t_rovn)]
```

| Kov | m_kovu (g) | t_kovu,počátek (°C) | t_vody,počátek (°C) | t_rovn (°C) | c_kovu (J/(kg·°C)) | Teoretická hodnota |
|---|---|---|---|---|---|---|
| Měď |  |  |  |  |  | 385 |
| Hliník |  |  |  |  |  | 897 |
| Železo |  |  |  |  |  | 450 |

---

## 4. Pozorování a analýza

1. **Která látka se zahřívá nejrychleji?** Proč?
2. **Odpovídají vaše hodnoty teoretickým?** Jaké jsou odchylky?
3. **Praktické aplikace:** Proč se voda používá jako chladič v motorech? Proč se pánev zahřeje lépe než voda v ní?

---

## 5. Závěr a domácí úkol

- Formulujte závěr o měrné tepelné kapacitě.
- Proč je **voda ideální pro skladování tepla**? (Například v otopovacích soustavách.)

---
title: "Fyzika 9. ročník: Jádro atomu a energie — Téma 5"
tema: 5
rocnik: 9
---

# Laboratorní práce: Hmotnostní úbytek a ekvivalence hmoty a energie

## Podtéma: Ověření vztahu E = mc² a vazebné energie jádra

**Cíl:** Prakticky pochopit, jak se **hmota převádí na energii** a vypočítat **energii uvolněnou** při jaderné reakci.

---

## 1. Úvod

V jádře atomu se nukleony (protony a neutrony) drží pohromadě neuvěřitelně silnou **jadernou silou**. Když se jádro rozprostře nebo slučuje, uvolňuje se ohromná energie — to je princip **jaderné energie**, kterou dnes používáme v elektrárnách.

Během experimentu budete:
- **Počítat** hmotnostní úbytek
- **Vypočítat** vazebnou energii
- **Ověřovat** E = mc²
- **Diskutovat** energii z jaderných reakcí

---

## 2. Pomůcky

**Základní pomůcky:**
- **Tabulka hmotností:** Atomové hmotnosti protonů, neutronů, elektronů, izotopů
- **Kalkulačka** (s funkcemi mocnin a odmocnin)
- **Periodická soustava prvků**
- **Papír na výpočty**
- Přístup do internetu (na vyhledávání údajů — např. NIST database)

**Poznámka:** Tento pokus je **teoreticko-výpočtový**, bez fyzických jader.

---

## 3. Postup

### Fáze 1: Porozumění stavbě jádra (10 minut)

Zvolte si **jeden prvek** — např. **Helium-4 (⁴He)**.

| Údaj | Hodnota |
|---|---|
| Počet protonů (Z) |  |
| Počet neutronů (N) | A − Z |
| Hmotnost protonu (m_p) | 1,00728 u |
| Hmotnost neutronu (m_n) | 1,00866 u |
| Hmotnost elektronu (m_e) | 0,000549 u |
| Měřená hmotnost atomu ⁴He | 4,00260 u |

(1 u = 1,66054 × 10⁻²⁷ kg)

### Fáze 2: Výpočet hmotnostního úbytku (15 minut)

**Hmotnostní úbytek (Δm):** rozdíl mezi sumou jednotlivých částic a skutečnou hmotností jádra.

```
Hmotnost jednotlivých částic = Z·m_p + N·m_n + Z·m_e

Δm = (Z·m_p + N·m_n + Z·m_e) − M_atomu
```

#### Příklad: ⁴He (Helium-4)

```
Protony: 2 × 1,00728 u = 2,01456 u
Neutrony: 2 × 1,00866 u = 2,01732 u
Elektrony: 2 × 0,000549 u = 0,001098 u
Součet: 2,03297 u

Měřená hmotnost: 4,00260 u

Hmotnostní úbytek: Δm = 2,03297 − 4,00260 = −1,99037 u
```

Wait, to by nemělo být negativní — pojďme to opravit.

**Správně (bez elektronů v jádru!):**

```
Hmotnost jednotlivých částic (JÁDRO) = Z·m_p + N·m_n

Protony: 2 × 1,00728 u = 2,01456 u
Neutrony: 2 × 1,00866 u = 2,01732 u
Součet jádra: 4,03188 u

Měřená hmotnost atomu (s elektrony): 4,00260 u
Správná hmotnost samotného jádra: 4,00260 − 2 × 0,000549 = 4,00150 u

Hmotnostní úbytek: Δm = 4,03188 − 4,00150 = 0,03038 u
```

| Prvek | Z | N | Suma částic (u) | Měřená hmotnost (u) | Hmotnostní úbytek Δm (u) |
|---|---|---|---|---|---|
| ⁴He | 2 | 2 |  | 4,00260 |  |
| ¹⁶O | 8 | 8 |  | 15,99491 |  |
| ²³²U | 92 | 140 |  | 232,0371 |  |

### Fáze 3: Výpočet vazebné energie (15 minut)

**Vazebná energie (E_vazby):** energie, která drží jádro pohromadě (nebo kterou byste museli dodat, aby se jádro rozpadlo).

```
E_vazby = Δm × c²

Kde c = 3 × 10⁸ m/s (rychlost světla)
```

Převod jednotek:
```
1 u = 1,66054 × 10⁻²⁷ kg
1 u·c² = 1,66054 × 10⁻²⁷ kg × (3 × 10⁸ m/s)²
       ≈ 1,494 × 10⁻¹⁰ J
       ≈ 931,5 MeV (megaelektronvolty — přesnější)
```

#### Příklad: ⁴He

```
E_vazby = 0,03038 u × 931,5 MeV/u
        = 28,3 MeV
        ≈ 4,53 × 10⁻¹² J
```

| Prvek | Δm (u) | E_vazby (MeV) | E_vazby (J) |
|---|---|---|---|
| ⁴He | 0,03038 |  |  |
| ¹⁶O |  |  |  |
| ²³²U |  |  |  |

### Fáze 4: Vazebná energie na nukleon (10 minut)

**Specifická vazebná energie:** energii na jeden nukleon (udává **stabilitu** jádra).

```
E_vazby/nukleon = E_vazby / (Z + N) = E_vazby / A
```

Prvky se **středním A** (kolem Feisu, A ≈ 56) jsou nejstabilnější.

| Prvek | A (nukleonů) | E_vazby (MeV) | E_vazby/nukleon (MeV/nukleon) |
|---|---|---|---|
| ⁴He | 4 |  |  |
| ¹⁶O | 16 |  |  |
| ²³²U | 232 |  |  |

---

## 4. Analýza

### Grafy

Vytvořte graf:
- **Vodorovná osa:** A (počet nukleonů)
- **Svislá osa:** E_vazby/nukleon (MeV)

Měli byste vidět, že prvky se středním A (kolem Fe, Co, Ni) mají **nejvyšší** vazebnou energií na nukleon.

### E = mc² v praxi

Energie uvolněná během jaderné štěpení (²³⁵U):

```
Hmotnostní úbytek: Δm ≈ 0,1 u na štěpení
Energie: E = 0,1 u × 931,5 MeV/u ≈ 93 MeV ≈ 1,5 × 10⁻¹¹ J

To je přibližně energie při spalování:
- Jednoho atomu uhlíku (²✲C): 10⁻¹⁹ J
- Jeden gram U-235: ~10¹³ J ≈ 2,4 tuny TNT!
```

---

## 5. Pozorování

1. **Které prvky jsou nejstabilnější?** (Maximální vazebná energií/nukleon.)
2. **Proč se ²³⁵U štěpí, ale ⁴He ne?** (Stabilita vs. nestabilita.)
3. **Praktické aplikace:**
   - Jaderné elektrárny (štěpení těžkých jader)
   - Jaderná fúze (slučování lehkých jader — hvězdy)
   - Medicína (radioaktivní léčba)

---

## 6. Závěr

- Formulujte závěr o hmotnostním úbytku a ekvivalenci hmoty a energie.
- Diskutujte bezpečnost jaderné energie v dnešním světě.
- Jak by se energetika změnila, kdyby byla fúze snadno dosažitelná?

---
title: "Fyzika 7. ročník: Stlačitelnost plynu — Téma 5"
tema: 5
rocnik: 7
---

# Laboratorní práce: Stlačitelnost plynu a Boyleův-Mariottův zákon

## Podtéma: Vztah mezi tlakem a objemem plynu

**Cíl:** Ověřit Boyleův-Mariottův zákon: při konstantní teplotě je součin tlaku a objemu plynu konstantní (p·V = konst).

---

## 1. Úvod

Plyny jsou na rozdíl od kapalin lehce stlačitelné. Pokud stisknete injekční stříkačku naplněnou vzduchem, bude se vzduch stlačovat bez velkého odporu. Tlak plynu v uzavřené nádobě se zvyšuje, když se objem zmenšuje.

Během experimentu budete:
- **Měřit** tlak plynu v injekční stříkačce
- **Měřit** objem plynu (podle polohy pístu)
- **Ověřovat** vztah p·V = konst
- **Graficky znázorňovat** Boyleův-Mariottův zákon

---

## 2. Pomůcky

**Základní pomůcky:**
- Injekční stříkačka (bez jehly, objem alespoň 10 ml, nejlépe 20–60 ml)
- Manometr nebo manometrická trubice (barevný kapalinový manometr, ideálně 0–100 kPa)
- Gumový tubus k připojení stříkačky k manometru
- Měřítko nebo posuvné měřítko (na měření délky pístu)
- Kalkulačka nebo software k výpočtům a grafu
- Papír na zaznamenávání dat

**Poznámka:** Pokud není manometr k dispozici, lze použít **vodní barometr** (U-trubici s barevnou kapalinou).

---

## 3. Postup

### Fáze 1: Příprava (10 minut)

1. **Stříkačku a manometr** spojte pomocí gumového tubusu.
2. **Píst stříkačky** vytáhněte do maximální polohy (například 50 ml).
3. **Nula manometru:** Zkontrolujte, zda manometr ukazuje **0 kPa** (atmosférický tlak) — toto bude referenční bod.
4. **Značení:** Pomocí tužky nebo lepící pásky označte na stříkačce **pozice pístu** (50 ml, 40 ml, 30 ml, 20 ml, 10 ml).

### Fáze 2: Měření (30 minut)

**Postupné stlačování plynu:**

1. **Počáteční stav:** Píst je vytažený na 50 ml, manometr ukazuje ≈ 0 kPa (relativní tlak).
2. **První měření:** Tlak a objem zaznamenejte do tabulky.
3. **Posunutí pístu** na 40 ml a zaznamenejte hodnoty.
4. **Pokračujte** s kroky 30, 20, 10 ml.
5. **Každé měření opakujte** 2 krát pro zvýšení přesnosti.

| Objem V (ml) | Objem V (m³) × 10⁻⁵ | Relativní tlak p (kPa) | Absolutní tlak p_abs (kPa) | p_abs · V (N·m) |
|---|---|---|---|---|
| 50 | 5,0 | 0 | 101 |  |
| 40 | 4,0 |  | 101 + Δp |  |
| 30 | 3,0 |  | 101 + Δp |  |
| 20 | 2,0 |  | 101 + Δp |  |
| 10 | 1,0 |  | 101 + Δp |  |

**Poznámka:** Absolutní tlak = atmosférický tlak (101 kPa) + relativní tlak naměřený manometrem.

### Fáze 3: Analýza (15 minut)

#### Výpočet součinu p·V

Pro každé měření vypočítejte:

```
p_abs · V = (101 kPa + Δp) × V (v m³)
```

Příklad: Při V = 50 ml = 50 × 10⁻⁶ m³ a Δp = 0 kPa:
```
p · V = 101 000 Pa × 50 × 10⁻⁶ m³ = 5,05 J (aproximace)
```

#### Ověření konstantnosti

Měly by všechny hodnoty p_abs · V být **přibližně stejné**? Jaké jsou odchylky?

```
Průměrná hodnota (p·V)_průměr = [součet] / 5

Relativní odchylka (%) = |p·V - (p·V)_průměr| / (p·V)_průměr × 100%
```

---

## 4. Graf — Boyleův-Mariottův zákon

### Vytvoření grafu

Vykreslete **dvě varianty:**

**Graf 1: p vs. 1/V**
- Vodorovná osa: 1/V (1/ml⁻¹)
- Svislá osa: p_abs (kPa)
- Byměla to být **přímka** procházející počátkem (teoreticky 0, prakticky ≈ 101 kPa).

**Graf 2: p·V vs. V**
- Vodorovná osa: V (ml)
- Svislá osa: p·V (J)
- Měli by jste vidět **vodorovnou linii** (konstanta).

---

## 5. Pozorování a otázky

1. **Je součin p·V skutečně konstantní?** Jaké jsou odchylky?
2. **Byl pokus snazší či obtížnější** při malých objemech (10 ml)? Proč?
3. **Praktické aplikace:** Kde se Boyleův-Mariottův zákon uplatňuje? (Pumpa na kolo, stlačovací vzduch, pneumatiky…)
4. **Vliv teploty:** Pokud by se stříkačka během experimentu zahřála (rukou), jak by se výsledky změnily?

---

## 6. Závěr

- Stručně popište, co byste **závěrem o platnosti Boyleova-Mariottova zákona** řekli.
- Jaké byly **hlavní zdroje chyb**? (Pohyblivost pístu, netěsnost spojů, změna teploty…)
- **Návrhy na zlepšení** experimentu.

---

## 7. Domácí úkol (volitelně)

- Najděte **3 příklady** z běžného života, kde se uplatňuje Boyleův-Mariottův zákon.
- Výzkum: Jak funguje **spirometre** (přístroj na měření dechového objemu)? Jaké fyzikální principy jsou v něm zahrnuty?

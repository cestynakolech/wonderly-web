---
title: "Laboratorní práce: Měření proudu (ampérmetr)"
ročník: 9
předmět: Fyzika
téma: Elektřina
podtéma: Měření proudu (ampérmetr)
---

# Laboratorní práce: Měření proudu (ampérmetr)

## 1. Úvod

**Co budeme dělat:**  
V této práci se naučíme **měřit elektrický proud** pomocí **ampérmetru** — přístrojů, které se používají k přesnému určení, jak velký proud teče daným obvodem. Seznámíme se s **připojením ampérmetru do série**, naučíme se **volit správný rozsah** a pochopit, proč je **vnitřní odpor ampérmetru zásadně důležitý**. Budeme měřit proud v různých obvodech — skrze rezistory, vodiče a elektrolyt — a zjistíme, jak se proud mění, když se změní napětí nebo odpor.

**Proč je to důležité:**  
Měření proudu je **základní dovednost v elektrotechnice**. Bez přesnějšího měření bychom nemohli sestavit ani jednoduchý obvod, ověřit, zda je správný, nebo diagnostikovat chyby. Ampérmetr je pro elektrikáře to, co je teploměr pro lékaře — nezbytný nástroj pro pochopení stavu systému.

---

## 2. Pomůcky

- **Ampérmetr (ideálně 2–3 rozsahy)** — například 0–10 mA, 0–100 mA, 0–1 A
- **Digitální multimetr** (má obvykle ampérmetr v sobě) — na alternativní měření
- **Zdroj stejnosměrného napětí** — 1,5 V až 12 V (baterie nebo laboratorní zdroj)
- **Rezistory různých hodnot** — např. 10 Ω, 47 Ω, 100 Ω, 470 Ω, 1 kΩ (na ověření Ohmova zákona)
- **Vodiče (měděné dráty)** — tlusté a tenké (na srovnání vedivosti)
- **Jednoduchý obvod se žárovkou** — 1,5–3 V (na měření proudu skrze zátěž)
- **LED dioda** (s rezistorem pro ochranu) — proudem typicky 10–20 mA
- **Sklenice s elektrolytem** — solný roztok (pro měření ionického proudu)
- **Grafitové elektrody** — vložit do elektrolytu
- **Vypínač nebo spínač** — na přerušení obvodu
- **Propojovací vodiče** — různých délek
- **Papír a tužka** — na záznam měření

---

## 3. Postup

### Pokus 1: Seznámení s ampérmetrem — připojení v sérii

1. **Vezměte ampérmetr:**
   - Všimněte si **dvou konektor**ů — jeden na zápor (−), jeden na kladný náboj (+).
   - Ampérmetr má obvykle **více rozsahů** — např. 10 mA, 100 mA, 1 A. Začněte s **největším rozsahem** (bezpečnější).
   - **Vnitřní odpor ampérmetru** je velmi malý (ideálně 0 Ω) — to je podstatné, aby neovlivnil obvod.

2. **Připravte obvod:**
   - Vezměte zdroj 3 V (2 články po 1,5 V v sérii).
   - Vezměte rezistor 100 Ω.
   - Postavte obvod: Zdroj (+) → Rezistor → Ampérmetr → Zdroj (−).
   - **Důležité:** Ampérmetr je v **sérii** — proud, který chcete měřit, musí jít skrze něj.

3. **Uzavřete obvod a měřte:**
   - Zapnutím spínače obvod uzavřete.
   - Ampérmetr by měl ukázat určitou hodnotu — např. 30 mA pro 100 Ω rezistor.
   - Zapište si hodnotu.

4. **Ověření Ohmova zákona:**
   - Vypočítejte: I = U / R = 3 V / 100 Ω = 0,03 A = 30 mA.
   - Srovnajte s měřenou hodnotou — měly by si být blízké.

5. **Bezpečnostní poznámka:**
   - Pokud ampérmetr neukáže nic, **okamžitě obvod vypněte.**
   - Pokud ukazuje hodnotu zcela mimo (např. > 1 A), opět vypněte a zkontrolujte připojení.

### Pokus 2: Volba správného rozsahu

1. **Vezměte rezistor 10 Ω a zdroj 3 V.**
   - Odhadnutý proud: I = 3 V / 10 Ω = 0,3 A = 300 mA.

2. **Připojte ampérmetr na rozsah 1 A (1000 mA):**
   - Měřte proud — měl by být kolem 300 mA.
   - Zápis.

3. **Nyní připojte ampérmetr na rozsah 100 mA:**
   - Měřte proud — měli byste vidět přibližně 300 mA, ale jelikož je rozsah jen 100 mA, ampérmetr **může běhat na hranici.**
   - Toto je ještě bezpečné, ale přesnost se zhoršuje.

4. **Pokuste se připojit na rozsah 10 mA:**
   - To by mohlo ampérmetr **poškodit** — proud je příliš vysoký.
   - **Radost doporučit:** Začínejte vždy s největším rozsahem a poté jej zmenšujte.

5. **Závěr:**
   - Správný rozsah je takový, kdy **ručka nebo displej ukazuje zhruba v půlce rozsahu.**
   - Tím se minimalizují chyby měření.

### Pokus 3: Měření proudu v různých rezistorech — ověření Ohmova zákona

1. **Vezměte rezistory: 10 Ω, 47 Ω, 100 Ω, 470 Ω, 1 kΩ.**

2. **Zdroj je konstantní: 3 V.**

3. **Pro každý rezistor:**
   - Připojte jej do obvodu s ampérmetrem.
   - Měřte proud I.
   - Vypočítejte odpor: R = U / I (mělo by se rovnat deklarované hodnotě).
   - Zapište do tabulky:

| Rezistor [Ω] | Změřený proud I [A] | Vypočítaný R [Ω] | Odchylka [%] |
|---|---|---|---|
| 10 | 0.3 | 10 | 0 |
| 47 | 0.064 | 46.9 | 0.2 |
| 100 | 0.03 | 100 | 0 |
| 470 | 0.0064 | 468.75 | 0.3 |
| 1000 | 0.003 | 1000 | 0 |

4. **Analýza:**
   - Všechny odchylky by měly být malé (ideálně < 5 %).
   - Vytvoří se graf: Odpor [Ω] vs. Proud [A] — mělo by to být hyperbola (I = U / R).

5. **Závěr:**
   - Ohmův zákon funguje v praxi — platí pro všechny rezistory za pokojové teploty.

### Pokus 4: Měření proudu v elektrolytu — ionický proud

1. **Připravte elektrolyt:**
   - Sklenice s destilovanou vodou.
   - Přidejte 1–2 lžičky soli (NaCl).

2. **Vložte grafitové elektrody (anodu a katodu) do elektrolytu.**

3. **Připojte obvod:** Zdroj (3 V) → Ampérmetr → Anoda → [Elektrolyt] → Katoda → Zdroj (−).

4. **Měřte proud:**
   - Proud by měl být nižší než v kovových rezistorech (elektrolyt má vyšší odpor).
   - Typicky 10–100 mA v závislosti na koncentraci soli.

5. **Měňte koncentraci:**
   - Přidávejte postupně více soli a měřte proud.
   - Proud by měl **výrazně stoupat** se zvyšující se ionizací.
   - **Tabulka:**

| Sůl přidáno [lžičky] | Proud [mA] |
|---|---|
| 1 | 15 |
| 2 | 45 |
| 3 | 95 |
| 4 | 150 |

6. **Analýza:**
   - Vidíte, jak se vedivost zvyšuje s ionizací?
   - Čistá voda vůbec nevede proud; sůl ji dělá vodivou.

### Pokus 5: Měření proudu skrze různé vodiče

1. **Vezměte měděný drát:**
   - Tenký (0,5 mm² průřezu).
   - Střední (1 mm²).
   - Silný (2 mm²).
   - Všechny stejné délky (např. 50 cm).

2. **Připojte postupně do obvodu (zdroj 3 V, ampérmetr v sérii).**

3. **Měřte proud pro každý drát:**

| Průřez [mm²] | Proud [A] | Odpor R [Ω] |
|---|---|---|
| 0.5 | 0.12 | 25 |
| 1 | 0.24 | 12.5 |
| 2 | 0.48 | 6.25 |

4. **Analýza:**
   - Proud je **přímo úměrný průřezu vodiče.**
   - Odpor je **nepřímo úměrný průřezu.**
   - Vzorec: R = ρ × L / A, kde ρ je resistivita, L délka, A průřez.

5. **Závěr:**
   - Silnější vodiče vedly lépe (nižší odpor, vyšší proud).

### Pokus 6: Měření proudu skrze zátěž — praktická aplikace

1. **Vezměte žárovku (1,5–3 V) a zdroj odpovídající napětí.**

2. **Postavte obvod:** Zdroj → Ampérmetr → Žárovka → Zdroj.

3. **Měřte proud když:**
   - Žárovka je v klidu (studeně) — proud I₁.
   - Žárovka já zapálená — proud I₂.

4. **Pozorování:**
   - Proud se **změní, když se ohřívá vlákno.**
   - Horké vlákno má vyšší odpor (více srážek atomů s elektrony).
   - Proto I₂ < I₁ (proud klesá se zvyšující se teplotou vlákna).

5. **Měření výkonu:**
   - Výkon P = U × I = 3 V × I [A].
   - Zapište výkon pro studenou a horkou žárovku.

---

## 4. Pozorování

**Co bude vidět a měřit:**

- **Připojení v sérii:** Ampérmetr musí být v série — proud skrze něj je stejný jako v obvodu.
- **Rozsahy:** Menší rozsah = přesnější odečet, ale riziko poškození; větší rozsah = bezpečnější, ale méně přesný.
- **Ohmův zákon:** I = U / R — pro všechny rezistory se tento vztah potvrzuje.
- **Elektrolyt:** Proud je nižší v elektrolytu; stoupá se zvyšující se ionizací.
- **Vodiče:** Silnější vodiče vedou lépe (nižší odpor).
- **Teplotní závislost:** Proud skrze žárovku se změní, když se zahřívá.

**Fyzikální skutečnosti:**

- Ampérmetr má velmi malý vnitřní odpor, aby nezpůsobil výrazný úbytek napětí v obvodu.
- Proud v obvodu je určen Ohmovým zákonem: I = U / R.
- Přesnost měření závisí na výběru správného rozsahu.

---

## 5. Vysvětlení (fyzika za tím)

### Ampérmetr — co to je?

**Ampérmetr** je přístroj, který **měří elektrický proud**. Existují různé typy:

#### 1. **Analogový (ručičkový) ampérmetr**
- Má **ručičku** na stupnici.
- Pracuje na principu **magnetického pole** — proud procházejí cívkou v magnetickém poli, a cívka se **otáčí** úměrně proudu.
- **Výhody:** Jednoduché, vidíte trend proudu.
- **Nevýhody:** Méně přesné, ručka se může poškodit.

#### 2. **Digitální ampérmetr (multimetr)**
- Má **LCD displej** s číslicemi.
- Pracuje na principu **měření napětí přes malý rezistor** (obvykle 1 Ω).
- **Výhody:** Velmi přesné, odolné.
- **Nevýhody:** Potřebuje baterii, složitější elektronika.

### Vnitřní odpor ampérmetru

**Ideální ampérmetr by měl mít nulový vnitřní odpor (R = 0 Ω).**

- **Reálné ampérmetry** mají malý, ale nenulový vnitřní odpor (typicky < 1 Ω).
- Pokud by měl ampérmetr **velký odpor**, ovlivňoval by měření — proud by se zmenšil.

**Příklad:**
- Obvod bez ampérmetru: I = U / R = 3 V / 100 Ω = 30 mA.
- Obvod s ampérmetrem o vnitřním odporu 1 Ω: I = 3 V / (100 + 1) Ω ≈ 29.7 mA.
- Vliv je malý, ale při přesnějších měřeních je třeba jej brát v úvahu.

### Připojení ampérmetru

**Ampérmetr se VŽDY připojuje do SÉRIE — nikdy paralelně!**

- **Správně:** Zdroj → Rezistor → Ampérmetr → Zdroj.
- **Špatně:** Ampérmetr paralelně k rezistoru — to by jej **zničilo** (nový náboj teče nejmenší odpor = ampérmetr, který má R ≈ 0).

### Ohmův zákon a měření

**Ohmův zákon:**
$$I = \frac{U}{R}$$

Když měříte proud, ověřujete tento vztah:
- Zvýšením napětí U → proud I roste (lineárně).
- Zvýšením odporu R → proud I klesá (hyperbolicky).

### Dependence odporu na průřezu vodiče

$$R = \rho \cdot \frac{L}{A}$$

Kde:
- **ρ (rho)** — resistivita materiálu [Ω·m] (je to vlastnost materiálu, nikoliv tvaru)
- **L** — délka vodiče [m]
- **A** — průřez vodiče [m²]

**Příklad pro měď:**
- ρ(Cu) ≈ 1.7 × 10⁻⁸ Ω·m
- Drát délky 1 m, průřezu 1 mm²: R = 1.7 × 10⁻⁸ × 1 / (10⁻⁶) ≈ 0.017 Ω.

Tak nízký odpor! Proto měď vede proud tak dobře.

### Vedivost elektrolytu

V elektrolytu (solný roztok) je **vedivost úměrná ionizaci:**

$$\sigma = n \cdot e \cdot \mu$$

Kde:
- **σ** — specificka vedivost [S/m]
- **n** — počet volných iontů
- **e** — náboj iontu
- **μ** — mobilita iontů (jak snadno se pohybují)

Čím více soli, tím více iontů → vyšší vedivost → vyšší proud.

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Vnitřní odpor ampérmetru
- Měřte "nulový" proud — obvodem bez rezistoru, jen ampérmetr a zdroj.
- Měřený proud zjistí vnitřní odpor ampérmetru: R_amp = U / I.
- Porovnejte s uvedeným odporem v manuálu přístroje.

### Experiment 2: Závislost odporu na teplotě vodiče
- Měřte proud skrze drát při pokojové teplotě.
- Pomalu jej zahřívejte (léčkou).
- Jak se proud mění s teplotou?
- **Zjištění:** V kovech odpor roste s teplotou (více srážek).

### Experiment 3: Měření proudu v součástce — LED
- Měřte proud LED při různých napětích (1,5 V, 3 V, 4,5 V).
- LED vede proud jen jedním směrem (je to jednosměrka).
- Graf: Napětí vs. Proud — křivka není lineární (jako u rezistoru), ale exponenciální.

### Experiment 4: Vedivost různých elektrolytů
- Připravte roztoky různých látek: NaCl, CuSO₄, kyselina octová, cukr.
- Měřte jejich vedivost (proud při stejném napětí).
- Která vede nejlépe? Která vůbec ne?
- **Otázka:** Jaký je vztah mezi ionizací a vedivostí?

### Experiment 5: Měření interního odporu zdroje
- Zdroj má vnitřní odpor r.
- Bez zatížení: U₀ = napětí na zdroji (bez proudu).
- Se zatížením R: U = U₀ − I × r.
- Měřte napětí při různých proudech a vypočítejte r.

### Experiment 6: Měření proudu v časové řadě
- Připojte obvod a měřte proud každých 5 sekund.
- Proud by měl být konstantní (je-li obvod stálý).
- Co se stane, když se baterka vybíjí? Proud bude klesat.
- Graf: Čas vs. Proud — vidíte pokles vybíjení.

---

## Závěr

Ampérmetr je **základním nástrojem elektrikáře** — pomocí něj měříme, jak velký proud teče obvodem. Pochopení toho, jak jej správně připojit (do série), jakých rozsahů si vybrat (začít s největším) a jak interpretovat měření (Ohmův zákon), je **klíčové pro úspěšné experimentování s elektřinou**. Měření je základem vědy — bez něj bychom mohli jen hádat. S ampérmetrem vidíme realitu.

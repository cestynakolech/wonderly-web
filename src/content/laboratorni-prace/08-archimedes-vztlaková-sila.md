---
title: "Laboratorní práce: Archimédův zákon a vztlaková síla"
ročník: 8
předmět: Fyzika
téma: Mechanika tekutin
podtéma: Archimédův zákon a plavání těles
---

# Laboratorní práce: Archimédův zákon a vztlaková síla

## 1. Úvod

**Co budeme dělat:**  
Archimédův zákon vysvětluje, proč lodě plavou a kuličky se noří. V této práci změříme **vztlakovou sílu** — sílu, která působí na těleso ponořené v kapalině. Budeme testovat, jak se vztlaková síla mění s objemem ponořeného tělesa a ověříme Archimédův zákon praktickými měřeními.

**Proč je to důležité:**  
Vztlaková síla je klíčová pro plavání, potápění, architektura lodí, ponorky a balóny. Bez pochopení Archimédova zákona bychom nemohli projektovat havárie lodí ani bezpečné potápění.

---

## 2. Pomůcky

- **Siloměr** (0–5 N, přesnost ±0,1 N)
- **Různá tělesa na testování:**
  - Kovové kuličky či zátěž (různé objemy)
  - Plastové těleso
  - Dřevěný kvádr
  - Dutá hliníková koulička
- **Nádoby s kapalinou:**
  - Odměrný váleček 500 ml nebo litr
  - Průhledná nádoba (nejlépe se stupnicí)
- **Kapaliny:**
  - Voda (hlavní, ale lze testovat i olej)
  - Slaná voda (k testování rozdílu)
- **Pravítko** (0–30 cm)
- **Váha** (digitální, do ±0,1 g)
- **Tužka a papír** (záznam dat)
- **Kalkulačka**
- **Provázek či háček** (na zavěšení těles)

---

## 3. Postup

### Metoda 1: Přímé měření vztlakové síly (Metoda se siloměrem)

1. **Siloměr přichystejte** — ověřte nulu bez zátěže.
2. **Měřte váhu tělesa ve vzduchu:**
   - Zavěste těleso na siloměr.
   - Odečtěte sílu F₁ (v newtonech). To je tíhová síla = m × g.
3. **Postupně ponořujte těleso do vody:**
   - Nejprve částečně (cca 1/4 objemu).
   - Odečtěte sílu F₂.
   - Vztlaková síla: F_vztlak = F₁ − F₂
4. **Ponořte více (1/2 objemu):**
   - Měřte F₃.
   - Vztlaková síla: F_vztlak = F₁ − F₃
5. **Ponořte zcela (100%):**
   - Měřte F₄.
   - Maximální vztlaková síla: F_max = F₁ − F₄
6. **Zaznamenávejte všechny hodnoty.**

### Metoda 2: Měření objemu ponořeného tělesa (Voda vытесненा)

1. **Naplňte odměrný váleček vodou** — zaznamenaval si počáteční objem V₀.
2. **Opatrně ponořte těleso** — aby voda nevylila.
3. **Odečtěte nový objem V₁** — rozdíl ΔV = V₁ − V₀ je objem tělesa.
4. **Opakujte pro různá tělesa** — zaznamenávejte jejich objemy.
5. **Vypočítejte teoretickou vztlakovou sílu:**

$$F_{vztlak} = \rho_{vody} \times g \times V$$

Kde:
- ρ_vody = 1 000 kg/m³ = 1 g/cm³
- g = 10 N/kg
- V = objem (v m³ nebo cm³)

### Metoda 3: Ověření Archimédova zákona

1. **Zvažte těleso ve vzduchu** — m, zaznamenavej hmotnost.
2. **Zvažte jím vytlačenou vodu:**
   - Vezměte stejný objem vody jako objem tělesa.
   - Zvažte tuto vodu — m_vody.
3. **Měřte vztlakovou sílu** — siloměrem (jak výše).
4. **Srovnejte:**
   - m_vody × g (tíha vytlačené vody) = F_vztlak (měřená vztlaková síla)

### Tabulka výsledků

| Těleso | Hmotnost (g) | Objem (cm³) | F ve vzduchu (N) | F v 1/2 vodě (N) | F v plné vodě (N) | F_vztlak (N) |
|--------|---------------|-----------|----|-------|----|----|
| Koule 1 | 50 | 20 | 0,5 | 0,3 | 0,1 | 0,4 |
| Koule 2 | 100 | 40 | 1,0 | 0,6 | 0,2 | 0,8 |
| Kvádr | 200 | 80 | 2,0 | 1,2 | 0,4 | 1,6 |

---

## 4. Pozorování

**Co bude vidět a cítit:**

- **Těleso se stane lehčím** — když jej ponoříte, siloměr ukazuje menší sílu.
- **Čím více ponořeno, tím menší je odečet** — lineárně se zvyšuje vztlaková síla.
- **Plná ponorka = maximální vztlak** — když je těleso zcela pod vodou, vztlaková síla je největší.
- **Voda vytéká** — když ponořujete těleso, objem vytlačené vody se rovná objemu tělesa.
- **Těžší těleso se více stlačuje** — ale vztlaková síla zůstává stejná pro stejný objem.

**Zajímavé pozorování:**
- Dutá hliníková koule může plavat, přestože hliník sám klesá.
- Zvětšením objemu dutiny se zvýší vztlaková síla.

---

## 5. Vysvětlení (fyzika za tím)

**Archimédův zákon:**

> **Každé těleso ponořené v kapalině je nadlehčováno silou rovnou tíze kapaliny jím vytlačené.**

Matematicky:

$$F_{vztlak} = \rho_{kapaliny} \times g \times V_{ponořené}$$

- **ρ** (rho) = hustota kapaliny (kg/m³)
- **g** = gravitační zrychlení (10 N/kg)
- **V** = objem ponořené části tělesa (m³)

**Příčina vztlakové síly:**

V kapalině tlak roste s hloubkou (hydrostatický tlak):

$$p(h) = \rho \times g \times h$$

Tlak na spodní část tělesa je VĚTŠÍ než na horní část. Rozdíl těchto tlaků vytváří **vztlakovou sílu**, která působí nahoru.

**Praktické důsledky:**

1. **Těleso plave, není-li těžší než kapalina:**
   - Když ρ_tělesa < ρ_kapaliny → těleso plave
   - Např. dřevo (ρ ≈ 0,6 g/cm³) < voda (1,0 g/cm³) → PLAVE

2. **Těleso klesá, je-li těžší:**
   - Když ρ_tělesa > ρ_kapaliny → těleso klesá
   - Např. ocel (ρ ≈ 7,8 g/cm³) > voda → KLESÁ

3. **Neutrální vztlak:**
   - Když ρ_tělesa = ρ_kapaliny → těleso zůstává v kapalině viset
   - Např. speciální koule z plastu může být vyvážená

**Historická poznámka:**

Archimédés (starý řecký matematik) prý pozoroval tuto sílu koupajíc se. Měl takový pocit, že běžel ulicí holý a křičel "Eureka!" (Našel jsem!).

---

## 6. Rozšíření (co zkusit dál)

### Experiment 1: Plavání s různými kapalinami
- Testuj vztlakovou sílu v oleji, slané vodě, alkoholu.
- Hustota oleju ≈ 0,9 g/cm³ (menší vztlak).
- Hustota slaného oceánu ≈ 1,025 g/cm³ (větší vztlak, proto lodě plavou líp).

### Experiment 2: Kartézián potápěč
- Vezměte malou dutou kuličku (např. kapslí od léku).
- Naplňte ji vodou tak, aby byla na hraně plavání.
- Vložte do uzavřené lahve plné vody.
- Tlačením na lahev (zvýšíte tlak) → kuličk klesá.
- Puštěním (snížíte tlak) → kuličk stoupá.
- **Vysvětlení:** Zvýšení tlaku komprimuje vzduch uvnitř kuličky → zvyšuje se hustota → klesá.

### Experiment 3: Ponorka a vzduch
- Vezměte láhev a vytvořte si "ponorku" z malého materiálu (např. malá zkumavka).
- Ovládejte, aby se potopila a vynořila, přidáváním či odebíráním vody.

### Experiment 4: Vyřešení problému "proč plave loď z oceli?"
- Ocel (ρ ≈ 7,8 g/cm³) je těžší než voda.
- Ale loď je dutá — průměrná hustota lodě < hustota vody.
- Vypočítejte: jaký objem dutiny je potřeba, aby loď o hmotnosti 10 tun plavala?

### Experiment 5: Měření hustoty neznámého předmětu
- Vezměte předmět neznámé hustoty.
- Změřte jeho hmotnost a objem (pomocí vody v odměrném válci).
- Vypočítejte hustotu a pokuste se jej identifikovat.

### Experiment 6: Optimalizace plavidla
- Navrhněte ideální tvar pro loď z jednoduchého materiálu (papír, polystyrén).
- Testujte, jakou zátěž může nést.
- Porovnejte s teoretickými hodnotami Archimédova zákona.

---

## Závěr

Archimédův zákon je jedním z nejdůležitějších principů v fyzice. Umožňuje nám pochopit plavání, potápění, navrhování lodí a podmorských plavidel. Měřením a experimentováním jsme se přesvědčili, že věda není jen vzorce, ale praktické pozorování přírody.


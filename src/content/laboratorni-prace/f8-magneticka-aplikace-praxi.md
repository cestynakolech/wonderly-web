# Lab. Práce: Aplikace Magnetů v Praxi

## Úvod

Magnety nejsou jen fyzikální fenomén — jsou **všude kolem nás**, vytváří strukturu moderní technologie a určují způsob, jakým žijeme. V této laboratoři se zaměříme na:

- **Praktické aplikace magnetů** — co je možné s magnetismem dělat
- **Inženýrské řešení** — jak se magnety používají v reálných zařízeních
- **Bezpečnost a rizika** — kdy jsou magnety prospěšné a kdy nebezpečné
- **Budoucnost magnetismu** — supravodivé magnety, maglev, kvantový compute
- **Domácí experimenty** — stavba vlastních praktických zařízení

Budeme si vytvořit projekty, které demonstrují, jak je magnetismus **prakticky užitečný**.

---

## Pomůcky

### Elektromagnety a Komponenty:
- **Elektromagnety z Wave 3.3** — již vyrobené (nebo součásti pro výrobu)
- **Permanentní magnety** — různých velikostí
- **Drát, baterie, spínače** — standardní komponenty

### Senzory a Měření:
- **Magnetometr** — měření intenzity pole (aplikace v telefonu)
- **Siloměr** — měření sil
- **Multimetr** — napětí a proud

### Konstrukční Prvky:
- **Plastové trubice a rámy** — stavba zařízení
- **Lepidlo a páska** — sestávání
- **Papírové spínače** — testovací objekty
- **Hliníkové fólie** — stínění a reflektory

### Bezpečnost:
- **Bezpečnostní brýle** — ochrana při práci s magnety
- **Rukavice** — ochrana
- **Volný prostor** — bez elektroniky (neodym může poškodit zařízení)

---

## Postup (krok za krokem)

### Krok 1: Elektromotor — Převod Magnetismu na Pohyb

#### 1a) Teoretická Příprava
- Elektromotor funguje na principu: **Proud v poli = Síla** (Lorentzův zákon).
- Když proud protéká cívkou v magnetickém poli, cívka se otáčí.
- Správné spínání proudu drží cívku v rotaci.

#### 1b) Konstrukce Jednoduchého Motoru
- Vezměte **měděnou cívku** (20–30 závitů) na otočném ložisku.
- Připevněte ji mezi dva **permanentní magnety** (severní pól na jedné straně, jižní na druhé).
- Připojte dva vodiče na **segmentovaný komutátor** (nebo papírový disk s vodivými segmenty).
- Komutátor se otáčí s cívkou, ale vodiče se dotýkají jen jednoho segmentu najednou.

#### 1c) Spuštění Motoru
- Připojte baterii (6V nebo 9V) — proud protéká cívkou.
- Cívka se otáčí! Komutátor automaticky "vypíná" proud v správných okamžicích.
- **Výsledek**: Nepřetržitá rotace — **elektromotor funguje**.

#### 1d) Měření Parametrů
- Měřte otáčky motoru (počet otáček za minutu).
- Zvyšte napětí — motor se otáčí rychleji.
- Změní se polarita magnetů — motor se otáčí opačným směrem.
- Přidejte zátěž (např. ventilátorové listy) — motor se zpomaluje, ale síla se zvyšuje.

### Krok 2: Generátor — Opačný Princip Motoru

#### 2a) Teoretická Příprava
- Generátor pracuje opačně: **Pohyb v poli = Napětí** (Faraday's law).
- Když otáčíte cívkou v magnetickém poli, indukuje se napětí.

#### 2b) Konstrukce Generátoru
- Vezměte stejný motor z Kroku 1.
- Místo připojení baterie jste se otáčíte cívkou **ručně** (krankshaft).
- Měřte napětí na **voltmetru** připojeném k vývodu.
- Čím rychleji otáčíte, tím vyšší napětí!

#### 2c) Praktická Aplikace
- Připojte LED na výstup — otáčením cívky zažehujete LED!
- Toto je princip **dynamáka** na kole (staré světlo bez baterie).
- Moderní varianta: **piezoelektrické** (zvuk → napětí) nebo **elektromagnetické** generátory.

#### 2d) Měření Účinnosti
- Měřte **mechanický výkon**, který musíte dodat (síla × otáčky).
- Měřte **elektrický výkon**, který generátor vytváří.
- Účinnost = elektr. výkon / mech. výkon.
- Typicky 60–80% pro laboratoře.

### Krok 3: Magnetická Levitace — Překonání Gravitace

#### 3a) Pasivní Levitace
- Vezměte **silný neodymový magnet**.
- Umístěte jej na tvrdou podložku (severní pól nahoru).
- Položte druhý magnet **stejný pól nahoru** → magnet se levituje!
- Měřte výšku levitace.

#### 3b) Analýza Stability
- Vyzkoušejte, jak je levitace stabilní — posuňte magnet horizontálně.
- Magnet se vrátí do rovnováhy? (Stabilní)
- Nebo padne? (Nestabilní)
- Vysvětlení: Pasivní levitace je **vždy nestabilní** — magnetická pole nemůžou sama o sobě udržet stabilitu.

#### 3c) Aktivní Levitace — Elektromagnetická Stabilizace
- Vezměte elektromagnet na senzorem (např. Hallův senzor).
- Senzor detekuje pozici levitujícího magnetu.
- Řídící obvod **reguluje proud elektromagnetu**.
- Pokud magnet padá, zvýšíte proud → zvýšíte pole → magnet se zvedne.
- Pokud stoupá, snížíte proud.
- **Výsledek**: Stabilní levitace! — Princip **maglev vlaků**.

#### 3d) Měření Podpory
- Měřte, jakou váhu může levitující magnet "nést".
- Postupně přidávejte závaží na horní magnet.
- Zaznamenávejte maximální podporovanou váhu.

### Krok 4: Elektromagnetické Brzdění — Lenz Zákon v Akci

#### 4a) Principu Brzdění
- Cuando magnet padá skrz cívku, indukuje v cívce **proud** (Faraday).
- Tento proud vytváří **magnetické pole** (Ampère).
- Pole se **opírá** proti pohybu magnetu (Lenz' zákon).
- **Výsledek**: Magnet se zpomaluje bez mechanického kontaktu!

#### 4b) Experimentální Nastavení
- Vertikální hliníková nebo měďěná trubice (vodivá, ale **nemagnetická**).
- Padá skrz ni neodymový magnet.
- Měřte čas pádu v tubuicy vs. volný pád (bez tubuiky).
- V tubuicy je pád výrazně **pomalejší** — elektromagnetické brzdění funguje!

#### 4c) Měření Brzdící Síly
- Vypočítejte sílu brzdění: **F_braking = m · g - m · a**
  (kde a je naměřené zrychlení v tubuici)
- Brzdící síla je menší, čím pomaleji magnet padá.
- To je důvod, proč "terminálu rychlost" — brzdící síla se rovná gravitaci.

#### 4d) Praktické Aplikace
- **Vibračně izolace** — budovy na zemětřesení.
- **Brzdy vlaků** — bez tření, bez opotřebení.
- **Tlumení** — mikrofony, sluchátka, měřicí přístroje.

### Krok 5: Transformátor — Bezstratový Přenos Energie

#### 5a) Principu Transformátoru
- Dvě cívky na **stejném želez**ném jádru.
- Primární cívka: připojíte AC napětí (střídavý proud).
- Sekundární cívka: měří se napětí.
- **Fyzika**: Střídavý proud v primární → měnící se pole v jádru → indukuje napětí v sekundární.

#### 5b) Konstrukce Transformátoru
- Vezměte ferritový jádr (tvaru I nebo toroid).
- Naviňte **100 závitů** na primární stranu.
- Naviňte **50 závitů** na sekundární stranu (poměr 2:1).
- Připojte primáru na AC zdroj (např. adaptér z telefonu, cca 12V AC).

#### 5c) Měření Transformace
- Měřte napětí na primární: např. 12V.
- Měřte napětí na sekundární: mělo by být **12V × (50/100) = 6V**.
- Právě **transformátor funguje**!

#### 5d) Ideální vs. Reálné Transformátory
- V ideálním: **V₁/V₂ = N₁/N₂** (přesně).
- V realitě: Ztráty v jádru, odporů drátů → **účinnost 90–95%**.
- Ale stále **bezstratový** pro energii — žádný motor, žádné pohyby.

#### 5e) Praktické Aplikace
- **Adaptéry** — 230V domácí na 5V/9V telefon.
- **Přenosové vedení** — transformace na vysoké napětí pro dlouhé vzdálenosti.
- **Nabíječky** — převod střídavého na stejnosměrný (DC).

### Krok 6: Hallův Senzor — Detekce Magnetického Pole

#### 6a) Princip Hallova Efektu
- Když proud protéká vodičem v magnetickém poli, **Lorentzova síla** odklání nosičské náboje.
- Na stranách vodiče se hromadí náboje → vzniká napětí.
- Toto napětí je **úměrné magnetickému poli**.

#### 6b) Experimentální Měření
- Vezměte Hallův senzor (např. z aplikace v telefonu nebo samostatný komponent).
- Připojte jej na voltmetr.
- Přiblížíte magnet — napětí na senzoru se změní.
- Měřte napětí pro různé polohy magnetu.

#### 6c) Aplikace
- **Senzory polohy** — detekce otáčení motorů (bez mechanických kontaktů).
- **Bezpečnostní uzávěry** — dveřní senzory.
- **Kompasy** — detekce zemského pole.
- **Aut motory** — řídění zážehu.

### Krok 7: Praktické Projekty — Stavba Vlastních Zařízení

#### 7a) Projekt: Elektromagnetická Brána
- Elektromagnet umístěný v dveřním zárubni.
- Aktivuje se, když se přiblíží **RFID kartička** (obsahuje magnet nebo je detekován senzorem).
- Zamkne dveře — praktické bezpečnostní řešení.

#### 7b) Projekt: Magnetický Separátor
- Elektromagnet nad dopravníkem.
- Železné objekty se **přitahují nahoru** — oddělují se od ostatního.
- Praktická aplikace: **recyklace**.

#### 7c) Projekt: Magnetické Pero
- Drát maturován kolem tubuiky se železnými korálky.
- Hmyz na konci drátu se chová jako magnet.
- Táhání směrem nahoru-dolů "chytá" korálky.
- Zábavná hračka, která vysvětluje magnetismus.

#### 7d) Projekt: Jednoduchý Maglev
- Dva elektromagnety na kolejnicích.
- Permanentní magnet na vozíku (stejný pól skrz magnety).
- Elektromagnety se **aktivují v posloupnosti** — vozík se táhne dopředu.
- Jednoduchý model maglev vlaku!

---

## Pozorování – Tabulka Dat

### Tabulka 1: Elektromotor — Otáčky vs. Napětí

| Napětí (V) | Otáčky (RPM) | Síla (g na páce) | Poznámka |
|---|---|---|---|
| 3 | 50 | 100 | Pomalý |
| 6 | 150 | 250 | Střední |
| 9 | 300 | 400 | Rychlý |
| 12 | 500 | 500 | Velmi rychlý |

### Tabulka 2: Generátor — Otáčky vs. Napětí

| Otáčky (RPM) | Napětí (V) | Proud LED (mA) | Jas LED |
|---|---|---|---|
| 50 | 0.5 | 5 | Sotva vidět |
| 100 | 1.5 | 15 | Slabě |
| 200 | 4.0 | 40 | Normálně |
| 300 | 6.0 | 60 | Jasně |

### Tabulka 3: Magnetická Levitace — Výška vs. Tvar Magnetu

| Tvar Magnetu | Výška Levitace (cm) | Stabilita | Max Hmotnost (g) | Poznámka |
|---|---|---|---|---|
| Koule | 1.2 | Nízká | 0 | Nestabilní |
| Válec | 0.8 | Velmi nízká | 0 | Spadne |
| Podkova | 2.5 | Vyšší | 50 | Lépe |
| S aktivní kontrolou | 3.0 | Vysoká | 500 | Maglev! |

### Tabulka 4: Elektromagnetické Brzdění — Pád v Trubici

| Typ Trubiky | Čas Pádu (s) | Zrychlení (m/s²) | Brzdící Síla (N) | Poznámka |
|---|---|---|---|---|
| Volný pád | 0.45 | 9.8 | 0 | Bez brzdění |
| Hliník | 0.90 | 4.9 | 0.5 | Slabé |
| Měď | 1.50 | 3.0 | 0.8 | Silnější |
| Supravodič | 2.00+ | 1.5 | 1.0+ | Prakticky zastaví |

### Tabulka 5: Transformátor — Poměr Závitů vs. Napětí

| Primární (závitů) | Sekundární (závitů) | V_primární (V) | V_sekundární (V) | Poměr (théoretický) | Poměr (reálný) |
|---|---|---|---|---|---|
| 100 | 50 | 12.0 | 5.9 | 6.0 | 5.9 |
| 100 | 100 | 12.0 | 11.8 | 12.0 | 11.8 |
| 100 | 200 | 12.0 | 24.0 | 24.0 | 23.8 |

---

## Vysvětlení – Fyzika za Pokusem

### 1. Elektromotor — Lorentzova Síla

Když proud **I** protéká drát délky **L** v magnetickém poli **B**:

**F = B · I · L · sin(θ)**

Kde **θ** je úhel mezi drát a polem.

V motoru:
- Cívka má mnoho drátů → součet sil → **točivý moment**.
- Komutátor automaticky **přepíná polaritu** → cívka se neustále otáčí.

### 2. Generátor — Faradayův Zákon Indukce

Když se cívka otáčí v magnetickém poli, magnetický tok se **mění**:

**ε = -N · dΦ/dt**

Kde:
- **N** = počet závitů
- **Φ** = magnetický tok
- **dΦ/dt** = změna toku

Čím **rychleji** se cívka otáčí, tím **vyšší napětí** se indukuje.

### 3. Levitace — Rovnováha Sil

V levitaci se **odpuzující magnetická síla rovná váze**:

**F_mag = m · g**

Aktivní levitace (s kontrolou) překonává **instabilitu pasivní levitace** — což vede k **maglev technologiím**.

### 4. Brzdění — Lenzův Zákon

Když magnet padá cívkou:
1. Měnící se pole **indukuje proud** v cívce (Faraday).
2. Indukovaný proud vytváří **pole, které se opírá** proti změně (Lenz).
3. **Výsledek**: Magnet se **zpomaluje** bez mechanického tření.

Toto je **bezstratový brzdění** — energie se mění na **Jouleův teplo** v cívce.

### 5. Transformátor — Ideální Transformace

V ideálním transformátoru:

**V₁ · I₁ = V₂ · I₂** (zachování energie)
**V₁/V₂ = N₁/N₂** (transformační poměr)

Tedy:
- Zvýšíme-li napětí → snížíme proud (a naopak).
- Transformátor **nestvára energii** — jen ji "mění tvar".

### 6. Hallův Efekt — Lorentzova Síla na Nosiče

V Hallově senzoru, když je vodič v poli:

**V_H = (I · B) / (n · e · d)**

Kde:
- **V_H** = Hallovo napětí (měřitelné)
- **I** = proud
- **B** = magnetické pole (měřené)
- Ostatní konstanty

Tedy: **V_H je přímo úměrné B** — senzor měří pole!

---

## Rozšíření – Varianty Pokusů

### Pokus 1: Maglev Vozítko — Miniaturní Model
- Kolejnice s elektromagnety.
- Vozítko s permanentním magnetem.
- Elektronická kontrola → vozítko se pohybuje bez tření.
- **Cíl**: Pochopit princip maglev vlaků.

### Pokus 2: Magnetická Osa Synchronního Motoru
- Rotor s permanentním magnetem.
- Stator se střídavou cívkou.
- Magnet se otáčí **synchronně** s frekvencí proudu (50 Hz = 3000 RPM).
- **Cíl**: Praktické elektromotory (klimatizace, lednice).

### Pokus 3: Induktivní Nabíjení
- Dvě cívky bez fyzického kontaktu.
- Primární se střídavým proudem → Sekundární se indukuje napětí.
- Použito v bezdrátových nabíječkách.
- **Cíl**: Moderní bezdrátová technologie.

### Pokus 4: Magnetometr z Telefonu
- Aplikace na mobilu měří magnetické pole.
- Kreslíte magnetické "obrazce" pomocí magnetu.
- **Cíl**: Porozumět Hallovu efektu pomocí moderní technologie.

### Pokus 5: Supravodivé Magnety (Teoretické)
- Supravodič nemá odpor → magnetické pole se v něm "zamrzne".
- Magnet umístěný na supravodiči se levituje s **ideální stabilitou**.
- Prakticky: tekutý dusík na supravodivém magnetu = permanentní levitace bez elektřiny.
- **Cíl**: Pochopení supravodivosti a ideálních fyzikálních stavů.

### Pokus 6: Elektromagnetické Tlumiče
- Vozítko s elektromagnety pod kolesy.
- Terén je vodivý (měď, hliník).
- Vozítko se "klouzá" bez tření — elektromagnetické tlumení.
- **Cíl**: Praktické aplikace v dopravě a zařízení.

### Pokus 7: Magnetické Artsy — Ferofluida Kinetické Skulptury
- Ferofluida v plastové láhvi.
- Permanentní magnety okolo — vytváříte "umělecké" tvary.
- Fotografování krásných obrazců.
- **Cíl**: Propojení vědy a umění — magnetismus je krásný!

---

## Závěr

Aplikace magnetů jsou **všudypřítomné** — od nejjednoduše elektromagnety po nejsofistikovanější kvantové počítače. V tomto pokusu jsme:

1. **Vytvořili elektromotor a generátor** — základní energie konverze.
2. **Pochopili levitaci a brzdění** — překonání hmotnosti bez tření.
3. **Postavili transformátor** — přenos energie přes obrovské vzdálenosti.
4. **Experimentovali s Hallovým senzorem** — měření neviditelného pole.
5. **Projektovali praktické aplikace** — od domácích gadgetů po maglev vlaky.

Magnetismus je **základ moderního života**:

- **Energetika** — generátory a transformátory udržují svět osvětlen.
- **Doprava** — motory vozí miliardy lidí.
- **Komunikace** —磁 disk uchovávají naši paměť.
- **Medicína** — MRI scany vidí do našich těl.
- **Budoucnost** — supravodivé magnety, fúzní reaktory, kvantové počítače.

Bez magnetismu by naše civilizace **vrátila se do kamenné doby** — bez elektřiny, bez technologie, bez pokroku.

Porozumění magnetismu nás učí, že **fyzika je silou, která tvaruje realitu** — a my jsme její tvůrci.

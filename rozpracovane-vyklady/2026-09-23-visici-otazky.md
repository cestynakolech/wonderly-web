# Kde jsou ty čtyři visící otázky na učitele (23. 9. 2026)

Zjišťovací úkol — nic se needitovalo v `src/data/`, necommitovalo se.

## Shrnutí jednou větou

Všechny čtyři otázky jsou zapsané v `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md`
v úvodním bloku „ČEKÁ NA ROZHODNUTÍ UČITELE (23. 8. 2026)", řádky 1–43.
V `KE-SCHVALENI.md` nejsou a podle historie gitu tam **nikdy nebyly** — ten soubor
vznikl až 21. 9. 2026 (commit `6ab6cf2`), tedy o měsíc později. Žádná ze čtyř
otázek nebyla vyřešena; sporná čísla jsou na webu dodnes.

---

## 1. Ochranná pásma elektrického vedení (metry)

**Kde je zapsaná**
- `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md`, ř. 7–21 (bod 1 bloku „ČEKÁ NA
  ROZHODNUTÍ UČITELE (23. 8. 2026)").
- Odkaz na tentýž nález: `~/Desktop/wonderly-web/PROGRESS-ARCHIV.md`, ř. 1648–1649
  („3 body čekají na rozhodnutí učitele … rozpor prezentace vs. zákon 458/2000 Sb.").
- Kopie téhož ve snapshotech auditu: `~/Desktop/Omega/dokumenty/wonderly-audit/8/
  publikace-pilot-*/PROGRESS.md` ř. 193 a `.../SAMOSTATNY-REZIM.md` — jde o zrcadla
  repozitáře, ne o samostatnou evidenci.

**Stav: OTEVŘENÁ.** Rozpor: prezentace „Elektřina 9" uvádí 7 m do 1 kV a 10 m pro
1–35 kV; zákon 458/2000 Sb. uvádí 7/12/15/20/30 m podle napětí a 1 m u izolovaného
kabelu do 1 kV. Zdrojové PDF učitele (9. roč., str. 3–5) žádné metry neobsahuje
(str. 6 je zamčený placený obsah).

**Co dnes tvrdí web**
- `src/data/temata.ts`, ř. 2798 (podtéma `ucinky-proudu-bezpecnost`, F9):
  ochranné pásmo je zmíněné **bez jediného čísla v metrech** — jen zásada „čím vyšší
  napětí vedení má, tím širší ochranné pásmo je". Zákon č. 458/2000 Sb. je v celém
  `temata.ts` citovaný právě 1×.
- `src/components/skola2/BezpecnaVzdalenostVedeniSimulace.astro`, ř. 3–4 a 85:
  v komentáři je doložené, že původní verze měla 7/10/12/15/20/25 m a byla
  22. 8. 2026 přepracovaná — „žádné metry, jen kvalitativní odstup".
- `src/data/kvizy.ts`, ř. 4629: otázka na šířku pásma je také kvalitativní, bez metrů.
→ Stav „metry vynechané" platí, rozhodnutí učitele zatím jen nepadlo.

**Stopa v gitu po `KE-SCHVALENI.md`:** `git log -S "458/2000" -- KE-SCHVALENI.md` = 0
commitů. Prohledání **všech 10 historických verzí** souboru (`git show <commit>:KE-SCHVALENI.md`)
na `458/2000` = 0 nálezů. Nikdy tam nebyla, nic se nemazalo.

---

## 2. Práh „od ~50 V se prorazí kůže"

**Kde je zapsaná**
- `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md`, ř. 22–24 (bod 2) a znovu ř. 30–33.
- `~/Desktop/wonderly-web/PROGRESS-ARCHIV.md`, ř. 1649.
- Pracovní protokoly (nález popsaný, ale uzavřený rozhodnutím orchestrátora, ne učitele):
  - `rozpracovane-vyklady/2026-09-21/kontrola-ucinky-proudu-a-bezpecnost-f8-2026-09-21b.md`, ř. 24–27
  - `rozpracovane-vyklady/2026-09-21/kontrola-ucinky-proudu-a-bezpecnost-f8-2026-09-21c.md`, ř. 14
  - `rozpracovane-vyklady/2026-09-21/vyklad-ucinky-proudu-a-bezpecnost-f8.md`, ř. 166
  - `rozpracovane-vyklady/2026-09-21/vyklad-ucinky-proudu-bezpecnost-f9.md`, ř. 79

**Stav: OTEVŘENÁ vůči učiteli.** Doklad: protokoly 21. 9. výslovně uvádějí, že PDF
slovo „prorazí" ani hodnotu „50 V" **vůbec neobsahuje** (ověřeno grepem celého textu
PDF) a že text zůstal jen proto, že „PDF ho nepopírá" — to je rozhodnutí orchestrátora,
ne odpověď učitele. Otázka ze SAMOSTATNY-REZIM.md tím nezanikla.

**Co dnes tvrdí web — číslo je pořád tam, na pěti místech:**
- `src/data/temata.ts` ř. 2450 (F8 `ucinky-proudu-a-bezpecnost`): „Od zhruba 50 V se
  ale kůže prorazí a odpor těla klesne na ~2 000 Ω"; totéž v sekci „Pro zvídavé".
- `src/data/temata.ts` ř. 2798 (F9 `ucinky-proudu-bezpecnost`): „Od napětí kolem 50 V
  se ale kůže prorazí…"; ř. 2799 i v `zapis.body`.
- `src/components/skola2/UcinkyProuduABezpecnostSimulace.astro` ř. 6–8, 29–31, 115.
- `src/data/kvizy.ts` ř. 4260, 4261, 4617, 4623.

**Stopa v gitu po `KE-SCHVALENI.md`:** 0 commitů, 0 nálezů ve všech historických verzích.

---

## 3. Bezpečné napětí 50 V střídavých / 120 V stejnosměrných v suchu

**Kde je zapsaná**
- `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md`, ř. 25–33 (bod 3).
- `~/Desktop/wonderly-web/PROGRESS-ARCHIV.md`, ř. 1649.
- Protokoly: `rozpracovane-vyklady/2026-09-21/kontrola-ucinky-proudu-a-bezpecnost-f8-2026-09-21b.md`
  ř. 24–27; `.../kontrola-…-f8-2026-09-21d.md` ř. 15; `.../vyklad-ucinky-proudu-a-bezpecnost-f8.md`
  ř. 166; `.../vyklad-ucinky-proudu-bezpecnost-f9.md` ř. 81.

**Stav: OTEVŘENÁ.** PDF (str. 4) doslova uvádí jen „stejnosměrného napětí podle normy
je 25 V a střídavého napětí 12 V" — BEZ rozlišení suchých a vlhkých prostor.

**Související, dosud neuzavřený rozpor uvnitř webu:** `SAMOSTATNY-REZIM.md` ř. 429–434
(„⚡ Nekonzistence bezpečného napětí mezi 8. a 9. ročníkem", zadáno 20. 8. 2026):
8. ročník uváděl ve vlhku 30 V ss / sucho 120 V, 9. ročník obecně 25 V. Řádková čísla
v tom zápisu (`temata.ts:3749`, `:4656`) jsou už zastaralá, obsah ale dodnes nesjednocen.

**Co dnes tvrdí web**
- `src/data/temata.ts` ř. 2450 (F8): „V suchých místnostech jsou meze vyšší
  (střídavé 50 V, stejnosměrné 120 V)."
- `src/data/temata.ts` ř. 2798 (F9): „V suchých místnostech jsou meze vyšší —
  střídavé 50 V, stejnosměrné 120 V."
- `src/data/kvizy.ts` ř. 4247, 4259 (otázka s odpovědí „120 V"), 4616, 4624.
→ Beze změny, přesně jak to bylo popsané 23. 8. 2026.

**Stopa v gitu po `KE-SCHVALENI.md`:** `git log -S "120 V" -- KE-SCHVALENI.md` = 0
commitů; 0 nálezů ve všech historických verzích.

---

## 4. Tíže na Jupiteru: 2,36× (prezentace) × 2,53× (výpočet)

**Kde je zapsaná**
- `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md`, ř. 34–43 (bod 4).
- `~/Desktop/Omega/dokumenty/DENIK-CHYB.md`, ř. 626 — záznam
  `audit-simulaci-F6-F7-tize-planet`: kontrolor porovnával tíži proti vzorci G·M/R²,
  zdrojem je ale tabulka učitele (Síla 6.pptx, snímek 11), Jupiter 2,36× místo 2,53×.
- Kontext vzniku simulace: `PROGRESS-ARCHIV.md` ř. 1034,
  `SAMOSTATNY-REZIM-ARCHIV.md` ř. 1916.

**Stav: OTEVŘENÁ.** Doklad, že se čeká na učitele: bod byl do bloku doplněn commitem
`e481390` (22. 8. 2026, „audit simulaci dokoncen pro vsechny rocniky, **4. bod
k rozhodnuti ucitele**"). Předtím commit `6469422` (22. 8. 2026) do simulace jen
doplnil vysvětlující komentář, hodnotu nezměnil.

**Co dnes tvrdí web**
- `src/components/skola2/PlanetyVahaSimulace.astro` ř. 42:
  `{ n: 'Jupiter', pad: 'na Jupiteru', k: 2.36, … }` — pořád hodnota z prezentace.
- tamtéž ř. 85: `const skala = 170 / 2.36; // koef 2,36 (Jupiter) = 170 px`.
- Hodnota 2,53 se ve zdrojovém kódu webu **nevyskytuje vůbec**.
→ Simulace zůstává podle prezentace, přesně jak blok popisuje.

**Stopa v gitu po `KE-SCHVALENI.md`:** `git log -S "Jupiter" / -S "2,36" / -S "2,53"
-- KE-SCHVALENI.md` = 0 commitů; 0 nálezů ve všech 10 historických verzích souboru.

---

## Proč si ty dvě evidence odporují

**Nejde o smazání — jde o dvě nezávislé evidence založené v jiný čas.**

| | `SAMOSTATNY-REZIM.md`, blok „ČEKÁ NA ROZHODNUTÍ UČITELE" | `KE-SCHVALENI.md` |
|---|---|---|
| vznik | body 1–3: 22. 8. 2026 (commit `1168bcf`); bod 4: 22. 8. 2026 (commit `e481390`) | 21. 9. 2026 (commit `6ab6cf2`) |
| původ | audit simulací a kontrola podkladů F8/F9 (léto) | přestavba fyziky podle PDF/prezentací (září) |
| obsah | ty 4 otázky | 21 bodů z podkladů F7/F8/F9, ani jeden z těch 4 |

`KE-SCHVALENI.md` byl založen o měsíc později a jeho hlavička ho vymezuje jen na
„nálezy z podkladů" té přestavby. Starší čtyři otázky do něj nikdo nepřenesl.
Ověřeno tvrdou kotvou: `git log -S` na všech šest výrazů nad `KE-SCHVALENI.md`
vrací **nula commitů** a průchod **všemi 10 historickými verzemi** souboru
(`6ab6cf2`, `93926d0`, `6b013d3`, `0f95f7f`, `e8467c9`, `b5906d1`, `98e36ec`,
`da10dac`, `bf2fbe8`, `696b335`) nenašel ani jeden z výrazů `458/2000`, `Jupiter`,
`2,36`, `2,53`, `120 V`.

**Závěr:** fronta má pravdu, otázky jsou opravdu otevřené — jen jsou zapsané
v `SAMOSTATNY-REZIM.md` (ř. 1–43), ne v `KE-SCHVALENI.md`. Náprava (až ji učitel
schválí) = přenést ty čtyři body do `KE-SCHVALENI.md`, aby existovalo jedno místo
pravdy; to už je ale editace, která do tohoto zjišťovacího úkolu nepatří.

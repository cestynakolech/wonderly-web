# 2. kolo nezávislé kontroly kvízů — F8 elektřina (7 podtémat)

Kontrolor, 22. 9. 2026. Čerstvý kontext, jen čtení. Zdroje: `node testy/vypis-kviz.mjs <klic>`
(plné znění včetně odpovědí a vysvětlení), `node podtema.mjs . get fyzika/8-rocnik/elektrina/<klic>`,
`git show d5cfb32 -- src/data/kvizy.ts` (co přesně se v 1. kole změnilo).
Všechny početní úlohy přepočítány `node -e`: 22·1:1,1 = 20 · 3·4:2 = 6 · 4+6 = 10 · 10−6 = 4 ·
3·2 = 6 · 10:(2+3) = 2 · (2+5)·3 = 21 · 1+1+1 = 3 · 12:3 = 4 · 2+5 = 7 · 1:(1/4+1/4) = 2 ·
12·4 = 48 · 2·3 = 6 · 1·5·5 = 25 · 0,5·4 = 2 · 240:12 = 20 · 0,1·5·30 = 15 · 1 Wh = 3 600 J ·
230:2000 = 0,115. **Všechny sedí, chybná fyzika nikde.**
Počet otázek: 21 u všech sedmi klíčů (ověřeno skriptem nad daty, ne nad textem souboru).
Délkový náskok správné (první) odpovědi: skript nad `nactiData()`, práh 10 znaků —
**nikde překročen**; největší zbytky jsou +9 (za-sebou č. 12), +8 (za-sebou č. 2), +6, +5 —
všechny na otázkách, kterých se 1. kolo nedotklo. `node testy/uniky.mjs` = 0 duplicit / 0 úniků,
ale to je měřidlo slepé k přeformulovanému významu (vlastní seznam mezí, bod 4 a 8) —
proto níže ruční nález úniků.
NIC nebylo zapisováno do `kvizy.ts` ani `temata.ts`.

Nálezy typu **únik** hlásím podle definice samotného měřidla: v textu/vysvětlení otázky A jsou
ROZLIŠUJÍCÍ slova správné odpovědi B (tedy to, čím se liší od svých vlastních distraktorů)
a A zároveň ukazuje na téma B. Pořadí otázek uvádím u těch úniků, kde žák dostane nápovědu
DŘÍV, než se na věc ptáme (tam je škoda největší).

---

## zavislost-odporu-na-vodici — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné. Ověřeno kus po kuse: č. 20 (pořadí kovů) škrtnuto a nahrazeno úlohou
l = R·S:ρ = 20 m (souhlasí s výkladem doslova), č. 19 nahrazeno „Kolik ohmů je 1 kΩ?"
(kryje h2 i ZAPIS), distraktory č. 8, 12 a 4 srovnány (náskok +23/+13/+10 → dnes −4/−16/−3).

NOVÉ:
1. **DROBNÉ | otázka č. 20 | „Nichromový drát (ρ = 1,1 Ω·mm²/m)…"** — nové vysvětlení začíná
   „**Ze vzorce R = ρ · l : S** plyne…", což je doslova správná odpověď otázky č. 5
   („Který vzorec platí pro odpor vodiče?" → `R = ρ · l / S` proti `R = ρ · S / l` a `R = l · S / ρ`).
   **NÁVRH vysvětlení:** „Hledáme délku, proto vzorec obrátíme: l = R · S : ρ = 22 · 1 : 1,1 = 20 m."
   **POZOR:** týž tvar má i otázka č. 21 („R = ρ·l/S = 3 · 4 / 2 = 6 Ω"), které se 1. kolo
   nedotklo. Oprava má smysl jen tehdy, když se udělá u OBOU — jinak únik zůstane.

---

## ohmuv-zakon — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné. Nová č. 8 (graf = přímka z počátku) i nová č. 11 (čí odpor rozhoduje)
mají ve výkladu doslovnou oporu, letopočet 1826 i „Kdy platí Ohmův zákon přesně" pryč,
početní otázky z nadstavby jsou dnes na konci bloku (č. 20 a 21).

NOVÉ:
1. **ZÁVAŽNÉ | otázka č. 8 | „Jak vypadá graf závislosti proudu na napětí…"** — vysvětlení
   „**Kolikrát se zvětší napětí, tolikrát se zvětší proud**" je přesně odpověď na otázku č. 12
   („Napětí se zvětší třikrát… Co se stane s proudem?" → `zvětší se také třikrát`) a zároveň
   na č. 1 (`proud je přímo úměrný napětí`). Otázka 8 stojí PŘED oběma, žák tedy dostane
   nápovědu dřív, než se ptáme.
   **NÁVRH vysvětlení:** „Všechny naměřené dvojice leží na jedné přímce a ta začíná v nule —
   bez napětí obvodem nic neteče."
2. **DROBNÉ | otázka č. 6 | „Jak měříme odpor spotřebiče?"** — nové vysvětlení „Odpor určíme
   jako **podíl naměřeného napětí a proudu**" je slovní zápis odpovědi otázky č. 5
   (`R = U / I` proti `R = U · I` a `R = I / U`); otázka 6 stojí hned za ní.
   (Proti původnímu „Z Ohmova zákona R = U/I." je to zlepšení, únik ale trvá.)
   **NÁVRH vysvětlení:** „Změříme dvě veličiny a třetí k nim dopočítáme z Ohmova zákona."

---

## zapojeni-spotrebicu-za-sebou — VERDIKT: NESLADĚNO (3)

NEVYŘEŠENÉ: žádné. Ampérmetrová otázka pryč, poměr napětí doplněn, „zákon zachování toku"
doplněn, distraktory č. 3 srovnány (+11 → −6). Šest početních otázek znovu přepočítáno, sedí.

NOVÉ:
1. **ZÁVAŽNÉ | otázka č. 7 | „Jak se jmenuje pravidlo, podle kterého…"** — ZNĚNÍ otázky
   obsahuje „…podle kterého **je proud stejný ve všech částech sériového obvodu**", což je
   doslova správná odpověď otázky č. 2 („Jak se chová proud v sériovém obvodu?" → `je všude
   stejný` proti `dělí se` / `roste`). Otázka 2 sice stojí dřív, ale jde o únik v obou směrech
   a měřidlo ho nevidí (přeformulovaná fráze).
   **NÁVRH znění:** „Jak se jmenuje pravidlo, kterým se v sériovém obvodu řídí velikost proudu
   v jednotlivých částech obvodu?" (odpovědi i vysvětlení beze změny)
2. **ZÁVAŽNÉ | otázka č. 21 | „Sériově jsou zapojené rezistory 4 Ω a 2 Ω…"** — vysvětlení končí
   „**na větším odporu je větší napětí**", což je doslova odpověď otázky č. 5 („Na kterém
   rezistoru je větší napětí?" → `na tom s větším odporem`).
   **NÁVRH vysvětlení:** „Poměr napětí je stejný jako poměr odporů: 4 : 2, tedy 2 : 1."
3. **DROBNÉ | otázka č. 21 | tatáž otázka, dvojznačné zadání** — „V jakém poměru se mezi ně
   rozdělí napětí zdroje?" neříká, v jakém pořadí se poměr zapisuje, a nabídnuté odpovědi
   obsahují `2 : 1` i `1 : 2`. Žák, který čte „mezi ně" jako „2 Ω ku 4 Ω", odpoví správně
   a dostane chybu. Sesterská otázka v bloku vedle-sebe to má ošetřené závorkou.
   **NÁVRH znění:** „Sériově jsou zapojené rezistory 4 Ω a 2 Ω. V jakém poměru se mezi ně
   rozdělí napětí zdroje (ve stejném pořadí)?"

---

## zapojeni-spotrebicu-vedle-sebe — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné. Distraktory č. 1, 2 a 12 srovnány (+19/+23/+11 → pod prahem),
230 V z vysvětlení č. 9 pryč, poměr proudů doplněn (č. 21) a čísla 2 A / 4 A z jeho
vysvětlení skutečně odstraněna (únik do č. 16 nevznikl). Poměr 1 : 2 přepočítán: I₁ = U:6,
I₂ = U:3 → 1 : 2, shodné s výkladem.

NOVÉ:
1. **ZÁVAŽNÉ | otázka č. 9 | „Jak jsou zapojené zásuvky v domácnosti?"** — oprava vysvětlení
   z 1. kola sice odstranila nepodložených 230 V, ale zanesla nový únik: „Zásuvka bývá
   **spojená přímo s oběma póly** rozvodu, proto mají všechny **stejné napětí** a **spotřebiče
   se navzájem neovlivňují**" prozrazuje najednou odpověď č. 14 (`je připojen přímo na póly
   zdroje`, vysvětlení tamtéž „ostatní spotřebiče ji neovlivní") i č. 2 (`na všech je stejné
   jako u zdroje`). Otázka 9 stojí PŘED oběma.
   **NÁVRH vysvětlení:** „V bytě jsou zásuvky vedle sebe, ne za sebou — proto můžeš zapnout
   třeba jen jeden spotřebič a ostatní zásuvky to nezmění."
2. **ZÁVAŽNÉ | otázka č. 21 | „Paralelně jsou rezistory 6 Ω a 3 Ω…"** — vysvětlení
   „**čím menší odpor má větev, tím víc proudu jí protéká**" je doslova odpověď otázky č. 5
   („Kterou větví teče větší proud?" → `tou s menším odporem`).
   **NÁVRH vysvětlení:** „Odpory jsou v poměru 6 : 3, tedy 2 : 1 — proudy vyjdou přesně
   obráceně, 1 : 2."

---

## rezistor-s-promennym-odporem — VERDIKT: SLADĚNO

NEVYŘEŠENÉ: žádné. Nová otázka č. 9 počítá P = U · I = 12 · 4 = 48 W (přepočítáno, shodné
s výkladem i se `zapis.vzorec`), jmenovitý výkon 25 W má oporu; vysvětlení č. 12 rozšířeno
podle doporučení a mezi-bloková duplicita s konstantanem/keramickým válečkem skutečně
nevznikla (slovo konstantan ani keramika se v přidaném textu neobjevují).

NOVÉ: žádné. Prověřeno zvlášť: vysvětlení č. 9 neobsahuje rozlišující slova odpovědi č. 18
(`tepla` / `vyzářit`) ani netvrdí to, na co se ptá č. 13 — únik nevznikl. Délkový náskok
u č. 10 (+5) a č. 12 (+6) je pod prahem a na otázkách, kterých se 1. kolo nedotklo.

---

## elektricka-prace-a-vykon — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné. Všech 8 nálezů zapracováno: LED „kolem poloviny" pryč, energetický štítek
zmizel z obou otázek, elektroměr nahrazen kWh, LED 10 W nahrazena doloženou úlohou 100 W /
5 h / 30 dní = 15 kWh (přepočítáno), chladnička bez cizího rozsahu 150–250 kWh, účinnostní
otázky přesunuty na konec bloku (dnes č. 18–21). Účinnost 70 % má oporu ve výkladu i v ZAPIS.

NOVÉ:
1. **DROBNÉ | otázka č. 8 | „Na co se mění elektrická energie ve vrtačce nebo v mixéru?"** —
   exekutor sice vyčistil vysvětlení, ale dvojici „akumulátor = chemická energie" nechal
   v DISTRAKTORU (`na chemickou energii v akumulátoru`). To je přesně odpověď otázky č. 16
   („Na jaký druh energie se mění elektrická energie hlavně při nabíjení akumulátoru?" →
   `na chemickou energii`), a otázka 8 stojí před ní.
   **NÁVRH odpovědí:** `na mechanickou práci` | `jen na teplo, nic jiného` | `na světlo, jako v žárovce`
   (správná zůstává první a je nejkratší; vysvětlení beze změny).
2. **DROBNÉ | otázka č. 7 | „Jakou účinnost má LED žárovka?"** — vysvětlení „LED promění na
   světlo asi **70 %** energie; **sto procent nemá žádný spotřebič**" vyřadí žákovi z otázky
   č. 19 („Jakou účinnost má klasická žárovka?" — `~5 %` / `~70 %` / `100 %`) oba distraktory
   naráz; správná odpověď zbude vyloučením. Otázka 7 stojí dřív.
   **NÁVRH vysvětlení:** „Účinnost LED je asi 70 % — zbytek energie odejde jako teplo."

---

## ucinky-proudu-a-bezpecnost — VERDIKT: SLADĚNO

NEVYŘEŠENÉ: žádné. Ionty z č. 1 pryč (dnes „tělo je vodič" — doslovná opora), pozdní účinky
i předání záchranářům doplněny (oboje doslova ve výkladu), vysvětlení jističe opraveno na
„nad 16 A, chrání vedení a dům" (16 A má oporu), obě početní otázky z nadstavby jsou na konci
(č. 20, 21). Nález 5 z 1. kola byl výslovně jen doporučení pro příští dávku, nehodnotím.

NOVÉ: žádné. Prověřeno zvlášť: vysvětlení nové č. 1 nenese rozlišující slova odpovědí č. 3
(`nemůže se pustit`), č. 4 (`dýchacích`) ani č. 13 (`pravidelný rytmus`); vysvětlení nové č. 2
neukazuje na téma č. 12 (číslo 155 v něm není); opravené vysvětlení č. 14 neprozrazuje
č. 15 (`malý únik proudu`). Hodnoty 12 V, 120 V, 1 mA, 25 mA, 30 mA, 60 mA, 2 000 Ω,
150 000 Ω, 16 A, 155 mají všechny doslovnou oporu ve výkladu.

---

## Souhrn

| klíč | nevyřešené z 1. kola | nové | verdikt |
|---|---|---|---|
| zavislost-odporu-na-vodici | 0 | 1 | NESLADĚNO |
| ohmuv-zakon | 0 | 2 | NESLADĚNO |
| zapojeni-spotrebicu-za-sebou | 0 | 3 | NESLADĚNO |
| zapojeni-spotrebicu-vedle-sebe | 0 | 2 | NESLADĚNO |
| rezistor-s-promennym-odporem | 0 | 0 | SLADĚNO |
| elektricka-prace-a-vykon | 0 | 2 | NESLADĚNO |
| ucinky-proudu-a-bezpecnost | 0 | 0 | SLADĚNO |

**Všech 34 nálezů 1. kola je vyřešeno — ani jeden nezůstal otevřený.** Všech 10 nových
nálezů je až na jednu výjimku JEDINÉHO druhu: únik odpovědi, který zanesla NOVĚ vložená
otázka (7×) nebo přeformulované vysvětlení z 1. kola (2×); jediný nález jiného druhu je
dvojznačné pořadí v poměru (za-sebou č. 21). Přesně to, kvůli čemu se druhé kolo pouští. Chybná fyzika, špatný počet otázek,
délková nápověda nad prahem ani číslo bez opory se ve druhém kole nenašly.

---

## ZAPRACOVÁNO 22. 9. 2026

- [x] zavislost-odporu-na-vodici (1): č. 20 vysvětlení přeformulováno (bez „Ze vzorce… plyne"),
      dle POZOR opraveno i č. 21 vysvětlení (formule R = ρ·l/S nahrazena přímým dosazením
      „Dosadíme: 3 · 4 : 2 = 6 Ω…"), aby únik nezůstal jen u jedné z dvojice.
- [x] ohmuv-zakon (2): č. 8 vysvětlení (graf) a č. 6 vysvětlení (měření odporu) přepsány
      podle návrhu — bez doslovných odpovědí otázek 12/1 a 5.
- [x] zapojeni-spotrebicu-za-sebou (3): č. 7 znění přeformulováno, č. 21 vysvětlení přepsáno
      (bez odpovědi otázky 5), č. 21 znění doplněno „(ve stejném pořadí)" kvůli dvojznačnosti.
- [x] zapojeni-spotrebicu-vedle-sebe (2): č. 9 vysvětlení a č. 21 vysvětlení přepsány podle
      návrhu — bez doslovných odpovědí otázek 14/2 a 5.
- [x] elektricka-prace-a-vykon (2): č. 8 distraktory nahrazeny („jen na teplo, nic jiného" /
      „na světlo, jako v žárovce"), č. 7 vysvětlení zkráceno bez vyloučení distraktorů č. 19.

Ověřeno: `node testy/vypis-kviz.mjs` = 21 otázek u všech pěti klíčů, `node testy/uniky.mjs`
= 0/0, `node zkontroluj.mjs` bez nálezu k těmto klíčům, `npm run build` bez chyb.
Body u rezistor-s-promennym-odporem a ucinky-proudu-a-bezpecnost (SLADĚNO) se nezapracovávaly.

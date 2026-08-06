# Samostatný režim — archiv starších stavů

_Odděleno 30. 7. 2026: tenhle soubor se čte na začátku každé session a starší
sekce „KDE POKRAČOVAT“ už jen zabíraly místo. Nic se nemaže — jen se sem přesunulo.
NEČTE se automaticky._

## (starší) KDE POKRAČOVAT (29. 7. 2026 odpoledne — audit webu + schválení učitele)

**SCHVÁLENO UČITELEM 29. 7. („zatím schvaluji doporučené"):** (a) nové simulace
postupně v samostatném režimu podle auditu — pořadí: zavislost-odporu-na-vodici (F8),
vznik-elektrickeho-proudu (F8), elektricka-prace-a-vykon (F8), zvuk-vznik-a-sireni (F8),
tepelny-motor-parni-stroj (F8), skupenske-zmeny-vody-v-prirode (F8),
magneticke-pole-vodice-a-civky (F9), vlastnosti-stridaveho-proudu (F9),
elektricky-naboj (F8), vetveni-programu (Inf7) — plný popis
v `Omega/dokumenty/AUDIT-WEBU-2026-07-29.md`; (b) fotky měst 2026 na web
(galerie: + R2) až po doběhnutí denní kontroly anonymizace (automat
kontrola_anonymizace.py, nálezy v `Cestovatelský deník/KONTROLA-ANONYMIZACE.md`).
HOTOVO 29. 7. odpoledne: vady deníku + vylepšení map, UX školy (hledání všude,
šipky, odznaky, „co už umím", tisk), 4 laboratorní práce (rubrika 🧪).
NEschváleno zatím: body 6–8 (údaje o stání, automat cen stellplatzů, okno okolí)
a zbylých 8 laborek — čekají na učitele.

## (starší stav) kolo 72 hotové — třetí dávka kvízů

**NOVÉ PRAVIDLO ÚSPORNOSTI (29. 7., zadal učitel):** max ~12 kol na session, pak /clear;
bez screenshotů; dávky 4+; noční rozpočet kol (návrh 12 — čeká na odklik, rozhodnutí č. 2).
Analýza: Omega/dokumenty/ANALYZA-ucinnosti-smycky-2026-07-29.md; paměť feedback-uspornost-smycky.
**V NOVÉ SESSION:** `/wonderly` + `/loop` → kolo 73 = další dávka slabých kvízů
(bezpecnost-pocitace-a-dat, digitalni-stopa-a-identita, pocitacove-site-a-internet Inf9,
klonovani-animace-hry — vše 6 otázek); zbývá 26 bloků <12 otázek.
**RÁNO ČEKÁ NA ROZHODNUTÍ:** Hermes (tabulka v chatu + audit), rozpočet kol, plánovaný restart.

Hotovo 72 kol samostatného režimu (65 simulací na 67 stránkách, 417+ kvízových otázek).
Kolo 54 = auditní: z 96 podtémat bez interakce vybráno 12 NOVÝCH kandidátů (seznam níže).
~~Kolo 55 = checkpoint dělby rolí~~ → HOTOVO 29. 7. (zápis v ~/ollama-log.md: dělba
správná, vzor „čistá funkce + Node + DOM" se osvědčil na všech 6 simulacích, beze změn;
Hermes čeká na rozhodnutí učitele; další checkpoint kolo 65).
~~Kolo 65 = checkpoint dělby rolí~~ → HOTOVO 29. 7. (zápis v ~/ollama-log.md: dělba
správná, vzor čistá funkce+Node+DOM odhalil za noc 2 skutečné chyby, kvízy zůstávají
u Clauda; další checkpoint kolo 75).
**Všech 12 kandidátů z auditu kola 54 je HOTOVÝCH** (kola 56–68). Kolo 69: kontrola
pokrytí kvízů u všech 17 stránek s novými simulacemi — všechny kvízy MAJÍ (7–21 otázek);
do 4 nejslabších doplněno 9 otázek na jevy ze simulací (grafy 7→10, plyny/kapaliny/přenos
11→13). Zbytek stránek má 12+ otázek — dorovnávat dál není nutné.
Kola 70–72: dvanáct nejslabších kvízů dorovnáno na 10 otázek (+52 celkem) — micro:bit,
robotika, projekty, tabulky, hardware. POZOR na klíče: razeni-filtrovani je pod
hromadne-zpracovani-dat (špatný prefix v kole 72 odhalila kontrola před zápisem).
**DALŠÍ KOLO (73):** další dávka slabých kvízů po 4 (zbývá 26 bloků <12; na řadě
bezpecnost-pocitace-a-dat, digitalni-stopa-a-identita, pocitacove-site-a-internet (Inf9),
klonovani-animace-hry — vše 6 otázek). Větší směry čekají na ranní rozhodnutí učitele.
POZOR: ráno čekají rozhodnutí učitele (Hermes audit + naplánovaný restart) — viz „Čeká na odkliknutí".

### Kandidáti na simulace — NOVÝ audit (kolo 54, 29. 7. 2026)

Z 96 podtémat bez interakce vybráno 12 s jevem, který jde ANIMOVAT či OVLÁDAT
(šest čistě statických ovladačů, šest s časovou animací → plná kontrola animací):

1. [x] **F7 vnimani-barev** — HOTOVO v kole 56 (BarvySimulace: reflektory na černé
   s mix-blend screen × inkousty na bílé s multiply, posuvníky 0–100 % po 10, pojmenování
   učebnicových barev, předvolby, přepočet na 0–255).
2. [x] **F9 vznik-stridaveho-proudu-alternator** — HOTOVO v kole 57 (AlternatorSimulace:
   rotor-magnet ve statoru, voltmetr ±6 dílků, sinusovka s běžícím bodem, krok ¼ otáčky
   = 4 učebnicové polohy, rychlost 1–3× → amplituda 2/4/6 dílků).
3. [x] **F9 pusobeni-pole-na-vodic-elektromotor** — HOTOVO v kole 58 (ElektromotorSimulace:
   režim síla na vodič — Fleming, ⊙/⊗, prohození proudu i pólů, rovnoběžný vodič F=0,
   proud 0–4 A = 0–4 dílky; režim motor s komutátorem — dvojice sil, přepnutí každou
   půlotáčku, bez proudu se netočí, krok ¼ otáčky).
4. [x] **F8 vyparovani** — HOTOVO v kole 59 (VyparovaniSimulace: závod louží — srovnávací
   48 min × nastavitelná; 4 činitele z výkladu (slunce, vítr, rozlití, líh) každý půlí čas
   → 48/24/12/6/3 min, šipky par podle rychlosti, hlášky o těkavosti a ochlazování).
5. [x] **F9 vedeni-proudu-v-plynech** — HOTOVO v kole 60 (JiskraSimulace: elektrody
   1–5 mm × napětí 0–18 kV po 3, práh 3 kV/mm → celá kV, ionizace; režim bouřka — blesk
   do bleskosvodu (Franklin/Diviš, 20–30 tisíc °C) + úloha „sekundy ÷ 3 = km bouřky").
6. [x] **F7 rozklad-svetla-duha** — HOTOVO v kole 61 (DuhaSimulace: hranol s vějířem
   7 barev, klik na barvu = míra lomu, obrácený hranol = Newtonův důkaz složení do bílé;
   duha s červenou nahoře + vedlejší se 2 odrazy a opačným pořadím, schéma kapky, Marci).
7. [x] **F9 jaderny-reaktor-elektrarna** — HOTOVO v kole 62 (ReaktorSimulace: tyče 0–100 %
   po 25 → generace štěpení 8→16/12/8/4/0 (celé), kritický stav při 50 %, havarijní STOP,
   diagram tří generací, hlášky o moderátoru, bórové oceli a Temelínu/Dukovanech).
8. [x] **F8 vnimani-zvuku-a-hlasitost** — HOTOVO v kole 63 (DecibelySimulace: stupnice
   0–130 dB po 10 se 14 zdroji, pásma 0/90/130 dB z výkladu, smajlík ucha, násobek vjemu
   „+10 dB ≈ 2×" od šepotu — celé mocniny dvou až 2048×).
9. [x] **F7 pretlak-podtlak-vakuum** — HOTOVO v kole 64 (PretlakSimulace: píst 1/2/4/8
   dílků → 400/200/100/50 kPa (p·V=konst, celé), manometr rozdílu proti okolí 100 kPa,
   vývěva → vakuum −100 kPa, molekuly houstnou/mizí, příklady míč/brčko/žárovka).
10. [x] **F8 energeticka-hodnota-potravin** — HOTOVO v kole 66 (SvacinaSimulace: 8 potravin
    v násobcích 200 kJ → všechny součty, % denní potřeby (10 000 kJ) i minuty chůze/běhu/
    plavání (20/40/50 kJ/min) vycházejí celé; past plovoucí čárky v % odhalena kontrolou
    256 kombinací a opravena).
11. [x] **F9 prenos-elektricke-energie** — HOTOVO v kole 67 (PrenosSimulace: 8 800 kW při
    400 V / 22 kV / 400 kV → proud 22 000/400/22 A, ztráty R·I² = 2,42 GW (nedorazí nic) /
    800 kW / 2 420 W; žhnoucí vodiče, město svítí/zhasne, trojfázové vedení).
12. [x] **Inf7 ohodnocene-grafy** — HOTOVO v kole 68 (GrafCestaSimulace: 2 mapy à 6 vrcholů,
    klikání po sousedech, živý součet, porovnání s optimem 16 km (ověřeno hrubou silou,
    jednoznačné), mapa 2 s chytákem „oklika přes víc vrcholů je levnější", kroky zpět/znovu).

Záměrně vynecháno: shrnutí, čistě výkladová témata, návody (Tinkercad, VEXcode),
témata s hotovou příbuznou simulací (tuhnutí/kondenzace ~ ohřev; zvuk-vznik ~ vlnění;
magnetické pole cívky ~ elektromagnet; polovodiče-vlastní ~ dioda; reaktor×rozpad se liší dost).
Popisy prezentací: `Omega/dokumenty/prezentace-popisy/` (nejdřív popisovač, pak číst).
Příští checkpoint dělby rolí: **kolo 55**.
Pak postupně dolů seznamem; průběžně média k Fyzice 6 a prezentace 7/8/9 (čerstvá session).
Drobný dluh ve frontě: `zkontroluj.mjs` podhodnocuje počet otázek u starších jednořádkových bloků.
**Domluva 28. 7. večer:** wonderly zůstává VÝHRADNĚ v této session (desktop app);
terminálová session s Telegram kanálem je na OSTATNÍ úkoly — do webu nezasahuje.

**✅ HOTOVO 28. 7. 14:05 — Ollama sjednocena, NEŘEŠIT ZNOVU.**
`~/.ollama/models` je symlink na `/Users/Shared/ollama-models`, `ollama list` → **11 modelů**,
stará složka (75 GB) smazána, druhý účet `radekmicek` odhlášen (uvolnilo 10,7 GB RAM a 319
procesů) a **nic to nerozbilo** — server i všech 8 automatů běží pod hlavním účtem.
Detaily a pasti: skill **`/ollama-mac`**. Komunikace s druhým účtem: skill **`/most`**
(`/Users/Shared/Claude-most/`, otestováno obousměrně). Dřívější plán s `OLLAMA_MODELS`
a variantou A byl **mylný** — proměnnou aplikace přebíjí, funguje jen symlink.

**ČEKÁ NA UŽIVATELE:**
- Odkaz na video „Teplota a její měření – F6" (na kanálu není).

**⏰ CHECKPOINT — revize dělby rolí Claude × lokální modely: V KOLE 45.**
(Pravidlo připomenuté učitelem 28. 7.: pravidelně kontrolovat, co může převzít lokální
model/automat, aby se šetřily tokeny; výsledek do ~/ollama-log.md, pravidla do ~/CLAUDE.md.
Poslední analýza proběhla 27. 7. — další po ~10 kolech, tj. kolo 45, pak 55 atd.)

**Zbylé náměty z vision analýzy prezentací F6** (soupis v `Omega/dokumenty/kontrola-podkladu-fyzika6.md`):
1. ~~Rozpálená kolejnice~~ → HOTOVO v kole 34 (KolejniceSimulace + kompenzátor ve výkladu).
2. ~~Změř to rukou, nebo teploměrem?~~ → HOTOVO v kole 35 (KadinkySimulace + pokus ve výkladu).
3. ~~Průměrná teplota — generátor příkladů~~ → HOTOVO v kole 36 (PrumerSimulace).
Dále: **média k Fyzice 6** (infografiky/písně).

**NOVÁ PRAVIDLA (platí od 28. 7., jsou už v globálním `~/.claude/CLAUDE.md`):**
- **Ve výpočtech pro děti musí vycházet CELÁ čísla** — i všechny polohy posuvníků v simulacích.
  Desetinné jen tam, kde je samo učivem (převody) nebo jde o naměřenou konstantu.
- **Zásady grafové práce a ZADÁNÍ = SCHVÁLENÍ jsou globální** (ne jen ve skillu): test falešné
  hrany, diamant, **nezávislý kontrolor s čerstvým kontextem**, kotvy, hlídání tichých selhání.
- **Bez wifi**: `Omega/skripty/graf_local.py` (+ `revize_grafu.py` jako nezávislá revize).
  Návod `Omega/dokumenty/OFFLINE-REZIM.md`.

**ODLOŽENO → PODMÍNKA SPLNĚNA, LZE ZKUSIT ZNOVU:** ostrý běh `graf_local.py` s plným
diamantem se 28. 7. zasekl na střídání modelů v Ollamě (stav „Stopping…"); mělo se to
zkusit až po sjednocení úložiště — **to je od 28. 7. 14:05 hotové a všech 11 modelů je
dostupných**. Dílčí části ověřené: role, výběr kontrolora z jiné rodiny, vynucení JSON
schématem, hlasování. Začít úkolem, který používá jen dva modely (jen text, nebo jen kód).

_Na začátku kola PŘEČTI, na konci AKTUALIZUJ a commitni. Postup: skill /wonderly, sekce „Samostatný režim"._

### 🧹 Úklid před smazáním kontextu (29. 7. 2026, 0:15)
Vše uložené a nasazené, repo čisté, poslední commit `3a7c518` (kolo 48).
V nové session stačí: `/wonderly` + `/loop` → **kolo 49 = F8 spalovací motory** (čtyřtakt;
výklad má 4 doby, zážehový/vznětový, kvíz 16 otázek — jen postavit simulaci dle pravidla
kontroly animací). Nového z 28. 7. hodně — vše je v hlavičce výše a ve skillu:
Telegram kanál (paměť projekt-telegram-kanal-vzdalene-zadani; wonderly zůstává VÝHRADNĚ
v desktop session), popisovač prezentací, pravidlo kontroly animací, checkpoint dělby rolí
(příští v kole 55), oprava mapy deníku (trasa + dvojitá kolečka), 3 nová pravidla grafů
(kontrakt uzlu, vrstvené slučování, zmražená pravidla).

## Hotová vylepšení
- 2026-07-28 (kolo 48): **RovinneZrcadloSimulace** — obraz v rovinném zrcadle (F7
  zrcadla-a-cocky/optika-rovinneho-zrcadla, uzavírá optickou sadu): posuvníky vzdálenosti
  (10–50 cm) a výšky předmětu, obraz konstruovaný osovou souměrností (stejně daleko, stejně
  velký, vzpřímený, poloprůhledný = zdánlivý), stranové převrácení ukazuje praporek i
  zrcadlový nápis AMBULANCE (vazba na výklad o sanitkách), kolmý paprsek se vrací sám do
  sebe, šikmý jde do oka a čárkovaná prodloužení se protínají přesně ve vrcholu obrazu.
  Ověřeno 20 kombinacemi (zákon odrazu na 9 desetinných míst, kolinearita prodloužení,
  bod odrazu vždy na zrcadle) — první test měl prohozené znaménko v podmínce (fyzika byla
  správně, chyba v kontrole); konzole čistá. Kvíz už měl 16 otázek — nedublováno.
  Mezi koly 47 a 48 mimořádná oprava mapy deníku (trasa + dvojitá kolečka, viz PROGRESS).
- 2026-07-28 (kolo 47): **Opravy animací dle 3 připomínek učitele + NOVÉ PRAVIDLO kontroly
  animací.** (1) Skatepark se třením: místo skokového „další přejezd" plná JÍZDA — skater
  se rozjede, každý přejezd viditelně níž, teplo Q roste průběžně, sám dojede do zastavení;
  pohybová logika přepsána na čistou funkci `stavJizdy` (exportovaná na SVG pro test) a jízda
  po parametru Bézierovy křivky (kontrola po 16 ms odhalila skok 56 px u paty rampy ze
  starého odmocninového mapování → po opravě max 13,6 px = plynulé; obraty 4-3-2-1-0,
  energie jen klesá, dojezd 7,5 s). (2) Elektromagnet: VYPÍNAČ — ZAPNOUT skočí na 1 A,
  VYPNOUT na 0 (učitel nenašel, jak zapnout). (3) Úvodní hláška tření už neříká „Přejezd
  č. 0". Pravidlo „úplná kontrola animací" zapsáno do PRAVIDLA.md + skillu /wonderly
  (čistá funkce času, vzorkování po 16 ms, UX tam-i-zpět, nikdy nehodnotit okem v hidden
  náhledu).
- 2026-07-28 (kolo 46): **Popisovač prezentací POSTAVEN** (`Omega/skripty/popis_prezentace.py`):
  text snímků z XML + ThinkingCap vision popisy obrázků ze zipu .pptx → prezentace-popisy/
  <název>.md; hlídá baterii, jede sekvenčně, přeskočí ikonky, videa jen zaznamená. Ostrý test
  „Stavba látek": 21 snímků, 12 popisů, kvalita výborná (periodická tabulka vč. legendy,
  molekuly s barvami atomů). Nalezená past: .mov → HTTP 400, opraven filtr přípon. Zapsáno
  v ollama-logu, FRONTA odškrtnuta, pravidlo v ~/CLAUDE.md přepnuto na „hotový automat".
- 2026-07-28 (kolo 45): **CHECKPOINT dělby rolí Claude × lokální modely** (1. běh nového
  pravidla à 10 kol): kola 34–44 prošla revizí — psaní simulací a ověřování (Node/JS) správně
  u Clauda (kontroly dnes chytily 2 skutečné chyby), čtení výkladů grep/sed OK. Nalezena
  1 velká příležitost: **popisovač prezentací** (vision automat ThinkingCap nad obrázky
  ze .pptx → textové popisy; ušetří ~95 % tokenů při vytěžování prezentací; proveditelnost
  extrakce ověřena bez instalací). Zapsáno do ~/ollama-log.md, ~/CLAUDE.md i FRONTA-UKOLU;
  stavba automatu = kolo 46, příští checkpoint kolo 55.
- 2026-07-28 (kolo 44): **ElektromagnetSimulace + oprava skateparku dle připomínky učitele.**
  (1) Elektromagnet (F9 magneticke-pole/elektromagnet): sponky = proud (0–4 A) × závity/100
  × jádro (2/1), vše celé (max 24), tlačítka VYPNOUT (vše spadne — hlavní výhoda proti
  trvalému magnetu) a prohození pólů, přepínač s jádrem/bez jádra. (2) SkateparkSimulace:
  učitel nahlásil „nedaří se mi těleso rozhýbat" → přidáno tlačítko ▶ rozjeď skatera
  (plynulá jízda po celé rampě, sloupce Ep/Ek se přelévají za jízdy; ⏸ zastaví a ukáže
  přesná celá čísla). Kontrola výpočtem odhalila, že původní poloha skatera byla počítaná
  po kružnici, ale rampa je Bézierova křivka (skater ve 4 m ujížděl mimo obraz, x=−9) —
  odvozeno přesné t = 1−√(y/5), odchylka od křivky 0,000000 px. Konzole čistá.
- 2026-07-28 (kolo 43): **IndukceSimulace** — Faradayův pokus (F9 indukce-a-stridavy-proud/
  elektromagneticka-indukce): magnet u cívky s voltmetrem, všechny 4 závislosti z výkladu
  (rychlost 0/1/3× · směr zasun/vytáhni · slabý/silný magnet 1/2× · závity 100–300 = 1–3×),
  výchylka = součin faktorů v CELÝCH dílcích (max ±18 na stupnici ±20), pól přivrácený
  k cívce se překresluje, závity cívky rostou s posuvníkem. Hlavní poučení: magnet v klidu
  neindukuje nic. Ověřeno v náhledu (7 kombinací + úhel ručičky 63° = 18/20·70°), konzole
  čistá. Kvíz už měl 12 otázek — nedublováno.
- 2026-07-28 (kolo 42): **SkateparkSimulace** — přeměny energie na U-rampě (F8, JEDNA simulace
  na OBOU stránkách pohybova-a-polohova-energie i zakon-zachovani, vzor Ohrev): režim „ideální
  rampa" (posuvníky m 20–60 kg, start 1–5 m, okamžitá výška — sloupce Ep×Ek se přelévají,
  součet konstantní) × „skutečný skatepark" (každý přejezd sebere energii odpovídající 1 m
  výšky → teplo Q, výšky klesají po CELÝCH metrech až do zastavení). Všechny energie celé J.
  Ověřeno v náhledu (extrémy, střed, poloha na oblouku výpočtem, 4 přejezdy + zastavení,
  Q = 3000 J, sloupce nepřetečou), konzole čistá. Kvízy stránek už měly 16+14 otázek.
  Vedle toho: checkpoint revize dělby rolí Claude × lokální modely zaveden do PRAVIDLA.md
  a naplánován na kolo 45 (připomínka učitele).
- 2026-07-28 (kolo 41): **KalorimetrSimulace** — generátor úloh na smíchání teplé a studené vody
  (F8 energie/tepelna-vymena-a-teplo): dvě kádinky (1–3 kg, studená 10–25 °C, horká 40–85 °C)
  slité do kalorimetru, hádej výslednou teplotu; generátor vybírá jen úlohy s CELÝM výsledkem
  a celými kJ tepla; po správné odpovědi bilance „Q odevzdané = Q přijaté". Hlášky na typické
  chyby: prostý průměr při různých hmotnostech, tip mimo rozmezí obou teplot. Ověřeno 5000×
  v Node + 8 úloh proklikáno v náhledu (0 chyb), konzole čistá. Kvíz doplněn o 2 otázky na
  bilanci tepla a průměr při stejných hmotnostech (regex počítadlo v zkontroluj.mjs podhodnocuje
  starší jednořádkový styl zápisu — zapsáno jako drobný dluh do fronty, funkčně vše OK).
- 2026-07-28 (kolo 40): **ArchimedesSimulace** — pokus se siloměrem (F7 vztlakova-sila/archimeduv-zakon
  dle hodinového pokusu z výkladu): 3 fáze (ve vzduchu → ponořené → odepnuté), 4 materiály
  (dřevo 600 / led 900 / plast 1200 / ocel 8000) × 3 kapaliny (olej 900 / voda 1000 / slaná 1200),
  objem 1–3 l → VŠECHNY síly celé N; rozdíl na siloměru = Fvz; po odepnutí plove (s ≈ % nad
  hladinou) / vznáší se (plast×slaná, led×olej — stejné hustoty) / potápí se. Kontrolor v náhledu
  odhalil chybu převodu cm³→m³ (síly 10× větší) — opraveno a přeověřeno; konzole čistá.
  Kvíz už měl 21 otázek — nedublováno.
- 2026-07-28 (kolo 39): **TreniSimulace** — klidové × smykové tření (F7 sily-kolem-nas/treci-sila):
  bedna 10–50 kg, povrchy led/dřevo/beton (f smykové 0,1/0,4/0,6, klidové +0,1 — dřevo sedí
  s řešeným příkladem výkladu 50 kg → 200 N), tažná síla 0–400 N, šipky F × Ft, stavový automat
  s hysterezí (utrhne se NAD mezí klidu, zastaví až POD smykovým třením, mezi nimi rovnoměrný
  pohyb při F = Ft). Všechny meze celé N. Ověřeno v náhledu (7 stavů vč. hystereze), konzole
  čistá. Kvíz už téma pokrýval 21 otázkami — nedublováno. — nový audit temata.ts (149 podtémat, 64 fyzika
  bez interakce) → 12 kandidátů na simulace se zadáním v bodech (viz „Kandidáti na simulace").
  Úkol z FRONTA-UKOLU odškrtnut. Kola už nezačínají hledáním, ale vezmou první neodškrtnutý bod.
- 2026-07-28 (kolo 37): **zkontroluj.mjs rozšířen o `interakce2`** — kontrolní brána nově hlídá
  i druhé simulace na stránce (užití v temata.ts × union typ × render v šabloně). Ověřeno:
  aktuální stav prochází (40 interakcí + 2 druhé, 42 komponent, 358 otázek), negativní test
  s vymyšlenou interakcí správně hlásí 2 chyby. Úkol z FRONTA-UKOLU odškrtnut. — generátor příkladů na průměrnou teplotu
  (F6 teplota/teplota-a-jeji-mereni jako `interakce2` pod kádinkami): 5–7 denních teplot
  ve sloupcovém grafu, varianty léto/zima (zima vždy se zápornou teplotou), dva kontrolované
  kroky (součet → dělení počtem měření, krok 2 zamčený do správného součtu), hlášky na typické
  chyby (záporné sečtené jako kladné, „to je pořád jen součet", dělení špatným počtem, průměr
  mimo min–max), skóre na první pokus. Průměr vychází VŽDY celý (součet = průměr·počet).
  Ověřeno: 5000 generování v Node bez chyby + 10 příkladů proklikáno v náhledu (obě varianty,
  všechny chybové hlášky), konzole čistá. Kvíz už průměr pokrýval 4 otázkami z 28. 7. — nedublováno. — pokus se třemi kádinkami „Změř to rukou, nebo
  teploměrem?" (F6 teplota/teplota-a-jeji-mereni, dle prezentace TEPLOTA): kroky 1) levá ruka
  do studené 5 °C + pravá do horké 45 °C, 2) obě do vlažné → dva opačné pocity u téže vody
  (krok 2 zamčený, dokud neproběhl krok 1); zaškrtávací teploměr odhalí 25 °C a popisek
  „VLAŽNÁ ? °C" → „25 °C". Výklad doplněn o návod na domácí pokus, kvíz +3 otázky (celkem 354).
  Ověřeno v náhledu JS průchodem všech kroků (polohy rukou, bubliny, zámek, reset), konzole čistá.
- 2026-07-28 (kolo 34): **KolejniceSimulace** — rozpálená kolejnice (F6 teplota/teplotni-roztaznost,
  druhá simulace na stránce vedle teploměru → nové pole `interakce2` v temata.ts + řádek v šabloně):
  pohled shora na kolej (25 m kolejnice, montáž při 20 °C, ocel 0,012 mm/(m·°C)), posuvník
  −20…50 °C po 10 °C → prodloužení vždy CELÉ mm (3 mm na 10 °C), režim „s dilatační spárou"
  (detail spáry se zvětšenou kótou: 12 mm → 3 mm v horku, 24 mm v mrazu) × „svařená bez spáry"
  (≥40 °C sluneční vybočení, ≤−10 °C prasklá kolej). Výklad doplněn o kompenzátor (U-smyčka
  potrubí). Kvíz +4 otázky (výpočet 0,012×25×10=3 mm, vybočení, prasknutí, kompenzátor) → 351.
  Ověřeno v náhledu javascriptem: všechny hodnoty přesné, kóta 144 px = 24 mm × 6, konzole bez chyb.
- 2026-07-27 (kolo 33): **Kvízy F6 doplněny o učivo nových simulací** (+15 otázek, celkem 347):
  délka 16→21 (hodnota dílku, dělí se MEZERAMI ne čárkami, nula stupnice u začátku tělesa,
  2,5 dm = 25 cm), hmotnost 13→18 (směr převodu — na menší jednotku číslo roste, dag, mg, t),
  čas 15→20 (obvod = dráha robota × obsah = plocha uvnitř, délka dráhy z dílků, rychlost 80 cm
  za 20 s, 2,5 min = 150 s, 0,5 dne = 12 h). Všech 12 výpočtů ověřeno, správná odpověď vždy
  první, každá otázka má vysvětlení. Pravidlo z METRIKY-KOL: co přidá simulace, musí umět
  i kvíz.
- 2026-07-27 (kolo 32): **OzobotSimulace** — dráha ozobota (F6 cas/cas-a-jeho-mereni, dle zadání
  praktické hodiny „Dráha puzzle.pptx" ze složky 6/05 Čas): obdélníková dráha ze stavebnicových
  dílků, posuvníky rozměrů, délky dílku a naměřeného času; počítá obvod (= dráhu), obsah (plocha
  uvnitř, po které robot NEjede — právě tady děti chybují) a rychlost v cm/s, m/s i km/h. Značky
  start / zrychlit / zatáčka / zpomalit / cíl přesně podle zadání. Robot objede obvod právě za
  nastavený čas. Ověřeno: 4 sady výpočtů přesně, dráha ověřena výpočtem (rohy sedí, pohyb spojitý
  max skok 0,9 px, za kolo ujede 920 px = přesně obvod). **Poznatek:** náhled běží jako skrytá
  záložka (`visibilityState: hidden`), takže `requestAnimationFrame` se NEVOLÁ vůbec (0×/s) —
  animované prvky proto vždy umístit i staticky (robot stojí na startu), jinak nejsou vidět.
- 2026-07-27 (kolo 31): **PrevodySimulace** — trenažér převodů jednotek (F6 fyzikalni-veliciny/hmotnost,
  dle prezentace „Fyzika opakování rok 6" snímek 22 — pyramida ·1000 a :1000): žebřík jednotek
  se zvýrazněnou cestou a koeficienty, 4 veličiny (délka, hmotnost, objem a schválně i **čas**
  s nedesítkovými převody, kde děti chybují nejvíc), psaní odpovědi, rozpoznání typické chyby
  („máš to obráceně — jdeš na menší jednotku, číslo musí být větší"), tlačítko „Ukázat postup",
  skóre na první pokus. Zadání jsou školní čísla (2,5 dm; 7500 kg; 150 s) — generátor volí hezký
  výsledek a dopočítá zadání, přijme jen dvojici s max 2 desetinnými místy v rozsahu 0,1–10000.
  Skloňuje se „den" (0,5 dne × 2 dny × 6 dnů). Ověřeno 320 příkladů: 0 chyb ve vyhodnocení,
  0 ošklivých čísel, 52–66 různých zadání na veličinu. Celkem 37 simulací.
- 2026-07-27 (kolo 30): **StupniceSimulace** — čtení stupnice měřidla (F6 fyzikalni-veliciny/delka,
  dle prezentace „Fyzika opakování rok 6": snímek 16 měřidla a rozsah, snímek 19 odměrný válec
  250 − 200 = 50 ml, 10 dílků → 5 ml): tři měřidla (pravítko s tužkou, odměrný válec s vodou,
  teploměr), náhodně generovaný příklad ze 6 variant, dva kroky — nejdřív hodnota nejmenšího
  dílku, teprve pak odečet hodnoty (2. krok se odemkne až po správné odpovědi na 1.). Distraktory
  jsou typické chyby (dílek = rozestup popsaných čárek; přehlédnutá polovina dílků), hláška
  vysvětluje postup i zápis (l = 112 mm). Ověřeno: všech 6 variant počítá správně, zamykání
  2. kroku 12/12, hodnota nikdy nepadne přesně na popsanou čárku, geometrie scén ověřena
  výpočtem (voda a rtuťový sloupec stoupají vzhůru). Celkem 36 simulací.
- 2026-07-27 (kolo 29): **ZrcadloSimulace** — kulová zrcadla (F7 zrcadla-a-cocky/kulova-zrcadla-dute-zrcadlo,
  dle prezentace „SVĚTELNÉ JEVY 7" snímky 39–51): duté i vypuklé, posuvník vzdálenosti předmětu
  a **poloměru křivosti r** (ukazuje vztah f = r/2), tři význačné paprsky (rovnoběžný → do ohniska,
  vrcholový → souměrně podle osy, středový → sám po sobě), zobrazovací rovnice a zvětšení,
  čárkovaná prodloužení u zdánlivého obrazu, popis obrazu s praxí (zrcadlový dalekohled a solární
  elektrárna / stínítko / reflektor auta / kosmetické zrcátko / dopravní zrcadlo).
  Ověřeno výpočtem (a=30, r=20 → a′=15 cm, Z=0,5; a=15 → 30 cm, Z=2; a=6 → −15 cm zdánlivý 2,5×;
  vypuklé −7,5 cm, Z=0,25) i ze skutečně vykresleného SVG (odchylka paprsků od bodu obrazu 0,01 px,
  středový paprsek prochází přesně bodem S, rovnoběžný přesně ohniskem F). Celkem 35 simulací.
  Vedlejší výsledek kola: **vrátný povolení** (viz hlavička) — učitel přestal odklikávat rutinní kroky.
- 2026-07-27 (kolo 28): **CockaSimulace** — zobrazení čočkou (F7 zrcadla-a-cocky/opticka-cocka,
  dle prezentace „SVĚTELNÉ JEVY 7" snímky 28–34): spojka i rozptylka, posuvníky vzdálenosti
  předmětu a ohniskové vzdálenosti, tři význačné paprsky, zobrazovací rovnice 1/f = 1/a + 1/a′
  a zvětšení, popis obrazu (fotoaparát / dataprojektor / lupa / kukátko), čárkovaná prodloužení
  u zdánlivého obrazu. Ověřeno výpočtem (a=24, f=8 → a′=12 cm, Z=0,5; rozptylka a′=−6 cm,
  Z=0,25 — všechny tři paprsky se protínají přesně v bodě obrazu) i vizuálně ve všech režimech.
- 2026-07-27 (kolo 27): **TlakSimulace** — p = F/S (F7 tlak-v-kapalinach/tlak, dle prezentace Mechanické vlastnosti kapalin 7): postava na sněhu, posuvník hmotnosti, sněžnice/boty/podpatky → boření dle tlaku (1,5 kPa / 15 kPa / 1,5 MPa při 60 kg — ověřeno). Panel náhledu blokován jinou session → ověřeno curl.
- 2026-07-27 (kolo 26): **Příklady transformátoru + bezpečné vzdálenosti** (z Elektřina 9.pptx): 2 řešené příklady (500/100 závitů → 40 V; 100/500 → 1000 V, ověřeno) na transformator; tabulka bezpečných vzdáleností od vedení (7–25 m dle kV) na ucinky-proudu-bezpecnost. Analýza Ollamy zapsána do ollama-log.md + paměti.
- 2026-07-27 (kolo 25): **Nové podtéma Vesmír a galaxie** (F9 energie-a-vesmir, dle prezentace 9 vesmir_a_jeho_vznik): velký třesk v 6 krocích (13,8 mld let, atomy po 380 000 letech), galaxie a tvary, Mléčná dráha (spirální s příčkou, ~100 000 ly), rudý posuv + Hubbleův zákon; kvíz 10 otázek; k sluneční soustavě 2 ČESKÁ videa (Petr Němec, fyzika 9 ZŠ — z prezentace, jazyk ověřen přes oEmbed). Build 408 stránek. Pozn.: náhled. panel blokován jinou session (port 8788) → ověřeno curl na živém webu.
- 2026-07-26 (kolo 24): **PraceSimulace** — „Koná se práce?" (F8 mechanicka-prace, dle prezentace 8 Mechanická práce): 5 situací s tipováním ANO/NE (činka/držení/taška/kolo z kopce/bedna) + kalkulačka W = F·s (příklad z hodiny 50 N · 1 m = 50 J). Bimetal NEdělán — TeplomerSimulace ho už má. Sporná formulace snímku 3 („rovnoměrný pohyb = žádná práce") → kontrola-podkladu-fyzika8.md, na webu korektně.
- 2026-07-26 (kolo 23): **33 školních YouTube videí na stránky** — hromadné vložení neveřejných videí z kanálu učitele (soupis stara-videa-roztrideni.md) do materiálů 26 podtémat F7/F8/F9 (páka, Pascal, hydrostatika, optika, transformátor, elektromotor, polovodiče, jádro atomu, radioaktivita…). Skript vloz_videa.js (přeskakuje už vložená ID). Video ze screenshotu „Teplota a její měření – F6" se v soupisu NENAŠLO (jen „Teplo, teplota" = ústřední topení → dáno k F8 teplu) → POZNÁMKA PRO UŽIVATELE: pošli odkaz na video Teplota a její měření, doplním k F6.
- 2026-07-26 (kolo 22): **Příklady z hodiny** (F7 pohyb-a-rychlost/priklady-na-vypocet-rychlosti): 9 příkladů z prezentace Pohyb.pptx s rozklikávacím řešením (details), vč. chytáku letadlo 1 h 18 min (v podkladu snímek 28 chybně 1950 km/h → zapsáno do kontrola-podkladu-fyzika7). Vše ověřeno výpočtem i vizuálně.
- 2026-07-25 (kolo 21): **IzotopySimulace** — izotopy a ionty (F9 jaderna-fyzika/jadro-atomu, dle prezentace „9 Atom, izotopy"): H/He, ±neutron = izotop (protium/deuterium/tritium; He-3/4/5 s rozpadem 10⁻²¹ s), ±elektron = kation/anion, zápis A/Z u značky. Ověřeno vizuálně (tritium-kation ³₁H⁺). Tím z prezentace „9 Atom" vytěženo vše podstatné.
- 2026-07-25 (kolo 20): **Modely atomu + radon v domě** (z prezentace „9 Atom, izotopy"): historie Dalton 1803 → Thomson 1897 → Rutherford 1911 → Bohr 1913 → kvantový na jadro-atomu; sekce „🏠 Radon v domě" (měření/větrání/utěsnění) na radioaktivita. Ověřeno vizuálně v lokálním náhledu. Z prezentace zbývá: izotopy vodíku (protium/deuterium/tritium) — případně jako rozšíření jadro-atomu.
- 2026-07-25 (kolo 19): **MesicSimulace + zatmění** (F7 stin-faze-mesice, dle složky prezentací „20 Stín, fáze Měsíce, zatmění"): stínový kužel Země, při 172–188° zatmění Měsíce (kotouč zčervená, hláška o pozorování okem a náklonu dráhy), u novu upozornění na zatmění Slunce (jen s brýlemi).
- 2026-07-25 (kolo 18): **Historie hodin na stránce Čas** (F6 cas/cas-a-jeho-mereni) z prezentace „,.pptx": časová osa Egypt → klepsydra → přesýpací → orloj 1410 → Huygens 1656 → atomové 1949 + GPS/UTC + Greenwich. 2 chyby podkladu (1655→1656; 1328→14. stol.) zapsány do kontrola-podkladu-fyzika6.md.
- 2026-07-25 (kolo 17, na přání učitele): **obrázky k atomům** — 2 AI infografiky (FLUX.2 Klein lokálně) na atomy-a-molekuly: model atomu (jádro + elektrony) a molekuly vody (přesně 2 H — 1. pokus měl 3–4 vodíky, zamítnut vizuální kontrolou, 2. pokus OK). Bez textu v obraze.
- 2026-07-25 (kolo 16): **AtomMolekulySimulace** — atom a molekuly (F6 latka-a-teleso/atomy-a-molekuly), podle animace atomu z prezentace „Stavba látek" (video media1.mov — NEpřevzato kvůli autorským právům, postaveno vlastní): animovaný atom H/He/C/O (jádro + elektrony po slupkách) + stavebnice molekul H₂/O₂/H₂O/CO₂/NaCl s rozlišením prvek × sloučenina.
- 2026-07-25 (kolo 15): **PlanetyVahaSimulace** — „kolik bys vážil na jiných planetách" (F6 sila/gravitacni-sila) podle tabulky z prezentace učitele „Síla 6.pptx" (75 kg → Měsíc 12,4, Jupiter 177…): posuvník hmotnosti, 10 sloupců, klik = detail; zdůrazněno hmotnost se NEMĚNÍ × gravitační síla ano. Koeficienty ověřeny proti tabulce i výkladu (Měsíc ~6×).
- 2026-07-24 (kolo 14): **ValecSimulace** — odměrný válec (F6 fyzikalni-veliciny/objem): nalij vodu (V₁), vhoď kámen/matici/kuličku → V₂, objem = V₂−V₁ v cm³; oko u hladiny, stupnice po 10 ml. TÍM VYČERPÁNA FRONTA SIMULACÍ z auditu — dál prezentace a média F6.
- 2026-07-24 (kolo 13): **ElektrovaniSimulace** — elektrování těles (F6 elektrina-a-magnetismus/elektricke-vlastnosti-latek): tření o hadřík (plast −, hadřík + — obě tělesa!), posuvník vzdálenosti, papírky přiskakují dle f~q/d², vybíjení. Ověřeno výpočtem prahů.
- 2026-07-24 (kolo 12): **OhrevSimulace** — křivka ohřevu vody (F8 teplo-a-zmeny-skupenstvi, NA OBOU stránkách tani i var): 1 kg ledu −20 °C → var, kádinka (led taje, bubliny, pára, klesající hladina) + graf s prodlevami při 0 a 100 °C; hodnoty dle výkladu (332 / 2260 kJ/kg, c 2,1 / 4,2). Ověřeno výpočtem lomů křivky.
- 2026-07-24 (kolo 11): **SoustavaSimulace** — sluneční soustava (F9 energie-a-vesmir/slunecni-soustava): 8 planet se skutečnými poměry dob oběhu (Kepler T²=a³ ověřeno), rychlost času 1 s = 2–200 dní, klik na planetu = údaje (druh, AU, oběh, zajímavost), Saturn s prstencem. Vzdálenosti stlačené (přiznáno v textu).
- 2026-07-24 (kolo 10): **RozpadSimulace** — poločas rozpadu (F9 jaderna-fyzika/radioaktivita): 400 náhodně se rozpadajících jader, graf skutečnost × teoretická křivka (½)^(t/T), hlášky po poločasech, srovnání uran/radon. Ověřeno Monte Carlo testem (204/400 po 1T).
- 2026-07-24 (kolo 9): **TransformatorSimulace** — transformátor (F9 indukce-a-stridavy-proud/transformator): cívky na společném jádře, posuvníky N₁/N₂ (závity se kreslí), U₂ = 230·N₂/N₁, transformace nahoru/dolů, proud opačně. Ověřeno výpočtem (23–1150 V).
- 2026-07-24 (kolo 8): **ZapojeniSimulace** — sériové × paralelní zapojení (F8 elektrina, NA OBOU stránkách zapojeni-spotrebicu-za-sebou i vedle-sebe): 2 žárovky s jasem dle výkonu, posuvníky R₁/R₂, rozdělení U (série) vs. I (paralel), tlačítko „přepal žárovku 1" (řetěz zhasne × zásuvky svítí). Ověřeno výpočtem.
- 2026-07-24 (kolo 7): **VlneniSimulace** — kmitání a vlnění (F8 zvuk/kmitani-a-vlneni): příčná vlna na laně + podélné vlnění (zhuštění/zředění), posuvníky f a amplitudy, λ = v/f se zeleným měřítkem, červená částice kmitá na místě. Ověřeno výpočtem (fázový rozdíl přes λ = 2π).
- 2026-07-24 (kolo 6): **HydrostatikaSimulace** — hydrostatický tlak (F7 tlak-v-kapalinach/hydrostaticky-tlak): potápěč 0–30 m, tlakoměr p=h·ρ·g, šipky tlaku ze všech stran, přepočet na atmosféry. Ověřeno výpočtem.
- 2026-07-24 (kolo 5): **MesicSimulace** — fáze Měsíce (F7 svetlo-a-jeho-sireni/stin-faze-mesice): pohled shora (Slunce zleva, osvětlená polovina vždy ke Slunci) + pohled ze Země (tvar fáze, % osvětlení, názvy fází, pomůcka D/C). Ověřeno výpočtem k=(1−cos φ)/2.
- 2026-07-24 (oprava dle uživatele): **LomSimulace** — hustší prostředí vždy DOLE (paprsek z vody jde zdola k hladině); zavedeno trvalé pravidlo realistických scén (paměť simulace-realisticke).
- 2026-07-24 (kolo 4): **LomSimulace** — lom světla (F7 svetlo-a-jeho-sireni/lom-svetla): 4 dvojice prostředí (vzduch↔voda, vzduch↔sklo), Snellův zákon, lom ke/od kolmice, částečný odraz, úplný odraz za mezním úhlem (voda 48,8°, sklo 41,8°). Ověřeno výpočtem.
- 2026-07-24 (kolo 3): **OdrazSimulace** — zákon odrazu (F7 svetlo-a-jeho-sireni/odraz-svetla): posuvník úhlu dopadu (od kolmice!), oblouky α a α', kolmý dopad; druhý režim nerovný povrch = rozptyl (3 paprsky, místní kolmice). Ověřeno výpočtem (odraz vektorově; všechny rozptýlené paprsky míří vzhůru i při α=80°).
- 2026-07-23 (kolo 2): **RychlostSimulace** — rychlost–dráha–čas (F7 pohyb-a-rychlost/rychlost-draha-cas): auto na 500m silnici, rychlost měnitelná za jízdy, živý graf s–t, průměrná rychlost v cíli, převod ÷3,6. Ověřeno výpočtem.
- 2026-07-23 (kolo 1): **OhmSimulace** — interaktivní Ohmův zákon (F8 elektrina/ohmuv-zakon): posuvníky U (0–24 V) a R (20–240 Ω), obvod s animovanými částicemi (rychlost ~ I), ampérmetr, graf I–U s přímkou úměrnosti. Ověřeno výpočtem (rohy dráhy teček, bod grafu 12 V/60 Ω → 0,2 A).

---

# ⬇️ PŘESUN 6. 8. 2026 — uzavřená kola vystěhovaná ze SAMOSTATNY-REZIM.md

_(audit 6. 8.: stavový soubor měl 2 379 řádků, ~1 400 z nich uzavřená historie)_

## 🎯 Předchozí stav (5. 8. 2026 večer — předání do čerstvé session)
#### ⏸️ ČEKÁ NA UČITELE: zkouška hlasu z NotebookLM

Podklady jsou hotové v `~/Desktop/Omega/podkasty-vzorky-hlasu/`:
`PRO-NOTEBOOKLM-uvod-do-fyziky.txt` (zdroj) a `NOTEBOOKLM-CO-UDELAT.md` (postup).
Zvolené téma je schválně **Úvod do fyziky**, aby šel hlas porovnat s už nasazenou
verzí od OpenAI; snímky i scénosled k němu existují.

**Zablokované na:** rozšíření Claude in Chrome hlásí u `notebooklm.google.com`
„This site is blocked by your site permissions", zatímco jiné weby hlásí jinou,
dočasnou chybu — povolení tedy neplatí. Buď bylo přidáno v jiném profilu (připojené
jsou dva, já byl v „Hlavní profil — cesty.na.kolech"), nebo rozšíření Google služby
nepustí vůbec. **Do nastavení rozšíření nesahat** a nezkoušet to znovu dokola —
učitel buď povolí, nebo audio vyrobí ručně (je to pět kliknutí).

Až mp3 bude na místě: přepis → klíčová slova **ze skutečného přepisu**, ne ze
scénáře → kontrola, že si NotebookLM nevymyslel nesmysl a nevynechal odpovědi na
kvíz (brána tohle u cizího textu neuhlídá) → `video_podkastu.py --bez-scenare`.
**Nenasazovat na web, dokud si učitel nepřečte licenci Googlu** — rozhodnutí je jeho.

### ✅ HOTOVO 5. 8. 2026 večer — díl 2 „Tělesa a látky"

Polemika `podkasty-scenare/6/telesa-a-latky-dialog.md` (37 replik, 3 950 znaků),
brána **12 z 12 na první pokus**. **14 nových schémat** ve `snimky_podkastu.py`
(`latka_je_material`, `znaky_telesa`, `hrebik_zelezo`, `okno_z_vice_latek`,
`mleko_v_lahvi`, `totez_slovo`, `dve_otazky`, `teleso_neni_jen_tvrde`,
`vlastnosti_latek`, `tvrdost_nebo_poloha`, `teleso_ma_navic`, `fyzikalni_veliciny`,
`zmerit_nebo_ne`, `shrnuti_telesa`) + 1 ilustrace. Video 8 MB, **5:11**, živé na
`lab.wonderly.cz/skola2/fyzika/6-rocnik/latka-a-teleso/telesa-a-latky/`.

**DÉLKA SE VYPLATILA.** Zvuk prošel **na první pokus** (685 slov proti 678) a stál
**5,6 Kč** — proti dlouhému dílu 1, který potřeboval tři pokusy za ~24 Kč. Scénář
byl schválně pod stropem 4 700 znaků, takže se nahrávka nemusela dělit na části.
Doporučení pro další díly: **držet se pod 4 700 znaky**, ne kvůli syntéze (ta si
už poradí), ale kvůli spolehlivosti střihu.

V kresbách našla prohlídka dvě vady: popisek „materiál, obecně" ležel přes obrys
mléka a bílé mléko vytékalo dvacet pixelů pod dno láhve. Obojí opraveno.

### ✅ HOTOVO 5. 8. 2026 večer — díl 1 „Úvod do fyziky"

Polemika `podkasty-scenare/6/uvod-do-fyziky-dialog.md` (47 replik, 5 456 znaků),
brána hlásí **12 z 12 otázek pokryto**. **16 nových schémat** ve `snimky_podkastu.py`
(`co_je_fyzika`, `co_zkouma`, `tri_nastroje`, `pokus_experiment`, `hypoteza`,
`mereni_cisly`, `zakon_neodhlasuje`, `galileo`, `proc_papir`, `apollo_dopad`,
`pokus_doma`, `opakovani_pokusu`, `meni_se_hypoteza`, `jazyk_fyziky`,
`k_cemu_fyzika`, `shrnuti_uvod`) + 2 ilustrace z mfluxu. Zvuk OpenAI, video 10 MB,
**7:11** — živé na `lab.wonderly.cz/skola2/fyzika/6-rocnik/latka-a-teleso/uvod-do-fyziky/`.

> **DÉLKA: 7:11 je nad rozsahem 4–6 min, který má skill.** Vzniklo tím, že téma má
> 12 kvízových otázek a všechny musí zaznít. Obsahově je díl v pořádku, ale kdyby
> ho učitel chtěl kratší, je potřeba scénář zkrátit asi o 800 znaků a zvuk i video
> vyrobit znovu (~8 Kč). **Nechat rozhodnout učitele, sám to nepřepisuj.**

> ### ✅ VYŘEŠENO 5. 8. 2026 večer — dlouhý rozhovor se do syntézy nevešel
>
> Dialog čte každý hlas VCELKU (kvůli intonaci), takže do jednoho požadavku jde
> celý rozhovor. OpenAI bere nejvýš 2 000 tokenů; 5 548 znaků odmítlo jako 2 159
> tokenů a automat díl po třech pokusech **odložil**. Změřený poměr: **2,57 znaku
> na token**, nejdelší dosud prošlý díl měl 4 747 znaků.
>
> Opraveno ve `vyrob_podkasty.py` (`rozdel_repliky_na_kusy`, strop **4 700 znaků**):
> delší rozhovor se dabuje po **stejně dlouhých částech na hranici replik** a části
> se slepí do jedné nahrávky, takže zarovnání i kotva „střih ztratil řeč" pracují
> nad celkem **beze změny**. Kotva se NEMĚNILA. Díly pod stropem se nedělí vůbec.
> **Obousměrný důkaz:** `skripty/testy/test_deleni_dialogu.py` (36 kontrol) —
> nad sedmi skutečnými scénáři mlčí, šest poškozených dělení odhalí. Zapsáno do
> `wonderly-web/testy/obousmerne.json`. **Scénáře se kvůli délce zkracovat nemusí.**
>
> Pozn.: kotva střihu i tak spadla dvakrát (724 a 709 slov z 952) a prošla až na
> třetí pokus (956/952). Střih přes OpenAI zůstává křehký — počítej s opakováním.

**Prohlídka snímků zase našla dvě vady** (a z výpisu skriptu vidět nebyly):
šipky odporu vzduchu visely mimo kámen i papír a shrnující věta ležela na kresbě
měsíčního povrchu. Obojí opraveno, seznam pastí v návodu platí dál.

**ROZDĚLANÉ (5. 8. 17:45) — ČTYŘI díly F6 hotové až na video:**

> ### ✅ VYŘEŠENO 5. 8. 2026 večer — kotva umí čísla
>
> Učitel opravu schválil. Modul **`skripty/cisla_cesky.py`** rozpozná číslo psané
> číslicemi i českým slovem (včetně „šestkrát", „0,001", „dvěstě", řadových tvarů)
> a obě kontroly ve `vyrob_podkasty.py` ho **vypustí z porovnání na obou stranách** —
> jak v kotvě počtu slov, tak v zarovnání replik. **Práh zůstal 2 %, kotva se
> NEOSLABILA**, jen přestala měřit to, co změřit neuměla.
>
> **Důkaz v provozu:** objem předtím padal třikrát (547 z 659 slov), po opravě prošel
> na první pokus (592 proti 599). **Obousměrný důkaz:** `skripty/testy/test_kotva_cisla.py`
> — na zdravém přepisu všechny čtyři díly projdou beze zbytku (657/657, 599/599,
> 686/686, 777/777), po odebrání 10 % řeči všechny spadnou. Zapsáno do
> `wonderly-web/testy/obousmerne.json`.
>
> Pozor: `hustota-dialog.mp3` se při novém běhu **přeskočil jako hotový** (soubor
> na disku už byl). Opravené zarovnání se u něj tedy ověří až při výrobě videa.
>
> Původní rozbor příčiny (ponechán jako poučení):
>
> Zvuk k hustotě selhal 3× (677 slov ze 701, práh je 2 %) a automat ho odložil.
> Měření ale ukazuje, že řeč **nechybí**: poměr délky textu hmotnost : hustota je
> 0,961 a poměr délky zvuku **taky 0,961** — kdyby střih ušmikl 7 % řeči, zvuk by
> byl proti textu znatelně kratší. Příčina je nejspíš v tom, že kotva počítá slova
> v přepisu od whisperu, jenže whisper píše čísla číslicemi: „nula celá nula nula
> jedna" je pět slov, přepíše se jako „0,001", tedy jedno. Scénář o hustotě je
> číslovek plný. **Je to stejná past, jakou už vyřešila brána `pokryti_kvizu.py`**
> (má slovník `CISLA` a převádí obojí na společný tvar).
>
> **Kotva ZATÍM ZMĚNĚNA NEBYLA** — je mezi chráněnými pravidly a už jednou chytila
> skutečnou ztrátu 27 % řeči. Návrh: práh nechat na 2 %, jen doplnit stejný převod
> čísel jako v bráně kvízu. Čeká na rozhodnutí učitele (dotaz položen 5. 8.).
> Soubor `hustota-dialog.mp3` na disku JE (5:19), jen ho automat neoznačil za hotový.

**4) „Objem"** — `podkasty-scenare/6/objem-dialog.md` (38 replik, brána hlásí
**14 z 14 otázek pokryto**), scénosled, **12 nových schémat** (`znacka_v`,
`metr_krychlovy`, `proc_tisic`, `duta_mira`, `most_litr`, `odmerny_valec`,
`odecitani_hladiny`, `ponoreni_telesa`, `cele_pod_hladinou`, `vzorce_objemu`,
`priklad_krabice`, `shrnuti_objem`).
Nález z prohlídky: popisky ležely přes kresbu láhve — přesunuty pod ni.

**Zvuk k objemu: HOTOVO** `objem-dialog.mp3` (4:38), prošel po opravě kotvy na první
pokus. Předtím 3× spadl na zarovnání (547 z 659 slov) — právě to opravu vyvolalo.

**3) „Hustota"** — `podkasty-scenare/6/hustota-dialog.md` (37 replik, brána hlásí
**15 z 15 otázek pokryto**), scénosled, **13 nových schémat** (`peri_zelezo`,
`znacka_ro`, `vzorec_hustoty`, `priklad_hustoty`, `co_znamena_cislo`, `gcm3`,
`plave_klesa`, `teply_vzduch`, `ponorka`, `hustomer`, `tabulka_hustot`,
`proc_se_lisi`, `shrnuti_hustota`), zvuk se vyráběl 5. 8. v 17:30.
Nálezy z prohlídky: popisky pod hladinou se navzájem překrývaly, tisíce byly
jednou s mezerou a jednou bez, a poměr hmotnosti atomů (1 : 56) nešel vyjádřit
velikostí kruhů — je teď napsaný číslem uvnitř nich, aby obrázek netvrdil jiný
poměr, než jaký platí.

**2) „Hmotnost"** — `podkasty-scenare/6/hmotnost-dialog.md` (43 replik, brána hlásí
**18 z 18 otázek pokryto**), scénosled, **13 nových schémat** (`vaha_vs_hmotnost`,
`mnozstvi_latky`, `znacka_m`, `litr_vody`, `jednotky_hmotnosti`, `prevody_smer`,
`prevody_priklady`, `deka_metrak`, `druhy_vah`, `pravidla_vazeni`, `vazeni_kapaliny`,
`vazeni_drobnosti`, `shrnuti_hmotnost`), zvuk se vyráběl 5. 8. v 17:00.
Nálezy z prohlídky: tři vzorce v žebříku jednotek se slily do jedné řady (v SVG se
víc mezer za sebou slévá — musí to být tři samostatné nápisy) a u hřebíků bylo
nakresleno 40 kusů, zatímco popisek tvrdil „100 hřebíků". Obojí opraveno.

**1) „Vzájemné působení těles, síla", zbývá jen video:**

Hotovo a ověřeno: polemika `podkasty-scenare/6/vzajemne-pusobeni-teles-sila-dialog.md`
(45 replik, brána `pokryti_kvizu.py` hlásí **16 z 16 otázek pokryto**), scénosled,
**13 nových schémat** v `snimky_podkastu.py` (`vzajemne_kop`, `ucinky`, `deformace`,
`sila_neni_sama`, `dotyk_a_dalka`, `druhy_sil`, `znaceni`, `predpony`, `sipka`,
`silomer`, `prima_umernost`, `jeden_newton`, `shrnuti_sila`) a zvuk
`/Users/Shared/Škola/podkasty/6/vzajemne-pusobeni-teles-sila-dialog.mp3`
(6:06, kotva střihu 793 slov proti 799 — sedí).

**Zbývá:** ilustrace `podklad-00.png` obrázkovým modelem (scéna 0 je jediná
ilustrační), pak `video_podkastu.py` a nasazení do R2 + `temata.ts`.

> **Proč se video nedodělalo:** na Macu běžela pečlivá anonymizace starého videa
> („Nová Pec 2", od 8:21 ráno, kousek 21 z 29). Whisper a ffmpeg by běžely souběžně
> a mohly to kolo shodit — přišel by celý den práce. Video se pustí, až automat dojede.

**Poučení z prohlídky snímků (5. 8.):** kontaktní list zase našel to, co výpis skriptu
neukázal — schéma přímé úměrnosti mělo protažení pružin v poměru 1 : 1,7 : 2,4, zatímco
popisky pod nimi tvrdily 1 : 2 : 3. Opraveno na měření od nezatížené délky a doplněna
kotva výpočtem. Dál: škrt vedený přes popisek a jablko vznášející se nad dlaní.

**Na čem se pokračuje — v tomhle pořadí:**

1. **Videa k dalším tématům Fyziky 6 přes OpenAI.** Pro každé téma je potřeba:
   polemika (pokrývající celý kvíz), scénosled s `kresba`/`tema_kvizu`/`cesta_na_webu`,
   dokreslit chybějící schémata do `snimky_podkastu.py`, pak `automat_podkastu.py`.
   Scénářů F6 je 21, ale jsou psané jako SÓLO VÝKLAD — musí se přepsat na polemiku.
2. **Doplnit odpovědi na kvíz do první polemiky o gravitaci** — chybí v ní Isaac Newton
   a u přílivu nezaznělo, že ho způsobuje Měsíc (`pokryti_kvizu.py` to hlásí).
   Vyžaduje nový zvuk, takže se to vyplatí spojit s přechodem na OpenAI.
3. **Jedno video s hlasem z NotebookLM** — učitel to chce zkusit. Audio vyrábí ON,
   video skládá Claude režimem `--bez-scenare`. Postup a pasti:
   `Omega/dokumenty/NAVOD-NOTEBOOKLM-VIDEO.md`.
4. **Chatterbox TTS (CC0, zdarma) — ODLOŽENO učitelem**, protože má nula stažení
   a nikdo ho neověřil. Nezačínat bez jeho pokynu.

**Nedělat:** nepřepisovat schémata bez podívání se na hotové PNG, nerušit kotvu
„střih ztratil řeč" ve `vyrob_podkasty.py` (5. 8. zachytila ztrátu 27 % řeči).

### ✅ Hotovo 5. 8. — zkušební díl na ElevenLabs (uzavřeno)

**Povel učitele: `WONDERLY PODKASTY`.** Stav: **21 z 21 scénářů Fyziky 6 napsaných
a zkontrolovaných**, klíč OpenAI funguje, jeden díl hotový a učitelem schválený
(„první díl je dobře"). Otevřené jsou dvě věci — obě rozhodne JEDEN pokus:

1. **Učitel chce DIALOG dvou lidí, ne sólo vypravěče** (rozhodl 5. 8., potvrdil podruhé).
2. **U hlasů mu vadí anglický přízvuk** a u slepovaného dialogu to, že repliky zní odděleně.

Cesta přes OpenAI je hotová a funguje (viz „JAK SE DIALOG VYRÁBÍ" níž), ale je to obcházení
problému. **ElevenLabs `Text to Dialogue` (Eleven v3) umí víc mluvčích v JEDNOM požadavku**
— odpadá střih, dvojí syntéza i přepis, a čeština je nativně podporovaná.

**Co udělat jako první (na to učitel čeká):**
- Vyrobit **jeden zkušební díl** na bezplatných 10 000 znacích ElevenLabs (registrace
  a klíč = úkol UČITELE, klíč nikdy do chatu, uložit vedle `openai-klic.txt`, `chmod 600`).
- Poslat učiteli vedle `Omega/podkasty-vzorky-hlasu/dialog-D-prostrizeny.mp3` k porovnání.
- **Než se doporučí přechod, OVĚŘIT skutečnou cenu** ElevenLabs pro ~322 000 znaků
  (115 dílů) — dosud NENÍ ověřená, jen se ví, že je řádově vyšší než u OpenAI.
- Podle výsledku buď přepsat 21 scénářů F6 do dialogu a vyrobit, nebo zůstat u OpenAI.

**Pak teprve:** přepis scénářů F6 do dialogu → výroba → zapojení na web jako `druh: 'audio'`
→ F7 (33 podtémat). A dál čeká **20 nálezů ve výkladu na webu** (tabulka níž) — učitel
se k nim ještě nevyjádřil, do `temata.ts` se bez jeho pokynu NESAHÁ.

### 🎧 Hotovo 5. 8. — kolo D9: PODKÁSTY F6 — prvních 8 scénářů + návod na API + výrobní skript

Povel `WONDERLY PODKASTY`, první kolo. **Vějíř 4 workerů po 2 scénářích** (test falešné
hrany: scénáře na sobě nezávisí), podklady vytažené z `nactiData()` — ne z textu souboru.

- **8 scénářů F6 hotových** v `Omega/podkasty-scenare/6/`: uvod-do-fyziky, telesa-a-latky,
  casticove-slozeni-latek, atomy-a-molekuly, skupenstvi-latek, vzajemne-pusobeni-teles-sila,
  gravitacni-sila, delka. Kontrakt uzlu: hlavička + `## Mluvený text`, 1800–2800 znaků,
  jeden vypravěč, bez markdownu a závorek (text jde do syntézy DOSLOVA), obsah jen z výkladu.
- **Návod pro učitele** `Omega/dokumenty/NAVOD-OPENAI-API.md` — zřízení klíče krok za krokem,
  nabití kreditu, `chmod 600`, co dělat při chybách. Klíč **nikdy do chatu** (registraci
  a hesla dělá učitel sám — jediná zakázaná kategorie).
- **Výrobní skript** `Omega/skripty/vyrob_podkasty.py` (`--test` / `--vzorek` / `--rocnik`).
  Dělí text po odstavcích pod 1400 znaků (strop modelu je 2000 tokenů), slepuje ffmpegem,
  hotový díl nevyrábí znovu, starou verzi odkládá jako `.predchozi` (nic nemaže),
  baterie ≤ 30 % = pauza, 3 neúspěchy = ODLOŽENO a jede dál, na konci porovná
  hotovo+odloženo vs. plán (tiché selhání).
- **Kotvy:** dělení textu proměřeno spuštěním nad všemi 8 scénáři — 21 požadavků,
  **ztráta 0 znaků**, žádná část nad stropem. Kontrola klíče ověřena OBOUSMĚRNĚ
  (soubor s textem okolo → odmítnuto kódem 2; platný tvar → mlčí).
- **Cena ověřena výpočtem, ne odhadem:** ceník z developers.openai.com (0,60 USD/M vstup,
  12 USD/M zvuk), 21 522 znaků na 8 dílů → **10,21 USD ≈ 225 Kč za všech 115 dílů**.
  Sedí s dřívějším odhadem 150–300 Kč.

**Kontrola:** nezávislý kontrolor (čerstvý kontext) — **0 závažných, 13 drobných**, vše
opraveno a přeměřeno (8 vstupů, 0 nálezů: rozsah, hlavičky sedí na skutečnost, žádný
markdown/závorka/číslice/symbol, žádná část nad stropem). Přepočítal i všechna čísla:
58 kg × 10 = 580 N, 15 t → 150 kN, 3 m = 30 dm = 300 cm = 3000 mm, 2 km = 2000 m — sedí
a jsou celá. Nejcennější nález: **dvě chyby nebyly ve scénáři, ale ve VÝKLADU na webu** ↓

**❓ DVA NÁLEZY VE VÝKLADU F6 — ČEKAJÍ NA ROZHODNUTÍ UČITELE** (pravidlo
[[feedback-kontrolovat-spravnost-textu]]: odborný text učitele neopravovat potichu):
1. `skupenstvi-latek`: „krystalické látky — pravidelné uspořádání částic, **velice tvrdé**,
   tvoří krystaly (led, sůl, cukr, křemen, diamant)". Tvrdost neplyne z krystalické stavby:
   led má podle Mohse asi 1,5, sůl 2,5, cukr 2 — všechno měkčí než sklo, které je na TÉŽE
   stránce uvedeno jako amorfní a „méně tvrdé" (sklo má 5,5, je tedy tvrdší než sůl i led).
   Návrh: vypustit „velice tvrdé" a u amorfních „méně tvrdé"; tvrdost už stránka správně
   vysvětluje o odstavec níž Mohsovou stupnicí.
2. `delka`: „laserový měřič vzdáleností — **nejpřesnější**". Laserový dálkoměr měří s
   odchylkou 1–2 mm, kdežto mikrometr uvedený o řádek výš měří na setiny milimetru, tedy
   zhruba stokrát jemněji. Návrh: „na velké vzdálenosti, princip odrazu světelného paprsku".
Ve scénářích jsou obě místa zatím obejita (tvrzení vypuštěno, nic protichůdného se netvrdí).

**Dávka 2 — dalších 8 scénářů F6 hotových** (hmotnost, objem, hustota, souhrnné opakování
veličin, čas, teplota, teplotní roztažnost, magnetismus). Kontrolor dávky 2: **3 závažné,
12 drobných** — vše opraveno, přeměřeno (16 vstupů, 0 nálezů). Do zadání workerů dávky 2
se promítla poučení z dávky 1 (strop délky věty 165 znaků, zákaz zobecňování přes zdroj,
zájmeno musí mít předchůdce) — a **projevilo se to**: dávka 2 měla vět nad 160 znaků nula.

**✅ FYZIKA 6 KOMPLETNÍ: 21 z 21 scénářů**, tři dávky, tři nezávislí kontroloři.
Měřidlo nad všemi: 21 vstupů, 0 nálezů. Výroba celého ročníku vyjde na **40 Kč**.
Další na řadě: **F7 (33 podtémat)**.

**Dávka 3 (elektřina, shrnutí, pokusy) — kontrolor našel 4 ZÁVAŽNÉ, 12 drobných.**
Dvě závažné byly **bezpečnostní** a stojí za zapamatování jako vzorec:
1. Díl o obvodech uváděl zásuvku mezi zdroji napětí a o dva odstavce dál dával praktický
   návod „nejdřív zapoj obvod bez zdroje… pak připoj zdroj" — v audiu, které dítě
   poslouchá doma samo, bez obrázku. Nikde nezaznělo, že zdrojem smí být **jen baterie**.
   Doplněno na čtyřech místech (kotva v měřidle: všechny 4 věty musí být přítomné).
2. Díl `pokusy` u Archimédova poháru neřekl, že kámen musí být **celý pod hladinou**
   a že voda nesmí přetéct — podle poslechu by dítě naměřilo objem jen ponořené části.
**Poučení: u obsahu, který se konzumuje POSLECHEM BEZ OBRAZU, musí kontrolor dostat
zvláštní otázku „dá se to podle poslechu vůbec bezpečně provést a nechybí krok?"** —
běžná kontrola věcné správnosti tohle nenajde, protože každá věta je sama o sobě pravdivá.

**✅ KLÍČ VLOŽEN A OVĚŘEN 5. 8. 11:47** (`sk-proj-`, 164 znaků, práva `-rw-------`).
Past: **`nano` se přes tlačítko Run nespustí** — interaktivní editor v neinteraktivním
shellu nic nevytvoří a učiteli to jen zhaslo. Cesta, která zabrala: `pbpaste | tr -d`
rovnou do souboru, s kontrolou prefixu `sk-` a délky, bez vypsání klíče kamkoli.
Druhá past pro příště: **klíč OpenAI ukáže JEN JEDNOU** — pořadí je Copy → uložit → Done.

**✅ HLAS VYBRÁN: `fable`** (učitel 5. 8., poslechem 6 vzorků na skutečném úryvku scénáře
o gravitační síle; vzorky stály 1 Kč, leží v `Omega/podkasty-vzorky-hlasu/`). Vybírat hlas
od stolu nejde — všech 13 je laděných na angličtinu a liší se hlavně českou výslovností.

**🎧 PRVNÍ CELÝ DÍL VYROBEN** — `/Users/Shared/Škola/podkasty/6/gravitacni-sila.mp3`,
3:58, 3,8 MB, tři části slepené. Kotva proti tichému selhání: 2795 znaků / 238 s = 11,7
znaku za sekundu proti 12,8 u vzorku téhož hlasu → sedí, žádná ze tří částí nechybí.
Cena dílu 2 Kč. **Poslán učiteli k poslechu — čeká se na schválení, pak dávková výroba.**

**🎙️ ROZHODNUTO 5. 8.: podkásty budou DIALOG dvou lidí** (učitel `fable` vysvětluje,
žákyně `nova` se ptá). Všech 21 scénářů F6 se přepíše do rozhovoru; cena vzroste ze 40
na ~50 Kč. Pravidlo obsahu: **tázající se smí jen ptát nebo vyslovit tip JAKO TIP**
(„Řekla bych, že ne…"), nikdy tvrdit nepravdu jako fakt — v audiu si dítě zapamatuje
i větu, která je vzápětí opravena.

**⚙️ JAK SE DIALOG VYRÁBÍ — nápad učitele, ověřeno 5. 8. a JE TO LEPŠÍ CESTA.**
Naivní postup (každá replika = vlastní požadavek) zní slepeně, protože model neslyší,
co bylo předtím, a **intonace se u každé repliky resetuje**. Učitelův nápad to obchází:
1. **Celý rozhovor přečte v kuse hlas A, pak celý znovu hlas B** (každý tedy čte i cizí
   repliky) — díky tomu má prozódie kontext a odpověď navazuje na otázku.
2. Obě nahrávky se pošlou na `whisper-1` s `timestamp_granularities[]=word` → čas u
   každého slova.
3. Slova zadání se zarovnají proti přepisu (`difflib.SequenceMatcher`, ne slovo po slovu —
   přepis nikdy nesedí přesně; naměřeno 96 a 97 % shody) a z toho vyjdou hranice replik.
4. Každá replika se vystřihne z nahrávky SVÉHO mluvčího a kousky se proloží (0,12 s ticha).
**Výsledek: 74 s proti 89–91 s u slepované verze** — kratší proto, že nikdo nezačíná
větu „od nuly". Kotva proti tichému selhání: výsledek se přepíše zpět a **porovná počet
slov se zadáním** (153 = 153); pauzy se počítat NEDAJÍ, model dělá pauzu i mezi větami
(naměřeno 33–38 pauz tam, kde jich mělo být 12).
Cena: syntéza běží 2× (každý hlas čte vše) + přepis, tedy F6 asi 85 Kč místo 40 Kč.

**🔍 STŘIH ZDARMA? ČÁSTEČNĚ (proměřeno 5. 8.).** Samotné krájení a lepení je ffmpeg,
lokálně a zdarma. Zjistit HRANICE zdarma ale spolehlivě nejde:
- Podle pauz to nejde vůbec — nejkratší z 12 nejdelších pauz měří 0,75 s a nejdelší
  z nevybraných taky 0,75 s. Rozdělení nemá mezeru, odhad se mýlil o 3,7 až 10 s.
- Lokální `whisper` (brew, model v `~/.cache/whisper`) běží a je zdarma: `small` přepsal
  77 s zvuku za 9 s, `medium` za 25 s. Proti placenému API se ale liší průměrně
  o 0,19–0,20 s a **useknul by konec 1–3 replikám ze 13**. `medium` proti `small`
  prakticky nepomohl (0,185 vs 0,204 s) — nevyplatí se, model se navíc stahuje 4 minuty.
- Přichycení hranice k nejbližšímu skutečnému tichu pomůže (useknuté 2 → 1, odchylka
  0,20 → 0,10 s), ale nespolehlivost neodstraní.
→ Zatím se pro hranice používá placený přepis (`whisper-1`, ~1,6 Kč na díl včetně
kontrolního přepisu). Učitel má i **MacWhisper.app**, ale ta je GUI, do automatu nejde.
**Časy slov poslouží DVAKRÁT** — kromě střihu i na časování obrázků do videa (nápad
učitele 5. 8.): obrázek naskočí přesně na slovo, ke kterému patří.

**💡 TŘETÍ VARIANTA ZE ZADÁNÍ = ElevenLabs, a na tenhle problém sedí líp.**
Má endpoint **Text to Dialogue** (model Eleven v3): v JEDNOM požadavku se pošle víc
mluvčích s různými `voice_id` a model je namluví jako skutečný rozhovor — mluvčí na sebe
reagují, skáčou si do řeči. **Tím odpadá celý střih i dvojí syntéza** a odpadá i důvod,
proč jsme ho vymýšleli. Čeština je mezi 70+ jazyky. Strop 2000 znaků na požadavek,
takže scénář 2800 znaků = 2 požadavky. Výstup je nedeterministický, opakovatelnost
zajišťuje parametr `seed`. Daň: cena je řádově vyšší než u OpenAI (účtuje se po znacích,
zdarma 10 000 znaků měsíčně) — **přesnou částku před doporučením OVĚŘIT**.
**Doporučený další krok: vyrobit JEDEN díl na bezplatných 10 000 znacích a porovnat
poslechem.** Nulový závazek, a rozhodne to obě otevřené otázky naráz (přízvuk i intonace).

**❓ HLAS JEŠTĚ NENÍ DEFINITIVNÍ.** Učitel u `fable` slyší cizí přízvuk („ukrajinský nebo
slovenský"). Rešerše 5. 8.: **žádné doporučení hlasu pro češtinu neexistuje** — OpenAI
v dokumentaci sama píše, že hlasy jsou laděné na angličtinu a kvalita se liší podle jazyka,
doporučuje vlastní zkoušku. Hlasů je **13, ne 6**; dozkoušeny zbylé (`ash`, `ballad`,
`coral`, `sage`, `verse` a nejnovější `marin`, `cedar`) na větě nabité ř/ě/š/ž a přízvukem
na první slabice. Čeká se na výběr učitele. Když nevyhoví ani jeden, náhradou jsou
poskytovatelé s RODILÝMI českými hlasy (Azure, Google, ElevenLabs) — jiný účet a ceník.

**📹 NOVÉ ZADÁNÍ UČITELE 5. 8.: z podkástu udělat VIDEO** podkreslené obrázky nebo
animacemi. Výslovně **až po zvuku** — nejdřív musí být hotová a schválená zvuková stopa.
Poznámka k návrhu, až na to dojde: web už má ke spoustě podtémat hotové interaktivní
simulace, takže obraz nemusí vznikat od nuly — dá se snímat běžící simulace a časovat
na scénář (scénář má odstavce, které jdou napárovat na scény). Vlastní kolo v ČERSTVÉ
session, ffmpeg na Macu vždy jen JEDEN proces.

**⏸️ ČEKÁ NA UČITELE:** (a) schválit první díl (hlas i formát) → pak výroba zbylých,
(b) rozhodnout 13 nálezů ve výkladu v tabulce výš.

### ✅ Hotovo 5. 8. ráno — kolo D8: měřidlo MakeCode/VEXcode + úklid disku (chyby a nastavení)

- **Měřidlo `nazvy-bloku.mjs` umí MakeCode i VEXcode** (uzavřen bod 4b/1 auditu:
  „nekontroluje NIC“). Zdroj pravdy: oficiální překlady makecode.com/api/translations
  (cs; pozor showNumber/showString = „ZOBRAZ“, showIcon/showArrow = „UKAŽ“).
  **První ostrý běh našel 4 živé vady:** „ukaž řetězec“ + „odešli řetězec“
  (MicrobitRadioSimulace), blok „pauza 400 ms“ ve výkladu i kvízu (správně „čekej“).
  Opraveno, obousměrně doloženo (54 → 60 kontrol), nasazeno a curl ověřen.
- **Úklid disku (schválil učitel):** smazáno 16 nahraných anonymizovaných kopií
  + pracovní složky 2 hotových pečlivých videí (~2,4 GB). Trvalá politika zapsána
  do `nahraj_stara_videa.py` i `pecliva_videa.py` — po úspěšném nahrání se maže
  lokální kopie/kousky, originál a finální mp4 VŽDY zůstávají.
- KOLODĚJE potvrzeno učitelem; další video si pečlivá linka bere sama (hodinové buzení).
- Popisy prezentací 7/8/9 běží lokálním vision modelem (22+/32 v době zápisu).

### ✅ KONTROLA D5 UZAVŘENA — kolo D7 (4. 8. ~23:45)

Nový kontrolor (čerstvý kontext): **9 nálezů, 5 závažných**, každý doložen spuštěním
kódu. Vše opraveno a nasazeno (`dc7c322`, brána 0 chyb, build 465, curl potvrdil):
**skákačka** — izolovaná ukázka pádu (kaktus při ní neběží) + trvalé zaboření místo
tichého propadání (worker, 2 kola; údajná „regrese hratelnosti" VYVRÁCENA kotvou —
starý commit `8c72b6b` se choval identicky, FAILy harnessu byly artefakt pořadí testů
a záměny událostí kaktus/propadl); **řazení** — nová data bodů, všech 6 kombinací
filtrů dává celé průměry (13/15/14/17/16/18); **střílečka** — kvíz sjednocen
s výkladem (⟨3 − skóre/10⟩ s); **honička** — výklad opraven („po půl minutě
dvojnásobný (6), po minutě trojnásobný (9)") + čárka přes `cz()`; **sestavení
robota** — texty srovnány se skutečným chováním (skutečný oblouk by vytlačil robota
z arény, rozpojení zůstává); **13 délkových nápověd → 0**, rohatka utažena
(756 otázek / 36 %). Verdikty: mechanika všech 4 simulací SPRÁVNÁ; ping-pong
pojistka 7 380 kombinací / 0 průniků; aréna 13/13 kombinací v mezích.
**Druhou kontrolu oprav přibalit k příští dávce (vzor D4).**

### 📋 ZADÁNÍ UČITELE 4. 8. (přednost před frontou)

1. ~~Video `TW9Zewb9w34` nasadit + první stránka s mapou a titulky~~ — **HOTOVO
   4. 8. pozdě večer (kolo D6):** video = KOLODĚJE (pečlivá anonymizace, kontrolor
   0 nálezů, zadání učitele = schválení). Místo ověřeno ze snímků videa (růžový
   barokní zámek) = **Koloděje nad Lužnicí** u Týna nad Vltavou. Předřazena
   úvodní mapa 6 s (`trasa_uvod.py`, domov → Koloděje, 70 km, nafta 336 Kč —
   výpočet ověřen) + titulek „Koloděje nad Lužnicí / zámek u Týna nad Vltavou
   · 2021" (PNG overlay přes PIL — ffmpeg tu nemá drawtext). Mapa i titulek
   vizuálně ověřeny (3 kontrolní snímky, konec neuříznut, zvuk 67 s = 6 + 61).
   Nahráno **https://youtu.be/CtELqPCIf1k**, horší verze `FKGHCv_YK84` přepnuta
   na soukromou, web přepárován (commit `269ba43`, jen `2021.ts` — tour.astro
   a worker.js nepřibaleny), build 465, curl na živé stránce 2021 potvrdil nové
   ID. Původní soubor zálohován jako `TW9Zewb9w34-bez-mapy.mp4` (nic nesmazáno).
2. ~~Mapa/diagram systému na vysvětlenou~~ — HOTOVO 4. 8. (nakresleno v chatu).

### ✅ Hotovo 4. 8. pozdě večer — kolo D5: 4 simulace (honička, střílečka, skákačka, řazení+filtrování)

Vějíř 4× worker-simulace, merge, nasazeno `8c72b6b`, brána 0 chyb, build 465,
všechny 4 stránky mají simulaci v dist. Názornost 60 → 52 (informatika 26 → 18).
⚠️ Kontrola nedoběhla (session limit) — viz 🔴 výš. Poučení dne: dlouhá session
s obřím kontextem prodražuje KAŽDÝ probuzený tah — /clear dělat po ~2–3 kolech,
ne po pěti; čekací prodlevy samy tokeny nestojí.

### ✅ Hotovo 4. 8. pozdě večer — kolo D4: druhá kontrola D3 uzavřena

12 zavřeno / 2 otevřeno / 4 nové (1 závažná — míček se i se zapnutou podmínkou
protahoval pod pálku). Vše opraveno původními workery (kvízy hlavní model),
nasazeno `d4919a8`, curl potvrzen. Kotvy: brána 0 chyb, build 465, pojistka
odrazu ověřena přímým během (7339 vstupů, 0 dolů). Poučení v METRIKY-KOL.md
(řádek D4): harness bez verdiktu mate; CDN status + obsah z téhož stažení.
**Do kontroly příští dávky přibal:** rychlý pohled na dvě předělané mechaniky
(aréna sestavení — posun rozpojený od natočení; ořez odchylky odrazu) očima
kontrolora další dávky, ať mají třetí nezávislý pohled.

### ✅ Hotovo 4. 8. večer — kolo D3: 4 simulace robotiky a her (Inf8)

Vějíř 4× `worker-simulace` (SestaveniRobota, MotoryDisplejZvuk, ProjektRobot,
PingPong), kontrolor po merge: **12 nálezů, 2 závažné — oba rozpor simulace ×
výklad × kvíz na téže stránce** (potřetí v řadě; pořád to nikdo neměří).
Opravy původními workery, kvízy hlavní model. Commity `19fd62b` (simulace),
`d1b4687` (opravy). Kotvy: brána 0 chyb, build 465, curl na živém webu potvrdil
„couvá (jede pozpátku)" i opravený kvíz. Názornost 60 → 56 (informatika 26 → 22).
Nová pravidla učitele v tomto kole: **orchestrátor práci nepřebírá** (retry buzení
1×, pak nový worker) · **nasazení automaticky bez pokynu** · smyčka se sama
nezastavuje. Vše v paměti + skillech.

### ✅ Hotovo 4. 8. — kolo D2: druhá kontrola D1 doběhla + nezávislý audit projektu

**Druhá kontrola čtyř simulací informatiky: všech 16 původních vad ZAVŘENO** —
nezávislý kontrolor každou doložil spuštěním kódu (harnessy nad skutečnými skripty
komponent: klon.js, mbv.js, mrr.js, vex2.js). Našel **5 nových vad, všechny opraveny
a znovu ověřeny týmiž harnessy**: (1) ZÁVAŽNÉ — rádio hlásilo „signál je silný (0 %)"
při jiné skupině (text nekontroloval sílu; nově zvláštní věta pro slabý signál);
(2) vysvětlení kvízové otázky o skupinách rádia patřilo k jiné otázce; (3) 10× délková
nápověda v blocích klonování a VEXcode — dorovnáno, rohatka se utáhla na 774 otázek;
(4) blok `když ⟨y < -160?⟩` měl otazník, který Scratch nemá; (5) „500 mg — nad mezí"
→ „dosáhlo meze". Kotvy: brána 0 chyb, build 465 stránek, opravy ověřené i v dist.

**Nezávislý audit celého projektu** (samostatný agent, čerstvý kontext): bilance
486 commitů/~93 kol, zásady vesměs drženy (kontrolor, kotvy, izolace zápisů DODRŽUJE SE;
diamant, měřidla, limity, jedno místo, tokeny ČÁSTEČNĚ). Hned opraveno:
- **Rohatka obousměrných důkazů byla slepá k testy/simulace/** (vzorec „opatření platí
  jen na část vstupů" v samotném vynucovacím mechanismu). `seznamMeridel()` nyní čte
  i podsložku; dluh 14 zapsán (`bezDokladu`), obousměrně doloženo: podvržený 24. test
  bránu shodil (15>14), po odstranění zelená. Oživly i 2 mrtvé záznamy registru.
- **„Hook po Write"** u workerů: v žádném nastavení hook není — je to systémový kontext
  prostředí (PostToolUse). Do definice `worker-simulace` přidána výjimka: ověření
  v prohlížeči dělá hlavní model po merge, worker to nehlásí jako PROBLÉM POVOLENÍ.

### ✅ Hotovo 3. 8. odpoledne — 4 nové simulace informatiky naráz (kolo D1)

Vějíř 4× `worker-simulace` paralelně, každý do vlastního nového souboru. Nasazeno,
commity `982d878` (simulace), `e90a0d2` (opravy), `e4dc261` (rozšířené měřidlo).

| podtéma | komponenta | `interakce` | co ukazuje |
|---|---|---|---|
| Inf9 `klonovani-animace-hry` | `KlonovaniSimulace` | `klonovani` | klon = kopie s vlastními hodnotami · zapomenutý `zruš tento klon` → náraz na scratchovský **strop 300 klonů**, kdy `klonuj` mlčky nic nevyrobí |
| Inf8 `tlacitka-naklon-zvuk` | `MicrobitVstupySimulace` | `microbit-vstupy` | tlačítka A/B/A+B, náklon přes akcelerometr (mez 500 mg = 30°), tón jen znázorněný — stránka nikdy nezvučí |
| Inf8 `propojeni-a-externi-zarizeni` | `MicrobitRadioSimulace` | `microbit-radio` | skupiny rádia 0–255, plynule slábnoucí signál (vzdálenost + zdi), piny s krokosvorkami |
| Inf8 `vexcode-prvni-program` | `VexcodeSimulace` | `vexcode` | skládání programu z bloků VEXcode IQ (`drive for 300 mm`), krokování, zeď hřiště |

Kotvy: brána `zkontroluj.mjs` 0 chyb (85 interakcí), build 465 stránek,
simulace ověřená ve vygenerovaném HTML všech čtyř stránek.

**Nezávislý kontrolor našel 16 vad, z toho 7 závažných — přes zelenou bránu i build.**
Všechny opravené autory jednotlivých souborů (`SendMessage` zpět původnímu workerovi —
levné, má kontext). Poučení je zapsané v `METRIKY-KOL.md` (řádek D1) a ve skillu
`/simulace`. Tři nejdůležitější:

- **Měřidlo hlídá jen tvary, které už jednou selhaly.** `testy/nazvy-bloku.mjs` hlásilo
  0 nálezů a přitom nemělo vzor pro `pokud ⟨⟩ tak` (česky je `když ⟨⟩ tak`) ani pro
  „náhodnou hodnotu". Doplněno 3. 8. i s obousměrným důkazem (podvrh → 2 nálezy,
  otisk souboru se změnil a po obnově vrátil).
- **ZNÁMÁ MEZERA, dosud neuzavřená:** názvy bloků **MakeCode a VEXcode nekontroluje NIC.**
  `testy/nazvy-bloku.mjs` umí jen Scratch, a to jen v celcích `SCRATCH_CELKY` a
  komponentách `SIMULACE_SE_SCRATCHEM`. Kontrolor proto ručně stáhl `pxt-microbit`
  a našel, že micro:bit nemá ikonu vykřičníku ani šipky (`showArrow` je jiný blok)
  a VEXcode IQ nezná centimetry. **Stojí za vlastní kolo.**
- **Simulace si protiřečila s výkladem na téže stránce** a nikdo to neměřil: tvrdý
  dosah rádia 25 m proti výkladu „přes zdi signál slábne"; české bloky proti výkladu
  „prostředí VEXcode je anglicky". Worker výklad četl — rozpor je potřeba měřit.

**Problém povolení — VYŘEŠENO 4. 8. (kolo D2):** žádný hook v nastavení neexistuje
(prohledáno settings.json všech úrovní i ~/.claude.json) — „hook po Write" je systémový
kontext prostředí (PostToolUse), který žádá ověření v prohlížeči. Do definice
`worker-simulace` přidána výjimka: ověření v prohlížeči dělá hlavní model po merge,
worker pokyn ignoruje a nehlásí ho jako `PROBLÉM POVOLENÍ`.

### ✅ Hotovo 3. 8. ráno — nová simulace „Senzory robota" (Inf8)

Podtéma `senzory-robota` mělo výklad, ale žádnou názornost. Simulace ukazuje **tři pointy
výkladu naráz** na jednom robotovi jedoucím ke zdi: (1) **bez opakování** se program
rozhodne jen jednou a robot jede naslepo do zdi, s opakováním zastaví 10 cm před ní;
(2) **ultrazvuk lže** — od šikmé stěny se ozvěna odrazí pryč, záclona ji pohltí, senzor
proto hlásí svůj největší dosah 200 cm, i když je zeď 1 cm daleko, a robot nabourá i
s opakováním; (3) **dotykový senzor** ho zastaví, ale až po nárazu — proto se senzory
kombinují. Na obrazovce jsou pořád vedle sebe dvě čísla: co senzor **hlásí** a jak je
zeď **doopravdy** daleko.

Čísla vycházejí celá (120 cm, krok 10 cm, práh 10 cm → přesně 11 kroků).

> **Nezávislý kontrolor našel 16 nálezů, 6 vážných** — a všechny seděly:
> (1) v jediném stavu (kolmá zeď + program bez opakování + zapnutý dotyk) hláška tvrdila
> „ultrazvuk ji neviděl", ačkoli měřil správně a robot naboural kvůli programu — věta si
> sama odporovala; (2) řádek „program rozhodl" dopočítával podmínku i tam, kde se program
> už neptá, takže u rozmáčknutého robota stálo „program rozhodl: stůj"; (3) `skewX(-20)`
> naklonil stěnu tak, že do ní robot vjel o 17 cm scény a paprsek jí procházel skrz;
> (4) **záclona se v textech důsledně jmenovala „zeď"** a byla nakreslená jako 40px kvádr;
> (5) test porovnával poznámku s toutéž hodnotou v kódu (tautologie) a nekontroloval naučné
> věty — 5 podvržených nepravd prošlo zeleně; (6) kontrola dotyku pokrývala 2 z 12 stavů.
> Dál: neexistující vysvětlení dosahu 200 cm · `aria-label` uvnitř `<svg role="img">`
> odečítač vůbec nečte (jméno dává jen `<title>`, ten se teď přepisuje) · svislé uspořádání
> scény neměřil nikdo (robot mohl létat vzduchem, podlaha být nahoře) · kontrast se počítal
> jen u CSS rámečků, obrysy v SVG ne · v kvízu vysvětlení odporovalo výkladu („odrazí jinam"
> × „pohltí"), otázka o zastavení byla po simulaci dvojznačná a chyběla otázka na kombinaci
> senzorů.

Test **122 → 154 kontrol**, mutační test **14/14**, obousměrně doloženo **21 podvrhy**
(`testy/podvrhy/senzory-robota-podvrhy.mjs`, zapsáno v registru). Kvíz má 11 otázek,
0 úniků, 0 délkových nápověd. Testy simulací celkem **1015**.
Zapojeno do `temata.ts` (`interakce: 'senzory-robota'`) i do stránky podtématu; build
465 stránek, ve vygenerovaném HTML je simulace ověřená.

> ⚠️ **Náhled v prohlížeči se ověřit nepodařilo** — port 8788 drží dev server jiné
> session („wonderly-dist"), cizí server tahle session zastavit nesmí. Kotvou je tedy
> test nad skutečným skriptem komponenty + build + kontrola vygenerovaného HTML.
> Až bude port volný, projít simulaci i očima.

### ✅ Hotovo 3. 8. v noci — simulace „Funkce v tabulkách" (oba úkoly z minulé fronty)

- **Test už vidí i texty v HTML** (úkol 1). Nová sekce 9 neporovnává napevno psané
  řetězce, ale váže text na chování: mez v hlavičce = `MEZ_KDYZ`, rozsahy = počet
  žáků, oddělovač středník, názvy funkcí s háčky, popisky MIN/MAX proti skutečným
  hodnotám, popisek přepínače proti tomu, co tlačítko udělá, chybové kódy z české
  sady Excelu. Přitom se našla živá nesrovnalost: tabulka vypisovala
  `#DĚLENÍ_NULOU!`, ale hláška pod ní tvrdila anglické `#DIV/0!` — sjednoceno.
- **Všech 8 drobných nálezů** (úkol 2): RANK rozlišuje `#HODNOTA!` (text) a `#N/A`
  (prázdná buňka = nula, ta ve sloupci není) · `scope` u všech záhlaví · 2. pád
  v `aria-label` · šrafa `#868e96` (kontrast 1,30 → 3,32 : 1) · „kopírováno dolů"
  v hlavičce · české uvozovky · dorovnané délky u 3 kvízových otázek · mrtvý kód pryč.
- **Nezávislý kontrolor našel 10 dalších, dvě vážné** — a měl pravdu:
  (1) závěrečná hláška měla „18 ÷ 6 = 3" **napevno**, přestože se ukazuje i po změně
  známky, takže po jednom kliknutí tvrdila dětem něco jiného než panel o dva
  centimetry výš; (2) test měřil vzorce, ale **naučné věty vůbec** — z 15 podvržených
  nepravd jich 11 prošlo zeleně, včetně „text je menší než každé číslo" (opak Excelu).
  Nová sekce 10 proto měří i texty: čísla v hlášce se porovnávají s daty po každé
  změně, poznámky u SUMA/POČET/RANK proti chování, nápověda proti `KOLECKO`,
  nadpis a úvod proti zvýrazněné funkci v panelu, kontrast každé čáry ≥ 3 : 1.
  Dále: RANK vypisuje `1` jako Excel (ne `1.`), `<caption>` u tabulky výsledků,
  mřížka `#adb5bd` → `#868e96`, a **dvě nové kvízové otázky** na hlavní pointy
  (třetí údaj u RANK, prázdná buňka v KDYŽ) — kvíz má 15 otázek.
- **Kotva:** test **93 → 167 kontrol**, obousměrně ověřeno **24 podvrhy na kopii mimo
  repo** (zdravá kopie mlčí, každý podvrh test shodí). Testy simulací celkem **828**,
  brány šablon 0 nálezů, build 465 stránek.

### ✅ Hotovo 2. 8. večer

- **Audit automatů na opsaná pravidla** (zadání učitele). Nalezena tři: projekce mapy
  ve 3 skriptech, denní strop YouTube napsaný podruhé číslem, rozhodnutí o hotovém
  městě. Vše sloučeno; nově `projekce_mapy.py`, registr `data/pravidla-registr.json`
  a hlídač `test_bez_kopii.py` (rohatka, dluh 0), zapojený do denní revize.
  Ověřeno 5 podvrhy. Dvakrát přitom hlídač propustil vadu — obojí opraveno.
- **Videa se vracela k revizi** — příčina: hlavní smyčka VideoAutomatu měla vlastní
  kopii podmínky, do které se oprava z 31. 7. nedostala (Le Bourg vzniklo 5×).
  Opraveno, hlídá `test_video_nasazeno.py` (9 kontrol).
- **Mapa: odkazy na videa 15 → 37 míst** — párovač bere i původní videa z kanálu,
  přepracovaná verze má vždy přednost a odkaz se po výměně přepíše sám.
- **Dvě nové simulace** informatiky (bludiště Inf7, funkce v tabulkách Inf8) —
  testy 125 a 93 kontrol, 17 + 11 nálezů kontrolorů opraveno.
- `revize_grafu.py` se vůbec nepřekládal (2 chyby v syntaxi) — opraveno; revize
  nově překládá všech 56 skriptů.

## 🎯 Předchozí stav (2. 8. 2026 večer — vlastní bloky s parametry, kolo C3)

**Hotovo:** simulace **„Vlastní bloky s parametry"** (Inf7, `vlastni-bloky-s-parametry`).
Program kreslí tři čtverce a otáčí se o **80° místo 90°**, takže se čáry neuzavřou —
chyba je vidět, ne jen napsaná. Pointa výkladu *„opravuješ na jednom místě"*:
**tři kopie kódu si vyžádají tři opravy** (a mezitím zůstávají dva útvary křivé),
**vlastní blok jedinou**. Srovnání 3 × 1 zůstane na obrazovce i po přepnutí režimu.
Parametr: tentýž blok kreslí 50, 80 i 120 — liší se jen číslo v okénku.
Test **61 kontrol**, testy simulací celkem **534**. Názornost informatiky **34 → 33**.

> **Nezávislý kontrolor našel 2 vážné a 6 drobných.** Obě vážné stály za to:
> (1) řádky programu měly `display: inline-block`, takže se skládaly **vedle sebe** —
> „tři kopie pod sebou" se rozpadly do vodorovné změti; (2) **test vůbec nečetl scénu**,
> takže podvrh „kresli vždy správný úhel" prošel všemi 45 kontrolami, ačkoli hláška
> tvrdila opak toho, co bylo vidět. Test teď čte skutečné `points` a `stroke` nakreslených
> čar; tři podvrhy kontrolora nově shodí 6, 9 a 1 kontrolu.
> Drobné: česká shoda („zbývající 1 zůstala křivá“) · závěrečná věta tvrdila „na jednu se
> zapomene“ ve chvíli, kdy už byly všechny tři útvary zelené · kontrola názvů bloků běžela
> jen v jednom ze dvou režimů · vzor měřidla neuměl interpolaci `jdi (${v}) kroků`.

> **Vlastní chyba — už podruhé tatáž:** opravy podle kontrolora jsem zahodil příkazem
> `git checkout` nad necommitnutou prací (poprvé u měřidla šablon). Je to zapsané v paměti
> [[feedback-podvrh-jen-na-kopii]] a stejně se to opakovalo. **Pravidlo pro příště: po každé
> dávce oprav rovnou commit, teprve pak jakékoli ověřování s podvrhem.**

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **33 podtémat**. Na řadě: `hra-bludiste` (Inf7),
   `senzory-robota`, `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
   Dávka 4+ patří do vějíře (`/simulace`).
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
3. `cz()` chybí v 11 simulacích, které formátují čísla.

## 🎯 Předchozí stav (2. 8. 2026 odpoledne — CELKOVÁ oprava kontroly šablon, kolo C2)

> **Výtka učitele:** *„stále něco opravuješ a zůstává to neopravené… navrhni celkovou opravu."*
> Byla oprávněná. Kontrola šablon se opravovala třikrát a pokaždé se ukázalo, že hádá.

**Co bylo špatně (v jádru, ne v jednotlivostech):** měřidlo hledalo volání prvků
**regulárními výrazy**. Na každý další způsob zápisu (`$(id)` zkratka, `<script is:inline>`,
`querySelector('#x')`, backticky) by musel přibýt nový vzor — a ten chybějící by byl vždycky
tichá díra. Doloženo: **270 z 945 vyhledání nebylo měřeno vůbec** a u čtyř komponent šlo
smazat CELOU scénu, aniž brána cekla.

**Celková oprava: přestat hádat a MĚŘIT.** Skript komponenty se spustí nad DOMem postaveným
ze skutečné šablony, každý dotaz na prvek se zaznamená a na konci porovná. Je pak jedno,
jakou cestou si skript prvek hledá. Je to tentýž posun jako u kvízů — *číst data, ne text*.

| | regexová verze | dnes |
|---|---|---|
| změřeno vyhledání | 675 | **5101** |
| pokrytí (smazání prvku se odhalí) | — | **977 z 983 = 99,4 %** |
| kontrol v obousměrném testu | 24 | **54** |
| mutací měřidla, které test shodí | 0 ze 6 | **6 ze 6** |

**Druhé kolo kontroly odhalilo, že se měřil jen kód doběhlý při NAČTENÍ** — obsluha tlačítek
ani časovače se nikdy nezavolaly, takže 32 vyhledání v devíti komponentách zůstalo slepých
(mj. celá tyč rotoru u elektromotoru). Nově se posluchači po doběhnutí jednou spustí.
Dál opraveno: komponenta bez jediného měření je **tvrdá chyba** (celý skript v
`DOMContentLoaded` dosud prošel mlčky) · jediné `class={…}` už neumlčí kontrolu id celé
komponenty · zakomentovaná scéna se nepočítá jako existující · prvek vyrobený, ale nikdy
nevložený do stránky, nezakryje vadu · každý `<script>` běží zvlášť · atrapa doplněna tam,
kde padala na ZDRAVÉM kódu (falešné „skript nedoběhl").

> **Zapsaná mez (poctivě):** změřit jde jen kód, který se opravdu provede. Šest vyhledání
> je ve větvích, kam běh při načtení nedojde (šipka síly u motoru, brýle u vady oka).
> Měřidlo také nehlídá překlep v názvu prohlížečové metody. Obojí je v `testy/obousmerne.json`.

> **Vlastní chyba, která stála nejvíc času:** podvrh v repu jsem vracel přes `git checkout`,
> jenže přepis měřidla ještě nebyl commitnutý — **zahodil jsem tím celou práci** a brána pak
> běžela zase na staré slepé verzi. Poučení: podvrhy dělat na KOPIÍCH, a když už v repu,
> tak jen nad commitnutým stavem.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **34 podtémat** bez obrázku či videa. Na řadě:
   `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7), `senzory-robota`,
   `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9). Dávka 4+ patří do vějíře.
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
3. `cz()` chybí v 11 simulacích, které formátují čísla.

## 🎯 Předchozí stav (2. 8. 2026 odpoledne — události a vstupy, kolo C1)

**Hotovo:** simulace **„Události a vstupy"** (Inf7, `udalosti-a-vstupy`) — scéna s kočkou
a míčem, žák vyvolává události tlačítky nebo skutečnou klávesnicí (šipky, mezerník) a vidí,
které žluté klobouky se rozsvítí. Pointa, kterou výklad jen tvrdí slovy: **přepínač vezme
míči klobouk, bloky mu nechá — a zelená vlajka s ním už nehne.** Přepnutí schválně
nevrací postavy na start, jinak by to nebylo vidět. Test má **100 kontrol**, mutační
test 17/19 (zbylé dvě posouvají mez o 1 px = ekvivalentní mutace).
Názornost informatiky **35 → 34** podtémat bez obrázku či videa; testy simulací **472 kontrol**.

> **Poučení kola: oba VÁŽNÉ nálezy byly v testu, ne v simulaci.** Test nečetl HTML šablonu
> vůbec — komponenta se smazanou scénou i všemi tlačítky jím prošla jako zdravá — a hlavní
> pointu ověřoval jen čistou funkcí, takže podvrh „přepínač vrátí míč na start" prošel bez
> povšimnutí. Obojí doložil nezávislý kontrolor podvrhem, obojí je nově uzavřené a ověřené
> oběma směry. **Mutační test k tomu ukázal třetí věc:** konstanty (krok 10, skok 20) jsem
> v testu četl z testovaného kódu, takže se tvrzení přizpůsobila jakékoli hodnotě. Teď se
> čísla čtou z TEXTU bloku, který má žák na obrazovce — kdyby simulace posouvala o jinak,
> než co je v programu napsané, spadne to.
>
> **A kontrolora nelze poslouchat slepě:** označil za závažnou vadu, že výklad píše
> „po obdržení zprávy", a tvrdil, že paleta má „po přijetí zprávy". Ověření v oficiální
> lokalizaci (scratch-l10n, `EVENT_WHENBROADCASTRECEIVED`) ukázalo **pravý opak** — a tím
> se našla skutečná vada na **třech jiných místech webu**, kde se jako název bloku psalo
> „po přijetí zprávy". Opraveno a nově to hlídá měřidlo `nazvy-bloku.mjs` (vzor je zúžený
> na tvar s „po", aby nehlásil popis jevu „událostí je i přijetí zprávy").

Dál opraveno podle kontrolorů: sjednoceno „zelená vlaječka" → „zelená vlajka" (3 místa) ·
kočka a míč mohli stát na témž bodě a slít se i s popisky (dráhy odděleny) · `role="img"`
na ovládané scéně (odečítač by skryl obsah) · kontrast návodu 3,3 : 1 pod normou ·
hláška „Kliknutí na míč nastala" · zaražený míč u okraje hlásil spuštěný scénář, ačkoli
se ve scéně nic nezměnilo · počítadlo spuštěných scénářů se počítalo, ale žák ho neviděl ·
tlačítko ↺ stálo v řádku „Míč:" a šlo si ho splést se spouštěčem události.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **34 podtémat** bez obrázku či videa. Na řadě:
   `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7), `senzory-robota`,
   `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
   Dávka 4+ nezávislých položek patří do vějíře (`/simulace`), ne za sebe.
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`).
   Nedodělek: `tabulka-vzorce` (háček `__hodnotaB` bere kurz jako parametr).
3. `cz()` chybí v 11 simulacích, které formátují čísla — doplnit při práci na nich.

## 🎯 Předchozí stav (2. 8. 2026 dopoledne — DLOUHODOBÝ AUDIT + OPATŘENÍ)

> **Zadání učitele:** *„udělej si dlouhodobej audit za delší pracovní cyklus, zda se
> s chybami netočíme v kruhu a zda ještě držíme diamant a nezávislého kontrolora…
> vytvoř opatření na zlepšení a pokračuj v práci bez zastavování."*

**Odpověď na otázku „točíme se v kruhu?": ANO, ale ne tam, kde by to čekal.**
Obsah se měřitelně lepší — hluché stránky **36 → 0**, uhodnutelnost kvízů **77 % → 38 %**,
kontrol simulací 244 → 273. Točí se **NÁSTROJE, které obsah hlídají**: vzorec „měřidlo
ukazuje číslo, které nic neměří" je doložen **20 výskyty ve čtyřech dnech**, z toho
5 za jedinou noc. Vlastní retrospektiva to napsala už dřív („ve všech pěti kolech byla
nejdražší vada v měřidle, ne v obsahu"), ale opatření z toho nikdy nevzniklo.

**Tři nezávislí auditoři, každý s jinou otázkou** (opakované vady × dodržování postupů ×
pravidla proti skutečnému kódu). Shodli se jen na jednom — a právě to je nejsilnější nález.

### Co se z auditu zavedlo (vše nasazené a ověřené obousměrně)

1. **Rejstřík obousměrného ověření měřidel** — `testy/obousmerne.json` + kontrola 6h v bráně.
   Pravidlo „novou kontrolu ověř obousměrně" platilo od 30. 7., ale jen jako TEXT, takže
   nic nebránilo nasadit měřidlo bez důkazu. **Nové měřidlo bez dokladu teď shodí build.**
   Dluh splacen hned: **6 ze 6 měřidel** má zapsaný podvrh i zdravý stav
   (`testy/meridla-obousmerne.mjs`, 24 kontrol; ověřeno 7 mutacemi měřidel).
   Pěti měřidlům k tomu musel přibýt parametr dat nebo se logika vytáhla do funkce —
   **právě proto u nich důkaz nikdy nevznikl: nešel jim podvrhnout vstup.**
2. **Duplicity a úniky odpovědí v kvízech** — `testy/uniky.mjs`, kontrola 6g.
   Obojí se opakovalo od 29. 7. a hledalo se ručně pokynem, na který se v tempu zapomínalo.
   Duplicita = tvrdá chyba (dnes 0), úniky drží rohatka (39). Kotva: nad historickými
   kvízy z 31. 7. najde 4 duplicity, mezi nimi **dvakrát doslova tutéž otázku**.
3. **Revize automatů má doháněč** (`--dohanec`, hodinové buzení) **a eskalaci** —
   běžela 1× za 24 h bez náhrady, takže na uspaném Macu se den vynechal. Hlídač zdraví
   neměl hlídače. Nález, který přetrvá do dalšího běhu, se nově označí `⏳ PŘETRVÁVÁ`.
4. **Rejstřík pravidel: opraveno 5 falešných ✅** — pravidlo vedené jako hlídané, jehož
   vykonavatel neexistuje (detail níže v „ČEKÁ NA UČITELE", bod 1).
5. **Počítadlo vstupů u kontrol** — brána nově vypisuje, kolik bloků a otázek prošlo.
   Opakovaný vzorec byl „opatření tiše platí jen na část případů" (filtr falešných
   poplachů se volal jen u fotek; společná mapa se neměřila vůbec).

> **Poctivá poznámka: všechna tři měřidla, která jsem během auditu napsal, byla v první
> verzi vadná.** Detekce duplicit hlásila 13 nálezů, z toho 11 falešných (filtr slov
> ≥ 4 znaky zahazoval čísla, takže „při 0 °C" a „při 100 °C" vyšlo jako shoda 100 %);
> detekce úniků 264 nálezů místo 39; první test měřidla prošel i po zavedení mutace.
> Odhalily to až podvrhy a mutace — ne pohled na výsledek. Je to nejlepší doklad, proč
> má nové opatření smysl.

### Druhý nález: DIAMANT se ze samostatného režimu vytratil

Kola S1–S5 jsou v metrikách všechna „chain", ačkoli se v nich dělaly dávky **5–9
nezávislých stránek** — učebnicový vějíř. Paralelní byla jen kontrola. Nezávislý
kontrolor naopak drží pevně (36 zmínek, vždy s počtem nálezů) — **kromě vlastních
měřidel, na která nebyl nasazen ani jednou**, a přesně tam byly nejdražší vady.
→ **Opatření:** dávka 4+ nezávislých položek se dělá vějířem (audit sám takhle běžel);
kontrolor dostává i kód kontrol, nejen obsah.

### Po auditu: dvě nové simulace informatiky (kola B1–B3)

**Větvení „když… tak… jinak…"** a **opakování „dokud / 10krát / stále"** — obojí nasazené
a ověřené na živém webu. Názornost informatiky **37 → 35** podtémat bez obrázku či videa,
testy simulací **318 → 371 kontrol**.

> **Dva nezávislí kontroloři našli 24 vad, z toho 9 vážných — a to obě simulace předtím
> prošly vlastními 83 kontrolami i buildem.** Nejzávažnější: **obě učily NEEXISTUJÍCÍ
> názvy bloků** („jdi 10 kroků" místo „dopředu o 10 kroků", „když na okraji, odraz se"
> místo „když narazíš na okraj, odraz se"). Systémová příčina: měřidlo `nazvy-bloku.mjs`
> četlo jen výklady a kvízy z dat, **ne komponenty simulací** — brána byla zelená.
> Po rozšíření hned našlo další dvě vady ve STARŠÍCH nasazených simulacích
> („řekni" místo „bublina", 3. osoba „dotýká se").
>
> **A první verze toho rozšíření podvrh NENAŠLA**: na zdrojový kód pouštěla `text()`,
> která maže vše mezi „<" a „>", takže v JS podmínce (`i < 80`) spolkla celé řádky.
> Poznal to až otisk souboru před/po — hláška „0 nálezů" vypadala úplně stejně jako
> zdravý stav. Do příště: **měřidlo psané pro HTML se nesmí pustit na zdrojový kód.**

Další opravy podle kontrolorů: šipky ANO/NE byly obráceně než výklad · dotyk barvy se
počítal bodově, takže postava viditelně stála na pruhu a program tvrdil opak · pointa
větvení byla vidět až po 33 kliknutích (nyní po 6) · „opakuj stále" hlásilo „nic se
nemění", ačkoli postava ujela 200 px · zastavení pojistkou vypadalo jako regulérní konec
smyčky · překryvy textů a kontrast pod normou · v kvízu byly **distraktory, které nejsou
skutečné bloky** (šly vyloučit bez znalosti učiva) · v testech tautologie `? … : true`
a porovnávání s vlastními literály místo se zdrojem pravdy.

**FRONTA — čím pokračovat:**
1. **Názornost informatiky** — zbývá **35 podtémat** bez obrázku či videa. Poslední
   velká obsahová mezera; dělat vějířem (`/simulace`).
   Nabízí se: `udalosti-a-vstupy`, `vlastni-bloky-s-parametry`, `hra-bludiste` (Inf7),
   `senzory-robota`, `funkce-v-tabulkach` (Inf8), `klonovani-animace-hry` (Inf9).
2. Doměřit zbylé testy simulací mutačním testem (`node testy/mutace.mjs <název>`) —
   doplňovat jen mutace ve fyzice a chování, ne v pixelech. Nedodělek: `tabulka-vzorce`
   (háček `__hodnotaB` bere kurz jako parametr, takže se výchozí hodnota neuplatní).
3. `cz()` chybí v 11 simulacích, které formátují čísla — doplnit při práci na nich.

## 🎯 Předchozí stav (2. 8. 2026, k ránu — AUDIT KONTROL DOJETÝ)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno skončí,
> začni hned nové. Já jdu spát, ty pracuj, nezastavuj se."* → **Žádné pauzy mezi koly.**
> Dotazy se zapisují sem do „ČEKÁ NA UČITELE", ne do chatu.

**Hotové za noc: hluché stránky 36 → 0** (šest dávek) **a k tomu celý bod 1 fronty —
zbytek auditu kontrol.** Vše nasazené a ověřené.

**a) Brána četla zapojení simulací z TEXTU**, ačkoli data byla načtená o pár řádků výš.
Tichá díra: podtéma s jiným odsazením nebo vzniklé programově by vzor minul a pro
takovou simulaci by se **přeskočily všechny tři kontroly zapojení** — brána zelená.
Ověřeno podvrhem (interakce zapsaná na témž řádku jako slug je pro starý regex
neviditelná; nová brána ji hlásí a končí kódem 1).

**b) Mapa „všechna místa" se neměřila vůbec — a hned se v ní našla vada.** Je to
nejhustší mapa webu (209 pinů, 4 jazykové mutace, kde jiná délka slov dává jiné
rozmístění). Popisek **„Vaulnaveys-le-Haut" přetékal z výřezu ve všech čtyřech
jazycích** a překrýval se s „Col d'Ornon". Příčina: **ruční `popisekPosun` se
aplikoval bez kontroly výřezu** — je doladěný pro mapu roku, ale společná mapa má
jiný výřez i písmo. Nově se posun použije, jen když se popisek vejde. Ověřeno, že
mapa roku dává **přesně stejné souřadnice** jako předtím (žádná regrese), a hotová
stránka přepočítána z nasazeného HTML: 209 pinů, 0 přetečení, 0 překryvů.

> **Málem jsem zavedl falešný poplach.** První verze měřidla hlásila „164 míst se
> beze stopy ztratilo". Není to pravda — `CestyVse.astro` kreslí piny pro **všechna**
> místa a každé je i v seznamu pod mapou; jen jmen se na 209 bodů vejde asi 40
> a zbytek rozmisťovač schválně vynechá. Přepsáno na **sledovanou hodnotu, ne chybu**.

**c) Slovník `DRUHY_MATERIALU`.** Neznámý druh materiálu se tiše ignoroval — přesně
tak vznikla falešná nula u `druh: 'obrazek'` (v datech není ani jednou, správně je
`infografika`) a stejně tiše propadávalo `pdf` (3×). Nově má **každý druh zapsané
rozhodnutí**, jestli se počítá do názornosti (pdf schválně ne — je to dokument ke
stažení). Neznámý druh je **tvrdá chyba**. Ověřeno podvrhem.

**d) Mutační test simulací — `node testy/mutace.mjs [část-názvu]`.** Zavede do zdroje
drobnou chybu a čeká, že test spadne; co projde, to nikdo nehlídá. **Do brány
schválně NEPATŘÍ** (je pomalý), je to nástroj na vyžádání.

> **⚠️ PRVNÍ VERZE NÁSTROJE SAMA LHALA** — a je to potřetí za noc, co měřidlo
> ukázalo číslo, které nic neměřilo. Měnila jen **první** výskyt každého vzoru,
> a ten u `elektrovani` padl do výpočtu SVG polohy pravítka — tedy do vizuálu, který
> test právem nekontroluje. Hlásila „1/5" a **nehnula se ani poté, co do testu přibylo
> šest nových kontrol Coulombova zákona**. Nově mutuje vzorek výskytů napříč souborem
> a u každé neodhalené vypíše kus kódu.

**Test `elektrovani` posílen 4/18 → 12/18.** Vzorec síly se **nikdy neověřoval** (volal
se jen jako vstup), takže záměna násobení za dělení přímo v Coulombově zákoně testem
prošla — žák by viděl scénu, kde silněji nabité pravítko přitahuje slaběji. Nově se
ověřuje přímá úměra s nábojem i pokles s **druhou mocninou** vzdálenosti. Doplněny
i texty, které žák čte. Kontrol simulací celkem **244 → 265**.

**e) Sjednocen vzorec, který byl v simulaci napsaný DVAKRÁT.** Mutační test ukázal, že
změna rychlosti elektronů v kreslicím kódu `OdporVodiceSimulace` testem projde. Příčina:
vzorec `110/(1+R)` byl v souboru dvakrát — jednou v kreslení a podruhé jako testovací
háček `svg.__rychlost`. **Test tedy ověřoval opis, ne to, co žák vidí.** Nově je to jedna
funkce a háček na ni jen ukazuje. *Pravidlo: testovací háček musí ukazovat na TÝŽ kód,
jinak nekontroluje nic.*

**Přeměřeno novou verzí nástroje** (poctivější čísla než stará):
`elektrovani` **12/18** (bylo 4) · `odpor-vodice` **11/25** (bylo 8) · `zapojeni` 8/26 ·
`reostat` 8/21 · `meridla` 7/15 · `souradnice` 7/25 · `led-displej` 6/12 ·
`promenne` 6/15 · `tabulka-vzorce` 6/26. Kontrol simulací **244 → 273**.

**FRONTA — čím pokračovat:**
1. **Doměřit zbylé testy simulací** — postup: `node testy/mutace.mjs <název>` → podívat
   se, které neodhalené mutace jsou ve **fyzice a chování** (ty doplnit) a které v čistém
   vizuálu (polohy, tloušťky čar, natočení — ty nechat být, testy nemají hlídat pixely).
   Nízké procento samo o sobě neznamená špatný test; rozhoduje, CO uniká.
   > **Poctivá poznámka k `tabulka-vzorce`:** doplnil jsem čtyři smysluplné kontroly
   > výchozího stavu, ale **mutační číslo se nepohnulo (6/26)**. Háček `__hodnotaB`
   > totiž bere kurz jako *parametr*, takže se přes něj skutečná výchozí hodnota
   > `let kurz = 25` vůbec neuplatní. Aby šla ověřit, musela by atrapa DOM v testu
   > sbírat vytvořené prvky a číst texty buněk. **Nedodělek, ne hotová věc.**
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Výklad už
   mají všechna slušný, takže tohle je poslední velká obsahová mezera. Skillem `/simulace`.
3. ~~Obnovit `METRIKY-KOL.md`~~ — **hotovo 2. 8.**: doplněna kola S1–S5 i poučení
   z retrospektivy (nejdražší vady noci byly v měřidlech, ne v obsahu). Zapisovat dál
   jeden řádek na kolo, hned na konci kola.
4. Kvízy nejsou priorita (viz audit strategie níže).

**⏳ ČEKÁ NA UČITELE** *(jediný živý seznam — sbírá se sem, ať se nemusí odklikávat průběžně)*

- **K DODATEČNÉMU SCHVÁLENÍ (2. 8., z auditu):** přenastavil jsem **LaunchAgent
  `com.omega.revize-automatu`** — dřív se budil 1× za 24 h a při uspaném Macu se běh
  bez náhrady vynechal, nově se budí hodinově a pracuje jednou denně (`--dohanec`),
  stejně jako ostatní automaty. Je to zásah do nastavení automatu, proto to hlásím;
  kdybyste to chtěl zpět, je to jedna změna v plistu.
- **Rejstřík pravidel měl 5 falešných ✅** (pravidlo se tvářilo jako hlídané, ale nikdo
  ho nehlídal) — opraveno v `Omega/PRAVIDLA.md`. Nejdůležitější z nich: *„správná odpověď
  v kvízu je v datech vždy první"*. `Kviz.astro` tuhle konvenci **používá**, ale nijak
  neověřuje — kdyby se u jedné z 2471 otázek pořadí přehodilo, web by tiše označoval za
  správnou špatnou odpověď. **Strojově to ověřit nejde** (který distraktor je pravdivý,
  pozná jen člověk); zkusil jsem to a heuristika dala 16 podezřelých, z nichž byl
  falešný poplach **všech 16**. Ručně jsem těch 16 prošel a pořadí je všude správně.
  Zůstává to tedy jako pravidlo pro člověka, ne pro stroj — je dobré o tom vědět.
- **Dvě věci, které rejstřík sliboval, a přitom neběží:** (a) přepnutí originálů starých
  videí na *private* po doanonymizování — kód existuje, ale jen za ručním přepínačem,
  sám se nespustí nikdy; (b) ochrana 11 lokálních modelů před smazáním — nehlídá ji nic,
  drží to jen pravidlo „ptát se". Mám u některé z nich něco doprogramovat?
- **⚠️ SÁHL JSEM NA VÁŠ ÚDAJ, PROTOŽE ŠLO O BEZPEČNOST.** Na stránce „Účinky proudu na
  člověka" stálo *„odpor člověka: v suchu a suché obuvi ~150 000 Ω, ve vlhku jen ~2000 Ω"*.
  Ta hodnota platí jen pro **suchou kůži při malém napětí**; při 230 V se kůže prorazí
  a odpor těla klesne k ~1 500 Ω. Nechat to tam by znamenalo učit děti, že suchý dotyk
  zásuvky je neškodný, proto jsem to opravil rovnou a neptal se předem. **Prosím
  o zpětné schválení** — kdybyste to chtěl jinak, vrátím.
- **Jakou generaci VEX IQ mozku škola má?** Stránka `co-umi-vex-iq` uvádí 12 portů na
  motory a čidla. U **starších Brainů si jeden port bere rádio** (volných 11), u novější
  generace je rádio vestavěné a 12 platí.

## 🎯 Předchozí stav (2. 8. 2026, v noci — HLUCHÉ STRÁNKY 0, DÍRA UZAVŘENA)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno kolo skončí,
> začni hned nové, aby se neztrácel čas. Já jdu spát, ty pracuj, nezastavuj se."*
> → **Mezi koly se neplánuje žádná pauza.** Dotazy se nehromadí v chatu, ale zapisují
> se sem do „ČEKÁ NA UČITELE".

**`node testy/kratke-vyklady.mjs 1200` hlásí 🕳 0.** Díra, kterou audit strategie
1. 8. označil za **největší na webu** (36 stránek bez obrázku, videa, simulace *a*
s výkladem pod 1200 znaků), je po šesti dávkách **zavřená celá**.

Poslední dávka (9 stránek, skoro celá elektřina): `elektricke-pole`,
`elektricka-prace-a-vykon`, `ucinky-proudu-a-bezpecnost`, `chemicke-zdroje-napeti`
(F8 i F9), `magneticke-pole-vodice-a-civky`, `elektricka-energie-a-premeny`,
`obnovitelne-a-neobnovitelne-zdroje`, `vlastnosti-stridaveho-proudu`.

Nově vyloženo: Faradayova klec (proč mřížka v troubě stíní mikrovlny, ale ne světlo) ·
**pravidlo pravé ruky konečně POPSANÉ** — dosud se na stránce jen jmenovalo ·
v elektrolytu vedou proud **ionty oběma směry**, vně článku elektrony · napětí článku
určuje dvojice materiálů, ne velikost · proč je střídavý proud výhodný (transformace,
ztráty rostou s proudem) · energie se nespotřebovává, **znehodnocuje** se na teplo ·
skoro všechny zdroje pocházejí ze Slunce (i uhlí) · **jistič chrání dům, chránič člověka**.

> **⚠️⚠️ DVA NEZÁVISLÍ KONTROLOŘI S RŮZNÝMI OTÁZKAMI** (jeden na čísla, druhý na fyziku
> a didaktiku) **NAŠLI NEZÁVISLE NA SOBĚ TENTÝŽ nejzávažnější nález** — to je nejsilnější
> signál, jaký tenhle postup umí dát. **Odpor člověka 150 000 Ω při 230 V je o dva řády
> mimo.** Nad ~50 V se kůže elektricky **prorazí** a odpor těla klesne na ~1 500 Ω.
> Já jsem na tom čísle postavil výpočet, ze kterého vyšlo uklidňující „1,5 mA, nepříjemné
> cuknutí" — ve skutečnosti vychází **153 mA, tedy pásmo zástavy srdce**, a většina
> smrtelných úrazů se stane právě **v suchu**. Blok je přepsaný: nově ukazuje, proč
> z ploché baterie nic necítíš (0,05 mA) a proč zásuvka zabíjí vždycky.

Další vážné nálezy (opraveno): **první pomoc měla volání 155 až jako 4. krok** po
zahájení resuscitace — laik, který začne masírovat, se už k telefonu nedostane · laická
KPR je **jen stlačování hrudníku**, puls se nehledá · **vodík byl veden jako obnovitelný
ZDROJ**, ačkoli je to jen nosič energie · dvě neslučitelné definice obnovitelnosti na
jedné stránce · uhlí „statisíce let" × „stovky milionů let" · **P = U · I bylo zároveň
výkon i příkon** · účinnost LED 70 % neseděla s vlastním příkladem (100 W → 10 W dává
50 %) · uhlík není kov · **anoda není vždy záporná** (při elektrolýze a nabíjení je
kladná) · zvonek zní **úderem kladívka do misky**, ne frekvencí přerušování.

> **Měřidlo `cisla-ve-vykladu.mjs` se za noc dvakrát vyplatilo:** pokaždé okamžitě
> nahlásilo, že oprava ve výkladu rozešla stránku s kvízem (nezámrzná hloubka 90 → 80 cm,
> účinnost LED 70 → 50 %). Obojí sladěno.

**FRONTA — čím pokračovat:**
1. **Zbytek auditu kontrol** — teď je to nejvyšší priorita, protože obsahová díra
   je zavřená: a) **zapojení simulací se čte z TEXTU**, ačkoli data jsou na dosah
   (`zkontroluj.mjs` ř. 25 načte `dataTemata` a už je nepoužije) — podtéma vzniklé
   programově kontrolu obejde; b) **mapa „všechna místa" (`CestyVse.astro`) se neměří
   vůbec** — 209 pinů, čtyři jazykové mutace, a `rozmistiPopisky` popisek, který se
   nevejde, **zahodí**; c) **slovníková kontrola hodnot** `druh`/`interakce` — neznámá
   hodnota má být chyba, ne ticho; d) slabé testy simulací podle mutačního testu:
   `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Výklad už
   mají všechna slušný, takže tohle je další skutečná mezera. Skillem `/simulace`.
3. **Obnovit `METRIKY-KOL.md`** — mrtvý od 29. 7.
4. Kvízy nejsou priorita (viz audit strategie níže).

**⏳ ČEKÁ NA UČITELE** — *přesunuto nahoru; živý seznam je VŽDY jen v nejhornější sekci.*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (2. 8. 2026, v noci — FYZIKA, DÁVKA 5)

> **Pokyn učitele z 2. 8. v noci:** *„nečekej na další kolo… jakmile jedno kolo skončí,
> začni hned nové, aby se neztrácel čas. Já jdu spát, ty pracuj, nezastavuj se. Práci
> průběžně kontroluj a potřebné věci pro schválení si ukládej."* → **Mezi koly se
> neplánuje žádná pauza.** Dotazy se nehromadí v chatu, ale zapisují sem do „ČEKÁ NA UČITELE".

**Hluché stránky 15 → 9.** Hotovo šest: `kondenzace`, `tuhnuti`,
`skupenske-zmeny-vody-v-prirode` (F8) a `uvod-do-fyziky`, `telesa-a-latky`,
`souhrnne-opakovani-velicin` (F6). Nasazeno a ověřeno curlem.

Doplněné učivo: kondenzace **uvolňuje** teplo (2 260 kJ/kg) → proto **pára popálí hůř
než vařící voda o téže teplotě** · kdyby led neplaval, rybník by promrzl ode dna ·
solení jen do **−21 °C** · koloběh vody **stěhuje energii** a pohání ho Slunce ·
Galileo + kladivo a pero na Měsíci (Apollo 15) · dvě otázky, jak rozeznat těleso od
látky · značka **t** znamená čas i teplotu (rozliší až jednotka).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ BYLA MOJE VLASTNÍ CHYBA.** Napsal jsem, že podchlazená voda
> po ťuknutí **„zmrzne celá naráz"**. Není to pravda — a odporovalo to odstavci o kus
> výš na téže stránce: tuhnutí **uvolňuje** skupenské teplo, to směs ohřeje na 0 °C
> a děj zastaví. Z vody podchlazené na −5 °C ztuhne jen asi **šestnáctina**, zbytek
> zůstane ledovou kaší (ověřeno výpočtem `c·Δt / l_t`). **Poučení: efektní tvrzení
> si ověřuj i proti vlastnímu textu o dva odstavce výš.**

Další nálezy kontrolora (opraveno): obláček z úst byl na jedné stránce „pára", zatímco
sousední stránka **totéž označuje za omyl** (pára je průhledný plyn, vidět jsou až
kapičky) · **rosný bod je TEPLOTA**, ne „stav" · **kroupy nevznikají zmrznutím padající
kapky**, ale opakovaným výnosem v bouřkovém mraku (odtud vrstvy jako cibule) · dusík
se stlačením nezkapalní, propan-butan ano · „led roztaje sám" navozovalo, že tání
nepotřebuje teplo · nezámrzná hloubka je 80–140 cm, ne 90–140.

> **Měřidlo se hned vyplatilo:** oprava hloubky 90 → 80 cm rozešla výklad s kvízem
> a `testy/cisla-ve-vykladu.mjs` to okamžitě nahlásilo. Sladěno.

**Rozhodnuto sám (odborné posouzení, neptám se):** web říká „základní jednotka"
i u odvozených (m³, kg/m³, N, Pa) — to je školská konvence shodná s učebnicí a
**přepisovat ji napříč desítkami kvízů by bylo horší než užitečné**. U teploty, kde
je to opravdu nepravda (základní jednotka SI je kelvin), je nově hvězdička s vysvětlením.

**FRONTA — čím pokračovat:**
0. **ZBÝVÁ 9 HLUCHÝCH STRÁNEK, všechno fyzika.** Seznam dá
   `node testy/kratke-vyklady.mjs 1200` (🕳). Zbývají: `chemicke-zdroje-napeti` (F8 i F9),
   `elektricka-energie-a-premeny`, `obnovitelne-a-neobnovitelne-zdroje`,
   `magneticke-pole-vodice-a-civky`, `elektricka-prace-a-vykon`, `elektricke-pole`,
   `ucinky-proudu-a-bezpecnost`, `vlastnosti-stridaveho-proudu` — **skoro celá elektřina**,
   dá se dělat jako jeden souvislý blok. **Kontrolor povinně.**
1. **Zbytek auditu kontrol** (beze změny): zapojení simulací se čte z TEXTU · mapa
   `CestyVse.astro` se neměří vůbec · slovníková kontrola `druh`/`interakce` · slabé
   testy `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat bez obrázku či videa. Skillem `/simulace`.
3. **Obnovit `METRIKY-KOL.md`** — mrtvý od 29. 7.

**⏳ ČEKÁ NA UČITELE** — *přesunuto nahoru; živý seznam je VŽDY jen v nejhornější sekci.*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (2. 8. 2026 — INFORMATIKA UZAVŘENA)

**Hluché stránky 21 → 15. Informatika je hotová — všech 6 zbývajících zavřeno**
(`hra-bludiste`, `hra-ping-pong`, `hra-skakacka`, `hra-vesmirna-strilecka`,
`motory-displej-zvuk`, `co-umi-vex-iq`). Nasazeno a ověřeno curlem. **Zbývá 15, všechno fyzika.**

Stránky her byly do teď čisté NÁVODY („udělej tohle") bez učiva. Každá dostala výklad
principu, který se za návodem skrývá: **detekce kolize** (bludiště), **herní smyčka a pohyb
po směru** (ping-pong), **gravitace jako proměnná rychlost** (skákačka), **klonování**
(střílečka), **vstup → program → výstup** a displej jako nástroj ladění (robot),
**program běží v robotu, ne v počítači** (VEX IQ).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ: MĚŘIDLO NÁZVŮ BLOKŮ BYLO PRAKTICKY MRTVÉ.** Vzor založený
> 1. 8. byl psaný jako `'dotýká se'`, jenže **čeština staví zvratné „se" před sloveso**
> („když **se dotýká** okraje"). Ten tvar se v textech skoro nevyskytuje, takže měřidlo
> hlásilo **0 nálezů** a přitom stejnou vadu neslo **pět stránek**. Falešná nula popáté —
> a tentokrát u kontroly, která vznikla právě proto, aby tuhle třídu chyb hlídala.
> Nově se rozhoduje podle **tvaru slovesa** (blok má 2. osobu „dotýkáš"), ne podle
> slovosledu. Přibylo pět dalších vzorů: `startuji jako klon` → **když startuje můj klon** ·
> `smaž klon` → **zruš tento klon** · `odraz se, když` → **když narazíš na okraj, odraz se** ·
> `schovej` → **skryj se** · `x ukazatele myši` → **x myši**.
> *Past při opravě: první verze nového vzoru hlásila i zdravou větu „postava se okraje
> dotýká", která mluví o významu podmínky a žádný blok nepojmenovává. Rozlišuje podmět —
> ve scénáři žádný není. Zúženo na „když se dotýká …".*

**Nezávislý kontrolor: 18 nálezů, tři vážné — všechny byly na stránkách už předtím:**
1. **Ping-pong šel hrát donekonečna.** Blok ⟨když narazíš na okraj, odraz se⟩ odráží
   i ode **dna**, takže podmínka „y &lt; −175" nenastane u **žádného** míčku (ověřeno
   výpočtem: míček 30 bodů se dostane nejníž na −165, čtyřicetibodový na −160). Život
   nikdy neubyl a hra neměla konec. Nově je dole **červené propadliště** a **past je
   z toho udělané učivo** — stránka ten spor rozebírá a končí pravidlem „když se dvě
   pravidla ve hře perou, vyhraje to rychlejší".
2. **Návrat po nárazu v bludišti nešlo naprogramovat.** Kontrola dotyku běžela ve vlastním
   ⟨opakuj stále⟩, ale pohyb je ve čtyřech scénářích u šipek — cyklus nemá jak zjistit,
   **kterým směrem** se postava hnula. Text si to navíc sám vyvracel. Nově je návrat
   hned pod pohybem, který ho způsobil, a všechny čtyři šipky jsou vypsané.
3. **Hlášky se skládaly pomocí `+`** („Konec! Skóre: " + skóre). Ve Scratchi je `+`
   **početní** blok — text v něm platí za nulu, takže by se žákovi vypsalo **holé číslo
   bez nápisu**. Správně ⟨spoj ( ) ( )⟩. **Přidáno do měřidla**, ověřeno podvrhem.

Další opravené nálezy: skákačka používala postavu **Země** a hodnotu **výška země**, které
stránka nikde nezaváděla · střílečce chyběl **scénář Rakety** i nastavení skóre a životů,
takže hra nešla dohrát · „srovnej y" a „přidej ⟨náhodné číslo⟩" nejsou bloky · tvrzení
„otáčka kola je stejně dlouhá, ať jede po čemkoli" **neplatí při prokluzu** — otáčky
vyrovnají vybitou baterii a tření, ale prokluz ošidí i je · vylepšení dávala žákům
**necelá čísla** (10 + skóre/5), přepsáno na celočíselné kroky · „vybitá baterie nezastaví
program" platí jen do chvíle, než se Brain vypne úplně.

**FRONTA — čím pokračovat:**
0. **ZAVÍRAT ZBYLÝCH 15 HLUCHÝCH STRÁNEK — už jen fyzika**, po dávkách 5–6.
   Seznam dá `node testy/kratke-vyklady.mjs 1200` (označí 🕳). Nejkratší:
   `kondenzace` (738), `chemicke-zdroje-napeti` F9 (739), `souhrnne-opakovani-velicin`
   (770), `tuhnuti` (842), `elektricka-energie-a-premeny` (848). **Kontrolor povinně** —
   u fyziky pozor hlavně na čísla a jednotky, ne na názvy bloků.
1. **Zbytek auditu kontrol** (beze změny, viz sekce z 1. 8.): zapojení simulací se čte
   z TEXTU, ač jsou data na dosah · mapa `CestyVse.astro` se neměří vůbec · slovníková
   kontrola hodnot `druh`/`interakce` · slabé testy `elektrovani`, `odpor-vodice`,
   `tabulka-vzorce`.
2. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem. Na řadě
   `vetveni-programu` (vývojový diagram) nebo `funkce-v-tabulkach`. Skillem `/simulace`.
3. Kvízy **nejsou priorita** (viz audit strategie níže).
4. **Obnovit `METRIKY-KOL.md`** — pořád mrtvý od 29. 7.

**⏳ ČEKÁ NA UČITELE** *(jediný živý seznam)*
- **Jakou generaci VEX IQ mozku škola má?** Stránka `co-umi-vex-iq` uvádí 12 portů na
  motory a čidla. U **starších Brainů si ale jeden port bere rádio**, takže volných
  zbývá 11; u novější generace je rádio vestavěné a platí 12. Nemám k tomu tvrdou kotvu —
  když jde o starší sadu, dopíšu na stránku závorku. *(Nález kontrolora, nízká závažnost.)*

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ Předchozí stav (1. 8. 2026, večer — VÝKLADY + AUDIT KONTROL)

**Zadání učitele:** pokračovat samostatně podle tohoto souboru, pak udělat nezávislý
audit, navrhnout změny a jet dál. Vše níže je nasazené a ověřené (build + push + curl).

**A) Informatika — doplněno 8 krátkých výkladů, pod 700 znaků jich zbývá 7 (bylo 15).**
`projekt-muj-robot`, `tlacitka-naklon-zvuk`, `seznamy-a-promenne-v-projektech`,
`motory-displej-zvuk`, `funkce-v-tabulkach`, `senzory-robota`,
`vlastni-bloky-s-parametry`, `hra-honicka`. Výklad nově pokrývá i to, na co se ptal
kvíz a na stránce to nebylo. Dvě dávky, každá s nezávislým kontrolorem (26 nálezů).

> **⚠️ NEJVÁŽNĚJŠÍ NÁLEZ: web soustavně učil NÁZVY BLOKŮ, KTERÉ V ČESKÉ PALETĚ
> SCRATCHE NEJSOU** — „řekni" (správně **bublina**), „jdi na" (**skoč na**),
> „otoč se k" (**nastav směr k**), „zastav vše" (**zastav (všechno)**). Žák by scénář
> podle stránky nesestavil. Postiženo bylo **15 míst na 8 stránkách**.
> Nové měřidlo **`node testy/nazvy-bloku.mjs`** to hlídá trvale (bod 6e brány, tvrdá
> chyba), tabulka je opsaná z oficiální lokalizace a kontroluje jen celky, kde se
> opravdu programuje ve Scratchi — u LEGO robota a micro:bitu jsou tytéž obraty
> správně. *Past: první verze měřidla hlásila i zdravé „opakuj dokud **nenastane**".*

Další vážné nálezy kontrolorů (opraveno): ve scénáři **Honičky byla kontrola chycení
ZA blokem „opakuj stále"**, takže hra nikdy neskončila · sčítání 0,1 dává ve Scratchi
**3.0000000000000013** → proměnná počítá celé desetiny a na konci se dělí deseti ·
**micro:bit V2 má reproduktor přímo na desce** (text platil jen pro V1) ·
`=RANK(…)` potřebuje dva údaje, samotná oblast skončí chybou · u známek najde tu
**nejlepší MIN, ne MAX** · měkká záclona zvuk **pohltí**, neodrazí ho jinam.

**B) NEZÁVISLÝ AUDIT KONTROLNÍCH MECHANISMŮ — a co z něj je hotové.**
Auditor prověřoval, které kontroly mohou tiše lhát, a podvrhy v kopii repa to doložil.

1. ✅ **Tichá lež sekce 7 (deník).** Kontroly roků čtou text regulárními výrazy
   citlivými na tabulátory — po přeformátování jednoho souboru **celý rok tiše vypadl
   ze všech kontrol** a brána zůstala zelená (163 míst místo 209). Nově se počty
   z textu porovnávají s počty **ze skutečných dat**; rozdíl = chyba. Ověřeno podvrhem.
2. ✅ **Testy simulací nikdy neběžely hromadně.** Bylo jich 9, brána nespouštěla ani
   jeden a bez argumentu padaly. Nový spouštěč **`node testy/vsechny-simulace.mjs`**
   si komponentu odvodí z názvu testu, hlásí i **počet kontrol (244)** — „nula chyb"
   z nula kontrol je falešná nula — a běží v `prebuild` při každém buildu.
3. ✅ **Dva mrtvé aserty** v `meridla.mjs` (`ok(6 + 6 === 12, …)` a porovnání dvou
   vlastních konstant testu). Nově se čte, co simulace opravdu napsala na displej.
4. ✅ **`reostat.mjs` si načítal `reo-udaj2` a nikdy ho nepoužil** — čísla, která žák
   vidí, se nekontrolovala a podvrh se **7× větším proudem testem prošel**. Nově se
   displej porovnává s výpočtem. (Hned se ukázalo, že jezdec je 0–100 %, ne 0–1.)
5. ✅ **Rohatka porovnávala zaokrouhlená celá procenta** — do jednoho procenta se vešlo
   ~12 nových vadných otázek. Nově hlídá i **počet** otázek (dnes 965 z 2436).
6. ✅ **Chybějící roční opakování bylo neviditelné** (`continue` místo hlášky). Nově:
   stránka existuje, ale kvíz k ní ne = tvrdá chyba (překlep v klíči); ročník ho vůbec
   nemá = varování. **Našlo skutečnou mezeru: `pracovni-cinnosti/6-rocnik`.**

**C) DRUHÝ NEZÁVISLÝ AUDIT — STRATEGIE (kam se energie vyplácí dávat).**
Auditor měřil, kam za tři dny šla práce: simulace 25 %, měřidla 25 %, **kvízy 19 %**,
stav a dokumentace 14 %, deník 14 % — a **výklad 2,3 %** (198 řádků z 8 572).
Osm dávek dorovnávání kvízů = 6 h 38 min souvislé práce a 18 řádků výkladu.

Tři jeho nálezy jsem si ověřil sám a **platí**:
1. **69 % dorovnaných otázek byly slabé nápovědy pod 20 znaků** — přesně to, co audit
   z 31. 7. výslovně zakazoval („dorovnávat jen rozdíly ≥ 20 znaků"). Silných nápověd
   zbývá 208 neopravených. Cíl „33–40 %" byl navíc zčásti iluze: podlaha není 0, ale
   **27,7 %** (u 83 % otázek nějaká striktně nejdelší odpověď existuje).
2. **Rozdvojená fronta ve stavovém souboru byla příčinou špatné priority** — ověřeno,
   opraveno (viz sekce „POSTUP PRÁCE S KVÍZY" níže).
3. **Největší díra: „hluché stránky"** — ani obrázek, ani video, ani simulace **a k tomu
   výklad pod 1200 znaků**. Dnes jich je **36 ze 150** (informatika 21, fyzika 15).
   Nově se měří: `node testy/kratke-vyklady.mjs 1200` je označí 🕳.
   *Vlastní past při ověřování: napsal jsem si měření přes `!nazornost(p)`, jenže ta
   funkce vrací OBJEKT (vždy pravdivý) → „0 hluchých stránek". Falešná nula počtvrté.*

**FRONTA — čím pokračovat (v tomto pořadí; přerovnáno podle auditu strategie):**
0. **ZAVÍRAT HLUCHÉ STRÁNKY TEXTEM, po dávkách 5–6, informatika napřed.**
   Stav: **36 → 21** (tři dávky hotové 1. 8. večer; ve třetí `propojeni-a-externi-zarizeni`,
   `klonovani-animace-hry`, `opakovani-s-podminkou`, `sestaveni-a-oziveni-robota`,
   `vex-iq-navody`). Zbývá 21 — z toho 6 informatika, 15 fyzika.
   *Původní zápis: 36 → 31* (první dávka hotová 1. 8. večer: `zaverecny-projekt`,
   `digitalni-stopa-a-identita`, `plan-projektu-a-ladeni`, `bezpecnost-pocitace-a-dat`,
   `razeni-filtrovani-velka-data`). Nejlevnější práce s největším dopadem:
   ~23 řádků na podtéma proti ~360 řádkům za simulaci. Další na řadě podle
   `node testy/kratke-vyklady.mjs 1200` (označí je 🕳). **Kontrolor povinně.**

   > **Nálezy z první dávky, které stojí za zapamatování (kontrolor, 16 nálezů):**
   > Web tvrdil, že cvičný projekt „Souřadnice" je z učebnice **Scratch II** — není,
   > je to kapitola 8 učebnice **Scratch I**; Scratch II má „Nákupní seznam" (ověřeno
   > v obsahu učebnice i v souborech ke stažení). · Napsal jsem, že častá chyba je
   > podmínka **za** blokem *opakuj stále* — jenže ten je **koncový blok** a nic se
   > za něj připojit nedá; skutečná chyba je podmínka **mimo** cyklus. · Tvrzení
   > „u nezletilých žádá o výmaz rodič" bylo **špatně** — žádat může i žák sám
   > (hranice 15 let se týká souhlasu se službami, ne práva na výmaz). · Pravidlo
   > zálohování **3–2–1** znamená dva různé **typy úložiště**, ne dvě místa. ·
   > Záloha není „jediná obrana proti ransomwaru" (proti zveřejnění ukradených dat
   > nepomůže) — je to nejspolehlivější cesta zpátky. · Odkaz na cvičná data vedl
   > na starou adresu s jiným názvem. · Stránka digitální stopy měla délkovou
   > nápovědu u **6 z 11** otázek (jedna 8,3×) — dorovnáno, blok je na nule.

   > **Druhá dávka (31 → 26): `orientovane-grafy-a-automaty`, `zabezpeceni-a-digitalni-stopa`,
   > `hardware-a-software`, `udalosti-a-vstupy`, `modely-a-schemata`.** Kontrolor opět
   > 16 nálezů. Nejzajímavější: českému signálu se **oficiálně říká žlutý, ne oranžový**
   > (bylo špatně ve výkladu i ve dvou otázkách) · tvrzení „bloky událostí začínají
   > slovem *po*" neplatí — `když (stopky) > ( )` je taky událost · „postava bez události
   > neudělá nic" má výjimku *když startuje můj klon* · u sdíleného souboru je „vidět"
   > a „číst" totéž (nově číst → komentovat → měnit obsah → měnit práva) · vzorové heslo
   > zveřejněné na webu už není vzor, který by někdo použil · odkaz na opocitacich.cz
   > je z části placený, což se teď píše rovnou. Délková nápověda 809 → **796** otázek.

   > **Třetí dávka (26 → 21).** Měřidlo názvů bloků dostalo čtyři nové vzory — a hned
   > našlo, že web učil „dotýká se okraje?" a „vytvoř klon", ačkoli paleta má
   > **„dotýkáš se okraje?"** a **„klonuj (sebe)"**. *Pozor, sám jsem si při tom vyrobil
   > další chybný tvar „dotýkáš se (okraj)?" — položka nabídky se jmenuje **okraje**,
   > ne okraj; odhalil to až kontrolor.* Další nálezy: klonů udrží Scratch nejvýš **300**
   > (pak blok nic nevyrobí a hra se rozbije) · tvrzení, že se na soutěž VIQRC „nedá
   > připravit dopředu", si odporovalo s výzvou na téže stránce · dvě otázky u robota
   > zkoušely testování po malých krocích, které na stránce nebylo · kvíz micro:bitu
   > netestoval to hlavní (stejné číslo skupiny) — otázka doplněna.
1. **Zbytek auditu kontrol** — nejlevnější body s největším dopadem:
   a) **zapojení simulací se čte z TEXTU, ačkoli data jsou na dosah** (`zkontroluj.mjs`
   ř. 25 načte `dataTemata` a už je nepoužije) — podtéma vzniklé programově kontrolu
   obejde; b) **mapa „všechna místa" (`CestyVse.astro`) se neměří vůbec** — 209 pinů,
   jiná funkce i jiné argumenty než mapa roku, čtyři jazykové mutace, a `rozmistiPopisky`
   popisek, který se nevejde, **zahodí** (měřit i to); c) **slovníková kontrola hodnot**
   `druh`/`interakce` — neznámá hodnota má být chyba, ne ticho (přesně tak vznikla
   falešná nula u `druh: 'obrazek'`; dnes `nazornost()` nezná `pdf`); d) slabé testy
   simulací podle mutačního testu: `elektrovani`, `odpor-vodice`, `tabulka-vzorce`.
2. **Doplnit zbývajících 7 krátkých výkladů** (`zaverecny-projekt`,
   `digitalni-stopa-a-identita`, `klid-a-pohyb-telesa`, `pocitacove-site-a-internet`…).
   Levné, dá se po kusech, **vždy nechat zkontrolovat kontrolorem** — u Scratche
   i micro:bitu se snadno napíše název bloku, který v české lokalizaci není.
3. **Názornost informatiky** — 47 podtémat, ani jedno s obrázkem či videem.
   Na řadě `vetveni-programu` (vývojový diagram) nebo `funkce-v-tabulkach`
   (dá se hodně převzít z `TabulkaVzorceSimulace`). Vyrábět skillem `/simulace`.
4. Kvízy **nejsou priorita** — a systematické dorovnávání délkové nápovědy jako
   samostatný úkol auditor doporučil **zastavit**. Sahat na ně jen mimochodem, když
   se stejně otevírá blok kvůli výkladu, a jen na **silné nápovědy ≥ 20 znaků** —
   a to **prodlužováním distraktorů, ne krácením správné odpovědi** (zkracování už
   třikrát zkazilo obsah). Slabé pod 20 znaků nechat být, rohatka je hlídá.
5. **Obnovit `METRIKY-KOL.md`** (jeden řádek na kolo) — je mrtvý od 29. 7., tedy
   přesně od chvíle, kdy začal samostatný režim, takže se rozpočet kol řídí odhadem.

**✅ VYŘÍZENO 1. 8. 2026 večer — učitel rozhodl o všech otevřených dotazech:**
- **micro:bit:** škola má **V1 i V2** → výklad učí, jak je poznat, kvíz má na rozdíl otázku.
- **Topné spirály:** opraveno na **nichrom** (nikl + chrom). Konstantan zůstává tam, kam
  patří — u **rezistorů**, protože jeho odpor se s teplotou skoro nemění. Do tabulky
  měrných odporů přibyl nichrom (~1,1 Ω·mm²/m), aby bylo vidět, proč se spirála rozžhaví
  a přívodní měděný kabel zůstane studený.
- **Beztíže:** správná odpověď je nově **volný pád**. Výklad gravitační síly ten jev
  popisoval správně (astronauti kolem Země volně padají), jen ho nepojmenovával —
  doplněno včetně varování před omylem „beztíže = rovnováha sil" (kniha na stole).
- **Pracovní činnosti 6:** doplněno **roční shrnutí** (souhrnný kvíz ze všech 33 otázek
  Tinkercadu a SketchUpu, strop 40). Kontrola 6c je tím zelená.

> **Při tom se našla vada v samotné rohatce:** shrnutí se skládají z TÝCHŽ objektů
> otázek, takže se každá počítala tolikrát, v kolika shrnutích je zařazená. Přidání
> ročního opakování proto ohlásilo „zhoršení o 12 otázek", ačkoli nevznikla ani jedna
> nová. Nově se **každá otázka počítá jednou** → skutečný stav je **809** různých otázek
> s délkovou nápovědou, ne 953. Ověřeno obousměrně: jediná nová vadná otázka (809 → 810)
> bránu shodí.

**⏳ ČEKÁ NA UČITELE** — *uzavřeno 1. 8., k tomuto dni bylo všechno vyřízeno.
Živý seznam i živá fronta jsou VŽDY jen v nejhornější sekci souboru.*

> ✅ **Vyřízeno 1. 8. večer:** sekce „Když počítač zlobí" i její dvě kvízové otázky
> jsou na pokyn učitele přestěhované ze `zabezpeceni-a-digitalni-stopa` (inf. 7)
> na `hardware-a-software` (inf. 9) — v sedmém ročníku žádná stránka o hardwaru není.
> Text se na novém místě opírá o tři vrstvy, které stránka vykládá (hardware ·
> aplikace · systém). Obě stránky zůstaly nad hranicí 1200 znaků, otázek je pořád 2470.

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (1. 8. 2026, ráno — SAMOSTATNÁ PRÁCE)

**HOTOVO A NASAZENO (bod 1 a část bodu 2 noční fronty):**

1. **Popisky na mapách deníku — vyřešeno, ale příčina byla jinde, než říkala fronta.**
   Poznámka z noci tvrdila, že `CestyRok.astro` si popisky umísťuje vlastním kódem;
   **není to pravda** — používá `pripravPohledy()` → `rozmistiPopiskyPolozek()` stejně
   jako všechny mapy. Skutečná vada: **popisek domova („jižní Čechy") se kreslil napevno
   pod domeček ÚPLNĚ MIMO rozmisťovač**, takže ležel na cizím pinu v **sedmi letech z osmi**.
   Nově ho umísťuje týž kód; místo navíc zabírá i odznak počtu u shluku a domeček sám.
   Nouzová varianta už nebere prvního kandidáta naslepo, ale toho s nejmenším překryvem
   (přetečení výřezu váží 12×), přibyl prstenec pozic kolem značky a třetí velikost písma.
   Kotva: nové měřidlo `testy/mapa-popisky.mjs` — **182 pohledů, 0 nálezů**; podvrh jich
   najde 282. Běží **v bráně při každém buildu**. Ověřeno i okem (2021, 2022) a curlem.

   > **Past, do které jsem sám šlápl a stojí za zapamatování:** měřidlo nejdřív volalo
   > `pripravPohledy` BEZ domova, takže popisek domova vůbec neměřilo a hlásilo „0 nálezů" —
   > **falešná nula**. Kontrola musí volat funkci se STEJNÝMI argumenty jako stránka.
   > Druhá past: kroužek shluku je jen OBRYS, uvnitř jsou vidět tečky míst. Když se bral
   > jako plný kotouč, jméno nemělo kam jít a odlétlo 30 jednotek od své značky.

2. **Kvízy — dorovnáno pět nejhorších bloků, 59 % → 56 %** (67 otázek).
   `vnimani-barev` 14/16 → 0, `tepelna-vymena-a-teplo` 15/17 → 0, `kmitani-a-vlneni`
   12/14 → 0, `energeticka-hodnota-potravin` 10/12 → 0, `zaverecny-projekt` 9/10 → 0.
   Nezávislý kontrolor nenašel věcnou chybu; dvě drobnosti opraveny — výklad energetické
   hodnoty nově říká, že mozek využívá **elektrickou** energii (kvíz se na to ptal, na
   stránce to nebylo). **Rohatka se sama utáhla na 56 %.**
   Nové měřidlo **`testy/delky.mjs`** vypíše konkrétní otázky i rozdíl v znacích:
   `node testy/delky.mjs vnimani-barev`.

3. **Druhá dávka kvízů hotová — 56 % → 54 %** (dalších 49 otázek): `elektricke-pole`,
   `vznik-elektrickeho-proudu`, `magneticke-pole-vodice-a-civky`,
   `jaderny-reaktor-elektrarna`, `obnovitelne-a-neobnovitelne-zdroje` — všechny na nule.
   Kontrolor opět nenašel věcnou chybu, zato **tři vysvětlení prozrazovala odpověď na
   SOUSEDNÍ otázku** (Oersted, střídavý proud „máme ho v zásuvce", „jsou nevyčerpatelné")
   a jedna otázka prozrazovala odpověď svým vlastním zněním („Jak se **přitahují**
   nesouhlasně nabitá tělesa?"). Opraveno. **Tohle hledej v každé další dávce** —
   je to častější vada než špatná délka.

4. **Třetí dávka kvízů hotová — 54 % → 51 %.** `odraz-svetla` (17/21),
   `optika-rovinneho-zrcadla`, `spalovaci-motory`, `seznamy-a-promenne-v-projektech`,
   `bezpecnost-pocitace-a-dat` — všechny na nule. **Celkem 15 bloků, 59 % → 51 %.**
   Kontrolor našel tři drobnosti: výklad odrazu světla nevysvětloval **odrazku na kole**
   (kvíz se na ni ptal), vysvětlení u ransomwaru prozrazovalo pozdější otázku o záloze
   a otázka „K čemu je rozptyl světla **dobrý**?" prozrazovala odpověď svým zněním.
   Opraveno; výklad má nově odstavec o koutovém odražeči.

5. **Čtvrtá dávka kvízů — 51 % → 49 %. Celkem 20 bloků, 59 % → 49 %.**
   Dorovnáno `skupenstvi-latek`, `modely-a-schemata`, `vetveni-programu`.
   **DVA bloky se musely PŘEPSAT, ne dorovnat** — vznikly slepením dvou dávek:
   `microbit/propojeni-a-externi-zarizeni` měl **čtyři duplicitní páry z deseti**
   (dvakrát piny, dvakrát rádio, dvakrát měření času, dvakrát propojení) a
   `roboticka-stavebnice/projekt-muj-robot` **tři páry** — 6 otázek pokrývalo 3 fakta.
   Ten druhý jsem sám přehlédl, našel ho až kontrolor. **Před dorovnáváním bloku si
   proto vždycky nech vypsat VŠECHNY jeho otázky, ne jen ty s délkovou nápovědou.**

6. **Pátá dávka — 49 % → 47 %. Celkem 24 bloků, 59 % → 47 %.**
   `telesa-stejnoroda-a-nestejnoroda`, `casticove-slozeni-latek`, `teplotni-roztaznost`,
   `teplo-a-premeny-skupenstvi`. V částicovém složení byl další duplicitní pár (dvakrát
   šíření vůně difuzí) — vyměněn za difuzi v pevných látkách, která je ve výkladu, ale
   v kvízu chyběla. **Kontrolor: 0 nálezů** (přepočítal i kolejnici 3 mm).
   Nový nástroj **`node testy/vypis-kviz.mjs <blok>`** vypíše VŠECHNY otázky bloku —
   délkové měřidlo duplicity neukáže.

7. **Šestá dávka — 47 % → 44 %. Celkem 28 bloků, 59 % → 44 %.**
   `oko-vady-oka`, `jaderna-energie-a-reakce`, `kulova-zrcadla-dute-zrcadlo`, `teziste`.

   > **⚠️ NEJDŮLEŽITĚJŠÍ POUČENÍ CELÉHO DOROVNÁVÁNÍ (nález kontrolora 1. 8.):**
   > Přílišné zkracování správné odpovědi ji dokáže ZKAZIT. Dvakrát se to stalo:
   > „skutečný, převrácený, **zmenšený**" zkráceno na „skutečný a převrácený" —
   > jenže zmenšený je JEDINÝ znak, který ten případ odlišuje od předmětu mezi
   > r a f; a „**širší postoj**, nižší těžiště" zkráceno na „nižší těžiště",
   > čímž vypadla polovina odpovědi na otázku o brankáři.
   > **Krátit se smí jen vata, nikdy rozlišující znak. Když správná odpověď vyjde
   > nejdelší, PRODLUŽ DISTRAKTORY — nekrať ji.**

   Dále vyměněna otázka „Kdo má těžiště obvykle níž? → ženy" (mimo učivo, navíc
   stereotyp) za soutěžní auta z výkladu.

8. **Sedmá dávka — 44 % → 42 %. Celkem 32 bloků, 59 % → 42 %.**
   `archimeduv-zakon`, `telesa-a-latky`, `var`, `elektricke-obvody`.
   Kontrolor **potřetí** našel vadu ze zkracování: „mléko je látka, láhev **s mlékem**
   je těleso" zkráceno na „mléko látka, láhev těleso" — tím se posunul význam a odpověď
   si začala protiřečit s vlastním vysvětlením. Druhý nález: čtyři otázky Archimédova
   zákona (loď, ponorka, slaná voda, balon) zkoušely učivo, které na stránce nebylo →
   výklad dostal novou sekci „Kde to potkáš" (mazat dobré otázky by byla škoda).

9. **✅ Osmá dávka — CÍL SPLNĚN. Délková nápověda 59 % → 40 %, celkem 36 bloků.**
   Cíl z původního zadání byl 33–40 %. `elektricky-proud-v-kovech-odpor`,
   `elektromagnet`, `elektromagneticka-indukce`, `vlastnosti-stridaveho-proudu`.
   Kontrolor našel 7 nálezů, tři závažné (definice elektromagnetu ztratila slovo
   „**měkká**"; dvě vysvětlení byla doslova odpovědí na pozdější otázku téhož bloku).
   Výklad střídavého proudu nově vysvětluje, proč žárovka nebliká.

10. **Informatika — první krok k názornosti: hra „Chytej jablka" dostala simulaci**
   (recyklace `PromenneSimulace`, jeden řádek v datech). Hra stojí na proměnné skóre
   a její typická chyba je chybějící „nastav skóre na 0" — přesně to simulace ukazuje.
   Kotva: stránka má simulaci v HTML a `nazornost.mjs` už tu mezeru nehlásí.
   **Ostatní hry recyklaci nedostaly** (bludiště, honička, ping-pong, střílečka,
   skákačka) — scéna je o jablkách a jinde by si protiřečila s učivem stránky.
   Automaty prověřeny: všechny LaunchAgenty končí nulou, jen `pip-audit` vrací 1,
   což je jeho normální chování při nálezu (torch — čeká na učitele).

11. **Uzavřen další bod z fronty auditu: „číslo ve správné odpovědi, které není
    ve výkladu".** Nová kontrola `testy/cisla-ve-vykladu.mjs` běží v bráně.
    Doplněno do výkladu: rychlost světla ve vodě ~225 000 km/s a ve skle ~200 000 km/s ·
    scéna Scratche je 480 × 360 bodů · displej micro:bitu má 5×5 = **25** světýlek ·
    svislý a vodorovný směr svírají 90°.

    > **Měřidlo samo bylo nejdřív špatně** (a je to už potřetí, co se to stalo):
    > první verze našla 34 případů, ale 20 z nich byly **výsledky početních úloh**
    > (60 N, 800 kg, 40 °C) — ty ve výkladu být nemají, žák si je spočítá. Druhý zdroj
    > falešných poplachů byla **shrnutí**, která vlastní výklad nemají. Po zpřísnění
    > (přeskoč otázky s čísly v ZADÁNÍ a bloky shrnutí) zbyly 4 skutečné nálezy.
    > Ověřeno obousměrně podvrhem.

12. **Výklad `vetveni-programu` doplněn + VĚCNÁ OPRAVA názvu bloku.**
    Nezávislý kontrolor upozornil, že blok „a zároveň" v českém Scratchi 3 neexistuje.
    Ověřeno ve zdroji pravdy (`scratch-l10n`, `editor/blocks/cs.json`):
    **OPERATORS_AND = „%1 a %2"** — blok se jmenuje prostě **„a"**, dál „nebo" a „ne".
    Web to učil špatně na třech místech (výklad, odpověď v kvízu, vysvětlení) — žák
    by blok v paletě Operátorů nenašel. Opraveno. *(Pozor: „a zároveň" jako běžné
    české spojení je jinde v textech v pořádku — opravovat jen NÁZVY BLOKŮ.)*
    Nové měřidlo **`node testy/kratke-vyklady.mjs [mez]`**: 16 podtémat má výklad
    pod 700 znaků, skoro samá informatika — potvrzuje audit.

**FRONTA — čím pokračovat:**
0. **DOPLŇOVAT KRÁTKÉ VÝKLADY INFORMATIKY** — levnější a hned užitečné, na rozdíl
   od nové simulace se dá dělat i po malých kusech. Nejkratší: `projekt-muj-robot`
   (536), `tlacitka-naklon-zvuk` (566), `seznamy-a-promenne-v-projektech` (572),
   `funkce-v-tabulkach` (584), `motory-displej-zvuk` (592), `senzory-robota` (595).
   **Vždy nechat zkontrolovat kontrolorem** — u Scratche i micro:bitu se snadno
   napíše název bloku, který v české lokalizaci neexistuje.
1. **Kvízy už NEJSOU priorita** — cíl 33–40 % je splněn a rohatka hlídá, aby se to
   nezhoršilo. Dorovnávat dál jen mimochodem, když se stejně sahá do bloku.
2. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem).
   Na řadě: `vetveni-programu` (inf. 7) — vývojový diagram, žák přepne podmínku
   a vidí, kudy to teče; nebo `funkce-v-tabulkach` (inf. 8), kde se dá hodně
   převzít z hotové `TabulkaVzorceSimulace`. Vyrábět skillem `/simulace`.
3. Kontrolovat i to, co běží samo (hlídač deníku, pečlivá videa).

## ⏩⏩⏩⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 23:20 — SAMOSTATNÁ NOČNÍ PRÁCE)

**Učitel jde spát a zadal: pracuj samostatně dál, sám si kontroluj, co je podle domluvy
potřeba dodělat — na škole i na webu cesty. Bez ptaní.** Rozpočet: ~12 kol, pak /clear.

**FRONTA PRÁCE (v tomto pořadí):**
1. **Popisky míst na mapě ROKU se překrývají.** Ve Vogézách jsou čtyři místa do 3,4 jednotek
   od sebe (Salbert, Le Thillot, Rupt-sur-Moselle, Saint-Maurice) a žádné nemá `popisekPosun`.
   Příčina: `rozmistiPopisky()` z `src/data/cesty/mapa.ts` používá **jen `CestyVse.astro`**;
   `CestyRok.astro` si popisky umisťuje vlastním kódem, který překryv neřeší. Buď na mapě
   roku použít tutéž funkci, nebo doplnit ruční posuny. Ověřit VÝPOČTEM překryvu obdélníků
   (vzor `ramecek()` v mapa.ts), ne okem.
2. **Škola — dorovnávat kvízy** (uhodnutelnost 59 %). Podle brány: `zaverecny-projekt` (9/10),
   `tepelna-vymena-a-teplo` (15/17), `vnimani-barev` (14/16), `kmitani-a-vlneni` (12/14),
   `energeticka-hodnota-potravin` (10/12). Postup a pasti níže; v každém bloku hledat
   i duplicitní páry otázek a otázky na učivo, které na stránce není vyloženo.
3. **Škola — názornost informatiky** (47 podtémat, ani jedno s obrázkem či videem).
4. Kontrolovat i to, co běží samo: `node zkontroluj.mjs` po každé změně, hlídač deníku
   běží hodinově a nasazuje sám.

**HOTOVO 31. 7. v noci (jen na vědomí):**
- **Longevelle sur Doubs 2025** — nárok Content ID byl na PŮVODNÍM zvuku (video z 2025,
  automat se ho nedotkl). Nová verze s jinou hudbou, úvodní mapou (850 km ≈ 4 082 Kč)
  a titulkem místa: https://youtu.be/-l7f6ja0rR4 ; originál přepnut na soukromý.
  Obraz bitově shodný s anonymizovanou verzí (kotva = md5 video stopy).
- **Denní strop nahrávání na YouTube opraven** — dnes odešlo 5 videí místo 2, protože každý
  automat počítal jen svá. Nově společné počítadlo a strop **2/den z tohoto Macu**
  (druhý profil radekmicek nahrává až 3 denně a čerpá tutéž kvótu 10 000 jednotek).
- **Le Bourg-d'Oisans už je na YouTube** (nezařazený, 21:18) BEZ názvů přibalených míst —
  nezveřejňovat, dokud nevznikne přestavěná verze. V `KE-SCHVALENI.md`.
- Doplněny **francouzské popisy** Livet-et-Gavet a Col d'Ornon → všech 12 míst 2026 má cs/en/de/fr.
- Nasazeno: odkazy na videa u míst (Frangy, Vaulnaveys, Livet-et-Gavet) + automat `videa_na_web.py`.
- Škola: meteorologie F7 — uhodnutelnost 19/21 → 4/21, výklad doplněn, tři věcné chyby opraveny.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 18:30 — INFORMATIKA + DENÍK)

**ZADÁNÍ UČITELE 31. 7. večer: „kde to lokálním modelům nejde, převezmi to sám"
a „jeď dál, šetři tokeny".** Podle toho:
- **49 překladů popisů míst přeložil člověk** (lokální smyčka je 11 h zamítala) →
  **156/156 míst má popis v cs, en, de i fr.** Zapsáno přes `zapis_popisy.py`, který
  nově umí i překlady (`{"slug": {"en": …}}`) pod týmž zámkem.
- Pojistky proti opakování: `POKUSU_NA_PREKLAD = 3` v `popisy_mist.py` · sdílený zámek
  modelu v `pecliva_videa.py` · **otisk výsledného videa jako kotva** (shodný otisk =
  kolo se nepočítá) · chybová hláška ukazuje návratový kód místo konce stderru.
- **Rohatka na kvízy** (`testy/rohatka.json`): zhoršení SHODÍ build, zlepšení laťku
  utáhne samo. Ověřeno obousměrně.
- **Měřidlo délkové nápovědy nadhodnocovalo** — počítalo i remízy, takže otázka
  „značka proudu: I / U / R" (všechny 1 znak) se vykazovala jako uhodnutelná; takových
  je 103. Nově se počítá jen STRIKTNĚ nejdelší → skutečný stav 65 %, ne 76 %.
- **Dorovnáno 11 bloků** (vnitřní energie, vypařování, senzory robota, hardware+software,
  sestavení robota, řazení a filtrování, plán projektu, přenos el. energie, kondenzace,
  elektrické obvody, ohodnocené grafy) → **77 % → 62 %**. U pěti z nich se přitom našly
  **duplicitní páry otázek** (3–4 páry z 10) — bloky vznikly slepením dvou dávek.
  **Dál dorovnávat:** `rezistor-s-promennym-odporem` (11/12),
  `meteorologie-a-mereni-tlaku` (19/21), `vlastni-bloky-s-parametry`, `zabezpeceni-a-digitalni-stopa`.
- **VĚCNÁ CHYBA opravena:** výklad i kvíz fyziky 9 tvrdily, že dálková vedení jsou
  **měděná**. Přenosová vedení VVN jsou hliníková lana s ocelovým jádrem (AlFe) —
  měď je při stejné vodivosti asi 3× těžší a prohnula by stožáry. Opraveno i s důvodem.
- Pozn. k dorovnávání: otázky mají v `kvizy.ts` dva formáty (jednořádkový a víceřádkový).
  Skript, který hledá `odpovedi: […]` jen do konce řádku, ty víceřádkové **tiše minul** —
  hlásil „nešlo" u 4 z 18. Hledat v úseku ~700 znaků od textu otázky, ne do `\n`.

> **ODLOŽENO — anonymizace videa žere 19–32 GB a systém proces zabíjí (signál 9).**
> Tři pokusy: (1) sdílený zámek modelu, aby neběžela souběžně s Ollamou (nasazeno,
> správné, ale nestačí), (2) uvolnění modelu z paměti přes `keep_alive: 0` (uvolnilo
> 44 GB, proces přesto zabit), (3) krájení videa na 30s kousky místo 120s
> (`DELKA_KOUSKU_S`, složky nesou délku v názvu — `zdroj30s`, `anonym30s`, nic se
> nemaže). Ani po zkrácení paměť neklesla, naopak 32 GB. Data se přitom nedrží —
> `detekce_syrove` má jen souřadnice. **Podezření: paměť roste s počtem volání
> insightface na snímek** (3030 volání na video), tedy únik v modelu/ort, ne v našem
> kódu. **Další nápad k vyzkoušení:** `--krok 2` nebo 3 (analyzovat každý druhý/třetí
> snímek; okno ±5 snímků při rozmazávání to pokryje) → 2–3× méně volání modelu.

**DENÍK — NÁLEZ 31. 7. večer: smyčka vracela učiteli NEZMĚNĚNÝ soubor.** Učitel po
opravách hlásil, že video vypadá stejně (rozmazaná střecha, lavička, terasa i manželka).
Příčina nebyla v anonymizaci: `zamitnuto()` vynulovalo nálezy a kola > 1 vybírají kousky
k přepracování **podle nálezů**, takže vyšlo „přepracovávám **0 z 1** kousků" a kontrolor
znovu odkýval týž soubor z 5:28 ráno — tedy verzi vyrobenou ještě PŘED opravou v 16:25.
Opraveno: zamítnutí učitelem vrací smyčku na **kolo 0** (celé video, výchozí práh —
opravoval se kód, ne citlivost; přitvrzování prahu by tu bylo proti smyslu připomínky,
protože rozmazává víc) a prázdný seznam kousků se nikdy nebere jako „není co dělat".
Video se od 18:09 přepracovává celé; kotva = otisk `anonym/kousek_000.mp4` před během
byl `6e4132c7…`, po doběhnutí musí být JINÝ. Pak učitel odklikne `--schvaleno`/`--zamitnuto`.
**Pravidlo napříště: hlášku automatu neber jako důkaz — porovnej otisk souboru.**
- **K revizi zbývají 2 videa:** `Schongau_DE` (94 MB) a `Le_Bourg-dOisans_v2` (248 MB).
  Le Bourg se ještě přestaví — jeho média se změnila a čeká na Le Lavandou (13 médií
  z ručního vkladu, uzavře se 6. 8. podle pravidla 7 dní).
- **Čeká na učitele:** sloučit dvě složky Geisingen (v `KE-SCHVALENI.md`) — ta
  s neviditelnými znaky v názvu je podmnožina `Geisingen_DE`, automat z ní videa nedělá.
- Reference tváří: **56 učitel, 62 manželka** (ráno 13 a 31). Roky 2021 a 2022 pro
  učitele NEEXISTUJÍ — ověřeno měřením, ve videích není (drží kameru).

**ŠKOLA — hotovo `microbit/oziveni-a-led-displej`** (inf. 8): `LedDisplejSimulace` —
displej 5×5 na klikání, dva obrázky, animace jejich střídáním. Dvě pointy: ze **dvou
stejných** obrázků animace nevznikne, a tentýž program v bloku **„po spuštění"** jednou
doběhne a zůstane stát. Test `testy/simulace/led-displej.mjs` (47 kontrol, obousměrně
ověřen podvrhem). Kvíz přepsán: měl **4 duplicitní páry z 10 otázek** a správná odpověď
byla nejdelší u 9 z 10 (nově 5 z 10, největší rozdíl 7 znaků). Výklad doplněn o `pauza
400 ms` a rozdíl obou bloků — kvíz se na to ptal, ale na stránce to nebylo.
**Další na řadě:** `vetveni-programu` (inf. 7) nebo `funkce-v-tabulkach` (inf. 8).

> **Past (nález kontrolora 31. 7.):** displej po zastavení programu skákal na obrázek,
> do kterého se KRESLÍ — tedy se obraz změnil přesně proti větě, kterou si žák právě
> přečetl. Zastavení proto nově přepne kreslení na ten obrázek, který svítil. A pozor
> na **tautologický test**: `ok(a !== b || true, …)` hlásí ✅ vždycky. Kontrolor ho našel,
> já ho pak při přepisu omylem napsal podruhé — grepovat `|| true` v testech.

## ⏩⏩⏩⏩⏩⏩ Předchozí stav (31. 7. 2026, 13:50 — INFORMATIKA)

**VĚTŠÍ ZMĚNA Z AUDITU JE HOTOVÁ.** Kontroly nově čtou **skutečná data** přes
`testy/data.mjs` (esbuild → `import`), ne text souboru. Brána i měření názornosti nad
tím běží, brána se pouští při každém `npm run build` (`prebuild`) a byla ověřena
**obousměrně** (podvrh se najde, zdravý stav nehlásí nic). Nová kontrola 6c hlídá, že
každé podtéma s kvízem je zastoupené v ročním opakování. Brána teď vidí **2436 otázek
ve 164 blocích** (dřív tvrdila 2084).

> **Pravidlo pro každou další kontrolu:** piš ji nad `nactiData()`, nikdy nad textem
> souboru. Vzory nad textem si nech jen na kontrolu ZAPOJENÍ (import v `.astro`, řádek
> s vykreslením, union typ) — tam je předmětem kontroly opravdu zdrojový kód.

**TEĎ SE DĚLÁ INFORMATIKA** — podle auditu je to největší díra na webu:
47 podtémat, jen 5 simulací a **ani jedno podtéma s obrázkem či videem**.

| ročník | bez názornosti | simulací |
|---|---|---|
| informatika 7 | 14 z 18 | 4 |
| informatika 8 | 16 z 18 | 2 |
| informatika 9 | 10 z 11 | 1 |

**Hotovo:**
- `adresy-bunek-a-vzorce` (inf. 8) — `TabulkaVzorceSimulace`. Úloha přímo z výkladu: sloupec
  cen v € a kurz v B1. S `$B$1` vyjde 100/300/500/1000 Kč, s relativním `B1` se odkaz posune
  na předchozí VÝSLEDEK a čísla se lavinovitě rozjedou (100 → 1200 → 24 000 → 960 000).
- `souradnice-a-kresleni` (inf. 7) — `SouradniceSimulace`. Scéna −240…240 × −180…180, klikání,
  posun po 10 (i šipkami), pero, cíle a program čtverce krok po kroku. Pointa je **záporné y
  = DOLŮ**. Mřížka je po 50, aby rohy čtverce (±50) padly na linky. Test `testy/simulace/
  souradnice.mjs` (51 kontrol). Výklad doplněn o kreslení otáčením + pravidlo 360 : počet stran.

- `promenne` (inf. 7) — `PromenneSimulace`. Krabička `skóre` + okénko na scéně jako ve
  Scratchi, program „seber tři jablka" krok za krokem. **Pointa: program jde přepnout na
  verzi BEZ bloku `nastav skóre na 0`** — napoprvé vyjde taky 3, podruhé 6, potřetí 9;
  tím se vysvětlí, proč hra po restartu začíná s cizím skóre. Test 26 kontrol.

**Návrh dalších simulací informatiky (v pořadí užitku):**
1. `microbit/oziveni-a-led-displej` (inf. 8) — mřížka 5×5 LED, žák kreslí a spustí
   animaci střídáním dvou obrázků.
3. `vetveni-programu` (inf. 7) — vývojový diagram, žák přepne podmínku a vidí, kudy to teče.
4. `funkce-v-tabulkach` (inf. 8) — SUMA/PRŮMĚR/MAX nad malou tabulkou (naváže na hotovou
   TabulkaVzorceSimulace, dá se z ní hodně převzít).
5. `orientovane-grafy-a-automaty` (inf. 7) — automat jako kolečka a šipky, žák posílá vstup.

> **Past ověřená 31. 7.:** u simulace ke Scratchi VŽDY použít **české názvy bloků podle
> Scratche 3** (`pero zapni` / `pero vypni` / `smaž`, `dopředu (100) kroků`), ne doslovný
> překlad anglických („pero dolů"). Kvízy na webu už české názvy používají, takže doslovný
> překlad si se stránkou protiřečí — a žák blok v paletě nenajde. Zdroj pravdy: scratch-l10n.
> Druhá past: **tlačítko přepínače musí pojmenovávat AKCI** („zapnout pero"), ne stav —
> jinak na něm při kreslení stojí „pero nahoru". Stav patří slovy do stavového řádku.

**Pozor u informatiky na dvě věci:** (a) `senzory-robota` má ČTYŘI duplicitní páry otázek
z deseti — chce přepsat celý blok podle výkladu, ne jen dorovnat délky; (b) informatika má
nejkratší výklady na webu (medián ~700 znaků), takže u některých podtémat je potřeba spíš
doplnit TEXT než přidat simulaci.

**Zbytek fronty z auditu** (neztratit):
- **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet otázek
  s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
- Dorovnávat jen **449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý efekt.
- Levné kontroly: výklad pod ~700 znaků · číslo ve správné odpovědi, které není ve výkladu
  (58 případů).
- K ověření učitelem: otázka „Co je stav beztíže? → působící síly jsou v rovnováze"
  (fyzika 7) — beztíže je volný pád, ne rovnováha sil.


## ⏩⏩⏩⏩⏩⏩ AUDIT STRATEGIE (31. 7. 2026, 12:40) — ČTI JAKO PRVNÍ

Učitel zadal: *„udělej celkový nezávislý audit, jestli je strategie správná — někdy příliš
záplat nedá dobrý výsledek a je třeba jedna větší změna."* Běželi **dva nezávislí auditoři
s různými otázkami**. Závěr: **architektura je v pořádku, velký přepis by byl zbytečný.
Špatná byla TRIÁŽ a hlavně MĚŘIDLA.**

**Co je ověřeno a nemá se měnit:** výkon (72 kB HTML, 7 kB CSS po gzipu na 405 stránek —
poběží i na školním tabletu) · univerzální šablona simulací se nevyplatí (jen 8 % zdroje
je sdílitelný styl, 74 % je scéna a fyzika) · zapojení simulace přes 4 místa brána spolehlivě
hlídá · testy simulací přes `node:vm` jsou tvrdá kotva.

**Hlavní poučení: NEVĚŘ VLASTNÍM MĚŘIDLŮM, DOKUD JE NĚKDO NEPROVĚŘÍ.**
Všechny tři kontrolní skripty četly TypeScript **regulárními výrazy místo dat**:
1. `testy/nazornost.mjs` hledal `druh: 'obrazek'` — ta hodnota v datech **není ani jednou**,
   správně je `'infografika'` (23×). Infografiky se nikdy nepočítaly → fyzika 7 hlásila
   5 mezer, ve skutečnosti 2. **Opraveno.**
2. `zkontroluj.mjs` hlásí **2084 otázek, ve skutečnosti jich je 2426** (import dat přes
   esbuild). 14 bloků shrnutí (342 otázek) nevidí vůbec, protože se skládají programově.
   **ZATÍM NEOPRAVENO — viz fronta níže.**
3. Odsazení bloku `elektrina` v `temata.ts` je o tabulátor jiné, takže naivní regex
   napočítá 22 podtémat místo 37.
→ **Pravidlo do budoucna: kontroly mají číst DATA (esbuild → `import`), ne text souboru.**
   `esbuild` je v `node_modules`, import trvá ~10 ms. Vzor je v commitu tohoto auditu.

**Co se z auditu udělalo hned:**
- Brána běží při každém buildu (`"prebuild": "node zkontroluj.mjs"`) — dosud jen z dobré vůle.
- **Roční opakování nepokrývalo všechna podtémata.** Souhrnný kvíz bere otázky po kolech
  do stropu; když je strop < počet podtémat, poslední témata se do opakování **nedostanou
  nikdy** (fyzika 8: 35 podtémat, strop 30 → vypadával celý celek `zvuk`). Navíc v seznamu
  celků informatiky chyběly `hry-ve-scratchi` a `vex-iq`, takže **144 otázek přidaných
  v předchozí session se do opakování nedostalo vůbec.** Opraveno, ověřeno importem dat.
- **Tištěný test šel složit hádáním na známku 2.** Strategie „vyber nejdelší odpověď" má
  úspěšnost 72 %, tedy ~5 ze 7 otázek. Test teď losuje přednostně z otázek bez délkové
  nápovědy → kleslo na ~3,8 ze 7. **Není to oprava dat**: ve 148 ze 164 bloků není ani
  7 čistých otázek.
- **Recyklace místo psaní nových simulací** (1 řádek místo ~200): `energie-a-jeji-premeny`
  ← `skatepark`, `teplo-a-premeny-skupenstvi` ← `ohrev`, `elektricky-naboj` ← `elektrovani`,
  `elektricke-obvody` ← `obvod`. Mezer názornosti ve fyzice 8: **22 → 13**.

**Tři návrhy auditora ZAMÍTNUTY po vlastní kontrole** (nepřebírat je příště bez ověření):
`tuhnuti` ← `ohrev` a `kondenzace` ← `vyparovani` by ukazovaly OPAČNÝ směr děje, než se
probírá (porušuje pravidlo o logické scéně); `vykon` ← `prace` nepokrývá výkon vůbec.

**FRONTA — co z auditu zbývá, v pořadí užitku:**
1. **Přepsat `zkontroluj.mjs` a `nazornost.mjs` na import dat přes esbuild.** Zruší tři
   nezávislé regexové parsery téhož souboru a odstraní zdroj falešných čísel. *Tohle je
   ta „jedna větší změna", na kterou se učitel ptal — zbytek jsou opravdu jen záplaty.*
2. **Rohatka na délkovou nápovědu:** brána spočítá podíl z dat a SELŽE, když se počet
   otázek s nápovědou zvýší. Staré nikdo neblokuje, nové se hlídají tvrdě.
3. **Dorovnávat jen 449 otázek s rozdílem ≥ 20 znaků** (ne všech 1619) — nesou skoro celý
   efekt. Zkracovat správnou odpověď a přebytek dávat do `vysvetleni`.
4. Levné strojové kontroly: podtéma bez zastoupení v ročním shrnutí · výklad pod ~700 znaků ·
   číslo ve správné odpovědi, které není ve výkladu (58 případů) · shoda počtu otázek
   podle parsování a podle importu.
5. **Skutečná díra není ve fyzice, ale v informatice:** 47 podtémat, 5 simulací, medián
   výkladu ~700 znaků a **ani jedno podtéma nemá obrázek či video**. 39 podtémat má
   simulaci a přitom výklad pod 1200 znaků — energie šla do simulací místo do textu.
6. K ověření učitelem (neopravovat potichu): otázka „Co je stav beztíže? → působící síly
   jsou v rovnováze" (fyzika 7) — beztíže je volný pád, ne rovnováha sil.

## ⏩⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 11:15 — ŠKOLA: názornost fyziky 8, čti jako první)

**Zadání učitele:** „Média k fyzice 8 (22 podtémat bez obrázku/videa), stránky jsou textové,
chybí názornost." Číslo ověřeno skriptem: fyzika 8 má **37 podtémat a 22 z nich nemá ani
obrázek, ani video, ani simulaci**. Příčina: `public/materialy/fyzika/` obsahuje jen
**6-rocnik a 7-rocnik** — pro osmičku a devítku tam není ani jeden soubor.

**Měření názornosti napříč webem** (skript, dá se zopakovat — viz níže):

| ročník | bez názornosti / celkem |
|---|---|
| fyzika 6 | 6 / 21 |
| fyzika 7 | 5 / 33 |
| **fyzika 8** | **22 / 37** ← řeší se |
| fyzika 9 | 10 / 25 |
| informatika 7 / 8 / 9 | 15/18 · 17/18 · 10/11 |
| pracovní činnosti 6 | 2 / 2 |

**Zvolený postup** (fotky ani videa vyrobit neumím — ty dodává učitel a YouTube automat;
umím ale simulace a infografiky jako kód, což je u elektřiny názornější než obrázek):
elektřina má 12 z těch 22 podtémat a je nejabstraktnější, proto se začalo tam.

**HOTOVO 31. 7. (5 z 22 podtémat, nasazeno a ověřeno curl):**
- `MeridlaSimulace` — ampérmetr do série, voltmetr paralelně + **oba chybné způsoby**
  (`elektricky-proud-mereni`, `elektricke-napeti-mereni`)
- `OdporVodiceSimulace` — R = ρ·l/S včetně vlivu teploty
  (`elektricky-proud-v-kovech-odpor`, `zavislost-odporu-na-vodici`)
- `ReostatSimulace` — týž jezdec jako reostat (proud) × potenciometr (napětí)
  (`rezistor-s-promennym-odporem`)

**ZBÝVÁ 17 podtémat bez názornosti** — návrh pořadí pro další kola:
1. `elektricky-naboj` + `elektricke-pole` (elektrování třením, přitahování, siločáry)
2. `elektricka-prace-a-vykon` + `vykon` (počítadlo kWh a korun podle skutečných spotřebičů)
3. `ucinky-proudu-a-bezpecnost` (infografika účinků + pojistka)
4. `elektricke-obvody`, `vznik-elektrickeho-proudu`, `chemicke-zdroje-napeti`
5. teplo: `tuhnuti`, `kondenzace`, `skupenske-zmeny-vody-v-prirode`, `teplo-a-premeny-skupenstvi`
6. `tepelny-motor-parni-stroj`, `energie-a-jeji-premeny`, `vnitrni-energie-telesa`
(`pololetni-shrnuti` a `rocni-shrnuti` názornost nepotřebují — jsou to rozcestníky s kvízem.)

**Jak si měření zopakovat:** projít `temata.ts` a u každého podtématu se ptát, jestli má
`interakce`/`interakce2`, materiál `druh: 'obrazek'` nebo `druh: 'video'`. **Past:** blok
`elektrina` má v `temata.ts` o jeden tabulátor jiné odsazení než ostatní celky, takže
naivní regex `^\t{5}slug:` ho přeskočí a napočítá 22 podtémat místo 37. Používej `^\t{5,}`.

**Poučení z tohoto kola — nezávislý kontrolor našel u první simulace 10 vad, dvě vážné:**
1. **Animace protiřečila vlastnímu textu.** U zkratu text tvrdil „proud žárovku obejde",
   ale tečky dál obíhaly hlavní smyčku skrz žárovku. Kdo kreslí schéma i text, snadno
   popíše, co zamýšlel, ne co je vidět.
2. **Jediná součástka v obvodu zabila didaktický smysl.** Napětí na žárovce se rovnalo
   napětí zdroje, takže správné (voltmetr paralelně) i chybné (v sérii) měření ukazovalo
   stejných 12 V — žák nemá jak poznat rozdíl. Opraveno na dvě součástky v sérii:
   6 V na žárovce z 12 V zdroje. **Pravidlo: simulace měření musí mít v obvodu aspoň dvě
   součástky, jinak se rozdíl nemá kde projevit.**
3. **Simulace předbíhala učivo.** Používala Ohmův zákon, který je v `temata.ts` až o dvě
   podtémata dál. Před nasazením ověřovat i POŘADÍ podtémat, nejen správnost.
   Test to teď hlídá strojově (v textech nesmí být „I = U / R" ani hodnota v ohmech).
4. Kontrolora neposlouchat slepě: navrhoval zvýšit zkratový proud na 8× kvůli názornosti,
   jenže při přemostění žárovky se proud přesně **zdvojnásobí** — necháno pravdivé 2 A.

**Druhé kolo kontroly (simulace odporu a reostatu) — 15 nálezů, 8 vážných. Poučení, která
platí pro KAŽDOU další simulaci:**
1. **Zjednodušený model si musí sednout se schématem.** Potenciometr počítal dělič
   naprázdno, ale na schématu na něm visela žárovka 10 Ω — zobrazená napětí byla až
   dvojnásobná proti skutečnosti. Řešení nebylo počítat zatížený dělič (tím by zmizela
   celá čísla), ale **dát na výstup voltmetr** — což je zároveň to, jak se potenciometr
   opravdu používá. **Když model něco zanedbává, schéma to musí zanedbání ospravedlnit.**
2. **Reostat a potenciometr mají protichůdné požadavky na čísla**: reostat potřebuje
   odpor drátu ≫ odpor spotřebiče, dělič naprázdno naopak. Čísla se musí navrhnout
   pro každý režim zvlášť (teď: 12 V, drát 40 Ω, žárovka 10 Ω, krok jezdce 25 %).
3. **Obvod na schématu musí být UZAVŘENÝ.** Chyběl vodič od spotřebiče ke spodní
   kolejnici — dítě hledá uzavřenou smyčku jako první věc.
4. **Jas žárovky se řídí VÝKONEM (I²·R), ne proudem.** Při poklesu proudu na pětinu
   zbyde 4 % jasu, ne 20 % — jinak simulace slibuje víc světla, než by ve třídě bylo.
5. **Vypsaný vzorec musí dát vypsaný výsledek.** U zahřátého drátu stálo na obrazovce
   „0,5 · 4 / 1" a hned pod tím „2,04 Ω". Teď vzorec ukazuje hodnotu za studena
   a vliv zahřátí se dopisuje zvlášť; test to hlídá tak, že si dosazení **přepočítá**.
6. **Jednotky musí sedět s výkladem na téže stránce.** Výklad učil ρ v Ω·m, simulace
   používala Ω·mm²/m — žák dosazující podle výkladu by byl 10⁶× mimo. Do výkladu proto
   přibyla praktická jednotka i převod.
7. **Kontrolovat i POŘADÍ podtémat.** Simulace byla zapojená i tam, kde se ρ ani vzorec
   ještě neprobraly → vznikla zjednodušená verze přes prop (`odpor-vodice-zaklad`).
8. **Pozor na nefyzikální popisky ovládání.** „Rozžhavený drát" u hliníku (taje při
   660 °C) neexistuje; činitel 1,6 odpovídá zahřátí asi na 175 °C, ne rozžhavení.
9. **Ořezané mapování zabije pointu.** Rychlost elektronů byla oříznutá na mez, takže
   mezi 2 Ω a 10 Ω nebyl vidět žádný rozdíl — přitom „větší odpor = menší proud" je
   celé sdělení simulace. Test proto ověřuje, že různé vstupy dají různé rychlosti.

**Jak se simulace ověřují bez prohlížeče** (náhledový server často blokuje jiná session):
skript ve scratchpadu spustí **skutečný `<script>` komponenty** v Node přes `node:vm`
s náhradním DOM, pak zavolá vystavené čisté funkce (`svg.__stavMeridel`, `svg.__odpor`,
`svg.__reostat`…) a proměří spojitost pohybu po 16 ms i všechny kombinace ovládání.
Tohle je tvrdší kotva než pohled okem a nestojí skoro nic — u nových simulací pokračuj stejně.

## ⏩⏩⏩⏩ KDE POKRAČOVAT (31. 7. 2026, 6:00 — ŠKOLA: díry v kvízech)

**Uzavřeno: 12 podtémat bez kvízu má kvíz.** Pracovní činnosti (Tinkercad, SketchUp),
VEX IQ (4 podtémata 8. a 9. roč.) a hry ve Scratchi (6 podtémat) — celkem **144 nových
otázek**. Zbylých 11 „podtémat bez kvízu" jsou **shrnutí**, kterým se kvíz skládá
automaticky funkcí `slozSouhrnnyKviz` — díra to není. Jediné skutečně bez kvízu zůstává
`fyzika/6-rocnik/shrnuti/pokusy` (sbírka pokusů, kvíz tam nedává smysl).

**Kvízů je ve skutečnosti 2086 otázek, ne 358.** Údaj 358 z předchozích session byl
podhodnocený: `zkontroluj.mjs` počítal otázky regexem `^\s*text:` a **jednořádkové
otázky** (`{ text: '…', odpovedi: […] }`, kterých je většina) do počtu vůbec nebral —
takže ani jeho kontrola „ke každé otázce patří odpovědi" na nich neplatila. Opraveno
a ověřeno obousměrně (podvrh bez odpovědí se najde, definice typu se nepočítá).

**Poučení pro psaní kvízů (odhalil nezávislý kontrolor, platí i do budoucna):**
1. **Správná odpověď nesmí být systematicky nejdelší** — v první verzi jich bylo 73 %
   a šly uhodnout bez znalosti látky. Míchání pořadí to neodstraní. Měřit skriptem;
   cíl je ~33–40 % a žádný rozdíl ≥ 10 znaků.
2. **Vysvětlení jedné otázky nesmí prozradit jinou** otázku téhož bloku (a bloky
   sousedních témat se prozrazují navzájem).
3. **Neuvádět klávesovou zkratku v zadání**, když se na ni jiná otázka ptá — jde pak
   vyloučit. („K čemu je nástroj Metr (T)?" prozradilo distraktor T jinde.)
4. **Nesmyslný distraktor je nápověda** („ve Wordu", „změříš to pravítkem").
5. Kontrolor se pouští **dvakrát**: opravy samy zanesly dva nové úniky.

**Hotovo z toho úkolu: 2 nejhorší bloky** (`skupenske-zmeny-vody-v-prirode`
a `posilani-zprav`, obojí 100 % → ~41–50 %). Při tom vyšla najevo **past, kterou je
potřeba znát: vysvětlení u otázky se žákovi ukáže JEN při ŠPATNÉ odpovědi**
(`Kviz.astro`) — kdo odpoví správně, nedozví se nic navíc. Podstatné podmínky
(„pod rosným bodem", „při teplotě pod 0 °C") proto **patří do odpovědi**, ne do
vysvětlení; zkracovat se smí jen to, co je opravdu vata. Nezávislý kontrolor při tom
našel i dvě starší vady: definice kyselých dešťů neodpovídala na položenou otázku
a otázka „Proč je mrak s více kapkami tmavší? → obsahuje víc vody" byla kruhová
(zopakovala zadání místo příčiny). Obojí opraveno. Výklad `posilani-zprav` doplněn
o vlastní zprávy a rozdíl „vyšli zprávu" × „vyšli zprávu a čekej" — tři otázky
zkoušely učivo, které na stránce vůbec nebylo.

**⚠️ ÚKOL NA DALŠÍ KOLA — délková nápověda ve starých kvízech.** Když jsem měřil
vlastní novou dávku, změřil jsem pro jistotu i zbytek webu: **u 64 % z 2085 otázek je
správná odpověď nejdelší** (náhoda je 33 %) — žák je uhodne bez znalosti látky. Míchání
pořadí to neřeší, míchá pořadí, ne délku. Kontrola je nově v `zkontroluj.mjs` (bod 6b):
neblokuje build, ale vypíše podíl a **jmenuje 5 nejhorších bloků**. Postup je dorovnávat
je po dávkách (4+ bloků na kolo): buď zkrátit správnou odpověď, nebo prodloužit
distraktory — a znovu spustit bránu. Nejhorší zbývající (brána je vypíše sama): `sestaveni-a-oziveni-robota` (10/10),
`senzory-robota` (10/10), `razeni-filtrovani-velka-data` (10/10),
`plan-projektu-a-ladeni` (10/10), `hardware-a-software` (11/11).

**Pozor — v `senzory-robota` (informatika 8) nejde jen o délky: blok má ČTYŘI
DUPLICITNÍ PÁRY.** Ptá se dvakrát na ultrazvuk („Jak měří vzdálenost?" × „Který senzor
odpoví, jak daleko je překážka?"), dvakrát na dotykový senzor, dvakrát na jízdu po čáře
a dvakrát na zastavení před zdí — z 10 otázek je 8 ve dvojicích. Chce to přepsat celý
blok podle výkladu (jen 3 senzory + podmínka + jízda po čáře), ne jen dorovnat délky.
Rozdělaná verze nikde není, začni od stávajícího bloku v `kvizy.ts`. **Před editací
načti text přes Read** — v datech jsou české uvozovky „ ", takže `old_string`
zkopírovaný z výstupu `grep` nesedí a Edit selže.

**Čeká na rozhodnutí učitele** (výklad, ne kvíz — nesahal jsem na to): kontrolor
upozornil, že u SketchUpu ve výkladu (`temata.ts`, podtéma `sketchup`) může být sporné
(a) zadávání rozměrů jako `100;50` — oddělovač závisí na jazyku prostředí, v anglickém
je čárka, a výklad sám říká, že prostředí je anglicky; (b) věta o ukládání přes Save —
webový SketchUp Free má i automatické ukládání. Otázky na obojí jsem z kvízu raději
vypustil. Ověřit u školní sestavy a případně upravit výklad.

## ⏩⏩⏩ KDE POKRAČOVAT (30. 7. 2026, 22:15 — deník)

**Na webu jsou roky 2019–2026 a POPIS MAJÍ VŠECHNA MÍSTA (156 ze 156).** Bod „dopsat
popisy" je tím uzavřený. Francouzština nasazená.

**1. Překlady dohání lokální automat sám** (hlídač à 1 h, `--jen-preklady`):
chybí 72× en, 83× de, 147× fr (čísla vyskočila tím, že přibylo 71 nových českých
popisů). Do toho nezasahovat — jen občas zkontrolovat, že hlídač běží.

**2. Čeká na učitele:** Omega **není v gitu** (nález auditu: skripty nemají historii,
nedá se nic vrátit). `pip-audit` hlásí 2 zranitelnosti v `torch` (oprava ve verzi 2.13.0).

**0. NEJDŘÍV SI PŘEČTI TOHLE (31. 7. 2026, 5:30 — po úklidu před /clear):**
Popis místa se zapisuje VÝHRADNĚ přes `zapis_popisy.py` a i ten teď drží zámek —
automat na popisy si soubor načte na začátku dávky a na konci zapíše celý, takže
ruční zápis mezitím **beze stopy zmizí**. Stalo se to dvakrát za jednu noc
(15 popisů z dat webu, pak 5 oprav včetně Loketu). Před buildem vždy `node
zkontroluj.mjs` — nově hlídá i data cest a právě tuhle ztrátu odhalil.

**3. Pečlivá videa běží — první video čeká na odklik.** `pecliva_videa.py` +
LaunchAgent `com.omega.pecliva-videa` zpracovávají stará videa PO JEDNOM se
samoopravnou smyčkou; až bude hotové, objeví se řádek v `KE-SCHVALENI.md`
a protokol vedle videa. Schválení: `venv/bin/python3 pecliva_videa.py --schvaleno`,
vrácení do smyčky: `--zamitnuto "co je špatně"`. Stav: `--stav`.

**4. Z auditů zbývá k dodělání** (nálezy jsou v odpovědi z 31. 7., nasazené opravy
v gitu): u deníku ještě chybí popisky ~170 míst na společné mapě `/cesty/vse`,
překlad názvů videí a stellplatzových údajů do en/de/fr, `hreflang` a canonical,
kontrast `--ztlumeny` a rozšíření `zkontroluj.mjs` o kontroly dat cest.
U školy: Pracovní činnosti mají 0 kvízů, 13 podtémat je bez kvízu, informatika má
poloviční kvízy (ø 12 proti 21) a 22 z 37 podtémat fyziky 8 nemá žádné médium.

### Co se opravilo 30. 7. večer (ať se to neopakuje)

- **Automat mazal ručně psané popisy.** `stare_cesty.py` skládá `.ts` z `popisy-mist.json`;
  popis zapsaný rovnou do `.ts` tedy při dalším běhu zmizel — takhle se ztratilo 15 popisů
  (našly se v gitu a jsou zpátky). **Popis se zapisuje VÝHRADNĚ přes `zapis_popisy.py`**,
  nikdy přímo do dat webu.
- **Francouzština se na web nedostávala.** `blok_popisu()` uměl jen cs/en/de, takže hotové
  francouzské překlady ležely ladem. Jazyky jsou nově v `JAZYKY_POPISU` — **při dalším
  jazyku doplnit i tam** (a v `popisy_mist.py` do `JAZYKY_PREKLADU`).
- **Kotva zamítala i správné články.** U velkých měst vznikla fotka na okraji, kilometry
  od bodu v článku (Praha, Brno, Gdaňsk zůstaly bez faktů). Nově `fakta_mist.py --zdroj
  SLUG JAZYK TITUL` — článek vybere člověk, v datech je to vidět jako `zdroj_rucne`.
  Automat si kotvu nevypíná nikdy.
- **Pozor na správný článek, ne jen správné jméno.** Olsztyn dostal fakta z článku
  o zaniklé správní jednotce („gromada“). GPS přitom seděla — kotva tohle nepozná.

**Postup psaní popisů** (kdyby přibyla nová místa):
```bash
cd ~/Desktop/Omega/skripty
venv/bin/python3 fakta_mist.py --vypis 12        # ověřená fakta k přečtení
# … popisy napsat do JSON {"slug": "text"} …
venv/bin/python3 zapis_popisy.py davka.json      # zapíše (síto zkontroluje)
venv/bin/python3 stare_cesty.py --ts vse --tise  # do dat webu → build → push
```
Popisy piš **čtivě, ne jako výčet údajů** (přání učitele 30. 7.: „byly to jen body,
uprav do čtivé formy"). Fakta ber JEN z `fakta-mist.json`; nic nepřidávej — nezávislý
kontrolor 30. 7. našel v 71 popisech 6 tvrzení bez opory ve zdroji (vč. „v podhůří
Šumavy" nebo UNESCO přiřazené k nesprávné části zdroje).

## ⏩⏩ STAV K 30. 7. 2026 VEČER — co je hotové z mapy dřívějších cest

Body 1–3, **5 i 6 HOTOVÉ**, bod 4 (popisy) běží jako automat. Navíc francouzština webu.

- ✅ **Roky 2019–2022 na webu** (bod 5) — 43 cest, 133 míst; `stare_cesty.py --ts vse`
  zapíše všechny roky naráz a sám udržuje rejstřík `roky.ts`. Výjezdy se číslují
  v rámci roku (dřív globálně: rok 2023 začínal „výjezdem č. 36“).
- ✅ **Ochrana ručně psaných roků** — `RUCNE_PSANE_ROKY = {2024, 2025, 2026}`.
  Učitel 30. 7. přidal do „Dřívějších dovolených“ fotky až po letošní Landshut
  a ptal se, „jestli se tam něco nepere“: automat ruční roky NIKDY nepřepíše
  (mají galerie, stellplatze, videa, reporty, které z fotek nevzniknou).
- ✅ **Hlídač nových fotek** (bod 6) — `hlidac_starych_fotek.py`, LaunchAgent
  `com.omega.stare-fotky-hlidac`, **doháněč** à 1 h: pozná nové fotky podle otisku
  složky, přepočítá cesty, udělá dávku popisů (12/běh), builduje a pushuje —
  ale commituje JEN `src/data/cesty`, aby nesebral rozdělanou práci učitele.
- 🔄 **Popisy míst** (bod 4) — `popisy_mist.py`: kotva = článek na Wikipedii, jehož
  JMÉNO i SOUŘADNICE sedí na místo; autor qwen3:30b-a3b, **nezávislý kontrolor
  gemma4:26b**. Hotovo 95 popisů ze 123 míst (6 nemá na Wikipedii zdroj),
  92 anglických překladů; němčina a francouzština se dopočítávají.
- ✅ **Francouzská verze deníku** (zadání 30. 7.) — `/cesty/fr/`, celé rozhraní,
  28 zemí, francouzský tvar data („6 juillet 2026“, „1er août 2022“), vlajky
  u přepínače jazyků (na úzkém telefonu jen vlajka). 11 popisů míst 2025/2026
  přeloženo ručně, u ostatních záskok češtinou.

**Poučení, která stála čas (ať se neopakují):**
1. Keš jmen míst má **verzi** (`KES_VERZE`) — po opravě pravidel pojmenování se
   jinak držel paskvil „Brémský Přístav“ dál, protože byl v keši.
2. Lokální modely: fáze **podle modelu, ne podle místa**. Střídání qwen↔gemma po
   každém kroku = 6 přehození modelu v RAM na místo (4 min/místo); po přeskupení
   trvá kontrola 95 popisů vteřiny. A qwen3 potřebuje `/no_think` v promptu —
   parametr `think:false` přes `/api/generate` nestačí.
3. **Kontrolor sám nestačí** — anglické „přemýšlení“ modelu propustil jako popis.
   Před kontrolora patří strojová pojistka (`je_cesky_popis`).
4. Wikipedie vrací **HTTP 429 s `Retry-After`** — respektovat, jinak místa
   zbytečně přicházejí o popis.

**Zbývá k rozhodnutí učiteli:** pár míst má z geokódování divné názvy
(„France métropolitaine“, „Küstengewässer…“, „Ujezd“) — jsou to body z moře nebo
z velkých území; buď je pojmenovat ručně, nebo z mapy vynechat.

## ⏩⏩ ZADÁNÍ UČITELE 30. 7. 2026 — MAPA DŘÍVĚJŠÍCH CEST (dělat jako první)

Učitel rozhodl o mapě starých cest (automat `Omega/skripty/stare_cesty.py`, 43 cest
2019–2023 vytěžených z fotek, pilotně nasazený rok 2023):

1. **Podoba mapy roku 2023 se učiteli LÍBÍ a MÁ ZŮSTAT** (30. 7. 2026, po zhlédnutí
   nasazené mapy: „tohle se mi líbí může zůstat"). Tedy: všechna místa jako kolečka,
   blízká obepnutá kroužkem s počtem, trasy se šipkami, modrý domeček s popiskem
   „jižní Čechy", pod mapou rozcestník s vlaječkami. **Nepřestavovat!**
   Rozdělení roku na jednotlivé cesty (víkend × prázdninová cesta) zůstává jako
   možné vylepšení, ale až na výslovné přání — dnešní dělení podle vzdálenosti stačí.
2. **Opakované návštěvy stejného místa se ZACHOVÁVAJÍ** (30. 7.: „opakovaně jsme jezdili
   na stejná místa jiný rok ale to chci zachovat"). Slučovat se smí JEN dva shluky téže
   cesty se stejným jménem (`slouc_stejnojmenna` v stare_cesty.py) — nikdy napříč
   cestami ani roky. Slugy míst musí zůstat unikátní (ověřeno: v roce 2023 jsou).
3. **Názvy míst: originál, ne strojový překlad.** 30. 7. se na webu objevil paskvil
   „Brémský Přístav" (Nominatim s `accept-language=cs` počeštil Bremerhaven). Opraveno:
   dotaz jde BEZ češtiny, jméno se protáhne slovníkem vžitých exonym (`EXONYMA`
   v body_z_fotek.py — Bremen→Brémy, Gdańsk→Gdaňsk…), zemi určuje KÓD státu
   (`ZEME_PODLE_KODU`), protože název země se vrací v místním jazyce („Deutschland").
4. **Popisy míst: VYROBIT** (ne nechat prázdné). U ~150 míst vyrábět z veřejných
   faktů o místě — nikdy si nevymýšlet, co tam učitel zažil.
5. **Roky 2019–2022 doplnit: ANO** (dalších 35 cest) — a stejně tak KAŽDÝ další rok,
   který učitel přidá („další roky co přidám taky ano").
6. **HLÍDAČ NOVÝCH FOTEK** (nové zadání): lokální model má při zapnutém počítači sám
   zjistit, že přibyly nové fotky, a začít dělat mapu bez vyzvání. Tedy LaunchAgent
   v režimu DOHÁNĚČ (hodinové buzení, práce při první příležitosti) nad
   `body_z_fotek.py` + `stare_cesty.py`; sleduje složku
   `Cestovatelský deník/Dřívější dovolené` (vizitky) a čekárnu.
   Souvisí: učitel chtěl automat i pro `zpracuj_rucni_vklad.py` (dosud se pouští ručně).

Zbývá z předchozího: 9 videí (.MOV) a 6 fotek bez EXIF, ze kterých se GPS zatím nečte
(u videí jde doprogramovat). Přehled všech 43 cest je v `Cestovatelský deník/KE-SCHVALENI.md`.

**Pozn.:** učitel psal část zadání do jiné session; tato (hlavní) ho převzala.
Práce druhé session je commitnutá (`1898a08`), nic se neztratilo.


## ⏩ KDE POKRAČOVAT (29. 7. 2026 večer — úkoly učitele k deníku: 1 a 2 HOTOVÉ, 3 běží)

1. ✅ **Mapa roku začíná doma** — data roku mají nový volitelný bod `domov`
   (`jižní Čechy`, x 344.9 / y 351.7, spočteno stejnou projekcí jako `trasa_uvod.py`).
   Kreslí se modrý domeček, trasa z něj vychází a započítá se do výřezu celkové mapy
   (2025 i 2026). Nasazeno, ověřeno na živém webu.
2. ✅ **U místa jen JEHO video** — mřížka „Videa z cesty" se při přiblížení na místo
   skryje (viditelná jen u celkové mapy); u karty místa je nově náhled jeho videa.
   Ověřeno v DOM: po kliknutí na Landshut mřížka skrytá, u každé viditelné karty 1 video.
3. ✅ **Fotogalerie u míst 2026** — kliknutí na náhled fotku zvětší přes celou obrazovku
   (šipky, klávesnice, Esc). Kontrola anonymizace všech 154 fotek 2026 doběhla (0 nálezů
   u 150, 4 fotky vyřazeny), nový automat `Omega/skripty/vyber_fotky_na_web.py` vybral
   **104 fotek ze 150** (série pozná z blízkého času + podobnosti popisu bge-m3, vyhrává
   nejostřejší dle variance Laplaciánu), učitel je schválil a jsou nahrané v R2;
   `galerie:` zapojeno u 6 míst 2026.

**Další věci hotové 29. 7. večer (zadání učitele během práce):**
- **Chamrousse u Livet-et-Gavet** — spaní u sjezdovek, olympijský sjezd mužů 1968 na trati
  Casserousse (zároveň 28. MS), stání Place des Niverolles (park4night 20 €/24 h).
  POZOR na past: složky fotek jsou pojmenované podle reverzního geokódování, ale GPS
  v EXIF ukazuje jinam — fotky „Vaulnaveys" i „Livet-et-Gavet" jsou obě z Chamrousse
  (1680–1800 m), učitel to vysvětlil: fotí se i cestou autem a na výletech.
- **Frangy** — přespání u vinaře 10 €/os., elektřina 6 €, voda 4 € (z vlastní návštěvy).
  Nové pole `overenoNaMiste` v typu `Stellplatz`: u vlastních cen se ukazuje hláška
  „platily při naší návštěvě, dnes mohou být jiné", u dohledaných „jen orientační".
- **Vlaječky v rozcestníku mapy** (položky nesou `zeme`, z toho `vlajky`).
- **Sloučeny dvě složky Geisingen** (25 fotek z `⁨Geisingen⁩, 8.7. 2026` s neviditelnými
  znaky do `Geisingen_DE`), cesty ve stavech obou automatů přepsány.

- **Automat na OPRAVY nálezů anonymizace** (`Omega/skripty/oprav_anonymizaci.py`) — učitel:
  „když to můžeš rozmazávat ve smyčce, můžeš to i opravovat". Z 5 nálezů: 1 opraven
  (SPZ Geisingen — citlivější kaskáda našla 2 značky), 3 uzavřeny jako PLANÝ POPLACH
  a 1 zůstal učiteli (čitelná SPZ na `Vaulnaveys 13-36-45`).
  **Poučení, které stojí za zapamatování:** vision model se u „zbytečného rozmazání"
  plete — rozostřené pozadí fotky mu splývá s rozmazáním od anonymizace, takže odpoví
  ANO i na fotku, kde se nerozmazalo vůbec nic. Proto o planém poplachu rozhoduje
  MĚŘENÍ, ne model: (a) liší se výsledek od originálu (< 0,5 = nic rozmazané),
  (b) podobnost tváře s referencemi a jak velkou část snímku zabírá (< 0,33 a < 2 %
  = cizí drobná postava, rozmazaná správně). Naměřeno: Schongau rozdíl 0,22;
  Vaulnaveys tváře 0,24 / 0,05 % a 0,16 / 0,62 %.
  **Past:** `cv2`/`insightface` jsou jen v `Omega/skripty/venv/bin/python3`.
- **Fotky na webu: 106** (104 schválených + 2, které byly planý poplach). Nahrávání
  jednou spadlo na chybu Cloudflare 520 uprostřed Livet-et-Gavet — doplněno dávkou
  jen chybějících fotek; po nahrávání VŽDY porovnat počty s výběrem.

**ČEKÁ NA UČITELE:** (a) fotka s čitelnou SPZ (`Vaulnaveys 13-36-45`) — VideoAutomat ji
mezitím uklidil, zůstala jen v `.pred-opravou/`, na web nešla; (b) jméno vinařství
ve Frangy (fotky ceníku jsou v knihovně Fotek, kam Claude nesmí — stačí export na Plochu);
(c) rozhodnutí, jestli pustit anonymizaci na 461 fotek v čekárně a doplnit na web místa
23.–28. 7. (Bourg-d'Oisans, Riez, Saint-Tropez, Le Lavandou…); (d) zvážit LaunchAgent
pro `zpracuj_rucni_vklad.py`.

Pak teprve pokračovat simulacemi z auditu (seznam níže).

**Nové 29. 7. večer — deník (zadání učitele během práce):**
- `Omega/skripty/body_z_fotek.py` — z „vizitkové" fotky (jedna fotka z dřívějšího výletu
  ve sdíleném albu) udělá bod na mapě: GPS + datum → poloha (projekce jako trasa_uvod.py),
  jméno místa z Nominatimu, návrh videa z kanálu podle názvu a roku → KE-SCHVALENI.md.
  Vizitku pozná podle ROKU (jiný rok než probíhající cesta). Otestováno: 5 bodů z čekárny,
  Col d'Ornon vyšel 272,7/398,1 shodně s ručním výpočtem.
- **Čekárna čeká 7 dní** (`CEKACI_DNY = 7` v pipeline_sdilene.py) od poslední fotky místa,
  ne 14, jak učitel předpokládal — plus KLID_HODIN. Fotky z 26.–28. 7. půjdou ~4. 8.
- **`zpracuj_rucni_vklad.py` NEBĚŽÍ SÁM** (není v LaunchAgentu) — 29. 7. tam leželo
  22 nezpracovaných videí z Bourg-d'Oisans (24. 7., den etapy Tour) a Le Lavandou;
  spuštěno ručně, roztříděno do fotky-puvodni. Zvážit hodinový LaunchAgent.
- **Tour de France 2026: tři etapy.** 17. a 18. 7. dvě etapy u Ballon d'Alsace
  (13. Dole–Belfort, 14. Mulhouse–Le Markstein se stoupáním na Ballon d'Alsace),
  24. 7. **Col d'Ornon** (19. etapa Gap–Alpe d'Huez) — přijeli den předem a spali
  na silnici; nové místo na webu. Zjištěno z GPS v EXIF fotek.
- **V čekárně čeká 461 fotek** z míst, o kterých web neví: Bourg-d'Oisans, Riez,
  Saint-Bonnet-en-Champsaur, Sainte-Maxime, Saint-Tropez, Gassin, Le Lavandou (23.–28. 7.).

_Starší sekce „KDE POKRAČOVAT“ jsou v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — nečtou se automaticky._


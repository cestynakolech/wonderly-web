# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩ KDE POKRAČOVAT (28. 7. 2026, kolo 43 hotové)

Hotovo 43 kol samostatného režimu (46 simulací na 48 stránkách, 356+ kvízových otázek).
Zásoba na měsíc: sekce „Kandidáti na simulace" níže (č. 1–5 hotové).
**DALŠÍ KOLO (44):** kandidát č. 6 — **F9 elektromagnet** (posuvník proudu a závitů →
kolik sponek udrží; vypnutí proudu = vše spadne).
**POZOR: kolo 45 = checkpoint revize dělby rolí Claude × lokální modely** (viz níže).
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

### 🧹 Úklid před smazáním kontextu (28. 7. 2026, 23:30)
Vše uložené a nasazené, repo čisté, poslední commit = zápis kol 29–33.
V nové session stačí: `/wonderly` + `/loop` → kolo 34 (vision prezentace F6).
Nové od minula: **vrátný povolení** `Omega/skripty/povoleni_hook.py` (konec odklikávání)
a pravidlo **ZADÁNÍ = SCHVÁLENÍ** — obojí popsané ve skillu `/wonderly` a `Omega/PRAVIDLA.md`.

## Fronta nápadů (seřazeno podle priority)

### Kandidáti na simulace (NOVÝ audit temata.ts, 28. 7. 2026 — kolo 38; zásoba na měsíc)

Z 64 fyzikálních podtémat bez interakce vybráno 12 s jevem, který jde ANIMOVAT či OVLÁDAT:
1. [x] **F7 treci-sila** — HOTOVO v kole 39 (TreniSimulace: led/dřevo/beton, hystereze
   klidové × smykové, vše celé N).
2. [x] **F7 archimeduv-zakon** — HOTOVO v kole 40 (ArchimedesSimulace: siloměr ve 3 fázích,
   4 materiály × 3 kapaliny, vše celé N).
3. [x] **F8 tepelna-vymena-a-teplo** — HOTOVO v kole 41 (KalorimetrSimulace: generátor úloh
   s celými výsledky, bilance odevzdané=přijaté teplo).
4. [x] **F8 pohybova-a-polohova-energie + zakon-zachovani** — HOTOVO v kole 42
   (SkateparkSimulace na obou stránkách: ideální rampa × se třením, teplo Q).
5. [x] **F9 elektromagneticka-indukce** — HOTOVO v kole 43 (IndukceSimulace: 4 závislosti
   z výkladu, voltmetr ±20 dílků, „magnet stojí = nic").
6. [ ] **F9 elektromagnet** — posuvník proudu a počtu závitů → kolik sponek udrží; vypnutí
   proudu = vše spadne (rozdíl od trvalého magnetu).
7. [ ] **F7 optika-rovinneho-zrcadla** — obraz za zrcadlem (souměrný, zdánlivý, stejně velký),
   posun předmětu, paprsky; uzavře optickou sadu (kulová zrcadla i čočky už jsou).
8. [ ] **F8 spalovaci-motory** — čtyřtakt: animace pístu po dobách (sání–stlačení–výbuch–výfuk),
   klik na dobu = popis; přepínač zážehový × vznětový.
9. [ ] **F9 polovodice-typu-n-a-p-dioda** — dioda: posuvník napětí ±, propustný × závěrný směr,
   LED svítí/nesvítí, V-A charakteristika.
10. [ ] **F7 atmosfericky-tlak** — tlak s výškou: posuvník 0–8000 m (po 1000), barometr,
    hodnoty zaokrouhlené na celé hPa dle tabulky z výkladu.
11. [ ] **F7 oko-vady-oka** — krátkozrakost/dalekozrakost: kam dopadá ohnisko, brýle
    (rozptylka/spojka) obraz vrátí na sítnici; naváže na CockaSimulace.
12. [ ] **F9 vedeni-proudu-v-kapalinach** — elektrolýza: ionty putují k elektrodám, posuvník
    napětí, pokovování předmětu.
Záměrně vynecháno: shrnutí/opakování, čistě výkladová témata (úvod do fyziky, zdroje energie,
vesmír má simulaci soustavy) a témata s hotovou příbuznou simulací.

### Další úkoly
- [ ] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [ ] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [ ] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
(zatím nic — nové typy akcí sem zapsat a pokračovat dalším úkolem)

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení
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

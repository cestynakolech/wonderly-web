# Metriky kol — podklad pro sebezlepšování

Jeden řádek = jedno kolo práce. Zapisuje se HNED na konci kola (jinak se to nestane).
Slouží k retrospektivě: kde se ztrácí čas a co se opakovaně zasekává.

Vysvětlení sloupců:
- **Tvar** — chain (sériově) / diamond (paralelní workeři) / router / cyklus
- **Pokusy** — kolikrát jsem musel něco opravovat, než to prošlo (1 = na první dobrou)
- **Build** — prošel `npm run build` na první pokus? ANO/NE
- **Zásek** — co zdrželo (prázdné = nic)

| Datum | Kolo | Co vzniklo | Tvar | Pokusy | Build 1. pokus | Zásek |
|---|---|---|---|---|---|---|
| 2026-07-27 | 28 | F6 difuze + Brownův pohyb (simulace, výklad, 4 kvízové otázky, média) | diamond (4 workeři) | 1 | ANO | zrnko pylu sedimentovalo na dno → opraveno při verify |
| 2026-07-29 | E1 (experiment subagenti) | F7 nakloněná rovina (výklad, simulace, 8 kvízových otázek, video) | diamond (pojmenovaní subagenti: průzkumník + A–D, kontrolor po merge) | 1 | ANO | 3× dotaz na povolení WebFetch/WebSearch v session 1 (chyba nastavení, opravena); worker-media proto nedoběhl, média ověřena curlem |
| 2026-07-29 | E2 (experiment subagenti) | F7 působení těles a deformace — simulace účinků síly (výklad+kvíz+videa už existovaly) | zúžený graf (průzkumník + jen worker B, kontrolor po merge, 2. kolo kontroly) | 2 | ANO | závažný nález kontrolora (levitace + věčná rotace) → přepracován pohybový model |
| 2026-07-29 | E3 (experiment subagenti) | 4 slabé kvízy Inf9 doplněny na 10–11 otázek (+18); k tomu deduplikace 2 sousedních bloků (−6 duplicit z dávek 70–72) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | kontrolor našel duplicity v sousedních blocích (mimo zadání) → opraveno hned |
| 2026-07-29 | E4 (experiment subagenti) | 4 slabé kvízy doplněny na 10–11 otázek (plán projektu, seznamy, hardware, posílání zpráv; +17 po vyřazení 2 překryvů) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | merge sám chytil mezipředmětový duplikát (broadcast otázka od workera plánu projektu); kontrolor pak 3 drobné překryvy → 1 smazán, 1 přeformulován, 1 ponechán |
| 2026-07-29 | E5 (experiment subagenti) | 4 slabé kvízy Inf7 doplněny na 10–11 otázek (modely, automaty, větvení, souřadnice; +13 po opravách) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | ZÁVAŽNÉ od kontrolora: otázka používala neexistující české názvy bloků Scratche („zvedni pero") — kontrolor ověřil proti oficiálnímu překladu scratch-l10n → opraveno na „pero vypni"/„smaž"; + 2 úniky odpovědí ve vysvětleních sousedních otázek (1 otázka smazána, 1 přestavěna na výpočet) |
| 2026-07-29 | E6 (experiment subagenti) | poslední 4 slabé kvízy Inf7 doplněny na 10–11 otázek (proměnné, soubory, sítě, zabezpečení; +13) | diamond (4× worker-kviz paralelně, kontrolor po merge) | 1 | ANO | merge sám chytil protiřečení nové a stávající otázky (program nereaguje: kabely × vynucené ukončení) → přeformulováno na myš/klávesnici; kontrolor: 2 ZÁVAŽNÉ („Vytvořit" místo „Vytvoř proměnnou" dle l10n; únik odpovědi .mp3) + 6 DROBNÉ (4 opraveny vč. doplnění výkladu o ovládání Scratche, 2 ponechány záměrně) |
| 2026-08-02 | S1 (samostatný režim) | informatika: posledních 6 hluchých stránek zavřeno výkladem principu (bludiště, ping-pong, skákačka, střílečka, výstupy robota, VEX IQ) → hluchých 21 → 15 | chain + 1 kontrolor na konci | 1 | ANO | **měřidlo názvů bloků bylo prakticky mrtvé** — vzor psaný `'dotýká se'`, čeština staví „se dotýká", takže hlásilo 0 nálezů a vadu neslo 5 stránek; kontrolor 18 nálezů, 3 vážné (ping-pong nešel dohrát — odraz od okraje odráží i ode dna) |
| 2026-08-02 | S2 (samostatný režim) | fyzika: skupenské změny (kondenzace, tuhnutí, koloběh vody) + základy F6 (úvod, tělesa a látky, opakování veličin) → hluchých 15 → 9 | chain + 1 kontrolor | 1 | ANO | kontrolor 13 nálezů; nejvážnější byla **moje vlastní chyba** („podchlazená voda zmrzne celá naráz" — uvolněné skupenské teplo děj zastaví, ztuhne ~1/16) |
| 2026-08-02 | S3 (samostatný režim) | fyzika: 9 stránek elektřiny (pole, práce a výkon, účinky proudu, chemické zdroje ×2, magnetické pole cívky, přeměny energie, obnovitelné zdroje, střídavý proud) → **hluchých 9 → 0, celá díra uzavřena** | chain + **2 kontroloři paralelně** (čísla × fyzika a didaktika) | 1 | ANO | oba kontroloři **nezávisle našli TENTÝŽ** nejvážnější nález: odpor člověka 150 kΩ při 230 V je o 2 řády mimo a výpočet z toho dělal uklidňující závěr. Celkem 22 oprav vč. pořadí kroků první pomoci |
| 2026-08-02 | S4 (samostatný režim) | audit kontrol: brána čte zapojení z dat · mapa „všechna místa" se konečně měří · slovník `DRUHY_MATERIALU` · nový mutační test simulací | chain, každá změna ověřena podvrhem | 1 | ANO | **měřidlo mapy málem zavedlo falešný poplach** („164 míst se ztratilo" — piny se kreslí všechny) a **mutační nástroj v první verzi sám lhal** (mutoval jen první výskyt → měřil vizuál, ne fyziku) |
| 2026-08-02 | S5 (samostatný režim) | posílení testů simulací podle mutačního testu: `elektrovani` 4/18 → 12/18, `odpor-vodice` 8/25 → 11/25; kontrol 244 → 273 | chain | 1 | ANO | v `OdporVodiceSimulace` byl vzorec rychlosti napsaný **dvakrát** — test ověřoval opis, ne kreslicí kód; u `tabulka-vzorce` se číslo nepohnulo (háček bere kurz jako parametr) → **nedodělek** |
| 2026-08-02 | A1 (audit) | **dlouhodobý audit** 3 nezávislými auditory (opakované vady × dodržování postupů × pravidla vs. kód) + první opatření: `testy/uniky.mjs` (duplicity a úniky odpovědí) zapojen do brány | **diamond (3 auditoři paralelně, různé otázky)** | 3 | ANO | první verze měřidla hlásila 13 duplicit a 264 úniků — **z toho drtivá většina falešných** (filtr slov ≥ 4 znaky zahazoval čísla, takže „při 0 °C" × „při 100 °C" vyšlo jako shoda 100 %); po zpřísnění 0 a 39 |
| 2026-08-02 | A2 (audit) | **měřidla mají obousměrný důkaz: 1 ze 6 → 6 ze 6.** Pěti měřidlům přibyl parametr dat nebo se logika vytáhla do funkce (proto u nich důkaz nikdy nevznikl); `testy/meridla-obousmerne.mjs` (24 kontrol) | chain, ověřeno 7 mutacemi | 1 | ANO | `kratke-vyklady.mjs` se spouštěl už při IMPORTU, takže test vypisoval celý přehled stránek |
| 2026-08-02 | A3 (audit) | rejstřík pravidel: opraveno **5 falešných ✅** · revize automatů dostala doháněč a eskalaci · oprava rozporu odpověď × vysvětlení u semaforu | chain | 2 | ANO | `--dohanec` se do plistu přidal za `zsh -c` místo dovnitř příkazu; strojová detekce „správná odpověď první" **nefunguje** (16 podezřelých = 16 falešných poplachů) → přiznáno jako 📄 |
| 2026-08-02 | B1 | informatika 7: **simulace větvení** „když… tak… jinak…" (`VetveniSimulace`) + test 45 kontrol; názornost informatiky 37 → 36 bez názornosti | chain + nezávislý kontrolor | 2 | ANO | **test hned našel vadu scény**: po otočení postava došla k levému kraji a zůstala tam stát (mrtvá scéna) → do programu přibyl skutečný český blok „když na okraji, odraz se". Druhá past: zápis interakce do `temata.ts` skončil uprostřed pole odkazů (hledal jsem první `},` za slugem) a shodil build |
| 2026-08-02 | B2 | informatika 7: **simulace opakování** (dokud / 10krát / stále) + test 39 kontrol; názornost informatiky 36 → 35 | chain + nezávislý kontrolor | 2 | ANO | test hned našel nesouměřitelnost: dráha byla na 40 průchodů, ale pojistka proti nekonečné smyčce se spouští po 30 — „opakuj dokud" by nikdy nedojelo |
| 2026-08-02 | B3 | **opravy podle dvou kontrolorů (13 + 11 nálezů, 9 vážných)**; `nazvy-bloku.mjs` nově čte i komponenty simulací; testy 318 → 371 kontrol | chain (2 kontroloři paralelně) | 4 | ANO | **obě simulace učily neexistující názvy bloků** („jdi 10 kroků" místo „dopředu o 10 kroků") a měřidlo je nechytilo, protože četlo jen výklady a kvízy. **První verze rozšíření podvrh taky nenašla** — na zdrojový kód pouštěla `text()`, který maže vše mezi „<" a „>". Odhaleno až otiskem souboru |
| 2026-08-02 | C1 | informatika 7: **simulace událostí a vstupů** (`UdalostiSimulace`, 100 kontrol) + opravy názvu bloku zprávy na 3 místech webu; názornost informatiky 35 → 34 | chain (2 kontroloři paralelně) | 3 | ANO | **oba vážné nálezy byly v TESTU, ne v simulaci**: test vůbec nečetl HTML šablonu (komponenta bez tlačítek a bez scény jím prošla jako zdravá) a hlavní pointu ověřoval jen čistou funkcí, ne cestou přes ovládací prvky — podvrh „přepínač vrátí míč na start" prošel. Mutační test navíc odhalil, že jsem konstanty (krok 10, skok 20) četl z testovaného kódu → tvrzení byla opisem vlastního kódu; nově se čtou z textu bloku, který má žák na obrazovce. Kontrolor obsahu se **spletl v opačném směru** (tvrdil, že paleta má „po přijetí zprávy") — ověření v scratch-l10n ukázalo pravý opak, a tím odhalilo skutečnou vadu na TŘECH jiných místech webu |
| 2026-08-02 | C2 | **celková oprava kontroly šablon**: místo hádání vzorem se skript SPOUŠTÍ nad DOMem ze šablony (5101 měřených vyhledání místo 675, pokrytí 99,4 %) | chain (2 kontroloři po sobě) | 4 | ANO | **Učitel oprávněně vytkl, že se pořád něco opravuje a zůstává to neopravené.** Příčina: měřidlo hádalo regexem, takže každá oprava byla jen další záplata. Teprve změna principu to uzavřela. Kontrolor pak našel druhou vrstvu — měřil se jen kód doběhlý při načtení, obsluha tlačítek ne (32 slepých vyhledání). **Vlastní chyba: podvrh jsem vracel `git checkout` nad NECOMMITNUTÝM přepisem a zahodil tím celou práci** — brána pak běžela zase na staré verzi a vypadala slepě. |
| 2026-08-02 | C3 | informatika 7: **simulace vlastních bloků s parametry** (61 kontrol); názornost informatiky 34 → 33 | chain + nezávislý kontrolor | 3 | ANO | **Vlastní test měl tutéž vadu jako minule: nečetl scénu.** Podvrh kontrolora „kresli vždy správný úhel" prošel všemi 45 kontrolami, ačkoli hláška tvrdila opak toho, co bylo vidět. A **podruhé týž vlastní omyl**: opravy podle kontrolora jsem zahodil `git checkout` nad necommitnutou prací. Nové pravidlo: po dávce oprav commit HNED, teprve pak podvrhy. |
| 2026-08-03 | D1 | informatika 8 a 9: **4 nové simulace naráz** — klonování ve Scratchi (Inf9), vstupy micro:bitu, rádio micro:bitu (Inf8), první program ve VEXcode (Inf8); názornost informatiky 30 → 26 | diamond (4× worker-simulace paralelně, kontrolor po merge) | 2 | ANO | **Brána, build i vygenerované HTML byly zelené, a přesto kontrolor našel 16 vad, z toho 7 závažných.** Vzorec je pořád tentýž: měřidlo hlídá jen tvary, které zná. `testy/nazvy-bloku.mjs` hlásil 0 nálezů, ale nemá vzor pro `pokud ⟨⟩ tak` (česky je `když ⟨⟩ tak`) ani pro `nastav x na (náhodnou hodnotu)` — a pro MakeCode a VEXcode nemá vzor **žádný**, takže tři ze čtyř simulací měly názvy bloků nekontrolované. Kontrolor to našel jen proto, že si stáhl skutečné zdroje (`scratch-l10n/cs.json`, `pxt-microbit/libs/core/icons.ts`): micro:bit nemá ikonu vykřičníku ani šipky (`showArrow` je jiný blok), VEXcode IQ nezná cm (jen mm/palce). Druhý vzorec: **simulace si protiřečila s výkladem na téže stránce** (tvrdý dosah 25 m proti „přes zdi signál slábne"; české bloky proti „prostředí je anglicky") — worker výklad četl, ale rozpor nikdo neměřil. Třetí: `mg = úhel × 10` místo `1000·sin(úhel)` — chyba až 35 %, obhájená jen v komentáři, který žák nevidí. |
| 2026-08-04 | D2 | **druhá kontrola D1 dokončena (16/16 zavřeno, +5 nových vad opraveno: „silný signál 0 %", cizí vysvětlení u skupin rádia, 10× délková nápověda, otazník v bloku, „nad mezí") + nezávislý audit celého projektu** (`AUDIT-2026-08-04.md`) a první opatření: rohatka obousměrných důkazů rozšířena na `testy/simulace/` (dluh 14), výjimka pro „hook po Write" v definici workera, pravidlo commit=jedno téma, čísla v PROGRESS.md se už neopisují | diamond (kontrolor ∥ auditor, oba čerstvý kontext) | 1 | ANO | **kontrolor druhého běhu potvrdil opravy jen díky spustitelným harnessům** — všech 16 verdiktů doložil spuštěním, ne čtením; harnessy zůstaly ve scratchpadu a posloužily i k ověření nových oprav. Audit našel vzorec „opatření platí jen na část vstupů" přímo ve vynucovacím mechanismu (rohatka neviděla 16 z 23 měřidel, 2 záznamy registru byly mrtvé) a dvě tiše umřelá metapravidla (metriky kol 29–72 chybí; checkpoint à 10 kol zamrzl přečíslováním — vázat na datum) |
| 2026-08-04 | D3 | informatika 8: **4 nové simulace naráz** — sestavení a oživení robota, motory/displej/zvuk, projekt Můj robot (VEX IQ), hra ping-pong (Scratch); názornost 60 → 56 podtémat bez názornosti (informatika 26 → 22) | diamond (4× worker-simulace ∥, kontrolor po merge, opravy zpět původním workerům) | 2 | ANO | brána chytila 1 vadu před buildem (id s diakritikou `pr-robot-tělo` — měřidlo čte id jen do prvního ne-ASCII znaku). Kontrolor: **12 nálezů, 2 závažné, oba = rozpor simulace × výklad × kvíz na téže stránce** (prohozené kabely: simulace „točí se" × výklad+fyzika „couvá", ω=0; kvíz učil podmínku `y < −175`, kterou výklad výslovně vyvrací). Vzorec z D1 se potvrdil potřetí — rozpor s výkladem pořád nikdo neměří. Opravy: 3 workeři vzbuzeni napoprvé, 1 spadl uprostřed přepisu (přerušené spojení) a po dobuzení dokončil; kvízy (sdílený soubor) hlavní model. NOVÉ PRAVIDLO učitele: orchestrátor práci nepřebírá (1× retry buzení → nový worker téhož typu); nasazení automaticky bez pokynu. Dřívější 401 při buzení = prošlý token, přechodné, worker mezitím jen spí. Druhá kontrola oprav → příští kolo |
| 2026-08-04 | D4 | **druhá kontrola D3: 12 zavřeno / 2 otevřeno / 4 nové (1 závažná)** — vše opraveno a nasazeno (`d4919a8`, curl potvrzen). Závažná: míček se i se zapnutou podmínkou uměl protáhnout pod pálku (5,4 % odrazů mířilo zpět dolů) → pojistka `odrazOdPalky`, ověřeno 7339 vstupů / 0 dolů. Dále: obrys robota vyjížděl z arény (oprava: posun rozpojen od natočení), špička v překážce (srážka ke špičce), blok „dopředu o 10 kroků" × skutečné 6/9/12 (rychlosti 50/100/150 → 5/10/15, výchozí 10), kvízy: ovládání pálky ukotveno k výkladu + 4 dorovnané délky | cyklus (kontrolor → opravy původními workery ∥, kvízy hlavní model) | 2 | ANO | **harness bez verdiktu mate**: číslo „5,4 % dolů" měřilo mechanismus PŘED pojistkou — bez řádku ZAVŘENO/OTEVŘENO vypadalo jako trvající vada; rozhodl až přímý běh funkce nad aktuálním souborem. A **status a obsah z CDN se musí brát z TÉHOŽ stažení** — dva samostatné curl na rozjíždějící se CDN daly „404, ale nález 1" |
| 2026-08-04 | D5 | informatika: **4 nové simulace naráz** — honička (Inf7), střílečka + skákačka (Inf8, hry ve Scratchi), řazení a filtrování (Inf8, hromadné zpracování dat); názornost 60 → 52 (informatika 26 → 18); nasazeno `8c72b6b`, brána 0 chyb, build 465, všechny 4 stránky mají simulaci v dist | diamond (4× worker-simulace ∥) | 1 | ANO | **kontrola nedoběhla** — kontrolor umřel na session limitu; nový kontrolor s čerstvým kontextem spuštěn v kole D6, verdikty → příští řádek. Poučení: dlouhá session s obřím kontextem prodražuje každý tah → /clear po ~2–3 kolech |
| 2026-08-04 | D6 | deník (zadání učitele): video **KOLODĚJE** nasazeno — pečlivá anonymizace (0 nálezů) + předřazená úvodní mapa 6 s (domov → Koloděje nad Lužnicí, 70 km, nafta 336 Kč) + titulek místa (PNG overlay, ffmpeg bez drawtext); místo ověřeno ze snímků videa (zámek). Nahráno `CtELqPCIf1k`, horší verze `FKGHCv_YK84` → soukromá, web přepárován (`269ba43`), curl na živé 2021 potvrdil | chain (pipeline deníku) + ∥ kontrolor simulací D5 na pozadí | 1 | ANO | mapa i titulek vizuálně ověřeny (3 snímky, konec neuříznut); commit jen `2021.ts` — rozdělané tour.astro/worker.js nepřibaleny (pravidlo „commit = jedno téma") |
| 2026-08-04 | D7 | **kontrola D5 uzavřena: 9 nálezů / 5 závažných, vše opraveno a nasazeno** (`dc7c322`, curl potvrzen). Skákačka past+zaboření (worker 2 kola), řazení celé průměry (6 kombinací), střílečka kvíz×výklad, honička čas+čárka, sestavení texty, 13 délkových nápověd → 0 (rohatka 756/36 %). K tomu zadání učitele: **Hermes zapojen** (fronta Omega/HERMES-UKOLY.md) + rozjeta dávka popisů 31 prezentací lokálním vision modelem | diamond (kontrolor → 4 workeři ∥ + sdílené soubory hlavní model) | 2 | ANO | **kotva vyvrátila falešnou regresi**: harness hlásil FAIL, ale starý commit se choval identicky (git show + týž harness) — FAILy byly artefakt pořadí testů a záměny událostí; bez porovnání se starým kódem by se „opravovalo" zdravé. A pokyn učitele: při docházejících tokenech orchestrátor řeší chyby a nastavení, mechaniku přebírá Hermes/automaty |
| 2026-08-05 | D8 | **měřidlo názvů bloků rozšířeno o MakeCode a VEXcode** (audit 4b/1; zdroj pravdy = oficiální překlady makecode.com; obousměrně 54 → 60 kontrol) — první běh našel **4 živé vady** (ukaž/odešli řetězec, 2× „pauza ms“), opraveno a nasazeno; **úklid disku dle schválení učitele** (−2,4 GB + trvalá politika v obou nahrávačích); Hermes fronta zavedena jako živý soubor | chain (nastavení a měřidla dělá orchestrátor) | 1 | ANO | vzorec potřetí potvrzen: „pravidlo jen v poznámce nefunguje“ — jakmile se z pokynu stalo měřidlo, našlo vady první běh. Slovesa v jedné paletě se liší blok od bloku (zobraz číslo × ukaž ikonu) — bez staženého slovníku by je nikdo neuhádl |

> **Poučení z kol S1–S5 (2. 8. 2026), stojí za retrospektivu:** ve všech pěti kolech byla
> nejdražší vada **v měřidle, ne v obsahu**. Třikrát za noc se ukázalo měřidlo, které
> svítilo zeleně a přitom neměřilo nic (mrtvý vzor kvůli slovosledu · mutace na náhodném
> místě · test nad opisem vzorce) a dvakrát měřidlo, které chtělo hlásit chybu tam, kde
> žádná nebyla. **Nové měřidlo se proto smí zapsat jako hotové teprve po obousměrném
> ověření podvrhem** — a když se jeho číslo po skutečném zlepšení nepohne, měří něco
> jiného, než si autor myslí.

> **Poučení z kol A1–A3 (dlouhodobý audit 2. 8. 2026):** audit potvrdil, že poučení
> z S1–S5 nebylo náhoda jedné noci — **týž vzorec je doložen dvaceti výskyty ve čtyřech
> dnech**. Obsah se přitom měřitelně zlepšuje (hluché stránky 36 → 0, uhodnutelnost
> kvízů 77 % → 38 %), takže se v kruhu netočí PRÁCE, ale její NÁSTROJE. Rozdíl proti
> dřívějším opravám: pravidlo „ověř obousměrně" už není text, ale rejstřík, který
> **shodí build**, když se nasadí měřidlo bez důkazu. A audit rovnou předvedl, proč je
> to potřeba — všechna tři měřidla, která jsem během něj napsal, byla v první verzi
> vadná a odhalily je až podvrhy a mutace, ne pohled na výsledek.
>
> **Druhý nález auditu: diamant se ze samostatného režimu vytratil.** Kola S1–S5 jsou
> všechna „chain", ačkoli se v nich dělaly dávky 5–9 **nezávislých** stránek — to je
> učebnicový vějíř. Paralelní byla jen kontrola. Kolo A1 proto vějíř použilo (3 auditoři
> naráz) a vyplatilo se: každý auditor našel jiný druh vady a shodli se jen na jednom —
> tím je ten nález nejsilnější.
>
> **Poučení z kol B1–B3 (2. 8. 2026):** nezávislý kontrolor se vyplatil dvojnásob —
> našel **24 vad ve dvou simulacích, které prošly vlastními 83 kontrolami a buildem**.
> Nejcennější nález nebyl v simulaci, ale v MĚŘIDLE: kontrola názvů bloků četla jen
> výklady a kvízy, takže simulace mohly beztrestně učit názvy, které v české paletě
> Scratche neexistují. To je potřetí za dva dny týž vzorec — „opatření tiše platí jen
> na část případů". A když jsem měřidlo rozšířil, **první verze podvrh nenašla taky**;
> poznal to až otisk souboru, ne hláška. Praktické pravidlo do příště: měřidlo psané
> pro HTML se nesmí pustit na zdrojový kód — `text()` maže vše mezi „<" a „>", a v JS
> podmínce (`i < 80`) tím spolkne celé řádky.

### Kontrolor v kole E1 (nakloněná rovina)

Nálezy po merge: **0 ZÁVAŽNÉ, 2 DROBNÉ** — (1) posuvník výšky pouštěl sklon až 53°
(spíš stěna než rampa) → omezeno na h ≤ ⅔·l (max ~42°); (2) bedna na konci animace
přečnívala 16 px za vrchol roviny → dráha zkrácena. Obojí opraveno a nasazeno.
Hlavní model navíc při merge chytil porušení pravidla celých čísel (tíha po 100 N
dávala u l = 3 necelé síly) → posuvník G změněn na 300/600/900 N; ověřeno výpočtem
pro všechny kombinace posuvníků. Wordwall od workera D NEpřidán — obsahuje ozubené
kolo, které se v podtématu neučí (pravidlo kontroly pokrytí).

### Kontrolor v kole E2 (účinky síly) — dvě kola kontroly

1. kolo: **1 ZÁVAŽNÉ** (těleso levitovalo 15 px nad podlahou a hranaté těleso se
věčně točilo jako kolo) + 3 DROBNÉ (skok zpět při přechodu do deformace; statický
posun vs. animovaná rotace = dva modely; duplicity kvízových otázek se staršími
kvízy učitele). Pohybový model přepracován: těleso sedí na podlaze, síla mimo
těžiště ho PŘEKLÁPÍ přes spodní roh (max 90°), síla v těžišti ho plynule POSOUVÁ
(zastaví na kraji), při deformaci zůstává, kam dojelo.
2. kolo (tentýž kontrolor ověřil opravy): OPRAVENO ANO × 3, nově 4 DROBNÉ —
3 opraveny (šipka sleduje překlápěné těleso; hlášení reaguje na dojetí/překlopení;
přepnutí bodu působení neresetuje zdeformované těleso), 1 ponechán ZÁMĚRNĚ
(vynulování náklonu při vstupu do deformace — zachování náklonu by vrátilo
levitaci; zdůvodnění v komentáři kódu).

**ČEKÁ NA UČITELE:** duplicity otázek mezi kvízy `pusobeni-teles-a-deformace`
a `sily-kolem-nas/sila` (pružina, modelína, interakce, působení na dálku) —
oba kvízy jsou starší obsah učitele, potichu se nemazalo.

### Nezávislý kontrolor (poprvé nasazen v kole 28) — velmi se vyplatil

Pátý worker dostal hotový výsledek a zadání „hledej chyby", BEZ informace, co bylo zamýšleno.
Našel 11 nálezů, z toho **4 opraveny hned** (posuvník teploty pokus nerestartoval → naměřený
čas patřil jiné teplotě; rozsah 0–100 °C na mezích varu a tuhnutí → 5–95 °C; osminásobné
zveličení rychlosti částic nebylo přiznané; dva tipovatelné rozptylovače v kvízu)
a **6 nálezů míří do PŮVODNÍHO výkladu učitele** (žralok jako příklad difuze, příliš široká
definice Brownova pohybu, nesmáčivost vysvětlená odpudivými silami, stlačení nafouknutého
míče jako příklad odpudivých sil, pyl „na hladině" místo „ve vodě", elektronový vs.
tunelový mikroskop) — ty se NEOPRAVUJÍ potichu, čekají na rozhodnutí učitele.

ZÁVĚR: kontrolor našel víc než já sám i než build. Kdo práci vyrobil, hodnotí ji mírně.
Nasazovat u každého nového učiva — je to nejlevnější krok s největším dopadem na kvalitu.

### Poznatky z prvního diamondu (28. kolo)

- **Workeři běželi 45 s – 11 min současně** (média 45 s, kvíz 1,5 min, výklad 2,5 min, kód 11 min).
  Sériově by to bylo součtem, tedy ~16 minut místo 11 → **úspora asi třetina**, a hlavně jsem
  mezitím mohl zapisovat výklad a kvíz.
- **Workeři o sobě navzájem nevědí.** Výklad přidal nové učivo (difuze je v plynech rychlejší
  než v kapalinách), ale kvízový worker o tom nemohl vědět → otázka na to chyběla, dopsal jsem ji
  v merge kroku. ZÁVĚR: merge musí vždy zkontrolovat, že kvíz pokrývá i nově přidané učivo.
- **Duplicity:** kvízový worker navrhl 6 otázek, 2 se překrývaly s existujícími → použity 4.
  Do zadání pro worker C příště dát: „nejdřív vypiš existující otázky, pak navrhni jen nepokryté".
- **Verify se vyplatil:** build prošel na první pokus, ale vizuální kontrola odhalila, že se zrnko
  pylu propadalo na dno (Brownův pohyb pak nebyl vidět). Bez screenshotu by to na web šlo špatně.
- **Zákazy fungovaly:** žádný worker nespustil build, git, ffmpeg ani Ollamu; nikdo nepsal do
  `temata.ts`/`kvizy.ts`, takže nedošlo k přepsání změn.

## Plán vyhodnocení

- **Rychlá kontrola každé 10. kolo** — projít posledních 10 řádků, najít nejčastější zásek,
  přidat proti němu JEDNO pravidlo do skillu. Režie max 5 minut.
- **Velká retrospektiva 24. 8. 2026** (před školním rokem) — dost dat na porovnání
  „sériově × diamond": kolik kol, kolik simulací, kde se ztrácel čas, co zrychlit dál.

## Co porovnáváme

1. Kol za den (dřív sériově vs. teď s workery).
2. Podíl kol, kde build prošel na první pokus.
3. Počet odložených úkolů („zaseklo se").
4. Kolik kol skončilo bez zásahu učitele (cíl: co nejvíc).
5. **Podíl přijaté práce** — kolik z toho, co workeři vyrobili, se opravdu použilo
   (kolo 28: kvíz 4 ze 6 = 67 %, výklad 100 %, simulace 100 % po 1 opravě).
   Když podíl spadne pod 50 %, paralelní workeři se přestávají vyplácet — kontrola
   a přepisování sežerou víc, než se ušetřilo. Tohle je hlavní číslo retrospektivy.

## Co NEpřebírat z článků o „loops" (rozhodnuto 27. 7.)

- **Cizí služby typu Mira/Telegram** — placené nadstavby, které náš projekt nepotřebuje;
  automaty deníku (LaunchAgenty) už dělají totéž a zdarma.
- **Desítky agentů naráz** — RAM Macu i cena; strop zůstává 4 workeři.
- **Cron/plán pro kola webu** — obsah pro děti chce dohled učitele; automatizované jsou
  jen technické úlohy (fotky, videa, nahrávání), ne tvorba učiva.
- Naopak PŘEVZATO: tvrdá brána před buildem (`zkontroluj.mjs`) a oddělení
  autora od kontrolora (pátý worker po merge) — obojí zapsáno ve skillu `/simulace`.

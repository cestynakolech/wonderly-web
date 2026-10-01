> **29. 9. 2026, 06:30 — fronta opět běží:** `cz.wonderly.nocni-fronta` obnovena a spuštěna s `--vynechat animace podkasty`. Pozastavena je jen dosud nepředělaná obrazová výroba, nikoli ostatní úlohy. Běžná výjimka jedné kategorie se zaznamená a další pokračuje. Ostrý běh `vata_navrhy.py` s lokální Gemma4:26b v 06:31 uložil nový návrh; není tím schválen ani publikován. Samostatné služby kanárek a dodělávání animací zůstávají nenačtené. Starší zápis o vypnutí celé noční fronty níže je překonaný.

> **28. 9. 2026 — aktuální stav po zásahu učitele:** výrobní služby `nocni-fronta`, `dodelej-animace` a `kanarek` jsou od 22:39 pozastavené, protože vznikaly díly s jediným pohyblivým klipem a zbytkem statickým. Obnovit až po předělání a ověření plných animovaných scén. Staré pravidlo „alespoň jedna animace“ bylo odstraněno; platí OBSAH-PRAVIDLA.md a Omega/dokumenty/NAVOD-ANIMACE-PODKASTU.md. Pět dnešních videí ještě čeká na předělání. ThinkingCap 3.8 je nainstalovaný a otestovaný (90 kontrol); výchozí MLX ponechán, protože jediný bod navíc není stabilní a nový model je 2–2,9× pomalejší. Podrobnosti: Omega/dokumenty/thinkingcap-38-test-2026-09-28/STAV.md. Učitel schválil samostatné pokračování. Opraven také starý obrazový postup v NAVOD-POLEMIKY-F6.md a ve skillu podkast-video. Následující zápis o obnovení všech osmi automatů je již historický.

> **28. 9. 2026, 22:14 — automaty obnoveny:** učitel výslovně schválil všech osm dříve pozastavených služeb. Všechny jsou načtené; noční fronta zahájila animace. Kanárek byl kvůli pozdnímu startu přeskočen (neověřeno). Důkazy a rozsah: `Omega/dokumenty/OBNOVENI-AUTOMATU-2026-09-28.md`. Níže uvedené pozastavení z27. 9. je historické.

## ⚡ ČÍM ZAČÍT — 27. 9. 2026

- **1. 10. 2026 — STAV TÉMATU 4 (vlna 1–2 nasazena):** commit 1cb56ef, živě 7/7: F9 Elektrická energie, F7 Pascalův zákon, Hydrostatický tlak, Tlak (text f7-tlak-b), F8 Teplo a přeměny skupenství, Tání, Tuhnutí (výklad, 48 obrázků, 7 kvízů po 21; 2 kola kontroly Claude + Codex). CI build spadl, nasazeno `wrangler deploy` zálohou (řeší se: `Omega/predavka/2026-10-01/prace/ci-selhani.md`). **Zbývá k tématu 4:** simulace Tlaku (návrh klíč simulace v `Omega/predavka/2026-10-01/prace/tema4/f7-tlak-b.json`); F9 Účinky proudu a bezpečnost (čeká na učitele, práh 2–5 vs 1–8 mA); vlna 3 texty F8 Vypařování, Var, Kondenzace, Skupenské změny vody v přírodě (píše Codex); média (písnička Suno, bonus NotebookLM, polemika s animacemi) dle OBSAH-PRAVIDLA §6.
- **Mobil:** dávka 1 (8 simulací) nasazena 8537ea4, měřidlo varianta A (`testy/mobil-citelnost.mjs`, ve všech stavech); zbylých ~121 simulací dělá Codex (větev `codex/mobil`), Claude kontroluje vzorkem a nasazuje.
- **Codex:** rozdělení `Omega/koordinace/ROZDELENI.md`, kontext `CODEX-KONTEXT-WEBU.md`; Jev — souhlas učitele 30. 9. s podmínkou; mini GPU funkční. **Noční fronta:** animace + podkasty zapnuty 30. 9.

- **30. 9. 2026 noc — stav tématu 3:** NASAZENO commit 243c34e (wrangler da90146a): F7 Páky, F7 Kladka, F8 Spalovací motory, F9 Polovodiče (vlastní vodivost). Předtím 25e6b93 vlna 1 + 6f4834c video Elektromagnet 1. `publikuj_odkazy.py` regex opraven s testem (Omega b340aab).
- **ROZPRACOVÁNO (podklady v `Omega/predavka/2026-09-30/prace/2026-09-30-tema3/`):** F9 Kapaliny, F8 Alternativní motory, F9 Plyny — text zkontrolován+opraven, kvíz zkontrolován+opraven (bloky/*.ts), obrázky obrazky5/6/7 v opravách; čeká vložení (vloz-t3d), kontrola webu, nasazení. Opravené simulace KladkaSimulace a PolovodicVodivostSimulace (+ testy `testy/simulace/kladka.mjs`, `polovodic-vodivost.mjs`) čekají na commit + záznamy v `testy/obousmerne.json`. Nová simulace TezisteStabilitaSimulace.astro (přání učitele: náklaďák vs. formule s olovnicí) v opravách po kontrole; čeká napojení (interakce2) + věta do výkladu Těžiště + obousmerne.json. F9 Dioda (N/P) — text se píše.
- **Jednotná legenda obrázků tématu elektrický proud v látkách:** elektron malý modrý „−“, díra zelený čárkovaný „+“, kation velký červený „+“, anion velký fialový „−“.
- Drobné nálezy kontroly webu t3c (`protokoly/kontrola-web-t3c.md` nálezy 2–9) čekají na zapisovatele.
- **30. 9. večer: /clear — pokračuj podle /Users/radek_soukromy/Desktop/Omega/predavka/2026-09-30-vecer/PRIKAZ-NOVA-SESSION.md**
- (stav tématu 3, rozpracované nasazení vlny 1 a postup jsou v tomto příkazu)
- **30. 9. 2026 večer nasazeno téma 3 vlna 1** (commit 25e6b93: F7 Deformace, F8 Parní stroj, F9 Přenos el. energie, Chemické zdroje + drobné opravy tématu 2 + brány úniků/čísel; build 490): push po ~4 min nenasadil → `npx wrangler deploy` (verze d46c8270); curl OK „Jednoduše řečeno“ + „Spustit kvíz“ na všech 4 stránkách. **Video EM1** (elektromagnet-dialog1.mp4) v R2 + odkaz v temata.ts (commit 6f4834c, wrangler deploy 597fe7ad); stránka /skola2/fyzika/9-rocnik/magneticke-pole/elektromagnet/ obsahuje mp4, /media/… vrací 200. POZOR: `publikuj_odkazy.py` (`nove_odkazy_na_video`, ř. 95) hledá jen `cesta: '…'`, JSON tvar `"cesta":"…"` v `materialy` nechytí → „nic nedělám“; commit/build/push šel ručně (opravit regex). Odloženo z kontrol: `/tmp/wonderly-workery/2026-09-30-tema3/kontrola-web-k3.md` drobné 3–5 odpadly/ne.
- **30. 9. 2026 nasazeno F7 Těžiště + F8 Tepelná výměna (úvod, výklad, zápis, 11 obrázků, kvízy) + drobné opravy kvízů** (commit 5a57562, build 490 stránek; nasazení šlo automaticky přes push, NE přes wrangler; curl OK „Jednoduše řečeno“ + „Spustit kvíz“ na obou stránkách až po ~9 min). **Téma 2 (7–9) na webu kompletní — všech 15 podtémat.** Dřívější commit 17c3632 (F8 Energetická hodnota potravin) je tímto také nasazen.
- **Cloudflare Workers Builds tiše selhává (build fe4acde1…, 17c3632) — zjistit příčinu v dashboardu; do té doby po každém pushi curl a případně `npx wrangler deploy`.**
- **30. 9. 2026 nasazeno F9 Transformátor (úvod, výklad, zápis, 14 obrázků, kvíz) + obrázek zákona zachování + drobné opravy tématu 2** (commit 2010d2b, build 490 stránek, curl na živém webu OK: „Spustit kvíz“, „Jednoduše řečeno“, obr-01 zákona zachování, transformator-obr-01.svg 200).
- **30. 9. 2026 nasazeno téma 2 (7–9)** — F7 Síla, Gravitační síla, Třecí síla, Skládání sil; F8 Energie a její přeměny, Pohybová a polohová, Vnitřní energie, Zákon zachování mechanické energie; F9 Motor, Indukce, Alternátor, Vlastnosti stř. proudu (commit e52fcec, 83 souborů, 80 nových SVG, build 490 stránek, curl 12× OK + obrázky 200).

- **30. 9. 2026 nasazeno F8 Účinnost** (commit 2511152, build 490 stránek, curl na živém webu OK: kvíz, „pé nula“, obrázek 200, CSS „posuň obrázek do strany“). **Téma 1 (7–9) na webu kompletní: všechna podtémata v pilotní podobě** (F7 klid, rychlost, příklady; F8 práce, výkon, účinnost; F9 magnety, pole vodiče, elektromagnet, indukce — ta hotová už dřív, 40c5e17).
- **30. 9. 2026 nasazeno téma 1b** — F7 Příklady na výpočet rychlosti (+ laborka Ozobot), F9 Pole vodiče a cívky, F9 Elektromagnet (commit d7d38ab, build 490 stránek, curl na živém webu OK).
- **30. 9. 2026 nasazeno téma 1** — F7 Rychlost, F8 Mechanická práce, F9 Magnety + kvízy 5 bloků přepracované bez úniků (commit 582c18b). Pilot F7 Klid/F8 Výkon byl nasazen už dřív (86d6b33).

📌 Pořadí (učitel 29. 9. 2026): téma po tématu napříč 7./8./9. ročníkem — 1. téma všech tří kompletně (úvod, výklad, zápis, obrázky, kvíz, písnička, video), pak 2. téma…; 6. ročník až po nich.

✅ VATA-ZÁPIS (27. 9. 2026, opraveno): testy/nastroje/vata-zapis-navrhy.mjs
přepsán — cílí přes qIndex+distraktorIndex (ne řetězcem kdekoli v bloku),
zapisuje jen s nezávislým schválením (vata-schvaleni.json), kontroluje délkovou
nápovědu/remízu po dosazení a po zápisu ověří text otázky i odpovedi[0] celého
dotčeného bloku proti stavu před zápisem — při porušení soubor vrátí a skončí
process.exit(1). Ověřeno na kopii repa (suchý běh, --zapis bez schválení,
schválená položka v dřív přeskakovaném bloku, změněný qText, umělé porušení
kontroly). Commit 75f1733 (obsah), viz git log pro navazující commit se stavem.

🟡 VRÁTNÝ orchestrator-guard.sh: ř.65 bere basename+lowercase → projde /tmp/x/GIT;
ř.79 rm s ORCHESTRATOR_ON propustí i další cíle (rm -rf X ~/.claude/ORCHESTRATOR_ON
→ ALLOW). orchestrator-prompt.md:48–56 rozpor s _SPOLECNE.md § Izolace jen
popsán, ne odstraněn (jeden platný návod) + zalomená cesta.

27. 9. večer: automaty pozastaveny na žádost učitele KROMĚ 3 výjimek (ollama-env,
zaloha-skola, hlidac-baterie běží dál) — soupis a zapnutí:
Omega/dokumenty/POZASTAVENE-AUTOMATY-2026-09-27.md (živě ověřeno `launchctl list`
28. 9. 2026: kanárek zůstává NEZAPNUTÝ i po zápisu „znovu zapnut (18:00)" níže —
byl 27. 9. 17:32 znovu pozastaven, viz řádek kanárek v soupisu).

27. 9. večer: noční fronta VYPNUTA na žádost učitele (GPU pro jeho práci s lokálními
modely). Znovu zapnout: `launchctl bootstrap gui/502 ~/Library/LaunchAgents/cz.wonderly.nocni-fronta.plist`.

🔹 výstup podkastů do `Škola/podkasty/<ročník>/…mp3` — stav a formální schválení
viz sekce „❓ Otevřené dotazy na učitele" níže, položka „Škola/podkasty —
formální schválení výjimky".

**STÁLE OTEVŘENO (nepokryto níže, ČTI PŘESNĚ):** `OBSAH-PRAVIDLA.md` § „Pořadí práce" (ř. 321–322) —
1. téma (F7 `pohyb-a-rychlost`, F8 `mechanicka-prace-a-vykon`, F9 `magneticke-pole`)
se má dodělat KOMPLET (všech 9 složek vč. podkastu) u 7./8./9. ročníku naráz, teprve
pak 2. téma. Bez citovaného rozhodnutí učitele o výjimce nezakládat scénáře mimo
1. téma. Osud 7 pololetních/ročních shrnutí z 70 chybějících — stále NEROZHODNUTO.

**HOTOVO 27. 9.:** kanárek — 3 vady opraveny, nezávislá kontrola kol 4–10 do 0
nálezů, znovu zapnut (18:00), poté 17:32 [pozn.: dřívější čas, viz soupis
pozastavených automatů] znovu pozastaven na žádost učitele (ověřeno
`launchctl list` 28. 9. 2026 — nezaložen). Lokální graf `graf_local.py --fronta`
byl 27.–28. 9. opraven (cesta k frontě, podklady, selhání = neúspěch, kontrolor
qwen3.8:27b-mlx dle měření; commity Omega 8c12193…ad526da), spouští se ručně.
Noční fronta zapisuje skutečné příčiny odložení
(volný text pod tabulku, `skripty/fence_kod.py` sdílený s `oprava_hlaseni.py`).
Brána pokrytí (`skripty/pokryti_kvizu.py`) čte kvízy jako data přes
`skripty/kvizy_dump.mjs`, umí spadnout (exit 1 nepokryto / 2 porucha), drží GPU
zámek (`zamek_modelu.drz`, dědění jen od živého předka), strop čekání 40 min;
mezipaměť výsledku VYPNUTA (ukládala neúspěch při nedostupném modelu; obsah v
`Omega/smazano-zaloha/2026-09-27/pokryti-cache/`) — oprava otevřená. Značka
schválení scénářů (`skripty/schval_scenar.py`, `<slug>.schvaleno.json` s otiskem
`.md`+scénosledu) — `automat_podkastu` a `dodelej_animace` vyrábějí/nasazují jen
schválené, ověřeno 2 koly kontroly. `vyrob_omnivoice.py` ověřuje referenci hlasu
hashem a zastaví díl, kde by postava mluvila dvěma hlasy; 3 díly opraveny
(magnety-opakovani-dialog1 85 %, vykon-dialog2 90 %, pololetni-shrnuti-dialog3
86 %). Hlídač zaseknutí hlídá i GPU dráhu. `kontrola_scenare` chytá „ne?" kdekoli
v replice (4 starší scénáře s tímto nálezem: 8/alternativni-motory,
8/elektricke-napeti-mereni, 6/telesa-a-latky, 6/objem — neopraveno). Přepis
whisperem po replikách vrácen (mylná diagnóza).

**SCÉNÁŘE:** schváleno (značka kontrolor): 9/slunecni-soustava, 9/vesmir-a-galaxie,
7/klid-a-pohyb-telesa, 7/priklady-na-vypocet-rychlosti, 7/gravitacni-sila,
7/treci-sila, 7/pusobeni-teles-a-deformace. Napsáno, obě skriptové brány OK, ALE
neschváleno (čeká na rozhodnutí učitele o definici „části"): 7/teziste, 7/klin,
7/hydrostaticky-tlak, 7/telesa-stejnoroda-a-nestejnoroda, 7/naklonena-rovina.
Zbývá napsat F7: stin-faze-mesice, odraz-svetla, optika-rovinneho-zrcadla,
kulova-zrcadla-dute-zrcadlo, oko-vady-oka, rozklad-svetla-duha, vnimani-barev
(dle `Omega/dokumenty/PODKASTY-CHYBI-2026-09-27.md`).

**CHYBA ORCHESTRÁTORA 27. 9.:** do scénářů se prosazovalo pravidlo „zhruba
polovina Markových tvrzení omyly / nikdy 3 v řadě / Máš pravdu", které v návodu
NENÍ (závazné je jen `NAVOD-POLEMIKY-F6.md:26–31`: v každé části 1–2 typické
chyby; spor nejednostranný = Marek má platné námitky). Důsledek: 7/naklonena-rovina
se „opravou" zhoršila na skrytý výklad (3 chyby / 19 replik) — vrátit verzi před
opravou z gitu Omegy (commit `7789d4a` obsahuje původní); 7/teziste replika 12 má
chybné zdůvodnění, které Eva neopraví; kontrola (g) v `kontrola_scenare.py` je jen
VAROVÁNÍ a g2 („3 opravy v řadě") je taky mimo návod — přepsat po rozhodnutí učitele.

**ROZHODNUTÍ UČITELE (otevřené):** 1) co je „část" dílu / kolik Markových chyb na
díl (~4 min) — visí na tom 5 neschválených scénářů a kontrola (g); 2) U14 —
viz § ❓ Otevřené dotazy na učitele (jediná sekce) níže, bod „U14 — Vrátný:
zpřísnit?" (přesunuto odtud, oprava rozporu N4, kontrolor kolo 2); 3) přegenerovat
6/pololetni-shrnuti-dialog3 replika 14-EVA (výška 387 Hz vs ~250 Hz); 4) `claude
login` pro opraváře (OAuth vypršel, `OPRAVAR_AUTOMATICKY=False`); 5) kvízová
vysvětlení na webu: 7/telesa-stejnoroda „přibližně tisíckrát" (přesně ~833),
7/gravitacni-sila délková nápověda u 6/21 otázek.

**OTEVŘENÉ DROBNOSTI:** mezipaměť brány (7 drobných nálezů + závažný, viz
scratchpad kontrola-cache — přepsat do `Omega/dokumenty`, pokud chceš zachovat);
jedna zašuměná replika v díle projde měřidlem zarovnání (jen POZOR);
pololetni-shrnuti-dialog/-dialog2: WAV nesedí na MP3 (+7,5 s / prázdná
11-MAREK.wav) — ověřit; `test_skupina_kvizu.py` 1 FAIL „model nedostupný"
(předexistující); Python `os.remove` vrátný nevidí; kontrolor u hydrostatického
tlaku tvrdil exit 0 bez výpočtu po čekání na zámek — ověřit; 2. kolo nezávislé
kontroly nespuštěno pro 7/hydrostaticky-tlak a 7/naklonena-rovina.

## ❓ Otevřené dotazy na učitele (jediná sekce, oprava V8-6, 27. 9. 2026)

- **ROZHODNUTO 1. 10. 2026 (rozhodl učitel) — [téma 4] rozpory PDF + F9 Účinky proudu** (původně otevřený dotaz; soubory `Omega/predavka/2026-10-01/prace/tema4/*.md`, sekce rozpory):
  - (a) Práh proudu = stupnice ~1 mA ucítí / ~10 mA nepustí / od ~30 mA zástava srdce (fibrilace); chránič 30 mA; cesta přes levou ruku do srdce. (Tím je vyřešen i bod 14 „2–5 vs 1–8 mA“ níže.)
  - (b) Odpor kůže = vlhko 2 000 Ω / sucho 150 000 Ω (příklad 230 V ÷ 2 000 Ω ≈ 115 mA).
  - (c) 18 chyb PDF (téma 4 + F9): hromadně web podle správné fyziky, chyby PDF se nepřebírají.
  - (d) Plavební komora: samospád potvrzen; „měrné teplo“ u tuhnutí nepřebírat.
- **[téma 3] a)** Nakloněná rovina a Klín: ve Škole k nim není PDF ani prezentace (prohledáno i v ZIPech). Návrh textu nakloněné roviny z dosavadního webu je v `f7-naklonena-rovina.json` (vzorec a čísla jen v Pro zvídavé); stránka na webu zůstala beze změny. Dodá učitel podklad, nebo potvrdí učení z dosavadního webu?
- **[téma 3] b)** Odchylky od PDF opravené na fyzikálně správné znění (přehled v `odchylky-od-pdf.md`): mazání pístu v olejové vaně, šipky akce/reakce, sůl „vznikají ionty“, rychlost rakety 28 000 km/h, SO⁴⁻ — ke schválení.
- **[téma 3] c)** Termistor „v hutích“ (PDF Polovodiče s. 9) — ponecháno, ověřit.
- **[téma 3] d)** Simulace těžiště používá ilustrační čísla (náklaďák kola 180 cm, těžiště 150 cm → 31°; formule 200 cm, 30 cm → 74°), v PDF nejsou — ke schválení.
- **[téma 3] e)** Kapaliny: doplněná zmínka o tavenině (výroba hliníku) nad rámec PDF — ponechat/vypustit.
- **ROZHODNUTO 30. 9. 2026: B** (vzorec ve vysvětlení výpočtu není únik; viz `OBSAH-PRAVIDLA.md` § Zákaz úniku odpovědi). Původní dotaz — Únik přes vysvětlení výpočtu: Vzorec ve vysvětlení výpočtu (např. 18 000 : 6 = 3 000 W) prozradí otázku „jaký je vzorec výkonu?“. Počítá se to jako únik? Varianty: A) ano — v bloku buď otázky na vzorec, nebo výpočty s vysvětlením; B) ne — vysvětlení výpočtu smí vzorec ukázat.

Dřív rozeseté po pěti místech (2x hlavičkovaná sekce Čeká na odkliknutí + tři
samostatné věty) — sloučeno sem, na originálních místech zůstal jen pointer.
Nikdy kvůli tomuto nestát — jít dál na další úkol.

- [Omega] **Škola/podkasty — formální schválení výjimky** — složka
  `/Users/Shared/Škola/podkasty` patří `radek_soukromy`, existuje, obsahuje
  produkční mp3/přepisy (7/8/9, ověřeno `ls` 28. 9. 2026) a `vyrob_omnivoice.py`
  do ní aktivně zapisuje — jde o zavedenou, živě používanou výjimku ze
  „Škola = jen číst" (`_SPOLECNE.md` § Izolace ji tak popisuje). Git historie
  Omegy neobsahuje žádný commit s výslovným schválením učitele — jde o zavedenou
  praxi, ne o formálně odklikanou výjimku; učitel má rozhodnout, zda ji potvrdit.
- [cesty] **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- [cesty] **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou (na YouTube je verze
  4:58, kapitoly jsou z verze 6:06). Pozn. 27. 9. 2026: dřívější odkaz „v KE-SCHVALENI.md"
  byl zastaralý, ten soubor (založen až 21. 9. 2026, teď archivován) tuhle položku
  neobsahoval — rozhodovací tabulka s cenami chybí, potřeba dohledat nebo znovu sestavit.
- [skola2] **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz`. Pozn. 27. 9. 2026: rozhodovací tabulka,
  na kterou odkazoval starý `KE-SCHVALENI.md`, v něm už nebyla (soubor archivován) —
  potřeba znovu sestavit, pokud otázka stále trvá.
- [skola2] **5 otevřených bodů z fyzikálních podkladů** (přeneseno z archivovaného
  `KE-SCHVALENI.md`, 27. 9. 2026 — plné znění `wonderly-web/docs/archiv/KE-SCHVALENI.md`):
  1) Účinnost (η = P : P₀) — na webu chybí, přidat jako nové podtéma/nadstavbu k `vykon`,
     nebo nechat mimo? 3) PDF „Od_výbuchu_k_pohybu_Svět_motorů" navíc obsahuje Wankelův
     motor, proudový/raketový motor a alternativní pohony (LPG/CNG, hybridy, elektromobily,
     vodík) mimo rozsah `spalovaci-motory` — nové podtéma? 10) Podtémata „Kladka" a
     „Nakloněná rovina" (F7, `jednoduche-stroje`) nemají zdrojový podklad ve Škole —
     dodat podklad, nebo ponechat beze změny? 14) Práh proudu u „Účinky proudu, bezpečnost":
     web „2–5 mA" vs. PDF „1–8 mA" (PDF rozsah by se překrýval se sousedními prahy
     0,5–1 a 6–15 mA) — který platí? 15) Podtémata jaderné fyziky (F9, budoucí 5. celek:
     radioaktivita, jaderná energie, jaderný reaktor) nemají zdrojový podklad — dodat,
     nebo přestavět beze srovnání?
- [skola2] F9 `chemicke-zdroje-napeti` — citronová baterie, palivový článek, polarita
  anody při nabíjení, „dva stejné kovy" nejsou v PDF (možná v prezentaci) — ponechat
  ve výkladu/kvízu, nebo vyřadit? Kvíz `kvarky` má 14 otázek (výjimka z cíle 21
  nezapsaná — zapsat výjimku, nebo doplnit otázky?).
- [skola2] Podtémata bez názornosti u shrnutí (7, ověřeno `node testy/nazornost.mjs`
  27. 9.) — dělat přehledovou infografiku, nebo je z měřidla vyjmout? Stejná otázka
  platí i pro podkasty/video u týchž shrnutí (viz „⚡ ČÍM ZAČÍT" výše).
- [skola2] `MEMORY.md` (Škola) — po zhuštění D5 27. 9. má 131 řádků/19 577 B,
  pod hookovým limitem 140 řádků; U16 tímto ODPADÁ (viz níže), jen hlídat růst.
- [skola2] Odpor lidské kůže (F8 `temata.ts` ~2713, F9 ~3062–3063, `kvizy.ts`
  ~4344–4361, ~4713–4723) — PDF podklad si sám sobě odporuje (sucho/vlhko
  prohozené i jiný řád čísel); která verze je správná? Do té doby platí
  ⛔ NESAHAT (viz sekce „[skola2] ⛔ NESAHAT" níže, V12-1, 27. 9. 2026) — NEMĚNIT.
- [Omega] **Omega repo nepushuje** — `git@github.com: Permission denied (publickey)`,
  151 commitů napřed proti `origin/main` (ověřeno 27. 9. 2026). Chybí SSH klíč/alias
  pro `github.com` na tomto stroji — zásah do systémové konfigurace.
- [Omega] **`povoleni_hook.py` není zapsaný v `~/.claude/settings.json`** — platí jen
  ve `Škola/.claude/settings.json` (`PreToolUse '*'`); session spuštěná přímo z Omegy
  nebo z wonderly-web běží bez vrátného a bez černé listiny (nález K2-1). Návrh zápisu
  (jednořádkový příkaz) je v `Omega/dokumenty/audit-2026-09-27.md` (sekce K2-1, V9-4).
- [Omega] **U14 — Vrátný: zpřísnit?** (`rm` mimo projekt, `git push --force`, session
  mimo `Škola/`) — kód dnes tyhle případy vrací `allow[+žurnál]`, návody to popisují
  správně (`Omega/PRAVIDLA.md:591` bod (a)/(c)); OTEVŘENÉ je jen to, zda učitel chce
  přidat `ask`. Doklad: `scratchpad/rozpory-kolo2.md` N1–N4 (kontrolor, 27. 9. 2026,
  kolo 2).
  ODLOŽENO (kolo 4, K4-8): komentáře a hlášky přímo v kódu `povoleni_hook.py`
  (ř. 12, 66, 1068–1069, 1500–1501) dál slibují dotaz/zákaz tam, kde kód reálně
  vrací allow+záloha — kód se NEMĚNÍ (ani komentáře) bez rozhodnutí učitele,
  srovnat texty s chováním až při rozhodnutí U14.
  RIZIKO (kolo 5, K5-1): `mv` mimo projekt a `find -delete` (kamkoli) projdou
  jako allow BEZ zálohy a BEZ žurnálu — `cile_mazani()` parsuje jen `rm`/`rmdir`
  (viz `Omega/PRAVIDLA.md:591`). Doplnit do vrátného až při rozhodnutí U14;
  do té doby platí vlastní opatrnost modelu (ruční záloha do
  `~/Desktop/Omega/smazano-zaloha/<datum>/` + žurnál před takovým `mv`/`find -delete`).
- [Omega] **17 záměrně vypnutých automatů (K1-4)** hlásí `revize_automatu.py` jako
  vadu — doplnit `Disabled=true` do plistů, nebo je vést v evidenci pozastavených?
  Zásah do LaunchAgentů.
- [Omega] **Neplatné XML v `com.omega.zaloha-skola.plist` (K1-10)** — komentář s „--"
  uvnitř dělá `plistlib` slepým k automatu; oprava je editace plistu.
- [skola2] **Hermes — sjednocení návodů** (audit z noci 29. 7.):
  `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md` — Hermes JE nainstalovaný
  (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly. Návrh: jeden
  HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md".
- [skola2] **Automatický restart samostatného režimu po obnově tokenů:** šlo by
  naplánovanou úlohou (cron v danou hodinu spustí novou session). Nová trvalá
  konfigurace → jen se souhlasem.
- [skola2] 22 kandidátů na zkrácení pravidel čeká na výběr učitele v
  `Omega/dokumenty/PRAVIDLA-AUDIT-2026-09-21.md`.
- [Omega] **Rozhodnutí U1–U16 čekají na učitele** (doporučeno vše A) — plná
  tabulka je HISTORICKÝ SNÍMEK k 27. 9. 2026 v `Omega/dokumenty/PREDAVKA-2026-09-27.md`
  (sekce „ČEKÁ NA UČITELE — tabulka U1–U16"); aktuální stav a znění U14/U15/U16
  vede tahle sekce ❓ (jediné živé místo). V18-4 (rozpor „kdo zapisuje do sdílených souborů" mezi
  `wonderly/SKILL.md:353-355`/`_SPOLECNE.md:36-42` a `~/.claude/CLAUDE.md`
  § Jak pracovat, bod 6 „Izolace") je **U15 — VYŘEŠENO** (`Omega/PRAVIDLA.md:591` (c): platí znění
  `~/.claude/CLAUDE.md` bod 6, skilly mají znít shodně — opraveno kolo 3).
  U16: MEMORY.md (Škola) po zhuštění D5 27. 9. má 131 řádků / 19 577 B, pod
  cílem 140 řádků / 20 000 B — U16 tímto ODPADÁ, hlídat, ať zase nenaroste.
- **V18 ODLOŽENO 27. 9. — strop 3 kol vyčerpán, 13 nálezů popisu viz
  `Omega/dokumenty/V18-NALEZY-KOLO4.md`; rozpor Škola rm/mv = dotaz × skutečnost
  allow je od 27. 9. VYŘEŠENÝ kódem (`Omega/PRAVIDLA.md:591` (a)/(c) —
  `rm`/`mv` ve Škole dnes skutečně vrací `ask`), U14 zůstává otevřené jen pro
  DALŠÍ zpřísnění (rm mimo projekt, push --force, session mimo Škola/).**
- [skola2] Denní rutina `pravidla-dluh-denne` založena, ale cron `30 7 * * 1-6`
  čeká na zaregistrování přes `/schedule` učitelem.
- [cesty] **Smazat zbloudilé kopie v R2** na chybném klíči (2 soubory,
  `polemika-roztaznost-1/-2.mp4`, nahrané omylem 16. 8. s prefixem navíc) —
  správné kopie fungují, chybné nikdo nečte, smazat?
- [cesty] **9 videí „k rozhodnutí"** — `Cestovatelský deník/KE-SCHVALENI.md`.
- [cesty] **Rozmazávání SPZ** — návrh učitele 6. 8. posouzen (referenční fotky
  neřeší detekci), navržené řešení čeká na pokyn: nejdřív změřit dnešní stav na
  zkušební sadě značek, pak přidat kontext auta. Plná analýza v sekci
  „🚗 Nápad učitele 6. 8." níže.
- [skola2] Odkazy F9 `chemicke-zdroje-napeti` 4× doslova stejné jako u F8 stejného
  slugu (v „📥 Nálezy z historie" níže) — vada, nebo záměr?
- [cesty] **Referenční tváře 2021** — z kandidátů vybrat a POTVRDIT (přidání tváře
  = ta osoba se přestane rozmazávat, potvrzuje vždy učitel).
- [cesty] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a
  stará skrýt? (YouTube neumí vyměnit soubor.)
- [skola2] Rozhodovací tabulky z 29. 7. (v „Přestěhováno z FRONTA-UKOLU.md" níže):
  laboratorní práce (12 bodů), nové simulace (10), UX školy (8).
- [cesty] Rozhodovací tabulka z 29. 7.: mapa+poutavost deníku (14 bodů).
- [skola2] Odkaz na video „Teplota a její měření – Fyzika 6" chybí v soupisu kanálu —
  doplnit, nebo ověřit, že video vůbec existuje?
- [skola2] `wrangler` token scope pro Cloudflare Builds API (doporučení z 16. 8. 2026,
  dosud neprovedené) — doplnit, ať jde příště zjistit příčinu selhání buildu
  automaticky?
- [cesty] Shlukování popisků na úvodní mapě do čtverců („7 míst") — realizovat
  (zásah do `trasa_uvod.py`, ~1 kolo práce), nebo nechat beze změny?
- [skola2] **Návrh do fronty (audit 27. 9. 2026):** skriptová kontrola „otevřený
  dotaz mimo sekci ❓" — ruční přesouvání do jediné sekce selhalo 4×, hledat
  deterministicky (regex „?" na konci řádku / klíčová slova „čeká na rozhodnutí",
  „ROZHODNOUT MUSÍ UČITEL" mimo tuto sekci) a hlásit, ne přesouvat samo.
- [cesty] **Hudba pod videa podkástů ze Suno** (návrh učitele 16. 8., předplatné Pro) —
  potvrdit rozsah: znělka, nebo podkres celého dílu? Jednotná znělka pro celou sérii,
  nebo jiná ke každému dílu? Realizace čeká na učitele u počítače (přihlášení do Suno
  účtu). Plné znění v „Přestěhováno z FRONTA-UKOLU.md" níže.
- [skola2] **Fahrenheit — formulace** (díl 8 `teplota-a-jeji-mereni`): „v anglicky
  mluvících zemích" místo přesnějšího „hlavně v USA" — přeformulovat?
- [skola2] **Klementinum — rok rekordu** (díl 8): zmíněn jen rok 1775 (začátek
  měření), sporný rekord 1785/1929 vynechán — potvrdit, nebo doplnit?
- [skola2] **Přeskoky v pořadí úvodních map videí** — `kontrola_poradi.py`
  dlouhodobě hlásí 8 přeskoků (např. chybí zastávka ballon-d-alsace) — mají se
  mapy předělat?

## 26. 9. 2026 v noci

**HOTOVO**
- Vata „kvantifikátor" (VZOR 4b) — 22 ze 39 otázek fyziky přestavěno a nasazeno (commit `72ed250`), měřidlo 54 → 26 nálezů vč. souhrnů.
- Build na Cloudflare opraven (`b7082e3`): test `rozvrzeni-sceny-obousmerne` četl `git show f30767b`, Workers Builds dělá mělký klon → brána shodila build, `2ee4c6e` se nenasadil ~1 h 15 min; fixture teď v `testy/podvrhy/`.
- Automat dodelej-animace: chybný celek ve scénosledu `archimeduv-zakon-dialog` opraven, odkaz na video je na webu (`d951bd7`).

**ODLOŽENO — zaseklo se (3 vlny, 3 kola kontroly)**
17 otázek zůstává v původním znění (s „jen" nápovědou); vady jsou v CELÉM BLOKU (sousední otázky a jejich vysvětlení prozrazují odpovědi, výčtové otázky „A a B" mají distraktory = poloviny správné) — nepředělávat po jednotlivých otázkách, ale po celém bloku (otázka + sousedi + vysvětlení naráz). Zbývá i VZOR 3 (kategorické slovo) a VZOR 5 (tázací slovo). Seznam (klíč bloku, začátek zadání):
1. `fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb` (qIndex 15) — „Jaký pohyb koná šroub při šroubování do dřeva?"
2. `fyzika/6-rocnik/latka-a-teleso/telesa-a-latky` (qIndex 6) — „Čím se od sebe odlišují různé látky?"
3. `fyzika/6-rocnik/sila/gravitacni-sila` (qIndex 0) — „Mezi kterými tělesy působí gravitační síla?"
4. `fyzika/7-rocnik/tlak-v-kapalinach/hydrostaticky-tlak` (qIndex 1) — „Jakými směry působí hydrostatický tlak v kapalině?"
5. `fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti` (qIndex 8) — „Kde se využívají alkalické články?"
6. `fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/telesa-stejnoroda-a-nestejnoroda` (qIndex 3) — „Z čeho se skládá nestejnorodé těleso?"
7. tamtéž (qIndex 7) — „Co počítáme u nestejnorodých těles místo hustoty látky?"
8. tamtéž (qIndex 13) — „Jakou hmotnost a jaký objem dosazujeme do ρp = m : V?"
9. `fyzika/6-rocnik/latka-a-teleso/skupenstvi-latek` (qIndex 1) — „Co si zachovává těleso v pevném skupenství?"
10. `fyzika/6-rocnik/teplota/teplotni-roztaznost` (qIndex 1) — „Kterých skupenství se teplotní roztažnost týká?"
11. `fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa` (qIndex 6) — „Trajektorie může být…"
12. `fyzika/8-rocnik/teplo-a-zmeny-skupenstvi/vyparovani` (qIndex 1) — „Za jaké teploty probíhá vypařování?"
13. `fyzika/9-rocnik/elektricka-energie-a-bezpecnost/ucinky-proudu-bezpecnost` (qIndex 14) — „Kdy se počítá s odporem lidského těla jen asi 2 000 Ω?"
14. `fyzika/8-rocnik/energie/zakon-zachovani-mechanicke-energie` (qIndex 19) — „Letadlo letí rychle vysoko nad zemí. Jakou energii má?"
15. `fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor` (qIndex 13) — „Jakým proudem napájíme elektromotory?"
16. `fyzika/7-rocnik/jednoduche-stroje/pusobeni-teles-a-deformace` (qIndex 1) — „Jak může působení mezi tělesy probíhat?"
17. `fyzika/8-rocnik/energie/energeticka-hodnota-potravin` (qIndex 12) — „Z jakých dvou zdrojů člověk získává potraviny bohaté na energii?"

**POUČENÍ**
1. Oprava vaty 1. vlnou jen přesunula nápovědu — místo „jen" prozrazoval odpověď dovětek „protože…" jen u distraktorů a délka (správná vždy nejkratší); `vata-over-delku.mjs` hlídá jen „nejdelší", ne „nejkratší" → doplnit měřidlo.
2. Kontroloři mezi vlnami kolísali (co jeden pustil, druhý zamítl) — rozhodnutí až po smyčce do 0 nálezů.
3. Mělký klon na CI: testy nesmí sahat do historie gitu.

> ⤵️ Šest denních snapshotů „STAV 23.–25. 9. 2026" a „ROZHODNUTO PODLE PRAVIDLA
> ZDROJŮ (23. 8.)" přesunuto do [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md)
> — audit 27. 9. 2026 (K3-Z8+K3-Z12; číslo úspory bylo nepřesné, opraveno V8-8,
> odstraněno). Byly vzájemně přepisující se
> denní zápisy, vše HOTOVO/uzavřeno; aktuální stav je jen v nejhornější sekci
> „⚡ ČÍM ZAČÍT" výše. Ochranná pásma vedení, práh proražení kůže i bezpečné napětí
> zůstávají ROZHODNUTO (23. 8. 2026, podle pravidla zdrojů — prezentace je rovnocenný
> zdroj s PDF): čísla se NEDOPLŇUJÍ přes rozcházející se zdroje, zavedený text se
> nemění jen kvůli útržkovitému PDF. Jupiter 2,36× (prezentace) vs. 2,53× (fyzikální
> přepočet) zůstává podle prezentace (žák vidí totéž co v hodině), komentář v kódu.

## 📌 Živé zadání, fronta a reference

- **PRIORITA VYSOKÁ (1. 10. 2026): kolize slugu mezi ročníky ve výrobě videa.** `video_podkastu.py:34-35` ukládá snímky/video jen podle slugu bez ročníku → výroba podkastu 7 gravitacni-sila-dialog by přepsala video 6. ročníku. Krok 1 (hned po doběhu automatu dodelej-animace 1. 10.): pojistka — výroba se zastaví s chybou, když slug existuje v jiném ročníku. Krok 2: cesty s ročníkem (dotkne se R2 klíčů a odkazů v temata.ts — plán + kontrolor). Doklad: `Omega/predavka/2026-10-01-den/kontrola-stav-animaci.md`. Drobný nález tamtéž: `stav_animaci.py` skryje existující video, když zvuk chybí v obou ročnících.
- **Fronta téma 4 (1. 10. 2026):** simulace Tlaku; F9 Účinky proudu a bezpečnost (ODBLOKOVÁNO 1. 10. 2026, rozhodl učitel: práh ~1/~10/~30 mA, kůže 2 000 Ω vlhko / 150 000 Ω sucho, viz rozhodnutí v ❓); vlna 3 F8 Vypařování/Var/Kondenzace/Skupenské změny vody v přírodě (Codex); média (Suno, NotebookLM, polemika s animacemi); vyřešit selhání CI buildu (`prace/ci-selhani.md`); mobil ~121 simulací (Codex, větev `codex/mobil`).
- **Fronta téma 3 (30. 9. 2026 noc):** zbývá Klín (bez podkladu) a Nakloněná rovina (bez podkladu, viz ❓ a); pak další téma.
- **DROBNÉ k7 (F7 Těžiště + F8 Tepelná výměna, 30. 9. 2026, `/tmp/wonderly-workery/2026-09-30-tema2/kontrola-web-k7.md`, NASADIT).** Body 1–6 jdou do dalšího kola.
- **DROBNÉ k6 (F8 Energetická hodnota potravin, 30. 9. 2026, `/tmp/wonderly-workery/2026-09-30-tema2/kontrola-web-k6.md`, NASADIT).** Body 1–4 (kvizy.ts 3559, 3560, 3543, 4644×4662) jdou do dalšího kola. ODLOŽENO: 5, 6, 8 (SvacinaSimulace.astro: „vždy na 100 g", nečitelné popisky v 400 px, dietní hlášky) a 7 (`testy/cisla-ve-vykladu.mjs:15` nezná NBSP, falešný poplach 6300).
- **DROBNÉ k4 (téma 2, 30. 9. 2026, kontrola k4 – NASADIT, `/tmp/wonderly-workery/2026-09-30-tema2/kontrola-web-k4.md`, body 1–8 neopraveno).**
- **Sladit kvíz priklady-na-vypocet-rychlosti** (kvizy.ts ~2807, 2819: 25 s a 5 s) s výkladem (100 m za 20 s; 60 m za 4 s / 3 s) — pak brána pokrytí s modelem a schválení scénáře 7/priklady-na-vypocet-rychlosti-dialog.
- **Téma 2 zbývá:** F7 Těžiště, F8 Energetická hodnota potravin, F8 Tepelná výměna (nad RVP).
- **DIAGNÓZA scena-00 (výroba téma 1, 30. 9. 2026, exekutor):** není to chybějící krok automatu, ale záměrná brána z 28. 9. (`video_podkastu.vstupy_plnych_klipu` ř. 141, `NAVOD-ANIMACE-PODKASTU.md`, OBSAH-PRAVIDLA kap. 12): KAŽDÁ scéna musí mít plný animovaný klip `scena-NN.mp4`. `automat_podkastu.krok_animace` ale vyrábí jen scény s klíčem `animace` ve scénosledu; scénosledy elektromagnet-dialog1–3, vodic-civka-dialog1–3, vykon-dialog2–4 ho nemají u žádné scény (2–4 scény, samé `kresba`) a v `animace_podkastu.ANIMACE` není žádná kreslicí funkce pro elektromagnet/cívku/výkon (jen pilot f8_prace_*). Výroba tedy MUSÍ znovu padnout — obejít bránu nelze (zmražené pravidlo). Nespuštěno, staré repliky/videa nepřesunuty (přegenerování zvuku by bylo zbytečné). Předpoklad: napsat kreslicí funkce (děj, fyzika, časy z WAV, `animuj_po_celou_scenu`) pro ~25 scén a přidat je do scénosledů a `ANIMACE` — rozhodnutí učitele/orchestrátora (velká obsahová práce).
- **ZVUK téma 1 běží (exekutor, 30. 9. 2026 ~15:06):** jen zvuk (`vyrob_omnivoice.py <slug> --rocnik N`, bez videa), PID 42792, skript `Omega/skripty/docasne/vyroba-zvuk-tema1.sh`, log `Omega/logy/vyroba-zvuk-tema1-2026-09-30.log`. Fronta po sobě: 9/vodic-civka-dialog1–3, 8/vykon-dialog1–3. Přeskočeno: 9/elektromagnet-dialog1–3 (mp3 hotové, novější než scénář); 8/mechanicka-prace-dialog3, 8/vykon-dialog4, 7/priklady-na-vypocet-rychlosti-dialog (značka NEPLATNÁ). Staré repliky+prepis.json (vodic-civka-dialog1, vykon-dialog1–3) přesunuty do `Omega/smazano-zaloha/2026-09-30/podkasty-stare/{8,9}/`. Video dál čeká na animace (DIAGNÓZA scena-00).
- **PŘERUŠENO (výroba podkastů téma 1, 30. 9. 2026, zavření Macu):** hotové: žádný díl s videem (dialog1 a dialog2 ODLOŽENY 3× pro „Chybí plná animace scena-00.mp4“; jejich zvuk omnivoice.mp3 a snímky existují); rozpracované: elektromagnet-dialog3 (zvuk + snímky hotové, video 2/3 pokusů stejná chyba, zabito při 3. pokusu); zbývá: dialog3 video, vodic-civka-dialog2, vodic-civka-dialog3. Kořen chyby je chybějící animace scena-00.mp4 (běh „bez animací“) — před dalším spuštěním vyřešit. Znovu spustit `/tmp/wonderly-workery/2026-09-30-scenare/vyroba.sh` (POZOR: /tmp se po restartu smaže — kopie je `~/Desktop/Omega/skripty/docasne/vyroba-tema1.sh`; zálohy práce v `~/Desktop/Omega/predavka/2026-09-30/prace/2026-09-30-tema2/` a `.../2026-09-30-scenare/`).
- **DROBNÉ (téma 2, 30. 9. 2026, kontrola k3 – verdikt NASADIT, `/tmp/wonderly-workery/2026-09-30-tema2/kontrola-web-k3.md`, neopraveno):** (1) kvizy.ts:4323 vysvětlení prozrazuje rok 1831 (Q4339); (2) kvizy.ts:4357 prozrazuje Q4356, 4356 napovídá Q4355; (3) kvizy.ts:4358 prozrazuje Q4364, Q4364 „dynamo“ kolize s temata.ts:3000; (4) kvizy.ts:2863 zadání vyřadí distraktor Q2860; (5) kvizy.ts:3518 „mění na teplo“ vs. výklad „vnitřní energie“; (6) temata.ts:1883 zápis skládání bez indexů F1/F2, „míří jako větší síla“ 2×; (7) temata.ts:2998 nadpis „Kde se alternátor a dynamo používají“ bez použití dynama.
- **ODLOŽENO (téma 2, 30. 9. 2026, `/tmp/wonderly-workery/2026-09-30-tema2/odlozene.md`):** simulace Skatepark (popisek „teplo Q“ → „vnitřní energie“); sila-vektor láme „Fg = 30 | N“ na 400 px (NBSP); slabý únik gravitacni-sila Q8 → sila Q10; SVG nálezy (treci-sila-obr-01, pohybova-obr-03, vnitrni-obr-03, vnitrni-obr-01, indukce-obr-04 titul „Obr. 1.20“); TreniSimulace.astro součinitel tření dřevo neladí s výkladem (+ test); StridavyProudSimulace.astro ~ř. 204 sin(úhel) nad rámec 9. ročníku (+ test).
- **ZBÝVÁ téma 2:** F9 Transformátor (text+kvíz+obrázky hotové v `/tmp/wonderly-workery/2026-09-30-tema2/`, čeká na vložení), obrázek zákona zachování (hotový), F7 Těžiště, F8 Energetická hodnota potravin, F8 Tepelná výměna (nad RVP).
- **DROBNÉ (ucinnost, 30. 9. 2026, kontrola k3 č. 4 a 6, neopraveno):** (4) písmo popisků jen 9,4–10,5 px na mobilu v `ucinnost-obr-01.svg` (7 popisků) a `ucinnost-obr-02.svg` (10 popisků) — zvětšit font/viewBox; (6) popisky scény v `UcinnostSimulace.astro` se na 400 px zmenší na ~5,5 px (viewBox 660 → ~282 px) — nečitelné, trvá z HEAD.
- **DROBNÉ (ucinnost, 30. 9. 2026, kontrola k4 – verdikt NASADIT, `/tmp/wonderly-workery/2026-09-30-ucinnost/kontrola-web-k4.md`, neopraveno):** (1) kvizy.ts:3450 Q3 distraktor „veškerá práce odebraná strojem z přívodu energie“ napovídá Q2 (3449), distraktory Q2/Q3 „ztratí/ztracená za 1 s“ téměř duplicitní; (2) Q20, Q21 (3467–3468) vyžadují P = η · P₀, výklad uvádí jen η = P : P₀ a P₀ = P : η; (3) Q5 (3452) distraktory „pé krát nula“, „pé děleno nulou“ nevěrohodné.
- **ODLOŽENO (téma 1, 30. 9. 2026)** — důvod: strop pokusů / cena:
  - (a) blok vykon: nálezy k6 č. 1–6 (`/tmp/wonderly-workery/2026-09-30-tema1/kontrola-k6.md`), strop pokusů. Nález k6 č. 1 zrušen pravidlem B; zbývá č. 2 (vysvětlení Q10 prozrazuje Q2) a drobné 3–6.
  - (b) k3 nálezy 6, 10, 11, 13: duplicitní kJ/MJ mezi bloky práce/výkon, kvíz nezkouší J/značku s, „=“ na konci řádku na 400 px, rozbitý obrázek „Tahák“ (temata.ts:1801) a „/“ „×“ v simulacích.
  - (c) `uniky.mjs` nechytá úniky přes vysvětlení výpočtů — posílit měřidlo.
  - (e) téma 1b, drobné: kontrola-web-k2 nálezy 1–3 (`/tmp/wonderly-workery/2026-09-30-tema1b/kontrola-web-k2.md`): laborka Ozobot bez nbsp (láme se na 400 px, laborky.ts:493); správná odpověď nejdelší ve dvou otázkách (kvizy.ts:4284, 4287); vysvětlení Q1 prozrazuje Q2 a Q9 prozrazuje Q4 v bloku elektromagnet. Kontrola-obrazky-k3 nálezy 1–4 (`…/kontrola-obrazky-k3.md`): N1 západka E-02 není v textu, N2 překryv hrotů vodice-05 b, N3 START zakrývá konec objížďky F7-17, N4 vodice-04 chybí prostorová nápověda.
  - (f) vrátný `povoleni_hook.py` propouští `echo '…rm…Škola' | sh` a `ssh mini 'rm …'` (mazání obejde kontrolu).
  - (d) zbylá podtémata tématu 1 (na konec): F7 Příklady na výpočet rychlosti, F9 Pole vodiče a cívky, Elektromagnet, F8 Účinnost.

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `~/.claude/skills/wonderly/START.md`).

> **wonderly je JEDEN web, tři sekce — fronta je SPOLEČNÁ pro všechny.** Každá
> položka fronty nese na začátku značku sekce: `[fox]` = web pro 1. stupeň,
> `[skola2]` = lab.wonderly.cz (2. stupeň, tenhle repo — dosud jediný obsah fronty),
> `[cesty]` = cestovatelský deník. Bez značky se nezakládá nová položka.

### 🔴 PRIORITA — přestavba obsahu fyziky (zadáno 21. 9. 2026)

`[skola2]` Zadání učitele. **NIC SE NEMAŽE** — texty se jen přestavují a doplňují.

**A) Plynulost výkladu.** Texty k tématům nesmí „přeskakovat" mezi pojmy.
Doložený příklad učitele: u energie se v jednom podtématu stále skáče mezi
polohovou a pohybovou energií. Každé téma má jít v jedné linii, ne sem a tam.

**B) Nová část „Zápis do sešitu"** u každého podtématu, v TOMTO pořadí:
1. **Vzoreček** (má-li ho téma) a pod ním **pod sebou** rozepsané všechny
   veličiny z něj — tvar: `síla — značíme F, jednotka N (newton)`.
2. **Vzoreček slovy**, ne jen značkami.
3. **Přesné znění zákona**, jde-li o zákon.
4. **Body s nápovědou** — jen pár slov na bod, NE celé vysvětlení.
   Důvod (slova učitele): *„děti si nemohou psát celé stránky, děti se neučí
   psát, ale rozumět fyzikálním zákonům; na podrobné čtení mají web, ne sešit."*

**C) Úroveň a řazení textu na webu.** Od nejjednoduššího k nejsložitějšímu.
Jazyková úroveň mnohem nižší než dosud — učitel říká „spíš pro 9–10 let":
žák má **tušit, jak fyzika funguje**, ne umět všechno spočítat.

**D) Nadstavba na konec stránky.** Náročné počítání a odvozování se nemaže,
jen se přesune na KONEC podtématu jako bonus pro schopnější žáky.

**Postup:** nejdřív **JEDNO podtéma KOMPLET** (A+B+C+D) jako vzor, nechat
schválit učitelem, teprve pak dávkově zbytek. Začít u **energie (8. ročník)** —
právě na ní učitel skákání ukázal.

> ⤵️ Postupný průběh přestavby 21.–22. 9. 2026 (dávka po dávce, celek po celku,
> commity d491ea0…2d7e7c9) přesunut do [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md)
> — audit 27. 9. 2026 (K3-Z9, duplicita s Historií `PROGRESS.md`). Výsledek: F8/F7/F9
> celky 1–8 (79 podtémat) přestavěny a kvízy sladěny; aktuální díra vede „⚡ ČÍM ZAČÍT" výše.

**E) POŘADÍ A ÚPLNOST (upřesněno 21. 9. 2026)**

(i) **Pořadí práce** = 1. celek (téma) u ročníků 7, 8, 9, pak 2. celek u všech
tří, atd. — cíl: to, co učitel učí příště, je hotové ve všech ročnících naráz.
Ročník 6 učitel nezmínil, zůstává mimo pořadí, dokud neřekne.

(ii) **„Hotové téma"** — od 22. 9. 2026 platí ROZŠÍŘENÁ definice, upravená
23. 9. 2026, plné znění JEN v `OBSAH-PRAVIDLA.md`, kap. 12 (nikam se dál
neopisuje). Zkráceně jde o DEVĚT složek: výklad, zápis do sešitu, kvíz
21 otázek sladěný s výkladem (2 kola nezávislé kontroly), simulace
(= interaktivní infografika, od 23. 9. 2026 sloučeny do jedné složky —
klikací i posuvníková interakce se počítají stejně), české odkazy,
video-polemiku S ANIMACÍ (ne statické obrázky, ne jen audiostopa),
infografiku (statickou), laboratorní práci a hru pro skupinu (samostatná
hra vázaná na podtéma, ne jen výběr podtématu ve Fyzikální lize).
Přechodné ustanovení: dosavadní audiostopy bez animace zůstávají
zveřejněné, animace se doplňuje postupně.

> ⤵️ Podrobný průběh 21.–22. 9. (PŘEDÁNÍ, sladění kvízů, past souběžného zápisu
> `temata.ts`×`kvizy.ts`, mezery bran) přesunut do
> [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — audit 27. 9. 2026 (K3-Z9+K3-Z10).
> Trvalá pravidla, která z toho zůstávají: brány běží nad celým repem — souběžné zápisy do
> `temata.ts`/`kvizy.ts` se musí dokončovat po jednom; `cisla-ve-vykladu.mjs` přeskakuje
> otázky s číslem v zadání; `uniky.mjs` porovnává jen uvnitř bloku, ne mezi blocky ani
> přes skloňování; curl ověřovat s User-Agent i cache-busterem (`?cb=`).

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 2. kolo — kontrolor V4-2)

Systematický průchod archivu po nálezu, že se smazáním duplicit ztratily i nehotové úkoly:

- [skola2] `⏸ ODLOŽENO (rozhodnutí učitele 25. 9. 2026)` — informatika a pracovní
  činnosti se nedělají, dokud není hotová fyzika (`OBSAH-PRAVIDLA.md`, preambule);
  podrobný stav před odložením (43 bloků kvízů pod 21 otázek, 15+3 podtémat bez
  simulace) v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md).
- [skola2] `cisla-ve-vykladu.mjs` nekontroluje otázky, které mají číslo přímo
  v zadání (`if (vZadani.length) continue`) — doplnit.
- [skola2] `uniky.mjs` porovnává jen uvnitř bloku a přes české skloňování — nevidí
  úniky/duplicity MEZI bloky (např. páky × kladka) — doplnit.
- [skola2] Ověřit odkazy u F7/F9 celků 1–5 (38 podtémat) — při sladění kvízů 22. 9.
  bylo „nezjišťováno".
- [skola2] Podtémata bez názornosti (ověřeno `node testy/nazornost.mjs` 27. 9.: fyzika
  7 z 120 — vše pololetní/roční shrnutí; informatika 15 z 47; prac. činnosti 1 z 3) —
  otevřená otázka o osudu shrnutí je v sekci „❓ Otevřené dotazy na učitele" nahoře.
- [skola2] `MEMORY.md` (Škola) — po zhuštění D5 27. 9. má 131 řádků/19 577 B,
  pod hookovým limitem 140 (viz „❓ Otevřené dotazy na učitele" nahoře, U16).
- [skola2] 22 kandidátů na zkrácení pravidel a registrace cronu `pravidla-dluh-denne` —
  přesunuto do sekce „❓ Otevřené dotazy na učitele" nahoře (V9-2, 27. 9. 2026).
- [skola2] Kosmetika: blok `tepelna-vymena-a-teplo` má zápis „4200", sjednocení na
  „4 200" spouští bránu `uniky.mjs` (substring) — ponecháno, čeká na opravu měřidla
  nebo formátu.
- [skola2] Terminologie vaty: staré názvy „VZOR 1"/„VZOR 2" (22.–24. 9., desítky
  bloků) byly kalibrací 25. 9. přejmenovány/sloučeny na kvantifikátor / kategorické
  slovo / tázací slovo / polarita — zbývající práce (VZOR 3 kategorické slovo,
  VZOR 5 tázací slovo, viz sekce „26. 9. v noci" výše) se vede pod NOVÝMI názvy,
  staré počty bloků (37/32 aj.) už neplatí a neopisují se.

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 3. kolo — kontrolor V6)

- [skola2] **DALŠÍ KROK 22. 9. — chybějící složky prvního tématu napříč ročníky**
  (nález z `INVENTURA-TEMAT.md`, `OBSAH-PRAVIDLA.md` kap. 12): F7 `pohyb-a-rychlost`
  (4 podtémata) — chybí odkazy, video s animací, interaktivní infografika a hra u
  všech 4, laborka navíc u 2 (posuvny-otacivy-pohyb, priklady-na-vypocet-rychlosti);
  F8 `mechanicka-prace-a-vykon` (2 podtémata) — chybí video s animací, infografika
  a hra u obou, laborka u `mechanicka-prace`; F9 `magneticke-pole` (3 podtémata) —
  chybí video s animací, infografika, laborka a hra u všech 3. **STAV NEOVĚŘEN
  ZNOVU** (zápis je z 22. 9., od té doby proběhla přestavba dalších celků i
  podkasty) — než se bere jako úkol, přeměřit `node testy/nazornost.mjs` a
  obsah `odkazy`/`materialy` u těchto 9 podtémat.
- [Omega] K1-3: nedatovaný pád automatu v logu vypadá navěky čerstvý — `revize_automatu.py`
  má posuzovat stáří podle mtime souboru logu (`CHYBA_HORIZONT_DNU`), ne jen podle
  pozice v posledních 15 řádcích.
- [Omega] K1-6 (velký rozsah): 54× neatomický zápis stavového JSON (např.
  `nahraj_na_youtube.py:145`, `pipeline_sdilene.py:80`) — zavést sdílenou
  `zapis_atomicky()` a postupně nahradit.
- [Omega] K1-7: `npx astro build` obchází prebuild bránu `testy/obousmerne.mjs` —
  doplnit `spawnSync('node',['testy/obousmerne.mjs'])` do integrace
  brana-pred-buildem v `astro.config.mjs`.
- [Omega] K1-8: `test_f7_klid_zdroj.py` a `test_f8_pilot_mp4.py` padají v každé
  revizi automatů (chybí `sys.argv`/modul) — opravit na samostatně spustitelné
  nebo přesunout mimo `testy/`.
- [Omega] K1-9 (velký rozsah): nasazení kvízů bez otisku verdiktu kontrolora —
  zavést soubor s hashem posledního schváleného bloku `kvizy.ts`, `zkontroluj.mjs`
  odmítne build, když se otisk změněného bloku neshoduje s posledním „NÁLEZY: 0".
- [Omega] K1-11: staré `ZDRAVI-POHYBU.md`/`ZDRAVI-SESSION.md` tvrdí „vše OK", ačkoli
  jejich hlídače jsou vypnuté od 12. 9. — revize má hlásit zprávu starší než limit
  hlídače jako neplatnou.
- [Omega] K1-12: scénosledy podkástů mívají vadný JSON/špatný klíč celku/schema bez
  kresby — volat `kontrola_scenare.py` na začátku `automat_podkastu.py`/`nocni_fronta.py`
  a ověřit `cesta_na_webu` proti `temata.ts`.
- [Omega] K2-10-ts: `wonderly-web/src/data/cesty/preklady.ts` (seznam jazyků deníku)
  zůstává mimo sjednocení K2-10 (Python strana hotová) — doplnit test shody
  `JAZYKY == ('cs',) + JAZYKY_PREKLADU`.
- [skola2] Suno MP3 Wave 1 — **ověřeno 27. 9. 2026: stále jen 22/116 m4a nasazeno**
  (`find public/materialy/fyzika -iname '*.m4a' | wc -l`), stejně jako 6. 9. — žádný
  postup od Wave 1. Plné znění zadání v `PROGRESS-ARCHIV.md`.
- [skola2] 5 otevřených bodů z fyzikálních podkladů (1, 3, 10, 14, 15) — od
  27. 9. 2026 přímo v sekci „❓ Otevřené dotazy na učitele" nahoře (soubor
  `KE-SCHVALENI.md` archivován, plné znění je nyní tam a v
  `wonderly-web/docs/archiv/KE-SCHVALENI.md`).
- [skola2] Polemika F7 „Klid a pohyb tělesa" — **překážka s právy zápisu už
  NEPLATÍ** (`ls -la "/Users/Shared/Škola/podkasty"` 27. 9. ukazuje vlastníka
  `radek_soukromy`, dřív `radekmicek`). Oprava V8-2 (27. 9. 2026): scénáře
  (`klid-a-pohyb-telesa-relativnost-dialog` aj.), o kterých dřívější zápis
  tvrdil „hotové v `Omega/podkasty-scenare/7/`", na TOMTO Macu NEEXISTUJÍ
  (`ls`/`find` 0 výsledků, v gitu Omegy nic) — `PODKASTY-CHYBI-2026-09-27.md`
  vede `klid-a-pohyb-telesa` jako kategorii E (nic nezačato). Nejdřív ověřit
  Mac mini (git fronta / ssh mini) — pokud tam jsou, přenést; pokud ne,
  napsat scénáře znovu (jen právo zápisu do `Škola/podkasty` už nebrání).
- [skola2] Podkast F8 „Výkon" dialog3 — 6 replik zůstalo odložených po timeoutu
  (420 s) při výrobě 12. 9., 1 bez TXT — dodělat na pozadí (`Omega/ODLOZENE.md`,
  `Omega/dokumenty/DENIK-CHYB.md`, nadpis „F8 Výkon dialog3 transport420s").
- [skola2] `pokryti_kvizu.py` — `MODEL` je už `gemma4:31b` (ověřeno 27. 9., dřív
  neexistující `gemma4:26b`/rozbitý `~/bin/ask-local`) — spustit bránu na
  dřívější trojici podtémat a potvrdit 21/21 pokrytí.

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 4. kolo — kontrolor V8-1)

Ověřeno `Omega/dokumenty/NOCNI-FRONTA-VYSLEDEK.md` a `Omega/data/stav-animaci.md`
27. 9. 2026 — staré položky z 25. 9. byly smazané, ale podklad pro ně pořád platí
(čísla 23/12 níže jsou z 25. 9., NEPŘEMĚŘENO proti dnešní inventuře 70 podtémat,
viz „⚡ ČÍM ZAČÍT" výše — možný překryv, ne nutně součet):

- [skola2] 23 klipů animací pod prahem pohybu (10 unik. snímků / 1,5 s) + 3 scény
  s klíčem `animace`, ale bez hotového klipu — zdroj `Omega/data/plan-animaci.md`
  a `Omega/data/stav-animaci.md` (stav 25. 9., přeměřit).
- [skola2] 12 dílů podkástů bez videa nebo jen se zvukem (5 JEN AUDIO + 7 BEZ MÉDIÍ,
  ročníky 8–9: elektromagnet-dialog1–3, magnety-opakovani-dialog2–3,
  vodic-civka-dialog1–3, vykon-dialog1–4) — `stav-animaci.md` 27. 9. potvrzuje
  řadu „BEZ MÉDIÍ" záznamů u F8/F9 stále trvá.
- [skola2] **`vykon-dialog2` selhalo potvrzeno 3× i dnes** (`NOCNI-FRONTA-VYSLEDEK.md`
  27. 9.: „odloženo, selhalo 3×: neznámá chyba / timeout") — poslechnout a dodělat
  zvuk ručně, automat to sám nedokončí. `magnety-opakovani-dialog1` má stejný
  záznam v `NOCNI-FRONTA-VYSLEDEK.md` (selhalo 3×), ale `stav-animaci.md` ho vede
  jako hotové ANIMACE — rozpor mezi zdroji, ověřit ručně poslechem, který je aktuální.
- [skola2] 30. 9. 2026: 4 staré mp3 (8/vykon-dialog1–3, 9/vodic-civka-dialog1) přesunuty do zálohy `Omega/smazano-zaloha/2026-09-30/podkasty-stare/{8,9}/`; ještě brání novému vyrobení: (1) `Omega/skripty/data/automat-podkastu-stav.json` — `hotovo` obsahuje vykon-dialog1 a vykon-dialog3 (vodic-civka-dialog1 je v `odlozeno`); (2) hotová videa `Omega/podkasty-video/{vykon-dialog1,2,3,vodic-civka-dialog1}.mp4` (automat pak přeskočí bránu kvízu a bere je jako existující); (3) staré repliky `Škola/podkasty/<r>/<slug>-omnivoice-repliky/` (wav cache pro navázání) a `*.prepis.json`; (4) `Omega/podkasty-snimky/<slug>/`.

### 🆕 Nové položky fronty (15. 8. 2026) — cestovatelský deník a příprava

- [cesty] Doplnění starších fotek. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [cesty] Doplnění cest z minulých let. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- ~~[příprava] Vyzkoušet průzkumníka přes Hermese na lokálním modelu~~ ZRUŠENO —
  učitel 21. 9. 2026 delegaci na Hermese/GPT-5.5 zamítl („pracuje nekvalitně"),
  viz K3-R6 (rozpor opraven auditem 27. 9. 2026).
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md`
  směrem k lokálním modelům tam, kde to obstojí — PŘEFORMULOVÁNO 27. 9. 2026
  (V4-8): „podle prvního měření" mířilo na zrušený úkol s Hermesem výše, dnes se
  žádné takové měření nechystá; místo toho se řídit přímým srovnáním vision
  (položka níže) a běžnou zkušeností z `ollama-log.md`. Výchozí tabulka je
  zapsaná (15. 8. 2026).
- [příprava] Přímé srovnání vision: ThinkingCap vs qwen3.8:27b-mlx na jedné dávce
  ~10 map/fotek deníku (stejné obrázky, stejná otázka, `mapa_projde_kontrolou`);
  vítěz nahradí model v automatech. Zadáno 21. 9. 2026.

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### 📥 Nálezy z historie, dosud nevyřešené (přesunuto a otagováno 16. 8. 2026)

- ~~[skola2] Sjednotit odpor lidského těla mezi F8 a F9~~ VYŘAZENO Z FRONTY —
  učitel 25. 9. 2026 řekl „ta čísla odporu kůže na webu nedávej, počkej na mě":
  ⛔ NESAHAT, viz sekce „Fronta nápadů" níže (K3-R7, oprava 27. 9. 2026).
- [cesty] Ručně opravit pořadová čísla u 2 videí na kanálu (přání učitele):
  `u4NmKbMRhiE` a `9Sv4exafb-c` (tvar `01 · DD. MM. · …`) — stroj na ně
  nesahá, titulek psal učitel ručně.
- [cesty] Manifest médií deníku — pro každé místo strojový soupis (zdroje,
  GPS/čas, anonymizace, výběr do galerie/videa, otisk, odkazy); největší
  architektonické vylepšení deníku, samostatné kolo.
- [cesty] Atomická publikace galerií (`nahraj_fotky.py`) — nahrávat do nové
  verze a zveřejnit jedním manifestem, ať výpadek nenechá venku neúplnou galerii.
- [cesty] **Úplnost médií ve videích (manifesty)** — přeneseno z archivovaného
  `Omega/PLAN-PORADEK.md` kroku D2 (27. 9. 2026): u videí bez manifestu doplnit
  MANIFEST (seznam médií skutečně ve videu) a porovnat s albem/galerií — rozdíl
  znamená přestavět video; k tomu dvě konkrétní dvojice k ověření, jestli
  nejsou duplicitně pokryté: Saint-Sauveur ↔ Luxeuil a Neumagen ↔ Trittenheim.
- [cesty] **Denní kontrola „album+galerie+vklad ↔ manifest videa"** — přeneseno
  z archivovaného `Omega/PLAN-PORADEK.md`, sekce G bod 2 (27. 9. 2026): dosud
  jen jednorázový běh `poradek_medii.py` (26 médií do Le Lavandou, 10. 8. 2026),
  chybí pravidelné/denní měřidlo — navazuje na bod výše (manifest je vstup).
- [skola2] Typová kontrola (`astro check`) hlásí 5219 chyb — než se zavede
  jako brána, napřed hlášky probrat (samostatný úkol, ne desetiminutovka).
- [skola2] Telemetrii (zdravotní reporty automatů) přesunout do zvláštní
  složky/větve, ať je historie čitelná.
- [skola2] Sjednotit dokumentaci do tří vrstev (až nakonec, je v ní nasbírané
  know-how).
- [skola2] Skript `kontrola_navodu` — deterministická kontrola návodů
  (existence odkazovaných cest, zakázané opsané konstanty, mrtvé křížové
  odkazy); nahradí ruční smyčku po /clear.
- [skola2] Sloučit sandbox testů simulací — 23 kopií prologu (19 rozešlých
  variant, 767 řádků) do sdíleného `testy/sandbox-simulace.mjs` (do kořene
  testy/, NE do simulace/); postup po rodinách s mutací před/po každou.
- [skola2] Odkazy F9 `chemicke-zdroje-napeti` 4× doslova stejné jako u F8 →
  ❓ (viz sekce „❓ Otevřené dotazy na učitele" nahoře, V9-5).
- [skola2] **Brána pro nové simulace** (nález nedělního auditu 20.–23. 9. 2026).
  Do `zkontroluj.mjs` chybí kontrola, která by u KAŽDÉ nové komponenty
  `*Simulace` vynutila vlastní test s aspoň jednou netautologickou asercí. Dnes
  existují jen testy dopsané POTÉ, co se chyba našla (třída chyby
  `obsah-simulace`, 19 nálezů z 13. 8. 2026 u tří simulací). Pozn. pro toho, kdo
  to vezme: nové měřidlo musí mít obousměrný důkaz v `testy/obousmerne.json`,
  jinak shodí build, a musí být kalibrované na už přijaté práci (131 existujících
  komponent nesmí shodit bránu).
- [skola2] **Měřidlo šablon nevidí skládaná id** (nález nedělního auditu
  20.–23. 9. 2026). Brána hlásí „SestaveniRobotaSimulace: id se skládá výrazem,
  tahle část se neměří" — kontrola tedy tiše pokrývá jen část vstupů.
- [skola2] **Laťku kvízů lze utáhnout** (nález nedělního auditu 20.–23. 9. 2026).
  Brána hlásí zlepšení (612 otázek / 22 %, obří náskok správné odpovědi klesl na
  264 otázek) a nabízí `npm run prijmi-latku`. Utáhnout, ať se zlepšení nemůže
  vrátit zpátky.

> ⤵️ Starší blok (od původního řádku 235) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

> ⤵️ Otevřené dotazy na učitele jsou JEN v sekci „❓ Otevřené dotazy na učitele" na začátku souboru (V8-6, 27. 9. 2026) — sem se nezakládají nové.

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

`node testy/vypis-kviz.mjs <blok>` (vypíše VŠECHNY otázky — hledej duplicitní páry,
délkové měřidlo je neukáže) → `node testy/delky.mjs <blok> --odpovedi` (znění
i délky, dorovnává se bez čtení celého souboru) → opravit → kontrolor → brána →
build → push. Hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
třikrát zachytila, že se týž řetězec v souboru vyskytuje vícekrát nebo vůbec.

**Výjimka chudého podtématu (OBSAH-PRAVIDLA kap. 4, zapsáno 30. 9. 2026):** bloky
`fyzika/8-rocnik/tepelne-motory/tepelny-motor-parni-stroj` (20 otázek) a
`fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti` (19 otázek) se
nedoplňují na 21. Důvod: hlavní výklad nedává další látku bez úniků/duplicit
(3 pokusy, kontroly web-k2 a web-k3 tématu 3, 30. 9. 2026). Brána počtu 21 neexistuje
(kontroluje se v návodu, ne v kódu), build výjimku nepotřebuje.

> Pozn. 1. 8. 2026: pod tímhle nadpisem byla **podruhé zapsaná fronta úkolů**, která
> si protiřečila s frontou nahoře — a právě podle ní se ráno jelo dorovnávat kvízy,
> ačkoli audit z 31. 7. říkal, že skutečná díra je jinde. Nález auditora strategie.
> **Živá fronta je VŽDY jen v nejhornější sekci; otevřené dotazy na učitele jsou
> VŽDY jen v sekci „❓ Otevřené dotazy na učitele" na začátku souboru (V8-6).**

## Fronta nápadů (seřazeno podle priority)

### [drobnost] Dočasný profil Chromu zůstane v tmp po TERM/KILL (1. 10. 2026, kontrola stash F9, nález A)

`Omega/skripty/snimky_podkastu.py:~7395` (`_spust`, `tempfile.mkdtemp`) maže profil přes `atexit`; při SIGTERM/SIGKILL (např. timeout v `automat_podkastu.spust`) atexit neproběhne a `$TMPDIR/omega-chrome-*` (~2,8 MB) zůstane. Chrome sám nevisí (končí se zavřením roury). Důkaz: po TERM i KILL „profil ZUSTAL“, po INT smazán. Podrobnosti: `Omega/predavka/2026-10-01-den/kontrola-stash-f9.md` (A1). Oprava: signal handler pro TERM, nebo úklid starých `omega-chrome-*` při startu.

### [drobnost] Pojistka slugu jde obejít přímým spuštěním snimky_/animace_podkastu.py (1. 10. 2026, kontrola 3)

`skripty/snimky_podkastu.py:7256-7268` a `animace_podkastu.py:4996-5025` zapisují do `podkasty-snimky/<slug>` bez `over_kolizi_slugu` / kontroly značky ročníku; přímé volání dokumentuje `skills/podkast-video/SKILL.md:90`. Náprava (návrh): volat pojistku + `zapis_vlastnika` i v `main()` obou skriptů. Protokol: `Omega/predavka/2026-10-01-den/kontrola3-video-automatu.md` (nález 1).

### [drobnost] Značka ročníku slugu není atomická (1. 10. 2026, kontrola 3)

`automat_podkastu.py` a `dodelej_animace.py` mají různé zámky; zápis značky (`video_podkastu.py:88-100`, `exists()+write_text`) není atomický a po zápisu se nečte, čí značka vyhrála (okno teoretické). Náprava: zápis `O_EXCL` + po zápisu ověřit vlastní ročník, jinak KOLIZE. Protokol: tentýž soubor, nález 2 (důkaz `race.txt`).

### [drobnost] KE-SCHVALENI.md v deníku má 280 MB (zjištěno 27. 9. 2026, V18 kolo 2)

`/Users/Shared/Cestovatelský deník/KE-SCHVALENI.md` je append-only provozní log, do
kterého zapisuje ~13 automatů deníku (`Omega/skripty/*.py`, grep `KE_SCHVALENI`) —
27. 9. 2026 měl **280 954 572 bajtů**. Podezření: nějaký automat čte/zapisuje soubor
přes `read_text()`/append opakovaně a hromadí duplicity, nebo omylem zapisuje binární
obsah. Nejde o chybu blokující práci, jen prošetřit a případně soubor rozdělit/otočit
(log rotation), ať nezpomaluje čtení a needitovatelný soubor v editorech.

### [skola2] ⛔ NESAHAT — UČITEL ROZHODNE SÁM — odpor lidské kůže (zjištěno 25. 9. 2026)

→ ❓ (otázka „která verze PDF platí" je i v sekci „❓ Otevřené dotazy na učitele" výše,
V12-1, 27. 9. 2026) — **zákaz NESAHAT platí dál, beze změny, viz níže.**

**⛔ NESAHAT — UČITEL ROZHODNE SÁM** (řekl 25. 9. 2026: „ta čísla odporu kůže na webu
nedávej, počkej na mě"). Čísla na webu NECHAT PŘESNĚ TAK, JAK JSOU, nic nepřepisovat,
nedoplňovat ani nemazat — ani podle PDF, ani podle jiného zdroje. Platí pro `temata.ts`
(F8 ~2713, F9 ~3062–3063) i `kvizy.ts` (~4344–4361, ~4713–4723).

Průzkum narazil na to, že PDF podklad učitele (SmartBooks, „Účinky proudu na lidský
organismus") si SÁM SOBĚ odporuje v číslech odporu kůže: na jednom místě uvádí
„za sucha ~2000 Ω, za vlhka ~1000 Ω", na jiném místě téhož podkladu (8. i 9. ročník)
naopak „ve vlhku ~2000 Ω, v suchu ~150 000 Ω" — tedy opačný poměr sucho/vlhko i jiný
řád čísel. Chyba je v PODKLADU, ne na webu. NEPŘEBÍRAT čísla odporu kůže z tohoto PDF,
dokud to učitel nerozhodne, které místo/verze podkladu je správná.

Web dnes uvádí variantu „sucho ~150 000 Ω, vlhko/nad 50 V ~2 000 Ω" — tedy tu, která
odpovídá fyzice (vlhká kůže vede lépe, má tedy nižší odpor než suchá). Odpovídá druhé
z protichůdných verzí PDF. Druhá verze z PDF (sucho 2 000 Ω, vlhko 1 000 Ω) na webu
není a NEDOPLŇUJE se. Nic se needituje, jen k posouzení učitele.

> ⤵️ **Audit automatů video/podkásty (22. 9. 2026)** — jen evidence, „žádná technická
> akce se nenavrhuje" → přesunuto do archivu (K3-Z14, 27. 9. 2026).

> ⤵️ **Nekonzistence bezpečného napětí 8./9. ročník** — VYŘEŠENO 25. 9. 2026 (rozpor
> v datech nebyl, commit `9f44b1f`) — znění přesunuto do
> [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md), K3-Z13, 27. 9. 2026.

### [skola2] 🔒 Rohatka bez klíče tiše projde (zadáno 19. 8. 2026)

Brána `zkontroluj.mjs` čte stropy rohatek z `testy/rohatka.json` vzorem `?? Infinity`.
Když klíč v souboru chybí (překlep, ruční editace, poškozený nebo špatně slitý soubor),
strop se stane nekonečnem a měřidlo **mlčky projde** místo aby build shodilo — zmizí
celá kontrola a nikdo si toho nevšimne, protože build je zelený. Netýká se jen dnes
zavedeného klíče `pocetNaskok10`, ale VŠECH stropů v souboru, například `pocetNejdelsi`.
Řešení: chybějící klíč má být tvrdá chyba (build spadne s hláškou, který klíč chybí),
ne tiché Infinity — nové rohatky se pak musí zakládat vědomě, ne vzniknout nedopatřením.
Doloženo: nezávislý kontrolor 19. 8. 2026 při kontrole prahu délkové nápovědy — po
odstranění klíče brána skončila exit 0.

### [skola2] 🚴 Appka /tour — automatické přepínání mezi velkými závody (zadáno 4. 8. 2026)

Přání učitele: *„aby se to samostatně přepínalo na zrovna aktuální velké závody a vše
šlo automaticky — Vuelta a tak dále."* Rozpracované zadání, ověřený průzkum:

- **Tour, Tour Femmes i Vuelta mají TOTOŽNOU strukturu** (pořadatel ASO): `/en/rankings`
  s ajax adresami `itg`/`ite` i `racecenter.<doména>/api/…` (ověřeno 4. 8. 2026 — všechny
  tři vracejí HTTP 200). **Giro NE** (pořadatel RCS, `/en/rankings` vrací 404) — potřebovalo
  by vlastní parser, řešit až v druhém kroku.
- **Který závod běží, se nemusí hádat z kalendáře**: pro každou doménu zjistit etapu
  z `rankings`, zkusit `pack-<rok>-<etapa+1>` a podívat se na stáří pole `date`.
  Čerstvé (< 15 min) = tenhle závod se právě jede. Volbu závodu cachovat na hodinu,
  ať se to nedotazuje pořád dokola.
- **České jezdce hledat podle seznamu jmen**, ne podle národnosti v tabulce (ta tam není).
  Seznam ~15 českých profesionálů (muži i ženy) natvrdo v kódu, aktualizace jednou za rok.
  POZOR na diakritiku — hledat zkrácené tvary bez koncovky („NOSKOV", „VACEK", „ČERN"…),
  a ověřit, že zkratka nechytá cizí jméno.
- **Lokální modely (ollama) se sem NEHODÍ**: worker běží v Cloudflare, kam lokální model
  nedosáhne, a úloha není jazyková, ale deterministická. Jediné smysluplné využití AI by
  byl překlad anglického živého komentáře — a to by musela dělat Workers AI, ne ollama.
- Mimo sezonu musí stránka umět říct „právě se nejede žádný velký závod" místo pomlček.

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026 — sloučení dvou front, nález auditu)

Škola (web):
- [skola2] Zpřesnit brány kvízové kontroly: `zkontroluj.mjs` bod 6d má
  `const MALE = 12` a přeskakuje tak i menší desetinná čísla (past: 1,29 vs.
  1,23 kg/m³ neodhaleno) — snížit práh nebo přidat kontrolu desetinných čísel;
  do `zkontroluj.mjs` přidat měření náskoku délky správné odpovědi ≥10 znaků
  (`uniky.mjs` délkovou nápovědu nehlídá vůbec, hlásil 0 tam, kde bylo 5 úniků
  v 8 blocích). Zadáno 22. 9. 2026 noc při sladění kvízů 24 podtémat.
- [skola2] `zkontroluj.mjs`: počítadlo otázek (`^\s*text:\s*'`) nepočítá starší jednořádkový
  zápis kvízů — jen kosmetika výpisu, opravit regex (nález 28. 7. u F8 tepelná výměna).
- [skola2] Simulace „Rozpálená kolejnice" (dilatační spára, výpočet prodloužení) — F6/F8.
- [skola2] Simulace „Změř to rukou, nebo teploměrem?" (tři kádinky) — F6 teplota.
- [skola2] Generátor příkladů na průměrnou teplotu s grafem (celá čísla) — F6.
- [skola2] Doplnit kompenzátor (expanzní smyčku) do výkladu teplotní roztažnosti.

Deník:
- [cesty] Opravit 8 VAD z auditu webu 29. 7. (datum „červenec 2026" v EN/DE, neklikací
  piny bez JS, překryv pinů roků, atribuce mapy, video bez datové předpony,
  `satisfies` v preklady.ts) — drobné, bez rozhodování.
- [cesty] Připomínky učitele 29. 7.: úvodní mapa roku začíná doma (jižní Čechy) ·
  u karty místa jen jeho vlastní video · fotogalerie u míst 2026 (náhled + zvětšení).
- [cesty] Stará videa a fotky k bodům starších cest (zadání 2. 8., postup
  v `Cestovatelský deník/KE-SCHVALENI.md`) — začít bodem (a): `videa_k_mistum.py`.

Organizace:
- [skola2] Po sjednocení úložiště modelů znovu ostrý test `graf_local.py` (dva modely).

Čeká na rozhodnutí učitele (přestěhováno tamtéž):
- Smazat zbloudilé kopie v R2 — přesunuto do sekce „❓ Otevřené dotazy na učitele"
  nahoře (V9-2, 27. 9. 2026).
- ~~**Cloudflare Workers Build 16. 8. 2026 jednou spadl bez viditelné příčiny.**~~
  PRAVDĚPODOBNĚ VYŘEŠENO 26. 9. 2026 (V6-6, 27. 9.: „pravděpodobně", protože 16. 8.
  se konkrétní příčina buildu tehdy vůbec nezjistila — jde o usuzování, ne doložený
  týž kořen): mělký klon na CI (test četl git historii, Workers Builds ji nemá) —
  opraveno commitem `b7082e3`, viz sekci „26. 9. 2026 v noci" výše. Plné znění
  původního nálezu 16. 8. (edb1137, chybějící scope `wrangler` tokenu pro Builds API)
  v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md).
- [skola2] `wrangler` token scope pro Cloudflare Builds API → ❓ (viz sekce
  „❓ Otevřené dotazy na učitele" nahoře, doplněno auditem 27. 9. 2026).
- [cesty] Referenční tváře 2021 → ❓ (viz sekce „❓ Otevřené dotazy na učitele" nahoře).
- [cesty] Videa s hudbou dodatečně po nahrání na YouTube → ❓.
- [skola2] Rozhodovací tabulky z 29. 7. (laboratorní práce 12, nové simulace 10,
  UX školy 8) → ❓.
- [cesty] Rozhodovací tabulka z 29. 7.: mapa+poutavost deníku (14) → ❓.
- [cesty] 9 videí „k rozhodnutí" — přesunuto do sekce „❓ Otevřené dotazy na učitele"
  nahoře (V9-2, 27. 9. 2026).
- [skola2] Odkaz na video „Teplota a její měření – Fyzika 6" (v soupisu kanálu není) → ❓.
- [cesty] Shlukování popisků na úvodní mapě do čtverců → ❓ (viz sekce
  „❓ Otevřené dotazy na učitele" nahoře, doplněno auditem 27. 9. 2026).
- [cesty] **Hudba pod videa podkástů ze Suno** (návrh učitele 16. 8., má předplatné).
  Nerealizováno — vyžaduje přihlášení do jeho účtu Suno a stažení souborů; otázka
  rozsahu (znělka/podkres, jednotná/po dílu) → ❓.
  Upřesnění (16. 8.): předplatné Suno Pro, ~2000 skladeb zbývá z 2500/měsíc, komerční
  použití na kanálu povoleno. Cíl A: hudba/podkres pod videa podkastů — čeká se lepší
  kvalita než z lokálního modelu (dosavadní řešení: kreslené animace + ticho/jednoduchý
  podkres, viz [[projekt-animace-podkastu]]). Cíl B: existuje loňská básnička učitele,
  kterou nechal v jiném projektu (repu) přepracovat na písničku — rytmická, svižná;
  potřeba nastavit hlas/styl ve Suno tak, aby to NEZPÍVALY DĚTI (cílovka 2. stupeň,
  dětský zpěv by na ně působil nevhodně/nudně). Pokud se cíl B osvědčí, učitel chce
  zadávat další písničky přímo a přidávat je na web do míst, kde zatím hudba/píseň
  chybí. Realizace čeká, až bude učitel u počítače — přihlášení do Suno účtu a
  stažení výstupů vyžaduje jeho potvrzení v tu chvíli, nejde předschválit dopředu.
- [skola2] Fahrenheit — formulace (díl 8) → ❓.
- [skola2] Klementinum — rok rekordu (díl 8) → ❓.
- [skola2] Přeskoky v pořadí úvodních map videí (8×, `kontrola_poradi.py`) → ❓.
- [skola2] **Uzemnění — jednosměrná formulace** (viz nález #16). V `temata.ts`
  (~ř. 1196) i v kvízu `kvizy.ts` (~ř. 1574) stojí „Země přijme volné elektrony
  a těleso se vybije" — platí jen pro záporně nabité těleso, u kladně nabitého
  proudí elektrony opačně (ze Země do tělesa). Nový doklad: video dílu 10
  ilustruje právě kladně nabitou cisternu s benzínem, takže obrázek a text si
  u tohoto příkladu odporují (mluvený dialog se pasti vyhnul — mluví neutrálně
  o „odvedení přebytečného náboje"). Návrh: přeformulovat obousměrně na „náboj
  se odvede do země / vyrovná se se zemí". OPRAVIT podle tohoto návrhu (věcně
  správné pro obě polarity, dialogu neodporuje) — nečeká se na rozhodnutí.
- [skola2] **Značení magnetických pólů — N/S vs. S/J (rozpor napříč webem).** Text i kvíz
  značí póly anglicky: `temata.ts` ř. 1121 a 1140, `kvizy.ts` ř. 1453 a 1492 („severní
  (N — north, značí se červeně) a jižní (S — south)", „vycházejí z N a směřují k S").
  Video a dialog dílu 11 ale používají české S = severní (červená) / J = jižní (modrá)
  — všech 13 snímků. Písmeno „S" tak v textu znamená jižní pól a ve videu severní pól,
  tedy přesný opak. Žák, který si pustí video i přečte text, to má proti sobě. Týká se
  i tématu `magneticke-pole` (temata.ts ř. 3885, 3895), nejde o ojedinělý překlep.
  Doporučení: sjednotit na české S/J (běžné v českých učebnicích) a v textu jednou
  větou zmínit, že na koupených magnetech bývá anglické N/S, kde N = severní.
  OPRAVIT: sjednotit na české S/J podle videa (dominantní ve všech 13 snímcích) a
  doplnit větu o anglické konvenci N/S — oprava je mechanická (text + kvíz, videa
  konvenci už mají), nečeká se na rozhodnutí.
- [cesty] **`MISTA.xlsx` otevřený v Excelu** ukazuje starou kopii — zavřít bez ukládání
  (akce pro učitele, ne pro automat).

### [cesty] 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (posouzeno, čeká na pokyn)

> Stručná otázka je i v sekci „❓ Otevřené dotazy na učitele" nahoře — plná
> analýza a navržené pořadí kroků je tady.

Učitel navrhl dát značkám „něco jako referenční fotky obličejů", ze všech států
a v mnoha velikostech. **Posouzeno odborně: tudy ne, ale jádro nápadu je dobré.**

- Reference obličejů řeší **identifikaci** (čí tvář to je), ne hledání. Detekci
  dělá jiný model a reference k ní nepotřebuje.
- U SPZ neselhává identifikace (značky se rozmazávají všechny stejně), ale
  **detekce** — dnešní Haar kaskáda `haarcascade_russian_plate_number.xml`
  hlásí střechu, plot, lavičku i terasu (doloženo v `data/pecliva-videa.log`
  31. 7., dvě zamítnutí po sobě). Katalog vzorů by nepomohl: kaskáda neporovnává
  obrázek s obrázkem, hledá jen přechody světla a tmy. Různé velikosti navíc
  už řeší `detectMultiScale` sama.
- **Co pomůže:** hledat značky jen UVNITŘ nalezených aut (střecha ani plot
  v autě nejsou) — bez cizího `.pt` modelu, který je vědomě zakázaný.
- **Z nápadu si vzít tohle:** sada značek z různých států a velikostí jako
  **zkušební sada pro měření**. Dnes nikdo neví, kolik značek automat přehlédne,
  a bez měření nejde zlepšení doložit.
- Navržené pořadí: (1) změřit dnešní stav na zkušební sadě, (2) přidat kontext
  auta, (3) přeměřit. Čeká na pokyn učitele.

### Další úkoly
- [skola2] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [skola2] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [skola2] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)

### ODLOŽENO: detektor tajemství propustí hodnotu bez uvozovek s „(" hned za ní (audit 27. 9. 2026)
`Omega/skripty/zaloha_git.py` (`_tajemstvi_mimo_python`, ř. 205–210) — pro
nekótovanou hodnotu (shell/.env tvar) se celý nález zahodí, pokud hodnota
OBSAHUJE „(" kdekoli (`if "." in hodnota or "$" in hodnota or "(" in hodnota:
continue`), ne jen bezprostředně za koncem tokenu — skutečný token zakončený
nebo doprovázený „(" (např. odřezek shellové substituce) tak unikne detekci.
Řešeno už 3× (V7→V10→V13→V16, viz komentář v kódu u `_VZOR_E69BBA1`), princip
regexu se dál neupravuje; oprava vyžaduje stejný „dočti zbytek a zeptej se na
POZICI" postup jako `_tajemstvi_obecnym_vzorem`, jen pro tuto (`.env`) větev.

### 2 drobnosti dokumentace (audit 27. 9. 2026, `Omega/dokumenty/audit-2026-09-27.md`)
- K1-11: `ZDRAVI-POHYBU.md` z 12. 9. tvrdí „Práce se hýbe, nic nestojí", ale
  jeho hlídač byl vypnut týž den — starý soubor lže o stavu, doplnit datum/
  poznámku o vypnutí nebo smazat zastaralý zápis.
- K3-Z17 (`SKILL.md` „POSTUP PRÁCE S KVÍZY"): zkrácení NEPROVEDENO — malá
  úspora, riziko ztráty provozní znalosti; ověřit znovu proti aktuálnímu
  `OBSAH-PRAVIDLA.md` a případně zkrátit na pointer.

### velke_do_fronty z opravy-b/c (kontrolorem označeno „velikost: velká", audit 27. 9. 2026)
Z `opravy-b.json`/`opravy-c.json` (nezávislý kontrolor, K1/K2 nálezy nad rámec
hlavních 3 zadaných): K1-6 neatomický zápis stavového JSON na 54 místech
(sdílená `zapis_atomicky()` + postupná náhrada); K1-9 otisk (hash) verdiktu
kontrolora vázaný na build `kvizy.ts` (zásah do `wonderly-web/zkontroluj.mjs`);
K1-7 doplnit `testy/obousmerne.mjs` do `astro.config.mjs` brány před buildem;
K1-8 opravit/přesunout padající `test_f7_klid_zdroj.py` a `test_f8_pilot_mp4.py`;
K1-12 zapojit `kontrola_scenare.py` do `automat_podkastu`/`nocni_fronta`;
K2-10-ts sjednotit `preklady.ts` (wonderly-web) se seznamem jazyků v Pythonu
(mimo write-scope tehdejšího exekutora C).

### Polemika F7 „Klid a pohyb tělesa" — zvuk nejde vyrobit z účtu radek_soukromy (10. 9. 2026)

**Hotovo a připraveno k převzetí** (nic z toho se neztratilo):
- tři scénáře trojice v `~/Desktop/Omega/podkasty-scenare/7/`:
  `klid-a-pohyb-telesa-relativnost-dialog`, `-trajektorie-dialog`, `-draha-dialog`
  (2 872 / 2 783 / 2 644 znaků, tedy pod stropem 4 700)
- ke každému hotový `.scenosled.json` se štítkem `"skupina": "klid-a-pohyb-telesa-7"`
- **pokrytí kvízu 21 z 21 otázek doloženo**; brána sama hlásí 19, protože jí u dvou
  otázek chybí model (viz nález níže) — doplňkové posouzení udělal `qwen3:8b`
  a bylo ověřeno obousměrně (ANO na to, co ve scénáři je; NE na jednotku síly
  a hustotu, které tam nejsou)
- nezávislý kontrolor scénářů: 2 nálezy, oba opraveny (krkolomná věta, foneticky
  nesmyslný omyl „es jako sto" nahrazen typickou žákovskou chybou „dé jako dráha")

**OPRAVA V8-2 (27. 9. 2026):** na TOMTO Macu tyto tři soubory v
`~/Desktop/Omega/podkasty-scenare/7/` dnes NEEXISTUJÍ (`ls`/`find` 0 výsledků,
v gitu Omegy žádná historie) — buď zůstaly na Mac mini (ověřit tam), nebo se
ztratily. „Nic z toho se neztratilo" (výše) neplatí bez dalšího ověření.

**Na čem to stojí — dvě nezávislé překážky, obě mimo dosah této session:**
1. **PŘEKONÁNO** (viz ř. 419 výše a bod „OPRAVENO V8-2" níže) — tvrzení, že
   `vyrob_omnivoice.py` neumí zapisovat do `/Users/Shared/Škola/podkasty/<rocnik>/`,
   protože složka patří `radekmicek`/neexistuje, byl stav z 10. 9. 2026. Od 27. 9.
   patří složka `radek_soukromy` a v ní jsou produkční mp3/přepisy — zápis funguje.
2. Most na druhý účet (`/Users/Shared/Claude-most/`), kterým by se práce dala
   předat, **neexistuje** — takže ani obchvat není otevřený.
   **AKTUALIZACE 27. 9. 2026 (K3-R16):** na MacBooku `/Users/Shared/Claude-most/`
   i `~/bin/ask-local` DNES EXISTUJÍ (`ls` ověřeno) — zápis z 10. 9. se týkal
   patrně jiného stroje (mini) nebo mezitím vznikly.
   **OPRAVENO (V8-2, 27. 9. 2026):** práva zápisu na `Škola/podkasty` už BYLA
   ověřena znovu — `ls -la` ukazuje vlastníka `radek_soukromy` (dřív
   `radekmicek`), překážka č. 1 NEPLATÍ. Krok „ověřit práva znovu" tedy odpadá,
   viz sekce „🆕 Znovu zařazeno do fronty, 3. kolo" výše.

**Vyzkoušeno (2 různé přístupy, dál se netočím):** přímá výroba pod tímto účtem
(napoprvé zastavena pojistkou paměti — správně, model `qwen3:8b` držel 11 GB;
po jeho uvolnění selhala na právech) · předání přes most (most není).

**Zbývá dodělat, až bude cesta otevřená:** zvuk 3 dílů · 12 nových schémat
(k tématu klid/pohyb/trajektorie/dráha neexistuje ani jedno z 307 hotových —
názvy kreseb jsou už zapsané ve scénosledech) · videa · nahrání do R2 · zápis
do `temata.ts`.

**Rozhodnout musí učitel:** OTÁZKA ODPADÁ (sjednoceno V9-5+V12-3, 27. 9. 2026):
`Škola/podkasty` už patří `radek_soukromy`, „radekmicek, nebo práva pro
radek_soukromy" je bezpředmětné. Zbývající úkol (ověřit/najít scénáře, případně
napsat znovu) je ve fronta sekci „🆕 Znovu zařazeno do fronty, 3. kolo" výše
(položka „Polemika F7 Klid a pohyb tělesa"), NENÍ to dotaz na učitele.

### Nález u brány `pokryti_kvizu.py` — nikdy se nezeptá modelu (10. 9. 2026, mini)
**AKTUALIZACE 27. 9. 2026 (K3-R16):** na MacBooku `~/bin/ask-local` DNES EXISTUJE
(`ls` ověřeno) — nález z 10. 9. platil pro Mac mini, ověřit tam znovu, než se
oprava považuje za hotovou.
Brána volá `~/bin/ask-local`, jenže **ten soubor tehdy neexistoval** (ověřeno `find`
přes ~/bin, Omegu i /Users/Shared). Každá otázka, která neprojde porovnáním slov,
proto vždy propadne jako nepokrytá — hlášku „lokální model není k dispozici, beru
jako nepokryté" nelze odlišit od skutečné díry. Druhá vada: `MODEL = "gemma4:26b"`,
ale ten model na mini vůbec není stažený (`ollama list`: bge-m3, llama3.1,
qwen3:8b, gpt-oss:20b) a s 24 GB RAM by se tam podle pravidla přesnosti ani
neměl cpát. Dokud se obojí nespraví, hlásí brána falešné díry — u této trojice
2 z 21. Oprava je zásah do měřidla, patří k ní obousměrný důkaz.

> Hotové logy dávek revize starších simulací (22. 8. 2026, 37/37 dokončeno) přesunuty do archivu.

> ⤵️ „Zkontrolováno" (audit infografik 23. 7.) a „Hotová vylepšení" (Ozobot 22. 8.)
> přesunuto do archivu — K3-Z14, 27. 9. 2026.

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


> Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026) a úklid 22. 8. 2026 večer:
> migrace do git fronty `wonderly-fronta/prijate/` ověřena hotová (soubory
> `cesty-9-fotek-saint-sauveur-uklid.md`, `cesty-poloha-zastavky-po-uklidu-zhrubne.md`,
> `cesty-kontaktni-list-anonymizace.md` tam existují) — znění přesunuto do archivu,
> nové úkoly PRO LOKÁLNÍ GRAF/HERMESE zakládat ve `wonderly-fronta`; fronta práce
> Claude session zůstává tady, viz `~/.claude/skills/wonderly/START.md` (V19, 27. 9. 2026).

> 30. 9. 2026 (exekutor): podkast 9/elektromagnet-dialog1 — kontrola animací kolo 3 SCHVÁLIT, scénář schválen (schval_scenar.py, PLATNÉ). Video vyrobeno BEZ nasazení: `Omega/podkasty-video/elektromagnet-dialog1.mp4` (1:48 = zvuk 108,44 vs 108,42 s), over_vyrobene_video prošla (technicky; děj vizuálně ověřil kontrolor). Výroba přímo `video_podkastu.py … --casovani wav` (výchozí whisper dal scénu 0 o 4 snímky delší než klip; automat_podkastu.py se zasekl v bráně pokryti_kvizu čekající na GPU). ČEKÁ: nasazení = `nasad_video.py <mp4> --rocnik 9 --tema magneticke-pole/elektromagnet` (R2 + odkaz do temata.ts) a `publikuj_odkazy.py` (commit jen temata.ts) — dosud NEprovedeno.

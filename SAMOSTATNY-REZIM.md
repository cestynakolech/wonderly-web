## ⚡ ČÍM ZAČÍT — aktualizováno 18. 10. 2026 (audit)

- **Předávka:** nejnovější `Omega/predavka/*/PRIKAZ-NOVA-SESSION*.md`; před každou úlohou curl inventura živého webu ([[feedback-zivy-web-pred-vyberem]]). Starší odkazy na předávky 6./13./14. 10. → PROGRESS-ARCHIV.md § „Přesunuto ze SAMOSTATNY-REZIM 18. 10. 2026“.

- **WONDERLY AUDIT 18. 10. 2026:** opravy A (dokumentace), B (pravidla, test vrátného rc=0), C (třídy chyb) hotovy, nezcommitováno — `Omega/predavka/2026-10-18/OPRAVA-*.md`. Startovní čtení 107 952 → viz PROGRESS Historie. Fronta 📌: opravit `revize_automatu.py` (falešně hlásí 17× „POZASTAVENO, ale běží“ — launchctl to nepotvrdil).

- **Codex:** rozdělení `Omega/koordinace/ROZDELENI.md`, kontext `CODEX-KONTEXT-WEBU.md`; Jev — souhlas učitele 30. 9. s podmínkou; mini GPU funkční. **Noční fronta:** animace + podkasty zapnuty 30. 9.


📌 Pořadí (učitel 29. 9. 2026): téma po tématu napříč 7./8./9. ročníkem — 1. téma všech tří kompletně (úvod, výklad, zápis, obrázky, kvíz, písnička, video), pak 2. téma…; 6. ročník až po nich.

🟡 VRÁTNÝ orchestrator-guard.sh: ř.65 bere basename+lowercase → projde /tmp/x/GIT;
ř.79 rm s ORCHESTRATOR_ON propustí i další cíle (rm -rf X ~/.claude/ORCHESTRATOR_ON
→ ALLOW). orchestrator-prompt.md:48–56 rozpor s _SPOLECNE.md § Izolace jen
popsán, ne odstraněn (jeden platný návod) + zalomená cesta.


## ❓ Otevřené dotazy na učitele (jediná sekce, oprava V8-6, 27. 9. 2026)

- **18. 10. — `cz.wonderly.dodelej-animace`** je znovu načten (exit 1): nechat, nebo vypnout kvůli duplicitě s noční frontou?


- **14. 10. 2026 (dávka 10) — dotazy:** (a) výklad podtématu alternativni-motory: věta „všechny čtyři doby probíhají současně“ nesedí na 3 komory Wankelova motoru (`Omega/predavka/2026-10-14/W38-kontrola3.md`) — upravit výklad? (b) infografika chemicke-zdroje-napeti je hotová, čeká na rozhodnutí o podtématu; (c) animace W26 (priklady-na-vypocet-rychlosti-dialog, posuvny-otacivy-pohyb-dialog2) ODLOŽENO po 4 pokusech — dokončit po renderu s meridlo_deje.

- **14. 10. 2026 — nové dotazy (podrobně `Omega/predavka/2026-10-14/PREDAVKA-14-10.md`):** (1) Cloudflare Always Use HTTPS (viz níže); (2) 20 dalších odkazů ČT edu vede na video + 3 nefunkční (`predavka/2026-10-13/vlna1/KONTROLA-5b9d5e2.md`) — odstranit? (3) laborka pro kvarky nedává smysl (zrušeno) — vyjmout z měřidla? (4) doplňky ke shrnutím (laborka pololetni-shrnuti F8 napsaná, POZASTAVENA) — dělat? (5) obr-11 u alternátoru má čísla mimo výklad; (6) úvod těžiště „prst podpírá těžiště“ — těžiště je nad prstem; (7) lab.wonderly.cz vrací 403 na požadavky bez User-Agent (Cloudflare ochrana proti botům?) — souvislost se školními PC ověřit.

- **13. 10. 2026 (vlna 1) — dotazy:** (1) odkaz na video ČT edu v temata.ts ~ř. 2668 (zákon zachování energie) porušuje zákaz cizích videí — odstranit? (2) 4 podtémata bez vhodného českého odkazu (ucinnost, alternator, elektromotor, vlastnosti střídavého proudu); (3) nesoulad výkladu a kvízu pololetí F9 (temata.ts ~3621 × kvizy.ts ~6154); (4) necommitovaná stará zamítnutá `SilaInfografika.astro` (v1) — odstranit? (5) scénář 8/rocni-shrnuti ODLOŽEN (3× neprošel), rozhodnout spolu s 7/rocni-shrnuti. Podrobně `Omega/predavka/2026-10-13/PREDAVKA-VLNA1.md`.

- **14. 10. 2026 — Cloudflare „Always Use HTTPS“ (učitel):** zapnout v nastavení Cloudflare (SSL/TLS → Edge Certificates); diagnostika `Omega/predavka/2026-10-13/NEZABEZPECENA-STRANKA.md`.

- **3. 10. 2026 (b) — video NotebookLM „Tání“ (8. ročník):** kontrola `Omega/predavka/2026-10-03/kontrola-video-tani.md` = použitelné, 2 střední vady (teploměr na snímku 2 má nesmyslnou stupnici, „L_t“ na snímku 11 s podtržítkem). Volba: **A přegenerovat (doporučeno)** / B použít tak, jak je / C nepoužít; k tomu rozhodnout licenci (podmínky použití videí z NotebookLM).

- **K1 — [téma 5] Po209 v PDF Radioaktivita s. 9** má poločas 0,000 000 3 s (zřejmě záměna izotopu; v žákovském textu vypuštěno) — co s tím? (podrobnosti: `Omega/predavka/2026-10-01-noc/kontrola-codex-b12.md` § K1: a) opravit na Po212, b) ponechat Po209 a uvést asi 125 let, c) polonium vynechat = současný stav)

- **[téma 3] a)** Nakloněná rovina a Klín: ve Škole k nim není PDF ani prezentace (prohledáno i v ZIPech). Návrh textu nakloněné roviny z dosavadního webu je v `f7-naklonena-rovina.json` (vzorec a čísla jen v Pro zvídavé); stránka na webu zůstala beze změny. Dodá učitel podklad, nebo potvrdí učení z dosavadního webu?
- **[téma 3] b)** Odchylky od PDF opravené na fyzikálně správné znění (přehled v `odchylky-od-pdf.md`): mazání pístu v olejové vaně, šipky akce/reakce, sůl „vznikají ionty“, rychlost rakety 28 000 km/h, SO⁴⁻ — ke schválení.
- **[téma 3] c)** Termistor „v hutích“ (PDF Polovodiče s. 9) — ponecháno, ověřit.
- **[téma 3] d)** Simulace těžiště používá ilustrační čísla (náklaďák kola 180 cm, těžiště 150 cm → 31°; formule 200 cm, 30 cm → 74°), v PDF nejsou — ke schválení.
- **[téma 3] e)** Kapaliny: doplněná zmínka o tavenině (výroba hliníku) nad rámec PDF — ponechat/vypustit.

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
  ve výkladu/kvízu, nebo vyřadit? (Kvíz `kvarky` vyřízen 13. 10. 2026: výjimka 14 otázek zapsána v OBSAH-PRAVIDLA kap. 4.)
- [skola2] Podtémata bez názornosti u shrnutí (7, ověřeno `node testy/nazornost.mjs`
  27. 9.) — dělat přehledovou infografiku, nebo je z měřidla vyjmout? Stejná otázka
  platí i pro podkasty/video u týchž shrnutí (viz „⚡ ČÍM ZAČÍT" výše).
- [skola2] Odpor lidské kůže (F8/F9): ⛔ NESAHAT, plné znění v sekci „[skola2] ⛔ NESAHAT — odpor lidské kůže“ níže (přesunuto auditem 11. 10. 2026).
- [Omega] **`povoleni_hook.py` není zapsaný v `~/.claude/settings.json`** — platí jen
  ve `Škola/.claude/settings.json` (`PreToolUse '*'`); session spuštěná přímo z Omegy
  nebo z wonderly-web běží bez vrátného a bez černé listiny (nález K2-1). Návrh zápisu
  (jednořádkový příkaz) je v `Omega/dokumenty/audit-2026-09-27.md` (sekce K2-1, V9-4).
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
- [Omega] **U16 znovu otevřeno (audit 18. 10. 2026):** `MEMORY.md` (Škola) má 138 ř. / 21 250 B > cíl 20 000 B — zhustit. Historie U1–U16/V18 → PROGRESS-ARCHIV.md.
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
- (24. 10. 2026, W115 panely Elektrický náboj v pohybu, #172) PDF lekce 18 (FYZIKA 8, „Elektrický náboj, elektrování těles…“, s. 12–15; jiný zdroj – prezentace ani ŠVP fyziky – v /Users/Shared/Škola není) NEDOKLÁDÁ: (1) P1 rozdělení přebytečných elektronů mezi dvě kovové koule (PDF jen obecně „elektrony se přesunují při dotyku“, s. 12, a „kovy vedou“, s. 13); (2) P3 neutralizaci KLADNÉ koule elektrony přitékajícími ze Země (PDF s. 14 jen záporné těleso – Země přijme elektrony); (3) P3 drát držený za izolující plastovou rukojeť. Doloženo: kov vede/plast ne (s. 13), neutralizace dotykem opačných stejně velkých nábojů (s. 15), vybití záporného tělesa do Země (s. 14). Otázka: ponechat (1)–(3) jako zjednodušení na úrovni ŠVP, nebo je z panelů vyřadit? Do rozhodnutí se W115 nenasazuje. Citace: /tmp/wonderly-workery/w115/ZDROJ-lekce18.md.

## 📌 Živé zadání, fronta a reference

- **FRONTA (rozhodnutí učitele 4. 10. 2026, plán do hotového webu):** (1) nové video NotebookLM Tání 3–4 min s opravami (Cín, led plave, J/kg, sůl, délka). (2) Teplota Slunce na 4 500 °C podle PDF. (3) Zápisy do sešitu (pár řádků dle OBSAH-PRAVIDLA § zápis): 7, 8, 9 dokončit, pak 6. ročník (31 podtémat, zápisy chybí). (4) Po hotovém webu KVÍZY S OBRÁZKY, po tématech napříč 7/8/9 (téma 1 v 7., 8., 9., pak téma 2 …), nakonec 6. ročník. Pracovat samostatně.
- **DROBNOST (kontrola-6e46c77.md):** šipka 5 N v TreniSimulace na telefonu neviditelná, legenda ji slibuje.
- **DROBNOST (kontrola-uniky-paralel-rovina.md):** paralel: 3 starší nepřímé vazby 19→13, 10→2, 9→1.
- **DROBNOST (opravy-simulaci-kolo4.md):** SilaVektor: chybí legenda pro 3 malé popisky.
- **FRONTA:** do zadání agentů přidat zákaz `git stash` ve sdíleném repu (`Omega/predavka/2026-10-03/zapis-kviz-rychlost.md`).
- **NotebookLM bonusová videa a Suno písničky zadávat po tématech (1–4); nejdřív inventura existujících** (inventura 2. 10. 2026: `Omega/predavka/2026-10-02/inventura-notebooklm.md`).
- **Nevyřešené DROBNÉ/ODLOŽENO z 30. 9.–2. 10. 2026** (kontroly k3/k4/k6/k7, téma 1 a 2, ZVUK/PŘERUŠENO/DIAGNÓZA, „Fronta téma 3/4“, ODLOŽENO (a)–(f)): přesunuto auditem 11. 10. 2026 do SAMOSTATNY-REZIM-ARCHIV.md, plné znění s cestami k protokolům tam.
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

Pravidla přestavby: `OBSAH-PRAVIDLA.md` kap. 3, 12–14; pořadí „téma po tématu napříč 7./8./9.“ viz 📌 Pořadí v ⚡ nahoře. Původní bloky A–E a definice „hotového tématu“ → PROGRESS-ARCHIV.md. **NIC SE NEMAŽE.**

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

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 4. kolo — kontrolor V8-1)

- [skola2] Podkasty bez videa / klipy animací pod prahem: přeměřit `Omega/data/stav-animaci.md` (zápisy z 25.–27. 9. zastaraly — vykon-dialog1–4, elektromagnet-dialog1, vodic-civka-dialog1–3 mají video); `vykon-dialog2` a `magnety-opakovani-dialog1` (rozpor zdrojů) ověřit poslechem. Původní znění → PROGRESS-ARCHIV.md.

### 🆕 Nové položky fronty (15. 8. 2026) — cestovatelský deník a příprava

- [cesty] Doplnění starších fotek. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [cesty] Doplnění cest z minulých let. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md`
  směrem k lokálním modelům tam, kde to obstojí — PŘEFORMULOVÁNO 27. 9. 2026
  (V4-8): „podle prvního měření" mířilo na zrušený úkol s Hermesem výše, dnes se
  žádné takové měření nechystá; místo toho se řídit přímým srovnáním vision
  (položka níže) a běžnou zkušeností z `ollama-log.md`. Výchozí tabulka je
  zapsaná (15. 8. 2026).
- [příprava] Přímé srovnání vision: ThinkingCap vs qwen3.8:27b-mlx na jedné dávce
  ~10 map/fotek deníku (stejné obrázky, stejná otázka, `mapa_projde_kontrolou`);
  vítěz nahradí model v automatech. Zadáno 21. 9. 2026.

### 📥 Nálezy z historie, dosud nevyřešené (přesunuto a otagováno 16. 8. 2026)

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
- [omega] **Drobnosti z úklidu profilů Chromu** (kontrola zelená, Omega commit
  `00c7be0`, zdroj `Omega/predavka/2026-10-02/prace/kontrola-00c7be0.md`):
  (D1) test `test_nevyhodnotitelny_zamek_se_nemaze`
  (`Omega/testy/test_pojistka_jedno_misto.py:291-293`) zakládá zámek až po
  `os.utime(-2 h)`, takže se profil přeskočí kvůli stáří, ne kvůli zámku;
  (D2) větev `PermissionError` z `os.kill` (`snimky_podkastu.py:7295`) nemá test
  (návrh `os.kill(1, 0)`); (D3) počítadlo `smazano` (`snimky_podkastu.py:7323-7324`)
  roste i po neúspěšném `rmtree(ignore_errors=True)`.

> ⤵️ Starší blok (od původního řádku 235) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

> ⤵️ Otevřené dotazy na učitele jsou JEN v sekci „❓ Otevřené dotazy na učitele" na začátku souboru (V8-6, 27. 9. 2026) — sem se nezakládají nové.

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

Domov: `OBSAH-PRAVIDLA.md` kap. 4 (vč. „chudého podtématu“); nástroje `node testy/vypis-kviz.mjs <blok>`, `node testy/delky.mjs <blok> --odpovedi`. Původní znění a pozn. 1. 8. → PROGRESS-ARCHIV.md.


## Fronta nápadů (seřazeno podle priority)

### [odloženo] Zbytek po opravě 4 úniků (2. 10. 2026)
- Automat `Omega/skripty/trideni_uniku_krizove.py` zůstává jen PŘEDFILTR s ruční kontrolou (přesnost 7/10 na held-out, nezapojovat do bran): `Omega/predavka/2026-10-02/trideni-uniku-v3.md`, `prace/kalibrace-trideni.md`.
- Drobnosti z `Omega/predavka/2026-10-02/prace/kontrola-rada-pojistka.md`: mutace v `automat_podkastu.py:627` bez testu; hláška ve `video_podkastu.py:134` (výroba snímků s ročníkovou cestou není zapojena).

### [drobnost] Teplo F8: 3 zbylé nálezy kola 3 (3. 10. 2026, `Omega/predavka/2026-10-03/kontrola-teplo-f8-kolo3.md`)
- Z1: správná odpověď Q5 (vzorec Q = m · c · (t₂ − t₁)) napovídá nevýpočetní Q7/Q8 (víc m / větší rozdíl → víc Q); vazba je jádrem učiva, jen evidovat.
- Z2: správná odpověď Q10 (ohřátí 1 kg o 1 °C) napovídá jednotku v Q11 (jmenovatel kg · °C); vlastní vazba učiva, jen evidovat.
- Z3: vysvětlení Q11 jen popisuje zápis jednotky a neříká „proč“ (OBSAH-PRAVIDLA.md:265); možná oprava bez úniku přes c = Q : (m · Δt) → J : (kg · °C).

### [drobnost] kontrola_uniku_mini a ochranné pásmo — zbytky po opravách (3. 10. 2026)
- (a) test `kontrola_uniku_mini` nepozná podřetězec sedící na 1 blok („odraz-svetl“ → 21).
- (b) ostrý běh `kontrola_uniku_mini` ověřuje další blok až po práci na předchozím a výsledky se ztratí.
- (c) ochranné pásmo: zdůvodnění odkazuje na § 46 odst. 3 a 8, účel je v odst. 1; podobné formulace se opakují v definici, větě „pravidlo pro stavby a práce“ a vysvětleních `kvizy.ts` 5126/5130.

### [fronta] Fronta po 3. 10. odpoledne (doklady v `Omega/predavka/2026-10-03/`)
- FRONTA: opravit ~34 skutečných drobných úniků z uniky-v-bloku (seznam v `Omega/predavka/2026-10-03/kalibrace-uniky-v-bloku.md`), pak měřidlo zapojit do prebuild.
- FRONTA: doladit práh měřidla u tříslovných odpovědí (únik 2 ze 3 slov propadne) a únik do distraktoru (`kontrola-56c1b08.md`).
- FRONTA drobnost: reostat (`kvizy.ts:4618`) má jako distraktor doslova správnou odpověď potenciometru; posoudit, jestli je to záměr.
- FRONTA: homebrew whisper rozbitý (numba × NumPy 2.5); automaty používají venv a fungují; až vyjde nová numba, brew upgrade (`oprava-whisper.md`).
- Drobnost: zápisový protokol davka6 uvádí #39 místo #38.

### [fronta] Fronta po 3. 10. pozdě večer (doklady v `Omega/predavka/2026-10-03/`)
- F7: 2 podtémata přišla o odkaz Techmanie (nad úroveň) — náhrada: pohyb HOTOVO (výklad ucim-se.webnode.cz + test zsadolfovice, `kontrola-nahrady-odkazu-f7.md`); tíha bez náhrady (nic vhodného nenalezeno), zůstává s 1 odkazem. Doklad: `Omega/predavka/2026-10-03/oprava-odkazu-f7-f9.md`.
- Úniky paralel (vysvětlení č. 13, 18, 19) a nakloněná rovina (vysvětlení č. 2, 12, 19) — `kontrola-vady-d1-d6.md`.
- SVG N7 mřížka uhlíku `vnitrni-energie-obr-01` (věcná chyba); N6 bublina `pohybova-03` (`kontrola-5a9952f.md`, `kontrola-de827ed.md`).
- SilaVektor: bílý text „bedna“, kontrast 3,6.
- Reostat `kvizy.ts:4618`: distraktor = odpověď potenciometru.
- `uniky.mjs:906` mlčí při cestě se symlinkem nebo diakritikou.
- Test uniky-v-bloku nechytí 3 mutace (`kontrola-f261481.md`).
- Práh uniky-v-bloku u tříslovných odpovědí.
- Hlídač session nepozná agenta čekajícího na dotaz (6 h stání 3. 10.).
- Homebrew whisper rozbitý (`oprava-whisper.md`).
- ODLOŽENO: 18 zbylých nálezů uniky-v-bloku (hraniční/sporné).

### [drobnost] Zbytky po dnešní práci (3. 10. 2026)
- Šipka páry u tlakového hrnce: `src/components/skola2/VarSimulace.astro:224–228` (kontrola3).
- Vata `teziste#17#1`: potřebuje nový návrh.
- Zápisový skript vaty nenajde 26 bloků „shrnuti“.
- 10 zamítnutých návrhů vaty z dávky 1 (k přepracování).
- Další dávka vaty (20 položek) čeká na schválení učitele.
- paralel: vazby 19→13 a 9→1 zůstávají, dva návrhy zamítnuty pro nové úniky 18→19 a 9→8 (kontrola-uniky-paralel-vazby.md); otázky se míchají, pořadí nechrání

### [drobnost] Dočasný profil Chromu zůstane v tmp po TERM/KILL (1. 10. 2026, kontrola stash F9, nález A)

`Omega/skripty/snimky_podkastu.py:~7395` (`_spust`, `tempfile.mkdtemp`) maže profil přes `atexit`; při SIGTERM/SIGKILL (např. timeout v `automat_podkastu.spust`) atexit neproběhne a `$TMPDIR/omega-chrome-*` (~2,8 MB) zůstane. Chrome sám nevisí (končí se zavřením roury). Důkaz: po TERM i KILL „profil ZUSTAL“, po INT smazán. Podrobnosti: `Omega/predavka/2026-10-01-den/kontrola-stash-f9.md` (A1). Oprava: signal handler pro TERM, nebo úklid starých `omega-chrome-*` při startu.

### [drobnost] BezpecnaVzdalenostVedeni: pahýl drátu vede skrz stožár (1. 10. 2026, kontrola 3 simulace F9, N4)

`src/components/skola2/BezpecnaVzdalenostVedeniSimulace.astro` ř.~156: pahýl levého vodiče z ramene (160,90) šikmo doprava protíná sloup u (198,109) a pravou vzpěru u (204,112) — drát prochází konstrukcí. Totéž měl už původní levý vodič. Náprava: vést pahýl před/za stožárem tak, aby konstrukcí neprocházel. Protokol: `Omega/predavka/2026-10-01-den/kontrola3-simulace-f9.md` (N4).

### [drobnost] BezpecnaVzdalenostVedeni: roztřepené konce drátu vypadají jako šipky (1. 10. 2026, kontrola 3 simulace F9, N5)

Tentýž soubor, `strapek()` ř.~162–168: 3 čárky rozevřené ±0,6 rad vypadají jako hrot šipky (konec na zemi x=246, pahýl dolů‑doprava), žák je může číst jako směr proudu (jeden tvar = jeden význam). Náprava: nepravidelné kratší střapce bez společného hrotu, nebo bez rozevření. Protokol: `Omega/predavka/2026-10-01-den/kontrola3-simulace-f9.md` (N5).

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

*(Zdůvodnění: PDF učitele „Účinky proudu na lidský organismus“ si v číslech odporu kůže odporuje; web uvádí sucho ~150 000 Ω, vlhko ~2 000 Ω. Plné znění → PROGRESS-ARCHIV.md. Otázka je v ❓.)*


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

Návrh přesunut do PROGRESS-ARCHIV.md; paměť [[projekt-appka-tour-zavodnici]].

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

### [cesty] 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (čeká na pokyn)

Otázka je v ❓ nahoře; rozbor → PROGRESS-ARCHIV.md.

### 🆕 Velké nálezy auditu 18. 10. 2026 (1 řádek = 1 úkol; podrobnosti v `Omega/predavka/2026-10-18/`)
- [Omega] K2-V1 (`AUDIT-K2-kod-vs-pravidla.md`): `test_povoleni_hook.py` rc=1 (9 selhání po přesunu do /Users/Shared 14. 10.; realpath pracovních míst, žurnál píše `/Users/Shared/Omega/…`) — sjednotit realpath ve vrátném + očekávání testu; `PRAVIDLA.md:593` „0 neshod“ je do opravy nepravda.
- [Omega] K2-V2 (`AUDIT-K2-…`): `cz.wonderly.dodelej-animace` je znovu načten (exit 1), rozhodnutí učitele (vypnout kvůli duplicitě s noční frontou?) není v ❓ — zapsat tam.
- [skola2] K1-T1 (`AUDIT-K1-tridy-chyb.md`): skript `obr_animovane.mjs <url>` (seznam animovaných obr-*), jeho výstup povinná příloha zadání panelu i kontroly (zdvojení panelu s animací se vrátilo 3× i po návodu).
- [skola2] K1-T2/T9 (`AUDIT-K1-…`): sdílený automat snímků panelu (vzorkování cyklu po 250 ms) do `testy/nastroje/` + vision ANO/NE předkontrola (předměty bez opory, text předbíhá děj).
- [skola2] K1-T3 (`AUDIT-K1-…`): měřidlo šipek sil (`data-sila`/`data-meritko`: délka a dotyk šipky s tělesem).
- [skola2] K1-T4 (`AUDIT-K1-…`): render panelů s `prefers-reduced-motion` do PNG + vision ANO/NE; do PANELY-NAVOD doplnit bod o klidovém stavu.
- [skola2] K1-T6 (`AUDIT-K1-…`): kontrast v produkci (169 textů pod 4,5; měřidlo `kontrast_textu_svg.py` není v bráně a nečte `<style>` fill) — zapojit do `npm test`/kontroly commitu.
- [Omega] K1-T12 (`AUDIT-K1-…`): nálezy kontrol se nezapisují do `DENIK-CHYB.md` (144 protokolů → 0 obsahových záznamů) — skript z `predavka/*/*kontrola*.md`; zjistit, proč revize automatů nezapisuje od 11. 10.
- [Omega] K3 (`AUDIT-K3-dokumentace.md`): doplnit řádek 18. 10. do `Omega/METRIKY-KOL.md` (startovní čtení po zkrácení změřit).

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




Soupis dokončených kol a staré pointery: [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md), PROGRESS-ARCHIV.md. Nové úkoly pro lokální graf zakládat ve `wonderly-fronta`; fronta Claude session je tady (`~/.claude/skills/wonderly/START.md`).

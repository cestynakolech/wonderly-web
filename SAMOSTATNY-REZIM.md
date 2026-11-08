## ⚡ ČÍM ZAČÍT — aktualizováno 8. 11. 2026 (nedělní audit)

- **PRVNÍ ÚKOL (8. 11. 2026): nálezy auditu 8. 11.** — fronta § 🆕 Velké nálezy – audit 8. 11. 2026 (13 řádků; zprávy `Omega/predavka/2026-11-08/audit/`, soupis `AKCE.md`); dotazy učiteli (K-4, K-5, K-8, K-14, R1, R2) v tabulce na začátku ❓ níže. Dokumenty zkráceny (ze SR přesunuto do SAMOSTATNY-REZIM-ARCHIV.md § W1–W8). Brána opravena (obousměrné testy `bezpecnost-laborek`, `cela-cisla-laborek`, commit b2a40e2).

- Startovní čtení 8. 11. 2026: 70 796 B (CLAUDE.md+PROGRESS.md+SR+SKILL.md; wonderly-web/CLAUDE.md, wonderly-web/PROGRESS.md, wonderly-web/SAMOSTATNY-REZIM.md, ~/.claude/skills/wonderly/SKILL.md), 25. 10.: 75 124 B, ráno 8. 11. před auditem: 97 637 B

- **Předávka:** nejnovější `Omega/predavka/*/PRIKAZ-NOVA-SESSION*.md` (`ls -t`; k 25. 10. 2026 `2026-10-20/PRIKAZ-NOVA-SESSION-6.md`); před každou úlohou curl inventura živého webu ([[feedback-zivy-web-pred-vyberem]]). Starší odkazy na předávky 6./13./14. 10. → PROGRESS-ARCHIV.md § „Přesunuto ze SAMOSTATNY-REZIM.md — audit 18. 10. 2026“.

- **Audity:** 18. 10. — opravy A/B/C commitnuty (fa997f8, 591d3e4), `Omega/predavka/2026-10-18/OPRAVA-*.md`. 25. 10. — zprávy kontrolorů a opravy `Omega/predavka/2026-10-25/audit/`; velké nálezy ve frontě § 🆕 Velké nálezy auditu 25. 10. 2026.

- **Codex:** rozdělení `Omega/koordinace/ROZDELENI.md`, kontext `CODEX-KONTEXT-WEBU.md`; Jev — souhlas učitele 30. 9. s podmínkou; mini GPU funkční. Noční fronta: stav vede `Omega/AUTOMATY.md`.

📌 Pořadí (učitel 29. 9. 2026): téma po tématu napříč 7./8./9. ročníkem — 1. téma všech tří kompletně (úvod, výklad, zápis, obrázky, kvíz, písnička, video), pak 2. téma…; 6. ročník až po nich.

## ❓ Otevřené dotazy na učitele (jediná sekce, oprava V8-6, 27. 9. 2026)

### Tabulka pro učitele – audit 8. 11. 2026 (rozhodnutí jedním slovem stačí)

| # | o co jde | možnosti | doporučení |
|---|---|---|---|
| K-4 | `graf_local.py` ROLE `worker_rychly` = `qwen3:8b`, ale `~/CLAUDE.md` ř. 31 říká ANO/NE = `gemma4:26b` | A) změnit ROLE na gemma4:26b; B) opravit `~/CLAUDE.md` na qwen3:8b | A – měření v CLAUDE.md je novější |
| K-5 | `cz.wonderly.nocni-fronta`: plist je, ale `launchctl` hlásí „Could not find service“; `PRAVIDLA.md:720` a `AUTOMATY.md:90` ho vedou jako ✅ | A) zapnout; B) nechat vypnutý a v dokumentech dát ⏸ | ⏸ dokud učitel neřekne |
| K-8 | `AUTOMATY.md` vede deník jako POZASTAVENO, ale běží `com.omega.foto-hlidac`, `foto-kontrola-kvality`, `foto-pipeline`, `hlidac-session`, `hlidac-zaseknuti`, `kontrola-alba` | A) nechat běžet a opravit dokument; B) vypnout | A – ponechat běžící, opravit dokument |
| K-14 | „gravitační zrychlení, jinak zvané gravitační konstanta“ (`VrhSimulace.astro:37`, `kvizy.ts`, `14-EVA.txt`); `RETEZ-gravitacni-sila-7.md:18,101` „uzavřeno“ × `HOTOVO-gravitace-7-kolo12.md:99` „věcná chyba“ | A) psát jen „gravitační zrychlení g“; B) ponechat | A – gravitační konstanta κ je jiná veličina |
| R1 | limit pokusů: `~/.claude/CLAUDE.md` ř. 19–20 a SR (3× → jiný přístup, ~6 → ODLOŽ) × `SKILL.md` ř. 24, 225 + paměť `feedback-katalog-chyb-misto-odkladani` (3× → NEodkládat, přeplánovat dle KATALOG-CHYB) | A) platí SKILL.md; B) platí CLAUDE.md | A – novější pokyn 19. 10.; `~/.claude/CLAUDE.md` srovnat |
| R2 | záloha při `mv` mimo projekt: `~/.claude/CLAUDE.md` ř. 39 (zálohuje se) × `Omega/PRAVIDLA.md` ř. 587 (bez zálohy, K5-1) | A) zálohovat; B) nezálohovat | rozhodne kód vrátného `/Users/Shared/povoleni_hook.py` (ověřit) a dokumenty se srovnají |

- **Dotazy z 24.–30. 10. 2026 jsou VYŘEŠENY (22 položek + rozhodnutí učitele 27. 10., doslovně přesunuto 8. 11. 2026 do SAMOSTATNY-REZIM-ARCHIV.md § „Vyřešené dotazy učiteli 24.–30. 10. 2026“). Co z rozhodnutí ještě čeká na provedení:** panel 7-telesa oprava kostry (výjimka udělena; jiný exekutor opus + `kotva_animace.py` + `kontrola_safari_svg.mjs`); panel 8-zavislost-odporu jen 1 panel (regulace proudu rezistorem); panel 9-vesmir vyřazen; páka v dílech 3–4 vodorovná; Příklady díl 1 předepsat pohyb ve scéně 3 (opus + kotva); Účinnost/Příklady díl 2 nasazeno tak, jak je; Energie 4. pokus (Codex, scéna 6) a Indukce (opus + kotva); katalog `KATALOG-PRACANTU.md` scp na MacBook se zálohou; měření předfiltru gemma4 na syntetickém vzorku (MacBook); Laya do venv na mini (20 položek), Jev ne; atmosfericky-tlak-dialog přenamluvit repliky 8 a 14 a v tlak-dialog LENKA → EVA/MAREK; naklonena-rovina-dialog dodělat zvuk na MacBooku; video NotebookLM Mechanická práce zapsat do `temata.ts` (výjimka v `vyjimky-hotove.md` povolena); Codex zůstává 1. volbou pro animace (ověřit 4. pokusem); routiny Claude se nezavádějí; hotové z inventury beze změny.
- **30. 10. 2026 — dotaz 6 (za vás, sudo):** strážce v `/Library/Application Support/ClaudeCode/wonderly/` blokuje kontrolorům (typ kontrolor/pruzkumnik) i čistě čtecí `ssh macbook …`/`ssh intel …` a spouštění testů pythonem v kopii pod /tmp; kola 16 a 23 proto nemohla reprodukovat testy ani mutace, kotvy musel přeměřit orchestrátor. Návrh: povolit těmto typům ssh s příkazy jen pro čtení (ls, cat, tail, grep, git log/show/diff, shasum) a `python3` nad soubory pod /tmp/kolo*-kopie/.
- **25. 10. 2026 večer — (a)** přihlásit claude CLI (`claude login`), jinak tovarna_dil.py končí stavem 3 „čeká na kontrolora“.
- **25. 10. 2026 večer — (b)** vložit řádky z koordinace/navrh-katalog-radky-2026-10-25.md do KATALOG-PRACANTU.md § 0/§ 9/§ 10.
- **25. 10. 2026 večer — (c)** rozhodnout o výtahu ústavy při startu (koordinace/navrh-vytah-ustavy-2026-10-25.md, instalace do strážce).
- **25. 10. 2026 večer — (d)** do NAVOD-ANIMACE-PODKASTU.md přidat povinné atributy data-sila/data-rameno na šipky (pro meridlo_obrazu.py).
- **25. 10. 2026 večer — (e)** karta Páky 4 – spustit teď, nebo po smyčce (Codex na 15 % týdne)?
- **25. 10. 2026 večer — (f)** pravidla Codexu zakazují rm i v MĚŇ – nechat?
- **25. 10. 2026 večer — (g)** měřidlo našlo v hotovém dílu 2 šipku tíhy na korbě s kontrastem 1,1 : 1 (s03) – opravit po renderu, nebo nechat (hotové se nepředělává)?
- **26. 10. 2026 — (h)** vložit navržené řádky katalogu (gpt-6-astra jako výchozí model pro opravy animací, prozatímně, n = 1; Terra ne) z koordinace/navrh-katalog-radky-2026-10-26.md?
- **26. 10. 2026 — (i)** ponechat `~/.local/bin/codex` natrvalo na CLI 0.164 z aplikace ChatGPT, nebo aktualizovat standalone balík? (návrat: `ln -sfn /Users/radek_soukromy/.codex/packages/standalone/current/bin/codex ~/.local/bin/codex`)
- **26. 10. 2026 — (j)** smí se upravit `meridlo_obrazu.py` o kontrolu „popisek viditelný < 50 % času své existence“ a „paleta beze změny“ (kdo: exekutor + kontrolor + test v kopii)?
- **(w)** Za vás (sudo/zamčené): instalace prodloužení razítka strážce na 7 dní (Omega/koordinace/strazce-platnost-7dni-2026-10-27/NAVOD-PRO-UCITELE.md); v KATALOG-PRACANTU zapsat zrušení R10 (§ 0 ř. 53), NotebookLM povoleno (§ 9 bod 1, ř. 19), nový význam `inventura.py --vse` (ř. 46: všech 99 podtémat; dřívější = `--vse-seznam`) a řádky dispečer/hlasatel/nasad_dil.

- **18. 10. — `cz.wonderly.dodelej-animace`** je znovu načten (exit 1): nechat, nebo vypnout kvůli duplicitě s noční frontou?

- **14. 10. 2026 (dávka 10) — dotazy:** (a) výklad podtématu alternativni-motory: věta „všechny čtyři doby probíhají současně“ nesedí na 3 komory Wankelova motoru (`Omega/predavka/2026-10-14/W38-kontrola3.md`) — upravit výklad? (b) infografika chemicke-zdroje-napeti je hotová, čeká na rozhodnutí o podtématu; (c) animace W26 (priklady-na-vypocet-rychlosti-dialog, posuvny-otacivy-pohyb-dialog2) ODLOŽENO po 4 pokusech — dokončit po renderu s meridlo_deje.

- **14. 10. 2026 — nové dotazy (podrobně `Omega/predavka/2026-10-14/PREDAVKA-14-10.md`):** (1) Cloudflare Always Use HTTPS (zapnout v Cloudflare SSL/TLS → Edge Certificates; diagnostika `Omega/predavka/2026-10-13/NEZABEZPECENA-STRANKA.md`); (2) 20 dalších odkazů ČT edu vede na video + 3 nefunkční (`predavka/2026-10-13/vlna1/KONTROLA-5b9d5e2.md`) — odstranit? (3) laborka pro kvarky nedává smysl (zrušeno) — vyjmout z měřidla? (4) doplňky ke shrnutím (laborka pololetni-shrnuti F8 napsaná, POZASTAVENA) — dělat? (5) obr-11 u alternátoru má čísla mimo výklad; (6) úvod těžiště „prst podpírá těžiště“ — těžiště je nad prstem; (7) lab.wonderly.cz vrací 403 na požadavky bez User-Agent (Cloudflare ochrana proti botům?) — souvislost se školními PC ověřit.

- **13. 10. 2026 (vlna 1) — dotazy:** (1) odkaz na video ČT edu v temata.ts ~ř. 2668 (zákon zachování energie) porušuje zákaz cizích videí — odstranit? (2) 4 podtémata bez vhodného českého odkazu (ucinnost, alternator, elektromotor, vlastnosti střídavého proudu); (3) nesoulad výkladu a kvízu pololetí F9 (temata.ts ~3621 × kvizy.ts ~6154); (4) necommitovaná stará zamítnutá `SilaInfografika.astro` (v1) — odstranit? (5) scénář 8/rocni-shrnuti ODLOŽEN (3× neprošel), rozhodnout spolu s 7/rocni-shrnuti. Podrobně `Omega/predavka/2026-10-13/PREDAVKA-VLNA1.md`.

- **3. 10. 2026 (b) — video NotebookLM „Tání“ (8. ročník):** zbývá rozhodnout LICENCI (podmínky použití videí z NotebookLM); kontrola a volba A/B/C → SAMOSTATNY-REZIM-ARCHIV.md § W5.

- **K1 — [téma 5] Po209 v PDF Radioaktivita s. 9** má poločas 0,000 000 3 s (zřejmě záměna izotopu; v žákovském textu vypuštěno) — co s tím? (podrobnosti: `Omega/predavka/2026-10-01-noc/kontrola-codex-b12.md` § K1: a) opravit na Po212, b) ponechat Po209 a uvést asi 125 let, c) polonium vynechat = současný stav)

- **[téma 3] a)** Nakloněná rovina a Klín: ve Škole k nim není PDF ani prezentace (prohledáno i v ZIPech). Návrh textu nakloněné roviny z dosavadního webu je v `f7-naklonena-rovina.json` (vzorec a čísla jen v Pro zvídavé); stránka na webu zůstala beze změny. Dodá učitel podklad, nebo potvrdí učení z dosavadního webu?
- **[téma 3] b)** Odchylky od PDF opravené na fyzikálně správné znění (přehled v `odchylky-od-pdf.md`): mazání pístu v olejové vaně, šipky akce/reakce, sůl „vznikají ionty“, rychlost rakety 28 000 km/h, SO⁴⁻ — ke schválení.
- **[téma 3] c)** Termistor „v hutích“ (PDF Polovodiče s. 9) — ponecháno, ověřit.
- **[téma 3] d)** Simulace těžiště používá ilustrační čísla (náklaďák kola 180 cm, těžiště 150 cm → 31°; formule 200 cm, 30 cm → 74°), v PDF nejsou — ke schválení.
- **[téma 3] e)** Kapaliny: doplněná zmínka o tavenině (výroba hliníku) nad rámec PDF — ponechat/vypustit.

- [Omega] **Škola/podkasty — formální schválení výjimky** (zapisování mp3 do `/Users/Shared/Škola/podkasty` je zavedená praxe bez výslovného schválení v git historii; učitel má potvrdit) — plné znění SAMOSTATNY-REZIM-ARCHIV.md § W6.
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
- [skola2] **3 otevřené body z fyzikálních podkladů** (přeneseno z archivovaného
  `KE-SCHVALENI.md`, 27. 9. 2026 — plné znění `wonderly-web/docs/archiv/KE-SCHVALENI.md`;
  body 1) Účinnost a 3) Wankel/alternativní pohony jsou vyřízeny — podtémata `ucinnost`
  a `alternativni-motory` existují v `temata.ts`, ověřeno 25. 10. 2026):
  10) Podtémata „Kladka" a „Nakloněná rovina" (F7, `jednoduche-stroje`) nemají zdrojový
  podklad ve Škole — dodat podklad, nebo ponechat beze změny? 14) Práh proudu u „Účinky
  proudu, bezpečnost": web „2–5 mA" vs. PDF „1–8 mA" (PDF rozsah by se překrýval se
  sousedními prahy 0,5–1 a 6–15 mA) — který platí? 15) Podtémata jaderné fyziky (F9,
  budoucí 5. celek: radioaktivita, jaderná energie, jaderný reaktor) nemají zdrojový
  podklad — dodat, nebo přestavět beze srovnání?
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
- [skola2] **Automatický restart samostatného režimu po obnově tokenů:** šlo by
  naplánovanou úlohou (cron v danou hodinu spustí novou session). Nová trvalá
  konfigurace → jen se souhlasem.
- [skola2] 22 kandidátů na zkrácení pravidel čeká na výběr učitele v
  `Omega/dokumenty/PRAVIDLA-AUDIT-2026-09-21.md`.
- [skola2] Denní rutina `pravidla-dluh-denne` založena, ale cron `30 7 * * 1-6`
  čeká na zaregistrování přes `/schedule` učitelem.
- [cesty] **Smazat zbloudilé kopie v R2** na chybném klíči (2 soubory,
  `polemika-roztaznost-1/-2.mp4`, nahrané omylem 16. 8. s prefixem navíc) —
  správné kopie fungují, chybné nikdo nečte, smazat?
- [cesty] **9 videí „k rozhodnutí"** — `Cestovatelský deník/KE-SCHVALENI.md`.
- [cesty] **Rozmazávání SPZ** — návrh učitele 6. 8. posouzen (referenční fotky
  neřeší detekci), navržené řešení čeká na pokyn: nejdřív změřit dnešní stav na
zkušební sadě značek, pak přidat kontext auta. Plná analýza: PROGRESS-ARCHIV.md
  § „🚗 Nápad učitele 6. 8.“.
- [skola2] Odkazy F9 `chemicke-zdroje-napeti` 4× doslova stejné jako u F8 stejného
  slugu (v „📥 Nálezy z historie" níže) — vada, nebo záměr?
- [cesty] **Referenční tváře 2021** — z kandidátů vybrat a POTVRDIT (přidání tváře
  = ta osoba se přestane rozmazávat, potvrzuje vždy učitel).
- [cesty] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a
  stará skrýt? (YouTube neumí vyměnit soubor.)
- [skola2] Rozhodovací tabulky z 29. 7. (laboratorní práce 12 bodů, nové simulace 10,
  UX školy 8) — samotné tabulky nedohledány, PROGRESS-ARCHIV.md § S13 má jen počty.
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
  potvrdit rozsah: znělka, nebo podkres celého dílu? jednotná, nebo ke každému dílu?
  Čeká na učitele u počítače (přihlášení do Suno). Plné znění: PROGRESS-ARCHIV.md § S13.
- [skola2] **Fahrenheit — formulace** (díl 8 `teplota-a-jeji-mereni`): „v anglicky
  mluvících zemích" místo přesnějšího „hlavně v USA" — přeformulovat?
- [skola2] **Klementinum — rok rekordu** (díl 8): zmíněn jen rok 1775 (začátek
  měření), sporný rekord 1785/1929 vynechán — potvrdit, nebo doplnit?
- [skola2] **Přeskoky v pořadí úvodních map videí** — `kontrola_poradi.py`
  dlouhodobě hlásí 8 přeskoků (např. chybí zastávka ballon-d-alsace) — mají se
  mapy předělat?
- (24. 10. 2026, W115 panely Elektrický náboj v pohybu, #172) PDF lekce 18 (FYZIKA 8, „Elektrický náboj, elektrování těles…“, s. 12–15; jiný zdroj – prezentace ani ŠVP fyziky – v /Users/Shared/Škola není) NEDOKLÁDÁ: (1) P1 rozdělení přebytečných elektronů mezi dvě kovové koule (PDF jen obecně „elektrony se přesunují při dotyku“, s. 12, a „kovy vedou“, s. 13); (2) P3 neutralizaci KLADNÉ koule elektrony přitékajícími ze Země (PDF s. 14 jen záporné těleso – Země přijme elektrony); (3) P3 drát držený za izolující plastovou rukojeť. Doloženo: kov vede/plast ne (s. 13), neutralizace dotykem opačných stejně velkých nábojů (s. 15), vybití záporného tělesa do Země (s. 14). Otázka: ponechat (1)–(3) jako zjednodušení na úrovni ŠVP, nebo je z panelů vyřadit? Do rozhodnutí se W115 nenasazuje. Citace: /tmp/wonderly-workery/w115/ZDROJ-lekce18.md.
- (25. 10. 2026, pojistka hotového) OTEVŘENO – čeká na učitele: `skripty/pojistka_hotove.mjs` (zmenyMaterialu) parsuje jen okno diffu --unified=40; když začíná uvnitř šablonového řetězce (temata.ts ř. 2723), odmítne každou změnu do 40 řádků (video #8 Mechanická práce, ř. 2752) i každé odebrání odkazů (objekty odkazů nemají `cesta`). Agent pojistku ani její kopii měnit nesmí (strážce). Zkoušeno: 3 tvary zápisu videa (všechny odmítnuty), návrh opravy v kopii (strážce zablokoval). Další krok: učitel nechá opravu udělat Codex mimo agenta (pokyn v chatu 25. 10.), pak orchestrátor zapíše video #8 (patch /tmp/wonderly-workery/video-mp/zmena-ř2752.patch) a odstraní externí odkazy (rozhodnutí učitele 25. 10.: odstranit).

## 📌 Živé zadání, fronta a reference

- **FRONTA (rozhodnutí učitele 4. 10. 2026, plán do hotového webu):** (1) nové video NotebookLM Tání 3–4 min s opravami (Cín, led plave, J/kg, sůl, délka). (2) Teplota Slunce na 4 500 °C podle PDF. (3) Zápisy do sešitu (pár řádků dle OBSAH-PRAVIDLA § zápis): 7, 8, 9 dokončit, pak 6. ročník (31 podtémat, zápisy chybí). (4) Po hotovém webu KVÍZY S OBRÁZKY, po tématech napříč 7/8/9 (téma 1 v 7., 8., 9., pak téma 2 …), nakonec 6. ročník. Pracovat samostatně.
- **DROBNOST (kontrola-6e46c77.md):** šipka 5 N v TreniSimulace na telefonu neviditelná, legenda ji slibuje.
- **DROBNOST (opravy-simulaci-kolo4.md):** SilaVektor: chybí legenda pro 3 malé popisky.
- **FRONTA:** do zadání agentů přidat zákaz `git stash` ve sdíleném repu (`Omega/predavka/2026-10-03/zapis-kviz-rychlost.md`).
- **NotebookLM bonusová videa a Suno písničky zadávat po tématech (1–4); nejdřív inventura existujících** (inventura 2. 10. 2026: `Omega/predavka/2026-10-02/inventura-notebooklm.md`).

> **`WONDERLY` = první nehotový úkol z fronty, pracuj samostatně** — plné znění a pravidla značek `[fox]`/`[skola2]`/`[cesty]`: `~/.claude/skills/wonderly/START.md` ř. 8–16 a 24–44 (původní blok SAMOSTATNY-REZIM-ARCHIV.md § W7). Fronta je JEN tady.

### 🔴 PRIORITA — přestavba obsahu fyziky (zadáno 21. 9. 2026)

Pravidla přestavby: `OBSAH-PRAVIDLA.md` kap. 3, 12–14; pořadí „téma po tématu napříč 7./8./9.“ viz 📌 Pořadí v ⚡ nahoře. Definice „hotového tématu“ → SAMOSTATNY-REZIM-ARCHIV.md (grep „definice hotového“); původní bloky A–E v archivech NEDOLOŽENY (grep 25. 10. 2026: 0 výskytů) — hledat v `git log -S`. **NIC SE NEMAŽE.**

#### Živé věcné vady (přesunuto z „Organizace“ 8. 11. 2026 — OPRAVIT, nečeká se na rozhodnutí)

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
- [skola2] Kosmetika: blok `tepelna-vymena-a-teplo` má zápis „4200", sjednocení na
  „4 200" spouští bránu `uniky.mjs` (substring) — ponecháno, čeká na opravu měřidla
  nebo formátu.
- [skola2] Terminologie vaty: staré názvy „VZOR 1"/„VZOR 2" přejmenovány kalibrací 25. 9. na kvantifikátor / kategorické slovo / tázací slovo / polarita; zbývající práce (kategorické slovo, tázací slovo) se vede pod novými názvy (SAMOSTATNY-REZIM-ARCHIV.md, grep „kategorické slovo“), staré počty bloků neplatí.

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 3. kolo — kontrolor V6)

- [skola2] Chybějící složky prvního tématu napříč ročníky (zápis z 22. 9. zastaral, `INVENTURA-TEMAT.md`, `OBSAH-PRAVIDLA.md` kap. 12): F7 `pohyb-a-rychlost`, F8 `mechanicka-prace-a-vykon`, F9 `magneticke-pole` — před úlohou přeměřit živým webem a `node inventura-podtematu.mjs`; původní znění s výčtem → SAMOSTATNY-REZIM-ARCHIV.md (audit 25. 10. 2026).
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
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md` směrem k lokálním modelům tam, kde to obstojí — řídit se přímým srovnáním vision (položka níže) a zkušeností z `ollama-log.md` (přeformulováno 27. 9., V4-8; výchozí tabulka zapsána 15. 8. 2026).
- [příprava] Přímé srovnání vision: ThinkingCap vs qwen3.8:27b-mlx na jedné dávce
  ~10 map/fotek deníku (stejné obrázky, stejná otázka, `mapa_projde_kontrolou`);
  vítěz nahradí model v automatech. Zadáno 21. 9. 2026.

### 📥 Nálezy z historie, dosud nevyřešené

Přesunuto 8. 11. 2026 do SAMOSTATNY-REZIM-ARCHIV.md § W2 (~25 otevřených drobných úkolů deníku/skola2 — při výběru práce tam grepnout „[cesty]“ / „[skola2]“).

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

Domov: `OBSAH-PRAVIDLA.md` kap. 4 (vč. „chudého podtématu“); nástroje `node testy/vypis-kviz.mjs <blok>`, `node testy/delky.mjs <blok> --odpovedi`. Původní znění a pozn. 1. 8. → PROGRESS-ARCHIV.md.

## Fronta nápadů (seřazeno podle priority)

Drobnosti a odložené zbytky z 1.–3. 10. 2026 přesunuty 8. 11. 2026 do SAMOSTATNY-REZIM-ARCHIV.md § W1 (nic nesmazáno; úkoly zůstávají otevřené).

### [skola2] ⛔ NESAHAT — UČITEL ROZHODNE SÁM — odpor lidské kůže (zjištěno 25. 9. 2026)

**⛔ NESAHAT — UČITEL ROZHODNE SÁM** (řekl 25. 9. 2026: „ta čísla odporu kůže na webu
nedávej, počkej na mě"). Čísla na webu NECHAT PŘESNĚ TAK, JAK JSOU, nic nepřepisovat,
nedoplňovat ani nemazat — ani podle PDF, ani podle jiného zdroje. Platí pro `temata.ts`
(F8 ~2713, F9 ~3062–3063) i `kvizy.ts` (~4344–4361, ~4713–4723).

*(Zdůvodnění: PDF učitele „Účinky proudu na lidský organismus“ si v číslech odporu kůže odporuje; web uvádí sucho ~150 000 Ω, vlhko ~2 000 Ω. Plné znění → PROGRESS-ARCHIV.md § S12.)*

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026)

Zbylé drobnosti → SAMOSTATNY-REZIM-ARCHIV.md § W3. Živé věcné vady (uzemnění, N/S) jsou nahoře v 🔴 PRIORITA.

### 🆕 Velké nálezy auditu 18. 10. 2026 (1 řádek = 1 úkol; podrobnosti v `Omega/predavka/2026-10-18/`)
- [skola2] K1-T1 (`AUDIT-K1-tridy-chyb.md`): skript `obr_animovane.mjs <url>` (seznam animovaných obr-*), jeho výstup povinná příloha zadání panelu i kontroly (zdvojení panelu s animací se vrátilo 3× i po návodu).
- [skola2] K1-T2/T9 (`AUDIT-K1-…`): sdílený automat snímků panelu (vzorkování cyklu po 250 ms) do `testy/nastroje/` + vision ANO/NE předkontrola (předměty bez opory, text předbíhá děj).
- [skola2] K1-T3 (`AUDIT-K1-…`): měřidlo šipek sil (`data-sila`/`data-meritko`: délka a dotyk šipky s tělesem).
- [skola2] K1-T4 (`AUDIT-K1-…`): render panelů s `prefers-reduced-motion` do PNG + vision ANO/NE; do PANELY-NAVOD doplnit bod o klidovém stavu.
- [skola2] K1-T6 (`AUDIT-K1-…`): kontrast v produkci (169 textů pod 4,5; měřidlo `kontrast_textu_svg.py` není v bráně a nečte `<style>` fill) — zapojit do `npm test`/kontroly commitu.
- [Omega] K1-T12 (`AUDIT-K1-…`): nálezy kontrol se nezapisují do `DENIK-CHYB.md` (144 protokolů → 0 obsahových záznamů) — skript z `predavka/*/*kontrola*.md`; zjistit, proč revize automatů nezapisuje od 11. 10.
- [Omega] K3 (`AUDIT-K3-dokumentace.md`): doplnit řádky 18. a 25. 10. do `Omega/METRIKY-KOL.md` (startovní čtení 18. 10.: 76 052 B; po auditu 25. 10. = 75124 B (před 80 298)).

### 🆕 Velké nálezy auditu 25. 10. 2026 (1 řádek = 1 úkol; zprávy v `Omega/predavka/2026-10-25/audit/`)
- [Omega] VRÁTNÝ `orchestrator-guard.sh` (přesunuto z ⚡): ř.65 bere basename+lowercase → projde `/tmp/x/GIT`; ř.79 `rm` s ORCHESTRATOR_ON propustí i další cíle (`rm -rf X ~/.claude/ORCHESTRATOR_ON` → ALLOW); `orchestrator-prompt.md:48–56` rozpor s `_SPOLECNE.md` § Izolace jen popsán, ne odstraněn + zalomená cesta.
- [Omega] U16: `MEMORY.md` (Škola) 21 480 B / 140 ř. > cíl 20 000 B + 5 pamětí mimo rejstřík (feedback-kviz-vyjimka-chude-podtema, feedback-ollama-orchestrace, feedback-youtube-jen-oficialni-vlozeni, reference-plan-prace-skolni-schranka, +1 ověřit) — zhustit (`kontrolor3-dokumentace.md` § D3). Historie U1–U16/V18 → PROGRESS-ARCHIV.md.
- [skola2] K3-D2: PANELY-NAVOD.md má DVA domovy (`wonderly-web/PANELY-NAVOD.md` 9 668 B × `Omega/predavka/2026-10-13/vlna1/PANELY-NAVOD.md` 7 770 B; zadání míří na starší) — sjednotit na repo, Omega kopii nahradit odkazem (`kontrolor3-dokumentace.md` § D2).
- [skola2] K1-A1: T08 „tvrzení bez opory v PDF“ se vrací (d246dc7, W115) a brána neexistuje — skript nad SVG panely (zdroj: soubor, s. N) + obousměrný důkaz (`kontrolor1-tridy-chyb.md` § A1).
- [Omega] K1-A2: limit pokusů opakovaně překročen (kontrola opus 9 kol u Magnety, kolo 6–7 u Výkon/Příklady) bez přeplánování — počitadlo kol + tvrdá stopka při 3. ZAMÍTNUTO (`kontrolor1-tridy-chyb.md` § A2).
- [Omega] K1-A6: `revize_automatu.py` nezná `launchctl disable` (falešné poplachy „POZASTAVENO, ale běží“ 17× a „NENÍ nahraný“ 18×) — brát `print-disabled` jako pozastaveno (`kontrolor1-tridy-chyb.md` § A6; nahrazuje položku z ⚡ 18. 10.).
- [skola2] Malé nálezy 25. 10.: kontrolor 1 (A3–A5, A7, B1–B3: SELHANI.md se nevede, testy z `/tmp/`, `git pull` exit 128, `denik_chyb.py --vypis`, ODLOZENE.md) `kontrolor1-tridy-chyb.md`; kontrolor 2 (12 malých, vč. #1 `vyjimky-hotove.md` (založen 25. 10.); #12 `.githooks/pre-commit` v indexu 100644 → `git update-index --chmod=+x`; #2 Hermes v `orchestrator-prompt.md:136–139`; #11 `SABLONY-ZADANI.md` na pevnou cestu) `kontrolor2-kod-pravidla.md`; kontrolor 3 (A19/B3/D6 ověřeno či zapsáno výše) `kontrolor3-dokumentace.md`.
- [skola2] Appka /tour — automatické přepínání (zadáno 4. 8.): otevřený úkol, detail `PROGRESS-ARCHIV.md:2371`.
- [skola2] D1: `~/.hermes` na disku zůstává (jen podsložka `node`, binárka `hermes-agent/venv/bin/hermes` neexistuje, ověřeno 25. 10.) — rozhodnout o smazání složky (jen s dokladem/zálohou).

### 🆕 Velké nálezy – audit 8. 11. 2026 (1 řádek = 1 úkol; zprávy v `Omega/predavka/2026-11-08/audit/`, soupis `AKCE.md`)
- [ ] [skola2] [T08-brána] brána proti tvrzení bez opory (zdroj: soubor, s. N; obousměrný důkaz W115, píseň 49 k1) — A#1, ≥7 výskytů
- [ ] [Omega] [limit-kol] počitadlo kol mimo automat: 3. NEPROŠLO = rc 2 + zpráva preplanovani — A#2 (Magnety 9, gravitace 12, render 15–22)
- [ ] [Omega] [záznamy-chyb] brána NEPROŠLO protokoly vs. SELHANI; `protokoly_do_deniku.py` do dispečera (`denik-chyb.json` od 26. 10. prázdný) — A#3, třetí audit
- [ ] [skola2] [T01-obr_animovane] `obr_animovane.mjs` + příloha zadání panelu — A#4
- [ ] [skola2] [T03/T05/T06/T11] `meridlo_obrazu.py` na SVG panely + kalibrace — A#5
- [ ] [Omega] [metriky] pevná množina startovního čtení do METRIKY-KOL.md (97 637 B bez / 119 117 B s MEMORY.md) — KOTVY 6, C1
- [ ] [Omega] [odložené-15] ověřit `pololetni-shrnuti-dialog{,2,3,4}.mp4` proti přepisu 21. 8. — A#11
- [ ] [Omega] [odložené-mini] ověřit na mini plánovač vs. dispečer, `inventura.py` od 27. 10. — A#12
- [ ] [Omega] [odložené-Chatterbox] → dotaz učiteli (>3 měsíce) — A#13
- [ ] [skola2] [SR-dotazy] potvrdit zastaralost KOLODĚJE, Le Bourg, Chrome (v ❓ výše) — C#7
- [ ] [skola2] [kontrast-panelů] 24 nesledovaných panelů s kontrastem < 4,5:1 (atmosfericky-tlak-panel-2 1,35:1, archimeduv-zakon-panel-2 1,0:1) — KOTVY 2
- [ ] [skola2] [vady-uzemnění-NS] „Země přijme volné elektrony“ (temata 1×, kvizy 1×), „N — north“ (temata 2×) živé — viz 🔴 PRIORITA výše — C#3
- [ ] [skola2] [SR-⚡] obnovit ⚡ ČÍM ZAČÍT a PRIKAZ-NOVA-SESSION — C R4 (⚡ aktualizováno 8. 11.; PRIKAZ-NOVA-SESSION zbývá)
- [ ] [kanárek] cz.wonderly.kanarek padá na 25min limitu (kanarek.py:44) — úvodní sken `stav_animaci.py` (ffmpeg nad všemi díly) trvá déle a týž sken běží i z `hlaseni_animace.py`; řešení: sken jednou, výsledek sdílet, nebo limit podle počtu dílů — rozhodnout a opravit
- [ ] [plist-xml] plisty cz.wonderly.kanarek a com.omega.zaloha-skola mají v XML komentáři `--` → `revize_automatu.py` je nepřečte (ExpatError); opravit komentář (technické, malé)
- [ ] [test-vrátného] skripty/testy/test_povoleni_hook.py neprochází (4 případy `rm tmp-*` hook zamítá, HEAD verze 11) — rozhodnout, zda platí test nebo hook, pak commit

### Další úkoly
- [skola2] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [skola2] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [skola2] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)

### ODLOŽENO: detektor tajemství (`Omega/skripty/zaloha_git.py`) — plné znění a stav v `Omega/ODLOZENE.md`; původní text SAMOSTATNY-REZIM-ARCHIV.md § W8.

Archivy: `SAMOSTATNY-REZIM-ARCHIV.md` (uzavřená kola od 6. 8.; nevyřešené DROBNÉ/ODLOŽENO z 30. 9.–2. 10. přesunuto 11. 10.; starší blok od původního ř. 235; podrobný průběh 21.–22. 9. — PŘEDÁNÍ, sladění kvízů, past souběžného zápisu `temata.ts`×`kvizy.ts`, mezery bran) a `PROGRESS-ARCHIV.md`. Sem patří JEN živé věci; hotová kola se na konci session stěhují do archivu. Nové úkoly pro lokální graf zakládat ve `wonderly-fronta`; fronta Claude session je tady (`~/.claude/skills/wonderly/START.md`).

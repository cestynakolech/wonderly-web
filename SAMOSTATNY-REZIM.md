> SAMOSTATNY-REZIM.md: ❓ otevřené dotazy na učitele a zákaz ⛔ NESAHAT (odpor kůže); fronta je jen SEZNAM-CHYBEJICIHO.md. Ústava v6: `/Library/Application Support/ClaudeCode/wonderly/USTAVA-WEBU.md`, § ŘÍZENÍ A NASAZENÍ.
> Start, fronta a předávka: ústava v6 § START, § DOPLŇOVÁNÍ A FRONTA (`Omega/fronty/SEZNAM-CHYBEJICIHO.md`), § PŘEDÁVKA.
> Dřívější ⚡ ČÍM ZAČÍT, fronta a nálezy auditů: SAMOSTATNY-REZIM-ARCHIV.md § „Přesunuto ze SAMOSTATNY-REZIM.md – úklid instrukcí 12. 11. 2026“.

## ❓ Otevřené dotazy na učitele (jediná sekce, oprava V8-6, 27. 9. 2026)

### Tabulka pro učitele – audit 8. 11. 2026 (rozhodnutí jedním slovem stačí)

| # | o co jde | možnosti | doporučení |
|---|---|---|---|
| K-4 | `graf_local.py` ROLE `worker_rychly` = `qwen3:8b`; premisa dřívějšího dotazu (`~/CLAUDE.md` „ANO/NE = `gemma4:26b`“) už neplatí. Platná role podle `~/CLAUDE.md` § Role: „čeština a jazykové ANO/NE → gemma4:31b (jen MacBook)“; „kód, regexy → … mini qwen3:8b“ | A) změnit ROLE v `graf_local.py` podle § Role; B) ponechat | otevřené – rozhodne učitel |
| K-5 | `cz.wonderly.nocni-fronta`: plist je, ale `launchctl` hlásí „Could not find service“; `PRAVIDLA.md:720` a `AUTOMATY.md:90` ho vedou jako ✅ | A) zapnout; B) nechat vypnutý a v dokumentech dát ⏸ | ⏸ dokud učitel neřekne |
| K-8 | `AUTOMATY.md` vede deník jako POZASTAVENO, ale běží `com.omega.foto-hlidac`, `foto-kontrola-kvality`, `foto-pipeline`, `hlidac-session`, `hlidac-zaseknuti`, `kontrola-alba` | A) nechat běžet a opravit dokument; B) vypnout | A – ponechat běžící, opravit dokument |
| K-14 | „gravitační zrychlení, jinak zvané gravitační konstanta“ (`VrhSimulace.astro:37`, `kvizy.ts`, `14-EVA.txt`); `RETEZ-gravitacni-sila-7.md:18,101` „uzavřeno“ × `HOTOVO-gravitace-7-kolo12.md:99` „věcná chyba“ | A) psát jen „gravitační zrychlení g“; B) ponechat | A – gravitační konstanta κ je jiná veličina |
| R1 | limit pokusů: `~/.claude/CLAUDE.md` ř. 19–20 a SR (3× → jiný přístup, ~6 → ODLOŽ) × `SKILL.md` ř. 24, 225 + paměť `feedback-katalog-chyb-misto-odkladani` (3× → NEodkládat, přeplánovat dle KATALOG-CHYB) | A) platí SKILL.md; B) platí CLAUDE.md | A – novější pokyn 19. 10.; `~/.claude/CLAUDE.md` srovnat ✅ ROZHODNUTO 10. 11. 2026: „Jedna sada pravidel. Stejné zkrácené znění na mini i MacBook“ (rozhodnutí 10); platné znění `~/.claude/CLAUDE.md`: „3× stejné selhání → jiný postup; po ~6 pokusech … OTEVŘENO“ |
| R2 | záloha při `mv` mimo projekt: `~/.claude/CLAUDE.md` ř. 39 (zálohuje se) × `Omega/PRAVIDLA.md` ř. 587 (bez zálohy, K5-1) | A) zálohovat; B) nezálohovat | rozhodne kód vrátného `/Users/Shared/povoleni_hook.py` (ověřit) a dokumenty se srovnají ✅ ROZHODNUTO 10. 11. 2026: „Jedna sada pravidel“ (rozhodnutí 10) a „Ponechat … zálohu před mazáním“ (rozhodnutí 8); platné znění `~/.claude/CLAUDE.md`: „Mazání a přesuny jen se zálohou a žurnálem“ |

- **Dotazy z 24.–30. 10. 2026 jsou VYŘEŠENY (22 položek + rozhodnutí učitele 27. 10., doslovně přesunuto 8. 11. 2026 do SAMOSTATNY-REZIM-ARCHIV.md § „Vyřešené dotazy učiteli 24.–30. 10. 2026“). Co z rozhodnutí ještě čeká na provedení:** panel 7-telesa oprava kostry (výjimka udělena; jiný exekutor opus + `kotva_animace.py` + `kontrola_safari_svg.mjs`); panel 8-zavislost-odporu jen 1 panel (regulace proudu rezistorem); panel 9-vesmir vyřazen; páka v dílech 3–4 vodorovná; Příklady díl 1 předepsat pohyb ve scéně 3 (opus + kotva); Účinnost/Příklady díl 2 nasazeno tak, jak je; Energie 4. pokus (Codex, scéna 6) a Indukce (opus + kotva); katalog `KATALOG-PRACANTU.md` scp na MacBook se zálohou; měření předfiltru gemma4 na syntetickém vzorku (MacBook); Laya do venv na mini (20 položek), Jev ne; atmosfericky-tlak-dialog přenamluvit repliky 8 a 14 a v tlak-dialog LENKA → EVA/MAREK; naklonena-rovina-dialog dodělat zvuk na MacBooku; video NotebookLM Mechanická práce zapsat do `temata.ts` (výjimka v `vyjimky-hotove.md` povolena); Codex zůstává 1. volbou pro animace (ověřit 4. pokusem); routiny Claude se nezavádějí; hotové z inventury beze změny. ✅ ROZHODNUTO 10. 11. 2026 (jen části „Energie 4. pokus (Codex, scéna 6)“ a „Codex zůstává 1. volbou pro animace“): „Codex = A. Z výroby webu pryč, jen na výslovný pokyn učitele“ (rozhodnutí 2).
- **30. 10. 2026 — dotaz 6 (za vás, sudo):** strážce v `/Library/Application Support/ClaudeCode/wonderly/` blokuje kontrolorům (typ kontrolor/pruzkumnik) i čistě čtecí `ssh macbook …`/`ssh intel …` a spouštění testů pythonem v kopii pod /tmp; kola 16 a 23 proto nemohla reprodukovat testy ani mutace, kotvy musel přeměřit orchestrátor. Návrh: povolit těmto typům ssh s příkazy jen pro čtení (ls, cat, tail, grep, git log/show/diff, shasum) a `python3` nad soubory pod /tmp/kolo*-kopie/. ✅ ROZHODNUTO 10. 11. 2026 (jen část ssh-čtení; python3 v kopiích a instalace zůstávají otevřené): „Strážce má bránit zápisu, mazání bez zálohy a nasazení bez startu, čtení povolit vždy“ (rozhodnutí 8).
- **25. 10. 2026 večer — (a)** přihlásit claude CLI (`claude login`), jinak tovarna_dil.py končí stavem 3 „čeká na kontrolora“.
- **25. 10. 2026 večer — (b)** vložit řádky z koordinace/navrh-katalog-radky-2026-10-25.md do KATALOG-PRACANTU.md § 0/§ 9/§ 10.
- **25. 10. 2026 večer — (c)** rozhodnout o výtahu ústavy při startu (koordinace/navrh-vytah-ustavy-2026-10-25.md, instalace do strážce). ✅ ROZHODNUTO 10. 11. 2026: ústava v6 (návrh podle rozhodnutí 1–10): „strážce (hook) vkládá při startu výtah `USTAVA-VYTAH.md`; plný text se čte Read“.
- **25. 10. 2026 večer — (d)** do NAVOD-ANIMACE-PODKASTU.md přidat povinné atributy data-sila/data-rameno na šipky (pro meridlo_obrazu.py).
- **25. 10. 2026 večer — (e)** karta Páky 4 – spustit teď, nebo po smyčce (Codex na 15 % týdne)? ✅ ROZHODNUTO 10. 11. 2026: „Codex = A. Z výroby webu pryč, jen na výslovný pokyn učitele; karty, fronta, hook a návody do archivu“ (rozhodnutí 2).
- **25. 10. 2026 večer — (f)** pravidla Codexu zakazují rm i v MĚŇ – nechat? ✅ ROZHODNUTO 10. 11. 2026: „Codex = A. Z výroby webu pryč …; karty, fronta, hook a návody do archivu“ (rozhodnutí 2).
- **25. 10. 2026 večer — (g)** měřidlo našlo v hotovém dílu 2 šipku tíhy na korbě s kontrastem 1,1 : 1 (s03) – opravit po renderu, nebo nechat (hotové se nepředělává)?
- **26. 10. 2026 — (h)** vložit navržené řádky katalogu (gpt-6-astra jako výchozí model pro opravy animací, prozatímně, n = 1; Terra ne) z koordinace/navrh-katalog-radky-2026-10-26.md? ✅ ROZHODNUTO 10. 11. 2026: „Codex = A. Z výroby webu pryč, jen na výslovný pokyn učitele“ (rozhodnutí 2); ústava v6 ZÁKAZY: „Codex se pro web nepoužívá“.
- **26. 10. 2026 — (i)** ponechat `~/.local/bin/codex` natrvalo na CLI 0.164 z aplikace ChatGPT, nebo aktualizovat standalone balík? (návrat: `ln -sfn /Users/radek_soukromy/.codex/packages/standalone/current/bin/codex ~/.local/bin/codex`) ✅ ROZHODNUTO 10. 11. 2026: „Codex = A. Z výroby webu pryč …; karty, fronta, hook a návody do archivu“ (rozhodnutí 2); „Zrušit se zálohou: … aparát Codexu“ (rozhodnutí 10).
- **26. 10. 2026 — (j)** smí se upravit `meridlo_obrazu.py` o kontrolu „popisek viditelný < 50 % času své existence“ a „paleta beze změny“ (kdo: exekutor + kontrolor + test v kopii)?
- **(w)** Za vás (sudo/zamčené): instalace prodloužení razítka strážce na 7 dní (Omega/koordinace/strazce-platnost-7dni-2026-10-27/NAVOD-PRO-UCITELE.md); v KATALOG-PRACANTU zapsat zrušení R10 (§ 0 ř. 53), NotebookLM povoleno (§ 9 bod 1, ř. 19), nový význam `inventura.py --vse` (ř. 46: všech 99 podtémat; dřívější = `--vse-seznam`) a řádky dispečer/hlasatel/nasad_dil. ✅ ROZHODNUTO 10. 11. 2026 (jen část „NotebookLM povoleno“; ostatní body (w) zůstávají otevřené): „Boti (Grok Bot „wonderly“ + bot Suno + NotebookLM) = A. Jejich debaty z NotebookLM a písničky jsou doplněk na doma“ (rozhodnutí 3).

- **18. 10. — `cz.wonderly.dodelej-animace`** je znovu načten (exit 1): nechat, nebo vypnout kvůli duplicitě s noční frontou?

- **14. 10. 2026 (dávka 10) — dotazy:** (a) výklad podtématu alternativni-motory: věta „všechny čtyři doby probíhají současně“ nesedí na 3 komory Wankelova motoru (`Omega/predavka/2026-10-14/W38-kontrola3.md`) — upravit výklad? (b) infografika chemicke-zdroje-napeti je hotová, čeká na rozhodnutí o podtématu; (c) animace W26 (priklady-na-vypocet-rychlosti-dialog, posuvny-otacivy-pohyb-dialog2) ODLOŽENO po 4 pokusech — dokončit po renderu s meridlo_deje.

- **14. 10. 2026 — nové dotazy (podrobně `Omega/predavka/2026-10-14/PREDAVKA-14-10.md`):** (1) Cloudflare Always Use HTTPS (zapnout v Cloudflare SSL/TLS → Edge Certificates; diagnostika `Omega/predavka/2026-10-13/NEZABEZPECENA-STRANKA.md`); (2) 20 dalších odkazů ČT edu vede na video + 3 nefunkční (`predavka/2026-10-13/vlna1/KONTROLA-5b9d5e2.md`) — odstranit? (3) laborka pro kvarky nedává smysl (zrušeno) — vyjmout z měřidla? (4) doplňky ke shrnutím (laborka pololetni-shrnuti F8 napsaná, POZASTAVENA) — dělat? (5) obr-11 u alternátoru má čísla mimo výklad; (6) úvod těžiště „prst podpírá těžiště“ — těžiště je nad prstem; (7) lab.wonderly.cz vrací 403 na požadavky bez User-Agent (Cloudflare ochrana proti botům?) — souvislost se školními PC ověřit. ✅ ROZHODNUTO 10. 11. 2026 (jen body (1) a (2); (3)–(7) zůstávají otevřené): (1) „Cloudflare: učitel zapnul Always Use HTTPS“ (rozhodnutí 10. 11., Doplňující); (2) „Nové externí odkazy se nevkládají, nasazené zůstávají“ (rozhodnutí 6).

- **13. 10. 2026 (vlna 1) — dotazy:** (1) odkaz na video ČT edu v temata.ts ~ř. 2668 (zákon zachování energie) porušuje zákaz cizích videí — odstranit? (2) 4 podtémata bez vhodného českého odkazu (ucinnost, alternator, elektromotor, vlastnosti střídavého proudu); (3) nesoulad výkladu a kvízu pololetí F9 (temata.ts ~3621 × kvizy.ts ~6154); (4) necommitovaná stará zamítnutá `SilaInfografika.astro` (v1) — odstranit? (5) scénář 8/rocni-shrnuti ODLOŽEN (3× neprošel), rozhodnout spolu s 7/rocni-shrnuti. Podrobně `Omega/predavka/2026-10-13/PREDAVKA-VLNA1.md`. ✅ ROZHODNUTO 10. 11. 2026 (jen body (1) a (2); (3)–(5) zůstávají otevřené): „Nové externí odkazy se nevkládají, nasazené zůstávají“ (rozhodnutí 6).

- **3. 10. 2026 (b) — video NotebookLM „Tání“ (8. ročník):** zbývá rozhodnout LICENCI (podmínky použití videí z NotebookLM); kontrola a volba A/B/C → SAMOSTATNY-REZIM-ARCHIV.md § W5. Pozn.: ústava v6: „video rozbor jen na přání učitele“.

- **K1 — [téma 5] Po209 v PDF Radioaktivita s. 9** má poločas 0,000 000 3 s (zřejmě záměna izotopu; v žákovském textu vypuštěno) — co s tím? (podrobnosti: `Omega/predavka/2026-10-01-noc/kontrola-codex-b12.md` § K1: a) opravit na Po212, b) ponechat Po209 a uvést asi 125 let, c) polonium vynechat = současný stav)

- **[téma 3] a)** Nakloněná rovina a Klín: ve Škole k nim není PDF ani prezentace (prohledáno i v ZIPech). Návrh textu nakloněné roviny z dosavadního webu je v `f7-naklonena-rovina.json` (vzorec a čísla jen v Pro zvídavé); stránka na webu zůstala beze změny. Dodá učitel podklad, nebo potvrdí učení z dosavadního webu? ✅ ROZHODNUTO 11. 11. 2026: „je-li učivo v časovém plánu a ŠVP, ale chybí v PDF a prezentacích, stránka se vyrobí podle ŠVP a po kontrolách nasadí bez dalšího dotazu“ (bod 1); „Kladka … doplnit …; nakloněná rovina zůstává“ (bod 3) (`rozhodnuti-ucitele-2026-11-11.md`, výklad hlavní session). Klín: podle bodu 1, je-li v plánu a ŠVP.
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
  podklad — dodat, nebo přestavět beze srovnání? ✅ ROZHODNUTO 11. 11. 2026 (jen body 10) a 15); bod 14) zůstává otevřený): „Kladka (330 slov): doplnit výklad (jen přidat, stávající neměnit) …; nakloněná rovina zůstává“ (bod 3); „je-li učivo v časovém plánu a ŠVP, ale chybí v PDF a prezentacích, stránka se vyrobí podle ŠVP a po kontrolách nasadí bez dalšího dotazu“ (bod 1) (`rozhodnuti-ucitele-2026-11-11.md`, výklad hlavní session).
- [skola2] F9 `chemicke-zdroje-napeti` — citronová baterie, palivový článek, polarita
  anody při nabíjení, „dva stejné kovy" nejsou v PDF (možná v prezentaci) — ponechat
  ve výkladu/kvízu, nebo vyřadit? (Kvíz `kvarky` vyřízen 13. 10. 2026: výjimka 14 otázek zapsána v OBSAH-PRAVIDLA kap. 4.)
- [skola2] Podtémata bez názornosti u shrnutí (7, ověřeno `node testy/nazornost.mjs`
  27. 9.) — dělat přehledovou infografiku, nebo je z měřidla vyjmout? Stejná otázka
  platí i pro podkasty/video u týchž shrnutí (viz „⚡ ČÍM ZAČÍT", od 12. 11. 2026 v SAMOSTATNY-REZIM-ARCHIV.md).
- [skola2] Odpor lidské kůže (F8/F9): ⛔ NESAHAT, plné znění v sekci „[skola2] ⛔ NESAHAT — odpor lidské kůže“ níže (přesunuto auditem 11. 10. 2026).
- [Omega] **`povoleni_hook.py` není zapsaný v `~/.claude/settings.json`** — platí jen
  ve `Škola/.claude/settings.json` (`PreToolUse '*'`); session spuštěná přímo z Omegy
  nebo z wonderly-web běží bez vrátného a bez černé listiny (nález K2-1). Návrh zápisu
  (jednořádkový příkaz) je v `Omega/dokumenty/audit-2026-09-27.md` (sekce K2-1, V9-4).
  OVĚŘENO 10. 11. (mini, Bash): „Na mini je v `~/.claude/settings.json` zapojen `povoleni_hook.py` (PreToolUse Bash)“ (`rozhodnuti-ucitele-2026-11-10.md`, Zjištěná fakta). MacBook zůstává otevřený.
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
  automaticky? Pozn.: automatické nasazení z GitHubu funguje (rozhodnutí 7, 10. 11. 2026); dotaz na scope tokenu zůstává otevřený.
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
- (25. 10. 2026, pojistka hotového) OTEVŘENO – čeká na učitele: `skripty/pojistka_hotove.mjs` (zmenyMaterialu) parsuje jen okno diffu --unified=40; když začíná uvnitř šablonového řetězce (temata.ts ř. 2723), odmítne každou změnu do 40 řádků (video #8 Mechanická práce, ř. 2752) i každé odebrání odkazů (objekty odkazů nemají `cesta`). Agent pojistku ani její kopii měnit nesmí (strážce). Zkoušeno: 3 tvary zápisu videa (všechny odmítnuty), návrh opravy v kopii (strážce zablokoval). Další krok: učitel nechá opravu udělat Codex mimo agenta (pokyn v chatu 25. 10.), pak orchestrátor zapíše video #8 (patch /tmp/wonderly-workery/video-mp/zmena-ř2752.patch) a odstraní externí odkazy (rozhodnutí učitele 25. 10.: odstranit). ✅ ROZHODNUTO 10. 11. 2026 (jen části „opravu udělat Codex“ a „odstraní externí odkazy“; vada pojistky a zápis videa #8 zůstávají otevřené): „Codex = A. Z výroby webu pryč, jen na výslovný pokyn učitele“ (rozhodnutí 2); „Nové externí odkazy se nevkládají, nasazené zůstávají“ (rozhodnutí 6).
- (12. 11. 2026, hlídač `.claude/hooks/orchestrator-guard.sh`, platí jen na MacBooku) Hlášky na ř. 6, 87, 90, 94 zmiňují zrušené `/orch-on` a `/orch-off` (příkazy smazány úklidem 12. 11.). Hlídače agent neupravuje. Návrh opravy pro učitele: v hláškách nechat jen smazání značky `rm ~/.claude/ORCHESTRATOR_ON` (např. „Vypnuti rezimu: rm ~/.claude/ORCHESTRATOR_ON.“). Upravit?

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

Zbylé drobnosti → SAMOSTATNY-REZIM-ARCHIV.md § W3. Věcné vady (uzemnění, N/S) z oddílu 🔴 PRIORITA jsou od 12. 11. 2026 v SAMOSTATNY-REZIM-ARCHIV.md § „Přesunuto ze SAMOSTATNY-REZIM.md – úklid instrukcí 12. 11. 2026“.

Archivy: `SAMOSTATNY-REZIM-ARCHIV.md` (uzavřená kola od 6. 8.; nevyřešené DROBNÉ/ODLOŽENO z 30. 9.–2. 10. přesunuto 11. 10.; starší blok od původního ř. 235; podrobný průběh 21.–22. 9. — PŘEDÁNÍ, sladění kvízů, past souběžného zápisu `temata.ts`×`kvizy.ts`, mezery bran) a `PROGRESS-ARCHIV.md`. Sem patří JEN živé věci; hotová kola se na konci session stěhují do archivu. Fronta je jedna: `Omega/fronty/SEZNAM-CHYBEJICIHO.md` (ústava v6, § DOPLŇOVÁNÍ A FRONTA).

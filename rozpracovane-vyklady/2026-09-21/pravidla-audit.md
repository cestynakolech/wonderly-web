# AUDIT PRAVIDEL — podklad k rozhodnutí (21. 9. 2026)

Přečteno celé: 9 zdrojů, 1 976 řádků. Nic nezměněno. Zkratky souborů:
`G` = `~/.claude/CLAUDE.md` (97) · `OL` = `~/CLAUDE.md` (64) · `OR` = `wonderly-web/.claude/orchestrator-prompt.md` (123)
`W` = `wonderly-web/CLAUDE.md` (57) · `Š` = `/Users/Shared/Škola/CLAUDE.md` (20) · `R` = `Omega/PRAVIDLA.md` (666)
`Ú` = `wonderly-web/OBSAH-PRAVIDLA.md` (260) · `A` = `~/.claude/agents/*.md` (7 souborů, 535) · `M` = MEMORY.md index (154)

## A) Tabulka pravidel

| # | pravidlo (zkráceně) | kde všude je | štítek | návrh |
|---|---|---|---|---|
| 1 | Komunikovat výhradně česky, příkazy vysvětlovat | G, Š, W, OR9, A(7×), R83, M | K | plné znění G; jinde nic (agenti přes sdílený blok) |
| 2 | Nezávislý kontrolor: autor ≠ kontrolor, čerstvý kontext, jen hotový výstup | G3, OR3, Ú8, A-kontrolor, A-exekutor, R32/206 | K | plné znění G3; Ú a agenti jen větou + odkaz |
| 3 | Kotvy: build, spočítané číslo, curl, skutečný soubor — ne „hotovo" | G4, OR4, Ú8, A-exekutor, A-kontrolor, R43/192 | K | plné znění G4 |
| 4 | Nic nemazat ani nepřesouvat v `/Users/Shared/Škola` | Š, Ú-zákaz9, A-exekutor, G (ptát se) | K | plné znění Š; jinde odkaz |
| 5 | Správná odpověď je v datech VŽDY první | Ú4+Ú8, R15, A-worker-kviz | K | plné znění Ú4 |
| 6 | Správná odpověď nesmí být systematicky nejdelší; prodlužuj distraktory | Ú8, R18, M | K | plné znění Ú8 (vykonává `zkontroluj.mjs` 6b) |
| 7 | Celá čísla ve výpočtech pro děti | G11, Ú8, R39, A(4×), M | K | plné znění Ú8; agenti přes sdílený blok |
| 8 | Max 3 pokusy stejně, ~6 celkem → ODLOŽENO + důvod | G, R87, A(7×) | K | plné znění G, zkrátit na 1 větu; agenti odkazem |
| 9 | Rozpočet vějíře: nejdřív malý rozsah, změřit, pak rozšířit | G8 | K | ponechat v G, 1 věta |
| 10 | ZADÁNÍ = SCHVÁLENÍ, kroky plynoucí ze zadání se neodklikávají | G, OR10, R88/90/94/95, A(5×), M(2×) | K | plné znění G; agenti i OR jen odkaz |
| 11 | PTÁT SE jen na: mazání/přesuny, mimo pracovní složky, publikování ven, platby, instalace, konfiguraci nasazení | G, OR10, R590 | K | plné znění G (seznam ověřen testem vrátného) |
| 12 | Zmražená pravidla — smyčka je sama neoslabí, mění je jen učitel | G11, A(5×), R111 | K | plné znění G11 |
| 13 | Vysvětlení vidí jen kdo odpoví špatně; zákaz úniku odpovědi mezi otázkami | Ú4+Ú8, R19/44, M | K | plné znění Ú |
| 14 | Řetěz zdrojů: PDF+prezentace → výklad → kvíz/hra/video (nic navíc, nic nevypadne, procvičit vše) | Ú1, R14, A(5× odkazem) | K | plné znění Ú1 — už je tak zavedeno, nechat |
| 15 | U čísel a faktů opora až ve ZDROJI (citace soubor + strana) | Ú1b4, R647, M | K | plné znění Ú1 |
| 16 | Videa se pro školní web NEVYHLEDÁVAJÍ, názornost se vyrábí | Ú6+zákaz1, R34, A-worker-media, M | K | plné znění Ú9; brána `testy/cizi-videa.mjs` |
| 17 | Cíl 21 kvízových otázek na podtéma (5–8 = velikost dávky) | Ú4, A-worker-kviz (popis i tělo), R14, M | K | plné znění Ú4 |
| 18 | Zvuk podkástů výhradně lokálně (OmniVoice), placené služby nikdy | R634, M, skill | K | plné znění R634 → přesunout do Ú6 |
| 19 | NAS se nikdy nečte plošně jako zdroj fotek pro veřejný web | R641, M | K | plné znění R641 |
| 20 | Chyby z deníku chyb se nikdy nemažou | R256, M | K | plné znění R256 |
| 21 | Test falešné hrany + diamant (rozděl → sesbírej → ověř → slož) | G1–2, OR2, skill /simulace | D | domov G1–2; OR jen „platí G, bod 1–2" |
| 22 | Hlídej tichá selhání: porovnej počet vrácených a očekávaných výsledků | G5, OR5 | D | domov G5; z OR pryč |
| 23 | Izolace zápisů: dva pracovníci nepíšou do téhož souboru | G6, OR6, A(4×), R86 | D | domov G6; agenti sdíleným blokem |
| 24 | Kontrakt uzlu: worker vrací PEVNÝ TVAR výstupu, ne volný text | G9, A(7× vlastní tvar), R109 | D | domov G9; v agentech zůstane jen konkrétní tvar |
| 25 | Worker vrací CESTU + shrnutí, nikdy obsah souborů | OR12, A(6×), M | D | domov OR12; agenti 1 větou |
| 26 | Strop odpovědi agenta 1 500 znaků | A(6× identický 5řádkový blok) | D | jediný domov = sdílený blok agentů |
| 27 | Šetři kontext; velké soubory (`temata.ts`, `kvizy.ts`) nečíst celé | OR8, A-exekutor, Ú2, M | D | domov OR8 |
| 28 | Dvě dráhy: GPU = 1 model + CPU = 1 proces, pojistka měří stroj | G, R85/169/175 | D | domov G (1 věta) + KDE `zamek_modelu.py` |
| 29 | Prahy baterie 30 % lokální / 15 % síťová | OL, R72/210, M | D | domov = kód `baterie.py` PRAHY; v textu jen odkaz |
| 30 | Po zápisu do sdíleného souboru ověřit POČTEM/obsahem, ne hlášením | OR13 (9 ř. příběhu), A-exekutor | D | domov A-exekutor; OR 1 věta |
| 31 | Postup nasazení: build → commit → push → curl ve smyčce | W (deklaruje se domovem), R22/23, M | D | domov W — ale R22/23 z rejstříku vyhodit |
| 32 | Serena: aktivovat projekt, v kódu se ptát Sereny místo grepu | A-pruzkumnik, A-kontrolor, R176/208/224, M | D | domov = sdílený blok agentů |
| 33 | `.pptx` nečíst v session, použít hotový popis / automat | OL, Ú2+zákaz8, A-pruzkumnik | D | domov Ú9 (zákaz), OL jen cesta ke skriptu |
| 34 | Externí odkazy jen české; jinak vlastní česká stránka | Ú3+zákaz6, R35, A(2×), M | D | domov Ú9 |
| 35 | Scéna simulace logická pro děti (voda dole, gravitace dolů) | Ú7, R36, A-worker-simulace, A-kontrolor, M | D | domov Ú7 |
| 36 | Orchestrátor práci nepřebírá, jen rozděluje a slučuje | OR úvod+1, R206, A-exekutor úvod, M | D | domov OR úvod |
| 37 | Tah nekončí dotazem ani čekáním (auto režim) | OR11, R616/623, M(2×) | D | domov OR11 |
| 38 | wonderly = JEDEN projekt s podprojekty | OR úvod, A-exekutor úvod, W, M(2×) | D | domov W |
| 39 | Kontrolora kvízů pouštět DVAKRÁT | Ú4, R21, skill | D | domov Ú4 |
| 40 | Hodnota smí být v kódu jen jednou; čísla z kódu NEOPISOVAT | R155/73/164/205, W | D | domov = `data/pravidla-registr.json` + `test_bez_kopii.py` |
| 41 | Nové měřidlo musí mít zapsaný obousměrný důkaz | R43, M | D | domov `testy/obousmerne.json` |
| 42 | Nasazení ověřovat opakovaně (Cloudflare šíří postupně) | R23, W, M | D | domov W (postup nasazení) |
| 43 | Čekání na doběhnutí práce se neodklikává | R92, M | D | domov = `povoleni_hook.py` |
| 44 | Zálohovat hooky/skilly zrcadlem do repa | R585/591 | D | domov `zaloha_git.py`; z rejstříku 1 řádek |
| 45 | „Piš ve stejném stylu jako okolní vzory" | A-exekutor | N | smazat — obecný návyk modelu |
| 46 | „Nepiš úvody, shrnutí shrnutí ani nabídky dalších kroků" | A-exekutor | N | smazat — kryje to strop 1 500 znaků |
| 47 | „Čti cíleně: nejdřív Grep/Glob, pak relevantní části" | A-pruzkumnik | N | smazat — obecný návyk |
| 48 | „Nevymýšlej si; když nenajdeš, napiš nenalezeno" | A-pruzkumnik, A-worker-media | N | zkrátit: „Nenalezené hlas jako NENALEZENO, nikdy nedoplňuj z hlavy." |
| 49 | „Nic nezapisuj, nic nespouštěj, nic neměň" | A-pruzkumnik | N | smazat — vynuceno seznamem `tools` |
| 50 | Zákaz zápisu do projektových souborů psaný 3× v jednom agentovi | A-worker-kviz/vyklad/media (~15 ř. každý) | N | zkrátit na 1 větu: „Zapisuješ jen svůj soubor ve scratchpadu; do sdílených souborů píše exekutor." |
| 51 | Seznam obchvatů vrátného (`node -e`, `git show`, `curl file://`…) | OR7 (10 ř.) | N | zkrátit: „Obsah souboru si nevytahuj oklikou — pošli agenta." |
| 52 | Výčet povolených příkazů vrátného v OR7 | OR7 | N | smazat — zdroj pravdy je `povoleni_hook.py` |
| 53 | Vrstvené slučování velkého vějíře | G10 | N | smazat — nikdy nedoloženo, vějíř je max 4 workeři |
| 54 | „Kdy graf NEpoužít" (5 případů) | G7 | N | zkrátit: „U malého nebo průzkumného úkolu je jednoduchá smyčka levnější." |
| 55 | Test falešné hrany — 3řádkový výklad | G1 | N | zkrátit: „Kroky bez závislosti na výsledku předchozího pouštěj naráz." |
| 56 | Ochrana proti zacyklení — 3 odrážky | G | N | zkrátit na 1 větu (limit sám je K, rozsah ne) |
| 57 | „Mac mlčí = žádný automat neběží" | OL | N | smazat — postřeh, ne pravidlo |
| 58 | „Hlavní poznatek analýzy" o delegování (5 ř.) | OL | N | zkrátit: „Lokální modely šetří tokeny jen v automatech, ne v session." |
| 59 | Příběh o 8 nevložených kvízových otázkách (9 ř.) | OR13 | N | zkrátit na 1 větu, příběh do deníku chyb |
| 60 | „Ověřuj kotvou, ne dojmem" + „Mělo by to fungovat není výsledek" | A-exekutor | N | smazat — kryje K #3 |
| 61 | „Časování animací kalibruj výpočtem" | A-worker-simulace | N | přesunout do `src/pages/skola2/_CLAUDE.md` |
| 62 | „Nespouštěj npm/ffmpeg/ollama/git" | A-kontrolor | N | zkrátit: „Bash jen na kontrolní výpočty a čtení stavu." |
| 63 | Kapitola PLÁN × WEB — 6 číslovaných nesouladů (20 ř.) | Ú10 | N | zkrátit: „Rozdíl proti časovému/tematickému plánu není vada webu a neopravuje se." |
| 64 | Stav modelů k 15. 8. + rozpory v obsazení rolí (12 ř.) | OR97–110 | N | smazat — zastaralé, zdroj pravdy `ollama list` + METRIKY-KOL.md |
| 65 | ~250 ř. příběhů deníkových automatů, které mají ✅ a test | R65–296, R529–595 | N | zkrátit na tvar `pravidlo (1 věta) \| soubor:funkce + test \| ✅`; příběh do DENIK-CHYB.md |
| 66 | Sekce „Co čeká na dodělání" | R132–136 | N | přesunout do `SAMOSTATNY-REZIM.md` — není pravidlo |
| 67 | `src/pages/<sekce>/CLAUDE.md` neexistuje — 29. 8. přejmenován na `_CLAUDE.md` | W9–11, Ú97/106/120, 4× ukazatelový CLAUDE.md (@import), R14 | U | **86 ř. pravidel sekcí se nenačítá ani nečte.** Opravit všech 8 odkazů na `_CLAUDE.md` a do W dopsat: „Soubory sekcí mají podtržítko, aby je Astro nepublikovalo; automaticky se NENAČÍTAJÍ — kdo v sekci pracuje, přečte je ručně." |
| 68 | Model průzkumníka: haiku × sonnet | R660 (haiku) × OR90 (sonnet, haiku 2× selhal) × frontmatter = sonnet | U | platí `sonnet`; opravit R660 na „průzkumník sonnet — haiku 21. 9. dvakrát vrátil falešné nenalezeno" |
| 69 | Lokální model na kód: qwen3.8:27b-mlx × qwen3:30b-a3b | OL23 × OL54; OR80 × OR118 | U | platí `qwen3.8:27b-mlx` (měření 21. 9.); `qwen3:30b-a3b` jen jako záloha — sjednotit v obou souborech |
| 70 | Hlavička: „checkpoint 21. 9. 2026 — příští revize každou neděli, tedy 9. 8., 16. 8., …" | OL4–6 | U | znění: „Revize dělby rolí každou neděli; poslední 21. 9. 2026, příští 28. 9. 2026." |
| 71 | „Musí zůstat 8 modelů", „gpt-oss smazán 8. 8." × `ollama list` = 11 modelů vč. gpt-oss:20b | R119, R146 × skutečnost | U | znění: „Počet modelů nehlídá nic; před mazáním ověř role v `graf_local.py` a `popisy_mist.KONTROLORI`. Stav vždy z `ollama list`, ne z textu." |
| 72 | „ollama list (jeden profil, neznámo který ze dvou — NEZJIŠTĚNO)" | OR97 | U | dozjistit a zapsat jeden profil, nebo větu smazat — nevyřešená nejistota v pravidlech mate |
| 73 | „Zapisovat metriky kol a vyhodnotit je 24. 8. 2026" — termín minul bez vyhodnocení | R102 | U | znění: „Metriky kol se vyhodnocují při nedělním WONDERLY AUDITU" (váže na datum, ne na jednorázový termín) |
| 74 | Otevřený bod F: „jedno vysvětlení na díl" × „díl pokrývá celý kvíz" (po cíli 21 otázek neudržitelné) | Ú11, R51 | U | rozhodne učitel; do rozhodnutí doplnit: „Brána měří jednotlivý díl; sérii měřit nelze." |
| 75 | PODMÍNKA „popisy prezentací před prací na fyzice 6" je vložena doprostřed tabulky zdrojů | Ú69–75 | U | vytáhnout nad tabulku jako samostatný odstavec + doplnit aktuální počet (30 popsáno, 6 chybí) |
| 76 | Schvalování videí: zrušeno 7. 8. → omylem vzkříšeno 10. 8. → vráceno; 3 znění v jednom souboru | R180, R222, R285, R304–319 | U | jedno znění: „Videa se učiteli NESCHVALUJÍ (stará 7. 8., nová 9. 8. 2026); člověk jen fáze `potrebuje-cloveka`." Ostatní výskyty smazat, ne přeškrtnout (R609). |
| 77 | ✅ u pravidla, jehož KDE jsou dva textové soubory — porušuje vlastní legendu (✅ = běží v kódu) | R121 vs legenda R7 | U | přeznačit na 📄, nebo doložit kód, který volbu modelu vynucuje |
| 78 | Dvě paměti projektu, není řečeno která platí | Š12 (`-Users-radek-soukromy-Desktop-Omega`) × běžící `-Users-Shared--kola` | U | doplnit: „Paměť se váže na složku session; při práci ze `Škola/` platí `-Users-Shared--kola`." |
| 79 | „media a hledání → gemma4 / ThinkingCap `[neověřeno]`" — role bez zkoušky, přitom worker-media je sonnet a videa nehledá | OR79 | U | řádek smazat — role neexistuje v podobě, v jaké je popsaná |
| 80 | Překlep „plat í napořád" | G19 | U | opravit na „platí napořád" |
| 81 | Poznámka o `ask-local` je až ZA `@~/CLAUDE.md` importem | G95–97 | U | přesunout nad import, nebo do `MODELY.md` |
| 82 | Subdomény, Astro, Cloudflare, R2, fonty, `worker.js` | W7–27 | P | → `wonderly-web/REPO.md` |
| 83 | Strom složek repa („Kde co je") | W29–37 | P | → `REPO.md` |
| 84 | Tabulka zdrojů pravdy s cestami (PDF, prezentace, ŠVP, plány, kvizy.ts…) | Ú61–89 | P | → `REPO.md`; v ústavě zůstane odkaz |
| 85 | Struktura složek učitele = struktura učiva (ročníky a celky) | Ú86–88, Š5 | P | → paměť `projekt-wonderly-kde-co-je` |
| 86 | Role lokálních modelů, velikosti, `num_predict` ≥ 300, `ask-mini`, LaunchAgent | OL20–32/60–62, R635 | P | → nový `Omega/dokumenty/MODELY.md` |
| 87 | Tabulky směrování na modely + cloudové modely subagentů | OR70–110 (37 ř.) | P | → `MODELY.md`, měření do `METRIKY-KOL.md` |
| 88 | Neinteraktivní volání Hermese plnou cestou | OR112–115, W22–27 | P | → skill `/hermes` (jediný domov) |
| 89 | Telegram: allowlist ID 8599881131, kanál | G82–87 | P | → paměť `projekt-telegram-kanal-vzdalene-zadani`; v G zůstanou 2 věty |
| 90 | `ORCHESTRATOR_ON`, `/orch-on`, `/orch-off` | W39, OR1–2 | P | → jen OR1 (1 řádek) |
| 91 | Sekce „Nastavení, které šetří odklikávání" (cesty settings.json) | R123–130 | P | → `REPO.md`; zdroj pravdy je `povoleni_hook.py` + test |
| 92 | Prahy a konstanty: 45 s/30 s kráječ, timeouty, 20/25 km, 60 min, 7 dní, 5 videí/den, ±0,3 s, 2,5 % | R kapitoly 10.–13. 8. | P | čísla žijí v kódu (sám rejstřík to na 4 místech říká) — v textu jen jméno konstanty |
| 93 | Seznam řídicích dokumentů deníku (PLAN-PORADEK, AUTOMATY, MISTA.xlsx) | R299–302, R346–359 | P | → `Omega/AUTOMATY.md` (už je jediným seznamem) |

## B) Čísla

- **Pravidel celkem po sloučení variant: 93** (počet výskytů je vyšší — jen zmražených K je v souborech 68 kopií).
- **Řádků textu pravidel dnes: 1 976** (G 97 · OL 64 · OR 123 · W 57 · Š 20 · R 666 · Ú 260 · A 535 · M 154), plus 86 řádků v `_CLAUDE.md` sekcí, které se dnes nenačítají ani nečtou.
- **K = 20** · **D = 25** · **N = 22** · **U = 15** · **P = 11**.
- **Odhad zkrácení: −49 % (1 976 → ≈ 1 010 řádků).** Rozpad: D (odkazy místo opisů) ≈ −330 ř. (−17 %), z toho −285 ř. jen sjednocením čtyř identických bloků v sedmi agentech · N (zkrácení) ≈ −480 ř. (−24 %), z toho −400 ř. převodem `PRAVIDLA.md` z příběhu na rejstřík · P (přesun do referencí) ≈ −155 ř. (−8 %).
- Cílové rozsahy: G 97→60 · OL 64→25 · OR 123→70 · W 57→35 · Š 20→12 · R 666→230 · Ú 260→190 · A 535→250 · M 154→140.

## C) Ablační dávky (N, od nejbezpečnějších)

**Dávka 1 — obecné návyky v agentech (#45, 46, 47, 48, 49, 50, 60, 54). Riziko nejnižší: nic z toho není v žádné bráně.**
Měření 2 týdny: (a) `METRIKY-KOL.md` — průměrná délka odpovědi agenta a tokeny/kolo musí klesnout, ne stoupnout; (b) `DENIK-CHYB.md` — třídy `format-odpovedi` a `zapis-do-sdileneho` nesmí zaznamenat NÁVRAT (trvající ≠ opakovaná); (c) opravné smyčky kontrolora na podtéma: dnes průměr 1, práh 1,3 — nad ním se dávka vrací. Kotva: `node zkontroluj.mjs` a `node testy/uniky.mjs` beze změny počtu nálezů.

**Dávka 2 — rozvláčné výklady v G, OL, OR (#51, 52, 53, 55, 56, 57, 58, 59).** Krátí se výklad, ne limit: „3 pokusy", „falešná hrana" i „ověř zápis počtem" zůstávají jako věta.
Měření 2 týdny: (a) `DENIK-CHYB.md` — nesmí se vrátit třída `neovereny-zapis` ani `dvojite-cteni-textu`; (b) log vrátného: počet zásahů na ČERNÉ listině musí zůstat stejný (zkrácení #52 nesmí nic povolit) — ověřit `python3 Omega/skripty/testy/test_povoleni_hook.py`, musí projít beze změny; (c) `METRIKY-KOL.md` — počet kol na dokončené podtéma nesmí stoupnout.

**Dávka 3 — `PRAVIDLA.md` z příběhu na rejstřík + Ú10/Ú11 (#63, 64, 65, 66, 91, 93). Nejcitlivější — dělat až po 1 a 2 a jen s nezávislým kontrolorem.**
Postup: zkrácení dělá exekutor, kontrolu jiný agent s čerstvým kontextem; před začátkem `git commit` (příběhy zůstanou v historii a v `DENIK-CHYB.md`).
Měření 4 týdny: (a) `python3 Omega/skripty/revize_automatu.py` musí dál hlásit 0 nálezů; (b) `node testy/obousmerne.mjs` — dluh měřidel nesmí vzrůst; (c) nedělní `WONDERLY AUDIT` 2× po sobě 0 nálezů; (d) `DENIK-CHYB.md` — žádný návrat třídy, jejíž příběh se zkrátil. Při jediném návratu se příslušný řádek vrací v plném znění, ne celá dávka.

## D) Kanonické mapy — kde má co bydlet

- **`~/.claude/CLAUDE.md` (≤ 60 ř.) — JEN zmražená K pravidla, která platí i mimo projekt:** čeština · zadání = schválení + seznam „ptát se jen na" · nezávislý kontrolor · kotvy · limit pokusů · zmražená pravidla · graf (falešná hrana, diamant, izolace, tichá selhání, rozpočet — každé 1 věta) · dvě dráhy 1 věta · Telegram 2 věty · offline 2 věty · `@~/CLAUDE.md`. Ven: vrstvené slučování, „kdy graf nepoužít", výčty cest.
- **`~/CLAUDE.md` (≤ 25 ř.) — jen PRAVIDLO dělby cena/výkon** (tabulka 3 vrstev + „deleguj do automatů, ne do konverzace" + „opakovanou kontrolu zapoj do skriptu"). Všechna jména modelů, velikosti, pasti a `ask-mini` → **nový `Omega/dokumenty/MODELY.md`** (P), měření → `METRIKY-KOL.md`.
- **`orchestrator-prompt.md` (≤ 70 ř.) — jen to, co platí pro orchestrátora a nikde jinde:** role „nedělám práci" · seznam agentů · falešná hrana · kontrolor povinný před nasazením · šetři kontext · worker vrací cestu · ověř zápis počtem · neusínej na dotazu · vrátný 3 řádky (odkaz na `povoleni_hook.py`). Tabulky modelů (37 ř.) → `MODELY.md`; příběhy nálezů → `DENIK-CHYB.md`.
- **`wonderly-web/CLAUDE.md` (≤ 35 ř.) — postup nasazení (jediný domov) + pravidlo řezu dokumentace + 1 řádek o orchestrátorském režimu.** Technologie, subdomény a strom složek → **nový `wonderly-web/REPO.md`** (P).
- **`OBSAH-PRAVIDLA.md` — jediný domov obsahových K pravidel fyziky** (kap. 1, 3–9). Kap. 2 (cesty) → `REPO.md` + paměť; kap. 10 → 2 věty; kap. 11 (bod F) → rozhodnutí učitele, ne pravidlo.
- **`src/pages/skola2/_CLAUDE.md`** — jediný domov technických specifik sekce; nejdřív opravit 8 rozbitých odkazů (#67), jinak dál nikdo nečte 86 řádků pravidel.
- **`Omega/PRAVIDLA.md` = REJSTŘÍK, ne třetí opis.** Jeden tvar řádku: `pravidlo (1 věta) | domov plného znění | KDE se vykonává (soubor:funkce + test) | ✅/📄`. Žádný příběh delší než jedna věta — příběhy patří do `Omega/dokumenty/DENIK-CHYB.md`. Legenda ✅/📄 platí bez výjimky (#77).
- **`~/.claude/agents/*.md`** — čtyři bloky, které jsou dnes v každém agentovi stejné (hlavička ústavy, „Schvalování", „Zacyklení a zmražená pravidla", „Strop délky odpovědi", zákaz zápisu do sdílených souborů), do **jednoho `~/.claude/agents/_SPOLECNE.md`**; v definici agenta zůstane role + postup + pevný tvar výstupu (≈ 30 ř. na agenta). **Před provedením ověřit, že agenti umí `@import`** — pokud ne, zůstane v každém agentovi jedna věta „Platí `_SPOLECNE.md`" + cesta, a vynucuje se testem, který porovná, že se blok nikde neopakuje (vzor `test_bez_kopii.py`).
- **`MEMORY.md`** zůstává indexem ukazatelů; plné znění nikdy v paměti, vždy odkaz na domov výše.

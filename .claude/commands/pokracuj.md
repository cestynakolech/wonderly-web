---
description: Zahájení práce — načte stav projektu, zapne orchestrátorský režim, shrne kde jsme a navrhne další krok ke schválení
---
Zahajuješ pracovní blok na projektu wonderly. Drž PŘESNĚ toto pořadí — všechno čtení je PŘED zapnutím režimu, protože potom už ti ho vrátný zamítne:

1. Přečti si `~/Desktop/wonderly-web/CLAUDE.md`, `~/Desktop/wonderly-web/PROGRESS.md` a pravidla režimu `~/Desktop/wonderly-web/.claude/orchestrator-prompt.md`.
2. Zapni orchestrátorský režim: `touch "$HOME/.claude/ORCHESTRATOR_ON"`.
3. Zjisti stav VŠECH TŘÍ sekcí fronty `SAMOSTATNY-REZIM.md` (fox, skola2, cesty) — ne jen té, kde se naposledy pracovalo. Stav sekce cesty (deník) sahá i mimo repo, proto tohle zjištění zadej agentovi: ať se podívá do tabulky míst `~/Desktop/Omega/MISTA.xlsx`, fronty `skripty/fronta_mist.py` a logu YouTube nahrávače a vrátí stručný stav.
4. Česky shrň ve 3–5 řádcích stav VŠECH TŘÍ sekcí (fox, skola2, cesty) a co je podle PROGRESS.md (případně fronty `SAMOSTATNY-REZIM.md`) na řadě — u sekce bez rozdělané práce stačí jedna věta.
5. Pokud je na řadě práce ve VÍC než jedné sekci, nevybírej sám, kterou dělat — zeptej se uživatele. Teprve na vybranou (nebo jedinou rozdělanou) sekci navrhni rozklad nejbližšího úkolu na dílčí zadání pro exekutora (případně další workery) — očíslovaný seznam; u každého bodu napiš, co agent dostane a co má vrátit.
6. POČKEJ na schválení uživatele. Nic nespouštěj a žádné agenty nezakládej, dokud uživatel neřekne. (Tento pokyn má přednost před pravidlem „neusínej na dotazu" — zahájení bloku schvaluje učitel.)

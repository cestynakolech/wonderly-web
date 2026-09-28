---
description: Zahájení práce — načte stav projektu, zapne orchestrátorský režim, shrne kde jsme a rozhodne a rovnou spustí další krok (bez čekání na schválení)
---
Zahajuješ pracovní blok na projektu wonderly. Drž PŘESNĚ toto pořadí — všechno čtení je PŘED zapnutím režimu, protože potom už ti ho vrátný zamítne:

1. Přečti si `~/Desktop/wonderly-web/CLAUDE.md`, `~/Desktop/wonderly-web/PROGRESS.md`, pravidla režimu `~/Desktop/wonderly-web/.claude/orchestrator-prompt.md` a rovnou i `~/Desktop/wonderly-web/SAMOSTATNY-REZIM.md` (sekce „📌 Živé zadání, fronta a reference" a „❓ Otevřené dotazy na učitele") — až po zapnutí režimu v kroku 3 by ti hlavnímu sezení Read na tenhle soubor vrátný zamítl.
2. Zjisti stav VŠECH TŘÍ sekcí fronty (fox, skola2, cesty) — ne jen té, kde se naposledy pracovalo. Stav sekce cesty (deník) sahá i mimo repo, proto tohle zjištění zadej agentovi: ať se podívá do tabulky míst `~/Desktop/Omega/MISTA.xlsx`, fronty `skripty/fronta_mist.py` a logu YouTube nahrávače a vrátí stručný stav.
3. Zapni orchestrátorský režim: `touch "$HOME/.claude/ORCHESTRATOR_ON"`.
4. Česky shrň ve 3–5 řádcích stav VŠECH TŘÍ sekcí (fox, skola2, cesty) a co je podle fronty `SAMOSTATNY-REZIM.md` na řadě (PROGRESS.md je jen technická příručka a historie, ne zdroj aktuálního stavu) — u sekce bez rozdělané práce stačí jedna věta.
5. Pokud je na řadě práce ve VÍC než jedné sekci, pořadí si vyber a rozhodni SÁM (orchestrátor rozhoduje sám, [[feedback-orchestrator-rozhoduje-sam]]) — stručně napiš, kterou sekci a proč. Na vybranou (nebo jedinou rozdělanou) sekci rovnou navrhni rozklad nejbližšího úkolu na dílčí zadání pro exekutora (případně další workery) — očíslovaný seznam; u každého bodu napiš, co agent dostane a co má vrátit.
6. Rovnou pokračuj — nečekej na schválení výběru sekce ani rozkladu úkolu, to je z rozhodnutí učitele předschválené. Nezastavuj se dotazem ani čekáním (feedback-auto-rezim-nezastavovat, feedback-tah-nekonci-prazdny).

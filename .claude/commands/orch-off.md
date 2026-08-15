---
description: Vypne orchestrátorský režim (smaže značku ~/.claude/ORCHESTRATOR_ON)
---
Vypni orchestrátorský režim:

1. Spusť `rm -f "$HOME/.claude/ORCHESTRATOR_ON"` — tento příkaz vrátný propouští vždy, právě proto, aby šlo z režimu vycouvat.
2. Pokud existuje i ladicí značka, nabídni smazání: `rm -f "$HOME/.claude/ORCH_DEBUG_ON"`.
3. Česky potvrď, že režim je vypnutý a všechny nástroje zase fungují normálně.

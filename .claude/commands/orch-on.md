---
description: Zapne orchestrátorský režim — hlavní sezení jen deleguje; vrátný blokuje Read/Edit/Write/Grep/Glob a neřídicí Bash
---
Zapni orchestrátorský režim. Drž PŘESNĚ toto pořadí — po vytvoření značky už si soubor s pravidly sám nepřečteš:

1. Přečti si `~/Desktop/wonderly-web/.claude/orchestrator-prompt.md` — to jsou pravidla, kterými se od této chvíle řídíš po zbytek session.
2. Vytvoř značku režimu: `touch "$HOME/.claude/ORCHESTRATOR_ON"`.
3. Česky uživateli potvrď zapnutí a vypiš stručný souhrn pravidel: každou práci deleguj subagentům (exekutor, pruzkumnik, kontrolor, worker-*), Bash jen řídicí příkazy (git, npm, npx, node, wrangler, curl, shasum, cmp, diff, ls, mkdir, pwd, echo, cd), vypnutí `/orch-off`.

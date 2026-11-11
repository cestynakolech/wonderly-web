HLÍDAČ `orchestrator-guard.sh` (`.claude/hooks/`) – co vynucuje

- Kde platí: jen na MacBooku (rozhodnutí učitele D3, 10. 11. 2026: na MacBooku ponechat zapnutý a popsaný,
  na mini odpojit z nastavení). Na mini není zapojený.
- Spínač: existence souboru `~/.claude/ORCHESTRATOR_ON`; bez něj hlídač nedělá nic. Ladicí log
  `/tmp/orchestrator-guard.log` píše jen při existenci `~/.claude/ORCH_DEBUG_ON`. Vypnutí: smazat značku.
- Platí jen pro hlavní sezení; subagenti (vyplněné `agent_id`) smí vždy.
- Hlavnímu sezení zamítá Read, Edit, Write, Grep a Glob (práci deleguje subagentovi).
- Bash: složené příkazy (`&&`, `;`, roura, `$(`, zpětný apostrof, `>`) zamítá vždy; jinak pustí jen
  příkaz, jehož první slovo je na seznamu v ř. 77 skriptu, a mazání značek režimu (ř. 79).
- Je to kázeň, ne zámek: hlídač kouká jen na první slovo a povolené programy umí samy číst i zapisovat
  (např. `node -e`, `npm run`, `git show`, `git config alias`, `curl -o`). Takové obchvaty se nepoužívají.
- Co smí hlavní session v repu a vše ostatní (role, start, fronta, nasazení, předávka) neurčuje tento
  soubor: platí ústava v6 (`/Library/Application Support/ClaudeCode/wonderly/USTAVA-WEBU.md`, kopie
  na MacBooku `/Users/Shared/Omega/ustava/`) a `~/.claude/CLAUDE.md`.
- Hlídač agent neupravuje ani neobchází (ústava, ZÁKAZY).

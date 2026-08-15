#!/usr/bin/env bash
# Vrátný orchestrátorského režimu — kompletní verze (15. 8. 2026).
#
# SPÍNAČ: existence souboru ~/.claude/ORCHESTRATOR_ON (z desktopové aplikace
# nejdou nastavit proměnné prostředí, soubor jde vytvořit odkudkoli).
# Zapíná /orch-on, vypíná /orch-off nebo `rm ~/.claude/ORCHESTRATOR_ON` —
# příkaz mazající značku vrátný propouští VŽDY, ať se z režimu dá vycouvat.
# Ladicí režim: existence ~/.claude/ORCH_DEBUG_ON → log /tmp/orchestrator-guard.log
#
# POZOR: je to KÁZEŇ, ne zámek. Allowlist Bashe kouká jen na PRVNÍ SLOVO
# příkazu a povolené programy (node, npm, git, curl…) umí samy spouštět,
# číst i zapisovat cokoli. Podrobný výčet obchvatů je v orchestrator-prompt.md.

ZNACKA="$HOME/.claude/ORCHESTRATOR_ON"
[ -e "$ZNACKA" ] || exit 0

VSTUP="$(cat)"
US=$'\x1f'

# Z JSONu na stdinu vytáhneme agent_id, tool_name a příkaz Bashe jedním
# voláním (jq; když chybí, python3 — na macOS je vždy). Chyba parsování
# nesmí skript shodit — pole prostě zůstanou prázdná.
if command -v jq >/dev/null 2>&1; then
  DATA="$(printf '%s' "$VSTUP" | jq -r '[(.agent_id // ""), (.tool_name // ""), ((.tool_input.command // "") | gsub("\\s+"; " ") | sub("^ "; ""))] | join("\u001f")' 2>/dev/null)"
else
  DATA="$(printf '%s' "$VSTUP" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
except Exception:
    d = {}
ti = d.get("tool_input") or {}
prikaz = " ".join(str(ti.get("command") or "").split())
print("\x1f".join([str(d.get("agent_id") or ""), str(d.get("tool_name") or ""), prikaz]))
' 2>/dev/null)"
fi
AGENT_ID="${DATA%%"$US"*}"
ZBYTEK="${DATA#*"$US"}"
TOOL_NAME="${ZBYTEK%%"$US"*}"
PRIKAZ="${ZBYTEK#*"$US"}"

LOG="/tmp/orchestrator-guard.log"
DEBUG=0
[ -e "$HOME/.claude/ORCH_DEBUG_ON" ] && DEBUG=1
if [ "$DEBUG" = 1 ]; then
  printf 'agent=%s tool=%s\n' "${AGENT_ID:-HLAVNI-SEZENI}" "$TOOL_NAME" >> "$LOG"
fi

# Subagent (vyplněné agent_id) smí pracovat vždy — zákaz platí jen pro
# hlavní sezení, které má delegovat, ne pro ty, na které deleguje.
[ -n "$AGENT_ID" ] && exit 0

zamitni() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}

if [ "$TOOL_NAME" = "Bash" ]; then
  PRVNI="${PRIKAZ%% *}"
  ROZHODNUTI=deny
  # NEJDŘÍV složenost: &&, ;, |, $(, zpětný apostrof, > — přes povolené první
  # slovo se nesmí dát provézt nic dalšího. Prostý `rm` značky žádný z těchto
  # znaků neobsahuje, takže únikový východ tudy projde; propašovat k němu
  # druhý příkaz naopak nejde (spadne právě tady).
  case "$PRIKAZ" in
    *"&&"*|*";"*|*"|"*|*'$('*|*'`'*|*">"*) ROZHODNUTI=slozeny ;;
    *)
      case "$PRVNI" in
        # allowlist řídicích příkazů — vědomě NE seznam zakázaných (těch je nekonečno)
        git|npm|npx|node|wrangler|curl|shasum|cmp|diff|ls|mkdir|pwd|echo|cd) ROZHODNUTI=allow ;;
        # únikový východ: mazání značek režimu se propouští VŽDY
        rm) case "$PRIKAZ" in *ORCHESTRATOR_ON*|*ORCH_DEBUG_ON*) ROZHODNUTI=allow ;; esac ;;
      esac ;;
  esac
  if [ "$DEBUG" = 1 ]; then
    printf 'BASH %s prvni=%s: %.120s\n' "$ROZHODNUTI" "$PRVNI" "$PRIKAZ" >> "$LOG"
  fi
  [ "$ROZHODNUTI" = allow ] && exit 0
  if [ "$ROZHODNUTI" = slozeny ]; then
    zamitni 'Orchestratorsky rezim: slozene prikazy (&&, ;, roura, $(), zpetny apostrof, presmerovani >) jsou zakazane. Bud praci deleguj exekutorovi, nebo prikaz rozdel na samostatne kroky. Vypnuti rezimu: /orch-off nebo rm ~/.claude/ORCHESTRATOR_ON.'
  fi
  PRVNI_BEZP="$(printf '%s' "$PRVNI" | tr -cd 'A-Za-z0-9._/-' | cut -c1-40)"
  zamitni "Orchestratorsky rezim: Bash je jen na rizeni (git, npm, npx, node, wrangler, curl, shasum, cmp, diff, ls, mkdir, pwd, echo, cd). Prikaz zacinajici '${PRVNI_BEZP}' deleguj exekutorovi. Vypnuti rezimu: /orch-off nebo rm ~/.claude/ORCHESTRATOR_ON."
fi

# Read / Edit / Write / Grep / Glob hlavního sezení
zamitni "Orchestratorsky rezim: hlavni sezeni je JEN orchestrator - necte a nemeni soubory samo. Deleguj subagentovi (exekutor, pruzkumnik, kontrolor, worker-*) a pracuj jen s jeho kratkym shrnutim. Vypnuti rezimu: /orch-off nebo rm ~/.claude/ORCHESTRATOR_ON."

# CLAUDE.md — trvalý kontext projektu wonderly-web

> **Komunikuj vždy česky** (uživatel je učitel-laik; před spouštěním příkazů krátce vysvětli, co dělají).
> **Na začátku každé session si přečti i `PROGRESS.md`** — je v něm aktuální stav a čím navázat.
> **Na KONCI každé session `PROGRESS.md` aktualizuj** (přidej datovaný záznam do sekce Historie, uprav HOTOVÉ/ZBÝVÁ) a **commitni + pushni** — tím se stav i historie uloží na GitHub jako vratná verze. Po dokončení celého ročníku přidej git tag jako milník.

## Co to je
Statický web na doméně **wonderly.cz** (Cloudflare, zdarma). Tři sekce na subdoménách:
- **lab.wonderly.cz** = `/skola2` — 2. stupeň ZŠ. Specifika: `src/pages/skola2/CLAUDE.md`.
- **cesty.wonderly.cz** = `/cesty` — cestovatelský deník. Specifika: `src/pages/cesty/CLAUDE.md`.
- **fox.wonderly.cz** = `/fox` — 1. stupeň. Specifika: `src/pages/fox/CLAUDE.md`.
- **wonderly.cz** — rozcestník (`src/pages/index.astro`).

**JEDNO repo, JEDEN build, JEDEN Worker.** Subdomény jsou jen přesměrování v `worker.js` podle Host hlavičky (fox.→`/fox`, lab.→`/skola2`, cesty.→`/cesty`) + servírování fotek z R2 přes `/media/`. Žádná sekce se nenasazuje samostatně — **push na `main` nasazuje vždy všechny tři sekce naráz**, takže rozbitá prebuild brána kvůli jedné sekci zablokuje nasazení všech.

## Technologie
- **Astro** (statický generátor), TypeScript. Build: `npm run build` (výstup do `dist/`).
- **Cloudflare Workers** — auto-deploy z GitHub větve `main` (~1 min po pushi).
- **Cloudflare R2** — úložiště `wonderly-media` pro plnokvalitní fotky deníku (binding MEDIA).
- Fonty: `@fontsource/patrick-hand` + `caveat` (kreslený „whiteboard" styl, latin-ext = česká diakritika).
- `worker.js`, `wrangler.jsonc` — routing subdomén + R2. **NEMĚNIT bez důvodu.**
- **Hermes Agent** (lokální modely, Ollama) — ZAPOJEN jako záložní pracant na
  mechanickou práci (paměť `feedback-hermes-zalozni-pracant`), spouští se
  neinteraktivně přes plnou cestu: `~/.hermes/hermes-agent/venv/bin/hermes -z "zadání"`
  (vrací jen holý text odpovědi). Alias `hermes` ukazuje na podpříkaz `chat`
  (interaktivní) a pro skriptovaná volání se nehodí. **Hermes nikdy nepushuje,
  nemaže ani nenahrává ven** — výsledky jen odevzdává k převzetí (viz `SAMOSTATNY-REZIM.md`).

## Kde co je (společná kostra)
Každá sekce má soubory ve TŘECH podstromech — stránky, komponenty, data:
```
src/pages/<sekce>/       ← routovací šablony + CLAUDE.md sekce (zdroj pravdy pravidel)
src/components/<sekce>/  ← komponenty (CLAUDE.md = ukazatel na pravidla sekce)
src/data/                ← datové soubory školy; src/data/cesty/ = data deníku
                           (v obou složkách CLAUDE.md-ukazatel, ať se pravidla načtou i tady)
public/                  ← statické soubory (materialy/ škola, obrazky/, cesty/)
```

**Orchestrátorský režim:** zapíná se příkazem `/orch-on` (vytvoří značku `~/.claude/ORCHESTRATOR_ON`; vrátný pak hlavnímu sezení blokuje Read/Edit/Write/Grep/Glob i neřídicí Bash a práce se deleguje subagentům), vypíná `/orch-off` nebo `rm ~/.claude/ORCHESTRATOR_ON`.

## Pravidlo řezu dokumentace
Do tohoto souboru jen to, co platí pro všechny sekce; specifika sekce jen do jejího souboru; **nic nesmí být na dvou místech**. Ukazatelové CLAUDE.md (jednořádkový `@import`) nejsou kopie — obsah žije vždy jen v `src/pages/<sekce>/CLAUDE.md`. Orchestrátor tato specifika sám nevidí (má zakázané čtení) — musí nechat příslušný `CLAUDE.md` načíst agentovi, který v dané sekci pracuje.

## Postup nasazení (společný pro všechny sekce)
```
npm run build                 # ověří, že se web sestaví (prebuild = zkontroluj.mjs + testy simulací)
git add -A src public/materialy
git commit -m "..."
git push origin main          # Cloudflare nasadí sám do ~1 min — VŠECHNY sekce naráz
# ověření: curl -s -o /dev/null -w '%{http_code}' https://lab.wonderly.cz/...
```

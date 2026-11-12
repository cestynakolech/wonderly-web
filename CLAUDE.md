# CLAUDE.md — trvalý kontext projektu wonderly-web

> **Komunikuj vždy česky** (uživatel je učitel-laik; před spouštěním příkazů krátce vysvětli, co dělají).
> **Na začátku každé session proveď START podle ústavy webu** (`/Library/Application Support/ClaudeCode/wonderly/USTAVA-WEBU.md`
> § START; kopie na MacBooku `/Users/Shared/Omega/ustava/`): `start_web.py`, nejnovější `Omega/koordinace/zpravy/PREDAVKA-*.md`,
> `Omega/fronty/SEZNAM-CHYBEJICIHO.md`, `Omega/dokumenty/KATALOG-PRACANTU.md` § 0. SAMOSTATNY-REZIM.md: ❓ otevřené dotazy na učitele a zákaz ⛔ NESAHAT (odpor kůže); fronta je jen SEZNAM-CHYBEJICIHO.md.
> `PROGRESS.md` je jen
> technická příručka (jak co přidat, kde co leží) a historie — nečti ji jako zdroj aktuálního stavu.
> **Na KONCI session a před /clear** se dělá předávka jen skriptem `predavka.py` (ústava § PŘEDÁVKA).
> Do repa zapisuje a nasazuje jen exekutor, jen z mini (ústava § ŘÍZENÍ A NASAZENÍ).

## Co to je
**Školní web lab.wonderly.cz** (tohle repo) je projekt, na který se vztahuje ústava webu. Patří k němu propustka
z hodiny (Apps Script), pracovní prostor a skripty `~/Desktop/Omega` a zdrojové školní podklady
`/Users/Shared/Škola`. **Cestování a volný čas** (cestovatelský deník cesty.wonderly.cz, YouTube automat,
appka `/tour`) je oddělený projekt, spí; návod ve skillu `cestovani`, pravidla webu se na něj nevztahují.
Fronta úkolů webu je jedna — `Omega/fronty/SEZNAM-CHYBEJICIHO.md`.

Statický web na doméně **wonderly.cz** (Cloudflare, zdarma). Tři sekce na subdoménách:
- **lab.wonderly.cz** = `/skola2` — 2. stupeň ZŠ. Specifika: `src/pages/skola2/_CLAUDE.md`.
- **cesty.wonderly.cz** = `/cesty` — cestovatelský deník. Specifika: `src/pages/cesty/_CLAUDE.md`.
- **fox.wonderly.cz** = `/fox` — 1. stupeň. Specifika: `src/pages/fox/_CLAUDE.md`.
- **wonderly.cz** — rozcestník (`src/pages/index.astro`).

> **Soubory sekcí mají podtržítko** (`_CLAUDE.md`), aby je Astro nepublikovalo jako
> stránku — a proto se **automaticky NENAČÍTAJÍ**. Kdo v sekci pracuje, přečte si je
> ručně (Read). Přejmenováno 29. 8. 2026.

**JEDNO repo, JEDEN build, JEDEN Worker.** Subdomény jsou jen přesměrování v `worker.js` podle Host hlavičky (fox.→`/fox`, lab.→`/skola2`, cesty.→`/cesty`) + servírování fotek z R2 přes `/media/`. Žádná sekce se nenasazuje samostatně — **push na `main` nasazuje vždy všechny tři sekce naráz**, takže rozbitá prebuild brána kvůli jedné sekci zablokuje nasazení všech.

## Technologie
- **Astro** (statický generátor), TypeScript. Build: `npm run build` (výstup do `dist/`).
- **Cloudflare Workers** — auto-deploy z GitHub větve `main` (asi 6 minut po pushi; sestavení ~4,5 min).
- **Cloudflare R2** — úložiště `wonderly-media` pro plnokvalitní fotky deníku (binding MEDIA).
- Fonty: `@fontsource/patrick-hand` + `caveat` (kreslený „whiteboard" styl, latin-ext = česká diakritika).
- `worker.js`, `wrangler.jsonc` — routing subdomén + R2. **NEMĚNIT bez důvodu.**

## Kde co je (společná kostra)
Každá sekce má soubory ve TŘECH podstromech — stránky, komponenty, data:
```
src/pages/<sekce>/       ← routovací šablony + _CLAUDE.md sekce (zdroj pravdy pravidel)
src/components/<sekce>/  ← komponenty (CLAUDE.md = ukazatel na pravidla sekce)
src/data/                ← datové soubory školy; src/data/cesty/ = data deníku
                           (v obou složkách CLAUDE.md-ukazatel na _CLAUDE.md sekce)
public/                  ← statické soubory (materialy/ škola, obrazky/, cesty/)
```

**Hlídač `orchestrator-guard.sh`:** zapnutý jen na MacBooku (rozhodnutí učitele D3, 10. 11. 2026), na mini odpojený; co vynucuje, popisuje `.claude/orchestrator-prompt.md`.

## Pravidlo řezu dokumentace
Do tohoto souboru jen to, co platí pro všechny sekce; specifika sekce jen do jejího souboru; **nic nesmí být na dvou místech**. Ukazatelové `CLAUDE.md` (jednořádkový `@import`) nejsou kopie — obsah žije vždy jen v `src/pages/<sekce>/_CLAUDE.md`. Specifika sekce si přečte agent, který v dané sekci pracuje.

## Postup nasazení (společný pro všechny sekce; dělá jen exekutor z mini, jeden naráz)
```
# obsah: src/data/temata.ts (výklad+materiály), src/data/kvizy.ts (otázky)
# média: public/materialy/fyzika/<rocnik>/<tema>/<podtema>/
#        infografiky zmenšit na ~1200px jpg q82 (PIL), písničky WAV→m4a/mp3 (ffmpeg)
npm run build                 # ověří, že se web sestaví (prebuild = zkontroluj.mjs + testy simulací + obousmerne.mjs)
npm test                      # testy musí projít před commitem
git add <vlastní cesty v src public/materialy testy>   # nikdy -A (jen vlastní cesty); testy: nová komponenta bez zapsaného testy/simulace/*.mjs a
                                         # doloženého testy/obousmerne.json by na Cloudflare spadla na prebuildu
git commit -m "..."           # commit = jedno téma, nepřibalovat nesouvisející soubory
git push origin main          # Cloudflare nasadí sám asi za 6 minut — VŠECHNY sekce naráz
# ověření: asi po 6 minutách curl živé stránky s cache-busterem ?x= (bez něj může vrátit starou verzi z cache):
curl -s -A wonderly-check "https://lab.wonderly.cz/<cesta>/?x=$RANDOM$RANDOM" | grep -q "Spustit kvíz" && echo OK
# ruční `npx wrangler deploy` jen když se změna neobjeví do 8 minut
```

Tenhle blok je JEDINÝ domov postupu nasazení — PROGRESS.md i skill `/wonderly` sem odkazují, neopisují.

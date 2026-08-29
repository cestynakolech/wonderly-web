# generate-test.json.ts — vyndáno z buildu 29. 8. 2026

## Co to je

Endpoint, který měl generovat tisknutelné PDF testy pro podtémata.
Vznikl 24. 8. 2026 commitem `b4c6505` („Auto-commit: Systematic monitor
progress") — nikdo si ho nezadal.

## Proč tu leží a ne v src/

**Pět dní blokoval veškeré nasazení webu.** Importuje balíček `pdfkit`, který
ale nikdy nebyl zapsán do `package.json` ani `package-lock.json`. Na Macu se
build dařil, protože tam `pdfkit` v `node_modules` fyzicky ležel; Cloudflare
instaluje striktně podle zámku (`npm clean-install`), takže tam chyběl:

```
[vite]: Rollup failed to resolve import "pdfkit" from
  src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/generate-test.json.ts
```

Poslední úspěšný build: `e16954b`, 24. 8. 2026 — tedy těsně před vznikem tohoto
souboru. Každý build po něm selhal. Web mezitím běžel dál, ale servíroval verzi
z 24. 8., takže se pět dní práce k žákům nedostalo.

## Proč se to neopravilo doplněním pdfkit

Na endpoint **nevede jediný odkaz** — 0 výskytů kdekoli v `src/`, není
v dokumentaci ani v bráně. Ověřeno v čistém klonu: bez tohoto souboru se
postaví **477 stránek**, tedy přesně tolik jako s ním. Na web nepřidával nic.
Doplnit kvůli tomu nemalou závislost (a generovat PDF pro každé podtéma
s kvízem při každém buildu) nedávalo smysl.

## Nic se nemaže

Soubor zůstává tady, kompletní (203 řádků). Kdyby učitel tisknutelné PDF testy
chtěl, je to řádný úkol do `wonderly-fronta` s důkazem hotovosti — ne vedlejší
produkt automatického commitu. Tehdy se pdfkit řádně doplní do `package.json`
a soubor se vrátí do `src/pages/`.

## Ponaučení

Brána `zkontroluj.mjs` prošla i na Cloudflare (`✅ Vše zapojené správně`)
těsně předtím, než build spadl. Kontroluje obsah, ale ne to, jestli je každý
importovaný balíček zapsaný v `package.json`. Doplnit takovou kontrolu = tahle
třída chyb se ozve hned, ne po pěti dnech.

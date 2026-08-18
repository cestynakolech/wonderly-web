# Hermes: pokračuj tam, kde Claude skončil

Tento soubor VŽDY popisuje aktuální rozdělanou práci. Hermes: přečti obecný návod
`~/Desktop/Omega/navody/wonderly-web-navod-pro-ollama-hermes.md`, pracuj
v `~/Desktop/wonderly-web` a udělej úkoly ze sekce „Co je teď rozdělané".
Po resetu kreditů Claude všechno zkontroluje a opraví.

## Co je teď rozdělané (stav 29. 7. 2026, ~17:00 — ✅ SPLNĚNO, ověřeno 18. 8. 2026)

Dorovnání slabých kvízů (pokračování). Upravuj JEN `src/data/kvizy.ts`.
Tyto 4 bloky měly po 6 otázkách; kontrola nad daty (`node testy/data.mjs`,
18. 8. 2026) ukazuje, že už mají 10–11 otázek — úkol je hotový, není co dělat:

1. `informatika/9-rocnik/digitalni-technologie/bezpecnost-pocitace-a-dat` (11)
2. `informatika/9-rocnik/digitalni-technologie/digitalni-stopa-a-identita` (11)
3. `informatika/9-rocnik/digitalni-technologie/pocitacove-site-a-internet` (10)
4. `informatika/9-rocnik/programovaci-projekty/klonovani-animace-hry` (10)

Obecný cíl počtu otázek na podtéma: měřením nad daty (`node`, medián ze všech
150 kvízových bloků, 18. 8. 2026) vychází **medián 13 otázek/podtéma, rozsah 8–22**
— tímto číslem se řídit u nových/slabých bloků (viz `src/pages/skola2/CLAUDE.md`),
ne dřívějším „10" ani „~21".

POZOR: přesné klíče si ověř grepem v kvizy.ts — když blok nenajdeš přesně,
najdi ho podle poslední části (např. `digitalni-stopa`), NEZAKLÁDEJ nový.

## Postup pro KAŽDÝ blok zvlášť

1. Najdi blok v `src/data/kvizy.ts` a vypiš si existující otázky.
2. Přečti si výklad podtématu v `src/data/temata.ts` (stejný slug).
3. Navrhni nové otázky JEN k učivu, které výklad obsahuje a stávající otázky netestují.
4. Vlož je před uzavírací `],` bloku, stejný formát jako ostatní řádky:
   `{ text: '…', odpovedi: ['SPRÁVNÁ', 'špatná', 'špatná'], vysvetleni: '…' },`

## Pevná pravidla (NEOBCHÁZET)

- Správná odpověď je v poli `odpovedi` VŽDY PRVNÍ a je jediná obhajitelná.
- Výpočty musí dávat CELÁ čísla.
- Názvy bloků Scratche jen dle oficiálního českého překladu (scratch-l10n),
  např. „po kliknutí na zelenou vlaječku", „vytvoř klon sebe sama".
- Vysvětlení otázky nesmí prozrazovat odpověď jiné otázky téhož bloku.
- Nová otázka nesmí opakovat ani protiřečit stávajícím otázkám bloku.
- Nic nemazat, nepřesouvat; žádné jiné soubory neupravovat.

## Po každém bloku

```
cd ~/Desktop/wonderly-web && node zkontroluj.mjs && npm run build
```

Když obojí projde: `git add src/data/kvizy.ts && git commit -m "Hermes: doplnen kviz <blok>"`
(commit ANO, `git push` NE — Hermes nikdy nepushuje, nemaže ani nenahrává ven;
změnu odevzdá jako necommitnutou/commitnutou lokálně a Claude/učitel ji při
převzetí zkontroluje a pushne).
Když něco selže, vrať změnu (`git checkout -- src/data/kvizy.ts`) a zapiš problém dolů do Poznámek.

## Poznámky Hermese

(sem piš, co se povedlo / nepovedlo)

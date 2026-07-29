# Hermes: pokračuj tam, kde Claude skončil

Tento soubor VŽDY popisuje aktuální rozdělanou práci. Hermes: přečti obecný návod
`~/Desktop/Omega/navody/wonderly-web-navod-pro-ollama-hermes.md`, pracuj
v `~/Desktop/wonderly-web` a udělej úkoly ze sekce „Co je teď rozdělané".
Po resetu kreditů Claude všechno zkontroluje a opraví.

## Co je teď rozdělané (stav 29. 7. 2026, ~17:00)

Dorovnání slabých kvízů (pokračování). Upravuj JEN `src/data/kvizy.ts`.
Tyto 4 bloky mají po 6 otázkách — každý doplň na 10 (tedy +4 otázky na blok):

1. `informatika/9-rocnik/bezpecnost-a-digitalni-svet/bezpecnost-pocitace-a-dat`
2. `informatika/9-rocnik/bezpecnost-a-digitalni-svet/digitalni-stopa-a-identita`
3. `informatika/9-rocnik/site-a-sluzby/pocitacove-site-a-internet`
4. `informatika/8-rocnik/hry-ve-scratchi/klonovani-animace-hry`

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

Když obojí projde: `git add src/data/kvizy.ts && git commit -m "Hermes: doplnen kviz <blok>" && git push`.
Když něco selže, vrať změnu (`git checkout -- src/data/kvizy.ts`) a zapiš problém dolů do Poznámek.

## Poznámky Hermese

(sem piš, co se povedlo / nepovedlo)

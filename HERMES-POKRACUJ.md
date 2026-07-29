# Hermes: pokračuj tam, kde Claude skončil

Tento soubor VŽDY popisuje aktuální rozdělanou práci. Claude ho aktualizuje,
kdykoli mu hrozí konec kreditů. Hermes: přečti obecný návod
`~/Desktop/Omega/navody/wonderly-web-navod-pro-ollama-hermes.md`, pracuj
v `~/Desktop/wonderly-web` a udělej úkoly ze sekce „Co je teď rozdělané".
Po resetu kreditů Claude všechno zkontroluje a opraví.

## Co je teď rozdělané (stav 29. 7. 2026, ~13:05)

**NIC — vše hotovo.** Claude dorovnal poslední 3 slabé kvízy (kladka +1,
nakloněná rovina +2, události a vstupy +2), nechal všech 12 nových otázek
(včetně 7 z kola E7) projít nezávislým kontrolorem a 3 nalezené chyby opravil
(2 úniky odpovědí, 1 duplicita). Build prošel, nasazeno. Hermes nemá žádný úkol.

## Postup pro KAŽDÝ blok zvlášť

1. Najdi blok v `src/data/kvizy.ts` a vypiš si existující otázky.
2. Přečti si výklad podtématu v `src/data/temata.ts` (stejný slug).
3. Navrhni nové otázky JEN k učivu, které výklad obsahuje a stávající otázky netestují.
4. Vlož je před uzavírací `],` bloku, stejný formát jako ostatní řádky:
   `{ text: '…', odpovedi: ['SPRÁVNÁ', 'špatná', 'špatná'], vysvetleni: '…' },`

## Pevná pravidla (NEOBCHÁZET)

- Správná odpověď je v poli `odpovedi` VŽDY PRVNÍ a je jediná obhajitelná.
- Výpočty musí dávat CELÁ čísla (u nakloněné roviny F = G·h/l — volit G, h, l tak, aby vyšlo celé; např. 900·2/6 = 300).
- Názvy bloků Scratche jen podle oficiálního českého překladu (paleta Události: „po kliknutí na zelenou vlaječku", „po stisku klávesy …", „po kliknutí na mě").
- Vysvětlení otázky nesmí prozrazovat odpověď jiné otázky téhož bloku.
- Nová otázka nesmí opakovat ani protiřečit stávajícím otázkám (u kladky: F = G/2 u volné kladky, pevná mění jen směr; u nakloněné roviny nekopírovat otázky o serpentinách/šroubu/vzorci — už tam jsou).
- Nic nemazat, nepřesouvat; žádné jiné soubory neupravovat.

## Po každém bloku

```
cd ~/Desktop/wonderly-web && node zkontroluj.mjs && npm run build
```

Když obojí projde: `git add src/data/kvizy.ts && git commit -m "Hermes: doplnen kviz <blok>" && git push`.
Když něco selže, vrať změnu (`git checkout -- src/data/kvizy.ts`) a zapiš problém dolů do Poznámek.

## Poznámky Hermese

(sem piš, co se povedlo / nepovedlo)

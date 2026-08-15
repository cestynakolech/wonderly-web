# Tahák pro učitele — jak se s projektem pracuje

## Čím začít práci
Napište **`/pokracuj`**. Claude si přečte stav projektu, zapne režim „šéf",
ve 3–5 řádcích shrne, kde jsme minule skončili, navrhne další krok — a **počká
na vaše schválení**. Bez vašeho „ano" se nic nespustí.

## Režim „šéf" (orchestrátor)
Hlavní Claude jen řídí a práci zadává pomocníkům; sám nesmí číst ani měnit
soubory — když napíše, že něco „deleguje", je to schválně, tak to má být.

- **Zapnutí:** `/orch-on` (nebo v terminálu příkaz `orch`)
- **Vypnutí:** `/orch-off`
- Nouzové vypnutí, kdyby nic jiného nefungovalo — napište do terminálu:

  `rm ~/.claude/ORCHESTRATOR_ON`

## Záznam o tom, co se dělo (log)
- Kde je: `/tmp/orchestrator-guard.log`
- Jak si ho přečtete — do terminálu napište:

  `cat /tmp/orchestrator-guard.log`

- Jak ho číst: řádek `agent=HLAVNI-SEZENI` je hlavní Claude („šéf");
  řádek `agent=` s dlouhým kódem je pomocník. Pomocníci smí všechno,
  šéf jen řídicí příkazy. U příkazů Bash je vidět i rozhodnutí:
  `allow` = povoleno, `deny` = zamítnuto, `slozeny` = zamítnuto,
  protože příkaz slepoval víc věcí dohromady.
- Zapisuje se, jen když existuje soubor `~/.claude/ORCH_DEBUG_ON`
  (teď je zapnutý) **a zároveň** je zapnutý režim šéfa.
- **Pozor:** složka `/tmp` se při restartu Macu čistí. Chcete-li si záznam
  nechat, zkopírujte si ho někam jinam dřív, než Mac vypnete.

## Když se něco chová divně
1. Vypněte režim: **`/orch-off`** — všechna omezení tím zmizí.
2. Když ani to nejde: do terminálu `rm ~/.claude/ORCHESTRATOR_ON`.
3. Napište Claudovi, co se stalo, ať se podívá do logu.
4. Klid v duši: celé omezování dělá jediný skript
   (`.claude/hooks/orchestrator-guard.sh`) a ten bez značky
   `ORCHESTRATOR_ON` nedělá vůbec nic. Smazáním značky je všechno
   jako dřív — nic jiného se v počítači nemění.

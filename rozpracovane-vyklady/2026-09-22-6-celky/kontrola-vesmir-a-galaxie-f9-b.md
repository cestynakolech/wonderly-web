# Závěrečná kontrola po opravách: vyklad-vesmir-a-galaxie-f9.md
Kontrolor B, 22. 9. 2026. Podklad: `~/Desktop/Omega/dokumenty/prezentace-popisy/9 vesmir_a_jeho_vznik.md` (.pptx neotevřen) + dosavadní blok `node podtema.mjs . get fyzika/9-rocnik/energie-a-vesmir/vesmir-a-galaxie`.

VERDIKT: NEPROŠLO

NEVYŘEŠENÉ: žádné
- 1 (Sagittarius A*) — vyřešeno: nepravdivá věta „drží na oběžné dráze celou naši galaxii" ve výkladu NENÍ (grep 0); v oddílu Černé díry je „Je hmotná jako miliony Sluncí dohromady." + „pomáhají formovat a ovlivňovat galaxie" (snímek 27 doslova). Rozpor web × snímek přiznán v ZDROJE („OPRAVA: …").
- 2 (duplicita) — vyřešeno: Sagittarius A* je ve výkladu 1×, v oddílu Černé díry (řádek 39). V „Věděl(a) jsi" už není; v oddílu Galaxie zůstává jen obecné „Ve středu mnoha galaxií…" (snímek 19), to není duplicita.
- 3 (ztráta zápisu) — vyřešeno: ZAPIS má 24 bodů, doplněno „vznik částic: protony a neutrony" (snímek 3, bod 3) a „pak vznikly galaxie" (snímek 2, image1 „Vznik galaxií, hvězd, planet atd."). Všech 5 dosavadních bodů z dat je obsahově pokryto.
- 4 (nepokrytá látka) — vyřešeno: temná hmota je v definici galaxie (řádek 18) s oporou snímek 5 („první galaxie, složené z hvězd, plynů a temné hmoty"); obecná věta „Galaxie se mohou přitahovat a spojovat." je na řádku 43, doslova dle snímku 28. Obojí přiznáno v ZDROJE jako DOPLNĚNO.
- 5 (dlouhé věty) — vyřešeno: měřeno skriptem po blocích, žádná věta v OBSAHu nemá >20 slov. Andromeda rozdělena na 3 věty (max 19 slov), světlo galaxií na 2 věty (max 13). Jediný hraniční blok viz DROBNOSTI.
- 6 (dlouhé body) — vyřešeno: „Sagittarius A*: černá díra v Galaxii" (6), „galaxie: hvězdy, plyn, prach" (4), „první hvězdy: po 400 milionech let" (6, zkratka „mil." rozepsána). Ostatní body 3–6 slov.

NOVÉ:
1. **Cizí tag na konci souboru** — `vyklad-vesmir-a-galaxie-f9.md:103` obsahuje řádek `</content>`. Podle kontraktu za sekcí ZDROJE nic není a v commitnuté verzi tenhle řádek NEBYL (`git show HEAD:… | tail` končí větou „Ostatní věty a body…"; `git diff` ho ukazuje jako `+</content>`). Je to artefakt opravného zápisu, ve zbývajících 8 výkladech téže dávky se nevyskytuje (grep -c = 0). Oprava: smazat řádek 103 (nic jiného neměnit).

DROBNOSTI:
1. „Je hmotná jako miliony Sluncí dohromady." (ř. 39) — tvrzení je fyzikálně pravdivé (Sagittarius A* ≈ 4,3 mil. M☉), ale podklad uvádí jen slovo „supermasivní" (snímek 27) a ZDROJE u téhle věty citaci nemají. Doporučení: v ZDROJE doplnit, že „miliony Sluncí" je dětský překlad pojmu „supermasivní" ze snímku 27.
2. Bod číslovaného seznamu „Vznik atomů — asi po 380 000 letech se elektrony spojily s jádry do neutrálních atomů a vesmír se stal průhledným" má 20 slov (na stropu). Zděděné z dosavadního bloku, nález A ho nevytýkal; lze rozdělit na dvě věty.
3. ZAPIS bod „disk silný asi 3 000 světelných let" = 6 slov (7 tokenů kvůli mezeře v čísle) — v pořádku, jen na horní hranici.
4. „galaxii Andromeda" (ř. 43) × podklad „galaxie v Andromedě" (snímek 28) — běžné zjednodušení, věcně v pořádku.

## Znovu ověřeno bez nálezu
- ZAPIS: JSON validní (`json.loads` prošel), klíče `zakon` + `body`, 24 řetězců, žádný prázdný klíč.
- Struktura: 1× h2, 7× h3 (strop 7), žádný `<em>`, sekce přesně `## OBSAH` / `## ZAPIS` / `## ZDROJE`.
- Odstavce: max 4 věty (2, 2, 4, 4); položka seznamu max 3 věty. Žádné metakomentáře uvnitř OBSAHu.
- Čísla proti podkladu: 13,8 miliardy (snímek 2), 380 000 let (snímek 3), 400 milionů let (snímek 2 image1), 100 000 ly a 3 000 ly a 300 miliard hvězd (snímek 24 image16), 200 miliard galaxií (snímek 20 image14), čtyři tvary (snímek 21), mléčný pás a hlavní rovina (snímek 25), temná energie (snímek 2 image1). 4,5 miliardy let u Andromedy v podkladu není — ponecháno z dat a přiznáno v ZDROJE.
- Proti dosavadnímu bloku se neztratila žádná věta ani bod (porovnáno s výstupem `podtema.mjs get`); jediné odstraněné tvrzení je vědomá OPRAVA z nálezu 1.

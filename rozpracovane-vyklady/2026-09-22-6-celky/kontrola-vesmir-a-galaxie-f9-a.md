# Nezávislá kontrola: vyklad-vesmir-a-galaxie-f9.md (9. ročník, slug vesmir-a-galaxie)
Kontrolor A, 21. 9. 2026. Podklad: popis prezentace `~/Desktop/Omega/dokumenty/prezentace-popisy/9 vesmir_a_jeho_vznik.md` (PDF k podtématu neexistuje) + dosavadní blok `src/data/temata.ts`, slug `vesmir-a-galaxie`.

VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY: 6

1. **VĚCNÁ CHYBA (opravit před nasazením)** — sekce „✏️ Věděl(a) jsi, že…", věta „Je tak hmotná, že svou gravitací drží na oběžné dráze celou naši galaxii."
   Co je špatně: fyzikálně nepravda. Sagittarius A* má asi 4,3 milionu hmotností Slunce, což je ~0,0003 % celkové hmoty Mléčné dráhy (≈1,5·10¹² M☉) a ~0,007 % hmoty jejích hvězd. Oběh Slunce kolem středu určuje rozložená hmota celé galaxie (hvězdy, plyn, temná hmota), ne černá díra.
   Opora: žádná. Snímek 27 říká jen „Ve středu Mléčné dráhy je supermasivní černá díra (Sagittarius A*)." a „Pomáhají formovat a ovlivňovat galaxie." — nic o držení galaxie na oběžné dráze. Tvrzení je zděděné z dosavadního bloku (věta tam je doslova), ale je nesprávné, takže se nesmí jen „ponechat beze změny".
   Co má být: přeformulovat ve smyslu snímku 27, např. „Je hmotná jako miliony Sluncí dohromady a ovlivňuje okolí ve středu galaxie." A rozpor (web × snímek 27) nahlásit v sekci ZDROJE — v návrhu nahlášen není.

2. **Duplicita téhož pojmu** — nový oddíl „Černé díry" („Uprostřed Mléčné dráhy je obří černá díra jménem Sagittarius A*.") × bullet v „Věděl(a) jsi" („Přesně uprostřed Mléčné dráhy se skrývá obří černá díra se jménem Sagittarius A*?"). Táž informace dvakrát, navíc potřetí obecně v oddílu „Galaxie" („Ve středu mnoha galaxií se nachází obří černá díra."). Porušuje požadavek A kontraktu (každý pojem dořeknout, text neskáče). ZDROJE duplicitu přiznávají („ponechána i tam beze změny"), ale text zůstává dvojí — informace z „Věděl jsi" se má sloučit do oddílu Černé díry (zajímavost lze nahradit údajem o hmotnosti, snímek 27).

3. **Ztráta části dosavadního zápisu** — sekce ZAPIS. Dosavadní bod v datech zní „Od svého vzniku se vesmír rozpíná a postupně v něm vznikly částice, atomy, hvězdy a galaxie." V nových 22 bodech je „vesmír se od vzniku rozpíná", „atomy: asi po 380 000 letech", „první hvězdy: asi po 400 mil. letech" — ale **vznik částic ani vznik galaxií v zápisu nejsou**. Železné pravidlo kontraktu: dnešní `zapis` musí v novém zůstat celý. Doplnit dva body, např. „vznik částic: protony a neutrony" (snímek 3, bod 3) a „pak vznikly galaxie" (snímek 2 image1 „Vznik galaxií, hvězd, planet atd.", snímek 5).

4. **Nepokrytá látka z podkladu bez poznámky** — sekce ZDROJE. (a) Snímek 5: „Po Velkém třesku se začaly formovat první galaxie, složené z hvězd, plynů a **temné hmoty**." Temná hmota není ve výkladu ani mezi „NAVRŽENO K DOPLNĚNÍ / MIMO SCOPE", přitom ZDROJE uvádějí u snímku 5 „shoda … beze změny". (b) Snímek 28, obecná věta „Galaxie se mohou přitahovat a spojovat." v hlavním textu chybí — je jen konkrétní Andromeda v „Věděl jsi". Buď doplnit, nebo označit dle kontraktu.

5. **Věty nad jazykový strop** (požadavek C: do ~20 slov; kontrakt „přeskládá, **zjednoduší**"): „Naše Mléčná dráha se řítí vesmírem vstříc sousední galaxii Andromeda — až se za přibližně 4,5 miliardy let srazí, jednotlivé hvězdy se ale skoro určitě do sebe nenarazí, protože jsou od sebe v galaxii nesmírně daleko." = **35 slov**; „Světlo z nejvzdálenějších galaxií k nám letí miliardy let — když se na ně díváme, vidíme vlastně vesmír takový, jaký vypadal dávno v minulosti." = **23 slov**. Obě zděděné, přestavba je měla rozdělit na kratší věty (nic se tím nemaže).

6. **Drobnost — body zápisu nad 3–6 slov** (požadavek B): „Sagittarius A*: černá díra v centru Galaxie" (7), „první hvězdy: asi po 400 mil. letech" (7, navíc zkratka „mil." — v OBSAHu je správně „400 milionech let"), „galaxie = hvězdy + plyn + prach" (7 tokenů). Zkrátit / rozepsat zkratku.

## Ověřeno BEZ nálezu (doložené citace z podkladu)
- 13,8 miliardy let, velký třesk, hustý a horký stav → snímek 2 (doslova).
- Šest kroků vývoje včetně „380 000 let, vznik atomů" → snímek 3 (doslova).
- **200 miliard galaxií** (změna proti webu „přes 100 miliard") → snímek 20, image14.jpg: „odhad 200 miliard galaxií v pozorovatelném vesmíru". Změna je doložená a v ZDROJE přiznaná jako OPRAVA. OK.
- **První hvězdy 400 milionů let** → snímek 2, image1.png (časová osa): „Vznik prvních hvězd 400 milionů let". OK.
- **Šířka disku 3 000 ly** → snímek 24, image16.jpg: „průměr 100 000 ly, šířka 3000 ly" (jde o tloušťku disku, pohled z boku). Skutečná hodnota tenkého disku je menší (~1 000 ly), ale platí podklad učitele. OK.
- **Temná energie / zrychlování rozpínání** → snímek 2, image1.png: „Temná energie akcelerace expanze vesmíru". OK.
- **Definice černé díry** „objekt s tak silnou gravitací, že z něj neunikne ani světlo" + „pomáhají formovat a ovlivňovat galaxie" → snímek 27, doslova. OK.
- Mléčná dráha: spirální s příčkou, průměr 100 000 ly, 300 miliard hvězd, Slunce v rameni → snímky 23 a 24. OK.
- Mléčný pás + hlavní rovina galaxie → snímek 25, doslova. OK.
- Čtyři tvary galaxií, gravitace, černá díra ve středu mnoha galaxií → snímky 19, 21, 22. OK.
- Andromeda „4,5 miliardy let" → v popisu číslo není, je v dosavadním bloku (nevyřazuje se), v ZDROJE poctivě přiznáno. OK.
- Kvantová fluktuace / inflace / doba temna → správně odloženo jako „NAVRŽENO K DOPLNĚNÍ". OK.
- Snímky 7–17 (Slunce, planety) patří jinému podtématu `slunecni-soustava` — vyřazení ze scope je správné.
- Formální: JSON v ZAPIS **validní** (klíče `zakon`, `body` v pořadí dle kontraktu, prázdné klíče vynechány); **22 bodů je únosné** — sourozenecké návrhy téže dávky mají 8–39 bodů (medián ~18), body jsou jednořádkové a zápis pokrývá celý výklad; 7× h3 = přesně na stropu (7); žádný `<em>`; čísla od tisíce s mezerou (100 000, 380 000, 3 000); sekce přesně `## OBSAH` / `## ZAPIS` / `## ZDROJE`, za ZDROJE nic; žádné metakomentáře v OBSAHu; odstavce nejvýše 4 věty.
- Rozpor uvnitř podkladu: text snímku 2 uvádí 13,8 miliardy let, obrázek image1.png „13,7 miliardy let". Výklad drží 13,8 (text snímku) — správně, jen pro informaci učiteli.

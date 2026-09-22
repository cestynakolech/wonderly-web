VERDIKT: NEPROŠLO

Blokující je jediný nález (č. 1 — věcná chyba v „zápisu do sešitu"); ostatní jsou drobnosti. Po opravě bodu 1 je materiál jinak v pořádku.

Kontrolováno proti: PDF „/Users/Shared/Škola/7/4 Světlo/21 Odraz světla, zákon odrazu/Odraz světla, zákon odrazu.pdf" (6 s.), `informace-pro-podcast.txt` (tatáž složka), popis prezentace „SVĚTELNÉ JEVY 7 [Automaticky uloženo].md" (snímky 35–37), dosavadní blok `fyzika/7/svetlo-a-jeho-sireni/odraz-svetla` v `src/data/temata.ts`, kontrakt ZADANI-WORKER-VYKLAD.md, OBSAH-PRAVIDLA.md § 3.

OVĚŘENO BEZ NÁLEZU
- Zákon odrazu „Úhel odrazu je roven úhlu dopadu.", zápis α′ = α — PDF str. 3 doslovně; shoda i s prezentací (snímek 37, image33: „Úhel odrazu se rovná úhlu dopadu. Odražený paprsek leží v rovině dopadu.").
- Kolmice dopadu, jedna rovina, kolmice i pro zakřivené plochy (u koule spojnice středu s bodem dopadu) — PDF str. 4–6, sedí.
- Zrcadla (hladký lesklý povrch, rovinná/kulová/válcová, vyleštěný kov pod sklem), klidná hladina a okenní tabule, optická značka se šrafováním — PDF str. 2, citace v ZDROJE jsou doslovné a strany sedí.
- Dosavadní obsah zachován celý: všechny tři odrážky o površích, celá pasáž „Odrazka na kole", zákon odrazu, zrcadla, klíče `vzorec`, `zakon`, `jednotky` i obsah všech 4 dosavadních bodů zápisu.
- Struktura: 1× h2 (shodné s `nazev` „Odraz světla, zákon odrazu"), 4× h3, 0× <em>, odstavce max 4 věty, věty do 20 slov, JSON v ZAPIS validní (`JSON.parse` OK, 18 bodů), soubor začíná `## OBSAH`, za ZDROJE nic dalšího.
- Nezdrojované pasáže („dvě rovnoběžná zrcadla", „Odrazka na kole") jsou v ZDROJE poctivě přiznány jako pouze z dosavadního bloku; fyzikálně jsou obě správně (koutový odražeč vrací paprsek do směru, odkud přišel).

NÁLEZY
1. [ZÁVAŽNÉ] ZAPIS, `body`, druhý bod: „neprůhledná prostředí: světlo odrážejí" — zkrácením se ztratila podmínka a vznikla nepravda. PDF 21 str. 1 říká: „Optická prostředí, která nepropouští ANI NEPOHLCUJÍ světlo, světlo odráží."; PDF 19 str. 9 k neprůhlednému prostředí: „světlo se v něm buď pohltí nebo se od něho na povrchu odrazí". Neprůhledné prostředí tedy světlo odrážet NEMUSÍ (černé oblečení ho pohltí). Chyba je navíc v zápisu, který si žák opisuje do sešitu, a odporuje sesterskému výkladu `svetlo-jeho-zdroje` („neprůhledné — světlo neprochází, buď se pohltí, nebo se odrazí na povrchu"). MÁ BÝT: např. „co světlo nepropustí ani nepohltí: odrazí se" (PDF str. 1).

2. [DROBNÉ] OBSAH, sekce „Zákon odrazu", odrážka „oba úhly měříme od kolmice dopadu (kolmice k ploše v bodě dopadu)" — v hlavním textu nikde nestojí, CO úhel dopadu a úhel odrazu jsou; pojmy se objeví jen ve větě zákona a pak jako „oba úhly", definice zůstala pouze v ZAPIS `jednotky`. PDF str. 4 je má výslovně: „Úhel dopadu α: úhel mezi dopadajícím paprskem a kolmicí dopadu", „Úhel odrazu α´: úhel mezi odraženým paprskem a kolmicí dopadu". Kontrakt bod A žádá každý pojem dořeknout, než přijde další. MÁ BÝT: obě definice doplnit do textu sekce „Zákon odrazu".

3. [DROBNÉ] OBSAH, sekce „Odraz na různých površích" — ZDROJE (řádek o PDF str. 1) uvádějí jako pokryté příklady „stěny místnosti" u rozptylu a „hladký plech, okenní tabule" u rovné lesklé plochy, ale ve výkladu žádný z nich není (zůstalo jen „zrcadlo, klidná hladina"). ZDROJE tedy hlásí shodu se zdrojem, která v textu chybí. MÁ BÝT: buď příklady doplnit (PDF str. 1), nebo je v ZDROJE nevykazovat jako zařazené.

4. [DROBNÉ] ZAPIS, `body` — 18 položek proti 4 dosavadním a 5 bodům schváleného vzoru (`vyklad-zakon-zachovani-f8.md`); pět z nich se týká zrcadel („zrcadlo: hladký lesklý povrch", „zrcadla podle tvaru…", „zrcadlo: vyleštěný kov + sklo", „hladina vody, okenní tabule…", „značka zrcadla…") a dva odrazky. Pro sedmý ročník je to na opisování hodně. MÁ BÝT: sloučit příbuzné body (zrcadla do 2 řádků, odrazka do 1), cíl ~12 bodů.

5. [DROBNÉ] celý OBSAH — výklad neobsahuje jediné číslo ani příklad, ačkoli zákon odrazu se dá ukázat na celých číslech (paprsek dopadne pod úhlem 30° → odrazí se pod úhlem 30°; kolmý dopad 0° → 0°). Sekce „Pro zvídavé: počítáme" chybí. Kontrakt ji při absenci počítání povoluje vynechat, takže nejde o porušení — ale pro pochopení α′ = α by jeden příklad s celými čísly pomohl. MÁ BÝT: zvážit doplnění krátkého příkladu (VLASTNÍ PŘÍKLAD) nebo ponechat beze změny dle rozhodnutí učitele.

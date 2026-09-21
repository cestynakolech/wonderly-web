VERDIKT: PROŠLO

Kontrolováno (3. kolo, úzké zadání): `vyklad-slunecni-soustava-f9.md` proti protokolu
`kontrola-slunecni-soustava-f9-b.md` (NEVYŘEŠENÉ 1, NOVÉ 2, DROBNOSTI 4) a proti PDF
`/Users/Shared/Škola/9/3. Vesmír/22.  Sluneční soustava/22.  Sluneční soustava.pdf`
(pdftotext -layout po stranách -f/-l). Nic mimo zadané body se nekontrolovalo.

(a) OVĚŘENÍ VYTČENÝCH BODŮ

1. NEVYŘEŠENÉ z kola b (metakomentáře v ZDROJE) — VYŘEŠENO.
   Skript nad celým souborem nenašel ani jeden z vytčených řetězců:
   „doplněn do OBSAH i ZAPIS", „kontrakt C", „teď oba zákony číslují",
   „zkrácen z 39 na 18 položek podle nálezu kontroly", ani slova „kontrola/nález/TODO".
   Zbylé formulace v ZDROJE (ř. 113 „opraveno podle fyziky, ne podle doslovného znění PDF",
   ř. 114 „Formulace «na povrchu» opravena na «v atmosféře» podle PDF str. 10") jsou
   doložení ROZDÍLU proti podkladu a proti dosavadnímu bloku webu, ne komentář k postupu —
   do ZDROJE patří. Metakomentář tedy žádný nezůstal.

2. NOVÉ 1 z kola b (atmosféry plynných planet) — VYŘEŠENO.
   Ř. 30 nyní: „V jejich atmosférách je kromě vodíku a helia i metan a čpavek — ty jim
   dávají barvu." Rozpor s předchozí větou téhož odstavce („složené hlavně z vodíku
   a helia jako Slunce") zmizel, tvrzení je fyzikálně správné.
   Odchylka od PDF str. 10 („Mají mohutné husté atmosféry složené převážně z metanu
   a čpavku" — ověřeno vlastním výpisem strany 10) je poctivě přiznaná v ZDROJE ř. 113.
   Slovo „metan" je jinde v OBSAH jen u Uranu (ř. 34, barva) a u Kuiperova pásu (ř. 42) —
   nikde se netvrdí, že je hlavní složkou.

3. NOVÉ 2 z kola b (citace 3. Keplerova zákona str. 24 → 23) — VYŘEŠENO a OVĚŘENO V PDF.
   ZDROJE ř. 127 i ř. 128 uvádějí „PDF str. 23".
   Vlastní výpis PDF str. 23 (pdftotext -layout -f 23 -l 23) obsahuje doslova:
   „➢ Třetí Keplerův zákon: Poměr druhých mocnin oběžných dob planet T je roven poměru
   třetích mocnin jejich středních vzdáleností a, kdy dobu oběhu T dosazujeme v letech
   a střední vzdálenost a v astronomických jednotkách."
   Na str. 23 je také „➢ Druhý Keplerův zákon" (ř. 127 cituje str. 22–23 správně:
   první zákon je na str. 22, druhý a třetí na str. 23). Str. 24 obsahuje jen
   „Pro zajímavost" a UPOZORNĚNÍ — číslo strany tedy sedí.
   Znění v OBSAH ř. 58 i v ZAPIS (`vzorec`, `vzorecSlovy`, `zakon`) je s PDF v souladu
   včetně jednotek (T v letech, a v AU).
   Přepočet příkladu (node): 4³ = 64, √64 = 8, 4^1,5 = 8 → T₂ = 8 let sedí;
   formulace ř. 61 mluví o době („osmkrát déle"), ne o rychlosti — správně.

(b) ŽÁDNÁ NOVÁ CHYBA OPRAVAMI NEVZNIKLA

- ZAPIS je validní JSON (json.loads OK), klíče `vzorec`, `jednotky`, `vzorecSlovy`,
  `zakon`, `body`; `body` má 19 položek (strop 22 dodržen). Počet 19 souhlasí
  s tvrzením v ZDROJE ř. 130 („19 stručných položek") — proti kolu b přibyl bod
  „meteoroid: vzniká rozpadem komety", což zároveň řeší drobnost b) z kola b.
- Věty: skript nad textem bez HTML značek nenašel v celém OBSAH ani jednu větu
  nad 20 slov (nejdelší zůstává pod limitem).
- Odstavce: žádné `<p>` nemá víc než 4 věty (kritický odstavec „Plynné planety" ř. 30
  má po opravě právě 4 věty).
- Cizí značky: žádné `</content>`, `<em>`, `<br>`, `<div>`, markdown `**`, TODO;
  jen tři nadpisy `## OBSAH`, `## ZAPIS`, `## ZDROJE` a povolené `<h2>/<h3>/<p>/<ul>/<li>/<strong>`.
- Struktura OBSAH → ZAPIS → ZDROJE zachována, počítací část zůstává poslední.
- Drobnost d) z kola b (shluk mezer ve `vzorec`) je opravena: ř. 66 má jednoduché mezery.

NEVYŘEŠENÉ: žádné
NOVÉ: žádné

DROBNOSTI (jazykové, nezakládají NEPROŠLO):
a) Ř. 26 (odrážka Mars) má 5 vět — jediný zbytek drobnosti a) z kola b (u Jupiteru ř. 32
   a Komet ř. 43 je nyní 4 a 4). Pokud limit „nejvýš 4 věty" platí i na `<li>`, hodí se
   jednu větu ubrat nebo odrážku rozdělit.
b) Na vědomí (shodně s bodem c) kola b, beze změny a bez nároku na opravu): ř. 54,
   2. Keplerův zákon — formulace o „opačném poměru rychlostí a vzdáleností" platí přesně
   jen v přísluní a odsluní; je doslovně převzatá z PDF str. 23.

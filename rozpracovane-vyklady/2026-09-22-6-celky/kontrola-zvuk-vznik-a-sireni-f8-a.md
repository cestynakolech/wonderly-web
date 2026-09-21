VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY:
1. DROBNÉ (citace stran) — ZDROJE, odrážka „Tón vzniká pravidelným kmitáním, hluk
   nepravidelným kmitáním → PDF str. 4“. Ve skutečnosti je oddíl „Tón a hluk“ až na straně 5
   (ověřeno `pdftotext -f 5 -l 5`: strana 5 začíná „Tón a hluk“). MÁ BÝT: PDF 34 str. 5.
2. DROBNÉ (citace stran) — ZDROJE, odrážka „Rychlost zvuku závisí na prostředí… → PDF str. 4–5“.
   Oddíl „Rychlost zvuku“ i vysvětlení částicemi jsou na straně 5 (hodnoty 340/1 500/5 000 m/s
   str. 5, vakuum 0 m/s str. 6). MÁ BÝT: str. 5 (příp. 5–6).
3. DROBNÉ (zákaz tichého rozhodnutí o rozporu) — ZDROJE, poslední odrážka „Snímek 7 prezentace
   uvádí hranici slyšitelného zvuku do 20 kHz, zatímco PDF str. 3 uvádí 16 kHz… ponechána
   hodnota z PDF“. Rozhodnutí je správné a zdůvodněné, ale podle OBSAH-PRAVIDLA.md § 3 VÝKLAD
   se rozpor zdrojů MUSÍ zapsat do `~/Desktop/Omega/dokumenty/kontrola-podkladu-*.md`.
   Ověřeno: v `kontrola-podkladu-fyzika8.md` o tomto rozporu není nic (grep „20 kHz“ vrací
   jen popis prezentace). MÁ BÝT: záznam rozporu 16 kHz / 20 kHz do kontrola-podkladu-fyzika8.md.
4. DROBNÉ (pokrytí prezentace) — ZDROJE, odrážka „Prezentace Sound_Physics.md snímky 2–4, 9,
   10, 12, 13 … obsahově souhlasí s PDF“: chybí snímek 5, který učí, že amplituda určuje
   intenzitu (hlasitost) zvuku a intenzita se udává v decibelech. Tato látka není ve výkladu
   ani označena jako MIMO SCOPE (a není ani ve výkladu „Vnímání zvuku, hlasitost zvuku“).
   MÁ BÝT: doplnit jednu větu o amplitudě a hlasitosti, nebo v ZDROJE zdůvodnit přesun
   do podtématu 35 (prezentace je rovnocenný zdroj, § 3 VÝKLAD).
5. DROBNÉ (zápis tvrdí víc než výklad) — ZAPIS, bod „ultrazvuk se odráží nejlépe“. V OBSAH
   tato věta není (je jen „Odraz ultrazvuku se využívá…“). Tvrzení má oporu v PDF str. 7
   („ultrazvuk se odráží nejlépe“) i v prezentaci snímek 11, ale zápis má opakovat výklad.
   MÁ BÝT: větu doplnit do OBSAH (sekce „Odraz zvuku“), jinak ji kvíz nesmí zkoušet.
6. DROBNÉ (tvar zápisu) — ZAPIS, `jednotky`: „rychlost šíření zvuku — jednotka m/s (metr za
   sekundu)“ nemá značku. Kontrakt B žádá tvar „název — značíme X, jednotka Y (název)“.
   MÁ BÝT: „rychlost šíření zvuku — značíme v, jednotka m/s (metr za sekundu)“ (značka v
   je doložena PDF 33 str. 6).

POSOUZENÍ DÉLKY ZÁPISU (21 bodů): na horní hranici únosnosti, ale obhajitelné — podtéma je
nejširší v celku (vznik, frekvence, zdroje, rychlost, odraz, ohyb, pohlcování) a body jsou
telegrafické (3–6 slov). Doporučení, ne nález: sloučit „vzduch 340 m/s, voda 1 500 m/s“ a
„ocel 5 000 m/s, vakuum 0 m/s“ do jednoho bodu → 20 bodů.

OVĚŘENO BEZ NÁLEZU:
- Ozvěna přepočítána: 340 m/s · 0,1 s : 2 = 17 m — souhlasí s textem i s PDF str. 6.
- Všechna čísla proti PDF 34: 16 Hz–16 000 Hz a 2 000–4 000 Hz (str. 3), 440 Hz (str. 3),
  infrazvuk < 16 Hz / ultrazvuk > 16 kHz (str. 3), 340 / 1 500 / 5 000 / 0 m/s (str. 5–6),
  0,1 s a 17 m (str. 6). Žádná odchylka.
- Osm způsobů rozkmitání odpovídá PDF str. 4 i prezentaci snímek 3; barva zvuku je doložena
  prezentací Sound_Physics.md snímek 6 („závisí na velikosti, tvaru a materiálu tělesa“).
- „Měkké materiály… polystyren“ má oporu v prezentaci snímek 12 („měkkými materiály… polystyren,
  molitan, vata nebo textil“) — není to nález.
- Z dosavadního bloku v datech nic nevypadlo (píšťala, hrom, výstřel, kostel, prázdná místnost,
  defektoskopie, basa a buben, molitan/pěna/textil, akustika).
- Věcná výhrada k PODKLADU (ne k výkladu): PDF str. 9 řadí lékařský stetoskop mezi „přístroje
  využívající odrazu zvuku“, ačkoli stetoskop zvuk vede, neodráží. Výklad se podkladu drží
  správně; k rozhodnutí učitele, zda formulaci změkčit („přenos zvuku“).
- JSON v ZAPIS validní (JSON.parse), klíče jednotky + body, 21 bodů; h2 = 1, h3 = 6 (limit 7);
  žádný `<em>`, čísla od tisíce s mezerou, žádný metakomentář v OBSAH ani ZAPIS.

# Závěrečná (3.) nezávislá kontrola — vyklad-elektricky-proud-v-kovech-odpor-f8.md

VERDIKT: NEPROŠLO
NEVYŘEŠENÉ: žádné (všech 5 nálezů kola b vyřešeno, doklady níž)
NOVÉ:
1. Oprava nálezu 1 zanesla větu o 22 slovech — OBSAH ř. 12: „Podobně konstantan (slitina mědi a niklu) se používá na rezistory — součástky s přesně daným odporem, ale i na topné spirály tepelných spotřebičů." Požadavek C zní věty do ~20 slov a kolo b výslovně potvrzovalo „žádná věta nad 20 slov". Oprava: rozdělit, např. „Podobně konstantan (slitina mědi a niklu) se používá na rezistory — součástky s přesně daným odporem. Vyrábějí se z něj i topné spirály tepelných spotřebičů."
2. DROBNÉ — ZDROJE ř. 68 a 70 jsou editační poznámky o průběhu opravy bez jakéhokoli zdroje: „Gramatická oprava: „Velký odpor mají třeba nichrom" → „Velký odpor má třeba nichrom" (shoda podmětu…)" a „Přesnější spojka: „Stejný jev využívá i pojistka" → „Zahřívání vodiče využívá i pojistka"…". To je metakomentář (táž kategorie, která byla u sousedních podtémat důvodem NEPROŠLO) — obě odrážky smazat. Ř. 69 („Přesnost podle PDF…") nese aspoň doslovnou citaci PDF str. 2, stačí ji přepsat na holé doložení bez šipky „původní → nové".

## Doklady k nálezům kola b
- Nález 1 (metakomentář + nezapracovaný údaj PDF): vyřešen. Grep „k rozhodnutí|NAVRŽENO" = 0. OBSAH ř. 12 nově uvádí konstantan i u topných spirál; ZDROJE ř. 54 nese doslovnou citaci PDF 25 str. 4 („…odporový drát na výrobu součástek s konkrétní hodnotou elektrického odporu (rezistor) nebo topné spirály tepelných spotřebičů") a vysvětlení, že nichrom v PDF není a zůstává z dosavadního bloku. (Vedlejší důsledek = NOVÉ 1.)
- Nález 2 (gramatika): vyřešen, ř. 12 „Velký odpor má třeba nichrom…" (git diff potvrzuje změnu „mají" → „má").
- Nález 3 (tvrzení silnější než zdroj): vyřešen, ř. 7 „Při srážkách elektron většinou změní směr a zpomalí." PDF 25 str. 2: „Elektrony při srážkách s atomy vodiče často změní směr svého pohybu" ✓.
- Nález 4 (zavádějící spojka u pojistky): vyřešen, ř. 18 začíná „Zahřívání vodiče využívá i pojistka — …".
- Nález 5 (nezařazená látka bez MIMO SCOPE): vyřešen, ZDROJE ř. 65–67 doplnily MIMO SCOPE pro regulaci proudu rezistorem + navinutí na keramickém válečku (str. 6–7), uvolňování elektronů z vnějších vrstev a záporný náboj (str. 1) a závislost rychlosti tepelného pohybu na teplotě (str. 1).

## Kontrola nezanesených chyb
- ZAPIS: `json.loads` OK, klíče jednotky, body; `vzorec` i `zakon` právem chybí (podtéma bez výpočtu).
- Odstavce `<p>`: žádný nad 4 věty. Věty: jediná přes 20 slov = NOVÉ 1 (strojová kontrola OBSAH).
- Text jinak beze změn proti kolu b (git diff: 3 věty v OBSAH + 5 odrážek ZDROJE, nic jiného).
- Čísla proti PDF 25: 1 mΩ = 0,001 Ω, 1 kΩ = 1 000 Ω, 1 MΩ = 1 000 000 Ω (str. 8) ✓; wolfram 2 200–3 000 °C a horké vlákno po vypnutí (str. 9) ✓; stotisíckrát větší atomy (str. 2) ✓; studené vlákno má menší odpor a přepálí se při zapnutí (str. 6) ✓.
- Cizí tag `</content>` tento soubor nemá (na rozdíl od dvou souběžně psaných výkladů).

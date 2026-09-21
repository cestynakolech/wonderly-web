# Nezávislá kontrola (opakovaná): vyklad-elektricky-proud-v-kovech-odpor-f8.md (21. 9. 2026, kolo b)

Podklad: "/Users/Shared/Škola/8/5 Elektřina /25 Elektrický proud v kovech,  odpor vodiče, tepelné účinky proudu/25.  …pdf" (9 stran, pdftotext).
Dosavadní blok: `node podtema.mjs . get fyzika/8-rocnik/elektrina/elektricky-proud-v-kovech-odpor`.

POZNÁMKA KE ZADÁNÍ: README.md ř. 30 uvádí u tohoto klíče jen „OPRAVENO, čeká na opakovanou kontrolu" — **seznam předchozích nálezů
v README ani jinde ve složce není**, takže zapracování nešlo ověřit bod po bodu. Soubor byl proto posouzen celý znovu proti PDF,
dosavadnímu bloku a kontraktu. (Kopie ve scratchpadu staré session je s tímto souborem bajt po bajtu shodná — `diff` = bez rozdílu.)

VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY:

1. **Metakomentář v souboru + nezapracovaný údaj PDF.** ZDROJE, odrážka „Velký odpor: nichrom → topné spirály, konstantan → rezistory":
   „…Dosavadní text ponechán beze změny — rozpor mezi zdrojem a webem, **k rozhodnutí učitele**."
   Poznámka „k rozhodnutí učitele" do souboru nepatří. Věcně: PDF str. 4 doslovně říká „z kovů má velký odpor např. konstantan
   (slitina mědi a niklu), z kterého se vyrábí odporový drát na výrobu součástek s konkrétní hodnotou elektrického odporu (rezistor)
   **nebo topné spirály tepelných spotřebičů**" — tedy konstantan slouží podle PDF i na topné spirály a nichrom v PDF vůbec není.
   Podle rozhodnutí (platí PDF) má text v sekci „Elektrický odpor" uvést konstantan u obou použití; nichrom se jako doplněk
   z dosavadního bloku smí ponechat, ale ZDROJE musí nést citaci PDF, ne výzvu k rozhodnutí.

2. **Gramatická chyba.** Sekce „Elektrický odpor": „**Velký odpor mají třeba nichrom** (slitina niklu a chromu) — používá se na topné
   spirály varných konvic, fénů i topinkovačů." Podmět je v jednotném čísle → „Velký odpor má třeba nichrom…".

3. **Tvrzení silnější než zdroj.** Sekce „Proč vodič klade odpor": „**Při každé srážce** elektron změní směr a zpomalí."
   PDF str. 2 doslovně: „Elektrony při srážkách s atomy vodiče **často** změní směr svého pohybu." Má být „Při srážkách elektron
   většinou změní směr a zpomalí." (věcně: ne každá srážka mění směr).

4. **Zavádějící spojka mezi odstavci.** Sekce „Tepelné účinky proudu": „**Stejný jev využívá i pojistka** — tenký drátek se při
   přetížení roztaví…" Předchozí odstavec popisuje **růst odporu vlákna s teplotou** (studené vlákno → největší proud po zapnutí),
   kdežto pojistka využívá **zahřívání vodiče proudem** (PDF str. 9: „tavná pojistka — tenký drátek se přetaví při určité velikosti
   elektrického proudu"). Odkaz „stejný jev" je tedy nepřesný; má znít např. „Zahřívání vodiče využívá i pojistka".

5. **DROBNÉ — látka z PDF vynechaná a neoznačená jako MIMO SCOPE.** ZDROJE označuje MIMO SCOPE jen barevné proužky, schematickou značku
   a rezistivitu. Neoznačeno zůstalo: „rezistor **se používá k regulaci velikosti proudu** procházejícího obvodem" a „tvoří ho dlouhý
   tenký odporový drát z konstantanu, izolovaný a navinutý na keramickém válečku" (PDF str. 6–7), dále „elektrony z vnějších vrstev
   atomových obalů se jednoduše uvolňují" a „volné elektrony nesou záporný náboj" (str. 1) a „rychlost tepelného pohybu závisí na
   teplotě tělesa" (str. 1).

OVĚŘENO BEZ NÁLEZU:
- ZAPIS je validní JSON (`json.loads` prošlo); klíč `vzorec` i `zakon` právem vynechán (v PDF k tomuto podtématu žádný není),
  jednotky mají předepsaný tvar „elektrický odpor — značíme R, jednotka Ω (ohm)" a obsahují mΩ/kΩ/MΩ podle PDF str. 8.
- Z dosavadního bloku nevypadlo nic: krystalická mřížka a volné elektrony, tepelný pohyb, usměrnění polem od − k +, srážky a zahřívání,
  R/ohm a převody 1 kΩ/1 MΩ, dobré vodiče (stříbro, měď, zlato, hliník) a vedení z mědi, nichrom i konstantan včetně použití,
  izolanty a „žádný kov není izolant", wolframové vlákno 2 200–3 000 °C, vařič, konvice, žehlička, pojistka, přetížení/zkrat → požár.
  Všechny čtyři věty dosavadního zápisu jsou pokryté telegrafickými body.
- Shoda s PDF ověřena u: stotisíckrát větší atomy (str. 2), předání energie a kmitání atomů (str. 3), dobré vodiče a pozlacování/
  postříbřování kontaktů (str. 4), izolanty keramika/plast (str. 4), 1 mΩ = 0,001 Ω / 1 kΩ = 1 000 Ω / 1 MΩ = 1 000 000 Ω (str. 8),
  studené vlákno má menší odpor a přepálí se při sepnutí (str. 6), 2 200–3 000 °C a „po vypnutí zůstává horká" (str. 9),
  elektrické topení a trouba (str. 9), roztavení drátů a požár (str. 9).
- Jazyk: žádný `<em>`, 3 nadpisy h3, žádná věta nad 20 slov, žádný odstavec nad 4 věty, čísla od tisíce s mezerou (2 200, 3 000, 1 000 Ω).
- Sekce „Pro zvídavé: počítáme" zde po právu chybí — podtéma nemá žádný výpočet ani vzorec.

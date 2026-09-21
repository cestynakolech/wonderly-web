VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné
- NOVÉ 1 (metakomentář v ZDROJE o stojatém vlnění) vyřešeno: řádek 97 zní nyní věcně
  „Prezentace From_Particle_to_Wave.md, snímek 12: stojaté vlnění (superpozice dvou
  protiběžných vln, uzly). V PDF 33 ani v dosavadním bloku temata.ts není; do OBSAH
  nezařazeno." — slova „NAVRŽENO K DOPLNĚNÍ“, „k rozhodnutí učitele“, „zatím“ v souboru
  nejsou (strojový grep přes celý soubor na NAVRŽENO/k rozhodnutí/zatím/TODO/POZN = 0 shod).
  Obsah citace ověřen proti popisu prezentace
  /Users/radek_soukromy/Desktop/Omega/dokumenty/prezentace-popisy/From_Particle_to_Wave.md:51
  (Snímek 12, image12.png): „stojaté vlnění jako výsledek superpozice dvou protiběžných
  vln … označeny body bez pohybu – ‚Uzly‘“. Tvrzení o nepřítomnosti ověřeno: grep „stojat“
  v pdftotext výstupu PDF 33 = 0 shod, grep „stojat“ v src/data/temata.ts = 0 shod.
- DROBNOST 1 (dovětek „tedy polovina kmitu“ bez doslovné opory) zapracována: ZDROJE ř. 95
  nyní výslovně rozlišuje doslovnou citaci a odvození — „snímek 3 doslovně jen ‚KYV – pohyb
  pouze jedním směrem‘ (PDF 33 slovo ‚kyv‘ neobsahuje, ověřeno grep). Dovětek ‚tedy polovina
  kmitu‘ je odvozen z definice kmitu (kmit = dva kyvy) … ne doslovná citace.“ Ověřeno:
  From_Particle_to_Wave.md:15 obsahuje „KYV – pohyb pouze jedním směrem“; pdftotext PDF 33
  (8 stran) slovo „kyv“ mimo „kyvadlo“ neobsahuje.
- DROBNOST 2 (pojem kyv chybí v ZAPIS) zapracována: ZAPIS.body ř. 64 „kyv: pohyb jedním
  směrem, půl kmitu“; body má nyní 11 položek (dříve 10).

FORMÁLNÍ KONTROLA (strojově):
- ZAPIS je validní JSON (json.loads prošel), klíče: vzorec, jednotky, vzorecSlovy, body.
- V celém souboru žádný metakomentář (hledané vzory NAVRŽENO / k rozhodnutí / zatím / TODO /
  POZN / doplnit / „(pozn“ — 0 shod).
- Opora perioda/frekvence proti PDF 33 str. 3 potvrzena: „Perioda – Doba jednoho kmitu“,
  „Frekvence – Počet kmitů za 1 sekundu“, „Počet period za 1 sekundu“ (pdftotext -layout).

NOVÉ: žádné

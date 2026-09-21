VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY:
1. DROBNÉ (věcná formulace) — sekce „Ucho jako přeměňovač energie“, věty „Zvuk vstupuje jako
   vzduchová (akustická) energie, bubínek a kůstky ji promění na mechanickou energii. V hlemýždi
   se mění na kapalnou (hydraulickou) energii…“. „Vzduchová energie“ a „kapalná energie“ nejsou
   fyzikální pojmy a prezentace je neuvádí — Sonic_Blueprint.md snímek 6 mluví o „Akustická
   energie (Vzduch)“, „Mechanická energie (Pevná látka)“, „Hydraulická energie (Kapalina)“,
   „Elektrická energie (Nervová soustava)“. Navíc věta žákovi protiřečí sousednímu podtématu:
   zvuk JE mechanické vlnění, takže „akustická → mechanická“ zní jako přeměna na totéž.
   MÁ BÝT: popsat jako změnu PROSTŘEDÍ, kterým se kmity nesou (vzduch → kůstky → kapalina →
   nervový signál), případně držet názvy z prezentace a mechanickou energii nestavět proti
   akustické. Totéž platí pro bod zápisu „energie: vzduchová → mechanická → kapalná → elektrická“.
2. DROBNÉ (tvar zápisu) — sekce ZAPIS: chybí klíč `jednotky`, i když podtéma zavádí veličinu
   hladina intenzity zvuku a jednotku decibel (PDF s. 5/7: „Hladina intenzity zvuku… Jednotka:
   decibel (dB)“). Jednotka je jen v `body`. MÁ BÝT (doporučení podle kontraktu B):
   „hladina intenzity zvuku — jednotka dB (decibel)“ v klíči `jednotky`.

POSOUZENÍ DÉLKY ZÁPISU (18 bodů): únosné. Body jsou krátké (3–6 slov) a kopírují tok výkladu;
osm z nich je cesta zvuku uchem, což odpovídá osmibodovému postupu v PDF s. 2/7–4/7.
Doporučení, ne nález: dva body o ochraně („ochrana: sluchátka…“ a „ochrana: tlumiče…“) lze
sloučit do jednoho, pak 17 bodů.

OVĚŘENO BEZ NÁLEZU:
- Všechna čísla proti PDF 35 (pdftotext): bubínek 0,0001 mm až 1 mm (s. 2/7), práh
  slyšitelnosti 0 dB a práh bolesti 130 dB s protržením bubínku (s. 5/7), trvalé poškození
  nad 90 dB (s. 6/7). Žádná odchylka, žádný výpočet k přepočtu v tomto podtématu není.
- Anatomie a pořadí kroků (boltec → zvukovod → bubínek → kůstky kladívko/kovadlinka/třmínek →
  pružné okénko → hlemýžď → vláskové buňky → sluchový nerv) souhlasí s PDF s. 2/7–4/7
  i s prezentací Sonic_Blueprint snímky 3–5; neobnovitelnost vláskových buněk doložena obojím.
- Rizika (prasknutí bubínku, horší psychický stav a poruchy pozornosti, bolesti hlavy,
  nevolnost) doslova odpovídají PDF s. 6/7; ochrana (hygienické normy, sluchátka, špunty,
  tlumiče výfuku, odhlučnění, protihlukové stěny, vzdálenost — přehlídka tryskových letadel,
  hlasitost hudby, vypnutý motor, zákaz sekaček o nedělích) rovněž PDF s. 6/7.
- Z dosavadního bloku v datech nic nevypadlo (subjektivnost vnímání, měření tlaku zvukové vlny,
  0 dB jako počátek stupnice, 90 dB, všechny způsoby ochrany); `<h2>` odpovídá poli `nazev`.
- Pokrytí prezentace je úplné: snímky 2–5 (cesta zvuku), 6 (přeměny energie), 7–8 (subjektivní
  vnímání, 0/90/130 dB), 9–10 (rizika), 11 (čtyři strategie ochrany).
- JSON v ZAPIS validní (JSON.parse), klíč body, 18 položek; h2 = 1, h3 = 5 (limit 7);
  žádný `<em>`, žádná věta nad 20 slov, odstavce nejvýše 4 věty, žádný metakomentář v OBSAH.

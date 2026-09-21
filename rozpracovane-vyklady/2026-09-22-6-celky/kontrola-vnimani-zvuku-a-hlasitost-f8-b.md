VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné
- Nález 1 vyřešen: sekce „Ucho jako přeměňovač energie" je přepsaná na změnu PROSTŘEDÍ —
  „Nejprve kmitá vzduch (akustická energie), pak kůstky spojené s bubínkem (mechanická
  energie) a v hlemýždi kapalina (hydraulická energie)." Nefyzikální pojmy „vzduchová
  energie" a „kapalná energie" už v textu nejsou; názvy odpovídají Sonic_Blueprint.md
  snímek 6. Opraven i zápis: „prostředí kmitů: vzduch → kůstky → kapalina → nerv".
- Nález 2 vyřešen: ZAPIS má klíč `jednotky` s položkou „hladina intenzity zvuku — jednotka
  dB (decibel)". Opora PDF 35 s. 5/7 („Jednotka: decibel (dB)"); PDF značku veličiny
  neuvádí, proto je její vynechání správné.

NOVÉ: žádné
- Přepsaný odstavec nezanesl věcnou chybu: pořadí vzduch → bubínek a kůstky → kapalina
  v hlemýždi → vláskové buňky → nervový signál souhlasí s PDF 35 s. 2/7–4/7.
- Přidaný klíč `jednotky` nezměnil žádné číslo; 0,0001–1 mm (s. 2/7), 0 dB a 130 dB
  s protržením bubínku (s. 5/7), 90 dB trvalé poškození (s. 6/7) sedí beze změny.

DROBNOSTI:
- ZDROJE, odrážka o sekci „Ucho jako přeměňovač energie" končí slovy „— oprava po nálezu
  nezávislé kontroly". Je to poznámka o průběhu práce, ne o zdroji; do čistopisu ZDROJE
  nepatří.
- ZDROJE, poslední odrážka: „přeformulováno pro dítě 9–10 let". Podtéma je z 8. ročníku
  (žáci 13–14 let); údaj o věku je chybný. Na samotném textu výkladu se to neprojevuje.

OVĚŘENO STROJOVĚ:
- JSON v ZAPIS validní (json.loads), klíče jednotky + body, 18 bodů.
- Žádná věta nad 20 slov, žádný odstavec nad 4 věty, h2 = 1, h3 = 5, žádný `<em>`,
  jediné „čtyřciferné" nalezené číslo je 0,0001 mm (planý poplach měřidla),
  žádný metakomentář v OBSAH ani ZAPIS.

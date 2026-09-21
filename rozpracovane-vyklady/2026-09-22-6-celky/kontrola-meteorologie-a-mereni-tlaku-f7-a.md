VERDIKT: NEPROŠLO

NÁLEZY:

1. Sekce ZAPIS, bod „měří se 8 veličin (teplota, tlak, vítr, vlhkost, srážky, oblačnost,
   ovzduší, sluneční záření, půda)"
   — CO JE ŠPATNĚ: bod tvrdí osm veličin, ale vyjmenovává devět položek. Vzniklo tím,
   že „oblačnost a množství srážek" je v PDF jedna veličina (str. 3), zatímco zápis ji
   rozdělil na dvě. Dítě si tuhle nesrovnalost opíše do sešitu. (V OBSAH je výčet
   správně osmipoložkový.)
   — CO MÁ BÝT: „měří se 8 veličin: teplota, tlak, vítr, vlhkost, oblačnost a srážky,
   ovzduší, sluneční záření, půda" (PDF str. 3, prezentace Atmospheric_Measurement_
   Science snímek 4 „Osm pilířů atmosférických měření").

2. Úvodní odrážka, „hluboká níže (pod 980 hPa) přináší bouřky a vichřice"
   — CO JE ŠPATNĚ: hodnota odporuje podkladu učitele. PDF „Atmosférický tlak.pdf"
   str. 7 uvádí hranici 1000 hPa: „tlak vzduchu nižší než 1000 hPa oznamuje vydatné
   srážky a vysokou oblačnost, při velmi hlubokém poklesu tlaku vzduchu pod 1000 hPa
   hrozí silné bouřky, vítr nebo vichřice". Podle platného rozhodnutí (liší-li se web
   a PDF, platí PDF) má být v textu údaj z PDF, nebo se rozpor musí nahlásit.
   — ZHORŠUJÍCÍ: ZDROJE (první odrážka) tvrdí opak — „PDF ani popis prezentace tyto
   konkrétní hodnoty neobsahují". To je nepravdivé u hodnoty 1 013 hPa (PDF str. 7)
   i u hranice hluboké níže (PDF str. 7).
   — CO MÁ BÝT: sjednotit s PDF (pod 1 000 hPa), nebo 980 hPa ponechat s výslovným
   zápisem rozporu do ZDROJE. Týká se i ZAPIS.

3. Sekce ZDROJE, odrážka „Odstavce o klesajícím/stoupajícím tlaku … pravidlu ‚1 hPa na
   8 m' … PDF ani prezentace tato čísla neobsahují"
   — CO JE ŠPATNĚ: nepravdivé tvrzení. PDF „Atmosférický tlak.pdf" str. 10 má pravidlo
   doslova: „tlak se snižuje o přibližně 1 hektopascal (hPa) na každých 8 metrů výšky
   v blízkosti hladiny moře, ale tento vztah se mění s teplotou a výškou a platí jen
   do výšky několika tisíc metrů nad mořem".
   — CO MÁ BÝT: citovat PDF str. 10; věcně je text i navazující výpočet v pořádku,
   vadná je jen doložka opory (kontrolor podle ní nemůže věřit ostatním doložkám).

4. Sekce ZAPIS jako celek — 27 bodů
   — CO JE ŠPATNĚ: pro sešit 7. třídy neúnosné. Ostatní dvě podtémata téhož celku mají
   8 a 12 bodů; 27 bodů je zhruba stránka opisování a dítě z nich nepozná, co je hlavní.
   Zároveň kontrakt žádá „telegraficky, 3–6 slov na řádek" — limit překračuje 16 bodů
   z 27, nejdelší má 14 slov.
   — CO MÁ BÝT: sloučit na ~15–18 bodů (např. přístroje do 3 bodů: „barometr/aneroid/
   barograf — tlak", „anemometr — rychlost a směr větru, anemograf zapisuje",
   „srážkoměr — srážky v mm; heliograf — doba slunečního svitu") a zkrátit řádky.

5. Sekce „Meteorologická pozorování", odstavec o stanicích
   — CO JE ŠPATNĚ: z dosavadního bloku vypadlo slovo „balonů" (dosavadní věta:
   „z pozemních stanic, balonů i družic"). Dosavadní obsah se podle kontraktu nevyřazuje
   a v ZDROJE to není nahlášeno; PDF str. 1 mluví o stanicích „ve velkých výškách
   atmosféry", což balony pokrývá, takže není ani důvod je škrtat.
   — CO MÁ BÝT: vrátit balony („měřicí balony ve velkých výškách").

6. Odrážky a věty nad limit ~20 slov (kontrakt, bod C):
   „srážkoměr — množství spadlého deště; nádoba zachytává vodu a nálevkou …" (35 slov),
   „anemometr — rychlost větru; roztáčí ho miskový kříž …" (31 slov),
   „Měří osm veličin: teplotu vzduchu, atmosférický tlak, …" (29 slov),
   „Předpověď počasí pomáhá dopravě, zemědělství i záchranářům …" (28 slov),
   „tlaková níže (odborně cyklóna) — tlak nižší než normál …" (26 slov),
   „👉 Čím hustěji jsou izobary u sebe, …" (22 slov).
   — CO MÁ BÝT: rozdělit na kratší věty, u přístrojů udělat z popisu druhou větu.

OVĚŘENO BEZ NÁLEZU (pro úplnost):
- JSON v ZAPIS je validní (`json.loads` prošel, klíče ['body'], 27 bodů).
- Výpočet „Pro zvídavé" přepočítán: 400 : 8 = 50 hPa; 1 020 − 50 = 970 hPa — souhlasí,
  všechna čísla celá, směr (nahoře nižší tlak) správný; vlastní příklad je řádně
  označen v ZDROJE a stojí na pravidle doloženém v PDF str. 10.
- Vznik větru (sluneční záření a rotace Země, teplý vzduch stoupá → tlaková níže →
  proudí vzduch z okolí, rotace tvoří víry) — PDF „Meteorologická pozorování.pdf"
  str. 1 téměř doslova; potvrzeno prezentací snímek 3.
- ČHMÚ v Praze, stanice na souši / ve velkých výškách / na moři, družice obíhající
  Zemi — PDF str. 1 doslova, prezentace snímek 2.
- Meteorologická budka (bílá, propustné stěny, volné prostranství) — PDF str. 3,
  prezentace snímek 5; anemometr/anemograf a korouhev — PDF str. 5, snímek 6;
  srážkoměr (nálevka, odměrná nádoba, mm vodního sloupce, roztátý sníh) — PDF str. 4–5;
  aneroid (prohýbající se krabička hýbe ručičkou) — PDF str. 6; barograf — PDF str. 6;
  heliograf (skleněná koule, doba svitu) — PDF str. 6, snímek 7.
- Izobary, značky V/N, hustota izobar → síla větru, termíny 7/14/21 h, využití
  předpovědi — přeneseno z dosavadního bloku beze změny významu.
- Struktura: 1× h2, 6× h3 (limit 7), žádný <em>, žádný metakomentář v OBSAH,
  odstavce do 4 vět, čísla od tisíce s mezerou.

VERDIKT: PROŠLO S DROBNOSTMI

NÁLEZY:

1. Sekce „Vlastnosti", odrážka „hustota vzduchu u povrchu je přibližně 1,29 kg/m³"
   — CO JE ŠPATNĚ: rozpor s podkladem učitele. PDF „Atmosférický tlak.pdf" str. 2 uvádí
   doslova „hustota vzduchu je největší u povrchu Země: 1,23 kg/m3". Podle platného
   rozhodnutí (kde se web a PDF liší, platí PDF) má v textu stát hodnota z PDF.
   — POLEHČUJÍCÍ: hodnota 1,29 kg/m³ je doložena dosavadním blokem `atmosfericky-tlak`
   i popisem prezentace („Hustota vzduchu u Země je 1,29 kg/m³", snímek 101) a fyzikálně
   odpovídá vzduchu při 0 °C (1,293 kg/m³); 1,23 kg/m³ odpovídá cca 15–20 °C. Worker
   rozpor poctivě zapsal do ZDROJE.
   — CO MÁ BÝT: rozhodnutí učitele; do té doby buď 1,23 kg/m³ (PDF str. 2), nebo
   ponechat 1,29 kg/m³ s výslovnou poznámkou o teplotě. Tiché ponechání webové hodnoty
   proti PDF je proti pravidlu.

2. Sekce „Vlastnosti", věta „u hladiny moře je tlak asi 101 000 Pa. Ve výšce 5 000 m
   klesne na 56 000 Pa. Ve výšce 10 000 m … 29 000 Pa"
   — CO JE ŠPATNĚ: opora je slabá. V PDF tato řada vůbec není. V popisu prezentace
   (Mechanické vlastnosti kapalin 7.md, snímek 100) jsou popisky výšek a hodnot
   promíchané — u „5 000 m n. m." tam stojí 101 000 Pa, u „0 m nad mořem" 56 000 Pa.
   Přiřazení 0/5 000/10 000 m → 101 000/56 000/29 000 Pa je vlastní interpretace workera
   (byť fyzikálně jediná smysluplná). Tabulkové hodnoty standardní atmosféry jsou navíc
   54 000 Pa (5 km) a 26 500 Pa (10 km), tj. 29 000 Pa se liší o ~10 %.
   — CO MÁ BÝT: nechat učitele potvrdit řadu ze snímku 100, nebo čísla vypustit;
   interpretace rozházeného přepisu nesmí být vydána za doložený údaj.

3. Sekce ZAPIS
   — CO JE ŠPATNĚ: zápis nemá klíč `jednotky` a v `body` chybí značka a jednotka tlaku,
   přestože je OBSAH výslovně učí („značka pa, jednotka pascal (Pa); v meteorologii hPa
   (1 hPa = 100 Pa)") a PDF str. 4 je uvádí jako samostatné odrážky.
   — CO MÁ BÝT: podle kontraktu (bod B) doplnit `jednotky`, např. „atmosférický tlak —
   značíme pa, jednotka Pa (pascal); v meteorologii hPa, 1 hPa = 100 Pa", případně bod
   „značka pa, jednotka Pa; 1 hPa = 100 Pa" do `body`. Dítě jinak nemá v sešitě jednotku.

4. Sekce ZDROJE, poslední dvě odrážky („KONTROLA (spuštěno): python3 -c …",
   „grep -n … → nalezeno na řádku 1810 … 1819 … 1821")
   — CO JE ŠPATNĚ: procesní metakomentář místo věcné citace; kontrakt navíc výslovně
   zakazuje citovat dosavadní blok číslem řádku („řádky se posouvají"), má se citovat
   slugem + doslovnou větou. Totéž platí pro dlouhou závorku o chybě automatu u snímku 100.
   — CO MÁ BÝT: ZDROJE zkrátit na věcné citace (zdroj + strana/snímek + doslovný úryvek);
   výpis příkazů a čísla řádků vynechat.

5. Sekce „Pro zvídavé: počítáme", věty „Rtuť má hustotu ρ = 13 500 kg/m³, sloupec byl
   vysoký h = 0,76 m a gravitační konstanta g = 10 N/kg." (22 slov) a „To je skoro stejná
   hodnota jako normální atmosférický tlak 101 325 Pa — pokus tak potvrdil…" (21 slov)
   — CO JE ŠPATNĚ: překročen limit „věty do ~20 slov" (kontrakt, bod C).
   — CO MÁ BÝT: rozdělit na dvě kratší věty.

OVĚŘENO BEZ NÁLEZU (pro úplnost):
- JSON v ZAPIS je validní (`json.loads` prošel, klíče ['body'], 12 bodů).
- Výpočet p_h = 0,76 · 13 500 · 10 = 102 600 Pa přepočítán — souhlasí; hodnoty ρ = 13 500
  a g = 10 doloženy popisem prezentace, snímek 101 (obr. image75/image76).
- Vodní sloupec „skoro 10 metrů" ověřen: 101 325 : (1 000 · 10) = 10,1 m; doloženo
  prezentací („sloupec vody … o výšce přibližně 10 m").
- Rok 1643 ponechán správně (PDF má chybou extrakce „1964", Torricelli 1608–1647).
- Normální tlak 101 325 Pa ≈ 1 013 hPa, 760 mmHg — PDF str. 7 doslova.
- Složení vzduchu 78/21/1 % — PDF str. 2 doslova; vliv teploty, vodní páry, nadmořské
  výšky a zeměpisné šířky — PDF str. 4 doslova; přísavky — PDF str. 11.
- Struktura: 1× h2, 5× h3 (limit 7), žádný <em>, žádný metakomentář v OBSAH, čísla
  od tisíce s mezerou, odstavce do 4 vět.
- Veškerý dosavadní text i všech 5 bodů dosavadního zápisu je v návrhu obsaženo.

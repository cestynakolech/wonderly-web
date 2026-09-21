VERDIKT: PROŠLO

NEVYŘEŠENÉ: žádné
- nález 1 (hustota): OBSAH i ZAPIS mají 1,23 kg/m³; ověřeno v PDF „Atmosférický tlak.pdf" str. 2 doslova („hustota vzduchu je největší u povrchu Země: 1,23 kg/m3"), rozpor s prezentací (1,29) je poctivě zapsán v ZDROJE.
- nález 2 (řada 101 000 / 56 000 / 29 000 Pa): z OBSAH odstraněna, v ZDROJE odůvodněno.
- nález 3 (jednotky): ZAPIS má klíč `jednotky` se značkou i vztahem 1 hPa = 100 Pa; PDF str. 4 to uvádí.
- nález 4 (metakomentář v ZDROJE): procesní věty ani citace číslem řádku už v souboru nejsou (grep na „grep -n", „python3", „řádk" nic nenašel mimo popis opravy).
- nález 5 (věty nad 20 slov): obě věty v „Pro zvídavé" rozděleny, měřením už žádná věta OBSAH limit nepřekračuje.

NOVÉ: žádné
Ověřeno navíc:
- ZAPIS je validní JSON (json.loads), klíče ['jednotky','body'], 12 bodů.
- Odstavce OBSAH: maximum 4 věty (strojově změřeno).
- Výpočet přepočítán: 0,76 · 13 500 = 10 260; × 10 = 102 600 Pa. Hodnoty i výsledek jsou doslova v popisu prezentace „Mechanické vlastnosti kapalin 7.md" ř. 895 a 898 (p_h = h·ρ·g = (0,76 · 13 500 · 10) Pa = 102 600 Pa).
- Vodní sloupec „skoro 10 metrů" — tamtéž ř. 893/895 („sloupec vody v hadici o výšce přibližně 10 m").
- Torricelli 1643 ponechán správně; PDF má chybnou extrakci „V roce 1964", portrét v prezentaci uvádí 1608–1647, takže 1964 je vyloučeno. ZDROJE to vysvětluje.
- 101 325 Pa ≈ 1 013 hPa a 760 mmHg — PDF str. 7 („zaokrouhleně 1 013 hPa").
- Složení 78/21/1 % — PDF str. 2.

DROBNOSTI:
1. ZAPIS.jednotky má značku „pₐ" (znak dolního indexu), OBSAH má „pa" — nejednotný zápis téže značky; znak s dolním indexem se navíc v části písem nezobrazí.
2. Věta „Dohodnutá hodnota 101 325 Pa ≈ 1 013 hPa — … (mmHg)." vyjde na 21 tokenů jen kvůli mezerám uvnitř čísel; reálných slov je ~15, takže limit 20 slov fakticky porušen není. Bez zásahu.

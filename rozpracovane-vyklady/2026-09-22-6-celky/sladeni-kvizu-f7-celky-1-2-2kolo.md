# 2. kolo nezávislé kontroly kvízů — F7, celky „Pohyb a rychlost" a „Síly kolem nás"
Kontrola 22. 9. 2026 (čerstvý kontext, jen čtení). Všech 9 bloků má ověřeně 21 otázek
(`node testy/vypis-kviz.mjs`). Všech 34 výpočtů v kvízech přepočítáno `node -e` — 0 chyb
(72:3,6=20; 60:1,5=40; 231:5,5=42; 585:1,3=450; 500·0,35=175; 12 000:10=1 200; 900−700=200 …).
Čísla z 1. kola sedí: třecí síla **175 N** (ot. 9), cyklista **231 km → 42 km/h** (ot. 12),
letadlo **585 km → 450 km/h** (ot. 14). Nálezy níže jsou nové nebo zbylé.

## fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (ot. 5, 6, 20 přepsány přesně dle návrhů)
NOVÉ:
1. otázka 2 „Kdy je těleso v klidu?" | vysvětlení končí „…proto je klid **relativní**" a tím
   prozrazuje klíčové slovo odpovědi otázky 5 („relativní — záleží na porovnání");
   `testy/uniky.mjs` to nevidí, protože nejde o doslovnou shodu celé odpovědi.
   NÁVRH vysvětlení ot. 2: „Klid posuzujeme vždy vzhledem ke zvolenému tělesu."

## fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (ot. 15 = „z posuvného a otáčivého pohybu", „nebo více otáčivých" pryč,
3× délka i pár 9/10 vyřešeny)
NOVÉ:
1. otázka 14 „Co je složený pohyb?" | vysvětlení „Složený pohyb = kombinace posuvného
   a otáčivého pohybu." obsahuje CELOU odpověď otázky 15 („z posuvného a otáčivého pohybu").
   NÁVRH vysvětlení ot. 14: „Dva jednoduché pohyby se spojí do jednoho složitějšího."

## fyzika/7-rocnik/pohyb-a-rychlost/rychlost-draha-cas — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (všech 8 nálezů zapracováno, km/s i m/min a anemometr/tachograf pryč)
NOVÉ:
1. otázka 2 „Jaká je značka rychlosti?" | vysvětlení „Rychlost je v (velocitas), dráha s, čas t."
   obsahuje DOSLOVNĚ odpověď nově vložené otázky 13 („dráha s, čas t").
   NÁVRH vysvětlení ot. 2: „Rychlost značíme v — z latinského velocitas."
2. otázky 9 a 21 | „Kolik m/s je 72 km/h? → 20 m/s" a „Cyklista jede 20 m/s. Kolik je to km/h?
   → 72 km/h" jsou tentýž převod v obou směrech — zadání jedné je odpovědí druhé.
   NÁVRH otázka 21: „Kolik m/s je 36 km/h?" / „10 m/s" / „36 m/s" / „3,6 m/s".
   Vysvětlení: „36 : 3,6 = 10 m/s." (dvojice 36 km/h ↔ 10 m/s je přímo ve výkladu)
3. otázka 8 „Proč se při převodu m/s ↔ km/h neposouvá jen čárka?" | distraktor „kilometr nemá
   100 metrů" je PRAVDIVÉ tvrzení (kilometr má 1 000 m) — žák má dvě obhajitelné odpovědi.
   NÁVRH distraktoru: „kilometr má jen 100 metrů".

## fyzika/7-rocnik/pohyb-a-rychlost/priklady-na-vypocet-rychlosti — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (231 km, 585 km, závorky (0,6 h)/(1,3 h) pryč, ot. 20 = dílky os, délky OK)
NOVÉ:
1. otázka 14 „Letadlo uletělo 585 km za 1 h 18 min" | vysvětlení „1 h 18 min = 78 min;
   585 : 78 · 60 = 450 km/h" počítá JINÝM postupem než výklad (ten převádí na 1,3 h) a číslo
   78 min ve výkladu není; zápis „585 : 78 · 60" je pro 7. ročník navíc matoucí.
   NÁVRH vysvětlení: „Minuty převedeme a přičteme k celé hodině; pak v = s : t = 450 km/h."
   (nezmiňuje 1,3 h, takže neprozradí odpověď otázky 13)

## fyzika/7-rocnik/sily-kolem-nas/sila — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (deformace, statický/dynamický účinek i „působení na dálku" pryč,
měřítko 800 N / 200 N sedí na výkladu, 4× délka OK)
NOVÉ:
1. otázky 10 a 18 | v zadání otázky 10 stojí „v měřítku 1 cm = 200 N", což je DOSLOVNÁ
   odpověď otázky 18 („Sílu 1 kN kreslíme šipkou 5 cm. Kolika N odpovídá 1 cm? → 200 N").
   NÁVRH: otázku 18 vyměnit za dosud nepokrytý bod výkladu (tahová síla, obrázek jeřábu):
   „Jaká síla působí v napnutém laně jeřábu?" / „tahová" / „vztlaková" / „magnetická".
   Vysvětlení: „Napnuté lano táhne břemeno vzhůru tahovou silou."

## fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: žádné (odstředivá síla, stav beztíže i těžiště pryč; 12 kN, 7 kN, 40 kg i Měsíc
sedí na výkladu; délky ot. 6, 17, 20 OK)
NOVÉ:
1. otázka 14 „Těleso je přitahováno silou 12 kN. Jaká je jeho hmotnost? → 1 200 kg" | je
   ZRCADLEM otázky 12 („Auto má hmotnost 1 200 kg. Gravitační síla? → 12 000 N = 12 kN")
   a zároveň duplicitou otázky 21 (7 kN → 700 kg) — tři otázky na m = Fg : g, z toho dvě se
   stejnou dvojicí čísel. (Chyba vznikla opravou 8 kN → 12 kN z 1. kola.)
   NÁVRH: otázku 14 nahradit bodem ZAPIS, který dnes otázku nemá („u povrchu nejsilnější,
   s výškou slábne"): „Kde je gravitační pole Země nejsilnější?" / „u povrchu Země" (16) /
   „vysoko nad Zemí" (15) / „až za Měsícem" (13). Vysvětlení: „Čím výš, tím gravitace slábne."
2. otázka 1 „Mezi kterými tělesy působí gravitační síla?" | délková nápověda, náskok 11 znaků
   (29/18/16). NÁVRH: „mezi všemi tělesy s hmotností" (29) / „jen mezi planetami a hvězdami" (28) /
   „jen mezi magnety a železem" (26).
3. otázka 5 „Jak závisí gravitační síla na vzdálenosti těles?" | náskok 11 znaků (29/18/8).
   NÁVRH: „čím dál od sebe, tím je menší" (29) / „čím dál od sebe, tím je větší" (29) /
   „na vzdálenosti vůbec nezáleží" (29).

## fyzika/7-rocnik/sily-kolem-nas/treci-sila — VERDIKT: SLADĚNO
NEVYŘEŠENÉ: žádné (f = 0,35 → 175 N sedí na výkladu slovo od slova; příčina tření = nerovnosti;
f ≈ 0,027 pryč; ot. 1 = bod ZAPIS o překonání tření; délky ot. 14, 15, 16, 19 OK)
NOVÉ: žádné (žádná odpověď není nejdelší o ≥10 znaků, žádné vysvětlení neprozrazuje jinou
odpověď, všechna čísla i pojmy mají oporu ve výkladu)

## fyzika/7-rocnik/sily-kolem-nas/skladani-sil — VERDIKT: NESLADĚNO (3)
NEVYŘEŠENÉ: nález 5 jen zčásti — nová otázka 19 (závaží 5 N na provázku) byla vložena, ale
otázka 14 („Závaží visí v klidu na provázku. Síla provázku je vůči tíhové síle… → stejně
velká, ale opačná") se s ní podle pokynu NESLOUČILA. Vznikl duplicitní pár a vysvětlení
otázky 14 („Klid = rovnováha: tah provázku vyrovnává tíhovou sílu.") prozrazuje odpověď
otázky 19. NÁVRH: otázku 14 škrtnout a nahradit nepokrytým jevem z výkladu:
„Proč nemůžeme různoběžné síly prostě sečíst?" / „nemíří stejným směrem" (22) /
„jsou vždy stejně velké" (21) / „nemají působiště" (16). Vysvětlení: „Skládáme je kreslením."
NOVÉ:
1. otázka 7 „Kdy jsou dvě síly v rovnováze?" | správná odpověď „stejně velké, opačného směru,
   na jedné přímce" (45) má náskok 26 znaků (45/19/17) — nejhorší délková nápověda v celé
   devítce; „na jedné přímce" navíc výklad nezavádí.
   NÁVRH: „stejně velké a opačného směru" (29) / „obě hodně velké a stejné" (24) /
   „kolmé na sebe a stejně velké" (28). Vysvětlení beze změny.
2. otázka 2 „Jak se skládají dvě síly stejného směru?" | vzorec je jen ve správné odpovědi,
   náskok 12 znaků (23/11/9). NÁVRH: „sčítají se: F = F₁ + F₂" (23) /
   „odčítají se: F = F₁ − F₂" (24) / „násobí se: F = F₁ · F₂" (23).
   (Táž úprava zarovná i otázku 3, kde je náskok 6 znaků.)

## fyzika/7-rocnik/sily-kolem-nas/teziste — VERDIKT: NESLADĚNO (1)
NEVYŘEŠENÉ: žádné (stálá/vratká/volná poloha doplněna jako ot. 10, 14, 19; podepření, hrneček
i hustota pryč; ot. 4 má ve vysvětlení jen obruč a podkovu)
NOVÉ:
1. otázka 5 „Kde leží těžiště koule nebo krychle?" | správná odpověď „v jeho středu" neodpovídá
   rodu podmětu (koule i krychle jsou rodu ženského) — jazyková chyba v textu pro žáky.
   NÁVRH: „v jejich středu" (16) / „na povrchu tělesa" (17) / „dole u podstavy" (15).
   Vysvětlení beze změny.

---

## Poznámky (NEPOČÍTAJÍ se do verdiktu)

- **Typografie tisíců** kolísá uvnitř týchž bloků: „1 200 kg" × „Fg = 1200 · 10" a „1400 kg"
  (gravitacni-sila, ot. 12 a 13), „1 000 N" × „1000 N" a „2000 N", „1500 N" (skladani-sil,
  ot. 13, 4, 11), „1440 km/h" (priklady…, ot. 5), „hodina 3600 s" (rychlost…, ot. 8).
  Výklady všude píšou mezeru (1 000, 4 500, 1 950).
- **Meta-odkazy ve vysvětleních** („— přesně tenhle příklad je ve výkladu", „přesně jako F₂
  ve výkladu") jsou převzaté z návrhů 1. kola; žákovi nic nevysvětlují, jde jen o styl.
- **skladani-sil ot. 5, 6 a 20** zkoušejí týž fakt (stejně velké opačné síly se vyruší) třemi
  způsoby — ještě únosné (číselně / slovně / definice), ale při dalším doplňování bloku pozor.
- **gravitacni-sila ot. 7 vs 9**: odpověď „přibližně 10 N na 1 kg" nutně prozradí g = 10 N/kg.
  Vysvětlení je přesně podle návrhu 1. kola, takže to beru jako přijatou odchylku.
- Brány ověřeny read-only: každý blok 21 otázek; vlastní skript na křížové úniky (vysvětlení →
  celá odpověď jiné otázky) našel jen případy popsané výše.

## ZAPRACOVÁNO 22. 9. 2026

Všech 14 nálezů (8 bloků s otázkami) opraveno v `src/data/kvizy.ts`, žádný neodložen.

- **klid-a-pohyb-telesa** (1/1): vysvětlení ot. 2 zkráceno, už neprozrazuje slovo „relativní" z ot. 5.
- **posuvny-otacivy-pohyb** (1/1): vysvětlení ot. 14 přepsáno, už neopisuje odpověď ot. 15.
- **rychlost-draha-cas** (3/3): vysvětlení ot. 2 zkráceno; ot. 21 nahrazena („Kolik m/s je 36 km/h?");
  distraktor ot. 8 změněn na „kilometr má jen 100 metrů".
- **priklady-na-vypocet-rychlosti** (1/1): vysvětlení ot. 14 přepsáno bez „78 min" a bez odkazu na 1,3 h.
- **sila** (1/1): ot. 18 nahrazena otázkou o tahové síle v laně jeřábu (odstraněn duplicitní „200 N").
- **gravitacni-sila** (3/3): ot. 14 nahrazena („Kde je gravitační pole Země nejsilnější?", odstraněna
  trojice na m = Fg : g); odpovědi ot. 1 a ot. 5 prodlouženy (žádný náskok ≥10 zn.); navíc opraveno
  vysvětlení ot. „Kam směřuje gravitační síla" (kolize s novou ot. 14, odhalil `uniky.mjs`).
- **treci-sila**: SLADĚNO, beze změny.
- **skladani-sil** (3/3): ot. 14 nahrazena („Proč nemůžeme různoběžné síly prostě sečíst?"); odpovědi
  ot. 7 a ot. 2/3 prodlouženy na formulace se vzorcem (žádný náskok ≥10 zn.).
- **teziste** (1/1): odpovědi ot. 5 opraveny na správný rod („v jejich středu"/„dole u podstavy").

Ověřeno: `node testy/vypis-kviz.mjs <klíč>` = 21 u všech 9 bloků, `node testy/uniky.mjs` = 0 duplicit
i úniků, `node zkontroluj.mjs` bez nálezu k těmto klíčům, `npm run build` bez chyby.

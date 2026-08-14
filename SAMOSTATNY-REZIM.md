## 🔴🔴 ZAČNI TADY (stav 13. 8. 14:30)

### ▶️ ROZDĚLANÉ: NÁZORNOST FYZIKY, JEDNO PODTÉMA ZA DRUHÝM

Zadání učitele 13. 8. odpoledne, doslova: *„pokračuj dalším podtématem fyziky
a nemusíš se ptát, jak jedno dokončíš, začni další."* Tedy: vzít podtéma bez
názornosti, dotáhnout ho celé (simulace → test → mutační test → obousměrný
důkaz → **prohlédnout vyrenderovanou scénu** → build → push → curl) a hned brát
další. Neodklikává se nic. Výroba podtématu jde přes workery a nezávislého
kontrolora — postup vede skill `/simulace` (sem se neopisuje).

**Hotovo v tomhle kole (4 podtémata):**
1. `magneticke-pole-vodice-a-civky` (F9) — Oerstedův pokus, magnetka u vodiče
2. `tepelny-motor-parni-stroj` (F8) — kam se ztratí teplo (účinnost 15/35/30 %)
3. `skupenske-zmeny-vody-v-prirode` (F8) — koloběh vody, motorem je Slunce
4. `vnitrni-energie-telesa` (F8) — pohyb celku vnitřní energií nehne, tření ano
   (78 kontrol, mutace 17/21, obousměrný důkaz zapsán). K tomu nový trvalý
   nástroj **`testy/nahled-simulace.mjs`** — složí z komponenty obrázek
   k prohlédnutí okem (dosud se to dělalo pokaždé jinak). Používat u KAŽDÉ
   nové simulace: `node testy/nahled-simulace.mjs <komponenta> <ven.svg> id=hodnota…`
   pak `qlmanage -t -s 900 -o <složka> <ven.svg>` a PNG přečíst.

5. `tuhnuti` (F8) — křivka chladnutí s plató: během tuhnutí teplota stojí,
   sůl plató posune dolů, led přibývá SHORA (72 kontrol, mutace 18/20).
   ⚠️ Při té práci se ukázalo, že **`mutace.mjs` běžela bez timeoutu**:
   mutace `-5 * sul` → `-5 / sul` dala −Infinity, test se zacyklil, nástroj
   visel bez konce a v komponentě po sobě nechal ležet MUTACI (obnova ve
   `finally` se nedostane ke slovu, když se čeká věčně). Opraveno; k tomu
   pravidlo: každý test simulace potřebuje kotvu „hranice úseků jsou celá
   čísla uvnitř rozsahu", jinak se místo nálezu jen zasekne.

**Stav názornosti** (`node testy/nazornost.mjs`): fyzika 8 **11 → 7** z 37,
fyzika 9 **10 → 9** z 25. Ze zbylých jsou 2+2 shrnutí, která názornost
nepotřebují. **Na řadě dál** (F8):
`kondenzace`, `vznik-elektrickeho-proudu`, `chemicke-zdroje-napeti`,
`elektricka-prace-a-vykon`, `ucinky-proudu-a-bezpecnost`; (F9):
`magnety-magneticke-pole-opakovani`, `vlastnosti-stridaveho-proudu`,
`elektricka-energie-a-premeny`, `jaderna-energie-a-reakce`,
`obnovitelne-a-neobnovitelne-zdroje`, `vesmir-a-galaxie`.

🔴 **POSTUP, KTERÝ SE VYPLATIL — DODRŽET U DALŠÍCH.** Zelený vlastní test
NESTAČÍ, dvakrát po sobě pustil vadu dál:
- **Mutační test** (`node testy/mutace.mjs <název>`) u Oersteda ukázal
  **3 z 24** — test měřil fyzikální model a vůbec ne SCÉNU. Nejhorší
  neodhalená: obrácená podmínka směru proudu by prohodila ⊙/⊗ i šipky, takže
  by se žák naučil pravidlo pravé ruky NAOPAK. Po doměření scény 11/24.
- **Prohlédnout vyrenderovanou scénu** našlo u všech tří simulací vady, které
  žádné měřidlo nevidí: useknutá kružnice, šipky nakupené v řadě, chybějící
  legenda barev, počitadlo ležící přes oblak, popisek přeškrtnutý vlastní
  čárou a **špatné skloňování „4 dílů"**. Jak na to: vytáhnout `outerHTML` SVG
  ze stránky po vykreslení, doplnit `xmlns`, `qlmanage -t -s 900 -o . x.svg`
  a PNG přečíst — screenshot prohlížeče v téhle session vracel prázdno.
  Každý nález pak DOMĚŘIT, ať se nevrátí. Paměť [[feedback-simulaci-se-musim-podivat]].


### 📥 Fronta dalších kol (z auditů 13. 8. — zapsáno, aby se neztratilo)

1. **Skript `kontrola_navodu`** (bod 20 auditu dokumentace): deterministická
   kontrola návodů — existence odkazovaných cest, zakázané opsané konstanty,
   mrtvé křížové odkazy. Nahradí ruční smyčku „srovnat návody" po /clear;
   ruční zůstane jen nedělnímu auditu. Nové měřidlo ⇒ obousměrný důkaz povinně.
2. **Sloučení sandboxu testů simulací** (audit repa): 23 kopií prologu,
   **19 rozešlých variant**, 767 řádků / 34,8 kB; sdílený modul `testy/sandbox-simulace.mjs`
   (do kořene testy/, NE do simulace/ — spouštěč i mutace skenují složku bez filtru!)
   ušetří ~520 řádků. Postup po rodinách, začít 5 byte-identickými; kotva
   `vsechny-simulace` + mutace před a po každé rodině. K tomu ok()/epilog/klik
   do téhož modulu a `komponentaK()` na jedno místo. Skloňovací funkce
   v komponentách NEslučovat (unikly by mutačnímu testu).
3. **Drobnost**: hlídač session nerozliší samostatný režim od povídání —
   při interaktivní práci a odchodu od Macu přijde po 20 min falešný poplach
   (ztlumení: `--ticho 40` v plistu). Rozhodne učitel, zda ladit.

### ✅ HOTOVO ODPOLEDNE 13. 8.: TŘI LŽOUCÍ MĚŘIDLA + SIMULACE OERSTEDA

**1. Revize automatů poprvé 0 nálezů (z 49 testů).** Tři nálezy se hlásily jako
PŘETRVÁVAJÍCÍ a všechny byly vadou MĚŘIDLA, ne systému:
- `test_exif_heic` bral vzorek z `fotky-puvodni` **včetně kbelíku `_bez_polohy`**.
  Po úklidu mezikopií zbylo v celém deníku 6 JPG a všech 6 leželo právě tam, kde
  datum být NEMÁ. Dvě předchozí opravy jen přesouvaly výchozí složku — `rglob`
  do podsložky lezl dál. Nově se bere i z `fotky-cekarna` (248 fotek, 12/12
  s datem) a složky bez metadat se vylučují JMÉNEM; když není co měřit, hlásí
  přeskočení místo pádu. Kalibrace: při prázdné čekárně stará podoba PADNE
  falešně, opravená přeskočí.
- `test_fronta_stopka` tvrdil, že při STOPCE stojí i nahrávání — učitel ho ale
  11. 8. zapnul zpět. Opraveno na skutečné pravidlo a přibyla OPAČNÁ kotva:
  „nahrávač pozastavený být NESMÍ" (jinak by fronta tiše přestala posílat videa).
- **Nedělní audit si nezapisoval razítko.** Úloha 9. 8. proběhla a nálezy
  opravila, ale nikdo nezavolal `revize_automatu.py --audit-proveden` — přepínač
  byl v kódu od začátku, jen ho žádný postup nevykonával. Zápis razítka je nově
  KROK 5 v `~/.claude/scheduled-tasks/wonderly-audit-nedele/SKILL.md`; razítko
  opraveno na doložených `2026-08-09` (ne na dnešek — laťka se neposouvá).

**2. Fyzika 9 — nová simulace Oerstedova pokusu** (`magneticke-pole-vodice-a-civky`,
dosud bez názornosti). Hotová `ElektromagnetSimulace` sem nesedla: učí sílu cívky,
kdežto tohle podtéma stojí na PŘÍMÉM vodiči. Pohled shora, magnetka severně od
vodiče, proud 0–4 A, vzdálenost 1–5 cm, značka ⊙/⊗, indukční čáry. Výchylka
z `tan = 2·I/r` v celých stupních, nikdy ne 90° (pole Země působí pořád).
Scéna se otevírá s VYPNUTÝM proudem, ať žák objev udělá sám.
⚠️ **Dvě poučení, obě zaplacená:** mutační test hnal test ze **3/24 na 11/24** —
první podoba měřila jen fyzikální model, ne SCÉNU, a právě tam byly nejhorší vady
(obrácená podmínka směru by prohodila ⊙/⊗ i šipky, tedy naučila pravidlo pravé
ruky NAOPAK). A pak **pohled na vyrenderovaný obrázek našel, co měřidlo nevidělo**:
největší kružnice přetékala dolní okraj a šipky se nakupily v jedné řadě vpravo
místo obíhání dokola. Obojí opraveno a doměřeno. Nasazeno, brána zelená,
1057 kontrol simulací.

**3. Vrátný pouští náhled webu bez ptaní** (přání učitele: náhledový server
`python3 -m http.server --directory dist` jen vystaví hotový build na localhost).
Povoleny `mcp__Claude_Browser__*` KROMĚ `form_input` — odeslat formulář je jediné,
co umí poslat něco ven. Cizí prohlížeč (claude-in-chrome) se ptá dál.
Test vrátného: 73 případů obousměrně.

⬜ **ČEKÁ NA UČITELE (ruční, stroj tam nesmí):** vrátit pořadová čísla dvěma
videím na kanálu — `u4NmKbMRhiE` („01 · Německo — Landshut, Schongau, Geisingen",
dnes „06. 07. · …") a `9Sv4exafb-c` („02 · Salbert (Francie)", dnes „10. 07. · …").
Doporučený tvar: `01 · 06. 07. · Německo — …`, tedy číslo PŘIDAT a datum nechat —
`brana_kanalu.py` pak ruční číslo neumí ubrat.

### ✅ HOTOVO RÁNO 13. 8.: KROK E — MAPY VYMĚNĚNY V 8 VIDEÍCH (nahrání čeká na kvótu)

**Nález, kvůli kterému by výměna nic nespravila.** `priprav_mapy.py` hlásil
„12/12, chyb 0", ale hotovost měřil JEDINÝM měřítkem: leží PNG na disku?
Změřeno proti dnešnímu výpočtu:
- mapa pro **Col d'Ornon končila u Saint-Tropez** — o TŘI zastávky dál, než kam
  to video sahá,
- všech **8 map z 10. 8. vzniklo z trasy, ve které tehdy vůbec nebyla zastávka
  Ballon d'Alsace** — tedy právě to, co v mapách chybí a kvůli čemu se mění.
  Výměna by vadu nespravila, jen ji potvrdila — a v hotovém videu už opravit nejde.

**Opraveno:** `priprav_mapy.otisk_vstupu()` (sha1 z domova + zastávek po konec
mapy, 6 des. míst) + `duvod_prestavby()` — jediný domov rozhodnutí, hlásí PROČ.
Otisk se zapisuje do `pripravene/prehled.json`. Časové razítko trasy otiskem
NENÍ (mění se i bez posunu bodu). Záložní cesta `dolozit_otisky()`: staré mapě
se otisk DOLOŽÍ ze zálohy `trasa-stav.pred-*.json`, když z ní vychází stejně —
tak se **4 mapy (Ramonchamp, Ornans, Saint-Sorlin, Saint-Denis) překreslovat
nemusely**, zbylých 8 ano. Test `testy/test_priprav_mapy.py` **24/24**,
kalibrace: stará podoba mine 4 ze 4 podvrhů. `--nanecisto` ukáže stav bez kreslení.

**Mapy překresleny (8) a prohlédnuty OKEM** — km rostou v pořadí cesty:
Saint-Maurice→Ornans 1052 · Frangy 1242 · Vaulnaveys 1376 · Livet 1401 ·
Col d'Ornon 1425 · Saint-Bonnet 1496 · Sainte-Maxime 1720 · Gassin 1734.

**Výměna v mp4 hotová u VŠECH 8 videí** (`vymen_uvodni_mapu.py --prolinani-od 6`),
u každého stopáž na setinu shodná s originálem a zvuk sedí; úvodní snímek
prohlédnut u všech osmi. Originály netknuté. ⚠️ Ke kterému videu který soubor
patří, je doloženo **velikostí souboru proti logu nahrávače**, ne názvem —
u Le Bourg-dOisans je „_v2" ta STARŠÍ verze ([[feedback-verze-na-kanalu-z-logu]]).
Skutečných výměn je **8, ne 12**: Ramonchamp, Ornans, Saint-Sorlin a Saint-Denis
vlastní video nemají (tabulka: „Kryto videem"), `prepocet_map.py` je ale počítá
jako samostatné řádky — proto padají 4 zkoušky v `test_prepocet_map.py`.

🔴 **PAST, KTERÁ MĚLA SPUSTIT V 9:15 (odvrácena).** Výsledky výměny leží podle
nástroje VEDLE originálu jako `…KEKONTROLE.nova-mapa.mp4` — tedy přímo
v `nasazeno/`, odkud si nahrávač skládá frontu podle NÁZVŮ souborů. Změřeno:
`otisk_mista("Frangy_FR_KEKONTROLE.nova-mapa.mp4")` = `frangyfrkekontrolenovamapa`,
tedy nikdy neviděné místo → pojistka proti duplicitám NESEPNE a ráno by na kanál
odešlo druhé video téhož místa s rozsypaným titulkem, za cenu denní kvóty.
Opraveno dvakrát: soubory odsunuty do `nasazeno/_nova-mapa/` (fronta čte
`iterdir()`, do podsložky nevidí) A fronta příponu vynechává s hlášením do logu
(`nahraj_na_youtube`, přípona má jediný domov ve `vymen_uvodni_mapu`).
Test `test_nahravac_bez_duplicit.py` **64/64** (dřív 56). Ověřeno po opravě:
fronta na 9:15 obsahuje přesně 8 očekávaných dílů, žádný `.nova-mapa`.

### ✅ POSLEDNÍ ČLÁNEK NAPSÁN: `vymen_mapy_na_kanale.py`

Chyběl nástroj, který vyměněné verze dostane na kanál — psal jsem ho AŽ TEĎ
schválně: ostrý zásah do kanálu měl počkat, než bude hotová brána, která
škodu neumožní.

Co dělá: vezme soubory z `nasazeno/_nova-mapa/`, k pořadí použije **pořadí
cesty** (ne abecedu), titulek složí ze jména PŮVODNÍHO souboru přes
`hezky_nazev()` — takže výměnou video zároveň dostane datum, pokud ho nemá —
a nahraje přes **jediný domov `vymena_videa.vymen()`**: nahrát novou → schovat
starší na SOUKROMÉ. Nikdy naopak, nikdy mazat.

Pojistky (každá s měřidlem, `testy/test_vymen_mapy_na_kanale.py` **25/25**):
- **kotva PŘED odesláním** — stopáž vyměněného souboru musí sedět s originálem
  a musí mít zvuk; useknutý soubor se na kanál nedostane (kalibrace: bez kotvy
  by prošel),
- **bez záznamu v evidenci se nevyměňuje** — nevíme, kterou starší verzi
  schovat, a nahrát novou bez schování = duplicita na kanálu,
- **prázdná evidence znamená „nic", ne „všechno"**,
- starý záznam se nepřepisuje, odsouvá se do `nahrana_videa_nahrazena`;
  originál mp4 jde do `_stara-mapa/` a **opakovaná výměna dřívější originál
  nepřepíše**,
- nová verze se přejmenuje na PŮVODNÍ jméno v `nasazeno/`, takže ji fronta
  nevezme podruhé,
- **týž zámek jako nahrávač** (dva přenosy naráz rozhodí kvótu), společný denní
  strop, ověřený cíl `KANAL_ID`, výchozí běh NANEČISTO.

**Suchý běh: všech 8 videí projde kotvou**, u každého sedí stopáž na setinu.
**Ostrá zkouška proběhla a nástroj sám odmítl:** „dnes už nahráno 5/5 — denní
limit vyčerpán, zbytek zítra". Nic neodešlo, kvóta se nepřekročila.

⬜ **ZBÝVÁ (čeká na kvótu, ne na učitele):** spustit
`vymen_mapy_na_kanale.py --naostro`. Rozvrh při stropu 5/den: **zítra** 3 zbylé
díly fronty (Luxeuil 5z6, 6z6, Salins 3z3) + **2 výměny**, pozítří 5 výměn,
třetí den poslední. Soubory čekají v `nasazeno/_nova-mapa/` (8 ks, ~2,9 GB;
překódováním CRF 18 vyrostly ~1,7×, obraz se nezhoršil).

### ✅ AUTOMAT ZALOŽEN: `com.omega.vymena-map` (schválil učitel 13. 8.)

Budí se **10:00 a 22:00**, tedy 45 minut po nahrávači (9:15 / 21:15) — nová
videa mají přednost a výměny dobírají jen ZBYTEK denní kvóty. Sdílejí týž zámek
i denní strop, takže se dva přenosy nepotkají ani při zpoždění. `/bin/zsh` kvůli
oprávněním (TCC), 3 pokusy s odstupem 180 s, log
`~/Library/Logs/omega-vymena-map.log`.

**Ověřeno:** `plutil -lint` OK · `launchctl list` automat zná · spuštění PŘESNĚ
tím příkazem z plistu proběhlo a nástroj se sám zastavil („dnes už nahráno 5/5").

⚠️ **Přihlášen i k dennímu hlídání zdraví** (`revize_automatu.py`, práh 72 h) —
jinak by mohl padat při každém probuzení a nikdo by se to nedozvěděl, přesně jako
záloha Omegy ([[feedback-mlceni-neni-klid]]). Práh je 72 h schválně: většina běhů
legitimně neudělá nic, protože kvótu spotřebuje ranní nahrávač, takže ticho tu
není hned známkou poruchy.

**Rozvrh sám od sebe:** zítra 9:15 fronta (3 díly), 10:00 dvě výměny; 14. 8.
10:00 pět výměn; 15. 8. poslední. Bez zásahu člověka.

### ✅ CELKOVÉ SCHVÁLENÍ (učitel 13. 8.) — co se už neodklikává

Doslova: *„omega a wonderly jsou v podstatě jeden projekt"* · *„nemusíš se ptát
na schválení… koukni na to, abych udělal celkové schválení i do budoucna."*
Audit prošel skutečné akce z práce; jediné, co se ptalo zbytečně, bylo zakládání
automatu (plist bydlí v systémové složce LaunchAgents).

**Nově bez ptaní:** zápis plistu `com.omega.*` / `cz.wonderly.*` (zapnutí ano,
VYPNUTÍ ne — stopka je rozhodnutí plánu). Cizí automat (Apple, Google) se ptá dál.

**Na dotaz zůstávají čtyři třídy — všechno pravidla, která si nastavil sám:**
zápis do `Škola/` (nenahraditelné podklady) · `worker.js`/`wrangler` (řídí běh
webu) · `launchctl unload` · instalace do systému (`pip`, `brew`) a `rm`
skutečných dat. Omega i wonderly-web jsou v `PROJEKT` OBĚ, hranice mezi nimi
není. Měřidlo `test_povoleni_hook.py` **63 případů obousměrně** (nově měří i
větev ZÁPISU do souboru, dřív jen příkazy).

### ✅ PRVNÍ ÚKOL SPLNĚN: ranní dávka 9:15 ověřena NA KANÁLU

Nahrávač poslal 5 videí (kvóta vyčerpána) a **titulek s datem má 5 z 5** —
ověřeno čtením ze soupisu kanálu, ne z logu ([[feedback-hlaska-neni-dukaz]]):
`02. 08. · Saint-Amour — 2/2` (`Ylqwh-Azu3g`) a Luxeuil `1/6`–`4/6`
(`ZOjLc76o10g`, `bHv-lf-JsDM`, `Y31pBEQpOf4`, `PtBZ3U0azE4`).
**Ve frontě zbývají 3 díly** (Luxeuil 5z6, 6z6, Salins 3z3).

Poslední řádek logu je zároveň důkaz, že oprava č. 1 níže funguje naostro:
_„v nasazeno/ čeká nové video — stará videa dnes počkají"_ se vztahuje ke třem
SKUTEČNÝM dílům. Bez opravy by ta věta platila navždy i po vyprázdnění fronty
a stará přeanonymizovaná videa by se už nikdy nenahrála.

### ✅ SCHVÁLENO A HOTOVO 13. 8. ~9:45: TITULKY + SCHOVÁNÍ DUPLICITY

Učitel: *„to starší video přepni na soukromé a titulky oprav"*.

**Starší duplicita Le Bourg-dOisans schována.** `wZSKCdxlmeg` → SOUKROMÉ přes
`vymena_videa.schovej()` (nemazat!). Kotva čtením z kanálu: `wZSKCdxlmeg private`,
živé `-FR8z-38PR8 unlisted`.

**Titulky opraveny: 10 videí**, dvě přeskočena. Ověřeno čtením ze soupisu kanálu:
**letošní deníková videa mají datum 33 z 33, bez data 0** (dřív 25/8).
Opraveno: Frangy, Geisingen, Le Bourg-d'Oisans (obě ID), Le Thillot,
Livet-et-Gavet, Rupt-sur-Moselle, Saint-Maurice, Schongau, Vaulnaveys.

⚠️ **Le Bourg-d'Oisans dostal jiné DATUM, ne jen doplněk:** `23. 07.` → `22. 07.`.
Prověřeno předem proti pořadníku (append-only zdroj pravdy) i tabulce — focení
začalo **22. 7. 18:27**, takže `23. 07.` na kanálu bylo chybné. Zároveň se
narovnal apostrof („Le Bourg-dOisans" → „Le Bourg-d'Oisans").

⚠️ **Dvě videa nástroj přeskočil, protože se jejich titulek liší od evidence —
tedy je psal člověk:** `u4NmKbMRhiE` (na kanálu „06. 07. · Německo — Landshut,
Schongau, Geisingen"; stroj by z něj udělal „Nemecko jen hudba") a `ghBZ3WUwQPY`
(„18. 07. · Ballon d'Alsace"; stroj chtěl jen jinou pomlčku). Pojistka zafungovala
správně. Pro pořádek: evidence u nich drží starší podobu s ručním pořadovým
číslem („01 · …", u Salbertu „02 · …"), zatímco na kanálu už je datum — ta
ruční čísla tedy na kanálu **nejsou**. Kdyby je učitel chtěl zpátky, jde to jen
ručně (stroj na ně sahat nesmí).

**Rozvrh nahrávání výměn** (strop 5/den): zítra 3 zbylé díly + 2 výměny,
pozítří 5 výměn, třetí den poslední. Nic z toho nečeká na učitele.

### ✅ NEZÁVISLÁ KONTROLA NAŠLA DALŠÍ ČTYŘI VADY — VŠECHNY OPRAVENY

Kontrolor dostal jen hotový výsledek a spouštěl kód. Našel, co jsem přehlédl:

1. **Filtr byl JEN v nahrávači — složku `nasazeno/` čtou ČTYŘI automaty.**
   Doloženo spuštěním: `mista_prehled` udělal z osmi mezivýsledků osm
   neexistujících míst a tabulka učiteli hlásila falešné nedodělky „založit
   na webu" (51 řádků místo 43). `nahraj_stara_videa.ceka_nove_video()` by
   kvůli nim čekalo **navždy** (nahrávač soubor přeskakuje → do evidence se
   nedostane → „čeká nové video" platí pořád) a stará přeanonymizovaná videa
   by se už nikdy nenahrála. `vyrob_video_automat.uklid_nasazena()`, která
   MAŽE mezikopie, z názvu počítala cizí klíč města — dnes neuklidila nic
   jen náhodou. ✅ Otázka má JEDINÝ DOMOV `vymen_uvodni_mapu.je_mezivysledek_vymeny()`
   a ptají se ho všichni čtyři; test to hlídá u každého zvlášť (68/68).
   Kotva: tabulka má **43 řádků, 0 falešných**; `ceka_nove_video` vrátí
   False nad samotným mezivýsledkem a True, jakmile přibude pravé video.
2. **Doložení otisku šlo obelstít.** `zalohy_trasy()` přidávala do slovníku
   i ŽIVOU trasu, takže pro záznam s dnešním razítkem byl test „otisk tehdy ==
   otisk dnes" **tautologie** — porovnával soubor sám se sebou. A razítko není
   obsahu věrné: `trasa_uvod.py` (ř. 353–364) ukládá do `trasa-stav.json`
   souřadnice, aniž změní `postaveno.kdy`. ✅ Živá trasa ze záloh odstraněna;
   **čtyři otisky, které tou cestou vznikly (Ramonchamp, Ornans, Saint-Sorlin,
   Saint-Denis), jsem zahodil a mapy překreslil načisto** — teď má všech 12
   otisk doložený. Test: „mapa s dnešním razítkem se bez zálohy nedokládá".
3. **Otisk padal na vadném vstupu** (`stav=None`, chybějící `zastavky`,
   `lat="x"`) — jedna poškozená záloha by shodila celý běh. ✅ Vrací `None`
   = „nejde o tom rozhodnout", mapa se překreslí.
4. **Prázdné PNG se tvářilo jako hotová mapa** (kontrolovalo se jen `exists()`).
   ✅ Soubor pod 1 kB = spadlý render, překreslí se.

Kontrolor navíc doložil u všech 8 vyměněných videí stopáž na milisekundu,
zvuk a `faststart`. A správně mě opravil, že měřidlo `test_prepocet_map.py`
bylo ČERVENÉ (26/27) — viz níže, teď je zelené ze správného důvodu.

### ✅ PŘIBALENÁ MÍSTA UŽ NEJSOU FALEŠNÁ VIDEA (červené měřidlo spraveno)

`prepocet_map.py` bral Ramonchamp, Ornans, Saint-Sorlin a Saint-Denis jako
samostatná videa — mají v tabulce ID YouTube, jenže **PŘEVZATÉ** z krycího
videa (`youtube_prevzato_z`), vlastní soubor neexistuje. Připravovaly se pro
ně mapy, které není kam vyměnit, počet hlásil **12 místo skutečných 8** a
invariant „žádné video nehlásí jako chybějící samo sebe" padal (mapa krycího
videa má končit právě u přibaleného místa). ✅ Opraveno jedinou podmínkou;
`test_prepocet_map.py` **27/27** (dřív 26/27). **Kotva, že to sedí:** přepočet
teď hlásí „23 videí, k přestavbě 8" a těch osm je JMÉNO PO JMÉNU týchž osm,
které mám vyměněné na disku — dvě nezávislé cesty došly ke stejnému seznamu.

**Drobnosti do stavu (nic z toho nehoří):**
- Na kanálu jsou DVĚ veřejná videa „23. 07. · Le Bourg-dOisans": `-FR8z-38PR8`
  (živé, 526 MB, 1. 8.) a `wZSKCdxlmeg` (starší, 248 MB, 31. 7., jeho soubor leží
  v `_ceka-na-predelani`). Není to druhá návštěva — týž den v titulku. Starší
  patří přepnout na SOUKROMÉ (nikdy nemazat) — **rozhodne učitel.**
- `mens.png` a `sassenage.png` zůstaly z 10. 8. bez otisku; jejich videa jsou
  „v pořádku", takže se nepoužijí — přesto jsou to zastaralé přípravy. Ve složce
  `pripravene/` navíc leží 4 PNG, které v přehledu nemají záznam vůbec
  (`le-lavandou`, `riez`, `saint-amour`, `saint-tropez`).
- Překódování je CRF 18, takže vyměněné soubory vyrostly ~1,7× (Saint-Maurice
  807 MB → 1,34 GB). Obraz se nezhoršil, ale nahrávání potrvá déle.

### ✅ HOTOVO V NOCI: TITULKY NA KANÁLU · DLUH K F SPLACEN · MAPY DOPŘEDU

**1. Čtyři videa na kanálu dostala datum do titulku** (zadání učitele 12. 8.).
Nový nástroj `nahraj_na_youtube.py --oprav-titulky [--jen ID,ID] [--naostro]`
(výchozí běh NANEČISTO). Titulek se nepočítá z toho, co na kanálu stojí, ale
ze SOUBORU přes `hezky_nazev()` — týmž pravidlem, jakým ho video dostane při
nahrání. Kotva: po zápisu se čte zpátky z kanálu, a to OPAKOVANĚ (0/3/8 s),
protože YouTube chvíli vrací starou hodnotu z cache — jediné čtení hlásilo
„nepovedlo se" u videí, která přejmenovaná byla. Ověřeno nezávisle ze soupisu
kanálu: **ze 7 videí nahraných 12. 8. má datum 7, bez data 0.**
_Torzo `m7L-nUM4-Gk` (P0D, soukromé) dostalo „02. 08. · Saint-Amour (Francie)
— 2/2 (nepodařený přenos, nahradí se)", ať se nezamění s pravým dílem._

⚠️ **NEOPRAVOVAT NASLEPO VŠECHNO** — nanečisto našlo 16 videí, ale dvě mají
RUČNÍ titulek od učitele: `u4NmKbMRhiE` „01 · Německo — Landshut, Schongau,
Geisingen" (stroj by z něj udělal „Nemecko jen hudba") a `9Sv4exafb-c`
„02 · Salbert (Francie)" (přišlo by o ruční pořadové číslo). Nástroj je proto
sám od sebe přeskočí: **liší-li se titulek na kanálu od evidence, měnil ho
člověk a stroj na něj nesahá.** Zbylých ~12 starších videí (Le Thillot,
Rupt-sur-Moselle, Vaulnaveys, Schongau…) by datum dostat mohlo — rozhodne učitel.

**2. Splacen POSLEDNÍ bod dluhu ke kroku F** (medián GPS ve dvou kopiích).
Nový modul **`median_gps_fotek.py`** = jediný domov výpočtu i seznamu fází;
volá ho `trasa_z_tabulky.median_gps` i `zaloz_mista_z_fotek.gps_z_puvodnich`,
a `poradnik._z_disku` si přes `median_ze_seznamu()` počítá medián taky odtud
(polohy si sbírá vlastním průchodem, aby nečetl EXIF dvakrát). **Dluh v registru
zůstal 0 — laťka se nepovolovala.** Pravidlo `median-gps-fotek` má vzor, který
musel umět OBA zápisy (holou dvojici i `{"lat": …, "lon": …}`) — první podoba
kopii v pořadníku minula a hlásila falešný klid.
Doloženo měřením: **7 míst dostalo bod až po sjednocení** (dřív `None`, protože
zakládání míst se dívalo jen do `fotky-puvodni`), a kde bod vracely obě podoby,
je rozdíl **0,0 m**.

**3. Trasa přepočítána a zapsána: 34 zastávek, 3136,5 km** (dřív 3138,1).
Posunuly se jen 3 body — Ruedesheim 96 m, Ochsenfurt 3 m, Sommerhausen 2 m —
a všechny zůstaly na „medián GPS fotek" (jen z většího vzorku). Žádné místo
nepřibylo ani nezmizelo. **Kotva, že to nic nezneplatnilo:** v `PREPOCET-MAP.md`
je proti předchozí verzi jediná změna — časové razítko; k přestavbě zůstalo 12,
v pořádku 15. Čekajících 8 dílů v `nasazeno/` (Luxeuil, Saint-Amour, Salins)
je „v pořádku", nic se nepředělává.

**4. Mapy dopředu: `priprav_mapy.py` 12/12, chyb 0** (zadání „připravuj videa
dopředu"). Nové jsou dvě — `saint-sorlin-en-bugey.png` (2212 km, poslední úsek
109 km) a `saint-denis-en-bugey.png` (2222 km, 9 km); **obě prohlédnuty OKEM**,
trasa i shluky sedí (7 míst → 8 míst) a km na sebe navazují.

### ⏳ ROZDĚLANÉ: krok F — `vymena_videa.py` HOTOV, výměna map ZBÝVÁ

Učitel 13. 8. schválil postup „nejdřív modul + výměna map, pak teprve stopka".

✅ **Sdílený modul `vymena_videa.py` je napsaný a zapojený.** Umí `nahraj()`
(neveřejné + playlist ročníku), `schovej()` (starší verze na SOUKROMOU, nikdy
smazat; kotva čte stav zpátky 0/3/8 s kvůli cache) a `vymen()`. Pořadí je
závazné: nejdřív nahrát, teprve pak schovat — kdyby nahrání selhalo, starší
verze musí zůstat dostupná. `pecliva_videa.nahraj_a_vymen` už ho volá (starý
opis smazán, import prochází), takže deníková videa dostanou TÝŽ kód.

⬜ **Zbývá výměna úvodních map u 12 videí** (`PREPOCET-MAP.md`). Mapy jsou
hotové v `mapa-trasy/pripravene/`, nástroj na výměnu přímo v mp4 je
`vymen_uvodni_mapu.py` (testy 22/22, spouštět s `--prolinani-od 6`). Nahrání
brzdí kvóta 5/den — a ráno v 9:15 ji spotřebuje nahrávač na 5 čekajících dílů,
takže výměny půjdou dávkovat až dalšími dny.

⚠️ **Pravidlo pro registr JSEM ZÁMĚRNĚ NEZAPSAL.** Vzor „výměna videa" hlásil
✅ i pro `nahraj_stara_videa.py`, který schovává originál vlastní cestou —
kopii minul kvůli jinému zápisu (`"privacyStatus": "private",` s dalšími poli).
Falešné pravidlo je horší než žádné, tak jsem ho z registru odebral (zpět na 12,
dluh 0). **Až se bude přepojovat `nahraj_stara_videa.py` a
`nahraj_na_youtube.uklid_po_prerusenem_uploadu` (obojí schovává video vlastní
cestou), teprve pak zapsat pravidlo s vzorem doloženým OBOUSMĚRNĚ.**

### 🆕 NOVÉ ZADÁNÍ UČITELE (13. 8. 2026) — až bude cesta hotová, dělej tohle

Doslova: *„pokud už bude u videí z nynější cesty vše hotové, tak můžeš
pokračovat jednak ve škole fyzika stále dodělávej co je třeba popřípadě navrhni
nějaké vylepšení. A u cest přidávej fotky k místům a videa ze starších cest se
pokus přiřadit k místům podle fotek, videí je málo, ale na některých je v názvu
více míst, tak takové video můžeš přidat do více míst."*

1. **FYZIKA (nejdůležitější ze školy)** — dodělávat podtémata bez názornosti
   a navrhovat vylepšení. Seznam dá `node testy/nazornost.mjs`; ve fyzice 8
   zbývá mj. `vznik-elektrickeho-proudu`, `chemicke-zdroje-napeti`,
   `elektricka-prace-a-vykon`, `ucinky-proudu-a-bezpecnost`,
   `tepelny-motor-parni-stroj`, `tuhnuti`, `kondenzace`,
   `skupenske-zmeny-vody-v-prirode`, `vnitrni-energie-telesa`. Postup: skill
   `/simulace` (4 workeři naráz), pak nezávislý kontrolor a nasazení.
2. **FOTKY K MÍSTŮM** — `vyber_fotky_na_web.py`; nahrává jen tam, kde už místo
   na webu galerii má.
3. **STARŠÍ VIDEA K MÍSTŮM podle názvu** — jedno video smí patřit VÍC místům
   („Švihov, Roupov, Hoštice u Volyně, Nová Pec" = čtyři místa; „Třebíč, Telč,
   Český Rudolec, Jaroměřice nad Rokytnou" = čtyři). Zdroj názvů je
   `data/kanal-soupis.json` (228 videí). **Průzkum 13. 8. (změřeno, ne odhad):**
   po odečtení školních a letošních zbývá 152 starších videí, z nich **16 má
   v názvu čárku** = víc míst.
   ⚠️ **PAST, na kterou jsem hned narazil:** čárka v názvu NEZNAMENÁ místa —
   tři z těch šestnácti jsou ŠKOLNÍ fyzika („Teplo, teplota"; „Jádro atomu,
   síly v jádře"; „Atom, iont, izotop"). Rozlišení podle názvu tedy nestačí
   a slepé přiřazení by nacpalo fyziku do cestovatelských míst. Skutečná
   vícemístná videa (13): `P9x08WGWPNQ` + `_oCN2OaLc50` (Třebíč, Telč, Český
   Rudolec, Jaroměřice), `rv_jOK1nwao` (Švihov, Roupov, Hoštice u Volyně, Nová
   Pec), `QSHRn4e8rMA` (Přejezd Belgie, Nizozemí, Německo), `kXnQv7fQ2qU`
   (Port of Emden, Leer, Leda, Baantjeracht), `nHrirLhTLr0` (Ediger Eller,
   Bremm), `dMahDoNbw5g` (Volendam, Edam), `lTbl4-8u6lc` (Wesel, Ramagen),
   `2sBnHDxpX7Y` + `u_Ss05Tva00` (Gdaňsk), `cK3BN9_T0Gk` (Postupim),
   `-L1FRp30K5I` (Švihov), `2Wj_udTFVOM` (Nová Pec).

   🔴 **OPRAVA MÉHO ZÁVĚRU — pokyn učitele 13. 8.:** *„někde jsme byli dvakrát
   i víckrát, bude tam jiné datum, ale místa nemaž, ty jsou základ podle fotek,
   a videa budou taky dvakrát, ty taky nech."* Dvojice, které jsem označil za
   duplicity, jsou DVĚ NÁVŠTĚVY téhož místa — doloženo daty publikování:
   Třebíč/Telč **25. 4. 2021 × 27. 7. 2026**, Gdaňsk **26. 7. 2022 ×
   8. 8. 2026** (Postupim to má dokonce v názvu: „březen, červenec 24").
   **Nic se tedy neschovává ani nemaže: jedno místo smí mít VÍC videí z různých
   let a rozlišuje je datum.** Místa jsou základ podle fotek a zůstávají.
   ⚠️ K prověření: nahrávač má pojistky `misto_uz_na_youtube` a
   `jen_nejnovejsi_z_mista`, které starší video téhož místa mohou brát jako
   nahrazené — ověřit, že opakovanou návštěvu neodfiltrují.

   **Návrh postupu:** místa brát z názvu, ale kotvou ověřit proti seznamu míst
   na webu — co se v něm nenajde, do míst nepřiřazovat a vypsat k rozhodnutí.

### DÁL SE PŘIPRAVUJE (nic z toho nečeká na učitele)

- **Anonymizovat teď nejde**: 330 fotek sedmi míst leží v `fotky-cekarna` a ta
  zraje 7 dní od POSLEDNÍ fotky (`pipeline_sdilene.presun_zrale`). Trittenheim
  dozraje **13. 8.**, Kluesserath 15. 8., pak Ruedesheim, Ochsenfurt,
  Sommerhausen, Winterhausen. Hlídač spuštěný ručně správně řekl, že má jen
  média bez polohy, a skončil.
- **Stopku video-automatu jsem NEZVEDAL.** Dluh k F je splacen, ale krok F má
  ještě druhou část: vyčlenit `nahraj_a_vymen` do sdíleného modulu
  `vymena_videa.py` a projít výměny map (12 videí k přestavbě). Zvednutí stopky
  je zásah do nasazení — rozhodne učitel, nebo se udělá až po `vymena_videa.py`.

### PRO UČITELE NIC NEČEKÁ

_(Vadnou složku `2024-08-08_Geisingen` učitel 12. 8. ve 22:40 odsouhlasil
smazat; smazána a doklad založen znovu jako `2026-07-09_Geisingen` — správné
datum, vzorek jen z letošních fotek, bod z mediánu GPS fotek. Doklady:
**8 míst, všech 8 ověřeno čtením z disku**.)_

### PRVNÍ ÚKOL: ráno po 9:15 ověřit KANÁL

Nahrávač jede sám v 9:15 a pošle prvních 5 z fronty. **Ověř na skutečném
kanálu** (`kontrola_kanalu.py` nebo API nahrávače), že titulky mají DATUM ve
tvaru `„03. 08. · Luxeuil-les-Bains (Francie) — N/6"`. ⚠️ Verdikt čtu z kanálu,
ne z logu ([[feedback-hlaska-neni-dukaz]]).
**Stav ověření k 12. 8. 22:00 (ne dohad — měřeno):** oprava je v kódu a funguje
— z 35 čekajících souborů má datum **34**, bez data jen `Nemecko jen hudba`
(není místo). Na kanálu se ale ještě NEPROJEVILA: po opravě nahrávač nic
neposlal (ranní běh 9:15 nahrál 5 videí ještě PŘED opravou, večerní 21:15 jen
ohlásil vyčerpanou kvótu 7/5). Proto zůstávají na kanálu bez data
`Saint-Amour 1/2` (`Yi_xYWLPg9s`), torzo `2/2` (`m7L-nUM4-Gk`),
`Salins 1/3` (`G-_9OjxXUwQ`) a `2/3` (`5HUecAJ14LE`) — **zvážit, jestli jim
titulek nedoplnit přes API zpětně** (nahrávač to dnes neumí).
Fronta (ověřeno): `Saint-Amour 2z2`, `Luxeuil 1z6…6z6`, `Salins 3z3`; kvóta 5/den.
Až budou VŠECHNY díly Luxeuilu na kanálu, dopsat je do `2026.ts` podle NOVÝCH
videoId (stará `hGBkVHDg3W4`, `Nit8-Kr7CjA`, `qbysT_piPTE` jsou soukromá).

### ✅ HOTOVO 12. 8. VEČER: DOKLADY MÍST + DVĚ TICHÉ VADY (byl to DRUHÝ úkol)

**8 míst má trvalý doklad** (`fotky-doklad/<datum>_<Místo>/`, 5 fotek + JSON):
Kluesserath (116 fotek), Neumagen-Dhron (43), Sommerhausen (72), Ruedesheim
am Rhein (56), Ochsenfurt (32), Trittenheim (9), Winterhausen (2), Geisingen (7,
založen znovu ve 22:42 po smazání vadné složky — datum 2026-07-09, vzorek bez
loňských fotek, bod z mediánu GPS fotek místo náhradního z pořadníku).
Všechny mají datum focení i bod z **mediánu GPS fotek** — ověřeno čtením
z disku, ne z hlášky skriptu.

Při zakládání vylezly **dvě tiché vady, obě opravené**:

1. **Složka místa se hledala DOSLOVNÝM názvem, ne klíčem.** Ručně vyexportovaná
   složka z Fotek `„⁨Geisingen⁩, 8.7. 2026"` tak vypadala jako cizí místo:
   doklad hlásil „místo nemá žádné médium", ačkoli 25 fotek leželo na disku,
   a bod místa musel ustoupit hrubšímu zdroji. `klic_mesta()` přitom tenhle
   případ řeší od 31. 7. — jen se nepoužíval. Nový **jediný domov
   `vva.slozky_mista()`**, volá ho i `trasa_z_tabulky.median_gps` (splátka
   dluhu k F: medián měl dvě kopie). Kotva: medián Geisingenu z fotek teď
   vychází `47,9221708 / 8,6465889` — **na 7 desetinných míst týž bod**, jaký
   dosud držel jen pořadník.
2. **Do dokladu ročníku 2026 se počítala média z roku 2024.** Ruční export nese
   album MÍSTA, ne cesty — k šesti letošním fotkám Geisingenu přibalily Fotky
   18 snímků z návštěvy 8. 8. 2024 a datum focení vyšlo **2024-08-08**. Datum
   focení řídí POŘADÍ zastávek i titulek videa, takže by se místo posunulo
   o dva roky. **Rohatka pořadníku zápis odmítla** (v žurnálu zůstalo
   2026-07-09) — pojistka funguje. Nově `_z_rocniku()` + `_casy_mista()`: rok
   se hledá napříč fázemi podle jména souboru, protože anonymizovaná kopie
   EXIF nemá; médium bez času projde (nejde o něm rozhodnout).

**Měřidla:** doklad 56/56 (přibyly části 4 a 5 obousměrně, včetně podvrhu
„Geisingen an der Steige" a kalibrace „ubýt nesmí") · trasa 19/19 · rohatka
kvality 21/21 · pořadník 53/53 · zapojení 27/27 · nahrávač 56/56 · datum 34/34
· klíče 4/4 · časy míst 22/22 · kanál 19/19 · registr pravidel 11 pravidel,
dluh 0. Pravidlo `slozka-mista` zapsáno do `data/pravidla-registr.json`
(zakázaný vzor doslovné cesty; obousměrně: 3 podvrhy chyceny, 2 zdravé mlčí)
a obě pravidla do `PRAVIDLA.md`.

**Drobnost (NENÍ blokace, není to regrese):** `testy/test_prepocet_map.py` má
26/27 — „žádné video nehlásí jako chybějící samo sebe" padá u čtveřice
Saint-Maurice, Ornans, Saint-Sorlin, Saint-Denis. Změřeno oběma verzemi kódu:
**4 z 27 před opravou i po ní**, takže s dnešní prací nesouvisí. Tři z nich
jsou přibalená místa BEZ vlastní mapy (dostala krycí videoId 12. 8. dopoledne),
čtvrté má mapu z 24. 7., tedy z doby před trvalou trasou (hranice 10. 8. 8:27).

### DRUHÝ ÚKOL: dvě mezery v automatu zálohy Omegy (12. 8. večer)

Omega je nově git repo + soukromý GitHub `cestynakolech/omega`, zálohuje se sama
každé 3 h (`skripty/zaloha_git.py`, LaunchAgent `cz.wonderly.omega-zaloha`,
test 34/34). Při ostré zkoušce vyšlo najevo:

1. **Zastavená záloha se nikomu nepřipomene** — brána při nálezu tajemství
   nepushne, vyskočí notifikace a zapíše se řádek do `data/zaloha-git.log`,
   jenže `revize_automatu.py` ani `hlidac_zaseknuti.py` o tomhle automatu nevědí.
   Když učitel notifikaci mine, Omega se přestane zálohovat a nikdo se to
   nedozví — přesně vzorec [[feedback-mlceni-neni-klid]]. Dopsat log mezi
   hlídané a hlásit i to, KDY se naposledy povedlo pushnout.
2. **Brána nechytí SKLÁDANÝ klíč** — `"sk-" + "proj" + "A1b2…"` v textu souvislý
   řetězec netvoří, takže regex nesedí a soubor projde. Doloženo naostro:
   commit `d7b82ad` (12. 8. 21:09) takový zkušební soubor opravdu pustil na
   GitHub; souvislý klíč naopak brána zastavila správně (`kód=1`, žádný commit).
   Zkušební soubor byl smazán (`6fc4cbd`), šlo o VYMYŠLENÝ řetězec, ne o skutečný
   klíč — ale v historii repa ten commit zůstal. Zvážit: hlídat i konkatenace
   („sk-" + …) a řetězce s vysokou entropií, plus rozmyslet, zda historii
   pročistit (`git filter-repo`) — u vymyšleného klíče to nespěchá.

### TŘETÍ ÚKOL: poslední bod dluhu k F (PLAN-PORADEK.md, bod 3) — ČÁSTEČNĚ SPLACEN

**Medián GPS fotek je ve dvou kopiích s jinými parametry** —
`trasa_z_tabulky.median_gps` (3 fáze, vzorek 60) × `zaloz_mista_z_fotek.gps_z_puvodnich`
(jen `fotky-puvodni`, vzorek 40): pro místo s fotkami v čekárně dá jedna kopie bod
a druhá `None`. **Zbývá sjednotit samotný výpočet mediánu.**
✅ Splaceno 12. 8. večer: hledání SLOŽKY místa (dosud také dvakrát, pokaždé jinak)
má jediný domov `vva.slozky_mista()` a vymahatelné pravidlo `slozka-mista`
v `data/pravidla-registr.json` — `test_bez_kopii.py` už tuhle půlku hlídá
(11 pravidel, dluh 0). **Teprve po sjednocení výpočtu se smí zvednout stopka
video-automatu** (krok F).

---

## ✅ HOTOVO 12. 8. VEČER — DENÍK: DATUM FOCENÍ UŽ NEZMIZÍ

Zadání učitele: *„hlídej pořadí cesty map podle datumu focení, je to jediné
měřítko"* · *„udělej si pořadník, v kterém nemažeš, jen přidáváš, v pořadí podle
datumu, a podle toho se řiď"* · *„nesmíš uklízet před celkovým zapsáním"* ·
*„jediné, co se může posunout, je když se přidají fotky a videa později"*.

Čtyři propojené opravy (Omega NENÍ git repo — změny jsou rovnou na disku):
1. **Pořadník** `skripty/data/poradnik-mist.jsonl` + `skripty/poradnik.py` —
   34 míst, všechna s datem i GPS, append-only, rohatka (posun jen s přírůstkem
   médií). Zapojen jako PRVNÍ zdroj v nahrávači i `postav()`. → [[projekt-poradnik-mist]]
2. **Datum v titulku z tabulky/pořadníku, ne z fotek** — 34 z 35 čekajících videí
   má datum (dřív 0); bez data zůstal jen `Nemecko_jen_hudba` (není místo).
3. **Doklad před úklidem** — bez něj `uklid_mesto()` vrátí `ODLOŽENO`.
   → [[projekt-doklad-pred-uklidem]]
4. **Zastávky mají jediný domov** — automat už do `trasa-stav.json` nezapisuje.
   (Splacen bod 1 dluhu k F.)

**Trasa přestavěna:** 34 zastávek, 3138,1 km, pořadí vzestupné podle data focení,
0 bez polohy, 0 bez zdroje. Přibyly Sommerhausen, Ochsenfurt, Winterhausen.

**Testy (spuštěné hlavním modelem, ne jen hlášené agenty), vše obousměrně
kalibrované:** pořadník 53/53 · zapojení 27/27 · doklad 46/46 · rohatka 21/21 ·
trasa 19/19 · jediný domov 23/23 · datum 34/34 · nahrávač 56/56.

---

## ✅ HOTOVO 12. 8. 20:25 — SIMULACE ELEKTRICKÉHO POLE UZAVŘENA A NASAZENA

Commit `be4656a`, nasazení ověřeno curlem na
`lab.wonderly.cz/skola2/fyzika/8-rocnik/elektrina/elektricke-pole/`
(produkce nese nový `ElektrickePoleSimulace…Q3RNpAb7.js`, 80 s po pushi).
Opraveno všech 12 nálezů 5. kola + 10 nálezů 4. kola. Brána i build zelené.

**Kotva místo dalšího kontrolního kola** (skript
`scratchpad/overeni.mjs`, lze zopakovat): prošlo 61 311 poloh sondy —
0 zanoření hrotu šipky do kuličky, 0 přesahů plátna, sonda vždy ≥ 30 px od
středu tělesa a ≥ 27 px od osy desky, 0 poloh nad/pod deskami, monotonie
„čím blíž, tím silnější" zachovaná (7,19e−4 → 2,87e−5 pro r = 22…160 px),
výchozí bod sondy (320,150) zůstal dovolený, mezera mezi líci desek přesně
160 px = 8 cm.

⚠️ **Poučení pro příští simulace** (proč to trvalo 5 kol): každý nový
kontrolor zaostří na jinou část a najde další várku — 3. kolo 6 nálezů
(desky), 4. kolo 10 (šipka u desek, navíc REGRESE z opravy 3. kola),
5. kolo 12 (poprvé scéna dvou těles). Nálezů neubývalo, protože se pokaždé
kontrolovalo něco jiného. Co zabralo: poslední kolo dostalo VŠECHNY nálezy
najednou i seznam „co nerozbít", a místo 6. otevřené kontroly se pustilo
**cílené měření jen opravených bodů** — to nemůže vygenerovat novou várku
a dá se zopakovat. Příště tak od 3. kola dál.

---

## 📌 Živé zadání, fronta a reference

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `START.md`).

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### ▶️ POTOM: učitel 5. 8. SCHVÁLIL přepsat na polemiky VŠECHNA zbývající témata F6

Je jich **16** (ne 17 — gravitační síla polemiku už má). Pořadí podle učiva; ke
každému stejný řetěz jako dosud: kvíz → polemika → brána `pokryti_kvizu.py` →
scénosled → schémata → **prohlídka kontaktním listem** → zvuk → video → nasazení.

1. ~~`uvod-do-fyziky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
2. ~~`telesa-a-latky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
3. `casticove-slozeni-latek`
4. `atomy-a-molekuly`
5. ~~`skupenstvi-latek`~~ ✅ HOTOVO a nasazeno 8. 8. (v2 po auditu)
6. `delka`
7. `cas-a-jeho-mereni`
8. `teplota-a-jeji-mereni`
9. `teplotni-roztaznost`
10. `elektricke-vlastnosti-latek`
11. `magneticke-vlastnosti-latek`
12. `jednoduche-elektricke-obvody`
13. `pokusy`
14. `souhrnne-opakovani-velicin`
15. `pololetni-shrnuti`
16. `rocni-shrnuti`

**Nepracuj na víc než třech dílech v jedné session** — kontext dojde uprostřed
a hrozí, že se ztratí rozdělaná práce. Po každém dokončeném dílu zapiš stav sem
a commitni; pak se dá kdykoli navázat.

**Ohlídej si tohle:** shrnující díly (14–16) mají kvízy složené z otázek jiných
témat, takže brána bude chtít pokrýt hodně otázek naráz — počítej u nich s delší
polemikou nebo je rozděl na dva díly. `pokusy` naopak nemusí mít kvíz vůbec;
pokud ho brána nenajde, ověř to a poznač, ať se to nehledá znovu.

**Co je hotové a nasazené (5. 8. odpoledne):**
- Dvě polemiky ke gravitační síle, obě s videem, obě živé na
  `lab.wonderly.cz/skola2/fyzika/6-rocnik/sila/gravitacni-sila/` (ověřeno curlem).
  Hlasy z ElevenLabs, proto je v názvu atribuce `elevenlabs.io` — free tarif ji žádá.
- Celý řetěz skriptů: `pokryti_kvizu.py` → `vyrob_podkasty.py` / `vyrob_dialog_elevenlabs.py`
  → `snimky_podkastu.py` → `video_podkastu.py` → `automat_podkastu.py`.
- Kvóta ElevenLabs vyčerpaná (zbývá 1 410 znaků, obnoví se za měsíc). **Dál se jede
  přes OpenAI**, cena ověřená na 6,20 Kč za díl, tedy asi 700 Kč za všech 115.

### ▶️ TADY SE POKRAČUJE

**Další na řadě je díl 3 `casticove-slozeni-latek`** (souhlasí s hlavičkou nahoře). Postup beze změny:
kvíz → polemika → brána → scénosled → schémata → **prohlídka kontaktním listem** →
zvuk → video → R2 + `temata.ts` → build → push → **ověřit curlem na produkci**.

**Nové pravidlo z dnešního měření: scénář drž pod 4 700 znaky.** Ne kvůli syntéze
(ta si po opravě poradí i s delším), ale kvůli spolehlivosti střihu — viz tabulka
u dílu 2. Dlouhý díl stál 24 Kč a tři pokusy, krátký 5,6 Kč a jeden.

**Jak ověřit hotový díl** (kotva hlídá jen POČET slov, ne KTERÁ chybí): porovnej
každou repliku scénáře se slovy v přepisu `<slug>.prepis.json` a vypiš repliky pod
60 % shody. Repliky plné čísel a jmen vyjdou nízko, i když zazněly — u těch se
podívej do přepisu očima. Takhle se dnes potvrdilo, že oba nasazené díly jsou úplné
a že i `hustota-dialog.mp3` (zůstal po třech neúspěších) je v pořádku.


### ❓ Nálezy ve výkladu F6 — čekají na rozhodnutí učitele

_(přesunuto z uzavřeného kola D9, ať rozhodnutí nezapadne v archivu)_

**❓ NÁLEZY VE VÝKLADU F6 — ČEKAJÍ NA ROZHODNUTÍ UČITELE** (pravidlo
[[feedback-kontrolovat-spravnost-textu]]: odborný text učitele neopravovat potichu).
Ve scénářích jsou všechny obejity — netvrdí se nic sporného. **Na webu zatím JAK BYLY.**

| # | podtéma | co je ve výkladu | proč to nesedí |
|---|---|---|---|
| 1 | `magneticke-vlastnosti-latek` | „železo a jeho **sloučeniny** (ocel)" | ocel je **slitina** (železo + uhlík), ne sloučenina; a většina sloučenin železa feromagnetická není (rez, síran železnatý) |
| 2 | `magneticke-vlastnosti-latek` | ocel mezi feromagnetickými, **nerezová ocel** mezi nemagnetickými | přímý rozpor bez vysvětlení; nemagnetické jsou jen austenitické nerezi, běžné nože a indukční dna magnet přitahuje |
| 3 | `magneticke-vlastnosti-latek` | pole Země vzniká „**rotací** tekutého jádra" | pole tvoří **proudění** vodivého jádra (geodynamo); rotace sama pole nedělá |
| 4 | `magneticke-vlastnosti-latek` | indukční čáry = „uzavřené křivky **vedoucí od** severního pólu k jižnímu" | uzavřená křivka nikam „nevede"; od N k J míří **vně** magnetu |
| 5 | `skupenstvi-latek` | „krystalické látky — **velice tvrdé**"; „amorfní — méně tvrdé" | led 1,5, sůl 2,5, cukr 2 podle Mohse; sklo (amorfní) má 5,5, je tedy tvrdší. Tvrdost z krystalické stavby neplyne |
| 6 | `delka` | „laserový měřič vzdáleností — **nejpřesnější**" | laser měří s odchylkou 1–2 mm, mikrometr o řádek výš na setiny mm, tedy ~100× jemněji |
| 7 | `teplotni-roztaznost` | „látky **všech skupenství** se zahřátím zvětší" | chybí anomálie vody (0 až 4 °C se zahříváním smršťuje — proto led plave); je to učivo 6. ročníku |
| 8 | `teplotni-roztaznost` × `teplota-a-jeji-mereni` | rtuťový teploměr jako běžná pomůcka × „rtuť dnes zakázaná" | dvě stránky si protiřečí |
| 9 | `cas-a-jeho-mereni` | „čas udávala **hmotnost** odkapané vody" | klepsydra má stupnici na hladině, měří objem |
| 10 | `cas-a-jeho-mereni` | „fyzika pojem **vteřina nezná**" | „vteřina" je spisovný český název, jen se přednostně říká sekunda |
| 11 | `hmotnost` | zakazuje „váha tělesa" a o odstavec dál „1 litr vody **váží** 1 kg" | stránka si odporuje v tom, co sama zakázala |
| 12 | `souhrnne-opakovani-velicin` | „m = 5 kg **je veličina**, 5 m je jednotka" | obojí je ZÁPIS; „m = 5 kg" je hmotnost, „5 m" je délka pět metrů |
| 13 | `hustota` | „atom železa je **56×** těžší než vodíku" | vychází 55,4 — chybí slovo „přibližně" |
| 14 | `pokusy` | balónek a papírky = „opačné náboje se přitahují" | papírky **nejsou nabité**; jde o polarizaci, kterou tatáž stránka jinde správně vysvětluje |
| 15 | `pokusy` | Archimédův pohár bez podmínky ponoření | bez „celý pod hladinou, voda nesmí přetéct" vyjde objem jen ponořené části |
| 16 | `elektricke-vlastnosti-latek` | „uzemnění — Země **přijme** volné elektrony" | platí jen pro záporně nabité těleso; u kladného elektrony ze Země naopak přitečou |
| 17 | `elektricke-vlastnosti-latek` | „plast se nabije **vždy** záporně, sklo kladně" | znaménko závisí na DVOJICI třených látek, ne na materiálu samotném |
| 18 | `elektricke-vlastnosti-latek` | nabité těleso „**obsahuje ionty**" | u kovů jde o přebytek či nedostatek volných elektronů, ionty nevznikají |
| 19 | `rocni-shrnuti` | v přehledu veličin mají proud a napětí ve sloupci Značka „—" | chybí `I` a `U`, jako jediné ze všech devíti veličin |
| 20 | `pokusy` | řetěz sponek „ukáže dosah magnetické síly" | ukazuje slábnutí přenesené magnetizace při dotyku; pole působí i bez dotyku |

### 🤖 HERMES ZAPOJEN (rozhodnutí učitele 4. 8. večer — tokeny docházely)

Pokyn učitele: orchestrátor přednostně řeší **chyby a nastavení** (slabší model pak
pracuje s dobře seřízeným strojem); mechanickou práci přebírá **Hermes** — lokální
agent `~/.hermes/hermes-agent`, model gemma4:31b přes Ollamu, tedy zdarma.
Fronta úkolů: `~/Desktop/Omega/HERMES-UKOLY.md` — **ŽIVÝ soubor: aktualizovat na
konci KAŽDÉHO kola spolu s tímto stavem** (hotové odškrtnout, nové mechanické úkoly
z čerstvé práce doplnit — přání učitele 4. 8.) (popisy prezentací 7/8/9, mutační
měření 6 nejslepějších testů, soupis chybějícího `cz()`, tabulky PRAVIDLA.md,
zdraví automatů) → výsledky do `Omega/HERMES-VYSLEDKY.md`. Hermes nikdy nepushuje,
nemaže, nenahrává ven. Spuštění (i pro učitele):
`~/.hermes/hermes-agent/venv/bin/hermes -z "Přečti /Users/radek_soukromy/Desktop/Omega/HERMES-UKOLY.md a plň úkoly po řadě podle pravidel v něm."`
Paměť: [[feedback-hermes-zalozni-pracant]].

### 🔥 ZADÁNÍ UČITELE 5. 8. RÁNO (nejvyšší priorita — „fyzika je nejdůležitější“)

**A. Tajemná laboratoř → příběhová pátračka** (`src/pages/hry/laborator.astro`).
Dnes: dole lišta otazníků, klik vybere otázku („otázka za hodiny“). Učitel chce:
děti HLEDAJÍ V OBRÁZKU — kliknou na předmět (hodiny), otevře se otázka; po uhádnutí
se předmět ZMĚNÍ a stane se INDICIÍ k dalšímu stanovišti (hodiny se přeřídí — ručičky
ukážou SMĚR dalšího úkolu, nebo čas = číslo, které napoví umístění). Řetěz stanovišť
= příběh, soutěž, ať to děti baví. Návrh řetězu si rozmyslet předem (každé razítko
odemyká další indicii), zachovat razítka a ročníky. Vlastní kolo v ČERSTVÉ session,
klidně vějíř (návrh příběhu × implementace × kontrola).

**B. Fyzika na 100 % — v KAŽDÉM podtématu: interaktivní animace + video + audio
podkást.** Změřeno 5. 8. z dat webu (116 podtémat fyziky):
| ročník | podtémat | bez simulace | bez videa | bez audia |
|---|---|---|---|---|
| F6 | 21 | 7 | 20 | 21 |
| F7 | 33 | 9 | 13 | 32 |
| F8 | 37 | 14 | 32 | 37 |
| F9 | 25 | 12 | 12 | 25 |
Postup po kolech (fyzika má přednost před informatikou ve frontě):
1. **Simulace (42 chybí)** — vějíře `/simulace` po 4, od F6 (nejmenší dluh, základ).
2. **Videa (77 chybí)** — worker-media hledá ČESKÁ oficiální YouTube vložení
   (pravidla: jen oficiální přehrávač, jen české, ověřit pokrytí učiva).
   Co nenajde → seznam učiteli do KE-SCHVALENI.md (může natočit/dodat sám).
3. **Audio podkásty (115 chybí) — ROZHODNUTO 5. 8.: OpenAI TTS API.**
   Lokální TTS zamítnuto (strojové). Cena potvrzena učiteli: ~150–300 Kč za všech
   115 dílů (~350 min, ~350 tis. znaků; před spuštěním ověřit aktuální ceník).

   **POVEL `WONDERLY PODKASTY` = pracuj na podkástech takto:**
   1. Zkontroluj klíč v `~/Desktop/Omega/skripty/data/openai-klic.txt`
      (chmod 600; NIKDY ho nevypisovat do chatu ani logů). Když tam ještě není,
      scénáře se píší i bez něj — výroba zvuku počká.
   2. Napiš dávku SCÉNÁŘŮ (vějíř 4× worker, po ročnících od F6): 2–4 min mluveného
      slova na podtéma, jeden vypravěč, jazyk pro děti 2. stupně, čísla celá,
      obsah VYCHÁZÍ z výkladu podtématu (src/data/temata.ts) — žádné nové učivo,
      nezávislý kontrolor zkontroluje věcnou správnost proti výkladu.
      Scénáře do `Omega/podkasty-scenare/<rocnik>/<podtema-slug>.md`.
   3. PRVNÍ DÍL = VZOREK: vyrob MP3 (model gpt-4o-mini-tts, hlas vybrat český
      poslechem, výstup `/Users/Shared/Škola/podkasty/<rocnik>/<slug>.mp3`),
      pošli učiteli k poslechu (SendUserFile / Telegram) a POČKEJ na schválení
      hlasu a formátu — do té doby jen scénáře, žádná hromadná výroba.
   4. Po schválení: noční automat (LaunchAgent vzor zsh; baterie ≤ 30 % pauza;
      1 těžký proces) vyrábí dávky, průběžně zapojovat na web jako materiál
      `druh: 'audio'` k podtématu + build + push + curl. Checklist pořadí:
      `/Users/Shared/Škola/PODKASTY-A-VIDEA-checklist.md`.
   Druh materiálu `audio` v datech existuje a web ho umí.
Měřidlo pokrytí zapojit do brány jako sledovanou hodnotu (ne tvrdou chybu),
ať čísla klesají viditelně každé kolo.

### 🌙 FRONTA (pořadí drž)

1. **Názornost informatiky** — zbývá **22 podtémat** (4. 8. kolo D3 přidalo 4:
   celá `roboticka-stavebnice` + `hra-ping-pong`). Na řadě podle měřidla
   `node testy/nazornost.mjs`: Inf8 `hry-ve-scratchi` (2 zbylé: střílečka, skákačka),
   `hromadne-zpracovani-dat`, `co-umi-vex-iq`; Inf7 `hra-honicka`;
   Inf9 `programovaci-projekty`, `digitalni-technologie` (3).
   Dávka 4+ patří do vějíře (`/simulace`).
2. **Dvojice videí v `nasazeno/`** (zadání učitele): u Le Bourg-d'Oisans a Saint-Bonnet
   leží dvě verze. Nechat tu, **kde je toho víc**, a ověřit, jestli v delší nechybí něco
   z kratší — u Le Bourg to hrozí: kratší verze (4:58) obsahuje **přibalená místa
   Saint-Tropez, Le Lavandou a Riez**, delší (6:06) je jen z Le Bourg (77 médií).
   Když v delší opravdu chybí, složit ze dvou jednu.
3. **Testy simulací jsou z poloviny slepé — DOMĚŘIT.** Mutační test přes všech 16
   simulací (3. 8. dopoledne) skončil: **310 mutací, odhaleno 155, prošlo 155**.
   Pořadí podle toho, kde je díra největší (odhaleno / celkem):

   | simulace | odhaleno | simulace | odhaleno |
   |---|---|---|---|
   | `tabulka-vzorce` | **6/26** | `promenne` | 6/15 |
   | `souradnice` | **7/25** | `led-displej` | 6/12 |
   | `zapojeni` | **8/26** | `meridla` | 7/15 |
   | `vetveni` | **6/19** | `bludiste` | 10/22 |
   | `reostat` | 8/21 | `opakovani` | 8/18 |
   | `odpor-vodice` | 11/25 | `elektrovani` | 12/18 |
   | `vlastni-bloky` | 15/20 | `udalosti` | 18/20 |
   | `funkce-tabulky` | 13/14 | `senzory-robota` | **14/14 ✅** |

   Detail k jedné simulaci: `node testy/mutace.mjs <název>` (vypíše, které mutace prošly
   a kus kódu, který nikdo neměří). Celý běh trvá přes 10 minut — pouštět na pozadí.
   **Jak se díra zavírá** (vzor z 3. 8., obojí doloženo podvrhy): měřit skutečnou scénu
   a vypsané hodnoty, ne text zdroje · texty vázat na chování (popisek proti tomu, co
   tlačítko udělá) · očekávání psát ručně, ne brát z testované komponenty (tautologie) ·
   projít VŠECHNY stavy, ne jen výchozí. Ke každé opravené simulaci patří skript podvrhů
   v `testy/podvrhy/` a záznam v `testy/obousmerne.json`.
   Začít od `tabulka-vzorce` (6/26) — tam je slepota největší.
   Splácení zároveň umořuje dluh rohatky: ke každému doměřenému testu zapsat
   podvrh + zdravý stav do `testy/obousmerne.json` (dluh `bezDokladu` = 14, jen klesat).
4. `cz()` chybí v 11 simulacích, které formátují čísla.
4b. **Z auditu 4. 8.** (celý výstup v `AUDIT-2026-08-04.md`):
   - ~~Měřidlo názvů bloků MakeCode + VEXcode~~ — **HOTOVO 5. 8. (kolo D8)**,
     hned našlo a opravilo 4 živé vady.
   - **Čísla v PROGRESS.md generovat, ne opisovat** („14 simulací" × realita 86) —
     buď skriptem z brány, nebo nahradit odkazem na `node zkontroluj.mjs`.
   - **Checkpointy vázat na datum, ne číslo kola** — „revize à 10 kol" umřela
     přečíslováním (od 29. 7. bez checkpointu); totéž metriky kol 29–72 chybí.
   - **U počítadla vazeb přiznat výluku** — „prošlo 150 ze 165 bloků": 15 souhrnných
     skládaných bloků je mimo záměrně, ale nikde to není napsáno.
   - **PRAVIDLA.md v Omeze má rozbité tabulky** (ř. 35–41, 115–126) — srovnat.
   - **Commit = jedno téma** — tour.astro/worker.js nepřibalovat k nesouvisejícím
     commitům (a718292, e90a0d2); zapsáno i do skillu /wonderly.
5. **BLOKOVÁNO, ne zapomenuto:** obě nové simulace (funkce v tabulkách, senzory robota)
   neprošly očima v prohlížeči — port 8788 drží dev server jiné session a cizí server
   tahle session zastavit nesmí (zkoušeno 3. 8. dvakrát). Až bude volný, projít je
   pohledem; kotvou jsou zatím testy, build a kontrola vygenerovaného HTML.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz` (rozhodovací tabulka v `KE-SCHVALENI.md`).

## 🧰 POSTUP PRÁCE S KVÍZY (referenční zápis, ne úkol)

`node testy/vypis-kviz.mjs <blok>` (vypíše VŠECHNY otázky — hledej duplicitní páry,
délkové měřidlo je neukáže) → `node testy/delky.mjs <blok> --odpovedi` (znění
i délky, dorovnává se bez čtení celého souboru) → opravit → kontrolor → brána →
build → push. Hromadné záměny dělej **skriptem s pojistkou** `assert s.count(a)==1` —
třikrát zachytila, že se týž řetězec v souboru vyskytuje vícekrát nebo vůbec.

> Pozn. 1. 8. 2026: pod tímhle nadpisem byla **podruhé zapsaná fronta úkolů**, která
> si protiřečila s frontou nahoře — a právě podle ní se ráno jelo dorovnávat kvízy,
> ačkoli audit z 31. 7. říkal, že skutečná díra je jinde. Nález auditora strategie.
> **Živá fronta i otevřené dotazy na učitele jsou VŽDY jen v nejhornější sekci.**

## Fronta nápadů (seřazeno podle priority)

### 🚴 Appka /tour — automatické přepínání mezi velkými závody (zadáno 4. 8. 2026)

Přání učitele: *„aby se to samostatně přepínalo na zrovna aktuální velké závody a vše
šlo automaticky — Vuelta a tak dále."* Rozpracované zadání, ověřený průzkum:

- **Tour, Tour Femmes i Vuelta mají TOTOŽNOU strukturu** (pořadatel ASO): `/en/rankings`
  s ajax adresami `itg`/`ite` i `racecenter.<doména>/api/…` (ověřeno 4. 8. 2026 — všechny
  tři vracejí HTTP 200). **Giro NE** (pořadatel RCS, `/en/rankings` vrací 404) — potřebovalo
  by vlastní parser, řešit až v druhém kroku.
- **Který závod běží, se nemusí hádat z kalendáře**: pro každou doménu zjistit etapu
  z `rankings`, zkusit `pack-<rok>-<etapa+1>` a podívat se na stáří pole `date`.
  Čerstvé (< 15 min) = tenhle závod se právě jede. Volbu závodu cachovat na hodinu,
  ať se to nedotazuje pořád dokola.
- **České jezdce hledat podle seznamu jmen**, ne podle národnosti v tabulce (ta tam není).
  Seznam ~15 českých profesionálů (muži i ženy) natvrdo v kódu, aktualizace jednou za rok.
  POZOR na diakritiku — hledat zkrácené tvary bez koncovky („NOSKOV", „VACEK", „ČERN"…),
  a ověřit, že zkratka nechytá cizí jméno.
- **Lokální modely (ollama) se sem NEHODÍ**: worker běží v Cloudflare, kam lokální model
  nedosáhne, a úloha není jazyková, ale deterministická. Jediné smysluplné využití AI by
  byl překlad anglického živého komentáře — a to by musela dělat Workers AI, ne ollama.
- Mimo sezonu musí stránka umět říct „právě se nejede žádný velký závod" místo pomlček.

### Kandidáti na simulace (NOVÝ audit temata.ts, 28. 7. 2026 — kolo 38; zásoba na měsíc)

Z 64 fyzikálních podtémat bez interakce vybráno 12 s jevem, který jde ANIMOVAT či OVLÁDAT:
1. [x] **F7 treci-sila** — HOTOVO v kole 39 (TreniSimulace: led/dřevo/beton, hystereze
   klidové × smykové, vše celé N).
2. [x] **F7 archimeduv-zakon** — HOTOVO v kole 40 (ArchimedesSimulace: siloměr ve 3 fázích,
   4 materiály × 3 kapaliny, vše celé N).
3. [x] **F8 tepelna-vymena-a-teplo** — HOTOVO v kole 41 (KalorimetrSimulace: generátor úloh
   s celými výsledky, bilance odevzdané=přijaté teplo).
4. [x] **F8 pohybova-a-polohova-energie + zakon-zachovani** — HOTOVO v kole 42
   (SkateparkSimulace na obou stránkách: ideální rampa × se třením, teplo Q).
5. [x] **F9 elektromagneticka-indukce** — HOTOVO v kole 43 (IndukceSimulace: 4 závislosti
   z výkladu, voltmetr ±20 dílků, „magnet stojí = nic").
6. [x] **F9 elektromagnet** — HOTOVO v kole 44 (ElektromagnetSimulace: proud × závity ×
   jádro = sponky, vypnutí, prohození pólů).
7. [x] **F7 optika-rovinneho-zrcadla** — HOTOVO v kole 48 (RovinneZrcadloSimulace:
   osová souměrnost, zákon odrazu, praporek + zrcadlový nápis AMBULANCE).
8. [x] **F8 spalovaci-motory** — HOTOVO v kole 49 (SpalovaciMotorSimulace: řez motorem —
   píst + ojnice + klika + ventily, klik na dobu = póza s popisem, ▶ celý cyklus jako čistá
   funkce času, zážehový × vznětový mění svíčku/vstřikovač i popisy).
9. [x] **F9 polovodice-typu-n-a-p-dioda** — HOTOVO v kole 50 (DiodaSimulace: PN přechod
   s hradlovou vrstvou, napětí −5…+5 V po 1 V, práh LED 2 V, celé mA přes rezistor 200 Ω,
   V-A charakteristika s pohyblivým bodem, tlačítko ⇄ otoč zdroj).
10. [x] **F7 atmosfericky-tlak** — HOTOVO v kole 51 (BarometrSimulace: balón 0–8000 m
    po 1000, Torricelliho rtuťový barometr, celé hPa dle standardní atmosféry — kotva
    1013 hPa = 760 mm u moře, % normálu, místa Ještěd→Everest).
11. [x] **F7 oko-vady-oka** — HOTOVO v kole 52 (OkoSimulace: řez okem se sítnicí, 3 stavy
    oka, ohnisko před/na/za sítnicí, brýle rozptylka/spojka vrací obraz na sítnici, panel
    „co vidí" s rozmazáním přes SVG filtr, strom=dálka × kniha=blízko).
12. [x] **F9 vedeni-proudu-v-kapalinach** — HOTOVO v kole 53 (ElektrolyzaSimulace: destilovaná
    voda nevede × roztok NaCl vede, ionty Na⁺→katoda / Cl⁻→anoda se šipkami, žárovka dle
    proudu, napětí 0–12 V po 2 V → celé A (R=2 Ω), režim pokovování lžičky Au⁺ s vrstvou dle I).
Záměrně vynecháno: shrnutí/opakování, čistě výkladová témata (úvod do fyziky, zdroje energie,
vesmír má simulaci soustavy) a témata s hotovou příbuznou simulací.

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026 — sloučení dvou front, nález auditu)

Škola (web):
- [ ] `zkontroluj.mjs`: počítadlo otázek (`^\s*text:\s*'`) nepočítá starší jednořádkový
  zápis kvízů — jen kosmetika výpisu, opravit regex (nález 28. 7. u F8 tepelná výměna).
- [ ] Simulace „Rozpálená kolejnice" (dilatační spára, výpočet prodloužení) — F6/F8.
- [ ] Simulace „Změř to rukou, nebo teploměrem?" (tři kádinky) — F6 teplota.
- [ ] Generátor příkladů na průměrnou teplotu s grafem (celá čísla) — F6.
- [ ] Doplnit kompenzátor (expanzní smyčku) do výkladu teplotní roztažnosti.

Deník:
- [ ] Opravit 8 VAD z auditu webu 29. 7. (datum „červenec 2026" v EN/DE, neklikací
  piny bez JS, překryv pinů roků, atribuce mapy, video bez datové předpony,
  `satisfies` v preklady.ts) — drobné, bez rozhodování.
- [ ] Připomínky učitele 29. 7.: úvodní mapa roku začíná doma (jižní Čechy) ·
  u karty místa jen jeho vlastní video · fotogalerie u míst 2026 (náhled + zvětšení).
- [ ] Stará videa a fotky k bodům starších cest (zadání 2. 8., postup
  v `Cestovatelský deník/KE-SCHVALENI.md`) — začít bodem (a): `videa_k_mistum.py`.

Organizace:
- [ ] Po sjednocení úložiště modelů znovu ostrý test `graf_local.py` (dva modely).

Čeká na rozhodnutí učitele (přestěhováno tamtéž):
- [?] Referenční tváře 2021 — z kandidátů vybrat a POTVRDIT (přidání tváře = ta osoba
  se přestane rozmazávat, potvrzuje vždy učitel).
- [?] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a stará
  skrýt? (YouTube neumí vyměnit soubor.)
- [?] Rozhodovací tabulky z 29. 7.: laboratorní práce (12), nové simulace (10),
  UX školy (8), mapa+poutavost deníku (14).
- [?] 9 videí „k rozhodnutí" — `Cestovatelský deník/KE-SCHVALENI.md`.
- [?] Odkaz na video „Teplota a její měření – Fyzika 6" (v soupisu kanálu není).
- [?] Návrh: shlukování popisků na úvodní mapě do čtverců („7 míst"), zásah
  do `trasa_uvod.py`, ~1 kolo práce.

### 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (posouzeno, čeká na pokyn)

Učitel navrhl dát značkám „něco jako referenční fotky obličejů", ze všech států
a v mnoha velikostech. **Posouzeno odborně: tudy ne, ale jádro nápadu je dobré.**

- Reference obličejů řeší **identifikaci** (čí tvář to je), ne hledání. Detekci
  dělá jiný model a reference k ní nepotřebuje.
- U SPZ neselhává identifikace (značky se rozmazávají všechny stejně), ale
  **detekce** — dnešní Haar kaskáda `haarcascade_russian_plate_number.xml`
  hlásí střechu, plot, lavičku i terasu (doloženo v `data/pecliva-videa.log`
  31. 7., dvě zamítnutí po sobě). Katalog vzorů by nepomohl: kaskáda neporovnává
  obrázek s obrázkem, hledá jen přechody světla a tmy. Různé velikosti navíc
  už řeší `detectMultiScale` sama.
- **Co pomůže:** hledat značky jen UVNITŘ nalezených aut (střecha ani plot
  v autě nejsou) — bez cizího `.pt` modelu, který je vědomě zakázaný.
- **Z nápadu si vzít tohle:** sada značek z různých států a velikostí jako
  **zkušební sada pro měření**. Dnes nikdo neví, kolik značek automat přehlédne,
  a bez měření nejde zlepšení doložit.
- Navržené pořadí: (1) změřit dnešní stav na zkušební sadě, (2) přidat kontext
  auta, (3) přeměřit. Čeká na pokyn učitele.

### Další úkoly
- [ ] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [ ] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [ ] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
- **Hermes — sjednocení návodů (audit z noci 29. 7.):** `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md`
  — Hermes JE nainstalovaný (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly.
  Návrh: jeden HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md" (Hermes
  md soubory pro Clauda číst UMÍ). Rozhodnutí ráno.
- **Automatický restart samostatného režimu po obnově tokenů:** šlo by naplánovanou úlohou
  (cron v danou hodinu spustí novou session). Nová trvalá konfigurace → jen se souhlasem.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


## Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026)

- **V úložišti zůstalo 9 fotek + náhledy pod `cesty/2026/saint-sauveur`.**
  Nikdo je nevidí (místo na webu už není, fotky jsou nahrané i pod Luxeuilem),
  takže nespěchají — smazání z R2 je mazání, čeká na odkliknutí učitele.
- **Poloha zastávky po úklidu fotek zhrubne.** Když VideoAutomat uklidí
  mezikopie, místo ztratí medián GPS a trasa má na výběr pin z deníku
  a starou trasu; při remíze dvou zdrojů vyhraje pin (u Ballonu d'Alsace
  o 710 m vedle). Na evropské mapě je to pod rozlišením (1 px ≈ 3 km),
  proto se to neřešilo — kdyby se mapy někdy dělaly detailnější, dát
  přednost zdroji „medián GPS fotek" ze staré trasy.
- **Kontaktní list pro vizuální kontrolu anonymizace nemá skript** — dělá se
  ručně přes ffmpeg `tile`. Kandidát na doplnění do `kontrola_videa.py`.

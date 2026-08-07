# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩⏩⏩⏩⏩⏩ KDE POKRAČOVAT (7. 8. 2026 ~02:10 — ANIMACE ZAPOJENÉ DO VIDEÍ)

**Zadání učitele před spaním:** *„vymysli a vytvoř celé video včetně animací
a pokud to budeš mít, pokračuj samostatně na další práci, nečekej na odsouhlasení,
stále pokračuj, souhlasy si pamatuj, udělám je potom najednou."*

**✅ HOTOVO A ŽIVÉ NA WEBU (ověřeno curlem):**
1. **`animace_podkastu.py`** (nový modul) — pohyblivá obdoba `snimky_podkastu.py`.
   Registr `ANIMACE`, scénosled scénu označí klíčem `"animace": "<klíč>"`.
   Hotové animace: `pad_zeme_papir`, `pad_mesic`, `newtonovo_delo`.
2. **`video_podkastu.py` umí vložit KLIP místo statického snímku** — když vedle
   `scena-NN.png` leží `scena-NN.mp4`, použije se a poslední snímek se podrží do
   konce scény (`tpad` + `trim`). Obousměrný důkaz: bez klipu se nic nezměnilo.
3. **Úvod do fyziky s animacemi** — `polemika-uvod-do-fyziky-animace.mp4`
   (scéna 9 kámen × papír na Zemi, scéna 10 kladivo × pero na Měsíci).
4. **Gravitační síla s animací Newtonova děla** — `polemika-gravitace-1-animace.mp4`
   (scéna 2 „Proč stanice nespadne": tři výstřely, dva dopadnou, třetí obíhá).

**🐛 NEJDŮLEŽITĚJŠÍ NÁLEZ: video se učiteli nepřehrálo („0,07 s, ani se to
nerozběhlo").** Nebyla to vada animace — soubor měl **index (moov) až ZA daty**
a **žádnou zvukovou stopu**. Přehrávač na tom zamrzne hned na začátku. Doloženo
hledáním značek `moov`/`mdat` v souboru. **Každý klip i ukázka proto nově mají
`-movflags +faststart` a tichou stopu AAC.** Platí pro cokoli, co se posílá
učiteli nebo na web — hotová videa podkástů to měla odjakživa, samostatné klipy ne.

**Proč animace kreslí KÓD (a ne video model):** polohy se počítají ze vzorců
(volný pád, pád s odporem, numerická integrace v gravitačním poli), takže rozdíl
časů dopadu i oběh družice z výpočtu VYJDOU. Generativní model se z pozemských
videí naučil, že lehké věci padají pomaleji vždycky — na Měsíci by tedy učil opak
toho, co říká zvuk. Kotva se u každé animace ověřuje PŘED kreslením (dráhy,
časy dopadu) a po vyrobení pohledem na výřez.

**DALŠÍ KROK (fronta animací, seřazeno podle přínosu):**
- `vzajemne-pusobeni` scéna 11 „Dvakrát větší síla, dvakrát větší protažení" —
  pružina se natahuje se závažím (přímá úměrnost je vidět, ne jen napsaná).
- `hustota` scéna 9 „Jak se ponorka potopí" a scéna 7 „Klesá, vznáší se, plave".
- `objem` scéna „Objem kamene z rozdílu" — hladina stoupne po ponoření.
- Pak přezvučené díly znovu složit s animacemi a nasadit stejným postupem.
- **Scénáře `atomy-a-molekuly` (3 krátké díly) čekají na scénosledy** — bez nich
  nejdou snímky ani video; brána pokrytí kvízu u nich hlásí 14 ze 14.

## ⏩⏩⏩⏩⏩ KDE POKRAČOVAT (7. 8. 2026 ~00:05 — VŠECH 8 VIDEÍ NASAZENO)

**✅ HOTOVO A ŽIVÉ NA WEBU** (commit `43daee8`, ověřeno curlem na produkci —
počty videí na stránkách: hmotnost 1, hustota 1, objem 1, vzájemné působení 1,
gravitace 4, tělesa a látky 2, úvod 2). Učitel poslechl a schválil hlasy
i první video („je to dobré, může se nasadit").

**🆕 NOVÉ ZADÁNÍ UČITELE (7. 8. 2026): POHYBLIVÉ OBRÁZKY MÍSTO STATICKÝCH.**
Doslova: *„ještě by se mi líbilo, kdyby se do videa nepřidávaly jen statické
obrázky, ale hýbající se — například když říkají, že astronaut upustí kladivo
a pero, tak by to bylo i vidět; není nějaký lokální model, který by to dokázal?"*
Nabídl také napsat dotaz na Discord.

**UPŘESNĚNÍ UČITELE (druhá zpráva): animace má ukazovat i OKOLÍ, ne jen předměty** —
*„astronaut, který stojí na zaobleném měsíci, kde měsíc je šedý, a pustí předměty
z rukou; a pak na zemi, která bude taky zaoblená a bude barevná."* **HOTOVO:**
`Omega/skripty/animace_mesic_zeme.py` → `animace-mesic-zeme.mp4` (189 snímků, 7,5 s).
Měsíc: zaoblený šedý povrch s krátery, černé nebe s hvězdami a modrou Zemí v dálce,
astronaut ve skafandru se zlatým průzorem. Země: zaoblený zelený povrch, modré nebe,
slunce, mraky, dítě v tričku. **Stopky v rohu** dělají rozdíl měřitelným:
Měsíc 1,4 s obojí současně · Země kladivo 0,57 s, pero 2,97 s.
Pero na Zemi se počítá z pádu s odporem (v = v_m(1 − e^(−kt)), mezní rychlost
0,55 m/s), ne odhadem. **Tři vady nalezené vlastní kontrolou:** (1) závěrečná hláška
tvrdila „pero se teprve snáší“ ve chvíli, kdy už leželo — hláška se nově řídí
skutečným stavem, ne fází; (2) bílý text na šedém Měsíci měl kontrast 2,64 : 1
(norma 3 : 1) → tmavý, 5,79 : 1; (3) vlastní MĚŘIDLO polohy pera bylo špatné —
chytalo text hlášky a vracelo stejnou hodnotu v obou časech; nález vyvrátil až
pohled na výřez (pravidlo [[feedback-hlaska-neni-dukaz]] platí i pro vlastní měření).
Dosednutí doloženo: kladivo i pero ±1 px od povrchu.
**Dvě další připomínky učitele (obě opraveny):** (4) *„čas ti běží ještě v době,
kdy už vše leží"* → stopky se zastaví na čase dopadu posledního předmětu
(Měsíc 1,4 s, Země 3,0 s) a zůstanou stát jako naměřený výsledek; doloženo
obousměrně rozdílem pixelů ve výřezu stopek — během pádu se mění, po dopadu je
rozdíl přesně 0. (5) *„na zemi je vysvětlení dost splývající s barvou země"* →
hláška má bílou plaketu. **Poučení: splnit normu kontrastu nestačí.** Tmavý text
na trávě měl 6,2 : 1, tedy vyhovoval, a učiteli přesto splýval — barevné pozadí
s podobným jasem ruší čitelnost i při formálně dobrém poměru. Na plakátek
(neutrální podklad pod textem) je proto lepší spolehnout se vždy.

**ODPOVĚĎ, KTERÁ SE OVĚŘILA V PRAXI: na fyzikální jev je lepší KÓD než video model.**
Ukázka hotová za necelou minutu zdarma: `scratchpad/ukazka_animace.py` →
`ukazka-animace-apollo.mp4`. Polohy se počítají ze vzorce volného pádu
(s = ½·g·t², g = 1,62 m/s² pro Měsíc), takže **současný dopad je matematicky
zaručený**. Generativní model by naopak skoro jistě nechal pero padat pomaleji —
naučil se to z pozemských videí — a scéna by učila PRAVÝ OPAK toho, co říká zvuk.
Je to tentýž důvod, proč schémata kreslí kód (železné pravidlo skillu `podkast-video`).
Ověřeno měřením: kladivo dosedá na povrch s odchylkou 4 px (tloušťka čáry povrchu).
**DALŠÍ KROK:** zavést do `snimky_podkastu.py` typ scény `animace` (sekvence PNG
místo jednoho) a `video_podkastu.py` naučit vložit místo statického snímku klip.
Kandidáti na animaci: pád na Měsíci, papír × kámen, difuze, píst motoru, pružina
siloměru, ponorka, hustoměr. Video model (LTX/Wan/Hunyuan přes MLX) má smysl leda
na ÚVODNÍ ilustraci, kde na přesnosti nezáleží — tam je dnes statický obrázek.

**Discord:** psát tam nemusíme kvůli technice (řešení je hotové), ale pokud chce
učitel názor komunity na video modely na Macu, text dotazu se připraví — odeslat
ho musí učitel sám, tahle session do Discordu přístup nemá.

**🔧 Opraveno v tomto kole (vše s obousměrným důkazem):**
- **`pokryti_kvizu.py` měl systémovou díru: odpověď kratší než 3 znaky propadla
  VŽDY** (prázdná množina klíčových slov → podíl 0). Týkalo se to všech značek
  (Fe, O, m, V, F) napříč fyzikou — brána tiše hlásila chybějící odpovědi tam,
  kde byly. Navíc špatně skládala české číslovky („sto osmnáct" → „8 100“ místo
  118, „devadesát dva" → „90 2"). Nově obecný převod číslovek + porovnání krátkých
  slov. **Regrese změřena na všech 8 dílech: 0 zhoršených, 3 zlepšené.**
- `vyrob_video_automat.py` — hudba ACE-Stepem si bere `zamek_modelu.drz()`.
- `video_podkastu.py` — nový `--nazev` (dvě verze zvuku vedle sebe).

**📝 Scénáře `atomy-a-molekuly` (tři krátké díly) HOTOVÉ, brána 14 ze 14.**
Chybí jim scénosledy → bez nich nejdou snímky ani video. To je další úkol.

## ⏩⏩⏩⏩ Předchozí (6. 8. 2026 ~23:35 — hlasy hotové, běžela videa)

**✅ VŠECH 8 DÍLŮ F6 MÁ NOVÝ HLAS a učitel je poslechl a SCHVÁLIL**
(„je dobré, může jít na video"). Kotva správnosti hlasů — změřená výška hlasu
na hotových nahrávkách: MAREK 142–161 Hz, EVA 233–264 Hz u všech dílů, tedy
žádné prohození. Skript měření: `zmer_f0.py` ve scratchpadu session.
Nejlepší výsledek měl poslední díl (vzájemné působení, 42 replik ze 45 napoprvé);
nejhorší objem (7 replik k poslechu) — slabina je vždy táž: čísla a vzorce.

**🎬 BĚŽÍ VÝROBA VIDEÍ** (dvě dávky na pozadí, `nohup`, přežijí konec session;
logy `davka_videa.log` a `davka_ilustrace.log` ve scratchpadu):
1. `davka_videa.sh` — čtyři díly, které úvodní ilustraci MAJÍ. Hotový je
   **uvod-do-fyziky** (9 MB, 5:59, délka obrazu sedí na zvuk na setinu, zarovnání
   87 % slov, obraz prohlédnut vzorkem 4 snímků). Pokračuje gravitace.
2. `davka_ilustrace.sh` — čeká na uvolnění Macu a pak čtyřem dílům
   (hmotnost, hustota, objem, vzájemné působení) **vyrobí chybějící `podklad-00.png`**
   mfluxem podle `popis_en` ze scénosledu → `snimky_podkastu.py --scena 0` → video.
   **To byla příčina, proč první dávka u těch čtyř spadla** — schémata mají hotová,
   chyběla jen úvodní ilustrace, jediná neschematická scéna.

**NASAZENÍ PO DOBĚHNUTÍ** — mapa cest a názvů je připravená ve scratchpadu
(`nasazeni.json`): čtyři díly jsou PRVNÍ nasazení (hmotnost, hustota, objem →
celek `fyzikalni-veliciny`; vzájemné působení → `sila`), tři dostanou druhou verzi
VEDLE stávající. Pak R2 → `temata.ts` → build → push → **ověřit curlem na produkci**.

**🔧 Opraveno při tom (obojí s obousměrným důkazem):**
- `vyrob_video_automat.py` — výroba hudby ACE-Stepem si nově bere
  `zamek_modelu.drz()` (zapsaná vada z minulého kola). Směr „držený zámek → vzdá se"
  ověřen proti SKUTEČNÉMU držiteli (běžící dávce hlasů), zdravý stav pustí hudbu dál.
- `video_podkastu.py` — nový volitelný `--nazev`, aby druhá verze zvuku nepřepsala
  video té první (učitel chce obě vedle sebe). Bez přepínače se chování nezměnilo.

**📝 SCÉNÁŘE `atomy-a-molekuly` HOTOVÉ jako tři krátké díly** (vějíř 3 workerů):
`-atom-` (20 replik, 1 543 znaků), `-molekuly-` (20, 1 747), `-smesi-` (20, 1 794).
Formální kontrola 0 chyb, nezávislý kontrolor 1 drobnost (opraveno: „vyslovujeme
ó dvě" → „zápis se čte ó dvě"). Brána `pokryti_kvizu.py` nad spojením tří dílů:
**10 ze 14 otázek** deterministicky; zbylé čtyři (Fe, O, 92, „příliš malé") jsou
v textu prokazatelně obsažené, jen je porovnání slov nepozná — **doběhnout branou
s modelem, až bude GPU volné**. Chybí scénosledy (bez nich nejdou snímky ani video).

## ⏩⏩⏩ Předchozí stav (6. 8. 2026 ~23:00 — předání před /clear)

**Na pozadí BĚŽÍ dávka výroby hlasů** (`nohup`, přežije konec session):
`/tmp/claude-502/-Users-Shared--kola/73e93873-6372-49e4-9ab1-5f51ab4c3cbf/scratchpad/davka_hlasy.sh`,
log `davka_hlasy4.log` tamtéž. Vyrábí OmniVoice audio pro 7 dílů F6 novým hlasem
(`male, low pitch, middle-aged` — vybral učitel; hlasy se přiřazují podle JMÉNA,
viz vada níže). Hotovo: telesa-a-latky (37/37 napoprvé, posláno učiteli).
**Po dokončení každého dílu poslat učiteli k poslechu.** Kotva správných hlasů:
změřit F0 referencí (muž < 160 Hz < žena; telesa: Marek 175, Eva 267).
Pozn.: /tmp se maže restartem Macu — pak dávku spustit znovu ručně
(`for slug in ...; do ./venv/bin/python3 vyrob_omnivoice.py $slug --rocnik 6; done`,
hotové díly se přeskočí samy).

**🔨 ROZDĚLANÉ (nezačato v kódu, jen naplánováno): Luxeuil — původní zvuk JEN
u klipů s vystoupením.** Zadání učitele doslova: „slep videa dohromady a ty kde
tančí s hudbou tam nech tu hudbu, aby tam k tancování nehrála jiná; pokud nejsou
na některém videu jak tancujou, dej tam hudbu svoji." Hotové už je: režim
`puvodni` zapojen pro klíč `luxeuil-les-bains` (`MISTA_S_PUVODNIM_ZVUKEM` ve
`vyrob_video_automat.py`). ZBÝVÁ (do 11. 8., kdy složka dozraje):
1. `sestavit_video2.py`: nový argument `--puvodni-klipy <soubor>` (jména klipů,
   po řádcích) → v `sestav_vysledek()` (ř. ~331: `if snimek["typ"] == "klip"...`)
   brát zvuk + ztlumovat hudbu JEN u klipů ze seznamu; ostatní jako `nahradit`.
   Vybraným klipům přidat `dynaudnorm` (jsou tiché, −28 až −48 dB mean).
   Argumenty se parsují na ř. ~416–450, volání `sestav_vysledek` ř. 523.
2. NOVÝ `vyber_klipy_vystoupeni.py`: pro každý .MOV složky vytáhnout prostřední
   snímek (ffmpeg) a zeptat se ThinkingCap („Je na snímku taneční vystoupení,
   tančící lidé v krojích nebo hrající kapela? ANO/NE") → seznam do souboru.
   MUSÍ si vzít `zamek_modelu.drz()` — video automat sám zámek NEMÁ (nález,
   viz níže). Vzor volání vision: `_zeptej_se_vision` v `anonymizovat_fotky.py`.
3. `vyrob_video_automat.zpracuj_mesto()`: když `rezim_zvuku == "puvodni"`,
   spustit klasifikátor nad pracovní složkou a předat `--puvodni-klipy`.
4. Obousměrný důkaz: vytáhnout výběr klipů do funkce + test (podvrh: klip mimo
   seznam nesmí do zvuku; zdravý: bez seznamu se chová jako dřív).
Kontext: 36 klipů má jen ~3 s (Live Photos), delší video učitel NEMÁ.

**🐛 NOVÝ NÁLEZ (zapsat do fronty oprav): `vyrob_video_automat.py` NEBERE
sdílený `zamek_modelu`**, přestože generuje hudbu ACE-Stepem (těžká GPU úloha)
— může se srazit s pečlivými videi/OmniVoice. Doplnit `drz()` kolem výroby hudby.

**Další připravená práce:** SPZ (úkol schválen učitelem): (1) změřit dnešní
Haar kaskádu na zkušební sadě, (2) hledat SPZ jen uvnitř vozidel — ThinkingCap
UMÍ vracet souřadnice vozidel (ověřeno na 3 fotkách; POZOR škála 0–1000, ne
pixely; ~18 s/fotku), (3) přeměřit. Čeká, až Mac uvolní GPU po dávce hlasů.

**Čeká na učitele:** poslech dílů novým hlasem · chmod 2 referenčních fotek na
účtu radekmicek (žádost na mostě) · torch upgrade (2 zranitelnosti).

## ⏩⏩ Předchozí stav (6. 8. 2026 — OmniVoice otestováno, změna délky dílů)

**Co se dnes stalo:** učitel zkoušel s Claudem NotebookLM (přes rozšíření Claude
v Chromu — trvalo dlouho kvůli povolením domén, viz paměť
`projekt-notebooklm-pres-chrome`) a lokální modely TTS jako bezplatnou alternativu
k OpenAI/ElevenLabs. **Výsledek NotebookLM: nepoužitelné pro polemiky** (komentuje
text, nehraje ho — verdikt v `NAVOD-NOTEBOOKLM-VIDEO.md`). **OmniVoice ale funguje
dobře** — otestováno na všech 8 dosavadních dialogových dílů (314 replik), 90 % v
pořádku napoprvé, zbytek automat sám opraví nebo označí k poslechu. Podrobnosti a
nástrahy (MPS+float16 zamrzá, hlas se musí "zamykat" referencí) v
`~/Desktop/Omega/dokumenty/NAVOD-OMNIVOICE.md`. Skript:
`~/Desktop/Omega/skripty/vyrob_omnivoice.py <slug> --rocnik <r>`.

**Nasazeno na zkoušku:** díl Úvod do fyziky má teď na webu DVĚ verze vedle sebe
(OpenAI + OmniVoice), učitel poslechl a schválil, obě live na produkci.

**OPRAVENO AUDITEM 6. 8.:** ostatních 7 dílů má hotové **jen OmniVoice AUDIO**
(7× `*-omnivoice.mp3` v `/Users/Shared/Škola/podkasty/6/`) — **videa NEexistují**.
Video mají jen 3 díly (gravitace ×2, tělesa a látky) a to s PŮVODNÍM zvukem;
4 díly (hmotnost, hustota, objem, vzájemné působení sil) nemají video vůbec
a nejsou ani nasazené (nejsou v `temata.ts` — ověřeno curlem dvěma kontrolory).
Než se dá „nasadit vedle", musí se u nich video teprve vyrobit.

**ROZHODNUTÍ UČITELE, KTERÉ MĚNÍ FRONTU NÍŽ: díly budou kratší.** Ne 4–6 minut na
celé téma, ale **tři kratší díly** (třetinová délka) na téma, každý na **jedno
vysvětlení** (jeden pojem/pokus). Fronta 16 zbývajících témat níže je pořád platná
CO SE TÉMAT TÝČE, ale každé z nich teď znamená tři krátké scénáře, ne jeden dlouhý.

**ROZHODNUTO UČITELEM 6. 8. 2026 (tři otevřené otázky uzavřeny):**
1. **OmniVoice díly NASADIT VEDLE OpenAI verzí** (jako u Úvodu do fyziky — obě
   verze vedle sebe, děti si vyberou). *Pozn. z auditu: rovnou nasadit jde jen
   u 3 dílů s existujícím videem (nutno přezvučit na OmniVoice); u 4 dílů
   (hmotnost, hustota, objem, vzájemné působení) se video musí teprve vyrobit
   a půjde o PRVNÍ nasazení, ne „vedle".*
2. **Vyrobit VZORKY jiných hlasů OmniVoice** — hlubší/dospělejší `instruct` značky
   (současné byly „hodně dětské", u jednoho přízvuk a „newton"→„Neuton"), stejný
   úryvek, porovnat poslechem. Seznam platných značek v `NAVOD-OMNIVOICE.md`.
3. **Začít psát scénáře hned** — zbývajících **14** témat (16 minus 2 hotová)
   přepsat na TŘI krátké scénáře (každý na jedno vysvětlení); psaní nezávisí
   na hlasu, výroba zvuku počká. První téma: `casticove-slozeni-latek`.

**✅ OPRAVY PO AUDITU PROVEDENY 6. 8. ODPOLEDNE:** hlídač starých fotek opraven
(npm plnou cestou + PATH + správný cwd + odchycený pád; doloženo během bez PATH),
revize automatů posílena (časové stopy, chyby v delším okně s datováním, kontrola
cest rejstříku — obousměrný důkaz `Omega/skripty/testy/test_revize_nalezu.py`,
9/9), stavový soubor zeštíhlen 2 380 → 431 řádků, fronty sloučeny (FRONTA-UKOLU.md
je už jen rozcestník). Referenční fotky: žádost o chmod na mostě (čeká na účet
radekmicek). **Vzorky 6 hlubších hlasů OmniVoice poslány učiteli** —
`Omega/podkasty-vzorky-hlasu/omnivoice-hlasy/` (newton vysloven správně ve všech,
ověřeno whisperem). Čeká se na výběr hlasu.

### ✅ 6. 8. VEČER — hlas vybrán, opraveny dvě vážné vady, scénáře napsané

**HLAS VYBRAL UČITEL: `muz-1` = `male, low pitch, middle-aged`** (poslechem šesti
vzorků v `Omega/podkasty-vzorky-hlasu/omnivoice-hlasy/`). Zapsáno ve
`vyrob_omnivoice.py`; ženská role dostala obdobu téhož receptu.

**🐛 VADA 1 (vysvětluje „dětské hlasy"): HLASY BYLY PROHOZENÉ.** Přiřazení bralo
pořadí prvního výskytu repliky, jenže v šesti z osmi scénářů promluví první MAREK —
dostal tedy ženský hlas a Eva mužský. Nově se řídí JMÉNEM (`POHLAVI_JMEN`), neznámé
jméno výrobu shodí místo tichého uhodnutí. Důkaz: `testy/test_hlasy_podle_jmena.py`
(17/17) + změřená výška hlasu na hotové nahrávce: Marek 175 Hz, Eva 267 Hz.
Stará audia odložena do `/Users/Shared/Škola/podkasty/6/hlas-detsky-puvodni/`
(nic nesmazáno), všech 8 dílů se vyrábí znovu. První hotový: **telesa-a-latky,
37 replik z 37 napoprvé, 0 oprav** (dřív 90 %).

**🐛 VADA 2 (nález učitele „video udělal automat asi popáté"): bylo to SEDMKRÁT.**
Automat pozná hotové video podle zapsané CESTY — a učitel ho odklidil do
`video-vystup/_duplicity/`, kterou kontrola neznala. Táž past potřetí (31. 7.
přidáno `nasazeno/`, 2. 8. zjištěno, že smyčka funkci nevolá, 6. 8. `_duplicity`).
Nově se video hledá **podle klíče místa kdekoli ve `video-vystup`** včetně podsložek
a dvojnických názvů s neviditelnými znaky Fotek. Přidána **tvrdá pojistka
`uz_publikovano()`**: co je na YouTube, se nevyrobí znovu za žádných okolností —
hrozilo druhé nahrání téhož místa. Důkaz: `test_video_nasazeno.py` (14/14 včetně
regrese, že starý kód scénář nenašel) + ověřeno na skutečných datech Geisingenu.
**✅ UKLIZENO 6. 8. (učitel schválil): 1,54 GB.** Smazáno 22 starších hudebních
stop u 10 míst (477 MB; u každého místa zůstala nejnovější), složka
`video-vystup/_duplicity` (964 MB) a dvojnická složka anonymizovaných fotek
`⁨Geisingen⁩, 8.7. 2026` (103 MB). **Před každým mazáním kotva:** všech 7 videí
v `_duplicity` ověřeno jako publikovaná na YouTube (jinak by je po smazání
`uz_hotovo()` přestalo vidět a vyrobila by se znovu — proto na nich stojí pojistka
`uz_publikovano()`); u fotek doloženo, že všech 25 souborů má zálohu ve
`fotky-puvodni` a že kopie leží na webu (curl na `IMG_1616.jpeg` → 200, 9,8 MB).

**📝 SCÉNÁŘE: `casticove-slozeni-latek` hotové jako TŘI krátké díly** (první téma
podle nového rozhodnutí o délce): `-atomy-` (1 474 znaků, 20 replik), `-pohyb-`
(1 550, 28), `-difuze-` (1 964, 22). Brána `pokryti_kvizu.py` nad spojením všech
tří: **18 z 18 otázek pokryto**. Žádná věta nad 165 znaků, žádné číslice, žádné
závorky. Pozn.: workeři `worker-vyklad` NEMAJÍ Write — vracejí text, ukládá
hlavní model.

**🚗 SPZ — učitel schválil práci** (pořadí: změřit → hledat uvnitř vozidel →
přeměřit). Průzkum hotov: **lokální vision model ThinkingCap UMÍ vracet souřadnice
vozidel** — ověřeno na třech skutečných fotkách deníku (najde 3 auta a sedí;
na horách i na soše s plotem vrátí prázdno). **Past: souřadnice jsou ve škále
0–1000, ne v pixelech** (`px = hodnota / 1000 * rozměr`). Rychlost ~18 s na fotku,
takže u videa se ptát jen jednou za N snímků. Haar kaskáda na auta NEEXISTUJE
(v OpenCV jsou jen obličeje, těla a ruské SPZ), insightface umí jen obličeje.
Záložní cesta: ONNX detektor COCO přes `cv2.dnn.readNetFromONNX` (ověřeno funkční,
ONNX nespouští kód na rozdíl od `.pt`) — vyžadovalo by stažení, tedy souhlas učitele.

### ✅ 6. 8. POZDĚ VEČER — deník: rok 2025, vlaječky, tři nálezy učitele

Učitel prohlížel mapu webu a našel/zadal: dvojitý Wismar (VYSVĚTLENO: tři
skutečné návštěvy 2024 — 10. 3., 7.–9. 7., 29. 12.), prázdný rok 2025 a přání
vlaječek u míst. Provedeno a nasazeno (`f5f801c`, curl ověřen):
- **Rok 2025 doplněn z fotek: 43 míst, 13 cest** (vč. 43denní letní přes
  Normandii do Belgie a maďarského září). Fotky v hromadě BYLY, ale rok je
  v `RUCNE_PSANE_ROKY`, tak je automat přeskakoval. Sestaveno jednorázově,
  soubor zůstává ručně spravovaný (bez značky automatu), Karlstadt s galerií,
  stellplatzem i Bertíkovým reportem zachován.
- Dvě místa z geokódování přejmenována podle souřadnic (doloženo Nominatim):
  „France métropolitaine" → **Utah Beach (Sainte-Marie-du-Mont)**,
  „Küstengewässer…" → **Wismarský záliv** (fotky z vody 1 km od přístavu).
- **Vlaječky zemí u každého místa** v seznamu (funkce `vlajkyZemi` už existovala).
- **Oprava mapy:** ruční posuny popisků se nekontrolovaly proti sobě — po
  rozšíření výřezu o Normandii se střetly Vaulnaveys-le-Haut a Col d'Ornon.
  Posun teď platí, jen když nekoliduje (brána: 237 pohledů, 0 nálezů).
- **OmniVoice zamrzání:** syntéza na MPS občas zamrzne; doplněn timeout 600 s
  + záchyt ve smyčce pokusů (zamrzlý pokus = neúspěšný, jede se dál).

**❓ PRO UČITELE — datum Karlstadtu nesedí s fotkami:** ruční zápis říká
23. 7. 2025, ale fotky ho řadí mezi Rothenburg (9. 7.) a Bingen (12. 7.),
tedy ~10.–11. 7. V seznamu proto vyčnívá z časové řady. Neopravuji potichu —
rozhodněte, které datum platí.

**🚗 Luxeuil-les-Bains — původní zvuk zapojen** (`MISTA_S_PUVODNIM_ZVUKEM`
ve `vyrob_video_automat.py`; režim `puvodni` v sestavit_video2.py už existoval).
POZOR zjištění: všech 36 klipů má jen ~3 s (vypadá na Live Photos) a jsou tiché
(−28 až −48 dB) — učitel dotázán, jestli nemá delší souvislé video vystoupení.
Složka dozraje nejdřív 11. 8.

**🔍 NEZÁVISLÝ AUDIT 6. 8. 2026 PROVEDEN** (4 kontroloři s čerstvým kontextem:
repo/tvrzení, automaty, produkce, proces). Plná zpráva:
`~/Desktop/Omega/dokumenty/AUDIT-CINNOSTI-2026-08-06.md`. Nejzávažnější nálezy:
stavový zápis tvrdil neexistující videa (opraveno výše); automat
`stare-fotky-hlidac` od 30. 7. tiše padá na chybějícím `npm` (exit 0!) a změny
6 datových souborů deníku se nikdy nenasadily; Hermes nemá žádný doložený
výsledek (HERMES-VYSLEDKY.md neexistuje); `foto-hlidac` nenačte 2 referenční
fotky → rozmazává tvář, která má zůstat ostrá; mrtvá cesta vrátného
`povoleni_hook.py` v pravidlech (skutečný je `/Users/Shared/povoleni_hook.py`).

## 📌 Živé zadání, fronta a reference

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `START.md`).

### 🎯 PRVNÍ ÚKOL PO OTEVŘENÍ SESSION (5. 8. VEČER): složit čtyři videa a nasadit

**Povel učitele: `WONDERLY VIDEA`.** Načti skill **`podkast-video`** a k němu
**`~/Desktop/Omega/dokumenty/NAVOD-POLEMIKY-F6.md`** (krok za krokem pro nového kolegu).

**HNED PO OTEVŘENÍ UDĚLEJ TOHLE:**

1. Zkontroluj, jestli doběhl automat na stará videa:
   `python3 ~/Desktop/Omega/skripty/pecliva_videa.py --stav`
   (5. 8. 17:53 byl ve fázi **kontrola**, kousek 29 z 29). **Dokud běží, nespouštěj
   ffmpeg ani whisper** — shodil bys mu kolo, které běželo osm hodin.
2. Až je Mac volný, vyrob ke každému ze čtyř dílů ilustraci scény 0 (jediná
   neschematická) a slož video:
   `python3 skripty/video_podkastu.py <slug> --zvuk "/Users/Shared/Škola/podkasty/6/<slug>.mp3"`
   Slugy: `vzajemne-pusobeni-teles-sila-dialog`, `hmotnost-dialog`, `hustota-dialog`,
   `objem-dialog`.
3. **U hustoty dávej pozor** — její mp3 vzniklo ještě před opravou kotvy a nová
   verze se přeskočila jako hotová. Pokud zarovnání selže, vyrob zvuk znovu
   (soubor odlož, ať ho skript nepřeskočí) — teď už projde.
4. Nahraj do R2, zapoj do `temata.ts`, `npm run build`, push, **ověř curlem na
   produkci** (učitel 5. 8. hlásil, že u hustoty video nenašel — tehdy ještě
   neexistovalo, nezaměnit s chybou nasazení).

### ▶️ POTOM: učitel 5. 8. SCHVÁLIL přepsat na polemiky VŠECHNA zbývající témata F6

Je jich **16** (ne 17 — gravitační síla polemiku už má). Pořadí podle učiva; ke
každému stejný řetěz jako dosud: kvíz → polemika → brána `pokryti_kvizu.py` →
scénosled → schémata → **prohlídka kontaktním listem** → zvuk → video → nasazení.

1. ~~`uvod-do-fyziky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
2. ~~`telesa-a-latky`~~ ✅ HOTOVO a nasazeno 5. 8. 2026 večer
3. `casticove-slozeni-latek`
4. `atomy-a-molekuly`
5. `skupenstvi-latek`
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

### ▶️ TADY SE POKRAČUJE (stav k 5. 8. 2026, 20:30 — konec session)

**Další na řadě je díl 3 `casticove-slozeni-latek`.** Postup beze změny:
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


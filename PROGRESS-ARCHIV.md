# PROGRESS — archiv starších záznamů

- **2026-08-04 (appka /tour přepnuta z mužské na ŽENSKOU Tour + poznávačka + oprava živé tabulky)** —
  Zadání učitele: *„nyní jsme na dámské tour a jede tam minimálně jedna Češka, pokud to jde
  předělej ji"*, pak *„pokus se tam dostat startovní číslo a dej nám sem obrázky dresu
  a přilby, ať ji poznáme"* a *„nefungují živá data do tabulky"*.
  **Kdo se sleduje:** Nikola Nosková (Cofidis Women, **číslo 147**) — jediná Češka na startu
  Tour de France Femmes 2026 (1.–9. 8., Lausanne → Nice, 9 etap). Ověřeno DVĚMA nezávislými
  cestami: startovní listinou a projetím celé výsledkové tabulky (139 jmen) na českou
  diakritiku — druhé nalezené jméno je Slovinka Žigart, další Češka tam není.
  **Hotovo a nasazené** (`https://lab.wonderly.cz/tour/`): zdroj dat přepnut na
  `letourfemmes.fr` + `racecenter.letourfemmes.fr`; startovní číslo v hlavičce karty;
  sekce „Jak ji poznáte v televizi" — vlastní SVG kresby dresu (žluté rukávy, tmavě
  červená ramena, červeno-bílý trup, svislé COFIDIS) a bílé přilby Uvex + tabulka
  startovního čísla; QR kód na ploše (`QR-noskova-tour-femmes.png`); koncept e-mailu
  s odkazem připraven v Gmailu (odeslání je na učiteli).
  **Čtyři skutečné chyby nalezené a opravené** (podrobně i s pastmi v skillu `/wonderly`,
  sekce „Mini-aplikace /tour"): (1) ženská tabulka má **o sloupec navíc** → parser hledá
  čas podle tvaru, ne podle indexu; (2) **pomlčka ve sloupci Gap ≠ „vede"**, ale dojezd
  v čase vítězky — chybu měla i mužská verze (Vacek 154. „vede"); (3) endpointy mimo
  etapu vracejí **prázdné tělo (204)**, na kterém `.json()` padal a shazoval s sebou
  i výpis skupin; (4) **živá tabulka se nikdy nezobrazila**, protože ženský racecenter
  nevysílá telemetrii jednotlivých závodnic — běh závodu se teď pozná podle stáří
  posledního záznamu skupin (< 15 min) a živá pozice se odvodí ze skupiny, kde má
  Nosková číslo. Navíc: francouzské názvy skupin přeloženy do češtiny, komentář zbaven
  HTML značek a doplněn fallback `cs → en → fr` (česká verze u žen neexistuje).
  **Ověřeno kotvami, ne dojmem:** worker spouštěn přímo v Node proti živým datům;
  oprava živé tabulky doložena OBOUSMĚRNĚ (čerstvá data → jede se + pozice ve skupině;
  stará data → skryto); SVG kresby vyrenderovány přes `qlmanage` do PNG a prohlédnuty
  (první verze měla odsazené rukávy a moc tlusté dno přilby → opraveno).
  **ZBÝVÁ / na příště:** živá tabulka se v ostrém provozu ukáže až za jízdy etapy —
  ověřit ji **5.–9. 8. odpoledne** (etapa 5+); po skončení závodu 9. 8. se stránka
  přepne zpět na mužskou Tour podle návodu ve skillu.

- **2026-08-02 večer II (audit automatů: opsaná pravidla; mapa dostala videa; zkratka WONDERLY)** —
  Učitel zadal: *„překontroluj všechny automaty, zda nedělají totéž — že se něco opraví
  a najednou druhý automat jede z jiných příkazů."* Podnětem bylo, že se mu **videa,
  která zkontroloval a přesunul do `nasazeno/`, po hodině vracela k revizi**.
  **Příčina byla přesně ta, na kterou se ptal:** oprava z 31. 7. („hledej video i
  v nasazeno/") žila ve funkci `uz_hotovo()`, jenže hlavní smyčka ji **nevolala** —
  měla vlastní kopii podmínky. V jednom běhu logu to stálo vedle sebe: *„uklid po
  nasazeni Gassin"* a o řádek níž *„NOVÉ MĚSTO: Gassin"*. Le Bourg vzniklo **5×**,
  Saint-Bonnet 3×, přes 600 MB navíc.
  **Audit 56 skriptů našel tři opsaná pravidla:** projekce mapy ve třech skriptech
  (jeden si koeficienty tahal **regexem ze zdrojáku** druhého), denní strop YouTube
  napsaný v druhém automatu **znovu číslem** (`DENNI_LIMIT = 2`), a rozhodnutí
  o hotovém městě. Projekce navíc **nebyly shodné** — jedna zaokrouhlovala, druhá ne,
  a rozdíl pod 0,05 px první měření zamaskovalo. Sjednoceno tak, že se **žádnému
  volajícímu nezměnilo chování** (doloženo na čtyřech bodech před i po).
  **Zavedeno:** `projekce_mapy.py` (jediný domov), registr `data/pravidla-registr.json`
  + hlídač `test_bez_kopii.py` s rohatkou (dluh **0**), zapojený do denní revize.
  **Dvakrát mě přitom vlastní hlídač propustil** a přišlo se na to až podvrhem:
  hlídat jméno funkce nestačí (pravidlo se dá opsat jako holé ČÍSLO) a import smí
  omluvit jen obálku funkce, nikdy zakázaný zápis. Nakonec 5 podvrhů chyceno, zdravý
  stav mlčí. Vedlejší nález: **`revize_grafu.py` se vůbec nepřekládal** (česká uvozovka
  ukončila řetězec + `*gen or [...]`) a nikdo o tom nevěděl, protože ho nic nespouštělo
  — revize nově překládá všech 56 skriptů.
  **Mapa deníku: odkazy na videa 15 → 37 míst.** Pečlivá anonymizace jede po jednom
  a čeká na odklik, takže na 73 videí by mapa čekala měsíc; párovač proto bere i
  **původní videa**, která na kanálu leží už teď. Přepracovaná verze má vždy přednost
  a po výměně se odkaz přepíše sám. Soukromá videa se přeskočí (mrtvý odkaz).
  **Nová simulace „Funkce v tabulkách"** (Inf8) — POČET nebere text ani prázdno,
  PRŮMĚR dělí počtem ČÍSEL, prázdná buňka se v porovnání bere jako nula. Test 93 kontrol.
  **Nezávislý kontrolor našel 11 vad a jedna byla vážná a věcná:** mez `KDYŽ` byla na 3,
  takže žák s **čtyřkou** dostal „neprospěl" — ve škole je 4 dostatečná, tedy prospěl.
  Bylo to jediné tvrzení na stránce, které si žák umí okamžitě ověřit. Opraveno i to,
  že výklad učil `=RANK` bez třetího údaje, zatímco simulace hned pod ním tentýž tvar
  označovala za past.
  **Zkratka `WONDERLY`** (přání učitele): jedno slovo = celá věta „načti stav, vezmi
  první úkol z fronty, pracuj samostatně"; noční běh `/loop WONDERLY`. Návod
  `~/.claude/skills/wonderly/START.md`. Při tom se ukázalo, že **fronta úkolů byla
  na dvou místech a rozešla se** — skill vedl „média k Fyzice 6", stavový soubor
  „názornost informatiky". Nově platí dělba: skill říká JAK se pracuje,
  `SAMOSTATNY-REZIM.md` CO je na řadě, zadání `/loop` jen to jedno slovo.
  **Poučení dne:** tentýž vzorec „opsané pravidlo" se objevil ve třech vrstvách naráz —
  v kódu automatů, v textu zadání a v mých vlastních měřidlech. Kdo pravidlo potřebuje,
  ať si ho IMPORTUJE; kdo ho opíše, ať to hlídač shodí.

- **2026-08-02, 20:00 (informatika 7 — hra bludiště; a proč se na okraji nesmí ořezávat)** —
  Nová simulace `BludisteSimulace` u podtématu `hra-bludiste`. Výklad jmenuje **tři chyby,
  „které dělá skoro každý"** — nově jdou všechny tři na přepínačích **způsobit a vidět**:
  krok 30 px přeskočí tenkou zeď 10 px a **postava projede zdí**; obě rady výkladu (zmenšit
  krok NEBO zeď zesílit) opravdu zaberou; návrat schovaný v ⟨opakuj stále⟩ neví, kudy
  postava šla, vrací ji vždycky dolů a **postava uvízne ve zdi**. Test **125 kontrol**,
  testy simulací celkem **659**, názornost informatiky **33 → 32**. Kvíz dostal **3 otázky
  na jádro výkladu** (detekce kolize, kam patří návrat, nabírání barvy kapátkem — dosud se
  na to neptal vůbec) a délková nápověda klesla ze 4/9 na 3/12.
  **Nezávislý kontrolor našel 17 vad, 6 vážných**, a ta nejdražší byla neviditelná:
  **ořez na okraji scény posunul postavu mimo mřížku velkého kroku.** Osy zdí leží schválně
  přesně uprostřed mezi zastávkami kroku 30 (…160, 190…), jinak by postava na zeď šlápla —
  jenže po **jediném stisku ←** se fáze posunula na 48 + 30k, všechny tři zdi padly do
  dosahu a **zdí už nešlo projet vůbec**. Hra přitom dál vypadala, že funguje, jen postava
  „nemohla dál" — žák by se naučil pravý opak výkladu. Okraj scény se proto nově chová jako
  zeď: krok, který by vedl ven, se **neprovede** a fáze zůstane celá; ze stejného důvodu
  vrací každá změna programu postavu na start (jiná délka kroku = jiná mřížka).
  Další vážné: hláška brala čísla i směr z **aktuálních voleb** místo z toho, co se opravdu
  stalo, takže po přepnutí tvrdila „krok 5 px je delší než zeď 40 px" a popisovala pohyb,
  ke kterému nedošlo · týž znak **🏁 znamenal na jedné obrazovce dvě věci** (klobouk
  programu i cíl; paleta má `EVENT_WHENFLAGCLICKED` se **zelenou** vlajkou) · postava
  uvízlá ve zdi se kreslila **červeně přes černou zeď** (kontrast 2,83 : 1, norma je 3 : 1)
  — nově světlá výplň, bílý obrys a ✗, aby to poznal i barvoslepý žák.
  **Šestý vážný nález byl zase v TESTU:** deset podvrhů jím prošlo. Nejzrádnější — názvy
  bloků se kontrolovaly ve *spojeném* textu obou variant programu, takže podvrh „dotýkáš se
  barvy (**modrá**)" v jedné variantě prošel, protože „černá" byla v té druhé. Nově se měří
  každá varianta zvlášť; přibyly kontroly čísel v hláškách proti nastaveným volbám,
  `preventDefault`, `aria-pressed` u všech šesti přepínačů, `aria-label` u všech čtyř šipek
  a poloha cíle proti popisu pro odečítač.
  **Obousměrně doloženo 17 podvrhy** (každý na KOPII ve scratchpadu — pravidlo z minula
  dodrženo, commit šel před ověřováním a do repa se nesahalo): každý podvrh se najde,
  2 až 25 spadlých kontrol, zdravý stav mlčí. Poctivá poznámka k mezi metody: s krokem
  30 px a silnými zdmi se do chodeb netrefíš vůbec (zastávky leží 15 px od osy zdi) —
  není to vada, ale bez vysvětlení by to vypadalo jako zaseknutá simulace, takže to hláška
  po nárazu říká nahlas.
  *Deník:* dokončena práce, kterou nechal automat rozdělanou — rok 2021 dostal odkazy
  na videa (Skanzen Přerov nad Labem, Nová Pec 2, Koloděje) a KRATOCHVÍLE byla vyměněna za
  přeanonymizovanou verzi; všechna čtyři videa ověřena přes `/embed/` i názvem z oEmbedu.
  **Kapitoly k Le Bourg-d'Oisans doběhly, ale nasadit je nejde bez rozhodnutí učitele:**
  log nahrávače doložil, že na YouTube je soubor `_v2.mp4` (4:58), zatímco kapitoly se
  počítaly z verze 6:06 — kapitola „3:14" by padla o minutu jinam. Tři varianty s cenou
  jsou v `KE-SCHVALENI.md`. **Poučení: „která verze je na kanálu" se nepozná podle názvu
  souboru ani podle jeho času — musí to doložit log nahrávače.**

- **2026-08-02 večer (informatika 7 — vlastní bloky s parametry)** — Nová simulace
  `VlastniBlokySimulace`. Program kreslí tři čtverce, ale otáčí se o **80° místo 90°**,
  takže se čáry neuzavřou — chyba je vidět na první pohled, ne jen napsaná. Pointa výkladu
  *„opravuješ na jednom místě"* je tím měřitelná: **tři kopie kódu si vyžádají tři opravy**
  (a mezi nimi zůstávají dva útvary křivé), **vlastní blok jedinou**. Srovnání 3 × 1 zůstává
  na obrazovce i po přepnutí režimu. Parametr: tentýž blok kreslí 50, 80 i 120.
  Test **61 kontrol**, testy simulací celkem **534**, názornost informatiky **34 → 33**.
  **Nezávislý kontrolor našel 2 vážné a 6 drobných vad.** (1) Řádky programu měly
  `display: inline-block`, takže se skládaly **vedle sebe** a „tři kopie pod sebou" se
  rozpadly do vodorovné změti. (2) **Test vůbec nečetl scénu** — podvrh „kresli vždy správný
  úhel" prošel všemi 45 kontrolami, ačkoli hláška tvrdila opak toho, co bylo vidět; test teď
  čte skutečné `points` a `stroke`, a tři podvrhy kontrolora shodí 6, 9 a 1 kontrolu.
  Drobné: česká shoda („zbývající 1 zůstala křivá"), závěrečná věta tvrdila „na jednu se
  zapomene" ve chvíli, kdy už byly všechny tři útvary zelené, kontrola názvů bloků běžela jen
  v jednom ze dvou režimů a vzor měřidla neuměl interpolaci `jdi (${v}) kroků`.
  **Vlastní chyba, a už podruhé tatáž:** opravy podle kontrolora jsem zahodil příkazem
  `git checkout` nad necommitnutou prací. Poprvé se to stalo u měřidla šablon a je to
  zapsané v paměti — a přesto se to opakovalo. Pravidlo pro příště: **po každé dávce oprav
  rovnou commit, teprve pak jakékoli ověřování s podvrhem.**


> Starší záznamy (do 2026-08-02) jsou v `PROGRESS-ARCHIV.md` — pro navázání práce se nečtou.

## Přesun 8. 8. 2026

- **2026-08-02 odpoledne (celková oprava kontroly šablon — přestat hádat, začít měřit)** —
  Učitel vytkl: *„stále něco opravuješ a zůstává to neopravené… navrhni celkovou opravu."*
  Měl pravdu. Kontrola, která hlídá, že skript simulace nesahá na neexistující prvek, se
  opravovala třikrát, protože **hádala regulárními výrazy**. Na každý další způsob zápisu
  (`$(id)`, `<script is:inline>`, `querySelector('#x')`) by musel přibýt nový vzor a ten
  chybějící by byl tichá díra. Doloženo kontrolorem: **270 z 945 vyhledání nebylo měřeno
  vůbec** a u čtyř komponent šlo smazat CELOU scénu, aniž brána cekla.
  **Řešení není další vzor, ale jiný princip:** skript se SPUSTÍ nad DOMem postaveným ze
  skutečné šablony, každý dotaz na prvek se zaznamená a porovná. Je jedno, jak si prvek
  hledá — měří se výsledek. Tentýž posun jako u kvízů (*číst data, ne text souboru*).
  Změřeno **5101 vyhledání místo 675**, pokrytí **977 z 983 (99,4 %)**, obousměrný test
  **24 → 54 kontrol**, a hlavně: ze šesti mutací měřidla test dřív neshodila ani jedna,
  dnes shodí **všech šest**.
  **Druhé kolo kontroly našlo další vrstvu:** měřil se jen kód doběhlý při NAČTENÍ — obsluha
  tlačítek, `setTimeout` ani `requestAnimationFrame` se nikdy nezavolaly, takže 32 vyhledání
  v devíti komponentách zůstalo slepých (mj. celá tyč rotoru u elektromotoru). Nově se
  posluchači po doběhnutí jednou spustí. Dál: komponenta bez jediného měření je tvrdá chyba
  (celý skript v `DOMContentLoaded` dosud prošel mlčky), jediné `class={…}` už neumlčí
  kontrolu id celé komponenty, zakomentovaná scéna se nepočítá jako existující prvek,
  prvek nikdy nevložený do stránky nezakryje vadu, každý `<script>` běží zvlášť.
  **Poctivě zapsaná mez:** změřit jde jen kód, který se opravdu provede — šest vyhledání je
  ve větvích, kam běh nedojde. To není vada měřidla, ale hranice metody.
  **Vlastní chyba dne:** podvrh v repu jsem vracel přes `git checkout`, jenže přepis měřidla
  ještě nebyl commitnutý — **zahodil jsem tím celou práci** a brána pak běžela zase na staré
  slepé verzi, takže vypadala, že podvrh nenajde. Poučení: podvrhy patří na KOPIE, a když už
  do repa, tak jen nad commitnutým stavem.

- **2026-08-02 odpoledne (informatika 7 — události a vstupy; a proč se kontrolor nesmí
  poslouchat slepě)** — Nová simulace `UdalostiSimulace` u podtématu `udalosti-a-vstupy`.
  Scéna s kočkou a míčem, události se vyvolávají tlačítky i skutečnou klávesnicí (šipky,
  mezerník, klik přímo na míč) a je vidět, které žluté klobouky se rozsvítí — jedna zelená
  vlajka rozjede **dva scénáře naráz**, každý u své postavy. Hlavní pointa, kterou výklad
  dosud jen tvrdil slovy: přepínač vezme míči klobouk, **bloky mu nechá**, a vlajka s ním
  už nehne. Přepnutí schválně nevrací postavy na start — jinak by nebylo co pozorovat.
  Názornost informatiky **35 → 34** podtémat bez obrázku či videa, testy simulací
  **451 → 472 kontrol**.
  **Oba VÁŽNÉ nálezy nezávislých kontrolorů byly v TESTU, ne v simulaci.** Test nečetl
  HTML šablonu vůbec (atrapa chybějící prvek tiše vyrobí), takže komponenta se smazanou
  scénou i všemi tlačítky jím prošla jako zdravá; a hlavní pointu ověřoval jen čistou
  funkcí, ne cestou přes ovládací prvky — podvrh „přepínač vrátí míč na start" prošel bez
  povšimnutí. Obojí je uzavřené a ověřené oběma směry (podvrh se najde, zdravý stav mlčí).
  **Mutační test k tomu přidal třetí věc:** konstanty (krok 10, skok 20) jsem v testu četl
  z testovaného kódu, takže se tvrzení přizpůsobila jakékoli hodnotě. Nově se čísla čtou
  z TEXTU bloku, který má žák na obrazovce — když by simulace posouvala o jiný počet, než
  co je v programu napsané, stránka by lhala a spadne to.
  **Kontrolora ale nelze poslouchat slepě.** Označil za závažnou vadu, že výklad píše
  „po obdržení zprávy", a tvrdil, že paleta má „po přijetí zprávy". Oficiální lokalizace
  (`EVENT_WHENBROADCASTRECEIVED = po obdržení zprávy`) říká **pravý opak** — a tím se našla
  skutečná vada na **třech jiných místech webu**, kde se jako název bloku psalo „po přijetí
  zprávy". Opraveno; hlídá to nově `nazvy-bloku.mjs` vzorem zúženým na tvar s „po", aby
  nehlásil zdravý popis jevu („událostí je i přijetí zprávy"). Úniky odpovědí 39 → 38.
  Dál opraveno: „zelená vlaječka" → „zelená vlajka" (3 místa) · kočka a míč mohli stát na
  témž bodě a slít se i s popisky souřadnic · `role="img"` na ovládané scéně (odečítač by
  její obsah skryl) · kontrast návodu 3,3 : 1 pod normou 4,5 : 1 · hláška „Kliknutí na míč
  nastala" · **míč zaražený u okraje hlásil „spustil se 1 scénář", ačkoli se ve scéně nic
  nezměnilo** — což je k nerozeznání od „nespustil se žádný", tedy přesně to, co má stránka
  učit rozlišovat · počítadlo spuštěných scénářů se počítalo, ale žák ho nikdy neviděl.

- **2026-08-02 dopoledne (dlouhodobý audit: točíme se v kruhu — ale o patro výš)** — Učitel
  zadal audit za delší pracovní cyklus: *„zda se s chybami netočíme v kruhu a zda ještě
  držíme diamant a nezávislého kontrolora."* Běželi **tři nezávislí auditoři naráz**, každý
  s jinou otázkou (opakované vady × dodržování postupů × pravidla proti skutečnému kódu).
  **Odpověď: obsah se měřitelně lepší, ale jeho NÁSTROJE se točí v kruhu.** Hluché stránky
  36 → 0, uhodnutelnost kvízů 77 % → 38 %, kontrol simulací 244 → 318. Proti tomu vzorec
  „měřidlo ukazuje číslo, které nic neměří" je doložen **20 výskyty ve čtyřech dnech**,
  z toho 5 za jedinou noc. Vlastní retrospektiva to napsala už dřív, ale opatření z toho
  nikdy nevzniklo — protože pravidlo „ověř obousměrně" bylo jen TEXT.
  **Co se zavedlo:** (1) `testy/obousmerne.json` + kontrola v bráně — **nové měřidlo bez
  doloženého podvrhu a zdravého stavu shodí build**; dluh splacen hned, 6 ze 6 měřidel má
  důkaz (`testy/meridla-obousmerne.mjs`, 24 kontrol, ověřeno 7 mutacemi). Pěti měřidlům
  k tomu musel přibýt parametr dat nebo se logika vytáhla do funkce — **právě proto u nich
  důkaz nikdy nevznikl: nešel jim podvrhnout vstup.** (2) `testy/uniky.mjs` — duplicitní
  otázky a úniky odpovědí mezi otázkami bloku; obojí se opakovalo od 29. 7. a hledalo se
  ručně. Kotva: nad historickými kvízy z 31. 7. najde 4 duplicity, mezi nimi dvakrát doslova
  tutéž otázku. (3) Revize automatů dostala **doháněč a eskalaci** — hlídač zdraví běžel
  1× za 24 h bez náhrady, takže na uspaném Macu se den vynechal. (4) V rejstříku pravidel
  opraveno **5 falešných ✅**; nejzávažnější je, že *„správná odpověď je v datech vždy
  první"* nehlídá **nic** — `Kviz.astro` konvenci jen používá. Strojově to nejde (zkusil
  jsem to: 16 podezřelých = 16 falešných poplachů), ruční prověrka těch 16 ale potvrdila,
  že pořadí je v datech všude správné.
  **Druhý nález: diamant se ze samostatného režimu vytratil** — kola S1–S5 jsou všechna
  „chain", ačkoli se v nich dělaly dávky 5–9 nezávislých stránek. Nezávislý kontrolor drží
  pevně (36 doložených nasazení), **ale na vlastní měřidla nebyl nasazen ani jednou** —
  a přesně tam byly nejdražší vady.
  **Poctivá poznámka:** všechna tři měřidla, která jsem během auditu napsal, byla v první
  verzi vadná — detekce duplicit hlásila 13 nálezů (11 falešných, protože filtr slov
  ≥ 4 znaky zahazoval čísla, takže „při 0 °C" × „při 100 °C" vyšlo jako shoda 100 %),
  detekce úniků 264 místo 39. Odhalily to až podvrhy a mutace, ne pohled na výsledek.
  *Škola — dvě nové simulace informatiky (kola B1–B3):* **větvení** „když… tak… jinak…"
  (program projde vždy jen jednou větví, a je to vidět na skóre, ne jen v textu)
  a **opakování** „dokud / 10krát / stále" (podmínka se testuje PŘED tělem, takže při
  splnění na startu tělo neproběhne ani jednou). Názornost informatiky **37 → 35**
  podtémat bez obrázku či videa, testy simulací **318 → 371 kontrol**.
  **Dva nezávislí kontroloři našli 24 vad, 9 vážných — a obě simulace předtím prošly
  vlastními 83 kontrolami i buildem.** Nejzávažnější: **obě učily NEEXISTUJÍCÍ názvy
  bloků** („jdi 10 kroků" místo „dopředu o 10 kroků", „když na okraji, odraz se" místo
  „když narazíš na okraj, odraz se"). Systémová příčina: `nazvy-bloku.mjs` četlo jen
  výklady a kvízy z dat, **ne komponenty simulací** — brána byla zelená. Po rozšíření
  hned našlo další dvě vady ve STARŠÍCH nasazených simulacích („řekni" místo „bublina",
  3. osoba „dotýká se"). **A první verze toho rozšíření podvrh nenašla taky:** na zdrojový
  kód pouštěla `text()`, která maže vše mezi „<" a „>", takže v JS podmínce (`i < 80`)
  spolkla celé řádky — poznal to až otisk souboru před/po, ne hláška.
  Dál opraveno: šipky ANO/NE byly obráceně než výklad na téže stránce · dotyk barvy se
  počítal bodově, takže postava viditelně stála na pruhu a program tvrdil opak · pointa
  větvení byla vidět až po 33 kliknutích (nyní po 6) · „opakuj stále" hlásilo „nic se
  nemění", ačkoli postava ujela 200 px · zastavení pojistkou vypadalo jako regulérní konec
  smyčky · v kvízu byly **distraktory, které nejsou skutečné bloky** („zahraj zvuk",
  „stiskni klávesu mezerník") · v testech tautologie `? … : true` a porovnávání
  s vlastními literály místo se zdrojem pravdy scratch-l10n.

- **2026-07-31 v noci (video s nárokem Content ID, strop nahrávání, popisy)** — Učitel
  hlásil u videa „Longevelle sur Doubs 2025" hlášku o potenciálním omezení kvůli zvukové
  stopě. **Nárok nesouvisel s naší prací** — je to jeho původní video z 24. 7. 2025, kterého
  se automat nikdy nedotkl; hudba hraje v pozadí původního záznamu. Na jeho pokyn vznikla
  opravená verze: **jiný zvuk, úvodní mapa s km a cenou nafty (850 km ≈ 4 082 Kč) a titulek
  s názvem místa** → https://youtu.be/-l7f6ja0rR4 ; originál přepnut na soukromý, nesmazán.
  Kotva: **md5 obrazové stopy je shodné** s anonymizovanou verzí, měnil se opravdu jen zvuk.
  Past cestou: `-shortest` uřízlo 4 snímky na konci a titulkové PNG bez `-loop` svítilo
  jediný snímek — obojí se pozná jen měřením (počet snímků), ne pohledem.
  **Nejdůležitější nález dne:** na kanál dnes odešlo **5 videí, ačkoli limit byl „2"**.
  Každý ze dvou nahrávacích automatů počítal jen svá videa, takže se strop dal obejít pouhým
  střídáním; ruční nahrání se nepočítalo vůbec. Kvóta YouTube API je 10 000 jednotek/den
  a nahrání stojí 1 600 → max ~6 videí. Učitel navíc upozornil, že **druhý profil (radekmicek)
  nahrává na týž kanál až 3 videa denně** a čerpá tutéž kvótu. Nově je počítadlo společné
  napříč všemi zdroji a strop je **2 videa denně z tohoto Macu** (nejhůř 2 + 3 = 8 000
  jednotek). Ověřeno čtyřmi kontrolami s podvrženou evidencí.
  **Dále:** Le Bourg-d'Oisans automat nahrál ve 21:18, tedy hodinu předtím, než jsem ho
  odsunul z fronty — je na kanálu jako nezařazený a BEZ názvů přibalených míst, takže se
  nesmí zveřejnit, dokud nevznikne přestavěná verze (zapsáno v `KE-SCHVALENI.md`).
  Doplněny **francouzské popisy** Livet-et-Gavet a Col d'Ornon → všech 12 míst 2026 má
  všechny čtyři jazyky. Zjištěno k dodělání: popisky na mapě ROKU se ve Vogézách překrývají,
  protože `rozmistiPopisky()` používá jen mapa „Vše", ne `CestyRok.astro`.

- **2026-07-31 noc (dvě připomínky učitele k deníku + meteorologie F7)** — *Deník:*
  učitel hlásil dvě věci a obě měly jinou příčinu. **(1) Ve videu s více městy chyběly
  názvy míst.** VideoAutomat sléval média hostitele i „přibalených" míst do JEDNÉ pracovní
  složky, takže sestavovací skript viděl jediné město a vykreslil jen jeden titulek —
  název hostitele. Ramonchamp, Ornans, Le Lavandou, Riez ani Saint-Tropez tak ve videu
  nebyly pojmenované vůbec. Každé místo má nově vlastní složku a tím i svůj titulek;
  ověřeno obousměrně (6 kontrol, podvrh se slitou složkou musí dát jediný titulek).
  **(2) Mapa nedávala odkazy na videa.** Na kanálu bylo **9 videí roku 2026, ale web znal
  jen 5** — u Frangy, Vaulnaveys-le-Haut a Livet-et-Gavet odkaz chyběl. Příčina je
  systémová: roky 2025 a 2026 píše člověk, takže se jich `stare_cesty.py` ani
  `videa_k_mistum.py` nedotknou a nahrávač na YouTube o webu neví — nové video čekalo,
  až si ho někdo všimne. Nový `videa_na_web.py` odkazy doplní (jen PŘIDÁVÁ, ruční data
  nikdy nepřepisuje) a volá ho hodinový hlídač, který změnu i nasadí. Umí i místa
  **přibalená do cizího videa**, která se podle názvu videa nespárují nikdy.
  **Poučení:** oEmbed vrací 200 jen u VEŘEJNÝCH videí — u nezařazeného vrátí 401,
  ačkoli takové video jde přehrát i vložit. Kdyby se dostupnost posuzovala podle
  oEmbedu, pět správných videí 2026 by se na web nedostalo; rozhoduje proto až `/embed/`.
  *Škola:* podtéma **meteorologie F7** — délková nápověda **19 z 21 → 4 z 21**
  (největší rozdíl 4 znaky). Výklad doplněn o povětrnostní mapu (izobary, značky V a N,
  hustota izobar = síla větru), přepočet na hladinu moře, přístroje a trend tlaku —
  na sedm z toho se kvíz ptal, aniž to na stránce bylo vyloženo. Nezávislý kontrolor
  běžel dvakrát a našel 22 + 9 vad: „při poklesu pod 1 000 hPa hrozí vichřice" je
  nesmysl (běžná hodnota zataženého dne; Kyrill měl 962 hPa), „mlha a mrholení" je
  u tlakové výše v zimě TYPICKÉ, takže to nebyl chybný distraktor, a anemometr má
  tři misky, ne čtyři. Druhé kolo odhalilo hlavně **úniky, které zanesly opravy
  z prvního kola** — vysvětlení u vlhkoměru doslova odpovídalo na otázku o anemometru.

- **2026-07-31 večer II (převzetí práce po lokálním modelu, audit, kvízy)** — Učitel zadal
  dvě věci: *„kde to lokálním modelům vysloveně nejde, zkus to převzít ty"* a *„udělej
  audit, jestli neděláme pořád stejné chyby, které se opraví a zase to jede špatně."*
  *Audit (dva nezávislí auditoři):* opakuje se jediný vzorec — **„automat ohlásí úspěch,
  ale nic nevyrobil"**, doloženo **7×**. Z rejstříku pravidel běží 56 v kódu, ale **44 je
  jen text** — a právě ta textová se porušují opakovaně. Nejtvrdší nález: **překladová
  smyčka běžela 11 hodin a pokaždé vypsala „0 z 14 / 0 z 22 / 0 z 13"**; přitom držela
  sdílený zámek (23 h blokovala ceny stellplatzů) a v paměti 44,5 GB.
  *Převzetí práce:* těch **49 vět přeložil člověk → 156/156 míst má popis v cs, en, de i fr.**
  Pojistka: `POKUSU_NA_PREKLAD = 3` (pravidlo učitele „třikrát a dost" platí i pro automaty).
  *Video KRATOCHVÍLE — konečně opravdu přepracované.* Kromě smyčky (viz předchozí záznam)
  se ukázala druhá, hlubší příčina: **proces zabíjel systém signálem 9**. Anonymizace
  101s Full HD videa vyšplhala na 19–32 GB. Tři pokusy: sdílený zámek modelu (správný,
  nestačil) → uvolnění modelu z paměti (44 GB volných, přesto zabito) → **krájení videa
  na 30s kousky** (`DELKA_KOUSKU_S`, složky nesou délku v názvu, nic se nemaže). Teprve
  to prošlo: 4 kousky po ~5 min, paměť 6 GB místo 32. **Doloženo otiskem** `0705ceaf…`
  proti `3781f448…` — poprvé za celý den je soubor skutečně jiný. Filtr falešných poplachů
  uchránil **23 míst** před zbytečným rozmazáním.
  *Kvízy:* dorovnáno **17 bloků, uhodnutelnost 77 % → 60 %**. Přitom se ukázalo, že
  **vlastní měřidlo nadhodnocovalo**: počítalo i remízy, takže otázka „značka proudu:
  I / U / R" (všechny 1 znak) se vykazovala jako uhodnutelná — takových je 103. Skutečný
  stav nebyl 76 %, ale 65 %. V **devíti blocích** se navíc našly **duplicitní páry otázek**
  (3–4 z 10; bloky vznikly slepením dvou dávek) — nahrazeny novými. Nově **rohatka**:
  zhoršení kvality shodí build, zlepšení laťku samo utáhne.
  *Věcná chyba:* výklad i kvíz fyziky 9 tvrdily, že dálková vedení jsou **měděná**;
  ve skutečnosti jsou to hliníková lana s ocelovým jádrem (měď je 3× těžší a prohnula by
  stožáry). Opraveno i s vysvětlením proč.
  **Poučení dne:** hláška automatu není důkaz — kotvou je otisk souboru. A nadhodnocené
  měřidlo je stejně škodlivé jako podhodnocené: tiše posílá práci tam, kde vada není.

- **2026-07-31 večer (informatika 8 — LED displej; a proč deník vracel totéž video)** —
  *Škola:* nová simulace `LedDisplejSimulace` u podtématu `oziveni-a-led-displej`.
  Displej 5×5 na klikání, dva obrázky a program, který je střídá; pointy jsou dvě —
  ze **dvou stejných** obrázků animace nevznikne (program běží, displej stojí) a tentýž
  program v bloku **„po spuštění"** jednou doběhne a zůstane stát na druhém obrázku.
  **Nezávislý kontrolor našel 12 vad, 5 vážných.** Nejhorší byla moje: displej po
  zastavení skočil na obrázek, do kterého se KRESLÍ (6 → 16 svítících LED), tedy se
  obraz změnil přesně proti větě, kterou si žák právě přečetl; zastavení proto nově
  přepne kreslení na ten obrázek, který svítil. Dál: „po spuštění" po doběhnutí zůstávalo
  formálně „běžící" a tlačítko nabízelo zastavit skončený program; kopie obrázku nešla
  vzít zpět (přibylo „↩ vrátit zpět"); zvýrazněné byly dva řádky programu naráz; odsazení
  bloku CSS sbalilo. **Kvíz přepsán celý** — měl **4 duplicitní páry z 10 otázek**
  a správná odpověď byla nejdelší u 9 z 10 (nově 5 z 10, největší rozdíl 7 znaků).
  Výklad doplněn o `pauza 400 ms` a rozdíl obou bloků: kvíz se na to ptal, ale na stránce
  to vyloženo nebylo. Test `testy/simulace/led-displej.mjs` má **47 kontrol** a je ověřen
  obousměrně (podvrh se najde, zdravý stav mlčí).
  **Dvě poučení:** (1) kontrolor našel v mém testu tvrzení psané jako `a !== b || true`,
  které nemohlo nikdy selhat — a při přepisu jsem si tutéž tautologii omylem napsal
  podruhé; `|| true` v testech se vyplatí grepovat. (2) Přesné znění českého překladu
  MakeCode se mezi zdroji liší („po spuštění" × „při startu"), takže zdrojem pravdy je
  **názvosloví téže stránky** — jinak si výklad, kvíz a simulace protiřečí.
  *Deník:* učitel hlásil, že po včerejších opravách vypadá video 2021 stejně — pořád
  rozmazaná střecha, lavička, terasa i manželka. **Anonymizace za to nemohla: smyčka mu
  vracela nezměněný soubor.** `zamitnuto()` vynuluje nálezy, jenže kola > 1 vybírají
  kousky k přepracování **podle nálezů** → „přepracovávám **0 z 1** kousků" → kontrolor
  znovu odkýval verzi z 5:28 ráno, vyrobenou ještě před opravou v 16:25. Opraveno:
  ruční zamítnutí vrací smyčku na kolo 0 (celé video, výchozí práh — opravoval se kód,
  ne citlivost; přitvrzování prahu by tu bylo proti smyslu připomínky, protože rozmazává
  víc), a prázdný seznam kousků se už nikdy nebere jako „není co dělat".
  **Poučení: hláška automatu není důkaz** — kotvou je otisk souboru před během a po něm.

- **2026-07-31 odpoledne/večer (deník — anonymizace videí a duplicitní videa)** — Učitel
  hlásil tři věci a všechny měly jinou příčinu. **(1) Duplicitní videa k revizi:** místo se
  uzavíralo už 30 minut po posledním souboru, takže vznikla verze bez toho, co učitel dodal
  druhý den (Le Bourg v1 v 0:13, v2 v 1:16) → nově se čeká **7 dní od posledního média**,
  stejně jako čekárna sdíleného alba, a hostitel čeká i na svá přibalená místa. **(2) Videa
  vyrobená znovu, ačkoli už jsou na YouTube:** kontrola „hotovo" vyžadovala existenci
  výstupu na zapsané cestě — jenže učitel schválené video PŘESOUVÁ do `nasazeno/`, takže
  cesta zmizela a automat město považoval za nové (tak vznikl druhý Frangy, Geisingen
  i Schongau). Doloženo výpočtem: otisky médií seděly, média se nezměnila. **(3) Dvě složky
  pro jedno město:** export z Fotek dává do názvu neviditelné znaky U+2068/U+2069, takže
  „⁨Geisingen⁩, 8.7. 2026" vypadalo jako jiné město než `Geisingen_DE` (a bylo jeho
  podmnožinou — 25 z 27 souborů). Ruční vklad dostal vlastní hodinový automat; dosud se
  pouštěl ručně a dvakrát se na něj zapomnělo (naposledy tam leželo 10 nezpracovaných videí
  Le Lavandou, která nejsou v žádném videu).
  **Anonymizace starých videí — tři připomínky učitele k videu z 2021.** Rozmazávalo
  střechu a plot jako SPZ a hlavu NAMALOVANOU na zdi: filtr falešných poplachů v projektu
  byl, ale volal se **jen u fotek**. Nově se detekce slučují do STOP a vision se ptá jednou
  za stopu (30 snímků = 1 dotaz) — na 20 s videa to zahodilo **28 chybných rozmazání**
  a mezi nimi nebyl ani jeden skutečný člověk. Rozmazávalo taky manželku: reference byly
  jen z července 2026 a v roce 2021 vycházela 0,32 proti prahu 0,45. Po doplnění referencí
  vyšla 0,502, ale jen v jednom snímku z pěti — proto se **známost rozhoduje za CELOU
  stopu** (pojistka: kromě shody nad prahem musí být dost vysoko i medián, aby jeden výkyv
  neodkryl cizího člověka). Vznikl `reference_tvare_z_videi.py`, který tváře vytáhne
  ze starých videí **po letech a řetězí je od nejnovějšího roku zpět**; referencí je nově
  56 a 62 místo 13 a 31.
  **Tři poučení, která stála nejvíc:** (a) kontrola hlídala jen MÁLO rozmazání, nikdy
  ZBYTEČNÉ — proto protokol hlásil „0 nálezů", zatímco učitel při přehrání viděl tři chyby;
  (b) načítání referencí nečetlo podsložky, takže fotky, které učitel dal do `Starší/`,
  by tiše ležely ladem; (c) při druhém běhu vyšla shoda **1,015** — výřezy se poznaly samy
  se sebou, protože už byly mezi referencemi; měřidlo, které se tváří sebejistě, je
  nebezpečnější než žádné. Vlastní chyba k zapamatování: držet celý snímek pro každou stopu
  vyčerpalo paměť a systém proces zabil (kód 137) — do RAM patří jen výřez.

- **2026-07-31 večer (informatika 7 — proměnné)** — Druhá simulace informatiky v tomto
  dni: `PromenneSimulace` u podtématu `promenne`. Krabička `skóre` s hodnotou, vedle ní
  okénko na scéně přesně jak ho kreslí Scratch, a program „seber tři jablka" procházený
  krok za krokem s výpisem, co se stalo (*přepsáno: 3 → 0*, *přičteno +1: 2 → 3*).
  **Pointa je chyba, na které děti nejvíc padají:** program jde přepnout na verzi BEZ
  bloku `nastav skóre na 0`. Napoprvé vyjde taky 3 (krabička byla prázdná), podruhé 6,
  potřetí 9 — tím je vidět, proč hra po restartu „začíná s cizím skóre". Čísla zůstávají
  celá. Test `testy/simulace/promenne.mjs`: **26 kontrol** přes `node:vm` nad skutečným
  skriptem komponenty. Web má nově **73 zapojených interakcí a 74 komponent simulací**.
  Past potvrzena znovu: `curl` na živou stránku vrátil starou verzi z mezipaměti
  Cloudflare a slova z výkladu („krabička", „nastav skóre na 0") to zamaskovala —
  ověřovat je potřeba na řetězci, který je JEN v simulaci (`prom-svg`).

- **2026-07-31 odpoledne (informatika 7 — souřadnice scény Scratche)** — Druhá simulace
  informatiky: `SouradniceSimulace` u podtématu `souradnice-a-kresleni`. Scéna −240…240 ×
  −180…180, žák klikne, kam má kočka skočit, a nahoře se složí blok, který se **opravdu
  provedl**; posun po 10 tlačítky i šipkami, pero kreslící za postavou, cíle k trefení
  a program čtverce procházený krok za krokem (žádná animace — stav po *n* krocích je čistá
  funkce, takže jde celý ověřit výpočtem). Pointa je **záporné y = DOLŮ**, což děti pletou,
  protože z tabulek počítají řádky shora. Bez názornosti je informatika 7 nově 14 z 18.
  **Nezávislý kontrolor našel 12 vad, dvě vážné** — a obě byly o tom, že simulace mluví jinak
  než zbytek stránky: (1) používala doslovný překlad **„pero dolů"**, jenže české bloky
  Scratche 3 se jmenují **„pero zapni" / „pero vypni" / „smaž"** a přesně tak se na ně ptá
  kvíz o dva odstavce níž — žák by blok v paletě marně hledal; (2) přepínač pera byl psaný
  jako název bloku, ale choval se jako popis akce, takže **když pero kreslilo, stálo na
  tlačítku „pero nahoru"** — přesně opačná představa, a skutečný stav prozrazoval jen odstín
  pozadí. Dál opraveno: modrá pilulka ukazovala vždy „skoč na…", i po stisku „změň x o 10";
  ruční zásah nechával v seznamu příkazů svítit „nyní" u kroku, který neběžel; kliknout šlo
  i mimo scénu a ořez na kraji byl tichý; mřížka po 60 nepadala na krok 10 ani na stranu
  čtverce 100 (nově po 50 + čísla na osách); „dílky" místo „bodů"; (0, 0) se popisovalo jako
  „přímo na ose" místo středu scény. **Výklad doplněn o kreslení otáčením** (`opakuj 4×
  (dopředu 100 kroků, otoč se o 90°)`) a pravidlo **360° : počet stran** — dvě otázky kvízu
  to zkoušely, ale na stránce to vyloženo nebylo. Délková nápověda v tom bloku srovnána
  ze 7 z 10 na 3 skutečné (rozdíl < 10 znaků). Test `testy/simulace/souradnice.mjs` má
  **51 kontrol** přes `node:vm` nad skutečným skriptem komponenty — mimo jiné že kladné y je
  na obrazovce nahoře, měřítko obou os je stejné (čtverec vyjde jako čtverec), čtverec se
  uzavře, souřadnice zůstávají celá čísla, klik mimo scénu nic neudělá a program se
  nepřetvařuje, že běží. Nasazení ověřeno `curl` s časovým razítkem.
  **Poučení:** u simulace k cizímu programu je zdrojem pravdy jeho **český překlad**
  (scratch-l10n), ne doslovný převod anglického názvu — jinak si stránka protiřečí sama
  se sebou. A popisek přepínače má pojmenovávat AKCI, stav patří slovy do stavového řádku.

- **2026-07-31 odpoledne (větší změna: kontroly čtou data + start informatiky)** —
  Na zadání učitele provedena „ta jedna větší změna", kterou doporučil audit.
  Nový modul `testy/data.mjs` přeloží `kvizy.ts` a `temata.ts` esbuildem a **naimportuje
  je jako skutečné objekty**; brána `zkontroluj.mjs` i měření `testy/nazornost.mjs` nad
  tím běží. Rozdíl: brána nově vidí **2436 otázek ve 164 blocích** místo dřívějších 2084
  a kontrola „ke každé otázce patří tři odpovědi" konečně běží na všech (14 bloků shrnutí
  se skládá programově, takže je žádný vzor nad textem neviděl). Brána se pouští při
  každém `npm run build` (`prebuild`) — dosud jen z dobré vůle. Přibyla **kontrola 6c**:
  každé podtéma s kvízem musí být zastoupené v ročním opakování svého ročníku — přesně
  ta chyba, kvůli které se 144 otázek VEX IQ a her ve Scratchi nikdy neobjevilo v opakování.
  Vše ověřeno **obousměrně**: podvržená otázka se dvěma odpověďmi se najde, celek vypadlý
  ze souhrnu se najde (6 podtémat), zdravý stav nehlásí nic.
  **Začala informatika** — podle auditu největší díra na webu: 47 podtémat, 5 simulací
  a ani jedno podtéma s obrázkem či videem. První simulace `TabulkaVzorceSimulace`
  u podtématu `adresy-bunek-a-vzorce`: úloha přímo z výkladu (sloupec cen v € a kurz
  v B1), žák kliká na buňky a vidí jejich adresu, přepíná relativní × absolutní odkaz
  a kopíruje vzorec dolů. S `$B$1` vyjde 100/300/500/1000 Kč, s relativním `B1` se odkaz
  posune na předchozí VÝSLEDEK a čísla se lavinovitě rozjedou (100 → 1200 → 24 000 →
  960 000) — chyba je vidět na první pohled a všechna čísla zůstávají celá.
  Na přání učitele dostaly **papírky u elektrování tři fáze** (leží → zvedají se
  a napřimují → na určitou vzdálenost odskočí; po vybití spadnou zpět) a **paralelní
  zapojení kuličky proudu, které se v uzlu jen rozdělí** (stejné odpory → ob jednu;
  20 Ω × 60 Ω → tři do slabšího odporu a jedna do většího).
  **Poučení:** falešný poplach z vlastního měřidla je horší než chybějící kontrola —
  tiše určuje, na čem se pracuje. A `curl` na živý web může vrátit starou verzi
  z mezipaměti Cloudflare; k adrese proto přidávat časové razítko.

- **2026-07-31 poledne (audit strategie — měřidla lhala, ne architektura)** — Na zadání
  učitele („někdy příliš záplat nedá dobrý výsledek a je třeba jedna větší změna") proběhly
  **dva nezávislé audity s různými otázkami**. Závěr: architektura webu je v pořádku
  (výkon 72 kB HTML a 7 kB CSS po gzipu; univerzální šablona simulací by se nevyplatila,
  protože 74 % zdroje je scéna a fyzika), **ale všechny tři kontrolní skripty četly
  TypeScript regulárními výrazy místo dat a tiše lhaly**. `nazornost.mjs` hledal
  `druh: 'obrazek'`, který v datech není ani jednou (správně `'infografika'`), takže
  infografiky nikdy nepočítal; `zkontroluj.mjs` hlásí 2084 otázek, ve skutečnosti jich je
  **2426**. Odtud plyne jediná skutečně velká změna, která zbývá: **kontroly mají číst DATA
  přes esbuild import, ne text souboru.** Hned se opravilo: brána běží při každém buildu
  (dosud jen z dobré vůle), **roční opakování nově pokrývá všechna podtémata** (souhrnný
  kvíz bral otázky po kolech do stropu — u fyziky 8 bylo 35 podtémat a strop 30, takže
  vypadával celý celek zvuk; a v seznamu celků informatiky chyběly `hry-ve-scratchi`
  a `vex-iq`, takže **144 otázek z předchozí session se do opakování nedostalo vůbec**),
  a **tištěný test už nejde složit hádáním** — strategie „vyber nejdelší odpověď" měla
  úspěšnost 72 %, tedy známku 2 bez znalosti látky; test teď losuje přednostně z otázek
  bez délkové nápovědy (5,4 → 3,8 hádatelných ze 7). Data to neopravuje: ve 148 ze 164
  bloků není ani 7 čistých otázek. **Auditory nelze poslouchat slepě** — ze sedmi návrhů
  na recyklaci simulací byly tři špatné (`tuhnuti` ← ohřev a `kondenzace` ← vypařování by
  ukazovaly opačný směr děje, `vykon` ← práce výkon vůbec nepokrývá). Zbylé čtyři nasazeny
  jedním řádkem místo ~200: mezer názornosti ve fyzice 8 je **13 místo 22**.
  Na přání učitele dostaly **papírky u elektrování tři fáze** (leží → zvedají se
  a napřimují → na určitou vzdálenost odskočí a přilepí se; po vybití spadnou zpět)
  a **paralelní zapojení kuličky proudu, které se v uzlu jen rozdělí** — při stejných
  odporech ob jednu, při 20 Ω × 60 Ω tři do slabšího odporu a jedna do většího.
  Past: podíl 0,6/0,8 vyjde v plovoucí čárce 0,74999…, takže se z 24 kuliček jedna ztrácela.

- **2026-07-31 dopoledne (fyzika 8 — začátek názornosti, 5 podtémat z 22)** — Učitel zadal:
  *„Média k fyzice 8 (22 podtémat bez obrázku/videa), stránky jsou textové, chybí názornost."*
  Číslo **ověřeno měřením**: fyzika 8 má 37 podtémat a 22 z nich nemá ani obrázek, ani video,
  ani simulaci; příčina je, že `public/materialy/fyzika/` obsahuje **jen 6. a 7. ročník** —
  pro osmičku a devítku tam nikdy nic nevzniklo. Protože fotky a natočená videa dodává učitel,
  řeší se názornost tím, co jde vyrobit jako kód: **simulacemi**. Začalo se elektřinou
  (12 z těch 22 podtémat, nejabstraktnější učivo). Nasazeny **tři nové simulace pokrývající
  5 podtémat**: měřicí přístroje (ampérmetr do série, voltmetr paralelně **i oba chybné
  způsoby**), odpor vodiče (R = ρ·l/S s vlivem délky, průřezu, materiálu i teploty)
  a rezistor s proměnným odporem (týž jezdec jednou jako reostat, podruhé jako potenciometr).
  **Nezávislý kontrolor našel u první simulace 10 vad a dvě z nich byly vážné.** (1) Animace
  protiřečila vlastnímu textu: u zkratu text tvrdil „proud žárovku obejde", ale tečky dál
  obíhaly skrz žárovku. (2) V obvodu byla jediná součástka, takže napětí na žárovce se rovnalo
  napětí zdroje — **správné i chybné měření voltmetrem ukazovalo stejných 12 V** a celý smysl
  úlohy padl; opraveno na dvě součástky v sérii (6 V z 12 V). (3) Simulace používala Ohmův
  zákon, který se probírá až o dvě podtémata dál. Kontrolor se ale neposlouchá slepě: navrhoval
  zvýšit zkratový proud na 8× kvůli dramatičnosti, jenže při přemostění žárovky se proud přesně
  zdvojnásobí — ponecháno pravdivé 2 A a skutečné nebezpečí popsáno slovy.
  **Ověřování bez prohlížeče:** náhledový server blokovala jiná session, proto se simulace
  ověřují skriptem, který spustí **skutečný `<script>` komponenty** v Node (`node:vm`)
  s náhradním DOM a proměří spojitost pohybu po 16 ms i všechny kombinace ovládání
  (max skok 4,5 px z limitu 20; při zkratu 0 teček uvnitř žárovky; potenciometr dává celé
  volty ve všech 11 polohách). Nasazení ověřeno `curl` na všech 5 stránkách.
  **Druhé kolo kontroly** (simulace odporu a reostatu) přineslo **15 nálezů, 8 vážných** —
  a tentokrát prošly i mé vlastní testy, protože testovaly proti špatnému předpokladu.
  Nejzávažnější: **potenciometr počítal dělič naprázdno, ale na schématu na něm visela
  žárovka 10 Ω** → zobrazená napětí byla až dvojnásobná proti skutečnosti (5 V místo 2,5 V).
  Opraveno tím, že na výstupu je nově **voltmetr** — což je zároveň to, jak se potenciometr
  v praxi používá; dělič je tím počítán správně a čísla zůstala celá. Dál: schéma reostatu
  bylo nakreslené jako **rozpojený obvod** (chyběl vodič od spotřebiče ke kolejnici);
  **vypsaný vzorec nesouhlasil s vypsaným výsledkem**, jakmile se zapnul ohřev („0,5 · 4 / 1"
  a pod tím „2,04 Ω"); **jednotky ρ si odporovaly s výkladem na téže stránce** (Ω·m ×
  Ω·mm²/m — žák dosazující podle výkladu by byl 10⁶× mimo, proto do výkladu přibyla
  praktická jednotka i převod); simulace **předbíhala učivo** na dřívějším podtématu (vznikla
  zjednodušená verze bez ρ a bez vzorce); „rozžhavený drát" byl u hliníku nefyzikální
  (taje při 660 °C); zahřátý konstantan přestal dávat celá čísla; a rychlost elektronů byla
  oříznutá na mez, takže rozdíl mezi 2 Ω a 10 Ω nebyl vůbec vidět — přitom „větší odpor =
  menší proud" je celé sdělení té simulace. Vše opraveno, nasazeno a ověřeno na živém webu.
  **Poučení:** jas žárovky se řídí VÝKONEM (I²·R), ne proudem (pokles proudu na pětinu = 4 %
  jasu, ne 20 %); a když model něco zanedbává, schéma to zanedbání musí ospravedlnit.
  Testy simulací jsou nově v repu (`testy/`) i s návodem a rozšířené o všechny tyto nálezy.
  **Past do příště:** blok `elektrina` má v `temata.ts` o tabulátor jiné odsazení, takže
  naivní regex napočítá 22 podtémat místo 37.

- **2026-07-31 ráno (škola — díry v kvízech zalepené, chyba v kontrolní bráně)** —
  Samostatná práce podle priorit. **12 podtémat bez kvízu dostalo kvíz** (144 otázek):
  Pracovní činnosti měly do teď kvízů nula — Tinkercad (18) a SketchUp (16); VEX IQ
  4 podtémata 8. a 9. ročníku (46); hry ve Scratchi 6 podtémat (64). Zbylých 11 podtémat
  „bez kvízu" jsou shrnutí, kterým se kvíz skládá sám — díra to nebyla.
  **Nález v kontrolní bráně:** `zkontroluj.mjs` počítal otázky vzorem `^\s*text:`, takže
  **jednořádkové otázky vůbec nepočítal** — a jeho kontrola „ke každé otázce patří
  odpovědi" na většině otázek neplatila. Po opravě je vidět skutečný stav: web má
  **2086 kvízových otázek**, ne 358, jak se roky uvádělo. Oprava ověřena obousměrně
  (podvrh bez odpovědí se najde, definice typu se nepočítá).
  **Nezávislý kontrolor běžel dvakrát a podruhé se to vyplatilo:** napoprvé potvrdil
  fakta i pořadí odpovědí, ale našel, že **správná odpověď byla nejdelší u 73 % otázek**
  — daly se uhodnout bez znalosti látky (míchání pořadí to neřeší). Po vyrovnání na 37 %
  a odstranění úniků mezi otázkami kontrolor v druhém kole odhalil, že **opravy samy
  zanesly dva nové úniky** (vysvětlení prozrazovalo sousední otázku). Opraveno.
  Z kvízu vypuštěny dvě otázky opřené o tvrzení, která závisí na verzi SketchUpu
  (oddělovač rozměrů `100;50`, ukládání jen přes Save) — k ověření učitelem, viz
  SAMOSTATNY-REZIM.md.
  **Měření odhalilo, že tatáž vada je po celém webu** (65 % otázek) — kontrola je proto
  nově v bráně, neblokuje build a jmenuje 5 nejhorších bloků k postupnému dorovnání.
  Dva nejhorší (`skupenske-zmeny-vody-v-prirode`, `posilani-zprav` — obojí 100 %) hned
  srovnány. Při tom vyšla najevo **past: vysvětlení u otázky se ukáže JEN při špatné
  odpovědi**, takže podmínky učiva („pod rosným bodem") patří do odpovědi, ne do
  vysvětlení. Kontrolor u toho našel dvě starší vady: definice kyselých dešťů
  neodpovídala na položenou otázku a otázka na tmavý mrak byla kruhová (opakovala
  zadání místo příčiny). Výklad `posilani-zprav` doplněn o vlastní zprávy a rozdíl
  „vyšli zprávu" × „vyšli zprávu a čekej" — tři otázky zkoušely učivo, které na
  stránce nebylo.

- **2026-07-31 noc (dva audity, propojení videí, pečlivá anonymizace)** — Na přání učitele
  proběhly **dva nezávislé audity** (deník a škola) a podle nich dávka oprav. *Škola:*
  přetlak/podtlak v plicích byl u špatné fáze dýchání (výklad i kvíz), kalorimetr hlásil
  součin v joulech jako kJ, rozepnutý vypínač byl překrytý spojitým drátem, 6 duplicitních
  otázek informatiky nahrazeno novými. *Deník:* počítadlo sčítalo i dny doma mezi výjezdy
  (2024 hlásil 336 místo 72), překlad dat neuměl rozsahy (60+ dat zůstávalo česky i v en/fr,
  včetně přelomu roku), paleta měla 6 barev na 8 roků, popisky na společné mapě vedly
  u opakovaných míst vždy na poslední rok, pět popisů pocházelo z rozcestníků (Loket
  popisoval **anatomický loket**). Přidána přístupnost: `initial-scale`, `hreflang`,
  canonical, `lang` na přepínači, kontrast drobných textů 4,0 → 7,0 : 1.
  **Videa z YouTube propojena s místy na mapě** (`videa_k_mistum.py`) — kotvou je rok
  z playlistu a skutečný název z oEmbedu (uložený byl zkrácený). **Nový automat na pečlivou
  anonymizaci** starých videí po jednom se samoopravnou smyčkou (`pecliva_videa.py`,
  LaunchAgent) — další video se nezačne, dokud učitel neodklikne. Na připomínku učitele
  opraveno i to, že přepnutí jazyka zahazovalo zanoření mapy.
  **Dvě poučení, která stála nejvíc času:** (1) automat na popisy si soubor načte na začátku
  dávky a na konci zapíše celý — ruční zápis mezitím beze stopy zmizí; za jednu noc se tak
  ztratilo nejdřív 15 popisů a pak 5 oprav, než dostal `zapis_popisy.py` zámek.
  (2) Kontrola obrazu nesmí stát na samotném měření: citlivá kaskáda hlásila 21 „čitelných
  SPZ" na dobře anonymizovaném videu a u drobných tváří vycházela ostrost po rekompresi
  vyšší než v originále. Nálezy proto potvrzuje pohled na výřez. `zkontroluj.mjs` nově
  hlídá i data cest — a hned odhalil ztracenou opravu popisů.

- **2026-07-30 noc (deník — popis mají všechna místa; dva tiché nálezy)** — Při přebírání
  práce se ukázalo, že v datech cest **chybí 15 popisů, které tam předtím byly**: automat
  skládá `.ts` z `popisy-mist.json`, takže popis zapsaný rovnou do dat webu při dalším běhu
  zmizel. Zachráněny z gitu a zapsány natrvalo (13; zbylé 2 patří ručně psaným rokům, kam
  automat nesahá). Druhý nález: **francouzské překlady se na web nikdy nedostaly** —
  `blok_popisu()` uměl jen cs/en/de, hotových 10 překladů leželo ladem; jazyky jsou nově
  v `JAZYKY_POPISU`. Pak dopsáno **71 popisů z ověřených faktů** a tím má popis
  **všech 156 míst**. Nezávislý kontrolor prošel všech 71 bloků a našel 6 tvrzení bez
  opory ve zdroji (Chanovice „v podhůří Šumavy“ — ve zdroji není; Týn „kousek pod
  soutokem“ místo „východně od soutoku“; UNESCO u Sassnitz přiřazené i křídovému pobřeží,
  ač zdroj mluví jen o bukových pralesech; Diabla Góra „vysoká 157 m“ místo nadmořské
  výšky; Gouda dvě tvrzení navíc; Pleckensteiner Wald „neosídlené“) — vše opraveno před
  nasazením. Sběrač faktů umí nově **ručně určený článek** (`fakta_mist.py --zdroj SLUG
  JAZYK TITUL`, v datech značka `zdroj_rucne`): u velkých měst vznikla fotka na okraji
  a kotva podle GPS zamítala i správný článek, takže Praha, Brno a Gdaňsk zůstávaly bez
  faktů. **Poučení:** kotva ověří jméno a polohu, ale ne to, že článek popisuje MÍSTO —
  Olsztyn dostal fakta z článku o zaniklé správní jednotce („gromada“).

- **2026-07-30 večer (přesnost lokálních modelů — tři nezávislé audity)** — Učitel zadal
  audit cíle „méně tokenů, přesnější lokální modely, které se samy zlepšují". Tři nezávislí
  auditoři našli vážné věci. **(1) Kontrolorem byl model, který propadl u vlastní přejímací
  zkoušky** — `gemma4:26b` si u falešného tvrzení spočítala správný výsledek a přesto ho
  schválila; `graf_local.py` ji proto vyloučil, ale `popisy_mist.py` i `stellplatz_ceny.py`
  ji dál používaly, obojí zapisuje rovnou na web. **(2) Automat na ceny padal měsíc při
  každém buzení** na `Operation not permitted` (systémový python v launchd nesmí na soubory
  na Ploše) — a v rejstříku byl veden jako funkční. **(3) Startovní čtení session stálo
  69 500 tokenů**; přesunem historie do archivů (nic se nemazalo, ověřeno 129 = 10 + 119
  záznamů) kleslo na 29 300. **(4) Kotva u cen měla díry** — „Free WiFi" doložilo cenu
  „Gratuit", „250 reviews since 2015" doložilo „5 €". **(5) Anonymizace se zapisovala před
  měřením**, takže fotka mohla přijít o rozmazání a nález se smazal jako planý poplach.
  Vše opraveno a ověřeno testy s podvrhy. **Nové samokontroly:** `revize_automatu.py`
  (denní LaunchAgent — chyby v logu, systémový python v plistu, mlčící automat),
  `kontrola_obsazeni_roli.py` (běží před každou dávkou; kontrolorem smí být jen model se
  složenou zkouškou), `zamek_modelu.py` (na Macu jen jeden lokální model naráz).
  **Klíčové poučení:** zkouška musí měřit tu práci, kterou model dělá — původní byla
  početní, ale model posuzuje české věty; změřeno 9 modelů na skutečné úloze
  (`test_kontrolora.py`). A ukázalo se, že chyba nebyla v kontrolorovi, ale v **autorovi**:
  qwen3:30b-a3b si k faktům přidával hodnotící dovětky („tvoří hlavní atrakci"), které ve
  zdroji nejsou — zachytává je nově síto v kódu za nula tokenů. Rozhodnutí učitele:
  zbývajících 52 popisů napíše Claude jednorázově (konečná množina; ladit automat vyšlo
  dráž), lokálnímu automatu zůstávají překlady a nová místa. Nový `fakta_mist.py` sbírá
  ověřená fakta do `fakta-mist.json` — u každé věty je vidět, odkud pochází.

- **2026-07-30 odpoledne (deník — celá mapa dřívějších cest, hlídač, francouzština)** —
  Dokončeny body 5 a 6 učitelova zadání. **Na webu jsou roky 2019–2024**; učitel během
  práce doplnil fotky až po letošní cestu, takže přibyl i **rok 2024 (46 míst)** a rok
  2023 vyrostl na 45 míst. `stare_cesty.py --ts vse` zapíše všechny roky naráz a sám
  udržuje rejstřík `roky.ts`; výjezdy se číslují v rámci roku (dřív globálně — rok 2023
  začínal „výjezdem č. 36"). **Ochrana ručně psaných roků:** učitel se ptal, „jestli se
  tam něco nepere" — perlo by se, automat by přepsal ručně psané 2025 a 2026 i s
  galeriemi, stellplatzy a Bertíkovými reporty. Pojistka je dvojitá: seznam
  `RUCNE_PSANE_ROKY` **a** značka v hlavičce (automat přepíše jen soubor, který sám
  napsal), takže na žádný ruční rok se nedá zapomenout. **Popisy míst** vyrábí nový
  `popisy_mist.py` — kotvou je článek na Wikipedii, jehož *jméno i souřadnice* sedí na
  místo, autor qwen3:30b-a3b, nezávislý kontrolor gemma4:26b; hotovo 95 popisů ze 123
  míst (6 nemá zdroj), překlady se dopočítávají. **Hlídač nových fotek**
  (`hlidac_starych_fotek.py` + LaunchAgent `com.omega.stare-fotky-hlidac`, doháněč à 1 h)
  si nových fotek všimne sám a mapu dodělá bez vyzvání; commituje jen `src/data/cesty`,
  aby nesebral rozdělanou práci. **Francouzská verze deníku** (`/cesty/fr/`): celé
  rozhraní, 28 zemí, tvar data „6 juillet 2026" i „1er août 2022", vlajky u přepínače
  jazyků (na úzkém telefonu jen vlajka), 11 popisů 2025/2026 přeloženo ručně.
  Opraveny názvy míst z geokódování („gmina Kętrzyn" → „Kętrzyn").
  **Poučení:** keš jmen potřebuje verzi (jinak v ní zůstal „Brémský Přístav" i po
  opravě); lokální modely dávkovat **po modelech, ne po místech** (střídání qwen↔gemma
  = 6 přehození v RAM na místo, 4 min/místo → po přeskupení kontrola 95 popisů za
  vteřiny); qwen3 potřebuje `/no_think` v promptu; **kontrolor sám nestačí** — propustil
  anglické „přemýšlení" modelu jako popis, proto strojová pojistka před ním; Wikipedie
  vrací 429 s `Retry-After`.
- **2026-07-30 (deník — dřívější dovolené z fotek)** — Učitel nasypal do složky „Dřívější dovolené" 309 souborů a zadal: *„můžeš dělat mapu; jezdily jsme hodně na prodloužené víkendy — víkend jedna cesta z domova na místo a zpět — a vždy prázdniny jedna dlouhá cesta na měsíc a půl."* Vznikl automat `Omega/skripty/stare_cesty.py`: z EXIF (GPS + datum) poskládá **rok → cesty → místa** (pauza > 5 dní = nová cesta, shluk do 15 km = jedno místo, fotky do 25 km od domova se vynechají jako běžný život), jména míst z Nominatimu (kešované), x/y stejnou projekcí jako `trasa_uvod.py`. Výsledek: **288 fotek s GPS, 43 cest v letech 2019–2023** (nejdelší 6. 7. – 16. 8. 2022, 42 dní a 25 míst). Web umí **víc cest v jednom roce**: nové typy `Vyjezd` + `Mesto.vyjezd`, `CestyRok.astro` kreslí každý výjezd zvlášť jako domov → místa → domov (serverově i v klientském překreslování mapy), `popis` je teď volitelný (u starých míst se text doplňuje postupně). Nasazen pilotní **rok 2023** (8 výjezdů, 34 míst — ověřeno: 8 tras, víkendy po 3 bodech, prázdninová cesta 19 bodů; roky 2025/2026 zůstaly na jedné trase, bez chyb v konzoli). Přehled všech 43 cest je v `Cestovatelský deník/KE-SCHVALENI.md` k odkliknutí. ZBÝVÁ: rozcestník roku dělit podle cest (34 pinů na jedné mapě je nepřehledné), doplnit roky 2019–2022, popisy míst, GPS z 9 videí .MOV a 6 fotek bez EXIF.
- **2026-07-29 večer — tři připomínky učitele k deníku.** (1) **Mapa roku začíná doma:**
  data roku mají nový volitelný bod `domov` (jižní Čechy, x 344.9 / y 351.7 — spočteno
  stejnou projekcí jako úvodní mapy videí v `trasa_uvod.py`); na celkové mapě se kreslí
  modrý domeček, trasa z něj vychází a bod se započítá do výřezu (2025 i 2026).
  (2) **Mřížka „Videa z cesty" jen u celkové mapy** — při přiblížení na místo se skryje,
  u karty místa je nově náhled JEHO videa. (3) **Galerie:** kliknutí na náhled fotku
  zvětší přes celou obrazovku (šipky, klávesnice, Esc) místo otevírání nové karty.
  Při té práci se ukázalo, že web 2026 měl jen 8 z 11 míst cesty — **doplněny Frangy,
  Vaulnaveys-le-Haut a Livet-et-Gavet** (trojjazyčné popisy; zatím bez stellplatzů a videí).
  Fotky na web: kontrola anonymizace všech 154 fotek 2026 doběhla s 0 nálezy, nový automat
  `Omega/skripty/vyber_fotky_na_web.py` z podobných záběrů vybírá jeden (čas + podobnost
  popisu, vyhrává nejostřejší) → návrh do `KE-SCHVALENI.md`. Učitel výběr schválil,
  **na webu je 106 fotek** u 6 míst 2026. Přibyl i automat na OPRAVY nálezů anonymizace
  (`oprav_anonymizaci.py`) — z 5 nálezů 1 opraven, 3 uzavřeny jako planý poplach na
  základě MĚŘENÍ (rozdíl od originálu, podobnost tváře s referencemi a její velikost —
  vision model se tu plete, protože rozostřené pozadí mu splývá s anonymizací),
  1 zbyl učiteli. Doplněny údaje ze zážitků: Frangy (přespání u vinaře 10/6/4 €)
  a Chamrousse u Livet-et-Gavet (olympijský sjezd 1968 na Casserousse, stání
  Place des Niverolles), vlaječky v rozcestníku mapy.
- **2026-07-29 večer — automat cen dojel, nový režim „rovnou na web".** Na přání učitele
  („ceny stejně neznám, nasaď kontrolora a zadávej rovnou, ale napiš, že nejsou aktuální")
  má automat 2 pojistky: kotva (doslovné úryvky) + NEZÁVISLÝ kontrolor gemma4:26b (jiná
  rodina než autor qwen). Co projde, zapíše sám do `src/data/cesty/stellplatz-ceny.json`
  + commit + push; web ceny přimíchá při buildu a VŽDY u nich ukazuje trojjazyčné
  upozornění „jen orientační, veřejně dohledané, nemusí být aktuální". Dohledáno 9 míst
  (Karlstadt 2025 + 8× 2026 přes park4night API podle GPS měst; Ornans = areál
  Camping-Car Park) — **všech 9 prošlo kotvou i kontrolorem** (Landshut 10 €/24h,
  Schongau 8 €, Geisingen 14 €, francouzské aire vesměs „Gratuit", Ornans 21,32 €).
  Oba automaty (ceny i kontrola anonymizace) jedou nově jako DOHÁNĚČ: hodinové buzení
  + vlastní hlídání „už jsem dnes/tento měsíc běžel" — **Mac nemusí být vzhůru v konkrétní
  čas**. ČEKÁ NA ZPRACOVÁNÍ: 3 připomínky učitele k deníku (viz SAMOSTATNY-REZIM.md).
- **2026-07-29 — dva nové automaty (park4night potvrzen učitelem).** (1) **Okno „okolí
  obce/PSČ"**: `Omega/skripty/okoli.py` + skill `/okoli` — z názvu obce nebo PSČ vrátí
  zajímavá místa a stání pro obytné auto z OpenStreetMap s GPS a odkazy do mapy; funguje
  i z Telegramu („okolí 34401" → Chodský hrad, kempy, německý stellplatz — otestováno).
  (2) **Automat cen stellplatzů**: `stellplatz_ceny.py` + LaunchAgent měsíčně — stáhne
  stránky navštívených míst z park4night, qwen3:30b-a3b vytěží ceny s kotvou „doslovné
  úryvky + čísla musí být v textu" (parafráze zahazuje), změny jdou do KE-SCHVALENI.md.
  Ostrý test: Karlstadt → 10 €/noc, 0,50 €/kWh, 1 € voda = přesně ceny z účtenky 2025.
  (3) Web: typ Stellplatz rozšířen o cenaNoc/elektrina/voda/gps/rokCen + ikony 🅿️🔌🚰
  na kartách míst; Karlstadt převeden. ČEKÁ: odkazy dalších míst z aplikace učitele.
- **2026-07-29 — zbylých 8 laborek + data návštěv.** Rubrika laboratorních prací je
  kompletní: 12 tisknutelných pracovních listů (nově tloušťka listu papíru F6, graf
  chladnutí F6, rychlost chůze/běhu F7, těžiště kartonu F7, gumička a vztlak F7, míchání
  teplé a studené vody F8, elektromagnet z hřebíku F9, Sluneční soustava na hřišti F9).
  Nezávislý kontrolor: 2 drobné nálezy (popisek tabulky chladnutí + neměřitelná slaná
  voda) opraveny před nasazením; fyzika ověřena výpočty (Bolt 37,6 km/h, planety 1 au=10 m,
  Proxima ≈ 2 700 km v modelu). Od učitele doplněna data Le Thillot 12. 7. a Ornans 18. 7.
  (EN teď ukazuje „12 July 2026") + datové předpony názvů tří videí. Pravidla fotek do
  paměti (jen fotky, jedna z podobných, zatím 2026). Návrh automatu cen stellplatzů
  (park4night + qwen3:30b-a3b, kotva „číslo musí být v textu") a okna „okolí obce" přes
  Telegram: `Omega/dokumenty/NAVRH-stellplatz-a-okoli-2026-07-29.md`.
- **2026-07-29 — audit webu + velká dávka vylepšení (schváleno učitelem).** Dva nezávislí
  kontroloři prošli celý web → `Omega/dokumenty/AUDIT-WEBU-2026-07-29.md`. Nasazeno:
  (1) **deník** — opravy vad (překlad slovních dat a seznamu zemí do EN/DE vč. spojky,
  `zeme: 'Německo, Francie'`, rozestup pinů roků na rozcestníku ověřen výpočtem 18,00,
  klikací piny i bez JS + spojnice, atribuce CC BY-SA na všech mapách, satisfies
  v preklady.ts) a vylepšení map (mapa Vše: barvy pinů podle roku + legenda + chytré
  popisky rozmistiPopisky; tooltips všude; animované kreslení trasy s ohledem na
  prefers-reduced-motion; větší dotykové plochy; statistiky výprav; vlajky; mřížka
  náhledů videí; počítadlo dnů na cestě). (2) **škola** — vyhledávání na každé stránce
  (komponenta Hledani), šipky předchozí/další podtéma, odznaky 🎮✏️🎬🧪 na kartách,
  ukládání nejlepšího výsledku kvízu do localStorage + odznak „co už umím" na kartách,
  tiskové styly, viewport+meta description. (3) **laboratorní práce** — nová rubrika:
  `laborky.ts` + tisknutelný pracovní list `[podtema]/laborka/` (kyvadlo F6, hustota
  kamene F6, momenty na pravítku F7, výkon na schodech F8); kontrolor opravil kyv→kmit
  a zavěšení kyvadla. (4) **automat kontroly anonymizace** fotek deníku (SPZ/sochy/
  reklamy/tváře) — `kontrola_anonymizace.py`, LaunchAgent denně 8:20. Vše ověřeno
  curl na živém webu. ČEKÁ NA UČITELE: data návštěv Le Thillot a Ornans (v datech je
  jen „červenec 2026"), body 6–8 z rozhodovací tabulky, zbylých 8 návrhů laborek.
- **2026-07-29 — dokončení dorovnání kvízů (po E7).** Poslední 3 slabé bloky doplněny:
  kladka +1 (kladkostroj — 4 části lana = 4× menší síla), nakloněná rovina +2 (výpočet
  délky l = G·h:F = 400·3:100 = 12 m; vliv tření), události a vstupy +2 (přijetí zprávy
  jako událost; postava bez scénáře). Nezávislý kontrolor prověřil všech 12 otázek
  (5 nových + 7 z kola E7): 3 chyby opraveny — únik odpovědi přes vysvětlení starší
  otázky (nakloněná rovina: čísla změněna; události: z vysvětlení vypuštěno „přijetí
  zprávy"), duplicitní otázka odpočtu nahrazena podmínkou „dotýká se barvy?" (kulička
  a čára). Navíc „zelenou vlajku"→„vlaječku" dle scratch-l10n. Celkem 358 otázek.
  HERMES-POKRACUJ.md: nic rozdělaného.
- **2026-07-29 — experiment subagentů, kola E3–E7: dorovnání slabých kvízů.** Pět dávek
  4× worker-kviz paralelně: +78 otázek po kontrolách, deduplikace 2 bloků (−6), opravy
  dle kontrolora (názvy bloků Scratche dle scratch-l10n, úniky odpovědí, protiřečení).
  Zbývají 3 bloky → `HERMES-POKRACUJ.md` (události a vstupy, nakloněná rovina, kladka);
  kontrola otázek z E7 dodatečně. SMAZÁNO vložené video kanálu Petr Němec (rozhodnutí
  učitele — případné odkazy až po dohodě s majitelem; ověřeno oEmbedem všech 41 videí,
  jiná jeho videa na webu nejsou). Duplicity kvízů síly ponechány (rozhodnutí učitele).
- **2026-07-29 — experiment subagentů, kola E1+E2 (F7 jednoduché stroje).** E1: nové
  podtéma „Nakloněná rovina" (výklad, simulace F=G·h/l, 8 otázek kvízu, video) — kompletní
  a nasazené. E2: simulace „Účinky síly na těleso" (posuvný/otáčivý/deformační účinek,
  pružná × trvalá deformace) k existujícímu podtématu `pusobeni-teles-a-deformace`.
  Nezávislý kontrolor v E2 chytil závažný nález (levitace + věčná rotace) → pohybový
  model přepracován (překlopení přes roh, klouzání, těleso na podlaze). Metriky:
  `METRIKY-KOL.md` řádky E1/E2; protokol `~/Desktop/Omega/EXPERIMENT-SUBAGENTI.md`.
  ČEKÁ NA UČITELE: duplicity otázek mezi kvízy `pusobeni-teles-a-deformace` a
  `sily-kolem-nas/sila`.

- **2026-08-05 odpoledne — polemiky a videa ke gravitační síle (dvě nasazená).** Podkásty
  jsou nově **POLEMIKA dvou lidí** (upřesnění učitele: „diskuse, kde protiargumentují a tím
  vysvětlují jevy"), ne výklad s otázkami. Vyrobena a nasazena **dvě videa** k tématu
  `sila/gravitacni-sila` — hlasy ElevenLabs (free tarif → atribuce `elevenlabs.io` v názvu,
  nekomerční užití školní web splňuje), obraz z 13 scén. Videa jdou do **R2** pod `/media/`,
  ne do repa (9 MB/díl; libx264 CRF 26 srazil 63 MB na 9 MB). Nový řetěz skriptů v Omeze:
  `pokryti_kvizu.py` (brána — polemika musí obsahovat odpovědi na VŠECHNY kvízové otázky,
  dvoustupňově: slova zdarma, lokální model na nejisté), `snimky_podkastu.py` (schémata
  kreslená kódem přes Chrome headless — model neuhlídá délky šipek), `video_podkastu.py`
  (časování zarovnáním na přepis whisperem + režim `--bez-scenare` pro cizí nahrávky),
  `automat_podkastu.py` (celý řetěz od scénáře po R2). Skill **`podkast-video`**, návody
  `NAVOD-ELEVENLABS.md`, `NAVOD-NOTEBOOKLM-VIDEO.md`, `NAVOD-PRO-KOLEGU-VIDEA.md`.
  **Nálezy:** první polemika nepokrývá kvíz (chybí Newton, u přílivu nezaznělo, že ho
  způsobuje Měsíc); OpenAI střih napoprvé ztratil 27 % řeči a zachytila to až kotva;
  ceny ověřené — OpenAI ~6,20 Kč/díl (~700 Kč za 115), ElevenLabs ~2 200 Kč a free tarif
  jen 2 díly měsíčně. Čeká: videa k dalším tématům přes OpenAI, jeden pokus s NotebookLM,
  Chatterbox TTS odložen (nula stažení).

- **2026-08-06 — NotebookLM zamítnuto, OmniVoice (lokální, zdarma) otestováno na 8 dílech.**
  NotebookLM (přejmenováno na `notebook.google.com`) komentuje text jako moderátor, nehraje
  scénář doslova — 47 replik (~5 min) vyšlo jako 13:25 dlouhý rozbor. Nepoužitelné pro
  polemiky, verdikt v `NAVOD-NOTEBOOKLM-VIDEO.md`. Napsán nový skript
  `vyrob_omnivoice.py` (`k2-fsa/OmniVoice`, lokální, zdarma): rozpozná dva mluvčí obecně,
  "zamkne" hlas referenční replikou (jinak je hlas při každém volání jiný — past č. 1
  z `NAVOD-OMNIVOICE.md`), každou repliku ověří whisperem a při neshodě přegeneruje až 3×.
  Spuštěno na všech 8 dosavadních dialogů (314 replik): 90 % v pořádku napoprvé, 4 %
  opraveno automatem, 6 % k ruční kontrole — a ty NEJSOU náhodné, skoro všechny obsahují
  čísla slovy nebo hláskovaná písmena vzorců (díl bez čísel prošel 47/47 čistě, díl samá
  čísla 7/38 k ruční kontrole). Úvod do fyziky poslechnut a schválen učitelem, nasazen na
  web VEDLE OpenAI verze (obě live). Zbylých 7 dílů hotovo, ale nenasazeno — čeká na
  poslech. Hlas označen za "hodně dětský" + jedna chyba výslovnosti ("newton"→"Neuton"
  s přízvukem) — jiné hlasy zatím nevyzkoušeny.
  **ROZHODNUTÍ UČITELE: budoucí díly kratší** — tři krátké (třetinová délka) místo
  jednoho dlouhého na téma, každý na jedno vysvětlení. Mění frontu 16 zbývajících témat
  v `SAMOSTATNY-REZIM.md` (stejná témata, ale každé teď = tři scénáře, ne jeden).

_Starší záznamy (od začátku projektu) jsou v [PROGRESS-ARCHIV.md](PROGRESS-ARCHIV.md) — ten se automaticky nečte._

_Odděleno 30. 7. 2026: `PROGRESS.md` se čte na začátku KAŽDÉ session, a 129 záznamů
historie stálo ~33 000 tokenů při každém startu. Nic se nemaže — jen se sem přesunulo
vše starší než posledních 10 záznamů. Tenhle soubor se NEČTE automaticky; sáhni sem,
jen když hledáš, jak se něco dělalo dřív._

## 🗓️ Historie (starší záznamy, od nejnovějšího)
- **2026-07-29 — kolo 72: třetí dávka slabých kvízů (+16).** Motory/displej/zvuk (jízda na
  otáčky, zatáčení rozdílem rychlostí, čtverec s opakováním), senzory robota (ultrazvuk,
  dotyk, zastavení před zdí, jízda po čáře), oživení micro:bitu (MakeCode, simulátor,
  animace) a řazení/filtrování dat (celé řádky, filtr skrývá, hypotézy daty) — každý blok
  z 6 na 10 otázek. Celkem 417+ otázek.
- **2026-07-29 — kolo 71: druhá dávka slabých kvízů (+16).** Vlastní bloky s parametry
  (podprogram, parametr, rozklad problému), adresy buněk a vzorce (B3, rovnítko, přepočet,
  $B$1), sestavení robota (mozek-svaly-smysly, chyba je v programu, první jízda) a hardware
  a software (CPU, RAM×disk, OS, komprese ZIP×JPG) — každý blok z 6 na 10 otázek.
  Celkem 401+ otázek.
- **2026-07-29 — kolo 70: nejslabší kvízy webu dorovnány.** Audit všech 137 kvízových bloků:
  38 má <12 otázek (většina informatika). Čtyři nejslabší (po 5) dorovnány na 10: micro:bit
  rádio a piny, tlačítka/akcelerometr/zvuk, projekt robota (rozděl-testuj-lad), závěrečný
  projekt 9. třídy (návrh-realizace-předvedení). +20 otázek z výkladů, správná první
  + vysvětlení. Celkem 385+ otázek.
- **2026-07-29 — kolo 69: kvízy k novým simulacím.** Kontrola všech 17 stránek s novými
  simulacemi: kvízy mají všechny (7–21 otázek). Do 4 nejslabších doplněno 9 otázek na jevy,
  které simulace nově učí (ohodnocené grafy 7→10 — součet hran a „oklika levnější";
  plyny 11→13 — ionizace a vzdálenost jiskřiště; přenos 11→13 — vyšší U → menší I → ztráty
  I²; kapaliny 11→13 — pokovování na katodě, destilovaná voda). Správná odpověď vždy první
  + vysvětlení. Celkem 365+ otázek.
- **2026-07-29 — kolo 68: GrafCestaSimulace (nejkratší cesta).** Inf7 ohodnocené grafy:
  klikací hledání cesty A→F ve dvou mapách (6 vrcholů, 9 hran), živý součet kilometrů,
  v cíli porovnání s optimem (obě mapy 16 km — ověřeno hrubou silou všech 13 cest,
  jednoznačné); mapa 2 učí chyták „nejlevnější trasa vede oklikou přes víc vrcholů".
  Neplatné kroky hlásí chybu, klik na předchozí vrchol = krok zpět. TÍM JE HOTOVÝCH
  všech 12 kandidátů z auditu kola 54. Celkem 65 simulací.
- **2026-07-29 — kolo 67: PrenosSimulace (přenos elektrické energie).** F9: týž výkon
  8 800 kW při 400 V (bez trafa — proud 22 000 A, ztráty 2,42 GW, město potmě), 22 kV
  (400 A, ztráty 800 kW, dorazí 8 000 kW) a 400 kV (22 A, 2 420 W, dorazí prakticky vše):
  vysoké napětí = malý proud = malé ztráty, s trafy na obou koncích a trojfázovým vedením.
  Čistá funkce stavPrenosu — U·I=P i R·I² ověřeno výpočtem i DOM. Celkem 64 simulací.
- **2026-07-29 — kolo 66: SvacinaSimulace (energetická hodnota potravin).** F8: skládačka
  svačiny z 8 potravin (hodnoty na porci, záměrně násobky 200 kJ), součet, sloupec % denní
  potřeby školáka (10 000 kJ) a minuty chůze/běhu/plavání (20/40/50 kJ/min) — kontrola všech
  256 kombinací odhalila necelá % z plovoucí čárky (0,14×100), opraveno dělením 1 % = 100 kJ.
  Vše celé. Celkem 63 simulací.
- **2026-07-29 — kolo 65: checkpoint dělby rolí (à 10 kol).** Revize kol 56–64: jednotný
  vzor „čistá funkce → Node kontrola → čtení DOM → curl" má nulové AI náklady a za noc
  odhalil 2 skutečné chyby; vision nebyla potřeba; kvízy zůstávají u Clauda (fakticky
  citlivé). Beze změn pravidel; Hermes čeká na ranní rozhodnutí. Další checkpoint kolo 75.
- **2026-07-29 — kolo 64: PretlakSimulace (přetlak, podtlak, vakuum).** F7: válec s pístem
  (objem 1/2/4/8 dílků → tlak 400/200/100/50 kPa, p·V = konst, vše celé), manometr ukazuje
  rozdíl proti okolí (100 kPa = 1 bar), vývěva odčerpá vzduch na vakuum (−100 kPa, molekuly
  zmizí), hlášky s příklady z výkladu (míč a pneumatika 2,5 baru, brčko a přísavka, žárovka
  a vesmír). Čistá funkce stavPistu — 4 polohy + vývěva ověřeny výpočtem i DOM.
  Celkem 62 simulací.
- **2026-07-29 — kolo 63: DecibelySimulace (hlasitost zvuku).** F8: barevná stupnice
  0–130 dB po 10 se 14 zdroji (práh slyšitelnosti → šepot → rozhovor → kamion → koncert →
  start letadla), pásma z výkladu (nad 90 dB trvale ničí vláskové buňky, 130 dB práh
  bolesti s protržením bubínku), smajlík stavu ucha a násobek vjemu od šepotu (+10 dB ≈ 2×,
  celé mocniny dvou až 2048×). Čistá funkce stavHluku — 14 hladin ověřeno výpočtem i DOM.
  Celkem 61 simulací.
- **2026-07-29 — kolo 62: ReaktorSimulace (řízená řetězová reakce).** F9: řídicí pult —
  zasouvání regulačních tyčí (0–100 % po 25) mění násobek řetězové reakce (×2/×1,5/×1/
  ×0,5/×0), generace štěpení 8→16→32 … 8→0→0 vše celé, kritický stav při 50 %, tlačítka
  „havarijní STOP" a „nastav kritický", diagram tří generací neutronů + tyče a neutrony
  ve zóně. Čistá funkce stavReaktoru — 5 poloh ověřeno výpočtem i DOM. Celkem 60 simulací.
- **2026-07-29 — kolo 61: DuhaSimulace (rozklad světla).** F7: hranol rozloží bílý paprsek
  na vějíř 7 barev (klik na barvu/chip = jak moc se láme; červená nejméně, fialová nejvíce),
  obrácený hranol = Newtonův důkaz 1671 (složení zpět do bílé, pojem spektrum); režim duhy —
  hlavní oblouk s červenou nahoře, přepínatelná vedlejší duha (2 odrazy, opačné pořadí,
  slabší) + schéma kapky a zmínka J. M. Marciho. Čisté funkce poradiDuhy + lomBarvy ověřeny
  výpočtem i DOM. Celkem 59 simulací.
- **2026-07-29 — kolo 60: JiskraSimulace (vedení proudu v plynech).** F9: jiskřiště —
  napětí 0–18 kV (po 3) × mezera 1–5 mm, práh 3 kV/mm (celá kV), klikatá jiskra + výklad
  ionizace; režim bouřka — blesk do bleskosvodu (Franklin/Diviš, kanál 20–30 tisíc °C)
  a celočíselná úloha „hrom za X s ÷ 3 = km bouřky" (3–15 s → 1–5 km). Čisté funkce
  stavJiskry + stavBourky; 35 kombinací + 5 vzdáleností ověřeno výpočtem i DOM.
  Celkem 58 simulací.
- **2026-07-29 — kolo 59: VyparovaniSimulace (závod louží).** F8 vypařování: srovnávací
  louže (stín/bezvětří/hlubší/voda = 48 min) × nastavitelná se čtyřmi činiteli z výkladu
  (slunce, vítr, rozlití do plochy, líh) — každý zapnutý činitel půlí dobu schnutí
  (48/24/12/6/3 min, vše celé), stoupající šipky par podle rychlosti, hlášky o hořlavých
  parách a ochlazování vypařováním. Čistá funkce stavLouze — všech 16 kombinací ověřeno
  výpočtem i DOM. Celkem 57 simulací.
- **2026-07-29 — kolo 58: ElektromotorSimulace (síla na vodič + motor).** F9: režim „síla
  na vodič" (Flemingovo pravidlo — ⊙/⊗, prohození proudu i pólů sílu obrací, rovnoběžný
  vodič F=0, F = proud v dílcích) a režim „motor s komutátorem" (dvojice sil ⊙↑/⊗↓,
  komutátor každou půlotáčku obrací proud, bez proudu se netočí, krok ¼ otáčky, rychlost
  dle proudu). Čisté funkce stavSily + stavMotorku; 16 kombinací Fleminga a 3 proudy
  × 2 otáčky po 16 ms prošly; opraveno vracení pólů na N vlevo při vstupu do režimu motoru.
  Celkem 56 simulací.
- **2026-07-29 — kolo 57: AlternatorSimulace (vznik střídavého proudu).** F9: rotor-magnet
  se točí ve statoru s cívkou, voltmetr (±6 dílků), sinusovka jedné otáčky s běžícím bodem;
  krok ↻ po ¼ otáčky projde učebnicové polohy (0 / +max / 0 / −max s vysvětlením), rychlost
  1–3× zvyšuje amplitudu (2/4/6 dílků — „rychlejší změna pole = vyšší napětí"). Čistá funkce
  stavAlternatoru(t, rychlost); 3 rychlosti × 2 otáčky po 16 ms + DOM kontrola prošly.
  Celkem 55 simulací.
- **2026-07-29 — kolo 56: BarvySimulace (RGB × CMY).** F7 vnímání barev: skládání světel
  (tři reflektory na černé zdi, mix-blend screen — překryvy dělají žlutou/purpurovou/
  azurovou/bílou samy) × míchání barviv (inkousty na bílém papíře, multiply — víc inkoustů
  = tmavší). Posuvníky 0–100 % po 10, předvolby, pojmenování učebnicových barev, přepočet
  na 0–255. Čistá funkce stavBarev — 12 učebnicových kombinací ověřeno výpočtem i DOM.
  Celkem 54 simulací.
- **2026-07-29 — kolo 55: checkpoint dělby rolí Claude × lokální modely.** Revize kol 46–54:
  dělba správná (kód a ověřování Claude — vzor „čistá funkce + Node + čtení DOM" nulově
  drahý a odhaluje chyby; audit kandidátů obyčejným parserem). Vision nebyla potřeba;
  popisovač prezentací čeká na prezentace 7/8/9. Hermes je zpět — zapojení rozhodne učitel
  (audit z noci). Zápis v ~/ollama-log.md; další checkpoint kolo 65.
- **2026-07-29 — kolo 54: nový audit kandidátů na simulace.** Projito všech 96 podtémat bez
  interakce (fyzika, informatika, pracovní činnosti), vybráno 12 nových kandidátů se
  simulovatelným jevem (RGB barvy, alternátor, elektromotor, vypařování, jiskra v plynu,
  hranol/duha, jaderný reaktor, decibely, přetlak, energie potravin, přenos energie,
  ohodnocené grafy) — seznam s pořadím v SAMOSTATNY-REZIM.md. Kolo 55 = checkpoint dělby rolí.
- **2026-07-29 — kolo 53: ElektrolyzaSimulace (vedení proudu v kapalinách).** F9: kádinka
  s elektrodami a žárovkou, destilovaná voda (jen H₂O, nevede) × roztok soli (Na⁺→katoda,
  Cl⁻→anoda, svítí), napětí 0–12 V po 2 V → celé ampéry (I=U/2), druhý režim pokovování
  lžičky (Au⁺, zlatá vrstva roste s proudem). Čistá funkce stavElektrolyzy — 28 kombinací
  ověřeno výpočtem, 6 scénářů čtením DOM. Tím je HOTOVÝCH všech 12 kandidátů z auditu
  kola 38. Celkem 53 simulací.
- **2026-07-29 — kolo 52: OkoSimulace (vady oka a brýle).** F7 oko: řez okem, paprsky od
  předmětu, zdravé × krátkozraké (ohnisko před sítnicí, dálka rozmazaná) × dalekozraké
  (za sítnicí, čárkovaně; kniha rozmazaná), tlačítko 👓 nasadí rozptylku (−) / spojku (+)
  a vrátí obraz na sítnici; panel „co vidí" rozmazává přes feGaussianBlur úměrně skvrně
  na sítnici. Čistá funkce stavOka(vada, brýle) — všech 6 stavů ověřeno výpočtem i DOM.
  Celkem 52 simulací.
- **2026-07-29 — kolo 51: BarometrSimulace (tlak s výškou).** F7 atmosférický tlak: balón
  stoupá 0–8000 m (po 1000), Torricelliho rtuťový barometr klesá (760→267 mm), tlak v celých
  hPa dle standardní atmosféry (1013→356, ověřeno výpočtem proti ISA vzorci), sloupec „zbývá
  X % normálu", místa Ještěd→zóna smrti Everestu. Čistá funkce stavTlaku(h) na SVG; DOM
  ověřen v náhledu. Celkem 51 simulací.
- **2026-07-29 — kolo 50: DiodaSimulace (přechod PN a LED).** F9 polovodiče: zvětšená LED
  s oblastmi N/P a hradlovou vrstvou (šířka podle napětí), posuvník −5…+5 V po celých V,
  závěrný × propustný směr, práh 2 V, proud v celých mA (rezistor 200 Ω: 3→5, 4→10, 5→15 mA),
  V-A charakteristika s pohyblivým bodem, ⇄ otoč zdroj. Bez časové animace; čistá funkce
  stavDiody(U) na SVG (__stavDiody), všech 11 napětí ověřeno výpočtem i čtením DOM v náhledu.
  Celkem 50 simulací.
- **2026-07-29 — kolo 49: SpalovaciMotorSimulace (čtyřtaktní motor v řezu).** F8 spalovací
  motory: píst + ojnice + klikový hřídel + ventily v SVG řezu, klik na dobu 1–4 = póza
  s popisem, ▶ roztočí celý cyklus (2 otáčky kliky), přepínač zážehový (jiskra ze svíčky) ×
  vznětový (vstřik nafty, samovznícení). Pohyb = čistá funkce stavMotoru(t) na SVG
  (__stavMotoru); 501 vzorků po 16 ms prošlo (spojitost, meze ventilů, periodicita, pořadí
  dob, zapálení jen na začátku 3. doby); UX ověřeno v náhledu čtením DOM. Celkem 49 simulací.
- **2026-07-28 — kolo 48: RovinneZrcadloSimulace.** F7 optika rovinného zrcadla: osová
  souměrnost, zákon odrazu, zdánlivý obraz (poloprůhledný), stranové převrácení (praporek +
  zrcadlová AMBULANCE), kolmý a šikmý paprsek s prodlouženími do vrcholu obrazu. Ověřeno
  20 kombinacemi. Celkem 48 simulací; optická sada kompletní (rovinné + kulová zrcadla + čočky).
- **2026-07-28 — mapa deníku: trasa jízdy + konec dvojitých koleček (připomínka učitele).**
  V přiblížených pohledech se každé město kreslilo dvakrát (skutečná poloha + rozestoupený
  pin) a chyběla trasa. Nově: (1) body bez vlastního pinu se nekreslí (žádné kolečko navíc),
  (2) všechny pohledy mají SPOJNICI TRASY v pořadí návštěvy se šipkami směru jízdy —
  v pohledech jednotlivých měst vede přes samotná kolečka (skutečné polohy těsných měst
  skoro splývají), mezi shluky přes skutečné polohy. Ověřeno všech 7 pohledů roku 2026
  programově (uzly = piny, žádná dvojitá kolečka, pořadí = pořadí návštěvy) + screenshoty.
- **2026-07-28 — kolo 47: opravy animací dle učitele + pravidlo kontroly animací.** Skatepark
  se třením skutečně JEZDÍ (čistá funkce stavJizdy, jízda po Bézierově křivce — kontrola po
  16 ms odhalila a odstranila 56px skok u paty rampy), elektromagnet má VYPÍNAČ (zapnout →
  1 A). Nové pravidlo v PRAVIDLA.md: animace se před nasazením projíždí celé výpočtem
  (spojitost, krajní stavy, dojezd) + UX kontrola tam-i-zpět. Celkem 47 simulací.
- **2026-07-28 — kolo 46: popisovač prezentací postaven.** `Omega/skripty/popis_prezentace.py`
  (text z XML + ThinkingCap vision popisy → prezentace-popisy/*.md). Test na „Stavba látek":
  21 snímků, 12 kvalitních popisů. Prezentace se teď vytěžují za ~5 % původních tokenů.
- **2026-07-28 — kolo 45: checkpoint dělby rolí Claude × lokální modely.** Revize kol 34–44:
  dělba správná (kód a ověřování Claude, vision automaty lokálně). Nová příležitost:
  popisovač prezentací (ThinkingCap popíše obrázky ze .pptx do textu → ~95 % úspora tokenů
  při vytěžování) — stavba v kole 46. Zápis v ~/ollama-log.md; příští checkpoint kolo 55.
- **2026-07-28 — kolo 44: ElektromagnetSimulace + skater se umí rozjet.** Elektromagnet (F9):
  sponky = proud × závity × jádro, vypnutí = vše spadne, prohození pólů. Skatepark: na
  připomínku učitele přidáno tlačítko ▶ rozjeď skatera (jízda po celé rampě, ⏸ ukáže přesná
  čísla); při tom opravena poloha skatera na Bézierově křivce rampy. Celkem 47 simulací.
- **2026-07-28 — kolo 43: IndukceSimulace (Faradayův pokus).** F9 elektromagnetická indukce:
  magnet × cívka × voltmetr, 4 závislosti (rychlost, směr, síla magnetu, závity), výchylka
  v celých dílcích, „magnet stojí = nic se neindukuje". Celkem 46 simulací.
- **2026-07-28 — kolo 42: SkateparkSimulace (přeměny energie na U-rampě).** Jedna simulace
  na obou stránkách F8 (pohybová/polohová energie + zákon zachování): ideální rampa (Ep↔Ek,
  součet konstantní) × se třením (každý přejezd = energie 1 m výšky → teplo, zastavení).
  Vše celé J. Celkem 45 simulací. K tomu checkpoint revize dělby rolí Claude × lokální
  modely (kolo 45, pak à 10 kol) dle připomínky učitele — zapsáno do PRAVIDLA.md.
- **2026-07-28 — kolo 41: KalorimetrSimulace (smíchání teplé a studené vody).** F8
  tepelna-vymena-a-teplo: generátor úloh s celou výslednou teplotou a celými kJ tepla,
  bilance odevzdané=přijaté teplo, hlášky na typické chyby. Kvíz +2 otázky. Ověřeno 5000×
  v Node + 8 úlohami v náhledu. Celkem 44 simulací.
- **2026-07-28 — kolo 40: ArchimedesSimulace (pokus se siloměrem).** F7 archimeduv-zakon:
  3 fáze (vzduch → ponoř → odepni), 4 materiály × 3 kapaliny × objem 1–3 l, vše celé N;
  rozdíl na siloměru = vztlaková síla; plove / vznáší se / potápí se dle hustot. Nález kontrolora:
  převod cm³→m³ dával 10× větší síly — opraveno před nasazením. Celkem 43 simulací.
- **2026-07-28 — kolo 39: TreniSimulace (klidové × smykové tření).** F7 sily-kolem-nas/treci-sila:
  bedna, povrchy led/dřevo/beton, hystereze utržení (nad mez klidu) a zastavení (pod smykové),
  rovnoměrný pohyb při rovnosti sil; hodnoty dle vzorce výkladu Ft = Fn·f, vše celé N.
  Celkem 42 simulací.
- **2026-07-28 — kolo 38: zásoba témat na měsíc.** Audit temata.ts: 64 fyzikálních podtémat bez
  interakce → 12 vybraných kandidátů na simulace se zadáním (SAMOSTATNY-REZIM.md). První v řadě:
  F7 třecí síla, F7 Archimédův zákon, F8 kalorimetr, F8 přeměny energie.
- **2026-07-28 — kolo 37: kontrolní brána zkontroluj.mjs umí interakce2.** Hlídá i druhé simulace
  na stránce (užití × union typ × render v šabloně); aktuální stav prochází, negativní test
  chyby správně hlásí. Úkol z FRONTA-UKOLU odškrtnut.
- **2026-07-28 — kolo 36: PrumerSimulace (generátor průměrné teploty).** F6 teplota/teplota-a-jeji-mereni
  (druhá simulace na stránce): 5–7 denních teplot v grafu, léto/zima, dva kontrolované kroky
  (součet → dělení počtem), hlášky na typické chyby, průměr vždy celý. Ověřeno 5000 generováními
  v Node + 10 příklady v náhledu. Tím vyčerpány náměty z prezentací F6 „TEPLOTA" a „Stavba látek".
  Celkem 41 simulací.
- **2026-07-28 — kolo 35: KadinkySimulace (změř to rukou, nebo teploměrem?).** Pokus se třemi
  kádinkami (F6 teplota/teplota-a-jeji-mereni): levá ruka do 5 °C, pravá do 45 °C, pak obě
  do vlažné → tatáž voda, dva opačné pocity; zaškrtávací teploměr odhalí objektivních 25 °C.
  Motivace, proč fyzika měří měřidlem. Výklad + domácí pokus, kvíz +3 otázky (354).
  Celkem 40 simulací.
- **2026-07-28 — kolo 34: KolejniceSimulace (rozpálená kolejnice).** Teplotní roztažnost v praxi
  (F6 teplota/teplotni-roztaznost) — druhá simulace na téže stránce vedle teploměru (nové pole
  `interakce2` v temata.ts + řádek v šabloně): kolej při pohledu shora, posuvník −20…50 °C po 10 °C,
  režim „s dilatační spárou" (detail mezery: 12 → 3 mm v horku, 24 mm v mrazu) × „svařená bez spáry"
  (≥40 °C sluneční vybočení, ≤−10 °C prasklá kolej), výpočet Δl = 0,012 × 25 × Δt vždy v celých mm.
  Výklad doplněn o kompenzátor (U-smyčka potrubí), kvíz +4 otázky (celkem 351). Ověřeno v náhledu
  JS kontrolou hodnot (mezera, kóta, varování), konzole čistá. Celkem 39 simulací.
- **2026-07-28 — CELÁ ČÍSLA VE VÝPOČTECH, ROZBALOVACÍ MAPA DENÍKU, PRÁCE BEZ WIFI.**
  (1) **Výpočty pro děti musí vycházet celá** (přání učitele: „děti potřebují pochopit fyzikální zákony, ne se trápit počítáním"). Opraveny příklady ve výkladu i kvízech — cyklista 231 km/5,5 h (42) → **220 km/5,5 h = 40 km/h**, letadlo 585/1,3 (450) → **650/1,3 = 500 km/h** (obojí + zkouška po hlavě), vztlak 0,5/0,425 kg (0,75 N) → **500/400 g = 1 N** (i průměr měření vyjde 1 N), páka 100/50 g (0,5 N) → **200/100 g**, lokomotiva 900 MJ/4,5 km → **800 MJ/4 km**, tření f = 0,35 → **0,4 → 200 N**, Ohmův zákon 0,05 A → **0,1 A → 100 Ω**. Nově **průměrná teplota** ve F6 (letní týden 140 : 7 = 20 °C, zimní se zápornými 0 : 7 = 0 °C, kontrola „průměr leží mezi nejmenší a největší hodnotou") + 4 kvízové otázky. **10 simulací** přenastaveno tak, aby ani jedna poloha posuvníku nedávala ošklivé číslo (transformátor: všech 40 kombinací celé; rychlost 36–126 km/h po 18 → vždy celé m/s; hydraulika po 8 cm → poměry 1/4/9/16…). Čísla se píší bez koncových nul (`cz()`), záporná s typografickým minusem. **Nejzávažnější nález auditu:** `TlakSimulace` u výchozích 60 kg zaokrouhlením ukazovala nepravdu („2 kPa" místo 1 500 Pa) — opraveno na 80 kg. Audit i opravy dělali paralelní workeři, každý na jiných souborech; všechny výpočty ověřeny v Node. Nasazeno (`319cd8a`, `a21a852`).
  (2) **Mapa deníku — rozbalovací místo čtverečků** (`2b3a4df`). Stížnost učitele: čtverečky „N míst" byly nepřehledné a kliknutí otevřelo tutéž mapu se všemi místy pod ní. Nově má mapa úrovně: celková mapa se všemi piny, blízká místa obepne kroužek s počtem a **jménem největšího místa** (nové pole `obyvatele`, při shodě první navštívené); kliknutí přiblíží výřez, kde jsou **nejvýš 3 položky** a pod mapou jen ta místa; při větším počtu se shluk dělí dál (rok 2026: 8 míst → 7 úrovní). Drobečková navigace, rozestoupení překrývajících se pinů se spojnicí ke skutečné poloze, vše počítáno při buildu (`pripravPohledy` v `mapa.ts`), odkazy `#slug` fungují dál. Ověřeno proklikáním všech úrovní: žádný překryv kroužků ani popisků, žádný popisek mimo výřez.
  (3) **Chyby v učitelově prezentaci TEPLOTA.pptx** (zapsáno do `kontrola-podkladu-fyzika6.md`): příklad 1 má v tabulce hodnoty se součtem **154,8 → průměr 17,2 °C**, ale na snímku je „156 : 9 = 17" (i ze zaokrouhlených čísel vyjde 17,3, ne 17); příklad 4 vyjde 17,3667 → **17,4 °C**, ne 17,3. Ve „Stavbě látek" je nepřesná věta o sloučeninách (kyslík O₂ má také stejné molekuly, a je to prvek).
  (4) **Způsob práce přesunut do globálních pravidel** `~/.claude/CLAUDE.md` (platí v každé session, ne jen ve skillu): ZADÁNÍ = SCHVÁLENÍ, grafová práce (test falešné hrany, diamant, **nezávislý kontrolor s čerstvým kontextem**, kotvy, hlídání tichých selhání, rozpočet).
  (5) **Práce bez wifi** — `Omega/skripty/graf_local.py` + návod `OFFLINE-REZIM.md`: stejný diamant nad lokálními modely, kontrolor vždy z **jiné rodiny** než autor, `--loop` je samozlepšující smyčka (poučení do `OFFLINE-LEKCE.md`), `revize_grafu.py` je týdenní nezávislá revize zvenčí. Obsazení rolí vzniklo měřením (`test_modelu.py`): **gemma4 i qwen3-coder schválily tvrzení, které si samy vyvrátily ve zdůvodnění** → nesmí kontrolovat; rozhodnutí jednoho modelu je nestabilní → kontrola je hlasování; odpovědi se vynucují JSON schématem. Známý problém: Ollama běží pod druhým účtem, takže nevidí vision model ThinkingCap-Qwen3.6 a modely leží na disku dvakrát (83 + 75 GB).
- **2026-07-27 (kolo 33) — KVÍZY F6 DOROVNÁNY NA UČIVO NOVÝCH SIMULACÍ (+15 otázek, celkem 347).** Kola 30–32 přidala učivo, které kvízy netestovaly. Doplněno: **délka** 16→21 otázek (jak se určí hodnota nejmenšího dílku, že se dělí MEZERAMI a ne čárkami, proč musí být nula stupnice u začátku tělesa, 2,5 dm = 25 cm), **hmotnost** 13→18 (směr převodu — na menší jednotku číslo roste, 450 g = 45 dag, 1 g = 1000 mg, 7500 kg = 7,5 t, 0,5 t = 500 kg), **čas a jeho měření** 15→20 (dráha robota je OBVOD × obsah je plocha uvnitř, 20 dílků po 4 cm = 80 cm, rychlost 80 cm : 20 s = 4 cm/s, 2,5 min = 150 s, 0,5 dne = 12 h). Všech 12 výpočtů ověřeno v Node, správná odpověď vždy první, každá otázka má vysvětlení pro případ chyby. Build 408 stránek, nasazeno (`a8b6bbd`), ověřeno na živém webu. Uplatněno pravidlo z `METRIKY-KOL.md`: co přidá simulace, musí umět i kvíz.
- **2026-07-27 (kolo 32) — DRÁHA OZOBOTA (F6, mezipředmětová úloha).** `OzobotSimulace` u fyzika/6 cas/cas-a-jeho-mereni podle zadání praktické hodiny učitele („Dráha puzzle.pptx" ze složky 6/05 Čas — děti staví obdélníkovou dráhu ze stavebnicových dílků, měří rozměry dílku a čas průjezdu). Simulace: posuvníky rozměrů dráhy (dílky), délky dílku a naměřeného času; počítá **obvod = dráhu**, kterou robot ujede, **obsah = plochu uvnitř**, po které NEjede (přesně to místo, kde děti chybují), a rychlost v cm/s, m/s i km/h. Značky start / zrychlit / zatáčka / zpomalit / cíl podle zadání; robot objede obvod právě za nastavený čas. Ověřeno: 4 sady výpočtů přesně (6×4 dílků, dílek 4 cm, 30 s → 80 cm, 384 cm², 2,67 cm/s), dráha ověřena výpočtem v Node — rohy sedí, pohyb spojitý (max skok 0,9 px), za kolo ujede 920 px = přesně obvod. **Poznatek pro další simulace:** náhledová záložka běží jako `visibilityState: hidden`, takže `requestAnimationFrame` se nevolá vůbec (0×/s, ne jen zpomaleně) — animované prvky proto vždy umístit i staticky, jinak v náhledu nejsou vidět a nejde je ověřit. Build 408 stránek, nasazeno (`d322946`), ověřeno na živém webu. Celkem 38 simulací.
- **2026-07-27 (kolo 31) — TRENAŽÉR PŘEVODŮ JEDNOTEK (F6).** `PrevodySimulace` u fyzika/6 fyzikalni-veliciny/hmotnost podle prezentace „Fyzika opakování rok 6" (snímek 22 — pyramida ·1000 a :1000). Žebřík jednotek se zvýrazněnou cestou a koeficienty mezi schody; **4 veličiny** — délka (mm–km), hmotnost (mg–t včetně dag), objem (ml–hl) a schválně i **čas** (s, min, h, den), kde se nepřevádí po desítkách a děti chybují nejvíc. Žák píše výsledek, program pozná typickou chybu obráceného směru („jdeš na menší jednotku, číslo musí být větší — násob 1000"), na požádání ukáže postup, počítá skóre na první pokus. Zadání jsou školní čísla (2,5 dm; 7500 kg; 150 s): generátor volí hezký výsledek a dopočítá zadání, přijme jen dvojici s nejvýš 2 desetinnými místy v rozsahu 0,1–10000 — po první verzi vznikala zadání jako 0,004 l, 30000 s a 0,625 dne, což se zpřísněním odstranilo. Skloňuje se „den" (0,5 dne × 2 dny × 6 dnů). Ověřeno 320 příkladů ve všech čtyřech veličinách: 0 chyb ve vyhodnocení, 0 ošklivých čísel, 52–66 různých zadání na veličinu. Build 408 stránek, nasazeno (`8b0f102`), ověřeno na živém webu. Celkem 37 simulací.
- **2026-07-27 (kolo 30) — ČTENÍ STUPNICE MĚŘIDLA (F6).** `StupniceSimulace` u fyzika/6 fyzikalni-veliciny/delka podle prezentace učitele „Fyzika opakování rok 6" (snímek 16 měřidla a měřicí rozsah, snímek 19 odměrný válec: 250 − 200 = 50 ml, 10 dílků → 5 ml). Tři měřidla se scénami podle skutečnosti — pravítko s tužkou položenou od nuly, odměrný válec s vodou dole, teploměr s baňkou dole; 6 variant rozsahů a hustot stupnice, náhodný příklad tlačítkem „Další příklad". Úloha má **dva kroky**: nejdřív hodnota nejmenšího dílku (2. krok se odemkne teprve po správné odpovědi), pak odečet naměřené hodnoty; hlášky vysvětlují postup („dvě popsané čárky se liší o 50 ml a je mezi nimi 10 mezer → 50 : 10 = 5 ml") i správný zápis (l = 112 mm). Distraktory jsou typické žákovské chyby: dílek = rozestup popsaných čárek, přehlédnutá polovina dílků. Ověřeno v prohlížeči: všech 6 variant počítá správně, zamykání 2. kroku 12/12, hodnota nikdy nepadne přesně na popsanou čárku (jinak by nebylo co počítat), záporné teploty se píší s typografickým minusem, geometrie scén ověřena výpočtem. Build 408 stránek, nasazeno (`0f67642`), ověřeno na živém webu. Celkem 36 simulací.
- **2026-07-27 (kolo 29) — Interaktivní KULOVÁ ZRCADLA + konec odklikávání.** (1) **ZrcadloSimulace** (F7 zrcadla-a-cocky/kulova-zrcadla-dute-zrcadlo, dle prezentace „SVĚTELNÉ JEVY 7" snímky 39–51): duté i vypuklé zrcadlo, posuvníky vzdálenosti předmětu a **poloměru křivosti r** (názorně ukazuje f = r/2), tři význačné paprsky (rovnoběžný → do ohniska, vrcholový → souměrně podle osy, středový → sám po sobě), zobrazovací rovnice 1/f = 1/a + 1/a′ se zvětšením, čárkovaná prodloužení u zdánlivého obrazu, popis obrazu s praxí (zrcadlový dalekohled a solární elektrárna / stínítko / reflektor auta v ohnisku / kosmetické zrcátko / dopravní zrcadlo). Ověřeno výpočtem (a=30, r=20 → a′=15 cm, Z=0,5; a=15 → 30 cm, Z=2; a=6 → −15 cm zdánlivý 2,5×; vypuklé −7,5 cm, Z=0,25) i ze **skutečně vykresleného SVG** — paprsky procházejí bodem obrazu s odchylkou 0,01 px, středový přesně bodem S, rovnoběžný přesně ohniskem F. Build 408 stránek, nasazeno (`8e3a2fe`), ověřeno na živém webu. Celkem 35 simulací; prezentace „Světelné jevy 7" je tím vytěžená. **Poznatek:** snímkování náhledového panelu vracelo prázdné plátno (3 pokusy) → náhradní postup je vytáhnout souřadnice z SVG přes `javascript_tool` a ověřit je výpočtem, snímek stavu poslat učiteli jako SVG. (2) **KONEC ODKLIKÁVÁNÍ** — na výslovnou stížnost učitele, že schvaluje i to, co sám zadal: zavedeno pravidlo **ZADÁNÍ = SCHVÁLENÍ** (kroky plynoucí z požadavku se neschvalují znovu; paměť `pozadavek-je-schvaleni`) a **vrátný povolení** `Omega/skripty/povoleni_hook.py` — `PreToolUse` hook s obrácenou logikou: povolí vše kolem projektu a zeptá se JEN na černou listinu (`rm`, `mv`, `sudo`, instalace, `git push --force`, `git reset --hard`, vypnutí automatů, nahrávání na YouTube, e-maily, zápis do `worker.js`/`wrangler.*`/složky `Škola/` a mimo projekt); fail-safe: při chybě mlčí a rozhoduje settings.json. Otestováno 21 případy (0 chyb). Allowlist rozšířen na 107 pravidel — chyběly tvary `cd "/plná/cesta"` a cesty s hranatými závorkami `[podtema]`, na kterých se dotazy zasekávaly. Zapsáno do skillu `/wonderly` (souhrn schválených příkazů v 10 kategoriích), `Omega/PRAVIDLA.md`, souhrnu pro kolegu i pamětí.
- **2026-07-27 (večer) — DENÍK + ORGANIZACE: rejstřík pravidel, zvuk videí, mapy.** (1) **REJSTŘÍK PRAVIDEL `~/Desktop/Omega/PRAVIDLA.md`** — soupis všech domluvených pravidel se sloupcem, KDE je které vykonáváno (✅ v kódu × 📄 jen v textu). Vznikl po zjištění, že pravidlo „němé video → přidej hudbu" (zadání 26. 7.) bylo jen v poznámce a nikdy se nedostalo do programu. Nové pravidlo: každé domluvené pravidlo hned do rejstříku ([[feedback-rejstrik-pravidel]]). (2) **ZVUK**: `anonymizuj_stara_videa_po_castech.py` má `max_hlasitost()` + `pridej_hudbu_kdyz_ticho()` — ticho se pozná MĚŘENÍM (< −60 dB; naměřeno −91 dB), ne chybějící stopou; němé video se podloží skladbou z knihovny (25 kusů, zacyklená, fade in/out, `-c:v copy`). Zpětně opraveno 11 videí (9× 2021, 1× 2022, 1× 2026). (3) **MAPY VIDEA** (`trasa_uvod.py`): shluky míst ve ČTVERCÍCH („N míst", skloňováno) + šipky směru jízdy + samooprava km pruhu (`--pruh normal|dva-radky|kratky`, 3 pokusy) — ověřeno na skutečné i uměle zahuštěné trase (28 míst). (4) **MAPA DENÍKU NA WEBU** (`src/data/cesty/mapa.ts` + `CestyRok.astro`, commit `305a510`): automatické rozmisťování popisků s vyhýbáním, menší písmo pro dlouhé názvy, shluky ve čtvercích; ruční `popisekPosun` z 2026.ts odstraněny (5 kusů) — automatika je lepší. (5) **ORGANIZACE**: jedna hlavní session + workeři místo dalších oken (5 sessions archivováno), `additionalDirectories` v settings (repo webu byl mimo pracovní složku → ptalo se u každého souboru), záloha nenahraditelných dat 67 MB na Google Disk. ZBÝVÁ: referenční tváře 2021 (36 snímků připraveno v `reference-tvorba/kandidati-2021/`, čeká výběr + potvrzení učitelem), re-upload videí, která hudbu dostala až po nahrání na YouTube.
- **2026-07-27 (kolo 28) — PRVNÍ „DIAMOND": F6 difuze a Brownův pohyb + orchestrace.** Zavedena orchestrace práce grafy (podnět učitele — graph engineering): nový skill **`/sef`** (jedno místo pro zadávání, rozděluje na domény web-skola / denik / propustka / materialy) a **`/simulace`** (paralelní výroba obsahu — 4 workeři naráz, pak JEDEN build a JEDEN push). Společná fronta pro všechny session `~/Desktop/Omega/FRONTA-UKOLU.md`, metriky kol `METRIKY-KOL.md`. **Klíčové rozlišení:** paralelně smí běžet jen modely/subagenti (server, RAM Macu nulová, max 4); na Macu NIKDY paralelně ffmpeg/ollama/npm build — workeři to mají jako tvrdý zákaz v zadání, stejně jako zákaz zápisu do `temata.ts`/`kvizy.ts` (vrací text, zapisuje hlavní model). Rozšířen allowlist v `Škola/.claude/settings.json` (čtecí příkazy, `git checkout --`, `vm_stat`, `pmset`, zápis do repa webu a Omegy) — bez `ffmpeg`/`rm`/`mv`/obecného `python3`. **Výsledek prvního kola:** `DifuzeSimulace.astro` (interakce `difuze` u fyzika/6 latka-a-teleso/casticove-slozeni-latek) — kapka barvy padá na hladinu a sama se rozptýlí, posuvník teploty 0–100 °C mění rychlost (0 °C ≈ 113 s, 20 °C ≈ 25 s, 100 °C ≈ 4 s — ověřeno headless v Node), přepínač „Brownův pohyb" se zrnkem pylu a čárkovanou stopou; výklad doplněn o rozlišení difuze v kapalinách × plynech (v plynech rychlejší) + 4 nové kvízové otázky (2 ze 6 návrhů zahozeny jako duplicitní, 1 dopsána na nové učivo). Verify odhalil, že zrnko pylu sedimentovalo na dno → tíha zrnka zrušena (vznáší se, hýbe s ním jen nárazy částic). Build 408 stránek na první pokus, nasazeno (`d6ecbcb`). Poznatky pro další kola v `METRIKY-KOL.md`: workeři o sobě nevědí → merge musí dorovnat pokrytí nového učiva v kvízu; worker C má nejdřív vypsat existující otázky. Celkem 34 simulací.
- **2026-07-27 (večer) — DENÍK: stav před smazáním kontextu (mimo web).** VŠE BĚŽÍ SAMO: (1) anonymizace starých videí — **VŽDY JEN 1 PROCES**, dávky `--max-souboru 6` (proces po 6 kouscích čistě skončí → paměť se uvolní; dva souběžné procesy vyčerpaly RAM Macu, macOS hlásil „vyčerpal aplikační paměť" → zakázáno), ~43/73 hotovo; (2) nahrávání 2/den (9:15+21:15), nová videa přednost, stará do playlistů „Cesty <rok>"; před dávkou kontrola obsahu novým `prehledovka_videa.py` (4 snímky v 1 obrázku = čtvrtina tokenů — názvy starých videí často nesouhlasí s obsahem!); (3) po doanonymizování VŠECH se originály samy přepnou na private (schváleno). HOTOVO 26.–27. 7.: 5 nových videí 2026 zveřejněno (public, není pro děti); kapitoly Tour v popisu; mapa webu 2026 s Francií živě; cena nafty v km liště map (9,3 l/100 km × 2,1 €/l × 24,6 Kč/€); veselejší hudba automatu; pauza při baterii ≤ 30 % + notifikace (`baterie.py`); test „Švihov, Roupov, Hoštice u Volyně, Nová Pec" (rv_jOK1nwao) přejmenován dle skutečného obsahu; **analýza úspory tokenů** → nová pravidla Ollama v `~/CLAUDE.md` (delegovat do AUTOMATŮ, ne do konverzace) + zápis v `~/ollama-log.md`. ČEKÁ NA UŽIVATELE: 9 videí „k rozhodnutí" (`Cestovatelský deník/KE-SCHVALENI.md`). Nové pravidlo: na povel „smazat kontext" udělat úklid a rovnou dát `/clear`; velikost kontextu hlídat sám a včas nabídnout ([[feedback-smazat-kontext]]).
- **2026-07-27 (samostatný režim, kolo 27)** — **Interaktivní tlak p = F/S** (TlakSimulace.astro, interakce tlak-plocha u fyzika/7 tlak-v-kapalinach/tlak; dle snímků 19–27 prezentace Mechanické vlastnosti kapalin 7): postava na sněhu, posuvník hmotnosti 40–120 kg (F = m·10), volba sněžnice 0,4 m² / boty 0,04 m² / jehlové podpatky 4 cm²; tlak formátován Pa/kPa/MPa, postava se boří podle log(p), sníh se prohne. Hlášky: velká plocha = malý tlak (sněžnice, pásy bagru) … maličká plocha = obrovský tlak (jehla, nůž). Ověřeno výpočtem (60 kg: 1,5 kPa / 15 kPa / 1,5 MPa). Celkem 33 simulací.
- **2026-07-27 (samostatný režim, kolo 25)** — **Nové podtéma „Vesmír a jeho vznik, galaxie"** (fyzika/9 energie-a-vesmir/vesmir-a-galaxie; dle prezentace „9 vesmir_a_jeho_vznik.pptx"): velký třesk před 13,8 mld let v 6 krocích (částice → vodík a helium → plazma → neutrální atomy po 380 000 letech), galaxie (gravitace, černá díra ve středu, 4 tvary), Mléčná dráha (spirální s příčkou, ~100 000 světelných let, řádově stovky miliard hvězd), rudý posuv + Hubbleův zákon jako důkaz rozpínání; kvíz 10 otázek (správná první). K sluneční soustavě 2 odkazy na ČESKÁ videa z prezentace (Petr Němec, fyzika 9 ZŠ — jazyk ověřen přes oEmbed). Build 408 stránek (+2). Náhledový panel blokovala jiná session (port 8788) → ověřeno curl na živém webu.
- **2026-07-26 (samostatný režим, kolo 24)** — **Interaktivní „Koná se práce?"** (`PraceSimulace.astro`, interakce 'prace' u fyzika/8 mechanicka-prace-a-vykon/mechanicka-prace; dle prezentace „8 Mechanická práce.pptx"): 5 situací s tipováním ANO/NE (zvedání činky ✓, držení nehybně ✗ dráha 0, nesení tašky ✗ síla kolmo, kolo z kopce bez šlapání ✗ síla 0, tlačení bedny ✓) — přesná podmínka „nenulová síla po nenulové dráze, ne kolmo"; + kalkulačka W = F·s (50 N · 1 m = 50 J jako příklad z hodiny, přepočet na kJ). KONTROLA PODKLADU: snímek 3 tvrdí, že se práce nekoná „při rovnoměrném přímočarém pohybu" — zavádějící (vlastní snímek 6 počítá práci při rovnoměrném zvedání); zapsáno do kontrola-podkladu-fyzika8.md. Bimetal z TEPLOTA.pptx se NEpřidával — TeplomerSimulace už bimetalový teploměr má. Ověřeno vizuálně (tipování + kalkulačka 100·5=500 J). Celkem 32 simulací.
- **2026-07-26 (samostatný režим, kolo 23)** — **33 ŠKOLNÍCH VIDEÍ NA WEB.** Hromadné vložení neveřejných výukových videí z YouTube kanálu učitele (dle soupisu `Cestovatelský deník/stara-videa-roztrideni.md`, ID ověřena přes oEmbed) jako materiálů druhu 'youtube' do 26 podtémat: F7 síla/deformace/páka (2)/skládání/tření/tlak/Pascal (2)/hydrostatika (2)/vztlak/přetlak/meteorologie/zdroje světla (2)/rovinné zrcadlo/kulová zrcadla/čočka/fáze Měsíce; F8 zákon zachování energie, teplo; F9 reaktor/indukce (2+1)/alternátor/elektromotor/kapaliny/plyny/transformátor/přenos/bezpečnost (2)/polovodiče (2)/radioaktivita/jádro atomu (3). Vkládal skript `vloz_videa.js` (scratchpad; přeskakuje už existující ID — 4 zvuková videa byla vložena dřív). Ověřeno vizuálně (transformátor: 1 iframe youtube-nocookie; jadro-atomu: 3 iframy). NENALEZENO: video „Teplota a její měření – Fyzika 6" ze screenshotu učitele — v soupisu není; až uživatel pošle odkaz, doplní se k F6 ([]Čeká v SAMOSTATNY-REZIM). Duplicity (Páky (1), pas 2, kxTh…, KgxD…, 6lLH…) vynechány.
- **2026-07-26 (samostatný režim, kolo 22 + noční pokyny)** — **Příklady z hodiny na stránce Příklady na výpočet rychlosti** (F7): 9 úloh z prezentace učitele Pohyb.pptx (auto 50, lyžař 15, cyklisté 15, vlak 90 km/h; turista 6 km/120 min = 3 km/h; běžec 5 m/s; etapa 231 km/5,5 h = 42; turisté 3 km/36 min = 5; letadlo 585 km/1 h 18 min = 450 km/h) s rozklikávacím řešením `<details>` a upozorněním na častou chybu s převodem času. KONTROLA PODKLADU: snímek 28 má chybně 1950 km/h (dělení 0,3 místo 1,3 h) → `kontrola-podkladu-fyzika7.md`. Výsledky ověřeny výpočtem, stránka vizuálně v náhledu. NOVÉ TRVALÉ POKYNY UŽIVATELE (v paměti + skillu): kola hned za sebou bez pauz; podobné příkazy si schvalovat sám; čekající odkliky do sekce „Čeká na odkliknutí" v SAMOSTATNY-REZIM.md; průběžně aktualizovat skill a souhrn pro kolegu (aktualizován k 26. 7.).
- **2026-07-25 (samostatný režim, kolo 21)** — **Interaktivní izotopy a ionty** (`IzotopySimulace.astro`, interakce 'izotopy' u fyzika/9 jaderna-fyzika/jadro-atomu; dle prezentace „9 Atom, izotopy"): výběr H/He, tlačítka ±neutron (vzniká IZOTOP: protium/deuterium/tritium ~12 let; He-3/He-4/He-5 s rozpadem za ~10⁻²¹ s — údaj z prezentace ověřen) a ±elektron (vzniká KATION/ANION s hláškou „záporný iont nevznikne odtržením protonů"), správný fyzikální zápis A (nukleonové) nad Z (protonové) před značkou + náboj. Jádro s +, elektrony s − (jednotné s F6 atomem). Ověřeno vizuálně v náhledu (tritium-kation ³₁H⁺: 1p·2n·0e). Celkem 31 simulací.
- **2026-07-25 (samostatný režim, kolo 20)** — **Modely atomu + radon v domě** (obojí z prezentace učitele „9 Atom, izotopy.pptx"): (1) na fyzika/9 jaderna-fyzika/jadro-atomu nová sekce „🔬 Jak jsme objevovali atom" — Dalton (1803, kulička), Thomson (1897, rozinky v pudinku + objev elektronu), Rutherford (1911, zlatá fólie → jádro), Bohr (1913, dráhy/slupky), moderní kvantový model (orbitaly); letopočty doplněny a ověřeny (v prezentaci nebyly). (2) na radioaktivita sekce „🏠 Radon v domě": přírodní plyn z podloží, pozná se jen měřením, tři kroky ochrany (změřit / větrat / utěsnit) + česká specifika (žulové podloží). Obě stránky ověřeny vizuálně v lokálním náhledu.
- **2026-07-25 (2 opravy dle učitele)** — (1) **Fáze Měsíce: opravený tvar srpku/vypouklého** — prohozené sweep přepínače terminátoru v SVG (srpek vypadal jako vypouklý a naopak; čtvrtě/úplněk byly OK). Osvětlená plocha ověřena numericky (30°=6,7 %, 45°=14,6 %, 135°=85,3 % — přesně (1−cos φ)/2) a poprvé i VIZUÁLNĚ v prohlížeči (lokální náhled dist přes `.claude/launch.json` — živý web je v náhledovém prohlížeči blokován politikou). LEKCE: tvarové SVG dráhy ověřovat výpočtem plochy + vizuálně. (2) **Atom: elektron zaměnitelný s neutronem** — světle modrý elektron s bílým okrajem vypadal jako bílý neutron; nyní elektrony sytě modré se znaménkem −, protony s +, legenda s náboji. Ověřeno vizuálně v náhledu.
- **2026-07-25 (5) — DENÍK: automat starých videí SPUŠTĚN + nafta v mapě (mimo web).** (1) Anonymizace po 2min kouscích funguje (`anonymizuj_stara_videa_po_castech.py` — dělení ffmpeg -c copy, podprocesy s restarty, průběžné slepování s kontrolou délky; řeší zabíjení dlouhých videí systémem, kód 137). (2) **Test „Švihov" schválen** (rv_jOK1nwao, Cesty 2021; kvalita OK — přerozmazání akceptováno, vlastní SPZ nevadí) → `nahraj_stara_videa.py` zapojen do LaunchAgentu com.omega.youtube-nahravac (po novém nahrávači, 9:15+21:15, 3 pokusy po 3 min na výpadky sítě; sloty do 2/den, nová videa přednost, názvy bez „SD 480p"/interpunkce). (3) Ráno nahráno Tour video **s kapitolami v popisu** (swDAmX8BRJA) — kapitoly fungují. (4) **Mapa trasy: v km liště nově cena nafty v Kč** (9,3 l/100 km × 2,1 €/l × 24,6 Kč/€; písmo lišty se samo zmenšuje; vizuálně ověřeno, 901 km → 4 327 Kč). ZBÝVÁ: přepnutí originálů na private (bod 5, čeká na pokyn), 9 videí „k rozhodnutí".
- **2026-07-25 (samostatný režim, kolo 19)** — **Zatmění v simulaci Měsíce** (`MesicSimulace.astro`, F7 svetlo-a-jeho-sireni/stin-faze-mesice; námět dle složky prezentací učitele „20 Stín, fáze Měsíce, zatmění Měsíce, zatmění Slunce"): do pohledu shora přidán stínový kužel Země (míří od Slunce), při poloze Měsíce 172–188° nastává ZATMĚNÍ MĚSÍCE — kotouč v „pohledu ze Země" ztmavne dočervena, hláška vysvětluje stín Země, bezpečné pozorování okem i to, proč zatmění není každý úplněk (nakloněná dráha); u novu doplněno upozornění na ZATMĚNÍ SLUNCE (jen se speciálními brýlemi — dle výkladu). Geometrie ověřena (Měsíc při úplňku x=280 leží v kuželu 185–320). Celkem 30 simulací (rozšíření).
- **2026-07-25 (samostatný režim, kolo 18)** — **Historie měření času na stránce Čas** (fyzika/6 cas/cas-a-jeho-mereni): nová sekce „🕰️ Cesta dějinami hodin" podle prezentace učitele „,.pptx" — egyptské sluneční hodiny (~13. stol. př. n. l.), řecká klepsydra (5. stol. př. n. l.), přesýpací hodiny (14. století), Pražský orloj (1410), Huygensovy kyvadlové hodiny (1656), atomové hodiny (1949, USA) + GPS/UTC a nultý poledník v Greenwichi. KONTROLA PODKLADU: prezentace má Huygense „1655" (správně 1656) a Lorenzettiho obraz „1328" (freska 1338–39) — na webu správné hodnoty, chyby zapsány do `Omega/dokumenty/kontrola-podkladu-fyzika6.md`. Dotaz učitele k animaci atomu („vodík nemá neutron") — je to fyzikálně SPRÁVNĚ (¹H = jen proton), do simulace přidána vysvětlující hláška „to není chyba".
- **2026-07-25 (kolo 17, na přání učitele)** — **Obrázky k atomům** (fyzika/6 latka-a-teleso/atomy-a-molekuly, sekce materiálů): dvě infografiky vygenerované LOKÁLNĚ (mflux-generate-flux2, FLUX.2 Klein 4B, bez textu v obraze): (1) „Model atomu" — jádro z červených protonů a šedých neutronů, modré elektrony na zářících drahách; (2) „Molekuly vody H₂O" — tři molekuly, každá PŘESNĚ 1 kyslík + 2 vodíky. Vizuální kontrola: první verze molekul měla 3–4 vodíky → ZAMÍTNUTA, druhý pokus (prompt „Mickey Mouse ears, exactly two") správně. Pozn.: --negative-prompt není u FLUX.2 podporován. Zmenšeno PIL na 1024px jpg q82 (62+28 kB). Z prezentace „,.pptx" (Čas) vytipována historie hodin k doplnění stránky času (do fronty).
- **2026-07-25 (samostatný režim, kolo 16)** — **Interaktivní atom a molekuly** (`AtomMolekulySimulace.astro`, interakce 'atom-molekuly' u fyzika/6 latka-a-teleso/atomy-a-molekuly): inspirováno animací rotujícího atomu v prezentaci učitele „Stavba látek" (vlastní provedení — video z prezentace na web nedáno kvůli autorským právům). Režim „Atom zblízka": jádro (protony červeně, neutrony šedě) + elektrony obíhající po slupkách 2+zbytek, výběr H/He/C/O, hláška „počet protonů určuje prvek". Režim „Stavebnice molekul": H₂, O₂, H₂O, CO₂, NaCl s barevnými atomy a vazbami, rozlišení PRVEK (stejné atomy) × SLOUČENINA (různé) přesně dle výkladu. Celkem 30 simulací.
- **2026-07-25 (samostatný režim, kolo 15)** — **Interaktivní „Kolik bys vážil na jiných planetách?"** (`PlanetyVahaSimulace.astro`, interakce 'planety-vaha' u fyzika/6 sila/gravitacni-sila) — PRVNÍ VYLEPŠENÍ Z PREZENTACÍ UČITELE: tabulka ze „Síla 6.pptx" (snímek 11, člověk 75 kg → Měsíc 12,4 kg, Jupiter 177 kg, zdroj Nezkreslená věda) převedena na interakci — posuvník vlastní hmotnosti 30–120 kg, 10 sloupců (Merkur…Pluto) s údajem osobní váhy, klik na těleso = detail s poznámkou; důraz na klíčovou myšlenku: hmotnost se NEMĚNÍ, mění se gravitační síla (~10 N na 1 kg, Měsíc ~6× méně — v souladu s výkladem). Koeficienty ověřeny výpočtem proti učitelově tabulce (75 kg reprodukuje všech 10 hodnot). České 6. pády ručně. Celkem 29 simulací. Průzkum prezentací Š/6: text vytažen vlastním skriptem (markitdown na Macu není; pptx_text.py přes zipfile+regex — snímky „bez textu" = obrázky/animace, projít později thumbnailem).
- **2026-07-24 (samostatný režim, kolo 14)** — **Interaktivní odměrný válec** (`ValecSimulace.astro`, interakce 'valec' u fyzika/6 fyzikalni-veliciny/objem): válec 250 ml se stupnicí po 10 ml, posuvník nalité vody (V₁ 50–200 ml), tlačítka vhoď kámen (40 cm³) / matici (15) / kuličku (25) → hladina stoupne na V₂, výpočet V = V₂ − V₁ s připomínkou 1 ml = 1 cm³; červená čára hladiny s okem 👁️ (odečítat kolmo v úrovni hladiny — dle postupu ve výkladu). Mapování stupnice ověřeno výpočtem; max. hladina 240 ml nepřeteče. Celkem 28 simulací. **FRONTA KANDIDÁTŮ Z AUDITU VYČERPÁNA** — další kola: animace z prezentací učitele a média k Fyzice 6.
- **2026-07-24 (na přání učitele)** — **Křivka ohřevu: teplota varu podle nadmořské výšky.** `OhrevSimulace` dostala 4 tlačítka místa vaření: 🌊 u moře 100 °C, ⛰️ hory 3 000 m ~90 °C, 🏔️ Himálaj ~80 °C (hodnota z výkladu), 🍲 Papinův hrnec ~130 °C. Prodleva varu v grafu se posouvá (červená vodicí čára s popiskem), hlášky vysvětlují: nižší tlak → var dřív, ale jídlo se vaří pomaleji; přetlak → 130 °C a rychlejší vaření. Osa grafu rozšířena do 140 °C. Lomy křivky ověřeny výpočtem pro všechny 4 výšky.
- **2026-07-24 (samostatný režim, kolo 13)** — **Interaktivní elektrování těles** (`ElektrovaniSimulace.astro`, interakce 'elektrovani' u fyzika/6 elektrina-a-magnetismus/elektricke-vlastnosti-latek): tlačítko „🧦 Tři o hadřík" přenáší elektrony (pravítko −−−, hadřík +++ — nabijí se OBĚ tělesa, plast vždy záporně dle výkladu), posuvník vzdálenosti 1–10 cm, 5 papírků s různými prahy přiskakuje podle síly f ~ q/d² (i neutrální papírky!), ukazatel síly, tlačítko vybití. Hlášky vysvětlují neutrální × nabité těleso a hřeben s vlasy. Model ověřen výpočtem (nenabité nepřitahuje; 6× tření z 1 cm přitáhne všech 5). Celkem 27 simulací. Z fronty kandidátů zbývá jen F6 odměrný válec.
- **2026-07-24 (samostatný režim, kolo 12)** — **Interaktivní křivka ohřevu vody** (`OhrevSimulace.astro`, interakce 'ohrev' na OBOU stránkách fyzika/8 teplo-a-zmeny-skupenstvi/tani i /var): 1 kg ledu od −20 °C na vařiči se stálým příkonem (posuvník 50–300 kJ/s zrychleně). Kádinka žije: led taje a mizí, při varu bubliny v celém objemu, hladina klesá, pára ♨️. Graf teplota × dodané teplo kreslí prodlevy: TÁNÍ při 0 °C (332 kJ) a VAR při 100 °C (2 260 kJ — víc než všechny ostatní fáze dohromady; celkem 3 054 kJ). Hodnoty shodné s výkladem (l_t 332, l_v 2260 kJ/kg, c vody 4 200 J/(kg·°C)). Lomy křivky ověřeny výpočtem (42/374/794/3054 kJ). Celkem 26 simulací.
- **2026-07-24 (samostatný režim, kolo 11)** — **Interaktivní sluneční soustava** (`SoustavaSimulace.astro`, interakce 'soustava' u fyzika/9 energie-a-vesmir/slunecni-soustava): 8 planet obíhá Slunce se SKUTEČNÝMI poměry oběžných dob (Merkur 88 dní × Neptun 165 let; data ověřena Keplerovým T² = a³, poměr 0,97–1,03), posuvník rychlosti času (1 s = 2–200 dní) s počítadlem uplynulých dní/let, klik na planetu nebo tlačítko = údaje (kamenná/plynná, vzdálenost v AU, doba oběhu, zajímavost z výkladu), Saturn s prstencem, tmavé vesmírné pozadí. Vzdálenosti drah jsou logaritmicky stlačené — v úvodním textu přiznáno (jinak by se Neptun nevešel). Celkem 25 simulací. TÍM JE FRONTA F7–F9 KANDIDÁTŮ TÉMĚŘ VYČERPÁNA (zbývá tani/var křivka ohřevu a 2 nápady pro F6).
- **2026-07-24 (samostatný režim, kolo 10)** — **Interaktivní poločas rozpadu** (`RozpadSimulace.astro`, interakce 'rozpad' u fyzika/9 jaderna-fyzika/radioaktivita): mřížka 400 jader (oranžová → šedá), rozpad je NÁHODNÝ (p = 1 − 2^(−dt/T)), posuvník poločasu 1–6 s, Start/Pauza/Znovu; graf červené skutečné hodnoty × čárkovaná teoretická křivka N = N₀·(½)^(t/T), hlášky po každém poločasu (zbývá vs. teorie), konec po 4T (~6 %) se srovnáním uran 238 (18 mld let) × radon 222 (2 týdny). Model ověřen Monte Carlo testem (po 1T zbylo 204/400 ≈ polovina). Celkem 24 simulací.
- **2026-07-24 (samostatný režim, kolo 9)** — **Interaktivní transformátor** (`TransformatorSimulace.astro`, interakce 'transformator' u fyzika/9 indukce-a-stridavy-proud/transformator): primární (oranžová) a sekundární (zelená) cívka na společném ocelovém jádře, posuvníky závitů N₁ a N₂ 5–50 (závity se opravdu překreslují), střídavý zdroj U₁ = 230 V, živý výpočet U₂ = U₁·N₂/N₁ (23–1150 V), hlášky transformace nahoru (dálkový přenos) / dolů (nabíječka) + proud v opačném poměru (svařování × menší ztráty). Ověřeno výpočtem. Celkem 23 simulací.
- **2026-07-24 (samostatný režim, kolo 8)** — **Interaktivní sériové × paralelní zapojení** (`ZapojeniSimulace.astro`, interakce 'zapojeni' na OBOU stránkách fyzika/8 elektrina/zapojeni-spotrebicu-za-sebou i vedle-sebe): zdroj 12 V, dvě žárovky s jasem podle výkonu, posuvníky R₁ a R₂ (10–100 Ω). Sériově: společný proud, napětí se dělí podle odporů (U₁+U₂=12 V), R=R₁+R₂. Paralelně: společné napětí, proud se dělí v uzlu (I=I₁+I₂), 1/R=1/R₁+1/R₂. Tlačítko „💥 Přepal žárovku 1": v sérii zhasne celý obvod (vánoční řetěz), v paralelu druhá svítí dál (zásuvky). Ověřeno výpočtem (20+40 Ω: série I=0,2 A, U₁=4 V, U₂=8 V; paralel I₁=0,6, I₂=0,3, R=13,3 Ω). Celkem 22 simulací.
- **2026-07-24 (samostatný režim, kolo 7)** — **Interaktivní kmitání a vlnění** (`VlneniSimulace.astro`, interakce 'vlneni' u fyzika/8 zvuk/kmitani-a-vlneni): animovaná příčná vlna na laně (kopečky/údolí) a podélné vlnění (3 řady částic, zhuštění/zředění jako zvuk), posuvníky frekvence 0,5–3 Hz (ukazuje i T = 1/f) a amplitudy, pevná rychlost šíření v = 2 m/s → zelené měřítko λ = v/f se přepočítává (f↑ → λ↓). Červená částice s vodítkem ukazuje, že hmota jen kmitá na místě (kolmo/podél dle druhu). Ověřeno výpočtem (λ pro f=1 Hz: 2 m; fázový rozdíl bodů vzdálených λ přesně 2π). Celkem 21 simulací.
- **2026-07-24 (samostatný režim, kolo 6)** — **Interaktivní hydrostatický tlak** (`HydrostatikaSimulace.astro`, interakce 'hydrostatika' u fyzika/7 tlak-v-kapalinach/hydrostaticky-tlak): potápěč na posuvníku hloubky 0–30 m, tlakoměr p = h·ρ·g (0–300 kPa), žluté šipky tlaku ZE VŠECH STRAN rostoucí s hloubkou, přepočet na atmosféry a poznámka o pomalém vynořování. Scéna realisticky: nebe nahoře, voda dole, dno. Ověřeno výpočtem (10 m → 100 000 Pa jako v příkladu výkladu; stupnice hloubky přesně sedí na polohu potápěče). Celkem 20 simulací.
- **2026-07-24 (4) — DENÍK: stará videa stažena + kapitoly Tour + oprava duplicit (mimo web).** (1) **Staženo 64/65 starých cest** (5,2 GB, až 1080p) do `stara-videa/original/<rok>/`; nutný upgrade yt-dlp 2026.3.3→2026.7.4 (jinak jen 360p, SABR omezení YouTube); Rothenburg čeká (uživatel zveřejnil, YouTube dočasně chce ověření robota — auto-pokus za 1 h). (2) **Anonymizace starých videí BĚŽÍ** (`nohup nice -15`, log `skripty/data/stara-videa-anonymizace.log`, `--krok 2`) — PŘEDNOST MAJÍ NOVÁ VIDEA (rozhodnutí uživatele; platí i pro nahrávání). (3) **Duplicitní německá videa vyřešena**: ruční video Německo nebylo v evidenci automatu → automat vyrobil sólo Landshut/Schongau/Geisingen znovu; evidence opravena (ukazují na nasazené video), duplicity přesunuty do `video-vystup/_duplicity-Nemecko/` (rozhodnutí smazat/nechat na uživateli). (4) **Kapitoly YouTube** — nový `vyrob_kapitoly.py` (vision model třídí záběry: mapa/okolí/karavana/závod; časy dle logiky sestavit_video2, odchylka <1 s; kontrolní snímky vizuálně ověřeny) + `nahraj_na_youtube.py` vkládá `<video>.kapitoly.txt` do popisu; hotové pro dlouhé video Saint-Maurice (14 min, 13 kapitol), soubor přesunut k videu do nasazeno/. (5) **Rozhodnutí uživatele (trvalá)**: limit nahrávání ZŮSTÁVÁ 2/den (školní automat v druhém profilu jede 3/den); stará videa do playlistů „Cesty <rok>"; školní neveřejná videa na kanálu se nechávají beze změny. Ranní fronta: `Cestovatelský deník/KE-SCHVALENI.md`.
- **2026-07-24 (samostatný režim, kolo 5 + opravy + předání)** — (1) **Interaktivní fáze Měsíce** (`MesicSimulace.astro`, interakce 'mesic' u fyzika/7 svetlo-a-jeho-sireni/stin-faze-mesice): pohled shora (Slunce zleva, Měsíc obíhá, osvětlená polovina vždy ke Slunci) + „pohled ze Země" s tvarem fáze, % osvětlení a názvy fází; česká pomůcka Dorůstá jako D / Couvá jako C. Ověřeno výpočtem (k=(1−cos φ)/2; nov 0 %, čtvrť 50 %, úplněk 100 %). Celkem 19 simulací. (2) **Oprava LomSimulace dle učitele**: hustší prostředí (voda/sklo) vždy DOLE — paprsek z vody jde zdola k hladině jako od potápěče; nové TRVALÉ pravidlo „simulace musí být pro děti logické" (paměť simulace-realisticke + skill wonderly). (3) **Allowlist** opakovaných příkazů v `Škola/.claude/settings.json` (24 pravidel — build, git, node, curl, čtecí nástroje) → méně dotazů na povolení. (4) **Souhrn pro kolegu** `Omega/dokumenty/PREDANI-SOUHRN-stav-projektu-2026-07-24.md` (co je hotové, kde co je, zavedená pravidla, kde navázat) + report předschválených akcí zapsán do skillu wonderly.
- **2026-07-24 (samostatný režim, kolo 4)** — **Interaktivní lom světla** (`LomSimulace.astro`, interakce 'lom' u fyzika/7 svetlo-a-jeho-sireni/lom-svetla): 4 dvojice prostředí (vzduch→voda, vzduch→sklo, voda→vzduch, sklo→vzduch), posuvník úhlu dopadu, Snellův zákon n₁·sin α = n₂·sin β; lom KE kolmici (do hustšího) i OD kolmice (do řidšího), slabý částečný odraz, za mezním úhlem ÚPLNÝ ODRAZ (voda→vzduch 48,8°, sklo→vzduch 41,8°) s vysvětlením optických vláken. Fyzika ověřena výpočtem (vzduch→voda 40°→28,9°). Celkem 18 simulací.
- **2026-07-24 (samostatný režim, kolo 3)** — **Interaktivní zákon odrazu** (`OdrazSimulace.astro`, interakce 'odraz' u fyzika/7 svetlo-a-jeho-sireni/odraz-svetla): posuvník úhlu dopadu 0–80° měřeného OD KOLMICE (přesně jak zdůrazňuje výklad), modrý oblouk α a červený α', kolmý dopad = odraz zpět; druhý režim „nerovný povrch" ukazuje rozptyl — 3 rovnoběžné paprsky se odrážejí podle zákona odrazu od různě natočených místních kolmic. Matematika ověřena vektorovým výpočtem (α=40° → α'=40,0°; náklony hrbolků voleny tak, aby odrazy mířily vzhůru i při α=80°). Celkem 17 simulací.
- **2026-07-23 (samostatný režim, kolo 2)** — **Interaktivní rychlost–dráha–čas** (`RychlostSimulace.astro`, interakce 'rychlost' u fyzika/7 pohyb-a-rychlost/rychlost-draha-cas): auto na 500m silnici, posuvník rychlosti 20–130 km/h (jde měnit i ZA jízdy), zrychlený čas ×5, živý graf s–t (stálá rychlost = přímka/rovnoměrný pohyb, změna = lomená čára/nerovnoměrný), v cíli výpočet průměrné rychlosti + převod km/h ↔ m/s (÷3,6). Ověřeno výpočtem (90 km/h → 500 m za 20 s; 20 km/h dojede přesně v 90 s). Celkem 16 simulací.
- **2026-07-23 (3) — DENÍK: stará videa YouTube roztříděna (mimo web).** Skript `Omega/skripty/roztrid_stara_videa.py` rozdělil inventuru 143 videí kanálu: **65 cesty** (k anonymizaci a novému nahrání do playlistů „Cesty <rok>"), **57 školní fyzika** (nechat), **17 k rozhodnutí** (osobní/nejasná: Berbus ×4, Bertík, narozeniny, „Můj film"…), 2 písničky, 2 nová videa automatu. Checklist pro uživatele: `/Users/Shared/Cestovatelský deník/stara-videa-roztrideni.md` — ČEKÁ NA KONTROLU, hlavně sekce „K ROZHODNUTÍ". Past: názvy z YouTube API jsou v NFD → nutná NFC normalizace před porovnáváním. yt-dlp i ffmpeg ověřeny (nainstalované). Další krok po schválení: stažení yt-dlp v max. kvalitě → anonymizace (jen cizí tváře/SPZ, efekty+hudbu zachovat, bez zvuku → přidat hudbu) → nahrání, originály přepnout na soukromé.
- **2026-07-23 (samostatný režim, kolo 1)** — **Interaktivní Ohmův zákon** (`OhmSimulace.astro`, interakce 'ohm' u fyzika/8 elektrina/ohmuv-zakon): posuvníky napětí U (0–24 V) a odporu R (20–240 Ω), obvod se zdrojem/rezistorem/ampérmetrem, animované částice proudu (rychlost úměrná I), graf I–U s přímkou přímé úměrnosti a bodem aktuálního stavu. Fyzika ověřena výpočtem (12 V / 60 Ω = 0,2 A; česká desetinná čárka). Celkem 15 interaktivních simulací, build 406 stránek. Současně audit všech 213 podtémat → 13 kandidátů na další simulace v `SAMOSTATNY-REZIM.md`.
- **2026-07-23 (2) — YOUTUBE AUTOMAT DENÍKU HOTOV A BĚŽÍ (mimo web).** NasazovacYT (`Omega/skripty/nahraj_na_youtube.py` + LaunchAgent com.omega.youtube-nahravac, 9:15+21:15): hlídá `video-vystup/nasazeno/`, nahrává NEVEŘEJNÁ videa na kanál „Radek Micek" (OAuth jako vlastník radekmi1970 — značkové účty Google zrušil, správcovská role pro API nestačí; klíč+token v `skripty/data/youtube-klic/`, chráněno), playlist „Cesty <rok>", názvy „DD. MM. · Místo (Země)" (datum z fotek místa), limit 2/den, evidence duplicit. První běh 21:15 nahrál naostro 2 videa (Německo, Salbert). Dále: pip-audit měsíčně (com.omega.pip-audit), vision filtr falešných poplachů anonymizace u NOVÝCH fotek (sochy/reklamy se nerozmazávají; stará videa se nechávají), titulek „Oslavy 14. července" u hasičů, mapy --do (km sedí k místu videa), hudba dlouhých videí skládaná (bez smyčky). Zadání na stará videa kanálu: jen tváře, zachovat efekty, chybí-li zvuk přidat hudbu. Samostatný režim webu připraven (skill /wonderly + NAVOD-samostatny-rezim-webu.md + SAMOSTATNY-REZIM.md).
- **2026-07-21 až 23 — DENÍK: velký upgrade automatů (mimo web).** (1) **Landshut opraven** — nové fotky přeanonymizovány, reference manželky doplněny (celá fotka/velký výřez s kontextem — těsný výřez detektor nenajde!), `Nemecko_jen_hudba_v2` finální. (2) **VideoAutomat konečně běží z launchd** (TCC: spouštět přes `/bin/zsh` + venv python, ne přímý `/usr/bin/python3`). (3) **Malá místa <5 médií** nedostanou sólo video — přibalí se k časově nejbližšímu většímu (trvale, `pridano_k`). (4) **Mapy trasy s km generuje automat sám** (`trasa_uvod.py --do "Místo"` — trasa jen PO místo videa; km pruh jmenuje cíl; samokontrola vision modelem ThinkingCap; popisky si uhýbají). (5) **Hudba dlouhých videí** = více skladeb za sebou (concat), žádná smyčka; pojistka na krátkou hudbu. (6) **Fotky obrazovek** chytá vision model v pipeline → `_na-kontrolu`. (7) **`rucni-vklad/`** + `zpracuj_rucni_vklad.py` — AirDrop/přetažená videa (sdílená alba Apple neposílá originály!) se roztřídí dle GPS, odduplikují dle času+délky a pustí do linky; 65 videí (Saint-Maurice-sur-Moselle 55, hasiči Rupt 3, …). (8) **`--podtitulek`** v sestavit_video2 („Oslavy 14. července — výročí dobytí Bastily" u Rupt). (9) **Allowlist** čtecích příkazů v `Škola/.claude/settings.json`. Videa k revizi: Nemecko v2, Salbert, Le_Thillot v4, Rupt, Saint-Maurice. Přehnané rozmazání (reklamy, sochy) = vědomě akceptováno.
- **2026-07-20 (8)** — **Nová stránka Kladka (Fyzika 7).** Celek jednoduche-stroje měl jen páku + deformaci; přidáno plné podtéma `kladka`: výklad (pevná × volná kladka, kladkostroj, zlaté pravidlo mechaniky), interaktivní `KladkaSimulace` (přepínač pevná/volná, zvedání břemene, pevná = plná síla, volná = F/2 ale dvojnásobná dráha) a kvíz 8 otázek + auto tisknutelný test. Tím vyřešen poslední „nápad na příště". Celkem 14 interaktivních simulací, 406 stránek.
- **2026-07-20 (7)** — **Zásoba pokračuje: fyzikální simulace + vyhledávání.** (1) **PakaSimulace** (moment síly M=F·r, houpačka, hledání rovnováhy → interakce 'paka' u fyzika/7 jednoduche-stroje-paky). (2) **MagnetSimulace** (magnetické pole tyčového magnetu, železné piliny podél siločar, přepnutí pólů, reakce na myš/dotek → 'magnet' u fyzika/6 magneticke-vlastnosti-latek). (3) **Vyhledávání na hlavní stránce školy** (skola2/index.astro): živý filtr přes 162 podtémat, hledá bez diakritiky, výstup escapovaný, klientský index (žádný server). Celkem 13 interaktivních simulací. Vše auto-deploy (nic nečeká na kliknutí uživatele).
- **2026-07-20 (6)** — **Zlepšení do zásoby (uživatel spí, povolil vše dopředu).** (1) **Liga i pro informatiku** — přepínač Předmět Fyzika/Informatika v obou verzích; `bankaProLigu()` v hry.ts nyní prochází fyziku i informatiku (pole `predmet` u CelekBanky). (2) **3 nové interaktivní simulace pro informatiku** (celkem už 11): `CaraSimulace` (jízda robota po čáře, 2 čidla barvy, bang-bang řízení → interakce 'cara' u informatika/8 vex-iq/cidla-vex-iq), `BinarniSimulace` (8 žárovek-bitů, číslo 0–255 + ASCII znak → 'binarni' u informatika/7 pocitace/soubory-slozky-aplikace), `PaketySimulace` (zpráva → pakety přes routery → složení → 'pakety' u informatika/7 site-internet-email i informatika/9 pocitacove-site-a-internet). Typ interakce rozšířen, importy v [podtema]/index.astro.
- **2026-07-20 (5)** — **Bezpečnost: liga — escapování jmen týmů** (funkce `bezpecne()` v liga.astro; jména z tabletů šla do innerHTML tabule neošetřená → XSS). Zhodnocení bezpečnosti webu: statický web bez dat a přihlašování + Cloudflare = malý povrch útoku; heslo testů je jen závora (je v klientském kódu); kód místnosti ligy zná jen třída.
- **2026-07-20 (4)** — **Odkazy jen ČESKY.** Požadavek učitele: externí návody musí být česky, jinak je psát na web. Odstraněny anglické odkazy (kb.vex.com, VEX STEM Labs, learn.sketchup.com, Tinkercad lekce, LEGO Education). Nová vlastní stránka „Návod česky: první program ve VEXcode IQ" (8. r., vex-iq/vexcode-prvni-program): Devices/Drivetrain, slovníček bloků EN→CZ, program čtverec, nahrání do mozku, zastav-před-zdí. Poznámky: Tinkercad jde přepnout do češtiny; SketchUp anglicky, ale stačí náš návod. Code.org označeno „i česky". PRAVIDLO PRO PŘÍŠTĚ: do sekcí odkazů dávat jen české zdroje, nebo napsat vlastní stránku.
- **2026-07-20 (3)** — **Informatika: návody her ve Scratchi + Robotika VEX IQ.** (1) Nový celek „Hry ve Scratchi — návody": 7. r. Chytej jablka / Bludiště / Honička; 8. r. Ping-pong / Vesmírná střílečka (klony) / Skákačka (gravitace) — krok za krokem podle scénářů + „vylepšení pro šikovné". (2) Nový celek „Robotika VEX IQ": 8. r. Co robot umí + Čidla (nárazník, Touch LED, vzdálenost, barva, gyro, čidla motorů; použití v podmínkách); 9. r. návody odkazem + 5 výzev (čtverec s gyrem, parkování, sledovač čáry, třídička, VIQRC). ŠKOLA POUŽÍVÁ VEX IQ, NE LEGO — do LEGO stránky (sestaveni-a-oziveni-robota) přidána poznámka; případně později přepsat celek roboticka-stavebnice na VEX. Build 403 stránek.
- **2026-07-20 (2)** — **Pracovní činnosti 6: 3D modelování** — návody krok za krokem **Tinkercad** (tělesa, díry, seskupení, úkoly jmenovka/klíčenka/domeček/kostka, export STL) a **SketchUp** (čára→Push/Pull, přesné rozměry, domeček) s odkazy+QR. Průběžné téma mimo časový plán (poznámka přímo na stránkách). Build 390 stránek.
- **2026-07-20** — **Informatika: sekce „🔗 Odkazy k tématu" s QR kódy.** Nové pole `odkazy?: {nazev,url}[]` u typu `Podtema` (temata.ts) + vykreslení v `[podtema]/index.astro` (karta = QR z komponenty QrKod + název; QR se generují při buildu). Doplněno u všech 37 stránek informatiky skriptem. Zdroje: učebnice imysleni, Scratch, MakeCode, Blockly Games, Code.org, iBobr archiv, Datová Lhota, jaknainternet.cz, E-Bezpečí, osveta.nukib.cz, LEGO Education. Funguje i pro fyziku — stačí přidat pole `odkazy` k podtématu.
- **2026-07-19 (4)** — **Shrnutí informatiky 7/8/9**: celek „Shrnutí a opakování" (pololetní+roční) s automaticky skládaným souhrnným kvízem — `slozSouhrnnyKviz` dostal parametr `predmet` (výchozí fyzika, volání beze změny). Build 387 stránek.
- **2026-07-19 (3)** — **KVÍZY INFORMATIKY KOMPLETNÍ (31/31 podtémat)** — 5–8 otázek s vysvětlením ke každému podtématu 7/8/9 (commity 1e22b5e, 9c06208, fdd0169, ab35a77; build 372 stránek). Tím Informatika 7–9 = výklad + kvíz + tisknutelný test u všech podtémat. Případné další kroky: rozšířit kvízy na ~12 otázek, shrnutí ročníků informatiky (funkce slozSouhrnnyKviz zatím jen fyzika), otázky informatiky do her (bankaProLigu filtruje jen fyziku — záměrně). Aktualizován skill wonderly i predani-kolegovi.
- **2026-07-19 (2)** — **INFORMATIKA 7–9 ZALOŽENA na webu + časové plány.** (1) Uživatel nemá vlastní podklady ani ŠVP → základ = modelové ŠVP **„Nebojácně vpřed"** (NPI, archiv-imysleni.npi.cz; PDF + výtah v `Omega/dokumenty/informatika-svp-nebojacne-vpred.md`). Dle rozvrhu 2026/27 učí Inf jen 7/8/9 (třídy A/B/C, půlené, učebna robotiky) — 6. ročník se neřeší. (2) **Časové plány** `Škola/2 stupen/Rozvrh časový plán/Casovy plan - Informatika 7/8/9 - 2026-27.xlsx` (hodiny = minimum ze 3 tříd: 37/35/35 h; formát dle plánů fyziky; listopad = pozn. o soutěži Bobřík informatiky). (3) **Web**: `temata.ts` klíče `informatika/7/8/9-rocnik` — 10 celků, 31 podtémat s výkladem: 7. r. Scratch podmínky/události/zprávy + grafy a modely + větvení/souřadnice/parametry/proměnné + počítače; 8. r. LEGO robot + micro:bit + tabulky; 9. r. projekty Scratch II (seznamy, klony, hry) + digitální technologie (HW/SW, sítě, bezpečnost, dig. stopa) + závěrečný projekt. Odkazy na volné učebnice imysleni, MakeCode, Datovou Lhotu a archiv **iBobr** (Benjamin/Kadet). Build 341 stránek, nasazeno. **ZBÝVÁ: kvízy informatiky** (klíče kvízů zatím jen fyzika) a případné tisknutelné testy.
- **2026-07-19** — **Liga: výběr učiva + oprava zpoždění tabletů + kvíz pneumatika.** (1) Z praxe: na pomalé wifi doletí otázka na iPad pozdě a odpočet už běží → tabule nyní po odeslání otázky čeká **2 s „Připravte se…"** a teprve pak spustí odpočet (liga.astro). (2) **Obě verze ligy (tablety i karty) mají výběr Ročník (6–9/mix) a Učivo (celek)** — nová `bankaProLigu()` v hry.ts vkládá do stránky úplnou banku fyziky po celcích (26 celků, 1558 otázek, HTML 453 kB; bez shrnutí-složenin); při mixu se bere rovnoměrně z ročníků, počítadlo „V bance je N otázek". (3) Kvíz teplotní roztažnosti (F6): nová otázka „Proč je zahřátá pneumatika tvrdší a v horku může prasknout" (dotaz učitele; roztažnost plynů). Pozn.: otázka „jen kovy" byla v datech správně — jde o distraktor. (4) Návod `Škola/Hry/NAVOD-hry-pro-tridu.md` přepsán: tabletová verze (doporučená) + kartová, výběr učiva, tip na výpadek spojení.
- **2026-07-18 (7)** — **Fyzika 7: interaktivní těžiště** (`TezisteSimulace.astro`, interakce 'teziste' u sily-kolem-nas/teziste): nepravidelný mnohoúhelník, klik na závěsný bod → SVG transform otočí těleso tak, že těžiště (area-centroid) je svisle pod hákem, svislá olovnice, čára závěs→těžiště; dva body → průsečík = těžiště. Zelený bod těžiště se ukáže hned po 1. zavěšení přímo na olovnici (na námitku uživatele „není otočené podle těžiště"). Ověřeno výpočtem: CG vždy x=hák; strany mají rovné MOMENTY (355059=355059), plochy jen ≈ (9530/9570) — v textu vysvětleno (páka/houpačka, ne plochy). Interaktivních prvků: 8 (hydraulika, skupenstvi, hustota, obvod, teplomer, skladani-sil, vrh, teziste).
- **2026-07-18 (6)** — **Fyzika 7: interaktivní vrh kamene** (`VrhSimulace.astro`, interakce 'vrh' u gravitacni-sila): canvas, posuvník úhlu 0–90° (i kolmo) a rychlosti, přepínač odporu vzduchu. Za letu šipky sil (gravitace dolů + odpor proti pohybu), dráha se kreslí jako balistická křivka; s odporem klesá strměji, bez odporu souměrná parabola. Fyzika ověřena výpočtem (45° odpor 18 m × bez odporu 91 m; 90° = 0 m dolet). Interaktivních prvků: 7 (hydraulika, skupenstvi, hustota, obvod, teplomer, skladani-sil, vrh).
- **2026-07-18 (5)** — **Fyzika 7: interaktivní skládání sil (přetahování lanem).** `SkladaniSilSimulace.astro` (interakce 'skladani-sil' u F7 sily-kolem-nas/skladani-sil): +/− táhnoucí na obě strany (100 N/os.), šipky sil, animovaný uzel se posouvá k silnější straně, text výslednice = |L−P|. Ukazuje sčítání sil stejného směru i výslednici opačných. Ověřeno živě. Interaktivních prvků celkem: hydraulika(F7), skupenstvi/hustota/obvod/teplomer(F6), skladani-sil(F7).
- **2026-07-18 (4)** — **Fyzika 6: interaktivní teploměr.** `TeplomerSimulace.astro` (interakce 'teplomer' u podtématu teplotni-roztaznost): jeden posuvník teploty (−10…110 °C) rozhýbe DVA druhy — kapalinový (stoupá červený sloupec) i bimetalový (SVG pásek ze dvou kovů se ohýbá kvadratickou křivkou, spodní kov se roztáhne víc). Ukazuje princip teplotní roztažnosti = proč teploměry fungují. Ověřeno živě. Fyzika 6 má teď 4 interaktivní prvky: skupenstvi, hustota, obvod, teplomer. Další kandidáti: měření délky (pravítko), objem (odměrný válec).
- **2026-07-18 (3)** — **Fyzika 6: interaktivní infografiky.** Tři nové simulace (stejný vzor jako HydraulikaSimulace, pole `interakce` v temata.ts rozšířeno): `SkupenstviSimulace` (canvas, animované částice pevná/kapalná/plynná — u podtématu skupenstvi-latek), `HustotaSimulace` (SVG posuvník hustoty, těleso plave/vznáší/klesá — u hustota; uživatel schválil), `ObvodSimulace` (SVG vypínač → žárovka svítí — u jednoduche-elektricke-obvody). Zapojeno v `[podtema]/index.astro`. Ověřeno živě (3× HTTP OK). Souběžně vygenerováno 6 statických infografik F6 (FLUX.2 Klein, scratchpad/f6/) — čekají na dolepení popisků + vložení. Kandidáti na další interakci: teploměr/roztažnost, délka/objem.
- **2026-07-18 (2)** — **Tour de France appka + Tajemná laboratoř + Liga naživo.** (1) **wonderly.cz/tour**: sledování Čechů (Vacek/Otruba/Bittner) — worker `/api/tour` čte tabulky letour.fr (ajax adresy ite/itg z ajax-stacku, záložní „poslední funkční" adresy v cache — během živé etapy drží stav po poslední dojeté; žlutý dres = první jméno GC tabulky), stránka se obnovuje po minutě, tlačítko na oficiální racecenter live, QR na Ploše (QR-cesi-na-tour.png). Živé polohy v etapě jsou v zamčeném SDK — případně dořešit odchytem přes Chrome. (2) **/hry/laborator**: klikací obrázek laboratoře (vlastní ilustrace public/materialy/hry/laborator.png, 8 hotspotů % souřadnice), otázky tematicky k předmětům a dle ročníku 6–9 (`otazkyProLaborator` v hry.ts). (3) **Liga přestavěna na tablety**: worker Durable Object `LigaMistnost` (WS relay, kód místnosti), tabule /hry/liga + tablety /hry/liga/tym, rychlostní bonus, kartičková verze jako /hry/liga-karty; e2e otestováno skriptem (WS relay OK). (4) Předávací dokument `Omega/dokumenty/predani-kolegovi-co-dodelat.md` (+ Plocha/Návody + webová stránka). Hermesův lokální tdf-hlidac (Omega/pokusy) překonán webovou verzí.
- **2026-07-18 (noční směna)** — **HRY PRO TŘÍDU NASAZENY** (skrytá učitelská sekce `/hry`, není v menu): (1) **Fyzikální liga** (`/hry/liga`) — týmový kvíz na projektor, karty A/B/C (`/hry/karty` k tisku), odpočet s pípáním, riskovací kola ×2, automatická tabulka, pódium s konfetami; banka 120 otázek napříč ročníky (build-time výběr z kvizy.ts, deterministický seed, bez shrnutí-složenin). (2) **Úniková laborka** (`/hry/unikovka`) — 6 QR stanovišť (fyzikové NEWTON…EINSTEIN, tisk přímo ze stránky přes existující QrKod komponentu), 3 otázky → číslice kódu, `/hry/unikovka/trezor` s **SHA-256 otiskem kódu** (kód není ve zdrojáku), 30s zámek při chybě, stopky přes localStorage. Data/logika: `src/data/hry.ts` (mulberry32 seed → stabilní otázky mezi buildy). Ověřeno živě (6× HTTP 200). Návod pro učitele: `/Users/Shared/Škola/Hry/NAVOD-hry-pro-tridu.md` + odkaz na Ploše. Uživatel zadal před spaním — ke schválení ráno: vzhled/texty her, případné přelinkování.
- **2026-07-17** — **Obrázky z referencí + znělka deníku.** (1) Staženy obrázkové modely: **FLUX.2 Klein 4B** (22 GB, funguje — `mflux-generate-flux2-edit`, ~3 min/obrázek) a Qwen-Image-Edit-2509 (54 GB, záloha; q4 = šum, PR #420). Skript `vyrob_obrazek.py` (alias `obrazek`) na Klein. (2) **Znělkový obrázek HOTOV** (`2026/obrazky-ai/znelka-FINAL.png`): Bertík v okně dodávky s českou vlajkou (reference: 5× pes + dodávka v `reference-tvorba/`), AI text nefunkční → nápis **„cesty.na.kolech"** dolepen ostře (cv2.inpaint + PIL). Zbývá: rozhýbat v LTX (Image to Video) + přilepit písničku „Jedeme za dobrodružstvím". (3) ACE-Step umí **český zpěv** (`melodie --zpev`), otestováno. (4) **Hermes agent** naučen všechny nástroje (hudba, obrázky, překlady, RAG, ffmpeg spojování) — plnohodnotný offline parťák; nový návod „NÁVOD — Hermes a tvorba offline" + dvojklikové stahovače na Ploše. (5) Lekce: úplnost HF modelů kontrolovat přes `.incomplete`/sha256, mflux s chybějícími shardy tiše generuje šum.
- **2026-07-16** — **Lokální AI výbava Macu + RAG nad projektem.** (1) **RAG**: nový `Omega/skripty/rag_projekt.py` + alias **`zeptej "otázka"`** — index projektu (791 úryvků: temata.ts, kvizy.ts, dokumenty, paměti, deník) přes Ollama `bge-m3`, odpovídá gemma4:26b; otestováno. (2) **Ollama**: stažen `qwen3:30b-a3b` (kód+nástroje) a `bge-m3`; pravidla v `~/CLAUDE.md` aktualizována. (3) **TTS česky**: venv `Omega/nastroje/venv-hlas` — Piper s hlasem „jirka" (převzat z překladového automatu profilu radekmicek) + **XTTS-v2** (klonování hlasu, čeština, nutné `transformers==4.56.x` + `coqui-tts[codec]`); obojí otestováno nahlas. (4) **Hudba**: **ACE-Step 1.5** v `Omega/nastroje/` (obdoba Suno lokálně, MLX), alias **`hudba`** → UI localhost:7861, modely předstaženy. (5) **Video**: aplikace **LTX Video Generator** v2.3.63 nainstalována do /Applications (model ~22 GB si stáhne při prvním spuštění). (6) Aktualizovány souhrny (PREHLED-PROJEKTU, cesty-navrh-pro-kolegu, skill wonderly) o fotoautomatizaci z 15. 7. Paměť: `mac_lokalni_ai_nastroje.md`.
- **2026-07-15 (3)** — **Deník: plná automatizace fotek ze sdíleného alba Fotek.** Nový `Omega/skripty/pipeline_sdilene.py`: čte originály sdíleného alba „cesty.na.kolech@gmail.com" přímo z mezipaměti knihovny Fotek (`~/Pictures/Photos Library.photoslibrary/scopes/cloudsharing/data/*/FC984E86-…`; album „Rodina" se schválně nestahuje), nové soubory kopíruje a třídí dle EXIF do `<rok>/fotky-cekarna/<Město>_<Země>/`. Složka, kde 7 dní nevznikla nová fotka (dle data pořízení) a 24 h nic nepřibylo, se přesune do `fotky-puvodni` → anonymizuje ji stávající hlídač. Video zůstává ruční (alias `video`). Spouštění: aplikace `FotoAutomat.app` (ve složce Cestovatelský deník; uživatel jí potvrdil přístup k Fotkám) přes LaunchAgent `com.omega.foto-pipeline` každou hodinu. Evidence stažených: `skripty/data/sdilene-album-stav.json`, log `skripty/data/pipeline-sdilene.log`. První běh: 201 souborů, 6 měst (Landshut, Schongau, Geisingen, Le Thillot, Saint-Maurice-sur-Moselle, Salbert) + 3 bez GPS. Doinstalováno `pillow-heif` (HEIC). Poznatky: sdílená alba nejsou v AppleScriptu ani v hlavní Photos.sqlite — názvy v tabulce ZSHARE, originály v `scopes/cloudsharing/data`; EXIF (datum+GPS) zůstává zachovaný; Live Photos = pár HEIC+MOV se stejným UUID.
- **2026-07-15 (2)** — **Deník: přidán rok 2025 s Karlstadtem a Bertíkovým reportem.** Zdroj: `Škola/6/07 Opakování rok/Bertíkův čmuchací.docx` (vznik 23. 7. 2025 dle metadat → zařazeno pod rok 2025). Nová volitelná položka `report` u města (typy.ts) + rozbalovací sekce „🐾 Bertíkův čmuchací report" v CestyRok.astro (odstavce, přeložený titulek cs/en/de v TEXTY). Karlstadt: pin dopočítán z okolních měst (x 307,7; y 353,9), stellplatz Karlburger Str. 16 s cenami, popis cs/en/de. Text reportu je podklad k videu s fotkami, které už je na YouTube — **odkaz na video dodá učitel** (pak doplnit do `videa` + `videoId` v `2025.ts`). Build OK (285 stránek), nasazeno, ověřeno cs/en/de.
- **2026-07-15 (noční samostatná práce)** — Zpracovány zbylé podklady učitele ze `Škola/6`: (1) **Nová stránka „20 jednoduchých pokusů"** v celku Shrnutí 6. ročníku (z docx v `07 Opakování rok`). (2) **Wordwall odkazy učitele** (10 cvičení z `Test pololetí kvíz.docx`) přidány na pololetní shrnutí 6. (3) **Pololetní souhrn 6 rozšířen o základy elektřiny a magnetismu** — pololetní test učitele (xlsx A/B/C) zkouší ionty, el. a mag. sílu; souhrnný kvíz i text upraveny. (4) Do kvízů doplněny 2 otázky z testů učitele (zelektrizované pravítko; odečet objemu z odměrného válce). Pozn.: `Bertíkův čmuchací.docx` ve složce `6/07` je zápisek do deníku cesty.wonderly.cz (Karlstadt) — omylem ve školní složce, ponechán na místě. Build OK (282 stránek), nasazeno a ověřeno živě.
- **2026-07-14** — **Fyzika 6 DOKONČENA (18/18, 100 %) + Shrnutí pro všechny ročníky!** (1) Roztříděny SmartBooks PDF v `/Users/Shared/Škola/6/` do tématických složek učitele (01 Látka … 06 Teplota + nová „08 Elektřina a magnetismus"); záloha `SmartBooks` ponechána. Odhalen prohozený soubor Hmotnost/Objem (viz `Omega/dokumenty/kontrola-podkladu-fyzika6.md`). (2) Fyzika 6 postavena v 6 celcích dle složek učitele: Látka a těleso (5), Síla (2), Fyzikální veličiny (5), Čas (1), Teplota (2), Elektřina a magnetismus (3) — výklad + kvízy 12–17 otázek z lokálních SmartBooks PDF 1–18. Opraveny chyby podkladu: 116→118 prvků, chybné vysvětlení beztíže na ISS. Tag `fyzika-6-hotova`. (3) **Nová funkce: celek „Shrnutí a opakování" v každém ročníku 6–9** — podstránky Pololetní a Roční shrnutí (přehled učiva s odkazy na celky + klíčové vztahy). Souhrnné kvízy se skládají AUTOMATICKY z otázek podtémat (funkce `slozSouhrnnyKviz` na konci `kvizy.ts`, round-robin napříč celky; pololetí 24, rok 30 otázek) — při doplnění otázek k tématům se souhrny samy aktualizují. Tisknutelný test `/test/` funguje i pro shrnutí (náhodných 7 otázek z celého souhrnu). Build OK (281 stránek), nasazeno a ověřeno živě.
- **2026-07-13 (8)** — **Fyzika 9 DOKONČENA (22/22, 100 %)!** Uživatel dodal chybějící podklady lokálně do `/Users/Shared/Škola/9/` (roztřídil je do celků 1 Elektřina, 2 Atom, 3. Vesmír + záloha `vše`). Doplněno posledních 6 témat (výklad + kvízy z lokálních SmartBooks PDF): **elektromotor** (síla na vodič, komutátor), **transformátor** (U₂/U₁=N₂/N₁, nahoru/dolů), **přenos elektrické energie** (3 fáze, 220/400 kV, distribuce 22 kV), **jádro atomu** (nukleony, Z/A, izotopy, jaderné síly), **radioaktivita** (α/β/γ, poločas rozpadu, ochrana, Sv), **sluneční soustava** (8 planet, komety/meteory, AU/ly, Keplerovy zákony). Struktura webu zachována (6 celků). Tím je hotová celá fyzika 2. stupně (7+8+9). Build OK (219 str.). Milník: tag `fyzika-9-hotova`.
- **2026-07-13 (7)** — **Fyzika 9, celek 6** (Zdroje energie a vesmír) — hotové obnovitelné/neobnovitelné zdroje (výklad + kvíz, PDF 21). Sluneční soustava (22) = prázdná složka → dlaždice. **HOTOVO vše, co má podklady: 16 z 22 témat Fyziky 9.** Chybí 6 témat s prázdnými složkami na Disku (04 elektromotor, 08 transformátor, 09 přenos energie, 17 jádro atomu, 18 radioaktivita, 22 sluneční soustava) — čekají na PDF od učitele. Build OK (213 str.).
- **2026-07-13 (6)** — **Fyzika 9, celek 5** (Jaderná fyzika) — hotová **2 ze 4**: jaderná energie a reakce, jaderný reaktor + elektrárna (výklad + kvízy, SmartBooks PDF 19–20 z Disku). **⚠️ Chybí podklady**: složky `17 Jádro atomu` a `18 Radioaktivita` na Disku PRÁZDNÉ → dlaždice. Build OK (212 str.).
- **2026-07-13 (5)** — **Fyzika 9, celek 4 HOTOVÝ (2/2)** — elektrická energie a její přeměny, účinky proudu na organismus + bezpečnost (výklad + kvízy). Zdroj: SmartBooks PDF 15–16 z Disku. Build OK (210 str.).
- **2026-07-13 (4)** — **Fyzika 9, celek 3** (Elektrický proud v látkách) — hotová **5 z 6 podtémat**: vedení proudu v kapalinách/elektrolýza, chemické zdroje napětí, vedení proudu v plynech, polovodiče vlastní vodivost, polovodiče N a P + dioda (výklad + kvízy 11–12 ot.). Zdroj: SmartBooks PDF z Disku (témata 10–14). **⚠️ Chybí podklad**: složka `09 Přenos elektrické energie` na Disku PRÁZDNÁ → zůstává dlaždice. Build OK (208 str.).
- **2026-07-13 (3)** — **Fyzika 9, celek 2** (Elektromagnetická indukce a střídavý proud) — hotová **3 z 5 podtémat**: elektromagnetická indukce, vznik střídavého proudu + alternátor, vlastnosti střídavého proudu (výklad + kvízy 12 ot.). Zdroj: SmartBooks PDF z Disku. **⚠️ Chybí podklady**: složky `04 Elektromotor` a `08 Transformátor` na Disku jsou PRÁZDNÉ → obě zůstávají dlaždice (doplnit až budou PDF). Uživatel: pokračovat automaticky celek po celku bez ptaní. Build OK (203 str.).
- **2026-07-13 (2)** — **Fyzika 9 ZAHÁJENA**. Struktura `fyzika/9-rocnik` přestavěna dle skutečných složek učitele na **Google Disku** (parent folder ID `1q8kWtshe-EahjEQaxnP1xb87-4sght3e`, témata 01–22) do **6 celků**: 1 Magnetické pole, 2 Elektromagnetická indukce a střídavý proud, 3 Elektrický proud v látkách, 4 Elektrická energie a bezpečnost, 5 Jaderná fyzika, 6 Zdroje energie a vesmír. **✅ HOTOVÝ celek 1 Magnetické pole** — 3 podtémata (magnety-opakování, magnetické pole vodiče a cívky, elektromagnet), výklad + kvízy (12 ot. každý). Zdroj: SmartBooks PDF čtené PŘÍMO Z DISKU přes MCP (contentSnippet) — lokální složka `Škola/9/` je prázdná. Ostatní celky zatím dlaždice. Build OK (200 str.), nasazeno. Commit `d0c9343`.
- **2026-07-13** — **Fyzika 8 DOKONČENA (100 %)**. Doplněn poslední celek 6 **Zvuk** — 3 podtémata (Kmitání a vlnění, Zvuk vznik a šíření, Vnímání zvuku a hlasitost) s výkladem + kvízy (14 otázek každé). Zdroj: SmartBooks PDF 33–35 (lokálně). Ověřena fakta (f=1/T, λ=v·T=v/f; rychlost zvuku 340/1500/5000 m/s; ozvěna 0,1 s → 17 m; infra/ultrazvuk 16 Hz/16 kHz; práh slyšitelnosti 0 dB, bolesti 130 dB, poškození >90 dB) — bez chyb v podkladu. **Nový druh materiálu `youtube`** (Material.druh + iframe embed přes youtube-nocookie v index.astro) — poprvé použity YouTube odkazy z automatu (uložené v .txt u témat ve sdílené složce): oP6IJtosIp0, irfetAid_y0, 4uaNca3El9A, 109chWMF7RI. Build OK (201 stránek). Milník: tag `fyzika-8-hotova`.
- **2026-07-12 (4)** — **Fyzika 8, celek 5 Elektřina HOTOVO** (15 podtémat). Výklad + kvíz (12–13 otázek každý) pro: elektrický náboj, elektrické pole, vznik proudu, chemické zdroje napětí, elektrické obvody, proud+měření (ampérmetr sériově), napětí+měření (voltmetr paralelně), proud v kovech+odpor, závislost odporu na vodiči, Ohmův zákon, sériové/paralelní zapojení, reostat/potenciometr, práce+energie+výkon, účinky proudu na člověka+bezpečnost. Zdroj: SmartBooks PDF 18–32 (lokálně synced). Přepočítány příklady Ohmova zákona (10V/0,2A→50Ω) a převody kWh (1 kWh=3,6 MJ) — bez chyb v podkladu. Nasazeno, ověřeno živě. Commit `f602bfe`. Zbývá už jen celek 6 Zvuk (3 podtémata).
- **2026-07-12 (3)** — Zahájena **Fyzika 8**. Struktura přestavěna dle skutečného učiva (6 celků, témata 1–35). Hotové: celek 1 (Mechanická práce, Výkon) a celek 2 (Energie — 6 podtémat: přeměny, pohybová/polohová, ZZE, energetická hodnota potravin, vnitřní energie, tepelná výměna+měrná kapacita). Vše obsah + kvízy z ověřených SmartBooks PDF (+ text z Google Disku). Kontrola: nesrovnalost 54/90 km/h v příkladu Výkon.pdf (kontrola-podkladu-fyzika8.md). **Kvíz: profesor nově jako VIDEO** (tančí/lomí rukama) místo SVG. Přehled ke stažení médií 8. roč.: fyzika8-ke-stazeni.md. Uložena paměť [[youtube-fyzika-automat]].
- **2026-07-12 (2)** — **Fyzika 7 DOKONČENA (100 %)**. Doplněno téma „Zrcadla a čočky" — 6 podtémat (rovinné zrcadlo, kulová/duté zrcadlo, čočka spojka/rozptylka, oko a vady, rozklad světla a duha, vnímání barev RGB/CMYK) s výkladem + kvízy, + doplněny 2 chybějící kvízy (deformace, stejnorodá tělesa). Celkem 8 nových kvízů. Zdroje: SmartBooks PDF (zrcadla, čočky) + ověřené texty pro podcast (oko/rozklad/barvy). **Chyba v podkladu**: SmartBooks „23 Kulová zrcadla" str. 4 má prohozené definice dutého/vypuklého zrcadla — na webu uvedeno správně, zapsáno do kontrola-podkladu-fyzika7.md. Milník: tag `fyzika-7-hotova`.
- **2026-07-12** — Fyzika 7 hotová z ~90 % (Pohyb, Síly, Tlak, Vztlak, Atmosféra, Světlo A). Přidán tančící profesor, vysvětlení v kvízech, R2 úložiště pro deník, časové plány 7B/8B/9, kontrola ŠVP. Založeny CLAUDE.md + PROGRESS.md. Milník: tag `fyzika-7-zaklad`.
- _(sem přidávej další záznamy)_

## ⚠️ Pasti
- Cesty do složek `/Users/Shared/Škola/...` mají mezery a diakritiku → v bashi vždy do uvozovek, u `find`/`cp` pozor na globbing.
- Fonty v headless Chrome pro generování infografik se nemusí načíst → radši používat infografiky od učitele (NotebookLM) zmenšené přes PIL.
- Kvízy: správná odpověď je v datech VŽDY první (na webu se zamíchá) — nepřehazovat.
- Deník = obytné auto, ne kolo.


<!-- přesunuto z PROGRESS.md (řádky 131–148) 19. 8. 2026, beze změny obsahu -->

## 📋 Fyzika 8 — HOTOVO (dobová poznámka z doby rozpracování, struktura dle skutečného učiva 1–35)
Struktura `temata.ts` klíč `fyzika/8-rocnik` PŘESTAVĚNA podle složek učitele `/Users/Shared/Škola/8/` — 6 celků:
1. **mechanicka-prace-a-vykon** ✅ HOTOVO (mechanicka-prace, vykon)
2. **energie** ✅ HOTOVO (energie-a-jeji-premeny, pohybova-a-polohova-energie, zakon-zachovani-mechanicke-energie, energeticka-hodnota-potravin, vnitrni-energie-telesa, tepelna-vymena-a-teplo)
3. **tepelne-motory** ✅ HOTOVO (tepelny-motor-parni-stroj, spalovaci-motory)
4. **teplo-a-zmeny-skupenstvi** ✅ HOTOVO (teplo-a-premeny-skupenstvi, tani, tuhnuti, vyparovani, var, kondenzace, skupenske-zmeny-vody-v-prirode) — pozor: opraveny 3 chyby v podkladu (sublimace, var „z pevného", voda vře „0 °C")
5. **elektrina** ✅ HOTOVO (15 podtémat: náboj, pole, vznik proudu, chemické zdroje, obvody, proud+měření, napětí+měření, proud v kovech+odpor, závislost odporu, Ohmův zákon, sériové/paralelní zapojení, reostat/potenciometr, práce+výkon, účinky+bezpečnost) — výklad + kvízy z SmartBooks PDF 18–32. Bez chyb v podkladu.
6. **zvuk** ✅ HOTOVO (kmitani-a-vlneni, zvuk-vznik-a-sireni, vnimani-zvuku-a-hlasitost) — výklad + kvízy + YouTube videa z automatu. Bez chyb v podkladu (SmartBooks PDF 33–35).

Postup (dobový, pro Fyziku 8): číst PDF lokálně → obsah do temata.ts + kvízy do kvizy.ts → build → push. Média (infografiky/písně) dodá uživatel lokálně; videa řeší YouTube automat.
  Poznámka: „přes Google Drive MCP text" v původním postupu odkazovalo na nástroj,
  který v tomto prostředí NENÍ k dispozici — Disk čte jen učitel/lokálně, ne asistent.
- Přehled ke stažení: `Omega/dokumenty/fyzika8-ke-stazeni.md`. Kontrola chyb: `Omega/dokumenty/kontrola-podkladu-fyzika8.md`.
- **Fyzika 9 je HOTOVÁ** (tag `fyzika-9-hotova`, viz `:99` výše i git log) — dobová
  poznámka „zatím nezpracována" už neplatí.
- Časové plány 8B (59 h) a 9 (41 h) v `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/`.
- **Kvíz: profesor je nově VIDEO** (`public/video/profesor/tanci.mp4` a `lomi-rukama.mp4`) — správně = tančí, špatně = lomí rukama.



<!-- přesunuto z PROGRESS.md (řádky 183–567) 19. 8. 2026, beze změny obsahu -->

## 🗓️ Historie (changelog — přidávej nahoru, staré nech)

- **2026-08-14 večer (F9 magnety hotové · bezpečnostní vada F8 opravena · worker neměl Bash)** —
  **Škola:** dodělané podtéma F9 `magnety-magneticke-pole-opakovani` (nová simulace
  se scénou třídění vzorků a scénou pólů + rozlomení magnetu, **84 kontrol**,
  obousměrný doklad; kvíz bez délkové nápovědy 5/19 → 2/19 a bez duplicit se šestkou)
  a dokončená **druhá kontrola** F8 `ucinky-proudu-a-bezpecnost` — **11 nálezů,
  4 závažné, všechny opraveny a nasazeny** (`f6cc062`, `f30767b`, ověřeno curlem).
  Nejvážnější byla **skutečná bezpečnostní vada v učivu**: první pomoc radila
  „odsuň zraněného suchou dřevěnou tyčí" bez omezení, ačkoli o odstavec výš tatáž
  stránka učí, že u vysokého napětí proud přeskočí obloukem i bez dotyku — dítě si
  odnášelo univerzální postup, který u trolejového vedení zabíjí i zachránce.
  Druhý závažný nález: **test byl slepý k textům, které dítě čte** — zakázané fráze
  se pouštěly jen na dynamicky vykreslené texty, takže věta „suchou rukou se dá
  klidně dotknout drátu" vepsaná do statické scény prošla **zeleně se 161 kontrolami**
  (doloženo podvrhem před i po opravou). Dál sjednocena čísla mezi scénami A a B
  (153 vs 115 mA pro tutéž cestu tělem) a meze napětí na platnou ČSN 33 2000-4-41.
  **Nastavení:** nalezeno, že **`worker-simulace` neměl v definici `Bash`** — nikdy
  tedy nemohl spustit test, který sám napsal, ani si prohlédnout scénu, a odevzdával
  práci doloženou jen ručním trasováním kódu (jeho test padal hned na 12. řádku).
  Doplněno; projeví se až v nové session, takže kotvy tohohle kola doběhl koordinátor.
  Oba workeři přitom správně odmítli fabrikovat výpisy běhů, které nespustili.
  **Dvě vlastní chyby přiznané:** test simulace jsem prohlásil za rozbitý, ačkoli
  jsem ho jen spustil bez povinného druhého argumentu (opravil mě worker); a první
  podvrh se nechytil, protože trefil komentář ve frontmatteru místo šablony.
  **Nálezy na samostatné kolo:** rozpor v odporu lidského těla mezi F8 a F9, a to,
  že `uniky.mjs` porovnává jen otázky uvnitř bloku — „0 duplicit" je proto
  u opakovacích podtémat falešný klid (kontrolor našel křížově 6 dvojic F8 × F9).

- **2026-08-13 až 14 (názornost F8: 4 simulace + hlídač session + audit dokumentace)** —
  **Škola:** čtyři podtémata fyziky 8 dostala názornost, každé přes workera
  a nezávislého kontrolora do 0 nálezů: `vnitrni-energie-telesa` (78 kontrol,
  mutace 17/21), `tuhnuti` (72 kontrol, 18/20), `kondenzace` (181 kontrol,
  19/20, kontrolor 4 → 0) a `vznik-elektrickeho-proudu` (156 kontrol, 24/25,
  kontrolor 6 → 2 → 1 → 0; nejvážnější nález: počitadlo roztoku tvrdilo
  „24 částic doprava", ač polovina jde doleva). Nový trvalý nástroj
  **`testy/nahled-simulace.mjs`** — složí z komponenty obrázek k prohlédnutí
  okem (dosud pokaždé jinak, screenshot prohlížeče v session vracel prázdno);
  u všech čtyř simulací našel vady, které žádné měřidlo nevidí (šipky jako
  ručičky ciferníku, popisek splývající s podložkou, chybějící dělení osy).
  Opraven **`mutace.mjs`**: běžel bez timeoutu, mutace `-5 * sul` → `-5 / sul`
  dala −Infinity, nástroj visel bez konce a nechal v komponentě ležet MUTACI
  (obnova ve `finally` se ke slovu nedostane) — nyní timeout 60 s a zaseknutá
  mutace se hlásí zvlášť. Kvíz `tuhnuti` zbaven délkové nápovědy (8/13 → 5/13),
  úniky 0 ve dvou kolech. Stav názornosti: **F8 5 z 37** (2 z nich shrnutí),
  **F9 9 z 25** (2 shrnutí); testy simulací 23 souborů / 1674 kontrol / 0 spadlo.
  **Automaty:** nový **hlídač session** (`hlidac_session.py` +
  `com.omega.hlidac-session`, à 10 min) — pravidlo „smyčka se sama nezastavuje"
  existovalo jen jako text bez vykonavatele; poplach jde notifikací i Telegramem
  (kanál do té doby uměl jen přijímat), 17 obousměrných kontrol. Vrátný
  `povoleni_hook.py` nově **překládá python-heredocy** před spuštěním (10. výskyt
  rozbité syntaxe) a pouští náhledový server bez ptaní. Nedělní audit si zapisuje
  razítko; revize automatů poprvé **0 nálezů ze 49 testů**.
  **Dokumentace:** audit se **22 nálezy** opraven (YouTube automat, jazyky,
  delegace, `vymena-map` v AUTOMATY.md, opsané konstanty nahrazeny odkazy);
  stavový soubor uříznut do archivu (−94 kB). **Deník chyb** dostal zápis
  17 chyb a je nadále jediným místem, kam se opravená chyba zapisuje s dokladem,
  že oprava funguje (`Omega/skripty/denik_chyb.py`).

- **2026-08-12 odpoledne (mapy měly špatné km + simulace elektrického pole)** —
  **Deník:** nalezena a opravena tichá vada bodů míst. Bod = medián GPS fotek,
  jenže po úklidu mezikopií fotky zmizí, medián nejde spočítat a rozhodoval
  medoid, který dřívější přesný bod přehlasoval pinem/databází — naráz to
  posunulo **11 míst** (Mens 9,07 km, Riez 8,11 km, Le Lavandou 5,63 km,
  Salins 5,55 km) a kotva mlčela (hlásí až od 25 km). V `trasa_z_tabulky.py`
  je **rohatka kvality** + sjednocené hledání starého bodu pro rohatku i kotvu
  posunu; obousměrný test 21/21, staré testy 19/19, trasa 31 zastávek/2936 km.
  Video Luxeuilu (6 dílů) neslo 2521 km místo 2509 → mapa vyměněna přímo v mp4
  novým nástrojem **`vymen_uvodni_mapu.py`** (testy 22/22), `kontrola_videa.py`
  6/6 čistě, staré díly v `nasazeno/_stara-mapa/`. Ověřeno spuštěním funkcí
  nahrávače, co zítra pošle: Saint-Amour 2z2 + Luxeuil 1z6…4z6 (kvóta 5/den).
  **Moje chyba:** `vyrob_video_automat.py --help` nevypsalo nápovědu (skript
  argparse neměl) a rovnou uklidilo mezikopie Luxeuilu (623 + 676 MB, natvrdo);
  proto ta výměna mapy místo přestavby. Past zavřena — skript má teď `--help`,
  který nic nespustí; zapsáno do deníku chyb i do pamětí.
  **Audit návodů:** dva nezávislí kontroloři, 12 doložených rozporů, všechny
  opraveny (interval kontroly anonymizace, splacený dluh kráječe, počet
  zastávek, „schválit video" v PRAVIDLECH, rezerva u YouTube kvóty, účet
  `cz.wonderly.ollama-env`, cesta k `obousmerne.json`, přegenerovaný
  PREPOCET-MAP.md). Nový dluh k F (3 body) v PLAN-PORADEK.md.
  **Škola (fyzika 8):** nová simulace **elektrického pole** — dvě nabitá tělesa
  i homogenní pole mezi deskami, siločáry, tažitelný zkušební náboj. Nezávislá
  kontrola našla 5 nálezů (závažný: pole desek neznalo geometrii), autor je
  opravil, **druhé kolo našlo dalších 5** (3 závažné: obrácená podmínka na
  okraji desky B, nepravdivá věta o rušení pole vně desek, věta odporující
  tomu, co je u posuvníku vidět) → opraveno a kontrolováno znovu.
  Fyzika 8 měla 12 podtémat bez názornosti → o jedno míň.
  **Chyba v postupu (deník chyb, třída `verdikt-hadany-vzorem`):** verdikt
  druhého kola jsem vytáhl grepem z transcriptu subagenta a chytil tím větu
  z VLASTNÍHO zadání („Když je vše v pořádku: POČET NÁLEZŮ: 0"), takže se
  simulace nasadila jako čistá, ačkoli měla 5 nálezů. Verdikt se čte
  z doručeného výsledku agenta, nikdy vzorem nad transcriptem.

- **2026-08-12 v noci (smyčka kontrol kráječe DO NULY: kola 4–18, ~30 oprav)** —
  Dokončena smyčka oprava→kontrola z 11. 8.: 15 kol nezávislého kontrolora
  (každé kolo čerstvý kontext), poslední kolo **0 nálezů**; testy rozšířeny
  21 → 25 + nová sada 4 (klíče složek, časy vzorků). **Tři vady s živým
  dopadem:** (1) volný glob počítal torza `_temp_bezzvuku` jako hotové kousky
  — **6 starých videí se tiše nikdy neslepilo**; po zavedení striktního vzoru
  a úklidu 7 torz jsou odblokovaná. (2) Holé `ffprobe` pod launchd → rozpočet
  hlídače mrtvý, **1 video na probuzení** (proto noční anonymizace lezla).
  (3) Pojistka „cizí −1 má přednost" v evidenci byla mrtvý kód — rozhodnutí
  člověka šlo tiše přepsat. Dál: kolize pracovních složek kráječe (jméno,
  přípona, `__`) + otisk zdroje `.zdroj-otisk`; evidence selhaných slepení se
  stropem 3; timeouty na všech podprocesech; tři stavy zvuku; kumulativní
  hranice kousků; čas vzorku ze začátku intervalu; jediné domovy
  (`kousky_ve_slozce`, `priprav_jeden_kousek`, `stoji_za_krajeni`,
  `delka_s`). **Saint-Sauveur dokončen 49/49** — poslední video převzato
  ručně po 3 nezdarech automatu (10s kousky; `-c copy` concat rozbil časové
  značky, kotva to chytila, slepeno concat filtrem). Čekač pak sám spustil
  výrobu — další v pořadí Luxeuil-les-Bains (169 médií), hudba se generuje.
  Nová pravidla zapsána v PRAVIDLA.md (sekce „Kráječ videa po velké smyčce").
  **Ráno:** video Luxeuil-les-Bains (3 díly) prošlo kontrolami 3/3 čistě
  (obraz = zvuk 0,00 s, −24 dB, faststart), mapa i anonymizace prohlédnuty
  okem, a v 9:15 ho nahrávač sám začal nahrávat na kanál (díl 1/3 a 3/3
  hotové; díl 2/3 spadl na „Broken pipe" — ověřit duplicitu na kanálu).

- **2026-08-11 pozdě večer (druhá smyčka: kráječ videí v principu)** —
  Zadání učitele „projdi dnešní chyby a rozpory, smyčka do 0". Návody:
  0 nálezů po 4 kolech (7 oprav, hlavně nedomyté snapshoty v PLAN-PORADEK).
  Hon na 4 odložená videa Saint-Sauveur odhalil ŘETĚZ tří vad kráječe:
  (1) `-map 0` táhl mebx stopy iPhonu → muxer segmentů nezapsal moov
  a kousek byl nečitelný i z čerstvého střihu; (2) recyklace torza —
  „hotové kousky se nekrájí znovu" lhalo donekonečna; (3) dítě vracelo
  kód 0 při chybě („selhal (kód 0)"). Kontroloři ve 3 kolech přidali:
  slep() atomicky (temp+replace) s kotvou stopáže (ffmpeg concat vrací
  0 i při chybě demuxingu!), délková shoda recyklovaných kousků, zákaz
  duplicit v seznamu, selektivní monkeypatch v testu (dřív zabíjel
  i ffmpeg a měřil špatnou větev). Testy 21/21 s podvrhy obou směrů.
  Nový konflikt HLADOVĚNÍ DRÁHY (kontrola kvality à 5 min vytlačila
  anonymizaci; smyčka teď při obsazené dráze čeká). Videa se přes noc
  dodělávají sama (47/49), výrobu spustí čekač.
- **2026-08-11 večer (kolo WONDERLY: měřidla map v principu + simulace výkonu)** —
  Audit návodů po /clear: 3 kola, 0 nálezů (5 drobností: kadence kontroly
  kvality, značky ⏸ v ose AUTOMATY.md). **Hlavní oprava dne: měřidla map
  lhala o nových videích** — `prepocet_map` i denní `kontrola_poradi`
  rekonstruovaly obsah mapy ze STARÉ trasy i u videí složených z trvalé
  trasy (falešné „chybí Ornans/Riez", ráno 12, večer 15 „k přestavbě").
  Nové pravidlo HRANICE TRVALÉ TRASY (jediný domov
  `kontrola_poradi.mapa_z_trvale_trasy`, krok B = 10. 8. 8:27) → 8 map
  k přestavbě = přesně seznam kroku E (nezávislá kotva). Pevné součty 7/10
  v testu (4× po sobě padal) nahrazeny invarianty + čistou funkcí
  `chybejici_zastavky` s podvrhy obou směrů. `kontrola_kanalu` umí povýšení
  krytého místa na vlastní video (Riez, Saint-Tropez) — odebere krytí
  i zbylé `pridano_k`; kontrolor chytil oscilaci oprav i ISO čas s „T".
  Evidence srovnána (0 nesouladů), testy 27/27 a 19/19, 4 kola nezávislé
  kontroly měřidel, pravidlo v PRAVIDLA.md. **Web: nová simulace VÝKONU**
  (F8, jeřáb vs. dělník, celá čísla, čistá funkce času; kontrolor 2 drobné
  nálezy, opraveny) — názornost F8 11 → 10. Anonymizace běží smyčkou
  (Saint-Sauveur), zítra 9:15 nahraje automat 5 dílů sám.

- **2026-08-11 (kolo WONDERLY: audit návodů do 0 + úniky kvízů 38 → 0)** —
  Kolo začalo povinným auditem dokumentace (zadání učitele): dva hledači
  rozporů naráz, opravy, smyčka s nezávislým kontrolorem do **0 nálezů**
  (3 kola). Hlavní opravy: kánon popisů míst („píše Claude ze zdroje", ruční
  roky přímo do .ts) sjednocen ve skillu i PRAVIDLA.md; **modelů je 8, ne 7**
  — llama3.1 se po omylném smazání týž den vrátil (jediný kontrolor jiné
  rodiny; `popisy_mist.KONTROLORI` zúžen na něj); mrtvé cesty záloh
  v PLAN-PORADEK.md. **Web: všech 38 úniků odpovědí v kvízech opraveno na 0**
  a rohatka utažena — příští únik shodí build. Postup diamantem: 5 workerů
  (sonnet) navrhlo přeformulování ve ~25 blocích, hlavní model zapsal,
  **5 kol nezávislé kontroly** (11+6+2+2+0 nálezů). Kontroloři chytili mj.:
  moje vysvětlení tvrdilo „W není značka veličiny" (je to značka práce),
  „částice plynu letí svižněji" (rychlost určuje teplota, ne skupenství —
  správný důvod je volná dráha), únik počtu tlačítek micro:bitu přes
  SOUSEDNÍ blok a šíření vůně vydávané za difuzi (je to proudění). Past dne:
  **návrh kontrolora umí vrátit původní únik** („vraťte konkrétní ‚malé p je
  tlak'") — oprava musí být konkrétní JINÝMI slovy. Nahrazeny 2 otázky;
  výklad odrazu doplněn o dvě rovnoběžná zrcadla; ve výkladu micro:bitu
  opravena poloha dotykového loga V2 (bylo „vzadu", správně vpředu nad
  displejem). Deník mezitím: anonymizace 113 → 89 souborů (čekací smyčka
  střídá dráhu s kontrolou kvality fotek), v `nasazeno/` čeká 5 dílů na
  zítřejší kvótu.

- **2026-08-10 (celý den: plán POŘÁDEK A–D + ZMĚNA ZPŮSOBU PRÁCE + 2 videa ven)** —
  Dopoledne dojety **kroky A, B, C a D** plánu `Omega/PLAN-PORADEK.md`: revize
  automatů zná STOPKU; tabulka míst má přesné ČASY focení, je bez duplicit
  (42 → 39 řádků) a poprvé v ní je Ramonchamp; **trasa se staví z tabulky —
  16 → 31 zastávek, 2 826 km** (Ballon i Ornans v ní byly poprvé); spočítáno,
  že **10 map je vadných a 7 v pořádku** — týž seznam, k jakému došel plán
  z jiných dat; dotříděno 26 médií do Le Lavandou se souhlasem dvou
  nezávislých kritérií.
  **Odpoledne učitel změnil způsob práce:** *„všechnu práci vrhnout vždy na
  video, které je v pořadí; videa se budou dělat v pořadí cesty, jinak je to
  nelogické"* a *„vše na další video a mezitím dodělat web"*. Podle toho jsou
  **hotová a živá dvě videa**: **Landshut** (`uuRd8CtlUJI`, 1:30) a **Ballon
  d'Alsace** (`ghBZ3WUwQPY`, 12:21) — obě prošly kontrolami (mapa, zvuk,
  délky, anonymizace pohledem), jsou na kanálu i na webu, ověřeno curlem.
  Ballon je na webu **nové místo** s popisem ve 4 jazycích z doloženého
  zdroje. Landshut dostal vlastní video místo sestřihu německé části.
  **Tři poruchy nalezené a opravené:** hlídač anonymizace se 10,5 h točil
  naprázdno (systém ho zabíjel pro paměť na jednom videu); tabulka hlásila
  zrušený krok „schválit video" — zrušené pravidlo přežilo v KÓDU; přerušený
  upload vyrobil na kanálu duplicitu (vadný zbytek přepnut na soukromý,
  nahrávač se teď po chybě sám ptá kanálu).
  **Dvě vlastní chyby přiznané a opravené:** ze tří vzorků paměti jsem
  vyhlásil „lineární únik" — doběhnuté měření (39 vzorků) to vyvrátilo;
  a hlídač zaseknutí spustil čtyři falešné poplachy, než se doladil.
  **Nové nástroje:** `hlidac_zaseknuti.py` (à 30 min, mluví lokálním modelem
  jen při nálezu), `priprav_mapy.py` (10 map dopředu), `poradek_medii.py`,
  `prepocet_map.py`, `trasa_z_tabulky.py`, `kontrola_kanalu.py` — každý
  s obousměrným důkazem (dohromady ~120 kontrol).
  **Tabulka nově ukazuje** sloupec „Mapa připravena" a dva různé časy videa
  (výroba × nasazení) — na přání učitele: *„vše, co vytvoříš, zaznamenat do
  tabulky, je to důležité pro kontrolu a plánování"*.

- **2026-08-10 dopoledne (kolo WONDERLY: KROK A plánu PORADEK celý hotov)** —
  Deník: vykonán kompletní krok A plánu `Omega/PLAN-PORADEK.md` v3.
  **A1:** revize automatů zná STOPKU — pozastavené automaty čte z
  `pozastavene-automaty.json`, hlásí je „pozastaven plánem" a obousměrně hlídá
  porušení (nahraný v launchd / aktivní plist / bez evidence); test 10/10,
  ostrý běh 3 pozastavené a 0 falešných poplachů. Bonus: revize sama našla
  opsané pravidlo `pripony-medii` → nahrazeno importem z domova.
  **A2:** tabulka míst nese plný ČAS první a poslední fotky (zdroje: složky
  deníku + evidence alba, která přežije úklid) a řadí se podle času;
  `klic_mesta` sjednocuje oddělovače a apostrofy → 42→39 řádků, 0 duplicit
  (kalibrace na 335 názvech: 17 slitých skupin, všechny týž objekt; testy
  nahrávače 36/36). Ramonchamp je poprvé v tabulce (zdroj = pokrytí
  `pridano_k`, sloupec „Kryto videem", vlastní video se po něm nechce).
  **A3:** nový `kontrola_kanalu.py` — soupis kanálu s CELÝMI názvy
  (210 videí), pokrytí ze tří zdrojů, nesoulad evidence Le Bourg srovnán
  (`pridana_mista` += Riez, Saint-Tropez; poté 0 nesouladů). Z logu nahrávače
  doloženo: `_v2` soubor = `wZSKCdxlmeg` (31. 7., 248 MB, čeká na předělání),
  platné je `-FR8z-38PR8` (1. 8., 527 MB, má ho web) — „v2" zase neznamenalo
  novější. Tabulka pro učitele: `Omega/dokumenty/KANAL-POKRYTI.md`; zdvojené
  datumové prefixy na kanálu už nejsou (doloženo soupisem). Tři nové testy
  (10+11+13 kontrol) v denní revizi. **Na řadě: krok B — trasa z tabulky.**

- **2026-08-08 v noci (kolo WONDERLY: trojice „Délka" + dvě opravy měřidel)** —
  Fyzika 6 má polemiku u 10 z 21 podtémat; další díra ve veličinách je **Délka**
  (hmotnost, objem i hustota ji mají). Vznikla **trojice krátkých dílů**: metr
  a převody (28 replik) · čím měřit, od vlasu po hvězdy (24) · jak měřit správně (22).
  Scénáře psali **tři workeři naráz**, pak **nezávislý kontrolor**: 11 nálezů,
  všechny opraveny. Nejvážnější: scénář prohlásil **správnou značku délky `l`
  za omyl** (kvíz téhož podtématu píše `l = 72 mm`) a věta „mezi popsanými čárkami
  je deset menších čárek, čili deset mezer" **bořila pointu celého dílu** — mezer je
  deset, ale menších čárek jen devět, a scénář si to o čtyři repliky dál sám
  vyvracel. **Brána kvízu 21 z 21.** 19 schémat kreslí kód (stupnice se počítají
  z počtu mezer, ne od oka); kontaktní list našel oříznutý popisek a překryv textu
  s kresbou — obojí opraveno a přerenderováno. Zvuk lokálním OmniVoice: díl 3
  hotov (18 replik z 22 na první pokus).
  **Dvě opravy měřidel, obě s obousměrným důkazem:** (1) revize automatů hlásila
  dva **falešné poplachy** `⏳ PŘETRVÁVÁ` u chyb, jejichž skripty se týž den opravily
  — doplněna druhá kotva (sleduje i importované moduly a porovnává ČAS, ne datum),
  nález se nezahazuje, jen přeřadí do „čeká na ověření"; ostrý běh **0 nálezů**.
  (2) brána pokrytí kvízu **neuměla trojici** (díly si otázky rozdělí, takže se
  u trojic dala jen obejít) a **měřila jen podíl shodných slov** — dvojice dílů
  díky tomu „pokryla" 14 ze 14 otázek, ačkoli jediná zmínka zněla „příště si povíme,
  co jsou směsi". Nově musí zaznít i nosné slovo odpovědi; kalibrace na 137 otázkách
  hotových dílů posílá k modelu 2 navíc (1 %).

- **2026-08-08 dopoledne (kolo WONDERLY: částicová série F6 — dva díly rozpracované, dvě nové animace)** —
  Vyrobeny **scénosledy, 19 schémat a dvě animace** k dílům „Z čeho je všechno
  složené" (Démokritos, Brown) a „Jak se částice chovají" (neuspořádaný pohyb,
  teplota, tlak, síly). **Obě animace kreslí kód a jejich kotvy se spočítaly
  PŘED renderem:** u Brownova pohybu se zrnko nehýbe náhodně „aby to vypadalo",
  ale proto, že se sečtou impulzy skutečných nárazů molekul — vyšla dráha 1091 px
  proti posunu 156 px, tedy sedmkrát delší, a na pěti semínkách 4,2× až 19,6×.
  To je právě chování náhodné procházky, o kterém díl mluví. U teploty se poměr
  rychlostí NEZADÁVAL, ale změřil z toho, kolik částice ujely: **1,171 proti
  spočtenému √(373/273) = 1,169.** Rozdíl mezi 0 a 100 °C je tedy jen 17 % —
  scéna to nesmí zveličit, a aby přesto byl vidět, měří ho pruh a číslo v km/h.
  **Dvě vlastní chyby, obojí odhaleno vlastní kontrolou:** (1) první nastavení
  zrnka mělo takovou hmotnost, že se za devět vteřin posunulo o 19 px a vůbec
  nebylo vidět, že se hýbe — kotva to ukázala dřív, než se cokoli vyrenderovalo;
  (2) čekací smyčka na uvolnění dráhy poznala jen JEDNU ze dvou hlášek o čekání
  a na té druhé (málo volné paměti) skončila jako „hotovo" — tentýž vzorec jako
  „opatření tiše platí jen na část případů".
  **Prohlídka kontaktním listem našla tři vady, které z výpisu skriptu nejsou
  vidět:** překrývající se popisky u dělení křídy, text „zahříváme" nakreslený
  přímo v plameni a popisky start/konec ležící na dráze zrnka. Opraveno; navíc
  mikroskop dostal jediný domov (kreslily ho dvě scény zvlášť).
  **Brána pokrytí kvízu: trojice dílů pokrývá všech 18 otázek beze zbytku.**
  **Oba díly jsou hotové a NASAZENÉ** (1:42 a 1:52; ověřeno curlem — stránka
  vrací tři videa a obě nová jsou v R2). Délka videa se rovná délce zvuku na
  setinu, hlasy nejsou prohozené (245 a 151 Hz). **Trojice dílů pokrývá
  všech 18 kvízových otázek beze zbytku.**
  **Splněno i přání učitele o samostatných animacích:** dvanáct klipů běží
  nově i pod výkladem podtématu (přehrát/pauza, od začátku, zpomalit, dokola)
  na osmi stránkách Fyziky 6. Klipy jsou němé (změřeno −91 dB) a přehrávač má
  `muted`; tichá stopa v souboru ZŮSTÁVÁ, bez ní by přehrávač zamrzl.
  **Audit na startu kola:** oba „přetrvávající" nálezy revize automatů jsou
  ZASTARALÉ, ne živé — chyba padla v 00:33, oprava PATH přišla v 09:58 téhož dne;
  doloženo reprodukcí s chudým PATH (oba kroky dnes doběhnou). Revize by měla
  porovnávat čas chyby s časem změny skriptu. `animace_podkastu.py` si jako
  jediný skript řetězu nebral zámek dráhy — doplněn.
  **Dvě přání učitele zařízena:** velký audit jede od teď **každou neděli sám**
  (plánovaná úloha `wonderly-audit-nedele`), a **čekání na doběhnutí rozdělané
  práce se už neodklikává** — vrátný ho propouští, ověřeno obousměrně.

- **2026-08-08 odpoledne (dodatek: verze 2 dílu + všech 12 nálezů auditu uzavřeno)** —
  Na pokyn učitele dotaženy VŠECHNY nálezy celkového auditu: díl skupenství
  nasazen ve **verzi 2** („roztavíš" místo „rozpustíš", bezpečnostní věta,
  stříkačka i v audiu, opravený závěr, popisek scény 08, bílé obrysy částic;
  produkce vrací nový soubor bajt na bajt). Systémově: PATH pravidlo má jediný
  domov `skripty/prostredi.py` (bylo 6 kopií; registrováno + hlídáno), atomický
  zápis anonymizace (temp + os.replace), hlídač fotek v denní revizi, pauza
  baterie, tautologická zkouška přepsána. Zaveden povel **`WONDERLY AUDIT`**
  (velký audit + úklid dokumentace, každou neděli — definice ve skillu).
- **2026-08-08 v noci (kolo WONDERLY: audit + polemika skupenství nasazena)** —
  Audit na startu kola našel a opravil tři věci: (1) řetěz kontroly anonymizace
  padal pod launchd na holém `node` (z terminálu prošel — proto vypadal zdravě);
  PATH se teď rozšiřuje v `mista_deniku.py` a zdědí ho všechny navazující
  skripty; logy nově ukládají KONEC tracebacku, ne useknutý začátek.
  (2) Hlídač nových fotek byl znovu zabit systémem bez jediného výsledku —
  „dávka 99 fotek" je ve skutečnosti 88 VIDEÍ + 6 fotek; nový kód bere fotky
  po 20 a video nejvýš jedno na probuzení, s evidencí pokusů psanou před prací
  (přežije signál 9) a odložením po 3 nezdarech (test 13/13 — našel při psaní
  skutečnou chybu). (3) Revize automatů hlásila mrtvou cestu, protože regex
  bral celý příkaz `node testy/obousmerne.mjs` jako název souboru (test 14/14).
  **Hlavní práce: díl `skupenstvi-latek-dialog` dotažen a NASAZEN** — zvuk
  lokálním OmniVoice (38/38 replik na první pokus; hlasy změřeny: 146/250 Hz,
  obě v pásmech), animace částic přerenderovaná s měřenými kotvami (mřížka
  pevné látky, sloupec kapaliny 189 px spočtený = naměřený, plyn zaplní 97 %
  nádoby), ilustrace scény 0 mfluxem (led správně plave), video 5:16 s
  faststartem i zvukovou stopou, úplnost doložena porovnáním všech 38 replik
  s přepisem. Ověřeno curlem na produkci (stránka i soubor z R2). GPU dráha se
  celou noc střídala s automaty — čekání řešila smyčka, pojistka zámku
  fungovala správně (odmítla OmniVoice, dokud jely fotky/pečlivá videa).

- **2026-08-07 (podkásty F6 nasazené · videa se rozhýbala · dvě vady vlastních měřidel)** —
  **Všech 8 dílů Fyziky 6 dostalo nový hlas** (lokální OmniVoice, zdarma), učitel je
  poslechl a schválil. Kotvou správnosti byla **změřená výška hlasu** (muž 142–161 Hz,
  žena 233–264 Hz) — prohození hlasů se jinak pozná až poslechem celého dílu.
  **Osm videí nasazeno:** hmotnost, hustota, objem a vzájemné působení sil dostaly
  video vůbec poprvé, tři díly druhou verzi vedle stávající, úvod do fyziky nahradil
  starší nahrávku s prohozenými hlasy. Čtyřem dílům se musela dokreslit chybějící
  úvodní ilustrace — schémata měly hotová, chyběla jen ta jediná neschematická scéna.
  **Učitel pak zadal pohyblivé scény:** *„aby se do videa nepřidávaly jen statické
  obrázky… například když říkají, že astronaut upustí kladivo a pero, tak by to bylo
  i vidět… ne jen ty předměty, ale i to okolí."* Vznikl modul `animace_podkastu.py`;
  `video_podkastu.py` umí vložit klip místo statického snímku a poslední snímek podrží
  do konce scény. Nasazené jsou dva díly s animacemi: úvod do fyziky (kámen × papír
  na Zemi, kladivo × pero na Měsíci) a gravitační síla (Newtonovo dělo — tři výstřely,
  dva dopadnou, třetí obíhá). **Animace kreslí KÓD, ne video model:** polohy se počítají
  z volného pádu, pádu s odporem a numerické integrace v gravitačním poli, takže
  „dopadly současně" i „obíhá" z výpočtu VYJDOU. Generativní model se z pozemských
  videí naučil, že lehké věci padají pomaleji vždycky — na Měsíci by učil opak zvuku.
  **Nejdražší past dne vypadala jako vada obsahu:** učiteli se klip „zastavil po 0,07 s,
  ani se to nerozběhlo". Animace byla v pořádku — soubor měl **index (`moov`) až za
  obrazovými daty a žádnou zvukovou stopu**, na čemž přehrávač zamrzne hned na začátku.
  Doloženo hledáním značek `moov`/`mdat`; nově má každý klip `+faststart` a tichou stopu.
  Hotová videa podkástů to měla odjakživa, samostatně vyráběné klipy ne — proto to
  nikdo dřív neodhalil.
  **Dvě vady ve VLASTNÍCH měřidlech** (opakovaný vzorec projektu): (1) brána
  `pokryti_kvizu.py` hlásila jako chybějící **každou odpověď kratší než tři znaky**,
  tedy všechny značky Fe, O, m, V, F napříč fyzikou — zbyla jí prázdná množina
  klíčových slov; k tomu špatně skládala číslovky („sto osmnáct" → „8 100" místo 118).
  Opraveno, regrese změřena na všech 8 dílech: **0 zhoršených, 3 zlepšené**.
  (2) Měřidlo polohy pera tvrdilo, že pero visí ve vzduchu, ačkoli leželo — měřilo
  text hlášky a vracelo v obou časech totéž; vyvrátil to až pohled na výřez.
  **Poučení: když si měření a pohled odporují, hledej chybu nejdřív v měření.**
  Třetí poučení je od učitele: **splněná norma kontrastu není důkaz čitelnosti** —
  tmavý text na trávě měl 6,2 : 1 (norma 4,5) a přesto mu splýval; text přes kresbu
  proto patří na bílou plaketu. Splacen i zapsaný dluh: `vyrob_video_automat.py` si
  nově bere sdílený zámek modelu kolem výroby hudby ACE-Stepem.
  Napsané a branou prověřené jsou **scénáře `atomy-a-molekuly`** jako tři krátké díly
  (14 ze 14 otázek pokryto); chybí jim scénosledy. Návod pro kolegu:
  `Omega/dokumenty/NAVOD-ANIMACE-PODKASTU.md`.

- **2026-08-05 (audio podkásty fyziky — celá Fyzika 6 napsaná, hlas vybrán, rozhodnut dialog)** —
  Povel `WONDERLY PODKASTY`. **Napsáno a zkontrolováno všech 21 z 21 scénářů Fyziky 6**
  (`Omega/podkasty-scenare/6/`), tři dávky vějířem workerů, ke každé **nezávislý kontrolor**;
  měřidlo nad všemi hlásí 21 vstupů, 0 nálezů. Učitel zřídil klíč OpenAI (ověřen skutečným
  voláním), poslechem 13 hlasů vybral **`fable`** a schválil první hotový díl
  (gravitační síla, 3:58) — pak ale rozhodl, že podkásty budou **DIALOG dvou lidí**
  (`fable` vysvětluje, `nova` se ptá), protože „polemika by byla zajímavější".
  **Nejcennější výstup nejsou scénáře, ale 20 věcných chyb NALEZENÝCH VE VÝKLADU NA WEBU**
  (ocel jako „sloučenina", krystalické látky „velice tvrdé", laserový dálkoměr
  „nejpřesnější", uzemnění jen pro záporný náboj, u proudu a napětí chybí značky I a U…) —
  do `temata.ts` se bez pokynu učitele NESÁHLO, tabulka čeká v `SAMOSTATNY-REZIM.md`.
  **Dvě z nich byly BEZPEČNOSTNÍ:** díl o obvodech uváděl zásuvku mezi zdroji a hned nato
  dával návod na zapojení, aniž kdy řekl, že zdrojem smí být jen baterie; u Archimédova
  poháru chyběl krok „kámen celý pod hladinou". Poučení: **u obsahu konzumovaného
  POSLECHEM BEZ OBRAZU musí kontrolor dostat zvláštní otázku „dá se to podle poslechu
  bezpečně provést a nechybí krok?"** — běžná kontrola věcné správnosti to nenajde,
  protože každá věta je sama o sobě pravdivá. **Nápad učitele, který zafungoval:** místo
  syntézy replika po replice (zní slepeně, intonace se u každé resetuje) přečte celý
  rozhovor každý hlas zvlášť, repliky se podle časů slov vystřihnou a proloží — výsledek
  74 s proti 89 s a znatelně plynulejší. Proměřeno i to, co zdarma NEJDE: hranice replik
  podle pauz (nejkratší vybraná pauza 0,75 s = nejdelší nevybraná, odhad chybný o 3,7–10 s)
  ani lokální whisper (liší se o 0,19 s, useknul by 1–3 repliky ze 13; větší model
  nepomohl). ZBÝVÁ: zkušební díl na **ElevenLabs Text to Dialogue** (víc mluvčích v jednom
  požadavku → odpadá střih i dvojí syntéza), ověřit jeho cenu, pak přepsat 21 scénářů
  do dialogu, vyrobit, zapojit na web jako `druh: 'audio'` a pokračovat F7 (33 podtémat).
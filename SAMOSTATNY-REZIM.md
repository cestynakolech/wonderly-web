## ČEKÁ NA ROZHODNUTÍ UČITELE (23. 8. 2026)

U všech tří bodů platí: zdrojové PDF SmartBooks je ÚTRŽKOVITÉ (placený obsah,
„číst dál" končí u zdi) — chybějící číslo tedy nemusí být chyba na webu, jen
oříznutý zdroj. Rozhoduje učitel.

1. **Ochranná pásma vedení** — prezentace učitele („Elektřina 9", popis v
   `Omega/dokumenty/prezentace-popisy/`) uvádí do 1 kV = 7 m a 1–35 kV = 10 m,
   dohledané zdroje k zákonu 458/2000 Sb. ale uvádí 7/12/15/20 m podle napětí
   a 1 m u izolovaného kabelu do 1 kV — zdroje se rozcházejí, proto jsou
   konkrétní metry na webu zatím VYNECHANÉ (jen zásada „čím vyšší napětí, tím
   širší pásmo"). Doplnit tabulku podle zákona, podle prezentace, nebo nechat
   bez čísel?
   Ověřeno 22. 8. přímo ve zdrojovém PDF učitele („16 Účinky proudu na
   lidský organismus…", 9. ročník, str. 3–5): ŽÁDNÉ metry tam nejsou (str. 6
   je zamčený placený obsah). Vynechání konkrétních metrů z výkladu je tedy
   doložené, ne odhad. Rozpor zůstává jen mezi prezentací „Elektřina 9" (7 m
   do 1 kV, 10 m pro 1–35 kV) a energetickým zákonem 458/2000 Sb. (7 m do
   35 kV, 12/15/20/30 m výš, 1 m izolovaný kabel do 1 kV) — kategorie i
   hodnoty se liší. Simulace BezpecnaVzdalenostVedeniSimulace.astro už metry
   také neuvádí, takže na stránce není rozpor.
2. **Práh „od ~50 V se prorazí kůže"** (výklad F8 i F9) nemá oporu ve zdrojovém
   PDF SmartBooks — to dokládá jen odpory kůže 150 000 Ω (sucho) a 2000 Ω
   (vlhko), ne konkrétní napětí. Ponechat, nebo upravit?
3. **Bezpečné napětí „v suchých místnostech 50 V střídavé / 120 V stejnosměrné"**
   také nemá oporu ve zdrojovém PDF — to uvádí jen 25 V ss / 12 V st bez
   rozlišení prostoru. Ponechat, nebo upravit?
   Ověřeno v témž PDF, str. 4: doslova „Nejvyšší bezpečná hodnota
   stejnosměrného napětí podle normy je 25 V a střídavého napětí 12 V" — BEZ
   rozlišení suchých a vlhkých prostor. Rozlišení podle prostoru (50 V
   střídavé / 120 V stejnosměrné v suchu) i práh 50 V pro proražení kůže
   tedy ve zdroji opravdu nejsou; na webu zůstávají, protože podklad je
   útržkovitý a rozhodnutí je na učiteli.
4. Tíže na Jupiteru v simulaci PlanetyVahaSimulace (F6): hodnota 2,36× Země je
   PŘESNÝM přepisem tabulky z prezentace „Síla 6.pptx" (snímek 11, Nezkreslená
   věda: člověk 75 kg → Jupiter 177 kg, Saturn 80 kg). Fyzikální přepočet ale
   dává Jupiter 2,53× (prostý vzorec g=G·M/R²), tedy zhruba o 7 % víc; Saturn
   1,067× sedí. Tabulka v prezentaci je nejspíš zaokrouhlená nebo nepřesná.
   Nechat podle prezentace (žák uvidí totéž co v hodině), nebo opravit na
   fyzikálně přesnou hodnotu? Simulace zatím ZŮSTÁVÁ podle prezentace, jen
   s vysvětlujícím komentářem v kódu (commit 6469422).


> ⤵️ Uzavřené audity/nasazení a stav-snapshot k 19.–22. 8. 2026 (starý řádek 43–524) jsou v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

## 📌 Živé zadání, fronta a reference

> Uzavřená kola a historie jsou v `SAMOSTATNY-REZIM-ARCHIV.md` (přesun 6. 8. 2026,
> nález auditu: 2 379 řádků četla každá session). Sem patří JEN živé věci;
> hotová kola se na konci session stěhují do archivu.

> **Stačí napsat `WONDERLY`.** Znamená to: vezmi první nehotový úkol z fronty níž
> a pracuj samostatně (kontrolor, kotvy, obousměrné ověření, build, push).
> Fronta je JEN tady — ve skillu se o pořadí práce nerozhoduje (viz `~/.claude/skills/wonderly/START.md`).

> **wonderly je JEDEN web, tři sekce — fronta je SPOLEČNÁ pro všechny.** Každá
> položka fronty nese na začátku značku sekce: `[fox]` = web pro 1. stupeň,
> `[skola2]` = lab.wonderly.cz (2. stupeň, tenhle repo — dosud jediný obsah fronty),
> `[cesty]` = cestovatelský deník. Bez značky se nezakládá nová položka.

### 🆕 Nové položky fronty (15. 8. 2026) — cestovatelský deník a příprava

- [cesty] Doplnění starších fotek. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [cesty] Doplnění cest z minulých let. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [příprava] Vyzkoušet průzkumníka přes Hermese na lokálním modelu a porovnat
  výstup s Claude verzí; výsledek zapsat do `METRIKY-KOL.md` do tabulky srovnání
  režimů (řádek režimu B). Tvar volání pro neinteraktivní běh:
  `~/.hermes/hermes-agent/venv/bin/hermes -z "zadání" --provider ollama --model <model>`,
  případně `--provider openrouter --model openai/gpt-5.5`.
  ⚠️ Učitelem uvedený příklad `--model qwen2.5:14b` NEBUDE fungovat — ten model byl
  při úklidu 8. 8. 2026 smazán. Z lokálních je na české texty `gemma4:26b`, na
  kód/dávky `qwen3:30b-a3b`; před spuštěním ověřit `ollama list`.
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md`
  podle prvního měření (viz položka výše). Výchozí tabulka už je zapsaná
  (15. 8. 2026); tahle položka znamená její posun směrem k lokálním modelům tam,
  kde měření ukáže, že stačí.

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### 📥 Nálezy z historie, dosud nevyřešené (přesunuto a otagováno 16. 8. 2026)

- [skola2] Sjednotit odpor lidského těla mezi F8 `ucinky-proudu-a-bezpecnost`
  (100 000 Ω / 1 500 Ω suchá / 1 000 Ω vlhká) a F9 `ucinky-proudu-bezpecnost`
  (150 000 Ω / 2 000 Ω) — žák projde oběma ročníky a dostane dvě čísla pro
  totéž; sjednotit podle F8.
- [cesty] Ručně opravit pořadová čísla u 2 videí na kanálu (přání učitele):
  `u4NmKbMRhiE` a `9Sv4exafb-c` (tvar `01 · DD. MM. · …`) — stroj na ně
  nesahá, titulek psal učitel ručně.
- [cesty] Manifest médií deníku — pro každé místo strojový soupis (zdroje,
  GPS/čas, anonymizace, výběr do galerie/videa, otisk, odkazy); největší
  architektonické vylepšení deníku, samostatné kolo.
- [cesty] Atomická publikace galerií (`nahraj_fotky.py`) — nahrávat do nové
  verze a zveřejnit jedním manifestem, ať výpadek nenechá venku neúplnou galerii.
- [skola2] Typová kontrola (`astro check`) hlásí 5219 chyb — než se zavede
  jako brána, napřed hlášky probrat (samostatný úkol, ne desetiminutovka).
- [skola2] Telemetrii (zdravotní reporty automatů) přesunout do zvláštní
  složky/větve, ať je historie čitelná.
- [skola2] Sjednotit dokumentaci do tří vrstev (až nakonec, je v ní nasbírané
  know-how).
- [skola2] Skript `kontrola_navodu` — deterministická kontrola návodů
  (existence odkazovaných cest, zakázané opsané konstanty, mrtvé křížové
  odkazy); nahradí ruční smyčku po /clear.
- [skola2] Sloučit sandbox testů simulací — 23 kopií prologu (19 rozešlých
  variant, 767 řádků) do sdíleného `testy/sandbox-simulace.mjs` (do kořene
  testy/, NE do simulace/); postup po rodinách s mutací před/po každou.
- [skola2] Rozhodnout: odkazy F9 `chemicke-zdroje-napeti` jsou 4× doslova
  stejné jako u F8 stejného slugu — vada, nebo záměr?

> ⤵️ Starší blok (od původního řádku 235) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- [cesty] **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- [cesty] **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- [skola2] **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
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

### [skola2] ⚡ Nekonzistence bezpečného napětí mezi 8. a 9. ročníkem (zadáno 20. 8. 2026)

Nález nezávislého kontrolora při revizi dávek 7+8 kvízů fyziky 8: `temata.ts:3749`
(8. ročník) uvádí bezpečné napětí ve vlhkých prostorách stejnosměrné **30 V**
(sucho **120 V**), ale `temata.ts:4656` (9. ročník) uvádí obecně stejnosměrné
**25 V**. Sjednotit podle platné normy (rozlišit případně vlhko/sucho i v 9. ročníku,
nebo ověřit, která hodnota je aktuálně správná) — teď se to neopravovalo, jen zapsáno.

### [skola2] 🔒 Rohatka bez klíče tiše projde (zadáno 19. 8. 2026)

Brána `zkontroluj.mjs` čte stropy rohatek z `testy/rohatka.json` vzorem `?? Infinity`.
Když klíč v souboru chybí (překlep, ruční editace, poškozený nebo špatně slitý soubor),
strop se stane nekonečnem a měřidlo **mlčky projde** místo aby build shodilo — zmizí
celá kontrola a nikdo si toho nevšimne, protože build je zelený. Netýká se jen dnes
zavedeného klíče `pocetNaskok10`, ale VŠECH stropů v souboru, například `pocetNejdelsi`.
Řešení: chybějící klíč má být tvrdá chyba (build spadne s hláškou, který klíč chybí),
ne tiché Infinity — nové rohatky se pak musí zakládat vědomě, ne vzniknout nedopatřením.
Doloženo: nezávislý kontrolor 19. 8. 2026 při kontrole prahu délkové nápovědy — po
odstranění klíče brána skončila exit 0.

### [skola2] 🚴 Appka /tour — automatické přepínání mezi velkými závody (zadáno 4. 8. 2026)

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

### Přestěhováno z FRONTA-UKOLU.md (6. 8. 2026 — sloučení dvou front, nález auditu)

Škola (web):
- [skola2] `zkontroluj.mjs`: počítadlo otázek (`^\s*text:\s*'`) nepočítá starší jednořádkový
  zápis kvízů — jen kosmetika výpisu, opravit regex (nález 28. 7. u F8 tepelná výměna).
- [skola2] Simulace „Rozpálená kolejnice" (dilatační spára, výpočet prodloužení) — F6/F8.
- [skola2] Simulace „Změř to rukou, nebo teploměrem?" (tři kádinky) — F6 teplota.
- [skola2] Generátor příkladů na průměrnou teplotu s grafem (celá čísla) — F6.
- [skola2] Doplnit kompenzátor (expanzní smyčku) do výkladu teplotní roztažnosti.

Deník:
- [cesty] Opravit 8 VAD z auditu webu 29. 7. (datum „červenec 2026" v EN/DE, neklikací
  piny bez JS, překryv pinů roků, atribuce mapy, video bez datové předpony,
  `satisfies` v preklady.ts) — drobné, bez rozhodování.
- [cesty] Připomínky učitele 29. 7.: úvodní mapa roku začíná doma (jižní Čechy) ·
  u karty místa jen jeho vlastní video · fotogalerie u míst 2026 (náhled + zvětšení).
- [cesty] Stará videa a fotky k bodům starších cest (zadání 2. 8., postup
  v `Cestovatelský deník/KE-SCHVALENI.md`) — začít bodem (a): `videa_k_mistum.py`.

Organizace:
- [skola2] Po sjednocení úložiště modelů znovu ostrý test `graf_local.py` (dva modely).

Čeká na rozhodnutí učitele (přestěhováno tamtéž):
- **Smazat zbloudilé kopie v R2.** V bucketu `wonderly-media` zůstaly dvě kopie na chybném
  klíči `media/fyzika/6-rocnik/teplota/teplotni-roztaznost/polemika-roztaznost-1.mp4` a
  `-2.mp4` (nahrány omylem 16. 8. s prefixem navíc). Správné kopie fungují. Kopie na
  chybném klíči nikdo nečte — smazat? (mazání se neprovádí bez souhlasu)
- **Cloudflare Workers Build dnes jednou spadl bez viditelné příčiny.** 16. 8. 2026
  commit `edb1137` se po pushi na `main` normálně nenasadil (jiné komity ten den se
  propsaly do ~1 minuty, tenhle vůbec). Přes GitHub API zjištěno: check run
  „Workers Builds: wonderly-web" má `conclusion: failure`, ale text chyby nejde
  stáhnout (`Cloudflare Builds API` vrací „Authentication error 10000" — aktuální
  `wrangler` token nemá scope pro Builds API). Lokální `npm run build` přitom prošel
  čistě (469 stránek), takže nešlo o chybu v datech. Obejito ručním
  `npx wrangler deploy` — funguje jako záložní cesta, ale nenahrazuje trvalou opravu.
  Doporučení: podívat se do Cloudflare dashboardu na konkrétní chybu buildu (odkaz
  na build byl v logu agenta) a/nebo doplnit `wrangler` token o Builds scope, ať se
  dá příčina zjistit automaticky příště, místo ručního obcházení.
- [cesty] Referenční tváře 2021 — z kandidátů vybrat a POTVRDIT (přidání tváře = ta osoba
  se přestane rozmazávat, potvrzuje vždy učitel).
- [cesty] Videa, která dostala hudbu až po nahrání na YouTube — nahrát znovu a stará
  skrýt? (YouTube neumí vyměnit soubor.)
- [skola2] Rozhodovací tabulky z 29. 7.: laboratorní práce (12), nové simulace (10),
  UX školy (8).
- [cesty] Rozhodovací tabulka z 29. 7.: mapa+poutavost deníku (14).
- [cesty] 9 videí „k rozhodnutí" — `Cestovatelský deník/KE-SCHVALENI.md`.
- [skola2] Odkaz na video „Teplota a její měření – Fyzika 6" (v soupisu kanálu není).
- [cesty] Návrh: shlukování popisků na úvodní mapě do čtverců („7 míst"), zásah
  do `trasa_uvod.py`, ~1 kolo práce.
- [cesty] **Hudba pod videa podkástů ze Suno** (návrh učitele 16. 8., má předplatné).
  Nerealizováno — vyžaduje přihlášení do jeho účtu Suno a stažení souborů, chce se
  potvrdit rozsah: jen znělka na začátek/konec, nebo podkres celého dílu? Jednotná
  znělka pro celou sérii, nebo jiná ke každému dílu?
  Upřesnění (16. 8.): předplatné Suno Pro, ~2000 skladeb zbývá z 2500/měsíc, komerční
  použití na kanálu povoleno. Cíl A: hudba/podkres pod videa podkastů — čeká se lepší
  kvalita než z lokálního modelu (dosavadní řešení: kreslené animace + ticho/jednoduchý
  podkres, viz [[projekt-animace-podkastu]]). Cíl B: existuje loňská básnička učitele,
  kterou nechal v jiném projektu (repu) přepracovat na písničku — rytmická, svižná;
  potřeba nastavit hlas/styl ve Suno tak, aby to NEZPÍVALY DĚTI (cílovka 2. stupeň,
  dětský zpěv by na ně působil nevhodně/nudně). Pokud se cíl B osvědčí, učitel chce
  zadávat další písničky přímo a přidávat je na web do míst, kde zatím hudba/píseň
  chybí. Realizace čeká, až bude učitel u počítače — přihlášení do Suno účtu a
  stažení výstupů vyžaduje jeho potvrzení v tu chvíli, nejde předschválit dopředu.
- [skola2] **Fahrenheit — formulace.** V dialogu dílu 8 (`teplota-a-jeji-mereni`) zaznělo
  „v anglicky mluvících zemích", reálně se Fahrenheit používá hlavně v USA. Přeformulovat?
- [skola2] **Klementinum — rok.** Sporné číslo (1775 začátek měření vs. 1785/1929 rekord,
  viz otázky výše). V dialogu dílu 8 je zmíněn jen rok 1775 jako začátek měření, sporný
  rekord vynechán. Potvrdit, nebo doplnit správný rok rekordu?
- [skola2] **Přeskoky v pořadí úvodních map videí.** Automat `kontrola_poradi.py`
  dlouhodobě hlásí 8 přeskoků (např. chybí zastávka ballon-d-alsace). Čeká na
  rozhodnutí, jestli se mapy mají předělat.
- [skola2] **Uzemnění — jednosměrná formulace** (viz nález #16). V `temata.ts`
  (~ř. 1196) i v kvízu `kvizy.ts` (~ř. 1574) stojí „Země přijme volné elektrony
  a těleso se vybije" — platí jen pro záporně nabité těleso, u kladně nabitého
  proudí elektrony opačně (ze Země do tělesa). Nový doklad: video dílu 10
  ilustruje právě kladně nabitou cisternu s benzínem, takže obrázek a text si
  u tohoto příkladu odporují (mluvený dialog se pasti vyhnul — mluví neutrálně
  o „odvedení přebytečného náboje"). Návrh: přeformulovat obousměrně na „náboj
  se odvede do země / vyrovná se se zemí". NEOPRAVENO — čeká na rozhodnutí učitele.
- [skola2] **Značení magnetických pólů — N/S vs. S/J (rozpor napříč webem).** Text i kvíz
  značí póly anglicky: `temata.ts` ř. 1121 a 1140, `kvizy.ts` ř. 1453 a 1492 („severní
  (N — north, značí se červeně) a jižní (S — south)", „vycházejí z N a směřují k S").
  Video a dialog dílu 11 ale používají české S = severní (červená) / J = jižní (modrá)
  — všech 13 snímků. Písmeno „S" tak v textu znamená jižní pól a ve videu severní pól,
  tedy přesný opak. Žák, který si pustí video i přečte text, to má proti sobě. Týká se
  i tématu `magneticke-pole` (temata.ts ř. 3885, 3895), nejde o ojedinělý překlep.
  Doporučení: sjednotit na české S/J (běžné v českých učebnicích) a v textu jednou
  větou zmínit, že na koupených magnetech bývá anglické N/S, kde N = severní.
  NEOPRAVENO — jde o volbu konvence, rozhodne učitel. Po rozhodnutí je oprava mechanická
  (text + kvíz, videa už konvenci mají).
- [cesty] **`MISTA.xlsx` otevřený v Excelu** ukazuje starou kopii — zavřít bez ukládání
  (akce pro učitele, ne pro automat).

### [cesty] 🚗 Nápad učitele 6. 8. — zlepšit rozmazávání SPZ (posouzeno, čeká na pokyn)

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
- [skola2] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [skola2] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [skola2] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [skola2] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
- [skola2] **Hermes — sjednocení návodů (audit z noci 29. 7.):** `Omega/dokumenty/HERMES-audit-navodu-2026-07-29.md`
  — Hermes JE nainstalovaný (~/.hermes), návody z 11. 6. a pasáž v OFFLINE-REZIM.md zastaraly.
  Návrh: jeden HERMES-NAVOD.md + pokyn v ~/.hermes/SOUL.md „čti CLAUDE.md/PROGRESS.md" (Hermes
  md soubory pro Clauda číst UMÍ). Rozhodnutí ráno.
- [skola2] **Automatický restart samostatného režimu po obnově tokenů:** šlo by naplánovanou úlohou
  (cron v danou hodinu spustí novou session). Nová trvalá konfigurace → jen se souhlasem.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

> Hotové logy dávek revize starších simulací (22. 8. 2026, 37/37 dokončeno) přesunuty do archivu.

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení (22. 8. 2026)
- Kvíz podtématu `cas-a-jeho-mereni` (F6) rozšířen o úlohu s Ozobotem (obvod, obsah, rychlost) na 26 otázek.


Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


> Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026) a úklid 22. 8. 2026 večer:
> migrace do git fronty `wonderly-fronta/prijate/` ověřena hotová (soubory
> `cesty-9-fotek-saint-sauveur-uklid.md`, `cesty-poloha-zastavky-po-uklidu-zhrubne.md`,
> `cesty-kontaktni-list-anonymizace.md` tam existují) — znění přesunuto do archivu,
> nové položky zakládat jen ve `wonderly-fronta`.

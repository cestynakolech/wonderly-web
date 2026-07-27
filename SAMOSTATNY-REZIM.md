# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩ KDE POKRAČOVAT (27. 7. 2026)
Hotovo 33 kol (38 simulací, 347 kvízových otázek, 37 videí). Vytěženo:
„SVĚTELNÉ JEVY 7" celá, z „Fyzika opakování rok 6" čtení stupnice (30)
i převody jednotek (31), „Dráha puzzle" jako simulace ozobota (32),
kvízy F6 dorovnány na nové učivo (33).
DALŠÍ KOLO (34): zbývají prezentace F6 **„Stavba látek" (snímky 4+) a „TEPLOTA"
(snímky 2–10)** — obojí jsou jen obrázky bez textu, takže je nutné je otevřít
přes vision (skill pptx nebo export snímků) a najít, co web ještě nemá.
**Doporučeno začít v ČERSTVÉ session** — obrázky spotřebují hodně kontextu.
Pozn.: dilatační spáry a mosty už výklad `teplotni-roztaznost` obsahuje, chybí
jen kompenzátor (expanzní smyčka) na potrubí — malý doplněk, ne celé kolo.
Dále: média k Fyzice 6 (infografiky/písně).
POZOR na past: v SVG souřadnicích musí být desetinná TEČKA (funkce cz() dělá
českou čárku pro text — v points/atributech ji nepoužívat!).
POZOR 2 (27. 7.): snímkování náhledového panelu (`computer screenshot`) vracelo
prázdné plátno i po 3 pokusech, ačkoli stránka byla vykreslená. Spolehlivější
náhrada: vytáhnout souřadnice z vykresleného SVG přes `javascript_tool`
a ověřit je výpočtem (vzdálenost bodu obrazu od odražených paprsků), snímek
stavu pak poslat učiteli jako samostatné SVG.
ČEKÁ NA UŽIVATELE: odkaz na video „Teplota a její měření – F6" (není v soupisu
kanálu) → pak vložit k F6 teplota-a-jeji-mereni.
Spouštění: /wonderly + /loop, kola hned za sebou. Vše ostatní viz fronta níže.

**Povolování akcí (27. 7.):** odklikávání vyřešeno vrátným
`Omega/skripty/povoleni_hook.py` (PreToolUse hook) — povolí vše kolem projektu,
ptá se jen na černou listinu (mazání, přesuny, worker.js, publikace ven, platby).
Platí též: **ZADÁNÍ = SCHVÁLENÍ** (kroky plynoucí z požadavku se neschvalují znovu).
Když se dotaz na běžnou práci přesto objeví → opravit vrátného, ne allowlist.

_Na začátku kola PŘEČTI, na konci AKTUALIZUJ a commitni. Postup: skill /wonderly, sekce „Samostatný režim"._

## Fronta nápadů (seřazeno podle priority)

### Kandidáti na simulace (z auditu temata.ts, 23. 7. 2026)

### Další úkoly
- [ ] Média k Fyzice 6 (infografiky/písně/videa z YouTube automatu — dosud nedodělané)
- [ ] Projít prezentace /Users/Shared/Škola/6/ — DOKONČIT: zbývá „Stavba látek" (snímky 4+ bez textu — jen obrázky), „TEPLOTA" snímky 2–10 (obrázky), „Dráha puzzle", „Fyzika opakování rok"; z „Síla 6" zpracována tabulka planet (kolo 15)
- [ ] Projít prezentace /Users/Shared/Škola/7/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/8/ — dtto
- [ ] Projít prezentace /Users/Shared/Škola/9/ — dtto

## Čeká na odkliknutí (uživatel schválí, až bude u počítače)
(zatím nic — nové typy akcí sem zapsat a pokračovat dalším úkolem)

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)
(zatím nic — pravidlo: po 3 neúspěšných pokusech změny vrátit, sem zapsat co selhalo a co bylo vyzkoušeno, a vzít další úkol z fronty)

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení
- 2026-07-27 (kolo 33): **Kvízy F6 doplněny o učivo nových simulací** (+15 otázek, celkem 347):
  délka 16→21 (hodnota dílku, dělí se MEZERAMI ne čárkami, nula stupnice u začátku tělesa,
  2,5 dm = 25 cm), hmotnost 13→18 (směr převodu — na menší jednotku číslo roste, dag, mg, t),
  čas 15→20 (obvod = dráha robota × obsah = plocha uvnitř, délka dráhy z dílků, rychlost 80 cm
  za 20 s, 2,5 min = 150 s, 0,5 dne = 12 h). Všech 12 výpočtů ověřeno, správná odpověď vždy
  první, každá otázka má vysvětlení. Pravidlo z METRIKY-KOL: co přidá simulace, musí umět
  i kvíz.
- 2026-07-27 (kolo 32): **OzobotSimulace** — dráha ozobota (F6 cas/cas-a-jeho-mereni, dle zadání
  praktické hodiny „Dráha puzzle.pptx" ze složky 6/05 Čas): obdélníková dráha ze stavebnicových
  dílků, posuvníky rozměrů, délky dílku a naměřeného času; počítá obvod (= dráhu), obsah (plocha
  uvnitř, po které robot NEjede — právě tady děti chybují) a rychlost v cm/s, m/s i km/h. Značky
  start / zrychlit / zatáčka / zpomalit / cíl přesně podle zadání. Robot objede obvod právě za
  nastavený čas. Ověřeno: 4 sady výpočtů přesně, dráha ověřena výpočtem (rohy sedí, pohyb spojitý
  max skok 0,9 px, za kolo ujede 920 px = přesně obvod). **Poznatek:** náhled běží jako skrytá
  záložka (`visibilityState: hidden`), takže `requestAnimationFrame` se NEVOLÁ vůbec (0×/s) —
  animované prvky proto vždy umístit i staticky (robot stojí na startu), jinak nejsou vidět.
- 2026-07-27 (kolo 31): **PrevodySimulace** — trenažér převodů jednotek (F6 fyzikalni-veliciny/hmotnost,
  dle prezentace „Fyzika opakování rok 6" snímek 22 — pyramida ·1000 a :1000): žebřík jednotek
  se zvýrazněnou cestou a koeficienty, 4 veličiny (délka, hmotnost, objem a schválně i **čas**
  s nedesítkovými převody, kde děti chybují nejvíc), psaní odpovědi, rozpoznání typické chyby
  („máš to obráceně — jdeš na menší jednotku, číslo musí být větší"), tlačítko „Ukázat postup",
  skóre na první pokus. Zadání jsou školní čísla (2,5 dm; 7500 kg; 150 s) — generátor volí hezký
  výsledek a dopočítá zadání, přijme jen dvojici s max 2 desetinnými místy v rozsahu 0,1–10000.
  Skloňuje se „den" (0,5 dne × 2 dny × 6 dnů). Ověřeno 320 příkladů: 0 chyb ve vyhodnocení,
  0 ošklivých čísel, 52–66 různých zadání na veličinu. Celkem 37 simulací.
- 2026-07-27 (kolo 30): **StupniceSimulace** — čtení stupnice měřidla (F6 fyzikalni-veliciny/delka,
  dle prezentace „Fyzika opakování rok 6": snímek 16 měřidla a rozsah, snímek 19 odměrný válec
  250 − 200 = 50 ml, 10 dílků → 5 ml): tři měřidla (pravítko s tužkou, odměrný válec s vodou,
  teploměr), náhodně generovaný příklad ze 6 variant, dva kroky — nejdřív hodnota nejmenšího
  dílku, teprve pak odečet hodnoty (2. krok se odemkne až po správné odpovědi na 1.). Distraktory
  jsou typické chyby (dílek = rozestup popsaných čárek; přehlédnutá polovina dílků), hláška
  vysvětluje postup i zápis (l = 112 mm). Ověřeno: všech 6 variant počítá správně, zamykání
  2. kroku 12/12, hodnota nikdy nepadne přesně na popsanou čárku, geometrie scén ověřena
  výpočtem (voda a rtuťový sloupec stoupají vzhůru). Celkem 36 simulací.
- 2026-07-27 (kolo 29): **ZrcadloSimulace** — kulová zrcadla (F7 zrcadla-a-cocky/kulova-zrcadla-dute-zrcadlo,
  dle prezentace „SVĚTELNÉ JEVY 7" snímky 39–51): duté i vypuklé, posuvník vzdálenosti předmětu
  a **poloměru křivosti r** (ukazuje vztah f = r/2), tři význačné paprsky (rovnoběžný → do ohniska,
  vrcholový → souměrně podle osy, středový → sám po sobě), zobrazovací rovnice a zvětšení,
  čárkovaná prodloužení u zdánlivého obrazu, popis obrazu s praxí (zrcadlový dalekohled a solární
  elektrárna / stínítko / reflektor auta / kosmetické zrcátko / dopravní zrcadlo).
  Ověřeno výpočtem (a=30, r=20 → a′=15 cm, Z=0,5; a=15 → 30 cm, Z=2; a=6 → −15 cm zdánlivý 2,5×;
  vypuklé −7,5 cm, Z=0,25) i ze skutečně vykresleného SVG (odchylka paprsků od bodu obrazu 0,01 px,
  středový paprsek prochází přesně bodem S, rovnoběžný přesně ohniskem F). Celkem 35 simulací.
  Vedlejší výsledek kola: **vrátný povolení** (viz hlavička) — učitel přestal odklikávat rutinní kroky.
- 2026-07-27 (kolo 28): **CockaSimulace** — zobrazení čočkou (F7 zrcadla-a-cocky/opticka-cocka,
  dle prezentace „SVĚTELNÉ JEVY 7" snímky 28–34): spojka i rozptylka, posuvníky vzdálenosti
  předmětu a ohniskové vzdálenosti, tři význačné paprsky, zobrazovací rovnice 1/f = 1/a + 1/a′
  a zvětšení, popis obrazu (fotoaparát / dataprojektor / lupa / kukátko), čárkovaná prodloužení
  u zdánlivého obrazu. Ověřeno výpočtem (a=24, f=8 → a′=12 cm, Z=0,5; rozptylka a′=−6 cm,
  Z=0,25 — všechny tři paprsky se protínají přesně v bodě obrazu) i vizuálně ve všech režimech.
- 2026-07-27 (kolo 27): **TlakSimulace** — p = F/S (F7 tlak-v-kapalinach/tlak, dle prezentace Mechanické vlastnosti kapalin 7): postava na sněhu, posuvník hmotnosti, sněžnice/boty/podpatky → boření dle tlaku (1,5 kPa / 15 kPa / 1,5 MPa při 60 kg — ověřeno). Panel náhledu blokován jinou session → ověřeno curl.
- 2026-07-27 (kolo 26): **Příklady transformátoru + bezpečné vzdálenosti** (z Elektřina 9.pptx): 2 řešené příklady (500/100 závitů → 40 V; 100/500 → 1000 V, ověřeno) na transformator; tabulka bezpečných vzdáleností od vedení (7–25 m dle kV) na ucinky-proudu-bezpecnost. Analýza Ollamy zapsána do ollama-log.md + paměti.
- 2026-07-27 (kolo 25): **Nové podtéma Vesmír a galaxie** (F9 energie-a-vesmir, dle prezentace 9 vesmir_a_jeho_vznik): velký třesk v 6 krocích (13,8 mld let, atomy po 380 000 letech), galaxie a tvary, Mléčná dráha (spirální s příčkou, ~100 000 ly), rudý posuv + Hubbleův zákon; kvíz 10 otázek; k sluneční soustavě 2 ČESKÁ videa (Petr Němec, fyzika 9 ZŠ — z prezentace, jazyk ověřen přes oEmbed). Build 408 stránek. Pozn.: náhled. panel blokován jinou session (port 8788) → ověřeno curl na živém webu.
- 2026-07-26 (kolo 24): **PraceSimulace** — „Koná se práce?" (F8 mechanicka-prace, dle prezentace 8 Mechanická práce): 5 situací s tipováním ANO/NE (činka/držení/taška/kolo z kopce/bedna) + kalkulačka W = F·s (příklad z hodiny 50 N · 1 m = 50 J). Bimetal NEdělán — TeplomerSimulace ho už má. Sporná formulace snímku 3 („rovnoměrný pohyb = žádná práce") → kontrola-podkladu-fyzika8.md, na webu korektně.
- 2026-07-26 (kolo 23): **33 školních YouTube videí na stránky** — hromadné vložení neveřejných videí z kanálu učitele (soupis stara-videa-roztrideni.md) do materiálů 26 podtémat F7/F8/F9 (páka, Pascal, hydrostatika, optika, transformátor, elektromotor, polovodiče, jádro atomu, radioaktivita…). Skript vloz_videa.js (přeskakuje už vložená ID). Video ze screenshotu „Teplota a její měření – F6" se v soupisu NENAŠLO (jen „Teplo, teplota" = ústřední topení → dáno k F8 teplu) → POZNÁMKA PRO UŽIVATELE: pošli odkaz na video Teplota a její měření, doplním k F6.
- 2026-07-26 (kolo 22): **Příklady z hodiny** (F7 pohyb-a-rychlost/priklady-na-vypocet-rychlosti): 9 příkladů z prezentace Pohyb.pptx s rozklikávacím řešením (details), vč. chytáku letadlo 1 h 18 min (v podkladu snímek 28 chybně 1950 km/h → zapsáno do kontrola-podkladu-fyzika7). Vše ověřeno výpočtem i vizuálně.
- 2026-07-25 (kolo 21): **IzotopySimulace** — izotopy a ionty (F9 jaderna-fyzika/jadro-atomu, dle prezentace „9 Atom, izotopy"): H/He, ±neutron = izotop (protium/deuterium/tritium; He-3/4/5 s rozpadem 10⁻²¹ s), ±elektron = kation/anion, zápis A/Z u značky. Ověřeno vizuálně (tritium-kation ³₁H⁺). Tím z prezentace „9 Atom" vytěženo vše podstatné.
- 2026-07-25 (kolo 20): **Modely atomu + radon v domě** (z prezentace „9 Atom, izotopy"): historie Dalton 1803 → Thomson 1897 → Rutherford 1911 → Bohr 1913 → kvantový na jadro-atomu; sekce „🏠 Radon v domě" (měření/větrání/utěsnění) na radioaktivita. Ověřeno vizuálně v lokálním náhledu. Z prezentace zbývá: izotopy vodíku (protium/deuterium/tritium) — případně jako rozšíření jadro-atomu.
- 2026-07-25 (kolo 19): **MesicSimulace + zatmění** (F7 stin-faze-mesice, dle složky prezentací „20 Stín, fáze Měsíce, zatmění"): stínový kužel Země, při 172–188° zatmění Měsíce (kotouč zčervená, hláška o pozorování okem a náklonu dráhy), u novu upozornění na zatmění Slunce (jen s brýlemi).
- 2026-07-25 (kolo 18): **Historie hodin na stránce Čas** (F6 cas/cas-a-jeho-mereni) z prezentace „,.pptx": časová osa Egypt → klepsydra → přesýpací → orloj 1410 → Huygens 1656 → atomové 1949 + GPS/UTC + Greenwich. 2 chyby podkladu (1655→1656; 1328→14. stol.) zapsány do kontrola-podkladu-fyzika6.md.
- 2026-07-25 (kolo 17, na přání učitele): **obrázky k atomům** — 2 AI infografiky (FLUX.2 Klein lokálně) na atomy-a-molekuly: model atomu (jádro + elektrony) a molekuly vody (přesně 2 H — 1. pokus měl 3–4 vodíky, zamítnut vizuální kontrolou, 2. pokus OK). Bez textu v obraze.
- 2026-07-25 (kolo 16): **AtomMolekulySimulace** — atom a molekuly (F6 latka-a-teleso/atomy-a-molekuly), podle animace atomu z prezentace „Stavba látek" (video media1.mov — NEpřevzato kvůli autorským právům, postaveno vlastní): animovaný atom H/He/C/O (jádro + elektrony po slupkách) + stavebnice molekul H₂/O₂/H₂O/CO₂/NaCl s rozlišením prvek × sloučenina.
- 2026-07-25 (kolo 15): **PlanetyVahaSimulace** — „kolik bys vážil na jiných planetách" (F6 sila/gravitacni-sila) podle tabulky z prezentace učitele „Síla 6.pptx" (75 kg → Měsíc 12,4, Jupiter 177…): posuvník hmotnosti, 10 sloupců, klik = detail; zdůrazněno hmotnost se NEMĚNÍ × gravitační síla ano. Koeficienty ověřeny proti tabulce i výkladu (Měsíc ~6×).
- 2026-07-24 (kolo 14): **ValecSimulace** — odměrný válec (F6 fyzikalni-veliciny/objem): nalij vodu (V₁), vhoď kámen/matici/kuličku → V₂, objem = V₂−V₁ v cm³; oko u hladiny, stupnice po 10 ml. TÍM VYČERPÁNA FRONTA SIMULACÍ z auditu — dál prezentace a média F6.
- 2026-07-24 (kolo 13): **ElektrovaniSimulace** — elektrování těles (F6 elektrina-a-magnetismus/elektricke-vlastnosti-latek): tření o hadřík (plast −, hadřík + — obě tělesa!), posuvník vzdálenosti, papírky přiskakují dle f~q/d², vybíjení. Ověřeno výpočtem prahů.
- 2026-07-24 (kolo 12): **OhrevSimulace** — křivka ohřevu vody (F8 teplo-a-zmeny-skupenstvi, NA OBOU stránkách tani i var): 1 kg ledu −20 °C → var, kádinka (led taje, bubliny, pára, klesající hladina) + graf s prodlevami při 0 a 100 °C; hodnoty dle výkladu (332 / 2260 kJ/kg, c 2,1 / 4,2). Ověřeno výpočtem lomů křivky.
- 2026-07-24 (kolo 11): **SoustavaSimulace** — sluneční soustava (F9 energie-a-vesmir/slunecni-soustava): 8 planet se skutečnými poměry dob oběhu (Kepler T²=a³ ověřeno), rychlost času 1 s = 2–200 dní, klik na planetu = údaje (druh, AU, oběh, zajímavost), Saturn s prstencem. Vzdálenosti stlačené (přiznáno v textu).
- 2026-07-24 (kolo 10): **RozpadSimulace** — poločas rozpadu (F9 jaderna-fyzika/radioaktivita): 400 náhodně se rozpadajících jader, graf skutečnost × teoretická křivka (½)^(t/T), hlášky po poločasech, srovnání uran/radon. Ověřeno Monte Carlo testem (204/400 po 1T).
- 2026-07-24 (kolo 9): **TransformatorSimulace** — transformátor (F9 indukce-a-stridavy-proud/transformator): cívky na společném jádře, posuvníky N₁/N₂ (závity se kreslí), U₂ = 230·N₂/N₁, transformace nahoru/dolů, proud opačně. Ověřeno výpočtem (23–1150 V).
- 2026-07-24 (kolo 8): **ZapojeniSimulace** — sériové × paralelní zapojení (F8 elektrina, NA OBOU stránkách zapojeni-spotrebicu-za-sebou i vedle-sebe): 2 žárovky s jasem dle výkonu, posuvníky R₁/R₂, rozdělení U (série) vs. I (paralel), tlačítko „přepal žárovku 1" (řetěz zhasne × zásuvky svítí). Ověřeno výpočtem.
- 2026-07-24 (kolo 7): **VlneniSimulace** — kmitání a vlnění (F8 zvuk/kmitani-a-vlneni): příčná vlna na laně + podélné vlnění (zhuštění/zředění), posuvníky f a amplitudy, λ = v/f se zeleným měřítkem, červená částice kmitá na místě. Ověřeno výpočtem (fázový rozdíl přes λ = 2π).
- 2026-07-24 (kolo 6): **HydrostatikaSimulace** — hydrostatický tlak (F7 tlak-v-kapalinach/hydrostaticky-tlak): potápěč 0–30 m, tlakoměr p=h·ρ·g, šipky tlaku ze všech stran, přepočet na atmosféry. Ověřeno výpočtem.
- 2026-07-24 (kolo 5): **MesicSimulace** — fáze Měsíce (F7 svetlo-a-jeho-sireni/stin-faze-mesice): pohled shora (Slunce zleva, osvětlená polovina vždy ke Slunci) + pohled ze Země (tvar fáze, % osvětlení, názvy fází, pomůcka D/C). Ověřeno výpočtem k=(1−cos φ)/2.
- 2026-07-24 (oprava dle uživatele): **LomSimulace** — hustší prostředí vždy DOLE (paprsek z vody jde zdola k hladině); zavedeno trvalé pravidlo realistických scén (paměť simulace-realisticke).
- 2026-07-24 (kolo 4): **LomSimulace** — lom světla (F7 svetlo-a-jeho-sireni/lom-svetla): 4 dvojice prostředí (vzduch↔voda, vzduch↔sklo), Snellův zákon, lom ke/od kolmice, částečný odraz, úplný odraz za mezním úhlem (voda 48,8°, sklo 41,8°). Ověřeno výpočtem.
- 2026-07-24 (kolo 3): **OdrazSimulace** — zákon odrazu (F7 svetlo-a-jeho-sireni/odraz-svetla): posuvník úhlu dopadu (od kolmice!), oblouky α a α', kolmý dopad; druhý režim nerovný povrch = rozptyl (3 paprsky, místní kolmice). Ověřeno výpočtem (odraz vektorově; všechny rozptýlené paprsky míří vzhůru i při α=80°).
- 2026-07-23 (kolo 2): **RychlostSimulace** — rychlost–dráha–čas (F7 pohyb-a-rychlost/rychlost-draha-cas): auto na 500m silnici, rychlost měnitelná za jízdy, živý graf s–t, průměrná rychlost v cíli, převod ÷3,6. Ověřeno výpočtem.
- 2026-07-23 (kolo 1): **OhmSimulace** — interaktivní Ohmův zákon (F8 elektrina/ohmuv-zakon): posuvníky U (0–24 V) a R (20–240 Ω), obvod s animovanými částicemi (rychlost ~ I), ampérmetr, graf I–U s přímkou úměrnosti. Ověřeno výpočtem (rohy dráhy teček, bod grafu 12 V/60 Ω → 0,2 A).

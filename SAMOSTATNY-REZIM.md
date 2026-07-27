# Samostatný režim — stav práce (drží kontinuitu mezi koly)

## ⏩ KDE POKRAČOVAT (27. 7. 2026)
Hotovo 28 kol (34 simulací, 37 videí). DALŠÍ KOLO (29): z prezentace „SVĚTELNÉ
JEVY 7" zbývá **kulová zrcadla** (snímky 39–51) — podtéma kulova-zrcadla-dute-zrcadlo
má bohatý výklad, ale žádnou interakci → simulace dutého/vypuklého zrcadla
(předmět mezi C a F, za C, před F) podle vzoru CockaSimulace. Pak fronta níže.
Náhledový panel (port 8788) je VOLNÝ — simulace ověřovat i vizuálně.
POZOR na past: v SVG souřadnicích musí být desetinná TEČKA (funkce cz() dělá
českou čárku pro text — v points/atributech ji nepoužívat!).
ČEKÁ NA UŽIVATELE: odkaz na video „Teplota a její měření – F6" (není v soupisu
kanálu) → pak vložit k F6 teplota-a-jeji-mereni.
Spouštění: /wonderly + /loop, kola hned za sebou. Vše ostatní viz fronta níže.

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

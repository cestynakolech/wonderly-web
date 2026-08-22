## ROZHODNUTÍ UČITELE 22. 8. 2026 (OTEVŘENÉ ÚKOLY)

1. **Měď vs. hliník ve vedení** — HOTOVO 22. 8. 2026, commit `8c31c26`. Ve výkladu
   i kvízu podtématu `prenos-elektricke-energie` (F9) rozlišeny domácí rozvody
   (měď) od dálkového vedení (hliníková lana s ocelovým jádrem).
2. **Bezpečné vzdálenosti od vedení** — HOTOVO 22. 8. 2026, commit `acd1292`.
   Obrazný smysl vrácen do `ucinky-proudu-bezpecnost` (F9) — výboj může přeskočit
   na velkou vzdálenost, chovat se zodpovědně (nelézt na vagony pod trolejí);
   konkrétní metry záměrně zatím vynechané, viz blok „ČEKÁ NA ROZHODNUTÍ
   UČITELE (23. 8. 2026)" níže.
3. **Energetická hodnota potravin** — NECHAT, brát obecně jako ukázku, že
   existuje; hlavní je ROVNOVÁHA příjem/výdej, ne memorování přesných čísel.
   Drobný úkol: projít text a kvíz podtématu, aby po dítěti nechtěl přesná čísla.
4. **Obecné pravidlo napříč webem:** vše je pro žáky ZÁKLADNÍ ŠKOLY, ne pro
   gymnázia a vědce. Zjednodušené informace jsou v pořádku. Podrobnosti nad
   rámec ZŠ mají být do budoucna NADSTAVBA k rozkliknutí (směr, ne úkol na teď).

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

**AUDIT 22. 8. 2026 (nasazené simulace 9. ročníku):** prověřeno 23 komponent,
0 nálezů, kotva `node testy/vsechny-simulace.mjs` exit 0.

---

**AUDIT 22. 8. 2026 pozdě večer (už nasazené simulace 8. ročníku):** prověřeno
10 komponent teplo/skupenství a elektřina, nalezeno a opraveno 5 vad (4×
nepodložené číslo/tvrzení mimo výklad, hláška zobrazená mimo svůj stav,
oprava zavedla přetečení viewBoxu) — commit `8af0dfc`, nezávislá kontrola
0 nálezů. Nová trvalá kontrola: měření šířky textu proti okraji. Dvakrát
upravené vlastní měřidlo prověřeno mutačním testem, kontroly nezeslábly.
Nedodělek: `testy/nahled-simulace.mjs` neumí `<canvas>` simulace (např.
`ElektrickePoleSimulace`). Další cíl: audit 6., 7., 9. ročníku. Detaily
v PROGRESS.md.

**NASAZENO A OVĚŘENO 22. 8. 2026 večer (dokončení fronty názornosti fyziky):**
povětrnostní mapa (F7 `meteorologie-a-mereni-tlaku`, commit `36259f7`), stejnorodá
a nestejnorodá tělesa (F7 `telesa-stejnoroda-a-nestejnoroda`, commit `bb66548` +
doplnění hustot do výkladu), výpočet rychlosti (F7 `priklady-na-vypocet-rychlosti`)
a třídění těleso vs. látka (F6 `telesa-a-latky`) commitem `65db871`, vzájemné
působení těles (F6 `vzajemne-pusobeni-teles-sila`, commit `11492a7`). **FRONTA
NÁZORNOSTI FYZIKY JE PRÁZDNÁ** (101 podtémat, 92 se simulací, 9 logicky bez —
opakovací shrnutí + `uvod-do-fyziky`). Nástroj `testy/nahled-simulace.mjs`
opraven podruhé (commit `434958a`) — sandbox teď zvládá dynamicky vytvářené
prvky. Další cíl: revize kvality STARŠÍCH simulací týmiž měřítky (obecná
kontrola překryvů, opora čísel ve výkladu). Detaily v PROGRESS.md.

**NASAZENO A OVĚŘENO 22. 8. 2026 odpoledne (blok 4 simulací/oprav):** Klid a pohyb
(F7 `klid-a-pohyb-telesa`, commit `2a31dc9`); bezpečná vzdálenost od vedení
(F9 `ucinky-proudu-bezpecnost`, commit `67af855`); posuvný a otáčivý pohyb
(F7 `posuvny-otacivy-pohyb`) + oprava věcné chyby ve výkladu o trajektoriích, commit `179d699`;
výměna simulace `pusobeni-teles-a-deformace` (F7) — stará dělila podle síly, nová (guma vs.
plastelína) dělí podle materiálu jako výklad, commit `573ebc9`; povětrnostní mapa
(F7 `meteorologie-a-mereni-tlaku`, `PovetrnostniMapaSimulace`, 6 kol kontroly), commit
`36259f7`, curl potvrdil `meteo-svg` na 2. pokusu. Detaily v PROGRESS.md.
**FRONTA NÁZORNOSTI FYZIKY — VYPRÁZDNĚNA 22. 8. 2026 večer** (viz blok nahoře souboru),
starý seznam pěti podtémat je hotový a už neplatí.

**NASAZENO A OVĚŘENO 22. 8. 2026 večer:** Simulace síly jako vektoru F7 (`SilaVektorSimulace.astro`,
klíč `sila-vektor`, podtéma `sila`) — commit `fdb6cd7`, curl potvrdil `sv-f`, `sv-jed`,
`sv-smer-90`, `Fg`. Kontrola 5 kol (chyby: rovnost desetin, skládání sil mimo výklad, tíha
značená „G", mrtvá větev posuvníku, useknutá plaketa u 10/55 kombinací) — poučení do
NAVOD-SIMULACE.md/PRAVIDLA: projet si sám všechny kombinace ovládání před odevzdáním.
`testy/nahled-simulace.mjs` umí `cas=<sekundy>` (snímek po doběhnutí animace), commit `4996115`.
ROZDĚLANÉ: simulace `klid-a-pohyb-telesa` (F7).

**NASAZENO 22. 8. 2026 (blok):** Simulace vlastní vodivosti polovodiče
(`PolovodicVodivostSimulace.astro`) zapojena k `polovodice-vlastni-vodivost` (F9) přes klíč
`polovodic` — kontrolor 0 nálezů, commit `c73087f`, curl ověřil prvky simulace i text
„Vlastní vodivost polovodiče". ROZDĚLANÉ: `SilaVektorSimulace.astro` (F7 síla) — hotová,
čeká na pohled na scénu, kontrolora a zapojení do `temata.ts`, necommitnuto.
**NOVÝ ÚKOL DO FRONTY:** `testy/vsechny-simulace.mjs` neměří nové simulace bez ručního
testu v `testy/simulace/*.mjs` (Dioda, Ozvěna, PolovodicVodivost, RychlostSvetla) — dopsat
testy nebo zviditelnit chybějící pokrytí.
**FRONTA NÁZORNOSTI — SEZNAM NEPLATÍ (viz aktuální stav v bloku nahoře souboru, 22. 8.
odpoledne): klid-a-pohyb-telesa, posuvny-otacivy-pohyb, pusobeni-teles-a-deformace,
meteorologie-a-mereni-tlaku a ucinky-proudu-bezpecnost jsou od té doby hotové.**

**NASAZENO 22. 8. 2026 (blok):** Simulace rychlosti světla (`RychlostSvetlaSimulace.astro`,
„Závod světla") zapojena k podtématu Světlo a jeho zdroje (F7) přes nový klíč interakce
`rychlost-svetla` — nezávislá kontrola 0 nálezů, nasazeno commitem `9f44b1f`, curl na
`skola2/fyzika/7-rocnik/svetlo-a-jeho-sireni/svetlo-jeho-zdroje/` potvrdil prvky simulace
(„Vyšli paprsky", `rs-svg`). Zároveň nasazena oprava bezpečného stejnosměrného napětí ve
vlhkých prostorách (`temata.ts:3772`, 30 V → 25 V, F8 elektřina), týmž commitem; curl na
`skola2/fyzika/8-rocnik/elektrina/ucinky-proudu-a-bezpecnost/` potvrdil „25 V" u bezpečného
napětí, staré chybné 30 V se v textu bezpečného napětí už nevyskytuje. Úkol přesunut ve
`wonderly-fronta` do `hotovo/skola2-nekonzistence-bezpecneho-napeti.md`. Klementinum-rok:
planý poplach, obsah beze změny.

**NASAZENO 22. 8. 2026 (blok):** Nová simulace ozvěny u F8 zvuk (`OzvenaSimulace.astro`,
zapojena do `zvuk-vznik-a-sireni`) — nezávislá kontrola 0 nálezů, nasazeno commitem `9e83f37`,
curl na `skola2/fyzika/8-rocnik/zvuk/zvuk-vznik-a-sireni/` potvrdil prvky simulace („Vyšli
zvuk", „ozvěna", „překážka"). Oprava formulace o Fahrenheitovi (`temata.ts:1005`, 6. ročník
teplota) — „hlavně v USA" místo „v anglicky mluvících zemích", stejným commitem nasazeno a
curl ověřeno; úkol přesunut ve `wonderly-fronta` do `hotovo/skola2-fahrenheit-formulace.md`.
Informatika zůstává zamčená dle `OBSAH-PRAVIDLA.md` bod H — nedotčeno.

**NASAZENO 22. 8. 2026:** Návazný kvíz `kvizy.ts` (teplota-a-jeji-mereni) protiřečil
opravenému výkladu — otázka o Fahrenheitovi měla za správnou odpověď „v anglicky
mluvících zemích". Opraveno na „hlavně v USA" + doplněné vysvětlení, komit `b2b4a97`,
curl na `skola2/fyzika/6-rocnik/teplota/teplota-a-jeji-mereni/test` potvrdil novou
formulaci v JSON dat kvízu, stará zmizela. Zapsáno do deníku chyb (třída
`kviz-protireci-vykladu`).

**AKTUALIZACE 21. 8. 2026 večer (blok):**
1. **Písničky fyziky 26/26 NASAZENO A OVĚŘENO** nezávislým kontrolorem (curl 200 na všech, whisper na živých m4a potvrdil nosná slova). Drobnost: slug `energie-a-vesmir` (podklady měly `zdroje-energie-a-vesmir`) — jen nekonzistence pojmenování, funkčně OK. Záloha 12 WAV: `Omega/rozdelane/pisnicky-audio-f9/`.
2. Mapy Sassenage + Saint-Maurice-sur-Moselle přegenerované (`Omega/rozdelane/mapy-oprava-2026-08-21/`), vizuální kontrola ANO — čekají na zapojení do videí.
3. `graf_local.py` rozšířen o `--fronta` (`python3 ~/Desktop/Omega/skripty/graf_local.py --fronta 3`), otestováno na ostrém úkolu. Dokumentace: `OFFLINE-REZIM.md`, `VYZKUM-ORCHESTRACE-2026-08-21.md`, plán `STINOVY-PROVOZ.md`, `NAVOD-PRO-KOLEGU.md` (poslán i mailem), iPhone: `telegram_hlaseni.py` + `NAVOD-IPHONE.md`.
4. **OTEVŘENÁ OTÁZKA VYŘEŠENA (21. 8. noc):** Mac mini aktivován pro frontu — llama3.1 stažena (4,9 GB, `~/bin/ollama list` potvrzuje), test odpovědi OK ("4"), volné místo po stažení 16 GiB (bylo 20 GiB, dost). `graf_local.py --fronta --na-sucho` na mini proběhl bez pádu (fronta byla prázdná, žádná chyba kontrolora). Mini smí od teď brát úkoly z fronty.
5. Deník chyb: nový záznam „prace-domyslena-mimo-zadani" (smazaná pracovní kopie) — stav „opraveno, ověřeno" (záloha obnovena a přepočítána: 12 souborů).

# PŘEDÁVACÍ STAV 22. 8. 2026 (před /clear, linka písniček v běhu)

**AKTUALIZACE 21. 8. 2026 večer:** Písničky **26/26 HOTOVO** — poslední dávka F9 (Od uhlí ke hvězdám, Síla z jádra, Dobrý sluha zlý pán, Proud si cestu najde, Magnet v pohybu, Ze severu na jih) nasazena commitem `c2027e1`, whisper výběr viz hudba-suno/EVIDENCE.md (dávka 5). Curl na živé m4a se ověřuje po nasazení Cloudflare. Celý cyklus písniček fyziky je uzavřen.


**PÍSNIČKY FYZIKY (rap ze Suno, samoobslužný řetěz — pravidlo v paměti pisnicky-samoobsluzne):**
- NASAZENO (commit 9451e34): F6 Látka a těleso „Z čeho je svět", F7 Jednoduché stroje „Něco za něco", F8 Energie „Nedá se zničit" — curl ověřeno 3/3.
- **DÁVKA 2 ZE SUNO HOTOVÁ** (aktualizace 22. 8.): Síla má směr (F6), Fyzikální veličiny (F6), Síly kolem nás (F7) — 6 WAV stažených v `/tmp/wonderly-workery/pisnicky-kopie/`, evidence `EVIDENCE-davka2.md`, zbývající kredity 2310. **Právě jde na whisper výběr A/B + nasazení** (vzor výběru: `/tmp/wonderly-workery/pisnicky-kopie/VYBER-f7-f8.md`; pak m4a 192k, zápis do temata.ts dle vzoru, build, push, curl).
- TEXTY SCHVÁLENÉ, ČEKAJÍ NA SUNO: pisen-f6-cas.md (Sekunda po sekundě), pisen-f6-teplota.md (Teploměr nelže), pisen-f6-elektrina-a-magnetismus.md (Plus a minus, sever s jihem), pisen-f8-mechanicka-prace-a-vykon.md, pisen-f8-tepelne-motory.md (Teplo na pohyb), pisen-f8-zvuk.md (Ve vakuu ticho), pisen-f8-elektrina.md (U děleno R) — vše v `/tmp/wonderly-workery/` (POZOR: /tmp nepřežije restart Macu — záloha .md je v `~/Desktop/Omega/rozdelane/pisnicky-texty-zaloha/`, po /clear ji udržovat aktuální!).
- V OPRAVĚ: pisen-f8-teplo-a-zmeny-skupenstvi.md (2 nálezy: vedení/proudění/záření není ve výkladu; sůl −20 °C ne −21) — po opravě re-check kontrolorem.
- F9 TEXTY (stav 22. 8.): magneticke-pole (Ze severu na jih) **PROŠLO kontrolou**; elektromagneticka-indukce (Magnet v pohybu) hotová, čeká kontrolu; proud-v-latkach, jaderna-fyzika, zdroje-energie-a-vesmir hotové, čekají na kontrolu; **píše se energie-a-bezpecnost** (celkem texty hotové 4/6 + 1 po kontrole).
- Postup výroby: Suno Custom (text ze souboru, styl czech rap catchy energetic clear adult male vocal 100 BPM + czech language, Instrumental OFF), stahovat OBĚ varianty WAV do `/tmp/wonderly-workery/pisnicky-kopie/` (NE na Plochu — TCC!), evidence do hudba-suno/EVIDENCE.md. Limit 20 stažení/měsíc od 3. 9.!
- Cíl: všech 26 témat (bez Shrnutí); hotovo 9, tabulka `/tmp/wonderly-workery/pruzkum-pisnicky.md` (kopie v záloze).

**OSTATNÍ V BĚHU 22. 8.:** Kluesserath díly 4–6 se nahrávají (po dokončení: schovat stará ID, přepsat 2026.ts, build, push, oembed+curl — agent na tom pracuje); tep-mini se zapínal na mini (ověřit log); mini disk: Xcode simulátory 136 GB + Deleted Users 31 GB — mazání čeká na učitele; video-kanál z knihovny Fotek postaven, čeká na TCC odklik učitele (příkaz v AUTOMATY.md); NAS Vejhon54 = 192.168.50.226, DSM 7 OK (paměť nas-vejhon54); TCC blokuje agentům Plochu — trvalé řešení: povolit v Nastavení → Soukromí → Soubory a složky.

# 🚀 ČÍM ZAČÍT PO /clear (zapsáno 20. 8. 2026 — TENTO blok platí, starší verze níže neplatí)

### 🆕 ÚKOL (zadáno 22. 8. 2026) — POSÍLIT BRÁNU `testy/uniky.mjs`, měří jen část úniků
Při práci na `prenos-elektricke-energie` (22. 8. 2026) hlásila brána 0 úniků odpovědí, ale
nezávislý kontrolor našel v témž bloku 6 úniků: vysvětlení jedné otázky doslova obsahovalo
správnou odpověď JINÉ otázky téhož bloku (např. vysvětlení „Alternátor má tři cívky = tři
fáze." prozrazovalo odpovědi 'tři' a 'Tři cívky'). Měřidlo tedy porovnává jen některé dvojice,
ne každou správnou odpověď proti všem vysvětlením i zadáním v bloku.
**Úkol:** rozšířit kontrolu tak, aby porovnávala každou správnou odpověď bloku proti VŠEM
ostatním zadáním i vysvětlením (nad naimportovanými daty, ne regexem nad textem), ošetřit
češtinu (`\b` v JS neumí diakritiku) a doplnit obousměrný důkaz do `testy/obousmerne.json`
— bez něj měřidlo shodí build. POZOR na kalibraci na už přijaté práci: nová kontrola nesmí
shodit build kvůli obsahu, který je v pořádku.

**PŘEDÁVACÍ STAV 20. 8. 2026:**
- Kvízy F7, F8, F9 KOMPLET na 21 (nasazeno, poslední commit `8525421`).
- **F6 COMMITNUTA A NASAZENA 21. 8.** (commit `8fb4e0d`, tag `kvizy-fyzika-21-komplet`) —
  celá fyzika 6–9 na cíli 21. Varování kvizy.ts už nemá necommitnuté změny.
- **Tailscale — OPRAVENO 21. 8. 2026 ~0:45.** Příčiny (obě nalezeny a odstraněny): 1) sdílený STROJOVÝ klíč v systémové klíčence (položka `tailscale-machinekey` z 6. 5.) — na mini zálohován (`/var/root/tailscale-keychain-zaloha-2026-08-20.txt`, jen root) a smazán, mini po novém přihlášení = **radek--mac-mini-2 / 100.104.154.38**; 2) na obou strojích běžel zapomenutý démon `/usr/local/bin/tailscaled` 1.96.4 (LaunchDaemon `com.tailscale.tailscaled`) — na obou zastaven a plist/state odsunuty do záloh `*.zaloha-2026-08-2x`. MacBook = **radek--mac-mini-1 / 100.113.130.91** (GUI 1.102.2). KOTVA: ping MacBook→mini pong 8 ms DIRECT (21. 8. 0:44). UZAVŘENO 21. 8. ~1:05: ping ověřen OBĚMA směry (MacBook→mini 5–8 ms, mini→MacBook 4 ms, vždy direct); učitel v konzoli smazal oba mrtvé řádky → tailnet má PŘESNĚ 2 stroje (macbook-pro-2 100.113.130.91, radek--mac-mini-2 100.104.154.38); starý démon na obou strojích odstaven (pgrep prázdný). Dokončeno i volitelné: mini přejmenováno na mac-mini (tailscale set --hostname, ověřeno statusem) a test přes hotspot iPhonu PROŠEL 21. 8. ~1:30 (MacBook na 172.20.10.5, ping mini 6/6 za 53–73 ms přes DERP relay nue) — spojení funguje přes internet. Tailscale KOMPLETNĚ HOTOVO. Pozn.: e-mailová komunikace obou Claudů funguje; vyhledávání podle subjectu zaostává, hledat `in:inbox newer_than:…`.
- **Propojení Maců — krok 2 a SSH hotové (21. 8. ~1:45):** Rozhodnutí učitele: **fronta přes git** — založeno privátní repo github.com/cestynakolech/wonderly-fronta (složky prijate/pripravene/bezi/na-shlednuti/hotovo/odlozeno, SABLONA-UKOLU.md; lokálně ~/Desktop/wonderly-fronta, první commit 68b8675). **SSH MacBook → mini FUNGUJE**: `ssh radek_soukromy@100.104.154.38` (klíč ~/.ssh/id_ed25519, bez hesla; hostname Radek--Mac-mini) — na mini lze pracovat přímo, e-mailový most mezi Claudy už není nutný (sudo akce dál zadává učitel). SSH je OBOUSMĚRNÉ (21. 8. ~1:55, okruh MacBook→mini→MacBook vrátil MacBook-Pro-2.local; klíče vyměněny, Remote Login zapnut na obou). Další kroky plánu (PLAN-ZITRA.md: zapojit mini jako pozorovatele, přesun lehkých automatů).
- **Písničky nasazeny 21. 8. ~9:45:** tři vítězné varianty B (Suno) převedeny na m4a a zapojeny do temata.ts — F6 „Z čeho je svět“ (telesa-a-latky), F7 „Něco za něco“ (jednoduche-stroje-paky), F8 „Nedá se zničit“ (energie-a-jeji-premeny). Build prošel, nasazení ověřeno curl.
- Qwen 3.8: nepřijat a smazán (verdikt v `ollama-log.md`), vision zůstává ThinkingCap.


**FYZIKA 9 JE KOMPLETNÍ (kvízy 22/22 podtémat na 21 otázkách)** — spolu s F7 a F8 tak
**cíl 21 otázek splňuje celá fyzika 7, 8 i 9**. Zbývá jen **fyzika 6 (88 chybějících otázek)**,
pak případně informatika/Pč (rozhodnutí učitele „teď jen fyzika" zatím platí). Otevřeno:
nesoulad bezpečných napětí F8×F9 (ve frontě, viz níže).



1. **Díl 15 `pololetni-shrnuti` fyziky 6 se PŘEPRACOVÁVÁ OD ZAČÁTKU.** Učitel rozhodl: v polemikách
   se **MAREK plete a EVA ho opravuje** (dřív to bylo naopak). Pravidlo je zapsané do obsahové ústavy,
   skillu `/podkast-video` i do zadání workerů. **Zvuk i videa se vyrábějí ZNOVU** — staré díly se
   nepředělávají, tohle je jen díl 15. **NENASAZOVAT bez nezávislého kontrolora.**
   **ODLOŽENO 21. 8. 2026** — scénáře všech 4 částí přepsané na nové pravidlo (MAREK se plete,
   EVA opravuje) ✅, ale nový zvuk má 55 vadných replik a přegenerování selhalo všemi přístupy
   (oprava ref_text v pomocném skriptu → jen 2/31; jiné seedy; dělení vět; syntéza na CPU → 0/5,
   čili nejde o MPS bug). Vada je v samotné syntéze OmniVoice na těchto replikách. Celá historie +
   doporučení: `~/Desktop/Omega/rozdelane/dil15-prepracovani-doklad.md` (ZÁVĚR). Čeká na
   rozhodnutí učitele: nová verze OmniVoice / jiný lokální TTS / zkusit jindy. Videa se
   nerenderují, nenasazuje se.
2. **ROZHODNUTÍ, KTERÁ ČEKAJÍ NA UČITELE** (zeptat se hned na začátku, blokují práci):
   a) přegenerovat nasazená videa `skupenstvi-latek-dialog`, `6/objem-dialog` a
      `6/souhrnne-opakovani-velicin-dialog` (vyrobena vadným měřítkem px→cm)?
   b) povýšit ollamu 0.32.9 → ≥ 0.32.12 (bez toho nemá zkouška Qwenu 3.8 smysl)?
   c) napsat Petru Němcovi o svolení k jeho 13 videím?
   d) sjednotit `s_pevna_tvar_objem` (17 px/cm) na `PX_NA_CM = 25` (stejná úprava jako u `snimky_podkastu.py`)?
   e) zpřísnit práh délkové nápovědy v `zkontroluj.mjs` (dnes hlídá až rozdíl 15 znaků, kontrolor
      19. 8. našel těsný případ, který prošel)?
3. **`VrhSimulace.astro` je OPRAVENÁ** (commit `dfd800e`) — počítá v metrech a sekundách,
   dolety sedí s teorií na 0,2 %. Nález uzavřen, viz sekce fyzikálních jednotek níže.
4. **Popisy prezentací fyziky 6 jsou KOMPLETNÍ** (6 nových, ověřeno proti obsahu) — blokáda
   fyziky 6 tím padla. **Běží dávka na ostatní ročníky** (7. ročník má 23 prezentací) — její
   soubory nechat být. ⚠️ Napřed dořešit `num_ctx` (nález níže), hotové popisy může být
   potřeba předělat. **UZAVŘENO 21. 8. 2026** — viz nález níže, přegenerování se neprokázalo.
5. **Dorovnání kvízů na 21 otázek** — pokračovat dál (stav a podněty níže).
6. **Před každou obsahovou prací přečíst `~/Desktop/wonderly-web/OBSAH-PRAVIDLA.md`** (obsahová
   ústava, závazná) — a pravidlo z ní vždy vložit i do zadání workera, jinak pro něj NEPLATÍ.
7. **Úspora kontextu je zavedená:** agenti mají strop **1 500 znaků** odpovědi, do sdílených
   souborů zapisuje **výhradně exekutor**, historie PROGRESS/SAMOSTATNY je v archivech.
8. Deník až po fyzice: 20. 8. nahrát Trittenheim (vyčerpaná kvóta), pak výměna Kluesserath
   3 → 6 dílů — přesný postup v sekci `[cesty]` níže. **21. 8. ráno nahrány 1z6–3z6**
   (`MV5BFF8COBk`, `5toR6xwKrAU`, `YXHB2UC7-Aw`), kvóta vyčerpána → 4z6–6z6 na 22. 8.
9. **20. 8. odpoledne (jen na wifi):** zkouška modelu Qwen 3.8 — `python3 ~/Desktop/Omega/skripty/zkouska_qwen38.py --zkouska`.
10. **KONTROLA FYZIKÁLNÍCH JEDNOTEK NA CELÉM WEBU** (zadáno učitelem 19. 8. 2026) — projít
    všech ~122 simulací, kreslicí skripty podkástů i texty výkladu a ověřit, že každé číslo
    ukazované dítěti s jednotkou (m, s, N, °C, m/s…) vzniklo z FYZIKÁLNÍHO výpočtu, ne
    z pixelů nebo snímků. Podrobné zadání v sekci `[skola2]` níže — začít se dá hned,
    nečeká na nic.
11. **Plán propojení dvou Maců — rozhodnout zítra (20. 8. 2026).** Vznikly tři nezávislé
    návrhy architektury (Mac mini 24 GB 24/7 jako řídicí stroj + MacBook 64 GB jako výkonný,
    starý Intel MacBook ve škole, iPad a iPhone). Porovnání a doporučený jeden plán jsou
    v `~/Desktop/Omega/dokumenty/PLAN-ZITRA.md`, zdrojové návrhy tamtéž (`PLAN-DVA-MACY.md`,
    `KONCEPT-ZELENA-LOUKA-A.md`, `KONCEPT-ZELENA-LOUKA-B.md`). Hlavní zjištění: Tailscale je
    ROZBITÝ — tři zařízení ve výpisu jsou tři identity téhož MacBooku, mini v síti není
    (oprava je první krok); návod `~/Desktop/Omega/navody/tailscale-oprava-duplicitni-identity.md`
    obsahuje CHYBU (adresa 100.114.89.73 patří MacBooku, ne mini); na mini (24 GB) se
    z dnešních modelů vejdou jen `bge-m3`, `qwen3:8b` a `llama3.1` (~11 GB), modely od
    17 GB výš musí zůstat na 64GB stroji. První rozhodnutí učitele: fronta práce přes git,
    nebo přes sdílenou složku — mění to všechno ostatní.

---

# 🧭 STAV K 19. 8. 2026 (uzávěrka dlouhé session, před /clear)

> Obojí repo (`wonderly-web`, `Omega`) je commitnuté a **pushnuté**, internet funguje.

## [skola2] Školní web — fyzika

**HOTOVÉ A NASAZENÉ 19. 8. 2026:**
- **Placená výroba zvuku ZRUŠENA** — zarážka v obou skriptech (OpenAI TTS i ElevenLabs), pravidlo přepsané všude. Ověřeno, že lokální OmniVoice funguje (díl 15 část 1, hlasy změřené F0), **učitel hlas SCHVÁLIL**.
- **Odstraněno 41 cizích videí** ze školního webu (39 vložených + 2 vedená jako odkazy). Na webu zůstalo jen **50 videí učitele**.
- **Brána proti cizím videím**: `testy/cizi-videa.mjs` + seznam schválených ID `testy/youtube-vlastni.json` + doplňovač `testy/youtube-schval.mjs`. Zapojena do `zkontroluj.mjs` → **neschválené ID shodí build**, funguje offline, obousměrně doložená.
- **SMAZÁNY (ne opraveny) všechny pokyny k vyhledávání videí** — z `worker-media`, skillů, pamětí i fronty. Záloha smazaných textů: `~/Desktop/Omega/rozdelane/smazane-pokyny-vyhledavani-videi.md`.
- **Nasazeno 12 vlastních animací k výkladu fyziky 6** (ležely hotové na disku bez popisků). Opravena past ve `Omega/skripty/animace_na_web.py`.
- **Měřidlo úniků `testy/uniky.mjs`** porovnává čísla i s jednotkou, známé meze sepsané → odhalilo a opraveno **8 skutečných úniků** v datech.
- **Kvízy:** F7 `kladka` + `naklonena-rovina` 10 → 19; F8 `teplo-a-zmeny-skupenstvi` (4 podtémata) 12 → 18. Opraveny **3 starší otázky**, které testovaly mimo výklad (otázka o kroupách odporovala výkladu).
- Opraven hlídač automatů `Omega/skripty/hlidac_zaseknuti.py` (považoval vlastní `grep` za běžící automat → mohl umlčet poplach).
- **ZALOŽENA OBSAHOVÁ ÚSTAVA `~/Desktop/wonderly-web/OBSAH-PRAVIDLA.md`** — řetěz *PDF + prezentace → text výkladu na webu → kvízy, hry, videa*. Zapojená do zadání všech workerů a skillů. Plné znění nikam neopisovat, jen odkazovat.

**⚖️ ROZHODNUTÍ UČITELE Z 19. 8. 2026 (závazná, nediskutovat znovu):**
- **Kvíz: cíl 21 otázek na podtéma.** „5–8 otázek" je jen velikost JEDNÉ dávky workera, ne cíl. Dřívější „medián ~13" byl popis stavu, ne cíl.
- **Prezentace jsou rovnocenný zdroj s PDF** (dřívější „určující je vždy PDF" NEPLATÍ).
- **Chybějící popisy prezentací dopsat automatem PŘED další prací na fyzice 6.**
- **Rozdíl mezi časovým plánem a webem NENÍ vada webu.**
- **Hry mají defaultně nabízet jen probrané učivo** podle časového plánu.
- **Ostatní předměty (informatika, Pč) SE TEĎ NEDĚLAJÍ — jen fyzika.**
- **Na web jen vlastní videa učitele**; u Petra Němce ani odkaz bez jeho svolení (13 jeho videí odstraněno).
- **Hotová videa se nepředělávají**; lokální hlas schválen.

**🔴 ROZDĚLANÉ (běží nebo čeká):**
1. **Díl 15 `pololetni-shrnuti`** — ⚠️ AKTUALIZACE 19. 8. v noci: **PŘEPRACOVÁVÁ SE OD ZAČÁTKU** (nové pravidlo: MAREK se plete, EVA opravuje). Zvuk i videa se vyrábějí ZNOVU. **NENASAZOVAT bez nezávislé kontroly.**
2. ~~Popisy 6 chybějících prezentací fyziky 6~~ — ✅ **HOTOVO 19. 8. v noci**, fyzika 6 už není blokovaná. Běží dávka na ostatní ročníky (7. ročník 23 prezentací).
3. **Nasazení hotových zkontrolovaných podkástových videí** — běží.
4. **DOROVNÁNÍ KVÍZŮ NA 21 OTÁZEK** — číslo 495/82 podtémat bylo zastaralé, viz vyjasnění 19. 8. níže.
   ⚠️ U krátkých výkladů nemusí být z čeho 21 otázek udělat — pak se **hlásí podnět k rozšíření výkladu**, NEobchází se to opakováním téže otázky jinými slovy (obsahová ústava: kvíz smí zkoušet jen to, co je ve výkladu).

   **📏 VYJASNĚNÍ ROZPORU 19. 8. 2026 (naimportovaná data, ne regex nad textem):**
   Staré číslo 495/82 (řádek 57: „jen fyzika") skutečně počítalo POUZE fyziku, ne celý web — proto sedí
   řádově blíž číslu za fyziku samotnou, ne za celý web. Navíc mezitím přibyly otázky (commit `6262f9f`
   elektřina +33, dnešní `7868c64` dorovnání bloků `ohmuv-zakon`, `elektricke-napeti-mereni`,
   `elektricky-proud-v-kovech-odpor` +27), takže 495 je prostě zastaralý otisk, ne chyba filtru.
   **Dnešní přesný stav (PO commitu 7868c64)**, změřeno příkazem nad naimportovanými daty
   (`node -e "import('./testy/data.mjs').then(async({nactiData})=>{...})"`, cíl 21/podtéma):
   - **CELÝ WEB** (fyzika+informatika+prac. činnosti): **891 chybějících otázek, 124 podtémat pod cílem**
     (F6 88, F7 39, F8 165, F9 155, I7 176, I8 163, I9 96, PC6 9).
   - **JEN FYZIKA**: **447 chybějících, 78 podtémat pod cílem** (F6 88, F7 39, F8 165, F9 155).
   ⚠️ AKTUALIZACE 19. 8. odpoledne (commity `7868c64` + `e996a51`, 54 nových otázek u 6 podtémat F8):
   celý web **891 chybějících / 124 podtémat**, jen fyzika **447 / 78**, F8 **138** (číslo v této
   sekci výše je z okamžiku PŘED touto dávkou, dorovnání pokračuje dál).
   Před dnešním dorovnáním (27 otázek do 3 bloků F8 elektřina) bylo naměřeno 918 celkem / 192 u F8 —
   918−27=891 a 192−27=165 přesně sedí, takže rozdíl u F8 (225→192→165) je z přírůstku otázek, ne z chyby měření.
   **Podnět ke kontrole:** brána `zkontroluj.mjs` hlídá délkovou nápovědu až od rozdílu 15 znaků — u otázky
   o multimetru prošla správná odpověď delší jen o 3 znaky. Zvážit zpřísnění prahu (NEUPRAVOVAT bez schválení).
5. **Jediná otevřená otázka ústavy: bod F** (jedno vysvětlení na díl × polemika pokryje celý kvíz) — čeká na učitele.

**⏳ PŘIPRAVENÁ PRÁCE, KTERÁ JEŠTĚ NENÍ ZAPSANÁ DO DAT** (leží v `~/Desktop/Omega/rozdelane/`, stačí vložit do `src/data/kvizy.ts`):
- `kvizy-f8-elektrina.md` — 24 hotových otázek: `elektricke-pole`, `vznik-elektrickeho-proudu`, `elektricke-obvody`, `elektricky-proud-mereni` (každé 12 → 18; do cíle 21 pak zbývá po 3).
- `kvizy-f9-magneticke-indukce.md` — hotové otázky F9 k magnetické indukci.
- `kvizy-f7-jednoduche-stroje.md`, `kvizy-f8-teplo.md` — už zapsané do dat, ponechány jako doklad dávky.
- `smazane-pokyny-vyhledavani-videi.md` — záloha smazaných pokynů (nevracet zpět!).

### 🆕 ÚKOL NA **20. 8. 2026 ODPOLEDNE** — stáhnout a otestovat Qwen 3.8 (JEN NA WIFI)

Připraveno 19. 8. 2026 na mobilních datech, proto se nic nestahovalo. **Termín: 20. 8. 2026 odpoledne**
(12:00–20:00, přání učitele) — a **jen na skutečné wifi**, nikdy na hotspotu z iPhonu (model má ~18 GB).

**Spustit jedním příkazem:**
```bash
python3 ~/Desktop/Omega/skripty/zkouska_qwen38.py --zkouska
```

- Skript: `~/Desktop/Omega/skripty/zkouska_qwen38.py` · návod: `zkouska_qwen38-NAVOD.md` (vedle něj)
- Podklady a zdroje: `~/Desktop/Omega/rozdelane/pruzkum-modelu-2026-08.md`
- Skript se **sám odmítne spustit** mimo odpoledne, na mobilních datech (ověřeno měřením — hotspot
  se podepíše `sname = iPhone` a jede z rozsahu 172.20.10.0/28), při málu místa a na staré ollamě.
  Když si typem připojení není jistý, taky nejede (fail-closed).
- **Doma na wifi napřed jednou:** `python3 ~/Desktop/Omega/skripty/zkouska_qwen38.py --zapamatuj-sit`

**🚧 BLOKUJE TO:** nainstalovaná **ollama je 0.32.9, potřeba ≥ 0.32.12** — MLX varianta na ní nepojede.
Povýšení ollamy je zásah do instalace → **rozhodne učitel**, sám to nedělám. Bez toho zkouška nemá smysl.

**Zkouška = skutečná práce, ne benchmark:** tatáž prezentace `Škola/6/06Teplota/TEPLOTA.pptx`,
měřítko ThinkingCapu z 19. 8. 2026 = **23 snímků / ~10 min / 11 237 B / 0 selhaných popisů**.
Kvalitu rozhoduje **člověk nebo nezávislý kontrolor pohledem na 3 skutečné snímky**, ne model sám.

**⚠️ VEDLEJŠÍ NÁLEZ (platí i bez Qwenu):** `Omega/skripty/popis_prezentace.py` **nenastavuje `num_ctx`**
a `OLLAMA_CONTEXT_LENGTH` není nikde v systému (ověřeno) → jede na výchozích ~4096, které dlouhé
vstupy **tiše ořezávají**. Může nám to ubírat obsah už teď u velkých snímků. Doplnit `num_ctx: 32768`
i do ThinkingCapového volání a jednu hustou prezentaci přepsat nanovo jako důkaz.

**UZAVŘENO 21. 8. 2026** — num_ctx: 32768 je ve skriptu od 20. 8. (commit Omega `358dd81`), důkaz
přegenerováním TEPLOTA.pptx: 11 262 B vs. 11 237 B, jen formulační rozdíly → ořez se neprokázal,
hromadné přegenerování hotových popisů NENÍ potřeba. Zapsáno v DENIK-CHYB.md, commit Omega `fd4af8f`.

### 📝 PODNĚT K ROZŠÍŘENÍ VÝKLADU — `fyzika/8-rocnik/elektrina/elektricky-proud-mereni` (19. 8. 2026)

Dávky 2 a 3 (`Omega/rozdelane/kvizy-f8-elektrina-2.md`, `-3.md`) jsou **zapsané do `src/data/kvizy.ts`**:
`elektricke-pole` 21, `vznik-elektrickeho-proudu` 21, `elektricke-obvody` 21 — hotovo.
`elektricky-proud-mereni` zůstává na **18/21**: ve výkladu (`temata.ts`) už není další netestovaná
látka, ze které by šly poctivě udělat další 3 otázky bez duplicity nebo úniku odpovědi.
Otázky se proto NEVYMÝŠLEJÍ — čeká se na rozšíření výkladu. Navrženo doplnit:

1. **Jméno jednotky ampér a André-Marie Ampère** — analogicky k odstavci o Georgu Simonu Ohmovi
   u podtématu `ohmuv-zakon`. Dá jednu faktografickou otázku.
2. **Praktická volba rozsahu ampérmetru s konkrétními čísly** (např. dva reálné rozsahy přístroje,
   postup „neznámý proud → začít na největším rozsahu a zmenšovat"). Výklad teď říká jen obecně
   „nastavíme rozsah", což už zkouší stávající otázka.
3. **Čtení stupnice / přesnost měření** — ale **POUZE pokud to je v podkladech** (PDF a prezentace
   v `/Users/Shared/Škola/8/`). Když to tam není, tento bod se vynechá.

⚠️ Rozšíření výkladu se musí **opřít o zdrojové podklady učitele** (`/Users/Shared/Škola/8/`),
nesmí se vymyslet — obsahová ústava, kap. 1. Bez doložení v podkladech se bod nedoplňuje
a podtéma prostě zůstane na 18 otázkách (schváleno učitelem 19. 8. 2026).

### 🆕 PŘIBYLO 19. 8. 2026 V NOCI (uzávěrka session)

**HOTOVÉ A NASAZENÉ:**
- **Kvízy fyziky 8, elektřina:** `elektricke-pole`, `vznik-elektrickeho-proudu`, `elektricke-obvody`
  dorovnány na **21 otázek**; `elektricky-proud-mereni` na **18** (na 21 výklad nestačí — podnět
  k rozšíření výkladu je zapsaný níže). Commity **6262f9f** a **17084f4**.
- **Úspora kontextu:** subagenti mají **strop 1 500 znaků** odpovědi, zápis do sdílených souborů
  dělá **výhradně exekutor**, historie `PROGRESS.md` a `SAMOSTATNY-REZIM.md` přesunuta do
  `PROGRESS-ARCHIV.md` a `SAMOSTATNY-REZIM-ARCHIV.md`.
- **Popisy prezentací fyziky 6 jsou KOMPLETNÍ** — 6 nových popisů, ověřeno proti skutečnému obsahu
  prezentací. Tím padla blokáda další práce na fyzice 6. **Běží dávka na ostatní ročníky**
  (7. ročník má 23 prezentací) — do jejích souborů teď nesahat.
- **Přejmenována prezentace** `Škola/6/05 Čas/,.pptx` (uložená omylem pod názvem čárka) na
  **`Čas a jeho měření.pptx`**; stejně přejmenován i její popis
  `Omega/dokumenty/prezentace-popisy/Čas a jeho měření.md` a sjednocena cesta v jeho hlavičce.
  Ověřeno kontrolním součtem SHA-256 před i po (`468411ab…a7c952`, shoda). Evidence
  `Omega/dokumenty/kontrola-podkladu-fyzika6.md` opravena; v archivech zůstává starý název
  jako historický zápis. Schválil učitel.
- **Kostka 170 px → 10 cm** opravena ve `Omega/skripty/snimky_podkastu.py` (oprava je v KÓDU,
  ne v obrázku).

**🔴 NÁLEZY K OPRAVĚ / ROZHODNUTÍ:**
- **`num_ctx` (vážné, opravuje se):** `Omega/skripty/popis_prezentace.py` nenastavoval velikost
  kontextu → model jel na výchozích **~4096 tokenech místo 262144** a dlouhý vstup se **tiše
  ořezával**. Doplňuje se. **Hotové popisy může být potřeba předělat** — ukáže to zkouška
  na husté prezentaci.
  **UZAVŘENO 21. 8. 2026** — num_ctx: 32768 je ve skriptu od 20. 8. (commit Omega `358dd81`),
  důkaz přegenerováním TEPLOTA.pptx: 11 262 B vs. 11 237 B, jen formulační rozdíly → ořez se
  neprokázal, hromadné přegenerování hotových popisů NENÍ potřeba. Zapsáno v DENIK-CHYB.md,
  commit Omega `fd4af8f`.
- **Nasazené video `skupenstvi-latek-dialog` obsahuje CHYBNOU verzi kostky** (oprava je jen
  v kódu) → **čeká rozhodnutí učitele, zda video přegenerovat.** Drobnost k témuž: kostka
  v kulaté misce mírně propadá pod dno.
- `VrhSimulace.astro` OPRAVENO (commit `dfd800e`, potvrzeno 19. 8.) — dolety sedí s teorií
  na 0,2 %. `DifuzeSimulace` a `CaraSimulace` prošly kontrolou 19. 8. bez nálezu, uzavřeno.

### ✅ ÚKOL OD UČITELE (19. 8. 2026) — **fyzikální jednotky, ne vnitřní jednotky programu — HOTOVO**

**ÚKOL:** projít **celý web** a ověřit, že **každé číslo, které se dítěti ukazuje s fyzikální
jednotkou** (m, cm, s, N, °C, m/s, km/h, ml…), skutečně **vzniklo z fyzikálního výpočtu**, a ne
z pixelových souřadnic na plátně nebo z počtu snímků animace.

**VÝSLEDEK (19. 8. 2026, doloženo):** prošlo se všech **98 simulací s fyzikální jednotkou**
(z 118 komponent v `src/components/skola2/`), 5 nezávislých kontrolorů. Jediná vadná:
**`OerstedSimulace`** — výchylka magnetky počítaná z konstanty „2" bez μ0, poloměr v cm místo
v m (22° místo 11°). **OPRAVENO**: B = μ0·I/(2π·r), tan α = B/B_Země (B_Země = 20 µT); pro 1 A /
5 cm nyní 11°, pro 5 A / 2 cm 68°. Kontrolor: PROJDE.
- `VrhSimulace.astro` už opravená commitem `dfd800e` — evidence ji mylně vedla jako
  neopravenou, ověřeno: dolety sedí s teorií na 0,2 %.
- `DifuzeSimulace` a `CaraSimulace` prošly kontrolou bez nálezu, uzavřeno.
- `snimky_podkastu.py` — dva různé poměry px→cm sjednoceny na konstantu `PX_NA_CM = 25`,
  `py_compile` OK. Kontrolor: PROJDE.
- Build po opravách: brána „✅ Vše zapojené správně", 2579 kontrol testů simulací, 0 spadlo,
  469 stránek.
- **V pořádku a NEPŘEPISOVAT:** `RozpinaniVesmiruSimulace` a `BludisteSimulace` px používají, ale
  jednotku „px" **přiznávají** — to je korektní.

**FRONTA — nové podněty (nedělat rovnou, jen zapsáno):**
- sjednotit poměr px→cm i ve scéně `s_pevna_tvar_objem` (17 px/cm) na `PX_NA_CM` (25) — kontrolor
  to obhájil jako neblokující, ale napříč sérií je to nekonzistentní.
- **rozhodnutí pro učitele**: díly `6/objem-dialog` a `6/souhrnne-opakovani-velicin-dialog` byly
  vyrobeny vadným měřítkem a jsou nasazené — přegenerovat, nebo nechat? (stejná otázka jako
  u `skupenstvi-latek-dialog`, viz bod 2a výše).

**🟠 OTEVŘENÉ OTÁZKY NA UČITELE:** přegenerovat `skupenstvi-latek-dialog`, `6/objem-dialog` a
`6/souhrnne-opakovani-velicin-dialog`? · povýšit ollamu na ≥ 0.32.12? · napsat Petru Němcovi
o svolení k jeho 13 videím?

## [cesty] Cestovatelský deník

**Hudba videí ze Suno (22. 8. 2026):** automat deníku od teď bere podkres z knihovny
`~/Desktop/Omega/hudba-suno/` (12 nálad, výběr md5 hashem názvu města, krátká skladba
se spojuje concatem), záložní cesta ACE-Step při chybějící knihovně; použitá skladba
se loguje. Kontrolor PROJDE bez nálezu, commit Omega `884c713`, testovací video
`Omega/rozdelane/suno-video-test/Winterhausen_test.mp4`. Doklad licence:
`hudba-suno/EVIDENCE.md` (Suno Pro, komerční užití). Od 3. 9. limit 20 stažení/měsíc.

**HOTOVÉ A NASAZENÉ** (též commit `30eabd1`): opraveno 3× mrtvé `videoId`, 4 data míst, 8 + 1 názvů videí.

**HOTOVÉ, NENASAZENÉ:**
- Kluesserath — trojdílné video zapsané na web.
- Oprava příčiny zdvojených názvů ve `Omega/skripty/videa_na_web.py`.
- Oprava hlídače `Omega/skripty/hlidac_zaseknuti.py` (poznával vlastní `grep` jako běžící automat).

**Stav míst:** Kluesserath i Neumagen-Dhron nahrané na YouTube a kompletní.

**Fronta dál:** **Trittenheim** — ✅ 19. 8. 2026 PŘESUNUTO do `nasazeno/` (video zkontrolované: úvodní mapa má správný cíl Trittenheim, čitelné km „Celkem z domova: 2825 km · nafta ≈ 13 574 Kč · Poslední úsek do Trittenheim: 1 km"; 33 s, jednodílné, všech 9 médií anonymizovaných).
⏸️ **ODLOŽENO na 20. 8.: nahrání na YouTube.** Nahrávač skončil bez pokusu — hláška: `1 videí čeká, dnes už nahráno 5/5 (kanál hlásí 5, vlastní evidence 4) → denní limit 5 vyčerpán — zbytek zítra`. Není to chyba, jen vyčerpaná denní kvóta YouTube API. Zítra stačí znovu spustit `~/Desktop/Omega/skripty/venv/bin/python3 ~/Desktop/Omega/skripty/nahraj_na_youtube.py` (systémový python3 spadne na chybějící `pillow_heif`) a ověřit oembed názvem „06. 08. · Trittenheim (Německo)".

**🔧 VADNÉ MAPY k přegenerování:**
- nasazené `Sassenage_v4` má na úvodní mapě jako cíl **Saint-Denis-en-Bugey místo Sassenage** (58 km vedle),
- `Saint-Maurice-sur-Moselle` ukazuje jako cíl **Ornans**.

**🔁 KLUESSERATH — VÝMĚNA 3 DÍLY → 6 DÍLŮ (učitel 19. 8. SCHVÁLIL, výměna ODLOŽENA na 20.–21. 8.)**

Prohlídka nového renderu `/Users/Shared/Cestovatelský deník/2026/video-vystup/Kluesserath_DE_KEKONTROLE_{1..6}z6.mp4`
(19. 8., snímky přes ffmpeg) — **v pořádku, výměna se smí provést**: úvodní mapa má trasu
z jižních Čech přes Landshut a Schongau do Francie a zpět na sever, cíl je popsaný
**Kluesserath** (správně, ne cizí město), lišta je čitelná: „Celkem z domova: 2823 km ·
nafta ≈ 13 561 Kč · Poslední úsek do Kluesserath: 313 km". Těla dílů nejsou prázdná
(motokrosový závod, obytná auta, tváře rozmazané), všech 6 má zvukovou stopu AAC.
Nová verze má **26:43** (238+271+274+266+272+282 s) proti 11:12 staré trojdílné — je
podstatně plnější.

**PROČ SE 19. 8. NIC NENAHRÁLO:** kotva z kanálu hlásí `nahrano_dnes_na_kanale = 5`,
strop `NAHRANI_ZA_DEN = 5` → dnes 0 volných nahrání. Navíc **6 dílů se do jednoho dne
nevejde ani teoreticky**: 6 × 1 600 jednotek = 9 600 + režie (playlisty, změny
viditelnosti) je přes denní kvótu 10 000. Výměna proto musí přes dva dny.

**⛔ SOUBORY NEPŘESOUVAT do `nasazeno/`, dokud výměna neproběhne.** Změřeno 19. 8.:
`nahraj_na_youtube.dil_videa()` vrací u `…_1z6` i `…_1z3` shodně 1, takže pojistka
`misto_uz_na_youtube()` by díly 1–3 spolkla jako duplicity, ale díly **4z6–6z6** by
nahrála jako nová videa → na kanálu by vznikla rozbitá směs 3 starých + 3 nových dílů.
Ve `video-vystup/` je fronta nahrávače nevidí (čte jen `nasazeno/`), takže tam jsou v bezpečí.

**STAV 21. 8. 2026 ráno:** 20. 8. se 1–4 nikdy nenahrály (kvóta padla ještě před tím).
Dnes (21. 8., log 02:38–02:46) nahrány **1z6 = `MV5BFF8COBk`, 2z6 = `5toR6xwKrAU`,
3z6 = `YXHB2UC7-Aw`** (neveřejné). Souběžným spuštěním skriptu (chyběl zámek) vznikly
navíc orphan duplicity `_wdFZBC_1Dw` (2z6) a `OsrcWfBUFaU` (3z6) — obě rovnou schovány
na private. Oprava zámku běží samostatně. Kvóta 5/den vyčerpána → **4z6–6z6 na 22. 8.**

**✅ STAV 21. 8. 2026 dopoledne — VÝMĚNA DOKONČENA (kvóta se obnovila v 9:00, nečekalo se na 22. 8.):**
10:23–10:31 nahrány 4z6 = `MjuzIMfmnWw`, 5z6 = `VyO_5mlGTGk`, 6z6 = `BdVyyyFtT4g` (neveřejné,
log nahrávače, jeden běh pod sdíleným zámkem — žádné duplicity). Stará ID `wS_EwtFr3gY`,
`OZ_5WB4SAiE`, `hL9QxPGPds0` i torzo `ZLQ88zKrIoI` schována na private (`vymena_videa.schovej`,
oembed 403 ověřen). Evidence: 3 staré záznamy v `nahrana_videa_nahrazena` (klíč „…(nahrazeno
6dílnou verzí)“). Soubory: 6× `…z6` v `nasazeno/`, 3× `…z3` v `nasazeno/_stara-mapa/` (nic smazáno).
Web `src/data/cesty/2026.ts`: `videoId` místa = `MV5BFF8COBk`, v seznamu 6 dílů s titulky opsanými
z oembedu. Oembed všech 6 nových ID = 200. Kroky 4–9 tohoto postupu jsou HOTOVÉ.

**POSTUP PRO 22. 8. — DOKONČENÍ (teprve tady se přepíná):**
4. Nahrát zbývající **4z6, 5z6 a 6z6** týmž způsobem.
5. Až je na kanálu všech šest, schovat **tři stará ID** přes `vymena_videa.schovej(yt, id)`
   (přepne na `private`, nikdy nemaže; brána pustí unlisted → private):
   `wS_EwtFr3gY` (1/3), `OZ_5WB4SAiE` (2/3), `hL9QxPGPds0` (3/3).
6. Staré záznamy odsunout do `stav["nahrana_videa_nahrazena"]` pod klíčem
   `"Kluesserath_DE_KEKONTROLE_1z3.mp4 (nahrazeno 6dílnou verzí)"` atd. — vzor je
   `vymen_mapy_na_kanale.po_vymene()`; přepisovat se nesmí, jinak zmizí, které ID bylo která verze.
7. Soubory srovnat: `…_{1..6}z6.mp4` z `video-vystup/` do `nasazeno/`, staré
   `…_{1..3}z3.mp4` z `nasazeno/` stranou (`nasazeno/_stara-mapa/`) — nic nemazat.
8. **Web `src/data/cesty/2026.ts`, místo `klusserath`** (19. 8. se do repa záměrně nezapisovalo — pracoval tam jiný agent):
   - `videoId: 'wS_EwtFr3gY'` → ID **prvního nového dílu**,
   - v seznamu videí nahradit tři řádky `wS_EwtFr3gY` / `OZ_5WB4SAiE` / `hL9QxPGPds0`
     šesti novými (pořadí 1/6 … 6/6, zůstávají mezi „03. 08. · Luxeuil-les-Bains — 1/6"
     a „06. 08. · Neumagen-Dhron — 1/2", pořadí pole = pořadí cesty),
   - **názvy opsat PŘESNĚ z oembedu** každého nového ID
     (`curl -s "https://www.youtube.com/oembed?url=https://youtu.be/<ID>&format=json"`),
     ne z předpokladu — v tomhle souboru se už dvakrát opravovaly zdvojené a posunuté názvy.
9. Kotva na závěr: oembed 200 u šesti nových ID a **403 u wS_EwtFr3gY, OZ_5WB4SAiE, hL9QxPGPds0**.

**Stav ověřený 19. 8. (kotva oembed + API):** `wS_EwtFr3gY`, `OZ_5WB4SAiE`, `hL9QxPGPds0`
= unlisted, oembed 200, na webu zapsané. `TlmBTR0VW2A`, `FNOFp6Q5zqo` = private (403),
zbytky dřívějších pokusů.

**🧹 Drobný nález (ne úkol dneška):** `ZLQ88zKrIoI` „04. 08. · Kluesserath (Německo) — 1/3"
z 18. 8. 22:07 je na kanálu **unlisted s délkou 0 s** — zbytek přerušeného uploadu,
který `uklid_po_prerusenem_uploadu()` nepřepnul. Na webu není. Při dokončení výměny
ho přepnout na `private` také.

---

> ⤵️ Starší blok (od původního řádku 133) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

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

### 22. 8. 2026 noc — revize starších simulací, dávka 1 (5 nejstarších), hotovo
2 nálezy opravené a nasazené (panáčci `SkladaniSilSimulace` mimo viewBox,
výklad bit/bajt/ASCII u soubory-slozky-aplikace). Otevřené drobnosti:
- Blok soubory-slozky-aplikace má 16/21 otázek kvízu (chybí 5).
- Revize automatů hlásí „role modelů: llama3.1 PROPADL" 3× — souvisí
  s odstavením llama3.1 z role kontrolora 22. 8.
- `BinarniSimulace` měla výklad bez opory ve zdroji — vyřešeno doplněním.

## Zkontrolováno (ať se neprochází znovu)
- Audit infografik v temata.ts (23. 7. 2026): 213 podtémat, 15 interakcí hotových → kandidáti sepsáni výše. Shrnutí, opakovací a čistě výkladová témata bez jevu k animaci přeskočena záměrně.

## Hotová vylepšení

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


## Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026)

- [cesty] **V úložišti zůstalo 9 fotek + náhledy pod `cesty/2026/saint-sauveur`.**
  Nikdo je nevidí (místo na webu už není, fotky jsou nahrané i pod Luxeuilem),
  takže nespěchají — smazání z R2 je mazání, čeká na odkliknutí učitele.
- [cesty] **Poloha zastávky po úklidu fotek zhrubne.** Když VideoAutomat uklidí
  mezikopie, místo ztratí medián GPS a trasa má na výběr pin z deníku
  a starou trasu; při remíze dvou zdrojů vyhraje pin (u Ballonu d'Alsace
  o 710 m vedle). Na evropské mapě je to pod rozlišením (1 px ≈ 3 km),
  proto se to neřešilo — kdyby se mapy někdy dělaly detailnější, dát
  přednost zdroji „medián GPS fotek" ze staré trasy.
- [cesty] **Kontaktní list pro vizuální kontrolu anonymizace nemá skript** — dělá se
  ručně přes ffmpeg `tile`. Kandidát na doplnění do `kontrola_videa.py`.

> ⚠️ MIGRACE 21. 8. 2026: položky výše jsou překopírované do git fronty
> wonderly-fronta (složka `prijate/`). Nové položky zakládat UŽ JEN tam.
> Tato textová fronta je jen pro čtení a po ověření se uklidí.

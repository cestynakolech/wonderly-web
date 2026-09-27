## ⚡ ČÍM ZAČÍT — 27. 9. 2026 v noci — podkásty a noční fronta

**PRVNÍ ÚKOL:** nejdřív DOKONČIT kontrolu 4 rozpracovaných scénářů (BĚŽÍ níže),
pak pokračovat dalším podtématem ze ZBÝVÁ — worker napíše scénář →
`kontrola_scenare.py` → nezávislý kontrolor (Sonnet, max 2 kola) → zapsat.
**Pořadí NEURČENO jednoznačně** (oprava V6-1, 27. 9. 2026): dřívější znění „F8 →
F9 → F7" nemá doložené rozhodnutí učitele (`git log -S` nic nenašel) a odporuje
pravidlu „1 celek KOMPLET napříč 7./8./9. ročníkem naráz" (`OBSAH-PRAVIDLA.md`
kap. 12, paměť [[feedback-poradi-rocniku-a-uplnost-tematu]]) — vybírat podle
NEJSTARŠÍHO nedokončeného celku napříč všemi třemi ročníky (skupiny podtémat
v `Omega/dokumenty/PODKASTY-CHYBI-2026-09-27.md`), ne podle ročníku od shora dolů.
**Osud 7 shrnutí (pololetní/roční) z 70 chybějících — NEROZHODNUTO:** stejná
otevřená otázka jako u simulací (viz „ČEKÁ ROZHODNUTÍ UČITELE" v aktuální frontě
níže) — dělat i pro ně krátký podkast/video, nebo je z povinnosti vyjmout jako
u simulací? Nepředjímat, dokud učitel nerozhodne.

- NOČNÍ FRONTA lokálních modelů (`cz.wonderly.nocni-fronta`, `Omega/skripty/nocni_fronta.py`, 22:00–6:00, pořadí animace → podkasty --vse r6–9 → animace → vata; kontrolor 4 kola do 0 nálezů). Ráno přehled `Omega/dokumenty/NOCNI-FRONTA-VYSLEDEK.md`. Denní `cz.wonderly.dodelej-animace` vypnut (Disabled) — duplicita.
- INVENTURA: 70 ze 120 podtémat fyziky bez podkástu/videa (seznam `Omega/dokumenty/PODKASTY-CHYBI-2026-09-27.md`). Rozhodnutí učitele 26. 9.: scénáře píší WORKEŘI + nezávislý kontrolor (Sonnet, max 2 kola), 1 krátký díl na podtéma (vyjde ~4 min, protože pokrývá celý kvíz, strop 4 600 znaků s prefixy).
- HOTOVÉ SCÉNÁŘE (prošly skriptem `kontrola_scenare.py` + ostrou bránou + nezávislým kontrolorem) = 32: F8 elektřina 14 (celá kapitola), F8 teplo: tani, tuhnuti, vyparovani, var; F9: vedeni-proudu-v-kapalinach, vedeni-proudu-v-plynech, chemicke-zdroje-napeti, polovodice-vlastni-vodivost, polovodice-typu-n-a-p-dioda, ucinky-proudu-bezpecnost, pusobeni-pole-na-vodic-elektromotor, vznik-stridaveho-proudu-alternator, vlastnosti-stridaveho-proudu, transformator, kvarky, radioaktivita, jaderna-energie-a-reakce, jaderny-reaktor-elektrarna. ROZPRACOVÁNO — nejdřív dokončit kontrolu těchto 4 scénářů (nezávislý kontrolor ještě neskončil): kondenzace, skupenske-zmeny-vody-v-prirode, kmitani-a-vlneni, vnimani-zvuku-a-hlasitost. ZBÝVÁ (nezačato): F8 ucinnost, energie ×5, tepelné motory ×2; F9 slunecni-soustava, vesmir-a-galaxie; F7 17 podtémat (seznam `Omega/dokumenty/PODKASTY-CHYBI-2026-09-27.md`).
- POSTUP: Workflow scriptPath `Omega/skripty/workflows/podkasty-scenare.js` (verze v2: worker musí projít `kontrola_scenare.py` + `pokryti_kvizu.py`, pak kontrolor); nový deterministický `Omega/skripty/kontrola_scenare.py` (délka s prefixy < 4 600, číslice, Markovo „…, ne?", kresby v KRESBY, indexy scén). Scény bez hotové kresby jsou dočasně typ „ilustrace" (pozn_kresby = přání kresby kódem).
- ČEKÁ NA UČITELE: výklad F9 chemicke-zdroje-napeti obsahuje citronovou baterii, palivový článek, polaritu anody při nabíjení a „dva stejné kovy" — nejsou v PDF (možná v prezentaci) → ponechat, nebo vyřadit z výkladu i kvízu? Kvíz Kvarky má 14 otázek (výjimka nezapsaná).
- OPRAVY VÝKLADU nasazené 27. 9.: ionizace ve vedení proudu v plynech (`34ffc6a`); elektroskop
  — pořadí ruka/tyč (`b8e3b5c`); pořadí kovů podle měrného odporu (`e33164a`) — poslední dvě
  jsou chyby podkladu, zapsáno v `Omega/dokumenty/kontrola-podkladu-fyzika8.md`.
- POUČENÍ: deterministický skript `kontrola_scenare.py` našel na 24 scénářích 27 vad, které LLM kontroloři za ~8 mil. tokenů propustili (Markovo „…, ne?", délka, schémata bez kresby — generátor by v noci spadl) → opakované formální kontroly patří do skriptu. Stejnojmenná podtémata v různých ročnících (chemicke-zdroje-napeti v F8 i F9) matou agenty — v zadání vždy ročník + plný klíč.
- VYŘÍZENO z fronty: teplota-a-jeji-mereni už má 21 otázek (zápis byl zastaralý); brána
  `testy/uniky.mjs` teď kontroluje i únik odpovědi přes pole `vysvětlení` (dřív ho vůbec
  neporovnávala — nález nedělního auditu 25. 9., viz `SAMOSTATNY-REZIM-ARCHIV.md`).

## 26. 9. 2026 v noci

**HOTOVO**
- Vata „kvantifikátor" (VZOR 4b) — 22 ze 39 otázek fyziky přestavěno a nasazeno (commit `72ed250`), měřidlo 54 → 26 nálezů vč. souhrnů.
- Build na Cloudflare opraven (`b7082e3`): test `rozvrzeni-sceny-obousmerne` četl `git show f30767b`, Workers Builds dělá mělký klon → brána shodila build, `2ee4c6e` se nenasadil ~1 h 15 min; fixture teď v `testy/podvrhy/`.
- Automat dodelej-animace: chybný celek ve scénosledu `archimeduv-zakon-dialog` opraven, odkaz na video je na webu (`d951bd7`).

**ODLOŽENO — zaseklo se (3 vlny, 3 kola kontroly)**
17 otázek zůstává v původním znění (s „jen" nápovědou); vady jsou v CELÉM BLOKU (sousední otázky a jejich vysvětlení prozrazují odpovědi, výčtové otázky „A a B" mají distraktory = poloviny správné) — nepředělávat po jednotlivých otázkách, ale po celém bloku (otázka + sousedi + vysvětlení naráz). Zbývá i VZOR 3 (kategorické slovo) a VZOR 5 (tázací slovo). Seznam (klíč bloku, začátek zadání):
1. `fyzika/7-rocnik/pohyb-a-rychlost/posuvny-otacivy-pohyb` (qIndex 15) — „Jaký pohyb koná šroub při šroubování do dřeva?"
2. `fyzika/6-rocnik/latka-a-teleso/telesa-a-latky` (qIndex 6) — „Čím se od sebe odlišují různé látky?"
3. `fyzika/6-rocnik/sila/gravitacni-sila` (qIndex 0) — „Mezi kterými tělesy působí gravitační síla?"
4. `fyzika/7-rocnik/tlak-v-kapalinach/hydrostaticky-tlak` (qIndex 1) — „Jakými směry působí hydrostatický tlak v kapalině?"
5. `fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti` (qIndex 8) — „Kde se využívají alkalické články?"
6. `fyzika/7-rocnik/vztlakova-sila-a-plovani-teles/telesa-stejnoroda-a-nestejnoroda` (qIndex 3) — „Z čeho se skládá nestejnorodé těleso?"
7. tamtéž (qIndex 7) — „Co počítáme u nestejnorodých těles místo hustoty látky?"
8. tamtéž (qIndex 13) — „Jakou hmotnost a jaký objem dosazujeme do ρp = m : V?"
9. `fyzika/6-rocnik/latka-a-teleso/skupenstvi-latek` (qIndex 1) — „Co si zachovává těleso v pevném skupenství?"
10. `fyzika/6-rocnik/teplota/teplotni-roztaznost` (qIndex 1) — „Kterých skupenství se teplotní roztažnost týká?"
11. `fyzika/7-rocnik/pohyb-a-rychlost/klid-a-pohyb-telesa` (qIndex 6) — „Trajektorie může být…"
12. `fyzika/8-rocnik/teplo-a-zmeny-skupenstvi/vyparovani` (qIndex 1) — „Za jaké teploty probíhá vypařování?"
13. `fyzika/9-rocnik/elektricka-energie-a-bezpecnost/ucinky-proudu-bezpecnost` (qIndex 14) — „Kdy se počítá s odporem lidského těla jen asi 2 000 Ω?"
14. `fyzika/8-rocnik/energie/zakon-zachovani-mechanicke-energie` (qIndex 19) — „Letadlo letí rychle vysoko nad zemí. Jakou energii má?"
15. `fyzika/9-rocnik/indukce-a-stridavy-proud/pusobeni-pole-na-vodic-elektromotor` (qIndex 13) — „Jakým proudem napájíme elektromotory?"
16. `fyzika/7-rocnik/jednoduche-stroje/pusobeni-teles-a-deformace` (qIndex 1) — „Jak může působení mezi tělesy probíhat?"
17. `fyzika/8-rocnik/energie/energeticka-hodnota-potravin` (qIndex 12) — „Z jakých dvou zdrojů člověk získává potraviny bohaté na energii?"

**POUČENÍ**
1. Oprava vaty 1. vlnou jen přesunula nápovědu — místo „jen" prozrazoval odpověď dovětek „protože…" jen u distraktorů a délka (správná vždy nejkratší); `vata-over-delku.mjs` hlídá jen „nejdelší", ne „nejkratší" → doplnit měřidlo.
2. Kontroloři mezi vlnami kolísali (co jeden pustil, druhý zamítl) — rozhodnutí až po smyčce do 0 nálezů.
3. Mělký klon na CI: testy nesmí sahat do historie gitu.

> ⤵️ Šest denních snapshotů „STAV 23.–25. 9. 2026" a „ROZHODNUTO PODLE PRAVIDLA
> ZDROJŮ (23. 8.)" přesunuto do [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md)
> — audit 27. 9. 2026 (K3-Z8+K3-Z12, −33 936 B). Byly vzájemně přepisující se
> denní zápisy, vše HOTOVO/uzavřeno; aktuální stav je jen v nejhornější sekci
> „⚡ ČÍM ZAČÍT" výše. Ochranná pásma vedení, práh proražení kůže i bezpečné napětí
> zůstávají ROZHODNUTO (23. 8. 2026, podle pravidla zdrojů — prezentace je rovnocenný
> zdroj s PDF): čísla se NEDOPLŇUJÍ přes rozcházející se zdroje, zavedený text se
> nemění jen kvůli útržkovitému PDF. Jupiter 2,36× (prezentace) vs. 2,53× (fyzikální
> přepočet) zůstává podle prezentace (žák vidí totéž co v hodině), komentář v kódu.

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

### 🔴 PRIORITA — přestavba obsahu fyziky (zadáno 21. 9. 2026)

`[skola2]` Zadání učitele. **NIC SE NEMAŽE** — texty se jen přestavují a doplňují.

**A) Plynulost výkladu.** Texty k tématům nesmí „přeskakovat" mezi pojmy.
Doložený příklad učitele: u energie se v jednom podtématu stále skáče mezi
polohovou a pohybovou energií. Každé téma má jít v jedné linii, ne sem a tam.

**B) Nová část „Zápis do sešitu"** u každého podtématu, v TOMTO pořadí:
1. **Vzoreček** (má-li ho téma) a pod ním **pod sebou** rozepsané všechny
   veličiny z něj — tvar: `síla — značíme F, jednotka N (newton)`.
2. **Vzoreček slovy**, ne jen značkami.
3. **Přesné znění zákona**, jde-li o zákon.
4. **Body s nápovědou** — jen pár slov na bod, NE celé vysvětlení.
   Důvod (slova učitele): *„děti si nemohou psát celé stránky, děti se neučí
   psát, ale rozumět fyzikálním zákonům; na podrobné čtení mají web, ne sešit."*

**C) Úroveň a řazení textu na webu.** Od nejjednoduššího k nejsložitějšímu.
Jazyková úroveň mnohem nižší než dosud — učitel říká „spíš pro 9–10 let":
žák má **tušit, jak fyzika funguje**, ne umět všechno spočítat.

**D) Nadstavba na konec stránky.** Náročné počítání a odvozování se nemaže,
jen se přesune na KONEC podtématu jako bonus pro schopnější žáky.

**Postup:** nejdřív **JEDNO podtéma KOMPLET** (A+B+C+D) jako vzor, nechat
schválit učitelem, teprve pak dávkově zbytek. Začít u **energie (8. ročník)** —
právě na ní učitel skákání ukázal.

> ⤵️ Postupný průběh přestavby 21.–22. 9. 2026 (dávka po dávce, celek po celku,
> commity d491ea0…2d7e7c9) přesunut do [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md)
> — audit 27. 9. 2026 (K3-Z9, duplicita s Historií `PROGRESS.md`). Výsledek: F8/F7/F9
> celky 1–8 (79 podtémat) přestavěny a kvízy sladěny; aktuální díra vede „⚡ ČÍM ZAČÍT" výše.

**E) POŘADÍ A ÚPLNOST (upřesněno 21. 9. 2026)**

(i) **Pořadí práce** = 1. celek (téma) u ročníků 7, 8, 9, pak 2. celek u všech
tří, atd. — cíl: to, co učitel učí příště, je hotové ve všech ročnících naráz.
Ročník 6 učitel nezmínil, zůstává mimo pořadí, dokud neřekne.

(ii) **„Hotové téma"** — od 22. 9. 2026 platí ROZŠÍŘENÁ definice, upravená
23. 9. 2026, plné znění JEN v `OBSAH-PRAVIDLA.md`, kap. 12 (nikam se dál
neopisuje). Zkráceně jde o DEVĚT složek: výklad, zápis do sešitu, kvíz
21 otázek sladěný s výkladem (2 kola nezávislé kontroly), simulace
(= interaktivní infografika, od 23. 9. 2026 sloučeny do jedné složky —
klikací i posuvníková interakce se počítají stejně), české odkazy,
video-polemiku S ANIMACÍ (ne statické obrázky, ne jen audiostopa),
infografiku (statickou), laboratorní práci a hru pro skupinu (samostatná
hra vázaná na podtéma, ne jen výběr podtématu ve Fyzikální lize).
Přechodné ustanovení: dosavadní audiostopy bez animace zůstávají
zveřejněné, animace se doplňuje postupně.

> ⤵️ Podrobný průběh 21.–22. 9. (PŘEDÁNÍ, sladění kvízů, past souběžného zápisu
> `temata.ts`×`kvizy.ts`, mezery bran) přesunut do
> [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — audit 27. 9. 2026 (K3-Z9+K3-Z10).
> Trvalá pravidla, která z toho zůstávají: brány běží nad celým repem — souběžné zápisy do
> `temata.ts`/`kvizy.ts` se musí dokončovat po jednom; `cisla-ve-vykladu.mjs` přeskakuje
> otázky s číslem v zadání; `uniky.mjs` porovnává jen uvnitř bloku, ne mezi blocky ani
> přes skloňování; curl ověřovat s User-Agent i cache-busterem (`?cb=`).

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 2. kolo — kontrolor V4-2)

Systematický průchod archivu po nálezu, že se smazáním duplicit ztratily i nehotové úkoly:

- [skola2] `⏸ ODLOŽENO (rozhodnutí učitele 25. 9. 2026)` — informatika a pracovní
  činnosti se nedělají, dokud není hotová fyzika (`OBSAH-PRAVIDLA.md`, preambule);
  podrobný stav před odložením (43 bloků kvízů pod 21 otázek, 15+3 podtémat bez
  simulace) v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md).
- [skola2] `cisla-ve-vykladu.mjs` nekontroluje otázky, které mají číslo přímo
  v zadání (`if (vZadani.length) continue`) — doplnit.
- [skola2] `uniky.mjs` porovnává jen uvnitř bloku a přes české skloňování — nevidí
  úniky/duplicity MEZI bloky (např. páky × kladka) — doplnit.
- [skola2] Ověřit odkazy u F7/F9 celků 1–5 (38 podtémat) — při sladění kvízů 22. 9.
  bylo „nezjišťováno".
- [skola2] Podtémata bez názornosti (ověřeno `node testy/nazornost.mjs` 27. 9.: fyzika
  7 z 120 — vše pololetní/roční shrnutí; informatika 15 z 47; prac. činnosti 1 z 3)
  → ČEKÁ ROZHODNUTÍ UČITELE: dělat přehledovou infografiku ke shrnutím, nebo je
  z měřidla vyjmout?
- [skola2] `MEMORY.md` (Škola) má 169 řádků, hook doporučuje pod 140 → ČEKÁ ROZHODNUTÍ
  UČITELE (sloučit dvojníky / archivovat splněné / zvednout limit). Nic nemazat bez pokynu.
- [skola2] 22 kandidátů na zkrácení pravidel čeká na výběr učitele v
  `Omega/dokumenty/PRAVIDLA-AUDIT-2026-09-21.md` (kopie
  `rozpracovane-vyklady/2026-09-21/pravidla-audit.md`, pokud hlavní chybí).
- [skola2] Denní rutina `~/.claude/scheduled-tasks/pravidla-dluh-denne/SKILL.md`
  založena, ale cron `30 7 * * 1-6` čeká na zaregistrování přes `/schedule` — učitel.
- [skola2] Kosmetika: blok `tepelna-vymena-a-teplo` má zápis „4200", sjednocení na
  „4 200" spouští bránu `uniky.mjs` (substring) — ponecháno, čeká na opravu měřidla
  nebo formátu.
- [skola2] Terminologie vaty: staré názvy „VZOR 1"/„VZOR 2" (22.–24. 9., desítky
  bloků) byly kalibrací 25. 9. přejmenovány/sloučeny na kvantifikátor / kategorické
  slovo / tázací slovo / polarita — zbývající práce (VZOR 3 kategorické slovo,
  VZOR 5 tázací slovo, viz sekce „26. 9. v noci" výše) se vede pod NOVÝMI názvy,
  staré počty bloků (37/32 aj.) už neplatí a neopisují se.

### 🆕 Znovu zařazeno do fronty (audit 27. 9. 2026, 3. kolo — kontrolor V6)

- [skola2] **DALŠÍ KROK 22. 9. — chybějící složky prvního tématu napříč ročníky**
  (nález z `INVENTURA-TEMAT.md`, `OBSAH-PRAVIDLA.md` kap. 12): F7 `pohyb-a-rychlost`
  (4 podtémata) — chybí odkazy, video s animací, interaktivní infografika a hra u
  všech 4, laborka navíc u 2 (posuvny-otacivy-pohyb, priklady-na-vypocet-rychlosti);
  F8 `mechanicka-prace-a-vykon` (2 podtémata) — chybí video s animací, infografika
  a hra u obou, laborka u `mechanicka-prace`; F9 `magneticke-pole` (3 podtémata) —
  chybí video s animací, infografika, laborka a hra u všech 3. **STAV NEOVĚŘEN
  ZNOVU** (zápis je z 22. 9., od té doby proběhla přestavba dalších celků i
  podkasty) — než se bere jako úkol, přeměřit `node testy/nazornost.mjs` a
  obsah `odkazy`/`materialy` u těchto 9 podtémat.
- [Omega] K1-3: nedatovaný pád automatu v logu vypadá navěky čerstvý — `revize_automatu.py`
  má posuzovat stáří podle mtime souboru logu (`CHYBA_HORIZONT_DNU`), ne jen podle
  pozice v posledních 15 řádcích.
- [Omega] K1-6 (velký rozsah): 54× neatomický zápis stavového JSON (např.
  `nahraj_na_youtube.py:145`, `pipeline_sdilene.py:80`) — zavést sdílenou
  `zapis_atomicky()` a postupně nahradit.
- [Omega] K1-7: `npx astro build` obchází prebuild bránu `testy/obousmerne.mjs` —
  doplnit `spawnSync('node',['testy/obousmerne.mjs'])` do integrace
  brana-pred-buildem v `astro.config.mjs`.
- [Omega] K1-8: `test_f7_klid_zdroj.py` a `test_f8_pilot_mp4.py` padají v každé
  revizi automatů (chybí `sys.argv`/modul) — opravit na samostatně spustitelné
  nebo přesunout mimo `testy/`.
- [Omega] K1-9 (velký rozsah): nasazení kvízů bez otisku verdiktu kontrolora —
  zavést soubor s hashem posledního schváleného bloku `kvizy.ts`, `zkontroluj.mjs`
  odmítne build, když se otisk změněného bloku neshoduje s posledním „NÁLEZY: 0".
- [Omega] K1-11: staré `ZDRAVI-POHYBU.md`/`ZDRAVI-SESSION.md` tvrdí „vše OK", ačkoli
  jejich hlídače jsou vypnuté od 12. 9. — revize má hlásit zprávu starší než limit
  hlídače jako neplatnou.
- [Omega] K1-12: scénosledy podkástů mívají vadný JSON/špatný klíč celku/schema bez
  kresby — volat `kontrola_scenare.py` na začátku `automat_podkastu.py`/`nocni_fronta.py`
  a ověřit `cesta_na_webu` proti `temata.ts`.
- [Omega] K2-10-ts: `wonderly-web/src/data/cesty/preklady.ts` (seznam jazyků deníku)
  zůstává mimo sjednocení K2-10 (Python strana hotová) — doplnit test shody
  `JAZYKY == ('cs',) + JAZYKY_PREKLADU`.
- [skola2] Suno MP3 Wave 1 — **ověřeno 27. 9. 2026: stále jen 22/116 m4a nasazeno**
  (`find public/materialy/fyzika -iname '*.m4a' | wc -l`), stejně jako 6. 9. — žádný
  postup od Wave 1. Plné znění zadání v `PROGRESS-ARCHIV.md`.
- [skola2] `KE-SCHVALENI.md` má **5 otevřených bodů** (přesně: 1, 3, 10, 14, 15 —
  ne 17–21, jak uvedla 1. verze tohoto nálezu; 17–21 jsou VYŘÍZENÉ): (1) účinnost
  jako nové podtéma/nadstavba?, (3) alternativní motory jako nové podtéma?,
  (10) kladka/nakloněná rovina bez PDF podkladu — potvrdit zdroj prezentace?,
  (14) rozpor prahu proudu u bezpečnosti, (15) jaderná fyzika F9 (budoucí
  5. celek) — podrobnosti přímo v souboru.
- [skola2] Polemika F7 „Klid a pohyb tělesa" — **překážka (práva zápisu) už
  NEPLATÍ**: `ls -la "/Users/Shared/Škola/podkasty"` 27. 9. ukazuje vlastníka
  `radek_soukromy` (dřív `radekmicek`) — scénáře i pokrytí kvízu 21/21 už hotové
  (viz archiv „Odloženo — zaseklo se" níže), lze rovnou vyrobit zvuk.
- [skola2] Podkast F8 „Výkon" dialog3 — 6 replik zůstalo odložených po timeoutu
  (420 s) při výrobě 12. 9., 1 bez TXT — dodělat na pozadí (`Omega/ODLOZENE.md`,
  `Omega/dokumenty/DENIK-CHYB.md:689`).
- [skola2] `pokryti_kvizu.py` — `MODEL` je už `gemma4:31b` (ověřeno 27. 9., dřív
  neexistující `gemma4:26b`/rozbitý `~/bin/ask-local`) — spustit bránu na
  dřívější trojici podtémat a potvrdit 21/21 pokrytí.

### 🆕 Nové položky fronty (15. 8. 2026) — cestovatelský deník a příprava

- [cesty] Doplnění starších fotek. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- [cesty] Doplnění cest z minulých let. Rozsah zadá učitel — zatím jen založeno,
  aby se na deník ve frontě nezapomnělo.
- ~~[příprava] Vyzkoušet průzkumníka přes Hermese na lokálním modelu~~ ZRUŠENO —
  učitel 21. 9. 2026 delegaci na Hermese/GPT-5.5 zamítl („pracuje nekvalitně"),
  viz K3-R6 (rozpor opraven auditem 27. 9. 2026).
- [příprava] Revidovat tabulku směrování modelů v `.claude/orchestrator-prompt.md`
  směrem k lokálním modelům tam, kde to obstojí — PŘEFORMULOVÁNO 27. 9. 2026
  (V4-8): „podle prvního měření" mířilo na zrušený úkol s Hermesem výše, dnes se
  žádné takové měření nechystá; místo toho se řídit přímým srovnáním vision
  (položka níže) a běžnou zkušeností z `ollama-log.md`. Výchozí tabulka je
  zapsaná (15. 8. 2026).
- [příprava] Přímé srovnání vision: ThinkingCap vs qwen3.8:27b-mlx na jedné dávce
  ~10 map/fotek deníku (stejné obrázky, stejná otázka, `mapa_projde_kontrolou`);
  vítěz nahradí model v automatech. Zadáno 21. 9. 2026.

> ~~Čtyři videa z 5. 8. (síla, hmotnost, hustota, objem)~~ ✅ HOTOVO a nasazeno 7. 8.

### 📥 Nálezy z historie, dosud nevyřešené (přesunuto a otagováno 16. 8. 2026)

- ~~[skola2] Sjednotit odpor lidského těla mezi F8 a F9~~ VYŘAZENO Z FRONTY —
  učitel 25. 9. 2026 řekl „ta čísla odporu kůže na webu nedávej, počkej na mě":
  ⛔ NESAHAT, viz sekce „Fronta nápadů" níže (K3-R7, oprava 27. 9. 2026).
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
- [skola2] **Brána pro nové simulace** (nález nedělního auditu 20.–23. 9. 2026).
  Do `zkontroluj.mjs` chybí kontrola, která by u KAŽDÉ nové komponenty
  `*Simulace` vynutila vlastní test s aspoň jednou netautologickou asercí. Dnes
  existují jen testy dopsané POTÉ, co se chyba našla (třída chyby
  `obsah-simulace`, 19 nálezů z 13. 8. 2026 u tří simulací). Pozn. pro toho, kdo
  to vezme: nové měřidlo musí mít obousměrný důkaz v `testy/obousmerne.json`,
  jinak shodí build, a musí být kalibrované na už přijaté práci (131 existujících
  komponent nesmí shodit bránu).
- [skola2] **Měřidlo šablon nevidí skládaná id** (nález nedělního auditu
  20.–23. 9. 2026). Brána hlásí „SestaveniRobotaSimulace: id se skládá výrazem,
  tahle část se neměří" — kontrola tedy tiše pokrývá jen část vstupů.
- [skola2] **Laťku kvízů lze utáhnout** (nález nedělního auditu 20.–23. 9. 2026).
  Brána hlásí zlepšení (612 otázek / 22 %, obří náskok správné odpovědi klesl na
  264 otázek) a nabízí `npm run prijmi-latku`. Utáhnout, ať se zlepšení nemůže
  vrátit zpátky.

> ⤵️ Starší blok (od původního řádku 235) je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — beze změny, jen se nečte automaticky.

### ⏳ ČEKÁ NA ODKLIKNUTÍ UČITELE (nikdy kvůli tomu nestát — jít dál)

- [cesty] **KOLODĚJE** — pečlivá anonymizace hotová, kontrolor 0 nálezů, čeká od 21:24.
  `pecliva_videa.py --schvaleno` (nebo `--zamitnuto "důvod"`).
- [cesty] **Le Bourg-d'Oisans + kapitoly** — tři varianty s cenou v `KE-SCHVALENI.md`
  (na YouTube je verze 4:58, kapitoly jsou z verze 6:06).
- [skola2] **Chrome neotevře wonderly.cz na jiném Macu** — server ověřen ze všech stran, čeká
  se, co učiteli vypíše `https://wonderly.cz` (rozhodovací tabulka v `KE-SCHVALENI.md`).
- [skola2] `wonderly-web/KE-SCHVALENI.md` má **5 otevřených bodů** (1, 3, 10, 14, 15 —
  viz plný seznam ve „🆕 Znovu zařazeno do fronty, 3. kolo" výše) — čeká na rozhodnutí
  učitele přímo v souboru.
- [Omega] Čtyři položky vyžadující zásah/souhlas učitele (SSH klíč pro Omega repo,
  `povoleni_hook.py` mimo globální settings, 17 vypnutých automatů, neplatný plist
  `zaloha-skola`) — plný popis v sekci **„## Čeká na odkliknutí"** níže v tomto souboru.

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

### [skola2] ⛔ NESAHAT — UČITEL ROZHODNE SÁM — odpor lidské kůže (zjištěno 25. 9. 2026)

**⛔ NESAHAT — UČITEL ROZHODNE SÁM** (řekl 25. 9. 2026: „ta čísla odporu kůže na webu
nedávej, počkej na mě"). Čísla na webu NECHAT PŘESNĚ TAK, JAK JSOU, nic nepřepisovat,
nedoplňovat ani nemazat — ani podle PDF, ani podle jiného zdroje. Platí pro `temata.ts`
(F8 ~2713, F9 ~3062–3063) i `kvizy.ts` (~4344–4361, ~4713–4723).

Průzkum narazil na to, že PDF podklad učitele (SmartBooks, „Účinky proudu na lidský
organismus") si SÁM SOBĚ odporuje v číslech odporu kůže: na jednom místě uvádí
„za sucha ~2000 Ω, za vlhka ~1000 Ω", na jiném místě téhož podkladu (8. i 9. ročník)
naopak „ve vlhku ~2000 Ω, v suchu ~150 000 Ω" — tedy opačný poměr sucho/vlhko i jiný
řád čísel. Chyba je v PODKLADU, ne na webu. NEPŘEBÍRAT čísla odporu kůže z tohoto PDF,
dokud to učitel nerozhodne, které místo/verze podkladu je správná.

Web dnes uvádí variantu „sucho ~150 000 Ω, vlhko/nad 50 V ~2 000 Ω" — tedy tu, která
odpovídá fyzice (vlhká kůže vede lépe, má tedy nižší odpor než suchá). Odpovídá druhé
z protichůdných verzí PDF. Druhá verze z PDF (sucho 2 000 Ω, vlhko 1 000 Ω) na webu
není a NEDOPLŇUJE se. Nic se needituje, jen k posouzení učitele.

> ⤵️ **Audit automatů video/podkásty (22. 9. 2026)** — jen evidence, „žádná technická
> akce se nenavrhuje" → přesunuto do archivu (K3-Z14, 27. 9. 2026).

> ⤵️ **Nekonzistence bezpečného napětí 8./9. ročník** — VYŘEŠENO 25. 9. 2026 (rozpor
> v datech nebyl, commit `9f44b1f`) — znění přesunuto do
> [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md), K3-Z13, 27. 9. 2026.

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
- [skola2] Zpřesnit brány kvízové kontroly: `zkontroluj.mjs` bod 6d má
  `const MALE = 12` a přeskakuje tak i menší desetinná čísla (past: 1,29 vs.
  1,23 kg/m³ neodhaleno) — snížit práh nebo přidat kontrolu desetinných čísel;
  do `zkontroluj.mjs` přidat měření náskoku délky správné odpovědi ≥10 znaků
  (`uniky.mjs` délkovou nápovědu nehlídá vůbec, hlásil 0 tam, kde bylo 5 úniků
  v 8 blocích). Zadáno 22. 9. 2026 noc při sladění kvízů 24 podtémat.
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
- ~~**Cloudflare Workers Build 16. 8. 2026 jednou spadl bez viditelné příčiny.**~~
  PRAVDĚPODOBNĚ VYŘEŠENO 26. 9. 2026 (V6-6, 27. 9.: „pravděpodobně", protože 16. 8.
  se konkrétní příčina buildu tehdy vůbec nezjistila — jde o usuzování, ne doložený
  týž kořen): mělký klon na CI (test četl git historii, Workers Builds ji nemá) —
  opraveno commitem `b7082e3`, viz sekci „26. 9. 2026 v noci" výše. Plné znění
  původního nálezu 16. 8. (edb1137, chybějící scope `wrangler` tokenu pro Builds API)
  v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md).
- [skola2] Doporučení z 16. 8. 2026 zůstává neprovedené: doplnit `wrangler` tokenu
  scope pro Cloudflare Builds API, ať jde příště zjistit příčinu selhání buildu
  automaticky z chybové zprávy, ne jen obcházet ručním deployem.
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
  se odvede do země / vyrovná se se zemí". OPRAVIT podle tohoto návrhu (věcně
  správné pro obě polarity, dialogu neodporuje) — nečeká se na rozhodnutí.
- [skola2] **Značení magnetických pólů — N/S vs. S/J (rozpor napříč webem).** Text i kvíz
  značí póly anglicky: `temata.ts` ř. 1121 a 1140, `kvizy.ts` ř. 1453 a 1492 („severní
  (N — north, značí se červeně) a jižní (S — south)", „vycházejí z N a směřují k S").
  Video a dialog dílu 11 ale používají české S = severní (červená) / J = jižní (modrá)
  — všech 13 snímků. Písmeno „S" tak v textu znamená jižní pól a ve videu severní pól,
  tedy přesný opak. Žák, který si pustí video i přečte text, to má proti sobě. Týká se
  i tématu `magneticke-pole` (temata.ts ř. 3885, 3895), nejde o ojedinělý překlep.
  Doporučení: sjednotit na české S/J (běžné v českých učebnicích) a v textu jednou
  větou zmínit, že na koupených magnetech bývá anglické N/S, kde N = severní.
  OPRAVIT: sjednotit na české S/J podle videa (dominantní ve všech 13 snímcích) a
  doplnit větu o anglické konvenci N/S — oprava je mechanická (text + kvíz, videa
  konvenci už mají), nečeká se na rozhodnutí.
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
- [Omega] **Omega repo nepushuje** — `git@github.com: Permission denied (publickey)`,
  151 commitů napřed proti `origin/main` (ověřeno 27. 9. 2026). Chybí SSH klíč/alias
  pro `github.com` na tomto stroji — zásah do systémové konfigurace, jen se souhlasem.
- [Omega] **`povoleni_hook.py` není zapsaný v `~/.claude/settings.json`** — platí jen
  ve `Škola/.claude/settings.json` (`PreToolUse '*'`); session spuštěná přímo z Omegy
  nebo z wonderly-web běží bez vrátného a bez černé listiny (nález K2-1). Návrh zápisu
  (jednořádkový příkaz) je v `opravy-c.json`/`Omega/PRAVIDLA.md:703` — mění se jen
  na pokyn učitele (oprávnění).
- [Omega] **17 záměrně vypnutých automatů (K1-4)** hlásí `revize_automatu.py` jako
  vadu — návrh je doplnit `Disabled=true` do plistů nebo je vést v evidenci
  pozastavených, ať šum nepřehluší skutečné pády. Zásah do LaunchAgentů → na pokyn.
- [Omega] **Neplatné XML v `com.omega.zaloha-skola.plist` (K1-10)** — komentář s „--"
  uvnitř dělá `plistlib` slepým k automatu; oprava je editace plistu → na pokyn.

## Odloženo — zaseklo se (max 3 pokusy na problém, pak sem a dál)

### Polemika F7 „Klid a pohyb tělesa" — zvuk nejde vyrobit z účtu radek_soukromy (10. 9. 2026)

**Hotovo a připraveno k převzetí** (nic z toho se neztratilo):
- tři scénáře trojice v `~/Desktop/Omega/podkasty-scenare/7/`:
  `klid-a-pohyb-telesa-relativnost-dialog`, `-trajektorie-dialog`, `-draha-dialog`
  (2 872 / 2 783 / 2 644 znaků, tedy pod stropem 4 700)
- ke každému hotový `.scenosled.json` se štítkem `"skupina": "klid-a-pohyb-telesa-7"`
- **pokrytí kvízu 21 z 21 otázek doloženo**; brána sama hlásí 19, protože jí u dvou
  otázek chybí model (viz nález níže) — doplňkové posouzení udělal `qwen3:8b`
  a bylo ověřeno obousměrně (ANO na to, co ve scénáři je; NE na jednotku síly
  a hustotu, které tam nejsou)
- nezávislý kontrolor scénářů: 2 nálezy, oba opraveny (krkolomná věta, foneticky
  nesmyslný omyl „es jako sto" nahrazen typickou žákovskou chybou „dé jako dráha")

**Na čem to stojí — dvě nezávislé překážky, obě mimo dosah této session:**
1. `vyrob_omnivoice.py` ukládá zvuk do `/Users/Shared/Škola/podkasty/<rocnik>/`.
   Ta složka patří účtu **radekmicek** (`drwxr-xr-x radekmicek wheel`) a z účtu
   `radek_soukromy` do ní zapsat nejde — `PermissionError` už při `mkdir`.
   Složka `podkasty` navíc zatím vůbec neexistuje.
2. Most na druhý účet (`/Users/Shared/Claude-most/`), kterým by se práce dala
   předat, **neexistuje** — takže ani obchvat není otevřený.
   **AKTUALIZACE 27. 9. 2026 (K3-R16):** na MacBooku `/Users/Shared/Claude-most/`
   i `~/bin/ask-local` DNES EXISTUJÍ (`ls` ověřeno) — zápis z 10. 9. se týkal
   patrně jiného stroje (mini) nebo mezitím vznikly; než se blokace znovu
   uzavře, ověřit aktuální práva zápisu na `Škola/podkasty` znovu.

**Vyzkoušeno (2 různé přístupy, dál se netočím):** přímá výroba pod tímto účtem
(napoprvé zastavena pojistkou paměti — správně, model `qwen3:8b` držel 11 GB;
po jeho uvolnění selhala na právech) · předání přes most (most není).

**Zbývá dodělat, až bude cesta otevřená:** zvuk 3 dílů · 12 nových schémat
(k tématu klid/pohyb/trajektorie/dráha neexistuje ani jedno z 307 hotových —
názvy kreseb jsou už zapsané ve scénosledech) · videa · nahrání do R2 · zápis
do `temata.ts`.

**Rozhodnout musí učitel:** má se výroba zvuku dělat z účtu `radekmicek`, nebo
se má složce `/Users/Shared/Škola/podkasty` nastavit zápis i pro `radek_soukromy`?
(Změna práv je zásah do systému, proto se neudělala sama.)

### Nález u brány `pokryti_kvizu.py` — nikdy se nezeptá modelu (10. 9. 2026, mini)
**AKTUALIZACE 27. 9. 2026 (K3-R16):** na MacBooku `~/bin/ask-local` DNES EXISTUJE
(`ls` ověřeno) — nález z 10. 9. platil pro Mac mini, ověřit tam znovu, než se
oprava považuje za hotovou.
Brána volá `~/bin/ask-local`, jenže **ten soubor tehdy neexistoval** (ověřeno `find`
přes ~/bin, Omegu i /Users/Shared). Každá otázka, která neprojde porovnáním slov,
proto vždy propadne jako nepokrytá — hlášku „lokální model není k dispozici, beru
jako nepokryté" nelze odlišit od skutečné díry. Druhá vada: `MODEL = "gemma4:26b"`,
ale ten model na mini vůbec není stažený (`ollama list`: bge-m3, llama3.1,
qwen3:8b, gpt-oss:20b) a s 24 GB RAM by se tam podle pravidla přesnosti ani
neměl cpát. Dokud se obojí nespraví, hlásí brána falešné díry — u této trojice
2 z 21. Oprava je zásah do měřidla, patří k ní obousměrný důkaz.

> Hotové logy dávek revize starších simulací (22. 8. 2026, 37/37 dokončeno) přesunuty do archivu.

> ⤵️ „Zkontrolováno" (audit infografik 23. 7.) a „Hotová vylepšení" (Ozobot 22. 8.)
> přesunuto do archivu — K3-Z14, 27. 9. 2026.

Soupis všech dokončených kol je v [SAMOSTATNY-REZIM-ARCHIV.md](SAMOSTATNY-REZIM-ARCHIV.md) — je to historie,
která se pro navázání práce nepotřebuje, tak se nečte automaticky.


> Drobné dluhy ze sloučení Saint-Sauveur (12. 8. 2026) a úklid 22. 8. 2026 večer:
> migrace do git fronty `wonderly-fronta/prijate/` ověřena hotová (soubory
> `cesty-9-fotek-saint-sauveur-uklid.md`, `cesty-poloha-zastavky-po-uklidu-zhrubne.md`,
> `cesty-kontaktni-list-anonymizace.md` tam existují) — znění přesunuto do archivu,
> nové položky zakládat jen ve `wonderly-fronta`.

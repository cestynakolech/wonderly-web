# OBSAHOVÁ ÚSTAVA — co smí být na školním webu (lab.wonderly.cz)

> **PLATÍ PRO FYZIKU, 2. stupeň, ročníky 6–9.** Zadání učitele z 19. 8. 2026.
> **Čte se PŘED každou obsahovou prací** (výklad, kvíz, hra, video, simulace) —
> workeři, kontrolor i hlavní model. Plné znění je JEN tady; jinde smí být pouze odkaz.
>
> **Vymezení (rozhodnutí učitele 19. 8. 2026 — bod H):** **ostatní předměty se teď NEDĚLAJÍ.**
> Priorita je **fyzika**; informatika a pracovní činnosti se ODKLÁDAJÍ, dokud nebude fyzika hotová,
> a teprve pak k nim učitel zadá obsahové ohraničení a doplní se sem jako vlastní kapitola.
> Do té doby se na nich nepracuje — ani „při té příležitosti", ani jako výplň volného času.
> Tato pravidla pro ně tedy NEPLATÍ (informatika má jiná témata i jiný zdroj — modelové ŠVP NPI
> „Nebojácně vpřed", výtah `~/Desktop/Omega/dokumenty/informatika-svp-nebojacne-vpred.md`).

---

## 1. Řetěz zdrojů (jádro ústavy)

Doslova učitel (19. 8. 2026):
*„ohraničení bylo že vysvětlení témat hry kvízy a videa musí odpovídat txtu na webu aby tam
nebylo nic navíc a probralo se vše zároveň žáci si vše mohly procvičovat a témata na webu
byli dělány podle podkladů PDF na sdílené složce a původním prezentacím které jsou také
u pdf učebnic"*

```
PDF učebnice + původní prezentace (/Users/Shared/Škola)
        ↓
TEXT VÝKLADU na webu (src/data/temata.ts)
        ↓
KVÍZY  ·  HRY  ·  VIDEA/podkásty  ·  SIMULACE  ·  tisknutelné testy
```

Tři pravidla řetězu — platí na KAŽDÝ článek zvlášť:

1. **Nic navíc.** Článek smí obsahovat jen to, co je v článku předchozím.
   Kvíz nesmí zkoušet nic, co není ve výkladu. Výklad nesmí přidávat látku,
   která není v PDF ani v prezentaci.
2. **Nic nesmí vypadnout.** Článek musí pokrýt všechno z předchozího.
   Výklad pokrývá celé PDF + prezentaci; kvíz pokrývá celý výklad;
   video (polemika) pokrývá všechny kvízové otázky tématu.
3. **Žák si musí mít možnost procvičit VŠECHNO, co je ve výkladu.**
   Když je ve výkladu jev, ke kterému není otázka, chybí otázka — ne naopak.

4. **U ČÍSEL A FAKTICKÝCH TVRZENÍ NESTAČÍ OPORA VE VÝKLADU — MUSÍ SE DOLOŽIT AŽ VE ZDROJI**
   (PDF nebo popis prezentace). Výklad sám může nést nepodložený údaj a kontrola proti
   němu pak jen srovnává vymyšlené s vymyšleným. Doloženo 22. 8. 2026: bezpečné vzdálenosti
   od elektrického vedení (7/10/12/15/20/25 m) prošly kontrolorem, protože přesně seděly
   s výkladem — teprve prohledání všech PDF a prezentací ukázalo, že čísla nejsou v žádném
   podkladu. Autor i kontrolor u konkrétního čísla musí umět uvést CITACI ZE ZDROJE
   (soubor + strana/úryvek); bez ní se číslo do obsahu nedostane — buď se dohledá zdroj,
   nebo se tvrzení podá kvalitativně bez čísla. Chybí-li číslo ve zdroji a je přesto
   potřeba, rozhoduje učitel.

**Když se články rozejdou:** chybu opravuj v tom SMĚRU řetězu, kde vznikla.
Chybí-li kvíz k látce → přidej otázku. Zkouší-li kvíz neprobrané → doplň výklad,
nebo otázku vyřaď. Chybí-li ve výkladu látka z PDF → dopiš výklad.
Chyba přímo v podkladech učitele se **neopravuje potichu** — zapíše se do
`~/Desktop/Omega/dokumenty/kontrola-podkladu-*.md` a hlásí učiteli.

---

## 2. Kde jsou zdroje pravdy (konkrétní cesty)

**PODMÍNKA před další prací na fyzice 6** (rozhodnutí učitele 19. 8. 2026 — bod C):
chybějící popisy prezentací se **dopíšou automatem**
(`python3 ~/Desktop/Omega/skripty/popis_prezentace.py "<cesta.pptx>"`, sekvenčně,
1 těžký proces) **DŘÍV, než se na fyzice 6 udělá další obsahová práce**. Bez popisu by
šestý ročník vznikal jen z PDF a vypadla by polovina rovnocenného zdroje (bod B).
Není to „hezké mít", je to vstupní podmínka: než začne výklad/kvíz/simulace k podtématu
6. ročníku, popis příslušné prezentace musí existovat.
**Stav k 21. 9. 2026: 39 prezentací, 36 popsáno, 3 chybí** — všechny v 6. ročníku
(`6/01 Látka/Stavba látek  .pptx`, `6/02 Síla/Síla 6 .pptx`,
`6/07 Opakování rok/Fyzika opakování  rok 6 r. .pptx`).

| co | kde | poznámka |
|---|---|---|
| **PDF učebnic (určující zdroj)** | `/Users/Shared/Škola/<ročník>/<celek>/<podtéma>/*.pdf` | 178 PDF: 6→38, 7→57, 8→39, 9→44 |
| **Původní prezentace** (leží U PDF, tamtéž) | `/Users/Shared/Škola/**/*.pptx` | 40 souborů: 6→8, 7→23, 8→5, 9→3 |
| **Popisy prezentací** (ČTOU SE MÍSTO .pptx) | `~/Desktop/Omega/dokumenty/prezentace-popisy/<název>.md` | **PODMÍNKA, viz odstavec nad tabulkou** |
| automat na popis prezentace | `python3 ~/Desktop/Omega/skripty/popis_prezentace.py "<cesta.pptx>"` | 1 těžký proces; **prezentaci nikdy nečíst po snímcích v session** |
| SmartBooks (jen zdroj faktů) | `/Users/Shared/Škola/6/SmartBooks/…` | placený obsah, viz zákazy |
| **ŠVP + RVP** | `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/staré časové plány/ŠVP-F-Sviny+RVP.docx` | závazný seznam témat |
| **Tematické plány 7/8/9** | tamtéž, `Tematický plán - Fyzika_1-<r>_ ročník.docx` | |
| **Časové plány 2026/27** | `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/Casovy plan - Fyzika <7B/8B/9> - 2026-27.xlsx` | co se kdy probírá |
| hotová kontrola souladu plán ↔ web | tamtéž, `KONTROLA-souladu-planu-a-webu.md` | zdroj otevřených otázek níže |
| **výklad na webu** | `~/Desktop/wonderly-web/src/data/temata.ts` | velký soubor — **nečíst celý**, jen výřezem |
| **kvízy** | `~/Desktop/wonderly-web/src/data/kvizy.ts` | klíč `předmět/ročník/téma/podtéma`; fyzika: 6→21, 7→33, 8→37, 9→25 bloků |
| hry | `~/Desktop/wonderly-web/src/data/hry.ts` (+ návod `/Users/Shared/Škola/Hry/NAVOD-hry-pro-tridu.md`) | otázky si berou z `kvizy.ts` |
| scénáře videí/podkástů | `~/Desktop/Omega/podkasty-scenare/<ročník>/` | postup `Omega/dokumenty/NAVOD-POLEMIKY-F6.md` |

Struktura složek učitele je zároveň **struktura učiva**:
`6/01 Látka … 08 Elektřina a magnetismus` · `7/1 Pohyb … 4 Světlo` ·
`8/1 Mechanická práce … 6 Zvuk` · `9/1 Elektřina, 2 Atom, 3 Vesmír` (+ `9/vše` s PDF po podtématech).
Podklady stahuje učitel z Google Disku — **Disk se přes asistenta nečte**, pracuje se se sdílenou složkou.

---

## 3. VÝKLAD (temata.ts)

- Vzniká **z PDF + z popisu prezentace** k témuž podtématu. Jiný zdroj se používá jen na ověření, ne jako předloha.
- **PREZENTACE JSOU ROVNOCENNÝ ZDROJ S PDF** (rozhodnutí učitele 19. 8. 2026 — bod B), ne podřízený.
  Dřívější formulace „určující je vždy PDF" **NEPLATÍ** a je z `src/pages/skola2/_CLAUDE.md` odstraněna.
  Výklad musí pokrýt látku z OBOU zdrojů. Když se PDF a prezentace liší, není to důvod dát automaticky
  přednost PDF: rozpor se **ověří** (přepočítat, porovnat se ŠVP) a **zapíše** do
  `~/Desktop/Omega/dokumenty/kontrola-podkladu-*.md` — tiché rozhodnutí ve prospěch jednoho zdroje
  je zakázané stejně jako tichá oprava podkladu (zákaz 7).
- Pokrývá celé podtéma z podkladů — a nepřidává látku navíc (řetěz, bod 1 a 2).
- Rozsah a jazyk podle ročníku; 3–6 odstavců + shrnutí.
- Každý výpočet a údaj z podkladů **PŘEPOČÍTAT** (v podkladech už chyby byly).
- Odkazy uvnitř webu **relativní**; externí odkazy **jen české** — když český zdroj není, napíše se vlastní česká stránka.
- Zdroj pravidel: `src/pages/skola2/_CLAUDE.md`, agent `worker-vyklad`, paměti
  `feedback-kontrolovat-spravnost-textu`, `feedback-odkazy-jen-cesky`.

## 4. KVÍZ (kvizy.ts)

- **Zkouší JEN to, co je ve výkladu na stránce** — a naopak pokrývá celý výklad (řetěz, bod 3).
- Správná odpověď je v datech **VŽDY první** (web míchá pořadí), 3 odpovědi, právě jedna správná.
- Vyplněné pole `vysvetleni` (ukáže se jen při špatné odpovědi — viz „platí všude").
- Otázka nesmí být kruhová; distraktor musí být věrohodný (nesmyslná možnost je nápověda).
- Vysvětlení ani zadání jedné otázky nesmí prozradit odpověď na jinou (ani v sousedním bloku).
- Duplicity: před psaním si nech vypsat VŠECHNY otázky bloku
  (`node testy/vypis-kviz.mjs <blok> --otazky`); hlídá `testy/uniky.mjs`.
- Měřidla před nasazením: `node zkontroluj.mjs` (bod 6b délky, 6c souhrnné kvízy), rohatka `pocetNaskok15`.
- **Kontrolora kvízů pouštět DVAKRÁT** — opravy podle prvního kola samy zanášely nové úniky.
- Zdroj: `src/pages/skola2/_CLAUDE.md`, skill `/wonderly` (Kvízy — pasti), `feedback-kvizy-delkova-napoveda`.
- **POČET OTÁZEK: ZÁVAZNÉ JE 21 na podtéma** (rozhodnutí učitele 19. 8. 2026 — bod A).
  Je to **CÍL na podtéma**, ne strop a ne průměr: blok pod 21 otázkami je nedodělaný.
  - **„5–8 otázek" NENÍ cíl** — je to jen velikost JEDNÉ PRACOVNÍ DÁVKY, kolik otázek napíše
    jeden worker v jednom běhu (aby se daly zkontrolovat a nevznikaly duplicity). Jako pracovní
    postup smí zůstat; **nikdy se nesmí číst jako cílový počet** — do 21 se blok doplňuje
    několika dávkami po sobě.
  - **„medián ~13" byl POPIS STAVU**, ne pravidlo — naměřená hodnota k 18. 8. 2026. Jako cíl neplatí.
  - Doplňování na 21 nesmí ohnout ostatní pravidla: otázky navíc musí být pořád jen z výkladu
    (řetěz, bod 1), bez duplicit (`testy/uniky.mjs`) a bez délkové nápovědy.

## 5. HRY

- Hry na webu (Fyzikální liga, stanoviště) **neberou otázky odjinud než z `kvizy.ts`** — dědí tím celý řetěz.
- **Externí hry a kvízy (Wordwall) jen jako ODKAZ** a jen po kontrole otázka po otázce,
  že testují pouze probrané učivo (podklady + výklad). Aktivity generované AI Wordwallu obsahovaly chyby → vyřadit.
  Kvízy manželky (účet „Kamí") patří na fox.wonderly.cz, ne sem.
- **VÝCHOZÍ NASTAVENÍ HRY NABÍZÍ JEN PROBRANÉ UČIVO** podle časového plánu daného ročníku
  (rozhodnutí učitele 19. 8. 2026 — bod E) — ne mix napříč celým ročníkem a už vůbec ne napříč 6–9.
  Mix napříč ročníky smí být jen jako VĚDOMÁ volba učitele (opakování), nikdy jako default:
  žák nesmí ve hře narazit na látku, kterou ještě neprobral. Časové plány:
  `/Users/Shared/Škola/2 stupen/Rozvrh časový plán/Casovy plan - Fyzika <7B/8B/9> - 2026-27.xlsx`.
- Výběr učiva ve hře jde omezit na ročník/celek — hra se staví jen z probrané látky.
- Zdroj: `feedback-wordwall-kontrola-pokryti`, `/Users/Shared/Škola/Hry/NAVOD-hry-pro-tridu.md`.

## 6. VIDEA a podkásty (polemiky)

- Video ke školnímu webu se **VYRÁBÍ vlastním automatem** (obrázky + zvuková stopa, hlas lokálním OmniVoice).
  **Videa se NEVYHLEDÁVAJÍ** — viz zákazy.
- Formát: **polemika dvou postav** (EVA a MAREK), ne výklad. Marek se plete tak, jak se plete většina lidí.
- **⭐ MAREK SE PLETE, EVA HO OPRAVUJE** (rozhodnutí učitele 19. 8. 2026 — platí pro VŠECHNY díly).
  V každé části musí Marek udělat **jednu až dvě typické žákovské chyby** (plete si hmotnost
  a tíhu, myslí si, že těžší těleso padá rychleji, že pára je to bílé nad hrncem) a Eva ho
  opraví. Do 19. 8. 2026 se Eva jen ptala a Marek vždycky odpověděl správně — to NENÍ
  polemika, je to skrytý výklad a rozchází se se zásadou „spor nesmí být jednostranný".
  - Omyl se říká jako **názor postavy** („já myslím, že…", „mně to přijde, že…"), nikdy
    jako tvrzení vypravěče ani jako fakt.
  - **Nikdy nesmí zaznít nesprávná informace bez okamžité opravy** — Eva ji vyvrátí hned
    v nejbližší replice a vysvětlí, jak to je správně; po opravě musí být jasno.
  - Chyba se musí týkat **probrané látky** (ohraničení výkladem na webu platí i pro omyl).
- **Kratší díly — jedno vysvětlení na díl** (rozhodnutí 6. 8. 2026); raději tři díly než jeden dlouhý.
- **Spor nesmí být jednostranný:** Marek klade námitky, které Evu nutí odpovídat přesněji.
  Jinak to není polemika, ale skrytý výklad.
- **Omyl nikdy nezazní jako tvrzení** — vždy jako cizí názor či domněnka („spousta lidí to bere tak").
  Dítě si zapamatuje i větu, která je vzápětí opravena.
- **Brána pokrytí kvízu je povinná:** `python3 skripty/pokryti_kvizu.py <slug>-dialog --tema …`;
  dokud nehlásí „pokrývá celý kvíz", díl se nevyrábí. (Měří význam, ne jen podíl slov.)
- Text jde do syntézy doslova: žádný markdown, žádné číslice, žádné značky jednotek („pět set osmdesát newtonů").
- **Schémata kreslí KÓD**, obrázkový model jen ilustrace bez měřitelného obsahu.
  Hotové snímky se VŽDY prohlédnou očima.
- Zdroj: `~/Desktop/Omega/dokumenty/NAVOD-POLEMIKY-F6.md`, skill `/podkast-video`.

## 7. SIMULACE

- Simulace vysvětluje jev, který je ve výkladu — ne jev navíc.
- **Scéna musí být pro děti logická:** voda/hustší látky dole, vzduch nahoře, gravitace dolů,
  těžší klesá. Když jev vyžaduje neobvyklou orientaci, radši překreslit scénu, ne prohodit prostředí.
- Výchozí hodnoty i **všechny polohy posuvníků** musí dávat celé výsledky.
- Stav viditelný v náhledu musí být SVG atribut, ne CSS třída; vizuální prohlídku dělá **nezávislý kontrolor**.
- Zdroj: `feedback-simulace-realisticke`, agent `worker-simulace`, skill `/simulace`.

---

## 8. Řemeslná pravidla — PLATÍ VŠUDE (bez ohledu na předmět)

- **Celá čísla.** Příklady i simulace pro děti musí vycházet v celých číslech; desetinné číslo
  jen tam, kde je samo učivem (převody jednotek) nebo jde o naměřenou konstantu (hustota, g, napětí).
  Čísla bez koncových nul (15 cm, ne 15,00 cm), znaménko − místo pomlčky. `feedback-cela-cisla-ve-vypoctech`
- **Správná odpověď nesmí být systematicky nejdelší** (cíl ~33–40 %, žádný náskok ≥ 10 znaků).
  Míchání pořadí to neřeší. Když vyjde nejdelší, **PRODLUŽ DISTRAKTORY — nekrať správnou odpověď**;
  krátit se smí jen vata, nikdy rozlišující znak. Prodloužený distraktor musí zůstat NEPRAVDIVÝ.
- **Vysvětlení vidí jen ten, kdo odpoví ŠPATNĚ** → podstata učiva patří do samotné ODPOVĚDI,
  vysvětlení jen dodává proč.
- **Zákaz úniku odpovědi:** vysvětlení ani zadání jedné otázky nesmí prozradit jinou.
- **Cizí videa se nevyhledávají** (viz zákazy).
- **Placený obsah (SmartBooks) se nezveřejňuje** (viz zákazy).
- **Autor nekontroluje sám sebe** — nové učivo, simulaci i dávku kvízů posuzuje nezávislý
  kontrolor s čerstvým kontextem. Kotvou je spočítané číslo, běh testu, `curl` na produkci — ne tvrzení „hotovo".

---

## 9. ZAKÁZANÉ

1. **Vyhledávat videa** pro školní web — ani cizí, ani vlastní, ani na YouTube, ani jinde.
   Nesmí vzniknout návrh videa embedem, odkazem, ID ani „doporučením k tématu", a to ani u českého
   a věcně skvělého videa. Najde-li se v datech webu zapsané cizí video, **odstraní se i s odkazem**.
   (Netýká se deníku cesty.wonderly.cz — tam jde o vlastní natočený materiál učitele.)
   `feedback-youtube-jen-oficialni-vlozeni`
   **STROJOVÁ BRÁNA UŽ STOJÍ** (postavena 19. 8. 2026 — bod G): `testy/cizi-videa.mjs` kontroluje
   `temata.ts` na vložená videa (`druh: 'youtube'`) I na YouTube odkazy v poli `odkazy` a porovnává
   je se seznamem schválených ID `testy/youtube-vlastni.json` (kanál učitele, ověřený přes oembed
   skriptem `youtube-schval.mjs`). Je zapojená do `zkontroluj.mjs`, tedy do prebuildu — **neschválené
   ID SHODÍ BUILD**, offline i online. Obousměrný doklad: `testy/cizi-videa-obousmerne.mjs`
   (zapsán v `testy/obousmerne.json`). Deníku se brána nedotýká (dostává výhradně objekt `temata`).
2. **Zveřejňovat SmartBooks PDF** (uceni.smartbooks.cz) — placený obsah; slouží jen jako zdroj faktů.
3. **Testovat, co není ve výkladu** — kvízem, hrou, externí aktivitou ani tisknutelným testem.
4. **Přidávat do výkladu látku, která není v podkladech** (PDF + prezentace) ani v ŠVP.
5. **Desetinná čísla mimo učivo** v příkladech pro děti.
6. **Anglické externí odkazy** — když český zdroj není, napíše se vlastní česká stránka.
7. **Tiché opravy chyb v podkladech učitele** — hlásí se a zapisují.
8. **Číst .pptx po snímcích v session** — používá se hotový popis, jinak se vyrobí automatem.
9. **Mazat nebo přesouvat cokoli v `/Users/Shared/Škola`** — jediné zdrojové podklady učitele.
10. Tisknutelný test `…/test/` je jen pro učitele (heslo `ucitel-wonderly`) — neodkazovat na něj z žákovských stránek.

---

## 10. PLÁN × WEB — rozdíl NENÍ vada webu

**Rozhodnutí učitele 19. 8. 2026 (bod D):** nesoulady mezi časovým/tematickým plánem a webem
se **NEŘEŠÍ srovnáváním webu**. **Plán se bude teprve dodělávat, web zůstává, jak je.**
Rozdíl plán × web tedy **NENÍ vada webu** a nesmí se hlásit jako chyba, ani se podle něj nesmí
z webu nic ubírat. Kontrola `KONTROLA-souladu-planu-a-webu.md` (11. 7. 2026) je od teď
**informace pro učitele o stavu plánu**, ne seznam oprav.

Konkrétně se tedy NEOPRAVUJE podle plánu (a nic z toho není chyba webu):
1. VIII.B 2026/27 má 59 h, tematický plán 8 počítá s 68 h.
2. Meteorologie: ŠVP ji má v 8. ročníku, učitel ji učí v 7.
3. Atom/iont/molekula: ŠVP je chce v 8 před elektřinou, web je má až v 9.
4. Web 9 nemá kosmonautiku; nemá druhy elektráren, jaderné havárie, první pomoc při úrazu proudem.
5. Web 8: pokrytí zvuku (ultrazvuk/infrazvuk, ozvěna).
6. Bod „web nemá 6. ročník" je neplatný — fyzika 6 má 21 kvízových bloků.

**Pozor na hranici:** tohle rozhodnutí ruší jen srovnávání s PLÁNEM. Řetěz zdrojů (kapitola 1)
platí dál — chybí-li ve výkladu látka, která JE v PDF nebo v prezentaci daného podtématu,
je to pořád vada a dopisuje se. Rozdíl je v tom, že měřítkem je **podklad k podtématu**,
ne rozpis hodin.

---

## 11. UZAVŘENO — bod F rozhodnut zavedenou praxí, ne čekáním na učitele

**F. Kratší díly vs. povinné pokrytí celého kvízu.** `NAVOD-POLEMIKY-F6.md` chce
„jedno vysvětlení na díl" (rozhodnutí 6. 8. 2026) a zároveň „polemika pokrývá VŠECHNY
kvízové otázky tématu". Po rozhodnutí A (cíl 21 otázek na podtéma) se to pere ještě víc
než dřív. ROZHODNUTO podle zavedené praxe: kvíz tématu pokrývá **SÉRIE dílů
dohromady**, jednotlivý díl pokrýt celý kvíz nemusí. Brána `pokryti_kvizu.py` dál
měří JEDNOTLIVÝ DÍL, protože měřidlo na sérii zatím neexistuje — do jeho vzniku se
sladění kvízu se sérií ověřuje ručně (viz `PROGRESS.md` „sladění kvízů").

Nic dalšího otevřené není — body A–H učitel rozhodl 19. 8. 2026 a jsou zapsané
výše v těle ústavy (A → kap. 4, B → kap. 3, C → kap. 2, D → kap. 10, E → kap. 5,
G → kap. 9 bod 1, H → preambule), F je vyřešen zavedenou praxí výše.

---

## 12. HOTOVÉ TÉMA — rozšířená definice (rozhodnutí učitele 22. 9. 2026, upraveno 23. 9. 2026)

Téma je HOTOVÉ, teprve když má VŠECH těchto devět složek:

1. přestavěný výklad (text seřízený podle zadání této ústavy),
2. zápis do sešitu,
3. kvíz 21 otázek sladěný s výkladem (prošlý dvěma koly nezávislé kontroly),
4. **simulace (= interaktivní infografika)** — klikací/odkrývací schéma i simulace
   s posuvníkem/parametry se počítají jako TOTÉŽ, jedna složka, ne dvě
   (rozhodnutí učitele 23. 9. 2026, varianta B z `NAVRH-CHYBEJICI-KATEGORIE.md`),
5. české odkazy,
6. **video-polemiku s ANIMACÍ toho, o čem se v ní mluví** — ne statické obrázky,
   ne jen audiostopa,
7. infografiku (statickou, bez interakce — odlišnou od bodu 4),
8. laboratorní práci,
9. **hru pro skupinu** — SAMOSTATNÁ hra vázaná na konkrétní podtéma (plná varianta),
   NE pouhé rozšíření Fyzikální ligy o výběr podtématu (rozhodnutí učitele 23. 9. 2026).

**Změna 23. 9. 2026 — proč z deseti na devět:** původní znění z 22. 9. 2026 mělo
deset složek a rozlišovalo body 4 (simulace) a 8 (interaktivní infografika) jako
dvě různé věci. Učitel na kontrolní otázku přiznal, že jde o totéž — obojí je
interaktivní ukázka, jen s jiným ovládacím prvkem — a rozhodl je sloučit
(viz `NAVRH-CHYBEJICI-KATEGORIE.md`, varianta B). Hotových 92 simulací tím
POKRÝVÁ tuto sloučenou složku. U hry pro skupinu učitel zároveň upřesnil, že
nestačí rozšířit Fyzikální ligu o výběr podtématu — má jít o plnohodnotnou
samostatnou hru vázanou na dané podtéma.

**Pořadí práce:** 1. téma se dodělá KOMPLET (všech 9 složek) u 7., 8. i 9. ročníku
naráz, teprve pak se stejně KOMPLET dodělá 2. téma u všech tří ročníků, atd. —
nedodělává se jeden ročník do konce, zatímco ostatní čekají.

**Přechodné ustanovení:** kde dnes existuje jen audiostopa bez animace, zůstává
zveřejněná a animace se k ní doplní postupně; videa se statickými obrázky se
postupně vymění za animace. Chybějící animace tedy NENÍ důvod stahovat z webu
hotové audio, které tam už je.

Tato definice je jediné platné a úplné znění — nahrazuje a rozšiřuje dřívější
užší definici v `SAMOSTATNY-REZIM.md`, bod E (ii); tam zůstává jen odkaz sem.

**Měřitelný práh animace (doplněno 23. 9. 2026, OPRAVENO 23. 9. 2026 — viz níže):**
bod 6 dosud říkal jen „ne statické obrázky", bez čísla — to umožnilo, že pilot
`magnety-opakovani-dialog1-PILOT-animace.mp4` (62 unikátních z 2 816 snímků, poměr 0,022)
prošel jako „animovaný díl", než ho učitel označil za „jednu fotku".

**OPRAVA téhož dne:** první verze měřidla počítala poměr unikátních snímků přes CELÉ
video vzorkované po 1 s. To ale měří počet STŘIHŮ SCÉN, ne pohyb — statický díl
`atomy-a-molekuly-atom-dialog.mp4` (jen 1 animovaná scéna ze 14, zbytek plakáty) tak
vyšel na 57 % a prošel by jako „animovaný", protože prolínačky (`xfade`, 0,6 s)
a časté střídání plakátů samy vyrábí „unikátní" snímky, i když se v obraze nic nehýbe.
Platí proto nová, opravená definice:

- **Jednotka měření je SCÉNA, ne celé video.** Scéna má svůj obrázek
  `podkasty-snimky/<slug>/scena-NN.png`; je-li animovaná, vedle něj leží i klip
  `scena-NN.mp4`, který `video_podkastu.py` přehraje místo statického obrázku.
- **OPRAVA 24. 9. 2026 — práh 0,85/0,50 na poměru unikátních snímků ZRUŠEN.** Klipy
  jsou záměrně stavěné jako „krok – prodleva – krok" (pohyb, pak chvíle na přečtení
  popisku, viz `animace_podkastu.py` `krok(1.0, ..., hybat=False)` a
  `_kroky_zebriku`) — `mpdecimate` úmyslné prodlevy zahazoval jako duplicity, takže
  poctivá krokovaná animace propadala jako „statická" (43 klipů pod prahem, ŽÁDNÝ
  z nich skutečně statický). Kalibrace navíc byla kruhová: vzorové „statické" díly
  `hustota-dialog` a `atomy-a-molekuly-atom-dialog` byly ve skutečnosti animované.
- **Video se počítá jako ANIMACE, jen když má ALESPOŇ JEDNU scénu, která (a) má
  vlastní klip `scena-NN.mp4`, (b) má ALESPOŇ 10 RŮZNÝCH snímků (ffprobe + `mpdecimate`
  na celém klipu) A (c) obsahuje SOUVISLÝ ÚSEK POHYBU dlouhý alespoň 1,5 s (měřeno
  `tblend=difference` + `signalstats`, snímky nad prahem YAVG 0,01 spojené i přes
  krátké mezery do 0,2 s).** Pouhá existence klipu doklad animace není. Úmyslná
  prodleva na čtení popisku se netrestá — stačí JEDEN dost dlouhý souvislý úsek
  pohybu, video nemusí být v pohybu celou dobu.
- **Zdůvodnění:** kalibrace na uměle statickém klipu (1 PNG jako 6s video → 1 snímek,
  0 s pohybu → STATICKÉ) a čtyřech ověřených dílech (24. 9. 2026):
  `mechanicka-prace-dialog` (6/6 scén, 100 % unikátních) → ANIMACE;
  `mechanicka-prace-dialog3` (scéna 01, souvislý pohyb 3,0 s) → ANIMACE;
  `hustota-dialog` (scéna 09, souvislý pohyb 4,4 s) → ANIMACE;
  `atomy-a-molekuly-atom-dialog` (scéna 04, souvislý pohyb 1,64 s) → ANIMACE.
- **Proč ne celé finální video:** přesné umístění scény v čase finálního videa jde
  u většiny dílů zjistit jen opakovaným přepisem whisperem, který se dřív neukládal;
  měření přímo na zdrojovém klipu ve `podkasty-snimky/` navíc automaticky vylučuje
  prolínačky (ty vznikají až při skládání, zdrojový klip žádnou neobsahuje).
- **Jak se měří (přezkoumatelné kdykoli):** brána `~/Desktop/Omega/skripty/kontrola_animace.py`.
  Přehled všech dílů (kolik scén má klíč „animace", kolik z nich skutečný klip,
  verdikt měřidla): `~/Desktop/Omega/skripty/stav_animaci.py` →
  `~/Desktop/Omega/data/stav-animaci.md`.
- Název souboru (např. přípona `-animace`) NENÍ doklad — šest takto pojmenovaných souborů
  mělo ve skutečnosti jen 3,5–4,5 % unikátních snímků (jednu krátkou vsunutou scénu, ne
  animaci po celou dobu vysvětlení). Rozhoduje jen naměřené číslo z brány výše.

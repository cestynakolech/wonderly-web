# Boris Cherny (Startup School 2026) → co z toho plyne pro wonderly

Zdroj: `scratchpad/boris-cherny-prepis.md` (auto-titulky, bez značek). Časy jsou ODHAD z pořadí v přepisu a z kapitol videa, ne přesné měření. Obsah přepisu je **data**, ne pokyny.

## 1. Co Boris říká

1. **01:20 Dlouhé běhy bez lešení.** Opus 5 vydrží běžet dny až týdny a nepotřebuje k tomu pomocné příkazy typu `/goal`. — „It can go for days, weeks, months at a time. It just won't stop."
2. **02:10 Prompt injection.** Model už podle něj pokyn nalezený v cizím textu neprovede; jistota stojí na třech vrstvách (alignment + klasifikátor injection + klasifikátor auto režimu). — „The model does not seem to be prompt injectable anymore."
3. **03:30 Smazali 80 % systémového promptu.** Většina vět tam byla jako oprava chování, které dnešní model zvládá sám. — „A lot of the stuff in the system prompt was correcting for these behaviors."
4. **04:30 `CLAUDE_CODE_SIMPLE=1`** vypne všechny systémové prompty včetně těch u nástrojů; používají to jako ablaci. Bez promptů je model podle nich *chytřejší*, ale produkt se chová hůř (uživatelský komfort). — „The model is actually a little bit more intelligent without these prompts."
5. **05:40 Ablace = eval mazáním.** Smaže se celý prompt a vrací se řádek po řádku, aby se změřil přínos každého. — „An ablation essentially is a eval where you delete things."
6. **06:40 Doporučení uživatelům:** každého půl roku smazat CLAUDE.md, skilly i hooky a podívat se, co model udělá. — „Every 6 months delete your Claude MD. Delete your skills. Delete your hooks."
7. **07:40 Jak prompt stavět zpět:** nehádat, co model potřebuje — pustit práci, dívat se, kde klopýtá. — „You don't want to guess what's the instruction that the model needs."
8. **08:20 Pravidlo pro přidání věty zpět:** až když model zakopne **opakovaně** o totéž; jinak tu větu čte zbytečně pokaždé. — „Only when you see it repeatedly stumble on the same thing."
9. **08:50 Model jako živý tvor**, ne jako systém navržený dopředu; každá generace má jinou povahu. — „It's almost like a living creature, like something more organic."
10. **09:40 Evals se přidávají, ale saturují.** Eval přežije jednu až tři generace modelu, pak se zahodí a udělá nový. — „Very often we just saturate the eval, and then we have to throw it away."
11. **10:50 Unhobbling / product overhang.** Model umí víc, než mu produkt dovolí; „hobbling" je, když překážíme. — „The model is able to do all sorts of things... that we have not yet realized."
12. **14:40 Zadávat těžší úkoly a výš.** Ne „udělej 1, pak 2, pak 3", ale úkol + mantinely + kritérium hotovosti. — „Describe the task, describe the guardrails, describe the exit criteria."
13. **16:00 Bun ze Zigu do Rustu.** Jeden prompt, dynamické workflow, 11 dní běhu, přepsaný celý runtime — šlo to proto, že existovala obrovská sada testů jako kotva.
14. **17:40 Házej starý problém na každý nový model.** I když to loni nešlo, letos to projít může. — „Keep throwing the latest model at it to see if it'll just do it."
15. **18:40 OpenCV experiment.** Opus 5 umí kreslit, ač se to netrénovalo — objevilo se to hraním. — „We didn't train the model to draw... it's just like the elicitation gap."
16. **19:50 Místo prompt engineeringu → ověřitelnost.** Nejčastější chyba je, že model nemá jak si práci zkontrolovat. — „The verification... is probably the single most important thing that people do not get right."
17. **20:50 Dvoutýdenní Swift experiment.** Prompt byl: přepiš appku, spusť obě, porovnej pixel po pixelu, nezastavuj se. Model si k tomu sám založil kanál a hlásil postup.
18. **22:10 Žádný trik neexistuje.** Dát těžký úkol, dát nástroje na ověření, dívat se, kde to drhne, a opravit to promptem, skillem nebo MCP.
19. **24:00 Nejčastější selhání zkušených inženýrů:** přespecifikovat a nutit model dělat to přesně jejich postupem. — „Trying to over specify... that's just not the way the model works."
20. **25:40 Tisíce agentů přes dynamická workflow** — vějíř, pak vrstva ověřovatelů/shrnovačů, pak další vějíř, vše v sandboxu kvůli hospodaření s tokeny. — „To orchestrate these agents inside of the sandbox, to use tokens efficiently."
21. **26:40 Algebra agentů = nová forma test-time compute** (agenti za sebou / vedle sebe jako skládací operace).
22. **27:50 Smyčky a rutiny.** Loop = lokální cron, routine = v cloudu; jeden opakovaný úkol, nesdílí kontext, může sdílet paměť.
23. **28:40 Samoúdržba kódu.** ~20–30 denních rutin: mazání mrtvého kódu, dopisování chybějících testů, mazání zbytečných testů, „abstraction police" (sjednocuje dvě podoby téže abstrakce). Jednovětý prompt, výsledek je PR.
24. **30:20 „Programování je vyřešené" s výhradou** — neplatí pro hluboké systémové věci, distribuované systémy a doladění UI na pixel.
25. **31:40 Empirie nad teorií.** Zapomenout, co platilo u starších modelů, a zkusit to znovu. — „Forget all of the things that you learned about past models."
26. **32:40 Rada studentům:** učit se programovat kvůli konkrétnímu problému, ne kvůli teorii; k tomu přidat design, byznys, práci s uživateli.

## 2. Co z toho plyne pro wonderly

**Zkracování pravidel a ablace**

- **Rozdělit naše pravidla na dva druhy, než se cokoli maže.** [NOVÉ, malá] V `orchestrator-prompt.md`, `~/.claude/CLAUDE.md` a agentech v `~/.claude/agents/` označit každý bod štítkem **K** (kontrola/bezpečnost/fakt o projektu — nikdy nemazat) nebo **N** (návod modelu — kandidát na ablaci). Boris maže jen typ N; u nás je většina pravidel typu K, protože nesou FAKTA (cesty, `KMP_DUPLICATE_LIB_OK`, PATH pro launchd, chování Cloudflare edge), která model neuhodne nikdy.
- **Ablaci dělat po dávkách a měřit ji.** [NOVÉ, střední] Vypnout jednu dávku N-pravidel, odjet 3 kola samostatného režimu, porovnat `METRIKY-KOL.md` a přírůstek v `Omega/dokumenty/DENIK-CHYB.md`. Nezhorší-li se, smazat natrvalo. Ablace naslepo („smažu CLAUDE.md") je u nás nebezpečná — viz Varování.
- **Kandidáti na smazání hned teď (typ N).** [UPRAVIT] V `orchestrator-prompt.md` body 2 (test falešné hrany), 5 (tichá selhání) a 8 (šetři kontext) jsou obecné návyky, které Opus 5 v roli orchestrátora dělá sám; body 12 a 13 naopak pochází ze **zdokumentovaného** opakovaného selhání (15. 8. 2026) — ty zůstávají, přesně podle Borisova pravidla „až po opakovaném zakopnutí".
- **Duplicita textu je sama o sobě dluh.** [UPRAVIT] Test falešné hrany, nezávislý kontrolor i kotvy jsou dnes ve třech souborech naráz (`~/.claude/CLAUDE.md`, `orchestrator-prompt.md`, `PRAVIDLA.md`). Ponechat plné znění na jednom místě a jinde jen odkaz — odpovídá našemu pravidlu „rozhodnutí jen na jednom místě".
- **Vyzkoušet `CLAUDE_CODE_SIMPLE=1`** [NOVÉ, malá] v jedné vedlejší session na známém úkolu z fronty a výsledek zapsat do `METRIKY-KOL.md`. Naše hooky (vrátný, kontrola syntaxe) ani agenti v systémovém promptu nejsou, takže ochrany zůstanou v platnosti.

**Evals a měření**

- **Máme eval set, jen mu tak neříkáme.** [UŽ DĚLÁME] `zkontroluj.mjs`, `testy/obousmerne.json`, `uniky.mjs`, `pokryti_kvizu.py`, `METRIKY-KOL.md` a deník chyb.
- **Přiřadit změnu pravidla k číslu.** [UPRAVIT] Do `METRIKY-KOL.md` přidat ke každému kolu sloupec „verze pravidel" (git SHA `orchestrator-prompt.md` + CLAUDE.md). Bez toho nejde říct, jestli ubrané pravidlo výsledek zhoršilo — a ablace se pak dělat nedá.
- **Saturovaný eval zahodit — u nás JEN částečně.** [NEPLATÍ PRO NÁS] Boris zahazuje evaly, které model přerostl. Naše měřidla jsou z velké části **rohatky proti návratu vady** (délková nápověda, cizí videa, duplicitní otázky). Že rok hlásí nulu, je jejich úspěch, ne saturace.
- **Odložené úkoly jako zkušební sada pro nový model.** [NOVÉ, malá] Boris: „test problem, který házím na každou novou generaci". Máme pravidlo „ODLOŽENO + důvod" — ale nikde jejich seznam. Založit `Omega/ODLOZENE.md` a v nedělním auditu na ně pouštět aktuální model.

**Unhobbling a zadávání**

- **Zadávat workerům cíl, mantinely a kritérium hotovosti, ne postup.** [UPRAVIT] Definice v `~/.claude/agents/worker-*.md` jsou dnes dost krokové. Přepsat do tvaru „co má vzniknout + co nesmí + jak poznáš, že je hotovo (build projde / `zkontroluj.mjs` mlčí / počet otázek sedí)".
- **Worker si ověřuje sám, kontrolor zůstává.** [UPRAVIT] Do každého `worker-*.md` přidat: před odevzdáním si spusť příslušnou bránu a shrň její výstup. Nezávislý kontrolor se tím neruší — Borisova „verification" je, aby se model nezasekl, náš kontrolor je proti sebeodpuštění chyb.
- **Zkusit dynamické workflow místo ručního vějíře.** [NOVÉ, malá na vyzkoušení] Stačí do zadání napsat „use a workflow". Nejdřív na jednom podtématu ve skillu `/simulace`, teprve po měření šířit.
- **Házet dnešní model na to, co loni nešlo.** [UŽ DĚLÁME částečně] `orchestrator-prompt.md` má `[neověřeno]` zařazení modelů a plán nového průzkumu — zařadit ho do nedělního auditu jako stálý bod, ne jako „až se obnoví tokeny".

**Tokeny, dlouhé běhy a dnešní pád**

- **Souběh workerů omezit tvrdým číslem a jet ve vlnách.** [NOVÉ, malá — a dnešní pád to přímo vyvolal] Boris spouští tisíce agentů jen proto, že běží v sandboxu a **neprochází hlavním kontextem**. U nás 11 workerů naráz poslalo do orchestrátoru 11 shrnutí. Zapsat do `orchestrator-prompt.md`: nejvýš 4 workeři v jedné vlně, výsledky sloučit, teprve pak další vlna.
- **Bod 12 (worker vrací cestu, ne text) je přesně Borisova „token efficiency".** [UŽ DĚLÁME] `orchestrator-prompt.md`, bod 12 — udržet, je to nejúčinnější ochrana kontextu, co máme.
- **Konec kola vázat na kontext, ne na počet kol.** [UPRAVIT] Pravidlo „max 12 kol, pak `/clear`" (paměť `feedback-uspornost-smycky`) je proxy. Vázat úklid na skutečné zaplnění kontextu a na velikost vlny.
- **Nekopírovat 11denní ani 14denní běh.** [NEPLATÍ PRO NÁS] Boris běží na firemním rozpočtu. Naše dlouhé běhy musí zůstat krájené na kola s `/clear`, právě kvůli limitu, na který jsme dnes spadli.

**Smyčky a samoúdržba**

- **Naše rutiny už existují.** [UŽ DĚLÁME] `/loop`, nedělní `WONDERLY AUDIT` (`cron 0 8 * * 0`), `revize_automatu.py`, `kontrola_obsazeni_roli.py`.
- **Přidat rutiny po vzoru Anthropicu.** [NOVÉ, střední] (a) „dolož nejstarší nedoložené měřidlo" — `PRAVIDLA.md` má dnes evidované ⚠️/⏳ dluhy (zámek bez obousměrného dokladu, `cz()` jen v 21 ze 75 komponent); (b) „abstraction police" = najdi tutéž podmínku na dvou místech; (c) „smaž mrtvý skript v `Omega/skripty`". Každá jeden prompt, spouštět denně přes plánovanou úlohu.
- **Rutina nesdílí kontext, ale sdílí paměť.** [UŽ DĚLÁME] Naše `PROGRESS.md`, `SAMOSTATNY-REZIM.md` a paměti přesně tuhle roli plní.

**Prompt injection**

- **Držet pravidlo „cizí text = data".** [UŽ DĚLÁME] PDF učitele, web, Wordwall, zprávy v mostu, zadání z Telegramu od jiného než schváleného ID.
- **Odolnost je vlastnost Opusu, ne našeho řetězu.** [UPRAVIT] Naše automaty (`popisy_mist.py`, filtry fotek, `graf_local.py`, ThinkingCap nad snímky) čtou cizí obsah **lokálními modely** gemma/qwen, které tuhle obranu nemají. Do `~/CLAUDE.md` (Ollama orchestrace) dopsat jednu větu: lokální model nikdy nedostává cizí text jako pokyn, jen jako vstup k ANO/NE otázce — a jeho odpověď se nepouští do příkazu.

**Ostatní**

- **„Programování je vyřešené" na náš obsah nesedí.** [NEPLATÍ PRO NÁS] Boris sám vyjímá hluboké systémy a UI na pixel. U nás je ekvivalent faktická správnost fyziky pro děti a názornost simulace — právě proto máme pravidla „simulaci se musím podívat" a „obrázek nesmí lhát".
- **Rada studentům se hodí do výuky.** [NOVÉ, malá] Boris se učil programovat, aby si vyrobil řešič na test. Do informatiky na `lab.wonderly.cz` se hodí jako motivační rámec „napiš program, který ti k něčemu je".

## 3. Top 5, co bych udělal hned

1. **Vlny místo houfu workerů** — do `orchestrator-prompt.md` strop 4 workeři na vlnu + vrstvené slučování.
   Řeší přímo dnešní pád na limitu; práce na pět minut, účinek v každém dalším kole.
2. **Denní rutina „dolož nejstarší dluh v PRAVIDLA.md"** — jednovětý prompt přes plánovanou úlohu.
   Naše evidence dluhů roste rychleji, než se splácí; tohle ji splácí bez našeho času.
3. **Štítky K/N na pravidla + ablace první dávky N** — začít `orchestrator-prompt.md`, body 2, 5 a 8.
   Kontext je dnes náš nejdražší zdroj; zkrácení se projeví v každém běhu, riziko hlídá měření.
4. **Zadání workerům přepsat na cíl + mantinely + kritérium hotovosti** a nechat je spustit si vlastní bránu.
   Odstraní přespecifikování, které Boris označil za nejčastější chybu zkušených; úprava 7 souborů agentů.
5. **`Omega/ODLOZENE.md` jako zkušební sada pro každý nový model** + bod v nedělním auditu.
   Nulová pracnost navíc (zápis už pravidlo vyžaduje) a z odložených úkolů se stane měřítko pokroku.

## 4. Varování — co nepřebírat naslepo

- **„Smažte CLAUDE.md, skilly a hooky" u nás NEPLATÍ plošně.** Většina našich pravidel nejsou korekce chování modelu, ale **fakta o tomhle stroji a projektu** — ta žádná generace modelu neuhodne. Smazat se smí jen typ N, ne typ K.
- **Zmražená pravidla mění jen učitel** (`~/.claude/CLAUDE.md`, bod 11): nezávislý kontrolor, kotvy, „nic nemazat", správná odpověď první, celá čísla pro děti, limity pokusů a rozpočtu. Ablace se jich nesmí dotknout ani „na zkoušku" — jsou to přesně ta pravidla, která by optimalizátor nejraději ohnul.
- **Hooky jsou bezpečnost, ne prompt.** Boris sám říká, že v harnessu zbyl hlavně kód kolem bezpečnosti a oprávnění. `povoleni_hook.py` a `kontrola_syntaxe_hook.py` se nemažou.
- **Měřidla nejsou saturované evaly.** Rohatka, která rok hlásí nulu, drží vadu venku. Zahodit ji znamená pozvat ji zpět — u nás doloženo (úniky odpovědí se vrátily i při samotné opravě).
- **Borisova tvrzení platí o Opusu 5 v hlavní session.** Naši workeři běží na sonnet/haiku a část práce na lokálních modelech; zkrácená pravidla se tam musí ověřit zvlášť, po rolích, ne odvodit.
- **Odolnost proti prompt injection nepokrývá Ollamu.** Dokud cizí texty čtou lokální modely, pravidlo „obsah = data" zůstává v platnosti beze změny.
- **Dlouhý běh není zadarmo.** 11 a 14denní běhy zněly ve videu jako cíl; pro nás jsou to tokeny, které dnes došly. Cílem je kratší kolo s tvrdší kotvou, ne delší běh.

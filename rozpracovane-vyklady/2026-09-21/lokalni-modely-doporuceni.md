# Lokální modely pro Ollamu na tomto Macu — doporučení (rešerše 21. 9. 2026)

## Stroj

| parametr | hodnota |
|---|---|
| RAM (sjednocená paměť) | **64 GB** (`hw.memsize` = 68 719 476 736 B) |
| procesor | **Apple M5 Pro** (má GPU Neural Accelerators, které MLX runner v Ollamě využívá) |
| macOS | 27.0 |
| Ollama | **0.34.0** (10. 9. 2026) — k dispozici je 0.34.2 (17. 9.) s opravou nárůstu paměti u MLX spekulativního dekódování a 0.34.3 (19. 9.) |
| dnes stažené modely | gemma4:26b (17 GB), gemma4:31b (19 GB), qwen3.8:27b-mlx (18 GB), qwen3:30b-a3b (18 GB), qwen3-coder:30b (18 GB), ThinkingCap-Qwen3.6-27B GGUF (17 GB), gpt-oss:20b (13 GB), qwen3:8b, llama3.1, bge-m3 |

**Filtr paměti:** při 64 GB se bezpečně vejde jeden model do ~24 GB + kontext (u 27B modelů stojí KV cache cca 64 kB/token → 32K kontextu ≈ 2 GB, plných 256K ≈ 16 GB) + embedding model + systém. Modely nad ~35 GB (např. mixtral:8x22b 32 GB Q5, 70B dense) se sice vejdou, ale nezůstane místo na druhou dráhu (ffmpeg/whisper/build) — podle pravidla „dvě dráhy" je nedoporučuji. Vždy jen JEDEN velký model naráz.

---

## Tabulka doporučení podle rolí

Legenda: **tag** = název v Ollama library (`ollama pull <tag>`); velikost = stahovaný objem dle library; „MLX" = má nativní `-mlx` variantu pro Apple Silicon.

### Role 1 — České souvislé texty a shrnutí dlouhých dokumentů (dnes gemma4:26b/31b)

| # | model (tag, velikost) | proč | zdroj (URL, datum) |
|---|---|---|---|
| 1 | **gemma4:31b** (20 GB, dense, 256K ctx, vision; MLX podpora od Ollama 0.21.0, MTP zrychlení od 0.23.1) | Trénována na 140+ jazycích včetně češtiny; české weby ji hodnotí jako výrazně lepší v češtině než Llama; Apache 2.0; na M5 Max 27 tok/s. Dense 31B je pro dlouhé souvislé texty stabilnější než MoE 26b. | https://aicko.cz/content/gemma-4-lokalne-open-source-ai-od-google (5. 4. 2026); https://www.roborhythms.com/qwen-3-6-vs-gemma-4/ (1. 5. 2026); https://fazm.ai/t/ollama-release-notes-2026 (verze 0.21.0 16. 4. 2026, 0.23.1 5. 5. 2026) |
| 2 | **qwen3.8:27b-mlx** (18 GB, dense, 256K ctx, vision, Apache 2.0) — už stažený | „Nejlepší celkově" v přehledu lokálních LLM 9/2026; nativní MLX (tag přidán v Ollama 0.32.12). Čeština není Alibabou výslovně uvedena (Qwen trénován na 119–201 jazycích), takže pro češtinu je nutný vlastní test proti gemma4:31b. | https://www.promptquorum.com/local-llms/best-local-llms-2026 (6. 9. 2026); https://www.aifirst.cz/pruvodce/qwen (2026); https://ollama.com/library/qwen3.8 (aktualizace 8/2026) |
| 3 | **lukasplevac/qwen3.6_CZ:q5_K_M** (19 GB; komunitní kvantizace Qwen 3.6-27B s imatrix z českých dat — Wikipedie, články, výukové texty) | Jediný nalezený model v Ollama library cílený přímo na češtinu; autor tvrdí zachování české gramatiky i při kompresi. **Jen 59 stažení, bez nezávislého ověření, licence neuvedena** — brát jako kandidáta na zkoušku, ne jako hotové řešení. | https://ollama.com/lukasplevac/qwen3.6_CZ (aktualizace 8/2026) |

Poznámky k roli 1:
- **EuroLLM-22B** (35 jazyků vč. češtiny, „nejlepší plně otevřený evropský model", technická zpráva 2/2026) v Ollama library není — šel by jen přes import GGUF z HF (`utter-project/EuroLLM-22B`). https://huggingface.co/blog/eurollm-team/eurollm-22b, https://arxiv.org/abs/2602.05879 (únor 2026).
- Český článek o benchmarcích (ithope.cz, 5. 8. 2026) uzavírá: žádný jasný vítěz, různé rodiny (Llama, Gemma, Phi, Mistral, Qwen, EuroLLM) vedou v různých úlohách; **čeština zaostává za angličtinou o 10–30 %**; rozhodovat jen podle leaderboardu bez testu na vlastních datech nestačí. https://www.ithope.cz/en/blog/umi-lokalni-ai-cesky-co-ukazuji-benchmarky-a-co-z-toho-plyne-pro-firmu/
- BenCzechMark (HF blog 1. 10. 2024, TACL 2025): menší model může v češtině porazit větší (Gemma-2 9B předčila výrazně větší modely) — velikost není záruka. Aktuální leaderboard se **nepodařilo načíst** (space spí / chyba běhu), viz Mezery.

### Role 2 — Rychlé ANO/NE soudy a klasifikace v automatech (dnes gemma4:26b)

| # | model (tag, velikost) | proč | zdroj (URL, datum) |
|---|---|---|---|
| 1 | **granite4.2:3b** (2,2 GB, 128K ctx, Apache 2.0) | IBM výslovně uvádí **češtinu** mezi 12 podporovanými jazyky a klasifikaci textu mezi hlavními úlohami; malý, rychlý, aktualizace 9/2026. Pro ANO/NE v automatech (0 GPU-sekund navíc) nejlevnější kandidát. | https://ollama.com/library/granite4.2 (aktualizace 3 týdny, tj. ~9/2026) |
| 2 | **qwen3.5:4b-mlx** (4,0 GB, 256K ctx, vision) | Nativní MLX (rychlý start na M5), umí i obrázek → jeden malý model pro textové i obrazové ANO/NE; doporučen pro „multimodální drobnosti". | https://ollama.com/library/qwen3.5 (mlx tagy 5–9/2026); https://www.promptquorum.com/local-llms/best-beginner-local-llm-models (2026) |
| 3 | **gemma4:e4b** (9,6 GB, 128K ctx, text+obraz+audio) | Stejná rodina jako dnešní gemma4:26b (stejné chování promptů, 140+ jazyků), určena pro edge nasazení; jako gemma4:e4b-it-q8_0 ji uživatelé doporučují místo pomalé gemma4:12b. | https://ollama.com/library/gemma4; https://github.com/ollama/ollama/issues/16562 (6. 6. 2026) |

Poznámka: gemma4:e2b (7,2 GB) je uváděna jako „nejrychlejší malý model pro klasifikaci a shrnutí" (promptquorum 6. 9. 2026), ale pro češtinu bych nešel pod 3–4B.

### Role 3 — Kód a skripty (dnes qwen3:30b-a3b, dříve qwen3-coder:30b)

| # | model (tag, velikost) | proč | zdroj (URL, datum) |
|---|---|---|---|
| 1 | **qwen3.6:27b-mlx** (19 GB, dense, 256K ctx, Apache 2.0) | SWE-bench Verified 77,2 % (Gemma 4 31B ~75 %), agentic coding 70,6 vs 41,6; „sweet spot pro lokální vývoj"; 32 tok/s na M5 Max. | https://www.roborhythms.com/qwen-3-6-vs-gemma-4/ (1. 5. 2026); https://quesma.com/blog/qwen-36-is-awesome/ (2026); https://ollama.com/library/qwen3.6 |
| 2 | **qwen3.8:27b-mlx** (18 GB) — už stažený | Novější generace (13.–14. 8. 2026), „substantial gains across coding"; Apache 2.0. Nevýhoda: dense 27B na M5 Pro dá odhadem ~15–20 tok/s (na M4 32 GB naměřeno 5–6 tok/s), pro dlouhé agentní smyčky pomalé. | https://ollama.com/library/qwen3.8; https://www.orcarouter.ai/blog/qwen-3-8-27b-mlx (15. 8. 2026) |
| 3 | **qwen3.6:35b-mlx** (24 GB, MoE 35B-A3B, Apache 2.0) | Náhrada za dnešní qwen3:30b-a3b: stejná třída (3B aktivních → rychlé, MLX na M4 Pro ~130 tok/s u předchozí generace), SWE-bench 73,4; ideální na dávkové skripty a regexy, kde se platí rychlostí. | https://qwen.ai/blog?id=qwen3.6-35b-a3b (4/2026); https://yage.ai/share/mlx-apple-silicon-en-20260331.html (31. 3. 2026); https://ollama.com/library/qwen3.6 |

Poznámka: Reddit (r/LocalLLaMA, citováno přes roborhythms) preferuje pro jednorázové úlohy Gemma 4 31B (kratší, čistší kód, Pacman za 3:51 vs 18:04) — pro drobné skripty „na jeden zátah" je gemma4:31b rovnocenná.

### Role 4 — Vision: popis fotek, map, snímků obrazovky (dnes ThinkingCap-Qwen3.6-27B GGUF)

| # | model (tag, velikost) | proč | zdroj (URL, datum) |
|---|---|---|---|
| 1 | **qwen3.8:27b-mlx** (18 GB; 27,3B LM + 461M vision encoder, obrázky i video) — už stažený | Nativní vision v MLX buildu (projektor je v manifestu, obrázky fungují bez dalších souborů); nahradí komunitní ThinkingCap GGUF, který jede jen přes llama.cpp bez MLX. Apache 2.0. | https://www.yottalabs.ai/post/qwen-3-8-27b-specs-hardware-requirements-how-to-run-2026 (8/2026); https://www.orcarouter.ai/blog/qwen-3-8-27b-ollama (8/2026); https://ollama.com/library/qwen3.8 |
| 2 | **gemma4:26b** (19 GB, MoE 26B-A4B, obrázky na MLX) — už stažený | Nejrychlejší velký vision model na Macu (~75 tok/s i bez MLX dle issue #15368); Ollama 0.3x: „Gemma4 now supports images and audio on MLX engine". Pro hromadné kontroly map/fotek (vision automaty) nejlevnější na GPU-čas. | https://github.com/ollama/ollama/issues/15368 (6. 4. 2026); https://traceary.com/ollama (changelog 9/2026); https://insiderllm.com/guides/vision-models-locally/ (akt. 15. 7. 2026) |
| 3 | **qwen3-vl:32b** (21 GB) nebo **qwen3-vl:8b** (6,1 GB) | Specializovaná VL řada: OCR ve 32 jazycích, DocVQA, ovládání UI, „nejsilnější vision-language v rodině Qwen"; 8b verze je vhodná do automatů (screenshoty). Bez MLX tagu (llama.cpp cesta). | https://ollama.com/library/qwen3-vl (10/2025); https://insiderllm.com/guides/vision-models-locally/ (15. 7. 2026) |

Poznámka: **ornith-1.5:9b** (6,6 GB, vision, 256K, 8/2026) je nový a hodně stahovaný, ale nenašel jsem žádné nezávislé hodnocení ani uvedeného autora/licenci — neověřený.

### Role 5 — Embeddingy pro RAG (dnes bge-m3)

| # | model (tag, velikost) | proč | zdroj (URL, datum) |
|---|---|---|---|
| 1 | **bge-m3** (1,2 GB, 8K ctx, MIT, 100+ jazyků) — ponechat | Stále „produkční tahoun" pro vícejazyčný RAG: jediný s hybridním dense+sparse+multivector; MIT licence; bez známých pádů na Macu. MTEB ~63,2 (leden 2026). | https://www.morphllm.com/ollama-embedding-models (2026); https://d-central.tech/local-embedding-models/ (2026) |
| 2 | **qwen3-embedding:4b** (2,5 GB, 40K ctx, 100+ jazyků, MTEB 69,45; 8b: 4,7 GB, 70,58) | Měřitelně lepší retrieval než bge-m3 (č. 1 MTEB multilingual); volitelné dimenze 32–4096. **Ale:** otevřené issue #17509 — pád llama-serveru na Apple Silicon po tisících embeddingů (8/2026). Nasadit až po ověření na 0.34.x a s reindexací po dávkách. | https://ollama.com/library/qwen3-embedding; https://github.com/ollama/ollama/issues/17509 (1. 8. 2026); https://medium.com/@mrAryanKumar/comparative-analysis-of-qwen-3-and-bge-m3-embedding-models-for-multilingual-information-retrieval-72c0e6895413 |
| 3 | **qwen3-embedding:0.6b** (639 MB, 32K ctx) | Když je potřeba rychlost (indexace tisíců souborů) a bge-m3 je pomalý; stejná rodina jako 4b, menší riziko OOM. | https://ollama.com/library/qwen3-embedding |

Nedoporučuji: **embeddinggemma:300m** (jen 2K kontext — krátké chunky), **snowflake-arctic-embed2** (uvádí jen EN/FR/ES/IT/DE, čeština chybí). Žádný český embedding benchmark 2026 nebyl nalezen — porovnat na vlastních dotazech `zeptej`.

---

## Varování

### Problémy na Apple Silicon (GitHub ollama/ollama)
1. **Gemma 4 na M5 Max, issue #15368 (6. 4. 2026, v0.20.2):** gemma4:31b i 26b zamrzly při `OLLAMA_FLASH_ATTENTION=1` a promptu > 500 tokenů; streamování přes `/v1/chat/completions` dávalo celý obsah do pole `reasoning` (řešení: nativní `/api/chat` s `think:false` — což už automaty používají); MLX pro Gemma 4 chyběl. MLX přišel v 0.21.0 (16. 4.), FA v 0.20.5 (9. 4.), MTP zrychlení 0.23.1 (5. 5.). **Na 0.34.0 nutno ověřit, zda FA zamrzání nepřetrvává** (issue byl při rešerši stále otevřený).
2. **gemma4:12b nepoužitelná na Macu, issue #16562 (6. 6. 2026, v0.30.5):** generace 8 minut, prázdné odpovědi; uživatelé doporučují gemma4:e4b-it-q8_0 nebo ministral-3:14b. Vyhnout se tagu 12b.
3. **Qwen 3.6 MLX pády, issues #15775 (23. 4. 2026) a #15822 (26. 4. 2026):** varianty `-coding-nvfp4`/`-coding-mxfp8` padaly na „no Stream(gpu)"; `format=json` selhával na MLX runneru. Používat jen běžné `-mlx` tagy a strukturovaný výstup ověřit testem.
4. **qwen3-embedding:4b, issue #17509 (1. 8. 2026, v0.32.5):** pád llama-serveru (libmalloc memory corruption) po ~9 000 embeddinzích při souvislém dávkovém volání. Otevřené.
5. **qwen3.5:9b pád na M4 16 GB, issue #14748** — na 64 GB nerelevantní, ale ukazuje, že MLX runner malé Qwen 3.5 modely občas shodí; testovat po každé aktualizaci Ollamy.
6. **Ollama 0.20.4, issue #15433:** MLX modely se nenačetly (chybějící dylib) po upgradu — po každé aktualizaci Ollamy spustit rychlý smoke test všech používaných tagů.
7. **Paměť u dlouhého kontextu:** u 27B modelů ~64 kB/token KV cache → 256K ctx ≈ 16,4 GB navíc; 0.34.2 opravila nárůst paměti při MLX spekulativním dekódování (98K ctx držel 30 GB místo pádu při 90+ GB). **Doporučení: povýšit Ollamu na 0.34.2+ a nastavit `num_ctx` na skutečně potřebnou délku.** (orcarouter 15. 8. 2026; releasebot 17. 9. 2026)
8. Při saturaci paměťové sběrnice velkým modelem mohou monitory přes Thunderbolt dok krátce zčernat (zmíněno v #15368).

### Halucinace a kvalita češtiny
- Lokální vision modely „vymýšlejí detaily, zejména u složitých obrázků" (insiderllm, 7/2026) — platí pravidlo z paměti: nález potvrzuje pohled na výřez, ne popis modelu.
- Čeština u otevřených modelů zaostává za angličtinou o 10–30 %; benchmarky měří hlavně výběrové úlohy, ne volné psaní ani odmítnutí vymyšleného obsahu (ithope.cz, 5. 8. 2026).
- Gemma 4 „občas potřebuje explicitní nasměrování" — do system promptu dát „Odpovídej vždy v češtině"; u dlouhých dokumentů raději chunking (aicko.cz, zonercloud 4/2026).
- Qwen má podle autora qwen3.6_CZ potíže s vyjmenovanými slovy po B a rozlišováním podobných výrazů (ollama.com/lukasplevac/qwen3.6_CZ).
- Insiderllm (7/2026): vision vstup u **Qwen 3.6** v Ollamě nefungoval (jen llama.cpp/LM Studio) — u Qwen 3.8 už funguje, ale před nasazením do automatu ověřit obrázkem.

### Licence
- **Gemma 4 = Apache 2.0** (změna oproti Gemma ToU u starších verzí) — bez omezení. https://www.mindstudio.ai/blog/what-is-gemma-4-apache-2-license-commercial-ai-deployment (2026)
- **Qwen 3.6-27B, 3.6-35B-A3B, 3.8-27B = Apache 2.0**; větší Qwen (235B+, Qwen3.8-Max) mají vlastní licenci s podílem z příjmů — pro tento Mac nerelevantní.
- **granite4.2, bge-m3 (MIT), snowflake-arctic-embed2** = otevřené licence.
- **ThinkingCap-Qwen3.6-27B** (bottlecapai) = komunitní fine-tune, licence neověřena; **lukasplevac/qwen3.6_CZ** licence neuvedena; **ornith-1.5** autor ani licence na stránce nejsou. **muse-glimmer:30b** (Meta) stránka uvádí Apache 2.0 — u Meta modelů to ověřit v LICENSE blobu před nasazením.

### Mezery rešerše (co se NEpodařilo doložit)
- **České leaderboardy:** BenCzechMark space (CZLC) i záloha byly v režimu spánku, CzechBench (CIIRC-NLP) vracel chybu běhu/503 → aktuální pořadí Gemma 4 vs Qwen 3.x v češtině **není doloženo**. Než se přepne role 1, udělat vlastní zkoušku (3 dokumenty učitele × 3 modely × nezávislý kontrolor).
- **r/LocalLLaMA přímo:** vyhledávač nevracel vlákna z posledních 3 měsíců, jen sekundární citace (roborhythms 1. 5. 2026, promptquorum 6. 9. 2026). Přímá vlákna ke Qwen 3.8 na Macu, Ornith a Muse Glimmer nenalezena.
- morphllm.com (Best Ollama Models 8/2026, embedding článek) odmítl načtení (HTTP 429) — čerpáno jen z úryvků ve vyhledávání.

---

## Doporučené kroky (pořadí podle přínosu za cenu)
1. `ollama` povýšit na 0.34.2+ (oprava paměti MLX); smoke test všech tagů.
2. Role 4: ThinkingCap → **qwen3.8:27b-mlx** (už stažený) — zkouška na 5 mapách + 5 fotkách proti stávajícím popisům.
3. Role 3: qwen3:30b-a3b → **qwen3.6:35b-mlx** (dávky) a **qwen3.6:27b-mlx** (těžší úlohy).
4. Role 2: přidat **granite4.2:3b** (2,2 GB) a změřit ANO/NE přesnost proti gemma4:26b na 30 už rozhodnutých případech.
5. Role 1: zkouška gemma4:31b vs qwen3.8:27b-mlx vs lukasplevac/qwen3.6_CZ na 3 dlouhých dokumentech; kontrolor z jiné rodiny.
6. Role 5: bge-m3 ponechat; qwen3-embedding:4b zkusit až po ověření #17509 na 0.34.x.

---

## Zdroje (všechny URL)

Ollama library a blog
- https://ollama.com/blog/mlx (30. 3. 2026)
- https://ollama.com/search?o=newest (stav 21. 9. 2026)
- https://ollama.com/library/qwen3.8
- https://ollama.com/library/qwen3.6
- https://ollama.com/library/qwen3.5
- https://ollama.com/library/gemma4
- https://ollama.com/library/granite4.2
- https://ollama.com/library/qwen3-vl
- https://ollama.com/library/qwen3-embedding
- https://ollama.com/library/embeddinggemma
- https://ollama.com/library/snowflake-arctic-embed2
- https://ollama.com/library/ornith-1.5
- https://ollama.com/library/muse-glimmer
- https://ollama.com/library/nemotron-3.5-lightning
- https://ollama.com/lukasplevac/qwen3.6_CZ

GitHub issues / changelogy Ollama
- https://github.com/ollama/ollama/issues/15368 (6. 4. 2026)
- https://github.com/ollama/ollama/issues/16562 (6. 6. 2026)
- https://github.com/ollama/ollama/issues/17509 (1. 8. 2026)
- https://github.com/ollama/ollama/issues/15775 (23. 4. 2026)
- https://github.com/ollama/ollama/issues/15822 (26. 4. 2026)
- https://github.com/ollama/ollama/issues/14748
- https://github.com/ollama/ollama/issues/15433
- https://github.com/ml-explore/mlx-lm/issues/1480
- https://releasebot.io/updates/ollama (0.34.0–0.34.3, 10.–19. 9. 2026)
- https://fazm.ai/t/ollama-release-notes-2026 (0.15.5–0.23.1)
- https://traceary.com/ollama
- https://yage.ai/share/mlx-apple-silicon-en-20260331.html (31. 3. 2026)

Srovnání a průvodci 2026
- https://www.promptquorum.com/local-llms/best-local-llms-2026 (6. 9. 2026)
- https://www.promptquorum.com/local-llms/best-models-apple-silicon-2026 (27. 8. 2026)
- https://www.promptquorum.com/local-llms/best-beginner-local-llm-models
- https://www.roborhythms.com/qwen-3-6-vs-gemma-4/ (1. 5. 2026)
- https://quesma.com/blog/qwen-36-is-awesome/
- https://qwen.ai/blog?id=qwen3.6-35b-a3b (4/2026)
- https://www.orcarouter.ai/blog/qwen-3-8-27b-mlx (15. 8. 2026)
- https://www.orcarouter.ai/blog/qwen-3-8-27b-ollama
- https://www.yottalabs.ai/post/qwen-3-8-27b-specs-hardware-requirements-how-to-run-2026
- https://insiderllm.com/guides/vision-models-locally/ (6. 2. 2026, akt. 15. 7. 2026)
- https://www.morphllm.com/best-ollama-models (8/2026, načtení odmítnuto 429)
- https://www.morphllm.com/ollama-embedding-models (429)
- https://d-central.tech/local-embedding-models/
- https://medium.com/@mrAryanKumar/comparative-analysis-of-qwen-3-and-bge-m3-embedding-models-for-multilingual-information-retrieval-72c0e6895413
- https://www.mindstudio.ai/blog/what-is-gemma-4-apache-2-license-commercial-ai-deployment
- https://localaimaster.com/blog/small-language-models-guide-2026

České zdroje
- https://www.ithope.cz/en/blog/umi-lokalni-ai-cesky-co-ukazuji-benchmarky-a-co-z-toho-plyne-pro-firmu/ (5. 8. 2026)
- https://aicko.cz/content/gemma-4-lokalne-open-source-ai-od-google (5. 4. 2026)
- https://www.zonercloud.cz/magazin/ai-novinky-04-2026-google-gemma-4-meni-pravidla-hry-pro-open-source-ai (4/2026)
- https://zdrojak.cz/zpravicky/google-vydal-gemma-4-nejschopnejsi-open-source-modely-ktere-zvladne-i-vas-notebook/ (4/2026)
- https://www.aifirst.cz/pruvodce/qwen (2026)
- https://www.aifirst.cz/pruvodce/ollama-navod (2026)
- https://rozumimeai.cz/blog/lokalni-llm-modely-ollama/
- https://www.root.cz/clanky/python-a-ollama-pracujeme-s-lokalnymi-jazykovymi-modelmi/

České benchmarky
- https://huggingface.co/blog/benczechmark (1. 10. 2024)
- https://huggingface.co/spaces/CZLC/BenCzechMark (nenačteno)
- https://huggingface.co/spaces/CIIRC-NLP/czechbench_leaderboard (chyba běhu)
- https://github.com/MFajcik/benczechmark-leaderboard
- https://github.com/simecek/MiniCzechBenchmark
- https://arxiv.org/abs/2508.07860 (evaluace 19 LLM na české ABSA, 8/2025)

EuroLLM
- https://huggingface.co/blog/eurollm-team/eurollm-22b
- https://arxiv.org/abs/2602.05879 (2/2026)

# Test nových lokálních modelů — 2026-09-21

Kandidáti = modely v `ollama list` navíc oproti stavu k 15. 8. 2026 (8 modelů). Všechna volání sekvenčně
pod GPU zámkem (`zamek_modelu.drz`), `ollama ps` po každém modelu prázdné, `/api/generate` stream=false,
temperature 0, limit 600 s. Baterie 96 % na nabíječce. Surové výstupy: `vysledky/*.json` vedle této tabulky.

Úlohy: T1 = české shrnutí `OBSAH-PRAVIDLA.md` (10 řádků; body řetěz / celá čísla / nezávislý kontrolor / citace ze zdroje
= 0–4, jazyk 0–2) · T2 = ANO/NE „je správná odpověď nejdelší?" na 6 otázkách z `kvizy.ts` (pravda spočítána skriptem
podle délek: 3× ANO, 3× NE) · T3 = python skript na české uvozovky v JS řetězcích, spuštěn na `t3_zkouska.mjs`
(čekané řádky 3, 5, 8; řádek 1 je komentář) a na `podtema.mjs` (čekáno 0 nálezů) · T4 = vision: Sassenage.png
(mapa s trasou = ANO) + scena-01.png (schéma výkladu = NE).

| model | velikost | T1 (0–6) | T2 (x/6) | T3 | T4 | čas na úlohu | doporučená role |
|---|---|---|---|---|---|---|---|
| **qwen3.8:27b-mlx** (kandidát; vision+tools+think, ctx 262k, nvfp4) | 18 GB | **4** (řetěz ✓, celá čísla ✓, citace ✓, kontrolor ✗; jazyk 1 — překlep „tichu") | 3/6 (vždy NE — o 1–2 znaky delší správnou odpověď nepozná) | spustitelný ANO, funguje ANO (3,5,8 + navíc komentář ř. 1; podtema.mjs 0 ✓) | **2/2** (mapa ANO s městy, schéma NE; popisy česky, přesné) | T1 34 s · T2 1,8 s/otázka · T3 12 s · T4 9–11 s | **vision** (kandidát na náhradu ThinkingCap — rychlý, česky) + **kód** (12 s, bez úniku přemýšlení) |
| test-infografika-qwen38:latest (kandidát; profil týchž vah, temp 0, ctx 32768, predict 12000) | 18 GB | 4 (výstup slovo od slova totožný s qwen3.8) | 3/6 (totožné) | netestováno (stejné váhy) | netestováno (stejné váhy) | T1 35 s · T2 1,9 s/otázka | žádná zvlášť — je to jen nastavení qwen3.8 pro infografiky, ne jiný model |
| **gpt-oss:20b** (kandidát; tools+think, BEZ vision, ctx 131k, MXFP4) | 13 GB | 3 (řetěz ✓, celá čísla ✓, kontrolor ✓, citace ✗; jazyk 0 — „dva postavy", „autor nemůže sami", chybí zápor) | 1. pokus 0/6 (6× PRÁZDNÁ odpověď — strop 20 tokenů spolkne jeho přemýšlení) · 2. pokus (strop 400) **5/6** | spustitelný ANO, funguje ČÁSTEČNĚ (3, 8 — přehlédl ř. 5 s osamocenou „; podtema.mjs 0 ✓) | — (neumí obrázky) | T1 17,5 s · T2 4,4 s/otázka · T3 7 s | **ANO-NE automat jako záloha jiné rodiny** (stejné skóre jako gemma, 2× pomalejší; musí vždy dostat strop ≥ 300 tokenů). Ne na české texty. |
| gemma4:26b (REFERENCE — dosavadní volba na češtinu a ANO/NE) | 17 GB | **4** (řetěz ✓, celá čísla ✓, citace ✓, kontrolor ✗; jazyk 1 — „povolen jsou") | **5/6** | — | — | T1 **15,6 s** · T2 2,1 s/otázka | průzkumník + ANO-NE automat (zůstává) |
| qwen3:30b-a3b (REFERENCE — dosavadní volba na kód) | 18 GB | — | — | 1. pokus SELHAL (přemýšlení proteklo do odpovědi, uříznuto na 1500 tok, bez kódu) · 2. pokus (strop 6000): spustitelný ANO, funguje ANO (1,3,5,8 — stejně benevolentní jako qwen3.8) | — | T3 24 s (selhání) / **38 s** (2661 tok, z toho většina přemýšlení) | kód (zůstává, ale qwen3.8 je 3× rychlejší se stejným výsledkem) |

## Závěr

1. Skutečně nový model je jen jeden — `qwen3.8:27b-mlx` (18 GB); `test-infografika-qwen38` je jeho profil se stejnými vahami (výstupy T1/T2 slovo od slova totožné) a `gpt-oss:20b` (13 GB) je druhý nový, bez vision.
2. Průzkumník (české shrnutí): remíza 4/6 mezi qwen3.8 a gemma4:26b, ale gemma je 2× rychlejší (15,6 s vs 34 s) — role zůstává gemmě; nikdo nezachytil pravidlo o nezávislém kontrolorovi.
3. ANO-NE automat: gemma4:26b 5/6 (2 s/otázka) zůstává; qwen3.8 propadl (3/6, tvrdí vždy NE); gpt-oss dorovnal 5/6 až s velkým stropem tokenů a je 2× pomalejší — vhodný jen jako kontrolor „jiné rodiny než qwen/gemma", pokud projde formální zkouškou `test-modelu.json` (mimo rozsah tohoto testu).
4. Kód: qwen3.8 vyhrál nad qwen3:30b-a3b — stejný funkční skript za 12 s místo 38 s a bez prosakujícího přemýšlení (u qwen3:30b `think:false` nefunguje, přemýšlení jde do odpovědi a napoprvé uřízne kód); gpt-oss nejrychlejší (7 s), ale skript neúplný.
5. Vision: qwen3.8 popsal mapu s trasou i schéma výkladu správně a česky za ~10 s — je kandidát na náhradu ThinkingCap-27B v automatech (`mapa_projde_kontrolou` apod.), ale přímé srovnání s ThinkingCap na týchž obrázcích tento test neobsahoval; před výměnou v automatu pustit oba na stejné dávce map (pravidlo „měřidlo kalibrovat na přijaté práci").

Poučení z měřidla: u modelů s vestavěným přemýšlením (gpt-oss, qwen3:30b) je malý `num_predict` past — vrátí prázdno nebo useknutý text a vypadá to jako propadnutí modelu. Prázdná odpověď není verdikt; strop dávat ≥ 300 tokenů i na jednoslovné odpovědi.

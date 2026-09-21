# Sladění kvízů — DRUHÉ KOLO nezávislé kontroly, 22. 9. 2026
Kontrolováno po zápisu podle `sladeni-kvizu-atmosfera-zvuk.md` (sekce ZAPRACOVÁNO).
Zdroj: `node testy/vypis-kviz.mjs <klíč>` proti `node podtema.mjs ROOT get <plný klíč>`.
Všech 6 bloků má 21 otázek. Všechny číselné příklady přepočítány (`node -e`), všechny sedí:
102 600 Pa · 400:8=50, 1 020−50=970 hPa · 12:3=4 s · 340:170=2 m · 10:2=5 kmitů ·
1+2,5=3,5 atm · 1+1=2 atm · 340·0,1:2=17 m · voda místo rtuti 101 325:(1 000·9,81)=10,3 m.
Nic zapsáno do `kvizy.ts`.

Práh délkové nápovědy držen stejný jako v 1. kole (náskok ≥ 19 znaků); náskoky +8 až +14,
které 1. kolo výslovně přijalo („pod prahem, bez nálezu"), se znovu neotevírají.

---

## atmosfericky-tlak — VERDIKT: NESLADĚNO (4)

NEVYŘEŠENÉ: žádné (nálezy 1–10 z 1. kola ověřeny jako zapracované: hustota 1,23 kg/m³ v č. 16,
hPa=100 Pa v č. 17, vodní trubice v č. 18, vzorec p_h v č. 19, výpočet 102 600 Pa v č. 20,
čtyři vlivy v č. 21, délky č. 4/10/15 srovnány).

NOVÉ:
1. **otázka č. 17 — vysvětlení prozrazuje odpověď č. 7** | Nová otázka „Kolik pascalů je 1 hektopascal?"
   má vysvětlení „1 hPa = 100 Pa, proto je normální tlak **101 325 Pa asi 1 013 hPa**." — to je DOSLOVA
   správná odpověď otázky č. 7 („Jaká je hodnota normálního atmosférického tlaku? → 101 325 Pa (asi 1 013 hPa)").
   NÁVRH vysvětlení č. 17: „Předpona hekto znamená sto — stejně jako hektolitr je sto litrů."

2. **otázka č. 11 — vysvětlení prozrazuje celou odpověď č. 17** | Vysvětlení č. 11 zní „**1 hPa = 100 Pa**;
   normál je 1 013 hPa." Žák dostane odpověď na č. 17 („100 Pa") zadarmo o šest otázek dřív; navíc
   i tady padne hodnota 1 013 hPa z č. 7. Únik zanesla právě nová otázka č. 17 (nález 2 z 1. kola).
   NÁVRH vysvětlení č. 11: „Tlak v hektopascalech hlásí každá předpověď počasí."
   (Zbytkovou vazbu — slovo „hektopascal" ve znění č. 17 proti odpovědi č. 11 — lze snést; žák musí
   stále vědět, že právě tahle jednotka patří meteorologii.)

3. **otázka č. 20 — vysvětlení prozrazuje odpověď č. 19** | Vysvětlení výpočtové otázky začíná
   „p = **h · ρ · g** = 0,76 · 13 500 · 10 = 102 600 Pa" a to je přesně správná odpověď č. 19
   („Jaký vzorec platí pro hydrostatický tlak p_h? → p_h = h · ρ · g"). Obě otázky jsou nové (nálezy 4 a 5).
   NÁVRH vysvětlení č. 20: „Dosadíme zadané hodnoty: 0,76 · 13 500 · 10 = 102 600 Pa, skoro přesně
   normální atmosférický tlak."

4. **otázky č. 14 a č. 13 — délková nápověda** | Č. 14 má správnou odpověď o **+23 znaků** delší než
   nejdelší distraktor (37 : 14 : 10), č. 13 o **+19** (35 : 16 : 10). Obě jsou nad prahem, který si
   1. kolo samo stanovilo (≥ 20 znaků), a přesto v něm nebyly vypsány — jde o přehlédnutí 1. kola,
   ne o novou vadu.
   NÁVRH č. 14: „Co je barograf?" → **barometr, který tlak zapisuje** | přístroj na měření rychlosti větru |
   mapa s čarami stejného tlaku.
   NÁVRH č. 13: „Co je aneroid?" → **kovový barometr s krabičkou** | zvláštní druh tekuté rtuti |
   přístroj na měření síly větru.

---

## pretlak-podtlak-vakuum — VERDIKT: NESLADĚNO (4)

NEVYŘEŠENÉ: žádné (nálezy 1–5 z 1. kola ověřeny: potraviny ve vakuu v č. 17, výpočet 1 bar přesunut
na pozici 20, pneumatika 2,5 baru místo masážní baňky, jednotka atmosféra v č. 18, „zhlubokém" →
„hlubokém" v č. 6. Obě zdůvodněné odchylky ze ZAPRACOVÁNO brány jako přijaté.)

NOVÉ:
1. **otázka č. 18 — vysvětlení prozrazuje odpověď č. 11 (a naopak)** | Nová otázka o starší jednotce má
   vysvětlení „Atmosféra (atm) je starší jednotka tlaku, asi **100 000 Pa** — přibližně stejná jako 1 bar."
   To je doslova správná odpověď č. 11 („Kolik pascalů je 1 bar? → 100 000 Pa"). Opačným směrem vysvětlení
   č. 11 („1 bar = 100 kPa ≈ tlak jedné **atmosféry**") prozrazuje odpověď č. 18. Oboustranný únik,
   zanesla ho nová otázka z nálezu 4 prvního kola. `uniky.mjs` ho nenajde — rozlišující token je
   jediný („100", resp. „atmosfera" proti tvaru „atmosfery"), a měřidlo žádá aspoň dva.
   NÁVRH vysvětlení č. 18: „Manometry mívají stupnici v barech; atmosféra je starší jednotka, která je
   baru přibližně rovná."
   NÁVRH vysvětlení č. 11: „Bar je jednotka na stupnici manometrů: 1 bar = 100 kPa."

2. **otázka č. 21 — odpověď je dvakrát prozrazena dřív** | Nová otázka „Jak spočítáme celkový tlak
   v nádobě z přetlaku na manometru? → **sečteme atmosférický tlak a přetlak**" je odpovězena už ve
   vysvětlení č. 13 („K přetlaku 2,5 atm **se přičte** tlak okolní atmosféry") i ve vysvětlení č. 20
   („Přetlak **se přičítá** k atmosférickému"). Měřidlo to nechytí — je to přeformulovaná fráze
   bez jediného doslova shodného rozlišujícího slova (známá mez 8 v `uniky.mjs`).
   NÁVRH: přesunout č. 21 (pravidlo) PŘED oba výpočty a z jejich vysvětlení vypustit slovní popis
   pravidla — nechat jen dosazení, tedy č. 13: „1 atm + 2,5 atm = 3,5 atmosféry." a č. 20:
   „1 atm + 1 bar ≈ 2 atmosféry (asi 200 000 Pa)."

3. **otázky č. 13 a č. 20 — duplicitní výpočet** | Obě počítají týž vztah p(celkový) = p(atm) + p(přetlak),
   liší se jen číslem (2,5 baru × 1 bar). S novou č. 21 stojí nad jedním vztahem tři otázky z 21.
   Navíc výpočtová č. 13 pochází z h3 „Pro zvídavé: počítáme" a stojí uprostřed bloku — tedy přesně
   ta vada, kterou 1. kolo vytklo v nálezu 2 (nadstavba patří na konec); přesunem č. 12 se na její
   místo posunula jiná nadstavbová otázka.
   NÁVRH: ŠKRTNOUT č. 13 (duplicitní výpočet) a nahradit otázkou na nepokrytou část výkladu:
   „Kde všude kromě pneumatiky vzniká přetlak?" → **v kabině letadla a ve skafandru** | v brčku
   při pití nápoje | v baňce klasické žárovky. Vysvětlení: „Venku je tlak nízký, proto se kabina
   i skafandr přetlakují, aby se v nich dalo dýchat."

4. **otázka č. 21 — chybná značka ve vysvětlení** | Vysvětlení uvádí „**p_h(celkový)** = tlak atmosféry +
   přetlak". Index h znamená hydrostatický tlak (tak se značka používá v sousedním podtématu
   atmosfericky-tlak, otázka č. 19); výklad i ZAPIS tohoto podtématu mají správně „p(celkový) =
   p(atmosférický) + p(přetlak)".
   NÁVRH: „p(celkový) = p(atmosférický) + p(přetlak) — manometr totiž ukazuje jen rozdíl vůči okolí."

---

## meteorologie-a-mereni-tlaku — VERDIKT: SLADĚNO

NEVYŘEŠENÉ: žádné. Všech 8 nálezů 1. kola ověřeno v datech: výpočet 970 hPa (č. 13, přepočítáno
400 : 8 = 50; 1 020 − 50 = 970), osm veličin (č. 16, vysvětlení jich skutečně vyjmenovává osm),
heliograf (č. 11), ČHMÚ ze stanic/balonů/družic (č. 14), zkrácená vysvětlení č. 3, č. 5 a č. 10
(inverze, srážení páry i „1 mm = 1 litr na m²" odstraněny), víry v č. 6 a hluboká níže pod 1 000 hPa v č. 5.

NOVÉ: žádné. Proti výkladu sedí i všechna čísla (1 013 hPa, 1 000 hPa, 10 hPa za pár hodin,
1 hPa na 8 m, termíny 7/14/21 h, 2 m nad zemí). Žádná správná odpověď nemá náskok ani 8 znaků.
Tautologická vysvětlení č. 1, č. 3 a č. 5 (opakují znění správné odpovědi) se nehlásí — přesně tahle
znění navrhlo a přijalo 1. kolo.

---

## kmitani-a-vlneni — VERDIKT: NESLADĚNO (1)

NEVYŘEŠENÉ: žádné (kyv v č. 19, příčné vlnění jen v pevných a kapalných v č. 20, λ = v : f v č. 18,
definice λ přes „dva stejně kmitající body" v č. 12, celočíselné kyvadlo 2 s / 10 s v č. 21,
doplněné vysvětlení č. 11 — vše ověřeno).

NOVÉ:
1. **otázka č. 15 — chybná fyzika ve vysvětlení** | Vysvětlení končí větou „…**počet kmitů za minutu
   je frekvence**, ne kmit." Frekvence je počet kmitů za **sekundu** — tak to má výklad („Frekvence f —
   počet kmitů za 1 sekundu; jednotka hertz") i správná odpověď otázky č. 6 („počet kmitů za 1 sekundu")
   téhož bloku. Vysvětlení tedy učí definici, kterou jiná otázka v témže kvízu označuje za špatnou;
   žák dostane protichůdné informace a u č. 6 může volit distraktor.
   NÁVRH vysvětlení č. 15: „Kmit je nejmenší opakující se část pohybu — z jedné krajní výchylky přes
   rovnovážnou polohu do druhé a zpět."
   NÁVRH distraktoru č. 15 (aby ani znění nesvádělo): „počet kmitů tělesa za jednu sekundu".

---

## zvuk-vznik-a-sireni — VERDIKT: SLADĚNO

NEVYŘEŠENÉ: žádné. Ověřeno v datech: komorní tón 440 Hz (č. 18), barva zvuku (č. 17), přepsané
vysvětlení č. 10 už neprozrazuje 1 500 ani 5 000 m/s, znění otázky o kapele srozumitelné (č. 19),
délky č. 1/8/11/12/13 srovnány (žádná z nich už nemá náskok ani 8 znaků), formát čísel v č. 10
sjednocen na „340 m/s | 1 500 m/s | 5 000 m/s".

NOVÉ: žádné. Čísla souhlasí s výkladem (16 Hz–16 000 Hz, 2 000–4 000 Hz, 440 Hz, 340/1 500/5 000/0 m/s,
ozvěna 0,1 s a 17 m — přepočítáno 340 · 0,1 : 2 = 17 m). Nové otázky č. 17 a č. 18 neprozrazují
odpověď žádné jiné otázky bloku.

---

## vnimani-zvuku-a-hlasitost — VERDIKT: NESLADĚNO (2)

NEVYŘEŠENÉ: žádné (kmity bubínku 0,0001–1 mm v č. 19 — souhlasí s výkladem „pohyb od 0,0001 mm až
po 1 mm", pořadí prostředí v č. 13, zkrácené vysvětlení č. 17 už neprozrazuje práh bolesti z č. 10,
hygienické normy doplněny do č. 20, délka č. 7 srovnána).

NOVÉ:
1. **otázka č. 13 — vysvětlení doslova odpovídá na otázku č. 5** | Nové vysvětlení („…a nakonec
   **vláskové buňky pošlou nervový signál do mozku**") je slovo od slova odpověď na otázku č. 5
   („Co pošle nervový signál do mozku? → **vláskové buňky** a sluchový nerv"). Přepis vysvětlení
   podle ZAPRACOVÁNO sice odstranil únik k č. 16 („kapalina v hlemýždi"), ale otevřel nový k č. 5.
   NÁVRH vysvětlení č. 13: „Každý článek řetězu předá kmity dalšímu prostředí: vzduch kůstkám,
   kůstky tekutině ve vnitřním uchu a ta teprve smyslovým buňkám."

2. **otázky č. 14 a č. 16 — duplicitní pár s oboustranným únikem** | Č. 14 „Co dělá hlemýžď ve vnitřním
   uchu? → **kmity přenáší do kapaliny uvnitř**" a č. 16 „Co rozkmitá vláskové buňky v hlemýždi? →
   kapalina v hlemýždi" popisují týž krok. Vysvětlení č. 16 („Kmity z kůstek se **přenesou do kapaliny
   uvnitř** hlemýždě a ta rozkmitá vláskové buňky") obsahuje správnou odpověď č. 14 celou; vysvětlení
   č. 14 zase popisuje odpověď č. 16 i č. 5. S novou č. 13 tak na řetěz hlemýžď → kapalina → buňky
   připadají tři otázky.
   NÁVRH: ŠKRTNOUT č. 14 a nahradit otázkou na nepokrytý h3 „Ucho jako přeměňovač energie":
   „Proč se o uchu říká, že je přeměňovač energie?" → **kmity postupně předává jinému prostředí** |
   zvuk zesiluje jako reproduktor v rádiu | mění zachycený zvuk na teplo. Vysvětlení: „Zvuk se do
   mozku nedostane přímo — cestou několikrát změní podobu, než z něj vznikne signál."

---

## Poznámka k měřidlům

`uniky.mjs` na těchto 6 blocích hlásí 0 úniků, a přesto jsou výše čtyři doložené (atmosfericky-tlak
č. 17→č. 7, č. 11→č. 17, č. 20→č. 19; pretlak č. 18↔č. 11; pretlak č. 13/20→č. 21; vnimani č. 13→č. 5).
Všechny padají do dvou známých mezí zapsaných přímo v hlavičce měřidla: jediné rozlišující slovo
(mez 8) a přeformulovaná fráze bez doslovné shody (mez 4). Ticho měřidla tedy ani v druhém kole
není doklad o sladění.

---

## ZAPRACOVÁNO 22. 9. 2026

### atmosfericky-tlak (4/4)
- [x] č. 17 — vysvětlení nahrazeno „Předpona hekto znamená sto — stejně jako hektolitr je sto litrů."
- [x] č. 11 — vysvětlení nahrazeno „Tlak v hektopascalech hlásí každá předpověď počasí."
- [x] č. 20 — vysvětlení nahrazeno „Dosadíme zadané hodnoty: 0,76 · 13 500 · 10 = 102 600 Pa, skoro
      přesně normální atmosférický tlak."
- [x] č. 14 (barograf) a č. 13 (aneroid) — délková nápověda odstraněna dle NÁVRHU (nové distraktory).

### pretlak-podtlak-vakuum (4/4)
- [x] č. 18 a č. 11 — vysvětlení přeformulována, oboustranný únik odstraněn.
- [x] č. 21 (pravidlo) přesunuto před výpočtovou otázku; vysvětlení výpočtu zkráceno na holé dosazení.
- [x] č. 13 (duplicitní výpočet) škrtnuta a nahrazena otázkou „Kde všude kromě pneumatiky vzniká
      přetlak?" (kabina letadla, skafandr).
- [x] č. 21 — chybná značka p_h opravena na p(celkový) = p(atmosférický) + p(přetlak).

### kmitani-a-vlneni (1/1)
- [x] č. 15 (kmit) — vysvětlení opraveno (frekvence = kmity za sekundu, ne za minutu), distraktor
      přeformulován.

### vnimani-zvuku-a-hlasitost (2/2)
- [x] č. 13 — vysvětlení přeformulováno, únik k č. 5 odstraněn.
- [x] č. 14 a č. 16 (duplicitní pár) — č. 14 škrtnuta a nahrazena otázkou „Proč se o uchu říká, že
      je přeměňovač energie?".

Ověřeno: `vypis-kviz.mjs` = 21 otázek ve všech čtyřech blocích, `uniky.mjs` 0, `zkontroluj.mjs` bez
nových nálezů, `npm run build` prošel.

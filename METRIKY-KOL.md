# Metriky kol — podklad pro sebezlepšování

Jeden řádek = jedno kolo práce. Zapisuje se HNED na konci kola (jinak se to nestane).
Slouží k retrospektivě: kde se ztrácí čas a co se opakovaně zasekává.

Vysvětlení sloupců:
- **Tvar** — chain (sériově) / diamond (paralelní workeři) / router / cyklus
- **Pokusy** — kolikrát jsem musel něco opravovat, než to prošlo (1 = na první dobrou)
- **Build** — prošel `npm run build` na první pokus? ANO/NE
- **Zásek** — co zdrželo (prázdné = nic)

| Datum | Kolo | Co vzniklo | Tvar | Pokusy | Build 1. pokus | Zásek |
|---|---|---|---|---|---|---|
| 2026-07-27 | 28 | F6 difuze + Brownův pohyb (simulace, výklad, 4 kvízové otázky, média) | diamond (4 workeři) | 1 | ANO | zrnko pylu sedimentovalo na dno → opraveno při verify |

### Poznatky z prvního diamondu (28. kolo)

- **Workeři běželi 45 s – 11 min současně** (média 45 s, kvíz 1,5 min, výklad 2,5 min, kód 11 min).
  Sériově by to bylo součtem, tedy ~16 minut místo 11 → **úspora asi třetina**, a hlavně jsem
  mezitím mohl zapisovat výklad a kvíz.
- **Workeři o sobě navzájem nevědí.** Výklad přidal nové učivo (difuze je v plynech rychlejší
  než v kapalinách), ale kvízový worker o tom nemohl vědět → otázka na to chyběla, dopsal jsem ji
  v merge kroku. ZÁVĚR: merge musí vždy zkontrolovat, že kvíz pokrývá i nově přidané učivo.
- **Duplicity:** kvízový worker navrhl 6 otázek, 2 se překrývaly s existujícími → použity 4.
  Do zadání pro worker C příště dát: „nejdřív vypiš existující otázky, pak navrhni jen nepokryté".
- **Verify se vyplatil:** build prošel na první pokus, ale vizuální kontrola odhalila, že se zrnko
  pylu propadalo na dno (Brownův pohyb pak nebyl vidět). Bez screenshotu by to na web šlo špatně.
- **Zákazy fungovaly:** žádný worker nespustil build, git, ffmpeg ani Ollamu; nikdo nepsal do
  `temata.ts`/`kvizy.ts`, takže nedošlo k přepsání změn.

## Plán vyhodnocení

- **Rychlá kontrola každé 10. kolo** — projít posledních 10 řádků, najít nejčastější zásek,
  přidat proti němu JEDNO pravidlo do skillu. Režie max 5 minut.
- **Velká retrospektiva 24. 8. 2026** (před školním rokem) — dost dat na porovnání
  „sériově × diamond": kolik kol, kolik simulací, kde se ztrácel čas, co zrychlit dál.

## Co porovnáváme

1. Kol za den (dřív sériově vs. teď s workery).
2. Podíl kol, kde build prošel na první pokus.
3. Počet odložených úkolů („zaseklo se").
4. Kolik kol skončilo bez zásahu učitele (cíl: co nejvíc).

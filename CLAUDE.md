# CLAUDE.md — trvalý kontext projektu wonderly-web

> **Komunikuj vždy česky** (uživatel je učitel-laik; před spouštěním příkazů krátce vysvětli, co dělají).
> **Na začátku každé session si přečti i `PROGRESS.md`** — je v něm aktuální stav a čím navázat.
> **Na KONCI každé session `PROGRESS.md` aktualizuj** (přidej datovaný záznam do sekce Historie, uprav HOTOVÉ/ZBÝVÁ) a **commitni + pushni** — tím se stav i historie uloží na GitHub jako vratná verze. Po dokončení celého ročníku přidej git tag jako milník.

## Co to je
Statický web na doméně **wonderly.cz** (Cloudflare, zdarma). Tři části na subdoménách:
- **lab.wonderly.cz** — školní web 2. stupně ZŠ (Fyzika, Informatika, Pracovní činnosti; ročníky 6–9). Ke každému tématu: výklad, infografiky, písničky/videa, interaktivní procvičovací **kvíz** a **tisknutelný test pro učitele**. Hlavní práce teď.
- **cesty.wonderly.cz** — cestovatelský deník z cest **obytným autem** (NE cyklistika! EN „Journeys on Wheels", DE „Reisen auf Rädern"). Mapa Evropy s piny měst, fotogalerie, CS/EN/DE/FR.
- **fox.wonderly.cz** — 1. stupeň (paní Lišková), + **wonderly.cz** rozcestník.

Web řídí `worker.js` (routing subdomén podle Host hlavičky + servírování fotek z R2 přes `/media/`).

## Technologie
- **Astro** (statický generátor), TypeScript. Build: `npm run build` (výstup do `dist/`).
- **Cloudflare Workers/Pages** — auto-deploy z GitHub větve `main` (~1 min po pushi).
- **Cloudflare R2** — úložiště `wonderly-media` pro plnokvalitní fotky deníku (binding MEDIA).
- Fonty: `@fontsource/patrick-hand` + `caveat` (kreslený „whiteboard" styl, latin-ext = česká diakritika).

## Struktura složek
```
src/
  data/
    temata.ts    ← VÝKLAD a materiály všech podtémat školy (hlavní datový soubor)
    kvizy.ts     ← kvízové otázky (klíč predmet/rocnik/tema/podtema; správná odpověď VŽDY první, míchá se; pole `vysvetleni` se ukáže při špatné odpovědi)
    predmety.ts  ← předměty + ročníky
    cesty/       ← data deníku (typy, roky, mapa, překlady)
  layouts/
    SkolaLayout.astro   ← kreslený design školy
    CestyLayout.astro   ← layout deníku (CS/EN/DE/FR, tmavý režim)
  components/
    skola2/Kviz.astro              ← interaktivní kvíz + tančící/mlátící profesor
    skola2/HydraulikaSimulace.astro ← interaktivní simulace (Pascalův zákon)
    cesty/*.astro
  pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/   ← stránka podtématu (+ /test/ chráněný heslem)
public/materialy/fyzika/<rocnik>/<tema>/<podtema>/    ← obrázky, zvuk, video na webu
public/obrazky/, public/cesty/                        ← statické obrázky, mapa Evropy
worker.js, wrangler.jsonc                             ← routing subdomén + R2 (NEMĚNIT bez důvodu)
```

## Zdrojové materiály školy (mimo tento repo)
- **`/Users/Shared/Škola/<rocnik>/<celek>/<podtéma>/`** — od učitele. Určující je vždy **PDF**; k němu média + `informace-pro-podcast.txt` (zvuk dělá lokální OmniVoice, skill `/podkast-video`) a `pisen-suno.txt` (rap pro puberťáky, styl „czech rap for teenagers, modern trap beat").
- Podklady stahuje učitel z **Google Disku** (složka Fyzika) do sdílené složky — přes asistenta se Disk NEČTE spolehlivě.
- Barevné štítky složek: 🟡 žlutá = doplnil učitel (nech), 🟠 oranžová = čeká na média od učitele.
- **Přehledy a předání**: `/Users/Shared/webová stránka/` a `~/Desktop/Omega/dokumenty/` (PREHLED-PROJEKTU…, PREDANI_KOLEGOVI, kontrola-podkladu-*).

## Konvence a pravidla (DŮLEŽITÉ)
- **Kontrola faktů**: každý výpočet/údaj z podkladů PŘEPOČÍTAT. Chyby NEopravovat potichu — hlásit do `Omega/dokumenty/kontrola-podkladu-*.md` (SmartBooks PDF, AI infografiky i staré prezentace měly chyby).
- **SmartBooks PDF (uceni.smartbooks.cz) NEZVEŘEJŇOVAT** — placený obsah; jen zdroj faktů.
- **Velká videa (>25 MB)** nejdou na web → YouTube „nezařazené", na web jen odkaz. Na YouTube nahrává automat `com.omega.youtube-nahravac`; zásahy na kanál hlídá `brana_kanalu.py` — viz `Omega/AUTOMATY.md`.
- **Odkazy uvnitř webu školy musí být RELATIVNÍ** (fungují na lab.wonderly.cz i wonderly.cz/skola2).
- **Kvíz**: ~21 otázek/podtéma, 3 odpovědi, správná první, doplnit `vysvetleni`.
- **Tisknutelný test** `…/test/` je chráněný heslem **ucitel-wonderly** (jen pro učitele).
- Nová podtémata vždy podle vzoru pilotu **Tlak** (obsah v temata.ts + kvíz v kvizy.ts + materiály v public/).

## Postup nasazení
```
# úprava src/data/temata.ts a kvizy.ts, kopie médií do public/materialy/
npm run build                 # ověří, že se web sestaví
git add -A src public/materialy
git commit -m "..."
git push origin main          # Cloudflare nasadí sám do ~1 min
# ověření: curl -s -o /dev/null -w '%{http_code}' https://lab.wonderly.cz/...
```

## Užitečné skripty (v ~/Desktop/Omega/skripty/)
- `nahraj_fotky.py <složka> <rok>/<mesto>` — deník: fotky do R2 + náhledy (hlídá limit 10 GB)
- `pridat_mesto.py` (alias `mesto`) — přidá město na mapu deníku
- anonymizace fotek/videí, tvorba videí — pro deník

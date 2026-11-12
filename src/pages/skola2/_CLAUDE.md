# Sekce škola 2. stupeň (lab.wonderly.cz = /skola2)

Fyzika, Informatika, Pracovní činnosti; ročníky 6–9. Ke každému tématu: vlastní výklad,
infografiky, písničky/videa, interaktivní **simulace**, procvičovací **kvíz**,
**tisknutelný test pro učitele** a QR kód na stránku podtématu. Hlavní práce teď.

## Kde co je
- `src/data/temata.ts` — VÝKLAD a materiály všech podtémat (hlavní datový soubor)
- `src/data/kvizy.ts` — kvízové otázky (klíč predmet/rocnik/tema/podtema)
- `src/data/predmety.ts` — předměty + ročníky; `hry.ts`, `laborky.ts`, `animace.ts`
- `src/components/skola2/` — Kviz.astro, simulace (HydraulikaSimulace.astro …)
- `src/layouts/SkolaLayout.astro` — kreslený design školy
- `src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/` — stránka podtématu (+ `/test/`)
- `public/materialy/fyzika/<rocnik>/<tema>/<podtema>/` — obrázky, zvuk, video na webu

`temata.ts` a `kvizy.ts` jsou velké — **nečíst celé**, hledat Grepem a číst výřezem.

## Konvence a pravidla (DŮLEŽITÉ)
- **Kvíz**: ZÁVAZNÝ CÍL je **21 otázek na podtéma** (rozhodnutí učitele 19. 8. 2026;
  plné znění `OBSAH-PRAVIDLA.md` kap. 4 v tomto repu). „5–8 otázek" je jen velikost
  JEDNÉ pracovní dávky workera, ne cíl. Dál: 3 odpovědi, **správná VŽDY první** (na webu se míchá),
  doplnit pole `vysvetleni` (ukáže se při špatné odpovědi). Správná odpověď nesmí být
  soustavně nejdelší.
- **Tisknutelný test** `…/test/` je chráněný heslem **ucitel-wonderly** (jen pro učitele).
- Nová podtémata vždy podle vzoru **`klid-a-pohyb-telesa`** (ústava v6, VZHLED) (obsah v temata.ts + kvíz v kvizy.ts + materiály v public/).
- **Odkazy uvnitř webu školy musí být RELATIVNÍ** (fungují na lab.wonderly.cz i wonderly.cz/skola2).
- **Kontrola faktů**: každý výpočet/údaj z podkladů PŘEPOČÍTAT. Chyby NEopravovat potichu —
  hlásit do `Omega/dokumenty/kontrola-podkladu-*.md` (SmartBooks PDF, AI infografiky
  i staré prezentace měly chyby).
- Příklady a simulace musí dětem vycházet v **celých číslech** (desetinná jen když jsou učivem).
- **SmartBooks PDF (uceni.smartbooks.cz) NEZVEŘEJŇOVAT** — placený obsah; jen zdroj faktů.
- **Velká videa (>25 MB)** nejdou do repa; ukládají se do R2 (`wrangler r2 object put`, katalog § 0 ř. 34). Nové externí odkazy (ani na YouTube) se nevkládají,
  nasazené zůstávají (ústava v6, ZÁKAZY). YouTube automat patří spícímu projektu Cestování.

## Zdrojové materiály školy (mimo tento repo)
- **`/Users/Shared/Škola/<rocnik>/<celek>/<podtéma>/`** — od učitele; NIC tam nemazat
  ani nepřesouvat. **PDF a původní prezentace jsou ROVNOCENNÉ zdroje** (rozhodnutí učitele
  19. 8. 2026); výklad musí pokrýt oba a rozpor mezi
  nimi se ověří a zapíše do `Omega/dokumenty/kontrola-podkladu-*.md`, netiší se ve prospěch PDF.
  K podkladům média + `informace-pro-podcast.txt`
  (zvuk dělá lokální OmniVoice, skill `/podkast-video`) a `pisen-suno.txt`
  (text písně; styl podle `Omega/navody/wonderly-pisnicky-fyzika.md`, oddíl Styl).
- Podklady stahuje učitel z **Google Disku** (složka Fyzika) do sdílené složky —
  přes asistenta se Disk NEČTE spolehlivě.
- Barevné štítky složek: 🟡 žlutá = doplnil učitel (nech), 🟠 oranžová = čeká na média od učitele.
- **Přehledy**: `~/Desktop/Omega/dokumenty/`
  (PREHLED-PROJEKTU…, kontrola-podkladu-*).

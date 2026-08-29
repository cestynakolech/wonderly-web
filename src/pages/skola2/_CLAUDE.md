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
  plné znění `~/Desktop/wonderly-web/OBSAH-PRAVIDLA.md` kap. 4). „5–8 otázek" je jen velikost
  JEDNÉ pracovní dávky workera, ne cíl; dřívější „medián ~13" byl popis naměřeného stavu
  k 18. 8. 2026, jako cíl NEPLATÍ. Dál: 3 odpovědi, **správná VŽDY první** (na webu se míchá),
  doplnit pole `vysvetleni` (ukáže se při špatné odpovědi). Správná odpověď nesmí být
  soustavně nejdelší.
- **Tisknutelný test** `…/test/` je chráněný heslem **ucitel-wonderly** (jen pro učitele).
- Nová podtémata vždy podle vzoru pilotu **Tlak** (obsah v temata.ts + kvíz v kvizy.ts + materiály v public/).
- **Odkazy uvnitř webu školy musí být RELATIVNÍ** (fungují na lab.wonderly.cz i wonderly.cz/skola2).
- **Kontrola faktů**: každý výpočet/údaj z podkladů PŘEPOČÍTAT. Chyby NEopravovat potichu —
  hlásit do `Omega/dokumenty/kontrola-podkladu-*.md` (SmartBooks PDF, AI infografiky
  i staré prezentace měly chyby).
- Příklady a simulace musí dětem vycházet v **celých číslech** (desetinná jen když jsou učivem).
- **SmartBooks PDF (uceni.smartbooks.cz) NEZVEŘEJŇOVAT** — placený obsah; jen zdroj faktů.
- **Velká videa (>25 MB)** nejdou na web → YouTube „nezařazené", na web jen odkaz.
  Na YouTube nahrává automat `com.omega.youtube-nahravac`; zásahy na kanál hlídá
  `brana_kanalu.py` — viz `Omega/AUTOMATY.md`.

## Zdrojové materiály školy (mimo tento repo)
- **`/Users/Shared/Škola/<rocnik>/<celek>/<podtéma>/`** — od učitele; NIC tam nemazat
  ani nepřesouvat. **PDF a původní prezentace jsou ROVNOCENNÉ zdroje** (rozhodnutí učitele
  19. 8. 2026 — dřívější „určující je vždy PDF" NEPLATÍ); výklad musí pokrýt oba a rozpor mezi
  nimi se ověří a zapíše do `Omega/dokumenty/kontrola-podkladu-*.md`, netiší se ve prospěch PDF.
  K podkladům média + `informace-pro-podcast.txt`
  (zvuk dělá lokální OmniVoice, skill `/podkast-video`) a `pisen-suno.txt`
  (rap pro puberťáky, styl „czech rap for teenagers, modern trap beat").
- Podklady stahuje učitel z **Google Disku** (složka Fyzika) do sdílené složky —
  přes asistenta se Disk NEČTE spolehlivě.
- Barevné štítky složek: 🟡 žlutá = doplnil učitel (nech), 🟠 oranžová = čeká na média od učitele.
- **Přehledy a předání**: `/Users/Shared/webová stránka/` a `~/Desktop/Omega/dokumenty/`
  (PREHLED-PROJEKTU…, `PREDANI_KOLEGOVI.md`, kontrola-podkladu-*).

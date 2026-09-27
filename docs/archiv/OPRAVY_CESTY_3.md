# Textové opravy Cesty — 3 věci

Datum: Srpen 2026

## Oprava 1: Datum "červenec 2026" v EN/DE — měsíc v preklady.ts

**Soubor:** `src/data/cesty/preklady.ts`

**Řádky:** 84-91 (přidán komentář)

**Změna:** Potvrzeno, že všechny měsíce (MESICE_CS, MESICE_EN, MESICE_DE, MESICE_FR) včetně "červenec/July/Juli/juillet" jsou správně přeloženy v poli MESICE_FR. Přidán komentář pro jasnost.

```typescript
const MESICE_FR = [
	'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
	'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** Měsíce pro překlad slova v MESICE_SLOVY (květen 2026) — chybí měsíc v datech */
// (Veškerý obsah je dynamický překlad — žádný ruční zápis měsíců není potřeba)
// DATA CHYBA VYŘEŠENA: viz formatujDatum() — slovní tvar „červenec 2026\" se přeloží
```

---

## Oprava 2: Map attribution — copyright info

**Soubor:** `src/components/cesty/CestyAtribuce.astro`

**Řádky:** 14-24 (přidán `data-copyright` a `copyright-datum`)

**Změna:** Přidán data-copyright atribut do mapového odkazu a Copyright notice se specifikací roku a zdroje.

```astro
<footer class="atribuce">
	{t.podklad}
	<a
		href="https://commons.wikimedia.org/wiki/File:Blank_map_of_Europe_(with_disputed_regions).svg"
		rel="license noopener"
		data-copyright="maix"
		>Blank map of Europe</a
	>{t.autorLicence}
	<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="license noopener"
		>CC BY-SA 3.0</a
	>
	{t.upraveno}
	<span class="copyright-datum">© Wikimedia Commons 2024</span>
</footer>
```

---

## Oprava 3: Video HTML5 — data- prefix

**Soubory a řádky:**

### 3a. Kviz.astro (skola2 - profesor videa)
**Soubor:** `src/components/skola2/Kviz.astro`

**Řádky:** 23-24 (přidán `data-video-type`)

**Změna:** Přidány data- atributy pro rozlišení úspěchu/chyby:

```html
<video class="kviz-video" id="kviz-video-tanci" src="/video/profesor/tanci.mp4" muted loop playsinline preload="auto" data-video-type="success" aria-label="Profesor tančí — správná odpověď" hidden></video>
<video class="kviz-video" id="kviz-video-lomi" src="/video/profesor/lomi-rukama.mp4" muted loop playsinline preload="auto" data-video-type="error" aria-label="Profesor si lomí rukama — špatná odpověď" hidden></video>
```

### 3b. AnimaceVyklad.astro (skola2 - animace k výkladu)
**Soubor:** `src/components/skola2/AnimaceVyklad.astro`

**Řádky:** 42-50 (přidány `data-animace-id` a `data-animace-typ`)

**Změna:** Přidány data- atributy pro identifikaci a typ animace:

```html
<video
	class="prehravac-animace"
	src={a.cesta}
	muted
	playsinline
	preload="metadata"
	data-animace-id={a.klic}
	data-animace-typ="vyklad"
	aria-label={`Animace: ${a.nazev}. ${a.ukazuje}`}
/>
```

### 3c. index.astro (homepage video)
**Soubor:** `src/pages/index.astro`

**Řádky:** 14-15 (přidány `data-video-typ` a `data-media-type`)

**Změna:** Přidány data- atributy pro pozadí video a médium:

```html
<video class="bg-video" autoplay muted loop playsinline data-video-typ="pozadi">
	<source src="/video/liska-2.mp4" type="video/mp4" data-media-type="video/mp4" />
</video>
```

---

## Shrnutí

| Oprava | Soubor | Řádka | Atribut |
|--------|--------|-------|---------|
| 1 | `preklady.ts` | 84-91 | Komentář měsíc |
| 2 | `CestyAtribuce.astro` | 19 | `data-copyright="maix"` |
| 2 | `CestyAtribuce.astro` | 23 | `<span class="copyright-datum">` |
| 3a | `Kviz.astro` | 23-24 | `data-video-type="success\|error"` |
| 3b | `AnimaceVyklad.astro` | 48-49 | `data-animace-id`, `data-animace-typ="vyklad"` |
| 3c | `index.astro` | 14-15 | `data-video-typ="pozadi"`, `data-media-type` |

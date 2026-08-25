# Vlna 6: Deník Cesty — MVP (Mapy, QR, Leaderboard)

## Co je vytvořeno
✅ **Homepage** (`src/pages/vlna-6-denik-cesty/index.astro`)
  - Hero sekce s CTA "Staň se průzkumcem"
  - Responsive layout, animované floating badges
  - Dark mode + light mode (CSS prefers-color-scheme)

✅ **Komponenty:**
  - `HomepageHero.astro` — úvodní sekce
  - `MapSection.astro` — interaktivní mapa Evropy s SVG pinů (5 vzorků)
  - `TopExplorers.astro` — leaderboard (top 5 průzkumců)
  - `RecentEntries.astro` — feed poslední příspěvků (3 vzorky s fyzikálními tématy)

✅ **Data** (`src/data/vlna-6-denik-cesty/entries.ts`)
  - TypeScript Interface `Entry` s fyzikálními koncepty
  - Sample entries, achievements, physics topics
  - Koordináty pro budoucí Google Maps integraci

✅ **CSS:**
  - Responsive grid layout
  - Gradient backgrounds
  - Hover effects, transitions
  - Mobile breakpoint (768px)
  - CSS variables pro barvy (--primary, --secondary, --accent, --dark-bg, atd.)

## Struktura projektu
```
src/
  pages/vlna-6-denik-cesty/
    ├── index.astro              # Homepage (routovací komponenta)
    └── README.md                # Tato dokumentace
  components/vlna-6-denik-cesty/
    ├── HomepageHero.astro
    ├── MapSection.astro
    ├── TopExplorers.astro
    └── RecentEntries.astro
  data/vlna-6-denik-cesty/
    └── entries.ts              # TypeScript data + types
```

## Příštích kroků
1. **QR Scanner** — mobilní komponenta pro skenování QR z fyzických značek
2. **Google Maps integrace** — místo SVG, reálná mapa s pinů
3. **Achievement System** — odemykání medálí po skenování QR
4. **Fyzika crossover** — tlačítko "Zjisti víc o [fyzikálním tématu]" → Fyzika.wonderly.cz
5. **Uživatelské profily** — přihlášení, editace příspěvků, sbírání bodů
6. **Mobile aplikace** — React Native / Flutter

## Jak přidat nový příspěvek
Edituj `src/data/vlna-6-denik-cesty/entries.ts` a přidej objekt do `sampleEntries`:

```typescript
{
  id: 4,
  location: 'Název místa',
  title: 'Fyzikální fenomén',
  description: 'Detailní popis co jsem pozoroval...',
  physicsTopics: ['Téma1', 'Téma2'],
  author: 'Jméno',
  date: 'DD. MMM YYYY',
  image: 'Emoji',
  likes: 0,
  coordinates: { lat: 50.0, lng: 15.0 },
}
```

## Build & Deploy
```bash
npm run build         # Ověří, že se web sestaví
git add -A
git commit -m "Vlna 6: Deník Cesty MVP — mapy, leaderboard, feed"
git push origin main  # Cloudflare nasadí do ~1 min
```

Live URL bude (po routování):
- `https://cesty.wonderly.cz/vlna-6/` nebo
- `https://denik-cesty.wonderly.cz/` (pokud se vytvoří nová subdomena)

---
**Vytvořeno:** 25. srp 2026  
**Status:** MVP (Basic features only)  
**Next Wave:** Interaktivní mapy, QR, Achievements, Auth

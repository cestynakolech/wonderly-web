// Vypíše místa cestovatelského deníku daného roku jako JSON.
//
// Most pro skripty v Omeze (Python), aby nemusely číst TypeScript regulárními
// výrazy — ta cesta se už jednou vymstila (viz hlavička testy/data.mjs).
// Spuštění: node testy/vypis-cesty.mjs 2026
//
// `maPopis` (9. 8. 2026): kontrola doložitelnosti v Omeze potřebuje vědět, která
// místa popis MAJÍ — text sám nepotřebuje, jen příznak. Bere se z celého objektu
// roku (`nactiRokCest`), protože `nactiCesty` schválně vrací jen čtyři pole a
// `m.popis` by v něm byl vždycky `undefined`. Přesně takhle tiše lhala kontrola
// poloh, než ji odhalil podvrh.
import { nactiRokCest } from './data.mjs';

const rok = process.argv[2];
if (!/^\d{4}$/.test(rok ?? '')) {
	console.error('Použití: node testy/vypis-cesty.mjs <rok>   (např. 2026)');
	process.exit(2);
}
try {
	const data = await nactiRokCest(rok);
	const mesta = (data.mesta ?? []).map(({ slug, nazev, galerie, datum, popis }) => ({
		slug, nazev, galerie, datum, maPopis: Boolean(popis?.cs),
	}));
	console.log(JSON.stringify(mesta, null, 1));
} catch (e) {
	console.error(`Rok ${rok} se nepodařilo načíst: ${e.message}`);
	process.exit(1);
}

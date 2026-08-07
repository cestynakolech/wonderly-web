// Vypíše místa cestovatelského deníku daného roku jako JSON.
//
// Most pro skripty v Omeze (Python), aby nemusely číst TypeScript regulárními
// výrazy — ta cesta se už jednou vymstila (viz hlavička testy/data.mjs).
// Spuštění: node testy/vypis-cesty.mjs 2026
import { nactiCesty } from './data.mjs';

const rok = process.argv[2];
if (!/^\d{4}$/.test(rok ?? '')) {
	console.error('Použití: node testy/vypis-cesty.mjs <rok>   (např. 2026)');
	process.exit(2);
}
try {
	console.log(JSON.stringify(await nactiCesty(rok), null, 1));
} catch (e) {
	console.error(`Rok ${rok} se nepodařilo načíst: ${e.message}`);
	process.exit(1);
}

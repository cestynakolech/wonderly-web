// @ts-check
import { defineConfig } from 'astro/config';
import { spawnSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = dirname(fileURLToPath(import.meta.url));

// BRÁNA PŘED BUILDEM, NAPOJENÁ NA ŽIVOTNÍ CYKLUS ASTRA (24. 9. 2026).
// Dřív kontroly (zkontroluj.mjs, testy/vsechny-simulace.mjs) spouštěl jen npm
// skript "prebuild" — ale to je jen zvyklost npm: `npm run build` ho zavolá
// automaticky, zatímco `npx astro build` (nebo `astro build` z jiného skriptu)
// jde rovnou na Astro a "prebuild" úplně přeskočí. Kontroly se pak vůbec
// nespustily a vadná data prošla do buildu bez varování.
// Hook `astro:build:start` naopak spustí Astro samo, VŽDY na začátku
// každého buildu, ať je zavolaný jakýmkoli příkazem — kontrola tak sedí
// v samotném nástroji, ne v kázni "spouštěj ten správný příkaz".
// Logika kontrol zůstává jen v zkontroluj.mjs a testy/vsechny-simulace.mjs
// (JEDNO místo pravdy) — integrace je spouští jako podprocesy, neduplikuje je.
function branaPredBuildem() {
	return {
		name: 'brana-pred-buildem',
		hooks: {
			'astro:build:start': async () => {
				const kontrola = spawnSync('node', ['zkontroluj.mjs'], { cwd: koren, stdio: 'inherit' });
				if (kontrola.status !== 0) {
					throw new Error('Kontrolní brána (zkontroluj.mjs) našla chyby — build zastaven. Detaily viz výpis výš, oprava: node zkontroluj.mjs');
				}
				const simulace = spawnSync('node', ['testy/vsechny-simulace.mjs'], { cwd: koren, stdio: 'inherit' });
				if (simulace.status !== 0) {
					throw new Error('Kontrola simulací (testy/vsechny-simulace.mjs) selhala — build zastaven.');
				}
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	integrations: [branaPredBuildem()],
});

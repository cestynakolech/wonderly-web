// Spustí VŠECHNY testy simulací a shrne je jedním číslem.
//
// Zavedeno 1. 8. 2026 z nezávislého auditu kontrol: testů simulací bylo devět,
// ale brána nespouštěla ani jeden — regrese v simulaci se neměla jak zachytit.
// Každý test je samostatný skript, který končí kódem 1, když něco neplatí.
//
// Kotva navíc: hlásí se POČET souborů i počet jednotlivých kontrol (✅/❌).
// Kdyby test přestal existovat nebo přestal cokoli kontrolovat, je to vidět —
// „0 chyb" z nula spuštěných kontrol je falešná nula.
//
// Spuštění: node testy/vsechny-simulace.mjs [složka]
import { readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const slozka = process.argv[2] ?? join(koren, 'testy', 'simulace');

/**
 * Testy dostávají cestu ke komponentě jako argument (`node testy/simulace/reostat.mjs
 * src/components/skola2/ReostatSimulace.astro`). Bez něj spadnou na ERR_INVALID_ARG_TYPE —
 * což byl přesně důvod, proč se nikdy nespouštěly hromadně. Jméno komponenty se odvodí
 * z názvu testu: `odpor-vodice` → `OdporVodiceSimulace.astro`.
 */
function komponentaK(soubor) {
	const jmeno = soubor.replace(/\.mjs$/, '').split('-').map((c) => c[0].toUpperCase() + c.slice(1)).join('');
	const cesta = join(koren, 'src', 'components', 'skola2', jmeno + 'Simulace.astro');
	return existsSync(cesta) ? cesta : null;
}
const soubory = readdirSync(slozka)
	.filter((f) => f.endsWith('.mjs'))
	.sort();

const chybejici = [];
let kontrol = 0;
let spadlo = 0;
const chybne = [];

for (const soubor of soubory) {
	const komponenta = komponentaK(soubor);
	if (!komponenta) chybejici.push(soubor);
	const vysledek = spawnSync(process.execPath, [join(slozka, soubor), ...(komponenta ? [komponenta] : [])], { encoding: 'utf8' });
	const vystup = (vysledek.stdout ?? '') + (vysledek.stderr ?? '');
	kontrol += (vystup.match(/[✅❌]/g) ?? []).length;
	if (vysledek.status !== 0) {
		spadlo++;
		chybne.push(soubor);
		// vypíše jen řádky s ❌, ať se v tom dá vyznat
		for (const radek of vystup.split('\n')) if (radek.includes('❌')) console.log(`   ${soubor}: ${radek.trim()}`);
	}
}

console.log(`Testy simulací: ${soubory.length} souborů, ${kontrol} kontrol, ${spadlo} spadlo.`);
for (const s of chybejici) console.log(`   ⚠️  ${s}: nenašel jsem k němu komponentu podle názvu — test běžel bez ní`);

if (!soubory.length || !kontrol) {
	console.log('❌ Nespustila se ANI JEDNA kontrola — to není „vše v pořádku", to je rozbitý spouštěč.');
	process.exit(1);
}
if (spadlo) {
	console.log(`❌ Neprošlo: ${chybne.join(', ')}`);
	process.exit(1);
}
process.exit(0);

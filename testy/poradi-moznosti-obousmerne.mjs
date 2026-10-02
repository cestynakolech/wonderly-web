// Obousměrný důkaz brány testy/poradi-moznosti.mjs.
// Podvrhy jdou do dočasných JSON souborů (os.tmpdir) a spouští se skutečné CLI —
// ověřuje se tedy i process.exit(1), ne jen funkce. Do dat webu se nesahá.
// Spuštění: node testy/poradi-moznosti-obousmerne.mjs
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { zkontrolujPoradi } from './poradi-moznosti.mjs';

const brana = join(dirname(fileURLToPath(import.meta.url)), 'poradi-moznosti.mjs');
let chyb = 0;
const tvrdi = (popis, podm) => {
	console.log(`${podm ? '✅' : '❌'} ${popis}`);
	if (!podm) chyb++;
};
const blok = (v) => ({ b: [{ text: 'Q', odpovedi: ['a', 'b', 'c'], vysvetleni: v }] });
const dir = mkdtempSync(join(tmpdir(), 'poradi-'));
const spust = (kvizy) => {
	const f = join(dir, 'k.json');
	writeFileSync(f, JSON.stringify(kvizy));
	return spawnSync('node', [brana, '--json', f], { encoding: 'utf8' }).status;
};

try {
	// PODVRHY — každý musí shodit CLI (exit 1)
	for (const v of [
		'40 není ≥ 50 → druhá možnost.',
		'Správná je první možnost.',
		'Správně je možnost B.',
		'Vyber variantu C) a hotovo.',
		'Platí třetí odpověď.',
		'V poslední možnosti je chyba.',
		'Správná je možnost 2.',
	]) {
		tvrdi(`PODVRH „${v}" → exit 1`, spust(blok(v)) === 1);
	}
	// ZDRAVÉ — musí projít (exit 0)
	for (const v of [
		'40 není ≥ 50 → neprospěl.',
		'I = U/R = 12/3 = 4 A. Odpověď 2 A odpovídá dvojnásobnému odporu, odpověď 6 A vznikne špatným dělením.',
		'Splněno → první větev, nesplněno → druhá.',
		'Druhý krok je důležitější než první.',
		'Možnost 2 A by byla příliš malá.',
	]) {
		tvrdi(`ZDRAVÉ „${v}" → exit 0`, spust(blok(v)) === 0);
	}
	// Počítadlo: prázdný vstup je selhání měřidla, ne zdravý stav
	tvrdi('prázdná data → exit 1 (měřidlo nic neprošlo)', spust({}) === 1);
	tvrdi('funkce počítá vysvětlení', zkontrolujPoradi(blok('x')).vysvetleni === 1);
} finally {
	rmSync(dir, { recursive: true, force: true });
}
console.log(chyb ? `\n❌ ${chyb} kontrol selhalo` : '\n✅ vše prošlo');
process.exit(chyb ? 1 : 0);

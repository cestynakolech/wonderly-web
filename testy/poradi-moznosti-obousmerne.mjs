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
	// Každý případ volá SDÍLENÝ export brány zkontrolujPoradi (žádná kopie regexů);
	// vybrané případy navíc přes skutečné CLI (exit kód).
	const hlasi = (v) => zkontrolujPoradi(blok(v)).nalezy.length > 0;
	// PODVRHY — brána musí hlásit (a CLI skončit exit 1)
	for (const v of [
		'40 není ≥ 50 → druhá možnost.',
		'Správná je první možnost.',
		'Správně je možnost B.',
		'Vyber variantu C) a hotovo.',
		'Platí třetí odpověď.',
		'V poslední možnosti je chyba.',
		'Správná je možnost 2.',
		'Možnost B je správně.',
		'Správná je možnost 2 a ne 3.',
		'MOŽNOST B je správně.',
		'Správná odpověď je druhá možnost, protože 40 < 50.',
		'Druhá možnost, protože 40 < 50.',
		'Druhá možnost — správně.',
		'Druhá odpověď je pravda.',
		'Druhá možnost je správná jen tehdy, když R roste.',
	]) {
		tvrdi(`PODVRH „${v}" → nález`, hlasi(v));
	}
	for (const v of ['Správná je možnost 2.', 'Možnost B je správně.', 'Správná je možnost 2 a ne 3.']) {
		tvrdi(`PODVRH CLI „${v}" → exit 1`, spust(blok(v)) === 1);
	}
	// ZDRAVÉ — brána nesmí hlásit (a CLI exit 0)
	for (const v of [
		'40 není ≥ 50 → neprospěl.',
		'I = U/R = 12/3 = 4 A. Odpověď 2 A odpovídá dvojnásobnému odporu, odpověď 6 A vznikne špatným dělením.',
		'Splněno → první větev, nesplněno → druhá.',
		'Druhý krok je důležitější než první.',
		'Možnost 2 A by byla příliš malá.',
		'Druhá možnost je, že se těleso zahřeje.',
		'První možnost, jak teplo předat, je vedení.',
		'Třetí možností je záření.',
		'Třetí možnost: teplo se šíří zářením.',
		'Druhá možnost: teplo se šíří prouděním.',
		'Poslední možnost přenosu tepla je proudění.',
		'Druhou variantou zapojení je paralelní obvod.',
		'Na první odpověď přišel už Newton.',
		'Druhé možnosti se vzdal.',
		'Možnost a také další řešení existují.',
		'Platí první možnost Newtonova zákona.',
		'Správná první odpověď dětí bývá intuitivní.',
		'Zvol druhou možnost měření, je přesnější.',
		'Volba 3 a více žárovek zvyšuje odpor.',
		'Možnost 1 s, 2 s nebo 3 s.',
	]) {
		tvrdi(`ZDRAVÉ „${v}" → bez nálezu`, !hlasi(v));
	}
	for (const v of ['Třetí možnost: teplo se šíří zářením.', 'Druhá možnost je, že se těleso zahřeje.']) {
		tvrdi(`ZDRAVÉ CLI „${v}" → exit 0`, spust(blok(v)) === 0);
	}
	// Počítadlo: prázdný vstup je selhání měřidla, ne zdravý stav
	tvrdi('prázdná data → exit 1 (měřidlo nic neprošlo)', spust({}) === 1);
	tvrdi('funkce počítá vysvětlení', zkontrolujPoradi(blok('x')).vysvetleni === 1);
} finally {
	rmSync(dir, { recursive: true, force: true });
}
console.log(chyb ? `\n❌ ${chyb} kontrol selhalo` : '\n✅ vše prošlo');
process.exit(chyb ? 1 : 0);

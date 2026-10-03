// Vypíše VŠECHNY otázky bloku (i s odpověďmi a vysvětlením):
//   node testy/vypis-kviz.mjs <část klíče bloku>
//   node testy/vypis-kviz.mjs <přesný klíč nebo slug bloku> --json   (přesná shoda, 1 blok, jinak exit 3)
//   node testy/vypis-kviz.mjs --soubor <výřez.ts> [--json]   (výřez = jen objekty otázek, BEZ řádku klíče)
//
// Proč: `testy/delky.mjs` ukazuje jen otázky s délkovou nápovědou, takže se v něm
// neprojeví DUPLICITNÍ PÁRY — a ty jsou horší vada. 1. 8. 2026 se takhle našly
// bloky, které vznikly slepením dvou dávek: micro:bit měl čtyři duplicitní páry
// z deseti otázek, projekt-muj-robot tři (šest otázek pokrývalo tři fakta).
// Před dorovnáváním bloku si ho proto nech vypsat celý.
import { nactiData } from './data.mjs';
import { readFileSync } from 'node:fs';
import { transformSync } from 'esbuild';

// --json: strojový výstup {klíč: [otázky]} (používá Omega/skripty/kontrola_uniku_mini.py,
// aby počet otázek byl VŽDY týž jako zde — žádný druhý parser).
// --soubor <cesta.ts>: výřez bloku (objekty otázek za sebou nebo pole) přečte skutečným
// JS enginem (esbuild + import), ne regexem.
const jsonVystup = process.argv.includes('--json');
const iSoubor = process.argv.indexOf('--soubor');
if (iSoubor > 0) {
	const cesta = process.argv[iSoubor + 1];
	let t = readFileSync(cesta, 'utf8').trim();
	if (!t.startsWith('[')) t = `[${t}]`;
	const js = transformSync(`export default ${t}`, { loader: 'ts', format: 'esm' }).code;
	const otazky = (await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))).default;
	if (jsonVystup) console.log(JSON.stringify({ [cesta]: otazky }));
	else console.log(`=== ${cesta} — ${otazky.length} otázek ===`);
	process.exit(0);
}

const hledane = process.argv[2] ?? '';
if (!hledane || hledane.startsWith('--')) {
	console.log('Použití: node testy/vypis-kviz.mjs <část klíče bloku> [--otazky|--json] | --soubor <cesta.ts> [--json]');
	process.exit(1);
}

const { kvizy } = await nactiData();
if (jsonVystup) {
	// --json = strojový výstup: JEDEN blok podle PŘESNÉHO klíče (nebo celého posledního segmentu = slug).
	// Podřetězec ani více shod se nikdy neslučuje (tiché míchání bloků) — kandidáti na stderr, exit 3.
	const klice = Object.keys(kvizy).filter((k) => Array.isArray(kvizy[k]));
	let shody = klice.filter((k) => k === hledane);
	if (!shody.length) shody = klice.filter((k) => k.split('/').pop() === hledane);
	if (shody.length !== 1) {
		const kand = shody.length ? shody : klice.filter((k) => k.includes(hledane));
		console.error(`${shody.length ? 'Nejednoznačný' : 'Nenalezený'} klíč „${hledane}". Kandidáti (${kand.length}):`);
		for (const k of kand.slice(0, 30)) console.error('  ' + k);
		process.exit(3);
	}
	console.log(JSON.stringify({ [shody[0]]: kvizy[shody[0]] }));
	process.exit(0);
}
let nalezeno = 0;
for (const [klic, otazky] of Object.entries(kvizy)) {
	if (!klic.includes(hledane) || !Array.isArray(otazky)) continue;
	nalezeno++;
	console.log(`\n=== ${klic} — ${otazky.length} otázek ===`);
	// --otazky = jen znění otázek; na hledání duplicit stačí a je to kratší
	const strucne = process.argv.includes('--otazky');
	otazky.forEach((o, i) => {
		console.log(`${i + 1}. ${o.text}`);
		if (strucne) return;
		console.log(`   → ${(o.odpovedi ?? []).join(' | ')}`);
		if (o.vysvetleni) console.log(`   ? ${o.vysvetleni}`);
	});
}
if (!nalezeno) console.log(`Žádný blok neobsahuje „${hledane}".`);

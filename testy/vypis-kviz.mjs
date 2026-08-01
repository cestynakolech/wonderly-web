// Vypíše VŠECHNY otázky bloku (i s odpověďmi a vysvětlením):
//   node testy/vypis-kviz.mjs <část klíče bloku>
//
// Proč: `testy/delky.mjs` ukazuje jen otázky s délkovou nápovědou, takže se v něm
// neprojeví DUPLICITNÍ PÁRY — a ty jsou horší vada. 1. 8. 2026 se takhle našly
// bloky, které vznikly slepením dvou dávek: micro:bit měl čtyři duplicitní páry
// z deseti otázek, projekt-muj-robot tři (šest otázek pokrývalo tři fakta).
// Před dorovnáváním bloku si ho proto nech vypsat celý.
import { nactiData } from './data.mjs';

const hledane = process.argv[2] ?? '';
if (!hledane) {
	console.log('Použití: node testy/vypis-kviz.mjs <část klíče bloku>');
	process.exit(1);
}

const { kvizy } = await nactiData();
let nalezeno = 0;
for (const [klic, otazky] of Object.entries(kvizy)) {
	if (!klic.includes(hledane) || !Array.isArray(otazky)) continue;
	nalezeno++;
	console.log(`\n=== ${klic} — ${otazky.length} otázek ===`);
	otazky.forEach((o, i) => {
		console.log(`${i + 1}. ${o.text}`);
		console.log(`   → ${(o.odpovedi ?? []).join(' | ')}`);
		if (o.vysvetleni) console.log(`   ? ${o.vysvetleni}`);
	});
}
if (!nalezeno) console.log(`Žádný blok neobsahuje „${hledane}".`);

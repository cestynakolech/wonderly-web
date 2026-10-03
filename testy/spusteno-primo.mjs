// Pomocník bran: „je tento modul spuštěn přímo (node testy/x.mjs)?“
// Robustní vůči mezeře, diakritice i symlinku v cestě. Dřívější vzor
// `import.meta.url === \`file://${process.argv[1]}\`` v takové cestě tiše selhal
// (nic se nevypsalo, exit 0 i při nálezech = brána, která neumí spadnout).
import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function spustenoPrimo(metaUrl, argv1 = process.argv[1]) {
	if (!argv1) return false;
	try {
		return pathToFileURL(realpathSync(argv1)).href === metaUrl;
	} catch {
		return false;
	}
}

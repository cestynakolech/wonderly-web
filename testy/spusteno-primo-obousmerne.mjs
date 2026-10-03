// OBOUSMĚRNÝ důkaz pomocníka `spusteno-primo.mjs`: brána spuštěná přes cestu s mezerou,
// diakritikou i symlinkem se MUSÍ spustit (vypsat a skončit exit 1), nesmí tiše skončit exit 0.
// Starý vzor `file://${process.argv[1]}` v takové cestě selhal (incident 3. 10. 2026).
// Spuštění: node testy/spusteno-primo-obousmerne.mjs
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, symlinkSync, realpathSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const zde = dirname(fileURLToPath(import.meta.url));
const koren = realpathSync(mkdtempSync(join(tmpdir(), 'primo-')));
const slozka = join(koren, 'zkouška brány s mezerou');
mkdirSync(slozka);
copyFileSync(join(zde, 'spusteno-primo.mjs'), join(slozka, 'spusteno-primo.mjs'));
const nova = `import { spustenoPrimo } from './spusteno-primo.mjs';
if (spustenoPrimo(import.meta.url)) { console.log('BEZI'); process.exit(1); }`;
const stara = "if (import.meta.url === `file://${process.argv[1]}`) { console.log('BEZI'); process.exit(1); }";
writeFileSync(join(slozka, 'nova.mjs'), nova);
writeFileSync(join(slozka, 'stara.mjs'), stara);
symlinkSync(slozka, join(koren, 'odkaz'));
writeFileSync(join(slozka, 'import.mjs'), "await import('./nova.mjs'); console.log('IMPORT-OK');");

const beh = (f) => spawnSync('node', [f], { encoding: 'utf8' });
let chyb = 0;
const tvrdi = (popis, ok) => { if (!ok) { chyb++; console.log(`  ✗ ${popis}`); } };
const a = beh(join(slozka, 'nova.mjs'));
tvrdi('nová: cesta s mezerou+diakritikou se spustí (exit 1, výpis)', a.status === 1 && a.stdout.includes('BEZI'));
const b = beh(join(koren, 'odkaz', 'nova.mjs'));
tvrdi('nová: cesta přes symlink se spustí', b.status === 1 && b.stdout.includes('BEZI'));
const c = beh(join(slozka, 'stara.mjs'));
tvrdi('stará (důkaz, že podvrh kousá): v takové cestě tiše exit 0', c.status === 0 && !c.stdout.includes('BEZI'));
const d = beh(join(slozka, 'import.mjs'));
tvrdi('nová: při importu se nespustí (zdravý směr)', d.status === 0 && d.stdout.includes('IMPORT-OK') && !d.stdout.includes('BEZI'));
if (chyb) { console.log(`❌ spusteno-primo: ${chyb} z 4 kontrol selhalo.`); process.exit(1); }
console.log('✅ spusteno-primo — obousměrně ověřeno, 4 kontroly.');

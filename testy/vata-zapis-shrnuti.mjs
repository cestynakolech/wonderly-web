// Test nástroje vata-zapis-navrhy.mjs: klíče „shrnuti" (skládané slozSouhrnnyKviz) se musí
// najít (přeložit na zdrojový blok), podvržený neexistující klíč musí dál hlásit „blok nenalezen".
// Suchý běh, nic se nezapisuje.
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { nactiData } from './data.mjs';

const nastroj = path.join(path.dirname(fileURLToPath(import.meta.url)), 'nastroje/vata-zapis-navrhy.mjs');
const { kvizy } = await nactiData();
const klicShrnuti = 'fyzika/7-rocnik/shrnuti/pololetni-shrnuti';
const o = kvizy[klicShrnuti][0];
const polozka = (klic) => ({ faze: 'hotovo', klic, qIndex: 0, distraktorIndex: 1, qText: o.text, puvodniText: o.odpovedi[1], navrh: 'x' });
const tmp = mkdtempSync(path.join(tmpdir(), 'vata-shrnuti-'));
const stav = path.join(tmp, 'stav.json');
const schv = path.join(tmp, 'schv.json');
writeFileSync(stav, JSON.stringify({ a: polozka(klicShrnuti), b: polozka('fyzika/7-rocnik/shrnuti/neexistuje') }));
writeFileSync(schv, '{}');
const vystup = execFileSync('node', [nastroj, stav, `--schvaleni=${schv}`], { encoding: 'utf8' });
let chyb = 0;
const over = (podm, popis) => { if (!podm) { chyb++; console.error('SELHALO: ' + popis); } };
over(!vystup.includes(`${klicShrnuti} Q1: blok nenalezen`), 'skutečný klíč shrnutí hlásí „blok nenalezen"');
over(vystup.includes('fyzika/7-rocnik/shrnuti/neexistuje Q1: blok nenalezen'), 'podvržený klíč nehlásí „blok nenalezen"');
over(vystup.includes('Zapsalo by se: 0 položek'), 'bez schválení se má zapsat 0');
if (chyb) process.exit(1);
console.log('OK vata-zapis-shrnuti: shrnutí nalezeno, podvržený klíč nenalezen, zapsáno 0');

#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/pokusy.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/pokusy-podvrhy.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/PokusySimulace.astro');
const TEST = join(REPO, 'testy/simulace/pokusy.mjs');
const KOPIE = join(tmpdir(), 'pokusy-podvrh.astro');

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— scéna A: přepínání pokusů ——
	['přepnutí scény neschovává předchozí (display se nenastaví)', (s) => s.replace("nastav('poka-scena-' + exp, { display: exp === aktivniExp ? '' : 'none' });", "nastav('poka-scena-' + exp, {});")],
	['gumička se neprotáhne po Spustit (y2 zůstane stejné)', (s) => s.replace("nastav('poka-guma-cara', { y2: je ? 200 : 130 });", "nastav('poka-guma-cara', { y2: 130 });")],
	['závaží se po Spustit nezobrazí', (s) => s.replace("nastav('poka-guma-zavazi', { cy: je ? 226 : 140, display: je ? '' : 'none' });", "nastav('poka-guma-zavazi', { cy: je ? 226 : 140, display: 'none' });")],
	['balónek se po Spustit nenafoukne', (s) => s.replace("nastav('poka-balonek', { r: je ? 42 : 14, cy: je ? 27 : 55, fill: je ? '#ff8787' : '#ffd43b' });", "nastav('poka-balonek', { r: 14, cy: je ? 27 : 55, fill: je ? '#ff8787' : '#ffd43b' });")],
	['kulička po zahřátí nezmění barvu', (s) => s.replace("nastav('poka-kulicka', { r: je ? 27 : 22, fill: je ? '#e03131' : '#868e96', cy: je ? 118 : 140 });", "nastav('poka-kulicka', { r: je ? 27 : 22, fill: '#868e96', cy: je ? 118 : 140 });")],
	// —— scéna B: kyvadlo ——
	['perioda vychází neceločíselná (jiné délky kyvadla)', (s) => s.replace('const DELKY = [1, 4, 9, 16];', 'const DELKY = [1, 2, 3, 4];')],
	['provázek se s délkou nezvětšuje (napevno stejná délka)', (s) => s.replace('const delkaPx = 30 + L * 15;', 'const delkaPx = 100;')],
	['čtečka délky se neaktualizuje', (s) => s.replace("hodnotaL.textContent = L + ' m';", '')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? '✅ prošla' : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) { console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n')); process.exit(1); }

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const kolik = (v.stdout.match(/^❌ /gm) ?? []).length;
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${kolik} kontrol spadlo): ${nazev}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);

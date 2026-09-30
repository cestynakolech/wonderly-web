#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/polovodic-vodivost.mjs (vlastní vodivost polovodiče).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy vrácená stará vada — musí test SHODIT.
// Spuštění:  node testy/podvrhy/polovodic-vodivost-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/PolovodicVodivostSimulace.astro');
const TEST = join(REPO, 'testy/simulace/polovodic-vodivost.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'polovodic-vodivost-podvrh-'));
const KOPIE = join(WORKDIR, 'PolovodicVodivostSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['žárovka svítí už při 0 °C (starý lineární vzorec párů)', 'const PARY = [0, 0, 1, 2, 3, 5, 7];', 'const PARY = [0, 1, 2, 3, 4, 5, 6];'],
	['K6: lineární růst bez zrychlení', 'const PARY = [0, 0, 1, 2, 3, 5, 7];', 'const PARY = [0, 0, 1, 2, 3, 4, 5];'],
	['K5: text tvrdí, že páry nevznikají vůbec', 'páry skoro nevznikají', 'páry nevznikají'],
	['K7: žárovka mimo obvod', '<path d="M166 330 L274 330"', '<path d="M166 330 L200 330"'],
	['K8: −20 se spojovníkem', '`−${Math.abs(teplota)} °C`', '`${teplota} °C`'],
	['K9: drobné písmo „čistý křemík“', 'font-size="17" fill="#495057">čistý křemík', 'font-size="13" fill="#495057">čistý křemík'],
	['K9: „čistý křemík“ naléhá na plaketu', '<text x="220" y="92" text-anchor="middle" font-size="17"', '<text x="220" y="80" text-anchor="middle" font-size="17"'],
	['K10: bez aria-live', 'id="pol-stav" aria-live="polite"', 'id="pol-stav"'],
	['vrácený údaj µA na plaketě', '· proud ${s.proud}`', '· proud ${s.pocetParu * 5} µA`'],
	['díra zase červené „d“', 'fill="#ebfbee" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" /><text x="${p.xDira}" y="${p.y + 5}" text-anchor="middle" font-size="17" font-weight="bold" fill="#1b6b2d">+</text>', 'fill="#e03131" stroke="#2b2a26" stroke-width="1.5" /><text x="${p.xDira}" y="${p.y + 4}" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">d</text>'],
	['díra zakryje elektron (bez odstupu)', 'const ODSTUP = 12;', 'const ODSTUP = 0;'],
	['páry ve 4 řádcích (překryv 1. a 5. páru)', 'y: Y_PRVNI + i * ROZESTUP', 'y: Y_PRVNI + (i % 4) * ROZESTUP'],
];

function beh() {
	const r = spawnSync(process.execPath, [TEST, KOPIE], { encoding: 'utf8' });
	return { status: r.status, pad: ((r.stdout ?? '').match(/❌/g) || []).length };
}

let spatne = 0;
writeFileSync(KOPIE, puvodni);
const zdrava = beh();
if (zdrava.status === 0) console.log('✅ ZDRAVÁ KOPIE prošla (0 ❌)');
else { console.log(`❌ ZDRAVÁ KOPIE neprošla (${zdrava.pad} ❌) — podvrhy nemají smysl`); process.exit(1); }

for (const [nazev, co, cim] of PODVRHY) {
	if (!puvodni.includes(co)) { console.log(`⚠️  vzor nenalezen — ${nazev}`); spatne++; continue; }
	writeFileSync(KOPIE, puvodni.replace(co, cim));
	const r = beh();
	console.log(`${r.status !== 0 ? '✅ odhaleno' : '❌ PROŠLO'} (${r.pad} ❌) — ${nazev}`);
	if (r.status === 0) spatne++;
}
console.log(spatne ? `❌ ${spatne} podvrhů neodhaleno` : `✅ všech ${PODVRHY.length} podvrhů odhaleno`);
process.exit(spatne ? 1 : 0);

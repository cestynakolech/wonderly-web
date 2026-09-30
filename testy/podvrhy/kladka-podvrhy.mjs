#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/kladka.mjs (simulace pevné a volné kladky).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy vrácená stará vada — musí test SHODIT.
// Spuštění:  node testy/podvrhy/kladka-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/KladkaSimulace.astro');
const TEST = join(REPO, 'testy/simulace/kladka.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'kladka-podvrh-'));
const KOPIE = join(WORKDIR, 'KladkaSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['ruka u volné kladky táhne DOLŮ', 'sipka(212, g.rukaY + 20, g.rukaY - 8', 'sipka(212, g.rukaY - 8, g.rukaY + 20'],
	['ruka se posune jen o h, ne o 2h', 'rukaY: 155 - posun - posun', 'rukaY: 155 - posun'],
	['tažný konec vede ke stropu (stará vada)', 'cara(184, g.ky, 184, g.rukaY, LANO, 3)', 'cara(184, g.ky, 184, 18, LANO, 3)'],
	['chybí kóta 2 m lana', "svg += kota(44, g0.rukaY, g.rukaY, hotovo ? `${g.drahaLana} m` : '', 36, 'end', 174);", ''],
	['stará čísla 10 kg / 100 N / 50 N', 'const HMOTNOST = 2;', 'const HMOTNOST = 10;'],
	['K1: animace se po Zpět/přepnutí nezastaví', 'if (mujBeh !== animace.beh) return;', ''],
	['K2: obrys ruky pod kladkou (stará poloha 200/160)', 'const ky = 260 - posun;', 'const ky = 200 - posun;'],
	['K3: šipka ruky zpět vlevo pod vodicí linkou', 'sipka(212, g.rukaY + 20, g.rukaY - 8', 'sipka(160, g.rukaY + 20, g.rukaY - 8'],
	['K4: bez aria-live', '<p id="kl-info" class="kl-info" aria-live="polite">', '<p id="kl-info" class="kl-info">'],
	['K4: bez aria-pressed při přepnutí', "$('kl-pevna').setAttribute('aria-pressed', String(!jeVolna));", ''],
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

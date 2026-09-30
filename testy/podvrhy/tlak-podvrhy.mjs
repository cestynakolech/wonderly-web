#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/tlak.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/tlak-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/TlakSimulace.astro');
const TEST = join(REPO, 'testy/simulace/tlak.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'tlak-podvrh-'));
const KOPIE = join(WORKDIR, 'tlak-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');
const PODVRHY = [
	['chyba z 26. 8. 2026: s2Tyc použitý bez deklarace (ReferenceError při načtení)', (s) => s.replace("\tconst s2Tyc = document.getElementById('s2-tyc');\n", '')],
	['getElementById na id, které ve zdroji není (null → TypeError)', (s) => s.replace("document.getElementById('s2-tyc')", "document.getElementById('s2-tyc-preklep')")],
	['tyč pístu stojí na místě', (s) => s.replace("s2Tyc.setAttribute('x', pistX + 20);", "s2Tyc.setAttribute('x', 360);")],
	['posuvník hloubky se nepřipojí', (s) => s.replace("s3Slider.addEventListener('input', renderS3);", '')],
	['tlačítka scén nemají posluchač', (s) => s.replace("btn.addEventListener('click', () => {", "btn.addEventListener('klik', () => {")],
	['po načtení se neskryjí ostatní scény', (s) => s.replace("window.addEventListener('load', () => {", "window.addEventListener('nacteno', () => {")],
	['scéna 4 bez molekul', (s) => s.replace('animateAtmosphere();\n', '\n')],
	['tlak při 50 % objemu 150 kPa (neplatí p·V = konst.)', (s) => s.replace('const tlaks = [100, 200, 300, 400];', 'const tlaks = [100, 150, 300, 400];')],
	['popis scény 2 nesouhlasí s údajem v SVG', (s) => s.replace("'Objem = 50 %, tlak = 200 kPa.", "'Objem = 50 %, tlak = 250 kPa.")],
	['píst nezajede (pořád x = 340)', (s) => s.replace('const pistX = 340 - (idx * 72.5);', 'const pistX = 340;')],
	['molekuly scény 2 vylezou z válce', (s) => s.replace('const x = 50 + 30 +', 'const x = 50 - 30 +')],
	['molekuly scény 1 mimo nádobu', (s) => s.replace('const x = 70 + Math.random() * 260;', 'const x = 70 + Math.random() * 400;')],
];

const spust = (obsah) => { writeFileSync(KOPIE, obsah); return spawnSync('node', [TEST, KOPIE], { encoding: 'utf8', timeout: 60_000 }); };
let vada = 0;
const zdravy = spust(puvodni);
const nZdr = (zdravy.stdout.match(/✅/g) || []).length;
console.log(`${zdravy.status === 0 ? '✅' : '❌'} zdravá kopie projde (${nZdr} kontrol, kód ${zdravy.status})`);
if (zdravy.status !== 0) vada++;
for (const [nazev, uprav] of PODVRHY) {
	const zmeneny = uprav(puvodni);
	if (zmeneny === puvodni) { console.log(`❌ podvrh se nepodařilo aplikovat: ${nazev}`); vada++; continue; }
	const b = spust(zmeneny);
	const padlo = (b.stdout.match(/❌/g) || []).length;
	const chycen = b.status !== 0;
	console.log(`${chycen ? '✅' : '❌'} ${nazev} → ${chycen ? `test spadl (${padlo} kontrol)` : 'PROŠEL — díra'}`);
	if (!chycen) vada++;
}
console.log(`\n${PODVRHY.length} podvrhů, vad měřidla: ${vada}`);
process.exit(vada ? 1 : 0);

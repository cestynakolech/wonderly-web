#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/jiskra.mjs (vedení proudu v plynech).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy vrácená stará vada — musí test SHODIT.
// Spuštění:  node testy/podvrhy/jiskra-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.WONDERLY_REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/JiskraSimulace.astro');
const TEST = join(REPO, 'testy/simulace/jiskra.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'jiskra-podvrh-'));
const KOPIE = join(WORKDIR, 'JiskraSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['T3d-5: úvod zase tvrdí „3 kV na 1 mm“', 'ztratí izolační schopnost</strong>.', 'ztratí izolační schopnost</strong>. Na 1 mm vzduchu je potřeba zhruba <strong>3 kV</strong>.'],
	['T3d-5: pravidlo „sekundy ÷ 3 = km“', 'Pauzu můžeš odpočítávat v sekundách.', 'Vzdálenost bouřky = sekundy ÷ 3.'],
	['T3d-5: napětí zase v kV', 'g(\'jis-out-u\').textContent = s.napeti;', 'g(\'jis-out-u\').textContent = `${U * 3} kV`;'],
	['jiskra už při „velkém“ napětí', 'const PRURAZ = NAPETI.length - 1;', 'const PRURAZ = NAPETI.length - 2;'],
	['svíčka vzduch neionizuje', 'const horkyVzduch = svicka && U > 0;', 'const horkyVzduch = false;'],
	['bouřka se neodsouvá', 'posun: i * POSUN', 'posun: 0'],
	['obrácené pravidlo pauza ↔ vzdálenost', "const VZDALENOST = ['blízko', 'dál', 'daleko'];", "const VZDALENOST = ['daleko', 'dál', 'blízko'];"],
	['blesk přes zem k bleskosvodu (stará kresba)', 'points="214,112 198,132 216,138 200,156 206,170"', 'points="214,112 190,200 206,290 206,170"'],
	['J1: bleskosvod bez vodiče do země', 'id="jis-svod" points="206,208 248,238 248,300 240,300"', 'id="jis-svod" points="206,208 248,238"'],
	['J2: hrom = „rozpínající se vzduch“', 'Hrom je zvuk, který vzniká rychlým rozpínáním ohřátého vzduchu.', 'Hrom je rychle se rozpínající ohřátý vzduch.'],
	['J3: žárovka proud neukazuje', "viditelne('jis-paprsky', s.vede);", "viditelne('jis-paprsky', false);"],
	['J4: kladný náboj mraku dole pod záporným', '<text x="170" y="70" text-anchor="middle"', '<text x="170" y="112" text-anchor="middle"'],
	['J5: popisek teploty daleko od blesku', '<text id="jis-blesk-info" x="190" y="142"', '<text id="jis-blesk-info" x="120" y="142"'],
	['J6: drobné písmo „bleskosvod“', 'font-size="19" fill="#2b2a26">bleskosvod', 'font-size="12" fill="#2b2a26">bleskosvod'],
	['J3/J6: šedý popisek s nízkým kontrastem', 'fill="#495057">vzduch', 'fill="#adb5bd">vzduch'],
	['bez aria-live', 'id="jis-stav" aria-live="polite"', 'id="jis-stav"'],
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

#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/elektrolyza.mjs (vedení proudu v kapalinách).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy vrácená stará vada — musí test SHODIT.
// Spuštění:  node testy/podvrhy/elektrolyza-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.WONDERLY_REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/ElektrolyzaSimulace.astro');
const TEST = join(REPO, 'testy/simulace/elektrolyza.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'elektrolyza-podvrh-'));
const KOPIE = join(WORKDIR, 'ElektrolyzaSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['T3d-1: text „nejsou v ní ionty“', 'Destilovaná voda není vodič elektrického proudu: obsahuje jen nepatrné množství iontů (H⁺ a OH⁻).', 'Destilovaná voda proud NEVEDE — nejsou v ní ionty.'],
	['T3d-1: čistá voda „proud neprochází“ (0 A)', "const proud = !sepnuto ? 'neprochazi' : elektrolyt ? 'prochazi' : 'velmiMaly';", "const proud = !sepnuto ? 'neprochazi' : elektrolyt ? 'prochazi' : 'neprochazi';"],
	['E1: velmi malý proud skoro k nerozeznání od nuly (−48°)', 'velmiMaly: -30', 'velmiMaly: -48'],
	['T3d-1: iont H⁺ z čisté vody zmizel', "{ druh: 'kation', text: 'H⁺', x: 150, y: 214, smer: -1 },", ''],
	['T3d-1: žárovka v čisté vodě svítí', "sviti: proud === 'prochazi',", 'sviti: sepnuto,'],
	['ampérmetr vypuštěný z obvodu', 'M60 118 L60 90 M60 54 L60 36', 'M60 118 L60 36'],
	['T3d-2: anion zase světle modrý', "anion: ['#7048e8', '#4c2bb0']", "anion: ['#74c0fc', '#4c2bb0']"],
	['T3d-2: kation zase růžový', "kation: ['#e03131', '#a61e1e']", "kation: ['#ff8787', '#a61e1e']"],
	['bez opory: vrácený odpor a vzorec I = U / R', 'NaCl → Na⁺ + Cl⁻. Roztok', 'I = U / R = 4,5 V / 2 Ω. Roztok'],
	['bez opory: vrácené zlato Au⁺', "const kat = rezim === 'pomedeni' ? 'Cu²⁺' : 'Na⁺'", "const kat = rezim === 'pomedeni' ? 'Au⁺' : 'Na⁺'"],
	['měděná anoda se nerozpouští', 'x: s.anodaUbyva ? 55 : 52, width: s.anodaUbyva ? 10 : 16', 'x: 52, width: 16'],
	['páčka vypínače se nesklopí', '{ x2: 222, y2: 36 }', '{ x2: 218, y2: 18 }'],
	['ionty v roztoku se překrývají', 'const POKUS_KATIONTY = [[150, 180]', 'const POKUS_KATIONTY = [[200, 180]'],
	['šipky iontů míří obráceně', 'const smerKationtu = s.katodaVlevo ? -1 : 1;', 'const smerKationtu = s.katodaVlevo ? 1 : -1;'],
	['E2: pomědění zrcadlově proti obr-05', 'katodaVlevo: !pomedeni,', 'katodaVlevo: true,'],
	['E3: měď jen kolem misky, rukojeť bez mědi', '<rect x="289" y="150" width="22" height="104" rx="4" />', ''],
	['E3: šipka Cu²⁺ naráží do vrstvy mědi', '[160, 292]]', '[130, 292]]'],
	['J6: drobné písmo H₂O na mobilu', 'font-size="19" fill="#495057">H₂O', 'font-size="12" fill="#495057">H₂O'],
	['J6: slabý kontrast H₂O (3,1 : 1)', 'fill="#495057">H₂O', 'fill="#868e96">H₂O'],
	['slabý kontrast popisku ANODA (#e03131 na plátně)', "nastav('ely-pop-p', { fill: s.katodaVlevo ? '#c92a2a' : '#1971c2' });", "nastav('ely-pop-p', { fill: s.katodaVlevo ? '#e03131' : '#1971c2' });"],
	['bez aria-live', 'id="ely-stav" aria-live="polite"', 'id="ely-stav"'],
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

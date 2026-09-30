#!/usr/bin/env node
// Obousměrné ověření nových kontrol legendy v testy/simulace/polovodic.mjs.
// Jen nad kopií komponenty v dočasné složce — do repa nesahá.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/PolovodicSimulace.astro');
const TEST = join(REPO, 'testy/simulace/polovodic.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'polovodic-podvrh-'));
const KOPIE = join(WORKDIR, 'PolovodicSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });
const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['díra zase červený kroužek „d"', 'fill="#ffffff" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" />`\n\t\t\t+ `<text x="${x}" y="${y + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#1b6b2d">+</text>`', 'fill="#e03131" stroke="#2b2a26" stroke-width="1.5" />`\n\t\t\t+ `<text x="${x}" y="${y + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">d</text>`'],
	['elektron zase „e⁻"', 'font-weight="bold" fill="#ffffff">−</text>`;\n\t}\n\tfunction dira', 'font-weight="bold" fill="#ffffff">e⁻</text>`;\n\t}\n\tfunction dira'],
	['typ N zase modrý', "barva: '#ffe3e3',\n\t\t\t\tobrys: '#c2255c',", "barva: '#d0ebff',\n\t\t\t\tobrys: '#c2255c',"],
	['typ P zase růžový', "barva: '#f3e6c8',", "barva: '#ffe3e3',"],
	['obrys vzorku se nemění', "g('pold-vzorek').setAttribute('stroke', stav.obrys);", ''],
	['legenda díry chybí', '<circle cx="200" cy="396" r="13" fill="#ffffff" stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" />', ''],
	['tlačítko s červeným puntíkem', '>typ P (příměs bor)<', '>🔴 typ P (příměs bor)<'],
	['P5: přepólovaná baterie (dlouhá čárka vlevo)', '<line id="pold-bat-kratka" x1="226" y1="318" x2="226" y2="342" stroke="#2b2a26" stroke-width="6" />\n\t\t<line id="pold-bat-dlouha" x1="240" y1="308" x2="240" y2="352"', '<line id="pold-bat-kratka" x1="240" y1="318" x2="240" y2="342" stroke="#2b2a26" stroke-width="6" />\n\t\t<line id="pold-bat-dlouha" x1="226" y1="308" x2="226" y2="352"'],
	['K1 mobil: stará široká scéna 660', 'viewBox="0 0 360 430"', 'viewBox="0 0 660 430"'],
	['K1 mobil: drobný popisek vzorku', 'font-size="19" fill="#495057">čistý křemík', 'font-size="13" fill="#495057">čistý křemík'],
	['K3: červené „+" s nízkým kontrastem', 'font-weight="bold" fill="#c92a2a">+</text>', 'font-weight="bold" fill="#e03131">+</text>'],
	['K4: „Volné nosiče náboje"', 'return `Nositelé náboje: ${s.nosice}`;', 'return `Volné nosiče náboje: ${s.nosice}`;'],
	['K6: popis bez aria-live', 'id="pold-popis" aria-live="polite"', 'id="pold-popis"'],
	['K6: tlačítka bez aria-pressed', "g(t.id).setAttribute('aria-pressed', zvoleno ? 'true' : 'false');", ''],
	['K8: legenda zpátky v obvodu', '<circle cx="200" cy="396" r="13"', '<circle cx="200" cy="300" r="13"'],
];

const beh = () => { const r = spawnSync(process.execPath, [TEST, KOPIE], { encoding: 'utf8' }); return { status: r.status, pad: ((r.stdout ?? '').match(/❌/g) || []).length }; };
let spatne = 0;
writeFileSync(KOPIE, puvodni);
const zdrava = beh();
if (zdrava.status === 0) console.log('✅ ZDRAVÁ KOPIE prošla (0 ❌)');
else { console.log(`❌ ZDRAVÁ KOPIE neprošla (${zdrava.pad} ❌)`); process.exit(1); }
for (const [nazev, co, cim] of PODVRHY) {
	if (!puvodni.includes(co)) { console.log(`⚠️  vzor nenalezen — ${nazev}`); spatne++; continue; }
	writeFileSync(KOPIE, puvodni.replace(co, cim));
	const r = beh();
	if (r.status !== 0) console.log(`✅ odhaleno (${r.pad} ❌): ${nazev}`);
	else { console.log(`❌ PROŠLO: ${nazev}`); spatne++; }
}
console.log(spatne ? `\n❌ ${spatne} podvrhů neodhaleno` : `\n✅ všech ${PODVRHY.length} podvrhů odhaleno`);
process.exit(spatne ? 1 : 0);

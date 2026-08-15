#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/obnovitelne-zdroje.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/obnovitelne-zdroje-podvrhy.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/ObnovitelneZdrojeSimulace.astro');
const TEST = join(REPO, 'testy/simulace/obnovitelne-zdroje.mjs');
const KOPIE = join(tmpdir(), 'obnovitelne-zdroje-podvrh.astro');

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— scéna A: třídění a chyták s vodíkem ——
	['vodík je označen jako obnovitelný', (s) => s.replace("vodik: { typ: 'nosic', text: 'Chyták!", "vodik: { typ: 'obnovitelny', text: 'Chyták!")],
	['uhlí je označeno jako obnovitelné', (s) => s.replace("uhli: { typ: 'neobnovitelny'", "uhli: { typ: 'obnovitelny'")],
	['barva pro nosič je stejná jako pro obnovitelný', (s) => s.replace("return { pozadi: '#fff3bf', okraj: '#e8590c' };", "return { pozadi: '#d3f9d8', okraj: '#2f9e44' };")],
	['barva pro neobnovitelný je zelená', (s) => s.replace("if (typ === 'neobnovitelny') return { pozadi: '#e9ecef', okraj: '#5c5343' };", "if (typ === 'neobnovitelny') return { pozadi: '#d3f9d8', okraj: '#2f9e44' };")],
	['vodík ztratí slova "nosič" i "Chyták" v textu', (s) => s.replace("text: 'Chyták! Vodík není ani obnovitelný, ani neobnovitelný zdroj — na Zemi se volný skoro nevyskytuje, musí se VYROBIT. Je to NOSIČ energie, jako baterie.'", "text: 'Vodík je běžný zdroj energie jako každý jiný.'")],
	// —— scéna B: přečerpávací elektrárna ——
	['výchozí režim je čerpání místo výroby (horniProcent obráceně)', (s) => s.replace('let horniProcent = 80;\n\tlet cilHorniProcent = 80;', 'let horniProcent = 20;\n\tlet cilHorniProcent = 20;')],
	['čerpání snižuje horní hladinu místo zvyšování', (s) => s.replace("if (rezim === 'cerpat') {\n\t\t\tcilHorniProcent = 80;", "if (rezim === 'cerpat') {\n\t\t\tcilHorniProcent = 20;")],
	['výška horní nádrže se počítá ze špatné konstanty', (s) => s.replace('const HORNI_Y0 = 20, HORNI_VYSKA = 110, HORNI_DNO = HORNI_Y0 + HORNI_VYSKA; // 130', 'const HORNI_Y0 = 20, HORNI_VYSKA = 90, HORNI_DNO = HORNI_Y0 + HORNI_VYSKA; // 110')],
	['okamžitá změna po kliku se vůbec nedělá', (s) => s.replace('horniProcent = horniProcent + (cilHorniProcent - horniProcent) * 0.4;', '')],
	['krok animace přeskočí cíl (moc velký krok)', (s) => s.replace('horniProcent += rozdil * 0.08;', 'horniProcent += rozdil * 1.5;')],
	['krok animace jde opačným směrem od cíle', (s) => s.replace('horniProcent += rozdil * 0.08;', 'horniProcent -= rozdil * 0.08;')],
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

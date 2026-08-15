#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/opakovani-velicin.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/opakovani-velicin-podvrhy.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/OpakovaniVelicinSimulace.astro');
const TEST = join(REPO, 'testy/simulace/opakovani-velicin.mjs');
const KOPIE = join(tmpdir(), 'opakovani-velicin-podvrh.astro');

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— data tabulky ——
	['hustota má špatnou jednotku', (s) => s.replace("{ nazev: 'Hustota', znacka: 'ρ (ró)', jednotka: 'kg/m³', meridlo: 'hustoměr / výpočet' },", "{ nazev: 'Hustota', znacka: 'ρ (ró)', jednotka: 'g/cm³', meridlo: 'hustoměr / výpočet' },")],
	['objem se měří špatným měřidlem', (s) => s.replace("{ nazev: 'Objem', znacka: 'V', jednotka: 'metr krychlový (m³)', meridlo: 'odměrný válec' },", "{ nazev: 'Objem', znacka: 'V', jednotka: 'metr krychlový (m³)', meridlo: 'siloměr' },")],
	// —— možnosti() — distraktory a determinismus ——
	['distraktor je vymyšlený, ne skutečná hodnota jiné veličiny', (s) => s.replace('if (kandidat !== spravna && !distraktori.includes(kandidat)) distraktori.push(kandidat);', "distraktori.push('vymyšlená hodnota');")],
	['pozice správné odpovědi je vždy na indexu 0 (žádná rotace)', (s) => s.replace('const posun = (i + krokIndex) % poleOptions.length;', 'const posun = 0;')],
	['distraktory se mohou opakovat (žádná kontrola duplicit)', (s) => s.replace('if (kandidat !== spravna && !distraktori.includes(kandidat)) distraktori.push(kandidat);', 'if (kandidat !== spravna) distraktori.push(spravna);')],
	// —— průběh kvízu (část A) ——
	['správná volba nezezelená po kliknutí', (s) => s.replace("rectyA[k].setAttribute('fill', spravne ? '#b2f2bb' : '#ffc9c9');", "rectyA[k].setAttribute('fill', '#ffffff');")],
	['tlačítko Další se neodkryje po odpovědi', (s) => s.replace("dalsiBtn.setAttribute('opacity', '1');", '')],
	['skóre se po odpovědi nezvýší', (s) => s.replace('if (spravne) spravnych++;', '')],
	['druhý klik po odpovědi se neignoruje (jde přepsat)', (s) => s.replace('if (odpovezeno) return;\n\t\todpovezeno = true;', 'odpovezeno = true;')],
	['po špatné odpovědi se neukáže správná zeleně', (s) => s.replace("if (!spravne) rectyA[aktualni.correctIndex].setAttribute('fill', '#b2f2bb');", '')],
	// —— část B: klik na řádek ——
	['klik na řádek nezvýrazní fill', (s) => s.replace("r.setAttribute('fill', j === i ? '#ffe8cc' : '#ffffff');", '')],
	['detail po kliku nepopisuje veličinu', (s) => s.replace('detailEl.textContent = `${v.nazev} (${v.znacka}) — jednotka ${v.jednotka}, měří se: ${v.meridlo}.`;', "detailEl.textContent = 'klik';")],
	['přepnutí řádku nezruší předchozí zvýraznění (svítí víc řádků)', (s) => s.replace("r.setAttribute('fill', j === i ? '#ffe8cc' : '#ffffff');\n\t\t\tr.setAttribute('stroke-width', j === i ? '4' : '2');", "if (j === i) r.setAttribute('fill', '#ffe8cc');")],
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

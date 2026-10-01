#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/tlak.mjs (komponenta přepsaná 1. 10. 2026
// na tři scény A–C podle návrhu f7-tlak-b.json).
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
	['záměna dělení za násobení (p = F · S)', (s) => s.replace('const P_ZAVAZI = F / S;', 'const P_ZAVAZI = F * S;')],
	['plocha v cm² bez převodu na m²', (s) => s.replace('const S = S_ZAVAZI_CM2 / CM2_V_M2;', 'const S = S_ZAVAZI_CM2;')],
	['síla 5 N místo 50 N (zapomenuté g)', (s) => s.replace('const F = M * G;', 'const F = M;')],
	['posuvník A se nepřipojí', (s) => s.replace("$('tl-a-davky').addEventListener('input', kresliA);", '')],
	['přepínač B nemění výšku důlku', (s) => s.replace('dulekHloubka: 10,', 'dulekHloubka: 36,')],
	// opravy po kontrole 1. 10. 2026
	['čokoláda v hromádce v rohu místo posypu (1. dávka stažená do rohu čtverce)', (s) => s.replace(/(<g id="tl-a-h1"[^>]*>\s*<path[^>]*\sd=")([^"]+)"/, (_, a, d) => a + d.replace(/M(\d+) (\d+)/g, (__, x, y) => `M${35 + ((+x - 35) % 30)} ${61 + ((+y - 61) % 30)}`) + '"')],
	['deska není v měřítku (360 místo 400 při závaží 40)', (s) => s.replace('x="20" y="244" width="400"', 'x="20" y="244" width="360"')],
	['mělký důlek schovaný celý pod deskou (deska v úrovni povrchu)', (s) => s.replace('dulekX: 12, dulekSirka: 416, dulekHloubka: 10,', 'dulekX: 12, dulekSirka: 416, dulekHloubka: 4,').replace('x="20" y="244"', 'x="20" y="238"')],
	['třetí řádek scény C prázdný u tlaku', (s) => s.replace("r3: () => `tedy ${cislo(F / S)} Pa = ${F / S / PA_V_KPA} kPa`", "r3: () => ''")],
	['popisek „5 kg" bílý uvnitř závaží (stará kresba)', (s) => s.replace("nastav('tl-b-zavazi-t', { y: k.zavaziY - 10 });", "nastav('tl-b-zavazi-t', { y: k.zavaziY + 30 });")],
	['text pod scénou B nesouhlasí s SVG', (s) => s.replace('jen ${P_DESKY} Pa', 'jen ${P_DESKY * 10} Pa')],
	['chybí scéna C (celé SVG i ovladač pryč)', (s) => s.replace(/<h3>C\)[\s\S]*?<p id="tl-c-vysl" class="tl-vysledek"><\/p>/, '')],
	['vrácená chyba z 26. 8. 2026: proměnná bez deklarace', (s) => s.replace(/\tconst HODNOTY = [^\n]*\n/, '')],
	['5 000 Pa převedeno jako 1 kPa (dělení 5 000 místo 1 000)', (s) => s.replace('const PA_V_KPA = 1000;', 'const PA_V_KPA = 5000;')],
	['hromádky čokolády se neukazují podle počtu dávek', (s) => s.replace('opacity: i <= davky ? 1 : 0', 'opacity: 1')],
	['karta hledané veličiny ve scéně C nedostane otazník', (s) => s.replace("hledam ? '?' : HODNOTY[co]", 'HODNOTY[co]')],
	['scéna ukazuje číslo, které ve výkladu není (6 kg)', (s) => s.replace('const M = 5;', 'const M = 6;')],
	['vrácená stará scéna s hloubkou', (s) => s.replace('<h3>A) Čokoláda', '<p>hloubka 10 m</p><h3>A) Čokoláda')],
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

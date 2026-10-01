#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/stlacitelnost.mjs.
// Patří do testy/podvrhy/stlacitelnost-podvrhy.mjs (přesune exekutor).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/stlacitelnost-podvrhy.mjs
//            (mimo repo: REPO=/cesta/k/wonderly-web node stlacitelnost-podvrhy.mjs)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/StlacitelnostSimulace.astro');
const TEST = join(REPO, 'testy/simulace/stlacitelnost.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'stlacitelnost-podvrh-'));
const KOPIE = join(WORKDIR, 'stlacitelnost-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— fyzika: co scéna tvrdí ——
	['voda se stlačí stejně jako vzduch', (s) => s.replace("const vyska = rezim === 'vzduch' ? vyskaVzduchu(stupen) : VYSKA_KLID;", 'const vyska = vyskaVzduchu(stupen);')],
	['vzduch se nestlačí (píst stojí i u vzduchu)', (s) => s.replace("const vyska = rezim === 'vzduch' ? vyskaVzduchu(stupen) : VYSKA_KLID;", 'const vyska = VYSKA_KLID;')],
	['vzduch se stlačuje lineárně až skoro na nulu', (s) => s.replace('Math.round((VYSKA_KLID * 4) / (4 + stupen))', 'Math.round(VYSKA_KLID - 45 * stupen)')],
	['při vodě zmizí kuličky vzduchu, ale kuličky vody se neukážou', (s) => s.replace("nastav('st-voda', { opacity: voda ? 1 : 0 });", "nastav('st-voda', { opacity: 0 });")],
	['u vzduchu se kuličky vody ukážou také', (s) => s.replace("nastav('st-voda', { opacity: voda ? 1 : 0 });", "nastav('st-voda', { opacity: 1 });")],
	['při stlačení jedna kulička vzduchu zmizí (počet se nezachová)', (s) => s.replace('opacity: voda ? 0 : 1 }));', 'opacity: voda || (stupen > 0 && i === 11) ? 0 : 1 }));')],
	['kuličky vzduchu se při stlačení nenahustí (zůstanou na místě, píst jimi projede)', (s) => s.replace('const castice = CASTICE.map(([dx, v]) => [LEVY_OKRAJ + dx, spodekPistu + R + Math.round((volno * v) / 100)]);', 'const castice = CASTICE.map(([dx, v]) => [LEVY_OKRAJ + dx, DNO - VYSKA_KLID + R + Math.round(((VYSKA_KLID - 2 * R) * v) / 100)]);')],
	['dvě kuličky vzduchu se překrývají', (s) => s.replace('[4, 2], [50, 4], [98, 0],', '[4, 2], [8, 4], [98, 0],')],
	['kulička vzduchu leží v pístu (nad prostorem pro vzduch)', (s) => s.replace('[4, 2], [50, 4], [98, 0],', '[4, -6], [50, 4], [98, 0],')],
	['kuličky vody mají jinou velikost než kuličky vzduchu', (s) => s.replace('stroke="#1864ab" stroke-width="12"', 'stroke="#1864ab" stroke-width="9"')],
	['jedna kulička vody chybí', (s) => s.replace('M66 210h0M78 210h0', 'M78 210h0')],
	['kuličky vody nejsou těsně u sebe (řádky daleko od sebe)', (s) => s.replace('M72 221h0M84 221h0M96 221h0M108 221h0M120 221h0M132 221h0M144 221h0M156 221h0M168 221h0', 'M72 226h0M84 226h0M96 226h0M108 226h0M120 226h0M132 226h0M144 226h0M156 226h0M168 226h0')],
	['třináctá kulička vzduchu navíc', (s) => s.replace('<circle id="st-c11" cx="172" cy="390" r="6" />', '<circle id="st-c11" cx="172" cy="390" r="6" />\n\t\t\t<circle id="st-c12" cx="100" cy="300" r="6" />')],

	// —— kresba ——
	['táhlo s rukojetí se s pístem nehýbe', (s) => s.replace("nastav('st-tahlo', { y: m.tahloY });", '')],
	['rukojeť zajede do válce (krátké táhlo)', (s) => s.replace('const TAHLO = 112;', 'const TAHLO = 60;')],
	['šipka síly má pořád stejnou délku', (s) => s.replace('const sipka = stupen * KROK_SIPKY;', 'const sipka = 4 * KROK_SIPKY;')],
	['šipka je vidět i bez síly', (s) => s.replace('const viditelna = stupen > 0 ? 1 : 0;', 'const viditelna = 1;')],
	['hrot šipky míří nahoru', (s) => s.replace('`110,${spicka - 12} 130,${spicka - 12} 120,${spicka}`', '`110,${spicka} 130,${spicka} 120,${spicka - 12}`')],
	['obsah se nepřebarví na vodu', (s) => s.replace("nastav('st-obsah', { y: m.spodekPistu, height: m.vyska, fill: BARVA[rezim] });", "nastav('st-obsah', { y: m.spodekPistu, height: m.vyska, fill: BARVA.vzduch });")],
	['obsah pod pístem nesahá až na dno', (s) => s.replace("nastav('st-obsah', { y: m.spodekPistu, height: m.vyska, fill: BARVA[rezim] });", "nastav('st-obsah', { y: m.spodekPistu, height: m.vyska - 20, fill: BARVA[rezim] });")],

	// —— texty ——
	['u vody text tvrdí, že se píst posune', (s) => s.replace("pist = 'téměř se nehne';", "pist = 'posune se dolů';")],
	['text o vodě bez opory ve výkladu (chybí „téměř dokonale nestlačitelná")', (s) => s.replace('Voda je téměř dokonale nestlačitelná.', 'Voda se stlačit nedá.')],
	['text uvádí číslo, které výklad nemá', (s) => s.replace("pist = 'posune se dolů';", "pist = 'posune se o 3 cm';")],
	['popisek síly na plaketě neodpovídá posuvníku', (s) => s.replace("$('st-sila-svg').textContent = sila;", "$('st-sila-svg').textContent = SILY[0];")],
	['plaketa látky neukáže vodu', (s) => s.replace("$('st-latka').textContent = voda ? 'voda' : 'vzduch';", "$('st-latka').textContent = 'vzduch';")],
	['HTML obraz pro telefon nenese stav pístu', (s) => s.replace(' · píst: ${pist}', '')],

	// —— ovládání ——
	['posuvník síly s krokem, který dá polohy mezi stupni', (s) => s.replace('id="st-sila" type="range" min="0" max="4" step="1"', 'id="st-sila" type="range" min="0" max="4" step="0.5"')],
	['tlačítka nepřepínají aria-pressed', (s) => s.replace("$('st-vodu').setAttribute('aria-pressed', String(voda));", '')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8', timeout: 60_000 });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const kontrol = (zdravy.stdout.match(/^✅ /gm) ?? []).length;
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${kontrol} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
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

#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/kvarky.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/kvarky-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/KvarkySimulace.astro');
const TEST = join(REPO, 'testy/simulace/kvarky.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'kvarky-podvrh-'));
const KOPIE = join(WORKDIR, 'kvarky-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— obsah: nic navíc proti výkladu ——
	['simulace přidává náboj a zlomky, které výklad neučí', (s) => s.replace(
		'Kvark je zatím nejmenší známá částice, ze které se ${c.druhy} skládá.',
		'Každý kvark má náboj +2/3 nebo −1/3.')],
	// —— scéna A: text proti kresbě ——
	['text tvrdí 4 kvarky, kreslí se 3', (s) => s.replace(
		"pocetA.textContent = 'kvarků na obrázku: ' + viditelnychKvarku;",
		"pocetA.textContent = 'kvarků na obrázku: 4';")],
	['v částici se kreslí jen 2 kvarky, text mluví o 3', (s) => s.replace(
		'const TECKY = [[0, -16], [-15, 10], [15, 10]];',
		'const TECKY = [[-15, 10], [15, 10]];')],
	['kvarky se kreslí mimo svou částici', (s) => s.replace(
		'const TECKY = [[0, -16], [-15, 10], [15, 10]];',
		'const TECKY = [[0, -60], [-60, 40], [60, 40]];')],
	['kvarky jsou v částici zrcadlově obráceně (dva nahoře, jeden dole)', (s) => s.replace(
		'const TECKY = [[0, -16], [-15, 10], [15, 10]];',
		'const TECKY = [[0, 16], [-15, -10], [15, -10]];')],
	['vidět jsou dva kroky zvětšení zároveň', (s) => s.replace(
		"nastav('kv-a-st' + i, { display: i === zoom ? '' : 'none' });",
		"nastav('kv-a-st' + i, { display: i <= zoom ? '' : 'none' });")],
	['hlášení „kvark zůstal CELÝ" se ukazuje i u celého jádra', (s) => s.replace(
		'const ukazPokus = zoom === 2 && pokusProbehl;',
		'const ukazPokus = pokusProbehl;')],
	['po pokusu o rozdělení jeden kvark zmizí (text pořád tvrdí 3)', (s) => s.replace(
		"nastav('kv-a-kvark1', { stroke: ukazPokus ? '#e03131' : '#2b2a26', 'stroke-width': ukazPokus ? 6 : 3 });",
		"nastav('kv-a-kvark1', { stroke: '#2b2a26', 'stroke-width': 3, display: ukazPokus ? 'none' : '' });")],
	['pokus o rozdělení „uspěje" — počítadlo hlásí 1 rozdělený kvark', (s) => s.replace(
		'rozdělených kvarků: <strong>0</strong>',
		'rozdělených kvarků: <strong>1</strong>')],
	['počítadlo pokusů se nezvyšuje', (s) => s.replace('\t\t\tpokusu = pokusu + 1;\n', '')],
	['kroužek výběru zůstává na protonu, i když zvětšujeme neutron', (s) => s.replace(
		"nastav('kv-a-vyber', { cx: c.vyberX, cy: c.vyberY });",
		"nastav('kv-a-vyber', { cx: c.vyberX, cy: 150 });")],
	['zvětšený neutron má barvu protonu', (s) => s.replace(
		"nastav('kv-a-nukleon-velky', { fill: c.barva });",
		"nastav('kv-a-nukleon-velky', { fill: '#ffa8a8' });")],
	// —— čeština: shoda přísudku s podmětem ——
	['přísudek je vždy „je" — vznikne „V jádře je 2 protony"', (s) => s.replace(
		"const prisudek = (tvar) => (tvar.endsWith('y') ? 'jsou' : 'je');",
		"const prisudek = () => 'je';")],
	['přísudek je vždy „jsou" — vznikne „V jádře jsou 1 proton"', (s) => s.replace(
		"const prisudek = (tvar) => (tvar.endsWith('y') ? 'jsou' : 'je');",
		"const prisudek = () => 'jsou';")],
	['scéna A tvrdí „Uvnitř je 3 kvarky"', (s) => s.replace(
		'Uvnitř ${prisudek(tvarKvarku(KVARKU_V_CASTICI))}',
		'Uvnitř je')],
	['přísudek se řídí neutrony, ne protony (u 2 protonů a 1 neutronu vyjde „je 2 protony")', (s) => s.replace(
		'V jádře ${prisudek(tvarProtonu(p))}',
		'V jádře ${prisudek(tvarNeutronu(n))}')],
	// —— čeština: slepené věty, čárka před „a", rodové oslovení ——
	['věty se slepí bez oddělovače, s čárkou před „a" a s rodovým „Zkoušel jsi"', (s) => s.replace(
		"zprava = ' · Rozdělit kvark se nepodařilo ani jednou.';",
		"zprava = ' Zkoušel jsi to ' + pokusu + '×, a rozdělit kvark se nepodařilo ani jednou.';")],
	['chybí oddělovač mezi počítadlem a další větou', (s) => s.replace(
		"zprava = ' · Rozdělit",
		"zprava = ' Rozdělit")],
	// —— dvě protichůdné hlášky vedle sebe (nález kontroly, opraveno 25. 9. 2026) ——
	['pokyn „dojdi na krok 3" má za sebou větu o marných pokusech (protiřečí si)', (s) => s.replace(
		"else if (hlaska === '' && pokusu > 0) zprava = ' · Rozdělit kvark se nepodařilo ani jednou.';",
		"else if (pokusu > 0) zprava = hlaska + ' · Rozdělit kvark se nepodařilo ani jednou.';")],
	['věta o marných pokusech se lepí za pokyn i bez oddělovače', (s) => s.replace(
		"else if (hlaska === '' && pokusu > 0) zprava = ' · Rozdělit kvark se nepodařilo ani jednou.';",
		"else if (pokusu >= 0) zprava = hlaska + ' Rozdělit kvark se nepodařilo ani jednou.';")],
	// —— jednotky ve větě o součinu (nález kontroly, opraveno 25. 9. 2026) ——
	['věta o součinu má obrácené jednotky („3 × 8 částic = 24 kvarků")', (s) => s.replace(
		'soucetB.textContent = `${tvarCastic(castic)} × ${tvarKvarku(KVARKU_V_CASTICI)} = ${tvarKvarku(kvarku)}`;',
		'soucetB.textContent = `${KVARKU_V_CASTICI} × ${tvarCastic(castic)} = ${tvarKvarku(kvarku)}`;')],
	['věta o součinu má vpravo částice místo kvarků („8 částic × 3 kvarky = 24 částic")', (s) => s.replace(
		'= ${tvarKvarku(kvarku)}`;',
		'= ${tvarCastic(kvarku)}`;')],
	['prostřední činitel není 3 kvarky, ale počet částic', (s) => s.replace(
		'× ${tvarKvarku(KVARKU_V_CASTICI)} =',
		'× ${tvarKvarku(castic)} =')],
	// —— obrázek nesmí lhát: šipky u pokusu o rozdělení ——
	['šipky míří hroty DOVNITŘ na kvark (kreslí stlačení místo roztržení)', (s) => s.replace(
		'points="276,118 240,128 276,138"', 'points="240,118 276,128 240,138"').replace(
		'points="364,118 400,128 364,138"', 'points="400,118 364,128 400,138"')],
	['obě šipky míří stejným směrem (kvark se posouvá, netrhá)', (s) => s.replace(
		'points="364,118 400,128 364,138"', 'points="276,118 240,128 276,138"')],
	['šipky zajíždějí do kvarku', (s) => s.replace(
		'points="276,118 240,128 276,138"', 'points="300,118 240,128 300,138"')],
	// —— scéna B: počty, rozvržení, viditelnost ——
	['kvarků v jádře se počítá jako 2 × částice, text ukazuje 3 ×', (s) => s.replace(
		'const kvarku = KVARKU_V_CASTICI * castic;',
		'const kvarku = 2 * castic;')],
	['řada částic není vystředěná a přetéká plátno', (s) => s.replace(
		'const zacatek = B_STRED - sirkaRady / 2; // řada je vystředěná',
		'const zacatek = B_STRED;')],
	['částice se v řadě překrývají (příliš malý rozestup)', (s) => s.replace(
		'const B_ROZESTUP = 112;',
		'const B_ROZESTUP = 60;')],
	['řady protonů a neutronů leží přes sebe', (s) => s.replace(
		'const B_ROZESTUP_RAD = 108;',
		'const B_ROZESTUP_RAD = 20;')],
	['popisky řad jsou zaměněné (protonů ↔ neutronů)', (s) => s.replace(
		"popisekP.textContent = 'protonů: ' + p;",
		"popisekP.textContent = 'protonů: ' + n;")],
	['popisek prázdné řady se netlumí', (s) => s.replace(
		"nastav('kv-b-popisek-n', { opacity: n > 0 ? 1 : 0.55 });",
		"nastav('kv-b-popisek-n', { opacity: 1 });")],
	['neutrony se kreslí barvou protonů', (s) => s.replace(
		"rada(n, B_Y_NEUTRONY, '#dee2e6')",
		"rada(n, B_Y_NEUTRONY, '#ffa8a8')")],
	['čtečky posuvníků ukazují pořád výchozí hodnoty', (s) => s.replace(
		"outP.textContent = String(p);",
		"outP.textContent = '2';")],
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

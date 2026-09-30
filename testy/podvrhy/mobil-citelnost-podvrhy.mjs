#!/usr/bin/env node
// Obousměrné ověření měřidla testy/mobil-citelnost.mjs (čitelnost simulací na telefonu, varianta A).
// Pracuje VÝHRADNĚ nad kopiemi komponent v dočasné složce — do repa nesahá.
//
// Směr 1: zdravé komponenty dávky 1 musí měřidlem projít ve VŠECH stavech (exit 0).
// Směr 2: každý podvrh musí měřidlo SHODIT (exit 1) a vadu popsat očekávanou hláškou.
//   P1 Barometr — HTML obraz bez místa a věty o vzduchu: ve výchozí poloze (0 m) projde,
//      spadne až v jiné poloze posuvníku → dokládá, že měřidlo prochází stavy (nález N1).
//   P2 Seznamy — délka „4“ bez data-popisek: v obrazu je „4.“ z číslování, ale krátký popisek
//      smí pokrýt jen [data-popisek] → dokládá pokrytí po tokenech (nález N2).
//   P3 Barometr — <strong> uvnitř obrazu 10 px → dokládá měření potomků obrazu (nález N5).
//   P4 Elektromotor — šipka F ze scény síly 'visible' místo 'inherit': přebije skrytou scénu
//      a kreslí se i v režimu motor → vada jen po kliknutí na režim.
// Spuštění:  node testy/podvrhy/mobil-citelnost-podvrhy.mjs     (potřebuje dist/ a Chrome; ~3 min)
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.WONDERLY_REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const KOMP = join(REPO, 'src/components/skola2');
const MERIDLO = join(REPO, 'testy/mobil-citelnost.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'mobil-podvrh-'));
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const DAVKA1 = ['AlternativniMotory', 'Alternator', 'Barometr', 'Elektromotor', 'MicrobitRadio', 'Seznamy', 'StridavyProud', 'VypocetRychlosti'];
// [popis, komponenta, hledaný řetězec, náhrada, očekávaná hláška (regex), zakázaný stav vady (regex) | null]
const PODVRHY = [
	['P1 Barometr: obraz bez místa a vzduchu (vada až mimo 0 m)', 'Barometr',
		"g('baro-mobil').innerHTML = `<strong>${MISTA[i]}</strong>: tlak",
		"g('baro-mobil').innerHTML = `Tlak",
		/NUTNÝ popisek .*„hřebeny Alp“/, /„hřebeny Alp“.*\{stav:[^}]*výchozí/],
	['P2 Seznamy: délka bez data-popisek (krátký token)', 'Seznamy',
		'delkaMobil.dataset.popisek = delkaMobil.textContent;', '',
		/NUTNÝ popisek .*„4“/, null],
	['P3 Barometr: písmo potomka obrazu 10 px', 'Barometr',
		'`<strong>${MISTA[i]}</strong>: tlak', '`<strong style="font-size:10px">${MISTA[i]}</strong>: tlak',
		/HTML obraz \[baro-mobil\] má písmo 10\.0 px/, null],
	['P4 Elektromotor: šipka F viditelná i v režimu motor', 'Elektromotor',
		"g('emo-sila-sipka').setAttribute('visibility', s.F > 0 ? 'inherit' : 'hidden');",
		"g('emo-sila-sipka').setAttribute('visibility', s.F > 0 ? 'visible' : 'hidden');",
		/NUTNÝ popisek .*„F“.*\{stav: klik .*motor/, null],
];

const spust = (argy) => spawnSync(process.execPath, [MERIDLO, '--detail', ...argy], { encoding: 'utf8', cwd: REPO, maxBuffer: 1 << 26 });
let vad = 0;

// směr 1: zdravé komponenty
const zdrave = spust(DAVKA1);
const radkyZdrave = (zdrave.stdout.match(/^\| \w+Simulace \|.*$/gm) || []);
const vsechnyVyhovuji = radkyZdrave.length === DAVKA1.length && radkyZdrave.every((r) => r.endsWith('| vyhovuje |'));
console.log(`${zdrave.status === 0 && vsechnyVyhovuji ? '✅' : '❌'} ZDRAVÉ: ${radkyZdrave.length}/${DAVKA1.length} komponent dávky 1 změřeno, exit ${zdrave.status}`);
if (!(zdrave.status === 0 && vsechnyVyhovuji)) { vad++; console.log(zdrave.stdout.slice(0, 3000)); }

// směr 2: podvrhy
for (const [popis, komp, hledat, nahrada, ocekavam, zakazano] of PODVRHY) {
	const zdroj = readFileSync(join(KOMP, `${komp}Simulace.astro`), 'utf8');
	if (!zdroj.includes(hledat)) { console.log(`❌ ${popis}: podvrh NEŠEL zavést (řetězec v komponentě chybí — aktualizuj podvrh)`); vad++; continue; }
	const kopie = join(WORKDIR, `${komp}Simulace.astro`);
	writeFileSync(kopie, zdroj.replace(hledat, nahrada));
	const v = spust([`--soubor=${kopie}`]);
	const out = v.stdout + v.stderr;
	const dobre = v.status === 1 && ocekavam.test(out) && !(zakazano && zakazano.test(out));
	console.log(`${dobre ? '✅' : '❌'} ${popis}: exit ${v.status}${ocekavam.test(out) ? ', očekávaná hláška nalezena' : ', OČEKÁVANÁ HLÁŠKA CHYBÍ'}${zakazano && zakazano.test(out) ? ', VADA HLÁŠENA I VE VÝCHOZÍM STAVU' : ''}`);
	const vada = out.split('\n').find((r) => ocekavam.test(r));
	if (vada) console.log('   ' + vada.trim().slice(0, 200));
	if (!dobre) vad++;
}
console.log(vad ? `\n❌ Měřidlo má ${vad} díru/y.` : `\n✅ Měřidlo: zdravé projdou, všech ${PODVRHY.length} podvrhů odhaleno.`);
process.exit(vad ? 1 : 0);

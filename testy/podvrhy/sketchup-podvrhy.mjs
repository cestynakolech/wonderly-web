#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/sketchup.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy nepravda, kterou by dítě z obrázku vyčetlo — musí test SHODIT.
// Spuštění:  node testy/podvrhy/sketchup-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/SketchupSimulace.astro');
const TEST = join(REPO, 'testy/simulace/sketchup.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'sketchup-podvrh-'));
const KOPIE = join(WORKDIR, 'sketchup-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['plocha bez výšky prý taky má objem',
		(s) => s.replace("'obsah S = ' + a + ' · ' + b + ' = ' + v.obsah + ' m², objem žádný',",
			"'obsah S = ' + a + ' · ' + b + ' = ' + v.obsah + ' m², objem ' + v.obsah + ' m³',")],
	['obdélník má prý osm vrcholů jako kvádr',
		(s) => s.replace('vrcholu: teleso ? 8 : 4,', 'vrcholu: 8,')],
	['objem se počítá sčítáním místo násobení',
		(s) => s.replace('objem: a * b * c,', 'objem: a * b + c,')],
	['obsah plochy se počítá jako obvod',
		(s) => s.replace('obsah: a * b,', 'obsah: 2 * (a + b),')],
	['tělesem je scéna prý už při nulové výšce',
		(s) => s.replace('const teleso = c > 0;', 'const teleso = c >= 0;')],
	['kvádr je průhledný — kreslí se i stěny, které kamera nevidí',
		(s) => s.replace('if (kKamere > 0) vidno.push', 'if (kKamere > -99) vidno.push')],
	['vytažení do výšky prý roztáhne i půdorys',
		(s) => s.replace('const px = a / 2, py = b / 2;', 'const px = a / 2 + c, py = b / 2;')],
	['mřížka nekreslí čtverce po metru, ale po dvou',
		(s) => s.replace('for (let i = 1; i < a; i++) {', 'for (let i = 2; i < a; i += 2) {')],
	['svislá hrana se nedělí na metrové vrstvy',
		(s) => s.replace('for (let k = 1; k < c; k++) {', 'for (let k = 1; k < 1; k++) {')],
	['štítek výšky ukazuje místo výšky šířku',
		(s) => s.replace("if (c > 0) hrana(1, 5, c, '#1971c2', 'výška');", "if (c > 0) hrana(1, 5, a, '#1971c2', 'výška');")],
	['štítek nemá podklad — text splývá s kresbou',
		(s) => s.replace('rx="6" fill="#ffffff" stroke="', 'rx="6" fill="none" stroke="')],
	['štítek šířky má barvu svislé osy (modrou místo červené)',
		(s) => s.replace("hrana(0, 1, a, '#e03131', 'šířka');", "hrana(0, 1, a, '#1971c2', 'šířka');")],
	['modrá osa výšky se při orbitu překlápí do vodorovné roviny',
		(s) => s.replace('modra: konec(0, 0, OSY_M)', 'modra: konec(0, OSY_M, 0)')],
	['tlačítko slibuje 3 m, ale vytáhne jinam',
		(s) => s.replace('const TAH_TLACITKO = 3;', 'const TAH_TLACITKO = 4;')],
	['orbit otáčí o jiný úhel, než má na tlačítku',
		(s) => s.replace('ORBIT_KROK = 45;', 'ORBIT_KROK = 40;')],
	['výška se do obrázku vůbec nepromítne (těleso vypadá jako plocha)',
		(s) => s.replace('y: Math.round(STRED_Y - (z * Math.cos(e) + Y * Math.sin(e)) * MERITKO),',
			'y: Math.round(STRED_Y - (Y * Math.sin(e)) * MERITKO),')],
	['pět vrstev se skloňuje jako „5 vrstvy"',
		(s) => s.replace('if (n < 5) return n', 'if (n < 9) return n')],
	['plaketa vydává objem za povrch',
		(s) => s.replace("'objem V = ' + a", "'povrch S = ' + a")],
	['vybraná plocha není modrá — nepozná se, že je vybraná',
		(s) => s.replace('fill="#74c0fc"', 'fill="#f1f3f5"')],
	['rysky po metru se kreslí na nejvzdálenější hraně, ne na nejbližší',
		(s) => s.replace('if (v[i].hloubka < v[nej].hloubka) nej = i;', 'if (v[i].hloubka > v[nej].hloubka) nej = i;')],
	['mřížka leží na zemi, i když je těleso vytažené',
		(s) => s.replace('const p = promitni(-a / 2 + i, -b / 2, c, uhel), q = promitni(-a / 2 + i, b / 2, c, uhel);',
			'const p = promitni(-a / 2 + i, -b / 2, 0, uhel), q = promitni(-a / 2 + i, b / 2, 0, uhel);')],
	['výsledek pod scénou tvrdí jiný počet vrstev, než kolik je metrů',
		(s) => s.replace("+ vrstvy(c) + ' po '", "+ vrstvy(c + 1) + ' po '")],
	['orbit se nevrací do rozsahu 0–359° (úhel roste bez konce)',
		(s) => s.replace("so.value = String((+so.value + ORBIT_KROK) % 360);", "so.value = String(+so.value + ORBIT_KROK);")],
	['měřítko scény je jiné, než s jakým jsou spočítané rozestupy štítků',
		(s) => s.replace('MERITKO = 30,', 'MERITKO = 34,')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const kontrol = (zdravy.stdout.match(/✅/g) ?? []).length;
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${kontrol} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) {
	console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n'));
	process.exit(1);
}

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const padle = (v.stdout.match(/^❌ .*/gm) ?? []);
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${padle.length} kontrol spadlo): ${nazev}\n     ↳ ${padle[0]?.slice(0, 110) ?? v.stderr.split('\n')[0]}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);

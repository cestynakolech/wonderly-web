#!/usr/bin/env node
// MUTAČNÍ TEST: je test simulace opravdu k něčemu, nebo jen svítí zeleně?
//
// Proč existuje: „0 chyb" nic neznamená, dokud se neví, že by test chybu POZNAL.
// Přesně tak se v tomhle projektu už našly mrtvé aserty (`ok(6 + 6 === 12, …)`),
// tautologie (`ok(a !== b || true, …)`) a test, který si načetl hodnotu z displeje
// a pak ji vůbec nepoužil — podvrh se 7× větším proudem jím prošel.
//
// Jak to funguje: do ZDROJE komponenty se zavede drobná chyba (mutace), spustí se
// její test a čeká se, že SPADNE. Mutace, po které test dál hlásí ✅, je díra:
// tu část chování nikdo nekontroluje. Zdroj se vždy vrátí do původního stavu.
//
// Spuštění:  node testy/mutace.mjs [část-názvu-testu]
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');

function komponentaK(soubor) {
	const jmeno = soubor
		.replace(/\.mjs$/, '')
		.split('-')
		.map((c) => c[0].toUpperCase() + c.slice(1))
		.join('');
	const cesta = join(koren, 'src', 'components', 'skola2', jmeno + 'Simulace.astro');
	return existsSync(cesta) ? cesta : null;
}

/**
 * Obecné mutace, které dávají smysl skoro v každé simulaci.
 *
 * ⚠️ První verze tohoto nástroje (2. 8. 2026) měnila jen PRVNÍ výskyt každého vzoru —
 * a hned se ukázalo, jak zavádějící to je: u `elektrovani` padl první `x * y` do
 * výpočtu SVG polohy pravítka, tedy do čistě vizuálního detailu, který test právem
 * nekontroluje. Nástroj proto hlásil „1/5 odhaleno" a nezměnil se ani poté, co do
 * testu přibylo šest nových kontrol Coulombova zákona. Měřidlo, které měří náhodné
 * místo v souboru, je horší než žádné.
 *
 * Nově se mutuje až VZORKU výskytů každého vzoru a u těch, které projdou, se vypisuje
 * kus kódu — teprve to je použitelná informace o tom, co se nekontroluje.
 */
const VZORKU = 5;

const MUTACE = [
	{ nazev: 'sčítání → odčítání', hledat: /(\w)\s\+\s(\w)/g, nahradit: (m, a, b) => `${a} - ${b}` },
	{ nazev: 'násobení → dělení', hledat: /(\w)\s\*\s(\w)/g, nahradit: (m, a, b) => `${a} / ${b}` },
	{ nazev: 'porovnání > → >=', hledat: /([)\w])\s>\s([\w(])/g, nahradit: (m, a, b) => `${a} >= ${b}` },
	{ nazev: 'obrácená podmínka ===', hledat: /([)\w])\s===\s([\w'"(])/g, nahradit: (m, a, b) => `${a} !== ${b}` },
	{ nazev: 'konstanta o 1 větší', hledat: /=\s(\d+)([,;)\s])/g, nahradit: (m, c, k) => `= ${Number(c) + 1}${k}` },
	{ nazev: 'desetinná konstanta ×10', hledat: /(\d)\.(\d+)/g, nahradit: (m, a, b) => `${a}${b}.0` },
];

const filtr = process.argv[2] ?? '';
const testy = readdirSync(join(koren, 'testy', 'simulace'))
	.filter((f) => f.endsWith('.mjs') && f.includes(filtr))
	.sort();

let dirCelkem = 0;
let mutaciCelkem = 0;

for (const test of testy) {
	const komponenta = komponentaK(test);
	if (!komponenta) {
		console.log(`⚠️  ${test}: komponenta nenalezena, přeskakuji`);
		continue;
	}
	const puvodni = readFileSync(komponenta, 'utf8');
	const skript = puvodni.match(/<script>([\s\S]*?)<\/script>/);
	if (!skript) {
		console.log(`⚠️  ${test}: komponenta nemá <script>, přeskakuji`);
		continue;
	}

	const puvodniSkript = skript[1];
	const diry = [];
	const zaseknute = [];
	let pouzito = 0;
	try {
		for (const m of MUTACE) {
			// mutuje se jen uvnitř <script>, ne v HTML/CSS části komponenty
			const vyskyty = [...puvodniSkript.matchAll(m.hledat)];
			if (!vyskyty.length) continue;
			// rovnoměrný vzorek napříč souborem — ne jen začátek, kde bývá kreslení
			const krok = Math.max(1, Math.floor(vyskyty.length / VZORKU));
			const vybrane = vyskyty.filter((_, i) => i % krok === 0).slice(0, VZORKU);

			for (const v of vybrane) {
				const zmeneny =
					puvodniSkript.slice(0, v.index) +
					m.nahradit(v[0], v[1], v[2]) +
					puvodniSkript.slice(v.index + v[0].length);
				pouzito++;
				writeFileSync(komponenta, puvodni.replace(puvodniSkript, zmeneny));
				// Timeout doplněn 13. 8. 2026: mutace `-5 * sul` → `-5 / sul` dala při
				// nule −Infinity, test se na tom zacyklil a nástroj běžel bez konce.
				// Horší než ztracený čas: zdroj zůstal MEZI mutacemi, tedy vadný —
				// obnova ve `finally` se ke slovu vůbec nedostane, když se čeká věčně.
				const beh = spawnSync('node', [join(koren, 'testy', 'simulace', test), komponenta], {
					encoding: 'utf8',
					timeout: 60_000,
				});
				// Zaseknutý test není odhalená mutace: nic netvrdí, jen se nedopočítal.
				// Hlásí se zvlášť, ať se to nedá splést s poctivým pádem.
				if (beh.error?.code === 'ETIMEDOUT' || beh.signal === 'SIGTERM') {
					const okoli = puvodniSkript.slice(Math.max(0, v.index - 30), v.index + v[0].length + 20);
					zaseknute.push(`${m.nazev} v „…${okoli.replace(/\s+/g, ' ').trim()}…"`);
					continue;
				}
				// test MÁ spadnout (kód ≠ 0). Když projde, tuhle změnu nikdo nehlídá.
				if (beh.status === 0) {
					const okoli = puvodniSkript.slice(Math.max(0, v.index - 30), v.index + v[0].length + 20);
					diry.push(`${m.nazev} v „…${okoli.replace(/\s+/g, ' ').trim()}…"`);
				}
			}
		}
	} finally {
		writeFileSync(komponenta, puvodni); // zdroj se vrací VŽDY, i po chybě
	}

	mutaciCelkem += pouzito;
	dirCelkem += diry.length;
	const znak = diry.length === 0 ? '✅' : '⚠️ ';
	console.log(`${znak} ${test.padEnd(20)} ${pouzito - diry.length - zaseknute.length}/${pouzito} mutací odhaleno`
		+ (zaseknute.length ? ` (${zaseknute.length} se zaseklo)` : ''));
	for (const d of diry) console.log(`      ✗ neodhaleno: ${d}`);
	for (const z of zaseknute) {
		console.log(`      ⏱  test se na téhle mutaci ZASEKL (60 s bez konce), nedopočítal se: ${z}`);
		console.log('         Měřidlo se musí ubránit i nesmyslné hodnotě — oprav smyčku v testu, ať má strop.');
	}
}

console.log(
	`\nCelkem ${mutaciCelkem} mutací, ${mutaciCelkem - dirCelkem} odhaleno, ` +
		`${dirCelkem} prošlo bez povšimnutí.`,
);
process.exit(dirCelkem === 0 ? 0 : 1);

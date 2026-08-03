#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/funkce-tabulky.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá
// (git checkout nad necommitnutou prací už jednou stál celou dávku oprav).
//
// Každá mutace je skutečný nález kontrolora: 8 z 2. 8. 2026 (texty vzorců),
// 5 z 3. 8. (přístupnost a chybové kódy) a 11 z druhého kola (naučné texty).
// Spuštění:  node testy/podvrhy/funkce-tabulky-podvrhy.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/FunkceTabulkySimulace.astro');
const TEST = join(REPO, 'testy/simulace/funkce-tabulky.mjs');
const KOPIE = join(tmpdir(), 'funkce-tabulky-podvrh.astro');

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['mez v hlavičce sloupce C (4 → 3)', (s) => s.replace('=KDYŽ(B2&lt;=4;', '=KDYŽ(B2&lt;=3;')],
	['popisek MIN přepsaný na „nejhorší"', (s) => s.replace('u známek ta <strong>nejlepší</strong>', 'u známek ta <strong>nejhorší</strong>')],
	['rozsah B2:B7 → B2:B8 v šabloně', (s) => s.replace('=PRŮMĚR(B2:B7)', '=PRŮMĚR(B2:B8)')],
	['anglická čárka místo středníku', (s) => s.replace('=KDYŽ(B2&lt;=4;"prospěl";"neprospěl")', '=KDYŽ(B2&lt;=4,"prospěl","neprospěl")')],
	['=PRUMER bez háčků', (s) => s.replace('=PRŮMĚR(B2:B7)', '=PRUMER(B2:B7)')],
	['smyšlený chybový kód', (s) => s.replace("'#DĚLENÍ_NULOU!'", "'#CHYBA_DĚLENÍ!'")],
	['prohozené popisky přepínače', (s) => s.replace('>od nejmenší (;1)<', '>ZAMENA1<').replace('>od největší (bez údaje)<', '>od nejmenší (;1)<').replace('>ZAMENA1<', '>od největší (bez údaje)<')],
	['rozsah v RANK ($B$2:$B$7 → $B$2:$B$8)', (s) => s.replace("'=RANK(B2;$B$2:$B$7;1)'", "'=RANK(B2;$B$2:$B$8;1)'")],
	// —— druhá dávka: nálezy opravené 3. 8. 2026, každý musí mít svou kontrolu ——
	['jeden #N/A zpět na #HODNOTA! (RANK plete dva kódy)', (s) => s.replace('return KODY.neniK;', 'return KODY.hodnota;')],
	['scope zmizel z řádkových záhlaví', (s) => s.replace(/ scope="row"/g, '')],
	['aria-label zpět v 1. pádě (GENITIV → JMENA)', (s) => s.replace('známka ${GENITIV[i]}', 'známka ${JMENA[i]}')],
	['šrafa prázdné buňky zase bledá (#dee2e6)', (s) => s.replace(/#868e96/g, '#dee2e6')],
	['poznámka „kopírováno dolů" smazaná', (s) => s.replace(' <span class="fn-kopie">(kopírováno dolů do všech řádků)</span>', '')],
	// —— třetí dávka: nepravdy v NAUČNÝCH TEXTECH (11 z nich prošlo testu z 3. 8. ráno) ——
	['popisek SUMA: „sečte všechny buňky"', (s) => s.replace('>sečte jen čísla<', '>sečte všechny buňky<')],
	['popisek POČET: „kolik je vyplněných buněk"', (s) => s.replace('>kolik buněk obsahuje číslo<', '>kolik je vyplněných buněk<')],
	['hláška: text je MENŠÍ než každé číslo (opak Excelu)', (s) => s.replace('text je v porovnání větší než každé číslo', 'text je v porovnání menší než každé číslo')],
	['hláška: MIN a MAX prý hlásí chybu', (s) => s.replace('MIN a MAX přitom klidně vypíšou nulu, i když žádná známka není.', 'MIN a MAX přitom taky hlásí chybu, protože žádná známka není.')],
	['průměr v hlášce zase napevno („20 ÷ 6")', (s) => s.replace('a průměr vyjde <strong>${cz(SUMA(bunky))} ÷ ${cz(pocet)} = ${cz(PRUMER(bunky))}</strong>. `', 'a průměr vyjde <strong>20 ÷ 6 = 3</strong>. `')],
	['poznámka RANK jmenuje jiného žáka', (s) => s.replace('kolikátý je Adam mezi ostatními', 'kolikátý je Filip mezi ostatními')],
	['nápověda lže o pořadí kroků kolečka', (s) => s.replace('1 → 2 → 3 → 4 → 5 → nehodnocen → prázdná → 1', '1 → 2 → 3 → 4 → 5 → prázdná → nehodnocen → 1')],
	['hlavička: vzorec prý platí jen pro řádek 2', (s) => s.replace('(kopírováno dolů do všech řádků)', '(platí jen pro řádek 2)')],
	['úvod posílá sledovat SUMU a MAX', (s) => s.replace('<strong>POČET</strong> a <strong>PRŮMĚR</strong>', '<strong>SUMU</strong> a <strong>MAX</strong>')],
	['nadpis slibuje něco jiného (grafy)', (s) => s.replace('Proč Excelu vychází jiný průměr než tobě 🧮', 'Jak si v Excelu nakreslíš graf 🧮')],
	['mřížka tabulky téměř neviditelná (#f8f9fa)', (s) => s.replace('border: 2px solid #868e96', 'border: 2px solid #f8f9fa')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const pocet = (zdravy.stdout.match(/všech (\d+) kontrol/) ?? [])[1];
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${pocet} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) { console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n')); process.exit(1); }

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const padlo = (v.stdout.match(/^❌ ★?.*/gm) ?? []).filter((r) => !r.startsWith('❌ ') || true);
	const kolik = (v.stdout.match(/^❌ /gm) ?? []).length;
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${kolik} kontrol spadlo): ${nazev}\n     ↳ ${padlo[0]?.slice(0, 110) ?? v.stderr.split('\n')[0]}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);

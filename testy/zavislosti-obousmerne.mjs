// Obousměrné ověření měřidla testy/zavislosti.mjs.
//
// Měřidlo, které jen ukazuje číslo, nic neměří. Proto se tady dokládají OBA směry:
//   (1) PODVRH najde — nasazený nedeklarovaný balíček ohlásí jako CHYBU
//   (2) nad ZDRAVÝMI daty mlčí — správně deklarovaný balíček neohlásí nijak
//
// Podvrh není vymyšlený: je to přesná rekonstrukce toho, co 24. 8. 2026 na pět dní
// zastavilo nasazování webu — soubor importoval `pdfkit`, který nebyl ani
// v package.json, ani v package-lock.json.
//
// Spuštění: node testy/zavislosti-obousmerne.mjs

import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { zkontrolujZavislosti } from './zavislosti.mjs';

let kontrol = 0;
let chyb = 0;
function tvrdi(popis, podminka) {
	kontrol++;
	if (podminka) {
		console.log(`  ✓ ${popis}`);
	} else {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
}

// Postaví dočasný projekt: co je v package.json, co v zámku, co se importuje.
function postavProjekt({ deklarovane = {}, vZamku = [], importuje }) {
	const koren = mkdtempSync(join(tmpdir(), 'zavislosti-'));
	writeFileSync(
		join(koren, 'package.json'),
		JSON.stringify({ name: 'zkouska', dependencies: deklarovane }),
	);
	writeFileSync(
		join(koren, 'package-lock.json'),
		JSON.stringify({ packages: Object.fromEntries(vZamku.map((b) => [`node_modules/${b}`, {}])) }),
	);
	mkdirSync(join(koren, 'src'));
	writeFileSync(
		join(koren, 'src', 'stranka.ts'),
		`import neco from '${importuje}';\nexport const x = neco;\n`,
	);
	return koren;
}

const uklid = [];
function zkus(nastaveni) {
	const koren = postavProjekt(nastaveni);
	uklid.push(koren);
	return zkontrolujZavislosti(koren);
}

console.log('PODVRH — měřidlo musí najít:');

// 1) Přesná rekonstrukce havárie z 24. 8.: ani v package.json, ani v zámku.
const havarie = zkus({ deklarovane: {}, vZamku: [], importuje: 'pdfkit' });
tvrdi(
	'nedeklarovaný balíček mimo zámek (pdfkit) je CHYBA, ne jen varování',
	havarie.chyby.length === 1 && havarie.chyby[0].includes('pdfkit'),
);
tvrdi('chybová hláška říká, že build spadne na čistém stroji', havarie.chyby[0]?.includes('BUILD TAM SPADNE'));
tvrdi('hláška ukazuje soubor, kde se import bere', havarie.chyby[0]?.includes('src/stranka.ts'));

// 2) Nedeklarovaný, ale v zámku jako cizí podzávislost → varování, ne chyba.
//    Dnešní skutečný případ v projektu: esbuild.
const podzavislost = zkus({ deklarovane: {}, vZamku: ['esbuild'], importuje: 'esbuild' });
tvrdi('nedeklarovaný, ale v zámku → VAROVÁNÍ, ne chyba', podzavislost.chyby.length === 0 && podzavislost.varovani.length === 1);

// 3) Podadresa balíčku se počítá pod jeho jméno.
const podcesta = zkus({ deklarovane: {}, vZamku: [], importuje: 'pdfkit/js/mixins/text' });
tvrdi("podcesta 'pdfkit/js/…' se pozná jako balíček pdfkit", podcesta.chyby.some((c) => c.includes("'pdfkit'")));

// 4) Balíček se jmennou předponou (@scope/nazev).
const scoped = zkus({ deklarovane: {}, vZamku: [], importuje: '@sentry/node/esm' });
tvrdi("balíček s předponou '@sentry/node' se pozná celý", scoped.chyby.some((c) => c.includes("'@sentry/node'")));

console.log('ZDRAVÁ DATA — měřidlo musí mlčet:');

// 5) Řádně deklarovaný balíček.
const zdravy = zkus({ deklarovane: { pdfkit: '^0.15.0' }, vZamku: ['pdfkit'], importuje: 'pdfkit' });
tvrdi('deklarovaný balíček nehlásí nic', zdravy.chyby.length === 0 && zdravy.varovani.length === 0);

// 6) Vestavěné moduly Node nejsou závislosti.
for (const vestavene of ['node:fs', 'fs', 'path']) {
	const v = zkus({ deklarovane: {}, vZamku: [], importuje: vestavene });
	tvrdi(`vestavěný modul '${vestavene}' se nehlásí`, v.chyby.length === 0 && v.varovani.length === 0);
}

// 7) Virtuální moduly Astra nejsou závislosti.
const virtualni = zkus({ deklarovane: {}, vZamku: [], importuje: 'astro:content' });
tvrdi("virtuální modul 'astro:content' se nehlásí", virtualni.chyby.length === 0);

// 8) Relativní import není balíček.
const relativni = zkus({ deklarovane: {}, vZamku: [], importuje: '../data/temata' });
tvrdi('relativní import se nehlásí', relativni.chyby.length === 0 && relativni.varovani.length === 0);

// 9) REGRESE: příklad importu v KOMENTÁŘI se nesmí počítat.
//    První běh měřidla 29. 8. nahlásil balíček 'y' z ukázky v komentáři vlastní hlavičky.
{
	const koren = postavProjekt({ deklarovane: {}, vZamku: [], importuje: 'pdfkit' });
	uklid.push(koren);
	writeFileSync(
		join(koren, 'src', 'stranka.ts'),
		"// import x from 'vymysleny-balicek';\n/* import y from 'druhy-vymysleny'; */\nexport const x = 1;\n",
	);
	const v = zkontrolujZavislosti(koren);
	tvrdi('import v komentáři NEVYVOLÁ falešný poplach', v.chyby.length === 0 && v.varovani.length === 0);
}

for (const k of uklid) rmSync(k, { recursive: true, force: true });

console.log(
	chyb === 0
		? `✅ zavislosti.mjs — obousměrně ověřeno, ${kontrol} kontrol.`
		: `❌ ${chyb} z ${kontrol} kontrol selhalo.`,
);
process.exit(chyb === 0 ? 0 : 1);

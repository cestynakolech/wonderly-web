// Kontrola závislostí — hlídá, že každý importovaný balíček je opravdu deklarovaný.
//
// PROČ EXISTUJE (29. 8. 2026): pět dní se nenasazoval web. Agent si 24. 8.
// nainstaloval `pdfkit`, napsal endpoint, který ho importuje, a commitl kód —
// ale závislost nezapsal do package.json. Na Macu build procházel dál (balíček
// fyzicky ležel v node_modules), Cloudflare ale instaluje striktně podle zámku
// (`npm clean-install`), takže tam chyběl a každý build padl na:
//     [vite]: Rollup failed to resolve import "pdfkit"
// Brána mezitím hlásila „✅ Vše zapojené správně" — kontrolovala obsah, ne to,
// jestli se projekt vůbec dá postavit jinde než na tomhle Macu.
//
// DVĚ ÚROVNĚ, protože nejsou stejně vážné:
//   CHYBA    balíček není v package.json ANI v package-lock.json
//            → na čistém stroji se neinstaluje vůbec, build TAM SPADNE. Přesně pdfkit.
//   VAROVÁNÍ balíček není v package.json, ale v zámku je jako cizí podzávislost
//            → dnes funguje jen náhodou (npm ho vytáhne nahoru), zmizí ve chvíli,
//              kdy ho jeho vlastník přestane potřebovat. Dnes takový je `esbuild`.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { builtinModules } from 'node:module';

const PRIPONY = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.cjs']);
const PRESKOCIT = new Set(['node_modules', 'dist', '.git', '.astro', '.wrangler']);
const VESTAVENE = new Set(builtinModules);

// import x from 'y' · import 'y' · export … from 'y' · import('y') · require('y')
const VZORY = [
	/(?:^|\n)\s*import\s+[^;'"]*?\bfrom\s*['"]([^'"]+)['"]/g,
	/(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g,
	/(?:^|\n)\s*export\s+[^;'"]*?\bfrom\s*['"]([^'"]+)['"]/g,
	/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
	/\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
];

// Odstraní blokové komentáře a celořádkové `//`. Konzervativně: `//` uvnitř řetězce
// (např. v URL) se nesmí splést s komentářem, proto jen řádky, které komentářem ZAČÍNAJÍ.
function bezKomentaru(text) {
	return text
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.split('\n')
		.filter((r) => !/^\s*\/\//.test(r))
		.join('\n');
}

function projdi(adresar, sesbirane) {
	if (!existsSync(adresar)) return sesbirane;
	for (const polozka of readdirSync(adresar)) {
		if (PRESKOCIT.has(polozka)) continue;
		const cesta = join(adresar, polozka);
		if (statSync(cesta).isDirectory()) projdi(cesta, sesbirane);
		else if (PRIPONY.has(extname(polozka))) sesbirane.push(cesta);
	}
	return sesbirane;
}

// 'lodash/fp' → 'lodash' · '@scope/balik/kus' → '@scope/balik'
function nazevBalicku(specifikator) {
	const casti = specifikator.split('/');
	return specifikator.startsWith('@') ? casti.slice(0, 2).join('/') : casti[0];
}

function jeVlastni(specifikator) {
	return (
		specifikator.startsWith('.') ||        // relativní
		specifikator.startsWith('/') ||        // absolutní
		specifikator.startsWith('node:') ||    // vestavěné s předponou
		specifikator.startsWith('astro:') ||   // virtuální moduly Astra
		specifikator.startsWith('virtual:') ||
		VESTAVENE.has(nazevBalicku(specifikator))
	);
}

export function zkontrolujZavislosti(koren) {
	const chyby = [];
	const varovani = [];

	const balicek = JSON.parse(readFileSync(join(koren, 'package.json'), 'utf8'));
	const deklarovane = new Set([
		...Object.keys(balicek.dependencies ?? {}),
		...Object.keys(balicek.devDependencies ?? {}),
		...Object.keys(balicek.optionalDependencies ?? {}),
		...Object.keys(balicek.peerDependencies ?? {}),
	]);

	// Co se na čistém stroji opravdu nainstaluje: obsah zámku.
	const cestaZamku = join(koren, 'package-lock.json');
	const vZamku = new Set();
	if (existsSync(cestaZamku)) {
		const zamek = JSON.parse(readFileSync(cestaZamku, 'utf8'));
		for (const klic of Object.keys(zamek.packages ?? {})) {
			const i = klic.lastIndexOf('node_modules/');
			if (i !== -1) vZamku.add(klic.slice(i + 'node_modules/'.length));
		}
	}

	// Prohledáváme jen to, co se opravdu spouští při buildu a nasazení.
	const soubory = [
		...projdi(join(koren, 'src'), []),
		...projdi(join(koren, 'testy'), []),
		...(existsSync(join(koren, 'worker.js')) ? [join(koren, 'worker.js')] : []),
		...readdirSync(koren)
			.filter((f) => extname(f) === '.mjs')
			.map((f) => join(koren, f)),
	];

	const kdeSeBere = new Map(); // balíček → soubory, které ho importují
	for (const soubor of soubory) {
		// Komentáře pryč PŘED hledáním — jinak měřidlo najde vlastní příklady v komentáři.
		// (Doloženo: první běh nahlásil balíček 'y' z ukázky `import x from 'y'` v hlavičce
		// tohohle souboru. Falešný poplach je stejná vada jako přehlédnutý nález.)
		const text = bezKomentaru(readFileSync(soubor, 'utf8'));
		for (const vzor of VZORY) {
			vzor.lastIndex = 0;
			let m;
			while ((m = vzor.exec(text)) !== null) {
				const spec = m[1];
				if (jeVlastni(spec)) continue;
				const nazev = nazevBalicku(spec);
				if (!kdeSeBere.has(nazev)) kdeSeBere.set(nazev, new Set());
				kdeSeBere.get(nazev).add(soubor.replace(`${koren}/`, ''));
			}
		}
	}

	for (const [nazev, soubory] of [...kdeSeBere].sort()) {
		if (deklarovane.has(nazev)) continue;
		const kde = [...soubory].slice(0, 3).join(', ');
		const dalsi = soubory.size > 3 ? ` (+${soubory.size - 3} dalších)` : '';
		if (vZamku.has(nazev)) {
			varovani.push(
				`balíček '${nazev}' se importuje (${kde}${dalsi}), ale NENÍ v package.json — ` +
					`dnes se nainstaluje jen jako cizí podzávislost a může kdykoli zmizet: npm install ${nazev} --save`,
			);
		} else {
			chyby.push(
				`balíček '${nazev}' se importuje (${kde}${dalsi}), ale NENÍ v package.json ANI v package-lock.json — ` +
					`na čistém stroji (Cloudflare) se vůbec nenainstaluje a BUILD TAM SPADNE: npm install ${nazev} --save`,
			);
		}
	}

	return {
		chyby,
		varovani,
		souhrn: `Závislosti: ${soubory.length} souborů, ${kdeSeBere.size} importovaných balíčků — ${chyby.length} chyb, ${varovani.length} varování.`,
	};
}

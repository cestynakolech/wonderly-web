// Načtení SKUTEČNÝCH dat webu pro kontrolní skripty.
//
// Proč to existuje: do 31. 7. 2026 četly všechny kontroly TypeScript regulárními výrazy
// nad textem souboru — a tiše se pletly. `zkontroluj.mjs` hlásil 2084 otázek, ve
// skutečnosti jich je 2426 (14 bloků shrnutí se skládá programově, takže je žádný
// regex nevidí). `nazornost.mjs` hledal `druh: 'obrazek'`, který v datech není ani
// jednou — správně je 'infografika' — takže infografiky nikdy nepočítal a hlásil
// falešné mezery. A blok `elektrina` má v temata.ts o tabulátor jiné odsazení, takže
// naivní vzor `^\t{5}slug:` napočítal 22 podtémat místo 37.
//
// Řešení: data se přeloží esbuildem a NAIMPORTUJÍ jako objekty. Trvá to ~100 ms
// a kontroluje se tím přesně to, co uvidí web. esbuild je součástí Astro instalace.
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');

async function nactiModul(relativniCesta, docasny) {
	const vystup = join(docasny, relativniCesta.replace(/[\/]/g, '_') + '.mjs');
	await build({
		entryPoints: [join(koren, relativniCesta)],
		bundle: true,
		format: 'esm',
		outfile: vystup,
		logLevel: 'silent',
		platform: 'node',
	});
	return import(pathToFileURL(vystup).href);
}

/**
 * Vrátí skutečná data webu: { kvizy, temata, predmety }.
 * Kvízy jsou objekt klíč → pole otázek (VČETNĚ souhrnných, které se skládají programově).
 */
export async function nactiData() {
	const docasny = mkdtempSync(join(tmpdir(), 'wonderly-kontrola-'));
	try {
		const [k, t, p] = await Promise.all([
			nactiModul('src/data/kvizy.ts', docasny),
			nactiModul('src/data/temata.ts', docasny),
			nactiModul('src/data/predmety.ts', docasny).catch(() => ({})),
		]);
		return {
			kvizy: k.kvizy ?? k.default ?? {},
			temata: t.temata ?? t.default ?? {},
			predmety: p.predmety ?? p.default ?? null,
		};
	} finally {
		rmSync(docasny, { recursive: true, force: true });
	}
}

/**
 * Místa cestovatelského deníku pro daný rok — SKUTEČNÁ data, ne regex nad textem.
 *
 * Používá `vyber_fotky_na_web.py` (Omega): fotka se smí nahrát jen do galerie,
 * která v datech opravdu existuje. Bez toho by se nahrála „do prázdna“ — soubor
 * by v úložišti byl, ale žádná stránka by ho nezobrazila a nikdo by si toho
 * nevšiml. Vrací [{ slug, nazev, galerie, datum }].
 */
export async function nactiCesty(rok) {
	const docasny = mkdtempSync(join(tmpdir(), 'wonderly-cesty-'));
	try {
		const m = await nactiModul(`src/data/cesty/${rok}.ts`, docasny);
		const data = m[`rok${rok}`] ?? m.default ?? {};
		return (data.mesta ?? []).map(({ slug, nazev, galerie, datum }) => ({ slug, nazev, galerie, datum }));
	} finally {
		rmSync(docasny, { recursive: true, force: true });
	}
}

/** Všechna podtémata napříč ročníky jako plochý seznam. */
export function vsechnaPodtemata(temata) {
	const ven = [];
	for (const [rocnik, celky] of Object.entries(temata)) {
		for (const celek of celky ?? []) {
			for (const pod of celek.podtemata ?? []) {
				ven.push({ rocnik, celek: celek.slug, ...pod, klic: `${rocnik}/${celek.slug}/${pod.slug}` });
			}
		}
	}
	return ven;
}

/**
 * Slovník povolených hodnot `druh` u materiálů — a hlavně rozhodnutí, jestli se
 * daný druh počítá do NÁZORNOSTI stránky.
 *
 * Proč slovník existuje: hodnota, kterou `nazornost()` nezná, se dosud tiše
 * ignorovala. Přesně tak vznikla falešná nula u `druh: 'obrazek'` — ta hodnota
 * v datech nebyla ani jednou (správně je 'infografika'), takže se infografiky
 * nikdy nepočítaly a měřidlo hlásilo mezery, které neexistovaly. Stejně tiše se
 * do 2. 8. 2026 ignorovalo 'pdf'. Neznámá hodnota proto nově není ticho, ale
 * TVRDÁ CHYBA brány: kdo přidá nový druh materiálu, musí se tady rozhodnout,
 * čím je — jinak se změna nesmí nasadit.
 */
export const DRUHY_MATERIALU = {
	infografika: 'obrazek',
	video: 'video',
	youtube: 'video',
	audio: 'zvuk',
	// PDF je pracovní list nebo dokument ke stažení. Je užitečné, ale stránku
	// NEDĚLÁ názornou — žák se na ně musí podívat mimo web, takže se do názornosti
	// schválně nepočítá. (Zapsáno sem právě proto, aby to bylo rozhodnutí, ne opomenutí.)
	pdf: null,
};

/** Vrátí seznam neznámých hodnot `druh` napříč daty (prázdný = vše v pořádku). */
export function neznameDruhy(temata) {
	const nalezy = [];
	for (const pod of vsechnaPodtemata(temata)) {
		for (const m of pod.materialy ?? []) {
			if (!(m.druh in DRUHY_MATERIALU)) nalezy.push({ klic: pod.klic, druh: m.druh });
		}
	}
	return nalezy;
}

/** Má podtéma nějakou názornost? (simulace, infografika nebo video) */
export function nazornost(pod) {
	const materialy = pod.materialy ?? [];
	const jeDruh = (kategorie) => materialy.some((m) => DRUHY_MATERIALU[m.druh] === kategorie);
	return {
		simulace: Boolean(pod.interakce || pod.interakce2),
		obrazek: jeDruh('obrazek'),
		video: jeDruh('video'),
		zvuk: jeDruh('zvuk'),
		odkazy: (pod.odkazy ?? []).length,
	};
}

/** Má otázka délkovou nápovědu? Tedy jde uhodnout strategií „vyber nejdelší"?
 *
 * Počítá se jen STRIKTNĚ nejdelší správná odpověď. Do 31. 7. 2026 se sem počítaly
 * i remízy (`>=`) a měřidlo tím nadhodnocovalo: otázka „Jaká je značka proudu?
 * I / U / R" má všechny odpovědi po jednom znaku, takže žákovi délka neřekne vůbec
 * nic — a přesto se vykazovala jako uhodnutelná. Nadhodnocené měřidlo je stejně
 * škodlivé jako podhodnocené: tiše určuje, na čem se pracuje.
 *
 * Remíza o nejdelší se vrací zvlášť (`remiza`), protože i ta zúží výběr ze tří
 * možností na dvě — jen mnohem slaběji než jasně nejdelší odpověď.
 */
export function maDelkovouNapovedu(otazka) {
	const delky = (otazka.odpovedi ?? []).map((o) => o.length);
	if (delky.length < 2) return false;
	return delky[0] > Math.max(...delky.slice(1));
}

/** Je správná odpověď v remíze o nejdelší (slabší nápověda než striktně nejdelší)? */
export function maRemizuODelku(otazka) {
	const delky = (otazka.odpovedi ?? []).map((o) => o.length);
	if (delky.length < 2) return false;
	const nej = Math.max(...delky.slice(1));
	return delky[0] === nej && delky.filter((d) => d === nej).length < delky.length;
}

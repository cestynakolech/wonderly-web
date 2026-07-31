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

/** Má podtéma nějakou názornost? (simulace, infografika nebo video) */
export function nazornost(pod) {
	const materialy = pod.materialy ?? [];
	return {
		simulace: Boolean(pod.interakce || pod.interakce2),
		obrazek: materialy.some((m) => m.druh === 'infografika'),
		video: materialy.some((m) => m.druh === 'video' || m.druh === 'youtube'),
		zvuk: materialy.some((m) => m.druh === 'audio'),
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

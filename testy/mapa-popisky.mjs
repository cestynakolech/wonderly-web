// Měřidlo: nepřekrývají se popisky na mapách cestovatelského deníku?
//
// Proč existuje: mapa roku umísťuje jména míst automaticky a okem se překryv pozná
// špatně — zvlášť v přiblížených pohledech, kterých je 182. Kontrola proto počítá
// obdélníky textů stejným vzorcem jako `src/data/cesty/mapa.ts` (šířka písmene
// ≈ 0,55 × velikost písma) a hledá průnik s jiným popiskem, s kroužkem položky,
// s odznakem počtu u shluku, s domečkem „domov" a s okrajem výřezu.
//
// Čte SKUTEČNÁ data (esbuild → import), ne text souboru — podle pravidla z auditu
// 31. 7. 2026. POZOR na past, do které jsem sám šlápl: `pripravPohledy` se musí
// volat se stejnými argumenty jako v `CestyRok.astro`, VČETNĚ domova. Bez něj
// měřidlo popisek domova vůbec nevidí a tiše hlásí nulu.
import { build } from 'esbuild';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');

async function nactiModul(rel, docasny) {
	const vystup = join(docasny, rel.replace(/[\/]/g, '_') + '.mjs');
	await build({
		entryPoints: [join(koren, rel)],
		bundle: true,
		format: 'esm',
		outfile: vystup,
		logLevel: 'silent',
		platform: 'node',
	});
	return import(pathToFileURL(vystup).href);
}

const ramecek = (p) => {
	const s = p.text.length * p.fs * 0.55;
	const zacatek = p.kotva === 'middle' ? p.x - s / 2 : p.kotva === 'end' ? p.x - s : p.x;
	return [zacatek, p.y - p.fs, zacatek + s, p.y + p.fs * 0.3];
};
const prekryva = (a, b) => !(a[2] <= b[0] || b[2] <= a[0] || a[3] <= b[1] || b[3] <= a[1]);
const plocha = (a, b) => {
	const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]);
	const h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
	return w > 0 && h > 0 ? w * h : 0;
};

/** Vrátí { nalezy: string[], pohledu: number } — prázdné nálezy = mapy jsou v pořádku. */
export async function zkontrolujPopiskyMap() {
	const docasny = mkdtempSync(join(tmpdir(), 'wonderly-mapa-'));
	let roky;
	let mapa;
	try {
		roky = (await nactiModul('src/data/cesty/roky.ts', docasny)).roky;
		mapa = await nactiModul('src/data/cesty/mapa.ts', docasny);
	} finally {
		rmSync(docasny, { recursive: true, force: true });
	}

	const nalezy = [];
	let pohledu = 0;

	for (const rok of roky) {
		// stejné argumenty jako CestyRok.astro — jinak se měří jiná mapa, než se kreslí
		const pohledy = mapa.pripravPohledy(
			rok.mesta,
			rok.vyrez ?? mapa.spocitejVyrez(rok.domov ? [rok.domov, ...rok.mesta] : rok.mesta),
			rok.domov,
		);
		for (const pohled of pohledy) {
			pohledu++;
			const ramecky = pohled.popisky.map((p) => ({ p, r: ramecek(p) }));
			// popisek domova (kreslí ho CestyRok.astro, polohu počítá rozmisťovač)
			if (pohled.domovPopisek) ramecky.push({ p: pohled.domovPopisek, r: ramecek(pohled.domovPopisek) });

			// Co na mapě zabírá místo. Kroužek shluku je jen OBRYS — uvnitř jsou vidět
			// tečky jednotlivých míst, takže obsazené jsou ty tečky, ne celý kotouč.
			const prekazky = [
				...pohled.body.map((b) => ({
					nazev: `tečka místa ${b.slug}`,
					id: b.slug,
					r: [b.x - pohled.pinR, b.y - pohled.pinR, b.x + pohled.pinR, b.y + pohled.pinR],
				})),
				...pohled.polozky
					.filter((q) => q.typ === 'misto')
					.map((q) => ({
						nazev: q.nazev,
						id: q.id,
						r: [q.x - q.r, q.y - q.r, q.x + q.r, q.y + q.r],
					})),
				...pohled.polozky
					.filter((q) => q.typ === 'skupina')
					.map((q) => {
						const ox = q.x + q.r * 0.72;
						const oy = q.y - q.r * 0.72;
						const orr = pohled.pinR * 0.95;
						return { nazev: `odznak u ${q.nazev}`, id: q.id, r: [ox - orr, oy - orr, ox + orr, oy + orr] };
					}),
			];
			if (pohled.rodic === null && rok.domov) {
				prekazky.push({
					nazev: `domeček ${rok.domov.nazev}`,
					id: '__domov',
					r: [
						rok.domov.x - pohled.pinR * 1.4,
						rok.domov.y - pohled.pinR * 1.5,
						rok.domov.x + pohled.pinR * 1.4,
						rok.domov.y + pohled.pinR * 1.2,
					],
				});
			}

			const v = pohled.vyrez;
			for (let i = 0; i < ramecky.length; i++) {
				const r = ramecky[i].r;
				// popisek mimo výřez by se na okraji mapy uřízl
				if (r[0] < v.x - 0.01 || r[2] > v.x + v.sirka + 0.01 || r[1] < v.y - 0.01 || r[3] > v.y + v.vyska + 0.01) {
					nalezy.push(`${rok.rok} · pohled ${pohled.id}: popisek „${ramecky[i].p.text}" přetéká z výřezu mapy`);
				}
				for (let j = i + 1; j < ramecky.length; j++) {
					if (!prekryva(r, ramecky[j].r)) continue;
					nalezy.push(
						`${rok.rok} · pohled ${pohled.id}: popisky „${ramecky[i].p.text}" a „${ramecky[j].p.text}" se překrývají ` +
							`(${plocha(r, ramecky[j].r).toFixed(1)} jednotek²)`,
					);
				}
			}
			for (const { p, r } of ramecky) {
				for (const q of prekazky) {
					if (q.id === p.cil) continue;
					if (prekryva(r, q.r)) {
						nalezy.push(`${rok.rok} · pohled ${pohled.id}: popisek „${p.text}" leží na „${q.nazev}"`);
					}
				}
			}
		}
	}
	return { nalezy, pohledu };
}

// spuštění napřímo: `node testy/mapa-popisky.mjs`
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
	const { nalezy, pohledu } = await zkontrolujPopiskyMap();
	for (const n of nalezy) console.log(`❌ ${n}`);
	console.log(`\nPohledů mapy: ${pohledu} · nálezů: ${nalezy.length}`);
	process.exit(nalezy.length ? 1 : 0);
}

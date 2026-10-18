// Statická pojistka panelů (audit 18. 10. 2026, třídy T5 a T6) – dřív žádný krok brány na *panel*.svg nesahal.
//  1) PÍSMO: v každém public/materialy/**/*panel*.svg musí být font-size ≥ 14 (viewBox panelu ~460).
//     Starých 8 panelů pod limitem je ve ZNÁMÉM seznamu (testy/nastroje/pismo-panelu-zname.json: cesta -> nejmenší písmo);
//     jejich písmo se nesmí ZMENŠIT a nový panel pod 14 padá. Po zvětšení písma řádek ze seznamu smazat.
//  2) KONTRAST: SVG změněné/nové proti HEAD (jen TRACKED změny = tvrdě; nesledované = jen varování, jsou
//     rozpracované) se pustí přes Omega/skripty/kontrast_textu_svg.py (prah 4,5). Celých 356 trvá ~6 min,
//     proto jen změněné. Bez pythonu/skriptu/sharp se krok přeskočí s upozorněním (nikdy ne tichá zelená).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { homedir } from 'node:os';

const KOREN_REPA = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LIMIT = 14;

function panely(dir) {
	const out = [];
	(function walk(d) {
		for (const f of readdirSync(d)) {
			const p = join(d, f);
			if (statSync(p).isDirectory()) walk(p);
			else if (/panel.*\.svg$/.test(f)) out.push(p);
		}
	})(dir);
	return out;
}
export const nejmensiPismo = (svg) => {
	const v = [...svg.matchAll(/font-size\s*[=:]\s*["']?\s*([0-9.]+)/g)].map((m) => +m[1]).filter((x) => x > 0);
	return v.length ? Math.min(...v) : null;
};

export function zkontrolujPismoAKontrast({ chyby, varovani }, { koren = KOREN_REPA, bezKontrastu = false, skript: skriptOpt } = {}) {
	const zname = JSON.parse(readFileSync(join(koren, 'testy/nastroje/pismo-panelu-zname.json'), 'utf8'));
	let n = 0;
	for (const abs of panely(join(koren, 'public/materialy'))) {
		const rel = abs.slice(koren.length + 1);
		const m = nejmensiPismo(readFileSync(abs, 'utf8'));
		n++;
		if (m === null) continue;
		if (rel in zname) { if (m < zname[rel]) chyby.push(`panel ${rel}: písmo ${m} < dosavadních ${zname[rel]} (zmenšení)`); continue; }
		if (m < LIMIT) chyby.push(`panel ${rel}: nejmenší font-size ${m} < ${LIMIT} (testy/nastroje/panely-pismo-kontrast.mjs)`);
	}
	console.log(`ℹ️  písmo panelů: zkontrolováno ${n} SVG, ${Object.keys(zname).length} ve známém seznamu`);

	// 2) kontrast jen nad změněnými
	if (bezKontrastu) return;
	const sh = (a) => execFileSync('git', a, { cwd: koren, encoding: 'utf8' }).split('\n').filter((x) => /public\/materialy\/.*panel.*\.svg$/.test(x));
	let zmenene, nove;
	try {
		zmenene = [...new Set([...sh(['diff', '--name-only', 'HEAD']), ...sh(['diff', '--name-only', '--cached'])])].filter((r) => existsSync(join(koren, r)));
		nove = sh(['ls-files', '--others', '--exclude-standard']);
	} catch (e) { varovani.push(`kontrast panelů přeskočen (git: ${e.message.split('\n')[0]})`); return; }
	const skript = najdiMeridlo(skriptOpt);
	if (!skript) { varovani.push('kontrast panelů PŘESKOČEN: měřidlo (Omega/skripty/kontrast_textu_svg.py + python3/PIL + sharp) není dostupné'); return; }
	const pust = (soubory) => spawnSync('python3', [skript, ...soubory.map((r) => join(koren, r)), '--prah', '4.5'], { encoding: 'utf8' });
	if (zmenene.length) {
		const r = pust(zmenene);
		if (r.status === 1) chyby.push(`kontrast textu pod 4,5:1 ve změněných panelech (${zmenene.length}):\n${(r.stdout || '').trim().slice(0, 1500)}`);
		else if (r.status !== 0) varovani.push(`kontrast změněných panelů: měřidlo skončilo kódem ${r.status} ${(r.stderr || '').slice(0, 200)}`);
		else console.log(`ℹ️  kontrast: ${zmenene.length} změněných panelů ≥ 4,5:1`);
	}
	if (nove.length) {
		const r = pust(nove);
		if (r.status === 1) varovani.push(`kontrast pod 4,5:1 v ${nove.length} NESLEDOVANÝCH panelech (rozpracované, zatím jen varování):\n${(r.stdout || '').trim().slice(0, 600)}`);
		else if (r.status !== 0) varovani.push(`kontrast nesledovaných panelů: měřidlo skončilo kódem ${r.status} ${(r.stderr || '').slice(0, 200)}`);
	}
}

/** Cesta k měřidlu kontrastu (jen když existuje i s python3+PIL a sharp), jinak null. Na Cloudflare není → krok se přeskočí. */
export function najdiMeridlo(skriptOpt) {
	const s = skriptOpt || process.env.KONTRAST_SKRIPT || ['/Users/Shared/Omega/skripty/kontrast_textu_svg.py', join(homedir(), 'Desktop/Omega/skripty/kontrast_textu_svg.py')].find((x) => existsSync(x));
	if (!s || !existsSync(s)) return null;
	if (!existsSync(join(KOREN_REPA, 'node_modules/sharp'))) return null;
	return spawnSync('python3', ['-c', 'import PIL'], { stdio: 'ignore' }).status === 0 ? s : null;
}

// KONTROLA ÚNIKŮ V LABORKÁCH — tip, cíl a kroky nesmějí předem prozrazovat odpověď na otázku.
//
// Proč to vzniklo (5. 10. 2026): kontroly dávek laborek (Omega/predavka/2026-10-05/
// kontrola-laborky-davka*.md) opakovaně nacházely stejnou vadu: tip („Zajímavost"), cíl
// nebo krok doslova říká to, na co se pak ptá otázka (např. tip „Energii nelze vytvořit
// ani zničit" × otázka „Proč nelze energii vytvořit ani zničit?"). Textové pokyny
// workerům to nezastavily, proto je to teď brána.
//
// CO MĚŘÍ: data laborek NEMAJÍ odpovědi (otázky jsou volné, bez klíče), takže se nedá
// porovnávat „odpověď × text". Únik se pozná z druhé strany: pole tip/cil/postup obsahuje
// VÍCESLOVNÝ ÚSEK, který stojí i v otázce. Otázka se ptá na věc, text pole ji hned říká
// — žák ji opíše, aniž by cokoli pozoroval. Úsek = ≥ PRAH po sobě jdoucích významových
// slov (po odstranění stop slov), po normalizaci: bez diakritiky, malá písmena, slova
// zkrácená na kmen (PRVNICH_ZNAKU znaků — čeština je ohebná: „zničit/zničena/zničí").
// Hranice slov jen přes Unicode (\p{L}\p{N}); `\b` v JS česky neumí.
//
// ZNÁMÉ MEZE: nepozná únik jinými slovy (synonymum, parafráze) ani únik jen ve významu.
// To je věc kontrolora s čerstvým kontextem; tahle brána chytá doslovné opisy a jen ty.
// Postup kroku, který jen „pojmenuje měřenou veličinu" (kterou otázka také zmiňuje),
// není únik, proto se krok porovnává přísněji než tip a cíl (PRAH_KROK > PRAH_TIP).
//
// Spuštění: node testy/uniky-laborek.mjs          (brána; exit 1 při úniku)
//           node testy/uniky-laborek.mjs --hlasit (jen vypíše všechny nálezy, exit 0)
//           node testy/uniky-laborek.mjs <soubor.ts>  (kontrola jiné verze dat, jen hlášení)
import { build } from 'esbuild';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spustenoPrimo } from './spusteno-primo.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PRVNICH_ZNAKU = 5;
export const PRAH_TIP = 3; // tip: 3 významová slova za sebou
export const MIN_MIMO_TEMA = 1;
export const PRAH_KROK = 6; // cíl a kroky postupu: jen téměř doslovný opis (viz ZNÁMÉ MEZE)

const STOP = new Set(
	('a i o u v s k z ve se si je jsou byl byla bylo byly bude budou by aby ze na do od po pri pro pod nad za ' +
		'to ta ten ty tyto tohle co ktery ktera ktere kteri jak kdy kde kdo proc ani ale nebo jen jeste uz tak ' +
		'cim tim tom jeho jeho jejich jejiz svuj sve sveho svem tvuj tve sve muze mohou lze nelze ma maji mit ' +
		'muzes zapis zapiste porovnej uved vysvetli popis').split(/\s+/),
);

/** Normalizace: NFD bez diakritiky, malá písmena, slova podle Unicode písmen/číslic, kmen. */
export function tokeny(text) {
	const bez = String(text ?? '').normalize('NFD').replace(/\p{M}+/gu, '').toLowerCase();
	const slova = bez.match(/[\p{L}\p{N}]+/gu) ?? [];
	const out = [];
	for (const s of slova) {
		if (STOP.has(s) || s.length < 3) continue;
		out.push(s.slice(0, PRVNICH_ZNAKU));
	}
	return out;
}

/** Všechny maximální společné souvislé úseky dvou posloupností kmenů (délka ≥ 2). */
export function spolecneUseky(a, b) {
	const out = [];
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < b.length; j++) {
			if (a[i] !== b[j]) continue;
			if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) continue; // není začátek úseku
			let k = 0;
			while (i + k < a.length && j + k < b.length && a[i + k] === b[j + k]) k++;
			if (k >= 2) out.push(a.slice(i, i + k));
		}
	}
	return out;
}

/** Všechny nálezy jedné laborky: [{klic, pole, otazka, usek, delka, text, otazkaText}] */
export function zkontrolujLaborku(klic, lab) {
	const nalezy = [];
	// slova z názvu laborky jsou téma, ne odpověď — úsek musí mít aspoň MIN_MIMO_TEMA slov mimo ně
	const tema = new Set(tokeny(lab.nazev));
	const mimoTema = (u) => u.filter((x) => !tema.has(x)).length;
	const otazky = (lab.otazky ?? []).map((t) => ({ t, tok: tokeny(t) }));
	const pole = [];
	if (lab.tip) pole.push({ nazev: 'tip', text: lab.tip, prah: PRAH_TIP });
	if (lab.cil) pole.push({ nazev: 'cil', text: lab.cil, prah: PRAH_KROK });
	(lab.postup ?? []).forEach((k, i) => pole.push({ nazev: `postup[${i}]`, text: k, prah: PRAH_KROK }));
	for (const p of pole) {
		const tp = tokeny(p.text);
		otazky.forEach((o, oi) => {
			const useky = spolecneUseky(tp, o.tok).filter((u) => u.length >= p.prah && mimoTema(u) >= MIN_MIMO_TEMA);
			if (!useky.length) return;
			const u = useky.sort((x, y) => y.length - x.length)[0];
			nalezy.push({ klic, pole: p.nazev, otazka: oi + 1, usek: u.join(' '), delka: u.length, text: p.text, otazkaText: o.t });
		});
	}
	return nalezy;
}

export async function nactiLaborky(cesta = join(koren, 'src/data/laborky.ts')) {
	const docasny = mkdtempSync(join(tmpdir(), 'wonderly-laborky-'));
	try {
		const vystup = join(docasny, 'laborky.mjs');
		await build({ entryPoints: [cesta], bundle: true, format: 'esm', outfile: vystup, logLevel: 'silent', platform: 'node' });
		const m = await import(pathToFileURL(vystup).href);
		return m.laborky ?? m.default ?? {};
	} finally {
		rmSync(docasny, { recursive: true, force: true });
	}
}

export function zkontrolujVsechny(laborky) {
	return Object.entries(laborky).flatMap(([k, l]) => zkontrolujLaborku(k, l));
}

/** Otisk textu pole: schválená výjimka platí jen pro TEN text; po změně tipu se kontroluje znovu. */
export const otisk = (t) => createHash('sha1').update(String(t)).digest('hex').slice(0, 12);
export const klicNalezu = (n) => `${n.klic}|${n.pole}|${n.otazka}|${otisk(n.text)}`;

/** Ručně posouzené plané poplachy (testy/uniky-laborek-zname.json). Jen přesný text pole. */
export function nactiZname() {
	const cesta = join(koren, 'testy/uniky-laborek-zname.json');
	return existsSync(cesta) ? JSON.parse(readFileSync(cesta, 'utf8')).zname ?? {} : {};
}

function vypis(nalezy) {
	for (const n of nalezy) {
		console.log(`  ✗ ${n.klic} · ${n.pole} × otázka ${n.otazka}: shodný úsek „${n.usek}" (${n.delka} slov)`);
		console.log(`      ${n.pole}: ${n.text.slice(0, 160)}`);
		console.log(`      otázka: ${n.otazkaText.slice(0, 160)}`);
		console.log(`      klíč výjimky (jen pokud je to ručně ověřený planý poplach): ${klicNalezu(n)}`);
	}
}

if (spustenoPrimo(import.meta.url)) {
	const arg = process.argv.slice(2);
	const hlasit = arg.includes('--hlasit');
	const soubor = arg.find((a) => !a.startsWith('--'));
	const laborky = await nactiLaborky(soubor ? resolve(soubor) : undefined);
	const pocet = Object.keys(laborky).length;
	if (pocet === 0) {
		console.log('✗ uniky-laborek: načteno 0 laborek — měřidlo by hlásilo falešnou nulu');
		process.exit(1);
	}
	const vsechny = zkontrolujVsechny(laborky);
	const zname = soubor ? {} : nactiZname();
	const nalezy = vsechny.filter((n) => !(klicNalezu(n) in zname));
	const prepusteno = vsechny.length - nalezy.length;
	const zastarale = Object.keys(zname).filter((k) => !vsechny.some((n) => klicNalezu(n) === k));
	console.log(`uniky-laborek: ${pocet} laborek, ${nalezy.length} nálezů` + (prepusteno ? ` (+ ${prepusteno} ručně posouzených planých poplachů)` : ''));
	vypis(nalezy);
	for (const k of zastarale) console.log(`  ℹ výjimka už se nepoužívá (text se změnil nebo laborka zmizela), lze smazat: ${k}`);
	if (nalezy.length && !hlasit) process.exit(1);
}

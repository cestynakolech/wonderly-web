// Test nástroje vata-zapis-navrhy.mjs: klíče „shrnuti" (skládané slozSouhrnnyKviz) se musí
// přeložit na SPRÁVNOU zdrojovou otázku (ne jen „blok nalezen"). Pro několik klíčů test sám
// (nezávisle na nástroji, přes identitu objektu) najde zdroj, porovná text otázky a distraktoru
// ve shrnutí a ve zdroji a vyžaduje, aby suchý běh se schválením hlásil zápis přesně do toho
// zdrojového klíče a otázky. Špatný překlad (qIndex ±1, i=0 …) vede k „text otázky nesedí" → test padá.
// Dále: podvržený klíč dál hlásí „blok nenalezen"; kolize (2 klíče → tentýž zdrojový distraktor)
// uvede zdrojový klíč a nepočítá přeskočený návrh jako zápis. Suchý běh, nic se nezapisuje.
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { nactiData, maDelkovouNapovedu, maRemizuODelku } from './data.mjs';

const nastroj = path.join(path.dirname(fileURLToPath(import.meta.url)), 'nastroje/vata-zapis-navrhy.mjs');
const { kvizy } = await nactiData();

// nezávislé hledání zdroje: klíč, který NENÍ shrnutí a obsahuje tentýž objekt otázky
function najdiZdroj(klic, qIndex) {
	const otazka = kvizy[klic][qIndex];
	for (const [k, seznam] of Object.entries(kvizy)) {
		if (k === klic || k.includes('/shrnuti/') || !Array.isArray(seznam)) continue;
		const i = seznam.indexOf(otazka);
		if (i !== -1) return { klic: k, qIndex: i, otazka: seznam[i] };
	}
	return null;
}

// návrh, který projde délkovou kontrolou nástroje (jinak by se položka přeskočila z jiného důvodu)
function navrhPro(o) {
	const p = o.odpovedi[1];
	for (const kandidat of [p.slice(0, -1) + 'x', p + 'x', p.slice(0, -2), p.slice(0, -4) + 'xxxx', 'x'.repeat(p.length + 3)]) {
		const odp = o.odpovedi.slice();
		odp[1] = kandidat;
		if (kandidat !== p && !maDelkovouNapovedu({ odpovedi: odp }) && !maRemizuODelku({ odpovedi: odp })) return kandidat;
	}
	return null;
}

// vzorek: shrnutí z různých zdrojových bloků, aspoň 5 různých otázek
const vzorek = [];
const pouziteZdroje = new Set();
for (const klic of Object.keys(kvizy).filter((k) => k.includes('/shrnuti/'))) {
	for (let q = 0; q < kvizy[klic].length && vzorek.length < 8; q++) {
		const o = kvizy[klic][q];
		if (!o || typeof o.text !== 'string' || !Array.isArray(o.odpovedi) || o.odpovedi.length < 2) continue;
		const z = najdiZdroj(klic, q);
		if (!z || !navrhPro(o)) continue;
		const id = `${z.klic}#${z.qIndex}`;
		if (pouziteZdroje.has(id)) continue;
		pouziteZdroje.add(id);
		vzorek.push({ klic, q, o, z, navrh: navrhPro(o) });
		break; // z každého shrnutí nejvýš jedna otázka → různé klíče shrnutí
	}
}

let chyb = 0;
const over = (podm, popis) => { if (!podm) { chyb++; console.error('SELHALO: ' + popis); } };
over(vzorek.length >= 5, `vzorek shrnutí má aspoň 5 položek (je ${vzorek.length})`);

const tmp = mkdtempSync(path.join(tmpdir(), 'vata-shrnuti-'));
const stav = path.join(tmp, 'stav.json');
const schv = path.join(tmp, 'schv.json');
const polozka = (klic, q, text, puvodni, navrh) => ({ faze: 'hotovo', klic, qIndex: q, distraktorIndex: 1, qText: text, puvodniText: puvodni, navrh });
const spust = (obsah, schvaleniObsah) => {
	writeFileSync(stav, JSON.stringify(obsah));
	writeFileSync(schv, JSON.stringify(schvaleniObsah));
	return execFileSync('node', [nastroj, stav, `--schvaleni=${schv}`], { encoding: 'utf8' });
};

// A) správný cíl pro každý klíč vzorku (schválené → nástroj musí dojít až k „ZAPSALO BY SE" ve zdroji)
const stavA = {};
const schvA = {};
vzorek.forEach(({ klic, q, o, z, navrh }, i) => {
	// text otázky a distraktoru ve shrnutí = ve zdroji (jinak by byl test sám chybný)
	over(o.text === z.otazka.text && o.odpovedi[1] === z.otazka.odpovedi[1], `${klic} Q${q + 1}: shrnutí a zdroj ${z.klic} Q${z.qIndex + 1} mají stejný text otázky i distraktoru`);
	stavA[`k${i}`] = polozka(klic, q, o.text, o.odpovedi[1], navrh);
	schvA[`${klic}#${q}#1`] = true;
});
const vystupA = spust(stavA, schvA);
vzorek.forEach(({ klic, q, o, z, navrh }) => {
	const radek = vystupA.split('\n').find((r) => r.includes(`ZAPSALO BY SE ${klic} Q${q + 1} `));
	over(radek, `${klic} Q${q + 1}: nástroj hlásí „ZAPSALO BY SE" (správný cíl, text i distraktor sedí)`);
	over(radek && radek.includes(`[zdroj ${z.klic} Q${z.qIndex + 1}]`), `${klic} Q${q + 1}: cíl je zdroj ${z.klic} Q${z.qIndex + 1}`);
	over(radek && radek.includes(`„${o.odpovedi[1]}" → „${navrh}"`), `${klic} Q${q + 1}: mění se skutečně distraktor „${o.odpovedi[1]}"`);
});
over(vystupA.includes(`Zapsalo by se: ${vzorek.length} položek. Přeskočeno: 0.`), `suchý běh: zapsalo by se ${vzorek.length}, přeskočeno 0`);
over(!/blok nenalezen|nesedí|návrh čekal/.test(vystupA), 'žádné „blok nenalezen / nesedí / návrh čekal"');

// B) bez schválení se nezapisuje nic; podvržený klíč dál hlásí „blok nenalezen"
const prvni = vzorek[0];
const vystupB = spust(
	{ a: polozka(prvni.klic, prvni.q, prvni.o.text, prvni.o.odpovedi[1], prvni.navrh), b: polozka('fyzika/7-rocnik/shrnuti/neexistuje', 0, 'x', 'y', 'z') },
	{},
);
over(!vystupB.includes(`${prvni.klic} Q${prvni.q + 1}: blok nenalezen`), 'skutečný klíč shrnutí nehlásí „blok nenalezen"');
over(vystupB.includes('fyzika/7-rocnik/shrnuti/neexistuje Q1: blok nenalezen'), 'podvržený klíč hlásí „blok nenalezen"');
over(vystupB.includes('Zapsalo by se: 0 položek'), 'bez schválení se má zapsat 0');

// C) kolize: dvě shrnutí → tentýž zdrojový distraktor; zapsat jen jeden, druhý přeskočit se zdrojovým klíčem
const kolizeKlice = Object.keys(kvizy).filter((k) => k.includes('/shrnuti/'));
let dvojice = null;
const videno = new Map();
hledej: for (const klic of kolizeKlice) {
	for (let q = 0; q < kvizy[klic].length; q++) {
		const o = kvizy[klic][q];
		if (!o || typeof o.text !== 'string' || !Array.isArray(o.odpovedi) || o.odpovedi.length < 2) continue;
		const z = najdiZdroj(klic, q);
		if (!z || !navrhPro(o)) continue;
		const id = `${z.klic}#${z.qIndex}`;
		if (videno.has(id) && videno.get(id).klic !== klic) { dvojice = [videno.get(id), { klic, q, o, z }]; break hledej; }
		if (!videno.has(id)) videno.set(id, { klic, q, o, z });
	}
}
over(dvojice, 'existují dvě shrnutí se společným zdrojem (pro test kolize)');
if (dvojice) {
	const [d1, d2] = dvojice;
	const vystupC = spust(
		{ a: polozka(d1.klic, d1.q, d1.o.text, d1.o.odpovedi[1], navrhPro(d1.o)), b: polozka(d2.klic, d2.q, d2.o.text, d2.o.odpovedi[1], navrhPro(d2.o)) },
		{ [`${d1.klic}#${d1.q}#1`]: true, [`${d2.klic}#${d2.q}#1`]: true },
	);
	over(vystupC.includes('Zapsalo by se: 1 položek. Přeskočeno: 1.'), 'kolize: zapsalo by se 1, přeskočeno 1');
	over(vystupC.includes(`KOLIZE — zdrojový klíč ${d1.z.klic} Q${d1.z.qIndex + 1}`), 'kolize: hláška uvádí zdrojový klíč');
}

if (chyb) process.exit(1);
console.log(`OK vata-zapis-shrnuti: ${vzorek.length} klíčů shrnutí míří na správnou zdrojovou otázku a distraktor, podvržený klíč nenalezen, kolize hlášena se zdrojem, zapsáno 0`);

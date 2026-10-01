// Únik správné odpovědi do JINÉ otázky téhož kvízového bloku (zadání, vysvětlení).
// Samostatná, jednoduchá brána — jen HLÁSÍ (exit 1 při nálezu). Do build bran NENÍ zapojena.
// Doplněk k testy/uniky.mjs (ten je přísnější heuristika; tahle je citlivější a hlučnější).
//
// Princip: z KLÍČOVÝCH výrazů správné odpovědi (odpovedi[0]) otázky B (bez stop-slov,
// bez slov ze zadání B samotné) se hledají kmeny/čísla v textu a vysvětlení každé jiné otázky A.
// Únik A→B se hlásí, když A obsahuje buď ≥ 2 klíčové kmeny odpovědi B, nebo 1 kmen,
// který je dlouhý (≥ 7 písmen), číselný, nebo jednotka (kWh, Ω...) a zároveň ROZLIŠUJE
// správnou odpověď od jejích distraktorů (distraktory ho neobsahují).
// Česky: žádné \b — tokenizace přes Unicode \p{L}; kmen = předpona (pro skloňování).
// Použití: node testy/uniky-v-bloku.mjs [--blok=část-klíče] [--kalibrace]
import { nactiData } from './data.mjs';
import { readFileSync } from 'node:fs';

const STOP = new Set(('jako který která které kteří kterou kterého když kolik proč jaký jaká jaké jaká jakou jakého čemu '
	+ 'jsou není byla bylo byly bude budou může mohou musí musíme nebo také ještě pouze jenom jsme jste ' + 'tedy takže protože aby kde kam tady tento tato toto tyto této tohoto toho tomu ' + 'každý každá každé stejně stejný stejná stejné vždy nikdy často také dále mezi podle'
	+ ' přibližně asi než jen jeho její jejich svůj své svého tím tou ten ona ono oni už při pro před nad pod přes bez ' + 'být mít dát dělat co čím čeho má mají měl měla').split(/\s+/));

const rozdel = (s) => (s.toLowerCase().replace(/(\d) (?=\d{3}(?!\d))/g, '$1').match(/[\p{L}\p{N}]+(?:[.,][\p{N}]+)?|Ω/gu) || []);
const kmen = (w) => (/^\d/.test(w) ? w.replace(',', '.') : w.length >= 9 ? w.slice(0, 7) : w.length >= 6 ? w.slice(0, 5) : w.length === 5 ? w.slice(0, 4) : w);
const JEDNOTKA = /^(kwh|wh|ws|mw|kw|ma|kv|ω|mpa|kpa|hz|khz|°c)$/;

function klicove(s) {
	const out = [];
	for (const w of rozdel(s)) {
		if (STOP.has(w)) continue;
		if (/^\p{L}$/u.test(w) && w !== 'Ω' && w !== 'ω') continue; // jednopísmenné „v", „J"
		if (/^\p{L}+$/u.test(w) && w.length < 4 && !JEDNOTKA.test(w)) continue;
		if (/^\d$/.test(w)) continue; // holá jednociferná čísla nic neprozradí
		out.push(kmen(w));
	}
	return [...new Set(out)];
}

export function najdiUniky(blok) {
	const nalezy = [];
	let dvojic = 0;
	const info = blok.map((o) => {
		const spravna = klicove(o.odpovedi[0]);
		const sD = new Set(o.odpovedi.slice(1).flatMap(klicove));
		const sZadani = new Set(klicove(o.text));
		const terms = spravna.filter((k) => !sZadani.has(k));
		return { terms, rozl: new Set(terms.filter((k) => !sD.has(k))), text: new Set(klicove(o.text)), vys: new Set(klicove(o.vysvetleni || '')) };
	});
	// Výrazy rozptýlené po celém bloku (téma bloku, např. „elektrické") nic neprozrazují.
	const df = new Map();
	for (const i of info) for (const k of new Set([...i.text, ...i.vys])) df.set(k, (df.get(k) || 0) + 1);
	const tema = (k) => (df.get(k) || 0) > 0.25 * blok.length && !JEDNOTKA.test(k);
	for (let b = 0; b < blok.length; b++) {
		const terms = info[b].terms.filter((k) => !tema(k));
		const rozl = new Set([...info[b].rozl].filter((k) => !tema(k)));
		if (!terms.length) continue;
		for (let a = 0; a < blok.length; a++) {
			if (a === b) continue;
			dvojic++;
			const kde = new Set([...info[a].text, ...info[a].vys]);
			const shoda = terms.filter((k) => kde.has(k));
			const rozlShoda = shoda.filter((k) => rozl.has(k));
			if (!rozlShoda.length) continue;
			const silny = rozlShoda.some((k) => k.length >= 4 || /^\d/.test(k) || JEDNOTKA.test(k));
			if (shoda.length >= 2 || (silny && terms.length <= 2) || (silny && rozlShoda.some((k) => k.length >= 7 || JEDNOTKA.test(k)))) {
				nalezy.push({ zdroj: a, cil: b, vyrazy: shoda, v: info[a].text.size && shoda.some((k) => info[a].text.has(k)) ? 'zadání' : 'vysvětlení' });
			}
		}
	}
	return { nalezy, dvojic };
}

function radky() { // klíč bloku + text otázky → číslo řádku v kvizy.ts (jen pro výpis)
	const m = new Map();
	let klic = '';
	readFileSync(new URL('../src/data/kvizy.ts', import.meta.url), 'utf8').split('\n').forEach((r, i) => {
		const h = r.match(/^\s*'([^']+)':\s*\[/);
		if (h) klic = h[1];
		const x = r.match(/text:\s*(['"])(.*?)\1,\s*odpovedi/);
		if (x) m.set(klic + '|' + x[2].replace(/\\'/g, "'"), i + 1);
	});
	return m;
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const arg = process.argv.slice(2);
	const filtr = (arg.find((a) => a.startsWith('--blok=')) || '').slice(7);
	const { kvizy } = await nactiData();
	const rad = radky();
	let bloku = 0, otazek = 0, dvojic = 0, celkem = 0;
	for (const [klic, blok] of Object.entries(kvizy)) {
		if (filtr && !klic.includes(filtr)) continue;
		if (!Array.isArray(blok) || blok.length < 2) continue;
		bloku++; otazek += blok.length;
		const v = najdiUniky(blok);
		dvojic += v.dvojic; celkem += v.nalezy.length;
		for (const n of v.nalezy) {
			const L = (i) => rad.get(klic + '|' + blok[i].text) ?? '?';
			console.log(`${klic}\n  :${L(n.zdroj)} → :${L(n.cil)}  [${n.vyrazy.join(', ')}] (v ${n.v} zdroje; cíl: „${blok[n.cil].odpovedi[0]}")`);
		}
	}
	console.log(`\nProšlo ${bloku} bloků / ${otazek} otázek / ${dvojic} dvojic; nálezů: ${celkem}.`);
	if (bloku > 0 && dvojic === 0) { console.error('SELHÁNÍ MĚŘIDLA: 0 porovnaných dvojic.'); process.exit(1); }
	process.exit(celkem ? 1 : 0);
}

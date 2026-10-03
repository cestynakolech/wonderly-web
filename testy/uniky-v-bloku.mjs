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
import { spustenoPrimo } from './spusteno-primo.mjs';

const STOP = new Set(('jako který která které kteří kterou kterého když kolik proč jaký jaká jaké jaká jakou jakého čemu '
	+ 'jsou není byla bylo byly bude budou může mohou musí musíme nebo také ještě pouze jenom jsme jste ' + 'tedy takže protože aby kde kam tady tento tato toto tyto této tohoto toho tomu ' + 'každý každá každé stejně stejný stejná stejné vždy nikdy často také dále mezi podle'
	+ ' přibližně asi než jen jeho její jejich svůj své svého tím tou ten ona ono oni už při pro před nad pod přes bez ' + 'být mít dát dělat co čím čeho má mají měl měla').split(/\s+/));

const rozdel = (s) => (s.toLowerCase().replace(/(\d) (?=\d{3}(?!\d))/g, '$1').match(/[\p{L}\p{N}]+(?:[.,][\p{N}]+)?|Ω/gu) || []);
const kmen = (w) => (/^\d/.test(w) ? w.replace(',', '.') : w.length >= 9 ? w.slice(0, 7) : w.length >= 6 ? w.slice(0, 5) : w.length === 5 ? w.slice(0, 4) : w);
const PRAH_POKRYTI = 0.7;
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

// Číslo prozrazuje jen tehdy, když ho zdroj vysloví mimo výpočet (věta bez = × · : + − ÷ → /) a se STEJNOU jednotkou,
// jakou má odpověď cíle. Konstanty a převodní vztahy ve výpočtech (10 N/kg, 1 000 g, 100 Pa) jsou běžný hluk.
const OPERATOR = /[=×·:+−÷→*\/]|(?<![\p{L}])(?:děleno|dělí|dělíme|vydělíme|rozděl\p{L}*|násobí\p{L}*|vynásob\p{L}*|krát|plus|mínus|sečt\p{L}*)(?![\p{L}])/u;
function cisloMimoVypocet(syrovy, kmenCisla, jednotka) {
	for (const veta of syrovy.split(/(?<=[a-zěščřžýáíéúůďťňóA-Z)\s])[.;!?]+(?=\s|$)|\n/u)) {
		if (OPERATOR.test(veta)) continue;
		const tok = rozdel(veta);
		for (let i = 0; i < tok.length; i++) {
			if (!/^\d/.test(tok[i]) || kmen(tok[i]) !== kmenCisla) continue;
			if (!jednotka || tok[i + 1] === jednotka) return true;
		}
	}
	return false;
}
const jednotkaOdpovedi = (odp, kmenCisla) => {
	const tok = rozdel(odp);
	const i = tok.findIndex((w) => /^\d/.test(w) && kmen(w) === kmenCisla);
	return i >= 0 && /^\p{L}[\p{L}\p{N}°]*$/u.test(tok[i + 1] || '') ? tok[i + 1] : '';
};

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
	const tema = (k) => (df.get(k) || 0) >= 3 && (df.get(k) || 0) > 0.15 * blok.length && !JEDNOTKA.test(k) && !/^\d/.test(k);
	for (let b = 0; b < blok.length; b++) {
		const terms = info[b].terms.filter((k) => !tema(k));
		const rozl = new Set([...info[b].rozl].filter((k) => !tema(k)));
		if (!terms.length) continue;
		for (let a = 0; a < blok.length; a++) {
			if (a === b) continue;
			dvojic++;
			const kde = new Set([...info[a].text, ...info[a].vys]);
			// U zdroje, jehož vlastní odpověď je číslo (početní úloha), jsou čísla v zadání jen vstupní data
			// výpočtu — shoda s odpovědí jiné úlohy je náhoda hodnot, ne únik; počítá se pak jen vysvětlení.
			const vlastni = new Set(klicove(blok[a].odpovedi[0])); // číslo, které je výsledkem zdroje samotného, neprozrazuje cizí odpověď
			const syrovy = (/\d/.test(blok[a].odpovedi[0]) ? '' : `${blok[a].text}\n`) + (blok[a].vysvetleni || '');
			const shoda = terms.filter((k) => kde.has(k)
				&& (!/^\d/.test(k) || (!vlastni.has(k) && cisloMimoVypocet(syrovy, k, jednotkaOdpovedi(blok[b].odpovedi[0], k)))));
			const rozlShoda = shoda.filter((k) => rozl.has(k));
			if (!rozlShoda.length) continue;
			// Přísný práh (kalibrace 3. 10. 2026): únik = zdroj pokrývá ≥ 70 % klíčových kmenů odpovědi
			// (aspoň 2 kmeny, nebo jediný kmen, je-li to číslo/jednotka) a aspoň jeden pokrytý kmen
			// odlišuje správnou odpověď od distraktorů. Samotné sdílení odborného slova nestačí.
			const pokryti = shoda.length / terms.length;
			// Jediný klíčový kmen odpovědi stačí jen u čísla; samotné slovo či značka jednotky (Ω, kW) je příliš hlučné
			// (zkoušeno: jediné slovo ≥ 5 znaků dalo 242 nálezů, z nich jen asi třetina skutečných).
			const jedinyHodnota = terms.length === 1 && /^\d/.test(terms[0]);
			if (pokryti >= PRAH_POKRYTI && (shoda.length >= 2 || jedinyHodnota)) {
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
		// Dva tvary zápisu: `text:` na vlastním řádku, nebo jednořádkové `{ text: '…', odpovedi: …`.
		const x = r.match(/^\s*(?:\{\s*)?text:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,/);
		if (x) m.set(klic + '|' + (x[1] ?? x[2]).replace(/\\(['"])/g, '$1'), i + 1);
	});
	return m;
}

if (spustenoPrimo(import.meta.url)) {
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

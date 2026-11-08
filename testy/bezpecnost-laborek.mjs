// BEZPEČNOST OBVODŮ V LABORKÁCH — brána proti opakované vadě (kontrolor A, audit 11. 10. 2026).
//
// Proč: v laborkách se 4× opravovalo totéž (a179d9d d6, ab45818 zákaz spojování svorek,
// 0fdd8f0 d20 a 9e949b3 d21 chybějící spínač). Žádná brána to nehlídala.
//
// PRAVIDLA (jen pro laborky, které mají zdroj: pomůcka obsahuje baterie/zdroj/článek/akumulátor):
//  B1: musí existovat spínač (v pomůckách nebo postupu) a v postupu krok s „vypn…/rozepn…/odpoj…";
//  B2: krok, který přepojuje/mění zapojení (přepoj…, změň zapojení, vyměň, prohoď), musí mít před sebou
//      (nebo sám obsahovat) „vypn/rozepn/odpoj";
//  B3: zakázaná výzva ke zkratu: „spoj(it/uj) svorky/póly/vývody zdroje" bez záporu („nikdy", „nespojuj", „nesmíš", „zákaz").
// Spuštění: node testy/bezpecnost-laborek.mjs   (exit 1 při nálezu; --hlasit jen vypíše)
import { nactiLaborky } from './uniky-laborek.mjs';
import { spustenoPrimo } from './spusteno-primo.mjs';

const bez = (t) => String(t ?? '').normalize('NFD').replace(/\p{M}+/gu, '').toLowerCase();
const maZdroj = (l) => (l.pomucky ?? []).some((p) => /baterie|zdroj (stejnosmern|napeti|proudu)|stejnosmern\w* zdroj|zdroj bezpecn|elektricky zdroj|clanek|akumulator/.test(bez(p)));
const VYPNI = /\b(vypn|rozepn|odpoj)/;
const PREPOJ = /\b(prepoj|prohod|vymen|zmen\w* zapojeni|zmen\w* obvod)/;
const ZKRAT = /spoj(it|uj|te)?\s+(\w+\s+){0,2}(svork|pol|vyvod)\w*\s+(\w+\s+){0,2}(zdroj|bateri|clank)/;
const ZAPOR = /(nikdy|nespojuj|nespojuj\w*|nesmis|zakaz|nesmi)/;

export function zkontrolujBezpecnost(klic, lab) {
	const n = [];
	if (!maZdroj(lab)) return n;
	const kroky = (lab.postup ?? []).map(bez);
	const vse = [...(lab.pomucky ?? []).map(bez), ...kroky].join(' ');
	if (kroky.some((k) => PREPOJ.test(k))) {
		// B1 platí jen tam, kde se za provozu něco přepojuje (ploché baterie 4,5 V bez přepojování spínač nepotřebují)
		if (!/spinac|vypinac/.test(vse) && !kroky.some((k) => /odpoj\w* (bateri|zdroj)/.test(k))) n.push({ klic, pravidlo: 'B1', popis: 'přepojuje se, ale zdroj nemá spínač ani krok odpojení' });
		if (!kroky.some((k) => VYPNI.test(k))) n.push({ klic, pravidlo: 'B1', popis: 'žádný krok „vypni/rozepni/odpoj"' });
	}
	let vypnuto = false;
	kroky.forEach((k, i) => {
		if (PREPOJ.test(k) && !vypnuto && !VYPNI.test(k)) n.push({ klic, pravidlo: 'B2', popis: `krok ${i + 1} přepojuje bez předchozího vypnutí` });
		if (VYPNI.test(k)) vypnuto = true;
	});
	[...kroky, ...(lab.otazky ?? []).map(bez), bez(lab.tip), bez(lab.cil)].forEach((t) => {
		const m = ZKRAT.exec(t);
		if (m && !ZAPOR.test(t)) n.push({ klic, pravidlo: 'B3', popis: `výzva ke zkratu: „${m[0]}"` });
	});
	return n;
}

if (spustenoPrimo(import.meta.url)) {
	const hlasit = process.argv.includes('--hlasit');
	const soubor = process.argv.slice(2).find((a) => !a.startsWith('--'));
	const laborky = await nactiLaborky(soubor);
	const pocet = Object.keys(laborky).length;
	if (pocet === 0) {
		console.log('✗ bezpecnost-laborek: načteno 0 laborek — falešná nula');
		process.exit(1);
	}
	const sZdrojem = Object.values(laborky).filter(maZdroj).length;
	const nalezy = Object.entries(laborky).flatMap(([k, l]) => zkontrolujBezpecnost(k, l));
	console.log(`bezpecnost-laborek: ${pocet} laborek (${sZdrojem} se zdrojem), ${nalezy.length} nálezů`);
	for (const x of nalezy) console.log(`  ✗ ${x.klic} · ${x.pravidlo}: ${x.popis}`);
	if (nalezy.length && !hlasit) process.exit(1);
}

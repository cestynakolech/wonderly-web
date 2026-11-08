// CELÁ ČÍSLA V LABORKÁCH — výpočtová otázka/krok nesmí zadávat desetinná čísla (kontrolor A, audit 11. 10. 2026).
//
// Proč: pravidlo „celá čísla pro děti" se v laborkách porušilo 3× (9e8a432 d1, d6ec6fa d12 stín,
// a9fbce0 d4 Ohm z baterií); testy/cisla-ve-vykladu.mjs laborky.ts vůbec nečte.
// CO MĚŘÍ: otázka, cíl nebo krok s výpočetním slovesem (vypočti/spočítej/kolik…) a desetinným číslem.
// Výjimky (ručně posouzené: tabulková konstanta, 4,5 V baterie, zaokrouhlení výsledku) jsou v
// testy/cela-cisla-laborek-zname.json pod otiskem textu — po změně textu se kontroluje znovu.
// Spuštění: node testy/cela-cisla-laborek.mjs [--hlasit] [soubor.ts]
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nactiLaborky } from './uniky-laborek.mjs';
import { spustenoPrimo } from './spusteno-primo.mjs';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');
const VYPOCET = /(vypo[cč][ií]t|spo[cč][ií]t|vypo[cč]ti|spo[cč]ti|kolik)/i;
const DESETINNE = /\d[,.]\d/;
export const otisk = (t) => createHash('sha1').update(String(t)).digest('hex').slice(0, 12);

export function zkontrolujCelaCisla(klic, lab) {
	const pole = [['cil', lab.cil], ...(lab.postup ?? []).map((t, i) => [`postup[${i}]`, t]), ...(lab.otazky ?? []).map((t, i) => [`otazka[${i}]`, t])];
	return pole.filter(([, t]) => VYPOCET.test(t ?? '') && DESETINNE.test(t ?? '')).map(([p, t]) => ({ klic, pole: p, text: t, vyjimka: `${klic}|${p}|${otisk(t)}` }));
}

if (spustenoPrimo(import.meta.url)) {
	const hlasit = process.argv.includes('--hlasit');
	const soubor = process.argv.slice(2).find((a) => !a.startsWith('--'));
	const laborky = await nactiLaborky(soubor);
	if (!Object.keys(laborky).length) { console.log('✗ cela-cisla-laborek: 0 laborek — falešná nula'); process.exit(1); }
	const cesta = join(koren, 'testy/cela-cisla-laborek-zname.json');
	const zname = soubor || !existsSync(cesta) ? {} : JSON.parse(readFileSync(cesta, 'utf8')).zname ?? {};
	const vse = Object.entries(laborky).flatMap(([k, l]) => zkontrolujCelaCisla(k, l));
	const nalezy = vse.filter((n) => !(n.vyjimka in zname));
	console.log(`cela-cisla-laborek: ${Object.keys(laborky).length} laborek, ${nalezy.length} nálezů (+ ${vse.length - nalezy.length} posouzených výjimek)`);
	for (const n of nalezy) console.log(`  ✗ ${n.klic} · ${n.pole}: ${n.text.slice(0, 150)}\n      klíč výjimky: ${n.vyjimka}`);
	if (nalezy.length && !hlasit) process.exit(1);
}

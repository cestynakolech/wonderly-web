// Délková nápověda po blocích: `node testy/delky.mjs [část klíče bloku]`
//
// Brána vypisuje jen pět nejhorších bloků a celkový podíl. Při dorovnávání je
// potřeba vidět KONKRÉTNÍ otázky — které mají správnou odpověď jasně nejdelší
// a o kolik znaků. Čte skutečná data (esbuild → import), ne text souboru.
import { nactiData, maDelkovouNapovedu } from './data.mjs';

const hledane = process.argv[2] ?? '';
const { kvizy } = await nactiData();

let celkem = 0;
let sNapovedou = 0;
const bloky = [];

for (const [klic, otazky] of Object.entries(kvizy)) {
	if (!Array.isArray(otazky) || !otazky.length) continue;
	let n = 0;
	const detail = [];
	for (const o of otazky) {
		const odp = o.odpovedi ?? [];
		if (odp.length < 2) continue;
		celkem++;
		if (maDelkovouNapovedu(o)) {
			n++;
			sNapovedou++;
			const spravna = String(odp[0]).length;
			const druha = Math.max(...odp.slice(1).map((a) => String(a).length));
			detail.push(`      +${spravna - druha} znaků: „${String(o.text).slice(0, 60)}"`);
		}
	}
	bloky.push({ klic, n, celkem: otazky.length, detail });
}

const vybrane = bloky.filter((b) => b.klic.includes(hledane) && b.n > 0).sort((a, b) => b.n / b.celkem - a.n / a.celkem);

for (const b of hledane ? vybrane : vybrane.slice(0, 12)) {
	console.log(`${b.klic}: ${b.n}/${b.celkem}`);
	if (hledane) for (const d of b.detail) console.log(d);
}
console.log(`\nCelkem ${sNapovedou} z ${celkem} otázek (${Math.round((sNapovedou / celkem) * 100)} %) má správnou odpověď JASNĚ nejdelší.`);

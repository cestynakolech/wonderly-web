// Pomocný extraktor pro automat vata_navrhy.py (Omega/skripty).
// NEVYPOČÍTÁVÁ nic nového — jen znovu (duplicitně, kvůli izolaci od
// vata-v-distraktorech.mjs, který nechceme měnit) prochází stejnou logikou
// a vypíše STROJOVĚ ČITELNÝ JSON se všemi nálezy vzoru 1 (absolutní slovo
// jen v distraktorech), aby je mohl zpracovat Python + lokální model.
//
// Použití: node testy/nastroje/vata-nalezy-json.mjs > nalezy.json

import { nactiData } from '../data.mjs';

const ABSOLUTNI_KORENY = [
	['vžd', 'vždy/vždycky/vždyť'],
	['nikdy', 'nikdy'],
	['vůbec', 'vůbec'],
	['úpln', 'úplně/úplný/úplná/úplné'],
	['naprost', 'naprosto/naprostý'],
	['rozhodně', 'rozhodně'],
	['stoprocentn', 'stoprocentně/stoprocentní'],
	['žádn', 'žádný/žádná/žádné/žádného/…'],
	['všech', 'všechny/všechna/všechno/všech'],
	['všem', 'všemi/všem/všemu'],
	['pouze', 'pouze'],
	['jedin', 'jediný/jediná/jediné'],
];
const FRAZE = [['jen\\s+tehdy', 'jen tehdy']];

function najdiVyskyty(text) {
	const s = String(text ?? '');
	const nalezy = [];
	for (const [koren, popis] of ABSOLUTNI_KORENY) {
		const re = new RegExp(`(?<![\\p{L}])${koren}`, 'giu');
		const m = s.match(re);
		if (m) for (const zasah of m) nalezy.push({ slovo: zasah, popis });
	}
	for (const [vzor, popis] of FRAZE) {
		const re = new RegExp(`(?<![\\p{L}])${vzor}`, 'giu');
		const m = s.match(re);
		if (m) for (const zasah of m) nalezy.push({ slovo: zasah.replace(/\s+/g, ' '), popis });
	}
	return nalezy;
}

const { kvizy } = await nactiData();
const PRAH_VATA = 3;
const vystup = [];

for (const [klic, otazky] of Object.entries(kvizy)) {
	if (!Array.isArray(otazky) || !otazky.length) continue;
	let correctHits = 0;
	let wrongHits = 0;
	let platnych = 0;
	const flaggedQuestions = [];
	otazky.forEach((o, qIndex) => {
		const odp = (o?.odpovedi ?? []).map(String);
		if (odp.length < 2) return;
		platnych++;
		const spravna = odp[0];
		const distraktory = odp.slice(1);
		const hitsSpravna = najdiVyskyty(spravna);
		correctHits += hitsSpravna.length;
		const flaggedDistraktory = [];
		distraktory.forEach((d, i) => {
			const hits = najdiVyskyty(d);
			wrongHits += hits.length;
			if (hits.length > 0) {
				flaggedDistraktory.push({
					distraktorIndex: i + 1, // pozice v odpovedi[] (0 = správná)
					puvodniText: d,
					slova: hits.map((h) => h.slovo),
				});
			}
		});
		if (flaggedDistraktory.length > 0 && hitsSpravna.length === 0) {
			flaggedQuestions.push({
				qIndex,
				text: o.text ?? '',
				odpovedi: odp,
				flaggedDistraktory,
			});
		}
	});
	if (!platnych) continue;
	if (wrongHits >= PRAH_VATA && correctHits === 0) {
		vystup.push({ klic, otazekCelkem: platnych, wrongHits, otazky: flaggedQuestions });
	}
}

console.log(JSON.stringify(vystup, null, 2));

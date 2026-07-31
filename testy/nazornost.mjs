#!/usr/bin/env node
// Přehled názornosti: která podtémata nemají ANI obrázek, ANI video, ANI simulaci.
//
// Čte SKUTEČNÁ DATA (testy/data.mjs), ne text souboru. Předchozí verze hledala
// `druh: 'obrazek'` — ta hodnota se v datech nevyskytuje ani jednou, správně je
// 'infografika' — takže infografiky nikdy nezapočítala a hlásila falešné mezery
// (fyzika 7: hlásila 5, ve skutečnosti 2). Navíc si vzory nad textem neporadily
// s blokem `elektrina`, který má o tabulátor jiné odsazení (22 podtémat místo 37).
//
// Použití:  node testy/nazornost.mjs [filtr]      např. `fyzika/8` nebo `informatika`
import { nactiData, vsechnaPodtemata, nazornost } from './data.mjs';

const filtr = process.argv.slice(2);
const { temata } = await nactiData();
const vse = vsechnaPodtemata(temata);
const vybrane = filtr.length ? vse.filter((p) => filtr.some((f) => p.rocnik.includes(f) || p.klic.includes(f))) : vse;

if (!vybrane.length) {
	console.log(`Filtru „${filtr.join(' ')}" neodpovídá žádné podtéma.`);
	console.log('Klíče ročníků: ' + Object.keys(temata).join(', '));
	process.exit(1);
}

const bez = vybrane.filter((p) => {
	const n = nazornost(p);
	return !n.simulace && !n.obrazek && !n.video;
});

console.log(`Podtémat: ${vybrane.length}`);
console.log(`Bez jakékoli názornosti (simulace / infografika / video): ${bez.length}\n`);

let posledni = null;
for (const p of bez) {
	if (`${p.rocnik}/${p.celek}` !== posledni) {
		console.log(`\n[${p.rocnik}] ${p.celek}`);
		posledni = `${p.rocnik}/${p.celek}`;
	}
	const n = nazornost(p);
	const dodatky = [n.odkazy ? `odkazů: ${n.odkazy}` : '', n.zvuk ? 'má zvuk' : ''].filter(Boolean);
	console.log(`   ${p.slug}${dodatky.length ? ' (' + dodatky.join(', ') + ')' : ''}`);
}

console.log('\n--- souhrn po ročnících ---');
const podleR = {};
for (const p of vse) {
	const n = nazornost(p);
	podleR[p.rocnik] ??= { celkem: 0, bez: 0, simulace: 0, materialy: 0 };
	const s = podleR[p.rocnik];
	s.celkem++;
	if (n.simulace) s.simulace++;
	if (n.obrazek || n.video) s.materialy++;
	if (!n.simulace && !n.obrazek && !n.video) s.bez++;
}
for (const [k, v] of Object.entries(podleR)) {
	console.log(`${k.padEnd(26)} bez názornosti ${String(v.bez).padStart(3)} z ${String(v.celkem).padStart(3)}   (simulaci má ${v.simulace}, obrázek/video ${v.materialy})`);
}

// Která podtémata mají příliš krátký výklad?
//
// Z auditu 31. 7. 2026: informatika má nejkratší výklady na webu (medián ~700 znaků)
// a 39 podtémat má simulaci, ale výklad pod 1200 znaků — energie šla do simulací
// místo do textu. Krátký výklad znamená, že se žák ze stránky nedozví dost na to,
// aby zvládl kvíz.
//
// Měří se čistý TEXT bez HTML značek (jinak by `<strong>` nafukoval délku).
// Spuštění: node testy/kratke-vyklady.mjs [mez] [část klíče]
import { nactiData, vsechnaPodtemata, nazornost } from './data.mjs';

const MEZ = Number(process.argv[2]) || 700;
const filtr = process.argv[3] ?? '';

const { temata } = await nactiData();
const kratke = [];

for (const pod of vsechnaPodtemata(temata)) {
	if (!pod.klic.includes(filtr)) continue;
	// shrnutí jsou rozcestníky — dlouhý výklad tam nepatří
	if (pod.klic.includes('/shrnuti/')) continue;
	const text = String(pod.obsah ?? '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	if (text.length >= MEZ) continue;
	const n = nazornost(pod);
	kratke.push({ klic: pod.klic, delka: text.length, simulace: n.simulace });
}

kratke.sort((a, b) => a.delka - b.delka);
for (const k of kratke) {
	console.log(`${String(k.delka).padStart(4)} znaků ${k.simulace ? '(má simulaci)' : '              '} ${k.klic}`);
}
console.log(`\nVýkladů pod ${MEZ} znaků: ${kratke.length}`);

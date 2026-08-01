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
	// „Hluchá stránka" = ani obrázek, ani video, ani simulace — A K TOMU krátký výklad.
	// Žák tam nemá ani co číst, ani na co koukat, a přesto od něj kvíz něco chce.
	// Nezávislý audit 1. 8. 2026 to označil za největší zbývající díru webu.
	kratke.push({ klic: pod.klic, delka: text.length, simulace: n.simulace, hlucha: !n.simulace && !n.obrazek && !n.video });
}

kratke.sort((a, b) => a.delka - b.delka);
for (const k of kratke) {
	const znacka = k.hlucha ? '🕳 HLUCHÁ    ' : k.simulace ? '(má simulaci)' : '             ';
	console.log(`${String(k.delka).padStart(4)} znaků ${znacka} ${k.klic}`);
}
const hluchych = kratke.filter((k) => k.hlucha).length;
console.log(`\nVýkladů pod ${MEZ} znaků: ${kratke.length} — z toho HLUCHÝCH stránek (bez názornosti): ${hluchych}`);
console.log('Tip: `node testy/kratke-vyklady.mjs 1200` ukáže celou díru, jak ji vidí audit.');

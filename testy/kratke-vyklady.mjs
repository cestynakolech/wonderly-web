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

/** Čistý text výkladu bez HTML značek. Bez tohoto kroku by `<strong>` nafukoval délku
 *  a krátká stránka by vypadala jako dlouhá. */
export function cistyText(obsah) {
	return String(obsah ?? '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/** „Hluchá stránka" = krátký výklad A ZÁROVEŇ ani obrázek, ani video, ani simulace.
 *  Vytaženo jako funkce kvůli obousměrnému ověření (viz testy/obousmerne.json) —
 *  dokud byla logika jen uvnitř skriptu, nedal se měřidlu podvrhnout vstup. */
export function jeHlucha(pod, mez) {
	const n = nazornost(pod);
	return cistyText(pod.obsah).length < mez && !n.simulace && !n.obrazek && !n.video;
}

// Skript se spustí, jen když ho někdo zavolá z příkazové řádky. Do 2. 8. 2026 běžel
// i při IMPORTU, takže obousměrný test měřidla by při každém běhu vypsal celý přehled
// stránek — a nikdo by v tom nález nenašel.
if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const MEZ = Number(process.argv[2]) || 700;
	const filtr = process.argv[3] ?? '';

	const { temata } = await nactiData();
	const kratke = [];

	for (const pod of vsechnaPodtemata(temata)) {
		if (!pod.klic.includes(filtr)) continue;
		// shrnutí jsou rozcestníky — dlouhý výklad tam nepatří
		if (pod.klic.includes('/shrnuti/')) continue;
		const text = cistyText(pod.obsah);
		if (text.length >= MEZ) continue;
		const n = nazornost(pod);
		// „Hluchá stránka" = ani obrázek, ani video, ani simulace — A K TOMU krátký výklad.
		// Žák tam nemá ani co číst, ani na co koukat, a přesto od něj kvíz něco chce.
		// Nezávislý audit 1. 8. 2026 to označil za největší zbývající díru webu.
		kratke.push({ klic: pod.klic, delka: text.length, simulace: n.simulace, hlucha: jeHlucha(pod, MEZ) });
	}

	kratke.sort((a, b) => a.delka - b.delka);
	for (const k of kratke) {
		const znacka = k.hlucha ? '🕳 HLUCHÁ    ' : k.simulace ? '(má simulaci)' : '             ';
		console.log(`${String(k.delka).padStart(4)} znaků ${znacka} ${k.klic}`);
	}
	const hluchych = kratke.filter((k) => k.hlucha).length;
	console.log(`\nVýkladů pod ${MEZ} znaků: ${kratke.length} — z toho HLUCHÝCH stránek (bez názornosti): ${hluchych}`);
	console.log('Tip: `node testy/kratke-vyklady.mjs 1200` ukáže celou díru, jak ji vidí audit.');
}

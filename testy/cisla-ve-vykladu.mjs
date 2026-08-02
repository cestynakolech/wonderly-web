// Ptá se kvíz na číslo, které na stránce vůbec není?
//
// Z auditu 31. 7. 2026 (bod „levné strojové kontroly"): u některých otázek je ve
// SPRÁVNÉ odpovědi číslo, které se ve výkladu téhož podtématu nikde nevyskytuje —
// žák, který se poctivě učil ze stránky, ho nemá odkud vzít. Buď patří do výkladu,
// nebo otázka do jiného podtématu.
//
// Čte skutečná data (esbuild → import), ne text souboru.
//
// Spuštění: node testy/cisla-ve-vykladu.mjs [část klíče]
import { nactiData, vsechnaPodtemata } from './data.mjs';

/** Čísla z textu; „4 200" a „4200" je totéž, desetinná čárka i tečka se sjednotí. */
function cisla(text) {
	const bezMezer = String(text).replace(/(\d)[  ](?=\d)/g, '$1');
	return [...bezMezer.matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0].replace(',', '.'));
}

/**
 * Malá čísla přeskakujeme: jedničky až desítky bývají v odpovědích jako počty
 * („tři druhy čípků"), ne jako údaj k zapamatování, a hlásily by se pořád.
 * Zajímavá jsou čísla, která si žák musí odněkud vzít — 4200, 1013, 235…
 */
const MALE = 12;

// Volitelný parametr `data` slouží OBOUSMĚRNÉMU OVĚŘENÍ: bez něj se měřidlu nedá
// podvrhnout vstup, a proto u něj nikdy nevznikl důkaz, že podvrh opravdu najde
// (nález dlouhodobého auditu 2. 8. 2026).
export async function zkontrolujCislaVeVykladu(data) {
	const { kvizy, temata } = data ?? (await nactiData());
	const podleKlice = new Map(vsechnaPodtemata(temata).map((p) => [p.klic, p]));
	const nalezy = [];

	for (const [klic, otazky] of Object.entries(kvizy)) {
		const pod = podleKlice.get(klic);
		if (!pod || !Array.isArray(otazky)) continue;
		// Shrnutí nemá vlastní výklad — otázky se do něj skládají z jiných podtémat,
		// takže by se hlásilo pořád (první verze měřidla to dělala).
		if (klic.includes('/shrnuti/')) continue;
		// výklad + znění otázky se počítají jako „na stránce“; materiály a odkazy ne
		const vyklad = cisla(pod.obsah ?? '');
		for (const o of otazky) {
			const spravna = (o.odpovedi ?? [])[0];
			if (!spravna) continue;
			const vZadani = cisla(o.text ?? '');
			// Početní úloha: když jsou v ZADÁNÍ nějaká čísla, je odpověď VÝSLEDEK, který
			// si žák spočítá — ve výkladu být nemá a nemá smysl ho tam hlásit. První
			// verze měřidla je hlásila a dělala tím 20 falešných poplachů z 34 nálezů.
			if (vZadani.length) continue;
			for (const c of cisla(spravna)) {
				if (Number(c) <= MALE) continue;
				if (vyklad.includes(c)) continue;
				nalezy.push({ klic, cislo: c, otazka: String(o.text).slice(0, 70), odpoved: String(spravna).slice(0, 50) });
			}
		}
	}
	return nalezy;
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const filtr = process.argv[2] ?? '';
	const nalezy = (await zkontrolujCislaVeVykladu()).filter((n) => n.klic.includes(filtr));
	for (const n of nalezy) {
		console.log(`❌ ${n.klic}\n   číslo ${n.cislo} není ve výkladu — „${n.otazka}" → ${n.odpoved}`);
	}
	console.log(`\nNálezů: ${nalezy.length}`);
	process.exit(0);
}

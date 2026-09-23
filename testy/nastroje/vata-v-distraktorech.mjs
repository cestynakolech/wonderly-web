// PŘESUNUTO 23. 9. 2026 z testy/ do testy/nastroje/: zkontroluj.mjs (bod 6h,
// "kdo hlídá hlídače") sbírá do rejstříku obousměrných dokladů AUTOMATICKY
// VŠECHNY .mjs soubory přímo v testy/ (testy/obousmerne.mjs → seznamMeridel(),
// readdirSync BEZ rekurze do podsložek). Tohle měřidlo vzniklo 23. 9. 2026 a
// samo hlásí 65 podezřelých bloků ze 166 s vadnými distraktory — bylo výslovně
// zadáno NEZAPOJOVAT ho do brány, dokud se bloky neopraví (dnes hotovo 7 z 65),
// jenže pouhým uložením do testy/ se zapojilo samo a shodilo `node
// zkontroluj.mjs` i `npm run build` (chybějící doklad v testy/obousmerne.json).
// Podsložka testy/nastroje/ se v seznamMeridel() NEPROHLEDÁVÁ (funkce
// nerekurzuje), takže je měřidlo mimo bránu, ale spouští se ručně stejně jako
// dřív (jen s upravenou cestou, viz „Použití" níže).
// AŽ BUDE OPRAVENO VŠECH 65 BLOKŮ: přesunout zpátky do testy/ a doplnit doklad
// (podvrh + zdravý stav) do testy/obousmerne.json, ať se zapojí do brány natrvalo.
//
// Vata v distraktorech: hledá SYSTÉMOVOU nápovědu v kvízech, kterou žák umí
// zneužít bez znalosti fyziky — dvě varianty:
//
//   1) ABSOLUTNÍ SLOVA (vždy, nikdy, vůbec, žádný, ...) padají skoro výhradně
//      do ŠPATNÝCH odpovědí. Žák pak nemusí umět fyziku, stačí mu vyloučit
//      odpověď, která zní kategoricky/přehnaně.
//   2) SPRÁVNÁ ODPOVĚĎ JE „TA ODLIŠNÁ" — oba distraktory začínají stejným
//      prvním slovem (typicky „ano…"/„ano…") a správná odpověď začíná jinak.
//
// Nález, který měřidlo vyvolal (23. 9. 2026): nezávislý kontrolor ručně našel
// u bloku „klín" 9 a u bloku „kvarky" 4 výskytů absolutních slov výhradně
// v distraktorech — ani jeden ve správné odpovědi. Viz kalibrace níže.
//
// Čte SKUTEČNÁ DATA (esbuild import přes testy/data.mjs), ne regex nad textem
// souboru — z téhož důvodu jako ostatní testy/*.mjs (viz testy/README.md).
// Do src/data/ nic nezapisuje, jen čte.
//
// Použití (cesty od kořene wonderly-web):
//   node testy/nastroje/vata-v-distraktorech.mjs                 → celý web (kvizy.ts)
//   node testy/nastroje/vata-v-distraktorech.mjs jednoduche-stroje → jen bloky s tímto klíčem (detail)
//   node testy/nastroje/vata-v-distraktorech.mjs --md soubor.md   → PŘIDÁ bloky z připraveného
//        markdownu (fenced ```ts bloky se zápisem 'klíč': [ ...otázky... ],), aby šlo
//        změřit kvíz PŘED zápisem do kvizy.ts (kalibrační vzor: kviz-klin-kvarky.md)
//   lze kombinovat --md víckrát i s filtrem klíče

import { nactiData } from '../data.mjs';
import { readFileSync } from 'node:fs';

// --- 1) Slovník absolutních/kategorických slov -----------------------------
// Kořeny (ne přesné tvary) kvůli českému skloňování. Boundary řešíme přes
// Unicode vlastnost \p{L} (JS \b zná jen ASCII, na diakritice mlčky selže —
// "vůbec" by se \b vůbec nenašlo správně na obou stranách slova).
// Cíleně bez holého "jen" a "rozhodnout/rozhodnutí" — příliš časté/mnohoznačné,
// zvýšily by šum bez skutečné vypovídací hodnoty (viz komentáře u položek).
const ABSOLUTNI_KORENY = [
	['vžd', 'vždy/vždycky/vždyť'],
	['nikdy', 'nikdy'],
	['vůbec', 'vůbec'],
	['úpln', 'úplně/úplný/úplná/úplné'],
	['naprost', 'naprosto/naprostý'],
	['rozhodně', 'rozhodně (invariantní příslovce, ne "rozhodnutí")'],
	['stoprocentn', 'stoprocentně/stoprocentní'],
	['žádn', 'žádný/žádná/žádné/žádného/…'],
	['všech', 'všechny/všechna/všechno/všech'],
	['všem', 'všemi/všem/všemu (nepravidelné skloňování "všechen", "všech" ho nechytí)'],
	['pouze', 'pouze'],
	['jedin', 'jediný/jediná/jediné (bonus nad rámec zadání)'],
];
// Frázová položka (dvě slova) — hledá se samostatně.
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

function prvniSlovo(text) {
	return String(text ?? '')
		.trim()
		.split(/\s+/)[0]
		?.toLowerCase()
		.replace(/^[„"'(]+|[.,;:!?…"')]+$/g, '') ?? '';
}

// --- 2) Analýza jednoho bloku otázek ----------------------------------------
function analyzujBlok(otazky) {
	let correctHits = 0;
	let wrongHits = 0;
	let oddOneOutCount = 0;
	const detailVata = []; // otázky, kde vata je JEN v distraktorech
	const detailOdd = []; // otázky s "ta odlišná"
	let platnychOtazek = 0;

	for (const o of otazky ?? []) {
		const odp = (o?.odpovedi ?? []).map(String);
		if (odp.length < 2) continue;
		platnychOtazek++;
		const spravna = odp[0];
		const distraktory = odp.slice(1);

		const hitsSpravna = najdiVyskyty(spravna);
		const hitsWrong = distraktory.flatMap(najdiVyskyty);
		correctHits += hitsSpravna.length;
		wrongHits += hitsWrong.length;
		if (hitsWrong.length > 0 && hitsSpravna.length === 0) {
			detailVata.push({ text: o.text, koreny: hitsWrong.map((h) => h.slovo) });
		}

		if (distraktory.length >= 2) {
			const slovaDistr = distraktory.map(prvniSlovo);
			const slovoSpravne = prvniSlovo(spravna);
			for (let i = 0; i < slovaDistr.length; i++) {
				for (let j = i + 1; j < slovaDistr.length; j++) {
					if (slovaDistr[i] && slovaDistr[i] === slovaDistr[j] && slovaDistr[i] !== slovoSpravne) {
						oddOneOutCount++;
						detailOdd.push({ text: o.text, spolecneSlovo: slovaDistr[i] });
					}
				}
			}
		}
	}
	return { platnychOtazek, correctHits, wrongHits, oddOneOutCount, detailVata, detailOdd };
}

// --- 3) Načtení bloků z připraveného markdownu (kalibrace / kontrola PŘED zápisem) ---
// Extrahuje fenced ```ts bloky a v nich zápisy 'klíč': [ ...pole otázek... ],
// Pole se PARSUJE (Function), ne regexem nad textem otázek — je to platný JS
// literál (jen bez okolního `export const kvizy = {...}`), takže jde bezpečně
// vyhodnotit jako výraz.
function nactiBlokyZMd(cesta) {
	const text = readFileSync(cesta, 'utf8');
	const bloky = new Map();
	const fenceRe = /```ts\n([\s\S]*?)\n```/g;
	let fm;
	while ((fm = fenceRe.exec(text))) {
		const kod = fm[1];
		const klicRe = /'([a-zA-Z0-9\/-]+)':\s*\[/g;
		let km;
		while ((km = klicRe.exec(kod))) {
			const klic = km[1];
			// najdi odpovídající uzavírací ']' počítáním hloubky (string-aware)
			let i = km.index + km[0].length - 1; // pozice '['
			let hloubka = 0;
			let vCteni = null; // aktivní uvozovka
			let konec = -1;
			for (; i < kod.length; i++) {
				const ch = kod[i];
				if (vCteni) {
					if (ch === '\\') { i++; continue; }
					if (ch === vCteni) vCteni = null;
					continue;
				}
				if (ch === "'" || ch === '"' || ch === '`') { vCteni = ch; continue; }
				if (ch === '[') hloubka++;
				else if (ch === ']') {
					hloubka--;
					if (hloubka === 0) { konec = i; break; }
				}
			}
			if (konec === -1) continue;
			const pole = kod.slice(km.index + km[0].length - 1, konec + 1);
			try {
				// eslint-disable-next-line no-new-func
				const otazky = new Function(`return (${pole});`)();
				bloky.set(klic, otazky);
			} catch (e) {
				console.error(`POZOR: blok „${klic}" v ${cesta} se nepodařilo vyhodnotit: ${e.message}`);
			}
		}
	}
	return bloky;
}

// --- 4) Hlavní běh -----------------------------------------------------------
async function main() {
	const args = process.argv.slice(2);
	const mdSoubory = [];
	const zbyvajici = [];
	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--md') { mdSoubory.push(args[++i]); continue; }
		zbyvajici.push(args[i]);
	}
	const filtr = zbyvajici[0] ?? '';

	const { kvizy } = await nactiData();
	const vsechnyBloky = new Map(Object.entries(kvizy));
	for (const cesta of mdSoubory) {
		for (const [klic, otazky] of nactiBlokyZMd(cesta)) vsechnyBloky.set(klic, otazky);
	}

	let celkemOtazek = 0;
	let celkemCorrectHits = 0;
	let celkemWrongHits = 0;
	const vysledky = [];
	for (const [klic, otazky] of vsechnyBloky) {
		if (!Array.isArray(otazky) || !otazky.length) continue;
		const r = analyzujBlok(otazky);
		if (!r.platnychOtazek) continue;
		celkemOtazek += r.platnychOtazek;
		celkemCorrectHits += r.correctHits;
		celkemWrongHits += r.wrongHits;
		vysledky.push({ klic, ...r });
	}

	// Podezřelé: absolutní slova padají do distraktorů aspoň 3×, do správné
	// odpovědi ani jednou. Práh 3 zvolen tak, aby ho oba kalibrační nálezy
	// (klín=9, kvarky=4) bezpečně přesáhly, ale ojedinělý 1-2× výskyt
	// (běžný v korektních otázkách, kde "vždy" prostě patří k fyzikálně
	// správnému chybnému tvrzení) se nehlásil jako systematická vada.
	const PRAH_VATA = 3;
	const PRAH_ODD = 3;
	const podezreleVata = vysledky
		.filter((v) => v.wrongHits >= PRAH_VATA && v.correctHits === 0)
		.sort((a, b) => b.wrongHits - a.wrongHits);
	const podezreleOdd = vysledky
		.filter((v) => v.oddOneOutCount >= PRAH_ODD)
		.sort((a, b) => b.oddOneOutCount - a.oddOneOutCount);

	const vybraneVata = filtr ? vysledky.filter((v) => v.klic.includes(filtr) && v.wrongHits + v.correctHits > 0) : podezreleVata;

	console.log(`Bloků změřeno: ${vysledky.length}, otázek: ${celkemOtazek}`);
	console.log(`Absolutní slova celkem: ${celkemCorrectHits} ve správných odpovědích, ${celkemWrongHits} v distraktorech.`);
	console.log(`\n=== VZOR 1: absolutní slova jen v distraktorech (práh ≥${PRAH_VATA}, správná=0) ===`);
	console.log(`Podezřelých bloků: ${podezreleVata.length}\n`);
	for (const v of vybraneVata) {
		console.log(`${v.klic}: distraktory ${v.wrongHits}× / správná 0× (${v.platnychOtazek} otázek)`);
		if (filtr) for (const d of v.detailVata) console.log(`   [${d.koreny.join(', ')}] „${String(d.text).slice(0, 70)}"`);
	}

	console.log(`\n=== VZOR 2: správná odpověď je „ta odlišná" (shodný první slovo distraktorů, práh ≥${PRAH_ODD}) ===`);
	console.log(`Podezřelých bloků: ${podezreleOdd.length}\n`);
	for (const v of filtr ? vysledky.filter((v) => v.klic.includes(filtr) && v.oddOneOutCount > 0) : podezreleOdd) {
		console.log(`${v.klic}: ${v.oddOneOutCount}× shoda distraktorů (${v.platnychOtazek} otázek)`);
		if (filtr) for (const d of v.detailOdd) console.log(`   [„${d.spolecneSlovo}…"] „${String(d.text).slice(0, 70)}"`);
	}

	process.exitCode = podezreleVata.length + podezreleOdd.length > 0 && zbyvajici.includes('--brana') ? 1 : 0;
}

await main();

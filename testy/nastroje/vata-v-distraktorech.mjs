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
// ZÚŽENÍ VZORŮ 3/4/5 (25. 9. 2026) — PROČ jsou prahy nastavené takhle a proč
// se NEMAJÍ „povolit", aby to hlásilo víc:
// Nezávislá kalibrace (ruční posouzení vzorku napříč ročníky) zjistila, že
// v distraktorech je CELKOVĚ asi 2× víc slov než ve správných odpovědích
// (naměřeno 12 274 : 24 426, tedy ~1:1,99). Jakýkoli holý poměr slov/výskytů
// mezi „správná" a „distraktory" je proto OČEKÁVANĚ vychýlený už z podstaty
// dat (distraktorů je na otázku typicky 2, správná je 1) — sám o sobě NENÍ
// důkaz systémové vady. Proto:
//   - VZOR 3 měří na úrovni OTÁZKY (kategorické slovo ve VŠECH distraktorech
//     a v ŽÁDNÉ správné), ne poměrem za blok — poměr 33:427 dřív vypadal
//     dramaticky, ale z 78 „podezřelých" bloků obstálo po ručním posouzení jen 5.
//   - VZOR 4 hlásí jako TVRDÝ nález jen dvě skutečně doložené podskupiny
//     (polarita ano/ne, kvantifikátor jen/pouze/vždy) — zbytek (v/ve, z/ze,
//     aby, protože…) byl v kalibraci téměř výhradně planý poplach.
//   - VZOR 5 v původní podobě (odlišná koncovka posledního slova) měl ~8 %
//     přesnost, protože ji vyvolávala i souměrná stavba věty (obě odpovědi
//     končí týmž slovem) — nahrazen měřením neshody s tázacím slovem.
// Kdo bude prahy příště upravovat: NEZVYŠUJ citlivost bez nové kalibrace —
// vyšší citlivost tady znamená víc planých poplachů, ne víc skutečných vad.
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

// --- 1b) NOVÉ (25. 9. 2026): kategorická slova pro VZOR 3 -------------------
// Nezávislá kontrola doložila, že holé "jen" (cíleně vynechané z ABSOLUTNI_KORENY
// výše — viz komentář nad tím polem) je ve špatných odpovědích 436×, ve
// správných jen 35×, a nástroj to dosud neměřil. Tady je proto SAMOSTATNÝ
// slovník (nesahá na VZOR 1/2), který mimo "jen" měří i další kategorická
// slova ze zadání. presneTvar=true znamená hledat CELÉ slovo (levá i pravá
// hranice) — u "jen" je to nutné, jinak by se počítalo i "jenže"/"jenom" coby
// jiné slovo. presneTvar=false = kořen (levá hranice), stejný styl jako VZOR 1,
// kvůli českému skloňování.
const KATEGORICKA_SLOVA = [
	['jen', 'jen', true],
	['pouze', 'pouze', true],
	['vžd', 'vždy/vždycky/vždyť', false],
	['nikdy', 'nikdy', true],
	['všech', 'všechny/všechna/všechno/všech', false],
	['žádn', 'žádný/žádná/žádné/žádného/…', false],
	['vešker', 'veškerý/veškerá/veškeré/veškerého/…', false],
	['výhradn', 'výhradně/výhradní', false],
	['mus', 'musí/muset/museli/musíš/…', false],
	['nesm', 'nesmí/nesměl/nesmíš/…', false],
];

function spocitejKategorickaSlova(text) {
	const s = String(text ?? '');
	const vysledek = new Map(); // kořen -> počet
	for (const [koren, , presne] of KATEGORICKA_SLOVA) {
		const pravaHranice = presne ? '(?![\\p{L}])' : '';
		const re = new RegExp(`(?<![\\p{L}])${koren}${pravaHranice}`, 'giu');
		const m = s.match(re);
		if (m) vysledek.set(koren, (vysledek.get(koren) ?? 0) + m.length);
	}
	return vysledek;
}

function pripoctiMapu(cil, zdroj) {
	for (const [k, v] of zdroj) cil.set(k, (cil.get(k) ?? 0) + v);
}

// Počet výskytů JEDNOHO kořene v textu (stejná pravá/levá hranice jako
// spocitejKategorickaSlova výše, ale pro jedno slovo — používá VZOR 3
// na úrovni otázky).
function pocetVyskytuSlova(text, koren, presne) {
	const pravaHranice = presne ? '(?![\\p{L}])' : '';
	const re = new RegExp(`(?<![\\p{L}])${koren}${pravaHranice}`, 'giu');
	const m = String(text ?? '').match(re);
	return m ? m.length : 0;
}

function pocetSlov(text) {
	return String(text ?? '').trim().split(/\s+/).filter(Boolean).length;
}

// --- 1c) NOVÉ (25. 9. 2026): normalizace + podskupiny pro VZOR 4 a VZOR 5 ---
// Předložky/spojky, které se liší jen kvůli výslovnosti (v/ve, z/ze, s/se,
// k/ke) nebo tvaru (aby/abych/abys/abychom/abyste), se pro porovnání prvního
// slova sjednotí — jinak by se počítaly jako „jiné" slovo, ačkoli jde
// o totéž. Beze změny zůstávají VZOR 1/2 (počítají se ze SUROVÝCH slov).
const MAPA_PREDLOZEK = {
	've': 'v', 'v': 'v',
	'ze': 'z', 'z': 'z',
	'se': 's', 's': 's',
	'ke': 'k', 'k': 'k',
	'aby': 'aby', 'abych': 'aby', 'abys': 'aby', 'abychom': 'aby', 'abyste': 'aby',
};
function normalizujPredlozku(slovo) {
	return MAPA_PREDLOZEK[slovo] ?? slovo;
}
function jeCisloNeboKod(slovo) {
	return /\d/.test(String(slovo ?? ''));
}

// VZOR 4 — jediné dvě podskupiny, které kalibrace (25. 9. 2026) potvrdila
// jako skutečnou nápovědu (31, resp. 54 otázek). Zbytek (protože, v/ve,
// aby…) je plané a hlásí ho jen VZOR 2 (blokový práh ≥3).
const POLARITA_SLOVA = ['ano', 'ne'];
const KVANTIFIKATOR_SLOVA = ['jen', 'pouze', 'vždy'];

// VZOR 5 — tázací slovo na začátku otázky a jemu odpovídající předložka(y),
// kterými má (gramaticky) začínat odpověď. Zúženo na tři doložené případy.
const TAZACI_SLOVA = [
	{ nazev: 'Z čeho', re: /^z\s+čeho\b/i, ocekavane: ['z'] },
	{ nazev: 'Čím', re: /^čím\b/i, ocekavane: ['s'] },
	{ nazev: 'Kde', re: /^kde\b/i, ocekavane: ['v', 'na', 'u', 'pod', 'nad', 'za', 'před', 'mezi'] },
];

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

// Poslední slovo odpovědi (bez koncové interpunkce) — používá VZOR 5 pro
// vyřazení případů, kde všechny distraktory končí týmž slovem (souměrná
// stavba věty, ne skutečná nápověda — viz kalibrace 25. 9. 2026 v hlavičce).
function posledniSlovo(text) {
	const cleaned = String(text ?? '')
		.trim()
		.replace(/[.,;:!?…"')]+$/g, '');
	const parts = cleaned.split(/\s+/);
	return (parts[parts.length - 1] ?? '').toLowerCase();
}

// --- 2) Analýza jednoho bloku otázek ----------------------------------------
function analyzujBlok(otazky) {
	let correctHits = 0;
	let wrongHits = 0;
	let oddOneOutCount = 0;
	const detailVata = []; // otázky, kde vata je JEN v distraktorech
	const detailOdd = []; // otázky s "ta odlišná"
	let platnychOtazek = 0;

	// VZOR 3 — kategorická slova (jen/pouze/vždy/…): globální poměr za blok
	// (jen informativní, viz main()) a NOVĚ (25. 9. 2026, ZÚŽENO) tvrdý nález
	// na úrovni OTÁZKY.
	const katCorrect = new Map();
	const katWrong = new Map();
	let vzor3QCount = 0;
	const detailVzor3 = [];

	// VZOR 4 — ZÚŽENO (25. 9. 2026): tvrdý nález jen pro dvě podskupiny.
	let polaritaCount = 0;
	const detailPolarita = [];
	let kvantCount = 0;
	const detailKvant = [];

	// VZOR 5 — PŘEPSÁNO (25. 9. 2026): neshoda s tázacím slovem.
	let tazaciCount = 0;
	const detailTazaci = [];

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

		// VZOR 3 — globální poměr za blok (informativní, viz main())
		pripoctiMapu(katCorrect, spocitejKategorickaSlova(spravna));
		for (const d of distraktory) pripoctiMapu(katWrong, spocitejKategorickaSlova(d));

		// VZOR 3 — ZÚŽENO: tvrdý nález na úrovni otázky. Kategorické slovo musí
		// být ve VŠECH distraktorech a v ŽÁDNÉ správné odpovědi.
		const zasazenaSlovaVzor3 = [];
		for (const [koren, popis, presne] of KATEGORICKA_SLOVA) {
			if (pocetVyskytuSlova(spravna, koren, presne) > 0) continue;
			if (distraktory.every((d) => pocetVyskytuSlova(d, koren, presne) > 0)) {
				zasazenaSlovaVzor3.push(popis);
			}
		}
		if (zasazenaSlovaVzor3.length) {
			vzor3QCount++;
			detailVzor3.push({ text: o.text, slova: zasazenaSlovaVzor3 });
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

			// VZOR 4 — ZÚŽENO: totéž porovnání prvního slova, ale po normalizaci
			// předložek/spojek a bez číslic/kódu, a jako TVRDÝ nález se počítá
			// jen shoda na polaritě (ano/ne) nebo kvantifikátoru (jen/pouze/vždy).
			// Zbytek (v/ve, z/ze, aby, protože…) se zde záměrně NEPOČÍTÁ — je
			// pokrytý VZOR 2 výše (blokový práh ≥3), viz hlavička souboru.
			if (!jeCisloNeboKod(slovoSpravne) && !slovaDistr.some(jeCisloNeboKod)) {
				const distrNorm = slovaDistr.map(normalizujPredlozku);
				const spravnaNorm = normalizujPredlozku(slovoSpravne);
				for (let i = 0; i < distrNorm.length; i++) {
					for (let j = i + 1; j < distrNorm.length; j++) {
						if (distrNorm[i] && distrNorm[i] === distrNorm[j] && distrNorm[i] !== spravnaNorm) {
							if (POLARITA_SLOVA.includes(distrNorm[i])) {
								polaritaCount++;
								detailPolarita.push({ text: o.text, slovo: distrNorm[i] });
							} else if (KVANTIFIKATOR_SLOVA.includes(distrNorm[i])) {
								kvantCount++;
								detailKvant.push({ text: o.text, slovo: distrNorm[i] });
							}
						}
					}
				}
			}
		}

		// VZOR 5 — PŘEPSÁNO: neshoda s tázacím slovem (Kde/Z čeho/Čím). Vyřazuje
		// čísla/kód, odpovědi o ≤2 slovech a případy, kde distraktory končí
		// týmž slovem (souměrná stavba věty, ne skutečná nápověda).
		const tazaciShoda = TAZACI_SLOVA.find((t) => t.re.test(String(o.text ?? '').trim()));
		if (tazaciShoda && distraktory.length >= 1) {
			const vsechnyOdpovedi = [spravna, ...distraktory];
			const vsechnyDostDlouhe = vsechnyOdpovedi.every((t) => pocetSlov(t) > 2);
			const posledniDistr = distraktory.map(posledniSlovo);
			const shodneKoncoveSlovoDistraktoru =
				posledniDistr.length > 1 && posledniDistr.every((w) => w === posledniDistr[0]);
			const prvniSpravna = prvniSlovo(spravna);
			const prvniDistr = distraktory.map(prvniSlovo);
			const maCisloKod = jeCisloNeboKod(prvniSpravna) || prvniDistr.some(jeCisloNeboKod);
			if (vsechnyDostDlouhe && !shodneKoncoveSlovoDistraktoru && !maCisloKod) {
				const normSpravna = normalizujPredlozku(prvniSpravna);
				if (tazaciShoda.ocekavane.includes(normSpravna)) {
					const normDistr = prvniDistr.map(normalizujPredlozku);
					if (!normDistr.includes(normSpravna)) {
						tazaciCount++;
						detailTazaci.push({ text: o.text, predlozka: normSpravna, tazaci: tazaciShoda.nazev });
					}
				}
			}
		}
	}
	return {
		platnychOtazek,
		correctHits,
		wrongHits,
		oddOneOutCount,
		detailVata,
		detailOdd,
		katCorrect,
		katWrong,
		vzor3QCount,
		detailVzor3,
		polaritaCount,
		detailPolarita,
		kvantCount,
		detailKvant,
		tazaciCount,
		detailTazaci,
	};
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
	const katCorrectCelkem = new Map();
	const katWrongCelkem = new Map();
	const vysledky = [];
	for (const [klic, otazky] of vsechnyBloky) {
		if (!Array.isArray(otazky) || !otazky.length) continue;
		const r = analyzujBlok(otazky);
		if (!r.platnychOtazek) continue;
		celkemOtazek += r.platnychOtazek;
		celkemCorrectHits += r.correctHits;
		celkemWrongHits += r.wrongHits;
		pripoctiMapu(katCorrectCelkem, r.katCorrect);
		pripoctiMapu(katWrongCelkem, r.katWrong);
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

	// === VZORY 3/4/5 ZÚŽENÉ (25. 9. 2026) — viz kalibrace v hlavičce souboru. ===
	// Vypisují se ZVLÁŠŤ, do exitCode/brány NEVSTUPUJÍ (měřidlo, ne brána).

	// VZOR 3 — ZÚŽENO: tvrdý nález jen na úrovni OTÁZKY (kategorické slovo ve
	// VŠECH distraktorech a v ŽÁDNÉ správné odpovědi). Globální poměr za celý
	// soubor se vypisuje ZVLÁŠŤ a jen informativně — NENÍ sám o sobě důkaz
	// (v distraktorech je celkem ~2× víc slov než ve správných, viz hlavička).
	console.log(`\n=== VZOR 3: informativní poměr kategorických slov (NENÍ důkaz, základ ~1:2 — viz hlavička) ===`);
	for (const [koren, popis] of KATEGORICKA_SLOVA) {
		const c = katCorrectCelkem.get(koren) ?? 0;
		const w = katWrongCelkem.get(koren) ?? 0;
		console.log(`   ${popis}: ${c} : ${w}`);
	}
	console.log(`\n=== VZOR 3 (ZÚŽENO): kategorické slovo ve VŠECH distraktorech a v ŽÁDNÉ správné odpovědi (tvrdý nález, úroveň otázky) ===`);
	const otazkyVzor3 = vysledky.filter((v) => v.vzor3QCount > 0);
	console.log(`Bloků s nálezem: ${otazkyVzor3.length}, otázek celkem: ${otazkyVzor3.reduce((s, v) => s + v.vzor3QCount, 0)}\n`);
	for (const v of filtr ? vysledky.filter((v) => v.klic.includes(filtr) && v.vzor3QCount > 0) : otazkyVzor3) {
		console.log(`${v.klic}: ${v.vzor3QCount}× (${v.platnychOtazek} otázek)`);
		for (const d of v.detailVzor3) console.log(`   [${d.slova.join(', ')}] „${String(d.text).slice(0, 70)}"`);
	}

	// VZOR 4 — ZÚŽENO: tvrdý nález jen pro dvě doložené podskupiny. Zbytek
	// (v/ve, z/ze, aby, protože…) hlásí jen VZOR 2 výše (blokový práh ≥3).
	console.log(`\n=== VZOR 4a (ZÚŽENO): polarita „ano/ne" — správná odpověď je ta odlišná ===`);
	const otazkyPolarita = vysledky.filter((v) => v.polaritaCount > 0);
	console.log(`Bloků s nálezem: ${otazkyPolarita.length}, otázek celkem: ${otazkyPolarita.reduce((s, v) => s + v.polaritaCount, 0)}\n`);
	for (const v of otazkyPolarita) {
		console.log(`${v.klic}: ${v.polaritaCount}× (${v.platnychOtazek} otázek)`);
		for (const d of v.detailPolarita) console.log(`   [„${d.slovo}…"] „${String(d.text).slice(0, 70)}"`);
	}

	console.log(`\n=== VZOR 4b (ZÚŽENO): kvantifikátor (jen/pouze/vždy) — správná odpověď je ta odlišná ===`);
	const otazkyKvant = vysledky.filter((v) => v.kvantCount > 0);
	console.log(`Bloků s nálezem: ${otazkyKvant.length}, otázek celkem: ${otazkyKvant.reduce((s, v) => s + v.kvantCount, 0)}\n`);
	for (const v of otazkyKvant) {
		console.log(`${v.klic}: ${v.kvantCount}× (${v.platnychOtazek} otázek)`);
		for (const d of v.detailKvant) console.log(`   [„${d.slovo}…"] „${String(d.text).slice(0, 70)}"`);
	}
	console.log('\nZbytek (v/ve, z/ze, aby, protože…) se jako tvrdý nález nehlásí — je plané, viz kalibrace v hlavičce. Hlásí ho jen VZOR 2 výše.');

	// VZOR 5 — PŘEPSÁNO: neshoda s tázacím slovem (Kde/Z čeho/Čím) — jen
	// správná odpověď začíná odpovídající předložkou, distraktory ne.
	console.log(`\n=== VZOR 5 (PŘEPSÁNO): neshoda s tázacím slovem (Kde/Z čeho/Čím) ===`);
	const otazkyTazaci = vysledky.filter((v) => v.tazaciCount > 0);
	console.log(`Bloků s nálezem: ${otazkyTazaci.length}, otázek celkem: ${otazkyTazaci.reduce((s, v) => s + v.tazaciCount, 0)}\n`);
	for (const v of otazkyTazaci) {
		console.log(`${v.klic}: ${v.tazaciCount}× (${v.platnychOtazek} otázek)`);
		for (const d of v.detailTazaci) console.log(`   [${d.tazaci} → „${d.predlozka}…"] „${String(d.text).slice(0, 70)}"`);
	}

	process.exitCode = podezreleVata.length + podezreleOdd.length > 0 && zbyvajici.includes('--brana') ? 1 : 0;
}

await main();

// Vazby MEZI otázkami jednoho kvízového bloku — duplicity a úniky odpovědí.
//
// Proč to existuje (audit 2. 8. 2026, tři nezávislí auditoři):
// Dvě vady se v záznamech opakují od 29. 7. pořád dokola a obě se dosud hledaly RUČNĚ:
//
//  1. DUPLICITNÍ PÁRY OTÁZEK — bloky vznikaly slepením dvou dávek, takže se v devíti
//     blocích našly 3–4 duplicitní páry z 10 otázek (31. 7.), u LED displeje 4 z 10.
//     Pravidlo proti tomu v rejstříku vůbec nebylo.
//  2. ÚNIK ODPOVĚDI — vysvětlení jedné otázky odpovídá na otázku jinou; žák, který se
//     splete u vlhkoměru, dostane zadarmo odpověď o anemometru (31. 7.). Nejhorší je,
//     že tuhle vadu ZANÁŠEJÍ SAMY OPRAVY: „druhé kolo odhalilo hlavně úniky, které
//     zanesly opravy z prvního kola".
//
// Pokyn „hledej to v každé dávce" tu selhával, protože se na něj v tempu zapomnělo.
// Tady je z toho počítání.
//
// POZOR na falešné poplachy (pravidlo: falešný poplach je horší než žádná kontrola).
// Všechny otázky v bloku jsou o jednom tématu, takže samotná shoda slov nic neznamená.
// Únik se proto hlásí, jen když platí OBOJÍ:
//   (a) v textu/vysvětlení otázky A jsou ROZLIŠUJÍCÍ slova správné odpovědi B — tedy
//       slova, kterými se správná odpověď B liší od svých vlastních distraktorů
//       (co je ve všech třech odpovědích B, nerozhoduje a nic neprozrazuje), a
//   (b) A zároveň ukazuje na TÉMA otázky B (sdílí s jejím zněním nosné slovo),
//       aby žák vůbec poznal, ke které otázce se ta informace hodí.
import { nactiData } from './data.mjs';

/** malá písmena, bez diakritiky, jen slova */
export function normalizuj(text) {
	return String(text ?? '')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

// Slova, která nenesou význam — bez nich by „jaké je" stačilo na shodu čehokoli.
// Exportované, aby si je mohlo půjčit křížové porovnání (testy/uniky-krizove.mjs)
// a nevznikal druhý, časem rozjetý seznam téhož.
export const STOP = new Set(
	('a i o u v s k z do na od po pro za pri při je jsou byl byla bylo bude co kdy kde jak jaka jake jaky jaky ktera ktere ktery ' +
		'se si to ten ta te tim tom tomu nez nebo ale tak take vsak proto ze aby kdyz ne ano musi muze ma mit jen jeste uz ' +
		'kolik cim cemu ceho cim jakou jakym jakych jednu jeden jedna dve tri prvni druhy treti')
		.split(' ')
		.filter(Boolean),
);

/** Množina nosných slov (≥ 4 znaky, mimo stopky). */
export function slova(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => s.length >= 4 && !STOP.has(s)),
	);
}

/**
 * Slova pro POROVNÁNÍ DVOU ZNĚNÍ — na rozdíl od `slova()` bere i krátké tokeny s číslicí.
 *
 * První verze měřidla tohle neuměla a byl z toho rovnou falešný poplach: „Co platí
 * při 0 °C?" a „Co platí při 100 °C?" vyšly jako shoda 100 %, protože „0" i „100"
 * jsou kratší než 4 znaky a filtr je zahodil. Stejně tak „120 minut" × „36 minut",
 * „rychlost 2×" × „rychlost 3×" nebo „pod 16 Hz" × „nad 16 kHz". Právě čísla přitom
 * bývají to JEDINÉ, čím se dvě jinak stejně znějící otázky liší.
 */
export function slovaZneni(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => (s.length >= 4 || /[0-9]/.test(s)) && !STOP.has(s))
			// Kmen místo celého slova: čeština ohýbá koncovky, takže „jednotka" × „jednotkou"
			// a „tlak" × „tlaku" jsou pro porovnání znění TÁŽ věc. Bez toho vycházel překryv
			// dvou zjevně stejných otázek nulový a duplicitu bylo možné najít jen podle
			// shodné sady odpovědí — což je u výpočetních otázek („Kolik hodin je 120 minut?"
			// × „Kolik hodin je 7200 sekund?", obě „2 h") naopak zdroj falešných poplachů.
			// Čísla se nechávají celá, právě ona ty dvě úlohy odlišují.
			.map((s) => (/[0-9]/.test(s) ? s : s.slice(0, 4))),
	);
}

function jaccard(a, b) {
	if (!a.size || !b.size) return 0;
	let prunik = 0;
	for (const s of a) if (b.has(s)) prunik++;
	return prunik / (a.size + b.size - prunik);
}

/**
 * Rozlišující slova správné odpovědi: to, čím se liší od svých vlastních distraktorů.
 * Když je slovo ve všech odpovědích ("teplota" u všech tří), neprozrazuje nic.
 */
export function rozlisujiciSlova(otazka) {
	const odpovedi = otazka.odpovedi ?? [];
	if (odpovedi.length < 2) return new Set();
	const spravna = slova(odpovedi[0]);
	const ostatni = new Set();
	for (const o of odpovedi.slice(1)) for (const s of slova(o)) ostatni.add(s);
	return new Set([...spravna].filter((s) => !ostatni.has(s)));
}

/** Text, který žák uvidí u otázky A (zadání + vysvětlení po chybné odpovědi). */
function textOtazky(o) {
	return `${o.text ?? ''} ${o.vysvetleni ?? ''}`;
}

/**
 * Projde jeden blok otázek a vrátí nálezy.
 * @returns {{duplicity: Array, uniky: Array}}
 */
export function zkontrolujBlok(klic, otazky) {
	const duplicity = [];
	const uniky = [];
	if (!Array.isArray(otazky)) return { duplicity, uniky };

	const pripravene = otazky.map((o) => ({
		o,
		slovaTextu: slova(o.text),
		zneni: slovaZneni(o.text),
		slovaCele: slova(textOtazky(o)),
		rozlisujici: rozlisujiciSlova(o),
		odpovediNorm: (o.odpovedi ?? []).map((x) => normalizuj(x)).sort().join('|'),
		spravnaNorm: normalizuj((o.odpovedi ?? [])[0]),
	}));

	for (let i = 0; i < pripravene.length; i++) {
		for (let j = i + 1; j < pripravene.length; j++) {
			const A = pripravene[i];
			const B = pripravene[j];

			// --- DUPLICITA ---
			// PODMÍNKA, BEZ KTERÉ TO NEFUNGUJE: obě otázky mají TOTOŽNOU správnou odpověď.
			// Jinak to není duplicita, ale dvojice otázek na dvě různé věci — a přesně na
			// tom se první verze měřidla utopila ve falešných poplaších (11 z 13 nálezů byly
			// legitimní dvojice typu „polovodič typu N" × „typu P"). Když se správné odpovědi
			// liší, žák se z jedné otázky tu druhou nenaučí zodpovědět.
			// K tomu musí být podobné i ZNĚNÍ. Shodná sada odpovědí sama o sobě NESTAČÍ —
			// u výpočetních otázek je úplně běžná („Kolik hodin je 120 minut?" × „Kolik
			// hodin je 7200 sekund?", obě „2 h") a dělala falešné poplachy; snižuje proto
			// jen laťku na podobnost znění, nenahrazuje ji.
			const stejnaSpravna = A.spravnaNorm && A.spravnaNorm === B.spravnaNorm;
			const stejneOdpovedi = A.odpovediNorm && A.odpovediNorm === B.odpovediNorm;
			const shodaZneni = jaccard(A.zneni, B.zneni);
			const latka = stejneOdpovedi ? 0.5 : 0.75;
			if (stejnaSpravna && shodaZneni >= latka) {
				duplicity.push({
					klic,
					a: A.o.text,
					b: B.o.text,
					duvod: `stejná správná odpověď, shoda znění ${Math.round(shodaZneni * 100)} %${stejneOdpovedi ? ' i stejná sada odpovědí' : ''}`,
				});
			}

			// --- ÚNIK ODPOVĚDI (oběma směry) ---
			for (const [zdroj, cil] of [
				[A, B],
				[B, A],
			]) {
				if (!cil.rozlisujici.size) continue;
				const prozrazena = [...cil.rozlisujici].filter((s) => zdroj.slovaCele.has(s));
				// (a) dost rozlišujících slov cíle: dvě libovolná, nebo jedno dlouhé (≥ 8 znaků,
				//     takové slovo je samo o sobě odpověď — „kondenzace", „anemometr")
				const pokryti = prozrazena.length / cil.rozlisujici.size;
					const dostSlov = prozrazena.length >= 2 && pokryti >= 0.7;
				if (!dostSlov) continue;
				// (b) žák musí poznat, KE KTERÉ otázce to patří — sdílené nosné slovo se zněním cíle
				const spolecneTema = [...cil.slovaTextu].some((s) => zdroj.slovaCele.has(s));
				if (!spolecneTema) continue;
				uniky.push({
					klic,
					prozrazuje: zdroj.o.text,
					odpoved: (cil.o.odpovedi ?? [])[0],
					otazka: cil.o.text,
					slova: prozrazena,
				});
			}
		}
	}
	return { duplicity, uniky };
}

/** Projde všechny bloky webu. Souhrnná shrnutí se přeskakují — skládají se z týchž
 *  objektů otázek jako zdrojové bloky, takže by se každý nález počítal několikrát. */
export async function zkontrolujUniky(data) {
	const { kvizy } = data ?? (await nactiData());
	const duplicity = [];
	const uniky = [];
	let bloku = 0;
	let otazek = 0;
	let vynechano = 0;
	for (const [klic, otazky] of Object.entries(kvizy)) {
		if (!Array.isArray(otazky) || otazky.length < 2) continue;
		// Souhrnné bloky /shrnuti/ se skládají programově z už zkontrolovaných otázek —
		// kontrolovat je znovu by hlásilo tytéž nálezy dvakrát. Výluka musí být ve
		// výpisu PŘIZNANÁ číslem, ne dopočitatelná (nález auditu 4. 8. 2026).
		if (klic.includes('/shrnuti/')) {
			vynechano++;
			continue;
		}
		bloku++;
		otazek += otazky.length;
		const v = zkontrolujBlok(klic, otazky);
		duplicity.push(...v.duplicity);
		uniky.push(...v.uniky);
	}
	// Počítadlo vstupů: kontrola, která nic neprojde, musí být poznat (nález auditu —
	// „opatření platí jen na část případů a na tu druhou se tiše zapomene").
	return { duplicity, uniky, bloku, otazek, vynechano };
}

// Spuštění z příkazové řádky: `node testy/uniky.mjs [část-klíče]`
if (import.meta.url === `file://${process.argv[1]}`) {
	const filtr = process.argv[2];
	const v = await zkontrolujUniky();
	const vyber = (pole) => (filtr ? pole.filter((x) => x.klic.includes(filtr)) : pole);
	const dup = vyber(v.duplicity);
	const un = vyber(v.uniky);
	console.log(`Prošlo ${v.bloku} bloků / ${v.otazek} otázek.\n`);
	console.log(`DUPLICITNÍ PÁRY: ${dup.length}`);
	for (const d of dup) console.log(`  ${d.klic}\n    A: ${d.a}\n    B: ${d.b}\n    (${d.duvod})`);
	console.log(`\nÚNIKY ODPOVĚDÍ: ${un.length}`);
	for (const u of un) console.log(`  ${u.klic}\n    „${u.prozrazuje}"\n    → prozrazuje: ${u.odpoved}\n    (k otázce: ${u.otazka}; slova: ${u.slova.join(', ')})`);
}

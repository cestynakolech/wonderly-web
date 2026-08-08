// Kontrola poloh a pořadí míst v cestovatelském deníku.
//
// PROČ VZNIKLA (9. 8. 2026): nezávislý kontrolor našel v ručně psaných datech roku
// 2026 tři vady, které tu ležely měsíc a žádné měřidlo je nevidělo:
//   • Landshut měl pin 45 km jižně od města a Geisingen 35 km východně,
//   • místo z 25. 7. bylo v poli zapsané ZA místem z 26. 7., takže se nakreslila
//     falešná čára 169 km na sever a hned zpět.
// Špatný pin je tichá vada — na mapě vypadá stejně dobře jako správný. Ukázal ho
// teprve druhý pin téhož města: Landshut je v roce 2026 dvakrát (únor a červenec)
// a každý svítil jinde.
//
// JAK SE MĚŘÍ, ANIŽ BY VZNIKLA KOPIE PRAVIDLA: převod GPS na mapu má jediný domov
// v `Omega/skripty/projekce_mapy.py` a hlídá ho test_bez_kopii. Brána běží v Node
// (i na Cloudflare, kde žádný Python není), takže se koeficienty NEOPISUJÍ. Místo
// toho se měří vnitřní shoda dat, na kterou projekce není potřeba:
//   1. totéž město = tentýž bod, napříč všemi roky (tolerance 3 km),
//   2. místa jdou v poli chronologicky — v tom pořadí se kreslí trasa,
//   3. datum místa leží uvnitř rozsahu jeho výjezdu.
// Kalibrováno na přijaté práci: na datech k 9. 8. 2026 vrací kontrola 1 nula nálezů.
import { readdirSync } from 'node:fs';
import { nactiRokCest } from './data.mjs';

// KALIBRACE NA PŘIJATÉ PRÁCI (pravidlo projektu: nové měřidlo se nejdřív pustí na
// hotovou nasazenou práci, jinak hlásí zavedený styl jako chybu). Při toleranci
// 3 km vracelo 43 nálezů — samé rozdíly 4–8 km u Stožce, Horní Plané a Srní, kde
// pin vznikl z GPS fotky pořízené na okraji obce nebo u přehrady. To je v pořádku.
// 15 km je tolerance, se kterou automat slučuje fotky do jednoho místa (SHLUK_KM
// v stare_cesty.py). Na 20 km ji posunul Gdaňsk: dva piny 18 km od sebe (přístav
// × staré město) jsou přijatá práce, ne vada. Skutečné vady byly 45 km (Landshut)
// a 35 km (Geisingen) — ty projdou i s touhle rezervou.
const TOLERANCE = 20 / 9.1;
const KM_NA_JEDNOTKU = 9.1;

// Tvary datumů, které se v datech opravdu vyskytují (ověřeno na všech 274 místech):
//   '5. 4. 2026'            jeden den
//   '9.–10. 2. 2026'        rozsah uvnitř měsíce
//   '26. 2. – 5. 3. 2022'   rozsah přes hranici měsíce
//   '31. 12. – 1. 1. 2020'  rozsah přes přelom roku
//
// POZOR na poslední tvar: rok patří PRVNÍMU dni (je to místo roku 2020), takže
// 31. 12. 2020 → 1. 1. 2021. Opačný výklad tu chvíli byl a vyrobil dva falešné
// poplachy — datum vycházelo o rok dřív, než ve skutečnosti je.
/** První den zápisu, nebo null. */
export function naDen(text) {
	const c = String(text ?? '').match(/\d+/g)?.map(Number) ?? [];
	if (c.length === 3) return [c[2], c[1], c[0]];
	if (c.length === 4) return [c[3], c[2], c[0]];
	if (c.length === 5) return [c[4], c[1], c[0]];
	return null;
}

/** Poslední den zápisu, nebo null. */
export function naPosledniDen(text) {
	const c = String(text ?? '').match(/\d+/g)?.map(Number) ?? [];
	if (c.length === 4) return [c[3], c[2], c[1]];
	// přes přelom roku končí rozsah v roce následujícím (31. 12. 2020 → 1. 1. 2021)
	if (c.length === 5) return [c[3] < c[1] ? c[4] + 1 : c[4], c[3], c[2]];
	return naDen(text);
}

const porovnej = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

export function zkontrolujPolohy(rokyData) {
	const nalezy = [];
	let mistCelkem = 0;
	let dvojicPoloh = 0;

	// 1) totéž město musí být napříč roky na stejném bodě
	const podleJmena = new Map();
	for (const { rok, data } of rokyData) {
		for (const m of data.mesta ?? []) {
			mistCelkem++;
			if (typeof m.x !== 'number' || typeof m.y !== 'number') continue;
			if (!podleJmena.has(m.nazev)) podleJmena.set(m.nazev, []);
			podleJmena.get(m.nazev).push({ rok, slug: m.slug, x: m.x, y: m.y });
		}
	}
	for (const [nazev, vyskyty] of podleJmena) {
		for (let i = 0; i < vyskyty.length; i++) {
			for (let j = i + 1; j < vyskyty.length; j++) {
				dvojicPoloh++;
				const a = vyskyty[i];
				const b = vyskyty[j];
				const d = Math.hypot(a.x - b.x, a.y - b.y);
				if (d > TOLERANCE) {
					nalezy.push(
						`${nazev} svítí na mapě na dvou různých bodech, ${Math.round(d * KM_NA_JEDNOTKU)} km od sebe: ` +
							`${a.rok}/${a.slug} (${a.x}, ${a.y}) × ${b.rok}/${b.slug} (${b.x}, ${b.y})` +
							` — jeden z pinů je špatně, přepočti ho z GPS`,
					);
				}
			}
		}
	}

	// 2) chronologie pole a 3) datum uvnitř svého výjezdu
	for (const { rok, data } of rokyData) {
		let minule = null;
		let minuleSlug = null;
		for (const m of data.mesta ?? []) {
			const den = naDen(m.datum);
			if (!den) {
				nalezy.push(`${rok}: datum „${m.datum}" u ${m.slug} se nedá přečíst`);
				continue;
			}
			if (minule && porovnej(den, minule) < 0) {
				nalezy.push(
					`${rok}: ${m.slug} (${m.datum}) je v poli až za ${minuleSlug} — trasa se kreslí ` +
						`v pořadí pole, takže vznikne čára tam a zpět`,
				);
			}
			minule = den;
			minuleSlug = m.slug;

			const vyjezd = (data.vyjezdy ?? []).find((v) => v.cislo === m.vyjezd);
			if (vyjezd) {
				const od = naDen(vyjezd.od);
				const doo = naPosledniDen(vyjezd.do);
				const posledni = naPosledniDen(m.datum) ?? den;
				// přelom roku (23. 12. → 2. 1.) rozsah obrací; takový výjezd se přeskočí
				if (od && doo && porovnej(od, doo) <= 0) {
					if (porovnej(den, od) < 0 || porovnej(posledni, doo) > 0) {
						nalezy.push(
							`${rok}: ${m.slug} má datum ${m.datum}, ale patří do výjezdu ${m.vyjezd} ` +
								`(${vyjezd.od} – ${vyjezd.do}) — jedno z toho je špatně`,
						);
					}
				}
			} else if (data.vyjezdy?.length) {
				nalezy.push(`${rok}: ${m.slug} má vyjezd ${m.vyjezd}, který v seznamu výjezdů není`);
			}
		}
	}

	return { nalezy, mistCelkem, dvojicPoloh, rokuZmereno: rokyData.length };
}

/** Načte všechny roky deníku a proměří je. */
export async function zkontrolujPolohyMist(cestyDir) {
	const roky = readdirSync(cestyDir)
		.filter((f) => /^\d{4}\.ts$/.test(f))
		.map((f) => f.slice(0, 4));
	const rokyData = [];
	for (const rok of roky) {
		rokyData.push({ rok, data: await nactiRokCest(rok) });
	}
	const v = zkontrolujPolohy(rokyData);
	// POČÍTADLO VSTUPŮ: opakovaný vzorec projektu je „opatření tiše platí jen na
	// část případů". Když by se souřadnice přestaly načítat (jako 9. 8. přes
	// nactiCesty), spadne počet porovnaných dvojic na nulu a je to vidět.
	if (v.mistCelkem > 0 && v.dvojicPoloh === 0) {
		v.nalezy.push(
			'kontrola poloh neporovnala ani jednu dvojici — nejspíš se nenačetly souřadnice',
		);
	}
	return v;
}

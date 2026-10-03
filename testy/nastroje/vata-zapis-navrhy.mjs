// Zapíše do src/data/kvizy.ts jen NÁVRHY, které mají explicitní NEZÁVISLÉ
// SCHVÁLENÍ — „hotovo" od lokálního modelu (vata_navrhy.py, faze === 'hotovo')
// NENÍ schválení, je to jen návrh čekající na kontrolora. Schválení se čte
// z odděleného souboru (výchozí ~/Desktop/Omega/skripty/data/vata-schvaleni.json),
// klíč `${klic}#${qIndex}#${distraktorIndex}` -> true (nebo {schvaleno:true}).
// Bez schválení se položka NEZAPÍŠE, ať je „hotovo" nebo ne.
//
// Cílení: KAŽDÁ položka se zapisuje přesně na qIndex-tou otázku bloku podtématu
// a distraktorIndex-tý prvek jejího pole odpovedi — NE hledáním řetězce kdekoli
// v bloku (to by mohlo trefit jinou otázku se stejným textem distraktoru nebo
// i správnou odpověď). Otázky/objekty a pole se hledají string-aware počítáním
// hloubky závorek (respektuje uvozovky a escapování), stejně jako u ostatních
// nástrojů vata-*.
//
// Bezpečnostní pojistky (kterákoli položku PŘESKOČÍ, nic se nezapíše naslepo):
//  - distraktorIndex === 0 (to je správná odpověď) → přeskočit vždy
//  - text na cílovém indexu se musí PŘESNĚ shodovat s puvodniText z návrhu
//  - po dosazení návrhu nesmí vzniknout délková nápověda ani remíza o nejdelší
//    (maDelkovouNapovedu / maRemizuODelku z testy/data.mjs — stejná logika jako
//    testy/nastroje/vata-over-delku.mjs)
//  - po zápisu se znovu načtou SKUTEČNÁ data (esbuild import, ne regex) a ověří,
//    že se nezměnil text otázky ani správná odpověď (odpovedi[0]) u žádné
//    zapsané položky
//
// Výchozí režim je SUCHÝ BĚH — jen vypíše, co by udělal. Zápis do kvizy.ts
// proběhne jen s přepínačem --zapis. Pozor: suchý běh posuzuje délkovou
// kontrolu proti PŮVODNÍMU stavu pole odpovědí — pokud by se v jedné otázce
// zapsalo víc schválených položek najednou, výsledek se může od skutečného
// zápisu lišit (zápis kontroluje kumulativně, suchý běh ne).
//
// Cesta k repozitáři se odvozuje z umístění tohoto skriptu (ne natvrdo homedir),
// aby šlo bezpečně zkoušet na kopii repa.
//
// Použití:
//   node testy/nastroje/vata-zapis-navrhy.mjs [cesta-ke-stavu.json] [--zapis]
//     [--schvaleni=cesta-ke-schvaleni.json]

import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nactiData, maDelkovouNapovedu, maRemizuODelku } from '../data.mjs';

const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const KVIZY_TS = path.join(REPO_ROOT, 'src/data/kvizy.ts');

const args = process.argv.slice(2);
const ZAPIS = args.includes('--zapis');
const pozicniArgy = args.filter((a) => !a.startsWith('--'));
const stavCesta = pozicniArgy[0] || path.join(homedir(), 'Desktop/Omega/skripty/data/vata-navrhy-stav.json');
const schvaleniArg = args.find((a) => a.startsWith('--schvaleni='));
const schvaleniCesta = schvaleniArg
	? schvaleniArg.slice('--schvaleni='.length)
	: path.join(homedir(), 'Desktop/Omega/skripty/data/vata-schvaleni.json');

function klicSchvaleni(v) {
	return `${v.klic}#${v.qIndex}#${v.distraktorIndex}`;
}

function jeSchvaleno(schvaleni, v) {
	const zaznam = schvaleni[klicSchvaleni(v)];
	if (zaznam === true) return true;
	if (zaznam && typeof zaznam === 'object' && zaznam.schvaleno === true) return true;
	return false;
}

// --- string-aware pomocné funkce (respektují uvozovky a escapování) ---

/** Vrátí pole [start,end] (end = index uzavírací značky) pro top-level {..} nebo [..] bloky v textu. */
function topLevelZavorky(text, otevirak, zavirak) {
	const vysledek = [];
	let hloubka = 0;
	let start = -1;
	let vCteni = null;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (vCteni) {
			if (ch === '\\') { i++; continue; }
			if (ch === vCteni) vCteni = null;
			continue;
		}
		if (ch === "'" || ch === '"' || ch === '`') { vCteni = ch; continue; }
		if (ch === otevirak) {
			if (hloubka === 0) start = i;
			hloubka++;
		} else if (ch === zavirak) {
			hloubka--;
			if (hloubka === 0) vysledek.push([start, i]);
		}
	}
	return vysledek;
}

function najdiKonecPole(text, odKde) {
	const bloky = topLevelZavorky(text.slice(odKde), '[', ']');
	if (bloky.length === 0 || bloky[0][0] !== 0) return -1;
	return odKde + bloky[0][1];
}

/** Rozdělí obsah pole (mezi [ a ]) na jednotlivé uvozené řetězcové prvky. */
function rozdelPrvky(arrInner) {
	const prvky = [];
	let i = 0;
	while (i < arrInner.length) {
		const ch = arrInner[i];
		if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === ',') { i++; continue; }
		if (ch === "'" || ch === '"' || ch === '`') {
			const quote = ch;
			const zacatek = i;
			i++;
			while (i < arrInner.length) {
				if (arrInner[i] === '\\') { i += 2; continue; }
				if (arrInner[i] === quote) { i++; break; }
				i++;
			}
			const raw = arrInner.slice(zacatek, i);
			let hodnota;
			try {
				// eslint-disable-next-line no-new-func
				hodnota = new Function(`"use strict"; return (${raw});`)();
			} catch {
				hodnota = undefined;
			}
			prvky.push({ start: zacatek, end: i - 1, raw, hodnota });
			continue;
		}
		// nestringový prvek (nečekáme, ale nespadnout) — přeskočit do další čárky
		i++;
	}
	return prvky;
}

function jednoduchaUvozovka(str) {
	return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

/** Vzor pro klíč objektu, ať je zapsaný bez uvozovek, nebo v ', " či ` (odpovedi:, 'odpovedi':, "text": ...). */
function vzorKlice(nazev) {
	return new RegExp(`['"\`]?\\b${nazev}['"\`]?\\s*:\\s*`);
}

/** Přečte uvozený řetězcový literál začínající na/za pozicí odKde (přeskočí mezery). */
function najdiHodnotuRetezce(text, odKde) {
	let i = odKde;
	while (i < text.length && (text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r')) i++;
	const quote = text[i];
	if (quote !== "'" && quote !== '"' && quote !== '`') return null;
	const zacatek = i;
	i++;
	while (i < text.length) {
		if (text[i] === '\\') { i += 2; continue; }
		if (text[i] === quote) { i++; break; }
		i++;
	}
	const raw = text.slice(zacatek, i);
	let hodnota;
	try {
		// eslint-disable-next-line no-new-func
		hodnota = new Function(`"use strict"; return (${raw});`)();
	} catch {
		hodnota = undefined;
	}
	return { raw, hodnota, start: zacatek, end: i - 1 };
}

/** Najde v objText hodnotu řetězcového klíče (např. `text`), ať je klíč uvozený, nebo ne. */
function najdiHodnotuKlice(objText, nazevKlice) {
	const shoda = objText.match(vzorKlice(nazevKlice));
	if (!shoda) return null;
	return najdiHodnotuRetezce(objText, shoda.index + shoda[0].length);
}

// --- hlavní běh ---

const stav = JSON.parse(readFileSync(stavCesta, 'utf8'));
const hotovo = Object.values(stav).filter((v) => v.faze === 'hotovo');

let schvaleni = {};
try {
	schvaleni = JSON.parse(readFileSync(schvaleniCesta, 'utf8'));
} catch {
	schvaleni = {};
}

const byKlic = new Map();
for (const v of hotovo) {
	if (!byKlic.has(v.klic)) byKlic.set(v.klic, []);
	byKlic.get(v.klic).push(v);
}

let text = readFileSync(KVIZY_TS, 'utf8');
const { kvizy: kvizyData } = await nactiData();

// Souhrnné bloky (…/shrnuti/…) nejsou v kvizy.ts zapsané jako literál `'klíč': [`,
// ale skládá je slozSouhrnnyKviz() z OBJEKTŮ otázek zdrojových podtémat (tytéž
// objekty, ne kopie). Zápis do shrnutí proto = zápis do zdrojového literálního bloku.
// Překlad (klíč, qIndex) -> (zdrojový klíč, qIndex) jde přes identitu objektu v
// skutečných datech (stejná pravda jako testy/vypis-kviz.mjs); neexistující klíč
// se nepřeloží a dál hlásí „blok nenalezen".
function prelozCil(klic, qIndex) {
	if (text.includes(`'${klic}': [`)) return { klic, qIndex };
	const otazka = kvizyData[klic]?.[qIndex];
	if (!otazka || typeof otazka !== 'object') return null;
	for (const [k, seznam] of Object.entries(kvizyData)) {
		if (k === klic || !Array.isArray(seznam) || !text.includes(`'${k}': [`)) continue;
		const i = seznam.indexOf(otazka);
		if (i !== -1) return { klic: k, qIndex: i };
	}
	return null;
}
let zapsano = 0;
let preskoceno = 0;
let bezSchvaleni = 0;
const hlaseni = [];
const zapsaneKontrolniZaznamy = []; // { klic, qIndex } pro post-write ověření

for (const [klic, polozky] of byKlic) {
	for (const v of polozky) {
		const cil = prelozCil(klic, v.qIndex);
		const znacka = `'${cil ? cil.klic : klic}': [`;
		const zacatek = text.indexOf(znacka);
		if (zacatek === -1) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: blok nenalezen v kvizy.ts`);
			continue;
		}
		if (!jeSchvaleno(schvaleni, v)) {
			bezSchvaleni++;
			continue;
		}
		if (v.distraktorIndex === 0) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: distraktorIndex 0 je správná odpověď, ta se nesmí měnit`);
			continue;
		}

		const cilQIndex = cil.qIndex;
		const pozicePole = zacatek + znacka.length - 1; // pozice '['
		const konec = najdiKonecPole(text, pozicePole);
		if (konec === -1) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: nenalezen konec pole bloku`);
			continue;
		}
		const sliceOriginal = text.slice(pozicePole + 1, konec);
		const objekty = topLevelZavorky(sliceOriginal, '{', '}');
		const obj = objekty[cilQIndex];
		if (!obj) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: qIndex mimo rozsah (otázek v bloku: ${objekty.length})`);
			continue;
		}
		const objText = sliceOriginal.slice(obj[0], obj[1] + 1);

		if (typeof v.qText === 'string') {
			const qTextVDatech = najdiHodnotuKlice(objText, 'text');
			if (!qTextVDatech || qTextVDatech.hodnota !== v.qText) {
				preskoceno++;
				hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: text otázky v datech „${qTextVDatech?.hodnota}" nesedí s návrhem „${v.qText}"`);
				continue;
			}
		}

		const shodaOdpovedi = objText.match(vzorKlice('odpovedi'));
		if (!shodaOdpovedi) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: pole odpovedi nenalezeno v objektu otázky`);
			continue;
		}
		let otevIdx = shodaOdpovedi.index + shodaOdpovedi[0].length;
		while (otevIdx < objText.length && /\s/.test(objText[otevIdx])) otevIdx++;
		if (objText[otevIdx] !== '[') {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: za klíčem odpovedi nenásleduje pole`);
			continue;
		}
		const zavIdx = najdiKonecPole(objText, otevIdx);
		if (zavIdx === -1) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: nenalezen konec pole odpovedi`);
			continue;
		}
		const arrInner = objText.slice(otevIdx + 1, zavIdx);
		const prvky = rozdelPrvky(arrInner);
		const elem = prvky[v.distraktorIndex];
		if (!elem) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: distraktorIndex ${v.distraktorIndex} mimo rozsah (odpovědí: ${prvky.length})`);
			continue;
		}
		if (elem.hodnota !== v.puvodniText) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: text na indexu ${v.distraktorIndex} je „${elem.hodnota}", návrh čekal „${v.puvodniText}"`);
			continue;
		}

		// délková kontrola PO dosazení, nad aktuálním (i tímto během dosud upraveným) stavem pole
		const aktualniOdpovedi = prvky.map((p) => p.hodnota);
		const puvodniOdpovedZero = aktualniOdpovedi[0];
		const noveOdpovedi = aktualniOdpovedi.slice();
		noveOdpovedi[v.distraktorIndex] = v.navrh;
		const kopie = { odpovedi: noveOdpovedi };
		if (maDelkovouNapovedu(kopie) || maRemizuODelku(kopie)) {
			preskoceno++;
			hlaseni.push(`PŘESKOČENO ${klic} Q${v.qIndex + 1}: návrh by způsobil délkovou nápovědu/remízu`);
			continue;
		}

		if (ZAPIS) {
			const absStart = otevIdx + 1 + elem.start;
			const absEnd = otevIdx + 1 + elem.end;
			const novyRaw = jednoduchaUvozovka(v.navrh);
			const newObjText = objText.slice(0, absStart) + novyRaw + objText.slice(absEnd + 1);
			const newSliceOriginal = sliceOriginal.slice(0, obj[0]) + newObjText + sliceOriginal.slice(obj[1] + 1);
			text = text.slice(0, pozicePole + 1) + newSliceOriginal + text.slice(konec);
			zapsaneKontrolniZaznamy.push({ klic: cil.klic, qIndex: cilQIndex, spravnaOdpoved: puvodniOdpovedZero });
		}
		zapsano++;
		hlaseni.push(`${ZAPIS ? 'ZAPSÁNO' : 'ZAPSALO BY SE'} ${klic} Q${v.qIndex + 1} distraktor#${v.distraktorIndex}: „${elem.hodnota}" → „${v.navrh}"`);
	}
}

if (ZAPIS && zapsano > 0) {
	// Stav PŘED zápisem (celý soubor na disku ještě nezměněný) — potřebný jako
	// záloha pro vrácení a jako referenční data pro post-write kontrolu.
	const textPredZapisem = readFileSync(KVIZY_TS, 'utf8');
	const { kvizy: kvizyPredZapisem } = await nactiData();

	writeFileSync(KVIZY_TS, text, 'utf8');

	// Post-write ověření: znovu načíst SKUTEČNÁ data a porovnat KAŽDOU otázku
	// (text i správnou odpověď odpovedi[0]) v KAŽDÉM dotčeném bloku proti stavu
	// před zápisem — ne jen zapsané položky. Při jakékoli neshodě se soubor
	// vrátí do stavu před zápisem a skript skončí process.exit(1); „OK" se
	// vypíše jen když sedí obojí u všech otázek všech dotčených bloků.
	const { kvizy: kvizyPoZapisu } = await nactiData();
	const dotceneKlice = new Set(zapsaneKontrolniZaznamy.map((z) => z.klic));
	let poruseno = 0;
	for (const klic of dotceneKlice) {
		const puvodniOtazky = kvizyPredZapisem[klic] ?? [];
		const noveOtazky = kvizyPoZapisu[klic] ?? [];
		if (puvodniOtazky.length !== noveOtazky.length) {
			poruseno++;
			hlaseni.push(`VAROVÁNÍ: blok ${klic} změnil počet otázek (${puvodniOtazky.length} → ${noveOtazky.length}) — ZKONTROLOVAT RUČNĚ!`);
			continue;
		}
		for (let i = 0; i < puvodniOtazky.length; i++) {
			const puv = puvodniOtazky[i];
			const nov = noveOtazky[i];
			const puvSpravna = (puv?.odpovedi ?? [])[0];
			const novSpravna = (nov?.odpovedi ?? [])[0];
			if (puv?.text !== nov?.text || puvSpravna !== novSpravna) {
				poruseno++;
				hlaseni.push(`VAROVÁNÍ: po zápisu se u ${klic} Q${i + 1} změnil text otázky nebo správná odpověď — ZKONTROLOVAT RUČNĚ!`);
			}
		}
	}

	if (poruseno > 0) {
		writeFileSync(KVIZY_TS, textPredZapisem, 'utf8');
		hlaseni.push('CHYBA: kontrola po zápisu porušena — soubor VRÁCEN do stavu před zápisem (nic se nezapsalo).');
		console.log('Režim: ZÁPIS');
		console.log(`Návrhů „hotovo": ${hotovo.length}. Bez nezávislého schválení: ${bezSchvaleni}.`);
		console.log(`Zapsáno (poté vráceno): ${zapsano} položek. Přeskočeno: ${preskoceno}.`);
		for (const h of hlaseni) console.log('  ' + h);
		process.exit(1);
	}
	hlaseni.push('Ověření po zápisu: text otázky i správná odpověď u všech otázek dotčených bloků beze změny proti stavu před zápisem (OK).');
}

console.log(`Režim: ${ZAPIS ? 'ZÁPIS' : 'SUCHÝ BĚH (bez --zapis se nic nezapíše)'}`);
console.log(`Návrhů „hotovo": ${hotovo.length}. Bez nezávislého schválení: ${bezSchvaleni}.`);
console.log(`${ZAPIS ? 'Zapsáno' : 'Zapsalo by se'}: ${zapsano} položek. Přeskočeno: ${preskoceno}.`);
for (const h of hlaseni) console.log('  ' + h);

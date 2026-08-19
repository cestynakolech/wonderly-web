// STROJOVÁ BRÁNA PROTI CIZÍM VIDEÍM VE ŠKOLNÍ ČÁSTI WEBU.
//
// Proč to existuje (19. 8. 2026): pravidlo „na školní web patří jen vlastní videa
// učitele" bylo dosud jen TEXT v paměti a v pokynech. Textové pravidlo nezastavilo nic —
// cizí videa se na web dostala, protože je pokyn ve frontě přímo zadával a žádné měřidlo
// je neumělo odmítnout. Tentýž vzorec, jaký projekt zná od měřidel: pravidlo bez
// vynucení je přání. Tady je z něj počítání, které shodí build.
//
// CO HLÍDÁ (obojí tvrdě — chyba, ne varování):
//   1. materiál `{ druh: 'youtube', cesta: '<ID>' }` — vložený přehrávač na stránce podtématu
//   2. `odkazy: [{ url: 'https://www.youtube.com/watch?v=<ID>' }]` — odkaz na cizí video
//      Bod 2 NENÍ přehnaná opatrnost: přesně tudy díra vedla dál. Když se 19. 8. 2026
//      odstraňovala cizí videa, dvě cizí (kanál @nemecpetr) v poli `odkazy` u podtématu
//      slunecni-soustava zůstala — odstraňování hledalo jen `druh: 'youtube'`.
//      Kdyby brána hlídala jen vložení, byla by to znovu „opatření platí jen zčásti".
//
// DENÍK (cesty.wonderly.cz) JE VÝJIMKA a brána do něj nesahá. Není to výjimka podle
// názvu souboru — je to výjimka podle STRUKTURY: školní učivo žije v `temata` (podtémata
// s poli `materialy` / `odkazy`), zatímco videa deníku jsou v `src/data/cesty/<rok>.ts`
// jako záznamy tvaru `{ id, nazev, odkaz }` uvnitř roku cesty. Brána dostává na vstup
// VÝHRADNĚ objekt `temata`, takže se k datům deníku nemá jak dostat, i kdyby chtěla.
//
// PROČ SEZNAM A NE DOTAZ NA YOUTUBE PŘI BUILDU:
// Build musí projít i bez internetu (v projektu se běžně pracuje offline). Kdyby se
// brána ptala YouTube API na autora, výpadek sítě by shodil build — a první, co by
// kdokoli udělal, je tu kontrolu obejít. Proto je autorství ověřené JEDNOU, s internetem,
// ručně spuštěným skriptem `youtube-schval.mjs`, který u nového ID zavolá YouTube oembed
// a zapíše ho do `testy/youtube-vlastni.json` i s doloženým kanálem a datem ověření.
// Build pak jen porovnává proti seznamu: offline funguje, a NEZNÁMÉ ID NEPROJDE.
// (Opačná volba — „při výpadku sítě propustit" — je přesně ta tichá díra, kterou projekt
// zná odjinud: kontrola, která se umí sama vypnout, nekontroluje nic.)
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { vsechnaPodtemata } from './data.mjs';

const zde = dirname(fileURLToPath(import.meta.url));
export const CESTA_SEZNAM = join(zde, 'youtube-vlastni.json');

/** Kanál učitele. Jediný, ze kterého smí video na školní web. */
export const KANAL_UCITELE = 'https://www.youtube.com/@radekmicek5258';
export const JMENO_UCITELE = 'Radek Micek';

/** Načte seznam schválených ID. Chybějící soubor NENÍ důvod propustit — je to prázdný seznam. */
export function nactiSeznam(cesta = CESTA_SEZNAM) {
	if (!existsSync(cesta)) return { videa: {} };
	return JSON.parse(readFileSync(cesta, 'utf8'));
}

/**
 * Vytáhne YouTube ID z URL. Zná všechny tvary, které se v datech i v praxi objevují.
 * Vrací null, když to YouTube odkaz není.
 */
export function idZOdkazu(url) {
	if (typeof url !== 'string') return null;
	if (!/youtube\.com|youtu\.be|youtube-nocookie\.com/.test(url)) return null;
	const vzory = [
		/[?&]v=([A-Za-z0-9_-]{11})/,
		/youtu\.be\/([A-Za-z0-9_-]{11})/,
		/\/embed\/([A-Za-z0-9_-]{11})/,
		/\/shorts\/([A-Za-z0-9_-]{11})/,
		/\/live\/([A-Za-z0-9_-]{11})/,
	];
	for (const v of vzory) {
		const m = url.match(v);
		if (m) return m[1];
	}
	return null;
}

/**
 * Posbírá VŠECHNA YouTube videa školní části — vložená i odkazovaná.
 * Vrací [{ id, klic, nazev, kde }], kde `kde` je 'vlozene' nebo 'odkaz'.
 */
export function posbirejVidea(temata) {
	const ven = [];
	for (const p of vsechnaPodtemata(temata)) {
		for (const m of p.materialy ?? []) {
			if (m.druh !== 'youtube') continue;
			// U druhu 'youtube' je v `cesta` přímo ID (viz typ v temata.ts). Kdyby tam někdo
			// dal celou URL, ID se z ní stejně vytáhne — brána se nesmí dát obejít tvarem zápisu.
			const id = /^[A-Za-z0-9_-]{11}$/.test(String(m.cesta)) ? String(m.cesta) : idZOdkazu(m.cesta);
			ven.push({ id: id ?? String(m.cesta), klic: p.klic, nazev: m.nazev ?? '(bez názvu)', kde: 'vlozene' });
		}
		for (const o of p.odkazy ?? []) {
			const id = idZOdkazu(o.url ?? o.odkaz ?? '');
			if (id) ven.push({ id, klic: p.klic, nazev: o.nazev ?? '(bez názvu)', kde: 'odkaz' });
		}
	}
	return ven;
}

/**
 * Vlastní brána. Vrací { nalezy, videi, vlozenych, odkazu, schvalenych, podtemat }.
 * `nalezy` = pole hotových českých hlášek i s návodem, co s tím.
 */
export function zkontrolujCiziVidea(temata, seznam = nactiSeznam()) {
	const nalezy = [];
	const videa = posbirejVidea(temata);
	const schvalena = seznam.videa ?? {};

	// (A) INTEGRITA SEZNAMU. Seznam se nesmí dát rozšířit tím, že tam někdo dopíše ID
	// „od oka". Každý záznam musí nést kanál, ze kterého byl doložen — a ten musí být
	// kanál učitele. Bez toho by brána byla jen zámek s klíčem pod rohožkou.
	for (const [id, z] of Object.entries(schvalena)) {
		if (!z || typeof z !== 'object') {
			nalezy.push(`seznam schválených videí: záznam '${id}' není objekt s doložením — smaž ho a přidej znovu příkazem: node youtube-schval.mjs`);
			continue;
		}
		if (z.kanal !== KANAL_UCITELE) {
			nalezy.push(
				`seznam schválených videí: ID '${id}' je zapsané s cizím nebo chybějícím kanálem (${z.kanal ?? 'nic'}), ` +
					`povolený je jen ${KANAL_UCITELE}. Odstraň záznam z testy/youtube-vlastni.json.`,
			);
		}
		if (!z.overeno) {
			nalezy.push(`seznam schválených videí: ID '${id}' nemá datum ověření (pole 'overeno') — zapiš ho znovu příkazem: node youtube-schval.mjs`);
		}
	}

	// (B) VLASTNÍ KONTROLA DAT UČIVA.
	for (const v of videa) {
		if (schvalena[v.id]) continue;
		const kdeSlovy = v.kde === 'vlozene' ? 'vložené video' : 'odkaz na YouTube';
		nalezy.push(
			`CIZÍ VIDEO na školním webu — ${kdeSlovy} '${v.id}' u podtématu ${v.klic} („${v.nazev}"). ` +
				`Na školní web smí jen videa z kanálu učitele (${JMENO_UCITELE}, ${KANAL_UCITELE}). ` +
				`Když JE učitelovo, schval ho příkazem:  node youtube-schval.mjs  ` +
				`(s internetem — ověří autora přes YouTube oembed a zapíše ID do testy/youtube-vlastni.json). ` +
				`Když učitelovo NENÍ, odstraň ho ze src/data/temata.ts — na školní web nepatří.`,
		);
	}

	return {
		nalezy,
		videi: videa.length,
		vlozenych: videa.filter((v) => v.kde === 'vlozene').length,
		odkazu: videa.filter((v) => v.kde === 'odkaz').length,
		schvalenych: Object.keys(schvalena).length,
		podtemat: vsechnaPodtemata(temata).length,
	};
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const { nactiData } = await import('./data.mjs');
	const { temata } = await nactiData();
	const v = zkontrolujCiziVidea(temata);
	console.log(
		`Cizí videa: prošlo ${v.podtemat} podtémat, ${v.videi} YouTube výskytů ` +
			`(${v.vlozenych} vložených, ${v.odkazu} odkazů) proti ${v.schvalenych} schváleným ID — ${v.nalezy.length} nálezů.`,
	);
	for (const n of v.nalezy) console.log(`❌ ${n}`);
	process.exit(v.nalezy.length ? 1 : 0);
}

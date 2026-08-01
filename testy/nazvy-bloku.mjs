// Učí web název bloku, který v české paletě Scratche 3 NEEXISTUJE?
//
// Zavedeno 1. 8. 2026 poté, co nezávislý kontrolor našel na webu blok „a zároveň"
// (správně je prostě „a") a hned nato se ve scénáři Honičky ukázala další čtveřice:
// „jdi na", „otoč se k", „řekni", „zastav vše". Žák takový blok v paletě nenajde
// a scénář podle stránky nesestaví — proto je to VÁŽNÁ vada, ne kosmetika.
//
// Zdroj pravdy je oficiální lokalizace (klíče níže jsou z ní opsané doslova):
// https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/blocks/cs.json
// Tabulka je v souboru schválně natvrdo, aby kontrola běžela i bez internetu.
//
// Čte skutečná data (esbuild → import), ne text souboru.
//
// Spuštění: node testy/nazvy-bloku.mjs [část klíče]
import { nactiData, vsechnaPodtemata } from './data.mjs';

/**
 * Kontrolují se JEN celky, kde se opravdu programuje ve Scratchi.
 * Na stránkách o robotovi a micro:bitu jsou tytéž obraty v pořádku — LEGO ani
 * MakeCode Scratchem nejsou a „opakuj dokud vzdálenost > 10 cm" je tam správně.
 */
const SCRATCH_CELKY = [
	'informatika/7-rocnik/programovani-podminky-udalosti',
	'informatika/7-rocnik/programovani-vetveni-promenne',
	'informatika/7-rocnik/hry-ve-scratchi',
	'informatika/8-rocnik/hry-ve-scratchi',
	'informatika/9-rocnik/programovaci-projekty',
];

/** vzor (řetězec nebo regulární výraz, hledá se v malých písmenech) → skutečný název bloku + řádek z lokalizace */
export const ZAKAZANE = [
	{ vzor: 'jdi na ', spravne: 'skoč na …', zdroj: 'MOTION_GOTO = skoč na %1' },
	{ vzor: 'otoč se k', spravne: 'nastav směr k …', zdroj: 'MOTION_POINTTOWARDS = nastav směr k %1' },
	{ vzor: 'řekni', spravne: 'bublina …', zdroj: 'LOOKS_SAY = bublina %1' },
	{ vzor: 'zastav vše', spravne: 'zastav (všechno)', zdroj: 'CONTROL_STOP = zastav + CONTROL_STOP_ALL = všechno' },
	{ vzor: 'pero dolů', spravne: 'pero zapni', zdroj: 'pen_penDown = pero zapni' },
	{ vzor: 'pero nahoru', spravne: 'pero vypni', zdroj: 'pen_penUp = pero vypni' },
	{ vzor: 'a zároveň (', spravne: 'a', zdroj: 'OPERATORS_AND = %1 a %2' },
	// POZOR na falešný poplach: „opakuj dokud NENASTANE" je správný název, hlásit se smí
	// jen „opakuj dokud" bez něj. První verze měřidla nahlásila i zdravou stránku.
	{ vzor: /opakuj dokud (?!nenastane)/, spravne: 'opakuj dokud nenastane …', zdroj: 'CONTROL_REPEATUNTIL = opakuj dokud nenastane %1' },
];

/** Odstraní HTML značky, ať se nehledá v atributech odkazů. */
function text(html) {
	return String(html ?? '')
		.replace(/<[^>]+>/g, ' ')
		.toLowerCase();
}

/** Sedí vzor na text? Vzorem smí být řetězec i regulární výraz. */
function sedi(vzor, t) {
	return vzor instanceof RegExp ? vzor.test(t) : t.includes(vzor);
}

/** Vzor do hlášky (regulární výraz vypadá jako /…/, na to se čtenář nemá koukat). */
function popisVzoru(vzor) {
	return vzor instanceof RegExp ? String(vzor).replace(/^\/|\/[a-z]*$/g, '').replace(' (?!nenastane)', '') : String(vzor).trim();
}

export async function zkontrolujNazvyBloku() {
	const { kvizy, temata } = await nactiData();
	const nalezy = [];
	const jeScratch = (klic) => SCRATCH_CELKY.some((c) => klic.startsWith(c + '/'));

	for (const pod of vsechnaPodtemata(temata)) {
		if (!jeScratch(pod.klic)) continue;
		const t = text(pod.obsah);
		for (const z of ZAKAZANE) {
			if (sedi(z.vzor, t)) nalezy.push({ klic: pod.klic, kde: 'výklad', ...z });
		}
	}

	for (const [klic, otazky] of Object.entries(kvizy)) {
		if (!jeScratch(klic) || !Array.isArray(otazky)) continue;
		for (const o of otazky) {
			const t = text([o.text, ...(o.odpovedi ?? []).map((a) => (typeof a === 'string' ? a : a?.text)), o.vysvetleni].join(' \n '));
			for (const z of ZAKAZANE) {
				if (sedi(z.vzor, t)) nalezy.push({ klic, kde: `kvíz — „${String(o.text).slice(0, 45)}…"`, ...z });
			}
		}
	}
	return nalezy;
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
	const filtr = process.argv[2] ?? '';
	const nalezy = (await zkontrolujNazvyBloku()).filter((n) => n.klic.includes(filtr));
	for (const n of nalezy) {
		console.log(`❌ ${n.klic} (${n.kde})`);
		console.log(`   „${popisVzoru(n.vzor)}" → v české paletě je „${n.spravne}"   (${n.zdroj})`);
	}
	console.log(nalezy.length ? `\nNálezů: ${nalezy.length}` : 'Názvy bloků Scratche: 0 nálezů.');
}

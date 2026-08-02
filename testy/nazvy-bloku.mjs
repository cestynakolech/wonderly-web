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
	// Přibylo 1. 8. 2026 při psaní výkladu opakování s podmínkou — web učil „dotýká se
	// okraje?" a „je stisknuta klávesa", jenže paleta má obojí jinak (2. osoba, jiné pořadí).
	//
	// ⚠️ 2. 8. 2026 se ukázalo, že vzor „dotýká se" byl PRAKTICKY MRTVÝ: čeština staví
	// zvratné „se" před sloveso („když SE DOTÝKÁ okraje"), takže tvar psaný v opačném
	// pořadí se v textech skoro nevyskytuje. Měřidlo hlásilo 0 nálezů, a přitom stejnou
	// vadu neslo pět stránek. Rozhoduje tedy TVAR SLOVESA (blok má 2. osobu „dotýkáš"),
	// ne slovosled — proto se hlídá 3. osoba „dotýká" bez koncového „š".
	//
	// Zúženo na „KDYŽ se dotýká …", protože samotné „dotýká" hlásilo i zdravou větu
	// „postava se okraje dotýká", která o významu podmínky mluví česky a žádný blok
	// nepojmenovává. Rozlišuje podmět: ve scénáři žádný není („když se dotýká okraje"),
	// ve větě ano („když se postava okraje dotýká").
	{ vzor: /když se dotýká|dotýká se [a-záčďéěíňóřšťúůýž]/, spravne: 'dotýkáš se ( )?', zdroj: 'SENSING_TOUCHINGOBJECT = dotýkáš se %1?' },
	{ vzor: 'je stisknuta klávesa', spravne: 'klávesa ( ) stisknuta?', zdroj: 'SENSING_KEYPRESSED = klávesa %1 stisknuta?' },
	{ vzor: 'vytvoř klon', spravne: 'klonuj (sebe)', zdroj: 'CONTROL_CREATECLONEOF = klonuj %1' },
	{ vzor: /smaž\s+(ten(to)?\s+)?klon/, spravne: 'zruš tento klon', zdroj: 'CONTROL_DELETETHISCLONE = zruš tento klon' },
	// Další čtyři vzory dohledané 2. 8. 2026 v oficiální lokalizaci při psaní výkladů her.
	// Všechny čtyři byly na webu opravdu špatně — proto tu jsou i s tím, co je nahradilo.
	{ vzor: 'startuji jako klon', spravne: 'když startuje můj klon', zdroj: 'CONTROL_STARTASCLONE = když startuje můj klon' },
	{ vzor: /odraz se,? když|na okraji,? odraz/, spravne: 'když narazíš na okraj, odraz se', zdroj: 'MOTION_IFONEDGEBOUNCE = když narazíš na okraj, odraz se' },
	// Nález nezávislého kontrolora 2. 8. 2026: SIMULACE učily „jdi 10 kroků" — doslovný
	// překlad z angličtiny, který v české paletě není. Blok se jmenuje „dopředu o N kroků".
	// Vzor se schválně ptá na spojení se slovem „kroků", aby nehlásil běžné věty typu
	// „jdi na stránku" nebo „jdi ven".
	{ vzor: /jdi \s*-?\d+\s*kroků|jdi \(\s*-?\d+\s*\)\s*kroků/, spravne: 'dopředu o … kroků', zdroj: 'MOTION_MOVESTEPS = dopředu o %1 kroků' },
	{ vzor: 'schovej', spravne: 'skryj se', zdroj: 'LOOKS_HIDE = skryj se' },
	{ vzor: /([xy]) ukazatele myši/, spravne: 'x myši / y myši', zdroj: 'SENSING_MOUSEX = x myši, SENSING_MOUSEY = y myši' },
	// Nález nezávislého kontrolora 2. 8. 2026, a byla to tichá vada: dvě stránky skládaly
	// hlášku jako „Konec! Skóre: " + skóre. Ve Scratchi je „+" POČETNÍ blok — text se v něm
	// bere jako nula, takže by se žákovi vypsalo holé číslo bez nápisu. Na spojování textu
	// je vlastní blok „spoj". Hlídá se text v uvozovkách, za kterým následuje plus.
	{ vzor: /[„"][^„"]*[""]\s*\+/, spravne: 'spoj ( ) ( )', zdroj: 'OPERATORS_JOIN = spoj %1 %2 (OPERATORS_ADD = %1 + %2 je počty)' },
	// Nález nezávislého kontrolora 2. 8. 2026: web na třech místech pojmenovával klobouk
	// zprávy jako „po přijetí zprávy". Paleta má „po obdržení zprávy" a stránky si tím
	// protiřečily navzájem. Hlídá se jen tvar s „po", protože „přijetí zprávy" jako POPIS
	// JEVU („událostí je i přijetí zprávy") je česky správně a hlásit se nesmí.
	{ vzor: 'po přijetí zprávy', spravne: 'po obdržení zprávy …', zdroj: 'EVENT_WHENBROADCASTRECEIVED = po obdržení zprávy %1' },
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

// Volitelný parametr `data` kvůli obousměrnému ověření (viz testy/obousmerne.json).
/**
 * Komponenty simulací, které ukazují bloky Scratche. Kontrolují se stejně jako výklad —
 * žák je čte na téže stránce a nepozná, co je „jen simulace".
 *
 * Proč to tu je: do 2. 8. 2026 měřidlo četlo POUZE výklady a kvízy z dat, takže dvě nové
 * simulace mohly beztrestně učit „jdi 10 kroků" a „když na okraji, odraz se" — obojí
 * v české paletě neexistuje. Brána byla přitom zelená. Našel to až nezávislý kontrolor.
 * Je to učebnicový příklad vzorce „opatření platí jen na část případů".
 */
const SIMULACE_SE_SCRATCHEM = ['VetveniSimulace', 'OpakovaniSimulace', 'PromenneSimulace', 'SouradniceSimulace', 'LedDisplejSimulace', 'UdalostiSimulace', 'VlastniBlokySimulace'];

export async function zkontrolujNazvyBloku(data) {
	const { kvizy, temata } = data ?? (await nactiData());
	const nalezy = [];
	const jeScratch = (klic) => SCRATCH_CELKY.some((c) => klic.startsWith(c + '/'));

	// (a) komponenty simulací — jen text, který žák vidí (popisky bloků a tlačítek),
	// ne komentáře v kódu: ty o vadách často schválně mluví.
	if (!data) {
		const { readFileSync, existsSync } = await import('node:fs');
		const { join, dirname } = await import('node:path');
		const { fileURLToPath } = await import('node:url');
		const slozka = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components', 'skola2');
		for (const jmeno of SIMULACE_SE_SCRATCHEM) {
			const cesta = join(slozka, jmeno + '.astro');
			if (!existsSync(cesta)) continue;
			const cely = readFileSync(cesta, 'utf8')
				.replace(/^---[\s\S]*?---/, '')          // hlavička s poznámkami autora
				.replace(/^\s*\/\/.*$/gm, '')             // řádkové komentáře
				.replace(/\/\*[\s\S]*?\*\//g, '');        // blokové komentáře
			// POZOR: na zdrojový KÓD se nesmí pustit `text()`. Odstraňuje totiž všechno mezi
			// „<" a „>", takže v JS podmínce (`i < 80`) spolkne i celé řádky za ní — a přesně
			// proto první verze téhle kontroly podvrh NENAŠLA (ověřeno otiskem souboru:
			// podvrh zapsaný byl, měřidlo přesto hlásilo 0 nálezů).
			// Čte se proto zvlášť: z HTML textové uzly, ze skriptu jen řetězcové literály —
			// popisky bloků žijí právě tam.
			const casti = cely.split(/<script>|<\/script>/);
			const html = casti.filter((_, i) => i % 2 === 0).join(' ');
			const kod = casti.filter((_, i) => i % 2 === 1).join(' ');
			const literaly = (kod.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? []).join(' \n ');
			const t = text(html) + ' \n ' + literaly.toLowerCase();
			for (const z of ZAKAZANE) {
				if (sedi(z.vzor, t)) nalezy.push({ klic: `komponenta ${jmeno}`, kde: 'simulace', ...z });
			}
		}
	}

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

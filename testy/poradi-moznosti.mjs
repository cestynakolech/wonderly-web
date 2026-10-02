// Brána: vysvětlení kvízové otázky NESMÍ odkazovat na POŘADÍ ani PÍSMENO možnosti.
//
// Proč (2. 10. 2026): Kviz.astro (řádek ~99, `zamichej(otazka.odpovedi)`) možnosti při
// každém zobrazení MÍCHÁ; správná odpověď je v datech vždy první, ale žák ji vidí na
// libovolném místě. Vysvětlení typu „→ druhá možnost" nebo „možnost B" je pak lež.
// Vysvětlení musí možnost pojmenovat OBSAHEM („→ neprospěl").
//
// Co se hlásí (jen ve `vysvetleni`):
//   • řadová číslovka + možnost/odpověď/varianta/volba („první možnost", „v druhé odpovědi")
//   • „možnost/varianta/volba" + písmeno A–D („možnost B", „varianta C)")
//   • „možnost/varianta/volba" + číslo 1–4 („možnost 2"), pokud za ním nenásleduje jednotka
// Co se NEHLÁSÍ (falešný poplach je horší než žádná kontrola):
//   • „Odpověď 2 A" — číslo s jednotkou (ampér) uprostřed výpočtu; „odpověď" samotná
//     s číslem nebo s písmenem se nehlásí vůbec, jen „možnost/varianta/volba".
//   • „první větev", „druhý krok" apod. — řadová číslovka jen před slovem možnost/odpověď.
//   • věcné věty „Druhá možnost je, že…", „První možnost, jak…, je vedení." (viz PO_FRAZI).
//
// Spuštění: node testy/poradi-moznosti.mjs [--json soubor.json]
//   --json = kvizy jako objekt klíč → pole otázek (pro podvrhy mimo repo, např. v /tmp).
// Při nálezu končí kódem 1. Počítadlo: kolik bloků/otázek/vysvětlení se prošlo
// (0 vysvětlení = selhání měřidla, taky exit 1).
import { readFileSync } from 'node:fs';
import { nactiData } from './data.mjs';

const P = '(?<![\\p{L}\\d])'; // české „\b" (JS \b zná jen ASCII)
const ORD = '(?:prvn[íiěe]\\p{L}*|druh[áaéeouý]\\p{L}*|třet[íi]\\p{L}*|čtvrt\\p{L}*|poslední\\p{L}*)';
const CIL = '(?:možnost\\p{L}*|odpověď|odpovědi|odpovědí|odpovědím|odpověd\\p{L}*|variant\\p{L}*|volb\\p{L}*)';
// Odkaz na NABÍDNUTOU odpověď poznáme podle okolí: věta končí / následuje hodnocení
// („je správná", „platí", „odpovídá"…) NEBO před frází stojí „→", „správná je", „vyber"…
// Věcná věta („Druhá možnost je, že se těleso zahřeje.", „První možnost, jak teplo předat,
// je vedení.", „Třetí možností je záření.", „Na první odpověď přišel Newton.") se nehlásí.
const PO_FRAZI =
	'(?=\\s*(?:[.!?;)→]|$)|\\s*,\\s*(?:protože|neboť|jelikož)|\\s*[—–-]\\s*(?:správn|špatn|nesprávn|chybn)|\\s+(?:je|jsou|není|nejsou)\\s+(?:(?:ta|ten|to|ty|jediná|ta jediná)\\s+)?(?:špatn|správn|nesprávn|chybn|nepravdiv|pravdiv|pravda|nepravda|chyba|vyloučen)|\\s+(?:platí|neplatí|odpovídá|vyhovuje|nevyhovuje)(?![\\p{L}\\d]))';
// Slovo hodnotící + řadová číslovka je odkaz jen tehdy, když fráze končí (tečka, čárka, závorka…);
// „Platí první možnost Newtonova zákona." je věcná věta. Šipka „→" stačí sama.
const PRED_FRAZI =
	'(?:→\\s*|' + P + '(?:správn|špatn|nesprávn|chybn|vyber|vyberte|zvol|označ|volím|platí)\\p{L}*(?:\\s+(?:je|jsou))?\\s+)';
// Čárka za frází je konec odkazu („Vyber druhou možnost, ta první ne."), ale ne před vedlejší větou
// vysvětlující obsah („Zvol druhou možnost, jak měřit: stopkami.").
const KONEC2 = '(?=\\s*(?:[.!?;:)→]|$)|\\s*,(?!\\s*(?:jak|jaký|jaká|jaké|jakým|který|která|které|kterou|kde|kdy|kam|čím|co|aby|že)(?![\\p{L}\\d]))|\\s*[—–-]\\s)';
// Jednotky (rozlišují se velikosti písmen; „a" je česká spojka, proto mimo seznam).
const JEDN = '(?:[AVWJNFHTSKCΩ]|g|kg|mA|kV|kW|kJ|MW|Hz|Pa|mol|cd|cm|mm|km|dm|ml|dl|mg|ms|min|h|l|m|s|rad|°|%)';
// Slovní jednotky ve všech pádech („metrů", „kilogramy"); číslo s nimi není odkaz na možnost.
const JEDN_SLOVA = '(?:metr|kilogram|gram|sekund|minut|hodin|litr|volt|ampér|watt|newton|joul|ohm|stup)\\p{L}*';
const KLIC ='(?:[Mm]ožnost\\p{L}*|[Vv]ariant\\p{L}*|[Vv]olb\\p{L}*|MOŽNOST\\p{L}*|VARIANT\\p{L}*|VOLB\\p{L}*)';
const VZORY = [
	{ nazev: 'řadová číslovka + možnost/odpověď (odkaz na volbu)', re: new RegExp(`${P}${ORD}\\s+${CIL}${PO_FRAZI}`, 'iu') },
	{ nazev: 'odkaz na volbu + řadová číslovka', re: new RegExp(`(?:→\\s*${ORD}\\s+${CIL}(?![\\p{L}\\d])|${PRED_FRAZI}${ORD}\\s+${CIL}${KONEC2})`, 'iu') },
	{
		nazev: 'možnost/varianta + písmeno',
		re: new RegExp(`${P}${KLIC}\\s+[A-D](?![\\p{L}\\d])`, 'u'),
	},
	{
		nazev: 'možnost/varianta + číslo',
		re: new RegExp(
			`${P}${KLIC}\\s+(?:č\\.\\s*)?[1-4](?![\\d,.]\\d)(?!\\s*(?:${JEDN}(?![\\p{L}\\d])|${JEDN_SLOVA}))(?!\\s+(?:a|nebo|až)\\s+\\d+(?:[,.]\\d+)?\\s*(?:${JEDN}(?![\\p{L}\\d])|${JEDN_SLOVA}))(?!\\s+a\\s+(?:více|méně))`,
			'u',
		),
	},
];

/** Najde odkazy na pořadí/písmeno možnosti. Vrací { nalezy, bloku, otazek, vysvetleni }. */
export function zkontrolujPoradi(kvizy) {
	const nalezy = [];
	let bloku = 0;
	let otazek = 0;
	let vysvetleni = 0;
	for (const [klic, pole] of Object.entries(kvizy ?? {})) {
		if (!Array.isArray(pole)) continue;
		bloku++;
		pole.forEach((o, i) => {
			otazek++;
			if (typeof o?.vysvetleni !== 'string') return;
			vysvetleni++;
			for (const v of VZORY) {
				const m = o.vysvetleni.match(v.re);
				if (m) {
					nalezy.push({ klic, cislo: i + 1, otazka: o.text, uryvek: m[0], druh: v.nazev, vysvetleni: o.vysvetleni });
					break;
				}
			}
		});
	}
	return { nalezy, bloku, otazek, vysvetleni };
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const j = process.argv.indexOf('--json');
	const kvizy = j > 0 ? JSON.parse(readFileSync(process.argv[j + 1], 'utf8')) : (await nactiData()).kvizy;
	const v = zkontrolujPoradi(kvizy);
	console.log(`Prošlo ${v.bloku} bloků / ${v.otazek} otázek / ${v.vysvetleni} vysvětlení.`);
	if (v.vysvetleni === 0) {
		console.error('SELHÁNÍ MĚŘIDLA: 0 vysvětlení — kontrola nic neprošla.');
		process.exit(1);
	}
	console.log(`ODKAZY NA POŘADÍ/PÍSMENO MOŽNOSTI: ${v.nalezy.length}`);
	for (const n of v.nalezy) {
		console.log(`  ${n.klic} #${n.cislo}: „${n.uryvek}" (${n.druh})\n    ${n.otazka}\n    ${n.vysvetleni}`);
	}
	if (v.nalezy.length) {
		console.error('Kviz.astro možnosti míchá — vysvětlení musí možnost pojmenovat obsahem, ne pořadím/písmenem.');
		process.exit(1);
	}
}

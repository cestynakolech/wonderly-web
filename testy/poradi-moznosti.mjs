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
const VZORY = [
	{ nazev: 'řadová číslovka + možnost/odpověď', re: new RegExp(`${P}${ORD}\\s+${CIL}(?![\\p{L}\\d])`, 'iu') },
	{
		nazev: 'možnost/varianta + písmeno',
		re: new RegExp(`${P}(?:možnost\\p{L}*|variant\\p{L}*|volb\\p{L}*)\\s+[A-D](?![\\p{L}\\d])`, 'u'),
	},
	{
		nazev: 'možnost/varianta + číslo',
		re: new RegExp(
			`${P}(?:možnost\\p{L}*|variant\\p{L}*|volb\\p{L}*)\\s+(?:č\\.\\s*)?[1-4](?![\\d,.]\\d)(?!\\s*[\\p{L}Ω°%])`,
			'iu',
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

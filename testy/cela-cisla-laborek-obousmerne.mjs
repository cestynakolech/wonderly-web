// OBOUSMĚRNÉ OVĚŘENÍ měřidla `cela-cisla-laborek.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
// Podvrh = kopie zdravé laborky s podstrčeným desetinným číslem ve výpočtové otázce/kroku/cíli.
// Spuštění: node testy/cela-cisla-laborek-obousmerne.mjs
import { zkontrolujCelaCisla } from './cela-cisla-laborek.mjs';
import { nactiLaborky } from './uniky-laborek.mjs';

let chyb = 0;
let kontrol = 0;
const tvrdi = (popis, podminka) => {
	kontrol++;
	if (!podminka) {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
};
const zdrava = { nazev: 'Ohmův zákon', cil: 'Změřit napětí na rezistoru.', postup: ['Zapoj obvod s baterií 6 V.', 'Změř proud ampérmetrem.'], otazky: ['Vypočti odpor rezistoru, když U = 6 V a I = 2 A.', 'Co se stane s proudem při vyšším napětí?'] };
const klon = () => JSON.parse(JSON.stringify(zdrava));

// ZDRAVÝ: celá čísla, desetinné číslo mimo výpočet
tvrdi('zdravá laborka mlčí', zkontrolujCelaCisla('k/zdrava', zdrava).length === 0);
{
	const l = klon();
	l.postup[0] = 'Změř délku drátu, vyjde asi 4,5 cm.'; // desetinné číslo, ale bez výpočetního slovesa
	tvrdi('desetinné číslo bez výpočtu mlčí', zkontrolujCelaCisla('k/zdrava2', l).length === 0);
}
// PODVRHY
{
	const l = klon();
	l.otazky[0] = 'Vypočti odpor rezistoru, když U = 4,5 V a I = 2 A.';
	const v = zkontrolujCelaCisla('k/pod1', l);
	tvrdi('podvrh v otázce se najde', v.length === 1 && v[0].pole === 'otazka[0]');
}
{
	const l = klon();
	l.postup[1] = 'Spočítej proud z napětí 2,5 V.';
	const v = zkontrolujCelaCisla('k/pod2', l);
	tvrdi('podvrh v kroku se najde', v.length === 1 && v[0].pole === 'postup[1]');
}
{
	const l = klon();
	l.cil = 'Kolik wattů odebírá spotřebič 0,5 A?';
	const v = zkontrolujCelaCisla('k/pod3', l);
	tvrdi('podvrh v cíli se najde', v.length === 1 && v[0].pole === 'cil');
}
// SKUTEČNÁ DATA: načítání funguje a není falešná nula
const lab = await nactiLaborky();
tvrdi('skutečná data se načetla (ne falešná nula)', Object.keys(lab).length > 0);

if (chyb) {
	console.log(`cela-cisla-laborek-obousmerne: ${chyb} z ${kontrol} tvrzení SELHALO`);
	process.exit(1);
}
console.log(`cela-cisla-laborek-obousmerne: OK (${kontrol} tvrzení: 3 podvrhy nalezeny, 2 zdravé mlčí)`);

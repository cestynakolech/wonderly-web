// Obousměrný důkaz kontroly poloh a pořadí míst deníku (testy/cesty-poloha.mjs).
//
// Podvrhy běží nad KOPIÍ dat v paměti — do souborů webu se nesahá (poučení
// z 2. 8. 2026, kdy `git checkout` nad necommitnutou prací zahodil celý přepis).
// Spuštění: node testy/cesty-poloha-obousmerne.mjs
import { zkontrolujPolohy, zkontrolujPolohyMist, naDen, naPosledniDen } from './cesty-poloha.mjs';

let chyb = 0;
let kontrol = 0;
const tvrdi = (popis, podm) => {
	kontrol++;
	console.log(`${podm ? '✅' : '❌'} ${popis}`);
	if (!podm) chyb++;
};

// ---------- čtení datumů (všechny tvary, které v datech opravdu jsou) ----------
tvrdi("'5. 4. 2026' → 5. 4. 2026", String(naDen('5. 4. 2026')) === String([2026, 4, 5]));
tvrdi("'9.–10. 2. 2026' začíná 9. 2.", String(naDen('9.–10. 2. 2026')) === String([2026, 2, 9]));
tvrdi("'9.–10. 2. 2026' končí 10. 2.", String(naPosledniDen('9.–10. 2. 2026')) === String([2026, 2, 10]));
tvrdi("'26. 2. – 5. 3. 2022' přes hranici měsíce", String(naDen('26. 2. – 5. 3. 2022')) === String([2022, 2, 26]));
tvrdi("'31. 12. – 1. 1. 2020' začíná v roce 2020", String(naDen('31. 12. – 1. 1. 2020')) === String([2020, 12, 31]));
tvrdi("'31. 12. – 1. 1. 2020' končí v roce 2021", String(naPosledniDen('31. 12. – 1. 1. 2020')) === String([2021, 1, 1]));
tvrdi('nesmysl se nepřečte jako datum', naDen('někdy v létě') === null);

// ---------- PODVRHY: každý se musí najít ----------
const podvrhPin = [
	{ rok: '2026', data: { mesta: [{ slug: 'landshut-2', nazev: 'Landshut', datum: '13. 2. 2026', x: 325.2, y: 355.8 }] } },
	{ rok: '2025', data: { mesta: [{ slug: 'landshut', nazev: 'Landshut', datum: '6. 7. 2025', x: 324.1, y: 360.7 }] } },
];
const a = zkontrolujPolohy(podvrhPin);
tvrdi('PODVRH pin 45 km vedle se najde', a.nalezy.length === 1 && a.nalezy[0].includes('46 km'));

const podvrhPoradi = [
	{
		rok: '2026',
		data: {
			mesta: [
				{ slug: 'gassin', nazev: 'Gassin', datum: '26. 7. 2026', x: 277.4, y: 420.3 },
				{ slug: 'saint-bonnet', nazev: 'Saint-Bonnet', datum: '25. 7. 2026', x: 273.5, y: 402.1 },
			],
		},
	},
];
tvrdi('PODVRH obrácené pořadí se najde', zkontrolujPolohy(podvrhPoradi).nalezy.length === 1);

const podvrhVyjezd = [
	{
		rok: '2026',
		data: {
			vyjezdy: [{ cislo: 1, druh: 'vikend', od: '8. 2. 2026', do: '13. 2. 2026' }],
			mesta: [{ slug: 'telc', nazev: 'Telč', datum: '1. 4. 2026', vyjezd: 1, x: 351.3, y: 346.5 }],
		},
	},
];
tvrdi('PODVRH datum mimo svůj výjezd se najde', zkontrolujPolohy(podvrhVyjezd).nalezy.length === 1);

const podvrhChybejici = [
	{
		rok: '2026',
		data: {
			vyjezdy: [{ cislo: 1, druh: 'vikend', od: '8. 2. 2026', do: '13. 2. 2026' }],
			mesta: [{ slug: 'karlstadt', nazev: 'Karlstadt', datum: '10. 2. 2026', x: 306, y: 338.5 }],
		},
	},
];
tvrdi('PODVRH místo bez čísla výjezdu se najde', zkontrolujPolohy(podvrhChybejici).nalezy.length === 1);

// ---------- ZDRAVÝ STAV: nic z toho se nesmí ozvat ----------
const zdravy = [
	{
		rok: '2026',
		data: {
			vyjezdy: [
				{ cislo: 1, druh: 'vikend', od: '8. 2. 2026', do: '13. 2. 2026' },
				{ cislo: 2, druh: 'prazdniny', od: '6. 7. 2026', do: '26. 7. 2026' },
			],
			mesta: [
				{ slug: 'landshut-2', nazev: 'Landshut', datum: '13. 2. 2026', vyjezd: 1, x: 325.2, y: 355.8 },
				{ slug: 'landshut', nazev: 'Landshut', datum: '6. 7. 2026', vyjezd: 2, x: 325.2, y: 355.8 },
				{ slug: 'gassin', nazev: 'Gassin', datum: '26. 7. 2026', vyjezd: 2, x: 277.4, y: 420.3 },
			],
		},
	},
];
const z = zkontrolujPolohy(zdravy);
tvrdi(`ZDRAVÝ STAV mlčí (nálezů ${z.nalezy.length})`, z.nalezy.length === 0);
tvrdi('a přitom opravdu měřil (3 místa, 1 dvojice poloh)', z.mistCelkem === 3 && z.dvojicPoloh === 1);

// místo 15 km od druhého téhož jména je pořád totéž místo, ne vada
const blizko = [
	{ rok: '2023', data: { mesta: [{ slug: 'stozec', nazev: 'Stožec', datum: '1. 1. 2023', x: 338.1, y: 351.1 }] } },
	{ rok: '2024', data: { mesta: [{ slug: 'stozec', nazev: 'Stožec', datum: '1. 1. 2024', x: 338.5, y: 351.4 }] } },
];
tvrdi('ZDRAVÝ STAV pin o 5 km jinde se nehlásí', zkontrolujPolohy(blizko).nalezy.length === 0);

// ---------- ostrá data: kontrola musí opravdu něco měřit ----------
const ostry = await zkontrolujPolohyMist(new URL('../src/data/cesty/', import.meta.url));
tvrdi(`ostrá data: ${ostry.mistCelkem} míst v ${ostry.rokuZmereno} rocích, ${ostry.dvojicPoloh} dvojic poloh`,
	ostry.mistCelkem > 250 && ostry.dvojicPoloh > 100);
tvrdi(`ostrá data jsou bez nálezu (${ostry.nalezy.length})`, ostry.nalezy.length === 0);
for (const n of ostry.nalezy) console.log('   •', n);

console.log(`\n${chyb === 0 ? '✅' : '❌'} kontrol: ${kontrol}, chyb: ${chyb}`);
process.exit(chyb ? 1 : 0);

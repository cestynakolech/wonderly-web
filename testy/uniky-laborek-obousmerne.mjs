// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky-laborek.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
//
// Kalibrační kotvy jsou SKUTEČNÉ případy z dnešních kontrol laborek (5. 10. 2026, texty
// vytažené z historie gitu): tip „Energii nelze vytvořit ani zničit" × otázka 3 (commit
// 1e81f77), tip rovinného zrcadla z dávky 13 (fb7a1d4), tip Dlouhých strání z dávky 10
// (cfec995). Zdravé vzorky jsou tipy, které kontrolou prošly (OK v protokolech).
// Spuštění: node testy/uniky-laborek-obousmerne.mjs
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { zkontrolujLaborku, tokeny } from './uniky-laborek.mjs';

let chyb = 0;
let kontrol = 0;
const tvrdi = (popis, podminka) => {
	kontrol++;
	if (!podminka) {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
};
const lab = (nazev, tip, otazky, extra = {}) => ({ nazev, cil: 'Změřit něco.', postup: ['Změř hodnotu.'], otazky, tip, ...extra });
const pole = (v) => v.map((n) => `${n.pole}@${n.otazka}`);

// ---------------------------------------------------------------- KALIBRACE: skutečné úniky (musí se najít)
const energieOt = [
	'Jak souvisí hloubka důlku s výškou, ze které závaží padalo? Co z toho vyplývá o energii závaží?',
	'Co v tomto pokusu vykonalo práci při vtlačení do modelíny?',
	'Proč říkáme, že energii nelze vytvořit ani zničit? Co se s ní děje?',
	'Elektrickou energii měříme v kilowatthodinách. Kolik watthodin je 1 kWh?',
];
const energieNazev = 'Závaží dopadá na modelínu: energie a práce';
{
	const v = zkontrolujLaborku('k/energie', lab(energieNazev, 'Energii nelze vytvořit ani zničit, může se pouze přeměňovat z jednoho druhu na jiný.', energieOt));
	tvrdi('KOTVA energie: tip „nelze vytvořit ani zničit" × otázka 3', pole(v).includes('tip@3'));
	tvrdi('KOTVA energie: ukazuje shodný úsek s „vytvo znici"', v.some((n) => /vytvo znici/.test(n.usek)));
	// jiný pád a velká písmena: „ENERGIE" × „energii" — kmen i normalizace to musí pojmout
	const v2 = zkontrolujLaborku('k/energie', lab(energieNazev, 'Pamatuj si: ENERGIE nelze vytvořit ani zničit, jen přeměnit.', energieOt));
	tvrdi('ohebnost/velká písmena: jiný pád téhož se najde také', pole(v2).includes('tip@3'));
	// ZNÁMÁ MEZ (dokumentovaná v uniky-laborek.mjs): parafráze jinými slovy se nenajde
	const v3 = zkontrolujLaborku('k/energie', lab(energieNazev, 'Nic se neztrácí ani nevzniká z ničeho, energie jen mění podobu.', energieOt));
	tvrdi('ZNÁMÁ MEZ: parafráze bez shodných slov se NEHLÁSÍ (to je věc kontrolora)', v3.length === 0);
}
{
	const v = zkontrolujLaborku(
		'k/rovinne',
		lab('Odraz světla na rovinném zrcadle', 'Obraz v rovinném zrcadle je stejně velký a stejně daleko za zrcadlem jako předmět před ním.', [
			'Porovnej úhel dopadu a úhel odrazu u každého pokusu. Co zjistíš?',
			'Vyjmenuj tři vlastnosti obrazu v rovinném zrcadle.',
			'Dá se obraz v rovinném zrcadle zachytit na stínítku? Proč?',
		]),
	);
	tvrdi('KOTVA rovinné zrcadlo: tip prozrazuje otázky na vlastnosti obrazu', pole(v).includes('tip@2') && pole(v).includes('tip@3'));
}
{
	const v = zkontrolujLaborku(
		'k/dlouhe',
		lab('Malý solární článek: napětí při různém osvětlení', 'Přečerpávací elektrárna Dlouhé stráně ukládá energii vody a vrací ji do sítě ve chvílích, kdy je elektřiny potřeba víc.', [
			'Kdy bylo napětí největší a kdy nejmenší?',
			'Elektrárna Dlouhé stráně přečerpává vodu do horní nádrže v noci. Proč právě v noci?',
		]),
	);
	tvrdi('KOTVA Dlouhé stráně: tip × otázka 4', pole(v).includes('tip@2'));
}

// ---------------------------------------------------------------- PODVRHY: cíl a kroky (téměř doslovný opis)
{
	const o = ['Proč se při zvedání po svislici koná větší práce než při posouvání po stole?'];
	const v = zkontrolujLaborku('k/krok', lab('Práce', 'Zajímavost bez vazby.', o, {
		postup: ['Uvědom si, že se při zvedání po svislici koná větší práce než při posouvání po stole.'],
	}));
	tvrdi('krok, který opíše otázku (≥ 6 slov), se najde', v.some((n) => n.pole === 'postup[0]'));
	const v2 = zkontrolujLaborku('k/cil', lab('Práce', 'Zajímavost bez vazby.', o, {
		cil: 'Zjistit, proč se při zvedání po svislici koná větší práce než při posouvání po stole.',
	}));
	tvrdi('cíl, který opíše otázku (≥ 6 slov), se najde', v2.some((n) => n.pole === 'cil'));
}

// ---------------------------------------------------------------- ZDRAVÉ vzorky (musí mlčet)
const zdrave = [
	['Odraz světla na rovinném zrcadle', 'Rovinná zrcadla používáme například jako kosmetická zrcadla a v periskopech ponorek.', [
		'Porovnej úhel dopadu a úhel odrazu u každého pokusu. Co zjistíš?',
		'Vyjmenuj tři vlastnosti obrazu v rovinném zrcadle.',
		'Dá se obraz v rovinném zrcadle zachytit na stínítku? Proč?',
	]],
	['Lžíce jako zrcadlo: duté a vypuklé', 'Kulová zrcadla se snadno vyrábějí, ale ostře zobrazují jen předměty v blízkosti osy zrcadla.', [
		'Jak vypadal obraz na vypuklém zrcadle? Závisel na vzdálenosti?',
		'Kde se využívají vypuklá zrcadla?',
	]],
	['Jak se světlo šíří a čím prochází', 'Rychlost světla ve vakuu je nejvyšší možná rychlost ve vesmíru.', [
		'Slunce je vzdáleno 150 000 000 km a světlo se šíří rychlostí 300 000 km/s. Za kolik sekund dopadne světlo ze Slunce na Zem?',
	]],
	['Rozklad bílého světla hranolem', 'Isaac Newton popsal roku 1671 pruh barev, který vzniká při průchodu světla hranolem, a nazval ho spektrum.', [
		'Která barva se při průchodu hranolem láme nejméně a která nejvíce?',
		'Který český fyzik a lékař v 17. století vysvětlil duhu lomem světla? Jak to dokázal?',
	]],
	['Střídavý proud v síti', 'V rozvodné síti má střídavý proud frekvenci 50 Hz, tedy 50 period za sekundu.', [
		'Jaké napětí a jakou frekvenci má střídavý proud v rozvodné síti?',
	]],
	[energieNazev, 'Jednotka energie joule je pojmenovaná po anglickém fyzikovi Jamesi Prescottu Joulovi.', energieOt],
];
for (const [nazev, tip, otazky] of zdrave) {
	const v = zkontrolujLaborku('k/zdrava', lab(nazev, tip, otazky));
	tvrdi(`zdravý vzorek mlčí: ${tip.slice(0, 40)}…`, v.length === 0);
}
{
	// krok, který jen pojmenovává měřenou veličinu (sdílí 4 slova s otázkou), není únik
	const v = zkontrolujLaborku('k/zdrava', lab('Odraz', 'Bez vazby na otázky.', ['Jsou úhel dopadu a úhel odrazu v mezích přesnosti stejné?'], {
		postup: ['Pro každý pokus zapiš úhel dopadu, úhel odrazu a jejich rozdíl.'],
	}));
	tvrdi('krok jen s názvy veličin nehlásí poplach (práh 6)', v.length === 0);
}

// ---------------------------------------------------------------- NORMALIZACE: hranice slov česky (Unicode, ne \b)
{
	const t = tokeny('Čočka, ŽÁRovka – účinnost!');
	tvrdi('slova začínající/končící diakritikou se nerozříznou (čočka → cocka)', t.includes('cocka'.slice(0, 5)) && t.includes('zarov'));
	tvrdi('tokeny nevracejí prázdné ani 1–2písmenné útržky', t.every((x) => x.length >= 3));
}

// ---------------------------------------------------------------- BRÁNA: skutečně shodí běh (kód 1) a u zdravých dat projde (kód 0)
{
	const zde = dirname(fileURLToPath(import.meta.url));
	const tmp = mkdtempSync(join(tmpdir(), 'uniky-laborek-'));
	try {
		const zapis = (nazev, tip) => {
			const cesta = join(tmp, nazev);
			const obsah = { k: lab(energieNazev, tip, energieOt) };
			writeFileSync(cesta, `export const laborky = ${JSON.stringify(obsah)};\n`);
			return cesta;
		};
		const spust = (cesta) => {
			try {
				execFileSync(process.execPath, [join(zde, 'uniky-laborek.mjs'), cesta], { stdio: 'pipe' });
				return 0;
			} catch (e) {
				return e.status ?? -1;
			}
		};
		tvrdi('brána skončí kódem 1 na datech s únikem', spust(zapis('unik.ts', 'Energii nelze vytvořit ani zničit, jen se přeměňuje.')) === 1);
		tvrdi('brána skončí kódem 0 na zdravých datech', spust(zapis('zdrave.ts', 'Jednotka energie joule je pojmenovaná po Jamesi Joulovi.')) === 0);
	} finally {
		rmSync(tmp, { recursive: true, force: true });
	}
}

console.log(`uniky-laborek-obousmerne: ${kontrol - chyb}/${kontrol} kontrol v pořádku`);
if (chyb > 0 || kontrol === 0) process.exit(1);

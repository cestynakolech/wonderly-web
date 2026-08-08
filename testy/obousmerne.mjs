// REJSTŘÍK OBOUSMĚRNÉHO OVĚŘENÍ MĚŘIDEL — kdo hlídá hlídače.
//
// Proč to vzniklo (dlouhodobý audit 2. 8. 2026, tři nezávislí auditoři s různými otázkami):
// Nejčastější vada projektu NENÍ v učivu, ale v nástrojích, které učivo hlídají.
// Doloženo dvaceti výskyty ve čtyřech dnech, z toho pětkrát za jedinou noc:
//   • `nazornost.mjs` hledal `druh: 'obrazek'`, který v datech není ani jednou → falešná nula
//   • brána počítala 2084 otázek místo 2436 (jednořádkové vzor minul)
//   • `!nazornost(p)` nad objektem → vždy nepravda
//   • měřidlo názvů bloků hlásilo 0 nálezů, zatímco tutéž vadu neslo pět stránek
//   • `mutace.mjs` mutoval jen PRVNÍ výskyt vzoru → hlásil 1/5 a nehnul se ani po
//     přidání šesti nových kontrol
// Retrospektiva pěti nočních kol to shrnula sama: „ve všech pěti kolech byla nejdražší
// vada v měřidle, ne v obsahu."
//
// Pravidlo „novou kontrolu ověř obousměrně" přitom v projektu existovalo — jenže jako
// TEXT. Nic nebránilo nasadit měřidlo bez důkazu, a přesně to se pětkrát stalo.
// Tenhle soubor z pravidla dělá evidenci: každé měřidlo musí mít v rejstříku zapsáno,
// ČÍM je doloženo, že (a) podvrh najde a (b) nad zdravými daty mlčí.
//
// Rohatka jako u kvízů: dnešní dluh nikoho neblokuje, ale přibýt už nesmí.
// Spuštění samostatně: node testy/obousmerne.mjs   (spustí i všechny registrované testy)
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const zde = dirname(fileURLToPath(import.meta.url));
const koren = join(zde, '..');
const cestaRejstrik = join(zde, 'obousmerne.json');

// Soubory, které NEJSOU měřidla — nic netvrdí o stavu webu, takže je nemá smysl
// obousměrně ověřovat. Každý z nich má napsaný důvod, aby se seznam nedal tiše rozšířit
// jako smetiště pro neověřená měřidla.
export const NENI_MERIDLO = {
	'data.mjs': 'načítá data (esbuild import), sám nic neměří',
	'vypis-kviz.mjs': 'nástroj pro člověka — jen vypíše otázky',
	'delky.mjs': 'nástroj pro člověka — vypíše délky odpovědí bloku',
	'mutace.mjs': 'nástroj na vyžádání, sám je ověřovací (mutuje zdroj a čeká pád testu)',
	'vsechny-simulace.mjs': 'spouštěč testů simulací',
	'obousmerne.mjs': 'tenhle rejstřík',
	'uniky-obousmerne.mjs': 'je to samo obousměrné ověření',
	'meridla-obousmerne.mjs': 'je to samo obousměrné ověření (podvrhy pro pět měřidel)',
	'cesty-poloha-obousmerne.mjs': 'je to samo obousměrné ověření (polohy a pořadí míst deníku)',
};

/** Vrátí seznam měřidel: soubory .mjs přímo v testy/ (mimo výjimky) + testy simulací
 * v testy/simulace/. Bez podsložky byla rohatka slepá k 16 testům simulací — tentýž
 * vzorec „opatření platí jen na část vstupů", tentokrát v samotném vynucovacím
 * mechanismu (nález nezávislého auditu 4. 8. 2026). Podsložka testy/podvrhy/ sem
 * nepatří: podvrhy jsou samy důkazním materiálem, nic o webu netvrdí. */
export function seznamMeridel() {
	const primo = readdirSync(zde).filter((f) => f.endsWith('.mjs') && !(f in NENI_MERIDLO));
	const slozkaSimulace = join(zde, 'simulace');
	const simulace = existsSync(slozkaSimulace)
		? readdirSync(slozkaSimulace)
				.filter((f) => f.endsWith('.mjs'))
				.map((f) => `simulace/${f}`)
		: [];
	return [...primo, ...simulace].sort();
}

export function nactiRejstrik() {
	return existsSync(cestaRejstrik) ? JSON.parse(readFileSync(cestaRejstrik, 'utf8')) : { meridla: {} };
}

/**
 * Zkontroluje, že každé měřidlo má v rejstříku doklad obousměrného ověření.
 * Vrací { chybi: [...], meridel: N, doloženo: N, testy: [...] }.
 */
export function zkontrolujRejstrik() {
	const rejstrik = nactiRejstrik();
	const meridla = seznamMeridel();
	const chybi = [];
	const testy = [];
	for (const m of meridla) {
		const z = rejstrik.meridla?.[m];
		// Doklad musí říct OBA směry. Samotné „ověřeno" je tvrzení, ne důkaz — přesně
		// takové věty audit našel jako slabá místa („nasazeno a ověřeno curlem" bez čísla).
		if (!z || !z.podvrh || !z.zdravy) {
			chybi.push(m);
			continue;
		}
		if (z.test) testy.push({ meridlo: m, test: z.test });
	}
	return { chybi, meridel: meridla.length, dolozeno: meridla.length - chybi.length, testy };
}

/** Spustí registrované obousměrné testy (jen na vyžádání — v bráně by zdržovaly). */
export function spustTesty(testy) {
	const vysledky = [];
	for (const t of testy) {
		const cesta = join(koren, t.test);
		if (!existsSync(cesta)) {
			vysledky.push({ ...t, stav: 'CHYBÍ SOUBOR' });
			continue;
		}
		try {
			execFileSync(process.execPath, [cesta], { cwd: koren, stdio: 'pipe' });
			vysledky.push({ ...t, stav: 'OK' });
		} catch (e) {
			vysledky.push({ ...t, stav: 'SELHAL', vypis: String(e.stdout ?? e.message).trim().split('\n').slice(-3).join('\n') });
		}
	}
	return vysledky;
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const v = zkontrolujRejstrik();
	console.log(`Měřidel v testy/: ${v.meridel} — doloženo obousměrně: ${v.dolozeno}, bez dokladu: ${v.chybi.length}`);
	for (const m of v.chybi) console.log(`  ⚠️  ${m} — chybí záznam v testy/obousmerne.json (podvrh + zdravý stav)`);
	if (v.testy.length) {
		console.log(`\nSpouštím ${v.testy.length} registrovaných obousměrných testů:`);
		for (const r of spustTesty(v.testy)) {
			console.log(`  ${r.stav === 'OK' ? '✅' : '❌'} ${r.meridlo} → ${r.test} (${r.stav})`);
			if (r.vypis) console.log(`     ${r.vypis}`);
		}
	}
}

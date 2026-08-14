// KŘÍŽOVÉ POROVNÁNÍ OTÁZEK — napříč bloky, celky, ročníky i předměty.
//
// PROČ TO VZNIKLO (nález nezávislého kontrolora 14. 8. 2026):
// `testy/uniky.mjs` porovnává otázky jen UVNITŘ jednoho bloku. U opakovacích podtémat
// je proto jeho „0 duplicit" falešný klid: křížovým porovnáním se mezi fyzikou 8 a 9
// našlo šest dvojic otázek na tentýž fakt, dvakrát dokonce s doslova totožnou správnou
// odpovědí „12 V". Horší než opakování samo bylo, ČÍM se lišilo: devítka měla u téhož
// učiva KRATŠÍ a snazší znění než osmička — tedy přesně naopak, než má opakování smyslu.
//
// PROČ ZATÍM JEN HLÁŠENÍ, A NE BRÁNA (vědomé rozhodnutí, ne nedodělek):
// Brána musí být neomylná — jakmile jednou plane, začne se obcházet a přestane chránit.
// Tohle měřidlo zatím nemá dost proběhlých kol, aby se dalo tvrdit, že neplane:
//   1. Rozdíl mezi „duplicitou" a „záměrným opakováním učiva ve vyšším ročníku" je
//      VĚCNÝ, ne lexikální. Měřidlo umí najít dvojice na tentýž fakt, ale nerozhodne
//      za učitele, které opakování je žádoucí a které je lenost.
//   2. Zůstává známý falešný pár (viz níže „souhlasné náboje × souhlasné póly"):
//      stejná odpověď, stejně stavěná otázka — ale jiný jev. Lexikálně se nedá odlišit.
//   3. Křížové porovnání nemá rohatku (dnešní stav = laťka), takže by při zapnutí jako
//      brána buď shodilo build hned, nebo by se laťka nastavila naslepo.
// Teprve až se ukáže, že seznam nálezů je stabilní a učitel u něj neříká „to je v pořádku",
// dá se z něj udělat brána — postup je popsaný na konci souboru.
//
// PROČ SAMOSTATNÝ SOUBOR, A NE DALŠÍ REŽIM V `uniky.mjs`:
//   • `uniky.mjs` JE brána — `zkontroluj.mjs` z něj bere `vazby.duplicity` a `vazby.uniky`
//     a hlídá je proti laťce. Kdyby křížové nálezy přibyly do týchž polí, shodily by build,
//     což zadání výslovně nechce; a kdyby přibyly do polí nových, měnil by se tvar
//     návratové hodnoty, na kterém brána stojí.
//   • Jiný rozsah práce: `uniky.mjs` porovnává desítky dvojic v bloku, tohle 2,2 milionu
//     dvojic napříč webem a potřebuje k tomu vlastní aparát (IDF, četnosti odpovědí).
//   • Společné primitivy se neduplikují — `normalizuj` i seznam stopek se importují.
//
// SPUŠTĚNÍ:
//   node testy/uniky-krizove.mjs              — hlášení za celý web
//   node testy/uniky-krizove.mjs 8-rocnik     — jen dvojice, kde jeden klíč obsahuje text
//   node testy/uniky-krizove.mjs --overeni    — obousměrný důkaz (podvrh najde, zdravé pustí)
import { nactiData } from './data.mjs';
import { normalizuj, STOP } from './uniky.mjs';

// Tázací slova navíc: v křížovém porovnání se potkávají otázky z různých celků, takže
// „jaké napětí" × „jaká hodnota" by jinak sdílely „hodnot“-ne, ale tázací kostru ano.
const STOP_KRIZOVE = new Set([
	...STOP,
	...'jake jaka jaky jakou jakym jakych ktery ktera ktere kolik proc cemu ceho cim znamena patri plati stane meni deje sebe'.split(' '),
]);

/**
 * Nosné tokeny znění. VRACÍ POLE (ne množinu) v původním tvaru — porovnává se
 * prefixem, ne rovností, takže se slovo nesmí předem ořezat.
 *
 * Hranice slov dělá `normalizuj` (všechno mimo [a-z0-9] je oddělovač). Regexové `\b`
 * se tu nepoužívá vůbec a je to záměr: `\b` v JavaScriptu zná jen ASCII, takže
 * v „tužkový" (po normalizaci „tuzkovy") vidí hranice kolem „kov" a měřidlo pak
 * hlásí shodu se slovem „kov", která tam není. Dělením na oddělovačích tenhle omyl
 * nemůže nastat: „tuzkovy" je jeden token a s „kov" se nikdy nespáruje (viz
 * `stejnySlovniZaklad` — společný prefix „tuz" × „kov" má nula znaků).
 */
export function nosneTokeny(text) {
	return normalizuj(text)
		.split(' ')
		.filter((s) => (s.length >= 4 || /[0-9]/.test(s)) && !STOP_KRIZOVE.has(s));
}

/**
 * Jde o totéž slovo? Čeština ohýbá koncovky, takže „odpor" × „odporem" je táž věc.
 *
 * Nestačí ale useknout slovo na pevný počet znaků, jak to dělá `slovaZneni` v uniky.mjs:
 * při kmeni 4 znaky splyne „elektrostatická" s „elektromagnetickou" a dvě zcela různé
 * otázky vyjdou na 100 % shodné (skutečný nález při stavbě tohohle měřidla —
 * „Co je elektrostatická indukce?" × „Co je elektromagnetická indukce?").
 * Proto se porovnává společný prefix POMĚREM k délce delšího slova:
 *   „odpor" × „odporem"          → prefix 5 z 7 = 71 %  → totéž slovo
 *   „zinková" × „zinku"          → prefix 4 z 7 = 57 %  → totéž slovo
 *   „elektrostatická" × „elektromagnetická" → prefix 7 ze 17 = 41 % → RŮZNÁ slova
 *   „vodiče" × „vodivost"        → prefix 4 z 8 = 50 %  → RŮZNÁ slova
 * Tokeny s číslicí se musí rovnat přesně: „12" a „120" nemají společného nic,
 * i když jedno je prefixem druhého — a právě čísla bývají to jediné, čím se dvě
 * jinak stejná zadání liší.
 */
export function stejnySlovniZaklad(a, b) {
	if (a === b) return true;
	if (/[0-9]/.test(a) || /[0-9]/.test(b)) return false;
	let i = 0;
	while (i < a.length && i < b.length && a[i] === b[i]) i++;
	return i >= 4 && i >= Math.max(a.length, b.length) * 0.55;
}

/** Kanonický klíč pro počítání četností (hrubší než porovnání — slouží jen k vážení). */
function klicSlova(s) {
	return /[0-9]/.test(s) ? s : s.slice(0, 4);
}

/**
 * Číselné hodnoty s jednotkou z textu odpovědi: „12 V" → `12|v`, „4,5 V" → `4.5|v`.
 *
 * Nejde to číst z `normalizuj`, ta desetinnou čárku promění v mezeru a z „4,5 V"
 * udělá tokeny „4", „5", „v" — pak by „4,5 V" a „5,4 V" vyšly stejně.
 * Jednotka se bere jako písmena hned za číslem (i „Ω", „°C", „kWh").
 */
export function hodnoty(text) {
	const ven = new Set();
	const re = /(\d+(?:[.,]\d+)?)[\s°]*(\p{L}{1,4})?/gu;
	for (const m of String(text ?? '').matchAll(re)) {
		const cislo = m[1].replace(',', '.');
		const jednotka = m[2]
			? m[2]
					.normalize('NFD')
					.replace(/[̀-ͯ]/g, '')
					.toLowerCase()
			: '';
		ven.add(`${cislo}|${jednotka}`);
	}
	return ven;
}

function stejnaMnozina(a, b) {
	if (a.size !== b.size) return false;
	for (const x of a) if (!b.has(x)) return false;
	return true;
}

/** Kolik tokenů A má protějšek v B (prefixové párování), a které to jsou. */
function sdilena(tokenyA, tokenyB) {
	return tokenyA.filter((a) => tokenyB.some((b) => stejnySlovniZaklad(a, b)));
}

/**
 * Shoduje se JÁDRO SPRÁVNÉ ODPOVĚDI? Tohle je hlavní hráz proti pasti
 * „shoda slov není obsah": dokud si dvě otázky nežádají tutéž odpověď, není to
 * duplicita, ať se znění překrývá jakkoli. Právě na tom padá dvojice
 * „Co je elektrostatická indukce?" (přesun volných elektronů) ×
 * „Co je elektromagnetická indukce?" (vznik napětí při změně pole) — 100 % shodných
 * slov, ale každá se ptá na něco jiného.
 *
 * Vrací null (neshoda) nebo { jak, sila }.
 */
export function shodaOdpovedi(a, b) {
	const normA = normalizuj(a);
	const normB = normalizuj(b);
	const hodA = hodnoty(a);
	const hodB = hodnoty(b);

	// Číselná odpověď rozhoduje sama: shodné číslo I jednotka = tentýž fakt,
	// rozdílné = různý fakt, i kdyby se otázky lišily jediným slovem
	// („Jaké napětí má plochá baterie?" 4,5 V × „…monočlánek?" 1,5 V).
	if (hodA.size && hodB.size) {
		if (!stejnaMnozina(hodA, hodB)) return null;
		// Číslo BEZ jednotky je slabý signál — „4×" (kolikrát vzroste energie) a
		// „součet 4" (délka cesty v grafu) mají stejnou čtyřku a společného nic.
		// Za silnou shodu se proto počítá jen hodnota, která nese jednotku.
		const sJednotkou = [...hodA].every((h) => h.split('|')[1]);
		return {
			jak: `shodná hodnota ${[...hodA].map((h) => h.replace('|', ' ')).join(', ')}`,
			sila: sJednotkou ? 1 : 0.6,
			hodnotaSJednotkou: sJednotkou,
		};
	}
	// Číslo jen na jedné straně: „12 V" × „bezpečné" není táž odpověď.
	if (hodA.size !== hodB.size) return null;

	if (normA && normA === normB) return { jak: 'doslova totožná odpověď', sila: 1 };

	// Slovní odpověď: musí si odpovídat obsahem, ne délkou. Vyžaduje se oboustranné
	// krytí nosných slov — „ze zinku (nádoba)" × „zinková nádoba" ano,
	// „vodivý roztok" × „vodivý roztok soli nebo kyseliny" ano, „roste" × „roste rychleji" ne.
	const tokA = nosneTokeny(a);
	const tokB = nosneTokeny(b);
	if (!tokA.length || !tokB.length) return null;
	const abz = sdilena(tokA, tokB).length / tokA.length;
	const baz = sdilena(tokB, tokA).length / tokB.length;
	if (abz >= 0.6 && baz >= 0.6) return { jak: `týž obsah odpovědi (${Math.round(Math.min(abz, baz) * 100)} %)`, sila: 0.85 };
	return null;
}

/**
 * Projde všechny dvojice otázek z RŮZNÝCH bloků a vrátí dvojice na tentýž fakt.
 *
 * Postup je záměrně obrácený, než se nabízí: nejdřív se ptá na SHODU ODPOVĚDI
 * (co se žák má naučit) a teprve pak na shodu tématu otázky. Kdyby se to vzalo
 * od podobnosti znění, utopí se to ve falešných poplaších — všechny otázky jednoho
 * předmětu si jsou slovně podobné.
 */
export function zkontrolujKrizove(data) {
	const { kvizy } = data;
	const polozky = [];
	let vynechanoShrnuti = 0;
	for (const [klic, otazky] of Object.entries(kvizy)) {
		if (!Array.isArray(otazky) || !otazky.length) continue;
		// Souhrnné bloky se skládají programově z týchž objektů otázek jako zdrojové
		// bloky — bez téhle výluky by každá otázka měla „duplicitu" sama se sebou.
		// Výluka musí být ve výpisu PŘIZNANÁ číslem, ne dopočitatelná.
		if (klic.includes('/shrnuti/')) {
			vynechanoShrnuti++;
			continue;
		}
		const [predmet, rocnik, celek] = klic.split('/');
		for (const o of otazky) {
			const spravna = (o.odpovedi ?? [])[0] ?? '';
			polozky.push({
				klic,
				predmet,
				rocnik,
				celek,
				o,
				spravna,
				normSpravna: normalizuj(spravna),
				tokeny: nosneTokeny(o.text),
			});
		}
	}

	// IDF nad zněními otázek: slovo, které je v každé druhé otázce („proud", „napětí"),
	// nesmí vážit stejně jako „autobaterie". Bez toho by se za shodu tématu prohlásila
	// každá dvojice, která spolu sdílí název předmětu.
	const N = polozky.length || 1;
	const df = new Map();
	for (const p of polozky) {
		for (const k of new Set(p.tokeny.map(klicSlova))) df.set(k, (df.get(k) ?? 0) + 1);
	}
	// Spodní mez 0,05: slovo, které je skoro ve všech otázkách, má vážit skoro nic —
	// ale NIKDY ne záporně. Bez ní klesne `log` pod nulu, jakmile je slovo ve víc než
	// polovině vstupu, a krytí tématu se pak počítá ze záporných vah. Nad celým webem
	// se to nestane, nad malým vzorkem v obousměrném testu okamžitě.
	const idf = (s) => Math.max(0.05, Math.log(N / (1 + (df.get(klicSlova(s)) ?? 0))));

	// Četnost správné odpovědi napříč webem. „ne", „roste", „přitahují se" jsou
	// odpovědi, které samy o sobě neznamenají nic — u nich se laťka na shodu tématu
	// zvedá. Naopak vzácná hodnota („12 V") je silný signál i bez podobného znění.
	const cetnostOdpovedi = new Map();
	for (const p of polozky) if (p.normSpravna) cetnostOdpovedi.set(p.normSpravna, (cetnostOdpovedi.get(p.normSpravna) ?? 0) + 1);

	const nalezy = [];
	let dvojicCelkem = 0;
	let proslo1Odpoved = 0;
	for (let i = 0; i < polozky.length; i++) {
		for (let j = i + 1; j < polozky.length; j++) {
			const A = polozky[i];
			const B = polozky[j];
			if (A.klic === B.klic) continue; // dvojice uvnitř bloku hlídá uniky.mjs
			dvojicCelkem++;

			const odp = shodaOdpovedi(A.spravna, B.spravna);
			if (!odp) continue;
			proslo1Odpoved++;

			// Shoda TÉMATU: musí sedět nosné slovo, ne procento překryvu.
			const spolecnaA = sdilena(A.tokeny, B.tokeny);
			if (!spolecnaA.length) continue;
			const vahaSpolecna = spolecnaA.reduce((s, x) => s + idf(x), 0);
			const vahaA = A.tokeny.reduce((s, x) => s + idf(x), 0);
			const vahaB = B.tokeny.reduce((s, x) => s + idf(x), 0);
			const kryti = vahaSpolecna / Math.max(1e-9, Math.min(vahaA, vahaB));

			// Laťka podle toho, jak vzácná a jak tvrdá je ta odpověď.
			//
			// Jediné sdílené slovo stačí VÝHRADNĚ u vzácné číselné hodnoty s jednotkou:
			// „12 V" se na webu vyskytuje třikrát, takže dvě otázky, které si o něj obě
			// říkají, míří na tentýž údaj, i když se ptají jinými slovy — a přesně takhle
			// vypadá dvojice „Jaké napětí má autobaterie?" × „Jaké je bezpečné střídavé
			// napětí podle normy?", kterou by přísnější laťka minula.
			// U slovních odpovědí jedno sdílené slovo nestačí ani zdaleka: „lithiový"
			// se pojí přes samotné „článek", „v diamantu" přes „světlo" — to jsou dvojice
			// bez vztahu. Tam se proto žádají nejméně dvě společná nosná slova.
			// Výjimka pro číselnou odpověď NEPLATÍ u výpočetních úloh: dvě různá zadání
			// vedou běžně k témuž výsledku, aniž by šlo o tutéž otázku („Jakou silou
			// působí Země na 1 kg?" 10 N × „Síla 20 N na rameni 2 m — co vyrovná páku
			// na 4 m?" 10 N). Poznají se podle toho, že samo ZNĚNÍ nese čísla s jednotkami,
			// a to pokaždé jiná. Tentýž typ falešného poplachu popisuje i uniky.mjs.
			const stejneZadani = stejnaMnozina(hodnoty(A.o.text), hodnoty(B.o.text));
			const cetnost = cetnostOdpovedi.get(A.normSpravna) ?? 0;
			let minSlov;
			let minKryti;
			if (odp.hodnotaSJednotkou && cetnost <= 3 && stejneZadani) {
				minSlov = 1;
				minKryti = 0.12;
			} else if (cetnost <= 10) {
				minSlov = 2;
				minKryti = 0.35;
			} else {
				minSlov = 2;
				minKryti = 0.5;
			}
			if (spolecnaA.length < minSlov || kryti < minKryti) continue;
			// Samotná číslice ze zadání není nosné slovo: dvojici „rychlost 2×" ×
			// „cesta 2+5" spojovala jedině dvojka. Aspoň jedno pojítko musí být slovo.
			if (!spolecnaA.some((s) => !/^[0-9.]+$/.test(s))) continue;

			// Která z otázek je „snazší"? Pro učitele je to podstatná část nálezu:
			// opakování ve vyšším ročníku, které je KRATŠÍ a obecnější než původní
			// zadání, nemá cenu opakování — a přesně to kontrolor u F8 × F9 popsal.
			const vyssi = poradiRocniku(B.rocnik) > poradiRocniku(A.rocnik) ? B : poradiRocniku(A.rocnik) > poradiRocniku(B.rocnik) ? A : null;
			const nizsi = vyssi ? (vyssi === A ? B : A) : null;
			const vyssiJeSnazsi = Boolean(vyssi && vyssi.tokeny.length < nizsi.tokeny.length && sdilena(vyssi.tokeny, nizsi.tokeny).length >= vyssi.tokeny.length - 1);

			nalezy.push({
				a: A,
				b: B,
				duvod: odp.jak,
				kryti,
				spolecna: spolecnaA,
				skore: odp.sila * (kryti + (cetnost <= 3 ? 0.4 : 0)),
				stejnyRocnik: A.rocnik === B.rocnik,
				vyssiJeSnazsi,
				vyssiRocnik: vyssi?.rocnik ?? null,
			});
		}
	}
	nalezy.sort((x, y) => y.skore - x.skore);
	return { nalezy, otazek: polozky.length, bloku: new Set(polozky.map((p) => p.klic)).size, vynechanoShrnuti, dvojicCelkem, proslo1Odpoved };
}

function poradiRocniku(r) {
	const m = /^(\d+)/.exec(String(r ?? ''));
	return m ? Number(m[1]) : 0;
}

function vypis(v, filtr) {
	const vybrane = filtr ? v.nalezy.filter((n) => n.a.klic.includes(filtr) || n.b.klic.includes(filtr)) : v.nalezy;
	console.log(
		`Porovnáno ${v.otazek} otázek ze ${v.bloku} bloků (${v.vynechanoShrnuti} souhrnných /shrnuti/ vynecháno záměrně).\n` +
			`Dvojic napříč bloky: ${v.dvojicCelkem.toLocaleString('cs')} — z toho ${v.proslo1Odpoved} se shodlo v jádru odpovědi.\n`,
	);
	console.log(`PODEZŘELÉ DVOJICE: ${vybrane.length}${filtr ? ` (filtr „${filtr}" z celkových ${v.nalezy.length})` : ''}\n`);

	// Souhrn napřed: bez něj je osmdesát dvojic hromada, se kterou se nedá nic dělat.
	const skupiny = new Map();
	for (const n of vybrane) {
		const k = n.stejnyRocnik ? `${n.a.rocnik} (jiný blok téhož ročníku)` : [n.a.rocnik, n.b.rocnik].sort().join(' × ');
		skupiny.set(k, (skupiny.get(k) ?? 0) + 1);
	}
	for (const [k, p] of [...skupiny].sort((x, y) => y[1] - x[1])) console.log(`   ${String(p).padStart(3)} × ${k}`);
	const snazsi = vybrane.filter((n) => n.vyssiJeSnazsi).length;
	console.log(`   z toho ${snazsi} dvojic, kde VYŠŠÍ ročník má kratší (snazší) znění téhož — opakování bez přitvrzení\n`);
	for (const n of vybrane) {
		const kriz = n.stejnyRocnik ? 'týž ročník, jiný blok' : `${n.a.rocnik} × ${n.b.rocnik}`;
		console.log(`── ${kriz} | ${n.duvod} | krytí tématu ${Math.round(n.kryti * 100)} %`);
		console.log(`   ${n.a.klic}\n     Q: ${n.a.o.text}\n     A: ${n.a.spravna}`);
		console.log(`   ${n.b.klic}\n     Q: ${n.b.o.text}\n     A: ${n.b.spravna}`);
		console.log(`   společná nosná slova: ${n.spolecna.join(', ')}`);
		if (n.vyssiJeSnazsi) console.log(`   ⚠️  ${n.vyssiRocnik} má KRATŠÍ (snazší) znění téhož — opakování by mělo přitvrdit, ne ulevit`);
		console.log('');
	}
}

/**
 * Obousměrný důkaz, že měřidlo měří (pravidlo „hláška není důkaz").
 * Běží nad KOPIÍ naimportovaných dat v paměti — do `kvizy.ts` se nesahá.
 */
async function overeni() {
	const data = await nactiData();
	const puvodni = zkontrolujKrizove(data);
	const klicDvojice = (n) => `${n.a.o.text} ⟷ ${n.b.o.text}`;
	const puvodniKlice = new Set(puvodni.nalezy.map(klicDvojice));

	// (a) PODVRH: do bloku 6. ročníku se přidá otázka na fakt, který se učí v osmičce.
	const podvrh = JSON.parse(JSON.stringify(data));
	const cil = 'fyzika/6-rocnik/fyzikalni-veliciny/delka';
	podvrh.kvizy[cil] = [
		...podvrh.kvizy[cil],
		{
			text: 'Jaké napětí má plochá baterie do svítilny?',
			odpovedi: ['4,5 V', '9 V', '1,5 V'],
			vysvetleni: 'Plochá baterie má 4,5 V.',
		},
	];
	const sPodvrhem = zkontrolujKrizove(podvrh);
	const nove = sPodvrhem.nalezy.filter((n) => !puvodniKlice.has(klicDvojice(n)) && (n.a.klic === cil || n.b.klic === cil));
	console.log(`(a) PODVRH — vložena otázka „Jaké napětí má plochá baterie do svítilny?" do ${cil}`);
	console.log(`    nálezů před vložením: ${puvodni.nalezy.length}, po vložení: ${sPodvrhem.nalezy.length}`);
	for (const n of nove) console.log(`    NAŠLO: ${n.a.klic} ⟷ ${n.b.klic}\n      „${n.a.o.text}" ⟷ „${n.b.o.text}" (${n.duvod})`);
	const podvrhOk = nove.length > 0;
	console.log(`    ${podvrhOk ? '✅ podvrh nalezen' : '❌ PODVRH PROŠEL NEPOVŠIMNUT'}\n`);

	// (b) ZDRAVÝ STAV: dvojice, která má 100% shodu slov, ale je to jiný jev,
	// se hlásit NESMÍ. Kdyby se měřidlo řídilo podobností znění, spadlo by na ní.
	const past = puvodni.nalezy.filter(
		(n) => /elektrostatick|elektromagnetick/.test(normalizuj(n.a.o.text)) && /elektrostatick|elektromagnetick/.test(normalizuj(n.b.o.text)) && n.a.spravna !== n.b.spravna,
	);
	const zdravyOk = past.length === 0;
	console.log('(b) ZDRAVÝ STAV — „Co je elektrostatická indukce?" × „Co je elektromagnetická indukce?" (100 % shodných slov, různý jev)');
	for (const n of past) console.log(`    FALEŠNĚ HLÁSÍ: „${n.a.o.text}" ⟷ „${n.b.o.text}"`);
	console.log(`    ${zdravyOk ? '✅ mlčí správně' : '❌ FALEŠNÝ POPLACH'}`);

	process.exitCode = podvrhOk && zdravyOk ? 0 : 1;
	console.log(`\nVÝSLEDEK OVĚŘENÍ: ${podvrhOk && zdravyOk ? 'OBOUSMĚRNĚ DOLOŽENO' : 'NEDOLOŽENO'}`);
}

// AŽ SE Z TOHO BUDE DĚLAT BRÁNA (postup, ne přání):
//  1. Učitel projde jeden výpis a u každé dvojice řekne „duplicita" / „záměrné opakování".
//  2. Dvojice označené jako v pořádku se zapíšou do výjimek (soubor s důvodem u každé),
//     aby brána hlídala jen to, co zbylo.
//  3. Do `testy/obousmerne.json` se doplní záznam s podvrhem a zdravým stavem
//     (`node testy/uniky-krizove.mjs --overeni` je připravený jako ten test) — zapisuje
//     koordinátor, ne tenhle skript.
//  4. Teprve pak `zkontroluj.mjs` může počet nálezů hlídat rohatkou „nesmí přibýt".
if (import.meta.url === `file://${process.argv[1]}`) {
	const arg = process.argv[2];
	if (arg === '--overeni') await overeni();
	else vypis(zkontrolujKrizove(await nactiData()), arg);
}

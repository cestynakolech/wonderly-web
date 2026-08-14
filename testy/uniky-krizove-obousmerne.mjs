// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky-krizove.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
//
// Proč zvlášť tenhle soubor: rejstřík (`testy/obousmerne.mjs`) spouští doklad jako
// `node <cesta>` BEZ ARGUMENTŮ. Zabudovaný přepínač `--overeni` se tudy spustit nedá:
// zápis „testy/uniky-krizove.mjs --overeni" hlásí „CHYBÍ SOUBOR", a holá cesta by
// měřidlo spustila v režimu hlášení — vypsalo by nálezy, skončilo kódem 0 a rejstřík
// by to prohlásil za doložené. To by byl FALEŠNÝ DOKLAD, tedy přesně ta vada, proti
// které rejstřík vznikl. Do výjimek `NENI_MERIDLO` proto patří tenhle soubor s důkazem,
// ne měřidlo samotné.
//
// Většina případů běží nad SYNTETICKÝMI daty (rychlé, nezávislé na obsahu webu),
// na konci je kalibrační kotva nad skutečnými kvízy.
//
// Spuštění: node testy/uniky-krizove-obousmerne.mjs
import { zkontrolujKrizove, stejnySlovniZaklad, hodnoty, nosneTokeny } from './uniky-krizove.mjs';
import { nactiData } from './data.mjs';

let chyb = 0;
let kontrol = 0;

function tvrdi(popis, podminka) {
	kontrol++;
	if (!podminka) {
		chyb++;
		console.log(`  ✗ ${popis}`);
	}
}

const ot = (text, odpovedi, vysvetleni = '') => ({ text, odpovedi, vysvetleni });
/** Spustí měřidlo nad syntetickými bloky a vrátí počet nálezů + nálezy. */
const nad = (kvizy) => zkontrolujKrizove({ kvizy });

// ---------------------------------------------------------------- PRIMITIVY
// Porovnání slov prefixem je jádro celého měřidla — když povolí, planí všechno.
{
	tvrdi('„odpor" a „odporem" je totéž slovo', stejnySlovniZaklad('odpor', 'odporem'));
	tvrdi('„zinkova" a „zinku" je totéž slovo', stejnySlovniZaklad('zinkova', 'zinku'));
	// Past, kvůli které se nesmí kmenovat na pevnou délku (uniky.mjs kmenuje na 4 znaky
	// a tyhle dva pojmy mu splynou v „elek" — dvě různé otázky pak vyjdou na 100 %).
	tvrdi('„elektrostaticka" a „elektromagneticka" jsou RŮZNÁ slova', !stejnySlovniZaklad('elektrostaticka', 'elektromagneticka'));
	tvrdi('„vodice" a „vodivost" jsou RŮZNÁ slova', !stejnySlovniZaklad('vodice', 'vodivost'));
	// Česká hranice slova: `\b` v JS zná jen ASCII a uvnitř „tužkový" vidí slovo „kov".
	tvrdi('„tuzkovy" NEobsahuje slovo „kov"', !stejnySlovniZaklad('tuzkovy', 'kov'));
	tvrdi('„tuzkove" a „kovu" jsou různá slova', !stejnySlovniZaklad('tuzkove', 'kovu'));
	tvrdi('token se needěluje uvnitř slova', nosneTokeny('tužkový obal kolem kovu').includes('tuzkovy'));
	// Čísla se musí rovnat přesně, prefix nestačí.
	tvrdi('„12" a „120" nejsou totéž', !stejnySlovniZaklad('12', '120'));
	// Desetinná čárka: normalizace by z „4,5 V" udělala „4 5 v" a splynulo by s „5,4 V".
	tvrdi('hodnota „4,5 V" se čte i s jednotkou', [...hodnoty('4,5 V')].join() === '4.5|v');
	tvrdi('„4,5 V" a „5,4 V" nejsou táž hodnota', [...hodnoty('4,5 V')].join() !== [...hodnoty('5,4 V')].join());
}

// ---------------------------------------------------------------- ZDRAVÝ STAV
// Dvě otázky s 100 % shodných slov, ale na jiný jev. Kdyby se měřidlo řídilo
// podobností znění (jak se nabízí), spadne přesně tady.
{
	const v = nad({
		'fyzika/8-rocnik/elektrina/elektricke-pole': [ot('Co je elektrostatická indukce?', ['přesun volných elektronů', 'vznik napětí', 'pohyb jádra'])],
		'fyzika/9-rocnik/indukce-a-stridavy-proud/elektromagneticka-indukce': [ot('Co je elektromagnetická indukce?', ['vznik napětí při změně pole', 'přesun volných elektronů', 'pohyb jádra'])],
	});
	tvrdi('různý jev se stejnými slovy NENÍ nález', v.nalezy.length === 0);
	tvrdi('počítadlo vstupů sedí (2 otázky)', v.otazek === 2);
}

// ---------------------------------------------------------------- PODVRH: TÝŽ FAKT VE DVOU ROČNÍCÍCH
{
	const v = nad({
		'fyzika/8-rocnik/elektrina/chemicke-zdroje-napeti': [ot('Jaké napětí má plochá baterie?', ['4,5 V', '1,5 V', '9 V'])],
		'fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti': [ot('Jaké napětí má plochá baterie?', ['4,5 V', '1,5 V', '9 V'])],
	});
	tvrdi('táž otázka ve dvou ročnících se najde', v.nalezy.length === 1);
	tvrdi('nález nese důvod se shodnou hodnotou', /4\.5 v/.test(v.nalezy[0]?.duvod ?? ''));
}

// PODVRH: vzácná hodnota s jednotkou a JEDINÉ společné slovo. Na tomhle případu
// stojí nejtěsnější platný nález na webu (autobaterie 12 V × norma 12 V, krytí 18 %);
// kdyby se laťka zvedla „aby to míň planilo", zmizí i on.
{
	const v = nad({
		'fyzika/8-rocnik/elektrina/chemicke-zdroje-napeti': [ot('Jaké napětí má autobaterie (olověný akumulátor)?', ['12 V', '24 V', '6 V'])],
		'fyzika/9-rocnik/elektricka-energie-a-bezpecnost/ucinky-proudu-bezpecnost': [ot('Jaké je bezpečné střídavé napětí podle normy?', ['12 V', '230 V', '50 V'])],
	});
	tvrdi('vzácná hodnota s jednotkou stačí i na jediné společné slovo', v.nalezy.length === 1);
}

// PODVRH: slovní odpověď řečená jinak („zinková nádoba" × „ze zinku (nádoba)").
{
	const v = nad({
		'fyzika/8-rocnik/elektrina/chemicke-zdroje-napeti': [ot('Jaká je záporná elektroda suchého článku?', ['zinková nádoba', 'uhlíková tyčinka', 'měděný plech'])],
		'fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti': [ot('Z čeho je záporná elektroda suchého článku?', ['ze zinku (nádoba)', 'z uhlíku', 'z mědi'])],
	});
	tvrdi('táž odpověď řečená jinými slovy se najde', v.nalezy.length === 1);
}

// ---------------------------------------------------------------- REGRESE FALEŠNÝCH POPLACHŮ
// Tohle všechno první verze měřidla hlásila (163 nálezů, planý ocas).
{
	// Rozdílná hodnota = jiný fakt, i když je znění skoro totožné.
	tvrdi(
		'otázky lišící se jen hodnotou NEJSOU duplicita',
		nad({
			'fyzika/8-rocnik/elektrina/zdroje': [ot('Jaké napětí má plochá baterie?', ['4,5 V', '1,5 V', '9 V'])],
			'fyzika/9-rocnik/elektricky-proud/zdroje': [ot('Jaké napětí má suchý článek?', ['1,5 V', '4,5 V', '9 V'])],
		}).nalezy.length === 0,
	);

	// Číslo bez jednotky: „4×" (kolikrát vzroste energie) × „součet 4" (délka cesty).
	tvrdi(
		'shodné číslo BEZ jednotky není nález',
		nad({
			'fyzika/8-rocnik/energie/pohybova-a-polohova-energie': [ot('Zvětší se rychlost tělesa 2×. Kolikrát vzroste pohybová energie?', ['4×', '2×', '8×'])],
			'informatika/7-rocnik/modelovani-grafy-schemata/ohodnocene-grafy': [ot('Cesta A→B měří 2+5, cesta A→C→B měří 1+2+1. Která je kratší?', ['A→C→B (součet 4)', 'A→B (součet 7)', 'jsou stejné'])],
		}).nalezy.length === 0,
	);

	// Týž VÝSLEDEK ze dvou různých zadání — klasická past výpočetních úloh.
	tvrdi(
		'stejný výsledek dvou různých výpočtů není nález',
		nad({
			'fyzika/7-rocnik/sily-kolem-nas/gravitacni-sila': [ot('Jakou silou působí Země na těleso o hmotnosti 1 kg?', ['přibližně 10 N', 'přibližně 1 N', 'přibližně 100 N'])],
			'fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky': [ot('Síla 20 N působí na rameni 2 m. Jaká síla vyrovná páku na rameni 4 m?', ['10 N', '40 N', '20 N'])],
		}).nalezy.length === 0,
	);

	// Slovní odpověď spojená JEDINÝM obecným slovem — takhle se „lithiový" pojil
	// přes „článek" a „v diamantu" přes „světlo".
	tvrdi(
		'slovní odpověď s jediným společným slovem není nález',
		nad({
			'fyzika/8-rocnik/elektrina/chemicke-zdroje-napeti': [ot('Který článek je vhodný do mobilu a notebooku?', ['lithiový', 'zinkouhlíkový', 'olověný'])],
			'fyzika/9-rocnik/elektricky-proud-v-latkach/chemicke-zdroje-napeti': [ot('Které články jsou kvalitní i po dlouhém skladování?', ['lithiové', 'zinkouhlíkové', 'alkalické'])],
		}).nalezy.length === 0,
	);

	// Česká hranice slova NAD DATY: jediné, co by tyhle dvě otázky mohlo spojit, je
	// domnělé slovo „kov" uvnitř „tužkový". Měřidlo, které by slova porovnávalo
	// podřetězcem (nebo `\b`), tu vyrobí falešný nález.
	tvrdi(
		'„tužkový" se nespojí s „kovový" (česká hranice slova)',
		nad({
			'fyzika/6-rocnik/latky/vlastnosti': [ot('Z čeho je vyroben tužkový obal?', ['ze dřeva', 'z kovu', 'z plastu'])],
			'fyzika/8-rocnik/elektrina/vodice': [ot('Z čeho je vyroben kovový hrot?', ['ze dřeva', 'z plastu', 'z papíru'])],
		}).nalezy.length === 0,
	);
}

// ---------------------------------------------------------------- POČÍTADLO VSTUPŮ A OKRAJE
{
	const prazdne = nad({});
	tvrdi('prázdná data nespadnou', prazdne.nalezy.length === 0 && prazdne.otazek === 0);
	const nesmysl = nad({ 'fyzika/8-rocnik/a/b': null, 'fyzika/9-rocnik/a/b': [] });
	tvrdi('neplatný blok nespadne', nesmysl.nalezy.length === 0);
	// Souhrnné bloky se musí vynechat PŘIZNANĚ — jinak by každá otázka byla duplicitou sebe sama.
	const shrnuti = nad({
		'fyzika/8-rocnik/elektrina/shrnuti/vse': [ot('Jaké napětí má plochá baterie?', ['4,5 V', '1,5 V', '9 V'])],
		'fyzika/9-rocnik/elektricky-proud/zdroje': [ot('Jaké napětí má plochá baterie?', ['4,5 V', '1,5 V', '9 V'])],
	});
	tvrdi('bloky /shrnuti/ se vynechávají', shrnuti.nalezy.length === 0 && shrnuti.vynechanoShrnuti === 1);
}

// ---------------------------------------------------------------- KALIBRAČNÍ KOTVA (SKUTEČNÁ DATA)
// Měřidlo musí najít všech šest dvojic F8 × F9, které 14. 8. 2026 ručně našel nezávislý
// kontrolor. Tohle je kotva, se kterou se nedá hádat: kdyby se laťka utáhla „aby to míň
// planilo", spadne to tady a bude vidět KTERÁ dvojice se ztratila.
{
	const v = zkontrolujKrizove(await nactiData());
	const dvojice = (fragA, fragB) =>
		v.nalezy.some((n) => {
			const rocniky = [n.a.rocnik, n.b.rocnik].sort().join();
			if (rocniky !== '8-rocnik,9-rocnik') return false;
			const [osma, devata] = n.a.rocnik === '8-rocnik' ? [n.a, n.b] : [n.b, n.a];
			return osma.o.text.includes(fragA) && devata.o.text.includes(fragB);
		});

	tvrdi('KOTVA 1/6: plochá baterie (4,5 V)', dvojice('plochá baterie', 'plochá baterie'));
	tvrdi('KOTVA 2/6: suchý článek (1,5 V)', dvojice('suchý článek (monočlánek)', 'běžný suchý článek'));
	tvrdi('KOTVA 3/6: záporná elektroda suchého článku (zinek)', dvojice('záporná elektroda suchého článku', 'záporná elektroda suchého článku'));
	tvrdi('KOTVA 4/6: odpor kovu při zahřátí (roste)', dvojice('odporem kovu při zahřátí', 'odpor kovu při zahřátí'));
	tvrdi('KOTVA 5/6: bezpečné střídavé napětí (12 V)', dvojice('vlhkých a zvlášť nebezpečných prostorách', 'bezpečné střídavé napětí podle normy'));
	tvrdi('KOTVA 6/6: autobaterie 12 V × norma 12 V', dvojice('autobaterie (olověný akumulátor)', 'bezpečné střídavé napětí podle normy'));

	// A tatáž past jako nahoře, ale nad ostrými daty: měřidlo o ní musí mlčet.
	const past = v.nalezy.some((n) => /indukce/.test(n.a.o.text) && /indukce/.test(n.b.o.text) && n.a.spravna !== n.b.spravna);
	tvrdi('nad ostrými daty mlčí o dvojici elektrostatická × elektromagnetická indukce', !past);

	// Rozsah nálezů: seznam má mít smysl číst. Kdyby se laťka rozvolnila, poleze to
	// do stovek (první verze měla 163) — a kdyby se utáhla, zmizí kotva výše.
	tvrdi(`počet nálezů je v čitelném rozsahu (je jich ${v.nalezy.length})`, v.nalezy.length > 0 && v.nalezy.length <= 120);
	tvrdi('porovnal se celý web (přes 2000 otázek)', v.otazek > 2000);
}

console.log(chyb === 0 ? `✅ uniky-krizove.mjs — obousměrně ověřeno, ${kontrol} kontrol.` : `❌ ${chyb} z ${kontrol} kontrol selhalo.`);
process.exit(chyb === 0 ? 0 : 1);

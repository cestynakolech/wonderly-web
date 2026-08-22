// Vazby MEZI otázkami jednoho kvízového bloku — duplicity a úniky odpovědí.
//
// Proč to existuje (audit 2. 8. 2026, tři nezávislí auditoři):
// Dvě vady se v záznamech opakují od 29. 7. pořád dokola a obě se dosud hledaly RUČNĚ:
//
//  1. DUPLICITNÍ PÁRY OTÁZEK — bloky vznikaly slepením dvou dávek, takže se v devíti
//     blocích našly 3–4 duplicitní páry z 10 otázek (31. 7.), u LED displeje 4 z 10.
//     Pravidlo proti tomu v rejstříku vůbec nebylo.
//  2. ÚNIK ODPOVĚDI — vysvětlení jedné otázky odpovídá na otázku jinou; žák, který se
//     splete u vlhkoměru, dostane zadarmo odpověď o anemometru (31. 7.). Nejhorší je,
//     že tuhle vadu ZANÁŠEJÍ SAMY OPRAVY: „druhé kolo odhalilo hlavně úniky, které
//     zanesly opravy z prvního kola".
//
// Pokyn „hledej to v každé dávce" tu selhával, protože se na něj v tempu zapomnělo.
// Tady je z toho počítání.
//
// POZOR na falešné poplachy (pravidlo: falešný poplach je horší než žádná kontrola).
// Všechny otázky v bloku jsou o jednom tématu, takže samotná shoda slov nic neznamená.
// Únik se proto hlásí, jen když platí OBOJÍ:
//   (a) v textu/vysvětlení otázky A jsou ROZLIŠUJÍCÍ slova správné odpovědi B — tedy
//       slova, kterými se správná odpověď B liší od svých vlastních distraktorů
//       (co je ve všech třech odpovědích B, nerozhoduje a nic neprozrazuje), a
//   (b) A zároveň ukazuje na TÉMA otázky B (sdílí s jejím zněním nosné slovo),
//       aby žák vůbec poznal, ke které otázce se ta informace hodí.
//
// ════════════════════════════════════════════════════════════════════════════════
// ZNÁMÉ MEZE MĚŘIDLA (sepsáno 19. 8. 2026 po třetím kole ladění — ať se příště
// neztrácí čas objevováním téhož). Heuristika nikdy nebude neprůstřelná; tohle je
// hranice, kterou má vědomě a kterou nemá smysl donekonečna posouvat.
//
// CO SPOLEHLIVĚ CHYTÁ (každé kryto testem v testy/uniky-obousmerne.mjs):
//   • vysvětlení jedné otázky doslova odpovídá na jinou (vlhkoměr × anemometr),
//   • číselnou odpověď prozrazenou i JINÝM ZÁPISEM TÉŽE JEDNOTKY („80 °C" × „80 stupňů",
//     „230 minut" × „230 min", „3000 metrů" × „3000 m"),
//   • holou číselnou odpověď bez jednotky („1,4"), i když ji zdroj vysloví ve výpočtu,
//   • hodnotu prozrazenou v ZNĚNÍ zdrojové otázky, ne jen ve vysvětlení,
//   • duplicitní páry otázek se shodnou správnou odpovědí a podobným zněním,
//   • JEDNOTOKENOVOU odpověď, která je PŘÍPONA SOUBORU („.docx"), doslova citovanou
//     v cizím vysvětlení (doplněno 22. 8. 2026 po nálezu nezávislé kontroly). Úzce
//     omezeno jen na tento tvar (odpověď začíná tečkou) — obecné jednoslovné odborné
//     pojmy („objem", „hypotéza", „plazma") úmyslně únikem NEJSOU, viz mez 8 níž.
//
// CO PRINCIPIÁLNĚ NECHYTÍ (ověřeno zkouškou, ne odhadem):
//   1. ČÍSLO NAPSANÉ SLOVEM. „…voda vře kolem osmdesáti stupňů Celsia" proti odpovědi
//      „přibližně 80 stupňů" NENAJDE — `hodnotyZTextu` čte jen číslice. Změřeno:
//      týž pár psaný číslicí dá 1 nález, psaný slovem 0. Šlo by doplnit slovník
//      českých číslovek (jedna…dvacet, desítky, sta), ale je to práce navíc a
//      v datech se čísla slovem skoro nepíšou.
//   2. TÁŽ HODNOTA V JINÉ JEDNOTCE. Měřidlo jednotky NEPŘEPOČÍTÁVÁ: „1 m" a „100 cm",
//      „300 000 km za sekundu" a „300 000 km/s" jsou pro něj různé hodnoty. Přepočet
//      by šel doplnit (převodní tabulka na základní jednotku), ale hrozí, že spolu
//      začnou splývat úlohy na převod jednotek, které jsou legitimní.
//   3. NEZNÁMÁ JEDNOTKA = žádná jednotka. Co není v SYMBOLY/SLOVA_JEDNOTEK („25 LED"),
//      dostane prázdnou jednotku a porovnává se jen číslem — tam platí stará, hrubší
//      přesnost. Rozšíření = dopsat řádek do tabulky.
//   4. VÝZNAM. Přeformulovaná odpověď bez sdílených slov („částice se rozkmitají"
//      × „roste vnitřní energie") je pro měřidlo neviditelná — porovnávají se slova
//      a hodnoty, ne smysl. Na tohle je potřeba člověk nebo jazykový model.
//   5. JEN UVNITŘ JEDNOHO BLOKU. Únik mezi otázkami RŮZNÝCH bloků hlídá jiné měřidlo
//      (testy/uniky-krizove.mjs); tady se bloky neporovnávají.
//   6. ÚNIK MIMO TEXT OTÁZEK. Odpověď prozrazená ve výkladu podtématu, v popisku
//      simulace nebo v obrázku sem vůbec nedosáhne.
//   7. JEDNOCIFERNÁ ČÍSLA se za hodnotu nepovažují („6 N"). Bez toho by každý příklad
//      hlásil únik proti každému; cena je slepota vůči odpovědím typu „5 V".
//   8. JEDNOSLOVNÁ ODPOVĚĎ, KTERÁ NENÍ PŘÍPONA. „Nepoužívané aplikace zabírají místo
//      a mohou být riziko." proti odpovědi „uvolní se místo a sníží se riziko" (2 ze
//      4 rozlišujících slov, pokrytí 50 %) NENAJDE — laťka „aspoň dvě slova při
//      pokrytí 70 %" na to nedosáhne a snížení laťky bylo zkusmo změřeno: vyrobilo
//      166 falešných poplachů nad celým webem (odborné pojmy typu „objem" se
//      v tematickém bloku přirozeně opakují). Na tenhle typ (přeformulovaná fráze
//      bez jediného stoprocentně unikátního slova) je potřeba člověk nebo jazykový
//      model — přesně nezávislý kontrolor, který ho 22. 8. 2026 našel.
// ════════════════════════════════════════════════════════════════════════════════
import { nactiData } from './data.mjs';

/** malá písmena, bez diakritiky, jen slova
 *
 * MOCNINOVÉ ZNAKY „²"/„³" se PŘEVÁDÍ na obyčejné „2"/„3" (ne zahazují) — jinak by
 * `[^a-z0-9\s]` smazal jednotku plochy/objemu na jednotku délky a „5 m³" by
 * splynulo s „5 m" (nález nezávislé kontroly 22. 8. 2026, blok o objemu: fráze
 * „1 m³" se takhle normalizovala na „1 m" a `fraziovyUnik` pak hlásil únik mezi
 * dvěma otázkami, které mluví o dvou různých veličinách).
 */
export function normalizuj(text) {
	return String(text ?? '')
		.replace(/²/g, '2')
		.replace(/³/g, '3')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

// Slova, která nenesou význam — bez nich by „jaké je" stačilo na shodu čehokoli.
// Exportované, aby si je mohlo půjčit křížové porovnání (testy/uniky-krizove.mjs)
// a nevznikal druhý, časem rozjetý seznam téhož.
export const STOP = new Set(
	('a i o u v s k z do na od po pro za pri při je jsou byl byla bylo bude co kdy kde jak jaka jake jaky jaky ktera ktere ktery ' +
		'se si to ten ta te tim tom tomu nez nebo ale tak take vsak proto ze aby kdyz ne ano musi muze ma mit jen jeste uz ' +
		'kolik cim cemu ceho cim jakou jakym jakych jednu jeden jedna dve tri prvni druhy treti ' +
		// Generická tázací zájmena a kvantifikátory — nesou gramatiku otázky, ne
		// odpověď. Bez nich se „kterými" a „všech" počítaly jako nosné slovo a
		// zbytečně přemosťovaly dvě jinak nesouvisející otázky (nález 22. 8. 2026).
		'kterym kterymi kterem kterou vsech vsechny vsechna vsichni jakykoli jakekoli')
		.split(' ')
		.filter(Boolean),
);

/** Množina nosných slov (≥ 4 znaky, mimo stopky). */
export function slova(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => s.length >= 4 && !STOP.has(s)),
	);
}

/**
 * Nosná slova VČETNĚ ČÍSEL — pro hledání úniku odpovědi.
 *
 * Proč zvlášť od `slova()` (nález 19. 8. 2026): filtr „≥ 4 znaky" zahazoval i čísla,
 * takže u číselné odpovědi („kolem 80 °C") zbylo jediné rozlišující slovo a podmínka
 * `prozrazena.length >= 2` se nemohla nikdy splnit — měřidlo bylo vůči číselným
 * únikům slepé. Skutečný únik, který takhle proklouzl: vysvětlení u „Jak závisí
 * teplota varu na tlaku?" znělo „V horách vře voda dřív (~80 °C)." a jiná otázka
 * v témž bloku se ptala, kolik stupňů má vroucí voda v horách (odpověď „kolem 80 °C").
 * Právě u čísel je přitom únik nejtvrdší — číslo JE celá odpověď.
 * (Totéž už dřív řešila `slovaZneni()` pro porovnání dvou znění; tady se ale kmeny
 * needěláme, protože se porovnává se skutečným textem otázky, ne dvě znění mezi sebou.)
 */
export function slovaSCisly(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => (s.length >= 4 || /[0-9]/.test(s)) && !STOP.has(s)),
	);
}

/**
 * Vícemístná čísla obsažená v textu (po normalizaci). Jednociferná se nepočítají —
 * stejně jako u `celeCislo` níž: „2" v „2 kg" je běžná součást zadání, ne hodnota.
 */
export function cislaZTextu(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => /^[0-9]+$/.test(s) && s.length >= 2),
	);
}

/**
 * Dvojice sousedních slov, v nichž je vícemístné číslo („80 c", „100 kg", "kolem 80").
 * Samotné číslo nic neznamená — teprve číslo U SVÉ JEDNOTKY je odpověď. Bez tohohle
 * rozlišení hlásilo měřidlo za únik i „× 10" ve výpočtu F = m · g proti odpovědi „asi 10 N".
 */
export function dvojiceSCislem(text) {
	const t = normalizuj(text).split(' ').filter(Boolean);
	const jeCislo = (x) => /^[0-9]+$/.test(x) && x.length >= 2;
	const out = new Set();
	for (let i = 0; i + 1 < t.length; i++) {
		if (jeCislo(t[i]) || jeCislo(t[i + 1])) out.add(`${t[i]} ${t[i + 1]}`);
	}
	return out;
}

/**
 * JEDNOTKY: různé zápisy téže jednotky sjednocené na jeden tvar.
 *
 * Dva seznamy schválně:
 *   • SYMBOLY se porovnávají PŘESNĚ VČETNĚ VELIKOSTI PÍSMEN. Kdyby se „V" hledalo
 *     i malé, spadla by do jednotky napětí česká předložka („100 v roce") a stejně
 *     tak „a" do ampérů. Velké písmeno je tady jediné, co jednotku od slova odliší.
 *   • SLOVA (jednotka vypsaná česky) se porovnávají bez diakritiky a malými písmeny.
 *
 * Rozlišuje se ÚROVEŇ JEDNOTKY, ne jen veličina: „16 Hz" a „16 kHz" jsou dvě různé
 * hodnoty a nesmí splynout.
 */
const SYMBOLY = new Map(
	Object.entries({
		'°C': '°C',
		mm: 'mm', cm: 'cm', dm: 'dm', m: 'm', km: 'km',
		m2: 'm2', 'm²': 'm2', cm2: 'cm2', 'cm²': 'cm2', dm2: 'dm2', 'dm²': 'dm2',
		mm2: 'mm2', 'mm²': 'mm2', km2: 'km2', 'km²': 'km2',
		// KRYCHLOVÉ (objemové) jednotky — bez vlastního záznamu regex v `hodnotyZTextu`
		// zahodí „³" (není `\p{L}`) a „5 m³" splyne s „5 m" (nález 22. 8. 2026, VADA C:
		// „1 m³" × „1 m" v jiné otázce dávalo falešný číselný únik).
		m3: 'm3', 'm³': 'm3', cm3: 'cm3', 'cm³': 'cm3', dm3: 'dm3', 'dm³': 'dm3',
		mm3: 'mm3', 'mm³': 'mm3', km3: 'km3', 'km³': 'km3',
		l: 'l', ml: 'ml', dl: 'dl', hl: 'hl',
		mg: 'mg', g: 'g', dkg: 'dkg', kg: 'kg', t: 't',
		s: 's', ms: 'ms', min: 'min', h: 'h', hod: 'h',
		N: 'N', 'N·cm': 'N·cm', 'N.cm': 'N·cm', Ncm: 'N·cm',
		'N·m': 'N·m', 'N.m': 'N·m', Nm: 'N·m', 'N/kg': 'N/kg',
		Pa: 'Pa', hPa: 'hPa', kPa: 'kPa', MPa: 'MPa', bar: 'bar',
		J: 'J', kJ: 'kJ', MJ: 'MJ', W: 'W', kW: 'kW', MW: 'MW', Wh: 'Wh', kWh: 'kWh',
		V: 'V', mV: 'mV', kV: 'kV', A: 'A', mA: 'mA', 'Ω': 'Ω',
		Hz: 'Hz', kHz: 'kHz', MHz: 'MHz',
		'km/h': 'km/h', 'm/s': 'm/s', 'km/hod': 'km/h',
		'%': '%',
	}),
);
const SLOVA_JEDNOTEK = new Map();
for (const [kanon, varianty] of [
	['°C', 'stupnu stupne stupen stupnech stupni celsia'],
	['mm', 'milimetr milimetru milimetry milimetrech'],
	['cm', 'centimetr centimetru centimetry centimetrech'],
	['m', 'metr metru metry metrech'],
	['km', 'kilometr kilometru kilometry kilometrech'],
	['l', 'litr litru litry litrech'],
	['g', 'gram gramu gramy gramech'],
	['kg', 'kilogram kilogramu kilogramy kilogramech kilo'],
	['t', 'tuna tuny tun'],
	['s', 'sekunda sekundy sekund sekundu sekundach vterin vteriny vterinu'],
	['min', 'minuta minuty minut minutu minutach minutami'],
	['h', 'hodina hodiny hodin hodinu hodinach'],
	['N', 'newton newtonu newtony newtonech'],
	['Pa', 'pascal pascalu pascaly pascalech'],
	['J', 'joule joulu jouly joulech'],
	['W', 'watt wattu watty wattech'],
	['V', 'volt voltu volty voltech'],
	['A', 'amper amperu ampery amperech'],
	['Ω', 'ohm ohmu ohmy omu'],
	['Hz', 'hertz hertzu hertzy'],
	['%', 'procent procenta procento'],
]) {
	for (const v of varianty.split(' ')) SLOVA_JEDNOTEK.set(v, kanon);
}

/**
 * HODNOTY = ČÍSLO SPOLU S JEDNOTKOU. Vrací množinu klíčů „60|N·cm", „80|°C", „230|min".
 *
 * PROČ (nález nezávislé kontroly 19. 8. 2026): všechny tři průlomy měřidla měly JEDNU
 * příčinu — čísla se porovnávala jako HOLÉ ŘETĚZCE ČÍSLIC, bez ohledu na veličinu.
 * „60 cm" v zadání pak umlčelo únik hodnoty „60 N·cm", „230 V" ve zdroji zamaskovalo
 * doslova citovaných „230 minut" a „80 °C" se nespárovalo s „80 stupňů".
 * SHODA ČÍSLA U JINÉ VELIČINY NENÍ DŮVOD KONTROLU VYPNOUT — právě ta bývá únikem.
 *
 * Nejde to číst z `normalizuj()`: ta z desetinné čárky udělá mezeru („4,5 V" → „4 5 v")
 * a ze „N·cm" dva tokeny. Čte se proto ze syrového textu.
 *
 * Číslo bez rozpoznané jednotky (nebo následované obyčejným slovem, „25 LED") dostane
 * prázdnou jednotku — takové hodnoty se porovnávají mezi sebou, tak jako dřív holá čísla.
 * Jednociferná čísla se zahazují: „2" v „2 kg" je běžná součást zadání, ne hodnota.
 */
export function hodnotyZTextu(text) {
	const ven = new Set();
	// číslo · volitelná mezera · volitelná jednotka (písmena / ° / Ω / %, případně se
	// zlomkovou částí BEZ MEZER — „km/h", „N·cm", „N/kg"). Mezera kolem lomítka se
	// nepřipouští schválně: „230 V. Mimochodem" by jinak vyrobilo jednotku „V. Mimoc".
	// KRYCHLOVÉ/PLOŠNÉ MOCNINY „²"/„³" musí patřit do jednotky, ne se ztratit — bez
	// nich by „m³" a „m" byly nerozlišitelná stejná jednotka (VADA C, nález 22. 8. 2026).
	const re = /(\d+(?:[.,]\d+)?)[  ]?(°?[\p{L}Ω²³]{1,12}(?:[·./][\p{L}]{1,4})?|%|°C)?/gu;
	for (const m of String(text ?? '').matchAll(re)) {
		const cislo = m[1].replace(',', '.');
		if (cislo.replace(/[^0-9]/g, '').length < 2) continue;
		const syrova = (m[2] ?? '').normalize('NFC');
		const bezDiakritiky = syrova
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.toLowerCase();
		const jednotka = SYMBOLY.get(syrova) ?? SLOVA_JEDNOTEK.get(bezDiakritiky) ?? '';
		ven.add(`${cislo}|${jednotka}`);
	}
	return ven;
}

/** Má tahle hodnota rozpoznanou jednotku? („60|N·cm" ano, „60|" ne) */
function maJednotku(klic) {
	return klic.slice(klic.indexOf('|') + 1) !== '';
}

/**
 * Je to POČETNÍ ÚLOHA? = má v zadání aspoň jednu MĚŘITELNOU hodnotu, tedy číslo
 * s rozpoznanou jednotkou („2 kg", „4 cm", „3000 metrů").
 *
 * Schválně NE `hodnotyZTextu`: ta zahazuje jednociferná čísla (aby „2" v „2 kg" nešlo
 * za prozrazenou hodnotu), jenže vstupem výpočtu „2 kg" být může a bez něj se z běžné
 * úlohy stal falešný poplach („Dráha je z 20 dílků a každý měří 4 cm").
 *
 * A schválně NE dřívější `/[0-9]/.test(...)`: pouhá číslice v zadání dělala početní
 * úlohu i z otázky, kde bylo číslo jen kulisa („…ve výšce 3000 metrů?" s odpovědí
 * 80 °C) — tím se vypínala kontrola úniku (útok C, 19. 8. 2026).
 */
function maMeritelnyVstup(text) {
	// KRYCHLOVÉ/PLOŠNÉ MOCNINY „²"/„³" musí patřit do jednotky, ne se ztratit — bez
	// nich by „m³" a „m" byly nerozlišitelná stejná jednotka (VADA C, nález 22. 8. 2026).
	const re = /(\d+(?:[.,]\d+)?)[  ]?(°?[\p{L}Ω²³]{1,12}(?:[·./][\p{L}]{1,4})?|%|°C)?/gu;
	for (const m of String(text ?? '').matchAll(re)) {
		const syrova = (m[2] ?? '').normalize('NFC');
		const bez = syrova.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
		if (SYMBOLY.has(syrova) || SLOVA_JEDNOTEK.has(bez)) return true;
	}
	return false;
}

/**
 * Slova pro POROVNÁNÍ DVOU ZNĚNÍ — na rozdíl od `slova()` bere i krátké tokeny s číslicí.
 *
 * První verze měřidla tohle neuměla a byl z toho rovnou falešný poplach: „Co platí
 * při 0 °C?" a „Co platí při 100 °C?" vyšly jako shoda 100 %, protože „0" i „100"
 * jsou kratší než 4 znaky a filtr je zahodil. Stejně tak „120 minut" × „36 minut",
 * „rychlost 2×" × „rychlost 3×" nebo „pod 16 Hz" × „nad 16 kHz". Právě čísla přitom
 * bývají to JEDINÉ, čím se dvě jinak stejně znějící otázky liší.
 */
export function slovaZneni(text) {
	return new Set(
		normalizuj(text)
			.split(' ')
			.filter((s) => (s.length >= 4 || /[0-9]/.test(s)) && !STOP.has(s))
			// Kmen místo celého slova: čeština ohýbá koncovky, takže „jednotka" × „jednotkou"
			// a „tlak" × „tlaku" jsou pro porovnání znění TÁŽ věc. Bez toho vycházel překryv
			// dvou zjevně stejných otázek nulový a duplicitu bylo možné najít jen podle
			// shodné sady odpovědí — což je u výpočetních otázek („Kolik hodin je 120 minut?"
			// × „Kolik hodin je 7200 sekund?", obě „2 h") naopak zdroj falešných poplachů.
			// Čísla se nechávají celá, právě ona ty dvě úlohy odlišují.
			.map((s) => (/[0-9]/.test(s) ? s : s.slice(0, 4))),
	);
}

function jaccard(a, b) {
	if (!a.size || !b.size) return 0;
	let prunik = 0;
	for (const s of a) if (b.has(s)) prunik++;
	return prunik / (a.size + b.size - prunik);
}

/**
 * Rozlišující slova správné odpovědi: to, čím se liší od svých vlastních distraktorů.
 * Když je slovo ve všech odpovědích ("teplota" u všech tří), neprozrazuje nic.
 */
export function rozlisujiciSlova(otazka) {
	const odpovedi = otazka.odpovedi ?? [];
	if (odpovedi.length < 2) return new Set();
	const spravna = slovaSCisly(odpovedi[0]);
	const ostatni = new Set();
	for (const o of odpovedi.slice(1)) for (const s of slovaSCisly(o)) ostatni.add(s);
	return new Set([...spravna].filter((s) => !ostatni.has(s)));
}

/** Text, který žák uvidí u otázky A (zadání + vysvětlení po chybné odpovědi). */
function textOtazky(o) {
	return `${o.text ?? ''} ${o.vysvetleni ?? ''}`;
}

/**
 * DISTRAKTORY otázky — nesprávné nabízené možnosti (bez SPRÁVNÉ, ta je vždy PRVNÍ
 * v poli `odpovedi`; proto `slice(1)`). Žák je vidí na obrazovce stejně jako text
 * otázky, takže mohou prozradit odpověď jiné otázky (nález nezávislé kontroly
 * 22. 8. 2026, čtvrté kolo, blok o dalekozrakosti/krátkozrakosti: rozptylka je
 * distraktor jedné otázky a správná odpověď druhé).
 *
 * Schválně SAMOSTATNĚ od `textOtazky()`, ne v ní — jde do vlastního pole
 * `distraktorKmen` a čte se JEN v `malyBlokUnik` (malé bloky, viz níž). Hlavní
 * porovnání (`slovaCeleKmen`), číselné porovnání (`hodnotyZTextu`) i doslovná fráze
 * (`fraziovyUnik`) distraktory záměrně NEČTOU: přidání distraktorů všude by srazilo
 * dohromady i čistě náhodné shody vlastního nesprávného slova s nesouvisející otázkou
 * (ověřeno na regresi „kolize kmenů") a u recyklované nabídky možností (přípony
 * souborů) by hlásilo únik mezi každou dvojicí otázek se stejnou nabídkou (ověřeno
 * na regresi s příponami — proto je to omezené jen na malé bloky).
 */
function distraktory(o) {
	return (o.odpovedi ?? []).slice(1).join(' ');
}

/**
 * Kmen slova pro porovnání ÚNIKU odolné vůči skloňování — číslo se nechává celé.
 * Slovo delší než 4 znaky se zkrátí na prvních 4 (stejné pravidlo jako u `slovaZneni()"
 * níž, kde se osvědčilo na duplicitách — „tlaková"/„tlakovou" má společný začátek „tlak").
 * Slovo dlouhé přesně 4 znaky (nejkratší, co `slovaSCisly` vůbec propustí) se zkrátí
 * na 3 — čtyřznaková slova mívají v češtině jednopísmennou pádovou koncovku
 * („síla"/„sílu", „kniha"/„knihu") a `slice(0, 4)` by u nich nezkrátilo vůbec nic.
 *
 * PROČ (nález nezávislé kontroly 22. 8. 2026, doloženo podvrhem): `slovaSCisly`
 * porovnávala rozlišující slovo správné odpovědi s textem cizí otázky v PŘESNÉM
 * tvaru. „drží právě tlaková síla" brána našla, ale „drží právě tlakovou sílu"
 * (jiný pád téhož slovního spojení) ne — měřidlo bylo vůči české flexi slepé.
 * Samo „tlaková"/„tlakovou" už zachytí obecné pravidlo, ale „síla"/„sílu"
 * ne — proto zvláštní větev pro nejkratší slova. Tahle mez v seznamu
 * ZNÁMÝCH MEZÍ výše (řádky 43–72) nebyla — nešlo o vědomý kompromis, ale o díru.
 *
 * DÉLKA PODLE VLASTNÍ DÉLKY SLOVA (nález nezávislé kontroly 22. 8. 2026, TŘETÍ kolo,
 * doloženo podvrhem): kmen na pevná 4 znaky náhodně slévá i zcela NEPŘÍBUZNÁ slova —
 * „neustálý" a „neuspořádaný" (bez diakritiky „neustaly"/„neusporadany", obě DLOUHÁ)
 * mají shodný začátek „neus" a brána v cizí otázce hlásila prozrazení OBOU slov,
 * ačkoli tam figurovalo jen jedno. Prosté zvednutí hranice na 5 znaků pro VŠECHNA
 * slova by ale rozbilo skloňování u KRATŠÍCH slov se stejnou stavbou navenek —
 * „měknou"/„měkne" (dlouhá 6 a 5 znaků) se liší už na 5. znaku úplně stejně jako
 * „neustaly"/„neusporadany" („mekn-O" × „mekn-E"), a přesto jde o tvar téhož slovesa,
 * ne o dvě různá slova (regrese v `testy/uniky-obousmerne.mjs`, „skutečný únik
 * postupně měknou/měkne"). Čistě znakový rozdíl na 5. pozici obojí případy nerozliší.
 * Řešení: hranice kmene se odvíjí od DÉLKY SLOVA SAMÉHO — u kratších slov (≤ 6 znaků,
 * kde bývá pádová/slovesná koncovka jen 1–2 znaky) zůstává kmen na 4 znacích jako dřív;
 * teprve u DELŠÍCH slov (≥ 7 znaků, kde náhodná shoda prvních 4 znaků dvou různých
 * slov je pravděpodobnější) se kmen prodlužuje na 5. „tlaková"(7)/„tlakovou"(8) jsou
 * obě ≥ 7 → kmen 5 znaků, sdílí „tlako", skloňování dál funguje (test níž). Zvláštní
 * větev pro přesně čtyřznaková slova („síla"/„sílu") zůstává beze změny.
 *
 * Riziko: kratší kmen srazí dohromady i nepříbuzná slova se stejným začátkem
 * (např. „síla"/„silo", „prací"/„práce" — kryto testem níž: jediná taková shoda
 * nesmí sama stačit, brána pořád vyžaduje aspoň dvě rozlišující slova). Proto se
 * hranice nesnižuje pod nutnou míru a výsledek se dál kalibruje na ostrých datech
 * (`testy/uniky-obousmerne.mjs`).
 */
function kmen(s) {
	if (/[0-9]/.test(s)) return s;
	if (s.length === 4) return s.slice(0, 3);
	return s.length <= 6 ? s.slice(0, 4) : s.slice(0, 5);
}

/**
 * ŠIRŠÍ kmen — jen pro poznání SLOVNÍKU TÉMATU (viz `slovnikTematu()` a
 * `zkontrolujUniky()` níž), NE pro porovnání úniku samotné (tam zůstává `kmen()`).
 *
 * Nález nezávislé kontroly 22. 8. 2026 (druhé kolo): `kmen()` (4, u čtyřznakových 3)
 * nestačí na rozpoznání jednoho slovníkového slova napříč pády — „látka" a genitiv
 * množného čísla „látek" mají kmen jen 3 znaky („lát-"), `kmen()` by z nich udělal
 * „latk" a „late" a slovník tématu by je nespároval. Riziko srážky nepříbuzných
 * slov (3 znaky sráží víc než 4) je tady vědomě přijaté — jde jen o VYLOUČENÍ
 * (false negative = slovo se nevyloučí = nejhůř zůstane přísnější kontrola,
 * ne že projde skutečný únik).
 */
function kmenSirsi(s) {
	if (/[0-9]/.test(s)) return s;
	return s.length >= 4 ? s.slice(0, 3) : s;
}

/**
 * SLOVNÍK TÉMATU: slova z NÁZVU A KLÍČE podtématu a tématu (celku), do kterého blok
 * patří — čtená ze SKUTEČNÝCH DAT (`temata.ts`), ne odhadem. Taková slova se nutně
 * opakují v každé otázce bloku (blok JE o tomhle pojmu), takže sama o sobě nikdy
 * nejsou nosná — na rozdíl od SDÍLENÉ slovní zásoby, kterou dvě otázky nesou navíc.
 *
 * PROČ (nález nezávislé kontroly 22. 8. 2026, 7 z 16 nálezů byly přesně tohle):
 * „těleso z více látek" u bloku „Látka a těleso", „elektrický náboj" u bloku
 * „Elektrický náboj", „magnetické pole" u bloku „Magnetické pole" — to není únik,
 * je to jméno tématu, které se objeví v každé druhé otázce.
 */
export function slovnikTematu(temata, klic) {
	// Jen HLAVNÍ část názvu (do první čárky) — `nazev` podtématu bývá vyjmenovaný
	// seznam pojmů celé kapitoly („Elektrický náboj, elektrování těles, elektrická
	// síla", „Atomy a molekuly, prvek, sloučenina, směs"). Vzít CELÝ název by
	// vyloučilo i slova, která jsou ve skutečnosti ODPOVĚĎ konkrétní otázky
	// (nález 22. 8. 2026, podvrh: takhle zmizely i doložené skutečné úniky
	// „sloučenina"/„oddělení složek" — celý název bloku o sloučenině obsahoval
	// slovo „sloučenina" jako TÉMA, ale otázka „Co je sloučenina?" ho zároveň
	// používá jako SVOU odpověď). Klíč (slug) na rozdíl od názvu vždy jen krátce
	// pojmenovává TÉMA, ne vyjmenovává odpovědi — ten se bere celý.
	const hlavni = (n) => String(n ?? '').split(',')[0];
	for (const [rocnik, celky] of Object.entries(temata ?? {})) {
		for (const celek of celky ?? []) {
			for (const pod of celek.podtemata ?? []) {
				if (`${rocnik}/${celek.slug}/${pod.slug}` !== klic) continue;
				const text = `${hlavni(celek.nazev)} ${celek.slug} ${hlavni(pod.nazev)} ${pod.slug}`;
				return new Set([...slova(text)].map(kmenSirsi));
			}
		}
	}
	return new Set();
}

/**
 * Podíl otázek bloku, ve kterých se slovo (širší kmen) objeví, od kterého se bere
 * jako SLOVNÍKOVÉ SLOVO BLOKU, i když doslova není v názvu podtématu/tématu —
 * typicky odborný pojem, který blok probírá napříč skoro všemi otázkami
 * („působiště" a „směr" u bloku Síla, „perioda" u bloku o střídavém proudu,
 * „barva světla" u bloku o vnímání barev). Laťka a spodní mez počtu otázek jsou
 * KALIBROVANÉ na `testy/uniky-obousmerne.mjs`: „působiště"/„směr" nad čtvrtinou
 * otázek bloku o síle musí PATŘIT do slovníku bloku (nejsou únik samy o sobě);
 * skutečný únik („postupně měknou"/„měkne") musí zůstat i po zavedení slovníku.
 * „posuvný jezdec" má frekvenci jen 33 % (pod prahem 40 %), takže do slovníku
 * bloku nespadne — přesto se nesmí spolehnout jen na TUHLE mez: prozrazení
 * jediného slova „jezdec" z dvouslovné odpovědi řeší až samostatná laťka
 * `jedinePodstatneJmenoDlouhe` níž, ne `PRAH_FREKVENCE_BLOKU`.
 */
const PRAH_FREKVENCE_BLOKU = 0.4;
const MIN_OTAZEK_PRO_FREKVENCI = 5;

/**
 * Malý blok (≤ 3 otázky) je příliš krátký na to, aby se u něj dala počítat FREKVENCE
 * (`MIN_OTAZEK_PRO_FREKVENCI` = 5) — a přesně tam se objevují krátké ANTONYMNÍ páry
 * („vede" × „nevede", izolant/vodič), kde už jediné jednoznačně rozlišující slovo je
 * celá odpověď. Normální laťka („aspoň dvě slova") na jedno slovo nikdy nedosáhne
 * (nález nezávislé kontroly 22. 8. 2026, páté kolo, doloženo podvrhem — vada 5).
 */
const MALY_BLOK_MAX = 3;

/**
 * Slovo `s` a JEHO NEGACE („vede"/„nevede") se v `text` objevují OBĚ NARÁZ — obecný
 * (nikoli slovníkový) signál, že cizí vysvětlení výslovně staví rozlišující vlastnost
 * cíle DO PROTIKLADU, ne že jen náhodou používá stejné odborné slovo (na rozdíl třeba
 * od „hypotéza", kterou nejde takhle negovat předponou „ne-"). Bez tohohle omezení by
 * se stejná úleva na jedno slovo vztahovala i na běžné jednoslovné pojmy a vrátila by
 * přesně tu záplavu (166 nálezů), kvůli které vznikla mez č. 8 výše.
 */
function jeAntonymniDvojice(text, s) {
	const slova2 = new Set(normalizuj(text).split(' ').filter(Boolean));
	const zaklad = s.startsWith('ne') && s.length > 2 ? s.slice(2) : s;
	const negace = s.startsWith('ne') ? s : `ne${s}`;
	return zaklad !== negace && slova2.has(zaklad) && slova2.has(negace);
}

/**
 * Projde jeden blok otázek a vrátí nálezy.
 * @param {string} klic
 * @param {Array} otazky
 * @param {Set<string>} [slovnikTem] slovník tématu (viz `slovnikTematu()`) — slova
 *   z názvu/klíče podtématu a tématu, do kterého blok patří. Bez parametru se
 *   nevylučuje nic (užitečné pro testy s uměle vyrobenými bloky bez `temata.ts`).
 * @returns {{duplicity: Array, uniky: Array}}
 */
export function zkontrolujBlok(klic, otazky, slovnikTem = new Set()) {
	const duplicity = [];
	const uniky = [];
	let dvojic = 0;
	if (!Array.isArray(otazky)) return { duplicity, uniky, dvojic };

	const pripravene = otazky.map((o) => ({
		o,
		slovaTextu: slova(o.text),
		zneni: slovaZneni(o.text),
		slovaCele: slovaSCisly(textOtazky(o)),
		// PROZRAZUJÍCÍ SLOVA SE HLEDAJÍ JEN VE VYSVĚTLENÍ, NE V CELÉM ZADÁNÍ (oprava vad
		// 1 a 2, nález nezávislé kontroly 22. 8. 2026, páté kolo, doloženo podvrhy) — stejný
		// princip jako u `fraziovyUnik` níž. Vysvětlení otázky prozrazuje fakt, který patří
		// odpovědi jinam; vlastní ZNĚNÍ (zadání) jiné otázky ale běžně používá tatáž slova
		// jako SVÉ VLASTNÍ TÉMA („Jaká je jednotka elektrického napětí?" — obecný odborný
		// pojem bloku o obvodech), ne jako prozrazení cizí odpovědi. Číselné hodnoty ve
		// ZNĚNÍ zdroje řeší samostatná, jednotkově přesná kontrola (`hodnotyZTextu` níž),
		// která `textOtazky()` (text i vysvětlení) dál používá beze změny.
		slovaCeleKmen: new Set([...slovaSCisly(o.vysvetleni ?? '')].map(kmen)),
		// Kmeny VLASTNÍCH DISTRAKTORŮ, ZVLÁŠŤ od `slovaCeleKmen` (viz `distraktory()` a
		// `malyBlokUnik` níž) — schválně JEN pro malé bloky, ne pro obecné porovnání:
		// blok s dokola recyklovanou nabídkou možností (přípony souborů, typy čoček) by
		// jinak hlásil únik mezi KAŽDOU dvojicí otázek, které sdílí stejnou nabídku
		// (nález nezávislé kontroly 22. 8. 2026, páté kolo — regrese na testu s příponami).
		distraktorKmen: new Set([...slovaSCisly(distraktory(o))].map(kmen)),
		rozlisujici: rozlisujiciSlova(o),
		odpovediNorm: (o.odpovedi ?? []).map((x) => normalizuj(x)).sort().join('|'),
		spravnaNorm: normalizuj((o.odpovedi ?? [])[0]),
	}));

	// SLOVNÍKOVÁ SLOVA BLOKU podle FREKVENCE (viz komentář u `PRAH_FREKVENCE_BLOKU`):
	// kolik RŮZNÝCH otázek bloku slovo (širší kmen) obsahuje.
	const frekvence = new Map();
	pripravene.forEach((p) => {
		for (const s of new Set([...p.slovaCele].map(kmenSirsi))) {
			frekvence.set(s, (frekvence.get(s) ?? 0) + 1);
		}
	});
	const jeSlovnikBloku = (slovo) => {
		const k = kmenSirsi(slovo);
		if (slovnikTem.has(k)) return true;
		if (pripravene.length < MIN_OTAZEK_PRO_FREKVENCI) return false;
		return (frekvence.get(k) ?? 0) / pripravene.length >= PRAH_FREKVENCE_BLOKU;
	};

	for (let i = 0; i < pripravene.length; i++) {
		for (let j = i + 1; j < pripravene.length; j++) {
			const A = pripravene[i];
			const B = pripravene[j];
			// POČÍTADLO DVOJIC: každá dvojice otázek v bloku se má porovnat právě jednou
			// (obě porovnání úniku, zdroj→cíl i cíl→zdroj, jedou uvnitř téhož běhu smyčky
			// níž) — bez tohohle čítače by nešlo poznat, jestli měřidlo tiše přeskočilo
			// část bloku (nález auditu 22. 8. 2026: brána hlásila 0 úniků, aniž bylo vidět,
			// kolik dvojic vůbec prošlo kontrolou).
			dvojic++;

			// --- DUPLICITA ---
			// PODMÍNKA, BEZ KTERÉ TO NEFUNGUJE: obě otázky mají TOTOŽNOU správnou odpověď.
			// Jinak to není duplicita, ale dvojice otázek na dvě různé věci — a přesně na
			// tom se první verze měřidla utopila ve falešných poplaších (11 z 13 nálezů byly
			// legitimní dvojice typu „polovodič typu N" × „typu P"). Když se správné odpovědi
			// liší, žák se z jedné otázky tu druhou nenaučí zodpovědět.
			// K tomu musí být podobné i ZNĚNÍ. Shodná sada odpovědí sama o sobě NESTAČÍ —
			// u výpočetních otázek je úplně běžná („Kolik hodin je 120 minut?" × „Kolik
			// hodin je 7200 sekund?", obě „2 h") a dělala falešné poplachy; snižuje proto
			// jen laťku na podobnost znění, nenahrazuje ji.
			const stejnaSpravna = A.spravnaNorm && A.spravnaNorm === B.spravnaNorm;
			const stejneOdpovedi = A.odpovediNorm && A.odpovediNorm === B.odpovediNorm;
			const shodaZneni = jaccard(A.zneni, B.zneni);
			const latka = stejneOdpovedi ? 0.5 : 0.75;
			if (stejnaSpravna && shodaZneni >= latka) {
				duplicity.push({
					klic,
					a: A.o.text,
					b: B.o.text,
					duvod: `stejná správná odpověď, shoda znění ${Math.round(shodaZneni * 100)} %${stejneOdpovedi ? ' i stejná sada odpovědí' : ''}`,
				});
			}

			// --- ÚNIK ODPOVĚDI (oběma směry) ---
			for (const [zdroj, cil] of [
				[A, B],
				[B, A],
			]) {
				if (!cil.rozlisujici.size) continue;
				// Porovnává se KMENEM (viz `kmen()` výše), ne přesným tvarem — jinak
				// skloněný tvar rozlišujícího slova v cizím textu projde bez povšimnutí
				// (doklad: „tlaková síla" × „tlakovou sílu"). Původní slovo se ale
				// dál nese v `prozrazena` (jen filtr jde přes kmen), aby výpis i
				// navazující kontroly (číslo, jediný token) viděly skutečný text.
				// SLOVNÍK TÉMATU (název podtématu/tématu) a SLOVNÍKOVÁ SLOVA BLOKU (pojem
				// opakující se napříč velkou částí bloku podle frekvence) se z rozlišujících
				// slov rovnou VYŘAZUJÍ — nikdy nejsou to jediné, co únik dokazuje (viz
				// `jeSlovnikBloku` výše). Jinak by třeba „elektrický náboj" v bloku o
				// elektrickém náboji nebo „působiště"/„směr" v bloku o síle prošly jako
				// prozrazení, ačkoli je to jen slovní zásoba, kterou blok nutně opakuje.
				// Jmenovatel „pokrytí" MUSÍ jít přes stejné síto — jinak by odečtení
				// slovníkových slov jen v čitateli uměle SNÍŽILO pokrytí a smazalo
				// i skutečný únik (podvrh 22. 8. 2026: blok o sloučenině měl „atomy"
				// v názvu podtématu, po vyřazení jen v čitateli kleslo pokrytí ze 100 %
				// na 50 % a doložený únik „stejné molekuly z různých atomů" zmizel).
				const rozlisujiciBezSlovniku = [...cil.rozlisujici].filter((s) => !jeSlovnikBloku(s));
				const prozrazena = rozlisujiciBezSlovniku.filter((s) => zdroj.slovaCeleKmen.has(kmen(s)));
				// (a) dost rozlišujících slov cíle: dvě libovolná při vysokém pokrytí (viz
				//     `dostSlov` níž). POZOR: „jedno dlouhé slovo (≥ 8 znaků) samo stačí"
				//     tu NENÍ implementováno — zkoušelo se to (mez č. 8 výš, „hypotéza",
				//     „anemometr") a zrušilo se pro přes 160 falešných poplachů; jednoslovné
				//     odpovědi řeší jen úzká výjimka `celaOdpovedJedenToken` (přípona
				//     souboru) níž, nic obecnějšího.
				const pokryti = rozlisujiciBezSlovniku.length ? prozrazena.length / rozlisujiciBezSlovniku.length : 0;
				// Dvě libovolná rozlišující slova při vysokém pokrytí — původní pravidlo.
				// NEBO jediné vícemístné číslo při pokrytí aspoň poloviny: u číselné
				// odpovědi („kolem 80 °C" → rozlišující {kolem, 80}) je to číslo celá
				// odpověď a druhé slovo se prostě nemá kde vzít. Jednociferná čísla se
				// nepočítají — „2" v „2 kg" je běžná součást zadání, ne prozrazení.
				const cislaCile = [...cil.rozlisujici].filter((s) => /[0-9]/.test(s) && s.length >= 2);
				const prozrazenaCisla = prozrazena.filter((s) => /[0-9]/.test(s) && s.length >= 2);
				// Číselný únik se hlásí, jen když jsou prozrazena VŠECHNA vícemístná čísla
				// odpovědi. Půlka („230 V a 50 Hz", shoduje se jen 50) odpověď nedává.
				const celeCislo = cislaCile.length >= 1 && prozrazenaCisla.length === cislaCile.length;
				// CELÁ ODPOVĚĎ JE JEDEN KRÁTKÝ TECHNICKÝ TOKEN („.docx", „.mp3" — přípona
				// souboru) a ten token se objeví v cizím vysvětlení doslova. Tohle NEPROŠLO
				// starší laťkou „dvě slova" (nález nezávislé kontroly 22. 8. 2026, blok
				// soubory-slozky-aplikace: vysvětlení „.docx je dokument, .png obrázek."
				// prozrazovalo jednoslovnou odpověď „.docx" jiné otázky bloku a měřidlo
				// mlčelo, protože jediné rozlišující slovo nikdy nesplnilo podmínku
				// „aspoň dvě slova"). Jeden token ale smí stačit JEN pro tuhle úzkou
				// třídu (přípona začínající tečkou) — zkoušelo se to pustit na libovolné
				// jednoslovné odpovědi (i dlouhé, „hypotéza", „anemometr"), ale to je
				// v jednom tematickém bloku BĚŽNÉ odborné slovo, ne prozrazení: naměřilo
				// to přes 160 falešných poplachů (fyzika, pojmy jako „objem", „plazma",
				// „hypotéza" se v bloku přirozeně opakují). Přípony souborů jsou naproti
				// tomu jednoznačný, nezaměnitelný identifikátor — tam se plete jen
				// skutečný únik.
				const celaOdpovedJedenToken =
					cil.rozlisujici.size === 1 &&
					cil.spravnaNorm === [...cil.rozlisujici][0] &&
					/^\./.test(((cil.o.odpovedi ?? [])[0] ?? '').trim());
				// POKUS O ROZŠÍŘENÍ NA „PŘESNĚ DVĚ ROZLIŠUJÍCÍ SLOVA, PROZRAZENO JEDNO"
				// (VADA B, nález nezávislé kontroly 22. 8. 2026, blok o proměnném rezistoru:
				// „posuvný jezdec" × „jezdec") byl VYZKOUŠEN a ZAMÍTNUT — i s laťkou na délku
				// (≥ 6 znaků), frekvenční ochranou a sebepotvrzením u cíle vyrobil na celém
				// webu 100–300+ nových nálezů (většina falešných poplachů typu „vlastnostmi",
				// „material", „Galileo" — přesně ta záplava, kvůli které vznikla původní
				// laťka „dvě slova při 70 %"). Řešení TOHOTO konkrétního páru čeká na
				// bezpečnější, úžeji zacílené pravidlo — bez něj brána tenhle typ úniku
				// (jedno podstatné jméno ze dvouslovné odpovědi) neumí odlišit od běžné
				// odborné slovní zásoby bloku.
				const dostSlov =
					(prozrazena.length >= 2 && pokryti >= 0.7) ||
					(celeCislo && pokryti >= 0.5) ||
					(celaOdpovedJedenToken && prozrazena.length === 1);

				// --- MALÝ BLOK, JEDNO ROZLIŠUJÍCÍ SLOVO STAČÍ (oprava vad 4 a 5, nález
				// nezávislé kontroly 22. 8. 2026, páté kolo, doloženo podvrhy) — viz
				// `jeAntonymniDvojice()`, `distraktory()` a `MALY_BLOK_MAX` výš. U bloku
				// ≤ 3 otázek, kde nejde počítat frekvenci (`MIN_OTAZEK_PRO_FREKVENCI` = 5),
				// stačí JEDNO rozlišující slovo cíle, když platí ASPOŇ JEDNO z obecných
				// pravidel níž — obojí bez seznamu konkrétních slov:
				//   (a) cizí VYSVĚTLENÍ ho staví proti jeho negaci („nevede… vede") — jasné
				//       prozrazení, ne náhodná shoda odborného pojmu (viz `jeAntonymniDvojice`);
				//   (b) slovo se objeví jako DISTRAKTOR jiné otázky (rozptylka/spojka u páru
				//       o čočkách) — žák ho vidí na obrazovce. VYNECHÁVÁ SE u odpovědí, které
				//       jsou celé JEDEN TOKEN ZAČÍNAJÍCÍ TEČKOU (přípona souboru) — pro ty už
				//       existuje vlastní, užší pravidlo (`celaOdpovedJedenToken` výš, hledá
				//       jen ve vysvětlení); bez týhle výjimky by malý blok s dokola recyklovanou
				//       nabídkou přípon (.docx/.pptx/.png) hlásil únik mezi každou dvojicí otázek,
				//       které sdílí stejnou nabídku — to není prozrazení, jen sdílený seznam možností.
				// ČÍSLA se z obou větví VYNECHÁVAJÍ — pro ně existuje samostatná, jednotkově
				// přesná kontrola (`hodnotyZTextu` níž); shoda jediné číslice u malého bloku
				// (např. „20" v odpovědi jedné otázky a náhodou i v distraktoru druhé) by bez
				// týhle výjimky obcházela tu přesnější kontrolu (regrese „číslo už v zadání").
				const rozlisujiciNecislo = rozlisujiciBezSlovniku.filter((s) => !/[0-9]/.test(s));
				const prozrazenaNecislo = prozrazena.filter((s) => !/[0-9]/.test(s));
				const jeCilPripona = /^\./.test(((cil.o.odpovedi ?? [])[0] ?? '').trim());
				const prozrazenaDistraktorem = rozlisujiciNecislo.filter((s) => zdroj.distraktorKmen.has(kmen(s)));
				const malyBlokUnik =
					pripravene.length <= MALY_BLOK_MAX &&
					rozlisujiciNecislo.length > 0 &&
					((prozrazenaNecislo.length === rozlisujiciNecislo.length &&
						prozrazenaNecislo.some((s) => jeAntonymniDvojice(zdroj.o.vysvetleni ?? '', s))) ||
						(!jeCilPripona && prozrazenaDistraktorem.length === rozlisujiciNecislo.length));

				// --- DOSLOVNÁ SHODA CELÉ VÍCESLOVNÉ ODPOVĚDI (oprava vady 2, nález nezávislé
				// kontroly 22. 8. 2026, čtvrté kolo, doloženo podvrhem) ---
				// Frekvenční vyloučení (`jeSlovnikBloku`, viz komentář u `PRAH_FREKVENCE_BLOKU`)
				// smí vyřadit jen JEDNOTLIVÉ slovo. Nesmí ale smazat únik, kdy se CELÉ slovní
				// spojení správné odpovědi cíle objeví v cizí otázce DOSLOVA — malý blok s
				// dominantním opakovaným pojmem („gravitační síla Slunce" ve 3 z 5 otázek,
				// 60 % ≥ 40 %) smazal frekvencí obě slova z `rozlisujici`, a přesto vysvětlení
				// JINÉ otázky tu samou frázi cituje doslova — to je únik i tehdy, když jsou ta
				// slova v bloku běžná. SLOVNÍK TÉMATU (`slovnikTem`, skutečný název podtématu
				// z `temata.ts`) frázi dál smí vyloučit (fráze JE název tématu, ne prozrazení),
				// ale frekvenční počítadlo uvnitř bloku o tom rozhodovat nesmí.
				//
				// HLEDÁ SE JEN VE VYSVĚTLENÍ ZDROJE, NE V CELÉM ZADÁNÍ (oprava vad 1 a 2,
				// nález nezávislé kontroly 22. 8. 2026, páté kolo, doloženo dvěma nezávislými
				// podvrhy). Vysvětlení otázky prozrazuje — cituje fakt, který patří odpovědi
				// jinam. Vlastní ZNĚNÍ (zadání) jiné otázky ale běžně obsahuje tutéž frázi jako
				// SVŮJ VLASTNÍ ÚDAJ, ne jako prozrazení: „Těleso 2 kg je ve výšce 3 m…" (vstup
				// jednoho příkladu) a „…Jaká je hmotnost tělesa? [2 kg]" (výsledek druhého) sdílí
				// dvouslovnou frázi „2 kg" čistě náhodou — číselné hodnoty už navíc řeší
				// samostatná, jednotkově přesná kontrola (`hodnotyZTextu`) níž. Stejně tak
				// obecný odborný pojem („elektrické napětí") se v zadání JINÉ otázky bloku o
				// obvodech objevuje jako JEJÍ VLASTNÍ TÉMA, ne jako prozrazení cizí odpovědi.
				const slovaSpravneFraze = cil.spravnaNorm.split(' ').filter(Boolean);
				const jeVicelovaFraze = slovaSpravneFraze.length >= 2;
				const frazeJeNazevTematu =
					jeVicelovaFraze && slovaSpravneFraze.every((s) => slovnikTem.has(kmenSirsi(s)));
				// CELÁ ODPOVĚĎ JE JEN „ČÍSLO + JEDNOTKA" A ZDROJ TUTÉŽ HODNOTU MÁ I VE
				// SVÉM VLASTNÍM ZADÁNÍ („1 m³" v „Kolik dm³ je 1 m³?") — pak jde o VLASTNÍ
				// VSTUP zdrojova příkladu, který se ve vysvětlení jen zopakuje při výpočtu,
				// ne o prozrazení cizí odpovědi (stejný princip jako „hodnota už v zadání
				// cíle" u `hodnotyZTextu" výš, jen zrcadlově pro ZDROJ). Když se fráze ve
				// vysvětlení objeví BEZ opory ve vlastním zadání zdroje (klasický „5 kg" na
				// štítku krabice v cizím vysvětlení), pořád jde o skutečné prozrazení.
				// (nález nezávislé kontroly 22. 8. 2026, VADA C: „1 m³" u „Kolik dm³ je
				// 1 m³?" takhle doslovně „prozrazovalo" objem krabice 2×1×0,5 m, ačkoli šlo
				// o dvě různé počítané úlohy sdílející kulaté vstupní číslo zdroje).
				const jeCistaHodnota = /^\d+(?:[.,]\d+)?[  ]?(°?[\p{L}Ω²³]{1,12}(?:[·./][\p{L}]{1,4})?|%|°C)?$/u.test(
					String((cil.o.odpovedi ?? [])[0] ?? '').trim(),
				);
				const eskejpovanaFraze = cil.spravnaNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const frazeVeVlastnimZadaniZdroje =
					jeCistaHodnota &&
					new RegExp(`(^|\\s)${eskejpovanaFraze}(\\s|$)`).test(normalizuj(zdroj.o.text ?? ''));
				let fraziovyUnik = false;
				if (!dostSlov && jeVicelovaFraze && !frazeJeNazevTematu && !frazeVeVlastnimZadaniZdroje) {
					const textZdroje = normalizuj(zdroj.o.vysvetleni ?? '');
					if (new RegExp(`(^|\\s)${eskejpovanaFraze}(\\s|$)`).test(textZdroje)) fraziovyUnik = true;
				}
				if (!dostSlov && !fraziovyUnik && !malyBlokUnik) continue;
				// POČETNÍ ÚLOHA jako cíl se u číselných nálezů přeskakuje — týž postup, jaký
				// už používá `cisla-ve-vykladu.mjs`: má-li ZADÁNÍ otázky vlastní čísla, je
				// odpověď VÝSLEDEK, který si žák spočítá. Že se stejné číslo („100 N", „10 N")
				// objeví i u jiné úlohy téhož bloku, mu nic neprozradí — příklady si čísla
				// půjčují pořád. Bez téhle výjimky hlásilo měřidlo 27 nálezů, z toho 21
				// právě takových půjčených čísel z příkladů.
				// (b) žák musí poznat, KE KTERÉ otázce to patří — sdílená nosná slova se zněním cíle.
				// U ČÍSELNÝCH nálezů je laťka dvě sdílená slova, ne jedno: čísla se ve fyzice
				// opakují náhodně (80 cm × 80 s, 50 N × 50 km/h, 100 Pa × 100 kg) a jedno sdílené
				// slovo je pak přemostí do falešného poplachu. Měřeno 19. 8. 2026: s laťkou 1
				// hlásilo měřidlo 59 nálezů, drtivou většinou početních úloh, které si jen půjčují
				// stejné číslo; s laťkou 2 zbydou jen nálezy, kde otázky mluví opravdu o témže.
				const spolecna = [...cil.slovaTextu].filter((s) => zdroj.slovaCele.has(s));
				const maCislo = prozrazena.some((s) => /[0-9]/.test(s));
				// Výjimka platí JEN pro skutečnou početní úlohu jako cíl. Poznají se podle
				// dvou znaků naráz (oprava po nezávislé kontrole 19. 8. 2026 — dřív stačilo,
				// že cíl měl v zadání JAKÉKOLI číslo, a výjimka vypnula kontrolu i tam,
				// kde ta číslovka byla pouhá kulisa: „…po 5 minutách ohřevu?" s odpovědí 80 °C):
				//   1. unikající hodnota NENÍ v zadání cíle — je to teprve výsledek výpočtu
				//      (v zadání početní úlohy stojí vstupy, ne výsledek), a
				//   2. tutéž hodnotu má ve svém ZNĚNÍ zdrojová otázka, tedy jako vstup svého
				//      vlastního příkladu. Teprve to je legitimní půjčení hodnoty mezi příklady
				//      (dvě úlohy počítající s tíhou 100 N) — kvůli němu výjimka vznikla.
				// Číslo, které zdroj vysloví až ve VYSVĚTLENÍ, vstup příkladu není: to je
				// prozrazený výsledek a hlásí se.
				// Kolik nosných slov musí cíl a zdroj sdílet, aby žák poznal, KE KTERÉ otázce
				// se údaj hodí. U číselných nálezů to bývaly dvě — čísla se ve fyzice
				// opakují náhodně a jedno sdílené slovo je přemostilo do falešného poplachu.
				// Když se ale shoduje celá HODNOTA I S JEDNOTKOU („80 °C" × „80 stupňů"),
				// je náhoda podstatně nepravděpodobnější a stačí jedno sdílené slovo;
				// bez toho měřidlo minulo doložený útok C. Pro čísla BEZ jednotky
				// („1,4", „25 LED") zůstává laťka dvě.
				let latkaSpolecnych = maCislo ? 2 : 1;
				if (maCislo) {
					// ══ POROVNÁVÁ SE HODNOTA (ČÍSLO + JEDNOTKA), NE HOLÁ ČÍSLICE ══
					// Oprava jediné společné příčiny tří průlomů z 19. 8. 2026. Dřív si
					// všechny tři výjimky níž braly `cislaZTextu()`, tedy holé řetězce
					// číslic — a stačilo podstrčit stejné číslo u JINÉ veličiny, aby se
					// kontrola vypnula: „60 cm" v zadání umlčelo únik „60 N·cm",
					// „230 V" ve zdroji zamaskovalo doslova citovaných „230 minut",
					// „80 stupňů" se nespárovalo s „80 °C".
					const hodnotyOdpovediCile = hodnotyZTextu((cil.o.odpovedi ?? [])[0]);
					const hodnotyZneniCile = hodnotyZTextu(cil.o.text);
					const hodnotyZdrojeCele = hodnotyZTextu(textOtazky(zdroj.o));
					const hodnotyZneniZdroje = hodnotyZTextu(zdroj.o.text);

					if (hodnotyOdpovediCile.size > 0) {
						const shodne = [...hodnotyOdpovediCile].filter((h) => hodnotyZdrojeCele.has(h));
						// (0) NÁHODNÁ SHODA ČÍSLIC. Zdroj musí vyslovit TUTÉŽ HODNOTU
						//     i s toutéž jednotkou, a to všechny hodnoty odpovědi —
						//     půlka („230 V a 50 Hz", shoduje se jen 50 Hz) odpověď nedává.
						//     Tohle nahradilo dřívější pravidlo „číslo u svého slova"
						//     (`dvojiceSCislem`), které bylo jen hrubou náhražkou jednotky:
						//     minulo „80 °C" × „přibližně 80 stupňů" a naopak si nechalo
						//     projít shodu čísel u dvou různých veličin.
						if (shodne.length < hodnotyOdpovediCile.size) continue;
						// (1) HODNOTA UŽ V ZADÁNÍ CÍLE — tu nemůže nikdo prozradit, žák ji
						//     má rovnou v otázce („…při napětí 230 V?" s odpovědí „230 mA").
						//     Musí to být táž hodnota I S JEDNOTKOU; „60 cm" v zadání
						//     neomlouvá prozrazený moment „60 N·cm" (útok A).
						if (shodne.every((h) => hodnotyZneniCile.has(h))) continue;
						// (2) LEGITIMNÍ PŮJČENÍ HODNOTY MEZI PŘÍKLADY — kvůli němu výjimka
						//     vznikla (dvě úlohy s tíhou 100 N, konstanta g = 10 N/kg).
						//     Musí platit obojí: cíl je POČETNÍ ÚLOHA a hodnota je u zdroje
						//     „doma" jako VSTUP jeho zadání.
						//
						//     `cilJePocetni` už neznamená „v zadání je jakákoli číslice"
						//     (tak se dřív za vstup výpočtu vydávala i pouhá kulisa, viz
						//     útok C: „…ve výšce 3000 metrů?" s odpovědí 80 °C), ale
						//     „v zadání je aspoň jedna MĚŘITELNÁ hodnota s jednotkou".
						//     A hlavně: „doma u zdroje" se posuzuje po jednotkách, takže
						//     zdrojová odpověď „230 V" už nepokryje citovaných „230 minut"
						//     (útok B) a „× 10" v převodu hmotnosti nepokryje „10 N/kg".
						//
						//     SCHVÁLNĚ JEN `hodnotyZneniZdroje` (VLASTNÍ ZADÁNÍ zdroje), NIKDY
						//     `hodnotyOdpovediZdroje` (vlastní ODPOVĚĎ zdroje) — nález nezávislé
						//     kontroly 22. 8. 2026, páté kolo, doloženo podvrhem (vada 3):
						//     hodnota, kterou zdroj sám má jako SVOU SPRÁVNOU ODPOVĚĎ (ne jako
						//     vstup svého příkladu), není „půjčený vstup" — je to prozrazený
						//     VÝSLEDEK. „Jak dlouho trvalo zatmění Slunce? → 230 minut" (230
						//     minut je odpověď, ne vstup) + „Film běžel 3h50min, kolik je to
						//     minut?" (230 min se teprve DOPOČÍTÁ) je únik, ne půjčka — stará
						//     verze to výjimkou omylem pouštěla.
						const cilJePocetni = maMeritelnyVstup(cil.o.text);
						const pujcenaHodnota =
							cilJePocetni &&
							shodne.every((h) => !hodnotyZneniCile.has(h) && hodnotyZneniZdroje.has(h));
						if (pujcenaHodnota) continue;
						if (shodne.some(maJednotku)) latkaSpolecnych = 1;
					}
				}
				// Doslovná shoda celé fráze (viz `fraziovyUnik` výš), antonymní dvojice v
				// malém bloku (`malyBlokUnik` výš) i JEDINÉ DLOUHÉ PODSTATNÉ JMÉNO ze
				// dvouslovné odpovědi (`jedinePodstatneJmenoDlouhe` výš) prozrazují odpověď
				// i bez obvyklé podmínky (b) — žák frázi/protiklad/to jedno slovo přečte
				// doslova, není co dalšího „poznávat" podle sdíleného kontextu (nález
				// nezávislé kontroly 22. 8. 2026, VADA B: „jezdec" u „Co udělá jezdec s
				// odporovým drátem…" nesdílí s cílovou otázkou „Která část mění odpor…"
				// žádné DALŠÍ nosné slovo, přesto samo slovo „jezdec" k odpovědi vede).
				if (!fraziovyUnik && !malyBlokUnik && spolecna.length < latkaSpolecnych) continue;
				uniky.push({
					klic,
					prozrazuje: zdroj.o.text,
					odpoved: (cil.o.odpovedi ?? [])[0],
					otazka: cil.o.text,
					slova: prozrazena.length ? prozrazena : slovaSpravneFraze,
				});
			}
		}
	}
	return { duplicity, uniky, dvojic };
}

/** Projde všechny bloky webu. Souhrnná shrnutí se přeskakují — skládají se z týchž
 *  objektů otázek jako zdrojové bloky, takže by se každý nález počítal několikrát. */
export async function zkontrolujUniky(data) {
	const { kvizy, temata } = data ?? (await nactiData());
	// POJISTKA (nález 22. 8. 2026, rozdvojení ostré brány a testovacího spuštění):
	// volající SMÍ předat vlastní `data`, ale NESMÍ tiše vynechat `temata` — bez nich
	// `slovnikTematu()` dostane prázdno a výjimka „slovník tématu" se v ostré bráně
	// vůbec neuplatní, takže brána měří MÍŇ úniků než `node testy/uniky.mjs`. Prázdný
	// objekt `{}` je legitimní (žádná ročníková data), ale CHYBĚJÍCÍ, `undefined`
	// nebo `null` `temata` u vlastních dat je chyba volajícího — kontroluje se
	// HODNOTA (`data.temata == null`), ne pouhá přítomnost klíče (`'temata' in data`
	// je splněné i pro `temata: undefined` a pojistku by obešla) — shodit hned,
	// ne tiše dopočítat.
	if (data && data.temata == null) {
		throw new Error(
			'zkontrolujUniky: chybí `temata` ve vstupních datech — bez nich se výjimka ' +
				'„slovník tématu" tiše neuplatní a měřidlo najde jiný (nižší) počet úniků ' +
				'než `node testy/uniky.mjs`. Předej stejná `temata`, jaká používá výchozí nactiData().',
		);
	}
	const duplicity = [];
	const uniky = [];
	let bloku = 0;
	let otazek = 0;
	let vynechano = 0;
	let dvojic = 0;
	for (const [klic, otazky] of Object.entries(kvizy)) {
		if (!Array.isArray(otazky) || otazky.length < 2) continue;
		// Souhrnné bloky /shrnuti/ se skládají programově z už zkontrolovaných otázek —
		// kontrolovat je znovu by hlásilo tytéž nálezy dvakrát. Výluka musí být ve
		// výpisu PŘIZNANÁ číslem, ne dopočitatelná (nález auditu 4. 8. 2026).
		if (klic.includes('/shrnuti/')) {
			vynechano++;
			continue;
		}
		bloku++;
		otazek += otazky.length;
		const v = zkontrolujBlok(klic, otazky, slovnikTematu(temata, klic));
		duplicity.push(...v.duplicity);
		uniky.push(...v.uniky);
		dvojic += v.dvojic;
	}
	// Počítadlo vstupů: kontrola, která nic neprojde, musí být poznat (nález auditu —
	// „opatření platí jen na část případů a na tu druhou se tiše zapomene"). ZÁMĚRNĚ
	// se počítá i POČET POROVNANÝCH DVOJIC otázek (ne jen bloků/otázek) — nález
	// nezávislé kontroly 22. 8. 2026: bloky a otázky mohly projít kontrolou, i kdyby
	// se uvnitř bloku srovnávala jen podmnožina dvojic (tichá selektivní chyba).
	// dvojic === 0 při bloku > 0 je selhání měřidla, ne zdravý stav.
	return { duplicity, uniky, bloku, otazek, vynechano, dvojic };
}

// Spuštění z příkazové řádky: `node testy/uniky.mjs [část-klíče]`
if (import.meta.url === `file://${process.argv[1]}`) {
	const filtr = process.argv[2];
	const v = await zkontrolujUniky();
	const vyber = (pole) => (filtr ? pole.filter((x) => x.klic.includes(filtr)) : pole);
	const dup = vyber(v.duplicity);
	const un = vyber(v.uniky);
	console.log(`Prošlo ${v.bloku} bloků / ${v.otazek} otázek / ${v.dvojic} porovnaných dvojic (vynecháno ${v.vynechano} souhrnných bloků).\n`);
	if (v.bloku > 0 && v.dvojic === 0) {
		console.error('SELHÁNÍ MĚŘIDLA: 0 porovnaných dvojic při nenulovém počtu bloků — kontrola nic neprošla.');
		process.exitCode = 1;
	}
	console.log(`DUPLICITNÍ PÁRY: ${dup.length}`);
	for (const d of dup) console.log(`  ${d.klic}\n    A: ${d.a}\n    B: ${d.b}\n    (${d.duvod})`);
	console.log(`\nÚNIKY ODPOVĚDÍ: ${un.length}`);
	for (const u of un) console.log(`  ${u.klic}\n    „${u.prozrazuje}"\n    → prozrazuje: ${u.odpoved}\n    (k otázce: ${u.otazka}; slova: ${u.slova.join(', ')})`);
}

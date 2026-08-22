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

/** malá písmena, bez diakritiky, jen slova */
export function normalizuj(text) {
	return String(text ?? '')
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
		'kolik cim cemu ceho cim jakou jakym jakych jednu jeden jedna dve tri prvni druhy treti')
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
		m2: 'm2', 'm²': 'm2', cm2: 'cm2',
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
	const re = /(\d+(?:[.,]\d+)?)[  ]?(°?[\p{L}Ω]{1,12}(?:[·./][\p{L}]{1,4})?|%|°C)?/gu;
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
	const re = /(\d+(?:[.,]\d+)?)[  ]?(°?[\p{L}Ω]{1,12}(?:[·./][\p{L}]{1,4})?|%|°C)?/gu;
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
 * Samo „tlaková"/„tlakovou" už zachytí obecné pravidlo (4 znaky), ale „síla"/„sílu"
 * ne — proto zvláštní větev pro přesně čtyřznaková slova. Tahle mez v seznamu
 * ZNÁMÝCH MEZÍ výše (řádky 43–72) nebyla — nešlo o vědomý kompromis, ale o díru.
 *
 * Riziko: kratší kmen (3 znaky) srazí dohromady i nepříbuzná čtyřznaková slova se
 * stejným začátkem (např. „síla"/„silo"). Proto jen pro tuhle úzkou délku, ne obecně
 * — a proto se výsledek dál kalibruje na ostrých datech (`testy/uniky-obousmerne.mjs`,
 * regrese „prací" × „práce").
 */
function kmen(s) {
	if (/[0-9]/.test(s)) return s;
	return s.length === 4 ? s.slice(0, 3) : s.slice(0, 4);
}

/**
 * Projde jeden blok otázek a vrátí nálezy.
 * @returns {{duplicity: Array, uniky: Array}}
 */
export function zkontrolujBlok(klic, otazky) {
	const duplicity = [];
	const uniky = [];
	let dvojic = 0;
	if (!Array.isArray(otazky)) return { duplicity, uniky, dvojic };

	const pripravene = otazky.map((o) => ({
		o,
		slovaTextu: slova(o.text),
		zneni: slovaZneni(o.text),
		slovaCele: slovaSCisly(textOtazky(o)),
		slovaCeleKmen: new Set([...slovaSCisly(textOtazky(o))].map(kmen)),
		rozlisujici: rozlisujiciSlova(o),
		odpovediNorm: (o.odpovedi ?? []).map((x) => normalizuj(x)).sort().join('|'),
		spravnaNorm: normalizuj((o.odpovedi ?? [])[0]),
	}));

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
				const prozrazena = [...cil.rozlisujici].filter((s) => zdroj.slovaCeleKmen.has(kmen(s)));
				// (a) dost rozlišujících slov cíle: dvě libovolná, nebo jedno dlouhé (≥ 8 znaků,
				//     takové slovo je samo o sobě odpověď — „kondenzace", „anemometr")
				const pokryti = prozrazena.length / cil.rozlisujici.size;
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
				const dostSlov =
					(prozrazena.length >= 2 && pokryti >= 0.7) ||
					(celeCislo && pokryti >= 0.5) ||
					(celaOdpovedJedenToken && prozrazena.length === 1);
				if (!dostSlov) continue;
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
					const hodnotyOdpovediZdroje = hodnotyZTextu((zdroj.o.odpovedi ?? [])[0]);

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
						//     „doma" jako vstup jeho zadání nebo jeho vlastní odpověď.
						//
						//     `cilJePocetni` už neznamená „v zadání je jakákoli číslice"
						//     (tak se dřív za vstup výpočtu vydávala i pouhá kulisa, viz
						//     útok C: „…ve výšce 3000 metrů?" s odpovědí 80 °C), ale
						//     „v zadání je aspoň jedna MĚŘITELNÁ hodnota s jednotkou".
						//     A hlavně: „doma u zdroje" se posuzuje po jednotkách, takže
						//     zdrojová odpověď „230 V" už nepokryje citovaných „230 minut"
						//     (útok B) a „× 10" v převodu hmotnosti nepokryje „10 N/kg".
						const cilJePocetni = maMeritelnyVstup(cil.o.text);
						const pujcenaHodnota =
							cilJePocetni &&
							shodne.every(
								(h) =>
									!hodnotyZneniCile.has(h) &&
									(hodnotyZneniZdroje.has(h) || hodnotyOdpovediZdroje.has(h)),
							);
						if (pujcenaHodnota) continue;
						if (shodne.some(maJednotku)) latkaSpolecnych = 1;
					}
				}
				if (spolecna.length < latkaSpolecnych) continue;
				uniky.push({
					klic,
					prozrazuje: zdroj.o.text,
					odpoved: (cil.o.odpovedi ?? [])[0],
					otazka: cil.o.text,
					slova: prozrazena,
				});
			}
		}
	}
	return { duplicity, uniky, dvojic };
}

/** Projde všechny bloky webu. Souhrnná shrnutí se přeskakují — skládají se z týchž
 *  objektů otázek jako zdrojové bloky, takže by se každý nález počítal několikrát. */
export async function zkontrolujUniky(data) {
	const { kvizy } = data ?? (await nactiData());
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
		const v = zkontrolujBlok(klic, otazky);
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

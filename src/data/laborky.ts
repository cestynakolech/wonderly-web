/**
 * Jednoduché laboratorní práce — tisknutelné pracovní listy k podtématům.
 * Klíč je stejný jako u kvízů: predmet/rocnik/tema/podtema.
 * Pomůcky jen běžně dostupné ve škole nebo doma; výpočty vychází v celých číslech.
 */
export type Laborka = {
	nazev: string;
	cil: string;
	pomucky: string[];
	postup: string[];
	/** tabulka měření: hlavičky sloupců + počet prázdných řádků na vyplnění */
	tabulka: { sloupce: string[]; radky: number };
	otazky: string[];
	/** bezpečnostní nebo praktická poznámka pod postupem */
	pozor?: string;
	/** zajímavost na závěr */
	tip?: string;
};

export const laborky: Record<string, Laborka> = {
	'fyzika/6-rocnik/cas/cas-a-jeho-mereni': {
		nazev: 'Kyvadlo — měříme čas stopkami',
		cil: 'Změřit dobu kyvu kyvadla a zjistit, na čem závisí.',
		pomucky: ['provázek (asi 1 metr)', 'matice nebo svazek klíčů', 'stopky (stačí mobil)', 'pravítko nebo metr'],
		postup: [
			'Přivaž matici na provázek a zavěs ho z dostatečné výšky — na horní hranu tabule, rám dveří nebo ho drž v natažené ruce. Délka od závěsu k matici ať je 100 cm (kyvadlo se nesmí dotýkat země).',
			'Vychyl kyvadlo kousek do strany a pusť je — nech je volně kývat.',
			'Změř stopkami dobu 10 celých kmitů (jeden kmit = tam a zpět) a zapiš do tabulky.',
			'Měření opakuj celkem 3× a spočítej průměr.',
			'Průměrný čas vyděl deseti — máš dobu jednoho kmitu.',
			'Zkrať provázek na 50 cm a celé měření zopakuj.',
		],
		tabulka: {
			sloupce: ['délka (cm)', '1. měření (s)', '2. měření (s)', '3. měření (s)', 'průměr (s)', 'doba 1 kmitu (s)'],
			radky: 2,
		},
		otazky: [
			'Proč měříme dobu 10 kmitů, a ne jen jednoho?',
			'Kývá kratší kyvadlo rychleji, nebo pomaleji než dlouhé?',
			'Zkus: změní se doba kyvu, když kyvadlo vychýlíš víc? A když pověsíš dvě matice místo jedné?',
		],
		tip: 'Přesně takhle odměřovaly čas kyvadlové hodiny — délka kyvadla určuje, jak rychle tikají.',
	},
	'fyzika/6-rocnik/fyzikalni-veliciny/hustota': {
		nazev: 'Hustota kamene',
		cil: 'Určit hustotu tělesa nepravidelného tvaru pomocí váhy a odměrného válce.',
		pomucky: ['kuchyňská váha', 'odměrný válec nebo odměrka s ryskami (ml)', 'voda', '2–3 menší kameny (musí se vejít do odměrky)', 'případně provázek na spouštění'],
		postup: [
			'Zvaž kámen na váze a hmotnost m zapiš v gramech.',
			'Nalij do odměrky vodu a zapiš objem V₁ (ml).',
			'Opatrně ponoř kámen (klidně na provázku), aby byl celý pod vodou, a zapiš nový objem V₂.',
			'Objem kamene je V = V₂ − V₁. Pamatuj: 1 ml = 1 cm³.',
			'Hustotu spočítej: ρ = m : V (g/cm³).',
			'Zopakuj s dalšími kameny (nebo třeba s gumou či šroubem).',
		],
		tabulka: {
			sloupce: ['předmět', 'm (g)', 'V₁ (ml)', 'V₂ (ml)', 'V (cm³)', 'ρ (g/cm³)'],
			radky: 3,
		},
		otazky: [
			'Proč kámen ve vodě klesá ke dnu? Porovnej jeho hustotu s hustotou vody (1 g/cm³).',
			'Co by dělalo těleso s hustotou menší než 1 g/cm³?',
			'Proč objem kamene měříme ponořením do vody, a ne pravítkem?',
		],
		pozor: 'Kámen do odměrky spouštěj pomalu — ať nerozbiješ dno a nevystříkne voda.',
		tip: 'Stejným trikem (ponořením) prý Archimédés odhalil, že královská koruna není z čistého zlata.',
	},
	'fyzika/7-rocnik/jednoduche-stroje/jednoduche-stroje-paky': {
		nazev: 'Rovnováha na páce — mince na pravítku',
		cil: 'Ověřit, že páka je v rovnováze, když se rovnají momenty sil (síla × rameno).',
		pomucky: ['pravítko 30 cm', 'tužka s hranami (ne kulatá)', '6 stejných mincí (např. pětikoruny)'],
		postup: [
			'Polož tužku na lavici a na ni pravítko tak, aby se vyvážilo — podpěra je osa otáčení (u značky 15 cm).',
			'Polož 1 minci 8 cm vlevo od osy. Najdi, kam položit 1 minci vpravo, aby se pravítko vyvážilo.',
			'Polož 2 mince na sebe 6 cm vlevo. Najdi, kam dát 1 minci vpravo, aby byla rovnováha.',
			'Vyzkoušej další kombinace (3 mince vlevo 4 cm…) a vše zapisuj do tabulky.',
			'Do posledních dvou sloupců spočítej součin počet mincí × vzdálenost pro obě strany.',
		],
		tabulka: {
			sloupce: ['mince vlevo', 'rameno vlevo (cm)', 'mince vpravo', 'rameno vpravo (cm)', 'součin vlevo', 'součin vpravo'],
			radky: 4,
		},
		otazky: [
			'Co platí pro součiny vlevo a vpravo, když je pravítko v rovnováze?',
			'Kam si má sednout těžší kamarád na houpačce, aby se lehčím vyvážili?',
			'Proč je klika na dveřích daleko od pantů?',
		],
		tip: 'Právě jsi ověřil(a) rovnost momentů F₁·a₁ = F₂·a₂ — stejný zákon používá jeřáb i louskáček na ořechy.',
	},
	'fyzika/8-rocnik/mechanicka-prace-a-vykon/vykon': {
		nazev: 'Můj výkon na schodech',
		cil: 'Spočítat vlastní výkon při chůzi a běhu do schodů: P = W : t.',
		pomucky: ['schodiště (aspoň jedno patro)', 'metr nebo pravítko', 'stopky (mobil)', 'osobní váha', 'kalkulačka'],
		postup: [
			'Zvaž se a hmotnost m (kg) zapiš do tabulky.',
			'Změř výšku jednoho schodu v metrech a spočítej počet schodů — celková výška h = počet × výška schodu.',
			'Vyjdi schody běžnou chůzí, kamarád ti změří čas t.',
			'Potom schody vyběhni (opatrně!) a opět si nech změřit čas.',
			'Spočítej práci W = m · g · h (počítej g = 10 N/kg) — je pro chůzi i běh stejná.',
			'Výkon spočítej P = W : t pro chůzi i běh a porovnej.',
		],
		tabulka: {
			sloupce: ['způsob', 'm (kg)', 'h (m)', 't (s)', 'W (J)', 'P (W)'],
			radky: 2,
		},
		otazky: [
			'Při běhu vyšla práce stejná jako při chůzi. Proč je tedy výkon větší?',
			'Porovnej svůj výkon s žárovkou 60 W nebo s rychlovarnou konvicí 2000 W.',
			'Kolik wattů by měl tvůj výkon, kdybys stejné schody zvládl(a) za polovinu času?',
		],
		pozor: 'Běhej jen po suchých schodech, drž se dál od hrany a nikoho nepředbíhej.',
		tip: 'Jeden kůň dá trvale asi 750 W — proto se výkonu motorů dodnes říká „koně".',
	},
};

export type Otazka = {
	text: string;
	/** Správná odpověď je VŽDY první — na stránce se pořadí zamíchá */
	odpovedi: [string, string, string];
};

/**
 * Kvízy k podtématům. Klíč = predmet/rocnik/tema/podtema.
 * Otázky vychází výhradně z ověřených podkladů daného tématu
 * (kontrolní protokol: Omega/dokumenty/kontrola-podkladu-tlak.md).
 */
export const kvizy: Record<string, Otazka[]> = {
	'fyzika/7-rocnik/tlak-v-kapalinach/tlak': [
		{
			text: 'Jak působí tlaková síla na plochu tělesa?',
			odpovedi: ['kolmo na plochu', 'rovnoběžně s plochou', 'vždy svisle dolů'],
		},
		{
			text: 'Čím se mohou projevit účinky tlakové síly na těleso?',
			odpovedi: ['deformací (změnou tvaru) tělesa', 'změnou barvy tělesa', 'zvětšením hmotnosti tělesa'],
		},
		{
			text: 'Jakou značkou označujeme tlak?',
			odpovedi: ['p', 'T', 'F'],
		},
		{
			text: 'Jaká je základní jednotka tlaku?',
			odpovedi: ['pascal (Pa)', 'newton (N)', 'kilogram (kg)'],
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlak?',
			odpovedi: ['p = F : S', 'p = F · S', 'p = S : F'],
		},
		{
			text: 'Tlak 1 Pa vyvolá síla 1 N působící kolmo na plochu…',
			odpovedi: ['1 m²', '1 cm²', '1 km²'],
		},
		{
			text: 'Kolik pascalů je 1 kilopascal (kPa)?',
			odpovedi: ['1 000 Pa', '100 Pa', '10 000 Pa'],
		},
		{
			text: 'Kolik pascalů je 1 megapascal (MPa)?',
			odpovedi: ['1 000 000 Pa', '1 000 Pa', '100 000 Pa'],
		},
		{
			text: 'Kolik pascalů je 1 hektopascal (hPa), který se používá v meteorologii?',
			odpovedi: ['100 Pa', '1 000 Pa', '10 Pa'],
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti tlakové síly?',
			odpovedi: [
				'přímo úměrně — čím větší síla, tím větší tlak',
				'nepřímo úměrně — čím větší síla, tím menší tlak',
				'velikost tlaku na síle nezávisí',
			],
		},
		{
			text: 'Jak závisí velikost tlaku na velikosti plochy, na kterou síla působí?',
			odpovedi: [
				'nepřímo úměrně — čím větší plocha, tím menší tlak',
				'přímo úměrně — čím větší plocha, tím větší tlak',
				'velikost tlaku na ploše nezávisí',
			],
		},
		{
			text: 'Proč bolí šlápnutí jehlovým podpatkem víc než teniskou?',
			odpovedi: [
				'stejná síla působí na menší plochu, takže vzniká větší tlak',
				'jehlový podpatek je vždy těžší než teniska',
				'guma tenisky tlak zvětšuje',
			],
		},
		{
			text: 'Jak můžeme tlak zvětšit?',
			odpovedi: [
				'zmenšením plochy nebo zvětšením síly',
				'zvětšením plochy, na kterou síla působí',
				'zmenšením působící síly',
			],
		},
		{
			text: 'Jak můžeme tlak zmenšit?',
			odpovedi: [
				'zvětšením plochy, na kterou se síla rozloží',
				'zmenšením plochy, na kterou síla působí',
				'zvětšením působící síly',
			],
		},
		{
			text: 'Proč se ostří nože nebo sekery brousí?',
			odpovedi: [
				'zmenší se plocha ostří, a tím vznikne větší tlak',
				'nůž je po nabroušení lehčí',
				'zvětší se plocha ostří, a tím vznikne menší tlak',
			],
		},
		{
			text: 'K čemu slouží sněžnice?',
			odpovedi: [
				'rozloží sílu na větší plochu, takže se do sněhu nezaboříme',
				'zvětšují tlak na sníh, abychom se zabořili',
				'zmenšují plochu, na kterou působí naše váha',
			],
		},
		{
			text: 'Proč mají bagry a tanky pásy a traktory široké pneumatiky?',
			odpovedi: [
				'aby se rozložila síla na větší plochu a stroj se nebořil do měkké půdy',
				'aby byl tlak na půdu co největší',
				'jen kvůli vyšší rychlosti jízdy',
			],
		},
		{
			text: 'Podle jakého vzorce vypočítáme tlakovou sílu, když známe tlak a plochu?',
			odpovedi: ['F = p · S', 'F = p : S', 'F = S : p'],
		},
		{
			text: 'V jakých jednotkách musíme do vzorce pro tlak dosazovat obsah plochy S?',
			odpovedi: ['v metrech čtverečních (m²)', 'v centimetrech čtverečních (cm²)', 'v jakýchkoli jednotkách plochy'],
		},
		{
			text: 'Kolik dm² je 1 m²?',
			odpovedi: ['100 dm²', '10 dm²', '1 000 dm²'],
		},
		{
			text: 'Krabice působí na stůl silou 50 N a její dno má obsah 0,5 m². Jaký je tlak na stůl?',
			odpovedi: ['100 Pa', '25 Pa', '250 Pa'],
		},
	],
};

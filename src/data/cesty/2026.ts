import type { Rok } from './typy';

export const rok2026: Rok = {
	rok: 2026,
	zeme: 'Německo, Francie',
	pinEvropa: { x: 312, y: 363 },
	// začátek trasy = domov; poloha spočítaná stejnou projekcí jako v trasa_uvod.py
	domov: { nazev: 'jižní Čechy', x: 344.9, y: 351.7 },
	mesta: [
		{
			slug: 'landshut',
			/** přibližný počet obyvatel — jen pro pojmenování shluku na mapě */
			obyvatele: 73000,
			nazev: 'Landshut',
			zeme: 'Německo',
			datum: '6. 7. 2026',
			stellplatze: [
				{
					nazev: 'Wohnmobilstellplatz Grieserwiese',
					odkaz: 'https://park4night.com/en/place/28419',
					gps: '48.5316,12.1447',
				},
			],
			x: 324.1,
			y: 360.7,
			videoId: 'u4NmKbMRhiE',
			popis: {
				cs: 'Historické město na řece Isar v Dolním Bavorsku. Nad městem se tyčí hrad Trausnitz a kostel sv. Martina s nejvyšší cihlovou věží na světě (130,6 m).',
				en: "A historic town on the Isar river in Lower Bavaria. Trausnitz Castle towers above the town, along with St. Martin's Church and the world's tallest brick tower (130.6 m).",
				de: 'Historische Stadt an der Isar in Niederbayern. Über der Stadt erheben sich die Burg Trausnitz und die Martinskirche mit dem höchsten Backsteinturm der Welt (130,6 m).',
			},
		},
		{
			slug: 'schongau',
			/** přibližný počet obyvatel — jen pro pojmenování shluku na mapě */
			obyvatele: 12000,
			nazev: 'Schongau',
			zeme: 'Německo',
			datum: '7. 7. 2026',
			stellplatze: [
				{
					nazev: 'Wohnmobilstellplatz Schongau',
					odkaz: 'https://park4night.com/en/place/14362',
					gps: '47.8090,10.8989',
				},
			],
			x: 315.3,
			y: 364.2,
			videoId: 'u4NmKbMRhiE',
			popis: {
				cs: 'Středověké městečko na řece Lech s dochovanými hradbami, leží na trase Romantické cesty (Romantische Straße).',
				en: 'A medieval town on the Lech river with well-preserved town walls, located on the Romantic Road (Romantische Straße).',
				de: 'Mittelalterliches Städtchen am Lech mit erhaltener Stadtmauer, gelegen an der Romantischen Straße.',
			},
		},
		{
			slug: 'geisingen',
			/** přibližný počet obyvatel — jen pro pojmenování shluku na mapě */
			obyvatele: 6000,
			nazev: 'Geisingen',
			zeme: 'Německo',
			datum: '8. 7. 2026',
			stellplatze: [
				{
					nazev: 'Stellplatz Am Espen 8, Geisingen',
					odkaz: 'https://park4night.com/en/place/27516',
					gps: '47.9203,8.6498',
				},
			],
			x: 300.2,
			y: 364.8,
			videoId: 'u4NmKbMRhiE',
			popis: {
				cs: 'Městečko na horním toku Dunaje v Bádensku-Württembersku, nedaleko místa, kde Dunaj po část roku mizí v podzemí (Donauversinkung).',
				en: 'A small town on the upper Danube in Baden-Württemberg, close to the spot where the Danube disappears underground for part of the year (Donauversinkung).',
				de: 'Städtchen an der oberen Donau in Baden-Württemberg, unweit der Stelle, an der die Donau zeitweise im Untergrund versickert (Donauversinkung).',
			},
		},
		{
			slug: 'salbert',
			nazev: 'Salbert',
			zeme: 'Francie',
			datum: '10. 7. 2026',
			stellplatze: [
				{
					nazev: 'Parkoviště Fort du Salbert',
					odkaz: 'https://park4night.com/en/place/224271',
					gps: '47.6609,6.8178',
				},
			],
			x: 281.4,
			y: 365.8,
			videoId: '9Sv4exafb-c',
			popis: {
				cs: 'Obec na severozápadním okraji Belfortu ve Franche-Comté. Nad ní se zvedá zalesněný vrch Salbert s pevností Fort du Salbert ze 70. let 19. století (součást belfortského opevnění) a výhledem na město i Vogézy.',
				en: 'A village on the north-western edge of Belfort in Franche-Comté. Above it rises the wooded Salbert hill with Fort du Salbert, built in the 1870s as part of the Belfort fortifications, overlooking the town and the Vosges.',
				de: 'Gemeinde am nordwestlichen Rand von Belfort in der Franche-Comté. Darüber erhebt sich der bewaldete Hügel Salbert mit dem Fort du Salbert aus den 1870er Jahren (Teil der Belforter Befestigungen) mit Blick auf die Stadt und die Vogesen.',
			},
		},
		{
			slug: 'le-thillot',
			nazev: 'Le Thillot',
			zeme: 'Francie',
			datum: '12. 7. 2026',
			stellplatze: [
				{
					nazev: 'Aire Le Thillot, Chemin du Draimont',
					odkaz: 'https://park4night.com/en/place/52710',
					gps: '47.8837,6.7783',
				},
			],
			x: 281.1,
			y: 363.2,
			videoId: 'Tlnc-YigfTw',
			popis: {
				cs: 'Městečko na horním toku Mosely ve Vogézách. Proslulo měděnými doly lotrinských vévodů (Les Hautes-Mynes), kde se těžilo od 16. do 18. století — dnes se dají navštívit.',
				en: 'A small town on the upper Moselle in the Vosges. It is known for the copper mines of the Dukes of Lorraine (Les Hautes-Mynes), worked from the 16th to the 18th century and open to visitors today.',
				de: 'Städtchen an der oberen Mosel in den Vogesen. Bekannt für die Kupferbergwerke der Herzöge von Lothringen (Les Hautes-Mynes), betrieben vom 16. bis 18. Jahrhundert — heute zu besichtigen.',
			},
		},
		{
			slug: 'rupt-sur-moselle',
			nazev: 'Rupt-sur-Moselle',
			zeme: 'Francie',
			datum: '14. 7. 2026',
			stellplatze: [
				{
					nazev: 'Aire Rupt-sur-Moselle, Rue du Riffin',
					odkaz: 'https://park4night.com/en/place/102077',
					gps: '47.9206,6.6558',
				},
			],
			x: 280.3,
			y: 362.6,
			videoId: 'nBnRJsLpsCg',
			popis: {
				cs: 'Obec roztažená podél horní Mosely mezi Remiremontem a Le Thillot. Zastihli jsme tu oslavy státního svátku 14. července — výročí dobytí Bastily — s průvodem místních hasičů.',
				en: 'A village stretched along the upper Moselle between Remiremont and Le Thillot. We caught the celebrations of Bastille Day (14 July) with a parade of the local fire brigade.',
				de: 'Ein Dorf entlang der oberen Mosel zwischen Remiremont und Le Thillot. Wir erlebten die Feiern zum Nationalfeiertag am 14. Juli — dem Jahrestag des Sturms auf die Bastille — mit einem Umzug der örtlichen Feuerwehr.',
			},
		},
		{
			slug: 'saint-maurice-sur-moselle',
			nazev: 'Saint-Maurice-sur-Moselle',
			zeme: 'Francie',
			datum: '17. 7. 2026',
			stellplatze: [
				{
					nazev: 'Aire Saint-Maurice-sur-Moselle, Rue de Presles',
					odkaz: 'https://park4night.com/en/place/41807',
					gps: '47.8498,6.8101',
				},
			],
			x: 281.6,
			y: 363.5,
			videoId: 'swDAmX8BRJA',
			popis: {
				cs: 'Vesnice v jižních Vogézách pod horou Ballon d’Alsace (1 247 m). Právě odtud startuje stoupání, které bylo v roce 1905 prvním horským stoupáním v historii Tour de France — a letos jsme tu Tour zažili naživo: reklamní karavanu i průjezd závodníků (ve videu s kapitolami).',
				en: 'A village in the southern Vosges at the foot of the Ballon d’Alsace (1,247 m). The climb starting here was the first mountain ascent in Tour de France history (1905) — and this year we experienced the Tour live: the publicity caravan and the riders passing through (see the chaptered video).',
				de: 'Ein Dorf in den Südvogesen am Fuß des Ballon d’Alsace (1 247 m). Der hier beginnende Anstieg war 1905 die erste Bergwertung der Tour-de-France-Geschichte — und dieses Jahr erlebten wir die Tour live: Werbekarawane und Fahrerfeld (siehe Video mit Kapiteln).',
			},
		},
		{
			slug: 'ornans',
			/** přibližný počet obyvatel — jen pro pojmenování shluku na mapě */
			obyvatele: 4000,
			nazev: 'Ornans',
			zeme: 'Francie',
			datum: '18. 7. 2026',
			stellplatze: [
				{
					nazev: 'CAMPING-CAR PARK Ornans, Chemin des Essarts Cendrins',
					odkaz: 'https://park4night.com/en/place/689516',
					gps: '47.1072,6.1483',
				},
			],
			x: 275.4,
			y: 372.4,
			videoId: 'swDAmX8BRJA',
			popis: {
				cs: 'Městečko v údolí řeky Loue v departementu Doubs, přezdívané „malé Benátky Franche-Comté" — domy tu stojí přímo nad vodou. Rodiště malíře Gustava Courbeta (1819), jemuž je věnováno zdejší muzeum.',
				en: 'A small town in the Loue valley in the Doubs department, nicknamed the "little Venice of Franche-Comté" — its houses stand right above the water. Birthplace of the painter Gustave Courbet (1819), honoured by a local museum.',
				de: 'Städtchen im Tal der Loue im Département Doubs, genannt „Klein-Venedig der Franche-Comté" — die Häuser stehen direkt über dem Wasser. Geburtsort des Malers Gustave Courbet (1819), dem ein Museum gewidmet ist.',
			},
		},
		{
			slug: 'frangy',
			nazev: 'Frangy',
			zeme: 'Francie',
			datum: '20. 7. 2026',
			stellplatze: [
				{
					nazev: 'Přespání u vinaře mezi vinicemi',
					cenaNoc: '10 € / osoba (bez elektřiny a vody)',
					elektrina: '6 €',
					rokCen: 'z vlastní návštěvy, 07/2026',
				},
			],
			x: 272.9,
			y: 385.6,
			popis: {
				cs: 'Vinařská obec v Horním Savojsku asi 30 km jižně od Ženevského jezera. Okolní svahy osázené odrůdou Altesse dávají bílé víno Roussette de Savoie – Frangy, jeden ze čtyř vyhlášených krů této apelace. Přespali jsme přímo u vinaře mezi vinicemi — krásný výhled, milí lidé a dobré víno.',
				en: 'A wine-growing village in Haute-Savoie, some 30 km south of Lake Geneva. The surrounding slopes planted with the Altesse grape yield the white Roussette de Savoie – Frangy, one of the four named crus of the appellation. We stayed overnight at a winery among the vineyards — a lovely view, kind people and good wine.',
				de: 'Winzerdorf in Hochsavoyen, etwa 30 km südlich des Genfersees. An den umliegenden Hängen wächst die Rebsorte Altesse für den Weißwein Roussette de Savoie – Frangy, einen der vier Crus dieser Appellation. Wir übernachteten direkt beim Winzer zwischen den Reben — schöne Aussicht, nette Leute und guter Wein.',
			},
		},
		{
			slug: 'vaulnaveys-le-haut',
			nazev: 'Vaulnaveys-le-Haut',
			zeme: 'Francie',
			datum: '21. 7. 2026',
			x: 271.4,
			y: 396.5,
			popisekPosun: { dx: -2, dy: -2, kotva: 'end' },
			popis: {
				cs: 'Obec v ledovcovém údolí asi 15 km od Grenoblu. Na jejím území leží lázně Uriage-les-Bains (414 m n. m.), jejichž minerální prameny se odedávna využívají při potížích s kůží, klouby a dýcháním.',
				en: 'A commune in a glacial valley about 15 km from Grenoble. Its territory includes the spa of Uriage-les-Bains (414 m), whose mineral springs have long been used for skin, joint and respiratory ailments.',
				de: 'Gemeinde in einem Gletschertal rund 15 km von Grenoble. Auf ihrem Gebiet liegt das Thermalbad Uriage-les-Bains (414 m), dessen Mineralquellen seit jeher bei Haut-, Gelenk- und Atembeschwerden genutzt werden.',
			},
		},
		{
			slug: 'livet-et-gavet',
			nazev: 'Livet-et-Gavet',
			zeme: 'Francie',
			datum: '21. 7. 2026',
			x: 272.4,
			y: 396.9,
			popisekPosun: { dx: 2, dy: 4, kotva: 'start' },
			popis: {
				cs: "Obec v údolí řeky Romanche, na půl cesty mezi Grenoblem a středisky Alpe d'Huez a Les Deux Alpes. Údolí bylo kolébkou francouzské vodní energetiky — podzemní elektrárna Romanche-Gavet (v provozu od roku 2020, výkon 97 MW) je nejvýkonnější podzemní vodní elektrárnou ve Francii a nahradila šest starých elektráren.",
				en: "A commune in the Romanche valley, halfway between Grenoble and the resorts of Alpe d'Huez and Les Deux Alpes. The valley was a cradle of French hydropower — the underground Romanche-Gavet plant (running since 2020, 97 MW) is the most powerful underground hydroelectric plant in France and replaced six older ones.",
				de: "Gemeinde im Tal der Romanche, auf halbem Weg zwischen Grenoble und den Orten Alpe d'Huez und Les Deux Alpes. Das Tal war eine Wiege der französischen Wasserkraft — das unterirdische Kraftwerk Romanche-Gavet (seit 2020, 97 MW) ist das leistungsstärkste unterirdische Wasserkraftwerk Frankreichs und ersetzte sechs ältere Anlagen.",
			},
		},
	],
	videa: [
		{ id: 'u4NmKbMRhiE', nazev: '06. 07. · Německo — Landshut, Schongau, Geisingen', odkaz: 'https://youtu.be/u4NmKbMRhiE' },
		{ id: '9Sv4exafb-c', nazev: '10. 07. · Salbert (Francie)', odkaz: 'https://youtu.be/9Sv4exafb-c' },
		{ id: 'Tlnc-YigfTw', nazev: '12. 07. · Le Thillot (Francie)', odkaz: 'https://youtu.be/Tlnc-YigfTw' },
		{ id: 'nBnRJsLpsCg', nazev: '14. 07. · Rupt-sur-Moselle (Francie)', odkaz: 'https://youtu.be/nBnRJsLpsCg' },
		{ id: 'swDAmX8BRJA', nazev: '17. 07. · Saint-Maurice-sur-Moselle (Francie) — Tour de France, s kapitolami', odkaz: 'https://youtu.be/swDAmX8BRJA' },
	],
};

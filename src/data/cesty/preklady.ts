import type { Jazyk, PrelozenyPopis } from './typy';

export const JAZYKY: Jazyk[] = ['cs', 'en', 'de'];

/** Adresa stránky deníku v daném jazyce (čeština je bez předpony) */
export function cestaCesty(jazyk: Jazyk, podcesta = ''): string {
	const zaklad = jazyk === 'cs' ? '/cesty' : `/cesty/${jazyk}`;
	return podcesta ? `${zaklad}/${podcesta}` : zaklad;
}

/** Popis nemusí být vyplněný — u starších dovolených sestavených z GPS ve fotkách
 *  se text doplňuje postupně; místo se do té doby ukáže na mapě jen bez popisu. */
export function prelozPopis(popis: PrelozenyPopis | undefined, jazyk: Jazyk): string {
	if (!popis) return '';
	return popis[jazyk] ?? popis.cs;
}

/** Názvy zemí; klíčem je český název, který zapisují data i skript `mesto` */
const NAZVY_ZEMI: Record<string, { en: string; de: string }> = {
	Německo: { en: 'Germany', de: 'Deutschland' },
	Francie: { en: 'France', de: 'Frankreich' },
	Itálie: { en: 'Italy', de: 'Italien' },
	Španělsko: { en: 'Spain', de: 'Spanien' },
	Nizozemsko: { en: 'Netherlands', de: 'Niederlande' },
	Belgie: { en: 'Belgium', de: 'Belgien' },
	Polsko: { en: 'Poland', de: 'Polen' },
	Maďarsko: { en: 'Hungary', de: 'Ungarn' },
	Rakousko: { en: 'Austria', de: 'Österreich' },
	Slovensko: { en: 'Slovakia', de: 'Slowakei' },
	Česko: { en: 'Czechia', de: 'Tschechien' },
	Švýcarsko: { en: 'Switzerland', de: 'Schweiz' },
	Portugalsko: { en: 'Portugal', de: 'Portugal' },
	'Velká Británie': { en: 'United Kingdom', de: 'Großbritannien' },
	Irsko: { en: 'Ireland', de: 'Irland' },
	Dánsko: { en: 'Denmark', de: 'Dänemark' },
	Švédsko: { en: 'Sweden', de: 'Schweden' },
	Norsko: { en: 'Norway', de: 'Norwegen' },
	Finsko: { en: 'Finland', de: 'Finnland' },
	Řecko: { en: 'Greece', de: 'Griechenland' },
	Chorvatsko: { en: 'Croatia', de: 'Kroatien' },
	Slovinsko: { en: 'Slovenia', de: 'Slowenien' },
	Rumunsko: { en: 'Romania', de: 'Rumänien' },
	Bulharsko: { en: 'Bulgaria', de: 'Bulgarien' },
	Lucembursko: { en: 'Luxembourg', de: 'Luxemburg' },
	Litva: { en: 'Lithuania', de: 'Litauen' },
	Lotyšsko: { en: 'Latvia', de: 'Lettland' },
	Estonsko: { en: 'Estonia', de: 'Estland' },
};

const SPOJKA: Record<Jazyk, string> = { cs: ' a ', en: ' and ', de: ' und ' };

/** Přeloží název země i čárkou oddělený seznam ("Německo, Francie" → "Germany and France") */
export function prelozZemi(zeme: string, jazyk: Jazyk): string {
	const casti = zeme
		.split(',')
		.map((z) => z.trim())
		.filter(Boolean)
		.map((z) => (jazyk === 'cs' ? z : (NAZVY_ZEMI[z]?.[jazyk] ?? z)));
	if (casti.length <= 1) return casti[0] ?? zeme;
	return casti.slice(0, -1).join(', ') + SPOJKA[jazyk] + casti[casti.length - 1];
}

const MESICE_EN = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];
const MESICE_CS = [
	'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
	'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec',
];
const MESICE_DE = [
	'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
	'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

/** Datum je v datech uloženo česky ("6. 7. 2026", výjimečně "červenec 2026");
 *  pro angličtinu a němčinu se přeformátuje/přeloží. */
export function formatujDatum(datum: string, jazyk: Jazyk): string {
	if (jazyk === 'cs') return datum;
	// slovní tvar „červenec 2026" — přeložit název měsíce
	const slovni = datum.trim().match(/^(\p{L}+)\s+(\d{4})$/u);
	if (slovni) {
		const i = MESICE_CS.indexOf(slovni[1].toLowerCase());
		if (i >= 0) return `${(jazyk === 'en' ? MESICE_EN : MESICE_DE)[i]} ${slovni[2]}`;
		return datum;
	}
	if (jazyk !== 'en') return datum; // německý číselný tvar je shodný s českým
	const casti = datum.split('.').map((c) => parseInt(c.trim(), 10));
	if (casti.length !== 3 || casti.some(Number.isNaN)) return datum;
	const [den, mesic, rok] = casti;
	return `${den} ${MESICE_EN[mesic - 1]} ${rok}`;
}

/** Emoji vlajky zemí; klíčem je český název jako v NAZVY_ZEMI */
const VLAJKY: Record<string, string> = {
	Německo: '🇩🇪', Francie: '🇫🇷', Itálie: '🇮🇹', Španělsko: '🇪🇸', Nizozemsko: '🇳🇱',
	Belgie: '🇧🇪', Polsko: '🇵🇱', Maďarsko: '🇭🇺', Rakousko: '🇦🇹', Slovensko: '🇸🇰',
	Česko: '🇨🇿', Švýcarsko: '🇨🇭', Portugalsko: '🇵🇹', 'Velká Británie': '🇬🇧', Irsko: '🇮🇪',
	Dánsko: '🇩🇰', Švédsko: '🇸🇪', Norsko: '🇳🇴', Finsko: '🇫🇮', Řecko: '🇬🇷',
	Chorvatsko: '🇭🇷', Slovinsko: '🇸🇮', Rumunsko: '🇷🇴', Bulharsko: '🇧🇬', Lucembursko: '🇱🇺',
	Litva: '🇱🇹', Lotyšsko: '🇱🇻', Estonsko: '🇪🇪',
};

/** Vlajky pro čárkou oddělený seznam zemí ("Německo, Francie" → "🇩🇪 🇫🇷") */
export function vlajkyZemi(zeme: string): string {
	return zeme
		.split(',')
		.map((z) => VLAJKY[z.trim()] ?? '')
		.filter(Boolean)
		.join(' ');
}

export const TEXTY = {
	cs: {
		nadpis: 'Cesty na kolech',
		uvod: 'Cestovatelský deník z výprav obytným autem po Evropě. Vyber rok na mapě nebo tlačítkem a podívej se, kudy jsme jeli.',
		vsechnaMista: 'Všechna místa',
		vsechnaMistaUvod: 'Všechna navštívená města ze všech roků na jedné mapě.',
		zpetNaRoky: 'Zpět na roky',
		vsechnyRoky: 'Všechny roky',
		mapaEvropy: 'Mapa Evropy s roky výprav',
		mapaVsech: 'Mapa všech navštívených měst',
		mapaRoku: 'Mapa navštívených měst v roce',
		podklad: 'Mapový podklad:',
		autorLicence: ', autor maix (Wikimedia Commons), licence',
		upraveno: '– upraveno (přidány piny).',
		prepnoutVzhled: 'Světlý/tmavý režim',
		celaCesta: 'Celá cesta',
		otevrit: 'Otevřít',
		zpetNaMapu: '← Zpět na celou mapu',
		tvaryMist: ['místo', 'místa', 'míst'],
		tvaryVyprav: ['výprava', 'výpravy', 'výprav'],
		tvaryZemi: ['země', 'země', 'zemí'],
		tvaryDnu: ['den', 'dny', 'dnů'],
		naCeste: 'na cestě',
		videaNadpis: 'Videa z cesty',
		cenyUpozorneni: 'Ceny stání jsou jen orientační — veřejně dohledané z aplikací (park4night, Camping-Car Park) k uvedenému datu. Nemusí být aktuální, před cestou si je ověř v aplikaci nebo na místě.',
		cenyUpozorneniVlastni: 'Ceny jsme platili sami při naší návštěvě k uvedenému datu — dnes už mohou být jiné, před cestou si je ověř.',
		napovedaMapa: 'Kliknutím na kroužek s číslem se mapa přiblíží a ukáže jen ta místa.',
		bertikReport: '🐾 Bertíkův čmuchací report',
	},
	en: {
		nadpis: 'Journeys on Wheels',
		uvod: 'A travel diary from our motorhome trips across Europe. Pick a year on the map or with a button and see where we went.',
		vsechnaMista: 'All places',
		vsechnaMistaUvod: 'All visited places from all years on one map.',
		zpetNaRoky: 'Back to years',
		vsechnyRoky: 'All years',
		mapaEvropy: 'Map of Europe with journey years',
		mapaVsech: 'Map of all visited places',
		mapaRoku: 'Map of places visited in',
		podklad: 'Base map:',
		autorLicence: ' by maix (Wikimedia Commons), licensed under',
		upraveno: '– modified (pins added).',
		prepnoutVzhled: 'Light/dark mode',
		celaCesta: 'Whole journey',
		otevrit: 'Open',
		zpetNaMapu: '← Back to the whole map',
		tvaryMist: ['place', 'places', 'places'],
		tvaryVyprav: ['journey', 'journeys', 'journeys'],
		tvaryZemi: ['country', 'countries', 'countries'],
		tvaryDnu: ['day', 'days', 'days'],
		naCeste: 'on the road',
		videaNadpis: 'Videos from the journey',
		cenyUpozorneni: 'Parking prices are indicative only — publicly sourced from apps (park4night, Camping-Car Park) as of the date shown. They may be outdated; verify in the app or on site before travelling.',
		cenyUpozorneniVlastni: 'These are the prices we paid ourselves on the date shown — they may well be different today, so check before you travel.',
		napovedaMapa: 'Click a circle with a number to zoom in and see only those places.',
		bertikReport: "🐾 Bertík's sniffing report (Czech)",
	},
	de: {
		nadpis: 'Reisen auf Rädern',
		uvod: 'Ein Reisetagebuch von unseren Wohnmobilreisen durch Europa. Wähle ein Jahr auf der Karte oder über die Schaltflächen und schau, wo wir unterwegs waren.',
		vsechnaMista: 'Alle Orte',
		vsechnaMistaUvod: 'Alle besuchten Orte aus allen Jahren auf einer Karte.',
		zpetNaRoky: 'Zurück zu den Jahren',
		vsechnyRoky: 'Alle Jahre',
		mapaEvropy: 'Europakarte mit den Reisejahren',
		mapaVsech: 'Karte aller besuchten Orte',
		mapaRoku: 'Karte der besuchten Orte im Jahr',
		podklad: 'Kartengrundlage:',
		autorLicence: ' von maix (Wikimedia Commons), Lizenz',
		upraveno: '– bearbeitet (Pins hinzugefügt).',
		prepnoutVzhled: 'Hell/Dunkel-Modus',
		celaCesta: 'Ganze Reise',
		otevrit: 'Öffnen',
		zpetNaMapu: '← Zurück zur ganzen Karte',
		tvaryMist: ['Ort', 'Orte', 'Orte'],
		tvaryVyprav: ['Reise', 'Reisen', 'Reisen'],
		tvaryZemi: ['Land', 'Länder', 'Länder'],
		tvaryDnu: ['Tag', 'Tage', 'Tage'],
		naCeste: 'unterwegs',
		videaNadpis: 'Videos von der Reise',
		cenyUpozorneni: 'Stellplatzpreise sind nur Richtwerte — öffentlich aus Apps (park4night, Camping-Car Park) zum angegebenen Datum ermittelt. Sie können veraltet sein; bitte vor der Reise in der App oder vor Ort prüfen.',
		cenyUpozorneniVlastni: 'Diese Preise haben wir bei unserem Besuch zum angegebenen Datum selbst bezahlt — heute können sie anders sein; bitte vor der Reise prüfen.',
		napovedaMapa: 'Klicke auf einen Kreis mit Zahl, um heranzuzoomen und nur diese Orte zu sehen.',
		bertikReport: '🐾 Bertíks Schnüffelreport (Tschechisch)',
	},
} satisfies Record<Jazyk, Record<string, string | readonly string[]>>;

/** „3 místa" / „5 míst" — české skloňování podle počtu (pro en/de vrací množné číslo). */
export function pocetMist(n: number, tvary: readonly string[]): string {
	return `${n} ${n === 1 ? tvary[0] : n < 5 ? tvary[1] : tvary[2]}`;
}

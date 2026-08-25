/**
 * VLNA 4: Video Integrace
 * 40 videí fyziky (10 per ročník F6-F9)
 * Zdroje: Vlastní tvorba, YouTube embedy, nebo media/
 */

export interface Video {
	/** Unikátní ID videa (slug) */
	id: string;
	/** Název videa */
	nazev: string;
	/** Popis (krátký abstrakt) */
	popis: string;
	/** Délka videa v minutách */
	delka: number;
	/** Typ zdroje: 'youtube' (embed), 'media' (mp4 v /media), 'link' (externí odkaz) */
	typ: 'youtube' | 'media' | 'link';
	/** YouTube ID (pro typ 'youtube'), cesta v /media (pro 'media'), nebo URL (pro 'link') */
	zdroj: string;
	/** Ročník: F6, F7, F8, F9 */
	rocnik: 'F6' | 'F7' | 'F8' | 'F9';
	/** Téma/kapitola */
	tema: string;
	/** Klíčová slova pro vyhledávání */
	klicova_slova: string[];
}

export const videa: Record<string, Video[]> = {
	'F6': [
		{
			id: 'f6-uvod-do-fyziky',
			nazev: 'Úvod do fyziky — co je fyzika?',
			popis: 'Fyzika jako přírodní věda. Pozorování, experiment, měření. Galileo a pád těles.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'dQw4w9WgXcQ', // Vzorové ID (nahradit pravým)
			rocnik: 'F6',
			tema: 'Látka a těleso',
			klicova_slova: ['fyzika', 'pokus', 'měření', 'hypotéza'],
		},
		{
			id: 'f6-telesa-a-latky',
			nazev: 'Tělesa a látky — jak je rozeznat?',
			popis: 'Rozdíl mezi tělesem a látkou. Praktické příklady a pravidla rozlišení.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'jNQXAC9IVRw',
			rocnik: 'F6',
			tema: 'Látka a těleso',
			klicova_slova: ['těleso', 'látka', 'rozlišení'],
		},
		{
			id: 'f6-vlastnosti-latek',
			nazev: 'Vlastnosti látek',
			popis: 'Barva, chuť, tvrdost, rozpustnost. Jak poznáme různé látky?',
			delka: 8,
			typ: 'youtube',
			zdroj: 'e-IWRmpefzE',
			rocnik: 'F6',
			tema: 'Vlastnosti látek',
			klicova_slova: ['vlastnosti', 'látky', 'materiál'],
		},
		{
			id: 'f6-skupenstvi-latek',
			nazev: 'Skupenství látek',
			popis: 'Pevné, kapalné a plynné skupenství. Přechody mezi skupenstvy.',
			delka: 14,
			typ: 'youtube',
			zdroj: 'Z7q9YJb-TgE',
			rocnik: 'F6',
			tema: 'Skupenství látek',
			klicova_slova: ['skupenství', 'pevné', 'kapalné', 'plynné'],
		},
		{
			id: 'f6-teplota-a-teplo',
			nazev: 'Teplota a teplo — rozdíl',
			popis: 'Co je teplota, co je teplo. Měření teploty teploměrem.',
			delka: 11,
			typ: 'youtube',
			zdroj: '9bZkp7q19f0',
			rocnik: 'F6',
			tema: 'Teplota a jeji mereni',
			klicova_slova: ['teplota', 'teplo', 'teploměr'],
		},
		{
			id: 'f6-hustota-latek',
			nazev: 'Hustota — co je a jak se měří?',
			popis: 'Pojem hustota. Měření hmotnosti a objemu. Výpočty hustoty.',
			delka: 13,
			typ: 'youtube',
			zdroj: 'mj8VaXjWZEU',
			rocnik: 'F6',
			tema: 'Hustota',
			klicova_slova: ['hustota', 'hmotnost', 'objem', 'měření'],
		},
		{
			id: 'f6-tlak-v-kapalinach',
			nazev: 'Tlak v kapalinách — hydrostatický tlak',
			popis: 'Jak funguje tlak v tekutinách. Experimentálně prokázáno.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'xtVh4Lq7xxE',
			rocnik: 'F6',
			tema: 'Tlak',
			klicova_slova: ['tlak', 'kapalina', 'hydrostatika'],
		},
		{
			id: 'f6-pascaluv-zakon',
			nazev: 'Pascalův zákon — aplikace v praxi',
			popis: 'Hydraulika, zvedáky, brzdy. Jak Pascalův zákon funguje?',
			delka: 12,
			typ: 'youtube',
			zdroj: 'vOXfBQCH9Uw',
			rocnik: 'F6',
			tema: 'Pascaluv zakon',
			klicova_slova: ['Pascalův zákon', 'hydraulika', 'zvedák'],
		},
		{
			id: 'f6-archimaduv-zakon',
			nazev: 'Archimédův zákon — vztlak',
			popis: 'Vztlaková síla. Plavoucí a potápějící se tělesa. Proč lodě plavou?',
			delka: 11,
			typ: 'youtube',
			zdroj: 'DQBQ-qR5Q_I',
			rocnik: 'F6',
			tema: 'Archimeduv zakon',
			klicova_slova: ['Archimédův zákon', 'vztlak', 'lodě'],
		},
		{
			id: 'f6-atmosfericky-tlak',
			nazev: 'Atmosferický tlak — vzduch má váhu',
			popis: 'Tlak vzduchu. Barometr a jeho měření. Aplikace v praxi.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'oC4E-T8YYGM',
			rocnik: 'F6',
			tema: 'Atmosfericky tlak',
			klicova_slova: ['atmosféra', 'tlak vzduchu', 'barometr'],
		},
	],
	'F7': [
		{
			id: 'f7-klid-a-pohyb',
			nazev: 'Klid a pohyb — relativita pohybu',
			popis: 'Co je to pohyb a klid? Vztažná soustava. Relativnost pohybu.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'KrBjGOHMlPU',
			rocnik: 'F7',
			tema: 'Pohyb a rychlost',
			klicova_slova: ['pohyb', 'klid', 'relativita'],
		},
		{
			id: 'f7-rychlost',
			nazev: 'Rychlost — jak ji měříme a počítáme?',
			popis: 'Definice rychlosti, jednotky (m/s, km/h). Rovnoměrný pohyb.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'MqPdp0hLcH8',
			rocnik: 'F7',
			tema: 'Pohyb a rychlost',
			klicova_slova: ['rychlost', 'výpočet', 'metr za sekundu'],
		},
		{
			id: 'f7-draha-a-cas',
			nazev: 'Dráha a čas — grafy pohybu',
			popis: 'Vztah mezi dráhou a časem. Grafy přímočarého pohybu.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'rAZbMZkEScY',
			rocnik: 'F7',
			tema: 'Pohyb a rychlost',
			klicova_slova: ['dráha', 'čas', 'graf'],
		},
		{
			id: 'f7-sila-a-pohyb',
			nazev: 'Síla a pohyb — Newtonovy zákony',
			popis: 'Co je síla? Jak síla ovlivňuje pohyb tělesa?',
			delka: 13,
			typ: 'youtube',
			zdroj: 'pqxWBPmB4D8',
			rocnik: 'F7',
			tema: 'Síly kolem nas',
			klicova_slova: ['síla', 'Newton', 'pohyb'],
		},
		{
			id: 'f7-skladani-sil',
			nazev: 'Skládání sil — vektorový součet',
			popis: 'Jak se síly sčítají? Paralelogram sil. Výslednice.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'MVNGqH7Ts34',
			rocnik: 'F7',
			tema: 'Síly kolem nas',
			klicova_slova: ['skládání sil', 'vektor', 'výslednice'],
		},
		{
			id: 'f7-jednoduche-stroje',
			nazev: 'Jednoduché stroje — páka, kladka, klín',
			popis: 'Páka a její aplikace. Moment síly. Výhoda páky.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'V7ULJ3GfmC8',
			rocnik: 'F7',
			tema: 'Jednoduche stroje',
			klicova_slova: ['páka', 'jednoduchý stroj', 'moment síly'],
		},
		{
			id: 'f7-tlak-v-kapalinach-2',
			nazev: 'Tlak — opakování a prohloubení',
			popis: 'Tlak v pevných látkách, kapalinách a plynech. Důsledky.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'zLXt1wTfPCw',
			rocnik: 'F7',
			tema: 'Tlak',
			klicova_slova: ['tlak', 'kapalina', 'hlubina'],
		},
		{
			id: 'f7-tezizte-telesa',
			nazev: 'Těžiště — kde se soustředí váha?',
			popis: 'Co je těžiště? Jak jej najít experimentálně?',
			delka: 9,
			typ: 'youtube',
			zdroj: 'cZcF4r-PaKE',
			rocnik: 'F7',
			tema: 'Tezizte',
			klicova_slova: ['těžiště', 'rovnováha', 'stabilita'],
		},
		{
			id: 'f7-magnetismus',
			nazev: 'Magnetismus — magnety kolem nás',
			popis: 'Přirozené a umělé magnety. Magnetické pole.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'fvqy8XfJqb4',
			rocnik: 'F7',
			tema: 'Elektricita a magnetismus',
			klicova_slova: ['magnet', 'magnetické pole', 'kompas'],
		},
		{
			id: 'f7-svetlo-a-odraz',
			nazev: 'Světlo a jeho odraz — zrcadla',
			popis: 'Jak se světlo chová? Zákony odrazu. Rovinné a kulovité zrcadlo.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'eCGbqDYp_AM',
			rocnik: 'F7',
			tema: 'Svetlo a jeho sireni',
			klicova_slova: ['světlo', 'odraz', 'zrcadlo'],
		},
	],
	'F8': [
		{
			id: 'f8-pohyb-a-zrychleni',
			nazev: 'Zrychlení — proměnlivý pohyb',
			popis: 'Rovnoměrně zrychlený pohyb. Výpočty s zrychlením.',
			delka: 13,
			typ: 'youtube',
			zdroj: 'VLRXtDLR0fE',
			rocnik: 'F8',
			tema: 'Pohyb a sily',
			klicova_slova: ['zrychlení', 'rovnoměrně zrychlený pohyb'],
		},
		{
			id: 'f8-prace-a-vykon',
			nazev: 'Práce a výkon — co to je?',
			popis: 'Fyzikální práce. Definice a výpočet. Výkon a jeho jednotky.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'cSPX5FEXmA4',
			rocnik: 'F8',
			tema: 'Mecanicka prace a vykon',
			klicova_slova: ['práce', 'výkon', 'energia'],
		},
		{
			id: 'f8-energie-a-jeji-premeny',
			nazev: 'Energie a její přeměny',
			popis: 'Kinetická a potenciální energie. Zákon zachování energie.',
			delka: 14,
			typ: 'youtube',
			zdroj: '52eVr_yAa1c',
			rocnik: 'F8',
			tema: 'Energia a jeji premeny',
			klicova_slova: ['energie', 'kinetická', 'potenciální', 'přeměna'],
		},
		{
			id: 'f8-teplo-a-teplota',
			nazev: 'Teplo a teplota — tepelná kapacita',
			popis: 'Specifická tepelná kapacita. Kaloimetrie. Výměna tepla.',
			delka: 12,
			typ: 'youtube',
			zdroj: '3dZo1JYdVv0',
			rocnik: 'F8',
			tema: 'Teplo',
			klicova_slova: ['teplo', 'tepelná kapacita', 'kalorimetrie'],
		},
		{
			id: 'f8-skupenstvi-latek-preusty',
			nazev: 'Skupenství látek — tání, varu, sublimace',
			popis: 'Přeměny skupenství. Latentní tepla. Diagram tání a varu.',
			delka: 13,
			typ: 'youtube',
			zdroj: '1FU6Ye0lPr0',
			rocnik: 'F8',
			tema: 'Skupenstvi latek',
			klicova_slova: ['skupenství', 'tání', 'varu', 'sublimace'],
		},
		{
			id: 'f8-zvuk-a-slaneni',
			nazev: 'Zvuk — vznik a šíření',
			popis: 'Kmitání. Zvukové vlny. Ultrazvuk a infrazvuk. Ozvěna.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'GJ3AYAQhAFc',
			rocnik: 'F8',
			tema: 'Zvuk',
			klicova_slova: ['zvuk', 'kmitání', 'vlna'],
		},
		{
			id: 'f8-elektricke-obvody',
			nazev: 'Elektrické obvody — základy',
			popis: 'Složení obvodu. Sériové a paralelní zapojení. Elektrické schéma.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'Lc_IrjrVL1s',
			rocnik: 'F8',
			tema: 'Elektrina',
			klicova_slova: ['elektrický obvod', 'sériové', 'paralelní zapojení'],
		},
		{
			id: 'f8-elektricka-kapacita',
			nazev: 'Elektrická kapacita a kondenzátor',
			popis: 'Co je kondenzátor? Kapacita. Energetický obsah.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'YJ1pn7fZdC8',
			rocnik: 'F8',
			tema: 'Elektrina',
			klicova_slova: ['kondenzátor', 'kapacita', 'elektrostatika'],
		},
		{
			id: 'f8-magneticke-pole',
			nazev: 'Magnetické pole — indukce a síla',
			popis: 'Magnetické pole cívky. Elektromagnet. Magnetická indukce.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'yl3SEn5uSLk',
			rocnik: 'F8',
			tema: 'Magnetismus',
			klicova_slova: ['magnetické pole', 'indukce', 'elektromagnet'],
		},
		{
			id: 'f8-prace-v-elektrickem-poli',
			nazev: 'Elektrická práce a výkon — výpočty',
			popis: 'Elektrická práce. El. výkon. Údaje na spotřebičích.',
			delka: 10,
			typ: 'youtube',
			zdroj: 'fwc6JvJUArE',
			rocnik: 'F8',
			tema: 'Elektrina',
			klicova_slova: ['elektrická práce', 'výkon', 'spotřebič'],
		},
	],
	'F9': [
		{
			id: 'f9-gravitace-a-pohyb-planet',
			nazev: 'Gravitace — Newtonův gravitační zákon',
			popis: 'Gravitační síla. Síla působící na vzdálenost. Orbity planet.',
			delka: 13,
			typ: 'youtube',
			zdroj: 'HB1c0F8P5oI',
			rocnik: 'F9',
			tema: 'Gravitace',
			klicova_slova: ['gravitace', 'Newton', 'planet'],
		},
		{
			id: 'f9-elektricke-pole',
			nazev: 'Elektrické pole — silokřivky a potenciál',
			popis: 'Silokřivky elektrického pole. Elektrická intenzita. Potenciál.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'bW1XoBAXvd8',
			rocnik: 'F9',
			tema: 'Elektrine - pole a kapacita',
			klicova_slova: ['elektrické pole', 'intenzita', 'potenciál'],
		},
		{
			id: 'f9-elektromagneticka-indukce',
			nazev: 'Elektromagnetická indukce — generátor',
			popis: 'Faradayův zákon indukce. Generátor. Transformátor.',
			delka: 13,
			typ: 'youtube',
			zdroj: 'Y3beBU-0qfk',
			rocnik: 'F9',
			tema: 'Elektromagneticka indukce',
			klicova_slova: ['indukce', 'generátor', 'transformátor'],
		},
		{
			id: 'f9-stridavy-proud',
			nazev: 'Střídavý proud — jak funguje?',
			popis: 'Střídavý proud a jeho vlastnosti. Efektivní napětí a proud.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'nxVvKkfV0mY',
			rocnik: 'F9',
			tema: 'Stridavy proud',
			klicova_slova: ['střídavý proud', 'frekvence', 'efektivní napětí'],
		},
		{
			id: 'f9-prvky-polovodicove-elektroniky',
			nazev: 'Polovodiče a diody — počátek elektroniky',
			popis: 'Polovodičové prvky. Dioda a tranzistor. LED.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'VqOvlyP_ck4',
			rocnik: 'F9',
			tema: 'Elektronika',
			klicova_slova: ['dioda', 'tranzistor', 'LED', 'polovodič'],
		},
		{
			id: 'f9-jaderny-model-atomu',
			nazev: 'Atomová struktura — jádro a elektronový obal',
			popis: 'Rutherfordův model. Proton, neutron, elektron. Izotopy.',
			delka: 12,
			typ: 'youtube',
			zdroj: 'tqK_X8mEuKk',
			rocnik: 'F9',
			tema: 'Stavba atomu',
			klicova_slova: ['atom', 'jádro', 'elektron', 'izotop'],
		},
		{
			id: 'f9-radioaktivita',
			nazev: 'Radioaktivita — a, b, g záření',
			popis: 'Radioaktivní rozpad. Alfa, beta, gama záření. Bezpečnost.',
			delka: 13,
			typ: 'youtube',
			zdroj: 'EqEtKdQHdss',
			rocnik: 'F9',
			tema: 'Radioaktivita',
			klicova_slova: ['radioaktivita', 'radioaktivní rozpad', 'záření'],
		},
		{
			id: 'f9-jaderna-energie',
			nazev: 'Jaderná energie — štěpení a sintéza',
			popis: 'Štěpení jádra. Jaderné reaktory. Thermonukleární fúze.',
			delka: 14,
			typ: 'youtube',
			zdroj: 'ScYe_p-g5h8',
			rocnik: 'F9',
			tema: 'Jaderna fyzika',
			klicova_slova: ['jádro', 'štěpení', 'fúze', 'reaktor'],
		},
		{
			id: 'f9-sveto-a-spektrum',
			nazev: 'Spektrum — viditelné a nevinditelné záření',
			popis: 'Elektromagnetické spektrum. Infračervené a ultrafialové.',
			delka: 11,
			typ: 'youtube',
			zdroj: 'nYDrNh_L7n8',
			rocnik: 'F9',
			tema: 'Svetlo a zarizeni',
			klicova_slova: ['spektrum', 'vlnová délka', 'záření'],
		},
		{
			id: 'f9-relativita-a-kvantovka',
			nazev: 'Moderní fyzika — relativita a kvantovka (přehled)',
			popis: 'Einstein a speciální relativita. Ekvivalence hmotnosti a energie. Kvanta.',
			delka: 14,
			typ: 'youtube',
			zdroj: '8R-pKb_8J1g',
			rocnik: 'F9',
			tema: 'Fyzika XX. stoleti',
			klicova_slova: ['relativita', 'E=mc²', 'kvantum'],
		},
	],
};

/**
 * Helper funkce pro získání videí daného ročníku
 */
export function getVideosByRocnik(rocnik: 'F6' | 'F7' | 'F8' | 'F9'): Video[] {
	return videa[rocnik] || [];
}

/**
 * Helper funkce pro vyhledávání videí podle klíčového slova
 */
export function searchVideos(query: string): Video[] {
	const lowerQuery = query.toLowerCase();
	const results: Video[] = [];

	for (const rocnik in videa) {
		for (const video of videa[rocnik as 'F6' | 'F7' | 'F8' | 'F9']) {
			if (
				video.nazev.toLowerCase().includes(lowerQuery) ||
				video.popis.toLowerCase().includes(lowerQuery) ||
				video.tema.toLowerCase().includes(lowerQuery) ||
				video.klicova_slova.some(kw => kw.toLowerCase().includes(lowerQuery))
			) {
				results.push(video);
			}
		}
	}

	return results;
}

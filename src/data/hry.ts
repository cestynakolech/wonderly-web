import { kvizy, type Otazka } from './kvizy';
import { temata } from './temata';

/**
 * Deterministický generátor náhody (mulberry32) — výběr otázek je při každém
 * buildu stejný, takže QR kartičky a stanoviště se nemění pod rukama.
 */
function rng(seed: number) {
	return function () {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Vybere otázky rovnoměrně napříč ročníky fyziky (bez složených shrnutí). */
export function otazkyNapricRocniky(pocet: number, seed = 2026): Otazka[] {
	const nahoda = rng(seed);
	const poRocniku: Record<string, Otazka[]> = {};
	for (const [klic, otazky] of Object.entries(kvizy)) {
		if (!klic.startsWith('fyzika/')) continue;
		if (klic.includes('/shrnuti/')) continue; // složeniny — vyhneme se duplicitám
		const rocnik = klic.split('/')[1];
		(poRocniku[rocnik] ??= []).push(...otazky);
	}
	const rocniky = Object.keys(poRocniku).sort();
	const vybrane: Otazka[] = [];
	const naRocnik = Math.ceil(pocet / rocniky.length);
	for (const r of rocniky) {
		const zdroj = [...poRocniku[r]];
		for (let i = 0; i < naRocnik && zdroj.length; i++) {
			vybrane.push(zdroj.splice(Math.floor(nahoda() * zdroj.length), 1)[0]);
		}
	}
	for (let i = vybrane.length - 1; i > 0; i--) {
		const j = Math.floor(nahoda() * (i + 1));
		[vybrane[i], vybrane[j]] = [vybrane[j], vybrane[i]];
	}
	return vybrane.slice(0, pocet);
}

/** Jedna položka úplné banky ligy: otázky jednoho celku daného ročníku. */
export type CelekBanky = { predmet: string; rocnik: string; celek: string; nazev: string; otazky: Otazka[] };

/**
 * Úplná banka pro ligu: VŠECHNY otázky fyziky 6–9 seskupené po celcích (bez
 * složených shrnutí). Učitel si na tabuli vybere ročník a celek — soutěž tak
 * jde postavit jen z probrané látky.
 * Informatika se sem záměrně nedává — není hotová, žáci by ji viděli bez
 * hesla (stránka /hry/liga není za zámkem).
 */
export function bankaProLigu(): CelekBanky[] {
	const vysledek: CelekBanky[] = [];
	for (const predmet of ['fyzika']) {
		for (const rocnik of ['6', '7', '8', '9']) {
			for (const celek of temata[`${predmet}/${rocnik}-rocnik`] ?? []) {
				if (celek.slug === 'shrnuti') continue; // složeniny — duplikáty podtémat
				const otazky: Otazka[] = [];
				for (const [klic, ot] of Object.entries(kvizy)) {
					if (klic.startsWith(`${predmet}/${rocnik}-rocnik/${celek.slug}/`)) otazky.push(...ot);
				}
				if (otazky.length) {
					vysledek.push({ predmet, rocnik, celek: celek.slug, nazev: celek.nazev, otazky });
				}
			}
		}
	}
	return vysledek;
}

/** Úniková laborka: stanoviště (fyzikové) a číslice tajného kódu. */
export const STANICE = [
	{ slug: 'newton', nazev: 'NEWTON', ikona: '🍎', cislice: '4' },
	{ slug: 'pascal', nazev: 'PASCAL', ikona: '💨', cislice: '9' },
	{ slug: 'ohm', nazev: 'OHM', ikona: '⚡', cislice: '1' },
	{ slug: 'amper', nazev: 'AMPÉR', ikona: '🧲', cislice: '7' },
	{ slug: 'volta', nazev: 'VOLTA', ikona: '🔋', cislice: '3' },
	{ slug: 'einstein', nazev: 'EINSTEIN', ikona: '🌌', cislice: '8' },
];

export const TAJNY_KOD = STANICE.map((s) => s.cislice).join('');

/** Otázky pro stanoviště — 3 na každé, bez opakování mezi stanovišti. */
export function otazkyProStanice(): Otazka[][] {
	const vse = otazkyNapricRocniky(STANICE.length * 3, 777);
	return STANICE.map((_, i) => vse.slice(i * 3, i * 3 + 3));
}

/** Klikací laboratoř: předměty na obrázku + k jakým tématům patří. */
export const PREDMETY_LABORATORE = [
	{ slug: 'hodiny', nazev: 'Nástěnné hodiny', ikona: '🕐', x: 17, y: 24,
		temata: ['cas', 'pohyb-a-rychlost', 'mechanicka-prace-a-vykon', 'indukce-a-stridavy-proud'] },
	{ slug: 'teplomer', nazev: 'Teploměr', ikona: '🌡️', x: 43, y: 25,
		temata: ['teplota', 'teplo-a-zmeny-skupenstvi', 'tepelne-motory', 'energie'] },
	{ slug: 'lupa', nazev: 'Lupa', ikona: '🔍', x: 62, y: 27,
		temata: ['svetlo-a-jeho-sireni', 'zrcadla-a-cocky', 'energie-a-vesmir'] },
	{ slug: 'kyvadlo', nazev: 'Kyvadlo na stojanu', ikona: '⚙️', x: 79, y: 33,
		temata: ['sila', 'sily-kolem-nas', 'pohyb-a-rychlost', 'energie', 'mechanicka-prace-a-vykon'] },
	{ slug: 'vahy', nazev: 'Rovnoramenné váhy', ikona: '⚖️', x: 12, y: 66,
		temata: ['fyzikalni-veliciny', 'latka-a-teleso', 'jednoduche-stroje', 'mechanicka-prace-a-vykon'] },
	{ slug: 'merak', nazev: 'Měřicí přístroj', ikona: '📟', x: 36, y: 68,
		temata: ['elektrina-a-magnetismus', 'elektrina', 'elektricky-proud-v-latkach', 'elektricka-energie-a-bezpecnost'] },
	{ slug: 'kadinka', nazev: 'Kádinka s vodou', ikona: '🧪', x: 60, y: 71,
		temata: ['latka-a-teleso', 'tlak-v-kapalinach', 'vztlakova-sila-a-plovani-teles', 'atmosfera-a-tlak-vzduchu', 'teplo-a-zmeny-skupenstvi'] },
	{ slug: 'magnet', nazev: 'Magnet', ikona: '🧲', x: 80, y: 71,
		temata: ['elektrina-a-magnetismus', 'sila', 'magneticke-pole', 'zvuk'] },
];

export const ROCNIKY_LABORATORE = ['6', '7', '8', '9'];

/** Pro každý ročník a předmět vybere 3 otázky z odpovídajících témat (jinak z celého ročníku). */
export function otazkyProLaborator(): Record<string, Record<string, Otazka[]>> {
	const vysledek: Record<string, Record<string, Otazka[]>> = {};
	for (const rocnik of ROCNIKY_LABORATORE) {
		vysledek[rocnik] = {};
		const vseRocniku: Otazka[] = [];
		const poTematu: Record<string, Otazka[]> = {};
		for (const [klic, otazky] of Object.entries(kvizy)) {
			const [predmet, r, tema] = klic.split('/');
			if (predmet !== 'fyzika' || r !== `${rocnik}-rocnik` || tema === 'shrnuti') continue;
			(poTematu[tema] ??= []).push(...otazky);
			vseRocniku.push(...otazky);
		}
		PREDMETY_LABORATORE.forEach((predmet, i) => {
			const nahoda = rng(3000 + +rocnik * 100 + i);
			const tematicke = predmet.temata.flatMap((t) => poTematu[t] ?? []);
			const zdroj = [...(tematicke.length >= 3 ? tematicke : vseRocniku)];
			const tri: Otazka[] = [];
			for (let k = 0; k < 3 && zdroj.length; k++) {
				tri.push(zdroj.splice(Math.floor(nahoda() * zdroj.length), 1)[0]);
			}
			vysledek[rocnik][predmet.slug] = tri;
		});
	}
	return vysledek;
}

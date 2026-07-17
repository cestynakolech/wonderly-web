import { kvizy, type Otazka } from './kvizy';

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

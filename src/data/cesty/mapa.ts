export const MAPA_SIRKA = 680;
export const MAPA_VYSKA = 520;

export interface BodMapy {
	x: number;
	y: number;
	nazev: string;
	slug?: string;
	popisekPosun?: { dx: number; dy: number; kotva?: string };
}

export interface Popisek {
	x: number;
	y: number;
	kotva: string;
	text: string;
	shluk: boolean;
	slug?: string;
	/** velikost písma — dlouhá jména v těsných místech dostanou menší */
	fs: number;
}

/**
 * Rozmístí popisky měst tak, aby se nepřekrývaly (přání učitele 27. 7. 2026 —
 * s přibývajícími místy se mapa zahustí a jména na sebe lezou).
 *
 * Postup: každé jméno zkusí několik pozic kolem svého pinu a vezme první volnou.
 * Co se nikam nevejde, se sloučí podle ČTVERCOVÉ mřížky (velikost ≈ šířka jednoho
 * jména; s hranicemi států nemá nic společného) do souhrnu „N míst".
 * Piny zůstávají na mapě všechny — slučují se jen jména.
 * Ruční `popisekPosun` má vždy přednost a překryv se u něj neřeší.
 */
export function rozmistiPopisky(
	body: BodMapy[],
	pinR: number,
	pismo: number,
	vyrez: { x: number; y: number; sirka: number; vyska: number },
): Popisek[] {
	const obsazene: [number, number, number, number][] = [];
	const hotove: Popisek[] = [];

	const prekryv = (a: [number, number, number, number]) =>
		obsazene.some((o) => !(a[2] < o[0] || o[2] < a[0] || a[3] < o[1] || o[3] < a[1]));
	const mimoVyrez = (a: [number, number, number, number]) =>
		a[0] < vyrez.x || a[2] > vyrez.x + vyrez.sirka || a[1] < vyrez.y || a[3] > vyrez.y + vyrez.vyska;

	/** Obdélník textu podle kotvy (odhad šířky písmene = 0,55 × velikost písma). */
	const ramecek = (x: number, y: number, text: string, kotva: string, fs = pismo) => {
		const s = text.length * fs * 0.55;
		const zacatek = kotva === 'middle' ? x - s / 2 : kotva === 'end' ? x - s : x;
		return [zacatek, y - fs, zacatek + s, y + fs * 0.3] as [number, number, number, number];
	};

	const zkus = (bod: BodMapy, text: string, shluk: boolean, fs = pismo): boolean => {
		const kandidati: [number, number, string][] = [
			[bod.x, bod.y - pinR * 2, 'middle'],
			[bod.x, bod.y + pinR * 2 + pismo * 0.8, 'middle'],
			[bod.x + pinR * 1.6, bod.y + pismo * 0.35, 'start'],
			[bod.x - pinR * 1.6, bod.y + pismo * 0.35, 'end'],
			[bod.x, bod.y - pinR * 2 - pismo * 1.2, 'middle'],
			[bod.x, bod.y + pinR * 2 + pismo * 2, 'middle'],
			[bod.x + pinR * 1.6, bod.y - pinR * 1.6, 'start'],
			[bod.x - pinR * 1.6, bod.y + pinR * 2.2, 'end'],
		];
		for (const [x, y, kotva] of kandidati) {
			const r = ramecek(x, y, text, kotva, fs);
			if (mimoVyrez(r) || prekryv(r)) continue;
			obsazene.push(r);
			hotove.push({ x, y, kotva, text, shluk, slug: shluk ? undefined : bod.slug, fs });
			return true;
		}
		return false;
	};

	// 1) ruční posuny mají přednost — učitel je nastavil schválně
	const zbytek: BodMapy[] = [];
	for (const b of body) {
		if (b.popisekPosun) {
			const kotva = b.popisekPosun.kotva ?? 'middle';
			const x = b.x + b.popisekPosun.dx;
			const y = b.y + b.popisekPosun.dy;
			obsazene.push(ramecek(x, y, b.nazev, kotva));
			hotove.push({ x, y, kotva, text: b.nazev, shluk: false, slug: b.slug, fs: pismo });
		} else {
			zbytek.push(b);
		}
	}

	// 2) ostatní jména — nejdřív běžnou velikostí, pak (dlouhé názvy v těsných místech)
	//    ještě jednou menším písmem; teprve když ani to nejde, půjde bod do shluku
	const bezJmena: BodMapy[] = [];
	const naDruhyPokus: BodMapy[] = [];
	for (const b of zbytek) {
		if (!zkus(b, b.nazev, false)) naDruhyPokus.push(b);
	}
	for (const b of naDruhyPokus) {
		if (!zkus(b, b.nazev, false, pismo * 0.75)) bezJmena.push(b);
	}

	// 3) shluky ve čtvercích
	if (bezJmena.length) {
		const strana = pismo * 6;
		const ctverce = new Map<string, BodMapy[]>();
		for (const b of bezJmena) {
			const klic = `${Math.floor((b.x - vyrez.x) / strana)},${Math.floor((b.y - vyrez.y) / strana)}`;
			(ctverce.get(klic) ?? ctverce.set(klic, []).get(klic)!).push(b);
		}
		for (const skupina of [...ctverce.values()].sort((a, b) => b.length - a.length)) {
			const stred = {
				x: skupina.reduce((s, b) => s + b.x, 0) / skupina.length,
				y: skupina.reduce((s, b) => s + b.y, 0) / skupina.length,
				nazev: '',
			};
			if (skupina.length === 1) {
				if (zkus(skupina[0], skupina[0].nazev, false)) continue;
			}
			const pocet = skupina.length;
			const slovo = pocet === 1 ? 'místo' : pocet < 5 ? 'místa' : 'míst';
			zkus(stred, `${pocet} ${slovo}`, true);
		}
	}

	return hotove;
}

/** Výřez mapy: obálka daných bodů + okraj, poměr 4:3 (funguje pro libovolné země). */
export function spocitejVyrez(body: { x: number; y: number }[]) {
	const okraj = 30;
	const xs = body.map((b) => b.x);
	const ys = body.map((b) => b.y);
	const minX = Math.min(...xs) - okraj;
	const maxX = Math.max(...xs) + okraj;
	const minY = Math.min(...ys) - okraj;
	const maxY = Math.max(...ys) + okraj;
	const pomer = 4 / 3;
	let sirka = maxX - minX;
	let vyska = maxY - minY;
	if (sirka / vyska > pomer) {
		vyska = sirka / pomer;
	} else {
		sirka = vyska * pomer;
	}
	const stredX = (minX + maxX) / 2;
	const stredY = (minY + maxY) / 2;
	let x = stredX - sirka / 2;
	let y = stredY - vyska / 2;
	x = Math.max(0, Math.min(x, MAPA_SIRKA - sirka));
	y = Math.max(0, Math.min(y, MAPA_VYSKA - vyska));
	return { x, y, sirka, vyska };
}

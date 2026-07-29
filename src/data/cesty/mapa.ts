export const MAPA_SIRKA = 680;
export const MAPA_VYSKA = 520;

/** Nejvíc položek (míst nebo shluků) v jednom pohledu mapy — přání učitele 28. 7. 2026. */
export const MAX_POLOZEK = 3;

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
	tvaryMist: readonly string[] = ['místo', 'místa', 'míst'],
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
			const slovo = pocet === 1 ? tvaryMist[0] : pocet < 5 ? tvaryMist[1] : tvaryMist[2];
			zkus(stred, `${pocet} ${slovo}`, true);
		}
	}

	return hotove;
}

/** Výřez mapy: obálka daných bodů + okraj, poměr 4:3 (funguje pro libovolné země). */
export function spocitejVyrez(body: { x: number; y: number }[], okraj = 30) {
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

/* ------------------------------------------------------------------------- *
 *  ROZBALOVACÍ MAPA (přání učitele 28. 7. 2026)
 *
 *  Dřív se jména míst, která na sebe lezla, slévala do čtverců „N míst" a pod
 *  mapou byl vždycky seznam VŠECH míst — bylo to nepřehledné a kliknutí nikam
 *  nevedlo. Nově se mapa dělí na úrovně:
 *
 *   • 1. úroveň = celá cesta: všechny piny, ale blízká místa obepne kroužek
 *     (shluk) a napíše se u něj JEDNO jméno — největšího místa; jsou-li stejně
 *     velká (nebo se počet obyvatel neuvede), vezme se první navštívené.
 *   • kliknutí na shluk = přiblížení: v pohledu jsou NEJVÝŠ TŘI položky
 *     a pod mapou jen místa toho shluku.
 *   • kdyby položek vyšlo víc, shluk se rozdělí na další úroveň — a tak dál,
 *     do libovolné hloubky.
 *
 *  Všechny pohledy se spočítají při sestavení webu; prohlížeč mezi nimi jen
 *  přepíná, takže mapa funguje rychle a bez načítání.
 * ------------------------------------------------------------------------- */

/** Nejmenší dovolený výřez — kdyby se mapa přiblížila víc, je z podkladu jen prázdná plocha. */
const MIN_VYREZ = 26;

export interface MistoNaMape {
	slug: string;
	nazev: string;
	x: number;
	y: number;
	obyvatele?: number;
}

export interface PolozkaMapy {
	/** 'misto' = konkrétní zastávka, 'skupina' = víc míst pohromadě (dá se rozkliknout) */
	typ: 'misto' | 'skupina';
	/** id pohledu (u skupiny) nebo slug místa */
	id: string;
	nazev: string;
	/** kreslená poloha (kvůli přehlednosti může být kousek posunutá) */
	x: number;
	y: number;
	/** skutečná poloha — když se liší, dokreslí se k ní spojnice */
	px: number;
	py: number;
	/** poloměr kroužku položky */
	r: number;
	pocet: number;
}

export interface PopisekPolozky {
	x: number;
	y: number;
	kotva: string;
	text: string;
	fs: number;
	/** id položky, na kterou popisek ukazuje (klikací) */
	cil: string;
}

export interface PohledMapy {
	id: string;
	/** id nadřazeného pohledu (null u celkové mapy) */
	rodic: string | null;
	nazev: string;
	vyrez: { x: number; y: number; sirka: number; vyska: number };
	pinR: number;
	pismo: number;
	/** všechna místa pohledu (drobné body v pozadí); poradi = pořadí návštěvy na cestě */
	body: { x: number; y: number; slug: string; poradi: number }[];
	polozky: PolozkaMapy[];
	popisky: PopisekPolozky[];
	/** slugy míst, která se mají ukázat pod mapou */
	slugy: string[];
	/** drobečková navigace od celkové mapy k tomuto pohledu */
	cesta: { id: string; nazev: string }[];
}

/** Největší místo skupiny; při shodě (i když se počet obyvatel neuvádí) první navštívené. */
function reprezentant<T extends MistoNaMape>(mista: T[]): T {
	return mista.reduce((nej, m) => ((m.obyvatele ?? 0) > (nej.obyvatele ?? 0) ? m : nej), mista[0]);
}

function stred(mista: { x: number; y: number }[]) {
	return {
		x: mista.reduce((s, m) => s + m.x, 0) / mista.length,
		y: mista.reduce((s, m) => s + m.y, 0) / mista.length,
	};
}

/**
 * Sloučí místa do nejvýš `max` skupin: opakovaně spojí dvě nejbližší, dokud jich
 * je moc. Blízká místa tak skončí pohromadě a vzdálená zůstanou samostatná.
 */
function seskup<T extends MistoNaMape>(mista: T[], max: number): T[][] {
	let skupiny = mista.map((m) => [m]);
	while (skupiny.length > max) {
		let nejA = 0;
		let nejB = 1;
		let nejBliz = Infinity;
		for (let i = 0; i < skupiny.length; i++) {
			for (let j = i + 1; j < skupiny.length; j++) {
				const a = stred(skupiny[i]);
				const b = stred(skupiny[j]);
				const d = Math.hypot(a.x - b.x, a.y - b.y);
				if (d < nejBliz) {
					nejBliz = d;
					nejA = i;
					nejB = j;
				}
			}
		}
		skupiny[nejA] = skupiny[nejA].concat(skupiny[nejB]);
		skupiny.splice(nejB, 1);
	}
	return skupiny;
}

/** Rozestoupí kroužky, které by se překrývaly — jinak by v detailu splynuly v jednu skvrnu. */
function rozestup(polozky: PolozkaMapy[], odstup: number) {
	for (let krok = 0; krok < 60; krok++) {
		let hnulo = false;
		for (let i = 0; i < polozky.length; i++) {
			for (let j = i + 1; j < polozky.length; j++) {
				const a = polozky[i];
				const b = polozky[j];
				const minD = a.r + b.r + odstup;
				let dx = b.x - a.x;
				let dy = b.y - a.y;
				let d = Math.hypot(dx, dy);
				if (d >= minD) continue;
				if (d < 1e-6) {
					// dvě místa přesně na sobě — rozhoď je do stran
					dx = Math.cos(i * 2.4) || 1;
					dy = Math.sin(i * 2.4);
					d = 1;
				}
				const posun = (minD - d) / 2;
				a.x -= (dx / d) * posun;
				a.y -= (dy / d) * posun;
				b.x += (dx / d) * posun;
				b.y += (dy / d) * posun;
				hnulo = true;
			}
		}
		if (!hnulo) break;
	}
}

/** Popisky položek — nejvýš tři, takže se hledá volné místo kolem kroužku. */
function rozmistiPopiskyPolozek(
	polozky: PolozkaMapy[],
	pismo: number,
	vyrez: { x: number; y: number; sirka: number; vyska: number },
): PopisekPolozky[] {
	// kroužky položek jsou obsazené — jméno na ně nesmí padnout
	const obsazene: [number, number, number, number][] = polozky.map((p) => [p.x - p.r, p.y - p.r, p.x + p.r, p.y + p.r]);
	const hotove: PopisekPolozky[] = [];
	const ramecek = (x: number, y: number, text: string, kotva: string, fs: number) => {
		const s = text.length * fs * 0.55;
		const zacatek = kotva === 'middle' ? x - s / 2 : kotva === 'end' ? x - s : x;
		return [zacatek, y - fs, zacatek + s, y + fs * 0.3] as [number, number, number, number];
	};
	const volno = (r: [number, number, number, number]) =>
		!obsazene.some((o) => !(r[2] < o[0] || o[2] < r[0] || r[3] < o[1] || o[3] < r[1])) &&
		r[0] >= vyrez.x &&
		r[2] <= vyrez.x + vyrez.sirka &&
		r[1] >= vyrez.y &&
		r[3] <= vyrez.y + vyrez.vyska;

	for (const p of polozky) {
		const kandidati: [number, number, string][] = [
			[p.x, p.y - p.r - pismo * 0.45, 'middle'],
			[p.x, p.y + p.r + pismo * 1.15, 'middle'],
			[p.x + p.r + pismo * 0.35, p.y + pismo * 0.35, 'start'],
			[p.x - p.r - pismo * 0.35, p.y + pismo * 0.35, 'end'],
			[p.x, p.y - p.r - pismo * 1.7, 'middle'],
			[p.x, p.y + p.r + pismo * 2.4, 'middle'],
		];
		let umisteno = false;
		for (const fs of [pismo, pismo * 0.8]) {
			for (const [x, y, kotva] of kandidati) {
				const r = ramecek(x, y, p.nazev, kotva, fs);
				if (!volno(r)) continue;
				obsazene.push(r);
				hotove.push({ x, y, kotva, text: p.nazev, fs, cil: p.id });
				umisteno = true;
				break;
			}
			if (umisteno) break;
		}
		// jméno se nikdy nezahazuje — když se nic nevejde, dá se nad kroužek
		if (!umisteno) {
			const [x, y, kotva] = kandidati[0];
			obsazene.push(ramecek(x, y, p.nazev, kotva, pismo * 0.8));
			hotove.push({ x, y, kotva, text: p.nazev, fs: pismo * 0.8, cil: p.id });
		}
	}
	return hotove;
}

/**
 * Spočítá všechny pohledy mapy — celkovou i všechny přiblížené.
 * `vyrezRoku` je volitelný ruční výřez celkové mapy (z dat roku).
 */
export function pripravPohledy<T extends MistoNaMape>(
	mista: T[],
	vyrezRoku?: { x: number; y: number; sirka: number; vyska: number },
): PohledMapy[] {
	const pohledy: PohledMapy[] = [];
	if (!mista.length) return pohledy;
	const poradiNavstevy = new Map(mista.map((m, i) => [m.slug, i]));

	const postav = (
		skupina: T[],
		id: string,
		rodic: string | null,
		nazev: string,
		cesta: { id: string; nazev: string }[],
		hloubka: number,
	) => {
		const jeKoren = rodic === null;
		let vyrez = jeKoren && vyrezRoku ? vyrezRoku : spocitejVyrez(skupina, Math.max(MIN_VYREZ / 2, 6));
		if (!jeKoren && vyrez.sirka < MIN_VYREZ) {
			vyrez = spocitejVyrez(skupina, MIN_VYREZ / 2);
		}
		const pinR = vyrez.sirka / 45;
		const pismo = vyrez.sirka / 30;

		// potomci: jednotlivá místa, nebo (když je jich moc) shluky po nejvýš třech
		const casti: T[][] = skupina.length <= MAX_POLOZEK ? skupina.map((m) => [m]) : seskup(skupina, MAX_POLOZEK);

		const polozky: PolozkaMapy[] = casti.map((cast) => {
			const hlavni = reprezentant(cast);
			if (cast.length === 1) {
				return {
					typ: 'misto' as const,
					id: hlavni.slug,
					nazev: hlavni.nazev,
					x: hlavni.x,
					y: hlavni.y,
					px: hlavni.x,
					py: hlavni.y,
					r: pinR,
					pocet: 1,
				};
			}
			const s = stred(cast);
			const dosah = Math.max(...cast.map((m) => Math.hypot(m.x - s.x, m.y - s.y)));
			return {
				typ: 'skupina' as const,
				id: `s${hloubka + 1}-${hlavni.slug}`,
				nazev: hlavni.nazev,
				x: s.x,
				y: s.y,
				px: s.x,
				py: s.y,
				r: Math.max(dosah + pinR * 1.5, pinR * 2.1),
				pocet: cast.length,
			};
		});

		rozestup(polozky, pinR * 1.8);

		pohledy.push({
			id,
			rodic,
			nazev,
			vyrez,
			pinR,
			pismo,
			body: skupina
				.map((m) => ({ x: m.x, y: m.y, slug: m.slug, poradi: poradiNavstevy.get(m.slug) ?? 0 }))
				.sort((a, b) => a.poradi - b.poradi),
			polozky,
			popisky: rozmistiPopiskyPolozek(polozky, pismo, vyrez),
			slugy: skupina.map((m) => m.slug),
			cesta,
		});

		casti.forEach((cast, i) => {
			// Když se pod mapou rovnou vypisují místa (nejvýš tři), hlouběji se nechodí.
			// Jinak dostane vlastní pohled i samostatné místo, aby se dalo rozkliknout.
			if (skupina.length <= MAX_POLOZEK) return;
			const polozka = polozky[i];
			postav(cast, polozka.id, id, polozka.nazev, [...cesta, { id: polozka.id, nazev: polozka.nazev }], hloubka + 1);
		});
	};

	postav(mista, 'vse', null, 'celá cesta', [], 0);
	return pohledy;
}

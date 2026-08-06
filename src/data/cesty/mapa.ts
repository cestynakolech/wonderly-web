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
 * Ruční `popisekPosun` má přednost, ale jen pokud nevyteče z mapy a nekoliduje (6. 8. 2026).
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

	// 1) ruční posuny mají přednost — učitel je nastavil schválně.
	//
	// Posun se ale vztahuje ke KONKRÉTNÍ mapě, pro kterou ho učitel doladil (mapa roku).
	// Na společné mapě „všechna místa" je jiný výřez i jiné písmo, takže tam týž posun
	// může popisek vystrčit ZA OKRAJ — a tam se uřízne. Do 2. 8. 2026 se to nikomu
	// neukázalo, protože společná mapa se vůbec neměřila; nové měřidlo hned našlo
	// „Vaulnaveys-le-Haut" přetékající ve všech čtyřech jazycích.
	//
	// Řešení zachovává učitelův záměr tam, kde funguje: posun se použije, jen když se
	// popisek do výřezu opravdu vejde. Jinak se s bodem zachází jako s ostatními
	// a jméno mu najde automatické rozmisťování.
	const zbytek: BodMapy[] = [];
	for (const b of body) {
		if (b.popisekPosun) {
			const kotva = b.popisekPosun.kotva ?? 'middle';
			const x = b.x + b.popisekPosun.dx;
			const y = b.y + b.popisekPosun.dy;
			const r = ramecek(x, y, b.nazev, kotva);
			// Posun platí, jen když jméno nevyteče z mapy A nespadne na jiné jméno.
			// Druhá podmínka doplněna 6. 8. 2026: rok 2025 rozšířil výřez celkové
			// mapy a ručně posunuté Vaulnaveys-le-Haut a Col d'Ornon se střetly —
			// ruční posuny se do té doby proti sobě vůbec nekontrolovaly.
			if (mimoVyrez(r) || prekryv(r)) {
				zbytek.push(b);
				continue;
			}
			obsazene.push(r);
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
	/** země místa — v rozcestníku se z ní skládají vlaječky */
	zeme?: string;
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
	/** země položky (u skupiny všechny, oddělené čárkou) — na vlaječky v rozcestníku */
	zeme?: string;
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
	/** popisek domova — jen u celkové mapy a jen když má rok domov (umísťuje se s ostatními) */
	domovPopisek?: PopisekPolozky;
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

/**
 * Popisky položek — nejvýš tři, takže se hledá volné místo kolem kroužku.
 *
 * Kromě kroužků blokují místo i dvě věci, na které se do 31. 7. 2026 zapomínalo
 * (měřidlo `testy/mapa-popisky.mjs` je odhalilo jako 9 skutečných překryvů):
 * odznak s počtem u shluku (visí ven z kroužku) a domeček „domov", jehož popisek
 * si navíc CestyRok.astro kreslil úplně mimo tenhle rozmisťovač — proto ležel
 * na cizím kroužku v sedmi letech z osmi. Domov se tedy umísťuje TADY a stejně.
 */
function rozmistiPopiskyPolozek(
	polozky: PolozkaMapy[],
	pismo: number,
	vyrez: { x: number; y: number; sirka: number; vyska: number },
	pinR: number,
	body: { x: number; y: number }[],
	domov?: { x: number; y: number; nazev: string },
): { popisky: PopisekPolozky[]; domovPopisek?: PopisekPolozky } {
	// Co na mapě zabírá místo. POZOR: u shluku NENÍ obsazený celý kroužek — je to
	// obrys a uvnitř jsou vidět tečky jednotlivých míst. Obsazené jsou tedy tečky
	// (`body`), ne kotouč; jinak by se u velkých shluků nevešlo jméno nikam a
	// skončilo by daleko od své značky.
	const obsazene: [number, number, number, number][] = body.map((b) => [
		b.x - pinR,
		b.y - pinR,
		b.x + pinR,
		b.y + pinR,
	]);
	for (const p of polozky) {
		if (p.typ === 'misto') obsazene.push([p.x - p.r, p.y - p.r, p.x + p.r, p.y + p.r]);
	}
	// odznak s počtem u shluku (kreslí se na okraj kroužku, kus přečnívá ven)
	for (const p of polozky) {
		if (p.typ !== 'skupina') continue;
		const ox = p.x + p.r * 0.72;
		const oy = p.y - p.r * 0.72;
		const orr = pinR * 0.95;
		obsazene.push([ox - orr, oy - orr, ox + orr, oy + orr]);
	}
	// domeček (střecha + zeď) — rozměry podle CestyRok.astro
	if (domov) {
		obsazene.push([domov.x - pinR * 1.4, domov.y - pinR * 1.5, domov.x + pinR * 1.4, domov.y + pinR * 1.2]);
	}
	const hotove: PopisekPolozky[] = [];
	const ramecek = (x: number, y: number, text: string, kotva: string, fs: number) => {
		const s = text.length * fs * 0.55;
		const zacatek = kotva === 'middle' ? x - s / 2 : kotva === 'end' ? x - s : x;
		return [zacatek, y - fs, zacatek + s, y + fs * 0.3] as [number, number, number, number];
	};
	const prunik = (a: [number, number, number, number], b: [number, number, number, number]) => {
		const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]);
		const h = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
		return w > 0 && h > 0 ? w * h : 0;
	};
	/**
	 * Kolik na tomhle místě vadí: překrytá plocha + plocha mimo výřez.
	 * Mimo výřez váží víc — co přeteče okraj mapy, se úplně ořízne, kdežto
	 * překryv je jen ošklivý.
	 */
	const trest = (r: [number, number, number, number]) => {
		let t = 0;
		for (const o of obsazene) t += prunik(r, o);
		const vyrezR: [number, number, number, number] = [vyrez.x, vyrez.y, vyrez.x + vyrez.sirka, vyrez.y + vyrez.vyska];
		const cela = (r[2] - r[0]) * (r[3] - r[1]);
		t += (cela - prunik(r, vyrezR)) * 12;
		return t;
	};

	/** Umístí jedno jméno: první úplně volné místo, jinak to nejméně špatné. */
	const umisti = (
		nazev: string,
		cil: string,
		kandidati: [number, number, string][],
	): PopisekPolozky => {
		let nej: { x: number; y: number; kotva: string; fs: number; t: number } | null = null;
		// dlouhá jména v těsných pohledech (např. „Leer (Ostfriesland)") se ještě zmenší
		for (const fs of [pismo, pismo * 0.8, pismo * 0.65]) {
			for (const [x, y, kotva] of kandidati) {
				const t = trest(ramecek(x, y, nazev, kotva, fs));
				if (t === 0) {
					obsazene.push(ramecek(x, y, nazev, kotva, fs));
					return { x, y, kotva, text: nazev, fs, cil };
				}
				if (!nej || t < nej.t) nej = { x, y, kotva, fs, t };
			}
		}
		// jméno se nikdy nezahazuje — když se nic nevejde, vezme se nejmenší zlo
		// (dřív tu byl naslepo první kandidát, což popisek posadilo na cizí kroužek)
		const v = nej!;
		obsazene.push(ramecek(v.x, v.y, nazev, v.kotva, v.fs));
		return { x: v.x, y: v.y, kotva: v.kotva, text: nazev, fs: v.fs, cil };
	};

	/** Záložní prstenec pozic kolem značky — pro jména, na která pár míst nestačí.
	 * Okruh 4.8 doplněn 6. 8. 2026: rok 2025 rozšířil mapu o Normandii, celkový
	 * pohled se oddálil a Vaulnaveys-le-Haut s Col d'Ornon se sblížily natolik,
	 * že do 3.6 žádná volná pozice nebyla (brána hlásila překryv 39 jednotek²). */
	const prstenec = (sx: number, sy: number, sr: number): [number, number, string][] => {
		const ven: [number, number, string][] = [];
		for (const dal of [1, 1.8, 2.6, 3.6, 4.8]) {
			for (let k = 0; k < 12; k++) {
				const uhel = (k / 12) * Math.PI * 2;
				const vzdal = sr + pismo * dal;
				const x = sx + Math.cos(uhel) * vzdal;
				const y = sy + Math.sin(uhel) * vzdal + pismo * 0.35;
				// všechna tři zarovnání: u kraje mapy nebo velkého shluku bývá jediné
				// možné to, které text táhne zpátky přes pin (jinak by přetekl ven)
				for (const kotva of ['middle', 'start', 'end']) ven.push([x, y, kotva]);
			}
		}
		return ven;
	};

	// domov jde první — je to pevná značka, ostatní se jí přizpůsobí
	let domovPopisek: PopisekPolozky | undefined;
	if (domov) {
		domovPopisek = umisti(domov.nazev, '__domov', [
			[domov.x, domov.y + pinR * 3, 'middle'],
			[domov.x, domov.y - pinR * 2.2, 'middle'],
			[domov.x + pinR * 1.8, domov.y + pismo * 0.35, 'start'],
			[domov.x - pinR * 1.8, domov.y + pismo * 0.35, 'end'],
			[domov.x, domov.y + pinR * 3 + pismo * 1.2, 'middle'],
			[domov.x, domov.y - pinR * 2.2 - pismo * 1.2, 'middle'],
			...prstenec(domov.x, domov.y, pinR * 1.5),
		]);
	}

	for (const p of polozky) {
		hotove.push(
			umisti(p.nazev, p.id, [
				[p.x, p.y - p.r - pismo * 0.45, 'middle'],
				[p.x, p.y + p.r + pismo * 1.15, 'middle'],
				[p.x + p.r + pismo * 0.35, p.y + pismo * 0.35, 'start'],
				[p.x - p.r - pismo * 0.35, p.y + pismo * 0.35, 'end'],
				[p.x, p.y - p.r - pismo * 1.7, 'middle'],
				[p.x, p.y + p.r + pismo * 2.4, 'middle'],
				[p.x + p.r + pismo * 0.35, p.y - p.r - pismo * 0.45, 'start'],
				[p.x - p.r - pismo * 0.35, p.y + p.r + pismo * 1.15, 'end'],
				...prstenec(p.x, p.y, p.r),
			]),
		);
	}
	return { popisky: hotove, domovPopisek };
}

/**
 * Spočítá všechny pohledy mapy — celkovou i všechny přiblížené.
 * `vyrezRoku` je volitelný ruční výřez celkové mapy (z dat roku).
 */
export function pripravPohledy<T extends MistoNaMape>(
	mista: T[],
	vyrezRoku?: { x: number; y: number; sirka: number; vyska: number },
	domov?: { x: number; y: number; nazev: string },
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
					zeme: hlavni.zeme,
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
				// každá země skupiny jednou, v pořadí návštěvy
				zeme: [...new Set(cast.map((m) => m.zeme).filter(Boolean))].join(', '),
			};
		});

		rozestup(polozky, pinR * 1.8);

		// domeček je jen na celkové mapě (v přiblížených pohledech se nekreslí)
		const rozmistene = rozmistiPopiskyPolozek(polozky, pismo, vyrez, pinR, skupina, jeKoren ? domov : undefined);

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
			popisky: rozmistene.popisky,
			domovPopisek: rozmistene.domovPopisek,
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

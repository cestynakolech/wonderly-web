export const MAPA_SIRKA = 680;
export const MAPA_VYSKA = 520;

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

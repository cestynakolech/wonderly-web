import type { APIRoute } from 'astro';
import { temata } from '../../data/temata';
import { kvizy } from '../../data/kvizy';

export const prerender = true;

// mapa: klíč predmet/rocnik/tema/podtema -> název podtématu
const nazvy: Record<string, string> = {};
for (const [klic, seznam] of Object.entries(temata)) {
	const [predmet, rocnik] = klic.split('/');
	for (const tema of seznam) {
		for (const p of tema.podtemata ?? []) {
			nazvy[`${predmet}/${rocnik}/${tema.slug}/${p.slug}`] = p.nazev;
		}
	}
}

// Export otázek pro Apps Script (propustka z hodiny).
// U každé otázky je `spravna` (správná odpověď) a `moznosti` (v pořadí ze zdroje;
// na webu se míchají, tady je pořadí jedno — Apps Script si je zamíchá sám).
export const GET: APIRoute = () => {
	const out: Record<string, { nazev: string; otazky: { text: string; spravna: string; moznosti: string[] }[] }> = {};
	for (const [klic, otazky] of Object.entries(kvizy)) {
		out[klic] = {
			nazev: nazvy[klic] ?? klic,
			otazky: otazky.map((o) => ({ text: o.text, spravna: o.odpovedi[0], moznosti: o.odpovedi })),
		};
	}
	return new Response(JSON.stringify(out), {
		headers: { 'content-type': 'application/json; charset=utf-8' },
	});
};

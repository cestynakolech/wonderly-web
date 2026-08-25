import type { APIRoute } from 'astro';
import { temata } from '../../data/temata';

export const GET: APIRoute = async ({ params }) => {
	const rocnik = params.rocnik;
	
	// Najdi všechna videa pro daný ročník (fyzika/{rocnik})
	const key = `fyzika/${rocnik}`;
	const temaList = temata[key];
	
	if (!temaList) {
		return new Response(JSON.stringify({ error: 'Ročník nenalezen' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	
	const videos: Array<{
		nazev: string;
		cesta: string;
		tema: string;
		podtema: string;
		ai?: string;
	}> = [];
	
	// Iteruj přes všechna témata a podtémata
	for (const tema of temaList) {
		if (tema.podtemata) {
			for (const podtema of tema.podtemata) {
				if (podtema.materialy) {
					for (const material of podtema.materialy) {
						// Vezmi jen videa (ne audio, infografiky atd.)
						if (material.druh === 'video' && !material.cesta.endsWith('.m4a')) {
							videos.push({
								nazev: material.nazev,
								cesta: material.cesta,
								tema: tema.nazev,
								podtema: podtema.nazev,
								ai: material.ai
							});
						}
					}
				}
			}
		}
	}
	
	// Omez na 40 videí (nebo kolik jich máme)
	const limited = videos.slice(0, 40);
	
	return new Response(JSON.stringify({
		rocnik,
		total: limited.length,
		videos: limited
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};

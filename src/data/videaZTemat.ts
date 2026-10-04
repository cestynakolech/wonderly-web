import { temata } from './temata';

export interface GalerieVideo {
	nazev: string;
	cesta: string;
	tema: string;
	podtema: string;
	ai?: string;
}

/** Písně jsou v datech vedené jako druh 'video', ale jsou to zvukové soubory — do galerie videí nepatří. */
export const jeZvukovySoubor = (cesta?: string) => /\.(m4a|mp3|wav|ogg|aac)$/i.test(cesta ?? '');

export const ROCNIKY_VIDEA = ['6-rocnik', '7-rocnik', '8-rocnik', '9-rocnik'] as const;

/** Videa ročníku z temata.ts (jediný zdroj dat), bez duplicit podle cesty. */
export function videaRocniku(rocnikSlug: string): GalerieVideo[] {
	const temaList = (temata as Record<string, any[]>)[`fyzika/${rocnikSlug}`] ?? [];
	const videos: GalerieVideo[] = [];
	const videno = new Set<string>();
	for (const tema of temaList) {
		for (const podtema of tema.podtemata ?? []) {
			for (const m of podtema.materialy ?? []) {
				if (m.druh === 'video' && m.cesta && !jeZvukovySoubor(m.cesta) && !videno.has(m.cesta)) {
					videno.add(m.cesta);
					videos.push({ nazev: m.nazev, cesta: m.cesta, tema: tema.nazev, podtema: podtema.nazev, ai: m.ai });
				}
			}
		}
	}
	return videos;
}

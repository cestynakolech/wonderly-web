/**
 * Herní místnost Fyzikální ligy (Durable Object).
 * Tabule (interaktivka) řídí hru, tablety týmů posílají odpovědi.
 * DO jen bezpečně přeposílá zprávy a pamatuje si poslední stav pro připojení
 * opozdilců — pravidla a body počítá stránka tabule.
 */
export class LigaMistnost {
	constructor(state) {
		this.state = state;
		this.spojeni = new Map(); // WebSocket -> { role: 'tabule'|'tym', id, jmeno }
		this.posledniFaze = null; // poslední zpráva tabule (pro nově připojené)
		this.dalsiId = 1;
	}

	async fetch(request) {
		const url = new URL(request.url);
		if (request.headers.get('Upgrade') !== 'websocket') {
			return new Response('Očekáván WebSocket', { status: 426 });
		}
		const role = url.searchParams.get('role') === 'tabule' ? 'tabule' : 'tym';
		const par = new WebSocketPair();
		const [klient, server] = Object.values(par);
		server.accept();
		const meta = { role, id: role === 'tym' ? this.dalsiId++ : 0, jmeno: '' };
		this.spojeni.set(server, meta);

		server.addEventListener('message', (udalost) => {
			let zprava;
			try {
				zprava = JSON.parse(udalost.data);
			} catch {
				return;
			}
			if (meta.role === 'tabule') {
				// tabule vysílá stav hry všem týmům
				if (zprava.typ === 'faze') this.posledniFaze = zprava;
				this.rozesli('tym', zprava);
			} else {
				// tým se hlásí nebo odpovídá — jde to jen tabuli
				if (zprava.typ === 'prihlaseni') {
					meta.jmeno = String(zprava.jmeno ?? '').slice(0, 24) || `Tým ${meta.id}`;
					this.posli(server, { typ: 'prijat', id: meta.id, jmeno: meta.jmeno });
					if (this.posledniFaze) this.posli(server, this.posledniFaze);
				}
				this.rozesli('tabule', { ...zprava, id: meta.id, jmeno: meta.jmeno, cas: Date.now() });
			}
		});

		const uklid = () => {
			this.spojeni.delete(server);
			if (meta.role === 'tym' && meta.jmeno) {
				this.rozesli('tabule', { typ: 'odpojeni', id: meta.id, jmeno: meta.jmeno });
			}
		};
		server.addEventListener('close', uklid);
		server.addEventListener('error', uklid);

		return new Response(null, { status: 101, webSocket: klient });
	}

	posli(ws, zprava) {
		try {
			ws.send(JSON.stringify(zprava));
		} catch {}
	}

	rozesli(komu, zprava) {
		for (const [ws, meta] of this.spojeni) {
			if (meta.role === komu) this.posli(ws, zprava);
		}
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = request.headers.get('host') ?? '';

		// herní místnosti Fyzikální ligy
		if (url.pathname === '/api/liga/nova') {
			const abeceda = 'ABCDEFHJKMNPRSTUVXYZ';
			let kod = '';
			for (let i = 0; i < 4; i++) kod += abeceda[Math.floor(Math.random() * abeceda.length)];
			return new Response(JSON.stringify({ mistnost: kod }), {
				headers: { 'content-type': 'application/json' },
			});
		}
		if (url.pathname === '/api/liga/ws') {
			const kod = (url.searchParams.get('mistnost') ?? '').toUpperCase();
			if (!/^[A-Z]{4}$/.test(kod)) return new Response('Neplatný kód místnosti', { status: 400 });
			const id = env.LIGA.idFromName(kod);
			return env.LIGA.get(id).fetch(request);
		}

		// živé pořadí českých jezdců na Tour de France (čte veřejné tabulky letour.fr, mezipaměť 60 s)
		if (url.pathname === '/api/tour') {
			const cache = caches.default;
			const klicCache = new Request('https://cache.wonderly.cz/api/tour');
			const ulozene = await cache.match(klicCache);
			if (ulozene) return ulozene;

			const JEZDCI = ['VACEK', 'OTRUBA', 'BITTNER'];
			const UA = { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' };
			const odpoved = { jezdci: {}, etapa: null, zive: null, aktualizovano: new Date().toISOString() };

			const vyparsuj = (html, prijmeni) => {
				const poz = html.toUpperCase().indexOf(prijmeni);
				if (poz < 0) return null;
				const radek = html.slice(html.lastIndexOf('<tr', poz), html.indexOf('</tr>', poz));
				const bunky = [...radek.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
					m[1].replace(/<[^>]+>/g, ' ').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
				);
				return { pozice: bunky[0], tym: bunky[3], cas: bunky[4], ztrata: bunky[5] === '-' ? 'vede' : bunky[5] };
			};

			try {
				const stranka = (await (await fetch('https://www.letour.fr/en/rankings', { headers: UA })).text())
					.replace(/\\\//g, '/').replace(/&quot;/g, '"');
				// posbírat ajax adresy tabulek (ite = etapa, itg = celkově)
				const adresy = {};
				for (const m of stranka.matchAll(/\/en\/ajax\/ranking\/(\d+)\/(i[a-z]g|i[a-z]e)\/[a-f0-9]+\/(?:subtab|none|tab)/g)) {
					adresy[m[2]] ??= m[0];
					odpoved.etapa = +m[1];
				}
				if (url.searchParams.has('debug')) {
					return new Response(JSON.stringify({ adresy, etapa: odpoved.etapa, delka: stranka.length }), {
						headers: { 'content-type': 'application/json' } });
				}
				// během jedoucí etapy jsou tabulky aktuální etapy prázdné —
				// pak sáhneme po poslední funkční adrese (pamatujeme si ji v cache)
				const ZALOZNI = {
					itg: '/en/ajax/ranking/13/itg/8532e10a8f49261c752759b02dc5d296/none',
					ite: '/en/ajax/ranking/13/ite/c7494bafb75f0694614b45fdd3eaec86/subtab',
				};
				const nactiTabulku = async (typ) => {
					const kandidati = [adresy[typ]];
					const ulozenaUrl = await cache.match(new Request('https://cache.wonderly.cz/tour-url-' + typ));
					if (ulozenaUrl) kandidati.push(await ulozenaUrl.text());
					kandidati.push(ZALOZNI[typ]);
					for (const cesta of kandidati) {
						if (!cesta) continue;
						try {
							const htmlTab = await (await fetch('https://www.letour.fr' + cesta, { headers: UA })).text();
							if (JEZDCI.some((j) => htmlTab.toUpperCase().includes(j))) {
								await cache.put(new Request('https://cache.wonderly.cz/tour-url-' + typ),
									new Response(cesta, { headers: { 'cache-control': 'public, max-age=604800' } }));
								const m = cesta.match(/\/ranking\/(\d+)\//);
								return { html: htmlTab, poEtape: m ? +m[1] : null };
							}
						} catch {}
					}
					return null;
				};
				const etapaTab = await nactiTabulku('ite');
				if (etapaTab) {
					odpoved.vysledkyPoEtape = etapaTab.poEtape;
					for (const j of JEZDCI) odpoved.jezdci[j] = { etapa: vyparsuj(etapaTab.html, j) };
				}
				const gcTab = await nactiTabulku('itg');
				if (gcTab) {
					for (const j of JEZDCI) (odpoved.jezdci[j] ??= {}).celkove = vyparsuj(gcTab.html, j);
					const m = gcTab.html.match(/profile--name[^>]*>[\s\S]{0,200}?([A-ZÀ-Ž]\.\s*[A-ZÀ-Ž][^<\n]{1,30})/);
					odpoved.lidr = m ? m[1].trim() : null;
				}
			} catch (e) {
				odpoved.chyba = 'letour.fr nedostupný: ' + e.message;
			}
			// ŽIVÁ TELEMETRIE během jedoucí etapy (racecenter.letour.fr, veřejné API bez tokenu)
			const BIBY = { 37: 'VACEK', 227: 'OTRUBA', 213: 'BITTNER' };
			try {
				const rc = 'https://racecenter.letour.fr/api';
				const etapaCislo = odpoved.etapa ?? 14;
				const tel = await (await fetch(`${rc}/telemetryCompetitor-2026`, { headers: UA })).json();
				const riders = tel?.[0]?.Riders ?? [];
				let kdokoliZive = false;
				for (const r of riders) {
					const jm = BIBY[r.Bib];
					if (!jm) continue;
					kdokoliZive = true;
					(odpoved.jezdci[jm] ??= {}).zive = {
						poziceNaTrati: r.Pos,
						odstupVterin: r.secToFirstRider,
						rychlost: r.kph != null ? Math.round(r.kph) : null,
						stav: r.Status,
					};
				}
				odpoved.zavodSeJede = kdokoliZive;
				const koment = await (await fetch(`${rc}/publication_cs-2026-${etapaCislo}`, { headers: UA })).json();
				const zive = (Array.isArray(koment) ? koment : []).filter((k) => k.type === 'liv');
				odpoved.komentar = zive.slice(0, 3).map((k) => ({
					text: Array.isArray(k.text) ? k.text.join(' ') : k.text, cas: k.publicationAt || k.createdAt,
				}));
				const pack = await (await fetch(`${rc}/pack-2026-${etapaCislo}`, { headers: UA })).json();
				const skupiny = pack?.[0]?.groups ?? [];
				const c1 = skupiny[0];
				if (c1?.computedRemainingDistance != null) odpoved.doCileKm = Math.round(c1.computedRemainingDistance / 1000);
				const cisloBibu = (b) => (typeof b === 'object' ? b.bib : b);
				odpoved.skupiny = [...skupiny]
					.sort((a, b) => (a.computedRelative ?? 0) - (b.computedRelative ?? 0))
					.map((sk) => {
						const biby = (sk.bibs ?? []).map(cisloBibu);
						return {
							nazev: sk.name,
							odstupVterin: sk.computedRelative ?? 0,
							pocet: sk.size >= 999 ? null : sk.size, // 999 = velké pole (peloton)
							nasi: biby.filter((b) => BIBY[b]).map((b) => BIBY[b]),
						};
					});
				// ke každému jezdci doplnit, v jaké je skupině
				for (const sk of odpoved.skupiny) {
					for (const jm of sk.nasi) (odpoved.jezdci[jm] ??= {}).skupina = { nazev: sk.nazev, odstupVterin: sk.odstupVterin };
				}
			} catch (e) {
				odpoved.zive = { chyba: e.message };
			}

			// při jedoucím závodu obnovovat rychleji (30 s), jinak 60 s
			const ttl = odpoved.zavodSeJede ? 30 : 60;
			const json = new Response(JSON.stringify(odpoved), {
				headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${ttl}` },
			});
			await cache.put(klicCache, json.clone());
			return json;
		}

		// /media/... = soubory z úložiště R2 (fotogalerie apod.)
		if (url.pathname.startsWith('/media/')) {
			// výpis souborů se zadanou předponou (pro galerie): /media/seznam?slozka=cesty/2026/landshut
			if (url.pathname === '/media/seznam') {
				const slozka = url.searchParams.get('slozka') ?? '';
				if (!slozka.startsWith('cesty/')) {
					return new Response('Neplatná složka', { status: 400 });
				}
				const vypis = await env.MEDIA.list({ prefix: slozka.replace(/\/?$/, '/'), limit: 500 });
				const soubory = vypis.objects.map((o) => o.key);
				return new Response(JSON.stringify(soubory), {
					headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' },
				});
			}
			const klic = decodeURIComponent(url.pathname.slice('/media/'.length));
			const objekt = await env.MEDIA.get(klic);
			if (!objekt) {
				return new Response('Soubor nenalezen', { status: 404 });
			}
			const hlavicky = new Headers();
			objekt.writeHttpMetadata(hlavicky);
			hlavicky.set('etag', objekt.httpEtag);
			hlavicky.set('cache-control', 'public, max-age=31536000, immutable');
			return new Response(objekt.body, { headers: hlavicky });
		}

		let prefix = null;
		if (host.startsWith('fox.')) {
			prefix = '/fox';
		} else if (host.startsWith('lab.')) {
			prefix = '/skola2';
		} else if (host.startsWith('cesty.')) {
			prefix = '/cesty';
		}

		if (prefix) {
			const prefixedUrl = new URL(url);
			prefixedUrl.pathname = prefix + url.pathname;
			const prefixedResponse = await env.ASSETS.fetch(new Request(prefixedUrl, request));
			if (prefixedResponse.status !== 404) {
				return prefixedResponse;
			}
		}

		return env.ASSETS.fetch(new Request(url, request));
	},
};

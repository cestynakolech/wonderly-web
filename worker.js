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

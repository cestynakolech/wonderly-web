/**
 * Herní místnost Fyzikální ligy (Durable Object).
 * Tabule (interaktivka) řídí hru, tablety týmů posílají odpovědi.
 * DO jen bezpečně přeposílá zprávy a pamatuje si poslední stav pro připojení
 * opozdilců — pravidla a body počítá stránka tabule.
 */
export class LigaMistnost {
	constructor(state) {
		this.state = state;
		this.spojeni = new Map(); // WebSocket -> { role: 'tabule'|'ceka'|'tym', id, jmeno }
		this.posledniFaze = null; // poslední zpráva tabule (pro nově připojené)
		this.dalsiId = 1;
		// Tajný klíč tabule. Vzniká při zakládání místnosti a NIKDY se neposílá týmům.
		// Bez něj se role tabule nedá získat — čtyřpísmenný kód místnosti zná celá
		// třída, takže sám o sobě nesmí stačit k řízení hry.
		this.klic = null;
		this.spatnePokusy = 0;
		this.blokovanoDo = 0;
		state.blockConcurrencyWhile?.(async () => {
			const ulozeny = await state.storage?.get('klic');
			// pozor na pořadí: klíč zapsaný mezitím zakládáním místnosti se
			// NESMÍ přepsat zpět na null, jinak by šlo místnost založit dvakrát
			if (ulozeny && !this.klic) this.klic = ulozeny;
		});
	}

	async fetch(request) {
		const url = new URL(request.url);

		// interní: založení místnosti (volá jen samotný worker, ne prohlížeč)
		if (url.pathname.endsWith('/zaloz')) {
			const novy = url.searchParams.get('klic') ?? '';
			if (this.klic) return new Response('obsazeno', { status: 409 });
			if (novy.length < 20) return new Response('slabý klíč', { status: 400 });
			this.klic = novy;
			await this.state.storage?.put('klic', novy);
			return new Response('ok');
		}

		if (request.headers.get('Upgrade') !== 'websocket') {
			return new Response('Očekáván WebSocket', { status: 426 });
		}
		// Role tabule se NEDÁVÁ podle URL — kdo o ni žádá, musí ji nejdřív doložit
		// klíčem v první zprávě. Do té doby nemá žádná práva (role 'ceka').
		const chceTabuli = url.searchParams.get('role') === 'tabule';
		const par = new WebSocketPair();
		const [klient, server] = Object.values(par);
		server.accept();
		const meta = { role: chceTabuli ? 'ceka' : 'tym', id: chceTabuli ? 0 : this.dalsiId++, jmeno: '' };
		this.spojeni.set(server, meta);

		server.addEventListener('message', (udalost) => {
			let zprava;
			try {
				zprava = JSON.parse(udalost.data);
			} catch {
				return;
			}

			// čekatel na roli tabule: přijímá se JEN autorizace, nic jiného nerozesílá
			if (meta.role === 'ceka') {
				if (zprava.typ !== 'autorizace') return;
				if (Date.now() < this.blokovanoDo) {
					this.posli(server, { typ: 'zamitnuto', duvod: 'Příliš mnoho pokusů, zkus to za chvíli.' });
					try { server.close(1008, 'blokováno'); } catch {}
					return;
				}
				if (!this.klic || String(zprava.klic ?? '') !== this.klic) {
					this.spatnePokusy++;
					if (this.spatnePokusy >= 5) this.blokovanoDo = Date.now() + 10 * 60 * 1000;
					this.posli(server, { typ: 'zamitnuto', duvod: 'Neplatný klíč tabule.' });
					try { server.close(1008, 'neplatný klíč'); } catch {}
					this.spojeni.delete(server);
					return;
				}
				this.spatnePokusy = 0;
				meta.role = 'tabule';
				this.posli(server, { typ: 'autorizovano' });
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

/**
 * Odemčení zamčené stránky na tabuli z telefonu, bez psaní hesla na tabuli
 * (viz OdemceniTelefonem.astro + /odemknout/). Tabule založí jednorázový
 * kód, telefon ho naskenuje jako QR a potvrdí učitelským heslem — worker
 * heslo ověří (OTISK_TABULE níž) a DO jen pamatuje stav a počet pokusů.
 * Heslo samo se sem NIKDY neposílá ani neukládá, jen výsledek porovnání.
 *
 * Táž třída se používá i jako úložiště „zapamatovaných" telefonů — worker si
 * pro to vyžádá SAMOSTATNOU instanci přes idFromName('zapamatovane-telefony')
 * (žádná nová třída, žádná migrace). Ta instance nikdy nedostane /zaloz ani
 * alarm, jen /telefon-pridej a /telefon-over, a ukládá otisky pod JINÝM
 * klíčem úložiště ('telefony', ne 'data'), aby si obě role vzájemně nepřepsaly
 * data, kdyby náhodou sdílely storage.
 */
export class TabuleOdemceni {
	constructor(state) {
		this.state = state;
		this.tajne = null;
		this.odemceno = false;
		this.pokusy = 0;
		state.blockConcurrencyWhile?.(async () => {
			const ulozene = await state.storage?.get('data');
			if (ulozene) {
				this.tajne = ulozene.tajne;
				this.odemceno = ulozene.odemceno;
				this.pokusy = ulozene.pokusy;
			}
		});
	}

	async ulozit() {
		await this.state.storage?.put('data', { tajne: this.tajne, odemceno: this.odemceno, pokusy: this.pokusy });
	}

	async fetch(request) {
		const url = new URL(request.url);
		const hlavicky = { 'content-type': 'application/json', 'cache-control': 'no-store' };

		// interní: založení kódu (volá jen samotný worker)
		if (url.pathname.endsWith('/zaloz')) {
			this.tajne = url.searchParams.get('tajne') ?? '';
			this.odemceno = false;
			this.pokusy = 0;
			await this.ulozit();
			// po 10 minutách kód sám zanikne, i kdyby ho nikdo nepoužil
			await this.state.storage?.setAlarm(Date.now() + 10 * 60 * 1000);
			return new Response('ok');
		}

		if (url.pathname.endsWith('/stav')) {
			const t = url.searchParams.get('tajne') ?? '';
			if (!this.tajne || t !== this.tajne) {
				return new Response(JSON.stringify({ stav: 'neplatne' }), { headers: hlavicky });
			}
			return new Response(JSON.stringify({ stav: this.odemceno ? 'odemceno' : 'ceka' }), { headers: hlavicky });
		}

		// zrušení z telefonu (tlačítko „Zrušit") nebo z tabule po vypršení —
		// odpověď je vždy stejná, ať tajné sedělo nebo ne, ať to nepomáhá hádání
		if (url.pathname.endsWith('/zrus')) {
			const t = url.searchParams.get('tajne') ?? '';
			if (this.tajne && t === this.tajne) {
				await this.state.storage?.deleteAll();
				await this.state.storage?.deleteAlarm();
				this.tajne = null;
				this.odemceno = false;
				this.pokusy = 0;
			}
			return new Response(JSON.stringify({ ok: true }), { headers: hlavicky });
		}

		// interní: přidání otisku zapamatovaného telefonu (volá jen worker, jen na
		// instanci 'zapamatovane-telefony') — max 10 telefonů, nejstarší vypadne.
		// Ukládá se i otisk HESLA, se kterým klíč vznikl (heslo_otisk = aktuální
		// OTISK_TABULE) — klíč tak platí jen dokud platí totéž heslo. Ztracený
		// telefon: změňte heslo (OTISK_TABULE) — všechny zapamatované telefony
		// tím přestanou platit.
		if (url.pathname.endsWith('/telefon-pridej')) {
			const otisk = url.searchParams.get('otisk') ?? '';
			const heslo = url.searchParams.get('heslo_otisk') ?? '';
			if (!/^[0-9a-f]{64}$/.test(otisk) || !/^[0-9a-f]{64}$/.test(heslo)) {
				return new Response('Neplatný otisk', { status: 400 });
			}
			const seznam = (await this.state.storage?.get('telefony')) ?? [];
			seznam.push({ klic: otisk, heslo });
			while (seznam.length > 10) seznam.shift();
			await this.state.storage?.put('telefony', seznam);
			return new Response('ok');
		}

		// interní: je tenhle otisk mezi zapamatovanými telefony A vznikl s aktuálně
		// platným heslem? Starý formát položky (holý řetězec, bez uloženého hesla)
		// bereme jako neplatný — nemáme se s čím porovnat.
		if (url.pathname.endsWith('/telefon-over')) {
			const otisk = url.searchParams.get('otisk') ?? '';
			const heslo = url.searchParams.get('heslo_otisk') ?? '';
			const seznam = (await this.state.storage?.get('telefony')) ?? [];
			const znamy = seznam.some((p) => typeof p === 'object' && p !== null && p.klic === otisk && p.heslo === heslo);
			return new Response(JSON.stringify({ znamy }), { headers: hlavicky });
		}

		// interní: worker už heslo ověřil (SHA-256 proti OTISK_TABULE), sem posílá
		// jen výsledek porovnání — DO samo heslo nikdy nevidí
		if (url.pathname.endsWith('/over')) {
			if (!this.tajne) {
				return new Response(JSON.stringify({ chyba: 'Kód vypršel, na tabuli klikněte znovu.' }), { status: 410, headers: hlavicky });
			}
			if (this.pokusy >= 5) {
				return new Response(JSON.stringify({ chyba: 'Příliš mnoho pokusů.' }), { status: 429, headers: hlavicky });
			}
			const spravne = url.searchParams.get('spravne') === 'true';
			if (!spravne) {
				this.pokusy++;
				await this.ulozit();
				return new Response(
					JSON.stringify({ chyba: 'Špatné heslo.', zbyva: Math.max(0, 5 - this.pokusy) }),
					{ status: 401, headers: hlavicky },
				);
			}
			this.odemceno = true;
			await this.ulozit();
			return new Response(JSON.stringify({ ok: true }), { headers: hlavicky });
		}

		return new Response('Neznámá cesta', { status: 404 });
	}

	// po 10 minutách kód smažeme, aby QR na tabuli přestalo platit
	async alarm() {
		await this.state.storage?.deleteAll();
		this.tajne = null;
		this.odemceno = false;
		this.pokusy = 0;
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = request.headers.get('host') ?? '';

		// Odemčení tabule z telefonu. OTISK_TABULE MUSÍ sedět s hodnotou OTISK
		// v klientských zámcích (Zamek.astro, [podtema]/test/index.astro) — jinak
		// by šlo tabuli odemknout jiným heslem, než jaké zná učitel.
		const OTISK_TABULE = '8c0a8e314ec61cb5d61faea8ffa0dbded53adc2aa21f138cfcf90979f40a81fb';
		const jsonNoStore = (data, init = {}) =>
			new Response(JSON.stringify(data), {
				...init,
				headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...(init.headers ?? {}) },
			});

		if (url.pathname === '/api/tabule/nova') {
			if (request.method !== 'POST') return new Response('Metoda není povolena', { status: 405 });
			const bajtyId = new Uint8Array(16);
			crypto.getRandomValues(bajtyId);
			const id = [...bajtyId].map((b) => b.toString(16).padStart(2, '0')).join('');
			const bajtyTajne = new Uint8Array(18);
			crypto.getRandomValues(bajtyTajne);
			const tajne = [...bajtyTajne].map((b) => b.toString(16).padStart(2, '0')).join('');
			await env.TABULE.get(env.TABULE.idFromName(id)).fetch(`https://tabule/zaloz?tajne=${tajne}`);
			return jsonNoStore({ id, tajne });
		}
		if (url.pathname === '/api/tabule/stav') {
			const p = url.searchParams.get('p') ?? '';
			const t = url.searchParams.get('t') ?? '';
			if (!/^[0-9a-f]{32}$/.test(p)) return jsonNoStore({ stav: 'neplatne' });
			const odpoved = await env.TABULE.get(env.TABULE.idFromName(p)).fetch(`https://tabule/stav?tajne=${encodeURIComponent(t)}`);
			let vysledek = { stav: 'neplatne' };
			try {
				vysledek = await odpoved.json();
			} catch {}
			return jsonNoStore(vysledek);
		}
		if (url.pathname === '/api/tabule/zrus') {
			if (request.method !== 'POST') return new Response('Metoda není povolena', { status: 405 });
			const telo = await request.text();
			if (telo.length > 1024) return jsonNoStore({ ok: true });
			let data;
			try {
				data = JSON.parse(telo);
			} catch {
				return jsonNoStore({ ok: true });
			}
			const p = String(data?.p ?? '');
			const t = String(data?.t ?? '');
			// stejná odpověď pro platné i neplatné p — ať to nepomáhá hádání
			if (/^[0-9a-f]{32}$/.test(p)) {
				try {
					await env.TABULE.get(env.TABULE.idFromName(p)).fetch(`https://tabule/zrus?tajne=${encodeURIComponent(t)}`);
				} catch {}
			}
			return jsonNoStore({ ok: true });
		}
		if (url.pathname === '/api/tabule/potvrd') {
			if (request.method !== 'POST') return new Response('Metoda není povolena', { status: 405 });
			const telo = await request.text();
			if (telo.length > 1024) return new Response('Tělo je příliš velké', { status: 400 });
			let data;
			try {
				data = JSON.parse(telo);
			} catch {
				return new Response('Neplatný JSON', { status: 400 });
			}
			const p = String(data?.p ?? '');
			if (!/^[0-9a-f]{32}$/.test(p)) return new Response('Neplatné p', { status: 400 });

			// zapamatovaný telefon posílá svůj klíč místo hesla — ověří se proti
			// otiskům v samostatné instanci TabuleOdemceni, ne proti OTISK_TABULE.
			// Klíč platí jen s heslem, se kterým vznikl — ztracený telefon: změňte
			// heslo (OTISK_TABULE) a všechny zapamatované telefony tím přestanou platit.
			const klic = data?.klic != null ? String(data.klic) : null;
			let spravne;
			if (klic !== null) {
				if (!/^[0-9a-f]{64}$/.test(klic)) {
					spravne = false;
				} else {
					const otiskKliceBajty = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(klic));
					const otiskKlice = [...new Uint8Array(otiskKliceBajty)].map((b) => b.toString(16).padStart(2, '0')).join('');
					const telefony = env.TABULE.get(env.TABULE.idFromName('zapamatovane-telefony'));
					const overeni = await telefony.fetch(`https://tabule/telefon-over?otisk=${otiskKlice}&heslo_otisk=${OTISK_TABULE}`);
					let vysledekOvereni = { znamy: false };
					try {
						vysledekOvereni = await overeni.json();
					} catch {}
					spravne = vysledekOvereni.znamy === true;
				}
			} else {
				const heslo = String(data?.heslo ?? '');
				const otiskBajty = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(heslo));
				const otisk = [...new Uint8Array(otiskBajty)].map((b) => b.toString(16).padStart(2, '0')).join('');
				spravne = otisk === OTISK_TABULE;
			}

			// pořád jde přes DO /over — ať platí i pro klíče limit 5 pokusů
			const odpoved = await env.TABULE.get(env.TABULE.idFromName(p)).fetch(`https://tabule/over?spravne=${spravne}`);
			let vysledek = {};
			try {
				vysledek = await odpoved.json();
			} catch {}

			// zapamatování jde jen z ověření HESLEM (ne klíčem — jinak by šel klíč
			// donekonečna prodlužovat sám sebou) a jen při skutečném úspěchu
			if (klic === null && spravne && odpoved.status === 200 && data?.zapamatovat === true) {
				const noveBajty = new Uint8Array(32);
				crypto.getRandomValues(noveBajty);
				const novyKlic = [...noveBajty].map((b) => b.toString(16).padStart(2, '0')).join('');
				const otiskNovehoBajty = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(novyKlic));
				const otiskNoveho = [...new Uint8Array(otiskNovehoBajty)].map((b) => b.toString(16).padStart(2, '0')).join('');
				await env.TABULE.get(env.TABULE.idFromName('zapamatovane-telefony')).fetch(`https://tabule/telefon-pridej?otisk=${otiskNoveho}&heslo_otisk=${OTISK_TABULE}`);
				vysledek = { ...vysledek, klic: novyKlic };
			}

			return jsonNoStore(vysledek, { status: odpoved.status });
		}

		// herní místnosti Fyzikální ligy
		if (url.pathname === '/api/liga/nova') {
			const abeceda = 'ABCDEFHJKMNPRSTUVXYZ';
			// Kód místnosti zná celá třída (píše se na tabuli), klíč zná jen učitel.
			// Klíč se losuje kryptograficky, ne přes Math.random.
			const bajty = new Uint8Array(18);
			crypto.getRandomValues(bajty);
			const klic = [...bajty].map((b) => b.toString(16).padStart(2, '0')).join('');

			// Kód se losuje tak dlouho, dokud nepadne na volnou místnost — do obsazené
			// (běžící hry) se klíč nikdy nepřepíše, jinak by šlo cizí hru převzít.
			for (let pokus = 0; pokus < 6; pokus++) {
				let kod = '';
				for (let i = 0; i < 4; i++) kod += abeceda[Math.floor(Math.random() * abeceda.length)];
				const id = env.LIGA.idFromName(kod);
				const zalozeni = await env.LIGA.get(id).fetch(
					`https://liga/zaloz?klic=${klic}`,
				);
				if (zalozeni.ok) {
					return new Response(JSON.stringify({ mistnost: kod, klic }), {
						headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
					});
				}
			}
			return new Response(JSON.stringify({ chyba: 'Nepodařilo se založit místnost, zkus to znovu.' }), {
				status: 503,
				headers: { 'content-type': 'application/json' },
			});
		}
		if (url.pathname === '/api/liga/ws') {
			const kod = (url.searchParams.get('mistnost') ?? '').toUpperCase();
			if (!/^[A-Z]{4}$/.test(kod)) return new Response('Neplatný kód místnosti', { status: 400 });
			const id = env.LIGA.idFromName(kod);
			return env.LIGA.get(id).fetch(request);
		}

		// živé pořadí českých jezdkyň na Tour de France Femmes (čte veřejné tabulky letourfemmes.fr, mezipaměť 60 s)
		if (url.pathname === '/api/tour') {
			const cache = caches.default;
			const klicCache = new Request('https://cache.wonderly.cz/api/tour-femmes');
			const ulozene = await cache.match(klicCache);
			if (ulozene) return ulozene;

			// hledá se bez koncové diakritiky — v tabulkách stojí „N. NOSKOVÁ"
			const JEZDCI = ['NOSKOV'];
			const UA = { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' };
			const odpoved = { jezdci: {}, etapa: null, zive: null, aktualizovano: new Date().toISOString() };

			const vyparsuj = (html, prijmeni) => {
				const poz = html.toUpperCase().indexOf(prijmeni);
				if (poz < 0) return null;
				const radek = html.slice(html.lastIndexOf('<tr', poz), html.indexOf('</tr>', poz));
				const bunky = [...radek.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
					m[1].replace(/<[^>]+>/g, ' ').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
				);
				// pořadí sloupců se mezi závody liší → čas najdeme podle tvaru (00h 00' 00''),
				// tým stojí těsně před ním a ztráta hned za ním
				const iCas = bunky.findIndex((b) => /\d+\s*h\s*\d+\s*'/.test(b));
				if (iCas < 1) return { pozice: bunky[0], tym: null, cas: null, ztrata: null };
				const gap = bunky[iCas + 1];
				return {
					pozice: bunky[0],
					tym: bunky[iCas - 1],
					cas: bunky[iCas],
					// pomlčka ve sloupci Gap = dojela v čase vítězky (hromadný dojezd), ne že vede
					ztrata: gap === '-' || gap === '' ? (bunky[0] === '1' ? 'vede' : 'čas vítězky') : gap,
				};
			};

			try {
				const stranka = (await (await fetch('https://www.letourfemmes.fr/en/rankings', { headers: UA })).text())
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
					itg: '/en/ajax/ranking/2/itg/fca07fb6b35baa3d6dfe2d4500ea91ed/none',
					ite: '/en/ajax/ranking/2/ite/6f21d73eddddbb74e35c0113a43935ca/none',
				};
				const nactiTabulku = async (typ) => {
					const kandidati = [adresy[typ]];
					const ulozenaUrl = await cache.match(new Request('https://cache.wonderly.cz/tour-url-' + typ));
					if (ulozenaUrl) kandidati.push(await ulozenaUrl.text());
					kandidati.push(ZALOZNI[typ]);
					for (const cesta of kandidati) {
						if (!cesta) continue;
						try {
							const htmlTab = await (await fetch('https://www.letourfemmes.fr' + cesta, { headers: UA })).text();
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
				odpoved.chyba = 'letourfemmes.fr nedostupný: ' + e.message;
			}
			// ŽIVÁ TELEMETRIE během jedoucí etapy (racecenter.letourfemmes.fr, veřejné API bez tokenu)
			const BIBY = { 147: 'NOSKOV' };
			try {
				const rc = 'https://racecenter.letourfemmes.fr/api';
				const etapaCislo = odpoved.etapa ?? 1;
				// mimo etapu vracejí endpointy prázdné tělo (HTTP 204) → .json() by spadl
				const nactiJson = async (adresa) => {
					const t = (await (await fetch(adresa, { headers: UA })).text()).trim();
					try { return t ? JSON.parse(t) : null; } catch { return null; }
				};
				const tel = await nactiJson(`${rc}/telemetryCompetitor-2026`);
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
				// tabulky výsledků ukazují poslední DOKONČENOU etapu, živě se přitom jede ta další
				const etapyKZkouseni = [etapaCislo + 1, etapaCislo];
				// český komentář ženská Tour nemusí mít → zkusíme postupně cs, en, fr
				let zive = [];
				hledani: for (const cislo of etapyKZkouseni) {
					for (const jaz of ['cs', 'en', 'fr']) {
						const koment = await nactiJson(`${rc}/publication_${jaz}-2026-${cislo}`);
						// pozor: pole může přijít neprázdné, ale bez záznamů typu „liv" — hledáme dál
						zive = (Array.isArray(koment) ? koment : []).filter((k) => k.type === 'liv');
						if (zive.length) break hledani;
					}
				}
				odpoved.komentar = zive.slice(0, 3).map((k) => ({
					// komentář chodí jako HTML → na stránku patří čistý text
					text: (Array.isArray(k.text) ? k.text.join(' ') : k.text ?? '')
						.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
					cas: k.publicationAt || k.createdAt,
				}));
				let pack = null;
				for (const cislo of etapyKZkouseni) {
					pack = await nactiJson(`${rc}/pack-2026-${cislo}`);
					if (pack?.[0]?.groups?.length) break;
				}
				const skupiny = pack?.[0]?.groups ?? [];
				// ženský racecenter NEVYSÍLÁ telemetrii jednotlivých závodnic (pole je vždy prázdné),
				// posílá jen skupiny → že se jede, poznáme podle stáří posledního záznamu skupin
				const stariMin = pack?.[0]?.date ? (Date.now() - Date.parse(pack[0].date)) / 60000 : null;
				const packCerstvy = stariMin != null && stariMin >= 0 && stariMin < 15;
				odpoved.zavodSeJede = kdokoliZive || packCerstvy;
				odpoved.stariDatMin = stariMin != null ? Math.round(stariMin) : null;
				const c1 = skupiny[0];
				if (packCerstvy && c1?.computedRemainingDistance != null) odpoved.doCileKm = Math.round(c1.computedRemainingDistance / 1000);
				const cisloBibu = (b) => (typeof b === 'object' ? b.bib : b);
				// francouzské názvy skupin patří na český web česky
				const NAZVY = {
					'Tête de la course': 'Čelo závodu',
					Peloton: 'Peloton',
					'Gr. Maillot Jaune': 'Skupina žlutého dresu',
					'Gr. Maillot Vert': 'Skupina zeleného dresu',
					'Gr. Maillot Blanc': 'Skupina bílého dresu',
					'Gr. Maillot à Pois': 'Skupina puntíkatého dresu',
					Distancés: 'Vzadu za pelotonem',
					'Gruppetto': 'Gruppetto (poslední skupina)',
				};
				odpoved.skupiny = [...skupiny]
					.sort((a, b) => (a.computedRelative ?? 0) - (b.computedRelative ?? 0))
					.map((sk) => {
						const biby = (sk.bibs ?? []).map(cisloBibu);
						const nazev = (sk.name ?? '').trim();
						return {
							nazev: NAZVY[nazev] ?? (nazev || 'Skupina'),
							odstupVterin: sk.computedRelative ?? 0,
							pocet: sk.size >= 999 ? null : sk.size, // 999 = velké pole (peloton)
							rychlost: sk.computedSpeed ?? sk.speed ?? null,
							nasi: biby.filter((b) => BIBY[b]).map((b) => BIBY[b]),
						};
					});
				// ke každé jezdkyni doplnit, v jaké je skupině
				for (const sk of odpoved.skupiny) {
					for (const jm of sk.nasi) {
						const j = (odpoved.jezdci[jm] ??= {});
						j.skupina = { nazev: sk.nazev, odstupVterin: sk.odstupVterin };
						// bez telemetrie jednotlivců je skupina jediný zdroj živé pozice —
						// pozici na trati neznáme, odstup a rychlost bereme za celou skupinu
						if (packCerstvy && !j.zive) {
							j.zive = { poziceNaTrati: null, odstupVterin: sk.odstupVterin, rychlost: sk.rychlost, stav: 've skupině' };
						}
					}
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
			// Dřív tu byl rok s příznakem `immutable`, tedy slib „obsah se nikdy
			// nezmění". Jenže videa se opravují (7. 8. 2026 hned třikrát za den),
			// a kdo si stihl stáhnout starou verzi, měl by ji rok — bez šance to
			// poznat. Hodina stačí: v hodině si dítě video pustí znovu z mezipaměti
			// a oprava se rozejde do světa nejpozději za hodinu.
			hlavicky.set('cache-control', 'public, max-age=3600');
			// Po vypršení se prohlížeč zeptá s If-None-Match. Když se soubor
			// nezměnil, pošleme holé 304 a nestahuje se znovu ani bajt — proto
			// kratší doba nestojí skoro nic navíc.
			const zna = request.headers.get('if-none-match');
			if (zna && zna.replace(/^W\//, '') === objekt.httpEtag.replace(/^W\//, '')) {
				return new Response(null, { status: 304, headers: hlavicky });
			}
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

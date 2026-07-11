export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = request.headers.get('host') ?? '';

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

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = request.headers.get('host') ?? '';

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

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = request.headers.get('host') ?? '';

		if (url.pathname === '/') {
			if (host.startsWith('fox.')) {
				url.pathname = '/fox/';
			} else if (host.startsWith('lab.')) {
				url.pathname = '/skola2/';
			}
		}

		return env.ASSETS.fetch(new Request(url, request));
	},
};

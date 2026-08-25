import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
	return [];
};

export async function GET() {
	return new Response(
		JSON.stringify({
			error: 'Use /api/videos.json instead',
			status: 404
		}),
		{
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		}
	);
}

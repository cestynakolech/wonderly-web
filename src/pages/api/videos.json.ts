import { getVideosByRocnik, videa } from '../../data/videa';

export async function GET(): Promise<Response> {
	return new Response(
		JSON.stringify({
			status: 'ok',
			message: 'Video API - staticky generované JSON',
			count: Object.values(videa).flat().length,
			endpoints: {
				allVideos: '/api/videos.json',
				f6: '/api/videos.json?rocnik=F6',
				f7: '/api/videos.json?rocnik=F7',
				f8: '/api/videos.json?rocnik=F8',
				f9: '/api/videos.json?rocnik=F9',
			},
			videa: {
				F6: videa.F6,
				F7: videa.F7,
				F8: videa.F8,
				F9: videa.F9,
			}
		}),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		}
	);
}

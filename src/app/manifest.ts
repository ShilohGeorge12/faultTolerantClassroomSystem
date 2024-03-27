import { MetadataRoute } from 'next';
import { env } from '@/env';

export default function manifest(): MetadataRoute.Manifest {
	return {
		scope: '/',
		lang: 'en',
		name: 'classroom allocation system',
		description: 'classroom allocation system description',
		short_name: 'classroom allocation system',
		start_url: '/',
		display: 'standalone',
		theme_color: 'rgb(203 213 225)',
		background_color: 'rgb(203 213 225)',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '32x32',
				type: 'image/x-icon',
			},
		],
		protocol_handlers: [
			{
				protocol: 'web+classroom-allocation',
				url: env.BASE_URL !== 'null' ? 'https://classroom-allocation.vercel.app/%s' : `http://localhost:${process.env.PORT ?? 5053}/%s`,
			},
		],
	};
}

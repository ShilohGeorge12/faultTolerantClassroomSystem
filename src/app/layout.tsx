import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { env } from '@/env';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

const title = 'classroom allocation system';
const description = '' + title; //add description
const url = env.BASE_URL;

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: title,
		template: `%s | ${title}`,
	},
	description,
	keywords: 'classroom allocation system, classroom management system, classroom allocation app',
	authors: [{ name: 'Shiloh George' }],
	robots: 'index, follow',
	openGraph: {
		title,
		description,
		siteName: 'classroom-allocation', // cross checl later
	},
	twitter: {
		card: 'summary',
		site: url,
		creator: 'Shiloh George',
		images: '/tv-150.png', // cross check later
	},
	alternates: { canonical: url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} w-screen h-screen overflow-hidden `}>
				{children}
				<Toaster
					richColors
					position='bottom-left'
					duration={4000}
					closeButton
					theme={'dark'}
				/>
			</body>
		</html>
	);
}

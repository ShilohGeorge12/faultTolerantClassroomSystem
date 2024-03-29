import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { env } from '@/env';
import { Toaster } from 'sonner';
// import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const title_longName = 'classroom allocation management system';
const title = `CAS - ${title_longName}`;
const description = '' + title_longName; //add description
const url = env.BASE_URL;

export const metadata: Metadata = {
	metadataBase: new URL(url),
	title: {
		default: title,
		template: `%s | ${title_longName}`,
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
			<body className={`${inter.className} text-gray-500 text-sm font-normal font-sans`}>
				{children}
				<Toaster
					richColors
					position='bottom-left'
					duration={4000}
					closeButton
					theme={'light'}
				/>
			</body>
		</html>
	);
}

// home, login, signup

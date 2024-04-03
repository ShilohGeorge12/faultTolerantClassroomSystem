import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-full h-screen flex flex-col overflow-x-hidden`}>
			<section className='flex w-full h-full'>
				<SideBar />
				{children}
			</section>
			<Footer />
		</main>
	);
}

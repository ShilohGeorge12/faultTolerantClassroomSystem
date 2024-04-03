import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-full flex flex-col overflow-y-auto overflow-x-hidden`}>
			<section className='flex w-full h-screen'>
				<SideBar />
				{children}
			</section>
			<Footer />
		</main>
	);
}

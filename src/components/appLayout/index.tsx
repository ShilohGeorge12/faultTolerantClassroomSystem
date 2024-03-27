import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden`}>
			<section className='flex w-full h-full'>
				<SideBar />
				{children}
			</section>
			<Footer />
		</main>
	);
}

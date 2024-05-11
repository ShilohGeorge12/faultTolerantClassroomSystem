import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export async function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-full flex flex-col overflow-y-auto overflow-x-hidden`}>
			<SideBar />
			<section className='flex flex-1 relative min-h-[105vh] md:ml-[15%]'>{children}</section>
			<Footer />
		</main>
	);
}

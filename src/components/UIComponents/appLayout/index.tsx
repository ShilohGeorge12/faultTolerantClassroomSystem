import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export async function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-full flex flex-col overflow-y-auto overflow-x-hidden`}>
			<section className='flex w-full relative min-h-[110vh] '>
				<SideBar />
				{children}
			</section>
			<Footer />
		</main>
	);
}
// h-fit min-h-screen md:h-[120vh] md:min-h-[140vh]
// iphone_sm:min-h-[140vh] h-[122vh]

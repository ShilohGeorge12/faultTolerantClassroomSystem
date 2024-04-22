import { Footer } from '../Footer';
import { SideBar } from '../sideBar';

interface AppLayoutProps {
	children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<main className={`w-full flex flex-col overflow-y-auto overflow-x-hidden`}>
			<section className='flex w-full h-fit min-h-screen md:h-[115vh] relative'>
				<SideBar />
				{children}
			</section>
			<Footer />
		</main>
	);
}
// iphone_sm:min-h-[140vh] h-[122vh]

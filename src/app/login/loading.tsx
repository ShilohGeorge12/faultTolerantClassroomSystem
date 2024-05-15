import { Spinner } from '@/components/UIComponents/loadingSpinner';

export default function Loading() {
	return (
		<main className='w-full h-full flex flex-col'>
			<Spinner />
		</main>
	);
}

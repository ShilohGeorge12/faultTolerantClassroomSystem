import { getSession } from '@/lib/sessions';
import { SideBarClient } from './sideBarClient';

export async function SideBar() {
	const sessions = await getSession();
	return <SideBarClient session={sessions} />;
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRoleSession, verifyHocRoleSession } from './lib/sessions';
// import { updateSession } from './lib/sessions';
// import { UrlPath } from './types';

export async function middleware(req: NextRequest) {
	let response = NextResponse.next();
	// const dynamicHomeRegex = /^\/classrooms\/[^\/]+$/;
	// const dynamicClassroomRegex = /^\/classrooms\/\d+\/[^/]+$/;
	// const authPaths = ['/settings', '/find-classroom'];
	try {
		if (req.nextUrl.pathname.endsWith('/') && !req.nextUrl.pathname.includes('/_next')) {
			return NextResponse.redirect(new URL('/classrooms/1', req.url));
		}

		if ((req.nextUrl.pathname === '/settings' || req.nextUrl.pathname.includes('/settings')) && !req.nextUrl.pathname.includes('/_next')) {
			return verifyAdminRoleSession(req);
		}

		if ((req.nextUrl.pathname === '/admin' || req.nextUrl.pathname.includes('/admin')) && !req.nextUrl.pathname.includes('/_next')) {
			return verifyHocRoleSession(req);
		}

		return response;
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ error: 'invalid token' }, { status: 401 });
		}
		if (error instanceof Error) {
			console.log(error.message);
			return NextResponse.json({ error: 'something went wrong' }, { status: 500 });
		}
	}

	return NextResponse.json({ error: 'sorry something went wrong!' }, { status: 500 });
}

import { NextRequest, NextResponse } from 'next/server';
// import { updateSession } from './lib/sessions';
// import { UrlPath } from './types';

export async function middleware(req: NextRequest) {
	let response = NextResponse.next();
	// const dynamicHomeRegex = /^\/classrooms\/[^\/]+$/;
	// const dynamicClassroomRegex = /^\/classrooms\/\d+\/[^/]+$/;
	// const authPaths = ['/settings', '/find-classroom'];

	try {
		if (req.nextUrl.pathname.endsWith('/')) {
			return NextResponse.redirect(new URL('/classrooms/1', req.url));
		}
		return response;
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		console.log(error);
		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}
	}

	return NextResponse.json({ error: 'sorry something went wrong!' }, { status: 500 });
}

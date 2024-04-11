import { NextRequest, NextResponse } from 'next/server';
// import { verifyAuth } from './lib/verifyAuth';

export async function middleware(req: NextRequest) {
	let response = NextResponse.next();
	// const cookie = req.cookies.get('key');
	try {
		if (req.nextUrl.pathname.endsWith('/')) {
			// console.log(req.nextUrl.href, 'ended with /');
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

import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { loginDetails, sessionType } from '@/types';

const secretKey = process.env.SECRET as string;
const key = new TextEncoder().encode(secretKey);
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;
const expiryTime = new Date(Date.now() + MINUTES * SECONDS * MILLISECONDS);

export async function encrypt(payload: any) {
	return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiryTime).sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ['HS256'],
	});
	return payload;
}

export async function login({ username, userId, role, department }: loginDetails) {
	// Create the session
	const user = {
		username,
		userId,
		role,
		department,
	};

	const session = await encrypt({ user, expires: expiryTime });
	cookies().set('session', session, { expires: expiryTime, httpOnly: true });
	return;
}

export async function logout() {
	// Destroy the session
	cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession(): Promise<sessionType | null> {
	try {
		const session = cookies().get('session');
		if (!session) return null;
		return await decrypt(session.value);
	} catch (err) {
		return null;
	}
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get('session')?.value;
	const res = NextResponse.next();
	if (session) {
		return res;
	}
	return NextResponse.redirect(new URL('/classrooms/1', request.url));
}

export async function verifyAdminRoleSession(req: NextRequest) {
	const res = NextResponse.next();
	const session = req.cookies.get('session')?.value;
	if (!session) return NextResponse.redirect(new URL('/classrooms/1', req.url));

	const parsed = await decrypt(session);
	const role = parsed.user.role;
	if (role === 'admin') return NextResponse.redirect(new URL('/admin', req.url));
	return res;
}

export async function verifyHocRoleSession(req: NextRequest) {
	const res = NextResponse.next();
	const session = req.cookies.get('session');
	if (!session) return NextResponse.redirect(new URL('/classrooms/1', req.url));

	const parsed = await decrypt(session.value);
	const role = parsed.user.role;
	if (role === 'hoc') return NextResponse.redirect(new URL('/settings', req.url));
	return res;
}

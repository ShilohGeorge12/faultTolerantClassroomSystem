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

export async function login({ username, userId, role }: loginDetails) {
	// Create the session
	const user = {
		username,
		userId,
		role,
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

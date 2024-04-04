import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_: NextRequest) {
	return NextResponse.json({}, { status: 200 });
}

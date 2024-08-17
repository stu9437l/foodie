import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json('hello im get api', { status: 200, statusText: 'okay' });
}

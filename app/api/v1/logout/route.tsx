import { errorHandler } from '@/backend/errorHandler';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return errorHandler(405, 'Method not allowed');
  }
  cookies().delete('token');
  return NextResponse.json(
    {
      message: 'Logout Successfull',
    },
    {
      status: 200,
      statusText: '0k',
    }
  );
}

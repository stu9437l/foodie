import { verifyJwtToken } from '@/utils/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';

const Authentication = async (req: NextRequest, res: NextResponse) => {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json('Unauthorized', {
        status: 401,
        statusText: 'UnAuthorized',
      });
    }
    const user = verifyJwtToken(token);
    if (!user) {
      return NextResponse.json('Unauthorized', {
        status: 401,
        statusText: 'UnAuthorized',
      });
    }
    req.user = user;
    return NextResponse.next();
  } catch (error) {
    console.log({ error });
    NextResponse.json('Internal Server Error', {
      status: 500,
      statusText: 'Unauthenticate',
    });
  }
};

export { Authentication };

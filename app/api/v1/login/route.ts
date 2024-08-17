import prisma from '@/prisma/db';
import { comparePassword, passwordHash } from '@/utils/lib/bcrypt';
import { setCookie } from '@/utils/lib/cookie';
import { generateJwt } from '@/utils/lib/jwt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        {
          status: 400,
          statusText: 'Unauthorized',
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json('Invalid Username & Password', {
        status: 400,
        statusText: 'Unauthorized',
      });
    }
    const checkPassword = await comparePassword(password, user?.password ?? ' ');
    if (!checkPassword) {
      return NextResponse.json('Invalid Username & Password', {
        status: 400,
        statusText: 'Unauthorized',
      });
    }
    const { password: _, ...restData } = user;
    console.log({ restData });
    const token = await generateJwt(restData);
    cookies().set('token', token, { secure: true });

    return NextResponse.json(
      {
        id: user?.id,
        token,
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      return NextResponse.json(`'Login Error:' + ${error.message}`, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    } else {
      console.log({ error });
      return NextResponse.json(`'Login Error:' + ${error}`, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  }
}

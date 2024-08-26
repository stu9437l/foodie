import prisma from '@/prisma/db';
import { validateAuthAndAuthorization } from '../../position/route';
import { errorHandler } from '@/backend/errorHandler';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const token: any = request.headers;

    console.log({ newToken: token });
    // const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    // console.log({ isAuthError });
    // if (isAuthError) return isAuthError;
    const foodCategorizedByEmployee = await prisma.food.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            employeeFood: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Food categorized by emplyee's",
      data: foodCategorizedByEmployee,
    });
  } catch {
    return errorHandler(500, 'Internal Server Error');
  }
}

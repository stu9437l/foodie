import { NextResponse } from 'next/server';
import { validateAuthAndAuthorization } from '../../position/route';
import { errorHandler } from '@/backend/errorHandler';
import prisma from '@/prisma/db';

export async function GET(request: Request) {
  try {
    const { url: path } = request;
    const category = path.split('/')[path.split('/').length - 1];
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const employeeFoods = await prisma.employeeFood.findMany({
      where: {
        departmentId: Number(category),
      },
    });
    return NextResponse.json(
      {
        message: 'All employees',
        data: employeeFoods,
      },
      {
        status: 200,
        statusText: 'Ok',
      }
    );
  } catch (err) {
    console.log({ err });
    return errorHandler(500, 'Internal Server Error');
  }
}

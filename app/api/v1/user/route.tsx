import prisma from '@/prisma/db';
import { NextResponse } from 'next/server';
import { validateAuthAndAuthorization } from '../position/route';
import { passwordValidation } from '@/utils/lib/yup';
import { data } from '@/components/BarChart/data';
import { errorHandler } from '@/backend/errorHandler';
import xss from 'xss';
import { passwordHash } from '@/utils/lib/bcrypt';

const findUserById = async (id: number) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingUser) {
    return NextResponse.json(
      {
        messaage: 'User not exist',
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

const isPasswordValidate = async (password: string) => {
  try {
    await passwordValidation.validate(password);
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Validation Error',
        error: err.errors,
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

export async function PATCH(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    let { id, newPassword } = body;
    const existingUser = await findUserById(id);
    if (existingUser) return existingUser;
    const validPassword = await isPasswordValidate(newPassword);
    if (validPassword) return validPassword;

    newPassword = xss(await passwordHash(newPassword));

    const updateduser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        password: newPassword,
      },
    });
    return NextResponse.json(
      {
        message: 'Password udpated successful',
        data: updateduser,
      },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (err) {
    console.log({ err });
    return errorHandler(500, 'Internal Server Error');
  }
}

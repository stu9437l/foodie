
import { isAuthenticate, isAuthorized } from '@/backend/authentication';
import { errorHandler } from '@/backend/errorHandler';
import prisma from '@/prisma/db';
import { positionValidation } from '@/utils/lib/yup';
import { NextResponse } from 'next/server';
import xss from 'xss';

interface AuthProps extends Request {
  user?: any;
}

export const validateAuthAndAuthorization = (request: Request, roles: string[]) => {
  const authResponse = isAuthenticate(request);
  if (authResponse) {
    return authResponse;
  }
  const authorizationRespnse = isAuthorized(request, roles);
  if (authorizationRespnse) {
    return authorizationRespnse;
  }
};

const validatePosition = async (data: any) => {
  try {
    await positionValidation.validate(data, { strict: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Validation error',
        error: err.errors,
      },
      {
        status: 400,
        statusText: 'Validation Error',
      }
    );
  }
};

const findPositionById = async (id: number) => {
  const existingPosition = await prisma.position.findFirst({
    where: {
      id: Number(id),
    },
  });
  console.log({ existingPosition });
  if (!existingPosition) {
    return NextResponse.json(
      {
        message: `Position not exist.`,
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

const findPositionByName = async (name: string) => {
  const existingPosition = await prisma.position.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });
  if (existingPosition) {
    return NextResponse.json(
      {
        message: `${name} position already exist.`,
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

export async function POST(request: Request) {
  try {
    const authError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (authError) return authError;
    const body = await request.json();
    let { name } = body;
    name = xss(name);
    const lowerCaseName = name.toLowerCase();
    const validate = await validatePosition(body);
    if (validate) return validate;
    const existingPosition = await findPositionByName(lowerCaseName);
    if (existingPosition) return existingPosition;
    const newPositon = await prisma.position.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      {
        message: 'New Position created Successfull',
        data: newPositon,
      },
      {
        status: 201,
        statusText: 'ok',
      }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(500, 'error');
  }
}
export async function GET(request: Request, response: Response) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const positons = await prisma.position.findMany();
    console.log({ positons });
    return NextResponse.json(
      {
        message: 'Get',
        data: positons,
      },
      {
        status: 200,
        statusText: 'Oky',
      }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(500, 'Internal Server Error');
  }
}

export async function PUT(request: Request, respnse: Response) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;

    const body = await request.json();
    let { id, name } = body;
    name = xss(name);
    const validate = await validatePosition(body);
    if (validate) return validate;
    const existingPosition = await findPositionById(id);
    if (existingPosition) return existingPosition;
    const updatedPositon = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    return NextResponse.json(
      {
        message: 'Position Update Successfully',
        data: updatedPositon,
      },
      {
        status: 201,
        statusText: 'Ok',
      }
    );
  } catch (err) {
    return errorHandler(500, 'Internal Server Error');
  }
}
export async function DELETE(request: Request, response: Response) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;

    const { id } = await request.json();
    const existingPosition = await findPositionById(id);
    if (existingPosition) return existingPosition;
    await prisma.position.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Position deleted successful',
      },
      {
        status: 200,
        statusText: 'Ok',
      }
    );
  } catch (err) {
    return errorHandler(500, 'Internal Server Error');
  }
}

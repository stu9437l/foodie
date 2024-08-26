import prisma from '@/prisma/db';
import { validateAuthAndAuthorization } from '../position/route';
import { NextResponse } from 'next/server';
import { foodValidation } from '@/utils/lib/yup';
import xss from 'xss';
import { errorHandler } from '@/backend/errorHandler';

const findFoodByName = async (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const existingFood = await prisma.food.findFirst({
    where: {
      name: {
        equals: lowerCaseName,
      },
    },
  });
  console.log({ existingFood });
  if (existingFood) {
    return NextResponse.json(
      {
        message: `${name} is already exist`,
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

export const findFoodById = async (id: number) => {
  const existingFood = await prisma.food.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingFood) {
    return NextResponse.json(
      {
        message: 'Food not exist',
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

const validateFood = async (data: any) => {
  try {
    await foodValidation.validate(data, { strict: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Validation Error',
        error: err.erros,
      },
      {
        status: 400,
        statusText: 'Validation error',
      }
    );
  }
};

export async function POST(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    let { name } = body;
    console.log({ name });
    name = xss(name);
    const isValidate = await validateFood(body);
    if (isValidate) return isValidate;
    const existingFood = await findFoodByName(name);
    if (existingFood) return existingFood;

    const newFood = await prisma.food.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      {
        message: 'New Food is created successful',
        data: newFood,
      },
      {
        status: 201,
        statusText: 'Ok',
      }
    );
  } catch (err) {
    console.log({ err });
    return errorHandler(500, 'Internal Server Error');
  }
}
export async function GET(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const foods = await prisma.food.findMany();
    return NextResponse.json(
      {
        message: 'All foods',
        data: foods,
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
export async function PUT(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    const isValidate = await validateFood(body);
    if (isValidate) return isValidate;
    let { id, name } = body;
    name = xss(name);
    const existingFood = await findFoodById(id);
    if (existingFood) return existingFood;
    const updatedFood = await prisma.food.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      {
        message: 'Food udpated successfully',
        data: updatedFood,
      },
      {
        status: 201,
        statusText: 'Ok',
      }
    );
  } catch (err) {
    return errorHandler(500, 'Internal Server error');
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const { id } = await request.json();
    const existingFood = await findFoodById(id);
    if (existingFood) return existingFood;
    await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Food deleted Successfull',
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

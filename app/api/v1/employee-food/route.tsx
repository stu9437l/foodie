import prisma from '@/prisma/db';
import { validateAuthAndAuthorization } from '../position/route';
import { NextResponse } from 'next/server';
import { employeeFoodValidation } from '@/utils/lib/yup';
import xss from 'xss';
import { errorHandler } from '@/backend/errorHandler';
import { findEmployeeById } from '../employee/route';
import { findFoodById } from '../food/route';

const validateByCreatedDate = async (employeeId: number) => {
  const existingEmployeeFood: any = await prisma.employee.findFirst({
    where: {
      id: Number(employeeId),
    },
    include: {
      employeeFood: true,
    },
  });
  if (existingEmployeeFood && existingEmployeeFood?.employeeFood.length > 0) {
    const currentTime = new Date();

    const isCreatedWithin24Hours = existingEmployeeFood.employeeFood.some((food: any) => {
      const timeDifference = currentTime.getTime() - food.createdAt.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      return hoursDifference <= 24;
    });

    if (isCreatedWithin24Hours) {
      return NextResponse.json(
        {
          message: `EmployeeFood was already created`,
        },
        {
          status: 400,
          statusText: 'Bad Request',
        }
      );
    }
  }
};

const findEmployeeFoodById = async (id: number) => {
  const existingEmployeeFood = await prisma.employeeFood.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingEmployeeFood) {
    return NextResponse.json(
      {
        message: 'Employee Food not exist',
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

const validateEmployeeFood = async (data: any) => {
  try {
    await employeeFoodValidation.validate(data, { strict: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Validation Error',
        error: err.errros,
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
    const isValidate = await validateEmployeeFood(body);
    if (isValidate) return isValidate;
    let { employeeId, foodId, remarks, createdAt, updatedAt } = body;
    employeeId = xss(employeeId);
    foodId = xss(foodId);
    remarks = xss(remarks);

    const existingEmployee = await findEmployeeById(employeeId);
    if (existingEmployee) return existingEmployee;

    const existingFood = await findFoodById(foodId);
    if (existingFood) return existingFood;
    const validateEmployeeFoodbyDate = await validateByCreatedDate(employeeId);
    if (validateEmployeeFoodbyDate) return validateEmployeeFoodbyDate;

    const newEmployeeFood = await prisma.employeeFood.create({
      data: {
        employeeId: Number(employeeId),
        foodId: Number(foodId),
        remarks,
        createdAt,
        updatedAt,
      },
    });
    return NextResponse.json(
      {
        message: 'New Employee food is created successful',
        data: newEmployeeFood,
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
    const employeeFoods = await prisma.employeeFood.findMany();
    return NextResponse.json(
      {
        message: 'All EmployeeFoods',
        data: employeeFoods,
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
    const isValidate = await validateEmployeeFood(body);
    if (isValidate) return isValidate;

    let { id, employeeId, foodId, remarks, createdAt } = body;
    employeeId = xss(employeeId);
    foodId = xss(foodId);
    remarks = xss(remarks);

    const existingEmployeeFood = await findEmployeeFoodById(id);
    if (existingEmployeeFood) return existingEmployeeFood;
    const udpatedEmployeeFood = await prisma.employeeFood.update({
      where: {
        id: Number(id),
      },
      data: {
        employeeId: Number(employeeId),
        foodId: Number(foodId),
        remarks,
        createdAt,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: 'Employee food udpated successfully',
        data: udpatedEmployeeFood,
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
    const existingEmployeeFood = await findEmployeeFoodById(id);
    if (existingEmployeeFood) return existingEmployeeFood;
    await prisma.employeeFood.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Employee food deleted Successfull',
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

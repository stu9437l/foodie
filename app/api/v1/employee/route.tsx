import { errorHandler } from '@/backend/errorHandler';
import prisma from '@/prisma/db';
import { parseJwt } from '@/utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { validateAuthAndAuthorization } from '../position/route';
import { employeeValidation } from '@/utils/lib/yup';
import xss from 'xss';
import { passwordHash } from '@/utils/lib/bcrypt';

const validateEmployee = async (data: any) => {
  try {
    await employeeValidation.validate(data, { strict: true });
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

const findEmployeeByEmail = async (email: string) => {
  const existingEmployee = await prisma.employee.findFirst({
    where: {
      email: email,
    },
  });
  console.log({ existingEmployee });
  if (existingEmployee) {
    return NextResponse.json(
      {
        message: `${email} is already exist`,
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

export const findEmployeeById = async (id: number) => {
  const existingEmployee = await prisma.employee.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingEmployee) {
    return NextResponse.json(
      {
        message: 'Employee Not Found',
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};
export async function POST(request: Request, response: Response) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    const isValidate = await validateEmployee(body);
    if (isValidate) return isValidate;

    let { name, email, image, phone, address, positionId, departmentId, foodId, empId } = body;
    name = xss(name);
    email = xss(email);
    image = xss(image);
    phone = xss(phone);

    const password = xss(await passwordHash(empId.toString()));
    address = xss(address);
    positionId = xss(positionId);
    departmentId = xss(departmentId);
    foodId = xss(foodId);

    const existingEmployee = await findEmployeeByEmail(email);
    if (existingEmployee) return existingEmployee;

    const newUser = await prisma.employee.create({
      data: {
        name,
        email,
        image,
        password,
        empId,
        phone,
        address,
        positionId: Number(positionId),
        departmentId: Number(departmentId),
        foodId: Number(foodId),
      },
    });

    return NextResponse.json(
      {
        message: 'User Created SuccessFull!',
        data: newUser,
      },
      { status: 201, statusText: 'ok' }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(500, 'Internal Server Error');
  }
}
export async function GET(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const employees = await prisma.employee.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        image: true,
        phone: true,
        address: true,
        departmentId: true,
        positionId: true,
        foodId: true,
      },
    });
    return NextResponse.json(
      {
        message: 'All employee',
        data: employees,
      },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (error) {
    return errorHandler(500, 'Internal Server Error');
  }
}

export async function PUT(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;

    const body = await request.json();
    const isValidate = await validateEmployee(body);
    if (isValidate) return isValidate;

    let { id, name, email, image, password, phone, address, positionId, departmentId, foodId } =
      body;
    name = xss(name);
    email = xss(email);
    image = xss(image);
    phone = xss(phone);
    password = xss(password);
    address = xss(address);
    positionId = xss(positionId);
    departmentId = xss(departmentId);
    foodId = xss(foodId);

    const existingEmployee = await findEmployeeById(id);
    if (existingEmployee) return existingEmployee;

    const updateduser = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        image,
        password,
        phone,
        address,
        positionId: Number(positionId),
        departmentId: Number(departmentId),
        foodId: Number(foodId),
      },
    });

    return NextResponse.json(
      {
        message: 'User udpated Successfully',
        data: updateduser,
      },
      {
        status: 200,
        statusText: 'ok',
      }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(500, 'Internal Server Error');
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const { id } = await request.json();
    const existingEmployee = await findEmployeeById(id);
    if (existingEmployee) return existingEmployee;
    await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Employee deleted successful',
      },
      {
        status: 400,
        statusText: 'OK',
      }
    );
  } catch (err) {
    console.log(err);
    return errorHandler(500, 'Internal Server Error');
  }
}

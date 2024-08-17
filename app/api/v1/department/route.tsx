import prisma from '@/prisma/db';
import { validateAuthAndAuthorization } from '../position/route';
import { NextResponse } from 'next/server';
import { departmentValidation } from '@/utils/lib/yup';
import xss from 'xss';
import { errorHandler } from '@/backend/errorHandler';

const findDepartmentByName = async (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const existingDepartment = await prisma.department.findFirst({
    where: {
      name: {
        equals: lowerCaseName,
      },
    },
  });
  console.log({ existingDepartment });
  if (existingDepartment) {
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

const findDepartmentById = async (id: number) => {
  const existingDepartment = await prisma.department.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingDepartment) {
    return NextResponse.json(
      {
        message: 'Department not exist',
      },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }
};

const validateDepartment = async (data: any) => {
  try {
    await departmentValidation.validate(data, { strict: true });
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
    let { name } = body;
    console.log({ name });
    name = xss(name);
    const isValidate = await validateDepartment(body);
    if (isValidate) return isValidate;
    const existingDepartment = await findDepartmentByName(name);
    if (existingDepartment) return existingDepartment;

    const newDepartment = await prisma.department.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      {
        message: 'New Department is created successful',
        data: newDepartment,
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
    const departments = await prisma.department.findMany();
    return NextResponse.json(
      {
        message: 'All Departments',
        data: departments,
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
    const isValidate = await validateDepartment(body);
    if (isValidate) return isValidate;
    let { id, name } = body;
    name = xss(name);
    const existingDepartment = await findDepartmentById(id);
    if (existingDepartment) return existingDepartment;
    const udpatedDepartment = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      {
        message: 'Department udpated successfully',
        data: udpatedDepartment,
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
    const existingDepartment = await findDepartmentById(id);
    if (existingDepartment) return existingDepartment;
    await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Department deleted Successfull',
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

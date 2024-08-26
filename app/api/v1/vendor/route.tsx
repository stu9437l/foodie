import { vendorInfoValidation } from '@/utils/lib/yup';
import { validateAuthAndAuthorization } from '../position/route';
import { NextResponse } from 'next/server';
import xss from 'xss';
import { errorHandler } from '@/backend/errorHandler';
import prisma from '@/prisma/db';

const validateVendorInfo = async (data: any) => {
  try {
    await vendorInfoValidation.validate(data, { strict: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Validation Error',
        error: err.errors,
      },
      {
        status: 400,
        statusText: 'Validation error',
      }
    );
  }
};

const findVendorByName = async (name: string) => {
  const lowerCaseName = name.toLowerCase();
  const isexistingVendor = await prisma.vendor.findFirst({
    where: {
      name: {
        equals: lowerCaseName,
      },
    },
  });
  console.log({ isexistingVendor });
  if (isexistingVendor) {
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
export async function POST(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    console.log({ body });
    const isValidate = await validateVendorInfo(body);
    if (isValidate) return isValidate;
    console.log({ isValidate });

    let { phone, email, address, officeHour, name } = body;
    const existingVendor = await findVendorByName(name);
    if (existingVendor) return existingVendor;
    console.log({ existingVendor });

    phone = xss(phone);
    email = xss(email);
    address = xss(address);
    officeHour = xss(officeHour);
    name = xss(name);

    const newVendor = await prisma.vendor.create({
      data: {
        phone: phone,
        email: email,
        address: address,
        officeHour: officeHour,
        name: name,
      },
    });

    console.log({
      phone: phone,
      email: email,
      address: address,
      officeHour: officeHour,
      name: name,
    });
    return NextResponse.json(
      {
        message: 'Vendor information created successfully',
        data: newVendor,
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

export async function PUT(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const body = await request.json();
    const isValidate = await validateVendorInfo(body);
    if (isValidate) return isValidate;
    let { id, phone, email, address, officeHour, name } = body;
    phone = xss(phone);
    email = xss(email);
    address = xss(address);
    officeHour = xss(officeHour);
    const updatedVendor = await prisma.vendor.update({
      where: {
        id: Number(id),
      },
      data: {
        phone,
        email,
        address,
        officeHour,
        name,
      },
    });
    return NextResponse.json(
      {
        message: 'Vendor udpate successfully',
        data: updatedVendor,
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

export async function GET(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;

    const vendors = await prisma.vendor.findMany();
    return NextResponse.json(
      {
        message: 'All Vendors',
        data: vendors,
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

export async function DELETE(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;
    const { id } = await request.json();
    const vendors = await prisma.vendor.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      {
        message: 'Vendor Deleted Successfull',
        data: vendors,
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

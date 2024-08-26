import prisma from '@/prisma/db';
import { validateAuthAndAuthorization } from '../../position/route';
import { errorHandler } from '@/backend/errorHandler';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const isAuthError = validateAuthAndAuthorization(request, ['ADMIN']);
    if (isAuthError) return isAuthError;

    const foodsId = [1, 2, 3, 4, 5, 6];

    const foods = await prisma.food.findMany();
    console.log({ foods });

    // Create a mapping of foodId to foodName
    const foodIdToName: { [foodId: number]: string } = {};
    foods.forEach((food) => {
      foodIdToName[food.id] = food.name;
    });

    // Fetch departments and related employeeFood records
    const departments = await prisma.department.findMany({
      include: {
        employeeFood: true,
      },
    });

    // Initialize an empty result object
    const result: { [departmentName: string]: { [foodName: string]: number } } = {};

    // Process each department
    departments.forEach((department) => {
      // Initialize an empty dictionary for each department
      result[department.name] = {};

      // Initialize counts for all food names to 0
      Object.values(foodIdToName).forEach((foodName) => {
        result[department.name][foodName] = 0;
      });

      // Count the number of employeeFood records for each foodId
      department.employeeFood.forEach((food) => {
        const foodName = foodIdToName[food.foodId];
        if (foodName) {
          result[department.name][foodName]++;
        }
      });
    });
    console.log({ result });

    return NextResponse.json({
      message: 'Department with the food category count',
      data: result,
    });
  } catch (err) {
    console.log({ err });
    return errorHandler(500, 'Internal Server Error');
  }
}

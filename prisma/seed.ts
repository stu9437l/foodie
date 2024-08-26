import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.department.create({
    data: {
      name: 'FinTech',
    },
  });

  await prisma.food.createMany({
    data: [
      {
        name: 'Fruits',
      },
      {
        name: 'Veg Rice',
      },
      {
        name: 'Non-veg Rice',
      },
      {
        name: 'Veg Chappati',
      },
      {
        name: 'Non-veg Chappati',
      },
    ],
  });

  await prisma.position.create({
    data: {
      name: 'Software Developer',
    },
  });

  const employee: any = {
    name: 'user',
    email: 'user@gmail.com',
    role: 'USER',
    phone: '9800123456',
    address: 'kathamandu',
    empId: 1,
    password: '$2a$10$eqXt.8kKM9kFCDT6oLOfP.zbZtJ.6JVB5sTEX6Q64ujiL6XQs0Lyu', // emp id
    positionId: 1,
    departmentId: 1,
    foodId: 1,
  };

  await prisma.employee.create({
    data: employee,
  });

  const user: any = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: '$2a$10$qOsegDdjd6V2Rr7SxzQlEucrZf9BnHIsUgIU6B/Y3dzRdvVHMhAg.', //password
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    profilePic: 'https://example.com/alice.jpg',
    bio: 'Administrator',
    phoneNumber: '9801234567',
  };

  await prisma.user.create({
    data: user,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default prisma;

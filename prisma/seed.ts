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

  const user: any = {
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    password: '$2b$10$yenH1tN5TnaXN3kw5jJLteFXJA89ZJDvOlnPIlcOVchkjgT4cO0TC',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    profilePic: 'https://example.com/alice.jpg',
    bio: 'Administrator',
    phoneNumber: '123-456-7890',
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

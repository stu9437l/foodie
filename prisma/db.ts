import { PrismaClient } from '@prisma/client';

// Create a function to instantiate Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global variable to store the Prisma Client instance in non-production environments
declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

// Check if the Prisma Client instance is already available globally
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Store the Prisma Client instance globally in non-production environments to avoid multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

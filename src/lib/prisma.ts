import { PrismaClient } from '@prisma/client';

// Singleton function to create and manage a single PrismaClient instance
const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  // Handle connection errors
  prisma.$connect().catch(error => {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1); // Exit on connection failure
  });

  // Disconnect PrismaClient on application shutdown
  process.on('beforeExit', async () => {
    await prisma.$disconnect(); // Close database connection
  });

  return prisma; // Return the PrismaClient instance
};

// Type for the singleton PrismaClient instance
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Store PrismaClient instance in `globalThis` for reuse in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Reuse existing instance or create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// Persist instance in `globalThis` during development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

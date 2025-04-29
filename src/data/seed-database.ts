import { PrismaClient } from '@prisma/client';
import { initialData } from './seed';
import { countries } from './seed-countries';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async prisma => {
      // Clear existing data
      await prisma.productImage.deleteMany();
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
      await prisma.userAddress.deleteMany();
      await prisma.user.deleteMany();
      await prisma.country.deleteMany();

      const { categories, products, users } = initialData;

      // Seed users
      await prisma.user.createMany({ data: users });

      // Seed countries
      await prisma.country.createMany({ data: countries });

      // Seed categories
      const categoriesData = categories.map(category => ({ name: category }));
      await prisma.category.createMany({ data: categoriesData });

      // Create a map of category names to their IDs
      const categoriesInDatabase = await prisma.category.findMany();
      const categoriesMap = categoriesInDatabase.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
      }, {} as Record<string, string>);

      // Seed products and their images
      for (const product of products) {
        const { images, type, ...rest } = product;

        const productDatabase = await prisma.product.create({
          data: { ...rest, categoryId: categoriesMap[type] },
        });

        const imagesData = images.map(image => ({
          url: image,
          productId: productDatabase.id,
        }));

        await prisma.productImage.createMany({ data: imagesData });
      }
    });

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  main();
}

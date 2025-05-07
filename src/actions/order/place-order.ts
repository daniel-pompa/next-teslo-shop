'use server';
import prisma from '@/lib/prisma';
import type { Address, Size } from '@/interfaces';
import { auth } from '@/auth';
import { calculateShippingCost } from '@/utils';

interface CartItem {
  productId: string;
  quantity: number;
  size: Size;
}

const TAX_RATE = 0.09; // Tax rate (9%)

export const placeOrder = async (cartItems: CartItem[], address: Address) => {
  // 1. Verify that the user is authenticated
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'You are not logged in. Please log in to place an order.',
    };
  }

  // 2. Fetch product data from the database based on cart item IDs
  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: cartItems.map(item => item.productId),
      },
    },
  });

  // 3. Ensure all products exist
  if (dbProducts.length !== cartItems.length) {
    return {
      ok: false,
      message: 'Some products in your cart no longer exist.',
    };
  }

  // 4. Check for any invalid (zero or negative) prices
  const invalidProduct = dbProducts.find(p => p.price <= 0);
  if (invalidProduct) {
    return {
      ok: false,
      message: `Product "${invalidProduct.title}" has an invalid price.`,
    };
  }

  // 5. Calculate subtotal, tax and item count
  let subtotal = 0;
  let tax = 0;
  let itemsInOrder = 0;

  for (const item of cartItems) {
    const product = dbProducts.find(p => p.id === item.productId)!;
    const itemSubtotal = product.price * item.quantity;
    subtotal += itemSubtotal;
    tax += itemSubtotal * TAX_RATE;
    itemsInOrder += item.quantity;
  }

  subtotal = Number(subtotal.toFixed(2));
  tax = Number(tax.toFixed(2));

  // 6. Calculate shipping and total
  const totalBeforeShipping = subtotal + tax;
  const shippingCost = itemsInOrder === 0 ? 0 : calculateShippingCost(subtotal);
  const total = Number((totalBeforeShipping + shippingCost).toFixed(2));

  try {
    // 7. Start Prisma transaction
    const transactionResult = await prisma.$transaction(async tx => {
      // 8. Check stock and decrement in sequence
      for (const product of dbProducts) {
        const quantityToDecrement = cartItems
          .filter(item => item.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (quantityToDecrement > product.inStock) {
          throw new Error(`${product.title} does not have enough stock.`);
        }

        await tx.product.update({
          where: { id: product.id },
          data: {
            inStock: { decrement: quantityToDecrement },
          },
        });
      }

      // 9. Create order and associated items
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          tax,
          shippingCost,
          total,
          OrderItem: {
            createMany: {
              data: cartItems.map(item => {
                const product = dbProducts.find(p => p.id === item.productId)!;
                return {
                  quantity: item.quantity,
                  size: item.size,
                  productId: item.productId,
                  price: product.price,
                };
              }),
            },
          },
        },
      });

      // 10. Create delivery address for the order
      const { country, ...addressFields } = address;
      const deliveryAddress = await tx.orderAddress.create({
        data: {
          ...addressFields,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        deliveryAddress,
      };
    });

    // 11. Return success response
    return {
      ok: true,
      order: transactionResult.order,
    };
  } catch (error: unknown) {
    // 12. Handle and return any transaction errors
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Unexpected error placing order.',
    };
  }
};

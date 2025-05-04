'use server';
import prisma from '@/lib/prisma';
import type { Address, Size } from '@/interfaces';
import { auth } from '@/auth';

interface CartItem {
  productId: string;
  quantity: number;
  size: Size;
}

// Tax rate set to 9%
const TAX_RATE = 0.09;

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

  // 2. Retrieve products from the database based on cart items
  const dbProducts = await prisma.product.findMany({
    where: {
      id: {
        in: cartItems.map(item => item.productId),
      },
    },
  });

  // 3. Compute order summary values
  const itemsInOrder = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { subtotal, tax, total } = cartItems.reduce(
    (orderTotals, item) => {
      const product = dbProducts.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const itemSubtotal = product.price * item.quantity;
      orderTotals.subtotal += itemSubtotal;
      orderTotals.tax += itemSubtotal * TAX_RATE;
      orderTotals.total += itemSubtotal * (1 + TAX_RATE);
      return orderTotals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  try {
    const transactionResult = await prisma.$transaction(async tx => {
      // 4. Update product stock based on cart
      const updatedProducts = await Promise.all(
        dbProducts.map(async product => {
          const quantityToDecrement = cartItems
            .filter(item => item.productId === product.id)
            .reduce((acc, item) => acc + item.quantity, 0);

          if (quantityToDecrement === 0) {
            throw new Error(`Invalid quantity for product ${product.title}`);
          }

          const updatedProduct = await tx.product.update({
            where: { id: product.id },
            data: {
              inStock: { decrement: quantityToDecrement },
            },
          });

          if (updatedProduct.inStock < 0) {
            throw new Error(`${updatedProduct.title} is out of stock`);
          }

          return updatedProduct;
        })
      );

      // 5. Validate that all product prices are positive
      const hasInvalidPrice = cartItems.some(item => {
        const price = dbProducts.find(p => p.id === item.productId)?.price ?? 0;
        return price <= 0;
      });

      if (hasInvalidPrice) {
        throw new Error('One or more products have an invalid price');
      }

      // 6. Create order with order items
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: cartItems.map(item => ({
                quantity: item.quantity,
                size: item.size,
                productId: item.productId,
                price: dbProducts.find(p => p.id === item.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 7. Store delivery address for the order
      const { country, ...addressFields } = address;

      const deliveryAddress = await tx.orderAddress.create({
        data: {
          ...addressFields,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts,
        order,
        deliveryAddress,
      };
    });

    return {
      ok: true,
      order: transactionResult.order,
      transactionResult,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error placing order';
    return {
      ok: false,
      message: errorMessage,
    };
  }
};

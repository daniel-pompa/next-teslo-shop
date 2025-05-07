'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export const getOrderById = async (id: string) => {
  // 1. Verify if the user is authenticated
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: 'You are not logged in.',
    };
  }

  try {
    // 2. Get order by ID from the database
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: {
            country: true, // Include the country information associated with the order
          },
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true, // Include the first image of the product
                  },
                  take: 1, // Limit the number of images to 1
                },
              },
            },
          },
        },
      },
    });

    // 3. Check if the order exists
    if (!order) {
      return {
        ok: false,
        message: `Order with ID ${id} not found.`,
      };
    }

    // 4. Verify if the user is authorized to view the order
    // Only the user who placed the order or an administrator can view it
    if (session.user.role === 'user' && session.user.id !== order.userId) {
      return {
        ok: false,
        message: 'You are not authorized to view this order.',
      };
    }

    // 5. Return the order information if everything is correct
    return {
      ok: true,
      order,
    };
  } catch (error) {
    // 6. Handling errors
    // Error log in the development environment for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('[GET_ORDER_BY_ID_ERROR]', error);
    }

    // Return a generic error message in case of failure
    return {
      ok: false,
      message: 'Unable to retrieve the order. Please try again later.',
    };
  }
};

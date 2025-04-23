'use server';
import { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const userAddress = await createOrUpdateUserAddress(address, userId);
    return { ok: true, address: userAddress };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[SET_USER_ADDRESS_ERROR]', error);
    }
    return {
      ok: false,
      message: 'Unable to set user address. Please try again later.',
    };
  }
};

const createOrUpdateUserAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      zipCode: address.zipCode,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    throw new Error('Failed to create or update user address', { cause: error });
  }
};

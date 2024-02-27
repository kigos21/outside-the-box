import { Customer } from '@/types';
import { prismaClient } from '@/lib/prismaClient';

export const register = async (customer: Customer): Promise<Customer> => {
  const createCustomer = await prismaClient.customer.create({ data: customer });
  return createCustomer;
};

export const login = async (username: string, password: string) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return res;
};

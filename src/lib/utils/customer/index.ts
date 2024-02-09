import { Customer } from '@/types';
import { prismaClient } from '@/lib/prismaClient';

export const register = async (customer: Customer): Promise<Customer> => {
  const createCustomer = await prismaClient.customer.create({ data: customer });
  console.log('\n\nCreate User Result: ' + createCustomer);
  return createCustomer;
};

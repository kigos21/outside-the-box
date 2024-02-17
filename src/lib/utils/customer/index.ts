import { Customer } from '@/types';
import { prismaClient } from '@/lib/prismaClient';

export const register = async (customer: Customer): Promise<Customer> => {
  const createCustomer = await prismaClient.customer.create({ data: customer });
  console.log('\n\nCreate User Result: ' + createCustomer);
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

  if (res.ok) {
    const { success, customer, token } = await res.json();
    // Store the token securely in cookie
    document.cookie = `token=${token}; path=/; Secure;`;
    return { success: success, customer: customer };
  } else {
    const { message } = await res.json();
    throw new Error(message);
  }
};

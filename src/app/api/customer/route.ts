import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('POST /api/customer called');
  if (req.method === 'POST') {
    const { firstName, lastName } = req.body;

    try {
      const customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
        },
      });

      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

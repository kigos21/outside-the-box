// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.get(
  '/api/logs',
  async (
    req: any,
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    },
  ) => {
    try {
      const logs = await prisma.log.findMany();
      res.json(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

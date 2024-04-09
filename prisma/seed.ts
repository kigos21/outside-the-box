const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  // ---------------------------------- ADMIN ----------------------------------
  const adminId = '5938312e-8300-465f-913a-5683ebfd40b5';
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: adminId,
      username: 'admin',
      password: '$2b$10$tMVYz3YhD4iIGTF9I4qe/OeTQmIOhdGMROM8R2Mm1pjbA/jJ98lpW',
      contactNumber: '09994290018',
    },
  });

  console.log({ admin });

  // ---------------------------------- SERVICE ----------------------------------
  const service1_id = '3c5264c1-c12a-473d-8648-524fa71b8266';
  const service1 = await prisma.service.upsert({
    where: { id: service1_id },
    update: {},
    create: {
      id: service1_id,
      name: '1 hour',
      hours: 1,
      price: 89,
      type: 'Regular',
      archived: false,
    },
  });

  const service2_id = '06275250-ab91-47a3-9244-cefd8de3df34';
  const service2 = await prisma.service.upsert({
    where: { id: service2_id },
    update: {},
    create: {
      id: service2_id,
      name: '2 hours',
      hours: 2,
      price: 149,
      type: 'Regular',
      archived: false,
    },
  });

  const service3_id = '057847af-3553-46cd-9844-a0f3f273be4d';
  const service3 = await prisma.service.upsert({
    where: { id: service3_id },
    update: {},
    create: {
      id: service3_id,
      name: '3 hours',
      hours: 3,
      price: 169,
      type: 'Regular',
      archived: false,
    },
  });

  const service4_id = '6f3797a1-340b-4d0d-9b68-9bf967ead87b';
  const service4 = await prisma.service.upsert({
    where: { id: service4_id },
    update: {},
    create: {
      id: service4_id,
      name: '5 hours',
      hours: 5,
      price: 269,
      type: 'Regular',
      archived: false,
    },
  });

  const service5_id = '1911b190-3d0b-401a-ad33-f83e0920c9a2';
  const service5 = await prisma.service.upsert({
    where: { id: service5_id },
    update: {},
    create: {
      id: service5_id,
      name: '7 hours',
      hours: 7,
      price: 329,
      type: 'Regular',
      archived: false,
    },
  });

  const service6_id = 'de8be312-3945-480f-a367-7ef2974bfa28';
  const service6 = await prisma.service.upsert({
    where: { id: service6_id },
    update: {},
    create: {
      id: service6_id,
      name: 'Whole day',
      hours: 24,
      price: 500,
      type: 'Regular',
      archived: false,
    },
  });

  // DISCONNECT PRISMA
  await prisma.$disconnect();
}

main();

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

  // ---------------------------------- CUSTOMER ----------------------------------
  const aliceId = 'c22aa3d8-5a5e-40a4-ab54-2995ed897542';
  const alice = await prisma.customer.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      id: aliceId,
      firstName: 'Alice',
      lastName: 'Chen',
      occupation: 'Student',
      affiliation: 'UST',
      mobileNumber: '09271779395',
      username: 'alice',
      password: '$2b$10$XlakXNmazGAL61w3G2aFsOUE3Q40Znyeo8uAvw97eU/mHFv0J43ke',
    },
  });

  const bobId = '58cc13ee-fc8b-4a53-bec0-d830077d0650';
  const bob = await prisma.customer.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      id: bobId,
      firstName: 'Bob',
      lastName: 'James',
      occupation: 'Student',
      affiliation: 'FEU',
      mobileNumber: '09271779395',
      username: 'bob',
      password: '$2b$10$XlakXNmazGAL61w3G2aFsOUE3Q40Znyeo8uAvw97eU/mHFv0J43ke',
    },
  });

  console.log({ alice, bob });

  // ---------------------------------- FACILITY RESERVATION ----------------------------------
  const facility1_Id = '18c3f9a0-167b-45b2-8d81-72cb13e0b948';

  const startTime = new Date();
  const endTime = new Date();

  startTime.setHours(13, 30, 0, 0);
  endTime.setHours(16, 30, 0, 0);

  const facility1 = await prisma.facilityReservation.upsert({
    where: { id: facility1_Id },
    update: {},
    create: {
      id: facility1_Id,
      customerId: aliceId,
      startDateTime: startTime,
      endDateTime: endTime,
      price: 200.0,
    },
  });

  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(4, 0, 0, 0);

  const facility2_Id = '4cf3c0ba-56de-4e0f-895f-0a67d9bf0fc3';
  const facility2 = await prisma.facilityReservation.upsert({
    where: { id: facility2_Id },
    update: {},
    create: {
      id: facility2_Id,
      customerId: bobId,
      startDateTime: startTime,
      endDateTime: endTime,
      price: 300.0,
    },
  });

  console.log({ facility1, facility2 });

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

  // ---------------------------------- LOG ----------------------------------
  const timeIn = new Date();
  const timeOut = new Date();

  timeIn.setHours(12, 0, 0, 0);
  timeOut.setHours(13, 0, 0, 0);

  const log1_Id = 'd6c6e2e6-338a-48bf-ae59-241580d1cd71';
  const log1 = await prisma.log.upsert({
    where: { id: log1_Id },
    update: {},
    create: {
      id: log1_Id,
      customerId: aliceId,
      serviceId: service1_id,
      timeIn,
      timeOut,
    },
  });

  timeIn.setHours(14, 0, 0, 0);
  timeOut.setHours(15, 0, 0, 0);

  const log2_Id = 'fbcf7b1e-c655-4a97-9ffb-1e6d49011e4e';
  const log2 = await prisma.log.upsert({
    where: { id: log2_Id },
    update: {},
    create: {
      id: log2_Id,
      customerId: bobId,
      serviceId: service1_id,
      timeIn,
      timeOut,
    },
  });

  timeIn.setHours(16, 0, 0, 0);
  timeOut.setHours(19, 0, 0, 0);

  const log3_Id = 'f600c78d-67bf-4772-8013-1908450175b8';
  const log3 = await prisma.log.upsert({
    where: { id: log3_Id },
    update: {},
    create: {
      id: log3_Id,
      customerId: aliceId,
      serviceId: service3_id,
      timeIn,
      timeOut,
    },
  });

  // ---------------------------------- SEAT RESERVATION ----------------------------------
  startTime.setHours(7, 0, 0, 0);
  endTime.setHours(8, 0, 0, 0);

  const seat1_Id = '4e005317-efba-440e-8d73-94377190ce78';
  const seat1 = await prisma.seatReservation.upsert({
    where: { id: seat1_Id },
    update: {},
    create: {
      id: seat1_Id,
      customerId: aliceId,
      serviceId: service1_id,
      startDateTime: startTime,
      endDateTime: endTime,
    },
  });

  startTime.setHours(4, 0, 0, 0);
  endTime.setHours(6, 0, 0, 0);

  const seat2_Id = '74a7d588-5889-45d1-82d0-bc62d189f315';
  const seat2 = await prisma.seatReservation.upsert({
    where: { id: seat2_Id },
    update: {},
    create: {
      id: seat2_Id,
      customerId: bobId,
      serviceId: service2_id,
      startDateTime: startTime,
      endDateTime: endTime,
    },
  });

  startTime.setHours(17, 0, 0, 0);
  endTime.setHours(20, 0, 0, 0);

  const seat3_Id = '2fce1027-960a-466e-ab5f-6a0762bc7064';
  const seat3 = await prisma.seatReservation.upsert({
    where: { id: seat3_Id },
    update: {},
    create: {
      id: seat3_Id,
      customerId: bobId,
      serviceId: service3_id,
      startDateTime: startTime,
      endDateTime: endTime,
    },
  });

  startTime.setHours(21, 0, 0, 0);
  endTime.setHours(22, 0, 0, 0);

  const seat4_Id = '29508343-5cda-4d13-996f-0d0665ee19d9';
  const seat4 = await prisma.seatReservation.upsert({
    where: { id: seat4_Id },
    update: {},
    create: {
      id: seat4_Id,
      customerId: aliceId,
      serviceId: service1_id,
      startDateTime: startTime,
      endDateTime: endTime,
    },
  });

  // ---------------------------------- CONFIRMED RESERVATION ----------------------------------

  const confirmed1_Id = '38ec81ef-2064-411b-b114-4c1bbcb8b845';
  const confirmed1 = await prisma.confirmedReservation.upsert({
    where: { id: confirmed1_Id },
    update: {},
    create: {
      id: confirmed1_Id,
      seatReservationId: seat1_Id,
    },
  });

  const confirmed2_Id = 'c8e8b996-0d8b-4ba7-b144-7dca005e2b66';
  const confirmed2 = await prisma.confirmedReservation.upsert({
    where: { id: confirmed2_Id },
    update: {},
    create: {
      id: confirmed2_Id,
      seatReservationId: seat2_Id,
    },
  });

  // ---------------------------------- ARCHIVED RESERVATION ----------------------------------
  const archive1_id = '9c11dcf9-cbb0-44b5-8fe3-780b06cab34f';
  const archive1 = await prisma.archivedReservation.upsert({
    where: { id: archive1_id },
    update: {},
    create: {
      id: archive1_id,
      seatReservationId: seat4_Id,
    },
  });

  // DISCONNECT PRISMA
  await prisma.$disconnect();
}

main();

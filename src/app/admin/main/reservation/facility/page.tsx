'use client';

import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/navigation';

const prisma = new PrismaClient();

export default function FacilityReservation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    price: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    try {
      const customerResponse = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (customerResponse.ok) {
        const newCustomer = await customerResponse.json();
        console.log('New Customer:', newCustomer);
        const reservationData = {
          date: formData.date,
          timeFrom: formData.timeFrom,
          timeTo: formData.timeTo,
          price: formData.price,
          customer: newCustomer.id,
          email: 'example@mail.com', // Add the email field
          attendees: '2', // Add the attendees field
          purpose: 'Example purpose', // Add the purpose field
          additionalInfo: 'Example additional info', // Add the additionalInfo field
        };

        console.log('Reservation Data:', reservationData);

        console.log('New Facility Reservation:', newCustomer);
        // Redirect to the Facility Reservation

        const reservationResponse = await fetch('/api/reservation/facility', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });

        if (customerResponse.ok) {
          const newReservation = await reservationResponse.json();
          console.log('New Facility Reservation:', newReservation);
          router.push('/admin/main/reservation/facility');
        } else {
          const error = await reservationResponse.json();
          console.error('Error creating facility reservation:', error.message);
        }
      } else {
        const error = await customerResponse.json();
        console.error('Error creating facility reservation:', error.message);
      }
    } catch (error) {
      console.error('Error creating facility reservation:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">
          Book Reservations
        </h3>

        <h3 className="mb-3 text-xl font-semibold">
          Reservations for Confirmation
        </h3>

        <form
          className="flex flex-grow flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id=""
                required
                value={formData.firstName}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id=""
                value={formData.lastName}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Date
              </label>
              <input
                type="date"
                name="date"
                id=""
                value={formData.date}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Time from
              </label>
              <input
                type="time"
                name="timeFrom"
                id=""
                value={formData.timeFrom}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Time to
              </label>
              <input
                type="time"
                name="timeTo"
                id=""
                value={formData.timeTo}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Price
              </label>
              <input
                type="number"
                name="price"
                id=""
                required
                value={formData.price}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
}

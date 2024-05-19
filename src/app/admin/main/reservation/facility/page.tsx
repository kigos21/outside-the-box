'use client';
export const dynamic = 'force-dynamic';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FacilityReservation } from '@/types';
import { useState } from 'react';

export default function FacilityReservation() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const modal = (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/75">
      <div
        className="mb-12 flex w-[28rem] flex-col gap-8 rounded-lg bg-white px-8 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="rounded-md border border-green-700 bg-green-100 px-4 py-2 text-xl font-bold text-green-700">
          Success
        </p>

        <div className="mt-[-1rem] text-sm text-gray-500">{message}</div>

        <div className="flex">
          <button
            onClick={() => setShowModal(false)}
            className={`basis-full rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FacilityReservation>();

  const submitForm: SubmitHandler<FacilityReservation> = async ({
    firstName,
    lastName,
    date,
    startTime,
    endTime,
    price,
  }) => {
    // format time
    let targetDate = new Date(date);

    // parse time to number
    const [hourStart, minutesStart] = startTime.split(':');
    const [hourEnd, minutesEnd] = endTime.split(':');

    targetDate.setHours(Number(hourStart), Number(minutesStart), 0, 0);
    const formattedStartTime = targetDate;

    targetDate.setHours(Number(hourEnd), Number(minutesEnd), 0, 0);
    const formattedEndTime = targetDate;

    const response = await fetch('/api/admin/reservation/facility/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        price,
      }),
    });

    const { message } = await response.json();

    if (response.ok) {
      setMessage(message);
      setShowModal(true);
      reset();
    } else {
      console.log(message);
      alert(message);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
          <h3 className="absolute top-10 text-3xl font-bold">
            Book Reservations
          </h3>

          <h3 className="mb-3 text-xl font-semibold">Book Reservation Form</h3>

          <form
            className="flex flex-grow flex-col justify-between"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="firstName" className="basis-2/12">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('firstName', {
                    required: true,
                  })}
                />
                {errors.firstName && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="lastName" className="basis-2/12">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('lastName', {
                    required: true,
                  })}
                />
                {errors.lastName && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="date" className="basis-2/12">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('date', {
                    required: true,
                    validate: {
                      futureDate: (value) =>
                        new Date(value).setHours(0, 0, 0, 0) >=
                        new Date().setHours(0, 0, 0, 0)
                          ? true
                          : 'Date must be today or in the future.',
                    },
                  })}
                />
                {errors.date?.type === 'required' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
                {errors.date?.type === 'futureDate' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="startTime" className="basis-2/12">
                  Time from
                </label>
                <input
                  type="time"
                  id="startTime"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('startTime', {
                    required: true,
                    validate: {
                      futureTime: (value) => {
                        const today = new Date();
                        const targetDateTime = new Date(watch('date'));
                        const [hours, minutes] = value.split(':');
                        targetDateTime.setHours(
                          Number(hours),
                          Number(minutes),
                          0,
                          0,
                        );

                        return targetDateTime >= today
                          ? true
                          : 'Date and time must be today or in the future.';
                      },
                    },
                  })}
                />
                {errors.startTime?.type === 'required' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
                {errors.startTime?.type === 'futureTime' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="endTime" className="basis-2/12">
                  Time to
                </label>
                <input
                  type="time"
                  id="endTime"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('endTime', {
                    required: true,
                    validate: {
                      futureTime: (value) => {
                        const today = new Date();
                        const dateTimeStart = new Date(watch('date'));
                        const [hoursStart, minutesStart] =
                          watch('startTime').split(':');
                        dateTimeStart.setHours(
                          Number(hoursStart),
                          Number(minutesStart),
                          0,
                          0,
                        );
                        const dateTimeEnd = new Date(watch('date'));
                        const [hoursEnd, minutesEnd] = value.split(':');
                        dateTimeEnd.setHours(
                          Number(hoursEnd),
                          Number(minutesEnd),
                          0,
                          0,
                        );

                        return dateTimeEnd >= today &&
                          dateTimeEnd >= dateTimeStart
                          ? true
                          : 'End time must exceed the start time.';
                      },
                    },
                  })}
                />
                {errors.endTime?.type === 'required' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
                {errors.endTime?.type === 'futureTime' && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="price" className="basis-2/12">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  {...register('price', {
                    required: true,
                  })}
                />
                {errors.price && (
                  <p role="alert" className="px-6 text-xs text-red-500">
                    This field is required.
                  </p>
                )}
              </div>
            </div>

            <button className="w-fit self-end rounded-md bg-cs-blue px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
              Add Record
            </button>
          </form>
        </div>
      </div>

      {showModal && modal}
    </>
  );
}

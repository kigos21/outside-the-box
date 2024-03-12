'use client';

import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { XMarkIcon, CheckIcon } from '@heroicons/react/16/solid';
import AdminModal from '@/components/AdminModal';
import moment from 'moment';

interface SeatReserves {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  service: {
    name: string;
    hours: number;
  };
  date: Date;
  startTime: Date;
  endTime: Date;
}

// interface BookReservationsProps {
//   reserves: SeatReserves[];
//   handleExports: (reserves: SeatReserves[]) => Promise<void>;
// }

// const prisma = new PrismaClient();

// const handleConfirmReservations = async (reservationId: string) => {
//   try {
//     const conRes = await prisma.confirmedReservation.create({
//       data: {
//         seatReservation: {
//           connect: {
//             id: reservationId,
//           },
//         },
//         date: new Date(),
//       },
//     });
//     console.log('Reservation confirmed successfully!', conRes);
//   } catch (error) {
//     console.error('Error confirming reservation:', error);
//     // Handle error
//   }
// };

// function BookReservations(props: BookReservationsProps) {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showArchiveModal, setShowArchiveModal] = useState(false);
//   const [seatReservation, setSeatReservationState] = useState(props.reserves);
//   const [selectedReservationId, setSelectedReservationId] =
//     useState<string>('');

//   const [handleExportCSV, setHandleExportCSV] = useState(
//     () => props.handleExports,
//   );

function BookReservations({ reserves }: { reserves: SeatReserves[] }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [seatReservation, setSeatReservationState] = useState(reserves);
  const [selectedReservationId, setSelectedReservationId] =
    useState<string>('');

  return (
    <div className="flex h-full flex-col gap-5">
      {showConfirmModal && (
        <AdminModal
          title={'Confirm reservation?'}
          handleConfirm={() => setShowConfirmModal(false)}
          // handleConfirm={() => {
          //   handleConfirmReservations(selectedReservationId);
          //   setShowConfirmModal(false);
          // }}
          handleCancel={() => setShowConfirmModal(false)}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Reservation ID</p>
              <p className="basis-1/2 font-semibold">21</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">First name</p>
              <p className="basis-1/2 font-semibold">John</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Last name</p>
              <p className="basis-1/2 font-semibold">Castro</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Service</p>
              <p className="basis-1/2 font-semibold">5hrsReg</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Time in</p>
              <p className="basis-1/2 font-semibold">14:00</p>
            </div>
          </div>
        </AdminModal>
      )}

      {showArchiveModal && (
        <AdminModal
          title={'Archive reservation?'}
          handleConfirm={() => console.log('Confirm')}
          handleCancel={() => setShowArchiveModal(false)}
          danger
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Reservation ID</p>
              <p className="basis-1/2 font-semibold">21</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">First name</p>
              <p className="basis-1/2 font-semibold">John</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Last name</p>
              <p className="basis-1/2 font-semibold">Castro</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Service</p>
              <p className="basis-1/2 font-semibold">5hrsReg</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Time in</p>
              <p className="basis-1/2 font-semibold">14:00</p>
            </div>
          </div>
        </AdminModal>
      )}

      <div className="h-[calc(86vh-104px-1.25rem)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">
          Book Reservations
        </h3>
        <h3 className="mb-3 text-xl font-semibold text-gray-500">
          Reservations for Confirmation
        </h3>
        <table className="relative w-full table-fixed text-center">
          <thead>
            <tr>
              <th className="sticky top-[-1.5rem] bg-white p-2 ">
                Reservation ID
              </th>
              <th className="sticky top-[-1.5rem] bg-white p-2">First Name</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Last Name</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Service</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Duration</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Date</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Time In</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Time Out</th>
              <th className="sticky top-[-1.5rem] bg-white p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seatReservation.map((reservations) => (
              <tr
                className="h-9 border border-solid border-black"
                key={reservations.id}
              >
                <td>{reservations.id}</td>
                <td>{reservations.customer.firstName}</td>
                <td>{reservations.customer.lastName}</td>
                <td>{reservations.service.name}</td>
                <td>{reservations.service.hours}</td>
                <td>{reservations.date.toLocaleDateString()}</td>
                <td>
                  {reservations.startTime.toLocaleDateString()},
                  {reservations.startTime.toLocaleTimeString()}
                </td>
                <td>
                  {reservations.endTime.toLocaleDateString()},{' '}
                  {reservations.endTime.toLocaleTimeString()}
                </td>

                {/* {moment(logItem.timeIn).format('YYYY-MM-DD')} */}

                <td className="flex h-12 items-center justify-center gap-2">
                  <button
                    className="flex items-center justify-center rounded-lg bg-blue-700 p-2 text-white shadow-lg"
                    onClick={() => {
                      // setSelectedReservationId();
                      // setSeatReservationState();
                      setShowConfirmModal(true);
                    }}
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="flex items-center justify-center rounded-lg bg-red-500 p-2 text-white shadow-lg"
                    onClick={() => setShowArchiveModal(true)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <div className="flex w-full justify-between">
          <h3 className="self-center text-xl font-semibold">
            Reserve the Facility
          </h3>
          <Link
            href="/admin/main/reservation/facility"
            className="rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Create Reservation
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BookReservations;

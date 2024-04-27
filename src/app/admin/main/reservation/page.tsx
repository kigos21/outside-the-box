'use client';

import Link from 'next/link';
import { XMarkIcon, CheckIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import AdminModal from '@/components/AdminModal';

interface ReservationForConfirmation {
  id: string;
  customerId: string;
  serviceId: string;
  startDateTime: string;
  endDateTime: string;
  seats: number[];
  customer: {
    firstName: string;
    lastName: string;
  };
  service: {
    name: string;
    price: number;
  };
}

export default function Reservation() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [reserveData, setReserveData] = useState<ReservationForConfirmation[]>(
    [],
  );
  const [selectedData, setSelectedData] =
    useState<ReservationForConfirmation>();

  useEffect(() => {
    fetchUnconfirmed();
  }, []);

  const fetchUnconfirmed = async () => {
    try {
      const response = await fetch('/api/reservations/seat/unconfirmed');
      const data = await response.json();

      if (response.ok) {
        // format the time
        let unconfirmedReservations = data.unconfirmedReservations.map(
          (reservation: any) => {
            const current = reservation;
            return {
              ...current,
              startDateTime: new Date(
                current.startDateTime,
              ).toLocaleTimeString(),
              endDateTime: new Date(current.endDateTime).toLocaleTimeString(),
            };
          },
        );

        setReserveData(unconfirmedReservations);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (id: string) => {
    const response = await fetch('/api/admin/reservation/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowConfirmModal(false);
      fetchUnconfirmed();
    } else {
      console.error(data.message);
    }
  };

  const handleArchive = async (id: string) => {
    const response = await fetch('/api/admin/reservation/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowArchiveModal(false);
      fetchUnconfirmed();
    } else {
      console.error(data.message);
    }
  };

  const formatModalContent = (data: ReservationForConfirmation) => {
    const [hoursIn, minutesIn, meridianIn] = data.startDateTime.split(':');
    const [hoursOut, minutesOut, meridianOut] = data.endDateTime.split(':');

    return (
      <div className="flex flex-col gap-1" key={data.id}>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Reservation ID</p>
          <p className="basis-1/2 font-semibold" title={data.id}>
            {data.id.substring(0, 13)}...
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">First name</p>
          <p className="basis-1/2 font-semibold">{data.customer.firstName}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Last name</p>
          <p className="basis-1/2 font-semibold">{data.customer.lastName}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Service</p>
          <p className="basis-1/2 font-semibold">{data.service.name}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Time in</p>
          <p className="basis-1/2 font-semibold">{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Price</p>
          <p className="basis-1/2 font-semibold">
            {data.service.price * Number(data.seats.length)}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="basis-1/2">Seats</p>
          <p className="basis-1/2 font-semibold">
            {data.seats.toString()} ({data.seats.length})
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col gap-5">
      {showConfirmModal && (
        <AdminModal
          title={'Confirm reservation?'}
          handleConfirm={() => handleCreate(selectedData!.id)}
          handleCancel={() => setShowConfirmModal(false)}
        >
          {selectedData && formatModalContent(selectedData)}
        </AdminModal>
      )}

      {showArchiveModal && (
        <AdminModal
          title={'Archive reservation?'}
          handleConfirm={() => handleArchive(selectedData!.id)}
          handleCancel={() => setShowArchiveModal(false)}
          danger
        >
          {selectedData && formatModalContent(selectedData)}
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
              <th className="sticky top-[-1.5rem] bg-white">Reservation ID</th>
              <th className="sticky top-[-1.5rem] bg-white">First Name</th>
              <th className="sticky top-[-1.5rem] bg-white">Last Name</th>
              <th className="sticky top-[-1.5rem] bg-white">Service</th>
              <th className="sticky top-[-1.5rem] bg-white">Time In</th>
              <th className="sticky top-[-1.5rem] bg-white">Price</th>
              <th className="sticky top-[-1.5rem] bg-white">Seats</th>
              <th className="sticky top-[-1.5rem] bg-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reserveData.map((data) => {
              const [hoursIn, minutesIn, meridianIn] =
                data.startDateTime.split(':');
              const [hoursOut, minutesOut, meridianOut] =
                data.endDateTime.split(':');

              return (
                <tr
                  className="h-9 border border-solid border-black"
                  key={data.id}
                >
                  <td title={data.id}>{data.id.substring(0, 8)}...</td>
                  <td>{data.customer.firstName}</td>
                  <td>{data.customer.lastName}</td>
                  <td>{data.service.name}</td>
                  <td>{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</td>
                  <td>{data.service.price * Number(data.seats.length)}</td>
                  <td>
                    {data.seats.toString()} ({data.seats.length})
                  </td>
                  <td className="flex h-12 items-center justify-center gap-2">
                    <button
                      className="flex items-center justify-center rounded-lg bg-blue-700 p-2 text-white shadow-lg"
                      onClick={() => {
                        setSelectedData(data);
                        setShowConfirmModal(true);
                      }}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="flex items-center justify-center rounded-lg bg-red-500 p-2 text-white shadow-lg"
                      onClick={() => {
                        setSelectedData(data);
                        setShowArchiveModal(true);
                      }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
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
            className="rounded-md bg-cs-blue px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Create Reservation
          </Link>
        </div>
      </div>
    </div>
  );
}

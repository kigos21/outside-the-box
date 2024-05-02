'use client';

import AdminModal from '@/components/AdminModal';
import { useEffect, useState } from 'react';

interface ConfirmedReservation {
  id: string;
  seatReservationId: string;
  date: Date;
  seatReservation: {
    id: string;
    customerId: string;
    serviceId: string;
    startDateTime: Date;
    endDateTime: Date;
    seats: number[];
    customer: {
      firstName: string;
      lastName: string;
    };
    service: {
      name: string;
      hours: number;
    };
  };
}

interface ModalData {
  id: string;
  firstName: string;
  lastName: string;
  service: string;
  startDateTime: string;
}

interface SubmitData {
  customerId: string;
  serviceId: string;
  timeIn: Date;
  timeOut: Date;
  confirmedReservationId: string;
}

export default function AddFromReservations() {
  const [showModal, setShowModal] = useState(false);
  const [reserveData, setReserveData] = useState<ConfirmedReservation[]>([]);
  const [modalData, setModalData] = useState<ModalData>();
  const [submitData, setSubmitData] = useState<SubmitData>();

  useEffect(() => {
    fetchConfirmedReservations();
  }, []);

  const fetchConfirmedReservations = async () => {
    const response = await fetch('/api/reservations/confirmed');

    if (response.ok) {
      const { confirmedReservations } = await response.json();
      setReserveData(confirmedReservations);
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }
  };

  const createLogFromReservation = async (data: SubmitData) => {
    const response = await fetch('/api/logs/create-from-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      fetchConfirmedReservations();
      setShowModal(false);
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {showModal && modalData && (
        <AdminModal
          title={'Create log based on this reservation?'}
          handleConfirm={() =>
            submitData && createLogFromReservation(submitData)
          }
          handleCancel={() => {
            setShowModal(false);
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Reservation ID</p>
              <p className="basis-1/2 font-semibold" title={modalData.id}>
                {modalData.id.substring(0, 8)}...
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">First name</p>
              <p className="basis-1/2 font-semibold">{modalData.firstName}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Last name</p>
              <p className="basis-1/2 font-semibold">{modalData.lastName}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Service</p>
              <p className="basis-1/2 font-semibold">{modalData.service}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Time in</p>
              <p className="basis-1/2 font-semibold">
                {modalData.startDateTime}
              </p>
            </div>
          </div>
        </AdminModal>
      )}

      <div className="flex h-[86vh] flex-col overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">
          Add Log from Reservation
        </h3>

        <h3 className="mb-3 text-xl font-semibold text-gray-500">
          Create New Log from Reservation
        </h3>

        <table className="relative w-full table-fixed text-center">
          <thead>
            <tr>
              <th className="sticky top-[-1.5rem] bg-white">Reservation ID</th>
              <th className="sticky top-[-1.5rem] bg-white">First Name</th>
              <th className="sticky top-[-1.5rem] bg-white">Last Name</th>
              <th className="sticky top-[-1.5rem] bg-white">Service</th>
              <th className="sticky top-[-1.5rem] bg-white">Date</th>
              <th className="sticky top-[-1.5rem] bg-white">Time In</th>
              <th className="sticky top-[-1.5rem] bg-white">Seats</th>
              <th className="sticky top-[-1.5rem] bg-white">Create Log</th>
            </tr>
          </thead>
          <tbody>
            {reserveData.map((data) => {
              const dateIn = new Date(
                data.seatReservation.startDateTime,
              ).toLocaleDateString();
              const [hoursIn, minutesIn, meridianIn] = new Date(
                data.seatReservation.startDateTime,
              )
                .toLocaleTimeString()
                .split(':');

              return (
                <tr
                  className="h-9 border border-solid border-black"
                  key={data.id}
                >
                  <td title={data.id}>{data.id.substring(0, 8)}...</td>
                  <td>{data.seatReservation.customer.firstName}</td>
                  <td>{data.seatReservation.customer.lastName}</td>
                  <td>{data.seatReservation.service.name}</td>
                  <td>{dateIn}</td>
                  <td>{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</td>
                  <td>{data.seatReservation.seats.toString()}</td>
                  <td className="flex h-12 items-center justify-center gap-2">
                    <button
                      className="rounded-lg bg-blue-700 p-1 text-white"
                      onClick={() => {
                        setModalData({
                          id: data.id,
                          firstName: data.seatReservation.customer.firstName,
                          lastName: data.seatReservation.customer.lastName,
                          service: data.seatReservation.service.name,
                          startDateTime: `${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`,
                        });
                        setSubmitData({
                          confirmedReservationId: data.id,
                          customerId: data.seatReservation.customerId,
                          serviceId: data.seatReservation.serviceId,
                          timeIn: data.seatReservation.startDateTime,
                          timeOut: data.seatReservation.endDateTime,
                        });
                        setShowModal(true);
                      }}
                      title="Create log"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

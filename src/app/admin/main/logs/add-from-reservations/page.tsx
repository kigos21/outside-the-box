'use client';

import AdminModal from '@/components/AdminModal';
import { useState } from 'react';

export default function AddFromReservations() {
  const [showModal, setShowModal] = useState(false);

  const reserveData = [
    {
      rsID: 1,
      fName: 'Melfred',
      lName: 'Fonclarers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 2,
      fName: 'Noel',
      lName: 'Cansiners',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 3,
      fName: 'Karl',
      lName: 'Taculers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 4,
      fName: 'John',
      lName: 'De Castrers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 5,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 6,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 7,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 8,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 9,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 10,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 11,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 12,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 13,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 14,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 15,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 16,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
    {
      rsID: 17,
      fName: 'Kevin',
      lName: 'Corazers',
      service: 'Study Buddy',
      duration: '5 hours',
      timeIn: '13:11',
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {showModal && (
        <AdminModal
          title={'Create log based on this reservation?'}
          handleConfirm={() => console.log('Confirm')}
          handleCancel={() => {
            setShowModal(false);
          }}
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
              <th className="sticky top-[-1.5rem] bg-white">Duration</th>
              <th className="sticky top-[-1.5rem] bg-white">Time In</th>
              <th className="sticky top-[-1.5rem] bg-white">Create Log</th>
            </tr>
          </thead>
          <tbody>
            {reserveData.map((data) => (
              <tr
                className="h-9 border border-solid border-black"
                key={data.rsID}
              >
                <td>{data.rsID}</td>
                <td>{data.fName}</td>
                <td>{data.lName}</td>
                <td>{data.service}</td>
                <td>{data.duration}</td>
                <td>{data.timeIn}</td>
                <td className="flex h-12 items-center justify-center gap-2">
                  <button
                    className="rounded-lg bg-blue-700 p-1 text-white"
                    onClick={() => setShowModal(true)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

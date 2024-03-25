'use client';

import { PlusIcon } from '@heroicons/react/16/solid';
import AddButton from '../services/AddButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Log {
  id: string;
  customerId: string;
  serviceId: string;
  timeIn: Date;
  timeOut: Date;
  confirmedReservationId: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  service: {
    name: string;
    hours: number;
    price: number;
  };
}

export default function Logs() {
  const [logData, setLogData] = useState<Log[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await fetch('/api/logs');

    if (response.ok) {
      const { logs } = await response.json();
      setLogData(logs);
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }
  };

  return (
    <div className="h-[calc(86vh)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
      <h3 className="absolute top-10 text-3xl font-bold">Manage Log Records</h3>
      <div className="mb-3 flex justify-between">
        <h3 className="text-xl font-semibold text-gray-500">Logs</h3>
        <div className="flex gap-3">
          <Link
            href="/admin/main/logs/add-from-reservations"
            className="flex items-center justify-center rounded-md border border-otb-blue bg-sky-50 px-4 py-2 text-otb-blue shadow-md transition-all hover:bg-sky-900 hover:text-white hover:shadow-none"
          >
            Create from reservation
          </Link>
          <AddButton href="/admin/main/logs/add-log" IconComponent={PlusIcon} />
        </div>
      </div>
      <table className="w-full table-fixed text-center">
        <thead className="">
          <tr>
            <th className="sticky top-[-1.5rem] bg-white">First Name</th>
            <th className="sticky top-[-1.5rem] bg-white">Last Name</th>
            <th className="sticky top-[-1.5rem] bg-white">Service</th>
            <th className="sticky top-[-1.5rem] bg-white">Time In</th>
            <th className="sticky top-[-1.5rem] bg-white">Time Out</th>
            <th className="sticky top-[-1.5rem] bg-white">Price</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log) => {
            const [hoursIn, minutesIn, meridianIn] = new Date(log.timeIn)
              .toLocaleTimeString()
              .split(':');
            const [hoursOut, minutesOut, meridianOut] = new Date(log.timeOut)
              .toLocaleTimeString()
              .split(':');

            return (
              <tr className="h-9 border border-solid border-black" key={log.id}>
                <td>{log.customer.firstName}</td>
                <td>{log.customer.lastName}</td>
                <td>{log.service.name}</td>
                <td>{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</td>
                <td>{`${hoursOut}:${minutesOut} ${meridianOut.substring(2)}`}</td>
                <td>{log.service.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

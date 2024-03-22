'use client';

import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch'; // Assuming server-side rendering

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]); // Initialize state for logs
  const [reservationsForConfirmation, setReservationsForConfirmation] =
    useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
    fetchUnconfirmed();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/logs'); // API endpoint URL
      const data = await response.json();

      if (data.success) {
        setLogs(data.logs); //sets the logs state value
      } else {
        console.error('Error fetching logs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

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

        setReservationsForConfirmation(unconfirmedReservations);
      } else {
        console.error(data.message);
        // setError
      }
    } catch (error) {
      console.error(error);
      // setError
    }
  };

  const hasLogsToday = () => {
    if (logs.length > 0) {
      return logs.map((log) => {
        const [hoursIn, minutesIn, meridianIn] = log.timeIn.split(':');
        const [hoursOut, minutesOut, meridianOut] = log.timeOut.split(':');

        return (
          <tr className="h-9 border border-solid border-black" key={log.id}>
            <td>{log.customer.firstName}</td>
            <td>{log.customer.lastName}</td>
            <td>{log.service.serviceName}</td>
            <td>{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</td>
            <td>{`${hoursOut}:${minutesOut} ${meridianOut.substring(2)}`}</td>
            <td>{log.service.servicePrice}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr className="h-9" key="0">
          <td colSpan={6} className="pt-[8%] opacity-50">
            No logs for today
          </td>
        </tr>
      );
    }
  };

  const hasReservationsForConfirmation = () => {
    if (reservationsForConfirmation.length > 0) {
      return reservationsForConfirmation.map((reservation) => {
        const [hoursIn, minutesIn, meridianIn] =
          reservation.startDateTime.split(':');
        const [hoursOut, minutesOut, meridianOut] =
          reservation.endDateTime.split(':');

        return (
          <tr
            className="h-9 border border-solid border-black"
            key={reservation.id}
          >
            <td title={reservation.id}>{reservation.id.substring(0, 13)}...</td>
            <td>{reservation.customer.firstName}</td>
            <td>{reservation.customer.lastName}</td>
            <td>{reservation.service.name}</td>
            <td>{`${hoursIn}:${minutesIn} ${meridianIn.substring(2)}`}</td>
            <td>{reservation.service.price}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr className="h-9" key="0">
          <td colSpan={6} className="pt-[8%] opacity-50">
            No logs for today
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="flex h-[86vh] flex-col gap-5">
      <div className="h-[calc(86vh/2-10px)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Homepage</h3>
        <h3 className="mb-3 text-xl font-semibold text-gray-500">
          Recent Log Records
        </h3>
        <div>
          <table className="relative w-full table-fixed text-center">
            <thead>
              <tr>
                <th className="sticky top-[-1.5rem] bg-white">First Name</th>
                <th className="sticky top-[-1.5rem] bg-white">Last Name</th>
                <th className="sticky top-[-1.5rem] bg-white">Service</th>
                <th className="sticky top-[-1.5rem] bg-white">Time In</th>
                <th className="sticky top-[-1.5rem] bg-white">Time Out</th>
                <th className="sticky top-[-1.5rem] bg-white">Price</th>
              </tr>
            </thead>
            <tbody>{hasLogsToday()}</tbody>
          </table>
        </div>
      </div>
      <div className="h-[calc(86vh/2-10px)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold text-gray-500">
          Reservations for Confirmation
        </h3>
        <div>
          <table className="w-full table-fixed text-center">
            <thead className="">
              <tr>
                <th className="sticky top-[-1.5rem] bg-white">
                  Reservation ID
                </th>
                <th className="sticky top-[-1.5rem] bg-white">First Name</th>
                <th className="sticky top-[-1.5rem] bg-white">Last Name</th>
                <th className="sticky top-[-1.5rem] bg-white">Service</th>
                <th className="sticky top-[-1.5rem] bg-white">Time In</th>
                <th className="sticky top-[-1.5rem] bg-white">Price</th>
              </tr>
            </thead>
            <tbody>{hasReservationsForConfirmation()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

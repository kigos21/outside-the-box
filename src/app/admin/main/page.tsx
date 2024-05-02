'use client';

import { useState, useEffect } from 'react';

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

interface SeatReservation {
  id: string;
  customerId: string;
  serviceId: string;
  startDateTime: Date;
  endDateTime: Date;
  seats: number;
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

export default function Home() {
  const [logData, setLogData] = useState<Log[]>([]); // Initialize state for logs
  const [seatsData, setSeatsData] = useState<SeatReservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [logsPage, setLogsPage] = useState(1);
  const [logsHasMore, setLogsHasMore] = useState(true);

  const [seatsPage, setSeatsPage] = useState(1);
  const [seatsHasMore, setSeatsHasMore] = useState(true);

  useEffect(() => {
    fetchLogs(logsPage);
    fetchSeats(seatsPage);
  }, []);

  const fetchLogs = async (page: number) => {
    setIsLoading(true);

    const response = await fetch(`/api/logs/today?page=${page}&pageSize=9`);

    if (response.ok) {
      const { logs } = await response.json();

      if (logs.length > 0) {
        setLogData([...logData, ...logs]);
        setLogsPage(page + 1);
      } else {
        setLogsHasMore(false);
      }
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }

    setIsLoading(false);
  };

  const handleLogsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (logsHasMore && !isLoading) {
        fetchLogs(logsPage);
      }
    }
  };

  const fetchSeats = async (page: number) => {
    setIsLoading(true);

    const response = await fetch(
      `/api/reservations/seat/unconfirmed?page=${page}&pageSize=9`,
    );

    if (response.ok) {
      const { seats } = await response.json();

      if (seats.length > 0) {
        setSeatsData([...seatsData, ...seats]);
        setSeatsPage(page + 1);
      } else {
        setSeatsHasMore(false);
      }
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }

    setIsLoading(false);
  };

  const handleSeatsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (seatsHasMore && !isLoading) {
        fetchSeats(seatsPage);
      }
    }
  };

  const hasLogsToday = () => {
    if (logData.length > 0) {
      return logData.map((log) => {
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
    if (seatsData.length > 0) {
      return seatsData.map((reservation) => {
        const [hoursIn, minutesIn, meridianIn] = new Date(
          reservation.startDateTime,
        )
          .toLocaleTimeString()
          .split(':');
        const [hoursOut, minutesOut, meridianOut] = new Date(
          reservation.endDateTime,
        )
          .toLocaleTimeString()
          .split(':');

        return (
          <tr
            className="h-9 border border-solid border-black"
            key={reservation.id}
          >
            <td title={reservation.id}>{reservation.id}</td>
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
            No reservations for today
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="flex h-[86vh] flex-col gap-5">
      <div
        onScroll={handleLogsScroll}
        className="h-[calc(86vh/2-10px)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25"
      >
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
      <div
        onScroll={handleSeatsScroll}
        className="h-[calc(86vh/2-10px)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25"
      >
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

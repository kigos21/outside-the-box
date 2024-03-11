'use client';
import { ScrollContainer } from 'react-nice-scroll';
import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch'; // Assuming server-side rendering

// import Scroll from 'react-scroll';

export default function Home() {

  const [logs, setLogs] = useState<any[]>([]); // Initialize state for logs

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

  useEffect(() => {
    fetchLogs();
  }, []);

  const hasLogsToday = () => {
    if (logs.length > 0) {
      return logs.map((log) => (
        <tr className="h-9 border border-solid border-black" key={log.id}>
          <td>{log.customer.firstName}</td>
          <td>{log.customer.lastName}</td>
          <td>{log.service.serviceName}</td>
          <td>{log.timeIn}</td>
          <td>{log.timeOut}</td>
          <td>{log.service.servicePrice}</td>
        </tr>
      ));
    } else {
      return (
        <tr className="h-9 border border-solid border-black" key="0">
          <td>empty</td>
          <td>empty</td>
          <td>empty</td>
          <td>empty</td>
          <td>empty</td>
          <td>empty</td>
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
            <tbody>{hasLogsToday()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

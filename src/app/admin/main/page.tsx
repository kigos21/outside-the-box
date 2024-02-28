'use client';
import { ScrollContainer } from 'react-nice-scroll';
// import Scroll from 'react-scroll';

export default function Home() {
  const testData = [
    {
      key: 1,
      fName: 'Melfred',
      lName: 'Fonclara',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 2,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 3,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 1,
      fName: 'Melfred',
      lName: 'Fonclara',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 2,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 3,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 1,
      fName: 'Melfred',
      lName: 'Fonclara',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 2,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 3,
      fName: 'Melfred',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 1,
      fName: 'Melfred',
      lName: 'Fonclara',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 2,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 3,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: 5,
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="h-2/5 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">Recent Log Records</h3>
        <div style={{ overflowY: 'scroll', maxHeight: 'calc(100% -  50px)' }}>
          <table className="relative w-full table-fixed text-center">
            <thead>
              <tr>
                <th className="sticky top-0 bg-white">First Name</th>
                <th className="sticky top-0 bg-white">Last Name</th>
                <th className="sticky top-0 bg-white">Service</th>
                <th className="sticky top-0 bg-white">Time In</th>
                <th className="sticky top-0 bg-white">Time Out</th>
                <th className="sticky top-0 bg-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((data) => (
                <tr
                  className="h-9 border border-solid border-black"
                  key={data.key}
                >
                  <td>{data.fName}</td>
                  <td>{data.lName}</td>
                  <td>{data.service} hours</td>
                  <td>{data.timeIn}</td>
                  <td>{data.timeOut}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-2/5 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">
          Reservations for Confirmation
        </h3>
        <div style={{ overflowY: 'scroll', maxHeight: 'calc(100% -  50px)' }}>
          <table className="w-full table-fixed text-center">
            <thead className="">
              <tr>
                <th className="sticky top-0 bg-white">Reservation ID</th>
                <th className="sticky top-0 bg-white">First Name</th>
                <th className="sticky top-0 bg-white">Last Name</th>
                <th className="sticky top-0 bg-white">Service</th>
                <th className="sticky top-0 bg-white">Time In</th>
                <th className="sticky top-0 bg-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((data) => (
                <tr
                  className="h-9 border border-solid border-black"
                  key={data.key}
                >
                  <td>{data.fName}</td>
                  <td>{data.lName}</td>
                  <td>{data.service}</td>
                  <td>{data.timeIn}</td>
                  <td>{data.timeOut}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

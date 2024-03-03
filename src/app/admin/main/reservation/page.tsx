import Link from 'next/link';
import EditButton from '../services/EditButton';
import DeleteButton from '../services/DeleteButton';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/16/solid';

export default function Reservation() {
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
    <div className="flex h-full flex-col gap-5">
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
              <th className="sticky top-[-1.5rem] bg-white">Duration</th>
              <th className="sticky top-[-1.5rem] bg-white">Time In</th>
              <th className="sticky top-[-1.5rem] bg-white">Actions</th>
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
                  <EditButton IconComponent={PencilSquareIcon} />
                  <DeleteButton IconComponent={XMarkIcon} />
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

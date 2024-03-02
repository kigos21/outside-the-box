import Link from 'next/link';

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
        <h3 className="mb-3 text-xl font-semibold">
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
                <td>
                  <button className="m-1 rounded-md bg-blue-500 px-3 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button className="m-1 rounded-md bg-red-500 px-3 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
}

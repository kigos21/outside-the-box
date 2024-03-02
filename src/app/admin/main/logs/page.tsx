import { PlusIcon } from '@heroicons/react/16/solid';
import AddButton from '../services/AddButton';

export default function Logs() {
  const logData = [
    {
      id: 1,
      fName: 'John',
      lName: 'Castro',
      service: {
        name: '5hrs',
        hours: 5,
      },
      timeIn: '14:00',
      price: '250.00',
    },
    {
      id: 2,
      fName: 'Maria',
      lName: 'Garcia',
      service: {
        name: '10hrs',
        hours: 10,
      },
      timeIn: '09:30',
      price: '500.00',
    },
    {
      id: 3,
      fName: 'David',
      lName: 'Lopez',
      service: {
        name: '3hrs',
        hours: 3,
      },
      timeIn: '11:45',
      price: '150.00',
    },
    {
      id: 4,
      fName: 'Sophia',
      lName: 'Martinez',
      service: {
        name: '8hrs',
        hours: 8,
      },
      timeIn: '08:00',
      price: '400.00',
    },
    {
      id: 5,
      fName: 'Daniel',
      lName: 'Hernandez',
      service: {
        name: '6hrs',
        hours: 6,
      },
      timeIn: '13:15',
      price: '300.00',
    },
    {
      id: 6,
      fName: 'Isabella',
      lName: 'Rodriguez',
      service: {
        name: '4hrs',
        hours: 4,
      },
      timeIn: '10:20',
      price: '200.00',
    },
    {
      id: 7,
      fName: 'Ethan',
      lName: 'Gonzalez',
      service: {
        name: '7hrs',
        hours: 7,
      },
      timeIn: '12:30',
      price: '350.00',
    },
    {
      id: 8,
      fName: 'Mia',
      lName: 'Perez',
      service: {
        name: '9hrs',
        hours: 9,
      },
      timeIn: '07:45',
      price: '450.00',
    },
    {
      id: 9,
      fName: 'Alexander',
      lName: 'Sanchez',
      service: {
        name: '2hrs',
        hours: 2,
      },
      timeIn: '15:20',
      price: '100.00',
    },
    {
      id: 10,
      fName: 'Olivia',
      lName: 'Torres',
      service: {
        name: '3.5hrs',
        hours: 3.5,
      },
      timeIn: '16:45',
      price: '175.00',
    },
    {
      id: 11,
      fName: 'Liam',
      lName: 'Ramirez',
      service: {
        name: '6.5hrs',
        hours: 6.5,
      },
      timeIn: '10:10',
      price: '325.00',
    },
    {
      id: 12,
      fName: 'Ava',
      lName: 'Flores',
      service: {
        name: '4.5hrs',
        hours: 4.5,
      },
      timeIn: '11:00',
      price: '225.00',
    },
    {
      id: 13,
      fName: 'Noah',
      lName: 'Gomez',
      service: {
        name: '7.5hrs',
        hours: 7.5,
      },
      timeIn: '12:15',
      price: '375.00',
    },
    {
      id: 14,
      fName: 'Emma',
      lName: 'Diaz',
      service: {
        name: '5.5hrs',
        hours: 5.5,
      },
      timeIn: '14:30',
      price: '275.00',
    },
    {
      id: 15,
      fName: 'Lucas',
      lName: 'Herrera',
      service: {
        name: '8.5hrs',
        hours: 8.5,
      },
      timeIn: '08:45',
      price: '425.00',
    },
    // Additional objects:
    {
      id: 16,
      fName: 'Luna',
      lName: 'Vargas',
      service: {
        name: '5hrs',
        hours: 5,
      },
      timeIn: '09:00',
      price: '250.00',
    },
    {
      id: 17,
      fName: 'Benjamin',
      lName: 'Reyes',
      service: {
        name: '9hrs',
        hours: 9,
      },
      timeIn: '11:30',
      price: '450.00',
    },
    {
      id: 18,
      fName: 'Charlotte',
      lName: 'Alvarez',
      service: {
        name: '6hrs',
        hours: 6,
      },
      timeIn: '13:20',
      price: '300.00',
    },
    {
      id: 19,
      fName: 'Henry',
      lName: 'Torres',
      service: {
        name: '4hrs',
        hours: 4,
      },
      timeIn: '15:45',
      price: '200.00',
    },
    {
      id: 20,
      fName: 'Amelia',
      lName: 'Gutierrez',
      service: {
        name: '7hrs',
        hours: 7,
      },
      timeIn: '10:05',
      price: '350.00',
    },
    {
      id: 21,
      fName: 'Logan',
      lName: 'Mendoza',
      service: {
        name: '3hrs',
        hours: 3,
      },
      timeIn: '12:50',
      price: '150.00',
    },
    {
      id: 22,
      fName: 'Avery',
      lName: 'Castillo',
      service: {
        name: '8hrs',
        hours: 8,
      },
      timeIn: '07:15',
      price: '400.00',
    },
    {
      id: 23,
      fName: 'Evelyn',
      lName: 'Guerrero',
      service: {
        name: '5.5hrs',
        hours: 5.5,
      },
      timeIn: '14:40',
      price: '275.00',
    },
    {
      id: 24,
      fName: 'James',
      lName: 'Fernandez',
      service: {
        name: '6.5hrs',
        hours: 6.5,
      },
      timeIn: '08:20',
      price: '325.00',
    },
    {
      id: 25,
      fName: 'Harper',
      lName: 'Ortega',
      service: {
        name: '2.5hrs',
        hours: 2.5,
      },
      timeIn: '16:00',
      price: '125.00',
    },
  ];

  return (
    <div className="h-[calc(86vh)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
      <h3 className="absolute top-10 text-3xl font-bold">Manage Log Records</h3>
      <div className="flex justify-between">
        <h3 className="mb-3 text-xl font-semibold">Logs</h3>
        {/* <button className="rounded-md bg-otb-blue px-4 text-white">+</button> */}
        <AddButton IconComponent={PlusIcon} />
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
          {logData.map((data) => (
            <tr className="h-9 border border-solid border-black" key={data.id}>
              <td>{data.fName}</td>
              <td>{data.lName}</td>
              <td>{data.service.name}</td>
              <td>{data.timeIn}</td>
              <td>{data.timeIn + data.service.hours}</td>
              <td>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

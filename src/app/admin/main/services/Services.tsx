'use client';

import {
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';

interface Service {
  id: string;
  name: string;
  hours: number;
  price: number;
  type: string;
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <div className="flex h-[86vh] flex-col gap-5">
      <div className="h-[calc(86vh)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">
          Manage Services and Promos
        </h3>
        <div className="mb-3 flex justify-between">
          <h3 className="text-xl font-semibold text-gray-500">Your Services</h3>
          <AddButton
            href="/admin/main/services/add-service"
            IconComponent={PlusIcon}
          />
        </div>

        <table className="w-full table-fixed text-center">
          <thead className="">
            <tr>
              <th className="sticky top-[-1.5rem] bg-white">Service/Promo</th>
              <th className="sticky top-[-1.5rem] bg-white">Hours</th>
              <th className="sticky top-[-1.5rem] bg-white">Price</th>
              <th className="sticky top-[-1.5rem] bg-white">Type</th>
              <th className="sticky top-[-1.5rem] bg-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                className="h-12 border border-solid border-black"
                key={service.id}
              >
                <td>{service.name}</td>
                <td>{service.hours}</td>
                <td>{service.price}</td>
                <td>{service.type}</td>
                <td className="flex h-12 items-center justify-center gap-2">
                  <EditButton IconComponent={PencilSquareIcon} />
                  <DeleteButton IconComponent={XMarkIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

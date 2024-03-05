import {
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';

export default function Services() {
  const testData = [
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
    {
      key: 1,
      service: '2hrsReg',
      hours: '2',
      price: '149.00',
      servicetype: 'Regular',
    },
    {
      key: 2,
      service: '2hrsRegDT',
      hours: '2',
      price: '174.00',
      servicetype: 'Regular',
    },
  ];

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
            {testData.map((data) => (
              <tr
                className="h-12 border border-solid border-black"
                key={data.key}
              >
                <td>{data.service}</td>
                <td>{data.hours}</td>
                <td>{data.price}</td>
                <td>{data.servicetype}</td>
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

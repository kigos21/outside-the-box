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
  ];

  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="h-full rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">
          Manage Services and Promos
        </h3>
        <table className="w-full table-fixed text-center">
          <thead className="">
            <tr>
              <th>SERVICE / PROMO</th>
              <th>HOURS</th>
              <th>PRICE</th>
              <th>SERVICE TYPE</th>
              <th>
                <AddButton IconComponent={PlusIcon} />
              </th>
            </tr>
          </thead>
          <tbody>
            {testData.map((data) => (
              <tr
                className="h-9 border border-solid border-black"
                key={data.key}
              >
                <td>{data.service}</td>
                <td>{data.hours}</td>
                <td>{data.price}</td>
                <td>{data.servicetype}</td>
                <td>
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

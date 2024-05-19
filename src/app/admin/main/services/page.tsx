'use client';
export const dynamic = 'force-dynamic';

import {
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';

import { useEffect, useState } from 'react';
import AdminModal from '@/components/AdminModal';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

interface Service {
  id: string;
  name: string;
  hours: number;
  price: number;
  type: string;
}

export default function ServicesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(['adminToken']);

  const [services, setServices] = useState<Service[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service>();

  useEffect(() => {
    checkIfAdmin(cookies.adminToken);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { signal } = new AbortController();

    const response = await fetch('/api/services', {
      signal,
      cache: 'no-store',
      next: { revalidate: 0 },
    });
    const { services, message } = await response.json();

    if (response.ok) {
      setServices(services);
    } else {
      console.error(message);
      alert(message);
    }
  };

  const checkIfAdmin = async (token: string) => {
    const res = await fetch('/api/admin/check-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    if (res.ok) {
      const { isAdmin } = await res.json();
      setIsAdmin(isAdmin);
    } else {
      const message = await res.text();
      alert(message);
    }
  };

  const handleArchive = async (id: string) => {
    const response = await fetch('/api/admin/services/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const { message } = await response.json();

    if (response.ok) {
      setShowDeleteModal(false);
      fetchServices();
    } else {
      console.error(message);
      alert(message);
    }
  };

  const modal = (
    <AdminModal
      title={'Archive service?'}
      handleConfirm={() => handleArchive(selectedService!.id)}
      handleCancel={() => setShowDeleteModal(false)}
      danger
    >
      {selectedService && (
        <div className="flex flex-col gap-1" key={selectedService.id}>
          <div className="flex justify-between gap-4">
            <p className="basis-1/2">Name</p>
            <p className="basis-1/2 font-semibold">{selectedService.name}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="basis-1/2">Hours</p>
            <p className="basis-1/2 font-semibold">{selectedService.hours}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="basis-1/2">Price</p>
            <p className="basis-1/2 font-semibold">{selectedService.price}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="basis-1/2">Type</p>
            <p className="basis-1/2 font-semibold">{selectedService.type}</p>
          </div>
        </div>
      )}
    </AdminModal>
  );

  return (
    <>
      <div className="flex h-[86vh] flex-col gap-5">
        <div className="h-[calc(86vh)] overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
          <h3 className="absolute top-10 text-3xl font-bold">
            Manage Services and Promos
          </h3>
          <div className="mb-3 flex justify-between">
            <h3 className="text-xl font-semibold text-gray-500">
              Your Services
            </h3>
            {isAdmin && (
              <AddButton
                href="/admin/main/services/add-service"
                IconComponent={PlusIcon}
              />
            )}
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
                  {isAdmin && (
                    <td className="flex h-12 items-center justify-center gap-2">
                      <EditButton
                        IconComponent={PencilSquareIcon}
                        id={service.id}
                      />
                      <DeleteButton
                        IconComponent={XMarkIcon}
                        onDelete={() => {
                          setSelectedService(service);
                          setShowDeleteModal(true);
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && modal}
    </>
  );
}

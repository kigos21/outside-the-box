'use client';
export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceFormBody } from '@/types';
import { useEffect, useState } from 'react';

export default function AddServices() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ServiceFormBody>({
    name: '',
    hours: '',
    price: '',
    type: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const id = searchParams.get('id');

  useEffect(() => {
    fetchServiceData(id!);
  }, []);

  const fetchServiceData = async (id: string) => {
    const response = await fetch('/api/admin/services/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const { message, service } = await response.json();

    if (response.ok) {
      setFormData(service);
    } else {
      alert(message);
    }
  };

  const updateService = async (id: string) => {
    const response = await fetch('/api/admin/services/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...formData }),
    });

    const { message } = await response.json();

    if (response.ok) {
      setMessage(message);
      setShowModal(true);
    } else {
      console.log(message);
      alert(message);
    }
  };

  const modal = (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/75">
      <div className="mb-12 flex w-[28rem] flex-col gap-8 rounded-lg bg-white px-8 py-6">
        <p className="rounded-md border border-green-700 bg-green-100 px-4 py-2 text-xl font-bold text-green-700">
          Success
        </p>

        <div className="mt-[-1rem] text-sm text-gray-500">{message}</div>

        <div className="flex">
          <button
            onClick={() => {
              setShowModal(false);
              router.push(`/admin/main/services`);
            }}
            className={`basis-full rounded-md bg-cs-blue px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
          <h3 className="absolute top-10 text-3xl font-bold">Edit Service</h3>
          <h3 className="mb-3 text-xl font-semibold">Edit Service / Promo</h3>
          <form
            className="flex flex-grow flex-col justify-between"
            onSubmit={(e) => {
              e.preventDefault();
              updateService(id!);
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="name" className="basis-2/12">
                  Service / Promo name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="hours" className="basis-2/12">
                  Hours
                </label>
                <input
                  type="number"
                  name="hours"
                  id="hours"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="price" className="basis-2/12">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="type" className="basis-2/12">
                  Service type
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 bg-white px-6 py-4"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="" hidden></option>
                  <option value="Regular">Regular</option>
                  <option value="Promo">Promo</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-fit self-end rounded-md bg-cs-blue px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {showModal && modal}
    </>
  );
}

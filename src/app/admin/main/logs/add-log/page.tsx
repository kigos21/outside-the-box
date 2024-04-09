'use client';

import { useEffect, useState } from 'react';
import { CreateLogRequestBody } from '@/types';

export default function AddLog() {
  const [formData, setFormData] = useState<CreateLogRequestBody>({
    firstName: '',
    lastName: '',
    serviceId: '',
  });

  const [services, setServices] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('/api/services');

    if (response.ok) {
      const { services } = await response.json();
      setServices(services);
    } else {
      const message = await response.text();
      console.error(message);
      alert(message);
    }
  };

  const handleSubmit = async (formData: CreateLogRequestBody) => {
    const response = await fetch('/api/logs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const { message } = await response.json();

    if (response.ok) {
      setMessage(message);
      setShowModal(true);
      setFormData({
        firstName: '',
        lastName: '',
        serviceId: '',
      });
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
            onClick={() => setShowModal(false)}
            className={`bg-cs-blue basis-full rounded-md px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Add Log</h3>

        <h3 className="mb-3 text-xl font-semibold">Create New Log</h3>

        <form
          className="flex flex-grow flex-col justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="firstName" className="basis-2/12">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="lastName" className="basis-2/12">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="service" className="basis-2/12">
                Service
              </label>
              <select
                name="service"
                id="service"
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                value={formData.serviceId}
                onChange={(e) =>
                  setFormData({ ...formData, serviceId: e.target.value })
                }
              >
                <option value="" hidden></option>
                {services.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-cs-blue w-fit self-end rounded-md px-6 py-4 font-semibold uppercase text-white shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Add Record
          </button>
        </form>
      </div>

      {showModal && modal}
    </div>
  );
}

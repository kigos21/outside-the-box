'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddServices() {
  const [formData, setFormData] = useState({
    name: '',
    hours: 0,
    price: 0,
    type: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newService = await response.json();
        console.log('New Service:', newService);
        // Redirect to the Services
        router.push('/admin/main/services');
      } else {
        const error = await response.json();
        console.error('Error creating service:', error.message);
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Add Service</h3>
        <h3 className="mb-3 text-xl font-semibold">
          Create New Service / Promo
        </h3>
        <form
          className="flex flex-grow flex-col justify-between"
          onSubmit={handleSubmit}
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
                value={formData.name}
                onChange={handleChange}
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
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
                value={formData.hours}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
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
                value={formData.price}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="type" className="basis-2/12">
                Service type
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="basis-3/12 rounded-md border border-gray-400 bg-white px-6 py-4"
              >
                <option value="" hidden></option>
                <option value="Regular">Regular</option>
                <option value="Special">Special</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
}

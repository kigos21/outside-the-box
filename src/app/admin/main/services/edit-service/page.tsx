//src/app/admin/main/services/edit-service/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { updateService } from './update';

export default function EditService() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const serviceData = Object.fromEntries(searchParams);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('id', serviceData.id); // Add the id to the formData

    await updateService(formData);

    router.refresh();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Edit Service</h3>

        <h3 className="mb-3 text-xl font-semibold">Edit Service / Promo</h3>

        <form
          className="flex flex-grow flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Service / Promo name
              </label>
              <input
                type="text"
                name="name"
                id=""
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                defaultValue={serviceData.name}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Hours
              </label>
              <input
                type="number"
                name="hours"
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                defaultValue={serviceData.hours}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Price
              </label>
              <input
                type="number"
                name="price"
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                defaultValue={serviceData.price}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Service type
              </label>
              <select
                name="type"
                id=""
                className="basis-3/12 rounded-md border border-gray-400 bg-white px-6 py-4"
                defaultValue={serviceData.type}
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

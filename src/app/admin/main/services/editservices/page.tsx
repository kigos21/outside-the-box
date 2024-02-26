'use client';
import { useForm } from 'react-hook-form';

export default function AddServices() {
  const form = useForm();
  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="h-full rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <div className="ml-6">
          <h3 className="mb-14 mt-7 text-4xl font-semibold">
            Edit Service / Promo
          </h3>
          <div>
            <form className="flex flex-col gap-12">
              <div>
                <label className="mb-2 block text-xl font-medium text-black ">
                  SERVICE / PROMO NAME
                </label>
                <input type="text" className="w-1/2 outline outline-2" />
              </div>
              <div>
                <label className="mb-2 block text-xl font-medium text-black ">
                  HOURS
                </label>
                <input type="text" className="w-1/2 outline outline-2" />
              </div>
              <div>
                <label className="mb-2 block text-xl font-medium text-black ">
                  PRICE
                </label>
                <input type="text" className="w-1/2 outline outline-2" />
              </div>
              <div>
                <label className="mb-2 block text-xl font-medium text-black ">
                  SERVICE TYPE
                </label>
                <input type="text" className="w-1/2 outline outline-2" />
              </div>
            </form>
            <div className="float-right mr-20 mt-40">
              <button className="rounded-lg bg-otb-blue px-10 py-2 text-lg font-semibold shadow-lg shadow-black/25">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

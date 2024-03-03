'use client';

import AdminModal from '@/components/AdminModal';
import { useEffect, useState } from 'react';

export default function AddLog() {
  const [showModal, setShowModal] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    setTimeString(`${hour}:${minutes}`);
  }, [showModal]);

  return (
    <div className="flex h-full flex-col">
      {showModal && (
        <AdminModal
          title={'Create log based on this reservation?'}
          handleConfirm={() => console.log('Confirm')}
          handleCancel={() => {
            setShowModal(false);
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">First name</p>
              <p className="basis-1/2 font-semibold">John</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Last name</p>
              <p className="basis-1/2 font-semibold">Castro</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Service</p>
              <p className="basis-1/2 font-semibold">5hrsReg</p>
            </div>
            <div className="flex justify-between gap-4">
              <p className="basis-1/2">Time in</p>
              <p className="basis-1/2 font-semibold">{timeString}</p>
            </div>
          </div>
        </AdminModal>
      )}

      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Add Log</h3>

        <h3 className="mb-3 text-xl font-semibold">Create New Log</h3>

        <form
          className="flex flex-grow flex-col justify-between"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                First name
              </label>
              <input
                type="text"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Last name
              </label>
              <input
                type="number"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Service
              </label>
              <input
                type="number"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
          </div>

          <button
            className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
            onClick={() => setShowModal(true)}
          >
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

import styles from '@/styles/services.module.css';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [modal, setModal] = useState(<div></div>);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setModal(
      isAvailable ? (
        <>
          <div
            className={`w-full rounded-3xl bg-white py-16 text-center ${styles.blueShadow}`}
          >
            Schedule available!
          </div>

          <Link
            href={'/reservation/seat/payment'}
            className="mt-8 w-full flex-1 rounded-full bg-otb-blue px-4 py-2 text-center"
          >
            Proceed
          </Link>

          <span
            onClick={() => setIsFormVisible(true)}
            className="mt-3 cursor-pointer text-sm underline"
          >
            Cancel
          </span>
        </>
      ) : (
        <>
          <div
            className={`w-full rounded-3xl bg-white py-16 text-center ${styles.blueShadow}`}
          >
            Schedule not available!
          </div>

          <span
            onClick={() => setIsFormVisible(true)}
            className="mt-8 w-full flex-1 cursor-pointer rounded-full bg-otb-blue px-4 py-2 text-center"
          >
            Try Again
          </span>
        </>
      ),
    );
  }, [isAvailable]);

  const checkAvailability = () => {
    // check if available
    // setAvailability()
    // render modal

    setIsFormVisible(false);
    setIsAvailable(true);
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center">
      <div className="mx-auto flex min-w-[464px] flex-col gap-8 rounded-3xl bg-otb-yellow p-16 pb-12 shadow-2xl">
        <h2 className="text-center">Pick a schedule</h2>

        <form action="" className="flex flex-col items-center">
          {/* RESERVATION REQUEST FORM */}
          {isFormVisible ? (
            <>
              <div className="flex w-full flex-col gap-3 text-gray-400">
                <input
                  type="date"
                  name=""
                  id=""
                  className="rounded-full px-4 py-2"
                />
                <select name="" id="" className="rounded-full px-4 py-2">
                  <option value="">Time 1</option>
                  <option value="">Time 2</option>
                </select>
                <select name="" id="" className="rounded-full px-4 py-2">
                  <option value="">Service 1</option>
                  <option value="">Service 2</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-8 w-full flex-1 rounded-full bg-otb-blue px-4 py-2"
                onClick={checkAvailability}
              >
                Check Availability
              </button>

              <Link href="/services" className="mt-3 text-sm underline">
                Cancel
              </Link>
            </>
          ) : (
            modal
          )}
        </form>
      </div>
    </div>
  );
}

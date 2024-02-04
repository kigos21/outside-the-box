'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '@/styles/services.module.css';

export default function Page() {
  const [isInquirySent, setIsInquirySent] = useState<boolean>(false);

  const handleClick = () => {
    setIsInquirySent(true);
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center">
      <div className="mx-auto flex w-[664px] flex-col gap-8 rounded-3xl bg-otb-yellow p-16 pb-12 shadow-2xl">
        <h2 className="text-center">Facility Reservation</h2>

        {!isInquirySent ? (
          <>
            <form
              method="post"
              onClick={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                name="email"
                id="email"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Email address"
              />
              <input
                type="text"
                name="attendees"
                id="attendees"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Attendees"
              />
              <input
                type="text"
                name="purpose"
                id="purpose"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Purpose"
              />
              <textarea
                name="additionalInfo"
                id="additionalInfo"
                className="rounded-[1.8rem] border border-gray-300 px-6 py-4"
                placeholder="Additional information"
                rows={4}
              ></textarea>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
                onClick={handleClick}
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <div
              className={`flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8 ${styles.blueShadow}`}
            >
              <p className="font-bold uppercase">Inquiry Sent!</p>

              <p className="text-center text-sm">
                Outside The Box will contact you through your provided email
                address to, please expect us.
              </p>
            </div>

            <Link href="/" className="rounded-full">
              <button
                type="button"
                className="w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Go to Home
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

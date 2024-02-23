'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '@/styles/services.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InquiryFormBody } from '@/types';

export default function Page() {
  const [isInquirySent, setIsInquirySent] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<InquiryFormBody>();

  const sendInquiryForm: SubmitHandler<InquiryFormBody> = async (data) => {
    const res = await fetch('/api/reservation/otb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      console.error(body);
      return;
    }

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
              onSubmit={handleSubmit(sendInquiryForm)}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                id="email"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Email address"
                {...register('email')}
              />
              <input
                type="text"
                id="attendees"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Attendees"
                {...register('attendees')}
              />
              <input
                type="text"
                id="purpose"
                required
                className="rounded-full border border-gray-300 px-6 py-4"
                placeholder="Purpose"
                {...register('purpose')}
              />
              <textarea
                id="additionalInfo"
                className="rounded-[1.8rem] border border-gray-300 px-6 py-4"
                placeholder="Additional information"
                rows={4}
                {...register('additionalInfo')}
              ></textarea>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
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

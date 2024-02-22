'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from '@/styles/services.module.css';

export default function Page() {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const paymentProviders = [
    { qrcode: '/payment/qrcode/gcash.png', name: 'Gcash' },
    { qrcode: '/payment/qrcode/maya.png', name: 'Maya' },
    { qrcode: '/payment/qrcode/bpi.png', name: 'BPI' },
  ];

  const handleClick = async () => {
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const service = searchParams.get('service');

    const res = await fetch('/api/reservation/seat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, time, service }),
    });

    const body = await res.json();

    if (!body.success) {
      // router push with router.push(`/here?params=params`)
    } else {
      setIsPaid(true);
    }
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center">
      <div className="mx-auto flex min-w-[464px] flex-col gap-8 rounded-3xl bg-otb-yellow p-16 pb-12 shadow-2xl">
        <h2 className="text-center">Seat Reservation</h2>

        {!isPaid ? (
          <>
            <div className="flex gap-12">
              {paymentProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="flex flex-col items-center gap-2"
                >
                  <Image
                    src={'/payment/qrcode/gcash.png'}
                    alt={'Gcash QR code'}
                    height={150}
                    width={150}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-bold uppercase">
                    {provider.name}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                className="w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
                onClick={handleClick}
              >
                Continue
              </button>
              <div className="mt-3 text-center text-sm">
                <p>
                  Press &quot;Continue&quot; once you have finished your payment
                </p>
                <p>
                  By continuing, you agree to our{' '}
                  <Link
                    href=""
                    className="font-bold text-otb-blue underline shadow-sm"
                  >
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8 ${styles.blueShadow}`}
            >
              <p className="w-full rounded-lg border border-green-700 bg-green-100 px-3 py-2 text-center font-bold uppercase text-green-700">
                Reservation Success!
              </p>

              <div className="text-sm">
                <p>Reminders for scheduling a reservation</p>
                <ul className="list-inside list-disc">
                  <li>Show up on time</li>
                  <li>Be mindful of other guests</li>
                  <li>Observe our house rules</li>
                </ul>
              </div>
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

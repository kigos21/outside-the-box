'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ScrollToTop from 'react-scroll-to-top';
import ImageUploadForm from '@/components/ImageUploadForm';
import { getApiKey } from '@/lib/imgbb';

export default function Page() {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const paymentProviders = [
    { qrcode: '/payment/qrcode/gcash.png', name: 'Gcash' },
    { qrcode: '/payment/qrcode/maya.png', name: 'Maya' },
    { qrcode: '/payment/qrcode/bpi.png', name: 'BPI' },
  ];

  const handlePayment = async () => {
    const confirmed = confirm(
      'By clicking OK, you assure that you have made your payment.',
    );

    if (!confirmed) {
      return;
    }

    // prepare form data
    const formData = new FormData();
    const imageString = selectedImage as unknown as string;
    formData.append('image', imageString.split(',')[1]);

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
    };

    // upload image to hosting service
    const imgbbApiKey = await getApiKey();
    const imgbbEndpoint = `https://api.imgbb.com/1/upload?expiration=172800&key=${imgbbApiKey}`;
    const imgbbRes = await fetch(imgbbEndpoint, requestOptions);

    if (!imgbbRes.ok) {
      const message = await imgbbRes.text();
      alert(message);
      return;
    }

    const { data } = await imgbbRes.json();

    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const service = searchParams.get('service');
    const seats = JSON.parse(searchParams.get('seats')!);
    const url = data.medium?.url || data.url;

    const res = await fetch('/api/reservation/seat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        service,
        seats,
        proofUrl: url,
      }),
    });

    const body = await res.json();

    if (!body.success) {
      setError(
        `There was a problem while doing the operation: ${body.message} \n` +
          `Contact us immediately: 0956 025 4032 | otbcoworkingph@gmail.com`,
      );
    } else {
      setIsPaid(true);
    }
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center px-4 py-16 font-sans">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <div className="mx-auto flex min-w-[464px] flex-col gap-8 rounded-3xl border-4 border-cs-orange bg-cs-cream px-8 py-6 shadow-2xl sm:p-16 sm:pb-12">
        {/* Conditional rendering of title */}
        {!isPaid ? (
          <h2 className="text-center font-bold text-cs-orange">Payment</h2>
        ) : (
          <h2 className="text-center font-bold text-cs-orange">
            Seat Reservation
          </h2>
        )}

        {!isPaid ? (
          <>
            {/* Payment options */}
            <div className="flex gap-8">
              {paymentProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="flex flex-col items-center gap-2"
                >
                  <Image
                    src={provider.qrcode}
                    alt={`${provider.name} QR code`}
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
              {error && (
                <div className="mb-2 w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-sm text-red-600">
                  {error}
                </div>
              )}

              <ImageUploadForm
                onPayment={handlePayment}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              <div className="mt-3 text-center">
                <p className="text-xs">
                  Press &quot;Continue&quot; once you have finished your payment
                </p>
                <p className="text-xs">
                  By continuing, you agree to our{' '}
                  <Link
                    href=""
                    className="font-bold text-cs-orange underline shadow-sm"
                  >
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Reservation Success message */}
            <div
              className={`flex flex-col items-center justify-center gap-4 rounded-3xl p-8 `}
            >
              <h1 className="borderpx-3 w-full rounded-lg py-2 text-center font-bold ">
                Reservation Successful!
              </h1>

              <div className="text-sm">
                <p className="text-base">
                  Reminders for scheduling a reservation
                </p>
                <ul className="list-inside list-disc pl-4">
                  <li>Show up on time</li>
                  <li>Be mindful of other guests</li>
                  <li>Observe our house rules</li>
                </ul>
              </div>
            </div>

            <Link href="/" className="rounded-full">
              <button
                type="button"
                className=" w-full  rounded-2xl bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
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

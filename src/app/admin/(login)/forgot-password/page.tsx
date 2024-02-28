'use client';

import { useState } from 'react';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginFormBody>();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleVerify = () => {
    // Backend logic to verify OTP
    setShowNewPassword(true);
  };

  const onSubmit: SubmitHandler<LoginFormBody> = async () => {
    // Backend logic
    console.log();
  };

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center bg-white px-10">
      {!showNewPassword && (
        <div className="square-container flex flex-col items-center gap-5 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
          <div className="h-30 w-15">
            <Image
              src={'/otb-logo-cropped.jpg'}
              alt={'Outside the box logo'}
              width={150}
              height={150}
            />
          </div>
          <h1 className="text-x2 mb-3 text-center">
            An Email with an OTP has been sent to the <br /> email of the owner{' '}
            <br />
            <br />
            Please Enter OTP:
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {!showNewPassword && (
              <div>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  required
                  placeholder="OTP"
                  minLength={6}
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="mt-3 w-full rounded-md border border-black px-6 py-4 text-center text-lg"
                />
              </div>
            )}

            <div className="mt-4 flex w-full flex-col gap-4">
              <button
                type="button"
                onClick={handleVerify}
                className="rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {showNewPassword && <NewPassword />}
    </main>
  );
}

function NewPassword() {
  return (
    <div className="square-container flex max-w-md flex-col items-center gap-1 rounded-3xl bg-otb-yellow px-16 py-10 shadow-2xl">
      <Image
        src={'/otb-logo-cropped.jpg'}
        alt={'Outside the box logo'}
        width={300}
        height={300}
        className="h-30 w-15"
      />
      <h2 className="mb-4">Enter New Password</h2>
      <form method="post" className="w-full">
        <div className="mb-4 w-full">
          <label htmlFor="newPassword" className="mb-1 block">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            required
            placeholder="New Password"
            className="w-full rounded-md border border-black px-4 py-1 text-lg"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="confirmPassword" className="mb-1 block">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
            className="w-full rounded-md border border-black px-6 py-1 text-lg"
          />
        </div>
        <Link href="/admin" passHref>
          <button
            type="submit"
            className="w-full rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Reset
          </button>
        </Link>
      </form>
    </div>
  );
}

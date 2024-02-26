'use client';

import { useState } from 'react';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginFormBody>();
  const [showOTP, setShowOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleReset = () => {
    setShowNewPassword(true);
    setShowOTP(false); // Ensure OTP component is not rendered when showing new password
  };

  const handleOTPClick = () => {
    setShowOTP(true);
    setShowNewPassword(false); // Ensure NewPassword component is not rendered when showing OTP
  };

  const onSubmit: SubmitHandler<LoginFormBody> = async () => {
    // Backend logic
    console.log();
  };

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center px-10">
      {!showOTP && !showNewPassword && (
        <div className="square-container flex flex-col items-center gap-8 rounded-3xl bg-white px-16 py-12 shadow-2xl">
          <div className="h-30 w-15">
            <Image
              src={'/otb-logo-cropped.jpg'}
              alt={'Outside the box logo'}
              width={300}
              height={300}
            />
          </div>
          <div className="w-full text-center">
            <h1 className="mb-4 text-xl font-bold">
              An Email with an OTP has been sent to the inbox of the owner
            </h1>
            <span className="text-sm">
              <Link href="/admin" className="underline">
                Back to Login
              </Link>
            </span>
            <span className="text-sm">
              <a className="underline" onClick={handleOTPClick}>
                OTP test
              </a>
            </span>
          </div>
        </div>
      )}
      {showOTP && <OTP onVerify={handleReset} />}
      {showNewPassword && <NewPassword />}
    </main>
  );
}

function OTP({ onVerify }: { onVerify: () => void }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify();
  };

  return (
    <div className="square-container flex flex-col items-center gap-8 rounded-3xl bg-white px-16 py-12 shadow-2xl">
      <Image
        src={'/otb-logo-cropped.jpg'}
        alt={'Outside the box logo'}
        width={300}
        height={300}
        className="h-30 w-15"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="otp"
          id="otp"
          required
          placeholder="OTP"
          minLength={6}
          maxLength={6}
          className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
        />
        <button
          type="submit"
          className="my-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

function NewPassword() {
  return (
    <div className="square-container flex flex-col items-center gap-8 rounded-3xl bg-white px-16 py-12 shadow-2xl">
      <Image
        src={'/otb-logo-cropped.jpg'}
        alt={'Outside the box logo'}
        width={300}
        height={300}
        className="h-30 w-15"
      />
      <h2>Enter New Password</h2>
      <form method="post">
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          placeholder="New Password"
          className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
        />

        <button
          type="submit"
          className="my-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

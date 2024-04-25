'use client';

import { useState, useEffect } from 'react';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginFormBody>();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleVerify = async () => {
    const res = await fetch('/api/admin/login/forgot-password/verifyotp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otpValue,
      }),
    });

    if (res.status === 200) {
      setShowNewPassword(true);
    } else {
      // else conditional
    }
  };

  const onSubmit: SubmitHandler<LoginFormBody> = async () => {
    // Backend logic
    console.log();
  };

  return (
    <main className="flex min-h-[100vh] w-full items-center justify-center bg-white px-10">
      {!showNewPassword && (
        <div className="square-container flex w-[480px] flex-col items-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
          <div className="h-30 w-15">
            <Image
              src={'/otb-logo-cropped.jpg'}
              alt={'Outside the box logo'}
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col gap-4 text-center">
            <p className="w-full rounded-lg border border-blue-500 bg-blue-100 px-3 py-2 text-center text-blue-500">
              An OTP has been sent to the email of the owner.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {!showNewPassword && (
              <div>
                <label htmlFor="otp">Please enter OTP:</label>
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
                  className="mt-3 w-full rounded-md border border-gray-400 px-6 py-4 text-center text-lg"
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
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
  };
  return (
    <div className="square-container flex flex-col items-center gap-8 rounded-3xl bg-otb-yellow px-16 py-10 shadow-2xl">
      <Image
        src={'/otb-logo-cropped.jpg'}
        alt={'Outside the box logo'}
        width={150}
        height={150}
        className="h-30 w-15"
      />
      <p className="text-lg font-semibold">Enter New Password</p>
      <form method="post" className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="newPassword" className="text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                name="newPassword"
                id="newPassword"
                required
                placeholder="New Password"
                className="w-full rounded-md border border-gray-400 px-6 py-4 text-center text-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
              >
                {newPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmNewPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="Confirm Password"
                className="w-full rounded-md border border-gray-400 px-6 py-4 text-center text-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
              >
                {confirmNewPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
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

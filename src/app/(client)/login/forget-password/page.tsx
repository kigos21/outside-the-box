'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import UsernameForm from '@/components/login/UsernameForm';
import OTPForm from '@/components/OTPForm';
import NewPasswordForm from '@/components/login/NewPasswordForm';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [isEnteringUsername, setIsEnteringUsername] = useState<boolean>(true);
  const [isEnteringOTP, setIsEnteringOTP] = useState<boolean>(false);
  const [isEnteringNewPassword, setIsEnteringNewPassword] =
    useState<boolean>(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const res = await fetch('/api/login/forgot-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //   }),
    // });

    // const status = res.status;

    // if (status === 200) {
    //   setIsEnteringUsername(false);
    //   setIsEnteringOTP(true);
    // } else if (status === 400) {
    //   // set conditional
    // } else {
    //   // set conditional
    // }

    //remove after uncommenting
    setIsEnteringUsername(false);
    setIsEnteringOTP(true);
  };

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/login/forgot-password/verifyotp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        otp: otp,
      }),
    });

    const status = res.status;

    if (status === 200) {
      setIsEnteringOTP(false);
      setIsEnteringNewPassword(true);
    } else if (status === 400) {
      // set conditional
    } else {
      // set conditional
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const handleNewPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      const res = await fetch('/api/login/forgot-password/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          newPassword: newPassword,
        }),
      });

      if (res.status === 200) {
        setIsEnteringNewPassword(false);
        setMessage('Password reset successfully!');
      } else {
        // enter conditional pls
      }
    } else {
      // enter conditional pls
    }
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16">
      <div className="flex max-w-lg flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-8 py-6 shadow-2xl sm:px-16 sm:py-12">
        <Image
          src={'/otb-logo-cropped.jpg'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
          className="w-[240px] sm:w-[400px]"
        />

        <div>
          {isEnteringUsername && (
            <UsernameForm
              handleSubmit={handleUsernameSubmit}
              handleChange={handleUsernameChange}
              username={username}
            />
          )}

          {isEnteringOTP && (
            <OTPForm
              handleSubmit={handleOTPSubmit}
              handleChange={handleOTPChange}
              otp={otp}
            />
          )}

          {isEnteringNewPassword && (
            <NewPasswordForm
              handleSubmit={handleNewPasswordSubmit}
              handlePasswordChange={handleNewPasswordChange}
              handleConfirmPasswordChange={handleConfirmPasswordChange}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
            />
          )}

          {message && (
            <div className="flex flex-col gap-8">
              <span>{message}</span>
              <Link href="/login" className="block w-full">
                <button className="my-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
                  Go to Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

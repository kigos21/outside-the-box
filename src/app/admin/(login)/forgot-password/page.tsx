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

    const res = await fetch('/api/admin/login/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    const status = res.status;

    if (status === 200) {
      setIsEnteringUsername(false);
      setIsEnteringOTP(true);
      setMessage('');
    } else if (status === 400) {
      setMessage('Invalid Username. Please try again.');
    } else {
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login/forgot-password/verifyotp', {
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
      setMessage('');
    } else if (status === 400) {
      setMessage('Invalid OTP. Please try again.');
    } else {
      setMessage('An error occurred. Please try again later.');
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

    const res = await fetch('/api/admin/login/forgot-password/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    if (res.status === 200) {
      setIsEnteringNewPassword(false);
      setMessage('Password reset successfully!');
    } else if (res.status === 400) {
      setMessage(
        'Password must be atleast 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one special character [@, $, !, %, *, ?, &].',
      );
    } else if (res.status === 404) {
      setMessage('Passwords do not match.');
    } else {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16 pt-24 text-center">
      <div className="flex max-w-lg flex-col items-center justify-center gap-8 rounded-lg bg-cs-yellow px-8 py-6 shadow-2xl sm:px-16 sm:py-12">
        <Image
          src={'/coursescape-logo-cropped.png'}
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
              <Link href="/admin" className="block w-full">
                <button className="w-full rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-cs-black hover:text-cs-cream hover:shadow-none">
                  Go to Login
                </button>
              </Link>
              <span className="m-auto flex text-sm text-red-500">
                {message}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import UsernameForm from '@/components/login/UsernameForm';
import OTPForm from '@/components/login/OTPForm';
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

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);

    setIsEnteringUsername(false);
    setIsEnteringOTP(true);
  };

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  const handleOTPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(otp);

    setIsEnteringOTP(false);
    setIsEnteringNewPassword(true);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const handleNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newPassword);
    console.log(confirmPassword);

    setIsEnteringNewPassword(false);
    setMessage('Password reset successfully!');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex max-w-lg flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
        <Image
          src={'/otb-logo-cropped.jpg'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
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

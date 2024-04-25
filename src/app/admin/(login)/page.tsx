'use client';

import { useRouter } from 'next/navigation';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { register, handleSubmit } = useForm<LoginFormBody>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormBody> = async ({
    username,
    password,
  }) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        username: trimmedUsername,
        password: trimmedPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { success, message } = await response.json();

    if (response.ok) {
      router.push('/admin/main');
    } else {
      setError(message);
    }
  };

  const handleLinkClick = async () => {
    const res = await fetch('/api/admin/login/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      router.push('/admin/forgot-password/');
    }
  };

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center gap-8 px-10">
      <div className="mx-5 flex flex-col items-center">
        <div className="mx-5">
          <Image
            src={'/otb-logo.jpg'}
            width={350}
            height={350}
            alt={'logo'}
            className={'m-auto'}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 rounded-xl bg-white px-16 py-12 shadow-2xl">
        <div className="w-full border-none">
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-96 flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                placeholder="Username e.g. joe123"
                className="rounded-md border border-gray-400 px-6 py-4"
                {...register('username', { required: true })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  required
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-400 px-6 py-4"
                  {...register('password', { required: true })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
                >
                  {passwordVisible ? (
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

            <div className="mt-4 flex flex-col gap-4">
              {error && (
                <div className="w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-sm text-red-600">
                  {error}
                </div>
              )}
              <button className=" rounded-md bg-otb-yellow px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
                Login
              </button>
              <span className="text-center">
                <Link
                  onClick={handleLinkClick}
                  href={'#'}
                  className="text-sm underline"
                >
                  Forget Password
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

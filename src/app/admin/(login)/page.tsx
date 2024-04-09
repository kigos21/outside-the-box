'use client';

import { useRouter } from 'next/navigation';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AdminLogin() {
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<LoginFormBody>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormBody> = async ({
    username,
    password,
  }) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                className="rounded-md border border-gray-400 px-6 py-4"
                {...register('password', { required: true })}
              />
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

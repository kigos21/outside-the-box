'use client';

import { useRouter } from 'next/navigation';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function AdminLogin() {
  const [tries, setTries] = useState<number>(0);
  const [timeout, setTimeout] = useState<number>(0);
  const [timeoutMessage, setTimeoutMessage] = useState<string>('');
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<LoginFormBody>();
  const router = useRouter();

  useEffect(() => {
    setTimeoutMessage(`Try again after ${timeout} seconds.`);

    const interval = setInterval(() => {
      setTimeout((prevTimeout: number) => {
        if (prevTimeout === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimeout - 1;
        }
      });
    }, 1000);

    // prevent multiple interval functions from spawning everytime `timeout`
    // state change
    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  useEffect(() => {
    if (tries === 3) {
      setTimeout(30);
      setTries(0);
    }
  }, [tries]);

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

      if (message === 'Invalid credentials') {
        setTries((count) => (count += 1));
      }
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
            src={'/coursescape-logo-cropped-removebg.png'}
            width={500}
            height={550}
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

              {timeout !== 0 && (
                <p role="alert" className="text-center text-base text-red-500">
                  {timeoutMessage}
                </p>
              )}

              <button
                disabled={timeout !== 0}
                className="bg-cs-yellow disabled:hover:bg-cs-yellow cursor-pointer rounded-md px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none disabled:opacity-10 disabled:hover:text-black"
              >
                Login
              </button>
              <span className="text-center">
                <Link
                  href={'/admin/forgot-password'}
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

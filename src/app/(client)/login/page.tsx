'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormBody } from '@/types';
import { useState } from 'react';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormBody>();

  const onSubmit: SubmitHandler<LoginFormBody> = async (data) => {
    router.push('/login'); // remove GET variables from URL

    try {
      const { username, password } = data;
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        const { token } = await res.json();

        // Store the token securely in cookie
        document.cookie = `token=${token}; path=/; Secure; SameSite=Strict;`;
        router.push('/');
      } else {
        const { message } = await res.json();
        setErrorMessage(message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(JSON.stringify(message));
    }
  };

  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16 pt-40">
      <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-cs-yellow px-8 py-6 shadow-2xl max-sm:flex-grow sm:px-16 sm:py-12">
        {/* Sa Login errors to */}
        {errorMessage && (
          <div className="w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {message && (
          <div className="w-full rounded-md border border-green-400 bg-green-50 p-4 text-center text-sm text-green-600">
            {message}
          </div>
        )}

        <Image
          src={'/coursescape-logo-cropped.png'}
          alt={'Coursescape logo'}
          width={400}
          height={140}
          className="w-[240px] sm:w-[400px]"
        />

        <div className="w-full">
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              id="username"
              required
              placeholder="Username e.g. joe123"
              className="rounded-full border border-gray-300 px-6 py-4"
              {...register('username', { required: true })}
            />
            {errors.username && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              className="rounded-full border border-gray-300 px-6 py-4"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <span>
              <Link
                href="/login/forget-password"
                className="ml-4 text-sm underline"
              >
                Forget Password?
              </Link>
            </span>

            <div className="mt-0 flex w-full flex-col items-center gap-4">
              <button className="bg-cs-blue w-28 rounded-lg px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-cs-black hover:text-cs-cream hover:shadow-none">
                Login
              </button>

              <span className="block text-center text-sm">
                Don&apos;t have an account yet?{' '}
                <Link
                  href="/register"
                  className="text-cs-blue font-bold underline shadow-sm"
                >
                  Register
                </Link>{' '}
                here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

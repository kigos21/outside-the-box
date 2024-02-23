'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Customer, LoginFormBody } from '@/types';
import { login } from '@/lib/utils/customer';
import { useCallback, useEffect, useState } from 'react';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormBody>();

  const onSubmit: SubmitHandler<LoginFormBody> = async (data) => {
    router.push('/login'); // remove GET variables from URL

    try {
      const { username, password } = data;
      const res = await login(username, password);

      if (res.ok) {
        const { success, customer, token } = await res.json();

        // Store the token securely in cookie
        document.cookie = `token=${token}; path=/; Secure;`;
        router.push('/');
      } else {
        const { message } = await res.json();
        setErrorMessage(message);
      }
    } catch (error) {
      console.error(error);
      console.log('Login failed.');
    }
  };

  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-[85dvh] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
        {error && (
          <div className="w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

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
          src={'/otb-logo-cropped.jpg'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
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
              <Link href="/login/forget-password" className="text-sm underline">
                Forget Password
              </Link>
            </span>

            <div className="mt-4 flex w-full flex-col gap-4">
              <button className="rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
                Login
              </button>

              <span className="block text-center text-sm">
                Don&apos;t have an account yet?{' '}
                <Link
                  href="/register"
                  className="font-bold text-otb-blue underline shadow-sm"
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

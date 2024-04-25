'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormBody } from '@/types';
import { useEffect, useState } from 'react';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tries, setTries] = useState<number>(0);
  const [timeout, setTimeout] = useState<number>(0);
  const [timeoutMessage, setTimeoutMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
      const usernameInput = username.trim();
      const passwordInput = password.trim();
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

        if (message === 'Invalid credentials') {
          setTries((count) => (count += 1));
        }
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
      <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-cs-yellow px-8 py-6 shadow-2xl max-sm:flex-grow sm:px-16 sm:py-12">
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
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                required
                placeholder="Password"
                className="w-full rounded-full border border-gray-300 px-6 py-4"
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

            {timeout !== 0 && (
              <p role="alert" className="text-center text-base text-red-500">
                {timeoutMessage}
              </p>
            )}

            <div className="mt-0 flex w-full flex-col items-center gap-4">
              <button
                disabled={timeout !== 0}
                className="w-28 rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-cs-black hover:text-cs-cream hover:shadow-none"
              >
                Login
              </button>

              <span className="block text-center text-sm">
                Don&apos;t have an account yet?{' '}
                <Link
                  href="/register"
                  className="font-bold text-cs-blue underline shadow-sm"
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

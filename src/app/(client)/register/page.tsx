'use client';

import { RegisterFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Register() {
  const [responseError, setResponseErrors] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormBody>();

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormBody> = async (data) => {
    const usernameResponse = await fetch('/api/register/username-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: data.username }),
    });

    if (!usernameResponse.ok) {
      const data = await usernameResponse.json();
      setRegisterError(data.error);
      return;
    }

    const { confirmPassword, ...customer } = data;

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    const { message } = await res.json();

    if (!res.ok) {
      setResponseErrors(message);
    } else {
      router.push(`/login?message=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16 pt-40">
      <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-cs-yellow px-8 py-6 shadow-2xl max-sm:flex-grow sm:px-16 sm:py-12">
        <Image
          src={'/coursescape-logo-cropped.png'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
          className="w-[240px] sm:w-[400px]"
        />

        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex max-w-md flex-col gap-4"
          >
            <input
              type="text"
              id="username"
              required
              placeholder="Username e.g. joe123"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 50,
                validate: {
                  valid: (input) => /^[a-zA-Z0-9]{3,}$/.test(input),
                },
              })}
            />
            {errors.username && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required, should only contain alphanumeric
                characters, and is atleast 3 characters long.
              </p>
            )}

            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('password', {
                required: true,
                minLength: 8,
                validate: {
                  strength: (input) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      input,
                    ),
                },
              })}
            />
            {errors.password && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required, atleast 8 characters long, and include
                at least one lowercase letter, one uppercase letter, one digit,
                and one special character [@, $, !, %, *, ?, &].
              </p>
            )}

            <input
              type="password"
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('confirmPassword', {
                required: true,
                validate: {
                  match: (input) => input === watch('password'),
                },
              })}
            />
            {errors.confirmPassword?.type === 'required' && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}
            {errors.confirmPassword?.type === 'match' && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                Passwords do not match.
              </p>
            )}

            <input
              type="text"
              id="firstName"
              required
              placeholder="First name"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('firstName', {
                required: true,
              })}
            />
            {errors.firstname && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <input
              type="text"
              id="lastName"
              required
              placeholder="Last name"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('lastName', {
                required: true,
              })}
            />
            {errors.lastname && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <select
              id="occupation"
              className="rounded-lg border border-gray-300 px-5 py-4"
              defaultValue={''}
              {...register('occupation', {
                required: true,
                validate: {
                  validEnum: (option) =>
                    option === 'student' ||
                    option === 'working-student' ||
                    option === 'professional',
                },
              })}
            >
              <option hidden>Occupation</option>
              <option value="student" className="p-6">
                Student
              </option>
              <option value="working-student">Working Student</option>
              <option value="professional">Professional</option>
            </select>
            {errors.occupation && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <input
              type="text"
              id="affiliation"
              required
              placeholder="Affiliation"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('affiliation', {
                required: true,
              })}
            />
            {errors.affiliation && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required.
              </p>
            )}

            <input
              type="tel"
              id="mobileNumber"
              required
              placeholder="Mobile Number"
              className="rounded-lg border border-gray-300 px-6 py-4"
              {...register('mobileNumber', {
                required: true,
                validate: {
                  isNumber: (tel) => /^\d{11}$/.test(tel),
                },
              })}
            />
            {errors.mobileNumber && (
              <p
                role="alert"
                className="mt-[-0.75rem] px-6 text-xs text-red-500"
              >
                This field is required, and should be a valid local mobile
                number.
              </p>
            )}

            {responseError && (
              <p
                role="alert"
                className="mt-2 px-6 text-center text-xs text-red-500"
              >
                Sorry! We cannot complete yout request at the moment. Error:{' '}
                {responseError}
              </p>
            )}

            {registerError && (
              <div className="w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-red-600">
                {registerError}
              </div>
            )}

            <div className="mt-4 flex w-full flex-col items-center gap-4">
              <button
                type="submit"
                className="bg-cs-blue w-32 rounded-lg px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Register
              </button>

              <span className="block text-center text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-cs-blue font-bold underline shadow-sm"
                >
                  Login
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

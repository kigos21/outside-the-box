'use client';

import OTPForm from '@/components/OTPForm';
import { RegisterFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Register() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [responseError, setResponseErrors] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [otpError, setOTPError] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormBody>();
  const onSubmit: SubmitHandler<RegisterFormBody> = async (data) => {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { error } = await res.json();

    if (!res.ok) {
      setResponseErrors(error.name);
    }

    if (res.status === 200) {
      setMobileNumber(data.mobileNumber);
      setIsFormValid(true);
    }
  };

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };
  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/register/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp, mobileNumber }),
    });

    const { status, message } = await res.json();

    if (!res.ok) {
      setOTPError(message);
      return;
    }

    if (status !== 'approved') {
      setOTPError(message);
    }

    if (status === 'approved') {
      router.push('/login?message=registered');
    } else {
      console.log('---\nThis should NOT log!\n---');
    }
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center">
      <div className="my-32 flex flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
        <Image
          src={'/otb-logo-cropped.jpg'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
        />

        <div className="w-full">
          {!isFormValid ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex max-w-md flex-col gap-4"
            >
              <input
                type="text"
                id="username"
                required
                placeholder="Username e.g. joe123"
                className="rounded-full border border-gray-300 px-6 py-4"
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
                className="rounded-full border border-gray-300 px-6 py-4"
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
                  at least one lowercase letter, one uppercase letter, one
                  digit, and one special character [@, $, !, %, *, ?, &].
                </p>
              )}

              <input
                type="password"
                id="confirmPassword"
                required
                placeholder="Confirm Password"
                className="rounded-full border border-gray-300 px-6 py-4"
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
                className="rounded-full border border-gray-300 px-6 py-4"
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
                className="rounded-full border border-gray-300 px-6 py-4"
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
                className="rounded-full border border-gray-300 px-5 py-4"
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
                className="rounded-full border border-gray-300 px-6 py-4"
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
                className="rounded-full border border-gray-300 px-6 py-4"
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

              <div className="mt-4 flex w-full flex-col gap-4">
                <button
                  type="submit"
                  className="rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
                >
                  Register
                </button>

                <span className="block text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-bold text-otb-blue underline shadow-sm"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </form>
          ) : (
            <OTPForm
              handleSubmit={handleOTPSubmit}
              handleChange={handleOTPChange}
              otp={otp}
              errorMessage={otpError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { RegisterFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import OTPForm from '@/components/OTPForm';

export default function Register() {
  const [otp, setOTP] = useState<string>('');
  const [responseError, setResponseErrors] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');
  const [isEnteringOTP, setIsEnteringOTP] = useState(false);
  const [otpError, setOtpError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormBody>();

  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setOTP(value.trim());
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/register/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });

    const status = res.status;

    if (status === 200) {
      await handleOtpVerificationSuccess(watch()); // Wait for success
      setIsEnteringOTP(false);
    } else if (status === 400) {
      setOtpError('Invalid OTP. Please try again.');
    } else {
      setOtpError('An error occurred. Please try again later.');
    }
  };

  const handleOtpVerificationSuccess: SubmitHandler<RegisterFormBody> = async (
    data,
  ) => {
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

  const onSubmit: SubmitHandler<RegisterFormBody> = async (data) => {
    const usernameResponse = await fetch('/api/register/username-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username.trim(),
        mobileNumber: data.mobileNumber.trim(),
      }),
    });

    if (!usernameResponse.ok) {
      const data = await usernameResponse.json();
      setRegisterError(data.error);
      return;
    }

    setIsEnteringOTP(true);
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16 pt-40">
      <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-cs-yellow px-8 py-6 shadow-2xl max-sm:flex-grow sm:px-16 sm:py-12">
        <Image
          src={'/coursescape-logo-cropped.png'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
          className="w-[240px] sm:w-[400px]"
        />

        <div className="w-full">
          {!isEnteringOTP && (
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
                    valid: (input) => /^[a-zA-Z0-9]{3,}$/.test(input.trim()),
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

              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  required
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-300 px-6 py-4"
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    validate: {
                      strength: (input) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          input.trim(),
                        ),
                    },
                  })}
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
                  This field is required, atleast 8 characters long, and include
                  at least one lowercase letter, one uppercase letter, one
                  digit, and one special character [@, $, !, %, *, ?, &].
                </p>
              )}

              <div className="relative">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  className="w-full rounded-lg border border-gray-300 px-6 py-4"
                  {...register('confirmPassword', {
                    required: true,
                    validate: {
                      match: (input) =>
                        input.trim() === watch('password').trim(),
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
                >
                  {confirmPasswordVisible ? (
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
                  validate: {
                    validName: (firstName) => {
                      if (firstName) {
                        const regex = /^[A-Za-z .-]+$/;
                        return regex.test(firstName.trim());
                      }
                    },
                  },
                })}
              />
              {errors.firstName?.type === 'required' && (
                <p
                  role="alert"
                  className="mt-[-0.75rem] px-6 text-xs text-red-500"
                >
                  This field is required.
                </p>
              )}
              {errors.firstName?.type === 'validName' && (
                <p
                  role="alert"
                  className="mt-[-0.75rem] px-6 text-xs text-red-500"
                >
                  This field accepts text characters (a-z, A-Z).
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
                  validate: {
                    validName: (lastName) => {
                      if (lastName) {
                        const regex = /^[A-Za-z .-]+$/;
                        return regex.test(lastName.trim());
                      }
                    },
                  },
                })}
              />
              {errors.lastName?.type === 'required' && (
                <p
                  role="alert"
                  className="mt-[-0.75rem] px-6 text-xs text-red-500"
                >
                  This field is required.
                </p>
              )}
              {errors.lastName?.type === 'validName' && (
                <p
                  role="alert"
                  className="mt-[-0.75rem] px-6 text-xs text-red-500"
                >
                  This field accepts text characters (a-z, A-Z).
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
                <option value="student" className="p-6 ">
                  Student
                </option>
                <option value="working-student" className="p-6 ">
                  Working Student
                </option>
                <option value="professional" className="p-6 ">
                  Professional
                </option>
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

              <span className="block text-center text-sm">
                By clicking Register, you agree to our{' '}
                <Link
                  href="/terms"
                  className="font-bold text-cs-blue underline shadow-sm"
                >
                  {' '}
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="font-bold text-cs-blue underline shadow-sm"
                >
                  Privacy Policy
                </Link>{' '}
              </span>

              <div className="mt-2 flex w-full flex-col items-center gap-4">
                <button
                  type="submit"
                  className="w-32 rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
                >
                  Register
                </button>

                <span className="mt-2 block text-center text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-bold text-cs-blue underline shadow-sm"
                  >
                    Login
                  </Link>{' '}
                  here
                </span>
              </div>
            </form>
          )}
          {isEnteringOTP && (
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

'use client';

import { RegisterFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ScrollToTop from 'react-scroll-to-top';
import TermsModal from '@/components/TermsModal';
import PrivacyModal from '@/components/PrivacyModal';

import OTPForm from '@/components/OTPForm';

export default function Register() {
  const [otp, setOTP] = useState<string>('');
  const [responseError, setResponseErrors] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');
  const [isEnteringOTP, setIsEnteringOTP] = useState(false);
  const [otpError, setOtpError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const openTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

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
    setOTP(value.trimEnd());
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
    if (!termsAgreed) {
      setRegisterError(
        'You must agree to the Terms and Conditions and Privacy Policy to register.',
      );
      return;
    }

    if (!usernameResponse.ok) {
      const data = await usernameResponse.json();
      setRegisterError(data.error);
      return;
    }

    setIsEnteringOTP(true);
  };

  return (
    <div className="flex min-h-[85dvh] items-center justify-center px-4 py-16 pt-40">
      <ScrollToTop smooth color="#0d49a6" width="40" />
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
                    valid: (input) => /^[a-zA-Z0-9]{3,}$/.test(input),
                    trimSpaces: (input) => input.trimEnd() === input,
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
                type="email"
                id="email"
                required
                placeholder="Email"
                className="rounded-lg border border-gray-300 px-6 py-4"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p
                  role="alert"
                  className="mt-[-0.75rem] px-6 text-xs text-red-500"
                >
                  {errors.email.message}
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
                        return regex.test(firstName.trimEnd());
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
                        return regex.test(lastName.trimEnd());
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
                    isNumber: (tel) => /^\d{11}$/.test(tel.trim()),
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

              {/* {responseError && (
              <p
                role="alert"
                className="mt-2 px-6 text-center text-xs text-red-500"
              >
                Sorry! We cannot complete yout request at the moment. Error:{' '}
                {responseError}
              </p>
            )} */}

              {registerError && (
                <div className="w-full rounded-md border border-red-400 bg-red-50 p-4 text-center text-red-600">
                  {registerError}
                </div>
              )}

              <div>
                <span className="mt-2 block text-center text-sm">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    {...register('termsAgreement', {
                      required: true,
                      validate: (checked) => checked,
                    })}
                  />{' '}
                  I agree to the{' '}
                  <span
                    className="cursor-pointer text-sm  font-bold text-cs-blue underline shadow-sm"
                    onClick={openTermsModal}
                  >
                    Terms and Conditions
                  </span>{' '}
                  and{' '}
                  <span
                    onClick={openPrivacyModal}
                    className="cursor-pointer text-sm  font-bold text-cs-blue underline shadow-sm"
                  >
                    Privacy Policy
                  </span>{' '}
                </span>

                <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal}>
                  <h2 className="text-3xl font-bold leading-6 text-gray-900">
                    Terms and Conditions
                  </h2>
                  <div className="mt-6">
                    <p className="mb-4 text-left text-sm">
                      Welcome to our website{' '}
                      <strong>Coursescape Coworking Space</strong>. Please read
                      these terms and conditions carefully before using
                      coursescape.com website operated by Coursescape Coworking
                      Space ("Site", "us", "we", "our").
                      <br />
                      <br />
                      The use of this website is subject to the following terms
                      of use:
                    </p>
                    <h2 className="text-lg font-bold underline">
                      Conditions of use
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● By using this website, you certify that you have read
                        and reviewed this Agreement and that you agree to comply
                        with its terms. If you do not want to be bound by the
                        terms of this Agreement, you are advised to stop using
                        the website accordingly. Coursescape Coworking Space
                        only grants the use and access to this website and its
                        services to those who have accepted its terms. <br />●
                        The content of the pages of this website is for your
                        general information and use only. It is subject to
                        change without notice.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Privacy Policy
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● Before you continue using our website, we advise you
                        to read our{' '}
                        <Link href="privacy">
                          <span className="text-sm font-bold">
                            Privacy Policy
                          </span>
                        </Link>{' '}
                        regarding our user data collection. It will help you
                        better understand our practices.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Intellectual Property
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● This website contains material which is owned by or
                        licensed to us. This material includes but is not
                        limited to, the design, layout, look, appearance, and
                        graphics. Reproduction is prohibited other than in
                        accordance with the copyright notice, which forms part
                        of these terms and conditions.
                        <br /> ● Unauthorized use of this website may give rise
                        to a claim for damages and/or be a criminal offense.
                        <br /> ● From time to time, this website may also
                        include links to other websites. These links are
                        provided for your convenience to provide further
                        information. They do not signify that we endorse the
                        website(s). We have no responsibility for the content of
                        the linked website(s).
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      User accounts
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● As a user of this website, you may be asked to
                        register with us and provide private information. You
                        are responsible for ensuring the accuracy of this
                        information, and you are responsible for maintaining the
                        safety and security of your identifying information. You
                        are also responsible for all activities that occur under
                        your account or password.
                        <br /> ● If you think there are any possible issues
                        regarding the security of your account on the website,
                        inform us immediately so we may address them
                        accordingly.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">Disputes</h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● Any disputes arising from the use of this website will
                        be resolved in accordance with applicable laws.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Idemnification
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● You agree to indemnify Coursescape Coworking Space and
                        its affiliates and hold Coursescape Coworking Space
                        harmless against legal claims and demands that may arise
                        from your use or misuse of our services. We reserve the
                        right to select our own legal counsel.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Limitation on liability
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        ● Coursescape Coworking Space is not liable for any
                        damages that may occur to you as a result of your misuse
                        of our website. <br />● Coursescape Coworking Space
                        reserves the right to edit, modify, and change this
                        Agreement at any time. We shall let our users know of
                        these changes through electronic mail. This Agreement is
                        an understanding between Coursescape Coworking Space and
                        the user, and this supersedes and replaces all prior
                        agreements regarding the use of this website.
                        <br />
                        <br />
                        By using this website, you acknowledge that you have
                        read, understood, and agreed to these terms of use.
                        <br />
                        <br /> If you have any questions or concerns about these
                        terms, please contact us at [contact info]
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">Reservation</h2>
                    <h3 className="text-sm font-bold ">
                      For facility reservation:
                    </h3>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        1. An amount of Php 2,500.00 per extra hour exceeding
                        the time frame agreed will be charged to the outstanding
                        balance.
                        <br /> 2. Guests are strictly required to observe the
                        house rules as posted in the venue.
                      </li>
                      <ul className="ml-2">
                        <h3 className="text-sm font-bold ">Inclusions:</h3>
                        <li className="mb-4 text-left text-sm">
                          1. Unlimited Coffee <br />
                          2. Unlimited Purified Water <br />
                          3. Free Use of 24" Flat Screen TV (upon request) OR
                          Free Use of Projector and Projector Screen <br />
                          4. Free Use of Sound System (Speakers and 2
                          Microphones) <br />
                          5. No Corkage Fee (No foul-smelling food allowed){' '}
                          <br />
                          6. Free Use of Unlimited Wi-Fi
                        </li>
                      </ul>
                    </ul>
                    <h3 className="text-sm font-bold ">
                      For seat reservation:
                    </h3>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        1. A non-refundable reservation fee of 50% of the agreed
                        rate is required to confirm the client's reservation.
                        The remaining balance is payable on the date of the
                        client's stay.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Cancellation/Refunds/Rescheduling
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        1. The reservation fee is non-refundable under any
                        circumstances, including but not limited to
                        cancellations, rescheduling, or changes in the event
                        details.
                        <br />
                        <ul>
                          <li className="ml-2 text-sm font-bold">
                            Exception(s):
                          </li>
                          <li className="ml-4 text-sm">
                            a. If Coursescape Coworking Space cancels the
                            booking due to unforeseen maintenance, repairs, or
                            unavailability of the premises beyond the control of
                            Coursescape, the non-refundable deposit may be
                            credited towards a future booking or partially
                            refunded, as decided by the management.{' '}
                          </li>
                        </ul>
                        2. Changes in date and/or time are subject to the
                        availability of the venue. As management will try to
                        accommodate changes proposed by the client, no guarantee
                        is placed on the ability to accommodate such changes.
                        Additional fees may apply depending on the requests.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Rules and Regulations for Walk-in customers
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        1. Register at the front desk.
                        <br />
                        <ul>
                          <li className="ml-2 text-sm ">
                            a. To register at the front desk, you must first
                            create an account on our website. Any person not
                            registered will not be permitted to enter the
                            premises.
                          </li>
                        </ul>
                        2. Present any ID (i.e., government, school) to the
                        staff upon registration. <br />
                        3. Be considerate. Keep voices and noises down to a
                        minimum to avoid disturbing other guests.
                        <br /> 4. Do not leave your things unattended.
                        Coursescape Coworking Space shall not be liable for any
                        loss.
                        <br /> 5. A 10-minute grace period is allowed before an
                        additional hour is charged to your balance.
                        <br /> 6. Maintain a clean and tidy environment for all
                        users to enjoy. Any spills, stains, or damage caused to
                        the property will result in a penalty fee, as we take
                        the maintenance of our premises seriously.
                        <br /> 7. Follow the "Clean As You Go" rule: Please
                        clean up after yourself and dispose of any waste
                        properly. This helps maintain a pleasant environment for
                        all users of the workspace.
                      </li>
                    </ul>
                  </div>
                </TermsModal>
                <PrivacyModal
                  isOpen={isPrivacyModalOpen}
                  onClose={closePrivacyModal}
                >
                  <h2 className="text-3xl font-bold leading-6 text-gray-900">
                    Privacy Policy
                  </h2>
                  <div className="mt-6">
                    <p className="mb-4 text-left text-sm">
                      <strong>Coursescape Coworking Space</strong> is committed
                      to transparency regarding the information we collect and
                      how it is utilized. This Privacy Policy describes how
                      Coursescape Coworking Space (the "Site", "we", "us", or
                      "our") collects, uses, and discloses your personal
                      information when you visit, use our services, or make a
                      purchase from coursescape.com (the "Site") or otherwise
                      communicate with us (collectively, the "Services"). For
                      purposes of this Privacy Policy, "you" and "your" means
                      you as the user of the Services, whether you are a
                      customer, website visitor, or another individual whose
                      information we have collected pursuant to this Privacy
                      Policy.
                      <br />
                      <br />
                      We urge you to review this Privacy Policy thoroughly. By
                      utilizing and accessing any of our services, you
                      acknowledge and consent to the collection, utilization,
                      and disclosure of your information as delineated herein.
                      If you do not agree to the terms outlined in this Privacy
                      Policy, please refrain from using any of our services.
                    </p>
                    <h2 className="text-lg font-bold underline">
                      Information We Collect
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        <strong>Personal Information:</strong> When you register
                        for an account, we collect personal information from our
                        users to provide seamless and personalized experience in
                        reserving your desired seat. The type of personal
                        information includes:
                        <br />
                        <br />• Name: Your name helps us address you
                        appropriately and ensures a personalized interaction.{' '}
                        <br />• Occupation: Understanding your occupation allows
                        us to tailor our services to better suit your needs and
                        preferences.
                        <br /> • Affiliation: Your affiliation provides valuable
                        context that assists us in enhancing your experience and
                        meeting your specific requirements.
                        <br /> • Mobile Number: Having your mobile number on
                        record enables us to efficiently communicate reservation
                        details and updates to you, ensuring a smooth and
                        hassle-free process. <br />
                        <br />
                        We use the collected personal information for the
                        following purposes: <br />
                        <br />• Easily identify a person in reserving <br />•
                        Communication with users about reservation details{' '}
                        <br /> • Responding to user inquiries and support
                        requests <br /> <br /> We may also use personal
                        information for commercial purposes, such as: <br />{' '}
                        <br /> • Advertising new promos to users <br /> •
                        Offering services to users that may be of interest to
                        them. <br /> <br />
                        We take the protection of personal information seriously
                        and have implemented ways to safeguard personal
                        information. These measures include: <br /> <br />•
                        Limiting access to personal information to authorized
                        personnel only <br />• Storing personal information on
                        secure servers <br /> • Using encryption to protect
                        personal information during transmission <br /> •
                        Regularly monitoring our systems for security
                        vulnerabilities
                      </li>
                      <li className="mb-4 text-left text-sm">
                        <strong>Payment Information:</strong> When you reserve a
                        seat through our website, we will collect your payment
                        information necessary to process your transaction
                        securely. This may include:
                        <br />
                        <br />• Number
                        <br />• Credit or Debit Card Information
                        <br />• Payment Method Details
                        <br />• Billing Address
                        <br />
                        <br /> We utilize reputable third-party payment
                        processors to handle transactions securely. We do not
                        store or have access to your complete payment
                        information, as it is handled directly by these
                        processors. Please review the privacy policies of our
                        payment processors for information regarding their
                        handling of your payment details.
                      </li>
                      <li className="mb-4 text-left text-sm">
                        <strong>Reservation Information:</strong> When you
                        reserve a seat, we store the reservation details for
                        record-keeping. The type of reservation information
                        includes:
                        <br />
                        <br />• The time and date of the user’s reservation
                        <br />• How frequently a user reserves in the website
                        <br />
                        <br /> We use the collected reservation information for
                        the following: <br />
                        <br />• To generate business reports
                        <br /> • Analyzing business performance with its
                        reservation numbers
                      </li>
                      <li className="mb-4 text-left text-sm">
                        <strong>Log Information:</strong> We may collect log
                        information related to your use of our website which
                        includes:
                        <br />
                        <br />• Your IP address <br />• Browser used in
                        accessing the website <br />• Pages visited in the
                        website <br /> • The date and time of accessing the
                        website
                        <br />
                        <br /> We use the collected log information for the
                        following:
                        <br />
                        <br /> • Analyzing the browser types and pages visited
                        helps us optimize our website's performance and user
                        experience. <br />• Your IP address and the date/time of
                        access aid us in monitoring and detecting any
                        unauthorized or suspicious activity on our website,
                        helping to safeguard your data and our platform's
                        integrity. <br />• Understanding which pages are most
                        frequently visited and at what times helps us gauge the
                        effectiveness of our content and make informed decisions
                        for improvement.
                        <br /> • Log information assists our technical team in
                        diagnosing and resolving any technical issues that may
                        arise during your use of our website, ensuring a smooth
                        browsing experience for all users.
                        <br /> • In certain cases, we may need to retain log
                        information to comply with legal or regulatory
                        requirements, or to respond to legal requests or
                        investigations. This helps us uphold our commitment to
                        transparency and accountability.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">
                      Payment Methods
                    </h2>
                    <li className="mb-4 text-left text-sm">
                      <strong>Payment Options:</strong> Coursescape Coworking
                      Space accepts the following payment methods for
                      transactions made on our website:
                      <br />
                      <br />• GCash
                      <br />• Maya
                      <br />• BPI
                      <br />
                      <br /> These payment methods offer secure and convenient
                      options for completing transactions on our website. Please
                      note that additional terms and conditions may apply
                      depending on the chosen payment method.
                    </li>
                    <h2 className="text-lg font-bold underline">
                      Changes to the Privacy Policy
                    </h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        The Privacy Policy may be updated from time to time.
                        Users will be notified if the Privacy Policy is updated.
                      </li>
                    </ul>
                    <h2 className="text-lg font-bold underline">Contact Us</h2>
                    <ul>
                      <li className="mb-4 text-left text-sm">
                        If you have any questions or concerns regarding the
                        Privacy Policy, contact us at coursescapeph@gmail.com
                      </li>
                    </ul>
                  </div>
                </PrivacyModal>
              </div>

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

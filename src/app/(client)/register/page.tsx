'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="my-32 flex flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
        <Image
          src={'/otb-logo-cropped.jpg'}
          alt={'Outside the box logo'}
          width={400}
          height={140}
        />

        <div className="w-full">
          <form
            method="post"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="username"
              id="username"
              required
              placeholder="Username e.g. joe123"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              placeholder="First name"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              placeholder="Last name"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <select
              name="occupation"
              id="occupation"
              className="rounded-full border border-gray-300 px-5 py-4"
            >
              <option hidden>Occupation</option>
              <option value="student" className="p-6">
                Student
              </option>
              <option value="working-student">Working Student</option>
              <option value="professional">Professional</option>
            </select>
            <input
              type="text"
              name="affiliation"
              id="affiliation"
              required
              placeholder="Affiliation"
              className="rounded-full border border-gray-300 px-6 py-4"
            />
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              required
              placeholder="Mobile Number"
              className="rounded-full border border-gray-300 px-6 py-4"
            />

            <div className="mt-4 flex w-full flex-col gap-4">
              <button className="rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
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
        </div>
      </div>
    </div>
  );
}

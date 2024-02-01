'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex min-h-[85dvh] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-otb-yellow px-16 py-12 shadow-2xl">
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

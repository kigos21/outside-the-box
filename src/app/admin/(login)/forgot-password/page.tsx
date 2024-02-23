'use client';

import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginFormBody>();

  const onSubmit: SubmitHandler<LoginFormBody> = async () => {
    // back end keme
    console.log();
  };

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center px-10">
      <div className="flex flex-col items-center gap-8 rounded-3xl bg-white px-16 py-12 shadow-2xl">
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

            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              className="rounded-full border border-gray-300 px-6 py-4"
              {...register('password', { required: true })}
            />

            <div className="mt-4 flex w-full flex-col gap-4">
              <button className="rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
                Gamer
              </button>
            </div>
          </form>
        </div>

        {/* Logo beside the form */}
      </div>
    </main>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { LoginFormBody } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<LoginFormBody>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormBody> = async () => {
    // back end keme
    router.push('/admin/main');
    console.log();
  };

  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center px-10">
      <div className="mx-5 flex flex-col items-center">
        <div className="mx-5">
          <Image
            src={'/otb-logo.jpg'}
            width={350}
            height={350}
            alt={'logo'}
            className={'m-auto'}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 rounded-xl bg-white px-16 py-12 shadow-2xl">
        <div className="w-full border-none">
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                placeholder="Username e.g. joe123"
                className="rounded-md border border-black px-6 py-4"
                {...register('username', { required: true })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                className="rounded-md border border-black px-6 py-4"
                {...register('password', { required: true })}
              />
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <button className=" rounded-md bg-otb-yellow px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
                Login
              </button>
              <span className="text-center">
                <Link
                  href="admin/forgot-password"
                  className="text-sm underline"
                >
                  Forget Password
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

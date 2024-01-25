import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="m-3 grid content-evenly justify-items-center gap-3 rounded-md bg-otb-yellow p-10 shadow-lg">
        <div>
          <Link href={'/'}>
            <Image
              src="/otb-logo-cropped.jpg"
              width={300}
              height={50}
              alt="Outside the Box Logo"
            />
          </Link>
        </div>
        <div className="mt-3">
          <input
            type="text"
            id="username"
            className="w-72 rounded-lg p-2"
            placeholder="Username"
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            id="password"
            className="w-72 rounded-lg p-2"
            placeholder="Password"
          />
        </div>
        <div>
          <div className="float-right mb-3 mr-4 flex">
            <Link href={'/login/forget'}>Forget Password</Link>
          </div>
          <br></br>
          <div className="my-3 flex justify-around">
            <Link href={'.'} className="rounded bg-otb-blue px-5">
              Submit
            </Link>
            <Link href={'.'} className="rounded bg-otb-blue px-5">
              Cancel
            </Link>
          </div>
          <div className="flex">
            Don&apos;t have an account yet?{' '}
            <Link href={'/login/register'}>
              <h5 className="mx-1 font-bold text-otb-blue">Register</h5>
            </Link>{' '}
            here
          </div>
        </div>
      </div>
    </div>
  );
}

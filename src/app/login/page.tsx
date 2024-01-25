import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="m-3 grid w-96 content-evenly justify-items-center gap-3 rounded-md bg-otb-yellow p-6 shadow-lg">
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
            className="rounded-lg p-2"
            placeholder="Username"
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            id="password"
            className="rounded-lg p-2"
            placeholder="Password"
          />
        </div>
        <div>
          <div className="float-right mb-3 flex ">
            <Link href={'/'}>Forget Password</Link>
          </div>
          <br></br>
          <div className="my-3 flex justify-around">
            <button className="rounded bg-blue-300 px-5">Submit</button>
            <button className="rounded bg-blue-300 px-5">Cancel</button>
          </div>
          <div className="flex">
            Don&apos;t have an account yet?{' '}
            <h5 className="mx-1 font-bold text-blue-300">Register</h5> here
          </div>
        </div>
      </div>
    </div>
  );
}

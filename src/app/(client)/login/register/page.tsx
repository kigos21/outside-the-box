import Link from 'next/link';
import Image from 'next/image';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react';

export default function Success() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-evenly m-3 flex justify-around gap-3 rounded-md bg-otb-yellow p-16 shadow-lg">
        <div>
          <div>
            <Link href={'/'}>
              <Image
                src="/otb-logo-cropped.jpg"
                width={350}
                height={50}
                alt="Outside the Box Logo"
              />
            </Link>
          </div>

          <div>
            <div className="mt-3">
              <label className="block text-base">Username</label>
              <input
                type="text"
                id="username"
                className="w-60 rounded-lg p-2"
                placeholder="Username"
              />
            </div>
            <div className="mt-3">
              <label className="block text-base">Password</label>
              <input
                type="password"
                id="password"
                className="w-60 rounded-lg p-2"
                placeholder="Password"
              />
            </div>
            <div className="mt-3">
              <label className="block text-base">Confirm Password</label>
              <input
                type="password"
                id="confirmPass"
                className="w-60 rounded-lg p-2"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-2">
            <label className="block text-base">First Name</label>
            <input
              type="password"
              id="firstName"
              className="w-60 rounded-lg p-2"
              placeholder="First Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base">Last Name</label>
            <input
              type="password"
              id="lastName"
              className="w-60 rounded-lg p-2"
              placeholder="Last Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base">Occupation</label>
            <select
              name="occupation"
              id="occupation"
              className="w-60 rounded-lg p-2"
            >
              <option value="student">Student</option>
            </select>
          </div>
          <div className="mt-2">
            <label className="block text-base">Affiliation</label>
            <input
              type="password"
              id="affiliation"
              className="w-60 rounded-lg p-2"
              placeholder="Affiliation"
            />
          </div>
          <div className="mt-2">
            <label className="block text-base">Mobile Number</label>
            <input
              type="number"
              id="mPhone"
              className="w-60 rounded-lg p-2"
              placeholder="Mobile Number"
            />
          </div>
          <div className="mt-5 flex justify-around">
            <Link href={'/login'} className="rounded bg-otb-blue px-5">
              Submit
            </Link>
            <Link href={'/login'} className="rounded bg-otb-blue px-5">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

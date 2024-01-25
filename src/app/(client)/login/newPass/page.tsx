import Link from 'next/link';
import Image from 'next/image';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react';

export default function Password() {
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
        <Pass
          title="Enter Password"
          newPass="Password"
          confirmPass="Confirm Password"
        />
      </div>
    </div>
  );
}

function Pass(props: {
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  newPass: string | undefined;
  confirmPass: string | undefined;
}) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className="mt-3">
        <input
          type="password"
          id="newPassword"
          className="rounded-lg p-2"
          placeholder={props.newPass}
        />
        <div className="mt-3">
          <input
            type="password"
            id="confirmPassword"
            className="rounded-lg p-2"
            placeholder={props.confirmPass}
          />
          <br></br>
          <div className="mt-5 flex justify-around">
            <Link href={'/login/passSucc'} className="rounded bg-otb-blue px-5">
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

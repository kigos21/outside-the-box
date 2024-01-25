import Link from 'next/link';
import Image from 'next/image';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react';

export default function Forget() {
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
        <Forgot title="Forget Password" pholder="Username" />
      </div>
    </div>
  );
}

function Forgot(props: {
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
  pholder: string | undefined;
}) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className="mt-3">
        <input
          type="text"
          id="username"
          className="rounded-lg p-2"
          placeholder={props.pholder}
        />
        <br></br>
        <div className="mt-5 flex justify-around">
          <button className="rounded bg-blue-300 px-5">Submit</button>
          <button className="rounded bg-blue-300 px-5">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function OTP(props: {
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
  pholder: string | undefined;
}) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className="mt-3">
        <input
          type="text"
          id="username"
          className="rounded-lg p-2"
          placeholder={props.pholder}
        />
        <br></br>
        <div className="mt-5 flex justify-around">
          <button className="rounded bg-blue-300 px-5">Submit</button>
          <button className="rounded bg-blue-300 px-5">Cancel</button>
        </div>
      </div>
    </div>
  );
}

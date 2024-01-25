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
        <Template title="Password Reset Success!" />
      </div>
    </div>
  );
}

function Template(props: {
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
}) {
  return (
    <div>
      <h3>{props.title}</h3>
      <br></br>
      <div className="mt-5 flex justify-around">
        <Link href={'/login'} className="rounded bg-otb-blue px-5">
          Go Back
        </Link>
      </div>
    </div>
  );
}

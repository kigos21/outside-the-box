import Image from "next/image";

export default function Page() {
  return (
    <main className="flex px-10 w-full">
      <div className="w-1/2 mx-5">
        <Image
          src={'/otb-logo.jpg'}
          width={350}
          height={350}
          alt={'logo'}
          className={'m-auto'}
        />
      </div>
      <div className="w-1/2 mx-5">
        hello world
      </div>
    </main>
  );
}
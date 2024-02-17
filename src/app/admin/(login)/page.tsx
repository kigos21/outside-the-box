import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex w-full px-10">
      <div className="mx-5 w-1/2">
        <Image
          src={'/otb-logo.jpg'}
          width={350}
          height={350}
          alt={'logo'}
          className={'m-auto'}
        />
      </div>
      <div className="mx-5 w-1/2">hello world</div>
    </main>
  );
}

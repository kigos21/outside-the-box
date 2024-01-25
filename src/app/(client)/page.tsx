import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="">
        <div className="mt-64 bg-otb-yellow text-center">
          <h2 className="py-5 text-7xl font-bold">ABOUT US</h2>
          <p className="py-5 text-2xl">
            Our co-working and study lounge is designed to <br></br>
            provide a comfortable, inspiring, and collaborative<br></br>
            space for students, freelancers, and professionals<br></br>
            to work, learn, and connect.
          </p>
          <div className="py-5">
            <div className=" mx-auto h-3 w-64 place-content-center bg-black "></div>
          </div>
        </div>
      </div>

      <div className=" flex h-screen flex-row items-center justify-center ">
        <div className="ml-8 basis-1/2 space-y-16 p-10 text-center">
          <h2 className="py-5 text-7xl font-bold">WHERE TO FIND US</h2>
          <p className=" text-3xl">
            Lorem ipsum dolor sit amet, consectetur <br></br>
            adipiscing elit. Duis laoreet fringilla metus<br></br>
            eget cursus. Nulla sollicitudin bibendum <br></br>
            erat, non tempus dui luctus ut. In convallis <br></br>
            consectetur eros, ut cursus massa cursus<br></br>
            in. In hac habitasse platea dictumst.{' '}
          </p>
        </div>
        <div className="basis-1/2">
          <div className="py-5 text-7xl font-bold">
            <Image
              src={'/map.png'}
              width={500}
              height={500}
              alt={'map'}
              className={'mx-auto'}
            />
          </div>
        </div>
      </div>
      <div
        className="flex 
      h-screen 
      items-center justify-center bg-[url('/paper-crinkle.png')] bg-no-repeat"
      >
        <div className="">
          <h2 className="py-5 text-center text-8xl font-bold">CONTACT US</h2>
          <div className="place-content-center">
            <table className=" text-3xl">
              <tbody>
                <tr>
                  <td className="p-10">Phone:</td>
                  <td className="p-10 pl-32">0956 025 4032</td>
                </tr>
                <tr>
                  <td className="p-10">Email:</td>
                  <td className="p-10 pl-32">otbcoworkingph@gmail.com</td>
                </tr>
                <tr>
                  <td className="p-10">Address:</td>
                  <td className="p-10 pl-32">
                    2/F 1210 Asturias St., Manila, Philippines
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className=" text-center">
          <h2 className="py-5 text-8xl font-bold">OPERATIONAL HOURS</h2>

          <div className="ml-72 mr-72 grid grid-cols-2 gap-5">
            <div className="ml-96 rounded-md bg-otb-yellow p-2 text-2xl font-bold drop-shadow-md">
              WEEKDAYS
            </div>
            <div className="mr-96 rounded-md bg-otb-yellow p-2 text-2xl font-bold drop-shadow-md">
              10:00 AM - 5:00 AM
            </div>
            <div className="ml-96 rounded-md bg-otb-yellow p-2 text-2xl font-bold drop-shadow-md">
              WEEKENDS
            </div>
            <div className="mr-96 rounded-md bg-otb-yellow p-2 text-2xl font-bold drop-shadow-md">
              12:00 PM - 1:00 AM
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

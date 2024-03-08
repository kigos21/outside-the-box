import styles from '@/styles/client-home.module.css';
import Carousel from '@/components/Carousel';

export default function Home() {
  return (
    <div className="relative">
      <div className={styles.sticky_bg} />
      <div className="flex flex-col gap-48">
        {/* <div className="flex flex-col gap-48 pt-48">  */}

        <Carousel />

        <div className="relative">
          <div className="mx-auto flex max-w-screen-lg flex-wrap items-center gap-x-16 gap-y-4 px-[7%] py-16 md:flex-nowrap md:px-16">
            <div className="flex aspect-square basis-full items-center justify-center rounded-2xl border border-gray-400 text-gray-400 md:basis-1/3">
              IMAGE
            </div>
            <div className="flex basis-full flex-col gap-4 md:basis-2/3">
              <h1>About us</h1>
              <p className="text-balance">
                Our co-working and study lounge is designed to provide a
                comfortable, inspiring, and collaborative space for students,
                freelancers, and young professionals to work, learn, and
                connect.
              </p>
              <div className="mt-4 h-1 w-2/3 bg-[#272727]/75" />
            </div>
            <div className="absolute left-0 right-0 -z-10 h-full bg-zinc-200" />
          </div>
        </div>

        <div className="mx-auto flex max-w-screen-lg flex-wrap items-center gap-x-16 gap-y-8 rounded-3xl bg-otb-yellow px-[7%] py-16 md:flex-nowrap md:px-16">
          <div className="basis-full md:basis-1/2">
            <h1 className="mb-4 text-balance leading-none">Where to find us</h1>
            <p className="text-balance">
              Looking for a great study spot? Let this map guide you to our
              door.
            </p>
          </div>

          <div className="flex aspect-square basis-full overflow-hidden rounded-2xl md:basis-1/2">
            <img
              src={'/find-us.jpg'}
              alt={'Location of Outside the Box on the map'}
            />
          </div>
        </div>

        <div className="relative bg-zinc-200 py-28">
          <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 px-[7%] md:px-16">
            <h1>Contact us</h1>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Phone:</span> 0956 025 4032
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                otbcoworkingph@gmail.com
              </p>
              <p>
                <span className="font-semibold">Address:</span> 2/F 1210
                Asturias St., Manila, Philippines
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div className="">
    //     <div className="mt-32 bg-otb-yellow text-center sm:mt-64 lg:mt-64">
    //       <h2 className="py-5 text-4xl font-bold sm:text-7xl lg:text-7xl">
    //         ABOUT US
    //       </h2>
    //       <p className="py-5 text-xl sm:text-2xl lg:text-2xl">
    //         Our co-working and study lounge is designed to <br />
    //         provide a comfortable, inspiring, and collaborative
    //         <br />
    //         space for students, freelancers, and professionals
    //         <br />
    //         to work, learn, and connect.
    //       </p>
    //       <div className="py-5">
    //         <div className="mx-auto h-1 w-64 place-content-center bg-black sm:w-96 lg:w-96 "></div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex h-screen flex-col items-center justify-center sm:flex-row">
    //     <div className="mt-10 space-y-8 p-5 text-center sm:ml-8 sm:mt-0 sm:basis-1/2 sm:p-10">
    //       <h2 className="py-5 text-4xl font-bold sm:text-7xl lg:text-7xl">
    //         WHERE TO FIND US
    //       </h2>
    //       <p className="text-xl sm:text-2xl lg:text-2xl">
    //         Lorem ipsum dolor sit amet, consectetur <br />
    //         adipiscing elit. Duis laoreet fringilla metus
    //         <br />
    //         eget cursus. Nulla sollicitudin bibendum <br />
    //         erat, non tempus dui luctus ut. In convallis <br />
    //         consectetur eros, ut cursus massa cursus
    //         <br />
    //         in. In hac habitasse platea dictumst.{' '}
    //       </p>
    //     </div>
    //     <div className="mt-10 sm:basis-1/2">
    //       <div className="py-5 text-7xl font-bold">
    //         <Image
    //           src={'/map.png'}
    //           width={500}
    //           height={480}
    //           alt={'map'}
    //           className={'mx-auto'}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex h-screen items-center justify-center bg-[url('/paper-crinkle.png')] bg-no-repeat">
    //     <div className="">
    //       <h2 className="py-5 text-center text-4xl font-bold sm:text-7xl lg:text-7xl">
    //         CONTACT US
    //       </h2>
    //       <div className="place-content-center">
    //         <table className="text-xl sm:text-2xl lg:text-2xl">
    //           <tbody>
    //             <tr>
    //               <td className="p-5 sm:p-10 lg:p-10">Phone:</td>
    //               <td className="p-5 pl-0 sm:p-10 sm:pl-32 lg:p-10 lg:pl-32">
    //                 0956 025 4032
    //               </td>
    //             </tr>
    //             <tr>
    //               <td className="p-5 sm:p-10 lg:p-10">Email:</td>
    //               <td className="p-5 pl-0 sm:p-10 sm:pl-32 lg:p-10 lg:pl-32">
    //                 otbcoworkingph@gmail.com
    //               </td>
    //             </tr>
    //             <tr>
    //               <td className="p-5 sm:p-10 lg:p-10">Address:</td>
    //               <td className="p-5 pl-0 sm:p-10 sm:pl-32 lg:p-10 lg:pl-32">
    //                 2/F 1210 Asturias St., Manila, Philippines
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex h-screen items-center justify-center">
    //     <div className="text-center">
    //       <h2 className="py-5 text-4xl font-bold sm:text-7xl lg:text-7xl">
    //         OPERATIONAL HOURS
    //       </h2>

    //       <div className="ml-10 mr-10 grid grid-cols-2 gap-5 sm:ml-0 sm:mr-0 sm:grid-cols-2 sm:gap-10 lg:ml-72 lg:mr-72 lg:grid-cols-2">
    //         <div className="w-full rounded-3xl bg-otb-yellow p-5 text-xl font-bold shadow-md shadow-otb-blue sm:p-10 sm:text-2xl lg:p-10 lg:text-2xl">
    //           WEEKDAYS
    //         </div>
    //         <div className="w-full rounded-3xl bg-otb-yellow p-5 text-xl font-bold shadow-md shadow-otb-blue sm:p-10 sm:text-2xl lg:p-10 lg:text-2xl">
    //           10:00 AM - 5:00 AM
    //         </div>
    //         <div className="w-full rounded-3xl bg-otb-yellow p-5 text-xl font-bold shadow-md shadow-otb-blue sm:p-10 sm:text-2xl lg:p-10 lg:text-2xl">
    //           WEEKENDS
    //         </div>
    //         <div className="w-full rounded-3xl bg-otb-yellow p-5 text-xl font-bold shadow-md shadow-otb-blue sm:p-10 sm:text-2xl lg:p-10 lg:text-2xl">
    //           12:00 PM - 1:00 AM
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

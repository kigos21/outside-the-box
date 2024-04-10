import styles from '@/styles/client-home.module.css';
import Carousel from '@/components/Carousel';

export default function Home() {
  return (
    <div className="relative">
      <div className={styles.sticky_bg} />
      <div className="flex flex-col gap-24">
        {/* <div className="flex flex-col gap-48 pt-48">  */}

        <Carousel />

        <div className="relative">
          <div className="mx-auto flex max-w-screen-lg flex-wrap items-center gap-x-16 gap-y-4 px-[7%] py-20 font-sans md:flex-nowrap md:px-12">
            <div className="flex basis-full flex-col gap-8 ">
              <div className="align-items-center  inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#e79953"
                  className=" h-15 w-14 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>

                <h1 className="text-balance font-bold text-cs-orange">
                  ABOUT US
                </h1>
              </div>
              <div className="flex justify-center">
                <p className="w-full text-balance md:text-center ">
                  Our co-working and study lounge is designed to provide a
                  comfortable, inspiring, and collaborative space for students,
                  freelancers, and young professionals to work, learn, and
                  connect.
                </p>
              </div>
            </div>

            <div className="absolute left-0 right-0 -z-10 h-full bg-cs-cream" />
          </div>
        </div>

        <div className=" mx-auto flex max-w-screen-lg flex-wrap items-center gap-x-16 gap-y-8 rounded-3xl bg-cs-cream px-[7%] py-16 font-sans md:flex-nowrap md:px-16">
          <div className="basis-full  md:basis-1/2">
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#e79953"
                className=" h-10 w-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <h1 className="mb-4 text-balance font-bold leading-none text-cs-orange">
                LOCATION
              </h1>
            </div>
            <p className="ml-10 text-balance">
              2/F 1210 Asturias St., Sampaloc, Manila, Philippines
            </p>
          </div>

          <div className="flex aspect-square basis-full overflow-hidden rounded-2xl md:basis-1/2">
            <img
              src={'/map.png'}
              alt={'Location of Outside the Box on the map'}
            />
          </div>
        </div>

        <div className="relative bg-cs-cream py-28 xl:columns-2 ">
          <div className="mx-auto mb-10 flex max-w-screen-lg flex-col items-center gap-4 px-[7%] font-sans md:px-12 md:py-0">
            <h1 className="gap-2 text-4xl font-bold text-cs-orange">CONTACT</h1>
            <div className="flex flex-col items-center">
              <p>
                <span className="text-4xl font-bold"> 0956 025 4032</span>
              </p>
              <p>
                <span className="">coursescapeph@gmail.com</span>{' '}
              </p>
              <p>
                <span className="">
                  2/F 1210 Asturias St., Manila, Philippines
                </span>
              </p>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-lg flex-col  items-center gap-4 px-[7%] font-sans md:px-12">
            <h1 className="text-4xl font-bold text-cs-orange ">
              OPERATIONAL HOURS
            </h1>
            <div className="flex grid-cols-2 gap-10 text-center">
              <div>
                <p>
                  <span className="text-4xl font-bold">MON - FRI</span>
                </p>

                <p>
                  <span className="">10:00 AM - 5:00 AM</span>
                </p>
              </div>
              <div>
                <p>
                  <span className="text-4xl font-bold">SAT - SUN</span>
                </p>
                <p>
                  <span className="">12:00 PM - 1:00 AM</span>
                </p>
              </div>
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

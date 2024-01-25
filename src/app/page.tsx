

import Image from 'next/image';
export default function Home() {
  return (
    
    <main>

      

      <div className="">
        <div className="mt-64 bg-otb-yellow text-center">
        <h1 className="py-5 text-7xl font-bold">ABOUT US</h1>
        <p className="py-5 text-2xl">Our co-working and study lounge is designed to <br></br>
            provide a comfortable, inspiring, and collaborative<br></br>
            space for students, freelancers, and professionals<br></br>
            to work, learn, and connect.</p>
            <div className="py-5">
            <div className=" mx-auto w-64 h-3 bg-black place-content-center ">
            </div>
            </div>
      </div>
      </div>

      <div className=" h-screen flex flex-row items-center justify-center ">
        <div className="space-y-16 ml-8 p-10 basis-1/2 text-center">
      <h1 className="py-5 text-7xl font-bold">WHERE TO FIND US</h1>
      <p className=" text-3xl">Lorem ipsum dolor sit amet, consectetur <br></br>
      adipiscing elit. Duis laoreet fringilla metus<br></br>
       eget cursus. Nulla sollicitudin bibendum <br></br>
       erat, non tempus dui luctus ut. In convallis <br></br>
        consectetur eros, ut cursus massa cursus<br></br> 
        in. In hac habitasse platea dictumst. </p>
        </div>
        <div className="basis-1/2">
      <div className="py-5 text-7xl font-bold">
      <Image
          src={"/map.png"}
          width={500}
          height={500}
          alt={"map"}
          className={"mx-auto"}
        />
      </div>
     
        </div>
      </div>
      <div className="h-screen 
      bg-[url('/paper-crinkle.png')] 
      bg-no-repeat flex items-center justify-center">
        
        <div className="">
          <h1 className="py-5 text-8xl font-bold text-center">CONTACT US</h1>
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
      <td className="p-10 pl-32">2/F 1210 Asturias St., Manila, Philippines</td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
<div className="h-screen flex items-center justify-center">
        <div className=" text-center">
        <h1 className="py-5 text-8xl font-bold">OPERATIONAL HOURS</h1>
            
        <div className="grid gap-5 grid-cols-2 ml-72 mr-72">
        <div className="p-2 ml-96 text-2xl rounded-md bg-otb-yellow drop-shadow-md font-bold">WEEKDAYS</div>
        <div className="p-2 mr-96 text-2xl rounded-md bg-otb-yellow drop-shadow-md font-bold" >10:00 AM - 5:00 AM</div>
        <div className="p-2 ml-96 text-2xl rounded-md bg-otb-yellow drop-shadow-md font-bold">WEEKENDS</div>
        <div className="p-2 mr-96 text-2xl rounded-md bg-otb-yellow drop-shadow-md font-bold">12:00 PM - 1:00 AM</div>
        </div>
      </div>
      </div>
    </main>
  );
}

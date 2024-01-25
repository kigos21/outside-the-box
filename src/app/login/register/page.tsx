import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


export default function Success(){
    return(
        <div className= "flex justify-center items-center h-screen">
        <div className="rounded-md p-16 shadow-lg m-3 bg-otb-yellow flex justify-around gap-3 space-evenly">
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
                        <input type="text" id="username" className="rounded-lg p-2 w-60" placeholder="Username"/>
                    </div>
                    <div className="mt-3">
                        <label className="block text-base">Password</label>
                        <input type="password" id="password" className="rounded-lg p-2 w-60" placeholder="Password"/>
                    </div>
                    <div className="mt-3">
                        <label className="block text-base">Confirm Password</label>
                        <input type="password" id="confirmPass" className="rounded-lg p-2 w-60" placeholder="Confirm Password"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-2">
                        <label className="block text-base">First Name</label>
                        <input type="password" id="firstName" className="rounded-lg p-2 w-60" placeholder="First Name"/>
                </div>
                <div className="mt-2">
                        <label className="block text-base">Last Name</label>
                        <input type="password" id="lastName" className="rounded-lg p-2 w-60" placeholder="Last Name"/>
                </div>
                <div className="mt-2">
                        <label className="block text-base">Occupation</label>
                        <select name="occupation" id="occupation" className="rounded-lg p-2 w-60">
                            <option value="student">Student</option>
                        </select>
                </div>
                <div className="mt-2">
                        <label className="block text-base">Affiliation</label>
                        <input type="password" id="affiliation" className="rounded-lg p-2 w-60" placeholder="Affiliation"/>
                </div>
                <div className="mt-2">
                        <label className="block text-base">Mobile Number</label>
                        <input type="number" id="mPhone" className="rounded-lg p-2 w-60" placeholder="Mobile Number"/>
                </div>  
                <div className="flex justify-around mt-5">            
                <Link href={'/login'} className="rounded px-5 bg-otb-blue">Submit</Link>     
                <Link href={'/login'} className="rounded px-5 bg-otb-blue">Cancel</Link>
                </div>
            </div>

        </div>
        
        </div>
    );
}

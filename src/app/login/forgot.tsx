import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

export default function Forget(){
    return(
        <div className= "flex justify-center items-center h-screen">
        <div className="rounded-md w-96 p-6 shadow-lg m-3 bg-otb-yellow grid justify-items-center gap-3 content-evenly">
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
                <Forgot
                    title="Forget Password"
                    pholder="Username"/>
        </div>
        </div>
    );
}

function Forgot(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; pholder: string | undefined; }){
    return(
        <div>
            <h2>{props.title}</h2>
            <div className="mt-3">
            <input type="text" id="username" className="rounded-lg p-2" placeholder={props.pholder}/>
            <br></br>
                <div className="flex justify-around mt-5">            
                    <button className="rounded px-5 bg-blue-300">Submit</button>
                    <button className="rounded px-5 bg-blue-300">Cancel</button>
                </div>
            </div>
        </div>
    );
}

function OTP(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; pholder: string | undefined; }){
    return(
        <div>
        <h2>{props.title}</h2>
        <div className="mt-3">
        <input type="text" id="username" className="rounded-lg p-2" placeholder={props.pholder}/>
        <br></br>
            <div className="flex justify-around mt-5">            
                <button className="rounded px-5 bg-blue-300">Submit</button>
                <button className="rounded px-5 bg-blue-300">Cancel</button>
            </div>
        </div>
    </div>
    );
}
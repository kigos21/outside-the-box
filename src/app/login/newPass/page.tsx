import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


export default function Password(){
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
                <Pass
                    title="Enter Password" 
                    newPass="Password"
                    confirmPass="Confirm Password"/>
        </div>
        </div>
    );
}

function Pass(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; newPass: string | undefined; confirmPass: string | undefined; }){
    return(
        <div>
            <h2>{props.title}</h2>
            <div className="mt-3">
            <input type="password" id="newPassword" className="rounded-lg p-2" placeholder={props.newPass}/>
            <div className="mt-3">
            <input type="password" id="confirmPassword" className="rounded-lg p-2" placeholder={props.confirmPass}/>
            <br></br>
                <div className="flex justify-around mt-5">            
                    <Link href={'/login/passSucc'} className="rounded px-5 bg-otb-blue">Submit</Link>
                    <Link href={'/login'} className="rounded px-5 bg-otb-blue">Cancel</Link>
                </div>
            </div>
            </div>
        </div>
    );
}

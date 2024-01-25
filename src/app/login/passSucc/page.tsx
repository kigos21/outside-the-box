import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


export default function Success(){
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
                <Template
                    title="Password Reset Success!"/>
        </div>
        </div>
    );
}

function Template(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;}){
    return(
        <div>
        <h3>{props.title}</h3>
        <br></br>
            <div className="flex justify-around mt-5">            
            <Link href={'/login'} className="rounded px-5 bg-otb-blue">Go Back</Link>
            </div>
        </div>
    );
}
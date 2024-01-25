import Image from 'next/image';
import Link from 'next/link';


export default function Login(){
    return(
        <div className= "flex justify-center items-center h-screen">
        <div className="rounded-md p-10 shadow-lg m-3 bg-otb-yellow grid justify-items-center gap-3 content-evenly">
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
            <div className="mt-3">
                <input type="text" id="username" className="rounded-lg p-2 w-72" placeholder="Username"/>
            </div>
            <div className="mt-3">
                <input type="password" id="password" className="rounded-lg p-2 w-72" placeholder="Password"/>
            </div>
            <div>
            <div className="flex float-right mb-3 mr-4"><Link href={"/login/forget"}>Forget Password</Link></div>
            <br></br>
            <div className="flex justify-around my-3">            
                <Link href={'.'} className="rounded px-5 bg-otb-blue">Submit</Link>
                <Link href={'.'} className="rounded px-5 bg-otb-blue">Cancel</Link>
            </div>
                <div className="flex">Don&apos;t have an account yet? <Link href={'/login/register'}><h5 className="text-otb-blue font-bold mx-1">Register</h5></Link> here</div>
            </div>
        </div>

        </div>
    );
}
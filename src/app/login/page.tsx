import Image from 'next/image';
import Link from 'next/link';


export default function Login(){
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
            <div className="mt-3">
                <input type="text" id="username" className="rounded-lg p-2" placeholder="Username"/>
            </div>
            <div className="mt-3">
                <input type="password" id="password" className="rounded-lg p-2" placeholder="Password"/>
            </div>
            <div>
            <div className="flex float-right mb-3 "><Link href={'/'}>Forget Password</Link></div>
            <br></br>
            <div className="flex justify-around my-3">            
                <button className="rounded px-5 bg-blue-300">Submit</button>
                <button className="rounded px-5 bg-blue-300">Cancel</button>
            </div>
                <div className="flex">Don&apos;t have an account yet? <h5 className="text-blue-300 font-bold mx-1">Register</h5> here</div>
            </div>
        </div>

        </div>
    );
}
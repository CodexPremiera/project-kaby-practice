'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function LoginClientForm(){
    // console.log()
    const router = useRouter();
    const [form, setForm] = useState({
        username : '',
        password : ''
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch('/api/auth/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(form),
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            router.push(`${data.redirectTo}`);
            // console.log(`${data.redirectTo}`);
        }else{
            alert(`Error ${data.error}`);
        }
    }

    return (
        <div>
<form className="w-full mt-6" onSubmit={handleSubmit}>
                            <div className="relative mt-4">
                                <input
                                    className="floating-input mt-1 w-full text-black"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder=" "
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="region" className="floating-label">
                                    Username
                                </label>
                            </div>

                            <div className="relative mt-4">
                                <input
                                    className="floating-input mt-1 w-full text-black"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder=" "
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password" className="floating-label">
                                    Password
                                </label>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                {/* <Link href="" className="text-[12px] text-secondary mt-1">
                                    Forgot Password
                                </Link> */}
                            </div>
                            <div className="mt-6 flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
        </div>
        
    )
}
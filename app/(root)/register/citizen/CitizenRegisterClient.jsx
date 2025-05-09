'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function AppointmentClientForm(){
    const router = useRouter();
    const [form,setForm] = useState({
        first_name : '',
        last_name :'',
        email : '',
        barangay :'',
        password: '',
        confirm_password:''
    });
    const handleChange = (e) =>{
        // console.log(e.target.value);
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("submitted");
        const res = await fetch('/api/auth/register/citizen',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(form),
        })
        const data = await res.json();
        // console.log(data);
        if(res.ok){
            alert('Request submitted');
            router.push('/');
        }else{
            alert(`Error ${data.error}`);
        }
      };

    return (
        <div>
            <form className="w-full mt-6" onSubmit={handleSubmit}>
						<div className="flex gap-3 justify-between">
							<div className="relative w-full">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="first-name"
									name="first_name"
									placeholder=" "
                                    onChange={handleChange}
									required
								/>
								<label htmlFor="first-name" className="floating-label">
									First Name
								</label>
							</div>
							<div className="relative w-full">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="last-name"
									name="last_name"
									placeholder=" "
                                    onChange={handleChange}
									required
								/>
								<label htmlFor="last-name" className="floating-label">
									Last Name
								</label>
							</div>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="email"
								id="email"
								name="email"
								placeholder=" "
                                onChange={handleChange}
								required
							/>
							<label htmlFor="email" className="floating-label">
								Email
							</label>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="text"
								id="barangay"
								name="barangay"
								placeholder=" "
                                onChange={handleChange}
								required
							/>
							<label htmlFor="barangay" className="floating-label">
								Barangay
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
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="password"
								id="password"
								name="confirm_password"
								placeholder=" "
                                onChange={handleChange}
								required
							/>
							<label htmlFor="password" className="floating-label">
								Confirm Password
							</label>
						</div>
						<div className="mt-6 flex justify-center items-center">
							<button
								type="submit"
								className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
							>
								Sign Up
							</button>
						</div>
					</form>
        </div>
    );
}
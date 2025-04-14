// NOTE: https://www.youtube.com/watch?v=TWRA7C0SF40&t=281s  ==== cannot submit etc onclick etc and making the page tsx client side loses benefit of server
//  side rendering so have that thing into a separate client component then place it so only that part is rendered in the client while rest is server rendered
'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function AppointmentClientForm(){
    const router = useRouter();
    const [form,setForm] = useState({
        barangay_name: '',
        city: '',
        region: '',
        email: '',
        message: '',
      });
      const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/register/barangay',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(form),
        })
        const data = await res.json();
        if(res.ok){
            alert('Request submitted');
            router.push('/');
        }else{
            alert(`Error ${data.error}`);
        }
      };

      return (
                    <form onSubmit={handleSubmit} className="w-full mt-6">
						<div className="flex gap-3 justify-between">
							<div className="relative w-full">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="barangay_name"
									name="barangay_name"
									placeholder=" "
									required
                                    onChange={handleChange}
								/>
								<label htmlFor="barangay" className="floating-label">
									Barangay Name
								</label>
							</div>
							<div className="relative w-full">
								<input
									className="floating-input mt-1 w-full text-black"
									type="text"
									id="city"
									name="city"
									placeholder=" "
									required
                                    onChange={handleChange}
								/>
								<label htmlFor="city" className="floating-label">
									City
								</label>
							</div>
						</div>
						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="text"
								id="region"
								name="region"
								placeholder=" "
								required
                                onChange={handleChange}
                                />
							<label htmlFor="region" className="floating-label">
								Region
							</label>
						</div>

						<div className="relative mt-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="email"
								id="email"
								name="email"
								placeholder=" "
								required
                                onChange={handleChange}
                            />
							<label htmlFor="email" className="floating-label">
								Email
							</label>
						</div>
						<div className="relative mt-4">
							<textarea
								className="floating-input mt-1 w-full text-black h-[100px] resize-none"
								id="message"
								name="message"
								placeholder=" "
								required
                                onChange={handleChange}
                            />
							<label htmlFor="message" className="floating-label">
								Message
							</label>
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
      );
}
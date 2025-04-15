'use client'
import { useState } from "react";

export default function PetitionForm(){
    const [form,setForm] = useState({
        first_name : '',
        last_name :'',
        email : '',
        barangay :'',
        file_upload:null
    })
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
		console.log(name, value,type,files);
        if (type === 'file') {
            setForm({
                ...form,
                [name]: files[0] // Store the first file selected
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch('/api/petition',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(form),
        })
        const data = await res.json();
        console.log(form);
        console.log(data);
        if(res.ok){
            alert("yay");
        }else{
            alert("nay");
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
                                    onChange={handleChange}
								placeholder=" "
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
								placeholder=""
                                onChange={handleChange}
								required
							/>
							<label htmlFor="email" className="floating-label">
								Barangay
							</label>
						</div>
						<div className="relative mt-8">
							<input
								className="floating-input mt-1 w-full text-black"
								type="file"
								id="file-upload"
								name="file_upload"
                                onChange={handleChange}
								required
							/>
							<label htmlFor="file-upload" className="floating-label">
								Proof of Residence
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
        </div>
    )
}
'use client'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PetitionForm(){

    const [form,setForm] = useState({
        first_name : '',
        last_name :'',
        email : '',
        barangay :'',
        file_upload: ''
    })
    const handleChange = (e) => {
		console.log(e.target.value);
		if(e.target.type === 'file'){
			setForm({...form, [e.target.name]: e.target.files[0]});
		}else{

			setForm({...form,[e.target.name]:e.target.value});
		}

    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
		try{

			// const {data, error} = await supabase.storage.from()
			const {data, error} = await supabase.storage.from('petition-proof-residence').upload(`uploads/${form.file_upload.name}`,form.file_upload);
			if(error){
				console.error(error);
			}
		
			const sendForm = {
				first_name: form.first_name,
				last_name: form.last_name,
				email: form.email,
				barangay: form.barangay,
				file_upload:  `uploads/${form.file_upload.name}`
			}
			const res = await fetch('/api/petition',{
				// method: 'GET',
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify(sendForm),
			})
			const a = await res.json();
			console.log(form);
			console.log(a);
			if(res.ok){
				alert("yay");
			}else{
				alert("nay");
			}
		}catch(err){
			alert(err);
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
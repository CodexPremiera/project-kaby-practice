"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import DatePicker from "@/components/services/DatePicker";
import PaymentArrangement from "@/components/services/PaymentArrangement";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface Props {
	onClose: () => void;
}

const CreateAccount: React.FC<Props> = ({ onClose }) => {
	// TODO: Foreign key the authenticated to barangay
    const router = useRouter();

	const [formData, setFormData] = useState({
		barangay: "",
		city: "",
		region: "",
		barangayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	  });
	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	  
	  const handleSubmit =async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch('/api/admin/appointment',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(formData),
        })
        const data = await res.json();
        // console.log(data);
        if(res.ok){
            router.push(`/barangay_desk`);
            // console.log(`${data.redirectTo}`);
        }else{
            alert(`Error ${data.error}`);
        }
		console.log("Form submitted:", formData);
	  };
	return (
		<div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
			<div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex flex-col gap-6">
					<div className="flex justify-between items-center py-3 pt-5 bg-gray-100">
						<div className="text-medium font-semibold text-black px-6">
							Create Barangay Account
						</div>
						<div className="absolute top-4 right-4 cursor-pointer">
							<RiCloseLine
								className="w-6 h-6 text-black hover:text-white"
								onClick={onClose}
							/>
						</div>
					</div>

					{/* Form content goes here */}
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col md:flex-row gap-6 py-2 px-6">
							<div className="flex flex-col w-full gap-4">
								<div className="flex flex-col flex-1">
									<p className="text-sm">Address:</p>
									<div className="flex gap-6">
										<Input 
										placeholder="Enter Barangay" 
										name="barangay"
										value={formData.barangay}
										onChange={handleChange}
										/>
										<Input 
										placeholder="Enter City"
										name="city"
										value={formData.city}
										onChange={handleChange}
										 />
										<Input 
										placeholder="Enter Region"
										name="region"
										value={formData.region}
										onChange={handleChange}
										 />
									</div>
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Barangay Name:</p>
									<Input 
									placeholder="Enter Barangay Username"
									name="barangayName"
									value={formData.barangayName}
									onChange={handleChange}
									 />
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Email:</p>
									<Input 
									placeholder="Enter Email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									 />
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Password:</p>
									<Input
									 placeholder="Enter Password"
									 name="password"
									 value={formData.password}
									 onChange={handleChange}
									 type="password"
									 />
								</div>
								<div className="flex flex-col">
									<p className="text-sm">Confirm Password:</p>
									<Input 
									placeholder="Confirm Password"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									 type="password"
									 />
								</div>
								<div className="flex flex-col flex-1"></div>
							</div>
						</div>
						{/* Create Button */}
						<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
							<Button className="w-full sm:w-auto">Create</Button>
						</div>
					</form>
					
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;

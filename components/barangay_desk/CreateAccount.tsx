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

interface Props {
	onClose: () => void;
}

const CreateAccount: React.FC<Props> = ({ onClose }) => {
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
					<div className="flex flex-col md:flex-row gap-6 py-2 px-6">
						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-col flex-1">
								<p className="text-sm">Address:</p>
								<div className="flex gap-6">
									<Input placeholder="Enter Barangay" />
									<Input placeholder="Enter City" />
									<Input placeholder="Enter Region" />
								</div>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Username:</p>
								<Input placeholder="Enter Barangay Username" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Email:</p>
								<Input placeholder="Enter Email" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Password:</p>
								<Input placeholder="Enter Password" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Confirm Password:</p>
								<Input placeholder="Confirm Password" />
							</div>
							<div className="flex flex-col flex-1"></div>
						</div>
					</div>
					{/* Create Button */}
					<div className="flex flex-col sm:flex-row justify-end pb-6 px-6">
						<Button className="w-full sm:w-auto">Create</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const EmailModal = () => {
	return (
		<>
			<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
				<Link href="/login" passHref>
					<button className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50 transition-transform duration-300">
						<RiCloseFill className="w-[25px] h-[25px]" />
					</button>
				</Link>
				<div className="relative flex flex-col h-[300px] w-[400px] bg-white rounded-xl shadow-xl p-6">
					<h2 className="text-xl font-semibold text-center  border-b border-gray/20 pb-1">
						Login (Barangay)
					</h2>
					<div className="text-[12px] text-secondary my-5">
						Barangay Login Detected
					</div>
					<form className="flex flex-col flex-grow">
						<div className="relative my-4">
							<input
								className="floating-input mt-1 w-full text-black"
								type="email"
								id="email"
								name="email"
								placeholder=" "
								required
							/>
							<label htmlFor="email" className="floating-label">
								Email
							</label>
						</div>
						<div className="mt-auto flex justify-center pt-6">
							<button
								type="submit"
								className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EmailModal;

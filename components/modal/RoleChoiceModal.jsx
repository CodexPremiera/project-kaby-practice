"use client";
import React from "react";

const RoleChoiceModal = ({ onSelect }) => {
    console.log("this is called");
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-xl shadow-lg text-center">
				<h2 className="text-xl font-semibold mb-4">Choose your role</h2>
				<p className="mb-6">Would you like to act as a Citizen or Barangay today?</p>
				<div className="flex justify-around gap-4">
					<button
						onClick={() => onSelect("citizen")}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Citizen
					</button>
					<button
						onClick={() => onSelect("barangay")}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Barangay
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoleChoiceModal;

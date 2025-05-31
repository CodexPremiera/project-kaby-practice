"use client";

import React, { useState } from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import { formatDate } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

const ServiceSettings: React.FC<Props> = ({ service, setService }) => {
	const [showStatus, setShowStatus] = useState(true);
	const [showDelete, setShowDelete] = useState(false);

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value;
		setService((prev) => (prev ? { ...prev, status: newStatus } : prev));
	};

	const handleSubmit = () => {
		console.log("Updated service:", service);
		// your PUT API call here (updateService(service))
	};

	const handleDelete = () => {};

	if (!service) return <p>No service data available</p>;

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl font-semibold">Danger Zone</h2>

			<div>
				<div className="font-semibold">{service.title}</div>
				<div className="flex flex-row justify-between">
					<div>
						<div className="text-sm text-gray-500">
							Date Created: {formatDate(service.date_created)}
						</div>
						<div className="text-sm text-gray-500">
							Created By: {service.owner_name}
						</div>
					</div>

					<div
						className={`h-9 flex items-center px-4 rounded text-white text-sm font-semibold mx-4 ${
							service.status === "Active" ? "bg-green-400" : "bg-gray-400"
						}`}
					>
						{service.status}
					</div>
				</div>
			</div>

			{/* Service Status Toggle */}
			<div className="rounded-[10px]">
				<div
					className="flex justify-between items-center cursor-pointer border border-gray-200 p-4"
					onClick={() => setShowStatus((prev) => !prev)}
				>
					<div className="font-semibold text-sm">Service Status</div>

					{showStatus ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>

				{showStatus && (
					<div className="flex flex-row  justify-between border-r border-l border-b border-gray-200 text-sm p-4 ">
						<p>
							Set status to <strong>Active</strong> if you are still accepting
							orders. Otherwise, set it to <strong>Closed</strong>.
						</p>
						<div className="w-70">
							<select
								value={service.status}
								onChange={handleStatusChange}
								className="p-2 border rounded bg-white w-full text-sm"
							>
								<option value="Active">Active</option>
								<option value="Closed">Closed</option>
							</select>
						</div>
					</div>
				)}
			</div>

			{/* Delete Service Toggle */}
			<div className="rounded-[10px]">
				<div
					className="flex justify-between items-center cursor-pointer border border-gray-200 p-4 "
					onClick={() => setShowDelete((prev) => !prev)}
				>
					<div className="font-semibold text-sm">Delete Service?</div>
					{showDelete ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>

				{showDelete && (
					<div className="text-sm py-4 flex flex-col gap-4 border-r border-l border-b border-gray-200 p-4 ">
						<p>
							You cannot delete this service while there are active or ongoing
							requests. A service must be officially closed before deletion is
							allowed.
						</p>
						<p className=" font-medium">
							Warning: Deleting a service is permanent and cannot be undone.
							Please proceed only if you're absolutely certain.
						</p>
					</div>
				)}
			</div>

			<div className="flex justify-end w-full">
				<button
					onClick={handleSubmit}
					className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-opacity-90"
				>
					Update Service
				</button>
			</div>
		</div>
	);
};

export default ServiceSettings;

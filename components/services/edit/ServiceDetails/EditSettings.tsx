"use client";

import React, { useState } from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import { formatDate } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScheduleDateEditor from "../../ScheduleDateEditor";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface Props {
	service: Service | null;
	setService: React.Dispatch<React.SetStateAction<Service | null>>;
}

const EditSettings: React.FC<Props> = ({ service, setService }) => {
	const router = useRouter();

	const handleDelete = async () => {
		if (!service) return;

		const updatedService = {
			...service,
			is_permanently_deleted: true,
		};
		delete updatedService.owner_name;

		setService(updatedService); // optimistic update

		try {
			const response = await fetch(`/api/services/${service.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedService),
			});

			if (!response.ok) {
				const error = await response.json();
				toast.error(error.message);
				return;
			}

			const result = await response.json();
			setService(result); // update with confirmed response
			toast.success("Service deleted.");

			router.push("/services");
		} catch (err: any) {
			toast.error(err.message || "Failed to delete service.");
		}
	};


	const [showStatus, setShowStatus] = useState(true);
	const [showDelete, setShowDelete] = useState(false);

	// Handle changing service status
	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value;
		setService((prev) =>
			prev
				? {
						...prev,
						status: newStatus,
					}
				: prev
		);
	};

	if (!service) return <p>No service data available</p>;

	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-xl font-semibold">Danger Zone</h2>

			<div>
				<div className="flex flex-row items-center">
					<div className="font-semibold">{service.title}</div>
					<div
						className={`h-6 flex items-center px-2 rounded text-white text-sm font-medium mx-4 ${
							service.status === "Active" ? "bg-green-400" : "bg-gray-400"
						}`}
					>
						{service.status}
					</div>
				</div>

				<div className="text-sm ">
					<ScheduleDateEditor
						startDate={service.start_date}
						endDate={service.end_date}
						onConfirm={(start, end) => {
							setService((prev) =>
								prev
									? {
											...prev,
											start_date: start,
											end_date: end,
										}
									: prev
							);
						}}
					/>
				</div>

				<div className="flex flex-row justify-between">
					<div>
						<div className="text-sm text-gray-500">
							Date Created: {formatDate(service.date_created)} • Date Closed:{" "}
							{service.date_closed
								? formatDate(service.date_closed)
								: "Not yet"}
						</div>
					</div>
				</div>
			</div>

			{/* Service Status Toggle */}
			<div className="rounded-[10px]">
				<div
					className="flex justify-between items-center cursor-pointer border border-gray-200 p-4"
					onClick={() => setShowStatus((prev) => !prev)}
				>
					<div className="font-semibold text-sm">Change Service Status?</div>
					{showStatus ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>

				{showStatus && (
					<div className="flex flex-row justify-between border-r border-l border-b border-gray-200 text-sm p-4 ">
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
					<div className="text-sm py-4 flex flex-col lg:flex-row justify-between gap-4 border-r border-l border-b border-gray-200 p-4 ">
						<div className="flex flex-col gap-4">
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

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="outline">Delete</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete your
										service.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditSettings;

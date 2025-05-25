"use client";

import React, { useEffect, useState } from "react";
import { getCurrentUser, getServiceById, Service } from "../ViewServiceClient";
import { useRouter, useParams } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	RiAlarmLine,
	RiMoreFill,
	RiStarFill,
	RiUser2Fill,
	RiVipCrown2Fill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface UploadedFile {
	file: File;
	uploadedAt: Date;
}

const Requirements: React.FC = () => {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const [service, setService] = useState<Service | null>(null);
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (!id) {
				setError("Invalid service ID");
				setLoading(false);
				return;
			}

			const [user, fetchedService] = await Promise.all([
				getCurrentUser(),
				getServiceById(id),
			]);

			setCurrentUserId(user);
			setService(fetchedService);
			setError(!fetchedService ? "Service not found" : null);
			setLoading(false);
		};

		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>Loading service requirements...</p>
			</div>
		);
	}

	if (error || !service) {
		return (
			<div className="flex items-center justify-center min-h-screen p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">
						{error ? "Service Not Found" : "No service data available"}
					</h1>
					<p className="text-gray-500">
						{error || "No service information could be retrieved."}
					</p>
				</div>
			</div>
		);
	}

	const isOwner = currentUserId === service.owner;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => ({
				file,
				uploadedAt: new Date(),
			}));
			setUploadedFiles((prev) => [...prev, ...filesArray]);
		}
	};

	const handleRemoveFile = (index: number) => {
		setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div>
			<div className="flex flex-row justify-between items-center border-b p-4 mb-4 border-gray-200 text-md font-semibold px-6">
				<div>
					<span
						onClick={() => router.push(`/services/${service.id}`)}
						className="hover:text-secondary"
					>
						{service.title}
					</span>{" "}
					/ Requirements
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1">
						<span>{service.ratings}</span>
						<RiStarFill className="text-secondary" />
					</div>
					<div className="flex items-center gap-1">
						<span>{service.no_of_avail}</span>
						<RiUser2Fill className="text-secondary" />
					</div>

					{service.display_badge && (
						<Button
							variant="secondary"
							size="sm"
							className="font-medium text-sm"
						>
							<RiVipCrown2Fill />
						</Button>
					)}
				</div>
			</div>

			<div className="flex flex-col md:flex-row mx-auto">
				<div className="w-full rounded-[10px] bg-white text-sm ">
					<div className="flex flex-col md:flex-row gap-8 mb-6 px-10 w-full pt-2">
						{/* Date Picker */}
						<div className="flex-1 justify-center items-center sm:border-r sm:border-gray-200 sm:pr-8">
							<p className="mb-2 font-medium">Schedule a date:</p>
							<div className="flex flex-row gap-3">
								<RiAlarmLine />
								<p className="text-gray-600 italic pb-2 text-xs">
									{service.end_date
										? `The service is available ${service.start_date} - ${service.end_date}.`
										: "Service is available anytime."}
								</p>
							</div>
							<div className="w-full mb-3">
								<div className="w-full flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-1">
									<span>
										{selectedDate
											? format(selectedDate, "PPP")
											: "Pick a date to schedule your request."}
									</span>
								</div>
								<div className="flex mt-2 justify-center">
									<Calendar
										mode="single"
										selected={selectedDate}
										onSelect={setSelectedDate}
										initialFocus
									/>
								</div>
							</div>
						</div>

						{/* File Upload */}
						<div className="flex-2">
							<p className="mb-2 font-medium">Requirements:</p>

							{!service.allow_attach_file ? (
								<div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-600">
									This service does not have any requirements you need to
									upload.
								</div>
							) : (
								<>
									<div>
										<input
											type="file"
											multiple
											onChange={handleFileChange}
											className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary/80"
										/>
									</div>

									{/* Uploaded Files List */}
									<div className="pt-4">
										<p className="mb-1">Uploaded files:</p>
										<div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700 space-y-2 max-h-[310px] overflow-y-auto">
											{uploadedFiles.length > 0 ? (
												uploadedFiles.map((item, idx) => (
													<div
														key={idx}
														className="flex justify-between items-start md:items-center bg-white rounded p-2 shadow-sm gap-1 flex-col md:flex-row"
													>
														<div>
															<span className="truncate max-w-xs block">
																{item.file.name}
															</span>
															<span className="text-xs text-gray-500 block">
																Uploaded: {format(item.uploadedAt, "PPpp")}
															</span>
														</div>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<button
																	className="text-gray-500 hover:text-gray-700"
																	aria-label="Options"
																>
																	<RiMoreFill size={18} />
																</button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align="end"
																className="bg-white"
															>
																<DropdownMenuItem
																	onClick={() => {
																		const url = URL.createObjectURL(item.file);
																		window.open(url, "_blank");
																	}}
																>
																	View
																</DropdownMenuItem>
																<DropdownMenuItem
																	onClick={() => handleRemoveFile(idx)}
																	className="text-red-600"
																>
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												))
											) : (
												<p className="text-gray-500">No files uploaded yet.</p>
											)}
										</div>
									</div>
								</>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					{isOwner ? (
						<div className="flex items-end justify-end px-5 w-full">
							<Button
								onClick={() => router.push(`/services/${service.id}/request`)}
							>
								Manage Request
							</Button>
						</div>
					) : (
						<div className="flex justify-between items-center gap-3 py-4 px-5">
							<Button
								variant="gray"
								onClick={() => router.push(`/services/${service.id}`)}
							>
								Back
							</Button>
							<Button
								variant="secondary"
								onClick={() => router.push(`/services/${service.id}/payment`)}
							>
								Proceed
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Requirements;

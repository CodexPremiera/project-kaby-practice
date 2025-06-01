"use client";

import React, { useEffect, useState } from "react";
import { getServiceById, Service } from "@/lib/clients/ViewServiceClient";
import { getCurrentUser, CurrentUser } from "@/lib/clients/useAuthClient";
import { useRouter, useParams } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	RiAlarmLine,
	RiArrowLeftLine,
	RiMoreFill,
	RiStarFill,
	RiUser2Fill,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { isBefore, isAfter, format } from "date-fns";
import { getPublicUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface UploadedFile {
	file: File;
	uploadedAt: Date;
}

const Requirements: React.FC = () => {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const [service, setService] = useState<Service | null>(null);
	const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const res = await fetch("/api/request", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				service_id: service?.id,
				is_paid: false,
				status: "Pending",
				owner: service?.owner,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			router.push(`/services/${service?.id}/payment`);
		} else {
			router.push(`/services/${service?.id}/requirements`);
		}
	};

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

			setCurrentUser(user);
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
			<div className="flex justify-between w-full bg-secondary py-2 px-3 items-center rounded-t-xl text-sm ">
				<div className="flex gap-4 font-medium  text-white ">
					<RiArrowLeftLine
						onClick={() => router.push(`/services/${service.id}`)}
						size={22}
						className="hover:bg-white rounded-full"
					/>
					Avail Service: {service.title}
				</div>
				<div className=" text-white">1/2</div>
			</div>

			<div className="flex flex-col md:flex-row mx-auto">
				<div className="w-full rounded-[10px] bg-white">
					<div className="flex flex-row items-center  border-b p-4 mb-4 border-gray-200 px-6 gap-3">
						<div className="flex gap-3 items-center">
							<div className="font-semibold text-md">Schedule Your Request</div>
							<div className="flex flex-row gap-3 items-center text-sm">
								<RiAlarmLine />
								<p className="text-gray-600 italic">
									{service.end_date
										? `The service is available ${format(new Date(service.start_date), "MMM d")}-${format(new Date(service.end_date), "d, yyyy")}`
										: "Service is available anytime."}
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-6 mb-6 px-6 ">
						<div className="flex-1 flex-col w-full gap-4 border border-gray-200 py-4 rounded-[10px]">
							<div className="flex-1">
								<div className="w-full mb-3">
									<div className="flex flex-col justify-between px-4">
										<div className="flex flex-row justify-center items-center">
											<div className="flex md:w-[100px] h-[80px] w-[60px] justify-center items-center bg-black/80 rounded-lg overflow-hidden p-4 relative">
												<Image
													src={
														service.image
															? getPublicUrl(service.image, "services-pictures")
															: "/default-image.jpg"
													}
													alt={`${service.title} image`}
													fill
													className="object-contain"
												/>
											</div>
											<div className="flex-1 px-4 text-sm">
												<div className="flex flex-row justify-between font-semibold border-b border-gray-200 py-4">
													{service.title}
													<div className="flex items-center gap-4 text-sm px-4">
														<div className="flex items-center gap-1">
															<span>{service.ratings}</span>
															<RiStarFill className="text-secondary" />
														</div>
														<div className="flex items-center gap-1">
															<span>{service.no_of_avail}</span>
															<RiUser2Fill className="text-secondary" />
														</div>
													</div>
												</div>
												<p className="pt-1">
													By: {service.owner_name} • {service.type}
												</p>
											</div>
										</div>

										<div className="flex flex-col mt-2 justify-center py-6">
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														className="w-full justify-between"
													>
														{selectedDate
															? format(selectedDate, "PPP")
															: "Select date"}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0 bg-white">
													<Calendar
														mode="single"
														selected={selectedDate}
														onSelect={(date) => setSelectedDate(date)}
														initialFocus
														disabled={(date) =>
															(service.start_date &&
																isBefore(date, new Date(service.start_date))) ||
															(service.end_date &&
																isAfter(date, new Date(service.end_date)))
														}
													/>
												</PopoverContent>
											</Popover>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex-1 flex-col w-full gap-4 py-4 rounded-[10px] space-y-6">
							{/* Requirements */}
							<div className="flex flex-col space-y-3 px-4">
								<h2 className="text-sm font-semibold text-gray-800">
									Requirements
								</h2>
								{/* File Upload */}
								<div className="text-sm">
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
																				const url = URL.createObjectURL(
																					item.file
																				);
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
														<p className="text-gray-500">
															No files uploaded yet.
														</p>
													)}
												</div>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-end">
						<Button variant="secondary" onClick={handleSubmit}>
							Proceed
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Requirements;

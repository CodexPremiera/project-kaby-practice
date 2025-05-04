"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RiMoreFill } from "react-icons/ri";

interface PageProps {
	params: { id: string };
}

interface UploadedFile {
	file: File;
	uploadedAt: Date;
}

const Requirements: React.FC<PageProps> = ({ params }) => {
	const router = useRouter();
	const currentUser = "Bondy Might";

	const service = services.find((s) => s.id === params.id);

	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();

	if (!service) {
		return (
			<div className="flex items-center justify-center min-h-screen p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
					<p className="text-gray-500">
						The service you’re looking for doesn’t exist.
					</p>
				</div>
			</div>
		);
	}

	const isOwner = currentUser === service.owner;

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
		<div className="flex flex-col md:flex-row mx-auto">
			<div className="w-full rounded-[10px] bg-white text-sm py-6">
				<div className="flex flex-col md:flex-row gap-8 mb-6 px-10 w-full pt-2">
					{/* Date Picker */}
					<div className="flex-1 justify-center items-center sm:border-r sm:border-gray-200 sm:pr-8">
						<p className="mb-2 font-medium">Schedule date:</p>
						<p className="text-gray-600 italic pb-2 text-xs">
							The service is available anytime.
							<br />
							Choose a date to schedule your request.
						</p>
						<div className="w-full mb-3">
							<div className="w-full flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-1">
								<span>
									{selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
						{service.requirements === "Not available" ? (
							<div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-600">
								No requirements needed for this service.
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
						<div>
							<Button
								onClick={() => router.push(`/services/${service.id}/request`)}
							>
								Manage Request
							</Button>
						</div>
					</div>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	);
};

export default Requirements;

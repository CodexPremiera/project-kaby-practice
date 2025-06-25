"use client";
import React, { useState, useEffect, use } from "react";
import { format } from "date-fns";
import { ServiceRequest } from "@/lib/clients/RequestServiceClient";
import { getServiceById } from "@/lib/clients/ViewServiceClient";
import { getCurrentUser } from "@/lib/clients/UseAuthClient";
import { createClient } from "@/utils/supabase/client";
interface DetailsProps {
	request: ServiceRequest;
}

interface Service {
	allow_attach_file: boolean;
	owner:string
}

interface Remark {
	text: string;
	date: Date;
}

const Details: React.FC<DetailsProps> = ({ request }) => {
	const [remarks, setRemarks] = useState<Remark[]>([]);
	const [newRemark, setNewRemark] = useState("");
	const [service, setService] = useState<Service | null>(null);
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); 
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);

	const supabase = createClient();
	
	useEffect(() => {
		const fetchService = async () => {
			try {
				const svc = (await getServiceById(request.service_id)) as Service;
				const { data: { user } } = await supabase.auth.getUser();
				if (user) setCurrentUserId(user.id);
				
				setService(svc);
			} catch (error) {
				console.error("Failed to fetch service:", error);
			}
		};

		if (request?.service_id) fetchService();
	}, [request?.service_id]);

	useEffect(() => {
		const fetchFiles = async () => {
			if (!request?.service_id) return;

			const { data, error } = await supabase.storage
				.from("service-requirements")
				.list(request.service_id + "/", { limit: 100 });

			if (error) {
				console.error("Error fetching files:", error);
			} else {
				setUploadedFiles(data?.map((file) => file.name) || []);
			}
		};

		fetchFiles();
	}, [request?.service_id]);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !request?.service_id) return;

		const filePath = `${request.service_id}/${file.name}`;
		console.log("Uploading file:", filePath);
		const { error } = await supabase.storage
			.from("service-requirements")
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: true,
			});

		if (error) {
			console.error("Upload error:", error);
		} else {
			console.log("File uploaded:", filePath);
			setUploadedFiles((prev) => [...prev, file.name]);
		}
	};

	const handleAddRemark = () => {
		if (newRemark.trim() === "") return;
		const remark: Remark = {
			text: newRemark,
			date: new Date(),
		};
		setRemarks([...remarks, remark]);
		setNewRemark("");
	};

	return (
		<div className="flex flex-col h-[280px] overflow-hidden bg-white py-2 px-1">
			{/* Header */}
			<div className="p-3 border-b border-gray-200 text-sm font-medium text-gray-700">
				Requirements
			</div>


			{/* Upload & Display Section */}
			{service?.allow_attach_file && (
			<>
				{currentUserId !== service.owner && (
					<div className="flex items-center justify-between px-3 py-2">
						<p className="text-sm text-blue-600 font-medium">
							📎 You can upload attachments for this service.
						</p>
						<label className="text-sm cursor-pointer bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded">
							Upload File
							<input type="file" className="hidden" onChange={handleFileUpload} />
						</label>
					</div>
				)}

				{/* Always visible file list */}
				{uploadedFiles.length > 0 && (
					<div className="text-sm text-gray-700 px-3">
						<p className="font-medium">Uploaded Files:</p>
						<ul className="list-disc list-inside">
							{uploadedFiles.map((filename, index) => {
								const publicUrl = supabase.storage
									.from("service-requirements")
									.getPublicUrl(`${request.service_id}/${filename}`).data.publicUrl;

								return (
									<li key={index}>
										<a
											href={publicUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 underline"
										>
											{filename}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</>
		)}


			{/* Remarks / Fallback */}
			<div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50">
				{remarks.length === 0 ? (
					<p className="text-gray-500 text-center mt-10">
						{service?.allow_attach_file
							? "No requirements added."
							: "Cannot attach any file for this service."}
					</p>
				) : (
					remarks.map((remark, idx) => (
						<div
							key={idx}
							className="border border-gray-200 rounded p-2 bg-white"
						>
							<p className="text-gray-700">{remark.text}</p>
							<p className="text-xs text-gray-500 mt-1">
								Date posted: {format(remark.date, "PPpp")}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Details;

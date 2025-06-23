"use client";

import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import { Service } from "@/lib/clients/ViewServiceClient";
import { CurrentUser } from "@/lib/clients/UseAuthClient";
import {useRouter, useParams} from "next/navigation";
import { RiStarFill, RiUser2Fill } from "react-icons/ri";
import { getPublicUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import GCashModal from "@/components/modal/GCashModal";
import {Request} from "@/lib/clients/RequestServiceClient";
import {formatDate} from "@/lib/utils";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

/*interface UploadedFile {
	name: string;
	url: string;
}*/

const Payment: React.FC = () => {
	const router = useRouter();
	const { requestId } = useParams<{ requestId: string }>();
	console.log(requestId);

	const [service, setService] = useState<Service | null>(null);
	const [request, setRequest] = useState<Request | null>(null);
	const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	// const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const res = await fetch("/api/tracker", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: currentUser,
				is_paid: true,
				status: "Ongoing",
			}),
		});
		setShowModal(true);
	};

	useEffect(() => {
		const fetchRequestAndService = async () => {
			if (!requestId) return;

			try {
				const res = await fetch(`/api/request/${requestId}`);
				if (!res.ok) throw new Error("Request not found");

				const data = await res.json();
				const fetchedRequest: Request = data.requests;
				setRequest(fetchedRequest);

				if (!fetchedRequest?.service_id) throw new Error("Missing service ID");

				const serviceRes = await fetch(`/api/services/${fetchedRequest.service_id}`);
				if (!serviceRes.ok) throw new Error("Service not found");

				const serviceData = await serviceRes.json();
				setService(serviceData);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch request or service data");
			} finally {
				setLoading(false);
			}
		};

		fetchRequestAndService();
	}, [requestId]);


	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>Loading payment details...</p>
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
	const handleFakeSuccess = async () => {
        try {
            setLoading(true);
            setShowModal(false);

            const res = await fetch("/api/request", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: currentUser?.user_id,
                    is_paid: true,
                    status: "Ongoing",
                }),
            });

            if (!res.ok) throw new Error("Payment failed");

            router.push("/tracker");
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

	console.log(request)

	return (
		<div>
			<div className="flex justify-between w-full bg-secondary py-2 px-3 items-center rounded-t-xl text-sm ">
				<div className="flex gap-4 font-medium  text-white ">
					Make Payment: {service.title}
				</div>
				<div className=" text-white ">2/2</div>
			</div>
			<div className="flex flex-col md:flex-row  max-w-7xl mx-auto sm:h-[550px] h-full py-2">
				<div className="w-full rounded-[10px] bg-white">
					<div className="flex flex-row items-center  border-b p-4 mb-4 border-gray-200 px-6 gap-3">
						<div className="flex justify-between items-center gap-3 w-full">
							<div className="flex gap-3 items-center">
								<div className="font-semibold text-md">
									{request?.schedule_date === null ? "Not scheduled" : `Scheduled on ${formatDate(request?.schedule_date)}`}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-6 mb-6 px-6 ">
						<div className="flex-1 flex-col w-full gap-4 border border-gray-200 py-4 rounded-[10px]">
							<div className="flex flex-row justify-center items-center px-4">
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
							<div className="flex-1 py-6 px-4 text-sm">
								<p className="pb-1">Note:</p>
								<div className="bg-gray-100 rounded-lg p-5 h-auto overflow-y-auto text-gray-600 text-xs text-justify">
									<ul className="list-disc pl-4">
										<li>The Agreement Fee is non-refundable once paid.</li>
										<li>
											The Service Fee will be paid based on your agreement with
											the service-provider, either online or in person.
										</li>
									</ul>
								</div>
							</div>
							{/* Payment Details */}
							<div className="flex flex-col gap-4 py-4 px-8 pb-4">
								<div>
									<div className="text-sm flex justify-between">
										<p>Service Fee:</p>
										<p>₱{service.service_cost}</p>
									</div>
									<div className="text-sm flex justify-between">
										<p>Agreement Fee:</p>
										<p>₱{service.agreement_fee}</p>
									</div>
									<div className="text-sm flex justify-between">
										<p>Convenience Fee:</p>
										<p>₱{service.convenience_fee}</p>
									</div>
									<div className="flex justify-between items-center font-semibold">
										<p className="text-sm">Total Due:</p>
										<p className="text-lg text-secondary">
											₱{service.total_price}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex-1 flex-col w-full gap-4 py-4 rounded-[10px] space-y-6">
							{/* Payment Method */}
							<div className="flex flex-col space-y-3 px-4">
								<h2 className="text-sm font-semibold text-gray-800">
									Payment Method
								</h2>
								<div className="flex items-center justify-center border border-gray-300 rounded-[10px] cursor-pointer hover:bg-gray-50 w-25 h-10">
									<img
										src="/assets/gcash-logo.png"
										alt="GCash"
										className="w-20 h-20 object-contain"
									/>
								</div>
							</div>

							{/* Billing Information */}
							<div className="flex flex-col space-y-3 px-4">
								<h2 className="text-sm font-semibold text-gray-800">
									Billing Information
								</h2>
								<div className="flex gap-4">
									<Input type="text" placeholder="Country" />
									<Input type="text" placeholder="ZIP Code" />
								</div>
							</div>

							{/* Terms Notice */}
							<div className="flex-1 text-sm text-gray-600">
								<div className="rounded-lg py-5 px-4 h-auto overflow-y-auto text-xs text-justify">
									By proceeding with this payment, I confirm that I have
									reviewed and accepted these terms. I understand that once the
									Agreement Fee is paid, it cannot be refunded, and the Service
									Fee will be handled according to my arrangement with the
									provider.
								</div>
							</div>
							<div className="flex gap-4 justify-end">
								<ButtonSecondary onClick={() => router.push(`/tracker`)}>
									Go to tracker
								</ButtonSecondary>
								<ButtonPrimary onClick={handleSubmit}>Proceed</ButtonPrimary>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<GCashModal
					handleFakeSuccess={handleFakeSuccess}
					setShowModal={setShowModal}
					service ={service}
				/>
			)}
		</div>
	);
};

export default Payment;

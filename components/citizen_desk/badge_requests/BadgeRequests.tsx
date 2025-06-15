"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import SearchBar from "@/components/ui/form/SearchBar";
import BadgeRequestsList from "@/components/citizen_desk/badge_requests/BadgeRequestsList";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ErrorModal from "@/components/modal/ErrorModal";
import SuccessModal from "@/components/modal/SuccessModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import BadgeRequestsTable from "./BadgeRequestsTable";

const BadgeRequests = () => {
	const [requests, setRequests] = useState<any[]>([]);
	const [selectedService, setSelectedService] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [selectedStatus, setSelectedStatus] = useState<string>("");

	const [loading, setLoading] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error" | null>(null);
	const [modalMessage, setModalMessage] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [pendingAction, setPendingAction] = useState<
		"accept" | "reject" | null
	>(null);

	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	const fetchBadgeRequests = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/barangay/badge_request");
			if (!res.ok) throw new Error("Failed to fetch badge requests");
			const data = await res.json();
			setRequests(data);
		} catch (error) {
			console.error("Error fetching badge requests:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBadgeRequests();
	}, []);

	const filteredRequests = requests.filter((req) => {
		const fullName =
			`${req.customer_fname} ${req.customer_lname}`.toLowerCase();
		const matchesSearch = fullName.includes(searchTerm.toLowerCase());
		const matchesService = selectedService
			? req.service_title === selectedService
			: true;
		return matchesSearch && matchesService;
	});

	const uniqueServices = Array.from(
		new Map(
			requests.map((req) => [req.service_id, req.service_title])
		).entries()
	).map(([id, title]) => ({ id, title }));

	const toggleSelection = (index: number) => {
		setSelectedItems((prevSelected) =>
			prevSelected.includes(index)
				? prevSelected.filter((item) => item !== index)
				: [...prevSelected, index]
		);
	};

	const handleSelectAll = () => {
		if (selectedItems.length === filteredRequests.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(filteredRequests.map((_, index) => index));
		}
	};

	const handleConfirmAction = async () => {
		setShowConfirmModal(false);
		setLoading(true);

		try {
			for (const index of selectedItems) {
				const req = filteredRequests[index];

				if (selectedStatus === "Accept") {
					await fetch(`/api/barangay/badge_request`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							customer_id: req.customer_id,
							owner_id: req.owner_id,
						}),
					});
				}

				await fetch("/api/barangay/badge_request", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						citizen_id: req.customer_id,
						barangay_id: req.owner_id,
						service_id: req.service_id,
						date_given: new Date().toISOString().split("T")[0],
						status: selectedStatus,
					}),
				});
			}

			await fetchBadgeRequests();
			setSelectedItems([]);
			setSelectedStatus("");

			setModalType("success");
			setModalMessage(
				`Badge request(s) ${selectedStatus?.toLowerCase()}ed successfully.`
			);
		} catch (error) {
			console.error("Error submitting bulk action:", error);
			setModalType("error");
			setModalMessage("Something went wrong while processing badge requests.");
		} finally {
			setLoading(false);
		}
	};

	const handleCloseModal = () => {
		setModalType(null);
		setModalMessage("");
	};

	return (
		<div className="flex flex-col gap-8 p-4 background-1 rounded-xl">
			<div className="flex flex-col items-start gap-2 w-full">
				<span className="text-xl font-semibold hidden xl:block">
					Badge Requests
				</span>
				<div className="text-sm text-muted-foreground">
					Review, manage, and grant badges as requested by your citizens.
				</div>
			</div>

			{/* Search + Filter */}
			<div className="flex flex-col md:flex-row items-center md:gap-12 gap-2 w-full">
				<div className="flex items-center grow max-w-[540px] w-full">
					<SearchBar
						value={searchTerm}
						placeholder="Search a customer name"
						onChange={(e) => setSearchTerm(e.target.value)}
						className="rounded-full border text-primary w-full"
					/>
				</div>

				<div className="flex w-full">
					<select
						value={selectedService}
						onChange={(e) => setSelectedService(e.target.value)}
						className="flex items-center gap-2.5 py-2 px-2 border border-gray-300 rounded-[5px] text-sm text-black w-full"
					>
						<option value="">All Services</option>
						{uniqueServices.map((service) => (
							<option key={service.id} value={service.title}>
								{service.title}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex flex-col justify-end gap-1 pr-4 border-r border-secondary text-end">
						<span className="text-xs sm:text-sm text-secondary">Selected</span>
						<span className="font-semibold text-sm sm:text-base">
							{selectedItems.length}{" "}
							{selectedItems.length === 1 ? "item" : "items"}
						</span>
					</div>
					<select
						value={selectedStatus}
						onChange={(e) => setSelectedStatus(e.target.value)}
						disabled={selectedItems.length === 0}
						className="border border-gray-300 rounded px-2 py-2 text-sm"
					>
						<option value="">Select Status</option>
						<option value="Accept">Accept</option>
						<option value="Reject">Reject</option>
					</select>

					<ButtonSecondary
						onClick={() => {
							if (selectedStatus === "Accept") {
								setPendingAction("accept");
							} else if (selectedStatus === "Reject") {
								setPendingAction("reject");
							}
							setShowConfirmModal(true);
						}}
						disabled={selectedItems.length === 0 || !selectedStatus}
						className={`px-3 py-2 bg-black text-white rounded ${
							selectedItems.length === 0 || !selectedStatus
								? "opacity-50 pointer-events-none"
								: ""
						}`}
					>
						Submit
					</ButtonSecondary>
				</div>
			</div>
			<div className="relative">
				{/* Table or List */}
				{isLargeScreen ? (
					<BadgeRequestsTable
						filteredClients={filteredRequests}
						selectedItems={selectedItems}
						toggleSelection={toggleSelection}
						handleSelectAll={handleSelectAll}
						onActionComplete={fetchBadgeRequests}
					/>
				) : (
					<BadgeRequestsList
						filteredClients={filteredRequests}
						selectedItems={selectedItems}
						toggleSelection={toggleSelection}
						handleSelectAll={handleSelectAll}
					/>
				)}

				{/* Scoped Loading Overlay */}
				{loading && (
					<div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-20 rounded-xl z-20">
						<div className="text-gray-600 text-sm font-medium animate-pulse">
							Loading...
						</div>
					</div>
				)}
			</div>

			{/* Error Modal */}
			{modalType === "error" && (
				<ErrorModal
					title="Error"
					content={modalMessage}
					onClose={handleCloseModal}
				/>
			)}

			{/* Success Modal */}
			{modalType === "success" && (
				<SuccessModal
					title="Success"
					content={modalMessage}
					onClose={handleCloseModal}
				/>
			)}

			{/* Confirmation Modal */}
			{showConfirmModal && (
				<ConfirmationModal
					title="Confirm Action"
					content={`Are you sure you want to ${
						pendingAction === "accept" ? "accept" : "reject"
					} these badge request(s)?`}
					onConfirm={handleConfirmAction}
					onClose={() => setShowConfirmModal(false)}
				/>
			)}
		</div>
	);
};

export default BadgeRequests;

"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import SearchBar from "@/components/ui/form/SearchBar";
import BadgeActions from "@/components/citizen_desk/badge_requests/BadgeActions";
import BadgeRequestsTable from "@/components/citizen_desk/badge_requests/BadgeRequestsTable";
import BadgeRequestsList from "@/components/citizen_desk/badge_requests/BadgeRequestsList";

const BadgeRequests = () => {
	const [requests, setRequests] = useState<any[]>([]);
	const [selectedService, setSelectedService] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const isLargeScreen = useMediaQuery("(min-width: 768px)");

	const fetchBadgeRequests = async () => {
		try {
			const res = await fetch("/api/barangay/badge_request");
			if (!res.ok) throw new Error("Failed to fetch badge requests");
			const data = await res.json();
			setRequests(data);
		} catch (error) {
			console.error("Error fetching badge requests:", error);
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

				<div className="flex-1 w-full">
					<select
						value={selectedService}
						onChange={(e) => setSelectedService(e.target.value)}
						className="flex items-center gap-2.5 py-2 px-2 border border-secondary text-sm text-black w-full"
					>
						<option value="">All Services</option>
						{uniqueServices.map((service) => (
							<option key={service.id} value={service.title}>
								{service.title}
							</option>
						))}
					</select>
				</div>
			</div>

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
		</div>
	);
};

export default BadgeRequests;

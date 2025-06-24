export interface Service {
	id: string;
	title: string;
	owner: string;
	type: "Barangay" | "Personal" | "Event";
	image: string;
	status: "active" | "closed";
	description: string;
	requirements: string;
	feeRange: string;
	agreementFee: string;
	convenienceFee: string;
	displayBadge?: "Yes" | "No"; // for Personal / Event
	eligibleForBadges?: "Yes" | "No"; // for Barangay
	rating: number;
	availed: number;
	is_permanently_deleted: boolean;
}
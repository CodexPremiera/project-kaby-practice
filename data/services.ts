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
}

export const services: Service[] = [
	{
		id: "1",
		title: "Marga's Portrait Studio",
		owner: "Marga Cruz",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Studio portrait and ID photo sessions for individuals and families.",
		requirements: "Booking required",
		feeRange: "₱2000.00 - ₱4000.00",
		agreementFee: "₱100.00",
		convenienceFee: "₱15.00",
		displayBadge: "Yes",
		rating: 4.5,
		availed: 15,
	},
	{
		id: "2",
		title: "Basak Street Sweeping",
		owner: "Basak Barangay",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Daily street sweeping to maintain neighborhood cleanliness.",
		requirements: "None",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 4.9,
		availed: 120,
	},
	{
		id: "3",
		title: "Elite Party Setup",
		owner: "Events by Eliza",
		type: "Event",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Event styling and decor for birthdays and debuts.",
		requirements: "Initial design consultation",
		feeRange: "₱8000.00 - ₱25000.00",
		agreementFee: "₱800.00",
		convenienceFee: "₱20.00",
		displayBadge: "Yes",
		rating: 4.7,
		availed: 18,
	},
	{
		id: "4",
		title: "Ray's PC Repair",
		owner: "Raymund Tan",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "closed",
		description: "Affordable PC repair and upgrades for students and professionals.",
		requirements: "Bring your unit",
		feeRange: "₱500.00 - ₱2000.00",
		agreementFee: "₱50.00",
		convenienceFee: "₱10.00",
		displayBadge: "No",
		rating: 4.4,
		availed: 45,
	},
	{
		id: "5",
		title: "Green Haven Clean-Up Drive",
		owner: "Green Haven Barangay",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Community-wide river and park cleanup every third Sunday.",
		requirements: "Register at barangay hall",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 5.0,
		availed: 60,
	},
	{
		id: "6",
		title: "Miguel’s Dog Training",
		owner: "Miguel Rios",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Obedience and behavior training for dogs of all breeds.",
		requirements: "Vaccination card",
		feeRange: "₱1000.00 - ₱3500.00",
		agreementFee: "₱250.00",
		convenienceFee: "₱20.00",
		displayBadge: "Yes",
		rating: 4.6,
		availed: 22,
	},
	{
		id: "7",
		title: "Barangay Health Check-Up",
		owner: "San Roque",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Monthly health check-ups with free consultations and vitamins.",
		requirements: "Barangay ID required",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱10.00",
		eligibleForBadges: "Yes",
		rating: 4.9,
		availed: 110,
	},
	{
		id: "8",
		title: "Liza's Language Tutorials",
		owner: "Liza Soriano",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "1-on-1 Filipino, English, and Japanese tutoring sessions.",
		requirements: "Placement test",
		feeRange: "₱600.00 - ₱1500.00",
		agreementFee: "₱100.00",
		convenienceFee: "₱10.00",
		displayBadge: "Yes",
		rating: 4.8,
		availed: 38,
	},
	{
		id: "9",
		title: "Fiesta Coordination Team",
		owner: "Cultural Office",
		type: "Event",
		image: "/assets/img/service-img.png",
		status: "closed",
		description: "Planning and logistics for barangay fiesta activities.",
		requirements: "Barangay clearance",
		feeRange: "₱3000.00 - ₱10000.00",
		agreementFee: "₱500.00",
		convenienceFee: "₱15.00",
		displayBadge: "No",
		rating: 4.3,
		availed: 12,
	},
	{
		id: "10",
		title: "Barangay e-Konsulta",
		owner: "Talamban",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "closed",
		description: "Remote consultations with doctors via barangay portal.",
		requirements: "Barangay-issued email account",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "No",
		rating: 4.2,
		availed: 90,
	},
	{
		id: "11",
		title: "Mobile Barangay ID Registration",
		owner: "Guadalupe",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Outreach program for issuing Barangay IDs in remote sitios.",
		requirements: "Birth certificate, 1x1 photo",
		feeRange: "₱50.00 - ₱100.00",
		agreementFee: "₱10.00",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 4.8,
		availed: 210,
	},
	{
		id: "12",
		title: "Aria's Makeup Services",
		owner: "Aria Mendoza",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Bridal and glam makeup for events and shoots.",
		requirements: "Skin consultation prior to booking",
		feeRange: "₱1500.00 - ₱6000.00",
		agreementFee: "₱500.00",
		convenienceFee: "₱15.00",
		displayBadge: "Yes",
		rating: 4.9,
		availed: 32,
	},
	{
		id: "13",
		title: "Free Legal Aid Clinic",
		owner: "City Legal Office",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Monthly free legal advice on land, tenancy, and domestic issues.",
		requirements: "Barangay certificate of residency",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 4.7,
		availed: 80,
	},
	{
		id: "14",
		title: "CCTV Installation and Repair",
		owner: "J3 Security",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Affordable CCTV setup for homes and small businesses.",
		requirements: "Site visit required",
		feeRange: "₱2000.00 - ₱15000.00",
		agreementFee: "₱500.00",
		convenienceFee: "₱20.00",
		displayBadge: "Yes",
		rating: 4.5,
		availed: 27,
	},
	{
		id: "15",
		title: "Sports Fest Coordination",
		owner: "Barangay Sports Council",
		type: "Event",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Organizing inter-purok basketball, volleyball, and chess events.",
		requirements: "Team list submission",
		feeRange: "₱1000.00 - ₱5000.00",
		agreementFee: "₱300.00",
		convenienceFee: "₱10.00",
		displayBadge: "Yes",
		rating: 4.6,
		availed: 16,
	},
	{
		id: "16",
		title: "Barangay Reading Camp",
		owner: "Tisa Youth Dev Office",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "closed",
		description: "Free weekend reading sessions for elementary pupils.",
		requirements: "Parental consent",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 5.0,
		availed: 50,
	},
	{
		id: "17",
		title: "Digital Marketing Starter Kit",
		owner: "Janine Alonzo",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Social media setup and branding for local businesses.",
		requirements: "Product or service listing",
		feeRange: "₱2500.00 - ₱10000.00",
		agreementFee: "₱500.00",
		convenienceFee: "₱15.00",
		displayBadge: "Yes",
		rating: 4.8,
		availed: 21,
	},
	{
		id: "18",
		title: "Tech Literacy for Seniors",
		owner: "Labangon ICT Hub",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Weekly computer and smartphone training for senior citizens.",
		requirements: "Senior Citizen ID",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 4.9,
		availed: 33,
	},
	{
		id: "19",
		title: "Rural Internet Setup",
		owner: "WiFiLink Solutions",
		type: "Personal",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Satellite internet installation for remote homes and farms.",
		requirements: "GPS location and barangay permit",
		feeRange: "₱3000.00 - ₱15000.00",
		agreementFee: "₱1000.00",
		convenienceFee: "₱25.00",
		displayBadge: "Yes",
		rating: 4.4,
		availed: 19,
	},
	{
		id: "20",
		title: "Barangay Disaster Preparedness Seminar",
		owner: "Risk Reduction Unit",
		type: "Barangay",
		image: "/assets/img/service-img.png",
		status: "active",
		description: "Orientation on basic life support, evacuation, and safety drills.",
		requirements: "Pre-registration at barangay hall",
		feeRange: "Free",
		agreementFee: "None",
		convenienceFee: "₱5.00",
		eligibleForBadges: "Yes",
		rating: 4.7,
		availed: 65,
	}
];

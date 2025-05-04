export interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
	current_badges: number;
	accumulated_badges: number;
}

export const profiles: Profile[] = [
	{
		id: "1",
		name: "John Doe",
		address: "South District Cebu City",
		image: "/assets/profile/bg-profile.png",
		current_badges: 10,
		accumulated_badges: 57,
	},
	{
		id: "2",
		name: "Jane Doe",
		address: "North District Cebu City",
		image: "/assets/profile/bg-profile.png",
		current_badges: 8,
		accumulated_badges: 47,
	},
	{
		id: "3",
		name: "Bondy Might",
		address: "Mandaue City",
		image: "/assets/profile/bg-profile.png",
		current_badges: 11,
		accumulated_badges: 67,
	},
];

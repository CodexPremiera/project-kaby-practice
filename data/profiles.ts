export interface Profile {
	id: string;
	name: string;
	address: string;
	image: string;
	current_badges: number;
	accumulated_badges: number;
	status: string;
}

export const profiles: Profile[] = [
	{
		id: "654a4039-9553-4c69-8720-f53acb16d7f5",
		name: "John Doe",
		address: "South District Cebu City",
		image: "https://comicbook.com/wp-content/uploads/sites/4/2022/02/66040a7f-aac0-4910-8609-f6a4c7b94c90.jpg?w=1024",
		current_badges: 10,
		accumulated_badges: 57,
		status: "Pending"
	},
];

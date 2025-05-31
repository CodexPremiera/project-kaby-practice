export interface Service {
	id: string;
	owner: string;
	owner_name: string;
	title: string;
	image?: string;
	description: string;
	type: string;
	service_cost: number;
	agreement_fee: number;
	convenience_fee: number;
	total_price: number;
	payment_type: string;
	start_date: Date;
	end_date: Date;
	display_badge: boolean;
	eligible_for_badges: boolean;
	ratings: number;
	no_of_avail: number;
	date_created: Date;
	date_closed: Date;
	allow_attach_file: boolean;
	status: string;
	category: string | null;
}

export const getServiceById = async (id: string): Promise<Service | null> => {
	try {
		const res = await fetch(`/api/services/${id}`);
		if (!res.ok) throw new Error(`Service not found (status ${res.status})`);
		return await res.json();
	} catch (err) {
		console.error("Error fetching service:", err);
		return null;
	}
};

export interface Request {
	id: string;
	service_id: string;
	owner: string;
	is_paid: boolean;
	schedule_date: Date;
	status: string;
	request_files: string | null;
	customer_id: string | null;
	added_date: string; // ISO string from Supabase

	CitizenProfile?: {
		first_name: string | null;
		last_name: string | null;
		middle_name: string | null;
		profile_pic?: string | null;
	};
}

export const getCustomerName = (request: Request) =>
	`${request.CitizenProfile?.first_name ?? ''} ${
		request.CitizenProfile?.middle_name ? request.CitizenProfile.middle_name[0] + '.' : ''
	} ${request.CitizenProfile?.last_name ?? ''}`.trim();
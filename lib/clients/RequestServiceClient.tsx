
// This is the request information needed by a SERVICE about a request
// Used in the Services page of the service provider
export interface ServiceRequest {
	id: string;
	service_id: string;
	is_paid: boolean;
	schedule_date: Date;
	customer_id: string;
	customer_name: string;
	customer_photo: string;
	customer_address: string;
	status: string;
	request_files: string | null;

	added_date: string; // ISO string from Supabase

	CitizenProfile?: {
		first_name: string | null;
		last_name: string | null;
		middle_name: string | null;
		profile_pic: string | null;
	};

	Services?: {
		title: string
	}
}

export interface SERVICERequest {
	id: string;
	service_id: string;
	is_paid: boolean;
	schedule_date: Date;
	ratings: string;
	request_files: string | null;
	status: string;
	owner_id: string;
	customer_id: string;
	added_date: string;
	service_title: string;
	service_photo: string;
	owner_name: string;
	customer_fname: string;
	customer_lname: string;
	customer_mname: string;
	customer_photo: string;
}


export const getCustomerName = (request: ServiceRequest) =>
	`${request.CitizenProfile?.first_name ?? ''} ${
		request.CitizenProfile?.middle_name ? request.CitizenProfile.middle_name[0] + '.' : ''
		} ${request.CitizenProfile?.last_name ?? ''}`.trim();
	


		function toRequest(req: any): Request {
			return {
				...req,
				schedule_date: new Date(req.schedule_date),
			};
		}

		export async function getRequestsByService(
			serviceId: string,
			status?: string
		): Promise<Request[]> {
			try {
				const url = new URL(
					`/api/services/${serviceId}/request`,
					process.env.NEXT_PUBLIC_BASE_URL
				);

				if (status) url.searchParams.set("tab", status);

				const response = await fetch(url.toString());
				const data = await response.json();

				if (!Array.isArray(data.requests)) {
					console.error("Invalid data format: requests is not an array");
					return [];
				}

				const requests: Request[] = data.requests.map(toRequest);

				return requests;
			} catch (error) {
				console.error("Error fetching service requests:", error);
				return [];
			}
		}
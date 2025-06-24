export interface ServiceRequest {
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

export interface Request {
	id: string;
	service_id: string;
	is_paid: boolean;
	schedule_date: string | null;
	ratings: number | null;
	request_files: string | null;
	status: "Pending" | "Ongoing" | "Completed" | "Canceled" | string; // adjust enum as needed
	owner: string;
	customer_id: string;
	added_date: string; // ISO 8601 datetime string
}

export const getCustomerName = (request: ServiceRequest) =>
	`${request.customer_fname ?? ""} ${
		request.customer_mname ? request.customer_mname[0] + "." : ""
	} ${request.customer_lname ?? ""}`.trim();

export const getRequestsByCustomer = async (customerId: string) => {
	const res = await fetch(`/api/tracker/${customerId}`);
	if (!res.ok) {
		return [];
	}
	const data = await res.json();
	return data.requests;
};
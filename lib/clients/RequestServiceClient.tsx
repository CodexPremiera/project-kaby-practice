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


export const getCustomerName = (request: ServiceRequest) =>
	`${request.customer_fname ?? ''} ${
		request.customer_mname ? request.customer_mname[0] + '.' : ''
		} ${request.customer_lname ?? ''}`.trim();
export interface Request {
	id: string;
	service_id: string;
	owner: string;
	is_paid: boolean;
	schedule_date: Date;
	status: string;
	request_files: string | null;
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
		console.log("this is url", url.toString());
		const response = await fetch(url.toString());
		const data = await response.json();
		console.log(data, " debuggerrrrr");
		const requests: Request[] = data.requests.map((req: any) => ({
			id: req.id,
			service_id: req.service_id,
			owner: req.owner,
			is_paid: req.is_paid,
			schedule_date: req.schedule_date,
			status: req.status,
			request_files: req.request_files,
		}));

		return requests;
	} catch (error) {
		console.error("Error fetching service requests:", error);
		return [];
	}
}

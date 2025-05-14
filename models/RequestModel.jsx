class RequestModel {
	constructor(
		service_id,
		citizen_id,
		is_paid,
		agreement_fee,
		attach_file,
		schedule_date,
		is_canceled,
		ratings
	) {
		this.service_id = service_id;
		this.citizen_id = citizen_id;
		this.is_paid = is_paid;
		this.agreement_fee = agreement_fee;
		this.attach_file = attach_file;
		this.schedule_date = schedule_date;
		this.is_canceled = is_canceled;
		this.ratings = ratings;
	}
}

export default RequestModel;

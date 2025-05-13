class ServiceModel {
	static validTypes = ["Personal", "Barangay", "Event"];

	constructor(
		title,
		owner = null,
		image = null,
		description = "",
		type = "Barangay",
		service_cost = 0,
		agreement_fee = 0,
		convenience_fee = 0,
		total_price = 0,
		start_date = null,
		end_date = null,
		display_badge = false,
		eligible_for_badges = false,
		allow_attach_file = "No",
		ratings = 0,
		no_of_avail = 0,
		date_closed = null,
		date_created = new Date().toISOString(),
		status = "Active"
	) {
		this.title = title;
		this.owner = owner;
		this.image = image;
		this.description = description;

		if (!ServiceModel.validTypes.includes(type)) {
			throw new Error(
				`Invalid service type. Valid types are: ${ServiceModel.validTypes.join(", ")}`
			);
		}
		this.type = type;

		this.service_cost = service_cost;
		this.agreement_fee = agreement_fee;
		this.convenience_fee = convenience_fee;
		this.total_price = total_price;
		this.start_date = start_date;
		this.end_date = end_date;
		this.display_badge = display_badge;
		this.eligible_for_badges = eligible_for_badges;
		this.allow_attach_file = allow_attach_file;
		this.ratings = ratings;
		this.no_of_avail = no_of_avail;
		this.date_closed = date_closed;
		this.date_created = date_created;
		this.status = status;
	}
}

export default ServiceModel;

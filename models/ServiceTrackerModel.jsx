class ServiceTrackerModel {
        constructor(service_status = null, 
                payment_status = False,
                schedule_date = null, 
                is_canceled = False, 
                ){
                        this.service_status = service_status
                        this.payment_status = payment_status
                        this.schedule_date = schedule_date
                        this.is_canceled = is_canceled
        }
}

export default ServiceTrackerModel;
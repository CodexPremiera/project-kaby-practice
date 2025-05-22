class RequestCardModel {
        constructor(is_paid = False, 
                agreement_fee = 0, 
                attach_file = null,
                schedule_date = null, 
                is_canceled = False, 
                ratings = 0){

                        this.is_paid = is_paid;
                        this.agreement_fee = agreement_fee;
                        this.attach_file = attach_file;
                        this.schedule_date = schedule_date;
                        this.is_canceled = is_canceled;
                        this.ratings = ratings;

        }
}

export default RequestCardModel;
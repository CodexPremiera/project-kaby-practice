class ServiceModel{
    constructor(title,owner,type,image,status,description,requirements,feerange,agreementfee,conveniencefee,displaybadge,eligibleforbadges,rating,availed){
        this.title = title;
        this.owner = owner;
        this.type = type;
        this.image = image;
        this.status = status;
        this.description = description;
        this.requirements = requirements;
        this.feerange = feerange;
        this.agreementfee = agreementfee;
        this.conveniencefee = conveniencefee;
        this.displaybadge = displaybadge;
        this.eligibleforbadges = eligibleforbadges;
        this.rating = rating;
        this.availed = availed;
    }
}
export default ServiceModel;
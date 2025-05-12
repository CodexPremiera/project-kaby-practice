class ServiceModel{
    constructor(title,owner,type,image,status,description,requirements,feerange,agreementfee,conveniencefee,displaybadge,eligibleforbadges,rating,availed){
        this.title = title;
        this.owner = owner;
        this.description = description;
        this.type = type;
        this.feerange = feerange;
        this.image = image;
        this.status = status;
       
        this.requirements = requirements;
    
        this.agreementfee = agreementfee;
        this.conveniencefee = conveniencefee;
        this.displaybadge = displaybadge;
        this.eligibleforbadges = eligibleforbadges;
        this.rating = rating;
        this.availed = availed;
    }
}
export default ServiceModel;
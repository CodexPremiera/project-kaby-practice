import UserModel from "./UserModel";

class CitizenModel extends UserModel{
    constructor(email,role="citizen",firstName, lastName,middleName="",birthdate=null, accumulatedBadge=0,currentBadge=0,barangay=""){
        super(email,role);
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthdate = birthdate;
        this.accumulatedBadge = accumulatedBadge;
        this.currentBadge = currentBadge;
        this.barangay = barangay;
    }
}

export default CitizenModel;
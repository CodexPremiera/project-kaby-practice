import UserModel from "./UserModel";

class CitzenModel extends UserModel{
    constructor(email,role="citizen",firstName, lastName,middleName,birthdate, accumulatedBadge,currentBadge,barangay){
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

export default CitzenModel;
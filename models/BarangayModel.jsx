import UserModel from "./UserModel";

class BarangayModel extends UserModel{
    constructor(email,role = "barangay", address, badgeStock){
        super(email,role);
        this.address = address;
        this.badgeStock = badgeStock;
    }
}
export default BarangayModel;
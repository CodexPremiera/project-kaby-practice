import ContactRepo from "@/repositories/ContactRepo"
import { NextResponse } from "next/server";

class ContactService {
    constructor(supabase){
        this.repo = new ContactRepo(supabase);
    }

    async newContact(details){
    if (!/^[\d-]+$/.test(details.number)) {
        console.log("Invalid input detected for number:", details.number);
        return NextResponse.json(
            { error: "Should not include letters and symbols except '-'." },
            { status: 400 }
        );
    } 

  
        const data = await this.repo.create(details);
        return data;
    }
    async getBrgyContacts(brgy_id){
        const data = await this.repo.getAllByBrgyFK(brgy_id);
        return data;
    }
    async
}
export default ContactService;
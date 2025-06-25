import RequestService from "@/services/RequestService";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import CitizenService from "@/services/CitizenService";

export async function POST(request) {
        try {
                const supabase = await createClient();
                const reqService = new RequestService(supabase);
                const citService = new CitizenService(supabase);

                const body = await request.json();
                const { user_id, ...otherValues } = body;

                const cust_id = await citService.getCitizenById(user_id);
                if (!cust_id) throw new Error("Customer not found");

                const newRequestData = {
                        ...otherValues,
                        customer_id: cust_id.id,
                };

                const result = await reqService.createRequest(newRequestData);

                if (result.error) {
                        return NextResponse.json(
                            { message: result.error, existing: result.existing },
                            { status: 409 }
                        );
                }

                return NextResponse.json(result.data);
        } catch (err) {
                console.error("API Error in /api/tracker:", err); // <- Look here!
                return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
        }
}
//for updating 'pending' status
export async function PUT(request){
        const supabase = await createClient();
        const upReqService = new RequestService(supabase);
        const upCitService = new CitizenService(supabase);
        const body = await request.json();

        console.log("the body", body);

        // FINAL CODE FOR PUT -- DO NOT DELETE --
        // get data sa json
        const {user_id, ...someValues} = body;
        console.log("the val bolante ", body);

        // get cit-id from auth-id
        const this_id = await upCitService.getCitByAuthenticatedId(user_id);
        console.log("this dot", user_id, "and this is ",this_id)
        // get the remarks-id using cit-id fk
        const remark_id = await upReqService.getRequestByCustomer(this_id.id);
        console.log("idk service", remark_id); 

        // update status and is_paid using the remark id 
        const data = await upReqService.updateRequest(remark_id[0].id, someValues);
        console.log("update", remark_id.id, someValues);

        console.log("something", data);
        return NextResponse.json(data);
}


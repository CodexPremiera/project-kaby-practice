import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";
import { createClient } from "@/utils/supabase/server";
import AuthenticationService from "@/services/AuthenticationService";
import CitizenService from "@/services/CitizenService"
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req) {
	const { email } = await req.json();
	const supabase = await createClient();
    const authService = new AuthenticationService(supabase);
    const citService = new CitizenService(supabase);


    const id = await authService.getIdByEmail(email);
    console.log("this is id",id);
    const cit_id = await citService.getCitByAuthenticatedId(id);
    console.log(cit_id,"this is id");

    const {data:citizen, error} = await supabase.from('worker_roles_view').select("access_role").eq("citizen_id",cit_id.id).single();

    if(citizen && citizen.access_role){
        console.log("this is data",citizen.access_role);
    }else{
        return NextResponse.json({message: "Citizen has no role",success: false});
    }

    
	const session = await supabase.auth.getSession();
	const barangayUserId = session.data.session?.user?.id;

    console.log("this is the session",session);

	// Save verification token
	const token = uuidv4();
	const expiresAt = addMinutes(new Date(), 10).toISOString();

	const {data:insert, error:insererror} = await supabase.from("verification_tokens").insert({
        token:token,
		citizen_email: email,
		barangay_user_id: barangayUserId,
		access_role: citizen.access_role,
		expires_at: expiresAt,
	}).select("*").single();
    if(error){
        console.log(insererror);
        return {insererror};
    }
    console.log("this is inserted",insert);

	const link = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-link?token=${token}`;
	await sendEmail(email, link); 

	return NextResponse.json({ message: "Verification email sent!" ,success: true});





}
export async function sendEmail(to,link){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {

            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

  const info = await transporter.sendMail({
        from: `"Barangay System" <${process.env.GMAIL_USER}>`,
        to,
        subject: 'Access Verification Link',
        html: `<p>Click the link to verify access: <a href="${link}">${link}</a></p>`,
  });
  console.log("Email sent to:", to, "with link:", link);
  console.log("Message sent: %s", info.messageId);
}

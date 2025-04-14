import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  

export async function POST(req) {
  console.log("pasok here");
  // const supabase = await createClient();
  
  try {
    const body = await req.json();
    const { barangay_name, city, region,email, message} = body;
    console.log(body);
    // const { data, error } = await supabase
    const { data, error } = await supabase
      .from('BarangayAppointment')
      .insert([{ barangay_name:barangay_name, city, region,email, message, status:'pending' }]);

    // try {
    //   const response = await resend.emails.send({
    //     from:'elijahrei123@gmail.com',
    //     to:'elijahrei123@gmail.com',
    //     subject:'Barangay Appointment Request',
    //     html: `
    //       <p><strong>Barangay Name:</strong> ${barangay_name}</p>
    //       <p><strong>City:</strong> ${city}</p>
    //       <p><strong>Region:</strong> ${region}</p>
    //       <p><strong>Submitted by:</strong> ${email}</p>
    //       <p><strong>Message:</strong> ${message}</p>
    //     `,
    //   });
    //   console.log("email send: ", response);
    // }catch(err){
    //   return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    // }
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

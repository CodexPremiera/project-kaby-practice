import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  

export async function POST(req) {
  // const supabase = await createClient();
  
  try {
    const body = await req.json();
    const { barangay_name, city, email, message} = body;

    // const { data, error } = await supabase
    const { data, error } = await supabase
      .from('BarangayAppointment')
      .insert([{ barangay_name, city, email, message, status:'pending' }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

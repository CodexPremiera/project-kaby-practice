'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      barangay,
      password,
      confirm_password
    } = body;
 
    if (password !== confirm_password) {

      return new Response(JSON.stringify({ error: 'Passwords do not match' }), {
        status: 400
      });
    }
    // Sign up user
    const { data: userData, error: error1 } = await supabase.auth.signUp({
      email,
      password
    });
    if (error1) {
      return new Response(JSON.stringify({ error: error1.message }), {
        status: 500
      });
    }
    // Save in usertable
    const userId = userData.user.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user ID returned' }), {
        status: 500
      });
    }

    // 2. Insert into userroles with user_id
    const { data,error: error2 } = await supabase.from('userroles').insert([
      {
        user_id: userId,
        role: 'citizen'
      }
    ]).select().single();

    if (error2) {
      return new Response(JSON.stringify({ error: error2.message }), {
        status: 500
      });
    }
    const userId2 = data.id;

    // 3. Insert into CitizenProfile with user_id
    const { error: error3 } = await supabase.from('CitizenProfile').insert([
      {
        user_id: userId2,
        last_name:last_name,
        first_name:first_name,
        barangay:barangay
      }
    ]);

    if (error3) {
      return new Response(JSON.stringify({ error: error3.message }), {
        status: 500
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        userId,
        message: 'Citizen registered successfully'
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500
    });
  }
}

'use server';

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      barangay,
      password,
      confirmPassword
    } = body;

    // Optional: validate passwords match
    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: 'Passwords do not match' }), {
        status: 400
      });
    }

    // 1. Sign up user
    const { data: userData, error: error1 } = await supabase.auth.signUp({
      email,
      password
    });

    if (error1) {
      return new Response(JSON.stringify({ error: error1.message }), {
        status: 500
      });
    }

    const userId = userData.user?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user ID returned' }), {
        status: 500
      });
    }

    // 2. Insert into userroles with user_id
    const { error: error2 } = await supabase.from('UserRoles').insert([
      {
        user_id: userId,
        role: 'citizen'
      }
    ]);

    if (error2) {
      return new Response(JSON.stringify({ error: error2.message }), {
        status: 500
      });
    }

    // 3. Insert into CitizenProfile with user_id
    const { error: error3 } = await supabase.from('CitizenProfile').insert([
      {
        user_id: userId,
        firstName,
        lastName,
        barangay
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

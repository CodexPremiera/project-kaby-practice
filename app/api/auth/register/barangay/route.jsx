import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import BarangayAppointmentRepo from '../../../../../repositories/BarangayAppointmentRepo';
import { NextResponse } from 'next/server';
// const resend = new Resend(process.env.RESEND_API_KEY);

const brgyAppointmentRepo = new BarangayAppointmentRepo();
export async function POST(req) {
  try {

    const body = await req.json();
    const data = await brgyAppointmentRepo.create(body);
    return NextResponse.json(data);

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

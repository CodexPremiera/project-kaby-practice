import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import BarangayAppointmentRepo from '../../../../../repositories/BarangayAppointmentRepo';
import { NextResponse } from 'next/server';
// import BarangangaySer
import BarangayAppointmentService from '../../../../../repositories/BarangayAppointmentService';

// const resend = new Resend(process.env.RESEND_API_KEY);

// const brgyAppointmentRepo = new BarangayAppointmentRepo();
const brgyAppService = new BarangayAppointmentService();
export async function POST(req) {
  try {

    const body = await req.json();
    const {data,error} = await brgyAppService.createAppointment(body);

    return NextResponse.json(data);

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

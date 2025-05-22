import { NextResponse } from 'next/server';
// import BarangayAppointmentService from '../../../services/BarangayAppointmentService';
import { createClient } from '@/utils/supabase/server'

import BarangayAppointmentService from '@/services/BarangayAppointmentService';

// const resend = new Resend(process.env.RESEND_API_KEY);

// const brgyAppointmentRepo = new BarangayAppointmentRepo();
export async function POST(req) {
  try {
    const supabase = await createClient();
    const brgyAppService = new BarangayAppointmentService(supabase);

    const body = await req.json();
    const data = await brgyAppService.createAppointment(body);
    // console.log("this is data",data);
    
    return NextResponse.json(data);

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

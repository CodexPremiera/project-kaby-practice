// https://nextjs.org/blog/building-apis-with-nextjs
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import BarangayAppointmentService from '../../../../../services/BarangayAppointmentService';

 
const brgyAppService = new BarangayAppointmentService();
export async function GET(request,  {params}){
    const {appointmentId} = await params;
    const data = await brgyAppService.getAppointmentById(appointmentId);
    return NextResponse.json(data);
}

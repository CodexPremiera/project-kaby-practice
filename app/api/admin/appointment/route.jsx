import { NextResponse } from 'next/server';
import BarangayAppointmentService from '../../../../services/BarangayAppointmentService';

const brgyAppService = new BarangayAppointmentService();
export async function GET(request) {
  const token = request.cookies.get('token');
  console.log(token);
  try {
    const data = await brgyAppService.getAllAppointments();
    return NextResponse.json({ data: data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}




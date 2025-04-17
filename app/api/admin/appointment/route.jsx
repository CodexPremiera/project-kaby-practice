import BarangayAppointmentRepo from '../../../../repositories/BarangayAppointmentRepo';
import { NextResponse } from 'next/server';
const brgyAppointmentRepo = new BarangayAppointmentRepo();
export async function GET() {
  try {
    const data = await brgyAppointmentRepo.getAll();
    return NextResponse.json({ data: data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}




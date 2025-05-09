import { NextResponse } from 'next/server';
import BarangayAppointmentService from '../../../../services/BarangayAppointmentService';
import AuthenticationService from '@/services/AuthenticationService';
import UserService from '@/services/UserService';
import { createClient } from '@/utils/supabase/server'



export async function GET(request) {
  const supabase = await createClient();
  const brgyAppService = new BarangayAppointmentService(supabase);

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

export async function PUT(request){
  const supabase = await createClient();
  const brgyAppService = new BarangayAppointmentService(supabase);
  console.log("this is req",request);
  try{
    const body = await request.json();
    console.log("this is body: ", body);
    const data = await brgyAppService.updateAppointment(body);
    console.log("data of put", data);
    return NextResponse.json({data})
  }catch(err) {
    return NextResponse.json({error: err.message}, {status : 500});
  }
}

export async function POST(request){
  const supabase = await createClient();
  const authService = new AuthenticationService(supabase);
  const userService = new UserService(supabase);
  const brgyAppService = new BarangayAppointmentService(supabase);

  console.log("what the fuck is this");
  // temporary solution: use gmail as gmail and password

  try{
    const body = await request.json();
    console.log("this is body: ", body);
    const {email,password} = body;
    // const password = email

    const {data, error} = await authService.registerUser(body);
    console.log("this is data", data);

    const {data: userData, error: userError} = await userService.createUser({user_id: data.user.id, role: "barangay"});
    console.log("this is userData", userData);
    return NextResponse.json({data})

  } catch(err) {  
    console.log(err);
    return NextResponse.json({error: err.message}, {status : 500});
  }

}


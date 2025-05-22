import { NextResponse } from 'next/server';
import ServiceService from '../../../../services/ServiceService';

const servService = new ServiceService();
export async function GET(request) {
  try {
    const data = await servService.getAllServices();
    return NextResponse.json({ data: data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      owner,
      type,
      image,
      status,
      description,
      requirements,
      feerange,
      agreementfee,
      conveniencefee,
      displaybadge,
      eligibleforbadges,
      rating,
      availed,
    } = body;

    // console.log("body", body);
    const data = await servService.createService(body)
    
    return NextResponse.json({data});
  } catch (err) {
    console.log(err);
  }
}


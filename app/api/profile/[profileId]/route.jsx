import { createClient } from "@/utils/supabase/server";
import { NextResponse } from 'next/server';
import CitizenService from '../../../../services/CitizenService';

export async function GET(request,  {params}){
    const supabase = await createClient();
    const citService = new CitizenService(supabase);
    const {profileId} = await params;

    const data = await citService.getCitizenById(profileId);
    return NextResponse.json(data);
}

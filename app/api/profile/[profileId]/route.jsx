import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import CitizenService from '../../../../services/CitizenService';
import AuthenticationService from '../../../../services/AuthenticationService';
const citService = new CitizenService();
const authService = new AuthenticationService();
export async function GET(request,  {params}){
    const {profileId} = await params;
    const data = await citService.getCitizenById(profileId);
    // const loggedInId = await authService.loggedInUserId();
    // const data = await citService.getCitizenById(loggedInId);
    // console.log(data);
    console.log(data);
    // return NextResponse.json(data);
    return NextResponse.json(data);
    // return data;
}

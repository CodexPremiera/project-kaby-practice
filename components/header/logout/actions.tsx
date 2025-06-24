'use server'

import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
export async function logout() {
    
    const cookieStore = await cookies()
    const supabase = await createClient()
  
    console.log("doneeeee logged iyt")
    await supabase.auth.signOut()
    cookieStore.set('acting_as_barangay', '', { path: '/', maxAge: 0 })
    cookieStore.set('access_role', '', { path: '/', maxAge: 0 })
  
    
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL))
  }
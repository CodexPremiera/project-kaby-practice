'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
export async function logout() {
    
    const supabase = await createClient()
  
    console.log("doneeeee logged iyt")
    await supabase.auth.signOut()
  
    redirect('/login') // or home, or wherever you want
  }
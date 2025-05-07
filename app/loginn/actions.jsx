'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function login(formData) {
    // const supabase = await createClient()
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') ,
      password: formData.get('password'),
    }
    console.log(data);
    console.log("nipasok ka here");
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      redirect('/error')
    // console.log(error)
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }
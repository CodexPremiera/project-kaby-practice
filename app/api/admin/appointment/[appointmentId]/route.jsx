// https://nextjs.org/blog/building-apis-with-nextjs
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
 
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

export async function GET(request,  {params: id}){
    console.log(id);
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    

    return new Response(
        JSON.stringify({ result: `You searched for: ${query}` }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

}

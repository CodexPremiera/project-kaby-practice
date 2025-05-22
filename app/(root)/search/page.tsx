// app/services/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Services from "@/components/home/services/Services";
import GuestHeader from "@/components/header/GuestHeader";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');

  useEffect(() => {
    if (!query || query.trim() === '') {
      router.replace('/'); // redirect to home or a 404 page
    }
  }, [query, router]);

  if (!query) return null; // prevents flicker before redirect

  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden relative">
      <div className={`w-full transition-transform duration-500 fixed top-0 left-0 z-50`}>
        <GuestHeader/>
      </div>

      <div className="flex-1 sm:rounded-tl-[20px] sm:px-7 py-6 border-light-color bg-gradient mt-16 pb-18">
        <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-8 swiper-coverflow">
          <p className="mt-2 px-8">You searched for: <strong>{query}</strong></p>
          {/* TODO: Render actual results */}
          <Services/>
        </div>
      </div>
    </div>
  );
}

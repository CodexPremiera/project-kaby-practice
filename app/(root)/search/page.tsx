// app/search/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Search Results</h1>
      <p className="mt-2">You searched for: <strong>{query}</strong></p>
      {/* TODO: Render actual results */}
    </div>
  );
}

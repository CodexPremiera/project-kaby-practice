import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from "@/components/ui/form/SearchBar";

export default function ServiceSearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState('');

  // Keep the search input in sync with the URL query parameter (`q`)
  useEffect(() => {
    const qParam = searchParams.get('q') || ''; // get the current query or fallback to empty string
    setQuery(qParam);
  }, [searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const params = new URLSearchParams(searchParams.toString()); // Clone the current URL search params

      // If the query isn't empty, set it as the new search term in the URL; else remove any existing query from URL
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        // If the input is empty,
        params.delete('q');
      }

      // Push the new URL to update the page and trigger re-rendering
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <SearchBar
      value={query}
      placeholder="Services a service" // Placeholder text
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className="rounded-full border text-primary"
    />
  );
}

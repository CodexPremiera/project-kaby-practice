'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react'

export default function HeroSearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="field flex items-center gap-2 py-2 md:py-3 px-6 w-full h-fit rounded-full border-2 border-[#767676] bg-[#eeeeee]/[.10] max-w-[540px] backdrop-blur-xl"
    >
      <input
        type="text"
        placeholder="Services a service"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex w-full text-lg bg-transparent outline-none placeholder:text-[#767676]"
      />
      <Search color="#111111" />
    </div>
  );
}

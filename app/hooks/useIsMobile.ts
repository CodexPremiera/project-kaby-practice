// hooks/useIsMobile.ts
import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [breakpoint]);

  return isMobile;
}

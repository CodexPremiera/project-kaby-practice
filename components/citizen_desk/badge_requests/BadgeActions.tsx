import React, {useEffect, useRef, useState} from 'react';
import ButtonClear from "@/components/ui/buttons/ButtonClear";
import {EllipsisVertical as MoreIcon} from "lucide-react";

const BadgeActions = () => {
  const [showActions, setShowActions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <ButtonClear onClick={() => setShowActions(prev => !prev)}>
        <MoreIcon strokeWidth={2} size={20} className="w-6 p-0" />
      </ButtonClear>

      {showActions && (
        <div className="flex flex-col gap-2 absolute bottom-0 right-0 translate-y-full background-1 p-4 rounded-xl drop-shadow-xl z-50">
          <ButtonClear
            onClick={() => {
              // handle rejection logic here
              setShowActions(false);
            }}
            className="!p-3 !text-sm">
            Reject
          </ButtonClear>
          <ButtonClear
            onClick={() => {
              // handle approval logic here
              setShowActions(false);
            }}
            className="!p-3 !text-sm">
            Accept
          </ButtonClear>
        </div>
      )}
    </div>
  );
};

export default BadgeActions;
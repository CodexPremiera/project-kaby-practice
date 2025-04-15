import React from 'react';

const ManagerRowHead = () => {
  return (
    <div className="flex w-full items-center justify-between h-9 gap-2 font-['Inter'] leading-[12px] text-[#767676]">
      <div className="flex gap-3 w-[240px]">
        Manager
      </div>
      <div
        className="flex w-[180px] items-center gap-2.5">
        Role
      </div>
      <div
        className="flex w-[120px] items-center gap-2.5">
        Added
      </div>

      <div className="w-6"></div>
    </div>
  );
}

export default ManagerRowHead;
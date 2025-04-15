import React from 'react';

function Page(props) {
  return (
    <>
      <div className="bg-blue-100 flex w-full min-h-screen">
        {/* Left column - flexible */}
        <div className="hidden lg:flex min-h-screen max-w-[400px] xl:max-w-[720px]">
          <img
            src="/cover_photo.png"
            alt="..."
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column - fixed width */}
        <div className="w-full min-h-screen bg-[#eeeeee] flex-between">
          <div className="flex"></div>
        </div>
      </div>
    </>
  );
}

export default Page;
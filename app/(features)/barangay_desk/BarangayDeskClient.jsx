'use client';
import { useState } from "react";
import BarangayAppointment from "@/components/barangay_desk/BarangayAppointment";
import ApproveAccount from "@/components/barangay_desk/ApproveAccount";
import RejectAccount from "@/components/barangay_desk/RejectAccount";

export default function BarangayDeskClient({ appointments }) {
  const TAB_LABELS = {
    Pending: "Pending Appointments",
    Approved: "Approved Appointments",
    Rejected: "Rejected Appointments",
  };

  const TAB_COMPONENTS = {
    Pending: () => <BarangayAppointment appointments={appointments} />,
    Approved: () => <ApproveAccount appointments={appointments} />,
    Rejected: () => <RejectAccount appointments={appointments} />,
  };

  const [activeTab, setActiveTab] = useState("Pending");

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col w-full min-h-screen">
        <nav className="fixed top-16 sm:left-16 z-2 bg-white flex gap-6 pl-8 border-b border-gray-200 w-full">
          {Object.keys(TAB_COMPONENTS).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-secondary text-secondary"
                  : "border-transparent text-gray-600 hover:text-secondary"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>

        <div className="flex-1 justify-center overflow-y-auto items-center mt-8">
          {TAB_COMPONENTS[activeTab]()}
        </div>
      </div>
    </div>
  );
}

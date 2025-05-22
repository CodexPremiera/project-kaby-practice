"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

interface AddContactProps {
  onClose: () => void;
  barangayId: string;
}

const AddContactModal = ({ onClose, barangayId }: AddContactProps) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Brgy id", barangayId);
    console.log("name", name);
    console.log("number", number);

    try {
      const res = await fetch("/api/features/home/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barangay_id: barangayId,
          name: name,
          number: number,
        }),
      });
      const data = await res.json();
      console.log("Successfully assigned:", data);
      alert("Contact Saved");
      onClose(); 
    } catch (error) {
      console.log(error);
      alert("Failed to assign contact.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50 transition-transform duration-300"
        >
          <RiCloseFill className="w-[25px] h-[25px]" />
        </button>
        <div className="relative flex flex-col h-auto w-md rounded-[20px] bg-primary p-8">
          <h2 className="text-xl font-semibold text-center border-b border-gray/20 pb-1 h4">
            Add Contact
          </h2>
          <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                className="floating-input mt-1 w-full text-black"
                type="text"
                id="name"
                name="name"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name" className="floating-label">
                Enter Contact Name 
              </label>
            </div>
            <div className="relative my-4">
              <input
                className="floating-input mt-1 w-full text-black"
                type="text"
                id="number"
                name="number"
                placeholder=" "
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <label htmlFor="number" className="floating-label">
                Enter Contact Number (use '-' instead of space)
              </label>
            </div>
            <div className="mt-auto flex justify-center pt-6">
              <button
                type="submit"
                className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContactModal;

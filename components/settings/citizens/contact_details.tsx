"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import EmailField from "@/components/ui/form/EmailField";

interface ContactProps {
  userId: string | null;
}

function Demographics({ userId }: ContactProps) {

  // Mock original values
  const [originalData, setOriginalData] = useState({
    // email:"",
    mobile_number: "",
    telephone_number: "",
  });


  // Form state
  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
      const fetchData = async () => {
        if (!userId) return;
        try {
          const res = await fetch(`/api/citizen_settings/contact_details/${userId}`, {
            method: "GET",
            cache: "no-store",
          });
          
          const data = await res.json();
          const userData = data?.data;
          console.log(userData, "this is userData");
          const parsed = {
            // email: userData.email || "",
            mobile_number: userData.mobile_number || "",
            telephone_number: userData.telephone_number || "",
          };

          setOriginalData(parsed);
          setFormData(parsed);
        } catch (error) {
          console.error("Error fetching citizen info:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [userId]);
  // Detect changes
  useEffect(() => {
    const hasChanged = Object.entries(formData).some(
      ([key, value]) => value !== originalData[key as keyof typeof originalData]
    );
    setIsDisabled(!hasChanged);
  }, [formData,originalData]);

  // Reset handler
  const handleReset = () => setFormData({ ...originalData });

  // Save handler
 const handleSave = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/citizen_settings/contact_details/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update data");

      const updated = await res.json();
      setOriginalData({ ...formData });
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading contact details data...</div>;


  // const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Demographics</h1>
        <p className="text-sm text-muted-foreground">
          Update your demographics and keep your profile up to date.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full mt-6">
        {/* <EmailField
          field_name="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          hasChanged={formData.email !== originalData.email}
        /> */}

        <TextField
          field_name="Mobile number"
          placeholder="Enter your mobile number"
          value={formData.mobile_number}
          onChange={(e) => setFormData({...formData, mobile_number: e.target.value})}
          hasChanged={formData.mobile_number !== originalData.mobile_number}
        />

        <TextField
          field_name="Telephone number"
          placeholder="Enter your telephone number"
          value={formData.telephone_number}
          onChange={(e) => setFormData({...formData, telephone_number: e.target.value})}
          hasChanged={formData.telephone_number !== originalData.telephone_number}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 py-4">
        <ButtonSecondary disabled={isDisabled} onClick={handleReset} className="max-md:grow">Reset</ButtonSecondary>
        <ButtonPrimary disabled={isDisabled} onClick={handleSave} className="max-md:grow">Save</ButtonPrimary>
      </div>
    </>
  );
}

export default Demographics;

"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
interface ResidenceProps {
  userId: string | null;
}

function Demographics({userId} :ResidenceProps ) {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    region: "",
    province: "",
    city: "",
    barangay: "",
    sitio: "",
    years_of_residence: ""
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
          const res = await fetch(`/api/citizen_settings/residence/${userId}`, {
            method: "GET",
            cache: "no-store",
          });
          
          const data = await res.json();
          const userData = data?.data;
          console.log(userData, "this is userData");
          const parsed = {
            region: userData.region || "",
            province: userData.province || "",
            city: userData.city || "",
            barangay: userData.barangay || "",
            sitio: userData.sitio || "",
            years_of_residence: userData.years_of_residence || "",
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
      const res = await fetch(`/api/citizen_settings/residence/${userId}`, {
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
      alert(err);

    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading residence data...</div>;


  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Demographics</h1>
        <p className="text-sm text-muted-foreground">
          Update your residence data and keep your profile up to date.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full mt-6">
        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Region"
            placeholder="Enter your region"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            hasChanged={formData.region !== originalData.region}
          />
          <TextField
            field_name="Province"
            placeholder="Enter your province"
            value={formData.province}
            onChange={(e) => setFormData({...formData, province: e.target.value})}
            hasChanged={formData.province !== originalData.province}
          />
        </div>


        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="City"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            hasChanged={formData.city !== originalData.city}
          />
          <TextField
            field_name="Barangay"
            placeholder="Enter your barangay"
            value={formData.barangay}
            onChange={(e) => setFormData({...formData, barangay: e.target.value})}
            hasChanged={formData.barangay !== originalData.barangay}
          />
        </div>

        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Sitio"
            placeholder="Enter your sitio"
            value={formData.sitio}
            onChange={(e) => setFormData({...formData, sitio: e.target.value})}
            hasChanged={formData.sitio !== originalData.sitio}
          />
          {/* <TextField
            field_name="Years of Residence"
            placeholder="Enter your years of residence"
            value={formData.years_of_residence}
            type="number"
            onChange={(e) => setFormData({...formData, years_of_residence: e.target.value})}
            hasChanged={formData.years_of_residence !== originalData.years_of_residence}
          /> */}
          <TextField
            field_name="Years of Residence"
            placeholder="Enter years of residence (number)"
            value={formData.years_of_residence}
            type="number"
            onChange={(e) => {
              const val = e.target.value;

              // Allow empty or positive integers only
              if (val === "" || /^[0-9]*$/.test(val)) {
                setFormData({ ...formData, years_of_residence: val });
              }
            }}
            hasChanged={formData.years_of_residence !== originalData.years_of_residence}
          />
        </div>
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

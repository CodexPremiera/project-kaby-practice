"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";

function Demographics() {
  // Mock original values
  const [originalData, setOriginalData] = useState({
    region: "Region 7 - Central Visayas",
    province: "Cebu",
    city: "Lapu-Lapu City",
    barangay: "Basak",
    sitio: "San Isidro",
    years_of_residence: "10"
  });

  // Form state
  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);

  // Detect changes
  useEffect(() => {
    const hasChanged = Object.entries(formData).some(
      ([key, value]) => value !== originalData[key as keyof typeof originalData]
    );
    setIsDisabled(!hasChanged);
  }, [formData]);

  // Reset handler
  const handleReset = () => setFormData({ ...originalData });

  // Save handler
  const handleSave = () => setOriginalData({ ...formData });

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold leading-[12px]">Demographics</h1>
        <p className="text-sm text-muted-foreground">
          Update your demographics and keep your profile up to date.
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
          <TextField
            field_name="Years of Residence"
            placeholder="Enter your years of residence"
            value={formData.years_of_residence}
            type="number"
            onChange={(e) => setFormData({...formData, years_of_residence: e.target.value})}
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
